## Untuk siapa modul ini

Modul ini untuk murid kelas XI jalur D (kecerdasan buatan dan analisis data), untuk minggu `D-XI2-M2` silabus v1.3: pohon keputusan dan ensambel, yaitu menjelaskan dan memakai pohon serta hutan acak. Prasyarat: modul `d-xi2-m1`; sebaiknya kamu juga ingat pohon keputusan di Orange (`d-x2-m6`) dan pola `fit`, `predict`, `score` dari `D-XI1-M9` (belum ada di indeks). Alat: Python 3 dengan pustaka `pandas` dan `scikit-learn`, tanpa akun.

Modul ini berstatus DRAF: karangan penyusun, belum ditinjau pemilik. Jalur D adalah pengayaan di luar rumusan capaian pembelajaran (CP). Minggu ini beririsan dengan butir `F-AP-d` (memakai library untuk model) pada tingkat rendah, hanya karena alatnya coding; irisan itu **tidak dihitung** sebagai pemenuhan CP.

Aturan jalur D yang berlaku: data hanya sintetis (karangan) atau terbuka dengan lisensi jelas, tanpa data yang bisa mengenali orang; wajah, suara, dan foto orang tidak dipakai sebagai data; AI generatif boleh dipakai dengan etika dan dicatat, tanpa data pribadi, kata sandi, atau tugas bernilai pada permintaanmu, dan kamu tidak wajib punya akun. Saran: jawab dulu sendiri, baru minta AI memberi petunjuk bertahap; kode buatan AI dibaca, dijalankan, dan diuji. Setiap soal `Latihan` bertanda `AI: boleh` atau `AI: tanpa AI`.

Catatan untuk guru: blok Python dijalankan penyusun dengan `python3 -I` (Python 3.14.6, `pandas` 3.1.1, `scikit-learn` 1.9.1, per 2026-11) dan keluarannya ditempel apa adanya; yang dinyatakan hanya "bisa dijalankan dengan keluaran ini", bukan "benar untuk semua masukan". Data "pengiriman karangan" dibangkitkan oleh `buat_data`; setiap baris kesembilan labelnya sengaja dibalik. Versi pustaka lain dapat memberi angka berbeda.

## Ingat kembali

Jawab dari ingatan, baru cek di bagian kunci.

1. Mengapa rata-rata bergerak tertinggal pada data yang terus naik? (dari `D-XI1-M8`)
2. Mengapa laporan menyebut batasan data dan hal yang tidak boleh disimpulkan? (dari `D-XI1-M13`)
3. Mengapa nama kelompok hasil k-means, misalnya "pelanggan setia", tidak membuktikan jenis yang sebenarnya? (dari `d-xi2-m1`)
4. Bagaimana pohon keputusan menebak label sebuah contoh baru? (dari `d-x2-m6`)

## Tujuan

Setelah modul ini kamu dapat:

- membaca pohon keputusan sebagai rangkaian pertanyaan ya atau tidak tentang fitur, termasuk dengan `export_text`;
- menghitung ketidakmurnian gini sebuah simpul dan memilih pemisah dengan menimbang gini kedua sisinya;
- menunjukkan kelebihan-suai (overfitting) pohon: ketepatan latih tinggi, ketepatan uji turun;
- menjelaskan mengapa hutan acak merata-ratakan banyak pohon;
- membandingkan pohon dan hutan secara adil dengan validasi silang dan pembanding mayoritas.

Keluaran yang diminta silabus: skrip model (bandingkan pohon dan hutan).

## Prediksi dulu

Tebak dan tulis keluarannya, baru jalankan. Pohon satu tingkat ini dilatih pada enam titik satu dimensi.

```python
from sklearn.tree import DecisionTreeClassifier, export_text

X = [[1], [2], [3], [10], [11], [12]]
y = [0, 0, 0, 1, 1, 1]
pohon = DecisionTreeClassifier(max_depth=1, random_state=0).fit(X, y)
print(export_text(pohon, feature_names=["x"]))
print(pohon.predict([[5], [7]]))
```

