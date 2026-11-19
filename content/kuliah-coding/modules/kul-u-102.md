## Untuk siapa modul ini

Modul ini untuk mahasiswa semester 2 dari program studi mana pun yang sudah
lulus `KUL-U-101` atau setara: kamu sudah dapat menulis fungsi, memakai `list`
dan `dict`, membaca CSV, menulis `assert`, dan menyimpan kode dengan Git. Satu
mata kuliah, satu semester: 14 pertemuan, ujian tengah semester sesudah
pertemuan 7 dan ujian akhir sesudah pertemuan 14 `[asumsi]` (silabus bagian
2.3). Kamu butuh Python 3, pustaka `pandas` dan `matplotlib`, Git, dan
penyunting teks; notebook (Jupyter atau sejenisnya) dipakai mulai bagian 5.

Kode di modul ini memakai Python 3.12, pandas 3.1, dan matplotlib 3.11;
tiap blok lengkap sudah dijalankan penyusun dan keluarannya sama dengan yang
tertulis. Versi lain dapat menampilkan keluaran yang sedikit berbeda (misalnya
tipe teks pada `dtypes`).

Seperti di semester lalu, kerjakan tiap bagian **dengan tangan**. Menjalankan
kode orang lain terasa seperti paham, padahal yang melatih adalah menulis dan
memeriksa sendiri.

## Peta semester

| Pertemuan | Bagian | Pokok bahasan | CPMK | Kuis pembuka (jarak) |
| --- | --- | --- | --- | --- |
| 1 | 1 | Tabel data: baris, kolom, tipe; memuat CSV | C1 | `KUL-U-101` (CSV, kamus) |
| 2 | 1 | Memeriksa data: bentuk, tipe, ringkasan awal | C1 | pertemuan 1 |
| 3 | 1 | Memilih dan menyaring baris dan kolom | C1 | 2, lalu 1 |
| 4 | 2 | Nilai hilang | C1 | 3, lalu 1 |
| 5 | 2 | Tipe salah, teks tidak seragam, kembaran | C1 | 4, lalu 2 |
| 6 | 2 | Pencilan dan pencatatan keputusan pembersihan | C1 | 5, lalu 3 |
| 7 | 3 | Ringkasan statistik; **kuis kumulatif 1** | C2 | 6, lalu 2 dan 4 |
| ujian tengah | | Ujian praktik langsung, tanpa AI | C1–C2 | |
| 8 | 3 | Rata-rata, median, sebaran, kuartil | C2 | 7, lalu 5 |
| 9 | 3 | Ringkasan per kelompok | C2 | 8, lalu 6 |
| 10 | 4 | Grafik batang, garis, dan sebaran | C2 | 9, lalu 4 |
| 11 | 4 | Grafik yang jujur: sumbu, label, satuan | C2 | 10, lalu 7 |
| 12 | 5 | Notebook dan alur yang dapat diulang | C3 | 11, lalu 8 |
| 13 | 6 | Sumber data terbuka; kualitas dan bias data | C4 | 12, lalu 5 dan 9 |
| 14 | 6 | Laporan dan presentasi; **kuis kumulatif 2** | C1–C4 | 13, lalu 1 sampai 12 |
| ujian akhir | | Ujian praktik langsung, tanpa AI | C1–C4 | |

## Ingat kembali

Tiap pertemuan dibuka dengan kuis 5 menit **tanpa catatan**, 3 sampai 5
soal pendek. Kolom terakhir peta menunjukkan dari mana soalnya: pertemuan
lalu, lalu pertemuan yang lebih jauh, dan pada pertemuan awal dari mata kuliah
prasyarat. Jaraknya bertambah, jadi pertemuan 14 memuat soal dari pertemuan 1.
Kuis tidak dinilai besar; tujuannya melatih mengingat, bukan menghukum lupa.

Soal pembuka pertemuan 1 (dari `KUL-U-101`):

1. Tulis dua baris Python yang membaca satu berkas CSV dengan `csv.DictReader`
   dan mencetak kolom `kategori` tiap baris. Mengapa nilai angka dari CSV
   perlu diubah dengan `int(...)` sebelum dijumlahkan?
2. Dengan kamus `stok = {"pensil": 10}`, tulis satu baris yang menambah
   `buku` bernilai 4, dan satu baris yang menambah pensil 3 lagi.
3. Tulis satu `assert` yang gagal bila fungsi `rata_rata([70, 80, 90])` tidak
   mengembalikan 80. Mengapa uji yang tidak pernah gagal tidak berguna?

Soal pembuka pertemuan 4 (dari pertemuan 3 dan 1) dan seterusnya mengikuti
kolom peta; dosen atau asisten menyusunnya dari bagian yang bersangkutan.
Kerjakan latihan di tiap bagian **sebelum** melihat bagian "Kunci dan
petunjuk".

