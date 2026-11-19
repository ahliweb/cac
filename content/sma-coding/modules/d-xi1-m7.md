## Untuk siapa modul ini

Modul ini untuk murid kelas XI jalur D (kecerdasan buatan dan analisis data), untuk minggu `D-XI1-M7` silabus v1.3: statistik deskriptif dan grafik. Prasyarat: modul `d-xi1-m6`. Alat: Python 3 dengan pustaka `pandas` dan `matplotlib`, tanpa akun.

Modul ini berstatus DRAF: karangan penyusun, belum ditinjau pemilik. Jalur D adalah pengayaan di luar rumusan capaian pembelajaran (CP). Minggu ini beririsan dengan butir `F-AD-a` (data terbuka dan legal, prediksi) pada tingkat sedang; irisan itu **tidak dihitung** sebagai pemenuhan CP.

Aturan jalur D yang berlaku: data hanya sintetis (karangan) atau terbuka dengan lisensi jelas, tanpa data yang bisa mengenali orang; wajah, suara, dan foto orang tidak dipakai sebagai data; AI generatif boleh dipakai dengan etika dan dicatat, tanpa data pribadi, kata sandi, atau tugas bernilai pada permintaanmu, dan kamu tidak wajib punya akun. Saran: jawab dulu sendiri, baru minta AI memberi petunjuk bertahap; kode buatan AI dibaca, dijalankan, dan diuji. Setiap soal `Latihan` bertanda `AI: boleh` atau `AI: tanpa AI`.

Catatan untuk guru: blok Python dijalankan penyusun dengan `python3 -I` (Python 3.12.3, `pandas` 3.1.1, `matplotlib` 3.11.2, per 2026-11). Berkas gambar `grafik.png` dihasilkan dan dilihat penyusun, dan uraian grafik di bawah mencocokkan gambar itu; gambarnya sendiri tidak disertakan di modul ini. Data waktu muat halaman web fiktif karangan. Latihan grafik dari data terbuka memakai dataset pilihan murid pada `d-xi1-m5`, jadi lisensinya sudah dicatat di sana.

## Ingat kembali

Jawab dari ingatan, baru cek di bagian kunci.

1. Apa tiga pemeriksaan pertama pada tabel yang baru dibaca, dan fungsi `pandas` apa untuk tiap pemeriksaan? (dari `d-xi1-m6`)
2. Apa yang diatur `sep` dan `decimal` pada `pd.read_csv`, dan kapan perlu diubah? (dari `d-xi1-m4`)
3. Grafik apa untuk membandingkan, melihat perubahan, melihat hubungan, dan melihat sebaran? (dari `d-x2-m9`)

## Tujuan

Setelah modul ini kamu dapat:

- merangkum satu kolom angka dengan `describe()`, median, dan modus;
- menjelaskan mengapa rata-rata dapat menyesatkan dan median melengkapinya;
- memilih grafik batang, garis, titik sebar, atau histogram sesuai pertanyaan;
- membuat grafik dengan `matplotlib`, dengan judul, label sumbu, dan sumbu batang dari nol;
- menyebut satu hal yang tidak boleh disimpulkan dari sebuah grafik.

Keluaran yang diminta silabus: grafik dan ringkasan.

## Prediksi dulu

Tebak dan tulis tiga keluaran, baru jalankan.

```python
import pandas as pd

x = pd.Series([1, 2, 3, 100])
print(x.mean())
print(x.median())
print(x.max() - x.min())
```

Tulis juga: bila satu angka ini mewakili waktu tunggu antrean, mana yang lebih jujur: rata-rata atau median?

## Contoh terselesaikan

**Ringkasan dengan angka.** Waktu muat sebuah halaman web fiktif pada 15 pengukuran, dalam detik. Satu pengukuran, 9,8, jauh di atas yang lain.

```python
import pandas as pd

# waktu muat sebuah halaman web fiktif, dalam detik (data karangan)
muat = pd.Series(
    [1.2, 1.4, 1.1, 1.3, 1.5, 1.2, 1.4, 1.3, 1.6, 1.2, 1.3, 1.4, 9.8, 1.2, 1.5],
    name="detik",
)
print(muat.describe().round(2))
print("median:", muat.median())
print("rata-rata tanpa 9.8:", round(muat[muat < 9].mean(), 2))
```

