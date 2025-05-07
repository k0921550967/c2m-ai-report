import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import rawData from '../../data/smallSpecificationHeatChartData.json';
import ReactECharts from 'echarts-for-react';

const specNameMap = {
  'countryoforigin': '原產國',
  'brand': '品牌',
  'design': '設計',
  'handle': '手柄',
  'headsocket': '頭部/插口',
  'material': '材料',
  'size': '尺寸'
};

const SmallSpecificationHeatChartECharts = ({ selectedSpec }) => {
  const processed = useMemo(() => {
    if (!rawData || !rawData.length) return null;
    let spec = selectedSpec;
    if (!spec) {
      // 預設顯示最大總銷售額的 spec
      const specs = [...new Set(rawData.map(item => item.Spec))];
      const specSales = {};
      specs.forEach(s => {
        specSales[s] = rawData.filter(item => item.Spec === s).reduce((sum, item) => sum + item.sum_sales, 0);
      });
      spec = Object.entries(specSales).sort((a, b) => b[1] - a[1])[0][0];
    }
    const filteredData = rawData.filter(item => item.Spec === spec);
    if (!filteredData.length) return null;
    const maxSales = Math.max(...filteredData.map(item => item.sum_sales));
    // ECharts treemap data 格式
    const data = filteredData.map(item => {
      const gradient = Math.max(0, Math.min(0.8, 1 - (item.sum_sales / maxSales)));
      const isMaxSale = item.sum_sales === maxSales;
      const r = isMaxSale ? 139 : Math.floor(96 + gradient * 150);
      const g = isMaxSale ? 92 : Math.floor(165 + gradient * 50);
      const b = isMaxSale ? 246 : Math.floor(250 - gradient * 50);
      return {
        name: item.content_trim.length > 15 ? `${item.content_trim.substring(0, 13)}...` : item.content_trim,
        value: item.sum_sales,
        itemStyle: {
          color: isMaxSale ? '#8B5CF6' : `rgb(${r},${g},${b})`
        }
      };
    });
    return {
      title: `六角扳手 ${specNameMap[spec] || spec} 規格詳細分析`,
      subtitle: `${specNameMap[spec] || spec}規格銷售詳細分析`,
      data
    };
  }, [selectedSpec]);

  if (!processed) return <div>No small specification heat chart data available</div>;

  const option = {
    title: {
      text: processed.title,
      left: 'center',
      top: 10,
      textStyle: { fontWeight: 'bold', fontSize: 18 }
    },
    tooltip: {
      formatter: params => `${params.name}<br/>銷售額: ${params.value.toLocaleString()}`
    },
    series: [
      {
        type: 'treemap',
        data: processed.data,
        leafDepth: 1,
        roam: false,
        label: {
          show: true,
          fontWeight: 'bold',
        },
        itemStyle: {
          gapWidth: 0
        },
        upperLabel: { show: false },
        animation: false
      }
    ]
  };

  return (
    <div style={{ width: 800, maxWidth: '100%', marginLeft: 0, marginRight: 'auto' }}>
      <ReactECharts option={option} style={{ height: 340, width: '100%' }} opts={{ renderer: 'svg' }} />
      <div style={{ textAlign: 'center', marginTop: 8, color: '#666', fontSize: 14 }}>{processed.subtitle}</div>
    </div>
  );
};

SmallSpecificationHeatChartECharts.propTypes = {
  selectedSpec: PropTypes.string
};

export default SmallSpecificationHeatChartECharts; 