## Tujuan

Pada akhir semester kamu dapat (CPMK, silabus bagian 3.1):

- **C1** memuat, membersihkan, dan memeriksa data tabular;
- **C2** menghitung statistik deskriptif dan membuat visualisasi;
- **C3** menyusun alur analisis yang dapat diulang (notebook);
- **C4** menafsirkan hasil dan menyebut keterbatasan data.

## Bagian 1: Tabel data, memuat, dan memeriksa (pertemuan 1 sampai 3)

Data tabular adalah baris (satu catatan) dan kolom (satu atribut). Di
`KUL-U-101` kamu membaca CSV baris demi baris dengan `csv`. Di sini kita
memakai **pandas**, yang menyimpan seluruh tabel sebagai `DataFrame` dan
membiarkan kita bertanya kepada kolom sekaligus. Seluruh data modul ini
**sintetis**: penjualan sebuah kedai fiktif dengan dua cabang. Blok pertama
menyimpan data itu ke berkas `kedai.csv` di folder kerjamu; blok-blok
berikutnya membacanya.

```python
from pathlib import Path

Path("kedai.csv").write_text(
    """tanggal,cabang,menu,jumlah,harga
2026-03-02,Barat,kopi susu,12,18000
2026-03-02,Timur,teh tarik,8,15000
2026-03-03,Barat,kopi susu,,18000
2026-03-03,Timur,Teh Tarik ,6,15000
2026-03-04,Barat,roti bakar,5,22.000
2026-03-04,Timur,kopi susu,120,18000
2026-03-05,Barat,teh tarik,9,15000
2026-03-05,Timur,roti bakar,7,22000
2026-03-06,Barat,kopi susu,14,18000
2026-03-06,Barat,kopi susu,14,18000
2026-03-06,Timur,teh tarik,10,15000
""",
    encoding="utf-8",
)
print("tersimpan")
# keluaran: tersimpan
```

Data ini sengaja **kotor**: ada sel kosong, penulisan menu yang tidak
seragam, harga dengan titik ribuan, angka yang janggal, dan baris kembar.
Kamu akan menemukan semuanya sendiri.

### Prediksi dulu

Tanpa menjalankan, tulis dua baris keluaran program ini. Baris kedua
mencetak bentuk tabel yang tersaring, yaitu (banyak baris, banyak kolom).

```python
import pandas as pd

d = pd.DataFrame({"menu": ["kopi", "teh", "kopi"], "jumlah": [3, 5, 4]})
print(d["jumlah"].sum())
print(d[d["menu"] == "kopi"].shape)
```

Baru setelah menuliskannya, jalankan dan cocokkan.

### Contoh terselesaikan

Memuat dan memeriksa tabel sebelum menghitung apa pun. Pemeriksaan awal
selalu empat hal: bentuk, tipe tiap kolom, beberapa baris pertama, dan
banyaknya sel kosong per kolom.

```python
import pandas as pd

df = pd.read_csv("kedai.csv")
print(df.shape)
print(df.dtypes)
print(df.head(3))
print(df.isna().sum())
print(df["harga"].min())
```

Keluaran:

```text
(11, 5)
tanggal        str
cabang         str
menu           str
jumlah     float64
harga       float64
dtype: object
      tanggal cabang       menu  jumlah    harga
0  2026-03-02  Barat  kopi susu    12.0  18000.0
1  2026-03-02  Timur  teh tarik     8.0  15000.0
2  2026-03-03  Barat  kopi susu     NaN  18000.0
tanggal    0
cabang     0
menu       0
jumlah     1
harga      0
dtype: int64
22.0
```

Telusuri apa yang terjadi. `jumlah` berupa `float64` padahal isinya bilangan
bulat, karena satu sel kosong menjadi `NaN` (*not a number*) dan `NaN`
hanya ada pada bilangan pecahan. `harga` tampak baik-baik saja, `float64`,
tetapi harga terkecilnya **22.0**, padahal harga lain belasan ribu. Sel
`22.000` ditulis dengan titik sebagai pemisah ribuan, dan pandas, yang
memperlakukan titik sebagai pemisah desimal, membacanya sebagai dua puluh dua
koma nol. **Tidak ada pesan galat**; nilainya diam-diam salah seribu kali.
Karena itu tipe kolom bukan satu-satunya pemeriksaan: lihat juga nilai
terkecil dan terbesar. Jangan melangkah ke ringkasan sebelum tipe dan
rentang nilainya masuk akal.

### Contoh setengah jadi

Lengkapi kode agar mencetak banyaknya baris cabang Barat dan jumlah
penjualan (kolom `jumlah`, `NaN` diabaikan) di cabang Timur:

