import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function TeknologiPage() {
  const pilarTeknologi = [
    {
      code: "ACT-01",
      title: "Staggered Rotary Gripper Actuation",
      sub: "PREVENTION OF INRUSH CURRENT & VOLTAGE SAG",
      desc:
        "Keenam rak kemplang diputar secara bertahap dengan jeda asinkron 30 milidetik per servo. Pendekatan ini mencegah penarikan arus kejut simultan yang dapat menyebabkan penurunan tegangan (voltage dip) pada rel daya mikrokontroler.",
      specs: "6x TowerPro MG996R Metal Gear • Stall Torque 11 kg·cm • 180° Travel / 15s Interval",
    },
    {
      code: "HYST-02",
      title: "Closed-Loop Hybrid Hysteresis Regulation",
      sub: "THERMAL SETPOINTS: 550°C LOWER / 600°C UPPER",
      desc:
        "Memadukan radiasi panas bara arang alami dengan regulasi oksigen paksa via dual blower sentrifugal. Saat sensor termokopel mendeteksi suhu ≥ 600°C, relay memutus suplai blower seketika untuk mencegah arang membara liar.",
      specs: "Type-K Thermocouple • MAX6675 SPI Bus • Dual 150W Snail Blowers • Optocoupled Relay",
    },
    {
      code: "FMW-03",
      title: "Non-Blocking Async Firmware Architecture",
      sub: "TASK MULTIPLEXING VIA MILLIS() TIMEBASING",
      desc:
        "Firmware Arduino Nano dioptimalkan tanpa pemanggilan delay() penghambat CPU. Sistem mengeksekusi multiplexing tugas simultan: perhitungan siklus gerak servo, polling berkala sensor SPI, dan rendering data pada layar LCD I2C.",
      specs: "Arduino Nano V3.0 (ATmega328P 16MHz) • Zero-Blocking Logic • Watchdog Timer Protected",
    },
    {
      code: "PWR-04",
      title: "Galvanic 3-Zone Power Isolation",
      sub: "ELIMINATION OF ELECTROMAGNETIC INTERFERENCE (EMI)",
      desc:
        "Pemisahan fisik tiga kompartemen daya: Zona 1 Arus Kuat AC 220V (blower & dimmer), Zona 2 Arus Menengah DC 5V/10A (aktuator motor servo), dan Zona 3 Sinyal Logika Rendah DC 5V (mikrokontroler & sensor) dengan proteksi optoisolasi.",
      specs: "Industrial Switching PSU 5V/10A • Optoisolated Logic Bus • Ceramic Fuse Protection",
    },
  ];

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 space-y-12 bg-[#050505]">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-[11px] font-mono text-[#ff5500] uppercase tracking-widest font-bold">
          <span>ENGINEERING // ARCHITECTURE</span>
          <span className="text-neutral-600">/</span>
          <span className="text-neutral-400">CONTROL SYSTEM DESIGN</span>
        </div>
        <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
          Arsitektur Kendali &amp; Rekayasa Sistem INTAN
        </h1>
        <p className="text-sm text-neutral-400 max-w-2xl font-sans leading-relaxed">
          Mengintegrasikan kekuatan mekanis baja tahan karat SUS 304, logika penjadwalan non-blocking mikrokontroler, dan kendali termal histeresis tertutup parsial (*partial closed-loop*).
        </p>
      </div>

      {/* 4 Core Engineering Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {pilarTeknologi.map((p) => (
          <div key={p.code} className="industrial-panel rounded-lg p-6 space-y-4 flex flex-col justify-between">
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-[#ff5500] font-bold">{p.code}</span>
                <span className="text-neutral-500 uppercase tracking-widest text-[10px]">CORE ARCHITECTURE</span>
              </div>
              <h2 className="font-display font-bold text-lg text-white tracking-tight">{p.title}</h2>
              <div className="text-[10px] font-mono text-neutral-400 font-semibold">{p.sub}</div>
              <p className="text-xs text-neutral-300 font-sans leading-relaxed pt-1">{p.desc}</p>
            </div>
            <div className="pt-3 border-t border-white/[0.06] text-[11px] font-mono text-neutral-400">
              SPEC // {p.specs}
            </div>
          </div>
        ))}
      </div>

      {/* Closed-Loop Sequence Flow */}
      <div className="industrial-panel rounded-lg p-6 sm:p-8 space-y-6">
        <div className="border-b border-white/[0.08] pb-3 flex items-center justify-between">
          <div className="text-xs font-mono font-bold text-white uppercase tracking-wider">
            SYSTEM CONTROL CYCLE // CLOSED-LOOP FLOW
          </div>
          <span className="text-[11px] font-mono text-neutral-500">BAB I SEC 1.6</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded bg-[#09090b] border border-white/[0.06] space-y-2">
            <span className="text-[10px] font-mono text-[#ff5500] font-bold">SEQUENCE 01</span>
            <div className="font-display font-bold text-sm text-white">SPI Temp Acquisition</div>
            <p className="text-xs text-neutral-400 font-sans leading-relaxed">
              MAX6675 membaca tegangan termokopel Tipe-K di ruang bakar secara berkala tiap loop.
            </p>
          </div>

          <div className="p-4 rounded bg-[#09090b] border border-white/[0.06] space-y-2">
            <span className="text-[10px] font-mono text-[#ff5500] font-bold">SEQUENCE 02</span>
            <div className="font-display font-bold text-sm text-white">Hysteresis Evaluation</div>
            <p className="text-xs text-neutral-400 font-sans leading-relaxed">
              Jika T ≥ 600°C → Relay Cut-Off Blower. Jika T ≤ 550°C → Blower re-activated.
            </p>
          </div>

          <div className="p-4 rounded bg-[#09090b] border border-white/[0.06] space-y-2">
            <span className="text-[10px] font-mono text-[#ff5500] font-bold">SEQUENCE 03</span>
            <div className="font-display font-bold text-sm text-white">Staggered Servo Flip</div>
            <p className="text-xs text-neutral-400 font-sans leading-relaxed">
              Setiap interval 15 detik, motor servo 1 hingga 6 berputar 180° berurutan dengan jeda 30 ms.
            </p>
          </div>

          <div className="p-4 rounded bg-[#09090b] border border-white/[0.06] space-y-2">
            <span className="text-[10px] font-mono text-[#ff5500] font-bold">SEQUENCE 04</span>
            <div className="font-display font-bold text-sm text-white">Uniform Expansion</div>
            <p className="text-xs text-neutral-400 font-sans leading-relaxed">
              Kemplang tunu mekar merata sempurna pada durasi rata-rata 46,5 detik per siklus.
            </p>
          </div>
        </div>

        <div className="pt-4 border-t border-white/[0.06] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <span className="text-xs font-mono text-neutral-400">
            VALIDATION // Simulasikan logika histeresis dan kendali servo pada model digital twin 3D.
          </span>
          <Link
            href="/produk"
            className="px-4 py-2 rounded bg-white text-black font-mono font-bold text-xs hover:bg-neutral-200 transition inline-flex items-center gap-1.5"
          >
            <span>TEST IN 3D VIEWPORT</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
