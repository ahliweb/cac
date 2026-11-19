## Untuk siapa modul ini

Modul ini untuk murid kelas X jalur D (kecerdasan buatan dan analisis data), untuk minggu `D-X2-M7` silabus v1.3: mengevaluasi klasifikasi. Prasyarat: modul `d-x2-m6` (klasifikasi: pohon keputusan dan tetangga terdekat). Alat: kertas untuk hitungan; Orange Data Mining (widget Confusion Matrix) untuk memeriksa, tanpa pemrograman dan tanpa akun.

Modul ini berstatus DRAF: karangan penyusun, belum ditinjau pemilik. Jalur D adalah pengayaan di luar rumusan capaian pembelajaran (CP); minggu ini tidak punya irisan pengayaan, jadi modul ini tidak dihitung memenuhi butir CP mana pun.

Aturan jalur D yang berlaku: data hanya sintetis (karangan) atau terbuka dengan lisensi jelas, tanpa data yang bisa mengenali orang; wajah, suara, dan foto orang tidak dipakai sebagai data; AI generatif boleh dipakai dengan etika dan dicatat, tanpa data pribadi, kata sandi, atau tugas bernilai pada permintaanmu, dan kamu tidak wajib punya akun. Saran: jawab dulu sendiri, baru minta AI memberi petunjuk bertahap. Setiap soal `Latihan` bertanda `AI: boleh` atau `AI: tanpa AI`.

Catatan untuk guru: matriks pada `sumur.csv` dihitung penyusun dengan pustaka Orange 3.41.0 (pengaturan seperti `d-x2-m6`, per 2026-11). Antarmuka grafis tidak dijalankan penyusun, jadi tampilan widget `[belum terverifikasi]`; menurut dokumentasi widget Confusion Matrix, baris adalah kelas sebenarnya dan kolom kelas tebakan.

## Ingat kembali

Jawab dari ingatan, baru cek di bagian kunci.

1. Apa yang wajib ada di laporan hasil model selain angka ketepatan? (dari `d-x1-m13`)
2. Mengapa jenis kesalahan perlu dilaporkan, bukan hanya ketepatan? (dari `d-x1-m13`)
3. Apa yang membuat dua model pantas dibandingkan secara adil? (dari `d-x2-m6`)
4. Apa yang dihitung garis regresi linear dan bagaimana ia dipakai memprediksi? (dari `d-x2-m4`)

## Tujuan

Setelah modul ini kamu dapat:

- membaca matriks kebingungan: baris adalah kelas sebenarnya, kolom adalah kelas tebakan, diagonal adalah yang benar;
- menghitung ketepatan dari diagonal dan membandingkannya dengan tebakan mayoritas;
- membedakan positif palsu dan negatif palsu serta menyebut dampak masing-masing pada sebuah kasus;
- menulis matriks beranotasi yang menyebut apa arti tiap sel bagi orang yang terkena keputusannya.

Keluaran yang diminta silabus: matriks beranotasi.

## Prediksi dulu

Sebuah saringan pesan fiktif memeriksa 20 pesan karangan. Kelas yang dicari, disebut **positif**, adalah `spam`. Berikut daftar nomor pesan, kelas sebenarnya, dan tebakan saringan (`S` spam, `B` bukan spam):

```text
 1 S->S    2 B->B    3 B->B    4 B->B    5 B->B
 6 B->B    7 S->B    8 B->B    9 B->B   10 B->B
11 B->B   12 S->S   13 B->B   14 B->B   15 B->S
16 B->B   17 B->B   18 S->B   19 B->B   20 B->B
```

Tebak dan tulis: (1) berapa dari 20 tebakan yang benar, (2) berapa spam yang tertangkap, dan (3) apakah saringan ini layak dipakai.

## Contoh terselesaikan

**Matriks kebingungan.** Susun dari daftar: baris adalah sebenarnya, kolom tebakan.

| | tebakan spam | tebakan bukan spam |
| --- | --- | --- |
| **sebenarnya spam** (4) | 2 (positif benar, TP) | 2 (negatif palsu, FN) |
| **sebenarnya bukan spam** (16) | 1 (positif palsu, FP) | 15 (negatif benar, TN) |

Diagonal (TP + TN) = 2 + 15 = 17, jadi ketepatan = 17 / 20 = **0,85**. Tebakan mayoritas (selalu `bukan spam`) benar 16 dari 20 = **0,80**, hanya 5 poin persen di bawahnya. Jenis kesalahan:

- **Positif palsu (FP):** bukan spam tetapi ditandai spam: 1 pesan, yang kini masuk folder spam.
- **Negatif palsu (FN):** spam tetapi lolos: 2 dari 4. Spam tertangkap hanya 2 dari 4 = 0,50.
- Dari 3 pesan yang ditandai spam, yang benar spam 2 = 0,67.

Ketepatan 0,85 tampak tinggi, tetapi separuh spam lolos. Pada data timpang (4 spam dari 20) ketepatan mudah menyesatkan. Tanyakan: kesalahan jenis mana yang lebih mahal?

