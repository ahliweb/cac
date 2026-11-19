## Untuk siapa modul ini

Modul ini untuk murid kelas 8 pada minggu keempat semester kedua. Kamu memakai editor Python yang disiapkan gurumu dan kertas untuk tabel penelusuran. Python adalah pengayaan di luar capaian pembelajaran. Waktunya satu pertemuan, 2 JP. Prasyaratnya `SMP8-2-M3` (ekspresi dan tipe data). Semua angka di modul ini rekaan.

## Ingat kembali

Tutup modul ini dan jawab dari ingatan.

1. Tulis dari ingatan kondisi `JIKA ... MAKA ... LAINNYA`, lalu telusuri dua masukan. (`SMP8-1-M14`)
2. Hitung `17 // 5` dan `17 % 5` tanpa melihat. (`SMP8-2-M3`)
3. Terjemahkan ke Python: `if <(nilai) > (5)> then say [Tinggi] else say [Rendah]`. (`SMP8-2-M1`)

Kunci: (1) contoh: `JIKA n >= 10 MAKA` potong harga, `LAINNYA` tanpa potongan; telusuri `n` = 12 (cabang `MAKA`) dan `n` = 4 (cabang `LAINNYA`); (2) 3 dan 2; (3) `if nilai > 5:` lalu `print("Tinggi")`, `else:` lalu `print("Rendah")`, isinya menjorok.

## Tujuan

Setelah modul ini kamu dapat:

1. menulis `if`, `elif`, dan `else` dengan titik dua dan jorokan yang benar;
2. memakai pembanding `==`, `!=`, `<`, `>`, `<=`, `>=` dan penghubung `and`;
3. menelusuri cabang mana yang dijalankan untuk sebuah masukan;
4. menjelaskan mengapa urutan `elif` menentukan hasil.

## Prediksi dulu

`if` di Python bekerja seperti `if` di Scratch: isinya hanya berjalan bila kondisinya benar. Pembanding memberi benar atau salah: `==` sama dengan, `!=` tidak sama, `<` dan `>` lebih kecil dan lebih besar, `<=` dan `>=` termasuk batasnya. Program P:

```python
x = 5
if x > 5:
    print("A")
if x == 5:
    print("B")
else:
    print("C")
```

**Prediksi.** Apa yang dicetak? Tulis dulu.

**Jalankan.** Telusuri: tulis hasil tiap kondisi (benar atau salah) dan baris `print` yang dijalankan.

**Selidiki.** Cocokkan dengan prediksimu. Mengapa `else` tidak berpasangan dengan `if x > 5`?

## Contoh terselesaikan

Penelusuran P: `5 > 5` salah, jadi `A` dilewati; `5 == 5` benar, jadi `B` tercetak dan `else` dilewati. Dicetak `B`.

Sekarang penilai nilai sederhana dengan tiga cabang:

```python
nilai = int(input("Nilai? "))
if nilai >= 75:
    print("Tuntas")
elif nilai >= 60:
    print("Hampir")
else:
    print("Belum")
```

| nilai | `nilai >= 75` | `nilai >= 60` | dicetak |
| --- | --- | --- | --- |
| 80 | benar | tidak diperiksa | Tuntas |
| 75 | benar | tidak diperiksa | Tuntas |
| 74 | salah | benar | Hampir |
| 40 | salah | salah | Belum |

Tiga hal yang perlu diingat. Pertama, `elif` hanya diperiksa bila kondisi sebelumnya salah, jadi paling banyak satu cabang berjalan. Kedua, urutan kondisi penting: yang paling sempit ditaruh lebih dulu. Ketiga, uji tepat di batas, seperti 75 dan 74.

## Contoh setengah jadi

Program yang mencetak "genap" atau "ganjil". Isi bagian kosong.

```python setengah-jadi
n = int(input("Bilangan? "))
if n ____ 2 == 0:
    print("genap")
____:
    print("ganjil")
```

Telusuri untuk masukan 9 dan 10. Apa yang tercetak?

## Susun urutannya

Lima baris berikut sudah diacak. Susun menjadi program yang mencetak harga tiket: Rp3.000, atau Rp1.500 bila umur kurang dari 12.

- **A.** `umur = int(input("Umur? "))`
- **B.** `tiket = 3000`
- **C.** `if umur < 12:`
- **D.** `    tiket = 1500` (menjorok di bawah `if`)
- **E.** `print(tiket)` (di kolom paling kiri)

Tulis urutan hurufnya. Jelaskan mengapa `tiket = 3000` ditaruh sebelum `if`.

## Latihan

1. **Ubah.** Pada penilai nilai, ubah batas Tuntas menjadi 70. Apa yang dicetak untuk 72?
2. **Buat.** Tulis program yang membaca suhu dan mencetak `hangat` bila suhu 25 sampai 35 (pakai `and`), selain itu `lainnya`. Telusuri untuk 31, 20, dan 25.
3. **Selidiki.** Seorang murid menukar urutan: `if nilai >= 60:` dulu, baru `elif nilai >= 75:`. Untuk nilai 80, apa yang tercetak dan mengapa? Bagaimana memperbaikinya?
4. **Jelaskan.** Dengan dua kalimat, jelaskan beda dua `if` berurutan dan satu `if` yang disusul `elif`.

## Latihan bercampur

