# INTAN — Smart Rotary Roaster
> **Inovasi Termal Adaptif Nusantara (PKM-KI Universitas Padjadjaran 2026)**  
> Alat pemanggang kemplang tunu otomatis berbasis mikrokontroler dengan kendali histeresis cerdas.

---

## 📌 Ringkasan Proyek
INTAN mentransformasi proses pemanggangan kemplang tunu tradisional dari kapasitas 80–100 keping/jam menjadi **400–420 keping/jam**. Dilengkapi dengan 6 rak penjepit kawat SUS 304 yang berputar 180° otomatis menggunakan 6 motor servo MG996R, sistem kendali histeresis suhu bara (550°C–600°C), serta dual blower keong sentrifugal.

- **Status Teknologi**: TKT Level 8 (Teruji Operasional di Lingkungan UMKM)
- **Legalitas HKI**: Surat Pencatatan Ciptaan Kemenkumham RI No. **EC00202621458**
- **Institusi**: Universitas Padjadjaran (Didanai Ditjen Belmawa Kemdiktisaintek)

---

## 📂 Struktur Repositori
```text
intan-pkmki/
├── intan-web/          # Aplikasi web profil & 3D Interactive (Next.js 16, TypeScript, Three.js)
├── alat/               # Berkas render 3D CAD perangkat (Still 1, Still 2, Still 3)
├── arsip/              # Dokumen teknis, naskah spesifikasi, dan laporan PKM-KI
└── .gitignore          # Konfigurasi pengabaian berkas Git
```

---

## 🚀 Cara Menjalankan Website Secara Lokal

Pastikan Anda telah menginstal [Node.js](https://nodejs.org/) (versi 18.x atau lebih baru).

1. **Masuk ke direktori web:**
   ```bash
   cd intan-web
   ```

2. **Instal dependensi:**
   ```bash
   npm install
   ```

3. **Jalankan server pengembangan:**
   ```bash
   npm run dev
   ```

4. **Buka di browser:**
   Akses [http://localhost:3000](http://localhost:3000)

Untuk memvalidasi build produksi:
```bash
npm run build
```

---

## 🛠️ Fitur Utama Website
- **3D Digital Twin Interaktif (Three.js)**: Model visual skala 1:1 CAD (124 × 30 × 30 cm) dengan fitur aktuasi flip 180°, buka-tutup laci arang, kap servo berengsel, dual blower, dan simulasi cut-off histeresis ≥ 600°C.
- **Sudut Pandang Kamera Render**: Preset Still 1 (Isometrik), Still 2 (Tampak Atas 1:1), Still 3 (Close-up ECU & Gripper), dan Front/Rear.
- **Multi-Halaman Komprehensif**: Produk, Teknologi Kendali, Riset & Validasi 6 Sampel, SOP Operasional (QR 9.2), Perawatan & Garansi, Profil Tim & Legalitas, Dampak & MoU Mitra, serta Kontak Kemitraan.
- **Mobile Responsive**: Dioptimalkan penuh untuk tampilan smartphone dengan navigasi sentuh dan kontrol gestur.

---

## 💻 Tech Stack
- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Turbopack)
- **Bahasa**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **3D Engine**: [Three.js](https://threejs.org/)
- **Icons**: [Lucide React](https://lucide.dev/)

---

## 👥 Tim Pengembang (PKM-KI 2026)
- **Ketua Tim**: Irfan Fransisco
- **Anggota Tim**:
  1. Iwan Ridwan Ramdani
  2. M. Rafi Aulia Amrullah
  3. Daryl Yudhopatria Adinegara
  4. Achmad Faruq Mahdison
- **Dosen Pendamping**: Andri Yanto, S.Sos., M.I.Kom.
- **Afiliasi**: Universitas Padjadjaran
