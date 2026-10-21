"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { navLinks } from "@/data/site";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-paper/10 bg-stage/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between gap-4 px-5 sm:px-8">
        <Link
          href="/"
          className="flex items-baseline gap-2.5"
          onClick={() => setOpen(false)}
          aria-label="INTAN — beranda"
        >
          <span className="font-display text-xl font-bold tracking-tight text-paper">INTAN</span>
          <span className="text-xs text-steel">Pemanggang kemplang tunu</span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm lg:flex" aria-label="Navigasi utama">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`border-b py-1 transition-colors ${
                  active
                    ? "border-ember text-paper"
                    : "border-transparent text-paper/65 hover:text-paper"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/kontak"
            className="hidden items-center gap-1.5 bg-paper px-4 py-2.5 text-sm font-semibold text-graphite transition-colors hover:bg-paper-raised sm:inline-flex"
          >
            Hubungi kami
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="inline-flex h-11 w-11 items-center justify-center border border-paper/15 text-paper lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Tutup navigasi" : "Buka navigasi"}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          className="border-t border-paper/10 bg-stage px-5 pb-6 pt-2 lg:hidden"
          aria-label="Navigasi seluler"
        >
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                aria-current={active ? "page" : undefined}
                className={`flex min-h-11 items-center justify-between border-b border-paper/10 py-3 text-base ${
                  active ? "text-ember-bright" : "text-paper/75"
                }`}
              >
                {link.label}
                {active && <span className="h-1.5 w-1.5 bg-ember" aria-hidden="true" />}
              </Link>
            );
          })}
          <Link
            href="/kontak"
            onClick={() => setOpen(false)}
            className="mt-4 flex min-h-11 items-center justify-center gap-2 bg-paper px-4 py-3 text-sm font-semibold text-graphite"
          >
            Hubungi kami
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </nav>
      )}
    </header>
  );
}
