import React from 'react';
import ReactECharts from 'echarts-for-react';
import feedbackData from '../../data/customerFeedbackChartData.json';

const CustomerFeedbackChartECharts = () => {
  // 整理資料：每個 opinion_items 對應正面/負面數量
  const grouped = {};
  feedbackData.forEach(item => {
    const key = item.opinion_items;
    if (!grouped[key]) grouped[key] = { positive: 0, negative: 0 };
    if (String(item.result_sortings).includes('positive')) {
      grouped[key].positive += item['Count of result'];
    } else {
      grouped[key].negative += item['Count of result'];
    }
  });
  const categories = Object.keys(grouped);
  const positive = categories.map(key => grouped[key].positive);
  const negative = categories.map(key => grouped[key].negative);

  const option = {
    title: {
      text: '客戶評論分析',
      left: 'center',
      top: 10,
      textStyle: { fontWeight: 'bold', fontSize: 18 }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      formatter: params => {
        const pos = params.find(p => p.seriesName === '正面')?.value || 0;
        const neg = params.find(p => p.seriesName === '負面')?.value || 0;
        return `${params[0].name}<br/>正面: ${pos}<br/>負面: ${neg}`;
      }
    },
    legend: {
      data: ['正面', '負面'],
      top: 50,
      left: 'center',
      orient: 'horizontal',
      textStyle: {
        fontSize: 14,
        color: '#333',
        fontWeight: 'bold'
      }
    },
    grid: {
      left: 60,
      right: 40,
      bottom: 100,
      top: 90
    },
    xAxis: {
      type: 'category',
      data: categories,
      axisLabel: { fontSize: 13, rotate: 30 },
      name: '意見項目',
      nameLocation: 'middle',
      nameGap: 30
    },
    yAxis: {
      type: 'value',
      axisLabel: { fontSize: 13 },
      name: '評論數',
      nameLocation: 'middle',
      nameGap: 30
    },
    series: [
      {
        name: '正面',
        type: 'bar',
        stack: 'total',
        data: positive,
        itemStyle: { color: '#60A5FA' },
        barWidth: 24
      },
      {
        name: '負面',
        type: 'bar',
        stack: 'total',
        data: negative,
        itemStyle: { color: '#E53E3E' },
        barWidth: 24
      }
    ]
  };

  return <ReactECharts option={option} style={{ height: 400, width: 800, maxWidth: '100%' }} opts={{ renderer: 'svg' }} />;
};

export default CustomerFeedbackChartECharts; 