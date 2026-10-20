# PRODUCT REQUIREMENTS DOCUMENT (PRD)
# WEBSITE RESMI & PORTAL DIGITAL TWIN 3D — PKM-KI INTAN 2026

---

## 1. INFORMASI KONTROL DOKUMEN (*DOCUMENT CONTROL*)

| Parameter Dokumen | Detail Informasi |
| :--- | :--- |
| **Nama Produk Fisik** | **INTAN (*Inovasi Termal Adaptif Nusantara*)** — *Smart Rotary Roaster* Berbasis Mikrokontroler |
| **Judul Proposal PKM-KI** | Transformasi Produksi Kemplang Tunu melalui *Smart Rotary Roaster* Berbasis Mikrokontroler: Solusi Peningkatan Kapasitas dan Standardisasi Mutu Produk Lokal Sumatera |
| **Nama Produk Digital** | Portal Web Resmi, *3D Interactive Digital Twin*, & Buku Saku SOP Digital INTAN |
| **Skema & Perguruan Tinggi** | PKM Karya Inovatif (PKM-KI) — Universitas Padjadjaran (Unpad) |
| **Tematik PKM 2026** | Poin Ke-1: Kemandirian Pangan, Energi, dan Air |
| **Tim Pengembang** | Irfan Fransisco (Ketua), Iwan Ridwan Ramdani, M. Rafi Aulia Amrullah, Daryl Yudhopatria Adinegara, Achmad Faruq Mahdison |
| **Dosen Pendamping** | Andri Yanto, S.Sos., M.I.Kom. |
| **Status Kesiapterapan** | **TKT Level 8** Teruji Operasional Riil ($>80\%$ Indikator Terpenuhi) |
| **Nomor Hak Cipta (HKI)** | `001429332` (Surat Pencatatan Ciptaan Alat Peraga — Kementerian Hukum RI) |
| **Versi PRD** | Versi $2.0$ (*Full-Scale PIMNAS & UMKM Deployment Release*) |

---

## 2. RINGKASAN EKSEKUTIF & TUJUAN STRATEGIS (*EXECUTIVE SUMMARY*)

### 2.1 Latar Belakang Masalah
Sumatera Selatan memiliki **$77.678\text{ industri mikro dan kecil (IMK)}$** pada tahun 2024 yang membutuhkan penguatan teknologi produksi tepat guna untuk meningkatkan daya saing pangan lokal (BPS Provinsi Sumatera Selatan, 2026). Dalam produksi kemplang tunu (kerupuk panggang khas Sumatera Selatan berbahan ikan dan tapioka), metode pemanggangan manual di atas bara arang hanya mampu menghasilkan **$80–100\text{ keping/jam}$**, memiliki suhu termal yang tidak stabil, menuntut pengawasan intensif di tengah paparan panas ekstrem ($400^\circ\text{C}–600^\circ\text{C}$), serta memicu tingkat produk cacat/gosong sebesar **$2\%–10\%$**.

Perangkat **INTAN** hadir sebagai solusi *Smart Rotary Roaster* berbasis mikrokontroler yang mengintegrasikan **6 motor servo MG996R** (rotasi $180^\circ$), **sensor termokopel Tipe-K + modul MAX6675**, **layar LCD**, dan **2 *blower* keong sentrifugal** dengan kendali histeresis otomatis tanpa menghilangkan **bara arang** sebagai sumber panas tradisional.

### 2.2 Tujuan Pengembangan Website
Website resmi **INTAN** dirancang bukan sekadar sebagai halaman profil statis, melainkan sebagai **aplikasi web interaktif multifungsi** yang melayani 3 tujuan strategis utama:
1. **Media Demonstrasi *3D Digital Twin* bagi Dewan Juri PIMNAS:** Memungkinkan juri membedah anatomi mekanis-elektronis skala $1:1$ ($124\text{ cm} \times 30\text{ cm}$) secara interaktif $360^\circ$ dan menguji simulasi pergerakan 6 servo, laci bara arang, kap pelindung servo, serta logika *cut-off* suhu $\ge 600^\circ\text{C}$ secara langsung melalui peramban (*browser*).
2. **Halaman Tujuan (*Landing Page*) QR Code Buku Dokumen Teknis (Bab IX Poin 9.1 & 9.2):** Menjadi portal buku saku digital bagi operator UMKM yang memindai QR Code pada Buku Dokumen Teknis maupun Poster Ilmiah PIMNAS untuk mengakses **Video Demonstrasi** dan **12 Langkah Standar Operasional Prosedur (SOP) + K3**.
3. **Pusat Validasi Empiris & Hilirisasi Komersial:** Menyajikan transparansi data uji 6 sampel kemplang, kalkulator proyeksi ekonomi UMKM, skema garansi 4 lapis berbasis alokasi $10\%$ profit kotor, jadwal perawatan, serta bukti kemitraan (*MoU*) bersama **D’Nara Rancaekek** dan **Ajasa Steel**.

### 2.3 Indikator Keberhasilan Produk Digital (*Success Metrics / KPIs*)
* **Kecepatan Muat (*Page Load Time*):** *First Contentful Paint* (FCP) $< 1,5\text{ detik}$ dan inisialisasi kanvas 3D WebGL $< 2,5\text{ detik}$ pada jaringan 4G standar.
* **Performa Grafis 3D:** Berjalan mulus pada laju bingkai $\ge 50\text{ FPS}$ di laptop/PC dan $\ge 30\text{ FPS}$ di perangkat *smartphone* kelas menengah.
* **Kemudahan Akses Lapangan:** $100\%$ fitur interaktif (terutama filter 12 langkah SOP, kalkulator UMKM, dan kontrol 3D) dapat dioperasikan dengan satu jari (*touch-friendly*) pada layar ponsel ukuran $360\text{px}–430\text{px}$.

---

## 3. TARGET PENGGUNA & *USER PERSONAS*

