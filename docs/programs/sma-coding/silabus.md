# Silabus Pembelajaran Coding SMA — v1.0

- **Version:** v1.0.0
- **Last updated:** 2026-11-18
- **Status:** DISETUJUI pemilik program, 2026-11-18 — jalur A dan B (issue #52). Jalur C (#68) dan modul pendamping (#69) masih disusun untuk v1.1.
- **Changeset:** Silabus disetujui sebagai v1.0 untuk jalur A dan B; keenam pertanyaan terbuka dijawab pemilik.

> **Disetujui pemilik program pada 2026-11-18 untuk jalur A dan B**
> (keputusan lewat dialog pilihan, dicatat di issue #52). Dokumen ini adalah
> konten karangan menurut
> [ADR-0007](../../architecture/adr/0007-authored-learning-content.md) yang
> kini menjadi sumber corpus program `sma-coding` (ADR-0006). Kutipan CP di
> bagian 1 adalah transkripsi sumber resmi; selebihnya rancangan penyusun
> yang disetujui. Butir bertanda `[belum terverifikasi]` tetap belum
> terverifikasi. Jalur C dan modul pendamping belum termasuk persetujuan ini.

## 0. Cara membaca dokumen ini

- `[belum terverifikasi]` berarti butir itu tidak dapat dipastikan dari
  sumber resmi yang benar-benar dibuka penyusun pada 2026-11-18. Butir
  seperti itu tidak boleh diperlakukan sebagai fakta.
- `[asumsi]` berarti keputusan perancangan penyusun, bukan data resmi.
- Kode minggu berbentuk `jalur-kelas-semester-M<n>`, misalnya `A-X1-M3`
  (jalur A, kelas X, semester 1, minggu 3). Semester: `X1`, `X2` (Fase E);
  `XI1`, `XI2`, `XII1`, `XII2` (Fase F).
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
| Hubungan jalur | Murid memilih satu jalur (A, B, atau kelak C); boleh mengambil jalur lain bila waktu sekolah mengizinkan | Ditetapkan pemilik 2026-11-18. |
| Pola tiap semester | Minggu 1-12 materi; minggu 13 proyek mini; minggu 14 asesmen dan refleksi | `[asumsi]` |
| Nilai dasar | CP wajib tercakup di pembelajaran Informatika sekolah; silabus coding ini hanya membahas butir yang dapat dicapai lewat coding. Butir lain ada di bagian 4.3. | Rancangan penyusun. |

Prinsip rancangan: (1) mengikuti catatan panduan bahwa urutan penomoran CP
bukan urutan belajar; (2) Fase E menekankan konsep dasar (pseudocode,
struktur data dan algoritma standar); (3) Fase F menekankan strategi
algoritmik, data, proses rekayasa, dan program terstruktur dengan library.

## 3. Rencana mingguan

Kolom: **Topik** | **Tujuan** (murid mampu ...) | **Keluaran** | **Latihan**.
Seluruh data latihan bersifat sintetis (bagian 8).

### 3.1 Jalur A: Algoritmik dengan C++

#### A-X1 (kelas X, semester 1; Fase E)

| Minggu | Topik | Tujuan | Keluaran | Latihan |
| --- | --- | --- | --- | --- |
| M1 | Komputer, Input-Proses-Output, sistem operasi, lingkungan g++ | menjelaskan model I-P-O Von Neumann dan peran OS; mengompilasi program pertama | `hello.cpp`; diagram I-P-O | simulasi I-P-O tanpa komputer; cetak teks |
| M2 | Algoritma, pseudocode, diagram alir | menulis solusi sederhana dalam pseudocode | 3 pseudocode | tukar dua nilai; cari nilai terbesar dari tiga |
| M3 | Variabel, tipe data, ekspresi | memilih tipe (`int`, `long long`, `double`, `char`, `bool`) dan menulis ekspresi | program hitung | luas dan keliling; pembagian bulat dan sisa |
| M4 | Masukan dan keluaran | membaca dan menulis data dengan `cin`/`cout` | program berformat | konversi suhu; rata-rata dua bilangan |
| M5 | Percabangan | memakai `if`/`else`, `switch` | program bercabang | genap/ganjil; kategori nilai (data sintetis) |
| M6 | Perulangan I | memakai `for` dan `while` | program berulang | jumlah deret; pola bintang |
| M7 | Perulangan II | memakai perulangan bersarang, `break`, `continue` | tabel keluaran | tabel perkalian; uji prima sederhana |
| M8 | Logika Boolean | menyusun tabel kebenaran; memakai `&&`, `||`, `!`, XOR | tabel kebenaran | sederhanakan kondisi; implikasi sebagai kondisi |
| M9 | Fungsi dan parameter | memecah program menjadi fungsi | program modular | faktorial; FPB |
| M10 | Array satu dimensi | menyimpan dan mengolah barisan data | program array | maksimum, minimum, rata-rata; balik array |
| M11 | String | mengolah teks karakter demi karakter | program teks | palindrom; hitung vokal |
| M12 | Array dua dimensi | mengolah tabel data | program matriks | jumlah baris dan kolom; transpos |
| M13 | Proyek mini: data berkualitas | memeriksa dan membersihkan data tabel kecil secara mandiri atau berkelompok | laporan singkat | validasi rentang nilai; temukan data ganjil (sintetis) |
| M14 | Asesmen dan refleksi | menunjukkan penguasaan dasar | uji tulis dan praktik; jurnal | kuis kode |

#### A-X2 (kelas X, semester 2; Fase E)

| Minggu | Topik | Tujuan | Keluaran | Latihan |
| --- | --- | --- | --- | --- |
| M1 | Ulasan dan penelusuran galat | menemukan galat dengan mencetak nilai dan uji kecil | daftar galat umum | perbaiki 5 program rusak |
| M2 | Aritmetika dasar | memakai paritas, habis dibagi, modulo | program aritmetika | digit penjumlahan; sisa bagi |
| M3 | FPB, KPK, bilangan prima | menghitung FPB/KPK dan faktorisasi | program bilangan | faktorisasi prima; saringan sederhana |
| M4 | Struktur data: daftar (`vector`) | menyimpan data yang ukurannya berubah | program `vector` | tambah/hapus elemen; hitung frekuensi |
| M5 | Struktur data: tumpukan (stack) | memakai prinsip LIFO | program stack | kurung seimbang |
| M6 | Struktur data: antrian (queue) | memakai prinsip FIFO | program queue | simulasi antrian loket (sintetis) |
| M7 | Pencarian sekuensial dan biner | memilih dan menulis pencarian | program pencarian | cari nilai; tebak angka dengan biner |
| M8 | Pengurutan: bubble sort | menulis dan menelusuri bubble sort | program urut | urutkan dan hitung pertukaran |
| M9 | Pengurutan: insertion sort | menulis insertion sort dan membandingkannya | program urut | bandingkan jumlah langkah |
| M10 | Pengantar rekursi | menulis fungsi rekursif sederhana | fungsi rekursif | faktorial dan Fibonacci rekursif |
| M11 | Efisiensi intuitif | menghitung banyak operasi dan membandingkan solusi | tabel perbandingan | jumlah langkah dua solusi |
| M12 | Operasi bit dasar (pengayaan) | memakai `&`, `\|`, `^`, geser | program bit | cek bit ke-k; tukar tanpa variabel bantu |
| M13 | Proyek mini: pengelolaan data tabel | memakai struktur data dan pencarian/pengurutan standar pada satu masalah | program dan penjelasan | urut, cari, dan rekap data sintetis |
| M14 | Asesmen dan refleksi | menunjukkan struktur data dan algoritma standar | uji tulis dan praktik | kuis kode |

#### A-XI1 (kelas XI, semester 1; Fase F)

| Minggu | Topik | Tujuan | Keluaran | Latihan |
| --- | --- | --- | --- | --- |
| M1 | Proses rekayasa program | menguraikan spesifikasi, rancangan, implementasi, uji | dokumen rancangan satu halaman | rancang program rekap |
| M2 | Kualitas kode dan pengujian | menulis uji kasus dan menjaga kualitas kode | berkas uji kasus | tulis kasus uji tepi |
| M3 | Pencarian lengkap (complete search) | menyelesaikan masalah dengan mencoba semua kemungkinan | program pencarian lengkap | subhimpunan jumlah tertentu |
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

| Minggu | Topik | Tujuan | Keluaran | Latihan |
| --- | --- | --- | --- | --- |
| M1 | Komputer, I-P-O, sistem operasi, peramban, editor, Bun, Git | menjelaskan I-P-O dan peran OS; menjalankan skrip pertama | `halo.js`; diagram I-P-O | simulasi I-P-O; `console.log` |
| M2 | Algoritma dan pseudocode | menulis pseudocode yang dekat dengan bahasa komputer | 3 pseudocode | tukar dua nilai; nilai terbesar |
| M3 | Variabel, tipe, ekspresi (JS) | memakai `let`, `const`, `number`, `string`, `boolean` | skrip hitung | luas dan keliling |
| M4 | Masukan dan keluaran | membaca masukan (argumen berkas perintah atau formulir) dan menulis keluaran | skrip berinteraksi | konversi suhu |
| M5 | Percabangan | memakai `if`/`else`, `switch` | skrip bercabang | genap/ganjil; kategori nilai (sintetis) |
| M6 | Perulangan I | memakai `for`, `while` | skrip berulang | jumlah deret; pola |
| M7 | Perulangan II | memakai perulangan bersarang, `break`, `continue` | skrip tabel | tabel perkalian; uji prima |
| M8 | Logika Boolean | memakai operator logika; `===` dan nilai "truthy/falsy" | tabel kebenaran | sederhanakan kondisi |
| M9 | Fungsi | memakai fungsi biasa dan fungsi panah dengan parameter | skrip modular | faktorial; FPB |
| M10 | Array | memakai array dan metode `map`/`filter`/`reduce` | skrip array | rata-rata; saring nilai |
| M11 | String dan templat | mengolah teks | skrip teks | palindrom; hitung vokal |
| M12 | Objek dan JSON | memodelkan data dengan objek; membaca dan menulis JSON | berkas JSON | daftar buku (sintetis) |
| M13 | Proyek mini | membuat permainan tebak angka berbasis teks | skrip dan penjelasan | tebak angka |
| M14 | Asesmen dan refleksi | menunjukkan dasar pemrograman | uji tulis dan praktik; jurnal | kuis kode |

#### B-X2 (kelas X, semester 2; Fase E)

| Minggu | Topik | Tujuan | Keluaran | Latihan |
| --- | --- | --- | --- | --- |
| M1 | HTML dasar | menyusun dokumen HTML semantik | halaman HTML | profil fiktif |
| M2 | CSS dasar dan responsif | menata halaman agar nyaman di layar kecil | halaman bergaya | tata letak dua kolom |
| M3 | DOM dan peristiwa | mengubah halaman dengan JS | halaman interaktif | penghitung klik |
| M4 | Struktur data: tumpukan dan antrian | membuat stack dan queue dengan array/kelas | modul `stack`, `queue` | kurung seimbang; antrian sintetis |
| M5 | Pencarian sekuensial dan biner | menulis kedua pencarian | skrip pencarian | tebak angka biner |
| M6 | Pengurutan: bubble sort | menulis dan menelusuri | skrip urut | hitung pertukaran |
| M7 | Pengurutan: insertion sort dan visualisasi | memvisualisasikan langkah pengurutan | halaman visualisasi | animasi langkah |
| M8 | Data berkualitas | memvalidasi masukan dan merapikan data tabel (JSON) | skrip validasi | cek rentang, duplikat |
| M9 | Kata sandi dan privasi akun | memakai manajer kata sandi, autentikasi dua langkah, konfigurasi privasi pada akun uji | lembar periksa | konfigurasi akun lab (bukan akun pribadi bila sekolah melarang) |
| M10 | HAKI dan lisensi perangkat lunak | membaca lisensi (misalnya MIT) dan memberi atribusi | berkas `LICENSE` dan atribusi | pilih lisensi untuk proyek |
| M11 | Mesin pencari dan dokumentasi | mencari dan menilai dokumentasi teknis | catatan sumber | selesaikan masalah dari dokumentasi resmi |
| M12 | Git dan kolaborasi dasar | memakai commit, cabang, dan kolaborasi | repositori latihan | kerja berpasangan |
| M13 | Proyek mini: visualisasi algoritma | menggabungkan HTML/CSS/JS dan algoritma standar | halaman statis | visualisasi pencarian atau pengurutan |
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
| E-BK-a | struktur data dan algoritma standar | A-X2-M4..M9; B-X2-M4..M7 | A, B |
| E-BK-b | data berkualitas | A-X1-M13; B-X2-M8 | A, B |
| E-BK-c | menerapkan algoritma dan struktur data standar | A-X2-M4..M9, M13; B-X2-M4..M7, M13 | A, B |
| E-BK-d | pseudocode dan program dalam bahasa komputer | A-X1-M2..M12; B-X1-M2..M12 | A, B |
| E-BK-e | model I-P-O dan sistem operasi | A-X1-M1; B-X1-M1 | A, B |
| E-LD-a | mesin pencari (hanya untuk dokumentasi teknis) | B-X2-M11 | B (parsial) |
| E-LD-f | produksi konten dan kolaborasi | B-X2-M1..M3, M12..M13 | B |
| E-LD-g | HAKI dan lisensi | B-X2-M10 | B |
| E-LD-k | kata sandi dan autentikasi dua langkah | B-X2-M9 | B |
| E-LD-l | konfigurasi privasi dan keamanan akun | B-X2-M9 | B |

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

Butir berikut tidak dicakup oleh jalur A dan B (tidak dihilangkan dari CP):
E-LD-b, c, d, e, h, i, j; F-LD-a, b, c, h, j; F-BK-d (kecuali pengiriman
data HTTP pada B-XI2-M11).

**Keputusan pemilik (2026-11-18, issue #52):** butir-butir itu dicakup lewat
**modul pendamping** literasi digital (issue #69). Interaksi dengan
perangkat fisik seperti IoT dan robot (disebut di panduan, bagian C, bukan
di rumusan CP) menjadi **jalur C terpisah** (issue #68). Keduanya disusun
untuk silabus v1.1 dan baru berlaku setelah disetujui pemilik.

## 5. Jembatan ke OSN (jalur A)

ID rumpun diambil dari `data/osn/topic-families.json` (silabus OSN v2.0).
Pemetaan ini penilaian penyusun, bukan bagian dari data OSN. Topik di luar
rumusan CP ditandai **P** (pengayaan, melampaui CP).

**Keputusan pemilik (2026-11-18, issue #52):** topik bertanda **P** adalah
**pengayaan opsional** — wajib bagi siswa yang menuju OSN, opsional untuk
kelas reguler jalur A.

| Rumpun materi OSN (`id`) | Topik jalur A yang menyiapkan | Minggu | Catatan |
| --- | --- | --- | --- |
| `dasar-pemrograman` | sintaks C++, variabel, I/O, percabangan, perulangan, fungsi | A-X1-M3..M9 | Sesuai CP. |
| `logika-bitwise` | logika Boolean; operasi bit | A-X1-M8; A-X2-M12 | Operasi bit: **P**. |
| `aritmetika` | paritas, FPB/KPK, prima; aritmetika modular | A-X2-M2..M3; A-XII1-M8 | **P** untuk modular. |
| `aturan-berhitung` | aturan jumlah dan kali, permutasi dan kombinasi, Pascal | A-XII1-M6..M7 | **P**. |
| `rekursi` | rekursi, divide-and-conquer, backtracking | A-X2-M10; A-XI1-M7, M11; A-XII2-M4 | Rekursi ada di panduan (strategi algoritmik). |
| `search-sort` | pencarian sekuensial dan biner; bubble, insertion; merge, quick | A-X2-M7..M9; A-XI1-M8 | Bubble/insertion/sekuensial/biner sesuai panduan; merge dan quick: **P**. |
| `strategi-problem-solving` | pencarian lengkap dan pruning, greedy, divide-and-conquer, DP | A-XI1-M3..M7, M11..M12; A-XI2-M1..M4 | Greedy, rekursi, DP ada di panduan; pencarian lengkap: **P**. |
| `struktur-data` | array, string, stack, queue, heap, DSU, Fenwick, segment tree | A-X1-M10..M12; A-X2-M4..M6; A-XI1-M9..M10; A-XII1-M4, M9..M10 | Stack, queue, list sesuai panduan; heap, DSU, Fenwick, segment tree: **P**. |
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

JS dasar (B-X1) -> HTML/CSS/DOM dan algoritma standar (B-X2) -> TypeScript
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
- Rencana mingguan belum diuji di kelas.

## 9. Keputusan pemilik atas pertanyaan terbuka (2026-11-18)

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

## Changelog

| Versi | Tanggal | Perubahan |
| --- | --- | --- |
| v1.0.0 | 2026-11-18 | Disetujui pemilik program untuk jalur A dan B (issue #52). Keenam pertanyaan terbuka dijawab (bagian 9): panduan 2025 dipakai, 3 JP/minggu, modul pendamping (#69), jalur C terpisah (#68), murid memilih satu jalur, lab campuran. Berkas diganti nama dari `silabus-draf.md`. |
| v0.2.0 | 2026-11-18 | Mencatat keputusan pemilik (issue #63): `awcms-one` opsi 1; topik bertanda P menjadi pengayaan opsional. Pertanyaan 4 dan 5 terjawab. Status tetap DRAF. |
| v0.1.0 | 2026-11-18 | Draf awal (issue #51): sumber resmi dan kutipan CP Fase E/F, rencana mingguan dua jalur, pemetaan CP, jembatan OSN, analisis `awcms-one`, asesmen, perangkat, privasi, rujukan, pertanyaan terbuka. |
