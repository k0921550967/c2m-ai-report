'use client';

import React, { useRef, useEffect } from 'react';
import { User, Building, Phone, Mail, DollarSign, FileText, BarChart2, Layers, Database, Cpu, Search, ChevronRight, Check, Download, Printer } from 'lucide-react';
import { loadHtml2pdf, setupPrintStyles } from '../scripts/html2pdfLoader';

// 預設靜態數據（如果沒有提供動態數據）
const defaultData = {
  reportInfo: {
    title: "數據驅動製造業研發創新計畫",
    subtitle: "研發轉型診斷報告書",
    caseNumber: "20250327-001",
    date: "2025年3月27日",
    executiveUnit: "財團法人商業發展研究院"
  },
  companyInfo: {
    name: "祥榮食品股份有限公司",
    representative: "王志明",
    address: "新北市五股區工業路185號",
    contactPerson: "李研發",
    uniformNumber: "12345678",
    phone: "(02)2345-6789",
    email: "contact@xiangrong-food.com.tw",
    position: "研發部經理",
    field: "食品製造",
    capital: "50,000 千元",
    revenue: "120,000 千元",
    employees: "65 人",
    mainProducts: "水煮麵、速食湯品、調味料、休閒食品",
    introduction: [
      "祥榮食品股份有限公司成立於1998年，專注於高品質水煮麵與多元化速食食品的研發與製造。公司擁有現代化的食品生產線與檢測設備，致力於提供健康、美味的食品產品，服務對象包括國內外連鎖超市、便利商店及餐飲業者。",
      "公司獲得ISO22000、HACCP等多項國際食品安全認證，產品出口至東南亞及北美多國。近年來，企業積極推動食品科技創新，導入智能化生產技術，並已建立初步的數據收集系統，但仍在尋求更全面的數位轉型方案，以提升研發效率與產品創新能力，滿足消費者不斷變化的需求與口味。"
    ]
  },
  tableOfContents: [
    {"title": "廠商基本資料", "page": "1"},
    {"title": "研發能力診斷分析", "page": "2"},
    {"title": "研發量表評估分析", "page": "5"},
    {"title": "數位轉型建議", "page": "7"},
    {"title": "附錄 訪視紀錄表", "page": "10"}
  ],
  diagnosticAnalysis: {
    // 簡化的診斷分析資料
    priorityIndex: "62%",
    capabilityAnalysis: {
      overall: "62%",
      researchProcess: "47%",
      dataDecision: "60%",
      designThinking: "80%",
      newTechnology: "60%",
      summary: [
        "優先發展：體驗設計思維進行研發已具基礎 (80%)，建議作為轉型發展的基石，帶動其他領域成長。",
        "急需突破：改變企業研發速度及研發流程推動程度較低 (47%)，應作為數位轉型的關鍵突破口。"
      ]
    }
  },
  researchScaleEvaluation: {
    // 簡化的研發量表評估資料
    areas: []
  },
  industryAnalysis: {
    // 簡化的產業分析資料
    sections: []
  },
  digitalTransformationRecommendations: {
    // 簡化的數位轉型建議資料
    stages: [],
    recommendedTools: []
  },
  visitRecord: {
    photoSpaces: 3,
    requiredSignatures: 2,
    notes: "請於訪視過程中拍攝至少3張現場照片，包含訪談場景、產品展示與製造設備等，並取得企業代表與訪視顧問的簽名。"
  }
};

