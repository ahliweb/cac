## Untuk siapa modul ini

Modul ini untuk murid kelas X jalur D (kecerdasan buatan dan analisis data), untuk minggu `D-X2-M9` silabus v1.3: visualisasi untuk bercerita. Prasyarat: modul `d-x2-m8` (pengelompokan tanpa label). Alat: kertas, atau lembar kerja di komputer; widget Bar Plot, Box Plot, dan Scatter Plot di Orange Data Mining boleh dipakai, tanpa pemrograman dan tanpa akun.

Modul ini berstatus DRAF: karangan penyusun, belum ditinjau pemilik. Jalur D adalah pengayaan di luar rumusan capaian pembelajaran (CP); minggu ini tidak punya irisan pengayaan, jadi modul ini tidak dihitung memenuhi butir CP mana pun.

Aturan jalur D yang berlaku: data hanya sintetis (karangan) atau terbuka dengan lisensi jelas, tanpa data yang bisa mengenali orang; wajah, suara, dan foto orang tidak dipakai sebagai data; AI generatif boleh dipakai dengan etika dan dicatat, tanpa data pribadi, kata sandi, atau tugas bernilai pada permintaanmu, dan kamu tidak wajib punya akun. Saran: jawab dulu sendiri, baru minta AI menjelaskan atau memberi petunjuk bertahap. Setiap soal `Latihan` bertanda `AI: boleh` atau `AI: tanpa AI`.

Catatan untuk guru: rata-rata dan median dihitung penyusun dengan pustaka Orange 3.41.0 (`Orange.statistics.util`, per 2026-11); grafik batang di modul dibangkitkan dengan program kecil dan ditempel sebagai teks. Widget Bar Plot, Box Plot, dan Scatter Plot tidak dijalankan penyusun, jadi tampilan dan letak tombolnya `[belum terverifikasi]`; semua data di modul karangan.

## Ingat kembali

Jawab dari ingatan, baru cek di bagian kunci.

1. Apa beda pengelompokan (tanpa label) dan klasifikasi? (dari `d-x2-m8`)
2. Bagaimana kNN menebak label sebuah titik baru? (dari `d-x2-m6`)
3. Apa empat tahap alur dari data sampai keputusan, dan apa yang diperiksa di tiap tahap? (dari `d-x2-m1`)

## Tujuan

Setelah modul ini kamu dapat:

- memilih jenis grafik menurut pertanyaan yang ingin dijawab: membandingkan, melihat perubahan, melihat hubungan dua angka, atau melihat sebaran;
- mengenali tiga cara grafik menyesatkan: sumbu batang tidak mulai dari nol, rata-rata tanpa sebaran, dan judul yang melebihi data;
- membuat satu halaman visual yang jujur: judul berupa pesan, grafik berlabel, catatan sumber data, dan satu kalimat batasan.

Keluaran yang diminta silabus: satu halaman visual.

## Prediksi dulu

Penjualan enam bulan sebuah kantin fiktif (porsi, data karangan): 52, 53, 55, 54, 56, 57. Dua grafik berikut memakai data yang sama persis. Panjang `#` menunjukkan tinggi batang.

```text
Grafik A (sumbu mulai dari 50)
bulan 1 | ######## 52
bulan 2 | ############ 53
bulan 3 | #################### 55
bulan 4 | ################ 54
bulan 5 | ######################## 56
bulan 6 | ############################ 57

Grafik B (sumbu mulai dari 0)
bulan 1 | ######################## 52
bulan 2 | ######################### 53
bulan 3 | ########################## 55
bulan 4 | ######################### 54
bulan 5 | ########################## 56
bulan 6 | ########################### 57
```

Tebak dan tulis: (1) grafik mana yang membuat penjualan tampak melonjak, (2) pada grafik itu, batang bulan 6 tampak berapa kali batang bulan 1, dan (3) berapa persen kenaikan sebenarnya dari bulan 1 ke bulan 6.

## Contoh terselesaikan

