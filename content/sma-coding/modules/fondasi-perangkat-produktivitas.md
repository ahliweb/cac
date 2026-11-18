## Untuk siapa modul ini

Modul ini untuk murid kelas X pemula, mengikuti minggu fondasi ketujuh (FND-X1-M7): perangkat pengolah dokumen, lembar kerja, dan presentasi. Ini minggu terakhir blok fondasi, sebelum kamu memilih jalur pemrograman.

Setelah mempelajari modul ini, kamu diharapkan bisa:

- memilih perangkat yang sesuai kebutuhan (dokumen, lembar kerja, atau presentasi);
- menyusun dokumen terstruktur: judul, gaya, daftar, tabel, dan gambar beratribusi;
- memakai rumus dasar lembar kerja (jumlah, rata-rata, minimum, maksimum, kondisi sederhana) dan membuat grafik sederhana;
- menyusun presentasi ringkas dan terbaca;
- menyimpan dan menukar berkas dalam format yang dapat dibuka di perangkat lain.

Modul ini menyiapkan butir capaian pembelajaran yang berbunyi "memahami pemanfaatan perangkat teknologi yang lebih beragam untuk pengolah dokumen, lembar kerja, dan presentasi".

Modul ini tidak menunjuk satu produk. Menu dan nama tombol berbeda antarperangkat lunak, jadi modul memakai istilah umum. Pakailah perangkat yang disediakan lab (sumber terbuka atau berbasis web); guru akan menunjukkan letak menunya. Tanpa berkas atau data pribadi siswa: semua isi latihan fiktif, dan nama murid memakai nama samaran seperti Murid-01.

## Memilih perangkat yang tepat

| Kebutuhan | Perangkat | Contoh hasil |
| --- | --- | --- |
| Menulis teks panjang yang tertata | Pengolah dokumen | laporan, surat, makalah |
| Mengolah angka, menghitung, membuat grafik | Lembar kerja | rekap nilai, anggaran, daftar inventaris |
| Menyampaikan gagasan kepada audiens | Presentasi | slide untuk kelas atau rapat |

Aturan praktis: bila isinya kalimat, pakai dokumen. Bila isinya angka yang dihitung, pakai lembar kerja. Bila perlu ditampilkan kepada banyak orang secara ringkas, pakai presentasi.

## Pengolah dokumen: dokumen yang terstruktur

Dokumen yang baik bisa dipindai pembaca dengan cepat. Gunakan fitur struktur, bukan hanya mengatur tampilan dengan spasi.

- **Gaya judul** (Judul, Subjudul, Judul 1, Judul 2). Memberi struktur dan memungkinkan daftar isi otomatis. Jangan sekadar membesarkan huruf.
- **Daftar** bernomor atau berbutir, untuk urutan atau butir yang sejajar.
- **Tabel** untuk data yang punya baris dan kolom. Beri judul kolom.
- **Gambar** dengan keterangan dan **atribusi**: sebut pembuat dan sumber, dan pastikan lisensinya mengizinkan.
- **Ruang putih**: jarak antarparagraf dan margin yang cukup membuat tulisan nyaman dibaca.
- **Konsisten**: satu jenis huruf, ukuran konsisten, dan warna secukupnya.

Contoh kerangka laporan satu halaman (klub fiktif):

```text
[Judul]       Laporan Kegiatan Klub Robotika Fiktif
[Subjudul]    Semester 1
[Judul 2]     Latar belakang
              (satu paragraf)
[Judul 2]     Kegiatan
              - Pertemuan 1: pengenalan sensor
              - Pertemuan 2: latihan merakit
[Judul 2]     Rekap peserta
              (satu tabel: Nama samaran | Kehadiran)
[Judul 2]     Penutup
```

## Lembar kerja: rumus dan grafik

Lembar kerja berisi **sel** yang tersusun dalam baris dan kolom. Setiap sel punya alamat: kolom (huruf) dan baris (angka), misalnya `B3`. Sel bisa berisi angka, teks, atau **rumus** yang diawali tanda sama dengan (`=`).

Contoh data fiktif: nilai kuis lima murid samaran.

| | A | B |
| --- | --- | --- |
| 1 | Nama samaran | Nilai |
| 2 | Murid-01 | 80 |
| 3 | Murid-02 | 75 |
| 4 | Murid-03 | 90 |
| 5 | Murid-04 | 65 |
| 6 | Murid-05 | 85 |

Rumus dasar (nama fungsi bisa berbeda mengikuti bahasa perangkat lunak; yang berikut memakai nama bahasa Inggris, dan padanannya dalam bahasa Indonesia biasanya `JUMLAH`, `RATA2`, `MIN`, `MAKS`, `JIKA`):

