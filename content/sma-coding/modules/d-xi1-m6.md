## Untuk siapa modul ini

Modul ini untuk murid kelas XI jalur D (kecerdasan buatan dan analisis data), untuk minggu `D-XI1-M6` silabus v1.3: membersihkan data (nilai hilang, duplikat, rentang). Prasyarat: modul `d-xi1-m5`. Alat: Python 3 dan pustaka `pandas`, tanpa akun.

Modul ini berstatus DRAF: karangan penyusun, belum ditinjau pemilik. Jalur D adalah pengayaan di luar rumusan capaian pembelajaran (CP). Minggu ini beririsan dengan butir `F-AD-a` (data terbuka dan legal, prediksi) pada tingkat sedang; irisan itu **tidak dihitung** sebagai pemenuhan CP.

Aturan jalur D yang berlaku: data hanya sintetis (karangan) atau terbuka dengan lisensi jelas, tanpa data yang bisa mengenali orang; wajah, suara, dan foto orang tidak dipakai sebagai data; AI generatif boleh dipakai dengan etika dan dicatat, tanpa data pribadi, kata sandi, atau tugas bernilai pada permintaanmu, dan kamu tidak wajib punya akun. Saran: jawab dulu sendiri, baru minta AI memberi petunjuk bertahap; kode buatan AI dibaca, dijalankan, dan diuji. Setiap soal `Latihan` bertanda `AI: boleh` atau `AI: tanpa AI`.

Catatan untuk guru: blok Python dijalankan penyusun dengan `python3 -I` (Python 3.12.3, `pandas` 3.1.1, per 2026-11); pada `pandas` 3 kolom teks bertipe `str`, pada versi lama `object`. Semua data karangan: tabel curah hujan dan suhu, dan nilai kadar pH air contoh yang sengaja diberi cacat. Menentukan rentang yang masuk akal membutuhkan pengetahuan bidangnya; angka rentang di sini asumsi untuk latihan, bukan standar.

## Ingat kembali

Jawab dari ingatan, baru cek di bagian kunci.

1. Apa lima catatan yang disimpan untuk setiap dataset yang dipakai? (dari `d-xi1-m5`)
2. Mengapa `b = a` pada daftar tidak membuat salinan, dan bagaimana membuat salinan? (dari `d-xi1-m3`)
3. Apa yang dilakukan `index=False` saat `to_csv`? (dari `d-xi1-m4`)

## Tujuan

Setelah modul ini kamu dapat:

- menghitung nilai hilang dan duplikat dengan `isna().sum()` dan `duplicated().sum()`;
- mengubah kolom angka yang tersimpan sebagai teks dengan `pd.to_numeric(..., errors="coerce")`;
- menandai nilai di luar rentang yang masuk akal;
- memutuskan, mencatat, dan menjalankan perlakuan: buang, biarkan, atau isi;
- menulis skrip pembersih yang melaporkan berapa baris terkena di tiap langkah.

Keluaran yang diminta silabus: skrip pembersih.

## Prediksi dulu

Tebak dan tulis empat keluaran, baru jalankan.

```python
import pandas as pd

s = pd.Series([4, None, 6, 6])
print(round(s.mean(), 2))
print(s.isna().sum())
print(len(s.dropna()))
print(s.duplicated().sum())
```

Tulis juga: apakah `mean` menghitung nilai hilang sebagai 0?

## Contoh terselesaikan

Data mentah karangan: dua stasiun, beberapa cacat. Bagian atas menunjukkan temuan, bagian bawah keputusan. Ingat: **jangan menimpa berkas mentah** (`d-xi1-m4`); semua pembersihan dikerjakan pada salinan di memori dan hasilnya ditulis ke berkas baru.

| Temuan | Perlakuan | Alasan |
| --- | --- | --- |
| `tidak ada` dan sel kosong pada `curah_mm` | ubah ke angka; yang gagal menjadi `NaN` | angka tersimpan sebagai teks |
| baris data ke-3 dan ke-4 identik | buang satu | catatan ganda menggandakan bobot |
| curah `-5` | tandai `NaN` | curah hujan tidak negatif |
| suhu `99.9` | tandai `NaN` | di luar rentang 15 sampai 40 yang diasumsikan |
| `NaN` pada curah | buang barisnya | targetnya hilang; baris itu tidak berguna untuk curah |
| `NaN` pada suhu | biarkan | rata-rata `pandas` melewati `NaN` |

