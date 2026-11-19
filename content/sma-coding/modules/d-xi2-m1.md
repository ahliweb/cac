## Untuk siapa modul ini

Modul ini untuk murid kelas XI jalur D (kecerdasan buatan dan analisis data), untuk minggu `D-XI2-M1` silabus v1.3: pengelompokan dengan Python, yaitu memakai k-means dan menafsirkan kelompok. Prasyarat: modul `d-xi1-m7` (statistik dan grafik) dan `d-x2-m8` (pengelompokan di Orange), serta materi `D-XI1-M12` (kebocoran data dan pengubahan skala) yang belum ada di indeks. Alat: Python 3 dengan pustaka `pandas` dan `scikit-learn`, tanpa akun.

Modul ini berstatus DRAF: karangan penyusun, belum ditinjau pemilik. Jalur D adalah pengayaan di luar rumusan capaian pembelajaran (CP); minggu ini tidak punya irisan pengayaan, jadi modul ini tidak dihitung memenuhi butir CP mana pun.

Aturan jalur D yang berlaku: data hanya sintetis (karangan) atau terbuka dengan lisensi jelas, tanpa data yang bisa mengenali orang; wajah, suara, dan foto orang tidak dipakai sebagai data; AI generatif boleh dipakai dengan etika dan dicatat, tanpa data pribadi, kata sandi, atau tugas bernilai pada permintaanmu, dan kamu tidak wajib punya akun. Saran: jawab dulu sendiri, baru minta AI memberi petunjuk bertahap; kode buatan AI dibaca, dijalankan, dan diuji. Setiap soal `Latihan` bertanda `AI: boleh` atau `AI: tanpa AI`.

Catatan untuk guru: blok Python dijalankan penyusun dengan `python3 -I` (Python 3.14.6, `pandas` 3.1.1, `scikit-learn` 1.9.1, per 2026-11) dan keluarannya ditempel apa adanya; yang dinyatakan hanya "bisa dijalankan dengan keluaran ini", bukan "benar untuk semua masukan". Data "pelanggan kios" dibangkitkan oleh `buat_data` dari tiga kelompok tersembunyi; kode `P01` dan seterusnya hanya nomor urut. Versi pustaka lain dapat memberi angka berbeda.

## Ingat kembali

Jawab dari ingatan, baru cek di bagian kunci.

1. Sebutkan langkah k-means: pusat awal, penetapan, pusat baru, dan kapan berhenti. (dari `d-x2-m8`)
2. Mengapa pengubahan skala dipasang pada data latih saja? (dari `D-XI1-M12`)
3. Mengapa sumbu grafik batang harus mulai dari nol? (dari `D-XI1-M7`)
4. Mengapa keputusan membuang atau mengisi nilai hilang harus dicatat bersama jumlah baris yang terkena? (dari `D-XI1-M6`)

## Tujuan

Setelah modul ini kamu dapat:

- menjalankan `KMeans` dari `scikit-learn` pada tabel fitur dan membaca pusat serta anggota kelompok;
- menjelaskan mengapa fitur dengan angka besar mendominasi jarak, dan mengubah skala dengan `StandardScaler` sebelum mengelompokkan;
- memilih jumlah kelompok k dengan skor siluet, tanpa menganggap angka itu pasti benar;
- menempatkan data baru ke kelompok yang ada dengan `predict` setelah skala yang sama dipakai;
- menafsirkan kelompok lewat rata-rata dan menyebut apa yang tidak boleh disimpulkan.

Keluaran yang diminta silabus: skrip pengelompokan (kelompokkan data sintetis).

## Prediksi dulu

Tebak dan tulis keluarannya, baru jalankan. Empat titik satu dimensi dibagi dua kelompok.

```python
from sklearn.cluster import KMeans

X = [[1], [2], [9], [11]]
model = KMeans(n_clusters=2, n_init=10, random_state=0).fit(X)
print(sorted(model.cluster_centers_.ravel().round(1).tolist()))
print(len(set(model.labels_)))
```

Tulis juga: mengapa `fit(X)` tidak punya kolom jawaban `y`.

## Contoh terselesaikan

**Dari tabel ke kelompok.** Tabel pelanggan kios karangan punya dua fitur: `kunjungan` (kali per bulan) dan `belanja` (ribu rupiah). Tidak ada label: k-means mengulang tiga langkah yang kamu kenal dari `d-x2-m8`, yaitu menetapkan tiap titik ke pusat terdekat, menghitung pusat baru sebagai rata-rata anggota, dan berhenti bila penetapan tidak berubah. Jaraknya jarak Euclid, sehingga **fitur yang angkanya besar menyumbang paling banyak**. Dua pelanggan `P01` (3 kunjungan, 40 ribu) dan `P04` (6 kunjungan, 64 ribu) berselisih 3 pada kunjungan dan 24 pada belanja; jarak kuadratnya 3² + 24² = 585, dan 576 dari 585 (sekitar 98 persen) berasal dari belanja. Karena itu fitur diubah skalanya dulu: `StandardScaler` mengurangi rata-rata kolom lalu membaginya dengan simpangan baku, sehingga tiap kolom setara.

