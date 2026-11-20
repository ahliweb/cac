## Untuk siapa modul ini

Modul ini untuk murid kelas X jalur D (kecerdasan buatan dan analisis data), untuk minggu `D-X2-M4` silabus v1.3: regresi, garis kecenderungan. Prasyarat: modul `d-x2-m3` (privasi dan data pribadi) dan `d-x1-m12` (model pertama dan pembagian data latih dan uji). Alat: kertas untuk hitungan tangan; Orange Data Mining untuk memeriksa hasilnya, tanpa pemrograman dan tanpa akun. Bila Orange tidak tersedia, seluruh hitungan di bagian `Contoh terselesaikan` bisa dikerjakan di kertas.

Modul ini karangan penyusun dan disetujui pemilik program pada 2026-11-20 (keputusan lewat dialog; catatan tinjauan menjadi tindak lanjut revisi). Jalur D adalah pengayaan di luar rumusan capaian pembelajaran (CP); minggu ini tidak punya irisan pengayaan, jadi modul ini tidak dihitung memenuhi butir CP mana pun.

Aturan jalur D yang berlaku: data hanya sintetis (karangan) atau terbuka dengan lisensi jelas, tanpa data yang bisa mengenali orang; wajah, suara, dan foto orang tidak dipakai sebagai data; AI generatif boleh dipakai dengan etika dan dicatat, tanpa data pribadi, kata sandi, atau tugas bernilai pada permintaanmu, dan kamu tidak wajib punya akun. Saran: jawab dulu sendiri, baru minta AI menjelaskan atau memberi petunjuk bertahap. Setiap soal `Latihan` bertanda `AI: boleh` atau `AI: tanpa AI`.

Catatan untuk guru: koefisien, galat, dan prediksi dihitung penyusun dengan pustaka Orange 3.41.0 (widget Linear Regression tanpa regulasi, per 2026-11) dan dicocokkan dengan hitungan tangan untuk lima titik. Antarmuka grafis tidak dijalankan penyusun, jadi nama menu dan tampilan `[belum terverifikasi]`; sesuaikan dengan versi di lab.

## Ingat kembali

Jawab dari ingatan, baru cek di bagian kunci.

1. Apa beda menebak kategori dan menebak angka? (dari `d-x1-m10`)
2. Bagaimana menghitung ketepatan (akurasi) sebuah aturan? (dari `d-x1-m10`)
3. Data apa yang tidak boleh ditempel ke layanan AI daring, dan mengapa? (dari `d-x2-m3`)
4. Apa itu tebakan mayoritas dan mengapa dipakai sebagai pembanding? (dari `d-x2-m1`)

## Tujuan

Setelah modul ini kamu dapat:

- menjelaskan regresi sebagai cara menebak sebuah angka dari fitur, dan menandai tugas mana yang regresi dan mana yang klasifikasi;
- menghitung garis regresi linear dari beberapa titik dengan rumus kemiringan dan titik potong;
- membangun alur regresi linear di Orange dan membaca koefisien serta prediksinya;
- menjelaskan arti kemiringan dalam kalimat biasa dan menyebut batas garis (di luar rentang data dan "berhubungan" bukan "menyebabkan").

Keluaran yang diminta silabus: alur regresi.

## Prediksi dulu

Dataset karangan `es5.csv`: lima hari di sebuah warung es fiktif. `suhu_c` adalah suhu siang (derajat Celsius) dan `terjual` banyak gelas es yang terjual. Angkanya dibuat penyusun dan bebas dipakai.

```text
suhu_c,c#terjual
28,30
30,42
32,55
34,60
36,78
```

Sebelum menghitung, tebak dan tulis: (1) kira-kira berapa gelas terjual pada hari bersuhu 33, dan (2) tiap kenaikan suhu 1 derajat, kira-kira bertambah berapa gelas.

## Contoh terselesaikan

Garis regresi linear berbentuk `terjual = titik potong + kemiringan x suhu`. Kemiringan = jumlah (selisih x dari rata-rata dikali selisih y dari rata-rata), dibagi jumlah (selisih x dari rata-rata dikuadratkan).

Rata-rata suhu 32 dan rata-rata terjual 53. Penelusuran:

| suhu | terjual | suhu - 32 | terjual - 53 | hasil kali | selisih suhu dikuadratkan |
| --- | --- | --- | --- | --- | --- |
| 28 | 30 | -4 | -23 | 92 | 16 |
| 30 | 42 | -2 | -11 | 22 | 4 |
| 32 | 55 | 0 | 2 | 0 | 0 |
| 34 | 60 | 2 | 7 | 14 | 4 |
| 36 | 78 | 4 | 25 | 100 | 16 |
| jumlah | | | | **228** | **40** |

