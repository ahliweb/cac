## Untuk siapa modul ini

Modul ini untuk mahasiswa semester 1 dari program studi mana pun yang belum
pernah memprogram. Satu mata kuliah, satu semester: 14 pertemuan, ujian tengah
semester sesudah pertemuan 7, ujian akhir sesudah pertemuan 14 `[asumsi]`
(silabus bagian 2.3). Tidak ada prasyarat mata kuliah. Kamu butuh Python 3 dan
Git di komputermu atau di lab, dan sebuah penyunting teks.

Kode di modul ini adalah **Python 3.12** dengan pustaka standar saja. Tiap
blok lengkap sudah dijalankan penyusun dengan `python3 -I` dan keluarannya
sama dengan yang tertulis; blok berlubang (`___`) adalah latihan, bukan kode
yang berjalan.

Pegang modul ini sebagai pegangan belajar satu semester: baca peta di bawah,
lalu kerjakan tiap bagian **dengan tangan**. Membaca ulang solusi terasa
lancar tetapi tidak membuatmu bisa menulisnya sendiri.

## Peta semester

| Pertemuan | Bagian | Pokok bahasan | CPMK | Kuis pembuka (jarak) |
| --- | --- | --- | --- | --- |
| 1 | 1 | Dekomposisi, pola, abstraksi, algoritma | C1 | pengetahuan sehari-hari |
| 2 | 1 | Nilai, variabel, ekspresi, masukan dan keluaran | C2 | pertemuan 1 |
| 3 | 1 | Percabangan | C2 | 2, lalu 1 |
| 4 | 2 | Perulangan | C2 | 3, lalu 1 |
| 5 | 2 | Fungsi | C2 | 4, lalu 2 |
| 6 | 2 | Daftar (*list*) | C2 | 5, lalu 3 |
| 7 | 3 | Kamus (*dict*) dan himpunan (*set*); **kuis kumulatif 1** | C2 | 6, lalu 2 dan 4 |
| ujian tengah | | Ujian praktik langsung, tanpa AI | C1–C2 | |
| 8 | 4 | Berkas teks | C2 | 7, lalu 5 |
| 9 | 4 | Berkas CSV | C2 | 8, lalu 6 |
| 10 | 4 | Modul dan pustaka standar | C2 | 9, lalu 4 |
| 11 | 5 | Pengujian dasar; **gerbang kesiapan AI** | C3 | 10, lalu 5 dan 7 |
| 12 | 5 | Git dasar | C4 | 11, lalu 8 |
| 13 | 6 | Proyek kecil I (berpasangan) | C1–C4 | 12, lalu 3 dan 9 |
| 14 | 6 | Proyek kecil II, refleksi; **kuis kumulatif 2** | C1–C4 | 13, lalu 1 sampai 12 |
| ujian akhir | | Ujian praktik langsung, tanpa AI | C1–C4 | |

## Ingat kembali

Tiap pertemuan dibuka dengan kuis 5 menit **tanpa catatan**, 3 sampai 5
soal pendek. Kolom terakhir peta menunjukkan dari mana soalnya: minggu lalu,
lalu minggu yang lebih jauh. Jaraknya bertambah, jadi pertemuan 14 memuat soal
dari pertemuan 1. Kuis tidak dinilai besar; tujuannya melatih mengingat.
Contoh soal pembuka pertemuan 6 (dari pertemuan 5 dan 3):

1. Tuliskan tanda tangan (kepala) fungsi bernama `luas` yang menerima `p` dan
   `l`.
2. Apa beda `if` dan `elif`?
3. Apa yang dicetak `print(2 + 3 * 4)`?

Setiap bagian di bawah memuat banyak soal; tugasmu mengerjakannya **sebelum**
melihat kunci di bagian "Kunci dan petunjuk".

## Tujuan

Pada akhir semester kamu dapat (CPMK, silabus bagian 3.1):

