## Untuk siapa modul ini

Modul ini untuk murid kelas XI jalur D (kecerdasan buatan dan analisis data), untuk minggu `D-XI1-M8` silabus v1.3: prediksi sederhana dengan rata-rata bergerak dan regresi linear, serta pengukuran galat. Prasyarat: modul `d-xi1-m7`. Alat: Python 3 dengan pustaka `pandas` dan `numpy`, tanpa akun.

Modul ini karangan penyusun dan disetujui pemilik program pada 2026-11-20 (keputusan lewat dialog; catatan tinjauan menjadi tindak lanjut revisi). Jalur D adalah pengayaan di luar rumusan capaian pembelajaran (CP). Minggu ini beririsan dengan butir `F-AD-a` (data terbuka dan legal, prediksi) pada tingkat sedang; irisan itu **tidak dihitung** sebagai pemenuhan CP.

Aturan jalur D yang berlaku: data hanya sintetis (karangan) atau terbuka dengan lisensi jelas, tanpa data yang bisa mengenali orang; wajah, suara, dan foto orang tidak dipakai sebagai data; AI generatif boleh dipakai dengan etika dan dicatat, tanpa data pribadi, kata sandi, atau tugas bernilai pada permintaanmu, dan kamu tidak wajib punya akun. Saran: jawab dulu sendiri, baru minta AI memberi petunjuk bertahap; kode buatan AI dibaca, dijalankan, dan diuji. Setiap soal `Latihan` bertanda `AI: boleh` atau `AI: tanpa AI`.

Catatan untuk guru: blok Python dijalankan penyusun dengan `python3 -I` (Python 3.14.6, `pandas` 3.1.1, `numpy` 2.5.5, per 2026-11) dan keluarannya ditempel apa adanya; yang dinyatakan hanya "bisa dijalankan dengan keluaran ini", bukan "benar untuk semua masukan". Data pengunjung sebuah taman baca fiktif adalah karangan penyusun, bukan data nyata. Perbandingan tiga cara pada 3 minggu uji adalah contoh kecil, bukan bukti bahwa satu cara selalu terbaik.

## Ingat kembali

Jawab dari ingatan, baru cek di bagian kunci.

1. Mengapa rata-rata bisa menyesatkan, dan apa pelengkapnya? (dari `d-xi1-m7`)
2. Mengapa dataset yang lisensinya tidak jelas tidak dipakai, dan apa yang dilakukan sebagai gantinya? (dari `d-xi1-m5`)
3. Bagaimana menghitung rata-rata dari daftar angka dengan perulangan, tanpa fungsi siap pakai? (dari `d-xi1-m2`)
4. Apa itu galat (MAE atau RMSE) dan bagaimana menghitungnya dari selisih? (dari `d-x2-m5`)

## Tujuan

Setelah modul ini kamu dapat:

- menghitung rata-rata bergerak dan memakainya sebagai tebakan nilai berikutnya;
- mencocokkan garis lurus pada data berurutan dengan `numpy.polyfit` dan membaca kemiringan serta titik potongnya;
- menghitung galat rata-rata mutlak (MAE) pada data yang tidak dipakai menyusun tebakan;
- membandingkan sebuah tebakan dengan pembanding sederhana, misalnya "sama dengan nilai terakhir";
- menjelaskan mengapa tebakan jauh di luar rentang data tidak dapat dipercaya.

Keluaran yang diminta silabus: skrip prediksi (prediksi nilai berikutnya dan galat).

## Prediksi dulu

Tebak dan tulis dua keluaran, baru jalankan.

```python
data = [10, 12, 11, 14]
print(round(sum(data[-3:]) / 3, 2))
print(data[-1] - data[0])
```

Tulis juga: bila deretan angkanya terus naik, apakah rata-rata tiga angka terakhir cenderung di atas atau di bawah angka berikutnya yang sebenarnya?

## Contoh terselesaikan

**Tiga cara menebak, satu ukuran galat.** Taman baca fiktif mencatat jumlah pengunjung 12 minggu. Kita ingin menebak minggu 10 sampai 12 tanpa memakai ketiga minggu itu untuk menyusun garis. Langkahnya: (1) pembanding sederhana: tebakan sama dengan minggu sebelumnya; (2) rata-rata bergerak tiga minggu dari tiga minggu sebelumnya; (3) garis lurus yang dicocokkan pada minggu 1 sampai 9; (4) hitung MAE, yaitu rata-rata selisih mutlak antara tebakan dan kenyataan.

