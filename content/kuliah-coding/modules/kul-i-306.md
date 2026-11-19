## Untuk siapa modul ini

Mahasiswa semester 6 informatika atau ilmu komputer yang memilih mata kuliah
pilihan `KUL-I-306` dan sudah menempuh `KUL-I-102` (struktur data). 2 SKS, jalur
I; 14 pertemuan, ujian tengah sesudah pertemuan 7 dan ujian akhir sesudah
pertemuan 14 `[asumsi]` (silabus 2.3). Beban per pertemuan lebih kecil daripada
mata kuliah 3 SKS, bukan lebih sedikit pertemuan.

Silabus tidak menetapkan bahasa untuk mata kuliah ini. Pilihan penulis
`[asumsi]`: **Python 3.12 dengan pustaka standar saja**. Gambar disimpan dalam
daftar dua dimensi dan dicetak sebagai teks, sehingga setiap contoh berjalan
tanpa jendela, kartu grafis, atau pemasangan paket, dan keluarannya sama di
setiap mesin. Konsepnya (piksel, tepi, matriks, acara) berlaku sama di
Canvas, OpenGL, atau mesin permainan. Setiap blok lengkap sudah dijalankan dan
keluarannya sama dengan yang tertulis; blok `setengah-jadi` sengaja berlubang.
Contoh terselesaikan penuh hanya untuk konsep baru; sisanya membaca kode,
menebak keluaran, dan menguji.

## Peta semester

| Pertemuan | Bagian: pokok bahasan | CPMK | Kuis pembuka (jarak) |
| --- | --- | --- | --- |
| 1 | B1: kanvas dan piksel | C1 | `KUL-I-102`: struktur data |
| 2 | B1: garis | C1 | 1, lalu `KUL-I-304`: umpan balik |
| 3 | B1: gunting dan warna; **kuis kumulatif 1** | C1 | 2, lalu 1 |
| 4 | B1: segitiga terisi | C1 | 3, lalu `KUL-I-101`: larik dua dimensi |
| 5 | B1: segitiga merosot, ringkasan | C1 | 4, lalu 2 |
| 6 | B2: translasi dan skala | C1 | 5, lalu 3 |
| 7 | B2: rotasi; **kuis kumulatif 2** | C1 | 6, lalu 4 |
| ujian tengah | Ujian praktik, tanpa AI | C1 | |
| 8 | B2: matriks homogen | C1 | 7, lalu 5 |
| 9 | B2: urutan komposisi | C1 | 8, lalu 6 |
| 10 | B2: proyeksi 3D ke 2D; **kuis kumulatif 3** | C1 | 9, lalu 7 |
| 11 | B3: acara dan keadaan | C2 | 10, lalu 8 |
| 12 | B3: uji tabrak dan seret | C2 | 11, lalu 9 |
| 13 | B3: waktu dan animasi | C2 | 12, lalu 10 |
| 14 | B3: proyek; **kuis kumulatif akhir** | C2 | 13, lalu 1 sampai 12 |
| ujian akhir | Ujian praktik, tanpa AI | C1 sampai C2 | |

## Ingat kembali

Tiap pertemuan dibuka kuis 5 menit **tanpa catatan**, 3 sampai 5 soal dari asal
pada kolom terakhir peta; jaraknya bertambah. Contoh pertemuan 1 sampai 3:

1. Mengapa elemen larik dua dimensi diakses dengan dua indeks, dan apa yang
   terjadi bila indeks melewati batas? (`KUL-I-101`)
2. Mengapa memilih struktur data menurut operasi yang paling sering dipakai?
   (`KUL-I-102`)
3. Sebut dua heuristik terkait umpan balik (visibilitas status sistem dan
   pencegahan galat) dan beri satu contoh pada antarmuka interaktif.
   (`KUL-I-304`)

Soal 3 dasar bagian 3. Mengingat dengan usaha, bukan membaca ulang, yang
membuat ingatan bertahan.

## Tujuan

Pada akhir semester kamu dapat (CPMK, silabus bagian 3.1):

- **C1** menjelaskan dasar grafika;
- **C2** membuat visual interaktif sederhana.

