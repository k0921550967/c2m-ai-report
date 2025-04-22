# 動態 AI 報告生成 JSON 模板

本資料夾包含用於動態生成 AI 報告的 JSON 模板結構。這些模板定義了報告的內容結構，可以根據不同廠商的數據進行客製化，生成專屬的診斷報告。

## 檔案說明

報告數據已按章節拆分為多個JSON檔案：

1. `reportInfo.json` - 報告基本資訊，包含標題、副標題、編號等
2. `companyInfo.json` - 公司基本資料，包含公司名稱、聯絡人、產品等
3. `tableOfContents.json` - 報告目錄結構
4. `diagnosticAnalysis.json` - 研發能力診斷分析數據
5. `researchScaleEvaluation.json` - 研發量表評估分析數據
6. `industryAnalysis.json` - 產業分析數據，包含各類圖表和結論
7. `digitalTransformationRecommendations.json` - 數位轉型建議，包含階段建議與推薦工具
8. `visitRecord.json` - 訪視紀錄相關資訊

## 使用方法

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

## 模板結構

### 各檔案結構

```
reportInfo.json
{
  "reportInfo": { /* 報告基本信息 */ }
}

companyInfo.json
{
  "companyInfo": { /* 公司基本資料 */ }
}

tableOfContents.json
{
  "tableOfContents": [ /* 目錄項目 */ ]
}

diagnosticAnalysis.json
{
  "diagnosticAnalysis": { /* 診斷分析數據 */ }
}

researchScaleEvaluation.json
{
  "researchScaleEvaluation": { /* 研發量表評估 */ }
}

industryAnalysis.json
{
  "industryAnalysis": { /* 產業分析數據 */ }
}

digitalTransformationRecommendations.json
{
  "digitalTransformationRecommendations": {
    "stages": [ /* 數位轉型階段建議 */ ],
    "recommendedTools": [ /* 推薦工具與軟體 */ ]
  }
}

visitRecord.json
{
  "visitRecord": { /* 訪視紀錄相關資訊 */ }
}
```

## 客製化指南

1. **更新公司資訊**：修改 `companyInfo.json` 中的公司資料
2. **調整診斷分析**：根據實際評估結果修改 `diagnosticAnalysis.json` 中的評分和建議
3. **客製化產業分析**：根據不同產業特性和市場數據，更新 `industryAnalysis.json` 中的圖表和分析
4. **優化建議方案**：根據企業需求和痛點，調整 `digitalTransformationRecommendations.json` 中的內容

## 擴展方式

可以建立多個企業的數據文件（如在 `companies` 資料夾中建立 `company-a.json`, `company-b.json`），只包含企業獨特的資訊，然後在載入時進行適當合併。

## 優點

1. **模組化**：每個檔案專注於單一報告章節，易於維護和修改
2. **載入靈活性**：可以根據需要只載入特定章節的數據
3. **團隊協作**：不同團隊成員可以同時編輯不同檔案，減少合併衝突
4. **版本控制**：更容易追蹤特定章節資料的變更歷史

## 圖表數據

報告中的圖表數據（如價格品牌定位、月銷售分析等）可以從外部數據源獲取，或是基於真實市場數據進行構建。圖表組件的資料屬性在相應的JSON檔案中定義。
