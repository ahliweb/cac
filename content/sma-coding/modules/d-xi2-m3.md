## Untuk siapa modul ini

Modul ini untuk murid kelas XI jalur D (kecerdasan buatan dan analisis data), untuk minggu `D-XI2-M3` silabus v1.3: rekayasa fitur, yaitu membuat dan memilih fitur. Prasyarat: modul `d-xi2-m2`; sebaiknya kamu juga ingat urutan memakai model `scikit-learn` dari `D-XI1-M9` dan validasi silang dari `D-XI1-M10` (keduanya belum ada di indeks). Alat: Python 3 dengan pustaka `numpy`, `pandas`, dan `scikit-learn`, tanpa akun.

Modul ini karangan penyusun dan disetujui pemilik program pada 2026-11-20 (keputusan lewat dialog; catatan tinjauan menjadi tindak lanjut revisi). Jalur D adalah pengayaan di luar rumusan capaian pembelajaran (CP). Minggu ini beririsan dengan butir `F-AP-d` (memakai library untuk model) pada tingkat rendah, hanya karena alatnya coding; irisan itu **tidak dihitung** sebagai pemenuhan CP.

Aturan jalur D yang berlaku: data hanya sintetis (karangan) atau terbuka dengan lisensi jelas, tanpa data yang bisa mengenali orang; wajah, suara, dan foto orang tidak dipakai sebagai data; AI generatif boleh dipakai dengan etika dan dicatat, tanpa data pribadi, kata sandi, atau tugas bernilai pada permintaanmu, dan kamu tidak wajib punya akun. Saran: jawab dulu sendiri, baru minta AI memberi petunjuk bertahap; kode buatan AI dibaca, dijalankan, dan diuji. Setiap soal `Latihan` bertanda `AI: boleh` atau `AI: tanpa AI`.

Catatan untuk guru: blok Python dijalankan penyusun dengan `python3 -I` (Python 3.14.6, `numpy` 2.5.5, `pandas` 3.1.1, `scikit-learn` 1.9.1, per 2026-11) dan keluarannya ditempel apa adanya; yang dinyatakan hanya "bisa dijalankan dengan keluaran ini", bukan "benar untuk semua masukan". Data "kolam ikan karangan" dibangkitkan oleh `buat_data` dengan aturan tampak di kode dan label sebagian dibalik; kolom acak pada percobaan seleksi dibuat `numpy.random.default_rng` dan angkanya dapat berbeda pada versi `numpy` lain.

## Ingat kembali

Jawab dari ingatan, baru cek di bagian kunci.

1. Apa urutan memakai model `scikit-learn`: bentuk `X` dan `y`, `fit`, `predict`, lalu menilai? (dari `D-XI1-M9`)
2. Mengapa pohon tanpa batas kedalaman mendapat ketepatan latih 1,0 tetapi ketepatan uji lebih rendah? (dari `d-xi2-m2`)
3. Bagaimana validasi silang lima lipatan bekerja? (dari `D-XI1-M10`)
4. Mengapa pembanding mayoritas dijalankan sebelum model? (dari `D-XI1-M9`)

## Tujuan

Setelah modul ini kamu dapat:

- membuat fitur turunan dari kolom yang ada, misalnya hasil kali, rasio, atau penanda ambang;
- mengubah kolom kategori menjadi kolom 0 atau 1 dengan `pd.get_dummies`;
- menilai apakah fitur baru membantu dengan validasi silang dan pembanding, bukan dengan perasaan;
- memilih fitur dengan `SelectKBest` hanya di dalam `Pipeline`, dan menjelaskan kebocoran bila memilih sebelum membagi data;
- mengenali fitur yang memuat jawaban atau tidak tersedia saat model benar-benar dipakai.

Keluaran yang diminta silabus: skrip fitur (tambah fitur pada data sintetis).

## Prediksi dulu

Tebak dan tulis keluarannya, baru jalankan: nama kolom, dan isi tiap baris.

```python
import pandas as pd

df = pd.DataFrame({"panjang": [4, 10], "lebar": [3, 12], "air": ["tawar", "payau"]})
df["luas"] = df["panjang"] * df["lebar"]
print(pd.get_dummies(df, columns=["air"], dtype=int))
```

Tulis juga: mengapa kolom `air` diganti dua kolom angka.

## Contoh terselesaikan

**Fitur baru untuk model sederhana.** Regresi logistik memisahkan kelas dengan garis lurus pada fitur yang diberikan. Pada tabel kolam ikan karangan, kolam "perlu pompa" bila **luasnya** lebih dari 100 meter persegi (sebagian label dibalik sebagai derau), padahal tabel hanya memuat `panjang` dan `lebar`; batas hasil kali bukan garis lurus pada keduanya. Maka kolom `luas = panjang * lebar` dibuat. Kolom `air` (tawar atau payau) tidak ada hubungannya dengan aturan itu. Penilaian memakai validasi silang lima lipatan yang sama, dengan `StandardScaler` di dalam `Pipeline` (jadi skala dihitung ulang dari data latih tiap lipatan), dan pembanding mayoritas.

