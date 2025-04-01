import React, { useRef, useEffect } from 'react';
import { User, Building, Phone, Mail, DollarSign, FileText, BarChart2, Layers, Database, Cpu, Search, ChevronRight, Check, Download, Printer } from 'lucide-react';

// 預設靜態數據（如果沒有提供動態數據）
const defaultData = {
  reportInfo: {
    title: "數據驅動精準研發製造平台",
    subtitle: "研發能力數據診斷報告",
    caseNumber: "20250327-001",
    date: "2025年3月27日",
    executiveUnit: "財團法人商業發展研究院"
  },
  companyInfo: {
    name: "精密機械科技股份有限公司",
    representative: "林智勇",
    address: "新北市新莊區中正路568號",
    contactPerson: "陳經理",
    uniformNumber: "87654321",
    phone: "(02)8765-4321",
    email: "contact@precision-tech.com.tw",
    position: "研發部經理",
    field: "精密機械製造",
    capital: "80,000 千元",
    revenue: "150,000 千元",
    employees: "75 人",
    mainProducts: "精密機械零件、工業自動化設備、CNC加工元件",
    introduction: [
      "精密機械科技股份有限公司成立於2002年，專注於高精度機械零件與工業自動化設備的研發與製造。公司擁有先進的CNC機台與檢測設備，致力於提供高品質、高精度的工業零組件，服務對象包括半導體設備製造商、汽車零部件供應商及精密儀器領域客戶。",
      "公司獲得ISO9001、ISO14001等多項國際認證，產品出口至歐美及亞洲多國。近年來，企業積極推動智能製造轉型，導入工業4.0相關技術，並已建立初步的數據收集系統，但仍在尋求更全面的數位轉型方案，以提升研發效率與創新能力，保持市場競爭力。"
    ]
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
      // 檢查瀏覽器是否支援HTML轉PDF直接下載的功能
      const hasClient = !!window['html2pdf'];
      
      if (hasClient) {
        // 如果瀏覽器支援，使用客戶端庫直接下載
        const element = reportRef.current;
        const opt = {
          margin: [10, 10, 10, 10],
          filename: '數據驅動精準研發製造平台_診斷報告.pdf',
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
    // 動態載入html2pdf庫
    const loadHtml2pdf = () => {
      return new Promise((resolve, reject) => {
        if (window['html2pdf']) {
          resolve(window['html2pdf']);
          return;
        }
        
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
        script.onload = () => resolve(window['html2pdf']);
        script.onerror = reject;
        document.head.appendChild(script);
      });
    };
    
    // 嘗試載入html2pdf
    loadHtml2pdf().catch(() => console.log('無法載入html2pdf，將使用列印功能'));

    // 添加按鈕容器
    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'fixed top-4 right-4 flex gap-2 print:hidden z-50';
    
    // 添加列印按鈕
    const printButton = document.createElement('button');
    printButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg> <span>列印報告</span>';
    printButton.className = 'bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 flex items-center gap-2';
    printButton.onclick = () => {
      window.print();
    };
    
    // 添加下載PDF按鈕
    const downloadButton = document.createElement('button');
    downloadButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg> <span>下載PDF</span>';
    downloadButton.className = 'bg-green-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-700 flex items-center gap-2';
    downloadButton.onclick = downloadPDF;
    
    // 將按鈕添加到容器
    buttonContainer.appendChild(printButton);
    buttonContainer.appendChild(downloadButton);
    document.body.appendChild(buttonContainer);

    return () => {
      // 清理
      if (document.body.contains(buttonContainer)) {
        document.body.removeChild(buttonContainer);
      }
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
      
      <text x="400" y="350" textAnchor="middle" fontSize="14">平均單價 (千元)</text>
      
      {/* 左側標籤 */}
      <text x="20" y="180" textAnchor="middle" fontSize="14" transform="rotate(-90, 20, 180)">滿意度 (%)</text>
      
      {/* 台灣本土製造商群組 */}
      <circle cx="120" cy="75" r="40" fill="#38B2AC" fillOpacity="0.7" />
      <text x="120" y="70" textAnchor="middle" fontSize="12" fill="white">台灣精密</text>
      <text x="120" y="85" textAnchor="middle" fontSize="10" fill="white">機械製造</text>
      
      <circle cx="150" cy="85" r="35" fill="#38B2AC" fillOpacity="0.7" />
      <text x="150" y="85" textAnchor="middle" fontSize="11" fill="white">寶鋒精工</text>
      
      <circle cx="170" cy="95" r="30" fill="#38B2AC" fillOpacity="0.7" />
      <text x="170" y="95" textAnchor="middle" fontSize="10" fill="white">東昇機械</text>
      
      {/* 中價位專業製造商群組 */}
      <circle cx="260" cy="120" r="25" fill="#3182CE" fillOpacity="0.7" />
      <text x="260" y="120" textAnchor="middle" fontSize="10" fill="white">凱廷精密</text>
      
      <circle cx="290" cy="110" r="20" fill="#3182CE" fillOpacity="0.7" />
      <text x="290" y="110" textAnchor="middle" fontSize="9" fill="white">宏泰科技</text>
      
      <circle cx="320" cy="80" r="25" fill="#3182CE" fillOpacity="0.7" />
      <text x="320" y="80" textAnchor="middle" fontSize="10" fill="white">百陽工業</text>
      
      <circle cx="330" cy="100" r="15" fill="#3182CE" fillOpacity="0.7" />
      <text x="330" y="100" textAnchor="middle" fontSize="8" fill="white">金澤</text>
      
      <circle cx="350" cy="90" r="20" fill="#3182CE" fillOpacity="0.7" />
      <text x="350" y="90" textAnchor="middle" fontSize="9" fill="white">華陽精機</text>
      
      {/* 高價位國際品牌群組 */}
      <circle cx="480" cy="70" r="25" fill="#DD6B20" fillOpacity="0.7" />
      <text x="480" y="70" textAnchor="middle" fontSize="10" fill="white">西門子</text>
      
      <circle cx="520" cy="90" r="20" fill="#DD6B20" fillOpacity="0.7" />
      <text x="520" y="90" textAnchor="middle" fontSize="9" fill="white">三菱</text>
      
      <circle cx="550" cy="80" r="15" fill="#DD6B20" fillOpacity="0.7" />
      <text x="550" y="80" textAnchor="middle" fontSize="8" fill="white">法那科</text>
      
      <circle cx="590" cy="75" r="25" fill="#DD6B20" fillOpacity="0.7" />
      <text x="590" y="75" textAnchor="middle" fontSize="10" fill="white">哈斯</text>
      
      <circle cx="630" cy="65" r="30" fill="#DD6B20" fillOpacity="0.7" />
      <text x="630" y="65" textAnchor="middle" fontSize="10" fill="white">德馬吉</text>
      
      {/* 圖例 */}
      <rect x="570" y="140" width="160" height="100" fill="white" stroke="#ddd" strokeWidth="1" />
      <text x="650" y="160" textAnchor="middle" fontSize="12" fontWeight="bold">製造商分布</text>
      
      <circle cx="590" y="180" r="10" fill="#38B2AC" fillOpacity="0.7" />
      <text x="660" y="183" textAnchor="start" fontSize="11">台灣本土製造商</text>
      
      <circle cx="590" y="205" r="10" fill="#3182CE" fillOpacity="0.7" />
      <text x="660" y="208" textAnchor="start" fontSize="11">中價位專業製造商</text>
      
      <circle cx="590" y="230" r="10" fill="#DD6B20" fillOpacity="0.7" />
      <text x="660" y="233" textAnchor="start" fontSize="11">高價位國際品牌</text>
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
      
      {/* 月份柱狀圖 */}
      <rect x="60" y="225" width="14" height="25" fill="#4299E1" />
      <rect x="85" y="210" width="14" height="40" fill="#4299E1" />
      <rect x="110" y="200" width="14" height="50" fill="#4299E1" />
      <rect x="135" y="220" width="14" height="30" fill="#4299E1" />
      <rect x="160" y="215" width="14" height="35" fill="#4299E1" />
      <rect x="185" y="205" width="14" height="45" fill="#4299E1" />
      <rect x="210" y="195" width="14" height="55" fill="#4299E1" />
      <rect x="235" y="205" width="14" height="45" fill="#4299E1" />
      <rect x="260" y="200" width="14" height="50" fill="#4299E1" />
      <rect x="285" y="190" width="14" height="60" fill="#4299E1" />
      <rect x="310" y="195" width="14" height="55" fill="#4299E1" />
      <rect x="335" y="180" width="14" height="70" fill="#4299E1" />
      <rect x="360" y="170" width="14" height="80" fill="#4299E1" />
      <rect x="385" y="190" width="14" height="60" fill="#4299E1" />
      <rect x="410" y="180" width="14" height="70" fill="#4299E1" />
      <rect x="435" y="150" width="14" height="100" fill="#4299E1" />
      <rect x="460" y="140" width="14" height="110" fill="#4299E1" />
      <rect x="485" y="90" width="14" height="160" fill="#4299E1" />
      <rect x="510" y="80" width="14" height="170" fill="#4299E1" />
      <rect x="535" y="110" width="14" height="140" fill="#4299E1" />
      <rect x="560" y="120" width="14" height="130" fill="#4299E1" />
      <rect x="585" y="160" width="14" height="90" fill="#4299E1" />
      <rect x="610" y="200" width="14" height="50" fill="#4299E1" />
      <rect x="635" y="210" width="14" height="40" fill="#4299E1" />
      <rect x="660" y="220" width="14" height="30" fill="#4299E1" />
      <rect x="685" y="225" width="14" height="25" fill="#4299E1" />
      <rect x="710" y="215" width="14" height="35" fill="#4299E1" />
      
      {/* 銷售額數據標籤 - 只顯示部分代表性數據 */}
      <text x="67" y="215" textAnchor="middle" fontSize="9" transform="rotate(-90, 67, 215)">644,529</text>
      <text x="235" y="195" textAnchor="middle" fontSize="9" transform="rotate(-90, 235, 195)">961,608</text>
      <text x="410" y="170" textAnchor="middle" fontSize="9" transform="rotate(-90, 410, 170)">1,776,405</text>
      <text x="485" y="80" textAnchor="middle" fontSize="9" transform="rotate(-90, 485, 80)">3,914,652</text>
      <text x="510" y="70" textAnchor="middle" fontSize="9" transform="rotate(-90, 510, 70)">5,229,724</text>
      <text x="610" y="190" textAnchor="middle" fontSize="9" transform="rotate(-90, 610, 190)">1,024,652</text>
      <text x="710" y="205" textAnchor="middle" fontSize="9" transform="rotate(-90, 710, 205)">647,757</text>
      
      {/* 平均單價折線 */}
      <path d="M67,170 L92,140 L117,140 L142,140 L167,150 L192,150 L217,150 L242,150 
               L267,150 L292,150 L317,140 L342,140 L367,90 L392,90 L417,90 L442,70 
               L467,70 L492,70 L517,70 L542,90 L567,90 L592,120 L617,150 L642,150 
               L667,150 L692,150 L717,160" 
            fill="none" stroke="#E53E3E" strokeWidth="2" />
      
      {/* 平均單價點 */}
      <circle cx="67" cy="170" r="3" fill="#E53E3E" />
      <circle cx="117" cy="140" r="3" fill="#E53E3E" />
      <circle cx="167" cy="150" r="3" fill="#E53E3E" />
      <circle cx="217" cy="150" r="3" fill="#E53E3E" />
      <circle cx="267" cy="150" r="3" fill="#E53E3E" />
      <circle cx="317" cy="140" r="3" fill="#E53E3E" />
      <circle cx="367" cy="90" r="3" fill="#E53E3E" />
      <circle cx="417" cy="90" r="3" fill="#E53E3E" />
      <circle cx="467" cy="70" r="3" fill="#E53E3E" />
      <circle cx="517" cy="70" r="3" fill="#E53E3E" />
      <circle cx="567" cy="90" r="3" fill="#E53E3E" />
      <circle cx="617" cy="150" r="3" fill="#E53E3E" />
      <circle cx="667" cy="150" r="3" fill="#E53E3E" />
      <circle cx="717" cy="160" r="3" fill="#E53E3E" />
      
      {/* 單價數據標籤 - 只顯示部分 */}
      <text x="67" y="165" fontSize="9">17</text>
      <text x="217" y="145" fontSize="9">19</text>
      <text x="367" cy="85" fontSize="9">20</text>
      <text x="467" y="65" fontSize="9">21</text>
      <text x="567" y="85" fontSize="9">19</text>
      <text x="667" y="145" fontSize="9">17</text>
      
      {/* X軸月份標籤 */}
      <text x="67" y="270" textAnchor="middle" fontSize="9">2021.11</text>
      <text x="167" y="270" textAnchor="middle" fontSize="9">2022.03</text>
      <text x="267" y="270" textAnchor="middle" fontSize="9">2022.07</text>
      <text x="367" y="270" textAnchor="middle" fontSize="9">2022.11</text>
      <text x="467" y="270" textAnchor="middle" fontSize="9">2023.03</text>
      <text x="567" y="270" textAnchor="middle" fontSize="9">2023.07</text>
      <text x="667" y="270" textAnchor="middle" fontSize="9">2023.11</text>
      
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
      <rect x="70" y="90" width="70" height="25" fill="#E53E3E" />
      <text x="105" y="110" textAnchor="middle" fontSize="11" fill="white">473</text>
      <text x="105" y="200" textAnchor="middle" fontSize="12" fill="white">2813</text>
      <text x="105" y="285" textAnchor="middle" fontSize="11">加工精度</text>
      
      <rect x="160" y="120" width="70" height="150" fill="#38B2AC" />
      <rect x="160" y="120" width="70" height="30" fill="#E53E3E" />
      <text x="195" y="140" textAnchor="middle" fontSize="11" fill="white">542</text>
      <text x="195" y="210" textAnchor="middle" fontSize="12" fill="white">2047</text>
      <text x="195" y="285" textAnchor="middle" fontSize="11">表面處理</text>
      
      <rect x="250" y="170" width="70" height="100" fill="#38B2AC" />
      <rect x="250" y="170" width="70" height="20" fill="#E53E3E" />
      <text x="285" y="185" textAnchor="middle" fontSize="11" fill="white">276</text>
      <text x="285" y="230" textAnchor="middle" fontSize="12" fill="white">1565</text>
      <text x="285" y="285" textAnchor="middle" fontSize="11">材料品質</text>
      
      {/* 次要特性條形圖 */}
      <rect x="340" y="240" width="40" height="30" fill="#38B2AC" />
      <rect x="340" y="240" width="40" height="5" fill="#E53E3E" />
      <text x="360" y="285" textAnchor="middle" fontSize="11">價格</text>
      
      <rect x="390" y="250" width="40" height="20" fill="#38B2AC" />
      <rect x="390" y="250" width="40" height="5" fill="#E53E3E" />
      <text x="410" y="285" textAnchor="middle" fontSize="11">交期</text>
      
      <rect x="440" y="255" width="40" height="15" fill="#38B2AC" />
      <rect x="440" y="255" width="40" height="3" fill="#E53E3E" />
      <text x="460" y="285" textAnchor="middle" fontSize="11">尺寸精確度</text>
      
      <rect x="490" y="258" width="40" height="12" fill="#38B2AC" />
      <rect x="490" y="258" width="40" height="2" fill="#E53E3E" />
      <text x="510" y="285" textAnchor="middle" fontSize="11">技術支援</text>
      
      <rect x="540" y="260" width="40" height="10" fill="#38B2AC" />
      <rect x="540" y="260" width="40" height="2" fill="#E53E3E" />
      <text x="560" y="285" textAnchor="middle" fontSize="11">標準符合</text>
      
      {/* 更多次要特性 - 只显示很小的条形 */}
      <rect x="590" y="262" width="40" height="8" fill="#38B2AC" />
      <rect x="590" y="262" width="40" height="1" fill="#E53E3E" />
      <text x="610" y="285" textAnchor="middle" fontSize="11">客服</text>
      
      <rect x="640" y="264" width="40" height="6" fill="#38B2AC" />
      <rect x="640" y="264" width="40" height="1" fill="#E53E3E" />
      <text x="660" y="285" textAnchor="middle" fontSize="11">包裝</text>
      
      <rect x="690" y="265" width="40" height="5" fill="#38B2AC" />
      <rect x="690" y="265" width="40" height="1" fill="#E53E3E" />
      <text x="710" y="285" textAnchor="middle" fontSize="11">運輸</text>
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
    <svg width="800" height="320" viewBox="0 0 800 320">
      <text x="400" y="30" textAnchor="middle" fontSize="16" fontWeight="bold">精密零件加工 - 產品規格推薦表</text>
      
      {/* 表格外框與標頭 */}
      <rect x="50" y="50" width="700" height="250" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />
      
      {/* 表頭 */}
      <rect x="50" y="50" width="180" height="40" fill="#38B2AC" />
      <rect x="230" y="50" width="410" height="40" fill="#38B2AC" />
      <rect x="640" y="50" width="110" height="40" fill="#38B2AC" />
      <text x="140" y="75" textAnchor="middle" fontSize="14" fill="white">產品規格</text>
      <text x="435" y="75" textAnchor="middle" fontSize="14" fill="white">產品規格細項</text>
      <text x="695" y="75" textAnchor="middle" fontSize="14" fill="white">推薦序</text>
      
      {/* 材料行 */}
      <rect x="50" y="90" width="180" height="40" fill="#E6FFFA" stroke="#E2E8F0" strokeWidth="1" />
      <rect x="230" y="90" width="410" height="40" fill="#ffffff" stroke="#E2E8F0" strokeWidth="1" />
      <rect x="640" y="90" width="110" height="40" fill="#ffffff" stroke="#E2E8F0" strokeWidth="1" />
      <text x="110" y="115" textAnchor="middle" fontSize="14">材料</text>
      <text x="250" y="110" textAnchor="start" fontSize="12">不銹鋼 (SUS304)</text>
      <text x="250" y="130" textAnchor="start" fontSize="12">鋁合金 (6061-T6)</text>
      <circle cx="695" cy="105" r="15" fill="#38B2AC" />
      <text x="695" y="110" textAnchor="middle" fontSize="12" fill="white" fontWeight="bold">1</text>
      <circle cx="695" cy="125" r="15" fill="#38B2AC" />
      <text x="695" y="130" textAnchor="middle" fontSize="12" fill="white" fontWeight="bold">2</text>
      
      {/* 精度行 */}
      <rect x="50" y="130" width="180" height="40" fill="#E6FFFA" stroke="#E2E8F0" strokeWidth="1" />
      <rect x="230" y="130" width="410" height="40" fill="#ffffff" stroke="#E2E8F0" strokeWidth="1" />
      <rect x="640" y="130" width="110" height="40" fill="#ffffff" stroke="#E2E8F0" strokeWidth="1" />
      <text x="110" y="155" textAnchor="middle" fontSize="14">精度等級</text>
      <text x="250" y="150" textAnchor="start" fontSize="12">超高精度 (±0.005mm)</text>
      <text x="250" y="170" textAnchor="start" fontSize="12">高精度 (±0.01mm)</text>
      <circle cx="695" cy="145" r="15" fill="#38B2AC" />
      <text x="695" y="150" textAnchor="middle" fontSize="12" fill="white" fontWeight="bold">1</text>
      <circle cx="695" cy="165" r="15" fill="#38B2AC" />
      <text x="695" y="170" textAnchor="middle" fontSize="12" fill="white" fontWeight="bold">2</text>
      
      {/* 表面處理行 */}
      <rect x="50" y="170" width="180" height="40" fill="#E6FFFA" stroke="#E2E8F0" strokeWidth="1" />
      <rect x="230" y="170" width="410" height="40" fill="#ffffff" stroke="#E2E8F0" strokeWidth="1" />
      <rect x="640" y="170" width="110" height="40" fill="#ffffff" stroke="#E2E8F0" strokeWidth="1" />
      <text x="110" y="195" textAnchor="middle" fontSize="14">表面處理</text>
      <text x="250" y="190" textAnchor="start" fontSize="12">陽極處理 (Type III硬質)</text>
      <text x="250" y="210" textAnchor="start" fontSize="12">鏡面拋光 (Ra 0.2μm)</text>
      <circle cx="695" cy="185" r="15" fill="#38B2AC" />
      <text x="695" y="190" textAnchor="middle" fontSize="12" fill="white" fontWeight="bold">1</text>
      <circle cx="695" cy="205" r="15" fill="#38B2AC" />
      <text x="695" y="210" textAnchor="middle" fontSize="12" fill="white" fontWeight="bold">2</text>
      
      {/* 加工工藝行 */}
      <rect x="50" y="210" width="180" height="40" fill="#E6FFFA" stroke="#E2E8F0" strokeWidth="1" />
      <rect x="230" y="210" width="410" height="40" fill="#ffffff" stroke="#E2E8F0" strokeWidth="1" />
      <rect x="640" y="210" width="110" height="40" fill="#ffffff" stroke="#E2E8F0" strokeWidth="1" />
      <text x="110" y="235" textAnchor="middle" fontSize="14">加工工藝</text>
      <text x="250" y="230" textAnchor="start" fontSize="12">5軸CNC加工</text>
      <text x="250" y="250" textAnchor="start" fontSize="12">精密車削 (Swiss-type)</text>
      <circle cx="695" cy="225" r="15" fill="#38B2AC" />
      <text x="695" y="230" textAnchor="middle" fontSize="12" fill="white" fontWeight="bold">1</text>
      <circle cx="695" cy="245" r="15" fill="#38B2AC" />
      <text x="695" y="250" textAnchor="middle" fontSize="12" fill="white" fontWeight="bold">2</text>
      
      {/* 尺寸規格行 */}
      <rect x="50" y="250" width="180" height="40" fill="#E6FFFA" stroke="#E2E8F0" strokeWidth="1" />
      <rect x="230" y="250" width="410" height="40" fill="#ffffff" stroke="#E2E8F0" strokeWidth="1" />
      <rect x="640" y="250" width="110" height="40" fill="#ffffff" stroke="#E2E8F0" strokeWidth="1" />
      <text x="110" y="275" textAnchor="middle" fontSize="14">尺寸規格</text>
      <text x="250" y="270" textAnchor="start" fontSize="12">中型零件 (5-100mm)</text>
      <text x="250" y="290" textAnchor="start" fontSize="12">微小零件 (&lt;5mm)</text>
      <circle cx="695" cy="265" r="15" fill="#38B2AC" />
      <text x="695" y="270" textAnchor="middle" fontSize="12" fill="white" fontWeight="bold">1</text>
      <circle cx="695" cy="285" r="15" fill="#38B2AC" />
      <text x="695" y="290" textAnchor="middle" fontSize="12" fill="white" fontWeight="bold">3</text>
      
      {/* 擴展按鈕行 */}
      <rect x="50" y="290" width="700" height="20" fill="#f1f5f9" stroke="#e2e8f0" strokeWidth="1" />
      <text x="400" y="305" textAnchor="middle" fontSize="12">查看更多規格細項...</text>
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
      <text x="120" y="280" textAnchor="middle" fontSize="12">3-below</text>
      <text x="220" y="280" textAnchor="middle" fontSize="12">6-8.99</text>
      <text x="320" y="280" textAnchor="middle" fontSize="12">9-11.99</text>
      <text x="420" y="280" textAnchor="middle" fontSize="12">12-14.99</text>
      <text x="520" y="280" textAnchor="middle" fontSize="12">15-17.99</text>
      <text x="620" y="280" textAnchor="middle" fontSize="12">18-20.99</text>
      <text x="720" y="280" textAnchor="middle" fontSize="12">21-above</text>
      
      {/* Y軸標籤 */}
      <text x="25" y="150" textAnchor="middle" fontSize="14" fontWeight="bold" transform="rotate(-90, 25, 150)">銷售額 (千元)</text>
      <text x="60" y="250" textAnchor="end" fontSize="10">0</text>
      <text x="60" y="210" textAnchor="end" fontSize="10">5,000</text>
      <text x="60" y="170" textAnchor="end" fontSize="10">10,000</text>
      <text x="60" y="130" textAnchor="end" fontSize="10">15,000</text>
      <text x="60" y="90" textAnchor="end" fontSize="10">20,000</text>
      <text x="60" y="50" textAnchor="end" fontSize="10">25,000</text>
      
      {/* 銷售額柱狀圖 */}
      <rect x="100" y="240" width="40" height="10" fill="#F59E0B" />
      <rect x="200" y="160" width="40" height="90" fill="#F59E0B" />
      <rect x="300" y="130" width="40" height="120" fill="#F59E0B" />
      <rect x="400" y="70" width="40" height="180" fill="#F59E0B" />
      <rect x="500" y="180" width="40" height="70" fill="#F59E0B" />
      <rect x="600" y="190" width="40" height="60" fill="#F59E0B" />
      <rect x="700" y="220" width="40" height="30" fill="#F59E0B" />
      
      {/* 數據標籤 */}
      <text x="120" y="235" textAnchor="middle" fontSize="12" fontWeight="bold">1,775</text>
      <text x="220" y="155" textAnchor="middle" fontSize="12" fontWeight="bold">17,837</text>
      <text x="320" y="125" textAnchor="middle" fontSize="12" fontWeight="bold">33,055</text>
      <text x="420" y="65" textAnchor="middle" fontSize="12" fontWeight="bold">26,842</text>
      <text x="520" y="175" textAnchor="middle" fontSize="12" fontWeight="bold">12,698</text>
      <text x="620" y="185" textAnchor="middle" fontSize="12" fontWeight="bold">7,935</text>
      <text x="720" y="215" textAnchor="middle" fontSize="12" fontWeight="bold">6,526</text>
      
      {/* 趨勢線 */}
      <path d="M120 240 L220 160 L320 80 L420 120 L520 180 L620 200 L720 220" fill="none" stroke="#7E22CE" strokeWidth="3" />
      
      {/* 圖例 */}
      <rect x="580" y="80" width="150" height="70" fill="white" stroke="#ddd" />
      <rect x="590" y="95" width="20" height="10" fill="#F59E0B" />
      <text x="620" y="105" fontSize="12">銷售額 (千元)</text>
      <line x1="590" y1="125" x2="610" y2="125" stroke="#7E22CE" strokeWidth="3" />
      <text x="620" y="130" fontSize="12">均價趨勢</text>
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
      <text x="400" y="310" textAnchor="middle" fontSize="14" fontWeight="bold">平均單價 (千元/件)</text>
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
      {/* 台灣本土製造商群組 */}
      <circle cx="145" cy="80" r="35" fill="#3182CE" fillOpacity="0.85" filter="url(#shadow)" />
      <text x="145" y="80" textAnchor="middle" fontSize="14" fill="white" fontWeight="bold">台灣本土</text>
      <text x="145" y="100" textAnchor="middle" fontSize="12" fill="white">製造商</text>
      
      {/* 中價位專業製造商群組 */}
      <circle cx="320" cy="120" r="25" fill="#805AD5" fillOpacity="0.85" filter="url(#shadow)" />
      <text x="320" y="120" textAnchor="middle" fontSize="12" fill="white" fontWeight="bold">優質機械</text>
      
      <circle cx="390" cy="140" r="22" fill="#805AD5" fillOpacity="0.85" filter="url(#shadow)" />
      <text x="390" y="140" textAnchor="middle" fontSize="12" fill="white" fontWeight="bold">精密科技</text>
      
      <circle cx="470" cy="125" r="20" fill="#805AD5" fillOpacity="0.85" filter="url(#shadow)" />
      <text x="470" y="125" textAnchor="middle" fontSize="11" fill="white" fontWeight="bold">新興公司</text>
      
      {/* 德日系製造商群組 */}
      <circle cx="620" cy="90" r="35" fill="#E53E3E" fillOpacity="0.85" filter="url(#shadow)" />
      <text x="620" y="90" textAnchor="middle" fontSize="14" fill="white" fontWeight="bold">德日系</text>
      <text x="620" y="110" textAnchor="middle" fontSize="12" fill="white">製造商</text>
      
      {/* 圖例 */}
      <rect x="550" y="160" width="180" height="90" fill="white" stroke="#ddd" strokeWidth="1" filter="url(#shadow)" />
      <text x="640" y="180" textAnchor="middle" fontSize="12" fontWeight="bold">製造商群組</text>
      <circle cx="570" y="200" r="10" fill="#3182CE" fillOpacity="0.85" />
      <text x="640" y="200" textAnchor="middle" fontSize="12">台灣本土: 10-15千元</text>
      <circle cx="570" y="225" r="10" fill="#805AD5" fillOpacity="0.85" />
      <text x="640" y="225" textAnchor="middle" fontSize="12">中價位: 20-25千元</text>
      <circle cx="570" y="250" r="10" fill="#E53E3E" fillOpacity="0.85" />
      <text x="640" y="250" textAnchor="middle" fontSize="12">德日系: 30千元+</text>
    </svg>
  );

  // 大規格熱度分析圖表 - 使用熱圖格式，與小規格分析相同風格
  const LargeSpecificationHeatChart = () => (
    <svg width="800" height="300" viewBox="0 0 800 300">
      {/* 座標軸和標題 */}
      <text x="400" y="30" textAnchor="middle" fontSize="16" fontWeight="bold">精密零件加工規格關注度</text>
      
      {/* 熱圖格式 */}
      <rect x="50" y="50" width="700" height="200" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />
      
      {/* 主要區塊 - 加工精度 */}
      <rect x="50" y="50" width="250" height="100" fill="#3B82F6" fillOpacity="0.9" />
      <text x="175" y="100" textAnchor="middle" fontSize="18" fill="white" fontWeight="bold">加工精度</text>
      <text x="175" y="130" textAnchor="middle" fontSize="14" fill="white">(關注度95%)</text>
      
      {/* 次要區塊 - 表面處理 */}
      <rect x="300" y="50" width="220" height="100" fill="#60A5FA" fillOpacity="0.9" />
      <text x="410" y="100" textAnchor="middle" fontSize="16" fill="white" fontWeight="bold">表面處理</text>
      <text x="410" y="130" textAnchor="middle" fontSize="12" fill="white">(關注度85%)</text>
      
      {/* 次要區塊 - 材料品質 (高亮顯示以對應小規格分析) */}
      <rect x="520" y="50" width="230" height="100" fill="#8B5CF6" fillOpacity="0.9" stroke="#6D28D9" strokeWidth="3" />
      <text x="635" y="100" textAnchor="middle" fontSize="16" fill="white" fontWeight="bold">材料品質</text>
      <text x="635" y="130" textAnchor="middle" fontSize="12" fill="white">(關注度78%)</text>
      
      {/* 加工工藝 */}
      <rect x="50" y="150" width="200" height="100" fill="#93C5FD" fillOpacity="0.9" />
      <text x="150" y="200" textAnchor="middle" fontSize="16" fill="#1E3A8A" fontWeight="bold">加工工藝</text>
      <text x="150" y="225" textAnchor="middle" fontSize="12" fill="#1E3A8A">(關注度65%)</text>
      
      {/* 尺寸規格 */}
      <rect x="250" y="150" width="250" height="100" fill="#BFDBFE" fillOpacity="0.9" />
      <text x="375" y="200" textAnchor="middle" fontSize="16" fill="#1E3A8A" fontWeight="bold">尺寸規格</text>
      <text x="375" y="225" textAnchor="middle" fontSize="12" fill="#1E3A8A">(關注度48%)</text>
      
      {/* 公差範圍 */}
      <rect x="500" y="150" width="250" height="100" fill="#DBEAFE" fillOpacity="0.9" />
      <text x="625" y="200" textAnchor="middle" fontSize="16" fill="#1E3A8A" fontWeight="bold">公差範圍</text>
      <text x="625" y="225" textAnchor="middle" fontSize="12" fill="#1E3A8A">(關注度35%)</text>
      
      {/* 圖例 */}
      <rect x="50" y="260" width="700" height="30" fill="#f5f5f5" />
      <text x="400" y="280" textAnchor="middle" fontSize="14">加工規格關注度比例 (2024年數據) - 紫色區塊詳細分析見下圖</text>
    </svg>
  );
  
  // 小規格熱度分析圖表 - 使用熱圖格式，專注於材料品質細分
  const SmallSpecificationHeatChart = () => (
    <svg width="800" height="300" viewBox="0 0 800 300">
      {/* 座標軸和標題 */}
      <text x="400" y="30" textAnchor="middle" fontSize="16" fontWeight="bold">精密零件材料品質規格關注度</text>
      
      {/* 熱圖格式 - 使用與大規格圖表中材料品質相同的外框顏色 */}
      <rect x="50" y="50" width="700" height="200" fill="#f8fafc" stroke="#6D28D9" strokeWidth="3" />
      
      {/* 主要區塊 - 不銹鋼 */}
      <rect x="50" y="50" width="350" height="100" fill="#8B5CF6" fillOpacity="0.9" />
      <text x="225" y="100" textAnchor="middle" fontSize="18" fill="white" fontWeight="bold">不銹鋼</text>
      <text x="225" y="130" textAnchor="middle" fontSize="14" fill="white">(SUS304, SUS316L)</text>
      
      {/* 次要區塊 - 鋁合金 */}
      <rect x="50" y="150" width="230" height="100" fill="#A78BFA" fillOpacity="0.9" />
      <text x="165" y="200" textAnchor="middle" fontSize="16" fill="white" fontWeight="bold">鋁合金</text>
      <text x="165" y="225" textAnchor="middle" fontSize="12" fill="white">(6061, 7075)</text>
      
      {/* 次要區塊 - 鈦合金 */}
      <rect x="280" y="150" width="220" height="100" fill="#C4B5FD" fillOpacity="0.9" />
      <text x="390" y="200" textAnchor="middle" fontSize="16" fill="white" fontWeight="bold">鈦合金</text>
      <text x="390" y="225" textAnchor="middle" fontSize="12" fill="white">(Ti6Al4V)</text>
      
      {/* 小區塊 - 特殊合金 */}
      <rect x="400" y="50" width="160" height="100" fill="#DDD6FE" fillOpacity="0.9" />
      <text x="480" y="100" textAnchor="middle" fontSize="14" fill="#4C1D95" fontWeight="bold">特殊合金</text>
      
      {/* 小區塊 - 碳鋼 */}
      <rect x="560" y="50" width="190" height="50" fill="#BFDBFE" fillOpacity="0.9" />
      <text x="655" y="75" textAnchor="middle" fontSize="14" fill="#1E3A8A" fontWeight="bold">碳鋼</text>
      
      {/* 小區塊 - 銅合金 */}
      <rect x="560" y="100" width="190" height="50" fill="#DBEAFE" fillOpacity="0.9" />
      <text x="655" y="125" textAnchor="middle" fontSize="14" fill="#1E3A8A" fontWeight="bold">銅合金</text>
      
      {/* 塑膠 */}
      <rect x="500" y="150" width="250" height="100" fill="#EFF6FF" fillOpacity="0.9" />
      <text x="625" y="200" textAnchor="middle" fontSize="16" fill="#1E3A8A" fontWeight="bold">工程塑膠</text>
      
      {/* 圖例 */}
      <rect x="50" y="260" width="700" height="30" fill="#f5f5f5" />
      <text x="400" y="280" textAnchor="middle" fontSize="14">材料規格關注度比例 (2024年數據) - 方格大小代表市場需求量</text>
    </svg>
  );

  return (
    <div className="min-h-screen bg-white font-sans p-10 text-black print:p-0 max-w-none" ref={reportRef}>
      {/* Header/Cover Page */}
      <div className="mb-12 text-center print:page-break-after">
        <div className="flex justify-center mb-8">
          <div className="w-20 h-20 rounded-full bg-blue-800 flex items-center justify-center">
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
            <span>數位轉型建議</span>
            <span className="flex-grow border-b border-dashed border-gray-300 mx-4"></span>
            <span>7</span>
          </li>
          <li className="flex items-center">
            <span className="font-medium mr-4">五、</span>
            <span>訪視紀錄表</span>
            <span className="flex-grow border-b border-dashed border-gray-300 mx-4"></span>
            <span>10</span>
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="mb-6">
                <div className="text-gray-500 mb-1">公司名稱</div>
                <div className="text-lg font-medium">{companyInfo.name}</div>
              </div>
              
              <div className="mb-6">
                <div className="text-gray-500 mb-1">負責人</div>
                <div className="text-lg font-medium">{companyInfo.representative}</div>
              </div>
              
              <div className="mb-6">
                <div className="text-gray-500 mb-1">地址</div>
                <div className="text-lg font-medium">{companyInfo.address}</div>
              </div>
              
              <div className="mb-6">
                <div className="text-gray-500 mb-1">聯絡人</div>
                <div className="text-lg font-medium">{companyInfo.contactPerson}</div>
              </div>
            </div>
            
            <div>
              <div className="mb-6">
                <div className="text-gray-500 mb-1">統一編號</div>
                <div className="text-lg font-medium">{companyInfo.uniformNumber}</div>
              </div>
              
              <div className="mb-6">
                <div className="text-gray-500 mb-1">聯絡電話</div>
                <div className="text-lg font-medium">{companyInfo.phone}</div>
              </div>
              
              <div className="mb-6">
                <div className="text-gray-500 mb-1">E-Mail</div>
                <div className="text-lg font-medium">{companyInfo.email}</div>
              </div>
              
              <div className="mb-6">
                <div className="text-gray-500 mb-1">職稱</div>
                <div className="text-lg font-medium">{companyInfo.position}</div>
              </div>
            </div>
          </div>
          
          <div className="mt-4">
            <div className="text-gray-500 mb-1">領域別</div>
            <div className="flex gap-4 mt-2">
              <div className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full font-medium">{companyInfo.field}</div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div>
              <div className="text-gray-500 mb-1">資本額</div>
              <div className="text-lg font-medium">{companyInfo.capital}</div>
            </div>
            
            <div>
              <div className="text-gray-500 mb-1">營業額</div>
              <div className="text-lg font-medium">{companyInfo.revenue}</div>
            </div>
            
            <div>
              <div className="text-gray-500 mb-1">員工人數</div>
              <div className="text-lg font-medium">{companyInfo.employees}</div>
            </div>
          </div>
          
          <div className="mt-6">
            <div className="text-gray-500 mb-1">主要產品</div>
            <div className="text-lg font-medium">{companyInfo.mainProducts}</div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl border-2 border-blue-200">
          <h3 className="text-xl font-bold text-blue-800 mb-4">公司簡介</h3>
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
              <div className="text-2xl font-bold text-blue-800">{companyInfo.name || '精密機械科技'}</div>
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
          
          <div className="flex justify-center mb-8">
            <div className="relative">
              <svg width="160" height="160" viewBox="0 0 160 160">
                {/* 背景圓環 */}
                <circle cx="80" cy="80" r="70" fill="none" stroke="#DBEAFE" strokeWidth="12" />
                
                {/* 進度圓環 */}
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  fill="none"
                  stroke="#2563EB"
                  strokeWidth="12"
                  strokeDasharray="439.6 439.6"
                  strokeDashoffset="175.84"
                  strokeLinecap="round"
                  transform="rotate(-90 80 80)"
                />
              </svg>
              
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                {/* <div className="text-4xl font-bold text-blue-800">62%</div>
                <div className="text-sm text-gray-500">推動指數</div> */}
                <div className="text-md font-semibold text-blue-600">優先程度</div>
              </div>
            </div>
          </div>
          
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
            <div className="text-lg font-semibold text-blue-800 mb-2">研發轉型推動重點分析 (推動指數：62%)</div>
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
              在改變企業研發速度及研發流程方面，公司整體得分為7/15分。敏捷研發管理系統（3分）展現出基礎的進度追蹤能力，但在PLM系統導入（2分）和跨部門協作機制（2分）方面仍有較大的提升空間，這表明企業在系統性的研發流程管理上亟需加強。
            </p>
            
            <p className="text-gray-700 leading-relaxed">
              建議優先建立完整的敏捷研發管理框架，如導入Scrum或Kanban等敏捷方法論，實現研發專案的透明化管理與持續改進。同時，可評估導入輕量級PLM系統，優化產品生命週期管理，並建立固定的跨部門協作機制，如定期的設計評審會議，提升各部門間的協同效率。
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
              在使用資料驅動研發決策方面，公司得分為9/15分。AI技術應用（4分）顯示企業對新技術有較高接受度，而數據分析平台（3分）已有基礎，但客戶需求分析系統（2分）仍處於起步階段，顯示在客戶洞察轉化為產品開發決策方面存在挑戰。
            </p>
            
            <p className="text-gray-700 leading-relaxed">
              建議優先擴展AI技術在市場趨勢分析和產品性能預測方面的應用，強化決策支持能力。同時，升級現有數據分析平台，整合內外部數據源，建立更全面的市場與技術趨勢監測系統。另外，應建立系統化的客戶反饋收集機制，如定期客戶訪談和產品使用調查，構建完整的客戶需求數據庫。
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
              在體驗設計思維進行研發方面，公司得分最高，達12/15分。使用者體驗設計（4分）、產品原型驗證（4分）和使用者回饋收集（4分）均表現良好，顯示企業已建立起較為完善的用戶中心設計流程，這是企業的一大優勢。
            </p>
            
            <p className="text-gray-700 leading-relaxed">
              建議在現有基礎上，進一步精煉用戶體驗設計方法，如導入專業的客戶旅程圖和服務設計工具，捕捉更深層次的用戶需求。同時，加強原型測試的數據化管理，建立標準化的測試流程與指標體系，並提升用戶反饋的智能分析能力，實現反饋數據的自動化處理與優先級排序。
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
              在採用新科技進行研發方面，公司得分為9/15分。物聯網技術應用（4分）表現較好，AI與機器學習技術（3分）處於發展中階段，而數位孿生技術（2分）仍在初步探索，顯示企業在新興技術應用上有不同程度的發展。
            </p>
            
            <p className="text-gray-700 leading-relaxed">
              建議深化物聯網技術在產品測試與用戶行為分析中的應用，建立完整的數據收集與分析體系。同時，在特定研發項目中加大AI與機器學習的試點應用，如材料選擇優化和產品性能預測。另外，可組建專門的數位孿生技術研究小組，評估在產品設計和生產環節中的應用可能性。
            </p>
          </div>
        </div>
      </div>

      {/* 產業分析及研發規格建議 */}
      <div className="mb-12 print:page-break-after">
        <header className="mb-8">
          <h2 className="text-3xl font-bold text-blue-900">三、產業分析及研發規格建議</h2>
          <div className="mt-2 h-1 w-24 bg-orange-400 rounded-full"></div>
        </header>
        
        <div className="bg-white p-6 rounded-xl border-2 border-blue-200 mb-8">
          <h3 className="text-xl font-bold text-blue-800 mb-6">A. [精密零件加工] 價格 & 品牌定位分析</h3>
          
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
              <li><span className="font-medium">低價台灣本土製造商市占率最高：</span> 台灣本土製造商位於圖表左上方，顯示其擁有較低的平均單價（約15,000元/件）但有最高的客戶滿意度（接近95%）。這表明本土製造商成功地以高性價比策略贏得了大量市場份額，同時保持了高客戶滿意度。</li>
              
              <li><span className="font-medium">中價位專業製造商多，訂單量穩定，為新產品切入點：</span> 在圖表中部（約20,000-30,000元/件價格區間）聚集了多個專業製造商，如優質機械、精密科技等。這個價格區間的品牌數量多，表明競爭激烈，但也意味著這可能是一個適合新產品線切入的價格點，因為客戶在這個區間有多樣化的選擇。</li>
              
              <li><span className="font-medium">高價德日系製造商市占率最高：</span> 德日系製造商位於圖表右上方，顯示其擁有較高的平均單價（約35,000元/件）和較高的滿意度。這表明這些國際廠商成功地佔據了高端市場，可能通過高精度加工能力或品牌聲譽來維持其高價位策略。</li>
              
              <li><span className="font-medium">價格區間分析：</span> 12,000-14,999元/件區間的銷售額最高，達到約1,900萬元，平均單價為13,500元/件。這與台灣本土製造商的定位相符，進一步證實了高性價比策略在市場中的成功。30,000元/件以上的高價區間也有可觀的銷售額，約675萬元，平均單價為33,000元/件。這與德日系製造商的高端定位相符，說明高價市場雖然訂單量可能較低，但仍有顯著的市場價值。</li>
            </ol>
            
            <p className="mt-4 text-gray-700"><span className="font-medium">總結：</span> 市場呈現明顯的價格分層，低價和高價市場都有領先品牌佔據主導地位，而中價位市場則較為分散，可能存在機會。精密機械科技可以根據自身優勢，選擇在高性價比競爭、中價專業化突破或高價精品等不同策略中定位自己的產品線。</p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl border-2 border-blue-200 mb-8">
          <h3 className="text-xl font-bold text-blue-800 mb-6">B. [精密零件加工] 月銷售分析</h3>
          
          <div className="mb-6">
            <MonthlySalesChart />
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="text-lg font-semibold text-blue-800 mb-2">精密零件市場銷售趨勢分析：</h4>
            <ol className="list-decimal pl-5 space-y-2 text-gray-700">
              <li><span className="font-medium">銷售模式：</span> 精密零件銷售呈現明顯的季節性波動。每年11月至1月是銷售高峰期，可能與年末設備升級和預算消化有關。2月至4月通常是銷售低谷，這可能是因為農曆新年影響及客戶新年度預算尚未完全啟動。</li>
              
              <li><span className="font-medium">整體趨勢：</span> 從2022年中開始，精密零件銷售額整體呈上升趨勢。這可能反映出製造業自動化升級需求增加，半導體設備市場的發展，或是產品創新吸引了更多客戶。</li>
              
              <li><span className="font-medium">價格策略：</span> 平均單價維持在17,000至20,000元之間，相對穩定。這表明精密零件市場的定價策略較為一致，可能是為了在競爭激烈的精密製造市場中保持價格競爭力。</li>
              
              <li><span className="font-medium">訂單效果：</span> 銷售高峰期（如2023年11月至2024年1月）的顯著增長可能與半導體設備更新及年末訂單集中有關。這些訂單高峰似乎主要通過增加客戶採購量而非降價來驅動銷售。</li>
            </ol>
            
            <h4 className="text-lg font-semibold text-blue-800 mt-4 mb-2">針對精密零件市場的建議：</h4>
            <ol className="list-decimal pl-5 space-y-2 text-gray-700">
              <li><span className="font-medium">季節性策略：</span> 根據淡旺季銷售差異，調整產能和接單策略。例如，在銷售旺季前確保足夠的生產能力，淡季時安排設備維護或研發工作。</li>
              
              <li><span className="font-medium">產品創新：</span> 考慮開發高附加值產品線，在技術參數上有明顯優勢的零件產品，以增加訂單量並提高客戶忠誠度。</li>
              
              <li><span className="font-medium">價格彈性：</span> 在保持整體價格穩定的同時，可以在淡季推出限時優惠或套裝服務，刺激訂單量。</li>
              
              <li><span className="font-medium">客戶管理：</span> 分析高峰期的客戶訂單模式，建立客戶關係管理系統，提前預測訂單需求，優化產能調配。</li>
              
              <li><span className="font-medium">渠道拓展：</span> 探索新的銷售渠道，如海外市場或新興產業應用，以分散市場風險並拓展營收來源。</li>
              
              <li><span className="font-medium">客戶洞察：</span> 進行市場調研，了解客戶對精密零件的技術規格需求變化，及時調整產品研發方向。</li>
            </ol>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl border-2 border-blue-200 mb-8">
          <h3 className="text-xl font-bold text-blue-800 mb-6">C. [精密零件加工] 客戶回饋分析</h3>
          
          <div className="mb-6">
            <CustomerFeedbackChart />
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="text-lg font-semibold text-blue-800 mb-2">精密零件正負評論數的圖表分析：</h4>
            <ol className="list-decimal pl-5 space-y-2 text-gray-700">
              <li><span className="font-medium">客戶關注重點：</span> 加工精度（Precision）、表面處理（Surface Finish）和材料品質（Material Quality）是客戶討論最多的三個方面，遠超其他因素。這表明這些是精密零件產品中最受關注的核心屬性。</li>
              
              <li><span className="font-medium">價格因素：</span> 價格（Price）是第四個被討論最多的因素，但相比前三項，討論度明顯降低。這可能意味著對於高精度零件，客戶更注重產品本身的品質而非價格。</li>
              
              <li><span className="font-medium">次要關注點：</span> 交期（Delivery Time）、標準符合度（Standard Compliance）和技術支援（Technical Support）等因素也受到一定程度的關注，但討論量相對較少。</li>
              
              <li><span className="font-medium">低關注度因素：</span> 包裝（Packaging）、運輸（Shipping）、客服（Customer Service）等因素討論度較低，可能不是客戶的主要考慮因素。</li>
              
              <li><span className="font-medium">建議重點：</span> 應優先提升加工精度控制能力、表面處理技術和材料品質管理，同時保持合理價格水平，以滿足客戶核心需求。</li>
            </ol>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl border-2 border-blue-200 mb-8">
          <h3 className="text-xl font-bold text-blue-800 mb-6">D. [精密零件加工] 規格熱度分析</h3>
          
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
              <li><span className="font-medium">材料需求最受關注：</span> 材料選擇（Material）是最受關注的特徵，反映了客戶對原材料品質的高度重視。不同材料如不銹鋼、鋁合金、鈦合金等各有其應用場景和市場需求。</li>
              
              <li><span className="font-medium">精度要求次之：</span> 精度規格（Precision）是第二被關注的因素，顯示市場對高精密加工的持續需求。各種精度等級如一般精度、高精度和超高精度加工均有市場。</li>
              
              <li><span className="font-medium">表面處理方式：</span> 表面處理（Surface Treatment）是第三重要因素，包含各種處理方式如拋光、陽極處理、硬化處理等，客戶對不同表面處理的效果和耐久性有明確需求。</li>
              
              <li><span className="font-medium">加工工藝重要性：</span> 加工工藝（Processing Technique）也是客戶關注的重點，包括CNC加工、鑄造、沖壓等不同製造方法。</li>
              
              <li><span className="font-medium">尺寸和公差：</span> 尺寸規格（Dimension）和公差範圍（Tolerance）同樣受到重視，反映了客戶對產品規格一致性的要求。</li>
            </ol>
            <h4 className="text-lg font-semibold text-blue-800 mt-4 mb-2">材料規格細分分析：</h4>
            <ol className="list-decimal pl-5 space-y-2 text-gray-700">
              <li><span className="font-medium">不銹鋼需求最高：</span> 在材料規格中，不銹鋼（特別是SUS304和SUS316L規格）的需求最為突出，主要應用於醫療設備、食品加工設備和半導體設備等領域。</li>
              
              <li><span className="font-medium">鋁合金與鈦合金：</span> 鋁合金（6061、7075規格）和鈦合金（Ti6Al4V規格）分別排在第二和第三位，鋁合金因其輕量化和良好加工性廣泛應用，鈦合金則主要用於高端醫療和航空設備。</li>
              
              <li><span className="font-medium">特殊合金應用：</span> 其他特殊合金如鎳基合金、銅合金等雖然需求量較小，但在特定高端應用中不可替代，且利潤率通常較高。</li>
            </ol>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl border-2 border-blue-200">
          <h3 className="text-xl font-bold text-blue-800 mb-6">E. [精密零件加工] 產品規格推薦</h3>
          
          <div className="mb-6">
            <ProductSpecTable />
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="text-lg font-semibold text-blue-800 mb-2">每個產品規格列出推薦分析：</h4>
            <ol className="list-decimal pl-5 space-y-4 text-gray-700">
              <li>
                <span className="font-medium">材料 (Material)：</span>
                <ul className="list-disc pl-5 mt-1 space-y-1">
                  <li><span className="font-medium">不銹鋼 (Stainless Steel)：</span> 作為首要材料選擇，反映了其廣泛應用性。建議專注於SUS304和SUS316L等常用規格，滿足醫療和食品設備等高要求行業需求。</li>
                  <li><span className="font-medium">鋁合金 (Aluminum Alloy)：</span> 輕量化設計的熱門選擇。可重點發展6061和7075合金加工能力，滿足航空和消費電子產品需求。</li>
                  <li><span className="font-medium">鈦合金 (Titanium Alloy)：</span> 高端應用的首選材料。建議發展Ti6Al4V等醫療級鈦合金加工能力，開拓高價值市場。</li>
                </ul>
              </li>
              
              <li>
                <span className="font-medium">精度等級 (Precision Level)：</span>
                <ul className="list-disc pl-5 mt-1 space-y-1">
                  <li><span className="font-medium">超高精度 (Ultra-high Precision)：</span> 公差範圍±0.005mm以內，適用於精密光學和半導體設備零件。建議投資先進加工設備，提升超高精度加工能力。</li>
                  <li><span className="font-medium">高精度 (High Precision)：</span> 公差範圍±0.01mm，適用於大多數精密機械和醫療設備零件。應作為公司核心競爭力重點發展。</li>
                  <li><span className="font-medium">標準精度 (Standard Precision)：</span> 公差範圍±0.05mm，滿足一般工業應用需求。建議保持高效率生產，降低成本，增強競爭力。</li>
                </ul>
              </li>
              
              <li>
                <span className="font-medium">表面處理 (Surface Treatment)：</span>
                <ul className="list-disc pl-5 mt-1 space-y-1">
                  <li><span className="font-medium">陽極處理 (Anodizing)：</span> 適用於鋁合金零件，提供多種顏色選擇和保護功能。建議開發III型硬質陽極處理能力，提高表面硬度。</li>
                  <li><span className="font-medium">拋光處理 (Polishing)：</span> 從機械拋光到鏡面拋光多種等級，滿足不同視覺和功能需求。建議發展Ra 0.2μm以下的高光潔度加工能力。</li>
                  <li><span className="font-medium">熱處理 (Heat Treatment)：</span> 提高金屬零件硬度和耐磨性。建議投資真空熱處理設備，提供高品質熱處理服務。</li>
                </ul>
              </li>
              
              <li>
                <span className="font-medium">加工工藝 (Processing Technique)：</span>
                <ul className="list-disc pl-5 mt-1 space-y-1">
                  <li><span className="font-medium">5軸CNC加工 (5-axis CNC Machining)：</span> 適用於複雜形狀零件，能夠一次裝夾完成多面加工。建議增加5軸加工中心設備數量，提高複雜零件加工能力。</li>
                  <li><span className="font-medium">精密車削 (Precision Turning)：</span> 適用於軸類零件和圓柱形零件生產。建議投資Swiss-type車銑複合加工設備，提高效率。</li>
                  <li><span className="font-medium">線切割 (Wire EDM)：</span> 適用於硬質材料和複雜輪廓加工。建議保持技術更新，滿足模具和精密零件製造需求。</li>
                </ul>
              </li>
              
              <li>
                <span className="font-medium">尺寸規格 (Dimension)：</span>
                <ul className="list-disc pl-5 mt-1 space-y-1">
                  <li><span className="font-medium">微小零件 (Micro Parts)：</span> 小於5mm的精密零件，應用於醫療和電子行業。建議發展微加工技術，擴大市場範圍。</li>
                  <li><span className="font-medium">中型零件 (Medium Parts)：</span> 5-100mm範圍的零件，是最常見的市場需求。建議保持高效率、高品質的生產能力。</li>
                  <li><span className="font-medium">大型零件 (Large Parts)：</span> 大於100mm的零件，適用於工業設備和自動化設備。建議評估大型零件市場需求，合理配置資源。</li>
                </ul>
              </li>
            </ol>
            
            <h4 className="text-lg font-semibold text-blue-800 mt-6 mb-2">綜合建議：</h4>
            <ol className="list-decimal pl-5 space-y-2 text-gray-700">
              <li><span className="font-medium">材料多元化：</span> 重點發展不銹鋼、鋁合金和鈦合金等高需求材料的加工能力，建立材料專業知識庫，提供客戶材料選擇諮詢服務。</li>
              
              <li><span className="font-medium">精度分層：</span> 建立明確的精度等級分類標準，針對不同精度等級配置相應的加工設備和檢測儀器，確保各等級產品的品質一致性。</li>
              
              <li><span className="font-medium">表面處理整合：</span> 考慮建立表面處理專業線或與專業表面處理供應商建立緊密合作，提供一站式解決方案，減少客戶尋找多家供應商的麻煩。</li>
              
              <li><span className="font-medium">技術升級：</span> 持續投資先進加工設備和技術，尤其是5軸加工、自動化生產線和智能檢測系統，提高生產效率和品質穩定性。</li>
              
              <li><span className="font-medium">柔性生產：</span> 根據市場需求變化，建立柔性生產線，能夠快速調整生產不同尺寸和類型的零件，提高應對市場變化的能力。</li>
              
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
          <h3 className="text-xl font-bold text-blue-800 mb-6">研發數位化導入階段建議</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 rounded-full bg-blue-800 text-white flex items-center justify-center mr-2 font-bold">1</div>
                <h4 className="text-lg font-semibold text-blue-800">第一階段：體驗設計流程優化</h4>
              </div>
              
              <div className="mb-4">
                <div className="text-blue-700 font-medium mb-1">強化面向</div>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-blue-200 text-blue-800 rounded-full text-sm">體驗設計思維進行研發</span>
                </div>
              </div>
              
              <div className="mb-4">
                <div className="text-blue-700 font-medium mb-1">重點工作</div>
                <ul className="text-gray-700">
                  <li className="flex items-start mb-2">
                    <Check className="h-4 w-4 text-blue-600 mt-1 mr-2 flex-shrink-0" />
                    <span>建立設計思考工作坊</span>
                  </li>
                  <li className="flex items-start mb-2">
                    <Check className="h-4 w-4 text-blue-600 mt-1 mr-2 flex-shrink-0" />
                    <span>導入使用者體驗設計流程</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 w-4 text-blue-600 mt-1 mr-2 flex-shrink-0" />
                    <span>建立產品原型驗證機制</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <div className="text-blue-700 font-medium mb-1">預期效益</div>
                <p className="text-gray-700 text-sm">
                  某精密機械製造商導入設計思考工作坊後，產品缺陷率降低30%，用戶滿意度提升25%。完整的使用者體驗設計流程使新產品上市後的修改需求減少40%，而原型驗證機制使產品開發週期縮短20%，大幅降低研發成本。
                </p>
              </div>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 rounded-full bg-blue-800 text-white flex items-center justify-center mr-2 font-bold">2</div>
                <h4 className="text-lg font-semibold text-blue-800">第二階段：數據驅動決策建設</h4>
              </div>
              
              <div className="mb-4">
                <div className="text-blue-700 font-medium mb-1">強化面向</div>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-blue-200 text-blue-800 rounded-full text-sm">使用資料驅動研發決策</span>
                  <span className="px-3 py-1 bg-blue-200 text-blue-800 rounded-full text-sm">採用新科技進行研發</span>
                </div>
              </div>
              
              <div className="mb-4">
                <div className="text-blue-700 font-medium mb-1">重點工作</div>
                <ul className="text-gray-700">
                  <li className="flex items-start mb-2">
                    <Check className="h-4 w-4 text-blue-600 mt-1 mr-2 flex-shrink-0" />
                    <span>建立數據分析平台</span>
                  </li>
                  <li className="flex items-start mb-2">
                    <Check className="h-4 w-4 text-blue-600 mt-1 mr-2 flex-shrink-0" />
                    <span>導入AI輔助決策系統</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 w-4 text-blue-600 mt-1 mr-2 flex-shrink-0" />
                    <span>建置物聯網測試環境</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <div className="text-blue-700 font-medium mb-1">預期效益</div>
                <p className="text-gray-700 text-sm">
                  某智能製造企業建立數據分析平台後，將決策時間從2週縮短至3天。AI輔助決策系統使研發專案成功率提升35%，研發投資回報率提高40%。物聯網測試環境使產品測試覆蓋度提升60%，問題發現率提高45%。
                </p>
              </div>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 rounded-full bg-blue-800 text-white flex items-center justify-center mr-2 font-bold">3</div>
                <h4 className="text-lg font-semibold text-blue-800">第三階段：研發流程系統化</h4>
              </div>
              
              <div className="mb-4">
                <div className="text-blue-700 font-medium mb-1">強化面向</div>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-blue-200 text-blue-800 rounded-full text-sm">改變企業研發速度及研發流程</span>
                </div>
              </div>
              
              <div className="mb-4">
                <div className="text-blue-700 font-medium mb-1">重點工作</div>
                <ul className="text-gray-700">
                  <li className="flex items-start mb-2">
                    <Check className="h-4 w-4 text-blue-600 mt-1 mr-2 flex-shrink-0" />
                    <span>導入完整敏捷研發系統</span>
                  </li>
                  <li className="flex items-start mb-2">
                    <Check className="h-4 w-4 text-blue-600 mt-1 mr-2 flex-shrink-0" />
                    <span>實施PLM系統與知識庫</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 w-4 text-blue-600 mt-1 mr-2 flex-shrink-0" />
                    <span>建立跨部門數位協作平台</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <div className="text-blue-700 font-medium mb-1">預期效益</div>
                <p className="text-gray-700 text-sm">
                  某設備製造企業導入敏捷研發系統後，研發週期縮短30%，團隊生產力提升40%。PLM系統實施使設計變更處理時間減少50%，設計重用率提高25%。跨部門數位協作平台使溝通效率提升65%，專案協調時間減少70%。
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-xl border-2 border-blue-200">
          <h3 className="text-xl font-bold text-blue-800 mb-6">研發數位化導入工具建議</h3>
          
          <div className="space-y-8">
            {/* 體驗設計思維進行研發 */}
            <div>
              <div className="bg-blue-50 p-3 rounded-lg mb-4">
                <h4 className="text-lg font-semibold text-blue-800">1. 體驗設計思維進行研發</h4>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg border border-blue-200">
                  <div className="font-medium text-blue-700 mb-2">設計思考工作坊</div>
                  <div className="text-sm text-gray-500 mb-1">服務機構：商研院 (C2M 輔導)</div>
                  <p className="text-gray-700 text-sm">設計思考工作坊旨在幫助中小型製造業者運用市場數據進行產品創新研發，透過數據分析與設計思維方法，優化產品開發流程並導入C2M數據驅動模式。</p>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-blue-200">
                  <div className="font-medium text-blue-700 mb-2">C2M POC輔導</div>
                  <div className="text-sm text-gray-500 mb-1">服務機構：商研院 (C2M 輔導)</div>
                  <p className="text-gray-700 text-sm">C2M POC（概念驗證）輔導協助中小型製造業者將消費市場數據導入產品研發流程，透過數據分析精準鎖定市場需求，並驗證新產品開發的可行性與競爭力。</p>
                </div>
              </div>
            </div>
            
            {/* 使用資料驅動研發決策 */}
            <div>
              <div className="bg-indigo-50 p-3 rounded-lg mb-4">
                <h4 className="text-lg font-semibold text-indigo-800">2. 使用資料驅動研發決策</h4>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg border border-indigo-200">
                  <div className="font-medium text-indigo-700 mb-2">C2M 會員網站BI分析</div>
                  <div className="text-sm text-gray-500 mb-1">服務機構：商研院</div>
                  <p className="text-gray-700 text-sm">提供互動式BI分析工具，讓業者能夠透過自主操作，分析市場趨勢、產品銷售表現、競爭品牌動態與消費者偏好，進一步優化研發策略。</p>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-indigo-200">
                  <div className="font-medium text-indigo-700 mb-2">InfoMiner 即時輿情分析平台</div>
                  <div className="text-sm text-gray-500 mb-1">服務機構：大數軟體有限公司</div>
                  <p className="text-gray-700 text-sm">快速、精準地分析網路輿情，每15分鐘會擷取最新相關國內外新聞及社群資訊，並立即精準分析相關數據提供給使用者，支援產品數據收集、公關危機應用等。</p>
                </div>
              </div>
            </div>
            
            {/* 採用新科技進行研發 */}
            <div>
              <div className="bg-teal-50 p-3 rounded-lg mb-4">
                <h4 className="text-lg font-semibold text-teal-800">3. 採用新科技進行研發</h4>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg border border-teal-200">
                  <div className="font-medium text-teal-700 mb-2">Vital Knowledge-AOAI智能生成模型</div>
                  <div className="text-sm text-gray-500 mb-1">服務機構：叡揚資訊股份有限公司</div>
                  <p className="text-gray-700 text-sm">提供企業累積、搜尋、分享、管理組織知識資產的雲端知識管理平台，將單一資訊以點線面多維度方式關連，強化組織交流與提高組織的溝通效率。</p>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-teal-200">
                  <div className="font-medium text-teal-700 mb-2">BailAI影像辨識訓練管理平台</div>
                  <div className="text-sm text-gray-500 mb-1">服務機構：慧演智能股份有限公司</div>
                  <p className="text-gray-700 text-sm">為沒有AI開發團隊的企業設計的用戶友好平台，提供先進的物件辨識和肢體辨識模型，支援非程式開發人員也能輕鬆上手的智能化品質檢查。</p>
                </div>
              </div>
            </div>
            
            {/* 改變企業研發速度及研發流程 */}
            <div>
              <div className="bg-orange-50 p-3 rounded-lg mb-4">
                <h4 className="text-lg font-semibold text-orange-800">4. 改變企業研發速度及研發流程</h4>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg border border-orange-200">
                  <div className="font-medium text-orange-700 mb-2">JBS雲端電子簽核專案管理平台</div>
                  <div className="text-sm text-gray-500 mb-1">服務機構：華越資通企管顧問有限公司</div>
                  <p className="text-gray-700 text-sm">協調團隊分派任務，讓團隊中的每個人都能瞭解誰在進行什麼工作，實現及時任務追蹤、共同改善協作、專注主題溝通，確保完整專案執行。</p>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-orange-200">
                  <div className="font-medium text-orange-700 mb-2">Status PowerBPM 企業流程管理</div>
                  <div className="text-sm text-gray-500 mb-1">服務機構：狀態網際網路股份有限公司</div>
                  <p className="text-gray-700 text-sm">無程式設計的拖拉表單流程建立，支援RWD規格一張表單電腦手機通用，提供手機推播、電子郵件等多種通知，自訂統計報表以及多元模組加強團隊協作。</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 五、訪視紀錄表 */}
      <div className="mb-8">
        <header className="mb-8">
          <h2 className="text-3xl font-bold text-blue-900">五、訪視紀錄表</h2>
          <div className="mt-2 h-1 w-24 bg-orange-400 rounded-full"></div>
        </header>
        
        <div className="bg-white p-6 rounded-xl border-2 border-blue-200">
          <div className="space-y-6">
            <div>
              <div className="text-lg font-bold text-blue-800 mb-2">照片/截圖說明：</div>
              <div className="border-2 border-dashed border-gray-300 p-10 rounded-lg flex justify-center items-center">
                <div className="text-gray-400">[此處放置照片/截圖]</div>
              </div>
            </div>
            
            <div>
              <div className="text-lg font-bold text-blue-800 mb-2">照片/截圖說明：</div>
              <div className="border-2 border-dashed border-gray-300 p-10 rounded-lg flex justify-center items-center">
                <div className="text-gray-400">[此處放置照片/截圖]</div>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mt-8">
              <div>
                <div className="text-gray-600 mb-2">輔導單位主管簽名</div>
                <div className="border-b-2 border-gray-300 h-10"></div>
              </div>
              
              <div>
                <div className="text-gray-600 mb-2">輔導員簽名</div>
                <div className="border-b-2 border-gray-300 h-10"></div>
              </div>
              
              <div>
                <div className="text-gray-600 mb-2">受輔導單位簽名(線上免簽)</div>
                <div className="border-b-2 border-gray-300 h-10"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 頁尾 */}
      <footer className="text-center text-gray-500 text-sm mt-10">
        <div>© 2025 財團法人商業發展研究院</div>
        <div>數據驅動精準研發製造平台</div>
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