### 3.1 Persona 1: Dewan Juri & Reviewer PIMNAS / PKP2
* **Profil:** Akademisi senior, pakar rekayasa mesin/elektronika, dan praktisi kewirausahaan inovasi mahasiswa.
* **Kebutuhan Utama:**
  * Memverifikasi kesesuaian judul proposal, klaim peningkatan kapasitas hingga **$400–420\text{ keping/jam}$**, dan penurunan tingkat cacat menjadi **$< 5\%$**.
  * Memeriksa keabsahan data pengujian empiris ($6\text{ sampel}$ matang dalam $45–48\text{ detik}$, rata-rata $46,5\text{ detik}$; suhu kotak kontrol aman $< 48^\circ\text{C}$ selama uji kontinu $5\text{ jam}$).
  * Mengevaluasi kematangan rekayasa (*engineering maturity*): algoritma *staggered delay* $30\text{ ms}$ untuk mencegah *inrush current*, fungsi *non-blocking* `millis()`, isolasi kelistrikan 3-zona, serta rasionalitas skema garansi 4 lapis ($10\%$ profit kotor).
* **Fitur Website yang Menjawab:** Simulasi 3D CAD Interaktif, *Live Telemetry LCD Simulator*, Tabel Uji 6 Sampel, *Tab Wiring Diagram*, dan Seksi Garansi & Maintenance.

### 3.2 Persona 2: Operator & Mitra UMKM Kemplang Tunu (Misal: D’Nara Rancaekek)
* **Profil:** Pengrajin kemplang tunu dan pekerja dapur UMKM yang mengoperasikan alat di lingkungan *semi-outdoor*.
* **Kebutuhan Utama:**
  * Panduan langkah demi langkah yang visual, jelas, dan mudah dipahami saat memindai QR Code Bab 9.2 dari ponsel.
  * Instruksi keselamatan kerja (K3), takaran jarak aman arang (*clearance* $5–7\text{ cm}$), langkah darurat (*Emergency Shutdown*), serta cara mengatasi gangguan ringan/sedang (*troubleshooting* mandiri).
* **Fitur Website yang Menjawab:** Buku Saku Digital SOP 12 Langkah dengan Filter 4 Fase, Kartu K3 & *Do's/Don'ts*, Matriks *Troubleshooting* 3 Tingkat, dan Kalkulator Produktivitas Harian/Bulanan.

### 3.3 Persona 3: Mitra Manufaktur, Investor, & Media Massa (Misal: Ajasa Steel)
* **Profil:** Bengkel fabrikasi logam, calon mitra distribusi, dinas koperasi/UMKM, dan jurnalis media.
* **Kebutuhan Utama:**
  * Melihat spesifikasi material standar pangan (SUS 304 *ASTM A240/A312*, Aluminium *ASTM B209*, acuan **SNI 8753:2020**) dan dimensi fabrikasi ($124\text{ cm} \times 30\text{ cm}$).
  * Melihat bukti dampak sosial, publikasi 12 media massa, legalitas Hak Cipta (`001429332`), serta potensi diversifikasi komoditas (sosis bakar, opak bakar, jagung bakar).
* **Fitur Website yang Menjawab:** Blueprint Dimensi SVG, Spesifikasi Material, Dinding 12 Media Massa, Kartu Kemitraan *MoU*, dan Kanal Kontak Resmi.

---

## 4. ARSITEKTUR INFORMASI & ALUR PENGGUNA (*INFORMATION ARCHITECTURE & USER FLOW*)

### 4.1 Struktur Peta Situs (*Single-Page Application Architecture*)
Website menggunakan arsitektur *Single-Page Web Application* dengan navigasi jangkar halus (*smooth-scroll anchor navigation*) yang terbagi menjadi 8 zona utama:
1. **`#top-bar` & `#header`:** Bar Identitas Institusional (Kemdiktisaintek, Belmawa, Unpad, TKT 8, HKI) & Navigasi Utama (*Sticky*).
2. **`#hero`:** *Hero Copywriting*, *Live LCD 20x4 I2C Telemetry HUD*, **3D WebGL Digital Twin Interaktif**, & *Counter Bar* 4 Metrik Utama.
3. **`#latar-belakang`:** Konteks Kuliner Kemplang Tunu, Data Makro BPS ($77.678\text{ IMK}$), Masalah Konvensional vs Solusi Otomasi INTAN, & Tujuan Resmi PKM-KI.
4. **`#spesifikasi`:** 6 Kartu Spesifikasi Teknis, 3 Standar Material (*SNI 8753:2020*), serta *Interactive Tab* **Blueprint Dimensi ($124\text{ cm}$)** & **Wiring Diagram**.
5. **`#kinerja`:** Tabel Empiris Uji 6 Sampel Kemplang, Tabel *Competitive Landscape*, & **Kalkulator Simulasi Ekonomi UMKM**.
6. **`#sop`:** **Buku Saku Digital SOP 12 Langkah** (Filter 4 Fase — Tujuan QR Bab 9.2), Protokol K3 *Semi-Outdoor*, 5 Langkah *Emergency Shutdown*, & *Do's/Don'ts*.
7. **`#maintenance`:** Jadwal Perawatan 3 Tingkat (Harian, Mingguan, Bulanan), Matriks *Troubleshooting* (Minor, Moderate, Major), & **Skema Garansi 4 Lapis ($10\%$ Profit)**.
8. **`#luaran` & `#footer`:** Legalitas (HKI `001429332`, TKT 8, Paten, Doktek), 12 Liputan Media Massa, *MoU* Mitra & Diversifikasi, Profil 5 Anggota Tim + Dosen Pendamping, Referensi *Harvard Style*, serta *Modal Video Demonstrasi* (Tujuan QR Bab 9.1).

### 4.2 Alur Perjalanan Pengguna (*Primary User Flows*)
* **Alur A (Juri PIMNAS):** Membuka Website $\rightarrow$ Memutar Model 3D $360^\circ$ & Mengklik 4 Tombol Animasi Mekanis (`Putar 6 Servo`, `Tarik Laci Arang`, `Buka Kap Servo`, `Uji Cut-Off ≥600°C`) $\rightarrow$ Mengecek *Wiring Diagram* & Dimensi $124\text{ cm}$ $\rightarrow$ Memvalidasi Tabel 6 Sampel & Garansi 4 Lapis $\rightarrow$ Membuka *Modal Video Demo*.
* **Alur B (Operator UMKM via QR Code Bab 9.2):** Memindai QR Code di Buku Doktek/Alat $\rightarrow$ Masuk ke *Sticky Nav* `📖 SOP 12 Langkah (QR 9.2)` $\rightarrow$ Memilih filter fase (misal: *Fase 2: Bara Api* atau *Fase 3: Otomasi*) $\rightarrow$ Membaca instruksi *clearance* $5–7\text{ cm}$ dan aturan K3 $\rightarrow$ Mengecek solusi *Troubleshooting* jika terjadi kendala.

