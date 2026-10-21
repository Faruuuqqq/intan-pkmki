# Rencana Perbaikan Frontend INTAN

Status: **diterapkan** · verifikasi visual 1440/768/390
Tanggal: 21 Oktober 2026
Basis: audit `frontend-design`, screenshot Playwright desktop/mobile, dan aset `alat/*.png`

---

## 0. Ringkasan

Masalah utamanya bukan warna atau font. Ada tiga hal yang membuat situs terasa seperti template:

1. **Mesinnya tidak terlihat seperti mesin aslinya.** Render 3D di hero gelap (metalness 0.82 tanpa envMap), sementara video di `/dampak` dan render di `alat/` menunjukkan mesin stainless terang. Aset terbaik justru tidak dipakai.
2. **Satu template untuk sembilan halaman.** Eyebrow ALL-CAPS + headline + paragraf + grid kartu, diulang di semua route.
3. **Chrome mengalahkan subjek.** HUD, LCD, preset kamera, crosshair, dan stage cream menutupi mesin. Di mobile, 43% canvas 3D ada di bawah fold dan HUD menutupi 20% area model.

Prinsip kerja:

- **Satu hal yang berani:** mesin dan api. Sisanya tenang.
- **Bara hanya untuk panas/status hidup**, bukan dekorasi.
- **Struktur mengikuti isi:** tabel untuk data, timeline untuk urutan, gambar untuk produk.
- **Hapus dulu, baru tambah.** Target awal: −60% elemen dekoratif.

Arah visual yang diusulkan: **"Panggung mesin, lembar uji"** — dua permukaan:

| Permukaan | Warna | Dipakai di |
|---|---|---|
| Panggung | arang `#141210` | hero, `/produk` 3D, `/dampak` video |
| Lembar | abu `#D8D2C6` | `/riset`, `/sop`, `/teknologi`, `/perawatan`, `/tentang`, `/kontak` |

Mesin stainless dari `alat/` (PNG transparan) menjadi bintang di panggung; dokumen teknis hidup di lembar abu. Ini keluar dari cliché dark-dashboard tanpa membuang identitas gelap yang sudah cocok dengan bara.

---

## 1. Keputusan yang harus dikunci sebelum coding

| # | Keputusan | Opsi | Rekomendasi |
|---|---|---|---|
| D1 | Arah visual | A. Panggung + lembar (dua permukaan) · B. Semua gelap, dirapikan · C. Semua terang | **A** |
| D2 | Nomor HKI | Sumber lama sempat berbeda | Pakai satu sumber publik: `001429332`; nomor lain hanya di arsip |
| D3 | Form kontak | A. `mailto:` terisi otomatis · B. backend (Formspree/Resend) · C. hapus form, tampilkan email | **A**; tanpa state sukses palsu |
| D4 | 3D di homepage | A. tidak ada, 3D hanya di `/produk` · B. ada tapi di bawah video, lazy | **A** |
| D5 | Setpoint suhu | `550–600°C` vs `560–640°C` di `/riset` | `550–600 °C`; sampel di luar rentang diberi catatan |
| D6 | Aset | Boleh pakai 3 render `alat/` + video YouTube? | Dipakai; render publik dikonversi ke WebP transparan |
| D7 | Baseline git | Repo belum punya commit | Commit awal sebelum perubahan |

Kalau D1–D4 tidak dikunci, pekerjaan bisa bercabang dan mengulang.

---

## 2. Design system target

### 2.1 Warna

| Token | Nilai | Peran |
|---|---|---|
| `stage` | `#141210` | latar panggung |
| `stage-raised` | `#1E1A16` | panel di panggung |
| `paper` | `#D8D2C6` | latar lembar |
| `paper-raised` | `#E4DFD5` | blok di lembar |
| `graphite` | `#1B1A17` | teks di lembar |
| `steel` | `#7C8589` | garis, meta, teks besar |
| `steel-text` | `#4F585C` | teks sekunder di lembar (AA) |
| `ember` | `#E2542C` | status panas, CTA utama |
| `ember-bright` | `#FF6B3D` | aksen di latar gelap |
| `ember-dark` | `#A63A0B` | aksen teks di latar terang |
| `dough` | `#D9B98C` | highlight langka |

