import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { metrics, systemModel, hki } from "@/data/site";
import Intan3DViewer from "@/components/3d/Intan3DViewer";

export default function HomePage() {
  return (
    <div className="bg-[#050505] text-[#ededed]">
      {/* Hero Section */}
      <section className="relative border-b border-white/[0.08] bg-tech-grid pt-12 pb-20 lg:pt-16 lg:pb-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          
          {/* Hardware Header Tag */}
          <div className="flex flex-wrap items-center gap-3 text-[11px] font-mono text-neutral-400 mb-6">
            <span className="text-[#ff5500] font-bold">SYSTEM OVERVIEW</span>
            <span>/</span>
            <span>{systemModel}</span>
            <span>/</span>
            <span className="text-neutral-500">HKI #{hki}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Column: Editorial Hardware Typography */}
            <div className="lg:col-span-5 space-y-5 sm:space-y-6">
              <h1 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl tracking-tight text-white leading-[1.08]">
                INTAN <span className="text-neutral-500">MK-II</span>
                <span className="block text-xl sm:text-3xl font-mono font-normal text-neutral-300 mt-2 tracking-normal">
                  Smart Rotary Roaster
                </span>
              </h1>

              <p className="text-xs sm:text-base text-neutral-400 leading-relaxed font-sans max-w-lg">
                Sistem pemanggangan kemplang tunu berotasi otomatis berbasis mikrokontroler. Mentransformasi kapasitas produksi hingga <strong className="text-white">400–420 keping/jam</strong> dengan kestabilan termal tertutup tanpa menghilangkan aroma bara arang autentik.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 pt-2">
                <Link
                  href="/produk"
                  className="inline-flex items-center justify-center gap-2 text-xs font-mono font-bold px-5 py-3 rounded bg-white text-black hover:bg-neutral-200 transition"
                >
                  <span>EXPLORE 3D STUDIO</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href="/riset"
                  className="inline-flex items-center justify-center gap-2 text-xs font-mono font-medium px-5 py-3 rounded bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.1] text-white transition"
                >
                  <span>VALIDATION DATA</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Hardware Highlights Line */}
              <div className="pt-4 border-t border-white/[0.06] flex flex-wrap gap-4 sm:gap-6 text-[10px] sm:text-[11px] font-mono text-neutral-400">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ff5500]" />
                  <span>SUS 304 FOOD-GRADE</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>TKT LEVEL 8 TESTED</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                  <span>HYSTERESIS 550–600°C</span>
                </div>
              </div>
            </div>

            {/* Right Column: 3D Viewport Framed */}
            <div className="lg:col-span-7">
              <Intan3DViewer compact={true} />
            </div>

          </div>
        </div>
      </section>

      {/* Numerical Benchmark Strip - Clean 2x2 grid on mobile & 4 cols on desktop */}
      <section className="border-b border-white/[0.08] bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.08]">
            {metrics.map((m) => (
              <div key={m.code} className="bg-[#0a0a0a] p-4 sm:p-6 space-y-1.5 sm:space-y-2">
                <div className="text-[9px] sm:text-[10px] font-mono tracking-widest text-neutral-500 uppercase truncate">
                  {m.code} {"//"} {m.label}
                </div>
                <div className="font-display font-extrabold text-2xl sm:text-4xl text-white tracking-tight tabular-numbers">
                  {m.value}{" "}
                  <span className="text-[10px] sm:text-xs font-mono font-normal text-neutral-400 ml-0.5 sm:ml-1">
                    {m.unit}
                  </span>
                </div>
                <div className="text-[10px] sm:text-xs text-neutral-400 font-mono">
                  {m.benchmark}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Engineering Comparison: Problem vs Architecture */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mb-12 space-y-2">
          <div className="text-[11px] font-mono text-[#ff5500] uppercase tracking-widest font-bold">
            01 // INDUSTRIAL PROBLEM &amp; SYSTEM ARCHITECTURE
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
            Memodernisasi Tradisi Tanpa Mengorbankan Cita Rasa
          </h2>
          <p className="text-sm text-neutral-400 leading-relaxed font-sans">
            Sebanyak 77.678 industri mikro dan kecil (IMK) di Sumatera Selatan (BPS Provinsi Sumatera Selatan, 2026) menghadapi keterbatasan kapasitas pemanggangan kemplang tunu konvensional yang mengandalkan tenaga manusia penuh di tengah paparan panas ekstrem.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Conventional Card */}
          <div className="industrial-card rounded-lg p-6 space-y-4">
            <div className="flex items-center justify-between text-xs font-mono text-neutral-400">
              <span className="text-rose-400 font-bold">CONVENTIONAL MANUAL METHOD</span>
              <span>BASELINE</span>
            </div>
            <div className="font-display font-bold text-xl text-white">
              Hambatan Produksi Tradisional
            </div>
            <ul className="space-y-3 text-xs sm:text-sm text-neutral-300 font-sans">
              <li className="flex items-start gap-2.5">
                <span className="text-rose-400 font-mono font-bold">✕</span>
                <span>Kapasitas terbatas <strong>80–100 keping/jam</strong> akibat keterbatasan fisik operator.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-rose-400 font-mono font-bold">✕</span>
                <span>Tingkat cacat dan gosong mencapai <strong>2% – 10%</strong> karena fluktuasi panas bara tak terukur.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-rose-400 font-mono font-bold">✕</span>
                <span>Paparan radiasi panas langsung (400°C–600°C) dan asap karbon monoksida (CO).</span>
              </li>
            </ul>
          </div>

          {/* INTAN Solution Card */}
          <div className="industrial-card rounded-lg p-6 space-y-4 border-l-2 border-l-[#ff5500]">
            <div className="flex items-center justify-between text-xs font-mono text-neutral-400">
              <span className="text-[#ff5500] font-bold">INTAN MK-II AUTOMATION</span>
              <span>SOLUTION</span>
            </div>
            <div className="font-display font-bold text-xl text-white">
              Otomasi Hibrida Arang-Mikrokontroler
            </div>
            <ul className="space-y-3 text-xs sm:text-sm text-neutral-300 font-sans">
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-[#ff5500] shrink-0 mt-0.5" />
                <span>Kapasitas melonjak hingga <strong>400–420 keping/jam</strong> dengan 6 rak penjepit serempak.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-[#ff5500] shrink-0 mt-0.5" />
                <span>Kendali histeresis dual blower (550°C–600°C) memangkas produk cacat hingga <strong>&lt; 5%</strong>.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-[#ff5500] shrink-0 mt-0.5" />
                <span>Mempertahankan bahan bakar bara arang alami untuk menghasilkan cita rasa <em>smoky</em> khas.</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Technical Callout Strip */}
        <div className="mt-12 p-6 rounded-lg bg-[#0d0d0d] border border-white/[0.08] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="text-xs font-mono text-neutral-400 uppercase tracking-wider">
              CAD BLUEPRINT &amp; SCHEMATIC VERIFICATION
            </div>
            <div className="font-display font-bold text-lg text-white">
              Pelajari Konstruksi Dimensi 124 cm &amp; Skema Wiring 3-Zona
            </div>
            <p className="text-xs text-neutral-400">
              Baja Stainless SUS 304 standar SNI 8753:2020 dan isolasi kelistrikan daya/logika.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/produk"
              className="px-4 py-2 rounded bg-white text-black font-mono font-bold text-xs hover:bg-neutral-200 transition"
            >
              BLUEPRINT // 3D
            </Link>
            <Link
              href="/teknologi"
              className="px-4 py-2 rounded bg-white/[0.06] hover:bg-white/[0.12] text-white font-mono text-xs border border-white/[0.1] transition"
            >
              ENGINEERING SPECS
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
