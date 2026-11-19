## Untuk siapa modul ini

Modul ini untuk murid kelas 8 pada minggu kedelapan semester kedua. Kamu memakai editor Python yang disiapkan gurumu dan kertas untuk tabel isi daftar. Python adalah pengayaan di luar capaian pembelajaran. Waktunya satu pertemuan, 2 JP. Prasyaratnya `SMP8-2-M5` (perulangan `for` dan `while`). Semua nama barang dan angka di modul ini rekaan.

## Ingat kembali

Tutup modul ini dan jawab dari ingatan.

1. Hitung sudut belokan untuk segi lima dan segi delapan beraturan. (`SMP8-2-M7`)
2. Tulis perulangan yang mencetak angka 1 sampai 5, satu per baris. (`SMP8-2-M5`)
3. Jelaskan mengapa `"7" + "2"` menghasilkan 72 dan bukan 9. (`SMP8-2-M3`)
4. Tulis blok yang menambah satu nilai ke ujung daftar, dan sebut nomor urut isi pertama. (`SMP8-1-M14`)

Kunci: (1) 360 dibagi 5 = 72 dan 360 dibagi 8 = 45; (2) `for i in range(1, 6):` lalu `print(i)` menjorok; (3) tanda kutip membuat keduanya teks, dan `+` pada teks menyambung, bukan menjumlahkan; (4) `add (thing) to [daftar]`; isi pertama bernomor 1 di Scratch.

## Tujuan

Setelah modul ini kamu dapat:

1. membuat daftar di Python dengan kurung siku, `append`, dan `len`;
2. mengambil isi dengan indeks yang mulai dari 0;
3. menelusuri isi daftar dengan tabel dan memakai `for` untuk membaca semua isinya;
4. menjelaskan beda nomor urut Scratch dan indeks Python.

## Prediksi dulu

Daftar (*list*) menyimpan banyak nilai di bawah satu nama. Isinya diambil dengan **indeks**, nomor yang mulai dari 0: `belanja[0]` adalah isi pertama. Program P:

```python
belanja = ["beras", "telur", "teh"]
belanja.append("gula")
print(len(belanja))
print(belanja[0])
print(belanja[3])
for barang in belanja:
    print("-", barang)
```

**Prediksi.** Apa yang dicetak, baris demi baris? Tulis dulu.

**Jalankan.** Telusuri dengan tabel: kolom baris, isi `belanja`, dan yang dicetak.

**Selidiki.** Cocokkan dengan prediksimu, lalu jalankan. Mengapa `belanja[3]` masih ada isinya padahal awalnya hanya tiga barang?

## Contoh terselesaikan

Penelusuran P: baris 1 membuat daftar tiga isi. Baris 2 menaruh `"gula"` di ujung, jadi empat isi.

| indeks | 0 | 1 | 2 | 3 |
| --- | --- | --- | --- | --- |
| isi | beras | telur | teh | gula |

Tercetak: `4`, `beras`, `gula`, lalu empat baris `- beras`, `- telur`, `- teh`, `- gula`. Indeks terakhir selalu `len(belanja) - 1`.

Di Scratch, `item (1) of [belanja]` adalah isi pertama. Di Python isi pertama berindeks 0. Nomor Scratch dan indeks Python berbeda satu.

Menjumlahkan isi daftar harga:

```python
harga = [3000, 5000, 2000]
total = 0
for h in harga:
    total = total + h
print("Total:", total)
print("Isi:", len(harga))
```

Tercetak `Total: 10000` dan `Isi: 3`. Nilai awal `total` disiapkan satu kali di luar `for`, persis seperti skor di Scratch. Daftar juga bisa diisi dari masukan:

```python
belanja = []
for i in range(3):
    belanja.append(input())
for nomor in range(len(belanja)):
    print(nomor + 1, belanja[nomor])
```

