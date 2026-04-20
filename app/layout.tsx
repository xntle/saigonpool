import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Saigon Pool | Hồ Bơi Cao Cấp",
  description: "Chuyên thiết kế và thi công hồ bơi cao cấp",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
