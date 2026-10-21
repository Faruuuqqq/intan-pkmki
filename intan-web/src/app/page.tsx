import Image from "next/image";
import Link from "next/link";
import { TableScroll } from "@/components/ui/TableScroll";
import { ArrowRight, ArrowUpRight, Play } from "lucide-react";
import { facts, hki } from "@/data/site";
import { sampelUjiData } from "@/data/sampelUji";

const langkah = [
  {
    judul: "Jepit enam keping",
    isi: "Enam rak U-loop dari kawat SUS 304 menahan kemplang di posisi yang sama setiap siklus. Tidak ada keping yang bergeser atau menumpuk.",
  },
  {
    judul: "Putar di atas bara",
    isi: "Servo membalik setiap rak 180° secara bergantian dengan jeda 30 ms. Operator cukup memuat dan memanen, tidak perlu berdiri di depan api.",
  },
  {
    judul: "Jaga suhu di 550–600 °C",
    isi: "Termokopel tipe-K membaca suhu ruang bakar. Blower dimatikan saat suhu menyentuh 600 °C, lalu dinyalakan lagi ketika turun ke 550 °C.",
  },
];

export default function HomePage() {
  return (
    <div className="bg-stage text-paper">
      <section className="relative overflow-hidden border-b border-paper/10">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_72%_62%,rgba(226,84,44,0.16),transparent_58%)]"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-[1200px] px-5 pb-10 pt-12 sm:px-8 lg:pb-0 lg:pt-16">
          <p className="text-sm text-steel">PKM-KI 2026 · Universitas Padjadjaran</p>

          <div className="grid items-end gap-8 lg:grid-cols-12">
            <div className="relative z-10 pt-8 lg:col-span-5 lg:pb-20">
              <h1 className="font-display text-5xl font-semibold leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
                Kemplang tunu,
                <br />
                tanpa tangan
                <br />
                <span className="text-ember-bright">terbakar.</span>
              </h1>
              <p className="mt-6 max-w-md text-base leading-relaxed text-paper/65 sm:text-lg">
                INTAN memutar enam keping di atas bara arang dengan kendali suhu
                550–600 °C. Kapasitas naik, rasa smoky tetap, dan operator tidak
                lagi menghirup asap di depan tungku.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/dampak#video"
                  className="inline-flex min-h-12 items-center justify-center gap-2 bg-paper px-5 py-3 text-sm font-semibold text-graphite transition-colors hover:bg-paper-raised"
                >
                  <Play className="h-4 w-4 fill-current" aria-hidden="true" />
                  Tonton demo
                </Link>
                <Link
                  href="/produk"
                  className="inline-flex min-h-12 items-center justify-center gap-2 border border-paper/25 px-5 py-3 text-sm font-semibold text-paper transition-colors hover:bg-paper/5"
                >
                  Lihat mesin
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
              <p className="mt-5 text-xs leading-relaxed text-steel">
                {facts.tkt} · HKI #{hki} · {facts.material}
              </p>
            </div>

            <div className="relative lg:col-span-7">
              <Image
                src="/alat/intan-tiga-perempat.webp"
                alt="Render konsep INTAN: pemanggang kemplang tunu stainless steel dengan enam keping di atas bara arang"
                width={1610}
                height={907}
                priority
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="h-auto w-[112%] max-w-none -ml-[6%] lg:w-[136%] lg:-ml-[18%]"
              />
              <p className="pb-4 text-right text-xs text-steel lg:pb-8">
                Render konsep INTAN MK-II · tampak tiga perempat
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-paper/10">
        <div className="mx-auto grid max-w-[1200px] gap-10 px-5 py-16 sm:px-8 lg:grid-cols-12 lg:py-20">
          <div className="lg:col-span-7">
            <Link
              href="/dampak#video"
              className="group relative block overflow-hidden border border-paper/10"
              aria-label="Tonton video demonstrasi INTAN"
            >
              <Image
                src="/alat/demo-poster.jpg"
                alt="Cuplikan video pengujian pemanggangan kemplang tunu di atas bara arang"
                width={1280}
                height={720}
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.01]"
              />
              <span className="absolute inset-0 flex items-center justify-center bg-graphite/15">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-paper text-graphite">
                  <Play className="ml-1 h-6 w-6 fill-current" aria-hidden="true" />
                </span>
              </span>
            </Link>
            <p className="mt-3 text-xs leading-relaxed text-steel">
              Rekaman uji pemanggangan langsung: enam keping, bara arang aktif,
              dan mekanisme pembalik servo.
            </p>
          </div>

          <div className="lg:col-span-5">
            <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              Bara tetap.
              <br />
              Tangan tidak.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-paper/65">
              Metode manual menuntut operator berada di depan bara selama jam
              produksi.{" "}INTAN memindahkan pekerjaan berulang itu ke mekanisme
              yang terukur, tanpa mengganti bahan bakar atau aroma khasnya.
            </p>
            <dl className="mt-8 border-t border-paper/10">
              {[
                ["Kapasitas", facts.capacity],
                ["Waktu siklus", facts.cycle],
                ["Setpoint", facts.setpoint],
                ["Operator", "1 orang"],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="flex items-baseline justify-between gap-6 border-b border-paper/10 py-3.5"
                >
                  <dt className="text-sm text-paper/65">{label}</dt>
                  <dd className="text-right text-sm font-semibold text-paper">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="surface-paper bg-paper text-graphite">
        <div className="mx-auto grid max-w-[1200px] gap-12 px-5 py-20 sm:px-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="text-sm font-semibold text-ember-dark">Cara kerja</p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              Tiga hal yang terjadi di dalam mesin.
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-steel-text">
              Bukan robot yang menggantikan rasa. Hanya bagian panas dan berulang
              yang diambil alih, sementara arang dan kemplang tetap sama.
            </p>
            <Image
              src="/alat/intan-atas.webp"
              alt="Render tampak atas INTAN yang memperlihatkan enam rak penjepit dan dua kompartemen bara"
              width={1500}
              height={582}
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="mt-10 h-auto w-full"
            />
            <p className="mt-2 text-xs text-steel-text">
              Render konsep · enam rak U-loop dan dua kompartemen arang.
            </p>
          </div>

          <ol className="divide-y divide-graphite/15 border-t border-graphite/15 lg:col-span-7">
            {langkah.map((item, index) => (
              <li key={item.judul} className="grid grid-cols-[auto_1fr] gap-5 py-7 sm:gap-8">
                <span className="font-display text-3xl font-semibold text-ember-dark tabular-numbers sm:text-4xl">
                  0{index + 1}
                </span>
                <div>
                  <h3 className="font-display text-xl font-semibold tracking-tight">{item.judul}</h3>
                  <p className="mt-2 max-w-xl text-base leading-relaxed text-steel-text">{item.isi}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="surface-paper border-t border-graphite/10 bg-paper-raised text-graphite">
        <div className="mx-auto max-w-[1200px] px-5 py-16 sm:px-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-semibold text-ember-dark">Data uji</p>
              <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                Enam sampel. Enam matang.
              </h2>
            </div>
            <Link
              href="/riset"
              className="inline-flex items-center gap-2 text-sm font-semibold text-graphite underline decoration-graphite/30 underline-offset-4 hover:decoration-graphite"
            >
              Lihat seluruh data
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <TableScroll className="mt-8" label="Tabel sampel uji INTAN">
            <table className="w-full min-w-[540px] border-collapse text-left text-sm">
              <caption className="sr-only">
                Enam sampel uji kemplang tunu: waktu, suhu, dan catatan.
              </caption>
              <thead>
                <tr className="border-b border-graphite/25 text-xs text-steel-text">
                  <th scope="col" className="py-3 pr-4 font-medium">Batch</th>
                  <th scope="col" className="py-3 pr-4 font-medium">Waktu</th>
                  <th scope="col" className="py-3 pr-4 font-medium">Suhu</th>
                  <th scope="col" className="py-3 font-medium">Catatan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-graphite/10">
                {sampelUjiData.map((item) => (
                  <tr key={item.id}>
                    <td className="py-3 pr-4 font-medium tabular-numbers">{String(item.id).padStart(2, "0")}</td>
                    <td className="py-3 pr-4 tabular-numbers">{item.waktu} detik</td>
                    <td className="py-3 pr-4 tabular-numbers">{item.suhu.toLocaleString("id-ID", { maximumFractionDigits: 2 })} °C</td>
                    <td className="py-3 text-steel-text">{item.keterangan}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </TableScroll>
          <p className="mt-4 max-w-3xl text-xs leading-relaxed text-steel-text">
            Setpoint operasi 550–600 °C. Sampel 1–3 berada di bawah setpoint
            (492–540 °C); sampel 1–2 masih pemanasan awal, sampel 3 tetap matang
            merata. Sampel 4 memicu cut-off pada 612,4 °C sebelum kembali stabil.
          </p>
        </div>
      </section>

      <section className="bg-stage text-paper">
        <div className="mx-auto grid max-w-[1200px] gap-8 px-5 py-20 sm:px-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="text-sm font-semibold text-ember-bright">Kemitraan</p>
            <h2 className="mt-3 max-w-2xl font-display text-4xl font-semibold tracking-tight sm:text-5xl">
              Bawa INTAN ke dapur produksi Anda.
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-paper/65">
              Kami membuka demonstrasi mesin, adopsi UMKM, dan replikasi unit
              untuk sentra kemplang tunu. Ceritakan kebutuhan produksi Anda.
            </p>
          </div>
          <div className="lg:col-span-4 lg:text-right">
            <Link
              href="/kontak"
              className="inline-flex min-h-12 items-center justify-center gap-2 bg-paper px-5 py-3 text-sm font-semibold text-graphite transition-colors hover:bg-paper-raised"
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
