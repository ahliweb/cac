## Untuk siapa modul ini

Modul ini untuk murid kelas XI jalur D (kecerdasan buatan dan analisis data), untuk minggu `D-XI2-M8` silabus v1.3: melatih jaringan saraf kecil pada data tabel sintetis lalu membandingkannya dengan model lain. Prasyarat: modul `d-xi1-m14`, dan gagasan jaringan saraf minggu `D-XI2-M7` (neuron, bobot, pelatihan; modul tertulis dalam seri yang sama). Alat: Python 3 dengan `numpy`, `pandas`, dan `scikit-learn`, tanpa akun.

Modul ini berstatus DRAF: karangan penyusun, belum ditinjau pemilik. Jalur D adalah pengayaan di luar rumusan capaian pembelajaran (CP). Minggu ini beririsan dengan butir `F-AP-d` (memakai library untuk model) pada tingkat rendah, hanya karena alatnya coding; irisan itu **tidak dihitung** sebagai pemenuhan CP.

Aturan jalur D yang berlaku: data hanya sintetis (karangan) atau terbuka dengan lisensi jelas, tanpa data yang bisa mengenali orang; wajah, suara, dan foto orang tidak dipakai sebagai data; AI generatif boleh dipakai dengan etika dan dicatat, tanpa data pribadi, kata sandi, atau tugas bernilai pada permintaanmu, dan kamu tidak wajib punya akun. Saran: jawab dulu sendiri, baru minta AI memberi petunjuk bertahap; kode buatan AI dibaca, dijalankan, dan diuji. Setiap soal `Latihan` bertanda `AI: boleh` atau `AI: tanpa AI`.

Catatan untuk guru: blok Python dijalankan penyusun dengan `python3 -I` (Python 3.14.6, `numpy` 2.5.5, `pandas` 3.1.1, `scikit-learn` 1.9.1, per 2026-11) dan keluarannya ditempel apa adanya; yang dinyatakan hanya "bisa dijalankan dengan keluaran ini", bukan "benar untuk semua masukan". Data "kolam karangan" dibangkitkan oleh `buat_data` dengan aturan yang tampak di kode dan sebagian label sengaja dibalik. Versi pustaka lain dapat memberi angka berbeda, terutama pada jaringan saraf.

## Ingat kembali

Jawab dari ingatan, baru cek di bagian kunci.

1. Sebutkan bagian satu neuron dan cara menghitung keluarannya. (dari `d-xi2-m7`)
2. Mengapa model teks gagal pada kalimat berpola "tidak" bila data latih tidak memuat pola itu, dan apa dua perbaikannya? (dari `d-xi2-m5`)
3. Mengapa pengubahan skala dipasang pada data latih saja? (dari `d-xi1-m12`)

## Tujuan

Setelah modul ini kamu dapat:

- melatih `MLPClassifier` pada data tabel sintetis, dengan pengubahan skala di dalam `Pipeline`;
- menghitung jumlah parameter jaringan dari bentuk `coefs_` dan `intercepts_`;
- membaca kurva kerugian, jumlah putaran, dan peringatan konvergensi;
- membandingkan jaringan dengan pembanding dan model lain pada lipatan yang sama, dan menilai apakah selisihnya berarti;
- menjelaskan mengapa hasil jaringan berubah menurut `random_state` dan skala data.

Keluaran yang diminta silabus: skrip jaringan (bandingkan dengan model lain).

## Prediksi dulu

Jaringan berikut punya 2 masukan, satu lapis tersembunyi berisi 4 neuron, dan 1 keluaran. Tebak dan tulis sebelum menjalankan: bentuk tiap matriks bobot, bentuk tiap vektor bias, dan jumlah seluruh parameter (cara menghitungnya ada di `d-xi2-m7`).

