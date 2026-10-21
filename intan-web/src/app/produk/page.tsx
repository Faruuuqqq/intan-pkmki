"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const Intan3DViewer = dynamic(() => import("@/components/3d/Intan3DViewer"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[520px] items-center justify-center border border-paper/15 bg-stage-raised text-sm text-steel">
      Memuat model 3D…
    </div>
  ),
});

const spesifikasi = [
  { label: "Kapasitas nominal", value: "400–420 keping/jam", catatan: "6 rak, siklus 46,5 detik" },
  { label: "Tegangan operasi", value: "220 V AC / 5 V DC", catatan: "Suplai 3 zona terisolasi" },
  { label: "Histeresis termal", value: "550–600 °C", catatan: "Umpan balik termokopel tipe-K" },
  { label: "Massa rangka", value: "25 kg", catatan: "4 roda caster" },
  { label: "Daya listrik", value: "150–200 W", catatan: "Tidak termasuk panas arang" },
  { label: "Durasi kontinu", value: "4–5 jam/batch", catatan: "Suhu kotak ECU < 48 °C" },
];

const material = [
  {
    nama: "Plat stainless SUS 304",
    standar: "ASTM A240",
    isi: "Bodi utama dan palung pembakaran. Food-grade, tahan korosi, dan aman dibersihkan setiap hari.",
  },
  {
    nama: "Pipa dan kawat penjepit",
    standar: "ASTM A312",
    isi: "Poros torsi dari servo ke kemplang. Tahan panas 600 °C dan dapat dilepas untuk pencucian.",
  },
  {
    nama: "Casing aluminium",
    standar: "ASTM B209",
    isi: "Panel luar yang ringan dan membantu meredam panas kotak kontrol ECU.",
  },
];

const dimensiTab = (
  <svg viewBox="0 0 600 280" className="h-auto w-full min-w-[560px]" role="img" aria-label="Skema dimensi INTAN 1240 x 300 x 300 milimeter">
    <defs>
      <pattern id="gridProduk" width="20" height="20" patternUnits="userSpaceOnUse">
        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#7C8589" strokeOpacity="0.18" strokeWidth="1" />
      </pattern>
    </defs>
    <rect width="600" height="280" fill="url(#gridProduk)" />
    <line x1="70" y1="42" x2="530" y2="42" stroke="#A63A0B" strokeWidth="1.5" />
    <line x1="70" y1="30" x2="70" y2="62" stroke="#A63A0B" strokeWidth="1" strokeDasharray="3 3" />
    <line x1="530" y1="30" x2="530" y2="62" stroke="#A63A0B" strokeWidth="1" strokeDasharray="3 3" />
    <text x="300" y="30" fill="#1B1A17" fontSize="11" fontFamily="sans-serif" textAnchor="middle">1240 mm</text>

    <rect x="100" y="92" width="400" height="112" fill="#D8D2C6" stroke="#1B1A17" strokeWidth="1.5" />
    <line x1="100" y1="128" x2="500" y2="128" stroke="#7C8589" strokeWidth="1" strokeDasharray="5 4" />
    <rect x="112" y="140" width="180" height="52" fill="none" stroke="#4F585C" strokeWidth="1" />
    <rect x="308" y="140" width="180" height="52" fill="none" stroke="#4F585C" strokeWidth="1" />
    <circle cx="202" cy="166" r="4" fill="#A63A0B" />
    <circle cx="398" cy="166" r="4" fill="#A63A0B" />

    <circle cx="128" cy="218" r="8" fill="none" stroke="#1B1A17" strokeWidth="1.5" />
    <circle cx="472" cy="218" r="8" fill="none" stroke="#1B1A17" strokeWidth="1.5" />

    <line x1="70" y1="92" x2="70" y2="204" stroke="#7C8589" strokeWidth="1" />
    <text x="60" y="152" fill="#4F585C" fontSize="10" fontFamily="sans-serif" textAnchor="end">300 mm</text>
    <line x1="100" y1="232" x2="500" y2="232" stroke="#7C8589" strokeWidth="1" />
    <text x="300" y="250" fill="#4F585C" fontSize="10" fontFamily="sans-serif" textAnchor="middle">1000 mm palung · 2 × 200 mm laci</text>
    <text x="300" y="270" fill="#7C8589" fontSize="9" fontFamily="sans-serif" textAnchor="middle">Skema dimensi, bukan gambar kerja</text>
  </svg>
);

