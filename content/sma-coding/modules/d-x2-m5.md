## Untuk siapa modul ini

Modul ini untuk murid kelas X jalur D (kecerdasan buatan dan analisis data), untuk minggu `D-X2-M5` silabus v1.3: galat dan kelebihan-suai (*overfitting*). Prasyarat: modul `d-x2-m4` (regresi: garis kecenderungan). Alat: Orange Data Mining, tanpa pemrograman dan tanpa akun. Bila Orange belum terpasang, hitungan di kertas tetap bisa dikerjakan.

Modul ini karangan penyusun dan disetujui pemilik program pada 2026-11-20 (keputusan lewat dialog; catatan tinjauan menjadi tindak lanjut revisi). Jalur D adalah pengayaan di luar rumusan capaian pembelajaran (CP); minggu ini tidak punya irisan pengayaan, jadi modul ini tidak dihitung memenuhi butir CP mana pun.

Aturan jalur D yang berlaku: data hanya sintetis (karangan) atau terbuka dengan lisensi jelas, tanpa data yang bisa mengenali orang; wajah, suara, dan foto orang tidak dipakai sebagai data; AI generatif boleh dipakai dengan etika dan dicatat, tanpa data pribadi, kata sandi, atau tugas bernilai pada permintaanmu, dan kamu tidak wajib punya akun. Saran: jawab dulu sendiri, baru minta AI menjelaskan atau memberi petunjuk bertahap. Setiap soal `Latihan` bertanda `AI: boleh` atau `AI: tanpa AI`.

Catatan untuk guru: galat dihitung penyusun dengan pustaka Orange 3.41.0 (Linear Regression dan Tree, per 2026-11). Antarmuka grafis tidak dijalankan penyusun, jadi nama menu dan tampilan `[belum terverifikasi]`. Perbandingan "sederhana dan rumit" memakai satu dataset kecil karangan; hasilnya contoh, bukan hukum.

## Ingat kembali

Jawab dari ingatan, baru cek di bagian kunci.

1. Apa yang kamu periksa lebih dulu setelah memuat data? (dari `d-x1-m11`)
2. Apa yang dapat dan tidak dapat dibuktikan oleh diagram sebar? (dari `d-x1-m11`)
3. Apa arti kemiringan garis regresi dalam kalimat biasa? (dari `d-x2-m4`)
4. Sebutkan empat sumber bias pada sistem keputusan otomatis. (dari `d-x2-m2`)

## Tujuan

Setelah modul ini kamu dapat:

- menghitung galat rata-rata mutlak (MAE) dan akar galat kuadrat rata-rata (RMSE) dari selisih prediksi dan nilai sebenarnya;
- membandingkan galat pada data latih dan pada data uji;
- mengenali kelebihan-suai: galat latih sangat kecil tetapi galat uji jauh lebih besar;
- membandingkan model sederhana dan model rumit pada data yang sama dan menulis catatan galat.

Keluaran yang diminta silabus: catatan galat.

## Prediksi dulu

Dataset karangan `tumbuh`: tinggi sebuah tanaman fiktif (cm) setelah 30 hari menurut jumlah air siraman per hari (ml). Angkanya dibuat penyusun dengan program, bukan pengukuran nyata, dan bebas dipakai. Data latih (12 baris) disimpan sebagai `tumbuh-latih.csv`, data uji (8 baris) sebagai `tumbuh-uji.csv`.

```text
air_ml,c#tinggi_cm
220,20
260,24
300,21
400,36
440,22
470,32
530,40
540,39
560,44
580,36
590,43
600,36
```

```text
air_ml,c#tinggi_cm
150,12
150,18
330,27
380,18
500,35
530,43
540,38
560,35
```

Dua model akan dibandingkan: **garis regresi linear** (sederhana) dan **pohon keputusan tanpa batas** (rumit; boleh membuat daun untuk tiap baris latih). Sebelum menjalankan, tebak dan tulis: (1) model mana yang galatnya lebih kecil pada data latih, (2) model mana yang galatnya lebih kecil pada data uji, dan (3) mengapa keduanya bisa berbeda.

## Contoh terselesaikan

**Menghitung galat.** Garis regresi dari data latih (dihitung pustaka Orange): `tinggi = 7,486 + 0,0552 x air`. Pada data uji:

| air_ml | sebenarnya | prediksi | selisih (sebenarnya - prediksi) | mutlak | kuadrat |
| --- | --- | --- | --- | --- | --- |
| 150 | 12 | 15,8 | -3,8 | 3,8 | 14,44 |
| 150 | 18 | 15,8 | 2,2 | 2,2 | 4,84 |
| 330 | 27 | 25,7 | 1,3 | 1,3 | 1,69 |
| 380 | 18 | 28,5 | -10,5 | 10,5 | 110,25 |
| 500 | 35 | 35,1 | -0,1 | 0,1 | 0,01 |
| 530 | 43 | 36,8 | 6,2 | 6,2 | 38,44 |
| 540 | 38 | 37,3 | 0,7 | 0,7 | 0,49 |
| 560 | 35 | 38,4 | -3,4 | 3,4 | 11,56 |
| jumlah | | | | **28,2** | **181,72** |

