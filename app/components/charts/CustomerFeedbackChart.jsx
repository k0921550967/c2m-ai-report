import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import customerFeedbackData from '../../data/customerFeedbackChartData.json';

const CustomerFeedbackChart = ({ data = customerFeedbackData }) => {
  const chartData = useMemo(() => {
    if (!data || data.length === 0) {
      return null;
    }

    // Group data by opinion items
    const groupedData = {};
    data.forEach(item => {
      const opinion = item.opinion_items;
      const isPositive = typeof item.result_sortings === 'string' 
        ? item.result_sortings.includes('positive') || item.result_sortings.includes('1.positive')
        : false;
      
      if (!groupedData[opinion]) {
        groupedData[opinion] = {
          category: opinion,
          positiveCount: 0,
          negativeCount: 0
        };
      }
      
      if (isPositive) {
        groupedData[opinion].positiveCount = item["Count of result"];
      } else {
        groupedData[opinion].negativeCount = item["Count of result"];
      }
    });

    // Transform to array and sort by total count
    const opinionsArray = Object.values(groupedData)
      .map(item => ({
        ...item,
        totalCount: item.positiveCount + item.negativeCount
      }))
      .sort((a, b) => b.totalCount - a.totalCount);

    // Chart dimensions
    const chartWidth = 950;
    const chartHeight = 400;
    const plotWidth = 800;
    const plotHeight = 250;
    const marginLeft = 80;
    const marginTop = 80;
    const marginBottom = 100;
    const barWidth = 40;
    const barGap = 40;

    // Calculate max count for scaling
    const maxTotalCount = Math.max(
      ...opinionsArray.map(item => item.totalCount)
    );
    
    // Scale function for heights
    const scaleHeight = (value) => (value / maxTotalCount) * plotHeight;

    // Generate bar positions and sizes
    const categories = opinionsArray.map((item, index) => {
      const x = marginLeft + 40 + index * (barWidth + barGap);
      const totalHeight = scaleHeight(item.totalCount);
      const positiveHeight = scaleHeight(item.positiveCount);
      const negativeHeight = scaleHeight(item.negativeCount);
      
      return {
        ...item,
        x: x,
        barX: x - barWidth/2,
        width: barWidth,
        totalHeight,
        positiveHeight,
        negativeHeight,
        positiveY: marginTop + plotHeight - positiveHeight,
        negativeY: marginTop + plotHeight - totalHeight,
      };
    });

    // Generate Y-axis labels
    const yLabels = [];
    const steps = 7;
    const stepSize = Math.ceil(maxTotalCount / steps / 100) * 100;

    for (let i = 0; i <= steps; i++) {
      const value = i * stepSize;
      yLabels.push({
        value: value.toLocaleString(),
        y: marginTop + plotHeight - (i * stepSize / maxTotalCount) * plotHeight
      });
    }

    // Legend settings
    const legendX = marginLeft + plotWidth;
    const legendY = marginTop;
    const legendWidth = 100;
    const legendHeight = 70;

    return {
      title: "正負評論數",
      subtitle: "",
      yAxisLabels: yLabels,
      categories,
      plotLeft: marginLeft,
      plotTop: marginTop,
      plotWidth,
      plotHeight,
      plotBottom: marginTop + plotHeight,
      legend: {
        x: legendX,
        y: legendY,
        width: legendWidth,
        height: legendHeight
      }
    };
  }, [data]);

  if (!chartData) {
    return <div>No customer feedback data available</div>;
  }

  return (
    <svg width="950" height="400" viewBox="0 0 950 400">
      {/* Chart title */}
      <text x="475" y="30" textAnchor="middle" fontSize="18" fontWeight="bold">{chartData.title}</text>
      
      {/* X and Y axes */}
      <line 
        x1={chartData.plotLeft} 
        y1={chartData.plotBottom} 
        x2={chartData.plotLeft + chartData.plotWidth} 
        y2={chartData.plotBottom} 
        stroke="#333" 
        strokeWidth="1" 
      />
      
      {/* Y-axis labels and grid lines */}
      {chartData.yAxisLabels.map((label, index) => (
        <React.Fragment key={`y-label-${index}`}>
          <text 
            x={chartData.plotLeft - 10} 
            y={label.y + 4} 
            textAnchor="end" 
            fontSize="11"
          >
            {label.value}
          </text>
          {index > 0 && (
            <line 
              x1={chartData.plotLeft} 
              y1={label.y} 
              x2={chartData.plotLeft + chartData.plotWidth} 
              y2={label.y} 
              stroke="#e5e5e5" 
              strokeDasharray="3,3" 
            />
          )}
        </React.Fragment>
      ))}
      
      {/* Legend */}
      <text x={chartData.plotLeft + 20} y={chartData.plotTop - 40} fontSize="12" fill="#4CB5AE" fontWeight="bold">• 正評</text>
      <text x={chartData.plotLeft + 100} y={chartData.plotTop - 40} fontSize="12" fill="#E53E3E" fontWeight="bold">• 負評</text>
      
      {/* Bars */}
      {chartData.categories.map((category, index) => (
        <React.Fragment key={`category-${index}`}>
          {/* Positive bar (bottom part) */}
          <rect 
            x={category.barX} 
            y={category.positiveY} 
            width={category.width} 
            height={category.positiveHeight} 
            fill="#4CB5AE" 
          />
          
          {/* Negative bar (top part) */}
          <rect 
            x={category.barX} 
            y={category.negativeY} 
            width={category.width} 
            height={category.negativeHeight} 
            fill="#E53E3E" 
          />
          
          {/* Bar labels */}
          {category.positiveHeight > 25 && (
            <text 
              x={category.x} 
              y={category.positiveY + category.positiveHeight/2 + 5} 
              textAnchor="middle" 
              fontSize="12" 
              fill="white" 
              fontWeight="bold"
            >
              {category.positiveCount}
            </text>
          )}
          
          {category.negativeHeight > 25 && (
            <text 
              x={category.x} 
              y={category.negativeY + category.negativeHeight/2 + 5} 
              textAnchor="middle" 
              fontSize="12" 
              fill="white" 
              fontWeight="bold"
            >
              {category.negativeCount}
            </text>
          )}
          
          {/* Category labels */}
          <text 
            x={category.x} 
            y={chartData.plotBottom + 20} 
            textAnchor="middle" 
            fontSize="11"
            transform={`rotate(30, ${category.x}, ${chartData.plotBottom + 20})`}
          >
            {category.category}
          </text>
        </React.Fragment>
      ))}
    </svg>
  );
};

CustomerFeedbackChart.propTypes = {
  data: PropTypes.array
};

export default CustomerFeedbackChart; 