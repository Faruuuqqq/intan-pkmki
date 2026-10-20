import Link from "next/link";
import { navLinks, socials, hki, systemModel } from "@/data/site";

export default function Footer() {
  return (
    <footer className="bg-[#050505] border-t border-white/[0.08] mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          
          {/* Brand & System Overview */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-display font-black text-2xl tracking-tight text-white">INTAN</span>
              <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-white/[0.08] text-[#ff5500]">
                {systemModel}
              </span>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed max-w-sm font-sans">
              Inovasi Termal Adaptif Nusantara — Sistem pemanggang kemplang tunu berotasi otomatis berbasis mikrokontroler dengan kendali termal histeresis cerdas untuk pelaku industri kecil dan menengah.
            </p>
            <div className="space-y-1 font-mono text-[11px] text-neutral-500 pt-2">
              <div>REGISTRY HKI: <span className="text-neutral-300">#{hki}</span></div>
              <div>CLASSIFICATION: <span className="text-neutral-300">TKT LEVEL 8 (OPERATIONAL VERIFIED)</span></div>
              <div>STANDAR MATERIAL: <span className="text-neutral-300">ASTM A240 / SNI 8753:2020</span></div>
            </div>
          </div>

          {/* Directory */}
          <div className="md:col-span-4 space-y-3 font-mono text-xs">
            <div className="text-[10px] tracking-[0.2em] uppercase text-neutral-400 font-bold">SYSTEM INDEX</div>
            <ul className="space-y-2 text-neutral-400">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-white transition flex items-center gap-2">
                    <span className="text-neutral-700">›</span> {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/kontak" className="hover:text-white transition flex items-center gap-2">
                  <span className="text-neutral-700">›</span> CONTACT &amp; PARTNERSHIP
                </Link>
              </li>
            </ul>
          </div>

          {/* Channels & Support */}
          <div className="md:col-span-3 space-y-3 font-mono text-xs">
            <div className="text-[10px] tracking-[0.2em] uppercase text-neutral-400 font-bold">DIRECT CHANNELS</div>
            <ul className="space-y-2 text-neutral-400">
              <li>
                <a href={`mailto:${socials.email}`} className="hover:text-white transition block truncate">
                  {socials.email}
                </a>
              </li>
              <li>
                <a href={socials.youtube} target="_blank" rel="noreferrer" className="hover:text-white transition block">
                  YOUTUBE // DEMO VIDEO
                </a>
              </li>
              <li>
                <a href={socials.instagram} target="_blank" rel="noreferrer" className="hover:text-white transition block">
                  INSTAGRAM // @INTAN_PKMKI
                </a>
              </li>
              <li>
                <a href={socials.tiktok} target="_blank" rel="noreferrer" className="hover:text-white transition block">
                  TIKTOK // @INTAN.PKMKI
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Technical Strip */}
        <div className="mt-12 pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[11px] font-mono text-neutral-400">
          <div>
            © 2026 TIM INTAN UNIVERSITAS PADJADJARAN. DIDANAI BELMAWA KEMDIKTISAINTEK.
          </div>
          <div className="text-neutral-400">
            ENGINEERING SPECIFICATION REV 2.0 // ZERO-BUILD
          </div>
        </div>
      </div>
    </footer>
  );
}