```text
=SUM(B2:B6)      jumlah               -> 395
=AVERAGE(B2:B6)  rata-rata            -> 79
=MIN(B2:B6)      nilai terkecil       -> 65
=MAX(B2:B6)      nilai terbesar       -> 90
=IF(B2>=75,"Tuntas","Remedial")       -> Tuntas (untuk Murid-01)
```

`B2:B6` artinya rentang dari sel `B2` sampai `B6`. Pemisah argumen bisa titik koma (`;`) atau koma (`,`) tergantung pengaturan bahasa. Rumus `IF` memeriksa kondisi, lalu memberi satu nilai bila benar dan nilai lain bila salah. Bila rumus `IF` di kolom C ditarik ke bawah, hasilnya untuk kelima murid adalah: Tuntas, Tuntas, Tuntas, Remedial, Tuntas.

Pemeriksaan hitungan: 80 + 75 + 90 + 65 + 85 = 395, dan 395 / 5 = 79.

**Grafik sederhana:** pilih rentang data (nama dan nilai), lalu sisipkan grafik batang. Beri judul grafik, nama sumbu, dan jangan memotong sumbu agar tidak menyesatkan. Grafik batang cocok untuk membandingkan nilai antarkategori; grafik garis untuk perubahan dari waktu ke waktu.

Kebiasaan baik: simpan data mentah di satu tempat dan buat rumus merujuk ke sel, bukan mengetik angkanya ulang. Dengan begitu bila satu nilai berubah, hasilnya ikut berubah.

## Presentasi: ringkas dan terbaca

- **Satu gagasan per slide.** Bila perlu dua gagasan, buat dua slide.
- **Sedikit teks.** Gunakan butir pendek, bukan kalimat panjang; slide bukan naskah.
- **Huruf besar dan jelas** sehingga terbaca dari belakang ruangan.
- **Kontras cukup** antara huruf dan latar (teks gelap pada latar terang atau sebaliknya). Hindari kombinasi yang sulit dibaca seperti kuning di atas putih. Pedoman aksesibilitas umum menyarankan rasio kontras minimal 4,5 banding 1 untuk teks biasa.
- **Gambar dan diagram membantu**, dengan atribusi bila bukan buatanmu.
- **Jangan hanya mengandalkan warna** untuk menyampaikan makna; tambahkan label atau bentuk.
- **Latihan** menyampaikan: bicaralah menjelaskan slide, bukan membacanya.

## Menyimpan dan menukar berkas

Setiap perangkat lunak punya format berkas sendiri. Agar berkasmu terbuka di perangkat lain:

| Kebutuhan | Format yang disarankan |
| --- | --- |
| Dokumen yang akan dibaca saja | PDF |
| Dokumen yang masih akan disunting orang lain | format terbuka untuk dokumen (misalnya ODF) atau format umum yang didukung banyak perangkat |
| Tabel data sederhana tanpa rumus | CSV (teks dengan kolom dipisah koma atau titik koma) |
| Gambar | PNG atau JPEG |

Format terbuka punya spesifikasi yang dipublikasikan, sehingga banyak perangkat lunak dapat membukanya. Gunakan nama berkas yang rapi (lihat modul perangkat lunak dan sistem operasi).

## Kegiatan

**Kegiatan 1: Laporan klub fiktif.** Susun laporan satu halaman tentang kegiatan klub fiktif. Syaratnya: satu judul dengan gaya judul, minimal dua subjudul, satu daftar, satu tabel (nama samaran Murid-01 dan seterusnya), dan satu gambar dengan keterangan dan atribusi (boleh gambar buatanmu sendiri). Simpan sebagai dokumen dan sebagai PDF.

**Kegiatan 2: Rekap nilai sintetis.** Di lembar kerja, buat tabel Murid-01 sampai Murid-06 dengan nilai: 70, 82, 91, 58, 77, 64. Tambahkan rumus jumlah, rata-rata, minimum, maksimum, dan satu kolom status memakai kondisi ("Tuntas" bila nilai minimal 75, selain itu "Remedial"). Buat satu grafik batang nilai tiap murid.

**Kegiatan 3: Presentasi empat slide.** Buat presentasi empat slide tentang satu topik fondasi. Misalnya peta jaringan lab (tanpa alamat nyata). Struktur sarannya: slide 1 judul, slide 2 gagasan utama dan satu gambar, slide 3 contoh atau langkah, slide 4 ringkasan. Ekspor ke PDF.

Jangan memakai berkas atau data pribadi siswa dalam kegiatan apa pun.

## Latihan

### Latihan 1: Pilih perangkat

Pilih perangkat (dokumen, lembar kerja, atau presentasi) untuk: (a) surat permohonan peminjaman ruang, (b) daftar iuran kas kelas dengan total, (c) paparan hasil penelitian di depan kelas.

