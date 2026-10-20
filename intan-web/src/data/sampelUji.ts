export interface SampelUji {
  id: number;
  status: string;
  waktu: number; // detik
  suhu: number; // Celcius
  keterangan: string;
}

export const sampelUjiData: SampelUji[] = [
  { id: 1, status: "MATANG", waktu: 47, suhu: 492.1, keterangan: "Pemanasan awal (Warm-up)" },
  { id: 2, status: "MATANG", waktu: 45, suhu: 512.2, keterangan: "Blower aktif menyuplai O₂" },
  { id: 3, status: "MATANG", waktu: 47, suhu: 540.1, keterangan: "Kematangan merata kedua sisi" },
  { id: 4, status: "MATANG", waktu: 46, suhu: 612.4, keterangan: "Cut-Off histeresis aktif (≥600°C)" },
  { id: 5, status: "MATANG", waktu: 46, suhu: 558.21, keterangan: "Suhu terkendali kembali ideal" },
  { id: 6, status: "MATANG", waktu: 48, suhu: 571.3, keterangan: "Stabilitas termal terjaga" },
];

export const ringkasanUji = {
  rataWaktu: 46.5,
  rentangWaktu: "45–48 Detik",
  rataSuhu: 547.72,
  rentangSuhuEvaluasi: "560–640 °C",
  keseragaman: "> 95%",
  defectRate: "< 5%",
  suhuEcu: "< 48 °C (Aman)",
  ujiKontinu: "5 Jam Non-Stop",
};

export interface CompetitiveItem {
  parameter: string;
  konvensional: string;
  intan: string;
}

export const competitiveLandscape: CompetitiveItem[] = [
  { parameter: "Kapasitas Produksi", konvensional: "80–100 keping/jam", intan: "400–420 keping/jam (Peningkatan >400%)" },
  { parameter: "Tingkat Produk Cacat", konvensional: "2% – 10% (risiko gosong/melengkung)", intan: "< 5% (terkendali histeresis)" },
  { parameter: "Waktu Pemanggangan", konvensional: "Tidak terukur pasti, bergantung operator", intan: "Rata-rata 46,5 detik per batch (6 keping)" },
  { parameter: "Pengawasan Operator", konvensional: "Intensif penuh di depan bara & asap panas", intan: "Otomasi pembalikan 6 servo (beban fisik ringan)" },
  { parameter: "Stabilitas Termal", konvensional: "Fluktuatif & tidak terukur", intan: "Termokopel Tipe-K + Histeresis Dual Blower (550–600°C)" },
  { parameter: "Sumber Panas & Rasa", konvensional: "Bara arang (smoky)", intan: "Tetap bara arang autentik (smoky terjaga)" },
  { parameter: "Material Kontak Pangan", konvensional: "Kawat besi biasa / non-standar", intan: "Stainless Steel SUS 304 Food-Grade (SNI 8753:2020)" },
];
