## Untuk siapa modul ini

Modul ini untuk murid kelas XI jalur D (kecerdasan buatan dan analisis data), untuk minggu `D-XI1-M4` silabus v1.3: membaca berkas tabel (CSV). Prasyarat: modul `d-xi1-m3`. Alat: Python 3 dan pustaka `pandas`, tanpa akun. Pemasangan `pandas` mengikuti petunjuk guru atau dokumentasi resminya.

Modul ini berstatus DRAF: karangan penyusun, belum ditinjau pemilik. Jalur D adalah pengayaan di luar rumusan capaian pembelajaran (CP). Minggu ini beririsan dengan butir `F-AP-d` (memakai library untuk model) pada tingkat rendah, hanya karena alatnya pemrograman dan pustaka; irisan itu **tidak dihitung** sebagai pemenuhan CP.

Aturan jalur D yang berlaku: data hanya sintetis (karangan) atau terbuka dengan lisensi jelas, tanpa data yang bisa mengenali orang; wajah, suara, dan foto orang tidak dipakai sebagai data; AI generatif boleh dipakai dengan etika dan dicatat, tanpa data pribadi, kata sandi, atau tugas bernilai pada permintaanmu, dan kamu tidak wajib punya akun. Saran: jawab dulu sendiri, baru minta AI memberi petunjuk bertahap; kode buatan AI dibaca, dijalankan, dan diuji. Setiap soal `Latihan` bertanda `AI: boleh` atau `AI: tanpa AI`.

Catatan untuk guru: blok Python dijalankan penyusun dengan `python3 -I` (Python 3.12.3, `pandas` 3.1.1, per 2026-11) di folder kosong; keluaran ditempel apa adanya. Pada `pandas` 3, kolom teks tampil bertipe `str`; pada versi lama tampil `object`, jadi keluaran muridmu bisa sedikit berbeda. Data `hujan_contoh.csv` karangan penyusun. Contoh berkas titik koma meniru berkas yang diekspor program spreadsheet berpengaturan bahasa Indonesia, tetapi isinya karangan.

## Ingat kembali

Jawab dari ingatan, baru cek di bagian kunci.

1. Apa beda daftar dan kamus, dan kapan memakai masing-masing? (dari `d-xi1-m3`)
2. Mengapa rencana proyek menyebut siapa yang terkena bila model salah, sebelum model dibuat? (dari `d-xi1-m1`)
3. Apa beda fungsi yang `print` dan fungsi yang `return`? (dari `d-xi1-m3`)

## Tujuan

Setelah modul ini kamu dapat:

- menulis dan membaca berkas CSV dengan modul `csv` bawaan Python;
- membaca CSV menjadi tabel dengan `pandas.read_csv` dan memeriksa bentuk serta tipe kolomnya;
- menyaring baris dan menulis hasilnya ke berkas baru;
- mengenali berkas yang memakai pemisah titik koma dan koma desimal.

Keluaran yang diminta silabus: skrip berkas.

## Prediksi dulu

Teks CSV kecil dibaca dengan `csv.DictReader`. Tebak dan tulis tiga keluaran sebelum menjalankan.

```python
import csv
import io

teks = "nama,nilai\nA,10\nB,20\n"
baris = list(csv.DictReader(io.StringIO(teks)))
print(len(baris))
print(baris[1]["nilai"] + baris[0]["nilai"])
print(int(baris[1]["nilai"]) + int(baris[0]["nilai"]))
```

## Contoh terselesaikan

**CSV** adalah teks biasa: satu baris per record, nilai dipisah koma, baris pertama berisi nama kolom. Mulai dengan menulis berkas karangan `hujan_contoh.csv`.

```python
import csv

baris = [
    ["tanggal", "stasiun", "curah_mm", "suhu_c"],
    ["2026-01-01", "Stasiun A", 12, 27.5],
    ["2026-01-02", "Stasiun A", 0, 28.1],
    ["2026-01-03", "Stasiun A", 30, 26.4],
    ["2026-01-01", "Stasiun B", 4, 29.0],
    ["2026-01-02", "Stasiun B", 0, 29.6],
    ["2026-01-03", "Stasiun B", 1, 29.3],
]

with open("hujan_contoh.csv", "w", newline="", encoding="utf-8") as f:
    csv.writer(f).writerows(baris)

print("selesai menulis")
```

```text
selesai menulis
```

`with` menutup berkas otomatis; `newline=""` dan `encoding="utf-8"` mencegah baris kosong ekstra dan huruf rusak. Sekarang bacalah dengan modul `csv`:

```python
import csv

with open("hujan_contoh.csv", newline="", encoding="utf-8") as f:
    isi = list(csv.DictReader(f))

print(len(isi), "baris")
print(isi[0])
print(type(isi[0]["curah_mm"]))

total = 0
for baris in isi:
    total = total + float(baris["curah_mm"])
print("total curah:", total)
```