---

## 5. SPESIFIKASI FUNGSIONAL MENDALAM PER MODUL (*DETAILED FUNCTIONAL REQUIREMENTS*)

### Modul 0: *Top Institutional Bar* & *Sticky Navigation Header*
* **Kebutuhan Fungsional:**
  * Menampilkan bar paling atas berisi lencana teks `🏛️ Kemdiktisaintek • Diktisaintek Berdampak`, `Belmawa • PKM-KI 2026 • Universitas Padjadjaran`, indikator berdenyut hijau `TKT Level 8 Teruji`, dan kode `HKI: 001429332`.
  * *Header* menempel di atas layar (*sticky top-0*) dengan efek *glassmorphism* (`backdrop-blur-md`).
  * Menyediakan tombol khusus yang disorot warna emas untuk **`📖 SOP 12 Langkah (QR 9.2)`** dan tombol jingga **`🎬 Video Demo`** yang memicu jendela *popup* video.
  * Pada layar ponsel ($< 1024\text{px}$), menu navigasi otomatis berubah menjadi tombol *hamburger* yang membuka *dropdown menu* responsif.

---

### Modul 1: *Hero Section*, *Live Telemetry LCD*, & *Interactive 3D Digital Twin*

#### 1.1 Komponen *Hero Copywriting* & *Live LCD 20x4 I2C Simulator*
* **Konten Teks:**
  * Badge Tematik: `🔥 Tematik PKM 2026: Kemandirian Pangan, Energi & Air`
  * Judul Utama: **INTAN (*Inovasi Termal Adaptif Nusantara*)**
  * Subjudul: Transformasi Produksi Kemplang Tunu melalui *Smart Rotary Roaster* Berbasis Mikrokontroler: Solusi Peningkatan Kapasitas hingga **$400–420\text{ Keping/Jam}$** dan Standardisasi Mutu Produk Lokal Sumatera.
* **Simulasi Layar LCD 20x4 I2C (*Real-Time Telemetry HUD*):**
  * Menampilkan layar digital berlatar biru khas modul LCD 20x4 I2C dengan indikator suhu kotak kontrol `ECU: 44.2°C (AMAN <48°C)`.
  * Menampilkan 4 baris telemetri dinamis yang berubah secara *real-time* mengikuti interaksi tombol 3D pengguna:
    * Baris 1: `INTAN SMART ROASTER` | `[AUTO-ROAST]`
    * Baris 2: `SUHU BARA : 578.4 C` (Berubah menjadi `612.4 C` saat mode uji *Cut-Off* diaktifkan) | Status: `IDEAL` atau `OVERHEAT!`
    * Baris 3: `2x BLOWER : ON (PWM 85%)` (Berubah menjadi `CUT-OFF (OFF)` saat suhu $\ge 600^\circ\text{C}$) | `CUT: >=600C`
    * Baris 4: `6x SERVO  : POS 0° (15s)` atau `POS 180° (15s)` | `T: 12s / 47s`

#### 1.2 Spesifikasi Teknis Model 3D WebGL (`Three.js` Digital Twin)
Model 3D direkonstruksi secara prosedural menggunakan pustaka **Three.js (r128)** tanpa ketergantungan aset `.gltf` eksternal agar beban muat instan dan anti-gagal (*zero external asset failure*), dengan rincian geometri yang presisi mengacu pada dokumen **`Intan preview.pdf`** dan **`PPT INTAN PIMNAs.pdf` (Hal. 15 & 17)**:
1. **Bodi Palung Utama (*Main Trough*):**
   * Material: *MeshStandardMaterial* menyerupai *Stainless Steel SUS 304* (`color: 0xd1d5db`, `metalness: 0.82`, `roughness: 0.25`).
   * Struktur: Terbagi menjadi 2 kompartemen pembakaran (kiri dan kanan) dengan sekat tengah, merepresentasikan panjang tungku utama **$100\text{ cm}$** dan tinggi bodi **$30\text{ cm}$** ($20\text{ cm}$ ruang laci bawah + $10\text{ cm}$ zona pemanggangan atas).
2. **4 Roda Troli (*Caster Wheels*):**
   * Terletak di 4 sudut bawah bodi dengan warna merah (`0xdc2626`), merepresentasikan tinggi roda **$10\text{ cm}$** untuk mobilitas perangkat berbobot $25\text{ kg}$.
3. **2 Laci Bahan Bakar Arang Depan (*Sliding Charcoal Drawers*):**
   * Terletak di sisi depan kiri dan kanan, dilengkapi **kenop pegangan silinder berwarna jingga** (`0xea580c`) persis seperti visual `Intan preview.pdf` halaman 1–5.
   * Di dalam setiap laci terdapat hamparan bara arang menyala (*emissive glowing charcoal chunks*) lengkap dengan 2 titik cahaya *PointLight* merah-jingga yang berdenyut (*pulsing ember glow*).
4. **6 Rak Penjepit Kemplang (*Rotary Clamping Racks*):**
   * Berjumlah 6 unit yang terdistribusi merata sepanjang palung atas ($3\text{ di kompartemen kiri}$, $3\text{ di kompartemen kanan}$).
   * Setiap rak terdiri dari tangkai poros baja tahan karat, kisi kawat penjepit *detachable*, dan kepingan adonan kemplang tunu berwarna krem-keemasan (`0xfde68a`) di dalamnya.
