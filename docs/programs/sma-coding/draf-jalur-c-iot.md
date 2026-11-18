# Draf Jalur C: IoT dan Robotika (Kelas X–XII)

- **Version:** v0.2.0
- **Last updated:** 2026-11-19
- **Status:** DISETUJUI pemilik 2026-11-19 (issue #68) beserta semua rekomendasi penyusun dan sudah dimasukkan ke [silabus v1.2](silabus.md) bagian 3.3; dokumen ini tetap menjadi riwayat draf (bagian 11 menandai setiap pertanyaan terjawab)
- **Changeset:** Pertanyaan terbuka (bagian 11) ditandai terjawab sesuai keputusan pemilik 2026-11-19; status menjadi disetujui dan merujuk silabus v1.2. Isi rencana tidak diubah.

> **Disetujui pemilik pada 2026-11-19 dan dimasukkan ke silabus v1.2.**
> Dokumen ini adalah konten karangan menurut
> [ADR-0007](../../architecture/adr/0007-authored-learning-content.md):
> rancangan dan penilaian penyusun, bukan transkripsi sumber resmi. Pemilik
> menyetujui draf beserta semua rekomendasi penyusun lewat dialog pilihan
> (silabus [bagian 9.3](silabus.md)); sumber kebenaran jalur C kini
> [silabus.md bagian 3.3](silabus.md) dan `data/sma-coding/`. Dokumen ini
> dipertahankan sebagai riwayat (perbandingan platform, cuplikan harga
> bertanggal 2026-11-19 yang `[belum terverifikasi]`, dan sumber); bila isinya
> berbeda dari silabus, silabus yang berlaku.

## 0. Cara membaca dokumen ini

- `[asumsi]`: keputusan perancangan penyusun, bukan data resmi.
- `[belum terverifikasi]`: tidak dapat dipastikan dari sumber yang benar-benar
  dibuka penyusun; jangan diperlakukan sebagai fakta.
- Kode minggu `C-X1-M<n>` mengikuti [silabus.md bagian 0](silabus.md):
  jalur C, kelas X, semester 1, minggu n. Semester: `X1`, `X2`, `XI1`,
  `XI2`, `XII1`, `XII2`. Minggu fondasi bersama memakai `FND-X1-M<n>`
  ([usulan fondasi](usulan-fondasi-kelas-x.md)).
- Kode butir CP (`E-BK-d`, `F-BK-a`, dan seterusnya) dipakai persis seperti
  [silabus.md bagian 1.4](silabus.md); dokumen ini tidak membuat kode baru.
  Kutipan CP disalin dari silabus bagian 1.3.
- Satu pertemuan = 3 JP x 45 menit per minggu; 14 minggu materi + 2 minggu
  cadangan per semester (silabus bagian 2; ditetapkan pemilik 2026-11-18).

## 1. Latar dan keputusan pemilik

Keputusan pemilik (2026-11-18, issue #52): interaksi dengan perangkat fisik
(IoT dan robot), yang disebut *Panduan Mata Pelajaran Informatika* 2025
bagian C tetapi **bukan rumusan CP** (silabus bagian 4.3), menjadi **jalur C
terpisah**. Keputusan terkait yang berlaku untuk jalur ini:

| Keputusan | Sumber |
| --- | --- |
| Lab IoT dibantu mitra penyelenggara | Silabus bagian 7.2 |
| Murid memilih satu jalur, boleh lebih bila waktu sekolah mengizinkan | Silabus bagian 2 dan 9 |
| 3 JP x 45 menit per minggu | Silabus bagian 2 |
| Tujuh minggu blok fondasi bersama lintas jalur di awal X1 (`FND-X1-M1..M7`), sehingga materi jalur di X1 hanya minggu 8–14 | Usulan fondasi, keputusan 2026-11-18 (#86; penerapan #92) |
| Asesmen formatif fondasi dilebur ke `M14` | Usulan fondasi bagian 2 |

Catatan kejujuran: bagian C panduan **tidak dibuka ulang** untuk dokumen
ini; satu-satunya rujukan atas isinya adalah catatan silabus v1.0 bagian
4.3. Kalimat panduan tidak dikutip di sini.

## 2. Tujuan jalur C

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
6. bekerja aman secara listrik dan menjaga privasi (bagian 8 dan 9).

Jalur C **bukan** pembinaan OSN; jembatan ke OSN dibahas di bagian 10.

## 3. Struktur dan prasyarat

| Butir | Nilai | Status |
| --- | --- | --- |
| Prasyarat | Blok fondasi `FND-X1-M1..M7` (perangkat keras, I-P-O, biner/heksadesimal, jaringan, keamanan dasar) | Keputusan pemilik; menggantikan minggu pengantar komputer |
| Pengetahuan pemrograman awal | Tidak diasumsikan; jalur C mengajarkan dasar pemrograman sendiri di `C-X1-M8..M12` karena murid jalur C belum tentu mengambil jalur A | `[asumsi]` |
| Bahasa | C++ (kerangka Arduino: `setup()`/`loop()`), selaras sintaks jalur A | Rekomendasi penyusun (bagian 6); keputusan pemilik |
| Pola semester | X1: minggu 8–14 (7 minggu); semester lain: minggu 1–12 materi, 13 proyek mini, 14 asesmen dan refleksi | `[asumsi]` |
| Pengelompokan | Praktik dalam kelompok 3 murid per set perangkat | `[asumsi]` |
| Simulator | Setiap minggu praktik dirancang dapat dilatih di simulator bagi sekolah tanpa perangkat; kegiatan yang hanya mungkin dengan perangkat fisik ditandai (F) | `[asumsi]` |

## 4. Rencana mingguan

Kolom: **Topik** | **Tujuan** (murid mampu ...) | **Keluaran** | **Latihan**.
Seluruh data bersifat sintetis atau data lingkungan benda mati (bagian 9).
Tanda (F) = membutuhkan perangkat fisik. Semua tabel `[asumsi]` sebagai
rancangan penyusun; belum diuji di kelas.

### 4.1 C-X1 (kelas X, semester 1; Fase E): minggu 8–14

Minggu 1–7 adalah `FND-X1-M1..M7` bersama. Penomoran minggu 8–14 dipertahankan
agar sejajar dengan kalender semester.

| Minggu | Topik | Tujuan | Keluaran | Latihan |
| --- | --- | --- | --- | --- |
| M8 | Mikrokontroler, papan, dan program pertama; keluaran digital | menjelaskan sensor-mikrokontroler-aktuator sebagai I-P-O; mengunggah dan menjalankan `setup()`/`loop()`; memakai variabel dan `digitalWrite` | program LED berkedip; diagram I-P-O perangkat | LED berkedip dengan variabel waktu; tulis pseudocode sebelum kode (F) |
| M9 | Masukan digital, percabangan, logika Boolean | membaca tombol; memakai `if`/`else`, `&&`, `||`, `!` | program tombol-LED; tabel kebenaran | tombol menyalakan LED; dua tombol dengan logika AND/OR (F) |
| M10 | Perulangan dan keluaran serial | memakai `for`/`while`; mencetak nilai ke monitor serial untuk penelusuran galat | program pola lampu; catatan galat | pola lampu berjalan; cetak nilai tombol (F) |
| M11 | Masukan analog dan tipe data | membaca potensiometer dan sensor cahaya; memilih tipe data; memakai ambang | program ambang cahaya | lampu menyala saat gelap; peta nilai ke rentang lain (F) |
| M12 | Fungsi dan array | memecah program menjadi fungsi; menyimpan pola dalam array | program modular | pola lampu dari array; fungsi `bacaCahaya()` |
| M13 | Proyek mini | merancang dan menguji sistem kecil dengan satu sensor dan satu aktuator | rancangan, program, laporan singkat | lampu malam otomatis atau alarm tombol (F) |
| M14 | Asesmen dan refleksi (termasuk asesmen formatif fondasi) | menunjukkan dasar pemrograman dan I-P-O fisik | uji tulis dan praktik; jurnal | kuis kode dan rangkaian |

### 4.2 C-X2 (kelas X, semester 2; Fase E)

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

### 4.3 C-XI1 (kelas XI, semester 1; Fase F)

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

### 4.4 C-XI2 (kelas XI, semester 2; Fase F)

| Minggu | Topik | Tujuan | Keluaran | Latihan |
| --- | --- | --- | --- | --- |
| M1 | Jaringan nirkabel dan perangkat IoT | menjelaskan penghubungan papan ke jaringan lab dan peran alamat IP | papan terhubung ke jaringan lab | cetak alamat IP papan (F) |
| M2 | Keamanan konektivitas | menyimpan kredensial di luar kode, mengganti sandi bawaan, memakai jaringan lab terpisah | lembar periksa keamanan | audit kode dari rahasia yang tertanam |
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

### 4.5 C-XII1 (kelas XII, semester 1; Fase F)

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
| M11 | Hukum dan etika sensor | menjelaskan pokok UU ITE dan UU PDP terkait perangkat yang merekam | catatan kepatuhan | daftar periksa proyek |
| M12 | Dokumentasi dan pemeliharaan | menulis dokumen perakitan dan panduan pengguna | dokumen proyek | panduan perakitan |
| M13 | Proyek | menyiapkan rancangan proyek akhir | rencana proyek | rencana kerja |
| M14 | Asesmen dan refleksi | menunjukkan rancangan, kendali, dan pengujian | uji tulis dan praktik | kuis |

### 4.6 C-XII2 (kelas XII, semester 2; Fase F)

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

## 5. Pemetaan ke butir CP

Kutipan CP disalin persis dari [silabus.md bagian 1.3](silabus.md); kode dari
bagian 1.4. **Catatan penting:** interaksi dengan perangkat fisik (sensor,
aktuator, robot) disebut panduan bagian C tetapi **bukan rumusan CP**; maka
jalur C memetakan topik fisik ke butir CP hanya lewat prinsip komputasinya
(I-P-O, data, jaringan, rekayasa), sedangkan keterampilan perakitan dan
elektronika **tidak** dihitung sebagai pemenuhan butir CP mana pun.

| Butir | Kutipan CP | Minggu jalur C | Tingkat |
| --- | --- | --- | --- |
| E-BK-a | "memahami konsep struktur data dan algoritma standar" | C-X2-M4, M9, M10 | Tercakup (pada data sensor). |
| E-BK-b | "menerapkan proses komputasi yang dilakukan manusia secara mandiri atau berkelompok untuk mendapatkan data yang berkualitas" | C-X2-M3, M12 | Tercakup (data sensor; kerja kelompok). |
| E-BK-c | "menerapkan algoritma dan struktur data standar untuk menghasilkan berbagai solusi dalam menyelesaikan persoalan" | C-X2-M4, M9..M10, M13 | Tercakup. |
| E-BK-d | "menuliskan solusi rancangan program sederhana dalam format pseudocode yang dekat dengan bahasa komputer" | C-X1-M8..M13 | Tercakup. |
| E-BK-e | "memahami model dan menyimulasikan dinamika Input-Process-Output dalam sebuah komputer Von Neumann, serta memahami peran sistem operasi" | C-X1-M8 (I-P-O fisik); `FND-X1-M1..M2` | Tercakup bersama fondasi; mikrokontroler tidak menjalankan sistem operasi umum, jadi bagian OS dicakup fondasi. |
| E-LD-e | "memahami konsep dan penerapan serta konfigurasi keamanan dasar untuk konektivitas jaringan data lokal dan internet baik kabel maupun nirkabel" | `FND-X1-M4..M6`; C-XI2-M1..M2 sebagai pendalaman pada perangkat | Tercakup oleh fondasi; jalur C hanya memperdalam. |
| F-BK-a | "memahami alur proses pengembangan program atau produk teknologi digital" | C-XI1-M1..M2; C-XII1-M1..M2, M12; C-XII2-M5..M12 | Tercakup. |
| F-BK-b | "menganalisis persoalan yang bisa menghasilkan lebih dari satu solusi ... dengan memberikan justifikasi efisiensi, kelebihan, dan keterbatasan dari setiap alternatif solusi" | C-XI1-M5..M8; C-XII1-M8 | Tercakup. |
| F-BK-c | "merancang struktur data yang lebih kompleks dan abstrak" | C-XI1-M3, M9 | Parsial (struct dan penyangga melingkar; graf, pohon tidak dibahas). |
| F-BK-d | "mengenali berbagai model jaringan komputer serta mampu melakukan pengiriman data antar perangkat dalam jaringan komputer dan troubleshooting permasalahan jaringan komputer" | C-XI1-M10..M12; C-XI2-M1, M3..M8 | Tercakup untuk jalur C (jalur B hanya parsial; silabus bagian 4.3). Kedalaman model jaringan `[asumsi]`. |
| F-LD-d | "merancang kebutuhan sistem komputer sesuai kebutuhan pengguna" | C-XII1-M1..M2 | Tercakup. |
| F-LD-e | "memahami konsep dan penerapan serta konfigurasi keamanan lanjut untuk konektivitas jaringan data lokal dan internet baik kabel maupun nirkabel" | C-XI2-M2 | Parsial. |
| F-LD-g | "memahami hukum dan perundang-undangan terkait isu digital di Indonesia" | C-XII1-M11 | Parsial (pokok UU ITE dan UU PDP; isi pasal `[belum terverifikasi]` di dokumen ini). |
| F-LD-i | "menerapkan pengelolaan kata sandi dengan manajer kata sandi dan autentikasi dua langkah dengan beragam moda" | C-XI2-M2 | Parsial (pengelolaan kredensial perangkat). |
| F-AD-a | "memanfaatkan sumber data yang terbuka, terpercaya, dan legal untuk mengolah data untuk pengambilan keputusan dan prediksi secara efektif, efisien, dan optimal tanpa atau dengan komputer" | C-XI2-M9..M12 | Tercakup. |
| F-AP-a | "memahami konsep strategi algoritmik" | C-XI1-M5..M8; C-XII1-M6..M8 | Parsial (strategi kendali dan keputusan; bukan greedy atau DP). |
| F-AP-b | "mengembangkan program komputer terstruktur ... berdasarkan strategi algoritmik yang tepat" | C-XI1-M3..M7; C-XII1-M5..M8 | Tercakup. |
| F-AP-c | "mengembangkan, melakukan pemeliharaan, dan penyempurnaan algoritma standar ke dalam kode sumber program dengan memperhatikan kualitasnya" | C-XI1-M2; C-XII2-M1..M2 | Tercakup. |
| F-AP-d | "merancang dan mengimplementasikan sebuah program yang menggunakan struktur data kompleks dan tepat menggunakan library atau perangkat yang tersedia" | C-XI1-M4; C-XII2-M6..M9 | Tercakup (frasa "perangkat" cocok dengan jalur ini; tafsir penyusun). |

Butir yang tidak disentuh jalur C (tetap bergantung pada fondasi, jalur lain,
atau modul pendamping #69): E-LD-a, b, c, d, f, g, h, i, j, k, l; F-LD-a, b,
c, f, h, j. Butir kutipan di tabel di atas dipenggal dengan "..." hanya pada
bagian yang tidak relevan; pemenggalan itu tidak mengubah makna.

## 6. Opsi platform

Pilihan platform adalah hak pemilik. Tabel ini penilaian penyusun; harga
adalah cuplikan halaman pada tanggal akses dan **bukan jaminan harga saat
pengadaan**.

| Kriteria | micro:bit V2 | Arduino Uno R3 / kompatibel | ESP32 DevKit | Raspberry Pi Pico (RP2040) |
| --- | --- | --- | --- | --- |
| Biaya per papan | Rp462.136 (satu listing distributor luar negeri, papan buatan DFRobot, bukan produk resmi); harga resmi `[belum terverifikasi]` | Uno R3: harga rupiah `[belum terverifikasi]` (hanya ditemukan USD 30,95 di toko luar negeri); versi kompatibel `[belum terverifikasi]` | Rp85.347 (listing Tokopedia ESP32 DevKit V1 30 pin; stok habis saat dicek) | Rp47.900–Rp60.000 (listing Tokopedia, Pico); Pico W Rp99.990; USD 4 untuk Pico dan USD 6 untuk Pico W di situs produsen |
| Bahasa | MakeCode (blok/JavaScript), MicroPython `[belum terverifikasi: halaman resmi yang dibuka tidak menyebutnya]` | C++ (Arduino) `[belum terverifikasi: halaman resmi yang dibuka tidak menyebut bahasa]` | C++ lewat kerangka produsen dan Arduino `[belum terverifikasi: halaman resmi yang dibuka menyebut ESP-IDF, bukan Arduino]` | C/C++ dan MicroPython (situs produsen) |
| Selaras jalur A | Rendah (blok atau JS) | Tinggi (C++) | Tinggi bila C++ | Tinggi bila C++; MicroPython kurang |
| Wi-Fi bawaan | Tidak; radio bukan Wi-Fi `[belum terverifikasi]` | Tidak pada R3 | Ya (produsen: Wi-Fi dan Bluetooth terintegrasi) | Hanya Pico W (listing) |
| Ketersediaan di Indonesia | Terbatas; tidak ada listing toko Indonesia yang ditemukan | Banyak `[belum terverifikasi]` (R4 WiFi ada di Tokopedia, Rp296.000–Rp350.000) | Ada, stok berubah | Ada, banyak penjual |
| Simulator gratis untuk sekolah tanpa perangkat | MakeCode punya simulator `[belum terverifikasi]` | Tinkercad Circuits `[belum terverifikasi: halaman yang dibuka kosong]`; Wokwi `[belum terverifikasi: daftar papan tidak terkonfirmasi]` | Wokwi `[belum terverifikasi: tidak terkonfirmasi di halaman harga yang dibuka]` | Wokwi `[belum terverifikasi]` |
| Keamanan listrik | Sangat baik (USB, tegangan rendah) | Baik; tegangan kerja 5 V `[belum terverifikasi]` | Baik; logika 3,3 V `[belum terverifikasi]`, daya USB | Baik; logika 3,3 V `[belum terverifikasi]`, daya USB |
| Kecukupan jalur C (jaringan XI2, robot XII) | Kurang (tanpa Wi-Fi, pin terbatas) | Cukup untuk X dan robot; jaringan perlu modul tambahan | Paling lengkap | Cukup; jaringan hanya Pico W |

Catatan sumber simulator: situs Wokwi menyatakan paket Community gratis
(untuk proyek sumber terbuka, simulasi tak terbatas, proyek harus publik) dan
penggunaan kelas memakai lisensi *Wokwi Classroom* dengan penawaran harga;
dukungan papan tidak terkonfirmasi di halaman itu.

**Rekomendasi penyusun: ESP32 DevKit diprogram dengan C++ gaya Arduino**
sebagai satu platform untuk kelas X–XII, karena (1) Wi-Fi bawaan memenuhi
F-BK-d tanpa modul tambahan; (2) C++ selaras jalur A sehingga murid dapat
berpindah jalur; (3) harga per papan rendah (cuplikan Rp85.347); (4) satu
papan sepanjang tiga tahun menyederhanakan pengadaan, pelatihan guru, dan
modul. Risiko yang diakui: ketersediaan dan mutu papan tiruan berubah-ubah;
logika 3,3 V menuntut kehati-hatian pada sensor 5 V; dukungan simulator
`[belum terverifikasi]`. **Cadangan:** Raspberry Pi Pico (W bila perlu
jaringan) dengan C++ bila pemilik mengutamakan harga terendah dan banyak
penjual lokal. micro:bit tidak direkomendasikan sebagai platform utama
(Wi-Fi tidak ada, ketersediaan lokal tidak terbukti), tetapi dapat dipakai
untuk pengantar kelas X di sekolah yang telah memilikinya.

## 7. Kebutuhan perangkat dan perkiraan biaya `[asumsi]`

Satu set per kelompok 3 murid. Semua angka `[asumsi]` kecuali yang bertanda
snapshot; harga komponen selain papan **tidak diriset** (`[belum terverifikasi]`).

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

Perkiraan total per set `[asumsi, belum terverifikasi]`: Rp250.000–Rp500.000
untuk set kelas X–XI (dua papan); tambahan Rp300.000–Rp600.000 untuk satu
set robot kelas XII. Rentang ini tebakan perancang, bukan hasil survei harga;
penentuan anggaran harus menunggu penawaran mitra atau toko. Pembiayaan dan
pengadaan perangkat dibantu mitra (keputusan pemilik) tetapi pembagian
tanggung jawabnya belum diputuskan (pertanyaan 3).

## 8. Keselamatan kerja

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

## 9. Privasi dan data (ADR-0004)

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

## 10. Jembatan ke jalur A dan OSN

- **Selaras sintaks:** `C-X1-M8..M12` memakai C++ dengan sintaks yang sama
  dengan `A-X1-M3..M9`, sehingga murid jalur C dapat berpindah atau
  mengambil jalur A tambahan dengan penyesuaian kecil (`cin`/`cout` diganti
  `Serial`).
- **Topik jalur C yang menyiapkan rumpun OSN** (id dari
  `data/osn/topic-families.json`; penilaian penyusun, bukan data OSN):

| Rumpun | Topik jalur C | Catatan |
| --- | --- | --- |
| `dasar-pemrograman` | C-X1-M8..M12 | Hanya sebagian (tanpa `cin`/`cout`, tanpa string). |
| `logika-bitwise` | C-X1-M9 | Hanya logika Boolean; operasi bit tidak dibahas. |
| `struktur-data` | C-X2-M4, M9; C-XI1-M9 | Array, stack, queue, penyangga. |
| `search-sort` | C-X2-M10 | Median; bukan pengurutan penuh. |

  Rumpun lain tidak tersentuh. **Jalur C bukan pembinaan OSN**; siswa yang
  menuju OSN sebaiknya mengambil jalur A.
- **Jalur B:** C-XI2 (JSON, HTTP) beririsan dengan `B-XI2` sehingga murid dapat
  memakai keluaran data jalur C pada proyek web `[asumsi]`.

## 11. Pertanyaan terbuka untuk pemilik

| No. | Pertanyaan | Opsi | Rekomendasi penyusun | Keputusan pemilik (2026-11-19) |
| --- | --- | --- | --- | --- |
| 1 | Platform utama | (a) ESP32 DevKit; (b) Raspberry Pi Pico/Pico W; (c) Arduino Uno kompatibel; (d) micro:bit | (a), cadangan (b) | Terjawab: (a) ESP32 DevKit; cadangan (b). |
| 2 | Bahasa | (a) C++ (gaya Arduino), selaras jalur A; (b) MicroPython; (c) MakeCode/JS | (a) | Terjawab: (a) C++ gaya Arduino. |
| 3 | Pengadaan perangkat | (a) mitra menyediakan set per kelompok; (b) sekolah membeli dengan daftar belanja dari mitra; (c) campuran | (c); batas tanggung jawab dicatat tertulis | Terjawab: (c) campuran; batas tanggung jawab dicatat tertulis. |
| 4 | Sekolah tanpa perangkat | (a) simulator saja (butuh verifikasi lisensi kelas dan dukungan papan); (b) set dipinjamkan mitra bergilir; (c) jalur C hanya untuk sekolah yang punya perangkat | (b), dengan (a) sebagai latihan; verifikasi simulator dulu | Terjawab: (b) set dipinjamkan mitra bergilir, simulator sebagai latihan. |
| 5 | Robot di kelas XII | (a) ya, satu set bergilir; (b) tidak, diganti proyek IoT statis | (a) bila anggaran ada; bila tidak (b) | Terjawab: (a) bila anggaran ada; bila tidak (b). |
| 6 | Infrastruktur jaringan untuk XI2 | (a) jaringan lab terpisah dan penengah pesan lokal di komputer guru; (b) jaringan sekolah dan layanan publik | (a) demi keamanan dan privasi | Terjawab: (a) jaringan lab terpisah dan penengah pesan lokal. |
| 7 | Murid jalur C yang tidak pernah ambil jalur A | (a) jalur C mengajarkan dasar sendiri (seperti draf ini); (b) mewajibkan kelas bersama dengan A di X1 | (a); risiko tujuh minggu padat di X1 diakui | Terjawab: (a) jalur C mengajarkan dasar sendiri. |
| 8 | Peran mitra pada keselamatan | (a) mitra menyusun dan mengaudit aturan keselamatan; (b) sekolah | (a), ditinjau pemilik | Terjawab: (a) mitra menyusun dan mengaudit; ditinjau pemilik. |
| 9 | Isi pasal hukum (UU ITE, UU PDP) di C-XII1-M11 | (a) diverifikasi dari sumber resmi sebelum modul ditulis; (b) tidak dirinci | (a) | Terjawab: (a) diverifikasi sebelum modul ditulis. |

Pertanyaan 1, 3, 4, 5 berkaitan dengan biaya; jawab bersama agar konsisten.

## 12. Sumber dan batasan

Tanggal akses sumber web: **2026-11-19** (tanggal dokumen 2026-11-18 mengikuti
penyusunan draf awal). Hanya halaman yang benar-benar dibuka dicatat sebagai
sumber; ringkasan halaman dihasilkan alat pengambil halaman sehingga rincian
halaman `[belum terverifikasi]` bila tidak tertulis eksplisit di bawah.

| Rujukan | URL | Yang dipakai | Status |
| --- | --- | --- | --- |
| Raspberry Pi Pico | `https://www.raspberrypi.com/products/raspberry-pi-pico/` | Pico mulai USD 4, Pico W USD 6, chip RP2040, C/C++ dan MicroPython, Pico 2 mulai USD 5 | Dibuka 2026-11-19 |
| Arduino Uno Rev3 | `https://docs.arduino.cc/hardware/uno-rev3/` | Mikrokontroler ATmega328P; harga, tegangan kerja, bahasa tidak tertulis | Dibuka 2026-11-19; tegangan dan harga `[belum terverifikasi]` |
| Wokwi harga | `https://wokwi.com/pricing` | Paket Community gratis untuk proyek sumber terbuka; lisensi kelas terpisah (permintaan penawaran) | Dibuka 2026-11-19; daftar papan tidak terkonfirmasi |
| micro:bit beli | `https://microbit.org/buy/` | Hanya: produk dijual lewat mitra penjual; tanpa harga | Dibuka 2026-11-19 |
| micro:bit perangkat keras | `https://tech.microbit.org/hardware/` | Tidak memuat spesifikasi yang dicari | Dibuka 2026-11-19; spesifikasi `[belum terverifikasi]` |
| Tinkercad Circuits | `https://www.tinkercad.com/circuits` | Halaman hanya berisi judul | `[belum terverifikasi]` |
| ESP32-DevKitC | `https://www.espressif.com/en/products/devkits/esp32-devkitc` | Berbasis modul ESP32; Wi-Fi dan Bluetooth terintegrasi; ESP-IDF disebut | Dibuka 2026-11-19; harga tidak tertulis |
| Hasil pencarian harga toko Indonesia | Daftar Tokopedia (`tokopedia.com/pattra-elek/raspberry-pi-pico-rp2040-microcontroller`, `tokopedia.com/rajaduino/esp32-esp-32-devkit-v1-board-30-pin-wifi-bluetooth-ble-microcontroller`, `tokopedia.com/dielectronics/raspberry-pi-pico-w-wh-rp2040-wifi-arm-board-micropython-iot-arduino-pico`), Mouser Indonesia (`mouser.co.id`), pishop.us | Harga rupiah dan USD pada bagian 6 dan 7 | Cuplikan hasil pencarian 2026-11-19; halaman penjual tidak dibuka satu per satu; harga mudah berubah |
| Silabus v1.0 | [silabus.md](silabus.md) | Kutipan dan kode CP, struktur, keputusan pemilik | Dibaca di repositori ini |
| Usulan fondasi v0.2.0 | [usulan-fondasi-kelas-x.md](usulan-fondasi-kelas-x.md) | Blok fondasi dan prasyarat | Dibaca di repositori ini |
| ADR-0004, 0006, 0007 | `../../architecture/adr/` | Privasi, multi-program, konten karangan | Dibaca |

Batasan:

- Rencana mingguan adalah rancangan penyusun, belum diuji di kelas, dan
  belum ditinjau guru atau mitra.
- Bagian C panduan tidak dibuka ulang; nomor SK dan regulasi tetap seperti
  di silabus (`[belum terverifikasi]`).
- Harga, spesifikasi, dukungan simulator, dan ketentuan keselamatan banyak
  yang `[belum terverifikasi]`; hal itu harus diselesaikan sebelum anggaran
  atau persetujuan.
- Beban tujuh minggu di C-X1 untuk dasar pemrograman sangat padat dan perlu
  diuji.

## Changelog

| Versi | Tanggal | Perubahan |
| --- | --- | --- |
| v0.2.0 | 2026-11-19 | Disetujui pemilik beserta semua rekomendasi (issue #68) dan dimasukkan ke silabus v1.2 bagian 3.3; pertanyaan bagian 11 ditandai terjawab; header status diperbarui. Isi rencana tidak diubah. |
| v0.1.0 | 2026-11-18 | Draf awal (issue #68): tujuan, rencana mingguan X–XII, pemetaan CP, opsi platform dan rekomendasi, perangkat dan biaya (asumsi), keselamatan, privasi, jembatan, pertanyaan terbuka, sumber. Status DRAF. |
