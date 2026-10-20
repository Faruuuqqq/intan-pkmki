export interface TeamMember {
  name: string;
  role: string;
  major: string;
  photo?: string;
  task: string;
}

export const teamMembers: TeamMember[] = [
  { name: "Irfan Fransisco", role: "Ketua Tim", major: "Universitas Padjadjaran", task: "Perancangan sistem terpadu, manufaktur mekanik, koordinasi kemitraan UMKM" },
  { name: "Iwan Ridwan Ramdani", role: "Anggota Tim", major: "Universitas Padjadjaran", task: "Fabrikasi mekanik, pengelasan SUS 304, pengujian keandalan perangkat" },
  { name: "M. Rafi Aulia Amrullah", role: "Anggota Tim", major: "Universitas Padjadjaran", task: "Arsitektur elektronika mikrokontroler, kalibrasi termokopel, sistem kendali daya" },
  { name: "Daryl Yudhopatria Adinegara", role: "Anggota Tim", major: "Universitas Padjadjaran", task: "Analisis data empiris termal, uji mutu produk kemplang tunu, dokumentasi teknis" },
  { name: "Achmad Faruq Mahdison", role: "Anggota Tim", major: "Universitas Padjadjaran", task: "Pengembangan portal web digital twin, antarmuka interaktif, komunikasi media & publikasi" },
];

export const dosenPendamping = {
  name: "Andri Yanto, S.Sos., M.I.Kom.",
  role: "Dosen Pendamping",
  institution: "Fakultas Ilmu Komunikasi — Universitas Padjadjaran",
};

export const mediaPublikasi = [
  { name: "TVRI News", url: "https://tvrinews.com", tag: "Nasional" },
  { name: "Sripoku.com", url: "https://palembang.tribunnews.com", tag: "Sumatera Selatan" },
  { name: "Unpad.ac.id", url: "https://www.unpad.ac.id", tag: "Portal Resmi Unpad" },
  { name: "Fikom Unpad", url: "https://fikom.unpad.ac.id", tag: "Fakultas" },
  { name: "LiputanBandung.com", url: "#", tag: "Media Regional" },
  { name: "DestinasiBandung.co.id", url: "#", tag: "Pariwisata & Kuliner" },
  { name: "Informasi Bandung", url: "#", tag: "Media Informasi" },
  { name: "CatatanBandung.com", url: "#", tag: "Warta Kota" },
  { name: "Warta Jabar", url: "#", tag: "Jawa Barat" },
  { name: "Kilas Nusantara", url: "#", tag: "Inovasi Daerah" },
  { name: "Portal Mahasiswa", url: "#", tag: "Pendidikan & Sains" },
  { name: "Berita Inovasi", url: "#", tag: "Teknologi Tepat Guna" },
];

export const mitraMou = [
  {
    name: "D’Nara Rancaekek",
    pic: "Bapak Amrulfery Irawan",
    peran: "Mitra Pengguna (End-User) & Validasi Lapangan",
    deskripsi: "Telah menandatangani MoU kerja sama pengujian langsung dan menyatakan kesiapan adopsi mesin INTAN untuk meningkatkan kapasitas produksi kemplang tunu.",
    status: "MoU Resmi Terdaftar",
  },
  {
    name: "Ajasa Steel",
    pic: "Fabrikasi & Engineering Team",
    peran: "Mitra Manufaktur & Replikasi Perangkat",
    deskripsi: "Mitra industri rekayasa logam presisi untuk kesiapan perakitan massal, pengelasan presisi SUS 304, dan standardisasi dimensi 124 cm.",
    status: "Kesiapan Replikasi Massal",
  },
];

export const diversifikasiProduk = [
  { name: "Sosis Bakar", icon: "🌭", deskripsi: "Pemanggangan sosis merata tanpa gosong sebelah dengan kendali suhu histeresis." },
  { name: "Opak Bakar Tradisional", icon: "🍘", deskripsi: "Tekstur renyah merata khas kuliner Sunda dan Jawa Barat di atas bara arang." },
  { name: "Jagung Bakar Manis", icon: "🌽", deskripsi: "Karamelisasi saus bumbu sempurna tanpa abu berlebih berkat sirkulasi blower keong." },
];