```python
import numpy as np
import pandas as pd

# pengunjung taman baca fiktif per minggu (data karangan)
pengunjung = pd.Series(
    [52, 55, 53, 58, 61, 60, 64, 67, 66, 70, 73, 72], index=range(1, 13)
)
latih = pengunjung.loc[1:9]
uji = pengunjung.loc[10:12]

tebak_terakhir = pengunjung.shift(1).loc[10:12]
tebak_rata = pengunjung.shift(1).rolling(3).mean().loc[10:12]
a, b = np.polyfit(latih.index, latih.values, 1)
tebak_garis = pd.Series([a * t + b for t in uji.index], index=uji.index)

tabel = pd.DataFrame(
    {"nyata": uji, "terakhir": tebak_terakhir, "rata3": tebak_rata, "garis": tebak_garis}
)
print(tabel.round(2))
for nama in ["terakhir", "rata3", "garis"]:
    print(nama, "MAE =", round((tabel["nyata"] - tabel[nama]).abs().mean(), 2))
print("garis: a =", round(a, 2), "b =", round(b, 2))
print("minggu 13:", round(a * 13 + b, 1))
print("minggu 52:", round(a * 52 + b, 1))
```

```text
    nyata  terakhir  rata3  garis
10     70      66.0  65.67  69.22
11     73      70.0  67.67  71.16
12     72      73.0  69.67  73.09
terakhir MAE = 2.67
rata3 MAE = 4.0
garis MAE = 1.24
garis: a = 1.93 b = 49.89
minggu 13: 75.0
minggu 52: 150.4
```

Baca hasilnya. Tebakan "sama dengan minggu lalu" punya MAE 2,67. Rata-rata bergerak justru **lebih buruk**, 4,0, karena ia menebak dari angka lama (minggu 7 sampai 9) sehingga selalu tertinggal pada data yang terus naik. Garis lurus menang dengan MAE 1,24: kemiringan `a` sekitar 1,93 berarti kira-kira 1,9 pengunjung bertambah tiap minggu, dan `b` adalah titik potong di minggu 0. Perbandingan ini malah agak merugikan garis, sebab dua tebakan lain boleh melihat kenyataan minggu sebelumnya sedangkan garis tidak melihat minggu 10 sampai 12 sama sekali.

**Batas yang tidak boleh dilanggar.** Garis menebak minggu 13 sekitar 75 pengunjung, wajar. Tetapi untuk minggu 52 ia menebak sekitar 150, dua kali lipat angka tertinggi yang pernah ada: garis tidak tahu ada kapasitas ruangan atau musim liburan. Seperti di `d-x2-m4`, jangan menebak jauh di luar rentang data, dan tuliskan bahwa tebakan hanya berlaku di sekitar data yang ada. Dan karena datanya karangan, semua angka di sini hanya latihan.

## Contoh setengah jadi

Isi bagian `____` supaya program mencetak rata-rata bergerak tiga angka pada tiap posisi, dibulatkan dua desimal. Jangan memakai `rolling`; pakai perulangan seperti di `d-xi1-m2`.

```python setengah-jadi
data = [10, 12, 11, 14, 13]
k = 3
for i in range(k, len(data) + 1):
    jendela = data[i - ____ : i]
    print(i, round(sum(jendela) / ____, 2))
```

## Soal Parsons

Susun baris menjadi program yang mencocokkan garis lurus pada lima titik lalu mencetak tebakan untuk x = 6, dibulatkan satu desimal. Lekukan tidak dipakai; yang diacak hanya urutannya.

```text
print(round(a * 6 + b, 1))
import numpy as np
y = [2, 4, 6, 8, 10]
a, b = np.polyfit(x, y, 1)
x = [1, 2, 3, 4, 5]
```

## Latihan

