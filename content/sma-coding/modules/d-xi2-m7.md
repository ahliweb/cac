## Untuk siapa modul ini

Modul ini untuk murid kelas XI jalur D (kecerdasan buatan dan analisis data), untuk minggu `D-XI2-M7` silabus v1.3: gagasan jaringan saraf, yaitu menjelaskan neuron, bobot, dan pelatihan secara konseptual. Prasyarat: modul `d-xi2-m6`. Alat: Python 3 saja (modul `math`), tanpa pustaka tambahan dan tanpa akun; semua angka bisa dihitung dengan tangan.

Modul ini berstatus DRAF: karangan penyusun, belum ditinjau pemilik. Jalur D adalah pengayaan di luar rumusan capaian pembelajaran (CP). Minggu ini beririsan dengan butir `F-AP-d` (memakai library untuk model) pada tingkat rendah, hanya karena alatnya coding; irisan itu **tidak dihitung** sebagai pemenuhan CP.

Aturan jalur D yang berlaku: data hanya sintetis (karangan) atau terbuka dengan lisensi jelas, tanpa data yang bisa mengenali orang; wajah, suara, dan foto orang tidak dipakai sebagai data; AI generatif boleh dipakai dengan etika dan dicatat, tanpa data pribadi, kata sandi, atau tugas bernilai pada permintaanmu, dan kamu tidak wajib punya akun. Saran: jawab dulu sendiri, baru minta AI memberi petunjuk bertahap; kode buatan AI dibaca, dijalankan, dan diuji. Setiap soal `Latihan` bertanda `AI: boleh` atau `AI: tanpa AI`.

Catatan untuk guru: blok Python dijalankan penyusun dengan `python3 -I` (Python 3.14.6, hanya pustaka standar, per 2026-11) dan keluarannya ditempel apa adanya; yang dinyatakan hanya "bisa dijalankan dengan keluaran ini", bukan "benar untuk semua masukan". Modul ini konseptual; jaringan sungguhan dilatih di `D-XI2-M8`. Semua angka karangan penyusun.

## Ingat kembali

Jawab dari ingatan, baru cek di bagian kunci.

1. Apa yang dicatat tentang pemakaian AI dalam sebuah proyek? (dari `D-XI1-M13`)
2. Mengapa model pada piksel mentah bisa gagal pada gambar yang bentuknya sama tetapi letaknya bergeser? (dari `d-xi2-m6`)
3. Apa beda matriks hitungan kata dan TF-IDF, dan apa yang tidak ditangkap keduanya? (dari `d-xi2-m4`)

## Tujuan

Setelah modul ini kamu dapat:

- menghitung keluaran satu neuron dari masukan, bobot, bias, dan fungsi aktivasi (langkah, sigmoid, ReLU);
- menggambar diagram neuron dan jaringan kecil dengan bagian bernama;
- menghitung jumlah parameter jaringan berlapis;
- menjelaskan pelatihan sebagai pengubahan bobot untuk memperkecil kerugian, dan peran laju belajar;
- menyebut dengan jujur apa yang bisa dan tidak bisa dikatakan tentang jaringan saraf.

Keluaran yang diminta silabus: diagram beranotasi (hitung keluaran satu neuron dengan tangan).

## Prediksi dulu

Tebak dan tulis keluarannya, baru jalankan: nilai jumlah berbobot `z`, lalu keluaran setelah aktivasi ReLU.

```python
x = [1, 0, 1]
w = [0.5, 0.9, -0.4]
b = -0.5
z = sum(xi * wi for xi, wi in zip(x, w)) + b
print(round(z, 2), round(max(0, z), 2))
```

Tulis juga: mengapa bobot 0,9 tidak menyumbang.

## Contoh terselesaikan

**Satu neuron.** Neuron menerima beberapa masukan `x`, mengalikan tiap masukan dengan bobotnya `w`, menjumlahkannya, menambahkan **bias** `b`, lalu memasukkan hasilnya `z` ke **fungsi aktivasi** `f`. Fungsi langkah menjawab 1 bila `z` nol atau lebih dan 0 bila kurang; sigmoid `1 / (1 + e^(-z))` menghasilkan angka mulus antara 0 dan 1; ReLU menjawab `z` bila positif dan 0 bila tidak.