Program berikut membandingkan data mentah dan berskala untuk k dari 2 sampai 5 dengan **skor siluet** (makin tinggi makin terpisah kelompoknya), meringkas kelompok, dan menempatkan dua pelanggan baru.

```python
import pandas as pd
import sklearn
from sklearn.cluster import KMeans
from sklearn.metrics import silhouette_score
from sklearn.preprocessing import StandardScaler


def buat_data(n):
    baris = []
    for i in range(n):
        g = i % 3  # kelompok tersembunyi, tidak diberikan ke k-means
        kunjungan = [3, 8, 15][g] + (i * 5) % 4  # kali per bulan
        belanja = [40, 120, 70][g] + (i * 7) % 13 * 3  # ribu rupiah
        baris.append((f"P{i + 1:02d}", kunjungan, belanja))
    return pd.DataFrame(baris, columns=["kode", "kunjungan", "belanja"])


df = buat_data(30)
print(df.head(4))
X = df[["kunjungan", "belanja"]]
skala = StandardScaler().fit(X)
X_skala = skala.transform(X)

for k in range(2, 6):
    mentah = KMeans(n_clusters=k, n_init=10, random_state=0).fit(X)
    baku = KMeans(n_clusters=k, n_init=10, random_state=0).fit(X_skala)
    print(
        k,
        round(silhouette_score(X, mentah.labels_), 3),
        round(silhouette_score(X_skala, baku.labels_), 3),
    )

model = KMeans(n_clusters=3, n_init=10, random_state=0).fit(X_skala)
df["kelompok"] = model.labels_
print(df.groupby("kelompok")[["kunjungan", "belanja"]].agg(["count", "mean"]).round(1))
baru = pd.DataFrame({"kunjungan": [4, 14], "belanja": [45, 95]})
print(model.predict(skala.transform(baru)))
print("scikit-learn", sklearn.__version__)
```

```text
  kode  kunjungan  belanja
0  P01          3       40
1  P02          9      141
2  P03         17       73
3  P04          6       64
2 0.634 0.57
3 0.563 0.747
4 0.535 0.631
5 0.506 0.505
         kunjungan       belanja
             count  mean   count   mean
kelompok
0               10   9.3      10  135.9
1               10   4.5      10   58.3
2               10  16.5      10   87.4
[1 2]
scikit-learn 1.9.1
```

Baca hasilnya. Pada data **mentah**, siluet tertinggi ada pada k = 2 (0,634), karena belanja menguasai jarak; pada data **berskala**, k = 3 menang jelas (0,747). Tiga kelompok masing-masing 10 pelanggan: kelompok 0 berkunjung menengah tetapi belanjanya terbesar (rata-rata 9,3 kunjungan dan 135,9 ribu), kelompok 1 jarang berkunjung dengan belanja kecil (4,5 dan 58,3 ribu), kelompok 2 paling sering berkunjung dengan belanja menengah (16,5 dan 87,4 ribu). Dua pelanggan baru ditempatkan ke kelompok 1 dan kelompok 2 sesuai dugaan. Perhatikan urutannya: skala **dipelajari dari tabel yang ada** (`fit`), lalu hanya dipakai (`transform`) pada data baru. Tiga hal yang perlu diingat: nomor kelompok hanyalah penanda yang bisa tertukar; nama seperti "pelanggan setia" kita yang menempelkan, komputer tidak membuktikannya; dan siluet membantu memilih k, tetapi tidak menjamin kelompok itu bermakna.

## Contoh setengah jadi

Isi bagian `____` supaya program membuat dua kelompok dari empat titik, mencetak pusatnya, dan menempatkan dua titik baru.

```python setengah-jadi
from sklearn.cluster import KMeans

X = [[1, 1], [2, 1], [8, 9], [9, 8]]
model = KMeans(n_clusters=____, n_init=10, random_state=0)
model.____(X)
print(sorted(model.cluster_centers_.tolist()))
baru = model.____([[2, 2], [8, 8]])
print(baru[0] == model.labels_[0], baru[1] == model.labels_[2])
```

## Soal Parsons

