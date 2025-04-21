'use client';

export const loadHtml2pdf = () => {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') {
      reject(new Error('Cannot load html2pdf in server environment'));
      return;
    }

    if (window['html2pdf']) {
      resolve(window['html2pdf']);
      return;
    }
    
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
    script.onload = () => resolve(window['html2pdf']);
    script.onerror = reject;
    document.head.appendChild(script);
  });
};

export const setupPrintStyles = () => {
  if (typeof window === 'undefined') return;

  // 添加列印時隱藏特定元素的樣式
  const printStyles = document.createElement('style');
  printStyles.innerHTML = `
    @media print {
      /* 隱藏瀏覽器自動添加的列印頁首與頁尾 (日期、URL等) */
      @page {
        margin: 0.5cm;
        size: A4 portrait;
      }
      
      body {
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
        color-adjust: exact !important;
        margin: 0;
        padding: 0;
      }
      
      /* 徹底隱藏頁首頁尾 */
      html {
        height: 100%;
        overflow: hidden;
      }
    }
  `;
  document.head.appendChild(printStyles);
  
  // 添加直接修改打印設置的腳本
  const printHandler = () => {
    try {
      const style = document.createElement('style');
      style.id = 'print-override';
      style.innerHTML = '@page { margin: 0 !important; size: A4 portrait; }';
      document.head.appendChild(style);
    } catch (e) {
      console.error('無法修改打印設置', e);
    }
  };
  
  const afterPrintHandler = () => {
    const style = document.getElementById('print-override');
    if (style) style.remove();
  };
  
  window.addEventListener('beforeprint', printHandler);
  window.addEventListener('afterprint', afterPrintHandler);
  
  // 返回清除函數供useEffect使用
  return () => {
    window.removeEventListener('beforeprint', printHandler);
    window.removeEventListener('afterprint', afterPrintHandler);
  };
}; 