Aturan:

- Tidak ada `#050505` murni, tidak ada `neutral-500` untuk teks kecil.
- Maksimal satu CTA ember per layar.
- Warna status: aman = steel/graphite, panas = ember, bahaya = ember-dark. Bukan emerald/sky/rose/amber sekaligus.
- Kontras minimum AA (4.5:1) untuk teks < 24px.

### 2.2 Tipografi

| Peran | Font | Aturan |
|---|---|---|
| Display | **Bricolage Grotesque** | headline, judul bagian; weight 600–700; tracking normal |
| Body | **Source Sans 3** | paragraf, tabel, label; 400/600; 16–18px |
| Mono | **JetBrains Mono** | **hanya** angka sensor di LCD dan nilai mentah; tidak untuk label situs |

- Hapus Inter + Plus Jakarta Sans.
- Tidak ada `uppercase` untuk label navigasi/section. ALL-CAPS hanya untuk satuan (`KG`, `°C`, `RPM`, `MM`).
- Tidak ada `tracking-tight` di bawah 24px.
- Skala: 12 / 14 / 16 / 18 / 24 / 32 / 48 / 64. Tidak ada teks < 12px.
- Sentence case. Satu bahasa per layar.

### 2.3 Layout

- Lebar konten 1200px; grid 12 kolom; asimetris 7/5 atau 8/4.
- Satu momen full-bleed per halaman. Setelah itu satu kolom baca (maks 70ch) atau dua kolom dengan sidebar metadata.
- Tanpa grid kartu sebagai default. Pengganti:
  - **tabel** untuk pengukuran/spesifikasi,
  - **timeline** untuk SOP, milestone, garansi,
  - **figure + caption** untuk render/foto,
  - **definition list** untuk spesifikasi,
  - **callout** hanya untuk keselamatan.
- Garis pemisah 1px `steel`/10%, jarak section 80–120px. Tanpa shadow.
- Radius: 0 untuk permukaan, 2px untuk input/tombol. Tidak ada `rounded-lg` di semua tempat.
- Mobile: gambar dulu, teks kemudian; kontrol di bawah gambar; target sentuh 44px.

### 2.4 Yang dihapus

- 52 label `uppercase` dekoratif dan ~150 pemisah `//`.
- 40 permukaan `industrial-card`/`industrial-panel`.
- 4 dari 5 warna aksen.
- 90% pemakaian `font-mono`.
- HUD, LCD, crosshair, dan bar preset di homepage.
- Stage cream `#f4f1ea`.
- Label "ZERO-BUILD", "12 SOURCES VERIFIED" tanpa bukti, dan success palsu pada form.

---

## 3. Peta halaman target

| Route | Pembuka | Isi utama | CTA |
|---|---|---|---|
| `/` | Render mesin full-bleed + satu kalimat | Video demo, 3 bukti (kapasitas, 6 sampel, HKI), cara kerja 3 langkah, tautan data | "Tonton demo" / "Buka 3D" |
| `/produk` | 3D viewer bersih (tanpa HUD/LCD) | Spesifikasi (tabel), material (3 item), blueprint + wiring (SVG), galeri render | "Hubungi tim" |
| `/teknologi` | Satu diagram sistem | 4 pilar sebagai bagian bernomor, siklus kendali 4 langkah | "Lihat data uji" |
| `/riset` | Tabel 6 sampel | Ringkasan inline, kalkulator, benchmark | "Unduh data" (opsional) |
| `/sop` | Langkah 01 besar | Timeline 12 langkah berfilter fase, protokol darurat, do/don't | "Cetak SOP" (opsional) |
| `/perawatan` | Alat kalibrasi | Jadwal (timeline), troubleshooting (tabel), garansi (tabel) | "Hubungi servis" |
| `/dampak` | Video demo full width | Arsip media yang benar-benar ada link, MoU, diversifikasi | "Tonton di YouTube" |
| `/tentang` | Sertifikat HKI + TKT | Timeline 7 tahap, tim, dosen | "Hubungi tim" |
| `/kontak` | Email/WhatsApp + copy | Form (jika benar-benar mengirim), alamat, kanal | "Kirim email" |