**Sumbu dipotong.** Pada Grafik A tinggi batang adalah nilai dikurangi 50: bulan 1 setinggi 2 satuan dan bulan 6 setinggi 7 satuan, sehingga batang bulan 6 tampak 7 / 2 = **3,5 kali** batang bulan 1. Kenaikan sebenarnya (57 − 52) / 52 = 5 / 52 = **9,6 persen**; pada Grafik B perbandingan tinggi batang adalah 57 / 52 = 1,10. Batang mewakili besar, jadi panjangnya harus sebanding dengan nilainya; itu berarti sumbu batang mulai dari nol. Ini salah satu kesalahan yang dibahas dalam daftar "caveats" data-to-viz (bacaan tambahan).

**Rata-rata yang menipu.** Sepuluh waktu tempuh bus fiktif (menit, karangan): 20, 22, 21, 23, 22, 24, 21, 22, 23, 95. Dengan Orange: rata-rata **29,3** menit, median **22** menit. Satu perjalanan terlambat (95 menit) menggeser rata-rata 7,3 menit; tanpa perjalanan itu rata-rata 22,0. Bila hanya satu angka ditampilkan, pembaca salah mengira bus biasanya memakan sekitar 29 menit. Tampilkan median dan rentang, atau seluruh titik pada data kecil, dan sebut adanya pencilan.

**Memilih grafik menurut pertanyaan.**

| Pertanyaan | Grafik | Waspadai |
| --- | --- | --- |
| Mana yang terbesar atau terkecil? | batang | sumbu mulai dari nol; urutkan batang |
| Bagaimana berubah dari waktu ke waktu? | garis | selang waktu harus sama; sumbu berlabel |
| Apakah dua angka berhubungan? | titik sebar | jangan menarik garis jauh di luar data (`d-x2-m4`) |
| Bagaimana sebaran satu angka? | histogram atau kotak-garis | tunjukkan jumlah data; kotak-garis menyembunyikan titik |
| Bagian dari keseluruhan | batang bertumpuk atau tabel | diagram lingkaran sulit dibaca bila bagiannya banyak |

**Satu halaman visual.** Data karangan hasil panen tiga bulan (kg) dari empat kebun fiktif: A 40, 44, 48; B 70, 66, 62; C 30, 36, 45; D 55, 55, 56. Total per kebun: A 132, B 198, C 111, D 166. Perubahan bulan 1 ke bulan 3: A +20,0%, B −11,4%, C +50,0%, D +1,8%. Total semua kebun naik dari 195 ke 211 (+8,2%).

```text
Judul: Panen total naik 8,2%, tetapi kebun B justru turun
Total panen 3 bulan (kg), sumbu mulai dari 0:
kebun A | ########################## 132
kebun B | ######################################## 198
kebun C | ###################### 111
kebun D | ################################# 166
Perubahan bulan 1 ke bulan 3: A +20,0%   B -11,4%   C +50,0%   D +1,8%
Sumber: data karangan, bukan hasil panen sungguhan.
Batasan: hanya tiga bulan; arah ini belum tentu berlanjut.
```

Perhatikan bahwa judul menyampaikan **pesan** yang didukung data, sumbu mulai dari nol, sumber dan sifat data (karangan) disebut, dan ada satu kalimat batasan.

## Contoh setengah jadi

Sebuah grafik batang fiktif memakai sumbu mulai dari 90, menampilkan nilai 92 dan 95, dengan judul "Penjualan melonjak!".

1. Tinggi batang pertama ____ satuan dan batang kedua ____ satuan, jadi batang kedua tampak ____ kali batang pertama.
2. Kenaikan sebenarnya = (____ − ____) / ____ = ____ persen (satu angka desimal).
3. Perbaikan grafik: sumbu mulai dari ____.
4. Tulis judul yang jujur: ____
5. Satu kalimat batasan yang sebaiknya ditambahkan: ____

## Soal susun urutan

