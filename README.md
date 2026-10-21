# INTAN — Pemanggang Kemplang Tunu

> Inovasi Termal Adaptif Nusantara · PKM-KI Universitas Padjadjaran 2026

INTAN memutar enam keping kemplang tunu di atas bara arang dengan kendali suhu
550–600 °C. Kapasitas 400–420 keping/jam, dengan siklus rata-rata 46,5 detik
untuk enam keping.

- **Status teknologi:** TKT 8 — teruji di lingkungan UMKM.
- **HKI:** No. `001429332` — Surat Pencatatan Ciptaan Alat Peraga, Kementerian Hukum RI.
- **Institusi:** Universitas Padjadjaran. Didanai Belmawa Kemdiktisaintek.
- **Paten sederhana:** dalam proses pemberkasan.

## Struktur

```text
intan-pkmki/
├── intan-web/          # Situs Next.js 16 + Three.js
│   ├── public/alat/    # Render WebP transparan + poster video
│   ├── scripts/        # Regression screenshot Playwright
│   └── src/
├── alat/               # Render sumber
└── arsip/              # Dokumen teknis, PRD, arsip prototipe
```

## Menjalankan

Prasyarat: Node.js 20+.

```bash
cd intan-web
npm install
npm run dev
```

Buka `http://localhost:3000`.

Build produksi:

```bash
npm run build
npm start
```

## Screenshot regresi

Jalankan server produksi di port 3000, lalu:

```bash
npm run shots
```

Hasil ada di `intan-web/.screenshots/` (gitignored). Script memeriksa
horizontal overflow untuk 1440, 768, dan 390 px serta mencatat console error.
Gunakan `SHOT_BASE_URL` bila server berjalan di port lain.

## Arsitektur halaman

| Route | Isi |
|---|---|
| `/` | Render mesin, video demo, cara kerja, teaser data |
| `/produk` | Model 3D, tabel spesifikasi, material, gambar teknis |
| `/teknologi` | Diagram sistem, empat pilar, siklus kendali |
| `/riset` | Enam sampel, kalkulator kapasitas, benchmark |
| `/sop` | Timeline 12 langkah, protokol darurat, do/don't |
| `/perawatan` | Kalibrasi, jadwal, troubleshooting, garansi |
| `/dampak` | Video, liputan yang tertaut, MoU, diversifikasi |
| `/tentang` | HKI/TKT, timeline, tim, dosen pendamping |
| `/kontak` | Email, kanal, form `mailto:` tanpa backend |

## Stack

- Next.js 16 (App Router, Turbopack), React 19, TypeScript
- Tailwind CSS v4
- Three.js + `RoomEnvironment` untuk model `/produk`
- Bricolage Grotesque (display), Source Sans 3 (body), JetBrains Mono (nilai sensor)
- Lucide React

## Tim

- **Ketua:** Irfan Fransisco
- **Anggota:** Iwan Ridwan Ramdani, M. Rafi Aulia Amrullah, Daryl Yudhopatria Adinegara, Achmad Faruq Mahdison
- **Dosen pendamping:** Andri Yanto, S.Sos., M.I.Kom.
- **Afiliasi:** Fakultas Ilmu Komunikasi — Universitas Padjadjaran
