## Untuk siapa modul ini

Modul ini untuk murid kelas XI jalur D (kecerdasan buatan dan analisis data), untuk minggu `D-XI2-M5` silabus v1.3: klasifikasi teks, yaitu melatih penggolong teks. Prasyarat: modul `d-xi2-m4` (membuat matriks kata). Alat: Python 3 dengan pustaka `pandas` dan `scikit-learn`, tanpa akun.

Modul ini karangan penyusun dan disetujui pemilik program pada 2026-11-20 (keputusan lewat dialog; catatan tinjauan menjadi tindak lanjut revisi). Jalur D adalah pengayaan di luar rumusan capaian pembelajaran (CP). Minggu ini beririsan dengan butir `F-AP-d` (memakai library untuk model) pada tingkat rendah, hanya karena alatnya coding; irisan itu **tidak dihitung** sebagai pemenuhan CP.

Aturan jalur D yang berlaku: data hanya sintetis (karangan) atau terbuka dengan lisensi jelas, tanpa data yang bisa mengenali orang; wajah, suara, dan foto orang tidak dipakai sebagai data; AI generatif boleh dipakai dengan etika dan dicatat, tanpa data pribadi, kata sandi, atau tugas bernilai pada permintaanmu, dan kamu tidak wajib punya akun. Saran: jawab dulu sendiri, baru minta AI memberi petunjuk bertahap; kode buatan AI dibaca, dijalankan, dan diuji. Setiap soal `Latihan` bertanda `AI: boleh` atau `AI: tanpa AI`.

Catatan untuk guru: blok Python dijalankan penyusun dengan `python3 -I` (Python 3.14.6, `pandas` 3.1.1, `scikit-learn` 1.9.1, per 2026-11) dan keluarannya ditempel apa adanya; yang dinyatakan hanya "bisa dijalankan dengan keluaran ini", bukan "benar untuk semua masukan". Kalimat "ulasan" dirangkai program dari daftar kata karangan; sebagian label dibalik sebagai derau, dan kalimat berpola "tidak" sengaja dipisah untuk memperlihatkan kelemahan model. Tidak ada ulasan nyata atau teks dari orang.

## Ingat kembali

Jawab dari ingatan, baru cek di bagian kunci.

1. Apa saja yang harus sama agar dua model dibandingkan secara adil? (dari `D-XI1-M11` dan `d-xi2-m2`)
2. Mengapa kata seperti "tidak" tidak boleh sembarang masuk daftar kata henti? (dari `d-xi2-m4`)
3. Mengapa model tidak boleh dinilai pada data latih, dan bagaimana data dibagi? (dari `D-XI1-M9`)
4. Mengapa kalimat "tidak mudah dipakai" salah ditebak oleh kantung kata? (dari `d-x2-m10`)

## Tujuan

Setelah modul ini kamu dapat:

- merangkai `CountVectorizer` dan penggolong dalam satu `Pipeline` dan melatihnya pada kalimat berlabel;
- membandingkan dua penggolong teks (Naive Bayes dan regresi logistik) dengan data, lipatan, dan metrik yang sama;
- menyebut kata yang paling mendorong tebakan, tanpa menganggapnya sebab;
- menunjukkan pola kalimat yang gagal ditebak (misalnya "tidak") dan menyebut dua perbaikan;
- membaca ketepatan pada data uji yang kecil dengan hati-hati.

Keluaran yang diminta silabus: skrip penggolong teks (klasifikasi sentimen kalimat sintetis berbahasa Indonesia).

## Prediksi dulu

Tebak dan tulis keluarannya, baru jalankan. Penggolong dilatih pada empat kalimat sangat pendek.

```python
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.pipeline import make_pipeline

latih = ["bagus cepat", "bagus rapi", "lambat rusak", "rusak mahal"]
label = [1, 1, 0, 0]
model = make_pipeline(CountVectorizer(), MultinomialNB()).fit(latih, label)
print(model.predict(["cepat", "mahal", "bagus rusak", "keren"]))
```

