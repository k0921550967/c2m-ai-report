import React from 'react';

const LargeSpecificationHeatChart = () => (
  <svg width="800" height="300" viewBox="0 0 800 300">
    {/* 座標軸和標題 */}
    <text x="400" y="30" textAnchor="middle" fontSize="16" fontWeight="bold">水煮麵產品規格關注度</text>
    
    {/* 熱圖格式 */}
    <rect x="50" y="50" width="700" height="200" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />
    
    {/* 主要區塊 - 過敏原信息 - 添加紫色描邊與底色 */}
    <rect x="50" y="50" width="250" height="100" fill="#8B5CF6" fillOpacity="0.9" stroke="#6D28D9" strokeWidth="3" />
    <text x="175" y="100" textAnchor="middle" fontSize="18" fill="white" fontWeight="bold">過敏原信息</text>
    <text x="175" y="130" textAnchor="middle" fontSize="14" fill="white">(185,755,128)</text>
    
    {/* 次要區塊 - 口味 */}
    <rect x="300" y="50" width="220" height="100" fill="#60A5FA" fillOpacity="0.9" />
    <text x="410" y="100" textAnchor="middle" fontSize="16" fill="white" fontWeight="bold">口味</text>
    <text x="410" y="130" textAnchor="middle" fontSize="12" fill="white">(75,906,691)</text>
    
    {/* 次要區塊 - 麵條 (修改為藍色底色) */}
    <rect x="520" y="50" width="230" height="100" fill="#3B82F6" fillOpacity="0.9" />
    <text x="635" y="100" textAnchor="middle" fontSize="16" fill="white" fontWeight="bold">麵條</text>
    <text x="635" y="130" textAnchor="middle" fontSize="12" fill="white">(73,853,043)</text>
    
    {/* 包裝 */}
    <rect x="50" y="150" width="350" height="100" fill="#93C5FD" fillOpacity="0.9" />
    <text x="225" y="200" textAnchor="middle" fontSize="16" fill="#1E3A8A" fontWeight="bold">包裝</text>
    <text x="225" y="225" textAnchor="middle" fontSize="12" fill="#1E3A8A">(70,747,925)</text>
    
    {/* 重量 */}
    <rect x="400" y="150" width="350" height="100" fill="#BFDBFE" fillOpacity="0.9" />
    <text x="575" y="200" textAnchor="middle" fontSize="16" fill="#1E3A8A" fontWeight="bold">重量</text>
    <text x="575" y="225" textAnchor="middle" fontSize="12" fill="#1E3A8A">(70,747,925)</text>
    
    {/* 圖例 */}
    <rect x="50" y="260" width="700" height="30" fill="#f5f5f5" />
    <text x="400" y="280" textAnchor="middle" fontSize="14">水煮麵規格關注度比例 (2021-2024年數據) - 紫色區塊詳細分析見下圖</text>
  </svg>
);

export default LargeSpecificationHeatChart; 