```python setengah-jadi
import pandas as pd

df = pd.read_csv("kedai.csv")
barat = df[df["cabang"] ___ "Barat"]
print(len(___))
print(df[df["cabang"] == "Timur"]["jumlah"].___())
```

### Latihan

1. **Ubah:** tampilkan hanya kolom `menu` dan `jumlah` untuk baris dengan
   `jumlah` di atas 10.
2. **Buat:** tulis fungsi `periksa(berkas)` yang mencetak bentuk, tipe, dan
   banyaknya sel kosong per kolom suatu CSV.
3. **Jelaskan:** dengan kalimatmu sendiri, mengapa satu sel kosong mengubah
   tipe kolom bilangan bulat menjadi `float64`.
4. **Berpasangan (pertemuan lab):** satu orang mengetik (pengemudi), satu
   orang mengarahkan (navigator); bertukar peran tiap 10 menit. Pasangan
   mencari **masalah apa saja** pada `kedai.csv` sebelum menulis kode apa
   pun, lalu mencocokkan daftarnya.

## Bagian 2: Pembersihan data (pertemuan 4 sampai 6)

Membersihkan data adalah serangkaian **keputusan**, bukan satu perintah ajaib.
Tiap keputusan mengubah angka yang kamu laporkan, jadi setiap keputusan
dicatat.

### Prediksi dulu

Apa isi `s` setelah baris terakhir?

```python
import pandas as pd

s = pd.Series([" Teh ", "teh", "KOPI"])
s = s.str.strip().str.lower()
print(s.nunique())
print(s.tolist())
```

### Contoh terselesaikan

Tiga perbaikan yang berbeda sifatnya: membaca harga dengan benar,
menyeragamkan teks, dan membuang kembaran. Perhatikan bahwa **sel kosong dan angka janggal belum
disentuh**; keduanya butuh keputusan yang kita bahas sesudahnya.

```python
import pandas as pd

df = pd.read_csv("kedai.csv", thousands=".")
df["menu"] = df["menu"].str.strip().str.lower()
df = df.drop_duplicates()
print(df.shape)
print(df["menu"].value_counts())
print(df["harga"].dtype)
```

Keluaran:

```text
(10, 5)
menu
kopi susu     4
teh tarik     4
roti bakar    2
Name: count, dtype: int64
int64
```

Alasan tiap langkah. `strip` dan `lower` membuat `Teh Tarik ` dan `teh tarik`
dianggap menu yang sama; tanpanya `value_counts` melaporkan tiga jenis teh.
Argumen `thousands="."` memberi tahu pandas bahwa titik adalah pemisah
ribuan, sehingga `22.000` dibaca 22000 dan kolom `harga` menjadi bilangan
bulat; ini diperbaiki **saat membaca**, bukan sesudahnya, karena sesudah dibaca
sebagai 22.0 informasinya sudah rusak. `drop_duplicates`
membuang satu dari dua baris kembar, tetapi hati-hati: dua penjualan yang
memang sama persis dalam satu hari juga akan terbuang. Di data nyata, tanya
dulu apakah kembaran itu salah catat atau kejadian asli; di sini kita
memutuskan itu salah catat dan **menuliskannya**.

Sekarang dua keputusan yang sulit.

```python
import pandas as pd

df = pd.read_csv("kedai.csv", thousands=".")
df["menu"] = df["menu"].str.strip().str.lower()
df = df.drop_duplicates()

print(df[df["jumlah"].isna()])
print(df[df["jumlah"] > 50])
```

```text
      tanggal cabang       menu  jumlah  harga
2  2026-03-03  Barat  kopi susu     NaN  18000
      tanggal cabang       menu  jumlah  harga
5  2026-03-04  Timur  kopi susu   120.0  18000
```

Untuk sel kosong kita punya setidaknya tiga pilihan: membuang barisnya,
mengisi dengan nilai lain (mis. median), atau membiarkannya dan memakai
fungsi yang melewati `NaN`. Untuk 120, yang sepuluh kali lebih besar dari
penjualan lain, kemungkinan itu salah ketik untuk 12 atau memang lonjakan
nyata. **Kamu tidak dapat memastikannya dari tabel saja**; di dunia nyata kamu
bertanya kepada pemilik data. Keputusan di modul ini: kedua baris dibuang dari
ringkasan, dan catatan keputusan ditulis di berkas teks supaya pembaca laporan
tahu angka berasal dari mana.

```python
import pandas as pd

df = pd.read_csv("kedai.csv", thousands=".")
df["menu"] = df["menu"].str.strip().str.lower()
df = df.drop_duplicates()
df = df.dropna(subset=["jumlah"])
df = df[df["jumlah"] <= 50]
df["jumlah"] = df["jumlah"].astype(int)
df.to_csv("kedai_bersih.csv", index=False)
print(df.shape)
print(df["jumlah"].tolist())
```

