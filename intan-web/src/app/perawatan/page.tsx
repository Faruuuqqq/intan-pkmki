"use client";

import React, { useState } from "react";
import { jadwalPerawatan, matriksTroubleshooting, garansi4Lapis, garansiInfo } from "@/data/perawatanData";
import { Wrench } from "lucide-react";

export default function PerawatanPage() {
  const [tBaca, setTBaca] = useState<number>(101.5);
  const tRef = 100.0;
  const errorPercent = Math.abs((tBaca - tRef) / tRef) * 100;
  const isErrorValid = errorPercent <= 3.0;

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 space-y-12 bg-[#050505]">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-[11px] font-mono text-[#ff5500] uppercase tracking-widest font-bold">
          <span>MAINTENANCE &amp; WARRANTY // SECTION 05</span>
          <span className="text-neutral-600">/</span>
          <span className="text-neutral-400">SERVICE MANUAL</span>
        </div>
        <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
          Perawatan Berkala, Troubleshooting &amp; Garansi 4 Lapis
        </h1>
        <p className="text-sm text-neutral-400 max-w-2xl font-sans leading-relaxed">
          Protokol pemeliharaan preventif, matriks penanganan gangguan modular *plug-and-play*, uji galat kalibrasi termokopel, serta cadangan risiko garansi 4 lapis berbasis alokasi 10% profit kotor unit.
        </p>
      </div>

      {/* 3-Tier Periodic Maintenance Schedule */}
      <div className="space-y-4">
        <div className="text-xs font-mono font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <Wrench className="w-4 h-4 text-[#ff5500]" /> JADWAL PEMELIHARAAN PREVENTIF // DOKUMEN TEKNIS BAB V
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {jadwalPerawatan.map((item, idx) => (
            <div key={idx} className="industrial-panel rounded-lg p-6 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-white/[0.08] pb-2 text-xs font-mono">
                  <span className="text-[#ff5500] font-bold uppercase">{item.periode}</span>
                  <span className="text-neutral-500">{item.durasi}</span>
                </div>
                <ul className="space-y-2 text-xs text-neutral-300 font-sans">
                  {item.tugas.map((t, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-neutral-500 font-mono">›</span>
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="pt-2 border-t border-white/[0.06] text-[10px] font-mono text-neutral-400">
                NOTE // {item.catatan}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Thermocouple Calibration Simulator */}
      <div className="industrial-panel rounded-lg p-6 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-white/[0.08] pb-3">
          <div>
            <div className="text-xs font-mono font-bold text-white uppercase tracking-wider">
              CALIBRATION VERIFICATION // TYPE-K BOILING POINT TEST
            </div>
            <p className="text-xs text-neutral-400 font-sans mt-0.5">
              Simulasi perhitungan galat toleransi pembacaan sensor pada titik didih air (100°C) dengan batas toleransi E ≤ 3.0%.
            </p>
          </div>
          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="text-neutral-400">T_BACA:</span>
            <input
              type="number"
              step="0.1"
              value={tBaca}
              onChange={(e) => setTBaca(parseFloat(e.target.value) || 0)}
              className="w-20 px-2 py-1 rounded bg-[#050505] border border-white/[0.1] text-white font-mono text-xs tabular-numbers"
            />
            <span className="text-neutral-500">°C</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono text-[11px] sm:text-xs bg-[#050505] p-3 rounded border border-white/[0.06]">
          <div className="truncate">
            <span className="text-neutral-500">FORMULA: </span>
            <span className="text-neutral-200 font-bold">E = |(T_BACA - 100°C) / 100°C| × 100%</span>
          </div>
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <span>ERROR (E): <strong className={isErrorValid ? "text-emerald-400" : "text-rose-400"}>{errorPercent.toFixed(2)}%</strong></span>
            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
              isErrorValid
                ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
            }`}>
              {isErrorValid ? "CALIBRATED (E ≤ 3%)" : "RE-CALIBRATION REQUIRED"}
            </span>
          </div>
        </div>
      </div>

      {/* Troubleshooting Matrix */}
      <div className="industrial-panel rounded-lg p-4 sm:p-6 space-y-4">
        <div className="text-xs font-mono font-bold text-white uppercase tracking-wider border-b border-white/[0.08] pb-3">
          TROUBLESHOOTING MATRIX // MODULAR FAULT RECOVERY
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse font-sans min-w-[580px]">
            <thead>
              <tr className="border-b border-white/[0.08] text-[10px] font-mono text-neutral-400 uppercase tracking-wider">
                <th className="py-2.5 px-3">SEVERITY</th>
                <th className="py-2.5 px-3">FAULT SYMPTOM</th>
                <th className="py-2.5 px-3">ROOT CAUSE</th>
                <th className="py-2.5 px-3 font-mono text-white">REMEDY / ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {matriksTroubleshooting.map((item, idx) => (
                <tr key={idx} className="hover:bg-white/[0.02] transition">
                  <td className="py-3 px-3">
                    <span className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-bold ${
                      item.tingkat === "Minor"
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                        : item.tingkat === "Moderate"
                        ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                        : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                    }`}>
                      {item.tingkat.toUpperCase()}
                    </span>
                  </td>
                  <td className="py-3 px-3 font-medium text-white">{item.gejala}</td>
                  <td className="py-3 px-3 text-neutral-400">{item.kemungkinanPenyebab}</td>
                  <td className="py-3 px-3 text-neutral-200">{item.solusi}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4-Tier Warranty Schedule */}
      <div className="industrial-panel rounded-lg p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-white/[0.08] pb-4">
          <div>
            <div className="text-xs font-mono font-bold text-[#ff5500] uppercase tracking-wider">
              WARRANTY RESERVE SCHEDULE
            </div>
            <h2 className="font-display font-bold text-xl text-white">
              Skema Garansi 4 Lapis Berbasis Alokasi 10% Profit Kotor
            </h2>
            <p className="text-xs text-neutral-400 font-sans mt-0.5">
              Dialokasikan bulat Rp 542.081 per unit terjual tanpa membebani 90% profit bersih produsen.
            </p>
          </div>
          <span className="text-xs font-mono px-3 py-1 rounded bg-white/[0.05] border border-white/[0.1] text-emerald-400 font-bold">
            90% NET PROFIT SECURED
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {garansi4Lapis.map((g) => (
            <div key={g.lapis} className="industrial-card rounded p-5 space-y-3 flex flex-col justify-between">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[10px] font-mono">
                  <span className="text-[#ff5500] font-bold">TIER // 0{g.lapis}</span>
                  <span className="text-neutral-400">{g.durasi}</span>
                </div>
                <h3 className="font-display font-bold text-sm text-white tracking-tight">{g.nama}</h3>
                <p className="text-xs text-neutral-400 font-sans leading-relaxed">{g.cakupan}</p>
              </div>
              <div className="pt-2 border-t border-white/[0.06] space-y-1 font-mono text-[11px]">
                <div className="flex justify-between text-neutral-400">
                  <span>RESERVE:</span>
                  <span className="text-white font-bold">{g.alokasi}</span>
                </div>
                <div className="flex justify-between text-neutral-400">
                  <span>LIMIT:</span>
                  <span className="text-neutral-300">{g.maksKlaim}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-[11px] font-mono text-neutral-400 bg-white/[0.02] p-3 rounded border border-white/[0.04]">
          POLICY // {garansiInfo.ketentuan}
        </div>
      </div>
    </div>
  );
}
