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
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,400&family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-white text-[#111111] antialiased selection:bg-black selection:text-white">
        {children}
      </body>
    </html>
  );
}
