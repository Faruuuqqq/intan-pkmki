<!-- ... existing code ... -->
### Bagian 1: *Hero Section* & *Interactive 3D Digital Twin* (Tampilan Pembuka Utama)
* **Badge Identitas:** `PKM-KI Universitas Padjadjaran 2026 | TKT Level 8 Teruji | Kemandirian Pangan, Energi & Air`
* **Headline Utama:** **INTAN (*Inovasi Termal Adaptif Nusantara*)** — *Smart Rotary Roaster* Berbasis Mikrokontroler.
* **Sub-headline:** Transformasi Produksi Kemplang Tunu untuk Peningkatan Kapasitas hingga $400–420\text{ Keping/Jam}$ dan Standardisasi Mutu Produk Lokal Sumatera.
* **Visual Utama (3D WebGL Interaktif & Animasi Real-Time):**
  * Menggunakan **Three.js 3D Model** yang direkonstruksi presisi sesuai CAD `Intan preview.pdf` (Dimensi $124\text{ cm} \times 30\text{ cm}$, bodi *Stainless Steel SUS 304*, 2 laci arang depan berpegangan jingga, 2 *blower* keong sentrifugal di sisi kiri-kanan, 6 rak penjepit kemplang, kap penutup servo berengsel di belakang, layar LCD biru, 2 *knob dimmer*, dan 4 roda troli merah).
  * **Kontrol Animasi 3D di Homepage:**
    1. **Putar Kamera $360^\circ$ (*Orbit Control*):** Pengguna dapat menggeser model 3D dengan tetikus atau sentuhan jari di layar HP.
    2. **Simulasi Rotasi 6 Servo ($180^\circ$ *Staggered*):** Animasi 6 rak penjepit kemplang berputar bolak-balik $180^\circ$ dengan jeda asinkron $30\text{ ms}$.
    3. **Animasi Buka/Tutup Laci Arang:** Menampilkan 2 laci bahan bakar bagian depan yang bergeser keluar memperlihatkan bara arang menyala (sesuai *Intan preview* hal. 5).
    4. **Animasi Buka Kap Penutup Servo (*X-Ray View*):** Membuka kap pelindung belakang untuk memperlihatkan deretan 6 unit Motor Servo MG996R (sesuai *Intan preview* hal. 4 & 5).
    5. **Simulasi Aliran Udara Blower & Histeresis LCD:** Partikel udara mengalir dari *dual blower* ke ruang bakar disertai *Live Telemetry HUD* layar LCD ($550^\circ\text{C}–600^\circ\text{C}$).
* **Tombol Aksi (*Call to Action* / CTA):**
  * 🟠 **Tombol Primer:** `🎬 Tonton Video Demo` (Membuka *modal popup* video YouTube `https://youtu.be/UZ4ZYx_NoIY`).
  * ⚪ **Tombol Sekunder:** `📖 Buka Panduan Penggunaan (SOP)` (Menggulir langsung ke bagian SOP 12 Langkah).
* **Highlight Statistik Cepat (*Counter Bar*):**
  * **$400–420\text{ Keping/Jam}$** (Kapasitas Produksi)
  * **$< 5\%$** (Tingkat Produk Cacat)
  * **$46,5\text{ Detik}$** (Rata-rata Waktu Matang per *Batch*)
  * **TKT Level 8** (Kesiapterapan Teknologi)

### Bagian 2: Latar Belakang Masalah & Solusi INTAN
* **Warisan Kuliner Sumatera Selatan:** Kemplang tunu berbahan ikan, tepung tapioka, dan rempah khas Sumatera Selatan / Ogan Ilir yang dipanggang di atas bara arang untuk menghasilkan cita rasa *smoky* khas (Isnaini et al., 2020; Santoso et al., 2021; Ismail et al., 2022).
* **Data Konteks Makro:** Kartu informasi yang menampilkan data **77.678 industri mikro dan kecil** di Sumatera Selatan (BPS Provinsi Sumatera Selatan, 2026) serta urgensi otomasi pangan (FAO, 2022).
* **Komparasi Masalah vs Solusi:**
  * *Cara Manual:* Kapasitas stagnan $80–100\text{ keping/jam}$, suhu termal tidak stabil, pengawasan harus intensif, kematangan kurang merata, produk cacat/gosong mencapai $2–10\%$.
  * *Solusi INTAN:* Otomasi pembalikan 6 servo, pemantauan suhu *real-time*, dan regulasi udara otomatis dengan tetap mempertahankan cita rasa khas **bara arang**.

