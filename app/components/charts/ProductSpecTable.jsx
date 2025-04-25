import React from 'react';
import PropTypes from 'prop-types';

const ProductSpecTable = ({ data }) => {
  if (!data || !Array.isArray(data) || data.length === 0) {
    return <div>No product specification data available</div>;
  }

  // 從數據中提取產品類別（Category）
  const category = data[0]?.Category || "產品規格推薦表";
  
  // 將數據按照產品規格分組
  const groupedData = data.reduce((acc, item) => {
    if (!acc[item.產品規格]) {
      acc[item.產品規格] = [];
    }
    acc[item.產品規格].push(item);
    return acc;
  }, {});
  
  // 轉換為類別數組格式，自動排序從1開始
  const categories = Object.keys(groupedData).map(specName => {
    // 先根據原始排名對項目進行排序
    const sortedItems = [...groupedData[specName]].sort((a, b) => {
      return (a.score_rank || 0) - (b.score_rank || 0);
    });
    
    return {
      name: specName,
      items: sortedItems.map((item, idx) => ({
        name: String(item.產品規格細項),
        rank: idx + 1
      }))
    };
  });
  
  const title = `${category} - 產品規格推薦表`;
  
  // 計算表格尺寸和位置 - 更緊密的設計
  const tableWidth = 700;
  const tableHeight = 36; // 進一步減小表頭高度
  const cellPadding = 6; // 減小單元格內邊距
  const rowHeight = 22; // 進一步減小行高
  
  // 列寬度配置
  const colWidths = [200, 350, 150];
  const colStarts = [0]; // 起始X座標
  colWidths.forEach((w, i) => {
    colStarts.push(colStarts[i] + w);
  });
  
  // 顏色配置
  const colors = {
    header: "#38B2AC",
    headerText: "#ffffff",
    border: "#4A5568",
    categoryBg: "#E6FFFA",
    contentBg: "#ffffff",
    rowBorder: "#CBD5E0",
    rankColors: ["#3182CE", "#38A169", "#DD6B20", "#805AD5", "#3182CE"]
  };
  
  // 渲染表格
  const renderTable = () => {
    let elements = [];
    let currentY = 45; // 減小標題與表格間的間距
    
    // 外框
    elements.push(
      <rect 
        key="table-border" 
        x="50" 
        y={currentY} 
        width={tableWidth} 
        height={tableHeight + categories.reduce((h, cat) => h + cat.items.length * rowHeight, 0)} 
        fill="transparent"
        stroke={colors.border} 
        strokeWidth="2" 
      />
    );
    
    // 表頭
    elements.push(
      <rect 
        key="header-bg" 
        x="50" 
        y={currentY} 
        width={tableWidth} 
        height={tableHeight} 
        fill={colors.header} 
      />
    );
    
    // 表頭分隔線
    elements.push(
      <line 
        key="header-separator" 
        x1="50" 
        y1={currentY + tableHeight} 
        x2="750" 
        y2={currentY + tableHeight} 
        stroke={colors.border} 
        strokeWidth="2" 
      />
    );
    
    // 主要垂直分隔線 (直到表格底部的線)
    colStarts.forEach((x, i) => {
      if (i > 0) { // 跳過第一個起始點(0)
        const isRightBorder = i === colStarts.length - 1;
        elements.push(
          <line 
            key={`vertical-line-${i}`} 
            x1={x + 50} 
            y1={currentY} 
            x2={x + 50} 
            y2={currentY + tableHeight + categories.reduce((h, cat) => h + cat.items.length * rowHeight, 0)} 
            stroke={colors.border} 
            strokeWidth="2" 
          />
        );
      }
    });
    
    // 表頭文字
    const headerTitles = ["產品規格", "產品規格細項", "推薦序"];
    headerTitles.forEach((title, i) => {
      const centerX = 50 + colStarts[i] + colWidths[i] / 2;
      elements.push(
        <text 
          key={`header-text-${i}`} 
          x={centerX} 
          y={currentY + tableHeight/2 + 5}
          textAnchor="middle" 
          fontSize="13"
          fontWeight="bold"
          fill={colors.headerText}
        >
          {title}
        </text>
      );
    });
    
    // 起始內容位置
    currentY += tableHeight;
    
    // 渲染類別和項目
    categories.forEach((category, catIndex) => {
      const categoryStartY = currentY;
      const categoryHeight = category.items.length * rowHeight;
      
      // 類別背景
      elements.push(
        <rect 
          key={`category-bg-${catIndex}`} 
          x="50" 
          y={categoryStartY} 
          width={colWidths[0]} 
          height={categoryHeight} 
          fill={colors.categoryBg} 
        />
      );
      
      // 類別名稱 - 增大字體
      elements.push(
        <text 
          key={`category-name-${catIndex}`} 
          x={50 + colWidths[0]/2} 
          y={categoryStartY + categoryHeight/2 + 4}
          textAnchor="middle" 
          fontSize="13" // 增大字體
          fontWeight="medium"
        >
          {category.name}
        </text>
      );
      
      // 項目區域背景
      elements.push(
        <rect 
          key={`items-bg-${catIndex}`} 
          x={50 + colWidths[0]} 
          y={categoryStartY} 
          width={colWidths[1] + colWidths[2]} 
          height={categoryHeight} 
          fill={colors.contentBg} 
        />
      );
      
      // 產品規格細項和推薦序之間的垂直分隔線 (僅針對此類別的項目)
      elements.push(
        <line 
          key={`item-vertical-line-${catIndex}`} 
          x1={50 + colWidths[0] + colWidths[1]} 
          y1={categoryStartY} 
          x2={50 + colWidths[0] + colWidths[1]} 
          y2={categoryStartY + categoryHeight} 
          stroke={colors.border} 
          strokeWidth="1" 
        />
      );
      
      // 渲染每個項目
      category.items.forEach((item, itemIndex) => {
        const itemY = categoryStartY + itemIndex * rowHeight;
        
        // 項目分隔線
        if (itemIndex > 0) {
          elements.push(
            <line 
              key={`item-separator-${catIndex}-${itemIndex}`} 
              x1={50 + colWidths[0]} 
              y1={itemY} 
              x2="750" 
              y2={itemY} 
              stroke={colors.rowBorder} 
              strokeWidth="1" 
            />
          );
        }
        
        // 項目名稱 - 字體大小調整
        elements.push(
          <text 
            key={`item-name-${catIndex}-${itemIndex}`} 
            x={50 + colWidths[0] + cellPadding} 
            y={itemY + rowHeight/2 + 4}
            textAnchor="start" 
            fontSize={item.name.length > 15 ? "11" : "12"} // 增大字體
          >
            {item.name}
          </text>
        );
        
        // 推薦序號
        const rankColor = colors.rankColors[Math.min(item.rank - 1, colors.rankColors.length - 1)];
        const rankCenterX = 50 + colWidths[0] + colWidths[1] + colWidths[2]/2;
        const rankCenterY = itemY + rowHeight/2;
        
        // 推薦序號標誌 - 更小的方形設計
        elements.push(
          <g key={`rank-badge-${catIndex}-${itemIndex}`}>
            <rect 
              x={rankCenterX - 10}
              y={rankCenterY - 10}
              width="20"
              height="20"
              rx="3"
              fill={rankColor} 
            />
            <text 
              x={rankCenterX} 
              y={rankCenterY + 4}
              textAnchor="middle" 
              fontSize="11"
              fontWeight="bold"
              fill="white"
            >
              {item.rank}
            </text>
          </g>
        );
      });
      
      // 更新Y座標
      currentY += categoryHeight;
      
      // 類別底部分隔線
      if (catIndex < categories.length - 1) {
        elements.push(
          <line 
            key={`category-separator-${catIndex}`} 
            x1="50" 
            y1={currentY} 
            x2="750" 
            y2={currentY} 
            stroke={colors.border} 
            strokeWidth="1" 
          />
        );
      }
    });
    
    return elements;
  };
  
  // 計算總高度
  const totalRowsHeight = categories.reduce((total, category) => 
    total + category.items.length * rowHeight, 0);
  const svgHeight = 70 + tableHeight + totalRowsHeight; // 進一步減小標題空間
  
  return (
    <svg width="800" height={svgHeight} viewBox={`0 0 800 ${svgHeight}`}>
      {/* 標題 */}
      <text x="400" y="24" textAnchor="middle" fontSize="15" fontWeight="bold">{title}</text>
      
      {/* 渲染表格 */}
      {renderTable()}
    </svg>
  );
};

ProductSpecTable.propTypes = {
  data: PropTypes.oneOfType([
    // 舊格式
    PropTypes.shape({
      title: PropTypes.string,
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
      )
    }),
    // 新格式 - 扁平數組
    PropTypes.arrayOf(
      PropTypes.shape({
        row_number: PropTypes.number,
        Category: PropTypes.string,
        產品規格: PropTypes.string.isRequired,
        產品規格細項: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        score_rank: PropTypes.number.isRequired
      })
    )
  ])
};

ProductSpecTable.defaultProps = {
  data: []
};

export default ProductSpecTable;