**Matriks beranotasi pada `sumur.csv`** (data latih dan uji seperti `d-x2-m6`; positif = `tidak_layak`, karena itu yang ingin dikenali; 12 baris uji, dihitung penyusun):

| Model | TP | FN | FP | TN | Ketepatan |
| --- | --- | --- | --- | --- | --- |
| pohon (bawaan) | 6 | 3 | 0 | 3 | 0,750 |
| kNN, k = 5, jarak mentah | 9 | 0 | 1 | 2 | 0,917 |
| tebakan mayoritas (selalu `tidak_layak`) | 9 | 0 | 3 | 0 | 0,750 |

Pohon dan tebakan mayoritas sama-sama 0,750, tetapi **jenis kesalahannya berlawanan**. Pohon memberi `layak` pada 3 contoh yang sebenarnya `tidak_layak`: negatif palsu, berbahaya karena air buruk dianggap aman. Tebakan mayoritas keliru pada 3 contoh `layak` yang ditandai `tidak_layak`: positif palsu, yang hanya membuat air bagus dibuang. Pada pustaka Orange, matriks disusun dengan baris sebenarnya dan kolom tebakan, urutan kelas `layak` lalu `tidak_layak`; untuk pohon hasilnya `[[3, 0], [3, 6]]` (baris pertama sebenarnya `layak`: 3 ditebak `layak`, 0 `tidak_layak`; baris kedua sebenarnya `tidak_layak`: 3 ditebak `layak`, 6 `tidak_layak`).

Anotasi singkat untuk pohon: "TP 6: air buruk dikenali. FN 3: air buruk lolos, berbahaya. FP 0: tidak ada air bagus yang dibuang. TN 3: air bagus diterima." Data karangan dan kecil: ini contoh membaca matriks, bukan bukti tentang model.

## Contoh setengah jadi

Sebuah sistem fiktif mendeteksi komponen `rusak` (positif). Dari 30 komponen uji: sebenarnya `rusak` ada 5, ditebak `rusak` 3 dan ditebak `normal` 2; sebenarnya `normal` ada 25, ditebak `rusak` 4 dan ditebak `normal` 21.

1. TP = ____, FN = ____, FP = ____, TN = ____.
2. Ketepatan = (____ + ____) / 30 = ____.
3. Tebakan mayoritas (selalu `normal`) benar ____ dari 30 = ____. Mana yang lebih tinggi?
4. Komponen `rusak` yang tertangkap = ____ dari 5 = ____.
5. Walau ketepatannya lebih rendah dari tebakan mayoritas, mengapa sistem ini mungkin tetap berguna? ____

## Soal susun urutan

Ini versi tanpa kode dari soal Parsons: susun langkah acak menjadi urutan mengevaluasi sebuah penggolong.

```text
(a) tentukan kelas positif, yaitu yang ingin dikenali
(b) isi matriks dari daftar kelas sebenarnya dan tebakan
(c) hitung ketepatan dari diagonal dan bandingkan dengan tebakan mayoritas
(d) hitung FN dan FP dan tulis akibat tiap jenis kesalahan
(e) putuskan apakah model dipakai, diperbaiki, atau ditolak
```

## Latihan

1. **Isi matriks.** (`AI: tanpa AI`) kNN jarak mentah pada 12 baris uji `sumur.csv` hanya salah di baris 32 (sebenarnya `layak`, ditebak `tidak_layak`). Dengan positif = `tidak_layak`, tulis TP, FN, FP, TN, dan ketepatannya.
2. **Pohon.** (`AI: tanpa AI`) Matriks pohon di Orange `[[3, 0], [3, 6]]`. Tulis TP, FN, FP, TN, hitung ketepatan, lalu jelaskan dampak FN pada kasus air sumur dan bandingkan dengan tebakan mayoritas.
3. **Dengan Orange.** (`AI: boleh`) Bangun alur dari `d-x2-m6` lalu sambungkan Test and Score (Test on test data) ke Confusion Matrix. Pilih sel FN dan lihat baris mana yang salah. Cocokkan hasilmu dengan tabel.
4. **Matriks beranotasi.** (`AI: boleh`) Pilih satu model dan tulis satu kalimat dampak untuk tiap sel (TP, FN, FP, TN) pada kasus air sumur fiktif.
5. **Catatan pemakaian AI (opsional).** Bila memakai asisten AI, catat alat, tujuan, garis besar perintah, bagian yang dipakai, dan cara memeriksanya.

## Latihan bercampur

1. Dari `d-x2-m6`: kNN berjarak mentah 0,917 dan pohon 0,750 pada data uji. Setelah membaca matriks, apa perbedaan yang tidak terlihat dari ketepatan saja?
2. Dari `d-x2-m2`: "`lulus` ditolak keliru" pada NilaiKilat termasuk positif palsu atau negatif palsu, bila `lulus` dianggap positif?
3. Dari `d-x1-m13`: tambahkan dua hal yang wajib ada di laporan klasifikasi selain ketepatan, berdasarkan modul ini.

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `d-x2-m8` (sekitar satu minggu lagi), `d-x2-m10` (sekitar tiga minggu lagi), dan modul jalur D kelas XI semester 1 pada minggu `D-XI1-M1` (sekitar delapan minggu lagi). Jawab sekarang lalu simpan.

