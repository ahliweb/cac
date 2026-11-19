# Silabus Pembelajaran Coding SMA — v1.4

- **Version:** v1.4.1
- **Last updated:** 2026-11-19
- **Status:** DISETUJUI pemilik program, 2026-11-19 — jalur A, B, C, D, dan E (v1.3, issue #139; v1.2, issue #68, #84, #88; v1.1 disetujui 2026-11-19, issue #92; v1.0 disetujui 2026-11-18, issue #52). Modul pendamping (#69) tidak termasuk persetujuan ini. Revisi v1.4.0 (subbagian kemampuan masuk dari SMP dan penempatan di blok fondasi, bagian 3.0) disetujui lewat keputusan pemilik 2026-11-19 (issue #177, bagian 9.5). Revisi patch v1.4.1 (dasar hukum siber: KUHP UU 1/2023) atas instruksi pemilik 2026-11-19, issue #238.
- **Changeset:** Silabus v1.3 disetujui pemilik lewat keputusan 2026-11-19 (issue #139, bagian 9.4): butir AI pada lima minggu jalur A, B, C, dan fondasi serta tiga minggu jalur D, aturan pemakaian AI generatif oleh murid SMA diganti menjadi bebas dengan etika, dan bagian 7.4 "Kebijakan penggunaan AI" ditambahkan; tidak ada minggu baru. Sebelumnya, silabus v1.2 disetujui pemilik: jalur C (IoT dan robotika), D (kecerdasan buatan dan analisis data), dan E (komputasi kuantum) ditambahkan beserta rencana mingguan, pemetaan CP (jalur D dan E sebagai pengayaan di luar CP, tidak dihitung pemenuhan CP), jembatan OSN jalur C, dan keputusan pemilik 2026-11-19 (bagian 9.3); celah F-LD-d dan F-LD-e jalur A dicatat dicakup modul pendamping (issue #105). Revisi minor v1.4.0 (#177, bagian 9.5): subbagian baru di bagian 3.0 menyatakan bahwa silabus ini tidak mensyaratkan `smp-coding`, memetakan irisan minggu SMP dengan blok fondasi dan minggu jalur A dan B, serta mengatur pengamatan awal dan tugas pendalaman di dalam kelas bersama; kode minggu, jumlah minggu, pemetaan CP, jalur, dan jembatan OSN tidak berubah. Revisi patch v1.4.1 (#238, instruksi pemilik 2026-11-19): rumusan dasar hukum pada lima minggu (`B-XI2-M10`, `B-XII2-M10`, `C-XII1-M11`, `D-XII1-M4`) dan butir `F-LD-g` diselaraskan dengan UU 1/2023 (KUHP); kode minggu, jumlah minggu, pemetaan CP, dan jalur tidak berubah.

> **Disetujui pemilik program pada 2026-11-19 untuk jalur A, B, C, D, dan E**
> (v1.2; keputusan lewat dialog pilihan, dicatat di issue #68, #84, dan #88,
> bagian 9.3); revisi v1.3 (issue #139, bagian 9.4) menambahkan butir dan
> kebijakan AI. Dokumen ini adalah revisi v1.1 (disetujui 2026-11-19, issue
> #92; v1.0 disetujui 2026-11-18, issue #52) dan konten karangan menurut
> [ADR-0007](../../architecture/adr/0007-authored-learning-content.md) yang
> menjadi sumber corpus program `sma-coding` (ADR-0006). Kutipan CP di bagian
> 1 adalah transkripsi sumber resmi (disalin persis dari v1.0); selebihnya
> rancangan penyusun yang disetujui. Butir bertanda `[belum terverifikasi]`
> tetap belum terverifikasi, dan butir `[asumsi]` tetap rancangan penyusun
> yang kini disetujui sebagai bagian dari v1.2. Jalur D dan E berada di luar
> rumusan CP: pengayaan, tidak dihitung sebagai pemenuhan CP (bagian 4.5).
> Modul pendamping tidak termasuk persetujuan ini. Draf asal jalur baru
> tersimpan sebagai riwayat:
> [`draf-jalur-c-iot.md`](draf-jalur-c-iot.md),
> [`draf-jalur-d-ai.md`](draf-jalur-d-ai.md),
> [`draf-jalur-e-kuantum.md`](draf-jalur-e-kuantum.md); usulan asal blok
> fondasi: [`usulan-fondasi-kelas-x.md`](usulan-fondasi-kelas-x.md).

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
- **Jalur C dan D (v1.2)** memakai penomoran kelas X semester 1 yang sama
  dengan jalur A dan B (minggu jalur mulai dari `M8`). **Jalur E (v1.2)** hanya
  kelas XI dan XII: semesternya `XI1`, `XI2`, `XII1`, `XII2`, tanpa kelas X dan
  tanpa blok fondasi.
- Awalan `E-` dipakai dua keluarga kode yang tidak bertabrakan: kode minggu
  jalur E (`E-XI1-M3`; selalu memuat segmen kelas dan diakhiri `M<n>`) dan kode
  butir CP Fase E (`E-BK-a`; selalu `E-` atau `F-` diikuti elemen dua huruf).
- **Jalur D dan E adalah pengayaan di luar rumusan CP**: tidak dihitung sebagai
  pemenuhan butir CP mana pun (bagian 4.5).
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
| Keputusan induk CP | Keputusan Kepala BSKAP Nomor 046/H/KR/2025, berlaku sejak 16 Juli 2025, mencabut Keputusan Kepala Badan Nomor 032/H/KR/2024 | `[terverifikasi 2026-11-19]` dari teks PDF SK (1691 halaman, SHA-256 `45809d2c88a612f90ee5adbd60d71a8952527d6924c626d126ea6926ae3d3394`) yang diunduh dari subdomain resmi `bpmpbabel.kemendikdasmen.go.id` (URL dan hasil pencocokan di [`../smp-coding/riset.md`](../smp-coding/riset.md) bagian 2.1): "Ditetapkan di Jakarta pada tanggal 16 Juli 2025", Diktum KEDELAPAN berlaku sejak ditetapkan, Diktum KETUJUH mencabut 32/H/KR/2024. Padanan di JDIH Kemendikdasmen `[belum terverifikasi]` (tidak ditemukan). |
| Perubahan 2026 | Keputusan Kepala BKPDM Nomor 020 Tahun 2026, ditetapkan 23 Juni 2026, mengubah 046/H/KR/2025 hanya untuk Agama dan Budi Pekerti; CP mata pelajaran lain (termasuk Informatika) tetap | `[belum terverifikasi]`: dari artikel sekunder (gebrak.id) yang hanya menulis "Sumber: Kemendikdasmen" tanpa tautan. |
| URL resmi SK | -- | `[belum terverifikasi]`: tidak ditemukan. Pemilik diminta memberi tautan resmi (bagian 9). |
| Dasar hukum siber dan data pribadi | UU 11/2008 tentang ITE (diubah UU 19/2016 dan UU 1/2024) tetap berlaku, tetapi Pasal 27 ayat (1) dan (3), 28 ayat (2), 30, 31 ayat (1) dan (2), 36, 45 ayat (1) dan (3), 45A ayat (2), 46, 47, dan 51 ayat (2) dicabut oleh UU 1/2023 tentang KUHP (berlaku sejak 2 Januari 2026). Ketentuan pidana siber kini ada di KUHP bagian "Tindak Pidana terhadap Informatika dan Elektronika" (mis. akses tanpa hak ke komputer atau sistem elektronik: Pasal 332; penyadapan transmisi informasi elektronik yang tidak bersifat publik: Pasal 258). Pelindungan data pribadi: UU 27/2022. | `[terverifikasi 2026-11-19]`: daftar pasal dicabut dari JDIH BPK (`https://peraturan.bpk.go.id/Details/37589/uu-no-11-tahun-2008`; status dan tanggal berlaku UU 1/2023 di `https://peraturan.bpk.go.id/Details/234935/uu-no-1-tahun-2023`) dan dari naskah UU 1/2023 (PDF di JDIH BPK; ketentuan penutup Pasal 622 ayat (1) huruf r, Pasal 258, dan Pasal 332 dibaca). Naskah UU 1/2023 diubah UU 1/2026 tentang Penyesuaian Pidana (tercatat di JDIH BPK; isinya tidak dibaca). Bunyi pasal tidak dikutip di silabus; materi modul memverifikasi ulang sebelum dipakai. UU 27/2022 tidak dibuka ulang di revisi ini. |
| Alokasi jam pelajaran (JP) Informatika per kelas/minggu | -- | `[belum terverifikasi]`: dokumen yang dibuka tidak memuat struktur kurikulum SMA. Silabus ini memakai asumsi di bagian 2. |

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

### 1.4 Kode butir CP yang dipakai silabus ini (pemenggalan penyusun)

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
| Semester | Dua per kelas: X1, X2, XI1, XI2, XII1, XII2 (enam semester per jalur A sampai D; jalur E hanya kelas XI dan XII) | `[asumsi]`; jalur E: keputusan pemilik 2026-11-19 (bagian 9.3). |
| Minggu per semester | 14 minggu materi + 2 minggu cadangan (libur, ujian sekolah, remedial) | `[asumsi]` |
| Alokasi JP | Satu pertemuan 3 JP x 45 menit per minggu per jalur; sekolah menyesuaikan | Ditetapkan pemilik 2026-11-18. Angka JP resmi kurikulum tetap `[belum terverifikasi]`. |
| Hubungan jalur | Murid memilih satu jalur (A, B, C, D, atau E); boleh mengambil jalur lain bila waktu sekolah mengizinkan. Sebelum memilih jalur, semua murid kelas X mengikuti blok fondasi bersama (bagian 3.0); jalur E dimulai di kelas XI. Jalur D dan E adalah pengayaan di luar rumusan CP. | Ditetapkan pemilik 2026-11-18; blok fondasi bersama: keputusan pemilik 2026-11-18 (bagian 9.1); jalur C, D, dan E: keputusan pemilik 2026-11-19 (bagian 9.3). |
| Pola tiap semester | Minggu 1-12 materi; minggu 13 proyek mini; minggu 14 asesmen dan refleksi. Kelas X semester 1: minggu 1-7 blok fondasi (FND-X1-M1..M7), minggu 8-12 materi jalur; asesmen fondasi bersifat formatif dan dilebur ke asesmen minggu 14. | `[asumsi]`; blok fondasi dan asesmen formatif: keputusan pemilik 2026-11-18 (bagian 9.1). |
| Nilai dasar | CP wajib tercakup di pembelajaran Informatika sekolah; silabus coding ini hanya membahas butir yang dapat dicapai lewat coding. Butir lain ada di bagian 4.3. | Rancangan penyusun. |

Prinsip rancangan: (1) mengikuti catatan panduan bahwa urutan penomoran CP
bukan urutan belajar; (2) Fase E menekankan konsep dasar (pseudocode,
struktur data dan algoritma standar); (3) Fase F menekankan strategi
algoritmik, data, proses rekayasa, dan program terstruktur dengan library;
(4) v1.1: kelas X dibuka dengan blok fondasi informatika dasar yang sama
untuk semua jalur, sebelum murid memilih jalur; (5) v1.2: jalur C (IoT dan
robotika) memetakan perangkat fisik ke CP hanya lewat prinsip komputasinya,
sedangkan jalur D (AI) dan E (komputasi kuantum) berada di luar rumusan CP dan
dicatat sebagai pengayaan.

## 3. Rencana mingguan

Kolom: **Topik** | **Tujuan** (murid mampu ...) | **Keluaran** | **Latihan**.
Seluruh data latihan bersifat sintetis (bagian 8).

### 3.0 Blok fondasi kelas X (bersama lintas jalur)

Keputusan pemilik 2026-11-18 (bagian 9.1): semua murid kelas X mengikuti
**blok fondasi informatika dasar tujuh minggu** sebelum memilih jalur
(opsi (b) usulan, enam minggu, ditambah satu minggu perangkat pengolah
dokumen, lembar kerja, dan presentasi, butir E-LD-d). Blok ini menempati
minggu 1-7 kelas X semester 1 dan sama untuk jalur A, B, C, dan D (jalur E
dimulai di kelas XI dan tidak mengikuti blok ini). Seluruh latihan memakai data sintetis, akun uji, dan
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
| FND-X1-M6 | Keamanan dasar dan etika digital | menyusun kata sandi yang kuat dan memakai manajer kata sandi; menerapkan autentikasi dua langkah secara sederhana; menerapkan konfigurasi privasi dan keamanan pada akun uji; menjelaskan langkah keamanan konektivitas dasar (kata sandi bawaan perangkat jaringan diganti, jaringan nirkabel terenkripsi, kewaspadaan pada jaringan publik, tanda HTTPS); mengenali pesan tipuan (phishing) dasar; menghargai hak atas kekayaan intelektual; menerapkan kebijakan pemakaian AI kelas (tanpa data pribadi, kata sandi, atau kunci pada layanan AI; mencatat bila keluaran AI dipakai; menyadari lisensi keluaran AI masih berkembang) | lembar periksa keamanan akun; daftar periksa keamanan konektivitas; kartu kebijakan AI kelas | audit kata sandi dengan bahan sintetis; mengatur akun uji dengan manajer kata sandi lokal bersumber terbuka `[asumsi]`; demonstrasi autentikasi dua langkah oleh guru (murid tidak wajib memasang apa pun di ponsel pribadi); membandingkan dua konfigurasi privasi pada akun uji; mengenali pesan tipuan sintetis; menyunting contoh permintaan sintetis ke asisten AI agar bebas dari data pribadi dan rahasia |
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

#### Kemampuan masuk dari SMP dan penempatan di blok fondasi (v1.4)

Silabus ini tidak mensyaratkan `smp-coding`, mata pelajaran Koding dan KA, ataupun Informatika SMP tertentu: murid kelas X berasal dari SMP dengan bentuk program yang berbeda-beda (`smp-coding` bagian 2) `[asumsi]`. Blok fondasi dan minggu jalur kelas X semester 1 mengajar dari awal, sehingga murid dengan latar SMP yang kuat mengulang sebagian isinya. Pengulangan itu diatur, bukan dibiarkan: fondasi tetap kelas bersama lintas jalur (keputusan pemilik, bagian 9.1), dan murid yang sudah menguasai suatu minggu mengerjakan tugas pendalaman di dalam kelas yang sama, bukan keluar dari kelas.

| Asal di SMP (`smp-coding`) | Minggu silabus ini yang beririsan | Perlakuan di dalam kelas bersama `[asumsi]` |
| --- | --- | --- |
| `SMP7-2-M10` (komputer sebagai sistem: masukan, proses, keluaran) | `FND-X1-M1` | Murid yang terlihat menguasainya menjelaskan siklus kepada teman dan membaca spesifikasi komputer lab yang lebih rinci. |
| `SMP7-2-M2`, `SMP7-2-M3` (biner, teks dan gambar sebagai data; keduanya pengayaan di SMP) | `FND-X1-M3` | Tugas pendalaman: heksadesimal dan kode karakter tanpa lembar bantu. |
| `SMP8-1-M12` (jaringan lokal, ponsel, dan internet) | `FND-X1-M4`, `FND-X1-M5` | Tugas pendalaman: diagnosis tiga skenario gangguan tanpa petunjuk urutan. |
| `SMP8-2-M11`, `SMP8-2-M12` (kata sandi, akun, informasi publik dan privat) | `FND-X1-M6` | Tidak dipadatkan: keamanan akun dan kebijakan AI kelas dilatih bagi semua murid. |
| `SMP8-1-M6`, `SMP8-1-M7`, `SMP7-2-M12` (lembar kerja, grafik, laporan) | `FND-X1-M7` | Tugas pendalaman: rumus kondisi dan grafik dari data sintetis yang lebih besar. |
| `SMP7-1-M12`, `SMP9-1-M6` (atribusi, izin, lisensi data terbuka) | `FND-X1-M2` | Murid memberi atribusi dan memilih lisensi pada karya sendiri. |
| `SMP8-2-M2` sampai `SMP8-2-M9` (Python: variabel, percabangan, perulangan, daftar, fungsi) | `A-X1-M9` sampai `A-X1-M12`, `B-X1-M9` sampai `B-X1-M12` | Murid berlatar teks memakai tugas baca-dan-prediksi dan soal setengah jadi, lalu menulis dari halaman kosong; sintaks C++ atau JavaScript tetap dipelajari. |

Pengamatan awal: `FND-X1-M1` memuat tugas awal singkat per topik fondasi (sekitar sepuluh menit `[asumsi]`, tanpa nilai angka dan tanpa catatan di repositori ini) dan ceklis "terlihat" dan "belum terlihat" milik guru, yang menentukan murid mana mengerjakan tugas pendalaman di minggu fondasi tertentu. Murid yang memiliki portofolio `SMP9-2-M13` boleh membawanya sebagai bahan bagi guru; portofolio itu milik murid, bukan syarat, dan tidak disimpan di repositori ini. Kebijakan AI bagian 7.4 berlaku sama bagi semua murid; tugas baca-dan-prediksi ditandai guru "tanpa AI" karena tujuannya melatih membaca dan menelusuri kode. Dasar `[asumsi]`: efek keahlian terbalik dan contoh yang dipudarkan (`docs/riset/ilmu-belajar-kognitif.md` bagian 3.4) serta urutan baca-prediksi-selidiki sebelum menulis (bagian 6.3 riset yang sama).

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
| M5 | Latihan terpadu I | memilih strategi dan struktur data tepat | solusi dan catatan | set soal bergaya OSN (disusun terpisah); tanpa AI (latihan terpadu) |
| M6 | Latihan terpadu II | sama, dengan batas waktu | solusi dan catatan | kontes mini kelas, tanpa AI |
| M7 | Latihan terpadu III | menganalisis kesalahan jawaban | catatan analisis galat | tinjau jawaban salah; tanpa AI (menyelesaikan ulang sendiri) |
| M8 | Latihan terpadu IV | menyajikan beberapa alternatif solusi dan justifikasi | laporan alternatif | satu soal, dua solusi; tanpa AI |
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
| M5 | Bun: runtime dan pengelola paket | memakai `bun run`, `bun install`; memeriksa keberadaan dan reputasi paket sebelum `bun install` (nama paket yang disarankan asisten AI bisa fiktif) | proyek Bun | skrip dan dependensi; memeriksa tiga nama paket di registri sebelum memasangnya (satu nama fiktif disiapkan guru) |
| M6 | Modul ESM dan paket | memecah kode menjadi modul | proyek multi-modul | pustaka kecil |
| M7 | Pengujian dengan `bun test` | menulis uji unit | berkas `*.test.ts` | uji fungsi pengurutan |
| M8 | Struktur data kompleks di TS | memakai `Map`, `Set`, kelas, graf (daftar ketetanggaan) | modul struktur data | graf pertemanan sintetis, BFS |
| M9 | Strategi algoritmik di TS | menerapkan greedy, rekursi, memoisasi | modul strategi | koin; Fibonacci memoisasi |
| M10 | Efisiensi dan alternatif solusi | mengukur waktu; membandingkan dua solusi | laporan perbandingan | `performance.now` dua pengurutan |
| M11 | Kualitas kode | memakai linter dan pemformat; menulis kode terbaca | konfigurasi lint | rapikan proyek |
| M12 | Alur kerja Git: cabang, pull request, ulasan | meninjau kode sejawat dan kode buatan AI | pull request | tinjau PR teman; tinjau satu PR sintetis "buatan AI" berisi cacat tertanam yang disiapkan guru |
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
| M10 | Keamanan aplikasi dan UU | mengenali XSS, rahasia di variabel lingkungan, pokok UU ITE (beserta perubahannya), ketentuan pidana siber dalam KUHP (UU 1/2023), dan UU PDP | lembar periksa | audit aplikasi sendiri |
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
| M10 | Rahasia dan konfigurasi | memakai `.env`, tidak meng-commit rahasia; tidak menempelkan rahasia ke asisten AI | lembar periksa | cari rahasia tak sengaja; periksa contoh permintaan ke asisten AI dari rahasia |
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
| M10 | Privasi dan hukum | memeriksa pokok UU ITE (beserta perubahannya), ketentuan pidana siber dalam KUHP (UU 1/2023), dan UU PDP terkait proyek | catatan kepatuhan | daftar periksa |
| M11 | Ulasan sejawat | menilai proyek tim lain | catatan ulasan | ulasan |
| M12 | Presentasi | mendemonstrasikan proyek | demo | presentasi |
| M13 | Portofolio dan refleksi | mengarsipkan karya dan merefleksikan proses | portofolio | refleksi |
| M14 | Asesmen | menunjukkan seluruh jalur | uji praktik; rubrik proyek | rubrik |

### 3.3 Jalur C: IoT dan Robotika

Jalur terpisah untuk interaksi dengan perangkat fisik (IoT dan robot), yang
disebut panduan bagian C tetapi bukan rumusan CP (bagian 4.3; keputusan
pemilik 2026-11-18, issue #52). Disetujui pemilik pada 2026-11-19 beserta
semua rekomendasi penyusun (bagian 9.3, issue #68); asal isi:
[`draf-jalur-c-iot.md`](draf-jalur-c-iot.md) (riwayat, termasuk
perbandingan platform dan cuplikan harga bertanggal 2026-11-19). Jalur C
memetakan topik fisik ke butir CP hanya lewat prinsip komputasinya (I-P-O,
data, jaringan, rekayasa; bagian 4.1 dan 4.2), sedangkan keterampilan
perakitan dan elektronika **tidak** dihitung sebagai pemenuhan butir CP mana
pun. Tanda (F) pada kolom Latihan berarti membutuhkan perangkat fisik; setiap
minggu praktik dirancang dapat dilatih di simulator. Seluruh data latihan
bersifat sintetis atau data lingkungan benda mati. Semua tabel jalur C
`[asumsi]` sebagai rancangan penyusun yang disetujui; belum diuji di kelas.

**Tujuan jalur C**

Murid yang menyelesaikan jalur C `[asumsi]`:

1. menulis program terstruktur dalam C++ (gaya Arduino) yang membaca sensor
   dan menggerakkan aktuator, dengan pseudocode sebagai rancangan awal;
2. memahami perangkat fisik sebagai perwujudan model Input-Proses-Output
   (sensor = masukan, mikrokontroler = proses, aktuator = keluaran);
3. mengolah data sensor yang berkualitas (kalibrasi, penyaringan derau,
   validasi rentang) dan memakainya untuk keputusan;
4. menghubungkan perangkat dalam jaringan, mengirim data antarperangkat, dan
   memecahkan masalah sambungan;
5. menjalani proses rekayasa produk (kebutuhan, rancangan, implementasi, uji,
   dokumentasi) dan membandingkan beberapa alternatif solusi dengan
   justifikasi;
6. bekerja aman secara listrik dan menjaga privasi (ketentuan keselamatan dan privasi jalur C di bawah).

Jalur C **bukan** pembinaan OSN; jembatan ke OSN dibahas di bagian 5.2.

**Struktur dan prasyarat**

| Butir | Nilai | Status |
| --- | --- | --- |
| Prasyarat | Blok fondasi `FND-X1-M1..M7` (perangkat keras, I-P-O, biner/heksadesimal, jaringan, keamanan dasar) | Keputusan pemilik; menggantikan minggu pengantar komputer |
| Pengetahuan pemrograman awal | Tidak diasumsikan; jalur C mengajarkan dasar pemrograman sendiri di `C-X1-M8..M12` karena murid jalur C belum tentu mengambil jalur A | `[asumsi]` |
| Bahasa | C++ (kerangka Arduino: `setup()`/`loop()`), selaras sintaks jalur A | Keputusan pemilik 2026-11-19 (bagian 9.3) |
| Pola semester | X1: minggu 8–14 (7 minggu); semester lain: minggu 1–12 materi, 13 proyek mini, 14 asesmen dan refleksi | `[asumsi]` |
| Pengelompokan | Praktik dalam kelompok 3 murid per set perangkat | `[asumsi]` |
| Simulator | Setiap minggu praktik dirancang dapat dilatih di simulator bagi sekolah tanpa perangkat; kegiatan yang hanya mungkin dengan perangkat fisik ditandai (F) | `[asumsi]` |
| Platform | ESP32 DevKit diprogram dengan C++ gaya Arduino untuk kelas X-XII; cadangan Raspberry Pi Pico (W bila perlu jaringan) | Keputusan pemilik 2026-11-19 (bagian 9.3); harga, spesifikasi, dan dukungan simulator `[belum terverifikasi]` |

**Perangkat dan biaya** `[asumsi]`: satu set per kelompok tiga murid;
pengadaan campuran (mitra dan sekolah) dengan batas tanggung jawab dicatat
tertulis (bagian 9.3). Semua angka `[asumsi]` kecuali yang bertanda
snapshot; harga komponen selain papan tidak diriset.

| Komponen (kelas) | Jumlah per set | Harga | Status |
| --- | --- | --- | --- |
| Papan ESP32 DevKit (X–XII) | 1 | Rp85.347 (snapshot Tokopedia, 2026-11-19, stok habis) | Cuplikan; harga pengadaan `[belum terverifikasi]` |
| Kabel USB data, papan percobaan (breadboard), kabel jumper | 1 set | `[belum terverifikasi]` | `[asumsi]` |
| LED, resistor, tombol, potensiometer, sensor cahaya, buzzer (X) | 1 set | `[belum terverifikasi]` | `[asumsi]` |
| Sensor suhu dan kelembapan, sensor jarak, servo, layar kecil (X2) | 1 set | `[belum terverifikasi]` | `[asumsi]` |
| Papan kedua untuk komunikasi dua papan (XI1-M10..M13) dan jaringan (XI2) | 1 | sama dengan papan pertama | `[asumsi]` |
| Sasis robot, motor DC, pengendali motor, sensor garis, wadah baterai (XII1) | 1 set per kelompok atau gilir bersama | `[belum terverifikasi]` | `[asumsi]` |
| Komputer lab dengan kompiler dan alat unggah, port USB berfungsi | 1 per kelompok | milik sekolah | `[asumsi]` |
| Jaringan lab terpisah dan penengah pesan lokal di komputer guru (XI2) | 1 | milik sekolah/mitra | `[asumsi]` |

Perkiraan total per set `[asumsi, belum terverifikasi]`: Rp250.000-Rp500.000
untuk set kelas X-XI (dua papan); tambahan Rp300.000-Rp600.000 untuk satu set
robot kelas XII. Rentang ini tebakan perancang, bukan hasil survei harga;
anggaran menunggu penawaran mitra atau toko.

**Keselamatan kerja jalur C**

Aturan jalur C `[asumsi]`:

- **Tidak ada listrik jaringan (220 V).** Seluruh praktik memakai daya USB
  atau baterai bertegangan rendah. Tidak ada relai ke beban listrik jaringan
  dalam program murid.
- **Baterai:** hanya wadah baterai AA/AAA atau baterai pak yang disediakan
  guru; tidak memakai baterai litium tanpa pelindung; murid tidak mengisi
  daya litium. Jenis yang diizinkan diputuskan pemilik bersama mitra.
- **Perakitan:** daya dicabut sebelum mengubah rangkaian; periksa polaritas;
  motor memakai modul pengendali, tidak dihubungkan langsung ke pin papan.
- **Solder:** tidak diwajibkan; papan percobaan dan konektor jumper cukup.
  Bila mitra mengadakan sesi solder, guru atau mitra mengawasi langsung.
- **Mekanik:** robot diuji di meja bertepi; bagian bergerak tidak disentuh
  saat menyala.
- Daftar periksa keselamatan dipajang di lab dan dibaca murid di
  `C-X1-M8` serta `C-XII1-M10`.
- Tidak ada ketentuan keselamatan resmi yang dikutip; sumber standar
  keselamatan lab sekolah `[belum terverifikasi]` dan harus ditambahkan
  setelah mitra memberi rujukannya.

**Peran mitra dalam keselamatan (keputusan pemilik 2026-11-19):** mitra
menyusun dan mengaudit aturan keselamatan; hasilnya ditinjau pemilik.

**Privasi dan data jalur C (ADR-0004)**

- Repositori ini tidak menyimpan data siswa
  ([ADR-0004](../../architecture/adr/0004-no-learner-personal-data.md));
  seluruh contoh data bersifat sintetis atau data lingkungan benda mati
  (suhu ruang, cahaya, jarak).
- **Tidak ada kamera atau mikrofon yang merekam murid**; proyek yang
  memerlukannya tidak termasuk jalur C. Sensor yang mengukur tubuh murid
  (detak jantung, lokasi, gerak pribadi) tidak dipakai.
- Tidak ada akun pribadi murid pada layanan awan; kredensial jaringan lab
  tidak dimasukkan ke kode yang di-commit (dilatih di C-XI2-M2).
- Data dikirim hanya ke server atau penengah pesan lokal milik guru/lab,
  bukan layanan publik, kecuali kebijakan sekolah dan data sintetis
  memungkinkannya.
- Hotspot ponsel pribadi murid tidak dipakai.
- Proyek akhir (C-XII2) tidak boleh mengumpulkan data pribadi nyata.

#### C-X1 (kelas X, semester 1; Fase E)

Minggu 1-7 adalah blok fondasi (bagian 3.0); minggu jalur dimulai dari M8.

| Minggu | Topik | Tujuan | Keluaran | Latihan |
| --- | --- | --- | --- | --- |
| M8 | Mikrokontroler, papan, dan program pertama; keluaran digital | menjelaskan sensor-mikrokontroler-aktuator sebagai I-P-O; mengunggah dan menjalankan `setup()`/`loop()`; memakai variabel dan `digitalWrite` | program LED berkedip; diagram I-P-O perangkat | LED berkedip dengan variabel waktu; tulis pseudocode sebelum kode (F) |
| M9 | Masukan digital, percabangan, logika Boolean | membaca tombol; memakai `if`/`else`, `&&`, `||`, `!` | program tombol-LED; tabel kebenaran | tombol menyalakan LED; dua tombol dengan logika AND/OR (F) |
| M10 | Perulangan dan keluaran serial | memakai `for`/`while`; mencetak nilai ke monitor serial untuk penelusuran galat | program pola lampu; catatan galat | pola lampu berjalan; cetak nilai tombol (F) |
| M11 | Masukan analog dan tipe data | membaca potensiometer dan sensor cahaya; memilih tipe data; memakai ambang | program ambang cahaya | lampu menyala saat gelap; peta nilai ke rentang lain (F) |
| M12 | Fungsi dan array | memecah program menjadi fungsi; menyimpan pola dalam array | program modular | pola lampu dari array; fungsi `bacaCahaya()` |
| M13 | Proyek mini | merancang dan menguji sistem kecil dengan satu sensor dan satu aktuator | rancangan, program, laporan singkat | lampu malam otomatis atau alarm tombol (F) |
| M14 | Asesmen dan refleksi (termasuk asesmen formatif fondasi) | menunjukkan dasar pemrograman dan I-P-O fisik | uji tulis dan praktik; jurnal | kuis kode dan rangkaian |

#### C-X2 (kelas X, semester 2; Fase E)

| Minggu | Topik | Tujuan | Keluaran | Latihan |
| --- | --- | --- | --- | --- |
| M1 | Ulasan dan penelusuran galat perangkat | memisahkan galat kode dari galat rangkaian | daftar galat umum (kode dan kabel) | perbaiki 5 rangkaian dan program rusak (F) |
| M2 | Sensor suhu dan kelembapan | membaca sensor lewat pustaka; memahami satuan | program pembacaan | tampilkan suhu ruang kelas (F) |
| M3 | Data berkualitas dari sensor | memeriksa rentang, mengenali derau, dan membuang data ganjil | tabel data bersih | validasi rentang; tandai lonjakan palsu |
| M4 | Array dan rata-rata bergerak | menyimpan beberapa pembacaan dan merata-ratakannya | program penyaring | rata-rata 5 pembacaan terakhir |
| M5 | Keluaran analog (PWM) | mengatur kecerahan atau kecepatan dengan PWM | program PWM | redup-terang LED dengan potensiometer (F) |
| M6 | Aktuator: servo dan buzzer | menggerakkan servo ke sudut tertentu; membunyikan nada | program aktuator | palang pintu mini (F) |
| M7 | Waktu tanpa `delay` dan mesin keadaan sederhana | memakai penanda waktu `millis()`; memodelkan keadaan | diagram keadaan; program | lampu lalu lintas mini |
| M8 | Menampilkan data | menampilkan nilai di layar kecil atau plotter serial | program tampilan | grafik suhu di plotter serial (F) |
| M9 | Struktur data: tumpukan dan antrian sebagai penyangga | memakai LIFO dan FIFO untuk data sensor | program stack/queue | simulasi antrian pembacaan (sintetis) |
| M10 | Pencarian dan pengurutan data sensor | mencari nilai dan mengurutkan untuk median | program median | median dari 7 pembacaan |
| M11 | Sensor jarak dan keputusan | membaca jarak; memilih ambang keputusan dengan data | program jarak | alarm parkir mini (F) |
| M12 | Mencatat data | mengirim data ke komputer sebagai teks berformat dan menyimpannya | berkas data sintetis atau lingkungan | catat suhu kelas 10 menit |
| M13 | Proyek mini: stasiun pengamat | memadukan sensor, penyaringan, dan tampilan | perangkat, program, laporan | stasiun suhu dan cahaya kelas (F) |
| M14 | Asesmen dan refleksi | menunjukkan struktur data dan algoritma standar pada data sensor | uji tulis dan praktik | kuis kode |

#### C-XI1 (kelas XI, semester 1; Fase F)

| Minggu | Topik | Tujuan | Keluaran | Latihan |
| --- | --- | --- | --- | --- |
| M1 | Proses rekayasa produk IoT | menguraikan kebutuhan, rancangan, implementasi, uji | dokumen rancangan satu halaman | rancang perangkat pemantau |
| M2 | Kualitas kode dan pengujian | menulis kasus uji dan menjaga keterbacaan | berkas kasus uji | uji tepi pembacaan sensor |
| M3 | Tipe data bentukan | memakai `struct` untuk menyatukan data sensor | modul data | `struct Pembacaan` |
| M4 | Pustaka sendiri | membuat kelas atau pustaka kecil untuk sebuah sensor | pustaka sensor | pustaka sensor jarak (F) |
| M5 | Alternatif solusi I: ambang dan histeresis | membandingkan dua cara mengambil keputusan dan menjustifikasi | laporan perbandingan | lampu: ambang sederhana vs histeresis |
| M6 | Kendali hidup-mati | merancang kendali hidup-mati pada kasus pemanas atau kipas simulasi | program kendali | termostat mini (F) |
| M7 | Alternatif solusi II: kendali proporsional | membandingkan kendali hidup-mati dan proporsional | laporan perbandingan | kecerahan proporsional terhadap cahaya (F) |
| M8 | Efisiensi memori dan waktu pada mikrokontroler | menghitung memori dan waktu; memilih struktur data yang hemat | tabel perbandingan | array vs penyangga melingkar |
| M9 | Struktur data: penyangga melingkar | merancang penyangga melingkar untuk aliran data | program penyangga | rata-rata bergerak dengan penyangga |
| M10 | Pengiriman data antarperangkat I | mengirim data antar dua papan lewat serial | protokol sederhana | kirim pembacaan dari papan A ke B (F) |
| M11 | Pengiriman data antarperangkat II | merancang format pesan dan pemeriksaan galat sederhana | spesifikasi pesan | tambahkan penanda awal dan jumlah periksa |
| M12 | Pemecahan masalah sambungan | mendiagnosis urutan: daya, kabel, kode, format pesan | diagram alir diagnosis | tiga skenario gangguan sintetis (F) |
| M13 | Proyek mini | membuat sistem dua papan teruji | perangkat, uji, laporan | proyek kelompok (F) |
| M14 | Asesmen dan refleksi | menunjukkan rekayasa, kendali, dan pengiriman data | uji tulis dan praktik | kuis kode |

#### C-XI2 (kelas XI, semester 2; Fase F)

| Minggu | Topik | Tujuan | Keluaran | Latihan |
| --- | --- | --- | --- | --- |
| M1 | Jaringan nirkabel dan perangkat IoT | menjelaskan penghubungan papan ke jaringan lab dan peran alamat IP | papan terhubung ke jaringan lab | cetak alamat IP papan (F) |
| M2 | Keamanan konektivitas | menyimpan kredensial di luar kode, mengganti sandi bawaan, memakai jaringan lab terpisah; tidak menempelkan kredensial atau kunci ke layanan AI | lembar periksa keamanan | audit kode dari rahasia yang tertanam; periksa contoh permintaan ke asisten AI dari kredensial |
| M3 | Klien HTTP | mengirim data sensor ke server lokal guru | program klien | kirim suhu ke server lab (F) |
| M4 | Server mini | melayani halaman data sederhana dari papan atau komputer lab | halaman data | halaman suhu lokal (F) |
| M5 | Publikasi-langganan: konsep | menjelaskan pola publikasi-langganan dan penengah pesan (broker) | diagram alir pesan | permainan peran broker |
| M6 | Publikasi-langganan: praktik | menerbitkan dan berlangganan topik lewat broker lokal guru | program penerbit dan pelanggan | dua papan bertukar data lewat broker lokal (F) |
| M7 | Format data | menyusun data sebagai JSON | pesan JSON | ubah pembacaan menjadi JSON |
| M8 | Pemecahan masalah jaringan IoT | mendiagnosis dari sinyal, alamat, broker, hingga format | catatan diagnosis | tiga gangguan sintetis (F) |
| M9 | Sumber data terbuka dan legal | menilai lisensi dan keterpercayaan; membandingkan data sensor sendiri dengan data terbuka yang dipilih guru | catatan sumber | baca lisensi satu dataset |
| M10 | Rekap dan visualisasi | merekap per kategori dan menyajikan grafik | tabel dan grafik | rekap suhu per jam |
| M11 | Prediksi sederhana | memakai rata-rata bergerak dan garis kecenderungan | program prediksi | prediksi suhu berikutnya dan galatnya |
| M12 | Keputusan otomatis berbasis data | mengaitkan hasil analisis ke aktuator | sistem keputusan | kipas menyala dari tren suhu (F) |
| M13 | Proyek: sistem IoT lokal | membangun sistem pemantau dengan pengiriman data dan analisis | sistem dan laporan | proyek kelompok (F) |
| M14 | Asesmen dan refleksi | menunjukkan jaringan, data, dan keamanan | uji tulis dan praktik | kuis kode |

#### C-XII1 (kelas XII, semester 1; Fase F)

| Minggu | Topik | Tujuan | Keluaran | Latihan |
| --- | --- | --- | --- | --- |
| M1 | Merancang kebutuhan sistem | merumuskan kebutuhan pengguna fiktif dan batasan | dokumen kebutuhan | wawancara pengguna fiktif untuk robot sederhana |
| M2 | Arsitektur dan pemilihan komponen | memilih sensor, pengendali, dan daya sesuai kebutuhan | tabel pemilihan komponen | bandingkan dua susunan komponen |
| M3 | Motor DC dan pengendali motor | menggerakkan motor lewat modul pengendali bertegangan rendah | program motor | robot maju-mundur-belok (F) |
| M4 | Sensor garis dan jarak | membaca sensor dan menentukan ambang | program sensor | kalibrasi sensor garis (F) |
| M5 | Mesin keadaan robot | memodelkan perilaku robot sebagai keadaan | diagram keadaan | robot menghindari halangan (F) |
| M6 | Pengikut garis: strategi 1 | menerapkan kendali hidup-mati | program pengikut garis | lintasan uji (F) |
| M7 | Pengikut garis: strategi 2 | menerapkan kendali proporsional | program proporsional | lintasan uji yang sama (F) |
| M8 | Membandingkan strategi | mengukur dan menjustifikasi pilihan strategi | laporan perbandingan | waktu tempuh dan galat dua strategi |
| M9 | Kalibrasi dan pengujian sistematis | merancang uji berulang dan mencatat hasil | tabel hasil uji | sepuluh kali uji per strategi |
| M10 | Daya dan keselamatan baterai | memilih sumber daya aman dan membaca tegangan | lembar periksa daya | rencana daya robot |
| M11 | Hukum dan etika sensor | menjelaskan pokok UU ITE (beserta perubahannya), ketentuan pidana siber dalam KUHP (UU 1/2023), dan UU PDP terkait perangkat yang merekam | catatan kepatuhan | daftar periksa proyek |
| M12 | Dokumentasi dan pemeliharaan | menulis dokumen perakitan dan panduan pengguna | dokumen proyek | panduan perakitan |
| M13 | Proyek | menyiapkan rancangan proyek akhir | rencana proyek | rencana kerja |
| M14 | Asesmen dan refleksi | menunjukkan rancangan, kendali, dan pengujian | uji tulis dan praktik | kuis |

#### C-XII2 (kelas XII, semester 2; Fase F)

| Minggu | Topik | Tujuan | Keluaran | Latihan |
| --- | --- | --- | --- | --- |
| M1 | Pemeliharaan program I | memperbaiki dan merapikan proyek lama | daftar perbaikan | refaktor satu proyek semester lalu |
| M2 | Pemeliharaan program II | mengoptimalkan dan mencatat alasan | catatan optimasi | kurangi pemakaian memori |
| M3 | Memodelkan masalah lapangan | menerjemahkan masalah nyata sekolah menjadi sistem | lembar pemodelan | tiga masalah fiktif |
| M4 | Ulasan keamanan dan privasi | memeriksa rahasia, jaringan, dan data | laporan keamanan | audit proyek sendiri |
| M5 | Proyek akhir: rancangan | merancang proyek akhir | dokumen rancangan | pilih topik |
| M6 | Proyek akhir: sprint 1 (perangkat keras) | merakit dan menguji rangkaian | rangkaian teruji | perakitan (F) |
| M7 | Proyek akhir: sprint 2 (program) | menulis program inti | program inti | implementasi |
| M8 | Proyek akhir: sprint 3 (jaringan dan data) | menghubungkan dan mencatat data | sistem terhubung | integrasi (F) |
| M9 | Proyek akhir: sprint 4 (penyempurnaan) | memperbaiki kualitas dan keandalan | rilis kandidat | perbaikan |
| M10 | Ulasan sejawat | menilai proyek tim lain | catatan ulasan | tinjau proyek |
| M11 | Pengujian akhir | menguji sistem terhadap kebutuhan | laporan uji | uji penerimaan |
| M12 | Dokumentasi akhir | menulis dokumentasi lengkap | dokumen proyek | panduan pengguna |
| M13 | Presentasi dan portofolio | mempresentasikan dan mengarsipkan | demo; portofolio | presentasi |
| M14 | Asesmen dan refleksi | menunjukkan seluruh jalur | uji praktik; rubrik proyek | rubrik |

### 3.4 Jalur D: Kecerdasan Buatan dan Analisis Data

Jalur AI terpisah (hasil riset buku AI, issue #66 dan #83). Disetujui
pemilik pada 2026-11-19 beserta semua rekomendasi penyusun (bagian 9.3, issue
#84); asal isi: [`draf-jalur-d-ai.md`](draf-jalur-d-ai.md) (riwayat,
termasuk perbandingan alat dan penilaian 11 kriteria). **Jalur D adalah
pengayaan di luar rumusan CP:** rumusan CP bagian 1.3 tidak memuat kata
"kecerdasan buatan", "AI", atau "machine learning" dan tidak mewajibkan AI;
jalur D **tidak dihitung sebagai pemenuhan butir CP** mana pun. Irisan
terdekatnya dengan CP (terutama F-AD-a) dicatat terpisah di bagian 4.5 dan
tidak dihitung. Jalur D tidak menggantikan jalur A atau B dan tidak
menjanjikan persiapan OSN (bagian 5.3). Semua tabel jalur D `[asumsi]`
sebagai rancangan penyusun yang disetujui; belum diuji di kelas.

**Tujuan jalur D**

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

**Prasyarat dan hubungan dengan blok fondasi**

| Kebutuhan jalur D | Dipenuhi oleh |
| --- | --- |
| Data sebagai biner, teks, dan gambar (piksel) sebagai bahan data | `FND-X1-M3` (representasi data) |
| Model Input-Proses-Output sebagai kerangka sistem AI | `FND-X1-M1` |
| Keamanan akun, privasi, dan etika digital | `FND-X1-M6` |
| Lisensi dan atribusi (data dan perangkat lunak terbuka) | `FND-X1-M2` |
| Konsep jaringan sebagai latar layanan daring dan API | `FND-X1-M4..M5` |
| Dokumen, lembar kerja, dan presentasi untuk laporan | `FND-X1-M7` |

Jalur D tidak mensyaratkan jalur A atau B `[asumsi]`; murid yang hanya
mengambil jalur D belajar pemrograman Python di `D-XI1-M2..M4` (keputusan
pemilik, bagian 9.3; tiga minggu mungkin kurang, perlu diuji di kelas).

**Keputusan alat dan coding jalur D (bagian 9.3)**

- Opsi bertahap: kelas X tanpa kode (Orange Data Mining dan kegiatan tanpa
  komputer); Python dengan `pandas` dan `scikit-learn` mulai kelas XI
  semester 1; Orange tetap untuk eksplorasi cepat. Rencana mingguan di bawah
  mengikuti opsi ini.
- Pemakaian AI generatif oleh murid: **bebas dengan etika** (keputusan
  pemilik 2026-11-19, bagian 9.4; menggantikan aturan v1.2 "hanya
  didemonstrasikan guru"). Aturannya ada di bagian 7.4; murid tidak wajib
  punya akun pribadi.
- Teachable Machine hanya sebagai pengayaan dengan data benda (tanpa wajah
  dan suara).
- Seri Buku AI SMA belum ditautkan: ditautkan setelah guru membaca isinya dan
  penerbit menjelaskan lisensinya (isi seri tidak disalin atau diparafrasekan).
- Kesiapan lab (pemasangan Orange dan Python di semua komputer atau hanya
  sebagian) diputuskan setelah survei lab; spesifikasi minimum
  `[belum terverifikasi]`.

**Etika AI dan privasi data siswa**

Berlaku untuk seluruh minggu jalur D. Dasarnya
[ADR-0004](../../architecture/adr/0004-no-learner-personal-data.md) dan
silabus bagian 7.3 (UU No. 27 Tahun 2022 tentang Pelindungan Data Pribadi
dikutip ADR-0004; peserta adalah anak di bawah umur).

| Aturan | Isi |
| --- | --- |
| Tanpa data pribadi siswa | Data latih, data uji, dan contoh tidak memuat nama, kontak, alamat, nomor identitas, sekolah, atau data lain yang dapat mengenali murid. Data bersifat sintetis atau dataset terbuka dan legal. |
| Tanpa wajah dan suara siswa | Wajah, suara, dan foto murid atau orang lain **tidak** dipakai sebagai data latih atau uji (termasuk di Teachable Machine). Bahan latih berupa benda, gambar atau pola sintetis, atau data tabel. |
| Tanpa akun pribadi wajib | Tidak ada kegiatan yang mewajibkan murid memiliki akun pribadi di layanan daring. Murid boleh memakai AI generatif dengan etika (bagian 7.4), dengan tunduk pada usia minimum dan ketentuan layanan serta izin sekolah dan orang tua; syarat usia layanan `[belum terverifikasi]` diperiksa guru lebih dulu. |
| Tanpa data pribadi pada permintaan | Guru dan murid tidak menaruh data pribadi, rahasia, atau tugas bernilai pada layanan daring, termasuk pada permintaan (prompt) ke asisten AI. |
| Rahasia | Kunci layanan dan `.env` tidak di-commit atau dibagikan. |
| Data terbuka dan legal | Sumber dataset dan lisensinya dicatat (`D-XI1-M5`); data yang syaratnya tidak jelas tidak dipakai. |
| Keterbukaan | Murid mencatat bila keluaran AI dipakai dalam tugas (log pemakaian AI, bagian 7.4); keluaran AI diverifikasi dan tidak disajikan sebagai fakta. |
| Hasil karya | Model dan data hasil latih tidak memuat data pribadi; tidak ada data murid disimpan di repositori ini. |
| Kebijakan sekolah | Kebijakan sekolah dan orang tua tentang layanan AI dan perangkat diikuti; penyusun tidak memverifikasi kebijakan Kemendikdasmen tentang AI di sekolah `[belum terverifikasi]`. |

#### D-X1 (kelas X, semester 1; Fase E)

Minggu 1-7 adalah blok fondasi (bagian 3.0); minggu jalur dimulai dari M8.

| Minggu | Topik | Tujuan | Keluaran | Latihan |
| --- | --- | --- | --- | --- |
| M8 | Apa itu AI dan apa yang bukan | membedakan AI dari program biasa; menyebut contoh AI sehari-hari dan batasannya; menggambar sistem AI dengan model Input-Proses-Output | diagram I-P-O sistem AI | memilah daftar contoh "AI atau bukan"; telaah satu aplikasi fiktif |
| M9 | Data, fitur, dan label | menjelaskan dataset, fitur, dan label; menilai kualitas dan bias data | tabel data beranotasi | menyusun 20 kartu benda bersama label; temukan data ganjil pada tabel sintetis |
| M10 | Klasifikasi tanpa komputer | membuat aturan keputusan dari contoh berlabel dan mengujinya | pohon keputusan di kertas | klasifikasikan kartu benda; hitung ketepatan aturan |
| M11 | Orange: memuat dan melihat data | memuat tabel di Orange; memakai tabel data dan diagram sebar | alur kerja Orange | eksplorasi tabel sintetis |
| M12 | Model pertama dan pembagian data latih/uji | melatih pohon keputusan; membaca akurasi pada data uji | alur kerja klasifikasi | bandingkan akurasi data latih dan data uji |
| M13 | Proyek mini | mengklasifikasikan data tabel sintetis dan melaporkan hasil | laporan singkat | proyek kelompok |
| M14 | Asesmen dan refleksi | menunjukkan konsep dasar data dan model; sekaligus asesmen formatif fondasi yang dilebur ke minggu ini | uji tulis dan praktik; jurnal | kuis |

#### D-X2 (kelas X, semester 2; Fase E)

| Minggu | Topik | Tujuan | Keluaran | Latihan |
| --- | --- | --- | --- | --- |
| M1 | Dari data ke keputusan; ulasan | menguraikan alur data, model, evaluasi, keputusan; mengenali model yang salah | alur satu halaman | telaah model sintetis yang salah |
| M2 | Bias dan keadilan | menjelaskan sumber bias dan dampaknya | catatan kasus | kasus fiktif pemberian nilai otomatis |
| M3 | Privasi dan data pribadi | menjelaskan data pribadi, risiko penggunaan layanan AI, dan pokok pelindungan data pribadi | daftar periksa privasi | tandai data pribadi pada contoh fiktif |
| M4 | Regresi: garis kecenderungan | memakai regresi linear di Orange | alur regresi | prediksi nilai dari data sintetis |
| M5 | Galat dan kelebihan-suai (overfitting) | mengukur galat dan mengenali overfitting | catatan galat | bandingkan model sederhana dan rumit |
| M6 | Klasifikasi: pohon keputusan dan tetangga terdekat | melatih dan membandingkan dua penggolong | tabel perbandingan | dua model pada satu data |
| M7 | Mengevaluasi klasifikasi | membaca matriks kebingungan; membedakan jenis kesalahan | matriks beranotasi | hitung akurasi dan jenis galat |
| M8 | Pengelompokan tanpa label | melakukan pengelompokan dan menafsirkan kelompok | alur pengelompokan | kelompokkan data sintetis |
| M9 | Visualisasi untuk bercerita | memilih grafik yang tepat dan jujur | satu halaman visual | grafik dari data sintetis |
| M10 | Teks sebagai data | menjelaskan teks sebagai fitur; menggolongkan teks sintetis | alur teks | pisahkan kalimat sintetis ke dua kategori |
| M11 | AI generatif dan verifikasi | menjelaskan cara kerja kasar dan keterbatasannya (jawaban keliru yang meyakinkan); memverifikasi keluaran; membedakan AI sebagai subjek (yang dipelajari) dan AI sebagai alat menulis kode; menunjukkan bahwa perintah yang sama dapat memberi keluaran berbeda | lembar verifikasi | perintah yang sama dijalankan berulang dan keluarannya dibandingkan (demonstrasi guru, atau murid sendiri sesuai kebijakan AI, bagian 7.4); murid memeriksa klaim dengan sumber |
| M12 | HAKI, lisensi data, dan AI | membaca lisensi data; menjelaskan isu hak cipta keluaran generatif | tabel lisensi | baca satu lisensi data terbuka |
| M13 | Proyek mini | menyelesaikan satu pertanyaan dengan data sintetis dari data hingga evaluasi | laporan | proyek kelompok |
| M14 | Asesmen dan refleksi | menunjukkan alur data-model-evaluasi dan etika dasar | uji tulis dan praktik; jurnal | kuis |

#### D-XI1 (kelas XI, semester 1; Fase F)

| Minggu | Topik | Tujuan | Keluaran | Latihan |
| --- | --- | --- | --- | --- |
| M1 | Proses proyek data dan AI | menguraikan masalah, data, model, evaluasi, penggunaan | rancangan satu halaman | rancang proyek fiktif |
| M2 | Python I | memakai variabel, tipe, kondisi, perulangan | skrip dasar | hitung statistik sederhana |
| M3 | Python II | memakai fungsi, daftar, kamus | skrip modular | rekap data sintetis |
| M4 | Membaca berkas tabel | membaca dan menulis CSV dengan library | skrip berkas | baca CSV sintetis |
| M5 | Sumber data terbuka dan legal | menilai sumber, lisensi, dan keterpercayaan data | catatan sumber | pilih dataset terbuka dan baca lisensinya |
| M6 | Membersihkan data | menangani nilai hilang, duplikat, rentang | skrip pembersih | bersihkan data sintetis |
| M7 | Statistik deskriptif dan grafik | merangkum data dan menyajikan grafik | grafik dan ringkasan | grafik dari data terbuka |
| M8 | Prediksi sederhana | memakai rata-rata bergerak dan regresi linear; mengevaluasi galat | skrip prediksi | prediksi nilai berikutnya dan galat |
| M9 | Klasifikasi dengan `scikit-learn` | melatih dan menguji penggolong | skrip penggolong | klasifikasi data sintetis |
| M10 | Evaluasi dan validasi | membagi data; membaca metrik; validasi silang secara intuitif | tabel metrik | bandingkan pembagian data |
| M11 | Membandingkan model | menghasilkan dua model atau lebih dan menjustifikasi pilihan | laporan perbandingan | tiga model pada satu data |
| M12 | Kebocoran data dan bias evaluasi | mengenali kebocoran data dan evaluasi yang menyesatkan | catatan kasus | perbaiki evaluasi yang bocor |
| M13 | Proyek mini | mengerjakan alur analisis data terbuka hingga prediksi | program dan laporan | proyek kelompok |
| M14 | Asesmen dan refleksi | menunjukkan data, prediksi, dan evaluasi | uji tulis dan praktik | kuis kode |

#### D-XI2 (kelas XI, semester 2; Fase F)

| Minggu | Topik | Tujuan | Keluaran | Latihan |
| --- | --- | --- | --- | --- |
| M1 | Pengelompokan dengan Python | memakai k-means dan menafsirkan kelompok | skrip pengelompokan | kelompokkan data sintetis |
| M2 | Pohon keputusan dan ensambel | menjelaskan dan memakai pohon serta hutan acak | skrip model | bandingkan pohon dan hutan |
| M3 | Rekayasa fitur | membuat dan memilih fitur | skrip fitur | tambah fitur pada data sintetis |
| M4 | Teks: pembersihan dan representasi | membersihkan teks; merepresentasikannya sebagai angka | skrip teks | representasi kalimat sintetis |
| M5 | Klasifikasi teks | melatih penggolong teks | skrip penggolong teks | klasifikasi sentimen kalimat sintetis berbahasa Indonesia |
| M6 | Gambar sebagai angka | menghubungkan piksel (`FND-X1-M3`) dengan fitur; menggolongkan gambar | skrip gambar | gambar sintetis hasil program (bentuk dan pola) |
| M7 | Gagasan jaringan saraf | menjelaskan neuron, bobot, dan pelatihan secara konseptual | diagram beranotasi | hitung keluaran satu neuron dengan tangan |
| M8 | Melatih jaringan kecil | melatih jaringan saraf kecil pada data tabel sintetis | skrip jaringan | bandingkan dengan model lain |
| M9 | Menjelaskan keputusan model | menafsirkan fitur berpengaruh dan keterbatasan penjelasan | catatan penjelasan | tafsirkan satu model |
| M10 | Penyalahgunaan AI dan verifikasi konten | mengenali konten palsu, penipuan, dan cara memverifikasi teks, gambar, video | lembar periksa | periksa contoh sintetis |
| M11 | Layanan lewat API (opsional) | menjelaskan cara aplikasi memakai model lewat layanan; menjaga rahasia | catatan arsitektur | gambar alur permintaan; tanpa kunci pribadi |
| M12 | Kartu model dan dokumentasi | mendokumentasikan data, tujuan, batasan, dan risiko model; menyatakan perkiraan biaya komputasi dan energi beserta ketidakpastiannya | kartu model (dengan baris biaya komputasi dan energi) | tulis kartu model proyek; sertakan baris perkiraan biaya komputasi dan energi (rentang kasar; tulis "tidak diketahui" bila tak dapat diperkirakan) |
| M13 | Proyek mini | mengerjakan satu proyek model dari data hingga kartu model | program dan laporan | proyek kelompok |
| M14 | Asesmen dan refleksi | menunjukkan model, evaluasi, dan etika | uji tulis dan praktik | kuis kode |

#### D-XII1 (kelas XII, semester 1; Fase F)

| Minggu | Topik | Tujuan | Keluaran | Latihan |
| --- | --- | --- | --- | --- |
| M1 | Merumuskan proyek akhir | menentukan masalah dan kebutuhan pengguna fiktif | dokumen kebutuhan | wawancara pengguna fiktif |
| M2 | Studi kasus AI I | menimbang manfaat dan risiko dari sumber publik (mis. kesehatan, pendidikan) | catatan kasus | baca satu kasus dan tulis manfaat dan risikonya |
| M3 | Studi kasus AI II | menimbang manfaat dan risiko pada bidang lain (mis. transportasi, pertanian, budaya) | catatan kasus | idem |
| M4 | Hukum dan kebijakan | menjelaskan pokok UU ITE (beserta perubahannya), ketentuan pidana siber dalam KUHP (UU 1/2023), dan UU PDP terkait proyek AI | daftar periksa kepatuhan | periksa rancangan proyek |
| M5 | Menyiapkan data proyek | memilih data terbuka dan legal atau menyintesis data | catatan sumber dan data | siapkan data proyek |
| M6 | Garis dasar dan metrik | menentukan metrik dan model pembanding sederhana | laporan garis dasar | hitung garis dasar |
| M7 | Iterasi model I | memperbaiki model berdasarkan bukti | catatan eksperimen | satu perbaikan terukur |
| M8 | Iterasi model II | mencatat eksperimen agar dapat diulang | tabel eksperimen | tiga eksperimen |
| M9 | Ulasan sejawat | menilai data dan model tim lain | catatan ulasan | ulasan |
| M10 | Kualitas kode dan keterulangan | merapikan kode; menetapkan benih acak; menulis README; mencatat versi model dan perintah bila AI dipakai | proyek rapi | refaktor satu skrip; catat versi model dan perintah AI yang dipakai di README |
| M11 | Penilaian risiko dan etika proyek | memakai daftar periksa risiko dan dampak | laporan risiko | audit proyek sendiri |
| M12 | Menyajikan hasil | menyajikan temuan dengan grafik dan narasi jujur | draf presentasi | latihan presentasi |
| M13 | Proyek | menyiapkan proyek akhir | rencana dan kemajuan | rencana kerja |
| M14 | Asesmen dan refleksi | menunjukkan kesiapan proyek akhir | uji tulis dan praktik | rubrik |

#### D-XII2 (kelas XII, semester 2; Fase F)

| Minggu | Topik | Tujuan | Keluaran | Latihan |
| --- | --- | --- | --- | --- |
| M1 | Perencanaan proyek akhir | menyusun rencana, pembagian peran, dan jadwal | rencana proyek | pilih topik |
| M2 | Rancangan | merancang data, model, dan evaluasi | dokumen rancangan | rancangan tim |
| M3 | Sprint 1: data | menyiapkan dan memeriksa data | data siap pakai | catatan kualitas data |
| M4 | Sprint 1: garis dasar | membuat model pembanding | laporan garis dasar | metrik awal |
| M5 | Sprint 2: model | membangun dan membandingkan model | model dan catatan | tiga model |
| M6 | Sprint 2: evaluasi | mengevaluasi dengan benar dan mencari galat | laporan evaluasi | analisis galat |
| M7 | Sprint 3: penyempurnaan | memperbaiki model dan kode | rilis kandidat | perbaikan |
| M8 | Pengujian akhir | menguji pada data yang belum dipakai | laporan uji | uji akhir |
| M9 | Dokumentasi | menulis kartu model dan panduan | dokumen | kartu model |
| M10 | Ulasan etika dan privasi | memeriksa data pribadi, bias, dan dampak | laporan etika | audit |
| M11 | Ulasan sejawat | menilai proyek tim lain | catatan ulasan | ulasan |
| M12 | Presentasi | mendemonstrasikan proyek | demo | presentasi |
| M13 | Portofolio dan refleksi | mengarsipkan karya dan merefleksikan proses | portofolio | refleksi |
| M14 | Asesmen | menunjukkan seluruh jalur | uji praktik; rubrik proyek | rubrik |

### 3.5 Jalur E: Komputasi Kuantum dan Cloud Quantum

Jalur komputasi kuantum terpisah (issue #88). Disetujui pemilik pada
2026-11-19 beserta semua rekomendasi penyusun (bagian 9.3); asal isi:
[`draf-jalur-e-kuantum.md`](draf-jalur-e-kuantum.md) (riwayat, termasuk
perbandingan stack, fakta layanan cloud quantum bertanggal akses 2026-11-19
yang harus dicek ulang sebelum dipakai, dan analisis tabrakan kode).
**Jalur E adalah pengayaan di luar rumusan CP:** ia tidak menggantikan,
mengurangi, atau dihitung sebagai pemenuhan butir CP mana pun, dan tidak
menggeser minggu jalur lain. Kemiripan terdekatnya dengan butir CP (F-BK-b,
F-AP-d) dicatat terpisah di bagian 4.5 dan tidak dihitung. Semua tabel jalur E
`[asumsi]` sebagai rancangan penyusun yang disetujui; belum diuji di kelas.

**Rentang kelas dan kode minggu (keputusan pemilik 2026-11-19)**

- Jalur E hanya **kelas XI dan XII** (Fase F; empat semester: XI1, XI2, XII1,
  XII2). Jalur E tidak memiliki semester kelas X dan tidak mengikuti blok
  fondasi; semester XI1 dan XI2 sebagai **inti** (konsep, matematika,
  simulator, entanglement, Deutsch-Jozsa), XII1 dan XII2 sebagai **lanjutan**
  (Grover, derau, cloud, proyek akhir). Murid yang hanya sempat dua semester
  tetap menutup inti yang utuh.
- Awalan kode minggu jalur E adalah `E-` (contoh `E-XI1-M3`). Aturan
  penulisan: kode minggu selalu memuat segmen kelas dan diakhiri `M<n>`; kode
  butir CP selalu `E-` atau `F-` diikuti elemen dua huruf (`E-BK-e`). Tidak ada
  tabrakan mesin antara keduanya; kerancuan lisan ("butir E" dan "jalur E")
  diatasi dengan aturan ini dan tanpa mengubah skema.
- Beban 3 JP per minggu seperti jalur lain.

**Tujuan jalur E**

Setelah menyelesaikan jalur E, murid mampu `[asumsi]`:

1. menjelaskan qubit, superposisi, pengukuran, dan entanglement dengan
   bahasa dan matematika yang tepat pada tingkat SMA (vektor keadaan dan
   matriks gerbang), tanpa mitos populer;
2. menyusun dan menelusuri sirkuit kuantum kecil, serta memprediksi
   distribusi hasil pengukurannya;
3. menulis simulator vektor keadaan sederhana dan memakainya untuk memeriksa
   perhitungan tangan;
4. menjelaskan gagasan algoritma Deutsch-Jozsa, Bernstein-Vazirani, dan
   Grover sederhana, serta membandingkan jumlah pertanyaan (query) dengan
   pendekatan klasik;
5. menjelaskan peran dan keterbatasan cloud quantum (antrian pekerjaan,
   derau, kuota, biaya) dan membaca hasil pekerjaan pada perangkat nyata
   yang dijalankan guru;
6. menilai klaim populer tentang komputasi kuantum secara kritis.

Bukan tujuan: fisika kuantum formal, pembuktian kompleksitas, pengodean
koreksi galat kuantum, dan menjalankan algoritma Shor atau Grover berskala
bermakna (tidak mungkin di perangkat saat ini untuk ukuran masalah kelas;
catatan itu sendiri `[belum terverifikasi]` sampai modul ditulis dan
disumberkan).

**Prasyarat matematika dan ketergantungan**

| Topik | Kebutuhan di jalur E | Sumber pemenuhan | Status |
| --- | --- | --- | --- |
| Probabilitas dasar (peluang, nilai harapan, distribusi diskret) | aturan Born; membaca histogram hasil | Matematika sekolah `[belum terverifikasi]`; dibangun ulang singkat di `E-XI1-M2` | Tidak ada di seri #87 |
| Vektor (penjumlahan, perkalian skalar, panjang, hasil kali dalam) | vektor keadaan | Matematika sekolah `[belum terverifikasi]`; `E-XI1-M2` | Tidak ada di seri #87 |
| Matriks (perkalian matriks-vektor, matriks-matriks, transpos) | gerbang sebagai matriks | Matematika sekolah `[belum terverifikasi]`; `E-XI1-M3` | Tidak ada di seri #87 |
| Bilangan kompleks dasar (a + bi, modulus, konjugat) | amplitudo dan fase | Matematika sekolah `[belum terverifikasi]`; `E-XI1-M4`; **amplitudo real dahulu**, kompleks hanya untuk fase | Tidak ada di seri #87 |
| Biner dan bit | kaitan qubit dengan bit | `FND-X1-M3`; `matkom-sistem-bilangan-basis` | Ada |
| Logika Boolean dan tabel kebenaran | gerbang klasik, oracle | `matkom-logika-proposisi` | Ada |
| Fungsi, satu-satu dan pada | reversibilitas; oracle `f` | `matkom-himpunan-relasi-fungsi` | Ada |
| Pertumbuhan fungsi dan logaritma basis 2 | √N lawan N; 2^n amplitudo | `matkom-pertumbuhan-fungsi` | Ada |
| Induksi dan rekursi | opsional (pola Grover berulang) | `matkom-induksi-dan-rekursi-matematis` | Ada (opsional) |

Vektor, matriks, bilangan kompleks, dan probabilitas dibangun di dalam jalur
selama tiga minggu `E-XI1-M2..M4` (keputusan pemilik 2026-11-19; dapat
dipromosikan menjadi modul `matkom-*` setelah dicoba). Apakah materi itu
sudah diajarkan di Matematika SMA sebelum kelas XI tidak diverifikasi.
Minggu simulator buatan sendiri (`E-XI1-M10..M12`, `E-XI2-M4`) mensyaratkan
dasar pemrograman jalur A atau B (setidaknya setara `A-X1-M9..M12` atau
`B-X1-M9..M12`); bagian konsep terbuka bagi semua murid.

**Stack dan akses cloud quantum (keputusan pemilik 2026-11-19, bagian 9.3)**

- Inti murid: Quirk (alat visual di peramban) ditambah simulator vektor
  keadaan buatan sendiri dalam bahasa jalurnya (C++ jalur A atau
  TypeScript/Bun jalur B).
- Python dengan Qiskit dan simulator lokal hanya sebagai **demonstrasi guru**
  (`E-XII1-M9..M12`), bukan prasyarat murid.
- Cloud quantum: **demonstrasi guru** lewat satu akun sekolah atau lembaga
  (satu atau dua pekerjaan kecil per semester); murid tidak memakai akun
  cloud quantum. Syarat usia dan akun lembaga diverifikasi pada ketentuan
  layanan terkini sebelum akun dibuat.

**Kebijakan akun tanpa data pribadi siswa**

Selaras [ADR-0004](../../architecture/adr/0004-no-learner-personal-data.md)
dan silabus bagian 7.3 `[asumsi]`:

1. **Tidak ada akun cloud quantum atas nama murid.** Murid memakai simulator
   lokal dan alat visual tanpa akun.
2. Bila ada demonstrasi cloud, **satu akun guru atau sekolah (akun lembaga,
   bukan akun pribadi guru bila mungkin)**; guru yang mengoperasikannya.
3. Sirkuit, nama pekerjaan, tag, dan catatan yang dikirim ke layanan memakai
   label sintetis (mis. `kelas-demo-01`), tanpa nama murid, sekolah, atau
   penanda lain; hasil yang disimpan hanya histogram agregat.
4. Token API dan kunci akun adalah rahasia: tidak di-commit, tidak ditaruh
   di komputer murid, tidak ditayangkan di layar kelas.
5. Layanan yang pemrosesannya di luar negeri (IBM Open Plan: wilayah
   us-east) hanya menerima data sintetis; tidak ada data pribadi yang
   dikirim, sehingga pertanyaan transfer lintas batas tidak muncul.
6. Sebelum satu akun dibuat, guru atau sekolah membaca ketentuan layanan
   terkini dan memverifikasi batas usia serta syarat akun lembaga; temuan
   dicatat tanpa disalin ke repositori sebagai klaim.

#### E-XI1 (kelas XI, semester 1; Fase F)

Tahap: inti I — konsep dan matematika.

| Minggu | Topik | Tujuan | Keluaran | Latihan |
| --- | --- | --- | --- | --- |
| M1 | Mengapa komputasi kuantum; bit klasik dan acak | membedakan bit klasik dan qubit secara garis besar; menyebut apa yang dijanjikan dan bukan; membuka alat visual | catatan "fakta dan mitos" | membandingkan koin acak klasik dengan sirkuit satu qubit di alat visual |
| M2 | Probabilitas dan vektor | menghitung peluang diskret; memakai vektor dan hasil kali dalam | lembar vektor dan peluang | vektor dua dimensi; panjang dan normalisasi |
| M3 | Matriks | mengalikan matriks dengan vektor dan dengan matriks | lembar matriks | perkalian tangan; periksa dengan program kecil |
| M4 | Bilangan kompleks dasar | menghitung modulus dan konjugat; menjelaskan fase | lembar kompleks | modulus kuadrat; rotasi fase |
| M5 | Qubit dan keadaan | menuliskan `\|0>`, `\|1>` dan keadaan umum sebagai vektor; syarat normalisasi | lembar keadaan | memeriksa keadaan sah atau tidak |
| M6 | Superposisi dan aturan Born | menghitung peluang hasil dari amplitudo | tabel peluang | keadaan acak sintetis; hitung peluang |
| M7 | Pengukuran | menjelaskan hasil acak, runtuhnya keadaan, dan jumlah percobaan (shot) | histogram hasil | memprediksi lalu mengamati histogram di alat visual |
| M8 | Gerbang satu qubit | menerapkan X, Z, H sebagai matriks | tabel gerbang | tangan: H pada `\|0>`; X lalu H |
| M9 | Sirkuit satu qubit dan interferensi | menelusuri sirkuit satu qubit; menjelaskan interferensi (H lalu H) | sirkuit beranotasi | merancang sirkuit dengan hasil yang ditentukan |
| M10 | Simulator sendiri I | menyimpan vektor keadaan; menerapkan matriks gerbang | program simulator satu qubit | C++ (jalur A) atau TypeScript/Bun (jalur B) |
| M11 | Simulator sendiri II | menyimulasikan pengukuran dengan pembangkit acak; membandingkan dengan teori | program ukur dan histogram | seribu shot; bandingkan dengan peluang tangan |
| M12 | Dua qubit dan hasil kali tensor | menuliskan keadaan dua qubit sebagai vektor 4 dimensi | tabel dasar `\|00>..\|11>` | menyusun keadaan produk |
| M13 | Proyek mini | menyusun dan menjelaskan satu sirkuit satu qubit | laporan dan sirkuit | pembangkit bit simulasi dan uji frekuensi (catatan: simulasi, bukan keacakan sejati) |
| M14 | Asesmen dan refleksi | menunjukkan matematika dan sirkuit satu qubit | uji tulis dan praktik; jurnal | kuis |

#### E-XI2 (kelas XI, semester 2; Fase F)

Tahap: inti II — entanglement dan algoritma pertama.

| Minggu | Topik | Tujuan | Keluaran | Latihan |
| --- | --- | --- | --- | --- |
| M1 | Gerbang dua qubit: CNOT | menerapkan CNOT sebagai matriks 4x4 | tabel CNOT | tangan: CNOT pada keadaan dasar |
| M2 | Entanglement dan keadaan Bell | membangun keadaan Bell dari H dan CNOT; menjelaskan tidak dapat difaktorkan | sirkuit Bell | memeriksa apakah keadaan dapat difaktorkan |
| M3 | Mengukur qubit terjerat | menjelaskan korelasi hasil; menolak mitos komunikasi lebih cepat dari cahaya | catatan korelasi | simulasi Bell seribu shot; ukur korelasi |
| M4 | Simulator sendiri III: n qubit | memperluas simulator ke n qubit; menghitung memori 2^n | simulator n qubit | tabel memori; titik jenuh di mesin lab |
| M5 | Gerbang fase dan rotasi (pengayaan) | memakai Y, S, T dan rotasi; menjelaskan fase global dan relatif | tabel gerbang lanjutan | gerbang pengganti dengan urutan gerbang lain |
| M6 | Reversibilitas | menjelaskan mengapa gerbang kuantum reversibel; gerbang klasik reversibel (Toffoli) | tabel kebenaran Toffoli | membuat AND dari Toffoli |
| M7 | Tak dapat menggandakan dan teleportasi (konsep) | menjelaskan tidak dapat menggandakan keadaan; menelusuri sirkuit teleportasi | diagram teleportasi | menelusuri teleportasi pada simulator |
| M8 | Pengayaan: permainan CHSH | membandingkan strategi klasik dan kuantum secara simulasi | tabel kemenangan | menghitung kemenangan strategi klasik terbaik |
| M9 | Pengayaan: distribusi kunci (konsep) | menelusuri ide protokol BB84 pada simulasi; menyebut batasnya | catatan protokol | simulasi dengan data sintetis; bukan keamanan nyata |
| M10 | Oracle dan fungsi Boolean | memodelkan fungsi sebagai oracle; menghitung query | tabel oracle | konstan lawan seimbang |
| M11 | Algoritma Deutsch | menjelaskan dan menyimulasikan Deutsch satu qubit | sirkuit dan hasil | satu query lawan dua query klasik |
| M12 | Algoritma Deutsch-Jozsa | menjelaskan dan menyimulasikan Deutsch-Jozsa pada tiga qubit | sirkuit dan hasil | membuat oracle konstan dan seimbang |
| M13 | Proyek mini | menyajikan satu fenomena (Bell, teleportasi, atau Deutsch-Jozsa) | simulasi dan poster | pilihan kelompok |
| M14 | Asesmen dan refleksi | menunjukkan entanglement dan algoritma pertama | uji tulis dan praktik; jurnal | kuis |

#### E-XII1 (kelas XII, semester 1; Fase F)

Tahap: lanjutan I — algoritma dan alat nyata.

| Minggu | Topik | Tujuan | Keluaran | Latihan |
| --- | --- | --- | --- | --- |
| M1 | Bernstein-Vazirani | menjelaskan dan menyimulasikan algoritma | sirkuit dan hasil | menemukan string rahasia dengan satu query |
| M2 | Pembalikan fase | menjelaskan oracle fase dan tanda minus pada amplitudo | diagram amplitudo | menelusuri `\|x>` ke `-\|x>` |
| M3 | Grover I | menjelaskan gagasan pencarian tak terurut dan oracle | sketsa algoritma | dua qubit: satu item ditandai |
| M4 | Grover II | menjelaskan operator difusi dan amplifikasi amplitudo | diagram amplitudo per iterasi | menelusuri tiga dan empat item dengan tangan |
| M5 | Grover III: jumlah iterasi | menghubungkan jumlah iterasi dengan √N; membandingkan dengan pencarian linear | tabel perbandingan | simulator sendiri: N sampai batas mesin; hitung query |
| M6 | Gagasan Fourier kuantum dan Shor (konsep) | menyebut peran transformasi Fourier dan ide pemfaktoran; tidak mengimplementasikan | catatan konsep | membaca bagian tertentu sumber yang disumberkan |
| M7 | Batas komputasi kuantum | membedakan klaim "lebih cepat" yang benar dan keliru | tabel fakta dan mitos II | menilai tiga klaim berita secara kritis |
| M8 | Derau dan dekoherensi | menjelaskan sumber derau; menambahkan model derau sederhana di simulator | simulator dengan derau | membandingkan histogram ideal dan berderau |
| M9 | Pustaka Qiskit dan Python I (demonstrasi) | membaca sirkuit yang sama dalam Qiskit; menjalankan pada simulator lokal | sirkuit Qiskit | membandingkan hasil dengan simulator sendiri |
| M10 | Pustaka Qiskit dan Python II | membaca dan memodifikasi kode; menjalankan Bell dan Grover kecil secara lokal | catatan perbandingan | modifikasi jumlah shot dan gerbang |
| M11 | Peran cloud quantum | menjelaskan alur: sirkuit, kompilasi ke gerbang perangkat, antrian, eksekusi, hasil; menyebut kuota, biaya, dan batas usia akun | diagram alur cloud quantum | menelaah ketentuan layanan secara bersama; menghitung biaya contoh dari tarif bersumber (bagian 6.4) |
| M12 | Demonstrasi cloud quantum oleh guru | mengamati satu pekerjaan Bell kecil pada perangkat nyata lewat akun guru atau sekolah; membandingkan dengan simulator | histogram perangkat lawan simulator | menjelaskan selisih hasil; bila akses tidak tersedia, pakai hasil terarsip sintetis atau perekaman layar tanpa data pribadi |
| M13 | Proyek mini | membandingkan simulator dan hasil perangkat | laporan | pilihan kelompok |
| M14 | Asesmen dan refleksi | menunjukkan Grover, derau, dan alur cloud | uji tulis dan praktik; jurnal | kuis |

#### E-XII2 (kelas XII, semester 2; Fase F)

Tahap: lanjutan II — proyek akhir.

| Minggu | Topik | Tujuan | Keluaran | Latihan |
| --- | --- | --- | --- | --- |
| M1 | Membaca hasil nyata | membaca histogram, galat statistik, dan jumlah shot | catatan interpretasi | selang kepercayaan sederhana dari shot |
| M2 | Mitigasi derau (konsep) | menjelaskan gagasan mitigasi dan batasnya | catatan konsep | mengulang simulasi dengan model derau berbeda |
| M3 | Pengayaan: algoritma hibrida (konsep) | menjelaskan pola kuantum-klasik bergantian (mis. VQE, QAOA) secara garis besar | diagram hibrida | menelusuri satu iterasi pada simulator |
| M4 | Dampak ke keamanan informasi (konsep) | menjelaskan, dengan sumber, hubungan komputasi kuantum dengan kriptografi | catatan bersumber | menyusun kutipan sumber; tanpa klaim tak bersumber |
| M5 | Etika, ekspektasi, dan karier | membedakan harapan realistis dan hype | refleksi | analisis satu artikel populer |
| M6 | Proyek akhir: rancangan | merancang proyek (simulator, algoritma, atau studi banding) | dokumen rancangan | pilih topik |
| M7 | Proyek akhir: implementasi I | membangun inti proyek | kode dan catatan | sprint |
| M8 | Proyek akhir: implementasi II | menguji dan membandingkan dengan perhitungan tangan | uji dan catatan | sprint |
| M9 | Proyek akhir: pengujian dan dokumentasi | mendokumentasikan dengan jelas | dokumentasi | tinjau sejawat |
| M10 | Proyek akhir: pengujian lanjutan | memperbaiki dan mengoptimalkan | versi perbaikan | sprint |
| M11 | Proyek akhir: presentasi | mempresentasikan | presentasi | demo |
| M12 | Proyek akhir: portofolio | mengarsipkan tanpa data pribadi | portofolio | rapikan |
| M13 | Cadangan terstruktur: tinjauan | menutup celah materi | ringkasan | pilihan kelompok |
| M14 | Asesmen dan refleksi | menunjukkan seluruh jalur | uji tulis dan praktik; jurnal | kuis |

### 3.6 Ringkasan jalur

Sumber data `tracks.json`. Kolom "Kelas mulai" menyatakan kelas pertama jalur:
jalur yang mulai di kelas X berjalan enam semester dan mengikuti blok fondasi
(bagian 3.0), dengan minggu jalur kelas X semester 1 mulai dari M8; jalur
yang mulai di kelas XI berjalan empat semester (jalur E; 56 minggu, tanpa
blok fondasi). Kolom "Hubungan dengan CP": jalur "dalam CP" dipetakan ke butir
CP pada bagian 4.1 dan 4.2; jalur "pengayaan di luar CP" tidak pernah dihitung
sebagai pemenuhan butir CP (irisan dicatat di bagian 4.5).

| Jalur | Nama | Bahasa dan alat | Kelas mulai | Hubungan dengan CP |
| --- | --- | --- | --- | --- |
| A | Algoritmik dengan C++ | C++ | X | dalam CP |
| B | Web dengan JavaScript, TypeScript, dan Bun | JavaScript, TypeScript, Bun | X | dalam CP |
| C | IoT dan Robotika | C++ (gaya Arduino), ESP32 | X | dalam CP |
| D | Kecerdasan Buatan dan Analisis Data | Orange Data Mining, Python | X | pengayaan di luar CP |
| E | Komputasi Kuantum dan Cloud Quantum | Quirk, simulator buatan sendiri | XI | pengayaan di luar CP |

## 4. Pemetaan elemen CP, topik, minggu, jalur

Pemetaan 4.1 dan 4.2 memuat jalur yang dihitung memenuhi CP (jalur A, B, dan
C). Tanda "(parsial)" pada kolom Jalur berlaku untuk jalur yang tepat
mendahuluinya (misalnya `B (parsial), C`: B parsial, C penuh). Jalur D dan E
adalah pengayaan di luar rumusan CP; kemiripannya dicatat terpisah di bagian
4.5 dan tidak dihitung.

### 4.1 Fase E

| Butir CP | Topik | Minggu | Jalur |
| --- | --- | --- | --- |
| E-BK-a | struktur data dan algoritma standar | A-X2-M6..M10; B-X2-M7..M9; C-X2-M4, M9, M10 | A, B, C |
| E-BK-b | data berkualitas | A-X1-M13; B-X2-M10; C-X2-M3, M12 | A, B, C |
| E-BK-c | menerapkan algoritma dan struktur data standar | A-X2-M6..M10, M13; B-X2-M7..M9, M13; C-X2-M4, M9..M10, M13 | A, B, C |
| E-BK-d | pseudocode dan program dalam bahasa komputer | A-X1-M8..M12; A-X2-M1..M3; B-X1-M8..M12; B-X2-M1..M3; C-X1-M8..M13 | A, B, C |
| E-BK-e | model I-P-O dan sistem operasi | FND-X1-M1..M2; C-X1-M8 | A, B, C |
| E-LD-a | mesin pencari (hanya untuk dokumentasi teknis) | B-X2-M11 | B (parsial) |
| E-LD-d | perangkat pengolah dokumen, lembar kerja, presentasi | FND-X1-M7 | A, B |
| E-LD-e | keamanan dasar konektivitas jaringan | FND-X1-M4..M6; C-XI2-M1..M2 | A, B, C |
| E-LD-f | produksi konten dan kolaborasi | B-X2-M4..M6, M12..M13 | B |
| E-LD-g | HAKI dan lisensi | FND-X1-M2, M6 | A, B |
| E-LD-k | kata sandi dan autentikasi dua langkah | FND-X1-M6 | A, B |
| E-LD-l | konfigurasi privasi dan keamanan akun | FND-X1-M6 | A, B |

### 4.2 Fase F

| Butir CP | Topik | Minggu | Jalur |
| --- | --- | --- | --- |
| F-BK-a | proses rekayasa | A-XI1-M1..M2; A-XII2-M11..M13; B-XI1-M1, M12; B-XII2-M1..M13; C-XI1-M1..M2; C-XII1-M1..M2, M12; C-XII2-M5..M12 | A, B, C |
| F-BK-b | beberapa strategi, justifikasi efisiensi | A-XI1-M3..M7, M11..M12; A-XI2-M1..M4; A-XII2-M8, M10; B-XI1-M9..M10; C-XI1-M5..M8; C-XII1-M8 | A, B, C |
| F-BK-c | struktur data lebih kompleks dan abstrak | A-XI1-M9..M10; A-XI2-M5..M8; A-XII1-M1..M5, M9..M10; B-XI1-M8; C-XI1-M3, M9 | A, B, C (parsial) |
| F-BK-d | jaringan (HTTP; jalur C: pengiriman data antarperangkat dan jaringan IoT) | B-XI2-M11; C-XI1-M10..M12; C-XI2-M1, M3..M8 | B (parsial), C |
| F-LD-d | merancang kebutuhan sistem | B-XII2-M1..M2; C-XII1-M1..M2 | B, C |
| F-LD-e | keamanan jaringan lanjut | B-XI2-M10; C-XI2-M2 | B (parsial), C (parsial) |
| F-LD-f | mengkreasi konten digital | B-XII1-M6..M7; B-XII2-M3..M8 | B |
| F-LD-g | hukum (UU ITE, KUHP UU 1/2023, UU PDP) | B-XI2-M10; B-XII2-M10; C-XII1-M11 | B, C (parsial) |
| F-LD-i | kata sandi dan autentikasi | B-XII1-M10; C-XI2-M2 | B (parsial), C (parsial) |
| F-AD-a | data terbuka, keputusan, prediksi | A-XI2-M9..M13; B-XI2-M4..M8; C-XI2-M9..M12 | A, B, C |
| F-AP-a | konsep strategi algoritmik | A-XI1-M3..M12; A-XI2-M1..M4; B-XI1-M9; C-XI1-M5..M8; C-XII1-M6..M8 | A, B, C (parsial) |
| F-AP-b | program terstruktur berdasarkan strategi | A-XI1-M3..M13; A-XI2-M1..M4; B-XI1-M8..M9, M13; C-XI1-M3..M7; C-XII1-M5..M8 | A, B, C |
| F-AP-c | pemeliharaan dan kualitas kode | A-XI1-M2; A-XII2-M1..M2; B-XI1-M4, M7, M11..M12; B-XII1-M9, M12; C-XI1-M2; C-XII2-M1..M2 | A, B, C |
| F-AP-d | struktur data kompleks dan library | A-XI1-M9..M10; A-XII1-M12; B-XI1-M8; B-XI2-M1..M3; B-XII1-M1..M6; C-XI1-M4; C-XII2-M6..M9 | A, B, C |

### 4.3 Butir CP di luar silabus coding ini

Butir berikut tidak dicakup oleh jalur A, B, dan C maupun blok fondasi (tidak
dihilangkan dari CP): E-LD-b, c, h, i, j; F-LD-a, b, c, h, j; F-BK-d
(kecuali pengiriman data HTTP pada B-XI2-M11 dan pengiriman data antarperangkat jalur C pada bagian 4.2). Pada v1.0 daftar ini juga
memuat E-LD-d dan E-LD-e; keduanya kini tercakup oleh blok fondasi
(bagian 4.1).

**Keputusan pemilik (2026-11-18, issue #52):** butir-butir itu dicakup lewat
**modul pendamping** literasi digital (issue #69). Interaksi dengan
perangkat fisik seperti IoT dan robot (disebut di panduan, bagian C, bukan
di rumusan CP) menjadi **jalur C terpisah** (issue #68), yang kini disetujui
dan tercantum di bagian 3.3 (v1.2). **Keputusan pemilik (2026-11-18, issue
#86/#92):** E-LD-d keluar dari daftar modul pendamping karena menjadi
FND-X1-M7.

**Celah jalur A (keputusan pemilik 2026-11-19, issue #105):** butir F-LD-d dan
F-LD-e tidak dicakup jalur A (hanya jalur B dan C, bagian 4.2). Celah itu
**dicakup modul pendamping, issue #105** (modul lintas jalur yang dikerjakan
terpisah; tidak dibuat di silabus ini).

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

### 4.5 Irisan jalur pengayaan di luar CP (tidak dihitung sebagai pemenuhan CP)

Jalur D dan E berada di luar rumusan CP (bagian 3.4 dan 3.5), sehingga
**tidak muncul di tabel 4.1 dan 4.2 dan tidak dihitung sebagai pemenuhan
butir CP mana pun**. Tabel ini hanya mencatat kemiripan terdekat agar
pembaca dapat menilai; seluruh tingkat irisan adalah tafsir penyusun. Rumusan
butir ada di bagian 1.3 (kode di bagian 1.4). Penyusun tidak memeriksa apakah
peraturan lain menyebut AI atau komputasi kuantum di mata pelajaran
Informatika `[belum terverifikasi]`.

| Jalur | Butir CP | Topik | Minggu | Tingkat irisan |
| --- | --- | --- | --- | --- |
| D | F-AD-a | data terbuka dan legal, prediksi | D-XI1-M5..M8, M13; D-XII1-M5 | **Irisan terdekat.** Sedang: rumusan menyebut "prediksi" dan "tanpa atau dengan komputer", tetapi tidak menyebut AI atau pembelajaran mesin. |
| D | E-BK-b | kualitas dan pelabelan data | D-X1-M9, M13; D-X2-M1 | Rendah-sedang: kualitas dan pelabelan data. |
| D | F-LD-b | verifikasi konten buatan AI | D-X2-M11; D-XI2-M10 | Rendah-sedang: verifikasi konten buatan AI. |
| D | E-LD-g | lisensi data dan keluaran generatif | D-X2-M12 | Rendah: lisensi data dan keluaran generatif. |
| D | F-LD-g | pelindungan data pribadi, UU ITE, dan ketentuan pidana siber dalam KUHP | D-X2-M3; D-XII1-M4 | Rendah: pelindungan data pribadi, UU ITE, dan ketentuan pidana siber dalam KUHP sebatas pokok. |
| D | E-LD-l | privasi pada layanan AI daring | D-X2-M3 | Rendah: privasi pada layanan AI daring. |
| D | F-AP-d | memakai library untuk model | D-XI1-M3..M4, M9; D-XI2-M2..M8 | Rendah, hanya karena alat memakai coding (Python): memakai library, tetapi struktur data kompleks bukan fokus. |
| E | F-BK-b | membandingkan algoritma kuantum dengan pendekatan klasik | E-XII1-M5; E-XI2-M12 | Latihan serupa: membandingkan Grover dengan pencarian linear dan Deutsch-Jozsa dengan pendekatan klasik; tidak dihitung. |
| E | F-AP-d | simulator vektor keadaan dan Qiskit | E-XI1-M10..M11; E-XI2-M4; E-XII1-M9..M10 | Menyentuh butir ini lewat simulator buatan sendiri dan penggunaan Qiskit (minggu sesuai rencana bagian 3.5); tidak dihitung. |

Butir yang tidak disentuh jalur D: E-BK-a, c, d, e; F-BK-b, c, d; F-AP-a, b, c
(kecuali kualitas kode di `D-XII1-M10`, rendah). Jalur D tidak melatih struktur
data atau strategi algoritmik; ia tidak menggantikan jalur A dan B.

## 5. Jembatan ke OSN

ID rumpun diambil dari `data/osn/topic-families.json` (silabus OSN v2.0).
Pemetaan ini penilaian penyusun, bukan bagian dari data OSN. Jalur A
menyiapkan seluruh rumpun (bagian 5.1); jalur C hanya sebagian (bagian 5.2);
jalur D dan E tidak menjanjikan persiapan OSN (bagian 5.3). Topik di luar
rumusan CP ditandai **P** (pengayaan, melampaui CP).

### 5.1 Jalur A

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
(misalnya tingkat kesulitan soal) tidak dijamin oleh silabus ini; jembatan di
sini hanya menyiapkan topik, bukan menggantikan pembinaan OSN.

### 5.2 Jalur C

Jalur C **bukan pembinaan OSN**; murid yang menuju OSN sebaiknya mengambil
jalur A. Topik jalur C yang menyiapkan sebagian rumpun OSN (penilaian
penyusun, bukan data OSN):

| Rumpun materi OSN (`id`) | Topik jalur C yang menyiapkan | Minggu | Catatan |
| --- | --- | --- | --- |
| `dasar-pemrograman` | variabel, percabangan, perulangan, fungsi pada mikrokontroler | C-X1-M8..M12 | Hanya sebagian (tanpa `cin`/`cout`, tanpa string). |
| `logika-bitwise` | logika Boolean | C-X1-M9 | Hanya logika Boolean; operasi bit tidak dibahas. |
| `struktur-data` | array, stack, queue, penyangga melingkar | C-X2-M4, M9; C-XI1-M9 | Array, stack, queue, penyangga. |
| `search-sort` | median dari data sensor | C-X2-M10 | Median; bukan pengurutan penuh. |

Rumpun lain tidak tersentuh. Selaras sintaks: `C-X1-M8..M12` memakai C++
dengan sintaks yang sama dengan `A-X1-M9..M12`, sehingga murid jalur C dapat
berpindah atau mengambil jalur A tambahan dengan penyesuaian kecil
(`cin`/`cout` diganti `Serial`). `C-XI2` (JSON, HTTP) beririsan dengan
`B-XI2` sehingga murid dapat memakai keluaran data jalur C pada proyek web
`[asumsi]`.

### 5.3 Jalur D dan E

Jalur D dan E tidak memiliki jembatan ke OSN dan tidak ada klaim bahwa
keduanya menyiapkan OSN: rumpun materi OSN bersifat algoritmik (bagian 5.1),
sedangkan kedua jalur adalah pengayaan di luar CP (bagian 4.5). Siswa yang
menuju OSN sebaiknya mengambil jalur A.

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
| C | ESP32 DevKit (satu per kelompok tiga murid; set robot kelas XII bergilir bila anggaran ada), komputer lab dengan kompiler C++ dan alat unggah, komponen elektronik dasar, daya USB atau baterai bertegangan rendah tanpa listrik jaringan; jaringan lab terpisah dan penengah pesan lokal di komputer guru untuk kelas XI semester 2; sekolah tanpa perangkat: set dipinjamkan mitra bergilir, simulator sebagai latihan (dukungan simulator `[belum terverifikasi]`). |
| D | Komputer lab dengan Orange Data Mining (kelas X); Python dengan `pandas` dan `scikit-learn` mulai kelas XI semester 1 (pemasangan paket butuh internet sekali `[belum terverifikasi]`); spesifikasi minimum menunggu survei lab `[belum terverifikasi]`; tanpa akun pribadi wajib untuk murid; pemakaian AI generatif oleh murid bebas dengan etika (bagian 7.4). |
| E | Peramban untuk Quirk; komputer dengan C++ (jalur A) atau Bun (jalur B) untuk simulator buatan sendiri; demonstrasi guru dengan Python, Qiskit, dan simulator lokal serta, bila ada, satu akun sekolah atau lembaga untuk cloud quantum; tanpa akun murid. |
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
- Ketentuan privasi dan keselamatan khusus jalur C, D, dan E ada di bagian
  3.3, 3.4, dan 3.5 (tanpa kamera atau mikrofon yang merekam murid, tanpa wajah
  dan suara murid sebagai data latih, tanpa akun murid pada cloud quantum;
  pemakaian AI generatif oleh murid bebas dengan etika, aturannya di bagian
  7.4).

### 7.4 Kebijakan penggunaan AI

Kebijakan ini disusun **khusus untuk program `sma-coding`** (keputusan
pemilik 2026-11-19, bagian 9.4, issue #139): tiap program memiliki
kebijakan AI sendiri, bukan satu kerangka lintas program. Dasar buktinya
ada di [`docs/riset/ai-rekayasa-perangkat-lunak.md`](../../riset/ai-rekayasa-perangkat-lunak.md)
(riset, bukan keputusan; ketentuan di bawah adalah rancangan penyusun
`[asumsi]` yang disetujui sebagai bagian dari v1.3).

**Prinsip.** Pemakaian AI generatif oleh murid SMA, di **semua jalur**, adalah
**bebas dengan etika**. Keputusan ini menggantikan aturan jalur D v1.2
("layanan AI daring hanya didemonstrasikan guru, tanpa akun murid"). Bebas
tidak berarti tanpa batas: aturan di bawah berlaku, dan pemakaian tunduk pada
usia minimum dan ketentuan layanan yang bersangkutan serta izin sekolah dan
orang tua (syarat usia dan ketentuan tiap layanan `[belum terverifikasi]`;
guru memeriksanya). Murid tidak diwajibkan memiliki akun pribadi di layanan
mana pun. Data pribadi murid tetap tidak masuk repositori ini
([ADR-0004](../../architecture/adr/0004-no-learner-personal-data.md)).

| Aspek | Aturan |
| --- | --- |
| Etika | Murid bertanggung jawab penuh atas karya yang diserahkan; tidak menyajikan keluaran AI sebagai karya sendiri tanpa keterangan; tidak memakai AI untuk menipu, menjiplak, atau melanggar lisensi dan hak cipta. Status hak cipta dan lisensi keluaran AI masih berkembang `[belum terverifikasi]`; murid mencatatnya sebagai ketidakpastian, bukan kepastian. |
| Transparansi dan log | Murid mencatat pemakaian AI pada tugas: alat (dan versi bila diketahui), tujuan, garis besar perintah, bagian keluaran yang dipakai, dan cara memverifikasinya. Log bersifat sintetis dan bebas data pribadi, disimpan murid atau guru, tidak di repositori ini. Di jalur D, catatan versi model dan perintah ada di `D-XII1-M10`. |
| Kapan tanpa AI | Asesmen sumatif (minggu 14) dan kuis kode; latihan terpadu dan kontes mini jalur A (`A-XII2-M5..M8`), karena tujuannya melatih dan menguji kemampuan menyelesaikan sendiri (*re-solve*); serta tugas lain yang ditandai guru "tanpa AI" di awal tugas. Di luar itu AI boleh dipakai dengan etika dan log. |
| Privasi | Tidak menaruh data pribadi, kata sandi, kunci, rahasia, atau tugas bernilai pada permintaan ke layanan AI (dilatih di `FND-X1-M6`, `C-XI2-M2`, `B-XII1-M10`). Wajah dan suara murid tidak dipakai sebagai data, termasuk pada alat AI. |
| Verifikasi kode | Kode buatan AI dibaca, dijalankan, dan diuji sebelum dipakai; murid harus dapat menjelaskan kode yang ia serahkan. Nama paket yang disarankan AI diperiksa keberadaan dan reputasinya sebelum dipasang (`B-XI1-M5`); kode buatan AI ditinjau seperti kode sejawat (`B-XI1-M12`); rahasia tidak ditempel ke asisten AI (`B-XII1-M10`, `C-XI2-M2`). |
| Penerapan | Guru menetapkan per tugas apakah AI boleh dan mengumumkannya di awal tugas; kebijakan sekolah dan orang tua tentang AI diikuti; kebijakan Kemendikdasmen tentang AI di sekolah `[belum terverifikasi]`. |

**Glosarium (hanya penjelasan istilah, bukan label capaian).** *Vibe coding*:
istilah populer (2025) untuk menyusun program dengan menyuruh AI dan
menerima keluarannya tanpa menelaah kodenya; maknanya bergeser dan kini juga
dipakai lebih luas untuk pemrograman berbantuan AI. *AI-native engineer*:
istilah populer tanpa definisi baku. Keduanya hanya dijelaskan bila disebut di
kelas; silabus ini tidak memakainya sebagai label atau sasaran capaian, dan
yang dituju adalah murid yang memverifikasi serta dapat menjelaskan kode yang
ia serahkan.

## 8. Catatan keterbatasan

- Rumusan CP berasal dari panduan resmi, bukan SK; nomor SK tetap
  `[belum terverifikasi]` (bagian 1; keputusan pemilik: panduan dipakai).
- Banyak topik jalur A (graf, DP, struktur data lanjut) adalah pengayaan
  opsional untuk jembatan OSN, bukan tuntutan CP (bagian 5).
- Rencana mingguan jalur C, D, dan E adalah rancangan penyusun `[asumsi]`
  yang disetujui, belum diuji di kelas, dan belum ditinjau guru atau mitra;
  harga, spesifikasi, dukungan simulator, ketentuan keselamatan, dan ketentuan
  layanan cloud quantum banyak yang `[belum terverifikasi]` (lihat draf
  masing-masing sebagai riwayat) dan harus diselesaikan sebelum anggaran atau
  pelaksanaan. Jalur D dan E bukan bagian CP (bagian 4.5).
- Butir AI v1.3 (bagian 3.1 sampai 3.4 dan 7.4) adalah rancangan penyusun
  `[asumsi]` yang disetujui, belum diuji di kelas; syarat usia dan ketentuan
  layanan AI, status hak cipta keluaran AI, dan kebijakan Kemendikdasmen
  tentang AI di sekolah `[belum terverifikasi]`; angka biaya komputasi dan
  energi di `D-XI2-M12` hanya perkiraan kasar dengan ketidakpastian
  dinyatakan.
- Rencana mingguan belum diuji di kelas; susunan kelas X v1.1 (tujuh minggu
  fondasi, penggabungan dan penggeseran minggu) adalah rancangan penyusun
  `[asumsi]`; disetujui pemilik sebagai bagian dari v1.1 (bagian 9.2).

## 9. Keputusan pemilik atas pertanyaan terbuka (2026-11-18 dan 2026-11-19)

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
pada silabus v1.1 di issue #92. Persetujuan atas v1.1 secara keseluruhan
dicatat terpisah di bagian 9.2.

| No. | Pertanyaan | Keputusan |
| --- | --- | --- |
| Q1 | Panjang blok fondasi | Opsi (b), enam minggu, ditambah satu minggu perangkat pengolah dokumen, lembar kerja, dan presentasi (E-LD-d): **tujuh minggu**, kode FND-X1-M1..FND-X1-M7 (bagian 3.0). |
| Q2 | Bentuk pelaksanaan | **Kelas bersama lintas jalur**, sebelum murid memilih jalur. |
| Q3 | Perangkat pengolah dokumen, lembar kerja, presentasi (E-LD-d) | Menjadi **satu minggu fondasi** (FND-X1-M7); keluar dari daftar modul pendamping (#69). |
| Q4 | `B-X2-M9` dan `B-X2-M10` | **Dihapus** karena sudah dicakup fondasi; slotnya dipakai minggu yang digeser dari semester 1 (bagian 3.0, padanan). |
| Q5 | Operasi bit dasar (v1.0 `A-X2-M12`, pengayaan) | **Pindah ke pengayaan kelas XI** (`A-XI1-M3` pada v1.1). |
| Q6 | Asesmen fondasi | **Formatif**, dilebur ke asesmen minggu 14 kelas X semester 1; tanpa minggu asesmen sendiri (bagian 7.1). |
| Q7 | Representasi data | Tetap **prasyarat**; **tidak dihitung** sebagai pemenuhan butir CP mana pun (bagian 4.4). |
| Q8 | Kesiapan lab untuk praktik jaringan dan perangkat keras | **Simulasi peran** sebagai jalur utama praktik; komponen bekas dan jaringan lokal terisolasi sebagai opsi bila lab menyediakan (bagian 3.0). |

Rancangan penyusun yang menerapkan keputusan ini (penggabungan dan
penggeseran minggu, nomor minggu baru) ditandai `[asumsi]` dan disetujui
pemilik bersama v1.1 (bagian 9.2).

### 9.2 Persetujuan silabus v1.1 (2026-11-19)

Pemilik program **menyetujui silabus v1.1 pada 2026-11-19** untuk jalur A
dan B lewat dialog pilihan; dicatat di issue #92. Persetujuan mencakup
blok fondasi kelas X (bagian 3.0), penyusunan ulang kelas X semester 1 dan 2
jalur A dan B, pemetaan CP (bagian 4), dan jembatan OSN (bagian 5) sebagaimana
tertulis di dokumen ini. Jalur C (#68) dan modul pendamping (#69) tidak
termasuk persetujuan ini.

### 9.3 Keputusan atas draf jalur C, D, dan E; silabus v1.2 (2026-11-19)

Dijawab pemilik lewat dialog pilihan pada 2026-11-19 dan dicatat di issue #68
(jalur C), #84 (jalur D), dan #88 (jalur E). Pemilik **menyetujui draf jalur C,
D, dan E beserta semua rekomendasi penyusun**: setiap pertanyaan terbuka di draf
dijawab dengan opsi rekomendasinya (untuk jalur E: kelas XI-XII saja dan
awalan kode `E-`). Draf tetap tersimpan sebagai riwayat dengan pertanyaan
ditandai terjawab. Penyusun tidak mencatat keputusan lain di luar opsi yang
tertulis di draf.

**Jalur C (issue #68)**

| No. | Pertanyaan | Keputusan |
| --- | --- | --- |
| 1 | Platform utama | ESP32 DevKit; cadangan Raspberry Pi Pico (W bila perlu jaringan). |
| 2 | Bahasa | C++ gaya Arduino, selaras jalur A. |
| 3 | Pengadaan perangkat | Campuran (mitra dan sekolah); batas tanggung jawab dicatat tertulis. |
| 4 | Sekolah tanpa perangkat | Set dipinjamkan mitra bergilir, dengan simulator sebagai latihan; dukungan simulator diverifikasi lebih dulu. |
| 5 | Robot di kelas XII | Satu set bergilir bila anggaran ada; bila tidak, diganti proyek IoT statis. |
| 6 | Infrastruktur jaringan untuk `C-XI2` | Jaringan lab terpisah dan penengah pesan lokal di komputer guru. |
| 7 | Murid jalur C yang tidak pernah ambil jalur A | Jalur C mengajarkan dasar pemrograman sendiri (`C-X1-M8..M12`); risiko tujuh minggu padat di kelas X semester 1 diakui. |
| 8 | Peran mitra pada keselamatan | Mitra menyusun dan mengaudit aturan keselamatan; ditinjau pemilik. |
| 9 | Isi pasal hukum (UU ITE, KUHP, UU PDP) di `C-XII1-M11` | Diverifikasi dari sumber resmi sebelum modul ditulis; pasal ITE yang dicabut KUHP dicatat di bagian 1.2 (v1.4.1). |

**Jalur D (issue #84)**

| No. | Pertanyaan | Keputusan |
| --- | --- | --- |
| 1 | Alat dan coding | Opsi bertahap: tanpa kode di kelas X, Python di kelas XI-XII; cadangan JS/TS selaras jalur B. |
| 2 | Bahasa pemrograman | Python. |
| 3 | Layanan AI daring (generatif) | Hanya demonstrasi guru. **Digantikan** pada v1.3 oleh keputusan pemilik 2026-11-19: murid SMA bebas dengan etika (bagian 9.4, 7.4). |
| 4 | Teachable Machine | Pengayaan dengan data benda (tanpa wajah dan suara). |
| 5 | Seri Buku AI SMA | Ditautkan setelah guru membaca isinya dan lisensi dijelaskan penerbit (minta kejelasan ke InTech Press). |
| 6 | Prasyarat | Tanpa prasyarat; Python diajarkan di `D-XI1-M2..M4` (tiga minggu mungkin kurang, perlu diuji di kelas). |
| 7 | Posisi AI di luar CP | Disebut pengayaan di luar CP dan tidak dihitung sebagai pemenuhan CP (bagian 4.5). |
| 8 | Kesiapan lab | Diputuskan setelah survei lab; spesifikasi minimum `[belum terverifikasi]`. |

**Jalur E (issue #88)**

| No. | Pertanyaan | Keputusan |
| --- | --- | --- |
| 1 | Rentang kelas | XI-XII (empat semester; inti dua semester). |
| 2 | Awalan kode minggu | `E-`, dengan aturan penulisan (bagian 3.5); tanpa ubah skema. |
| 3 | Stack inti murid | Quirk ditambah simulator buatan sendiri; Qiskit hanya demonstrasi guru. |
| 4 | Akses cloud quantum | Demonstrasi guru; akun murid tidak disarankan dan tidak dipakai. |
| 5 | Matematika yang belum ada di seri matematika komputasi | Dibangun tiga minggu di dalam jalur E (`E-XI1-M2..M4`), dengan opsi dipromosikan menjadi modul `matkom-*` setelah dicoba. |
| 6 | Python di jalur E | Hanya demonstrasi guru. |
| 7 | Prasyarat pemrograman | Dasar jalur A atau B diwajibkan untuk minggu simulator; bagian konsep terbuka bagi semua. |
| 8 | Akun lembaga untuk demonstrasi | Akun sekolah atau lembaga; syarat usia dan akun lembaga diverifikasi pada ketentuan layanan terkini. |
| 9 | Beban jam | 3 JP per minggu seperti jalur lain. |

**Keputusan terkait: celah F-LD-d dan F-LD-e jalur A (issue #105).** Pemilik
memutuskan celah itu ditutup dengan **modul pendamping lintas jalur**
(dikerjakan terpisah dari silabus ini); silabus hanya mencatatnya di bagian
4.3.

**Silabus v1.2.** Dengan keputusan di atas, status silabus menjadi DISETUJUI
pemilik, 2026-11-19, untuk jalur A, B, C, D, dan E. Persetujuan ini tidak
mencakup modul pendamping (#69).

### 9.4 Keputusan atas riset AI dalam rekayasa perangkat lunak; silabus v1.3 (2026-11-19)

Dijawab pemilik lewat dialog pilihan pada 2026-11-19 dan dicatat di issue #139.
Dasarnya [`docs/riset/ai-rekayasa-perangkat-lunak.md`](../../riset/ai-rekayasa-perangkat-lunak.md)
(bagian 7, usulan U-02 sampai U-05 untuk program ini). Penyusun tidak mencatat
keputusan lain di luar yang tertulis di issue.

| No. | Pertanyaan | Keputusan |
| --- | --- | --- |
| 1 | Usulan U-02 (kebijakan dan privasi di fondasi dan jalur C) | Diterapkan (opsi rekomendasi): butir pada `FND-X1-M6` dan `C-XI2-M2`; tanpa minggu baru. |
| 2 | Usulan U-03 (jalur A) | Diterapkan: pernyataan tanpa AI pada latihan terpadu `A-XII2`. Dokumen riset menyebut minggu 6-8; silabus menunjukkan latihan terpadu I-IV di `A-XII2-M5..M8` (kontes mini di M6), sehingga pernyataan dipasang pada keempat minggu itu. |
| 3 | Usulan U-04 (jalur B) | Diterapkan: meninjau kode buatan AI (`B-XI1-M12`), pemeriksaan paket (`B-XI1-M5`), rahasia (`B-XII1-M10`); tanpa minggu baru. |
| 4 | Usulan U-05 (jalur D) | Diterapkan: non-determinisme dan pembeda AI sebagai subjek dan alat (`D-X2-M11`), biaya komputasi dan energi sebagai butir singkat dengan ketidakpastian dinyatakan (`D-XI2-M12`), pencatatan versi model dan perintah (`D-XII1-M10`). |
| 5 | Pemakaian AI generatif oleh murid SMA (semua jalur) | **Bebas dengan etika.** Menggantikan keputusan jalur D v1.2 (bagian 9.3 no. 3). Data pribadi murid tetap tidak masuk repositori (ADR-0004); pemakaian tunduk pada usia minimum dan ketentuan layanan serta izin sekolah dan orang tua. |
| 6 | Bentuk kebijakan AI | Disusun **per program**; untuk program ini bagian 7.4. |
| 7 | Istilah "vibe coding" dan "AI-native engineer" | Hanya dijelaskan sebagai glosarium bila disebut (bagian 7.4), bukan label capaian. |

**Silabus v1.3.** Status tetap DISETUJUI pemilik, 2026-11-19, untuk jalur A, B,
C, D, dan E, dengan perubahan di atas. Kode minggu, jumlah minggu, pemetaan CP,
dan jembatan OSN tidak berubah.

### 9.5 Keputusan atas penyelarasan jembatan antarprogram; silabus v1.4 (2026-11-19)

Dijawab pemilik lewat dialog pilihan pada 2026-11-19 dan dicatat di issue #177
(rancangan: [`docs/programs/rancangan-jembatan-antarprogram.md`](../rancangan-jembatan-antarprogram.md),
bagian 6). Penyusun tidak mencatat keputusan lain di luar yang tertulis di issue.

| No. | Pertanyaan | Keputusan |
| --- | --- | --- |
| 1 | K1 (pengulangan di awal program atas) | Opsi 1 (rekomendasi): pengamatan singkat dan tugas pendalaman di dalam kelas yang sama, tanpa tes, tanpa nilai angka, tanpa catatan di repositori. |
| 2 | K3 (blok fondasi bagi lulusan SMP berpengalaman) | Opsi 1 (rekomendasi): subbagian baru di bagian 3.0; fondasi tetap kelas bersama lintas jalur (keputusan 9.1); murid berpengalaman tidak dibebaskan dari minggu fondasi. |
| 3 | K7 (pengodean tabel baru) | Opsi 1 (rekomendasi): tabel dicerminkan di `data/sma-coding/smp-bridge.json` dan kode minggu SMP diperiksa silang terhadap korpus `smp-coding` (ADR-0010). |

**Silabus v1.4.** Status tetap DISETUJUI pemilik, 2026-11-19, untuk jalur A, B,
C, D, dan E, dengan tambahan di atas. Kode minggu, jumlah minggu, pemetaan CP,
dan jembatan OSN tidak berubah.

## 10. Daftar rujukan

| Rujukan | Status |
| --- | --- |
| Badan Standar, Kurikulum, dan Asesmen Pendidikan, Kemendikdasmen, *Panduan Mata Pelajaran Informatika, Fase D – F*, 2025. `https://repositori.kemendikdasmen.go.id/33634/1/32.%20Panduan%20Mata%20Pelajaran%20Informatika.pdf` | Dibuka dan diekstrak, 2026-11-18. |
| Salinan di portal kurikulum: `https://kurikulum.kemdikbud.go.id/file/panduan/dokumen/32.%20Panduan%20Mata%20Pelajaran%20Informatika.pdf` | Tidak dibuka (tidak terjangkau). |
| Keputusan Kepala BSKAP Nomor 046/H/KR/2025 tentang Capaian Pembelajaran (PAUD, SD, SMP, SMA) | Teks PDF dibuka dari `https://bpmpbabel.kemendikdasmen.go.id/PPID/wp-content/uploads/2025/07/KepKaBSKAP-046_2025-ttg-CP.pdf` (subdomain resmi `kemendikdasmen.go.id`, SHA-256 `45809d2c...3394`, 2026-11-19; `[terverifikasi 2026-11-19]`). Padanan di JDIH Kemendikdasmen `[belum terverifikasi]` (tidak ditemukan). |
| Keputusan Kepala BKPDM Nomor 020 Tahun 2026 | `[belum terverifikasi]`; hanya dari artikel sekunder. |
| `ahliweb/awcms-one` (README, `docs/template.md`, `package.json`, metadata GitHub) `https://github.com/ahliweb/awcms-one` | Dibuka via GitHub API, 2026-11-18. |
| `data/osn/topic-families.json` (silabus OSN v2.0, 2026-09-04) | Dibaca di repositori ini. |
| ADR-0004, ADR-0006, ADR-0007 repositori ini | Dibaca. |
| JDIH BPK: UU 11/2008 `https://peraturan.bpk.go.id/Details/37589/uu-no-11-tahun-2008` dan UU 1/2023 `https://peraturan.bpk.go.id/Details/234935/uu-no-1-tahun-2023` (naskah PDF UU 1/2023 diunduh dari tautan Download halaman itu) | Dibuka dan dibaca, 2026-11-19; dasar v1.4.1 (#238). |
| [`draf-jalur-c-iot.md`](draf-jalur-c-iot.md), [`draf-jalur-d-ai.md`](draf-jalur-d-ai.md), [`draf-jalur-e-kuantum.md`](draf-jalur-e-kuantum.md) (draf jalur C, D, E; issue #68, #84, #88) | Dasar v1.2; riwayat. Sumber web bertanggal akses 2026-11-19 (platform, harga, alat, layanan cloud quantum) dicatat di draf masing-masing dan banyak yang `[belum terverifikasi]`. |
| [`docs/riset/ai-rekayasa-perangkat-lunak.md`](../../riset/ai-rekayasa-perangkat-lunak.md) (riset AI dalam rekayasa perangkat lunak; keputusan pemilik di issue #139) | Dasar v1.3; dibaca di repositori ini. Riset, bukan transkripsi sumber resmi. |
| Silabus v1.0 (disetujui 2026-11-18; tersimpan di riwayat git) dan [`usulan-fondasi-kelas-x.md`](usulan-fondasi-kelas-x.md) (usulan blok fondasi, issue #86) | Dasar v1.1; dibaca di repositori ini. |

## Changelog

| Versi | Tanggal | Perubahan |
| --- | --- | --- |
| v1.4.1 | 2026-11-19 | Revisi patch atas instruksi pemilik 2026-11-19 ("update peraturan"), issue #238: rumusan dasar hukum pada `B-XI2-M10`, `B-XII2-M10`, `C-XII1-M11`, `D-XII1-M4`, butir `F-LD-g` (bagian 4.1, 4.5), dan keputusan 9 diselaraskan dengan UU 1/2023 (KUHP), yang mencabut sebagian pasal pidana UU ITE; baris baru di bagian 1.2 mencatat sumber (JDIH BPK, dibuka 2026-11-19). Kode minggu, jumlah minggu, pemetaan CP, dan jalur tidak berubah. |
| v1.4.0 | 2026-11-19 | Revisi minor yang disetujui pemilik lewat keputusan #177 (bagian 9.5): subbagian baru di bagian 3.0, "Kemampuan masuk dari SMP dan penempatan di blok fondasi" (tidak mensyaratkan `smp-coding`; tujuh baris irisan minggu SMP dengan fondasi dan minggu jalur A dan B; pengamatan awal di `FND-X1-M1` dan tugas pendalaman di dalam kelas bersama); dicerminkan di `data/sma-coding/smp-bridge.json`. Kode minggu, jumlah minggu, pemetaan CP, jalur, dan jembatan OSN tidak berubah (#177). |
| v1.3.1 | 2026-11-19 | Revisi patch: status verifikasi sumber (SK 046, SKKNI 282/2016); isi kurikulum lain tidak berubah. |
| v1.3.0 | 2026-11-19 | Disetujui pemilik lewat keputusan 2026-11-19 (issue #139; bagian 9.4). Menambahkan butir AI tanpa minggu baru: kebijakan dan privasi pemakaian AI (`FND-X1-M6`, `C-XI2-M2`), tanpa AI pada latihan terpadu jalur A (`A-XII2-M5..M8`), tinjau kode buatan AI, pemeriksaan paket, dan rahasia (`B-XI1-M12`, `B-XI1-M5`, `B-XII1-M10`), non-determinisme, biaya komputasi dan energi, dan pencatatan versi model dan perintah (`D-X2-M11`, `D-XI2-M12`, `D-XII1-M10`). Aturan jalur D "layanan AI daring hanya didemonstrasikan guru" diganti: pemakaian AI generatif oleh murid SMA bebas dengan etika (bagian 3.4, 7.2, 7.3, 9.3, 9.4). Menambahkan bagian 7.4 "Kebijakan penggunaan AI" (per program; etika, log, kapan tanpa AI, privasi, verifikasi kode, glosarium istilah). Kode dan jumlah minggu, pemetaan CP, dan jembatan OSN tidak berubah. |
| v1.2.0 | 2026-11-19 | Disetujui pemilik program untuk jalur A, B, C, D, dan E (issue #68, #84, #88; bagian 9.3). Menambahkan jalur C (IoT dan robotika), D (kecerdasan buatan dan analisis data), dan E (komputasi kuantum, kelas XI-XII, awalan kode `E-`) beserta rencana mingguan, tujuan, pemetaan CP (jalur C digabung ke bagian 4.1 dan 4.2 dengan tanda parsial per jalur; jalur D dan E sebagai pengayaan di luar CP pada bagian 4.5, tidak dihitung pemenuhan CP), jembatan OSN jalur C (bagian 5.2), ringkasan jalur (bagian 3.6), dan keputusan pemilik atas semua pertanyaan terbuka draf (opsi rekomendasi). Mencatat celah F-LD-d dan F-LD-e jalur A dicakup modul pendamping (issue #105; bagian 4.3). Bagian 1.1-1.4 (kutipan CP) tidak berubah. Ketiga draf menjadi riwayat. |
| v1.1.0 | 2026-11-19 | Disetujui pemilik program untuk jalur A dan B (issue #92, bagian 9.2). Menerapkan blok fondasi kelas X tujuh minggu (FND-X1-M1..M7, kelas bersama lintas jalur) sesuai delapan keputusan pemilik (bagian 9.1); kelas X semester 1 dan 2 jalur A dan B disusun ulang (minggu jalur dimulai dari M8; array, string, array dua dimensi / objek dan JSON digeser ke awal semester 2; beberapa minggu digabung); `B-X2-M9`/`M10` dihapus; operasi bit dipindah ke `A-XI1-M3` (pengayaan); pemetaan CP (4.1, 4.3, 4.4) dan jembatan OSN (5) diperbarui. Berkas draf `silabus-v1.1-draf.md` dihapus (isinya kini berkas ini). |
| v1.1.0-draf | 2026-11-18 | Draf (issue #92, tahap 1) yang menjadi dasar v1.1; belum disetujui saat itu. |
| v1.0.0 | 2026-11-18 | Disetujui pemilik program untuk jalur A dan B (issue #52). Keenam pertanyaan terbuka dijawab (bagian 9): panduan 2025 dipakai, 3 JP/minggu, modul pendamping (#69), jalur C terpisah (#68), murid memilih satu jalur, lab campuran. Berkas diganti nama dari `silabus-draf.md`. |
| v0.2.0 | 2026-11-18 | Mencatat keputusan pemilik (issue #63): `awcms-one` opsi 1; topik bertanda P menjadi pengayaan opsional. Pertanyaan 4 dan 5 terjawab. Status tetap DRAF. |
| v0.1.0 | 2026-11-18 | Draf awal (issue #51): sumber resmi dan kutipan CP Fase E/F, rencana mingguan dua jalur, pemetaan CP, jembatan OSN, analisis `awcms-one`, asesmen, perangkat, privasi, rujukan, pertanyaan terbuka. |
