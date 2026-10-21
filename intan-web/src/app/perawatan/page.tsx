"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Wrench } from "lucide-react";
import {
  jadwalPerawatan,
  matriksTroubleshooting,
  garansi4Lapis,
  garansiInfo,
} from "@/data/perawatanData";
import { TableScroll } from "@/components/ui/TableScroll";

export default function PerawatanPage() {
  const [tBaca, setTBaca] = useState("101,5");
  const tRef = 100.0;
  const tBacaNum = parseFloat(tBaca.replace(",", ".")) || 0;
  const errorPercent = Math.abs((tBacaNum - tRef) / tRef) * 100;
  const isValid = errorPercent <= 3.0;

  return (
    <div className="surface-paper bg-paper text-graphite">
      <section className="border-b border-graphite/15">
        <div className="mx-auto max-w-[1200px] px-5 py-12 sm:px-8 sm:py-16">
          <p className="text-sm font-semibold text-ember-dark">Perawatan</p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            Mesin yang dirawat lebih murah daripada mesin yang diperbaiki.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-steel-text">
            Jadwal preventif, pemeriksaan termokopel, penanganan gangguan, dan
            skema garansi empat lapis.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-5 py-12 sm:px-8">
        <div className="border border-graphite/15 bg-paper-raised p-5 sm:p-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
            <div>
              <p className="text-sm font-semibold text-ember-dark">Kalibrasi</p>
              <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight">
                Uji titik didih air.
              </h2>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-steel-text">
                Masukkan pembacaan termokopel saat probe berada di air mendidih.
                Target pembacaan ±2%; lakukan kalibrasi ulang jika galat melewati 3%.
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <label htmlFor="t-baca" className="whitespace-nowrap text-sm text-steel-text">
                T baca
              </label>
              <input
                id="t-baca"
                type="text"
                inputMode="decimal"
                value={tBaca}
                onChange={(e) => setTBaca(e.target.value.replace(/[^0-9,.]/g, ""))}
                className="w-24 border border-graphite/25 bg-paper px-2.5 py-2 text-right font-mono text-sm tabular-numbers focus:border-ember-dark"
              />
              <span className="text-sm text-steel-text">°C</span>
            </div>
          </div>

          <div className="mt-6 grid gap-4 border-t border-graphite/15 pt-5 sm:grid-cols-[1fr_auto] sm:items-center">
            <p className="font-mono text-xs text-steel-text">
              E = |(T baca − 100 °C) / 100 °C| × 100%
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <p className="text-sm text-steel-text">
                Galat <span className={`font-semibold tabular-numbers ${isValid ? "text-graphite" : "text-ember-dark"}`}>{errorPercent.toFixed(2).replace(".", ",")}%</span>
              </p>
              <p className={`border px-2.5 py-1 text-xs font-semibold ${isValid ? "border-graphite/25 text-graphite" : "border-ember-dark text-ember-dark"}`}>
                {isValid ? "Dalam toleransi" : "Kalibrasi ulang"}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-14">
          <div className="flex items-center gap-2">
            <Wrench className="h-4 w-4 text-ember-dark" aria-hidden="true" />
            <p className="text-sm font-semibold text-ember-dark">Jadwal preventif</p>
          </div>
          <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Tiga ritme perawatan.
          </h2>
          <div className="mt-6 border-t border-graphite/20">
            {jadwalPerawatan.map((item) => (
              <article key={item.periode} className="grid gap-3 border-b border-graphite/15 py-6 md:grid-cols-[180px_1fr] md:gap-8">
                <div>
                  <h3 className="font-display text-xl font-semibold tracking-tight">{item.periode}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-steel-text">{item.durasi}</p>
                </div>
                <div>
                  <ul className="space-y-2">
                    {item.tugas.map((tugas) => (
                      <li key={tugas} className="flex gap-3 text-sm leading-relaxed text-steel-text">
                        <span className="mt-2 h-1 w-1 shrink-0 bg-ember-dark" aria-hidden="true" />
                        <span>{tugas}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-3 border-l border-ember-dark/50 pl-3 text-xs leading-relaxed text-steel-text">
                    {item.catatan}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-graphite/15">
        <div className="mx-auto max-w-[1200px] px-5 py-16 sm:px-8">
          <p className="text-sm font-semibold text-ember-dark">Gangguan</p>
          <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Cari gejala, bukan kode rahasia.
          </h2>
          <TableScroll className="mt-6" label="Tabel gangguan dan tindakan perawatan">
            <table className="w-full min-w-[700px] border-collapse text-left text-sm">
              <caption className="sr-only">
                Matriks gejala, penyebab, dan tindakan perawatan INTAN.
              </caption>
              <thead>
                <tr className="border-b border-graphite/25 text-xs text-steel-text">
                  <th scope="col" className="py-3 pr-4 font-medium">Tingkat</th>
                  <th scope="col" className="py-3 pr-4 font-medium">Gejala</th>
                  <th scope="col" className="py-3 pr-4 font-medium">Penyebab</th>
                  <th scope="col" className="py-3 font-medium">Tindakan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-graphite/10">
                {matriksTroubleshooting.map((item) => (
                  <tr key={item.gejala}>
                    <td className={`py-3.5 pr-4 text-xs font-semibold ${item.tingkat === "Ringan" ? "text-steel-text" : "text-ember-dark"}`}>
                      {item.tingkat}
                    </td>
                    <td className="py-3.5 pr-4 font-medium">{item.gejala}</td>
                    <td className="py-3.5 pr-4 text-steel-text">{item.kemungkinanPenyebab}</td>
                    <td className="py-3.5 text-steel-text">{item.solusi}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </TableScroll>
        </div>
      </section>

      <section className="border-t border-graphite/15">
        <div className="mx-auto max-w-[1200px] px-5 py-16 sm:px-8">
          <p className="text-sm font-semibold text-ember-dark">Garansi</p>
          <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Empat lapis, satu cadangan.
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-steel-text">
            Cadangan {garansiInfo.nominalCadangan}, diambil dari{" "}
            {garansiInfo.totalAlokasi}. {garansiInfo.profitAman}.
          </p>

          <TableScroll className="mt-6" label="Tabel garansi empat lapis">
            <table className="w-full min-w-[700px] border-collapse text-left text-sm">
              <caption className="sr-only">
                Empat lapis garansi INTAN: durasi, cakupan, cadangan, dan batas klaim.
              </caption>
              <thead>
                <tr className="border-b border-graphite/25 text-xs text-steel-text">
                  <th scope="col" className="py-3 pr-4 font-medium">Lapis</th>
                  <th scope="col" className="py-3 pr-4 font-medium">Durasi</th>
                  <th scope="col" className="py-3 pr-4 font-medium">Cakupan</th>
                  <th scope="col" className="py-3 pr-4 font-medium">Cadangan</th>
                  <th scope="col" className="py-3 font-medium">Batas klaim</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-graphite/10">
                {garansi4Lapis.map((item) => (
                  <tr key={item.lapis}>
                    <td className="py-3.5 pr-4 text-xs font-semibold text-ember-dark tabular-numbers">
                      {String(item.lapis).padStart(2, "0")}
                    </td>
                    <td className="py-3.5 pr-4">{item.durasi}</td>
                    <td className="py-3.5 pr-4">
                      <span className="font-medium">{item.nama}</span>
                      <span className="mt-0.5 block text-xs text-steel-text">{item.cakupan}</span>
                    </td>
                    <td className="py-3.5 pr-4">
                      <span className="tabular-numbers">{item.nominal}</span>
                      <span className="mt-0.5 block text-xs text-steel-text">{item.alokasi}</span>
                    </td>
                    <td className="py-3.5 text-steel-text">{item.maksKlaim}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </TableScroll>
          <p className="mt-4 max-w-3xl text-xs leading-relaxed text-steel-text">
            {garansiInfo.ketentuan}
          </p>

          <div className="mt-8 flex flex-col gap-4 border-t border-graphite/20 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-xl text-sm text-steel-text">
              Butuh sparepart, kalibrasi, atau kunjungan teknisi?
            </p>
            <Link
              href="/kontak"
              className="inline-flex min-h-11 items-center justify-center gap-2 bg-graphite px-5 py-3 text-sm font-semibold text-paper transition-colors hover:bg-graphite/85"
            >
              Hubungi servis
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
