import React from 'react';

const CustomerFeedbackChart = () => (
  <svg width="800" height="320" viewBox="0 0 800 320">
    <text x="400" y="30" textAnchor="middle" fontSize="16" fontWeight="bold">正負評論數</text>
    <text x="400" y="50" textAnchor="middle" fontSize="12">
      <tspan fill="#38B2AC">•正評</tspan>
      <tspan fill="#E53E3E" dx="10">•負評</tspan>
    </text>
    
    {/* 座標軸與背景 */}
    <rect x="50" y="70" width="700" height="200" fill="#f8fafc" />
    <line x1="50" y1="270" x2="750" y2="270" stroke="#333" strokeWidth="2" />
    <line x1="50" y1="70" x2="50" y2="270" stroke="#333" strokeWidth="2" />
    
    {/* Y軸標籤 */}
    <text x="45" y="85" textAnchor="end" fontSize="10">3,500</text>
    <text x="45" y="125" textAnchor="end" fontSize="10">3,000</text>
    <text x="45" y="165" textAnchor="end" fontSize="10">2,500</text>
    <text x="45" y="205" textAnchor="end" fontSize="10">2,000</text>
    <text x="45" y="245" textAnchor="end" fontSize="10">500</text>
    <text x="45" y="270" textAnchor="end" fontSize="10">0</text>
    
    {/* 特性條形圖 - 主要特性 */}
    <rect x="70" y="90" width="70" height="180" fill="#38B2AC" />
    <rect x="70" y="90" width="70" height="15" fill="#E53E3E" />
    <text x="105" y="105" textAnchor="middle" fontSize="11" fill="white">220</text>
    <text x="105" y="200" textAnchor="middle" fontSize="12" fill="white">2833</text>
    <text x="105" y="285" textAnchor="middle" fontSize="11">口感 (Taste)</text>
    
    <rect x="160" y="120" width="70" height="150" fill="#38B2AC" />
    <rect x="160" y="120" width="70" height="30" fill="#E53E3E" />
    <text x="195" y="140" textAnchor="middle" fontSize="11" fill="white">473</text>
    <text x="195" y="210" textAnchor="middle" fontSize="12" fill="white">2047</text>
    <text x="195" y="285" textAnchor="middle" fontSize="11">風味 (Flavor)</text>
    
    <rect x="250" y="170" width="70" height="100" fill="#38B2AC" />
    <rect x="250" y="170" width="70" height="20" fill="#E53E3E" />
    <text x="285" y="185" textAnchor="middle" fontSize="11" fill="white">380</text>
    <text x="285" y="230" textAnchor="middle" fontSize="12" fill="white">1545</text>
    <text x="285" y="285" textAnchor="middle" fontSize="11">麵條 (Noodles)</text>
    
    {/* 次要特性條形圖 */}
    <rect x="340" y="245" width="40" height="25" fill="#38B2AC" />
    <rect x="340" y="245" width="40" height="15" fill="#E53E3E" />
    <text x="360" y="255" textAnchor="middle" fontSize="9" fill="white">140</text>
    <text x="360" y="265" textAnchor="middle" fontSize="9" fill="white">180</text>
    <text x="360" y="285" textAnchor="middle" fontSize="11">價格 (Price)</text>
    
    <rect x="390" y="245" width="40" height="25" fill="#38B2AC" />
    <rect x="390" y="245" width="40" height="8" fill="#E53E3E" />
    <text x="410" y="251" textAnchor="middle" fontSize="9" fill="white">40</text>
    <text x="410" y="265" textAnchor="middle" fontSize="9" fill="white">160</text>
    <text x="410" y="285" textAnchor="middle" fontSize="11">用戶體驗</text>
    
    <rect x="440" y="245" width="40" height="25" fill="#38B2AC" />
    <rect x="440" y="245" width="40" height="7" fill="#E53E3E" />
    <text x="460" y="250" textAnchor="middle" fontSize="9" fill="white">30</text>
    <text x="460" y="265" textAnchor="middle" fontSize="9" fill="white">150</text>
    <text x="460" y="285" textAnchor="middle" fontSize="11">品牌 (Brand)</text>
    
    <rect x="490" y="247" width="40" height="23" fill="#38B2AC" />
    <rect x="490" y="247" width="40" height="7" fill="#E53E3E" />
    <text x="510" y="252" textAnchor="middle" fontSize="9" fill="white">30</text>
    <text x="510" y="265" textAnchor="middle" fontSize="9" fill="white">120</text>
    <text x="510" y="285" textAnchor="middle" fontSize="11">包裝信息</text>
    
    <rect x="540" y="248" width="40" height="22" fill="#38B2AC" />
    <rect x="540" y="248" width="40" height="10" fill="#E53E3E" />
    <text x="560" y="255" textAnchor="middle" fontSize="9" fill="white">50</text>
    <text x="560" y="265" textAnchor="middle" fontSize="9" fill="white">100</text>
    <text x="560" y="285" textAnchor="middle" fontSize="11">調味醬 (Sauce)</text>
    
    {/* 更多次要特性 - 只显示很小的条形 */}
    <rect x="590" y="248" width="40" height="22" fill="#38B2AC" />
    <rect x="590" y="248" width="40" height="4" fill="#E53E3E" />
    <text x="610" y="252" textAnchor="middle" fontSize="9" fill="white">20</text>
    <text x="610" y="265" textAnchor="middle" fontSize="9" fill="white">110</text>
    <text x="610" y="285" textAnchor="middle" fontSize="11">加熱 (Heat)</text>
    
    <rect x="640" y="249" width="40" height="21" fill="#38B2AC" />
    <rect x="640" y="249" width="40" height="5" fill="#E53E3E" />
    <text x="660" y="253" textAnchor="middle" fontSize="9" fill="white">25</text>
    <text x="660" y="265" textAnchor="middle" fontSize="9" fill="white">105</text>
    <text x="660" y="285" textAnchor="middle" fontSize="11">分量 (Volume)</text>
    
    <rect x="690" y="250" width="40" height="20" fill="#38B2AC" />
    <rect x="690" y="250" width="40" height="3" fill="#E53E3E" />
    <text x="710" y="253" textAnchor="middle" fontSize="9" fill="white">15</text>
    <text x="710" y="265" textAnchor="middle" fontSize="9" fill="white">100</text>
    <text x="710" y="285" textAnchor="middle" fontSize="11">保質期</text>
  </svg>
);

export default CustomerFeedbackChart; 