Kemiringan = 228 / 40 = **5,7**. Titik potong = 53 - 5,7 x 32 = **-129,4**. Garisnya: `terjual = -129,4 + 5,7 x suhu`. Prediksi pada 33 derajat: -129,4 + 188,1 = **58,7** gelas. Pustaka Orange memberi koefisien 5,7 dan titik potong -129,4, sama dengan hitungan tangan.

Sisa (selisih sebenarnya dikurangi prediksi) tiap titik: prediksi 30,2; 41,6; 53,0; 64,4; 75,8, sehingga sisa -0,2; 0,4; 2,0; -4,4; 2,2 yang berjumlah 0. Galat rata-rata mutlak (MAE) = 9,2 / 5 = 1,84; akar galat kuadrat rata-rata (RMSE) = akar dari (28,4 / 5) = 2,38. Orange memberi 1,840 dan 2,383 pada data yang sama.

Arti kemiringan: pada data ini, tiap kenaikan suhu 1 derajat berhubungan dengan sekitar 5,7 gelas tambahan. Titik potong -129,4 tidak berarti: pada 0 derajat garis memprediksi **-129,4** gelas, yang mustahil. Garis hanya layak dipakai di sekitar rentang data (28 sampai 36 derajat).

**Dengan Orange (12 hari, `es.csv`).** Sambungkan File ke Scatter Plot (centang "Show regression line") dan ke Linear Regression, lalu Linear Regression ke Predictions dan Data Table (untuk koefisien), dan ke Test and Score (Test on train data) untuk membaca RMSE dan MAE.

```text
suhu_c,c#terjual
26,41
27,29
28,35
28,37
29,30
29,31
29,38
30,52
33,77
34,67
34,73
36,88
```

Hasil (dihitung penyusun): kemiringan **6,018** dan titik potong **-132,206**; RMSE 7,909, MAE 5,984. Prediksi: 30 derajat 48,3 gelas; 33 derajat 66,4; 40 derajat 108,5; 45 derajat 138,6. Dua yang terakhir berada di luar rentang data (26 sampai 36): jangan dipercaya.

## Contoh setengah jadi

Sebuah tanaman fiktif dicatat: lama sinar per hari (jam) dan tinggi (cm): (2, 5), (4, 9), (6, 10), (8, 16).

1. Rata-rata jam = ____ dan rata-rata tinggi = ____.
2. Jumlah hasil kali selisih = ____ dan jumlah selisih jam dikuadratkan = ____.
3. Kemiringan = ____ dan titik potong = ____.
4. Prediksi tinggi untuk 5 jam = ____ cm.
5. Mengapa memprediksi untuk 20 jam tidak dapat dipercaya? ____

## Soal susun urutan

Ini versi tanpa kode dari soal Parsons: susun langkah acak menjadi urutan membuat alur regresi di Orange.

```text
(a) sambungkan File ke Scatter Plot dan lihat apakah titik-titik cenderung lurus
(b) sambungkan File ke Linear Regression
(c) sambungkan Linear Regression ke Predictions untuk nilai suhu baru
(d) muat berkas CSV dengan File dan periksa kolom target
(e) catat koefisien dan galat, lalu tulis batas penggunaannya
```

## Latihan

1. **Tugas yang mana.** (`AI: tanpa AI`) Tandai regresi atau klasifikasi: (a) menebak apakah tanaman `segar` atau `layu`, (b) menebak tinggi tanaman, (c) menebak banyak gelas es terjual, (d) menebak apakah pesan `spam`.
2. **Prediksi di dalam rentang.** (`AI: boleh`) Dengan garis dari `es.csv`, hitung prediksi untuk 31 dan 35 derajat, lalu bandingkan dengan baris data pada suhu yang dekat.
3. **Di luar rentang.** (`AI: tanpa AI`) Hitung prediksi `es.csv` untuk 45 derajat dan 0 derajat dengan garis `-132,206 + 6,018 x suhu`. Mengapa hasilnya tidak boleh dipakai untuk memutuskan stok?
4. **Kalimat jujur.** (`AI: boleh`) Tulis tiga kalimat tentang arti kemiringan `es.csv`, rentang data, dan satu hal yang tidak dibuktikan garis itu.
5. **Catatan pemakaian AI (opsional).** Bila memakai asisten AI, catat alat, tujuan, garis besar perintah, bagian yang dipakai, dan cara memeriksanya.

## Latihan bercampur

1. Dari `d-x2-m1`: dalam alur data, model, evaluasi, keputusan untuk warung es, apa keputusannya dan apa akibat bila prediksi terlalu rendah?
2. Dari `d-x2-m3`: apakah `es.csv` memuat data pribadi? Jelaskan dengan satu kalimat.
3. Dari `d-x1-m11`: apa yang dapat dan tidak dapat dibuktikan diagram sebar tentang hubungan suhu dan penjualan?

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `d-x2-m5` (sekitar satu minggu lagi), `d-x2-m7` (sekitar tiga minggu lagi), dan `d-x2-m12` (sekitar delapan minggu lagi). Jawab sekarang lalu simpan.