Tulis juga: di nilai berapa pohon memotong, dan dari mana angkanya.

## Contoh terselesaikan

**Bagian 1: memilih pemisah di kertas.** Pohon memilih pertanyaan yang membuat kedua sisinya sejernih mungkin. Ukurannya **gini** = 1 dikurangi jumlah kuadrat porsi tiap kelas; 0 berarti murni, makin besar makin campur. Delapan pengiriman karangan, `T` terlambat dan `N` tidak:

| No | jarak (km) | muatan (kg) | status |
| --- | --- | --- | --- |
| 1 | 3 | 4 | N |
| 2 | 5 | 8 | N |
| 3 | 8 | 3 | N |
| 4 | 11 | 2 | T |
| 5 | 12 | 7 | T |
| 6 | 14 | 6 | T |
| 7 | 15 | 9 | T |
| 8 | 10 | 10 | N |

Simpul awal berisi 4 T dan 4 N: gini = 1 − (0,5² + 0,5²) = 0,5. Pemisah A, jarak lebih dari 9,5: sisi kanan 5 baris (4 T, 1 N) bergini 1 − (0,8² + 0,2²) = 0,32 dan sisi kiri 3 baris (semua N) bergini 0; rata-rata berbobot (5/8 kali 0,32) + (3/8 kali 0) = **0,2**. Pemisah B, muatan lebih dari 5: sisi kanan 5 baris (3 T, 2 N) bergini 0,48 dan sisi kiri 3 baris (1 T, 2 N) bergini 4/9; rata-rata berbobot sekitar **0,47**. A menurunkan gini jauh lebih banyak, jadi A dipilih; pohon mengulanginya pada tiap sisi.

**Bagian 2: pohon, hutan, dan perbandingan yang adil.** Program berikut memakai 120 pengiriman karangan. `pohon_bebas` tanpa batas kedalaman; `hutan` berisi 100 pohon yang masing-masing dilatih pada contoh acak yang diambil dengan pengembalian dan mencari pemisah di antara fitur acak (dokumentasi `RandomForestClassifier`), lalu suaranya digabung. Perbandingan memakai satu pembagian latih-uji **dan** validasi silang lima lipatan yang sama.

```python
import pandas as pd
import sklearn
from sklearn.dummy import DummyClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import StratifiedKFold, cross_val_score, train_test_split
from sklearn.tree import DecisionTreeClassifier, export_text


def buat_data(n):
    baris = []
    for i in range(n):
        jarak = 1 + (i * 7) % 19  # km
        muatan = 2 + (i * 5) % 11  # kg
        terlambat = 1 if jarak + muatan > 17 else 0
        if i % 9 == 8:  # label sengaja dibalik (derau)
            terlambat = 1 - terlambat
        baris.append((jarak, muatan, terlambat))
    return pd.DataFrame(baris, columns=["jarak", "muatan", "terlambat"])


df = buat_data(120)
print(df["terlambat"].value_counts().to_dict())
X = df[["jarak", "muatan"]]
y = df["terlambat"]
X_latih, X_uji, y_latih, y_uji = train_test_split(
    X, y, test_size=0.25, random_state=0, stratify=y
)
model = {
    "pembanding": DummyClassifier(strategy="most_frequent"),
    "pohon2": DecisionTreeClassifier(max_depth=2, random_state=0),
    "pohon_bebas": DecisionTreeClassifier(random_state=0),
    "hutan": RandomForestClassifier(n_estimators=100, random_state=0),
}
for nama, m in model.items():
    m.fit(X_latih, y_latih)
    print(nama, round(m.score(X_latih, y_latih), 2), round(m.score(X_uji, y_uji), 2))

lipatan = StratifiedKFold(n_splits=5)
for nama, m in model.items():
    skor = cross_val_score(m, X, y, cv=lipatan)
    print(nama, skor.round(2), round(skor.mean(), 3))
print(export_text(model["pohon2"], feature_names=["jarak", "muatan"]))
print(model["pohon_bebas"].get_depth(), model["pohon_bebas"].get_n_leaves())
penting = model["hutan"].feature_importances_.round(2).tolist()
print(dict(zip(["jarak", "muatan"], penting)))
print("scikit-learn", sklearn.__version__)
```

