import React from 'react';
import PropTypes from 'prop-types';

const ProductSpecTable = ({ data }) => {
  if (!data) {
    return <div>No product specification data available</div>;
  }

  const renderCategoryRow = (category, index, totalCategories) => {
    const itemCount = category.items.length;
    const rowHeight = itemCount * 18;
    const yStart = 90 + (index === 0 ? 0 : 
                    Array.from({length: index}, (_, i) => 
                      data.categories[i].items.length * 18).reduce((a, b) => a + b, 0));
    
    // 每行的背景
    const elements = [];
    
    // 類別名稱背景
    elements.push(
      <rect 
        key={`cat-bg-${index}`} 
        x="50" 
        y={yStart} 
        width="200" 
        height={rowHeight} 
        fill="#E6FFFA" 
        stroke="#4A5568" 
        strokeWidth="1" 
      />
    );
    
    // 項目細節背景
    elements.push(
      <rect 
        key={`item-bg-${index}`} 
        x="250" 
        y={yStart} 
        width="350" 
        height={rowHeight} 
        fill="#ffffff" 
        stroke="#4A5568" 
        strokeWidth="1" 
      />
    );
    
    // 排名背景
    elements.push(
      <rect 
        key={`rank-bg-${index}`} 
        x="600" 
        y={yStart} 
        width="150" 
        height={rowHeight} 
        fill="#ffffff" 
        stroke="#4A5568" 
        strokeWidth="1" 
      />
    );
    
    // 類別標題
    elements.push(
      <text 
        key={`cat-title-${index}`} 
        x="150" 
        y={yStart + rowHeight/2} 
        textAnchor="middle" 
        fontSize="13"
      >
        {category.name}
      </text>
    );
    
    // 項目分隔線和內容
    category.items.forEach((item, itemIndex) => {
      const itemY = yStart + (itemIndex + 0.5) * (rowHeight / itemCount);
      
      if (itemIndex > 0) {
        elements.push(
          <line 
            key={`item-line-${index}-${itemIndex}`} 
            x1="250" 
            y1={yStart + itemIndex * (rowHeight / itemCount)} 
            x2="600" 
            y2={yStart + itemIndex * (rowHeight / itemCount)} 
            stroke="#CBD5E0" 
            strokeWidth="1" 
          />
        );
        
        elements.push(
          <line 
            key={`rank-line-${index}-${itemIndex}`} 
            x1="600" 
            y1={yStart + itemIndex * (rowHeight / itemCount)} 
            x2="750" 
            y2={yStart + itemIndex * (rowHeight / itemCount)} 
            stroke="#CBD5E0" 
            strokeWidth="1" 
          />
        );
      }
      
      // 項目名稱
      elements.push(
        <text 
          key={`item-text-${index}-${itemIndex}`} 
          x="270" 
          y={itemY + 4} 
          textAnchor="start" 
          fontSize={item.name.length > 15 ? "11" : "12"}
        >
          {item.name}
        </text>
      );
      
      // 排名圓圈
      elements.push(
        <circle 
          key={`rank-circle-${index}-${itemIndex}`} 
          cx="675" 
          cy={itemY} 
          r="12" 
          fill="#38B2AC" 
        />
      );
      
      // 排名數字
      elements.push(
        <text 
          key={`rank-text-${index}-${itemIndex}`} 
          x="675" 
          y={itemY + 4} 
          textAnchor="middle" 
          fontSize="12" 
          fill="white" 
          fontWeight="bold"
        >
          {item.rank}
        </text>
      );
    });
    
    // 底線
    if (index < totalCategories - 1) {
      elements.push(
        <line 
          key={`bottom-line-${index}`} 
          x1="50" 
          y1={yStart + rowHeight} 
          x2="750" 
          y2={yStart + rowHeight} 
          stroke="#4A5568" 
          strokeWidth="1" 
        />
      );
    }
    
    return elements;
  };
  
  // 計算總高度
  const totalItemHeight = data.categories.reduce((total, category) => 
    total + category.items.length * 18, 0);
  const svgHeight = 140 + totalItemHeight; // 標題、表頭和外框的額外空間
  
  return (
    <svg width="800" height={svgHeight} viewBox={`0 0 800 ${svgHeight}`}>
      <text x="400" y="30" textAnchor="middle" fontSize="16" fontWeight="bold">{data.title}</text>
      
      {/* 表格外框與標頭 */}
      <rect x="50" y="50" width="700" height={90 + totalItemHeight} fill="#f8fafc" stroke="#4A5568" strokeWidth="2" />
      
      {/* 表頭 */}
      <rect x="50" y="50" width="200" height="40" fill="#38B2AC" />
      <rect x="250" y="50" width="350" height="40" fill="#38B2AC" />
      <rect x="600" y="50" width="150" height="40" fill="#38B2AC" />
      <line x1="50" y1="90" x2="750" y2="90" stroke="#4A5568" strokeWidth="2" />
      <line x1="250" y1="50" x2="250" y2={90 + totalItemHeight} stroke="#4A5568" strokeWidth="2" />
      <line x1="600" y1="50" x2="600" y2={90 + totalItemHeight} stroke="#4A5568" strokeWidth="2" />
      <text x="150" y="75" textAnchor="middle" fontSize="14" fill="white">產品規格</text>
      <text x="425" y="75" textAnchor="middle" fontSize="14" fill="white">產品規格細項</text>
      <text x="675" y="75" textAnchor="middle" fontSize="14" fill="white">推薦序</text>
      
      {/* 動態渲染每個類別行 */}
      {data.categories.map((category, index) => 
        renderCategoryRow(category, index, data.categories.length)
      )}
  </svg>
);
};

ProductSpecTable.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    categories: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        items: PropTypes.arrayOf(
          PropTypes.shape({
            name: PropTypes.string.isRequired,
            rank: PropTypes.number.isRequired
          })
        ).isRequired
      })
    ).isRequired
  })
};

ProductSpecTable.defaultProps = {
  data: null
};

export default ProductSpecTable; 