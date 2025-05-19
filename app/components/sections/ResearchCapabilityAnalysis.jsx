'use client';

import React, { useRef, useEffect, useState } from 'react';

const ResearchCapabilityAnalysis = ({ diagnosticAnalysis }) => {
  if (!diagnosticAnalysis || !diagnosticAnalysis.evaluationItems || !diagnosticAnalysis.capabilityAnalysis) {
    return <div></div>;
  }

  // 進度條寬度自動偵測
  const [barWidths, setBarWidths] = useState([]);
  const barRefs = useRef([]);

  useEffect(() => {
    setBarWidths(barRefs.current.map(ref => ref ? ref.offsetWidth : 400));
  }, [diagnosticAnalysis]);

  return (
    <div className="bg-white p-6 rounded-xl border-2 border-blue-200">
      
      {/* 能力條形圖 */}
      <div className="space-y-6 mb-6">
        {diagnosticAnalysis.evaluationItems.map((category, index) => {
          // 設定不同類別的顏色
          const colors = [
            { bg: "#EFF6FF", gradient: ["#1E40AF", "#93C5FD"], text: "#1E40AF", valueText: "#1E40AF" },
            { bg: "#EEF2FF", gradient: ["#4F46E5", "#C7D2FE"], text: "#3730A3", valueText: "#3730A3" },
            { bg: "#F0FDFA", gradient: ["#0D9488", "#99F6E4"], text: "#134E4A", valueText: "#134E4A" },
            { bg: "#FFF7ED", gradient: ["#EA580C", "#FED7AA"], text: "#C2410C", valueText: "#C2410C" }
          ];
          const colorSet = colors[index % colors.length];
          const [numerator, denominator] = category.score.split('/').map(Number);
          const percentage = Math.round((numerator / denominator) * 100);
          // 進度條寬度
          const barWidth = barWidths[index] || 400;
          return (
            <div key={index} className="mb-4">
              {/* 標題與分數 */}
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: 4 }}>
                <div style={{ flex: 1, fontWeight: 600, color: colorSet.text, fontSize: 16 }}>{category.category}</div>
                <div style={{ marginLeft: 16, fontWeight: 600, color: colorSet.valueText, fontSize: 16 }}>{category.score}</div>
              </div>
              {/* 進度條 */}
              <div ref={el => barRefs.current[index] = el} style={{ width: '100%', height: 32, marginTop: 2 }}>
                <svg width={barWidth} height="32" viewBox={`0 0 ${barWidth} 32`} style={{ width: '100%', height: 32, display: 'block' }}>
                  {/* 背景條 */}
                  <rect x="0" y="0" width={barWidth} height="32" rx="12" fill={colorSet.bg} />
                  {/* 漸層進度條 */}
                  <defs>
                    <linearGradient id={`progress-gradient-${index}`} x1="0" y1="0" x2={barWidth} y2="0" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor={colorSet.gradient[0]} />
                      <stop offset="100%" stopColor={colorSet.gradient[1]} />
                    </linearGradient>
                  </defs>
                  <rect x="0" y="0" width={barWidth * (numerator/denominator)} height="32" rx="12" fill={`url(#progress-gradient-${index})`} />
                  {/* 百分比文字靠左 2% padding，垂直置中 */}
                  <text
                    x={barWidth * 0.02}
                    y="18"
                    dominantBaseline="middle"
                    textAnchor="start"
                    fontSize="18"
                    fontWeight="bold"
                    fill="#fff"
                    style={{ textShadow: '0 1px 2px #0006' }}
                  >
                    {percentage}%
                  </text>
                </svg>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* 能力評估摘要 */}
      <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
        <div className="text-lg font-semibold text-blue-800 mb-2">需求分析重點說明</div>
        <div className="text-gray-700">
          {diagnosticAnalysis.capabilityAnalysis.summary.map((item, index) => {
            const parts = item.split('：');
            return (
              <div key={index} className={index > 0 ? '' : 'mb-1'}>
                <span className="font-medium">{parts[0]}</span>
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