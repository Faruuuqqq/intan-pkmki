import Link from "next/link";
import { ArrowRight } from "lucide-react";

const pilar = [
  {
    judul: "Aktuasi servo bertahap",
    ringkas: "Enam servo, satu per satu.",
    isi: "Keenam rak diputar bergantian dengan jeda 30 ms. Arus kejut dari enam motor yang bergerak serempak dihindari, sehingga rel daya mikrokontroler tetap stabil.",
    spek: "6 × TowerPro MG996R · torsi 11 kg·cm · putaran 180°",
  },
  {
    judul: "Histeresis termal tertutup",
    ringkas: "Bara diatur lewat oksigen.",
    isi: "Termokopel tipe-K membaca suhu ruang bakar. Saat 600 °C, relay memutus blower; saat 550 °C, blower dinyalakan lagi. Panas tetap berasal dari arang, bukan elemen listrik.",
    spek: "Termokopel tipe-K · MAX6675 SPI · 2 blower keong · relay opto",
  },
  {
    judul: "Firmware non-blocking",
    ringkas: "Tidak ada delay() yang menghentikan mesin.",
    isi: "Arduino Nano menjadwalkan gerak servo, pembacaan sensor, dan pembaruan LCD dengan millis(). Satu tugas lambat tidak menghentikan tugas lain.",
    spek: "Arduino Nano V3 · ATmega328P 16 MHz · watchdog",
  },
  {
    judul: "Isolasi daya tiga zona",
    ringkas: "Daya kotor dan sinyal dipisah.",
    isi: "Zona AC 220 V untuk blower, zona DC 5 V untuk servo, dan zona sinyal 5 V untuk mikrokontroler dipisahkan. Optoisolator menjaga gangguan elektromagnetik tidak masuk ke jalur logika.",
    spek: "PSU switching 5 V/10 A · relay opto · sekring keramik",
  },
];

const siklus = [
  {
    judul: "Baca suhu",
    isi: "MAX6675 mengambil tegangan termokopel tipe-K di ruang bakar.",
  },
  {
    judul: "Evaluasi histeresis",
    isi: "Suhu ≥ 600 °C memutus blower. Suhu ≤ 550 °C menyalakannya kembali.",
  },
  {
    judul: "Putar rak",
    isi: "Servo 1–6 membalik rak 180° bergantian, satu per satu.",
  },
  {
    judul: "Kemplang mekar",
    isi: "Enam keping matang merata dalam rata-rata 46,5 detik.",
  },
];