### Bagian 3: Anatomi 3D, Material Penyusun, Dimensi, & *Wiring Diagram*
* **Fitur Visual:** Terhubung langsung dengan kamera 3D (**5 titik *clickable hotspots***) dan spesifikasi material sesuai PPT PIMNAS:
  1. **Rak Penjepit & Pipa SUS 304 (*Food-Grade*):** Mengacu standar **ASTM A240**, **ASTM A312**, dan **SNI 8753:2020**, higienis serta *detachable*.
  2. **Plat Aluminium & Rangka (*ASTM B209*):** Material pelapis dan rangka pendukung berdimensi total panjang **$124\text{ cm}$** ($100\text{ cm}$ tungku + $2\times 12\text{ cm}$ *blower*), tinggi bodi **$30\text{ cm}$** ($20\text{ cm}$ laci + $10\text{ cm}$ ruang bakar atas), dan roda **$10\text{ cm}$**.
  3. **6x Motor Servo MG996R (*Metal Gear*):** Torsi $11\text{ kg}\cdot\text{cm}$, berputar $180^\circ$ tiap $15\text{ detik}$ dengan algoritma *staggered delay* $30\text{ ms}$.
  4. **Termokopel Tipe-K & Modul MAX6675:** Sensor pembaca suhu ruang bakar tahan panas ekstrem secara *real-time*.
  5. **Layar LCD, Relay Optocoupler, & Kotak ECU (Arduino Nano V3.0):** Antarmuka pemantauan suhu aktual dan status *blower* dengan sistem *non-blocking* `millis()`, suhu internal kotak aman $< 48^\circ\text{C}$, dilengkapi visualisasi **Wiring Diagram** interaktif.
  6. **Dual Blower Keong Sentrifugal & Laci Arang:** Dikendalikan secara otomatis berbasis histeresis ($\ge 600^\circ\text{C}$ *Cut-off* OFF, $\le 550^\circ\text{C}$ *Recovery* ON) ditambah *knob* PWM AC Dimmer manual.
* **Spesifikasi Ringkas:** Daya listrik $\pm 150–200\text{ W}$ | Tegangan $220\text{V AC} / 5\text{V DC}$ | Berat perangkat $25\text{ kg}$ | Waktu operasi $4–5\text{ jam}$ kontinu.

### Bagian 4: Data Pengujian 6 Sampel, *Competitive Landscape*, & Kalkulator Simulasi UMKM
* **Tabel Hasil Pengujian Empiris 6 Sampel Kemplang (Data PPT Hal. 22):**
  * Sampel 1: Matang dalam **$47\text{ detik}$** pada suhu **$492,1^\circ\text{C}$**
  * Sampel 2: Matang dalam **$45\text{ detik}$** pada suhu **$512,20^\circ\text{C}$**
  * Sampel 3: Matang dalam **$47\text{ detik}$** pada suhu **$540,1^\circ\text{C}$**
  * Sampel 4: Matang dalam **$46\text{ detik}$** pada suhu **$612,4^\circ\text{C}$** (*Cut-off* histeresis aktif)
  * Sampel 5: Matang dalam **$46\text{ detik}$** pada suhu **$558,21^\circ\text{C}$**
  * Sampel 6: Matang dalam **$48\text{ detik}$** pada suhu **$571,3^\circ\text{C}$**
  * *Rata-rata waktu matang:* **$46,5\text{ detik}$** | *Rata-rata suhu uji:* **$547,72^\circ\text{C}$** (Rentang evaluasi utama $560–640^\circ\text{C}$).
* **Tabel *Competitive Landscape*:** Perbandingan langsung parameter Konvensional vs INTAN (dilengkapi ikon centang hijau).
<!-- ... existing code ... -->