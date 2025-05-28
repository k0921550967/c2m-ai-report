'use client';

import React from 'react';

const ReportHeader = ({ reportInfo, companyInfo }) => {
  return (
    <div className="mb-12 text-center print:page-break-after">
      <h1 className="text-4xl font-bold text-blue-900 mb-4">{reportInfo.title}</h1>
      <h2 className="text-3xl font-bold mb-8">{reportInfo.subtitle}</h2>
      <div className="mt-16 text-xl">
        <div className="mb-2">企業名稱：{companyInfo.companyName}</div>
        <div className="mb-2">案件編號：{reportInfo.caseNumber}</div>
        <div className="mb-2">診斷日期：{reportInfo.date}</div>
        <div className="mb-2">執行單位：{reportInfo.executiveUnit}</div>
      </div>
    </div>
  );
};

export default ReportHeader; 