const wiringTab = (
  <svg viewBox="0 0 600 280" className="h-auto w-full min-w-[560px]" role="img" aria-label="Skema kabel INTAN: Arduino Nano, sensor, relay, servo, LCD, dan PSU">
    <rect width="600" height="280" fill="none" />
    <rect x="240" y="106" width="120" height="58" fill="#E4DFD5" stroke="#1B1A17" strokeWidth="1.5" />
    <text x="300" y="130" fill="#1B1A17" fontSize="11" fontFamily="sans-serif" textAnchor="middle" fontWeight="600">Arduino Nano</text>
    <text x="300" y="146" fill="#4F585C" fontSize="9" fontFamily="sans-serif" textAnchor="middle">ATmega328P · millis()</text>

    <rect x="30" y="24" width="180" height="46" fill="none" stroke="#4F585C" strokeWidth="1.2" />
    <text x="120" y="43" fill="#1B1A17" fontSize="10" fontFamily="sans-serif" textAnchor="middle">6 × servo MG996R</text>
    <text x="120" y="58" fill="#7C8589" fontSize="9" fontFamily="sans-serif" textAnchor="middle">jeda 30 ms</text>
    <path d="M 210 47 L 300 47 L 300 106" fill="none" stroke="#4F585C" strokeWidth="1.2" />

    <rect x="410" y="24" width="160" height="46" fill="none" stroke="#4F585C" strokeWidth="1.2" />
    <text x="490" y="43" fill="#1B1A17" fontSize="10" fontFamily="sans-serif" textAnchor="middle">MAX6675 + tipe-K</text>
    <text x="490" y="58" fill="#7C8589" fontSize="9" fontFamily="sans-serif" textAnchor="middle">SPI · suhu bara</text>
    <path d="M 410 47 L 360 47 L 360 106" fill="none" stroke="#4F585C" strokeWidth="1.2" />

    <rect x="30" y="190" width="150" height="46" fill="none" stroke="#4F585C" strokeWidth="1.2" />
    <text x="105" y="209" fill="#1B1A17" fontSize="10" fontFamily="sans-serif" textAnchor="middle">LCD I2C 20×4</text>
    <text x="105" y="224" fill="#7C8589" fontSize="9" fontFamily="sans-serif" textAnchor="middle">telemetri</text>
    <path d="M 240 150 L 105 150 L 105 190" fill="none" stroke="#4F585C" strokeWidth="1.2" />

    <rect x="220" y="198" width="160" height="46" fill="none" stroke="#A63A0B" strokeWidth="1.4" />
    <text x="300" y="217" fill="#1B1A17" fontSize="10" fontFamily="sans-serif" textAnchor="middle">Relay 2 kanal</text>
    <text x="300" y="232" fill="#A63A0B" fontSize="9" fontFamily="sans-serif" textAnchor="middle">blower kiri / kanan</text>
    <path d="M 300 164 L 300 198" fill="none" stroke="#A63A0B" strokeWidth="1.4" />

    <rect x="420" y="190" width="150" height="46" fill="none" stroke="#A63A0B" strokeWidth="1.4" />
    <text x="495" y="209" fill="#1B1A17" fontSize="10" fontFamily="sans-serif" textAnchor="middle">2 × blower</text>
    <text x="495" y="224" fill="#A63A0B" fontSize="9" fontFamily="sans-serif" textAnchor="middle">PWM AC dimmer</text>
    <path d="M 380 221 L 420 221" fill="none" stroke="#A63A0B" strokeWidth="1.4" />

    <path d="M 300 244 L 300 260" fill="none" stroke="#7C8589" strokeWidth="1" strokeDasharray="3 3" />
    <text x="300" y="274" fill="#7C8589" fontSize="9" fontFamily="sans-serif" textAnchor="middle">Suplai logika 5 V dan daya AC 220 V dipisah pada tiga zona.</text>
  </svg>
);