MAE = 28,2 / 8 = 3,53. RMSE = akar dari (181,72 / 8) = akar dari 22,7 = 4,77. Orange memberi 3,53 dan 4,76 (beda 0,01 karena prediksi di tabel dibulatkan satu desimal). MAE adalah rata-rata besarnya selisih; RMSE mengkuadratkan selisih dulu, sehingga satu selisih besar seperti -10,5 lebih berpengaruh.

**Membandingkan model.** Tiga model dilatih pada 12 baris latih. Pohon "bawaan" memakai pengaturan bawaan Tree; pohon "bebas" memakai *Min. number of instances in leaves* = 1, *Do not split subsets smaller than* = 2, dan tanpa batas kedalaman.

| Model | RMSE latih | RMSE uji | MAE latih | MAE uji |
| --- | --- | --- | --- | --- |
| garis linear | 4,47 | 4,76 | 3,74 | 3,53 |
| pohon bawaan | 3,64 | 6,57 | 3,00 | 5,67 |
| pohon bebas | **0,00** | **8,58** | **0,00** | **6,88** |

Pohon bebas membuat 12 daun, satu untuk tiap baris latih, sehingga galat latihnya 0: ia menghafal. Tetapi pada data uji ia paling buruk. Misalnya untuk air 380 ml ia menebak 36 (nilai baris latih 400 ml), padahal tinggi sebenarnya 18. Garis linear galat latih dan ujinya hampir sama (4,47 dan 4,76): ia tidak menghafal, dan hasilnya lebih stabil.

Inilah kelebihan-suai: **galat latih sangat kecil, galat uji jauh lebih besar**. Jarak antara kedua angka itu adalah tanda bahayanya. Pilih model dari galat **uji**, bukan galat latih. Dengan hanya 8 baris uji angka mudah bergeser, tetapi polanya cukup jelas di sini.

## Contoh setengah jadi

Sebuah model menebak lima nilai: sebenarnya 10, 20, 30, 40, 50 dan tebakan 12, 18, 33, 35, 50.

1. Selisih (sebenarnya - tebakan): ____, ____, ____, ____, ____.
2. Mutlak: ____, ____, ____, ____, ____; MAE = ____ / 5 = ____.
3. Kuadrat: ____, ____, ____, ____, ____; RMSE = akar dari (____ / 5) = ____ (dua desimal).
4. Model lain pada data latih benar semua (galat 0) tetapi pada data uji MAE-nya 6, sedangkan model pertama MAE latih 2,4 dan uji 2,8. Mana yang kamu pilih? Alasannya? ____

## Soal susun urutan

Ini versi tanpa kode dari soal Parsons: susun langkah acak menjadi urutan membandingkan model sederhana dan rumit.

```text
(a) latih kedua model pada data latih
(b) catat galat kedua model pada data latih
(c) catat galat kedua model pada data uji
(d) bandingkan jarak galat latih dan galat uji tiap model
(e) pilih model dengan galat uji lebih kecil dan tulis catatan galat
```

## Latihan

1. **Hitung galat.** (`AI: tanpa AI`) Pohon bebas menebak 36, 36, 40, 40 untuk baris uji dengan air 330, 380, 500, 530 ml (sebenarnya 27, 18, 35, 43). Hitung MAE dan RMSE untuk empat baris itu.
2. **Mengulang di Orange.** (`AI: boleh`) Muat kedua berkas, bangun alur File latih dan File uji, Linear Regression dan Tree (atur dua parameter di atas), lalu Test and Score dengan "Test on train data" dan "Test on test data". Bandingkan RMSE hasilmu dengan tabel dan jelaskan perbedaannya bila ada.
3. **Mengenali.** (`AI: tanpa AI`) Laporan A: RMSE latih 2,1 dan uji 2,4. Laporan B: RMSE latih 0,0 dan uji 7,9. Laporan mana yang menunjukkan kelebihan-suai? Apa yang kamu minta dari pembuat laporan itu?
4. **Mengapa galat uji.** (`AI: boleh`) Tulis dua kalimat yang menjelaskan mengapa model dipilih dari galat uji, bukan galat latih.
5. **Catatan pemakaian AI (opsional).** Bila memakai asisten AI, catat alat, tujuan, garis besar perintah, bagian yang dipakai, dan cara memeriksanya.

## Latihan bercampur