5. **Kompartemen Belakang, 6 Motor Servo MG996R, & Kap Pelindung Berengsel (*Hinged Servo Hood*):**
   * Di bagian belakang palung terdapat bodi kompartemen kontrol yang menaungi **6 blok Motor Servo MG996R** berwarna putih-metalik (sesuai `Intan preview.pdf` halaman 4).
   * Dilengkapi **kap penutup atas berengsel** yang dapat dibuka-tutup secara animasi untuk memperlihatkan bagian dalam deretan 6 servo.
   * Pada dinding luar belakang terdapat **Layar LCD biru**, **2 kenop putar hitam (*PWM AC Dimmer*)** di kiri-kanan LCD, serta **sakelar daya merah (*Power Switch*)** (sesuai foto dimensi PPT halaman 17).
6. **Dual Blower Keong Sentrifugal (*Left & Right Centrifugal Snail Blowers*):**
   * Terpasang di sisi paling kiri dan kanan bodi (masing-masing berdimensi lebar **$12\text{ cm}$**, sehingga total panjang alat menjadi $12\text{ cm} + 100\text{ cm} + 12\text{ cm} = \mathbf{124\text{ cm}}$).
   * Dilengkapi rumah keong silver metalik, kisi *intake* hitam, kotak sakelar motor berwarna hijau (`0x16a34a`), dan pipa saluran udara melengkung (*L-pipe*) yang masuk ke ruang bakar bawah.
   * Dilengkapi sistem **24 partikel aliran udara biru (`airParticles`)** yang bergerak mengalir dari kedua *blower* menuju bara arang saat *blower* berstatus `ON`.

#### 1.3 Kontrol Interaksi 3D, Animasi Mekanis, & *Hotspots*
Pengguna dapat mengontrol kanvas 3D melalui:
* **Orbit Kamera Bebas:** Geser tetikus (*drag*) atau sentuhan jari untuk memutar $360^\circ$, serta *scroll wheel* untuk memperbesar/memperkecil (*zoom*).
* **4 Tombol Preset Sudut Kamera:** `Isometrik`, `Depan (Laci)`, `Belakang (LCD/ECU)`, dan `Atas (6 Rak)`.
* **4 Tombol Animasi Mekanis & Termal *Real-Time*:**
  1. `🔄 Putar 6 Servo 180°`: Memutar keenam rak penjepit kemplang sebesar $\pi\text{ rad}$ ($180^\circ$) dengan jeda berurutan (*staggered delay*) antar-rak serta memperbarui teks LCD.
  2. `🗄️ Tarik Laci Arang`: Menggeser kedua laci arang keluar sepanjang sumbu-$Z$ positif untuk memperlihatkan susunan bara arang menyala dan mengarahkan kamera ke tampak depan.
  3. `🛠️ Buka Kap 6 Servo`: Memutar engsel kap penutup belakang sebesar $-0,95\text{ rad}$ untuk memperlihatkan 6 unit Motor Servo MG996R di dalamnya dan mengarahkan kamera ke tampak belakang.
  4. `🌡️ Uji Cut-Off ≥600°C`: Mengaktifkan simulasi kendali histeresis saat suhu mencapai $612,4^\circ\text{C}$, menghentikan animasi partikel hembusan *blower*, meredupkan cahaya bara, dan mengubah layar LCD menjadi status `OVERHEAT! / CUT-OFF (OFF)`.
* **5 Tombol *Component Hotspots*:** Klik cepat untuk memfokuskan kamera dan menampilkan kartu penjelasan teknis untuk: (1) *Rak Penjepit SUS 304*, (2) *6x Servo MG996R*, (3) *Termokopel & MAX6675*, (4) *LCD & Kotak ECU*, serta (5) *Dual Blower Keong*.

---

### Modul 2: Latar Belakang Masalah, Urgensi Makro, & Tujuan
* **Kebutuhan Fungsional:**
  * Menampilkan narasi akademik singkat mengenai kemplang tunu khas Sumatera Selatan (Ogan Ilir & Palembang) beserta rujukan ilmiahnya (Isnaini et al., 2020; Santoso et al., 2021; Ismail et al., 2022).
  * Menampilkan 3 kartu komparasi utama:
    1. **Potensi Industri Mikro & Kecil:** Angka **$77.678\text{ IMK}$** di Sumatera Selatan pada tahun 2024 (BPS Provinsi Sumatera Selatan, 2026).
    2. **Kendala Pemanggangan Manual:** Kapasitas rendah **$80–100\text{ keping/jam}$**, suhu tidak stabil, kelelahan fisik operator, dan risiko produk cacat/gosong **$2\%–10\%$**.
    3. **Solusi Terintegrasi INTAN:** Pemanfaatan otomasi pangan (FAO, 2022) melalui 6 servo, sensor suhu, dan 2 *blower* tanpa mengganti **bara arang**.
  * Menampilkan kotak **Tujuan Pengembangan PKM-KI INTAN** yang selaras 100% dengan naskah final poster PIMNAS.

---

### Modul 3: Spesifikasi Teknis, Material Standar Pangan, Dimensi, & *Wiring Diagram*
* **Grid 6 Spesifikasi Utama (Sesuai PPT Hal. 18):**
  1. Kapasitas: **$400–420\text{ keping/jam}$**
  2. Tegangan Sistem: **$220\text{V AC} / 5\text{V DC}$**
  3. Suhu Histeresis: **$550^\circ\text{C} – 600^\circ\text{C}$**
  4. Berat Perangkat: **$25\text{ kg}$ (Portabel dengan Roda)**
  5. Daya Listrik Alat: **$\pm 150–200\text{ Watt}$** (Kebutuhan komponen alat, terpisah dari energi panas arang)
  6. Waktu Operasi: **$4–5\text{ Jam Kontinu}$**
* **Kartu Material Penyusun & Acuan Standar (Sesuai PPT Hal. 16):**
  * Menampilkan lencana acuan **SNI 8753:2020** (*Standar Peralatan Makan dan Perlengkapan Masak dari Baja Tahan Karat* — ditulis sebagai acuan material, bukan klaim sertifikasi produk SNI).
  * Merinci 3 material utama:
    1. **Plat Stainless Steel SUS 304 (*ASTM A240*):** Bagian utama dan area pemanggangan, tahan korosi, higienis (*food-grade*), dan mudah dibersihkan.
    2. **Pipa & Kawat Penjepit SUS 304 (*ASTM A312*):** Kekuatan mekanis tinggi, tahan radiasi panas ekstrem bara arang, dan *detachable* (dapat dilepas-cuci).
    3. **Plat Aluminium & Rangka Pendukung (*ASTM B209*):** Casing pendukung luar yang ringan, kokoh, dan menghantarkan panas dengan efisien.
