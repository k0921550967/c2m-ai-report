import React from 'react';

const BrandPositionChart = () => (
  <svg width="800" height="340" viewBox="0 0 800 340">
    <defs>
      <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="1" stdDeviation="2" floodOpacity="0.3" />
      </filter>
    </defs>
    
    {/* 背景與座標軸 */}
    <rect x="70" y="50" width="680" height="200" fill="#F8FAFC" fillOpacity="0.6" rx="4" />
    <line x1="70" y1="250" x2="750" y2="250" stroke="#333" strokeWidth="2" />
    <line x1="70" y1="250" x2="70" y2="50" stroke="#333" strokeWidth="2" />
    
    {/* 參考線 - 提高可讀性 */}
    <line x1="70" y1="200" x2="750" y2="200" stroke="#CBD5E0" strokeWidth="1" strokeDasharray="5,5" />
    <line x1="70" y1="150" x2="750" y2="150" stroke="#CBD5E0" strokeWidth="1" strokeDasharray="5,5" />
    <line x1="70" y1="100" x2="750" y2="100" stroke="#CBD5E0" strokeWidth="1" strokeDasharray="5,5" />
    <line x1="220" y1="50" x2="220" y2="250" stroke="#CBD5E0" strokeWidth="1" strokeDasharray="5,5" />
    <line x1="370" y1="50" x2="370" y2="250" stroke="#CBD5E0" strokeWidth="1" strokeDasharray="5,5" />
    <line x1="520" y1="50" x2="520" y2="250" stroke="#CBD5E0" strokeWidth="1" strokeDasharray="5,5" />
    <line x1="670" y1="50" x2="670" y2="250" stroke="#CBD5E0" strokeWidth="1" strokeDasharray="5,5" />
    
    {/* X軸標籤 - 價格 */}
    <text x="400" y="310" textAnchor="middle" fontSize="14" fontWeight="bold">平均單價 (美元/包)</text>
    <text x="70" y="280" textAnchor="middle" fontSize="12">10</text>
    <text x="220" y="280" textAnchor="middle" fontSize="12">15</text>
    <text x="370" y="280" textAnchor="middle" fontSize="12">20</text>
    <text x="520" y="280" textAnchor="middle" fontSize="12">25</text>
    <text x="670" y="280" textAnchor="middle" fontSize="12">30</text>
    
    {/* Y軸標籤 - 滿意度 */}
    <text x="25" y="150" textAnchor="middle" fontSize="14" fontWeight="bold" transform="rotate(-90, 25, 150)">客戶滿意度 (%)</text>
    <text x="60" y="250" textAnchor="end" fontSize="12">0</text>
    <text x="60" y="200" textAnchor="end" fontSize="12">50</text>
    <text x="60" y="150" textAnchor="end" fontSize="12">70</text>
    <text x="60" y="100" textAnchor="end" fontSize="12">85</text>
    <text x="60" y="50" textAnchor="end" fontSize="12">100</text>
    
    {/* 製造商群組標示 */}
    {/* 韓國食品品牌群組 */}
    <circle cx="145" cy="80" r="35" fill="#3182CE" fillOpacity="0.85" filter="url(#shadow)" />
    <text x="145" y="80" textAnchor="middle" fontSize="14" fill="white" fontWeight="bold">韓國品牌</text>
    <text x="145" y="100" textAnchor="middle" fontSize="12" fill="white">製造商</text>
    
    {/* 中價位專業製造商群組 */}
    <circle cx="320" cy="120" r="25" fill="#805AD5" fillOpacity="0.85" filter="url(#shadow)" />
    <text x="320" y="120" textAnchor="middle" fontSize="12" fill="white" fontWeight="bold">MAMA</text>
    
    <circle cx="390" cy="140" r="22" fill="#805AD5" fillOpacity="0.85" filter="url(#shadow)" />
    <text x="390" y="140" textAnchor="middle" fontSize="12" fill="white" fontWeight="bold">祥榮食品</text>
    
    <circle cx="470" cy="125" r="20" fill="#805AD5" fillOpacity="0.85" filter="url(#shadow)" />
    <text x="470" y="125" textAnchor="middle" fontSize="11" fill="white" fontWeight="bold">味丹</text>
    
    {/* 日本系製造商群組 */}
    <circle cx="620" cy="90" r="35" fill="#E53E3E" fillOpacity="0.85" filter="url(#shadow)" />
    <text x="620" y="90" textAnchor="middle" fontSize="14" fill="white" fontWeight="bold">日本系</text>
    <text x="620" y="110" textAnchor="middle" fontSize="12" fill="white">製造商</text>
    
    {/* 圖例 */}
    <rect x="550" y="160" width="180" height="90" fill="white" stroke="#ddd" strokeWidth="1" filter="url(#shadow)" />
    <text x="640" y="180" textAnchor="middle" fontSize="12" fontWeight="bold">製造商群組</text>
    <circle cx="570" y="200" r="10" fill="#3182CE" fillOpacity="0.85" />
    <text x="640" y="200" textAnchor="middle" fontSize="12">韓國品牌: 10-15美元</text>
    <circle cx="570" y="225" r="10" fill="#805AD5" fillOpacity="0.85" />
    <text x="640" y="225" textAnchor="middle" fontSize="12">中價位: 20-25美元</text>
    <circle cx="570" y="250" r="10" fill="#E53E3E" fillOpacity="0.85" />
    <text x="640" y="250" textAnchor="middle" fontSize="12">日本系: 30美元+</text>
  </svg>
);

export default BrandPositionChart; 