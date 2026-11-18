# Usulan Blok Fondasi Informatika Dasar Wajib di Kelas X

- **Version:** v0.3.0
- **Last updated:** 2026-11-18
- **Status:** DRAF — kedelapan keputusan pemilik dicatat (2026-11-18); diterapkan pada [draf silabus v1.1](silabus-v1.1-draf.md) (issue #92); v1.1 belum disetujui
- **Changeset:** Keputusan pemilik 2026-11-18 untuk pertanyaan 4, 6, 7, dan 8 dicatat (semua pertanyaan terjawab); draf silabus v1.1 menerapkannya.

> **Keputusan pemilik (2026-11-18, dialog pilihan, dicatat di issue #86):**
> blok fondasi **7 minggu** — paket enam minggu opsi (b) ditambah **satu
> minggu perangkat pengolah dokumen, lembar kerja, dan presentasi (E-LD-d)**;
> dijalankan sebagai **kelas bersama lintas jalur sebelum murid memilih
> jalur**; operasi bit dasar (`A-X2-M12`) **pindah ke pengayaan kelas XI**.
> Keputusan lanjutan (2026-11-18): pertanyaan 4, 6, 7, dan 8 juga dijawab
> (bagian 8), sehingga **kedelapan pertanyaan terjawab**. Penerapannya
> disusun sebagai [draf silabus v1.1](silabus-v1.1-draf.md) (issue #92,
> tahap 1); corpus dikerjakan sesudah pemilik menyetujui v1.1. Usulan ini
> belum menjadi silabus.

> **DRAF — belum disetujui pemilik.** Dokumen ini adalah konten karangan
> menurut [ADR-0007](../../architecture/adr/0007-authored-learning-content.md):
> usulan dan penilaian penyusun, bukan transkripsi sumber resmi dan bukan
> keputusan. Silabus [v1.0](silabus.md) tetap berlaku sampai pemilik
> menyetujui revisi v1.1. Pilihan panjang blok (bagian 4) adalah hak
> pemilik. Penyusun tidak mencatat persetujuan atas nama pemilik.

## 0. Cara membaca dokumen ini

- `[asumsi]` berarti keputusan perancangan penyusun, bukan data resmi.
- Kode butir CP (mis. `E-BK-e`) dipakai persis seperti di
  [silabus.md bagian 1.4](silabus.md); dokumen ini tidak membuat kode
  butir baru. Kutipan CP di bagian 3 disalin dari silabus bagian 1.3
  (yang bersumber dari *Panduan Mata Pelajaran Informatika, Fase D – F*,
  BSKAP, 2025, dicek 2026-11-18).
- Kode minggu usulan: `FND-X1-M<n>` untuk minggu fondasi `[asumsi]`;
  kode minggu lain mengikuti silabus (`A-X1-M3`, dan seterusnya).
- Satu pertemuan = 3 JP x 45 menit per minggu (silabus bagian 2,
  ditetapkan pemilik 2026-11-18).

## 1. Latar

Pemeriksaan 2026-11-18 menemukan bahwa repositori belum memuat materi
informatika dasar (perangkat keras, perangkat lunak dan sistem operasi,
jaringan, keamanan, representasi data). Silabus v1.0 hanya memberi satu
minggu pengantar per jalur (`A-X1-M1`, `B-X1-M1`) dan hanya jalur B yang
menyentuh kata sandi, privasi, dan lisensi (`B-X2-M9`, `B-X2-M10`).

**Keputusan pemilik (2026-11-18, dialog pilihan, issue #86):** disediakan
**modul fondasi wajib di kelas X, sebelum jalur dimulai**. Blok ini berlaku
untuk semua jalur: A dan B (v1.0), serta jalur C (#68) dan D (#84) bila kelak
disetujui. Keputusan ini mengubah rencana mingguan kelas X v1.0, sehingga
perlu silabus v1.1 dan persetujuan ulang pemilik.

Yang diminta dokumen ini hanyalah usulan; panjang blok dan perubahan pada
minggu A-X1/B-X1 belum diputuskan.

## 2. Topik fondasi

Paket penuh enam minggu. Opsi yang lebih pendek (bagian 4) menggabungkan
atau meringkas minggu-minggu ini. Seluruh latihan memakai data sintetis,
akun uji, dan perangkat lab; tidak ada data pribadi siswa (ADR-0004,
silabus bagian 7.3). Setiap minggu `[asumsi]`: sekitar 1 JP konsep dan 2 JP
praktik.

| Minggu | Topik | Tujuan (murid mampu ...) | Keluaran | Latihan |
| --- | --- | --- | --- | --- |
| FND-X1-M1 | Komputer dan perangkat keras; model Input-Proses-Output Von Neumann | menyebut fungsi komponen (CPU, memori, penyimpanan, perangkat masukan dan keluaran, papan induk, catu daya); menjelaskan dan menyimulasikan siklus I-P-O komputer Von Neumann; membaca spesifikasi perangkat | diagram I-P-O beranotasi; lembar spesifikasi komputer lab | simulasi I-P-O tanpa komputer (murid berperan CPU, memori, dan perangkat masukan/keluaran menjalankan kartu instruksi sederhana); membaca spesifikasi komputer lab lewat informasi sistem; mengenali komponen dari foto atau komponen bekas bila sekolah punya (perangkat yang masih dipakai tidak dibongkar) |
| FND-X1-M2 | Perangkat lunak, sistem operasi, berkas, dan lisensi | membedakan perangkat lunak sistem dan aplikasi; menjelaskan peran sistem operasi (mengelola proses, memori, berkas, perangkat, antarmuka); mengelola berkas dan folder; membedakan jenis lisensi (proprietari, sumber terbuka, domain publik) dan memberi atribusi | peta peran sistem operasi; struktur folder yang rapi; tabel jenis lisensi | melihat daftar proses lewat pengelola tugas (proses sistem tidak dihentikan); menata folder dan penamaan berkas pada akun uji; membaca satu teks lisensi sumber terbuka yang pendek dan mengisi tabel hak dan kewajiban |
| FND-X1-M3 | Representasi data: biner, heksadesimal, teks, gambar sederhana | mengonversi bilangan desimal, biner, dan heksadesimal; menjelaskan bit dan byte; menjelaskan bahwa teks disimpan sebagai kode karakter; menjelaskan gambar sebagai kisi piksel dan warna sebagai komponen merah-hijau-biru | tabel konversi; lembar kode karakter; gambar 8x8 dalam bentuk deret bit | konversi manual dengan lembar kerja; menyandikan kata fiktif dengan tabel kode karakter; menggambar gambar 8x8 hitam-putih di kertas kotak lalu menuliskannya sebagai deret bit; memilih warna dan membaca kode heksadesimalnya di aplikasi gambar |
| FND-X1-M4 | Jaringan dan internet (konsep) | membedakan jaringan lokal dan jaringan luas, kabel dan nirkabel, klien dan server; menyebut peran router, switch, dan titik akses; menjelaskan alamat IP, DNS, dan HTTP/HTTPS secara konseptual; menguraikan bagaimana halaman web sampai ke peramban | peta jaringan sekolah (disederhanakan); diagram alur "membuka halaman web" | permainan peran (klien, server, DNS memakai kartu) untuk satu permintaan halaman; menggambar peta jaringan lab dari penjelasan guru tanpa alamat atau kredensial nyata; melihat alamat IP lokal komputer lab lewat pengaturan sistem |
| FND-X1-M5 | Pengiriman data dan pemecahan masalah jaringan dasar | menjelaskan data dikirim dalam potongan (paket) antarperangkat; mengurutkan diagnosis dari fisik (kabel, Wi-Fi) ke alamat IP, DNS, lalu layanan; memakai alat uji sederhana | diagram alir diagnosis; catatan diagnosis tiga skenario | kartu skenario gangguan sintetis ("kabel lepas", "alamat salah", "DNS tidak menjawab"); `ping` ke gateway lab dan alamat lokal komputer sendiri; berbagi satu berkas antarkomputer di jaringan lab bila guru menyiapkannya; uji ke internet publik hanya bila kebijakan sekolah mengizinkan `[asumsi]` |
| FND-X1-M6 | Keamanan dasar dan etika digital | menyusun kata sandi yang kuat dan memakai manajer kata sandi; menerapkan autentikasi dua langkah secara sederhana; menerapkan konfigurasi privasi dan keamanan pada akun uji; menjelaskan langkah keamanan konektivitas dasar (kata sandi bawaan perangkat jaringan diganti, jaringan nirkabel terenkripsi, kewaspadaan pada jaringan publik, tanda HTTPS); mengenali pesan tipuan (phishing) dasar; menghargai hak atas kekayaan intelektual | lembar periksa keamanan akun; daftar periksa keamanan konektivitas | audit kata sandi dengan bahan sintetis; mengatur akun uji dengan manajer kata sandi lokal bersumber terbuka `[asumsi]`; demonstrasi autentikasi dua langkah oleh guru (murid tidak wajib memasang apa pun di ponsel pribadi); membandingkan dua konfigurasi privasi pada akun uji; mengenali pesan tipuan sintetis |

Catatan perancangan:

- **Berkas dan penyimpanan** digabung ke FND-X1-M2; **etika dan HAKI**
  digabung ke FND-X1-M2 (lisensi) dan FND-X1-M6.
- **Perangkat pengolah dokumen, lembar kerja, dan presentasi** (butir
  E-LD-d) tidak masuk paket penuh; lihat pertanyaan terbuka 3.
- **Tidak ada pemrograman** di blok fondasi `[asumsi]`. Risiko: enam
  minggu tanpa menulis kode dapat terasa jauh dari pilihan jalur; mitigasi
  lewat praktik langsung (simulasi, bongkar-pasang foto, diagnosis) dan
  mulai jalur sesudahnya.
- **Asesmen** `[asumsi]`: formatif tiap minggu (kuis singkat dan lembar
  praktik); tidak ada minggu asesmen sendiri; hasilnya dilebur ke asesmen
  `M14` kelas X semester 1.
- **Praktik realistis di lab sekolah:** tanpa internet pun sebagian besar
  kegiatan berjalan (simulasi peran, kertas, informasi sistem, `ping` ke
  gateway lab); kegiatan yang butuh internet atau perangkat tambahan
  ditandai opsional.

## 3. Pemetaan ke butir CP silabus v1.0

Kutipan di bawah disalin dari silabus bagian 1.3; kode dari bagian 1.4.

| Butir | Kutipan CP | Minggu fondasi | Tingkat |
| --- | --- | --- | --- |
| E-BK-e | "memahami model dan menyimulasikan dinamika Input-Process-Output dalam sebuah komputer Von Neumann, serta memahami peran sistem operasi" | FND-X1-M1 (I-P-O); FND-X1-M2 (sistem operasi) | Tercakup penuh untuk semua jalur (v1.0: hanya satu minggu per jalur). |
| E-LD-e | "memahami konsep dan penerapan serta konfigurasi keamanan dasar untuk konektivitas jaringan data lokal dan internet baik kabel maupun nirkabel" | FND-X1-M4, M5 (konsep jaringan); FND-X1-M6 (keamanan konektivitas) | Tercakup (keluar dari bagian 4.3 silabus). |
| E-LD-k | "menerapkan pengelolaan kata sandi dengan manajer kata sandi, dan menerapkan autentikasi dua langkah secara sederhana" | FND-X1-M6 | Tercakup untuk jalur A dan B (v1.0: hanya B lewat `B-X2-M9`). |
| E-LD-l | "menerapkan konfigurasi privasi dan keamanan pada akun platform digital" | FND-X1-M6 | Tercakup untuk jalur A dan B (v1.0: hanya B). |
| E-LD-g | "menghargai hak atas kekayaan intelektual" | FND-X1-M2 (lisensi); FND-X1-M6 | Tercakup untuk jalur A dan B (v1.0: hanya B lewat `B-X2-M10`). |
| E-LD-d | "memahami pemanfaatan perangkat teknologi yang lebih beragam untuk pengolah dokumen, lembar kerja, dan presentasi" | FND-X1-M2 hanya menyentuh pengelolaan berkas | Sebagian kecil; **tidak** dianggap tercakup. Tetap di #69 kecuali pemilik menambah minggu (pertanyaan terbuka 3). |
| F-BK-d | "mengenali berbagai model jaringan komputer serta mampu melakukan pengiriman data antar perangkat dalam jaringan komputer dan troubleshooting permasalahan jaringan komputer" (Fase F) | FND-X1-M4, M5 sebagai **pengantar** | Pengantar pedagogis `[asumsi]`. Butir Fase F ini tidak dipenuhi di kelas X; `B-XI2-M11` dan #69 tetap diperlukan. |
| F-LD-e | "memahami konsep dan penerapan serta konfigurasi keamanan lanjut untuk konektivitas jaringan data lokal dan internet baik kabel maupun nirkabel" (Fase F) | FND-X1-M6 sebagai pengantar | Pengantar `[asumsi]`; tidak dianggap tercakup. |
| F-LD-d | "merancang kebutuhan sistem komputer sesuai kebutuhan pengguna" (Fase F) | FND-X1-M1 sebagai pengantar (membaca spesifikasi) | Pengantar `[asumsi]`; tidak dianggap tercakup. |

**Representasi data** (FND-X1-M3, biner, heksadesimal, teks, gambar):
rumusan CP yang dikutip silabus tidak menyebutnya secara eksplisit. Topik ini
diusulkan sebagai prasyarat `[asumsi]` untuk memahami komputer Von Neumann
(E-BK-e), tipe data pada `A-X1-M3`, operasi bit pada `A-X2-M12`, dan data
untuk jalur C dan D; ia tidak dihitung sebagai pemenuhan butir CP mana pun.

### 3.1 Butir bagian 4.3 yang menjadi tercakup

Silabus bagian 4.3 mendaftar butir di luar coding: E-LD-b, c, d, e, h, i, j;
F-LD-a, b, c, h, j; F-BK-d (kecuali pengiriman data HTTP pada `B-XI2-M11`).

| Butir 4.3 | Setelah fondasi | Dampak ke modul pendamping (#69) |
| --- | --- | --- |
| E-LD-e | Tercakup oleh FND-X1-M4..M6 | Keluar dari daftar #69. |
| E-LD-d | Belum tercakup (hanya tersentuh) | Tetap di #69, atau keluar bila pemilik menambah satu minggu perangkat produktivitas. |
| F-BK-d | Pengantar saja; Fase F tetap belum | Tetap di #69 (kelas XI/XII); modul pendamping dapat berlandaskan pengantar fondasi. |
| E-LD-b, c, h, i, j | Tidak tersentuh | Tetap di #69. |
| F-LD-a, b, c, h, j | Tidak tersentuh | Tetap di #69. |

Jadi fokus #69 menyempit ke: periksa fakta dan membaca lateral (E-LD-b, c),
profesi dan digitalisasi budaya (E-LD-h, i), konten negatif (E-LD-j), dan
butir Fase F (F-LD-a, b, c, h, j; F-BK-d), ditambah E-LD-d bila tidak
ditambahkan ke fondasi. E-LD-k, l, g tidak ada di bagian 4.3 tetapi kini
juga tercakup untuk jalur A (v1.0: hanya B).

## 4. Opsi panjang blok dan dampak ke kelas X

Keputusan di bagian ini milik pemilik. Semua opsi memakai topik yang sama
(bagian 2) dengan kedalaman berbeda. Ketentuan umum: kelas XI dan XII tidak
berubah di ketiga opsi; blok fondasi bersifat wajib dan sama untuk semua
jalur `[asumsi: dijalankan sebagai kelas bersama lintas jalur]`.

Notasi: "M1+M2" berarti dua minggu v1.0 dilebur menjadi satu minggu.
Seluruh tabel mengikuti 14 minggu materi per semester, kecuali opsi (c).

### 4.1 Opsi (a): 4 minggu fondasi, A-X1/B-X1 dipadatkan

Paket fondasi 4 minggu `[asumsi]`:

| Minggu | Isi |
| --- | --- |
| FND-X1-M1 | Perangkat keras, I-P-O, dan data biner/heksadesimal/teks (gabungan M1 dan sebagian M3 paket penuh) |
| FND-X1-M2 | Perangkat lunak, sistem operasi, berkas, lisensi |
| FND-X1-M3 | Jaringan dan internet, termasuk pengiriman data dan diagnosis dasar (gabungan M4 dan M5) |
| FND-X1-M4 | Keamanan dasar dan etika digital |

Gambar sederhana dipindah ke pengayaan mandiri; kedalaman diagnosis jaringan
berkurang.

Kelas X semester 1 (jalur A dan B memakai pola yang sama):

| Minggu | Isi | A (v1.0) | B (v1.0) |
| --- | --- | --- | --- |
| 1-4 | Fondasi (paket 4 minggu) | | |
| 5 | Lingkungan kerja dan algoritma | M1+M2: lingkungan g++, algoritma, pseudocode | M1+M2: peramban, editor, Bun, Git (tanpa I-P-O yang pindah ke fondasi), pseudocode |
| 6 | Variabel dan masukan/keluaran | M3+M4 | M3+M4 |
| 7 | Percabangan dan logika Boolean | M5+M8 | M5+M8 |
| 8 | Perulangan | M6+M7 | M6+M7 |
| 9 | Fungsi | M9 | M9 |
| 10 | Array satu dimensi | M10 | M10 |
| 11 | String | M11 | M11 (string dan templat) |
| 12 | Array dua dimensi / objek dan JSON | M12 | M12 |
| 13 | Proyek mini | M13 | M13 |
| 14 | Asesmen dan refleksi | M14 | M14 |

Kelas X semester 2: tidak berubah (`A-X2`, `B-X2` v1.0). `B-X2-M9` dan
`B-X2-M10` kini mengulang fondasi dan dapat menjadi pendalaman.

Butir CP: seluruh butir bagian 3 tercakup seperti di atas; butir coding A/B
(E-BK-a sampai E-BK-d) tetap tercakup di kelas X; minggu yang dipadatkan
tetap mencakup setiap topik v1.0, tetapi lebih cepat.

### 4.2 Opsi (b): 6 minggu fondasi, sebagian topik X1 digeser ke X2

Paket fondasi: enam minggu penuh (bagian 2).

Kelas X semester 1 (jalur A dan B):

| Minggu | Isi | A | B |
| --- | --- | --- | --- |
| 1-6 | Fondasi (paket penuh) | | |
| 7 | Lingkungan kerja dan algoritma | M1+M2 | M1+M2 |
| 8 | Variabel dan masukan/keluaran | M3+M4 | M3+M4 |
| 9 | Percabangan dan logika Boolean | M5+M8 | M5+M8 |
| 10 | Perulangan | M6+M7 | M6+M7 |
| 11 | Fungsi | M9 | M9 |
| 12 | Array / array JS | M10 | M10 |
| 13 | Proyek mini | M13 (tabel kecil memakai array satu dimensi `[asumsi]`) | M13 |
| 14 | Asesmen dan refleksi | M14 | M14 |
| digeser | String; array dua dimensi / objek dan JSON | M11, M12 pindah ke awal X2 | M11, M12 pindah ke awal X2 |

Kelas X semester 2, jalur A:

| Minggu | Isi |
| --- | --- |
| 1 | String (dari A-X1-M11) |
| 2 | Array dua dimensi (dari A-X1-M12) |
| 3 | M1+M2: penelusuran galat dan aritmetika dasar |
| 4 | M3: FPB, KPK, bilangan prima |
| 5-10 | M4..M9: `vector`, stack, queue, pencarian, bubble sort, insertion sort |
| 11 | M10: pengantar rekursi |
| 12 | M11: efisiensi intuitif |
| 13 | M13: proyek mini |
| 14 | M14: asesmen dan refleksi |
| dihapus | M12 operasi bit dasar (pengayaan): dipindah ke pengayaan kelas XI atau dihapus (pertanyaan terbuka 5) |

Kelas X semester 2, jalur B:

| Minggu | Isi |
| --- | --- |
| 1 | String dan templat (dari B-X1-M11) |
| 2 | Objek dan JSON (dari B-X1-M12) |
| 3-5 | M1..M3: HTML, CSS, DOM dan peristiwa |
| 6-9 | M4..M7: stack dan queue, pencarian, bubble sort, insertion sort dan visualisasi |
| 10 | M8: data berkualitas |
| 11 | M11: mesin pencari dan dokumentasi |
| 12 | M12: Git dan kolaborasi |
| 13 | M13: proyek mini visualisasi algoritma |
| 14 | M14: asesmen dan refleksi |
| dihapus | M9 (kata sandi, privasi) dan M10 (HAKI, lisensi): sudah tercakup oleh FND-X1-M2 dan M6; lisensi pada proyek tetap muncul di `B-XII1-M11` |

Butir CP: semua butir bagian 3 tercakup. E-BK-a, b, c, d tetap tercakup dalam
Fase E (kelas X), hanya dengan nomor minggu bergeser; E-LD-a, f untuk jalur B
tetap tercakup.

### 4.3 Opsi (c): fondasi memakai 2 minggu cadangan + materi

Paket fondasi 5 minggu `[asumsi]`: FND-X1-M1..M3 sama dengan paket penuh;
jaringan dan pengiriman data/diagnosis (M4+M5 paket penuh) digabung menjadi
satu minggu; keamanan dan etika menjadi minggu kelima. Dua dari lima minggu
mengambil 2 minggu cadangan semester (16 minggu kalender), tiga lainnya
mengambil minggu materi.

Variasi lain: 4 minggu fondasi = 2 cadangan + 2 materi (isi seperti opsi a);
6 minggu fondasi = 2 cadangan + 4 materi.

Kelas X semester 1 (kalender 16 minggu, cadangan nol):

| Minggu | Isi | A dan B |
| --- | --- | --- |
| 1-5 | Fondasi (paket 5 minggu); minggu 4 dan 5 memakai 2 cadangan | |
| 6 | Lingkungan kerja dan algoritma | M1+M2 |
| 7 | Variabel dan masukan/keluaran | M3+M4 |
| 8 | Percabangan dan logika Boolean | M5+M8 |
| 9 | Perulangan I | M6 |
| 10 | Perulangan II | M7 |
| 11 | Fungsi | M9 |
| 12 | Array | M10 |
| 13 | String | M11 |
| 14 | Array dua dimensi / objek dan JSON | M12 |
| 15 | Proyek mini | M13 |
| 16 | Asesmen dan refleksi | M14 |

Kelas X semester 2: tidak berubah. `B-X2-M9` dan `B-X2-M10` dapat menjadi
pendalaman.

Butir CP: seluruh butir bagian 3 tercakup; topik coding v1.0 tetap utuh
kecuali tiga penggabungan; semester tidak punya cadangan untuk libur, ujian
sekolah, atau remedial.

### 4.4 Perbandingan dan rekomendasi

Penilaian 11 kriteria (penilaian penyusun, bukan pengukuran):

| Kriteria | (a) 4 minggu | (b) 6 minggu | (c) 5 minggu, pakai cadangan |
| --- | --- | --- | --- |
| Kelebihan | Perubahan terkecil; semester 2 utuh; cadangan terjaga | Fondasi lengkap dan beban belajar wajar; sekaligus menghilangkan duplikasi `B-X2-M9` dan `B-X2-M10` | Topik coding semester 1 hampir utuh; semester 2 utuh |
| Kekurangan | Empat penggabungan di semester pertama murid pemula; representasi gambar dan diagnosis jaringan diringkas | Mengubah semester 1 dan 2 kedua jalur; operasi bit pengayaan terdorong keluar; perubahan data dan pemetaan paling banyak | Tidak ada cadangan sama sekali; satu libur mendadak merusak jadwal |
| Keamanan (privasi, ADR-0004) | Setara; satu minggu keamanan padat | Setara; waktu cukup untuk praktik akun uji | Setara |
| Performa (beban dan ritme belajar) | Berat di minggu 5-8 | Wajar | Wajar, tanpa penyangga |
| Kemudahan perawatan | Mudah: hanya semester 1 yang berubah (28 baris minggu) | Sedang: semester 1 dan 2, pemetaan 4.1/4.2 dan jembatan OSN ikut berubah | Mudah-sedang: hanya semester 1 |
| Skalabilitas (jalur C, D) | Cukup | Paling baik sebagai prasyarat | Cukup |
| Aksesibilitas (sekolah beragam) | Memadai bagi sekolah dengan lab terbatas | Waktu lebih longgar bagi sekolah dengan jaringan atau perangkat terbatas | Sekolah dengan banyak libur terdampak |
| Dampak SEO | Tidak relevan | Tidak relevan | Tidak relevan |
| UI/UX (pengalaman murid) | Padat dan cepat | Seimbang; 6 minggu tanpa kode dapat membosankan | Seimbang |
| Kompatibilitas dengan v1.0 | Tinggi (semester 2 tetap) | Rendah-sedang (semester 2 berubah) | Tinggi |
| Kompleksitas operasional (kalender) | Rendah | Rendah | Tinggi (cadangan hilang) |
| Implikasi jangka panjang | Fondasi mungkin kurang dalam; menuntut pengayaan | Pondasi paling kuat; menghapus pengayaan bit | Rapuh bila kalender sekolah berubah |

**Keputusan pemilik (2026-11-18): opsi (b) ditambah satu minggu E-LD-d.**

**Rekomendasi penyusun: opsi (b), 6 minggu fondasi**, karena murid kelas X
adalah pemula dan fondasi (terutama jaringan dan keamanan) cukup luas untuk
butuh waktu sendiri; empat penggabungan pada opsi (a) menekan ritme belajar
coding; opsi (c) menghapus cadangan kalender. Harga opsi (b): perubahan data
dan pemetaan terbesar, serta nasib operasi bit pengayaan (pertanyaan terbuka
5). Bila pemilik mengutamakan perubahan minimal, opsi (a) adalah cadangan.
Keputusan ada pada pemilik.

## 5. Bentuk materi

Usulan `[asumsi]`, dikerjakan **setelah** usulan ini disetujui (konten
karangan berstatus `draf`, ADR-0007), satu modul per topik di
`content/sma-coding/modules/<id>.md`, dengan gaya modul OSN
[`content/osn/modules/dasar-pemrograman.md`](../../../content/osn/modules/dasar-pemrograman.md)
sebagai acuan (bagian "Untuk siapa modul ini", penjelasan, contoh, latihan):

| Id modul | Isi | Minggu paket penuh |
| --- | --- | --- |
| `fondasi-komputer-dan-hardware` | Komponen komputer dan model I-P-O | FND-X1-M1 |
| `fondasi-software-dan-sistem-operasi` | Perangkat lunak, OS, berkas, lisensi | FND-X1-M2 |
| `fondasi-representasi-data` | Biner, heksadesimal, teks, gambar | FND-X1-M3 |
| `fondasi-jaringan-dan-internet` | Konsep jaringan; pengiriman data dan diagnosis | FND-X1-M4, M5 |
| `fondasi-keamanan-dasar` | Kata sandi, 2FA, privasi, keamanan konektivitas, etika digital | FND-X1-M6 |

Catatan: (1) modul tidak berisi blok ` ```cpp `; contoh perintah dan diagram
memakai teks agar `check:module-code` tidak relevan; (2) skema indeks
`src/schema/module.ts` saat ini terkait rumpun materi OSN dan nomor minggu
OSN, sehingga untuk `sma-coding` perlu perluasan skema lebih dulu (aturan
repo: skema dulu, lalu data) `[asumsi: dikerjakan di issue terpisah]`; (3)
kode minggu `FND-X1-M<n>` dan konsep "blok bersama lintas jalur" belum ada
di `src/domain/sma-week-codes.ts` dan skema minggu; keduanya perlu perluasan
skema sebelum `data/sma-coding/weeks.json` memuat minggu fondasi.

## 6. Hubungan dengan issue lain

| Issue | Prasyarat dari fondasi |
| --- | --- |
| #69 (modul pendamping literasi digital) | E-LD-e keluar dari daftar; E-LD-d tetap atau pindah ke fondasi bila pemilik memutuskan; modul pendamping dapat mengacu pada keamanan dasar dan konsep jaringan sebagai landasan. Lihat bagian 3.1. |
| #68 (jalur C, IoT) | Perangkat keras dan model I-P-O (perangkat masukan dan keluaran sebagai landasan sensor dan aktuator); biner dan heksadesimal; konsep jaringan dan keamanan konektivitas dasar sebelum perangkat terhubung. Minggu pengantar komputer di jalur C dapat dipangkas. |
| #84 (jalur D, AI) | Representasi data (biner, teks, gambar sebagai bahan data); keamanan dan privasi (data pribadi tidak dipakai, ADR-0004); konsep jaringan sebagai latar layanan dan API; lisensi sebagai latar perangkat dan data terbuka. |

Jalur A dan B (v1.0) menyesuaikan rencana mingguan kelas X sesuai opsi
yang dipilih; jalur C dan D memulai minggu materinya setelah blok fondasi.

## 7. Sumber dan batasan

- Satu-satunya kutipan CP adalah dari silabus v1.0 bagian 1.3 (bersumber dari
  panduan resmi 2025 yang dibuka dan diekstrak 2026-11-18). Dokumen ini tidak
  memverifikasi ulang sumber luar.
- Pengelompokan topik, minggu, kegiatan, dan seluruh opsi adalah rancangan
  penyusun, ditandai `[asumsi]` di tempat yang relevan.
- Dokumen ini tidak merujuk regulasi atau nomor SK baru.
- Nilai JP dan struktur semester mengikuti silabus bagian 2 dan tetap
  `[belum terverifikasi]` sebagai angka resmi kurikulum.
- Rencana belum diuji di kelas.

## 8. Pertanyaan terbuka untuk pemilik

1. **[Terjawab 2026-11-18: opsi (b) + 1 minggu E-LD-d (7 minggu)]** **Panjang blok:** opsi (a) 4 minggu, (b) 6 minggu (rekomendasi), atau (c)
   5 minggu dengan memakai cadangan?
2. **[Terjawab 2026-11-18: kelas bersama lintas jalur sebelum memilih jalur]** **Bentuk pelaksanaan:** apakah blok fondasi dijalankan sebagai kelas
   bersama lintas jalur sebelum murid memilih jalur, atau diajarkan di dalam
   tiap jalur?
3. **[Terjawab 2026-11-18: ditambah satu minggu di fondasi]** **Perangkat pengolah dokumen, lembar kerja, dan presentasi (E-LD-d):**
   ditambah sebagai satu minggu fondasi, atau tetap di modul pendamping
   (#69)?
4. **[Terjawab 2026-11-18: dihapus; slotnya dipakai minggu yang digeser dari semester 1]** **`B-X2-M9` dan `B-X2-M10`:** dihapus karena sudah dicakup fondasi (opsi
   b), atau dipertahankan sebagai pendalaman?
5. **[Terjawab 2026-11-18: pindah ke pengayaan kelas XI]** **Operasi bit dasar (`A-X2-M12`, pengayaan) pada opsi (b):** dipindah ke
   pengayaan kelas XI atau dihapus? Keduanya mengubah jembatan OSN rumpun
   `logika-bitwise`.
6. **[Terjawab 2026-11-18: formatif, dilebur ke M14 kelas X semester 1; tanpa minggu asesmen sendiri]** **Asesmen fondasi:** cukup formatif dan dilebur ke `M14`, atau perlu
   minggu atau penilaian tersendiri?
7. **[Terjawab 2026-11-18: tetap prasyarat; tidak dihitung sebagai pemenuhan butir CP mana pun]** **Representasi data:** dipertahankan sebagai prasyarat walau tidak ada di
   rumusan CP yang dikutip?
8. **[Terjawab 2026-11-18: simulasi peran sebagai jalur utama praktik; komponen bekas dan jaringan lokal terisolasi sebagai opsi bila lab menyediakan]** **Kesiapan lab:** apakah lab sekolah menyediakan komponen bekas dan
   jaringan lokal terisolasi untuk praktik jaringan, atau sebagian kegiatan
   cukup berupa simulasi peran?

## Changelog

| Versi | Tanggal | Perubahan |
| --- | --- | --- |
| v0.3.0 | 2026-11-18 | Mencatat keputusan pemilik untuk pertanyaan 4, 6, 7, dan 8 (semua pertanyaan terjawab); merujuk draf silabus v1.1 (`silabus-v1.1-draf.md`, issue #92) yang menerapkan keputusan. Isi usulan (bagian 1-7) tidak diubah. |
| v0.2.0 | 2026-11-18 | Mencatat empat keputusan pemilik (pertanyaan 1, 2, 3, 5); pertanyaan 4, 6, 7, 8 masih terbuka; penerapan di issue #92. |
| v0.1.0 | 2026-11-18 | Usulan awal (issue #86): topik fondasi per minggu, pemetaan ke kode butir CP silabus v1.0, tiga opsi panjang blok dengan tabel kelas X semester 1 dan 2, bentuk modul, hubungan dengan #68, #69, #84, pertanyaan terbuka. Status DRAF. |