Tulis juga: untuk "bagus rusak" dan "keren" (kata yang tidak ada di data latih), seberapa yakin kamu dengan tebakanmu, dan mengapa.

## Contoh terselesaikan

**Dari kalimat berlabel ke penggolong.** Satu `Pipeline` merangkai dua langkah: `CountVectorizer` mengubah kalimat menjadi hitungan kata (`d-xi2-m4`), lalu penggolong belajar dari hitungan itu. Naive Bayes menghitung seberapa sering tiap kata muncul pada kalimat positif dan negatif lalu menimbang kata-kata kalimat baru (dokumentasi `MultinomialNB`); regresi logistik mencari bobot tiap kata. Kalimat dirangkai program dari daftar subjek, kata positif, dan kata negatif; label 1 positif, 0 negatif. Perbandingan yang adil memakai data yang sama, pembagian dan lipatan yang sama, metrik yang sama, dan pembanding mayoritas.

```python
import pandas as pd
import sklearn
from sklearn.dummy import DummyClassifier
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import StratifiedKFold, cross_val_score, train_test_split
from sklearn.naive_bayes import MultinomialNB
from sklearn.pipeline import make_pipeline

SUBJEK = ["aplikasi", "layanan", "tampilan", "pengiriman", "kemasan", "harga"]
POSITIF = ["bagus", "cepat", "rapi", "mudah", "nyaman", "murah"]
NEGATIF = ["lambat", "rusak", "sulit", "kacau", "mahal", "buruk"]
POLA = ["{s} {k}", "{s} sangat {k}", "menurut saya {s} {k}", "{s} {k} sekali"]


def buat_data(n, dengan_tidak=False):
    baris = []
    for i in range(n):
        s = SUBJEK[(i // 2 + i // 5) % 6]
        label = i % 2  # 1 = positif, 0 = negatif
        daftar = POSITIF if label else NEGATIF
        k = daftar[(i // 2 * 5 + i // 3) % 6]
        kalimat = POLA[(i // 6) % 4].format(s=s, k=k)
        if dengan_tidak and i % 5 == 4:  # "tidak" membalik arti kata
            lawan = NEGATIF if label else POSITIF
            kalimat = f"{s} tidak {lawan[(i // 10) % 6]}"
        if i % 17 == 16:  # label sengaja dibalik (derau)
            label = 1 - label
        baris.append((kalimat, label))
    return pd.DataFrame(baris, columns=["kalimat", "positif"])


df = buat_data(72)
print(df.head(4).to_string())
print(df["positif"].value_counts().to_dict())
X_latih, X_uji, y_latih, y_uji = train_test_split(
    df["kalimat"], df["positif"], test_size=0.25, random_state=0, stratify=df["positif"]
)
model = {
    "pembanding": make_pipeline(CountVectorizer(), DummyClassifier(strategy="most_frequent")),
    "nb": make_pipeline(CountVectorizer(), MultinomialNB()),
    "logreg": make_pipeline(CountVectorizer(), LogisticRegression()),
}
lipatan = StratifiedKFold(n_splits=5, shuffle=True, random_state=0)
for nama, m in model.items():
    m.fit(X_latih, y_latih)
    skor = cross_val_score(m, df["kalimat"], df["positif"], cv=lipatan)
    print(nama, round(m.score(X_uji, y_uji), 2), skor.round(2), round(skor.mean(), 3))

nb = model["nb"]
cv = nb.named_steps["countvectorizer"]
clf = nb.named_steps["multinomialnb"]
selisih = clf.feature_log_prob_[1] - clf.feature_log_prob_[0]
urut = sorted(zip(cv.get_feature_names_out(), selisih.round(2).tolist()), key=lambda p: p[1])
print(urut[:3], urut[-3:])

uji_tidak = ["aplikasi tidak bagus", "harga tidak mahal", "layanan tidak lambat", "kemasan tidak rusak"]
print(nb.predict(uji_tidak), "seharusnya [0 1 1 1]")
print("scikit-learn", sklearn.__version__)
```

