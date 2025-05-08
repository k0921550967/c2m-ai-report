import React from 'react';

/**
 * LoadingModal - PDF 產生中彈窗
 * @param {boolean} show 是否顯示
 */
const LoadingModal = ({ show }) => {
  if (!show) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white rounded-xl shadow-xl px-8 py-6 flex flex-col items-center">
        {/* Spinner */}
        <svg className="animate-spin mb-4" width="48" height="48" viewBox="0 0 50 50">
          <circle className="opacity-20" cx="25" cy="25" r="20" stroke="#1E40AF" strokeWidth="6" fill="none"/>
          <path d="M25 5a20 20 0 0 1 20 20" stroke="#F59E42" strokeWidth="6" fill="none" strokeLinecap="round"/>
        </svg>
        <div className="text-blue-900 font-bold text-lg">PDF 產生中，請稍候...</div>
      </div>
    </div>
  );
};

export default LoadingModal; 