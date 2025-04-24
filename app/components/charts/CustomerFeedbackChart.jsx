import React from 'react';
import PropTypes from 'prop-types';

const CustomerFeedbackChart = ({ data }) => {
  if (!data) {
    return <div>No customer feedback data available</div>;
  }

  return (
    <svg width="800" height="320" viewBox="0 0 800 320">
      <text x="400" y="30" textAnchor="middle" fontSize="16" fontWeight="bold">{data.title}</text>
      <text x="400" y="50" textAnchor="middle" fontSize="12">
        {data.subtitle.map((item, index) => (
          <tspan key={`subtitle-${index}`} fill={item.color} dx={index > 0 ? "10" : "0"}>{item.text}</tspan>
        ))}
      </text>
      
      {/* 座標軸與背景 */}
      <rect x="50" y="70" width="700" height="200" fill="#f8fafc" />
      <line x1="50" y1="270" x2="750" y2="270" stroke="#333" strokeWidth="2" />
      <line x1="50" y1="70" x2="50" y2="270" stroke="#333" strokeWidth="2" />
      
      {/* Y軸標籤 */}
      {data.yAxisLabels.map((label, index) => (
        <text 
          key={`y-label-${index}`} 
          x="45" 
          y={label.y} 
          textAnchor="end" 
          fontSize="10"
        >
          {label.value}
        </text>
      ))}
      
      {/* 特性條形圖 */}
      {data.feedbackCategories.map((category, index) => (
        <React.Fragment key={`feedback-${index}`}>
          {/* 正評 */}
          <rect 
            x={category.x - category.width/2} 
            y={category.positiveY} 
            width={category.width} 
            height={category.positiveHeight} 
            fill="#38B2AC" 
          />
          
          {/* 負評 */}
          <rect 
            x={category.x - category.width/2} 
            y={category.negativeY} 
            width={category.width} 
            height={category.negativeHeight} 
            fill="#E53E3E" 
          />
          
          {/* 數據標籤 */}
          <text 
            x={category.x} 
            y={category.negativeTextY} 
            textAnchor="middle" 
            fontSize={category.isPrimary ? "11" : "9"} 
            fill="white"
          >
            {category.negativeCount}
          </text>
          
          <text 
            x={category.x} 
            y={category.positiveTextY} 
            textAnchor="middle" 
            fontSize={category.isPrimary ? "12" : "9"} 
            fill="white"
          >
            {category.positiveCount}
          </text>
          
          {/* 類別名稱 */}
          <text 
            x={category.x} 
            y="285" 
            textAnchor="middle" 
            fontSize="11"
          >
            {category.category}
          </text>
        </React.Fragment>
      ))}
    </svg>
  );
};

CustomerFeedbackChart.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.arrayOf(
      PropTypes.shape({
        text: PropTypes.string.isRequired,
        color: PropTypes.string.isRequired
      })
    ).isRequired,
    yAxisLabels: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.string.isRequired,
        y: PropTypes.number.isRequired
      })
    ).isRequired,
    feedbackCategories: PropTypes.arrayOf(
      PropTypes.shape({
        category: PropTypes.string.isRequired,
        x: PropTypes.number.isRequired,
        positiveCount: PropTypes.number.isRequired,
        negativeCount: PropTypes.number.isRequired,
        positiveHeight: PropTypes.number.isRequired,
        negativeHeight: PropTypes.number.isRequired,
        positiveY: PropTypes.number.isRequired,
        negativeY: PropTypes.number.isRequired,
        positiveTextY: PropTypes.number.isRequired,
        negativeTextY: PropTypes.number.isRequired,
        width: PropTypes.number.isRequired,
        isPrimary: PropTypes.bool.isRequired
      })
    ).isRequired
  })
};

CustomerFeedbackChart.defaultProps = {
  data: null
};

export default CustomerFeedbackChart; 