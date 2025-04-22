'use client';

import React from 'react';
import { Layers, Database, Search, Cpu } from 'lucide-react';

const ResearchScaleEvaluation = ({ researchScaleData }) => {
  // If no data is provided, just return an empty div
  if (!researchScaleData || !researchScaleData.areas || researchScaleData.areas.length === 0) {
    return <div></div>;
  }

  // Map icons to their Lucide components
  const iconMap = {
    'Layers': Layers,
    'Database': Database,
    'Search': Search,
    'Cpu': Cpu
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {researchScaleData.areas.map((area, index) => {
        const IconComponent = iconMap[area.icon] || Layers;
        
        return (
          <div key={index} className="bg-white p-6 rounded-xl border-2 border-blue-200">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-3">
                <IconComponent className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-bold text-blue-800">{area.title}</h3>
            </div>
            
            <div className="flex items-center mb-4">
              <div className="text-2xl font-bold text-blue-800">{area.score}</div>
              <div className="text-gray-500 ml-1">/15分</div>
            </div>
            
            <p className="text-gray-700 leading-relaxed mb-4">
              {area.analysis}
            </p>
            
            <p className="text-gray-700 leading-relaxed">
              {area.recommendations}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default ResearchScaleEvaluation; 