```python
import numpy as np
from sklearn.neural_network import MLPClassifier

X = np.array([[0.0, 0.0], [0.0, 1.0], [1.0, 0.0], [1.0, 1.0]])
y = np.array([0, 1, 1, 0])
jaringan = MLPClassifier(hidden_layer_sizes=(4,), random_state=0)
jaringan.partial_fit(X, y, classes=[0, 1])
print([w.shape for w in jaringan.coefs_])
print([b.shape for b in jaringan.intercepts_])
print(sum(w.size for w in jaringan.coefs_) + sum(b.size for b in jaringan.intercepts_))
```

```text
[(2, 4), (4, 1)]
[(4,), (1,)]
17
```

## Contoh terselesaikan

**Data dan model.** Kolam karangan memiliki dua fitur, `suhu` dan `oksigen`; kolam berlabel "sehat" hanya bila nilainya di tengah rentang (aturan karangan di `buat_data`), dan 6 persen label dibalik sebagai derau. Karena yang sehat berada di tengah, satu garis lurus tidak bisa memisahkan kelasnya; model non-linear perlu. Lima model dibandingkan pada lipatan yang sama: pembanding "kelas terbanyak", regresi logistik, pohon, jaringan tanpa skala, dan jaringan dengan skala. Skala, bila ada, ada di dalam `Pipeline` sehingga dipelajari dari data latih tiap lipatan saja (kebocoran: `d-xi1-m12`).

```python
import warnings

import numpy as np
import pandas as pd
from sklearn.dummy import DummyClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import StratifiedKFold, cross_val_score
from sklearn.neural_network import MLPClassifier
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.tree import DecisionTreeClassifier


def buat_data(n, benih):
    acak = np.random.default_rng(benih)
    suhu = acak.uniform(20, 35, n)  # derajat Celsius, karangan
    oksigen = acak.uniform(2, 10, n)  # miligram per liter, karangan
    jarak = np.sqrt(((suhu - 27.5) / 7.5) ** 2 + ((oksigen - 6) / 4) ** 2)
    sehat = (jarak < 0.75).astype(int)  # aturan karangan: "sehat" hanya di tengah
    balik = acak.random(n) < 0.06  # derau: sebagian label dibalik
    sehat = np.where(balik, 1 - sehat, sehat)
    return pd.DataFrame({"suhu": suhu, "oksigen": oksigen, "sehat": sehat})


df = buat_data(400, 0)
X = df[["suhu", "oksigen"]]
y = df["sehat"]
print("baris:", len(df), "| kelas:", y.value_counts().to_dict())

lipatan = StratifiedKFold(n_splits=5, shuffle=True, random_state=0)
model = {
    "pembanding": DummyClassifier(strategy="most_frequent"),
    "regresi logistik": make_pipeline(StandardScaler(), LogisticRegression()),
    "pohon (dalam 4)": DecisionTreeClassifier(max_depth=4, random_state=0),
    "jaringan tanpa skala": MLPClassifier(hidden_layer_sizes=(16,), max_iter=2000, random_state=0),
    "jaringan + skala": make_pipeline(
        StandardScaler(), MLPClassifier(hidden_layer_sizes=(16,), max_iter=2000, random_state=0)
    ),
}
with warnings.catch_warnings():
    warnings.simplefilter("ignore")
    for nama, m in model.items():
        skor = cross_val_score(m, X, y, cv=lipatan)
        print(f"{nama:22s} {skor.mean():.3f} (sebaran {skor.min():.2f} sampai {skor.max():.2f})")
```

```text
baris: 400 | kelas: {0: 231, 1: 169}
pembanding             0.577 (sebaran 0.57 sampai 0.59)
regresi logistik       0.507 (sebaran 0.49 sampai 0.54)
pohon (dalam 4)        0.863 (sebaran 0.84 sampai 0.89)
jaringan tanpa skala   0.583 (sebaran 0.44 sampai 0.70)
jaringan + skala       0.890 (sebaran 0.84 sampai 0.91)
```

