export interface MaintenanceSchedule {
  periode: string;
  durasi: string;
  tugas: string[];
  catatan: string;
}

export const jadwalPerawatan: MaintenanceSchedule[] = [
  {
    periode: "Harian",
    durasi: "Setiap selesai siklus produksi harian",
    tugas: [
      "Mencuci kisi rak penjepit SUS 304 dengan spons halus dan air sabun hangat.",
      "Mengosongkan abu sisa arang dari kedua laci depan setelah alat dingin alami.",
      "Mengusap permukaan bodi baja dengan kain microfiber kering bebas air.",
    ],
    catatan: "Dilarang membasahi kompartemen belakang (kotak ECU & servo).",
  },
  {
    periode: "Mingguan",
    durasi: "Setiap ±50 jam operasional",
    tugas: [
      "Memeriksa kekencangan baut dan mur pengunci tangkai motor servo MG996R.",
      "Membersihkan debu halus pada kisi ventilasi dan housing blower keong.",
      "Memeriksa keutuhan kabel daya dan fleksibilitas kabel servo.",
    ],
    catatan: "Gunakan kuas halus kering saat membersihkan area kelistrikan.",
  },
  {
    periode: "Bulanan",
    durasi: "Setiap ±200 jam operasional",
    tugas: [
      "Menguji kalibrasi pembacaan suhu termokopel Tipe-K pada air mendidih (100°C toleransi ±2%).",
      "Pemeriksaan ketat soket terminal blok 3-zona tegangan (AC 220V, DC 5V daya, DC 5V sinyal).",
      "Pelumasan food-grade grease khusus pada bantalan engsel laci dan poros rak.",
    ],
    catatan: "Jika galat suhu E > 3%, lakukan penyesuaian offset kalibrasi firmware.",
  },
];

export interface TroubleshootingItem {
  tingkat: "Minor" | "Moderate" | "Major";
  warna: string;
  gejala: string;
  kemungkinanPenyebab: string;
  solusi: string;
}

export const matriksTroubleshooting: TroubleshootingItem[] = [
  {
    tingkat: "Minor",
    warna: "emerald",
    gejala: "Layar LCD 20x4 menampilkan karakter acak / berkedip",
    kemungkinanPenyebab: "Glitch I2C atau interferensi sesaat saat start-up daya tinggi",
    solusi: "Lakukan power cycle (matikan sakelar utama, tunggu 5 detik, nyalakan kembali). Periksa koneksi soket 4-pin I2C.",
  },
  {
    tingkat: "Minor",
    warna: "emerald",
    gejala: "Engsel laci arang terasa seret saat ditarik",
    kemungkinanPenyebab: "Akumulasi debu abu arang pada rel geser",
    solusi: "Bersihkan alur rel menggunakan kuas kering dan oleskan sedikit pelumas silikon food-grade tahan panas.",
  },
  {
    tingkat: "Moderate",
    warna: "amber",
    gejala: "Salah satu rak penjepit bergetar (jitter) atau lambat berputar",
    kemungkinanPenyebab: "Keausan mekanis metal gear servo atau beban jepit berlebih",
    solusi: "Sistem modular plug-and-play: cabut konektor 3-pin servo terkait dan ganti dengan unit servo cadangan.",
  },
  {
    tingkat: "Moderate",
    warna: "amber",
    gejala: "LCD menampilkan pesan ERR/SPI pada suhu",
    kemungkinanPenyebab: "Probe termokopel Tipe-K kendor atau modul MAX6675 terputus",
    solusi: "Periksa kekencangan baut terminal probe biru. Kencangkan dengan obeng minus presisi.",
  },
  {
    tingkat: "Major",
    warna: "rose",
    gejala: "Alat mati total, lampu indikator power tidak menyala",
    kemungkinanPenyebab: "Sekring (fuse) proteksi utama putus akibat lonjakan voltase eksternal",
    solusi: "Ganti tabung kaca sekring cadangan pada soket AC inlet. Pastikan stopkontak PLN stabil 220V ber-arde.",
  },
];

export interface WarrantyLayer {
  lapis: number;
  nama: string;
  durasi: string;
  alokasi: string;
  nominal: string;
  cakupan: string;
  maksKlaim: string;
}

export const garansi4Lapis: WarrantyLayer[] = [
  {
    lapis: 1,
    nama: "Garansi Tukar Baru (DOA)",
    durasi: "7 Hari Pertama",
    alokasi: "2% Profit Kotor",
    nominal: "± Rp 108.416",
    cakupan: "Cacat produksi manufaktur awal atau kerusakan akibat ekspedisi pengiriman.",
    maksKlaim: "1x Klaim",
  },
  {
    lapis: 2,
    nama: "Garansi Sparepart Elektronik",
    durasi: "1 Tahun Penuh",
    alokasi: "5% Profit Kotor",
    nominal: "± Rp 271.040",
    cakupan: "Komponen elektronik aktif: Motor Servo MG996R, Sensor MAX6675, Modul Relay, dan Layar LCD.",
    maksKlaim: "2x Klaim",
  },
  {
    lapis: 3,
    nama: "Garansi Rangka & Struktur Bodi",
    durasi: "2 Tahun",
    alokasi: "1% Profit Kotor",
    nominal: "± Rp 54.208",
    cakupan: "Integritas sambungan las, bodi Stainless Steel SUS 304, rel laci arang, dan rangka pendukung.",
    maksKlaim: "1x Klaim",
  },
  {
    lapis: 4,
    nama: "Garansi Gratis Jasa Servis",
    durasi: "1 Tahun",
    alokasi: "2% Profit Kotor",
    nominal: "± Rp 108.416",
    cakupan: "Bimbingan teknisi resmi, kalibrasi berkala, dan asistensi penanganan kendala jarak jauh / onsite.",
    maksKlaim: "3x Kunjungan",
  },
];

export const garansiInfo = {
  totalAlokasi: "10% Bulat dari Profit Kotor Unit",
  nominalCadangan: "± Rp 542.081 per unit terjual",
  profitAman: "90% Profit Bersih Tetap Aman",
  ketentuan: "Hanya berlaku untuk cacat manufaktur dan keausan wajar. Tidak mencakup human error (unit terjatuh, tersiram air di kotak kontrol, atau bencana alam).",
};