```python
import pandas as pd
import sklearn
from sklearn.dummy import DummyClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import StratifiedKFold, cross_val_score
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler


def buat_data(n):
    baris = []
    for i in range(n):
        panjang = 2 + (i * 7) % 19  # m
        lebar = 2 + (i * 11) % 17  # m
        air = "tawar" if i % 3 else "payau"
        perlu = 1 if panjang * lebar > 100 else 0
        if i % 10 == 9:  # label sengaja dibalik (derau)
            perlu = 1 - perlu
        baris.append((panjang, lebar, air, perlu))
    return pd.DataFrame(baris, columns=["panjang", "lebar", "air", "perlu_pompa"])


df = buat_data(90)
print(df.head(3))
print(df["perlu_pompa"].value_counts().to_dict())
y = df["perlu_pompa"]
lipatan = StratifiedKFold(n_splits=5)


def nilai(X):
    m = make_pipeline(StandardScaler(), LogisticRegression())
    return round(cross_val_score(m, X, y, cv=lipatan).mean(), 3)


pembanding = DummyClassifier(strategy="most_frequent")
print("pembanding", round(cross_val_score(pembanding, df[["panjang"]], y, cv=lipatan).mean(), 3))
print("mentah", nilai(df[["panjang", "lebar"]]))
df["luas"] = df["panjang"] * df["lebar"]
print("dengan luas", nilai(df[["panjang", "lebar", "luas"]]))
dengan_air = pd.get_dummies(df[["panjang", "lebar", "luas", "air"]], columns=["air"], dtype=int)
print(list(dengan_air.columns))
print("dengan air", nilai(dengan_air))
print("scikit-learn", sklearn.__version__)
```

```text
   panjang  lebar    air  perlu_pompa
0        2      2  payau            0
1        9     13  tawar            1
2       16      7  tawar            1
{1: 47, 0: 43}
pembanding 0.522
mentah 0.811
dengan luas 0.878
['panjang', 'lebar', 'luas', 'air_payau', 'air_tawar']
dengan air 0.878
scikit-learn 1.9.1
```

Baca hasilnya. Pembanding mendapat 0,522. Dengan fitur mentah, model mendapat 0,811; **menambah `luas` menaikkannya menjadi 0,878**, selisih sekitar enam dari 90 baris, jadi fitur itu membantu pada data ini. Menambah kolom `air` yang telah diubah menjadi dua kolom 0 dan 1 tidak mengubah angka sama sekali: fitur yang tidak berhubungan tidak memperbaiki, dan pada model yang lebih lentur bisa menambah peluang menghafal derau. Hal terpenting: fitur baru dinilai dengan cara yang sama seperti model, yaitu validasi silang dan pembanding, bukan dengan keyakinan bahwa "lebih banyak fitur pasti lebih baik".

**Memilih fitur tanpa bocor.** Percobaan berikut memakai 200 kolom angka acak murni dan label yang tidak berhubungan dengan kolom mana pun, jadi ketepatan jujur seharusnya sekitar 0,5. `SelectKBest` memilih lima kolom yang tampak paling berhubungan dengan label. Bila pemilihan dilakukan pada **seluruh** baris sebelum validasi silang, label data uji ikut menentukan kolom yang dipilih (kebocoran, seperti di `D-XI1-M12`); bila pemilihan berada di dalam `Pipeline`, tiap lipatan memilih dari data latihnya sendiri. Angka di bawah rata-rata dari 8 percobaan dengan benih berbeda.

```python
import numpy as np
from sklearn.feature_selection import SelectKBest, f_classif
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import StratifiedKFold, cross_val_score
from sklearn.pipeline import make_pipeline

y = np.array([0, 1] * 20)  # label tidak berhubungan dengan kolom mana pun
lipatan = StratifiedKFold(n_splits=5)
bocor, benar = [], []
for benih in range(8):
    X = np.random.default_rng(benih).normal(size=(40, 200))  # 200 kolom acak murni
    X_pilih = SelectKBest(f_classif, k=5).fit_transform(X, y)  # memilih dengan SEMUA baris
    bocor.append(cross_val_score(LogisticRegression(), X_pilih, y, cv=lipatan).mean())
    pipa = make_pipeline(SelectKBest(f_classif, k=5), LogisticRegression())
    benar.append(cross_val_score(pipa, X, y, cv=lipatan).mean())
print("memilih sebelum membagi", round(float(np.mean(bocor)), 3))
print("memilih di dalam pipeline", round(float(np.mean(benar)), 3))
```