- **C1** menguraikan masalah menjadi langkah (dekomposisi, pola, abstraksi,
  algoritma);
- **C2** menulis program Python dengan variabel, percabangan, perulangan,
  fungsi, dan koleksi;
- **C3** menguji dan memperbaiki program dengan kasus uji sederhana;
- **C4** menyimpan dan membagikan kode dengan Git.

## Bagian 1: Berpikir komputasional dan Python pertama (pertemuan 1 sampai 3)

Mulai dari masalah di luar komputer. Menyiapkan satu gelas teh adalah
**algoritma**: urutan langkah yang tepat. **Dekomposisi** memecahnya
(siapkan gelas, siapkan air, seduh). **Pola** mengenali bagian yang berulang
(aduk sepuluh kali). **Abstraksi** mengabaikan yang tidak perlu (merek teh).

### Prediksi dulu

Tanpa menjalankan, tulis keluaran program ini dan tabel nilai tiap variabel
setelah tiap baris:

```python
harga = 5000
jumlah = 3
total = harga * jumlah
if total > 12000:
    total = total - 2000
print("Total:", total)
```

Baru setelah menuliskannya, jalankan dan cocokkan. Selisih antara prediksi
dan hasil adalah bahan belajar paling berharga minggu ini.

### Contoh terselesaikan

Masalah: ubah nilai angka menjadi huruf. Ambang di bawah adalah **contoh
sintetis**, bukan ketentuan kampus mana pun.

```python
nilai = 72
if nilai >= 80:
    huruf = "A"
elif nilai >= 65:
    huruf = "B"
else:
    huruf = "C"
print(huruf)
# keluaran: B
```

Telusuri: `72 >= 80` salah, `72 >= 65` benar, jadi `huruf` menjadi `"B"` dan
cabang `else` tidak dijalankan. Perhatikan urutan: syarat yang lebih ketat
ditulis dulu; kalau dibalik, semua nilai di atas 65 menjadi `"B"`.

### Contoh setengah jadi

Lengkapi tiga tempat `___` agar program menghitung ongkos kirim: gratis bila
belanja minimal 100000, selain itu 10000.

```python
belanja = int(input("Belanja: "))
if belanja ___ 100000:
    ongkos = ___
else:
    ongkos = ___
print("Ongkos:", ongkos)
```

### Susun urutannya

Susun baris-baris acak ini menjadi program yang mencetak "genap" atau
"ganjil" untuk `n = 7`. Indentasi ditentukan sendiri.

```text
print("ganjil")
if n % 2 == 0:
n = 7
else:
print("genap")
```

### Latihan

1. **Ubah:** modifikasi program nilai agar ada huruf `"D"` untuk nilai di
   bawah 50.
2. **Buat:** tulis program yang membaca suhu dan mencetak "dingin" (di bawah
   20), "sejuk" (20 sampai 29), atau "panas" (30 ke atas).
3. **Jelaskan:** dengan kalimatmu sendiri, mengapa `elif` bukan `if`
   terpisah.
4. **Berpasangan (pertemuan lab):** satu orang mengetik (pengemudi), satu
   orang mengarahkan (navigator); bertukar peran setiap 10 menit.

## Bagian 2: Perulangan, fungsi, dan daftar (pertemuan 4 sampai 6)

### Prediksi dulu

Apa keluaran program ini? Tulis tiap baris keluarannya:

```python
total = 0
for angka in [4, 7, 1]:
    total = total + angka
    print(angka, total)
```

### Contoh terselesaikan

Fungsi yang menghitung rata-rata dan menangani daftar kosong:

```python
def rata_rata(daftar):
    if len(daftar) == 0:
        return None
    return sum(daftar) / len(daftar)


print(rata_rata([70, 80, 90]))
print(rata_rata([]))
# keluaran:
# 80.0
# None
```

