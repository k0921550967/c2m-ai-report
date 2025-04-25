import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import monthlySalesData from '../../data/monthlySalesChartData.json';

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}`;
};

const formatNumber = (num) => {
  return new Intl.NumberFormat('zh-TW').format(num);
};

const MonthlySalesChart = ({ data = monthlySalesData }) => {
  const chartData = useMemo(() => {
    if (!data || data.length === 0) {
      return null;
    }

    // Filter for just the last 2 years of data
    const currentDate = new Date();
    const twoYearsAgo = new Date();
    twoYearsAgo.setFullYear(currentDate.getFullYear() - 2);
    
    // Sort data by date
    const sortedData = [...data]
      .sort((a, b) => new Date(a.DataDateS_bar) - new Date(b.DataDateS_bar))
      .filter(item => new Date(item.DataDateS_bar) >= twoYearsAgo);

    // Find min and max values for scaling
    const salesValues = sortedData.map(item => item.月銷售金額);
    const priceValues = sortedData.map(item => item["Average of Price"]);
    
    const maxSales = Math.max(...salesValues);
    const minSales = 0;
    const maxPrice = Math.ceil(Math.max(...priceValues));
    const minPrice = Math.floor(Math.min(...priceValues));

    // Calculate chart dimensions
    const chartWidth = 950; // Increased width to accommodate legend
    const chartHeight = 400; // Increased height for better spacing
    const plotWidth = 700;
    const plotHeight = 200; // Increased plot height
    const marginLeft = 90; // Increased left margin even more to prevent overlap
    const marginTop = 80; // Increased top margin for data labels
    const marginBottom = 70; // Increased bottom margin for X-axis labels

    // Scale functions for positioning
    const scaleX = (index) => marginLeft + (index / (sortedData.length - 1)) * plotWidth;
    const scaleSales = (value) => marginTop + plotHeight - (value / maxSales) * plotHeight;
    const scalePrice = (value) => marginTop + plotHeight - ((value - minPrice) / (maxPrice - minPrice)) * plotHeight;

    // Generate bars (adjust spacing for 2 years of data)
    const bars = sortedData.map((item, index) => {
      const barHeight = (item.月銷售金額 / maxSales) * plotHeight;
      return {
        month: formatDate(item.DataDateS_bar),
        value: item.月銷售金額,
        barHeight: barHeight,
        barY: marginTop + plotHeight - barHeight,
        x: scaleX(index),
        showLabel: index % 3 === 0 || index === sortedData.length - 1
      };
    });

    // Create line path for average price
    const pricePoints = sortedData.map((item, index) => ({
      month: formatDate(item.DataDateS_bar),
      value: item["Average of Price"],
      x: scaleX(index),
      y: scalePrice(item["Average of Price"]),
      showLabel: index % 4 === 0 || index === sortedData.length - 1
    }));

    let pathData = '';
    pricePoints.forEach((point, index) => {
      pathData += index === 0 ? `M${point.x},${point.y}` : ` L${point.x},${point.y}`;
    });

    // Generate X axis labels (more frequent for 2 years of data)
    const xAxisLabels = [];
    sortedData.forEach((item, index) => {
      if (index % 3 === 0 || index === sortedData.length - 1) {
        xAxisLabels.push({
          text: formatDate(item.DataDateS_bar),
          x: scaleX(index)
        });
      }
    });

    // Generate Y axis labels for sales
    const yAxisLeftLabels = [];
    const ySteps = 5;
    for (let i = 0; i <= ySteps; i++) {
      const value = Math.round((maxSales / ySteps) * i);
      let label = '';
      if (value >= 1000000) {
        label = `${Math.round(value / 1000000)}M`;
      } else if (value >= 1000) {
        label = `${Math.round(value / 1000)}K`;
      } else {
        label = `${value}`;
      }
      yAxisLeftLabels.push({
        text: label,
        y: marginTop + plotHeight - (i * plotHeight / ySteps)
      });
    }

    // Generate Y axis labels for price
    const yAxisRightLabels = [];
    const priceStep = (maxPrice - minPrice) / 4;
    for (let i = 0; i <= 4; i++) {
      yAxisRightLabels.push({
        text: (Math.round((minPrice + priceStep * i) * 100) / 100).toFixed(2),
        y: marginTop + plotHeight - (i * plotHeight / 4)
      });
    }

    // Selected sales values to display (to avoid overcrowding)
    const displayedSalesValues = [];
    sortedData.forEach((item, index) => {
      if (index % 6 === 0 || index === sortedData.length - 1 || item.月銷售金額 === maxSales) {
        displayedSalesValues.push({
          month: formatDate(item.DataDateS_bar),
          value: formatNumber(item.月銷售金額),
          x: scaleX(index),
          y: scaleSales(item.月銷售金額) - 15 // Increased spacing above bars
        });
      }
    });

    // Legend settings
    const legendX = marginLeft + plotWidth + 60; // Moved further to the right
    const legendY = marginTop;
    const legendWidth = 130; // Slightly wider for better proportions
    const legendHeight = 130; // Slightly taller for better proportions

    return {
      title: "六角扳手(Hex Key Wrench) 月銷售與單價趨勢",
      subtitle: "2022-2024 趨勢分析",
      yAxisRightLabels,
      yAxisLeftLabels,
      xAxisLabels,
      plotBottom: marginTop + plotHeight, // Bottom of plot area
      plotLeft: marginLeft, // Left of plot area
      plotWidth: plotWidth,
      plotHeight: plotHeight,
      unitLabel: "單位：元",
      monthlySales: bars,
      displayedSalesValues,
      averagePricePoints: pricePoints,
      averagePricePathData: pathData,
      legend: {
        x: legendX,
        y: legendY,
        width: legendWidth,
        height: legendHeight
      }
    };
  }, [data]);

  if (!chartData) {
    return <div>No monthly sales data available</div>;
  }

  return (
    <svg width="950" height="400" viewBox="0 0 950 400">
      <defs>
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="1" stdDeviation="2" floodOpacity="0.3" />
        </filter>
      </defs>
      
      <text x="400" y="30" textAnchor="middle" fontSize="16" fontWeight="bold">{chartData.title}</text>
      <text x="400" y="50" textAnchor="middle" fontSize="12">{chartData.subtitle}</text>
      
      {/* 背景 */}
      <rect x={chartData.plotLeft} y={chartData.plotBottom - chartData.plotHeight} 
            width={chartData.plotWidth} height={chartData.plotHeight} fill="#f8fafc" />
      
      {/* 座標軸 */}
      <line x1={chartData.plotLeft} y1={chartData.plotBottom} 
            x2={chartData.plotLeft + chartData.plotWidth} y2={chartData.plotBottom} 
            stroke="#333" strokeWidth="2" />
      <line x1={chartData.plotLeft} y1={chartData.plotBottom} 
            x2={chartData.plotLeft} y2={chartData.plotBottom - chartData.plotHeight} 
            stroke="#333" strokeWidth="2" />
      
      {/* Y軸水平參考線 */}
      {chartData.yAxisLeftLabels.slice(1).map((label, index) => (
        <line 
          key={`grid-y-${index}`}
          x1={chartData.plotLeft}
          y1={label.y}
          x2={chartData.plotLeft + chartData.plotWidth}
          y2={label.y}
          stroke="#e2e8f0"
          strokeWidth="1"
          strokeDasharray="4,4"
        />
      ))}
      
      {/* Y軸右側標籤 - 平均單價 */}
      {chartData.yAxisRightLabels.map((label, index) => (
        <text 
          key={`right-y-${index}`} 
          x={chartData.plotLeft + chartData.plotWidth + 10} 
          y={label.y + 4} // Adjusted for text alignment
          textAnchor="start" 
          fontSize="11"
          fill="#E53E3E"
        >
          ${label.text}
        </text>
      ))}
      
      {/* Y軸左側標籤 - 銷售額 */}
      {chartData.yAxisLeftLabels.map((label, index) => (
        <text 
          key={`left-y-${index}`} 
          x={chartData.plotLeft - 15} 
          y={label.y + 4} // Adjusted for text alignment
          textAnchor="end" 
          fontSize="11"
          fill="#4299E1"
        >
          {label.text}
        </text>
      ))}
      
      {/* 月份柱狀圖 */}
      {chartData.monthlySales.map((item, index) => (
        <rect 
          key={`bar-${index}`} 
          x={item.x - 7} 
          y={item.barY} 
          width="14" 
          height={item.barHeight} 
          fill="#4299E1" 
          fillOpacity="0.7"
        />
      ))}
      
      {/* 銷售額數據標籤 - 只顯示部分代表性數據 */}
      {chartData.displayedSalesValues.map((item, index) => (
        <text 
          key={`sales-label-${index}`} 
          x={item.x} 
          y={item.y} 
          textAnchor="middle" 
          fontSize="9" 
          fill="#4299E1"
          transform={`rotate(-65, ${item.x}, ${item.y})`}
        >
          {item.value}
        </text>
      ))}
      
      {/* 平均單價折線 */}
      <path 
        d={chartData.averagePricePathData}
        fill="none" 
        stroke="#E53E3E" 
        strokeWidth="2" 
      />
      
      {/* 平均單價點 */}
      {chartData.averagePricePoints.filter(point => point.showLabel).map((point, index) => (
        <React.Fragment key={`price-point-${index}`}>
          <circle cx={point.x} cy={point.y} r="3" fill="#E53E3E" />
          <text 
            x={point.x} 
            y={point.y - 10} // Increased spacing above price point
            textAnchor="middle"
            fontSize="9"
            fill="#E53E3E"
          >
            ${point.value}
          </text>
        </React.Fragment>
      ))}
      
      {/* X軸月份標籤 */}
      {chartData.xAxisLabels.map((label, index) => (
        <text 
          key={`x-label-${index}`} 
          x={label.x} 
          y={chartData.plotBottom + 20} // Increased spacing below X-axis
          textAnchor="middle" 
          fontSize="10"
        >
          {label.text}
        </text>
      ))}
      
      {/* 底部單位標籤 */}
      <text 
        x={chartData.plotLeft + chartData.plotWidth} 
        y={chartData.plotBottom + 50} // Positioned below X-axis labels
        textAnchor="end" 
        fontSize="11" 
        fontWeight="bold"
      >
        {chartData.unitLabel}
      </text>
      
      {/* 右側圖例 */}
      <g>
        {/* 圖例背景框 */}
        <rect 
          x={chartData.legend.x} 
          y={chartData.legend.y} 
          width={chartData.legend.width} 
          height={chartData.legend.height} 
          fill="white" 
          stroke="#ddd" 
          strokeWidth="1" 
          filter="url(#shadow)" 
          rx="4"
        />
        
        {/* 圖例標題 */}
        <text 
          x={chartData.legend.x + chartData.legend.width/2} 
          y={chartData.legend.y + 25} 
          textAnchor="middle" 
          fontSize="12" 
          fontWeight="bold"
        >
          數據指標說明
        </text>
        
        {/* 銷售額指標 */}
        <rect 
          x={chartData.legend.x + 20} 
          y={chartData.legend.y + 45} 
          width="14" 
          height="15" 
          fill="#4299E1" 
          fillOpacity="0.7"
        />
        <text 
          x={chartData.legend.x + chartData.legend.width/2 + 10} 
          y={chartData.legend.y + 55} 
          textAnchor="middle" 
          fontSize="11" 
          fill="#4299E1" 
          fontWeight="bold"
        >
          月銷售金額
        </text>
        
        {/* 價格指標 */}
        <line 
          x1={chartData.legend.x + 15} 
          y1={chartData.legend.y + 85} 
          x2={chartData.legend.x + 35} 
          y2={chartData.legend.y + 85} 
          stroke="#E53E3E" 
          strokeWidth="2"
        />
        <circle 
          cx={chartData.legend.x + 25} 
          cy={chartData.legend.y + 85} 
          r="3" 
          fill="#E53E3E"
        />
        <text 
          x={chartData.legend.x + chartData.legend.width/2 + 10} 
          y={chartData.legend.y + 90} 
          textAnchor="middle" 
          fontSize="11" 
          fill="#E53E3E" 
          fontWeight="bold"
        >
          平均單價
        </text>
      </g>
    </svg>
  );
};

MonthlySalesChart.propTypes = {
  data: PropTypes.array
};

export default MonthlySalesChart; 