## Bagian 1: Rendering dasar (pertemuan 1 sampai 5)

Layar adalah kisi piksel. Program menyimpan kisi itu di memori, yaitu
**framebuffer**, mengisinya, lalu menampilkannya. **Rasterisasi** mengubah
bentuk geometri (garis, segitiga) menjadi piksel yang menyala. Garis lurus
harus dipilihkan piksel terdekat: algoritma **Bresenham** melakukannya hanya
dengan bilangan bulat, dengan melacak galat jarak ke garis ideal. Piksel di
luar kanvas dibuang (**gunting**), bukan ditulis ke memori lain. Segitiga
terisi diuji piksel demi piksel dengan **fungsi tepi**: titik berada di dalam
bila ia berada di sisi yang sama dari ketiga tepi.

### Prediksi dulu

Garis dari `(0, 0)` ke `(11, 4)` pada kanvas 12 kali 7: berapa piksel
dihasilkan, dan apakah ia bergerak satu piksel per kolom atau per baris? Garis
dari `(-3, 1)` ke `(14, 1)`: berapa piksel dihasilkan, berapa yang tergambar?

### Contoh terselesaikan

```python
LEBAR, TINGGI = 12, 7


def kanvas():
    return [["." for _ in range(LEBAR)] for _ in range(TINGGI)]


def titik(k, x, y, ch="#"):
    if 0 <= x < LEBAR and 0 <= y < TINGGI:  # gunting: di luar kanvas diabaikan
        k[y][x] = ch


def garis(k, x0, y0, x1, y1):
    dx, dy = abs(x1 - x0), -abs(y1 - y0)
    sx = 1 if x0 < x1 else -1
    sy = 1 if y0 < y1 else -1
    galat = dx + dy
    jumlah = 0
    while True:
        titik(k, x0, y0)
        jumlah += 1
        if x0 == x1 and y0 == y1:
            return jumlah
        e2 = 2 * galat
        if e2 >= dy:
            galat += dy
            x0 += sx
        if e2 <= dx:
            galat += dx
            y0 += sy


k = kanvas()
n = garis(k, 0, 0, 11, 4)
print("titik:", n)
print("\n".join("".join(b) for b in k))
print("curam:", garis(kanvas(), 2, 0, 4, 6), "keluar kanvas:", garis(kanvas(), -3, 1, 14, 1))
# keluaran:
# titik: 12
# ##..........
# ..###.......
# .....##.....
# .......###..
# ..........##
# ............
# ............
# curam: 7 keluar kanvas: 18
```

Garis landai menghasilkan 12 piksel: satu per kolom (jumlah titik adalah
`max(dx, dy) + 1`), dan baris naik sesekali. Garis curam dari `(2, 0)` ke
`(4, 6)` menghasilkan 7 piksel: satu per baris. Garis keluar kanvas
menghasilkan 18 titik, tetapi hanya 12 yang tertulis; tanpa gunting, indeks
negatif Python justru menulis dari **ujung lain** larik tanpa galat. Itu cacat
yang sunyi, bukan kegagalan yang terlihat.

Berikutnya, segitiga terisi. Fungsi tepi bernilai positif atau negatif menurut
sisi garis; titik di dalam bila ketiga nilainya bertanda sama.