Alasan: pembagian dengan nol terjadi bila daftar kosong, jadi kasus itu
ditangani **sebelum** menghitung. Mengamankan kasus tepi dulu adalah
kebiasaan, bukan kebetulan.

Tabel penelusuran untuk `rata_rata([70, 80, 90])`, satu baris tiap langkah:

| Langkah | `len(daftar)` | `sum(daftar)` | Dikembalikan |
| --- | --- | --- | --- |
| cek kosong | 3 | | (tidak, lanjut) |
| hitung | 3 | 240 | 240 / 3 = 80.0 |

Buat tabel sejenis di kertas untuk setiap fungsi baru sebelum
mengujinya di komputer. Menelusuri dengan tangan adalah keterampilan, dan
keterampilan hanya tumbuh kalau dilatih tanpa bantuan.

**Tata cara kerja berpasangan.** Pasangan dibentuk acak per bagian agar
tidak menetap. Pengemudi tidak boleh mengetik apa pun yang belum dikatakan
navigator dengan kata-kata; navigator tidak boleh menyentuh papan ketik.
Bertukar peran tiap 10 menit. Bila pasangan terlalu timpang kemampuannya,
beri tahu dosen; tantangan terbesar kerja berpasangan memang kecocokan dan
penjadwalan, bukan teknisnya. Semua tugas yang dinilai tetap dikerjakan
sendiri.

### Contoh setengah jadi

Lengkapi fungsi yang mengembalikan nilai terbesar, atau `None` bila kosong:

```python
def terbesar(daftar):
    if ___:
        return None
    hasil = daftar[0]
    for x in ___:
        if x > hasil:
            hasil = ___
    return hasil
```

### Latihan

1. **Ubah:** buat `rata_rata` mengabaikan nilai negatif.
2. **Buat:** fungsi `hitung_genap(daftar)` yang mengembalikan banyaknya
   bilangan genap.
3. **Telusuri:** buat tabel nilai `hasil` dan `x` untuk
   `terbesar([3, 9, 4])`.
4. **Berpasangan:** pasangan menukar fungsi dan **mencoba mematahkannya**
   dengan tiga masukan, termasuk daftar kosong.

## Bagian 3: Kamus dan himpunan (pertemuan 7)

### Prediksi dulu

```python
stok = {"pensil": 10, "buku": 4}
stok["buku"] = stok["buku"] + 6
stok["penghapus"] = 2
print(sorted(stok.items()))
```

### Contoh terselesaikan

Menghitung frekuensi kata dari teks sintetis dengan kamus:

```python
teks = "kopi teh kopi susu teh kopi"
frekuensi = {}
for kata in teks.split():
    frekuensi[kata] = frekuensi.get(kata, 0) + 1
print(sorted(frekuensi.items()))
print(len(set(teks.split())))
# keluaran:
# [('kopi', 3), ('susu', 1), ('teh', 2)]
# 3
```

`get(kata, 0)` memberi 0 untuk kata yang belum ada. `set` membuang kembaran,
jadi panjangnya adalah banyaknya kata berbeda.

### Contoh setengah jadi

Lengkapi program yang mencari barang yang stoknya kurang dari 5:

```python
stok = {"pensil": 10, "buku": 4, "penggaris": 2}
menipis = []
for nama, jumlah in stok.___():
    if jumlah ___ 5:
        menipis.append(nama)
print(sorted(menipis))
```

Setelah lengkap, ubah agar yang dicetak adalah **berapa** barang yang menipis.
Perubahan kecil seperti ini melatih membaca kode orang lain, keterampilan yang
dipakai hampir tiap hari saat bekerja.

### Latihan

1. **Buat:** hitung frekuensi huruf pada satu kata.
2. **Pilih:** untuk (a) daftar nama berurutan, (b) pencarian harga menurut
   nama barang, (c) membuang kembaran, pilih `list`, `dict`, atau `set` dan
   jelaskan satu alasan tiap pilihan.

