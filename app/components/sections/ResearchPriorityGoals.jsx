'use client';

import React from 'react';

const ResearchPriorityGoals = ({ diagnosticAnalysis, companyInfo, renderScoreBars, toChineseNumber }) => {
  if (!diagnosticAnalysis || !diagnosticAnalysis.evaluationItems) {
    return <div></div>;
  }

  return (
    <div className="bg-white p-6 rounded-xl border-2 border-blue-200">
      <div className="flex items-center justify-center mb-8">
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-800">{companyInfo.name}</div>
          <div className="text-gray-500 mt-1">研發轉型目標評估</div>
        </div>
      </div>
      
      <div className="bg-blue-50 p-4 rounded-lg mb-6">
        <div className="text-blue-800 font-medium mb-2">評估項目（1分為「最不需要推動」，5分為「最需要推動」）</div>
      </div>
      
      <div className="space-y-6">
        {diagnosticAnalysis.evaluationItems.map((category, index) => {
          // 設定根據不同類別使用不同的顏色
          const colors = [
            { bg: "from-blue-100 to-blue-50", border: "border-blue-200", itemBg: "bg-blue-200", itemText: "text-blue-800", activeBg: "bg-blue-600", inactiveBg: "bg-blue-200", textColor: "text-blue-700" },
            { bg: "from-indigo-100 to-indigo-50", border: "border-indigo-200", itemBg: "bg-indigo-200", itemText: "text-indigo-800", activeBg: "bg-indigo-500", inactiveBg: "bg-indigo-200", textColor: "text-indigo-700" },
            { bg: "from-teal-100 to-teal-50", border: "border-teal-200", itemBg: "bg-teal-200", itemText: "text-teal-800", activeBg: "bg-teal-500", inactiveBg: "bg-teal-200", textColor: "text-teal-700" },
            { bg: "from-orange-100 to-orange-50", border: "border-orange-200", itemBg: "bg-orange-200", itemText: "text-orange-800", activeBg: "bg-orange-500", inactiveBg: "bg-orange-200", textColor: "text-orange-700" }
          ];
          // 顏色對應表
          const colorMap = {
            'bg-blue-200': '#BFDBFE',
            'bg-indigo-200': '#C7D2FE',
            'bg-teal-200': '#99F6E4',
            'bg-orange-200': '#FED7AA',
          };
          const textColorMap = {
            'text-blue-800': '#1E40AF',
            'text-indigo-800': '#3730A3',
            'text-teal-800': '#134E4A',
            'text-orange-800': '#C2410C',
          };
          const colorSet = colors[index % colors.length];
          
          return (
            <div key={index}>
              <div className={`flex justify-between items-center bg-gradient-to-r ${colorSet.bg} p-3 rounded-t-lg border-b-2 ${colorSet.border}`}>
                <div className={`font-medium text-${colorSet.textColor.split('-')[1]}-900`}>
                  {toChineseNumber(index + 1)}、{category.category}
                </div>
                <div className={`font-medium text-${colorSet.textColor.split('-')[1]}-800`}>{category.score}</div>
              </div>
              
              <div className={`space-y-4 p-4 bg-white border border-${colorSet.border.split('-')[1]} rounded-b-lg`}>
                {category.items.map((item) => (
                  <div key={item.id} className="flex items-start">
                    <div className="mr-3" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
                      <svg width="24" height="24">
                        <circle cx="12" cy="12" r="12" fill={colorMap[colorSet.itemBg]} />
                        <text x="12" y="16" textAnchor="middle" fontSize="13" fontWeight="bold" fill={textColorMap[colorSet.itemText]}>{item.id}</text>
                      </svg>
                    </div>
                    <div>
                      <div className="text-gray-800">{item.name}</div>
                      <div className="flex items-center mt-1">
                        {renderScoreBars(item.score, 5, colorSet.activeBg, colorSet.inactiveBg)}
                        <span className={`text-sm ${colorSet.textColor}`}>
                          {item.score}分 - {item.note}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ResearchPriorityGoals; 