```text
count    15.00
mean      1.89
std       2.19
min       1.10
25%       1.20
50%       1.30
75%       1.45
max       9.80
Name: detik, dtype: float64
```

```text
median: 1.3
rata-rata tanpa 9.8: 1.33
```

(Keluaran asli keduanya berurutan; dipisah di sini supaya tabel `describe` terbaca.) Rata-rata 1,89 detik lebih besar dari hampir semua pengukuran: satu **pencilan** (9,8) menariknya ke atas. Median 1,3 lebih mewakili pengukuran biasa. `describe` menampilkan `count` (banyak data), `mean`, `std` (sebaran), nilai terkecil dan terbesar, dan kuartil (25 persen, median, 75 persen). Jangan membuang 9,8 diam-diam: cari penyebabnya (gangguan jaringan?), putuskan, dan catat, seperti di `d-xi1-m6`.

**Memilih grafik.** Pertanyaan menentukan grafik:

| Pertanyaan | Grafik | `matplotlib` |
| --- | --- | --- |
| membandingkan kategori | batang | `bar` |
| perubahan menurut waktu | garis | `plot` |
| hubungan dua angka | titik sebar | `scatter` |
| sebaran satu angka | histogram | `hist` |

```python
import os

import matplotlib

matplotlib.use("Agg")  # menggambar ke berkas, tanpa jendela
import matplotlib.pyplot as plt
import pandas as pd

df = pd.DataFrame(
    {
        "hari": list(range(1, 11)),
        "ukuran_kb": [120, 150, 180, 200, 240, 260, 300, 340, 380, 420],
        "detik": [1.1, 1.2, 1.4, 1.5, 1.7, 1.8, 2.1, 2.3, 2.5, 2.9],
        "halaman": ["beranda", "profil"] * 5,
    }
)
rata = df.groupby("halaman")["detik"].mean()
print(rata.round(2))

fig, ax = plt.subplots(2, 2, figsize=(8, 6))

ax[0, 0].bar(rata.index, rata.values)  # perbandingan antar kategori
ax[0, 0].set_ylim(bottom=0)  # batang: sumbu mulai dari nol
ax[0, 0].set_title("Rata-rata waktu muat per halaman")
ax[0, 0].set_ylabel("detik")

ax[0, 1].plot(df["hari"], df["detik"], marker="o")  # perubahan menurut waktu
ax[0, 1].set_title("Waktu muat per hari")
ax[0, 1].set_xlabel("hari")
ax[0, 1].set_ylabel("detik")

ax[1, 0].scatter(df["ukuran_kb"], df["detik"])  # hubungan dua angka
ax[1, 0].set_title("Ukuran halaman dan waktu muat")
ax[1, 0].set_xlabel("ukuran (KB)")
ax[1, 0].set_ylabel("detik")

ax[1, 1].hist(df["detik"], bins=5)  # sebaran satu angka
ax[1, 1].set_title("Sebaran waktu muat")
ax[1, 1].set_xlabel("detik")
ax[1, 1].set_ylabel("banyak hari")

fig.tight_layout()
fig.savefig("grafik.png", dpi=100)
print("grafik.png ada:", os.path.exists("grafik.png"))
print("korelasi:", round(df["ukuran_kb"].corr(df["detik"]), 3))
print("matplotlib", matplotlib.__version__)
```

```text
halaman
beranda    1.76
profil     1.94
Name: detik, dtype: float64
grafik.png ada: True
korelasi: 0.996
matplotlib 3.11.2
```

Buka `grafik.png`. Batang beranda dan profil hampir sama tinggi dan sumbunya mulai dari nol, jadi selisih 1,76 dan 1,94 tampak kecil sebagaimana adanya. Garis naik dari 1,1 ke 2,9 detik selama sepuluh hari. Titik sebar hampir membentuk garis lurus naik. Histogram menunjukkan waktu paling sering di sekitar 1,1 sampai 1,8 detik.