Ini soal Parsons versi tanpa kode: susun langkah acak menjadi alur membuat visual yang jujur.

```text
(a) tulis pesan satu kalimat sebagai judul, lalu periksa apakah data mendukungnya
(b) tentukan pertanyaan yang ingin dijawab pembaca
(c) beri label sumbu, satuan, sumber, dan catatan bahwa data karangan
(d) pilih jenis grafik yang cocok untuk pertanyaan itu dan atur sumbunya
(e) tulis satu kalimat batasan dan minta teman memeriksa apakah ia salah membaca
```

## Latihan

1. **Pilih grafik.** (`AI: tanpa AI`) Pilih jenis grafik dan beri satu alasan untuk tiap pertanyaan: (a) kebun mana panennya terbesar, (b) bagaimana panen kebun C berubah tiga bulan, (c) apakah panjang dan berat kerang pada `kerang.csv` berhubungan, (d) bagaimana sebaran waktu tempuh bus.
2. **Rata-rata dan median.** (`AI: tanpa AI`) Delapan waktu tempuh bus fiktif: 15, 16, 15, 17, 16, 15, 16, 60. Hitung rata-rata dan median, lalu hitung keduanya tanpa angka 60 dan jelaskan perbedaannya.
3. **Dari data panen.** (`AI: boleh`) Dengan lembar kerja atau Orange, buat grafik batang total per kebun dan grafik garis per kebun. Periksa sumbu, label, dan satuan.
4. **Satu halaman visual.** (`AI: boleh`) Buat halaman visual dari data panen dengan judul pesan, satu atau dua grafik, sumber, dan satu kalimat batasan. Minta teman membacanya tanpa penjelasanmu dan catat apa yang ia simpulkan.
5. **Catatan pemakaian AI (opsional).** Bila memakai asisten AI, catat alat, tujuan, garis besar perintah, bagian yang dipakai, dan cara memeriksanya.

## Latihan bercampur

1. Dari `d-x2-m8`: kamu ingin menampilkan tiga kelompok kerang. Grafik apa yang cocok, dan apa yang perlu kamu tulis agar pembaca tidak mengira kelompok itu "jenis" kerang?
2. Dari `d-x2-m7`: bagaimana menampilkan matriks kebingungan agar tidak menyesatkan, bila hanya warna yang terlihat?
3. Dari `d-x2-m4`: pada grafik titik sebar dengan garis kecenderungan, mengapa garis tidak boleh diperpanjang jauh melewati data?

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `d-x2-m10` (sekitar satu minggu lagi), `d-x2-m12` (sekitar tiga minggu lagi), dan modul jalur D kelas XI semester 1 pada minggu `D-XI1-M7` (statistik deskriptif dan grafik). Jawab sekarang lalu simpan.

1. Mengapa sumbu grafik batang harus mulai dari nol?
2. Mengapa rata-rata saja bisa menyesatkan, dan apa pelengkapnya?
3. Grafik apa untuk membandingkan, melihat perubahan, melihat hubungan, dan melihat sebaran?

## Kesalahan umum

- **"Grafik yang cantik berarti grafik yang benar."** Tampilan tidak menjamin kejujuran; periksa sumbu, skala, dan judul.
- **"Sumbu boleh dipotong supaya perubahan terlihat."** Pada batang, tinggi mewakili besar, jadi pemotongan melebih-lebihkan; untuk grafik garis, sumbu yang dipotong harus dinyatakan jelas.
- **"Rata-rata cukup mewakili."** Pencilan menggesernya; tampilkan median atau sebaran.
- **"Judul boleh lebih besar dari datanya."** "Melonjak" pada kenaikan 3,3 persen adalah klaim yang tidak didukung.

## Cek mandiri

- [ ] Saya dapat memilih jenis grafik menurut pertanyaan.
- [ ] Saya dapat menunjukkan sumbu yang menyesatkan dan menghitung perubahan sebenarnya.
- [ ] Saya menyertakan sumber, satuan, dan batasan pada visual saya.
- [ ] Saya menulis judul yang didukung data.
- [ ] Saya mencatat pemakaian AI bila saya memakainya.