```python
import io

import pandas as pd

mentah = """tanggal,stasiun,curah_mm,suhu_c
2026-01-01,Stasiun A,12,27.5
2026-01-02,Stasiun A,tidak ada,28.1
2026-01-03,Stasiun A,30,26.4
2026-01-03,Stasiun A,30,26.4
2026-01-01,Stasiun B,4,29.0
2026-01-02,Stasiun B,-5,29.6
2026-01-03,Stasiun B,1,99.9
2026-01-04,Stasiun B,,29.3
"""

df = pd.read_csv(io.StringIO(mentah))
print(df.shape)
print(df["curah_mm"].dtype)

# 1. angka yang tersimpan sebagai teks: ubah; yang gagal menjadi NaN
df["curah_mm"] = pd.to_numeric(df["curah_mm"], errors="coerce")
print("curah hilang:", df["curah_mm"].isna().sum())

# 2. duplikat
print("duplikat:", df.duplicated().sum())
df = df.drop_duplicates()

# 3. rentang yang masuk akal: curah >= 0, suhu 15 sampai 40
curah_rusak = df["curah_mm"] < 0
suhu_rusak = (df["suhu_c"] < 15) | (df["suhu_c"] > 40)
print("curah di luar rentang:", curah_rusak.sum())
print("suhu di luar rentang:", suhu_rusak.sum())
df.loc[curah_rusak, "curah_mm"] = float("nan")
df.loc[suhu_rusak, "suhu_c"] = float("nan")

# 4. keputusan: buang baris yang curahnya hilang, suhu hilang dibiarkan
bersih = df.dropna(subset=["curah_mm"])
print(bersih.shape)
print(bersih)
print("rata-rata suhu:", round(bersih["suhu_c"].mean(), 2))
```

```text
(8, 4)
str
curah hilang: 2
duplikat: 1
curah di luar rentang: 1
suhu di luar rentang: 1
(4, 4)
      tanggal    stasiun  curah_mm  suhu_c
0  2026-01-01  Stasiun A      12.0    27.5
2  2026-01-03  Stasiun A      30.0    26.4
4  2026-01-01  Stasiun B       4.0    29.0
6  2026-01-03  Stasiun B       1.0     NaN
rata-rata suhu: 27.63
```

Telusuri hitungannya: dari 8 baris, satu duplikat dibuang (7); `-5` dan sel hilang dan `tidak ada` membuat tiga baris curah `NaN`, yang dibuang (4). Suhu `99.9` menjadi `NaN` tetapi barisnya dipertahankan karena curahnya sah (1,0). Rata-rata suhu (27,5 + 26,4 + 29,0) / 3 = 27,63 mengabaikan `NaN`.

**Keputusan perlu dicatat.** Mengisi nilai hilang dengan rata-rata atau membuang baris sama-sama mengubah hasil. Karena itu catat tiap langkah: apa yang ditemukan, berapa baris terkena, apa yang dilakukan, dan alasannya. Catatan ini masuk laporan dan, bila datanya terbuka, ke catatan sumber (`d-xi1-m5`, bagian perubahan).

## Contoh setengah jadi

Isi bagian `____` supaya program membuang duplikat, menandai pH di luar 0 sampai 14, dan menghitung nilai hilang. Data karangan.

```python setengah-jadi
import io

import pandas as pd

mentah = "id,ph\n1,7.1\n2,\n2,\n3,71\n4,6.8\n"
df = pd.read_csv(io.StringIO(mentah))
print(df.duplicated().____())
df = df.____()
salah = (df["ph"] < 0) | (df["ph"] ____ 14)
df.loc[salah, "ph"] = float("nan")
print(df["ph"].isna().____())
```

## Soal Parsons