```text
(8, 5)
[12, 8, 6, 5, 9, 7, 14, 10]
```

### Contoh setengah jadi

Lengkapi fungsi pembersih yang mengembalikan tabel bersih dan **mencatat
berapa baris dibuang** karena tiap alasan:

```python setengah-jadi
import pandas as pd


def bersihkan(df):
    catatan = {}
    n0 = len(df)
    df = df.drop_duplicates()
    catatan["kembar"] = n0 - len(df)
    n1 = len(df)
    df = df.dropna(subset=["jumlah"])
    catatan["kosong"] = n1 - len(___)
    return df, ___
```

### Latihan

1. **Ubah:** pada keputusan di atas, ganti membuang baris kosong dengan
   mengisinya dengan median `jumlah` menu yang sama. Bandingkan `shape` dan
   rata-rata sebelum dan sesudah.
2. **Buat:** fungsi `tandai_pencilan(df, batas)` yang mengembalikan baris yang
   `jumlah`-nya melebihi `batas`, **tanpa membuangnya**.
3. **Jelaskan:** mengapa `Teh Tarik ` dengan spasi di ujung bisa lolos dari
   mata tetapi tidak dari komputer.
4. **Berpasangan:** tukar `kedai_bersih.csv` dengan pasangan, **jangan** lihat
   kode pasanganmu, dan tebak keputusan pembersihan apa yang diambil hanya dari
   isi tabelnya.

## Bagian 3: Ringkasan statistik (pertemuan 7 sampai 9)

Ringkasan statistik memadatkan banyak angka menjadi sedikit. Setiap ringkasan
menyembunyikan sesuatu, jadi kita belajar memilih ringkasan yang cocok dan
menyebut apa yang tersembunyi.

### Prediksi dulu

Dua daftar jumlah penjualan: `[10, 10, 10, 10]` dan `[1, 1, 1, 37]`. Tanpa
menghitung dengan komputer, tebak mana yang rata-ratanya lebih besar, mana
yang mediannya lebih besar, dan mengapa jawabannya berbeda.

### Contoh terselesaikan

```python
import pandas as pd

df = pd.read_csv("kedai_bersih.csv")
print(df["jumlah"].describe())
print(df["jumlah"].median())
```

```text
count     8.000000
mean      8.875000
std       3.044316
min       5.000000
25%       6.750000
50%       8.500000
75%      10.500000
max      14.000000
Name: jumlah, dtype: float64
8.5
```

Baca tabelnya. Delapan nilai; rata-rata 8,875; median 8,5 (dua nilai
tengah, 8 dan 9); dua kuartil 6,75 dan 10,5 membatasi separuh data bagian
tengah. Simpangan baku 3,04 memberi gambaran sebaran. Median dan rata-rata
berdekatan karena data tidak berpencilan; jika 120 tadi ikut dihitung (sembilan nilai), rata-rata melonjak dari 8,9
menjadi sekitar 21,2 sedangkan median hanya bergeser dari 8,5 ke 9. Itu sebabnya **median lebih
tahan terhadap pencilan**.

Sekarang ringkasan per kelompok:

```python
import pandas as pd

df = pd.read_csv("kedai_bersih.csv")
df["pendapatan"] = df["jumlah"] * df["harga"]
ringkas = df.groupby("menu").agg(
    transaksi=("jumlah", "count"),
    rata_jumlah=("jumlah", "mean"),
    pendapatan=("pendapatan", "sum"),
)
print(ringkas)
```

```text
            transaksi  rata_jumlah  pendapatan
menu                                          
kopi susu           2        13.0      468000
roti bakar          2         6.0      264000
teh tarik           4         8.25      495000
```

Periksa dengan tangan, karena komputer tidak menjamin pertanyaannya benar:
kopi susu 12 + 14 = 26 gelas kali 18000 = 468000. Pendapatan per menu dihitung
di sini dari `jumlah` kali `harga`, bukan dari kolom yang sudah ada,
sehingga rumusnya terlihat. Hati-hati menafsirkan: `kopi susu` hanya punya
dua transaksi, jadi rata-rata 13,0 rapuh; satu transaksi baru dapat
menggesernya jauh.

### Contoh setengah jadi

Lengkapi agar mencetak rata-rata `jumlah` **per cabang** dan cabang mana yang
lebih tinggi:

```python setengah-jadi
import pandas as pd

df = pd.read_csv("kedai_bersih.csv")
per_cabang = df.___("cabang")["jumlah"].mean()
print(per_cabang)
print(per_cabang.___())
```

### Latihan

1. **Ubah:** tambah kolom median per menu pada `ringkas`.
2. **Buat:** hitung persentase pendapatan tiap menu terhadap total, dibulatkan
   satu angka desimal.