1. Dari `d-x2-m4`: dua baris uji dengan air 150 ml berada di bawah rentang air data latih (220 sampai 600). Garis menebak 15,8 dan pohon bebas menebak 20 untuk keduanya (sebenarnya 12 dan 18). Model mana yang lebih dekat dan apa yang diperlihatkan soal rentang data?
2. Dari `d-x1-m12`: apa padanan "ketepatan latih 1,000 tetapi ketepatan uji 0,700" pada masalah regresi di modul ini?
3. Dari `d-x2-m2`: mengapa galat rata-rata belum cukup untuk menilai keadilan antarkelompok?

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `d-x2-m6` (sekitar satu minggu lagi), `d-x2-m8` (sekitar tiga minggu lagi), dan `d-x2-m13` (sekitar delapan minggu lagi). Jawab sekarang lalu simpan.

1. Apa itu galat (MAE atau RMSE) dan bagaimana menghitungnya dari selisih?
2. Bagaimana mengenali kelebihan-suai dari dua angka galat?
3. Mengapa model yang lebih rumit tidak selalu lebih baik?

## Kesalahan umum

- **"Galat latih 0 berarti model sempurna."** Itu tanda model menghafal; periksa galat uji.
- **"Model lebih rumit selalu lebih akurat."** Di sini pohon bebas paling buruk di data uji.
- **"MAE dan RMSE sama saja."** RMSE lebih menghukum selisih besar; angka keduanya berbeda.
- **"Pilih model dari galat latih."** Pilih dari galat uji pada data yang tidak dipakai melatih.

## Cek mandiri

- [ ] Saya dapat menghitung MAE dan RMSE dari selisih.
- [ ] Saya membandingkan galat latih dan galat uji.
- [ ] Saya dapat mengenali kelebihan-suai dari jarak kedua galat.
- [ ] Saya memilih model dari galat uji.
- [ ] Saya mencatat pemakaian AI bila saya memakainya.

## Kunci dan petunjuk

**Ingat kembali.** 1: jumlah baris dan kolom, peran kolom (target), nilai kosong atau mustahil. 2: dapat menunjukkan bahwa titik cenderung naik, turun, atau mengelompok; tidak membuktikan sebab dan tidak menjamin pola di luar data. 3: tiap kenaikan satu satuan fitur berhubungan dengan sekian satuan perubahan target, pada rentang data. 4: data tidak mewakili, label subjektif, fitur pengganti (proksi), alat ukur tidak setara.

**Prediksi dulu.** Tebakan bebas; hasil penyusun: pohon bebas galat latihnya terkecil (0,00) tetapi galat ujinya terbesar (8,58); garis linear galat latih dan ujinya hampir sama.

**Contoh setengah jadi.** 1: -2, 2, -3, 5, 0. 2: 2, 2, 3, 5, 0; MAE = 12 / 5 = 2,4. 3: 4, 4, 9, 25, 0; RMSE = akar dari (42 / 5) = akar dari 8,4 = 2,90. 4: model pertama, karena galat ujinya (2,8) jauh lebih kecil dari 6; model kedua menghafal data latih.

**Soal susun urutan.** a, b, c, d, e.

**Latihan.** 1: selisih -9, -18, -5, 3; mutlak 9, 18, 5, 3 jumlah 35, MAE = 8,75; kuadrat 81, 324, 25, 9 jumlah 439, RMSE = akar dari 109,75 = 10,48. 2: hasil penyusun: garis linear 4,47 dan 4,76; pohon bebas 0,00 dan 8,58; bila beda, periksa parameter Tree, pembagian baris, dan versi. 3: Laporan B menunjukkan kelebihan-suai (latih 0,0, uji 7,9); mintalah galat pada data uji lain, jumlah baris uji, dan perbandingan dengan model sederhana. 4: contoh: "Galat latih diukur pada data yang sudah dilihat model sehingga terlalu optimis. Galat uji diukur pada data baru sehingga lebih mirip pemakaian nyata." 5: opsional.

**Latihan bercampur.** 1: garis lebih dekat: selisihnya -3,8 dan 2,2 (jumlah mutlak 6,0), sedangkan pohon -8 dan -2 (jumlah mutlak 10,0). Pohon tidak pernah menebak di bawah nilai terkecil di data latih (20), sedangkan garis boleh turun; di luar rentang data keduanya tidak boleh dipercaya begitu saja. 2: galat latih 0,00 tetapi galat uji 8,58. 3: rata-rata menyamarkan kelompok yang dirugikan; hitung galat per kelompok.

**Ulang berjarak.** 1: galat adalah selisih sebenarnya dan prediksi; MAE rata-rata mutlak, RMSE akar dari rata-rata kuadrat. 2: galat latih sangat kecil, galat uji jauh lebih besar. 3: model rumit bisa menghafal data latih dan gagal pada data baru.

## Langkah berikutnya

Modul berikut: `d-x2-m6` (klasifikasi: pohon keputusan dan tetangga terdekat). Bacaan pendamping: `matkom-pertumbuhan-fungsi` untuk gagasan seberapa cepat sesuatu membesar.