```text
           kalimat  positif
0  aplikasi lambat        0
1   aplikasi bagus        1
2    layanan buruk        0
3    layanan bagus        1
{0: 36, 1: 36}
pembanding 0.5 [0.47 0.47 0.5  0.5  0.5 ] 0.487
nb 1.0 [1.   0.93 1.   1.   0.86] 0.958
logreg 0.94 [0.93 0.93 1.   1.   0.93] 0.959
[('rusak', -1.96), ('sulit', -1.8), ('mahal', -1.62)] [('rapi', 1.6), ('murah', 1.78), ('nyaman', 1.94)]
[1 0 0 0] seharusnya [0 1 1 1]
scikit-learn 1.9.1
```

Baca hasilnya. Data seimbang (36 positif, 36 negatif), jadi pembanding mendapat sekitar 0,5. Pada 18 kalimat uji, Naive Bayes mendapat 1,0 dan regresi logistik 0,94; pada validasi silang lima lipatan kedua model rata-rata 0,958 dan 0,959. **Selisih 0,001 itu bukan perbedaan**: pada data sekecil ini keduanya setara, dan angka uji 1,0 lawan 0,94 hanyalah satu kalimat. Hasil satu pembagian pun bergantung pada pembagiannya (Latihan 3). Kata yang paling mendorong tebakan negatif adalah `rusak`, `sulit`, `mahal`, dan yang paling mendorong tebakan positif `rapi`, `murah`, `nyaman`: itu pola dalam data karangan, bukan sebab. Bagian terakhir adalah **kelemahan**: model yang dilatih tanpa kalimat berpola "tidak" salah pada keempat kalimat uji berpola itu, karena ia menjumlahkan kata dan `tidak` tidak ada artinya baginya; "tidak bagus" tetap tampak positif. Dua perbaikan yang biasa dicoba adalah menambah contoh berpola "tidak" ke data latih dan memakai pasangan kata (bigram); keduanya diuji di Latihan 4 dan tidak menjamin semua kalimat benar. Model juga tidak tahu kata yang belum pernah dilihat: kata itu hanya diabaikan.

## Contoh setengah jadi

Isi bagian `____` supaya program melatih penggolong dan menebak tiga kalimat.

```python setengah-jadi
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.pipeline import make_pipeline

latih = ["murah rapi", "nyaman bagus", "mahal buruk", "lambat sulit"]
label = [1, 1, 0, 0]
model = make_pipeline(____(), MultinomialNB())
model.____(latih, label)
print(model.____(["rapi", "buruk", "murah buruk"]))
```

## Soal Parsons

Susun baris menjadi program yang melatih penggolong lalu mencetak ketepatannya pada dua kalimat uji. Lekukan tidak dipakai; yang diacak hanya urutannya.

```text
print(model.score(uji, label_uji))
label_uji = [1, 0]
model.fit(latih, label)
from sklearn.naive_bayes import MultinomialNB
label = [1, 1, 0, 0]
uji = ["murah", "rusak"]
latih = ["murah rapi", "nyaman bagus", "rusak sulit", "lambat mahal"]
model = make_pipeline(CountVectorizer(), MultinomialNB())
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.pipeline import make_pipeline
```

## Latihan

