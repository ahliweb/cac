## Untuk siapa modul ini

Modul ini untuk murid kelas XI jalur D (kecerdasan buatan dan analisis data), untuk minggu `D-XI2-M4` silabus v1.3: teks, yaitu membersihkan teks dan merepresentasikannya sebagai angka. Prasyarat: modul `d-xi2-m3`; sebaiknya kamu juga ingat teks sebagai fitur di Orange (`d-x2-m10`). Alat: Python 3 dengan pustaka `pandas` dan `scikit-learn`, tanpa akun.

Modul ini berstatus DRAF: karangan penyusun, belum ditinjau pemilik. Jalur D adalah pengayaan di luar rumusan capaian pembelajaran (CP). Minggu ini beririsan dengan butir `F-AP-d` (memakai library untuk model) pada tingkat rendah, hanya karena alatnya coding; irisan itu **tidak dihitung** sebagai pemenuhan CP.

Aturan jalur D yang berlaku: data hanya sintetis (karangan) atau terbuka dengan lisensi jelas, tanpa data yang bisa mengenali orang; wajah, suara, dan foto orang tidak dipakai sebagai data; AI generatif boleh dipakai dengan etika dan dicatat, tanpa data pribadi, kata sandi, atau tugas bernilai pada permintaanmu, dan kamu tidak wajib punya akun. Saran: jawab dulu sendiri, baru minta AI memberi petunjuk bertahap; kode buatan AI dibaca, dijalankan, dan diuji. Setiap soal `Latihan` bertanda `AI: boleh` atau `AI: tanpa AI`.

Catatan untuk guru: blok Python dijalankan penyusun dengan `python3 -I` (Python 3.14.6, `pandas` 3.1.1, `scikit-learn` 1.9.1, per 2026-11) dan keluarannya ditempel apa adanya; yang dinyatakan hanya "bisa dijalankan dengan keluaran ini", bukan "benar untuk semua masukan". Seluruh kalimat adalah karangan penyusun; daftar kata henti kecil dalam contoh adalah pilihan penyusun, bukan daftar baku. Teks nyata, terutama dari orang, tidak dipakai di jalur ini.

## Ingat kembali

Jawab dari ingatan, baru cek di bagian kunci.

1. Sebutkan langkah mengubah teks menjadi fitur sebelum dipakai model. (dari `d-x2-m10`)
2. Mengapa ketepatan saja tidak cukup pada data yang timpang, dan metrik apa yang melengkapinya? (dari `D-XI1-M10`)
3. Mengapa memilih fitur memakai seluruh data sebelum membagi menghasilkan ketepatan yang terlalu bagus? (dari `d-xi2-m3`)
4. Mengapa fitur dengan angka besar bisa menguasai jarak, dan bagaimana mengatasinya? (dari `d-xi2-m1`)

## Tujuan

Setelah modul ini kamu dapat:

- membersihkan teks: huruf kecil, membuang tanda baca dan angka, memecah menjadi kata, dan membuang kata henti dengan hati-hati;
- membangun matriks hitungan kata (kantung kata) dengan `CountVectorizer` dan membacanya;
- menjelaskan beda hitungan kata dan bobot TF-IDF;
- menjelaskan mengapa kantung kata membuang urutan kata, dan bagaimana pasangan kata (bigram) menolong sebagian;
- memasang vektorizer pada data latih saja dan menyebut apa yang terjadi pada kata baru.

Keluaran yang diminta silabus: skrip teks (representasi kalimat sintetis).

## Prediksi dulu

Tebak dan tulis keluarannya, baru jalankan: daftar kata (dalam urutan apa), lalu isi matriks.

```python
from sklearn.feature_extraction.text import CountVectorizer

cv = CountVectorizer()
M = cv.fit_transform(["Saya suka suka kopi", "Kopi saya dingin"])
print(list(cv.get_feature_names_out()))
print(M.toarray())
```

Tulis juga: apakah huruf besar pada "Saya" dan "Kopi" menambah kata baru.

## Contoh terselesaikan

**Dari kalimat ke angka.** Model hanya menerima angka, jadi teks diubah dalam beberapa langkah: (1) huruf kecil; (2) buang tanda baca dan angka; (3) pecah menjadi kata; (4) buang kata henti yang sangat umum bila perlu; (5) hitung tiap kata per kalimat sehingga satu kalimat menjadi satu baris angka. Empat kalimat karangan di bawah dibersihkan dengan fungsi `bersihkan`, lalu diubah dengan dua cara: **hitungan kata** dan **TF-IDF**, yaitu hitungan yang bobotnya diperkecil untuk kata yang muncul di banyak kalimat (dokumentasi `TfidfVectorizer`) dan tiap baris dinormalkan. Daftar kata henti sengaja kecil, dan **kata "tidak" tidak dimasukkan** karena mengubah arti.