Susun baris menjadi program yang mengubah teks menjadi angka, membuang duplikat, membuang baris tanpa pH, dan mencetak banyak baris tersisa. Ada dua urutan sah untuk dua baris tengah; yang penting `import`, pembacaan, dan pencetakan di tempatnya, serta `dropna` sesudah `to_numeric`.

```text
bersih = df.dropna(subset=["ph"])
df = df.drop_duplicates()
import io
print(len(bersih))
df["ph"] = pd.to_numeric(df["ph"], errors="coerce")
import pandas as pd
df = pd.read_csv(io.StringIO("id,ph\n1,7.1\n1,7.1\n2,tidak ada\n3,6.8\n"))
```

## Latihan

1. **Hitung tangan.** (`AI: tanpa AI`) Untuk `pd.Series([10, 12, None, 12, 300])`: berapa nilai hilang, berapa duplikat? Setelah membuang duplikat, menandai nilai di atas 100 sebagai hilang, dan membuang yang hilang, tinggal berapa nilai dan berapa rata-ratanya?
2. **Pseudocode dulu.** (`AI: tanpa AI`) Sebuah CSV berat paket karangan (kolom `id`, `berat_kg`) berisi `abc`, angka negatif, dan nilai 250. Tulis langkah pembersihan dalam kata-kata dan rentang yang kamu pilih beserta alasannya, lalu baru kode.
3. **Bersihkan.** (`AI: boleh`) Bersihkan teks `"id,berat_kg\n1,2.5\n2,abc\n3,-1\n3,-1\n4,250\n5,3.1\n"` dengan rentang 0 sampai 50 kg. Cetak banyak baris tersisa dan rata-rata beratnya.
4. **Catatan pembersihan.** (`AI: boleh`) Tulis tiga baris catatan untuk soal 3: temuan, jumlah baris, tindakan, alasan.
5. **Catatan pemakaian AI (opsional).** Bila memakai asisten AI, catat alat, tujuan, garis besar perintah, bagian yang dipakai, dan cara memeriksanya.

## Latihan bercampur

1. Dari `d-xi1-m5`: dataset terbuka yang kamu bersihkan tadi berasal dari sumber berlisensi CC BY. Apa yang kamu tulis pada catatan perubahan di laporan?
2. Dari `d-xi1-m4`: hasil bersih ditulis ke berkas baru. Tulis satu baris `to_csv` untuk `bersih` ke `curah_bersih.csv` tanpa nomor baris, dan jelaskan mengapa nama berkasnya berbeda.

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `d-xi1-m7` (sekitar satu minggu lagi), `d-xi1-m9` (sekitar tiga minggu lagi), dan `d-xi1-m14` (sekitar delapan minggu lagi). Jawab sekarang lalu simpan.

1. Apa tiga pemeriksaan pertama pada tabel yang baru dibaca, dan fungsi `pandas` apa untuk tiap pemeriksaan?
2. Mengapa keputusan membuang atau mengisi nilai hilang harus dicatat bersama jumlah baris yang terkena?
3. Sebutkan tiga keputusan pembersihan yang dicatat di laporan: apa yang ditemukan, berapa baris, dan mengapa tindakan itu dipilih.

## Kesalahan umum

- **"Nilai hilang dihitung sebagai nol."** `mean` dan banyak fungsi `pandas` melewati `NaN`; menggantinya dengan 0 mengubah hasil.
- **"Duplikat pasti salah."** Dua baris identik bisa kejadian yang sama-sama terjadi; periksa dulu apakah ada kolom pembeda seperti nomor atau waktu.
- **"Nilai ekstrem selalu dibuang."** Nilai di luar rentang dicek dulu: salah ketik (pH 71 mungkin 7,1) atau kejadian nyata. Putuskan dengan alasan dan catat.
- **"Membersihkan berarti menimpa berkas asli."** Berkas mentah dibiarkan; hasil ditulis ke berkas baru.
- **"Isi saja dengan rata-rata, pasti aman."** Pengisian menyembunyikan ketidaktahuan dan dapat membuat model tampak lebih yakin dari seharusnya; catat bila dipakai.

