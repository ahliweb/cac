## Untuk siapa modul ini

Modul pendamping untuk siswa kelas XII (Fase F), semua jalur. Prasyarat: pengantar perangkat keras di blok fondasi (`FND-X1-M1`: membaca spesifikasi komputer). Perkiraan waktu: sekitar 3 JP, mandiri dengan bimbingan guru bila ada waktu. Siswa jalur B yang mengikuti `B-XII2-M1` dan `B-XII2-M2` membacanya sebagai latihan tambahan tanpa kode; modul ini tidak mengubah minggu wajib mana pun.

Seluruh contoh adalah **kasus tiruan buatan penyusun**: pengguna, organisasi, dan perangkat di sini fiktif. Kamu tidak diminta mewawancarai orang sungguhan, memakai data pribadi, atau membeli apa pun. Modul ini tidak memuat kode C++.

### Butir CP yang dicakup

| Butir | Kutipan CP (Fase F, Literasi Digital) |
| --- | --- |
| F-LD-d | "merancang kebutuhan sistem komputer sesuai kebutuhan pengguna" |

### Tujuan

Setelah mempelajari modul ini, kamu diharapkan bisa:

1. membedakan kebutuhan pengguna dari spesifikasi perangkat;
2. menggali kebutuhan dari profil pengguna fiktif dengan pertanyaan yang tepat;
3. menerjemahkan kebutuhan menjadi spesifikasi sistem (perangkat keras, perangkat lunak, jaringan, anggaran);
4. membandingkan beberapa opsi dan membenarkan pilihan secara tertulis.

## Dari kebutuhan ke spesifikasi

Kesalahan umum: memilih perangkat lebih dulu, baru mencari gunanya. Urutan yang benar:

| Langkah | Pertanyaan | Hasil |
| --- | --- | --- |
| 1. Kenali pengguna | Siapa yang memakai, untuk tugas apa, di mana, berapa orang? | Profil pengguna |
| 2. Tulis kebutuhan | Apa yang harus bisa dilakukan sistem? Mana yang wajib, mana yang diinginkan? | Daftar kebutuhan berprioritas |
| 3. Terjemahkan | Perangkat keras, perangkat lunak, jaringan, dan perangkat tambahan apa yang memenuhinya? | Rancangan spesifikasi |
| 4. Batasi | Berapa anggaran, ruang, daya listrik, dan kemampuan merawat? | Batasan |
| 5. Bandingkan | Opsi mana yang paling pas, dan apa kompromi masing-masing? | Rekomendasi tertulis |
| 6. Periksa kembali | Apakah setiap kebutuhan wajib terpenuhi? | Daftar periksa kebutuhan |

### Jenis kebutuhan

| Jenis | Contoh fiktif |
| --- | --- |
| Fungsional (apa yang dilakukan) | "Mengetik dan mencetak surat", "mengedit video pendek" |
| Kinerja | "Membuka berkas besar tanpa menunggu lama" |
| Lingkungan | "Dipakai di ruang tanpa pendingin udara", "sering dibawa" |
| Keamanan dan privasi | "Data klien tidak boleh hilang", "perlu kunci layar dan cadangan" |
| Kemudahan pemakaian | "Dipakai orang yang baru belajar komputer" |
| Biaya dan perawatan | "Anggaran terbatas, perawatan oleh pengguna sendiri" |

Kebutuhan ditulis sebagai kalimat yang dapat diperiksa ("laptop menyala sampai 8 jam tanpa pengisian"), bukan kata kabur ("laptop bagus").

### Dari kebutuhan ke komponen

| Kebutuhan | Hal yang dilihat pada spesifikasi |
| --- | --- |
| Pengolah dokumen dan peramban | Prosesor tingkat dasar, memori cukup untuk beberapa tab, penyimpanan secukupnya |
| Mengedit gambar atau video | Prosesor dan memori lebih besar, penyimpanan cepat, layar akurat, kartu grafis bila perlu |
| Sering dibawa | Bobot, daya tahan baterai, ketahanan bodi |
| Banyak pengguna bergantian | Akun terpisah, sistem operasi yang mudah dikelola, cadangan |
| Dipakai tanpa internet | Aplikasi yang bekerja luring, penyimpanan lokal cukup |
| Data penting | Cadangan terjadwal, enkripsi penyimpanan, kunci layar |

Kolom kanan memakai istilah umum dari `FND-X1-M1`; modul ini sengaja tidak memberi angka tetap karena spesifikasi berubah cepat. Angka dicari dari sumber yang kamu tentukan sendiri saat mengerjakan kasus.

## Contoh terpandu (fiktif)

**Profil.** "Kios Contoh" adalah usaha fiktif dengan tiga karyawan yang mencatat penjualan, membuat nota, dan mengunggah foto produk ke etalase daring. Anggaran fiktif: cukup untuk dua perangkat dan satu pencetak.

