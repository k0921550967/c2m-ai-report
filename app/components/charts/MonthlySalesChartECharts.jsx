import React from 'react';
import ReactECharts from 'echarts-for-react';
import monthlySalesData from '../../data/monthlySalesChartData.json';

const MonthlySalesChartECharts = () => {
  // 只取近兩年資料
  const now = new Date();
  const twoYearsAgo = new Date(now.getFullYear() - 2, now.getMonth(), 1);
  const data = monthlySalesData
    .filter(item => new Date(item.DataDateS_bar) >= twoYearsAgo)
    .sort((a, b) => new Date(a.DataDateS_bar) - new Date(b.DataDateS_bar));
  const months = data.map(item => item.DataDateS_bar.slice(0, 7).replace('/', '.'));
  const sales = data.map(item => item['月銷售金額']);
  const avgPrice = data.map(item => item['Average of Price']);

  const option = {
    title: {
      text: '六角扳手 月銷售與單價趨勢',
      left: 'center',
      top: 10,
      textStyle: { fontWeight: 'bold', fontSize: 18 }
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' }
    },
    legend: {
      data: ['月銷售金額', '平均單價'],
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
        data: months,
        axisLabel: { fontSize: 12 }
      }
    ],
    yAxis: [
      {
        type: 'value',
        name: '月銷售金額',
        position: 'left',
        axisLabel: {
          formatter: value => value.toLocaleString()
        }
      },
      {
        type: 'value',
        name: '平均單價',
        position: 'right',
        axisLabel: {
          formatter: value => `$${value}`
        }
      }
    ],
    series: [
      {
        name: '月銷售金額',
        type: 'bar',
        data: sales,
        yAxisIndex: 0,
        itemStyle: {
          color: '#60A5FA'
        },
        barWidth: 18
      },
      {
        name: '平均單價',
        type: 'line',
        data: avgPrice,
        yAxisIndex: 1,
        itemStyle: {
          color: '#E53E3E'
        },
        lineStyle: {
          width: 3
        },
        symbol: 'circle',
        symbolSize: 8
      }
    ]
  };

  return <ReactECharts option={option} style={{ height: 400, width: 800, maxWidth: '100%' }} opts={{ renderer: 'svg' }} />;
};

export default MonthlySalesChartECharts; 