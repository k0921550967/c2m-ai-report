'use client';

import React from 'react';
import BrandPositionChart from '../charts/BrandPositionChart';
import PriceRangeChart from '../charts/PriceRangeChart';
import MonthlySalesChart from '../charts/MonthlySalesChart';
import CustomerFeedbackChart from '../charts/CustomerFeedbackChart';
import LargeSpecificationHeatChart from '../charts/LargeSpecificationHeatChart';
import SmallSpecificationHeatChart from '../charts/SmallSpecificationHeatChart';
import ProductSpecTable from '../charts/ProductSpecTable';

// 導入圖表數據
import priceRangeChartData from '../../data/priceRangeChartData.json';
import monthlySalesChartData from '../../data/monthlySalesChartData.json';
import customerFeedbackChartData from '../../data/customerFeedbackChartData.json';
import largeSpecificationHeatChartData from '../../data/largeSpecificationHeatChartData.json';
import smallSpecificationHeatChartData from '../../data/smallSpecificationHeatChartData.json';

// 英文字母序列
const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];

const IndustryAnalysis = ({ industryAnalysis, productType = '水煮麵' }) => {
  if (!industryAnalysis || !industryAnalysis.sections || industryAnalysis.sections.length === 0) {
    return <div></div>;
  }

  // Map chart types to components
  const chartComponents = {
    PriceBrandChart: () => (
      <div className="grid grid-cols-1 gap-6 mb-6">
        <div>
          <h4 className="text-lg font-semibold text-blue-700 mb-2">價格區間分析</h4>
          <PriceRangeChart data={priceRangeChartData} />
        </div>
        <div>
          <h4 className="text-lg font-semibold text-blue-700 mb-2">品牌定位分析</h4>
          <BrandPositionChart />
        </div>
      </div>
    ),
    MonthlySalesChart: () => (
      <div className="mb-6">
        <MonthlySalesChart data={monthlySalesChartData} />
      </div>
    ),
    CustomerFeedbackChart: () => (
      <div className="mb-6">
        <CustomerFeedbackChart data={customerFeedbackChartData} />
      </div>
    ),
    SpecHeatCharts: () => (
      <div className="grid grid-cols-1 gap-6 mb-6">
        <div>
          <h4 className="text-lg font-semibold text-blue-700 mb-2">大規格分析</h4>
          <LargeSpecificationHeatChart data={largeSpecificationHeatChartData} />
        </div>
        <div>
          <h4 className="text-lg font-semibold text-blue-700 mb-2">小規格分析</h4>
          <SmallSpecificationHeatChart data={smallSpecificationHeatChartData} />
        </div>
      </div>
    ),
    ProductSpecTable: () => (
      <div className="mb-6">
        <ProductSpecTable />
      </div>
    )
  };

  // 渲染圖表
  const renderCharts = (section) => {
    // 單個圖表
    if (section.chartType && chartComponents[section.chartType]) {
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
          <h5 className="text-md font-semibold text-blue-600 mb-2">以下總結：</h5>
          <div className="space-y-1">
            {section.conclusions.map((conclusion, idx) => (
              <p key={idx} className="text-gray-700 py-0.5">
                <span className="font-semibold text-blue-700">{conclusion.title}：</span>
                {conclusion.content}
              </p>
            ))}
          </div>
        </div>
      );
    } else if (section.analysis) {
      return (
        <div>
          <h5 className="text-md font-semibold text-blue-600 mb-2">{section.title}：</h5>
          <div className="space-y-1">
            {section.analysis.map((item, idx) => (
              <p key={idx} className="text-gray-700 py-0.5">
                <span className="font-semibold text-blue-700">{item.title}：</span>
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
    if (section.title === "規格熱度分析" && section.subAnalysis) {
      return (
        <div className="mt-3">
          <h5 className="text-md font-semibold text-blue-600 mb-2">過敏原細分分析：</h5>
          <div className="space-y-1">
            {section.subAnalysis.map((item, idx) => (
              <p key={idx} className="text-gray-700 py-0.5">
                <span className="font-semibold text-blue-700">{item.title}：</span>
                {item.content}
              </p>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  // 渲染建議(recommendations)部分
  const renderRecommendations = (section) => {
    if (!section.recommendations) return null;
    
    return (
      <div className="mt-3">
        <h5 className="text-md font-semibold text-blue-600 mb-2">每個產品規格列出推薦分析：</h5>
        <div className="space-y-2">
          {section.recommendations.map((category, idx) => (
            <div key={idx} className="py-0.5">
              <p className="font-semibold text-blue-700">{category.category}：</p>
              <div className="ml-4 space-y-1">
                {category.items.map((item, itemIdx) => (
                  <p key={itemIdx} className="text-gray-700">
                    <span className="font-medium text-blue-600">{item.title}：</span>
                    {item.content}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // 渲染整體建議(overallRecommendations)部分
  const renderOverallRecommendations = (section) => {
    if (!section.overallRecommendations) return null;
    
    return (
      <div className="mt-3">
        <h5 className="text-md font-semibold text-blue-600 mb-2">綜合建議：</h5>
        <div className="space-y-1">
          {section.overallRecommendations.map((rec, idx) => (
            <p key={idx} className="text-gray-700 py-0.5">
              <span className="font-semibold text-blue-700">{rec.title}：</span>
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
        {industryAnalysis.sections.map((section, index) => (
          <div key={index} className="mb-8">
            <h3 className="text-xl font-bold text-blue-800 mb-6">
              {LETTERS[index]}. [{productType}] {section.title}
            </h3>
            
            {renderCharts(section)}
            
            <div className="bg-blue-50 p-4 rounded-xl border-2 border-blue-200 mb-8">
              {section.content && (
                <div className="text-gray-700 mb-4">
                  {section.content}
                </div>
              )}
              {renderAnalysisPoints(section)}
              {renderSubAnalysis(section)}
              {renderRecommendations(section)}
              {renderOverallRecommendations(section)}
              {renderSummary(section)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IndustryAnalysis; 