import React from 'react';
import ReactECharts from 'echarts-for-react';
import brandPositionData from '../../data/BrandPositionChartData.json';

const BrandPositionChartECharts = () => {
  // 過濾六角扳手類別
  const data = brandPositionData.filter(item => item.Category === '六角扳手(Hex Key Wrench)');
  // 分類顏色
  const getColor = (price) => {
    if (price < 20) return '#3182CE'; // 藍色
    if (price < 35) return '#805AD5'; // 紫色
    return '#E53E3E'; // 紅色
  };
  const scatterData = data.map(item => ({
    value: [item['平均單價(美元)'], item['滿意度%'] * 100, item['平均月銷售金額S'], item.Brand],
    symbolSize: Math.max(10, Math.sqrt(item['平均月銷售金額S']) / 10),
    itemStyle: { color: getColor(item['平均單價(美元)']) }
  }));

  const option = {
    title: {
      text: '六角扳手 品牌定位氣泡圖',
      left: 'center',
      top: 10,
      textStyle: { fontWeight: 'bold', fontSize: 18 }
    },
    tooltip: {
      trigger: 'item',
      formatter: (params) => {
        const [price, satisfaction, sales, brand] = params.value;
        return `品牌: <b>${brand}</b><br/>平均單價: $${price}<br/>滿意度: ${satisfaction.toFixed(1)}%<br/>平均月銷售: $${sales.toLocaleString()}`;
      }
    },
    grid: {
      left: 80,
      right: 120,
      bottom: 60,
      top: 80
    },
    xAxis: {
      name: '平均單價(美元)',
      nameLocation: 'middle',
      nameGap: 30,
      type: 'value',
      min: 0,
      max: 70,
      axisLabel: { fontSize: 13 }
    },
    yAxis: {
      name: '滿意度(%)',
      nameLocation: 'middle',
      nameGap: 30,
      type: 'value',
      min: 50,
      max: 105,
      axisLabel: { fontSize: 13 }
    },
    series: [
      {
        name: '品牌',
        type: 'scatter',
        data: scatterData,
        label: {
          show: true,
          formatter: (params) => params.value[3],
          position: 'top',
          fontSize: 11,
          color: '#333',
          fontWeight: 'bold'
        },
        emphasis: {
          focus: 'series',
          label: {
            fontSize: 13,
            color: '#111',
            fontWeight: 'bold'
          }
        }
      }
    ]
  };

  return (
    <div style={{ width: 800, maxWidth: '100%', marginLeft: 0, marginRight: 'auto' }}>
      <ReactECharts option={option} style={{ height: 400, width: '100%' }} opts={{ renderer: 'svg' }} />
      <div style={{
        display: 'flex', justifyContent: 'center', gap: 32, marginTop: 16
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{
            display: 'inline-block', width: 16, height: 16, borderRadius: '50%', background: '#3182CE'
          }} />
          <span style={{ fontWeight: 600, color: '#3182CE' }}>經濟型</span>
          <span style={{ color: '#666', fontSize: 13 }}>&lt; 20美元</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{
            display: 'inline-block', width: 16, height: 16, borderRadius: '50%', background: '#805AD5'
          }} />
          <span style={{ fontWeight: 600, color: '#805AD5' }}>中價位</span>
          <span style={{ color: '#666', fontSize: 13 }}>20-35美元</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{
            display: 'inline-block', width: 16, height: 16, borderRadius: '50%', background: '#E53E3E'
          }} />
          <span style={{ fontWeight: 600, color: '#E53E3E' }}>高端品牌</span>
          <span style={{ color: '#666', fontSize: 13 }}>&gt; 35美元</span>
        </div>
      </div>
    </div>
  );
};

export default BrandPositionChartECharts; 