```python
import re

import pandas as pd
import sklearn
from sklearn.feature_extraction.text import CountVectorizer, TfidfVectorizer

kalimat = [
    "Aplikasi cepat, aplikasi mudah!",
    "Aplikasi LAMBAT dan sering macet.",
    "Tidak mudah, tidak cepat.",
    "Pengiriman cepat sekali!",
]
HENTI = {"dan", "sekali"}


def bersihkan(teks):
    teks = teks.lower()
    teks = re.sub(r"[^a-z\s]", " ", teks)  # buang tanda baca dan angka
    kata = teks.split()
    return [k for k in kata if k not in HENTI]


for k in kalimat:
    print(bersihkan(k))

bersih = [" ".join(bersihkan(k)) for k in kalimat]
cv = CountVectorizer()
M = cv.fit_transform(bersih)
print(pd.DataFrame(M.toarray(), columns=cv.get_feature_names_out()))

tf = TfidfVectorizer()
T = tf.fit_transform(bersih)
print(pd.DataFrame(T.toarray().round(2), columns=tf.get_feature_names_out()))

bi = CountVectorizer(ngram_range=(1, 2))
bi.fit(bersih)
print([f for f in bi.get_feature_names_out() if " " in f])
print("scikit-learn", sklearn.__version__)
```

```text
['aplikasi', 'cepat', 'aplikasi', 'mudah']
['aplikasi', 'lambat', 'sering', 'macet']
['tidak', 'mudah', 'tidak', 'cepat']
['pengiriman', 'cepat']
   aplikasi  cepat  lambat  macet  mudah  pengiriman  sering  tidak
0         2      1       0      0      1           0       0      0
1         1      0       1      1      0           0       1      0
2         0      1       0      0      1           0       0      2
3         0      1       0      0      0           1       0      0
   aplikasi  cepat  lambat  macet  mudah  pengiriman  sering  tidak
0      0.84   0.34    0.00   0.00   0.42        0.00    0.00   0.00
1      0.41   0.00    0.53   0.53   0.00        0.00    0.53   0.00
2      0.00   0.28    0.00   0.00   0.35        0.00    0.00   0.89
3      0.00   0.54    0.00   0.00   0.00        0.84    0.00   0.00
['aplikasi cepat', 'aplikasi lambat', 'aplikasi mudah', 'cepat aplikasi', 'lambat sering', 'mudah tidak', 'pengiriman cepat', 'sering macet', 'tidak cepat', 'tidak mudah']
scikit-learn 1.9.1
```

Baca hasilnya. Setelah dibersihkan, "LAMBAT" dan "lambat" menjadi satu kata, tanda baca hilang, dan "dan" serta "sekali" dibuang. Matriks hitungan punya delapan kolom (urut abjad) dan empat baris; baris 0 berisi `aplikasi` dua kali, `cepat` dan `mudah` masing-masing sekali. Pada matriks TF-IDF, kata yang hanya muncul di satu kalimat, misalnya `pengiriman` (0,84), mendapat bobot lebih besar daripada kata yang muncul di tiga kalimat seperti `cepat` (0,54 pada baris 3). Ada **dua hal yang tidak ditangkap keduanya**. Pertama, urutan: baris 2 ("tidak mudah, tidak cepat") berisi `mudah`, `cepat`, dan `tidak` dua kali, dan model tidak tahu bahwa "tidak" membalik arti kata sesudahnya. Pasangan kata (bigram) menyimpan sebagian urutan itu, dengan `tidak mudah` dan `tidak cepat` sebagai kolom sendiri, tetapi kolomnya menjadi jauh lebih banyak. Kedua, kata yang belum pernah dilihat. Itulah isi blok berikut: vektorizer dipasang pada data latih saja, lalu dipakai pada kalimat lain.

```python
from sklearn.feature_extraction.text import CountVectorizer

latih = ["aplikasi cepat", "aplikasi lambat sering macet", "pengiriman cepat"]
cv = CountVectorizer().fit(latih)  # kosakata dari data latih saja
print(list(cv.get_feature_names_out()))
print(cv.transform(["aplikasi keren cepat cepat"]).toarray())
print(list(CountVectorizer().fit(["saya a b makan"]).get_feature_names_out()))
```

