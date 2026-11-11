import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "م. آلاء عيسى | مهندسة ديكور وتصميم داخلي - Alaa Issa Interior Design",
  description:
    "معرض أعمال وخدمات مهندسة الديكور والتصميم الداخلي م. آلاء عيسى؛ تصاميم 3D واقعية، تشطيبات فاخرة، وإشراف هندسي متكامل.",
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
    <html lang="ar" dir="rtl" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col antialiased bg-[#0e0e10] text-[#f4f2ee] selection:bg-[#c5a880]/30 selection:text-[#e8d5be]">
        {children}
      </body>
    </html>
  );
}