## Kunci dan petunjuk

**Ingat kembali.** 1: pengelompokan tidak memakai label dan menghimpun yang mirip; klasifikasi memakai label dan menebak label titik baru. 2: cari k titik latih terdekat (jarak Euclid) lalu pilih label terbanyak. 3: data, model, evaluasi, keputusan; yang diperiksa: kualitas dan kewajaran data, kecocokan model, ketepatan dan jenis kesalahan pada data uji dibanding pembanding, serta dampak keputusan.

**Prediksi dulu.** Grafik A tampak melonjak; batang bulan 6 (7 satuan) tampak 3,5 kali batang bulan 1 (2 satuan); kenaikan sebenarnya 9,6 persen (5 / 52).

**Contoh setengah jadi.** 1: 2 dan 5 satuan; 2,5 kali. 2: (95 − 92) / 92 = 3 / 92 = 3,3 persen. 3: nol. 4: contoh: "Penjualan naik sekitar 3 persen". 5: contoh: "hanya dua titik data; belum tentu berlanjut".

**Soal susun urutan.** b, d, a, c, e.

**Latihan.** 1: (a) batang, karena membandingkan besar antar-kebun, sumbu dari nol; (b) garis, karena perubahan menurut waktu; (c) titik sebar, karena hubungan dua angka; (d) histogram atau kotak-garis, karena sebaran satu angka. 2: rata-rata (15 + 16 + 15 + 17 + 16 + 15 + 16 + 60) / 8 = 170 / 8 = 21,25 menit; median: urutkan 15, 15, 15, 16, 16, 16, 17, 60, lalu ambil rata-rata dua nilai tengah (16 dan 16) = 16 menit. Tanpa 60: rata-rata 15,7 menit dan median 16 menit. Satu pencilan menggeser rata-rata 5,5 menit tetapi tidak menggeser median. 3: periksa batang mulai dari nol dan garis memakai selang bulan yang sama. 4: bergantung pekerjaanmu; periksa daftar di contoh terselesaikan. 5: opsional.

**Latihan bercampur.** 1: titik sebar berwarna menurut kelompok; tulis bahwa nama kelompok ukuran, bukan jenis, dan data karangan. 2: tampilkan angka di tiap sel, bukan hanya warna, dan tulis arti baris dan kolom. 3: karena hubungan di luar rentang data tidak diketahui; garis hanya merangkum rentang data yang ada.

**Ulang berjarak.** 1: karena panjang batang mewakili besar nilai; sumbu dipotong membuat selisih kecil tampak besar. 2: pencilan menggeser rata-rata; lengkapi dengan median dan sebaran atau titik datanya. 3: batang untuk membandingkan, garis untuk perubahan, titik sebar untuk hubungan, histogram atau kotak-garis untuk sebaran.

## Langkah berikutnya

Modul berikut: `d-x2-m10` (teks sebagai data), tempat kamu mengubah kalimat menjadi angka. Bacaan pendamping: `pendamping-periksa-fakta-dan-baca-lateral` untuk memeriksa klaim yang disajikan lewat grafik.

## Rujukan

- Orange Data Mining: widget Bar Plot. <https://orangedatamining.com/widget-catalog/visualize/barplot/>
- Orange Data Mining: widget Box Plot. <https://orangedatamining.com/widget-catalog/visualize/boxplot/>
- Orange Data Mining: widget Scatter Plot. <https://orangedatamining.com/widget-catalog/visualize/scatterplot/>
- From Data to Viz: Dataviz caveats (bacaan tambahan, bukan sumber resmi). <https://www.data-to-viz.com/caveats.html>
- Panduan Mata Pelajaran Informatika, Fase D – F, 2025. <https://repositori.kemendikdasmen.go.id/33634/1/32.%20Panduan%20Mata%20Pelajaran%20Informatika.pdf>
