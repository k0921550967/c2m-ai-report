'use client';

import React from 'react';

const ReportHeader = ({ reportInfo, companyInfo }) => {
  return (
    <div className="mb-12 text-center print:page-break-after">
      <div className="flex justify-center mb-8">
        <svg width="80" height="80">
          <circle cx="40" cy="40" r="40" fill="#1e40af" />
          <g transform="translate(20,20)">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </g>
        </svg>
      </div>
      <h1 className="text-4xl font-bold text-blue-900 mb-4">{reportInfo.title}</h1>
      <h2 className="text-3xl font-bold mb-8">{reportInfo.subtitle}</h2>
      <div className="mt-16 text-xl">
        <div className="mb-2">企業名稱：{companyInfo.name}</div>
        <div className="mb-2">案件編號：{reportInfo.caseNumber}</div>
        <div className="mb-2">診斷日期：{reportInfo.date}</div>
        <div className="mb-2">執行單位：{reportInfo.executiveUnit}</div>
      </div>
    </div>
  );
};

export default ReportHeader; 