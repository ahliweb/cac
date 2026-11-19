## Untuk siapa modul ini

Modul ini untuk murid kelas XI jalur D (kecerdasan buatan dan analisis data), untuk minggu `D-XI1-M9` silabus v1.3: klasifikasi dengan `scikit-learn`, yaitu melatih dan menguji penggolong. Prasyarat: modul `d-xi1-m8` dan `d-x2-m6` (klasifikasi tetangga terdekat di Orange). Alat: Python 3 dengan pustaka `pandas` dan `scikit-learn`, tanpa akun.

Modul ini berstatus DRAF: karangan penyusun, belum ditinjau pemilik. Jalur D adalah pengayaan di luar rumusan capaian pembelajaran (CP). Minggu ini beririsan dengan butir `F-AP-d` (memakai library untuk model) pada tingkat rendah, hanya karena alatnya coding; irisan itu **tidak dihitung** sebagai pemenuhan CP.

Aturan jalur D yang berlaku: data hanya sintetis (karangan) atau terbuka dengan lisensi jelas, tanpa data yang bisa mengenali orang; wajah, suara, dan foto orang tidak dipakai sebagai data; AI generatif boleh dipakai dengan etika dan dicatat, tanpa data pribadi, kata sandi, atau tugas bernilai pada permintaanmu, dan kamu tidak wajib punya akun. Saran: jawab dulu sendiri, baru minta AI memberi petunjuk bertahap; kode buatan AI dibaca, dijalankan, dan diuji. Setiap soal `Latihan` bertanda `AI: boleh` atau `AI: tanpa AI`.

Catatan untuk guru: blok Python dijalankan penyusun dengan `python3 -I` (Python 3.14.6, `pandas` 3.1.1, `scikit-learn` 1.9.1, per 2026-11) dan keluarannya ditempel apa adanya; yang dinyatakan hanya "bisa dijalankan dengan keluaran ini", bukan "benar untuk semua masukan". Data "biji karangan" dibangkitkan oleh fungsi `buat_data` dengan aturan yang terlihat di kode, dan sebagian label sengaja dibalik supaya tidak sempurna; tidak ada data nyata. Pembagian data memakai `random_state=1`; versi pustaka lain dapat memberi pembagian dan angka yang berbeda.

## Ingat kembali

Jawab dari ingatan, baru cek di bagian kunci.

1. Mengapa rencana evaluasi menulis pembanding sederhana, misalnya tebakan mayoritas? (dari `d-xi1-m1`)
2. Mengapa keputusan membuang atau mengisi nilai hilang harus dicatat bersama jumlah baris yang terkena? (dari `d-xi1-m6`)
3. Mengapa galat prediksi dihitung pada data yang tidak dipakai menyusun prediksinya? (dari `d-xi1-m8`)
4. Bagaimana kNN menebak label sebuah titik baru? (dari `d-x2-m6`)

## Tujuan

Setelah modul ini kamu dapat:

- memisahkan tabel menjadi fitur `X` dan label `y`, lalu membaginya menjadi data latih dan data uji;
- memakai pola `fit`, `predict`, dan `score` pada dua penggolong `scikit-learn`;
- menjalankan pembanding mayoritas (`DummyClassifier`) lebih dulu dan membandingkannya dengan model;
- menebak label data baru dan membaca ketepatan pada data uji;
- menyebut mengapa ketepatan pada data uji yang kecil perlu dibaca dengan hati-hati.

Keluaran yang diminta silabus: skrip penggolong (klasifikasi data sintetis).

## Prediksi dulu

Tebak dan tulis keluarannya, baru jalankan. Titik baru yang ditebak adalah 3, 4,6, dan 5,4.

```python
from sklearn.neighbors import KNeighborsClassifier

X = [[1], [2], [8], [9]]
y = ["kecil", "kecil", "besar", "besar"]
model = KNeighborsClassifier(n_neighbors=1).fit(X, y)
print(model.predict([[3], [4.6], [5.4]]))
```

Tulis juga: pada titik berapa tebakannya berpindah dari satu label ke label lain, dan mengapa `X` ditulis sebagai daftar berisi daftar kecil, bukan daftar angka biasa.

## Contoh terselesaikan