```python
LEBAR, TINGGI = 14, 8


def tepi(a, b, p):
    """Tanda menyatakan di sisi mana p dari garis a ke b."""
    return (b[0] - a[0]) * (p[1] - a[1]) - (b[1] - a[1]) * (p[0] - a[0])


def segitiga(k, a, b, c, ch="#"):
    luas2 = tepi(a, b, c)
    if luas2 == 0:
        return 0  # segitiga merosot: ketiga titik segaris
    isi = 0
    for y in range(TINGGI):
        for x in range(LEBAR):
            p = (x + 0.5, y + 0.5)  # pusat piksel
            w = (tepi(b, c, p), tepi(c, a, p), tepi(a, b, p))
            if all(v * luas2 >= 0 for v in w):  # ketiga tepi satu sisi
                k[y][x] = ch
                isi += 1
    return isi


k = [["." for _ in range(LEBAR)] for _ in range(TINGGI)]
n = segitiga(k, (1, 1), (12, 2), (4, 7))
print("piksel terisi:", n, " luas sebenarnya:", abs(tepi((1, 1), (12, 2), (4, 7))) / 2)
print("\n".join("".join(b) for b in k))
print("urutan dibalik:", segitiga([["." for _ in range(LEBAR)] for _ in range(TINGGI)], (1, 1), (4, 7), (12, 2)))
print("segaris:", segitiga([["." for _ in range(LEBAR)] for _ in range(TINGGI)], (0, 0), (3, 3), (6, 6)))
# keluaran:
# piksel terisi: 32  luas sebenarnya: 31.5
# ..............
# .######.......
# ..#########...
# ..########....
# ...#####......
# ...###........
# ....#.........
# ..............
# urutan dibalik: 32
# segaris: 0
```

Jumlah piksel (32) mendekati luas (31,5) tetapi tidak sama: piksel hanya
menyala atau tidak, dan tepi segitiga memotong piksel. Perkalian `v * luas2`
membuat urutan titik (searah atau berlawanan jarum jam) tidak berpengaruh,
sehingga "urutan dibalik" memberi hasil sama. Ketiga titik segaris tidak
membentuk daerah, jadi nol. Kasus seperti ini mudah terlewat, termasuk
pada kode yang dibangkitkan AI, sehingga perlu diuji sendiri.

### Contoh setengah jadi

```python setengah-jadi
def tepi(a, b, p):
    return (b[0] - a[0]) * (p[1] - a[1]) - (b[1] - a[1]) * (___)


# titik p di dalam segitiga bila ketiga nilai tepi memiliki tanda ___
```

```text setengah-jadi
// garis (0,0) ke (7,3): jumlah titik = ___
// garis (2,5) ke (2,5): jumlah titik = ___
// garis (1,1) ke (-4,1) pada kanvas selebar 12: dihasilkan ___ , tergambar ___
```

### Latihan

1. **Ubah:** gambar garis dari `(11, 6)` ke `(0, 0)` dan bandingkan hasilnya
   dengan arah sebaliknya; prediksi dulu apakah polanya sama.
2. **Buat:** `persegi(k, x, y, l, t)` terisi, memakai `titik` agar otomatis
   digunting; ujilah pada persegi yang sebagian di luar kanvas.
3. **Jelaskan:** mengapa jumlah piksel segitiga tidak persis sama dengan
   luasnya, dan mengapa pusat piksel (`x + 0.5`) dipakai?
4. **Berpasangan (praktikum):** pengemudi dan navigator bertukar peran tiap
   sekitar 10 menit; pasangan dibentuk acak per bagian, tugas yang dinilai tetap
   perorangan. Satu orang menggambar segitiga di kertas berpetak, satunya
   menandai piksel yang akan menyala sebelum program dijalankan.

## Bagian 2: Transformasi (pertemuan 6 sampai 10)

**Transformasi** memindahkan, memutar, atau mengubah ukuran bentuk tanpa
menggambarnya ulang titik demi titik. Tiga transformasi dasar di bidang:
**translasi** (geser), **skala**, dan **rotasi**. Translasi tidak dapat ditulis
sebagai perkalian matriks 2x2, sehingga titik diberi koordinat ketiga bernilai 1
(**koordinat homogen**) dan semua transformasi menjadi matriks 3x3. Keuntungannya:
rangkaian transformasi digabung menjadi **satu matriks** lewat perkalian.
Perkalian matriks **tidak komutatif**: `A * B` berarti B diterapkan lebih dulu,
lalu A. Memutar mengelilingi titik selain asal dilakukan dengan tiga langkah:
geser titik itu ke asal, putar, geser kembali. Sumbu y layar mengarah ke bawah,
jadi "putar 90 derajat" tampak searah jarum jam bila diukur dari tampilan.

Untuk 3D, **proyeksi perspektif** menyusutkan benda yang jauh: titik `(x, y, z)`
digambar di `(f * x / z, f * y / z)` dengan `f` panjang fokus. **Proyeksi
ortografik** hanya membuang `z`, sehingga ukuran tidak menyusut.

