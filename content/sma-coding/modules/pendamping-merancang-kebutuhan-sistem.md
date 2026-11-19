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

## Ingat kembali

Tutup catatanmu dan tulis jawaban singkat sebelum membaca lanjut.

1. Sebutkan fungsi CPU, memori, dan penyimpanan. (`FND-X1-M1`)
2. Apa beda memori dan penyimpanan?
3. Apa yang tertera pada spesifikasi sebuah laptop yang bisa kamu baca?
4. Sebutkan tiga tahap siklus input-proses-output.

Cocokkan: (1) CPU memproses instruksi, memori menyimpan sementara yang sedang dipakai, penyimpanan menyimpan lama; (2) memori cepat dan sementara, penyimpanan lebih lambat dan tetap ada saat dimatikan; (3) misalnya jenis prosesor, ukuran memori dan penyimpanan, layar, daya tahan baterai, dan port; (4) masukan, proses, keluaran. Bila ada yang meleset, baca ulang catatan `FND-X1-M1`.

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

Asisten AI generatif boleh membantu menyusun pertanyaan atau membandingkan opsi (kebijakan AI silabus v1.3 bagian 7.4). Perlakukan angka dan spesifikasi dari AI sebagai klaim yang perlu dicek ke sumber bertanggal, dan jangan memasukkan data pribadi pengguna ke layanan AI.

## Prediksi dulu

Sebelum membaca contoh terpandu, baca hanya profil dan tabel kebutuhan "Kios Contoh" di bawah (tutup bagian "Rancangan" dan "Pembenaran"), lalu tulis dulu rancanganmu: perangkat apa yang kamu pilih untuk memenuhi tiap kebutuhan wajib, dan satu hal yang kamu korbankan. Simpan; kamu akan membandingkannya dengan rancangan yang diberikan.

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

**Rancangan (bandingkan dengan tebakanmu).** Dua laptop berdaya tahan baterai baik (menjawab kebutuhan listrik padam dan dipakai di rumah), aplikasi lembar kerja dan pengolah dokumen, aplikasi sederhana untuk mengubah ukuran foto, satu pencetak, satu penyimpanan eksternal untuk cadangan, dan satu perute Wi-Fi dengan kata sandi kuat.

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

Contoh terpandu di atas lengkap dengan pembenarannya. Kasus 1 sampai 3 di bawah memudar: kamu mengerjakan semua langkah sendiri, dengan petunjuk jawaban sebagai pembanding.

## Kegiatan mandiri terbimbing

Kerjakan di kertas. Semua pengguna fiktif; tidak ada wawancara dengan orang sungguhan dan tidak ada data pribadi.

**Kasus 1 (perpustakaan kecil fiktif).** "Perpustakaan Contoh" memerlukan satu komputer untuk mencatat peminjaman buku oleh banyak petugas bergantian dan satu pemindai kode batang. Tulis profil, minimal enam kebutuhan (tandai wajib atau diinginkan), dan rancangan spesifikasi.

**Kasus 2 (siswa fiktif).** Tokoh karangan "Tokoh Contoh" akan belajar pemrograman dan menggambar sketsa digital, dan sering membawa perangkat ke sekolah. Tulis kebutuhan fungsional, lingkungan, dan anggaran terbatas, lalu bandingkan dua opsi.

**Kasus 3 (kantor desa fiktif).** "Kantor Contoh" memiliki listrik yang kadang padam dan jaringan lambat. Tuliskan kebutuhan keamanan data, cadangan, dan jaringan, serta satu pilihan yang meminimalkan risiko.

**Kasus 4 (uji kebutuhan).** Ambil satu kebutuhan dari Kasus 1 yang kabur (misalnya "komputer cepat") dan tulis ulang menjadi kalimat yang dapat diperiksa.

**Kasus 5 (wawancara tiruan).** Tulis lima pertanyaan yang akan kamu ajukan kepada pengguna fiktif dari Kasus 2 untuk menggali kebutuhan. Latihan ini hanya menulis pertanyaan, tidak mewawancarai siapa pun.

## Petunjuk jawaban

Jawaban kasus berbentuk rancangan, jadi cocokkan dengan kriteria, bukan jawaban tunggal.