1. **Hitung tangan.** (`AI: tanpa AI`) Untuk data `[4, 6, 5, 9]`, tulis tebakan rata-rata bergerak tiga angka untuk titik berikutnya. Lalu, bila kenyataan dua titik berikutnya `[6, 9]` dan tebakannya `[5, 7]`, hitung MAE.
2. **Tulis rancangan dulu, lalu kode.** (`AI: tanpa AI`) Tulis pseudocode untuk membagi data berurutan menjadi bagian latih (angka awal) dan bagian uji (angka akhir), lalu tulis programnya. Mengapa data berurutan waktu tidak diacak sebelum dibagi?
3. **Tiga cara pada datamu.** (`AI: boleh`) Ambil data berurutan dengan sedikitnya 10 titik (data fiktif buatanmu atau dataset dari `d-xi1-m5` yang lisensinya sudah dicatat). Hitung MAE untuk "nilai terakhir", rata-rata bergerak, dan garis lurus pada 3 titik uji terakhir. Tulis satu kalimat cara mana yang menang dan satu batasan kesimpulanmu.
4. **Temukan kekeliruan.** (`AI: boleh`) Seorang murid mencocokkan garis pada minggu 1 sampai 9, lalu menghitung MAE pada minggu 1 sampai 9 juga, mendapat angka yang sangat kecil, dan menyimpulkan modelnya hebat. Apa yang keliru dan bagaimana memperbaikinya?
5. **Catatan pemakaian AI (opsional).** Bila memakai asisten AI, catat alat, tujuan, garis besar perintah, bagian yang dipakai, dan cara memeriksanya.

## Latihan bercampur

1. Dari `d-xi1-m7`: untuk `[2, 3, 3, 50]`, tulis rata-rata dan median, lalu mana yang lebih mewakili.
2. Dari `d-xi1-m2`: tulis perulangan yang mencetak MAE dari dua daftar `nyata = [6, 9]` dan `tebak = [5, 7]` tanpa fungsi `mean`.

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `d-xi1-m9` (sekitar satu minggu lagi), `d-xi1-m11` (sekitar tiga minggu lagi), dan modul jalur D kelas XI semester 2 pada minggu `D-XI2-M2` (sekitar delapan minggu lagi). Jawab sekarang lalu simpan.

1. Mengapa galat prediksi dihitung pada data yang tidak dipakai menyusun prediksinya?
2. Mengapa model yang menang pada satu data belum tentu menang pada data lain?
3. Mengapa rata-rata bergerak tertinggal pada data yang terus naik?

## Kesalahan umum

- **"Galat kecil pada data latih berarti modelnya bagus."** Model bisa menghafal data latih; galat yang jujur dihitung pada data yang tidak dipakai menyusunnya.
- **"Rata-rata bergerak selalu menebak lebih baik daripada nilai terakhir."** Pada data yang terus naik atau turun ia tertinggal; pada data yang naik turun acak ia bisa lebih baik. Selalu bandingkan dengan pembanding sederhana.
- **"Garis lurus boleh dipakai untuk menebak jauh ke depan."** Garis tidak mengenal batas atau musim; tebakan jauh di luar rentang data tidak dipercaya.
- **"Data berurutan waktu boleh diacak sebelum dibagi."** Mengacak membuat bagian latih memuat masa depan dari bagian uji; bagi menurut urutan waktu.
- **"Prediksi sama dengan kepastian."** Tebakan punya galat; laporkan galatnya bersama tebakannya.

## Cek mandiri

- [ ] Saya dapat menghitung rata-rata bergerak dengan tangan dan dengan perulangan.
- [ ] Saya dapat membaca `a` dan `b` dari `np.polyfit` dan menafsirkannya.
- [ ] Saya menghitung MAE pada data yang tidak dipakai menyusun tebakan.
- [ ] Saya menulis pembanding sederhana sebelum mencoba cara yang lebih rumit.
- [ ] Saya menyebut batas tebakanku dan tidak menebak jauh di luar rentang data.
- [ ] Saya mencatat pemakaian AI bila saya memakainya.

## Kunci dan petunjuk