```text
6 baris
{'tanggal': '2026-01-01', 'stasiun': 'Stasiun A', 'curah_mm': '12', 'suhu_c': '27.5'}
<class 'str'>
total curah: 47.0
```

Perhatikan: modul `csv` mengembalikan **semua nilai sebagai teks**, sehingga angka harus diubah dengan `float()` atau `int()` (lihat prediksi tadi). Dengan `pandas`, tabel dibaca sekali jalan dan tipe angka ditebak:

```python
import pandas as pd

print("pandas", pd.__version__)
df = pd.read_csv("hujan_contoh.csv")
print(df.shape)
print(df.dtypes)
print(df.head(3))

basah = df[df["curah_mm"] > 0]
print(len(basah), "baris hujan")
basah.to_csv("hujan_basah.csv", index=False)
print(open("hujan_basah.csv", encoding="utf-8").read(), end="")
```

```text
pandas 3.1.1
(6, 4)
tanggal         str
stasiun         str
curah_mm      int64
suhu_c      float64
dtype: object
      tanggal    stasiun  curah_mm  suhu_c
0  2026-01-01  Stasiun A        12    27.5
1  2026-01-02  Stasiun A         0    28.1
2  2026-01-03  Stasiun A        30    26.4
4 baris hujan
tanggal,stasiun,curah_mm,suhu_c
2026-01-01,Stasiun A,12,27.5
2026-01-03,Stasiun A,30,26.4
2026-01-01,Stasiun B,4,29.0
2026-01-03,Stasiun B,1,29.3
```

`df[df["curah_mm"] > 0]` menyaring baris yang syaratnya benar. `index=False` mencegah nomor baris ikut tertulis sebagai kolom. Berkas **mentah** `hujan_contoh.csv` tidak ditimpa; hasil olahan masuk berkas baru, sehingga kamu selalu bisa kembali ke data asli.

**Berkas titik koma.** Program spreadsheet berpengaturan bahasa Indonesia sering mengekspor CSV dengan pemisah `;` dan koma sebagai desimal (`27,5`). Bila dibaca dengan pengaturan bawaan, seluruh baris menjadi satu kolom:

```python
import io

import pandas as pd

teks = "stasiun;curah_mm;suhu_c\nStasiun A;12;27,5\nStasiun B;4;29,0\n"

salah = pd.read_csv(io.StringIO(teks))
print(salah.shape)
print(salah.columns.tolist())

benar = pd.read_csv(io.StringIO(teks), sep=";", decimal=",")
print(benar.shape)
print(benar["suhu_c"].dtype)
print(benar["suhu_c"].mean())
```

```text
(2, 1)
['stasiun;curah_mm;suhu_c']
(2, 3)
float64
28.25
```

Tanda bahaya: `shape` yang hanya satu kolom, atau nama kolom yang memuat `;`.

## Contoh setengah jadi

Isi bagian `____` untuk menyaring `Stasiun A`, menghitung rata-rata curahnya, dan menyimpannya tanpa nomor baris. Berkas `hujan_contoh.csv` dari contoh sudah ada.

```python setengah-jadi
import pandas as pd

df = pd.read_csv("hujan_contoh.csv")
a = df[df["stasiun"] == ____]
print(a["curah_mm"].____())
a.to_csv("stasiun_a.csv", index=____)
print(open("stasiun_a.csv", encoding="utf-8").read(), end="")
```

## Soal Parsons

Susun baris menjadi program yang menyimpan baris berhujan ke `hujan_basah.csv` dan mencetak banyaknya. Lekukan tidak dipakai di sini; yang diacak hanya urutannya.

```text
print(len(basah))
basah.to_csv("hujan_basah.csv", index=False)
import pandas as pd
df = pd.read_csv("hujan_contoh.csv")
basah = df[df["curah_mm"] > 0]
```

## Latihan

1. **Dengan `csv`.** (`AI: tanpa AI`) Baca `hujan_contoh.csv` dengan `csv.DictReader` dan hitung total curah `Stasiun B`. Hati-hati dengan tipe nilainya.
2. **Pseudocode dulu.** (`AI: tanpa AI`) Tulis langkah dalam kata untuk menghitung berapa baris yang bersuhu di atas 28 derajat, lalu tulis dengan `pandas`.
3. **Berkas sendiri.** (`AI: boleh`) Tulis berkas CSV karangan lima baris (misalnya kelembapan tanaman), baca dengan `pandas`, saring satu syarat, dan tulis hasilnya ke berkas baru.
4. **Titik koma.** (`AI: boleh`) Dari teks `"kota;suhu\nKota X;30,5\nKota Y;28,0\n"`, baca dengan pengaturan yang benar dan cetak rata-rata suhu.
5. **Catatan pemakaian AI (opsional).** Bila memakai asisten AI, catat alat, tujuan, garis besar perintah, bagian yang dipakai, dan cara memeriksanya.

## Latihan bercampur

