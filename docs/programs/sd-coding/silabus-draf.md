# Silabus Pembelajaran Coding SD — DRAF v0.1

- **Version:** v0.1.0
- **Last updated:** 2026-11-19
- **Status:** DRAF (issue #128) — **belum disetujui pemilik program**; tidak ada `data/sd-coding/` dan tidak ada entri di `data/programs.json` sampai pemilik menyetujui
- **Changeset:** Draf silabus awal program `sd-coding`: struktur waktu, tujuan, rencana mingguan kelas 1-6, pemetaan ke CP KKA Fase C, jembatan, asesmen, privasi, opsi alat dengan rekomendasi, dan pertanyaan terbuka.

> **DRAF, bukan silabus resmi.** Dokumen ini adalah konten karangan menurut
> [ADR-0007](../../architecture/adr/0007-authored-learning-content.md) yang
> berpijak pada capaian pembelajaran (CP) Koding dan Kecerdasan Artifisial
> (KKA) Fase C. Bukan dokumen Kemendikdasmen. Menurut
> [ADR-0006](../../architecture/adr/0006-multiple-programmes.md) program
> berstatus draf tidak mendapat `data/` maupun entri registri. Agent tidak
> pernah menyetujui atau mencatat persetujuan atas nama pemilik. Fakta
> sumber dan tanggal akses ada di [`riset.md`](riset.md); bagian 1 di bawah
> hanya mengulang yang diperlukan.

## 0. Cara membaca dokumen ini

- `[belum terverifikasi]`: tidak dapat dipastikan dari sumber yang benar-benar
  dibuka penyusun pada 2026-11-19; bukan fakta.
- `[asumsi]`: keputusan perancangan penyusun, bukan data resmi.
- Kode minggu: `SD<kelas>-<semester>-M<n>`, misalnya `SD5-1-M1` (kelas 5,
  semester 1, minggu 1). Kelas 1-6, semester 1 dan 2.
- Kode butir CP buatan penyusun (bagian 4): `C-BK-a`, `C-LD-c`, dan
  seterusnya (huruf C = Fase C). Awalan `P-` (misalnya `P-BK`) berarti
  **pengantar**: kegiatan persiapan menuju butir itu, **tidak dihitung
  sebagai pemenuhan CP**.
- Nama topik kelas 5-6 mengikuti "materi esensial" Fase C persis seperti
  tertulis di sumber (riset bagian 3.3). Topik penguatan, proyek, dan seluruh
  kelas 1-4 adalah rancangan penyusun `[asumsi]`.

## 1. Sumber resmi dan status verifikasi

Tanggal dibuka: **2026-11-19**. Rincian dan keterbatasan akses di
[`riset.md`](riset.md).

### 1.1 Terverifikasi dari teks peraturan (Permendikdasmen 13/2025)

| Butir | Nilai |
| --- | --- |
| Dokumen | Peraturan Menteri Pendidikan Dasar dan Menengah Nomor 13 Tahun 2025, ditetapkan 11 Juli 2025; mengubah Permendikbudristek 12/2024 tentang kurikulum PAUD, dasar, dan menengah. |
| Status KKA | "Mata pelajaran pilihan Koding dan Kecerdasan Artifisial dapat disediakan oleh Satuan Pendidikan sesuai sumber daya yang dimiliki dan dapat dipilih oleh Peserta Didik sesuai minatnya." (Lampiran I, struktur kurikulum SD, butir 7). |
| Mulai | "Pada saat Peraturan Menteri ini mulai berlaku, mata pelajaran pilihan Koding dan Kecerdasan Artifisial diselenggarakan Satuan Pendidikan pada jenjang pendidikan dasar dan jenjang pendidikan menengah mulai tahun ajaran 2025-2026 secara bertahap." (Pasal 32A). |
| Kelas V | 72 JP per tahun; "Dialokasikan 2 (dua) JP per minggu"; 1 tahun = 36 minggu; 1 JP = 35 menit (Tabel 4). |
| Kelas VI | 64 JP per tahun; "Dialokasikan 2 (dua) JP per minggu"; 1 tahun = 32 minggu; 1 JP = 35 menit (Tabel 5). |
| Kelas I-IV | Tidak ada mata pelajaran KKA di tabel (Tabel 1-3); Muatan Lokal "Paling banyak 2 (dua) JP per minggu", dapat berbentuk "teknologi". |
| Informatika | Tidak ada di tabel struktur SD. |

### 1.2 Terverifikasi dari halaman resmi UPT Ditjen GTK (bukan PDF panduan/SK)

Halaman BGTK Kalimantan Timur, "Pelajaran Koding dan Kecerdasan Artifisial
(KA) Fase C (Kelas V dan VI SD/MI)". Kutipan CP di bagian 1.3 disalin dari
halaman itu; kesamaan huruf demi huruf dengan panduan atau SK
`[belum terverifikasi]`.

### 1.3 Kutipan CP Fase C (persis dari halaman itu)

Hanya spasi dan pemenggalan baris yang dinormalkan.

*Berpikir Komputasional* — "Pada akhir Fase C, murid mampu memahami permasalahan sederhana dalam kehidupan sehari-hari, menerapkan pemecahan masalah secara sistematis, serta menuliskan instruksi logis dan terstruktur menggunakan sekumpulan kosakata atau simbol."

*Literasi Digital* — "Pada akhir Fase C, murid mampu memahami konsep dasar, manfaat dan dampak teknologi digital, memahami sistem komputer tingkat pra dasar, menerapkan pengamanan informasi pribadi dalam komunikasi daring, memanfaatkan internet, dan memproduksi serta mendiseminasi konten digital dalam bentuk teks dan gambar."

*Literasi dan Etika Kecerdasan Artifisial* — "Pada akhir Fase C, murid mampu memahami konsep KA sederhana, manfaat dan dampak KA pada kehidupan sehari-hari, prinsip bahwa KA dikembangkan untuk meningkatkan kesejahteraan manusia dan tidak boleh merugikan manusia, mengetahui perbedaan manusia dan komputer dalam melakukan penginderaan, dan mengetahui perbedaan antara mesin cerdas dan mesin non-cerdas. Memahami etika dasar penggunaan KA seperti empati dan tidak menyakiti orang lain."

*Pemanfaatan dan Pengembangan Kecerdasan Artifisial* — "Pada akhir Fase C, murid mampu mensimulasikan secara sederhana kerja KA saat mengenali pola, mengklasifikasi benda konkret berdasarkan sifatnya, dan mengetahui bagaimana prediksi sistem KA dipengaruhi input benda konkret."

Catatan dari halaman yang sama: "Semua elemen harus dicakup dalam pembelajaran sesuai Capaian Pembelajaran (CP), namun beban belajar (JP) yang dialokasi pada setiap elemen pada mata pelajaran Koding dan KA tidak harus sama."

### 1.4 Belum terverifikasi

| Butir | Status |
| --- | --- |
| SK induk CP KKA (kemungkinan Keputusan Kepala BSKAP 046/H/KR/2025) | `[belum terverifikasi]`; tidak ada salinan resmi yang terbuka. |
| PDF *Panduan Mata Pelajaran Koding dan Kecerdasan Artifisial* | `[belum terverifikasi]`; tidak terbuka. |
| Penerapan nyata di sekolah | Tidak diperiksa. |

## 2. Struktur program dan asumsi

Tiga tahap, satu program (`sd-coding`):

| Tahap | Kelas | Fase / status resmi | Peran | Jam per minggu `[asumsi]` | Cara penyelenggaraan `[asumsi]` |
| --- | --- | --- | --- | --- | --- |
| 1. Pengenalan | 1, 2, 3 | Di luar struktur KKA (tidak ada mapel KKA di Tabel 1-3) | Pengenalan opsional, tanpa layar | 1 JP (35 menit) | Muatan lokal "teknologi", kokurikuler, ekstrakurikuler, atau terintegrasi ke mapel lain; keputusan sekolah. |
| 2. Pengantar lanjutan | 4 | Di luar struktur KKA (Tabel 3) | Jembatan ke Fase C; tetap opsional | 1 JP (35 menit) | Sama dengan tahap 1. |
| 3. Inti KKA | 5, 6 | Fase C; mapel pilihan resmi | Memenuhi CP Fase C | **2 JP (70 menit)**, sesuai peraturan | Mata pelajaran pilihan KKA bila sekolah menyediakannya. |

| Butir | Nilai | Status |
| --- | --- | --- |
| Pertemuan | Kelas 1-4: satu pertemuan 1 JP; kelas 5-6: satu pertemuan 2 JP (atau dua pertemuan 1 JP) per minggu | JP kelas 5-6 terverifikasi; sisanya `[asumsi]` |
| Semester | Dua per kelas | `[asumsi]` |
| Minggu materi per semester | 14 minggu (M1-M14) | `[asumsi]` |
| Minggu cadangan | Kelas 1-5: tersedia 36 minggu per tahun, 28 terpakai, 8 cadangan; kelas 6: 32 minggu, 28 terpakai, 4 cadangan (libur, ujian, remedial) | Asumsi minggu per tahun terverifikasi (Tabel 1-5); pembagian `[asumsi]` |
| Pola semester | M1-M12 materi dan penguatan; M13 proyek mini; M14 asesmen dan refleksi | `[asumsi]` |
| Beban JP kelas 5-6 | Kelas 5: 28 minggu x 2 JP = 56 dari 72 JP; kelas 6: 28 x 2 = 56 dari 64 JP | Hitungan dari asumsi di atas |
| Pemilihan | Murid kelas 5-6 memilih KKA bila sekolah menyediakannya (pilihan resmi); kelas 1-4 sepenuhnya kebijakan sekolah | Pilihan: terverifikasi; sisanya `[asumsi]` |
| Perangkat | Tidak wajib ada komputer satu pun untuk menyelesaikan seluruh silabus (bagian 12) | Rancangan penyusun |

Prinsip rancangan: (1) kelas 5-6 mengikuti materi esensial Fase C dan
urutannya per kelas; (2) semester ganjil memuat Berpikir Komputasional dan
Literasi Digital, semester genap memuat Literasi dan Etika KA serta
Pemanfaatan dan Pengembangan KA, supaya empat elemen tercakup tanpa semester
yang terlalu padat `[asumsi]`; (3) panduan resmi menekankan "unplugged dan
berbasis permainan" di SD, jadi seluruh kegiatan inti dirancang tanpa layar,
dengan perangkat sebagai opsi (bagian 11); (4) kelas 1-4 menyiapkan
kosakata dan kebiasaan berpikir yang dipakai Fase C, tanpa menambah beban
kognitif yang melampaui usia `[asumsi]`.

## 3. Tujuan

Tujuan program `[asumsi]`, diturunkan dari CP dan tujuan umum KKA:

1. Murid terbiasa memecah masalah sehari-hari menjadi langkah dan menuliskan
   instruksi yang jelas dengan kosakata atau simbol yang disepakati.
2. Murid memahami, dengan contoh benda nyata, apa itu mesin cerdas dan bukan,
   serta bahwa KA belajar dari data dan bisa keliru.
3. Murid menjaga informasi pribadinya dan bersikap baik di ruang digital.
4. Murid bersikap kritis dan beretika terhadap KA: empati, tidak menyakiti,
   KA untuk kesejahteraan manusia.
5. Murid menyelesaikan proyek kecil secara berkelompok dan menyampaikannya.
6. Guru kelas, bukan hanya guru informatika, dapat mengajarkannya (sasaran
   pelatihan resmi mencakup guru kelas, riset bagian 2.3).

Bukan tujuan: menulis kode dalam bahasa pemrograman teks, menyiapkan murid
SD untuk lomba, atau memakai layanan KA daring.

## 4. Pemetaan CP: kode butir buatan penyusun

Pemenggalan butir (a, b, c, ...) dilakukan penyusun pada tanda koma; kata
CP tidak diubah. Singkatan elemen: BK = Berpikir Komputasional, LD =
Literasi Digital, LE = Literasi dan Etika KA, PP = Pemanfaatan dan
Pengembangan KA.

| Kode | Potongan CP (persis) |
| --- | --- |
| C-BK-a | "memahami permasalahan sederhana dalam kehidupan sehari-hari" |
| C-BK-b | "menerapkan pemecahan masalah secara sistematis" |
| C-BK-c | "menuliskan instruksi logis dan terstruktur menggunakan sekumpulan kosakata atau simbol" |
| C-LD-a | "memahami konsep dasar, manfaat dan dampak teknologi digital" |
| C-LD-b | "memahami sistem komputer tingkat pra dasar" |
| C-LD-c | "menerapkan pengamanan informasi pribadi dalam komunikasi daring" |
| C-LD-d | "memanfaatkan internet" |
| C-LD-e | "memproduksi serta mendiseminasi konten digital dalam bentuk teks dan gambar" |
| C-LE-a | "memahami konsep KA sederhana, manfaat dan dampak KA pada kehidupan sehari-hari" |
| C-LE-b | "prinsip bahwa KA dikembangkan untuk meningkatkan kesejahteraan manusia dan tidak boleh merugikan manusia" |
| C-LE-c | "mengetahui perbedaan manusia dan komputer dalam melakukan penginderaan" |
| C-LE-d | "mengetahui perbedaan antara mesin cerdas dan mesin non-cerdas" |
| C-LE-e | "Memahami etika dasar penggunaan KA seperti empati dan tidak menyakiti orang lain" |
| C-PP-a | "mensimulasikan secara sederhana kerja KA saat mengenali pola" |
| C-PP-b | "mengklasifikasi benda konkret berdasarkan sifatnya" |
| C-PP-c | "mengetahui bagaimana prediksi sistem KA dipengaruhi input benda konkret" |

Total 16 butir buatan. Butir `C-LE-b` tanpa kata kerja di sumber (kalimat
berantai dari "memahami"); ia dibaca sebagai bagian dari "murid mampu
memahami ... prinsip bahwa ...".

## 5. Rencana mingguan

Format tabel: kode, topik, butir CP (atau `P-` pengantar), keluaran dan
latihan. Semua kegiatan tanpa layar kecuali ditandai `[opsi layar]`.
"Kartu" berarti kartu kertas buatan guru atau murid. Seluruh contoh
bersifat sintetis dan tanpa data murid.

### 5.1 Kelas 1 (tahap 1, pengenalan, 1 JP)

**Semester 1**

| Kode | Topik | Butir | Keluaran dan latihan |
| --- | --- | --- | --- |
| SD1-1-M1 | Perintah satu langkah | P-BK | Murid memberi perintah satu langkah pada teman ("robot manusia"). Permainan "ikuti perintah". |
| SD1-1-M2 | Urutan kegiatan sehari-hari | P-BK | Menyusun empat kartu gambar kegiatan pagi hari. |
| SD1-1-M3 | Urutan benar dan salah | P-BK | Menemukan kartu yang tertukar dan memperbaikinya. |
| SD1-1-M4 | Maju, kiri, kanan | P-BK | Bergerak di lantai berpetak mengikuti kartu arah. |
| SD1-1-M5 | Pola warna dan bentuk | P-BK | Melanjutkan pola manik atau kartu warna. |
| SD1-1-M6 | Pola gerak dan bunyi | P-BK | Menirukan dan membuat pola tepuk. |
| SD1-1-M7 | Perintah dengan gambar panah | P-BK | Menggambar jalur dengan panah pada kisi 3x3. |
| SD1-1-M8 | Mengulang | P-BK | "Ulangi dua kali" pada langkah dan tepukan. |
| SD1-1-M9 | Memecah tugas menjadi langkah | P-BK | Menyusun langkah mencuci tangan dengan kartu. |
| SD1-1-M10 | Mencari kesalahan | P-BK | Menemukan langkah yang salah pada petunjuk bergambar. |
| SD1-1-M11 | Benda di sekitar yang memakai listrik | P-LD | Mengelompokkan gambar alat: memakai listrik atau tidak. |
| SD1-1-M12 | Penguatan: permainan rute | P-BK | Rute di kelas dengan kartu arah, bergantian jadi "robot". |
| SD1-1-M13 | Proyek mini: peta harta karun kelas | P-BK | Satu kelompok membuat peta dan petunjuk panah, kelompok lain menjalankannya. |
| SD1-1-M14 | Asesmen dan refleksi | P-BK | Observasi guru; murid menggambar "aku sudah bisa ...". |

**Semester 2**

| Kode | Topik | Butir | Keluaran dan latihan |
| --- | --- | --- | --- |
| SD1-2-M1 | Mengelompokkan menurut warna | P-PP | Mengelompokkan benda atau kartu menurut warna. |
| SD1-2-M2 | Mengelompokkan menurut dua sifat | P-PP | Warna dan bentuk pada dua lingkaran sortir. |
| SD1-2-M3 | Menamai kelompok | P-PP | Teman menebak aturan kelompok yang dibuat murid. |
| SD1-2-M4 | Alat digital di rumah | P-LD | Mengenali layar, tombol, dan speaker pada gambar. |
| SD1-2-M5 | Bagian alat digital | P-LD | Menamai bagian dari gambar tablet atau telepon. |
| SD1-2-M6 | Panca indera manusia | P-LE | Bermain "tebak benda" dengan mata tertutup, memakai indera lain. |
| SD1-2-M7 | Teman dan perasaan | P-LE | Cerita pendek: bagaimana membuat teman merasa baik. |
| SD1-2-M8 | Rahasia pribadi | P-LD | Kartu cerita: nama lengkap dan alamat tidak diberikan kepada orang asing. |
| SD1-2-M9 | Minta izin orang dewasa | P-LD | Bermain peran: minta izin sebelum memakai alat digital. |
| SD1-2-M10 | Awal-tengah-akhir | P-BK | Menyusun cerita bergambar tiga kartu. |
| SD1-2-M11 | Pengulangan dalam lagu | P-BK | Menandai bagian lagu yang berulang. |
| SD1-2-M12 | Penguatan: kartu sortir | P-PP | Permainan sortir kartu lintas kelompok. |
| SD1-2-M13 | Proyek mini: buku gambar hari-hariku | P-BK | Satu halaman urutan kegiatan sehari. |
| SD1-2-M14 | Asesmen dan refleksi | P-BK | Observasi guru; murid menceritakan satu hal yang dipelajari. |

### 5.2 Kelas 2 (tahap 1, pengenalan, 1 JP)

**Semester 1**

| Kode | Topik | Butir | Keluaran dan latihan |
| --- | --- | --- | --- |
| SD2-1-M1 | Panah pada kisi 4x4 | P-BK | Menuliskan jalur dengan panah. |
| SD2-1-M2 | Program kertas dua langkah | P-BK | Teman menjalankan program kertas milik murid. |
| SD2-1-M3 | Pengulangan "ulangi n kali" | P-BK | Memendekkan jalur dengan tanda ulang. |
| SD2-1-M4 | Pola berulang | P-BK | Menemukan satuan pola yang berulang. |
| SD2-1-M5 | Memecah tugas besar | P-BK | Menyusun langkah-langkah kecil membuat kue gambar. |
| SD2-1-M6 | Menguji instruksi teman | P-BK | Menjalankan instruksi teman dan mencatat langkah yang kurang jelas. |
| SD2-1-M7 | Memperbaiki instruksi | P-BK | Memperbaiki instruksi yang salah pada kisi. |
| SD2-1-M8 | Kartu "jika ... maka ..." | P-BK | Contoh: jika hujan maka payung; permainan kartu. |
| SD2-1-M9 | Dua pilihan dalam permainan jalur | P-BK | Jalur bercabang dengan kartu pilihan. |
| SD2-1-M10 | Kode warna | P-BK | Warna sebagai sandi untuk arah. |
| SD2-1-M11 | Sandi huruf ke angka | P-BK | Menyandikan nama tokoh cerita (tokoh fiktif). |
| SD2-1-M12 | Penguatan: labirin kelas | P-BK | Satu kelompok membuat labirin, kelompok lain menulis jalurnya. |
| SD2-1-M13 | Proyek mini: labirin dan sandi | P-BK | Labirin dengan petunjuk sandi warna. |
| SD2-1-M14 | Asesmen dan refleksi | P-BK | Lembar kerja pendek dan refleksi lisan. |

**Semester 2**

| Kode | Topik | Butir | Keluaran dan latihan |
| --- | --- | --- | --- |
| SD2-2-M1 | Mesin kotak: masukan, proses, keluaran | P-LD | Kardus "mesin" yang mengubah kartu masukan jadi kartu keluaran. |
| SD2-2-M2 | Perangkat masukan dan keluaran | P-LD | Mengelompokkan gambar: papan ketik, layar, pengeras suara. |
| SD2-2-M3 | Siapa yang mengindra? | P-LE | Membandingkan mata manusia dan kamera dari gambar. |
| SD2-2-M4 | Mesin cerdas atau biasa | P-LE | Mengelompokkan kartu gambar (setrika, kipas, robot penyapu). |
| SD2-2-M5 | Kata sandi itu rahasia | P-LD | Cerita: sandi hanya untuk diri dan orang tua; tanpa sandi sungguhan. |
| SD2-2-M6 | Boleh dan tidak dibagikan | P-LD | Kartu informasi: dua kotak sortir. |
| SD2-2-M7 | Mengurutkan menurut ukuran | P-PP | Mengurutkan benda dari kecil ke besar. |
| SD2-2-M8 | Mengelompokkan dengan dua aturan | P-PP | Sortir kartu memakai aturan teman. |
| SD2-2-M9 | Menebak kelompok kartu rahasia | P-PP | Menebak sifat kartu tersembunyi dari petunjuk. |
| SD2-2-M10 | Bersikap baik di dunia maya | P-LE | Cerita dan bermain peran tentang kata yang baik. |
| SD2-2-M11 | Teknologi membantu manusia | P-LE | Menggambar satu alat yang membantu keluarga. |
| SD2-2-M12 | Penguatan: sortir cerdas dan biasa | P-LE | Permainan sortir kelas penuh. |
| SD2-2-M13 | Proyek mini: pameran alat cerdas dan biasa | P-LE | Poster gambar kelompok. |
| SD2-2-M14 | Asesmen dan refleksi | P-LE | Lembar kerja pendek dan refleksi lisan. |

### 5.3 Kelas 3 (tahap 1, pengenalan, 1 JP)

**Semester 1**

| Kode | Topik | Butir | Keluaran dan latihan |
| --- | --- | --- | --- |
| SD3-1-M1 | Algoritma sebagai resep atau rute | P-BK | Menuliskan langkah membuat roti isi (gambar). |
| SD3-1-M2 | Algoritma tertulis dengan kosakata terbatas | P-BK | Menuliskan jalur dengan kata: maju, kiri, kanan. |
| SD3-1-M3 | Variabel: kotak berlabel | P-BK | Kotak berlabel dan kartu bilangan sebagai wadah nilai. |
| SD3-1-M4 | Percabangan jika-maka-jika tidak | P-BK | Jalur dengan dua pintu dan syarat. |
| SD3-1-M5 | Pengulangan dengan syarat | P-BK | "Ulangi sampai ..." di permainan lantai. |
| SD3-1-M6 | Menggabungkan pengulangan dan percabangan | P-BK | Algoritma kertas untuk permainan jalur. |
| SD3-1-M7 | Mengurutkan kartu bilangan | P-BK | Mengurutkan enam kartu dan menuliskan caranya. |
| SD3-1-M8 | Mencari kartu tersembunyi | P-BK | Membandingkan mencari satu per satu dengan membagi dua. |
| SD3-1-M9 | Menguji dan memperbaiki | P-BK | Menjalankan algoritma teman dan memperbaikinya. |
| SD3-1-M10 | Membandingkan dua algoritma | P-BK | Memilih yang lebih singkat dengan menghitung langkah. |
| SD3-1-M11 | Algoritma untuk "robot" teman | P-BK | Menyusun menara kartu menurut instruksi teman. |
| SD3-1-M12 | Penguatan: lomba rute robot manusia | P-BK | Beberapa rute, satu kelas, tiap kelompok mencatat algoritmanya. |
| SD3-1-M13 | Proyek mini: permainan jalur sendiri | P-BK | Papan jalur dengan aturan tertulis. |
| SD3-1-M14 | Asesmen dan refleksi | P-BK | Lembar kerja dan refleksi. |

**Semester 2**

| Kode | Topik | Butir | Keluaran dan latihan |
| --- | --- | --- | --- |
| SD3-2-M1 | Simbol pengganti kata | P-BK | Menyepakati simbol arah dan membaca teks simbol. |
| SD3-2-M2 | Dua keadaan: nyala dan padam | P-BK | Kartu dua sisi sebagai penanda; pesan sederhana dengan kartu. |
| SD3-2-M3 | Data: tabel sederhana | P-PP | Tabel buah favorit kelas dengan data fiktif. |
| SD3-2-M4 | Diagram gambar | P-PP | Diagram gambar dari tabel M3. |
| SD3-2-M5 | Perangkat dan fungsinya | P-LD | Mencocokkan perangkat dengan fungsi pada kartu. |
| SD3-2-M6 | Pesan lewat kurir | P-LD | Simulasi pesan berantai: pengirim, perantara, penerima. |
| SD3-2-M7 | Mencari informasi, didampingi guru | P-LD | Demonstrasi guru; murid menyusun kata kunci di kertas. |
| SD3-2-M8 | Kata sandi dan privasi | P-LD | Cerita: pesan yang aman dan tidak aman dibagikan. |
| SD3-2-M9 | Ciri mesin cerdas | P-LE | Daftar ciri: belajar dari contoh, memberi respon. |
| SD3-2-M10 | Mesin mengenali pola | P-PP | Kartu pola: "mesin" kotak menebak kelompok. |
| SD3-2-M11 | Sopan dan empati di ruang digital | P-LE | Bermain peran membalas pesan dengan baik. |
| SD3-2-M12 | Penguatan: mesin kotak | P-PP | Murid jadi "mesin" yang mengelompokkan kartu. |
| SD3-2-M13 | Proyek mini: poster aturan aman digital | P-LD | Satu poster kelas. |
| SD3-2-M14 | Asesmen dan refleksi | P-LD | Lembar kerja dan refleksi. |

### 5.4 Kelas 4 (tahap 2, pengantar lanjutan, 1 JP)

**Semester 1**

| Kode | Topik | Butir | Keluaran dan latihan |
| --- | --- | --- | --- |
| SD4-1-M1 | Apa itu berpikir komputasional | P-BK (menuju C-BK-a) | Menyebut masalah sehari-hari dan cara memecahkannya. |
| SD4-1-M2 | Dekomposisi | P-BK (menuju C-BK-b) | Memecah masalah "menyiapkan acara kelas" menjadi bagian. |
| SD4-1-M3 | Mengenali pola dalam masalah | P-BK | Menemukan bagian yang berulang pada dua masalah. |
| SD4-1-M4 | Abstraksi | P-BK | Memilih informasi penting dari denah sekolah. |
| SD4-1-M5 | Algoritma dengan diagram alir | P-BK (menuju C-BK-c) | Menggambar diagram alir dengan simbol yang disepakati kelas. |
| SD4-1-M6 | Percabangan dalam diagram alir | P-BK | Menambah simbol keputusan. |
| SD4-1-M7 | Pengulangan dalam diagram alir | P-BK | Menambah simbol ulang. |
| SD4-1-M8 | Menguji di atas kertas | P-BK | Menjalankan diagram alir dengan beberapa masukan. |
| SD4-1-M9 | Memperbaiki kesalahan | P-BK | Menemukan dan memperbaiki diagram alir yang salah. |
| SD4-1-M10 | Instruksi untuk mesin dengan kosakata terbatas | P-BK (menuju C-BK-c) | Menulis program kertas untuk "mesin" teman memakai enam kata. |
| SD4-1-M11 | Sifat benda dan tabel sifat | P-PP (menuju C-PP-b) | Tabel sifat benda untuk mengelompokkan. |
| SD4-1-M12 | Penguatan: memecahkan masalah sekolah | P-BK | Contoh antrean kantin; kelompok menyusun langkah. |
| SD4-1-M13 | Proyek mini: panduan memecahkan masalah | P-BK | Panduan satu halaman dengan diagram alir. |
| SD4-1-M14 | Asesmen dan refleksi | P-BK | Lembar kerja dan refleksi. |

**Semester 2**

| Kode | Topik | Butir | Keluaran dan latihan |
| --- | --- | --- | --- |
| SD4-2-M1 | Perangkat keras dan perangkat lunak | P-LD (menuju C-LD-b) | Mengelompokkan contoh pada kartu. |
| SD4-2-M2 | Masukan-proses-keluaran dalam keseharian | P-LD | Contoh mesin cuci atau lampu sensor, digambar sebagai kotak. |
| SD4-2-M3 | Informasi pribadi dan alasan melindunginya | P-LD (menuju C-LD-c) | Daftar informasi pribadi, kartu sortir tingkat rahasia. |
| SD4-2-M4 | Kata sandi kuat | P-LD | Cerita aman; tidak ada sandi sungguhan yang ditulis. |
| SD4-2-M5 | Mencari informasi dengan kata kunci | P-LD (menuju C-LD-d) | Guru mendemonstrasikan; murid memilih kata kunci di kertas. |
| SD4-2-M6 | Informasi benar atau keliru | P-LD | Contoh sederhana (tanpa tokoh nyata), tiga pertanyaan cek. |
| SD4-2-M7 | Dampak teknologi: baik dan buruk | P-LD (menuju C-LD-a) | Tabel dua kolom kelompok. |
| SD4-2-M8 | Mesin cerdas dan non-cerdas | P-LE (menuju C-LE-d) | Sortir kartu perangkat. |
| SD4-2-M9 | Bagaimana mesin "melihat" | P-LE (menuju C-LE-c) | Gambar piksel dari kertas kotak: mata dan kamera. |
| SD4-2-M10 | Mengenali pola dengan kartu | P-PP (menuju C-PP-a) | Murid melatih "mesin kartu" dengan contoh. |
| SD4-2-M11 | Empati dan tidak menyakiti | P-LE (menuju C-LE-e) | Kasus cerita: pesan yang menyakiti. |
| SD4-2-M12 | Penguatan: panduan aman untuk adik kelas | P-LD | Susun panduan bergambar. |
| SD4-2-M13 | Proyek mini: poster panduan | P-LD | Satu poster tiap kelompok. |
| SD4-2-M14 | Asesmen dan refleksi, penyambung ke kelas 5 | P-BK, P-LD | Lembar kerja, refleksi, dan daftar "sudah bisa". |

### 5.5 Kelas 5 (tahap 3, Fase C, 2 JP)

Topik bercetak biasa adalah materi esensial Fase C persis; topik
bertanda `[penguatan]` adalah rancangan penyusun.

**Semester 1 (Berpikir Komputasional dan Literasi Digital)**

| Kode | Topik | Butir | Keluaran dan latihan |
| --- | --- | --- | --- |
| SD5-1-M1 | Pengenalan Berpikir Komputasional | C-BK-a | Murid menyebut masalah sehari-hari dan memisahkan "apa yang diminta" dari "apa yang diketahui". Lembar kerja. |
| SD5-1-M2 | Konsep Dasar Berpikir Komputasional | C-BK-a, C-BK-b | Mengenal dekomposisi, pola, abstraksi, dan algoritma (istilah penyusun `[asumsi]`) lewat teka-teki kartu. |
| SD5-1-M3 | Pemecahan Masalah dalam Kehidupan Sehari-hari | C-BK-a, C-BK-b | Menyelesaikan satu masalah kelas (mengatur piket) dengan langkah berurutan. |
| SD5-1-M4 | Pemecahan Masalah Multi-langkah | C-BK-b | Masalah yang memerlukan beberapa langkah bergantung (menyiapkan pameran); diagram langkah. |
| SD5-1-M5 | Proyek Pemecahan Masalah Multi-langkah | C-BK-b | Kelompok memilih masalah sekolah, menguraikan dan menyajikan solusi. |
| SD5-1-M6 | Menuliskan Urutan Instruksi secara Logis | C-BK-c | Menulis instruksi untuk teman yang berperan sebagai "mesin" dengan kosakata terbatas. |
| SD5-1-M7 | Konsep Dasar Teknologi Digital | C-LD-a | Menyebut teknologi digital di sekitar dan manfaatnya; tabel. |
| SD5-1-M8 | Sistem Komputer Tingkat Pra Dasar | C-LD-b | Masukan-proses-keluaran-penyimpanan lewat permainan "komputer manusia". |
| SD5-1-M9 | Keamanan Informasi Pribadi | C-LD-c | Memilah informasi pribadi dan umum; menyusun aturan "jangan bagikan". |
| SD5-1-M10 | Interaksi Aman dan Efektif di Beranda Digital | C-LD-c, C-LD-d | Studi kasus pesan daring; aturan menyapa dan meminta bantuan orang dewasa. |
| SD5-1-M11 | `[penguatan]` Instruksi logis dengan simbol | C-BK-c | Menukar kosakata menjadi simbol dan menjalankan di kisi. |
| SD5-1-M12 | `[penguatan]` Aman di dunia digital: studi kasus | C-LD-c, C-LD-d | Tiga studi kasus fiktif; diskusi dan keputusan kelompok. |
| SD5-1-M13 | Proyek mini: panduan "langkah aman memakai internet" | C-BK-c, C-LD-c | Panduan bergambar untuk kelas 3. |
| SD5-1-M14 | Asesmen dan refleksi | C-BK, C-LD | Kuis, lembar kerja, penilaian sikap. |

**Semester 2 (Literasi dan Etika KA, Pemanfaatan dan Pengembangan KA)**

| Kode | Topik | Butir | Keluaran dan latihan |
| --- | --- | --- | --- |
| SD5-2-M1 | Pengenalan KA | C-LE-a | Murid menyebut contoh KA dari kehidupan; kartu "ini KA atau bukan?". |
| SD5-2-M2 | Perbedaan Manusia dan Komputer dalam Penginderaan | C-LE-c | Tabel: indera manusia dan sensor perangkat, tanpa merekam murid. |
| SD5-2-M3 | Mesin Cerdas versus Mesin Non-Cerdas | C-LE-d | Sortir perangkat (setrika, kipas, dispenser; asisten suara, robot penyapu) dan menyebut ciri. |
| SD5-2-M4 | Manfaat KA dalam Kehidupan Sehari-hari | C-LE-a, C-LE-b | Menyebut manfaat dan satu batas; mengaitkan dengan kesejahteraan manusia. |
| SD5-2-M5 | Konsep Mengenali Pola dan Klasifikasi dalam Situasi Kehidupan | C-PP-a, C-PP-b | Mengelompokkan benda konkret menurut sifat (bentuk, warna, bunyi). |
| SD5-2-M6 | Mengenali Pola dan Klasifikasi oleh KA | C-PP-a, C-PP-b | Aturan pengklasifikasi tertulis; "mesin kotak" menerapkannya. |
| SD5-2-M7 | Simulasi Prediksi Pola dan Klasifikasi Sistem KA | C-PP-a, C-PP-c | Murid menjadi "sistem KA": menebak kelompok kartu baru dari contoh. |
| SD5-2-M8 | Pengaruh Data Input terhadap Hasil Mengenali Pola dan Klasifikasi KA | C-PP-c | Mengubah kartu masukan dan melihat tebakan berubah. |
| SD5-2-M9 | `[penguatan]` Survei mesin di rumah | C-LE-d | Tabel mesin cerdas dan non-cerdas, dikerjakan dari ingatan dan bertanya pada keluarga. |
| SD5-2-M10 | `[penguatan]` Pengklasifikasi kartu | C-PP-b | Murid menuliskan aturan klasifikasi sendiri dan mengujinya. |
| SD5-2-M11 | `[penguatan]` Instruksi untuk mesin yang belajar | C-BK-c, C-PP-a | Menulis instruksi pelatihan "mesin" dengan kartu contoh. |
| SD5-2-M12 | `[penguatan]` KA untuk kesejahteraan | C-LE-b | Diskusi: contoh KA yang membantu dan contoh yang berisiko. |
| SD5-2-M13 | Proyek mini: pameran "mesin kotak" | C-PP-a, C-PP-c | Kelompok mendemonstrasikan pengklasifikasi kartu. |
| SD5-2-M14 | Asesmen dan refleksi | C-LE, C-PP | Kuis, lembar kerja, penilaian sikap. |

### 5.6 Kelas 6 (tahap 3, Fase C, 2 JP)

**Semester 1 (Berpikir Komputasional dan Literasi Digital)**

| Kode | Topik | Butir | Keluaran dan latihan |
| --- | --- | --- | --- |
| SD6-1-M1 | Pemanfaatan Algoritma Sederhana | C-BK-b, C-BK-c | Menulis algoritma tiga hingga lima langkah untuk tugas nyata (menyusun jadwal piket). |
| SD6-1-M2 | Pengenalan Representasi Simbol dalam Instruksi | C-BK-c | Menyepakati simbol, membaca dan menulis instruksi simbol. |
| SD6-1-M3 | Eksperimen dengan Instruksi Logis | C-BK-c | Menguji variasi instruksi dan mencatat hasil. |
| SD6-1-M4 | `[penguatan]` Menguji dan memperbaiki instruksi | C-BK-b, C-BK-c | Menukar instruksi antar kelompok, mencatat dan memperbaiki kesalahan. |
| SD6-1-M5 | Pemanfaatan Internet Secara Aman dan Produktif | C-LD-c, C-LD-d | Guru memandu pencarian; murid menyusun pertanyaan dan kata kunci, memilah sumber. |
| SD6-1-M6 | Dampak Teknologi Digital | C-LD-a | Tabel dampak positif dan negatif; satu sikap kelompok. |
| SD6-1-M7 | Produksi dan Diseminasi Konten Digital Sederhana | C-LD-e | Menyusun teks dan gambar (kertas, atau `[opsi layar]` pengolah dokumen). |
| SD6-1-M8 | Konten Digital Positif | C-LD-e, C-LD-c | Memeriksa konten: sopan, benar, tanpa data pribadi; menyempurnakan karya M7. |
| SD6-1-M9 | `[penguatan]` `[opsi layar]` Instruksi di layar dengan blok | C-BK-c | Hanya bila sekolah menyediakan perangkat (bagian 11); kegiatan setara di kertas tetap tersedia. |
| SD6-1-M10 | `[penguatan]` Lanjutan M9 atau alternatif kertas | C-BK-b, C-BK-c | Menyelesaikan satu tantangan instruksi. |
| SD6-1-M11 | `[penguatan]` Tanda hati-hati di internet | C-LD-c, C-LD-d | Kuis kasus dan diskusi kelas. |
| SD6-1-M12 | `[penguatan]` Panduan konten positif | C-LD-e | Kelompok menyusun panduan untuk teman satu sekolah. |
| SD6-1-M13 | Proyek mini: media kelas (poster atau lembar buletin) | C-LD-e, C-BK-c | Karya dipamerkan di kelas, tanpa unggah. |
| SD6-1-M14 | Asesmen dan refleksi | C-BK, C-LD | Kuis, lembar kerja, penilaian sikap. |

**Semester 2 (Literasi dan Etika KA, Pemanfaatan dan Pengembangan KA)**

| Kode | Topik | Butir | Keluaran dan latihan |
| --- | --- | --- | --- |
| SD6-2-M1 | Cara kerja KA secara sederhana | C-LE-a | Bagan masukan, contoh, aturan, keluaran dengan kartu. |
| SD6-2-M2 | Dampak Kecerdasan Artifisial | C-LE-a, C-LE-b | Tabel dampak positif dan negatif; hubungan dengan kesejahteraan manusia. |
| SD6-2-M3 | Etika Dasar Penggunaan KA | C-LE-b, C-LE-e | Kasus cerita (empati, tidak menyakiti); aturan kelas tentang KA. |
| SD6-2-M4 | Cara KA Belajar dari Data | C-PP-a | Murid melatih "mesin kartu" dengan contoh, lalu mengujinya. |
| SD6-2-M5 | Model Pola dan Klasifikasi Sederhana | C-PP-a, C-PP-b | Menuliskan aturan pengklasifikasi yang diperoleh dari contoh. |
| SD6-2-M6 | Faktor yang Mempengaruhi Prediksi KA | C-PP-c | Mengubah contoh pelatihan yang timpang dan melihat prediksi berubah. |
| SD6-2-M7 | Batasan Sederhana KA | C-PP-c, C-LE-e | Kapan "mesin kartu" keliru; mengapa KA tidak boleh dipercaya begitu saja. |
| SD6-2-M8 | `[penguatan]` Data yang timpang | C-PP-c | Permainan: kelompok sengaja memberi contoh tidak adil, lalu mendiskusikan akibatnya. |
| SD6-2-M9 | `[penguatan]` Mesin cerdas atau bukan: ujian ciri | C-LE-d | Kuis kasus baru. |
| SD6-2-M10 | `[penguatan]` KA dan keselamatan data | C-LD-c, C-LE-e | Mengapa foto dan suara tidak diberikan pada layanan sembarangan. |
| SD6-2-M11 | `[penguatan]` Merancang aturan KA kelas | C-LE-b, C-LE-e | Menyusun lima aturan penggunaan KA yang baik. |
| SD6-2-M12 | `[penguatan]` Persiapan proyek akhir | C-BK-c, C-PP-a | Kelompok merancang proyek. |
| SD6-2-M13 | Proyek akhir: "mesin kartu" dan aturan KA | C-PP-a, C-PP-c, C-LE-e | Demonstrasi "mesin kartu" dengan penjelasan batas dan aturan penggunaan baik. |
| SD6-2-M14 | Asesmen akhir, refleksi, penyambung ke SMP | C-LE, C-PP | Kuis, lembar kerja, penilaian sikap, daftar "sudah bisa" untuk SMP. |

## 6. Pemetaan butir CP ke minggu

Semua 16 butir dipenuhi di kelas 5-6 (kelas 1-4 hanya pengantar).
Hanya minggu bermateri esensial yang dicatat sebagai pemenuhan; minggu
`[penguatan]` memperdalam.

| Butir | Minggu pemenuhan |
| --- | --- |
| C-BK-a | SD5-1-M1, M2, M3 |
| C-BK-b | SD5-1-M2, M3, M4, M5; SD6-1-M1 |
| C-BK-c | SD5-1-M6; SD6-1-M1, M2, M3 |
| C-LD-a | SD5-1-M7; SD6-1-M6 |
| C-LD-b | SD5-1-M8 |
| C-LD-c | SD5-1-M9, M10; SD6-1-M5, M8 |
| C-LD-d | SD5-1-M10; SD6-1-M5 |
| C-LD-e | SD6-1-M7, M8 |
| C-LE-a | SD5-2-M1, M4; SD6-2-M1, M2 |
| C-LE-b | SD5-2-M4; SD6-2-M2, M3 |
| C-LE-c | SD5-2-M2 |
| C-LE-d | SD5-2-M3 |
| C-LE-e | SD6-2-M3 |
| C-PP-a | SD5-2-M5, M6, M7; SD6-2-M4, M5 |
| C-PP-b | SD5-2-M5, M6; SD6-2-M5 |
| C-PP-c | SD5-2-M7, M8; SD6-2-M6, M7 |

Catatan beban: 14 dari 16 butir mulai dipenuhi di kelas 5; hanya C-LD-e dan
C-LE-e baru di kelas 6. Selebihnya kelas 6 adalah pendalaman (sesuai
pembagian materi di sumber: kelas 6 memuat materi lanjutan tiap elemen).

## 7. Jembatan dari TK dan ke SMP

Program `tk-coding` dan `smp-coding` disusun paralel dan **belum ada di
repositori ini**; bagian ini hanya menyatakan kemampuan masuk dan keluaran
yang diharapkan `[asumsi]` dan harus diselaraskan ketika keduanya selesai.

### 7.1 Dari TK (`tk-coding`) ke kelas 1

Prasyarat yang diasumsikan: mengikuti perintah satu atau dua langkah,
mengurutkan tiga kartu gambar, mengelompokkan benda menurut satu sifat,
dan bersikap baik pada teman. Kegiatan kelas 1 semester 1 mengulang
dasar-dasar itu tanpa menganggapnya sudah dikuasai. Bila TK memakai istilah
atau simbol tertentu, kelas 1 menyepakati simbol bersama di awal tahun.

### 7.2 Dari kelas 6 ke SMP (`smp-coding`)

Keluaran yang diharapkan di akhir kelas 6: menulis instruksi logis
dengan simbol, menguji dan memperbaikinya, menjelaskan masukan-proses-keluaran,
menjaga informasi pribadi, membedakan mesin cerdas dan non-cerdas,
menjelaskan bahwa KA belajar dari data dan bisa keliru. Informatika baru
menjadi mata pelajaran di SMP (riset bagian 4), dan panduan kodingka
menyebut SMP mengenalkan pemrograman blok dan konsep KA sederhana (riset
bagian 2.2). Karena itu `sd-coding` **tidak mengajarkan sintaks
pemrograman**; blok visual hanya opsi di kelas 6 (bagian 11). Pertanyaan
terbuka 5 meminta keputusan tentang penyelarasan.

### 7.3 Ke SMA

Jembatan tidak langsung: SD, SMP, lalu program `sma-coding` (jalur A dan
seterusnya). Tidak ada jembatan SD ke SMA di silabus ini.

## 8. Jembatan opsional ke OSN

Hasil: **tidak ada jembatan OSN untuk SD.**

- Program OSN di repositori ini adalah OSN Informatika (silabus operasional
  OSN Informatika 2026) dan korpus `data/osn/`; tidak ada data jenjang SD
  (pencarian di `data/osn`, `README.md`, dan `docs/silabus`: tidak ada
  rujukan jenjang SD).
- Dari ringkasan hasil pencarian, dokumen penetapan peserta OSN SD (2023
  provinsi, 2024 nasional) memuat bidang Matematika dan IPA, tanpa
  Informatika. Dokumen-dokumen itu **tidak terbuka** (domain tidak
  terjangkau), jadi `[belum terverifikasi]`; ringkasan yang sama menyebut
  sesi IPS sebagai uji coba pada 2025, sehingga daftar bidang SD dapat
  berubah antar tahun.
- Informatika sebagai mata pelajaran tidak ada di SD (riset bagian 4).

Maka silabus ini tidak mengarang jembatan OSN. Kegiatan opsional untuk murid
yang suka berpikir logis (tanpa label OSN): tantangan "teka-teki
algoritma" di akhir semester, dan penguatan konsep pengurutan dan pencarian
di kelas 3 (`SD3-1-M7`, `SD3-1-M8`) yang kelak menjadi dasar topik OSN.
Bila pemilik ingin jembatan resmi ke kompetisi lain, itu perlu riset
sendiri (pertanyaan terbuka 6).

## 9. Asesmen `[asumsi]`

- Dasar dari sumber: "Pelaksanaan asesmen dapat dilakukan melalui lembar
  kerja, kuis, dan penilaian sikap" (halaman BGTK Kaltim).
- Kelas 1-4: **formatif**, observasi guru dan lembar kerja pendek; tanpa nilai
  angka pada rapor `[asumsi]`; refleksi di M14.
- Kelas 5-6: formatif tiap minggu lewat lembar kerja; sumatif di M14 tiap
  semester (kuis dan lembar kerja); proyek mini M13 dinilai rubrik proses
  dan produk (kerja sama, ketepatan, penyampaian); penilaian sikap (empati,
  jujur, bertanggung jawab).
- Rubrik empat tingkat (belum mulai, mulai, berkembang, mahir) per butir
  CP; bobot dan predikat mengikuti kebijakan sekolah `[belum terverifikasi]`.
- **Tidak ada data nilai atau data murid di repositori ini**
  (ADR-0004); contoh rubrik dan lembar selalu kosong atau sintetis.
- Penilaian tidak boleh memakai foto, suara, atau video murid sebagai
  bukti kecuali kebijakan sekolah dan persetujuan orang tua mengizinkan, dan
  itu berada di luar repositori ini.

## 10. Privasi dan etika AI usia SD

### 10.1 Privasi (ADR-0004, UU 27/2022)

- **Tanpa akun pribadi murid** pada layanan apa pun; bila alat daring
  dipakai (bagian 11), hanya akun guru atau akun kelas bernama sintetis,
  dan keputusannya di sekolah.
- Repositori ini tidak menyimpan data murid, nilai, foto, atau suara
  ([ADR-0004](../../architecture/adr/0004-no-learner-personal-data.md));
  semua contoh bersifat sintetis dan tokoh cerita fiktif.
- UU 27/2022 menggolongkan data anak sebagai data pribadi spesifik (Pasal 4
  ayat (2)) dan mewajibkan persetujuan orang tua atau wali untuk memprosesnya
  (Pasal 25 ayat (2)); pengaturan itu urusan sekolah, bukan repositori ini
  (riset bagian 6).
- Tanpa kamera atau mikrofon yang merekam murid; "penginderaan" disimulasikan
  dengan kartu, benda, dan gambar bebas hak.
- Karya murid dibagikan di kelas; tidak diunggah ke komunitas publik.
- Latihan kata sandi memakai cerita; tidak ada kata sandi sungguhan.

### 10.2 Etika AI untuk SD `[asumsi]`

Diturunkan dari CP "etika dasar penggunaan KA seperti empati dan tidak
menyakiti orang lain" dan prinsip KA untuk kesejahteraan manusia:

1. KA adalah alat, bukan teman atau guru; murid tidak diminta berbagi
   rahasia dengannya.
2. KA bisa keliru; jawaban KA diperiksa orang dewasa atau sumber lain.
3. Tidak mengarahkan KA untuk mengejek atau menyakiti orang lain.
4. Foto dan suara orang tidak diberikan kepada layanan sembarangan.
5. Karya sendiri dikerjakan sendiri; menyalin hasil KA tanpa
   memahaminya bukan belajar.
6. Layanan KA percakapan hanya demonstrasi oleh guru, di depan kelas,
   tanpa memasukkan nama atau data murid; batas usia layanan
   `[belum terverifikasi]`, tidak diandalkan.
7. Pembahasan selalu dengan contoh yang sesuai usia; tidak membahas
   konten dewasa, kekerasan, atau topik yang menakutkan.

## 11. Opsi alat, trade-off, dan rekomendasi

Opsi alat untuk kelas 5-6 (kelas 1-4 selalu unplugged). Penilaian 11
kriteria (AGENTS.md aturan 8 dan skill eksekusi-terkelola) singkat; data
alat dari [`riset.md`](riset.md) bagian 5, dan harga tidak diperiksa.

| Kriteria | A. Unplugged saja | B. Unplugged inti + blok visual opsional di kelas 6 | C. Berlayar penuh (blok + perangkat fisik) |
| --- | --- | --- | --- |
| Kelebihan | Selaras panduan resmi (unplugged dan permainan); tanpa biaya perangkat; guru kelas mudah mulai. | Tetap unplugged; murid yang siap mencoba instruksi di layar; kegiatan setara kertas selalu ada. | Pengalaman praktik penuh dengan perangkat. |
| Kekurangan | Tanpa pengalaman layar sebelum SMP; sebagian murid dan orang tua mungkin mengharapkan "coding" berlayar. | Menambah beban guru (pemasangan, pendampingan); tidak merata antar sekolah. | Mahal; guru perlu pelatihan; tidak mungkin untuk sekolah tanpa listrik atau komputer; pelanggaran privasi lebih mungkin. |
| Keamanan dan privasi | Terbaik: tanpa akun dan tanpa data. | Baik bila luring atau akun guru; akun murid tidak dipakai. | Berisiko: akun, layanan daring, data murid. |
| Performa | Tidak relevan. | Komputer sederhana cukup `[belum terverifikasi]`. | Menuntut perangkat dan jaringan. |
| Perawatan | Rendah: kartu dan kertas. | Sedang: pembaruan aplikasi luring. | Tinggi: perangkat, baterai, pembaruan. |
| Skalabilitas | Tinggi. | Sedang. | Rendah. |
| Aksesibilitas | Tinggi, termasuk sekolah tanpa listrik; perlu adaptasi untuk murid dengan keterbatasan motorik atau penglihatan. | Sedang. | Rendah. |
| Dampak SEO | Tidak relevan (konten ini bukan situs publik). | Tidak relevan. | Tidak relevan. |
| UI/UX | Konkret, bergerak, kerja sama. | Campuran. | Layar mudah mengalihkan perhatian. |
| Kompatibilitas | Dengan semua materi guru; salinan lisensi Creative Commons untuk materi tertentu. | Bergantung pada lisensi alat (riset 5). | Bergantung pada beberapa lisensi. |
| Kompleksitas operasional | Rendah. | Sedang. | Tinggi. |
| Implikasi jangka panjang | Fondasi kuat untuk SMP; murid belum berlatih layar. | Seimbang; mudah ditinggalkan bila tidak jalan. | Ketergantungan pada vendor dan biaya berulang. |

**Rekomendasi: opsi B.** Seluruh kegiatan inti tanpa layar; blok visual
(misalnya pemrograman blok luring atau lewat akun guru) hanya di
`SD6-1-M9` dan `M10` bila sekolah punya perangkat, dengan kegiatan kertas
setara selalu tersedia. Robot edukasi tidak direkomendasikan dibeli sebelum
pilot (riset bagian 5). Keputusan akhir ada di pemilik (pertanyaan terbuka 3).

## 12. Kebutuhan lab dan sarana `[asumsi]`

| Tahap | Kebutuhan minimum | Opsional |
| --- | --- | --- |
| Kelas 1-4 | Kartu, kertas, spidol, lantai berpetak (bisa digambar dengan kapur atau selotip), kardus; tanpa listrik. | Proyektor untuk gambar. |
| Kelas 5-6 | Sama; papan tulis; kartu cetak; lembar kerja. | Satu komputer atau proyektor guru untuk demonstrasi M5 kelas 6 dan pengolah dokumen M7. Perangkat murid hanya bila sekolah menyediakan (opsi B). |
| Guru | Pelatihan guru KKA resmi (guru kelas atau guru informatika) atau panduan guru yang disusun kemudian; keputusan terbuka (pertanyaan 7). | |

Sekolah tanpa perangkat: seluruh silabus tetap dapat dijalankan;
kegiatan `[opsi layar]` diganti kegiatan kertas pada baris yang sama.

## 13. Pertanyaan terbuka (opsi dan rekomendasi)

Hanya orchestrator yang menyajikan ke pemilik lewat dialog pilihan.

| No. | Pertanyaan | Opsi | Rekomendasi |
| --- | --- | --- | --- |
| 1 | Sumber CP: halaman UPT belum dibandingkan dengan PDF panduan dan SK. | (a) pemilik menyediakan tautan atau berkas resmi (panduan dan SK 046/H/KR/2025), penyusun memverifikasi dan merevisi; (b) menerima halaman UPT sebagai sumber sementara dan tandai di silabus; (c) menunda silabus sampai tautan resmi tersedia. | (a). Tanpa sumber resmi, status `[belum terverifikasi]` tetap dan korpus tidak bisa dikodekan. |
| 2 | Cakupan kelas. | (a) hanya kelas 5-6 (sesuai KKA); (b) kelas 4-6 (kelas 4 jembatan); (c) kelas 1-6 dengan kelas 1-4 sebagai pengantar opsional (seperti draf ini). | (c). Permintaan pemilik mencakup kelas 1-6; kelas 1-4 ditandai opsional dan di luar CP. |
| 3 | Alat kelas 5-6. | (a) unplugged saja; (b) unplugged inti + blok visual opsional kelas 6; (c) berlayar penuh. | (b). Bagian 11. |
| 4 | Cara kelas 1-4 diselenggarakan. | (a) muatan lokal teknologi; (b) ekstrakurikuler; (c) terintegrasi ke mapel lain; (d) netral, keputusan sekolah. | (d). Silabus ini tidak boleh mengunci keputusan sekolah; (a) layak ditawarkan sebagai contoh karena muatan lokal "teknologi" tercantum di peraturan. |
| 5 | Penyelarasan dengan `tk-coding` dan `smp-coding`. | (a) selaraskan setelah ketiganya berstatus draf; (b) tetapkan kosakata dan simbol bersama lebih dulu; (c) biarkan masing-masing mandiri. | (a), lalu (b) untuk simbol arah dan kosakata instruksi. |
| 6 | Jembatan OSN dan kompetisi. | (a) tidak ada (draf ini); (b) riset kompetisi komputasi tingkat SD bila ada; (c) pengayaan tanpa label. | (a), dengan (c) sudah ada di kelas 3. Mengarang jembatan tidak boleh. |
| 7 | Dukungan guru kelas. | (a) panduan guru dan lembar kerja menjadi modul draf di `content/` kelak; (b) hanya silabus; (c) bergantung pada pelatihan resmi. | (a) kelak, setelah silabus disetujui (ADR-0007: modul berstatus draf). |

Draf ini tidak mengusulkan `data/sd-coding/` maupun entri registri; itu
baru dipertimbangkan setelah pemilik menyetujui silabus (ADR-0006).

## 14. Sumber dan batasan

- Sumber yang dibuka dan tanggalnya: [`riset.md`](riset.md) bagian 1 dan 8.
- CP Fase C dikutip dari halaman UPT Ditjen GTK, bukan PDF atau SK
  (bagian 1.2).
- Rencana mingguan adalah rancangan penyusun, belum diuji di kelas, belum
  ditinjau guru kelas atau pemilik; semua `[asumsi]`.
- Kelas 1-4 di luar struktur kurikulum resmi KKA dan di luar CP; bukan
  pemenuhan CP.
- JP, minggu efektif, dan semester untuk kelas 1-4 `[asumsi]`; angka kelas
  5-6 dari Tabel 4 dan 5 peraturan.
- Istilah "dekomposisi", "pola", "abstraksi", "algoritma" di SD5-1-M2 dan
  seterusnya adalah penjabaran penyusun, bukan kutipan sumber.
- Tidak ada alat atau merek yang dinilai terbaik atau dipromosikan;
  harga dan spesifikasi tidak diperiksa.
- Silabus ini tidak menyatakan sekolah wajib menyediakan KKA; sifatnya
  pilihan.

## Changelog

| Versi | Tanggal | Perubahan |
| --- | --- | --- |
| v0.1.0 | 2026-11-19 | Draf awal (issue #128), status DRAF. |
