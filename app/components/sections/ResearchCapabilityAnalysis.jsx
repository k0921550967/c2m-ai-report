'use client';

import React from 'react';

const ResearchCapabilityAnalysis = ({ diagnosticAnalysis }) => {
  if (!diagnosticAnalysis || !diagnosticAnalysis.evaluationItems || !diagnosticAnalysis.capabilityAnalysis) {
    return <div></div>;
  }

  return (
    <div className="bg-white p-6 rounded-xl border-2 border-blue-200">
      
      {/* 能力條形圖 */}
      <div className="space-y-6 mb-6">
        {diagnosticAnalysis.evaluationItems.map((category, index) => {
          // 設定不同類別的顏色
          const colors = [
            { bg: "bg-blue-50", text: "text-blue-900", valueText: "text-blue-700", gradient: "linear-gradient(90deg, #1E40AF 0%, #60A5FA 100%)" },
            { bg: "bg-indigo-50", text: "text-indigo-900", valueText: "text-indigo-700", gradient: "linear-gradient(90deg, #4F46E5 0%, #A5B4FC 100%)" },
            { bg: "bg-teal-50", text: "text-teal-900", valueText: "text-teal-700", gradient: "linear-gradient(90deg, #0D9488 0%, #5EEAD4 100%)" },
            { bg: "bg-orange-50", text: "text-orange-900", valueText: "text-orange-700", gradient: "linear-gradient(90deg, #EA580C 0%, #FDBA74 100%)" }
          ];
          
          const colorSet = colors[index % colors.length];
          const [numerator, denominator] = category.score.split('/').map(Number);
          const percentage = Math.round((numerator / denominator) * 100);
          
          return (
            <div key={index} className="mb-4">
              <div className="flex justify-between mb-1">
                <div className={`font-semibold ${colorSet.text}`}>{category.category}</div>
                <div className={colorSet.valueText}>{category.score}</div>
              </div>
              <div className={`relative w-full h-8 ${colorSet.bg} rounded-lg overflow-hidden`}>
                <div
                  className="h-full rounded-lg"
                  style={{
                    width: `${(numerator/denominator)*100}%`,
                    background: colorSet.gradient,
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-between px-4">
                  <span className="text-white font-medium drop-shadow-md">
                    {percentage}%
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* 能力評估摘要 */}
      <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
        <div className="text-lg font-semibold text-blue-800 mb-2">研發轉型推動重點分析</div>
        <div className="text-gray-700">
          {diagnosticAnalysis.capabilityAnalysis.summary.map((item, index) => {
            const parts = item.split('：');
            return (
              <div key={index} className={index > 0 ? '' : 'mb-1'}>
                <span className="font-medium">{parts[0]}：</span>
                {parts[1]}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ResearchCapabilityAnalysis; 