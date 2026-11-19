## Untuk siapa modul ini

Modul ini untuk murid kelas X jalur D (kecerdasan buatan dan analisis data), untuk minggu `D-X2-M3` silabus v1.3: privasi dan data pribadi. Prasyarat: modul `d-x2-m2` dan `fondasi-keamanan-dasar`. Kegiatannya memakai kertas dan tabel, tanpa pemrograman dan tanpa akun.

Modul ini berstatus DRAF: karangan penyusun, belum ditinjau pemilik. Jalur D adalah pengayaan di luar rumusan capaian pembelajaran (CP). Minggu ini beririsan dengan butir `F-LD-g` (pelindungan data pribadi, UU ITE, dan ketentuan pidana siber dalam KUHP, sebatas pokok) dan `E-LD-l` (privasi pada layanan AI daring), keduanya pada tingkat rendah; irisan itu **tidak dihitung** sebagai pemenuhan CP.

Aturan jalur D yang berlaku: data hanya sintetis (karangan) atau terbuka dengan lisensi jelas, tanpa data yang bisa mengenali orang; wajah, suara, dan foto orang tidak dipakai sebagai data; AI generatif boleh dipakai dengan etika dan dicatat, tanpa data pribadi, kata sandi, atau tugas bernilai pada permintaanmu, dan kamu tidak wajib punya akun. Saran: jawab dulu sendiri, baru minta AI memberi petunjuk bertahap. Setiap soal `Latihan` bertanda `AI: boleh` atau `AI: tanpa AI`.

Catatan untuk guru: bagian hukum memuat pokok yang dibaca penyusun dari naskah UU Nomor 27 Tahun 2022 (Pasal 4, 5 sampai 13, 20, dan 25; per 2026-11); ini bukan nasihat hukum dan peraturan pelaksana tidak dibahas. Wilayah dan data karangan. Ketentuan penyimpanan data tiap layanan AI berbeda dan berubah `[belum terverifikasi]`; bacalah pada layanan yang dipakai.

## Ingat kembali

Jawab dari ingatan, baru cek di bagian kunci.

1. Kolom apa yang tidak boleh dikumpulkan karena memuat data pribadi, dan mengapa? (dari `d-x1-m9`)
2. Apa itu fitur dan apa itu label? Beri contoh. (dari `d-x1-m9`)
3. Apa yang perlu ada bila sistem otomatis memberi keputusan yang merugikan seseorang? (dari `d-x2-m2`)
4. Sebutkan dua ciri kata sandi yang kuat. (dari `fondasi-keamanan-dasar`)

## Tujuan

Setelah modul ini kamu dapat:

- membedakan data pribadi yang langsung mengenali seseorang, yang mengenali lewat kombinasi, dan yang bersifat spesifik (lebih berisiko);
- menandai data pribadi pada contoh fiktif dan menghitung berapa baris menjadi satu-satunya pemilik sebuah kombinasi kolom;
- menjelaskan risiko menaruh data pribadi pada layanan AI daring;
- menyebut dua hak pemilik data pribadi dan satu dasar pemrosesan menurut pokok UU;
- menyusun daftar periksa privasi.

Keluaran yang diminta silabus: daftar periksa privasi.

## Prediksi dulu

Tabel karangan `klub.csv` berisi 12 anggota sebuah klub sains fiktif. Tidak ada kolom nama. Wilayah Mawar, Melati, dan Anggrek adalah karangan.

```text
wilayah,tahun_lahir,jenis_kelamin
Mawar,2009,P
Mawar,2009,L
Mawar,2010,P
Melati,2009,P
Melati,2009,P
Melati,2010,L
Anggrek,2008,L
Anggrek,2009,P
Anggrek,2009,L
Anggrek,2010,P
Mawar,2009,P
Melati,2010,P
```

