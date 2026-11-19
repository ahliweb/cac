## Untuk siapa modul ini

Modul ini untuk murid kelas XI jalur D (kecerdasan buatan dan analisis data), untuk minggu `D-XI1-M2` silabus v1.3: Python I (variabel, tipe, kondisi, perulangan). Prasyarat: modul `d-xi1-m1`. Pemrograman tidak diasumsikan; murid yang hanya mengambil jalur D belajar Python mulai di sini, dan tiga minggu (`D-XI1-M2` sampai `D-XI1-M4`) mungkin kurang, jadi guru perlu mengujinya di kelas. Alat: Python 3 di komputer (editor atau terminal yang disediakan guru). Tanpa akun.

Modul ini berstatus DRAF: karangan penyusun, belum ditinjau pemilik. Jalur D adalah pengayaan di luar rumusan capaian pembelajaran (CP); minggu ini tidak punya irisan pengayaan, jadi modul ini tidak dihitung memenuhi butir CP mana pun.

Aturan jalur D yang berlaku: data hanya sintetis (karangan) atau terbuka dengan lisensi jelas, tanpa data yang bisa mengenali orang; wajah, suara, dan foto orang tidak dipakai sebagai data; AI generatif boleh dipakai dengan etika dan dicatat, tanpa data pribadi, kata sandi, atau tugas bernilai pada permintaanmu, dan kamu tidak wajib punya akun. Saran: jawab dulu sendiri, baru minta AI memberi petunjuk bertahap; kode buatan AI dibaca, dijalankan, dan diuji. Setiap soal `Latihan` bertanda `AI: boleh` atau `AI: tanpa AI`.

Catatan untuk guru: semua blok Python dijalankan penyusun dengan `python3 -I` (Python 3.12.3, per 2026-11) dan keluarannya ditempel apa adanya; yang dinyatakan hanya "bisa dijalankan dengan keluaran ini", bukan "benar untuk semua masukan". Data curah hujan dan suhu karangan, tanpa data nyata.

## Ingat kembali

Jawab dari ingatan, baru cek di bagian kunci.

1. Sebutkan lima tahap proyek data dan AI, dan satu hal yang diperiksa di tiap tahap. (dari `d-xi1-m1`)
2. Mengapa prediksi ditulis sebelum menjalankan model? (dari `d-x2-m13`)
3. Apa beda positif palsu dan negatif palsu? (dari `d-x2-m7`)

## Tujuan

Setelah modul ini kamu dapat:

- membuat variabel dan menyebut tipe nilainya: `int`, `float`, `str`, `bool`;
- memilih tindakan dengan `if`, `elif`, dan `else`;
- mengulang dengan `for` dan `while`;
- menulis skrip yang menghitung jumlah, rata-rata, nilai terbesar, dan cacah dari sederet angka.

Keluaran yang diminta silabus: skrip dasar.

## Prediksi dulu

Baca kode ini. Jangan dijalankan dulu. Tulis lima baris keluarannya.

```python
a = 7
b = 2
print(a / b)
print(a // b)
print(a % b)
print("7" + "2")
print(int("7") + int("2"))
```

## Contoh terselesaikan

**Variabel dan tipe.** Variabel adalah nama yang menunjuk ke sebuah nilai. Tipe nilai menentukan apa yang boleh dilakukan padanya.

```python
nama = "hujan"          # str
jumlah_hari = 7         # int
rata = 11.0             # float
lebat = rata > 10       # bool
print(type(nama), type(jumlah_hari), type(rata), type(lebat))
print(lebat)
```

```text
<class 'str'> <class 'int'> <class 'float'> <class 'bool'>
True
```

**Kondisi dan perulangan `while`.** Kondisi memilih satu jalur; `while` mengulang selama syaratnya benar. Lekukan (empat spasi) menunjukkan blok mana yang termasuk.

```python
x = 25
if x >= 30:
    kelas = "lebat"
elif x >= 10:
    kelas = "sedang"
else:
    kelas = "ringan"
print(kelas)
n = 0
while n < 3:
    print("putaran", n)
    n = n + 1
```

```text
sedang
putaran 0
putaran 1
putaran 2
```