Bila tiga masukannya `beras`, `telur`, `teh`, tercetak `1 beras`, `2 telur`, `3 teh`. Teks pertanyaan boleh kamu tambahkan di dalam `input(...)`; di sini dikosongkan agar keluaran mudah dibandingkan.

## Contoh setengah jadi

Hitung berapa harga yang lebih dari 3000. Isi bagian kosong.

```python setengah-jadi
harga = [3000, 5000, 2000, 7000]
banyak = 0
for h in harga:
    if h ____ 3000:
        banyak = banyak + ____
print("Mahal:", ____)
```

Telusuri `h` dan `banyak` tiap putaran. Apa yang dicetak?

## Susun urutannya

Lima baris berikut sudah diacak. Susun menjadi program yang mencetak `2` lalu `pena`.

- **A.** `tas = []`
- **B.** `tas.append("pena")`
- **C.** `tas.append("buku")`
- **D.** `print(len(tas))`
- **E.** `print(tas[0])`

Tulis urutan hurufnya. Apa yang tercetak bila B dan C ditukar?

## Latihan

1. **Ubah.** Ubah P agar mencetak isi terakhir dengan `len`, tanpa menulis angka 3 langsung.
2. **Buat.** Tulis program yang membaca empat angka ke daftar lalu mencetak jumlahnya.
3. **Selidiki.** `tas = ["pena", "buku", "penggaris", "pensil"]` lalu `print(tas[4])` berhenti dengan galat. Mengapa?
4. **Jelaskan.** Dengan dua kalimat, sebut beda nomor urut Scratch dan indeks Python.

## Latihan bercampur

1. `x = 5`, lalu `if x > 3:` berisi `x = x + 2`, lalu `for i in range(2):` berisi `x = x + i`, lalu `print(x)`. Berapa yang tercetak? (`SMP8-2-M4` dan `SMP8-2-M5`)
2. Berapa hasil `int("3") + 4`, dan mengapa `int` diperlukan? (`SMP8-2-M3`)

## Ulang berjarak

Kerjakan ulang tanpa melihat modul ini, lalu cocokkan:

- **Minggu depan** (`SMP8-2-M9`): tulis daftar `[4, 7, 1]` dan cetak jumlah isinya dengan `for`.
- **Akhir semester** (`SMP8-2-M14`): jelaskan mengapa daftar berisi tiga isi berindeks 0, 1, 2, dan apa yang terjadi bila indeks 3 diminta.
- **Semester depan** (`SMP9-1-M9`): tulis dari ingatan program yang memeriksa apakah satu nilai ada di dalam daftar, dengan `for`.

## Kesalahan umum

- **Mengira isi pertama berindeks 1.** Kenali: isi yang tercetak selalu satu bergeser.
- **Meminta `belanja[len(belanja)]`.** Kenali: `IndexError: list index out of range`; indeks terakhir adalah `len(belanja) - 1`.
- **Menulis `belanja.append "gula"` tanpa kurung.** Kenali: `SyntaxError`.
- **Menulis `belanja = belanja.append("gula")`.** Kenali: `belanja` berubah menjadi `None`, karena `append` mengubah daftar tetapi tidak mengembalikan daftar.
- **Menyiapkan `total = 0` di dalam `for`.** Kenali: jumlah selalu hanya isi terakhir.

## Cek mandiri

Tutup modul, jawab tanpa melihat, lalu periksa.

1. Tulis program yang membuat daftar `["a", "b", "c"]`, menambah `"d"`, lalu mencetak isi ketiga.
2. Daftar berisi lima isi: berapa indeks isi terakhir?
3. Tulis `for` yang mencetak semua isi `harga`, satu per baris.

Daftar periksa (kosong; kamu isi sendiri, tidak dikumpulkan):

- [ ] Aku bisa membuat daftar dan menambah isi ke ujungnya.
- [ ] Aku bisa mengambil isi dengan indeks yang benar.
- [ ] Aku bisa menelusuri `for` pada daftar dengan tabel.