Baca hasilnya. Regresi logistik 0,507 berada di bawah pembanding 0,577: garis lurus tidak cocok dengan bentuk datanya (ingat `d-xi2-m6`: ketepatan di bawah pembanding menandakan ada yang tidak cocok). Jaringan tanpa skala 0,583 hampir sama dengan pembanding, padahal satu-satunya beda dengan jaringan berskala (0,890) adalah skala. Pohon 0,863 dan jaringan berskala 0,890 berselisih 0,027, lebih kecil dari sebaran antar lipatan (0,05 sampai 0,07), jadi belum membuktikan jaringan lebih baik.

**Melihat pelatihan.** Blok berikut melatih jaringan pada data latih yang sudah diskalakan, lalu menunjukkan kerugian di beberapa putaran, hasil pada data uji, peringatan konvergensi saat `max_iter` terlalu kecil, dan pengaruh `random_state`.

```python
import warnings

import numpy as np
import pandas as pd
from sklearn.model_selection import StratifiedKFold, cross_val_score, train_test_split
from sklearn.neural_network import MLPClassifier
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler


def buat_data(n, benih):
    acak = np.random.default_rng(benih)
    suhu = acak.uniform(20, 35, n)  # derajat Celsius, karangan
    oksigen = acak.uniform(2, 10, n)  # miligram per liter, karangan
    jarak = np.sqrt(((suhu - 27.5) / 7.5) ** 2 + ((oksigen - 6) / 4) ** 2)
    sehat = (jarak < 0.75).astype(int)  # aturan karangan: "sehat" hanya di tengah
    balik = acak.random(n) < 0.06  # derau: sebagian label dibalik
    sehat = np.where(balik, 1 - sehat, sehat)
    return pd.DataFrame({"suhu": suhu, "oksigen": oksigen, "sehat": sehat})


df = buat_data(400, 0)
X = df[["suhu", "oksigen"]]
y = df["sehat"]
X_latih, X_uji, y_latih, y_uji = train_test_split(X, y, test_size=0.25, stratify=y, random_state=0)

skala = StandardScaler().fit(X_latih)  # skala dipelajari dari data latih saja
jaringan = MLPClassifier(hidden_layer_sizes=(16,), max_iter=2000, random_state=0)
jaringan.fit(skala.transform(X_latih), y_latih)
kerugian = jaringan.loss_curve_
print("putaran:", jaringan.n_iter_)
print("kerugian putaran 1, 100, 400, akhir:", [round(float(kerugian[i]), 3) for i in (0, 99, 399, -1)])
print("ketepatan latih", round(jaringan.score(skala.transform(X_latih), y_latih), 3))
print("ketepatan uji  ", round(jaringan.score(skala.transform(X_uji), y_uji), 3))

with warnings.catch_warnings(record=True) as catatan:
    warnings.simplefilter("always")
    singkat = MLPClassifier(hidden_layer_sizes=(16,), max_iter=30, random_state=0)
    singkat.fit(skala.transform(X_latih), y_latih)
print("max_iter=30:", type(catatan[0].message).__name__, "| ketepatan uji", round(singkat.score(skala.transform(X_uji), y_uji), 3))

lipatan = StratifiedKFold(n_splits=5, shuffle=True, random_state=0)
for benih in range(5):
    model = make_pipeline(
        StandardScaler(), MLPClassifier(hidden_layer_sizes=(16,), max_iter=2000, random_state=benih)
    )
    print("benih", benih, round(cross_val_score(model, X, y, cv=lipatan).mean(), 3))
```

```text
putaran: 764
kerugian putaran 1, 100, 400, akhir: [0.689, 0.597, 0.388, 0.322]
ketepatan latih 0.897
ketepatan uji   0.88
max_iter=30: ConvergenceWarning | ketepatan uji 0.58
benih 0 0.89
benih 1 0.88
benih 2 0.89
benih 3 0.9
benih 4 0.898
```

Kerugian turun dari 0,689 menjadi 0,322 dalam 764 putaran. Dengan `max_iter=30` pelatihan berhenti sebelum selesai (`ConvergenceWarning`) dan ketepatan uji hanya 0,58: peringatan itu tidak diabaikan. Lima `random_state` memberi 0,88 sampai 0,90, jadi selisih sekecil 0,03 antar model sama besar dengan perbedaan akibat awal bobot yang acak.

