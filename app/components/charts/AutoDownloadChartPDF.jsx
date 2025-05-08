import React, { useEffect, useRef } from 'react';
import ReactECharts from 'echarts-for-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const chartOption = {
  title: {
    text: '自動下載 PDF 範例',
  },
  tooltip: {},
  xAxis: {
    data: ['A', 'B', 'C', 'D', 'E', 'F'],
  },
  yAxis: {},
  series: [
    {
      name: '數值',
      type: 'bar',
      data: [5, 20, 36, 10, 10, 20],
    },
  ],
};

const AutoDownloadChartPDF = () => {
  const chartRef = useRef();

  useEffect(() => {
    // 等待圖表渲染完成
    const timer = setTimeout(() => {
      if (!chartRef.current) return;
      html2canvas(chartRef.current).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({
          orientation: 'landscape',
          unit: 'px',
          format: [canvas.width, canvas.height],
        });
        pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
        pdf.save('chart-report.pdf');
      });
    }, 1200); // 視情況調整等待時間
    return () => clearTimeout(timer);
  }, []);

  return (
    <div ref={chartRef} style={{ background: '#fff', padding: 24 }}>
      <h2>自動下載 PDF 範例</h2>
      <ReactECharts option={chartOption} style={{ height: 400 }} />
      <p>本區塊將自動匯出 PDF 並下載。</p>
    </div>
  );
};

export default AutoDownloadChartPDF; 