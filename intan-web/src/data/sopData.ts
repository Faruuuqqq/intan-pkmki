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
    title: "Inspeksi Visual & Keamanan ECU",
    desc: "Pastikan seluruh bagian roaster dalam kondisi bersih, kering, dan bebas dari benda asing. Pastikan tangan operator kering sebelum menyentuh sakelar daya.",
    icon: "🔍",
  },
  {
    step: 2,
    phase: "fase1",
    phaseName: "Fase 1: Persiapan & Instalasi",
    title: "Pemasangan Rak Penjepit SUS 304",
    desc: "Pasangkan poros rak penjepit stainless steel SUS 304 ke slot konektor poros motor servo MG996R di bagian belakang trough dengan presisi.",
    icon: "🧩",
  },
  {
    step: 3,
    phase: "fase1",
    phaseName: "Fase 1: Persiapan & Instalasi",
    title: "Penguncian Mekanis Rak Penjepit",
    desc: "Kencangkan mur pengunci poros menggunakan tangan atau kunci pas mini agar rak tidak goyang atau slip saat berputar 180°.",
    icon: "🔩",
  },
  {
    step: 4,
    phase: "fase1",
    phaseName: "Fase 1: Persiapan & Instalasi",
    title: "Integrasi Daya Listrik & Kalibrasi Rotasi",
    desc: "Tancapkan steker ke stopkontak AC 220V ber-arde (grounding). Hidupkan sakelar utama dan amati uji kalibrasi awal 180° servo tanpa beban.",
    icon: "⚡",
  },
  {
    step: 5,
    phase: "fase2",
    phaseName: "Fase 2: Penyiapan Bahan Bakar",
    title: "Pengisian Arang & Clearance Aman",
    desc: "Tarik kedua laci arang depan. Isi briket arang batok kelapa secara merata dengan menjaga jarak aman (clearance) 5–7 cm dari kisi penjepit atas.",
    icon: "🪵",
  },
  {
    step: 6,
    phase: "fase2",
    phaseName: "Fase 2: Penyiapan Bahan Bakar",
    title: "Pemasangan Kembali Laci Pembakaran",
    desc: "Dorong kedua laci arang kembali ke dalam rel kompartemen bodi hingga tertutup rapat demi menjaga efisiensi sirkulasi oksigen blower.",
    icon: "🗄️",
  },
  {
    step: 7,
    phase: "fase2",
    phaseName: "Fase 2: Penyiapan Bahan Bakar",
    title: "Pemantikan Bara Api Stabil",
    desc: "Nyalakan arang menggunakan blow torch hingga terbentuk bara merah stabil yang tertutup abu putih tipis dan bebas asap pekat sebelum memanggang.",
    icon: "🔥",
  },
  {
    step: 8,
    phase: "fase3",
    phaseName: "Fase 3: Operasional Otomasi",
    title: "Pemosisi Probe & Pengaturan Knob Blower",
    desc: "Posisikan probe termokopel Tipe-K di ruang bakar atas dan atur hembusan blower keong kiri-kanan menggunakan 2 knob PWM AC Dimmer.",
    icon: "🎛️",
  },
  {
    step: 9,
    phase: "fase3",
    phaseName: "Fase 3: Operasional Otomasi",
    title: "Monitoring LCD & Kendali Histeresis",
    desc: "Amati suhu pada layar LCD 20x4 I2C. Sistem histeresis otomatis mematikan blower pada suhu ≥ 600°C dan menyalakan kembali saat suhu ≤ 550°C.",
    icon: "📊",
  },
  {
    step: 10,
    phase: "fase3",
    phaseName: "Fase 3: Operasional Otomasi",
    title: "Pemuatan Adonan Kemplang (Loading)",
    desc: "Jepitkan 6 keping adonan kemplang tunu mentah ke dalam kisi kawat penjepit SUS 304 wajib menggunakan capitan masak anti-panas.",
    icon: "🍘",
  },
  {
    step: 11,
    phase: "fase3",
    phaseName: "Fase 3: Operasional Otomasi",
    title: "Pemanggangan Otomatis & Pemanenan",
    desc: "Alat membalik otomatis 180° setiap 15 detik dengan jeda 30 ms. Kemplang mekar sempurna dalam rata-rata 46,5 detik (45–48 detik). Angkat dengan capitan.",
    icon: "⏱️",
  },
  {
    step: 12,
    phase: "fase4",
    phaseName: "Fase 4: Pasca-Produksi",
    title: "Pendinginan, Pembersihan & Perawatan",
    desc: "Matikan sakelar utama, cabut kabel PLN, biarkan alat dingin alami. Lepas rak penjepit untuk dicuci air sabun, dan bersihkan abu sisa pada laci arang.",
    icon: "🧼",
  },
];

export const emergencySteps = [
  "Tekan sakelar daya utama (Power Switch) ke posisi OFF.",
  "Cabut steker listrik PLN 220V dari stopkontak dinding.",
  "Evakuasi segera seluruh kemplang di atas rak menggunakan capitan panjang.",
  "Tarik kedua laci arang keluar menggunakan sarung tangan tahan panas (heat-resistant gloves).",
  "Biarkan alat mendingin secara alami. DILARANG KERAS menyiram air langsung ke bodi atau kotak ECU elektronik!",
];

export const dosAndDonts = {
  dos: [
    "Gunakan selalu stopkontak dengan sistem pentanahan (grounding) yang baik.",
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