## Contoh setengah jadi

Lengkapi `____` agar jaringan satu lapis 8 neuron dengan skala di dalam `Pipeline` dinilai pada lipatan 5 yang diacak dengan `random_state=0`, memakai `X` dan `y` dari `buat_data(400, 0)` di atas.

```python setengah-jadi
model = make_pipeline(____(), MLPClassifier(hidden_layer_sizes=(____,), max_iter=____, random_state=0))
skor = cross_val_score(model, X, y, cv=StratifiedKFold(n_splits=____, shuffle=True, random_state=0))
print(round(skor.mean(), 3))
```

## Soal Parsons

Susun baris menjadi program yang membagi data, mengubah skala dari data latih saja, melatih jaringan, dan mencetak ketepatan uji (bagian impor dan `buat_data` sudah ada di atasnya).

```text
print(round(jaringan.score(skala.transform(X_uji), y_uji), 3))
jaringan = MLPClassifier(hidden_layer_sizes=(16,), max_iter=2000, random_state=0)
skala = StandardScaler().fit(X_latih)
X_latih, X_uji, y_latih, y_uji = train_test_split(X, y, test_size=0.25, stratify=y, random_state=0)
jaringan.fit(skala.transform(X_latih), y_latih)
```

## Latihan

1. **Hitung parameter.** (`AI: tanpa AI`) Jaringan dengan 2 masukan, dua lapis tersembunyi berisi 8 dan 4 neuron, dan 1 keluaran. Berapa bobot, bias, dan seluruh parameternya?
2. **Baca peringatan.** (`AI: tanpa AI`) Pelatihan berhenti dengan `ConvergenceWarning` dan ketepatan ujinya rendah. Apa artinya, dan sebut tiga hal yang dicoba lebih dulu?
3. **Ukuran jaringan.** (`AI: boleh`) Nilai `hidden_layer_sizes` (2,), (16,), (64,), dan (16, 16) pada lipatan yang sama. Tulis kesimpulan hanya sejauh selisihnya melebihi sebaran.
4. **Derau lebih besar.** (`AI: boleh`) Ubah derau di `buat_data` dari 6 persen menjadi 20 persen, ulangi perbandingan model, dan catat apa yang terjadi pada selisih antar model.
5. **Catatan pemakaian AI (opsional).** Bila memakai asisten AI untuk menjelaskan peringatan atau menyusun kode, catat alat, tujuan, garis besar perintah, bagian yang dipakai, dan cara memeriksanya (kode dibaca, dijalankan, dan diuji).

## Latihan bercampur

1. Dari `d-xi2-m3`: tambahkan fitur turunan `jarak` (dihitung dari `suhu` dan `oksigen` seperti di `buat_data`, tanpa label) lalu nilai ulang regresi logistik. Mengapa hasilnya berubah?
2. Dari `d-xi1-m12`: bila `StandardScaler` dipasang pada seluruh `X` sebelum `cross_val_score`, adakah kebocoran, dan bagaimana bentuk yang benar?

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `d-xi2-m9` (sekitar satu minggu lagi), `d-xi2-m11` (sekitar tiga minggu lagi), dan `D-XII1-M2` (sekitar delapan minggu lagi). Jawab sekarang lalu simpan.

1. Mengapa selisih ketepatan yang lebih kecil daripada sebaran antar lipatan atau antar `random_state` belum membuktikan satu model lebih baik?
2. Mengapa jaringan yang sudah dilatih harus disimpan bersama pengubah skalanya, dan apa yang terjadi bila skalanya tertinggal?
3. Sebutkan tiga hal yang dilaporkan di samping ketepatan rata-rata sebuah model agar klaimnya bisa dinilai.

## Kesalahan umum