```text
 x1 --(bobot w1)--\
                   +--> z = w1*x1 + w2*x2 + b --> aktivasi f --> keluaran a
 x2 --(bobot w2)--/            ^
                               |
                           bias b
```

Neuron pertama memakai `x = [2, 1]`, `w = [0,5; -1,0]`, dan `b = 0,3`: `z = 2 * 0,5 + 1 * (-1,0) + 0,3 = 0,3`, dan sigmoid(0,3) sekitar 0,574. Yang kedua memakai `x = [1, 2, 3]`, `w = [0,2; -0,1; 0,4]`, `b = -0,5`.

```python
import math


def sigmoid(z):
    return 1 / (1 + math.exp(-z))


def neuron(x, w, b):
    z = sum(xi * wi for xi, wi in zip(x, w)) + b
    return z, sigmoid(z)


z, a = neuron([2, 1], [0.5, -1.0], 0.3)
print(round(z, 3), round(a, 3))
z, a = neuron([1, 2, 3], [0.2, -0.1, 0.4], -0.5)
print(round(z, 3), round(a, 3), round(max(0, z), 3))
```

```text
0.3 0.574
0.7 0.668 0.7
```

Baris kedua: `z = 0,2 - 0,2 + 1,2 - 0,5 = 0,7`, sigmoid 0,668, ReLU 0,7. **Jaringan** adalah banyak neuron yang disusun berlapis: keluaran satu lapis menjadi masukan lapis berikutnya. Jaringan 2 masukan, 3 neuron tersembunyi, dan 1 keluaran punya 2 kali 3 bobot + 3 bias di lapis tersembunyi dan 3 kali 1 bobot + 1 bias di lapis keluaran, jumlahnya 13 parameter.

**Pelatihan.** Awalnya bobot sembarang, sehingga tebakan jelek. Pelatihan mengukur **kerugian** (jarak tebakan dari jawaban) lalu menggeser tiap bobot sedikit ke arah yang memperkecil kerugian, berulang kali. Dua contoh kecil. Pertama, satu neuron (aturan perceptron) belajar gerbang AND dari empat contoh: setiap kali salah, bobot digeser sebesar `laju * galat * masukan`. Kedua, satu bobot menebak `y = w * x` dengan x = 2 dan jawaban 6; kerugiannya kuadrat selisih, dan bobot digeser melawan kemiringan kerugian (gradien).

```python
def langkah(z):
    return 1 if z >= 0 else 0


data = [([0, 0], 0), ([0, 1], 0), ([1, 0], 0), ([1, 1], 1)]
w = [0.0, 0.0]
b = 0.0
laju = 0.5
for putaran in range(1, 7):
    salah = 0
    for x, target in data:
        keluaran = langkah(x[0] * w[0] + x[1] * w[1] + b)
        galat = target - keluaran
        if galat != 0:
            salah += 1
            w[0] += laju * galat * x[0]
            w[1] += laju * galat * x[1]
            b += laju * galat
    print(putaran, w, b, salah)

x, target = 2.0, 6.0
w = 0.0
laju = 0.05
for ke in range(1, 7):
    keluaran = w * x
    kerugian = (keluaran - target) ** 2
    gradien = 2 * (keluaran - target) * x
    print(ke, round(w, 3), round(kerugian, 3))
    w -= laju * gradien
```

```text
1 [0.5, 0.5] 0.0 2
2 [1.0, 0.5] -0.5 3
3 [1.0, 0.5] -1.0 3
4 [1.0, 1.0] -1.0 2
5 [1.0, 0.5] -1.5 1
6 [1.0, 0.5] -1.5 0
1 0.0 36.0
2 1.2 12.96
3 1.92 4.666
4 2.352 1.68
5 2.611 0.605
6 2.767 0.218
```

Baca hasilnya. Pada neuron AND, kesalahan tiap putaran adalah 2, 3, 3, 2, 1, lalu 0 pada putaran 6, dengan `w = [1,0; 0,5]` dan `b = -1,5`: hanya masukan (1, 1) menghasilkan `z = 0`, sehingga 1. Pada satu bobot, kerugian turun dari 36 menjadi 0,218 dalam enam langkah dan `w` mendekati 3 (6 dibagi 2). Tiga hal yang perlu diingat. Laju belajar menentukan: terlalu besar, kerugian melonjak; terlalu kecil, belajar lambat (Latihan 4). Pelatihan tidak "memahami": ia menggeser angka agar kerugian turun pada data yang diberikan. Dan jaringan tidak berpikir seperti otak; yang bisa dikatakan hanyalah apa yang diukur, misalnya ketepatan pada data uji.