3. **Jelaskan:** kapan kamu melaporkan median alih-alih rata-rata? Beri satu
   contoh data penghasilan atau harga, bukan penjualan kedai.
4. **Berpasangan:** satu orang menyebut sebuah klaim ("menu A paling laris"),
   yang lain mencari **dua ringkasan berbeda** yang bisa membenarkan atau
   membantahnya (paling banyak transaksi atau paling besar pendapatan).

## Bagian 4: Grafik (pertemuan 10 dan 11)

Grafik adalah klaim visual. Seperti ringkasan, grafik bisa menyesatkan tanpa
berbohong secara teknis.

### Prediksi dulu

Dua grafik batang memperlihatkan data yang sama, yaitu 98 dan 100. Satu
memulai sumbu vertikal dari 0, satu dari 97. Tulis satu kalimat tentang kesan
yang diterima pembaca dari tiap grafik.

### Contoh terselesaikan

```python
import matplotlib.pyplot as plt
import pandas as pd

df = pd.read_csv("kedai_bersih.csv")
total = df.groupby("menu")["jumlah"].sum()

fig, ax = plt.subplots(figsize=(5, 3))
ax.bar(total.index, total.values)
ax.set_title("Gelas atau porsi terjual per menu (data sintetis)")
ax.set_xlabel("Menu")
ax.set_ylabel("Jumlah terjual")
ax.set_ylim(bottom=0)
fig.tight_layout()
fig.savefig("per_menu.png", dpi=100)
print(total.to_dict())
print("gambar tersimpan")
```

```text
{'kopi susu': 26, 'roti bakar': 12, 'teh tarik': 33}
gambar tersimpan
```

Buka `per_menu.png` dan cek tiga hal: judul menyebut **apa** dan **satuannya**
(plus bahwa datanya sintetis), kedua sumbu berlabel, dan sumbu vertikal
mulai dari 0, karena panjang batang mewakili besaran. Grafik garis boleh
tidak mulai dari 0 bila yang penting adalah perubahan, tetapi nyatakan dengan
jelas. Pemilihan jenis grafik: batang untuk membandingkan kategori, garis
untuk perubahan menurut waktu, sebar (*scatter*) untuk hubungan dua bilangan.

### Contoh setengah jadi

Lengkapi grafik garis jumlah terjual per tanggal:

```python setengah-jadi
import matplotlib.pyplot as plt
import pandas as pd

df = pd.read_csv("kedai_bersih.csv")
harian = df.groupby("tanggal")["jumlah"].___()

fig, ax = plt.subplots(figsize=(5, 3))
ax.plot(harian.___, harian.values, marker="o")
ax.set_xlabel("Tanggal")
ax.set_ylabel(___)
fig.savefig("harian.png", dpi=100)
```

### Latihan

1. **Ubah:** buat grafik batang tadi mendatar, urut dari yang terbesar.
2. **Buat:** grafik batang berkelompok jumlah per menu menurut cabang.
3. **Jelaskan:** apa yang menyesatkan dari grafik batang yang sumbunya
   dipotong, dan kapan grafik garis boleh dipotong?
4. **Berpasangan:** buat satu grafik yang menyesatkan dengan sengaja dari data
   yang sama, lalu tukar dan tulis tiga cacatnya.

## Bagian 5: Notebook dan alur yang dapat diulang (pertemuan 12)

Analisis yang hanya dapat dijalankan oleh pembuatnya, pada laptop miliknya,
dengan urutan klik yang ia ingat, bukan analisis: itu satu kejadian.
Analisis yang dapat diulang berarti orang lain, atau kamu enam bulan lagi,
menjalankannya dari awal dan mendapat angka yang sama.

### Prediksi dulu

Sebuah notebook punya tiga sel: (1) `n = 5`, (2) `n = n * 2`, (3)
`print(n)`. Kamu menjalankan sel 1, 2, lalu 2 sekali lagi, lalu 3. Apa
keluaran sel 3? Jika notebook dimulai ulang dan dijalankan berurutan, apa
keluarannya?

### Contoh terselesaikan

Notebook (misalnya Jupyter) adalah dokumen berisi sel kode dan sel teks yang
dijalankan satu per satu dengan *kernel* yang mengingat variabel. Itulah
sumber masalahnya: **keadaan tersembunyi**. Sel yang dijalankan tidak
berurutan menghasilkan angka yang tidak dapat dilacak. Aturannya:

```text
1. Sel pertama: impor pustaka dan tetapkan lokasi data.
2. Sel kode berikutnya bergantung hanya pada sel di atasnya.
3. Sebelum membagikan: Restart kernel dan jalankan semua sel dari atas.
4. Teks penjelas menyebut sumber data, tanggal, dan keputusan pembersihan.
5. Jalur berkas relatif, bukan "C:\Users\...", tanpa kata sandi di sel mana pun.
```