**Statistik sederhana dengan `for`.** Curah hujan tujuh hari (milimeter, karangan). Telusuri: tiap putaran menambah `total` dan `banyak`, memperbarui `terbesar` bila `x` lebih besar, dan menghitung hari lebat (20 mm atau lebih). Total akhir 12 + 0 + 5 + 30 + 0 + 8 + 22 = 77, rata-rata 77 / 7 = 11,0.

```python
curah = [12, 0, 5, 30, 0, 8, 22]   # mm per hari, data karangan

total = 0
banyak = 0
terbesar = curah[0]
hari_lebat = 0

for x in curah:
    total = total + x
    banyak = banyak + 1
    if x > terbesar:
        terbesar = x
    if x >= 20:
        hari_lebat = hari_lebat + 1

rata = total / banyak
print("total:", total)
print("banyak:", banyak)
print("rata-rata:", round(rata, 2))
print("terbesar:", terbesar)
print("hari lebat (>= 20 mm):", hari_lebat)
```

```text
total: 77
banyak: 7
rata-rata: 11.0
terbesar: 30
hari lebat (>= 20 mm): 2
```

Daftar (`[...]`) dibahas lebih lengkap di `D-XI1-M3`; di sini cukup dipakai sebagai deretan angka yang bisa dilewati dengan `for`.

## Contoh setengah jadi

Isi bagian `____` supaya program menghitung rata-rata suhu dan berapa hari bersuhu 30 derajat atau lebih. Data karangan.

```python setengah-jadi
suhu = [28, 31, 30, 35, 29]    # derajat Celsius, data karangan

jumlah = ____
for t in suhu:
    jumlah = jumlah + ____

rata = jumlah / ____
print(rata)

panas = 0
for t in suhu:
    if t ____ 30:
        panas = panas + 1
print(panas)
```

## Soal Parsons

Susun baris-baris ini menjadi program yang menghitung berapa hari ada hujan. Lekukan sudah benar; yang diacak hanya urutannya.

```text
        hari_hujan = hari_hujan + 1
print(hari_hujan)
hari_hujan = 0
for x in curah:
curah = [3, 0, 14, 0, 6]
    if x > 0:
```

## Latihan

1. **Jumlah dan rata-rata.** (`AI: tanpa AI`) Untuk `[5, 12, 8, 20]`, tulis program yang mencetak jumlah dan rata-ratanya dengan perulangan.
2. **Kelas suhu.** (`AI: tanpa AI`) Tulis fungsi atau potongan kondisi yang menghasilkan `sangat panas` untuk 35 ke atas, `panas` untuk 30 sampai kurang dari 35, dan `sejuk` di bawahnya. Coba 36, 30, dan 29.
3. **Pseudocode dulu.** (`AI: tanpa AI`) Tulis dalam kata-kata langkah mencari nilai terkecil dari sederet angka, baru ubah ke Python.
4. **Rekap curah.** (`AI: boleh`) Untuk `[12, 0, 5, 30, 0, 8, 22]`, cetak nilai terkecil, rata-rata, dan banyaknya hari di atas rata-rata.
5. **Catatan pemakaian AI (opsional).** Bila memakai asisten AI, catat alat, tujuan, garis besar perintah, bagian yang dipakai, dan cara memeriksanya.

## Latihan bercampur

1. Dari `d-xi1-m1`: pembanding sederhana pada rancangan proyek bisa berupa rata-rata. Untuk `[12, 0, 5, 30, 0, 8, 22]`, hitung selisih mutlak tiap nilai dari rata-rata, lalu rata-ratakan selisihnya. Ini galat rata-rata bila selalu menebak rata-rata.
2. Dari `d-x2-m5`: galat adalah selisih antara tebakan dan nilai sebenarnya. Bila tebakan selalu 11 untuk data yang sama, selisih terbesar berapa?

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `d-xi1-m3` (sekitar satu minggu lagi), `d-xi1-m5` (sekitar tiga minggu lagi), dan `d-xi1-m8` (sekitar enam minggu lagi). Jawab sekarang lalu simpan.

1. Apa keluaran `7 / 2`, `7 // 2`, dan `7 % 2`, dan kapan memakai masing-masing?
2. Apa beda perulangan `for` dan `while`, dan mengapa `while` bisa tidak berhenti?
3. Bagaimana menghitung rata-rata dari daftar angka dengan perulangan, tanpa fungsi siap pakai?

## Kesalahan umum