### Prediksi dulu

Titik `(2, 0)`: bila diputar 90 derajat lalu digeser `(5, 0)`, di mana ia? Bila
digeser dulu lalu diputar? Dan sebuah sudut kubus `(1, 1, 3)` dengan `f = 2`:
di mana ia terproyeksi, dan bila `z` menjadi 4?

### Contoh terselesaikan

```python
import math


def kali(a, b):
    return [[sum(a[i][k] * b[k][j] for k in range(3)) for j in range(3)] for i in range(3)]


def geser(tx, ty):
    return [[1, 0, tx], [0, 1, ty], [0, 0, 1]]


def skala(sx, sy):
    return [[sx, 0, 0], [0, sy, 0], [0, 0, 1]]


def putar(derajat):
    t = math.radians(derajat)
    c, s = math.cos(t), math.sin(t)
    return [[c, -s, 0], [s, c, 0], [0, 0, 1]]


def terap(m, p):
    x, y = p
    return (round(m[0][0] * x + m[0][1] * y + m[0][2], 3), round(m[1][0] * x + m[1][1] * y + m[1][2], 3))


P = (2, 0)
print("putar 90 lalu geser:", terap(kali(geser(5, 0), putar(90)), P))
print("geser lalu putar 90:", terap(kali(putar(90), geser(5, 0)), P))

# putar 90 derajat mengelilingi (4, 4) = geser ke asal, putar, geser balik
sekitar = kali(geser(4, 4), kali(putar(90), geser(-4, -4)))
print("putar mengelilingi (4,4):", terap(sekitar, (6, 4)))

# 3D: kubus satuan di depan kamera, kamera di asal melihat ke +z, panjang fokus f
f = 2.0
kubus = [(x, y, z) for z in (3, 4) for y in (-1, 1) for x in (-1, 1)]


def perspektif(p):
    x, y, z = p
    return (round(f * x / z, 3), round(f * y / z, 3))


for p in kubus[:4]:
    print("dekat", p, "->", perspektif(p))
for p in kubus[4:6]:
    print("jauh ", p, "->", perspektif(p))
print("ortografik tak menyusut:", [(x, y) for x, y, z in kubus[:2]] == [(x, y) for x, y, z in kubus[4:6]])
# keluaran:
# putar 90 lalu geser: (5.0, 2.0)
# geser lalu putar 90: (0.0, 7.0)
# putar mengelilingi (4,4): (4.0, 6.0)
# dekat (-1, -1, 3) -> (-0.667, -0.667)
# dekat (1, -1, 3) -> (0.667, -0.667)
# dekat (-1, 1, 3) -> (-0.667, 0.667)
# dekat (1, 1, 3) -> (0.667, 0.667)
# jauh  (-1, -1, 4) -> (-0.5, -0.5)
# jauh  (1, -1, 4) -> (0.5, -0.5)
# ortografik tak menyusut: True
```

Urutan mengubah hasil: `(5, 2)` berbeda dari `(0, 7)`. `kali(geser, putar)`
menerapkan putar lebih dulu, sebab matriks paling kanan bekerja pada titik
terlebih dahulu. Rotasi mengelilingi `(4, 4)` memetakan `(6, 4)` ke `(4, 6)`:
selisihnya dari pusat `(2, 0)` berputar menjadi `(0, 2)`. Pembulatan `round`
diperlukan sebab `cos(90°)` pada pecahan biner bukan persis nol (kira-kira
`6e-17`). Pada perspektif, sudut yang sama ditarik ke `(0,667; 0,667)` pada
`z = 3` dan ke `(0,5; 0,5)` pada `z = 4`: makin jauh makin dekat ke pusat.
`z` nol atau negatif membuat rumus ini tak bermakna: titik berada di belakang
kamera dan harus dibuang lebih dulu.

### Contoh setengah jadi

```python setengah-jadi
# skala 2x mengelilingi titik (1, 1):
m = kali(geser(1, 1), kali(skala(2, 2), geser(___, ___)))
# terap(m, (3, 1)) = ___
```

