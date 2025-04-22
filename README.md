# 數據驅動製造業研發創新計畫 - 報告生成系統

## 簡介

本系統用於生成數據驅動製造業研發創新計畫的研發轉型診斷報告書。使用Next.js框架實現，支持PDF導出和打印功能。

## 技術堆疊

- Next.js 14.2.0
- React 18
- TailwindCSS
- html2pdf.js (PDF生成)
- Lucide React (圖標)

## 安裝與運行

1. 安裝依賴：
   ```
   npm install
   ```

2. 開發模式運行：
   ```
   npm run dev
   ```
   然後在瀏覽器中訪問 http://localhost:3000

3. 生產模式構建：
   ```
   npm run build
   ```

4. 啟動生產環境：
   ```
   npm start
   ```

## 功能特性

- 可打印的報告頁面設計
- 可導出為PDF
- 基於模板和數據動態生成報告
- 響應式設計，適配不同的設備尺寸

## 項目結構

- `/app` - Next.js應用程序目錄
  - `/components` - 組件目錄
    - `/sections` - 報告各部分區塊組件
    - `/utils` - 功能腳本
  - `/data` - 報告數據和模板
  - `/models` - 數據模型

## 使用說明

1. 報告預覽頁面中，可以使用頂部的「下載PDF」或「打印報告」按鈕。
2. 系統會自動處理頁面分隔和格式調整，以確保PDF輸出或打印效果最佳。

## 動態 AI 報告生成 JSON 模板

數據目錄包含用於動態生成 AI 報告的 JSON 模板結構。這些模板定義了報告的內容結構，可以根據不同廠商的數據進行客製化，生成專屬的診斷報告。

### 檔案說明

報告數據已按章節拆分為多個JSON檔案：

1. `reportInfo.json` - 報告基本資訊，包含標題、副標題、編號等
2. `companyInfo.json` - 公司基本資料，包含公司名稱、聯絡人、產品等
3. `tableOfContents.json` - 報告目錄結構
4. `diagnosticAnalysis.json` - 研發能力診斷分析數據
5. `researchScaleEvaluation.json` - 研發量表評估分析數據
6. `industryAnalysis.json` - 產業分析數據，包含各類圖表和結論
7. `digitalTransformationRecommendations.json` - 數位轉型建議，包含階段建議與推薦工具
8. `visitRecord.json` - 訪視紀錄相關資訊

### 使用方法

這些模板可與 `PrintableReport.jsx` 組件結合使用，進行動態報告生成：

```javascript
// 範例代碼：載入模板與客製化數據
import reportInfo from '../data/reportInfo.json';
import companyInfo from '../data/companyInfo.json';
import tableOfContents from '../data/tableOfContents.json';
import diagnosticAnalysis from '../data/diagnosticAnalysis.json';
import researchScaleEvaluation from '../data/researchScaleEvaluation.json';
import industryAnalysis from '../data/industryAnalysis.json';
import digitalTransformationRecommendations from '../data/digitalTransformationRecommendations.json';
import visitRecord from '../data/visitRecord.json';
import customData from '../data/companies/example-company.json';

// 合併數據
const reportData = {
  ...reportInfo,
  ...companyInfo,
  ...tableOfContents,
  ...diagnosticAnalysis,
  ...researchScaleEvaluation,
  ...industryAnalysis,
  ...digitalTransformationRecommendations,
  ...visitRecord,
  companyInfo: {
    ...companyInfo.companyInfo,
    ...customData
  }
};

// 使用合併後的數據渲染報告
return <PrintableReport data={reportData} />;
```

### 客製化指南

1. **更新公司資訊**：修改 `companyInfo.json` 中的公司資料
2. **調整診斷分析**：根據實際評估結果修改 `diagnosticAnalysis.json` 中的評分和建議
3. **客製化產業分析**：根據不同產業特性和市場數據，更新 `industryAnalysis.json` 中的圖表和分析
4. **優化建議方案**：根據企業需求和痛點，調整 `digitalTransformationRecommendations.json` 中的內容 