const PrintableReport = ({ data = defaultData }) => {
  const reportRef = useRef(null);
  
  // 使用傳入的數據或默認數據
  const {
    reportInfo,
    companyInfo,
    tableOfContents,
    diagnosticAnalysis,
    researchScaleEvaluation,
    industryAnalysis,
    digitalTransformationRecommendations,
    visitRecord
  } = data;

  // 向伺服器請求建立PDF並下載
  const downloadPDF = async () => {
    if (!reportRef.current) return;
    
    // 顯示載入提示
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    loadingDiv.innerHTML = '<div class="bg-white p-4 rounded-lg shadow-lg"><p class="text-lg font-semibold">正在產生PDF，請稍候...</p></div>';
    document.body.appendChild(loadingDiv);
    
    try {
      // 加載HTML2PDF
      await loadHtml2pdf();
      
      // 檢查瀏覽器是否支援HTML轉PDF直接下載的功能
      const hasClient = !!window['html2pdf'];
      
      if (hasClient) {
        // 如果瀏覽器支援，使用客戶端庫直接下載
        const element = reportRef.current;
        const opt = {
          margin: [10, 10, 10, 10],
          filename: '數據驅動製造業研發創新計畫_研發轉型診斷報告書.pdf',
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { 
            scale: 2,
            useCORS: true,
            letterRendering: true
          },
          jsPDF: { 
            unit: 'mm', 
            format: 'a4', 
            orientation: 'portrait',
            compress: true
          },
          pagebreak: { mode: ['css', 'legacy'] }
        };
        
        // 處理頁面顯示問題
        const sections = element.querySelectorAll('.print\\:page-break-after');
        sections.forEach(section => {
          // 確保每個section在PDF中正確分頁
          section.style.pageBreakAfter = 'always';
          // 移除任何可能導致空白頁的邊距
          section.style.marginBottom = '0';
        });
        
        await window['html2pdf']().from(element).set(opt).save();
      } else {
        // 如果客戶端不支援，使用列印對話框
        alert('您的瀏覽器不支援直接下載PDF，將開啟列印對話框，請選擇"另存為PDF"選項。');
        window.print();
      }
    } catch (error) {
      console.error('產生PDF時發生錯誤:', error);
      alert('產生PDF失敗，請嘗試使用列印功能另存為PDF。');
      // 嘗試使用列印作為備用方案
      window.print();
    } finally {
      // 移除載入提示
      document.body.removeChild(loadingDiv);
    }
  };

  // 當頁面載入完成後，設置列印相關樣式和按鈕
  useEffect(() => {
    // 設置列印樣式
    const cleanupPrintStyles = setupPrintStyles();
    
    // 嘗試載入html2pdf
    loadHtml2pdf().catch(() => console.log('無法載入html2pdf，將使用列印功能'));
    
    // 清除功能
    return () => {
      if (cleanupPrintStyles) cleanupPrintStyles();
    };
  }, []);

  // Chart components for Section 3
  const PriceBrandChart = () => (
    <svg width="800" height="380" viewBox="0 0 800 380">
      <text x="400" y="30" textAnchor="middle" fontSize="16" fontWeight="bold">品牌定位圖(滿意度 x 平均單價) (各品牌整中值銷售平均值)</text>
      
      {/* 背景與座標軸 */}
      <rect x="50" y="60" width="700" height="240" fill="#f8fafb" stroke="#e5e7eb" strokeWidth="1" />
      <line x1="50" y1="300" x2="750" y2="300" stroke="#333" strokeWidth="2" />
      <line x1="50" y1="60" x2="50" y2="300" stroke="#333" strokeWidth="2" />
      
      {/* Y軸刻度與標籤 - 滿意度 */}
      <line x1="45" y1="60" x2="50" y2="60" stroke="#333" strokeWidth="2" />
      <text x="40" y="65" textAnchor="end" fontSize="12">100%</text>
      
      <line x1="45" y1="120" x2="50" y2="120" stroke="#333" strokeWidth="2" />
      <text x="40" y="125" textAnchor="end" fontSize="12">80%</text>
      
      <line x1="45" y1="180" x2="50" y2="180" stroke="#333" strokeWidth="2" />
      <text x="40" y="185" textAnchor="end" fontSize="12">50%</text>
      
      <line x1="45" y1="240" x2="50" y2="240" stroke="#333" strokeWidth="2" />
      <text x="40" y="245" textAnchor="end" fontSize="12">20%</text>
      
      <line x1="45" y1="300" x2="50" y2="300" stroke="#333" strokeWidth="2" />
      <text x="40" y="305" textAnchor="end" fontSize="12">0%</text>
      
      {/* X軸刻度與標籤 - 平均單價 */}
      <line x1="50" y1="305" x2="50" y2="300" stroke="#333" strokeWidth="2" />
      <text x="50" y="320" textAnchor="middle" fontSize="12">10</text>
      
      <line x1="190" y1="305" x2="190" y2="300" stroke="#333" strokeWidth="2" />
      <text x="190" y="320" textAnchor="middle" fontSize="12">15</text>
      
      <line x1="330" y1="305" x2="330" y2="300" stroke="#333" strokeWidth="2" />
      <text x="330" y="320" textAnchor="middle" fontSize="12">20</text>
      
      <line x1="470" y1="305" x2="470" y2="300" stroke="#333" strokeWidth="2" />
      <text x="470" y="320" textAnchor="middle" fontSize="12">25</text>
      
      <line x1="610" y1="305" x2="610" y2="300" stroke="#333" strokeWidth="2" />
      <text x="610" y="320" textAnchor="middle" fontSize="12">30</text>
      
      <line x1="750" y1="305" x2="750" y2="300" stroke="#333" strokeWidth="2" />
      <text x="750" y="320" textAnchor="middle" fontSize="12">35</text>
      
      <text x="400" y="350" textAnchor="middle" fontSize="14">平均單價 (美元)</text>
      
      {/* 左側標籤 */}
      <text x="20" y="180" textAnchor="middle" fontSize="14" transform="rotate(-90, 20, 180)">滿意度 (%)</text>
      
      {/* 韓國低價品牌群組 */}
      <circle cx="120" cy="75" r="40" fill="#38B2AC" fillOpacity="0.7" />
      <text x="120" y="70" textAnchor="middle" fontSize="12" fill="white">Samyang</text>
      <text x="120" y="85" textAnchor="middle" fontSize="10" fill="white">韓國品牌</text>
      
      <circle cx="150" cy="85" r="35" fill="#38B2AC" fillOpacity="0.7" />
      <text x="150" y="85" textAnchor="middle" fontSize="11" fill="white">NongShim</text>
      
      <circle cx="170" cy="95" r="30" fill="#38B2AC" fillOpacity="0.7" />
      <text x="170" y="95" textAnchor="middle" fontSize="10" fill="white">Ottogi</text>
      
      {/* 中價位專業品牌群組 */}
      <circle cx="260" cy="120" r="25" fill="#3182CE" fillOpacity="0.7" />
      <text x="260" y="120" textAnchor="middle" fontSize="10" fill="white">MAMA</text>
      
      <circle cx="290" cy="110" r="20" fill="#3182CE" fillOpacity="0.7" />
      <text x="290" y="110" textAnchor="middle" fontSize="9" fill="white">K-Munchies</text>
      
      <circle cx="320" cy="80" r="25" fill="#3182CE" fillOpacity="0.7" />
      <text x="320" y="80" textAnchor="middle" fontSize="10" fill="white">Nissin</text>
      
      <circle cx="330" cy="100" r="15" fill="#3182CE" fillOpacity="0.7" />
      <text x="330" y="100" textAnchor="middle" fontSize="8" fill="white">祥榮</text>
      
      <circle cx="350" cy="90" r="20" fill="#3182CE" fillOpacity="0.7" />
      <text x="350" y="90" textAnchor="middle" fontSize="9" fill="white">味丹</text>
      
      {/* 高價位品牌群組 */}
      <circle cx="480" cy="70" r="25" fill="#DD6B20" fillOpacity="0.7" />
      <text x="480" y="70" textAnchor="middle" fontSize="10" fill="white">統一</text>
      
      <circle cx="520" cy="90" r="20" fill="#DD6B20" fillOpacity="0.7" />
      <text x="520" y="90" textAnchor="middle" fontSize="9" fill="white">康師傅</text>
      
      <circle cx="550" cy="80" r="15" fill="#DD6B20" fillOpacity="0.7" />
      <text x="550" y="80" textAnchor="middle" fontSize="8" fill="white">今麥郎</text>
      
      <circle cx="590" cy="75" r="25" fill="#DD6B20" fillOpacity="0.7" />
      <text x="590" y="75" textAnchor="middle" fontSize="10" fill="white">頂新</text>
      
      <circle cx="630" cy="65" r="30" fill="#DD6B20" fillOpacity="0.7" />
      <text x="630" y="65" textAnchor="middle" fontSize="10" fill="white">農心</text>
      
      {/* 圖例 */}
      <rect x="570" y="140" width="160" height="100" fill="white" stroke="#ddd" strokeWidth="1" />
      <text x="650" y="160" textAnchor="middle" fontSize="12" fontWeight="bold">廠商分布</text>
      
      <circle cx="590" y="180" r="10" fill="#38B2AC" fillOpacity="0.7" />
      <text x="660" y="183" textAnchor="start" fontSize="11">韓國品牌</text>
      
      <circle cx="590" y="205" r="10" fill="#3182CE" fillOpacity="0.7" />
      <text x="660" y="208" textAnchor="start" fontSize="11">中價位品牌</text>
      
      <circle cx="590" y="230" r="10" fill="#DD6B20" fillOpacity="0.7" />
      <text x="660" y="233" textAnchor="start" fontSize="11">高價位品牌</text>
    </svg>
  );

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
      
      <rect x="640" y="250" width="40" height="20" fill="#38B2AC" />
      <rect x="640" y="250" width="40" height="4" fill="#E53E3E" />
      <text x="660" y="254" textAnchor="middle" fontSize="9" fill="white">20</text>
      <text x="660" y="265" textAnchor="middle" fontSize="9" fill="white">100</text>
      <text x="660" y="285" textAnchor="middle" fontSize="11">包裝 (Package)</text>
      
      <rect x="690" y="252" width="40" height="18" fill="#38B2AC" />
      <rect x="690" y="252" width="40" height="7" fill="#E53E3E" />
      <text x="710" y="257" textAnchor="middle" fontSize="9" fill="white">30</text>
      <text x="710" y="265" textAnchor="middle" fontSize="9" fill="white">70</text>
      <text x="710" y="285" textAnchor="middle" fontSize="11">顏色 (Color)</text>
    </svg>
  );

  const SpecificationHeatChart = () => (
    <svg width="800" height="300" viewBox="0 0 800 300">
      <text x="400" y="30" textAnchor="middle" fontSize="16" fontWeight="bold">精密零件規格銷售熱度</text>
      
      {/* 主要熱圖 */}
      <rect x="50" y="50" width="350" height="200" fill="#62236D" />
      <text x="225" y="70" textAnchor="middle" fontSize="14" fill="white">不銹鋼材質</text>
      <text x="225" y="150" textAnchor="middle" fontSize="16" fill="white">185,755 件</text>
      
      {/* 右側上半部 */}
      <rect x="400" y="50" width="175" height="100" fill="#184F8C" />
      <text x="488" y="70" textAnchor="middle" fontSize="14" fill="white">高精度加工</text>
      <text x="488" y="100" textAnchor="middle" fontSize="14" fill="white">75,906 件</text>
      
      {/* 右側下半部 */}
      <rect x="400" y="150" width="175" height="100" fill="#184F8C" />
      <text x="488" y="170" textAnchor="middle" fontSize="14" fill="white">陽極處理</text>
      <text x="488" y="200" textAnchor="middle" fontSize="14" fill="white">73,853 件</text>
      
      {/* 最右側 */}
      <rect x="575" y="50" width="175" height="100" fill="#184F8C" />
      <text x="662" y="70" textAnchor="middle" fontSize="14" fill="white">鋁合金材質</text>
      <text x="662" y="100" textAnchor="middle" fontSize="14" fill="white">70,747 件</text>
      
      <rect x="575" y="150" width="175" height="100" fill="#F7944D" />
      <text x="662" y="170" textAnchor="middle" fontSize="14" fill="white">中型零件</text>
      <text x="662" y="200" textAnchor="middle" fontSize="14" fill="white">70,747 件</text>
      
      {/* 熱度圖圖例 */}
      <rect x="50" y="260" width="700" height="30" fill="#f8fafc" />
      <rect x="100" y="265" width="40" height="20" fill="#62236D" />
      <text x="150" y="280" textAnchor="start" fontSize="12">最高需求</text>
      <rect x="250" y="265" width="40" height="20" fill="#184F8C" />
      <text x="300" y="280" textAnchor="start" fontSize="12">中等需求</text>
      <rect x="400" y="265" width="40" height="20" fill="#F7944D" />
      <text x="450" y="280" textAnchor="start" fontSize="12">一般需求</text>
    </svg>
  );

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
    // 價格區間分析圖表
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

  // 品牌定位分析圖表
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

  // 大規格熱度分析圖表 - 使用熱圖格式，與小規格分析相同風格
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
  
  // 小規格熱度分析圖表 - 使用熱圖格式，專注於過敏原細分
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

  return (
    <div className="min-h-screen bg-white font-sans p-10 text-black print:p-0 max-w-none" ref={reportRef}>
      {/* Header/Cover Page */}
      <div className="mb-12 text-center print:page-break-after">
        <div className="flex justify-center mb-8">
          <div className="w-20 h-20 bg-blue-800 rounded-full flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
        </div>
        <h1 className="text-4xl font-bold text-blue-900 mb-4">{reportInfo.title}</h1>
        <h2 className="text-3xl font-bold mb-8">{reportInfo.subtitle}</h2>
        <div className="mt-16 text-xl">
          <div className="mb-2">企業名稱：{companyInfo.name}</div>
          <div className="mb-2">案件編號：{reportInfo.caseNumber}</div>
          <div className="mb-2">診斷日期：{reportInfo.date}</div>
          <div className="mb-2">執行單位：{reportInfo.executiveUnit}</div>
        </div>
      </div>

      {/* 目錄 */}
      <div className="mb-12 print:page-break-after">
        <h2 className="text-2xl font-bold text-blue-900 mb-6">目錄</h2>
        <ul className="space-y-4 text-lg">
          <li className="flex items-center">
            <span className="font-medium mr-4">一、</span>
            <span>廠商基本資料</span>
            <span className="flex-grow border-b border-dashed border-gray-300 mx-4"></span>
            <span>1</span>
          </li>
          <li className="flex items-center">
            <span className="font-medium mr-4">二、</span>
            <span>研發能力診斷分析</span>
            <span className="flex-grow border-b border-dashed border-gray-300 mx-4"></span>
            <span>2</span>
          </li>
          <li className="flex items-center">
            <span className="font-medium mr-4">三、</span>
            <span>研發量表評估分析</span>
            <span className="flex-grow border-b border-dashed border-gray-300 mx-4"></span>
            <span>5</span>
          </li>
          <li className="flex items-center">
            <span className="font-medium mr-4">四、</span>
            <span>產業分析及研發規格建議</span>
            <span className="flex-grow border-b border-dashed border-gray-300 mx-4"></span>
            <span>7</span>
          </li>
          <li className="flex items-center">
            <span className="font-medium mr-4">五、</span>
            <span>數位轉型建議</span>
            <span className="flex-grow border-b border-dashed border-gray-300 mx-4"></span>
            <span>10</span>
          </li>
          <li className="flex items-center">
            <span className="font-medium mr-4">附錄</span>
            <span>訪視紀錄表</span>
            <span className="flex-grow border-b border-dashed border-gray-300 mx-4"></span>
            <span>13</span>
          </li>
        </ul>
      </div>

      {/* 一、廠商基本資料 */}
      <div className="mb-12 print:page-break-after">
        <header className="mb-8">
          <h2 className="text-3xl font-bold text-blue-900">一、廠商基本資料</h2>
          <div className="mt-2 h-1 w-24 bg-orange-400 rounded-full"></div>
        </header>
        
        <div className="bg-white p-6 rounded-xl border-2 border-blue-200 mb-8">
          {/* 製造業類別標籤 - 置頂顯示 */}
          <div className="mb-6">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-orange-100 to-orange-50 border border-orange-200">
              <div className="w-3 h-3 rounded-full bg-orange-500 mr-2"></div>
              <span className="text-orange-800 font-semibold">食品製造業</span>
            </div>
            <div className="mt-2 text-orange-700 text-sm">
              其他食品製造（如烘焙炊蒸食品、麵條、粉條類食品）
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
                    <div className="text-blue-800 font-medium">{companyInfo.name}</div>
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
                    <div className="text-blue-800 font-medium">{companyInfo.uniformNumber}</div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="text-gray-600 mb-1">聯絡人</div>
                    <div className="text-blue-800 font-medium">{companyInfo.contactPerson}</div>
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
                    <div className="text-blue-800 font-medium">台灣北部：基隆、新北、台北、宜蘭、桃園、新竹</div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="text-gray-600 mb-1">實收資本額</div>
                    <div className="text-blue-800 font-medium">50,000 千元</div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="text-gray-600 mb-1">員工人數</div>
                    <div className="text-blue-800 font-medium">51~100人</div>
                  </div>
                </div>
                
                <div>
                  <div className="mb-4">
                    <div className="text-gray-600 mb-1">公司所屬產業的經營型態</div>
                    <div className="text-blue-800 font-medium">資本密集（投入機械設備為主）</div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="text-gray-600 mb-1">前年度營業額</div>
                    <div className="text-blue-800 font-medium">120,000 千元</div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="text-gray-600 mb-1">主要產品</div>
                    <div className="text-blue-800 font-medium">水煮麵、速食湯品、調味料、休閒食品</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl border-2 border-blue-200">
          <h3 className="text-xl font-bold text-blue-800 mb-6">公司簡介</h3>
          <p className="text-gray-700 leading-relaxed">
            {companyInfo.introduction[0]}
          </p>
          <p className="text-gray-700 leading-relaxed mt-4">
            {companyInfo.introduction[1]}
          </p>
        </div>
      </div>

      {/* 二、研發能力診斷分析 */}
      <div className="mb-12 print:page-break-after">
        <header className="mb-8">
          <h2 className="text-3xl font-bold text-blue-900">二、研發能力診斷分析</h2>
          <div className="mt-2 h-1 w-24 bg-orange-400 rounded-full"></div>
        </header>
        
        <div className="bg-white p-6 rounded-xl border-2 border-blue-200 mb-8">
          <h3 className="text-xl font-bold text-blue-800 mb-6">研發數位化推動優先目標</h3>
          
          <div className="flex items-center justify-center mb-8">
            {/* <div className="text-center">
              <div className="text-5xl font-bold text-blue-800">62%</div>
              <div className="text-gray-500 mt-1">優先推動指數</div>
            </div>
            <div className="mx-6 h-16 w-px bg-gray-200"></div> */}
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-800">{companyInfo.name || '祥榮食品'}</div>
              <div className="text-gray-500 mt-1">研發轉型目標評估</div>
            </div>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg mb-6">
            <div className="text-blue-800 font-medium mb-2">評估項目（1分為「最不需要推動」，5分為「最需要推動」）</div>
          </div>
          
          <div className="space-y-6">
            {/* 改變企業研發速度及研發流程 */}
            <div>
              <div className="flex justify-between items-center bg-gradient-to-r from-blue-100 to-blue-50 p-3 rounded-t-lg border-b-2 border-blue-200">
                <div className="font-medium text-blue-900">一、改變企業研發速度及研發流程</div>
                <div className="font-medium text-blue-800">7/15</div>
              </div>
              
              <div className="space-y-4 p-4 bg-white border border-blue-100 rounded-b-lg">
                <div className="flex items-start">
                  <div className="bg-blue-200 text-blue-800 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-0.5 mr-3 font-medium text-sm">A1</div>
                  <div>
                    <div className="text-gray-800">建立敏捷研發管理系統，提升組織研發效率與進度追蹤</div>
                    <div className="flex items-center mt-1">
                      <div className="flex space-x-1 mr-2">
                        {[1, 2, 3].map(i => (
                          <div key={i} className="h-2 w-5 bg-blue-600 rounded-sm"></div>
                        ))}
                        {[1, 2].map(i => (
                          <div key={i} className="h-2 w-5 bg-blue-200 rounded-sm"></div>
                        ))}
                      </div>
                      <span className="text-sm text-blue-700">3分 - 優先推動基礎敏捷研發管理系統，實現專案可視化和進度追蹤</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-blue-200 text-blue-800 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-0.5 mr-3 font-medium text-sm">A2</div>
                  <div>
                    <div className="text-gray-800">導入PLM系統，優化研發流程與知識管理</div>
                    <div className="flex items-center mt-1">
                      <div className="flex space-x-1 mr-2">
                        {[1, 2].map(i => (
                          <div key={i} className="h-2 w-5 bg-blue-600 rounded-sm"></div>
                        ))}
                        {[1, 2, 3].map(i => (
                          <div key={i} className="h-2 w-5 bg-blue-200 rounded-sm"></div>
                        ))}
                      </div>
                      <span className="text-sm text-blue-700">2分 - 計劃開始評估PLM系統導入可行性與投資效益</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-blue-200 text-blue-800 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-0.5 mr-3 font-medium text-sm">A3</div>
                  <div>
                    <div className="text-gray-800">建立跨部門協作機制，提升研發效率與資源配置</div>
                    <div className="flex items-center mt-1">
                      <div className="flex space-x-1 mr-2">
                        {[1, 2].map(i => (
                          <div key={i} className="h-2 w-5 bg-blue-600 rounded-sm"></div>
                        ))}
                        {[1, 2, 3].map(i => (
                          <div key={i} className="h-2 w-5 bg-blue-200 rounded-sm"></div>
                        ))}
                      </div>
                      <span className="text-sm text-blue-700">2分 - 計劃推動臨時跨部門協作模式，加強關鍵專案之協作與溝通</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* 使用資料驅動研發決策 */}
            <div>
              <div className="flex justify-between items-center bg-gradient-to-r from-indigo-100 to-indigo-50 p-3 rounded-t-lg border-b-2 border-indigo-200">
                <div className="font-medium text-indigo-900">二、使用資料驅動研發決策</div>
                <div className="font-medium text-indigo-800">9/15</div>
              </div>
              
              <div className="space-y-4 p-4 bg-white border border-indigo-100 rounded-b-lg">
                <div className="flex items-start">
                  <div className="bg-indigo-200 text-indigo-800 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-0.5 mr-3 font-medium text-sm">B1</div>
                  <div>
                    <div className="text-gray-800">建立數據分析平台，整合市場趨勢與研發方向</div>
                    <div className="flex items-center mt-1">
                      <div className="flex space-x-1 mr-2">
                        {[1, 2, 3].map(i => (
                          <div key={i} className="h-2 w-5 bg-indigo-500 rounded-sm"></div>
                        ))}
                        {[1, 2].map(i => (
                          <div key={i} className="h-2 w-5 bg-indigo-200 rounded-sm"></div>
                        ))}
                      </div>
                      <span className="text-sm text-indigo-700">3分 - 優先建立基礎數據分析平台，進行簡單的市場分析與產品趨勢追蹤</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-indigo-200 text-indigo-800 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-0.5 mr-3 font-medium text-sm">B2</div>
                  <div>
                    <div className="text-gray-800">運用AI技術進行數據挖掘，提升研發決策準確性</div>
                    <div className="flex items-center mt-1">
                      <div className="flex space-x-1 mr-2">
                        {[1, 2, 3, 4].map(i => (
                          <div key={i} className="h-2 w-5 bg-indigo-500 rounded-sm"></div>
                        ))}
                        <div className="h-2 w-5 bg-indigo-200 rounded-sm"></div>
                      </div>
                      <span className="text-sm text-indigo-700">4分 - 高度優先應用AI技術於多個場景中，提升市場趨勢及需求分析準確度</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-indigo-200 text-indigo-800 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-0.5 mr-3 font-medium text-sm">B3</div>
                  <div>
                    <div className="text-gray-800">建立客戶需求分析系統，優化產品開發方向</div>
                    <div className="flex items-center mt-1">
                      <div className="flex space-x-1 mr-2">
                        {[1, 2].map(i => (
                          <div key={i} className="h-2 w-5 bg-indigo-500 rounded-sm"></div>
                        ))}
                        {[1, 2, 3].map(i => (
                          <div key={i} className="h-2 w-5 bg-indigo-200 rounded-sm"></div>
                        ))}
                      </div>
                      <span className="text-sm text-indigo-700">2分 - 計劃初步收集客戶反饋，建立基礎客戶需求資料庫</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* 體驗設計思維進行研發 */}
            <div>
              <div className="flex justify-between items-center bg-gradient-to-r from-teal-100 to-teal-50 p-3 rounded-t-lg border-b-2 border-teal-200">
                <div className="font-medium text-teal-900">三、體驗設計思維進行研發</div>
                <div className="font-medium text-teal-800">12/15</div>
              </div>
              
              <div className="space-y-4 p-4 bg-white border border-teal-100 rounded-b-lg">
                <div className="flex items-start">
                  <div className="bg-teal-200 text-teal-800 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-0.5 mr-3 font-medium text-sm">C1</div>
                  <div>
                    <div className="text-gray-800">導入使用者體驗設計方法，提升產品可用性</div>
                    <div className="flex items-center mt-1">
                      <div className="flex space-x-1 mr-2">
                        {[1, 2, 3, 4].map(i => (
                          <div key={i} className="h-2 w-5 bg-teal-500 rounded-sm"></div>
                        ))}
                        <div className="h-2 w-5 bg-teal-200 rounded-sm"></div>
                      </div>
                      <span className="text-sm text-teal-700">4分 - 高度優先推動完整使用者體驗設計流程，提升產品整體易用性</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-teal-200 text-teal-800 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-0.5 mr-3 font-medium text-sm">C2</div>
                  <div>
                    <div className="text-gray-800">建立產品原型快速驗證機制，優化設計流程</div>
                    <div className="flex items-center mt-1">
                      <div className="flex space-x-1 mr-2">
                        {[1, 2, 3, 4].map(i => (
                          <div key={i} className="h-2 w-5 bg-teal-500 rounded-sm"></div>
                        ))}
                        <div className="h-2 w-5 bg-teal-200 rounded-sm"></div>
                      </div>
                      <span className="text-sm text-teal-700">4分 - 高度優先推動完整的原型驗證機制，提升開發前的設計優化效率</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-teal-200 text-teal-800 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-0.5 mr-3 font-medium text-sm">C3</div>
                  <div>
                    <div className="text-gray-800">實施定期使用者回饋收集，持續改善產品設計</div>
                    <div className="flex items-center mt-1">
                      <div className="flex space-x-1 mr-2">
                        {[1, 2, 3, 4].map(i => (
                          <div key={i} className="h-2 w-5 bg-teal-500 rounded-sm"></div>
                        ))}
                        <div className="h-2 w-5 bg-teal-200 rounded-sm"></div>
                      </div>
                      <span className="text-sm text-teal-700">4分 - 高度優先推動全面使用者回饋收集與分析機制，確保反饋被系統化應用</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* 採用新科技進行研發 */}
            <div>
              <div className="flex justify-between items-center bg-gradient-to-r from-orange-100 to-orange-50 p-3 rounded-t-lg border-b-2 border-orange-200">
                <div className="font-medium text-orange-900">四、採用新科技進行研發</div>
                <div className="font-medium text-orange-800">9/15</div>
              </div>
              
              <div className="space-y-4 p-4 bg-white border border-orange-100 rounded-b-lg">
                <div className="flex items-start">
                  <div className="bg-orange-200 text-orange-800 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-0.5 mr-3 font-medium text-sm">D1</div>
                  <div>
                    <div className="text-gray-800">導入AI與機器學習技術，提升研發效率</div>
                    <div className="flex items-center mt-1">
                      <div className="flex space-x-1 mr-2">
                        {[1, 2, 3].map(i => (
                          <div key={i} className="h-2 w-5 bg-orange-500 rounded-sm"></div>
                        ))}
                        {[1, 2].map(i => (
                          <div key={i} className="h-2 w-5 bg-orange-200 rounded-sm"></div>
                        ))}
                      </div>
                      <span className="text-sm text-orange-700">3分 - 優先在特定研發項目中試點AI與機器學習技術，驗證應用效益</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-orange-200 text-orange-800 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-0.5 mr-3 font-medium text-sm">D2</div>
                  <div>
                    <div className="text-gray-800">應用物聯網技術進行產品創新與測試</div>
                    <div className="flex items-center mt-1">
                      <div className="flex space-x-1 mr-2">
                        {[1, 2, 3, 4].map(i => (
                          <div key={i} className="h-2 w-5 bg-orange-500 rounded-sm"></div>
                        ))}
                        <div className="h-2 w-5 bg-orange-200 rounded-sm"></div>
                      </div>
                      <span className="text-sm text-orange-700">4分 - 高度優先推動廣泛應用物聯網技術，實現數據驅動產品優化</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-orange-200 text-orange-800 rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-0.5 mr-3 font-medium text-sm">D3</div>
                  <div>
                    <div className="text-gray-800">運用數位孿生技術優化產品開發流程</div>
                    <div className="flex items-center mt-1">
                      <div className="flex space-x-1 mr-2">
                        {[1, 2].map(i => (
                          <div key={i} className="h-2 w-5 bg-orange-500 rounded-sm"></div>
                        ))}
                        {[1, 2, 3].map(i => (
                          <div key={i} className="h-2 w-5 bg-orange-200 rounded-sm"></div>
                        ))}
                      </div>
                      <span className="text-sm text-orange-700">2分 - 計劃開始評估數位孿生技術應用可能性，進行概念性探討</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl border-2 border-blue-200">
          <h3 className="text-xl font-bold text-blue-800 mb-6">能力分佈評估</h3>
          
          {/* Removed the entire circle visualization */}
          
          {/* 能力條形圖 */}
          <div className="space-y-6 mb-6">
            <div className="mb-4">
              <div className="flex justify-between mb-1">
                <div className="font-semibold text-blue-900">改變企業研發速度及研發流程</div>
                <div className="text-blue-700">7/15</div>
              </div>
              <div className="relative w-full h-8 bg-blue-50 rounded-lg overflow-hidden">
                <div
                  className="h-full rounded-lg"
                  style={{
                    width: `${(7/15)*100}%`,
                    background: `linear-gradient(90deg, #1E40AF 0%, #60A5FA 100%)`,
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-between px-4">
                  <span className="text-white font-medium drop-shadow-md">
                    47%
                  </span>
                </div>
              </div>
            </div>
            
            <div className="mb-4">
              <div className="flex justify-between mb-1">
                <div className="font-semibold text-indigo-900">使用資料驅動研發決策</div>
                <div className="text-indigo-700">9/15</div>
              </div>
              <div className="relative w-full h-8 bg-indigo-50 rounded-lg overflow-hidden">
                <div
                  className="h-full rounded-lg"
                  style={{
                    width: `${(9/15)*100}%`,
                    background: `linear-gradient(90deg, #4F46E5 0%, #A5B4FC 100%)`,
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-between px-4">
                  <span className="text-white font-medium drop-shadow-md">
                    60%
                  </span>
                </div>
              </div>
            </div>
            
            <div className="mb-4">
              <div className="flex justify-between mb-1">
                <div className="font-semibold text-teal-900">體驗設計思維進行研發</div>
                <div className="text-teal-700">12/15</div>
              </div>
              <div className="relative w-full h-8 bg-teal-50 rounded-lg overflow-hidden">
                <div
                  className="h-full rounded-lg"
                  style={{
                    width: `${(12/15)*100}%`,
                    background: `linear-gradient(90deg, #0D9488 0%, #5EEAD4 100%)`,
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-between px-4">
                  <span className="text-white font-medium drop-shadow-md">
                    80%
                  </span>
                </div>
              </div>
            </div>
            
            <div className="mb-4">
              <div className="flex justify-between mb-1">
                <div className="font-semibold text-orange-900">採用新科技進行研發</div>
                <div className="text-orange-700">9/15</div>
              </div>
              <div className="relative w-full h-8 bg-orange-50 rounded-lg overflow-hidden">
                <div
                  className="h-full rounded-lg"
                  style={{
                    width: `${(9/15)*100}%`,
                    background: `linear-gradient(90deg, #EA580C 0%, #FDBA74 100%)`,
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-between px-4">
                  <span className="text-white font-medium drop-shadow-md">
                    60%
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          {/* 能力評估摘要 */}
          <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
            <div className="text-lg font-semibold text-blue-800 mb-2">研發轉型推動重點分析</div>
            <div className="text-gray-700">
              <div className="mb-1"><span className="font-medium">優先發展：</span>體驗設計思維進行研發已具基礎 (80%)，建議作為轉型發展的基石，帶動其他領域成長。</div>
              <div><span className="font-medium">急需突破：</span>改變企業研發速度及研發流程推動程度較低 (47%)，應作為數位轉型的關鍵突破口。</div>
            </div>
          </div>
        </div>
      </div>

      {/* 三、研發量表評估分析 */}
      <div className="mb-12 print:page-break-after">
        <header className="mb-8">
          <h2 className="text-3xl font-bold text-blue-900">三、研發量表評估分析</h2>
          <div className="mt-2 h-1 w-24 bg-orange-400 rounded-full"></div>
        </header>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-xl border-2 border-blue-200">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-3">
                <Layers className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-bold text-blue-800">研發流程評估分析</h3>
            </div>
            
            <div className="flex items-center mb-4">
              <div className="text-2xl font-bold text-blue-800">7</div>
              <div className="text-gray-500 ml-1">/15分</div>
            </div>
            
            <p className="text-gray-700 leading-relaxed mb-4">
              在食品產品研發流程方面，公司整體得分為7/15分。產品配方開發流程（3分）展現出基礎的標準化能力，但在食品安全管理系統（2分）和跨部門協作機制（2分）方面仍有較大的提升空間，這表明企業在系統性的食品研發流程管理上亟需加強。
            </p>
            
            <p className="text-gray-700 leading-relaxed">
              建議優先建立完整的食品研發管理框架，如導入HACCP食品安全管理體系，實現產品研發過程的標準化管理與持續改進。同時，可評估導入食品生命週期管理系統，優化產品從配方開發到量產的全程管理，並建立固定的跨部門協作機制，如定期的配方與口味評審會議，提升研發、生產、品控、市場等部門間的協同效率。
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-xl border-2 border-blue-200">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-3">
                <Database className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-bold text-blue-800">數據驅動決策評估</h3>
            </div>
            
            <div className="flex items-center mb-4">
              <div className="text-2xl font-bold text-blue-800">9</div>
              <div className="text-gray-500 ml-1">/15分</div>
            </div>
            
            <p className="text-gray-700 leading-relaxed mb-4">
              在使用數據驅動食品研發決策方面，公司得分為9/15分。口味趨勢分析技術（4分）顯示企業對市場趨勢有較高的敏感度，而配方數據管理平台（3分）已有基礎，但消費者口味偏好分析系統（2分）仍處於起步階段，顯示在消費者洞察轉化為產品開發決策方面存在挑戰。
            </p>
            
            <p className="text-gray-700 leading-relaxed">
              建議優先擴展數據分析技術在食品口味趨勢分析和產品口感預測方面的應用，強化決策支持能力。同時，升級現有配方數據管理平台，整合內外部數據源，建立更全面的食品市場與口味趨勢監測系統。另外，應建立系統化的消費者口味測試機制，如定期的盲測和產品口味調查，構建完整的消費者口味偏好數據庫。
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-xl border-2 border-blue-200">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-3">
                <Search className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-bold text-blue-800">設計思維方法評估</h3>
            </div>
            
            <div className="flex items-center mb-4">
              <div className="text-2xl font-bold text-blue-800">12</div>
              <div className="text-gray-500 ml-1">/15分</div>
            </div>
            
            <p className="text-gray-700 leading-relaxed mb-4">
              在體驗設計思維進行食品研發方面，公司得分最高，達12/15分。消費者體驗設計（4分）、產品口味原型測試（4分）和消費者回饋收集（4分）均表現良好，顯示企業已建立起較為完善的消費者中心設計流程，這是企業的一大優勢。
            </p>
            
            <p className="text-gray-700 leading-relaxed">
              建議在現有基礎上，進一步精煉消費者體驗設計方法，如導入專業的食品感官評價體系和服務設計工具，捕捉更深層次的消費者需求。同時，加強口味原型測試的數據化管理，建立標準化的味覺測試流程與指標體系，並提升消費者反饋的智能分析能力，實現口味測試數據的自動化處理與優先級排序。
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-xl border-2 border-blue-200">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-3">
                <Cpu className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-bold text-blue-800">科技創新應用評估</h3>
            </div>
            
            <div className="flex items-center mb-4">
              <div className="text-2xl font-bold text-blue-800">9</div>
              <div className="text-gray-500 ml-1">/15分</div>
            </div>
            
            <p className="text-gray-700 leading-relaxed mb-4">
              在採用新科技進行食品研發方面，公司得分為9/15分。食品保鮮技術應用（4分）表現較好，風味增強技術（3分）處於發展中階段，而替代性蛋白質開發（2分）仍在初步探索，顯示企業在食品科技創新應用上有不同程度的發展。
            </p>
            
            <p className="text-gray-700 leading-relaxed">
              建議深化食品保鮮技術在產品保質期延長與口感保持方面的應用，建立完整的保鮮技術評估體系。同時，在特定研發項目中加大風味增強技術的試點應用，如自然提味劑和複合調味料開發。另外，可組建專門的植物蛋白替代品研發小組，評估在現有產品線中導入健康、環保替代性蛋白的可能性。
            </p>
          </div>
        </div>
      </div>

      {/* 產業分析及研發規格建議 */}
      <div className="mb-12 print:page-break-after">
        <header className="mb-8">
          <h2 className="text-3xl font-bold text-blue-900">四、產業分析及研發規格建議</h2>
          <div className="mt-2 h-1 w-24 bg-orange-400 rounded-full"></div>
        </header>
        
        <div className="bg-white p-6 rounded-xl border-2 border-blue-200 mb-8">
          <h3 className="text-xl font-bold text-blue-800 mb-6">A. [水煮麵] 價格 & 品牌定位分析</h3>
          
          <div className="grid grid-cols-1 gap-6 mb-6">
            <div>
              <h4 className="text-lg font-semibold text-blue-700 mb-2">價格區間分析</h4>
              <PriceRangeChart />
            </div>
            <div>
              <h4 className="text-lg font-semibold text-blue-700 mb-2">品牌定位分析</h4>
              <BrandPositionChart />
            </div>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="text-lg font-semibold text-blue-800 mb-2">以下總結:</h4>
            <ol className="list-decimal pl-5 space-y-2 text-gray-700">
              <li><span className="font-medium">低價韓國Samyang市占率最高：</span> Samyang品牌位於圖表左上方，顯示其擁有較低的平均單價（約15美元）但有最高的滿意度（接近100%）。這表明Samyang成功地以低價策略贏得了大量市場份額，同時保持了高客戶滿意度。</li>
              
              <li><span className="font-medium">中價位小品牌多，銷售量不錯，為新產品切入點：</span> 在圖表中部（約20-30美元價格區間）聚集了多個品牌，如MAMA、K-Munchies、Nissin等。這個價格區間的品牌數量多，表明競爭激烈，但也意味著這可能是一個適合新產品切入的價格點，因為消費者在這個區間有多樣化的選擇。</li>
              
              <li><span className="font-medium">高價日本Nongshim市占率最高：</span> Nongshim位於圖表右上方，顯示其擁有較高的平均單價（約35美元）和較高的滿意度。這表明Nongshim成功地佔據了高端市場，可能通過優質產品或品牌形象來維持其高價位策略。</li>
              
              <li><span className="font-medium">價格區間分析：</span> 12-14.99美元區間的銷售額最高，達到約1900萬美元，平均單價為25919美元。這與Samyang的定位相符，進一步證實了低價策略在市場中的成功。30美元以上的高價區間也有可觀的銷售額，約675萬美元，平均單價為6249美元。這與Nongshim的高端定位相符，說明高價市場雖然銷量可能較低，但仍有顯著的市場價值。</li>
            </ol>
            
            <p className="mt-4 text-gray-700"><span className="font-medium">總結：</span> 市場呈現明顯的價格分層，低價和高價市場都有領先品牌佔據主導地位，而中價位市場則較為分散，可能存在機會。新進入者或現有品牌可以根據自身優勢，選擇在低價競爭、中價突破或高價精品等不同策略中定位自己的產品。</p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl border-2 border-blue-200 mb-8">
          <h3 className="text-xl font-bold text-blue-800 mb-6">B. [水煮麵] 月銷售分析</h3>
          
          <div className="mb-6">
            <MonthlySalesChart />
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="text-lg font-semibold text-blue-800 mb-2">水煮麵市場銷售趨勢分析：</h4>
            <ol className="list-decimal pl-5 space-y-2 text-gray-700">
              <li><span className="font-medium">銷售模式：</span> 水煮麵銷售呈現明顯的季節性波動。每年11月至1月是銷售高峰期，可能與年末設備升級和預算消化有關。2月至4月通常是銷售低谷，這可能是因為農曆新年影響及客戶新年度預算尚未完全啟動。</li>
              
              <li><span className="font-medium">整體趨勢：</span> 從2022年中開始，水煮麵銷售額整體呈上升趨勢。這可能反映出製造業自動化升級需求增加，半導體設備市場的發展，或是產品創新吸引了更多客戶。</li>
              
              <li><span className="font-medium">價格策略：</span> 平均單價維持在17,000至20,000元之間，相對穩定。這表明水煮麵市場的定價策略較為一致，可能是為了在競爭激烈的精密製造市場中保持價格競爭力。</li>
              
              <li><span className="font-medium">訂單效果：</span> 銷售高峰期（如2023年11月至2024年1月）的顯著增長可能與半導體設備更新及年末訂單集中有關。這些訂單高峰似乎主要通過增加客戶採購量而非降價來驅動銷售。</li>
            </ol>
            
            <h4 className="text-lg font-semibold text-blue-800 mt-4 mb-2">針對水煮麵市場的建議：</h4>
            <ol className="list-decimal pl-5 space-y-2 text-gray-700">
              <li><span className="font-medium">季節性策略：</span> 根據淡旺季銷售差異，調整產能和接單策略。例如，在銷售旺季前確保足夠的生產能力，淡季時安排設備維護或研發工作。</li>
              
              <li><span className="font-medium">產品創新：</span> 考慮開發高附加值產品線，在技術參數上有明顯優勢的零件產品，以增加訂單量並提高客戶忠誠度。</li>
              
              <li><span className="font-medium">價格彈性：</span> 在保持整體價格穩定的同時，可以在淡季推出限時優惠或套裝服務，刺激訂單量。</li>
              
              <li><span className="font-medium">客戶管理：</span> 分析高峰期的客戶訂單模式，建立客戶關係管理系統，提前預測訂單需求，優化產能調配。</li>
              
              <li><span className="font-medium">渠道拓展：</span> 探索新的銷售渠道，如海外市場或新興產業應用，以分散市場風險並拓展營收來源。</li>
              
              <li><span className="font-medium">客戶洞察：</span> 進行市場調研，了解客戶對水煮麵的技術規格需求變化，及時調整產品研發方向。</li>
            </ol>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl border-2 border-blue-200 mb-8">
          <h3 className="text-xl font-bold text-blue-800 mb-6">C. [水煮麵] 客戶回饋分析</h3>
          
          <div className="mb-6">
            <CustomerFeedbackChart />
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="text-lg font-semibold text-blue-800 mb-2">水煮麵正負評論數的圖表分析：</h4>
            <ol className="list-decimal pl-5 space-y-2 text-gray-700">
              <li><span className="font-medium">消費者關注重點：</span> 口感（Taste）、風味（Flavor）和麵條（Noodles）是消費者討論最多的三個方面，遠超其他因素。這表明這些是水煮麵產品中最受關注的核心屬性。</li>
              
              <li><span className="font-medium">價格因素：</span> 價格（Price）是第四個被討論最多的因素，但相比前三項，討論度明顯降低。這可能意味著對於水煮麵產品，消費者更注重產品本身的品質而非價格。</li>
              
              <li><span className="font-medium">次要關注點：</span> 用戶體驗（User experience）、品牌（Brand）和包裝信息（Package information）等因素也受到一定程度的關注，但討論量相對較少。</li>
              
              <li><span className="font-medium">低關注度因素：</span> 調味醬（Sauce）、加熱（Heat）、包裝（Package）等因素討論度較低，可能不是消費者的主要考慮因素。</li>
            </ol>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl border-2 border-blue-200 mb-8">
          <h3 className="text-xl font-bold text-blue-800 mb-6">D. [水煮麵] 規格熱度分析</h3>
          
          <div className="grid grid-cols-1 gap-6 mb-6">
            <div>
              <h4 className="text-lg font-semibold text-blue-700 mb-2">大規格分析</h4>
              <LargeSpecificationHeatChart />
            </div>
            <div>
              <h4 className="text-lg font-semibold text-blue-700 mb-2">小規格分析</h4>
              <SmallSpecificationHeatChart />
            </div>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="text-lg font-semibold text-blue-800 mb-2">產品規格熱度分析：</h4>
            <ol className="list-decimal pl-5 space-y-2 text-gray-700">
              <li><span className="font-medium">過敏原信息最受關注：</span> 過敏原信息是最受關注的特徵，反映了消費者對食品安全和特殊飲食需求的高度重視。小麥和大豆是水煮麵中最常見的過敏原。</li>
              
              <li><span className="font-medium">口味是關鍵驅動因素：</span> 口味是第二被關注的因素，顯示消費者對產品風味的重視。辛辣和雞肉風味是當前最受歡迎的口味系列。</li>
              
              <li><span className="font-medium">麵條質量至關重要：</span> 麵條本身的質量和口感是第三重要因素，包含彈性、吸湯效果和保持度等特性，直接影響消費者的整體體驗。</li>
              
              <li><span className="font-medium">包裝和分量選擇：</span> 包裝方式和重量規格也是消費者關注的要點，反映了不同場景下（個人食用、家庭分享等）的多樣化需求。</li>
            </ol>
            <h4 className="text-lg font-semibold text-blue-800 mt-4 mb-2">過敏原細分分析：</h4>
            <ol className="list-decimal pl-5 space-y-2 text-gray-700">
              <li><span className="font-medium">小麥是主要關注點：</span> 在過敏原中，小麥（麩質）的關注度最高，這與水煮麵的主要成分直接相關，有顯著的市場需求對無麩質選項的興趣。</li>
              
              <li><span className="font-medium">大豆成分廣泛存在：</span> 大豆相關成分的關注度排第二，主要來自調味料和醬料中的成分，消費者對這類過敏原有明確的標示需求。</li>
              
              <li><span className="font-medium">牛奶和雞蛋相關成分：</span> 雖然出現頻率較低，但在一些風味較豐富的產品中常見，需要特別注意標示。</li>
            </ol>
            
            <h4 className="text-lg font-semibold text-blue-800 mt-4 mb-2">綜合分析與建議：</h4>
            <ol className="list-decimal pl-5 space-y-2 text-gray-700">
              <li><span className="font-medium">過敏原信息至關重要：</span> 鑒於過敏原是最受關注的特徵，建議在產品包裝上明確標示所有可能的過敏原，並考慮開發低過敏原或無特定過敏原的產品線。</li>
              
              <li><span className="font-medium">口味和麵條質量是關鍵：</span> 持續改進產品口味和麵條質量，這兩項是僅次於過敏原的重要因素。</li>
              
              <li><span className="font-medium">包裝和分量策略：</span> 包裝和重量同等重要，可以考慮推出不同分量的包裝以滿足不同消費需求。</li>
              
              <li><span className="font-medium">原料選擇與替代：</span> 考慮使用低過敏性原料，或為特定過敏人群開發替代產品（如無麩質麵條）。</li>
              
              <li><span className="font-medium">清晰標籤：</span> 確保所有產品包裝上清晰標示原料成分，特別是常見過敏原如小麥、大豆、牛奶和雞蛋。</li>
              
              <li><span className="font-medium">消費者教育：</span> 提供有關產品成分和可能過敏原的詳細信息，幫助消費者做出明智的購買決定。</li>
              
              <li><span className="font-medium">產品多樣化：</span> 基於不同的過敏原組合，可以開發針對性的產品線，以滿足不同消費者的需求。</li>
            </ol>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl border-2 border-blue-200">
          <h3 className="text-xl font-bold text-blue-800 mb-6">E. [水煮麵] 產品規格推薦</h3>
          
          <div className="mb-6">
            <ProductSpecTable />
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="text-lg font-semibold text-blue-800 mb-2">每個產品規格列出推薦分析：</h4>
            <ol className="list-decimal pl-5 space-y-4 text-gray-700">
              <li>
                <span className="font-medium">過敏原 (allergen)：</span>
                <ul className="list-disc pl-5 mt-1 space-y-1">
                  <li><span className="font-medium">大豆 (soybean)：</span> 作為首要過敏原，反映了其在配方中的普遍使用。建議開發無大豆版本，以滿足對大豆過敏的消費者需求。</li>
                  <li><span className="font-medium">木薯 (tapioca)：</span> 可能用作增稠劑或麵條原料。考慮將其作為小麥的替代品，開發無麩質產品線。</li>
                  <li><span className="font-medium">小麥麩質 (wheatgluten)：</span> 為主要麵條原料。建議開發使用替代穀物（如米粉、蕎麥）的產品，擴大無麩質選擇。</li>
                </ul>
              </li>
              
              <li>
                <span className="font-medium">口味 (flavor)：</span>
                <ul className="list-disc pl-5 mt-1 space-y-1">
                  <li><span className="font-medium">美味辛辣 (gourmetspicy)：</span> 作為首選口味，顯示消費者對濃郁口感的偏好。可以此為基礎開發不同辣度級別。</li>
                  <li><span className="font-medium">辣雞 (hotchicken)：</span> 結合了辣味和雞肉風味，是一個受歡迎的組合。考慮開發植物基版本，吸引素食消費者。</li>
                  <li><span className="font-medium">火辣芝士風味雞 (firehotcheeseflaveredchicken)：</span> 複合風味，顯示消費者對創新口味的興趣。可以此為靈感，開發更多獨特口味組合。</li>
                </ul>
              </li>
              
              <li>
                <span className="font-medium">麵條 (noodles)：</span>
                <ul className="list-disc pl-5 mt-1 space-y-1">
                  <li><span className="font-medium">麵條：</span> 作為產品核心，品質至關重要。持續改進麵條質地和口感。</li>
                  <li><span className="font-medium">微波/水煮 (boil/microwave)：</span> 提供多種烹飪方式，增加便利性。可考慮開發專為微波優化的配方。</li>
                  <li><span className="font-medium">水煮 (boil)：</span> 傳統烹飪方式。可提供詳細的烹飪指南，確保最佳口感。</li>
                </ul>
              </li>
              
              <li>
                <span className="font-medium">包裝 (package information)：</span>
                <ul className="list-disc pl-5 mt-1 space-y-1">
                  <li><span className="font-medium">110g：</span> 適合單人份。可考慮將此作為標準規格，便於卡路里計算。</li>
                  <li><span className="font-medium">125g：</span> 稍大份量，可滿足較大食量需求。考慮將此作為"大胃王"版本推廣。</li>
                  <li><span className="font-medium">112g：</span> 介於兩者之間，可作為均衡選擇。考慮將此定位為"適中份量"。</li>
                </ul>
              </li>
              
              <li>
                <span className="font-medium">重量 (weight)：</span>
                <ul className="list-disc pl-5 mt-1 space-y-1">
                  <li><span className="font-medium">4800g：</span> 適合家庭裝或團購。可考慮推出配套的大容量調味包。</li>
                  <li><span className="font-medium">550g：</span> 中等包裝，適合小家庭。可設計為可重複密封的包裝，確保新鮮度。</li>
                </ul>
              </li>
            </ol>
            
            <h4 className="text-lg font-semibold text-blue-800 mt-6 mb-2">綜合建議：</h4>
            <ol className="list-decimal pl-5 space-y-2 text-gray-700">
              <li><span className="font-medium">過敏原管理：</span> 開發多元化的產品線，包括無大豆、無麩質選項，以滿足特殊飲食需求。</li>
              
              <li><span className="font-medium">口味創新：</span> 在保留熱門口味的同時，定期推出限定口味，保持消費者興趣。</li>
              
              <li><span className="font-medium">麵條優化：</span> 研發適合不同烹飪方式的麵條配方，確保在各種烹飪條件下都能保持最佳口感。</li>
              
              <li><span className="font-medium">包裝方式：</span> 提供清晰的份量信息，幫助消費者做出適合自己需求的選擇。考慮環保包裝材料。</li>
              
              <li><span className="font-medium">重量多樣化：</span> 針對不同消費場景（個人、家庭、團體）優化包裝規格，提高產品靈活性。</li>
              
              <li><span className="font-medium">數字化轉型：</span> 導入數字化生產管理系統，實現從訂單接收到產品交付的全流程數字化管理，提高生產透明度和決策效率。</li>
            </ol>
          </div>
        </div>
      </div>

      {/* 四、數位轉型建議 */}
      <div className="mb-12 print:page-break-after">
        <header className="mb-8">
          <h2 className="text-3xl font-bold text-blue-900">四、數位轉型建議</h2>
          <div className="mt-2 h-1 w-24 bg-orange-400 rounded-full"></div>
        </header>
        
        <div className="bg-white p-6 rounded-xl border-2 border-blue-200 mb-8">
          <h3 className="text-xl font-bold text-blue-800 mb-6">研發數位化優先面向建議</h3>
          
          <div className="space-y-6">
            {/* 面向優先順序說明 */}
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-gray-700">{digitalTransformationRecommendations?.introduction || "根據貴公司目前的數位成熟度評估，以下提供研發數位化面向，並依據優先順序排列。數字為現階段完成度評估。"}</p>
            </div>
            
            {/* 數位轉型階段建議 - 從JSON資料動態生成 */}
            {digitalTransformationRecommendations?.stages?.sort((a, b) => (a.priority || 999) - (b.priority || 999)).map((stage, index) => {
              const colors = [
                { bg: 'blue', text: 'blue' },
                { bg: 'indigo', text: 'indigo' },
                { bg: 'teal', text: 'teal' },
                { bg: 'orange', text: 'orange' }
              ];
              const color = colors[index % colors.length];
              
              return (
                <div key={index} className={`bg-${color.bg}-50 p-4 rounded-lg border border-${color.bg}-200`}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <div className={`w-8 h-8 rounded-full bg-${color.bg}-800 text-white flex items-center justify-center mr-3 font-bold`}>{index + 1}</div>
                      <h4 className={`text-lg font-semibold text-${color.bg}-800`}>{stage.stageName}</h4>
                    </div>
                    <div className="flex items-center">
                      <div className={`text-${color.bg}-800 font-bold mr-2`}>{stage.score}</div>
                      <div className="w-24 h-3 bg-gray-200 rounded-full">
                        <div className={`h-full bg-${color.bg}-600 rounded-full`} style={{ width: stage.percentage }}></div>
                      </div>
                      <div className={`ml-2 text-${color.bg}-800 font-medium`}>{stage.percentage}</div>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className={`text-${color.bg}-700 font-medium mb-1`}>重點工作</div>
                    <ul className="text-gray-700 pl-5 list-disc space-y-1">
                      {stage.keyTasks.slice(0, 3).map((task, taskIndex) => (
                        <li key={taskIndex}>{task}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="mb-4">
                    <div className={`text-${color.bg}-700 font-medium mb-1`}>預期效益</div>
                    <p className="text-gray-700 text-sm">
                      {stage.expectedBenefits.slice(0, 3).join('。') + '。'}
                    </p>
                  </div>
                  
                  {/* 轉型工具 - 從JSON資料動態生成 */}
                  {index < digitalTransformationRecommendations?.recommendedTools?.length && (
                    <div className="mb-4">
                      <div className={`text-${color.bg}-700 font-medium mb-1`}>轉型工具</div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                        {digitalTransformationRecommendations.recommendedTools[index].tools.slice(0, 2).map((tool, toolIndex) => (
                          <div key={toolIndex} className={`bg-white p-4 rounded-lg border border-${color.bg}-200`}>
                            <div className={`font-medium text-${color.bg}-700 mb-2`}>{tool.name}</div>
                            <div className="text-sm text-gray-500 mb-1">服務機構：{tool.provider}</div>
                            <p className="text-gray-700 text-sm">{tool.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 頁尾 */}
      <footer className="text-center text-gray-500 text-sm mt-10">
        <div>© 2025 財團法人商業發展研究院</div>
        <div>數據驅動製造業研發創新計畫</div>
      </footer>

      {/* 列印專用樣式 */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @media print {
            @page {
              size: A4;
              margin: 15mm 10mm;
            }
            
            body {
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
              color-adjust: exact !important;
              font-size: 12pt;
            }
            
            .print\\:page-break-after {
              page-break-after: always;
              margin-bottom: 0 !important;
              padding-bottom: 0 !important;
            }
            
            .print\\:page-break-before {
              page-break-before: always;
              margin-top: 0 !important;
              padding-top: 0 !important;
            }
            
            .no-print, .print\\:hidden {
              display: none !important;
            }

            /* 確保所有元素都能正確顯示 */
            * {
              overflow: visible !important;
            }

            /* 確保背景色打印 */
            div, p, span, h1, h2, h3, h4, h5, h6 {
              background-color: inherit !important;
              color: inherit !important;
            }
            
            /* 避免不必要的分頁 */
            svg, .chart-container, .bg-white {
              page-break-inside: avoid;
            }
          }
        `
      }} />
    </div>
  );
};

export default PrintableReport;