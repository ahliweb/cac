# Tinjauan Ilmiah Modul Draf `fondasi-*` dan `matkom-*` (sma-coding)

- **Version:** v0.2.0
- **Last updated:** 2026-11-19
- **Status:** DRAF. Ini laporan tinjauan untuk membantu pemilik; **bukan persetujuan**. Seluruh 13 modul tetap berstatus `draf` di `data/sma-coding/modules.json` dan tidak memiliki blok `review` atau `approvedOn` (ADR-0007). Persetujuan hanya oleh pemilik.
- **Changeset:** v0.2.0: kolom "status setelah revisi" dan bagian 7 (isi revisi modul) ditambahkan setelah revisi 13 modul (issue #125). v0.1.0: laporan awal sebelum revisi (keadaan pada `main` 8cdd753); bagian 2 dan 3 tetap menggambarkan keadaan sebelum revisi.

## 1. Cakupan dan metode

Cakupan: 6 modul `fondasi-*` dan 7 modul `matkom-*` di `content/sma-coding/modules/`, beserta entrinya di `data/sma-coding/modules.json`. Modul `cloud-*` dan `pendamping-*` bukan bagian laporan ini.

Metode, ringkas:

1. **Ketepatan teknis.** Tiap pernyataan dibaca, termasuk batas kasus. Setiap angka pada contoh dan kunci dihitung ulang: manual, lalu dengan skrip pemeriksa (konversi basis, ASCII dan UTF-8, ukuran gambar dan suara, jumlah panggilan rekursif, 26^n, rata-rata dan jumlah lembar kerja).
2. **Kode.** Semua blok C++ diekstrak dan dikompilasi serta dijalankan dengan `g++ -std=c++17 -Wall -Wextra`; semua blok TypeScript dijalankan dengan `bun run`. Keluaran dicocokkan dengan komentar di modul. Modul `fondasi-*` tidak memuat C++ atau TypeScript, hanya blok `sh` (lihat tabel).
3. **Kunci latihan.** Tiap kunci dikerjakan ulang tanpa melihat jawaban modul.
4. **Rujukan.** URL dibuka dengan `curl` ber-User-Agent `curriculum-reference-check/1.0`. Kutipan CP di modul dicocokkan dengan `data/sma-coding/cp-elements.json`.
5. **Kesesuaian silabus.** `cpItems` dan `weekCodes` dicocokkan dengan `data/sma-coding/foundation.json` dan `weeks.json`, isi minggunya (topik, tujuan, keluaran, kegiatan), dan silabus v1.3 (termasuk bagian 7.4 untuk butir AI `FND-X1-M6`), serta dengan `rancangan-seri-matematika-komputasi.md`.
6. **Privasi dan bahasa.** Nama, alamat, dan kata sandi pada contoh diperiksa (semua fiktif); bahasa dinilai untuk siswa SMA.
7. **Dasar ilmiah.** Tiap modul dinilai terhadap `docs/riset/ilmu-belajar-kognitif.md`, bagian 3 (retrieval 3.1, jarak 3.2, interleaving 3.3, contoh terselesaikan 3.4, penjelasan diri 3.6, umpan balik 3.8), bagian 5 (mitos), bagian 6 (tracing 6.2, PRIMM dan Parsons 6.3), dan bagian 8.2 (rekomendasi `sma-coding`).

Label kekuatan bukti mengikuti riset (bagian 8): **K** = bukti kuat untuk prinsipnya (`[A]` atau `[B]`); **M** = masuk akal tetapi bukti terbatas untuk pemrograman atau untuk usia itu (`[inferensi]`).

Batas tinjauan, dinyatakan terbuka:

- **Rujukan utama tidak bisa dibuka dari lingkungan peninjau.** `https://repositori.kemendikdasmen.go.id/...` (Panduan Mata Pelajaran Informatika, Fase D-F, 2025) menghasilkan *connection timed out* lewat `curl` dan *ECONNREFUSED* lewat pengambil halaman lain (host `repositori.kemendikdasmen.go.id`, alamat 202.10.51.148), sedangkan situs lain dari lingkungan yang sama terbuka. Isi dokumen itu **tidak** dibaca; kecocokan kutipan CP hanya dengan korpus `cp-elements.json` yang ditranskripsi darinya. Pemilik perlu membukanya sendiri.
- Perintah `ping` pada modul jaringan tidak bisa dijalankan di lingkungan peninjau (tanpa izin *raw socket*); bentuk keluarannya dinilai dari format baku `ping` Linux, bukan dijalankan. `nslookup` dijalankan.
- Tidak ada uji di kelas; tidak ada uji keterbacaan dengan siswa.

## 2. Ringkasan per modul

Kode: "lulus" berarti dikompilasi, dijalankan, dan keluarannya sama dengan klaim modul. Unsur ilmiah: R = latihan mengingat kembali (retrieval) berjarak, P = prediksi sebelum contoh atau kode, T = tracing atau mesin konseptual, W = contoh terselesaikan lalu soal sendiri, S = soal Parsons atau setengah jadi, I = latihan bercampur di akhir, U = umpan balik dengan langkah berikutnya, E = penjelasan diri. Pada keadaan `main` 8cdd753, **tidak satu pun** dari R, P, S, I, E ada secara eksplisit di 13 modul; W ada (semua modul memberi contoh dikerjakan, tetapi tanpa pemudaran ke soal setengah jadi); T ada di `fondasi-komputer-dan-hardware` (jejak program kartu), `matkom-induksi-dan-rekursi-matematis`, dan `matkom-pertumbuhan-fungsi` (menelusuri langkah); U hanya berupa kunci jawaban tanpa langkah berikutnya bila salah.

| Id | Ketepatan | Kode (dijalankan) | Kunci latihan | Rujukan | Kesesuaian silabus | Unsur ilmiah | Rekomendasi status untuk pemilik | Status setelah revisi (rekomendasi, bukan persetujuan) |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `fondasi-komputer-dan-hardware` | satu kekeliruan gambar (diagram I-P-O), satu ketidakcocokan model (kartu di meja vs instruksi di memori), selebihnya benar | tidak ada kode; jejak kartu dihitung ulang: benar | semua benar (L1 18, L2 9, L3 4) | Panduan 2025: tidak terbuka dari sini; kutipan CP cocok | cocok (`E-BK-e`, `FND-X1-M1`); kegiatan dan keluaran minggu tercakup | T, W ada; R, P, S, I, E, U kurang | **perlu revisi** (ringan): perbaiki diagram, tandai model, tambah unsur ilmiah | **siap disetujui**: diagram dan catatan model diperbaiki; R, P, S, I, E, U ditambahkan |
| `fondasi-software-dan-sistem-operasi` | benar dengan catatan: "bersamaan" pada CPU multi-inti, aturan nama berkas tidak konsisten dengan contoh, satu butir latihan ambigu | tidak ada kode (blok `sh` hanya baca) | satu kunci ambigu (pemindai virus), selebihnya benar | Panduan 2025: tidak terbuka; tidak ada rujukan lisensi | cocok (`E-BK-e`, `E-LD-g`, `FND-X1-M2`) | W ada; R, P, S, I, E, U kurang | **perlu revisi** (ringan) | **siap disetujui**: butir ambigu diganti, aturan nama diselaraskan; unsur ilmiah ditambahkan |
| `fondasi-representasi-data` | semua angka benar (dihitung ulang); satu penyederhanaan KB/KiB, satu awalan `#` kurang tepat | tidak ada kode | semua benar | Panduan 2025: tidak terbuka | cocok (`FND-X1-M3`; `cpItems` kosong sesuai teks "tidak dihitung") | W ada; R, P, S, I, E, U kurang | **perlu revisi** (ringan; hanya unsur ilmiah dan satu catatan satuan) | **siap disetujui**: catatan KiB dan awalan `#`; unsur ilmiah ditambahkan |
| `fondasi-jaringan-dan-internet` | **satu kesalahan nyata**: `nslookup contoh.example` selalu gagal (NXDOMAIN, diverifikasi); ikon gembok sudah usang | blok `sh`: `nslookup` dijalankan (NXDOMAIN untuk `.example`, alamat untuk `example.com`); `ping` tidak dapat dijalankan | semua benar | Panduan 2025: tidak terbuka; RFC 5737 dan RFC 2606 menopang rentang `192.0.2.x` dan `.example` (terbuka, belum dirujuk) | cocok (`E-LD-e`, `FND-X1-M4` dan `M5`); langkah gateway disisipkan di antara IP dan DNS (tambahan wajar) | W ada; R, P, S (Latihan 2 mendekati), I, E kurang | **perlu revisi**: perbaiki perintah, tambah unsur ilmiah | **siap disetujui**: `nslookup example.com` dan penjelasan `.example`; rujukan RFC ditambahkan; `ping` tetap perlu diuji di lab (bagian 5, butir 8) |
| `fondasi-keamanan-dasar` | angka benar (26^6, 26^8, 26^12, 209 detik, 3 tahun); klaim "lebih tahan penipuan" terlalu halus; "gembok" usang; WPA tidak disebut | tidak ada kode | semua benar | Panduan 2025: tidak terbuka; NIST SP 800-63B menopang prinsip panjang dan menolak aturan komposisi (terbuka, belum dirujuk) | **kurang**: butir AI v1.3 di `FND-X1-M6` (kebijakan AI kelas, kartu kebijakan AI, menyunting permintaan sintetis) **tidak ada** di modul; `cpItems` lain cocok | W ada; R, P, S, I, E, U kurang | **perlu revisi** (terbesar di antara `fondasi-*`): selaraskan dengan silabus v1.3 bagian 7.4 | **siap disetujui** dengan syarat keputusan butir 4 pada bagian 5: bagian kebijakan AI kelas, kegiatan 6, dan kartu kebijakan AI ditambahkan sesuai silabus 7.4 |
| `fondasi-perangkat-produktivitas` | klaim nama fungsi bahasa Indonesia (`JUMLAH`, `RATA2`, `JIKA`) tidak terverifikasi dan kemungkinan salah; angka lembar kerja benar | tidak ada kode; rumus dihitung ulang: benar | Latihan 3 meminta `COUNTIF` yang belum diajarkan; kunci benar | Panduan 2025: tidak terbuka; WCAG 4,5:1 disebut tanpa rujukan (terbuka) | cocok (`E-LD-d`, `FND-X1-M7`); klaim asesmen minggu 14 cocok dengan silabus 7.1 | W ada; R, P, S, I, E, U kurang | **perlu revisi** (ringan sampai sedang) | **siap disetujui**: klaim nama fungsi dihapus, `COUNTIF` diajarkan, rujukan WCAG ditambahkan |
| `matkom-sistem-bilangan-basis` | semua benar (dihitung ulang) | lulus (C++ dan TypeScript, keluaran sama dengan komentar) | semua benar | hanya Panduan 2025 (tidak terbuka; tidak menopang isi matematika) | cocok dengan rancangan seri (`FND-X1-M3`, `A-X1-M9`, `B-X1-M9`) | T, W ada; R, P, S, I, E, U kurang | **perlu revisi** (hanya unsur ilmiah) | **siap disetujui**: unsur ilmiah ditambahkan; rujukan tambahan tetap keputusan pemilik (butir 2) |
| `matkom-bilangan-bertanda-dan-luapan` | benar; satu catatan: Latihan 4 menggambarkan pola 8 bit sedangkan di C++ aritmetika `int` luapan adalah perilaku tak terdefinisi | lulus (UB pada Latihan 7 dikonfirmasi dengan `-fsanitize=undefined`) | semua benar | hanya Panduan 2025; klaim UB dan `MAX_SAFE_INTEGER` tersedia di rujukan terbuka (belum dirujuk) | cocok (`A-X1-M9`, `A-X2-M4`, `B-X1-M9`) | T, W ada; R, P, S, I, E, U kurang | **perlu revisi** (unsur ilmiah, satu catatan) | **siap disetujui**: catatan Latihan 4 dan rujukan ditambahkan; unsur ilmiah ditambahkan |
| `matkom-teks-gambar-suara` | benar; tiga catatan kecil (emoji `❤` sering disertai U+FE0F, RLE rancu bila ada angka, MiB vs KB) | lulus | semua benar | hanya Panduan 2025; RFC 3629 menopang tabel UTF-8 (terbuka, belum dirujuk) | cocok (`A-X2-M2`, `A-X2-M3`, `B-X2-M2`, `B-X2-M5`; `cpItems` kosong) | W ada; R, P, S, I, E, U kurang | **perlu revisi** (unsur ilmiah, catatan kecil) | **siap disetujui**: tiga catatan ditambahkan, RFC 3629 dirujuk; unsur ilmiah ditambahkan |
| `matkom-logika-proposisi` | benar; contoh C++ "memeriksa" ekuivalensi hampa (kontrapositif ditulis sama dengan implikasi; kompilator memberi peringatan *tautological-compare*) | lulus (dengan peringatan `-Wall` pada blok C++ pertama dan pada kode salah-sengaja Latihan 7) | semua benar | hanya Panduan 2025 | `cpItems` `E-BK-d` (pseudocode) **tidak didukung isi**: modul tidak memuat pseudocode; minggu cocok | T, W ada; R, P, S, I, E, U kurang | **perlu revisi** | **siap disetujui**: bagian pseudocode dan latihan penerjemahan ditambahkan, kode C++ diganti dan keluarannya `111` tanpa peringatan |
| `matkom-himpunan-relasi-fungsi` | semua benar | lulus (keluaran `7 = 5 + 4 - 2`, `010`, `001`) | semua benar | hanya Panduan 2025 | minggu cocok; `cpItems` `F-BK-c`, `F-AP-d` (pemilihan struktur data) hanya tipis didukung isi (modul bersifat matematis, bukan pemilihan struktur data) | W ada; R, P, S, I, E, U kurang | **perlu revisi** (unsur ilmiah; satu catatan keputusan) | **siap disetujui** dengan catatan keputusan butir 3 (pemetaan `F-BK-c`, `F-AP-d`): unsur ilmiah ditambahkan |
| `matkom-induksi-dan-rekursi-matematis` | semua benar (termasuk C(20) = 21.891, 12,1 hari, n² + n + 41) | lulus | semua benar | hanya Panduan 2025 | cocok dengan rancangan (`F-AP-a`, `F-BK-b`) | T, W ada (Contoh 1-3 dan bukti fungsi); R, P, S, I, E, U kurang | **perlu revisi** (hanya unsur ilmiah) | **siap disetujui**: unsur ilmiah ditambahkan (termasuk Parsons untuk bukti induksi) |
| `matkom-pertumbuhan-fungsi` | benar; klaim prasyarat salah: logaritma tidak dibahas di modul basis | lulus (`1000000 20`, `4950`; TypeScript cocok) | semua benar | hanya Panduan 2025 | minggu cocok; `F-BK-b` cocok | T, W ada; R, P, S, I, E, U kurang | **perlu revisi** (satu klaim prasyarat, unsur ilmiah) | **siap disetujui**: klaim prasyarat dikoreksi; unsur ilmiah ditambahkan |

Kolom-kolom sebelum "Status setelah revisi" menggambarkan keadaan **sebelum** revisi (`main` 8cdd753). Kolom terakhir adalah rekomendasi setelah revisi pada commit berikutnya, dengan arti: tidak ada kesalahan faktual, kode, kunci, atau rujukan yang diketahui, dan unsur ilmiah minimal ada. Revisi itu belum ditinjau ulang oleh pihak lain; pemilik sebaiknya membaca bagian-bagian baru ("Ingat kembali", "Prediksi dulu", soal Parsons dan setengah jadi, "Latihan bercampur dan ulang berjarak"). Rujukan Panduan 2025 yang tidak terbuka dan keputusan di bagian 5 tetap berlaku untuk semua modul.

Ringkasan: **tidak ada modul yang direkomendasikan `tarik`**: semua isi inti benar, dan kesalahan faktual yang ditemukan sedikit dan dapat diperbaiki. Pada keadaan `main` 8cdd753 tidak ada yang `siap disetujui`, karena (a) unsur ilmiah wajib dari riset 8.2 belum ada di satu pun modul, (b) kesalahan nyata pada `fondasi-jaringan-dan-internet`, (c) butir AI v1.3 belum tercakup di `fondasi-keamanan-dasar`, dan (d) klaim dan catatan kecil di modul lain.

## 3. Temuan rinci per modul

Nomor baris mengacu pada berkas di `main` 8cdd753, sebelum revisi. Tingkat: **tinggi** (salah atau menyesatkan), **sedang** (tidak selaras atau kurang), **rendah** (halus).

### 3.1 `fondasi-komputer-dan-hardware`

| Lokasi | Tingkat | Masalah | Perbaikan |
| --- | --- | --- | --- |
| L55-57 (diagram) | sedang | Panah `Memori --> Keluaran` menyiratkan memori mengirim langsung ke keluaran, padahal pada model I-P-O keluaran lewat CPU. | Gambar ulang: masukan dan keluaran terhubung ke CPU. |
| L53 vs L70-122 | sedang | Teks menyatakan program disimpan di memori, tetapi simulasi menaruh kartu di meja, bukan di sel memori. Ini ketidakcocokan *notional machine* tanpa penanda (riset 6.2, K). | Tambah catatan bahwa kartu di meja hanya penyederhanaan simulasi. |
| L38, L59-66 | rendah | "Menjalankan instruksi satu per satu" mengabaikan CPU multi-inti. | Tandai sebagai model sederhana; sebut istilah *notional machine*. |
| L49 | rendah | 1 KB = 1024 byte tanpa menyebut KiB atau arti SI. | Rujuk silang ke modul representasi data. |
| seluruh modul | sedang | Unsur ilmiah kurang: tidak ada retrieval, prediksi sebelum jejak (PRIMM, 8.2), Parsons, latihan bercampur. | Lihat bagian 4. |

### 3.2 `fondasi-software-dan-sistem-operasi`

| Lokasi | Tingkat | Masalah | Perbaikan |
| --- | --- | --- | --- |
| L39 | rendah | "Terlihat seperti berjalan bersamaan" tepat hanya untuk satu inti. | Tambah catatan multi-inti. |
| L80-82 dan L69-76 | rendah | Aturan "pakai huruf kecil dan tanda hubung", tetapi pohon contoh dan pola `Murid-01_topik_tanggal` memakai huruf besar dan garis bawah. | Selaraskan aturan dengan contoh. |
| L148 dan kunci L191 | sedang | Butir "utilitas pemindai virus" ambigu antara sistem dan aplikasi, tetapi kunci memberi satu jawaban. | Ganti butir, tambah satu butir sengaja kabur beserta alasan. |
| L110 | rendah | "Domain publik ... tetap baik menyebut sumber": status hukum atribusi pada karya domain publik dan hak moral pencipta menurut hukum Indonesia tidak diperiksa. `[belum terverifikasi]` | Dibiarkan; keputusan pemilik (bagian 5). |
| seluruh modul | sedang | Unsur ilmiah kurang. | Bagian 4. |

### 3.3 `fondasi-representasi-data`

| Lokasi | Tingkat | Masalah | Perbaikan |
| --- | --- | --- | --- |
| seluruh angka L50-253 | - | Semua konversi, kode ASCII, gambar 8x8, `#4682B4`, ukuran gambar 30.000 byte (29,3 KB) benar. | - |
| L26-29 | rendah | KB = 1024 dan catatan 1000 tanpa menyebut KiB. | Tambah KiB dan MiB. |
| L105 | rendah | `#CA` disebut penanda heksadesimal; awalan `#` baku untuk kode warna, bukan untuk bilangan umum. | Pisahkan `0x` dan `#`. |
| seluruh modul | sedang | Unsur ilmiah kurang; latihan konversi mengulang satu pola tanpa soal Parsons atau campuran. | Bagian 4. |

### 3.4 `fondasi-jaringan-dan-internet`

| Lokasi | Tingkat | Masalah | Perbaikan |
| --- | --- | --- | --- |
| L153 | **tinggi** | `nslookup contoh.example` diajukan sebagai uji, tetapi `.example` sengaja tidak didelegasikan (RFC 2606): perintah itu **selalu gagal** (NXDOMAIN, diverifikasi di lingkungan peninjau). Siswa bisa menyimpulkan DNS lab rusak. Sementara `nslookup example.com` mengembalikan alamat. | Pakai `example.com` untuk uji, dan jelaskan mengapa `.example` selalu gagal. |
| L56 | rendah | "Peramban menandai HTTPS dengan gembok": ikon berbeda antarperamban dan antarversi. | Ganti dengan alamat berawalan `https://`. |
| L127-138 | rendah | Keluaran `ping` pada Linux ditampilkan sebagai contoh; tidak dapat dijalankan di lingkungan peninjau. Bentuknya sesuai format baku. | Dibiarkan; pemilik atau guru perlu menjalankannya di lab. |
| L111-119 | rendah | Urutan diagnosis memuat tahap gateway di antara IP dan DNS, sedangkan tujuan silabus menyebut fisik, IP, DNS, layanan. Tambahan masuk akal. | Dibiarkan. |
| seluruh modul | sedang | Unsur ilmiah kurang. Latihan 2 (urutan langkah) sudah mendekati soal Parsons tetapi tidak diberi nama atau jembatan. | Bagian 4. |

### 3.5 `fondasi-keamanan-dasar`

| Lokasi | Tingkat | Masalah | Perbaikan |
| --- | --- | --- | --- |
| L5-14 dan seluruh modul | **tinggi** (kesesuaian silabus) | Tujuan minggu `FND-X1-M6` pada silabus v1.3 mencakup "menerapkan kebijakan pemakaian AI kelas" (tanpa data pribadi, kata sandi, atau kunci; mencatat pemakaian AI; sadar lisensi keluaran AI masih berkembang), keluaran "kartu kebijakan AI kelas", dan kegiatan "menyunting contoh permintaan sintetis ke asisten AI". Modul **tidak memuat satu kata pun tentang AI**. Aturan 7.4 tentang privasi menyebut `FND-X1-M6` sebagai tempat pelatihan. | Tambah bagian ringkas yang menyalin aturan 7.4 (privasi, keterbukaan, kejujuran, lisensi, verifikasi, izin), kegiatan penyuntingan permintaan sintetis, dan kartu kebijakan AI kelas. Tandai butir ini bukan butir CP dan sebut bahwa syarat usia dan ketentuan layanan `[belum terverifikasi]` mengikuti silabus. |
| L78 | rendah | "Aplikasi pembangkit kode atau kunci keamanan umumnya lebih tahan penipuan" menggabungkan dua hal berbeda; kode aplikasi tetap bisa diminta penipu. | Bedakan SMS, aplikasi, kunci keamanan, dan tandai batasnya. |
| L99 | rendah | "Jaringan nirkabel terenkripsi" tanpa menyebut WPA2 atau WPA3. | Sebut keduanya. |
| L101 | rendah | "Tanda HTTPS (gembok)" usang. | Ganti dengan alamat `https://`. |
| L31 | rendah | Prinsip "panjang lebih penting daripada trik huruf" tanpa rujukan. NIST SP 800-63B (terbuka dari sini) menopangnya (panjang minimum; larangan aturan komposisi). | Tambah rujukan. |
| L36-44 | - | 26^8 = 208.827.064.576 (209 detik pada satu miliar tebakan per detik), 26^12 sekitar 9,5 x 10^16 (sekitar 3 tahun), 26^6 = 308.915.776, rasio 676: semuanya benar. | - |
| seluruh modul | sedang | Unsur ilmiah kurang. | Bagian 4. |

### 3.6 `fondasi-perangkat-produktivitas`

| Lokasi | Tingkat | Masalah | Perbaikan |
| --- | --- | --- | --- |
| L68 | sedang | "Padanan dalam bahasa Indonesia biasanya `JUMLAH`, `RATA2`, `MIN`, `MAKS`, `JIKA`": tidak dapat diverifikasi dan kemungkinan salah (dugaan peninjau: perangkat lembar kerja berantarmuka Indonesia tetap memakai nama bahasa Inggris; tidak diuji pada perangkat nyata). Siswa bisa gagal mengetik rumus. `[belum terverifikasi]` | Ganti dengan kalimat umum: nama dan pemisah bisa berbeda; cari padanannya di bantuan perangkat. |
| L131 | sedang | Latihan 3 meminta "banyak murid dengan nilai minimal 75" yang butuh `COUNTIF`, tetapi bagian isi hanya mengajarkan `IF`. Kunci benar (3). | Ajarkan `COUNTIF` di bagian rumus. |
| L91 | rendah | "Rasio kontras minimal 4,5 banding 1" tanpa rujukan. WCAG 2.2 kriteria 1.4.3 menyebut 4.5:1 (diverifikasi). | Tambah rujukan. |
| L194 | - | Klaim asesmen formatif dilebur ke minggu 14 cocok dengan silabus 7.1. | - |
| seluruh modul | sedang | Unsur ilmiah kurang. | Bagian 4. |

### 3.7 `matkom-sistem-bilangan-basis`

Semua klaim, tabel, hasil bagi berulang, konversi oktal dan heksadesimal, aritmetika biner, pecahan biner, latihan 1-7, dan keluaran program C++ dan TypeScript benar.

| Lokasi | Tingkat | Masalah | Perbaikan |
| --- | --- | --- | --- |
| seluruh modul | sedang | Unsur ilmiah kurang: tidak ada retrieval dari modul fondasi, tidak ada prediksi sebelum kode, tidak ada Parsons atau soal setengah jadi, tidak ada latihan bercampur. | Bagian 4. |
| entri indeks | rendah | Hanya satu rujukan (Panduan 2025) yang tidak menopang isi matematika. Tidak ada rujukan terverifikasi untuk konversi basis yang dapat saya tambahkan. | Dilaporkan sebagai keputusan pemilik (bagian 5). |

### 3.8 `matkom-bilangan-bertanda-dan-luapan`

| Lokasi | Tingkat | Masalah | Perbaikan |
| --- | --- | --- | --- |
| L185 (Latihan 4) | rendah | "Pada 8 bit bertanda, 127 + 1 menjadi -128" menggambarkan pola bit, tetapi di C++ hitungan `int8_t` dipromosikan ke `int`, dan luapan `int` adalah perilaku tak terdefinisi; modul sendiri menegaskan ini di bagian lain. | Tambah catatan agar tidak bertabrakan. |
| L82-83 | rendah | Klaim UB dan `MAX_SAFE_INTEGER` tanpa rujukan; cppreference dan MDN menopang (terbuka, diverifikasi). | Tambah rujukan. |
| L195-224 (Latihan 7) | - | Diverifikasi dengan `-fsanitize=undefined`: "signed integer overflow". Keluaran program bergantung kompilator; kunci menyatakan ini dengan benar. | - |
| seluruh modul | sedang | Unsur ilmiah kurang. | Bagian 4. |

### 3.9 `matkom-teks-gambar-suara`

| Lokasi | Tingkat | Masalah | Perbaikan |
| --- | --- | --- | --- |
| L233 (Latihan 3) | rendah | `❤` sering diketik sebagai `❤` + U+FE0F, menambah tiga byte. | Tambah catatan. |
| L116-120 | rendah | RLE `4A3B2C1D` rancu bila data berisi angka. | Tambah catatan. |
| L110 | rendah | MiB di sini, KB = 1024 di modul fondasi. | Tambah catatan kesamaan. |
| L55-66 | - | Tabel UTF-8 benar menurut RFC 3629 (diverifikasi: pola `1110xxxx 10xxxxxx 10xxxxxx`); contoh `é` C3 A9, `€` E2 82 AC, emoji F0 9F 98 80, `ñ` C3 B1 benar. | Tambah rujukan RFC 3629. |
| seluruh modul | sedang | Unsur ilmiah kurang. | Bagian 4. |

### 3.10 `matkom-logika-proposisi`

| Lokasi | Tingkat | Masalah | Perbaikan |
| --- | --- | --- | --- |
| L3 dan indeks `cpItems` `E-BK-d` | sedang | Modul mengaku mendukung "solusi program sederhana dalam format pseudocode", tetapi tidak memuat pseudocode. Klaim hampa. | Tambah bagian pseudocode kondisi dan latihan penerjemahan; tambah tujuan belajar. |
| L127-151 | sedang | Kode "memeriksa ekuivalensi" membandingkan ekspresi yang sama: `bool kontra = q \|\| !p` identik dengan `impl = !p \|\| q`, dan De Morgan dibandingkan langsung dalam satu ekspresi. `g++ -Wall` mengeluarkan *self-comparison always evaluates to false*. Kode tidak membuktikan apa pun yang bermakna. | Definisikan implikasi menurut definisinya (`if (p) return q; return true;`) lalu bandingkan dengan `!p \|\| q` dan dengan implikasi `(!q, !p)`; De Morgan lewat dua fungsi. Keluaran menjadi `111`, tanpa peringatan. |
| L211-222 (Latihan 7) | - | Peringatan kompilator pada `1 <= n <= 9` memang disengaja. Keluaran `diterima` benar. | - |
| seluruh modul | sedang | Unsur ilmiah kurang. | Bagian 4. |

### 3.11 `matkom-himpunan-relasi-fungsi`

Semua definisi, contoh, kunci, dan keluaran program (`7 = 5 + 4 - 2`, `010`, `001`) benar.

| Lokasi | Tingkat | Masalah | Perbaikan |
| --- | --- | --- | --- |
| L3 dan indeks `cpItems` `F-BK-c`, `F-AP-d` | rendah | Modul bersifat matematis (himpunan, relasi, fungsi), sedangkan dua butir CP itu tentang memilih solusi dengan struktur data lebih kompleks dan memakai pustaka. Dukungan sangat tidak langsung. Pemetaan sudah disetujui dalam rancangan; keputusan pemilik. | Dibiarkan; bagian 5. |
| seluruh modul | sedang | Unsur ilmiah kurang. | Bagian 4. |

### 3.12 `matkom-induksi-dan-rekursi-matematis`

Semua bukti, nilai (C(10) = 177, C(20) = 21.891, 12,1 hari, 1.681 = 41²), dan kunci benar; program C++ dan TypeScript cocok.

| Lokasi | Tingkat | Masalah | Perbaikan |
| --- | --- | --- | --- |
| seluruh modul | sedang | Unsur ilmiah kurang. Bukti induksi cocok sekali untuk soal Parsons (menyusun bagian bukti) dan penjelasan diri, tetapi belum dipakai. | Bagian 4. |

### 3.13 `matkom-pertumbuhan-fungsi`

| Lokasi | Tingkat | Masalah | Perbaikan |
| --- | --- | --- | --- |
| L5 | sedang | "Prasyarat: `matkom-sistem-bilangan-basis` (pangkat dua, logaritma basis 2 ...)" tidak benar: modul basis tidak membahas logaritma. Rancangan seri juga menulis hal yang sama. | Koreksi pernyataan prasyarat di modul; logaritma diperkenalkan di modul ini. Rancangan seri perlu disesuaikan (bagian 6). |
| seluruh modul | sedang | Unsur ilmiah kurang. | Bagian 4. |

## 4. Dasar ilmiah: yang ada, yang kurang, dan rekomendasi

Penilaian pada keadaan `main` 8cdd753 (sama untuk ke-13 modul kecuali dicatat):

| Unsur (rujukan riset) | Keadaan | Rekomendasi | Bukti |
| --- | --- | --- | --- |
| Latihan mengingat kembali berjarak (3.1, 3.2) | Tidak ada. Hanya kuis formatif di akhir modul yang sama, tanpa pertanyaan yang merujuk modul sebelumnya atau dapat dipakai ulang berjarak. | Bagian "Ingat kembali" 3-5 pertanyaan di awal tiap modul yang merujuk modul sebelumnya, dengan jadwal ulang (hari ini, 1 hari, 1 minggu). | **K** untuk prinsip (3.1 `[A]`, 3.2 `[A]`); **M** untuk pemrograman (riset menyebut bukti langsung pada keterampilan pemrograman belum dibuka). |
| Contoh terselesaikan lalu pemudaran (3.4) | Contoh terselesaikan ada di semua modul; pemudaran ke soal setengah jadi belum ada. | Satu soal setengah jadi per modul yang memuat kode atau prosedur. | **K** untuk pemula pada domain terstruktur (3.4 `[B]`); **M** untuk pemrograman (Morrison dkk. hasil campuran). |
| PRIMM atau minimal baca dan prediksi sebelum menulis (6.3, 8.2) | Tidak ada. Komentar keluaran sudah tertulis di dalam blok kode sehingga siswa membaca jawabannya dulu. | Bagian "Prediksi dulu" sebelum contoh atau jejak. | **K** untuk usia 11-14 (kuasi, Sentance dkk. 2019); **M** untuk kelas X. |
| Tracing dan mesin konseptual (6.2) | Ada di `fondasi-komputer-dan-hardware` dan sebagian modul `matkom-*`; belum disebut eksplisit sebagai mesin konseptual. | Namai *notional machine* dan tandai batas model. | **K** (Lister dkk. 2004, Sorva 2013). |
| Soal Parsons atau setengah jadi (6.3) | Tidak ada. | Satu soal Parsons atau setengah jadi per modul yang berkode atau berprosedur. | **M** (Ericson dkk. 2017: efisiensi sama belajar, bukan keunggulan belajar). |
| Latihan bercampur (3.3) | Tidak ada. Latihan tiap modul hanya topik modul itu. | Bagian "Latihan bercampur" di akhir, memuat soal dari modul sebelumnya; hindari di perkenalan pertama sebuah konsep. | **K** untuk prinsip, sedang dan bergantung materi (3.3 `[A]`); **M** untuk pemrograman. |
| Umpan balik dengan langkah berikutnya (3.8, 6.5) | Hanya kunci jawaban benar atau salah. | Setiap kunci tambahan menyebut apa yang dilakukan bila salah. | **K** untuk isi umpan balik (3.8 `[A]`, sangat heterogen); **M** untuk pemrograman. |
| Penjelasan diri (3.6) | Tidak ada. | Satu soal "jelaskan dengan kata-katamu" per bagian bercampur. | **M** (`[B]` sedang, studi dasar kecil). |

Pemeriksaan mitos pedagogi (riset bagian 5): pencarian kata kunci `gaya belajar`, `visual`, `auditori`, `kinestetik`, `otak kiri`, `otak kanan`, `10%`, `piramida`, `digital native` pada ke-13 modul tidak menemukan klaim mitos. Tidak ada klaim "kita ingat 10% dari yang dibaca" atau penyesuaian bahan dengan gaya belajar. Revisi juga tidak menambah klaim semacam itu: unsur ilmiah ditambahkan sebagai kegiatan, bukan sebagai pernyataan "menurut ilmu".

## 5. Keputusan yang tetap milik pemilik

Laporan ini tidak mengubah status modul. Keputusan berikut tetap di tangan pemilik (disajikan oleh orchestrator lewat dialog pilihan baku):

1. **Persetujuan per modul** (`draf` menjadi `disetujui` dengan blok `review`): hanya pemilik. Rekomendasi pada bagian 2 adalah masukan, bukan persetujuan.
2. **Rujukan Panduan 2025.** URL tidak bisa dibuka dari lingkungan peninjau; apakah rujukan itu dipertahankan sebagai satu-satunya rujukan modul `matkom-*` (yang isinya matematika, bukan CP) atau perlu rujukan tambahan seperti buku teks. Peninjau tidak menambahkan sumber yang tidak bisa dibuktikan.
3. **Pemetaan `cpItems` modul `matkom-*`** (mis. `E-BK-e` untuk basis bilangan, `F-BK-c` dan `F-AP-d` untuk himpunan): disetujui dalam rancangan seri (issue #87) tetapi dukungannya tidak langsung; pertahankan, longgarkan, atau kosongkan.
4. **Butir AI v1.3 di modul keamanan dasar.** Aturannya disalin dari silabus 7.4; syarat usia dan ketentuan layanan, status hak cipta keluaran AI, dan kebijakan Kemendikdasmen tentang AI di sekolah tetap `[belum terverifikasi]` pada silabus dan pada modul.
5. **Atribusi dan domain publik** pada `fondasi-software-dan-sistem-operasi` (hak moral dan syarat atribusi menurut hukum Indonesia belum diperiksa): perlu rujukan hukum bila ingin dinyatakan lebih tegas.
6. **Satuan data.** Modul fondasi memakai KB = 1024 byte dan menyebut KiB sebagai catatan; modul `matkom-teks-gambar-suara` memakai MiB. Pemilik menentukan apakah seluruh seri memakai KiB dan MiB secara konsisten.
7. **Jadwal ulang berjarak** (hari ini, 1 hari, 1 minggu) memerlukan keputusan operasional guru; silabus saat ini melebur asesmen formatif fondasi ke minggu 14 (bagian 7.1). Mengubah silabus bukan wewenang peninjau.
8. **Perintah lab** (`ping`, `nslookup`) dan kegiatan opsional di lab sekolah perlu diuji guru atau pemilik di lingkungan nyata.
9. **Tidak ada modul yang direkomendasikan `tarik`.**

## 6. Temuan di luar cakupan (untuk orchestrator)

- `docs/programs/sma-coding/rancangan-seri-matematika-komputasi.md` (tabel modul): menyebut `matkom-sistem-bilangan-basis` sebagai prasyarat untuk "logaritma basis 2", padahal modul basis tidak membahas logaritma. Dokumen ini ikut basi terhadap koreksi pada modul `matkom-pertumbuhan-fungsi`.
- `docs/panduan/pemilik-peninjau.md`: contoh keluaran `check:module-code` menyebut "107 cpp block(s) in 10 module file(s)"; keluaran sebenarnya saat ini 116 blok di 39 berkas. Perlu diperbarui.
- `docs/panduan/pemilik-peninjau.md` mengatakan `bun run check:module-code` tidak menjalankan kode; benar, jadi hasil "lulus" dalam laporan ini berasal dari eksekusi terpisah oleh peninjau.

## 7. Isi revisi modul (commit kedua)

Revisi hanya menyentuh 13 berkas modul dan `data/sma-coding/modules.json`. Status tetap `draf`.

**Perbaikan faktual, kode, kunci, dan rujukan**

- `fondasi-jaringan-dan-internet`: uji DNS diganti `nslookup example.com`; ditambahkan penjelasan bahwa `.example` sengaja tidak punya alamat; ikon gembok diganti alamat `https://`; rujukan RFC 5737 dan RFC 2606 ditambahkan.
- `fondasi-keamanan-dasar`: bagian "Memakai AI dengan etika (kebijakan AI kelas)" (ringkasan aturan silabus 7.4, ditandai bahwa teks silabus yang berlaku dan syarat usia dan ketentuan layanan belum diverifikasi), tujuan belajar, Kegiatan 6 (menyunting permintaan sintetis), kartu kebijakan AI kelas, Latihan 7; kalimat 2FA dibedakan (SMS, aplikasi, kunci keamanan); WPA2 atau WPA3; gembok; rujukan NIST SP 800-63B.
- `fondasi-perangkat-produktivitas`: klaim nama fungsi bahasa Indonesia dihapus; `COUNTIF` diajarkan; rujukan WCAG 1.4.3.
- `fondasi-komputer-dan-hardware`: diagram I-P-O diperbaiki; catatan model sederhana dan *notional machine*; catatan kartu di meja vs instruksi di memori; catatan KB.
- `fondasi-software-dan-sistem-operasi`: aturan nama berkas diselaraskan; Latihan 1 diganti dan kuncinya diperjelas; catatan multi-inti; rujukan The Open Source Definition.
- `fondasi-representasi-data`: catatan KiB dan MiB; awalan `0x` dan `#` dipisahkan.
- `matkom-logika-proposisi`: bagian pseudocode dan Latihan 10 (mendukung `E-BK-d`); contoh C++ diganti agar bermakna (implikasi menurut definisi, kontrapositif sebagai pemanggilan `implikasi(!q, !p)`; keluaran `111`, tanpa peringatan `-Wall`).
- `matkom-pertumbuhan-fungsi`: pernyataan prasyarat dikoreksi (logaritma diperkenalkan di modul ini).
- `matkom-bilangan-bertanda-dan-luapan`: catatan agar Latihan 4 tidak bertabrakan dengan UB di C++; rujukan cppreference dan MDN.
- `matkom-teks-gambar-suara`: catatan U+FE0F pada `❤`, catatan RLE dan angka, catatan MiB; rujukan RFC 3629.
- `matkom-sistem-bilangan-basis`, `matkom-himpunan-relasi-fungsi`, `matkom-induksi-dan-rekursi-matematis`: tidak ada kesalahan faktual; hanya unsur ilmiah.

**Unsur ilmiah yang ditambahkan secara seragam di ke-13 modul**

| Unsur | Bentuk di modul | Bukti |
| --- | --- | --- |
| Latihan mengingat kembali berjarak | "Ingat kembali" 4-5 pertanyaan di awal, merujuk modul sebelumnya (modul pertama dan modul logika memakai pengetahuan umum), jawaban beserta langkah bila salah di bagian kunci | K (prinsip), M (pemrograman); 3.1, 3.2 |
| Prediksi sebelum contoh | "Prediksi dulu" sebelum jejak, perintah, atau blok kode berkeluaran | K usia 11-14, M kelas X; 6.3, 8.2 |
| Soal Parsons dan setengah jadi | Satu soal Parsons per modul (kartu, langkah, bukti, atau baris kode); satu soal setengah jadi di modul berkode | M; 6.3 |
| Latihan bercampur dan ulang berjarak | "Latihan bercampur dan ulang berjarak" di akhir, memuat soal dari modul lain, satu soal penjelasan diri, dan jadwal ulang (1 hari, 1 minggu) | K (prinsip), M (pemrograman); 3.2, 3.3 |
| Umpan balik dengan langkah berikutnya | Kunci tiap bagian baru berisi "bila salah, lakukan ..." | K, heterogen; 3.8, 6.5 |
| Penjelasan diri | Satu soal "jelaskan dengan kata-katamu" per modul | M; 3.6 |

Blok C++ tidak ditambah (kecuali yang diganti pada modul logika); soal Parsons dan setengah jadi memakai blok `text` sehingga `check:module-code` tidak mengompilasinya.
