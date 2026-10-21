"use client";

import { useState } from "react";
import { AlertOctagon, Check, ShieldAlert, X } from "lucide-react";
import { sopSteps, emergencySteps, dosAndDonts, type SopPhase } from "@/data/sopData";

const phases = [
  { key: "all", label: "Semua", count: sopSteps.length },
  { key: "fase1", label: "Persiapan", count: sopSteps.filter((s) => s.phase === "fase1").length },
  { key: "fase2", label: "Bahan bakar", count: sopSteps.filter((s) => s.phase === "fase2").length },
  { key: "fase3", label: "Pemanggangan", count: sopSteps.filter((s) => s.phase === "fase3").length },
  { key: "fase4", label: "Pasca-produksi", count: sopSteps.filter((s) => s.phase === "fase4").length },
] as const;

const phaseTitles = {
  fase1: "Persiapan & instalasi",
  fase2: "Bahan bakar",
  fase3: "Pemanggangan",
  fase4: "Pasca-produksi",
} as const;

export default function SopPage() {
  const [filterPhase, setFilterPhase] = useState<SopPhase>("all");

  const filteredSteps =
    filterPhase === "all" ? sopSteps : sopSteps.filter((step) => step.phase === filterPhase);

  const groups = (["fase1", "fase2", "fase3", "fase4"] as const)
    .map((phase) => ({
      phase,
      steps: filteredSteps.filter((step) => step.phase === phase),
    }))
    .filter((group) => group.steps.length > 0);

  return (
    <div className="surface-paper bg-paper text-graphite">
      <section className="border-b border-graphite/15">
        <div className="mx-auto max-w-[1200px] px-5 py-12 sm:px-8 sm:py-16">
          <p className="text-sm font-semibold text-ember-dark">SOP</p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            Dua belas langkah, satu urutan.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-steel-text">
            Prosedur operasional dan protokol keselamatan untuk area semi-outdoor.
            Baca seluruh bagian sebelum menyalakan mesin.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-5 py-10 sm:px-8">
        <div className="flex flex-wrap gap-2 border-b border-graphite/20 pb-3" role="group" aria-label="Filter fase SOP">
          {phases.map((phase) => {
            const active = filterPhase === phase.key;
            return (
              <button
                key={phase.key}
                type="button"
                onClick={() => setFilterPhase(phase.key as SopPhase)}
                aria-pressed={active}
                className={`min-h-11 shrink-0 border px-3.5 py-2 text-sm font-medium transition ${
                  active
                    ? "border-graphite bg-graphite text-paper"
                    : "border-graphite/20 text-steel-text hover:border-graphite/50 hover:text-graphite"
                }`}
              >
                {phase.label}
                <span className={active ? "ml-2 text-paper/70" : "ml-2 text-steel-text"}>{phase.count}</span>
              </button>
            );
          })}
        </div>

        <div className="mt-10 space-y-12">
          {groups.map((group) => (
            <section key={group.phase} aria-labelledby={`judul-${group.phase}`}>
              <div className="flex flex-col justify-between gap-1 border-b border-graphite/25 pb-3 sm:flex-row sm:items-baseline">
                <h2 id={`judul-${group.phase}`} className="font-display text-xl font-semibold tracking-tight">
                  {phaseTitles[group.phase]}
                </h2>
                <span className="text-xs text-steel-text">
                  {group.steps.length} langkah
                </span>
              </div>
              <ol>
                {group.steps.map((step) => (
                  <li key={step.step} className="grid gap-4 border-b border-graphite/10 py-6 sm:grid-cols-[3.5rem_1fr] sm:gap-6">
                    <span className="font-display text-2xl font-semibold text-ember-dark tabular-numbers">
                      {String(step.step).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="font-display text-lg font-semibold tracking-tight">{step.title}</h3>
                      <p className="mt-1.5 max-w-3xl text-base leading-relaxed text-steel-text">{step.desc}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>
          ))}
        </div>

        <div className="mt-12 flex gap-4 border-l-2 border-ember-dark bg-paper-raised p-5">
          <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-ember-dark" aria-hidden="true" />
          <div>
            <h2 className="font-display text-lg font-semibold tracking-tight">
              Wajib semi-outdoor
            </h2>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-steel-text">
              Pengoperasian wajib di area berventilasi terbuka lebar dan beratap.
              Ini mengurangi penumpukan karbon monoksida dari bara dan melindungi
              modul elektronik dari cipratan air. Pastikan stopkontak 220 V
              memiliki pentanahan yang baik.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-graphite/15">
        <div className="mx-auto max-w-[1200px] px-5 py-16 sm:px-8">
          <div className="bg-stage p-5 text-paper sm:p-8">
            <div className="flex items-center gap-2 border-b border-paper/10 pb-4">
              <AlertOctagon className="h-5 w-5 text-ember-bright" aria-hidden="true" />
              <h2 className="font-display text-xl font-semibold tracking-tight">
                Matikan mesin: lima langkah
              </h2>
            </div>
            <ol className="mt-5 divide-y divide-paper/10">
              {emergencySteps.map((step, index) => (
                <li key={step} className="grid grid-cols-[2rem_1fr] gap-3 py-4 text-sm leading-relaxed text-paper/75">
                  <span className="text-xs font-semibold text-ember-bright tabular-numbers">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-10 grid gap-8 md:grid-cols-2">
            <div>
              <h2 className="flex items-center gap-2 border-b border-graphite/20 pb-3 font-display text-lg font-semibold tracking-tight">
                <Check className="h-4 w-4 text-ember-dark" aria-hidden="true" />
                Lakukan
              </h2>
              <ul className="mt-4 space-y-3">
                {dosAndDonts.dos.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-relaxed text-steel-text">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-ember-dark" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="flex items-center gap-2 border-b border-graphite/20 pb-3 font-display text-lg font-semibold tracking-tight">
                <X className="h-4 w-4 text-ember-dark" aria-hidden="true" />
                Jangan
              </h2>
              <ul className="mt-4 space-y-3">
                {dosAndDonts.donts.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-relaxed text-steel-text">
                    <X className="mt-0.5 h-4 w-4 shrink-0 text-ember-dark" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
