## Untuk siapa modul ini

Modul ini untuk murid kelas XI jalur D (kecerdasan buatan dan analisis data), untuk minggu `D-XI1-M11` silabus v1.3: membandingkan model, yaitu menghasilkan dua model atau lebih dan menjustifikasi pilihan. Prasyarat: modul `d-xi1-m10`. Alat: Python 3 dengan pustaka `pandas` dan `scikit-learn`, tanpa akun.

Modul ini berstatus DRAF: karangan penyusun, belum ditinjau pemilik. Jalur D adalah pengayaan di luar rumusan capaian pembelajaran (CP); minggu ini tidak punya irisan pengayaan, jadi modul ini tidak dihitung memenuhi butir CP mana pun.

Aturan jalur D yang berlaku: data hanya sintetis (karangan) atau terbuka dengan lisensi jelas, tanpa data yang bisa mengenali orang; wajah, suara, dan foto orang tidak dipakai sebagai data; AI generatif boleh dipakai dengan etika dan dicatat, tanpa data pribadi, kata sandi, atau tugas bernilai pada permintaanmu, dan kamu tidak wajib punya akun. Saran: jawab dulu sendiri, baru minta AI memberi petunjuk bertahap; kode buatan AI dibaca, dijalankan, dan diuji. Setiap soal `Latihan` bertanda `AI: boleh` atau `AI: tanpa AI`.

Catatan untuk guru: blok Python dijalankan penyusun dengan `python3 -I` (Python 3.14.6, `pandas` 3.1.1, `scikit-learn` 1.9.1, per 2026-11) dan keluarannya ditempel apa adanya; yang dinyatakan hanya "bisa dijalankan dengan keluaran ini", bukan "benar untuk semua masukan". Data "biji karangan" dibangkitkan oleh fungsi `buat_data` yang aturannya terlihat (60 baris; label 0 atau 1, sebagian sengaja dibalik). Dua model kebetulan memberi skor sama pada contoh; itu sengaja dibiarkan karena memang mengajarkan cara memilih saat skor tidak membedakan. Hasilnya contoh pada satu data, bukan hukum tentang model.

## Ingat kembali

Jawab dari ingatan, baru cek di bagian kunci.

1. Apa untungnya fungsi yang menerima masukan dan mengembalikan hasil dibanding mengubah variabel di luar fungsi? (dari `d-xi1-m3`)
2. Mengapa model yang menang pada satu data belum tentu menang pada data lain? (dari `d-xi1-m8`)
3. Apa beda presisi dan recall, dan kapan recall lebih penting? (dari `d-xi1-m10`)

## Tujuan

Setelah modul ini kamu dapat:

- menulis fungsi yang menilai sebuah model dengan validasi silang dan mengembalikan ringkasan angka;
- membandingkan tiga model atau lebih pada data, lipatan, dan metrik yang sama;
- membaca selisih antar model terhadap sebaran antar lipatan;
- memilih model dengan alasan tertulis yang memuat angka, kemudahan penjelasan, dan jenis kesalahan yang berbahaya;
- menulis batas kesimpulan dari perbandingan itu.

Keluaran yang diminta silabus: laporan perbandingan (tiga model pada satu data).

## Prediksi dulu

Tebak dan tulis dua keluaran, baru jalankan.

```python
def pilih_terbaik(skor):
    terbaik = None
    for nama in skor:
        if terbaik is None or skor[nama] > skor[terbaik]:
            terbaik = nama
    return terbaik


print(pilih_terbaik({"a": 0.8, "b": 0.85, "c": 0.85}))
print(pilih_terbaik({"a": 0.7}))
```

Tulis juga: bila `b` dan `c` memang sama baik, apakah pantas memilih `b` hanya karena ia disebut lebih dulu?

## Contoh terselesaikan

