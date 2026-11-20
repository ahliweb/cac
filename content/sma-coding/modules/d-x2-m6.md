## Untuk siapa modul ini

Modul ini untuk murid kelas X jalur D (kecerdasan buatan dan analisis data), untuk minggu `D-X2-M6` silabus v1.3: klasifikasi dengan pohon keputusan dan tetangga terdekat (kNN). Prasyarat: modul `d-x2-m5` (galat dan kelebihan-suai). Alat: Orange Data Mining, tanpa pemrograman dan tanpa akun. Bila Orange belum terpasang, hitungan kNN di kertas tetap bisa dikerjakan.

Modul ini karangan penyusun dan disetujui pemilik program pada 2026-11-20 (keputusan lewat dialog; catatan tinjauan menjadi tindak lanjut revisi). Jalur D adalah pengayaan di luar rumusan capaian pembelajaran (CP); minggu ini tidak punya irisan pengayaan, jadi modul ini tidak dihitung memenuhi butir CP mana pun.

Aturan jalur D yang berlaku: data hanya sintetis (karangan) atau terbuka dengan lisensi jelas, tanpa data yang bisa mengenali orang; wajah, suara, dan foto orang tidak dipakai sebagai data; AI generatif boleh dipakai dengan etika dan dicatat, tanpa data pribadi, kata sandi, atau tugas bernilai pada permintaanmu, dan kamu tidak wajib punya akun. Saran: jawab dulu sendiri, baru minta AI menjelaskan atau memberi petunjuk bertahap. Setiap soal `Latihan` bertanda `AI: boleh` atau `AI: tanpa AI`.

Catatan untuk guru: angka dihitung penyusun dengan pustaka Orange 3.41.0 (Tree bawaan; kNN dengan k = 5, jarak Euclid, bobot seragam; per 2026-11). Satu hal bergantung versi: dokumentasi widget kNN (dibuka 2026-11) menyebut data dinormalkan secara bawaan, tetapi pada pustaka 3.41.0 kNN **tidak** menormalkan kecuali diminta (dibaca dari kode sumbernya). Karena itu modul melaporkan kedua kemungkinan sebagai bahan belajar; antarmuka grafis tidak dijalankan penyusun, jadi yang terjadi di lab `[belum terverifikasi]`.

## Ingat kembali

Jawab dari ingatan, baru cek di bagian kunci.

1. Bagaimana pohon keputusan sampai pada sebuah label? (dari `d-x1-m12`)
2. Bagaimana mengenali kelebihan-suai dari dua angka galat? (dari `d-x2-m5`)
3. Apa beda data pribadi yang langsung mengenali dan yang mengenali lewat kombinasi? Beri contoh. (dari `d-x2-m3`)
4. Mengapa menilai model pada data latih menyesatkan? (dari `d-x1-m12`)

## Tujuan

Setelah modul ini kamu dapat:

- melatih pohon keputusan dan kNN pada data latih yang sama dan menguji keduanya pada data uji yang sama;
- menjelaskan cara kerja kNN: mencari k titik latih terdekat lalu memilih label terbanyak;
- mengisi tabel perbandingan dua model dan menambahkan tebakan mayoritas sebagai pembanding;
- menjelaskan mengapa selisih satu atau dua baris pada data uji kecil belum membuktikan satu model lebih baik.

Keluaran yang diminta silabus: tabel perbandingan.

## Prediksi dulu

Dataset karangan `sumur.csv`: 40 contoh air sumur fiktif. `skor_keruh` (0 sampai 100) dan `skor_bau` (0 sampai 9) adalah skor karangan, bukan satuan ukur nyata. Label `air`: `layak` atau `tidak_layak`. Baris 1 sampai 28 menjadi data latih dan baris 29 sampai 40 data uji. **Data ini karangan; jangan dipakai menilai air sumur sungguhan.**