```text
{0: 66, 1: 54}
pembanding 0.56 0.53
pohon2 0.8 0.83
pohon_bebas 1.0 0.73
hutan 1.0 0.83
pembanding [0.58 0.54 0.54 0.54 0.54] 0.55
pohon2 [0.83 0.71 0.88 0.75 0.79] 0.792
pohon_bebas [0.58 0.62 0.88 0.54 0.75] 0.675
hutan [0.67 0.75 0.92 0.71 0.83] 0.775
|--- jarak <= 9.50
|   |--- muatan <= 9.50
|   |   |--- class: 0
|   |--- muatan >  9.50
|   |   |--- class: 0
|--- jarak >  9.50
|   |--- muatan <= 4.50
|   |   |--- class: 0
|   |--- muatan >  4.50
|   |   |--- class: 1

10 36
{'jarak': 0.69, 'muatan': 0.31}
scikit-learn 1.9.1
```

Baca hasilnya. Di antara 120 baris, 66 tidak terlambat, jadi pembanding mayoritas mendapat sekitar 0,55. **Pohon tanpa batas** menghafal: ketepatan latih 1,0 (kedalaman 10 dengan 36 daun untuk 90 baris latih), tetapi ketepatan uji hanya 0,73; ia ikut menghafal baris berderau. **Pohon dua tingkat** lebih sederhana dan mendapat 0,80 pada latih dan 0,83 pada uji, tanpa jurang. **Hutan** 1,0 pada latih dan 0,83 pada uji. Pada validasi silang, rata-rata pembanding 0,55, pohon dua tingkat 0,792, pohon tanpa batas 0,675, dan hutan 0,775. Hutan mengalahkan pohon tanpa batas, tetapi **bukan** pohon dua tingkat: selisih 0,017 hanya sekitar dua dari 120 baris, belum bukti. Cabang kiri pohon dua tingkat dipecah lagi walau kedua daunnya menebak 0: pemisahan dipilih karena mengurangi gini, bukan karena mengubah tebakan. Angka "penting" fitur (jarak 0,69, muatan 0,31) menunjukkan fitur yang paling dipakai, **bukan sebab**.

## Contoh setengah jadi

Isi bagian `____` supaya program melatih hutan 20 pohon, menebak dua titik, dan mencetak jumlah pohon.

```python setengah-jadi
from sklearn.ensemble import RandomForestClassifier

X = [[1, 1], [2, 2], [3, 1], [8, 9], [9, 8], [10, 10]]
y = [0, 0, 0, 1, 1, 1]
hutan = RandomForestClassifier(n_estimators=____, random_state=0)
hutan.____(X, y)
print(hutan.predict([[2, 1], [9, 9]]))
print(len(hutan.____))
```

## Soal Parsons

Susun baris menjadi program yang melatih pohon satu tingkat lalu menebak titik 9. Lekukan tidak dipakai; yang diacak hanya urutannya.

```text
print(pohon.predict([[9]]))
pohon.fit(X, y)
y = [0, 0, 1, 1]
from sklearn.tree import DecisionTreeClassifier
X = [[0], [1], [10], [11]]
pohon = DecisionTreeClassifier(max_depth=1, random_state=0)
```

## Latihan

