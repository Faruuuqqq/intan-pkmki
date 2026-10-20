"use client";

import React, { useState } from "react";
import { socials, hki, systemModel, institution } from "@/data/site";
import { Send, Check, ArrowUpRight } from "lucide-react";

export default function KontakPage() {
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    nama: "",
    instansi: "",
    kontak: "",
    keperluan: "Demonstrasi Mesin & Validasi Lapangan",
    pesan: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 space-y-12 bg-[#050505]">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-[11px] font-mono text-[#ff5500] uppercase tracking-widest font-bold">
          <span>INQUIRY &amp; CONTACT // SECTION 08</span>
          <span className="text-neutral-600">/</span>
          <span className="text-neutral-400">PARTNERSHIP PORTAL</span>
        </div>
        <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
          Hubungi Tim Pengembang &amp; Kemitraan INTAN
        </h1>
        <p className="text-sm text-neutral-400 max-w-2xl font-sans leading-relaxed">
          Kanal komunikasi resmi permohonan demonstrasi teknis, kemitraan hilirisasi UMKM, replikasi manufaktur alat, serta kerja sama riset akademis.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Official Institutional Directory */}
        <div className="lg:col-span-5 space-y-6">
          <div className="industrial-panel rounded-lg p-6 space-y-5">
            <div className="text-xs font-mono font-bold text-white uppercase tracking-wider border-b border-white/[0.08] pb-3">
              OFFICIAL DIRECTORY // SECRETARIAT
            </div>

            <div className="space-y-4 text-xs font-sans text-neutral-300">
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-neutral-500 uppercase block">HEADQUARTERS</span>
                <strong className="text-white block font-mono">SEKRETARIAT PKM-KI INTAN</strong>
                <p className="text-neutral-400 leading-relaxed">
                  {institution}, Kampus Jatinangor, Jl. Raya Bandung-Sumedang Km. 21, Sumedang, Jawa Barat 45363.
                </p>
              </div>

              <div className="space-y-1 border-t border-white/[0.06] pt-3">
                <span className="text-[10px] font-mono text-neutral-500 uppercase block">DIRECT EMAIL</span>
                <a href={`mailto:${socials.email}`} className="text-[#ff5500] font-mono font-bold hover:underline block">
                  {socials.email}
                </a>
              </div>

              <div className="space-y-1 border-t border-white/[0.06] pt-3">
                <span className="text-[10px] font-mono text-neutral-500 uppercase block">ONLINE CHANNELS</span>
                <div className="flex flex-wrap gap-4 font-mono text-xs pt-1">
                  <a href={socials.youtube} target="_blank" rel="noreferrer" className="text-neutral-300 hover:text-white transition flex items-center gap-1">
                    <span>YOUTUBE</span>
                    <ArrowUpRight className="w-3 h-3 text-neutral-500" />
                  </a>
                  <a href={socials.instagram} target="_blank" rel="noreferrer" className="text-neutral-300 hover:text-white transition flex items-center gap-1">
                    <span>INSTAGRAM</span>
                    <ArrowUpRight className="w-3 h-3 text-neutral-500" />
                  </a>
                  <a href={socials.tiktok} target="_blank" rel="noreferrer" className="text-neutral-300 hover:text-white transition flex items-center gap-1">
                    <span>TIKTOK</span>
                    <ArrowUpRight className="w-3 h-3 text-neutral-500" />
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/[0.06] font-mono text-[11px] text-neutral-500 space-y-1">
              <div>SYSTEM: {systemModel}</div>
              <div>HKI REGISTRY: #{hki}</div>
            </div>
          </div>
        </div>

        {/* Right Column: Industrial Partnership Form */}
        <div className="lg:col-span-7">
          <div className="industrial-panel rounded-lg p-6 sm:p-8">
            {submitted ? (
              <div className="py-12 text-center space-y-4 font-mono">
                <div className="w-12 h-12 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <div className="font-display font-bold text-xl text-white">INQUIRY DISPATCHED</div>
                <p className="text-xs text-neutral-400 font-sans max-w-sm mx-auto leading-relaxed">
                  Pesan Anda telah dicatat dalam sistem. Tim perwakilan teknis INTAN akan menghubungi Anda dalam waktu 1×24 jam kerja.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-4 py-2 rounded bg-white/[0.06] hover:bg-white/[0.12] text-xs font-mono text-white transition mt-2"
                >
                  NEW INQUIRY
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="text-xs font-mono font-bold text-white uppercase tracking-wider border-b border-white/[0.08] pb-3">
                  TRANSMISSION FORM // PARTNERSHIP &amp; INQUIRY
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                  <div className="space-y-1.5 font-mono text-xs">
                    <label htmlFor="nama" className="text-neutral-400 block">FULL NAME *</label>
                    <input
                      id="nama"
                      required
                      type="text"
                      placeholder="Nama Lengkap"
                      value={formData.nama}
                      onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                      className="w-full px-3 py-2 rounded bg-[#050505] border border-white/[0.1] text-white text-xs focus:border-white outline-none transition font-sans"
                    />
                  </div>

                  <div className="space-y-1.5 font-mono text-xs">
                    <label htmlFor="instansi" className="text-neutral-400 block">ORGANIZATION / UMKM</label>
                    <input
                      id="instansi"
                      type="text"
                      placeholder="Nama Instansi / Usaha"
                      value={formData.instansi}
                      onChange={(e) => setFormData({ ...formData, instansi: e.target.value })}
                      className="w-full px-3 py-2 rounded bg-[#050505] border border-white/[0.1] text-white text-xs focus:border-white outline-none transition font-sans"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5 font-mono text-xs">
                    <label htmlFor="kontak" className="text-neutral-400 block">EMAIL / WHATSAPP *</label>
                    <input
                      id="kontak"
                      required
                      type="text"
                      placeholder="kontak@domain.com atau 0812..."
                      value={formData.kontak}
                      onChange={(e) => setFormData({ ...formData, kontak: e.target.value })}
                      className="w-full px-3 py-2 rounded bg-[#050505] border border-white/[0.1] text-white text-xs focus:border-white outline-none transition font-sans"
                    />
                  </div>

                  <div className="space-y-1.5 font-mono text-xs">
                    <label htmlFor="keperluan" className="text-neutral-400 block">SUBJECT *</label>
                    <select
                      id="keperluan"
                      value={formData.keperluan}
                      onChange={(e) => setFormData({ ...formData, keperluan: e.target.value })}
                      className="w-full px-3 py-2 rounded bg-[#050505] border border-white/[0.1] text-white text-xs focus:border-white outline-none transition font-sans"
                    >
                      <option value="Demonstrasi Mesin & Validasi Lapangan">Demonstrasi Mesin &amp; Validasi Lapangan</option>
                      <option value="Kemitraan Adopsi UMKM">Kemitraan Adopsi UMKM</option>
                      <option value="Pemesanan / Replikasi Alat">Pemesanan / Replikasi Alat</option>
                      <option value="Liputan Media & Wawancara">Liputan Media &amp; Wawancara</option>
                      <option value="Pertanyaan Akademis / Riset">Pertanyaan Akademis / Riset</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5 font-mono text-xs">
                  <label htmlFor="pesan" className="text-neutral-400 block">TRANSMISSION MESSAGE *</label>
                  <textarea
                    id="pesan"
                    required
                    rows={4}
                    placeholder="Tuliskan spesifikasi kebutuhan atau pertanyaan Anda..."
                    value={formData.pesan}
                    onChange={(e) => setFormData({ ...formData, pesan: e.target.value })}
                    className="w-full px-3 py-2 rounded bg-[#050505] border border-white/[0.1] text-white text-xs focus:border-white outline-none transition font-sans resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded bg-white text-black font-mono font-bold text-xs hover:bg-neutral-200 transition flex items-center justify-center gap-2 mt-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>TRANSMIT INQUIRY</span>
                </button>
              </form>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