```text setengah-jadi
// skala(2, 3) diterapkan pada (1, 1), lalu geser(1, 1): hasil = ___
// geser(1, 1) dulu, lalu skala(2, 3): hasil = ___
```

### Latihan

1. **Ubah:** ganti `putar(90)` dengan `putar(45)`; prediksi apakah hasilnya
   bilangan bulat, lalu jalankan.
2. **Buat:** `cermin_x()` (memantulkan terhadap sumbu x) sebagai matriks 3x3,
   dan buktikan ia sendiri-balik: `cermin_x * cermin_x` adalah matriks identitas.
3. **Jelaskan:** mengapa rangkaian seribu transformasi lebih murah digabung
   menjadi satu matriks lebih dulu daripada diterapkan satu per satu pada
   sejuta titik?
4. **Berpasangan:** satu orang menyebut urutan tiga transformasi dalam kata,
   satunya menuliskan perkalian matriksnya dan memeriksa urutan kiri ke kanan.

## Bagian 3: Interaksi dan proyek (pertemuan 11 sampai 14)

Program interaktif berjalan sebagai **lingkaran acara**: tunggu acara (gerak
kursor, tekan, lepas, ketukan waktu), ubah **keadaan**, gambar ulang. Pisahkan
**pembaruan keadaan** dari **penggambaran**: pembaruan murni dapat diuji dengan
deretan acara buatan tanpa layar. **Uji tabrak** menentukan apakah titik berada
di dalam bentuk (untuk persegi: empat perbandingan). **Seret** menyimpan selisih
antara kursor dan pojok bentuk saat ditekan, supaya bentuk tidak melompat ke
kursor. Untuk animasi, langkah simulasi dibuat **tetap** (misalnya 0,1 detik)
dan waktu bingkai yang tidak tetap dikumpulkan di sisa waktu; hasil simulasi
menjadi tak bergantung pada kecepatan mesin. Umpan balik pada antarmuka
(`KUL-I-304`): status harus terlihat; sorotan **tidak boleh hanya warna**
(di contoh: bentuk isian berubah `#` menjadi `+` dan `O`).

### Prediksi dulu

Kotak 4x3 di `(2, 1)` pada kanvas 16x6. Kursor ditekan di `(3, 2)`, digeser ke
`(9, 3)`, lalu ke `(40, 40)` di luar kanvas, lalu dilepas. Gambar kotak pada
`(9, 3)`, dan tebak posisi akhirnya.

### Contoh terselesaikan

```python
import hashlib

LEBAR, TINGGI = 16, 6


class Kotak:
    def __init__(self, x, y, l, t):
        self.x, self.y, self.l, self.t = x, y, l, t

    def kena(self, px, py):  # uji tabrak titik-persegi
        return self.x <= px < self.x + self.l and self.y <= py < self.y + self.t


class Keadaan:
    def __init__(self):
        self.kotak = Kotak(2, 1, 4, 3)
        self.seret = None  # selisih posisi kursor ke pojok kotak saat ditekan
        self.sorot = False
        self.catatan = []


def perbarui(s, acara):
    """Hanya mengubah keadaan; tidak menggambar."""
    jenis, x, y = acara
    if jenis == "gerak":
        s.sorot = s.kotak.kena(x, y)
        if s.seret is not None:
            s.kotak.x = max(0, min(LEBAR - s.kotak.l, x - s.seret[0]))
            s.kotak.y = max(0, min(TINGGI - s.kotak.t, y - s.seret[1]))
    elif jenis == "tekan" and s.kotak.kena(x, y):
        s.seret = (x - s.kotak.x, y - s.kotak.y)
        s.catatan.append("mulai seret")
    elif jenis == "lepas" and s.seret is not None:
        s.seret = None
        s.catatan.append("selesai seret")


def gambar(s):
    k = [["." for _ in range(LEBAR)] for _ in range(TINGGI)]
    isi = "O" if s.seret is not None else ("+" if s.sorot else "#")  # umpan balik: bentuk, bukan hanya warna
    for yy in range(s.kotak.y, s.kotak.y + s.kotak.t):
        for xx in range(s.kotak.x, s.kotak.x + s.kotak.l):
            k[yy][xx] = isi
    return "\n".join("".join(b) for b in k)


ACARA = [("gerak", 0, 0), ("gerak", 3, 2), ("tekan", 3, 2), ("gerak", 9, 3), ("gerak", 40, 40), ("lepas", 40, 40)]

s = Keadaan()
for a in ACARA:
    perbarui(s, a)
    if a[0] == "gerak" and a[1:] == (9, 3):
        print(gambar(s))
        print("--")
print(gambar(s))
print(s.catatan, (s.kotak.x, s.kotak.y))
print("sidik:", hashlib.sha256(gambar(s).encode()).hexdigest()[:12])
# keluaran:
# ................
# ................
# ........OOOO....
# ........OOOO....
# ........OOOO....
# ................
# --
# ................
# ................
# ................
# ............####
# ............####
# ............####
# ['mulai seret', 'selesai seret'] (12, 3)
# sidik: 722deba2d23b
```