Kunci: (1) `daftar = ["a", "b", "c"]`, `daftar.append("d")`, `print(daftar[2])`; tercetak `c`; (2) 4; (3) `for h in harga:` lalu `print(h)` menjorok.

## Langkah berikutnya

`SMP8-2-M9`, "Fungsi". Kamu menamai sepotong program supaya bisa dipakai berkali-kali, seperti blok buatan sendiri di Scratch, dan memakainya pada daftar.

## Catatan untuk guru

- **Waktu:** 2 JP x 40 menit `[asumsi]` (silabus bagian 2). Berpasangan boleh untuk "Prediksi dulu" dan "Latihan"; bukan jaminan efek belajar.
- **Alat:** Python 3 dengan editor sekolah. Penulis menjalankan semua program dengan Python 3.12.3 (masukan lewat pipa) dan keluarannya sama dengan yang tertulis; pesan galat dapat berbeda antarversi. Nama `append` dan `len` serta indeks dari 0 dicocokkan dengan tutorial resmi Python. Blok Scratch `add (thing) to [daftar]` dan `item (1) of [daftar]` tidak dicocokkan dengan dokumentasi blok resmi; guru memeriksanya di editor sebelum kelas.
- **Butir CP:** corpus memetakan minggu ini ke `DK-BK-c*` (irisan); `cpCodes` modul kosong karena pemrograman teks melampaui rumusan CP. Modul tidak menyatakan CP "terpenuhi".
- **Keluaran minggu:** program daftar belanja (contoh terselesaikan ketiga, atau Latihan 2).
- **Kunci "Prediksi dulu":** `4`, `beras`, `gula`, lalu `- beras`, `- telur`, `- teh`, `- gula`. Isi daftar sesudah baris 1: beras, telur, teh; sesudah baris 2: beras, telur, teh, gula. `belanja[3]` ada isinya karena `append` sudah menambah isi keempat.
- **Kunci "Contoh setengah jadi":** `>`, 1, `banyak`. Putaran: 3000 (tidak), 5000 (ya, banyak 1), 2000 (tidak), 7000 (ya, banyak 2). Tercetak `Mahal: 2`.
- **Kunci "Susun urutannya":** A, B, C, D, E (A harus pertama dan D, E sesudah B dan C). Bila B dan C ditukar, tercetak `2` lalu `buku`.
- **Kunci latihan:** (1) `print(belanja[len(belanja) - 1])`; tercetak `gula` pada daftar empat isi. (2) contoh: `angka = []`, `for i in range(4):` berisi `angka.append(int(input()))`, lalu `total = 0`, `for a in angka:` berisi `total = total + a`, `print(total)`. (3) daftar berisi empat isi, indeks terbesar 3; `tas[4]` melewati ujung dan menghasilkan `IndexError: list index out of range`. (4) contoh: Scratch memberi nomor mulai 1, Python mulai 0; isi yang sama berbeda satu nomor.
- **Kunci "Latihan bercampur":** (1) 8 (x menjadi 7, lalu ditambah 0 dan 1). (2) 7; `int` mengubah teks `"3"` menjadi bilangan bulat agar bisa dijumlahkan.
- **Petunjuk bertahap:** (a) tulis isi daftar sesudah tiap baris; (b) hitung indeks mulai dari 0; (c) bandingkan indeks dengan `len`; (d) bila galat, baca baris terakhir pesan.
- **AI:** tanpa AI. Kebijakan `smp-coding` (silabus bagian 7.1): AI generatif hanya demonstrasi guru, tanpa akun murid; asesmen tanpa AI.
- **Privasi:** semua nama barang dan angka rekaan; tanpa nama murid pada berkas.
- **Unsur pembelajaran:** ingat kembali dan jarak (`K`), PRIMM (`K` usia 11 sampai 14), tabel penelusuran (`K`), contoh lengkap lalu setengah jadi (`K`), Parsons (`M`), latihan bercampur (`K`).