* **Fitur *Interactive Tab* Blueprint Dimensi & *Wiring Diagram* (Sesuai PPT Hal. 14 & 17):**
  * **Tab 1 — Blueprint Dimensi SVG ($124\text{ cm} \times 30\text{ cm}$):** Grafik vektor presisi yang memvisualisasikan bentangan total **$124\text{ cm}$** ($12\text{ cm}$ *blower* kiri + $100\text{ cm}$ tungku utama + $12\text{ cm}$ *blower* kanan) serta pembagian tinggi vertikal ($10\text{ cm}$ zona rak atas + $20\text{ cm}$ laci arang + $10\text{ cm}$ roda).
  * **Tab 2 — Skema *Wiring Diagram* SVG:** Grafik vektor interaktif yang memetakan hubungan **Arduino Nano (ATmega328P)** dengan **6x Motor Servo (jalur PWM)**, **Modul MAX6675 + Termokopel Tipe-K (jalur SPI)**, **Layar LCD I2C (jalur SDA/SCL)**, **Modul Relay 2-Channel Optocoupler (2x Blower + Dimmer)**, dan **PSU Switching $5\text{V}$ (Isolasi 3-Zona Kelistrikan)**.

---

### Modul 4: Bukti Empiris Uji 6 Sampel, *Competitive Landscape*, & Kalkulator UMKM

#### 4.1 Tabel Hasil Pengujian Empiris 6 Sampel Kemplang (Data PPT Hal. 22)
Menampilkan tabel hasil uji pemanggangan langsung menggunakan kemplang tunu:

| Sampel Uji | Status Tingkat Kematangan | Waktu Matang ($\text{Detik}$) | Suhu Ruang Bakar ($^\circ\text{C}$) | Keterangan Sistem |
| :--- | :---: | :---: | :---: | :--- |
| **Sampel #1** | ✅ MATANG | $47\text{ detik}$ | $492,10^\circ\text{C}$ | Pemanasan awal (*Warm-up*) |
| **Sampel #2** | ✅ MATANG | $45\text{ detik}$ | $512,20^\circ\text{C}$ | Blower aktif menyuplai $\text{O}_2$ |
| **Sampel #3** | ✅ MATANG | $47\text{ detik}$ | $540,10^\circ\text{C}$ | Kematangan merata kedua sisi |
| **Sampel #4** | ✅ MATANG | $46\text{ detik}$ | $\mathbf{612,40^\circ\text{C}}$ | **Cut-Off Histeresis Aktif ($\ge 600^\circ\text{C}$)** |
| **Sampel #5** | ✅ MATANG | $46\text{ detik}$ | $558,21^\circ\text{C}$ | Suhu terkendali kembali ideal |
| **Sampel #6** | ✅ MATANG | $48\text{ detik}$ | $571,30^\circ\text{C}$ | Stabilitas termal terjaga |
| **Rata-Rata / Evaluasi** | **100% Matang Merata** | **$46,5\text{ detik}$ ($45–48\text{ dtk}$)** | **$547,72^\circ\text{C}$ (Evaluasi: $560–640^\circ\text{C}$)** | **Suhu Kotak ECU Aman $< 48^\circ\text{C}$** |

#### 4.2 Tabel *Competitive Landscape* (Konvensional vs INTAN)
Menampilkan perbandingan langsung 7 parameter utama (Sumber panas, Pembalikan kemplang, Pemantauan suhu, Pengaturan udara, Kapasitas produksi, Risiko produk cacat, dan Keterlibatan operator) lengkap dengan penanda centang hijau (`✅`) pada kolom keunggulan INTAN.

#### 4.3 Spesifikasi Logika & Rumus Kalkulator Produktivitas UMKM
Fitur simulasi interaktif menggunakan komponen `<input type="range" min="1" max="8" value="5">` untuk mengubah durasi jam kerja harian ($H$, dalam satuan jam/hari) dengan rumus perhitungan otomatis sebagai berikut:
* **Rentang Output Manual Harian ($O_{\text{manual}}$):**
  $$O_{\text{manual\_min}} = 80 \times H, \quad O_{\text{manual\_maks}} = 100 \times H$$
* **Estimasi Produk Gosong/Cacat Metode Manual ($D_{\text{manual}}$, asumsi $10\%$ dari nilai tengah):**
  $$D_{\text{manual}} = \text{round}\left( \frac{O_{\text{manual\_min}} + O_{\text{manual\_maks}}}{2} \times 0,10 \right) = 9 \times H\text{ keping/hari}$$
* **Rentang Output INTAN Harian ($O_{\text{intan}}$):**
  $$O_{\text{intan\_min}} = 400 \times H, \quad O_{\text{intan\_maks}} = 420 \times H$$
* **Proyeksi Output INTAN Bulanan ($O_{\text{bulanan}}$, asumsi $25\text{ hari kerja efektif}$):**
  $$O_{\text{bulanan}} = O_{\text{intan\_maks}} \times 25 = 10.500 \times H\text{ keping/bulan}$$
  *(Contoh pada nilai default $H = 5\text{ jam/hari}$: Manual menghasilkan $400–500\text{ keping/hari}$ dengan potensi gosong $\approx 45\text{ keping}$; INTAN menghasilkan **$2.000–2.100\text{ keping/hari}$** atau **$52.500\text{ keping/bulan}$** dengan tingkat cacat $< 5\%$).*

---