## Bagian 4: Berkas, CSV, dan pustaka standar (pertemuan 8 sampai 10)

### Prediksi dulu

```python
import csv
import io

data = "kategori,jumlah\nalat tulis,3\nbuku,5\nalat tulis,4\n"
total = {}
for baris in csv.DictReader(io.StringIO(data)):
    kunci = baris["kategori"]
    total[kunci] = total.get(kunci, 0) + int(baris["jumlah"])
print(total)
```

### Contoh terselesaikan

Program di atas membaca teks CSV seolah-olah berkas. Untuk berkas sungguhan,
ganti `io.StringIO(data)` dengan berkas yang dibuka dalam blok `with`, supaya
tertutup otomatis (simpan teks `data` di atas sebagai `penjualan.csv` di folder
kerjamu):

```python
import csv

with open("penjualan.csv", newline="", encoding="utf-8") as f:
    for baris in csv.DictReader(f):
        print(baris["kategori"], baris["jumlah"])
```

Data CSV di mata kuliah ini **sintetis atau terbuka**, tidak berisi data
pribadi. Kolom nilai selalu berupa teks, jadi diubah dengan `int(...)` atau
`float(...)` sebelum dijumlahkan.

### Contoh setengah jadi

Tulis ulang program prediksi di atas sebagai fungsi `jumlah_per_kategori(teks_csv)`
yang mengembalikan kamus. Hanya baris `return` yang disediakan.

### Latihan

1. **Buat:** tambah kolom `harga` dan hitung total pendapatan per kategori.
2. **Selidiki:** apa yang terjadi bila satu sel `jumlah` berisi `"tiga"`?
   Rancang cara program memberi pesan yang jelas.
3. **Baca dokumentasi:** buka halaman `csv` di dokumentasi resmi Python dan
   temukan cara menulis berkas CSV; tulis satu contoh sendiri.

## Bagian 5: Pengujian dan Git (pertemuan 11 dan 12)

### Prediksi dulu

Mana yang akan lolos dan mana yang gagal?

```python
def rata_rata_salah(daftar):
    return sum(daftar) / (len(daftar) + 1)


assert rata_rata_salah([70, 80, 90]) == 80
```

### Contoh terselesaikan

Uji yang baik **gagal bila kodenya salah**. Pada contoh di atas `assert`
gagal dengan `AssertionError`, karena hasilnya 60.0 dan bukan 80.0. Versi
benar dengan beberapa kasus uji, termasuk kasus tepi:

```python
def rata_rata(daftar):
    if len(daftar) == 0:
        return None
    return sum(daftar) / len(daftar)


assert rata_rata([70, 80, 90]) == 80
assert rata_rata([5]) == 5
assert rata_rata([]) is None
print("semua uji lolos")
# keluaran: semua uji lolos
```

**Gerbang kesiapan AI (pertemuan 11).** Kamu siap memakai asisten AI pada
tugas Kuning bila dapat (1) menelusuri program pendek, (2) menulis satu uji
yang gagal bila kode salah, dan (3) menjelaskan kode dengan kata sendiri.
Kerjakan tiga hal itu tanpa AI; dosen atau asisten menandai kesiapanmu.

### Git dasar

Di folder baru, perintah ini menyimpan riwayat kodemu. Penyusun menjalankan
urutan yang sama di folder sementara:

```bash
git init
git add rata_rata.py
git commit -m "Tambah fungsi rata_rata dan ujinya"
git log --oneline
```

Perintah `git log --oneline` menampilkan satu baris tiap *commit*: kode
singkat lalu pesan. Pesan yang baik menjelaskan **apa yang berubah dan
mengapa**. Riwayat ini menjadi bukti prosesmu (silabus bagian 6.1).

### Latihan

1. **Uji:** tulis tiga kasus uji untuk `terbesar`, termasuk daftar kosong,
   lalu rusak fungsinya dengan sengaja dan pastikan satu uji gagal.