**Yang tidak boleh disimpulkan.** Korelasi 0,996 hanya menyatakan ukuran halaman dan waktu muat naik bersama. Itu **bukan bukti sebab**: pada data ini keduanya juga naik menurut hari, sehingga faktor ketiga (misalnya semakin banyak isi ditambahkan tiap hari) bisa menjelaskan keduanya. Ini juga data karangan, jadi bukan bukti tentang halaman web nyata.

## Contoh setengah jadi

Isi bagian `____` supaya program mencetak median, lalu menggambar batang dengan sumbu dimulai dari nol.

```python setengah-jadi
import matplotlib

matplotlib.use("Agg")
import matplotlib.pyplot as plt
import pandas as pd

nilai = pd.Series([6, 7, 7, 8, 9, 10, 2])
print(nilai.____())

plt.____(["A", "B"], [5, 7])
plt.ylim(____, 8)
plt.savefig("batang.png")
print("tersimpan")
```

## Soal Parsons

Susun baris menjadi program yang menggambar histogram dan menyimpannya. Lekukan tidak dipakai; yang diacak hanya urutannya. Baris `matplotlib.use("Agg")` harus berada sebelum `import matplotlib.pyplot`.

```text
plt.savefig("sebaran.png")
import pandas as pd
plt.xlabel("nilai")
matplotlib.use("Agg")
s = pd.Series([2, 3, 3, 4, 4, 4, 5])
import matplotlib
import matplotlib.pyplot as plt
plt.hist(s, bins=4)
print("selesai")
```

## Latihan

1. **Hitung tangan.** (`AI: tanpa AI`) Untuk `[2, 3, 3, 4, 4, 4, 5]`, tulis rata-rata, median, dan modus (nilai yang paling sering). Cocokkan dengan `pandas`.
2. **Pilih grafik.** (`AI: tanpa AI`) Tulis dulu grafik yang kamu pilih, baru jalankan: (a) rata-rata nilai tiga kelompok fiktif, (b) suhu tiap jam selama sehari, (c) tinggi dan berat tanaman uji, (d) sebaran lama tidur 30 hari.
3. **Dari data terbuka.** (`AI: boleh`) Ambil dataset pilihanmu di `d-xi1-m5` (CSV), bersihkan seperlunya, lalu buat satu histogram dan satu titik sebar. Tulis dua kalimat temuan dan satu hal yang tidak boleh disimpulkan, dan sertakan catatan sumber di bawah grafik.
4. **Perbaiki grafik.** (`AI: boleh`) Grafik batang fiktif membandingkan nilai 95 dan 98 dengan sumbu dimulai dari 90, sehingga batang kedua tampak sekitar 1,6 kali lebih tinggi (8 dibanding 5 satuan di atas 90). Gambar ulang dengan sumbu dari nol dan tulis apa yang berubah.
5. **Catatan pemakaian AI (opsional).** Bila memakai asisten AI, catat alat, tujuan, garis besar perintah, bagian yang dipakai, dan cara memeriksanya.

## Latihan bercampur

1. Dari `d-xi1-m6`: `pd.Series([1, 2, None, 4]).describe()` menampilkan `count` berapa dan `mean` berapa, dan apa artinya bagi nilai yang hilang?
2. Dari `d-xi1-m5`: tulis satu kalimat keterangan sumber untuk grafik dari dataset *Iris* (judul, pencipta, lisensi) yang akan kamu tempel di laporan.

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `d-xi1-m8` (sekitar satu minggu lagi), `d-xi1-m10` (sekitar tiga minggu lagi), dan `d-xi1-m13` (sekitar enam minggu lagi). Jawab sekarang lalu simpan.

1. Mengapa rata-rata bisa menyesatkan, dan apa pelengkapnya?
2. Grafik apa untuk melihat hubungan dua angka, dan apa yang tidak boleh disimpulkan dari hubungan itu?
3. Mengapa sumbu grafik batang harus mulai dari nol?

## Kesalahan umum