**Perbandingan yang adil.** Dua model baru layak dibandingkan bila **semua yang lain sama**: data yang sama, pembagian lipatan yang sama, metrik yang sama. Karena kita akan menilai banyak model dengan cara yang sama, tulis satu fungsi: ia menerima model, data, dan lipatan, lalu mengembalikan rata-rata, simpangan, dan skor terendah antar lipatan. Pembanding mayoritas selalu ikut, seperti di `d-xi1-m9`.

```python
import pandas as pd
from sklearn.dummy import DummyClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import StratifiedKFold, cross_val_score
from sklearn.neighbors import KNeighborsClassifier
from sklearn.tree import DecisionTreeClassifier


def buat_data(n):
    baris = []
    for i in range(n):
        ukuran = 10 + (i * 7) % 13  # mm
        berat = 20 + (i * 11) % 17  # mg
        jenis = 1 if ukuran + berat / 2 > 30 else 0
        if i % 13 == 12:  # label sengaja dibalik (derau)
            jenis = 1 - jenis
        baris.append((ukuran, berat, jenis))
    return pd.DataFrame(baris, columns=["ukuran", "berat", "jenis"])


def bandingkan(model, X, y, lipatan):
    skor = cross_val_score(model, X, y, cv=lipatan)
    return {"rata": skor.mean(), "simpangan": skor.std(), "terendah": skor.min()}


df = buat_data(60)
X = df[["ukuran", "berat"]]
y = df["jenis"]
lipatan = StratifiedKFold(n_splits=5, shuffle=True, random_state=0)

calon = {
    "pembanding": DummyClassifier(strategy="most_frequent"),
    "knn5": KNeighborsClassifier(n_neighbors=5),
    "pohon3": DecisionTreeClassifier(max_depth=3, random_state=0),
    "pohon_penuh": DecisionTreeClassifier(random_state=0),
    "logistik": LogisticRegression(max_iter=1000),
}
tabel = pd.DataFrame({nama: bandingkan(m, X, y, lipatan) for nama, m in calon.items()}).T
print(tabel.round(3))
```

```text
              rata  simpangan  terendah
pembanding   0.517      0.033     0.500
knn5         0.850      0.111     0.667
pohon3       0.733      0.082     0.583
pohon_penuh  0.817      0.082     0.667
logistik     0.850      0.111     0.667
```

Baca tabelnya dengan tiga pertanyaan. **Apakah ada yang mengalahkan pembanding?** Ya: pembanding 0,517, semua model di atas 0,73. **Apakah selisihnya lebih besar dari sebaran?** `knn5` dan `logistik` sama-sama 0,85 dengan simpangan 0,111 antar lipatan; `pohon_penuh` 0,817. Selisih 0,033 itu jauh lebih kecil dari simpangan 0,08 sampai 0,11, jadi data ini belum cukup untuk menyatakan satu lebih baik dari yang lain. Hanya `pohon3` (0,733) yang tampak tertinggal, dan itu pun tipis terhadap sebarannya. **Mana yang menang bila skor sama?** Di sinilah alasan lain masuk:

| Pertimbangan | `knn5` | `logistik` |
| --- | --- | --- |
| Skor validasi silang | 0,85 | 0,85 |
| Mudah dijelaskan | harus menyimpan seluruh data latih | beberapa angka koefisien yang bisa dibaca |
| Menebak data baru | menghitung jarak ke data latih | memasukkan angka ke satu rumus |

Dari tabel itu, contoh catatan keputusan yang jujur: "Dipilih `logistik`: skornya sama dengan `knn5` (0,85, simpangan 0,111) pada lima lipatan data karangan 60 baris, tetapi lebih mudah dijelaskan. Belum dibuktikan lebih baik dari `knn5` maupun `pohon_penuh`; perlu data lebih banyak." Catatan ini menyebut angka, alasan, dan batasnya.

## Contoh setengah jadi

Isi bagian `____` supaya fungsi mengembalikan rata-rata dan skor terendah dari daftar skor lipatan.

```python setengah-jadi
def ringkas(skor):
    rata = sum(skor) / ____(skor)
    return {"rata": round(rata, 2), "terendah": ____(skor)}


print(ringkas([0.83, 0.92, 1.0, 0.67, 0.83]))
```

