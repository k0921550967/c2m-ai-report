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
    return digitalTransformationRecommendations.recommendedTools.find(
      tool => tool.category === stageName
    )?.tools || [];
  };

  return (
    <div className="mb-12 print:page-break-after">
      <header className="mb-8">
        <h2 className="text-3xl font-bold text-blue-900">五、數位轉型建議</h2>
        <div className="mt-2 h-1 w-24 bg-orange-400 rounded-full"></div>
      </header>
      
      <div className="bg-white p-6 rounded-xl border-2 border-blue-200 mb-8">
        <h3 className="text-xl font-bold text-blue-800 mb-6">研發數位化優先面向建議</h3>
        
        <div className="space-y-6">
          {/* 面向優先順序說明 */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-gray-700">{digitalTransformationRecommendations.introduction}</p>
          </div>
          
          {/* Render each stage based on priority */}
          {sortedStages.map((stage) => {
            const colors = priorityColors[stage.priority];
            const tools = getToolsForStage(stage.stageName);
            const percentageValue = parseInt(stage.percentageValue);
            
            return (
              <div key={stage.priority} className={`${colors.bg} p-4 rounded-lg ${colors.border}`}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <div className={`w-8 h-8 rounded-full ${colors.circle} text-white flex items-center justify-center mr-3 font-bold`}>
                      {stage.priority}
                    </div>
                    <h4 className={`text-lg font-semibold ${colors.text}`}>{stage.stageName}</h4>
                  </div>
                  <div className="flex items-center">
                    <div className={`${colors.text} font-bold mr-2`}>{stage.score}</div>
                    <div className="w-24 h-3 bg-gray-200 rounded-full">
                      <div className={`h-full ${colors.progressBar} rounded-full`} style={{ width: `${percentageValue}%` }}></div>
                    </div>
                    <div className={`ml-2 ${colors.text} font-medium`}>{stage.percentage}</div>
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className={`${colors.highlight} font-medium mb-1`}>重點工作</div>
                  <ul className="text-gray-700 pl-5 list-disc space-y-1">
                    {stage.keyTasks.map((task, index) => (
                      <li key={index}>{task}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="mb-4">
                  <div className={`${colors.highlight} font-medium mb-1`}>預期效益</div>
                  <p className="text-gray-700 text-sm">
                    {stage.expectedBenefits}
                  </p>
                </div>
                
                <div className="mb-4">
                  <div className={`${colors.highlight} font-medium mb-1`}>轉型工具</div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                    {tools.map((tool, index) => (
                      <div key={index} className={`bg-white p-4 rounded-lg border ${colors.border}`}>
                        <div className={`font-medium ${colors.highlight} mb-2`}>{tool.name}</div>
                        <div className="text-sm text-gray-500 mb-1">服務機構：{tool.provider}</div>
                        <p className="text-gray-700 text-sm">{tool.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DigitalTransformationRecommendations; 