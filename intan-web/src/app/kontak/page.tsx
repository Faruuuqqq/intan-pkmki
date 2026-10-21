"use client";

import { useState } from "react";
import { ArrowUpRight, Check, Copy, Mail, Send } from "lucide-react";
import { address, facts, hki, institution, socials, systemModel } from "@/data/site";

const keperluanOptions = [
  "Demonstrasi mesin & validasi lapangan",
  "Kemitraan adopsi UMKM",
  "Pemesanan / replikasi alat",
  "Liputan media & wawancara",
  "Pertanyaan akademis / riset",
];

export default function KontakPage() {
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    nama: "",
    instansi: "",
    kontak: "",
    keperluan: keperluanOptions[0],
    pesan: "",
  });

  const mailtoHref = () => {
    const subject = `[INTAN] ${formData.keperluan}`;
    const body = [
      `Nama: ${formData.nama}`,
      `Instansi/UMKM: ${formData.instansi || "-"}`,
      `Email/WhatsApp: ${formData.kontak}`,
      "",
      formData.pesan,
    ].join("\n");
    return `mailto:${socials.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = mailtoHref();
    setSubmitted(true);
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(socials.email);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="surface-paper bg-paper text-graphite">
      <section className="border-b border-graphite/15">
        <div className="mx-auto max-w-[1200px] px-5 py-12 sm:px-8 sm:py-16">
          <p className="text-sm font-semibold text-ember-dark">Kontak</p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            Mulai dari satu pertanyaan.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-steel-text">
            Demonstrasi mesin, adopsi UMKM, replikasi unit, atau kerja sama riset.
            Tim akan membalas dari alamat resmi di bawah.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1200px] gap-12 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="text-sm font-semibold text-ember-dark">Email</p>
          <a
            href={`mailto:${socials.email}`}
            className="mt-2 block break-all font-display text-2xl font-semibold tracking-tight underline decoration-graphite/20 underline-offset-4 hover:decoration-graphite"
          >
            {socials.email}
          </a>
          <button
            type="button"
            onClick={copyEmail}
            className="mt-4 inline-flex min-h-11 items-center gap-2 border border-graphite/25 px-4 py-2.5 text-sm font-medium transition hover:border-graphite/60"
          >
            {copied ? <Check className="h-4 w-4 text-ember-dark" aria-hidden="true" /> : <Copy className="h-4 w-4 text-steel-text" aria-hidden="true" />}
            {copied ? "Email tersalin" : "Salin email"}
          </button>

          <div className="mt-10 border-t border-graphite/20 pt-6">
            <h2 className="text-sm font-semibold">Kanal lain</h2>
            <ul className="mt-3 space-y-2.5 text-sm">
              {[
                ["YouTube — video demo", socials.youtube],
                ["Instagram", socials.instagram],
                ["TikTok", socials.tiktok],
              ].map(([label, href]) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-steel-text hover:text-graphite"
                  >
                    {label}
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-10 border-t border-graphite/20 pt-6">
            <h2 className="text-sm font-semibold">Sekretariat</h2>
            <p className="mt-2 max-w-sm text-sm leading-relaxed text-steel-text">
              {institution}
              <br />
              {address}
            </p>
          </div>

          <p className="mt-8 border-t border-graphite/20 pt-4 text-xs leading-relaxed text-steel-text">
            {systemModel} · HKI #{hki} · {facts.tkt} · {facts.material}
          </p>
        </div>

        <div className="lg:col-span-7">
          {submitted ? (
            <div className="border border-graphite/15 bg-paper-raised p-6 sm:p-8">
              <Mail className="h-8 w-8 text-ember-dark" aria-hidden="true" />
              <h2 className="mt-4 font-display text-2xl font-semibold tracking-tight">
                Email disiapkan.
              </h2>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-steel-text">
                Pesan belum terkirim sampai Anda menekan tombol kirim di aplikasi
                email. Tidak ada data yang disimpan di server situs ini.
              </p>
              <div className="mt-6 flex flex-col gap-2 sm:flex-row">
                <a
                  href={mailtoHref()}
                  className="inline-flex min-h-11 items-center justify-center gap-2 bg-graphite px-4 py-2.5 text-sm font-semibold text-paper"
                >
                  Buka email lagi
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="inline-flex min-h-11 items-center justify-center border border-graphite/25 px-4 py-2.5 text-sm font-medium"
                >
                  Tulis ulang
                </button>
              </div>
              <p className="mt-4 text-xs text-steel-text">
                Atau salin alamat email di halaman ini jika aplikasi email tidak terbuka.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="border border-graphite/15 bg-paper-raised p-5 sm:p-8">
              <h2 className="font-display text-2xl font-semibold tracking-tight">Tulis pesan</h2>
              <p className="mt-1 text-sm text-steel-text">
                Form ini menyiapkan draf email. Tidak ada data yang dikirim ke server.
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="nama" className="text-sm font-medium">Nama *</label>
                  <input
                    id="nama"
                    required
                    type="text"
                    autoComplete="name"
                    placeholder="Nama lengkap"
                    value={formData.nama}
                    onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                    className="mt-1.5 w-full border border-graphite/25 bg-paper px-3 py-2.5 text-sm focus:border-ember-dark placeholder:text-steel-text"
                  />
                </div>
                <div>
                  <label htmlFor="instansi" className="text-sm font-medium">Instansi / UMKM</label>
                  <input
                    id="instansi"
                    type="text"
                    autoComplete="organization"
                    placeholder="Nama UMKM atau institusi"
                    value={formData.instansi}
                    onChange={(e) => setFormData({ ...formData, instansi: e.target.value })}
                    className="mt-1.5 w-full border border-graphite/25 bg-paper px-3 py-2.5 text-sm focus:border-ember-dark placeholder:text-steel-text"
                  />
                </div>
                <div>
                  <label htmlFor="kontak" className="text-sm font-medium">Email / WhatsApp *</label>
                  <input
                    id="kontak"
                    required
                    type="text"
                    autoComplete="email"
                    placeholder="nama@email.com atau 08xx"
                    value={formData.kontak}
                    onChange={(e) => setFormData({ ...formData, kontak: e.target.value })}
                    className="mt-1.5 w-full border border-graphite/25 bg-paper px-3 py-2.5 text-sm focus:border-ember-dark placeholder:text-steel-text"
                  />
                </div>
                <div>
                  <label htmlFor="keperluan" className="text-sm font-medium">Keperluan *</label>
                  <select
                    id="keperluan"
                    value={formData.keperluan}
                    onChange={(e) => setFormData({ ...formData, keperluan: e.target.value })}
                    className="mt-1.5 w-full border border-graphite/25 bg-paper px-3 py-2.5 text-sm focus:border-ember-dark placeholder:text-steel-text"
                  >
                    {keperluanOptions.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-4">
                <label htmlFor="pesan" className="text-sm font-medium">Pesan *</label>
                <textarea
                  id="pesan"
                  required
                  rows={5}
                  placeholder="Ceritakan lokasi, volume produksi, dan kebutuhan Anda."
                  value={formData.pesan}
                  onChange={(e) => setFormData({ ...formData, pesan: e.target.value })}
                  className="mt-1.5 w-full resize-y border border-graphite/25 bg-paper px-3 py-2.5 text-sm focus:border-ember-dark placeholder:text-steel-text"
                />
              </div>

              <button
                type="submit"
                className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 bg-graphite px-4 py-3 text-sm font-semibold text-paper transition-colors hover:bg-graphite/85"
              >
                <Send className="h-4 w-4" aria-hidden="true" />
                Siapkan email
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