Alur yang sama dapat ditulis sebagai skrip, dan keunggulan skrip adalah
menjalankannya dari terminal selalu dimulai dari awal:

```python
import pandas as pd


def muat(berkas):
    df = pd.read_csv(berkas, thousands=".")
    df["menu"] = df["menu"].str.strip().str.lower()
    return df.drop_duplicates()


def bersihkan(df):
    df = df.dropna(subset=["jumlah"])
    df = df[df["jumlah"] <= 50]
    return df.assign(jumlah=df["jumlah"].astype(int))


def ringkas(df):
    return df.groupby("menu")["jumlah"].agg(["count", "mean"])


if __name__ == "__main__":
    print(ringkas(bersihkan(muat("kedai.csv"))))
```

```text
            count   mean
menu                    
kopi susu       2  13.00
roti bakar      2   6.00
teh tarik       4   8.25
```

Dua kali dijalankan, hasilnya sama persis: itulah *dapat diulang*. Perhatikan
tiga fungsi kecil masing-masing satu tugas, sehingga tiap tahap dapat diuji
dengan `assert` seperti di `KUL-U-101`. Satu catatan praktis untuk Git:
berkas notebook menyimpan juga keluaran dan nomor sel, sehingga perbedaan
(*diff*) antar versi sering berisik; kosongkan keluaran sebelum menyimpan
versi, atau simpan alurnya sebagai skrip dan notebook sebagai laporan.

### Contoh setengah jadi

Tulis uji untuk `bersihkan`: tabel kecil dengan satu baris `NaN` dan satu
baris `jumlah` 500 harus tersisa satu baris.

```python setengah-jadi
import pandas as pd


def bersihkan(df):
    df = df.dropna(subset=["jumlah"])
    return df[df["jumlah"] <= 50]


kecil = pd.DataFrame({"jumlah": [5.0, ___, 500.0]})
assert len(bersihkan(kecil)) == ___
print("uji lolos")
```

### Latihan

1. **Ubah:** tambahkan tahap `simpan(df, berkas)` yang menulis hasil
   bersih ke CSV.
2. **Buat:** susun notebook (atau skrip) lengkap untuk `kedai.csv` yang
   menjalankan seluruh alur dari awal tanpa keadaan tersembunyi. Buktikan:
   Restart dan jalankan semua.
3. **Jelaskan:** apa itu keadaan tersembunyi pada notebook dan satu cara
   menghindarinya.
4. **Berpasangan:** tukar notebook dengan pasangan dan coba menjalankannya
   dari nol di folder baru; catat tiap kali gagal dan sebabnya.

## Bagian 6: Sumber data, kualitas, bias, dan laporan (pertemuan 13 dan 14)

Hasil analisis hanya sebaik datanya. Pertemuan 13 membahas dari mana data
dapat diperoleh dan apa yang bisa salah; pertemuan 14 menyusun laporan dan
presentasi singkat.

### Prediksi dulu

Seorang peneliti ingin mengetahui rata-rata uang saku mahasiswa sebuah
universitas dengan menyebar survei di grup pesan satu fakultas. Tulis dua
alasan mengapa rata-ratanya mungkin tidak mewakili seluruh mahasiswa.

### Contoh terselesaikan

Bias pemilihan sampel dapat ditunjukkan dengan data sendiri. Misalkan
laporan hanya memakai cabang Barat:

```python
import pandas as pd

df = pd.read_csv("kedai_bersih.csv")
semua = df["jumlah"].mean()
barat = df[df["cabang"] == "Barat"]["jumlah"].mean()
print(round(semua, 2), round(barat, 2))
print(df["cabang"].value_counts().to_dict())
```

```text
8.88 10.0
{'Barat': 4, 'Timur': 4}
```

Rata-rata semua cabang 8,88; rata-rata cabang Barat saja 10,0, sekitar
seperdelapan lebih tinggi. Laporan yang hanya memakai satu cabang memberi
kesan yang berbeda dari kenyataan dua cabang. Pertanyaan pokoknya:
**apakah sampel ini mewakili yang ingin kita simpulkan?** Delapan baris
selama lima hari bukan dasar untuk menyimpulkan perilaku pelanggan sebuah
kedai. Keterbatasan itu dinyatakan di laporan.

**Sumber data terbuka.** Portal data pemerintah dan lembaga statistik
(contoh di Rujukan) menyediakan data publik. Sebelum memakainya periksa
empat hal: siapa penerbitnya, tahun dan cakupan datanya, apa arti tiap
kolom (kamus data), dan lisensi atau syarat pemakaiannya. Pilih data yang
**bukan data pribadi** (ADR-0004; silabus bagian 8): agregat per wilayah
atau per tahun, bukan catatan individu.

