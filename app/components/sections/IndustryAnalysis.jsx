'use client';

import React, { useState } from 'react';
import BrandPositionChartECharts from '../charts/BrandPositionChartECharts';
import PriceRangeChartECharts from '../charts/PriceRangeChartECharts';
import MonthlySalesChartECharts from '../charts/MonthlySalesChartECharts';
import CustomerFeedbackChartECharts from '../charts/CustomerFeedbackChartECharts';
import LargeSpecificationHeatChartECharts from '../charts/LargeSpecificationHeatChartECharts';
import SmallSpecificationHeatChartECharts from '../charts/SmallSpecificationHeatChartECharts';
import ProductSpecTable from '../charts/ProductSpecTable';

// 導入圖表數據
import priceRangeChartData from '../../data/priceRangeChartData.json';
import monthlySalesChartData from '../../data/monthlySalesChartData.json';
import customerFeedbackChartData from '../../data/customerFeedbackChartData.json';
import largeSpecificationHeatChartData from '../../data/largeSpecificationHeatChartData.json';
import smallSpecificationHeatChartData from '../../data/smallSpecificationHeatChartData.json';
import productSpecTableData from '../../data/productSpecTableData.json';
import productSpecAnalysis from '../../data/productSpecAnalysis.json';
import customerFeedbackAnalysis from '../../data/customerFeedbackAnalysis.json';

// 英文字母序列
const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

