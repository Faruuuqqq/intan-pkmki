"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { navLinks, hki, systemModel } from "@/data/site";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* Precision System Metadata Bar */}
      <div className="bg-[#050505] border-b border-white/[0.06] text-[10px] font-mono text-neutral-400 py-1.5 px-3 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 truncate">
            <span className="text-white font-bold tracking-wider shrink-0">{systemModel}</span>
            <span className="text-neutral-600 shrink-0">/</span>
            <span className="tracking-wide text-neutral-400 truncate">SMART ROTARY ROASTER</span>
            <span className="hidden md:inline text-neutral-600">/</span>
            <span className="hidden md:inline text-neutral-400">UNIVERSITAS PADJADJARAN</span>
          </div>
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            <span className="inline-flex items-center gap-1.5 text-emerald-400 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              TKT 8
            </span>
            <span className="text-neutral-600 hidden sm:inline">|</span>
            <span className="text-neutral-300 hidden sm:inline">HKI: {hki}</span>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <header className="sticky top-0 z-40 bg-[#0a0a0a]/95 backdrop-blur-md border-b border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          
          {/* Brand Wordmark */}
          <Link href="/" className="flex items-center gap-2.5 group" onClick={() => setOpen(false)}>
            <div className="flex items-center gap-2">
              <span className="font-display font-extrabold text-xl tracking-tight text-white group-hover:text-neutral-200 transition">
                INTAN
              </span>
              <span className="text-[10px] font-mono font-bold tracking-widest px-1.5 py-0.5 rounded bg-white/[0.08] text-[#ff5500] border border-white/[0.08]">
                MK-II
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-mono tracking-wider" aria-label="Main Navigation">
            {navLinks.map((l) => {
              const active = pathname === l.href;
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`transition-colors duration-150 py-1 ${
                    active
                      ? "text-white font-bold border-b border-[#ff5500]"
                      : "text-neutral-400 hover:text-white"
                  }`}
                >
                  {l.label}
                </Link>
              );
            })}
          </nav>

          {/* Action Hub */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/sop"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-mono font-medium px-3 py-1.5 rounded bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.1] text-neutral-200 hover:text-white transition"
            >
              <span>QR 9.2 // SOP</span>
            </Link>
            <Link
              href="/kontak"
              className="inline-flex items-center gap-1 text-xs font-mono font-bold px-3 py-1.5 rounded bg-[#ff5500] hover:bg-[#ff661a] text-black transition"
            >
              <span>INQUIRE</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden p-2 rounded bg-white/[0.05] active:bg-white/[0.12] text-neutral-300 border border-white/[0.08] touch-manipulation"
              aria-label="Toggle Navigation Menu"
            >
              {open ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu with Active States & Touch Padding */}
        {open && (
          <div className="lg:hidden bg-[#0a0a0a]/98 backdrop-blur-xl border-b border-white/[0.08] px-4 py-3 space-y-1 text-xs font-mono shadow-2xl animate-in fade-in slide-in-from-top-2 duration-150">
            {navLinks.map((l) => {
              const active = pathname === l.href;
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center justify-between py-2.5 px-3 rounded transition text-xs font-mono ${
                    active
                      ? "bg-white/[0.08] text-white font-bold border-l-2 border-[#ff5500]"
                      : "text-neutral-300 hover:bg-white/[0.04] hover:text-white"
                  }`}
                >
                  <span>{l.label}</span>
                  {active && <span className="w-1.5 h-1.5 rounded-full bg-[#ff5500]" />}
                </Link>
              );
            })}
            <div className="pt-2 border-t border-white/[0.06] mt-2 space-y-1">
              <Link
                href="/sop"
                onClick={() => setOpen(false)}
                className="flex items-center justify-between py-2.5 px-3 rounded bg-[#ff5500]/10 border border-[#ff5500]/20 text-[#ff5500] font-bold"
              >
                <span>QR 9.2 // BUKU SAKU SOP</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/kontak"
                onClick={() => setOpen(false)}
                className="block py-2.5 px-3 rounded bg-white/[0.04] text-neutral-300 hover:text-white"
              >
                KEMITRAAN &amp; DEMONSTRASI MESIN
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