2. **Git:** buat repositori, simpan dua *commit* dengan pesan yang bermakna.
3. **Berpasangan:** tukar repositori dan baca riwayat *commit* pasanganmu;
   tuliskan satu pertanyaan tentang satu pesan.

## Bagian 6: Proyek kecil (pertemuan 13 dan 14)

Proyek kecil di bidang prodimu, dengan **data sintetis atau terbuka**: mis.
rekap pengeluaran organisasi mahasiswa dari CSV rekaan, atau hitung frekuensi
kata dari teks bebas hak cipta. Syarat: memakai fungsi, daftar atau kamus,
membaca CSV, minimal tiga uji, dan riwayat Git dengan sedikitnya empat
*commit*. Pertemuan 13 dikerjakan **berpasangan**; pertemuan 14 melengkapi
secara mandiri dan menulis refleksi satu halaman.

Pada bagian ini **tidak ada contoh terselesaikan**: kamu menulis dari
spesifikasi. Pemudaran dari contoh penuh (pertemuan 1 sampai 7), ke contoh
setengah jadi (8 sampai 12), ke spesifikasi saja (13 dan 14) disengaja.

## Latihan bercampur

Setelah bagian 3 dan setelah bagian 5, kerjakan soal yang **tidak
mengatakan** topiknya. Contoh: "Diberikan daftar nilai sintetis, cetak nama
yang lulus (nilai minimal 65) berurutan." Kamu sendiri yang memutuskan perlu
perulangan, percabangan, kamus, atau fungsi. Kuis kumulatif 1 (pertemuan 7)
dan 2 (pertemuan 14) berbentuk sama.

## Ulang berjarak

Kerjakan ulang tanpa melihat solusi lama:

- satu minggu setelah bagian: tulis ulang satu fungsi dari bagian itu;
- awal setiap bagian baru: dua soal dari bagian sebelumnya;
- minggu sebelum ujian: tiga soal dari bagian 1 sampai 3 yang dahulu salah.

## Kebijakan AI dan log pemakaian

Tugas dasar pemrograman di mata kuliah ini **Kuning** (silabus bagian 6.3, yang
sendiri berstatus asumsi): AI boleh menjelaskan konsep, **tidak** boleh
menghasilkan solusi yang kamu serahkan, dan hanya setelah gerbang kesiapan
(pertemuan 11). **Ujian praktik berlaku Merah**: tanpa AI. Proyek kecil
(pertemuan 13 dan 14) boleh dinaikkan ke **Hijau** (AI dengan pengungkapan dan
log) bila dosen menetapkan demikian; itu `[asumsi]` penyusun modul, dan dosen
menetapkan tingkat tiap tugas di lembar tugas.
Bila memakai AI untuk menjelaskan, catat di repositorimu sendiri: alat dan
versi, tujuan, perintah, dan bagian keluaran yang dipakai (log). Jangan
memasukkan data pribadi, kata sandi, atau kunci ke layanan AI. Dosen dapat
mewawancarai kamu singkat tentang kode yang kamu serahkan.

## Kesalahan umum

- **`=` dan `==` tertukar.** `=` menyimpan nilai; `==` membandingkan.
- **Indentasi salah** pada blok `if` dan `for`; baris di dalam blok harus
  menjorok.
- **Mengubah daftar sambil mengulanginya.** Hasilnya melompati elemen.
- **Lupa `return`.** Fungsi yang hanya `print` tidak mengembalikan nilai.
- **Kolom CSV masih teks.** `"3" + "4"` menjadi `"34"`.
- **Uji yang tidak pernah gagal.** `assert True` tidak menguji apa pun.

## Cek mandiri

Tutup modul, jawab, baru periksa.

1. Tulis tabel penelusuran `terbesar([3, 9, 4])`.
2. Mengapa daftar kosong ditangani sebelum menghitung rata-rata?
3. Tulis satu uji yang gagal untuk fungsi `rata_rata_salah`.
4. Sebut tiga hal yang kamu harus bisa lakukan sebelum memakai AI pada tugas
   Kuning.