- **"`=` sama dengan `==`."** `=` memberi nilai pada variabel; `==` membandingkan dua nilai. `if x = 5:` adalah galat sintaks.
- **"Hasil `/` selalu bilangan bulat."** `/` selalu menghasilkan `float` (`7 / 2` memberi 3.5); pembagian bulat memakai `//`.
- **"`"7" + "2"` menjumlahkan."** Pada teks, `+` menyambung: hasilnya `72`. Angka yang tersimpan sebagai teks harus diubah dulu dengan `int()` atau `float()`.
- **"Lekukan hanya hiasan."** Di Python lekukan menentukan baris mana yang ikut dalam `if` atau perulangan; satu spasi salah mengubah arti program.
- **"`while` pasti berhenti."** Bila nilai yang dites tidak berubah di dalam perulangan, program berputar tanpa akhir.

## Cek mandiri

- [ ] Saya dapat menyebut tipe sebuah nilai dan menjelaskan mengapa `"7" + "2"` bukan 9.
- [ ] Saya dapat menulis `if`, `elif`, dan `else` dengan lekukan benar.
- [ ] Saya dapat menulis `for` yang menjumlahkan dan menghitung cacah.
- [ ] Saya menulis langkah dalam kata-kata sebelum menulis kode.
- [ ] Saya mencatat pemakaian AI bila saya memakainya.

## Kunci dan petunjuk

**Ingat kembali.** 1: masalah, data, model, evaluasi, penggunaan, masing-masing dengan satu pemeriksaan (misalnya sumber dan lisensi pada data, data uji terpisah pada evaluasi). 2: supaya prediksi menguji pemahamanmu; prediksi sesudah hasil tidak menguji apa pun. 3: positif palsu: bukan yang dicari tetapi ditandai; negatif palsu: yang dicari tetapi lolos.

**Prediksi dulu.** Keluaran: `3.5`, `3`, `1`, `72`, `9`. `/` memberi `float`; `//` pembagian bulat (7 dibagi 2 = 3 sisa 1); `%` sisa; `+` pada teks menyambung; dua angka yang sudah diubah dengan `int()` dijumlahkan.

**Contoh setengah jadi.** `jumlah = 0`; `jumlah = jumlah + t`; `rata = jumlah / len(suhu)`; `if t >= 30:`. Keluaran: `30.6` dan `3` (153 / 5 = 30,6; hari 31, 30, 35 yang 30 atau lebih).

**Soal Parsons.** Urutan benar:

```python
curah = [3, 0, 14, 0, 6]
hari_hujan = 0
for x in curah:
    if x > 0:
        hari_hujan = hari_hujan + 1
print(hari_hujan)
```

Keluaran `3`. Variabel diberi nilai awal sebelum perulangan, kalau tidak `hari_hujan + 1` memakai nama yang belum ada.

**Latihan.** 1: kode: `jumlah = 0`, `for x in daftar: jumlah = jumlah + x`, `print(jumlah, jumlah / len(daftar))`; keluaran `45 11.25`. 2: `if suhu >= 35: ...  elif suhu >= 30: ...  else: ...`; keluaran untuk 36, 30, 29: `sangat panas`, `panas`, `sejuk`. 3: contoh: ambil angka pertama sebagai terkecil sementara; periksa tiap angka berikutnya; bila lebih kecil, ganti terkecil sementara; setelah selesai, cetak. 4: terkecil 0, rata-rata 11.0, di atas rata-rata 3 (12, 30, 22). 5: opsional.

**Latihan bercampur.** 1: selisih mutlak dari 11: 1, 11, 6, 19, 11, 3, 11; jumlah 62; 62 / 7 = 8,86 (dibulatkan dua desimal). 2: selisih terbesar 19 (nilai 30 dari tebakan 11).

**Ulang berjarak.** 1: `3.5`, `3`, `1`; `/` untuk hasil desimal, `//` untuk pembagian bulat, `%` untuk sisa (misalnya mengecek genap). 2: `for` untuk melewati deretan yang jelas; `while` selama syarat benar; `while` tidak berhenti bila nilai yang dites tidak pernah berubah. 3: jumlahkan dalam variabel `total` dengan `for`, hitung banyaknya, lalu bagi total dengan banyak.

## Langkah berikutnya

Modul berikut: `d-xi1-m3` (Python II), tempat kamu menyusun program lewat fungsi, daftar, dan kamus. Bacaan lanjut: tutorial Python bagian aliran kendali di dokumentasi resmi.