## Contoh setengah jadi

Isi bagian `____` supaya program menghitung keluaran neuron berfungsi ReLU dari `x = [1, 2]`, `w = [0,5; 0,25]`, dan `b = -1`.

```python setengah-jadi
x = [1, 2]
w = [0.5, 0.25]
b = -1
z = x[0] * w[0] + x[1] * ____ + ____
print(z)
print(max(____, z))
```

## Soal Parsons

Susun baris menjadi fungsi `relu` yang mengembalikan `z` bila positif dan 0 bila tidak, lalu mencetak `relu(-2)` dan `relu(3)`. Lekukan dipakai di sini; yang diacak hanya urutannya.

```text
    return z if z > 0 else 0
print(relu(-2), relu(3))
def relu(z):
```

## Latihan

1. **Satu neuron di kertas.** (`AI: tanpa AI`) `x = [3, -1]`, `w = [0,4; 0,6]`, `b = 0,2`. Hitung `z`, keluaran langkah, ReLU, dan sigmoid (dua desimal).
2. **Hitung parameter.** (`AI: tanpa AI`) Jaringan dengan 4 masukan, satu lapis tersembunyi berisi 3 neuron, dan 1 keluaran. Berapa bobot, bias, dan seluruh parameternya? Gambar diagramnya dengan semua bagian diberi nama.
3. **Gerbang OR.** (`AI: boleh`) Ubah target pada contoh perceptron menjadi 0, 1, 1, 1 dan jalankan sampai tidak ada kesalahan. Pada putaran berapa itu terjadi, dan berapa `w` dan `b` akhirnya?
4. **Laju belajar.** (`AI: boleh`) Ubah `laju` pada contoh satu bobot menjadi 0,3 dan 0,01, dan catat kerugian enam langkah pertama. Apa yang kamu lihat?
5. **Catatan pemakaian AI (opsional).** Bila memakai asisten AI untuk menjelaskan neuron atau memeriksa hitunganmu, hitung dulu sendiri, bandingkan dengan jawaban AI, dan catat alat, tujuan, garis besar perintah, bagian yang dipakai, dan cara memeriksanya. Jawaban AI bisa keliru, termasuk dalam berhitung.

## Latihan bercampur

1. Dari `d-xi2-m6`: gambar 8 kali 8 diratakan menjadi 64 masukan untuk satu lapis tersembunyi berisi 10 neuron. Berapa bobot dan bias di lapis itu?
2. Dari `d-xi2-m4`: mengapa jaringan tidak bisa menerima kalimat apa adanya, dan apa yang dilakukan lebih dulu?

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `d-xi2-m8` (sekitar satu minggu lagi), `D-XI2-M10` (sekitar tiga minggu lagi), dan `D-XII1-M1` (sekitar delapan minggu lagi). Jawab sekarang lalu simpan.

1. Sebutkan bagian satu neuron dan cara menghitung keluarannya.
2. Apa yang dilakukan pelatihan jaringan saraf pada bobot, dan apa itu kerugian?
3. Mengapa jaringan saraf tidak "berpikir seperti otak", dan apa yang boleh dikatakan tentangnya?

## Kesalahan umum

- **"Neuron buatan sama dengan sel saraf."** Namanya terinspirasi, tetapi neuron buatan hanyalah jumlah berbobot dan fungsi sederhana.
- **"Bobot berubah saat model dipakai menebak."** Bobot berubah saat pelatihan; saat menebak, bobot dikunci.
- **"Lebih banyak lapis pasti lebih pintar."** Lebih banyak parameter berarti lebih banyak peluang menghafal derau; ia diuji pada data uji.

## Cek mandiri

- [ ] Saya dapat menghitung keluaran satu neuron dengan tangan.
- [ ] Saya dapat menggambar dan menamai bagian neuron.
- [ ] Saya dapat menghitung jumlah parameter jaringan berlapis.
- [ ] Saya dapat menjelaskan pelatihan dan laju belajar.
- [ ] Saya dapat menyebut apa yang tidak boleh dikatakan tentang jaringan saraf.
- [ ] Saya mencatat pemakaian AI bila saya memakainya.