Susun baris menjadi program yang mengelompokkan lima titik menjadi dua kelompok lalu mencetak pusatnya dari yang terkecil. Lekukan tidak dipakai; yang diacak hanya urutannya.

```text
print(sorted(model.cluster_centers_.ravel().tolist()))
model = KMeans(n_clusters=2, n_init=10, random_state=0)
X = [[1], [2], [9], [10], [11]]
model.fit(X)
from sklearn.cluster import KMeans
```

## Latihan

1. **Satu putaran di kertas.** (`AI: tanpa AI`) Titik satu dimensi 1, 2, 6, 7, 12 dengan k = 2 dan pusat awal 1 dan 12. Tulis penetapan tiap titik, pusat baru, putaran berikutnya, dan kapan berhenti.
2. **Rancangan dulu, lalu kode.** (`AI: tanpa AI`) Tulis pseudocode untuk memilih k dari 2 sampai 5 pada data berskala memakai siluet, lalu programnya untuk `buat_data(45)`. Mengapa `n_init=10` dipakai dan bukan satu kali jalan?
3. **Skala menentukan.** (`AI: boleh`) Jalankan pengelompokan k = 3 pada data mentah dan data berskala, lalu hitung dua jumlah: berapa pelanggan yang berpindah kelompok antara kedua cara, dan kelompok mana yang berubah. Tulis satu kalimat tentang apa yang terjadi bila belanja ditulis dalam rupiah dan bukan ribu rupiah.
4. **Tafsirkan.** (`AI: boleh`) Dari tabel ringkasan, beri tiap kelompok nama pendek dan tulis dua hal yang **tidak boleh** disimpulkan (mis. sebab, atau bahwa kelompok itu "jenis" orang).
5. **Catatan pemakaian AI (opsional).** Bila memakai asisten AI, catat alat, tujuan, garis besar perintah, bagian yang dipakai, dan cara memeriksanya.

## Latihan bercampur

1. Dari `D-XI1-M6`: kolom `belanja` pada tabel punya satu nilai hilang (`NaN`) dan `fit` menolaknya. Tulis dua penanganan dan apa yang dicatat untuk masing-masing.
2. Dari `D-XI1-M7`: grafik apa yang cocok untuk hasil pengelompokan dua fitur, dan bagaimana kelompok dibedakan tanpa hanya warna?

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `d-xi2-m2` (sekitar satu minggu lagi), `d-xi2-m4` (sekitar tiga minggu lagi), dan `D-XI2-M9` (sekitar delapan minggu lagi). Jawab sekarang lalu simpan.

1. Mengapa nama kelompok hasil k-means, misalnya "pelanggan setia", tidak membuktikan jenis yang sebenarnya?
2. Mengapa fitur dengan angka besar bisa menguasai jarak, dan bagaimana mengatasinya?
3. Mengapa k-means dijalankan beberapa kali (`n_init`), dan bagaimana memilih k?

## Kesalahan umum

- **"Nomor kelompok 0 itu yang paling penting."** Nomor hanya penanda dan bisa tertukar; yang bermakna adalah ringkasan isinya.
- **"Skor siluet tertinggi pasti k yang benar."** Ia ukuran keterpisahan; k yang bermakna bagi masalahmu bisa lain, dan data berbeda memberi skor berbeda.
- **"Skala boleh dihitung ulang dari data baru."** Skala berasal dari tabel yang dipakai membuat model; data baru hanya di-`transform`.
- **"K-means menemukan jenis yang sebenarnya."** Ia hanya membagi titik menurut jarak; jenis dan sebab harus dibuktikan dengan cara lain.

## Cek mandiri

- [ ] Saya dapat menyebut tiga langkah k-means dan kapan ia berhenti.
- [ ] Saya dapat menjelaskan mengapa data diubah skalanya sebelum dikelompokkan.
- [ ] Saya dapat memakai `KMeans`, `fit`, `predict`, dan `StandardScaler` berurutan.
- [ ] Saya dapat memilih k dengan siluet dan menyebut batasnya.
- [ ] Saya dapat menyebut hal yang tidak boleh disimpulkan dari kelompok.
- [ ] Saya mencatat pemakaian AI bila saya memakainya.

## Kunci dan petunjuk

**Ingat kembali.** 1: pilih k pusat awal; tetapkan tiap titik ke pusat terdekat; hitung pusat baru sebagai rata-rata anggota; ulangi sampai penetapan tidak berubah. 2: supaya data uji tidak ikut menentukan rata-rata dan simpangan; skala dipelajari dari data latih lalu dipakai pada data lain. 3: karena sumbu yang dipotong membuat selisih tampak jauh lebih besar dari yang sebenarnya. 4: supaya orang lain tahu perubahan apa yang terjadi pada data dan berapa baris yang terkena.

