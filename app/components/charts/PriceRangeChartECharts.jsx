import React from 'react';
import ReactECharts from 'echarts-for-react';
import priceRangeData from '../../data/priceRangeChartData.json';

const PriceRangeChartECharts = () => {
  const data = priceRangeData;
  const categories = data.map(item => item['1.價格區間all'].trim());
  const sales = data.map(item => item['總銷售金額']);
  const reviews = data.map(item => item['評價數']);

  const option = {
    title: {
      text: '六角扳手 價格區間銷售與評價',
      left: 'center',
      top: 10,
      textStyle: { fontWeight: 'bold', fontSize: 18 }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' }
    },
    legend: {
      data: ['銷售額', '評價數'],
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
      left: 80,
      right: 120,
      bottom: 60,
      top: 80
    },
    xAxis: [
      {
        type: 'category',
        data: categories,
        axisLabel: { fontSize: 13 }
      }
    ],
    yAxis: [
      {
        type: 'value',
        name: '銷售額',
        position: 'left',
        axisLabel: {
          formatter: value => value.toLocaleString()
        }
      },
      {
        type: 'value',
        name: '評價數',
        position: 'right',
        axisLabel: {
          formatter: value => value.toLocaleString()
        }
      }
    ],
    series: [
      {
        name: '銷售額',
        type: 'bar',
        data: sales,
        yAxisIndex: 0,
        itemStyle: {
          color: '#F59E0B'
        },
        barWidth: 32
      },
      {
        name: '評價數',
        type: 'line',
        data: reviews,
        yAxisIndex: 1,
        itemStyle: {
          color: '#7E22CE'
        },
        lineStyle: {
          width: 3
        },
        symbol: 'circle',
        symbolSize: 10
      }
    ]
  };

  return <ReactECharts option={option} style={{ height: 400, width: 800, maxWidth: '100%' }} opts={{ renderer: 'svg' }} />;
};

export default PriceRangeChartECharts; 