Bayangkan seseorang tahu wilayah, tahun lahir, dan jenis kelamin temanmu, tanpa namanya. Tebak dan tulis: (1) dari 12 baris, berapa yang dapat ia tunjuk sebagai satu baris saja, dan (2) apakah tabel tanpa nama itu aman disebarkan.

## Contoh terselesaikan

**Bagian 1: menandai data.** Contoh sebuah formulir fiktif beserta penandaannya. "Umum" dan "spesifik" mengikuti Pasal 4 UU Nomor 27 Tahun 2022; "langsung" dan "kombinasi" istilah belajar modul ini.

| Isi formulir | Jenis | Masuk ke layanan AI daring? |
| --- | --- | --- |
| nama lengkap | umum; langsung mengenali | tidak |
| foto wajah | spesifik (data biometrik); langsung | tidak |
| nomor telepon | langsung mengenali | tidak |
| alamat surel | langsung mengenali | tidak |
| catatan alergi | spesifik (data kesehatan) | tidak |
| jenis kelamin | umum; berperan dalam kombinasi | hanya bila tidak digabung dengan penanda lain |
| wilayah dan tahun lahir | kombinasi: bersama-sama bisa mengenali | hati-hati; hitung dulu baris uniknya |
| hobi (misalnya "astronomi") | sendirian jarang mengenali, tetapi menambah kombinasi | boleh bila kolom lain aman |

Pasal 4 menyebut data spesifik antara lain kesehatan, biometrik, genetika, catatan kejahatan, dan data anak; data umum antara lain nama lengkap, jenis kelamin, agama, status perkawinan, dan data yang dikombinasikan untuk mengidentifikasi seseorang. Penjelasannya menyebut gambar wajah sebagai contoh data biometrik.

**Bagian 2: menghitung baris unik.** Untuk `klub.csv`, kelompokkan baris yang punya nilai sama pada kolom yang dipilih. Baris disebut unik bila ia satu-satunya anggota kelompoknya.

| Kolom yang dipakai | Banyak kelompok | Baris unik (dari 12) |
| --- | --- | --- |
| wilayah | 3 | 0 |
| jenis_kelamin | 2 | 0 |
| tahun_lahir | 3 | 1 |
| wilayah dan tahun_lahir | 7 | 3 |
| wilayah dan jenis_kelamin | 6 | 2 |
| ketiganya | 10 | 8 |

Dengan ketiga kolom, 8 dari 12 baris (0,667) menjadi satu-satunya pemilik kombinasinya. Satu kolom saja tampak aman; gabungan tiga kolom bisa menunjuk seseorang, jadi "tanpa kolom nama" belum berarti anonim. Pada kelompok kecil risikonya lebih besar.

**Bagian 3: hak dan layanan AI.** Pokok UU yang dibaca penyusun: pemilik data berhak mendapat informasi tentang siapa yang meminta datanya dan untuk apa (Pasal 5), memperbaiki datanya (Pasal 6), mengakses dan mendapat salinan (Pasal 7), mengakhiri pemrosesan atau menghapus (Pasal 8), menarik persetujuan (Pasal 9), dan mengajukan keberatan atas keputusan yang hanya didasarkan pada pemrosesan otomatis yang berdampak signifikan (Pasal 10 ayat 1). Pemrosesan memerlukan dasar, salah satunya persetujuan yang sah secara eksplisit untuk tujuan tertentu (Pasal 20), dan pemrosesan data anak memerlukan persetujuan orang tua atau wali (Pasal 25). Bila NilaiKilat di `d-x2-m2` memutuskan nilaimu sendirian, Pasal 10 menjadi dasar keberatan.

Risiko layanan AI daring: apa yang kamu ketik dikirim ke server penyedia dan bisa tersimpan di luar kendalimu. Karena itu data pribadi, kata sandi, kunci, dan tugas bernilai tidak ditempel ke sana; pakai data karangan.

## Contoh setengah jadi