### Wireframe homepage

```
┌────────────────────────────────────────────────────┐
│ INTAN            mesin · 124×30×30 · TKT 8         │  ← satu baris, bukan dua navbar
├────────────────────────────────────────────────────┤
│                                                    │
│        [ render mesin stainless, full-bleed ]      │
│                                                    │
│  Enam keping. 46,5 detik. 550–600°C.               │
│  [Tonton demo]                    [Buka 3D]        │
├────────────────────────────────────────────────────┤
│ 400–420 keping/jam · 6/6 sampel lulus · HKI ...    │  ← satu baris bukti, bukan 4 kartu
├────────────────────────────────────────────────────┤
│ [ poster video + play ]   Cara kerja 01/02/03      │
├────────────────────────────────────────────────────┤
│ Tabel singkat 6 sampel        → /riset             │
└────────────────────────────────────────────────────┘
```

---

## 4. Fase kerja

### Fase 0 — Baseline & keputusan (S)

- T0.1 Commit baseline repo (semua file saat ini) supaya diff redesign bisa dibaca.
- T0.2 Kunci D1–D6.
- T0.3 Selidiki `npm run dev` yang crash (`TurbopackInternalError`); coba `rm -rf .next`, lalu matikan `cacheComponents`/`partialPrefetching` satu per satu. Kalau tetap gagal, dokumentasikan dan pakai `next build && next start` untuk review.
- T0.4 Siapkan aset: pindahkan 3 render ke `intan-web/public/alat/` dengan nama deskriptif; optimasi ke WebP/AVIF; ambil poster video YouTube.
- T0.5 Tambah `scripts/screenshots.mjs` + `npm run shots` (output `.screenshots/`, masuk `.gitignore`).

**Selesai bila:** arah visual disetujui, aset masuk, baseline commit ada, screenshot before tersimpan.

### Fase 1 — Fondasi (M)

- Ganti token warna di `globals.css`; hapus `industrial-card`, `industrial-panel`, `lcd-screen` dari pemakaian global.
- Ganti font di `layout.tsx`: Bricolage Grotesque + Source Sans 3; JetBrains Mono hanya untuk LCD.
- Tulis primitives kecil: `Section`, `Figure`, `SpecTable`, `Timeline`, `Callout`, `Button`. Jangan bikin design system besar; hanya yang dipakai ≥2 halaman.
- Rombak `Navbar` (satu bar, hapus metadata duplikat) dan `Footer` (ringkas, tanpa mono).
- Tambah `focus-visible` global, `::selection` baru, `prefers-reduced-motion`.

**Selesai bila:** homepage lama masih bisa dirender dengan token baru tanpa error; nav/footer sudah satu bahasa dan tidak all-caps.

### Fase 2 — Homepage & hero (M)

- Hero memakai render `alat/2891a390...png` (tampak depan + bara), bukan 3D.
- Hapus strip 4 metrik; ganti satu baris bukti + video.
- Tambah section "Cara kerja" 3 langkah dengan render/diagram kecil.
- Tambah teaser tabel 6 sampel + tautan `/riset`.
- 3D tidak dimuat di homepage. Kalau D4 memilih B, letakkan setelah video dengan `dynamic(..., { ssr: false })`.
- Hapus `Intan3DViewer` dari `page.tsx`; pindahkan ke `/produk`.

**Selesai bila:** di 1440 dan 390, mesin terlihat di layar pertama; tidak ada HUD/LCD; LCP hero adalah gambar, bukan canvas.

### Fase 3 — Halaman (L, 3 batch)

**3a. Produk & 3D**
- Perbaiki material: `RoomEnvironment` + `PMREMGenerator`, turunkan metalness, naikkan roughness; cocokkan dengan render stainless.
- Pisahkan chrome dari canvas: kontrol kamera dan aktuasi di panel bawah; hapus HUD overlay dan LCD dari homepage (LCD hanya di `/produk` sebagai panel sekunder).
- Hapus stage cream; pakai `stage` gelap.
- Perbaiki cleanup: dispose geometry/material, bukan hanya texture/renderer.
- Tambah poster/loading state; `dynamic import`; hormati `prefers-reduced-motion` (auto-turntable off).
- Ganti datasheet jadi tabel; material jadi definition list; blueprint/wiring tetap SVG.

