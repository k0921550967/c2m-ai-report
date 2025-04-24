import React from 'react';
import PropTypes from 'prop-types';

const SmallSpecificationHeatChart = ({ data }) => {
  if (!data) {
    return <div>No small specification heat chart data available</div>;
  }

  return (
    <svg width="800" height="300" viewBox="0 0 800 300">
      {/* 座標軸和標題 */}
      <text x="400" y="30" textAnchor="middle" fontSize="16" fontWeight="bold">{data.title}</text>
      
      {/* 熱圖格式 */}
      <rect x="50" y="50" width="700" height="200" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />
      
      {/* 熱圖區塊 */}
      {data.blocks.map((block) => (
        <React.Fragment key={block.id}>
          <rect 
            x={block.x} 
            y={block.y} 
            width={block.width} 
            height={block.height} 
            fill={block.style.fillColor} 
            fillOpacity={block.style.fillOpacity} 
            stroke={block.style.strokeColor !== 'none' ? block.style.strokeColor : undefined} 
            strokeWidth={block.style.strokeWidth || undefined} 
          />
          <text 
            x={block.x + block.width/2} 
            y={block.y + block.height/2 - 10} 
            textAnchor="middle" 
            fontSize={block.style.fontSize} 
            fill={block.style.textColor} 
            fontWeight="bold"
          >
            {block.name}
          </text>
          <text 
            x={block.x + block.width/2} 
            y={block.y + block.height/2 + 20} 
            textAnchor="middle" 
            fontSize={block.style.fontSize - 2} 
            fill={block.style.textColor}
          >
            ({block.count})
          </text>
        </React.Fragment>
      ))}
      
      {/* 圖例 */}
      <rect x="50" y="260" width="700" height="30" fill="#f5f5f5" />
      <text x="400" y="280" textAnchor="middle" fontSize="14">{data.subtitle}</text>
    </svg>
  );
};

SmallSpecificationHeatChart.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    blocks: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        count: PropTypes.string.isRequired,
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired,
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired,
        style: PropTypes.shape({
          fillColor: PropTypes.string.isRequired,
          fillOpacity: PropTypes.number.isRequired,
          strokeColor: PropTypes.string.isRequired,
          strokeWidth: PropTypes.number,
          textColor: PropTypes.string.isRequired,
          fontSize: PropTypes.number.isRequired
        }).isRequired
      })
    ).isRequired
  })
};

SmallSpecificationHeatChart.defaultProps = {
  data: null
};

export default SmallSpecificationHeatChart; 