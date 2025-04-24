import React from 'react';
import PropTypes from 'prop-types';

const PriceRangeChart = ({ data }) => {
  if (!data) {
    return <div>No price range data available</div>;
  }

  return (
    <svg width="800" height="340" viewBox="0 0 800 340">
      {/* 座標軸 */}
      <line x1="70" y1="250" x2="750" y2="250" stroke="#333" strokeWidth="2" />
      <line x1="70" y1="250" x2="70" y2="50" stroke="#333" strokeWidth="2" />
      
      {/* X軸標籤 */}
      <text x="400" y="310" textAnchor="middle" fontSize="14" fontWeight="bold">{data.xAxisTitle}</text>
      {data.xAxisLabels.map((label, index) => (
        <text 
          key={`x-label-${index}`} 
          x={85 + index * 75} 
          y="280" 
          textAnchor="middle" 
          fontSize="10"
        >
          {label}
        </text>
      ))}
      
      {/* Y軸標籤 */}
      <text x="25" y="150" textAnchor="middle" fontSize="14" fontWeight="bold" transform="rotate(-90, 25, 150)">{data.yAxisTitle}</text>
      {data.yAxisLabels.map((label) => (
        <text 
          key={`y-label-${label.value}`} 
          x="60" 
          y={label.y} 
          textAnchor="end" 
          fontSize="10"
        >
          {label.value}
        </text>
      ))}
      
      {/* 銷售額柱狀圖 */}
      {data.priceRanges.map((range, index) => (
        <React.Fragment key={`price-range-${index}`}>
          <rect 
            x={range.x} 
            y={range.y} 
            width="25" 
            height={range.height} 
            fill="#F59E0B" 
          />
          <text 
            x={range.x + 12.5} 
            y={range.y - 5} 
            textAnchor="middle" 
            fontSize="10" 
            fontWeight="bold"
          >
            {range.displayValue}
          </text>
        </React.Fragment>
      ))}
      
      {/* 趨勢線 */}
      <path d={data.trendPath} fill="none" stroke="#7E22CE" strokeWidth="3" />
      
      {/* 圖例 */}
      <rect x="580" y="80" width="150" height="70" fill="white" stroke="#ddd" />
      {data.legendItems.map((item, index) => (
        <React.Fragment key={`legend-${index}`}>
          {item.type === 'rect' && (
            <rect x="590" y={95 + index * 30} width="20" height="10" fill={item.color} />
          )}
          {item.type === 'line' && (
            <line x1="590" y1={125 + (index - 1) * 30} x2="610" y2={125 + (index - 1) * 30} stroke={item.color} strokeWidth="3" />
          )}
          <text x="620" y={105 + index * 25} fontSize="12">{item.label}</text>
        </React.Fragment>
      ))}
    </svg>
  );
};

PriceRangeChart.propTypes = {
  data: PropTypes.shape({
    xAxisTitle: PropTypes.string.isRequired,
    yAxisTitle: PropTypes.string.isRequired,
    xAxisLabels: PropTypes.arrayOf(PropTypes.string).isRequired,
    yAxisLabels: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.string.isRequired,
        y: PropTypes.number.isRequired
      })
    ).isRequired,
    priceRanges: PropTypes.arrayOf(
      PropTypes.shape({
        range: PropTypes.string.isRequired,
        salesAmount: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired,
        x: PropTypes.number.isRequired,
        displayValue: PropTypes.string.isRequired
      })
    ).isRequired,
    trendPath: PropTypes.string.isRequired,
    legendItems: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        color: PropTypes.string.isRequired,
        type: PropTypes.oneOf(['rect', 'line']).isRequired
      })
    ).isRequired
  })
};

PriceRangeChart.defaultProps = {
  data: null
};

export default PriceRangeChart; 