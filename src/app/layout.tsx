import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Alaa Issa | Interior Architecture & Design Portfolio",
  description:
    "Architectural Interior Design & Decor Portfolio of Eng. Alaa Issa. Selected Works, Spatial Planning, 3D Visualization & Execution.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className="scroll-smooth" suppressHydrationWarning>
      <body className="min-h-screen bg-white text-[#111111] antialiased selection:bg-black selection:text-white font-sans">
        {children}
      </body>
    </html>
  );
}