## Cek mandiri

- [ ] Saya dapat menghitung nilai hilang dan duplikat.
- [ ] Saya dapat mengubah teks menjadi angka dengan `to_numeric` dan menangani yang gagal.
- [ ] Saya dapat menandai nilai di luar rentang beralasan.
- [ ] Saya mencatat tiap langkah pembersihan bersama jumlah barisnya.
- [ ] Saya mencatat pemakaian AI bila saya memakainya.

## Kunci dan petunjuk

**Ingat kembali.** 1: judul, pencipta, sumber, lisensi, dan tanggal akses (ditambah keterangan perubahan). 2: karena itu memberi nama kedua pada daftar yang sama; salin dengan `.copy()`. 3: mencegah nomor baris (indeks) ikut tertulis sebagai kolom di berkas.

**Prediksi dulu.** Keluaran: `5.33`, `1`, `3`, `1`. `mean` melewati `NaN`, jadi (4 + 6 + 6) / 3 = 5,33, bukan dibagi 4 dan bukan menganggap hilang sebagai 0; satu nilai hilang; `dropna` menyisakan tiga; `6` muncul dua kali sehingga satu duplikat.

**Contoh setengah jadi.** `sum`, `drop_duplicates`, `>`, `sum`. Keluaran: `1` lalu `2`. Satu baris `2,` ganda; pH 71 di luar rentang menjadi `NaN`, ditambah pH kosong untuk id 2: dua nilai hilang.

**Soal Parsons.** Urutan benar (satu dari dua yang sah):

```python
import io
import pandas as pd

df = pd.read_csv(io.StringIO("id,ph\n1,7.1\n1,7.1\n2,tidak ada\n3,6.8\n"))
df["ph"] = pd.to_numeric(df["ph"], errors="coerce")
df = df.drop_duplicates()
bersih = df.dropna(subset=["ph"])
print(len(bersih))
```

Keluaran `2` (id 1 dan 3). `drop_duplicates` boleh juga di atas `to_numeric`.

**Latihan.** 1: satu nilai hilang dan satu duplikat; setelah membuang duplikat, menandai 300 sebagai hilang, dan membuang yang hilang tersisa 2 nilai (10 dan 12) dengan rata-rata 11,0. 2: contoh: ubah ke angka, buang duplikat, tandai berat di luar 0 sampai 50 kg sebagai hilang (paket kecil tidak negatif, 250 kg tidak wajar untuk paket biasa), buang yang hilang; alasan rentang harus ditulis. 3: 2 baris tersisa (id 1 dan 5); rata-rata (2,5 + 3,1) / 2 = 2,8. Cacatnya: `abc`, satu duplikat, `-1`, dan `250`. 4: contoh: "`abc` pada 1 baris, diubah menjadi hilang dan dibuang karena berat tidak diketahui; baris ganda id 3 dibuang satu; `-1` dan `250` di luar 0 sampai 50 kg dibuang; tersisa 2 dari 6 baris." 5: opsional.

**Latihan bercampur.** 1: contoh: "Diubah: baris duplikat dibuang; nilai di luar rentang dan baris tanpa target dibuang (jumlah baris disebut); data mentah tidak diubah." 2: `bersih.to_csv("curah_bersih.csv", index=False)`; nama berbeda supaya berkas mentah tetap utuh.

**Ulang berjarak.** 1: nilai hilang (`isna().sum()`), duplikat (`duplicated().sum()`), dan nilai di luar rentang (perbandingan seperti `df["x"] > batas`). 2: karena tiap keputusan mengubah hasil, dan pembaca perlu tahu berapa data terkena supaya bisa menilai kesimpulannya. 3: contoh: duplikat 1 baris dibuang karena identik; curah negatif 1 baris dijadikan hilang karena tidak mungkin; baris tanpa curah dibuang karena target hilang.

## Langkah berikutnya

Modul berikut: `d-xi1-m7` (statistik deskriptif dan grafik), tempat kamu merangkum data bersih dan menyajikannya. Bacaan lanjut: panduan data hilang pada dokumentasi `pandas`.
