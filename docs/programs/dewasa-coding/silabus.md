# Silabus Pembelajaran Coding untuk Dewasa — v1.2

- **Version:** v1.2.1
- **Last updated:** 2026-11-20
- **Status:** DISETUJUI pemilik program pada 2026-11-19 (dialog pilihan, beserta seluruh rekomendasi penyusun; keputusan di bagian 12). Revisi v1.1.0 (rekayasa perangkat lunak berbantuan AI, kebijakan penggunaan AI per program) disetujui pemilik pada 2026-11-19 lewat keputusan #139 (bagian 12.9). Dienkode ke `data/dewasa-coding/` (skema khusus program, ADR-0008) dan didaftarkan di `data/programs.json` (ADR-0006). Belum ada modul di `content/dewasa-coding/` (ADR-0007). Revisi v1.2.0 (jembatan kuliah-coding ke jalur `PRO`, bagian 6.1, 6.2, 12.7 dan 12.8) disetujui pemilik pada 2026-11-19 lewat keputusan #177 (dialog pilihan, seluruh rekomendasi K1 sampai K8).
- **Changeset:** Silabus program `dewasa-coding` disetujui pemilik pada 2026-11-19 (v1.0.0): empat jalur persona (pekerja, profesional, personal, pebisnis/UMKM), modul berbasis jam, pemetaan ke SKKNI 282/2016 untuk jalur profesional (hanya sampai judul unit), pertanyaan terbuka diganti keputusan pemilik (#131). Revisi v1.1.0 (#139, minor): modul baru `DW-PRO-M13` (rekayasa perangkat lunak berbantuan AI, 8 jam, jalur PRO 128 menjadi 136 jam), butir tambahan di `DW-FND-M1` dan `DW-PKJ-M6`, dan bagian 9.1 Kebijakan penggunaan AI; riwayat di `.changeset/dewasa-coding-v1-1-ai.md`. Revisi patch v1.1.1 (#165): kalimat status yang basi; isi kurikulum tidak berubah. Revisi minor v1.2.0 (#177): jembatan kuliah-coding ke jalur `PRO` dirancang (bagian 6.2: pengakuan per modul dengan status lewati, padatkan, wajib untuk tiga profil masuk; `DW-FND-M1` dan `DW-PRO-M12` tetap wajib) dan dikodekan di `data/dewasa-coding/kuliah-bridge.json`; keputusan 12.7 diganti; modul dan jam `PRO` tidak berubah. Revisi patch v1.2.1 (#281, keputusan pemilik 2026-11-20): baris "Pagar belajar jalur `PRO` (anjuran)" di bagian 9.1 (tiga anjuran U-18); bukan larangan; modul, jam, dan pemetaan SKKNI tidak berubah.

> Dokumen ini konten **karangan** (*authored*) menurut
> [ADR-0007](../../architecture/adr/0007-authored-learning-content.md),
> bukan dokumen pemerintah dan bukan transkripsi; persetujuannya dicatat
> pemilik pada 2026-11-19 (bagian 12; revisi v1.1.0 di 12.9). Fakta dari sumber luar (nomor
> keputusan, kode unit, lisensi) dibaca dari sumber yang dibuka dan dirinci
> di [`riset.md`](riset.md); selebihnya rancangan penyusun. Tujuan setiap
> jalur, jam, dan urutan modul adalah rancangan yang disetujui, tetap
> berstatus `[asumsi]` sebagai perkiraan. Judul daftar 47 unit SKKNI
> dicocokkan kata demi kata dengan lampiran resmi JDIH Kemnaker pada 2026-11-19 (sufiks kode tetap `[belum terverifikasi]`). Bahan revisi v1.1.0 (bukti
> dampak alat AI, hak cipta, privasi, energi) dibaca dari
> [`../../riset/ai-rekayasa-perangkat-lunak.md`](../../riset/ai-rekayasa-perangkat-lunak.md);
> kekuatan buktinya dirinci di sana, bukan diulang di sini.

## 0. Cara membaca dokumen ini

- `[belum terverifikasi]`: tidak dapat dipastikan dari sumber yang benar-benar
  dibuka (lihat `riset.md`). Bukan fakta.
- `[asumsi]`: keputusan perancangan penyusun, bukan data resmi.
- **Kode modul**: `DW-<jalur>-M<n>`. Jalur: `PKJ` (pekerja), `PRO`
  (profesional), `PRS` (personal), `BIS` (pebisnis/UMKM). Modul bersama
  seluruh jalur memakai `DW-FND-M<n>`. Contoh: `DW-PRO-M4`.
- **Struktur waktu** memakai **jam belajar** per modul, bukan semester atau
  minggu sekolah. Satu "jam" = 60 menit belajar efektif (teori, praktik, dan
  tugas) `[asumsi]`. Jam di dokumen ini adalah **perkiraan** untuk pemula
  dengan 3-5 jam belajar per minggu; tidak ada sumber resmi yang
  menetapkannya.
- Kutipan unit kompetensi SKKNI disalin dari daftar bab II.B Kepmenaker
  282/2016 (`riset.md` bagian 2.2).

## 1. Tujuan, sasaran, dan batas program

Program memberi orang dewasa jalan belajar coding yang berpijak pada
**tujuan nyata masing-masing persona**, bukan kurikulum sekolah. Empat
jalur dirancang terpisah supaya peserta tidak dipaksa melewati materi yang
tidak ia butuhkan, dengan satu modul fondasi bersama tentang keamanan dan
etika.

| Jalur | Persona | Tujuan utama | Jam `[asumsi]` | Akhir jalur |
| --- | --- | --- | --- | --- |
| `PKJ` | Pekerja | Meningkatkan keterampilan di pekerjaan saat ini: otomasi lembar kerja, skrip kecil, pengolahan data, dan AI sebagai alat produktivitas | 8 + 40 = 48 | Portofolio: satu alur kerja kantor yang diotomasi dengan data sintetis |
| `PRO` | Profesional | Alih karier atau peningkatan menjadi pengembang perangkat lunak, selaras SKKNI 282/2016 | 8 + 128 = 136 | Portofolio kode lengkap dan opsi uji kompetensi LSP |
| `PRS` | Personal | Pembelajar mandiri atau hobi: literasi komputasional dan proyek pribadi | 8 + 30 = 38 | Satu proyek pribadi dan peta jalan belajar lanjut |
| `BIS` | Pebisnis/UMKM | Memakai alat digital untuk usaha: situs, toko daring, pencatatan dan data penjualan, otomasi, no-code/low-code, dan AI | 8 + 48 = 56 | Rencana dan prototipe digital usaha sintetis |

Batas program:

- Program **tidak** menjanjikan pekerjaan, sertifikat resmi, atau
  pendanaan. Sertifikasi kompetensi hanya melalui LSP berlisensi BNSP di
  luar program ini (bagian 8).
- Program **bukan** layanan konsultasi bisnis, pajak, atau hukum.
- Repositori **tidak menyimpan data peserta** (ADR-0004); semua contoh dan
  proyek memakai data sintetis (bagian 9).

## 2. Struktur program dan asumsi

| Butir | Nilai `[asumsi]` |
| --- | --- |
| Satuan | Modul berjam; peserta mengambil satu jalur atau lebih |
| Modul bersama | `DW-FND-M1` (8 jam) wajib bagi semua jalur sebelum modul jalur |
| Beban belajar per minggu | 3-5 jam; jalur `PKJ` selesai sekitar 10-16 minggu, `PRO` sekitar 6-9 bulan, `PRS` sekitar 8-12 minggu, `BIS` sekitar 11-18 minggu |
| Bahasa pemrograman inti | Python (jalur `PKJ`, `PRO`, `PRS`); JavaScript/TypeScript untuk web (jalur `PRO`, `BIS` opsional) |
| Bentuk pelaksanaan | Mandiri bermodul dengan sesi pendampingan opsional (keputusan 12.2) |
| Perangkat peserta | Laptop atau komputer dengan 4 GB RAM, sistem operasi bebas, koneksi internet untuk mengunduh alat sekali `[belum terverifikasi]` |
| Prasyarat umum | Dapat mengoperasikan komputer, peramban, berkas, dan surel; tidak perlu pengalaman coding |
| Bahasa pengantar | Indonesia |

## 3. Modul bersama

### 3.1 `DW-FND-M1` — Keamanan, privasi, dan etika kerja dengan kode dan AI (8 jam)

| Butir | Isi |
| --- | --- |
| Hasil belajar | Peserta dapat (a) memisahkan data nyata dari data sintetis dan menolak memasukkan data pelanggan, rekan, atau diri sendiri ke latihan; (b) tidak menaruh kata sandi, kunci, atau token di berkas kode atau di dalam perintah ke asisten AI; (c) memakai manajer kata sandi dan autentikasi dua langkah; (d) memeriksa keluaran asisten AI sebelum dipakai; (e) mencatat bila keluaran AI dipakai dan mengikuti kebijakan penggunaan AI di tempat kerja atau usahanya; (f) menjelaskan bahwa status hukum hak cipta dan lisensi keluaran AI belum pasti dan memeriksa lisensi sebelum memakai kode atau data; (g) mengenali *prompt injection* pada dokumen atau halaman yang diproses AI |
| Topik | data pribadi dan data usaha; kredensial dan berkas `.env` (tidak dibagikan, tidak di-commit); hak kekayaan intelektual dan lisensi (konsep); cara kerja asisten AI dan kemungkinan salah; hak cipta dan lisensi keluaran AI (status hukum masih berkembang dan berbeda antar negara; hukum Indonesia `[belum terverifikasi]`); kebijakan penggunaan AI di tempat kerja dan usaha (bagian 9.1); pengenalan *prompt injection* (instruksi tersembunyi dalam dokumen yang diproses AI); jejak energi dan biaya komputasi AI (butir singkat: angka per perintah berbeda puluhan kali lipat antar model dan metode ukur, dan tidak ada angka terverifikasi per tugas pemrograman, sehingga "tidak memakai AI" sah untuk tugas kecil); menyaring konten dan penipuan daring |
| Latihan | Audit potongan skrip sintetis yang sengaja berisi "kata sandi palsu"; buat daftar periksa privasi satu halaman; telaah satu dokumen sintetis berisi instruksi tersembunyi dan jelaskan mengapa asisten AI dapat menurutinya |
| Rujukan | DigComp 3.0 area 4 ("Safety, wellbeing and responsible use", kompetensi 4.2 dan 3.3) dan empat kerangka literasi digital nasional, hanya sebagai pembanding (`riset.md` bagian 5) |

### 3.2 Istilah AI yang dipakai

Istilah di bawah dicantumkan agar peserta dapat membaca bahan luar dengan
kritis; definisinya adalah definisi kerja `[inferensi]` dari
`../../riset/ai-rekayasa-perangkat-lunak.md` bagian 3.5, bukan istilah baku.

| Istilah | Arti di program ini | Status |
| --- | --- | --- |
| Pemrograman berbantuan AI | Peserta memakai asisten AI, tetapi **membaca, menguji, memahami, dan bertanggung jawab** atas setiap baris yang dipakai | Kompetensi sasaran `DW-PRO-M13` dan `DW-PKJ-M6` |
| *Vibe coding* | Menerima keluaran AI tanpa menelaah kodenya; hanya dibahas sebagai istilah dan risiko, dapat dipakai untuk prototipe sekali pakai yang tidak dirilis atau dipelihara | **Bukan** praktik yang diajarkan dan bukan kompetensi |
| *AI-native engineer* | Istilah yang beredar dan tidak baku | **Tidak** dipakai sebagai label capaian atau profil lulusan |
| Agen kode | Alat yang merencanakan, menjalankan, dan menguji dengan intervensi manusia minimal | Pengenalan terbatas di `DW-PRO-M13`, dengan batas kewenangan dan tinjauan manusia |

## 4. Jalur `PKJ` — Pekerja: upskilling di pekerjaan saat ini

**Tujuan:** peserta mengurangi pekerjaan kantor berulang lewat rumus
lembar kerja, skrip, dan alat bantu AI, dengan tetap menjaga kerahasiaan data
kantor.

**Prasyarat:** `DW-FND-M1`; terbiasa memakai lembar kerja dasar (jumlah,
rata-rata, format) `[asumsi]`.

**Durasi:** 40 jam `[asumsi]` (8 modul × 5 jam).

**Alat (rekomendasi, bagian 10):** lembar kerja LibreOffice (atau lembar
kerja yang dipakai kantor, tanpa data nyata di latihan), Python, editor teks.

| Kode | Modul | Hasil belajar | Keluaran portofolio |
| --- | --- | --- | --- |
| `DW-PKJ-M1` | Memetakan pekerjaan berulang | mengidentifikasi tugas yang layak diotomasi; menulis langkah tugas sebagai algoritma | peta tiga tugas berulang dan langkahnya |
| `DW-PKJ-M2` | Rumus dan pembersihan data lembar kerja | memakai rumus pencarian, kondisi, teks, tanggal; membersihkan data kotor sintetis | lembar kerja sintetis bersih dan terdokumentasi |
| `DW-PKJ-M3` | Pengantar Python untuk data lembar kerja | variabel, daftar, pengulangan, fungsi; membaca berkas CSV | skrip yang membaca CSV sintetis |
| `DW-PKJ-M4` | Mengolah dan menggabungkan data | memfilter, mengelompokkan, menggabungkan dua tabel CSV | skrip ringkasan per kategori |
| `DW-PKJ-M5` | Otomasi berkas dan laporan | membuat laporan bulanan otomatis (CSV ke ringkasan), mengganti nama berkas massal pada folder sintetis | skrip laporan bulanan |
| `DW-PKJ-M6` | AI untuk produktivitas kerja | menulis permintaan jelas; meminta draf rumus atau skrip; memeriksa dan menguji keluaran; mengenali halusinasi; menjaga data; mencatat alat, versi, dan perintah yang dipakai; menyadari bahwa hasil tidak identik antar permintaan; menguji dengan data sintetis sebelum hasil dipakai | catatan perbandingan keluaran AI dengan hasil uji, memuat alat, versi, dan perintah |
| `DW-PKJ-M7` | Visualisasi dan penyajian | membuat grafik yang jujur dan ringkasan satu halaman | satu halaman laporan dengan grafik |
| `DW-PKJ-M8` | Proyek akhir | mengotomasi satu alur kerja kantor sintetis dari awal sampai akhir dengan dokumentasi | portofolio `PKJ` (bagian 8.1) |

**Proyek berbasis data sintetis:** "Rekap absensi dan lembur dari log
sintetis", "rekap faktur bulanan dari CSV sintetis", atau "daftar tugas tim
dari beberapa lembar". Data dibangkitkan dengan skrip dari benih acak yang
dicatat; tidak ada nama atau perusahaan nyata.

**Pilihan lanjutan `[asumsi]`:** skrip pada lembar kerja web (Apps Script)
sebagai topik opsional bagi pekerja yang kantornya memakai lembar kerja web
(bagian 10.1: kuota, akun, dan alasan tidak menjadi inti).

## 5. Jalur `PRO` — Profesional: alih karier atau menjadi pengembang

**Tujuan:** peserta mampu bekerja pada tingkat pemula sebagai pengembang
perangkat lunak (aplikasi web dan data sederhana), dengan unit kompetensi
SKKNI 282/2016 sebagai kerangka rujukan (bagian 5.2).

**Prasyarat:** `DW-FND-M1`; logika dasar dan kemampuan membaca Bahasa
Inggris teknis `[asumsi]`. Peserta dari `PKJ` atau sma-coding jalur A/B
dapat melewati sebagian modul (bagian 6).

**Durasi:** 128 jam `[asumsi]` (12 modul × 10 jam + 1 modul × 8 jam) dengan
beban 5 jam per minggu menjadi sekitar 26 minggu.

**Alat (rekomendasi, bagian 10):** Python untuk inti pemrograman, SQL
dengan basis data berkas ringan, Git, editor kode; JavaScript/TypeScript
dengan Bun untuk modul web (selaras sma-coding jalur B).

### 5.1 Rencana modul

Tabel memuat modul menurut **urutan belajar**; nomor modul tidak selalu sama
dengan urutan baris (`DW-PRO-M13` ditambahkan pada v1.1.0 dan dipelajari
setelah `DW-PRO-M5`). Prasyarat sebuah modul adalah modul pada baris
sebelumnya (modul pertama: `DW-FND-M1`).

| Kode | Modul | Hasil belajar | Jam `[asumsi]` | Unit SKKNI terkait (bagian 5.2) |
| --- | --- | --- | --- | --- |
| `DW-PRO-M1` | Lingkungan kerja pengembang dan Git | memasang dan mengatur alat pemrograman; memakai terminal; versi kode dengan Git | 10 | `J.620100.011.01`, `J.620100.012.01`, `J.620100.026.01` |
| `DW-PRO-M2` | Dasar pemrograman terstruktur | variabel, kondisi, perulangan, subrutin; memecah masalah | 10 | `J.620100.013.01`, `J.620100.017.02`, `J.620100.010.01` |
| `DW-PRO-M3` | Struktur data dan algoritma dasar | daftar, kamus, himpunan, pencarian, pengurutan; menyatakan dan membandingkan solusi | 10 | `J.620100.004.02`, `J.620100.022.02` |
| `DW-PRO-M4` | Fungsi, modul, dan kode yang rapi | penggunaan ulang, organisasi berkas, pedoman penulisan, dokumentasi kode | 10 | `J.620100.014.01`, `J.620100.015.01`, `J.620100.016.01`, `J.620100.023.02` |
| `DW-PRO-M5` | Debugging dan pengujian unit | menemukan galat sistematis; menulis uji unit | 10 | `J.620100.025.02`, `J.620100.033.02` |
| `DW-PRO-M13` | Rekayasa perangkat lunak berbantuan AI | menulis spesifikasi dan uji sebelum meminta kode dari asisten AI; meninjau kode hasil AI (kebenaran, keamanan, kebergantungan) dan menolak yang tidak dipahami; memeriksa keberadaan dan reputasi paket sebelum dipasang (paket fiktif); memakai analisis kode statis dan uji otomatis sebagai gerbang; mencatat alat, versi, dan perintah; mengikuti kebijakan penggunaan AI tim; mengenal agen kode dengan batas kewenangan dan tinjauan manusia | 8 | `J.620100.009.01`, `J.620100.033.02`, `J.620100.032.01`, `J.620100.036.02`, `J.620100.019.02` |
| `DW-PRO-M6` | Pemrograman berorientasi objek dan pustaka | kelas dan objek; memakai pustaka siap pakai | 10 | `J.620100.018.02`, `J.620100.019.02`, `J.620100.003.01` |
| `DW-PRO-M7` | SQL dan akses basis data | skema, kueri, relasi antar tabel, akses dari kode | 10 | `J.620100.020.02`, `J.620100.021.02`, `J.620100.007.01` |
| `DW-PRO-M8` | Antarmuka web: HTML, CSS, JavaScript/TypeScript | halaman responsif; interaksi sisi peramban | 10 | `J.620100.005.02`, `J.620100.006.01` |
| `DW-PRO-M9` | Layanan web dan API | membuat dan memanggil API sederhana; berkas konfigurasi | 10 | `J.620100.027.01`, `J.620100.019.02` |
| `DW-PRO-M10` | Kolaborasi: tinjau kode dan pengujian lanjut | tinjau kode sejawat; uji integrasi; analisis kode statis | 10 | `J.620100.032.01`, `J.620100.034.02`, `J.620100.036.02` |
| `DW-PRO-M11` | Konfigurasi, pencatatan, dan operasi dasar | lingkungan pengembangan dan produksi; log dan pemberitahuan masalah; pembaruan | 10 | `J.620100.042.01`, `J.620100.046.01`, `J.620100.044.01`, `J.620100.047.01` |
| `DW-PRO-M12` | Proyek akhir dan persiapan portofolio | membaca spesifikasi, membangun aplikasi kecil, uji penerimaan pengguna sintetis, petunjuk teknis | 10 | `J.620100.009.01`, `J.620100.038.01`, `J.620100.039.02`, `J.620100.008.01` |

### 5.2 Pemetaan ke SKKNI 282/2016

**Sumber:** Keputusan Menteri Ketenagakerjaan Nomor 282 Tahun 2016
(ditetapkan 8 November 2016; status "Berlaku" di JDIH Kemnaker pada
2026-11-19). Judul 47 unit ada di `riset.md` bagian 2.2; kolom "Unit SKKNI
terkait" di atas memakai **kode persis dari daftar itu**.

**Cakupan jujur:**

| Pernyataan | Dasar |
| --- | --- |
| Modul `DW-PRO-M1..M13` menyentuh 34 dari 47 unit melalui **kesamaan judul dan topik**; `DW-PRO-M13` hanya memakai lima unit yang sudah disentuh modul lain (`009`, `019`, `032`, `033`, `036`) sehingga hitungan dan daftar 13 unit tidak berubah dari v1.0.0 | Dihitung dari kolom unit di tabel 5.1 `[asumsi]` |
| Pemetaan adalah ke **judul unit**, belum ke elemen kompetensi dan kriteria unjuk kerja | Elemen dan kriteria tidak dibaca (`riset.md` bagian 8) |
| Menyentuh sebuah unit **tidak berarti** peserta kompeten menurut unit itu | Kompetensi dinyatakan hanya oleh uji LSP |
| 13 unit tidak dicakup: `001`, `002`, `024`, `028`, `029`, `030`, `031`, `035`, `037`, `040`, `041`, `043`, `045` | Unit lanjutan (skalabilitas, real time, paralel, multimedia, profiling, stress test, cutover, migrasi, pemantauan sumber daya) di luar ruang lingkup pemula `[asumsi]` |
| Sufiks versi kode (`.01` atau `.02`) mengikuti daftar bab II.B; halaman rincian unit `009` memuat `.02` | `[belum terverifikasi]` mana yang berlaku (`riset.md` bagian 2.2) |
| Apakah ada SKKNI yang lebih baru dari 282/2016 | `[belum terverifikasi]` |

Catatan penghitungan: 34 unit berbeda muncul di kolom unit tabel 5.1
(dihitung dengan skrip kecil dari kode di tabel itu); 47 dikurangi 34 sama
dengan 13 unit yang tidak dicakup. Hitungan ini diperiksa ulang oleh audit
korpus saat encode (bagian 12.4).

**Skema LSP yang relevan (dari brosur satu LSP perguruan tinggi, `riset.md`
bagian 3):** Junior Web Programmer (delapan unit: `004.02`, `005.02`,
`011.01`, `015.01`, `017.02`, `019.02`, `023.02`, `025.02`), Programmer
(sembilan unit: `009.01`, `016.01`, `017.02`, `018.02`, `019.02`, `021.02`,
`023.02`, `025.02`, `033.02`). Seluruh unit itu ada di modul `PRO`
(`004`, `005`, `011`, `015`, `017`, `019`, `023`, `025` dan `009`, `016`,
`018`, `021`, `033`). Kecocokan judul `015.01` antara brosur dan SKKNI
bermasalah (`riset.md` bagian 3).

### 5.3 Proyek berbasis data sintetis

Proyek utama: **aplikasi pencatatan inventaris kecil** (Python,
SQL, dan antarmuka web sederhana) dengan data barang sintetis; atau
alternatif **API laporan penjualan sintetis**. Peserta menyerahkan
repositori kode, pengujian, dan petunjuk teknis. Data nyata, nama
perusahaan nyata, dan kredensial tidak dipakai (bagian 9).

## 6. Jalur `PRS` — Personal: pembelajar mandiri dan hobi

**Tujuan:** peserta memahami cara berpikir komputasional dan menulis
program kecil untuk kebutuhan pribadi (mengatur, menghitung, membuat
halaman), tanpa tekanan karier.

**Prasyarat:** `DW-FND-M1`; tidak ada prasyarat coding.

**Durasi:** 30 jam `[asumsi]` (6 modul × 5 jam).

| Kode | Modul | Hasil belajar | Keluaran portofolio |
| --- | --- | --- | --- |
| `DW-PRS-M1` | Berpikir komputasional tanpa kode | menguraikan masalah sehari-hari menjadi urutan, kondisi, dan pengulangan | tiga masalah pribadi dalam bentuk algoritma |
| `DW-PRS-M2` | Program pertama dengan Python | variabel, masukan dan keluaran, kondisi, perulangan | kuis atau kalkulator kecil |
| `DW-PRS-M3` | Data dan berkas | daftar, kamus, membaca dan menulis berkas teks | pencatat sederhana (mis. daftar bacaan) dengan data sintetis |
| `DW-PRS-M4` | Halaman web pertama | HTML dan CSS; menerbitkan halaman statis secara lokal | halaman profil hobi sintetis |
| `DW-PRS-M5` | Mengotomasi urusan sehari-hari | skrip untuk menamai ulang berkas, menghitung anggaran, mengingatkan jadwal | satu skrip yang berguna |
| `DW-PRS-M6` | Proyek mandiri dan jalan lanjut | merancang, membangun, dan menjelaskan satu proyek; memilih jalur lanjut | proyek mandiri dan peta jalan belajar (mis. lanjut ke `PRO`) |

**Proyek berbasis data sintetis:** setiap latihan memakai data contoh yang
disediakan atau dibangkitkan; proyek mandiri boleh bertema pribadi tetapi
**tidak mengunggah data pribadi nyata** ke repositori maupun layanan daring
pada latihan (bagian 9).

**Jembatan:** dari `PRS` ke `PRO` (M2 dan M3 `PRS` setara sebagian `PRO-M2`
dan `PRO-M3`, dengan tugas dilengkapi) dan ke sma-coding jalur A atau B
bagi peserta yang ingin mendampingi anak (bagian 6.1).

### 6.1 Jembatan dari program lain

| Asal | Tujuan | Catatan `[asumsi]` |
| --- | --- | --- |
| sma-coding jalur A (C++) | `PRO` | Dasar struktur data dan algoritma dari jalur A boleh menggantikan `DW-PRO-M3` setelah uji singkat; bahasa inti `PRO` tetap Python, sehingga M2 dan M4 diulang pada Python |
| sma-coding jalur B (Bun, TypeScript, `awcms-one`) | `PRO` modul M8, M9; `BIS` modul M4 | Lulusan jalur B boleh langsung memulai M8 setelah M1 |
| sma-coding jalur D (data, AI) | `PKJ` M3-M4, M6; `PRO` M3 | Pengolahan data dan etika AI sebagian sama |
| kuliah-coding (jalur U, I, K) | `PRO` (modul `DW-PRO-M1` sampai `DW-PRO-M13`) | Pengakuan per modul atas dasar bukti yang diperiksa, dengan tiga status (lewati, padatkan, wajib); `DW-FND-M1` dan `DW-PRO-M12` tetap wajib; rincian dan batas di bagian 6.2 |
| `PRS` | `PKJ`, `PRO`, `BIS` | Setelah `PRS-M6`, peserta memilih jalur lanjut |
| `PKJ` | `PRO` | `PKJ-M3` sampai M5 menggantikan sebagian `PRO-M2` |

### 6.2 Jembatan dari kuliah-coding ke `PRO` (v1.2)

Jembatan ini berlaku bagi mahasiswa atau lulusan `kuliah-coding` yang ingin beralih karier atau menjadi pengembang lewat jalur `PRO`. Ia **bukan alih kredit SKS dan bukan sertifikat**: pengakuan hanya berarti modul `PRO` tertentu tidak diulang penuh di program ini, atas dasar bukti yang diperiksa pada saat pendaftaran dan bukan transkrip. Dasar pengakuan di perguruan tinggi (Pasal 14 ayat (3) huruf c Permendiktisaintek 39/2025) mengatur mahasiswa di perguruan tinggi, bukan masuk ke program ini; wewenang penyelenggara mengakui modul `[belum terverifikasi]`. Pemetaan SKKNI tidak berubah: tetap hanya sampai judul unit, dan melewati modul tidak berarti peserta kompeten menurut unit itu (bagian 5.2).

Tiga profil masuk (cuplikan; profil lain dinilai per modul):

| Profil | Mata kuliah yang diselesaikan | Catatan |
| --- | --- | --- |
| `I-lengkap` | Jalur I inti: `KUL-I-101` sampai `KUL-I-205`, `KUL-I-301`, `KUL-I-302`, `KUL-I-401` | Paling banyak modul yang dapat dilewati; bahasa dasar C++, bukan Python |
| `I-awal` | `KUL-I-101`, `KUL-I-102`, `KUL-I-103` (semester 1-2) | Dasar saja; mulai dari modul rekayasa dan web |
| `U-lengkap` | Jalur U: `KUL-U-101`, `KUL-U-102`, `KUL-U-201`, `KUL-U-202`, `KUL-U-301` | Python sudah dikenal; web, basis data, objek, dan tinjau kode belum |

Jalur K tidak membuka pengakuan sendiri kecuali pada `DW-PRO-M3` (algoritma dan struktur data); mahasiswa jalur K umumnya mengambil jalur I atau U lebih dulu (prasyarat `KUL-K-201`).

Status modul: **L** (lewati: bukti diperiksa singkat, perkiraan 1 jam), **P** (padatkan: konsep dikenal tetapi bahasa atau alat berbeda, perkiraan setengah jam modul), **W** (wajib: dikerjakan penuh). Semua angka jam adalah perkiraan `[asumsi]`, bukan hasil uji coba.

| Modul | Jam | Dasar di kuliah-coding | `I-lengkap` | `I-awal` | `U-lengkap` |
| --- | --- | --- | --- | --- | --- |
| `DW-PRO-M1` | 10 | `KUL-I-101` C4 dan `KUL-U-101` C4 (Git); baris perintah di `KUL-I-203` C3 | L | P | P |
| `DW-PRO-M2` | 10 | `KUL-U-101` C2 (Python); `KUL-I-101` C1 (konsep sama, C++) | P | P | L |
| `DW-PRO-M3` | 10 | `KUL-I-102`, `KUL-I-201`, `KUL-K-201`; `KUL-U-101` (list, dict, set) | L | P | P |
| `DW-PRO-M4` | 10 | `KUL-U-101` (modul, pustaka, pengujian dasar); `KUL-I-204` | P | W | P |
| `DW-PRO-M5` | 10 | `KUL-U-101` C3; `KUL-I-101` C3; `KUL-I-204` C2 | L | P | P |
| `DW-PRO-M13` | 8 | `KUL-I-204` C4, `KUL-I-401` C4, `KUL-I-301` C4; `KUL-U-202` C3 dan C5 | L | W | P |
| `DW-PRO-M6` | 10 | Tidak ada: kuliah-coding tidak memuat pemrograman berorientasi objek (celah paradigma bahasa, bagian 4.2 kuliah) | W | W | W |
| `DW-PRO-M7` | 10 | `KUL-I-202` C2 (SQL); akses dari kode tidak dinyatakan di CPMK | P | W | W |
| `DW-PRO-M8` | 10 | `KUL-I-205` C1 | L | W | W |
| `DW-PRO-M9` | 10 | `KUL-I-205` C2; `KUL-U-201` C2 (memakai API publik, bukan membuat) | L | W | P |
| `DW-PRO-M10` | 10 | `KUL-I-204` C2 dan C3; `KUL-I-401` | L | W | W |
| `DW-PRO-M11` | 10 | `KUL-I-203`, `KUL-I-302`; `KUL-U-201` C3 (penjadwalan dan log) | P | W | P |
| `DW-PRO-M12` | 10 | Tidak ada: proyek akhir dan bukti portofolio selalu dikerjakan | W | W | W |

Dampak pada jam jalur `PRO` (136 jam bila semua modul dikerjakan penuh: `DW-FND-M1` 8 jam dan 128 jam modul; diperkirakan dengan L = 1 jam dan P = setengah jam modul):

| Profil | L | P | W | Jam modul `PRO` | Jam dengan `DW-FND-M1` | Selisih terhadap 136 jam |
| --- | --- | --- | --- | --- | --- | --- |
| `I-lengkap` | 7 | 4 | 2 | 47 | 55 | 81 jam lebih sedikit |
| `I-awal` | 0 | 4 | 9 | 108 | 116 | 20 jam lebih sedikit |
| `U-lengkap` | 1 | 7 | 5 | 85 | 93 | 43 jam lebih sedikit |

Bukti dan pemeriksaan:

- Bukti tiap modul adalah keluaran portofolio kuliah (`KUL-U-301`, `KUL-I-401`, repositori dengan riwayat Git) yang dinilai dengan rubrik bagian 8.1 (ketepatan, keterbacaan, pengujian, dokumentasi, keamanan data), ditambah tugas praktik singkat tanpa AI per kelompok modul. Bukti tidak berupa nilai kuliah.
- `DW-PRO-M13` (rekayasa perangkat lunak berbantuan AI) hanya dilewati atau dipadatkan setelah **gerbang kesiapan**: peserta dapat menelusuri program pendek, menulis satu uji yang gagal bila kode salah, dan menjelaskan kode dengan kata sendiri. Gerbang ini sama dengan `kuliah-coding` bagian 6.4 dan menjadi dasar `DW-PRO-M5` sebelum `DW-PRO-M13`.
- Keadaan keahlian berlaku per topik, bukan per orang: peserta yang ahli dalam algoritma tetap pemula dalam web atau basis data, sehingga status L, P, dan W ditetapkan per modul. Keahlian yang sudah lama tidak dipakai diperiksa lewat tugas praktik, bukan lewat riwayat mata kuliah.
- `DW-FND-M1` (8 jam, keamanan, privasi, dan etika kerja) dan `DW-PRO-M12` (proyek akhir) tetap wajib bagi semua peserta (bagian 12.1); jalur U sudah punya `KUL-U-202`, tetapi kebijakan tempat kerja dan data usaha tidak ada di kuliah-coding.
- Data peserta, hasil pemeriksaan, dan status modul tidak disimpan di repositori ini (ADR-0004); peserta menyimpan daftar modul selesai sendiri (bagian 8.1).

## 7. Jalur `BIS` — Pebisnis/UMKM

**Tujuan:** pemilik atau pengelola usaha kecil memakai alat digital secara
mandiri dan aman: mencatat, membaca data penjualan, memiliki situs usaha,
memahami toko daring dan pembayaran digital, mengotomasi tugas, dan memakai
AI dengan hati-hati.

**Prasyarat:** `DW-FND-M1`; mengoperasikan ponsel dan peramban. Tidak ada
prasyarat coding.

**Durasi:** 48 jam `[asumsi]` (8 modul × 6 jam), dengan pendampingan
disarankan (riset: "Pendampingan sering kali lebih dibutuhkan daripada
sekadar pelatihan penggunaan aplikasi", `riset.md` bagian 6).

| Kode | Modul | Hasil belajar | Keluaran portofolio |
| --- | --- | --- | --- |
| `DW-BIS-M1` | Peta digital usaha | menilai proses usaha yang bisa didigitalkan; mengenali risiko | peta proses usaha sintetis |
| `DW-BIS-M2` | Pencatatan penjualan di lembar kerja | merancang tabel transaksi, rumus total dan laba kasar, validasi data | buku penjualan sintetis |
| `DW-BIS-M3` | Membaca data penjualan | ringkasan per produk dan per bulan, tabel pivot, grafik yang jujur | satu halaman ringkasan penjualan sintetis |
| `DW-BIS-M4` | Situs usaha | halaman usaha statis (no-code atau template); konsep domain dan hosting; opsi template `awcms-one` profil `landing` sebagai lanjutan | situs statis usaha sintetis |
| `DW-BIS-M5` | Toko daring dan pembayaran digital (konsep) | alur pesanan, katalog, ongkos kirim, konsep QRIS dan pembayaran; mengapa data pembayaran tidak disimpan sendiri | alur toko daring dalam diagram, tanpa transaksi nyata |
| `DW-BIS-M6` | Otomasi no-code/low-code | formulir ke lembar kerja ke pemberitahuan; kapan otomasi layak | satu alur otomatis dengan formulir sintetis |
| `DW-BIS-M7` | AI untuk usaha | draf teks promosi, ringkasan ulasan sintetis, balasan pelanggan contoh; verifikasi, hak cipta, dan privasi | contoh permintaan AI yang aman dan hasil yang diperiksa |
| `DW-BIS-M8` | Proyek akhir: rencana digital usaha | menggabungkan M1-M7 menjadi rencana dan prototipe | portofolio `BIS` (bagian 8.1) |

**Proyek berbasis data sintetis:** "Toko kue sintetis" dengan 200 transaksi
buatan; dibangkitkan dari benih acak. **Data pelanggan nyata UMKM peserta
tidak dipakai di latihan** (bagian 9). Peserta menerapkan hasil ke
usahanya sendiri **di luar** materi program, dengan keputusan dan tanggung
jawabnya sendiri.

## 8. Asesmen dan opsi sertifikasi

### 8.1 Asesmen berbasis portofolio `[asumsi]`

| Prinsip | Isi |
| --- | --- |
| Bentuk | Portofolio per jalur: keluaran tiap modul (tabel di bagian 4-7) ditambah proyek akhir |
| Rubrik | Ketepatan (berjalan benar pada data sintetis), keterbacaan, pengujian atau pemeriksaan hasil, dokumentasi, keamanan data (tanpa kredensial dan data nyata) |
| Pemeriksaan | Tinjauan sejawat dan pendamping; kasus uji otomatis untuk modul kode `PKJ`, `PRO`, `PRS` |
| Ambang | `[belum diputuskan]`; usulan: modul "selesai" bila rubrik terpenuhi, tanpa nilai angka |
| Bukti penyelesaian | Daftar modul selesai yang dicatat peserta sendiri; **repositori ini tidak menyimpan catatan peserta** |

### 8.2 Opsi sertifikasi

| Opsi | Isi | Kelebihan | Kekurangan |
| --- | --- | --- | --- |
| A. Tanpa sertifikasi | Hanya portofolio | tanpa biaya, tanpa janji berlebihan | tidak ada pengakuan resmi |
| B. Uji kompetensi LSP BNSP untuk jalur `PRO` | Peserta mendaftar sendiri ke LSP berlisensi untuk skema seperti Junior Web Programmer atau Programmer (`riset.md` bagian 3) | pengakuan nasional berbasis SKKNI | biaya, syarat peserta, dan jadwal ditentukan LSP dan `[belum terverifikasi]`; modul `PRO` tidak menjamin lulus |
| C. Penyelenggara menerbitkan keterangan selesai | Pernyataan selesai modul oleh penyelenggara | murah | bukan sertifikat kompetensi; wewenang penyelenggara `[belum terverifikasi]` |

**Rekomendasi:** A sebagai dasar, B sebagai opsi jalur `PRO` (peserta
mendaftar sendiri), dan tidak ada sertifikat resmi untuk `PKJ`, `PRS`,
`BIS`. Alasan: SKKNI hanya ada untuk pemrograman yang diverifikasi; tidak
ada standar terbuka yang diverifikasi untuk tiga jalur lain.

## 9. Privasi dan keamanan (ADR-0004)

| Aturan | Isi |
| --- | --- |
| Repositori tanpa data pembelajar | Tidak ada nama, surel, nomor telepon, NIK, perusahaan, atau catatan kemajuan peserta di repositori ini ([ADR-0004](../../architecture/adr/0004-no-learner-personal-data.md)) |
| Data latihan | Selalu sintetis dan jelas palsu; dibangkitkan dengan skrip dari benih acak yang dicatat |
| Data pelanggan UMKM | **Tidak dipakai di latihan**, tidak diunggah ke layanan AI, no-code, atau lembar kerja web, dan tidak masuk ke portofolio |
| Data kantor pekerja | Latihan `PKJ` tidak memakai berkas kerja nyata; peserta memindahkan hasil ke kantornya sendiri sesuai kebijakan kantor |
| Kredensial | Kata sandi, kunci API, dan token **tidak disimpan** di berkas kode, repositori, tangkapan layar, atau permintaan ke asisten AI; berkas `.env` tidak di-commit |
| Layanan daring | Latihan tidak mewajibkan akun layanan berbayar atau akun pribadi; layanan AI dan no-code pada modul terkait dipakai dengan data sintetis atau didemonstrasikan pendamping |
| Hukum | Perlindungan data pribadi merujuk UU No. 27 Tahun 2022 sebagaimana dicatat di ADR-0004; penafsiran hukum untuk usaha peserta di luar program ini |

### 9.1 Kebijakan penggunaan AI

Kebijakan ini khusus program `dewasa-coding` untuk peserta dewasa (keputusan
#139: kebijakan disusun per program, bukan satu kerangka lintas program).
Peserta dewasa boleh memakai asisten AI pada latihan yang menyebutnya
(`DW-PKJ-M6`, `DW-PRO-M13`, `DW-BIS-M7`) dan bertanggung jawab penuh atas
hasilnya. Dasar buktinya dirinci di
`../../riset/ai-rekayasa-perangkat-lunak.md` bagian 4 dan 5.

| Bidang | Aturan |
| --- | --- |
| Privasi data pelanggan dan data kerja | Data pelanggan, rekan, atau keuangan dan rahasia usaha **tidak dimasukkan** ke layanan AI pada latihan; latihan hanya memakai data sintetis. Di pekerjaan atau usaha sendiri peserta mengikuti kebijakan tempat kerja, atau memutuskan sendiri dengan menanggung risikonya; program ini bukan nasihat hukum (bagian 1) |
| Kredensial | Kata sandi, kunci API, dan token tidak ditempel ke permintaan AI, tidak disimpan di berkas kode, dan tidak muncul di tangkapan layar |
| Verifikasi | Keluaran AI adalah **draf**, bukan jawaban. Peserta menjalankan, menguji, dan dapat menjelaskan setiap baris yang dipakai; kode yang tidak dipahami tidak dipakai. Hasil dapat berbeda pada permintaan yang sama, sehingga alat, versi, dan perintah dicatat. Menerima keluaran tanpa menelaahnya (*vibe coding*) tidak diajarkan |
| Lisensi dan hak cipta kode hasil AI | Status hukum keluaran AI **masih berkembang dan berbeda antar negara** (laporan Kantor Hak Cipta AS 2025 bersifat hukum AS dan umum; hukum Indonesia `[belum terverifikasi]`). Yang diajarkan adalah kewajiban dasar yang tidak bergantung pada tafsir hukum: periksa lisensi paket, kode, dan data; jangan menempel kode berlisensi yang tidak dipahami; catat bila keluaran AI dipakai |
| Instruksi tersembunyi (*prompt injection*) | Dokumen, halaman, atau berkas yang diproses AI dapat memuat instruksi tersembunyi; teks dari sumber luar diperlakukan sebagai data, bukan perintah, dan keluaran AI atas teks itu diperiksa sebelum dipakai |
| Energi dan biaya komputasi | Butir singkat dengan ketidakpastian: energi per perintah kecil tetapi berbeda puluhan kali lipat antar model dan metode ukur; tidak ada angka terverifikasi per tugas pemrograman atau per sesi agen, dan agen yang membaca banyak berkas dapat jauh lebih boros daripada satu perintah `[belum terverifikasi]`. Praktik: pilih alat sesuai tugas, jalankan uji sebelum meminta ulang, dan anggap tidak memakai AI sebagai pilihan yang sah |
| Gerbang kesiapan jalur `PRO` | Pemakaian AI untuk menulis kode diajarkan **setelah** `DW-PRO-M5` (peserta sudah dapat menelusuri kode, menulis uji unit, dan menjelaskan kode), supaya peserta dapat mengawasi keluaran AI |
| Pagar belajar jalur `PRO` (anjuran, v1.2.1) | Tiga anjuran, bukan larangan, tanpa jam atau modul baru (dipakai bersama `DW-PRO-M13`). (a) Untuk materi yang sedang dipelajari, peserta dianjurkan memakai mode tutor atau petunjuk bertahap, bukan jawaban jadi. (b) Beberapa hari kemudian peserta dianjurkan melakukan satu uji ulang singkat tanpa AI. (c) Peserta dianjurkan menguji diri: "bisa menjelaskan kode ini tanpa AI?". Dasar bukti: tinjauan riset AI #151 (2026-11-20; uji acak terkendali CS1 di TUM, N=275, dan meta-analisis 23 studi) menemukan bahwa AI menaikkan skor latihan tetapi tidak menaikkan hasil belajar; lihat usulan U-18 di `../../riset/ai-rekayasa-perangkat-lunak.md`. Keputusan pemilik 2026-11-20, issue #281 |

## 10. Opsi alat, trade-off, dan rekomendasi

Fakta lisensi dan kuota diverifikasi di `riset.md` bagian 7.

### 10.1 Lembar kerja dan skrip (jalur `PKJ`, `BIS`)

| Opsi | Kelebihan | Kekurangan |
| --- | --- | --- |
| **A. Lembar kerja LibreOffice (MPL 2.0) + Python (dipilih)** | gratis; tanpa akun; offline; data tetap di perangkat; Python terpakai juga di `PRO` dan `PRS` | peserta yang kantornya memakai lembar kerja web harus memindahkan konsep |
| B. Lembar kerja web + Apps Script | sesuai kantor yang memakai layanan itu; skrip berjalan di awan | perlu akun layanan web; kuota: 6 menit per eksekusi dan 90 menit per hari untuk pemicu pada akun konsumen; data berada di layanan pihak lain, bertentangan dengan semangat ADR-0004 bila data nyata dipakai |
| C. Hanya rumus, tanpa skrip | termudah | tidak menjawab tujuan otomasi lebih jauh |

### 10.2 JavaScript/TypeScript dan template web (jalur `PRO`, `BIS`)

| Opsi | Kelebihan | Kekurangan |
| --- | --- | --- |
| **A. Bun + TypeScript pada `PRO`-M8..M9; situs statis atau no-code pada `BIS` (dipilih)** | selaras sma-coding jalur B (Bun, `awcms-one`, MIT); `BIS` tidak perlu lingkungan berat | peserta `BIS` tidak belajar kode web |
| B. `awcms-one` profil `landing` untuk semua jalur web | satu tumpukan; template nyata | beban berat (PostgreSQL, Docker; `apps/cms` hidup mungkin perlu: `[belum terverifikasi]`); terlalu berat untuk `BIS` |
| C. Node.js dan kerangka kerja lain | ekosistem besar | tidak selaras sma-coding; tambahan alat |

### 10.3 No-code/low-code (jalur `BIS`, opsional `PKJ`)

| Opsi | Kelebihan | Kekurangan |
| --- | --- | --- |
| **A. Ajarkan konsep alur (pemicu, aksi, data) dan pakai satu alat yang lisensi dan lokasi datanya sudah dicek (dipilih)** | tahan terhadap perubahan alat; menghindari promosi | peserta harus memilih alat sendiri setelah kelas |
| B. Pasang sendiri alat berlisensi "fair-code" seperti n8n | gratis untuk penggunaan internal; data di perangkat sendiri | batasan lisensi (penggunaan internal atau nonkomersial; bukan lisensi OSI); butuh pasang dan perawatan sendiri |
| C. Layanan awan no-code berbayar | mudah | harga dan kuota `[belum terverifikasi]`; data di pihak lain; biaya berulang |

### 10.4 AI untuk produktivitas

| Opsi | Kelebihan | Kekurangan |
| --- | --- | --- |
| **A. Prinsip dan latihan dengan data sintetis; layanan dipilih peserta, didemonstrasikan pendamping (dipilih)** | tidak mengikat ke satu layanan; privasi terjaga; fokus pada verifikasi | peserta mungkin memakai layanan berbeda sehingga hasil tidak seragam |
| B. Model lokal (mis. dijalankan dengan Ollama, MIT) | data di perangkat sendiri; gratis | butuh perangkat memadai (`[belum terverifikasi]`); lisensi bobot model berbeda-beda; mutu lebih rendah pada perangkat kecil |
| C. Layanan AI berbayar sebagai bagian program | mutu tinggi | biaya peserta; data keluar perangkat; harga `[belum terverifikasi]` |

## 11. Biaya bagi peserta

| Komponen | Perkiraan | Status |
| --- | --- | --- |
| Perangkat lunak inti (Python, LibreOffice, Bun, editor, Git) | Rp0 | Lisensi terverifikasi (`riset.md` bagian 7); Git tidak dicek |
| Perangkat keras | Laptop atau komputer milik sendiri | `[asumsi]` |
| Koneksi internet | Biaya paket data peserta | tidak diperkirakan |
| Layanan AI dan no-code | Rp0 pada rancangan inti (data sintetis, demonstrasi) | harga layanan berbayar `[belum terverifikasi]` |
| Uji kompetensi LSP (opsional, jalur `PRO`) | ditetapkan LSP | `[belum terverifikasi]` |
| Pendanaan pelatihan pemerintah | Kartu Prakerja dan DTS bisa menjadi peluang pendanaan peserta | status 2026 `[belum terverifikasi]` (`riset.md` bagian 4); program ini tidak menjadi mitra resmi |

## 12. Keputusan pemilik

Pada **2026-11-19** pemilik menyetujui draf silabus beserta rekomendasi
penyusun (dialog pilihan, issue #131). Untuk setiap butir di bawah, opsi
yang dipilih adalah opsi yang sebelumnya ditandai disarankan, kini ditandai
**(dipilih)**; opsi lain dicatat sebagai pertimbangan.

### 12.1 Bentuk program: satu program bersama atau empat program terpisah

**Keputusan:** opsi A, satu program `dewasa-coding` dengan empat jalur dan modul bersama `DW-FND-M1`.

| Opsi | Konsekuensi |
| --- | --- |
| **A. Satu program `dewasa-coding` dengan empat jalur dan modul bersama `DW-FND-M1` (dipilih)** | satu entri registri; modul keamanan tidak diulang; jembatan antarjalur mudah |
| B. Empat program terpisah | setiap persona mandiri; modul keamanan diulang; empat entri registri dan korpus |

### 12.2 Bentuk pelaksanaan

**Keputusan:** opsi A, mandiri bermodul dengan pendampingan opsional.

| Opsi | Konsekuensi |
| --- | --- |
| **A. Mandiri bermodul + pendampingan opsional (dipilih)** | biaya rendah; riset UMKM menekankan pendampingan, sehingga opsional kuat untuk `BIS` |
| B. Kohort terjadwal | struktur dan komunitas lebih baik; butuh penyelenggara dan jadwal |
| C. Hanya mandiri tanpa pendampingan | termurah; risiko putus belajar |

### 12.3 Bahasa inti jalur `PRO`

**Keputusan:** opsi A, Python inti dan JavaScript/TypeScript untuk web; lembar kerja LibreOffice dan Python menjadi alat inti jalur `PKJ` dan `BIS` (bagian 10.1).

| Opsi | Konsekuensi |
| --- | --- |
| **A. Python inti + JavaScript/TypeScript untuk web (dipilih)** | selaras `PKJ` dan `PRS`; web selaras sma-coding jalur B |
| B. Hanya JavaScript/TypeScript | satu bahasa; kurang cocok untuk data dan otomasi |
| C. Bahasa lain (mis. Java) | sesuai sebagian lowongan; tidak ada rujukan dalam riset; beban alat bertambah |

### 12.4 Pemetaan SKKNI dan target skema `PRO`

**Keputusan:** opsi A, skema Junior Web Programmer sebagai acuan. Pemetaan SKKNI 282/2016 hanya sampai **judul unit** (bukan elemen kompetensi dan kriteria unjuk kerja), dan judul daftar 47 unit **dicocokkan kata demi kata dengan lampiran resmi JDIH Kemnaker pada 2026-11-19** (sufiks kode tetap `[belum terverifikasi]`); verifikasi dengan LSP dilakukan sebelum menjanjikan apa pun kepada peserta.

| Opsi | Konsekuensi |
| --- | --- |
| **A. Targetkan skema Junior Web Programmer sebagai acuan; verifikasi dengan LSP sebelum rilis (dipilih)** | delapan unit semuanya ada di `PRO`; jelas dan realistis untuk pemula |
| B. Targetkan Programmer | sembilan unit; memerlukan OOP dan basis data kuat |
| C. Tidak menargetkan skema | silabus bebas; kehilangan acuan resmi |

Hal yang tetap `[belum terverifikasi]` dan dicatat apa adanya: apakah
SKKNI 282/2016 masih berlaku atau sudah digantikan; selisih sufiks kode
`009` (bagian 5.2). Hitungan cakupan di bagian 5.2 diperiksa ulang dengan
skrip pada saat encode dan cocok.

### 12.5 Sertifikasi

**Keputusan:** opsi A, tanpa sertifikasi bawaan; uji LSP bersifat opsional dan ditempuh peserta sendiri.

| Opsi | Konsekuensi |
| --- | --- |
| **A. Tanpa sertifikasi bawaan; LSP opsional untuk `PRO` sebagai jalur mandiri peserta (dipilih)** | jujur, tanpa janji |
| B. Jalin kerja sama dengan LSP | pengakuan lebih kuat; urusan hukum dan biaya `[belum terverifikasi]` |
| C. Terbitkan keterangan selesai | murah; mudah disalahartikan sebagai sertifikat kompetensi |

### 12.6 Program pelatihan pemerintah

**Keputusan:** opsi A, hanya rujukan dengan catatan cek situs resmi.

| Opsi | Konsekuensi |
| --- | --- |
| **A. Hanya rujukan di panduan peserta dengan catatan "cek situs resmi" (dipilih)** | tidak bergantung status yang tidak terverifikasi |
| B. Jadikan penyelenggara terdaftar | akses pendanaan; syarat dan status `[belum terverifikasi]` |
| C. Abaikan | tanpa risiko; kehilangan peluang peserta |

### 12.7 Jembatan dari kuliah-coding

**Status (diperbarui):** syarat penundaan keputusan sebelumnya terpenuhi: silabus `kuliah-coding` v1.1.1 disetujui dan terdaftar (2026-11-19, issue #130). Pemilik menginstruksikan agar jembatan mulai dirancang (2026-11-19) dan menyetujui seluruh rekomendasi rancangan (K5, K6 dan K7; issue #177). Jembatan ada di bagian 6.1 (baris kuliah-coding) dan 6.2.

**Keputusan pemilik 2026-11-19 (dialog pilihan, issue #177, K5 dan K6):** opsi A: pengakuan per modul `PRO` dengan tiga status (lewati, padatkan, wajib) atas dasar bukti yang diperiksa; `DW-FND-M1` dan `DW-PRO-M12` tetap wajib bagi semua peserta.

| Opsi | Konsekuensi |
| --- | --- |
| **A. Pengakuan per modul `PRO` dengan status lewati, padatkan, wajib; `DW-FND-M1` dan `DW-PRO-M12` tetap wajib (dipilih)** | jam jalur `PRO` turun sesuai profil (perkiraan 81, 43, dan 20 jam dari 136 pada tiga profil bagian 6.2); butuh pemeriksaan bukti per modul; wewenang penyelenggara mengakui modul `[belum terverifikasi]` |
| B. Jalur khusus lulusan kuliah (modul `PRO` lanjutan yang baru) | isi lebih sesuai lulusan; modul baru, jam baru, dan korpus yang lebih besar; melanggar bentuk satu program (12.1) bila terpisah |
| C. Hanya rekomendasi urutan tanpa pengurangan jam | tanpa risiko pengakuan; lulusan kuliah mengulang bahan yang sudah dikuasai (efek keahlian terbalik) |

### 12.8 Pengerjaan lanjutan

**Keputusan:** skema khusus per program (ADR-0008): skema `src/schema/dw-*.ts` (berjam, bukan mingguan), `data/dewasa-coding/` (tujuh berkas), entri registri, dan pemeriksa fidelity sudah ada. Yang tersisa, mengikuti urutan AGENTS.md (skema, data, domain, uji): (1) jembatan kuliah-coding (12.7): **selesai di v1.2.0 (#177, keputusan pemilik K7 opsi 1)**: skema `src/schema/dw-kuliah-bridge.ts`, berkas `data/dewasa-coding/kuliah-bridge.json`, audit di `src/domain/dw-corpus-audit.ts`, pemeriksa fidelity, dan pemeriksaan silang kode `KUL-` terhadap korpus `kuliah-coding` (ADR-0010); (2) modul `content/dewasa-coding/`, jalur `PKJ` dan `BIS` dikerjakan lebih dulu karena paling sedikit bergantung pada SKKNI dan alat berat, jalur `PRO` setelahnya.

### 12.9 Revisi v1.1.0: rekayasa perangkat lunak berbantuan AI (#139)

**Keputusan pemilik 2026-11-19** (dialog pilihan, issue #139): usulan
U-13 sampai U-16 dari `../../riset/ai-rekayasa-perangkat-lunak.md` bagian 7
diterapkan dengan opsi rekomendasi; kebijakan AI disusun per program;
energi dan biaya komputasi sebagai butir singkat dengan ketidakpastian;
istilah *vibe coding* dan *AI-native engineer* hanya dalam glosarium (3.2).

| Usulan | Keputusan | Wujud di silabus |
| --- | --- | --- |
| U-13 | Opsi A: tambahan butir di `DW-FND-M1`, tanpa jam baru | Hasil belajar (e)-(g), topik, dan latihan `DW-FND-M1` (bagian 3.1); jam tetap 8 |
| U-14 | Opsi A: tambahan butir di `DW-PKJ-M6` | Hasil belajar dan keluaran portofolio `DW-PKJ-M6` (bagian 4); jam tetap 5 |
| U-15 | Opsi B: modul baru setelah `DW-PRO-M5` | `DW-PRO-M13`, 8 jam `[asumsi]` (bagian 5.1); jalur `PRO` 120 menjadi 128 jam, total dengan `DW-FND-M1` 128 menjadi 136; prasyarat `DW-PRO-M5`, dan `DW-PRO-M6` kini bergantung pada `DW-PRO-M13`; pemetaan SKKNI hanya ke judul lima unit yang relevan dan sudah disentuh modul lain (`009`, `019`, `032`, `033`, `036`) |
| U-16 | Opsi A: tanpa perubahan pada `DW-BIS-M7` dan jalur `PRS` | Tidak ada |

Delapan jam untuk `DW-PRO-M13` adalah perkiraan penyusun `[asumsi]`
(sedikit di bawah 10 jam modul lain karena modul ini membangun di atas M5,
M10, dan M12), bukan angka dari sumber. Kebijakan penggunaan AI: bagian 9.1.

## 13. Sumber dan batasan

- Sumber dibuka dan terverifikasi: `riset.md` bagian 9.
- Yang tidak terverifikasi: SKKNI lain, status Kartu Prakerja 2026, isi
  DTS, dokumen resmi Peta Jalan Literasi Digital, data resmi UMKM, harga
  layanan AI dan no-code (`riset.md` bagian 1).
- Jam, urutan modul, dan beban belajar semuanya `[asumsi]`.
- Pemetaan SKKNI hanya ke judul unit.
- Kebutuhan UMKM bersumber berita dan opini, bobot bukti rendah.
- Data peserta tidak disimpan di repositori; semua contoh sintetis.

## Changelog

| Versi | Tanggal | Perubahan |
| --- | --- | --- |
| v0.1.0 | 2026-11-19 | Draf awal (#131). |
| v1.0.0 | 2026-11-19 | Disetujui pemilik beserta rekomendasi (dialog pilihan 2026-11-19): status DISETUJUI; bagian 12 diubah dari pertanyaan terbuka menjadi keputusan (opsi rekomendasi); rencana modul, jam, dan pemetaan tidak diubah (#131). |
| v1.1.0 | 2026-11-19 | Revisi minor yang disetujui pemilik lewat keputusan #139: modul baru `DW-PRO-M13` rekayasa perangkat lunak berbantuan AI (8 jam; jalur `PRO` 120 menjadi 128 jam, total 128 menjadi 136; tabel 5.1 mendapat kolom jam dan urutan belajar; `DW-PRO-M6` bergantung pada `DW-PRO-M13`); butir tambahan di `DW-FND-M1` (hak cipta dan lisensi keluaran AI, kebijakan tempat kerja, *prompt injection*, energi dan biaya komputasi) dan `DW-PKJ-M6` (catat alat, versi, perintah; hasil tidak identik; uji data sintetis); glosarium istilah AI (3.2); kebijakan penggunaan AI (9.1); keputusan 12.9. Hitungan 34 unit SKKNI yang disentuh tidak berubah (#139). |
| v1.1.1 | 2026-11-19 | Revisi patch: kalimat status, keputusan pemilik #165; isi kurikulum tidak berubah. |
| v1.1.2 | 2026-11-19 | Revisi patch: status verifikasi sumber (SK 046, SKKNI 282/2016); koreksi judul unit 47 sesuai lampiran resmi; isi kurikulum lain tidak berubah. |
| v1.2.0 | 2026-11-19 | Revisi minor yang disetujui pemilik lewat keputusan #177: jembatan kuliah-coding ke jalur `PRO` (bagian 6.1 baris kuliah-coding, subbagian 6.2 baru: tiga profil masuk, status lewati, padatkan, wajib per modul `PRO`, dampak jam, bukti dan pemeriksaan; `DW-FND-M1` dan `DW-PRO-M12` wajib bagi semua); keputusan 12.7 diganti (opsi A dipilih) dan 12.8 diperbarui. Modul, jam, dan pemetaan SKKNI tidak berubah; jalur `PRO` tetap 136 jam secara nominal (#177). |
| v1.2.1 | 2026-11-20 | Revisi patch atas keputusan pemilik 2026-11-20 (dialog pilihan baku, opsi "Tambahkan sebagai anjuran"), issue #281: baris "Pagar belajar jalur `PRO` (anjuran)" di bagian 9.1 (mode tutor atau petunjuk bertahap, uji ulang singkat tanpa AI, cek diri "bisa menjelaskan kode ini tanpa AI?"; dasar tinjauan riset AI #151, usulan U-18). Anjuran, bukan larangan; modul, jam, dan pemetaan SKKNI tidak berubah. |
