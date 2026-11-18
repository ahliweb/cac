# Silabus Pembelajaran Coding SMA — v1.1 (DRAF)

- **Version:** v1.1.0-draf
- **Last updated:** 2026-11-18
- **Status:** DRAF — belum disetujui pemilik program. [Silabus v1.0](silabus.md) tetap berlaku sampai pemilik menyetujui v1.1 (issue #92).
- **Changeset:** Draf v1.1 menerapkan blok fondasi kelas X (tujuh minggu, kelas bersama lintas jalur) sesuai delapan keputusan pemilik 2026-11-18; kelas X semester 1 dan 2 jalur A dan B disusun ulang; pemetaan CP dan jembatan OSN diperbarui.

> **DRAF — belum disetujui pemilik.** Dokumen ini adalah revisi
> [`silabus.md`](silabus.md) (v1.0, disetujui 2026-11-18) menjadi v1.1 dan
> merupakan konten karangan menurut
> [ADR-0007](../../architecture/adr/0007-authored-learning-content.md):
> kutipan CP di bagian 1 adalah transkripsi sumber resmi (disalin persis
> dari v1.0); selebihnya rancangan penyusun. Rancangan penyusun yang belum
> diputuskan pemilik ditandai `[asumsi]`. **Bagian ini tidak mencatat
> persetujuan apa pun atas v1.1**; yang tercatat hanyalah delapan keputusan
> pemilik atas usulan blok fondasi (bagian 9.1). Sampai pemilik menyetujui
> v1.1, data `data/sma-coding/` tetap mengikuti v1.0 dan `silabus.md` tetap
> menjadi sumber resmi corpus. Usulan asal:
> [`usulan-fondasi-kelas-x.md`](usulan-fondasi-kelas-x.md).

## 0. Cara membaca dokumen ini

- `[belum terverifikasi]` berarti butir itu tidak dapat dipastikan dari
  sumber resmi yang benar-benar dibuka penyusun pada 2026-11-18. Butir
  seperti itu tidak boleh diperlakukan sebagai fakta.
- `[asumsi]` berarti keputusan perancangan penyusun, bukan data resmi.
- Kode minggu berbentuk `jalur-kelas-semester-M<n>`, misalnya `A-X1-M3`
  (jalur A, kelas X, semester 1, minggu 3). Semester: `X1`, `X2` (Fase E);
  `XI1`, `XI2`, `XII1`, `XII2` (Fase F).
- Kode minggu **blok fondasi** berbentuk `FND-X1-M<n>` (fondasi, kelas X,
  semester 1, minggu `n`); blok ini kelas bersama lintas jalur (bagian 3.0).
- **Penting (v1.1):** pada kelas X semester 1, nomor `M<n>` jalur A dan B
  adalah **nomor minggu kalender semester**. Minggu 1-7 dipakai blok
  fondasi, sehingga minggu jalur semester 1 dimulai dari `M8`
  (`A-X1-M8`..`A-X1-M14`). Kode minggu kelas X pada v1.1 **tidak sama**
  maknanya dengan v1.0; tabel padanan ada di bagian 3.0.
- Kode butir CP berbentuk `E-BK-a` (Fase E, elemen Berpikir
  Komputasional, butir a). Pembagian butir (a, b, c, ...) adalah
  pemenggalan oleh penyusun atas rumusan CP pada tanda titik koma; kata-kata
  CP tidak diubah.

## 1. Sumber resmi dan status verifikasi

**Tanggal dicek: 2026-11-18.**

### 1.1 Yang terverifikasi dari dokumen resmi

| Butir | Nilai | Bukti |
| --- | --- | --- |
| Dokumen | *Panduan Mata Pelajaran Informatika, Fase D – F, SMP/MTs, SMA/MA/SMK/MAK* | Halaman judul dokumen. |
| Penerbit | Badan Standar, Kurikulum, dan Asesmen Pendidikan (BSKAP), Kementerian Pendidikan Dasar dan Menengah Republik Indonesia; Pusat Kurikulum dan Pembelajaran, 2025 | Halaman judul, halaman penerbit, dan kolofon. |
| Berkas yang dibuka | `https://repositori.kemendikdasmen.go.id/33634/1/32.%20Panduan%20Mata%20Pelajaran%20Informatika.pdf` (domain pemerintah; PDF diunduh dan teksnya diekstrak penuh) | Metadata PDF: dibuat 12 September 2025. |
| Salinan yang sama di portal kurikulum | `https://kurikulum.kemdikbud.go.id/file/panduan/dokumen/32.%20Panduan%20Mata%20Pelajaran%20Informatika.pdf` | Hanya muncul di hasil pencarian; **tidak dibuka** (DNS domain itu tidak terjangkau dari lingkungan penyusun). Kesamaan isi dengan berkas repositori `[belum terverifikasi]`. |
| Elemen CP | Berpikir Komputasional, Literasi Digital, Analisis Data, Algoritma dan Pemrograman (empat elemen; kerangka dokumen) | Bagian B, tabel "Elemen dan deskripsi elemen". |
| Elemen CP per fase | Fase E memuat butir Berpikir Komputasional dan Literasi Digital; Fase F memuat Berpikir Komputasional, Literasi Digital, Analisis Data, dan Algoritma dan Pemrograman | Bagian B.d, "Capaian Pembelajaran". |
| Pemetaan fase ke kelas | Fase E: SMA/MA/SMK/MAK/Paket C kelas X; Fase F: SMA/MA/Paket C kelas XI dan XII | Contoh alur tujuan pembelajaran, bagian D.2. |
| Catatan dokumen tentang urutan | "Penomoran pada elemen Capaian Pembelajaran bukan merupakan suatu urutan pembelajaran ... penyusunan alur tujuan pembelajaran disesuaikan dengan karakteristik mata pelajaran dan tidak harus mengikuti urutan elemen." | Bagian B.d. |
| Catatan dokumen tentang beban | "Semua elemen harus dicakup dalam pembelajaran sesuai Capaian Pembelajaran, namun beban belajar yang dialokasi pada setiap elemen ... tidak harus sama." Beban dan proses sebaiknya dirancang sesuai karakteristik satuan pendidikan. | Bagian B.c. |

Catatan jujur: dokumen yang dibuka adalah **panduan** yang mengutip CP,
bukan teks keputusan pemerintah (SK) itu sendiri. Apakah rumusan CP di
panduan identik huruf demi huruf dengan lampiran SK `[belum terverifikasi]`.

### 1.2 Regulasi yang berlaku (belum terverifikasi dari dokumen resmi)

| Butir | Nilai | Status |
| --- | --- | --- |
| Keputusan induk CP | Keputusan Kepala BSKAP Nomor 046/H/KR/2025, berlaku sejak 16 Juli 2025, mencabut Keputusan Kepala Badan Nomor 032/H/KR/2024 | `[belum terverifikasi]`: hanya terbaca dari situs sekunder (hasil pencarian: komunitasbelajar.id, kurikulummerdeka.com, pojoksatu.id); teks SK resmi dan URL domain pemerintahnya tidak berhasil dibuka. |
| Perubahan 2026 | Keputusan Kepala BKPDM Nomor 020 Tahun 2026, ditetapkan 23 Juni 2026, mengubah 046/H/KR/2025 hanya untuk Agama dan Budi Pekerti; CP mata pelajaran lain (termasuk Informatika) tetap | `[belum terverifikasi]`: dari artikel sekunder (gebrak.id) yang hanya menulis "Sumber: Kemendikdasmen" tanpa tautan. |
| URL resmi SK | -- | `[belum terverifikasi]`: tidak ditemukan. Pemilik diminta memberi tautan resmi (bagian 9). |
| Alokasi jam pelajaran (JP) Informatika per kelas/minggu | -- | `[belum terverifikasi]`: dokumen yang dibuka tidak memuat struktur kurikulum SMA. Draf ini memakai asumsi di bagian 2. |

### 1.3 Kutipan CP (apa adanya dari panduan, bagian B.d)

Hanya spasi dan pemenggalan baris yang dinormalkan. Elemen Fase E dalam
dokumen hanya dua, sebagaimana tertulis.

**Fase E**

*2.1 Berpikir Komputasional* — "Pada akhir fase E, murid mampu memahami
konsep struktur data dan algoritma standar; menerapkan proses komputasi
yang dilakukan manusia secara mandiri atau berkelompok untuk mendapatkan
data yang berkualitas; menerapkan algoritma dan struktur data standar untuk
menghasilkan berbagai solusi dalam menyelesaikan persoalan; menuliskan
solusi rancangan program sederhana dalam format pseudocode yang dekat
dengan bahasa komputer; memahami model dan menyimulasikan dinamika
Input-Process-Output dalam sebuah komputer Von Neumann, serta memahami
peran sistem operasi."

*2.2 Literasi Digital* — "Pada akhir fase E, murid mampu memahami
penggunaan mesin pencari dengan variabel yang lebih banyak; mengetahui
ekosistem periksa fakta untuk memilah fakta dan bukan; menggunakan cara
membaca lateral untuk mengevaluasi berbagai informasi digital; memahami
pemanfaatan perangkat teknologi yang lebih beragam untuk pengolah dokumen,
lembar kerja, dan presentasi; memahami konsep dan penerapan serta
konfigurasi keamanan dasar untuk konektivitas jaringan data lokal dan
internet baik kabel maupun nirkabel; memahami pemanfaatan media digital
untuk produksi dan diseminasi konten, partisipasi dan kolaborasi;
menghargai hak atas kekayaan intelektual, mengenal profesi bidang
Informatika, memahami penerapan digitalisasi budaya Indonesia, menyaring
konten negatif di dunia digital; menerapkan pengelolaan kata sandi dengan
manajer kata sandi, dan menerapkan autentikasi dua langkah secara
sederhana, serta menerapkan konfigurasi privasi dan keamanan pada akun
platform digital."

**Fase F**

*3.1 Berpikir Komputasional* — "Pada akhir fase F, murid mampu memahami
alur proses pengembangan program atau produk teknologi digital;
menganalisis persoalan yang bisa menghasilkan lebih dari satu solusi dengan
pemahamannya terhadap beberapa strategi algoritmik untuk menghasilkan
beberapa alternatif solusi dari satu persoalan dengan memberikan justifikasi
efisiensi, kelebihan, dan keterbatasan dari setiap alternatif solusi; mampu
memilih dan menerapkan solusi terbaik, paling efisien, dan optimal dengan
merancang struktur data yang lebih kompleks dan abstrak; serta mengenali
berbagai model jaringan komputer serta mampu melakukan pengiriman data
antar perangkat dalam jaringan komputer dan troubleshooting permasalahan
jaringan komputer."

*3.2 Literasi Digital* — "Pada akhir fase F, murid mampu memahami
penggunaan mesin pencari untuk melakukan riset; mengevaluasi kebenaran
konten menggunakan verifikasi teks, gambar, dan video; menggunakan cara
membaca lateral untuk mengevaluasi informasi digital yang kompleks;
merancang kebutuhan sistem komputer sesuai kebutuhan pengguna; memahami
konsep dan penerapan serta konfigurasi keamanan lanjut untuk konektivitas
jaringan data lokal dan internet baik kabel maupun nirkabel; mengkreasi
konten digital dengan peralatan dan metode yang bervariasi; memahami hukum
dan perundang-undangan terkait isu digital di Indonesia; memahami
pemanfaatan teknologi digital dalam demokrasi; menerapkan pengelolaan kata
sandi dengan manajer kata sandi dan autentikasi dua langkah dengan beragam
moda; serta memahami pemanfaatan platform loka pasar, perbankan digital,
dompet digital beserta aspek keamanannya."

*3.3 Analisis Data* — "Pada akhir fase F, murid mampu memanfaatkan sumber
data yang terbuka, terpercaya, dan legal untuk mengolah data untuk
pengambilan keputusan dan prediksi secara efektif, efisien, dan optimal
tanpa atau dengan komputer."

*3.4 Algoritma dan Pemrograman* — "Pada akhir fase F, murid mampu memahami
konsep strategi algoritmik; mengembangkan program komputer terstruktur
dalam notasi algoritma atau notasi lain berdasarkan strategi algoritmik
yang tepat; mengembangkan, melakukan pemeliharaan, dan penyempurnaan
algoritma standar ke dalam kode sumber program dengan memperhatikan
kualitasnya; merancang dan mengimplementasikan sebuah program yang
menggunakan struktur data kompleks dan tepat menggunakan library atau
perangkat yang tersedia."

### 1.4 Kode butir CP yang dipakai draf ini (pemenggalan penyusun)

| Kode | Butir (kata CP, dipersingkat untuk rujukan) |
| --- | --- |
| E-BK-a | konsep struktur data dan algoritma standar |
| E-BK-b | proses komputasi manusia untuk data berkualitas |
| E-BK-c | menerapkan algoritma dan struktur data standar |
| E-BK-d | solusi program sederhana dalam format pseudocode |
| E-BK-e | model Input-Process-Output Von Neumann dan peran sistem operasi |
| E-LD-a | mesin pencari |
| E-LD-b | ekosistem periksa fakta |
| E-LD-c | membaca lateral |
| E-LD-d | perangkat pengolah dokumen, lembar kerja, presentasi |
| E-LD-e | keamanan dasar konektivitas jaringan |
| E-LD-f | media digital untuk produksi dan diseminasi konten, partisipasi, kolaborasi |
| E-LD-g | hak atas kekayaan intelektual |
| E-LD-h | profesi bidang Informatika |
| E-LD-i | digitalisasi budaya Indonesia |
| E-LD-j | menyaring konten negatif |
| E-LD-k | manajer kata sandi dan autentikasi dua langkah |
| E-LD-l | konfigurasi privasi dan keamanan akun platform |
| F-BK-a | alur proses pengembangan program atau produk digital |
| F-BK-b | lebih dari satu solusi, strategi algoritmik, justifikasi efisiensi |
| F-BK-c | memilih solusi terbaik dengan struktur data lebih kompleks dan abstrak |
| F-BK-d | model jaringan komputer, pengiriman data, troubleshooting |
| F-LD-a | mesin pencari untuk riset |
| F-LD-b | verifikasi kebenaran konten |
| F-LD-c | membaca lateral informasi kompleks |
| F-LD-d | merancang kebutuhan sistem komputer sesuai kebutuhan pengguna |
| F-LD-e | keamanan lanjut konektivitas jaringan |
| F-LD-f | mengkreasi konten digital |
| F-LD-g | hukum dan perundang-undangan isu digital |
| F-LD-h | teknologi digital dalam demokrasi |
| F-LD-i | manajer kata sandi dan autentikasi dua langkah beragam moda |
| F-LD-j | loka pasar, perbankan digital, dompet digital dan keamanannya |
| F-AD-a | sumber data terbuka, terpercaya, legal untuk keputusan dan prediksi |
| F-AP-a | konsep strategi algoritmik |
| F-AP-b | program terstruktur berdasarkan strategi algoritmik |
| F-AP-c | pengembangan, pemeliharaan, penyempurnaan algoritma standar, kualitas kode |
| F-AP-d | program dengan struktur data kompleks memakai library atau perangkat |

## 2. Struktur program dan asumsi

| Butir | Nilai | Status |
| --- | --- | --- |
| Kelas dan fase | X = Fase E; XI dan XII = Fase F | Terverifikasi (bagian 1.1). |
| Semester | Dua per kelas: X1, X2, XI1, XI2, XII1, XII2 (enam semester per jalur) | `[asumsi]` |
| Minggu per semester | 14 minggu materi + 2 minggu cadangan (libur, ujian sekolah, remedial) | `[asumsi]` |
| Alokasi JP | Satu pertemuan 3 JP x 45 menit per minggu per jalur; sekolah menyesuaikan | Ditetapkan pemilik 2026-11-18. Angka JP resmi kurikulum tetap `[belum terverifikasi]`. |
| Hubungan jalur | Murid memilih satu jalur (A, B, atau kelak C); boleh mengambil jalur lain bila waktu sekolah mengizinkan. Sebelum memilih jalur, semua murid kelas X mengikuti blok fondasi bersama (bagian 3.0). | Ditetapkan pemilik 2026-11-18; blok fondasi bersama: keputusan pemilik 2026-11-18 (bagian 9.1). |
| Pola tiap semester | Minggu 1-12 materi; minggu 13 proyek mini; minggu 14 asesmen dan refleksi. Kelas X semester 1: minggu 1-7 blok fondasi (FND-X1-M1..M7), minggu 8-12 materi jalur; asesmen fondasi bersifat formatif dan dilebur ke asesmen minggu 14. | `[asumsi]`; blok fondasi dan asesmen formatif: keputusan pemilik 2026-11-18 (bagian 9.1). |
| Nilai dasar | CP wajib tercakup di pembelajaran Informatika sekolah; silabus coding ini hanya membahas butir yang dapat dicapai lewat coding. Butir lain ada di bagian 4.3. | Rancangan penyusun. |

Prinsip rancangan: (1) mengikuti catatan panduan bahwa urutan penomoran CP
bukan urutan belajar; (2) Fase E menekankan konsep dasar (pseudocode,
struktur data dan algoritma standar); (3) Fase F menekankan strategi
algoritmik, data, proses rekayasa, dan program terstruktur dengan library;
(4) v1.1: kelas X dibuka dengan blok fondasi informatika dasar yang sama
untuk semua jalur, sebelum murid memilih jalur.

## 3. Rencana mingguan

Kolom: **Topik** | **Tujuan** (murid mampu ...) | **Keluaran** | **Latihan**.
Seluruh data latihan bersifat sintetis (bagian 8).

### 3.0 Blok fondasi kelas X (bersama lintas jalur)

Keputusan pemilik 2026-11-18 (bagian 9.1): semua murid kelas X mengikuti
**blok fondasi informatika dasar tujuh minggu** sebelum memilih jalur
(opsi (b) usulan, enam minggu, ditambah satu minggu perangkat pengolah
dokumen, lembar kerja, dan presentasi, butir E-LD-d). Blok ini menempati
minggu 1-7 kelas X semester 1 dan sama untuk jalur A, B, serta jalur C dan D
bila kelak disetujui. Seluruh latihan memakai data sintetis, akun uji, dan
perangkat lab; tidak ada data pribadi siswa (bagian 7.3). Setiap minggu
`[asumsi]`: sekitar 1 JP konsep dan 2 JP praktik.

#### FND-X1 (kelas X, semester 1; blok fondasi bersama lintas jalur)

| Minggu | Topik | Tujuan | Keluaran | Latihan |
| --- | --- | --- | --- | --- |
| FND-X1-M1 | Komputer dan perangkat keras; model Input-Proses-Output Von Neumann | menyebut fungsi komponen (CPU, memori, penyimpanan, perangkat masukan dan keluaran, papan induk, catu daya); menjelaskan dan menyimulasikan siklus I-P-O komputer Von Neumann; membaca spesifikasi perangkat | diagram I-P-O beranotasi; lembar spesifikasi komputer lab | kegiatan utama: simulasi I-P-O tanpa komputer (murid berperan CPU, memori, dan perangkat masukan/keluaran menjalankan kartu instruksi sederhana); membaca spesifikasi komputer lab lewat informasi sistem; mengenali komponen dari foto; opsional bila lab menyediakan komponen bekas: mengenali komponen dari komponen bekas (perangkat yang masih dipakai tidak dibongkar) |
| FND-X1-M2 | Perangkat lunak, sistem operasi, berkas, dan lisensi | membedakan perangkat lunak sistem dan aplikasi; menjelaskan peran sistem operasi (mengelola proses, memori, berkas, perangkat, antarmuka); mengelola berkas dan folder; membedakan jenis lisensi (proprietari, sumber terbuka, domain publik) dan memberi atribusi | peta peran sistem operasi; struktur folder yang rapi; tabel jenis lisensi | melihat daftar proses lewat pengelola tugas (proses sistem tidak dihentikan); menata folder dan penamaan berkas pada akun uji; membaca satu teks lisensi sumber terbuka yang pendek dan mengisi tabel hak dan kewajiban |
| FND-X1-M3 | Representasi data: biner, heksadesimal, teks, gambar sederhana | mengonversi bilangan desimal, biner, dan heksadesimal; menjelaskan bit dan byte; menjelaskan bahwa teks disimpan sebagai kode karakter; menjelaskan gambar sebagai kisi piksel dan warna sebagai komponen merah-hijau-biru | tabel konversi; lembar kode karakter; gambar 8x8 dalam bentuk deret bit | konversi manual dengan lembar kerja; menyandikan kata fiktif dengan tabel kode karakter; menggambar gambar 8x8 hitam-putih di kertas kotak lalu menuliskannya sebagai deret bit; memilih warna dan membaca kode heksadesimalnya di aplikasi gambar |
| FND-X1-M4 | Jaringan dan internet (konsep) | membedakan jaringan lokal dan jaringan luas, kabel dan nirkabel, klien dan server; menyebut peran router, switch, dan titik akses; menjelaskan alamat IP, DNS, dan HTTP/HTTPS secara konseptual; menguraikan bagaimana halaman web sampai ke peramban | peta jaringan sekolah (disederhanakan); diagram alur "membuka halaman web" | kegiatan utama: permainan peran (klien, server, DNS memakai kartu) untuk satu permintaan halaman; menggambar peta jaringan lab dari penjelasan guru tanpa alamat atau kredensial nyata; melihat alamat IP lokal komputer lab lewat pengaturan sistem |
| FND-X1-M5 | Pengiriman data dan pemecahan masalah jaringan dasar | menjelaskan data dikirim dalam potongan (paket) antarperangkat; mengurutkan diagnosis dari fisik (kabel, Wi-Fi) ke alamat IP, DNS, lalu layanan; memakai alat uji sederhana | diagram alir diagnosis; catatan diagnosis tiga skenario | kegiatan utama: kartu skenario gangguan sintetis ("kabel lepas", "alamat salah", "DNS tidak menjawab") dengan simulasi peran; `ping` ke gateway lab dan alamat lokal komputer sendiri; opsional bila lab menyediakan jaringan lokal terisolasi: berbagi satu berkas antarkomputer di jaringan itu; uji ke internet publik hanya bila kebijakan sekolah mengizinkan `[asumsi]` |
| FND-X1-M6 | Keamanan dasar dan etika digital | menyusun kata sandi yang kuat dan memakai manajer kata sandi; menerapkan autentikasi dua langkah secara sederhana; menerapkan konfigurasi privasi dan keamanan pada akun uji; menjelaskan langkah keamanan konektivitas dasar (kata sandi bawaan perangkat jaringan diganti, jaringan nirkabel terenkripsi, kewaspadaan pada jaringan publik, tanda HTTPS); mengenali pesan tipuan (phishing) dasar; menghargai hak atas kekayaan intelektual | lembar periksa keamanan akun; daftar periksa keamanan konektivitas | audit kata sandi dengan bahan sintetis; mengatur akun uji dengan manajer kata sandi lokal bersumber terbuka `[asumsi]`; demonstrasi autentikasi dua langkah oleh guru (murid tidak wajib memasang apa pun di ponsel pribadi); membandingkan dua konfigurasi privasi pada akun uji; mengenali pesan tipuan sintetis |
| FND-X1-M7 | Perangkat pengolah dokumen, lembar kerja, dan presentasi `[asumsi]` | memilih perangkat yang sesuai kebutuhan (dokumen, lembar kerja, atau presentasi); menyusun dokumen terstruktur (judul, gaya, daftar, tabel, gambar beratribusi); memakai rumus dasar lembar kerja (jumlah, rata-rata, minimum, maksimum, kondisi sederhana) dan membuat grafik sederhana; menyusun presentasi ringkas dan terbaca (satu gagasan per slide, kontras cukup); menyimpan dan menukar berkas dalam format yang dapat dibuka di perangkat lain (misalnya format terbuka atau PDF) | dokumen laporan satu halaman bergaya; lembar kerja dengan rumus dan satu grafik; presentasi empat slide | menyusun laporan kegiatan klub fiktif dengan judul, daftar, dan satu tabel; merekap nilai sintetis (nama samaran seperti Murid-01) dengan rumus lalu membuat grafik batang; menyusun empat slide tentang satu topik fondasi (misalnya peta jaringan lab) dan mengekspornya ke PDF; perangkat mengikuti kesiapan lab (sumber terbuka atau berbasis web) `[asumsi]`; tidak memakai berkas atau data pribadi siswa |

Catatan perancangan:

- **Representasi data** (FND-X1-M3) dipertahankan sebagai **prasyarat**
  (keputusan pemilik, bagian 9.1): rumusan CP yang dikutip pada bagian 1.3
  tidak menyebutnya secara eksplisit, sehingga minggu ini **tidak dihitung
  sebagai pemenuhan butir CP mana pun** (bagian 4.4).
- **Praktik utama** blok fondasi adalah simulasi peran, kartu skenario, dan
  informasi sistem (keputusan pemilik). Komponen bekas dan jaringan lokal
  terisolasi hanya opsi bila lab menyediakannya; tanpa itu seluruh minggu
  tetap dapat dijalankan, bahkan tanpa internet.
- **Tidak ada pemrograman** di blok fondasi `[asumsi]`. Risiko: tujuh minggu
  tanpa menulis kode dapat terasa jauh dari pilihan jalur; mitigasi lewat
  praktik langsung (simulasi, diagnosis, dokumen dan lembar kerja) dan
  perkenalan jalur sesudahnya `[asumsi]`.
- **Asesmen fondasi bersifat formatif** (kuis singkat dan lembar praktik
  tiap minggu) dan dilebur ke asesmen minggu 14 kelas X semester 1; tidak
  ada minggu asesmen sendiri (keputusan pemilik, bagian 7.1).
- Perangkat pengolah dokumen, lembar kerja, dan presentasi (butir E-LD-d)
  menjadi satu minggu fondasi (FND-X1-M7) dan keluar dari daftar modul
  pendamping (issue #69).

#### Padanan nomor minggu kelas X: v1.0 ke v1.1

Dengan tujuh minggu fondasi, semester 1 hanya memiliki tujuh minggu jalur
(minggu 8-14: lima minggu materi, satu proyek mini, satu asesmen). Penyusun
`[asumsi]` menempuhnya dengan **menggabungkan** minggu v1.0 yang bersifat
pengantar atau berdekatan, dan **menggeser** tiga minggu struktur data
dasar (array satu dimensi, string, array dua dimensi / objek dan JSON) ke
awal semester 2. Sebagai imbalannya semester 2 melepaskan operasi bit
(pengayaan, jalur A) dan kata sandi serta HAKI (jalur B), serta
menggabungkan sepasang minggu yang berdekatan. Pola 14 minggu materi + 2
minggu cadangan per semester tetap.

Jalur A, semester 1:

| Dari v1.0 | Ke v1.1 | Catatan |
| --- | --- | --- |
| A-X1-M1 | FND-X1-M1..M2; A-X1-M8 | I-P-O dan sistem operasi pindah ke blok fondasi; lingkungan g++ tetap di A-X1-M8. |
| A-X1-M2 | A-X1-M8 | Digabung dengan lingkungan g++. |
| A-X1-M3, M4 | A-X1-M9 | Variabel, tipe, ekspresi, dan masukan/keluaran digabung. |
| A-X1-M5, M8 | A-X1-M10 | Percabangan dan logika Boolean digabung. |
| A-X1-M6, M7 | A-X1-M11 | Perulangan I dan II digabung. |
| A-X1-M9 | A-X1-M12 | Fungsi tetap. |
| A-X1-M10, M11, M12 | A-X2-M1, M2, M3 | Array satu dimensi, string, array dua dimensi digeser ke awal semester 2. |
| A-X1-M13 | A-X1-M13 | Proyek mini data berkualitas tanpa array (masukan berurutan) `[asumsi]`. |
| A-X1-M14 | A-X1-M14 | Asesmen; asesmen formatif fondasi dilebur di sini. |

Jalur A, semester 2:

| Dari v1.0 | Ke v1.1 | Catatan |
| --- | --- | --- |
| A-X2-M1, M2 | A-X2-M4 | Penelusuran galat dan aritmetika dasar digabung. |
| A-X2-M3 | A-X2-M5 | FPB, KPK, bilangan prima. |
| A-X2-M4 | A-X2-M6 | `vector`. |
| A-X2-M5, M6 | A-X2-M7 | Stack dan queue digabung `[asumsi]`. |
| A-X2-M7 | A-X2-M8 | Pencarian. |
| A-X2-M8, M9 | A-X2-M9, M10 | Bubble sort, insertion sort. |
| A-X2-M10, M11 | A-X2-M11, M12 | Pengantar rekursi; efisiensi intuitif. |
| A-X2-M12 | A-XI1-M3 | Operasi bit dasar (pengayaan) pindah ke pengayaan kelas XI (keputusan pemilik). |
| A-X2-M13, M14 | A-X2-M13, M14 | Tetap. |

Jalur B, semester 1:

| Dari v1.0 | Ke v1.1 | Catatan |
| --- | --- | --- |
| B-X1-M1 | FND-X1-M1..M2; B-X1-M8 | I-P-O dan sistem operasi pindah ke blok fondasi; peramban, editor, Bun, Git tetap di B-X1-M8. |
| B-X1-M2 | B-X1-M8 | Digabung dengan lingkungan kerja. |
| B-X1-M3, M4 | B-X1-M9 | Variabel, tipe, ekspresi dan masukan/keluaran digabung. |
| B-X1-M5, M8 | B-X1-M10 | Percabangan dan logika Boolean digabung. |
| B-X1-M6, M7 | B-X1-M11 | Perulangan I dan II digabung. |
| B-X1-M9 | B-X1-M12 | Fungsi tetap. |
| B-X1-M10, M11, M12 | B-X2-M1, M2, M3 | Array, string dan templat, objek dan JSON digeser ke awal semester 2. |
| B-X1-M13, M14 | B-X1-M13, M14 | Tetap; asesmen fondasi dilebur di M14. |

Jalur B, semester 2:

| Dari v1.0 | Ke v1.1 | Catatan |
| --- | --- | --- |
| B-X2-M1, M2, M3 | B-X2-M4, M5, M6 | HTML, CSS, DOM bergeser tiga minggu karena minggu yang digeser dari semester 1. |
| B-X2-M4, M5 | B-X2-M7, M8 | Stack dan queue; pencarian. |
| B-X2-M6, M7 | B-X2-M9 | Bubble sort dan insertion sort digabung `[asumsi]`; visualisasi langkah pindah ke proyek mini B-X2-M13. |
| B-X2-M8 | B-X2-M10 | Data berkualitas. |
| B-X2-M9 | (dihapus) | Kata sandi dan privasi: sudah dicakup FND-X1-M6 (keputusan pemilik). |
| B-X2-M10 | (dihapus) | HAKI dan lisensi: sudah dicakup FND-X1-M2 dan M6 (keputusan pemilik); lisensi pada proyek tetap muncul di B-XII1-M11. |
| B-X2-M11, M12 | B-X2-M11, M12 | Mesin pencari dan dokumentasi; Git. |
| B-X2-M13, M14 | B-X2-M13, M14 | Tetap. |

### 3.1 Jalur A: Algoritmik dengan C++

#### A-X1 (kelas X, semester 1; Fase E)

Minggu 1-7 adalah blok fondasi (bagian 3.0); minggu jalur dimulai dari M8.

| Minggu | Topik | Tujuan | Keluaran | Latihan |
| --- | --- | --- | --- | --- |
| M8 | Lingkungan g++, algoritma, pseudocode, diagram alir | mengompilasi program pertama; menulis solusi sederhana dalam pseudocode | `hello.cpp`; 3 pseudocode | cetak teks; tukar dua nilai; cari nilai terbesar dari tiga |
| M9 | Variabel, tipe data, ekspresi; masukan dan keluaran | memilih tipe (`int`, `long long`, `double`, `char`, `bool`) dan menulis ekspresi; membaca dan menulis data dengan `cin`/`cout` | program hitung berformat | luas dan keliling; pembagian bulat dan sisa; konversi suhu; rata-rata dua bilangan |
| M10 | Percabangan dan logika Boolean | memakai `if`/`else`, `switch`; menyusun tabel kebenaran; memakai `&&`, `||`, `!`, XOR | program bercabang; tabel kebenaran | genap/ganjil; kategori nilai (data sintetis); sederhanakan kondisi; implikasi sebagai kondisi |
| M11 | Perulangan | memakai `for` dan `while`; memakai perulangan bersarang, `break`, `continue` | program berulang; tabel keluaran | jumlah deret; pola bintang; tabel perkalian; uji prima sederhana |
| M12 | Fungsi dan parameter | memecah program menjadi fungsi | program modular | faktorial; FPB |
| M13 | Proyek mini: data berkualitas | memeriksa dan membersihkan data kecil dari masukan berurutan secara mandiri atau berkelompok (array baru diajarkan di awal semester 2) `[asumsi]` | laporan singkat | validasi rentang nilai; temukan data ganjil (sintetis) dari deretan masukan |
| M14 | Asesmen dan refleksi | menunjukkan penguasaan dasar pemrograman dan konsep fondasi | uji tulis dan praktik; jurnal | kuis kode; kuis konsep fondasi (formatif, dilebur di sini) |

#### A-X2 (kelas X, semester 2; Fase E)

| Minggu | Topik | Tujuan | Keluaran | Latihan |
| --- | --- | --- | --- | --- |
| M1 | Array satu dimensi | menyimpan dan mengolah barisan data | program array | maksimum, minimum, rata-rata; balik array |
| M2 | String | mengolah teks karakter demi karakter | program teks | palindrom; hitung vokal |
| M3 | Array dua dimensi | mengolah tabel data | program matriks | jumlah baris dan kolom; transpos |
| M4 | Ulasan dan penelusuran galat; aritmetika dasar | menemukan galat dengan mencetak nilai dan uji kecil; memakai paritas, habis dibagi, modulo | daftar galat umum; program aritmetika | perbaiki 5 program rusak; digit penjumlahan; sisa bagi |
| M5 | FPB, KPK, bilangan prima | menghitung FPB/KPK dan faktorisasi | program bilangan | faktorisasi prima; saringan sederhana |
| M6 | Struktur data: daftar (`vector`) | menyimpan data yang ukurannya berubah | program `vector` | tambah/hapus elemen; hitung frekuensi |
| M7 | Struktur data: tumpukan (stack) dan antrian (queue) | memakai prinsip LIFO dan FIFO | program stack dan queue | kurung seimbang; simulasi antrian loket (sintetis) |
| M8 | Pencarian sekuensial dan biner | memilih dan menulis pencarian | program pencarian | cari nilai; tebak angka dengan biner |
| M9 | Pengurutan: bubble sort | menulis dan menelusuri bubble sort | program urut | urutkan dan hitung pertukaran |
| M10 | Pengurutan: insertion sort | menulis insertion sort dan membandingkannya | program urut | bandingkan jumlah langkah |
| M11 | Pengantar rekursi | menulis fungsi rekursif sederhana | fungsi rekursif | faktorial dan Fibonacci rekursif |
| M12 | Efisiensi intuitif | menghitung banyak operasi dan membandingkan solusi | tabel perbandingan | jumlah langkah dua solusi |
| M13 | Proyek mini: pengelolaan data tabel | memakai struktur data dan pencarian/pengurutan standar pada satu masalah | program dan penjelasan | urut, cari, dan rekap data sintetis |
| M14 | Asesmen dan refleksi | menunjukkan struktur data dan algoritma standar | uji tulis dan praktik | kuis kode |

#### A-XI1 (kelas XI, semester 1; Fase F)

| Minggu | Topik | Tujuan | Keluaran | Latihan |
| --- | --- | --- | --- | --- |
| M1 | Proses rekayasa program | menguraikan spesifikasi, rancangan, implementasi, uji | dokumen rancangan satu halaman | rancang program rekap |
| M2 | Kualitas kode dan pengujian | menulis uji kasus dan menjaga kualitas kode | berkas uji kasus | tulis kasus uji tepi |
| M3 | Pencarian lengkap (complete search); operasi bit dasar (pengayaan, dari A-X2-M12 v1.0) | menyelesaikan masalah dengan mencoba semua kemungkinan; pengayaan: memakai `&`, `\|`, `^`, geser untuk mewakili subhimpunan | program pencarian lengkap; program bit (pengayaan) | subhimpunan jumlah tertentu; pengayaan: cek bit ke-k, tukar tanpa variabel bantu |
| M4 | Pencarian lengkap dan pemangkasan | memangkas pencarian yang tak perlu | program dengan pruning | kombinasi dengan batas |
| M5 | Greedy I | menyusun pilihan serakah dan alasannya | program greedy | pecahan koin |
| M6 | Greedy II | menguji kapan greedy benar atau salah | contoh tandingan | pemilihan kegiatan |
| M7 | Rekursi dan divide-and-conquer | memecah masalah menjadi submasalah | program rekursif | pangkat cepat; pencarian biner rekursif |
| M8 | Merge sort, quick sort, `std::sort` | menjelaskan dan memakai pengurutan efisien dengan pembanding sendiri | program urut | urut dengan dua kunci |
| M9 | Pustaka standar: `pair`, `set`, `map` | memakai struktur data siap pakai | program `map`/`set` | hitung kata; hapus duplikat |
| M10 | Antrian prioritas (heap) | memakai `priority_queue` | program heap | k nilai terbesar |
| M11 | Backtracking | menelusuri dan mundur pada ruang pencarian | program backtracking | permutasi; N-ratu kecil |
| M12 | Membandingkan strategi | menghasilkan dua solusi atau lebih untuk satu masalah dan menjustifikasi pilihan | laporan perbandingan | greedy vs pencarian lengkap vs DP kecil |
| M13 | Proyek mini | memadukan strategi pada satu masalah | program dan laporan | masalah pilihan kelompok |
| M14 | Asesmen dan refleksi | menunjukkan strategi algoritmik | uji tulis dan praktik | kuis kode |

#### A-XI2 (kelas XI, semester 2; Fase F)

| Minggu | Topik | Tujuan | Keluaran | Latihan |
| --- | --- | --- | --- | --- |
| M1 | Pemrograman dinamis: gagasan | mengenali submasalah tumpang-tindih; memoisasi | program memoisasi | Fibonacci dengan memoisasi |
| M2 | DP satu dimensi | merumuskan keadaan dan transisi | program DP | anak tangga; koin minimum |
| M3 | Knapsack 0/1 | merumuskan DP dua dimensi | program knapsack | pemilihan barang bernilai |
| M4 | DP pada string (pengayaan) | merumuskan DP pada dua barisan | program DP string | subsekuens persekutuan terpanjang |
| M5 | Graf: representasi | memakai matriks dan daftar ketetanggaan | program graf | derajat simpul; baca graf |
| M6 | BFS | menelusuri graf melebar | program BFS | jarak terpendek tak berbobot |
| M7 | DFS dan keterhubungan | menelusuri graf mendalam; menghitung komponen | program DFS | jumlah komponen |
| M8 | Grid sebagai graf | memodelkan grid sebagai graf | program grid | pewarnaan area; jalur labirin |
| M9 | Data bervolume besar I | membaca berkas dan masukan cepat | program berkas | baca CSV sintetis |
| M10 | Data bervolume besar II | mengelompokkan dan merekap data | program rekap | rekap per kategori dengan `map` |
| M11 | Sumber data terbuka dan legal | menilai sumber, lisensi, dan keterpercayaan data | catatan sumber | pilih dataset terbuka dan baca lisensinya |
| M12 | Prediksi sederhana | memakai rata-rata bergerak dan garis kecenderungan | program prediksi | prediksi nilai berikutnya dan evaluasi galat |
| M13 | Proyek: analisis data terbuka | mengolah data untuk keputusan dan prediksi | program dan laporan | analisis dataset pilihan |
| M14 | Asesmen dan refleksi | menunjukkan DP, graf, dan data | uji tulis dan praktik | kuis kode |

#### A-XII1 (kelas XII, semester 1; Fase F)

| Minggu | Topik | Tujuan | Keluaran | Latihan |
| --- | --- | --- | --- | --- |
| M1 | Lintasan terpendek I | menjelaskan lintasan terpendek berbobot | program BFS 0-1 / Bellman | jarak pada graf berbobot kecil |
| M2 | Dijkstra | menulis Dijkstra dengan `priority_queue` | program Dijkstra | rute termurah |
| M3 | Pohon rentang minimum | memakai algoritma Kruskal | program MST | biaya jaringan minimum |
| M4 | Himpunan saling lepas (DSU) | memakai DSU dengan kompresi lintasan | program DSU | komponen dinamis |
| M5 | Pohon berakar dan LCA | memodelkan pohon berakar; leluhur bersama terendah | program pohon | kedalaman; LCA sederhana |
| M6 | Aturan berhitung I | memakai aturan jumlah dan kali; permutasi dan kombinasi | program menghitung | banyaknya susunan |
| M7 | Aturan berhitung II | memakai segitiga Pascal dan inklusi-eksklusi dasar | program binomial | C(n,k) dengan Pascal |
| M8 | Aritmetika modular | memakai modulo dan pemangkatan modular | program modular | pangkat modular; invers modular sederhana |
| M9 | Pohon Fenwick | memakai Fenwick untuk jumlah prefiks | program Fenwick | pembaruan titik dan kueri rentang |
| M10 | Segment tree (pengayaan) | memakai pohon segmen dasar | program segment tree | kueri minimum rentang |
| M11 | Geometri dasar | memakai koordinat, jarak Euclid, Pythagoras | program geometri | jarak dua titik; luas poligon sederhana |
| M12 | Program multi-berkas dan library | memecah program menjadi header dan berkas sumber | proyek multi-berkas | pindahkan fungsi graf ke pustaka sendiri |
| M13 | Proyek | merancang dan menulis program dengan struktur data kompleks | program dan laporan | proyek pilihan kelompok |
| M14 | Asesmen dan refleksi | menunjukkan graf, pohon, berhitung | uji tulis dan praktik | kuis kode |

#### A-XII2 (kelas XII, semester 2; Fase F)

| Minggu | Topik | Tujuan | Keluaran | Latihan |
| --- | --- | --- | --- | --- |
| M1 | Pemeliharaan program I | memperbaiki dan merapikan solusi lama | daftar perbaikan | refaktor 2 solusi semester lalu |
| M2 | Pemeliharaan program II | mengoptimalkan solusi dan mencatat alasan | catatan optimasi | percepat solusi lambat |
| M3 | Memodelkan masalah | menerjemahkan soal cerita menjadi graf atau DP | lembar pemodelan | 4 soal cerita |
| M4 | Backtracking dan pruning lanjutan | memangkas ruang pencarian dengan cerdas | program backtracking | teka-teki angka |
| M5 | Latihan terpadu I | memilih strategi dan struktur data tepat | solusi dan catatan | set soal bergaya OSN (disusun terpisah) |
| M6 | Latihan terpadu II | sama, dengan batas waktu | solusi dan catatan | kontes mini kelas |
| M7 | Latihan terpadu III | menganalisis kesalahan jawaban | catatan analisis galat | tinjau jawaban salah |
| M8 | Latihan terpadu IV | menyajikan beberapa alternatif solusi dan justifikasi | laporan alternatif | satu soal, dua solusi |
| M9 | Ulasan struktur data | memilih struktur data untuk kebutuhan | tabel pemilihan | studi kasus |
| M10 | Ulasan strategi | memilih antara greedy, DP, pencarian lengkap | tabel pemilihan | studi kasus |
| M11 | Proyek akhir: rancangan | merancang proyek akhir | dokumen rancangan | pilih topik |
| M12 | Proyek akhir: implementasi dan pengujian | mengimplementasikan dan menguji | program dan uji | sprint implementasi |
| M13 | Proyek akhir: presentasi dan portofolio | mempresentasikan dan mengarsipkan | presentasi; portofolio | demo |
| M14 | Asesmen dan refleksi | menunjukkan seluruh jalur | uji tulis dan praktik; jurnal | kuis kode |

### 3.2 Jalur B: Web dengan JavaScript, TypeScript, dan Bun

#### B-X1 (kelas X, semester 1; Fase E)

Minggu 1-7 adalah blok fondasi (bagian 3.0); minggu jalur dimulai dari M8.

| Minggu | Topik | Tujuan | Keluaran | Latihan |
| --- | --- | --- | --- | --- |
| M8 | Lingkungan kerja: peramban, editor, Bun, Git; algoritma dan pseudocode | menjalankan skrip pertama; menulis pseudocode yang dekat dengan bahasa komputer | `halo.js`; 3 pseudocode | `console.log`; tukar dua nilai; nilai terbesar |
| M9 | Variabel, tipe, ekspresi (JS); masukan dan keluaran | memakai `let`, `const`, `number`, `string`, `boolean`; membaca masukan (argumen berkas perintah atau formulir) dan menulis keluaran | skrip hitung yang berinteraksi | luas dan keliling; konversi suhu |
| M10 | Percabangan dan logika Boolean | memakai `if`/`else`, `switch`; memakai operator logika; `===` dan nilai "truthy/falsy" | skrip bercabang; tabel kebenaran | genap/ganjil; kategori nilai (sintetis); sederhanakan kondisi |
| M11 | Perulangan | memakai `for`, `while`; memakai perulangan bersarang, `break`, `continue` | skrip berulang; skrip tabel | jumlah deret; pola; tabel perkalian; uji prima |
| M12 | Fungsi | memakai fungsi biasa dan fungsi panah dengan parameter | skrip modular | faktorial; FPB |
| M13 | Proyek mini | membuat permainan tebak angka berbasis teks | skrip dan penjelasan | tebak angka |
| M14 | Asesmen dan refleksi | menunjukkan dasar pemrograman dan konsep fondasi | uji tulis dan praktik; jurnal | kuis kode; kuis konsep fondasi (formatif, dilebur di sini) |

#### B-X2 (kelas X, semester 2; Fase E)

| Minggu | Topik | Tujuan | Keluaran | Latihan |
| --- | --- | --- | --- | --- |
| M1 | Array | memakai array dan metode `map`/`filter`/`reduce` | skrip array | rata-rata; saring nilai |
| M2 | String dan templat | mengolah teks | skrip teks | palindrom; hitung vokal |
| M3 | Objek dan JSON | memodelkan data dengan objek; membaca dan menulis JSON | berkas JSON | daftar buku (sintetis) |
| M4 | HTML dasar | menyusun dokumen HTML semantik | halaman HTML | profil fiktif |
| M5 | CSS dasar dan responsif | menata halaman agar nyaman di layar kecil | halaman bergaya | tata letak dua kolom |
| M6 | DOM dan peristiwa | mengubah halaman dengan JS | halaman interaktif | penghitung klik |
| M7 | Struktur data: tumpukan dan antrian | membuat stack dan queue dengan array/kelas | modul `stack`, `queue` | kurung seimbang; antrian sintetis |
| M8 | Pencarian sekuensial dan biner | menulis kedua pencarian | skrip pencarian | tebak angka biner |
| M9 | Pengurutan: bubble sort dan insertion sort | menulis, menelusuri, dan membandingkan kedua pengurutan | skrip urut | hitung pertukaran; bandingkan jumlah langkah |
| M10 | Data berkualitas | memvalidasi masukan dan merapikan data tabel (JSON) | skrip validasi | cek rentang, duplikat |
| M11 | Mesin pencari dan dokumentasi | mencari dan menilai dokumentasi teknis | catatan sumber | selesaikan masalah dari dokumentasi resmi |
| M12 | Git dan kolaborasi dasar | memakai commit, cabang, dan kolaborasi | repositori latihan | kerja berpasangan |
| M13 | Proyek mini: visualisasi algoritma | menggabungkan HTML/CSS/JS dan algoritma standar; memvisualisasikan langkah pengurutan atau pencarian | halaman statis | visualisasi pencarian atau pengurutan (animasi langkah) |
| M14 | Asesmen dan refleksi | menunjukkan algoritma standar dan dasar web | uji tulis dan praktik | kuis kode |

#### B-XI1 (kelas XI, semester 1; Fase F)

| Minggu | Topik | Tujuan | Keluaran | Latihan |
| --- | --- | --- | --- | --- |
| M1 | Proses rekayasa produk digital | menguraikan alur: kebutuhan, rancangan, implementasi, uji, rilis | dokumen rancangan | cerita pengguna sebuah aplikasi kecil |
| M2 | TypeScript I: tipe dasar | memberi tipe pada variabel dan fungsi | berkas `.ts` | ubah skrip JS ke TS |
| M3 | TypeScript II: `interface`, `type`, gabungan, generik dasar | memodelkan data dengan tipe | modul bertipe | model data fiktif |
| M4 | `tsconfig` dan mode ketat | mengatur kompiler dan memahami galat tipe | `tsconfig.json` | perbaiki galat tipe |
| M5 | Bun: runtime dan pengelola paket | memakai `bun run`, `bun install` | proyek Bun | skrip dan dependensi |
| M6 | Modul ESM dan paket | memecah kode menjadi modul | proyek multi-modul | pustaka kecil |
| M7 | Pengujian dengan `bun test` | menulis uji unit | berkas `*.test.ts` | uji fungsi pengurutan |
| M8 | Struktur data kompleks di TS | memakai `Map`, `Set`, kelas, graf (daftar ketetanggaan) | modul struktur data | graf pertemanan sintetis, BFS |
| M9 | Strategi algoritmik di TS | menerapkan greedy, rekursi, memoisasi | modul strategi | koin; Fibonacci memoisasi |
| M10 | Efisiensi dan alternatif solusi | mengukur waktu; membandingkan dua solusi | laporan perbandingan | `performance.now` dua pengurutan |
| M11 | Kualitas kode | memakai linter dan pemformat; menulis kode terbaca | konfigurasi lint | rapikan proyek |
| M12 | Alur kerja Git: cabang, pull request, ulasan | meninjau kode sejawat | pull request | tinjau PR teman |
| M13 | Proyek mini | membuat pustaka TS teruji | pustaka dan uji | proyek kelompok |
| M14 | Asesmen dan refleksi | menunjukkan TS, Bun, dan pengujian | uji tulis dan praktik | kuis kode |

#### B-XI2 (kelas XI, semester 2; Fase F)

| Minggu | Topik | Tujuan | Keluaran | Latihan |
| --- | --- | --- | --- | --- |
| M1 | Server HTTP dengan Bun | membuat server sederhana (`Bun.serve`) | server lokal | halaman "halo" |
| M2 | Rute dan API JSON | membuat endpoint JSON | API kecil | daftar tugas (sintetis) |
| M3 | Validasi masukan | memvalidasi data dengan skema (misalnya Zod) | skema validasi | tolak masukan salah |
| M4 | Berkas dan data JSON | membaca dan menulis berkas data | skrip data | simpan dan muat data |
| M5 | Sumber data terbuka dan legal | menilai lisensi dan keterpercayaan; membaca CSV/JSON | catatan sumber | unduh dataset terbuka |
| M6 | Pengolahan data bervolume lebih besar | mengalirkan (stream) dan merekap data | skrip rekap | rekap per kategori |
| M7 | Visualisasi data | menyajikan data sebagai tabel dan grafik SVG | halaman grafik | grafik batang dari data |
| M8 | Prediksi sederhana | memakai rata-rata bergerak dan garis kecenderungan | skrip prediksi | prediksi dan galat |
| M9 | Mengonsumsi API publik | memakai `fetch`, `async/await` | halaman yang memuat data | tampilkan data API publik |
| M10 | Keamanan aplikasi dan UU | mengenali XSS, rahasia di variabel lingkungan, pokok UU ITE dan UU PDP | lembar periksa | audit aplikasi sendiri |
| M11 | Jaringan: HTTP dan pemecahan masalah | membaca permintaan/respons; memakai DevTools untuk troubleshooting | catatan jaringan | diagnosis permintaan gagal |
| M12 | Penyajian statis (opsional) | menerbitkan situs statis | situs statis | publikasi di lab |
| M13 | Proyek: aplikasi data | membangun aplikasi data kecil | aplikasi dan laporan | proyek kelompok |
| M14 | Asesmen dan refleksi | menunjukkan server, data, keamanan | uji tulis dan praktik | kuis kode |

#### B-XII1 (kelas XII, semester 1; Fase F)

| Minggu | Topik | Tujuan | Keluaran | Latihan |
| --- | --- | --- | --- | --- |
| M1 | Astro: halaman statis dan komponen | membuat situs statis dengan Astro | situs Astro | halaman sekolah fiktif |
| M2 | Tata letak dan konten | memakai tata letak dan konten bersama | situs bertata letak | tiga halaman |
| M3 | Menjelajahi `awcms-one` | membaca README, ADR, dan peta repositori; membedakan `apps/storefront` dan `apps/cms` | catatan peta repositori | peta komponen |
| M4 | Menjalankan `awcms-one` secara lokal (demo terpandu) | memahami `SITE_PROFILE`, `bun run dev`, kebutuhan basis data | demonstrasi guru | cocokkan perintah dengan efeknya |
| M5 | `template:init` dan profil `landing` | membuat repositori turunan dan menginisialisasi merek | repositori turunan lab | isi merek fiktif |
| M6 | Kustomisasi merek dan konten | mengganti nama, warna, kontak, dan konten sampel | situs bermerek | profil organisasi fiktif |
| M7 | Tema, CSS, dan aksesibilitas | menyesuaikan tampilan dan memeriksa kontras dan label | situs yang lebih aksesibel | audit aksesibilitas |
| M8 | SEO dasar | mengatur judul, deskripsi, dan struktur halaman | halaman teroptimasi | audit judul dan deskripsi |
| M9 | Pengujian dan gerbang mutu | menjalankan `bun test` dan pemeriksaan proyek | laporan pemeriksaan | perbaiki satu kegagalan |
| M10 | Rahasia dan konfigurasi | memakai `.env`, tidak meng-commit rahasia | lembar periksa | cari rahasia tak sengaja |
| M11 | Dokumentasi dan lisensi | memperbarui dokumen; menjaga atribusi MIT | dokumen proyek | perbarui README |
| M12 | Ulasan sejawat | meninjau kustomisasi teman | catatan ulasan | tinjau PR |
| M13 | Proyek | menyiapkan kustomisasi untuk proyek akhir | rencana proyek | rencana kerja |
| M14 | Asesmen dan refleksi | menunjukkan pemahaman template | uji tulis dan praktik | kuis |

#### B-XII2 (kelas XII, semester 2; Fase F)

| Minggu | Topik | Tujuan | Keluaran | Latihan |
| --- | --- | --- | --- | --- |
| M1 | Kebutuhan pengguna | merancang kebutuhan sistem sesuai pengguna fiktif | dokumen kebutuhan | wawancara pengguna fiktif |
| M2 | Rancangan | merancang halaman, konten, dan struktur | rancangan | sketsa dan peta situs |
| M3 | Sprint 1: konten | menulis dan memasukkan konten | konten tahap 1 | halaman utama |
| M4 | Sprint 1: tampilan | menerapkan merek dan tema | tampilan tahap 1 | tema |
| M5 | Sprint 2: fitur | menambah fitur sesuai profil `landing` | fitur tahap 2 | formulir kontak (tanpa menyimpan data pribadi nyata) |
| M6 | Sprint 2: pengujian | menguji dan memperbaiki | laporan uji | uji manual |
| M7 | Sprint 3: penyempurnaan | memperbaiki kualitas dan aksesibilitas | rilis kandidat | perbaikan |
| M8 | Sprint 3: dokumentasi | menulis dokumentasi pengguna | dokumen | panduan pengguna |
| M9 | Ulasan keamanan | memeriksa rahasia, dependensi, dan masukan | laporan keamanan | audit |
| M10 | Privasi dan hukum | memeriksa pokok UU ITE dan UU PDP terkait proyek | catatan kepatuhan | daftar periksa |
| M11 | Ulasan sejawat | menilai proyek tim lain | catatan ulasan | ulasan |
| M12 | Presentasi | mendemonstrasikan proyek | demo | presentasi |
| M13 | Portofolio dan refleksi | mengarsipkan karya dan merefleksikan proses | portofolio | refleksi |
| M14 | Asesmen | menunjukkan seluruh jalur | uji praktik; rubrik proyek | rubrik |

## 4. Pemetaan elemen CP, topik, minggu, jalur

### 4.1 Fase E

| Butir CP | Topik | Minggu | Jalur |
| --- | --- | --- | --- |
| E-BK-a | struktur data dan algoritma standar | A-X2-M6..M10; B-X2-M7..M9 | A, B |
| E-BK-b | data berkualitas | A-X1-M13; B-X2-M10 | A, B |
| E-BK-c | menerapkan algoritma dan struktur data standar | A-X2-M6..M10, M13; B-X2-M7..M9, M13 | A, B |
| E-BK-d | pseudocode dan program dalam bahasa komputer | A-X1-M8..M12; A-X2-M1..M3; B-X1-M8..M12; B-X2-M1..M3 | A, B |
| E-BK-e | model I-P-O dan sistem operasi | FND-X1-M1..M2 | A, B |
| E-LD-a | mesin pencari (hanya untuk dokumentasi teknis) | B-X2-M11 | B (parsial) |
| E-LD-d | perangkat pengolah dokumen, lembar kerja, presentasi | FND-X1-M7 | A, B |
| E-LD-e | keamanan dasar konektivitas jaringan | FND-X1-M4..M6 | A, B |
| E-LD-f | produksi konten dan kolaborasi | B-X2-M4..M6, M12..M13 | B |
| E-LD-g | HAKI dan lisensi | FND-X1-M2, M6 | A, B |
| E-LD-k | kata sandi dan autentikasi dua langkah | FND-X1-M6 | A, B |
| E-LD-l | konfigurasi privasi dan keamanan akun | FND-X1-M6 | A, B |

### 4.2 Fase F

| Butir CP | Topik | Minggu | Jalur |
| --- | --- | --- | --- |
| F-BK-a | proses rekayasa | A-XI1-M1..M2; A-XII2-M11..M13; B-XI1-M1, M12; B-XII2-M1..M13 | A, B |
| F-BK-b | beberapa strategi, justifikasi efisiensi | A-XI1-M3..M7, M11..M12; A-XI2-M1..M4; A-XII2-M8, M10; B-XI1-M9..M10 | A, B |
| F-BK-c | struktur data lebih kompleks dan abstrak | A-XI1-M9..M10; A-XI2-M5..M8; A-XII1-M1..M5, M9..M10; B-XI1-M8 | A, B |
| F-BK-d | jaringan (HTTP) | B-XI2-M11 | B (parsial) |
| F-LD-d | merancang kebutuhan sistem | B-XII2-M1..M2 | B |
| F-LD-e | keamanan jaringan lanjut | B-XI2-M10 | B (parsial) |
| F-LD-f | mengkreasi konten digital | B-XII1-M6..M7; B-XII2-M3..M8 | B |
| F-LD-g | hukum (UU ITE, UU PDP) | B-XI2-M10; B-XII2-M10 | B |
| F-LD-i | kata sandi dan autentikasi | B-XII1-M10 | B (parsial) |
| F-AD-a | data terbuka, keputusan, prediksi | A-XI2-M9..M13; B-XI2-M4..M8 | A, B |
| F-AP-a | konsep strategi algoritmik | A-XI1-M3..M12; A-XI2-M1..M4; B-XI1-M9 | A, B |
| F-AP-b | program terstruktur berdasarkan strategi | A-XI1-M3..M13; A-XI2-M1..M4; B-XI1-M8..M9, M13 | A, B |
| F-AP-c | pemeliharaan dan kualitas kode | A-XI1-M2; A-XII2-M1..M2; B-XI1-M4, M7, M11..M12; B-XII1-M9, M12 | A, B |
| F-AP-d | struktur data kompleks dan library | A-XI1-M9..M10; A-XII1-M12; B-XI1-M8; B-XI2-M1..M3; B-XII1-M1..M6 | A, B |

### 4.3 Butir CP di luar silabus coding ini

Butir berikut tidak dicakup oleh jalur A dan B maupun blok fondasi (tidak
dihilangkan dari CP): E-LD-b, c, h, i, j; F-LD-a, b, c, h, j; F-BK-d
(kecuali pengiriman data HTTP pada B-XI2-M11). Pada v1.0 daftar ini juga
memuat E-LD-d dan E-LD-e; keduanya kini tercakup oleh blok fondasi
(bagian 4.1).

**Keputusan pemilik (2026-11-18, issue #52):** butir-butir itu dicakup lewat
**modul pendamping** literasi digital (issue #69). Interaksi dengan
perangkat fisik seperti IoT dan robot (disebut di panduan, bagian C, bukan
di rumusan CP) menjadi **jalur C terpisah** (issue #68). Keduanya disusun
untuk silabus v1.1 dan baru berlaku setelah disetujui pemilik. **Keputusan
pemilik (2026-11-18, issue #86/#92):** E-LD-d keluar dari daftar modul
pendamping karena menjadi FND-X1-M7.

### 4.4 Pengantar blok fondasi (tidak dihitung sebagai pemenuhan butir CP)

Blok fondasi memberi pengantar pedagogis pada butir berikut, tetapi
**tidak dianggap memenuhinya** `[asumsi]`. Rumusan butir ada di bagian 1.3
(kode di bagian 1.4); tidak dikutip ulang di sini.

| Butir CP | Pengantar di blok fondasi | Pemenuhan tetap di |
| --- | --- | --- |
| F-BK-d | FND-X1-M4..M5 (konsep jaringan, pengiriman data, diagnosis dasar) | B-XI2-M11 (HTTP) dan modul pendamping (#69); butir Fase F tidak dipenuhi di kelas X. |
| F-LD-e | FND-X1-M6 (keamanan konektivitas dasar) | B-XI2-M10 (parsial) dan modul pendamping (#69). |
| F-LD-d | FND-X1-M1 (membaca spesifikasi komputer) | B-XII2-M1..M2 (jalur B). |

**Representasi data** (FND-X1-M3: biner, heksadesimal, teks, gambar):
dipertahankan sebagai **prasyarat** (keputusan pemilik, bagian 9.1) untuk
memahami komputer Von Neumann (E-BK-e), tipe data pada A-X1-M9, operasi bit
(A-XI1-M3, pengayaan), dan data bagi jalur C dan D. Minggu ini **tidak
dihitung sebagai pemenuhan butir CP mana pun**, karena rumusan CP yang
dikutip tidak menyebutnya secara eksplisit.

## 5. Jembatan ke OSN (jalur A)

ID rumpun diambil dari `data/osn/topic-families.json` (silabus OSN v2.0).
Pemetaan ini penilaian penyusun, bukan bagian dari data OSN. Topik di luar
rumusan CP ditandai **P** (pengayaan, melampaui CP).

**Keputusan pemilik (2026-11-18, issue #52):** topik bertanda **P** adalah
**pengayaan opsional** — wajib bagi siswa yang menuju OSN, opsional untuk
kelas reguler jalur A.

| Rumpun materi OSN (`id`) | Topik jalur A yang menyiapkan | Minggu | Catatan |
| --- | --- | --- | --- |
| `dasar-pemrograman` | sintaks C++, variabel, I/O, percabangan, perulangan, fungsi | A-X1-M9..M12 | Sesuai CP. |
| `logika-bitwise` | logika Boolean; operasi bit | A-X1-M10; A-XI1-M3 | Operasi bit: **P**; pindah dari kelas X ke pengayaan kelas XI (keputusan pemilik 2026-11-18). |
| `aritmetika` | paritas, FPB/KPK, prima; aritmetika modular | A-X2-M4..M5; A-XII1-M8 | **P** untuk modular. |
| `aturan-berhitung` | aturan jumlah dan kali, permutasi dan kombinasi, Pascal | A-XII1-M6..M7 | **P**. |
| `rekursi` | rekursi, divide-and-conquer, backtracking | A-X2-M11; A-XI1-M7, M11; A-XII2-M4 | Rekursi ada di panduan (strategi algoritmik). |
| `search-sort` | pencarian sekuensial dan biner; bubble, insertion; merge, quick | A-X2-M8..M10; A-XI1-M8 | Bubble/insertion/sekuensial/biner sesuai panduan; merge dan quick: **P**. |
| `strategi-problem-solving` | pencarian lengkap dan pruning, greedy, divide-and-conquer, DP | A-XI1-M3..M7, M11..M12; A-XI2-M1..M4 | Greedy, rekursi, DP ada di panduan; pencarian lengkap: **P**. |
| `struktur-data` | array, string, stack, queue, heap, DSU, Fenwick, segment tree | A-X2-M1..M3, M6..M7; A-XI1-M9..M10; A-XII1-M4, M9..M10 | Stack, queue, list sesuai panduan; heap, DSU, Fenwick, segment tree: **P**. |
| `graph-tree` | representasi graf, BFS/DFS, keterhubungan, lintasan terpendek, MST, pohon berakar, LCA | A-XI2-M5..M8; A-XII1-M1..M5 | Seluruhnya **P** (graf tidak disebut di CP yang dikutip). |
| `geometri-dasar` | koordinat, jarak Euclid, Pythagoras | A-XII1-M11 | **P**. |

Kesepuluh id rumpun tercakup. Catatan: kedalaman yang dituntut OSN
(misalnya tingkat kesulitan soal) tidak dijamin oleh draf ini; jembatan di
sini hanya menyiapkan topik, bukan menggantikan pembinaan OSN.

## 6. Analisis kelayakan `awcms-one` untuk SMA (jalur B)

Fakta yang diverifikasi dari repositori publik `ahliweb/awcms-one` pada
2026-11-18 (README, `docs/template.md`, `package.json`, metadata GitHub):

| Fakta | Nilai |
| --- | --- |
| Lisensi | MIT; repositori publik dan bertanda template |
| Stack | Bun (`packageManager` `bun@1.4.4`), Astro (`apps/storefront`), PostgreSQL (lokal lewat `docker compose`, `postgres:18.6`), TypeScript |
| Struktur | monorepo Bun: `apps/cms` (backend, `ahliweb/awcms` disalin via `git subtree`), `apps/storefront` (situs statis Astro), `packages/*` |
| Profil build | `toko`, `berita`, `landing` (`SITE_PROFILE`) |
| Langkah pakai template | "Use this template", `bun install`, `bun run template:init`, salin `.env`, `bun run db:up`, `bun run db:migrate:cms`, `bun run db:seed:cms:profil <profil>`, `bun run dev` |
| Aturan template | turunan memiliki sendiri backend, basis data, migrasi, rahasia, dan domain; tidak boleh memakai backend produksi `awcms-one` (ADR-0024 di repositori itu) |
| Beban | README menyebut suite `apps/cms` sekitar 500 berkas uji yang membutuhkan PostgreSQL hidup dan gerbang `check:cms` 53 langkah |
| Build storefront | README menyebut `bun run build` mengambil konten dari `apps/cms` saat build |

Belum diverifikasi `[belum terverifikasi]`: apakah profil `landing` dapat
dibangun tanpa `apps/cms` hidup (README menyiratkan perlu; tidak dicoba
dijalankan); kebutuhan RAM/disk nyata untuk lab; kecukupan Docker di
komputer lab sekolah.

### 6.1 Yang cocok untuk siswa SMA

- Bun, TypeScript, Astro, dan alur Git/PR adalah perangkat modern yang
  relevan, dan lisensi MIT memudahkan penggunaan di sekolah.
- Profil `landing` (situs profil organisasi) adalah proyek yang konkret dan
  mudah dipahami: mengganti merek, konten, tema, dan SEO.
- `template:init` membuat repositori turunan yang bersih sehingga siswa
  belajar proses rekayasa (CP F-BK-a) dan kualitas kode (F-AP-c).
- ADR dan dokumentasi yang rapi cocok sebagai bahan membaca kode nyata.

### 6.2 Yang terlalu berat

- PostgreSQL via Docker, migrasi, dan *row-level security* di `apps/cms`
  memerlukan pengetahuan basis data dan infrastruktur yang jauh di atas CP
  SMA dan membebani komputer lab.
- `apps/cms` (ratusan berkas uji, gerbang 53 langkah) tidak realistis
  dipelajari siswa; cukup sebagai kotak hitam.
- Aturan "setiap turunan memiliki backend sendiri" berarti satu backend
  bersama untuk kelas melanggar semangat ADR-0024 dan menimbulkan risiko
  rahasia, data, dan operasional.
- Fitur komersial (toko, pesanan, penyedia eksternal) memuat data dan
  integrasi yang tidak pantas untuk lingkungan siswa.

### 6.3 Progresi yang disarankan

JS dasar (B-X1 M8..M12, B-X2 M1..M3) -> HTML/CSS/DOM dan algoritma standar (B-X2 M4..M13) -> TypeScript
(B-XI1 M2..M4) -> Bun dan pengujian (B-XI1 M5..M7) -> server dan data
(B-XI2) -> Astro (B-XII1 M1..M2) -> membaca `awcms-one` (B-XII1 M3..M4) ->
profil `landing` dan `template:init` (B-XII1 M5..M8) -> proyek kustomisasi
(B-XII2).

### 6.4 Opsi dan trade-off

| Opsi | Uraian | Kelebihan | Kekurangan |
| --- | --- | --- | --- |
| 1 (Disarankan) | `awcms-one` sebagai studi kasus dan kustomisasi profil `landing` saja, di kelas XII; lingkungan (Docker, PostgreSQL, CMS) disiapkan dan dijalankan guru per tim di mesin lab; siswa hanya mengubah merek, konten, tema, SEO, dokumentasi | Realistis; selaras CP (rekayasa, kualitas, kebutuhan pengguna); aman; beban infrastruktur di guru | Siswa tidak menyentuh backend; butuh guru yang mahir Docker; kelayakan profil `landing` tanpa CMS belum diverifikasi |
| 2 | Siswa membuat sendiri situs Astro statis tanpa CMS, memakai `awcms-one` hanya sebagai rujukan pola | Paling ringan; tanpa Docker; mudah di mesin sederhana | Tidak "memakai template" sebagaimana keputusan pemilik; manfaat jembatan ke template berkurang |
| 3 | Setiap tim menjalankan tumpukan penuh `awcms-one` (Docker, PostgreSQL, migrasi, seed) di mesin sendiri | Pengalaman rekayasa menyeluruh | Beban berat; risiko lingkungan dan waktu; di luar CP; butuh perangkat berspesifikasi tinggi |
| 4 | Satu instans demonstrasi milik guru yang dipakai bersama | Satu lingkungan saja | Bertentangan dengan aturan template-only (ADR-0024); satu titik gagal |

Rekomendasi penyusun: opsi 1, dengan opsi 2 sebagai cadangan bila
komputer lab tidak mampu menjalankan Docker.

**Keputusan pemilik (2026-11-18, issue #52): opsi 1** — `awcms-one` sebagai
studi kasus dan kustomisasi profil `landing` di kelas XII; lingkungan
Docker/PostgreSQL disiapkan guru per tim.

Penilaian ringkas (1 = lemah, 3 = kuat) untuk keempat opsi pada kriteria
penting: keamanan (1: 3, 2: 3, 3: 2, 4: 1), pemeliharaan (1: 2, 2: 3, 3: 1,
4: 2), kompleksitas operasional (1: 2, 2: 3, 3: 1, 4: 2), aksesibilitas
bagi sekolah beragam (1: 2, 2: 3, 3: 1, 4: 2), kesesuaian keputusan pemilik
(1: 3, 2: 1, 3: 3, 4: 2), kedalaman pembelajaran (1: 2, 2: 2, 3: 3, 4: 1).
Skor ini penilaian penyusun, bukan pengukuran.

## 7. Prinsip asesmen, perangkat lab, dan privasi

### 7.1 Prinsip asesmen `[asumsi]`

- Asesmen formatif tiap minggu lewat latihan; sumatif di minggu 14.
- **Blok fondasi** (keputusan pemilik 2026-11-18): asesmen **formatif**
  (kuis singkat dan lembar praktik tiap minggu), dilebur ke asesmen minggu
  14 kelas X semester 1 (`A-X1-M14`, `B-X1-M14`); tidak ada minggu asesmen
  atau penilaian sendiri untuk fondasi.
- Praktik dinilai dengan uji kasus otomatis dan rubrik (ketepatan,
  keterbacaan, pengujian, justifikasi).
- Fase F menilai kemampuan membandingkan alternatif solusi dan
  menjustifikasi pilihan (sesuai rumusan F-BK-b).
- Proyek kelompok dinilai dengan rubrik proses dan produk, termasuk ulasan
  sejawat.
- Panduan menyebut asesmen dan pembelajaran mendalam; bobot nilai dan
  predikat mengikuti kebijakan sekolah `[belum terverifikasi]`.

### 7.2 Kebutuhan perangkat lab sekolah `[asumsi]`

| Jalur | Perangkat |
| --- | --- |
| A | Komputer dengan g++ (C++17 atau lebih baru), editor, terminal; tanpa internet pun memadai. |
| B | Komputer dengan Bun (versi mengikuti `awcms-one`, saat ini 1.4.4), Node tidak wajib, peramban modern, Git, editor; akses internet untuk paket. |
| B (opsi 1 kelas XII) | Satu atau beberapa mesin lab berkemampuan menjalankan Docker dan PostgreSQL; spesifikasi minimum `[belum terverifikasi]`. |
| Umum | Akun uji sintetis; tanpa akun pribadi siswa wajib. |
| Fondasi (kelas X, bersama) | Komputer lab dengan informasi sistem, perangkat pengolah dokumen, lembar kerja, dan presentasi (sumber terbuka atau berbasis web), serta jaringan lab biasa; kartu dan kertas untuk simulasi peran. Komponen bekas dan jaringan lokal terisolasi hanya opsi bila lab menyediakan; internet opsional `[asumsi]`. |

**Penanggung jawab penyiapan lab (keputusan pemilik 2026-11-18):**
campuran — lingkungan jalur A dan B disiapkan guru dan sekolah; lingkungan
`awcms-one` (Docker/PostgreSQL) dan perangkat IoT jalur C dibantu mitra
penyelenggara.

### 7.3 Catatan privasi

- Program ini tidak menyimpan data siswa. Repositori ini tidak memuat data
  pribadi pembelajar ([ADR-0004](../../architecture/adr/0004-no-learner-personal-data.md)).
- Semua contoh data bersifat sintetis dan jelas palsu; tidak ada nama atau
  sekolah nyata.
- Latihan tentang kata sandi dan privasi memakai akun uji, bukan akun
  pribadi siswa.
- Proyek web (formulir kontak dan sejenisnya) tidak boleh mengumpulkan
  data pribadi nyata; rahasia dan `.env` tidak di-commit.

## 8. Catatan keterbatasan

- Rumusan CP berasal dari panduan resmi, bukan SK; nomor SK tetap
  `[belum terverifikasi]` (bagian 1; keputusan pemilik: panduan dipakai).
- Banyak topik jalur A (graf, DP, struktur data lanjut) adalah pengayaan
  opsional untuk jembatan OSN, bukan tuntutan CP (bagian 5).
- Rencana mingguan belum diuji di kelas; susunan kelas X v1.1 (tujuh minggu
  fondasi, penggabungan dan penggeseran minggu) adalah rancangan penyusun
  `[asumsi]` yang belum disetujui pemilik.

## 9. Keputusan pemilik atas pertanyaan terbuka (2026-11-18)

### 9.0 Keputusan atas silabus v1.0 (issue #52)

Semua dijawab pemilik lewat dialog pilihan dan dicatat di issue #52.

| No. | Pertanyaan | Keputusan |
| --- | --- | --- |
| 1 | Dasar hukum CP | Panduan Mata Pelajaran Informatika 2025 dipakai; nomor SK tetap `[belum terverifikasi]` sampai tautan resmi tersedia. |
| 2 | Alokasi JP | 3 JP x 45 menit per minggu. |
| 3 | Butir CP di luar coding (bagian 4.3) | Dicakup lewat modul pendamping (issue #69). |
| 4 | Topik jalur A di luar CP | Pengayaan opsional (bagian 5). |
| 5 | Opsi `awcms-one` | Opsi 1 (bagian 6.4). |
| 6 | IoT/robot | Jalur C terpisah (issue #68). |
| 7 | Pemilihan jalur | Murid memilih satu jalur, boleh lebih. |
| 8 | Penyiapan lab | Campuran: jalur A/B oleh sekolah; `awcms-one` dan IoT dibantu mitra (bagian 7.2). |

### 9.1 Keputusan atas usulan blok fondasi kelas X (2026-11-18)

Dijawab pemilik lewat dialog pilihan; dicatat di issue #86 dan diterapkan
pada draf ini di issue #92. Keputusan ini **tidak** sama dengan persetujuan
atas v1.1: v1.1 tetap DRAF sampai pemilik menyetujuinya.

| No. | Pertanyaan | Keputusan |
| --- | --- | --- |
| Q1 | Panjang blok fondasi | Opsi (b), enam minggu, ditambah satu minggu perangkat pengolah dokumen, lembar kerja, dan presentasi (E-LD-d): **tujuh minggu**, kode FND-X1-M1..FND-X1-M7 (bagian 3.0). |
| Q2 | Bentuk pelaksanaan | **Kelas bersama lintas jalur**, sebelum murid memilih jalur. |
| Q3 | Perangkat pengolah dokumen, lembar kerja, presentasi (E-LD-d) | Menjadi **satu minggu fondasi** (FND-X1-M7); keluar dari daftar modul pendamping (#69). |
| Q4 | `B-X2-M9` dan `B-X2-M10` | **Dihapus** karena sudah dicakup fondasi; slotnya dipakai minggu yang digeser dari semester 1 (bagian 3.0, padanan). |
| Q5 | Operasi bit dasar (v1.0 `A-X2-M12`, pengayaan) | **Pindah ke pengayaan kelas XI** (`A-XI1-M3` pada draf ini). |
| Q6 | Asesmen fondasi | **Formatif**, dilebur ke asesmen minggu 14 kelas X semester 1; tanpa minggu asesmen sendiri (bagian 7.1). |
| Q7 | Representasi data | Tetap **prasyarat**; **tidak dihitung** sebagai pemenuhan butir CP mana pun (bagian 4.4). |
| Q8 | Kesiapan lab untuk praktik jaringan dan perangkat keras | **Simulasi peran** sebagai jalur utama praktik; komponen bekas dan jaringan lokal terisolasi sebagai opsi bila lab menyediakan (bagian 3.0). |

Rancangan penyusun yang menerapkan keputusan ini (penggabungan dan
penggeseran minggu, nomor minggu baru) ditandai `[asumsi]` dan menunggu
persetujuan pemilik.

## 10. Daftar rujukan

| Rujukan | Status |
| --- | --- |
| Badan Standar, Kurikulum, dan Asesmen Pendidikan, Kemendikdasmen, *Panduan Mata Pelajaran Informatika, Fase D – F*, 2025. `https://repositori.kemendikdasmen.go.id/33634/1/32.%20Panduan%20Mata%20Pelajaran%20Informatika.pdf` | Dibuka dan diekstrak, 2026-11-18. |
| Salinan di portal kurikulum: `https://kurikulum.kemdikbud.go.id/file/panduan/dokumen/32.%20Panduan%20Mata%20Pelajaran%20Informatika.pdf` | Tidak dibuka (tidak terjangkau). |
| Keputusan Kepala BSKAP Nomor 046/H/KR/2025 tentang Capaian Pembelajaran (PAUD, SD, SMP, SMA) | `[belum terverifikasi]`; hanya dari situs sekunder; URL resmi tidak ditemukan. |
| Keputusan Kepala BKPDM Nomor 020 Tahun 2026 | `[belum terverifikasi]`; hanya dari artikel sekunder. |
| `ahliweb/awcms-one` (README, `docs/template.md`, `package.json`, metadata GitHub) `https://github.com/ahliweb/awcms-one` | Dibuka via GitHub API, 2026-11-18. |
| `data/osn/topic-families.json` (silabus OSN v2.0, 2026-09-04) | Dibaca di repositori ini. |
| ADR-0004, ADR-0006, ADR-0007 repositori ini | Dibaca. |
| [`silabus.md`](silabus.md) (v1.0, disetujui 2026-11-18) dan [`usulan-fondasi-kelas-x.md`](usulan-fondasi-kelas-x.md) (usulan blok fondasi, issue #86) | Dasar draf v1.1; dibaca di repositori ini. |

## Changelog

| Versi | Tanggal | Perubahan |
| --- | --- | --- |
| v1.1.0-draf | 2026-11-18 | Draf (issue #92, tahap 1): menerapkan blok fondasi kelas X tujuh minggu (FND-X1-M1..M7, kelas bersama lintas jalur) sesuai delapan keputusan pemilik (bagian 9.1); kelas X semester 1 dan 2 jalur A dan B disusun ulang (minggu jalur dimulai dari M8; array, string, array dua dimensi / objek dan JSON digeser ke awal semester 2; beberapa minggu digabung); `B-X2-M9`/`M10` dihapus; operasi bit dipindah ke `A-XI1-M3` (pengayaan); pemetaan CP (4.1, 4.3, 4.4) dan jembatan OSN (5) diperbarui. **Belum disetujui pemilik**; v1.0 tetap berlaku. |
| v1.0.0 | 2026-11-18 | Disetujui pemilik program untuk jalur A dan B (issue #52). Keenam pertanyaan terbuka dijawab (bagian 9): panduan 2025 dipakai, 3 JP/minggu, modul pendamping (#69), jalur C terpisah (#68), murid memilih satu jalur, lab campuran. Berkas diganti nama dari `silabus-draf.md`. |
| v0.2.0 | 2026-11-18 | Mencatat keputusan pemilik (issue #63): `awcms-one` opsi 1; topik bertanda P menjadi pengayaan opsional. Pertanyaan 4 dan 5 terjawab. Status tetap DRAF. |
| v0.1.0 | 2026-11-18 | Draf awal (issue #51): sumber resmi dan kutipan CP Fase E/F, rencana mingguan dua jalur, pemetaan CP, jembatan OSN, analisis `awcms-one`, asesmen, perangkat, privasi, rujukan, pertanyaan terbuka. |