```text
skor_keruh,skor_bau,c#air
22,9,tidak_layak
13,4,layak
62,7,tidak_layak
31,1,layak
54,6,tidak_layak
5,7,layak
34,9,tidak_layak
45,0,tidak_layak
88,8,layak
53,3,tidak_layak
8,8,layak
61,7,tidak_layak
49,3,tidak_layak
63,4,tidak_layak
58,8,tidak_layak
17,2,layak
42,1,layak
69,6,tidak_layak
90,3,tidak_layak
80,7,tidak_layak
69,6,tidak_layak
9,7,layak
56,6,tidak_layak
51,8,tidak_layak
91,5,layak
89,8,tidak_layak
25,8,tidak_layak
52,7,tidak_layak
65,0,tidak_layak
83,9,tidak_layak
87,2,tidak_layak
34,0,layak
74,8,tidak_layak
70,5,tidak_layak
78,5,tidak_layak
39,8,tidak_layak
5,6,layak
70,2,tidak_layak
76,3,tidak_layak
12,7,layak
```

Sebelum menjalankan apa pun, tebak dan tulis: (1) model mana yang lebih tepat pada data uji, pohon atau kNN, (2) berapa ketepatan tertingginya, dan (3) berapa ketepatan tebakan mayoritas.

## Contoh terselesaikan

**Pohon.** Tree dengan pengaturan bawaan, dilatih pada baris 1 sampai 28:

```text
skor_keruh <= 17 -> layak           (5 layak)
skor_keruh > 17
  skor_bau <= 1 -> layak            (2 layak, 1 tidak_layak)
  skor_bau > 1
    skor_keruh <= 80 -> tidak_layak (16 tidak_layak)
    skor_keruh > 80  -> layak       (seri: 2 layak, 2 tidak_layak)
```

Daun yang seri 2 lawan 2 diputuskan Orange sebagai `layak` (urutan kelas), dan inilah sumber tiga kesalahan pohon: baris 29, 30, dan 31 jatuh ke daun itu atau ke daun `skor_bau <= 1`.

**kNN.** Untuk titik baru, kNN mencari k titik latih terdekat (jarak Euclid: akar dari jumlah kuadrat selisih tiap fitur) lalu memilih label terbanyak di antara mereka. Contoh baris uji 32 (`skor_keruh` 34, `skor_bau` 0, sebenarnya `layak`) dengan k = 5 dan jarak mentah:

| Baris latih | Fitur | Label | Jarak ke (34, 0) |
| --- | --- | --- | --- |
| 4 | (31, 1) | layak | 3,16 |
| 17 | (42, 1) | layak | 8,06 |
| 7 | (34, 9) | tidak_layak | 9,00 |
| 8 | (45, 0) | tidak_layak | 11,00 |
| 27 | (25, 8) | tidak_layak | 12,04 |

Tiga dari lima tetangga `tidak_layak`, jadi kNN menebak `tidak_layak`: **salah**. Perhatikan baris 7: ia dekat karena `skor_keruh`-nya sama, padahal `skor_bau`-nya jauh (9); jarak mentah dikuasai fitur berskala besar (`skor_keruh` 0 sampai 100) dan hampir mengabaikan `skor_bau` (0 sampai 9). Bila tiap fitur dinormalkan lebih dulu (dikurangi rata-rata dan dibagi simpangan baku), lima tetangga berubah menjadi baris 4, 8, 17, 16, dan 13, tiga di antaranya `layak`, dan tebakannya benar.

**Hasil** (dihitung penyusun dengan pustaka):

| Model | CA latih | CA uji |
| --- | --- | --- |
| pohon (bawaan) | 0,893 (25 dari 28) | 0,750 (9 dari 12) |
| kNN, k = 5, jarak mentah | 0,857 (24 dari 28) | 0,917 (11 dari 12) |
| kNN, k = 5, fitur dinormalkan | 0,893 (25 dari 28) | 1,000 (12 dari 12) |
| tebakan mayoritas (`tidak_layak`) | 0,679 (19 dari 28) | 0,750 (9 dari 12) |