**Dari tabel ke penggolong.** Biji karangan punya dua ukuran (`ukuran` dalam mm, `berat` dalam mg) dan label `jenis` A atau B. Alurnya mengikuti proyek data: (1) siapkan tabel; (2) pisahkan fitur `X` dan label `y`; (3) bagi menjadi data latih dan data uji, dengan `stratify=y` supaya perbandingan A dan B di kedua bagian mirip; (4) jalankan pembanding mayoritas; (5) latih dua model dengan `fit`; (6) nilai keduanya pada data uji dengan `score`; (7) tebak data baru dengan `predict`.

```python
import pandas as pd
import sklearn
from sklearn.dummy import DummyClassifier
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier
from sklearn.tree import DecisionTreeClassifier


def buat_data(n):
    baris = []
    for i in range(n):
        ukuran = 10 + (i * 7) % 13  # mm
        berat = 20 + (i * 11) % 17  # mg
        jenis = "B" if ukuran + berat / 2 > 30 else "A"
        if i % 13 == 12:  # label sengaja dibalik (derau)
            jenis = "A" if jenis == "B" else "B"
        baris.append((ukuran, berat, jenis))
    return pd.DataFrame(baris, columns=["ukuran", "berat", "jenis"])


df = buat_data(40)
print(df.head(4))
print(df["jenis"].value_counts().to_dict())

X = df[["ukuran", "berat"]]
y = df["jenis"]
X_latih, X_uji, y_latih, y_uji = train_test_split(
    X, y, test_size=0.25, random_state=1, stratify=y
)
print(len(X_latih), len(X_uji))

model = {
    "pembanding": DummyClassifier(strategy="most_frequent"),
    "knn3": KNeighborsClassifier(n_neighbors=3),
    "pohon": DecisionTreeClassifier(max_depth=3, random_state=0),
}
for nama, m in model.items():
    m.fit(X_latih, y_latih)
    print(nama, round(m.score(X_uji, y_uji), 2))

baru = pd.DataFrame({"ukuran": [12, 20], "berat": [22, 34]})
print(model["knn3"].predict(baru))
print("scikit-learn", sklearn.__version__)
```

```text
   ukuran  berat jenis
0      10     20     A
1      17     31     B
2      11     25     A
3      18     36     B
{'A': 21, 'B': 19}
30 10
pembanding 0.5
knn3 0.8
pohon 0.8
['A' 'B']
scikit-learn 1.9.1
```

Baca hasilnya. Data berisi 21 biji A dan 19 biji B, jadi menebak "A" terus pun benar sekitar separuhnya: itulah pembanding, dan ia memang mendapat 0,5 pada 10 baris uji. Kedua model mendapat 0,8, yaitu 8 dari 10 benar. Untuk dua biji baru, ukuran 12 dan berat 22 ditebak A, ukuran 20 dan berat 34 ditebak B, sesuai dugaan karena angkanya jauh dari batas. Tiga hal yang perlu diingat: `fit` hanya memakai data latih; `score` pada penggolong adalah **ketepatan** (porsi tebakan yang benar); dan data uji hanya 10 baris, sehingga satu baris berbeda mengubah angka sebesar 0,1. Karena itu "0,8 melawan 0,8" belum membuktikan kedua model setara, dan 0,5 lawan 0,8 baru menunjukkan model memang menangkap pola, bukan sekadar menebak.

## Contoh setengah jadi

Isi bagian `____` supaya program melatih penggolong satu tetangga, menebak dua titik baru, dan mencetak ketepatannya.

```python setengah-jadi
from sklearn.neighbors import KNeighborsClassifier

X_latih = [[1, 1], [2, 1], [8, 9], [9, 8]]
y_latih = ["A", "A", "B", "B"]
model = KNeighborsClassifier(n_neighbors=____)
model.____(X_latih, y_latih)
print(model.____([[2, 2], [8, 8]]))
print(model.score([[2, 2], [8, 8]], ["A", "B"]))
```

## Soal Parsons

Susun baris menjadi program yang melatih penggolong satu tetangga lalu mencetak tebakan untuk titik 9. Lekukan tidak dipakai; yang diacak hanya urutannya.

