import Link from "next/link";
import { navLinks, socials, hki, facts, institution } from "@/data/site";

export default function Footer() {
  return (
    <footer className="border-t border-paper/10 bg-stage">
      <div className="mx-auto max-w-[1200px] px-5 py-14 sm:px-8 sm:py-16">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="space-y-4 md:col-span-5">
            <Link href="/" className="inline-block font-display text-2xl font-bold tracking-tight text-paper">
              INTAN
            </Link>
            <p className="max-w-sm text-sm leading-relaxed text-paper/60">
              Pemanggang kemplang tunu berotasi otomatis dengan kendali termal histeresis.
              Bara arang tetap, kapasitas naik, tangan operator tidak lagi di atas api.
            </p>
            <p className="text-sm text-steel">
              {institution} · PKM-KI 2026
            </p>
          </div>

          <div className="md:col-span-3">
            <h2 className="text-sm font-semibold text-paper">Jelajahi</h2>
            <ul className="mt-4 space-y-2.5 text-sm text-paper/60">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="transition-colors hover:text-paper">
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/kontak" className="transition-colors hover:text-paper">
                  Kontak &amp; kemitraan
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <h2 className="text-sm font-semibold text-paper">Kontak</h2>
            <ul className="mt-4 space-y-2.5 text-sm text-paper/60">
              <li>
                <a href={`mailto:${socials.email}`} className="break-all transition-colors hover:text-paper">
                  {socials.email}
                </a>
              </li>
              <li>
                <a href={socials.youtube} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-paper">
                  YouTube — video demo
                </a>
              </li>
              <li>
                <a href={socials.instagram} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-paper">
                  Instagram
                </a>
              </li>
              <li>
                <a href={socials.tiktok} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-paper">
                  TikTok
                </a>
              </li>
            </ul>
            <p className="mt-5 text-xs leading-relaxed text-steel">
              HKI #{hki} · {facts.tkt} · {facts.material}
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-paper/10 pt-6 text-xs text-steel sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Tim INTAN {institution}. Didanai Belmawa Kemdiktisaintek.</p>
          <p>Dokumen dan data dapat diminta untuk keperluan akademik.</p>
        </div>
      </div>
    </footer>
  );
}