```text
memilih sebelum membagi 0.747
memilih di dalam pipeline 0.494
```

Memilih sebelum membagi memberi 0,747, tampak jauh di atas tebakan padahal tidak ada pola yang bisa dipelajari; memilih di dalam `Pipeline` memberi 0,494, sesuai kenyataan. Aturannya sama seperti pengubahan skala: **apa pun yang belajar dari data (skala, pilihan fitur, pengisian nilai hilang) dipasang pada data latih saja**.

## Contoh setengah jadi

Isi bagian `____` supaya program membuat kolom kecepatan dan penanda "cepat" bila kecepatan melebihi 6.

```python setengah-jadi
import pandas as pd

df = pd.DataFrame({"jarak": [10, 20, 30], "waktu": [2, 5, 3]})
df["kecepatan"] = df["____"] / df["____"]
df["cepat"] = (df["kecepatan"] > ____).astype(int)
print(df)
```

## Soal Parsons

Susun baris menjadi program yang menilai pipeline dengan validasi silang tiga lipatan. Urutan impor boleh bertukar; yang diacak adalah seluruh baris.

```text
print(cross_val_score(model, X, y, cv=3).round(2))
from sklearn.pipeline import make_pipeline
y = [0, 0, 0, 1, 1, 1]
from sklearn.model_selection import cross_val_score
model = make_pipeline(StandardScaler(), LogisticRegression())
from sklearn.preprocessing import StandardScaler
X = [[1, 2], [2, 1], [3, 3], [8, 9], [9, 8], [10, 10]]
from sklearn.linear_model import LogisticRegression
```

## Latihan

1. **Fitur di kertas.** (`AI: tanpa AI`) Empat kolam (panjang, lebar): (5, 4), (12, 9), (8, 14), (3, 3). Hitung `luas`, `rasio` panjang per lebar (dua desimal), dan penanda "perlu pompa" (luas lebih dari 100).
2. **Rancangan dulu, lalu kode.** (`AI: tanpa AI`) Tulis pseudocode untuk membandingkan fitur mentah dan fitur dengan `luas` pada `buat_data(90)`, dan sebut mengapa `StandardScaler` ditaruh di dalam `Pipeline`. Lalu tulis programnya.
3. **Fitur rasio.** (`AI: boleh`) Tambahkan `rasio` (dan kombinasi dengan `luas`), nilai dengan validasi silang yang sama, dan tulis fitur mana yang membantu dan fitur mana yang tidak.
4. **Seleksi bocor.** (`AI: boleh`) Ulangi percobaan seleksi dengan `k` 10 dan 20. Apa yang terjadi pada angka "sebelum membagi" dan pada angka di dalam `Pipeline`?
5. **Catatan pemakaian AI (opsional).** Bila memakai asisten AI, catat alat, tujuan, garis besar perintah, bagian yang dipakai, dan cara memeriksanya.

## Latihan bercampur

1. Dari `d-xi2-m2`: pohon tanpa batas kedalaman diberi 20 kolom fitur turunan tambahan. Mengapa risiko menghafal derau bertambah, bukan berkurang?
2. Dari `d-xi2-m1`: kolom `luas` ditambahkan sebelum k-means. Apa yang dilakukan lebih dulu, dan mengapa?

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `d-xi2-m4` (sekitar satu minggu lagi), `d-xi2-m6` (sekitar tiga minggu lagi), dan `D-XI2-M11` (sekitar delapan minggu lagi). Jawab sekarang lalu simpan.

1. Mengapa memilih fitur memakai seluruh data sebelum membagi menghasilkan ketepatan yang terlalu bagus?
2. Apa itu `Pipeline`, dan apa gunanya menaruh pengubahan skala di dalamnya?
3. Beri satu contoh fitur turunan dan jelaskan mengapa ia bisa membantu model sederhana.

## Kesalahan umum

- **"Lebih banyak fitur pasti lebih baik."** Fitur yang tidak berhubungan tidak membantu dan dapat menambah peluang menghafal derau.
- **"Pilih fitur dulu dari seluruh data, baru bagi."** Itu bocor: label data uji ikut menentukan pilihan, dan ketepatan tampak lebih tinggi dari kenyataan.
- **"Fitur apa pun yang membuat ketepatan naik boleh dipakai."** Fitur yang tidak tersedia saat menebak (misalnya hasil akhir) memuat jawaban.
- **"`pd.get_dummies` bisa dihitung ulang dari data uji."** Kolom harus sama dengan saat melatih; kategori baru perlu ditangani.

## Cek mandiri

