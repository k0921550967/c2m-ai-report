import React from 'react';
import PropTypes from 'prop-types';
import brandPositionChartData from '../../data/BrandPositionChartData.json';

// 顏色根據價格區間劃分
const getBrandColor = (price, priceRanges) => {
  if (price < priceRanges.low) {
    return "#3182CE"; // 藍色 - 低價位
  } else if (price < priceRanges.medium) {
    return "#805AD5"; // 紫色 - 中價位
  } else {
    return "#E53E3E"; // 紅色 - 高價位
  }
};

// 獲取品牌分類名稱
const getBrandCategoryName = (price, priceRanges) => {
  if (price < priceRanges.low) {
    return "經濟型";
  } else if (price < priceRanges.medium) {
    return "中價位";
  } else {
    return "高端品牌";
  }
};

// 計算氣泡大小 (基於銷售額)
const getBubbleSize = (salesAmount, minSales, maxSales) => {
  // 更保守的氣泡尺寸設定
  const minSize = 10;
  const maxSize = 25; // 大幅減小最大氣泡尺寸，確保不會超出邊界
  
  // 計算相對大小 (線性映射)
  if (maxSales === minSales) return (minSize + maxSize) / 2; // 防止除以零
  const sizeScale = (salesAmount - minSales) / (maxSales - minSales);
  return minSize + sizeScale * (maxSize - minSize);
};

// 找出數據的範圍
const getDataRanges = (data) => {
  // 價格範圍
  const prices = data.map(item => item['平均單價(美元)']);
  const minPrice = Math.floor(Math.min(...prices));
  const maxPrice = Math.ceil(Math.max(...prices));
  
  // 滿意度範圍
  const satisfactions = data.map(item => item['滿意度%']);
  const minSatisfaction = Math.max(0.5, Math.floor(Math.min(...satisfactions) * 10) / 10); // 下限為0.5
  const maxSatisfaction = Math.min(1, Math.ceil(Math.max(...satisfactions) * 10) / 10); // 上限為1
  
  // 銷售額範圍
  const sales = data.map(item => item['平均月銷售金額S']);
  const minSales = Math.min(...sales);
  const maxSales = Math.max(...sales);
  
  // 決定價格區間分界點
  const priceRange = maxPrice - minPrice;
  const priceDivisions = 3; // 我們想要三個價格區間
  const priceIntervalSize = priceRange / priceDivisions;
  
  return {
    price: { min: minPrice, max: maxPrice },
    satisfaction: { min: minSatisfaction, max: maxSatisfaction },
    sales: { min: minSales, max: maxSales },
    priceRanges: {
      low: minPrice + priceIntervalSize,
      medium: minPrice + 2 * priceIntervalSize
    }
  };
};

// 生成適當的X軸標籤
const generateXAxisLabels = (minPrice, maxPrice) => {
  const range = maxPrice - minPrice;
  const stepCount = 5; // 希望有5個標籤
  const stepSize = Math.ceil(range / (stepCount - 1));
  
  const labels = [];
  for (let i = 0; i < stepCount; i++) {
    const value = minPrice + i * stepSize;
    if (value <= maxPrice) {
      labels.push({ position: i / (stepCount - 1), value });
    }
  }
  
  return labels;
};

// 生成適當的Y軸標籤
const generateYAxisLabels = (minSatisfaction, maxSatisfaction) => {
  const satisfactionRange = maxSatisfaction - minSatisfaction;
  const stepCount = 5; // 希望有5個標籤
  const stepSize = satisfactionRange / (stepCount - 1);
  
  const labels = [];
  for (let i = 0; i < stepCount; i++) {
    const value = minSatisfaction + i * stepSize;
    labels.push({ position: 1 - i / (stepCount - 1), value });
  }
  
  return labels;
};

// 品牌類別分組
const groupBrandsByCategory = (data, priceRanges) => {
  const groups = {
    lowPrice: [],   // <低價閾值
    midPrice: [],   // 低價閾值-中價閾值
    highPrice: []   // >中價閾值
  };
  
  data.forEach(brand => {
    const price = brand['平均單價(美元)'];
    
    if (price < priceRanges.low) {
      groups.lowPrice.push(brand);
    } else if (price < priceRanges.medium) {
      groups.midPrice.push(brand);
    } else {
      groups.highPrice.push(brand);
    }
  });
  
  return groups;
};

// 檢查並調整位置，確保氣泡不會超出邊界
const adjustPosition = (x, y, size, bounds) => {
  const { minX, maxX, minY, maxY } = bounds;
  
  // 強制將氣泡定位在安全區域內，考慮氣泡半徑
  const safeMinX = minX + size;
  const safeMaxX = maxX - size;
  const safeMinY = minY + size;
  const safeMaxY = maxY - size;
  
  // 如果安全區域無效（例如，氣泡太大），優先保持在視覺中心
  let adjustedX = x;
  if (safeMinX > safeMaxX) {
    // 極端情況，氣泡太大
    adjustedX = (minX + maxX) / 2;
  } else {
    // 正常情況，確保在安全區域內
    adjustedX = Math.max(safeMinX, Math.min(safeMaxX, x));
  }
  
  let adjustedY = y;
  if (safeMinY > safeMaxY) {
    // 極端情況，氣泡太大
    adjustedY = (minY + maxY) / 2;
  } else {
    // 正常情況，確保在安全區域內
    adjustedY = Math.max(safeMinY, Math.min(safeMaxY, y));
  }
  
  return { x: adjustedX, y: adjustedY };
};