| Kebutuhan | Prioritas |
| --- | --- |
| Mencatat penjualan harian dan membuat nota | Wajib |
| Mencetak nota | Wajib |
| Mengambil dan mengubah ukuran foto produk | Wajib |
| Cadangan data penjualan | Wajib |
| Bekerja saat listrik padam sebentar | Diinginkan |
| Dipakai di rumah | Diinginkan |

**Rancangan.** Dua laptop berdaya tahan baterai baik (menjawab kebutuhan listrik padam dan dipakai di rumah), aplikasi lembar kerja dan pengolah dokumen, aplikasi sederhana untuk mengubah ukuran foto, satu pencetak, satu penyimpanan eksternal untuk cadangan, dan satu perute Wi-Fi dengan kata sandi kuat.

**Pembenaran.** Foto produk hanya perlu diubah ukurannya, bukan disunting berat, sehingga komputer berspesifikasi tertinggi tidak diperlukan; dana yang dihemat dipakai untuk cadangan dan baterai.

Perhatikan bahwa setiap pilihan ditautkan ke satu kebutuhan. Pilihan tanpa kebutuhan adalah pemborosan; kebutuhan tanpa pilihan adalah kekurangan.

## Membandingkan opsi

Sajikan paling sedikit dua opsi dan nilai dengan kriteria yang sama:

| Kriteria | Opsi 1 | Opsi 2 |
| --- | --- | --- |
| Memenuhi kebutuhan wajib | ... | ... |
| Biaya awal | ... | ... |
| Biaya perawatan | ... | ... |
| Kemudahan dipakai | ... | ... |
| Peluang dikembangkan | ... | ... |
| Risiko utama | ... | ... |

Tabel ini formulir kosong; isi di kertas. Rekomendasi yang baik menyebut juga apa yang dikorbankan.

## Kegiatan mandiri terbimbing

Kerjakan di kertas. Semua pengguna fiktif; tidak ada wawancara dengan orang sungguhan dan tidak ada data pribadi.

**Kasus 1 (perpustakaan kecil fiktif).** "Perpustakaan Contoh" memerlukan satu komputer untuk mencatat peminjaman buku oleh banyak petugas bergantian dan satu pemindai kode batang. Tulis profil, minimal enam kebutuhan (tandai wajib atau diinginkan), dan rancangan spesifikasi.

**Kasus 2 (siswa fiktif).** Tokoh karangan "Tokoh Contoh" akan belajar pemrograman dan menggambar sketsa digital, dan sering membawa perangkat ke sekolah. Tulis kebutuhan fungsional, lingkungan, dan anggaran terbatas, lalu bandingkan dua opsi.

**Kasus 3 (kantor desa fiktif).** "Kantor Contoh" memiliki listrik yang kadang padam dan jaringan lambat. Tuliskan kebutuhan keamanan data, cadangan, dan jaringan, serta satu pilihan yang meminimalkan risiko.

**Kasus 4 (uji kebutuhan).** Ambil satu kebutuhan dari Kasus 1 yang kabur (misalnya "komputer cepat") dan tulis ulang menjadi kalimat yang dapat diperiksa.

**Kasus 5 (wawancara tiruan).** Tulis lima pertanyaan yang akan kamu ajukan kepada pengguna fiktif dari Kasus 2 untuk menggali kebutuhan. Latihan ini hanya menulis pertanyaan, tidak mewawancarai siapa pun.

## Daftar periksa mandiri

Isi untuk dirimu sendiri; tanpa nilai dan tidak dikumpulkan.

- [ ] Saya dapat membedakan kebutuhan dari spesifikasi.
- [ ] Saya dapat menulis kebutuhan yang dapat diperiksa dan memberi prioritas.
- [ ] Saya dapat menautkan setiap pilihan perangkat ke satu kebutuhan.
- [ ] Saya dapat membandingkan dua opsi dan menyebut kompromi masing-masing.
- [ ] Saya menyadari batasan anggaran, listrik, dan perawatan.
- [ ] Saya tahu bahwa kebutuhan keamanan dan cadangan termasuk kebutuhan sistem.

## Rujukan

- Panduan Mata Pelajaran Informatika, Fase D – F, 2025: sumber kutipan butir CP di atas.
- Materi blok fondasi `FND-X1-M1` pada repositori ini (membaca spesifikasi komputer).

## Catatan untuk guru

- Jangan meminta siswa mewawancarai orang sungguhan atau menyerahkan data pribadi; seluruh kegiatan memakai pengguna fiktif.
- Jangan menyebut merek atau harga nyata yang cepat basi; bila perlu, biarkan siswa mencari sendiri dan mencatat sumber serta tanggal.
- Dapat dikerjakan bersama guru Ekonomi atau Prakarya (opsi lintas mata pelajaran).
- Ketercapaian dicek lewat daftar periksa mandiri; tidak ada data siswa yang disimpan di repositori ini.