1. **Metrik dengan tangan.** (`AI: tanpa AI`) Dari 20 kalimat uji, penggolong menghasilkan 7 positif benar, 3 positif yang terlewat, 1 negatif yang dituduh positif, dan 9 negatif benar. Hitung ketepatan, presisi, dan recall untuk kelas positif.
2. **Rancangan dulu, lalu kode.** (`AI: tanpa AI`) Tulis daftar hal yang harus sama agar Naive Bayes dan regresi logistik dibandingkan adil, lalu program validasi silang untuk `buat_data(72)`. Apa kesimpulan yang boleh ditarik dari dua rata-rata itu?
3. **Ganti pembagian.** (`AI: boleh`) Ulangi pembagian latih-uji dengan `random_state` 0 sampai 5 dan catat ketepatan uji kedua model. Apa yang terjadi, dan apa artinya bagi data uji yang hanya 18 baris?
4. **Pola "tidak".** (`AI: boleh`) Latih Naive Bayes pada seluruh `buat_data(100, dengan_tidak=True)` dengan unigram, lalu dengan `ngram_range=(1, 2)`, dan tebak empat kalimat `uji_tidak`. Berapa yang benar pada tiap cara?
5. **Catatan pemakaian AI (opsional).** Bila memakai asisten AI, catat alat, tujuan, garis besar perintah, bagian yang dipakai, dan cara memeriksanya.

## Latihan bercampur

1. Dari `D-XI1-M12`: sebuah model teks mendapat ketepatan 1,0 pada data uji. Tulis tiga pertanyaan pemeriksa sebelum mempercayainya.
2. Dari `d-xi2-m4`: kalimat uji berisi kata yang tidak ada di kosakata latih. Apa yang dilakukan `CountVectorizer`, dan apa risikonya bagi tebakan?

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `d-xi2-m6` (sekitar satu minggu lagi), `d-xi2-m8` (sekitar tiga minggu lagi), dan `D-XI2-M13` (sekitar delapan minggu lagi). Jawab sekarang lalu simpan.

1. Mengapa dua model dengan ketepatan 0,958 dan 0,959 pada data kecil belum tentu berbeda?
2. Mengapa model teks gagal pada kalimat berpola "tidak" bila data latih tidak memuat pola itu, dan apa dua perbaikannya?
3. Mengapa kata yang paling mendorong tebakan hanya menunjukkan pola di data, bukan sebab?

## Kesalahan umum

- **"Model memahami kalimat."** Ia menjumlahkan kata; urutan dan arti seperti "tidak" tidak dipahami kecuali dibuat menjadi fitur.
- **"Ketepatan 1,0 pada uji berarti model sempurna."** Pada 18 kalimat, satu kalimat berbeda mengubah angka sebesar 0,06; hasil bergantung pada pembagian.
- **"Naive Bayes dan regresi logistik berbeda karena 0,958 dan 0,959."** Selisih sekecil itu pada data kecil adalah derau.
- **"Kata berpengaruh adalah penyebab sentimen."** Ia hanya pola dalam data latih yang karangan.
- **"Data karangan cukup mewakili ulasan nyata."** Kalimat dirangkai dari pola tetap, sehingga lebih mudah daripada teks nyata; hasilnya tidak boleh dibawa ke teks nyata begitu saja.

## Cek mandiri

- [ ] Saya dapat merangkai `CountVectorizer` dan penggolong dalam `Pipeline`.
- [ ] Saya membandingkan dua model dengan lipatan dan metrik yang sama.
- [ ] Saya dapat menghitung ketepatan, presisi, dan recall dari empat angka.
- [ ] Saya dapat menunjukkan pola kalimat yang gagal dan dua perbaikannya.
- [ ] Saya membaca ketepatan uji kecil dengan hati-hati.
- [ ] Saya mencatat pemakaian AI bila saya memakainya.

## Kunci dan petunjuk

**Ingat kembali.** 1: data, pembagian atau lipatan, metrik, dan pembanding sederhana harus sama. 2: karena "tidak" membalik arti; membuangnya membuat "tidak mudah" tampak seperti "mudah". 3: karena model sudah melihat data latih sehingga bisa menghafalnya; data dibagi menjadi data latih dan data uji yang disisihkan. 4: karena "tidak" tidak ada di tabel kata dan diabaikan, sedangkan "mudah" bernilai positif; kantung kata membuang urutan.