**Tiga sumber masalah kualitas.** (1) *Pengumpulan*: siapa yang tidak
tercatat; (2) *pengukuran*: alat atau pertanyaan yang bias; (3) *pengolahan*:
keputusan pembersihan kita sendiri. Laporan yang jujur menyebut ketiganya.

**Kerangka laporan satu halaman.** Pertanyaan; data (sumber, tanggal akses,
lisensi); keputusan pembersihan (dari catatanmu); hasil (satu atau dua
grafik, satu tabel); tafsiran (apa yang **tidak** bisa disimpulkan); keterbatasan.
Presentasi singkat: tiga menit, satu pesan utama.

Pada bagian ini **tidak ada contoh terselesaikan lagi** untuk laporanmu:
kamu menulis dari kerangka. Pemudaran dari contoh penuh (pertemuan 1 sampai
6), ke contoh setengah jadi (7 sampai 12), ke spesifikasi saja (13 dan 14)
disengaja.

### Latihan

1. **Buat:** pilih satu tabel data terbuka agregat, tulis kamus datanya (arti
   tiap kolom), dan catat sumber, tanggal akses, dan lisensinya.
2. **Jelaskan:** dari data yang sama, tulis satu kesimpulan yang **didukung**
   dan satu yang **tidak boleh** dibuat, beserta alasannya.
3. **Berpasangan:** tinjau laporan satu halaman pasangan memakai kerangka di
   atas; tulis satu hal yang jelas dan satu pertanyaan yang belum terjawab.

## Latihan bercampur

Setelah bagian 3 dan setelah bagian 5, kerjakan soal yang **tidak
mengatakan** topiknya. Contoh: "Diberikan tabel penjualan, kamu diminta
menyebut cabang yang performanya lebih baik." Kamu sendiri memutuskan: perlu
dibersihkan dulu? ringkasan apa? grafik apa? apa yang harus dicatat? Kuis
kumulatif 1 (pertemuan 7) dan 2 (pertemuan 14) berbentuk sama.

## Ulang berjarak

Kerjakan ulang tanpa melihat solusi lama:

- satu minggu setelah bagian: tulis ulang satu langkah pembersihan dari bagian
  itu pada tabel baru;
- awal setiap bagian baru: dua soal dari bagian sebelumnya;
- minggu sebelum ujian: tiga soal dari bagian 1 sampai 3 yang dahulu salah,
  termasuk dari `KUL-U-101` (fungsi dan uji).

## Kebijakan AI dan log pemakaian

Silabus bagian 6.3 tidak menyebut tingkat AI untuk mata kuliah ini, jadi
tingkat berikut adalah **`[asumsi]` penyusun modul**, dan dosen boleh
mengubahnya per tugas dan menuliskannya di lembar tugas:

| Jenis tugas | Tingkat `[asumsi]` |
| --- | --- |
| Latihan dasar bagian 1 sampai 3 | Kuning |
| Laporan analisis dan eksplorasi data terbuka (bagian 4 sampai 6) | Hijau |
| Ujian praktik langsung | Merah |

**Kuning**: AI boleh menjelaskan konsep, tidak boleh menghasilkan solusi yang
kamu serahkan, dan hanya setelah **gerbang kesiapan** (kamu dapat menelusuri
program pendek, menulis satu uji yang gagal bila kode salah, dan menjelaskan
kode dengan katamu sendiri). **Hijau**: AI boleh dipakai dengan pengungkapan
ringkas dan **log pemakaian** wajib. **Merah**: tanpa AI; berlaku untuk ujian
praktik.

Format log, disimpan di repositorimu sendiri: alat dan versi, tujuan,
perintah yang kamu ketik, dan bagian keluaran yang dipakai. Jangan
memasukkan data pribadi, kata sandi, atau kunci ke layanan AI; data penjualan
sintetis modul ini aman, tetapi data nyata tidak otomatis aman. Untuk analisis
data, kebiasaan yang perlu dilatih: minta AI menjelaskan fungsi pandas yang
belum kamu kenal, lalu **jalankan sendiri pada tabel kecil** dan periksa hasil
dengan tangan. Kode analisis dari AI sering berjalan tanpa galat tetapi
menjawab pertanyaan yang salah. Dosen dapat mewawancarai kamu singkat tentang
laporan yang kamu serahkan.

## Kesalahan umum

- **Mengubah tabel asli.** Menulis hasil bersih di atas data mentah
  menghilangkan jejak; simpan `kedai.csv` dan tulis hasilnya ke berkas lain.
- **Rata-rata tanpa melihat sebaran.** Dua tabel berbeda dapat berrata-rata
  sama; selalu lihat `describe()` dan grafik.