Pohon hanya sama dengan tebakan mayoritas pada data uji, padahal ia lebih baik di data latih. Pada data uji 12 baris, **satu baris = 8,3 poin persen**: selisih kNN dengan pohon (2 sampai 3 baris) menarik tetapi belum membuktikan banyak. Perbandingan yang adil memakai data latih, data uji, ukuran, dan pembanding yang sama.

## Contoh setengah jadi

Data latih mini (`skor_keruh`, `skor_bau`, label): (10, 2, L), (20, 5, L), (30, 1, L), (70, 6, T), (80, 3, T), (60, 8, T); `L` berarti `layak` dan `T` `tidak_layak`. Titik baru: (45, 4).

1. Jarak mentah ke tiap titik latih (dua desimal): ____, ____, ____, ____, ____, ____.
2. Dengan k = 1, tetangga terdekat berlabel ____, jadi tebakan ____.
3. Dengan k = 3, tiga terdekat berlabel ____, ____, ____, jadi tebakan ____.
4. Dengan k = 5, tebakan menjadi ____. Mengapa jawabannya bisa berubah bila k berubah? ____

## Soal susun urutan

Ini versi tanpa kode dari soal Parsons: susun langkah acak menjadi urutan membandingkan dua penggolong.

```text
(a) latih pohon dan kNN pada data latih yang sama
(b) uji keduanya pada data uji yang sama
(c) hitung tebakan mayoritas sebagai pembanding
(d) isi tabel perbandingan: CA latih dan CA uji tiap model
(e) tulis kesimpulan jujur yang menyebut ukuran data uji
```

## Latihan

1. **Hitung ketepatan.** (`AI: tanpa AI`) Dari daftar tebakan baris uji 29 sampai 40 (pohon salah di 29, 30, 31; kNN jarak mentah salah di 32), hitung CA uji tiap model dan cocokkan dengan tabel.
2. **Mengubah k.** (`AI: boleh`) Di widget kNN atur k = 1, 3, 5, 9 dan catat CA latih dan CA uji. Hasil penyusun untuk jarak mentah: k = 1: 1,000 dan 1,000; k = 3: 0,857 dan 0,917; k = 5: 0,857 dan 0,917; k = 9: 0,786 dan 0,917. Jelaskan mengapa k = 1 memberi CA latih 1,000.
3. **Dua baris.** (`AI: tanpa AI`) Model A benar 11 dari 12 baris uji dan model B 9 dari 12. Berapa poin persen selisihnya, dan apa kesimpulan yang jujur?
4. **Batas data.** (`AI: tanpa AI`) Apakah model ini boleh dipakai memutuskan air sumur sungguhan layak diminum? Beri dua alasan.
5. **Catatan pemakaian AI (opsional).** Bila memakai asisten AI, catat alat, tujuan, garis besar perintah, bagian yang dipakai, dan cara memeriksanya.

## Latihan bercampur

1. Dari `d-x2-m5`: pohon punya CA latih 0,893 dan CA uji 0,750. Apakah ini kelebihan-suai? Apa yang kamu periksa sebelum menyimpulkan?
2. Dari `d-x1-m10`: gambarlah satu pertanyaan pertama pohon keputusan di kertas untuk `sumur.csv` berdasarkan `skor_keruh`.
3. Dari `d-x2-m1`: tebakan mayoritas 0,750. Apa artinya bagi pohon yang juga 0,750?

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `d-x2-m7` (sekitar satu minggu lagi), `d-x2-m9` (sekitar tiga minggu lagi), dan `d-x2-m14` (sekitar delapan minggu lagi). Jawab sekarang lalu simpan.

1. Bagaimana kNN menebak label sebuah titik baru?
2. Apa yang membuat dua model pantas dibandingkan secara adil?
3. Mengapa selisih satu atau dua baris pada data uji kecil belum membuktikan model yang satu lebih baik?

## Kesalahan umum