**3b. Data & manual**
- `/riset`: tabel dulu; ringkasan inline; kalkulator di satu panel; perbaiki setpoint dan flag sampel < 550°C.
- `/sop`: timeline 12 langkah; phase header sekali; hapus footer "BAB IV SEC 4.2 / COMPLIANCE VERIFIED" per kartu.
- `/perawatan`: alat kalibrasi jadi pembuka; jadwal jadi timeline; troubleshooting dan garansi jadi tabel.
- `/teknologi`: satu diagram sistem; 4 pilar jadi bagian teks bernomor; siklus 4 langkah.

**3c. Bukti & kemitraan**
- `/dampak`: video pembuka; media hanya yang punya URL; hapus "12 verified" jika tidak benar; MoU dan diversifikasi jadi blok teks, bukan kartu.
- `/tentang`: sertifikat jadi header dokumen; 7 milestone jadi timeline vertikal; tim jadi daftar sederhana.
- `/kontak`: email/WhatsApp + copy; form `mailto:` atau endpoint nyata; hapus success palsu.

**Selesai bila:** semua route memakai pola pembuka yang berbeda; tidak ada `industrial-card` tersisa; tidak ada `//` label.

### Fase 4 — Konten & kejujuran (M)

- Satukan konstanta di `src/data/site.ts`: HKI, sertifikat, setpoint, kapasitas, siklus, email, video.
- Perbaiki inkonsistensi: HKI, `560–640` vs `550–600`, sampel 492/512/540, "12 media", "ZERO-BUILD".
- Tulis ulang copy: sentence case, satu bahasa per layar, CTA aktif.
- Hapus `mediaPublikasi` yang `#` atau jadikan daftar tanpa klaim.
- Form kontak: kirim via `mailto:` dengan subject/body terisi; tampilkan pesan "Email terbuka di aplikasi Anda", bukan "tercatat di sistem".

**Selesai bila:** tidak ada angka yang bertentangan di dua halaman; tidak ada klaim tanpa bukti; form tidak berbohong.

### Fase 5 — Aksesibilitas & performa (M)

- Teks minimum 12px, body 16px; ganti semua `text-neutral-500` kecil.
- `focus-visible` 2px di semua kontrol; input pakai outline, bukan `outline-none`.
- `aria-expanded`/`aria-controls` untuk menu mobile; alt text untuk render; caption tabel.
- `prefers-reduced-motion`: matikan auto-turntable, pulse, smooth scroll.
- 3D hanya di `/produk`, lazy; hero image `priority` + ukuran eksplisit.
- Hapus dependensi tidak terpakai: `framer-motion`, `recharts`, `@react-three/fiber`, `@react-three/drei`; hapus `public/*.svg` default.

**Selesai bila:** keyboard pass tanpa jebakan fokus; kontras AA; tidak ada canvas 3D di initial load homepage; bundle homepage turun signifikan.

### Fase 6 — QA & cleanup (S)

- `npm run build`, `npx tsc --noEmit`, `npm run lint` lolos.
- Screenshot 1440/768/390 untuk semua route; tidak ada horizontal overflow.
- Cek link mati, `#`, dan klaim.
- Bandingkan before/after; simpan hasil di `.screenshots/` (gitignored).
- Hapus file/komponen yang tidak terpakai; update README (cara run, stack, aset).
- Opsional: arsipkan `arsip/v2.html` dan prototipe HTML lama; jangan dihapus tanpa konfirmasi.

---

## 5. Peta dampak file