```text
print(model.predict([[9]]))
y = [0, 0, 1, 1]
from sklearn.neighbors import KNeighborsClassifier
model.fit(X, y)
X = [[0], [1], [10], [11]]
model = KNeighborsClassifier(n_neighbors=1)
```

## Latihan

1. **Hitung tangan.** (`AI: tanpa AI`) Tetangga terdekat dengan k = 3. Data `X = [[1], [2], [3], [10], [11]]`, label `a, a, a, b, b`. Tebak label titik 6: tulis jarak ke kelima titik, tiga yang terdekat, dan hasil pemungutan suaranya.
2. **Rancangan dulu, lalu kode.** (`AI: tanpa AI`) Tulis pseudocode tujuh langkah dari tabel sampai tebakan, lalu program untuk data pada contoh dengan `n_neighbors=5`. Mengapa pembanding mayoritas dijalankan sebelum model?
3. **Ubah k.** (`AI: boleh`) Jalankan `KNeighborsClassifier` dengan `n_neighbors` 1, 3, 5, dan 9 pada pembagian contoh dan catat ketepatan ujinya. Tulis satu kalimat tentang apa yang boleh dan tidak boleh disimpulkan dari 10 baris uji.
4. **Data buatanmu.** (`AI: boleh`) Tulis fungsi pembangkit sendiri untuk dua kelas dengan sedikitnya 30 baris (aturan tampak di kode, tanpa data orang). Jalankan pembanding dan satu model, lalu tulis ketepatan keduanya.
5. **Catatan pemakaian AI (opsional).** Bila memakai asisten AI, catat alat, tujuan, garis besar perintah, bagian yang dipakai, dan cara memeriksanya.

## Latihan bercampur

1. Dari `d-xi1-m6`: tabel fitur punya satu `NaN` pada kolom `berat`, dan `fit` menolaknya. Tulis dua pilihan penanganan beserta apa yang dicatat untuk masing-masing.
2. Dari `d-xi1-m8`: pada prediksi angka, apa pembanding sederhananya, dan apa padanannya pada klasifikasi?

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `d-xi1-m10` (sekitar satu minggu lagi), `d-xi1-m12` (sekitar tiga minggu lagi), dan modul jalur D kelas XI semester 2 pada minggu `D-XI2-M3` (sekitar delapan minggu lagi). Jawab sekarang lalu simpan.

1. Mengapa model tidak boleh dinilai pada data latih, dan bagaimana data dibagi?
2. Mengapa pembanding mayoritas dijalankan sebelum model?
3. Apa urutan memakai model `scikit-learn`: bentuk `X` dan `y`, `fit`, `predict`, lalu menilai?

## Kesalahan umum

- **"Ketepatan 0,8 berarti 80 persen dari semua biji akan benar."** Angka itu berasal dari 10 baris uji; ia perkiraan kasar, bukan jaminan.
- **"`fit` boleh dipanggil pada seluruh data supaya modelnya paling pintar."** Bila data uji ikut dilatihkan, ketepatan ujinya tidak jujur lagi.
- **"`X` boleh berupa daftar angka biasa."** `scikit-learn` mengharapkan tabel dua dimensi: baris sebagai contoh, kolom sebagai fitur.
- **"Dua model yang sama-sama 0,8 sama baiknya."** Dengan 10 baris uji, selisih satu atau dua baris bisa kebetulan.
- **"`random_state` itu hanya hiasan."** Ia mengunci pembagian acak supaya hasil dapat diulang; nilai lain memberi pembagian lain dan angka lain.

## Cek mandiri

- [ ] Saya dapat memisahkan `X` dan `y` dari sebuah tabel.
- [ ] Saya dapat membagi data menjadi data latih dan data uji.
- [ ] Saya menjalankan pembanding mayoritas sebelum model.
- [ ] Saya dapat memakai `fit`, `predict`, dan `score` dan menjelaskan fungsi masing-masing.
- [ ] Saya menyebut batas kesimpulan dari data uji yang kecil.
- [ ] Saya mencatat pemakaian AI bila saya memakainya.

## Kunci dan petunjuk