export default function TeknologiPage() {
  return (
    <div className="surface-paper bg-paper text-graphite">
      <section className="border-b border-graphite/15">
        <div className="mx-auto max-w-[1200px] px-5 py-12 sm:px-8 sm:py-16">
          <p className="text-sm font-semibold text-ember-dark">Teknologi</p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            Bara yang dijaga, bukan api yang dilepas.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-steel-text">
            INTAN menggabungkan panas arang dengan kendali elektronik yang
            sederhana: satu sensor, satu relay, enam servo, dan firmware yang
            tetap responsif selama proses berjalan.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-5 py-14 sm:px-8">
        <div className="overflow-x-auto border border-graphite/15 bg-paper-raised p-4 sm:p-8">
          <svg viewBox="0 0 760 300" className="h-auto w-full min-w-[600px]" role="img" aria-label="Diagram sistem kendali INTAN">
            <rect x="300" y="118" width="160" height="64" fill="#D8D2C6" stroke="#1B1A17" strokeWidth="1.5" />
            <text x="380" y="144" fill="#1B1A17" fontSize="12" fontFamily="sans-serif" textAnchor="middle" fontWeight="600">Arduino Nano</text>
            <text x="380" y="162" fill="#4F585C" fontSize="10" fontFamily="sans-serif" textAnchor="middle">jadwal non-blocking</text>

            <rect x="40" y="34" width="170" height="52" fill="none" stroke="#4F585C" strokeWidth="1.2" />
            <text x="125" y="55" fill="#1B1A17" fontSize="11" fontFamily="sans-serif" textAnchor="middle">Termokopel tipe-K</text>
            <text x="125" y="71" fill="#7C8589" fontSize="9" fontFamily="sans-serif" textAnchor="middle">suhu ruang bakar</text>
            <path d="M 210 60 L 300 60 L 300 118" fill="none" stroke="#4F585C" strokeWidth="1.2" />

            <rect x="40" y="214" width="170" height="52" fill="none" stroke="#4F585C" strokeWidth="1.2" />
            <text x="125" y="235" fill="#1B1A17" fontSize="11" fontFamily="sans-serif" textAnchor="middle">LCD I2C 20×4</text>
            <text x="125" y="251" fill="#7C8589" fontSize="9" fontFamily="sans-serif" textAnchor="middle">telemetri operator</text>
            <path d="M 300 166 L 125 166 L 125 214" fill="none" stroke="#4F585C" strokeWidth="1.2" />

            <rect x="550" y="34" width="170" height="52" fill="none" stroke="#A63A0B" strokeWidth="1.3" />
            <text x="635" y="55" fill="#1B1A17" fontSize="11" fontFamily="sans-serif" textAnchor="middle">Relay 2 kanal</text>
            <text x="635" y="71" fill="#A63A0B" fontSize="9" fontFamily="sans-serif" textAnchor="middle">blower kiri / kanan</text>
            <path d="M 460 118 L 535 118 L 535 60 L 550 60" fill="none" stroke="#A63A0B" strokeWidth="1.3" />

            <rect x="550" y="214" width="170" height="52" fill="none" stroke="#4F585C" strokeWidth="1.2" />
            <text x="635" y="235" fill="#1B1A17" fontSize="11" fontFamily="sans-serif" textAnchor="middle">6 × servo MG996R</text>
            <text x="635" y="251" fill="#7C8589" fontSize="9" fontFamily="sans-serif" textAnchor="middle">rak penjepit</text>
            <path d="M 460 166 L 505 166 L 505 240 L 550 240" fill="none" stroke="#4F585C" strokeWidth="1.2" />

            <path d="M 380 182 L 380 208" fill="none" stroke="#7C8589" strokeWidth="1" strokeDasharray="4 4" />
            <text x="380" y="228" fill="#7C8589" fontSize="9" fontFamily="sans-serif" textAnchor="middle">umpan balik suhu</text>
            <text x="380" y="286" fill="#7C8589" fontSize="9" fontFamily="sans-serif" textAnchor="middle">Satu lingkaran kendali: baca, putuskan, aktuasi, ulangi.</text>
          </svg>
          <p className="mt-2 text-xs text-steel-text sm:hidden">Geser diagram ke samping untuk membaca seluruh jalur.</p>
        </div>
      </section>

      <section className="border-t border-graphite/15">
        <div className="mx-auto max-w-[1200px] px-5 py-16 sm:px-8">
          <p className="text-sm font-semibold text-ember-dark">Empat bagian</p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Tidak ada bagian yang bekerja sendiri.
          </h2>
          <div className="mt-8 grid gap-x-12 md:grid-cols-2">
            {pilar.map((item) => (
              <article key={item.judul} className="border-t border-graphite/20 py-6">
                <h3 className="font-display text-xl font-semibold tracking-tight">{item.judul}</h3>
                <p className="mt-1 text-sm font-medium text-ember-dark">{item.ringkas}</p>
                <p className="mt-3 text-base leading-relaxed text-steel-text">{item.isi}</p>
                <p className="mt-3 text-xs leading-relaxed text-steel-text">{item.spek}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-graphite/15">
        <div className="mx-auto max-w-[1200px] px-5 py-16 sm:px-8">
          <p className="text-sm font-semibold text-ember-dark">Siklus kendali</p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Empat langkah, berulang.
          </h2>
          <ol className="mt-8 grid gap-6 border-t border-graphite/20 pt-6 md:grid-cols-2 lg:grid-cols-4">
            {siklus.map((item, index) => (
              <li key={item.judul}>
                <span className="font-display text-3xl font-semibold text-ember-dark tabular-numbers">0{index + 1}</span>
                <h3 className="mt-3 font-display text-lg font-semibold tracking-tight">{item.judul}</h3>
                <p className="mt-2 text-sm leading-relaxed text-steel-text">{item.isi}</p>
              </li>
            ))}
          </ol>
          <div className="mt-10 flex flex-col gap-4 border-t border-graphite/20 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-xl text-sm text-steel-text">
              Ingin melihat mekanismenya bergerak? Buka model 3D dan coba kontrol aktuasi.
            </p>
            <Link
              href="/produk"
              className="inline-flex min-h-11 items-center justify-center gap-2 bg-graphite px-5 py-3 text-sm font-semibold text-paper transition-colors hover:bg-graphite/85"
            >
              Buka model 3D
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