- **Kasus 1.** Profil memuat: banyak petugas bergantian, tidak semua mahir, ruang ramai. Kebutuhan wajib contoh: mencatat peminjaman, memakai pemindai kode batang, akun terpisah per petugas, cadangan data peminjaman. Diinginkan: tetap hidup saat listrik padam sebentar. Rancangan contoh: satu komputer tingkat dasar, pemindai yang cocok dengan sistem operasinya, akun terpisah, cadangan terjadwal ke penyimpanan terpisah, kunci layar. Periksa: setiap pilihan terkait ke satu kebutuhan, dan minimal enam kebutuhan tertulis dengan prioritas.
- **Kasus 2.** Kebutuhan fungsional: menulis program dan menggambar sketsa; lingkungan: sering dibawa (bobot dan baterai penting); anggaran terbatas. Dua opsi dibandingkan dengan kriteria yang sama, dan setiap opsi menyebut apa yang dikorbankan.
- **Kasus 3.** Kebutuhan kunci: data tidak hilang saat listrik padam (simpan berkala, cadangan di tempat terpisah), kerja tanpa bergantung pada jaringan lambat (aplikasi yang bekerja luring), keamanan data (kunci layar, akun terpisah). Pilihan contoh: laptop berbaterai ditambah cadangan luring terjadwal; risiko utama: cadangan lupa dijalankan, jadi beri jadwal tertulis.
- **Kasus 4.** Contoh tulis ulang: "komputer cepat" menjadi "membuka lembar kerja peminjaman buku dalam waktu kurang dari lima detik". Kalimat yang dapat diperiksa memuat apa yang diukur, kondisinya, dan batasnya.
- **Kasus 5.** Pertanyaan yang baik terbuka dan tentang pemakaian: apa yang paling sering dikerjakan, di mana dan berapa lama, apa yang sekarang paling mengganggu, apa batasan anggaran, apa yang tidak boleh hilang. Pertanyaan "mau laptop merek apa" menanyakan solusi, bukan kebutuhan.

## Latihan bercampur

Tentukan tiap kalimat fiktif sebagai kebutuhan (sebutkan jenisnya) atau spesifikasi, dan tulis ulang yang kabur.

- (a) "Laptop menyala sampai 8 jam tanpa pengisian."
- (b) "Beli laptop dengan memori besar."
- (c) "Data klien tidak boleh hilang."
- (d) "Pakai penyimpanan yang cepat."
- (e) "Komputer yang bagus."
- (f) "Dipakai di ruangan tanpa pendingin udara."

Petunjuk jawaban: (a) kebutuhan (kinerja atau lingkungan), dapat diperiksa; (b) spesifikasi tanpa kebutuhan, tanyakan "untuk apa?"; (c) kebutuhan keamanan, diterjemahkan menjadi cadangan terjadwal; (d) spesifikasi, tanyakan kebutuhan yang mendasarinya (misalnya "berkas besar terbuka dalam lima detik"); (e) kabur, tulis ulang menjadi kalimat yang dapat diperiksa; (f) kebutuhan lingkungan, berpengaruh pada pemilihan perangkat yang tahan panas. Bila (b) dan (d) kamu sebut kebutuhan, ingat bahwa kebutuhan menjawab "apa yang harus bisa", spesifikasi menjawab "dengan apa".

## Ulang berjarak

Satu minggu lagi, lalu sebulan lagi, jawab tanpa membuka modul ini lalu cocokkan.

1. Urutkan enam langkah dari kebutuhan ke spesifikasi.
2. Sebutkan enam jenis kebutuhan dan satu contoh tiap jenis.
3. Mengapa pilihan tanpa kebutuhan adalah pemborosan dan kebutuhan tanpa pilihan adalah kekurangan?

## Daftar periksa mandiri

Isi untuk dirimu sendiri; tanpa nilai dan tidak dikumpulkan.

- [ ] Saya dapat membedakan kebutuhan dari spesifikasi.
- [ ] Saya dapat menulis kebutuhan yang dapat diperiksa dan memberi prioritas.
- [ ] Saya dapat menautkan setiap pilihan perangkat ke satu kebutuhan.
- [ ] Saya dapat membandingkan dua opsi dan menyebut kompromi masing-masing.
- [ ] Saya menyadari batasan anggaran, listrik, dan perawatan.
- [ ] Saya tahu bahwa kebutuhan keamanan dan cadangan termasuk kebutuhan sistem.

Daftar periksa ini penilaian dirimu, dan penilaian diri sering lebih yakin daripada kenyataan. Yang menunjukkan penguasaan sebenarnya adalah jawabanmu pada Latihan bercampur dan Ulang berjarak.

## Rujukan

- Panduan Mata Pelajaran Informatika, Fase D – F, 2025: sumber kutipan butir CP di atas.
- Materi blok fondasi `FND-X1-M1` pada repositori ini (membaca spesifikasi komputer).

## Catatan untuk guru

- Jangan meminta siswa mewawancarai orang sungguhan atau menyerahkan data pribadi; seluruh kegiatan memakai pengguna fiktif.
- Jangan menyebut merek atau harga nyata yang cepat basi; bila perlu, biarkan siswa mencari sendiri dan mencatat sumber serta tanggal.
- Dapat dikerjakan bersama guru Ekonomi atau Prakarya (opsi lintas mata pelajaran).
- Ketercapaian dicek lewat petunjuk jawaban, Latihan bercampur, dan Ulang berjarak; daftar periksa mandiri hanyalah penilaian diri. Ingat kembali, Prediksi dulu, dan Latihan bercampur menambah sekitar 15 menit; bila waktu pendek, berikan Ingat kembali dan Ulang berjarak sebagai tugas rumah tanpa nilai. Tidak ada data siswa yang disimpan di repositori ini.
