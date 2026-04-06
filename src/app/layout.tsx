import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "상큼발랄 미니홈피",
  description: "추억의 개인 방명록",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body 
        className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-10" 
        style={{fontFamily: "'Dotum', '돋움', 'Gulim', '굴림', sans-serif"}}
      >
        {children}
      </body>
    </html>
  );
}
