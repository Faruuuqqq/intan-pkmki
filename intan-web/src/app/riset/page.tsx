"use client";

import React, { useState } from "react";
import { sampelUjiData, ringkasanUji, competitiveLandscape } from "@/data/sampelUji";


export default function RisetPage() {
  const [hours, setHours] = useState<number>(5);

  const minManual = hours * 80;
  const maxManual = hours * 100;
  const manualDefect = Math.round(((minManual + maxManual) / 2) * 0.1);
  const minIntan = hours * 400;
  const maxIntan = hours * 420;
  const monthlyIntan = maxIntan * 25;

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 space-y-12 bg-[#050505]">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-[11px] font-mono text-[#ff5500] uppercase tracking-widest font-bold">
          <span>VALIDATION // SECTION 03</span>
          <span className="text-neutral-600">/</span>
          <span className="text-neutral-400">EMPIRICAL BENCHMARKS</span>
        </div>
        <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
          Data Pengujian 6 Sampel &amp; Model Produktivitas
        </h1>
        <p className="text-sm text-neutral-400 max-w-2xl font-sans leading-relaxed">
          Hasil pencatatan telemetri pemanggangan kemplang tunu (data dokumen teknis &amp; PPT PIMNAS Hal. 22), perbandingan komparatif dengan metode konvensional, serta kalkulator skala ekonomi UMKM.
        </p>
      </div>

      {/* Summary Metrics Banner */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="industrial-card rounded p-4 space-y-1">
          <div className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider">MEAN CYCLE DURATION</div>
          <div className="font-display font-bold text-2xl text-white tabular-numbers">
            {ringkasanUji.rataWaktu} <span className="text-xs font-mono font-normal text-neutral-400">SEC</span>
          </div>
          <div className="text-[11px] font-mono text-neutral-400">Window: {ringkasanUji.rentangWaktu}</div>
        </div>

        <div className="industrial-card rounded p-4 space-y-1">
          <div className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider">MEAN OPERATING TEMP</div>
          <div className="font-display font-bold text-2xl text-[#ff5500] tabular-numbers">
            {ringkasanUji.rataSuhu} <span className="text-xs font-mono font-normal text-neutral-400">°C</span>
          </div>
          <div className="text-[11px] font-mono text-neutral-400">Setpoint: {ringkasanUji.rentangSuhuEvaluasi}</div>
        </div>

        <div className="industrial-card rounded p-4 space-y-1">
          <div className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider">ROAST UNIFORMITY</div>
          <div className="font-display font-bold text-2xl text-emerald-400 tabular-numbers">
            {ringkasanUji.keseragaman}
          </div>
          <div className="text-[11px] font-mono text-neutral-400">Defect Target: {ringkasanUji.defectRate}</div>
        </div>

        <div className="industrial-card rounded p-4 space-y-1">
          <div className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider">5-HR STRESS TEST</div>
          <div className="font-display font-bold text-2xl text-sky-400 tabular-numbers">
            PASS
          </div>
          <div className="text-[11px] font-mono text-neutral-400">ECU Temp: {ringkasanUji.suhuEcu}</div>
        </div>
      </div>

      {/* Laboratory Measurement Table */}
      <div className="industrial-panel rounded-lg p-4 sm:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-white/[0.08] pb-3">
          <div>
            <div className="text-xs font-mono font-bold text-white uppercase tracking-wider">
              MEASUREMENT LOG // 6-SAMPLE CHARCOAL ROASTING TRIAL
            </div>
            <p className="text-xs text-neutral-400 font-sans mt-0.5">Pengujian pemanggangan langsung kemplang tunu di atas bara arang aktif.</p>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold self-start sm:self-auto">
            100% PASS RATE
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse font-mono min-w-[580px]">
            <thead>
              <tr className="border-b border-white/[0.08] text-neutral-400 uppercase tracking-wider">
                <th className="py-2.5 px-3">SAMPLE ID</th>
                <th className="py-2.5 px-3">STATUS</th>
                <th className="py-2.5 px-3">CYCLE TIME</th>
                <th className="py-2.5 px-3">CHAMBER TEMP</th>
                <th className="py-2.5 px-3 font-sans">SYSTEM BEHAVIOR / OBSERVATION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {sampelUjiData.map((item) => (
                <tr key={item.id} className="hover:bg-white/[0.02] transition">
                  <td className="py-3 px-3 text-white font-bold">BATCH_0{item.id}</td>
                  <td className="py-3 px-3">
                    <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                      {item.status}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-neutral-200 tabular-numbers">{item.waktu} SEC</td>
                  <td className="py-3 px-3 tabular-numbers">
                    <span className={item.suhu >= 600 ? "text-rose-400 font-bold" : "text-neutral-300"}>
                      {item.suhu} °C {item.suhu >= 600 && "[CUT-OFF]"}
                    </span>
                  </td>
                  <td className="py-3 px-3 font-sans text-neutral-300">{item.keterangan}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* UMKM Operational Model Calculator */}
      <div className="industrial-panel rounded-lg p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-4">
          <div className="space-y-1">
            <div className="text-xs font-mono font-bold text-[#ff5500] uppercase tracking-wider">
              OPERATIONAL THROUGHPUT MODEL
            </div>
            <h2 className="font-display font-bold text-xl text-white">
              Kalkulator Simulasi Kapasitas &amp; Penghematan Kerusakan
            </h2>
            <p className="text-xs text-neutral-400 font-sans">
              Geser durasi jam kerja harian untuk melihat perbandingan kapasitas dan estimasi pencegahan produk reject.
            </p>
          </div>
          <div className="font-mono text-xs bg-white/[0.05] border border-white/[0.1] px-4 py-2 rounded text-right">
            <span className="text-neutral-400 block text-[10px]">DAILY WORK HOURS:</span>
            <span className="text-white font-bold text-base tabular-numbers">{hours} HRS / DAY</span>
          </div>
        </div>

        {/* Range Slider */}
        <div className="space-y-2">
          <div className="flex justify-between text-[11px] font-mono text-neutral-400">
            <span>1 HOUR</span>
            <span>4 HOURS</span>
            <span>8 HOURS (FULL SHIFT)</span>
          </div>
          <input
            type="range"
            min={1}
            max={8}
            value={hours}
            onChange={(e) => setHours(parseInt(e.target.value, 10))}
            className="w-full h-1.5 bg-neutral-800 rounded appearance-none cursor-pointer"
          />
        </div>

        {/* Output Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          
          {/* Manual Card */}
          <div className="industrial-card rounded p-5 space-y-3 border-l-2 border-l-rose-500">
            <div className="text-[10px] font-mono text-rose-400 uppercase tracking-wider font-bold">
              CONVENTIONAL MANUAL PRODUCTION
            </div>
            <div className="space-y-1">
              <span className="text-xs text-neutral-400 font-mono">DAILY YIELD:</span>
              <div className="font-display font-bold text-2xl text-white tabular-numbers">
                {minManual.toLocaleString("id-ID")} – {maxManual.toLocaleString("id-ID")}{" "}
                <span className="text-xs font-mono font-normal text-neutral-400">PCS / DAY</span>
              </div>
            </div>
            <div className="pt-2 border-t border-white/[0.06] text-xs font-mono text-rose-300">
              EST. REJECT / GOSONG (~10%): <strong className="text-white tabular-numbers">~{manualDefect.toLocaleString("id-ID")} pcs</strong>
            </div>
          </div>

          {/* INTAN Card */}
          <div className="industrial-card rounded p-5 space-y-3 border-l-2 border-l-[#ff5500]">
            <div className="text-[10px] font-mono text-[#ff5500] uppercase tracking-wider font-bold">
              INTAN AUTOMATED PRODUCTION
            </div>
            <div className="space-y-1">
              <span className="text-xs text-neutral-400 font-mono">DAILY YIELD:</span>
              <div className="font-display font-bold text-2xl text-white tabular-numbers">
                {minIntan.toLocaleString("id-ID")} – {maxIntan.toLocaleString("id-ID")}{" "}
                <span className="text-xs font-mono font-normal text-neutral-400">PCS / DAY</span>
              </div>
            </div>
            <div className="pt-2 border-t border-white/[0.06] flex justify-between text-xs font-mono text-neutral-300">
              <span>MONTHLY PROJECTION (25 DAYS):</span>
              <strong className="text-emerald-400 tabular-numbers">{monthlyIntan.toLocaleString("id-ID")} PCS</strong>
            </div>
          </div>

        </div>

        <div className="text-xs font-mono text-neutral-400 bg-white/[0.02] p-3 rounded border border-white/[0.04]">
          ANALYSIS // Mesin INTAN memberikan peningkatan kapasitas produksi neto sebesar &gt;400% sekaligus membatasi risiko kerugian akibat kemplang gosong melengkung hingga di bawah 5%.
        </div>
      </div>

      {/* Comparative Specification Landscape */}
      <div className="industrial-panel rounded-lg p-4 sm:p-6 space-y-4">
        <div className="text-xs font-mono font-bold text-white uppercase tracking-wider border-b border-white/[0.08] pb-3">
          COMPARATIVE BENCHMARK // MANUAL VS INTAN MK-II
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse font-sans min-w-[520px]">
            <thead>
              <tr className="border-b border-white/[0.08] text-[10px] font-mono text-neutral-400 uppercase tracking-wider">
                <th className="py-2.5 px-3">EVALUATION METRIC</th>
                <th className="py-2.5 px-3">CONVENTIONAL MANUAL</th>
                <th className="py-2.5 px-3 text-[#ff5500] font-bold">INTAN SPECIFICATION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04] text-xs">
              {competitiveLandscape.map((row, idx) => (
                <tr key={idx} className="hover:bg-white/[0.02] transition">
                  <td className="py-3 px-3 font-mono font-medium text-white">{row.parameter}</td>
                  <td className="py-3 px-3 text-neutral-400">{row.konvensional}</td>
                  <td className="py-3 px-3 text-neutral-200 font-medium">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#ff5500] mr-2" />
                    {row.intan}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