### Modul 5: Buku Saku Digital SOP 12 Langkah & Panduan K3 (Tujuan QR Code Bab 9.2)
* **Filter Kategori 4 Fase Operasional:**
  Pengguna dapat memfilter kartu SOP secara instan tanpa memuat ulang halaman (*client-side filtering*):
  * `Semua (12 Langkah)`
  * `Fase 1: Persiapan & Instalasi` (Langkah 01 s.d. 04)
  * `Fase 2: Penyiapan Bahan Bakar` (Langkah 05 s.d. 07)
  * `Fase 3: Operasional Otomasi` (Langkah 08 s.d. 11)
  * `Fase 4: Perawatan Pasca-Produksi` (Langkah 12)
* **Rincian 12 Kartu Tahapan SOP (Sesuai Bab IV 4.2 Doktek):**
  1. **Langkah 01:** Inspeksi Visual & Keamanan ECU (tangan kering, bebas air/debu).
  2. **Langkah 02:** Instalasi Rak Penjepit SUS 304 pada poros rotor motor servo.
  3. **Langkah 03:** Penguncian Mekanis mur pengunci tangkai rak penjepit.
  4. **Langkah 04:** Integrasi Daya AC $220\text{V}$ ber-arde & Uji Kalibrasi Rotasi $180^\circ$.
  5. **Langkah 05:** Pengisian Arang/Briket pada 2 laci depan dengan jarak aman (*clearance*) **$5–7\text{ cm}$** dari kisi penjepit.
  6. **Langkah 06:** Pemasangan kembali kedua laci pembakaran ke dalam rel bodi utama hingga rapat.
  7. **Langkah 07:** Pemantikan Bara Api menggunakan *blow torch* secara merata hingga menjadi bara merah stabil berabu putih tipis dan **bebas asap tebal** (mencegah rasa pahit/sangit).
  8. **Langkah 08:** Penempatan ujung probe Termokopel Tipe-K di atas bara & penyesuaian laju maksimal hembusan *blower* via 2 *knob dimmer*.
  9. **Langkah 09:** Pemantauan Layar LCD & Kendali Histeresis Otomatis (Suhu ideal $550^\circ\text{C}–600^\circ\text{C}$; otomatis *Cut-Off* OFF saat suhu $\ge 600^\circ\text{C}$ dan menyala kembali saat suhu $\le 550^\circ\text{C}$).
  10. **Langkah 10:** Pemuatan Adonan (*Loading*) 6 keping kemplang mentah **wajib menggunakan capitan masak (*kitchen tongs*)**.
  11. **Langkah 11:** Pemanggangan Otomatis (rotasi $180^\circ$ tiap $15\text{ detik}$, jeda asinkron $30\text{ ms}$) & Pemanenan (*Unloading*) saat kemplang mekar kecokelatan merata dalam waktu rata-rata **$46,5\text{ detik}$** ($45–48\text{ detik}$).
  12. **Langkah 12:** Pendinginan alami, pembersihan bodi *stainless steel* dengan kain *microfiber* (hindari air pada ECU), dan pelepasan rak penjepit (*detachable*) untuk dicuci bersih dengan air sabun.
* **3 Panel Keselamatan Kerja (K3) & Prosedur Darurat (Sesuai Bab IV 4.1, 4.4, & 4.5):**
  * **Protokol K3 & Standar Lingkungan *Semi-Outdoor*:** Penjelasan bahaya termal ($400^\circ\text{C}–600^\circ\text{C}$), wajib stopkontak ber-arde (*grounding*), serta kewajiban pengoperasian di area **Semi-Outdoor** (teras beratap/berventilasi terbuka) guna mencegah akumulasi gas Karbon Monoksida ($\text{CO}$) sekaligus melindungi elektronik dari air hujan.
  * **5 Langkah *Emergency Shutdown*:** (1) Tekan *Power Switch* ke OFF, (2) Cabut steker PLN, (3) Evakuasi kemplang dengan capitan panjang, (4) Tarik keluar laci arang memakai sarung tangan tahan panas, (5) Pendinginan alami (**Dilarang keras menyiram air langsung ke bodi panas atau ECU**).
  * **Matriks *Do's & Don'ts*:** Ringkasan praktis hal yang wajib dilakukan dan dilarang keras bagi operator UMKM.

---

### Modul 6: Perawatan Berkala, Matriks *Troubleshooting*, & Skema Garansi 4 Lapis

#### 6.1 Jadwal Perawatan 3 Tingkat (*Cleaning & Checking* — Bab V Doktek)
1. **Harian (Setiap Selesai Produksi):** Mencuci kisi penjepit SUS 304 dengan air sabun & spons halus (tanpa sikat kawat) serta mengosongkan abu laci arang setelah dingin.
2. **Mingguan ($\pm 50\text{ Jam Operasi}$):** Memeriksa kekencangan mur pengunci tangkai servo MG996R dan membersihkan ventilasi kotak kontrol (ECU) dengan kuas kering.
3. **Bulanan ($\pm 200\text{ Jam Operasi}$):** Memeriksa kekencangan soket terminal VCC/GND serta menguji kalibrasi sensor Termokopel Tipe-K pada titik didih air ($100^\circ\text{C}$, rentang toleransi $98,0^\circ\text{C}–102,0^\circ\text{C}$ atau $\pm 2\%$) dan titik panas referensi menggunakan rumus galat:
   $$E = \left\vert \frac{T_{\text{baca}} - T_{\text{ref}}}{T_{\text{ref}}} \right\vert \times 100\%$$
   *(Jika $E > 3\%$, dilakukan penyesuaian `OFFSET_KALIBRASI` pada firmware Arduino Nano).*

#### 6.2 Matriks Klasifikasi Kerusakan 3 Tingkat (*Troubleshooting*)
1. **🟢 Tingkat 1 — Kerusakan Kecil (*Minor Error*):** Gejala layar LCD berkedip/acak akibat *I2C glitch* atau engsel berderit $\rightarrow$ Solusi: *Power cycling* (*restart* daya utama) dan pemberian pelumas *food-grade* pada poros engsel.
2. **🟡 Tingkat 2 — Kerusakan Sedang (*Moderate Error*):** Gejala salah satu servo bergetar (*jitter*), pembacaan suhu `ERR/SPI`, atau *blower* tidak merespon $\rightarrow$ Solusi: **Modular Plug-and-Play Replacement** (cabut soket komponen yang aus dan tancapkan suku cadang baru tanpa perlu menyolder ulang).
3. **🔴 Tingkat 3 — Kerusakan Besar (*Major / Critical Error*):** Gejala mati total akibat lonjakan listrik ekstrem atau sekring putus $\rightarrow$ Solusi: Proteksi sekring utama (*fuse*) memutus arus untuk melindungi mikrokontroler; penggantian satu blok panel ECU modular.

