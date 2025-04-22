import React from 'react';

const SmallSpecificationHeatChart = () => (
  <svg width="800" height="300" viewBox="0 0 800 300">
    {/* 座標軸和標題 */}
    <text x="400" y="30" textAnchor="middle" fontSize="16" fontWeight="bold">水煮麵過敏原信息關注度</text>
    
    {/* 熱圖格式 - 使用與大規格圖表中過敏原相同的外框顏色 */}
    <rect x="50" y="50" width="700" height="200" fill="#f8fafc" stroke="#6D28D9" strokeWidth="3" />
    
    {/* 主要區塊 - 小麥 */}
    <rect x="50" y="50" width="350" height="100" fill="#8B5CF6" fillOpacity="0.9" />
    <text x="225" y="100" textAnchor="middle" fontSize="18" fill="white" fontWeight="bold">小麥</text>
    <text x="225" y="130" textAnchor="middle" fontSize="14" fill="white">(68,363,971)</text>
    
    {/* 次要區塊 - 大豆 */}
    <rect x="400" y="50" width="350" height="100" fill="#A78BFA" fillOpacity="0.9" />
    <text x="575" y="100" textAnchor="middle" fontSize="16" fill="white" fontWeight="bold">大豆</text>
    <text x="575" y="130" textAnchor="middle" fontSize="12" fill="white">(66,463,785)</text>
    
    {/* 次要區塊 - 牛奶 */}
    <rect x="50" y="150" width="230" height="100" fill="#C4B5FD" fillOpacity="0.9" />
    <text x="165" y="200" textAnchor="middle" fontSize="16" fill="white" fontWeight="bold">牛奶</text>
    <text x="165" y="225" textAnchor="middle" fontSize="12" fill="white">(18,304,640)</text>
    
    {/* 次要區塊 - 雞蛋 */}
    <rect x="280" y="150" width="170" height="100" fill="#DDD6FE" fillOpacity="0.9" />
    <text x="365" y="200" textAnchor="middle" fontSize="14" fill="#4C1D95" fontWeight="bold">雞蛋</text>
    <text x="365" y="225" textAnchor="middle" fontSize="12" fill="#4C1D95">(14,969,310)</text>
    
    {/* 小區塊 - 芝麻 */}
    <rect x="450" y="150" width="100" height="100" fill="#EDE9FE" fillOpacity="0.9" />
    <text x="500" y="200" textAnchor="middle" fontSize="14" fill="#4C1D95" fontWeight="bold">芝麻</text>
    <text x="500" y="225" textAnchor="middle" fontSize="10" fill="#4C1D95">(4,655,325)</text>
    
    {/* 小區塊 - 魚 */}
    <rect x="550" y="150" width="70" height="50" fill="#F5F3FF" fillOpacity="0.9" />
    <text x="585" y="175" textAnchor="middle" fontSize="12" fill="#4C1D95" fontWeight="bold">魚</text>
    <text x="585" y="195" textAnchor="middle" fontSize="10" fill="#4C1D95">(~2,500,000)</text>
    
    {/* 小區塊 - 黃豆 */}
    <rect x="620" y="150" width="70" height="50" fill="#F5F3FF" fillOpacity="0.9" />
    <text x="655" y="175" textAnchor="middle" fontSize="12" fill="#4C1D95" fontWeight="bold">黃豆</text>
    <text x="655" y="195" textAnchor="middle" fontSize="10" fill="#4C1D95">(~2,000,000)</text>
    
    {/* 小區塊 - 麩質 */}
    <rect x="550" y="200" width="140" height="50" fill="#F5F3FF" fillOpacity="0.9" />
    <text x="620" y="225" textAnchor="middle" fontSize="12" fill="#4C1D95" fontWeight="bold">麩質</text>
    <text x="620" y="245" textAnchor="middle" fontSize="10" fill="#4C1D95">(~1,500,000)</text>
    
    {/* 圖例 */}
    <rect x="50" y="260" width="700" height="30" fill="#f5f5f5" />
    <text x="400" y="280" textAnchor="middle" fontSize="14">過敏原規格關注度比例 (2021-2024年數據) - 方格大小代表市場關注量</text>
  </svg>
);

export default SmallSpecificationHeatChart; 