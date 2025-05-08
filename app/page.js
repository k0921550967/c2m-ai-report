'use client';

import React, { useEffect, useRef, useState } from 'react';
import PrintableReport from './components/sections/PrintableReport';
// 匯入所有JSON檔案
import reportInfo from './data/reportInfo.json';
import companyInfo from './data/companyInfo.json';
import tableOfContents from './data/tableOfContents.json';
import diagnosticAnalysis from './data/diagnosticAnalysis.json';
import researchScaleEvaluation from './data/researchScaleEvaluation.json';
import industryAnalysis from './data/industryAnalysis.json';
import digitalTransformationRecommendations from './data/digitalTransformationRecommendations.json';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default function Home() {
  const [reportData, setReportData] = useState(null);
  const mainRef = useRef();

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
      digitalTransformationRecommendations: digitalTransformationRecommendations.digitalTransformationRecommendations
    };

    // 設定報告資料
    setReportData(mergedData);

    // 開發偵錯
    console.log('報告資料已載入:', mergedData);
  }, []);

  useEffect(() => {
    if (!reportData) return;
    // 等待 DOM 完全渲染
    const timer = setTimeout(async () => {
      if (!mainRef.current) return;
      const sections = mainRef.current.querySelectorAll('.pdf-section');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'pt',
        format: 'a4',
      });
      const margin = 24; // 24pt 邊距
      const pdfWidth = pdf.internal.pageSize.getWidth() - margin * 2;
      const pageHeight = pdf.internal.pageSize.getHeight() - margin * 2;
      let firstPage = true;
      for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        // 單獨渲染每個段落
        const canvas = await html2canvas(section, { scale: 2 });
        const imgData = canvas.toDataURL('image/png');
        const imgProps = pdf.getImageProperties(imgData);
        let imgWidth = pdfWidth;
        let imgHeight = (imgProps.height * imgWidth) / imgProps.width;
        // 若段落高度超過一頁，則縮放至一頁
        if (imgHeight > pageHeight) {
          imgHeight = pageHeight;
          imgWidth = (imgProps.width * pageHeight) / imgProps.height;
        }
        if (!firstPage) {
          pdf.addPage();
        }
        pdf.addImage(imgData, 'PNG', margin, margin, imgWidth, imgHeight);
        firstPage = false;
      }
      pdf.save('full-page-report.pdf');
    }, 1200);
    return () => clearTimeout(timer);
  }, [reportData]);

  // 等待資料載入
  if (!reportData) {
    return <div className="min-h-screen flex items-center justify-center">載入中...</div>;
  }

  return (
    <main ref={mainRef} className="min-h-screen">
      <PrintableReport data={reportData} />
    </main>
  );
}