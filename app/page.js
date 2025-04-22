'use client';

import React, { useEffect, useState } from 'react';
import PrintableReport from './components/sections/PrintableReport';

// 匯入所有JSON檔案
import reportInfo from './data/reportInfo.json';
import companyInfo from './data/companyInfo.json';
import tableOfContents from './data/tableOfContents.json';
import diagnosticAnalysis from './data/diagnosticAnalysis.json';
import researchScaleEvaluation from './data/researchScaleEvaluation.json';
import industryAnalysis from './data/industryAnalysis.json';
import digitalTransformationRecommendations from './data/digitalTransformationRecommendations.json';
import visitRecord from './data/visitRecord.json';

export default function Home() {
  const [reportData, setReportData] = useState(null);
  
  useEffect(() => {
    // 正確合併所有資料 - 保持每個JSON檔案的頂層結構
    // 處理診斷分析資料，移除 priorityIndex
    const processedDiagnosticAnalysis = { ...diagnosticAnalysis.diagnosticAnalysis };
    if (processedDiagnosticAnalysis.priorityIndex) {
      delete processedDiagnosticAnalysis.priorityIndex;
    }
    
    const mergedData = {
      reportInfo: reportInfo.reportInfo,
      companyInfo: companyInfo.companyInfo,
      tableOfContents: tableOfContents.tableOfContents,
      diagnosticAnalysis: processedDiagnosticAnalysis,
      researchScaleEvaluation: researchScaleEvaluation.researchScaleEvaluation,
      industryAnalysis: industryAnalysis.industryAnalysis,
      digitalTransformationRecommendations: digitalTransformationRecommendations.digitalTransformationRecommendations,
      visitRecord: visitRecord.visitRecord
    };
    
    // 設定報告資料
    setReportData(mergedData);
    
    // 開發偵錯
    console.log('報告資料已載入:', mergedData);
  }, []);

  // 等待資料載入
  if (!reportData) {
    return <div className="min-h-screen flex items-center justify-center">載入中...</div>;
  }

  return (
    <main className="min-h-screen">
      <PrintableReport data={reportData} />
    </main>
  );
}