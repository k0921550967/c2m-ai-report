'use client';

import React from 'react';
import BrandPositionChart from '../charts/BrandPositionChart';
import PriceRangeChart from '../charts/PriceRangeChart';
import MonthlySalesChart from '../charts/MonthlySalesChart';
import CustomerFeedbackChart from '../charts/CustomerFeedbackChart';
import LargeSpecificationHeatChart from '../charts/LargeSpecificationHeatChart';
import SmallSpecificationHeatChart from '../charts/SmallSpecificationHeatChart';
import ProductSpecTable from '../charts/ProductSpecTable';

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
          <PriceRangeChart />
        </div>
        <div>
          <h4 className="text-lg font-semibold text-blue-700 mb-2">品牌定位分析</h4>
          <BrandPositionChart />
        </div>
      </div>
    ),
    MonthlySalesChart: () => (
      <div className="mb-6">
        <MonthlySalesChart />
      </div>
    ),
    CustomerFeedbackChart: () => (
      <div className="mb-6">
        <CustomerFeedbackChart />
      </div>
    ),
    SpecHeatCharts: () => (
      <div className="grid grid-cols-1 gap-6 mb-6">
        <div>
          <h4 className="text-lg font-semibold text-blue-700 mb-2">大規格分析</h4>
          <LargeSpecificationHeatChart />
        </div>
        <div>
          <h4 className="text-lg font-semibold text-blue-700 mb-2">小規格分析</h4>
          <SmallSpecificationHeatChart />
        </div>
      </div>
    ),
    ProductSpecTable: () => (
      <div className="mb-6">
        <ProductSpecTable />
      </div>
    )
  };

  // Render each section of the industry analysis
  return (
    <>
      {industryAnalysis.sections.map((section, index) => {
        // Determine which chart component to render
        let ChartComponent;
        if (section.chartType === 'PriceBrandChart') {
          ChartComponent = chartComponents.PriceBrandChart;
        } else if (section.chartType === 'MonthlySalesChart') {
          ChartComponent = chartComponents.MonthlySalesChart;
        } else if (section.chartType === 'CustomerFeedbackChart') {
          ChartComponent = chartComponents.CustomerFeedbackChart;
        } else if (section.chartType === 'ProductSpecTable') {
          ChartComponent = chartComponents.ProductSpecTable;
        } else if (Array.isArray(section.chartTypes) && 
                  section.chartTypes.includes('LargeSpecificationHeatChart') && 
                  section.chartTypes.includes('SmallSpecificationHeatChart')) {
          ChartComponent = chartComponents.SpecHeatCharts;
        }

        return (
          <div key={index} className="bg-white p-6 rounded-xl border-2 border-blue-200 mb-8">
            <h3 className="text-xl font-bold text-blue-800 mb-6">{String.fromCharCode(65 + index)}. [{productType}] {section.title}</h3>
            
            {ChartComponent && <ChartComponent />}
            
            <div className="bg-blue-50 p-4 rounded-lg">
              {section.title === '價格 & 品牌定位分析' && (
                <>
                  <h4 className="text-lg font-semibold text-blue-800 mb-2">以下總結:</h4>
                  <ol className="list-decimal pl-5 space-y-2 text-gray-700">
                    {section.conclusions && section.conclusions.map((item, i) => (
                      <li key={i}><span className="font-medium">{item.title}：</span> {item.content}</li>
                    ))}
                  </ol>
                  {section.summary && (
                    <p className="mt-4 text-gray-700"><span className="font-medium">總結：</span> {section.summary}</p>
                  )}
                </>
              )}
              
              {section.title === '月銷售分析' && (
                <>
                  <h4 className="text-lg font-semibold text-blue-800 mb-2">{productType}市場銷售趨勢分析：</h4>
                  <ol className="list-decimal pl-5 space-y-2 text-gray-700">
                    {section.conclusions && section.conclusions.map((item, i) => (
                      <li key={i}><span className="font-medium">{item.title}：</span> {item.content}</li>
                    ))}
                  </ol>
                </>
              )}
              
              {section.title === '客戶回饋分析' && (
                <>
                  <h4 className="text-lg font-semibold text-blue-800 mb-2">{productType}正負評論數的圖表分析：</h4>
                  <ol className="list-decimal pl-5 space-y-2 text-gray-700">
                    {section.analysis && section.analysis.map((item, i) => (
                      <li key={i}><span className="font-medium">{item.title}：</span> {item.content}</li>
                    ))}
                  </ol>
                </>
              )}
              
              {section.title === '規格熱度分析' && (
                <>
                  <h4 className="text-lg font-semibold text-blue-800 mb-2">產品規格熱度分析：</h4>
                  <ol className="list-decimal pl-5 space-y-2 text-gray-700">
                    {section.analysis && section.analysis.map((item, i) => (
                      <li key={i}><span className="font-medium">{item.title}：</span> {item.content}</li>
                    ))}
                  </ol>
                </>
              )}
              
              {section.title === '產品規格推薦' && (
                <>
                  <h4 className="text-lg font-semibold text-blue-800 mb-2">每個產品規格列出推薦分析：</h4>
                  <ol className="list-decimal pl-5 space-y-4 text-gray-700">
                    {section.recommendations && section.recommendations.map((category, i) => (
                      <li key={i}>
                        <span className="font-medium">{category.category}：</span>
                        <ul className="list-disc pl-5 mt-1 space-y-1">
                          {category.items && category.items.map((item, j) => (
                            <li key={j}><span className="font-medium">{item.title}：</span> {item.content}</li>
                          ))}
                        </ul>
                      </li>
                    ))}
                  </ol>
                  
                  <h4 className="text-lg font-semibold text-blue-800 mt-6 mb-2">綜合建議：</h4>
                  <ol className="list-decimal pl-5 space-y-2 text-gray-700">
                    {section.overallRecommendations && section.overallRecommendations.map((item, i) => (
                      <li key={i}><span className="font-medium">{item.title}：</span> {item.content}</li>
                    ))}
                  </ol>
                </>
              )}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default IndustryAnalysis; 