Saat kursor di `(9, 3)` kotak berada di `(8, 2)`, bukan `(9, 3)`: selisih `(1, 1)`
dari penekanan dipertahankan. Saat kursor jauh di luar kanvas, `max` dan `min`
**menjepit** kotak di pojok kanan bawah `(12, 3)`. Setelah dilepas, isian
kembali `#`. **Sidik** (hash) keluaran menjadi uji acuan: acara yang sama harus
memberi sidik yang sama; bila sidik berubah, manusia memeriksa gambarnya dulu
sebelum sidik acuan diganti, sebab menyetujui perubahan tanpa melihat sama
dengan tidak menguji. Pemisahan ini juga membuat kode yang dibangkitkan AI
dapat diperiksa tanpa membuka jendela.

Berikutnya, waktu: langkah tetap membuat hasil sama pada mesin yang lancar atau
tersendat.

```python
DT = 0.1  # langkah simulasi tetap (detik)
KECEPATAN = 3.0  # satuan per detik


def jalankan(durasi_bingkai):
    x, sisa, langkah = 0.0, 0.0, 0
    for d in durasi_bingkai:
        sisa += d
        while sisa >= DT:
            x += KECEPATAN * DT
            sisa -= DT
            langkah += 1
    return round(x, 3), langkah, round(sisa, 3)


lancar = [0.1] * 10  # 10 bingkai per detik
tersendat = [0.25, 0.05, 0.4, 0.1, 0.2]  # jumlahnya juga 1,0 detik
print("lancar   :", jalankan(lancar))
print("tersendat:", jalankan(tersendat))
print("sisa 0,35:", jalankan([0.35]))
# keluaran:
# lancar   : (3.0, 10, 0.0)
# tersendat: (3.0, 10, 0.0)
# sisa 0,35: (0.9, 3, 0.05)
```

Dua deret bingkai berjumlah 1,0 detik memberi 10 langkah dan posisi 3,0.
Bingkai 0,35 detik menjalankan tiga langkah dan menyisakan 0,05 detik untuk
bingkai berikutnya. Kekeliruan umum: memakai durasi bingkai langsung sebagai
langkah, sehingga hasil permainan berbeda di mesin cepat dan lambat. Catatan
untuk karya yang dipublikasikan: **hindari kedipan** layar lebih dari tiga kali
per detik, sebab itu dapat memicu kejang pada sebagian orang; kriteria WCAG
2.3.1 (Tiga Kilatan atau di Bawah Ambang) menjadi acuan.

### Contoh setengah jadi

```python setengah-jadi
def perbarui_seret(s, x, y):
    s.kotak.x = max(0, min(LEBAR - s.kotak.l, ___ - s.seret[0]))
    s.kotak.y = max(___, min(TINGGI - s.kotak.t, y - s.seret[1]))
```

```text setengah-jadi
// langkah tetap 0,1 detik; satu bingkai 0,27 detik: langkah dijalankan = ___, sisa = ___
// dua heuristik umpan balik untuk kotak yang diseret: ___ ; ___
```

### Latihan