1. Dari `d-xi1-m3`: pada baris yang dibaca `csv.DictReader`, buat kamus cacah baris per stasiun dengan `.get`.
2. Dari `d-xi1-m1`: pada bagian Data rencana proyek, tulis dua pemeriksaan yang bisa langsung dilakukan setelah `read_csv`, dan apa yang dicari pada tiap pemeriksaan.

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `d-xi1-m5` (sekitar satu minggu lagi), `d-xi1-m7` (sekitar tiga minggu lagi), dan `d-xi1-m12` (sekitar delapan minggu lagi). Jawab sekarang lalu simpan.

1. Mengapa `csv.DictReader` mengembalikan semua nilai sebagai teks, dan apa akibatnya pada hitungan?
2. Apa yang diatur `sep` dan `decimal` pada `pd.read_csv`, dan kapan perlu diubah?
3. Mengapa berkas data mentah tidak ditimpa, dan hasil olahan ditulis ke berkas baru?

## Kesalahan umum

- **"Pustaka `csv` mengenali angka."** Semua nilai dari `csv` berupa teks; `"20" + "10"` menjadi `"2010"`.
- **"CSV pasti dipisah koma."** Banyak berkas memakai `;` atau tab; periksa `shape` dan nama kolom setelah membaca.
- **"Simpan hasil ke nama berkas yang sama supaya rapi."** Menimpa berkas mentah menghilangkan data asli; tulis ke berkas baru.
- **"Nomor baris di kiri adalah bagian data."** Itu indeks `pandas`; tanpa `index=False` ia ikut tertulis sebagai kolom baru.

## Cek mandiri

- [ ] Saya dapat menulis dan membaca CSV dengan modul `csv`.
- [ ] Saya dapat membaca CSV dengan `pandas` dan memeriksa `shape` serta `dtypes`.
- [ ] Saya dapat menyaring baris dan menyimpannya tanpa indeks.
- [ ] Saya mengenali tanda berkas titik koma.
- [ ] Saya mencatat pemakaian AI bila saya memakainya.

## Kunci dan petunjuk

**Ingat kembali.** 1: daftar menyimpan urutan dan diakses lewat indeks; kamus menyimpan pasangan kunci dan nilai. 2: karena akibat kesalahan menentukan ukuran evaluasi dan apakah model dipakai. 3: `print` hanya menampilkan dan fungsinya mengembalikan `None`; `return` memberi nilai yang bisa dipakai lagi.

**Prediksi dulu.** Keluaran: `2`, `2010`, `30`. Nilai dari `csv.DictReader` berupa teks, jadi `+` menyambung `"20"` dan `"10"`; setelah `int()`, dijumlahkan menjadi 30.

**Contoh setengah jadi.** `"Stasiun A"`, `mean`, `False`. Keluaran: `14.0` lalu tiga baris data (12, 0, 30 dibagi tiga sama dengan 14,0) dengan judul kolom.

**Soal Parsons.** Urutan benar:

```python
import pandas as pd

df = pd.read_csv("hujan_contoh.csv")
basah = df[df["curah_mm"] > 0]
basah.to_csv("hujan_basah.csv", index=False)
print(len(basah))
```

Keluaran `4`. `import` dulu, baca, saring, simpan, baru dicetak; menyaring sebelum membaca tidak mungkin karena `df` belum ada.

**Latihan.** 1: `total_b = 0`, `for baris in isi: if baris["stasiun"] == "Stasiun B": total_b = total_b + float(baris["curah_mm"])`; keluaran `5.0` (4 + 0 + 1). 2: contoh: baca tabel; ambil baris yang `suhu_c` lebih dari 28; hitung dengan `len`; `len(df[df["suhu_c"] > 28])` memberi `4`. 3: dinilai dari berkas yang terbaca benar dan berkas baru yang berbeda dari berkas mentah. 4: `pd.read_csv(io.StringIO(teks), sep=";", decimal=",")` lalu `["suhu"].mean()` memberi `29.25`. 5: opsional.

**Latihan bercampur.** 1: `cacah = {}`; `for baris in isi: cacah[baris["stasiun"]] = cacah.get(baris["stasiun"], 0) + 1`; hasil `{'Stasiun A': 3, 'Stasiun B': 3}`. 2: contoh: `df.shape` (apakah jumlah baris dan kolom sesuai dugaan) dan `df.dtypes` (apakah kolom angka terbaca sebagai angka).

**Ulang berjarak.** 1: karena CSV hanya teks; angka harus diubah dengan `int()` atau `float()`, kalau tidak `+` menyambung teks dan hitungan keliru. 2: `sep` mengatur pemisah kolom, `decimal` tanda desimal; ubah bila berkas memakai `;` dan koma desimal. 3: supaya data asli selalu bisa dipakai ulang dan pembersihan bisa diulang atau diperiksa.

## Langkah berikutnya

Modul berikut: `d-xi1-m5` (sumber data terbuka dan legal), tempat kamu menilai sumber dan lisensi sebelum memakai data. Bacaan lanjut: panduan input dan output `pandas` pada dokumentasi resminya.