## Soal Parsons

Susun baris menjadi fungsi `selisih` dan pemanggilannya. Lekukan sudah ditulis dan harus dipertahankan; yang diacak hanya urutan barisnya.

```text
    return abs(a - b)
print(round(selisih(0.85, 0.82), 2))
def selisih(a, b):
```

## Latihan

1. **Hitung tangan.** (`AI: tanpa AI`) Model A mendapat skor lima lipatan `[0.8, 0.9, 0.7, 0.8, 0.8]`, model B `[0.9, 0.8, 0.8, 0.8, 0.8]`. Tulis rata-rata dan skor terendah masing-masing, lalu apakah selisihnya cukup untuk menyatakan B lebih baik.
2. **Rancangan dulu, lalu kode.** (`AI: tanpa AI`) Sebelum menjalankan apa pun, tulis kolom tabel perbandingan dan tiga kriteria pemilihan model untuk penggolong biji cacat dari `d-xi1-m10` (sebutkan metrik utama). Lalu tulis fungsi yang mengembalikan recall rata-rata dengan `cross_val_score(..., scoring="recall")`.
3. **Tambah calon.** (`AI: boleh`) Tambahkan `KNeighborsClassifier(n_neighbors=9)` atau pohon dengan `max_depth=5` ke `calon`. Tulis apakah kesimpulan berubah.
4. **Laporan sendiri.** (`AI: boleh`) Buat data sintetis dua kelas buatanmu (aturannya tampak di kode), bandingkan tiga model dengan fungsi `bandingkan`, dan tulis satu paragraf pilihan modelmu: angka, alasan, kelemahan, dan jenis kesalahan yang paling berbahaya.
5. **Catatan pemakaian AI (opsional).** Bila memakai asisten AI, catat alat, tujuan, garis besar perintah, bagian yang dipakai, dan cara memeriksanya.

## Latihan bercampur

1. Dari `d-xi1-m10`: tulis satu alasan mengapa tabel perbandingan sebaiknya memuat recall, bukan hanya ketepatan, bila kelas yang dicari jarang.
2. Dari `d-xi1-m7`: tulis grafik apa untuk menunjukkan rata-rata dan sebaran skor lipatan tiap model, dan apa yang tidak boleh disimpulkan dari batang rata-ratanya saja.

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `d-xi1-m12` (sekitar satu minggu lagi), `d-xi1-m14` (sekitar tiga minggu lagi), dan modul jalur D kelas XI semester 2 pada minggu `D-XI2-M5` (sekitar delapan minggu lagi). Jawab sekarang lalu simpan.

1. Mengapa selisih kecil antar model pada data kecil belum membuktikan pemenang?
2. Sebutkan empat hal yang dibandingkan di tabel perbandingan model.
3. Apa saja yang harus sama agar dua model dibandingkan secara adil?

## Kesalahan umum

- **"Skor tertinggi pasti model terbaik."** Bila selisihnya lebih kecil dari sebaran antar lipatan, urutan itu bisa berbalik dengan data lain.
- **"Bila skor sama, pilih saja yang pertama."** Pilih dengan alasan yang ditulis: kemudahan penjelasan, kecepatan, atau jenis kesalahan.
- **"Boleh membandingkan model dengan pembagian data yang berbeda."** Perbedaan angka bisa berasal dari pembagiannya, bukan dari modelnya; pakai lipatan yang sama.
- **"Model yang lebih rumit pasti lebih baik."** Pohon penuh tidak mengalahkan `knn5` atau `logistik` pada data ini.
- **"Model terbaik di tabel terbaik pula untuk dunia nyata."** Tabel hanya berlaku untuk data ini; data baru dapat mengubah urutannya.

## Cek mandiri