**Ingat kembali.** 1: pencilan menggeser rata-rata; lengkapi dengan median dan sebaran atau titik datanya. 2: syaratnya tidak jelas berarti tidak boleh dipakai; gantinya dataset berlisensi jelas atau data sintetis karangan sendiri, dan catat alasannya. 3: jumlahkan dengan `total = total + x` lalu bagi dengan `len(daftar)`. 4: galat adalah selisih antara tebakan dan kenyataan; MAE adalah rata-rata nilai mutlak selisih, RMSE adalah akar rata-rata kuadrat selisih.

**Prediksi dulu.** Keluaran: `12.33` (rata-rata dari 12, 11, 14 adalah 37 dibagi 3) lalu `4` (14 dikurangi 10). Pada data yang terus naik, rata-rata tiga angka terakhir cenderung **di bawah** angka berikutnya, karena ia dihitung dari angka yang lebih lama.

**Contoh setengah jadi.** Isian: `k` dan `k` (atau `len(jendela)`).

```python
data = [10, 12, 11, 14, 13]
k = 3
for i in range(k, len(data) + 1):
    jendela = data[i - k : i]
    print(i, round(sum(jendela) / k, 2))
```

```text
3 11.0
4 12.33
5 12.67
```

Posisi 3 memakai 10, 12, 11 (rata-rata 11,0); posisi 4 memakai 12, 11, 14; posisi 5 memakai 11, 14, 13.

**Soal Parsons.** Urutan benar:

```python
import numpy as np
x = [1, 2, 3, 4, 5]
y = [2, 4, 6, 8, 10]
a, b = np.polyfit(x, y, 1)
print(round(a * 6 + b, 1))
```

```text
12.0
```

`x` dan `y` harus ada sebelum `polyfit` memakainya, dan `a` dan `b` harus ada sebelum dicetak.

**Latihan.** 1: tebakan (6 + 5 + 9) / 3 = 6,67; selisih mutlak |6 - 5| = 1 dan |9 - 7| = 2, MAE = 3 / 2 = 1,5. 2: contoh pseudocode: panjang data n; tetapkan batas = n - 3; latih = data[:batas]; uji = data[batas:]. Kode: `latih = data[:-3]` dan `uji = data[-3:]`. Data berurutan waktu tidak diacak karena acakan menaruh titik masa depan di bagian latih, sehingga model seolah "melihat" yang belum terjadi. 3: dinilai dari tiga MAE yang dihitung pada titik uji, satu kalimat pemenang, dan satu batasan (misalnya tebakan hanya berlaku di sekitar data). 4: MAE dihitung pada data yang sama dengan yang dipakai menyusun garis, jadi tidak menguji kemampuan menebak yang belum terlihat; perbaikan: hitung pada minggu 10 sampai 12 yang disisihkan. 5: opsional.

Pemeriksaan untuk soal 2 dan latihan bercampur:

```python
import numpy as np

print(np.polyfit([1, 2, 3, 4], [3, 5, 7, 9], 1).round(2).tolist())
data = [4, 6, 5, 9, 7, 8]
print(data[:-3], data[-3:])
nyata = [6, 9]
tebak = [5, 7]
total = 0
for n, t in zip(nyata, tebak):
    total = total + abs(n - t)
print(total / len(nyata))
```

```text
[2.0, 1.0]
[4, 6, 5] [9, 7, 8]
1.5
```

Garis `[2.0, 1.0]` berarti kemiringan 2 dan titik potong 1, jadi tebakan x = 5 adalah 11.

**Latihan bercampur.** 1: rata-rata 14,5 dan median 3,0; median lebih mewakili tiga dari empat angka, tetapi 50 tetap dilaporkan bila ia penting. 2: lihat blok di atas; keluaran terakhir `1.5`.

**Ulang berjarak.** 1: karena galat pada data yang dipakai menyusun tebakan tidak menguji kemampuan menebak yang belum terlihat. 2: karena hasil bergantung pada data; pada data lain kecenderungannya bisa berbeda, jadi diuji lagi. 3: karena ia menebak dari angka lama, sehingga selalu di belakang kecenderungan naik.

## Langkah berikutnya

Modul berikut: `d-xi1-m9` (klasifikasi dengan `scikit-learn`), tempat kamu memprediksi **kategori**, bukan angka. Bacaan lanjut: dokumentasi resmi `numpy.polyfit` dan `pandas` tentang `rolling`.