Daftar periksa (kosong; kamu isi sendiri, tidak dikumpulkan):

- [ ] Aku dapat menelusuri program pendek di kertas.
- [ ] Aku dapat menulis fungsi dengan kasus tepi.
- [ ] Aku dapat membaca CSV dan merangkum per kategori.
- [ ] Aku dapat menulis uji yang gagal bila kode salah.
- [ ] Aku dapat menyimpan kode dengan Git dan menulis pesan yang bermakna.

## Kunci dan petunjuk

- **Bagian 1:** prediksi `Total: 13000` (15000 lebih dari 12000 sehingga
  dikurangi 2000). Setengah jadi: `>=`, `0`, `10000`. Parsons: `n = 7`,
  `if n % 2 == 0:`, `print("genap")`, `else:`, `print("ganjil")`.
- **Bagian 2:** keluaran `4 4`, `7 11`, `1 12` (satu baris tiap putaran).
  Setengah jadi: `len(daftar) == 0`, `daftar`, `x`.
- **Bagian 3:** `[('buku', 10), ('penghapus', 2), ('pensil', 10)]`. Pilihan:
  (a) `list`, (b) `dict`, (c) `set`. Setengah jadi: `items`, `<` (keluaran
  `['buku', 'penggaris']`).
- **Bagian 4:** `{'alat tulis': 7, 'buku': 5}`.
- **Bagian 5:** `assert` gagal pada versi salah (hasil 60.0).
- **Petunjuk bertahap bila macet:** (1) tulis contoh masukan dan keluaran
  yang kamu harapkan; (2) telusuri kodemu dengan masukan itu; (3) cari baris
  tempat nilai pertama kali berbeda dari harapan.

## Langkah berikutnya

`KUL-U-102` (Analisis Data dengan Python) memakai CSV, kamus, dan pengujianmu
pada tabel data yang lebih besar. Jalur lain: `KUL-U-201` (otomasi) dan, bila
kamu bergabung ke jalur informatika, `KUL-I-101`.

## Catatan untuk dosen

- **Bobot dan bentuk asesmen (usulan; prodi menetapkan, silabus 6.1):** kuis
  mingguan, tiga tugas pemrograman, proyek kecil di bidang prodi mahasiswa,
  ujian praktik langsung tanpa AI. Rentang bobot silabus: tugas dan praktikum
  30-40 persen, proyek 20-40, ujian praktik 20-30, ujian tertulis atau lisan
  10-20.
- **Variasi per mahasiswa:** tiap mahasiswa memakai data sintetis atau terbuka
  yang berbeda pada proyek kecil; riwayat Git menjadi bukti proses (silabus
  6.2).
- **Praktikum:** pastikan lab memiliki Python 3 dan Git; pasangan pemrograman
  dibentuk acak per bagian dan tugas yang dinilai tetap perorangan.
- **Tingkat AI:** Kuning untuk tugas dasar (silabus 6.3), Merah untuk ujian
  praktik; tingkat Hijau pada proyek kecil adalah `[asumsi]`, ubah bila perlu.

## Rujukan

- *The Python Tutorial*, Python Software Foundation (dibuka 2026-11-19):
  <https://docs.python.org/3/tutorial/index.html>
- Modul `csv` (pustaka standar Python), Python Software Foundation (dibuka
  2026-11-19): <https://docs.python.org/3/library/csv.html>
- *Git Reference*, git-scm.com (dibuka 2026-11-19): <https://git-scm.com/docs>
- ACM/IEEE-CS/AAAI, *Computer Science Curricula 2023*, knowledge area SDF dan
  AL: <https://csed.acm.org/knowledge-areas/> (daftar KA terverifikasi;
  rincian unit **tidak** dibaca, jadi tidak dikutip).
