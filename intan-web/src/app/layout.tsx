import type { Metadata } from "next";
import { Bricolage_Grotesque, Source_Sans_3, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: "variable",
  display: "swap",
});

const source = Source_Sans_3({
  variable: "--font-source",
  subsets: ["latin"],
  weight: "variable",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["500", "700"],
  display: "swap",
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#141210",
};

export const metadata: Metadata = {
  title: {
    default: "INTAN — Pemanggang Kemplang Tunu | PKM-KI Universitas Padjadjaran 2026",
    template: "%s | INTAN PKM-KI Unpad",
  },
  description:
    "INTAN memutar enam keping kemplang tunu di atas bara arang dengan kendali 550–600 °C. Kapasitas 400–420 keping per jam, dikembangkan oleh tim PKM-KI Universitas Padjadjaran 2026.",
  keywords: ["INTAN", "kemplang tunu", "PKM-KI", "Unpad", "pemanggang otomatis", "UMKM"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="id"
      className={`${bricolage.variable} ${source.variable} ${jetbrains.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-paper focus:px-4 focus:py-3 focus:text-sm focus:font-semibold focus:text-graphite"
        >
          Lewati ke konten
        </a>
        <Navbar />
        <main id="main-content" className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