```text
['aplikasi', 'cepat', 'lambat', 'macet', 'pengiriman', 'sering']
[[1 2 0 0 0 0]]
['makan', 'saya']
```

Kata `keren` tidak ada di kosakata latih, sehingga **diabaikan diam-diam**; hanya `aplikasi` (1) dan `cepat` (2) yang terhitung. Karena itu kosakata tidak boleh dihitung ulang dari data uji: kata uji yang baru akan membuat kolom yang tidak dikenal model. Satu catatan alat: bawaan `CountVectorizer` membuang kata yang hanya satu huruf (`a`, `b`), jadi periksa dulu bahwa kata penting tidak ikut terbuang.

## Contoh setengah jadi

Isi bagian `____` supaya program menghitung kata pada dua kalimat dan mencetak kolom dan barisnya.

```python setengah-jadi
from sklearn.feature_extraction.text import CountVectorizer

cv = CountVectorizer()
M = cv.____(["kopi panas panas", "kopi dingin"])
print(list(cv.get_feature_names_out()))
print(M.____())
print(M.toarray()[0][list(cv.get_feature_names_out()).index("____")])
```

## Soal Parsons

Susun baris menjadi program yang memasang vektorizer pada kalimat latih lalu mengubah satu kalimat uji menjadi baris angka. Lekukan tidak dipakai; yang diacak hanya urutannya.

```text
print(cv.transform(uji).toarray())
uji = ["kopi panas"]
cv = CountVectorizer().fit(latih)
latih = ["kopi panas panas", "teh dingin"]
from sklearn.feature_extraction.text import CountVectorizer
```

## Latihan

1. **Bersihkan dengan tangan.** (`AI: tanpa AI`) Dengan kata henti {dan, sekali}, tulis daftar kata hasil `bersihkan` untuk "Layanan, CEPAT sekali!!! Harga 5 ribu."
2. **Matriks di kertas.** (`AI: tanpa AI`) Kalimat bersih: "aplikasi bagus", "bagus bagus murah", "aplikasi lambat". Tulis kosakata berurut abjad dan matriks hitungannya.
3. **Kata henti yang salah.** (`AI: boleh`) Masukkan "tidak" ke `HENTI` dan jalankan ulang. Apa yang terjadi pada baris 2, dan mengapa itu berbahaya untuk klasifikasi?
4. **TF-IDF.** (`AI: boleh`) Dari tabel TF-IDF di contoh, kata mana yang bobotnya paling besar pada tiap baris, dan mengapa? Periksa bahwa jumlah kuadrat satu baris sekitar 1.
5. **Catatan pemakaian AI (opsional).** Bila memakai asisten AI, catat alat, tujuan, garis besar perintah, bagian yang dipakai, dan cara memeriksanya.

## Latihan bercampur

1. Dari `D-XI1-M10`: dari 100 pesan karangan, 95 bukan spam. Model yang selalu menjawab "bukan spam" mendapat ketepatan 0,95. Berapa recall untuk spam, dan apa artinya?
2. Dari `d-xi2-m3`: pembersihan membuang huruf besar dan tanda seru. Tulis dua fitur turunan yang dihitung dari teks **sebelum** dibersihkan dan mungkin berguna.

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `d-xi2-m5` (sekitar satu minggu lagi), `d-xi2-m7` (sekitar tiga minggu lagi), dan `D-XI2-M12` (sekitar delapan minggu lagi). Jawab sekarang lalu simpan.

1. Mengapa kata seperti "tidak" tidak boleh sembarang masuk daftar kata henti?
2. Apa beda matriks hitungan kata dan TF-IDF, dan apa yang tidak ditangkap keduanya?
3. Mengapa vektorizer dipasang pada data latih saja, dan apa yang terjadi pada kata baru di data uji?

## Kesalahan umum

- **"Teks dipahami komputer sebagai kalimat."** Model hanya melihat angka hasil hitungan; urutan dan makna tidak ikut kecuali dibuat menjadi fitur.
- **"Semua kata umum boleh dibuang."** Kata seperti "tidak" mengubah arti; daftar kata henti diperiksa, bukan disalin begitu saja.
- **"Kosakata boleh dibangun dari seluruh data."** Itu bocor: data uji ikut menentukan kolom.
- **"Kata baru akan menimbulkan galat."** Kata di luar kosakata diam-diam diabaikan, sehingga kalimat bisa tampak "kosong" bagi model.
- **"TF-IDF selalu lebih baik daripada hitungan."** Ia hanya memberi bobot lain; mana yang lebih baik diuji pada data, bukan dianggap.