- [ ] Saya dapat membuat fitur turunan dari kolom yang ada.
- [ ] Saya dapat mengubah kolom kategori menjadi kolom 0 atau 1.
- [ ] Saya menilai fitur baru dengan validasi silang dan pembanding.
- [ ] Saya menaruh skala dan pemilihan fitur di dalam `Pipeline`.
- [ ] Saya dapat menjelaskan kebocoran pada pemilihan fitur.
- [ ] Saya mencatat pemakaian AI bila saya memakainya.

## Kunci dan petunjuk

**Ingat kembali.** 1: bentuk `X` (tabel fitur) dan `y` (label), `fit` pada data latih, `predict` pada data baru, lalu menilai pada data uji. 2: karena pohon yang terlalu dalam menghafal data latih termasuk derau, sehingga tidak berlaku pada data baru. 3: data dipecah menjadi lima bagian; tiap bagian bergantian menjadi data uji dan empat sisanya data latih; lima angka dirata-rata. 4: untuk patokan: menebak kelas terbanyak sudah memberi ketepatan tertentu, dan model harus lebih baik dari itu.

**Prediksi dulu.** Kolom: `panjang`, `lebar`, `luas`, `air_payau`, `air_tawar`. Baris 0: 4, 3, 12, 0, 1. Baris 1: 10, 12, 120, 1, 0. Kata tidak bisa dihitung oleh model; satu kolom 0 atau 1 untuk tiap kategori membuatnya angka tanpa menyiratkan urutan (tawar bukan "lebih besar" dari payau).

**Contoh setengah jadi.** Isian: `jarak`, `waktu`, `6`.

```python
import pandas as pd

df = pd.DataFrame({"jarak": [10, 20, 30], "waktu": [2, 5, 3]})
df["kecepatan"] = df["jarak"] / df["waktu"]
df["cepat"] = (df["kecepatan"] > 6).astype(int)
print(df)
```

```text
   jarak  waktu  kecepatan  cepat
0     10      2        5.0      0
1     20      5        4.0      0
2     30      3       10.0      1
```

**Soal Parsons.** Urutan benar (impor boleh dalam urutan lain asal sebelum dipakai):

```python
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import cross_val_score
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler
X = [[1, 2], [2, 1], [3, 3], [8, 9], [9, 8], [10, 10]]
y = [0, 0, 0, 1, 1, 1]
model = make_pipeline(StandardScaler(), LogisticRegression())
print(cross_val_score(model, X, y, cv=3).round(2))
```

```text
[1. 1. 1.]
```

**Latihan.** 1: luas 20, 108, 112, 9; rasio 1,25; 1,33; 0,57; 1,00; penanda "perlu pompa" 0, 1, 1, 0. 2: pseudocode: (1) bangun tabel; (2) buat `luas`; (3) untuk tiap kumpulan fitur, validasi silang `Pipeline(StandardScaler, LogisticRegression)`; (4) bandingkan rata-ratanya dengan pembanding. `StandardScaler` di dalam `Pipeline` supaya tiap lipatan menghitung skala dari data latihnya saja. Hasil: mentah 0,811 dan dengan `luas` 0,878. 3: pada hitungan penyusun, `rasio` saja 0,844, `luas` dan `rasio` bersama 0,856, dan `luas` saja 0,878; jadi `luas` yang paling membantu, dan menambah `rasio` tidak memperbaikinya (selisih kecil, belum bukti). 4: untuk k = 5, 10, 20, angka "sebelum membagi" berturut-turut 0,747; 0,791; 0,850, sedangkan di dalam `Pipeline` 0,494; 0,487; 0,472; makin banyak kolom dipilih dengan bocor, makin tinggi angka palsunya, sedangkan angka jujur tetap sekitar tebakan. 5: opsional.

**Latihan bercampur.** 1: setiap fitur tambahan memberi pohon satu lagi pilihan pemisah, sehingga makin besar peluang ada pemisah yang kebetulan cocok dengan derau; pada pohon yang tidak dibatasi, kebetulan itu dihafal. 2: ubah skala (`StandardScaler`), karena `luas` bernilai ratusan sedangkan kolom lain puluhan; tanpa itu `luas` menguasai jarak.

**Ulang berjarak.** 1: karena label data uji ikut menentukan kolom yang dipilih, sehingga data uji tidak lagi "belum terlihat". 2: `Pipeline` merangkai langkah (skala, pemilihan, model) sebagai satu model; dalam validasi silang, tiap lipatan menjalankan langkah itu dari data latihnya saja sehingga tidak bocor. 3: misalnya `luas` dari panjang dan lebar: model garis lurus tidak bisa membentuk hasil kali sendiri, tetapi bisa memakainya bila sudah dihitung.

## Langkah berikutnya

Modul berikut: `d-xi2-m4` (teks: pembersihan dan representasi), yang mengubah kalimat menjadi fitur angka. Bacaan lanjut: bagian praproses data dan pemilihan fitur pada panduan pengguna `scikit-learn`.