- **Membuang pencilan tanpa mencatat.** Pencilan bisa salah ketik atau fakta;
  keputusan harus tertulis.
- **Tipe kolom tidak diperiksa.** Angka berbentuk teks menghasilkan
  penjumlahan huruf, bukan angka.
- **Sumbu batang dipotong.** Batang mewakili besaran dari nol.
- **Notebook dijalankan acak.** Hasil yang tidak dapat diulang.
- **Menyimpulkan sebab dari korelasi atau dari sampel kecil.**

## Cek mandiri

Tutup modul, jawab, baru periksa.

1. Sebut empat pemeriksaan awal pada tabel baru.
2. Mengapa satu sel kosong mengubah kolom bilangan bulat menjadi `float64`?
3. Kapan median lebih tepat daripada rata-rata?
4. Apa yang harus ada pada judul dan sumbu sebuah grafik?
5. Apa itu keadaan tersembunyi pada notebook?
6. Sebut tiga sumber masalah kualitas data.

Daftar periksa (kosong; kamu isi sendiri, tidak dikumpulkan):

- [ ] Aku dapat memuat dan memeriksa tabel baru sebelum menghitung.
- [ ] Aku dapat membersihkan data dan mencatat tiap keputusan.
- [ ] Aku dapat memilih ringkasan dan grafik yang sesuai pertanyaan.
- [ ] Aku dapat membuat alur yang dapat diulang dari nol.
- [ ] Aku dapat menyebut keterbatasan data dan apa yang tidak dapat disimpulkan.

## Kunci dan petunjuk

- **Bagian 1:** prediksi `12` lalu `(2, 2)`. Setengah jadi: `==`, `barat`,
  `sum`. Untuk latihan 3: `NaN` hanya ada pada bilangan pecahan, sehingga
  kolom yang memuatnya ikut menjadi `float64`.
- **Bagian 2:** prediksi `2` lalu `['teh', 'teh', 'kopi']`. Setengah jadi:
  `df`, `catatan`.
- **Bagian 3:** prediksi: rata-rata keduanya sama, 10; median `[10, 10, 10, 10]`
  adalah 10 dan `[1, 1, 1, 37]` adalah 1. Setengah jadi: `groupby`, `idxmax`.
- **Bagian 4:** prediksi: grafik dari 97 membuat 100 tampak berkali-kali lipat
  dari 98, padahal selisihnya 2 persen. Setengah jadi: `sum`, `index`,
  `"Jumlah terjual"`.
- **Bagian 5:** prediksi: `20` bila sel 2 dijalankan dua kali (5, 10, 20),
  `10` bila dimulai ulang dan berurutan. Setengah jadi: `None` (atau
  `float("nan")`), `1`.
- **Bagian 6:** prediksi: sampel hanya satu fakultas; yang menjawab survei
  mungkin berbeda dari yang tidak.
- **Petunjuk bertahap bila macet:** (1) cetak `shape` dan `dtypes` di tiap
  tahap; (2) cetak beberapa baris sebelum dan sesudah tiap perubahan;
  (3) bandingkan satu angka hasil dengan hitungan tangan pada tiga baris.

## Langkah berikutnya

`KUL-U-201` (Otomasi Kerja dan Skrip) memakai kebiasaan skrip yang dapat
diulang dari bagian 5 untuk mengotomasi berkas dan permintaan jaringan.
`KUL-U-301` (Proyek Komputasi Lintas Disiplin) membutuhkan analisis data
untuk prototipe. Bila kamu bergabung ke jalur informatika, `KUL-I-202`
(basis data) melanjutkan ke penyimpanan data yang lebih besar.

## Catatan untuk dosen

- **Bobot dan bentuk asesmen (usulan; prodi menetapkan, silabus 6.1):** dua
  laporan analisis atas data terbuka (bukan data pribadi), presentasi
  singkat, kuis mingguan, ujian praktik langsung tanpa AI. Rentang bobot dari
  silabus: tugas dan praktikum 30–40 persen, proyek atau laporan 20–40,
  ujian praktik 20–30, ujian tertulis atau lisan 10–20.
- **Variasi per mahasiswa:** beri tiap mahasiswa atau kelompok data terbuka
  berbeda (wilayah atau tahun berbeda); laporan jadi sulit disalin dan
  riwayat Git menunjukkan prosesnya (silabus 6.2).
- **Praktikum:** sediakan `kedai.csv` dan variasi sintetis lain dengan
  kekotoran yang berbeda (bahasa kolom, format tanggal, pemisah desimal).
  Pastikan lab memiliki `pandas` dan `matplotlib`.
- **Tingkat AI** pada bagian kebijakan adalah `[asumsi]`: ubah bila prodi
  punya ketentuan lain.