Tabel karangan kecil berikut memuat 6 baris `(wilayah, tahun_lahir, jenis_kelamin)`: (Mawar, 2009, P), (Mawar, 2009, L), (Melati, 2010, L), (Melati, 2009, P), (Anggrek, 2010, P), (Anggrek, 2010, P).

1. Menurut kolom `wilayah` saja ada ____ kelompok dan ____ baris unik.
2. Menurut `wilayah` dan `tahun_lahir` ada ____ kelompok dan ____ baris unik.
3. Menurut ketiga kolom ada ____ kelompok dan ____ baris unik.
4. Kombinasi mana yang paling mudah dipakai untuk menunjuk seseorang? ____
5. Satu cara mengurangi risikonya tanpa membuang semua kolom: ____

## Soal susun urutan

Ini versi tanpa kode dari soal Parsons: susun langkah acak menjadi urutan menyiapkan data yang aman dipakai.

```text
(a) tentukan tujuan dan kolom minimal yang benar-benar diperlukan
(b) tandai tiap kolom: langsung, kombinasi, atau spesifik
(c) buang atau samarkan kolom yang tidak diperlukan
(d) hitung baris unik pada kombinasi kolom yang tersisa
(e) tulis daftar periksa privasi
```

## Latihan

1. **Daftar periksa privasi.** (`AI: boleh`) Tulis daftar periksa enam butir yang kamu pakai sebelum mengumpulkan data atau memakai layanan AI daring.
2. **Tandai.** (`AI: tanpa AI`) Sebuah pendaftaran lomba robot fiktif menanyakan: nama lengkap, tanggal lahir, alamat rumah, golongan darah, ukuran kaos, dan jenis robot. Tandai mana langsung, kombinasi, spesifik, atau bukan data pribadi, dan kolom mana yang kamu hapus.
3. **Menempel daftar kelas.** (`AI: boleh`) Seorang teman ingin menempelkan daftar kelas beserta nama ke layanan AI daring agar tabelnya dirapikan. Tulis saranmu dan satu cara lain yang aman.
4. **Hak.** (`AI: tanpa AI`) Sebutkan tiga hak pemilik data pribadi menurut pokok UU dan satu situasi karangan untuk salah satunya.
5. **Catatan pemakaian AI (opsional).** Bila memakai asisten AI, catat alat, tujuan, garis besar perintah, bagian yang dipakai, dan cara memeriksanya.

## Latihan bercampur

1. Dari `d-x1-m8`: mengapa wajah dan suara orang tidak dipakai sebagai data latih di jalur ini? Kaitkan dengan penjelasan UU tentang data biometrik.
2. Dari `d-x2-m2`: memeriksa bias butuh kelompok yang cukup besar, tetapi kelompok kecil mudah dikenali. Apa dilemanya dan satu cara menyiasatinya?

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `d-x2-m4` (sekitar satu minggu lagi), `d-x2-m6` (sekitar tiga minggu lagi), dan `d-x2-m11` (sekitar delapan minggu lagi). Jawab sekarang lalu simpan.

1. Apa beda data pribadi yang langsung mengenali dan yang mengenali lewat kombinasi? Beri contoh.
2. Data apa yang tidak boleh ditempel ke layanan AI daring, dan mengapa?
3. Sebutkan dua hak pemilik data pribadi menurut UU Pelindungan Data Pribadi.

## Kesalahan umum

- **"Tanpa kolom nama berarti anonim."** Gabungan wilayah, tahun lahir, dan jenis kelamin bisa menunjuk seseorang; di `klub.csv` 8 dari 12 baris unik.
- **"Data umum tidak perlu dijaga."** Nama dan jenis kelamin tetap data pribadi; yang spesifik berisiko lebih besar, tetapi yang umum tidak bebas.
- **"Layanan AI itu seperti buku catatan pribadiku."** Isian dikirim ke penyedia layanan dan bisa tersimpan di luar kendalimu.

## Cek mandiri

