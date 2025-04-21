import './globals.css';

export const metadata = {
  title: '數據驅動製造業研發創新計畫',
  description: '研發轉型診斷報告書',
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-TW">
      <body>
        {children}
      </body>
    </html>
  );
} 