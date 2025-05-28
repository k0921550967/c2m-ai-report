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
      {/* 列印專用樣式 */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @media print {
            /* 頁面設置 */
            @page {
              size: A4 portrait;
              margin: 10mm 5mm 10mm 5mm;
            }
            
            /* 基本列印設置 */
            html {
              height: 100%;
            }
            
            body {
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
              color-adjust: exact !important;
              font-size: 11pt;
              line-height: 1.4;
              margin: 10mm 5mm 10mm 5mm !important;
              padding: 0;
            }
            
            /* 強制分頁控制 */
            .print\\:page-break-after {
              page-break-after: always !important;
              break-after: page !important;
              margin-bottom: 0 !important;
              padding-bottom: 0 !important;
            }
            
            .print\\:page-break-before {
              page-break-before: always !important;
              break-before: page !important;
              margin-top: 0 !important;
              padding-top: 0 !important;
            }
            
            /* 數位轉型建議每個小項分頁 */
            .digital-transformation-item {
              page-break-after: always !important;
              break-after: page !important;
              page-break-inside: avoid !important;
              break-inside: avoid !important;
            }
            
            /* 產業分類區塊不分段 */
            .industry-classification-block {
              page-break-inside: avoid !important;
              break-inside: avoid !important;
              page-break-after: avoid !important;
              break-after: avoid !important;
            }
            
            /* 確保廠商資訊在列印時保持左右兩列佈局 */
            .grid.grid-cols-1.md\\:grid-cols-2 {
              display: grid !important;
              grid-template-columns: 1fr 1fr !important;
              gap: 1.5rem !important;
            }
            
            /* 隱藏不需要列印的元素 */
            .no-print, 
            .print\\:hidden,
            button,
            .fixed {
              display: none !important;
            }
            
            /* 確保內容正確顯示 */
            * {
              overflow: visible !important;
              box-shadow: none !important;
            }
            
            /* 保持顏色和背景 */
            div, p, span, h1, h2, h3, h4, h5, h6 {
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
              color-adjust: exact !important;
            }
            
            /* 避免內容被分割 */
            .bg-white,
            .rounded-xl,
            .border-2,
            .grid,
            .space-y-4 > div,
            .space-y-6 > div {
              page-break-inside: avoid !important;
              break-inside: avoid !important;
            }
            
            /* 標題與內容不分離 */
            header {
              page-break-after: avoid !important;
              break-after: avoid !important;
            }
            
            h1, h2, h3, h4, h5, h6 {
              page-break-after: avoid !important;
              break-after: avoid !important;
              page-break-inside: avoid !important;
              break-inside: avoid !important;
            }
            
            /* 表格和清單保持完整 */
            table, ul, ol {
              page-break-inside: avoid !important;
              break-inside: avoid !important;
            }
            
            /* 圖表和視覺元素 */
            svg, .chart-container {
              page-break-inside: avoid !important;
              break-inside: avoid !important;
            }
            
            /* 確保漸層背景正確顯示 */
            .bg-gradient-to-r {
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            
            /* 確保邊框和圓角正確顯示 */
            .border, .border-2, .rounded-lg, .rounded-xl {
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
            
            /* 字體大小調整 */
            .text-4xl { font-size: 24pt !important; }
            .text-3xl { font-size: 20pt !important; }
            .text-2xl { font-size: 16pt !important; }
            .text-xl { font-size: 14pt !important; }
            .text-lg { font-size: 12pt !important; }
            .text-base { font-size: 11pt !important; }
            .text-sm { font-size: 10pt !important; }
            
            /* 間距調整 */
            .mb-12 { margin-bottom: 8mm !important; }
            .mb-8 { margin-bottom: 6mm !important; }
            .mb-6 { margin-bottom: 4mm !important; }
            .mb-4 { margin-bottom: 3mm !important; }
            .p-6 { padding: 4mm !important; }
            .p-4 { padding: 3mm !important; }
          }
          
          /* Chrome特殊設置 */
          @media print and (-webkit-min-device-pixel-ratio:0) {
            .print\\:page-break-before {
              page-break-before: always !important;
              -webkit-column-break-before: always !important;
            }
            
            .print\\:page-break-after {
              page-break-after: always !important;
              -webkit-column-break-after: always !important;
            }
            
            .digital-transformation-item {
              -webkit-column-break-after: always !important;
              -webkit-column-break-inside: avoid !important;
            }
            
            .industry-classification-block {
              -webkit-column-break-inside: avoid !important;
              -webkit-column-break-after: avoid !important;
            }
          }
        `
      }} />

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