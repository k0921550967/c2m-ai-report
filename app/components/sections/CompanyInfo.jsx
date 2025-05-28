'use client';

import React, { useRef, useEffect, useState } from 'react';
import { User, Building, Phone, Mail, DollarSign, FileText, MapPin, Briefcase } from 'lucide-react';

const CompanyInfo = ({ companyInfo }) => {
  if (!companyInfo) {
    return <div>No company information available</div>;
  }

  // 動態計算主分類與子分類的寬度
  const mainRef = useRef(null);
  const subRef = useRef(null);
  const [mainWidth, setMainWidth] = useState(120);
  const [subWidth, setSubWidth] = useState(80);

  useEffect(() => {
    if (mainRef.current) {
      const textWidth = mainRef.current.getBBox().width;
      setMainWidth(textWidth + 40 + 20); // 左圓點+間距+右padding
    }
    if (subRef.current) setSubWidth(subRef.current.getBBox().width + 32);
  }, [companyInfo]);

  return (
    <div>
      <div className="bg-white p-6 rounded-xl border-2 border-blue-200 mb-8">
        {/* 製造業類別標籤 - 置頂顯示 */}
        <div className="mb-6 industry-classification-block">
          {/* SVG 主分類標籤 */}
          {companyInfo.industryClassification?.main && (
            <svg
              width={mainWidth}
              height="40"
              style={{ display: 'block' }}
            >
              <defs>
                <filter id="industry-shadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#FDBA74" floodOpacity="0.15" />
                </filter>
              </defs>
              {/* 橢圓底 */}
              <rect x="0" y="4" width={mainWidth} height="32" rx="16" fill="#FFF7ED" stroke="#FDBA74" strokeWidth="1" filter="url(#industry-shadow)" />
              {/* 左側圓點 */}
              <circle cx="22" cy="20" r="8" fill="#FB923C" />
              {/* 主分類文字 */}
              <text
                ref={mainRef}
                x="40"
                y="23"
                fontSize="18"
                fontWeight="bold"
                fill="#B45309"
                style={{ letterSpacing: '0.05em', dominantBaseline: 'middle', fontFamily: 'inherit' }}
              >
                {companyInfo.industryClassification.main}
              </text>
            </svg>
          )}
          {/* 子分類標籤（div 粗體深橘色文字，無底色） */}
          {companyInfo.industryClassification?.sub && (
            <div
              style={{
                color: '#B45309',
                fontWeight: 'bold',
                fontSize: '1rem',
                marginTop: 12,
                letterSpacing: '0.02em',
              }}
            >
              {companyInfo.industryClassification.sub}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 gap-6">
          {/* 基本聯絡資訊 */}
          <div className="p-4">
            <h3 className="text-lg font-semibold text-blue-800 mb-4">基本聯絡資訊</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="mb-4">
                  <div className="text-gray-600 mb-1">公司名稱</div>
                  <div className="text-blue-800 font-medium">{companyInfo.companyName}</div>
                </div>
                
                <div className="mb-4">
                  <div className="text-gray-600 mb-1">負責人</div>
                  <div className="text-blue-800 font-medium">{companyInfo.representative}</div>
                </div>
                
                <div className="mb-4">
                  <div className="text-gray-600 mb-1">地址</div>
                  <div className="text-blue-800 font-medium">{companyInfo.address}</div>
                </div>
              </div>
              
              <div>
                <div className="mb-4">
                  <div className="text-gray-600 mb-1">統一編號</div>
                  <div className="text-blue-800 font-medium">{companyInfo.companyId}</div>
                </div>
                
                <div className="mb-4">
                  <div className="text-gray-600 mb-1">聯絡人</div>
                  <div className="text-blue-800 font-medium">{companyInfo.contactPerson}</div>
                </div>
                
                <div className="mb-4">
                  <div className="text-gray-600 mb-1">職稱</div>
                  <div className="text-blue-800 font-medium">{companyInfo.jobTitle}</div>
                </div>
                
                <div className="mb-4">
                  <div className="text-gray-600 mb-1">聯絡電話</div>
                  <div className="text-blue-800 font-medium">{companyInfo.phone}</div>
                </div>
                
                <div className="mb-4">
                  <div className="text-gray-600 mb-1">E-Mail</div>
                  <div className="text-blue-800 font-medium">{companyInfo.email}</div>
                </div>
              </div>
            </div>
          </div>

          {/* 廠商資訊 */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-blue-800 mb-4">廠商資訊</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="mb-4">
                  <div className="text-gray-600 mb-1">公司所在地區</div>
                  <div className="text-blue-800 font-medium">{companyInfo.companyLocation}</div>
                </div>
                
                <div className="mb-4">
                  <div className="text-gray-600 mb-1">實收資本額</div>
                  <div className="text-blue-800 font-medium">{companyInfo.paidInCapital}</div>
                </div>
                
                <div className="mb-4">
                  <div className="text-gray-600 mb-1">員工人數</div>
                  <div className="text-blue-800 font-medium">{companyInfo.employeeCount}</div>
                </div>

                <div className="mb-4">
                  <div className="text-gray-600 mb-1">工廠編號</div>
                  <div className="text-blue-800 font-medium">{companyInfo.factoryId}</div>
                </div>
              </div>
              
              <div>
                <div className="mb-4">
                  <div className="text-gray-600 mb-1">公司所屬產業的經營型態</div>
                  <div className="text-blue-800 font-medium">{companyInfo.businessType}</div>
                </div>
                
                <div className="mb-4">
                  <div className="text-gray-600 mb-1">前年度營業額</div>
                  <div className="text-blue-800 font-medium">{companyInfo.lastYearRevenue}</div>
                </div>
                
                <div className="mb-4">
                  <div className="text-gray-600 mb-1">主要產品</div>
                  <div className="text-blue-800 font-medium">{companyInfo.mainProducts}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-xl border-2 border-blue-200">
        <h3 className="text-xl font-bold text-blue-800 mb-6">公司簡介</h3>
        {companyInfo.companyDescription && (
          <p className="text-gray-700 leading-relaxed mt-4">
            {companyInfo.companyDescription}
          </p>
        )}
      </div>
    </div>
  );
};

export default CompanyInfo; 