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
      "Membersihkan debu halus pada kisi ventilasi dan rumah blower keong.",
      "Memeriksa keutuhan kabel daya dan fleksibilitas kabel servo.",
    ],
    catatan: "Gunakan kuas halus kering saat membersihkan area kelistrikan.",
  },
  {
    periode: "Bulanan",
    durasi: "Setiap ±200 jam operasional",
    tugas: [
      "Menguji kalibrasi pembacaan suhu termokopel tipe-K pada air mendidih (100 °C, toleransi ±2%).",
      "Pemeriksaan ketat soket terminal blok 3-zona tegangan (AC 220 V, DC 5 V daya, DC 5 V sinyal).",
      "Pelumasan khusus food-grade pada bantalan engsel laci dan poros rak.",
    ],
    catatan: "Jika galat suhu E > 3%, lakukan penyesuaian offset kalibrasi firmware.",
  },
];

export interface TroubleshootingItem {
  tingkat: "Ringan" | "Sedang" | "Berat";
  gejala: string;
  kemungkinanPenyebab: string;
  solusi: string;
}

export const matriksTroubleshooting: TroubleshootingItem[] = [
  {
    tingkat: "Ringan",
    gejala: "Layar LCD 20×4 menampilkan karakter acak atau berkedip",
    kemungkinanPenyebab: "Gangguan sinyal I2C atau interferensi sesaat saat penyalaan daya tinggi",
    solusi: "Matikan sakelar utama, tunggu 5 detik, lalu nyalakan kembali. Periksa koneksi soket I2C 4-pin.",
  },
  {
    tingkat: "Ringan",
    gejala: "Engsel laci arang terasa seret saat ditarik",
    kemungkinanPenyebab: "Akumulasi debu abu arang pada rel geser",
    solusi: "Bersihkan alur rel menggunakan kuas kering dan oleskan sedikit pelumas silikon food-grade tahan panas.",
  },
  {
    tingkat: "Sedang",
    gejala: "Salah satu rak penjepit bergetar (jitter) atau lambat berputar",
    kemungkinanPenyebab: "Keausan mekanis gigi logam servo atau beban jepit berlebih",
    solusi: "Sistem modular: cabut konektor 3-pin servo terkait dan ganti dengan unit servo cadangan.",
  },
  {
    tingkat: "Sedang",
    gejala: "LCD menampilkan pesan ERR/SPI pada suhu",
    kemungkinanPenyebab: "Ujung sensor termokopel tipe-K kendor atau modul MAX6675 terputus",
    solusi: "Periksa kekencangan baut terminal sensor biru. Kencangkan dengan obeng minus presisi.",
  },
  {
    tingkat: "Berat",
    gejala: "Alat mati total, lampu indikator daya tidak menyala",
    kemungkinanPenyebab: "Sekring (fuse) proteksi utama putus akibat lonjakan tegangan eksternal",
    solusi: "Ganti tabung kaca sekring cadangan pada soket masuk AC. Pastikan stopkontak PLN stabil 220 V ber-arde.",
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
    nama: "Garansi tukar baru (unit mati saat diterima)",
    durasi: "7 hari pertama",
    alokasi: "2% laba kotor",
    nominal: "± Rp 108.416",
    cakupan: "Cacat produksi awal atau kerusakan akibat ekspedisi pengiriman.",
    maksKlaim: "1× klaim",
  },
  {
    lapis: 2,
    nama: "Garansi suku cadang elektronik",
    durasi: "1 tahun penuh",
    alokasi: "5% laba kotor",
    nominal: "± Rp 271.040",
    cakupan: "Komponen elektronik aktif: motor servo MG996R, sensor MAX6675, modul relay, dan layar LCD.",
    maksKlaim: "2× klaim",
  },
  {
    lapis: 3,
    nama: "Garansi rangka & struktur bodi",
    durasi: "2 tahun",
    alokasi: "1% laba kotor",
    nominal: "± Rp 54.208",
    cakupan: "Integritas sambungan las, bodi stainless steel SUS 304, rel laci arang, dan rangka pendukung.",
    maksKlaim: "1× klaim",
  },
  {
    lapis: 4,
    nama: "Garansi gratis jasa servis",
    durasi: "1 tahun",
    alokasi: "2% laba kotor",
    nominal: "± Rp 108.416",
    cakupan: "Bimbingan teknisi resmi, kalibrasi berkala, dan asistensi penanganan kendala jarak jauh atau di lokasi.",
    maksKlaim: "3× kunjungan",
  },
];

export const garansiInfo = {
  totalAlokasi: "10% laba kotor unit",
  nominalCadangan: "± Rp 542.081 per unit terjual",
  profitAman: "90% laba bersih tetap aman",
  ketentuan: "Hanya berlaku untuk cacat manufaktur dan keausan wajar. Tidak mencakup kesalahan pengguna (unit terjatuh, tersiram air di kotak kontrol, atau bencana alam).",
};
