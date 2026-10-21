"use client";

import { useState } from "react";
import { sampelUjiData, ringkasanUji, competitiveLandscape } from "@/data/sampelUji";
import { facts } from "@/data/site";
import { TableScroll } from "@/components/ui/TableScroll";

export default function RisetPage() {
  const [hours, setHours] = useState<number>(5);

  const minManual = hours * 80;
  const maxManual = hours * 100;
  const manualDefect = Math.round(((minManual + maxManual) / 2) * 0.1);
  const minIntan = hours * 400;
  const maxIntan = hours * 420;
  const monthlyIntan = maxIntan * 25;

  return (
    <div className="surface-paper bg-paper text-graphite">
      <section className="border-b border-graphite/15">
        <div className="mx-auto max-w-[1200px] px-5 py-12 sm:px-8 sm:py-16">
          <p className="text-sm font-semibold text-ember-dark">Riset</p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            Enam sampel, dan catatan yang tidak disembunyikan.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-steel-text">
            Data pemanggangan langsung di atas bara arang, perbandingan dengan
            metode manual, dan model kapasitas untuk skala UMKM.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-5 py-12 sm:px-8">
        <dl className="grid grid-cols-2 gap-6 border-y border-graphite/20 py-6 sm:grid-cols-4">
          {[
            ["Rata-rata siklus", `${ringkasanUji.rataWaktu.toLocaleString("id-ID", { minimumFractionDigits: 1, maximumFractionDigits: 1 })} detik`, ringkasanUji.rentangWaktu],
            ["Rata-rata suhu", `${ringkasanUji.rataSuhu.toLocaleString("id-ID", { maximumFractionDigits: 2 })} °C`, `Setpoint ${ringkasanUji.rentangSuhuEvaluasi}`],
            ["Keseragaman", ringkasanUji.keseragaman, `Cacat ${ringkasanUji.defectRate}`],
            ["Uji kontinu", "Lulus", ringkasanUji.ujiKontinu],
          ].map(([label, value, note], index) => (
            <div key={label} className={index > 0 ? "sm:border-l sm:border-graphite/15 sm:pl-6" : ""}>
              <dt className="text-xs text-steel-text">{label}</dt>
              <dd className="mt-1 font-display text-2xl font-semibold tabular-numbers">{value}</dd>
              <dd className="mt-1 text-xs text-steel-text">{note}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-12">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-semibold text-ember-dark">Log pengukuran</p>
              <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight">
                Uji pemanggangan 6 sampel.
              </h2>
            </div>
            <p className="text-xs text-steel-text">6 dari 6 sampel matang · data dokumen teknis</p>
          </div>

          <TableScroll className="mt-6" label="Tabel hasil pengujian enam sampel">
            <table className="w-full min-w-[680px] border-collapse text-left text-sm">
              <caption className="sr-only">
                Hasil pengujian enam sampel kemplang tunu, termasuk waktu siklus, suhu, dan catatan.
              </caption>
              <thead>
                <tr className="border-b border-graphite/25 text-xs text-steel-text">
                  <th scope="col" className="py-3 pr-4 font-medium">Batch</th>
                  <th scope="col" className="py-3 pr-4 font-medium">Status</th>
                  <th scope="col" className="py-3 pr-4 font-medium">Waktu</th>
                  <th scope="col" className="py-3 pr-4 font-medium">Suhu</th>
                  <th scope="col" className="py-3 font-medium">Catatan</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-graphite/10">
                {sampelUjiData.map((item) => {
                  const warmup = item.suhu < 550;
                  const cutoff = item.suhu > 600;
                  return (
                    <tr key={item.id}>
                      <td className="py-3.5 pr-4 font-medium tabular-numbers">
                        {String(item.id).padStart(2, "0")}
                      </td>
                      <td className="py-3.5 pr-4">
                        <span className="inline-flex items-center gap-2 text-xs font-medium">
                          <span className="h-1.5 w-1.5 bg-ember-dark" aria-hidden="true" />
                          {item.status}
                        </span>
                      </td>
                      <td className="py-3.5 pr-4 tabular-numbers">{item.waktu} detik</td>
                      <td className={`py-3.5 pr-4 tabular-numbers ${warmup || cutoff ? "font-semibold text-ember-dark" : ""}`}>
                        {item.suhu.toLocaleString("id-ID", { maximumFractionDigits: 2 })} °C
                        {warmup && <span className="ml-2 text-xs font-normal text-steel-text">di bawah setpoint</span>}
                        {cutoff && <span className="ml-2 text-xs font-normal text-steel-text">cut-off</span>}
                      </td>
                      <td className="py-3.5 text-steel-text">{item.keterangan}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </TableScroll>
          <p className="mt-4 max-w-3xl text-xs leading-relaxed text-steel-text">
            Setpoint operasi 550–600 °C. Sampel 1–3 berada di bawah setpoint:
            sampel 1–2 masih pemanasan awal, sampel 3 tetap matang merata pada
            540,1 °C. Sampel 4 melewati 600 °C dan memicu cut-off sebelum
            kembali stabil. Rata-rata 547,72 °C karena tiga sampel bawah setpoint
            tersebut.
          </p>
        </div>
      </section>

      <section className="border-t border-graphite/15">
        <div className="mx-auto max-w-[1200px] px-5 py-16 sm:px-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-semibold text-ember-dark">Kalkulator</p>
              <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                Berapa keping dalam satu shift?
              </h2>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-steel-text">
                Geser durasi kerja untuk membandingkan kapasitas manual dan
                INTAN. Estimasi memakai rentang 80–100 keping/jam untuk manual
                dan 400–420 keping/jam untuk INTAN.
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-steel-text">Jam kerja per hari</p>
              <p className="font-display text-2xl font-semibold tabular-numbers">{hours} jam</p>
            </div>
          </div>

          <div className="mt-8 border border-graphite/15 bg-paper-raised p-5 sm:p-8">
            <div className="flex items-center justify-between text-xs text-steel-text">
              <span>1 jam</span>
              <span>4 jam</span>
              <span>8 jam</span>
            </div>
            <input
              type="range"
              min={1}
              max={8}
              value={hours}
              onChange={(e) => setHours(parseInt(e.target.value, 10))}
              aria-label="Jam kerja per hari"
              className="mt-3 h-1.5 w-full cursor-pointer appearance-none rounded bg-graphite/20"
            />

            <div className="mt-8 grid gap-8 border-t border-graphite/15 pt-6 md:grid-cols-2">
              <div>
                <h3 className="text-sm font-semibold text-steel-text">Manual</h3>
                <p className="mt-2 font-display text-3xl font-semibold tabular-numbers">
                  {minManual.toLocaleString("id-ID")}–{maxManual.toLocaleString("id-ID")}
                  <span className="ml-2 text-sm font-normal text-steel-text">keping/hari</span>
                </p>
                <p className="mt-3 text-sm text-steel-text">
                  Estimasi reject/gosong (~10%):{" "}
                  <span className="font-semibold text-graphite">±{manualDefect.toLocaleString("id-ID")} keping</span>
                </p>
              </div>
              <div className="md:border-l md:border-graphite/15 md:pl-8">
                <h3 className="text-sm font-semibold text-ember-dark">INTAN</h3>
                <p className="mt-2 font-display text-3xl font-semibold tabular-numbers">
                  {minIntan.toLocaleString("id-ID")}–{maxIntan.toLocaleString("id-ID")}
                  <span className="ml-2 text-sm font-normal text-steel-text">keping/hari</span>
                </p>
                <p className="mt-3 text-sm text-steel-text">
                  Proyeksi 25 hari:{" "}
                  <span className="font-semibold text-graphite">{monthlyIntan.toLocaleString("id-ID")} keping</span>
                </p>
              </div>
            </div>
            <p className="mt-6 border-t border-graphite/15 pt-4 text-xs leading-relaxed text-steel-text">
              Estimasi ini bukan jaminan produksi. Faktor adonan, kadar air,
              dan waktu bongkar-muat tetap memengaruhi hasil aktual.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-graphite/15">
        <div className="mx-auto max-w-[1200px] px-5 py-16 sm:px-8">
          <p className="text-sm font-semibold text-ember-dark">Perbandingan</p>
          <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Manual dan INTAN, bersebelahan.
          </h2>
          <TableScroll className="mt-6" label="Tabel perbandingan manual dan INTAN">
            <table className="w-full min-w-[620px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-graphite/25 text-xs text-steel-text">
                  <th scope="col" className="py-3 pr-4 font-medium">Metrik</th>
                  <th scope="col" className="py-3 pr-4 font-medium">Manual</th>
                  <th scope="col" className="py-3 font-medium text-ember-dark">INTAN</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-graphite/10">
                {competitiveLandscape.map((row) => (
                  <tr key={row.parameter}>
                    <th scope="row" className="py-3.5 pr-4 text-left font-medium">{row.parameter}</th>
                    <td className="py-3.5 pr-4 text-steel-text">{row.konvensional}</td>
                    <td className="py-3.5 text-graphite">{row.intan}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </TableScroll>
          <p className="mt-4 text-xs text-steel-text">
            Kapasitas INTAN {facts.capacity}; siklus {facts.cycle} untuk enam keping.
          </p>
        </div>
      </section>
    </div>
  );
}