1. Bagaimana membaca matriks kebingungan: baris, kolom, dan diagonal?
2. Apa beda positif palsu dan negatif palsu, dan mengapa dampaknya bisa berbeda?
3. Mengapa ketepatan tinggi bisa menyesatkan pada data yang timpang?

## Kesalahan umum

- **"Ketepatan tinggi berarti semua jenis kesalahan jarang."** Dua model dengan ketepatan sama bisa punya jenis kesalahan yang sangat berbeda (pohon dan tebakan mayoritas di atas).
- **"Positif berarti hal yang baik."** Positif hanyalah kelas yang sedang dicari; pada air sumur, positif adalah `tidak_layak`.
- **"Baris dan kolom boleh tertukar."** Pada Orange baris adalah kelas sebenarnya dan kolom kelas tebakan.

## Cek mandiri

- [ ] Saya dapat membaca baris, kolom, dan diagonal matriks kebingungan.
- [ ] Saya dapat menghitung TP, FN, FP, TN dari daftar sebenarnya dan tebakan.
- [ ] Saya menyebut dampak positif palsu dan negatif palsu pada kasus yang dibahas.
- [ ] Saya membandingkan ketepatan dengan tebakan mayoritas.
- [ ] Saya mencatat pemakaian AI bila saya memakainya.

## Kunci dan petunjuk

**Ingat kembali.** 1: pembanding tebakan mayoritas, ketepatan latih dan uji, jenis kesalahan, dan keterbatasan. 2: kesalahan bisa berbeda dampaknya; satu jenis bisa jauh lebih merugikan walaupun ketepatannya sama. 3: data latih, data uji, ukuran, dan pembanding yang sama. 4: garis lurus yang merangkum hubungan fitur dengan angka target; masukkan nilai fitur ke rumus untuk memprediksi.

**Prediksi dulu.** Tebakan bebas; hasil penyusun: 17 dari 20 benar (0,85); 2 dari 4 spam tertangkap; layak atau tidaknya bergantung pada dampak kesalahan, dan 0,85 hanya 5 poin di atas tebakan mayoritas (0,80).

**Contoh setengah jadi.** 1: TP 3, FN 2, FP 4, TN 21. 2: (3 + 21) / 30 = 24 / 30 = 0,80. 3: 25 dari 30 = 0,833; tebakan mayoritas lebih tinggi. 4: 3 dari 5 = 0,60. 5: karena tebakan mayoritas tidak menangkap satu pun komponen rusak, sedangkan sistem ini menangkap 3 dari 5; bila meloloskan komponen rusak mahal, sistem ini berguna walau mengeluarkan 4 peringatan palsu.

**Soal susun urutan.** a, b, c, d, e.

**Latihan.** 1: TP 9, FN 0, FP 1, TN 2; ketepatan (9 + 2) / 12 = 0,917. 2: TP 6, FN 3, FP 0, TN 3; ketepatan 9 / 12 = 0,750; FN berarti air buruk dianggap layak (berbahaya); tebakan mayoritas sama-sama 0,750 tetapi FN-nya 0 dan FP-nya 3, jadi lebih aman pada kasus ini walau kurang berguna. 3: bila berbeda, periksa pengaturan, pembagian baris, dan versi widget. 4: contoh: TP: air buruk dikenali dan dibuang; FN: air buruk lolos dan membahayakan; FP: air bagus dibuang; TN: air bagus dipakai. 5: opsional.

**Latihan bercampur.** 1: kNN tidak meloloskan air buruk (FN 0) tetapi membuang 1 air bagus (FP 1); pohon meloloskan 3 air buruk. 2: bila `lulus` positif, menolak keliru berarti `lulus` ditebak `ulang`: negatif palsu. 3: contoh: matriks kebingungan dan jenis kesalahan dengan dampaknya, ukuran data uji.

**Ulang berjarak.** 1: baris adalah kelas sebenarnya, kolom kelas tebakan, diagonal adalah tebakan yang benar. 2: positif palsu: ditandai padahal bukan; negatif palsu: lolos padahal seharusnya ditandai; dampaknya berbeda menurut kasus (air buruk lolos lebih berbahaya daripada air bagus dibuang). 3: karena model yang selalu menjawab kelas terbanyak sudah tinggi tanpa menangkap kelas langka.

## Langkah berikutnya

Modul berikut: `d-x2-m8` (pengelompokan tanpa label), tempat kamu mengelompokkan data tanpa jawaban. Bacaan pendamping: `matkom-himpunan-relasi-fungsi` untuk gagasan himpunan dan hubungan.

## Rujukan

- Orange Data Mining: widget Confusion Matrix. <https://orangedatamining.com/widget-catalog/evaluate/confusionmatrix/>
- Orange Data Mining: widget Test and Score. <https://orangedatamining.com/widget-catalog/evaluate/testandscore/>
- Panduan Mata Pelajaran Informatika, Fase D – F, 2025. <https://repositori.kemendikdasmen.go.id/33634/1/32.%20Panduan%20Mata%20Pelajaran%20Informatika.pdf>
