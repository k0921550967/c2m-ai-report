import React from 'react';
import ReactECharts from 'echarts-for-react';
import largeData from '../../data/largeSpecificationHeatChartData.json';

// 規格名稱對應中文
const specNameMap = {
  'countryoforigin': '原產國',
  'brand': '品牌',
  'design': '設計',
  'handle': '手柄',
  'headsocket': '頭部/插口',
  'material': '材料',
  'size': '尺寸'
};

// 依據 sum_sales 決定顏色
function getColor(sum_sales, maxSales) {
  if (sum_sales === maxSales) return '#8B5CF6';
  if (sum_sales > 19000000) return '#60A5FA';
  if (sum_sales > 17000000) return '#3B82F6';
  if (sum_sales > 15000000) return '#93C5FD';
  return '#BFDBFE';
}

const LargeSpecificationHeatChartECharts = ({ onSpecSelect }) => {
  if (!largeData || !largeData.length) return <div>No specification heat chart data available</div>;
  const maxSales = Math.max(...largeData.map(item => item.sum_sales));
  const data = largeData.map(item => ({
    name: specNameMap[item.Spec] || item.Spec,
    value: item.sum_sales,
    spec: item.Spec, // 保留原始 spec 以便傳遞
    itemStyle: {
      color: getColor(item.sum_sales, maxSales)
    }
  }));

  const option = {
    title: {
      text: '六角扳手規格關注度',
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
        data,
        leafDepth: 1,
        roam: false,
        label: {
          show: true,
          formatter: params => `${params.name}\n${params.value.toLocaleString()}`,
          fontWeight: 'bold',
        },
        itemStyle: {
          gapWidth: 0
        },
        upperLabel: { show: false },
        animation: false,
        // 禁用選取高亮
        selectedMode: false,
        emphasis: { itemStyle: { borderColor: null, borderWidth: 0, shadowBlur: 0 } }
      }
    ]
  };

  // 點擊事件
  const onEvents = {
    click: (params) => {
      if (onSpecSelect && params && params.data && params.data.spec) {
        onSpecSelect(params.data.spec);
      }
    }
  };

  return (
    <div style={{ width: 800, maxWidth: '100%', marginLeft: 0, marginRight: 'auto' }}>
      <ReactECharts option={option} style={{ height: 340, width: '100%' }} opts={{ renderer: 'svg' }} onEvents={onEvents} />
      <div style={{ textAlign: 'center', marginTop: 8, color: '#666', fontSize: 14 }}>六角扳手規格關注度比例 (銷售額數據)</div>
    </div>
  );
};

export default LargeSpecificationHeatChartECharts; 