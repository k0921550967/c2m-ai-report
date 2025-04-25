import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import rawData from '../../data/smallSpecificationHeatChartData.json';

const SmallSpecificationHeatChart = ({ selectedSpec }) => {
  const processedData = useMemo(() => {
    if (!rawData || !rawData.length) return null;
    if (!selectedSpec) {
      // Default to showing the first spec with maximum sales
      const specs = [...new Set(rawData.map(item => item.Spec))];
      const specSales = {};
      
      specs.forEach(spec => {
        specSales[spec] = rawData
          .filter(item => item.Spec === spec)
          .reduce((sum, item) => sum + item.sum_sales, 0);
      });
      
      const maxSpec = Object.entries(specSales)
        .sort((a, b) => b[1] - a[1])[0][0];
      
      selectedSpec = maxSpec;
    }

    // Filter data by selected specification
    const filteredData = rawData.filter(item => item.Spec === selectedSpec);
    
    if (!filteredData.length) return null;
    
    // Find spec name for the title
    const specNameMap = {
      'countryoforigin': '原產國',
      'brand': '品牌',
      'design': '設計',
      'handle': '手柄',
      'headsocket': '頭部/插口',
      'material': '材料',
      'size': '尺寸'
    };
    
    const specName = specNameMap[selectedSpec] || selectedSpec;
    
    // Calculate total area available for blocks
    const svgWidth = 800;
    const svgHeight = 340;
    const chartWidth = 700;
    const chartHeight = 240;
    const marginLeft = 50;
    const marginTop = 50;
    
    const totalArea = chartWidth * chartHeight;
    
    // Find max sales to determine which items to highlight
    const maxSales = Math.max(...filteredData.map(item => item.sum_sales));
    const totalSales = filteredData.reduce((sum, item) => sum + item.sum_sales, 0);
    
    // Sort data by sales value (descending)
    const sortedData = [...filteredData].sort((a, b) => b.sum_sales - a.sum_sales);
    
    // Create treemap layout
    const blocks = [];
    let currentX = marginLeft;
    let currentY = marginTop;
    let rowHeight = 0;
    
    // Format the sales numbers with commas
    const formatSales = (num) => {
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };
    
    // Helper function to determine if a block fits in the current row
    const canFitInRow = (blockWidth) => {
      return currentX + blockWidth <= marginLeft + chartWidth;
    };
    
    // Calculate how many items to show (limit to top items if there are too many)
    const maxItemsToShow = 30; // Adjust this number as needed
    const dataToProcess = sortedData.length > maxItemsToShow 
      ? sortedData.slice(0, maxItemsToShow) 
      : sortedData;
    
    // Create blocks with sizes proportional to sales
    dataToProcess.forEach((item) => {
      // Calculate block size proportional to sales
      const areaRatio = item.sum_sales / totalSales;
      const blockArea = totalArea * areaRatio * 0.95; // Slightly smaller to ensure spacing
      
      // Target aspect ratio
      const aspectRatio = 1.5;
      
      // Calculate dimensions from area and aspect ratio
      let blockWidth = Math.sqrt(blockArea * aspectRatio);
      let blockHeight = blockArea / blockWidth;
      
      // Ensure minimum block size
      blockWidth = Math.max(blockWidth, 80);
      blockHeight = Math.max(blockHeight, 60);
      
      // Check if we need to start a new row
      if (!canFitInRow(blockWidth)) {
        currentX = marginLeft;
        currentY += rowHeight + 10; // Add some spacing between rows
        rowHeight = 0;
      }
      
      // Adjust if we're exceeding chart height
      if (currentY + blockHeight > marginTop + chartHeight) {
        blockHeight = marginTop + chartHeight - currentY;
      }
      
      // Update row height if this block is taller
      rowHeight = Math.max(rowHeight, blockHeight);
      
      // Calculate color gradient based on rank
      const gradient = Math.max(0, Math.min(0.8, 1 - (item.sum_sales / maxSales)));
      const isMaxSale = item.sum_sales === maxSales;
      
      const r = isMaxSale ? 139 : Math.floor(96 + gradient * 150);
      const g = isMaxSale ? 92 : Math.floor(165 + gradient * 50);
      const b = isMaxSale ? 246 : Math.floor(250 - gradient * 50);
      
      // Create block
      blocks.push({
        id: `${item.Spec}-${item.content_trim}`,
        name: item.content_trim,
        count: formatSales(item.sum_sales),
        x: currentX,
        y: currentY,
        width: blockWidth,
        height: blockHeight,
        style: {
          fillColor: isMaxSale ? "#8B5CF6" : `rgb(${r},${g},${b})`,
          fillOpacity: 0.9,
          strokeColor: isMaxSale ? "#6D28D9" : "none",
          strokeWidth: isMaxSale ? 3 : 0,
          textColor: gradient > 0.5 ? "#1E3A8A" : "white",
          fontSize: isMaxSale ? 14 : Math.max(10, Math.min(14, Math.floor(Math.sqrt(blockWidth * blockHeight) / 10)))
        }
      });
      
      // Move X position for next block
      currentX += blockWidth + 5; // Add spacing between blocks
    });
    
    return {
      title: `六角扳手 ${specName} 規格詳細分析`,
      subtitle: `${specName}規格銷售詳細分析 (點擊上圖區塊切換)`,
      blocks
    };
  }, [selectedSpec]);

  if (!processedData) {
    return <div>No small specification heat chart data available</div>;
  }

  return (
    <svg width="800" height="340" viewBox="0 0 800 340">
      {/* 座標軸和標題 */}
      <text x="400" y="30" textAnchor="middle" fontSize="16" fontWeight="bold">{processedData.title}</text>
      
      {/* 熱圖格式 */}
      <rect x="50" y="50" width="700" height="240" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />
      
      {/* 熱圖區塊 */}
      {processedData.blocks.map((block) => (
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
            y={block.y + block.height/2 - (block.height/4)} 
            textAnchor="middle" 
            fontSize={block.style.fontSize} 
            fill={block.style.textColor} 
            fontWeight="bold"
            style={{ 
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              whiteSpace: 'nowrap'
            }}
          >
            {block.name.length > 15 ? `${block.name.substring(0, 13)}...` : block.name}
          </text>
          <text 
            x={block.x + block.width/2} 
            y={block.y + block.height/2 + (block.height/4)} 
            textAnchor="middle" 
            fontSize={block.style.fontSize - 2} 
            fill={block.style.textColor}
          >
            {block.count}
          </text>
        </React.Fragment>
      ))}
    
      {/* 圖例 */}
      <rect x="50" y="300" width="700" height="30" fill="#f5f5f5" />
      <text x="400" y="320" textAnchor="middle" fontSize="14">{processedData.subtitle}</text>
    </svg>
  );
};

SmallSpecificationHeatChart.propTypes = {
  selectedSpec: PropTypes.string
};

export default SmallSpecificationHeatChart; 