1. **Ubah:** tambahkan acara `("gerak", 5, 5)` saat kotak sedang diseret dan
   prediksi gambarnya; lalu ubah kanvas menjadi 10x5 dan prediksi ulang.
2. **Buat:** tombol kedua (kotak lain) dengan uji tabrak sendiri; bila dua
   kotak tertumpuk di bawah kursor, tentukan mana yang menerima tekan dan
   tuliskan aturannya.
3. **Jelaskan:** mengapa uji acuan berbasis sidik tidak cukup dan bagaimana
   manusia melengkapinya?
4. **Berpasangan (proyek):** rancang visual interaktif kecil (misalnya kotak
   yang diseret dan dikecilkan dengan tombol). Satu orang menuliskan deretan
   acara untuk tiga skenario, satunya menuliskan keadaan yang diharapkan sebelum
   program dijalankan.

## Latihan bercampur

Soal berikut **tidak menyebut** topiknya. Contoh: "Titik berpindah ke tempat
yang berbeda hanya karena dua langkah ditukar urutannya"; "Gambar benar di
komputer cepat dan aneh di komputer lambat"; "Garis di tepi kanvas mengubah
piksel di sisi seberang". Kuis kumulatif (pertemuan 3, 7, 10, 14) berbentuk
sama.

## Ulang berjarak

Kerjakan ulang tanpa melihat solusi lama:

- satu minggu setelah bagian: tulis ulang Bresenham, fungsi tepi, atau uji
  tabrak dari ingatan;
- awal bagian baru: dua soal dari bagian sebelumnya;
- semester berikutnya, jawab tanpa catatan (dipakai `KUL-I-401`): mengapa
  pembaruan keadaan dipisah dari penggambaran, dan bagaimana keluaran visual
  diuji dengan sidik acuan; mengapa lisensi gambar dan font aset perlu dicek
  sebelum dirilis.

## Kebijakan AI dan log pemakaian

Silabus bagian 6.3 **belum menyatakan** tingkat AI mata kuliah ini. Modul
memakai usulan baku `[asumsi]` (Q2 rancangan): **Kuning** untuk tugas
mengimplementasikan algoritma (garis, segitiga, transformasi), **Hijau** untuk
proyek visual interaktif (dengan log), **Merah** untuk ujian praktik; dosen
menetapkan per tugas. Pada Kuning AI boleh menjelaskan konsep, **tidak** boleh
menghasilkan solusi yang diserahkan, dan hanya sesudah gerbang kesiapan: kamu
dapat (1) menelusuri program pendek, (2) menulis satu uji yang gagal bila kode
salah, (3) menjelaskan kode dengan kata sendiri. Pada Hijau, AI boleh dipakai
dengan pengungkapan ringkas dan **log wajib** di repositorimu sendiri: alat dan
versi, tujuan, perintah, bagian keluaran yang dipakai. Dosen dapat mewawancarai
kodemu. Jangan memasukkan data pribadi, kata sandi, atau kunci ke layanan AI.

**Butir khas: grafika.** Kode grafika, termasuk yang dibangkitkan AI, mudah
keliru pada konvensi (sumbu y ke atas atau ke bawah, urutan perkalian matriks,
indeks lewat batas) dan hasilnya bisa "tampak hampir benar". Verifikasi dengan **kasus bernilai
tangan** (garis 12 piksel, `(5, 2)` bukan `(0, 7)`) dan uji sidik, bukan dengan
sekadar memandang gambar. Aset (gambar, tekstur, font, bunyi) punya lisensi
sendiri: periksa sebelum memakai, dan status hukum hak cipta keluaran AI masih
berkembang (`KUL-I-305`). Jangan memakai foto atau wajah orang nyata sebagai
bahan tanpa izin tertulis.

## Kesalahan umum

- **Menulis di luar kanvas.** Tanpa gunting, indeks negatif menulis dari ujung
  lain larik dan tak ada galat.
- **Membalik urutan transformasi.** `kali(A, B)` menerapkan B lebih dulu.
- **Melupakan titik di belakang kamera** (`z <= 0`) pada proyeksi perspektif.
- **Mencampur penggambaran dengan pembaruan keadaan**, sehingga tak dapat diuji
  tanpa layar.