| File | Perubahan |
|---|---|
| `src/app/globals.css` | token baru, hapus industrial-card/panel, focus-visible, reduced motion |
| `src/app/layout.tsx` | 2 font, metadata, lang, theme-color |
| `src/components/layout/Navbar.tsx` | satu bar, nav sentence case, mobile aria |
| `src/components/layout/Footer.tsx` | ringkas, hapus mono/duplikasi |
| `src/app/page.tsx` | hero render, video, bukti, hapus 3D & metric strip |
| `src/components/3d/Intan3DViewer.tsx` | envMap, chrome dipisah, cleanup, lazy |
| `src/app/produk/page.tsx` | 3D bersih, tabel spesifikasi, galeri render |
| `src/app/riset/page.tsx` | tabel dulu, kalkulator, data truth |
| `src/app/sop/page.tsx` | timeline, phase header sekali |
| `src/app/perawatan/page.tsx` | kalibrasi dulu, timeline, tabel |
| `src/app/teknologi/page.tsx` | diagram, bukan 4 kartu |
| `src/app/dampak/page.tsx` | video, media nyata, MoU |
| `src/app/tentang/page.tsx` | sertifikat, timeline, tim |
| `src/app/kontak/page.tsx` | mailto, copy email, form jujur |
| `src/data/*.ts` | konstanta kanonik, hapus URL `#`, path aset |
| `public/alat/*` | 3 render transparan, optimized |
| `scripts/screenshots.mjs` | regression screenshot |
| `package.json` | hapus deps mati, script `shots` |
| `.gitignore` | `.screenshots/` |

---

## 6. Acceptance criteria

- [ ] Mesin terlihat di layar pertama pada 1440 dan 390.
- [ ] Render 3D dan render stainless punya warna/material yang konsisten.
- [ ] Tidak ada HUD/LCD/preset yang menutupi model.
- [ ] Tidak ada `//` label, all-caps eyebrow, atau penomoran dekoratif.
- [ ] Tidak ada grid kartu identik; SOP/milestone memakai timeline; data memakai tabel.
- [ ] Tidak ada teks < 12px; kontras AA; focus-visible di semua kontrol.
- [ ] Satu bahasa per layar; CTA menyebut aksi.
- [ ] HKI, setpoint, kapasitas, dan data sampel konsisten di semua halaman.
- [ ] Form kontak tidak menampilkan sukses palsu.
- [ ] 3D tidak ikut initial load homepage.
- [ ] `npm run build`, `tsc`, `lint` lolos.
- [ ] Screenshot 1440/768/390 tanpa overflow.

---

## 7. Risiko

| Risiko | Mitigasi |
|---|---|
| 3D viewer 1328 baris mudah rusak | Sentuh material + chrome dulu; split hanya kalau perlu; screenshot before/after |
| Arah dua permukaan terlalu besar | Checkpoint setelah homepage; kalau tidak cocok, fallback ke semua gelap |
| Render `alat/` bukan foto asli | Pakai sebagai render produk, bukan klaim foto; video tetap bukti utama |
| Data HKI/setpoint salah | Kunci di Fase 0; satu konstanta |
| `next dev` crash | Perbaiki/dokumentasikan di T0.3; QA pakai production build |
| Screenshot headless beda GPU | Jadikan regression layout, bukan patokan warna absolut |
| Menghapus kartu mengurangi info | Pindahkan semua isi ke tabel/timeline; jangan buang data |
| Repo belum commit | Baseline commit dulu |

---

## 8. Di luar cakupan

- Model 3D baru atau perubahan geometri besar.
- Sesi foto/video baru.
- CMS, backend CRM, autentikasi, pembayaran.
- Terjemahan Inggris penuh.
- Deployment/domain/analytics.
- Perbaikan konten ilmiah di luar inkonsistensi yang disebut.

---

## 9. Urutan eksekusi yang disarankan

1. Fase 0 (keputusan + aset + baseline).
2. Fase 1 (fondasi).
3. Fase 2 (homepage) → **checkpoint visual**.
4. Fase 3a (produk/3D) → **checkpoint**.
5. Fase 3b + 3c (halaman lain).
6. Fase 4 (konten).
7. Fase 5 (a11y/perf).
8. Fase 6 (QA).

Estimasi kasar: 8–10 sesi kerja, dengan 3 checkpoint. Jangan kerjakan semua halaman sekaligus sebelum homepage disetujui.