- [ ] Saya dapat membedakan data langsung, kombinasi, dan spesifik.
- [ ] Saya menghitung baris unik sebelum menyebarkan sebuah tabel.
- [ ] Saya tidak menaruh data pribadi, kata sandi, atau kunci ke layanan AI.
- [ ] Saya dapat menyebut dua hak pemilik data pribadi.
- [ ] Saya mencatat pemakaian AI bila saya memakainya.

## Kunci dan petunjuk

**Ingat kembali.** 1: nama, nomor telepon, alamat; karena mengenali orang dan tidak diperlukan model. 2: fitur adalah ciri yang menjadi masukan (mis. `air_ml`); label adalah jawaban yang ingin ditebak (mis. `kondisi`). 3: tinjauan manusia, kemampuan mengajukan keberatan, dan penjelasan alasan. 4: contoh: panjang (frasa sandi) dan unik untuk tiap akun.

**Prediksi dulu.** Tebakan bebas; hasil penyusun: 8 dari 12 baris unik pada gabungan tiga kolom; tabel tanpa nama belum aman.

**Contoh setengah jadi.** 1: 3 kelompok, 0 unik (Mawar 2, Melati 2, Anggrek 2). 2: 4 kelompok (Mawar-2009 dua baris, Melati-2010 satu, Melati-2009 satu, Anggrek-2010 dua baris), 2 unik. 3: 5 kelompok, 3 unik (baris 2, 3, dan 4); Anggrek-2010-P berisi 2 baris. 4: ketiganya. 5: contoh: kasarkan tahun lahir menjadi rentang, atau gabungkan wilayah kecil, atau hapus kolom yang tidak diperlukan.

**Soal susun urutan.** a, b, c, d, e.

**Latihan.** 1: rubrik: tujuan jelas, kolom minimal, tandai data langsung dan spesifik, hitung baris unik, tidak menempel data pribadi atau kata sandi ke layanan AI, catat pemakaian AI. 2: nama lengkap dan alamat rumah: langsung; tanggal lahir: kombinasi (dan data anak); golongan darah: kesehatan, spesifik; ukuran kaos dan jenis robot: bukan data pribadi pada umumnya (bila terhubung ke orang, tetap ikut kombinasi); hapus nama, alamat, tanggal lahir (ganti kelompok umur), dan golongan darah bila tidak perlu. 3: jangan tempel; ganti nama dengan kode karangan atau rapikan tabel dengan program lokal. 4: contoh: mengakses salinan (Pasal 7), memperbaiki (Pasal 6), menarik persetujuan (Pasal 9), mengajukan keberatan atas keputusan otomatis (Pasal 10); situasi karangan: sebuah aplikasi fiktif salah menulis wilayahmu, kamu meminta perbaikan. 5: opsional.

**Latihan bercampur.** 1: wajah dan suara mengenali orang secara unik dan penjelasan UU menyebut gambar wajah sebagai data biometrik, yang termasuk data spesifik. 2: dilema: kelompok besar menyamarkan, kelompok kecil memperkuat statistik tetapi membuka identitas; siasat: gabungkan kelompok kecil atau pakai data karangan.

**Ulang berjarak.** 1: langsung: bisa menunjuk satu orang sendirian (nama, nomor telepon); kombinasi: baru mengenali bila beberapa kolom digabung (wilayah, tahun lahir, jenis kelamin). 2: data pribadi, kata sandi, kunci, dan tugas bernilai, karena dikirim ke server penyedia dan bisa tersimpan di luar kendalimu. 3: contoh: mengakses salinan, memperbaiki, menghapus, menarik persetujuan, atau mengajukan keberatan atas keputusan otomatis.

## Langkah berikutnya

Modul berikut: `d-x2-m4` (regresi: garis kecenderungan), yang memakai data angka sintetis. Bacaan pendamping: `pendamping-transaksi-digital-aman` dan `cloud-keamanan-dan-privasi`.