- **"Jaringan saraf pasti mengalahkan model sederhana."** Pada data tabel kecil, pohon sering setara; jaringan harus melampaui pembanding dan model sederhana dengan selisih yang melebihi sebaran.
- **"Skala tidak penting untuk jaringan."** Jaringan peka terhadap skala fitur; tanpa skala, hasil bisa mendekati pembanding.
- **"Pelatihan selesai bila programnya berhenti."** Program juga berhenti saat `max_iter` habis; periksa `ConvergenceWarning` dan `n_iter_`.
- **"Ketepatan latih tinggi berarti modelnya bagus."** Nilai yang dilaporkan adalah ketepatan pada data uji atau lipatan.
- **"Hasil harus sama tiap dijalankan."** Awal bobot acak; catat `random_state` dan laporkan sebarannya.

## Cek mandiri

- [ ] Saya dapat melatih jaringan kecil dengan skala di dalam `Pipeline`.
- [ ] Saya dapat menghitung jumlah parameter dari bentuk bobotnya.
- [ ] Saya dapat membaca kerugian, jumlah putaran, dan `ConvergenceWarning`.
- [ ] Saya dapat membandingkan jaringan dengan pembanding dan model lain secara adil.
- [ ] Saya dapat menilai apakah selisih ketepatan melebihi sebaran.
- [ ] Saya mencatat pemakaian AI bila saya memakainya.

## Kunci dan petunjuk

**Ingat kembali.** 1: masukan `x`, bobot `w`, bias `b`; `z = jumlah (w kali x) + b`, lalu fungsi aktivasi memberi keluaran. 2: karena model menjumlahkan kata dan tidak melihat urutan; perbaikan: tambahkan contoh berpola "tidak" ke data latih, dan pakai pasangan kata (bigram). 3: supaya pengubah skala tidak "melihat" data uji (kebocoran); pada validasi silang, taruh di `Pipeline` agar dipelajari ulang dari data latih tiap lipatan.

**Prediksi dulu.** Keluaran: bobot `[(2, 4), (4, 1)]`, bias `[(4,), (1,)]`, total 17. Bobot lapis tersembunyi 2 kali 4 = 8 dan bias 4; lapis keluaran 4 kali 1 = 4 bobot dan 1 bias; 8 + 4 + 4 + 1 = 17.

**Contoh setengah jadi.** Isian: `StandardScaler`, `8`, `2000` (atau angka cukup besar), `5`.

```python
import numpy as np
import pandas as pd
from sklearn.model_selection import StratifiedKFold, cross_val_score
from sklearn.neural_network import MLPClassifier
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler


def buat_data(n, benih):
    acak = np.random.default_rng(benih)
    suhu = acak.uniform(20, 35, n)  # derajat Celsius, karangan
    oksigen = acak.uniform(2, 10, n)  # miligram per liter, karangan
    jarak = np.sqrt(((suhu - 27.5) / 7.5) ** 2 + ((oksigen - 6) / 4) ** 2)
    sehat = (jarak < 0.75).astype(int)  # aturan karangan: "sehat" hanya di tengah
    balik = acak.random(n) < 0.06  # derau: sebagian label dibalik
    sehat = np.where(balik, 1 - sehat, sehat)
    return pd.DataFrame({"suhu": suhu, "oksigen": oksigen, "sehat": sehat})


df = buat_data(400, 0)
X = df[["suhu", "oksigen"]]
y = df["sehat"]
model = make_pipeline(StandardScaler(), MLPClassifier(hidden_layer_sizes=(8,), max_iter=2000, random_state=0))
skor = cross_val_score(model, X, y, cv=StratifiedKFold(n_splits=5, shuffle=True, random_state=0))
print(round(skor.mean(), 3))
```

```text
0.895
```

**Soal Parsons.** Urutan benar: pembagian data, `skala`, `jaringan = ...`, `jaringan.fit(...)`, lalu `print(...)`. Skala dipelajari dari `X_latih` saja, sebelum dipakai mengubah `X_uji`.