#### 6.3 Skema Garansi Bertingkat 4 Lapis (Alokasi Bulat $10\%$ Profit Kotor)
Berdasarkan perhitungan finansial dengan HPP sebesar $\text{Rp } 5.420.814$ dan harga jual $\text{Rp } 10.841.628$ (margin $100\%$, Profit Kotor $= \text{Rp } 5.420.814$), disisihkan **total cadangan risiko bulat sebesar $10\%$ dari profit kotor ($\approx \text{Rp } 542.081/\text{unit}$)** sehingga **$90\%$ sisa profit bersih perusahaan tetap aman**:
* **Lapis 1 — Tukar Baru ($7\text{ Hari Pertama}$):** Alokasi **$2\%$** profit kotor | Maksimal **$1\times\text{ klaim}$** untuk cacat produksi awal (*dead on arrival* / pengiriman).
* **Lapis 2 — Sparepart Elektronik Penuh ($1\text{ Tahun}$):** Alokasi **$5\%$** profit kotor ($\approx \text{Rp } 271.040$) | Maksimal **$2\times\text{ klaim}$** untuk komponen rentan panas (Motor Servo MG996R & Sensor Termokopel MAX6675).
* **Lapis 3 — Bodi & Rangka ($2\text{ Tahun}$):** Alokasi **$1\%$** profit kotor | Maksimal **$1\times\text{ klaim}$** untuk struktur pengelasan rangka dan pelat *Stainless Steel SUS 304*.
* **Lapis 4 — Gratis Jasa Servis ($1\text{ Tahun}$):** Alokasi **$2\%$** profit kotor | Maksimal **$3\times\text{ klaim}$** kunjungan teknisi atau pendampingan instalasi suku cadang modular jarak jauh.
* *Syarat & Ketentuan Mutlak:* Hanya berlaku untuk *manufacturing defect* dan keausan wajar operasional; **tidak mencakup *human error*** (seperti unit jatuh, tersiram air pada kotak ECU, atau bencana tegangan listrik eksternal).

---

### Modul 7: Capaian Luaran, 12 Media Massa, Mitra *MoU*, & Diversifikasi
* **4 Kartu Bukti Luaran & Legalitas:**
  1. **Hak Cipta Alat Peraga:** Nomor Pencatatan Resmi **`001429332`** (Kementerian Hukum RI).
  2. **TKT-Meter Level 8:** Teruji nyata di lingkungan operasional UMKM dengan capaian indikator $>80\%$.
  3. **Paten Sederhana & Artikel Ilmiah:** Terdaftar pada pemberkasan Lampiran 18 Laporan Akhir.
  4. **Buku Dokumen Teknis Produk:** Memuat deskripsi, spesifikasi, instalasi, perawatan, sistem keamanan K3, dan uji laboratorium.
* **Dinding Publikasi 12 Kanal Media Massa (Sesuai PPT Hal. 27):**
  Menampilkan daftar publikasi media nasional dan lokal yang meliput inovasi INTAN Unpad: **TVRI News.com**, **Sripoku.com**, **LiputanBandung.com**, **DestinasiBandung.co.id**, **Unpad.ac.id**, **Fikom Unpad**, **Informasi Bandung**, **CatatanBandung.com**, serta $+4\text{ kanal media lainnya}$.
* **Kemitraan Hilirisasi (*MoU*) & Diversifikasi Produk (Sesuai PPT Hal. 29–32):**
  * **Mitra Pengguna:** **D’Nara Rancaekek** (Bapak Amrulfery Irawan) — telah menandatangani *MoU* kerja sama pengembangan dan memvalidasi kesiapan penggunaan INTAN setelah menyaksikan demonstrasi langsung.
  * **Mitra Manufaktur:** **Ajasa Steel** — mitra kesiapan replikasi dan produksi massal perangkat bagi UMKM.
  * **Peluang Diversifikasi Komoditas:** Menampilkan 3 produk panggangan potensial: **🌭 Sosis Bakar**, **🍘 Opak Bakar**, dan **🌽 Jagung Bakar**.

---

### Modul 8: *Modal Video Demonstrasi* (Tujuan QR Bab 9.1) & *Footer* Akademik
* **Jendela *Modal Video* Interaktif:**
  * Dipicu melalui tombol `🎬 Tonton Video Demo` di *Header* maupun *Hero Section*.
  * Menyematkan pemutar YouTube resmi (`https://www.youtube.com/embed/UZ4ZYx_NoIY`) disertai tombol langsung `Buka di YouTube ↗` dan deskripsi Bab IX (9.1).
  * Saat tombol `Tutup ✕` diklik, atribut `src` pada `<iframe>` otomatis dikosongkan agar suara video langsung berhenti di latar belakang.
* **Kaki Halaman (*Footer*) Lengkap:**
  * Menampilkan kartu profil 5 anggota pelaksana PKM-KI Unpad (**Irfan Fransisco**, **Iwan Ridwan Ramdani**, **M. Rafi Aulia Amrullah**, **Daryl Yudhopatria A.** , **Achmad Faruq M.**) dan Dosen Pendamping (**Andri Yanto, S.Sos., M.I.Kom.**).
  * Mencantumkan daftar pustaka **Format Harvard Murni** sesuai Pedoman PIMNAS Pasal 4.6 (BPS Provinsi Sumatera Selatan, 2026 & FAO, 2022).
  * Mencantumkan **Ucapan Terima Kasih** resmi, atribusi hak cipta visual (`Sumber: Dokumentasi Pribadi, 2026`), serta tautan aktif ke Instagram (`@intan_pkmki`), TikTok (`@intan.pkmki`), YouTube (`INTAN PKM-KI Unpad`), dan surel (`msrskemplantunu@gmail.com`).

