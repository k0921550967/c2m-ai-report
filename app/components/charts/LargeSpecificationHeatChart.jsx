import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import largeData from '../../data/largeSpecificationHeatChartData.json';
import smallData from '../../data/smallSpecificationHeatChartData.json';
import { hierarchy, treemap } from 'd3-hierarchy';

const LargeSpecificationHeatChart = ({ onSpecSelect }) => {
  const [selectedSpec, setSelectedSpec] = useState(null);
  
  // Process data for the heat chart
  const processedData = useMemo(() => {
    if (!largeData || !largeData.length) return null;
    
    // Treemap layout
    const svgWidth = 800;
    const svgHeight = 340;
    const chartWidth = 700;
    const chartHeight = 240;
    const marginLeft = 50;
    const marginTop = 50;
    
    // d3-hierarchy expects a root node with children
    const root = hierarchy({ children: largeData })
      .sum(d => d.sum_sales)
      .sort((a, b) => b.value - a.value);
    
    treemap()
      .size([chartWidth, chartHeight])
      .paddingInner(8)
      .paddingOuter(2)
      (root);
    
    // Find max sales for color
    const maxSales = Math.max(...largeData.map(item => item.sum_sales));
    
    // Format the sales numbers with commas
    const formatSales = (num) => {
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };
    
    // Map d3 nodes to blocks
    const blocks = root.leaves().map(node => {
      const item = node.data;
      return {
        id: item.Spec,
        name: item.Spec === 'countryoforigin' ? '原產國' : 
              item.Spec === 'brand' ? '品牌' :
              item.Spec === 'design' ? '設計' :
              item.Spec === 'handle' ? '手柄' :
              item.Spec === 'headsocket' ? '頭部/插口' :
              item.Spec === 'material' ? '材料' :
              item.Spec === 'size' ? '尺寸' : item.Spec,
        count: formatSales(item.sum_sales),
        rawCount: item.sum_sales,
        spec: item.Spec,
        x: node.x0 + marginLeft,
        y: node.y0 + marginTop,
        width: node.x1 - node.x0,
        height: node.y1 - node.y0,
        style: {
          fillColor: item.sum_sales === maxSales ? "#8B5CF6" : 
                    item.sum_sales > 19000000 ? "#60A5FA" :
                    item.sum_sales > 17000000 ? "#3B82F6" :
                    item.sum_sales > 15000000 ? "#93C5FD" : "#BFDBFE",
          fillOpacity: 0.9,
          strokeColor: item.sum_sales === maxSales ? "#6D28D9" : "none",
          strokeWidth: item.sum_sales === maxSales ? 3 : 0,
          titleColor: item.sum_sales > 17000000 ? "white" : "#1E3A8A",
          countColor: item.sum_sales > 17000000 ? "white" : "#1E3A8A",
          titleFontSize: item.sum_sales === maxSales ? 18 : 16,
          countFontSize: item.sum_sales === maxSales ? 14 : 12
        }
      };
    });
    
    return {
      title: "六角扳手規格關注度",
      subtitle: "六角扳手規格關注度比例 (銷售額數據)",
      specificationBlocks: blocks
    };
  }, []);

  // Handle block click
  const handleBlockClick = (block) => {
    setSelectedSpec(block.spec);
    if (onSpecSelect) {
      onSpecSelect(block.spec);
    }
  };

  if (!processedData) {
    return <div>No specification heat chart data available</div>;
  }

  return (
    <svg width="800" height="340" viewBox="0 0 800 340">
      {/* 座標軸和標題 */}
      <text x="400" y="30" textAnchor="middle" fontSize="16" fontWeight="bold">{processedData.title}</text>
      
      {/* 熱圖格式 */}
      <rect x="50" y="50" width="700" height="240" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />
      
      {/* 熱圖區塊 */}
      {processedData.specificationBlocks.map((block) => (
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
            style={{ cursor: 'pointer' }}
            onClick={() => handleBlockClick(block)}
          />
          <text 
            x={block.x + block.width/2} 
            y={block.y + block.height/2 - block.height/6} 
            textAnchor="middle" 
            fontSize={block.style.titleFontSize} 
            fill={block.style.titleColor} 
            fontWeight="bold"
            style={{ cursor: 'pointer', pointerEvents: 'none' }}
          >
            {block.name}
          </text>
          <text 
            x={block.x + block.width/2} 
            y={block.y + block.height/2 + block.height/6} 
            textAnchor="middle" 
            fontSize={block.style.countFontSize} 
            fill={block.style.countColor}
            style={{ cursor: 'pointer', pointerEvents: 'none' }}
          >
            {block.count}
          </text>
        </React.Fragment>
      ))}
      
      {/* 圖例和說明 */}
      <rect x="50" y="300" width="700" height="30" fill="#f5f5f5" />
      <text x="400" y="320" textAnchor="middle" fontSize="14">{processedData.subtitle}</text>
    </svg>
  );
};

LargeSpecificationHeatChart.propTypes = {
  onSpecSelect: PropTypes.func
};

export default LargeSpecificationHeatChart; 