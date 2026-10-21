export interface TeamMember {
  name: string;
  role: string;
  photo?: string;
  task: string;
}

export const teamMembers: TeamMember[] = [
  { name: "Irfan Fransisco", role: "Ketua tim", task: "Perancangan sistem terpadu, manufaktur mekanik, koordinasi kemitraan UMKM" },
  { name: "Iwan Ridwan Ramdani", role: "Anggota tim", task: "Fabrikasi mekanik, pengelasan SUS 304, pengujian keandalan perangkat" },
  { name: "M. Rafi Aulia Amrullah", role: "Anggota tim", task: "Arsitektur elektronika mikrokontroler, kalibrasi termokopel, sistem kendali daya" },
  { name: "Daryl Yudhopatria Adinegara", role: "Anggota tim", task: "Analisis data empiris termal, uji mutu produk kemplang tunu, dokumentasi teknis" },
  { name: "Achmad Faruq Mahdison", role: "Anggota tim", task: "Pengembangan portal web digital twin, antarmuka interaktif, komunikasi media & publikasi" },
];

export const dosenPendamping = {
  name: "Andri Yanto, S.Sos., M.I.Kom.",
  role: "Dosen pendamping",
  institution: "Fakultas Ilmu Komunikasi — Universitas Padjadjaran",
};

export const mediaPublikasi = [
  { name: "TVRI News", url: "https://tvrinews.com", tag: "Nasional" },
  { name: "Sripoku.com", url: "https://palembang.tribunnews.com", tag: "Sumatera Selatan" },
  { name: "Unpad.ac.id", url: "https://www.unpad.ac.id", tag: "Portal resmi Unpad" },
  { name: "Fikom Unpad", url: "https://fikom.unpad.ac.id", tag: "Fakultas" },
];

export const mitraMou = [
  {
    name: "D’Nara Rancaekek",
    pic: "Bapak Amrulfery Irawan",
    peran: "Mitra pengguna & validasi lapangan",
    deskripsi: "Telah menandatangani MoU kerja sama pengujian langsung dan menyatakan kesiapan adopsi mesin INTAN untuk meningkatkan kapasitas produksi kemplang tunu.",
    status: "MoU kerja sama",
  },
  {
    name: "Ajasa Steel",
    pic: "Tim fabrikasi & rekayasa",
    peran: "Mitra manufaktur & replikasi perangkat",
    deskripsi: "Mitra industri rekayasa logam presisi untuk kesiapan perakitan massal, pengelasan presisi SUS 304, dan standardisasi dimensi 124 cm.",
    status: "Siap replikasi massal",
  },
];

export const diversifikasiProduk = [
  { name: "Sosis bakar", icon: "🌭", deskripsi: "Pemanggangan sosis merata tanpa gosong sebelah dengan kendali suhu histeresis." },
  { name: "Opak bakar tradisional", icon: "🍘", deskripsi: "Tekstur renyah merata khas kuliner Sunda dan Jawa Barat di atas bara arang." },
  { name: "Jagung bakar manis", icon: "🌽", deskripsi: "Karamelisasi saus bumbu sempurna tanpa abu berlebih berkat sirkulasi blower keong." },
];