### Latihan 2: Perbaiki struktur

Seorang murid fiktif menulis judul dengan membesarkan huruf dan menekan spasi berkali-kali agar teks rata tengah. Jelaskan dua masalahnya dan cara memperbaikinya.

### Latihan 3: Rumus

Data nilai: 70, 82, 91, 58, 77, 64 pada sel `B2` sampai `B7`. Tulis rumus dan hasil untuk: jumlah, rata-rata (bulatkan dua desimal), minimum, maksimum, dan banyak murid dengan nilai minimal 75.

### Latihan 4: Rumus kondisi

Tulis rumus yang menghasilkan "Tuntas" jika nilai di `B2` minimal 75, selain itu "Remedial". Berapa hasilnya untuk nilai 70?

### Latihan 5: Grafik

Grafik batang menunjukkan nilai 58 sampai 91, tetapi sumbu vertikal dimulai dari 50. Mengapa ini bisa menyesatkan?

### Latihan 6: Evaluasi slide

Sebuah slide fiktif berisi tiga paragraf panjang dengan huruf kecil dan teks abu-abu muda pada latar putih. Tuliskan empat perbaikan.

### Latihan 7: Format berkas

Kamu perlu mengirim laporan akhir kepada guru yang hanya akan membacanya, dan lembar kerja kepada temanmu yang perlu menyuntingnya. Format apa yang kamu pilih untuk masing-masing?

## Kuis formatif

1. Kapan memakai lembar kerja daripada pengolah dokumen?
2. Mengapa memakai gaya judul lebih baik daripada membesarkan huruf?
3. Apa arti `B2:B6`?
4. Sebutkan dua prinsip slide yang terbaca.
5. Mengapa atribusi perlu pada gambar?
6. Format apa yang cocok untuk dokumen yang hanya akan dibaca?

## Cek mandiri

- Aku bisa memilih perangkat yang cocok untuk suatu tugas.
- Aku bisa menyusun dokumen dengan gaya judul, daftar, dan tabel.
- Aku bisa menulis rumus dasar dan membuat grafik.
- Aku bisa menyimpan berkas dalam format yang dapat dibuka di perangkat lain.

## Kunci dan petunjuk

**Kegiatan 2 (cek hitungan).** Jumlah 442; rata-rata 442 / 6 = 73,67 (73,666...); minimum 58; maksimum 91. Status: Murid-01 Remedial (70), Murid-02 Tuntas (82), Murid-03 Tuntas (91), Murid-04 Remedial (58), Murid-05 Tuntas (77), Murid-06 Remedial (64).

**Latihan 1.** a dokumen; b lembar kerja; c presentasi.

**Latihan 2.** Masalah: (1) struktur tidak terbaca perangkat sehingga daftar isi otomatis tidak bisa dibuat; (2) bila ukuran atau perangkat berubah, tata letak rusak. Perbaikan: pakai gaya judul dan rata tengah dari pengaturan paragraf.

**Latihan 3.** `=SUM(B2:B7)` = 442; `=AVERAGE(B2:B7)` = 73,67; `=MIN(B2:B7)` = 58; `=MAX(B2:B7)` = 91; `=COUNTIF(B2:B7,">=75")` = 3 (82, 91, 77).

**Latihan 4.** `=IF(B2>=75,"Tuntas","Remedial")`; untuk 70 hasilnya "Remedial".

**Latihan 5.** Sumbu yang dipotong membuat selisih terlihat jauh lebih besar daripada kenyataannya; panjang batang tidak lagi sebanding dengan nilai. Mulailah sumbu dari 0 untuk grafik batang.

**Latihan 6.** Misalnya: ringkas menjadi butir pendek; satu gagasan per slide; perbesar huruf; naikkan kontras dengan teks gelap; tambahkan gambar atau diagram.

**Latihan 7.** Laporan: PDF. Lembar kerja: format terbuka atau format umum yang didukung bersama (atau CSV bila hanya data tanpa rumus).

**Kuis.**

1. Saat mengolah, menghitung, atau membuat grafik dari angka.
2. Memberi struktur yang terbaca perangkat dan memungkinkan daftar isi serta tata letak yang konsisten.
3. Rentang sel dari B2 sampai B6.
4. Satu gagasan per slide; kontras cukup (juga sedikit teks).
5. Menghargai pembuat dan menunjukkan sumber serta izin pemakaian.
6. PDF.

## Langkah berikutnya

Dengan modul ini blok fondasi selesai. Berikutnya kamu memilih jalur pemrograman sesuai silabus. Kuis formatif tiap modul fondasi dirangkum dalam asesmen minggu 14 semester ini.