1. **Gini di kertas.** (`AI: tanpa AI`) Delapan pengiriman karangan (jarak km, muatan kg, status): (4, 3, N), (6, 9, N), (7, 2, N), (9, 8, T), (12, 4, T), (13, 9, T), (16, 3, T), (5, 7, T). Hitung gini simpul awal, lalu rata-rata berbobot untuk pemisah "jarak lebih dari 8" dan "muatan lebih dari 6". Mana yang dipilih?
2. **Rancangan dulu, lalu kode.** (`AI: tanpa AI`) Tulis daftar hal yang harus sama agar pohon kedalaman 1 sampai 6 dibandingkan adil, lalu program validasi silang untuk `buat_data(120)`. Kedalaman mana yang menang, dan mengapa belum tentu menang di data lain?
3. **Berapa pohon?** (`AI: boleh`) Jalankan hutan dengan `n_estimators` 10, 50, dan 200 pada validasi silang yang sama dan tulis apa yang kamu lihat.
4. **Baca pohon.** (`AI: boleh`) Dari `export_text` pohon dua tingkat di contoh, tulis aturannya dengan kata-kata dan tebak pengiriman (jarak 12, muatan 3), (8, 12), dan (14, 10).
5. **Catatan pemakaian AI (opsional).** Bila memakai asisten AI, catat alat, tujuan, garis besar perintah, bagian yang dipakai, dan cara memeriksanya.

## Latihan bercampur

1. Dari `D-XI1-M12`: pohon mendapat ketepatan uji 1,0 setelah ditambahkan kolom `jam_tiba`. Mengapa hasil itu patut dicurigai?
2. Dari `d-xi2-m1`: k-means butuh `StandardScaler`. Apakah pohon keputusan juga butuh? Beri alasan.

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `d-xi2-m3` (sekitar satu minggu lagi), `d-xi2-m5` (sekitar tiga minggu lagi), dan `D-XI2-M10` (sekitar delapan minggu lagi). Jawab sekarang lalu simpan.

1. Mengapa pohon tanpa batas kedalaman mendapat ketepatan latih 1,0 tetapi ketepatan uji lebih rendah?
2. Apa saja yang harus sama agar pohon dan hutan dibandingkan secara adil?
3. Mengapa model yang lebih rumit tidak selalu lebih baik?

## Kesalahan umum

- **"Pohon yang paling dalam paling pintar."** Pohon tanpa batas menghafal data latih, termasuk derau; ketepatan uji turun.
- **"Hutan pasti mengalahkan pohon."** Pada data kecil selisihnya bisa kebetulan.
- **"Fitur dengan kepentingan tinggi adalah penyebabnya."** Ia hanya menunjukkan fitur yang sering dipakai model, bukan sebab.

## Cek mandiri

- [ ] Saya dapat membaca keluaran `export_text` dan menebak dengan pohon itu.
- [ ] Saya dapat menghitung gini sebuah simpul dan membandingkan dua pemisah.
- [ ] Saya dapat menunjukkan kelebihan-suai dari selisih ketepatan latih dan uji.
- [ ] Saya dapat menjelaskan apa yang dilakukan hutan acak.
- [ ] Saya membandingkan model dengan pembanding dan lipatan sama.
- [ ] Saya mencatat pemakaian AI bila saya memakainya.

## Kunci dan petunjuk

**Ingat kembali.** 1: karena ia menebak dari angka lama, sehingga selalu di belakang kecenderungan naik. 2: supaya pembaca tidak menganggap hasil pada data kecil atau karangan berlaku di mana-mana, dan agar tahu apa yang belum dibuktikan. 3: karena nama itu tambahan kita; k-means hanya mengelompokkan menurut jarak. 4: dari akar, contoh baru menjawab pertanyaan ya atau tidak pada satu fitur, mengikuti cabang sampai daun, dan menebak kelas mayoritas di daun itu.

**Prediksi dulu.** Keluaran: pohon dengan pertanyaan `x <= 6.50`, daun kiri kelas 0, daun kanan kelas 1; lalu `[0 1]`. Angka 6,5 adalah titik tengah antara 3 (terbesar di kelas 0) dan 10 (terkecil di kelas 1): (3 + 10) / 2.

