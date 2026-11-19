## Untuk siapa modul ini

Modul ini untuk murid kelas XI jalur D (kecerdasan buatan dan analisis data), untuk minggu `D-XI1-M10` silabus v1.3: evaluasi dan validasi, yaitu membagi data, membaca metrik, dan memahami validasi silang secara intuitif. Prasyarat: modul `d-xi1-m9`. Alat: Python 3 dengan pustaka `pandas` dan `scikit-learn`, tanpa akun.

Modul ini berstatus DRAF: karangan penyusun, belum ditinjau pemilik. Jalur D adalah pengayaan di luar rumusan capaian pembelajaran (CP); minggu ini tidak punya irisan pengayaan, jadi modul ini tidak dihitung memenuhi butir CP mana pun.

Aturan jalur D yang berlaku: data hanya sintetis (karangan) atau terbuka dengan lisensi jelas, tanpa data yang bisa mengenali orang; wajah, suara, dan foto orang tidak dipakai sebagai data; AI generatif boleh dipakai dengan etika dan dicatat, tanpa data pribadi, kata sandi, atau tugas bernilai pada permintaanmu, dan kamu tidak wajib punya akun. Saran: jawab dulu sendiri, baru minta AI memberi petunjuk bertahap; kode buatan AI dibaca, dijalankan, dan diuji. Setiap soal `Latihan` bertanda `AI: boleh` atau `AI: tanpa AI`.

Catatan untuk guru: blok Python dijalankan penyusun dengan `python3 -I` (Python 3.14.6, `pandas` 3.1.1, `scikit-learn` 1.9.1, per 2026-11) dan keluarannya ditempel apa adanya; yang dinyatakan hanya "bisa dijalankan dengan keluaran ini", bukan "benar untuk semua masukan". Data "biji karangan" dibangkitkan fungsi `buat_data` yang aturannya terlihat; sebagian label sengaja dibalik dan kelas "cacat" sengaja jarang (12 dari 60).

## Ingat kembali

Jawab dari ingatan, baru cek di bagian kunci.

1. Mengapa ketepatan uji 1,000 pada 12 baris belum membuktikan model sempurna? (dari `d-x2-m13`)
2. Grafik apa untuk melihat hubungan dua angka, dan apa yang tidak boleh disimpulkan dari hubungan itu? (dari `d-xi1-m7`)
3. Mengapa model tidak boleh dinilai pada data latih, dan bagaimana data dibagi? (dari `d-xi1-m9`)

## Tujuan

Setelah modul ini kamu dapat:

- membaca matriks kebingungan dan menyebut TP, FP, FN, dan TN;
- menghitung ketepatan, presisi, dan recall, dan menjelaskan kapan masing-masing lebih penting;
- menunjukkan bahwa ketepatan tinggi dapat menyesatkan pada data yang timpang;
- menjelaskan bahwa satu pembagian data latih dan uji dapat menyesatkan, dan memakai validasi silang sebagai gantinya;
- menuliskan rencana evaluasi singkat: pembagian, pembanding, dan metrik utama.

Keluaran yang diminta silabus: tabel metrik (bandingkan pembagian data).

## Prediksi dulu

Tebak dan tulis dua keluaran, baru jalankan. Angka `1` berarti "cacat".

```python
nyata = [1, 0, 0, 1, 0, 0, 0, 1]
tebak = [1, 0, 1, 0, 0, 0, 0, 1]
tp = sum(1 for n, t in zip(nyata, tebak) if n == 1 and t == 1)
fp = sum(1 for n, t in zip(nyata, tebak) if n == 0 and t == 1)
fn = sum(1 for n, t in zip(nyata, tebak) if n == 1 and t == 0)
print(tp, fp, fn)
print(sum(n == t for n, t in zip(nyata, tebak)) / len(nyata))
```

Tulis juga: dari semua biji yang sungguh cacat, berapa yang ketahuan?

## Contoh terselesaikan

**Ketepatan yang menipu.** Tabel merangkum tebakan model pada data uji, dengan "cacat" sebagai kelas yang dicari (positif). Empat sel: **TP** (cacat, ditebak cacat), **FP** (baik, ditebak cacat), **FN** (cacat, ditebak baik), **TN** (baik, ditebak baik). Rumusnya: ketepatan = (TP + TN) dibagi semua; presisi = TP / (TP + FP), yaitu dari yang ditebak cacat, berapa yang sungguh cacat; recall = TP / (TP + FN), yaitu dari yang sungguh cacat, berapa yang ketahuan.

