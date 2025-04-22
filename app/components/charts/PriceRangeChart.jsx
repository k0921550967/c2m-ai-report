import React from 'react';

const PriceRangeChart = () => (
  <svg width="800" height="340" viewBox="0 0 800 340">
    {/* 座標軸 */}
    <line x1="70" y1="250" x2="750" y2="250" stroke="#333" strokeWidth="2" />
    <line x1="70" y1="250" x2="70" y2="50" stroke="#333" strokeWidth="2" />
    
    {/* X軸標籤 */}
    <text x="400" y="310" textAnchor="middle" fontSize="14" fontWeight="bold">價格區間 (千元/件)</text>
    <text x="85" y="280" textAnchor="middle" fontSize="10">3-below</text>
    <text x="160" y="280" textAnchor="middle" fontSize="10">6-8.99</text>
    <text x="235" y="280" textAnchor="middle" fontSize="10">9-11.99</text>
    <text x="310" y="280" textAnchor="middle" fontSize="10">12-14.99</text>
    <text x="385" y="280" textAnchor="middle" fontSize="10">15-17.99</text>
    <text x="460" y="280" textAnchor="middle" fontSize="10">18-20.99</text>
    <text x="535" y="280" textAnchor="middle" fontSize="10">21-23.99</text>
    <text x="610" y="280" textAnchor="middle" fontSize="10">24-26.99</text>
    <text x="685" y="280" textAnchor="middle" fontSize="10">27-29.99</text>
    <text x="735" y="280" textAnchor="middle" fontSize="10">30-above</text>
    
    {/* Y軸標籤 */}
    <text x="25" y="150" textAnchor="middle" fontSize="14" fontWeight="bold" transform="rotate(-90, 25, 150)">銷售額 (千元)</text>
    <text x="60" y="250" textAnchor="end" fontSize="10">0</text>
    <text x="60" y="210" textAnchor="end" fontSize="10">5,000</text>
    <text x="60" y="170" textAnchor="end" fontSize="10">10,000</text>
    <text x="60" y="130" textAnchor="end" fontSize="10">15,000</text>
    <text x="60" y="90" textAnchor="end" fontSize="10">20,000</text>
    <text x="60" y="50" textAnchor="end" fontSize="10">25,000</text>
    
    {/* 銷售額柱狀圖 */}
    <rect x="85" y="249" width="25" height="1" fill="#F59E0B" />
    <rect x="160" y="217" width="25" height="33" fill="#F59E0B" />
    <rect x="235" y="156" width="25" height="94" fill="#F59E0B" />
    <rect x="310" y="52" width="25" height="198" fill="#F59E0B" />
    <rect x="385" y="162" width="25" height="88" fill="#F59E0B" />
    <rect x="460" y="92" width="25" height="158" fill="#F59E0B" />
    <rect x="535" y="209" width="25" height="41" fill="#F59E0B" />
    <rect x="610" y="214" width="25" height="36" fill="#F59E0B" />
    <rect x="685" y="230" width="25" height="20" fill="#F59E0B" />
    <rect x="735" y="180" width="25" height="70" fill="#F59E0B" />
    
    {/* 數據標籤 */}
    <text x="85" y="244" textAnchor="middle" fontSize="10" fontWeight="bold">未標示</text>
    <text x="160" y="212" textAnchor="middle" fontSize="10" fontWeight="bold">644,501</text>
    <text x="235" y="151" textAnchor="middle" fontSize="10" fontWeight="bold">8,474,667</text>
    <text x="310" y="47" textAnchor="middle" fontSize="10" fontWeight="bold">20,338,249</text>
    <text x="385" y="157" textAnchor="middle" fontSize="10" fontWeight="bold">7,498,281</text>
    <text x="460" y="87" textAnchor="middle" fontSize="10" fontWeight="bold">15,698,308</text>
    <text x="535" y="204" textAnchor="middle" fontSize="10" fontWeight="bold">4,136,662</text>
    <text x="610" y="209" textAnchor="middle" fontSize="10" fontWeight="bold">3,606,575</text>
    <text x="685" y="225" textAnchor="middle" fontSize="10" fontWeight="bold">1,935,397</text>
    <text x="735" y="175" textAnchor="middle" fontSize="10" fontWeight="bold">6,666,202</text>
    
    {/* 趨勢線 */}
    <path d="M85 232 L160 232 L235 121 L310 106 L385 123 L460 237 L535 243 L610 243 L685 243 L735 243" fill="none" stroke="#7E22CE" strokeWidth="3" />
    
    {/* 圖例 */}
    <rect x="580" y="80" width="150" height="70" fill="white" stroke="#ddd" />
    <rect x="590" y="95" width="20" height="10" fill="#F59E0B" />
    <text x="620" y="105" fontSize="12">銷售額 (千元)</text>
    <line x1="590" y1="125" x2="610" y2="125" stroke="#7E22CE" strokeWidth="3" />
    <text x="620" y="130" fontSize="12">評價個數</text>
  </svg>
);

export default PriceRangeChart; 