**Prediksi dulu.** Keluaran: `[1 0 0 0]`. "Cepat" hanya muncul pada kalimat positif sehingga positif; "mahal" hanya pada kalimat negatif sehingga negatif. "Bagus rusak" memuat satu kata dari tiap kelas dengan bobot yang seimbang, jadi peluangnya sekitar 0,5 dan 0,5 (diperiksa dengan `model.predict_proba`): yang ditulis `predict` pada contoh ini kebetulan kelas 0, padahal modelnya tidak yakin. "Keren" tidak ada di kosakata sehingga diabaikan; yang tersisa hanya prior (data seimbang), peluang sekitar 0,5 dan 0,5, dan tebakan jatuh ke kelas 0 lagi. Jawaban "tidak yakin" bernilai; tebakan yang tampak pasti belum tentu yakin.

**Contoh setengah jadi.** Isian: `CountVectorizer`, `fit`, `predict`.

```python
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.pipeline import make_pipeline

latih = ["murah rapi", "nyaman bagus", "mahal buruk", "lambat sulit"]
label = [1, 1, 0, 0]
model = make_pipeline(CountVectorizer(), MultinomialNB())
model.fit(latih, label)
print(model.predict(["rapi", "buruk", "murah buruk"]))
```

```text
[1 0 0]
```

**Soal Parsons.** Urutan benar (impor boleh dalam urutan lain asal sebelum dipakai):

```python
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.pipeline import make_pipeline
latih = ["murah rapi", "nyaman bagus", "rusak sulit", "lambat mahal"]
label = [1, 1, 0, 0]
uji = ["murah", "rusak"]
label_uji = [1, 0]
model = make_pipeline(CountVectorizer(), MultinomialNB())
model.fit(latih, label)
print(model.score(uji, label_uji))
```

```text
1.0
```

**Latihan.** 1: ketepatan (7 + 9) / 20 = 0,8; presisi 7 / (7 + 1) = 0,875; recall 7 / (7 + 3) = 0,7. 2: harus sama: data, pembagian lipatan, metrik, dan pembanding; hasil validasi silang 0,958 dan 0,959 (Naive Bayes dan regresi logistik): kesimpulan yang boleh: keduanya jauh di atas pembanding (sekitar 0,49) dan setara pada data ini; yang tidak boleh: bahwa salah satu lebih baik. 3: ketepatan uji `random_state` 0 sampai 5 untuk Naive Bayes: 1,0; 0,89; 0,94; 0,94; 0,83; 0,78, dan untuk regresi logistik: 0,94; 0,89; 0,94; 1,0; 0,83; 0,83; angka berayun menurut pembagian, sehingga 18 baris uji belum cukup untuk memilih model. 4: unigram menebak `[1 0 0 0]` (tidak ada yang benar dari `[0 1 1 1]`), bigram menebak `[1 0 1 1]` (dua benar): menambah contoh dan bigram membantu sebagian, tidak semua. 5: opsional.

**Latihan bercampur.** 1: contoh: apakah ada kalimat uji yang sama dengan kalimat latih; apakah kosakata atau pilihan lain dipasang pada seluruh data sebelum membagi; bagaimana hasil pembanding mayoritas; berapa banyak percobaan sebelum angka ini dipilih. 2: kata itu diabaikan; risikonya kalimat yang seluruhnya kata baru tampak "kosong" dan ditebak dari prior saja.

**Ulang berjarak.** 1: karena selisih sekecil itu hanya sekitar satu kalimat pada data uji dan dapat berbalik pada pembagian lain. 2: karena model menjumlahkan kata dan tidak melihat urutan; perbaikan: tambahkan contoh berpola "tidak" ke data latih, dan pakai pasangan kata (bigram). 3: karena model hanya menghitung kemunculan kata pada data latih; hubungan itu bisa kebetulan atau hasil rancangan data, bukan bukti sebab.

## Langkah berikutnya

Modul berikut: `d-xi2-m6` (gambar sebagai angka), yang membawa gagasan fitur dari teks ke piksel. Bacaan lanjut: bagian Naive Bayes pada panduan pengguna `scikit-learn`.
