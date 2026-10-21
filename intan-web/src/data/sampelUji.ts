export interface SampelUji {
  id: number;
  status: string;
  waktu: number; // detik
  suhu: number; // Celcius
  keterangan: string;
}

export const sampelUjiData: SampelUji[] = [
  { id: 1, status: "Matang", waktu: 47, suhu: 492.1, keterangan: "Pemanasan awal" },
  { id: 2, status: "Matang", waktu: 45, suhu: 512.2, keterangan: "Blower aktif menyuplai O₂" },
  { id: 3, status: "Matang", waktu: 47, suhu: 540.1, keterangan: "Kematangan merata kedua sisi" },
  { id: 4, status: "Matang", waktu: 46, suhu: 612.4, keterangan: "Cut-off histeresis aktif (≥ 600 °C)" },
  { id: 5, status: "Matang", waktu: 46, suhu: 558.21, keterangan: "Suhu kembali ke rentang ideal" },
  { id: 6, status: "Matang", waktu: 48, suhu: 571.3, keterangan: "Stabilitas termal terjaga" },
];

export const ringkasanUji = {
  rataWaktu: 46.5,
  rentangWaktu: "45–48 detik",
  rataSuhu: 547.72,
  rentangSuhuEvaluasi: "550–600 °C",
  keseragaman: "> 95%",
  defectRate: "< 5%",
  suhuEcu: "< 48 °C (aman)",
  ujiKontinu: "5 jam non-stop",
};

export interface CompetitiveItem {
  parameter: string;
  konvensional: string;
  intan: string;
}

export const competitiveLandscape: CompetitiveItem[] = [
  { parameter: "Kapasitas produksi", konvensional: "80–100 keping/jam", intan: "400–420 keping/jam (peningkatan >400%)" },
  { parameter: "Tingkat produk cacat", konvensional: "2% – 10% (risiko gosong/melengkung)", intan: "< 5% (terkendali histeresis)" },
  { parameter: "Waktu pemanggangan", konvensional: "Tidak terukur pasti, bergantung operator", intan: "Rata-rata 46,5 detik per batch (6 keping)" },
  { parameter: "Pengawasan operator", konvensional: "Intensif penuh di depan bara & asap panas", intan: "Otomasi pembalikan 6 servo (beban fisik ringan)" },
  { parameter: "Stabilitas termal", konvensional: "Fluktuatif & tidak terukur", intan: "Termokopel tipe-K + histeresis dua blower (550–600 °C)" },
  { parameter: "Sumber panas & rasa", konvensional: "Bara arang (smoky)", intan: "Tetap bara arang autentik (smoky terjaga)" },
  { parameter: "Material kontak pangan", konvensional: "Kawat besi biasa / non-standar", intan: "Stainless steel SUS 304 food-grade (SNI 8753:2020)" },
];