1. Apa yang dicetak: `if 17 % 5 == 2:` lalu `print("ya")`, `else:` lalu `print("tidak")`? (`SMP8-2-M3`)
2. `a = 5`, `b = a + 2`, `a = 10`, lalu `if a > b:` `print("a")` dengan `else:` `print("b")`. Apa yang dicetak? (`SMP8-2-M2`)

## Ulang berjarak

Kerjakan ulang tanpa melihat modul ini, lalu cocokkan:

- **Minggu depan** (`SMP8-2-M5`): tulis `if`, `elif`, `else` yang mencetak `kecil` bila `x < 10`, `sedang` bila `x < 100`, selain itu `besar`, lalu telusuri `x` = 50.
- **Sekitar sebulan lagi** (`SMP8-2-M10`): sebut dua kesalahan penulisan `if` yang membuat Python menolak program.
- **Akhir semester** (`SMP8-2-M13`): tulis tiga kasus uji untuk penilai nilai: satu di tiap cabang dan satu tepat di batas.

## Kesalahan umum

- **Memakai `=` untuk membandingkan.** Kenali: pesan galat pada baris `if`.
- **Lupa titik dua** sesudah kondisi. Kenali: `SyntaxError: expected ':'`.
- **Tidak menjorok isi cabang.** Kenali: `IndentationError` pada baris sesudah `if`.
- **Menulis `nilai >= 60 and <= 75`.** Kenali: `SyntaxError`; nama `nilai` harus ditulis lagi: `nilai >= 60 and nilai <= 75`.
- **Urutan `elif` terbalik.** Kenali: nilai tinggi masuk cabang yang lebih longgar, seperti nilai 80 yang tercetak `Hampir`.

## Cek mandiri

Tutup modul, jawab tanpa melihat, lalu periksa.

1. Apa yang dicetak penilai nilai untuk 74?
2. Mengapa memakai `elif`, bukan `if` kedua?
3. Tulis kondisi untuk umur 12 sampai 17 (termasuk kedua batasnya).

Daftar periksa (kosong; kamu isi sendiri, tidak dikumpulkan):

- [ ] Aku bisa menulis `if`, `elif`, `else` dengan titik dua dan jorokan.
- [ ] Aku bisa menelusuri cabang yang dijalankan.
- [ ] Aku menguji di batas.

Kunci: (1) `Hampir`; (2) `elif` hanya diperiksa bila kondisi sebelumnya salah, jadi hanya satu cabang berjalan; (3) `if umur >= 12 and umur <= 17:`.

## Langkah berikutnya

`SMP8-2-M5`, "Perulangan `for` dan `while`". Kamu mengulang baris Python sebanyak yang diinginkan dan membuat tabel perkalian.

## Catatan untuk guru

- **Waktu:** 2 JP x 40 menit `[asumsi]` (silabus bagian 2). Berpasangan boleh untuk "Prediksi dulu" dan "Latihan"; bukan jaminan efek belajar.
- **Alat:** Python 3 dengan editor sekolah. Penulis menjalankan semua program dengan Python 3.12.3 dan keluarannya sama dengan yang tertulis. Pesan galat bisa berbeda antarversi Python.
- **Butir CP:** corpus memetakan minggu ini ke `DK-BK-c*` (irisan); `cpCodes` modul kosong. Modul tidak menyatakan CP "terpenuhi".
- **Kunci "Prediksi dulu":** `5 > 5` salah, `5 == 5` benar; dicetak `B`. `else` berpasangan dengan `if` terdekat di atasnya yang sejajar.
- **Kunci "Contoh setengah jadi":** `%` dan `else`; 9 mencetak `ganjil`, 10 mencetak `genap`.
- **Kunci "Susun urutannya":** A, B, C, D, E (A dan B boleh bertukar). Nilai awal 3000 disiapkan lebih dulu agar `tiket` selalu terisi; umur 10 mencetak 1500, umur 12 mencetak 3000.
- **Kunci latihan:** (1) 72 >= 70 benar; `Tuntas`. (2) `suhu = int(input("Suhu? "))`, `if suhu >= 25 and suhu <= 35:` mencetak `hangat`, `else:` mencetak `lainnya`; 31 hangat, 20 lainnya, 25 hangat (batas termasuk). (3) 80 >= 60 benar sehingga `Hampir` tercetak dan `elif` tidak pernah diperiksa; taruh `nilai >= 75` lebih dulu. (4) dua `if` berurutan masing-masing diperiksa, jadi dua cabang bisa berjalan; `if` dengan `elif` memilih paling banyak satu.
- **Kunci "Latihan bercampur":** (1) 17 % 5 = 2, jadi `ya`. (2) b = 7, a = 10; 10 > 7 benar; dicetak `a`.
- **Petunjuk bertahap:** (a) tulis hasil tiap kondisi di tabel; (b) tandai cabang pertama yang benar; (c) baris sesudahnya dilewati; (d) uji batas dan satu nilai di luar tiap cabang.
- **AI:** tanpa AI. Kebijakan `smp-coding` (silabus bagian 7.1): AI generatif hanya demonstrasi guru, tanpa akun murid; asesmen tanpa AI.
- **Privasi:** semua angka rekaan; tanpa nama murid pada berkas.
- **Unsur pembelajaran:** ingat kembali dan jarak (`K`), PRIMM (`K` usia 11 sampai 14), tabel penelusuran (`K`), contoh lengkap lalu setengah jadi (`K`), Parsons (`M`), latihan bercampur (`K`).
