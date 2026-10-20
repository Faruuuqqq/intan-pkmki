"use client";

import React, { useState } from "react";
import { sopSteps, emergencySteps, dosAndDonts, type SopPhase } from "@/data/sopData";
import { AlertOctagon, Check, X, ShieldAlert } from "lucide-react";

export default function SopPage() {
  const [filterPhase, setFilterPhase] = useState<SopPhase>("all");

  const filteredSteps =
    filterPhase === "all" ? sopSteps : sopSteps.filter((s) => s.phase === filterPhase);

  const phases = [
    { key: "all", label: "ALL // 12 STEPS" },
    { key: "fase1", label: "PHASE 01 // SETUP" },
    { key: "fase2", label: "PHASE 02 // CHARCOAL" },
    { key: "fase3", label: "PHASE 03 // ROASTING" },
    { key: "fase4", label: "PHASE 04 // POST-OP" },
  ] as const;

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 space-y-12 bg-[#050505]">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-[11px] font-mono text-[#ff5500] uppercase tracking-widest font-bold">
          <span>OPERATIONS // MANUAL 9.2</span>
          <span className="text-neutral-600">/</span>
          <span className="text-neutral-400">QR CODE DIRECT ACCESS</span>
        </div>
        <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
          Standard Operating Procedure (SOP) &amp; Protokol K3
        </h1>
        <p className="text-sm text-neutral-400 max-w-2xl font-sans leading-relaxed">
          Buku saku digital 12 tahapan operasional resmi mesin INTAN (Dokumen Teknis Bab IV). Panduan penanganan bahan bakar, kalibrasi termal, dan kepatuhan keselamatan kerja di area semi-outdoor.
        </p>
      </div>

      {/* Phase Segmented Selector */}
      <div className="flex items-center gap-2 overflow-x-auto scrollbar-none border-b border-white/[0.08] pb-3 font-mono text-xs">
        {phases.map((p) => {
          const active = filterPhase === p.key;
          return (
            <button
              key={p.key}
              onClick={() => setFilterPhase(p.key as SopPhase)}
              className={`px-3.5 py-1.5 rounded text-xs font-bold shrink-0 transition ${
                active
                  ? "bg-white text-black"
                  : "bg-white/[0.04] text-neutral-400 hover:text-white hover:bg-white/[0.08] border border-white/[0.06]"
              }`}
            >
              {p.label}
            </button>
          );
        })}
      </div>

      {/* 12 Steps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredSteps.map((step) => (
          <div key={step.step} className="industrial-panel rounded-lg p-5 flex flex-col justify-between space-y-4">
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-[11px] font-mono border-b border-white/[0.06] pb-2">
                <span className="text-[#ff5500] font-bold">
                  STEP // {step.step.toString().padStart(2, "0")}
                </span>
                <span className="text-neutral-500 uppercase tracking-wider">{step.phaseName}</span>
              </div>
              <h2 className="font-display font-bold text-white text-base tracking-tight">{step.title}</h2>
              <p className="text-xs text-neutral-400 font-sans leading-relaxed">{step.desc}</p>
            </div>
            <div className="pt-2 border-t border-white/[0.04] text-[10px] font-mono text-neutral-500 flex justify-between">
              <span>BAB IV SEC 4.2</span>
              <span>COMPLIANCE VERIFIED</span>
            </div>
          </div>
        ))}
      </div>

      {/* K3 Semi-Outdoor Protocol Banner */}
      <div className="p-6 rounded-lg bg-[#0d0d0d] border border-amber-500/30 space-y-3">
        <div className="flex items-center gap-3">
          <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0" />
          <h2 className="font-display font-bold text-base text-white">
            Persyaratan Keselamatan Kerja (K3) Lingkungan Semi-Outdoor
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-neutral-300 font-sans leading-relaxed">
          Pengoperasian mesin INTAN <strong>wajib dilakukan di area semi-outdoor</strong> (ruang berventilasi terbuka lebar beratap). Langkah ini mengeliminasi risiko penumpukan gas Karbon Monoksida (CO) dari bara arang serta melindungi modul elektronik mikrokontroler dari cipratan air hujan. Pastikan suplai daya PLN AC 220V terpasang kabel pentanahan (*grounding arde*).
        </p>
      </div>

      {/* Emergency Protocol & Do's/Don'ts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* 5 Emergency Shutdown Steps */}
        <div className="industrial-panel rounded-lg p-6 space-y-4">
          <div className="flex items-center gap-2 text-rose-400 font-mono text-xs font-bold border-b border-white/[0.08] pb-3">
            <AlertOctagon className="w-4 h-4" />
            <span>EMERGENCY SHUTDOWN PROTOCOL (5 STEPS)</span>
          </div>
          <ol className="space-y-3 text-xs text-neutral-300 font-sans">
            {emergencySteps.map((step, idx) => (
              <li key={idx} className="flex items-start gap-3 p-3 rounded bg-[#080808] border border-white/[0.04]">
                <span className="font-mono text-rose-400 font-bold text-xs shrink-0">
                  0{idx + 1}.
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* Operating Do's & Don'ts */}
        <div className="industrial-panel rounded-lg p-6 space-y-4">
          <div className="text-neutral-300 font-mono text-xs font-bold border-b border-white/[0.08] pb-3">
            OPERATIONAL COMPLIANCE CHECKLIST
          </div>

          <div className="space-y-4 text-xs font-sans">
            <div className="space-y-2">
              <span className="text-[11px] font-mono text-emerald-400 font-bold uppercase block tracking-wider">
                MANDATORY ACTIONS (DO&apos;S):
              </span>
              <ul className="space-y-1.5 text-neutral-300">
                {dosAndDonts.dos.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-2 border-t border-white/[0.06] pt-3">
              <span className="text-[11px] font-mono text-rose-400 font-bold uppercase block tracking-wider">
                STRICTLY PROHIBITED (DON&apos;TS):
              </span>
              <ul className="space-y-1.5 text-neutral-300">
                {dosAndDonts.donts.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <X className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