```python
import pandas as pd
from sklearn.dummy import DummyClassifier
from sklearn.metrics import accuracy_score, confusion_matrix, precision_score, recall_score
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier


def buat_data(n, ambang):
    baris = []
    for i in range(n):
        ukuran = 10 + (i * 7) % 13  # mm
        berat = 20 + (i * 11) % 17  # mg
        cacat = 1 if ukuran + berat / 2 > ambang else 0
        if i % 13 == 12:  # label sengaja dibalik (derau)
            cacat = 1 - cacat
        baris.append((ukuran, berat, cacat))
    return pd.DataFrame(baris, columns=["ukuran", "berat", "cacat"])


df = buat_data(60, 35)
print(df["cacat"].value_counts().to_dict())
X = df[["ukuran", "berat"]]
y = df["cacat"]
X_latih, X_uji, y_latih, y_uji = train_test_split(
    X, y, test_size=0.25, random_state=0, stratify=y
)
pembanding = DummyClassifier(strategy="most_frequent").fit(X_latih, y_latih)
model = KNeighborsClassifier(n_neighbors=3).fit(X_latih, y_latih)
for nama, m in [("pembanding", pembanding), ("knn3", model)]:
    tebak = m.predict(X_uji)
    print(
        nama,
        "ketepatan", round(accuracy_score(y_uji, tebak), 2),
        "presisi", round(precision_score(y_uji, tebak, zero_division=0), 2),
        "recall", round(recall_score(y_uji, tebak), 2),
    )
print(confusion_matrix(y_uji, model.predict(X_uji)))
```

```text
{0: 48, 1: 12}
pembanding ketepatan 0.8 presisi 0.0 recall 0.0
knn3 ketepatan 0.8 presisi 0.5 recall 0.33
[[11  1]
 [ 2  1]]
```

Baca hasilnya. Hanya 12 dari 60 biji yang cacat, jadi pembanding yang selalu menjawab "baik" mendapat ketepatan 0,8 tanpa menemukan **satu pun** cacat (recall 0). Model kNN mendapat ketepatan yang sama, 0,8, tetapi matriksnya (baris = kenyataan baik lalu cacat, kolom = tebakan baik lalu cacat) menunjukkan 11 TN, 1 FP, 2 FN, 1 TP: ia menemukan satu dari tiga biji cacat (recall 0,33) dan setengah dari tebakan "cacat"-nya benar (presisi 0,5). Ketepatan saja tidak membedakan keduanya. Pada pemeriksaan biji cacat, melewatkan yang cacat (FN) biasanya lebih merugikan daripada salah curiga (FP), jadi recall menjadi metrik utama; bila salah curiga mahal, presisi yang diutamakan.

**Satu pembagian belum cukup.** Data uji hanya 15 baris dengan 3 cacat, sehingga satu biji berbeda mengubah recall dari 0,33 menjadi 0,67. Cara yang lebih tenang: **validasi silang**. Data dipecah menjadi lima bagian (lipatan); tiap bagian secara bergantian menjadi data uji, empat sisanya menjadi data latih; lima angka itu dirata-rata.

```python
import pandas as pd
from sklearn.metrics import accuracy_score
from sklearn.model_selection import cross_val_score, train_test_split
from sklearn.neighbors import KNeighborsClassifier


def buat_data(n, ambang):
    baris = []
    for i in range(n):
        ukuran = 10 + (i * 7) % 13  # mm
        berat = 20 + (i * 11) % 17  # mg
        cacat = 1 if ukuran + berat / 2 > ambang else 0
        if i % 13 == 12:  # label sengaja dibalik (derau)
            cacat = 1 - cacat
        baris.append((ukuran, berat, cacat))
    return pd.DataFrame(baris, columns=["ukuran", "berat", "cacat"])


df = buat_data(60, 35)
X = df[["ukuran", "berat"]]
y = df["cacat"]

hasil = []
for rs in range(8):
    X_latih, X_uji, y_latih, y_uji = train_test_split(
        X, y, test_size=0.25, random_state=rs, stratify=y
    )
    m = KNeighborsClassifier(n_neighbors=3).fit(X_latih, y_latih)
    hasil.append(round(accuracy_score(y_uji, m.predict(X_uji)), 2))
print("ketepatan pada 8 pembagian:", hasil)

model = KNeighborsClassifier(n_neighbors=3)
ketepatan = cross_val_score(model, X, y, cv=5)
recall = cross_val_score(model, X, y, cv=5, scoring="recall")
print("ketepatan 5 lipatan:", ketepatan.round(2).tolist(), "rata-rata", round(ketepatan.mean(), 2))
print("recall 5 lipatan:", recall.round(2).tolist(), "rata-rata", round(recall.mean(), 2))
```