const IndustryAnalysis = ({ industryAnalysis, productType = '水煮麵', pdfSectionPerSubSection = false }) => {
  if (!industryAnalysis || !industryAnalysis.sections || industryAnalysis.sections.length === 0) {
    return <div></div>;
  }

  // 狀態提升：大規格/小規格熱圖連動
  const [selectedSpec, setSelectedSpec] = useState(null);

  // 處理產品規格表數據
  const processedProductSpecTableData = productSpecTableData.map(item => ({
    ...item,
    Category: productType ? `${productType}(Hex Key Wrench)` : "水煮麵(Stewed Noodles)"
  }));

  // Map chart types to components
  const chartComponents = {
    PriceBrandChart: () => (
      <div className="grid grid-cols-1 gap-6 mb-6">
        <div>
          <h4 className="text-lg font-semibold text-blue-700 mb-2">價格區間分析</h4>
          <PriceRangeChartECharts />
        </div>
        <div>
          <h4 className="text-lg font-semibold text-blue-700 mb-2">品牌定位分析</h4>
          <BrandPositionChartECharts />
        </div>
      </div>
    ),
    MonthlySalesChart: () => (
      <div className="mb-6">
        <MonthlySalesChartECharts />
      </div>
    ),
    CustomerFeedbackChart: () => (
      <div className="mb-6">
        <h4 className="text-lg font-semibold text-blue-700 mb-2">客戶評論分析</h4>
        <CustomerFeedbackChartECharts />
        <div className="mt-4 bg-blue-50 p-4 rounded-xl border-2 border-blue-200">
          <div className="space-y-1">
            {customerFeedbackAnalysis.analysis.map((item, idx) => (
              <p key={idx} className="text-gray-700 py-0.5">
                <span className="font-semibold text-gray-800">{item.category}：</span>
                {item.content}
              </p>
            ))}
          </div>
        </div>
      </div>
    ),
    SpecHeatCharts: () => {
      const handleSpecSelect = (spec) => {
        setSelectedSpec(spec);
      };
      
      return (
        <div className="grid grid-cols-1 gap-6 mb-6">
          <div>
            <h4 className="text-lg font-semibold text-blue-700 mb-2">大規格分析</h4>
            <LargeSpecificationHeatChartECharts onSpecSelect={handleSpecSelect} />
          </div>
          <div>
            <h4 className="text-lg font-semibold text-blue-700 mb-2">小規格分析</h4>
            <SmallSpecificationHeatChartECharts selectedSpec={selectedSpec} />
          </div>
        </div>
      );
    },
    ProductSpecTable: (section) => {
      // 檢查是否有足夠的數據來渲染產品規格表
      if (processedProductSpecTableData.length === 0) {
        return <div className="mb-6">無產品規格數據可顯示</div>;
      }
      // 使用處理過的產品規格表數據
      return (
        <div className="mb-6">
          <ProductSpecTable data={processedProductSpecTableData} />
        </div>
      );
    }
  };

  // 渲染圖表
  const renderCharts = (section) => {
    // 單個圖表
    if (section.chartType && chartComponents[section.chartType]) {
      // 對於 ProductSpecTable，我們需要傳遞 section 參數
      if (section.chartType === 'ProductSpecTable') {
        return chartComponents[section.chartType](section);
      }
      return chartComponents[section.chartType]();
    }
    
    // 多個圖表 (chartTypes陣列)
    if (section.chartTypes && section.chartTypes.length > 0) {
      // 特殊情況: 處理規格熱圖
      if (section.chartTypes.includes("LargeSpecificationHeatChart") && 
          section.chartTypes.includes("SmallSpecificationHeatChart")) {
        return chartComponents["SpecHeatCharts"]();
      }
      
      // 一般情況: 渲染陣列中的所有圖表
      return (
        <div className="space-y-6 mb-6">
          {section.chartTypes.map((chartType, idx) => 
            chartComponents[chartType] ? (
              <div key={idx}>
                {chartComponents[chartType]()}
              </div>
            ) : null
          )}
        </div>
      );
    }
    
    return null;
  };

  // 渲染結論(conclusions)或分析(analysis)部分
  const renderAnalysisPoints = (section) => {
    if (section.conclusions) {
      return (
        <div>
          <h5 className="text-md font-semibold text-blue-600 mb-2">
            {section.title === "價格 & 品牌定位分析" ? "品牌定位與價格區間分析：" : "以下總結："}
          </h5>
          <div className="space-y-1">
            {section.conclusions.map((conclusion, idx) => (
              <p key={idx} className="text-gray-700 py-0.5">
                <span className="font-semibold text-gray-800">{conclusion.title}：</span>
                {conclusion.content}
              </p>
            ))}
          </div>
        </div>
      );
    } else if (section.analysis) {
      return (
        <div>
          <h5 className="text-md font-semibold text-blue-600 mb-2">{section.title === "規格熱度分析" ? "產品規格熱度分析：" : section.title + "："}</h5>
          <div className="space-y-1">
            {section.analysis.map((item, idx) => (
              <p key={idx} className="text-gray-700 py-0.5">
                <span className="font-semibold text-gray-800">{item.title}：</span>
                {item.content}
              </p>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  // 渲染細分分析(專門用於過敏原細分分析等子分析)
  const renderSubAnalysis = (section) => {
    if (section.subAnalysis && section.subAnalysis.length > 0) {
      return (
        <div className="mt-3">
          <h5 className="text-md font-semibold text-blue-600 mb-2">過敏原細分分析：</h5>
          <div className="space-y-1">
            {section.subAnalysis.map((item, idx) => (
              <p key={idx} className="text-gray-700 py-0.5">
                <span className="font-semibold text-gray-800">{item.title}：</span>
                {item.content}
              </p>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  // 渲染綜合建議(combinedRecommendations)部分
  const renderCombinedRecommendations = (section) => {
    if (section.combinedRecommendations && section.combinedRecommendations.length > 0) {
      return (
        <div className="mt-3">
          <h5 className="text-md font-semibold text-blue-600 mb-2">綜合分析與建議：</h5>
          <div className="space-y-1">
            {section.combinedRecommendations.map((item, idx) => (
              <p key={idx} className="text-gray-700 py-0.5">
                <span className="font-semibold text-gray-800">{item.title}：</span>
                {item.content}
              </p>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  // 將相同類別的建議歸納在一起
  const groupRecommendationsByCategory = (recommendations) => {
    if (!recommendations || !Array.isArray(recommendations)) return [];

    const grouped = {};
    
    // 將所有建議按類別分組
    recommendations.forEach(category => {
      if (!grouped[category.category]) {
        grouped[category.category] = [];
      }
      
      // 添加當前類別的所有項目
      grouped[category.category] = [...grouped[category.category], ...category.items];
    });
    
    // 轉換回數組格式，但現在每個類別只有一個項目包含所有建議
    return Object.keys(grouped).map(categoryName => ({
      category: categoryName,
      items: grouped[categoryName]
    }));
  };

  // 將產品規格分析資料按類別分組並排序
  const renderProductSpecRecommendations = () => {
    // 檢查產品規格分析資料是否存在
    if (!productSpecAnalysis || !productSpecAnalysis[0] || !productSpecAnalysis[0].recommendations) {
      return null;
    }

    const recommendations = productSpecAnalysis[0].recommendations;
    
    // 按類別分組
    const groupedRecommendations = {};
    recommendations.forEach(item => {
      if (!groupedRecommendations[item.category]) {
        groupedRecommendations[item.category] = [];
      }
      groupedRecommendations[item.category].push(...item.items);
    });

    return (
      <div className="mt-3">
        <h5 className="text-md font-semibold text-blue-600 mb-2">每個產品規格列出推薦分析：</h5>
        <div className="space-y-4">
          {Object.keys(groupedRecommendations).map((category, idx) => (
            <div key={idx} className="py-0.5">
              <p className="font-semibold text-blue-700 mb-2">{category}：</p>
              <div className="ml-4 space-y-2">
                {/* 按分數排序，確保排名較好的項目在前面 */}
                {groupedRecommendations[category]
                  .sort((a, b) => (a.score_rank || 0) - (b.score_rank || 0))
                  .map((item, itemIdx) => (
                    <p key={itemIdx} className="text-gray-700">
                      <span className="font-medium text-gray-800">{item.title}：</span>
                      {item.content}
                    </p>
                  ))
                }
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // 渲染整體建議
  const renderProductSpecOverallRecommendations = () => {
    if (!productSpecAnalysis || !productSpecAnalysis[0] || !productSpecAnalysis[0].overallRecommendations) {
      return null;
    }

    const overallRecommendations = productSpecAnalysis[0].overallRecommendations;

    return (
      <div className="mt-4">
        <h5 className="text-md font-semibold text-blue-600 mb-2">綜合建議：</h5>
        <div className="space-y-2">
          {overallRecommendations.map((rec, idx) => (
            <p key={idx} className="text-gray-700 py-0.5">
              <span className="font-semibold text-gray-800">{rec.title}：</span>
              {rec.content}
            </p>
          ))}
        </div>
      </div>
    );
  };

  // 判斷是否為產品規格推薦section
  const isProductSpecSection = (section) => {
    return section.title === "產品規格推薦" || section.chartType === "ProductSpecTable";
  };

  // 渲染建議(recommendations)部分 - 不用於產品規格推薦section
  const renderRecommendations = (section) => {
    // 如果是產品規格推薦section，跳過這個函數
    if (isProductSpecSection(section)) return null;
    
    if (!section.recommendations) return null;
    
    // 對建議進行分組處理
    const groupedRecommendations = groupRecommendationsByCategory(section.recommendations);
    
    return (
      <div className="mt-3">
        <h5 className="text-md font-semibold text-blue-600 mb-2">每個產品規格列出推薦分析：</h5>
        <div className="space-y-3">
          {groupedRecommendations.map((category, idx) => (
            <div key={idx} className="py-0.5">
              <p className="font-semibold text-blue-700 mb-1">{category.category}：</p>
              <div className="ml-4 space-y-2">
                {/* 按分數排序，確保排名較好的項目在前面 */}
                {category.items
                  .sort((a, b) => (a.score_rank || 0) - (b.score_rank || 0))
                  .map((item, itemIdx) => (
                    <p key={itemIdx} className="text-gray-700">
                      <span className="font-medium text-gray-800">{item.title}：</span>
                      {item.content}
                    </p>
                  ))
                }
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // 渲染整體建議(overallRecommendations)部分 - 不用於產品規格推薦section
  const renderOverallRecommendations = (section) => {
    // 如果是產品規格推薦section，跳過這個函數
    if (isProductSpecSection(section)) return null;
    
    if (!section.overallRecommendations) return null;
    
    return (
      <div className="mt-3">
        <h5 className="text-md font-semibold text-blue-600 mb-2">綜合建議：</h5>
        <div className="space-y-1">
          {section.overallRecommendations.map((rec, idx) => (
            <p key={idx} className="text-gray-700 py-0.5">
              <span className="font-semibold text-gray-800">{rec.title}：</span>
              {rec.content}
            </p>
          ))}
        </div>
      </div>
    );
  };

  // 渲染摘要(summary)部分
  const renderSummary = (section) => {
    if (!section.summary) return null;
    
    return (
      <div className="mt-3 p-3 border-l-4 border-blue-500">
        <h5 className="text-md font-semibold text-blue-800 mb-1">總結：</h5>
        <p className="text-gray-700">{section.summary}</p>
      </div>
    );
  };

  return (
    <div className="mb-10 print:page-break-after">
      <div>
        {industryAnalysis.sections.map((section, index) => {
          // 合併月銷售分析與客戶回饋分析在同一頁
          if (pdfSectionPerSubSection && section.title === '月銷售分析') {
            const nextSection = industryAnalysis.sections[index + 1];
            if (nextSection && nextSection.title === '客戶回饋分析') {
              return (
                <div key={index} className="mb-8 pdf-section">
                  <h3 className="text-xl font-bold text-blue-800 mb-6">
                    {LETTERS[index]}. [{productType}] {section.title}
                  </h3>
                  {renderCharts(section)}
                  {/* 月銷售分析內容（結論、建議等） */}
                  {(
                    (section.content && !isProductSpecSection(section)) ||
                    (!isProductSpecSection(section) && (
                      section.analysis || section.conclusions || section.subAnalysis || section.combinedRecommendations || section.recommendations || section.overallRecommendations || section.summary
                    )) ||
                    isProductSpecSection(section)
                  ) && (
                    <div className="bg-blue-50 p-4 rounded-xl border-2 border-blue-200 mb-8">
                      {section.content && !isProductSpecSection(section) && (
                        <div className="text-gray-700 mb-4">
                          {section.content}
                        </div>
                      )}
                      {isProductSpecSection(section) ? (
                        <>
                          {renderProductSpecRecommendations()}
                          {renderProductSpecOverallRecommendations()}
                        </>
                      ) : (
                        <>
                          {renderAnalysisPoints(section)}
                          {renderSubAnalysis(section)}
                          {renderCombinedRecommendations(section)}
                          {renderRecommendations(section)}
                          {renderOverallRecommendations(section)}
                          {renderSummary(section)}
                        </>
                      )}
                    </div>
                  )}
                  <h3 className="text-xl font-bold text-blue-800 mb-6 mt-10">
                    {LETTERS[index + 1]}. [{productType}] {nextSection.title}
                  </h3>
                  {renderCharts(nextSection)}
                  {/* 客戶回饋分析內容 */}
                  {(
                    (nextSection.content && !isProductSpecSection(nextSection)) ||
                    (!isProductSpecSection(nextSection) && (
                      nextSection.analysis || nextSection.conclusions || nextSection.subAnalysis || nextSection.combinedRecommendations || nextSection.recommendations || nextSection.overallRecommendations || nextSection.summary
                    )) ||
                    isProductSpecSection(nextSection)
                  ) && (
                    <div className="bg-blue-50 p-4 rounded-xl border-2 border-blue-200 mb-8">
                      {nextSection.content && !isProductSpecSection(nextSection) && (
                        <div className="text-gray-700 mb-4">
                          {nextSection.content}
                        </div>
                      )}
                      {isProductSpecSection(nextSection) ? (
                        <>
                          {renderProductSpecRecommendations()}
                          {renderProductSpecOverallRecommendations()}
                        </>
                      ) : (
                        <>
                          {renderAnalysisPoints(nextSection)}
                          {renderSubAnalysis(nextSection)}
                          {renderCombinedRecommendations(nextSection)}
                          {renderRecommendations(nextSection)}
                          {renderOverallRecommendations(nextSection)}
                          {renderSummary(nextSection)}
                        </>
                      )}
                    </div>
                  )}
                </div>
              );
            }
          }
          // 跳過已合併的 nextSection
          if (pdfSectionPerSubSection && index > 0 && industryAnalysis.sections[index - 1].title === '月銷售分析' && section.title === '客戶回饋分析') {
            return null;
          }
          // 其餘照舊
          return pdfSectionPerSubSection ? (
            <div key={index} className="mb-8 pdf-section">
              <h3 className="text-xl font-bold text-blue-800 mb-6">
                {LETTERS[index]}. [{productType}] {section.title}
              </h3>
              {renderCharts(section)}
              {/* 只在有內容或子內容時才渲染藍色框 */}
              {(
                (section.content && !isProductSpecSection(section)) ||
                (!isProductSpecSection(section) && (
                  section.analysis || section.conclusions || section.subAnalysis || section.combinedRecommendations || section.recommendations || section.overallRecommendations || section.summary
                )) ||
                isProductSpecSection(section)
              ) && (
                <div className="bg-blue-50 p-4 rounded-xl border-2 border-blue-200 mb-8">
                  {section.content && !isProductSpecSection(section) && (
                    <div className="text-gray-700 mb-4">
                      {section.content}
                    </div>
                  )}
                  {isProductSpecSection(section) ? (
                    <>
                      {renderProductSpecRecommendations()}
                      {renderProductSpecOverallRecommendations()}
                    </>
                  ) : (
                    <>
                      {renderAnalysisPoints(section)}
                      {renderSubAnalysis(section)}
                      {renderCombinedRecommendations(section)}
                      {renderRecommendations(section)}
                      {renderOverallRecommendations(section)}
                      {renderSummary(section)}
                    </>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div key={index} className="mb-8">
              <h3 className="text-xl font-bold text-blue-800 mb-6">
                {LETTERS[index]}. [{productType}] {section.title}
              </h3>
              {renderCharts(section)}
              {/* 只在有內容或子內容時才渲染藍色框 */}
              {(
                (section.content && !isProductSpecSection(section)) ||
                (!isProductSpecSection(section) && (
                  section.analysis || section.conclusions || section.subAnalysis || section.combinedRecommendations || section.recommendations || section.overallRecommendations || section.summary
                )) ||
                isProductSpecSection(section)
              ) && (
                <div className="bg-blue-50 p-4 rounded-xl border-2 border-blue-200 mb-8">
                  {section.content && !isProductSpecSection(section) && (
                    <div className="text-gray-700 mb-4">
                      {section.content}
                    </div>
                  )}
                  {isProductSpecSection(section) ? (
                    <>
                      {renderProductSpecRecommendations()}
                      {renderProductSpecOverallRecommendations()}
                    </>
                  ) : (
                    <>
                      {renderAnalysisPoints(section)}
                      {renderSubAnalysis(section)}
                      {renderCombinedRecommendations(section)}
                      {renderRecommendations(section)}
                      {renderOverallRecommendations(section)}
                      {renderSummary(section)}
                    </>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default IndustryAnalysis; 