```python
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.neural_network import MLPClassifier
from sklearn.preprocessing import StandardScaler


def buat_data(n, benih):
    acak = np.random.default_rng(benih)
    suhu = acak.uniform(20, 35, n)  # derajat Celsius, karangan
    oksigen = acak.uniform(2, 10, n)  # miligram per liter, karangan
    jarak = np.sqrt(((suhu - 27.5) / 7.5) ** 2 + ((oksigen - 6) / 4) ** 2)
    sehat = (jarak < 0.75).astype(int)  # aturan karangan: "sehat" hanya di tengah
    balik = acak.random(n) < 0.06  # derau: sebagian label dibalik
    sehat = np.where(balik, 1 - sehat, sehat)
    return pd.DataFrame({"suhu": suhu, "oksigen": oksigen, "sehat": sehat})


df = buat_data(400, 0)
X = df[["suhu", "oksigen"]]
y = df["sehat"]
X_latih, X_uji, y_latih, y_uji = train_test_split(X, y, test_size=0.25, stratify=y, random_state=0)
skala = StandardScaler().fit(X_latih)
jaringan = MLPClassifier(hidden_layer_sizes=(16,), max_iter=2000, random_state=0)
jaringan.fit(skala.transform(X_latih), y_latih)
print(round(jaringan.score(skala.transform(X_uji), y_uji), 3))
```

```text
0.88
```

**Latihan.** 1: bobot 2 kali 8 = 16, 8 kali 4 = 32, 4 kali 1 = 4, jadi 52; bias 8 + 4 + 1 = 13; total 65 parameter. 2: pelatihan dihentikan oleh batas `max_iter` sebelum kerugian stabil, jadi bobot belum layak dipakai; coba naikkan `max_iter`, ubah skala data (pastikan skala dipakai), dan ubah ukuran jaringan atau laju belajar. 3: pada penyusun (`random_state=0`), (2,) memberi 0,542 (hampir pembanding: terlalu kecil), (16,) 0,890, (64,) 0,908, dan (16, 16) 0,920; sebaran antar lipatan tiap ukuran 0,84 sampai 0,95 saling tumpang-tindih, jadi kesimpulan yang sah: dua neuron terlalu sedikit, sedangkan 16 ke atas belum dapat dibedakan. Angkamu boleh berbeda; pegangannya membandingkan selisih dengan sebaran. 4: dengan derau 20 persen pembanding 0,552, pohon 0,710 (sebaran 0,61 sampai 0,79), dan jaringan 0,760 (0,68 sampai 0,82); semua turun dan selisih 0,05 masih di dalam sebaran, jadi belum cukup untuk menyatakan jaringan lebih baik. 5: opsional; yang dinilai adalah catatan yang jujur dan pemeriksaan kode.

**Latihan bercampur.** 1: regresi logistik pada `suhu`, `oksigen`, dan `jarak` mendapat 0,908 (dari 0,507): fitur turunan `jarak` memuat bentuk "tengah", sehingga satu ambang pada `jarak` sudah cukup dan garis lurus berguna lagi. 2: ya, bocor: rata-rata dan simpangan baku dihitung dengan data lipatan uji; bentuk benar: `make_pipeline(StandardScaler(), MLPClassifier(...))` di dalam `cross_val_score`.

**Ulang berjarak.** 1: karena selisih sekecil itu bisa timbul dari pembagian data atau awal bobot yang acak; sebaran memperlihatkan seberapa besar selisih yang bisa kebetulan. 2: karena jaringan dilatih pada data yang sudah diskalakan; tanpa skalanya, masukan mentah mengubah hasil secara keliru. 3: contoh: pembanding sederhana, sebaran antar lipatan, jumlah data, dan metrik yang sesuai dampak kesalahan.

## Langkah berikutnya

Modul berikut: `d-xi2-m9` (menjelaskan keputusan model), yang membahas apa yang bisa dan tidak bisa dikatakan tentang fitur berpengaruh. Bacaan lanjut: bagian "Neural network models (supervised)" pada panduan pengguna `scikit-learn`.