- **"Rata-rata cukup untuk merangkum."** Pencilan menggeser rata-rata; lengkapi dengan median dan sebaran, atau tunjukkan titik datanya.
- **"Korelasi tinggi berarti yang satu menyebabkan yang lain."** Keduanya bisa dipengaruhi faktor ketiga atau kebetulan; korelasi bukan bukti sebab.
- **"Sumbu batang boleh dipotong supaya perbedaan terlihat."** Panjang batang mewakili besar nilai; sumbu dipotong membuat selisih kecil tampak besar.
- **"Grafik yang indah pasti benar."** Judul, label sumbu, satuan, dan sumber harus ada; tanpa itu pembaca menebak.
- **"`describe` sudah memuat semua."** Ia tidak menunjukkan bentuk sebaran atau pencilan secara visual; gambar histogramnya juga.

## Cek mandiri

- [ ] Saya dapat membaca keluaran `describe()` dan membandingkan rata-rata dengan median.
- [ ] Saya dapat memilih grafik sesuai pertanyaan.
- [ ] Saya membuat grafik berjudul, berlabel sumbu, dan batang dari nol.
- [ ] Saya menulis satu hal yang tidak boleh disimpulkan dari grafikku.
- [ ] Saya mencatat pemakaian AI bila saya memakainya.

## Kunci dan petunjuk

**Ingat kembali.** 1: nilai hilang (`isna().sum()`), duplikat (`duplicated().sum()`), dan nilai di luar rentang (perbandingan seperti `df["x"] > batas`). 2: `sep` mengatur pemisah kolom, `decimal` tanda desimal; ubah bila berkas memakai `;` dan koma desimal. 3: batang untuk membandingkan, garis untuk perubahan, titik sebar untuk hubungan, histogram atau kotak-garis untuk sebaran.

**Prediksi dulu.** Keluaran: `26.5`, `2.5`, `99`. Satu angka 100 menarik rata-rata jauh ke atas, sedangkan median hanya bergeser sedikit. Untuk waktu tunggu antrean, median lebih jujur menggambarkan kebanyakan orang, tetapi rata-rata dan nilai terbesar tetap dilaporkan bila nilai ekstrem penting.

**Contoh setengah jadi.** `median`, `bar`, `0`. Keluaran: `7.0` lalu `tersimpan`; median 7 karena nilai urut 2, 6, 7, 7, 8, 9, 10 dan yang tengah 7.

**Soal Parsons.** Urutan benar:

```python
import matplotlib

matplotlib.use("Agg")
import matplotlib.pyplot as plt
import pandas as pd

s = pd.Series([2, 3, 3, 4, 4, 4, 5])
plt.hist(s, bins=4)
plt.xlabel("nilai")
plt.savefig("sebaran.png")
print("selesai")
```

Keluaran `selesai`. Backend dipilih sebelum `pyplot` diimpor; judul dan label ditambahkan sebelum menyimpan, karena yang tersimpan hanya yang sudah digambar.

**Latihan.** 1: rata-rata 25 / 7 = 3,57; median 4; modus 4; `pandas` memberi `3.57 4.0 [4]`. 2: (a) batang; (b) garis; (c) titik sebar; (d) histogram. 3: dinilai dari data yang dibersihkan dan dicatat, grafik berjudul dan berlabel, catatan sumber, dua temuan, dan satu batasan kesimpulan (misalnya korelasi bukan sebab). 4: dengan sumbu dari nol (`plt.ylim(0, 100)` misalnya), batang 98 hanya sedikit lebih tinggi dari 95, selisih 3, kira-kira 3 persen, bukan 1,6 kali lipat. 5: opsional.

**Latihan bercampur.** 1: `count` 3.0 dan `mean` 2.33; `describe` melewati nilai hilang, jadi rata-rata dari tiga nilai (1, 2, 4), bukan empat. 2: contoh: `Data: "Iris" oleh Fisher, R. (1936), UCI Machine Learning Repository, CC BY 4.0.`

**Ulang berjarak.** 1: pencilan menggeser rata-rata; lengkapi dengan median dan sebaran atau titik datanya. 2: titik sebar; korelasi bukan bukti sebab (faktor ketiga atau kebetulan bisa menjelaskan). 3: karena panjang batang mewakili besar nilai; sumbu dipotong membuat selisih kecil tampak besar.

## Langkah berikutnya

Modul berikut: `d-xi1-m8` (prediksi sederhana), tempat kamu memakai data bersih untuk memprediksi dan mengukur galat. Bacaan lanjut: panduan singkat `matplotlib` pada dokumentasi resminya.
