import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import priceRangeData from '../../data/priceRangeChartData.json';

const PriceRangeChart = ({ data }) => {
  // 使用傳入的數據或默認使用 priceRangeData
  const chartData = data || priceRangeData;
  
  // 動態計算圖表尺寸和邊距
  const chartDimensions = useMemo(() => {
    const dimensions = {
      width: 1300,  // 最大化整體寬度
      height: 400,
      margin: {
        top: 50,
        right: 400,  // 極大化右側邊距
        bottom: 100, 
        left: 100    
      }
    };
    
    dimensions.plotWidth = dimensions.width - dimensions.margin.left - dimensions.margin.right;
    dimensions.plotHeight = dimensions.height - dimensions.margin.top - dimensions.margin.bottom;
    
    return dimensions;
  }, []);
  
  // 計算數據的範圍並創建座標軸
  const chartScales = useMemo(() => {
    if (!chartData || chartData.length === 0) {
      return null;
    }
    
    // 找出銷售額和評價數的最大值
    const maxSales = Math.max(...chartData.map(d => d['總銷售金額']));
    const maxReviews = Math.max(...chartData.map(d => d['評價數']));
    
    // 向上取整到更整齊的數字
    const salesMax = Math.ceil(maxSales / 1000000) * 1000000;
    const reviewsMax = Math.ceil(maxReviews / 5000) * 5000;
    
    // 生成銷售額和評價數的Y軸標籤
    const salesLabels = [];
    const step = salesMax / 5;
    for (let i = 0; i <= 5; i++) {
      const value = Math.round(i * step);
      const y = chartDimensions.margin.top + chartDimensions.plotHeight - 
                (i * chartDimensions.plotHeight / 5);
      salesLabels.push({
        value: new Intl.NumberFormat('zh-TW').format(value),
        y
      });
    }
    
    // 生成評價數的Y軸標籤 (右側Y軸)
    const reviewLabels = [];
    const reviewStep = reviewsMax / 5;
    for (let i = 0; i <= 5; i++) {
      const value = Math.round(i * reviewStep);
      const y = chartDimensions.margin.top + chartDimensions.plotHeight - 
                (i * chartDimensions.plotHeight / 5);
      reviewLabels.push({
        value: new Intl.NumberFormat('zh-TW').format(value),
        y
      });
    }
    
    return { 
      salesMax, 
      reviewsMax, 
      salesLabels, 
      reviewLabels 
    };
  }, [chartData, chartDimensions]);
  
  // 計算每個價格區間的柱狀圖和點位置
  const chartElements = useMemo(() => {
    if (!chartData || chartData.length === 0 || !chartScales) {
      return null;
    }
    
    const barWidth = chartDimensions.plotWidth / (chartData.length * 2);
    const priceRanges = [];
    const trendPoints = [];
    
    chartData.forEach((item, index) => {
      const x = chartDimensions.margin.left + index * (chartDimensions.plotWidth / chartData.length) + barWidth;
      
      // 計算銷售額柱狀圖的高度和位置
      const salesHeight = (item['總銷售金額'] / chartScales.salesMax) * chartDimensions.plotHeight;
      const salesY = chartDimensions.margin.top + chartDimensions.plotHeight - salesHeight;
      
      // 計算評價數點的位置
      const reviewY = chartDimensions.margin.top + chartDimensions.plotHeight - 
                     (item['評價數'] / chartScales.reviewsMax) * chartDimensions.plotHeight;
      
      priceRanges.push({
        range: item['1.價格區間all'].trim(),
        salesAmount: item['總銷售金額'],
        y: salesY,
        height: salesHeight,
        x: x,
        displayValue: new Intl.NumberFormat('zh-TW').format(item['總銷售金額'])
      });
      
      trendPoints.push({
        x: x + barWidth / 2,
        y: reviewY,
        reviews: item['評價數']
      });
    });
    
    // 構建評價數趨勢線路徑
    let trendPath = '';
    if (trendPoints.length > 0) {
      trendPath = `M${trendPoints[0].x} ${trendPoints[0].y}`;
      for (let i = 1; i < trendPoints.length; i++) {
        trendPath += ` L${trendPoints[i].x} ${trendPoints[i].y}`;
      }
    }
    
    return { priceRanges, trendPoints, trendPath };
  }, [chartData, chartScales, chartDimensions]);
  
  if (!chartData || chartData.length === 0 || !chartScales || !chartElements) {
    return <div>No price range data available</div>;
  }
  
  // 提取X軸標籤
  const xAxisLabels = chartData.map(item => item['1.價格區間all'].trim());
  
  // 計算圖例的位置 - 確保完全不會重疊
  const legendX = chartDimensions.margin.left + chartDimensions.plotWidth + 200;
  const legendY = chartDimensions.margin.top;
  const legendWidth = 130;
  const legendHeight = 100;
  
  return (
    <svg width={chartDimensions.width} height={chartDimensions.height} viewBox={`0 0 ${chartDimensions.width} ${chartDimensions.height}`}>
      <defs>
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="1" stdDeviation="2" floodOpacity="0.2" />
        </filter>
      </defs>
      
      {/* 背景與主座標軸 */}
      <rect 
        x={chartDimensions.margin.left} 
        y={chartDimensions.margin.top} 
        width={chartDimensions.plotWidth} 
        height={chartDimensions.plotHeight} 
        fill="#F8FAFC" 
        fillOpacity="0.6" 
        rx="4" 
      />
      
      {/* 左側Y軸 (銷售額) */}
      <line 
        x1={chartDimensions.margin.left} 
        y1={chartDimensions.margin.top} 
        x2={chartDimensions.margin.left} 
        y2={chartDimensions.margin.top + chartDimensions.plotHeight} 
        stroke="#333" 
        strokeWidth="2" 
      />
      
      {/* 右側Y軸 (評價數) */}
      <line 
        x1={chartDimensions.margin.left + chartDimensions.plotWidth} 
        y1={chartDimensions.margin.top} 
        x2={chartDimensions.margin.left + chartDimensions.plotWidth} 
        y2={chartDimensions.margin.top + chartDimensions.plotHeight} 
        stroke="#7E22CE" 
        strokeWidth="2" 
      />
      
      {/* X軸 */}
      <line 
        x1={chartDimensions.margin.left} 
        y1={chartDimensions.margin.top + chartDimensions.plotHeight} 
        x2={chartDimensions.margin.left + chartDimensions.plotWidth} 
        y2={chartDimensions.margin.top + chartDimensions.plotHeight} 
        stroke="#333" 
        strokeWidth="2" 
      />
      
      {/* 參考線 */}
      {chartScales.salesLabels.map((label, i) => {
        if (i > 0) {
          return (
            <line 
              key={`grid-${i}`}
              x1={chartDimensions.margin.left} 
              y1={label.y} 
              x2={chartDimensions.margin.left + chartDimensions.plotWidth} 
              y2={label.y} 
              stroke="#CBD5E0" 
              strokeWidth="1" 
              strokeDasharray="5,5" 
            />
          );
        }
        return null;
      })}
      
      {/* X軸標籤 */}
      <text 
        x={chartDimensions.margin.left + chartDimensions.plotWidth / 2} 
        y={chartDimensions.height - 20} // 調整位置確保不會與區間標籤重疊
        textAnchor="middle" 
        fontSize="16" 
        fontWeight="bold"
      >
        價格區間 (美元)
      </text>
      
      {/* X軸的價格區間標籤 - 做成可視空間動態調整的斜角標籤 */}
      {xAxisLabels.map((label, index) => {
        const x = chartDimensions.margin.left + 
                 index * (chartDimensions.plotWidth / chartData.length) + 
                 (chartDimensions.plotWidth / (chartData.length * 2));
        
        // 動態計算標籤角度：根據標籤數量和長度調整
        const spacing = chartDimensions.plotWidth / chartData.length;
        const rotation = spacing < 80 ? -45 : 0; // 當空間不足時增加旋轉角度
        const dy = rotation !== 0 ? "0.5em" : "1.5em";
        
        return (
          <text 
            key={`x-label-${index}`} 
            x={x} 
            y={chartDimensions.margin.top + chartDimensions.plotHeight} 
            textAnchor={rotation !== 0 ? "end" : "middle"}
            dominantBaseline="central"
            fontSize="12"
            transform={rotation !== 0 ? `rotate(${rotation}, ${x}, ${chartDimensions.margin.top + chartDimensions.plotHeight})` : ""}
            dy={dy}
          >
            {label}
          </text>
        );
      })}
      
      {/* 左側Y軸標籤 (銷售額) */}
      <text 
        x={20} 
        y={chartDimensions.margin.top + chartDimensions.plotHeight / 2} 
        textAnchor="middle" 
        fontSize="16" 
        fontWeight="bold" 
        transform={`rotate(-90, 20, ${chartDimensions.margin.top + chartDimensions.plotHeight / 2})`}
      >
        銷售額
      </text>
      
      {chartScales.salesLabels.map((label) => (
        <text 
          key={`y-label-${label.value}`} 
          x={chartDimensions.margin.left - 15} // 增加距離防止重疊
          y={label.y} 
          textAnchor="end" 
          fontSize="12"
          dominantBaseline="middle"
        >
          {label.value}
        </text>
      ))}
      
      {/* 右側Y軸標籤 (評價數) */}
      <text 
        x={chartDimensions.margin.left + chartDimensions.plotWidth + 40} // 靠近Y軸
        y={chartDimensions.margin.top + chartDimensions.plotHeight / 2} 
        textAnchor="middle" 
        fontSize="16" 
        fontWeight="bold" 
        fill="#7E22CE"
        transform={`rotate(90, ${chartDimensions.margin.left + chartDimensions.plotWidth + 40}, ${chartDimensions.margin.top + chartDimensions.plotHeight / 2})`}
      >
        評價數
      </text>
      
      {chartScales.reviewLabels.map((label) => (
        <text 
          key={`review-label-${label.value}`} 
          x={chartDimensions.margin.left + chartDimensions.plotWidth + 25} 
          y={label.y} 
          textAnchor="start" 
          fontSize="12"
          dominantBaseline="middle"
          fill="#7E22CE"
        >
          {label.value}
        </text>
      ))}
      
      {/* 銷售額柱狀圖 */}
      {chartElements.priceRanges.map((range, index) => (
        <React.Fragment key={`price-range-${index}`}>
          <rect 
            x={range.x} 
            y={range.y} 
            width={chartDimensions.plotWidth / (chartData.length * 2.5)} 
            height={range.height} 
            fill="#F59E0B" 
            fillOpacity="0.85"
            filter="url(#shadow)"
          />
          <text 
            x={range.x + (chartDimensions.plotWidth / (chartData.length * 5))} 
            y={range.y - 8} 
            textAnchor="middle" 
            fontSize="12" 
            fontWeight="bold"
          >
            {range.displayValue}
          </text>
        </React.Fragment>
      ))}
      
      {/* 評價數趨勢線 */}
      <path d={chartElements.trendPath} fill="none" stroke="#7E22CE" strokeWidth="3" />
      
      {/* 評價數點 */}
      {chartElements.trendPoints.map((point, index) => (
        <g key={`trend-point-${index}`}>
          <circle 
            cx={point.x} 
            cy={point.y} 
            r="6" 
            fill="#7E22CE" 
            fillOpacity="0.85"
          />
          <text 
            x={point.x} 
            y={point.y - 12} 
            textAnchor="middle" 
            fontSize="11"
            fontWeight="bold"
            fill="#7E22CE"
          >
            {new Intl.NumberFormat('zh-TW').format(point.reviews)}
          </text>
        </g>
      ))}
      
      {/* 圖例 - 確保完全不會重疊 */}
      <g>
        <rect 
          x={legendX} 
          y={legendY} 
          width={legendWidth} 
          height={legendHeight} 
          fill="white" 
          stroke="#ddd" 
          strokeWidth="1" 
          rx="4"
          filter="url(#shadow)"
        />
        
        {/* 圖例標題 */}
        <text 
          x={legendX + legendWidth/2} 
          y={legendY + 25} 
          textAnchor="middle" 
          fontSize="14" 
          fontWeight="bold"
        >
          圖例
        </text>
        
        {/* 銷售額圖例 - 置中 */}
        <g transform={`translate(${legendX + legendWidth/2}, ${legendY + 45})`}>
          <rect x="-30" y="-8" width="16" height="16" fill="#F59E0B" fillOpacity="0.85" />
          <text x="0" y="0" fontSize="14" textAnchor="middle">銷售額</text>
        </g>
        
        {/* 評價數圖例 - 置中 */}
        <g transform={`translate(${legendX + legendWidth/2}, ${legendY + 75})`}>
          <line x1="-30" y1="0" x2="-14" y2="0" stroke="#7E22CE" strokeWidth="3" />
          <circle cx="-22" cy="0" r="5" fill="#7E22CE" />
          <text x="0" y="0" fontSize="14" fill="#7E22CE" textAnchor="middle">評價數</text>
        </g>
      </g>
    </svg>
  );
};

PriceRangeChart.propTypes = {
  data: PropTypes.array
};

PriceRangeChart.defaultProps = {
  data: null
};

export default PriceRangeChart; 