**Ingat kembali.** 1: supaya ada patokan: model yang tidak lebih baik dari menebak kelas terbanyak tidak berguna. 2: supaya orang lain tahu perubahan apa yang terjadi pada data dan berapa baris yang terkena; hasil yang diubah diam-diam tidak bisa diperiksa. 3: karena galat pada data yang dipakai menyusun prediksi tidak menguji tebakan yang belum terlihat. 4: kNN melihat k titik latih terdekat dari titik baru dan memilih label yang paling banyak di antara mereka.

**Prediksi dulu.** Keluaran: `['kecil' 'kecil' 'besar']`. Titik tengah antara 2 dan 8 adalah 5; 4,6 lebih dekat ke 2 (jarak 2,6 berbanding 3,4), 5,4 lebih dekat ke 8 (jarak 2,6 berbanding 3,4). Tebakan berpindah di sekitar 5. `X` berupa daftar berisi daftar kecil karena tiap baris adalah satu contoh dan tiap isi satu fitur; satu fitur pun ditulis `[3]`.

**Contoh setengah jadi.** Isian: `1`, `fit`, `predict`.

```python
from sklearn.neighbors import KNeighborsClassifier

X_latih = [[1, 1], [2, 1], [8, 9], [9, 8]]
y_latih = ["A", "A", "B", "B"]
model = KNeighborsClassifier(n_neighbors=1)
model.fit(X_latih, y_latih)
print(model.predict([[2, 2], [8, 8]]))
print(model.score([[2, 2], [8, 8]], ["A", "B"]))
```

```text
['A' 'B']
1.0
```

**Soal Parsons.** Urutan benar:

```python
from sklearn.neighbors import KNeighborsClassifier
X = [[0], [1], [10], [11]]
y = [0, 0, 1, 1]
model = KNeighborsClassifier(n_neighbors=1)
model.fit(X, y)
print(model.predict([[9]]))
```

```text
[1]
```

Model dibuat sebelum dilatih; `X` dan `y` harus ada sebelum `fit`; `predict` terakhir.

**Latihan.** 1: jarak titik 6 ke 1, 2, 3, 10, 11 adalah 5, 4, 3, 4, 5. Tiga terdekat: titik 3 (jarak 3, label a), titik 2 (jarak 4, a), titik 10 (jarak 4, b). Suara: a dua, b satu; tebakan a. 2: pseudocode contoh: (1) buat tabel; (2) ambil kolom fitur dan label; (3) bagi latih dan uji; (4) latih pembanding; (5) latih model; (6) nilai pada data uji; (7) tebak data baru. Pembanding dijalankan lebih dulu supaya ada patokan: model yang tidak mengalahkan menebak mayoritas belum menangkap pola. Kode: ganti `n_neighbors=3` dengan `n_neighbors=5` pada contoh. 3: pada pembagian contoh, `1`, `3`, `5`, `9` berturut-turut memberi `0.7`, `0.8`, `0.8`, `0.9` (angka dapat berbeda pada versi pustaka lain); selisih satu baris sama dengan 0,1, jadi belum cukup untuk menyimpulkan satu k paling baik. 4: dinilai dari fungsi pembangkit yang aturannya terlihat, pembanding yang dijalankan, dan dua ketepatan yang dilaporkan. 5: opsional.

**Latihan bercampur.** 1: pilihan (a) membuang baris itu, catat bahwa satu baris dibuang dari sekian baris; (b) mengisi dengan median kolom, catat nilai pengisi dan jumlah baris yang terkena. 2: pada prediksi angka, tebakan "sama dengan nilai terakhir"; pada klasifikasi, tebakan label yang paling banyak.

**Ulang berjarak.** 1: karena model sudah melihat data latih sehingga bisa menghafalnya; data dibagi menjadi data latih untuk belajar dan data uji yang disisihkan untuk menguji. 2: untuk patokan: menebak kelas terbanyak sudah memberi ketepatan tertentu, dan model harus lebih baik dari itu. 3: bentuk `X` (tabel fitur) dan `y` (label), `fit` pada data latih, `predict` pada data baru, lalu nilai pada data uji.

## Langkah berikutnya

Modul berikut: `d-xi1-m10` (evaluasi dan validasi), tempat kamu membaca metrik selain ketepatan dan memakai validasi silang. Bacaan lanjut: panduan pengguna `scikit-learn` tentang tetangga terdekat dan tentang `train_test_split`.
