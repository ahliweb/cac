# Draf Jalur D (Kecerdasan Buatan dan Analisis Data) — Silabus Coding SMA

- **Version:** v0.1.0
- **Last updated:** 2026-11-18
- **Status:** DRAF — belum disetujui pemilik program (issue #84); modul dan data belum ada
- **Changeset:** Draf awal jalur D (AI) kelas X–XII: rencana mingguan, pemetaan ke butir CP dengan catatan bahwa AI di luar rumusan CP, opsi alat dan coding dengan rekomendasi, posisi seri Buku AI SMA, etika dan privasi, pertanyaan terbuka.

> **DRAF — belum disetujui pemilik.** Dokumen ini adalah konten karangan
> menurut [ADR-0007](../../architecture/adr/0007-authored-learning-content.md):
> rancangan dan penilaian penyusun, bukan transkripsi sumber resmi dan bukan
> keputusan. Penyusun tidak mencatat persetujuan atas nama pemilik. Pilihan
> alat, bahasa, dan seluruh opsi di bagian 5 dan 10 adalah hak pemilik;
> "Disarankan" hanya rekomendasi penyusun. Jalur D baru bagian dari silabus
> setelah pemilik menyetujuinya; sampai saat itu `data/sma-coding/` tidak
> memuat jalur D.

## 0. Cara membaca dokumen ini

- `[belum terverifikasi]` berarti butir itu tidak dapat dipastikan dari
  sumber yang benar-benar dibuka penyusun. Butir seperti itu tidak boleh
  diperlakukan sebagai fakta.
- `[asumsi]` berarti keputusan perancangan penyusun, bukan data resmi.
- Kode minggu mengikuti [`silabus.md`](silabus.md) bagian 0:
  `D-X1-M8` = jalur D, kelas X, semester 1, minggu 8. Pada kelas X
  semester 1 nomor `M<n>` adalah **nomor minggu kalender semester**:
  minggu 1-7 dipakai blok fondasi `FND-X1-M1..M7`, sehingga jalur D
  dimulai di `D-X1-M8` (sama seperti jalur A dan B pada
  [`silabus-v1.1-draf.md`](silabus-v1.1-draf.md) bagian 3.0). Semester
  lain: `D-X2-M1`, `D-XI1-M1`, `D-XI2-M1`, `D-XII1-M1`, `D-XII2-M1`.
- Kode butir CP (mis. `F-AD-a`) dipakai persis seperti di
  [`silabus.md` bagian 1.4](silabus.md). Dokumen ini tidak membuat kode
  butir baru.
- Tanggal akses sumber luar di bagian 12: **2026-11-19**.

## 1. Latar dan status

- **Keputusan pemilik (2026-11-18, dialog pilihan, issue #66 dan #83):**
  hasil riset buku AI karya Onno W. Purbo
  ([`riset-buku-ai-onno-w-purbo.md`](riset-buku-ai-onno-w-purbo.md))
  dimanfaatkan sebagai **jalur AI terpisah, jalur D** (jalur C sudah dipakai
  untuk IoT/robotika, #68). Murid memilih satu jalur dan boleh lebih dari
  satu (silabus bagian 2). Blok fondasi tujuh minggu (`FND-X1-M1..M7`)
  dijalankan bersama sebelum murid memilih jalur; asesmen formatif fondasi
  dilebur ke minggu 14 semester 1 (usulan fondasi, keputusan 2026-11-18).
- Menurut keterangan orchestrator, silabus v1.1 disetujui pemilik pada
  2026-11-19. Pada saat dokumen ini disusun, berkas
  [`silabus-v1.1-draf.md`](silabus-v1.1-draf.md) di repositori masih
  berstatus DRAF dan belum mencatat persetujuan itu; dokumen ini tidak
  mencatatnya.
- Jalur D **tidak** menggantikan jalur A atau B dan tidak menjanjikan
  persiapan OSN (lihat bagian 4.2).

## 2. Tujuan jalur D

Murid yang menyelesaikan jalur D mampu `[asumsi]`:

1. menjelaskan secara jujur apa yang dapat dan tidak dapat dilakukan sistem
   AI (kecerdasan buatan) pada tingkat SMA, termasuk keterbatasan dan
   kesalahannya;
2. menyiapkan, memeriksa kualitas, dan melabeli data (sintetis atau
   terbuka dan legal) sebagai bahan model;
3. membangun, mengevaluasi, dan membandingkan model sederhana untuk
   prediksi, klasifikasi, dan pengelompokan, serta menjustifikasi pilihan
   berdasarkan bukti evaluasi;
4. menilai keluaran AI (termasuk konten buatan AI) secara kritis dan
   memverifikasinya;
5. menerapkan etika AI, pelindungan data pribadi, dan penghargaan hak
   kekayaan intelektual dalam setiap proyek;
6. merancang, mengerjakan, mendokumentasikan, dan mempresentasikan satu
   proyek akhir AI/analisis data.

## 3. Prasyarat dan hubungan dengan blok fondasi

Jalur D bergantung pada blok fondasi (kelas bersama, `FND-X1-M1..M7`;
rincian di [`silabus-v1.1-draf.md`](silabus-v1.1-draf.md) bagian 3.0):

| Kebutuhan jalur D | Dipenuhi oleh |
| --- | --- |
| Data sebagai biner, teks, dan gambar (piksel) sebagai bahan data | `FND-X1-M3` (representasi data) |
| Model Input-Proses-Output sebagai kerangka sistem AI | `FND-X1-M1` |
| Keamanan akun, privasi, dan etika digital | `FND-X1-M6` |
| Lisensi dan atribusi (data dan perangkat lunak terbuka) | `FND-X1-M2` |
| Konsep jaringan sebagai latar layanan daring dan API | `FND-X1-M4..M5` |
| Dokumen, lembar kerja, dan presentasi untuk laporan | `FND-X1-M7` |

Jalur D **tidak mensyaratkan** jalur A atau B `[asumsi]`. Pemrograman bagi
murid yang hanya mengambil jalur D diperkenalkan di kelas XI semester 1
(bagian 5 dan rencana `D-XI1-M2..M4`); ini bergantung pada pilihan alat di
bagian 5.

## 4. Pemetaan ke butir CP

### 4.1 Catatan tegas: AI di luar rumusan CP

Rumusan CP yang dikutip [`silabus.md` bagian 1.3](silabus.md) (Fase E dan
F) **tidak memuat kata "kecerdasan buatan", "AI", atau "machine
learning"** dan tidak mewajibkan AI. Jalur D adalah **jalur di luar
rumusan CP** (pengayaan program), bukan pemenuhan CP. Irisan terdekat
adalah **F-AD-a**; butir lain bersinggungan secara tidak langsung. Seluruh
tingkat kecocokan di bawah adalah **tafsir penyusun**. Penyusun tidak
memeriksa apakah ada peraturan lain yang menyebut AI di mata pelajaran
Informatika `[belum terverifikasi]`; SK CP yang berlaku juga masih
`[belum terverifikasi]` (silabus bagian 1.2).

### 4.2 Pemetaan

Kutipan disalin persis dari silabus bagian 1.3 (bersumber dari *Panduan
Mata Pelajaran Informatika, Fase D – F*, BSKAP, 2025).

| Butir | Kutipan CP | Minggu jalur D | Tingkat |
| --- | --- | --- | --- |
| F-AD-a | "memanfaatkan sumber data yang terbuka, terpercaya, dan legal untuk mengolah data untuk pengambilan keputusan dan prediksi secara efektif, efisien, dan optimal tanpa atau dengan komputer" | D-XI1-M5..M8, M13; D-XII1-M5 | **Irisan terdekat.** Sedang: rumusan menyebut "prediksi" dan "tanpa atau dengan komputer", tetapi tidak menyebut AI atau pembelajaran mesin. |
| E-BK-b | "menerapkan proses komputasi yang dilakukan manusia secara mandiri atau berkelompok untuk mendapatkan data yang berkualitas" | D-X1-M9; D-X1-M13; D-X2-M1 | Rendah-sedang: kualitas dan pelabelan data. |
| F-LD-b | "mengevaluasi kebenaran konten menggunakan verifikasi teks, gambar, dan video" | D-X2-M11; D-XI2-M10 | Rendah-sedang: verifikasi konten buatan AI. |
| E-LD-g | "menghargai hak atas kekayaan intelektual" | D-X2-M12 | Rendah: lisensi data dan keluaran generatif. |
| F-LD-g | "memahami hukum dan perundang-undangan terkait isu digital di Indonesia" | D-X2-M3; D-XII1-M4 | Rendah: pelindungan data pribadi dan UU ITE sebatas pokok. |
| E-LD-l | "menerapkan konfigurasi privasi dan keamanan pada akun platform digital" | D-X2-M3 | Rendah: privasi pada layanan AI daring. |
| F-AP-d | "merancang dan mengimplementasikan sebuah program yang menggunakan struktur data kompleks dan tepat menggunakan library atau perangkat yang tersedia" | D-XI1-M3..M4, M9; D-XI2-M2..M8 | Rendah, **hanya bila** opsi alat memakai coding (bagian 5); memakai library, tetapi struktur data kompleks tidak menjadi fokus. |

Butir yang **tidak** disentuh jalur D: E-BK-a, c, d, e; F-BK-b, c, d;
F-AP-a, b, c (kecuali kualitas kode di `D-XII1-M10`, rendah). Jalur D tidak
melatih struktur data atau strategi algoritmik; ia **tidak menggantikan
jalur A dan B**, dan tidak ada klaim bahwa ia menyiapkan OSN (rumpun materi
OSN bersifat algoritmik, `silabus.md` bagian 5).

## 5. Alat dan coding: opsi, trade-off, rekomendasi

Keputusan ada pada pemilik. Fakta alat yang terverifikasi dicatat bersama
URL di bagian 12; selebihnya `[belum terverifikasi]`.

### 5.1 Perangkat yang dapat dipakai

| Perangkat | Jenis | Lisensi dan biaya | Akun | Luring? | Catatan privasi dan beban |
| --- | --- | --- | --- | --- | --- |
| Orange Data Mining | Alur kerja visual, tanpa kode, aplikasi desktop | Sumber terbuka, GPL-3.0 atau lebih baru (berkas LICENSE repositori resmi); halaman unduhan menawarkan Windows, Mac OS, dan platform lain, versi 3.41.0 | Halaman resmi tidak menyebut akun `[belum terverifikasi: tidak dinyatakan tidak berarti tidak ada]` | Aplikasi desktop; kerja luring penuh `[belum terverifikasi]` | Data tetap di komputer lab (bila dipakai luring). Beban lab sedang (pemasangan per komputer). |
| Teachable Machine (Google) | Pelatihan model gambar/suara/pose di peramban | Repositori komunitas berlisensi Apache-2.0; biaya layanan web `[belum terverifikasi]` | Sumber sekunder menyebut tanpa akun untuk dasar, akun hanya untuk menyimpan proyek `[belum terverifikasi: halaman FAQ resmi tidak terbaca]` | Daring `[belum terverifikasi]` | Memakai kamera dan mikrofon: **berisiko privasi** bila bahan latih berupa wajah/suara murid; dipakai hanya dengan benda (bagian 8). Klaim "data tetap di perangkat" hanya dari sumber sekunder `[belum terverifikasi]`. |
| Python + Jupyter / editor, `pandas`, `scikit-learn` | Coding | Python dan Jupyter: `[belum terverifikasi]` (umumnya sumber terbuka); `scikit-learn`: BSD 3-Clause (berkas COPYING repositori resmi) | Tidak perlu akun | Luring setelah paket terpasang; pemasangan paket butuh internet sekali `[belum terverifikasi]` | Data tetap lokal. Beban lab sedang (Python, paket, ruang disk `[belum terverifikasi]`). Tambahan bahasa bagi murid jalur lain. |
| JS/TS di peramban atau Bun (TensorFlow.js, ml5.js) | Coding, selaras jalur B | `[belum terverifikasi]` untuk lisensi dan kemampuan | Tidak perlu akun | Bergantung paket `[belum terverifikasi]` | Selaras toolchain jalur B; ekosistem data dan pembelajaran mesin lebih sempit dari Python `[asumsi]`. |
| Asisten AI percakapan daring (ChatGPT, Gemini, dan sejenisnya) | Layanan daring | Biaya dan syarat `[belum terverifikasi]` | Umumnya butuh akun dan ada batas usia `[belum terverifikasi]` | Tidak | **Tidak boleh mewajibkan akun pribadi murid**; masukan bisa memuat data pribadi; dipakai hanya sebagai demonstrasi guru (bagian 8). |
| Model bahasa lokal (Ollama) | Menjalankan model di mesin sendiri | Ollama: MIT (berkas LICENSE repositori resmi); lisensi tiap model berbeda `[belum terverifikasi]` | Tidak perlu akun untuk Ollama `[belum terverifikasi]` | Ya setelah model diunduh | Data tetap lokal, tetapi butuh perangkat berspesifikasi tinggi `[belum terverifikasi]` dan unduhan model besar; sesuai terutama untuk demonstrasi guru atau proyek akhir XII. |

### 5.2 Opsi rancangan jalur

| Opsi | Isi |
| --- | --- |
| 1: Tanpa kode saja | Orange dan kegiatan tanpa komputer di seluruh enam semester; tanpa Python/JS. |
| 2 (Disarankan): Bertahap | Kelas X tanpa kode (Orange dan kegiatan tanpa komputer); Python dengan `pandas` dan `scikit-learn` mulai kelas XI semester 1; Orange tetap untuk eksplorasi cepat. Rencana bagian 6 mengikuti opsi ini. |
| 3: Python sejak kelas X | Python diperkenalkan di `D-X1-M8`; Orange hanya pembanding. |
| 4: JS/TS selaras jalur B | Seperti opsi 2, tetapi pemrograman memakai JS/TS (TensorFlow.js/ml5.js) agar toolchain sama dengan jalur B. |

### 5.3 Penilaian 11 kriteria (penyusun)

Skala 1 = lemah, 3 = kuat (penilaian penyusun, bukan pengukuran).

| Kriteria | Opsi 1 | Opsi 2 | Opsi 3 | Opsi 4 |
| --- | --- | --- | --- | --- |
| Kelebihan | Mudah dimulai; seri Buku AI SMA sejalan | Seimbang: konsep dahulu, kode kemudian; sejalan dengan ekosistem data umum | Kode lebih awal | Satu toolchain dengan jalur B |
| Kekurangan | Tidak ada pemrograman; kedalaman terbatas | Tambahan bahasa (Python) di XI | Murid pemula terbebani di X | Ekosistem lebih sempit `[asumsi]` |
| Keamanan | 3 | 3 | 3 | 3 (selama tanpa akun dan kunci pribadi) |
| Performa (beban lab) | 3 | 2 | 2 | 2 |
| Kemudahan perawatan | 3 | 2 | 2 | 2 |
| Skalabilitas | 2 | 3 | 3 | 2 |
| Aksesibilitas bagi sekolah beragam | 3 | 2 | 1 | 2 |
| Dampak SEO | tidak relevan | tidak relevan | tidak relevan | tidak relevan |
| UI/UX belajar | 3 | 2 | 1 | 2 |
| Kompatibilitas dengan A/B | 2 | 2 | 2 | 3 |
| Kompleksitas operasional | 3 | 2 | 1 | 2 |
| Implikasi jangka panjang | 1 (jalur terasa dangkal) | 3 | 2 | 2 |

### 5.4 Rekomendasi penyusun

**Opsi 2 (bertahap)**, dengan Python di kelas XI-XII. Alasan: murid kelas
X adalah pemula dan tujuh minggu fondasi sudah tanpa kode; Orange memberi
pengalaman data-model-evaluasi tanpa beban sintaks; Python memberi
kedalaman untuk Fase F (F-AP-d) dan paling umum untuk data dan pembelajaran
mesin `[asumsi]`. Opsi 4 adalah cadangan bila sekolah ingin satu toolchain
dengan jalur B. Teachable Machine dipertahankan hanya sebagai pengayaan
dengan data benda (bagian 8). Layanan AI daring tidak dipakai murid
langsung. **Keputusan ada pada pemilik.**

## 6. Rencana mingguan

Kolom: **Topik** | **Tujuan** (murid mampu ...) | **Keluaran** | **Latihan**.
Rencana memakai opsi 2 (bagian 5.2). Seluruh data bersifat sintetis atau
dataset terbuka berlisensi yang syaratnya dibaca (bagian 8). Satu pertemuan
3 JP x 45 menit per minggu. Pola semester: minggu 13 proyek mini, minggu 14
asesmen dan refleksi (silabus bagian 2).

### D-X1 (kelas X, semester 1; Fase E) — minggu 8-14

Minggu 1-7 adalah blok fondasi `FND-X1-M1..M7`.

| Minggu | Topik | Tujuan | Keluaran | Latihan |
| --- | --- | --- | --- | --- |
| D-X1-M8 | Apa itu AI dan apa yang bukan | membedakan AI dari program biasa; menyebut contoh AI sehari-hari dan batasannya; menggambar sistem AI dengan model Input-Proses-Output | diagram I-P-O sistem AI | memilah daftar contoh "AI atau bukan"; telaah satu aplikasi fiktif |
| D-X1-M9 | Data, fitur, dan label | menjelaskan dataset, fitur, dan label; menilai kualitas dan bias data | tabel data beranotasi | menyusun 20 kartu benda bersama label; temukan data ganjil pada tabel sintetis |
| D-X1-M10 | Klasifikasi tanpa komputer | membuat aturan keputusan dari contoh berlabel dan mengujinya | pohon keputusan di kertas | klasifikasikan kartu benda; hitung ketepatan aturan |
| D-X1-M11 | Orange: memuat dan melihat data | memuat tabel di Orange; memakai tabel data dan diagram sebar | alur kerja Orange | eksplorasi tabel sintetis |
| D-X1-M12 | Model pertama dan pembagian data latih/uji | melatih pohon keputusan; membaca akurasi pada data uji | alur kerja klasifikasi | bandingkan akurasi data latih dan data uji |
| D-X1-M13 | Proyek mini | mengklasifikasikan data tabel sintetis dan melaporkan hasil | laporan singkat | proyek kelompok |
| D-X1-M14 | Asesmen dan refleksi | menunjukkan konsep dasar data dan model; sekaligus asesmen formatif fondasi yang dilebur ke minggu ini | uji tulis dan praktik; jurnal | kuis |

### D-X2 (kelas X, semester 2; Fase E)

| Minggu | Topik | Tujuan | Keluaran | Latihan |
| --- | --- | --- | --- | --- |
| D-X2-M1 | Dari data ke keputusan; ulasan | menguraikan alur data, model, evaluasi, keputusan; mengenali model yang salah | alur satu halaman | telaah model sintetis yang salah |
| D-X2-M2 | Bias dan keadilan | menjelaskan sumber bias dan dampaknya | catatan kasus | kasus fiktif pemberian nilai otomatis |
| D-X2-M3 | Privasi dan data pribadi | menjelaskan data pribadi, risiko penggunaan layanan AI, dan pokok pelindungan data pribadi | daftar periksa privasi | tandai data pribadi pada contoh fiktif |
| D-X2-M4 | Regresi: garis kecenderungan | memakai regresi linear di Orange | alur regresi | prediksi nilai dari data sintetis |
| D-X2-M5 | Galat dan kelebihan-suai (overfitting) | mengukur galat dan mengenali overfitting | catatan galat | bandingkan model sederhana dan rumit |
| D-X2-M6 | Klasifikasi: pohon keputusan dan tetangga terdekat | melatih dan membandingkan dua penggolong | tabel perbandingan | dua model pada satu data |
| D-X2-M7 | Mengevaluasi klasifikasi | membaca matriks kebingungan; membedakan jenis kesalahan | matriks beranotasi | hitung akurasi dan jenis galat |
| D-X2-M8 | Pengelompokan tanpa label | melakukan pengelompokan dan menafsirkan kelompok | alur pengelompokan | kelompokkan data sintetis |
| D-X2-M9 | Visualisasi untuk bercerita | memilih grafik yang tepat dan jujur | satu halaman visual | grafik dari data sintetis |
| D-X2-M10 | Teks sebagai data | menjelaskan teks sebagai fitur; menggolongkan teks sintetis | alur teks | pisahkan kalimat sintetis ke dua kategori |
| D-X2-M11 | AI generatif dan verifikasi | menjelaskan cara kerja kasar dan keterbatasannya (jawaban keliru yang meyakinkan); memverifikasi keluaran | lembar verifikasi | guru mendemonstrasikan; murid memeriksa klaim dengan sumber (tanpa akun murid) |
| D-X2-M12 | HAKI, lisensi data, dan AI | membaca lisensi data; menjelaskan isu hak cipta keluaran generatif | tabel lisensi | baca satu lisensi data terbuka |
| D-X2-M13 | Proyek mini | menyelesaikan satu pertanyaan dengan data sintetis dari data hingga evaluasi | laporan | proyek kelompok |
| D-X2-M14 | Asesmen dan refleksi | menunjukkan alur data-model-evaluasi dan etika dasar | uji tulis dan praktik; jurnal | kuis |

### D-XI1 (kelas XI, semester 1; Fase F)

| Minggu | Topik | Tujuan | Keluaran | Latihan |
| --- | --- | --- | --- | --- |
| D-XI1-M1 | Proses proyek data dan AI | menguraikan masalah, data, model, evaluasi, penggunaan | rancangan satu halaman | rancang proyek fiktif |
| D-XI1-M2 | Python I | memakai variabel, tipe, kondisi, perulangan | skrip dasar | hitung statistik sederhana |
| D-XI1-M3 | Python II | memakai fungsi, daftar, kamus | skrip modular | rekap data sintetis |
| D-XI1-M4 | Membaca berkas tabel | membaca dan menulis CSV dengan library | skrip berkas | baca CSV sintetis |
| D-XI1-M5 | Sumber data terbuka dan legal | menilai sumber, lisensi, dan keterpercayaan data | catatan sumber | pilih dataset terbuka dan baca lisensinya |
| D-XI1-M6 | Membersihkan data | menangani nilai hilang, duplikat, rentang | skrip pembersih | bersihkan data sintetis |
| D-XI1-M7 | Statistik deskriptif dan grafik | merangkum data dan menyajikan grafik | grafik dan ringkasan | grafik dari data terbuka |
| D-XI1-M8 | Prediksi sederhana | memakai rata-rata bergerak dan regresi linear; mengevaluasi galat | skrip prediksi | prediksi nilai berikutnya dan galat |
| D-XI1-M9 | Klasifikasi dengan `scikit-learn` | melatih dan menguji penggolong | skrip penggolong | klasifikasi data sintetis |
| D-XI1-M10 | Evaluasi dan validasi | membagi data; membaca metrik; validasi silang secara intuitif | tabel metrik | bandingkan pembagian data |
| D-XI1-M11 | Membandingkan model | menghasilkan dua model atau lebih dan menjustifikasi pilihan | laporan perbandingan | tiga model pada satu data |
| D-XI1-M12 | Kebocoran data dan bias evaluasi | mengenali kebocoran data dan evaluasi yang menyesatkan | catatan kasus | perbaiki evaluasi yang bocor |
| D-XI1-M13 | Proyek mini | mengerjakan alur analisis data terbuka hingga prediksi | program dan laporan | proyek kelompok |
| D-XI1-M14 | Asesmen dan refleksi | menunjukkan data, prediksi, dan evaluasi | uji tulis dan praktik | kuis kode |

### D-XI2 (kelas XI, semester 2; Fase F)

| Minggu | Topik | Tujuan | Keluaran | Latihan |
| --- | --- | --- | --- | --- |
| D-XI2-M1 | Pengelompokan dengan Python | memakai k-means dan menafsirkan kelompok | skrip pengelompokan | kelompokkan data sintetis |
| D-XI2-M2 | Pohon keputusan dan ensambel | menjelaskan dan memakai pohon serta hutan acak | skrip model | bandingkan pohon dan hutan |
| D-XI2-M3 | Rekayasa fitur | membuat dan memilih fitur | skrip fitur | tambah fitur pada data sintetis |
| D-XI2-M4 | Teks: pembersihan dan representasi | membersihkan teks; merepresentasikannya sebagai angka | skrip teks | representasi kalimat sintetis |
| D-XI2-M5 | Klasifikasi teks | melatih penggolong teks | skrip penggolong teks | klasifikasi sentimen kalimat sintetis berbahasa Indonesia |
| D-XI2-M6 | Gambar sebagai angka | menghubungkan piksel (`FND-X1-M3`) dengan fitur; menggolongkan gambar | skrip gambar | gambar sintetis hasil program (bentuk dan pola) |
| D-XI2-M7 | Gagasan jaringan saraf | menjelaskan neuron, bobot, dan pelatihan secara konseptual | diagram beranotasi | hitung keluaran satu neuron dengan tangan |
| D-XI2-M8 | Melatih jaringan kecil | melatih jaringan saraf kecil pada data tabel sintetis | skrip jaringan | bandingkan dengan model lain |
| D-XI2-M9 | Menjelaskan keputusan model | menafsirkan fitur berpengaruh dan keterbatasan penjelasan | catatan penjelasan | tafsirkan satu model |
| D-XI2-M10 | Penyalahgunaan AI dan verifikasi konten | mengenali konten palsu, penipuan, dan cara memverifikasi teks, gambar, video | lembar periksa | periksa contoh sintetis |
| D-XI2-M11 | Layanan lewat API (opsional) | menjelaskan cara aplikasi memakai model lewat layanan; menjaga rahasia | catatan arsitektur | gambar alur permintaan; tanpa kunci pribadi |
| D-XI2-M12 | Kartu model dan dokumentasi | mendokumentasikan data, tujuan, batasan, dan risiko model | kartu model | tulis kartu model proyek |
| D-XI2-M13 | Proyek mini | mengerjakan satu proyek model dari data hingga kartu model | program dan laporan | proyek kelompok |
| D-XI2-M14 | Asesmen dan refleksi | menunjukkan model, evaluasi, dan etika | uji tulis dan praktik | kuis kode |

### D-XII1 (kelas XII, semester 1; Fase F)

| Minggu | Topik | Tujuan | Keluaran | Latihan |
| --- | --- | --- | --- | --- |
| D-XII1-M1 | Merumuskan proyek akhir | menentukan masalah dan kebutuhan pengguna fiktif | dokumen kebutuhan | wawancara pengguna fiktif |
| D-XII1-M2 | Studi kasus AI I | menimbang manfaat dan risiko dari sumber publik (mis. kesehatan, pendidikan) | catatan kasus | baca satu kasus dan tulis manfaat dan risikonya |
| D-XII1-M3 | Studi kasus AI II | menimbang manfaat dan risiko pada bidang lain (mis. transportasi, pertanian, budaya) | catatan kasus | idem |
| D-XII1-M4 | Hukum dan kebijakan | menjelaskan pokok UU ITE dan UU PDP terkait proyek AI | daftar periksa kepatuhan | periksa rancangan proyek |
| D-XII1-M5 | Menyiapkan data proyek | memilih data terbuka dan legal atau menyintesis data | catatan sumber dan data | siapkan data proyek |
| D-XII1-M6 | Garis dasar dan metrik | menentukan metrik dan model pembanding sederhana | laporan garis dasar | hitung garis dasar |
| D-XII1-M7 | Iterasi model I | memperbaiki model berdasarkan bukti | catatan eksperimen | satu perbaikan terukur |
| D-XII1-M8 | Iterasi model II | mencatat eksperimen agar dapat diulang | tabel eksperimen | tiga eksperimen |
| D-XII1-M9 | Ulasan sejawat | menilai data dan model tim lain | catatan ulasan | ulasan |
| D-XII1-M10 | Kualitas kode dan keterulangan | merapikan kode; menetapkan benih acak; menulis README | proyek rapi | refaktor satu skrip |
| D-XII1-M11 | Penilaian risiko dan etika proyek | memakai daftar periksa risiko dan dampak | laporan risiko | audit proyek sendiri |
| D-XII1-M12 | Menyajikan hasil | menyajikan temuan dengan grafik dan narasi jujur | draf presentasi | latihan presentasi |
| D-XII1-M13 | Proyek | menyiapkan proyek akhir | rencana dan kemajuan | rencana kerja |
| D-XII1-M14 | Asesmen dan refleksi | menunjukkan kesiapan proyek akhir | uji tulis dan praktik | rubrik |

### D-XII2 (kelas XII, semester 2; Fase F)

| Minggu | Topik | Tujuan | Keluaran | Latihan |
| --- | --- | --- | --- | --- |
| D-XII2-M1 | Perencanaan proyek akhir | menyusun rencana, pembagian peran, dan jadwal | rencana proyek | pilih topik |
| D-XII2-M2 | Rancangan | merancang data, model, dan evaluasi | dokumen rancangan | rancangan tim |
| D-XII2-M3 | Sprint 1: data | menyiapkan dan memeriksa data | data siap pakai | catatan kualitas data |
| D-XII2-M4 | Sprint 1: garis dasar | membuat model pembanding | laporan garis dasar | metrik awal |
| D-XII2-M5 | Sprint 2: model | membangun dan membandingkan model | model dan catatan | tiga model |
| D-XII2-M6 | Sprint 2: evaluasi | mengevaluasi dengan benar dan mencari galat | laporan evaluasi | analisis galat |
| D-XII2-M7 | Sprint 3: penyempurnaan | memperbaiki model dan kode | rilis kandidat | perbaikan |
| D-XII2-M8 | Pengujian akhir | menguji pada data yang belum dipakai | laporan uji | uji akhir |
| D-XII2-M9 | Dokumentasi | menulis kartu model dan panduan | dokumen | kartu model |
| D-XII2-M10 | Ulasan etika dan privasi | memeriksa data pribadi, bias, dan dampak | laporan etika | audit |
| D-XII2-M11 | Ulasan sejawat | menilai proyek tim lain | catatan ulasan | ulasan |
| D-XII2-M12 | Presentasi | mendemonstrasikan proyek | demo | presentasi |
| D-XII2-M13 | Portofolio dan refleksi | mengarsipkan karya dan merefleksikan proses | portofolio | refleksi |
| D-XII2-M14 | Asesmen | menunjukkan seluruh jalur | uji praktik; rubrik proyek | rubrik |

## 7. Seri Buku AI SMA sebagai bacaan tertaut

Sumber: [`riset-buku-ai-onno-w-purbo.md`](riset-buku-ai-onno-w-purbo.md)
bagian 3.1 (halaman penerbit InTechPress, ITTS, dibuka 2026-11-18 oleh
penyusun riset). Peran seri di jalur D:

- **Bacaan tertaut opsional**, bukan bahan inti, dan **isinya tidak disalin
  atau diparafrasekan** ke dokumen ini atau ke modul jalur D. Penautan hanya
  ke halaman judul penerbit.
- **Lisensi: belum jelas sampai diklarifikasi penerbit.** Halaman penerbit
  tidak menyatakan lisensi. "Gratis diunduh" tidak sama dengan "boleh
  disalin atau diadaptasi"; PDF, gambar, atau kutipan panjang tidak boleh
  ditaruh di repositori tanpa izin tertulis.
- Sebelum dicantumkan di silabus, guru atau pemilik sebaiknya membaca isi
  jilid terkait: isi belum diverifikasi dan deskripsi penerbit tidak sama
  dengan metadata halaman baca untuk jilid X-2 dan XI-1.
- Seri memakai alat tanpa kode, sehingga **tidak mencakup** minggu Python
  jalur D.

| Semester jalur D | Jilid seri (judul halaman penerbit) | Tautan |
| --- | --- | --- |
| D-X1, D-X2 | X smt 1: Artificial Intelligence : AI dan Kamu : Langkah Awal Jadi Generasi Siap Teknologi; X smt 2: Artificial Intelligence : AI di Tanganmu : Dari Teori ke Proyek Nyata dan Masa Depan Teknologi | [X-1](https://intechpress.itts.ac.id/2025/08/25/artificial-intelligence-ai-dan-kamu-langkah-awal-jadi-generasi-siap-teknologi/); [X-2](https://intechpress.itts.ac.id/2025/08/25/artificial-intelligence-ai-di-tanganmu-dari-teori-ke-proyek-nyata-dan-masa-depan-teknologi/) |
| D-XI1, D-XI2 | XI smt 1: Artificial Intelligence : Langkah Awal Jadi Data Scientist: AI, Visualisasi, dan Analisis Emosi; XI smt 2: Artificial Intelligence : Penerapan AI Nyata: Dari ChatGPT, Orange, hingga Google TM | [XI-1](https://intechpress.itts.ac.id/2025/08/25/artificial-intelligence-langkah-awal-jadi-data-scientist-ai-visualisasi-dan-analisis-emosi/); [XI-2](https://intechpress.itts.ac.id/2025/08/25/artificial-intelligence-penerapan-ai-nyata-dari-chatgpt-orange-hingga-google-tm/) |
| D-XII1, D-XII2 | XII smt 1: Artificial Intelligence : Belajar dari Dunia Nyata : Studi Kasus & Riset AI yang Bikin Penasaran; XII smt 2: Artificial Intelligence :  AI untuk Masa Depanmu : Bangun proyek, Kerja Tim, dan Simulasi Dunia Kerja | [XII-1](https://intechpress.itts.ac.id/2025/08/26/artificial-intelligence-belajar-dari-dunia-nyata-studi-kasus-riset-ai-yang-bikin-penasaran/); [XII-2](https://intechpress.itts.ac.id/2025/08/26/artificial-intelligence-ai-untuk-masa-depanmu-bangun-proyek-kerja-tim-dan-simulasi-dunia-kerja/) |

Penyejajaran semester adalah ikatan longgar berdasarkan judul dan kelas
yang tertera di halaman penerbit `[asumsi]`; rencana mingguan di bagian 6
adalah rancangan sendiri, bukan urutan buku.

## 8. Etika AI dan privasi data siswa

Berlaku untuk seluruh minggu jalur D. Dasarnya
[ADR-0004](../../architecture/adr/0004-no-learner-personal-data.md) dan
silabus bagian 7.3 (UU No. 27 Tahun 2022 tentang Pelindungan Data Pribadi
dikutip ADR-0004; peserta adalah anak di bawah umur).

| Aturan | Isi |
| --- | --- |
| Tanpa data pribadi siswa | Data latih, data uji, dan contoh tidak memuat nama, kontak, alamat, nomor identitas, sekolah, atau data lain yang dapat mengenali murid. Data bersifat sintetis atau dataset terbuka dan legal. |
| Tanpa wajah dan suara siswa | Wajah, suara, dan foto murid atau orang lain **tidak** dipakai sebagai data latih atau uji (termasuk di Teachable Machine). Bahan latih berupa benda, gambar atau pola sintetis, atau data tabel. |
| Tanpa akun pribadi wajib | Tidak ada kegiatan yang mewajibkan murid memiliki atau memakai akun pribadi di layanan daring. Layanan AI daring hanya didemonstrasikan guru (akun sekolah atau guru) tanpa memasukkan data pribadi; syarat usia layanan `[belum terverifikasi]` diperiksa guru lebih dulu. |
| Tanpa data pribadi pada permintaan | Guru dan murid tidak menaruh data pribadi, rahasia, atau tugas bernilai pada layanan daring. |
| Rahasia | Kunci layanan dan `.env` tidak di-commit atau dibagikan. |
| Data terbuka dan legal | Sumber dataset dan lisensinya dicatat (`D-XI1-M5`); data yang syaratnya tidak jelas tidak dipakai. |
| Keterbukaan | Murid mencatat bila keluaran AI dipakai dalam tugas; keluaran AI diverifikasi dan tidak disajikan sebagai fakta. |
| Hasil karya | Model dan data hasil latih tidak memuat data pribadi; tidak ada data murid disimpan di repositori ini. |
| Kebijakan sekolah | Kebijakan sekolah dan orang tua tentang layanan AI dan perangkat diikuti; penyusun tidak memverifikasi kebijakan Kemendikdasmen tentang AI di sekolah `[belum terverifikasi]`. |

## 9. Hubungan dengan issue lain

| Issue | Hubungan |
| --- | --- |
| #66, #83 | Riset buku AI; sumber bagian 7. |
| #92 dan silabus v1.1 | Blok fondasi dan penomoran minggu kelas X (bagian 0 dan 3). |
| #69 (modul pendamping) | Tumpang tindih tipis pada verifikasi konten (E-LD-b, F-LD-b) dan privasi; hindari dua modul yang sama. `[asumsi]` |
| #68 (jalur C, IoT) | Terpisah; kelak data sensor dapat menjadi bahan jalur D `[asumsi]`. |

## 10. Pertanyaan terbuka untuk pemilik

Keputusan milik pemilik; setiap opsi disertai rekomendasi penyusun.

| No. | Pertanyaan | Opsi | Rekomendasi |
| --- | --- | --- | --- |
| 1 | Alat dan coding jalur D | (1) tanpa kode saja; (2) bertahap: tanpa kode di X, Python di XI-XII; (3) Python sejak X; (4) JS/TS selaras jalur B (bagian 5.2) | **Opsi 2**; cadangan opsi 4 |
| 2 | Bahasa pemrograman bila ada kode | Python; JS/TS | **Python**; JS/TS bila sekolah ingin satu toolchain dengan jalur B |
| 3 | Layanan AI daring (generatif) | hanya demonstrasi guru; tidak dipakai sama sekali; murid memakai akun sekolah | **Hanya demonstrasi guru** |
| 4 | Teachable Machine | dipertahankan sebagai pengayaan dengan data benda; dihapus | **Pengayaan dengan data benda** (tanpa wajah dan suara) |
| 5 | Seri Buku AI SMA | tautkan setelah guru membaca isinya dan lisensi dijelaskan penerbit; tautkan sekarang tanpa pembacaan; tidak ditautkan | **Tautkan setelah dibaca dan lisensi dijelaskan** (minta kejelasan ke InTech Press) |
| 6 | Prasyarat | tanpa prasyarat; wajib jalur A atau B lebih dulu | **Tanpa prasyarat**; Python diajarkan di `D-XI1-M2..M4` (tiga minggu mungkin kurang, perlu diuji di kelas) |
| 7 | Posisi AI di luar CP | jalur D disebut pengayaan di luar CP; dihubungkan ke modul pendamping #69 | **Disebut pengayaan di luar CP** dan tidak dihitung pemenuhan CP |
| 8 | Kesiapan lab | semua komputer dapat memasang Orange dan Python; hanya sebagian | Diputuskan setelah survei lab; spesifikasi minimum `[belum terverifikasi]` |

## 11. Sumber dan batasan

- Satu-satunya kutipan CP berasal dari [`silabus.md` bagian 1.3](silabus.md)
  (disalin persis; sumber asal panduan 2025 yang dibuka penyusun silabus).
  Dokumen ini tidak memverifikasi ulang panduan itu.
- Rencana mingguan, tujuan, dan semua penilaian adalah rancangan penyusun
  dan belum diuji di kelas.
- Fakta alat yang tidak tercantum di bagian 12 ditandai
  `[belum terverifikasi]`.
- Isi buku seri AI SMA tidak dibaca (lihat riset).
- Dokumen ini tidak mencatat persetujuan pemilik atas jalur D.

## 12. Sumber luar yang dibuka (akses 2026-11-19)

| Sumber | URL | Hasil |
| --- | --- | --- |
| Orange Data Mining, beranda | `https://orangedatamining.com/` | Terbaca: pernyataan sumber terbuka, unduhan versi 3.41.0, platform Windows/Mac OS/lainnya; lisensi, harga, akun, mode luring tidak tertera. |
| Orange, berkas lisensi | `https://raw.githubusercontent.com/biolab/orange3/master/LICENSE` | GPL-3.0 atau lebih baru. |
| Orange, dokumentasi | `https://docs.orangedatamining.com/` | Tidak terjangkau (kegagalan DNS). |
| Teachable Machine, FAQ | `https://teachablemachine.withgoogle.com/faq` | Halaman terbaca hanya judul; isi FAQ **tidak** terverifikasi. |
| Teachable Machine, repositori komunitas | `https://github.com/googlecreativelab/teachablemachine-community` | Apache-2.0; "melatih dan menjalankan model di peramban" (TensorFlow.js); privasi data tidak dinyatakan; disebut eksperimen, bukan produk resmi Google. |
| Hasil pencarian tentang Teachable Machine | (hasil pencarian web, sumber sekunder, tidak otoritatif) | Menyebut data tetap di perangkat dan tanpa akun untuk dasar; tidak diverifikasi ke FAQ resmi. |
| scikit-learn, berkas lisensi | `https://raw.githubusercontent.com/scikit-learn/scikit-learn/main/COPYING` | BSD 3-Clause. |
| Ollama, berkas lisensi | `https://raw.githubusercontent.com/ollama/ollama/main/LICENSE` | MIT. |
| Riset seri Buku AI SMA | [`riset-buku-ai-onno-w-purbo.md`](riset-buku-ai-onno-w-purbo.md) | Dibaca di repositori ini. |

## Changelog

| Versi | Tanggal | Perubahan |
| --- | --- | --- |
| v0.1.0 | 2026-11-18 | Draf awal jalur D (issue #84): tujuan, rencana mingguan kelas X-XII, pemetaan CP dengan catatan AI di luar rumusan CP, opsi alat dan coding dengan rekomendasi, posisi seri Buku AI SMA, etika dan privasi, pertanyaan terbuka. Status DRAF. |
