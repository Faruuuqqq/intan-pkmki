import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { teamMembers, dosenPendamping } from "@/data/timData";
import { facts, hki, institution } from "@/data/site";

const tahapan = [
  { judul: "Identifikasi masalah", isi: "Observasi kendala pembakaran manual kemplang tunu di sentra Ogan Ilir dan Palembang." },
  { judul: "Perancangan kinematika", isi: "Pemodelan 3D dan simulasi gerak enam servo dengan pembagian zona termal SUS 304." },
  { judul: "Fabrikasi dan integrasi", isi: "Pengelasan pelat stainless, pemasangan rel laci, dan perkabelan tiga zona." },
  { judul: "Kalibrasi dan uji parsial", isi: "Kalibrasi termokopel tipe-K MAX6675 dan sinkronisasi jadwal non-blocking." },
  { judul: "Uji validasi enam sampel", isi: "Pemanggangan langsung adonan kemplang tunu dengan evaluasi pemerataan." },
  { judul: "Uji kontinu lima jam", isi: "Operasi skala penuh dengan pemantauan suhu kotak kontrol ECU di bawah 48 °C." },
  { judul: "Legalitas dan hilirisasi", isi: "Penerbitan hak cipta, pemberkasan paten sederhana, dan penandatanganan MoU mitra." },
];

export default function TentangPage() {
  return (
    <div className="surface-paper bg-paper text-graphite">
      <section className="border-b border-graphite/15">
        <div className="mx-auto max-w-[1200px] px-5 py-12 sm:px-8 sm:py-16">
          <p className="text-sm font-semibold text-ember-dark">Tentang</p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            Dibuat oleh mahasiswa, diuji di dapur produksi.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-steel-text">
            Tim PKM-KI {institution} 2026. Mesin, dokumen, dan data di situs ini
            adalah hasil kerja lapangan, bukan konsep di atas kertas.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-5 py-12 sm:px-8">
        <dl className="grid border-t border-graphite/20 sm:grid-cols-2">
          {[
            ["Hak kekayaan intelektual", `HKI #${hki}`, "Pencatatan karya alat peraga, Kementerian Hukum RI"],
            ["Tingkat kesiapan", facts.tkt, "Teruji di lingkungan UMKM"],
            ["Kekayaan intelektual", "Paten sederhana", "Pemberkasan pada laporan kemajuan"],
            ["Dokumentasi", "10 bab dokumen teknis", "Mekanik, elektronik, dan uji"],
          ].map(([label, value, note], index) => (
            <div
              key={label}
              className={`border-b border-graphite/15 py-5 ${index % 2 === 0 ? "sm:pr-8" : "sm:border-l sm:border-graphite/15 sm:pl-8"}`}
            >
              <dt className="text-xs text-steel-text">{label}</dt>
              <dd className="mt-1 font-display text-xl font-semibold tracking-tight">{value}</dd>
              <dd className="mt-1 text-xs text-steel-text">{note}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-16">
          <p className="text-sm font-semibold text-ember-dark">Perjalanan</p>
          <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Tujuh tahap, dari lapangan ke meja.
          </h2>
          <ol className="mt-8 border-t border-graphite/20">
            {tahapan.map((tahap, index) => (
              <li key={tahap.judul} className="grid gap-3 border-b border-graphite/15 py-5 sm:grid-cols-[3.5rem_1fr] sm:gap-6">
                <span className="font-display text-2xl font-semibold text-ember-dark tabular-numbers">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-display text-lg font-semibold tracking-tight">{tahap.judul}</h3>
                  <p className="mt-1 max-w-2xl text-sm leading-relaxed text-steel-text">{tahap.isi}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-t border-graphite/15">
        <div className="mx-auto max-w-[1200px] px-5 py-16 sm:px-8">
          <p className="text-sm font-semibold text-ember-dark">Tim</p>
          <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Lima mahasiswa, satu dosen.
          </h2>

          <div className="mt-6 border-t border-graphite/20 py-5">
            <p className="text-xs text-steel-text">{dosenPendamping.role}</p>
            <p className="mt-1 font-display text-xl font-semibold tracking-tight">{dosenPendamping.name}</p>
            <p className="mt-1 text-sm text-steel-text">{dosenPendamping.institution}</p>
          </div>

          <ul className="border-t border-graphite/20">
            {teamMembers.map((member) => (
              <li key={member.name} className="grid gap-2 border-b border-graphite/15 py-5 sm:grid-cols-[1fr_1.4fr] sm:gap-8">
                <div>
                  <h3 className="font-display text-lg font-semibold tracking-tight">{member.name}</h3>
                  <p className="mt-0.5 text-xs text-steel-text">{member.role}</p>
                </div>
                <p className="text-sm leading-relaxed text-steel-text">{member.task}</p>
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-col gap-4 border-t border-graphite/20 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-xl text-sm text-steel-text">
              Ingin berdiskusi tentang mesin, data, atau replikasi?
            </p>
            <Link
              href="/kontak"
              className="inline-flex min-h-11 items-center justify-center gap-2 bg-graphite px-5 py-3 text-sm font-semibold text-paper transition-colors hover:bg-graphite/85"
            >
              Hubungi tim
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
