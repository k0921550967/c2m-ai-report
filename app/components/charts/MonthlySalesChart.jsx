import React from 'react';
import PropTypes from 'prop-types';

const MonthlySalesChart = ({ data }) => {
  if (!data) {
    return <div>No monthly sales data available</div>;
  }

  return (
    <svg width="800" height="320" viewBox="0 0 800 320">
      <text x="400" y="30" textAnchor="middle" fontSize="16" fontWeight="bold">{data.title}</text>
      <text x="400" y="50" textAnchor="middle" fontSize="12">{data.subtitle}</text>
      
      {/* 背景 */}
      <rect x="50" y="60" width="700" height="190" fill="#f8fafc" />
      
      {/* 座標軸 */}
      <line x1="50" y1="250" x2="750" y2="250" stroke="#333" strokeWidth="2" />
      <line x1="50" y1="250" x2="50" y2="60" stroke="#333" strokeWidth="2" />
      
      {/* Y軸右側標籤 - 平均單價 */}
      {data.yAxisRightLabels.map((label, index) => (
        <text 
          key={`right-y-${index}`} 
          x="760" 
          y={70 + 40 * index} 
          textAnchor="start" 
          fontSize="11"
        >
          {label}
        </text>
      ))}
      
      {/* Y軸左側標籤 - 銷售額 */}
      {data.yAxisLeftLabels.map((label, index) => (
        <text 
          key={`left-y-${index}`} 
          x="45" 
          y={70 + 36 * index} 
          textAnchor="end" 
          fontSize="11"
        >
          {label}
        </text>
      ))}
      
      {/* 月份柱狀圖 */}
      {data.monthlySales.map((item, index) => (
        <rect 
          key={`bar-${index}`} 
          x={60 + index * 20} 
          y={item.barY} 
          width="14" 
          height={item.barHeight} 
          fill="#4299E1" 
        />
      ))}
      
      {/* 銷售額數據標籤 - 只顯示部分代表性數據 */}
      {data.displayedSalesValues.map((item, index) => (
        <text 
          key={`sales-label-${index}`} 
          x={item.x} 
          y={item.y} 
          textAnchor="middle" 
          fontSize="9" 
          transform={`rotate(-90, ${item.x}, ${item.y})`}
        >
          {item.value}
        </text>
      ))}
      
      {/* 平均單價折線 */}
      <path 
        d={data.averagePricePathData}
        fill="none" 
        stroke="#E53E3E" 
        strokeWidth="2" 
      />
      
      {/* 平均單價點 */}
      {data.averagePricePoints.map((point, index) => (
        <React.Fragment key={`price-point-${index}`}>
          <circle cx={point.x} cy={point.y} r="3" fill="#E53E3E" />
          <text x={point.x} y={point.y - 5} fontSize="9">{point.value}</text>
        </React.Fragment>
      ))}
      
      {/* X軸月份標籤 */}
      {data.xAxisLabels.map((month, index) => (
        <text 
          key={`x-label-${index}`} 
          x={67 + index * 100} 
          y="270" 
          textAnchor="middle" 
          fontSize="9"
        >
          {month}
        </text>
      ))}
      
      {/* 底部單位標籤 */}
      <text x="750" y="290" textAnchor="end" fontSize="11" fontWeight="bold">{data.unitLabel}</text>
    </svg>
  );
};

MonthlySalesChart.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    yAxisRightLabels: PropTypes.arrayOf(PropTypes.number).isRequired,
    yAxisLeftLabels: PropTypes.arrayOf(PropTypes.string).isRequired,
    xAxisLabels: PropTypes.arrayOf(PropTypes.string).isRequired,
    unitLabel: PropTypes.string.isRequired,
    monthlySales: PropTypes.arrayOf(
      PropTypes.shape({
        month: PropTypes.string.isRequired,
        value: PropTypes.number.isRequired,
        barHeight: PropTypes.number.isRequired,
        barY: PropTypes.number.isRequired
      })
    ).isRequired,
    displayedSalesValues: PropTypes.arrayOf(
      PropTypes.shape({
        month: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired
      })
    ).isRequired,
    averagePricePoints: PropTypes.arrayOf(
      PropTypes.shape({
        month: PropTypes.string.isRequired,
        value: PropTypes.number.isRequired,
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired
      })
    ).isRequired,
    averagePricePathData: PropTypes.string.isRequired
  })
};

MonthlySalesChart.defaultProps = {
  data: null
};

export default MonthlySalesChart; 