**Prediksi dulu.** Keluaran: `[1.5, 10.0]` dan `2`. Kelompoknya {1, 2} berpusat 1,5 dan {9, 11} berpusat 10,0. `fit(X)` tidak punya `y` karena pengelompokan tanpa label: algoritma hanya melihat jarak antar titik.

**Contoh setengah jadi.** Isian: `2`, `fit`, `predict`.

```python
from sklearn.cluster import KMeans

X = [[1, 1], [2, 1], [8, 9], [9, 8]]
model = KMeans(n_clusters=2, n_init=10, random_state=0)
model.fit(X)
print(sorted(model.cluster_centers_.tolist()))
baru = model.predict([[2, 2], [8, 8]])
print(baru[0] == model.labels_[0], baru[1] == model.labels_[2])
```

```text
[[1.5, 1.0], [8.5, 8.5]]
True True
```

**Soal Parsons.** Urutan benar:

```python
from sklearn.cluster import KMeans
X = [[1], [2], [9], [10], [11]]
model = KMeans(n_clusters=2, n_init=10, random_state=0)
model.fit(X)
print(sorted(model.cluster_centers_.ravel().tolist()))
```

```text
[1.5, 10.0]
```

Impor lebih dulu, data, model dibuat, `fit`, lalu cetak. Kelompoknya {1, 2} dan {9, 10, 11}.

**Latihan.** 1: putaran 1: 1 dan 2 dekat pusat 1; 6 berjarak 5 dari pusat 1 dan 6 dari pusat 12, jadi masuk kelompok 1; 7 berjarak 6 dan 5, jadi masuk kelompok 2; 12 masuk kelompok 2. Pusat baru: (1 + 2 + 6) / 3 = 3 dan (7 + 12) / 2 = 9,5. Putaran 2: 6 berjarak 3 dari 3 dan 3,5 dari 9,5, tetap kelompok 1; 7 berjarak 4 dan 2,5, tetap kelompok 2. Tidak ada yang berubah, jadi berhenti dengan {1, 2, 6} dan {7, 12}. 2: pseudocode: (1) bangun tabel, (2) skala, (3) untuk k dari 2 sampai 5 jalankan `KMeans` dan hitung siluet, (4) pilih k bersiluet tertinggi, (5) ringkas kelompok. `n_init=10` menjalankan beberapa pusat awal dan menyimpan yang terbaik, karena satu pusat awal yang buruk dapat memberi kelompok yang jelek (seperti yang ditunjukkan di `d-x2-m8`). Pada `buat_data(45)` siluet berskala untuk k = 2, 3, 4, 5 berturut-turut 0,586; 0,753; 0,647; 0,515, jadi k = 3. 3: pada hitungan penyusun, k = 3 mentah memberi kelompok berukuran 10, 12, dan 8, sedangkan berskala memberi 10, 10, dan 10; dua pelanggan berpindah, dan yang berubah adalah kelompok belanja menengah dan belanja rendah (kelompok belanja terbesar sama). Bila belanja ditulis dalam rupiah penuh, angkanya 1000 kali lebih besar sehingga hampir seluruh jarak berasal dari belanja dan kunjungan nyaris tidak berpengaruh. 4: contoh nama: "jarang dan hemat", "menengah tetapi royal", "sering dan sedang"; tidak boleh disimpulkan: alasan mereka berbelanja, atau bahwa kelompok itu jenis orang yang tetap. 5: opsional.

**Latihan bercampur.** 1: (a) buang baris itu, catat bahwa satu dari 30 baris dibuang; (b) isi dengan median kolom, catat nilai pengisi dan jumlah baris yang terkena. 2: diagram sebar (scatter) dua fitur; bedakan kelompok dengan bentuk penanda atau label di samping warna agar terbaca oleh yang sulit membedakan warna.

**Ulang berjarak.** 1: karena nama itu tambahan kita; k-means hanya mengelompokkan menurut jarak pada fitur yang diberikan. 2: karena jarak Euclid menjumlahkan selisih kuadrat, sehingga kolom berangka besar menguasai; ubah skala dengan `StandardScaler`. 3: karena hasilnya bergantung pada pusat awal, jadi dijalankan beberapa kali dan yang terbaik disimpan; k dipilih dengan ukuran seperti siluet dan dengan memeriksa apakah isi kelompok masuk akal.

## Langkah berikutnya

Modul berikut: `d-xi2-m2` (pohon keputusan dan ensambel), yang kembali ke data berlabel. Bacaan lanjut: bagian pengelompokan pada panduan pengguna `scikit-learn`.
