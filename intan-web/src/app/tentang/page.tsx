import React from "react";
import { teamMembers, dosenPendamping } from "@/data/timData";
import { hki, institution } from "@/data/site";
import { Award, Check, Bookmark, FileText } from "lucide-react";

export default function TentangPage() {
  const tahapan = [
    { no: "01", judul: "Identifikasi Masalah & Studi Lapangan", desc: "Observasi kendala metode pembakaran manual kemplang tunu di sentra Ogan Ilir & Palembang." },
    { no: "02", judul: "Perancangan Kinematika & CAD", desc: "Pemodelan 3D dan simulasi kinematika 6 servo dengan pembagian zona termal SUS 304." },
    { no: "03", judul: "Fabrikasi & Integrasi Sistem", desc: "Pengelasan presisi pelat stainless SUS 304, instalasi rel laci geser, dan perkabelan 3-zona." },
    { no: "04", judul: "Kalibrasi & Pengujian Parsial", desc: "Kalibrasi kurva suhu termokopel Tipe-K MAX6675 dan sinkronisasi delay non-blocking millis()." },
    { no: "05", judul: "Uji Validasi 6 Sampel", desc: "Pengujian pemanggangan langsung adonan kemplang tunu riil dengan evaluasi mutu pemerataan." },
    { no: "06", judul: "Stress Test Operasional 5 Jam", desc: "Uji ketahanan operasi kontinu skala penuh dengan kestabilan suhu kotak kontrol ECU < 48°C." },
    { no: "07", judul: "Legalitas HKI & Hilirisasi", desc: "Penerbitan Hak Cipta Kemenkumham, pemberkasan paten sederhana, dan penandatanganan MoU mitra." },
  ];

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 space-y-12 bg-[#050505]">
      {/* Header */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-[11px] font-mono text-[#ff5500] uppercase tracking-widest font-bold">
          <span>REGISTRY &amp; CREDENTIALS // SECTION 06</span>
          <span className="text-neutral-600">/</span>
          <span className="text-neutral-400">INSTITUTIONAL GOVERNANCE</span>
        </div>
        <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
          Profil Tim Inovasi &amp; Legalitas Resmi INTAN
        </h1>
        <p className="text-sm text-neutral-400 max-w-2xl font-sans leading-relaxed">
          Inovasi mahasiswa Universitas Padjadjaran dalam skema Program Kreativitas Mahasiswa Karya Inovatif (PKM-KI 2026), didanai oleh Direktorat Jenderal Belmawa Kemdiktisaintek.
        </p>
      </div>

      {/* 4 Official Registry Certificates */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="industrial-panel rounded-lg p-5 space-y-2 border-t-2 border-t-[#ff5500]">
          <div className="flex items-center justify-between text-[10px] font-mono text-neutral-400">
            <span>SURAT PENCATATAN CIPTAAN</span>
            <Award className="w-3.5 h-3.5 text-[#ff5500]" />
          </div>
          <div className="font-display font-extrabold text-xl text-white tracking-tight">HKI #{hki}</div>
          <p className="text-xs text-neutral-400 font-sans leading-relaxed">
            Surat Pencatatan Ciptaan Alat Peraga resmi Kementerian Hukum RI.
          </p>
        </div>

        <div className="industrial-panel rounded-lg p-5 space-y-2 border-t-2 border-t-emerald-500">
          <div className="flex items-center justify-between text-[10px] font-mono text-neutral-400">
            <span>MATURITY LEVEL</span>
            <Check className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div className="font-display font-extrabold text-xl text-emerald-400 tracking-tight">TKT LEVEL 8</div>
          <p className="text-xs text-neutral-400 font-sans leading-relaxed">
            Teruji operasional riil di lingkungan UMKM dengan capaian indikator &gt;80%.
          </p>
        </div>

        <div className="industrial-panel rounded-lg p-5 space-y-2 border-t-2 border-t-sky-500">
          <div className="flex items-center justify-between text-[10px] font-mono text-neutral-400">
            <span>INTELLECTUAL PROPERTY</span>
            <Bookmark className="w-3.5 h-3.5 text-sky-400" />
          </div>
          <div className="font-display font-extrabold text-xl text-white tracking-tight">PATEN SEDERHANA</div>
          <p className="text-xs text-neutral-400 font-sans leading-relaxed">
            Pemberkasan paten terdaftar pada Lampiran 18 Laporan Kemajuan PKM-KI.
          </p>
        </div>

        <div className="industrial-panel rounded-lg p-5 space-y-2 border-t-2 border-t-neutral-500">
          <div className="flex items-center justify-between text-[10px] font-mono text-neutral-400">
            <span>DOCUMENTATION</span>
            <FileText className="w-3.5 h-3.5 text-neutral-400" />
          </div>
          <div className="font-display font-extrabold text-xl text-white tracking-tight">DOKUMEN TEKNIS</div>
          <p className="text-xs text-neutral-400 font-sans leading-relaxed">
            Spesifikasi mekanik-elektronik lengkap 10 bab berseri.
          </p>
        </div>
      </div>

      {/* 7 Milestone Execution Sequence */}
      <div className="industrial-panel rounded-lg p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-3 text-xs font-mono">
          <span className="font-bold text-white uppercase tracking-wider">
            PROJECT EXECUTION MILESTONES // 7 TAHAP PENGEMBANGAN
          </span>
          <span className="text-neutral-500">TAHAP 01 – 07 COMPLETED</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {tahapan.map((t) => (
            <div key={t.no} className="industrial-card rounded p-4 space-y-2">
              <span className="font-mono text-xs font-bold text-[#ff5500]">PHASE {t.no}</span>
              <div className="font-display font-bold text-sm text-white tracking-tight">{t.judul}</div>
              <p className="text-xs text-neutral-400 font-sans leading-relaxed">{t.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Engineering Team & Faculty Advisor */}
      <div className="space-y-6">
        <div className="text-xs font-mono font-bold text-white uppercase tracking-wider border-b border-white/[0.08] pb-3 flex items-center justify-between">
          <span>PERSONNEL CREDENTIALS // PENGEMBANG &amp; DOSEN PENDAMPING</span>
          <span className="text-neutral-500">{institution}</span>
        </div>

        {/* Advisor Card */}
        <div className="industrial-panel rounded-lg p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-l-2 border-l-[#ff5500]">
          <div className="space-y-1">
            <span className="text-[10px] font-mono text-[#ff5500] font-bold uppercase tracking-wider">
              {dosenPendamping.role}
            </span>
            <div className="font-display font-bold text-lg text-white">{dosenPendamping.name}</div>
            <p className="text-xs text-neutral-400 font-sans">{dosenPendamping.institution}</p>
          </div>
          <div className="text-[11px] font-mono px-3 py-1 rounded bg-white/[0.05] border border-white/[0.08] text-neutral-300">
            OFFICIAL ADVISOR // PKM-KI 2026
          </div>
        </div>

        {/* 5 Students Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {teamMembers.map((m, idx) => (
            <div key={idx} className="industrial-panel rounded-lg p-5 space-y-2 flex flex-col justify-between">
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[10px] font-mono">
                  <span className="text-[#ff5500] font-bold">{m.role.toUpperCase()}</span>
                  <span className="text-neutral-500">UNPAD</span>
                </div>
                <div className="font-display font-bold text-sm text-white">{m.name}</div>
                <div className="text-xs text-neutral-500 font-mono">{m.major}</div>
              </div>
              <div className="pt-2 border-t border-white/[0.06] text-xs text-neutral-300 font-sans leading-relaxed">
                {m.task}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
