'use client';

import React from 'react';
import { User, Building, Phone, Mail, DollarSign, FileText, MapPin, Briefcase } from 'lucide-react';

const CompanyInfo = ({ companyInfo }) => {
  if (!companyInfo) {
    return <div>No company information available</div>;
  }

  return (
    <div>
      <div className="bg-white p-6 rounded-xl border-2 border-blue-200 mb-8">
        {/* 製造業類別標籤 - 置頂顯示 */}
        <div className="mb-6">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-orange-100 to-orange-50 border border-orange-200">
            <div className="w-3 h-3 rounded-full bg-orange-500 mr-2"></div>
            <span className="text-orange-800 font-semibold">{companyInfo.industryClassification?.main}</span>
          </div>
          <div className="mt-2 text-orange-700 text-sm">
            {companyInfo.industryClassification?.sub}
          </div>
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