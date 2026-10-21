export type SopPhase = "all" | "fase1" | "fase2" | "fase3" | "fase4";

export interface SopStep {
  step: number;
  phase: "fase1" | "fase2" | "fase3" | "fase4";
  phaseName: string;
  title: string;
  desc: string;
  icon: string;
}

export const sopSteps: SopStep[] = [
  {
    step: 1,
    phase: "fase1",
    phaseName: "Fase 1: Persiapan & Instalasi",
    title: "Inspeksi visual & keamanan ECU",
    desc: "Pastikan seluruh bagian roaster dalam kondisi bersih, kering, dan bebas dari benda asing. Pastikan tangan operator kering sebelum menyentuh sakelar daya.",
    icon: "🔍",
  },
  {
    step: 2,
    phase: "fase1",
    phaseName: "Fase 1: Persiapan & Instalasi",
    title: "Pemasangan rak penjepit SUS 304",
    desc: "Pasangkan poros rak penjepit stainless steel SUS 304 ke slot konektor poros motor servo MG996R di bagian belakang palung dengan presisi.",
    icon: "🧩",
  },
  {
    step: 3,
    phase: "fase1",
    phaseName: "Fase 1: Persiapan & Instalasi",
    title: "Penguncian mekanis rak penjepit",
    desc: "Kencangkan mur pengunci poros menggunakan tangan atau kunci pas mini agar rak tidak goyang atau slip saat berputar 180°.",
    icon: "🔩",
  },
  {
    step: 4,
    phase: "fase1",
    phaseName: "Fase 1: Persiapan & Instalasi",
    title: "Integrasi daya listrik & kalibrasi rotasi",
    desc: "Tancapkan steker ke stopkontak AC 220 V ber-arde. Hidupkan sakelar utama dan amati uji kalibrasi awal servo 180° tanpa beban.",
    icon: "⚡",
  },
  {
    step: 5,
    phase: "fase2",
    phaseName: "Fase 2: Penyiapan Bahan Bakar",
    title: "Pengisian arang & ruang aman",
    desc: "Tarik kedua laci arang depan. Isi briket arang batok kelapa secara merata dengan menjaga jarak aman 5–7 cm dari kisi penjepit atas.",
    icon: "🪵",
  },
  {
    step: 6,
    phase: "fase2",
    phaseName: "Fase 2: Penyiapan Bahan Bakar",
    title: "Pemasangan kembali laci pembakaran",
    desc: "Dorong kedua laci arang kembali ke dalam rel kompartemen bodi hingga tertutup rapat demi menjaga efisiensi sirkulasi oksigen blower.",
    icon: "🗄️",
  },
  {
    step: 7,
    phase: "fase2",
    phaseName: "Fase 2: Penyiapan Bahan Bakar",
    title: "Pemantauan bara api stabil",
    desc: "Nyalakan arang menggunakan pembakar gas hingga terbentuk bara merah stabil yang tertutup abu putih tipis dan bebas asap pekat sebelum memanggang.",
    icon: "🔥",
  },
  {
    step: 8,
    phase: "fase3",
    phaseName: "Fase 3: Operasional Otomasi",
    title: "Posisi probe & pengaturan knob blower",
    desc: "Posisikan probe termokopel tipe-K di ruang bakar atas dan atur hembusan blower keong kiri-kanan menggunakan 2 knob PWM AC Dimmer.",
    icon: "🎛️",
  },
  {
    step: 9,
    phase: "fase3",
    phaseName: "Fase 3: Operasional Otomasi",
    title: "Pemantauan LCD & kendali histeresis",
    desc: "Amati suhu pada layar LCD 20×4 I2C. Sistem histeresis otomatis mematikan blower pada suhu ≥ 600 °C dan menyalakan kembali saat suhu ≤ 550 °C.",
    icon: "📊",
  },
  {
    step: 10,
    phase: "fase3",
    phaseName: "Fase 3: Operasional Otomasi",
    title: "Pemuatan adonan kemplang",
    desc: "Jepitkan 6 keping adonan kemplang tunu mentah ke dalam kisi kawat penjepit SUS 304 menggunakan capitan masak anti-panas.",
    icon: "🍘",
  },
  {
    step: 11,
    phase: "fase3",
    phaseName: "Fase 3: Operasional Otomasi",
    title: "Pemanggangan otomatis & pemanenan",
    desc: "Alat membalik otomatis 180° setiap 15 detik dengan jeda 30 ms. Kemplang mekar sempurna dalam rata-rata 46,5 detik (45–48 detik). Angkat dengan capitan.",
    icon: "⏱️",
  },
  {
    step: 12,
    phase: "fase4",
    phaseName: "Fase 4: Pasca-produksi",
    title: "Pendinginan, pembersihan & perawatan",
    desc: "Matikan sakelar utama, cabut kabel PLN, biarkan alat dingin alami. Lepas rak penjepit untuk dicuci air sabun, dan bersihkan abu sisa pada laci arang.",
    icon: "🧼",
  },
];

export const emergencySteps = [
  "Tekan sakelar daya utama ke posisi mati (OFF).",
  "Cabut steker listrik PLN 220 V dari stopkontak dinding.",
  "Evakuasi segera seluruh kemplang di atas rak menggunakan capitan panjang.",
  "Tarik kedua laci arang keluar menggunakan sarung tangan tahan panas.",
  "Biarkan alat mendingin secara alami. Dilarang keras menyiram air langsung ke bodi atau kotak ECU elektronik.",
];

export const dosAndDonts = {
  dos: [
    "Gunakan selalu stopkontak dengan sistem pentanahan (arde) yang baik.",
    "Operasikan di ruangan semi-outdoor dengan sirkulasi udara terbuka.",
    "Gunakan alat pelindung diri: sarung tangan tahan panas dan capitan masak.",
    "Jaga jarak tumpukan arang minimal 5–7 cm di bawah kisi penjepit.",
    "Bersihkan rak penjepit stainless steel setiap selesai proses produksi.",
  ],
  donts: [
    "Dilarang menyiram air langsung ke atas bodi panas atau kompartemen ECU.",
    "Dilarang menahan rotasi rak secara manual saat servo sedang berputar.",
    "Dilarang mengoperasikan alat di ruang tertutup rapat tanpa ventilasi CO.",
    "Dilarang menggunakan sikat kawat kasar pada bagian stainless steel SUS 304.",
    "Dilarang mengisi briket arang melampaui batas tinggi laci pembakar.",
  ],
};