## Cek mandiri

- [ ] Saya dapat menyebut langkah membersihkan teks dan mengapa tiap langkah dipakai.
- [ ] Saya dapat membuat dan membaca matriks hitungan kata.
- [ ] Saya dapat menjelaskan beda hitungan kata dan TF-IDF.
- [ ] Saya dapat menyebut apa yang hilang pada kantung kata.
- [ ] Saya memasang vektorizer hanya pada data latih.
- [ ] Saya mencatat pemakaian AI bila saya memakainya.

## Kunci dan petunjuk

**Ingat kembali.** 1: huruf kecil dan buang tanda baca, pecah menjadi kata, hitung kata per kalimat (kantung kata), lalu jadikan tiap kalimat satu baris angka. 2: pada data timpang, model yang selalu menebak kelas besar sudah tinggi ketepatannya; pelengkapnya presisi dan recall untuk kelas yang dicari. 3: karena label data uji ikut menentukan kolom yang dipilih, sehingga data uji tidak lagi belum terlihat. 4: karena jarak menjumlahkan selisih kuadrat; ubah skala dengan `StandardScaler`.

**Prediksi dulu.** Daftar kata urut abjad: `['dingin', 'kopi', 'saya', 'suka']`. Matriks: kalimat pertama `[0 1 1 2]` (kopi 1, saya 1, suka 2), kalimat kedua `[1 1 1 0]`. Huruf besar tidak menambah kata baru karena `CountVectorizer` mengubah huruf menjadi kecil secara bawaan.

**Contoh setengah jadi.** Isian: `fit_transform`, `toarray`, `panas`.

```python
from sklearn.feature_extraction.text import CountVectorizer

cv = CountVectorizer()
M = cv.fit_transform(["kopi panas panas", "kopi dingin"])
print(list(cv.get_feature_names_out()))
print(M.toarray())
print(M.toarray()[0][list(cv.get_feature_names_out()).index("panas")])
```

```text
['dingin', 'kopi', 'panas']
[[0 1 2]
 [1 1 0]]
2
```

**Soal Parsons.** Urutan benar:

```python
from sklearn.feature_extraction.text import CountVectorizer
latih = ["kopi panas panas", "teh dingin"]
cv = CountVectorizer().fit(latih)
uji = ["kopi panas"]
print(cv.transform(uji).toarray())
```

```text
[[0 1 1 0]]
```

Kosakata (urut abjad): dingin, kopi, panas, teh; kalimat uji berisi kopi dan panas masing-masing sekali.

**Latihan.** 1: `['layanan', 'cepat', 'harga', 'ribu']`; angka 5 dibuang, dan "sekali" kata henti. 2: kosakata `aplikasi, bagus, lambat, murah`; baris: `[1, 1, 0, 0]`, `[0, 2, 0, 1]`, `[1, 0, 1, 0]`. 3: baris 2 menjadi `mudah` dan `cepat` saja, sama dengan kalimat pujian biasa; model tidak bisa membedakan "tidak mudah, tidak cepat" dari "mudah dan cepat". 4: baris 0: `aplikasi` (0,84); baris 1: `lambat`, `macet`, dan `sering` (masing-masing 0,53); baris 2: `tidak` (0,89); baris 3: `pengiriman` (0,84); kata yang jarang di seluruh kalimat berbobot lebih besar. Baris 0: 0,84² + 0,34² + 0,42² = 0,9976, sekitar 1, karena tiap baris dinormalkan. 5: opsional.

**Latihan bercampur.** 1: recall spam = 0 dari 5 spam yang ada: model tidak menemukan satu pun spam walau ketepatan tinggi. 2: misalnya jumlah tanda seru, jumlah kata, atau porsi huruf besar; ketiganya hilang pada pembersihan tetapi mungkin membawa informasi.

**Ulang berjarak.** 1: karena "tidak" membalik arti; membuangnya membuat "tidak mudah" tampak seperti "mudah". 2: hitungan memakai jumlah kata; TF-IDF memperkecil bobot kata yang ada di banyak kalimat; keduanya membuang urutan kata. 3: supaya kosakata tidak dipengaruhi data uji; kata baru di data uji diabaikan karena tidak ada di kosakata.

## Langkah berikutnya

Modul berikut: `d-xi2-m5` (klasifikasi teks), yang memakai matriks ini untuk melatih penggolong. Bacaan lanjut: bagian ekstraksi fitur teks pada panduan pengguna `scikit-learn`.
