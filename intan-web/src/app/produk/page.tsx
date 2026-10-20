"use client";

import React, { useState } from "react";
import Intan3DViewer from "@/components/3d/Intan3DViewer";
import { Cpu, Shield, FileText } from "lucide-react";

export default function ProdukPage() {
  const [activeTab, setActiveTab] = useState<"dimensi" | "wiring">("dimensi");

  const techSpecs = [
    { label: "NOMINAL CAPACITY", value: "400–420", unit: "PCS / HOUR", note: "6 racks / 46.5s cycle" },
    { label: "OPERATING VOLTAGE", value: "220V AC / 5V DC", unit: "DUAL VOLTAGE", note: "Isolated 3-Zone Supply" },
    { label: "THERMAL HYSTERESIS", value: "550°C – 600°C", unit: "SETPOINT", note: "Thermocouple Feedback" },
    { label: "CHASSIS MASS", value: "25.0", unit: "KG (PORTABLE)", note: "4 Caster Wheels" },
    { label: "POWER DRAW", value: "150–200", unit: "WATTS ELECTRICAL", note: "Excludes Charcoal Heat" },
    { label: "CONTINUOUS RUNTIME", value: "4–5", unit: "HOURS / BATCH", note: "ECU Thermal < 48°C" },
  ];

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 space-y-12 bg-[#050505]">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-[11px] font-mono text-[#ff5500] uppercase tracking-widest font-bold">
          <span>SPECIFICATION // SECTION 02</span>
          <span className="text-neutral-600">/</span>
          <span className="text-neutral-400">CAD MODEL VERIFICATION</span>
        </div>
        <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
          Anatomi 3D, Material Pangan &amp; Blueprint Dimensi
        </h1>
        <p className="text-sm text-neutral-400 max-w-2xl font-sans leading-relaxed">
          Model digital twin 3D skala 1:1 direkonstruksi presisi dari dokumen CAD (1240 × 300 × 300 mm). Spesifikasi material baja tahan karat mengacu acuan mutu SNI 8753:2020 dan ASTM A240.
        </p>
      </div>

      {/* 3D Hardware Viewport */}
      <Intan3DViewer compact={false} />

      {/* Engineering Datasheet Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="text-xs font-mono font-bold text-neutral-300 uppercase tracking-wider flex items-center gap-2">
            <Cpu className="w-4 h-4 text-[#ff5500]" /> TECHNICAL DATASHEET // DOKUMEN TEKNIS BAB II
          </div>
          <span className="text-[11px] font-mono text-neutral-500">REV 2.0 / 2026</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {techSpecs.map((spec, i) => (
            <div key={i} className="industrial-card rounded p-4 space-y-1">
              <div className="text-[10px] font-mono text-neutral-500 tracking-wider uppercase">{spec.label}</div>
              <div className="font-display font-bold text-white text-base tracking-tight tabular-numbers">
                {spec.value}
              </div>
              <div className="text-[10px] font-mono text-[#ff5500] font-bold">{spec.unit}</div>
              <div className="text-[10px] text-neutral-400 font-sans pt-1 border-t border-white/[0.04]">
                {spec.note}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Materials & Blueprint Tabs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Material Compliance Card */}
        <div className="lg:col-span-5 industrial-panel rounded-lg p-6 space-y-5">
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
            <div className="font-display font-bold text-base text-white flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-400" /> Standar Mutu Material
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
              SNI 8753:2020 COMPLIANT
            </span>
          </div>

          <div className="space-y-4 text-xs font-sans text-neutral-300">
            <div className="space-y-1">
              <div className="flex justify-between font-mono font-bold text-white text-xs">
                <span>01. Plat Stainless Steel SUS 304</span>
                <span className="text-neutral-500">ASTM A240</span>
              </div>
              <p className="text-neutral-400 leading-relaxed">
                Struktur bodi utama dan palung pembakaran. Bebas korosi, higienis untuk kontak pangan (*food-grade*), dan tahan pembersihan harian.
              </p>
            </div>

            <div className="space-y-1 border-t border-white/[0.06] pt-3">
              <div className="flex justify-between font-mono font-bold text-white text-xs">
                <span>02. Pipa &amp; Kawat Penjepit SUS 304</span>
                <span className="text-neutral-500">ASTM A312</span>
              </div>
              <p className="text-neutral-400 leading-relaxed">
                Poros transmisi torsi dari motor servo ke kemplang. Tahan radiasi panas 600°C dan bersifat *detachable* (dapat dilepas untuk pencucian).
              </p>
            </div>

            <div className="space-y-1 border-t border-white/[0.06] pt-3">
              <div className="flex justify-between font-mono font-bold text-white text-xs">
                <span>03. Plat Aluminium Casing Luar</span>
                <span className="text-neutral-500">ASTM B209</span>
              </div>
              <p className="text-neutral-400 leading-relaxed">
                Panel penutup luar yang ringan dan memiliki konduktivitas termal stabil untuk meredam pemanasan kotak kontrol ECU.
              </p>
            </div>
          </div>
        </div>

        {/* Blueprint & Wiring Vector Tab */}
        <div className="lg:col-span-7 industrial-panel rounded-lg p-4 sm:p-6 space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-white/[0.08] pb-3">
            <div className="font-display font-bold text-base text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-sky-400 shrink-0" />
              <span>Skema Rekayasa Teknis</span>
            </div>
            <div className="flex gap-1.5 font-mono text-xs w-full sm:w-auto">
              <button
                onClick={() => setActiveTab("dimensi")}
                className={`flex-1 sm:flex-none px-3 py-1.5 rounded text-[10px] sm:text-[11px] font-bold transition text-center ${
                  activeTab === "dimensi" ? "bg-white text-black" : "bg-white/[0.05] text-neutral-400 hover:text-white"
                }`}
              >
                DIMENSI (1240 MM)
              </button>
              <button
                onClick={() => setActiveTab("wiring")}
                className={`flex-1 sm:flex-none px-3 py-1.5 rounded text-[10px] sm:text-[11px] font-bold transition text-center ${
                  activeTab === "wiring" ? "bg-white text-black" : "bg-white/[0.05] text-neutral-400 hover:text-white"
                }`}
              >
                WIRING SCHEMATIC
              </button>
            </div>
          </div>

          {/* SVG Canvas */}
          {activeTab === "dimensi" ? (
            <div className="bg-[#050505] rounded p-4 border border-white/[0.06]">
              <svg viewBox="0 0 520 220" className="w-full h-auto">
                <defs>
                  <pattern id="bpGridProd" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="1" />
                  </pattern>
                </defs>
                <rect width="520" height="220" fill="url(#bpGridProd)" rx="4" />
                
                {/* 124 cm Dimension line */}
                <line x1="40" y1="25" x2="480" y2="25" stroke="#38bdf8" strokeWidth="1.5" />
                <line x1="40" y1="18" x2="40" y2="55" stroke="#38bdf8" strokeWidth="1" strokeDasharray="3,3" />
                <line x1="480" y1="18" x2="480" y2="55" stroke="#38bdf8" strokeWidth="1" strokeDasharray="3,3" />
                <rect x="215" y="13" width="90" height="20" fill="#000000" rx="2" />
                <text x="260" y="27" fill="#38bdf8" fontSize="10" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
                  TOTAL: 1240 MM
                </text>

                {/* Sub Dimensions */}
                <line x1="90" y1="48" x2="430" y2="48" stroke="#ff5500" strokeWidth="1.2" />
                <text x="65" y="45" fill="#71717a" fontSize="9" fontFamily="monospace" textAnchor="middle">120MM</text>
                <text x="260" y="45" fill="#ff5500" fontSize="10" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
                  TUNGKU UTAMA: 1000 MM
                </text>
                <text x="455" y="45" fill="#71717a" fontSize="9" fontFamily="monospace" textAnchor="middle">120MM</text>

                {/* Blowers */}
                <circle cx="65" cy="110" r="24" fill="#18181b" stroke="#71717a" strokeWidth="1.5" />
                <circle cx="65" cy="110" r="10" fill="#09090b" stroke="#38bdf8" strokeWidth="1" />
                <rect x="65" y="124" width="25" height="12" fill="#27272a" stroke="#71717a" />

                <circle cx="455" cy="110" r="24" fill="#18181b" stroke="#71717a" strokeWidth="1.5" />
                <circle cx="455" cy="110" r="10" fill="#09090b" stroke="#38bdf8" strokeWidth="1" />
                <rect x="430" y="124" width="25" height="12" fill="#27272a" stroke="#71717a" />

                {/* Main Body */}
                <rect x="90" y="65" width="340" height="95" fill="#18181b" stroke="#52525b" strokeWidth="1.5" />
                <line x1="90" y1="98" x2="430" y2="98" stroke="#ff5500" strokeWidth="1" strokeDasharray="4,4" />

                {/* Drawers */}
                <rect x="96" y="104" width="160" height="50" fill="#09090b" stroke="#3f3f46" strokeWidth="1" />
                <circle cx="176" cy="129" r="5" fill="#ff5500" />
                <rect x="264" y="104" width="160" height="50" fill="#09090b" stroke="#3f3f46" strokeWidth="1" />
                <circle cx="344" cy="129" r="5" fill="#ff5500" />

                {/* Wheels */}
                <circle cx="110" cy="172" r="7" fill="#ef4444" stroke="#ffffff" strokeWidth="1" />
                <circle cx="410" cy="172" r="7" fill="#ef4444" stroke="#ffffff" strokeWidth="1" />

                <text x="498" y="88" fill="#e4e4e7" fontSize="8" fontFamily="monospace">100MM</text>
                <text x="498" y="132" fill="#38bdf8" fontSize="8" fontFamily="monospace">200MM</text>
                <text x="498" y="175" fill="#ef4444" fontSize="8" fontFamily="monospace">100MM</text>
                <text x="260" y="204" fill="#71717a" fontSize="9" fontFamily="monospace" textAnchor="middle">
                  BLUEPRINT CAD INTAN-2026-REV2
                </text>
              </svg>
            </div>
          ) : (
            <div className="bg-[#050505] rounded p-4 border border-white/[0.06]">
              <svg viewBox="0 0 520 220" className="w-full h-auto">
                <rect width="520" height="220" fill="#09090b" rx="4" />
                <rect x="195" y="85" width="110" height="50" rx="4" fill="#0f172a" stroke="#38bdf8" strokeWidth="1.5" />
                <text x="250" y="107" fill="#ffffff" fontSize="10" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                  ARDUINO NANO
                </text>
                <text x="250" y="122" fill="#94a3b8" fontSize="8" fontFamily="monospace" textAnchor="middle">
                  ATmega328P (millis)
                </text>

                {/* 6 Servos */}
                <g transform="translate(30, 15)">
                  {[1, 2, 3, 4, 5, 6].map((num, i) => (
                    <g key={num} transform={`translate(${i * 55}, 0)`}>
                      <rect width="48" height="28" rx="2" fill="#18181b" stroke="#eab308" strokeWidth="1" />
                      <text x="24" y="18" fill="#eab308" fontSize="8" fontFamily="monospace" textAnchor="middle">
                        SERVO {num}
                      </text>
                    </g>
                  ))}
                </g>
                <path d="M 250 85 L 250 60 L 55 60 L 55 43 M 110 60 L 110 43 M 165 60 L 165 43 M 220 60 L 220 43 M 275 60 L 275 43 M 330 60 L 330 43" stroke="#eab308" strokeWidth="1.2" fill="none" />

                {/* MAX6675 */}
                <rect x="380" y="25" width="115" height="42" rx="4" fill="#022c22" stroke="#10b981" strokeWidth="1.2" />
                <text x="437" y="43" fill="#a7f3d0" fontSize="9" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                  MAX6675 + TIPE-K
                </text>
                <text x="437" y="57" fill="#6ee7b7" fontSize="8" fontFamily="monospace" textAnchor="middle">
                  SPI Bus (Suhu Bara)
                </text>
                <path d="M 305 100 L 350 100 L 350 46 L 380 46" stroke="#10b981" strokeWidth="1.2" fill="none" />

                {/* LCD */}
                <rect x="30" y="150" width="125" height="45" rx="4" fill="#172554" stroke="#60a5fa" strokeWidth="1.2" />
                <text x="92" y="170" fill="#eff6ff" fontSize="9" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                  LCD I2C DISPLAY
                </text>
                <text x="92" y="184" fill="#93c5fd" fontSize="8" fontFamily="monospace" textAnchor="middle">
                  SDA/SCL (Telemetry)
                </text>
                <path d="M 195 115 L 92 115 L 92 150" stroke="#60a5fa" strokeWidth="1.2" fill="none" />

                {/* Relay */}
                <rect x="195" y="155" width="120" height="42" rx="4" fill="#431407" stroke="#fb923c" strokeWidth="1.2" />
                <text x="255" y="173" fill="#ffedd5" fontSize="9" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                  RELAY 2-CH OPTO
                </text>
                <text x="255" y="187" fill="#fdba74" fontSize="8" fontFamily="monospace" textAnchor="middle">
                  2x Blower + Dimmer
                </text>
                <line x1="250" y1="135" x2="250" y2="155" stroke="#fb923c" strokeWidth="1.2" />

                {/* PSU */}
                <rect x="375" y="145" width="120" height="52" rx="4" fill="#1e293b" stroke="#f43f5e" strokeWidth="1.2" />
                <text x="435" y="167" fill="#ffe4e6" fontSize="9" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                  PSU SWITCHING 5V
                </text>
                <text x="435" y="182" fill="#fda4af" fontSize="8" fontFamily="monospace" textAnchor="middle">
                  Isolasi 3-Zona Daya
                </text>
                <path d="M 375 170 L 315 170 M 375 120 L 305 120" stroke="#f43f5e" strokeWidth="1.2" fill="none" />
              </svg>
            </div>
          )}

          <div className="text-[11px] font-mono text-neutral-400">
            CONNECTIVITY // Modular plug-and-play wiring harnesses prevent soldering requirements during maintenance.
          </div>
        </div>

      </div>
    </div>
  );
}