export default function ProdukPage() {
  const [activeTab, setActiveTab] = useState<"dimensi" | "wiring">("dimensi");

  return (
    <div className="bg-stage text-paper">
      <section className="border-b border-paper/10">
        <div className="mx-auto max-w-[1200px] px-5 py-12 sm:px-8 sm:py-16">
          <p className="text-sm text-steel">Produk</p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            Mesin yang bisa dibongkar, bukan kotak hitam.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-paper/65">
            Model digital twin skala 1:1 dari dokumen CAD 1240 × 300 × 300 mm.
            Putar, buka laci, dan lihat bagaimana enam servo bekerja di atas bara.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-5 py-10 sm:px-8 sm:py-14">
        <Intan3DViewer compact={false} />
        <p className="mt-3 max-w-3xl text-xs leading-relaxed text-steel">
          Model 3D disusun dari dokumen teknis. Render dan foto referensi ada di
          bagian bawah halaman; keduanya bukan pengganti gambar kerja.
        </p>
      </section>

      <div className="surface-paper bg-paper text-graphite">
        <section className="mx-auto max-w-[1200px] px-5 py-16 sm:px-8">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="text-sm font-semibold text-ember-dark">Spesifikasi</p>
              <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                Angka yang dipakai di lapangan.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-steel-text">
                Bukan angka maksimum di brosur. Ini rentang yang diukur pada
                prototipe dan uji operasional.
              </p>
            </div>
            <div className="lg:col-span-8">
              <table className="w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-graphite/25 text-xs text-steel-text">
                    <th scope="col" className="py-3 pr-4 font-medium">Parameter</th>
                    <th scope="col" className="py-3 pr-4 font-medium">Nilai</th>
                    <th scope="col" className="hidden py-3 font-medium sm:table-cell">Catatan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-graphite/10">
                  {spesifikasi.map((item) => (
                    <tr key={item.label}>
                      <th scope="row" className="py-3.5 pr-4 text-left font-normal text-steel-text">{item.label}</th>
                      <td className="py-3.5 pr-4 font-semibold tabular-numbers">{item.value}</td>
                      <td className="hidden py-3.5 text-steel-text sm:table-cell">{item.catatan}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="border-t border-graphite/10">
          <div className="mx-auto grid max-w-[1200px] gap-10 px-5 py-16 sm:px-8 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="text-sm font-semibold text-ember-dark">Material</p>
              <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                Stainless yang menyentuh makanan.
              </h2>
              <div className="mt-8 divide-y divide-graphite/15 border-t border-graphite/15">
                {material.map((item) => (
                  <div key={item.nama} className="grid gap-2 py-5 sm:grid-cols-[1fr_auto] sm:gap-6">
                    <div>
                      <h3 className="font-display text-lg font-semibold tracking-tight">{item.nama}</h3>
                      <p className="mt-1 max-w-xl text-sm leading-relaxed text-steel-text">{item.isi}</p>
                    </div>
                    <p className="text-xs text-steel-text sm:text-right">{item.standar}</p>
                  </div>
                ))}
              </div>
            </div>
            <figure className="lg:col-span-5">
              <Image
                src="/alat/intan-depan.webp"
                alt="Render tampak depan INTAN dengan enam kemplang dan bara di dalam palung"
                width={1536}
                height={995}
                sizes="(min-width: 1024px) 38vw, 100vw"
                className="h-auto w-full"
              />
              <figcaption className="mt-2 text-xs leading-relaxed text-steel-text">
                Render konsep tampak depan. Angka pada layar adalah ilustrasi,
                bukan pembacaan uji.
              </figcaption>
            </figure>
          </div>
        </section>

        <section className="border-t border-graphite/10">
          <div className="mx-auto max-w-[1200px] px-5 py-16 sm:px-8">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <p className="text-sm font-semibold text-ember-dark">Gambar teknis</p>
                <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                  Dimensi dan jalur daya.
                </h2>
              </div>
              <div className="flex gap-2" role="tablist" aria-label="Pilih gambar teknis">
                <button
                  type="button"
                  id="tab-dimensi"
                  role="tab"
                  aria-selected={activeTab === "dimensi"}
                  aria-controls="panel-teknis"
                  onClick={() => setActiveTab("dimensi")}
                  className={`min-h-11 border px-3 py-2 text-sm font-medium transition ${
                    activeTab === "dimensi"
                      ? "border-graphite bg-graphite text-paper"
                      : "border-graphite/25 text-steel-text hover:border-graphite/50"
                  }`}
                >
                  Dimensi
                </button>
                <button
                  type="button"
                  id="tab-kabel"
                  role="tab"
                  aria-selected={activeTab === "wiring"}
                  aria-controls="panel-teknis"
                  onClick={() => setActiveTab("wiring")}
                  className={`min-h-11 border px-3 py-2 text-sm font-medium transition ${
                    activeTab === "wiring"
                      ? "border-graphite bg-graphite text-paper"
                      : "border-graphite/25 text-steel-text hover:border-graphite/50"
                  }`}
                >
                  Kabel
                </button>
              </div>
            </div>
            <div
              id="panel-teknis"
              className="mt-8 overflow-x-auto border border-graphite/15 bg-paper-raised p-3 sm:p-6"
              role="tabpanel"
              tabIndex={0}
              aria-labelledby={activeTab === "dimensi" ? "tab-dimensi" : "tab-kabel"}
            >
              {activeTab === "dimensi" ? dimensiTab : wiringTab}
            </div>
            <p className="mt-3 text-xs leading-relaxed text-steel-text">
              Skema disederhanakan untuk web. Dokumen kerja lengkap tersedia
              dalam dokumen teknis tim.<span className="sm:hidden"> Geser diagram ke samping.</span>
            </p>
          </div>
        </section>

        <section className="border-t border-graphite/10">
          <div className="mx-auto max-w-[1200px] px-5 py-16 sm:px-8">
            <p className="text-sm font-semibold text-ember-dark">Referensi visual</p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              Mesin yang sama, dari dua sudut.
            </h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <figure>
                <Image
                  src="/alat/intan-tiga-perempat.webp"
                  alt="Render tiga perempat INTAN dengan bara dan enam kemplang"
                  width={1610}
                  height={907}
                  sizes="(min-width: 640px) 50vw, 100vw"
                  className="h-auto w-full"
                />
                <figcaption className="mt-2 text-xs text-steel-text">Tampak tiga perempat · render konsep.</figcaption>
              </figure>
              <figure>
                <Image
                  src="/alat/intan-atas.webp"
                  alt="Render tampak atas INTAN dengan enam rak penjepit"
                  width={1500}
                  height={582}
                  sizes="(min-width: 640px) 50vw, 100vw"
                  className="h-auto w-full"
                />
                <figcaption className="mt-2 text-xs text-steel-text">Tampak atas · enam rak U-loop.</figcaption>
              </figure>
            </div>
          </div>
        </section>

        <section className="border-t border-graphite/10">
          <div className="mx-auto flex max-w-[1200px] flex-col gap-4 px-5 py-12 sm:flex-row sm:items-center sm:justify-between sm:px-8">
            <p className="max-w-xl text-base text-steel-text">
              Butuh model untuk presentasi, replikasi, atau uji material?
              Tim bisa menyiapkan dokumen dan demonstrasi.
            </p>
            <Link
              href="/kontak"
              className="inline-flex min-h-11 items-center justify-center gap-2 bg-graphite px-5 py-3 text-sm font-semibold text-paper transition-colors hover:bg-graphite/85"
            >
              Hubungi tim
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