## Kunci dan petunjuk

**Ingat kembali.** 1: alat, tujuan, garis besar perintah, bagian yang dipakai, dan cara memeriksanya (kode dibaca, dijalankan, diuji). 2: karena piksel mentah menyimpan letak, bukan bentuk; garis yang bergeser mengubah hampir semua piksel. 3: hitungan memakai jumlah kata; TF-IDF memperkecil bobot kata yang ada di banyak kalimat; keduanya membuang urutan kata.
**Prediksi dulu.** Keluaran: `-0.4 0`. `z = 1 * 0,5 + 0 * 0,9 + 1 * (-0,4) - 0,5 = -0,4`; ReLU mengubah angka negatif menjadi 0. Bobot 0,9 dikalikan masukan 0, jadi tidak menyumbang.

**Contoh setengah jadi.** Isian: `w[1]`, `b`, `0`.

```python
x = [1, 2]
w = [0.5, 0.25]
b = -1
z = x[0] * w[0] + x[1] * w[1] + b
print(z)
print(max(0, z))
```

```text
0.0
0
```

`z = 0,5 + 0,5 - 1 = 0`, ReLU 0.

**Soal Parsons.** Urutan benar:

```python
def relu(z):
    return z if z > 0 else 0
print(relu(-2), relu(3))
```

```text
0 3
```

**Latihan.** 1: `z = 3 * 0,4 + (-1) * 0,6 + 0,2 = 0,8`; langkah 1; ReLU 0,8; sigmoid 0,69. 2: bobot 4 kali 3 = 12 dan bias 3 pada lapis tersembunyi; bobot 3 kali 1 = 3 dan bias 1 pada lapis keluaran; total 12 + 3 + 3 + 1 = 19 parameter. Diagram: empat simpul masukan, tiga simpul tersembunyi dengan garis bobot dari tiap masukan, satu simpul keluaran dengan garis dari tiap simpul tersembunyi, dan bias pada tiap neuron. 3: tidak ada kesalahan mulai putaran 4; `w = [0,5; 0,5]` dan `b = -0,5`. Pada contoh AND, bagian langkah yang sama memberi `w = [1,0; 0,5]` dan `b = -1,5` (putaran 6): bobotnya berbeda untuk soal yang berbeda. 4: laju 0,3: kerugian dan bobot enam langkah berturut-turut: 36 (w 0), 70,56 (w 7,2), 138,298 (w -2,88), 271,063, 531,284, 1041,317: kerugian membesar karena langkah melompati jawaban; laju 0,01: 36; 30,47; 25,79; 21,829; 18,476; 15,638: turun tetapi pelan. 5: opsional; yang dinilai adalah hitungan sendiri yang dibandingkan jujur dengan jawaban AI.

**Latihan bercampur.** 1: bobot 64 kali 10 = 640 dan bias 10, jadi 650 parameter. 2: jaringan hanya menghitung dengan angka; kalimat harus lebih dulu diubah menjadi angka, misalnya matriks hitungan kata.

**Ulang berjarak.** 1: masukan `x`, bobot `w`, bias `b`; hitung `z = jumlah (w kali x) + b`, lalu masukkan ke fungsi aktivasi untuk mendapatkan keluaran. 2: pelatihan menggeser bobot sedikit demi sedikit ke arah yang memperkecil kerugian, yaitu ukuran jarak tebakan dari jawaban. 3: karena neuron buatan hanya menghitung jumlah berbobot dan fungsi sederhana, dan pelatihan menggeser angka agar kerugian turun; boleh dikatakan apa yang diukur (misalnya ketepatan pada data uji), bukan bahwa ia memahami atau berpikir.

## Langkah berikutnya

Modul berikut: `d-xi2-m8` (melatih jaringan kecil), yang memakai jaringan saraf `scikit-learn` pada data tabel sintetis. Bacaan lanjut: bagian jaringan saraf berlapis pada panduan pengguna `scikit-learn`; pengantar AI Elements of AI (bacaan tambahan; syarat akun dan bahasa tidak diperiksa penyusun).
