import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["700", "800"],
});
const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["500", "700"],
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#050505",
};

export const metadata: Metadata = {
  title: {
    default: "INTAN — Smart Rotary Roaster | PKM-KI Universitas Padjadjaran 2026",
    template: "%s | INTAN PKM-KI Unpad",
  },
  description:
    "INTAN (Inovasi Termal Adaptif Nusantara): pemanggang kemplang tunu otomatis berbasis mikrokontroler dengan kapasitas 400–420 keping/jam. PKM-KI Universitas Padjadjaran 2026.",
  keywords: ["INTAN", "kemplang tunu", "PKM-KI", "Unpad", "smart roaster", "UMKM"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="id"
      className={`${inter.variable} ${jakarta.variable} ${jetbrains.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