**Contoh setengah jadi.** Isian: `20`, `fit`, `estimators_`.

```python
from sklearn.ensemble import RandomForestClassifier

X = [[1, 1], [2, 2], [3, 1], [8, 9], [9, 8], [10, 10]]
y = [0, 0, 0, 1, 1, 1]
hutan = RandomForestClassifier(n_estimators=20, random_state=0)
hutan.fit(X, y)
print(hutan.predict([[2, 1], [9, 9]]))
print(len(hutan.estimators_))
```

```text
[0 1]
20
```

**Soal Parsons.** Urutan benar:

```python
from sklearn.tree import DecisionTreeClassifier
X = [[0], [1], [10], [11]]
y = [0, 0, 1, 1]
pohon = DecisionTreeClassifier(max_depth=1, random_state=0)
pohon.fit(X, y)
print(pohon.predict([[9]]))
```

```text
[1]
```

Pohon dibuat sebelum dilatih; `X` dan `y` harus ada sebelum `fit`; `predict` terakhir. Titik 9 lebih besar dari batas 5,5, jadi kelas 1.

**Latihan.** 1: simpul awal 5 T dan 3 N: gini = 1 − (25/64 + 9/64) = 0,46875. "Jarak lebih dari 8": kanan (9, 12, 13, 16) semuanya T, gini 0; kiri (4, 6, 7, 5) berisi 3 N dan 1 T, gini 1 − (0,75² + 0,25²) = 0,375; berbobot (4/8 kali 0) + (4/8 kali 0,375) = 0,1875. "Muatan lebih dari 6": kanan (9, 8, 9, 7) berisi N, T, T, T, gini 0,375; kiri (3, 2, 4, 3) berisi N, N, T, T, gini 0,5; berbobot 0,4375. Dipilih "jarak lebih dari 8". 2: harus sama: data, pembagian lipatan, metrik, dan pembanding. Hasil validasi silang 5 lipatan (tanpa acak): kedalaman 1 sampai 6 berturut-turut 0,808; 0,792; 0,833; 0,767; 0,767; 0,717, jadi kedalaman 3. Memilih kedalaman dari data yang sama dengan yang dipakai menilai membuat angka itu sedikit terlalu optimis; pada data lain pemenangnya bisa berbeda. 3: 10, 50, 200 pohon berturut-turut 0,742; 0,775; 0,758; lebih banyak pohon tidak otomatis lebih baik, dan selisihnya hanya beberapa baris. 4: jika jarak 9,5 km atau kurang, tebak tidak terlambat; jika lebih, tebak terlambat hanya bila muatan lebih dari 4,5 kg. (12, 3): jarak lebih dari 9,5 dan muatan 4,5 atau kurang, tidak terlambat; (8, 12): jarak 9,5 atau kurang, tidak terlambat; (14, 10): terlambat. 5: opsional.

**Latihan bercampur.** 1: `jam_tiba` hanya diketahui setelah paket sampai, jadi kolom itu memuat jawaban (kebocoran data); model tidak bisa memakainya saat benar-benar menebak. 2: tidak perlu; pohon membandingkan satu fitur dengan satu ambang dan tidak menghitung jarak antar fitur, sehingga mengubah skala tidak mengubah urutan nilai dan tidak mengubah pemisahannya.

**Ulang berjarak.** 1: karena pohon yang terlalu dalam menghafal data latih termasuk derau, sehingga tidak berlaku pada data yang belum terlihat. 2: data, pembagian lipatan, metrik, dan pembanding sederhana harus sama. 3: karena model rumit dapat menghafal derau; pada data kecil keunggulannya bisa kebetulan, dan model sederhana lebih mudah dijelaskan dan dirawat.

## Langkah berikutnya

Modul berikut: `d-xi2-m3` (rekayasa fitur), yang membuat dan memilih fitur untuk model. Bacaan lanjut: bagian pohon keputusan dan ensambel pada panduan pengguna `scikit-learn`.
