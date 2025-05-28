'use client';

import React from 'react';

const DigitalTransformationRecommendations = ({ digitalTransformationRecommendations }) => {
  if (!digitalTransformationRecommendations || !digitalTransformationRecommendations.stages) {
    return <div>No digital transformation recommendations data available</div>;
  }

  // Sort stages by priority
  const sortedStages = [...digitalTransformationRecommendations.stages].sort((a, b) => a.priority - b.priority);
  
  // Map of colors for each priority level
  const priorityColors = {
    1: {
      bg: "bg-blue-50",
      border: "border-blue-200",
      text: "text-blue-800",
      circle: "bg-blue-800",
      highlight: "text-blue-700",
      progressBar: "bg-blue-600"
    },
    2: {
      bg: "bg-indigo-50",
      border: "border-indigo-200",
      text: "text-indigo-800",
      circle: "bg-indigo-800",
      highlight: "text-indigo-700",
      progressBar: "bg-indigo-600"
    },
    3: {
      bg: "bg-teal-50",
      border: "border-teal-200",
      text: "text-teal-800",
      circle: "bg-teal-800",
      highlight: "text-teal-700",
      progressBar: "bg-teal-600"
    },
    4: {
      bg: "bg-orange-50",
      border: "border-orange-200",
      text: "text-orange-800",
      circle: "bg-orange-800",
      highlight: "text-orange-700",
      progressBar: "bg-orange-600"
    },
  };

  // Helper function to get relevant tools for a stage
  const getToolsForStage = (stageName) => {
    // 直接匹配 stageName 和工具類別
    const categoryTools = digitalTransformationRecommendations.recommendedTools.find(
      tool => tool.category === stageName
    )?.tools || [];
    
    // 只返回前2個工具，不再進行priority排序
    return categoryTools.slice(0, 2);
  };

  // 顏色對應表
  const colorMap = {
    'bg-blue-800': '#1E40AF',
    'bg-indigo-800': '#3730A3',
    'bg-teal-800': '#134E4A',
    'bg-orange-800': '#C2410C',
  };

  return (
    <div className="mb-12">
      {/* 介紹頁面 */}
      <div className="bg-white p-6 rounded-xl border-2 border-blue-200 mb-8 print:page-break-after">
        <h3 className="text-xl font-bold text-blue-800 mb-6">研發數位化優先面向建議</h3>
        
        {/* 面向優先順序說明 */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-gray-700">{digitalTransformationRecommendations.introduction}</p>
        </div>
      </div>
      
      {/* Render each stage based on priority - 每個面向獨立分頁 */}
      {sortedStages.map((stage, index) => {
        const colors = priorityColors[stage.priority];
        const tools = getToolsForStage(stage.stageName);
        const percentageValue = parseInt(stage.percentageValue);
        
        return (
          <div key={stage.priority} className={`mb-12 ${index < sortedStages.length - 1 ? 'print:page-break-after' : ''}`}>
            <div className={`${colors.bg} p-6 rounded-lg ${colors.border} border-2`}>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <div className="mr-4" style={{ display: 'inline-block', verticalAlign: 'middle' }}>
                    <svg width="40" height="40">
                      <circle cx="20" cy="20" r="20" fill={colorMap[colors.circle] || '#3182CE'} />
                      <text x="20" y="27" textAnchor="middle" fontSize="18" fontWeight="bold" fill="#fff">{stage.priority}</text>
                    </svg>
                  </div>
                  <h4 className={`text-2xl font-bold ${colors.text}`}>{stage.stageName}</h4>
                </div>
                <div className="flex items-center">
                  <div className={`${colors.text} font-bold mr-3 text-lg`}>{stage.score}</div>
                  <div className="w-32 h-4 bg-gray-200 rounded-full">
                    <div className={`h-full ${colors.progressBar} rounded-full`} style={{ width: `${percentageValue}%` }}></div>
                  </div>
                  <div className={`ml-3 ${colors.text} font-bold text-lg`}>{stage.percentage}</div>
                </div>
              </div>
              
              <div className="mb-6">
                <div className={`${colors.highlight} font-bold mb-3 text-lg`}>重點工作</div>
                <ul className="text-gray-700 pl-6 list-disc space-y-2">
                  {stage.keyTasks.map((task, index) => (
                    <li key={index} className="text-base">{task}</li>
                  ))}
                </ul>
              </div>
              
              <div className="mb-6">
                <div className={`${colors.highlight} font-bold mb-3 text-lg`}>預期效益</div>
                <p className="text-gray-700 text-base leading-relaxed">
                  {stage.expectedBenefits}
                </p>
              </div>
              
              <div className="mb-4">
                <div className={`${colors.highlight} font-bold mb-4 text-lg`}>轉型工具</div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                  {tools.map((tool, index) => (
                    <div key={index} className={`bg-white p-6 rounded-lg border-2 ${colors.border} shadow-sm`}>
                      <div className="mb-3">
                        <div className={`font-bold ${colors.highlight} text-lg`}>{tool.name}</div>
                      </div>
                      <div className="text-sm text-gray-500 mb-3 font-medium">輔導資源：{tool.provider}</div>
                      <p className="text-gray-700 text-base leading-relaxed">{tool.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DigitalTransformationRecommendations; 