1. Apa yang dihitung garis regresi linear dan bagaimana ia dipakai memprediksi?
2. Apa arti kemiringan garis regresi dalam kalimat biasa?
3. Mengapa memprediksi jauh di luar rentang data berbahaya?

## Kesalahan umum

- **"Garis harus melewati semua titik."** Garis regresi merangkum kecenderungan; selisihnya (sisa) memang ada.
- **"Kemiringan besar berarti suhu menyebabkan penjualan."** Garis hanya menunjukkan hubungan pada data; sebab perlu bukti lain.
- **"Titik potong selalu bermakna."** Pada 0 derajat prediksinya -129,4 gelas, mustahil; titik potong di luar rentang hanyalah bagian dari rumus.
- **"Prediksi boleh di mana saja."** Di luar rentang data tidak ada bukti bahwa garisnya masih lurus.
- **"Galat kecil berarti model pasti benar."** Galat dihitung pada data yang sama; uji pada data lain (lihat `d-x2-m5`).

## Cek mandiri

- [ ] Saya dapat membedakan regresi dan klasifikasi.
- [ ] Saya dapat menghitung kemiringan dan titik potong dari beberapa titik.
- [ ] Saya dapat membaca koefisien dan galat di Orange.
- [ ] Saya menyebut rentang data setiap kali memberi prediksi.
- [ ] Saya mencatat pemakaian AI bila saya memakainya.

## Kunci dan petunjuk

**Ingat kembali.** 1: kategori menebak kelas (mis. `segar` atau `layu`); angka menebak nilai bilangan (mis. banyak gelas). 2: hitung banyak tebakan yang benar dibagi seluruh kartu. 3: data pribadi, kata sandi, kunci, dan tugas bernilai, karena dikirim ke server penyedia dan bisa tersimpan di luar kendalimu. 4: aturan yang selalu menjawab label terbanyak; model harus lebih baik dari itu.

**Prediksi dulu.** Tebakan bebas; hasil penyusun: sekitar 58,7 gelas pada 33 derajat dan sekitar 5,7 gelas per derajat.

**Contoh setengah jadi.** 1: 5 dan 10. 2: 34 dan 20. 3: 34 / 20 = 1,7; titik potong = 10 - 1,7 x 5 = 1,5. 4: 1,5 + 1,7 x 5 = 10,0 cm. 5: 20 jam jauh di luar rentang 2 sampai 8 jam; tanaman tidak tumbuh lurus tanpa batas. Pustaka Orange memberi koefisien 1,7 dan titik potong 1,5.

**Soal susun urutan.** d, a, b, c, e.

**Latihan.** 1: (a) klasifikasi, (b) regresi, (c) regresi, (d) klasifikasi. 2: 31 derajat: sekitar 54,3 (54,4 bila memakai koefisien yang dibulatkan); 35 derajat: -132,206 + 6,018 x 35 = 78,4; data dekat: 30 derajat 52 gelas, 34 derajat 67 dan 73, 36 derajat 88; prediksi masuk akal tetapi tidak persis. 3: 45 derajat: 138,6; 0 derajat: -132,2 (mustahil); keduanya di luar rentang 26 sampai 36; keputusan stok butuh data pada suhu tersebut. 4: contoh: "Tiap kenaikan 1 derajat berhubungan dengan sekitar 6 gelas tambahan pada rentang 26 sampai 36 derajat. Garis tidak berlaku untuk suhu di luar rentang itu. Garis tidak membuktikan bahwa suhu menyebabkan penjualan." 5: opsional.

**Latihan bercampur.** 1: keputusan: berapa gelas disiapkan; prediksi terlalu rendah membuat pembeli kehabisan, terlalu tinggi membuat es terbuang. 2: tidak: hanya suhu dan banyak gelas, tanpa identitas orang. 3: dapat menunjukkan bahwa titik cenderung naik bersama; tidak membuktikan sebab dan tidak menjamin pola di luar data.

**Ulang berjarak.** 1: garis lurus yang merangkum hubungan fitur dengan angka target; masukkan nilai fitur ke rumus untuk memprediksi. 2: tiap kenaikan satu satuan fitur berhubungan dengan sekian satuan perubahan pada target, pada rentang data. 3: di luar rentang tidak ada bukti bahwa pola masih berlaku, dan prediksinya bisa mustahil.

## Langkah berikutnya

Modul berikut: `d-x2-m5` (galat dan kelebihan-suai), yang mengukur galat pada data uji. Bacaan pendamping: `matkom-pertumbuhan-fungsi` untuk gagasan bentuk fungsi.
