'use client';

import React, { useRef } from 'react';
import { User, Building, Phone, Mail, DollarSign, FileText, BarChart2, Layers, Database, Cpu, Search, ChevronRight, Check } from 'lucide-react';

// Import CompanyInfo component
import CompanyInfo from './CompanyInfo';
import ResearchScaleEvaluation from './ResearchScaleEvaluation';
import ResearchPriorityGoals from './ResearchPriorityGoals';
import ResearchCapabilityAnalysis from './ResearchCapabilityAnalysis';
import IndustryAnalysis from './IndustryAnalysis';
import DigitalTransformationRecommendations from './DigitalTransformationRecommendations';
import ReportHeader from './ReportHeader';

// Helper function to convert numbers to Chinese numerals
const toChineseNumber = (num) => {
  const chineseNumbers = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];
  if (num <= 10) return chineseNumbers[num - 1];
  if (num < 20) return '十' + (num > 10 ? chineseNumbers[num - 11] : '');
  const tens = Math.floor(num / 10);
  const ones = num % 10;
  return chineseNumbers[tens - 1] + '十' + (ones > 0 ? chineseNumbers[ones - 1] : '');
};

const PrintableReport = ({ data }) => {
  const reportRef = useRef(null);
  // 使用傳入的 data 參數
  const { reportInfo, companyInfo, diagnosticAnalysis, researchScaleEvaluation, industryAnalysis, digitalTransformationRecommendations } = data;

  // Helper function to render score bars
  const renderScoreBars = (score, maxScore = 5, colorClass = "bg-blue-600", emptyColorClass = "bg-blue-200") => {
    return (
      <div className="flex space-x-1 mr-2">
        {[...Array(score)].map((_, i) => (
          <div key={i} className={`h-2 w-5 ${colorClass} rounded-sm`}></div>
        ))}
        {[...Array(maxScore - score)].map((_, i) => (
          <div key={i} className={`h-2 w-5 ${emptyColorClass} rounded-sm`}></div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white font-sans p-10 text-black print:p-0 max-w-none" ref={reportRef}>
      {/* 封面 */}
      <div className="mb-12 print:page-break-after pdf-section">
        <ReportHeader reportInfo={reportInfo} companyInfo={companyInfo} />
      </div>

      {/* 一、廠商基本資料 */}
      <div className="mb-12 print:page-break-after pdf-section">
        <header className="mb-8">
          <h2 className="text-3xl font-bold text-blue-900">一、廠商基本資料</h2>
          <div className="mt-2 h-1 w-24 bg-orange-400 rounded-full"></div>
        </header>
        <CompanyInfo companyInfo={companyInfo} />
      </div>

      {/* 二、研發能力診斷分析 */}
      <div className="mb-12 print:page-break-after pdf-section">
        <header className="mb-8">
          <h2 className="text-3xl font-bold text-blue-900">二、研發能力診斷分析</h2>
          <div className="mt-2 h-1 w-24 bg-orange-400 rounded-full"></div>
        </header>
        <div className="mb-8">
          
          <ResearchPriorityGoals 
            diagnosticAnalysis={diagnosticAnalysis} 
            companyInfo={companyInfo} 
            renderScoreBars={renderScoreBars}
            toChineseNumber={toChineseNumber}
          />
        </div>
        <div className="mb-8">
          <h3 className="text-xl font-bold text-blue-800 mb-6">輔導需求分析</h3>
          <ResearchCapabilityAnalysis diagnosticAnalysis={diagnosticAnalysis} />
        </div>
      </div>
      {/* 三、研發量表評估分析 */}
      <div className="mb-12 print:page-break-after pdf-section">
        <header className="mb-8">
          <h2 className="text-3xl font-bold text-blue-900">三、研發量表評估分析</h2>
          <div className="mt-2 h-1 w-24 bg-orange-400 rounded-full"></div>
        </header>
        <ResearchScaleEvaluation researchScaleData={researchScaleEvaluation} />
      </div>
      {/* 四、產業分析及研發規格建議 */}
      <IndustryAnalysis 
        industryAnalysis={industryAnalysis} 
        productType={companyInfo.aiReportCategory ? companyInfo.aiReportCategory.split('(')[0] : '水煮麵'} 
        pdfSectionPerSubSection={true}
      />
      {/* 五、數位轉型建議 */}
      <div className="mb-12 print:page-break-after pdf-section">
        <header className="mb-8">
          <h2 className="text-3xl font-bold text-blue-900">五、數位轉型建議</h2>
          <div className="mt-2 h-1 w-24 bg-orange-400 rounded-full"></div>
        </header>
        <DigitalTransformationRecommendations digitalTransformationRecommendations={digitalTransformationRecommendations} />
      </div>

    </div>
  );
};

export default PrintableReport;