```text
ketepatan pada 8 pembagian: [0.8, 0.93, 0.8, 0.87, 0.87, 0.87, 0.8, 1.0]
ketepatan 5 lipatan: [1.0, 0.83, 0.75, 0.75, 0.83] rata-rata 0.83
recall 5 lipatan: [1.0, 0.5, 0.0, 0.33, 0.33] rata-rata 0.43
```

Ketepatan bergerak antara 0,8 dan 1,0 hanya karena pembagiannya berbeda; angka mana pun yang kebetulan kamu dapat dari satu pembagian bukan "kemampuan model". Lima lipatan memberi rata-rata ketepatan 0,83, tetapi recall tiap lipatan berkisar dari 0 sampai 1 dan rata-ratanya hanya 0,43. Gambaran jujurnya: lumayan pada ketepatan, lemah pada menemukan cacat, dan datanya kecil. Validasi silang tidak membuat model lebih baik; ia hanya membuat **penilaiannya** lebih stabil.

## Contoh setengah jadi

Isi bagian `____` supaya program menghitung presisi dan recall dari hitungan TP, FP, FN yang diberikan.

```python setengah-jadi
tp, fp, fn = 3, 1, 5
presisi = tp / (tp + ____)
recall = tp / (tp + ____)
print(round(presisi, 2), round(recall, 2))
```

## Soal Parsons

Susun baris menjadi program yang menghitung recall dari dua daftar. Lekukan tidak dipakai; yang diacak hanya urutannya.

```text
print(recall_score(nyata, tebak))
tebak = [1, 0, 0, 0]
from sklearn.metrics import recall_score
nyata = [1, 1, 0, 0]
```

## Latihan

1. **Hitung tangan.** (`AI: tanpa AI`) Dari 100 biji, 8 cacat. Sebuah model menjawab "baik" untuk semuanya. Tulis ketepatan dan recall-nya, lalu satu kalimat mengapa model itu tidak berguna.
2. **Rencana evaluasi dulu.** (`AI: tanpa AI`) Tulis rencana empat baris untuk menilai penggolong biji cacat: cara membagi data, pembanding sederhana, metrik utama, dan alasan memilih metrik itu. Lalu hitung presisi dan recall dari `nyata = [1, 1, 0, 0, 1, 0]` dan `tebak = [1, 0, 0, 1, 1, 0]` dengan tangan.
3. **Banyak pembagian.** (`AI: boleh`) Ulangi pembagian pada contoh dengan `random_state` dari 0 sampai 9 dan catat ketepatan serta recall terkecil dan terbesar. Tulis dua kalimat tentang apa yang ditunjukkan sebaran itu.
4. **Jumlah lipatan.** (`AI: boleh`) Jalankan `cross_val_score` dengan `cv` 3, 5, dan 10 pada data contoh. Bandingkan rata-ratanya dan tulis apa yang boleh disimpulkan dari data 60 baris.
5. **Catatan pemakaian AI (opsional).** Bila memakai asisten AI, catat alat, tujuan, garis besar perintah, bagian yang dipakai, dan cara memeriksanya.

## Latihan bercampur

1. Dari `d-xi1-m9`: pada pembagian dengan `stratify=y`, apa gunanya `stratify`, dan mengapa itu penting pada data yang timpang?
2. Dari `d-xi1-m7`: tulis grafik apa dan sumbu apa yang akan kamu pakai untuk menunjukkan ketepatan dan recall dari tiga model, dan satu hal yang tidak boleh disimpulkan.

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `d-xi1-m11` (sekitar satu minggu lagi), `d-xi1-m13` (sekitar tiga minggu lagi), dan modul jalur D kelas XI semester 2 pada minggu `D-XI2-M4` (sekitar delapan minggu lagi). Jawab sekarang lalu simpan.

1. Apa beda presisi dan recall, dan kapan recall lebih penting?
2. Mengapa satu pembagian data latih dan uji bisa menyesatkan, dan apa gantinya?
3. Mengapa ketepatan saja tidak cukup pada data yang timpang, dan metrik apa yang melengkapinya?

## Kesalahan umum

- **"Ketepatan tinggi berarti model bagus."** Pada data timpang, menebak kelas terbanyak sudah memberi ketepatan tinggi; lihat recall dan presisi untuk kelas yang dicari.
- **"Presisi dan recall itu sama."** Presisi menghitung dari tebakan "cacat"; recall menghitung dari yang sungguh cacat. Keduanya bisa berbeda jauh pada satu model.
- **"Satu pembagian data cukup."** Pada data kecil, hasilnya berubah ketika pembagian berubah; ulangi atau pakai validasi silang.
- **"Validasi silang membuat modelnya lebih baik."** Ia hanya membuat nilai penilaiannya lebih stabil; modelnya tetap sama.
- **"Boleh mencoba banyak pengaturan sambil melihat data uji."** Data uji yang dilihat berulang menjadi ikut menyetel model, sehingga angkanya tidak jujur lagi (bahasan `d-xi1-m12`).

