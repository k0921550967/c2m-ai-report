import React from 'react';

const MonthlySalesChart = () => (
  <svg width="800" height="320" viewBox="0 0 800 320">
    <text x="400" y="30" textAnchor="middle" fontSize="16" fontWeight="bold">月單價與月銷售金額</text>
    <text x="400" y="50" textAnchor="middle" fontSize="12">•月銷售金額 •平均單價</text>
    
    {/* 背景 */}
    <rect x="50" y="60" width="700" height="190" fill="#f8fafc" />
    
    {/* 座標軸 */}
    <line x1="50" y1="250" x2="750" y2="250" stroke="#333" strokeWidth="2" />
    <line x1="50" y1="250" x2="50" y2="60" stroke="#333" strokeWidth="2" />
    
    {/* Y軸右側標籤 - 平均單價 */}
    <text x="760" y="70" textAnchor="start" fontSize="11">22</text>
    <text x="760" y="110" textAnchor="start" fontSize="11">20</text>
    <text x="760" y="150" textAnchor="start" fontSize="11">18</text>
    <text x="760" y="190" textAnchor="start" fontSize="11">16</text>
    <text x="760" y="230" textAnchor="start" fontSize="11">14</text>
    
    {/* Y軸左側標籤 - 銷售額 */}
    <text x="45" y="70" textAnchor="end" fontSize="11">6M</text>
    <text x="45" y="110" textAnchor="end" fontSize="11">5M</text>
    <text x="45" y="150" textAnchor="end" fontSize="11">4M</text>
    <text x="45" y="190" textAnchor="end" fontSize="11">3M</text>
    <text x="45" y="230" textAnchor="end" fontSize="11">1M</text>
    <text x="45" y="250" textAnchor="end" fontSize="11">0M</text>
    
    {/* 月份柱狀圖 - 2021-11至2024-08 */}
    <rect x="60" y="225" width="14" height="25" fill="#4299E1" />
    <rect x="80" y="220" width="14" height="30" fill="#4299E1" />
    <rect x="100" y="200" width="14" height="50" fill="#4299E1" />
    <rect x="120" y="230" width="14" height="20" fill="#4299E1" />
    <rect x="140" y="230" width="14" height="20" fill="#4299E1" />
    <rect x="160" y="215" width="14" height="35" fill="#4299E1" />
    <rect x="180" y="200" width="14" height="50" fill="#4299E1" />
    <rect x="200" y="190" width="14" height="60" fill="#4299E1" />
    <rect x="220" y="185" width="14" height="65" fill="#4299E1" />
    <rect x="240" y="170" width="14" height="80" fill="#4299E1" />
    <rect x="260" y="210" width="14" height="40" fill="#4299E1" />
    <rect x="280" y="210" width="14" height="40" fill="#4299E1" />
    <rect x="300" y="195" width="14" height="55" fill="#4299E1" />
    <rect x="320" y="140" width="14" height="110" fill="#4299E1" />
    <rect x="340" y="140" width="14" height="110" fill="#4299E1" />
    <rect x="360" y="180" width="14" height="70" fill="#4299E1" />
    <rect x="380" y="185" width="14" height="65" fill="#4299E1" />
    <rect x="400" y="180" width="14" height="70" fill="#4299E1" />
    <rect x="420" y="175" width="14" height="75" fill="#4299E1" />
    <rect x="440" y="150" width="14" height="100" fill="#4299E1" />
    <rect x="460" y="90" width="14" height="160" fill="#4299E1" />
    <rect x="480" y="115" width="14" height="135" fill="#4299E1" />
    <rect x="500" y="135" width="14" height="115" fill="#4299E1" />
    <rect x="520" y="125" width="14" height="125" fill="#4299E1" />
    <rect x="540" y="70" width="14" height="180" fill="#4299E1" />
    <rect x="560" y="95" width="14" height="155" fill="#4299E1" />
    <rect x="580" y="80" width="14" height="170" fill="#4299E1" />
    <rect x="600" y="105" width="14" height="145" fill="#4299E1" />
    <rect x="620" y="95" width="14" height="155" fill="#4299E1" />
    <rect x="640" y="135" width="14" height="115" fill="#4299E1" />
    <rect x="660" y="145" width="14" height="105" fill="#4299E1" />
    <rect x="680" y="190" width="14" height="60" fill="#4299E1" />
    <rect x="700" y="195" width="14" height="55" fill="#4299E1" />
    
    {/* 銷售額數據標籤 - 只顯示部分代表性數據 */}
    <text x="67" y="215" textAnchor="middle" fontSize="9" transform="rotate(-90, 67, 215)">454,329</text>
    <text x="200" y="180" textAnchor="middle" fontSize="9" transform="rotate(-90, 200, 180)">1,043,484</text>
    <text x="320" y="130" textAnchor="middle" fontSize="9" transform="rotate(-90, 320, 130)">2,177,691</text>
    <text x="460" y="80" textAnchor="middle" fontSize="9" transform="rotate(-90, 460, 80)">4,796,956</text>
    <text x="540" y="60" textAnchor="middle" fontSize="9" transform="rotate(-90, 540, 60)">5,870,334</text>
    <text x="580" y="70" textAnchor="middle" fontSize="9" transform="rotate(-90, 580, 70)">5,269,297</text>
    <text x="700" y="185" textAnchor="middle" fontSize="9" transform="rotate(-90, 700, 185)">961,757</text>
    
    {/* 平均單價折線 - 更新數據 */}
    <path d="M67,150 L87,150 L107,170 L127,170 L147,170 L167,150 L187,150 L207,150 
             L227,150 L247,130 L267,110 L287,110 L307,110 L327,90 L347,90 L367,90 
             L387,90 L407,90 L427,110 L447,110 L467,110 L487,110 L507,110 L527,110 
             L547,110 L567,110 L587,110 L607,110 L627,110 L647,110 L667,150 L687,150" 
          fill="none" stroke="#E53E3E" strokeWidth="2" />
    
    {/* 平均單價點 */}
    <circle cx="67" cy="150" r="3" fill="#E53E3E" />
    <circle cx="107" cy="170" r="3" fill="#E53E3E" />
    <circle cx="167" cy="150" r="3" fill="#E53E3E" />
    <circle cx="227" cy="150" r="3" fill="#E53E3E" />
    <circle cx="267" cy="110" r="3" fill="#E53E3E" />
    <circle cx="327" cy="90" r="3" fill="#E53E3E" />
    <circle cx="427" cy="110" r="3" fill="#E53E3E" />
    <circle cx="527" cy="110" r="3" fill="#E53E3E" />
    <circle cx="627" cy="110" r="3" fill="#E53E3E" />
    <circle cx="687" cy="150" r="3" fill="#E53E3E" />
    
    {/* 單價數據標籤 - 只顯示部分 */}
    <text x="67" y="145" fontSize="9">17</text>
    <text x="107" y="165" fontSize="9">16</text>
    <text x="227" y="145" fontSize="9">17</text>
    <text x="327" y="85" fontSize="9">20</text>
    <text x="427" y="105" fontSize="9">19</text>
    <text x="527" y="105" fontSize="9">19</text>
    <text x="627" y="105" fontSize="9">19</text>
    <text x="687" y="145" fontSize="9">17</text>
    
    {/* X軸月份標籤 */}
    <text x="67" y="270" textAnchor="middle" fontSize="9">2021.11</text>
    <text x="167" y="270" textAnchor="middle" fontSize="9">2022.03</text>
    <text x="267" y="270" textAnchor="middle" fontSize="9">2022.07</text>
    <text x="367" y="270" textAnchor="middle" fontSize="9">2022.11</text>
    <text x="467" y="270" textAnchor="middle" fontSize="9">2023.03</text>
    <text x="567" y="270" textAnchor="middle" fontSize="9">2023.07</text>
    <text x="667" y="270" textAnchor="middle" fontSize="9">2023.11</text>
    <text x="717" y="270" textAnchor="middle" fontSize="9">2024.08</text>
    
    {/* 底部單位標籤 */}
    <text x="750" y="290" textAnchor="end" fontSize="11" fontWeight="bold">單位：萬元</text>
  </svg>
);

export default MonthlySalesChart; 