const BrandPositionChart = ({ data }) => {
  const allData = data || brandPositionChartData;
  const targetCategory = "六角扳手(Hex Key Wrench)";
  
  // 過濾出六角扳手類別的數據
  const filteredData = allData.filter(item => item.Category === targetCategory);
  const ranges = getDataRanges(filteredData);
  const brandGroups = groupBrandsByCategory(filteredData, ranges.priceRanges);
  
  // 圖表設定
  const chartWidth = 950; // 增加整體寬度以容納右側圖例
  const chartHeight = 380;
  const plotWidth = 680;
  const plotHeight = 200;
  const plotMarginLeft = 70;
  const plotMarginTop = 50;
  
  // 圖表區域的邊界
  const chartBounds = {
    minX: plotMarginLeft,
    maxX: plotMarginLeft + plotWidth,
    minY: plotMarginTop,
    maxY: plotMarginTop + plotHeight
  };
  
  // X軸標籤
  const xLabels = generateXAxisLabels(ranges.price.min, ranges.price.max);
  
  // Y軸標籤
  const yLabels = generateYAxisLabels(ranges.satisfaction.min, ranges.satisfaction.max);
  
  // 轉換座標函數
  const scaleX = (price) => {
    return plotMarginLeft + (price - ranges.price.min) * plotWidth / (ranges.price.max - ranges.price.min);
  };
  
  const scaleY = (satisfaction) => {
    return plotMarginTop + plotHeight - (satisfaction - ranges.satisfaction.min) * plotHeight / (ranges.satisfaction.max - ranges.satisfaction.min);
  };
  
  // 圖例設置
  const legendX = chartBounds.maxX + 30; // 完全移到XY軸外部
  const legendY = plotMarginTop;
  const legendWidth = 120;
  const legendHeight = 200;
  
  return (
    <svg width={chartWidth} height={chartHeight} viewBox={`0 0 ${chartWidth} ${chartHeight}`}>
      <defs>
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="1" stdDeviation="2" floodOpacity="0.3" />
        </filter>
      </defs>
      
      {/* 圖表標題 */}
      <text 
        x={chartWidth / 2} 
        y="25" 
        textAnchor="middle" 
        fontSize="16" 
        fontWeight="bold"
      >
        六角扳手(Hex Key Wrench) 品牌定位圖
      </text>
      
      {/* 背景與座標軸 */}
      <rect 
        x={chartBounds.minX} 
        y={chartBounds.minY} 
        width={plotWidth} 
        height={plotHeight} 
        fill="#F8FAFC" 
        fillOpacity="0.6" 
        rx="4" 
      />
      <line 
        x1={chartBounds.minX} 
        y1={chartBounds.maxY} 
        x2={chartBounds.maxX} 
        y2={chartBounds.maxY} 
        stroke="#333" 
        strokeWidth="2" 
      />
      <line 
        x1={chartBounds.minX} 
        y1={chartBounds.maxY} 
        x2={chartBounds.minX} 
        y2={chartBounds.minY} 
        stroke="#333" 
        strokeWidth="2" 
      />
      
      {/* 參考線 - 根據標籤動態生成 */}
      {xLabels.map((label, i) => {
        if (i > 0 && i < xLabels.length - 1) {
          const x = plotMarginLeft + label.position * plotWidth;
          return (
            <line 
              key={`xGrid-${i}`}
              x1={x} 
              y1={chartBounds.minY} 
              x2={x} 
              y2={chartBounds.maxY} 
              stroke="#CBD5E0" 
              strokeWidth="1" 
              strokeDasharray="5,5" 
            />
          );
        }
        return null;
      })}
      
      {yLabels.map((label, i) => {
        if (i > 0 && i < yLabels.length - 1) {
          const y = plotMarginTop + label.position * plotHeight;
          return (
            <line 
              key={`yGrid-${i}`}
              x1={chartBounds.minX} 
              y1={y} 
              x2={chartBounds.maxX} 
              y2={y} 
              stroke="#CBD5E0" 
              strokeWidth="1" 
              strokeDasharray="5,5" 
            />
          );
        }
        return null;
      })}
      
      {/* X軸標籤 - 價格 */}
      <text 
        x={plotMarginLeft + plotWidth/2} 
        y={chartBounds.maxY + 60} 
        textAnchor="middle" 
        fontSize="14" 
        fontWeight="bold"
      >
        平均單價 (美元/個)
      </text>
      {xLabels.map((label, i) => (
        <text 
          key={`xLabel-${i}`}
          x={plotMarginLeft + label.position * plotWidth} 
          y={chartBounds.maxY + 30} 
          textAnchor="middle" 
          fontSize="12"
        >
          {Math.round(label.value)}
        </text>
      ))}
      
      {/* Y軸標籤 - 滿意度 */}
      <text 
        x="25" 
        y={plotMarginTop + plotHeight/2} 
        textAnchor="middle" 
        fontSize="14" 
        fontWeight="bold" 
        transform={`rotate(-90, 25, ${plotMarginTop + plotHeight/2})`}
      >
        客戶滿意度 (%)
      </text>
      {yLabels.map((label, i) => (
        <text 
          key={`yLabel-${i}`}
          x="60" 
          y={plotMarginTop + label.position * plotHeight} 
          textAnchor="end" 
          fontSize="12"
        >
          {Math.round(label.value * 100)}%
        </text>
      ))}
      
      {/* 繪製品牌氣泡 */}
      {filteredData.map((brand, index) => {
        const initialX = scaleX(brand['平均單價(美元)']);
        const initialY = scaleY(brand['滿意度%']);
        const size = getBubbleSize(
          brand['平均月銷售金額S'], 
          ranges.sales.min, 
          ranges.sales.max
        );
        const color = getBrandColor(brand['平均單價(美元)'], ranges.priceRanges);
        
        // 調整位置確保氣泡在邊界內
        const { x, y } = adjustPosition(initialX, initialY, size, chartBounds);
        
        return (
          <g key={index}>
            <circle 
              cx={x} 
              cy={y} 
              r={size} 
              fill={color} 
              fillOpacity="0.85" 
              filter="url(#shadow)"
            />
            <text 
              x={x} 
              y={y} 
              textAnchor="middle" 
              fontSize={size > 18 ? 11 : 9} 
              fill="white" 
              fontWeight="bold"
              dominantBaseline="middle"
            >
              {brand.Brand}
            </text>
          </g>
        );
      })}
      
      {/* 圖例 - 完全移到XY軸外部 */}
      <g>
        {/* 圖例背景框 */}
        <rect 
          x={legendX} 
          y={legendY} 
          width={legendWidth} 
          height={legendHeight} 
          fill="white" 
          stroke="#ddd" 
          strokeWidth="1" 
          filter="url(#shadow)" 
          rx="4"
        />
        
        {/* 圖例標題 */}
        <text 
          x={legendX + legendWidth/2} 
          y={legendY + 25} 
          textAnchor="middle" 
          fontSize="12" 
          fontWeight="bold"
        >
          品牌價格區間
        </text>
        
        {/* 低價位品牌 */}
        <circle 
          cx={legendX + 20} 
          cy={legendY + 55} 
          r="8" 
          fill="#3182CE" 
          fillOpacity="0.85"
        />
        <text 
          x={legendX + legendWidth/2 + 10} 
          y={legendY + 55} 
          textAnchor="middle" 
          fontSize="12" 
          fill="#3182CE" 
          fontWeight="bold"
        >
          經濟型
        </text>
        <text 
          x={legendX + legendWidth/2} 
          y={legendY + 70} 
          textAnchor="middle" 
          fontSize="10"
        >
          &lt;{Math.round(ranges.priceRanges.low)}美元
        </text>
        
        {/* 中價位品牌 */}
        <circle 
          cx={legendX + 20} 
          cy={legendY + 95} 
          r="8" 
          fill="#805AD5" 
          fillOpacity="0.85"
        />
        <text 
          x={legendX + legendWidth/2 + 10} 
          y={legendY + 95} 
          textAnchor="middle" 
          fontSize="12" 
          fill="#805AD5" 
          fontWeight="bold"
        >
          中價位
        </text>
        <text 
          x={legendX + legendWidth/2} 
          y={legendY + 110} 
          textAnchor="middle" 
          fontSize="10"
        >
          {Math.round(ranges.priceRanges.low)}-{Math.round(ranges.priceRanges.medium)}美元
        </text>
        
        {/* 高價位品牌 */}
        <circle 
          cx={legendX + 20} 
          cy={legendY + 135} 
          r="8" 
          fill="#E53E3E" 
          fillOpacity="0.85"
        />
        <text 
          x={legendX + legendWidth/2 + 10} 
          y={legendY + 135} 
          textAnchor="middle" 
          fontSize="12" 
          fill="#E53E3E" 
          fontWeight="bold"
        >
          高端品牌
        </text>
        <text 
          x={legendX + legendWidth/2} 
          y={legendY + 150} 
          textAnchor="middle" 
          fontSize="10"
        >
          &gt;{Math.round(ranges.priceRanges.medium)}美元
        </text>
        
        {/* 氣泡大小說明 */}
        <text 
          x={legendX + legendWidth/2} 
          y={legendY + 175} 
          textAnchor="middle" 
          fontSize="11" 
          fontWeight="bold"
        >
          氣泡大小 = 銷售額
        </text>
      </g>
      
      {/* 資料來源標籤 */}
      <text 
        x={chartWidth / 2} 
        y={chartHeight - 15} 
        textAnchor="middle" 
        fontSize="12" 
        fill="#666"
      >
        
      </text>
    </svg>
  );
};

BrandPositionChart.propTypes = {
  data: PropTypes.array
};

BrandPositionChart.defaultProps = {
  data: brandPositionChartData
};

export default BrandPositionChart; 