- **Memakai durasi bingkai langsung sebagai langkah simulasi**, sehingga hasil
  bergantung pada kecepatan mesin.
- **Sorotan yang hanya mengandalkan warna** atau kedipan cepat.

## Cek mandiri

Tutup modul, jawab, baru periksa.

1. Berapa piksel dihasilkan garis dari `(0, 0)` ke `(7, 3)`?
2. Mengapa ketiga tepi segitiga diuji dengan tanda yang sama?
3. Mengapa `geser lalu putar` berbeda dari `putar lalu geser`?
4. Mengapa titik `(1, 1, 3)` berproyeksi ke `(0,667; 0,667)` pada `f = 2`?
5. Mengapa kotak yang diseret perlu menyimpan selisih awal?
6. Apa keuntungan langkah simulasi tetap?

Daftar periksa (kosong; kamu isi sendiri, tidak dikumpulkan):

- [ ] Aku dapat menggambar garis dan segitiga di framebuffer dan menjelaskan
  guntingnya.
- [ ] Aku dapat menyusun matriks transformasi dengan urutan yang benar.
- [ ] Aku dapat membuat visual interaktif dan mengujinya dengan deretan acara.

## Kunci dan petunjuk

- **Ingat kembali:** elemen `larik[baris][kolom]`; melewati batas memberi
  perilaku tak terdefinisi di C++ dan galat di Python. Umpan balik: visibilitas
  status sistem (kotak berubah bentuk saat diseret) dan pencegahan galat
  (kotak dijepit di dalam kanvas).
- **Bagian 1:** prediksi: 12 piksel, satu per kolom; 18 dihasilkan, 12
  tergambar. Setengah jadi: `p[0] - a[0]`; tanda sama (atau nol); lalu 8; 1;
  dihasilkan 6, tergambar 2.
- **Bagian 2:** prediksi `(5, 2)` dan `(0, 7)`; `(0,667; 0,667)` dan
  `(0,5; 0,5)`. Setengah jadi: `-1`, `-1`; `(5, 1)`; lalu `(3, 4)` dan `(4, 6)`.
- **Bagian 3:** kotak di `(8, 2)` saat kursor `(9, 3)`; posisi akhir `(12, 3)`.
  Setengah jadi: `x`; `0`; lalu 2 langkah dan sisa 0,07; dua heuristik: status
  terlihat, pencegahan galat.
- **Cek mandiri:** (1) 8. (2) Ketiganya bertanda sama bila titik di dalam
  daerah. (6) Hasil sama pada mesin cepat dan lambat, dan dapat diuji.
- **Petunjuk bertahap bila macet:** (1) gambar kanvas kecil di kertas berpetak
  dan telusuri tiga piksel pertama; (2) hitung satu titik dengan tangan; (3)
  bandingkan dengan keluaran program di titik yang sama.

## Langkah berikutnya

`KUL-I-401` memakai pemisahan keadaan dan tampilan serta uji acuan dalam
proyek tim; `KUL-I-304` memperdalam evaluasi antarmuka yang kamu bangun di
sini; `KUL-I-305` membahas lisensi aset.

## Catatan untuk dosen

Bobot dan bentuk asesmen berikut **usulan**; prodi menetapkan (silabus 6.1,
6.2): proyek visual interaktif kecil dengan log pemakaian AI, praktikum per
bagian, wawancara kode, kuis kumulatif, ujian praktik tanpa AI. Variasi tugas
per mahasiswa: ukuran kanvas, bentuk, deretan acara. Bahasa Python dan keluaran
teks adalah pilihan penulis `[asumsi]` agar dapat dijalankan tanpa grafis;
prodi dapat menerjemahkan contoh ke C++ atau Canvas browser tanpa mengubah
alurnya. Silabus tidak memuat topik seperti pencahayaan, tekstur, atau
pemrograman GPU; modul ini tidak menambahnya. Pembulatan `(x + 0.5)` pada
segitiga adalah aturan sederhana; aturan tepi atas-kiri tidak dibahas.