## Cek mandiri

- [ ] Saya dapat membaca matriks kebingungan dan menghitung ketepatan, presisi, dan recall.
- [ ] Saya dapat memilih metrik utama berdasarkan dampak kesalahan.
- [ ] Saya dapat menjelaskan mengapa satu pembagian belum cukup dan apa isi validasi silang.
- [ ] Saya menulis rencana evaluasi sebelum menjalankan model.
- [ ] Saya mencatat pemakaian AI bila saya memakainya.

## Kunci dan petunjuk

**Ingat kembali.** 1: karena 12 baris sangat sedikit; satu baris berbeda mengubah angka banyak, dan ketepatan 1,000 bisa kebetulan, jadi perlu data uji lebih banyak atau validasi silang. 2: titik sebar; hubungan (korelasi) bukan bukti sebab, faktor ketiga atau kebetulan bisa menjelaskannya. 3: model sudah melihat data latih sehingga bisa menghafalnya; data dibagi menjadi latih dan uji yang disisihkan.

**Prediksi dulu.** Keluaran: `2 1 1` lalu `0.75`. TP 2 (posisi 1 dan 8), FP 1 (posisi 3), FN 1 (posisi 4); yang cocok 6 dari 8. Dari tiga biji yang sungguh cacat, dua ketahuan.

**Contoh setengah jadi.** Isian: `fp` dan `fn`.

```python
tp, fp, fn = 3, 1, 5
presisi = tp / (tp + fp)
recall = tp / (tp + fn)
print(round(presisi, 2), round(recall, 2))
```

```text
0.75 0.38
```

Presisi 3/4 = 0,75 dan recall 3/8 = 0,375 yang dibulatkan menjadi 0,38.

**Soal Parsons.** Urutan benar:

```python
from sklearn.metrics import recall_score
nyata = [1, 1, 0, 0]
tebak = [1, 0, 0, 0]
print(recall_score(nyata, tebak))
```

```text
0.5
```

Satu dari dua yang cacat ketahuan, jadi 0,5.

**Latihan.** 1: ketepatan 92 dari 100 = 0,92; recall 0 dari 8 = 0. Model itu tidak menemukan satu pun biji cacat, padahal itulah tugasnya. 2: contoh rencana: bagi 75:25 dengan `stratify`; pembanding: selalu jawab "baik"; metrik utama recall untuk kelas cacat, ditambah presisi; alasan: biji cacat yang lolos lebih merugikan daripada biji baik yang diperiksa ulang. Hitungan: TP 2 (posisi 1 dan 5), FP 1 (posisi 4), FN 1 (posisi 2); presisi 2/3 = 0,67 dan recall 2/3 = 0,67. 3: dinilai dari angka terkecil dan terbesar yang dilaporkan dan kesimpulan bahwa sebaran menunjukkan hasil satu pembagian tidak stabil pada 60 baris. 4: dinilai dari tiga rata-rata yang dilaporkan dan kalimat bahwa data 60 baris dengan 12 cacat tetap kecil, jadi selisih kecil antar pengaturan belum bermakna. 5: opsional.

**Latihan bercampur.** 1: `stratify` menjaga perbandingan kelas yang sama di data latih dan data uji; pada data timpang, tanpa itu data uji bisa tidak memuat satu pun kelas langka. 2: grafik batang berkelompok dengan sumbu y dimulai dari nol, satu batang untuk ketepatan dan satu untuk recall tiap model; yang tidak boleh disimpulkan: perbedaan kecil antar model dari satu pembagian data kecil.

**Ulang berjarak.** 1: presisi menghitung dari tebakan positif, recall dari yang sungguh positif; recall lebih penting bila melewatkan yang positif lebih merugikan. 2: karena hasilnya bergantung pada baris mana yang kebetulan masuk data uji; gantinya mengulang pembagian atau memakai validasi silang. 3: karena menebak kelas terbanyak pun sudah memberi ketepatan tinggi; dilengkapi presisi, recall, atau F1 untuk kelas yang dicari.

## Langkah berikutnya

Modul berikut: `d-xi1-m11` (membandingkan model), tempat kamu membandingkan beberapa model dengan metrik yang sama dan membenarkan pilihanmu. Bacaan lanjut: panduan pengguna `scikit-learn` tentang evaluasi model dan tentang validasi silang.
