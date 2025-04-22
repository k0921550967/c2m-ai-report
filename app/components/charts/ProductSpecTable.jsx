import React from 'react';

const ProductSpecTable = () => (
  <svg width="800" height="360" viewBox="0 0 800 360">
    <text x="400" y="30" textAnchor="middle" fontSize="16" fontWeight="bold">水煮麵 - 產品規格推薦表</text>
    
    {/* 表格外框與標頭 */}
    <rect x="50" y="50" width="700" height="290" fill="#f8fafc" stroke="#4A5568" strokeWidth="2" />
    
    {/* 表頭 */}
    <rect x="50" y="50" width="200" height="40" fill="#38B2AC" />
    <rect x="250" y="50" width="350" height="40" fill="#38B2AC" />
    <rect x="600" y="50" width="150" height="40" fill="#38B2AC" />
    <line x1="50" y1="90" x2="750" y2="90" stroke="#4A5568" strokeWidth="2" />
    <line x1="250" y1="50" x2="250" y2="340" stroke="#4A5568" strokeWidth="2" />
    <line x1="600" y1="50" x2="600" y2="340" stroke="#4A5568" strokeWidth="2" />
    <text x="150" y="75" textAnchor="middle" fontSize="14" fill="white">產品規格</text>
    <text x="425" y="75" textAnchor="middle" fontSize="14" fill="white">產品規格細項</text>
    <text x="675" y="75" textAnchor="middle" fontSize="14" fill="white">推薦序</text>
    
    {/* 過敏原行 - 調整為更寬的高度以容納三個項目 */}
    <rect x="50" y="90" width="200" height="54" fill="#E6FFFA" stroke="#4A5568" strokeWidth="1" />
    <rect x="250" y="90" width="350" height="54" fill="#ffffff" stroke="#4A5568" strokeWidth="1" />
    <rect x="600" y="90" width="150" height="54" fill="#ffffff" stroke="#4A5568" strokeWidth="1" />
    
    {/* 過敏原細項分隔線 */}
    <line x1="250" y1="108" x2="600" y2="108" stroke="#CBD5E0" strokeWidth="1" />
    <line x1="250" y1="126" x2="600" y2="126" stroke="#CBD5E0" strokeWidth="1" />
    
    {/* 過敏原推薦序分隔線 */}
    <line x1="600" y1="108" x2="750" y2="108" stroke="#CBD5E0" strokeWidth="1" />
    <line x1="600" y1="126" x2="750" y2="126" stroke="#CBD5E0" strokeWidth="1" />
    
    <text x="150" y="122" textAnchor="middle" fontSize="13">過敏原 (allergen)</text>
    <text x="270" y="103" textAnchor="start" fontSize="12">soybean</text>
    <text x="270" y="121" textAnchor="start" fontSize="12">tapioca</text>
    <text x="270" y="139" textAnchor="start" fontSize="12">wheatgluten</text>
    <circle cx="675" cy="99" r="12" fill="#38B2AC" />
    <text x="675" y="103" textAnchor="middle" fontSize="12" fill="white" fontWeight="bold">1</text>
    <circle cx="675" cy="117" r="12" fill="#38B2AC" />
    <text x="675" y="121" textAnchor="middle" fontSize="12" fill="white" fontWeight="bold">2</text>
    <circle cx="675" cy="135" r="12" fill="#38B2AC" />
    <text x="675" y="139" textAnchor="middle" fontSize="12" fill="white" fontWeight="bold">3</text>
    
    <line x1="50" y1="144" x2="750" y2="144" stroke="#4A5568" strokeWidth="1" />
    
    {/* 口味行 - 調整為更寬的高度以容納三個項目 */}
    <rect x="50" y="144" width="200" height="54" fill="#E6FFFA" stroke="#4A5568" strokeWidth="1" />
    <rect x="250" y="144" width="350" height="54" fill="#ffffff" stroke="#4A5568" strokeWidth="1" />
    <rect x="600" y="144" width="150" height="54" fill="#ffffff" stroke="#4A5568" strokeWidth="1" />
    
    {/* 口味細項分隔線 */}
    <line x1="250" y1="162" x2="600" y2="162" stroke="#CBD5E0" strokeWidth="1" />
    <line x1="250" y1="180" x2="600" y2="180" stroke="#CBD5E0" strokeWidth="1" />
    
    {/* 口味推薦序分隔線 */}
    <line x1="600" y1="162" x2="750" y2="162" stroke="#CBD5E0" strokeWidth="1" />
    <line x1="600" y1="180" x2="750" y2="180" stroke="#CBD5E0" strokeWidth="1" />
    
    <text x="150" y="176" textAnchor="middle" fontSize="13">口味 (flavor)</text>
    <text x="270" y="157" textAnchor="start" fontSize="12">gourmetspicy</text>
    <text x="270" y="175" textAnchor="start" fontSize="12">hotchicken</text>
    <text x="270" y="193" textAnchor="start" fontSize="11">firehotcheeseflaveredchicken</text>
    <circle cx="675" cy="153" r="12" fill="#38B2AC" />
    <text x="675" y="157" textAnchor="middle" fontSize="12" fill="white" fontWeight="bold">1</text>
    <circle cx="675" cy="171" r="12" fill="#38B2AC" />
    <text x="675" y="175" textAnchor="middle" fontSize="12" fill="white" fontWeight="bold">2</text>
    <circle cx="675" cy="189" r="12" fill="#38B2AC" />
    <text x="675" y="193" textAnchor="middle" fontSize="12" fill="white" fontWeight="bold">3</text>
    
    <line x1="50" y1="198" x2="750" y2="198" stroke="#4A5568" strokeWidth="1" />
    
    {/* 麵條行 - 調整為三個項目 */}
    <rect x="50" y="198" width="200" height="54" fill="#E6FFFA" stroke="#4A5568" strokeWidth="1" />
    <rect x="250" y="198" width="350" height="54" fill="#ffffff" stroke="#4A5568" strokeWidth="1" />
    <rect x="600" y="198" width="150" height="54" fill="#ffffff" stroke="#4A5568" strokeWidth="1" />
    
    {/* 麵條細項分隔線 */}
    <line x1="250" y1="216" x2="600" y2="216" stroke="#CBD5E0" strokeWidth="1" />
    <line x1="250" y1="234" x2="600" y2="234" stroke="#CBD5E0" strokeWidth="1" />
    
    {/* 麵條推薦序分隔線 */}
    <line x1="600" y1="216" x2="750" y2="216" stroke="#CBD5E0" strokeWidth="1" />
    <line x1="600" y1="234" x2="750" y2="234" stroke="#CBD5E0" strokeWidth="1" />
    
    <text x="150" y="229" textAnchor="middle" fontSize="13">麵條 (noodles)</text>
    <text x="270" y="211" textAnchor="start" fontSize="12">麵條</text>
    <text x="270" y="229" textAnchor="start" fontSize="12">boil/microwave</text>
    <text x="270" y="247" textAnchor="start" fontSize="12">boil</text>
    <circle cx="675" cy="207" r="12" fill="#38B2AC" />
    <text x="675" y="211" textAnchor="middle" fontSize="12" fill="white" fontWeight="bold">1</text>
    <circle cx="675" cy="225" r="12" fill="#38B2AC" />
    <text x="675" y="229" textAnchor="middle" fontSize="12" fill="white" fontWeight="bold">2</text>
    <circle cx="675" cy="243" r="12" fill="#38B2AC" />
    <text x="675" y="247" textAnchor="middle" fontSize="12" fill="white" fontWeight="bold">3</text>
    
    <line x1="50" y1="252" x2="750" y2="252" stroke="#4A5568" strokeWidth="1" />
    
    {/* 包裝行 - 調整為三個項目 */}
    <rect x="50" y="252" width="200" height="54" fill="#E6FFFA" stroke="#4A5568" strokeWidth="1" />
    <rect x="250" y="252" width="350" height="54" fill="#ffffff" stroke="#4A5568" strokeWidth="1" />
    <rect x="600" y="252" width="150" height="54" fill="#ffffff" stroke="#4A5568" strokeWidth="1" />
    
    {/* 包裝細項分隔線 */}
    <line x1="250" y1="270" x2="600" y2="270" stroke="#CBD5E0" strokeWidth="1" />
    <line x1="250" y1="288" x2="600" y2="288" stroke="#CBD5E0" strokeWidth="1" />
    
    {/* 包裝推薦序分隔線 */}
    <line x1="600" y1="270" x2="750" y2="270" stroke="#CBD5E0" strokeWidth="1" />
    <line x1="600" y1="288" x2="750" y2="288" stroke="#CBD5E0" strokeWidth="1" />
    
    <text x="150" y="282" textAnchor="middle" fontSize="12">包裝 (package info)</text>
    <text x="270" y="265" textAnchor="start" fontSize="12">110g</text>
    <text x="270" y="283" textAnchor="start" fontSize="12">125g</text>
    <text x="270" y="301" textAnchor="start" fontSize="12">112g</text>
    <circle cx="675" cy="261" r="12" fill="#38B2AC" />
    <text x="675" y="265" textAnchor="middle" fontSize="12" fill="white" fontWeight="bold">1</text>
    <circle cx="675" cy="279" r="12" fill="#38B2AC" />
    <text x="675" y="283" textAnchor="middle" fontSize="12" fill="white" fontWeight="bold">2</text>
    <circle cx="675" cy="297" r="12" fill="#38B2AC" />
    <text x="675" y="301" textAnchor="middle" fontSize="12" fill="white" fontWeight="bold">3</text>
    
    <line x1="50" y1="306" x2="750" y2="306" stroke="#4A5568" strokeWidth="1" />
    
    {/* 重量行 */}
    <rect x="50" y="306" width="200" height="40" fill="#E6FFFA" stroke="#4A5568" strokeWidth="1" />
    <rect x="250" y="306" width="350" height="40" fill="#ffffff" stroke="#4A5568" strokeWidth="1" />
    <rect x="600" y="306" width="150" height="40" fill="#ffffff" stroke="#4A5568" strokeWidth="1" />
    
    {/* 重量細項分隔線 */}
    <line x1="250" y1="326" x2="600" y2="326" stroke="#CBD5E0" strokeWidth="1" />
    
    {/* 重量推薦序分隔線 */}
    <line x1="600" y1="326" x2="750" y2="326" stroke="#CBD5E0" strokeWidth="1" />
    
    <text x="150" y="331" textAnchor="middle" fontSize="13">重量 (weight)</text>
    <text x="270" y="320" textAnchor="start" fontSize="12">4800g</text>
    <text x="270" y="338" textAnchor="start" fontSize="12">550g</text>
    <circle cx="675" cy="316" r="12" fill="#38B2AC" />
    <text x="675" y="320" textAnchor="middle" fontSize="12" fill="white" fontWeight="bold">1</text>
    <circle cx="675" cy="334" r="12" fill="#38B2AC" />
    <text x="675" y="338" textAnchor="middle" fontSize="12" fill="white" fontWeight="bold">2</text>
  </svg>
);

export default ProductSpecTable; 