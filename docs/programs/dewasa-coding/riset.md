# Riset Sumber Program Coding Dewasa (`dewasa-coding`)

- **Version:** v0.1.0
- **Last updated:** 2026-11-19
- **Status:** DRAF riset (issue #131) — bahan penyusunan [`silabus-draf.md`](silabus-draf.md); bukan transkripsi sumber resmi dan bukan keputusan pemilik.
- **Changeset:** Riset awal sumber SKKNI, skema sertifikasi, program pelatihan, kerangka kecakapan digital, kebutuhan UMKM, dan alat (#131).

> Dokumen ini konten **karangan** menurut
> [ADR-0007](../../architecture/adr/0007-authored-learning-content.md). Ia
> mencatat apa yang **benar-benar dibuka** penyusun pada **2026-11-19**,
> apa yang hanya terlihat sebagai cuplikan hasil pencarian, dan apa yang
> tidak dapat dibuka. Kutipan bertanda petik adalah salinan persis dari
> sumber yang dibuka; selebihnya ringkasan penyusun.

## 0. Cara membaca dokumen ini

- **Dibuka** berarti berkasnya diunduh atau halamannya diambil, dan teksnya
  dibaca penyusun. Untuk halaman web, isi dicek ulang dengan mengunduh HTML
  dan mencari kalimat atau istilahnya (ditandai "dicek ulang pada HTML").
  Untuk PDF hasil pindaian (SKKNI 282/2016) halaman dibaca langsung sebagai
  gambar.
- **Cuplikan pencarian** berarti hanya muncul di hasil mesin pencari; tidak
  dibuka. Tidak dipakai sebagai fakta.
- **Gagal dibuka** berarti pengambilan mengembalikan galat dari lingkungan
  penyusun; bukan bukti bahwa sumbernya tidak ada.
- `[belum terverifikasi]` berarti tidak dapat dipastikan dari sumber yang
  dibuka. `[asumsi]` berarti keputusan perancangan penyusun.
- Seluruh akses bertanggal **2026-11-19**. Berkas unduhan disimpan di
  direktori sementara di luar repositori dan hanya dibaca.

## 1. Ringkasan: apa yang terverifikasi

| Bidang | Terverifikasi (dibuka) | Belum terverifikasi |
| --- | --- | --- |
| SKKNI pemrograman | Kepmenaker 282/2016 (judul, tanggal 8 November 2016, status "Berlaku" di JDIH Kemnaker, 47 unit kompetensi `J.620100.001` sampai `J.620100.047`) | Apakah ada SKKNI pemrograman yang lebih baru; level KKNI dan jabatan per kualifikasi; SKKNI analis data, rekayasa data, pengembangan web, dan AI |
| Skema sertifikasi | Satu LSP perguruan tinggi memuat skema Programmer, Junior Web Programmer, dan Pemrogram Obyek beserta unit kompetensinya (brosur) | Daftar LSP yang menerima peserta umum; biaya; jadwal; apakah kode okupasi di brosur adalah kode resmi nasional |
| Program pelatihan pemerintah | Portal Digital Talent Scholarship terbuka (menu Akademi, Micro Skill, Jadwal), konten dimuat dinamis sehingga isi program tidak terbaca | Isi, syarat, biaya, dan jadwal DTS 2026; situs resmi Kartu Prakerja gagal dibuka (404); status gelombang dan insentif 2026 |
| Kerangka kecakapan digital | DigComp 3.0 (lima area, empat tingkat); empat kerangka literasi digital nasional (Digital Skills, Digital Safety, Digital Ethics, Digital Culture) dari halaman Indonesiabaik | Dokumen resmi Peta Jalan Literasi Digital; isi tiap kerangka nasional |
| Kebutuhan UMKM | Tiga artikel berita (dibuka) dengan angka QRIS, pembiayaan, dan kebutuhan pendampingan | Data resmi Kementerian UMKM atau BPS; metodologi angka adopsi |
| Alat | Lisensi Python, Bun, LibreOffice, n8n, `awcms-one`, Ollama, VS Code (berkas lisensi atau halaman lisensi resmi) dan kuota layanan skrip lembar kerja web | Harga dan kuota gratis layanan AI dan no-code berbayar; lisensi bobot model AI |

## 2. SKKNI bidang pemrograman dan pengembangan perangkat lunak

### 2.1 Yang dibuka

| Butir | Nilai | Sumber dan bukti |
| --- | --- | --- |
| Keputusan | Keputusan Menteri Ketenagakerjaan Republik Indonesia Nomor 282 Tahun 2016 | Halaman 1 PDF dan halaman JDIH. |
| Judul | "Penetapan Standar Kompetensi Kerja Nasional Indonesia Kategori Informasi dan Komunikasi Golongan Pokok Aktivitas Pemrograman, Konsultasi Komputer dan Kegiatan yang Berhubungan dengan ITU (YBDI) Bidang Software Development Subbidang Pemrograman" | Halaman 1 PDF (sampul keputusan; huruf kapital dinormalkan). |
| Ditetapkan | Jakarta, 8 November 2016, Menteri Ketenagakerjaan M. Hanif Dhakiri | Halaman 4 PDF; JDIH: "08 November 2016". |
| Berlaku sejak | tanggal ditetapkan | Halaman 4 PDF, diktum KEENAM. |
| Status di JDIH | "Berlaku"; riwayat: **mencabut** Kepmenakertrans KEP.142/MEN/V/2005 (Sub Sektor Programer Komputer) dan Kepmenakertrans 615 Tahun 2012; kolom "dicabut dengan" dan "mengubah" tidak terisi | Halaman JDIH Kemnaker (dicek ulang pada HTML: "Berlaku", "08 November 2016", "KEP.142/MEN/V/2005"). |
| Fungsi | Diktum KEDUA: SKKNI menjadi "acuan dalam penyusunan jenjang kualifikasi nasional, penyelenggaraan pendidikan dan pelatihan profesi, uji kompetensi dan sertifikasi profesi" | Halaman 3 PDF. |
| Kaji ulang | Diktum KEEMPAT: dikaji ulang setiap 5 tahun atau sesuai kebutuhan | Halaman 3 PDF. |
| Tujuan utama | "Menghasilkan perangkat lunak handal sesuai dengan kebutuhan pengguna" | Halaman 6 PDF, pemetaan kompetensi. |
| Fungsi kunci | Merancang aplikasi perangkat lunak; Mengimplementasikan perangkat lunak; Melakukan instalasi dan operasi perangkat lunak | Halaman 6-8 PDF. |

Berkas PDF yang dibaca adalah **salinan pindaian pada situs sebuah LSP
perguruan tinggi** (43 halaman, tanpa teks yang dapat diseleksi), bukan
berkas dari JDIH: halaman JDIH 282/2016 tidak melampirkan berkas.
Kecocokan salinan dengan berkas resmi `[belum terverifikasi]`, tetapi nomor,
judul, dan tanggal salinan cocok dengan halaman JDIH.

URL yang dibuka:

- `https://jdih.kemnaker.go.id/peraturan/detail/1381/keputusan-menteri-ketenagakerjaan-nomor-282-tahun-2016` (2026-11-19)
- `https://lsp.gunadarma.ac.id/media/skema/skkni/SKKNI2016-282_Pemrogram.pdf` (2026-11-19; salinan pindaian)
- `https://jdih.kemnaker.go.id/peraturan/detail/1311/keputusan-menteri-ketenagakerjaan-nomor-139-tahun-2016` (2026-11-19; **bukan** bidang pemrograman umum: SKKNI ERP, tidak dipakai)

### 2.2 Daftar 47 unit kompetensi (bab II.B, apa adanya)

Kode dan judul disalin dari tabel "Daftar Unit Kompetensi" (halaman 8-10
PDF). Hanya spasi yang dinormalkan.

| No | Kode unit | Judul unit kompetensi |
| --- | --- | --- |
| 1 | J.620100.001.01 | Menganalisis Tools |
| 2 | J.620100.002.01 | Menganalisis Skalabilitas Perangkat Lunak |
| 3 | J.620100.003.01 | Melakukan Identifikasi Library, Komponen atau Framework yang Diperlukan |
| 4 | J.620100.004.02 | Menggunakan Struktur Data |
| 5 | J.620100.005.02 | Mengimplementasikan User Interface |
| 6 | J.620100.006.01 | Merancang User Experience |
| 7 | J.620100.007.01 | Mengimplementasikan Rancangan Entitas dan Keterkaitan Antar Entitas |
| 8 | J.620100.008.01 | Merancang Arsitektur Aplikasi |
| 9 | J.620100.009.01 | Menggunakan Spesifikasi Program |
| 10 | J.620100.010.01 | Menerapkan Perintah Eksekusi Bahasa Pemrograman Berbasis Teks, Grafik, dan Multimedia |
| 11 | J.620100.011.01 | Melakukan Instalasi Software Tools Pemrograman |
| 12 | J.620100.012.01 | Melakukan Pengaturan Software Tools Pemrograman |
| 13 | J.620100.013.01 | Menerapkan Pemecahan Permasalahan Menjadi Subrutin |
| 14 | J.620100.014.01 | Menerapkan Metode dan Praktik Penggunaan Kembali (Reusable) Subrutin-Subrutin |
| 15 | J.620100.015.01 | Menyusun Fungsi, File atau Sumber Daya Pemrograman yang Lain dalam Organisasi yang Rapi |
| 16 | J.620100.016.01 | Menulis Kode dengan Prinsip Sesuai Guidelines dan Best Practices |
| 17 | J.620100.017.02 | Mengimplementasikan Pemrograman Terstruktur |
| 18 | J.620100.018.02 | Mengimplementasikan Pemrograman Berorientasi Objek |
| 19 | J.620100.019.02 | Menggunakan Library atau Komponen Pre-Existing |
| 20 | J.620100.020.02 | Menggunakan SQL |
| 21 | J.620100.021.02 | Menerapkan Akses Basis Data |
| 22 | J.620100.022.02 | Mengimplementasikan Algoritma Pemrograman |
| 23 | J.620100.023.02 | Membuat Dokumen Kode Program |
| 24 | J.620100.024.02 | Melakukan Migrasi Ke Teknologi Baru |
| 25 | J.620100.025.02 | Melakukan Debugging |
| 26 | J.620100.026.01 | Menggunakan Source Code Versioning |
| 27 | J.620100.027.01 | Mengimplementasikan Network Programming |
| 28 | J.620100.028.02 | Menerapkan Pemrograman Real Time |
| 29 | J.620100.029.02 | Menerapkan Pemrograman Paralel |
| 30 | J.620100.030.02 | Menerapkan Pemrograman Multimedia |
| 31 | J.620100.031.01 | Melakukan Profiling Program |
| 32 | J.620100.032.01 | Menerapkan Code Review |
| 33 | J.620100.033.02 | Melaksanakan Pengujian Unit Program |
| 34 | J.620100.034.02 | Melaksanakan Pengujian Integrasi Program |
| 35 | J.620100.035.02 | Melaksanakan Pengujian Program Sistem |
| 36 | J.620100.036.02 | Melaksanakan Pengujian Kode Program Secara Statis |
| 37 | J.620100.037.01 | Melaksanakan Stress Test |
| 38 | J.620100.038.01 | Melaksanakan Pengujian Oleh Pengguna (UAT) |
| 39 | J.620100.039.02 | Memberikan Petunjuk Teknis Kepada Pelanggan |
| 40 | J.620100.040.01 | Membuat Paket Instalasi Perangkat Lunak |
| 41 | J.620100.041.01 | Melaksanakan Cutover Aplikasi |
| 42 | J.620100.042.01 | Melaksanakan Konfigurasi Perangkat Lunak Sesuai Environment (Development, Staging, Production) |
| 43 | J.620100.043.01 | Menganalisis Dampak Perubahan Terhadap Aplikasi |
| 44 | J.620100.044.01 | Menerapkan Alert Notification Jika Aplikasi Bermasalah |
| 45 | J.620100.045.01 | Melakukan Pemantauan Resource yang Digunakan Aplikasi |
| 46 | J.620100.046.01 | Melakukan Logging Aplikasi |
| 47 | J.620100.047.01 | Melakukan Pembaruan Perangkat Lunak |

Catatan kehati-hatian:

- Sufiks versi kode (`.01` atau `.02`) di daftar ini **tidak selalu sama**
  dengan sufiks di halaman rincian unit: halaman 34 PDF memuat unit
  "Menggunakan Spesifikasi Program" sebagai `J.620100.009.02`, sedangkan
  daftar bab II.B dan brosur LSP memuat `J.620100.009.01`. Silabus draf
  memakai **daftar bab II.B** dan menuliskan kode lengkap; selisih sufiks
  `[belum terverifikasi]` mana yang berlaku.
- Hanya halaman 1-16 PDF yang dibaca (keputusan, tim perumus, pemetaan,
  daftar unit, dan satu halaman rincian unit). Elemen kompetensi dan
  kriteria unjuk kerja 47 unit **tidak dibaca**; pemetaan di silabus draf
  hanya ke judul unit, bukan ke kriteria unjuk kerjanya.
- Judul hanya mencakup subbidang pemrograman. Unit untuk basis data
  (selain SQL dan akses basis data), analitik data, keamanan aplikasi, dan
  AI tidak ada dalam daftar ini.

### 2.3 SKKNI lain (hanya petunjuk, tidak dibuka)

Hasil pencarian menyebut berkas bernama "SKKNI 2019-211" (kualifikasi 6
bidang elektronika dan pemrograman), "SKKNI 2017-044" (system analyst), dan
dua berkas bidang data (2020-268, 2020-299). **Tidak ada yang dibuka**;
nomor, isi, dan statusnya `[belum terverifikasi]` dan tidak dipakai di
silabus draf.

## 3. Skema sertifikasi BNSP/LSP

| Butir | Nilai | Status |
| --- | --- | --- |
| Portal BNSP | `https://bnsp.go.id/` terbuka; menu "Kelembagaan LSP", "Sertifikasi Kompetensi", "Jadwal Sertifikasi Kompetensi", "Lihat Semua LSP" | Dibuka 2026-11-19; isi daftar LSP dan skema tidak dibaca rinci. |
| Brosur skema TIK sebuah LSP perguruan tinggi | Memuat skema: Programmer (okupasi, "Kode Okupasi : 020503"), Junior Web Programmer ("Kode Okupasi : 020505"), Pemrogram Obyek ("Kode Okupasi : 020603"), semuanya bidang "Software Development/Pemrograman"; setiap skema memuat daftar unit `J.620100.*` | Dibuka (PDF dengan teks). Brosur menyiapkan **mahasiswa perguruan tinggi itu sendiri**; tanggal terbit brosur tidak tertera. |
| Unit skema Junior Web Programmer di brosur | `J.620100.004.02`, `.005.02`, `.011.01`, `.015.01`, `.017.02`, `.019.02`, `.023.02`, `.025.02` (delapan unit) | Dibuka. Judul unit `.015.01` di brosur ("Menulis kode dengan prinsip sesuai dan best practices") berbeda dari judul `.015.01` di SKKNI ("Menyusun Fungsi, File ..."); sedangkan judul `.016.01` di SKKNI mirip judul itu. Ketidakcocokan di brosur dicatat, tidak diselesaikan. |
| Unit skema Programmer di brosur | `J.620100.009.01`, `.016.01`, `.017.02`, `.018.02`, `.019.02`, `.021.02`, `.023.02`, `.025.02`, `.033.02` (sembilan unit) | Dibuka. |
| Peserta umum, biaya, jadwal | -- | `[belum terverifikasi]`; brosur tidak memuat biaya. Biaya uji ditetapkan LSP masing-masing `[belum terverifikasi]`. |
| Kode okupasi resmi nasional | -- | `[belum terverifikasi]`: angka di brosur adalah kode skema LSP itu; tidak dicocokkan dengan daftar okupasi nasional. |

URL yang dibuka: `https://bnsp.go.id/`;
`https://vm.lepkom.gunadarma.ac.id/assets/files/album/lsp/BROSUR%20LSP%20Skema%20TIK%20(TI-SI-MI).pdf`
(keduanya 2026-11-19). Cuplikan pencarian (tidak dibuka): skema Programmer
pada LSP perguruan tinggi lain dan LSP swasta; tidak dipakai.

## 4. Program pelatihan pemerintah

### 4.1 Digital Talent Scholarship (Komdigi)

| Butir | Nilai | Status |
| --- | --- | --- |
| Portal | Halaman depan portal DTS terbuka; judul "Digital Talent Scholarship", subjudul "Platform SDM Digital Nasional" | Dibuka 2026-11-19 (HTML dicek ulang). |
| Menu | Akademi, Micro Skill (bertanda "New"), Jadwal (Pendaftaran, Pelatihan, Event), Rilis Media, Informasi, Tentang Kami (Program, Data Capaian, FAQ), Validasi Sertifikat, Helpdesk, Mitra | Dilihat pada HTML; konten halaman lain dimuat dinamis dan **kosong** saat diambil (FAQ hanya menampilkan "Loading..."). |
| Program lanjutan setelah pelatihan | "Perluasan Kesempatan Kerja", "Mentor Class", "Digitalent After Class" (disebut di halaman depan) | Dibaca lewat pengambilan halaman. |
| Isi akademi, syarat, biaya, jadwal 2026 | -- | `[belum terverifikasi]`: tidak terbaca dari portal. |
| Pelatihan pembelajaran mesin bersama sebuah mitra swasta, pendaftaran 29 Juni sampai 19 Juli 2026; pelatihan data bersama sebuah mitra pelatihan data; Digital Talent Scholarship Enterprise | -- | Hanya cuplikan pencarian, **tidak dibuka**; tidak dipakai sebagai fakta. |

### 4.2 Kartu Prakerja

| Butir | Nilai | Status |
| --- | --- | --- |
| Situs resmi | `https://www.prakerja.go.id/` dan beberapa jalur lain mengembalikan HTTP 404 dari lingkungan penyusun | **Gagal dibuka**; bukan bukti situs mati. |
| Status 2026 | Sebuah blog perguruan tinggi, diperbarui 4 Agustus 2026, menulis bahwa gelombang 2026 "belum diumumkan secara resmi hingga artikel ini diperbarui pada 4 Agustus 2026"; gelombang terakhir yang diketahuinya adalah Gelombang 71 (Agustus 2024); nominal insentif 2026 "belum diumumkan"; ia mencatat situs resmi memberi 404 | Dibuka (sumber **sekunder**, bukan pengelola program). |
| Cuplikan pencarian yang saling bertentangan | Satu artikel Juli 2026 menyebut program berlanjut (judul menyebut Gelombang 75) | Hanya cuplikan, **tidak dibuka**. |
| Insentif dan syarat | Angka lama (mis. Rp3.500.000 pelatihan) hanya dari cuplikan pencarian | **Tidak dipakai**; `[belum terverifikasi]`. |

Kesimpulan: status Kartu Prakerja dan DTS pada 2026 **tidak dapat
ditetapkan** dari sumber resmi yang bisa dibuka. Silabus draf memperlakukan
keduanya sebagai peluang pendanaan peserta yang harus dicek peserta sendiri
di situs resmi, bukan sebagai mitra atau asumsi biaya.

## 5. Kerangka kecakapan digital

### 5.1 DigComp (Uni Eropa), pembanding

Halaman resmi Joint Research Centre, Komisi Eropa, dibuka 2026-11-19 (HTML
dicek ulang): `https://joint-research-centre.ec.europa.eu/projects-and-activities/education-and-training/digital-transformation-education/digital-competence-framework-citizens-digcomp/digcomp-framework_en`.

- Versi: DigComp 3.0, "the fifth version of the European Digital Competence
  Framework".
- Lima area kompetensi dan 21 kompetensi (nama persis dari halaman):
  1. "Information search, evaluation and management" (1.1 sampai 1.3);
  2. "Communication and collaboration" (2.1 sampai 2.6);
  3. "Content creation" (3.1 "Developing digital content", 3.2 "Integrating
     and re-elaborating digital content", 3.3 "Copyright and licences",
     3.4 "Computational thinking and programming");
  4. "Safety, wellbeing and responsible use" (4.1 sampai 4.4, termasuk 4.2
     "Protecting personal data and privacy");
  5. "Problem identification and solving" (5.1 sampai 5.4).
- Empat tingkat kemahiran: "Basic", "Intermediate", "Advanced", "Highly
  advanced".

Pemakaian di silabus draf: **hanya pembanding** (terutama 3.4 dan 4.2);
DigComp bukan standar Indonesia dan tidak dipetakan butir demi butir.

### 5.2 Kerangka literasi digital nasional

- Halaman Indonesiabaik (`https://indonesiabaik.id/infografis/4-modul-literasi-digital`,
  dibuka 2026-11-19, HTML dicek ulang) menyebut empat kerangka yang
  "dikembangkan menjadi Modul Literasi Digital": Digital Skills, Digital
  Safety, Digital Ethics, Digital Culture. Halaman tidak menguraikan tiap
  kerangka dan tidak mencantumkan tanggal (tertulis "5 tahun lalu").
- Dokumen resmi Peta Jalan Literasi Digital (Kominfo, 2021-2024 menurut
  cuplikan pencarian) **tidak dibuka**; tahun mulainya berbeda antarsumber
  `[belum terverifikasi]`. Peta Jalan Indonesia Digital dan Kerangka
  Literasi Digital tidak ditemukan dalam bentuk dokumen resmi yang bisa
  dibuka. Dokumen penerusnya di bawah Komdigi, bila ada,
  `[belum terverifikasi]`.

## 6. Kebutuhan UMKM digital

Tidak ada dokumen resmi Kementerian UMKM atau BPS yang berhasil dibuka;
semua di bawah ini dari **berita dan opini**, sehingga bobot buktinya
rendah.

| Butir | Nilai | Sumber (dibuka 2026-11-19) |
| --- | --- | --- |
| QRIS | "pengguna QRIS telah menembus 63 juta dengan 45,3 juta merchant hingga April 2026"; nilai transaksi tumbuh 108,43 persen secara tahunan (angka artikel) | Jawa Pos, 5 Agustus 2026: `https://www.jawapos.com/ekonomi/2608050003/pengguna-qris-tembus-63-juta-mengapa-banyak-umkm-masih-sulit-dapat-modal` |
| Pembiayaan | Pembiayaan UMKM lintas sektor sampai Mei 2026 Rp1.939,50 triliun (OJK, menurut artikel); integrasi QRIS "belum sepenuhnya membantu" UMKM mengakses modal usaha | Sumber yang sama. |
| Pencatatan | Peneliti CELIOS: "Tujuan akhir dari digitalisasi adalah membantu UMKM memiliki pencatatan keuangan yang lebih baik"; riwayat transaksi digital dapat menjadi dasar mengajukan modal | Sumber yang sama. |
| Pendampingan | "Pendampingan sering kali lebih dibutuhkan daripada sekadar pelatihan penggunaan aplikasi." Membangun keberanian mencoba disebut langkah pertama | Good News From Indonesia, 17 Juli 2026 (opini kontributor): `https://www.goodnewsfromindonesia.id/2026/07/17/mengapa-digitalisasi-umkm-tidak-selalu-dimulai-dari-teknologi` |
| Skala | "sekitar 30,21 juta UMKM nonpertanian", 99,70 persen usaha mikro; "sekitar 27 juta UMKM telah mengadopsi teknologi digital" (angka pemerintah menurut artikel); Indeks Literasi Digital Indonesia 2023 "3,65" | Sumber yang sama; metodologi dan sumber primer `[belum terverifikasi]`. |
| Hambatan | Menurut artikel, Kadin menyebut literasi digital, kualitas SDM, branding, dan strategi pemasaran; riset Bank Indonesia menyebut tingkat literasi dan kepercayaan terhadap teknologi | Sumber yang sama (kutipan tidak langsung). |

Gagal dibuka: artikel Bisnis.com 3 Agustus 2026 tentang pemanfaatan data
transaksi digital (HTTP 403).

Implikasi bagi rancangan `[asumsi]`: jalur pebisnis menekankan pencatatan
dan pembacaan data penjualan, pendampingan berbasis proyek, dan literasi
keamanan, bukan pemrograman mendalam; pembayaran dibahas sebagai konsep dan
tidak melibatkan data pembayaran nyata.

## 7. Kajian alat: lisensi, biaya, dan akun

Fakta berikut dibaca dari berkas lisensi atau halaman resmi masing-masing
pada 2026-11-19. Harga layanan berbayar sengaja tidak dicatat karena tidak
dibuka.

| Alat | Fakta terverifikasi | Akun | Biaya peserta |
| --- | --- | --- | --- |
| Python | Dokumentasi lisensi resmi: "PYTHON SOFTWARE FOUNDATION LICENSE VERSION 2" (`https://docs.python.org/3/license.html`) | Tidak perlu | Gratis |
| LibreOffice (lembar kerja) | Halaman lisensi resmi memuat "Mozilla Public License v2.0" (`https://www.libreoffice.org/about-us/licenses/`) | Tidak perlu | Gratis |
| Layanan skrip lembar kerja web (Apps Script) | Kuota resmi (halaman diperbarui 2026-09-03 UTC): "Script runtime" 6 menit per eksekusi; "Triggers total runtime" 90 menit per hari untuk akun konsumen dan 6 jam per hari untuk akun Workspace; kuota berbeda per jenis akun (`https://developers.google.com/apps-script/guides/services/quotas`) | **Perlu akun layanan web** | Gratis di tingkat akun konsumen `[belum terverifikasi]`; Workspace berbayar `[belum terverifikasi]` |
| Bun | "Bun itself is MIT-licensed"; Bun menautkan JavaScriptCore dan WebKit yang berlisensi LGPL-2 (`https://bun.sh/docs/project/licensing`) | Tidak perlu | Gratis |
| `awcms-one` (template web) | Berkas `LICENSE` pada cabang utama: "MIT License" (`https://raw.githubusercontent.com/ahliweb/awcms-one/main/LICENSE`); fakta teknis (Bun, Astro, PostgreSQL, profil `landing`, `toko`, `berita`) sudah dicatat di `docs/programs/sma-coding/silabus.md` bagian 6 | Akun repositori kode untuk "Use this template" | Gratis; beban lab berat (PostgreSQL) |
| Editor kode VS Code | Berkas lisensi repositori sumber: "MIT License" (`https://raw.githubusercontent.com/microsoft/vscode/main/LICENSE.txt`). Lisensi **biner distribusi resmi** terpisah `[belum terverifikasi]` | Tidak perlu | Gratis; editor teks bebas lain juga cukup |
| n8n (otomasi alur kerja) | Halaman resmi: "Sustainable Use License", jenis "fair-code"; hak pakai gratis dengan tiga batasan, antara lain "only for your own internal business purposes or for non-commercial or personal use" dan mendistribusikan hanya bila "free of charge for non-commercial purposes" (`https://docs.n8n.io/sustainable-use-license/`). Ini **bukan** lisensi sumber terbuka bersertifikat OSI | Pasang sendiri: tidak perlu; layanan awan miliknya `[belum terverifikasi]` | Versi pasang-sendiri gratis dengan batasan; awan `[belum terverifikasi]` |
| Ollama (menjalankan model bahasa lokal) | Berkas `LICENSE` cabang utama: "MIT License" (`https://raw.githubusercontent.com/ollama/ollama/main/LICENSE`). Lisensi **bobot model** yang dijalankan berbeda-beda `[belum terverifikasi]`; kebutuhan memori `[belum terverifikasi]` | Tidak perlu untuk pemakaian lokal | Gratis; butuh perangkat memadai |
| Layanan asisten AI daring | Tidak ada yang dibuka | Perlu akun | Harga, kuota gratis, dan penyimpanan data `[belum terverifikasi]` |
| Alat no-code/low-code lain | Tidak ada yang dibuka (selain n8n di atas) | Umumnya perlu akun | `[belum terverifikasi]` |

Catatan jujur: SMA coding jalur B memakai Bun dan template `awcms-one`
(silabus sma-coding bagian 6); fakta bahwa profil `landing` tidak dicoba
dijalankan tanpa `apps/cms` hidup tetap berlaku (`[belum terverifikasi]`).

## 8. Yang tidak dikerjakan riset ini

- Tidak membaca elemen kompetensi dan kriteria unjuk kerja 47 unit SKKNI.
- Tidak memverifikasi SKKNI pemrograman yang mungkin lebih baru.
- Tidak membuka situs resmi Kartu Prakerja (gagal) dan tidak membaca isi
  program DTS (dimuat dinamis).
- Tidak mengukur kebutuhan UMKM secara primer; tidak ada wawancara.
- Tidak menguji alat apa pun dengan menjalankannya.

## 9. Daftar sumber yang dibuka (2026-11-19)

| Sumber | URL |
| --- | --- |
| Kepmenaker 282/2016, halaman JDIH | `https://jdih.kemnaker.go.id/peraturan/detail/1381/keputusan-menteri-ketenagakerjaan-nomor-282-tahun-2016` |
| Kepmenaker 282/2016, salinan pindaian pada situs LSP | `https://lsp.gunadarma.ac.id/media/skema/skkni/SKKNI2016-282_Pemrogram.pdf` |
| Brosur skema TIK LSP perguruan tinggi | `https://vm.lepkom.gunadarma.ac.id/assets/files/album/lsp/BROSUR%20LSP%20Skema%20TIK%20(TI-SI-MI).pdf` |
| BNSP | `https://bnsp.go.id/` |
| Portal DTS | `https://digitalent.komdigi.go.id/` |
| Blog perguruan tinggi tentang status Prakerja 2026 | `https://blog.itera.ac.id/cara-daftar-kartu-prakerja-2026-syarat-gelombang-link-resmi/` |
| DigComp 3.0 | tautan di bagian 5.1 |
| Indonesiabaik, empat kerangka literasi digital | tautan di bagian 5.2 |
| Tiga artikel UMKM | tautan di bagian 6 |
| Lisensi dan kuota alat | tautan di bagian 7 |

## Changelog

| Versi | Tanggal | Perubahan |
| --- | --- | --- |
| v0.1.0 | 2026-11-19 | Riset awal (#131). |