---

## 6. SISTEM DESAIN & PANDUAN VISUAL (*DESIGN SYSTEM & UI/UX*)

### 6.1 Palet Warna (*Thermal-Industrial Dark & Clean Hybrid Theme*)
Mengombinasikan nuansa gelap bara arang dan baja tahan karat pada bagian *Hero/Teknis* dengan bagian putih bersih ber-kontras tinggi pada *Tabel Data Pengujian* agar keterbacaan angka maksimal:

| Nama Token Warna | Kode Hex | Peruntukan Elemen UI |
| :--- | :---: | :--- |
| `charcoal-950` | `#120B0A` | Latar belakang utama *dark mode* (merepresentasikan arang kayu) |
| `charcoal-900` | `#1C1412` | Latar belakang seksi sekunder, *header*, dan kartu spesifikasi |
| `thermal-500` | `#EA580C` | Warna aksi primer (tombol utama, sorotan bara api, aksen *slider*) |
| `ember-400` | `#FACC15` | Warna sorotan angka kunci ($400–420\text{ keping/jam}$), lencana HKI, & *headline* |
| `lcd-blue` | `#023E8A` $\rightarrow$ `#002855` | Latar layar simulasi LCD 20x4 I2C dengan efek pendaran *cyan* (`#00B4D8`) |
| `emerald-400` | `#34D399` | Penanda status aman (`< 5% Defect`, `ECU < 48°C`, `TKT Level 8`, centang tabel) |
| `slate-50` | `#F8FAFC` | Latar terang khusus seksi Tabel Uji 6 Sampel & *Competitive Landscape* |

### 6.2 Tipografi (*Typography Hierarchy*)
* **Font Judul Utama (*Display*):** `Plus Jakarta Sans` (Weights: $700\text{ Bold}$, $800\text{ ExtraBold}$) — memberikan kesan modern, tegas, dan berwibawa untuk judul produk inovasi.
* **Font Teks Isi (*Body & UI*):** `Inter` (Weights: $400\text{ Regular}$, $500\text{ Medium}$, $600\text{ SemiBold}$, $700\text{ Bold}$) — menjamin keterbacaan tinggi pada tabel dan deskripsi SOP 12 langkah.
* **Font Telemetri & Angka Teknis (*Monospace*):** `JetBrains Mono` (Weights: $500$, $700$) — digunakan khusus untuk layar simulasi LCD 20x4, suhu ($^\circ\text{C}$), waktu ($\text{detik}$), nomor HKI (`001429332`), dan dimensi *blueprint*.

---

## 7. ARSITEKTUR TEKNIS & KEBUTUHAN NON-FUNGSIONAL (*NON-FUNCTIONAL REQUIREMENTS*)

1. **Arsitektur *Single-File Zero-Build* (Portabilitas Maksimal):**
   * Seluruh kode struktur HTML5, penataan gaya Tailwind CSS + CSS kustom, grafik vektor SVG (*Blueprint* & *Wiring Diagram*), serta logika JavaScript ES6 + Three.js dikemas dalam satu berkas mandiri (`website_resmi_intan.html`).
   * Keuntungan: Dapat langsung dijalankan di komputer presentasi PIMNAS secara luring/hibrida maupun di-unggah (*deploy*) secara instan ke **GitHub Pages**, **Vercel**, atau **Netlify** dalam waktu kurang dari $2\text{ menit}$ untuk dihubungkan ke QR Code.
2. **Responsivitas Penuh (*Mobile-First Touch Optimization*):**
   * Kanvas 3D mendukung *touch events* (`touchstart`, `touchmove`, `touchend`) dengan properti `touch-action: none` agar saat pengguna memutar model 3D di layar HP, halaman web tidak ikut tergulir secara tidak sengaja.
   * Tabel pengujian dan perbandingan dilengkapi pembungkus `overflow-x-auto` agar tidak merusak tata letak pada layar sempit.
3. **Kepatuhan Etika & Hak Cipta PIMNAS (Pasal 4.6):**
   * Seluruh bagian dokumentasi visual mencantumkan atribusi `Sumber: Dokumentasi Pribadi, 2026` atau `Sumber data kinerja: Tim PKM-KI INTAN, 2026`.
   * Daftar pustaka menggunakan *Harvard Style* murni.

---

## 8. DAFTAR PERIKSA PENGUJIAN (*QUALITY ASSURANCE & ACCEPTANCE CRITERIA*)

Sebelum tautan website dicetak menjadi QR Code pada Buku Dokumen Teknis Bab IX dan Poster PIMNAS, tim wajib memverifikasi daftar periksa berikut:

- [x] **Uji Visualisasi 3D CAD:** Model 3D menampilkan bodi SUS 304, 2 laci depan berpegangan jingga, 6 rak kemplang di atas, 2 *blower* keong di samping, kap servo berengsel di belakang, layar LCD biru, 2 kenop dimmer, dan 4 roda merah.
- [x] **Uji 4 Tombol Animasi 3D:** Tombol `Putar 6 Servo 180°`, `Tarik Laci Arang`, `Buka Kap 6 Servo`, dan `Uji Cut-Off ≥600°C` berjalan mulus dan langsung mengubah pembacaan pada layar simulasi LCD 20x4.
- [x] **Uji *Tab Switching* Teknis:** Perpindahan antara tab `Dimensi (124cm)` dan `Wiring Diagram` berjalan instan tanpa gangguan tata letak.
- [x] **Uji Kalkulator UMKM:** Menggeser *slider* dari $1\text{ jam}$ hingga $8\text{ jam}$ memperbarui angka produksi manual, estimasi gosong, produksi INTAN harian, dan proyeksi bulanan secara akurat.
- [x] **Uji Filter SOP 12 Langkah:** Tombol filter Fase 1, Fase 2, Fase 3, dan Fase 4 menyaring kartu SOP sesuai fasenya dengan tepat.
- [x] **Uji *Modal Video* YouTube:** Tombol `Tonton Video Demo` membuka pemutar video `https://youtu.be/UZ4ZYx_NoIY` dan menghentikan pemutaran saat modal ditutup.