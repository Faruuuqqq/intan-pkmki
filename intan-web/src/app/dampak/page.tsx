import React from "react";
import { mediaPublikasi, mitraMou, diversifikasiProduk } from "@/data/timData";
import { socials } from "@/data/site";
import { ArrowUpRight, Handshake, Newspaper } from "lucide-react";

export default function DampakPage() {
  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 space-y-12 bg-[#050505]">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-[11px] font-mono text-[#ff5500] uppercase tracking-widest font-bold">
          <span>MEDIA &amp; DEPLOYMENT // SECTION 07</span>
          <span className="text-neutral-600">/</span>
          <span className="text-neutral-400">QR CODE 9.1 DIRECT ACCESS</span>
        </div>
        <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
          Dokumentasi Uji Coba, Liputan Media &amp; Kemitraan UMKM
        </h1>
        <p className="text-sm text-neutral-400 max-w-2xl font-sans leading-relaxed">
          Demonstrasi visual skala penuh operasional INTAN (Tujuan QR Bab IX.1), arsip publikasi 12 media massa, perjanjian kerja sama (MoU) kemitraan hilirisasi, dan modul diversifikasi komoditas panggang.
        </p>
      </div>

      {/* Embedded Video Demo Section (Target QR 9.1) */}
      <div id="video" className="industrial-panel rounded-lg p-6 sm:p-8 space-y-5 border-t-2 border-t-[#ff5500]">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-white/[0.08] pb-4">
          <div className="space-y-1">
            <div className="text-[10px] font-mono text-[#ff5500] uppercase tracking-widest font-bold">
              VIDEO DEMONSTRATION // DOKUMEN TEKNIS BAB IX (SEC 9.1)
            </div>
            <h2 className="font-display font-bold text-xl text-white">
              Demonstrasi Operasional Pemanggangan Kemplang Tunu
            </h2>
            <p className="text-xs text-neutral-400 font-sans">
              Rekaman pengujian pemanggangan langsung di atas bara arang aktif dengan mekanisme pembalik 6 servo.
            </p>
          </div>
          <a
            href={socials.youtube}
            target="_blank"
            rel="noreferrer"
            className="px-3.5 py-1.5 rounded bg-white text-black font-mono font-bold text-xs hover:bg-neutral-200 transition inline-flex items-center gap-1.5 shrink-0"
          >
            <span>WATCH ON YOUTUBE</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* 16:9 Iframe */}
        <div className="relative w-full aspect-video rounded overflow-hidden border border-white/[0.1] bg-black">
          <iframe
            src="https://www.youtube.com/embed/UZ4ZYx_NoIY"
            title="Video Demonstrasi INTAN PKM-KI Unpad"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        </div>
      </div>

      {/* 12 Media Publications Press Clipping Directory */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-white/[0.08] pb-3">
          <div>
            <div className="text-xs font-mono font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Newspaper className="w-4 h-4 text-neutral-400" /> PRESS ARCHIVE // 12 MEDIA COVERAGE CHANNELS
            </div>
            <p className="text-xs text-neutral-400 font-sans mt-0.5">Liputan publikasi media massa nasional dan regional (PPT Slide 27).</p>
          </div>
          <span className="text-[10px] font-mono text-neutral-400">12 SOURCES VERIFIED</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {mediaPublikasi.map((m, idx) => (
            <div key={idx} className="industrial-card rounded p-3.5 space-y-1">
              <span className="text-[10px] font-mono text-[#ff5500] uppercase block">{m.tag}</span>
              <div className="font-display font-bold text-sm text-white tracking-tight">{m.name}</div>
              <div className="text-[10px] font-mono text-neutral-500">COVERAGE ARCHIVED</div>
            </div>
          ))}
        </div>
      </div>

      {/* MoU Partners */}
      <div className="space-y-4">
        <div className="text-xs font-mono font-bold text-white uppercase tracking-wider border-b border-white/[0.08] pb-3 flex items-center gap-2">
          <Handshake className="w-4 h-4 text-emerald-400" /> DEPLOYMENT PARTNERSHIPS // MEMORANDUM OF UNDERSTANDING (MOU)
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mitraMou.map((mitra, idx) => (
            <div key={idx} className="industrial-panel rounded-lg p-6 space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[#ff5500] font-bold">{mitra.peran.toUpperCase()}</span>
                  <span className="text-emerald-400 font-semibold">{mitra.status}</span>
                </div>
                <h3 className="font-display font-extrabold text-xl text-white tracking-tight">{mitra.name}</h3>
                <div className="text-xs font-mono text-neutral-500">REPRESENTATIVE: {mitra.pic}</div>
                <p className="text-xs text-neutral-300 font-sans leading-relaxed pt-2 border-t border-white/[0.06]">
                  {mitra.deskripsi}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Commodity Diversification Modules */}
      <div className="industrial-panel rounded-lg p-6 sm:p-8 space-y-5">
        <div className="border-b border-white/[0.08] pb-3 space-y-1">
          <span className="text-[10px] font-mono text-[#ff5500] uppercase tracking-widest font-bold">
            COMMODITY ADAPTABILITY
          </span>
          <h2 className="font-display font-bold text-xl text-white">
            Peluang Diversifikasi Komoditas Panggang Nusantara
          </h2>
          <p className="text-xs text-neutral-400 font-sans">
            Sistem penjepit modular INTAN dapat diadaptasikan untuk komoditas panggang lain melalui penyesuaian kisi capitan.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {diversifikasiProduk.map((item, idx) => (
            <div key={idx} className="industrial-card rounded p-4 space-y-1.5">
              <div className="text-xs font-mono font-bold text-white uppercase">{item.name}</div>
              <p className="text-xs text-neutral-400 font-sans leading-relaxed">{item.deskripsi}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
