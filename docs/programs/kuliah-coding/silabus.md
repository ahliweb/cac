# Silabus Pembelajaran Coding Perguruan Tinggi — v1.1

- **Version:** v1.1.0
- **Last updated:** 2026-11-19
- **Status:** DISETUJUI pemilik program. v1.0 disetujui 2026-11-19 (issue #130) beserta seluruh rekomendasi penyusun atas pertanyaan terbuka (bagian 9); revisi v1.1 (rekayasa perangkat lunak berbantuan AI, usulan U-09 sampai U-12) disetujui lewat keputusan pemilik 2026-11-19 (issue #139, bagian 9.1). Menjadi sumber corpus program `kuliah-coding` (ADR-0006, ADR-0008).
- **Changeset:** v1.1 (issue #139): pokok bahasan AI diperluas di KUL-U-202; rekayasa perangkat lunak berbantuan AI diintegrasikan di KUL-I-204, KUL-I-401, KUL-I-301, KUL-I-305, dan KUL-I-303 tanpa menambah SKS; kebijakan AI tiga tingkat diperkuat dengan log pemakaian, wawancara kode, ujian praktik tanpa AI, dan gerbang kesiapan (bagian 6.3 dan 6.4); jalur K Merah saat kontes; glosarium istilah (bagian 6.5). Jumlah mata kuliah dan SKS tidak berubah. Sebelumnya, v1.0: Silabus v1.0 disetujui pemilik: tiga jalur (U, I, K), 24 mata kuliah dalam SKS dan semester, pemetaan ke 17 knowledge area CS2023, kolom CPL tetap isian program studi pengadopsi, jembatan dari SMA dan ke dunia kerja, kebijakan AI tiga tingkat, dan keputusan pemilik 2026-11-19 atas pertanyaan terbuka (opsi rekomendasi); isi rencana tidak berubah dari draf v0.1.

> **Disetujui pemilik program pada 2026-11-19** (keputusan lewat dialog
> pilihan, dicatat di issue #130 dan di bagian 9). Dokumen ini konten
> **karangan** menurut
> [ADR-0007](../../architecture/adr/0007-authored-learning-content.md): bukan
> dokumen pemerintah, bukan kurikulum program studi mana pun, dan bukan materi
> resmi Puspresnas, IA TOKI, ACM, IEEE, atau penyelenggara ICPC. Seluruh
> capaian pembelajaran mata kuliah (CPMK), topik, dan pembagian SKS adalah
> **rancangan penyusun yang kini disetujui**; persetujuan tidak mengubah
> sifatnya sebagai karangan. Butir `[belum terverifikasi]` tetap belum
> terverifikasi dan butir `[asumsi]` tetap rancangan penyusun. Dasar sumber ada
> di [`riset.md`](riset.md).

## 0. Cara membaca dokumen ini

- `[belum terverifikasi]`: tidak dapat dipastikan dari sumber yang dibuka
  penyusun pada 2026-11-19 (lihat `riset.md`). Bukan fakta.
- `[asumsi]`: keputusan perancangan penyusun, bukan data resmi.
- `[karangan]`: rumusan ditulis penyusun (CPMK, topik, tugas); tidak dikutip
  dari sumber mana pun.
- **Kode mata kuliah:** `KUL-<jalur>-<tingkat><nn>`; jalur `U` (umum), `I`
  (informatika), `K` (kompetitif); digit pertama angka ratusan adalah tingkat
  tahun (1 = tahun pertama, 2 = kedua, 3 = ketiga, 4 = keempat), dua digit
  berikutnya nomor urut. Contoh `KUL-U-101`.
- **Kode CPMK:** `<kode MK>-C<n>` , mis. `KUL-U-101-C1` `[karangan]`.
- **SKS:** satuan kredit semester; 1 SKS setara 45 jam per semester
  (Permendiktisaintek 39/2025 Pasal 15 ayat (6), terverifikasi). Contoh:
  3 SKS = 135 jam per semester.
- **Semester:** `S1` sampai `S8` untuk program sarjana yang dirancang 8
  semester (Pasal 18 ayat (1), terverifikasi).
- Draf ini **tidak menggantikan** kurikulum program studi. CPL dirumuskan
  oleh unit pengelola program studi (Pasal 8 ayat (1)); draf hanya
  menyediakan paket mata kuliah yang dapat diadopsi (bagian 2.4).

## 1. Tujuan dan asas rancangan

Tujuan `[karangan]`: menyediakan jalur pembelajaran coding untuk mahasiswa
Indonesia pada tiga kebutuhan, dari yang paling luas ke yang paling khusus.

1. **Jalur U**: mahasiswa semua program studi memperoleh literasi
   komputasi yang dapat dipakai di bidangnya (berpikir komputasional,
   Python dan analisis data, otomasi, literasi AI).
2. **Jalur I**: mahasiswa informatika/ilmu komputer memperoleh inti
   pemrograman dan rekayasa perangkat lunak yang selaras dengan knowledge area
   CS2023.
3. **Jalur K**: mahasiswa yang berminat berkompetisi (ICPC) melanjutkan
   pembinaan algoritmik dari OSN dan sma-coding jalur A.

Asas: (a) proyek dan portofolio dinilai, bukan hafalan; (b) tiap mata kuliah
punya CPMK yang dapat diukur; (c) kode dikerjakan di perangkat dan repositori
mahasiswa sendiri, tanpa data pribadi di repositori ini (bagian 8);
(d) integritas akademik dijaga lewat desain tugas, bukan hanya larangan
(bagian 6).

## 2. Struktur dan rekomendasi pembagian jalur

### 2.1 Opsi pembagian jalur

| Opsi | Isi | Kelebihan | Kekurangan |
| --- | --- | --- | --- |
| A. Tiga jalur (U, I, K) | Seperti bagian 1 | Sesuai tiga populasi nyata; U bisa dipakai lintas prodi; K meneruskan OSN | Tiga set dokumen yang dirawat; jalur I besar |
| B. Dua jalur (U dan I) | K menjadi kegiatan ekstrakurikuler tanpa SKS | Lebih ramping | Jembatan OSN ke kuliah tidak punya bentuk SKS; K tidak diakui sebagai beban belajar |
| C. Satu jalur I saja | Hanya informatika | Paling mudah dirawat | Tidak menjawab mahasiswa non-informatika (populasi terbesar) |

**Rekomendasi penyusun: opsi A**, dengan U dan K kecil (14 dan 6 SKS) dan I
sebagai paket inti yang dapat diadopsi sebagian (bagian 2.4).
Dipilih pemilik pada 2026-11-19 (bagian 9, nomor 1).

### 2.2 Ringkasan jalur

| Jalur | Sasaran | Mata kuliah | SKS | Rentang semester |
| --- | --- | --- | --- | --- |
| U | Semua program studi; mata kuliah pilihan atau umum `[asumsi]` | 5 | 14 | S1-S6 |
| I | Informatika / ilmu komputer | 16 (14 inti + 2 pilihan) | 46 (inti 42) | S1-S7 |
| K | Peminat kompetisi, lanjutan OSN | 3 | 6 | S3-S7 |
| **Jumlah** | | 24 | 66 (inti 62) | |

Jumlah SKS inti jalur I (42, tanpa dua mata kuliah pilihan 306 dan 307) sekitar
29 persen dari beban minimum sarjana 144 SKS `[asumsi: paket coding bukan
seluruh kurikulum]`. Pemilik dapat mengadopsi paket sebagian (bagian 2.4).

### 2.3 Batas beban dan pola semester

- Beban semester satu dan dua paling banyak 20 SKS dan semester tiga dan
  seterusnya paling banyak 24 SKS (Pasal 18 ayat (2), terverifikasi);
  mata kuliah draf ini harus muat di bawah batas itu bersama mata kuliah
  prodi, sehingga satu semester jalur I memuat paling banyak 10 SKS
  `[asumsi]`.
- Pola 16 minggu per semester (14 pertemuan, ujian tengah dan akhir)
  `[asumsi]`; tidak ditemukan pada pasal yang dibaca.
- Pembagian beban per SKS `[asumsi]`: sepertiga belajar terbimbing
  (kuliah/praktikum), sepertiga penugasan terstruktur, sepertiga mandiri,
  mengikuti tiga bentuk di Pasal 16 ayat (2).
- Mode tatap muka, daring, atau campuran diizinkan (Pasal 14 ayat (3));
  praktikum coding dirancang agar dapat dikerjakan daring `[asumsi]`.

### 2.4 Cara mengadopsi

| Bentuk adopsi | Dasar | Catatan |
| --- | --- | --- |
| Mata kuliah pilihan/umum program studi | Mata kuliah masuk kurikulum prodi dengan CPL prodi (Pasal 8 ayat (4) dan (5)) | Prodi mengisi kolom CPL (bagian 4.1). |
| Pembelajaran di luar program studi | Pasal 16 ayat (4) dan Pasal 18 ayat (4) | Jalur U dan K cocok sebagai paket lintas prodi; durasi dan beban ditetapkan perguruan tinggi (Pasal 18 ayat (6)). |
| Rekognisi pembelajaran lampau | Pasal 14 ayat (3) huruf c | Dari sma-coding atau pengalaman kerja; tata cara `[belum terverifikasi]`. |

## 3. Rencana per mata kuliah

Format tiap mata kuliah: kode, nama, SKS, semester, prasyarat, CPMK
`[karangan]`, pokok bahasan `[karangan]`, bentuk asesmen, pemetaan KA CS2023
(tingkat KA saja; lihat bagian 4.2). Semua isi di bagian ini `[karangan]`.

### 3.1 Jalur U: coding untuk semua program studi

| Kode | Nama | SKS | Smt | Prasyarat |
| --- | --- | --- | --- | --- |
| KUL-U-101 | Berpikir Komputasional dan Dasar Pemrograman | 3 | S1 | tidak ada |
| KUL-U-102 | Analisis Data dengan Python | 3 | S2 | KUL-U-101 |
| KUL-U-201 | Otomasi Kerja dan Skrip | 3 | S3 | KUL-U-101 |
| KUL-U-202 | Literasi, Etika, dan Keamanan AI | 2 | S4 | tidak ada |
| KUL-U-301 | Proyek Komputasi Lintas Disiplin | 3 | S6 | KUL-U-102 atau KUL-U-201 |

**KUL-U-101 Berpikir Komputasional dan Dasar Pemrograman (3 SKS)**

- CPMK: C1 menguraikan masalah menjadi langkah (dekomposisi, pola,
  abstraksi, algoritma); C2 menulis program Python dengan variabel,
  percabangan, perulangan, fungsi, dan koleksi; C3 menguji dan memperbaiki
  program dengan kasus uji sederhana; C4 menyimpan dan membagikan kode dengan
  Git.
- Pokok bahasan: berpikir komputasional; Python dasar; struktur data bawaan
  (list, dict, set); berkas teks dan CSV; modul dan pustaka standar;
  pengujian dasar; Git dasar.
- Asesmen: kuis mingguan, tiga tugas pemrograman, proyek kecil di bidang
  prodi mahasiswa, ujian praktik tanpa AI.
- KA CS2023: SDF, AL (pengantar).

**KUL-U-102 Analisis Data dengan Python (3 SKS)**

- CPMK: C1 memuat, membersihkan, dan memeriksa data tabular; C2 menghitung
  statistik deskriptif dan membuat visualisasi; C3 menyusun alur analisis yang
  dapat diulang (notebook); C4 menafsirkan hasil dan menyebut keterbatasan data.
- Pokok bahasan: tabel data; pembersihan; ringkasan statistik; grafik;
  notebook; sumber data terbuka; kualitas dan bias data.
- Asesmen: dua laporan analisis atas data terbuka (bukan data pribadi),
  presentasi singkat.
- KA CS2023: DM, MSF (statistik dasar), SDF.

**KUL-U-201 Otomasi Kerja dan Skrip (3 SKS)**

- CPMK: C1 mengotomasi tugas berulang (berkas, teks, surel/dokumen) dengan
  skrip; C2 memakai API publik dan format data JSON; C3 menjadwalkan dan
  mencatat (log) eksekusi; C4 menilai risiko keamanan skrip (kredensial,
  izin).
- Pokok bahasan: pengolahan berkas; ekspresi reguler dasar; permintaan HTTP dan
  JSON; penjadwalan; pengelolaan rahasia (kunci API tidak masuk repositori);
  etika dan hukum otomasi.
- Asesmen: tiga skrip otomasi dengan dokumentasi, proyek akhir otomasi alur
  kerja nyata (data sintetis).
- KA CS2023: SDF, SEC (dasar), NC (dasar).

**KUL-U-202 Literasi, Etika, dan Keamanan AI (2 SKS)**

- CPMK: C1 menjelaskan cara kerja sistem AI generatif secara konseptual dan
  keterbatasannya; C2 menilai keluaran AI (verifikasi, bias, halusinasi);
  C3 memakai asisten AI secara bertanggung jawab dan mengungkapkan
  pemakaiannya; C4 menguraikan risiko privasi dan hak cipta; C5 memverifikasi
  keluaran AI dengan uji dan mencatat alat, versi, dan perintah yang dipakai.
- Pokok bahasan: pembelajaran mesin secara konseptual; model bahasa;
  rekayasa perintah (prompt) dan evaluasi; verifikasi keluaran dengan uji;
  keluaran yang dapat berbeda untuk perintah yang sama (non-determinisme);
  privasi dan pelindungan data pribadi (data pribadi, kata sandi, dan kunci
  tidak dimasukkan ke layanan AI); hak cipta dan lisensi keluaran AI (status
  hukum masih berkembang); energi dan biaya komputasi sekilas (angka
  bervariasi dan tidak pasti); integritas akademik; gerbang kesiapan
  (bagian 6.4); dampak sosial.
- Asesmen: studi kasus evaluasi keluaran AI, refleksi berkas pemakaian AI
  (log), ujian tertulis.
- KA CS2023: AI, SEP, SEC.

**KUL-U-301 Proyek Komputasi Lintas Disiplin (3 SKS)**

- CPMK: C1 merumuskan masalah komputasi di bidang prodi bersama pemangku
  kepentingan; C2 membangun prototipe dengan data sintetis atau terbuka;
  C3 mendokumentasikan, menguji, dan mempresentasikan; C4 bekerja dalam tim
  lintas program studi.
- Pokok bahasan: perumusan masalah; perencanaan proyek; pengembangan
  iteratif; dokumentasi; presentasi; refleksi etika.
- Asesmen: proposal, bukti kemajuan di repositori, demo, laporan, penilaian
  rekan.
- KA CS2023: SDF, SE (dasar), SEP.

### 3.2 Jalur I: informatika / ilmu komputer

| Kode | Nama | SKS | Smt | Prasyarat | KA utama |
| --- | --- | --- | --- | --- | --- |
| KUL-I-101 | Fondasi Pemrograman | 4 | S1 | tidak ada | SDF, FPL |
| KUL-I-102 | Struktur Data | 3 | S2 | KUL-I-101 | SDF, AL |
| KUL-I-103 | Matematika Diskret untuk Komputasi | 3 | S2 | tidak ada | MSF |
| KUL-I-201 | Analisis dan Desain Algoritma | 3 | S3 | KUL-I-102, KUL-I-103 | AL |
| KUL-I-202 | Basis Data | 3 | S3 | KUL-I-102 | DM |
| KUL-I-203 | Organisasi Komputer dan Sistem Operasi | 3 | S4 | KUL-I-101 | AR, OS, SF |
| KUL-I-204 | Rekayasa Perangkat Lunak | 3 | S4 | KUL-I-102 | SE |
| KUL-I-205 | Pengembangan Web | 3 | S4 | KUL-I-202 | SPD |
| KUL-I-301 | Jaringan Komputer dan Keamanan | 3 | S5 | KUL-I-203 | NC, SEC |
| KUL-I-302 | Komputasi Paralel, Terdistribusi, dan Cloud | 3 | S6 | KUL-I-203 | PDC |
| KUL-I-303 | Kecerdasan Buatan dan Pembelajaran Mesin | 3 | S5 | KUL-I-201, statistik | AI |
| KUL-I-304 | Interaksi Manusia-Komputer | 2 | S5 | KUL-I-205 | HCI |
| KUL-I-305 | Profesi, Etika, dan Masyarakat | 2 | S6 | tidak ada | SEP |
| KUL-I-306 | Grafika dan Teknik Interaktif (pilihan) | 2 | S6 | KUL-I-102 | GIT |
| KUL-I-307 | Rekayasa Data dan Pengantar Pembelajaran Mesin Terapan (pilihan) | 2 | S7 | KUL-I-202 | DM, AI |
| KUL-I-401 | Proyek Perangkat Lunak Tim | 4 | S7 | KUL-I-204 | SE, SEP |

Jumlah SKS: 46 bila semua 16 mata kuliah dihitung; inti 42 SKS (14 mata
kuliah) tanpa dua pilihan 4 SKS (306 dan 307). Beban per semester jalur I
paling banyak 10 SKS (S2: 6; S4: 9; S7: 6), di bawah batas Pasal 18 ayat (2).

Ringkasan CPMK dan pokok bahasan jalur I `[karangan]`:

| Kode | CPMK ringkas | Pokok bahasan | Asesmen utama |
| --- | --- | --- | --- |
| KUL-I-101 | C1 menulis program prosedural bertipe statis; C2 memakai fungsi, larik, dan penunjuk/referensi; C3 men-debug dengan alat; C4 memakai Git | variabel dan tipe, alur kendali, fungsi, larik dan string, memori, I/O berkas, pengujian | tugas mingguan, ujian praktik tanpa AI, wawancara kode singkat, proyek kecil |
| KUL-I-102 | C1 menerapkan list, stack, queue, pohon, tabel hash, heap, graf; C2 memilih struktur data menurut kebutuhan; C3 menganalisis biaya operasi | struktur linear, pohon, hash, heap, graf dasar, pengantar kompleksitas | tugas implementasi, wawancara kode singkat, ujian tertulis dan praktik tanpa AI |
| KUL-I-103 | C1 memakai logika, himpunan, relasi; C2 membuktikan dengan induksi; C3 menghitung (kombinatorika); C4 memakai teori graf dan bilangan dasar | logika, bukti, himpunan, hitungan, graf, aritmetika modular | kuis, ujian tertulis |
| KUL-I-201 | C1 merancang algoritma (greedy, divide and conquer, DP); C2 menganalisis kebenaran dan kompleksitas; C3 mengenali masalah sulit | notasi asimtotik, rekurens, DP, graf, pencarian, kelas masalah | tugas rancangan, ujian |
| KUL-I-202 | C1 memodelkan data (ER, relasional); C2 menulis kueri SQL; C3 menerapkan normalisasi, indeks, transaksi | model data, SQL, normalisasi, transaksi, indeks | proyek basis data, ujian praktik |
| KUL-I-203 | C1 menjelaskan arsitektur CPU dan memori; C2 menjelaskan proses, penjadwalan, memori virtual; C3 memakai baris perintah dan sistem berkas | representasi data, assembly dasar, proses dan utas, memori, berkas | laboratorium, ujian |
| KUL-I-204 | C1 mengelola kebutuhan dan rancangan; C2 menerapkan proses iteratif, pengujian, tinjau kode; C3 memakai kendali versi dan CI dalam tim; C4 menerapkan rekayasa perangkat lunak berbantuan AI: menulis spesifikasi dan uji lebih dulu, meninjau dan memverifikasi kode hasil AI, dan mencatat pemakaian AI | proses, UML ringan, pengujian, tinjau kode, CI, pemeliharaan; rekayasa perangkat lunak berbantuan AI selama 3-4 minggu: spesifikasi dan uji lebih dulu, tinjau kode hasil AI, CI dengan analis statis, pengantar SSDF dan SLSA, kebijakan AI tim dan log, pengantar agen kode dengan batas kewenangan dan tinjauan manusia | proyek tim kecil dengan log pemakaian AI dan tinjau kode oleh manusia |
| KUL-I-205 | C1 membangun aplikasi web klien dan peladen; C2 merancang API; C3 mengamankan aplikasi web dasar | HTML/CSS, JS/TS, HTTP, REST, autentikasi dasar, aksesibilitas | proyek web, ujian praktik |
| KUL-I-301 | C1 menjelaskan lapisan protokol; C2 menulis klien-peladen soket; C3 menerapkan praktik keamanan dasar; C4 mengenali risiko rantai pasok perangkat lunak, termasuk paket fiktif yang disarankan kode hasil AI | model lapisan, TCP/IP, soket, kriptografi dasar, ancaman umum, pengantar SSDF, rantai pasok dan pemeriksaan paket sebelum dipasang | laboratorium, ujian |
| KUL-I-302 | C1 menulis program konkuren; C2 menjelaskan sistem terdistribusi dan konsistensi; C3 memanfaatkan layanan cloud | utas, sinkronisasi, model terdistribusi, kontainer, layanan cloud | proyek, laboratorium |
| KUL-I-303 | C1 menerapkan pencarian dan pembelajaran terbimbing; C2 mengevaluasi model; C3 membahas etika dan bias; C4 memperkirakan biaya komputasi dan energi pelatihan dan pemakaian model secara kasar dengan menyebut ketidakpastiannya | pencarian, regresi dan klasifikasi, evaluasi, jaringan saraf dasar, etika, biaya komputasi dan energi (butir singkat; angka bervariasi dan tidak pasti) | proyek, ujian |
| KUL-I-304 | C1 merancang antarmuka berbasis pengguna; C2 mengevaluasi kebergunaan dan aksesibilitas | prinsip rancangan, evaluasi, aksesibilitas | proyek rancangan |
| KUL-I-305 | C1 menalar kasus etika profesi; C2 menjelaskan hak cipta, lisensi, dan pelindungan data pribadi; C3 menjelaskan tata kelola pemakaian AI, termasuk hak cipta dan lisensi keluaran AI (status hukum masih berkembang) | etika, lisensi, privasi, dampak sosial, profesi, tata kelola AI (pedoman etika kecerdasan artifisial nasional SE 9/2023, kebijakan pemakaian AI di tempat kerja) | studi kasus, esai |
| KUL-I-306 | C1 menjelaskan dasar grafika; C2 membuat visual interaktif sederhana | rendering dasar, transformasi, interaksi | proyek |
| KUL-I-307 | C1 membangun alur data; C2 menerapkan model terlatih pada data | ETL, fitur, model, evaluasi, penyajian | proyek |
| KUL-I-401 | C1 mengerjakan produk perangkat lunak dalam tim; C2 mengelola proyek; C3 menyajikan dan mempertanggungjawabkan hasil; C4 menetapkan dan menjalankan kebijakan AI tim | kapstone dengan pemangku kepentingan, tinjau kode, rilis, dokumentasi, kebijakan AI tim dan log pemakaian, tinjauan manusia wajib atas kode yang digabung | proyek, demo, sidang dengan tanya jawab tentang kode sendiri |

Catatan rekayasa perangkat lunak berbantuan AI (v1.1): pemrograman berbantuan
AI di sini berarti mahasiswa membaca, menguji, memahami, dan bertanggung jawab
atas setiap baris yang dipakai (bagian 6.5). Pengenalannya diintegrasikan pada
mata kuliah yang sudah ada dan **tidak menambah SKS**: 3-4 minggu pada
`KUL-I-204` (beban S4 tetap 9 SKS), kebijakan dan log pada `KUL-I-401`, rantai
pasok pada `KUL-I-301`, hak cipta dan tata kelola pada `KUL-I-305`, serta biaya
komputasi pada `KUL-I-303`. Pengenalan ini dimulai setelah `KUL-I-102` dan
gerbang kesiapan (bagian 6.4). Dampak tiap butir terhadap belajar dan
produktivitas belum diukur di kelas `[belum terverifikasi]`.

Catatan KA: jalur I tidak menyentuh unit tertentu di dalam KA karena unit
CS2023 tidak terverifikasi (`riset.md` bagian 4).

### 3.3 Jalur K: kompetitif (ICPC) sebagai lanjutan OSN

| Kode | Nama | SKS | Smt | Prasyarat |
| --- | --- | --- | --- | --- |
| KUL-K-201 | Pemrograman Kompetitif I | 2 | S3 | KUL-I-102 atau sma-coding jalur A atau KUL-U-101 dengan seleksi `[asumsi]` |
| KUL-K-301 | Pemrograman Kompetitif II | 2 | S5 | KUL-K-201 |
| KUL-K-401 | Studio Tim Kompetisi | 2 | S7 | KUL-K-301 |

**KUL-K-201 Pemrograman Kompetitif I (2 SKS)**

- CPMK `[karangan]`: C1 menyelesaikan soal bertipe OSN/ICPC dasar
  (pencarian, pengurutan, greedy, rekursi, struktur data standar) dalam batas
  waktu; C2 membaca batas soal dan memperkirakan kompleksitas; C3 membuat kasus
  uji sendiri; C4 memakai pustaka standar C++ secara efisien.
- Pokok bahasan: templat kode, I/O cepat, pustaka standar, pengurutan dan
  pencarian biner, greedy, DP dasar, graf dasar (BFS, DFS).
- Asesmen: lima kontes mingguan perorangan (soal tertaut, bukan disalin),
  analisis pascakontes. Kebijakan AI: Merah saat kontes; setelah kontes, AI
  boleh menjelaskan solusi dengan pengungkapan, lalu mahasiswa mengerjakan
  ulang (*re-solve*) tanpa AI.
- KA CS2023: AL, SDF.

**KUL-K-301 Pemrograman Kompetitif II (2 SKS)**

- CPMK `[karangan]`: C1 menerapkan DP lanjutan, graf (jalur terpendek, pohon
  rentang minimum, aliran dasar), dan teori bilangan; C2 menerapkan struktur
  data lanjutan (segment tree, DSU); C3 menyelesaikan soal tingkat menengah
  dengan analisis kebenaran.
- Pokok bahasan: DP lanjutan, graf lanjutan, teori bilangan, struktur data
  lanjutan, string, geometri dasar.
- Asesmen: kontes tim, tugas analisis algoritma. Kebijakan AI: Merah saat
  kontes; setelah kontes, AI untuk menjelaskan solusi dengan pengungkapan dan
  *re-solve* tanpa AI.
- KA CS2023: AL, MSF.

**KUL-K-401 Studio Tim Kompetisi (2 SKS)**

- CPMK `[karangan]`: C1 bekerja sebagai tim tiga orang dengan satu komputer
  dan membagi peran; C2 mengelola waktu pada kontes sekitar lima jam; C3
  melakukan debugging dan menulis kode pembanding; C4 menyusun refleksi dan
  rencana latihan.
- Pokok bahasan: strategi tim, pembagian soal, simulasi kontes, analisis soal
  yang gagal. Format "tim tiga orang, satu komputer, lima jam" mengikuti aturan
  regional ICPC yang dibuka (`riset.md` bagian 5) tetapi dipakai hanya sebagai
  bentuk latihan `[asumsi]`.
- Asesmen: simulasi kontes, penilaian pelatih, refleksi. Kebijakan AI: Merah
  saat simulasi kontes; setelah kontes, AI untuk menjelaskan solusi dengan
  pengungkapan dan *re-solve* tanpa AI.
- KA CS2023: AL, SEP (kerja tim).

## 4. Pemetaan

### 4.1 Ke CPL program studi (kolom isian)

CPL dirumuskan tiap program studi (Pasal 8 ayat (1)) dan sumber yang dibuka
tidak memuat CPL nasional untuk coding. Karena itu pemetaan CPL **tidak
dikarang**: tiap prodi pengadopsi mengisi kolom ini.

| Kode MK | CPL prodi yang dikontribusikan (diisi prodi) | Keterangan |
| --- | --- | --- |
| tiap `KUL-*` | (kosong; diisi program studi) | Pasal 8 ayat (5): mata kuliah berkontribusi pada CPL melalui CPMK. |

Pasal 7 menyebut empat kelompok kompetensi CPL (penguasaan IPTEK dan
keterampilan khusus; kecakapan umum; pengetahuan dan keterampilan untuk kerja
atau studi lanjut; kemampuan intelektual dan pembelajar sepanjang hayat).
Pemetaan **tingkat kelompok** `[asumsi]`: jalur U memperkuat kecakapan umum;
jalur I memperkuat penguasaan IPTEK dan keterampilan khusus; jalur K
memperkuat kemampuan intelektual (berpikir kritis). Ini bukan pemetaan resmi.

### 4.2 Ke knowledge area CS2023 (tingkat KA)

Nama KA persis dari situs CS2023 (`riset.md` bagian 4). Tanda "utama" berarti
mata kuliah itu pusat KA tersebut; "sebagian" berarti menyentuh `[asumsi]`.

| KA CS2023 | Mata kuliah (jalur I) | Dukungan jalur lain |
| --- | --- | --- |
| Algorithmic Foundations (AL) | KUL-I-102 (sebagian), KUL-I-201 (utama) | KUL-K-201, KUL-K-301, KUL-K-401 |
| Architecture and Organization (AR) | KUL-I-203 (utama) | |
| Artificial Intelligence (AI) | KUL-I-303 (utama), KUL-I-307 (sebagian) | KUL-U-202 |
| Data Management (DM) | KUL-I-202 (utama), KUL-I-307 (sebagian) | KUL-U-102 |
| Foundations of Programming Languages (FPL) | KUL-I-101 (sebagian) | celah: paradigma dan semantik bahasa belum punya mata kuliah sendiri |
| Graphics and Interactive Techniques (GIT) | KUL-I-306 (pilihan) | |
| Human-Computer Interaction (HCI) | KUL-I-304 (utama) | |
| Mathematical and Statistical Foundations (MSF) | KUL-I-103 (utama) | KUL-K-301; statistik: celah, diasumsikan dari prodi |
| Networking and Communication (NC) | KUL-I-301 (utama) | KUL-U-201 (dasar) |
| Operating Systems (OS) | KUL-I-203 (utama) | |
| Parallel and Distributed Computing (PDC) | KUL-I-302 (utama) | |
| Security (SEC) | KUL-I-301 (sebagian), KUL-I-205 (sebagian) | KUL-U-201, KUL-U-202 |
| Society, Ethics, and the Profession (SEP) | KUL-I-305 (utama), KUL-I-401 (sebagian) | KUL-U-202, KUL-U-301, KUL-K-401 |
| Software Development Fundamentals (SDF) | KUL-I-101 (utama), KUL-I-102 (utama) | KUL-U-101, KUL-U-102, KUL-U-201 |
| Software Engineering (SE) | KUL-I-204 (utama), KUL-I-401 (utama) | KUL-U-301 |
| Specialized Platform Development (SPD) | KUL-I-205 (utama) | |
| Systems Fundamentals (SF) | KUL-I-203 (sebagian) | |

**Celah yang diakui:** (1) FPL belum punya mata kuliah tersendiri; (2)
statistik di MSF diasumsikan diampu prodi; (3) cakupan di dalam KA tidak
diaudit karena unit CS2023 tidak terverifikasi; (4) jam inti CS2023 tidak
dipakai. Pemilik dapat memutuskan menambah mata kuliah FPL (pertanyaan
terbuka).

## 5. Jembatan

### 5.1 Dari SMA

| Dari | Ke | Dasar dan syarat |
| --- | --- | --- |
| sma-coding jalur A (C++ algoritmik), v1.2 | KUL-I-101, KUL-I-102, KUL-K-201 | Pengakuan lewat rekognisi pembelajaran lampau (Pasal 14 ayat (3) huruf c); bukti berupa portofolio dan uji penempatan; tata cara ditetapkan perguruan tinggi `[belum terverifikasi]`. Jalur A dan jalur K punya topik yang sama dengan rumpun OSN di `data/osn/topic-families.json` (mis. struktur data, graph-tree, search-sort, rekursi). |
| sma-coding jalur B (web, JS/TS) | KUL-I-205 | Portofolio web; bahasa sama (TypeScript) `[asumsi]`. |
| sma-coding jalur C (IoT), D (AI), E (kuantum) | KUL-U-201 (C), KUL-U-202 dan KUL-I-303 (D), pengayaan (E) | Jalur D dan E di sma-coding adalah pengayaan di luar CP; pengakuan di kuliah tidak otomatis `[asumsi]`. |
| Pembinaan OSN Informatika (korpus `data/osn/`) | KUL-K-201 | Selaras topik; peserta OSN tidak otomatis memenuhi prasyarat, ada uji penempatan `[asumsi]`. |
| Blok fondasi kelas X sma-coding | KUL-U-101 | Tumpang tindih berpikir komputasional; prodi menentukan pengakuan. |

### 5.2 Ke dunia kerja

| Ke | Bagaimana | Catatan |
| --- | --- | --- |
| Magang | Pasal 16 ayat (1) memasukkan magang sebagai bentuk pemenuhan beban belajar; Pasal 18 ayat (4) dan (7) memberi dasar pemenuhan sebagian beban di luar program studi | Durasi dan beban ditetapkan perguruan tinggi (Pasal 18 ayat (6)). Magang bukan mata kuliah draf ini `[asumsi]`. |
| Program dewasa-coding (disusun paralel; belum ada di repositori saat draf ini ditulis) | Portofolio proyek KUL-U-301 dan KUL-I-401 menjadi bahan masuk; tamatan jalur U dapat melanjutkan ke jalur kerja di dewasa-coding | Rujukan silang dilengkapi setelah program itu ada; tidak diklaim sekarang. |
| Sertifikasi profesi | Pasal 7 huruf c menyebut "sertifikat profesi" sebagai salah satu tujuan CPL | Skema sertifikasi tertentu (mis. SKKNI) `[belum terverifikasi]`; tidak dipetakan. |
| Pendidikan lanjutan | Pasal 21 mengatur percepatan pembelajaran bagi mahasiswa berkemampuan luar biasa (dibaca sebagian) | Tidak dikembangkan di draf ini. |

## 6. Asesmen, integritas akademik, dan penggunaan AI

### 6.1 Prinsip asesmen `[asumsi]`

| Komponen | Bobot indikatif | Keterangan |
| --- | --- | --- |
| Tugas dan praktikum | 30-40 persen | Kode di repositori mahasiswa; riwayat Git sebagai bukti proses. |
| Proyek | 20-40 persen | Pasal 18 ayat (9) membolehkan ketercapaian lewat kurikulum berbasis proyek. |
| Ujian praktik langsung (tanpa bantuan luar) | 20-30 persen | Menjaga kemampuan individu. |
| Ujian tertulis/lisan | 10-20 persen | Konsep; tanya jawab tentang kode sendiri. |

Bobot hanya usulan; prodi pengadopsi menetapkan.

### 6.2 Integritas akademik

Dasar regulasi (terverifikasi): kegiatan pendidikan "dengan menjunjung tinggi
integritas dan etika akademik" (Pasal 33 ayat (1)); mahasiswa baru disiapkan
dengan "cara belajar yang menjunjung prinsip integritas akademik" (Pasal 37
ayat (2) huruf b); keluhan atas dugaan pelanggaran etika akademik diproses
(Pasal 34 ayat (2) huruf d). Prosedur rinci diatur perguruan tinggi.

Rancangan penyusun `[asumsi]`: plagiarisme kode, kolusi, dan penggunaan
asisten kode ditangani lewat (a) tugas dengan variasi per mahasiswa,
(b) riwayat Git, (c) ujian praktik langsung, (d) wawancara singkat tentang
kode sendiri, (e) ketentuan pengungkapan.

### 6.3 Penggunaan AI (asumsi; tidak ada ketentuan dalam pasal yang dibaca)

| Tingkat | Aturan | Dipakai pada |
| --- | --- | --- |
| Hijau | AI boleh dipakai dengan pengungkapan ringkas (alat, tujuan) dan log pemakaian wajib (alat dan versi, tujuan, perintah, bagian keluaran yang dipakai); mahasiswa siap menjawab wawancara kode singkat | Proyek, eksplorasi, dokumentasi, termasuk KUL-U-202, KUL-I-204, KUL-I-401 |
| Kuning | AI boleh menjelaskan konsep, tidak boleh menghasilkan solusi yang diserahkan; dipakai hanya sesudah gerbang kesiapan (bagian 6.4) | Tugas dasar pemrograman KUL-U-101, KUL-I-101, KUL-I-102 |
| Merah | AI tidak boleh | Ujian praktik, kontes (jalur K: KUL-K-201, KUL-K-301, KUL-K-401), seleksi, tugas penilaian kemampuan dasar |

Dosen menetapkan tingkat per tugas dan menuliskannya di lembar tugas.
Pemakaian layanan AI daring oleh mahasiswa memerlukan kebijakan privasi
(bagian 8): dilarang memasukkan data pribadi atau data sensitif ke layanan
eksternal `[asumsi]`.

### 6.4 Penguatan kebijakan AI (v1.1)

Penguatan ini `[asumsi]` dan `[karangan]` (keputusan pemilik 2026-11-19, bagian
9.1); kebijakan ini khusus program `kuliah-coding` dan bukan kerangka lintas
program. Dasar sumber ada di
[`docs/riset/ai-rekayasa-perangkat-lunak.md`](../../riset/ai-rekayasa-perangkat-lunak.md)
bagian 4 sampai 6; bukti bahwa tiap langkah di bawah benar-benar menahan
penyalahgunaan AI belum dibuka `[belum terverifikasi]`.

| Butir | Aturan |
| --- | --- |
| Log pemakaian | Pada tingkat Hijau, log wajib: alat dan versi, tujuan, perintah, dan bagian keluaran yang dipakai. Log disimpan mahasiswa di repositorinya sendiri, bukan di repositori ini (bagian 8). |
| Wawancara kode | Dosen dapat mewawancarai mahasiswa singkat tentang kode yang diserahkan; mahasiswa menjelaskan dan memodifikasi bagian kodenya sendiri. |
| Ujian praktik tanpa AI | Ujian praktik langsung berlaku Merah, dengan bobot menurut bagian 6.1. |
| Gerbang kesiapan | Sebelum memakai asisten AI untuk menulis kode, mahasiswa dapat (1) menelusuri (*trace*) program pendek, (2) menulis satu uji yang gagal bila kode salah, dan (3) menjelaskan kode dengan kata sendiri. Pada mata kuliah dasar (Kuning) gerbang ini dipenuhi lebih dulu. |
| Data dan hak cipta | Data pribadi, kata sandi, dan kunci tidak dimasukkan ke layanan AI. Hak cipta dan lisensi keluaran AI: status hukum masih berkembang; mahasiswa mengungkapkan pemakaian dan memeriksa lisensi kode yang dipakai. |
| Energi dan biaya komputasi | Butir singkat: energi per perintah kecil tetapi bervariasi puluhan kali lipat antar model dan metode ukur; tidak ada angka terverifikasi per tugas pemrograman `[belum terverifikasi]`. Mahasiswa memilih alat sesuai kebutuhan dan tidak mengulang pembangkitan tanpa menjalankan uji. |

### 6.5 Glosarium istilah AI (v1.1)

- **Pemrograman berbantuan AI**: mahasiswa memakai asisten AI dan
  membaca, menguji, memahami, serta bertanggung jawab atas setiap baris yang
  dipakai. Inilah yang dilatih (`KUL-I-204`, `KUL-U-202`).
- **Vibe coding**: menerima keluaran AI tanpa menelaah kodenya. Hanya dibahas
  sebagai istilah dan risiko; bukan praktik yang diajarkan dan bukan
  capaian pembelajaran.
- **AI-native engineer**: istilah tidak baku yang beredar; tidak dipakai
  sebagai label capaian atau profil lulusan.
- **Agen kode**: agen yang merencanakan, menjalankan, dan menguji dengan
  intervensi manusia minimal; hanya pengenalan terbatas pada `KUL-I-204`,
  dengan batas kewenangan dan tinjauan manusia.

## 7. Bahasa dan alat; sarana lab dan cloud

### 7.1 Bahasa untuk jalur I (pertanyaan inti)

| Opsi | Kelebihan | Kekurangan |
| --- | --- | --- |
| A. C++ pertama (fondasi, struktur data, kompetitif); Python untuk AI dan data; TypeScript untuk web | Kontinu dengan sma-coding jalur A dan OSN; efisien untuk KUL-K; kuat untuk memori dan kinerja | Kurva belajar curam bagi pemula; sintaks dan galat lebih berat |
| B. Python pertama, C++ kemudian untuk algoritma dan sistem | Mulus bagi pemula; satu bahasa dengan jalur U | Kontinuitas ke jalur A SMA berkurang; memori dan tipe statis diajarkan terlambat |
| C. Java (atau bahasa berbasis JVM) pertama | Tipe statis dengan pengelolaan memori otomatis; lazim di industri | Tidak selaras dengan sma-coding; bahasa yang diizinkan di ICPC tidak terverifikasi |

**Rekomendasi penyusun: opsi A untuk jalur I dan K; Python untuk jalur U.**
Alasan: kesinambungan dari sma-coding jalur A dan OSN (rumpun materi di
`data/osn/topic-families.json` berbasis C++), dan jalur U melayani populasi
non-informatika yang butuh keluaran cepat. Syarat: `KUL-I-101` menyediakan
dukungan bagi pemula (jam pendampingan). Bahasa yang diizinkan di kontes ICPC
`[belum terverifikasi]`; kompiler dan versi disamakan dengan penyelenggara
kontes yang dituju bila jalur K dipakai untuk kompetisi.

### 7.2 Alat

| Kebutuhan | Pilihan | Catatan |
| --- | --- | --- |
| Penyunting kode | editor sumber terbuka umum | Pilihan alat tidak dipromosikan; disamakan per lab. |
| Kendali versi | Git | Wajib dari tahun pertama. |
| Python | interpreter dan notebook | Instal lokal atau di lab. |
| C++ | g++ (C++17) | Selaras dengan modul sma-coding. |
| Basis data | SQLite, lalu server basis data relasional | Tanpa data pribadi. |
| Web | Bun/Node, TypeScript | Selaras sma-coding jalur B. |
| Layanan cloud | kuota gratis atau program kampus | Ketersediaan, harga, dan syarat `[belum terverifikasi]`. |
| Kontainer | Docker atau setara | Untuk KUL-I-302 dan KUL-I-205 `[asumsi]`. |

### 7.3 Lab dan cloud

| Opsi | Kelebihan | Kekurangan |
| --- | --- | --- |
| A. Lab kampus dengan perangkat lunak terpasang | Kendali penuh; tanpa akun luar | Biaya perawatan; terbatas jam lab |
| B. Perangkat milik mahasiswa (BYOD) dengan lingkungan terdokumentasi | Fleksibel; belajar dari rumah | Kesenjangan perangkat; dukungan beragam |
| C. Lingkungan cloud (IDE daring, mesin virtual) | Seragam; ujian dan kontes mudah | Biaya, akun, privasi, ketergantungan layanan |

**Rekomendasi penyusun: gabungan A dan B**, cloud (opsi C) hanya untuk
KUL-I-302 dan proyek tertentu. Spesifikasi minimum perangkat `[belum
terverifikasi]` dan ditentukan setelah survei lab prodi. Mahasiswa tanpa
perangkat dilayani lab (kesempatan belajar yang sama, Pasal 14 ayat (1)
huruf b: tanpa membedakan latar belakang ekonomi).

## 8. Privasi (ADR-0004)

- Repositori ini tidak menyimpan data pribadi mahasiswa dan tidak menyimpan
  kode yang diserahkan; tidak ada nilai, nama, NIM, atau akun dalam repositori
  ini ([ADR-0004](../../architecture/adr/0004-no-learner-personal-data.md)).
- Contoh data dalam mata kuliah (analisis data, otomasi) harus sintetis atau
  terbuka, tanpa data pribadi nyata.
- Bila perguruan tinggi memakai platform pengumpulan tugas atau layanan AI/
  cloud, pengelolaan data mahasiswa menjadi tanggung jawab perguruan tinggi;
  ketentuan pelindungan data pribadi yang berlaku (mis. UU Nomor 27 Tahun 2022,
  yang dirujuk ADR-0004; teksnya tidak dibuka untuk draf ini
  `[belum terverifikasi]`) harus diterapkan.
- Berbeda dengan sma-coding, mahasiswa umumnya dewasa; kebutuhan persetujuan
  orang tua tidak berlaku untuk mahasiswa dewasa, tetapi usia mahasiswa baru
  dapat di bawah 18 tahun `[asumsi]`; kebijakan per perguruan tinggi.
- Modul kuliah tidak mensyaratkan akun mahasiswa pada layanan pihak ketiga
  `[asumsi]`.
- Log pemakaian AI (bagian 6.4) milik mahasiswa; tidak ada log, perintah, atau
  keluaran AI mahasiswa yang disimpan di repositori ini.

## 9. Keputusan pemilik atas pertanyaan terbuka (2026-11-19)

Dijawab pemilik lewat dialog pilihan pada 2026-11-19 dan dicatat di issue
#130: draf disetujui **beserta rekomendasi penyusun**, sehingga setiap
pertanyaan terbuka draf v0.1 terjawab dengan opsi rekomendasinya.

| No. | Pertanyaan | Keputusan |
| --- | --- | --- |
| 1 | Pembagian jalur | **A**: tiga jalur U, I, K (bagian 2.1). |
| 2 | Bahasa pertama jalur I | **A**: C++ dahulu di jalur I dan K; Python di jalur U (bagian 7.1). |
| 3 | Besar jalur I | **A**: paket penuh 42 SKS inti, dengan catatan prodi dapat mengadopsi sebagian (bagian 2.4). |
| 4 | Bentuk adopsi jalur U dan K | **C**: keduanya, mata kuliah pilihan/umum prodi dan paket lintas prodi (bagian 2.4). |
| 5 | Kebijakan AI | **A**: tiga tingkat hijau-kuning-merah (bagian 6.3). |
| 6 | Mata kuliah FPL dan statistik | **B**: dibiarkan sebagai celah yang diakui (bagian 4.2); diputuskan ulang setelah audit unit CS2023. |
| 7 | Rujukan ICPC | **A**, sementara **B**: bila pemilik memberi tautan aturan ICPC wilayah tujuan, rujukan diperbarui; sementara format regional dipakai sebagai bentuk latihan saja. Tautan belum diberikan. |
| 8 | Rujukan APTIKOM dan CPL | **A**, sementara **B**: bila pemilik memberi tautan dokumen kurikulum acuan, rujukan diperbarui; sementara tanpa rujukan APTIKOM. CPL tetap kolom isian program studi pengadopsi (bagian 4.1). Tautan belum diberikan. |
| 9 | Lab dan cloud | **D**: lab kampus dan perangkat milik mahasiswa; cloud hanya untuk KUL-I-302 dan proyek tertentu (bagian 7.3). |
| 10 | Hubungan ke dewasa-coding | **A**: ditautkan setelah program itu ada (bagian 5.2). |

### 9.1 Keputusan pemilik atas revisi v1.1 (2026-11-19, issue #139)

Usulan U-09 sampai U-12 pada riset AI diterapkan dengan opsi rekomendasi.

| Usulan | Keputusan |
| --- | --- |
| U-09 | **A**: pokok bahasan `KUL-U-202` diperluas dalam 2 SKS yang ada (bagian 3.1). |
| U-10 | **A**: rekayasa perangkat lunak berbantuan AI diintegrasikan 3-4 minggu pada `KUL-I-204`, plus `KUL-I-401`, `KUL-I-301`, `KUL-I-305`, `KUL-I-303`; tanpa menambah SKS (46 SKS jalur I dan 66 SKS total tetap). |
| U-11 | **A**: kebijakan tiga tingkat diperkuat dengan log pemakaian dan wawancara kode (bagian 6.3 dan 6.4). |
| U-12 | **A**: jalur K Merah saat kontes; setelah kontes AI untuk menjelaskan solusi dengan pengungkapan dan *re-solve* tanpa AI (bagian 3.3). |
| Lintas usulan | Kebijakan AI disusun per program; energi dan biaya komputasi sebagai butir singkat dengan ketidakpastian; istilah "vibe coding" dan "AI-native engineer" hanya di glosarium (bagian 6.5). |

## 10. Sumber dan batasan

- Sumber: [`riset.md`](riset.md) (Permendiktisaintek 39/2025 terbaca penuh;
  17 KA CS2023; aturan regional ICPC; APTIKOM tidak dipakai; MBKM dari berita
  sekunder).
- Rujukan repositori: `docs/riset/ai-rekayasa-perangkat-lunak.md` (dasar revisi v1.1),
  `docs/programs/sma-coding/silabus.md` (v1.2, disetujui),
  `data/osn/topic-families.json`, ADR-0004, ADR-0006, ADR-0007.
- Batasan: rumusan CPMK, topik, SKS, dan semester adalah karangan; tidak ada
  CPL resmi, tidak ada unit CS2023, tidak ada aturan ICPC Indonesia, tidak ada
  harga atau lisensi alat yang diriset; tidak ada pilot di kelas; tidak ada
  masukan dosen, prodi, atau industri; jam dan beban belum diuji.
- Keputusan pemilik 2026-11-19 tercatat di bagian 9. Persetujuan tidak mengubah batasan di atas: isi rencana tetap karangan penyusun.

## Changelog

| Versi | Tanggal | Perubahan |
| --- | --- | --- |
| v1.1.0 | 2026-11-19 | Rekayasa perangkat lunak berbantuan AI (issue #139, keputusan pemilik U-09 sampai U-12): `KUL-U-202` diperluas; `KUL-I-204`, `KUL-I-401`, `KUL-I-301`, `KUL-I-305`, `KUL-I-303` memuat butir AI tanpa menambah SKS; tiga tingkat AI diperkuat dengan log, wawancara kode, ujian praktik tanpa AI, gerbang kesiapan; jalur K Merah saat kontes; bagian 6.4 (penguatan), 6.5 (glosarium), 9.1 (keputusan). Jumlah mata kuliah, SKS, jalur, dan KA tidak berubah. |
| v1.0.0 | 2026-11-19 | Disetujui pemilik program beserta rekomendasi penyusun (issue #130). Berkas diganti nama dari `silabus-draf.md`; status menjadi disetujui; pertanyaan terbuka (bagian 9) diganti keputusan pemilik; isi rencana (bagian 1-8) tidak berubah. |
| v0.1.0 | 2026-11-19 | Draf awal (issue #130): tiga jalur, 24 mata kuliah, pemetaan KA CS2023, jembatan, asesmen, AI, privasi, alat, pertanyaan terbuka. |