- [ ] Saya dapat menulis fungsi yang menilai model dan mengembalikan ringkasan.
- [ ] Saya membandingkan model pada data, lipatan, dan metrik yang sama.
- [ ] Saya membaca selisih skor terhadap simpangan antar lipatan.
- [ ] Saya menulis alasan memilih model beserta batas kesimpulannya.
- [ ] Saya mencatat pemakaian AI bila saya memakainya.

## Kunci dan petunjuk

**Ingat kembali.** 1: fungsi mudah dipakai ulang dan diuji, hasilnya bergantung pada masukan saja, dan tidak ada efek samping tersembunyi pada variabel di luar. 2: karena hasil bergantung pada datanya; pada data lain kecenderungannya bisa berbeda, jadi diuji lagi. 3: presisi menghitung dari tebakan positif, recall dari yang sungguh positif; recall lebih penting bila melewatkan yang positif lebih merugikan.

**Prediksi dulu.** Keluaran: `b` lalu `a`. Pada `b` dan `c` yang sama, `b` terpilih hanya karena `>` tegas tidak menggantikan yang lebih dulu; itu kebetulan urutan, bukan alasan. Bila keduanya sama baik, pilihan sebaiknya memakai kriteria lain yang ditulis.

**Contoh setengah jadi.** Isian: `len` dan `min`.

```python
def ringkas(skor):
    rata = sum(skor) / len(skor)
    return {"rata": round(rata, 2), "terendah": min(skor)}


print(ringkas([0.83, 0.92, 1.0, 0.67, 0.83]))
```

```text
{'rata': 0.85, 'terendah': 0.67}
```

**Soal Parsons.** Urutan benar:

```python
def selisih(a, b):
    return abs(a - b)
print(round(selisih(0.85, 0.82), 2))
```

```text
0.03
```

Fungsi harus didefinisikan sebelum dipanggil; badan fungsi berlekuk di bawah barisnya.

**Latihan.** 1: A rata-rata 0,8 dan terendah 0,7; B rata-rata 0,82 dan terendah 0,8. Selisih rata-rata hanya 0,02 dan skor tiap lipatan hanya bergeser 0,1 di sana-sini, jadi belum cukup untuk menyatakan B lebih baik; B tampak lebih stabil (terendah 0,8), itu catatan menarik tetapi masih dari lima angka. 2: contoh: kolom: nama model, recall rata-rata, simpangan, terendah, kemudahan penjelasan; kriteria: recall untuk kelas cacat (kesalahan fatal: cacat lolos), stabil antar lipatan, mudah dijelaskan. Kode: `cross_val_score(model, X, y, cv=lipatan, scoring="recall").mean()` di dalam fungsi yang mengembalikannya. 3: dinilai dari tabel yang diperbarui dan kalimat tentang apakah selisih lebih besar dari simpangan. 4: dinilai dari data buatan sendiri, perbandingan pada lipatan yang sama, dan paragraf yang memuat angka, alasan, kelemahan, dan jenis kesalahan berbahaya. 5: opsional.

**Latihan bercampur.** 1: karena pada kelas langka ketepatan bisa tinggi walau tidak menemukan satu pun kelas langka; recall menunjukkannya. 2: batang rata-rata dengan batang galat (rentang antar lipatan) atau titik tiap lipatan, sumbu dari nol; batang rata-rata saja tidak menunjukkan sebaran, jadi selisih kecil antar batang bukan bukti perbedaan.

**Ulang berjarak.** 1: karena sebaran antar lipatan atau pembagian bisa sebesar selisihnya; urutannya bisa berbalik pada data lain. 2: contoh: skor rata-rata, simpangan atau skor terendah, kemudahan dijelaskan, dan jenis kesalahan yang berbahaya (atau kecepatan, atau metrik utama seperti recall). 3: data, pembagian atau lipatan, dan metrik, ditambah pembanding yang sama.

## Langkah berikutnya

Modul berikut: `d-xi1-m12` (kebocoran data dan bias evaluasi), tempat kamu belajar mengenali evaluasi yang tampak bagus tetapi menipu. Bacaan lanjut: panduan pengguna `scikit-learn` tentang validasi silang dan pemilihan model.