- **"Semakin kecil k semakin baik."** k = 1 menghafal dan CA latihnya selalu 1,000, tetapi bisa buruk pada data baru.
- **"Skala fitur tidak memengaruhi kNN."** Fitur berskala besar menguasai jarak; normalisasi mengubah tetangga.
- **"Model dengan CA uji lebih tinggi pasti lebih baik."** Dengan 12 baris uji, satu baris sudah 8,3 poin persen.

## Cek mandiri

- [ ] Saya dapat menjelaskan cara kNN menebak sebuah titik.
- [ ] Saya melatih dan menguji dua model pada data yang sama.
- [ ] Saya menambahkan tebakan mayoritas pada tabel perbandingan.
- [ ] Saya menyebut ukuran data uji dalam kesimpulan.
- [ ] Saya mencatat pemakaian AI bila saya memakainya.

## Kunci dan petunjuk

**Ingat kembali.** 1: ia mengajukan pertanyaan bertingkat tentang fitur sampai mencapai daun berlabel. 2: galat latih sangat kecil, galat uji jauh lebih besar. 3: langsung: bisa menunjuk satu orang (nama, nomor telepon); kombinasi: baru mengenali bila beberapa kolom digabung (wilayah, tahun lahir, jenis kelamin). 4: model sudah melihat jawabannya di data latih, jadi hasilnya terlalu bagus.

**Prediksi dulu.** Tebakan bebas; hasil penyusun: pohon 0,750; kNN jarak mentah 0,917; kNN dinormalkan 1,000; tebakan mayoritas 0,750.

**Contoh setengah jadi.** 1: ke (10,2): 35,06; ke (20,5): 25,02; ke (30,1): 15,30; ke (70,6): 25,08; ke (80,3): 35,01; ke (60,8): 15,52. 2: terdekat (30,1) berlabel L, tebakan `layak`. 3: urutan terdekat 15,30 (L), 15,52 (T), 25,02 (L), jadi tiga terdekat L, T, L dan tebakan `layak` (2 lawan 1). 4: lima terdekat menambah 25,08 (T) dan 35,01 (T): L 2, T 3, tebakan `tidak_layak`. Jawaban berubah karena k menentukan siapa saja yang ikut memilih; titik ini berada di antara dua kelompok.

**Soal susun urutan.** a, b, c, d, e.

**Latihan.** 1: pohon benar 9 dari 12 = 0,750; kNN jarak mentah benar 11 dari 12 = 0,917. 2: dengan k = 1, titik latih adalah tetangga terdekat dirinya sendiri (jaraknya 0), jadi labelnya selalu benar. Untuk fitur dinormalkan hasil penyusun: k = 1: 1,000 dan 0,833; k = 3: 0,893 dan 1,000; k = 5: 0,893 dan 1,000; k = 9: 0,750 dan 0,833. 3: 2 baris = 16,7 poin persen; kesimpulan jujur: A tampak lebih baik pada 12 baris ini, tetapi sampelnya kecil dan perlu data uji lebih banyak. 4: tidak: data karangan dan skor bukan ukuran nyata; kesalahan menebak `layak` bisa berbahaya bagi kesehatan. 5: opsional.

**Latihan bercampur.** 1: belum tentu: CA latih dan uji berjarak 14 poin persen pada data uji yang kecil; periksa galat per baris, jumlah baris uji, dan bandingkan dengan tebakan mayoritas. 2: contoh: "skor_keruh <= 17?" bila ya `layak`; bila tidak lanjut ke pertanyaan berikutnya. 3: pohon belum terbukti lebih baik daripada tidak belajar apa pun pada data uji ini.

**Ulang berjarak.** 1: mencari k titik latih terdekat lalu memilih label terbanyak di antara mereka. 2: data latih, data uji, ukuran, dan pembanding yang sama. 3: satu baris pada 12 baris uji sudah 8,3 poin persen; selisih sekecil itu bisa kebetulan.

## Langkah berikutnya

Modul berikut: `d-x2-m7` (mengevaluasi klasifikasi), yang memecah kesalahan menjadi jenis galat. Bacaan pendamping: `matkom-logika-proposisi` untuk gagasan aturan bertingkat.
