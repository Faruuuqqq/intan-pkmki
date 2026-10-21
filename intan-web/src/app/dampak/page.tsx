import { ArrowUpRight, ExternalLink } from "lucide-react";
import { mediaPublikasi, mitraMou, diversifikasiProduk } from "@/data/timData";
import { socials, videoId } from "@/data/site";

export default function DampakPage() {
  return (
    <div className="bg-stage text-paper">
      <section className="border-b border-paper/10">
        <div className="mx-auto max-w-[1200px] px-5 py-12 sm:px-8 sm:py-16">
          <p className="text-sm text-steel">Dampak</p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            Lihat mesinnya bekerja sebelum percaya angkanya.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-paper/65">
            Rekaman pengujian langsung di atas bara arang, liputan media, dan
            kesepakatan dengan mitra UMKM.
          </p>
        </div>
      </section>

      <section id="video" className="mx-auto max-w-[1200px] px-5 py-10 sm:px-8 sm:py-14">
        <div className="overflow-hidden border border-paper/15 bg-graphite">
          <div className="relative aspect-video w-full">
            <iframe
              src={`https://www.youtube.com/embed/${videoId}`}
              title="Video demonstrasi INTAN PKM-KI Unpad"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
              className="absolute inset-0 h-full w-full"
            />
          </div>
        </div>
        <div className="mt-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <p className="max-w-2xl text-sm leading-relaxed text-paper/65">
            Uji pemanggangan kemplang tunu: enam keping, bara arang aktif, dan
            mekanisme pembalik servo.
          </p>
          <a
            href={socials.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-ember-bright hover:text-paper"
          >
            Tonton di YouTube
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </section>

      <div className="surface-paper bg-paper text-graphite">
        <section className="border-t border-graphite/15">
          <div className="mx-auto max-w-[1200px] px-5 py-16 sm:px-8">
            <p className="text-sm font-semibold text-ember-dark">Liputan</p>
            <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              Yang bisa dibaca langsung.
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-steel-text">
              Tautan yang tersedia dibuka di kanal masing-masing. Arsip cetak
              lain dapat diminta ke tim.
            </p>
            <ul className="mt-6 border-t border-graphite/20">
              {mediaPublikasi.map((media) => (
                <li key={media.name}>
                  <a
                    href={media.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between gap-4 border-b border-graphite/15 py-4"
                  >
                    <span>
                      <span className="block font-display text-lg font-semibold tracking-tight">{media.name}</span>
                      <span className="mt-0.5 block text-xs text-steel-text">{media.tag}</span>
                    </span>
                    <ExternalLink className="h-4 w-4 shrink-0 text-steel-text transition-colors group-hover:text-graphite" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="border-t border-graphite/15">
          <div className="mx-auto max-w-[1200px] px-5 py-16 sm:px-8">
            <p className="text-sm font-semibold text-ember-dark">Kemitraan</p>
            <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              Dua mitra, dua peran.
            </h2>
            <div className="mt-6 border-t border-graphite/20">
              {mitraMou.map((mitra) => (
                <article key={mitra.name} className="grid gap-4 border-b border-graphite/15 py-7 md:grid-cols-12 md:gap-8">
                  <div className="md:col-span-5">
                    <p className="text-xs font-semibold text-ember-dark">{mitra.peran}</p>
                    <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight">{mitra.name}</h3>
                    <p className="mt-1 text-sm text-steel-text">{mitra.pic}</p>
                  </div>
                  <div className="md:col-span-7">
                    <p className="text-sm leading-relaxed text-steel-text">{mitra.deskripsi}</p>
                    <p className="mt-3 inline-flex items-center gap-2 text-xs font-semibold text-graphite">
                      <span className="h-1.5 w-1.5 bg-ember-dark" aria-hidden="true" />
                      {mitra.status}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-graphite/15">
          <div className="mx-auto max-w-[1200px] px-5 py-16 sm:px-8">
            <p className="text-sm font-semibold text-ember-dark">Diversifikasi</p>
            <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              Bukan hanya kemplang.
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-steel-text">
              Penjepit modular dapat disesuaikan untuk komoditas panggang lain.
              Ini membuka penggunaan mesin di luar musim kemplang.
            </p>
            <ul className="mt-6 grid gap-6 border-t border-graphite/20 pt-6 md:grid-cols-3">
              {diversifikasiProduk.map((item) => (
                <li key={item.name}>
                  <h3 className="font-display text-lg font-semibold tracking-tight">{item.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-steel-text">{item.deskripsi}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}
