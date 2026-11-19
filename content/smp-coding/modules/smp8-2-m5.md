## Untuk siapa modul ini

Modul ini untuk murid kelas 8 pada minggu kelima semester kedua. Kamu memakai editor Python yang disiapkan gurumu dan kertas untuk tabel putaran. Python adalah pengayaan di luar capaian pembelajaran. Waktunya satu pertemuan, 2 JP. Prasyaratnya `SMP8-2-M4` (percabangan `if`). Semua angka di modul ini rekaan.

## Ingat kembali

Tutup modul ini dan jawab dari ingatan.

1. Jelaskan apa yang berubah dan apa yang tetap pada tiap putaran perulangan yang memakai variabel `i`. (`SMP8-1-M5`)
2. Tulis `if`, `elif`, `else` yang mencetak `kecil` bila `x < 10`, `sedang` bila `x < 100`, selain itu `besar`, lalu telusuri `x` = 50. (`SMP8-2-M4`)
3. Tulis padanan Python untuk `repeat (3)` berisi `say [Halo] for (1) seconds`. (`SMP8-2-M1`)

Kunci: (1) nilai `i` dan hasil hitungan berubah tiap putaran; isi perulangan, yaitu aturan yang diulang, tetap sama; (2) `if x < 10:` mencetak `kecil`, `elif x < 100:` mencetak `sedang`, `else:` mencetak `besar`; untuk 50 tercetak `sedang`; (3) `for putaran in range(3):` lalu `print("Halo")` menjorok.

## Tujuan

Setelah modul ini kamu dapat:

1. menulis `for ... in range(...)` dengan batas awal dan batas akhir;
2. menulis `while` dengan kondisi dan satu baris yang mengubah variabelnya;
3. menelusuri perulangan dengan tabel putaran;
4. menjelaskan beda `for` dan `while` serta kapan masing-masing dipakai.

## Prediksi dulu

`for` mengulang isinya untuk setiap nilai dari `range`. `range(1, 4)` menghasilkan 1, 2, 3: batas awal ikut, batas akhir **tidak** ikut. Program P:

```python
for i in range(1, 4):
    print(i, "x 3 =", i * 3)
```

**Prediksi.** Apa yang dicetak, berapa baris, dan apa nilai `i` pada tiap baris? Tulis dulu.

**Jalankan.** Telusuri dengan tabel: kolom putaran, `i`, dan yang dicetak.

**Selidiki.** Cocokkan dengan prediksimu. Apa yang berubah tiap putaran dan apa yang tetap? Apa yang tercetak bila diganti `range(4)`?

## Contoh terselesaikan

Penelusuran P: putaran 1 `i` = 1 mencetak `1 x 3 = 3`; putaran 2 `i` = 2 mencetak `2 x 3 = 6`; putaran 3 `i` = 3 mencetak `3 x 3 = 9`. Dengan `range(4)`, `i` bernilai 0, 1, 2, 3, jadi ada baris `0 x 3 = 0` di awal dan empat baris.

Tabel perkalian yang bisa dipilih penggunanya:

```python
n = int(input("Tabel perkalian berapa? "))
for i in range(1, 6):
    print(n, "x", i, "=", n * i)
```

Untuk masukan 4, tercetak `4 x 1 = 4`, `4 x 2 = 8`, `4 x 3 = 12`, `4 x 4 = 16`, dan `4 x 5 = 20`.

`for` dipakai bila banyak putarannya sudah diketahui. Bila putaran berhenti menurut kondisi, dipakai `while`:

```python
total = 0
angka = 1
while angka <= 4:
    total = total + angka
    angka = angka + 1
print(total)
```

| putaran | `angka` saat diperiksa | `angka <= 4` | `total` sesudahnya | `angka` sesudahnya |
| --- | --- | --- | --- | --- |
| 1 | 1 | benar | 1 | 2 |
| 2 | 2 | benar | 3 | 3 |
| 3 | 3 | benar | 6 | 4 |
| 4 | 4 | benar | 10 | 5 |
| (cek) | 5 | salah | berhenti | |

Tercetak `10`. Tiga hal yang perlu diingat. Pertama, `range(a, b)` berhenti **sebelum** `b`. Kedua, `while` memeriksa kondisi sebelum tiap putaran, jadi satu baris di dalamnya harus mengubah variabel agar kondisi akhirnya salah. Ketiga, jorokan menentukan baris mana yang ikut diulang.

## Contoh setengah jadi

Program yang menjumlahkan 1 sampai 5 dengan `for`. Isi bagian kosong.

```python setengah-jadi
total = 0
for i in range(1, ____):
    total = total + ____
print(total)
```

Telusuri nilai `total` sesudah tiap putaran. Apa yang tercetak?

## Susun urutannya

Enam baris berikut sudah diacak. Susun menjadi program yang menghitung berapa minggu sampai tabungan Rp100 mencapai Rp130 bila tiap minggu bertambah Rp10.

- **A.** `saldo = 100`
- **B.** `minggu = 0`
- **C.** `while saldo < 130:`
- **D.** `    saldo = saldo + 10` (menjorok di bawah `while`)
- **E.** `    minggu = minggu + 1` (menjorok di bawah `while`)
- **F.** `print(minggu, saldo)` (di kolom paling kiri)

Tulis urutan hurufnya. Jelaskan mengapa `print` tidak menjorok.

## Latihan

1. **Ubah.** Ubah tabel perkalian agar sampai `x 10`. Apa baris terakhir untuk `n` = 4?
2. **Buat.** Tulis program dengan `for` yang mencetak bilangan genap 2, 4, 6, 8, 10 (petunjuk: kalikan `i` dengan 2). Telusuri `i` dan hasilnya.
3. **Selidiki.** Program `angka = 1`, lalu `while angka <= 3:` dengan isi `print(angka)` saja tidak pernah berhenti. Mengapa, dan baris apa yang perlu ditambahkan? Jangan jalankan sebelum memprediksi; bila terlanjur, hentikan seperti yang diajarkan gurumu.
4. **Jelaskan.** Dengan dua kalimat, jelaskan kapan memilih `for` dan kapan memilih `while`.

## Latihan bercampur

1. Apa yang dicetak: `for i in range(1, 7):` berisi `if i % 2 == 0:` lalu `print(i)`? (`SMP8-2-M3`, `SMP8-2-M4`)
2. `a = 3`, `b = a * 2`, `a = 5`, lalu `print(a + b)`. Berapa yang tercetak? (`SMP8-2-M2`)

## Ulang berjarak

Kerjakan ulang tanpa melihat modul ini, lalu cocokkan:

- **Minggu depan** (`SMP8-2-M6`): terjemahkan ke Python program Scratch `set [total] to (0)`, `repeat (4)` berisi `change [total] by (3)`, lalu `say (total)`.
- **Sekitar sebulan lagi** (`SMP8-2-M8`): tulis perulangan yang mencetak angka 1 sampai 5, satu per baris.
- **Akhir semester** (`SMP8-2-M13`): tulis perulangan `for` yang menanyakan tiga soal dan menambah skor tiap jawaban benar.

## Kesalahan umum

- **Mengira `range(5)` menghasilkan 1 sampai 5.** Kenali: tabel mulai dari 0 dan berhenti di 4.
- **`while` tanpa baris yang mengubah variabel.** Kenali: layar terus penuh dan program tidak berhenti.
- **Memakai variabel `while` sebelum diisi.** Kenali: `NameError` pada baris `while`.
- **Salah memilih `<` dan `<=`.** Kenali: `total` kurang satu suku, atau ada satu putaran ekstra.
- **Menaruh `print` di dalam atau di luar perulangan secara keliru.** Kenali: baris penutup tercetak berkali-kali padahal hanya diminta sekali.

## Cek mandiri

Tutup modul, jawab tanpa melihat, lalu periksa.

1. Apa yang dicetak `for i in range(3):` berisi `print(i)`?
2. Mengapa `while` perlu satu baris yang mengubah variabel yang diperiksanya?
3. Tulis `for` yang mencetak `Halo` empat kali.

Daftar periksa (kosong; kamu isi sendiri, tidak dikumpulkan):

- [ ] Aku bisa menyebut batas awal dan akhir sebuah `range`.
- [ ] Aku bisa menelusuri `for` dan `while` dengan tabel.
- [ ] Aku bisa memilih `for` atau `while` untuk satu masalah.

Kunci: (1) `0`, `1`, `2`, masing-masing di satu baris; (2) tanpa perubahan itu kondisinya tidak pernah salah, jadi perulangan tidak berhenti; (3) `for i in range(4):` lalu `print("Halo")` menjorok.

## Langkah berikutnya

`SMP8-2-M6`, "Menerjemahkan program Scratch ke Python". Kamu memakai `if`, `for`, variabel, dan `input` bersama untuk memindahkan satu program blok menjadi teks.

## Catatan untuk guru

- **Waktu:** 2 JP x 40 menit `[asumsi]` (silabus bagian 2). Berpasangan boleh untuk "Prediksi dulu" dan "Latihan"; bukan jaminan efek belajar.
- **Alat:** Python 3 dengan editor sekolah. Penulis menjalankan semua program (kecuali yang sengaja tidak berhenti) dengan Python 3.12.3 dan keluarannya sama dengan yang tertulis. Siapkan cara menghentikan program yang berjalan terus pada editor yang dipakai; penulis tidak menentukan editor.
- **Butir CP:** corpus memetakan minggu ini ke `DK-BK-c*` (irisan); `cpCodes` modul kosong. Modul tidak menyatakan CP "terpenuhi".
- **Kunci "Prediksi dulu":** `1 x 3 = 3`, `2 x 3 = 6`, `3 x 3 = 9`. Dengan `range(4)`: `0 x 3 = 0`, lalu tiga baris di atas.
- **Kunci "Contoh setengah jadi":** `6` dan `i`; `total` sesudah tiap putaran: 1, 3, 6, 10, 15; tercetak 15.
- **Kunci "Susun urutannya":** A, B, C, D, E, F (D dan E boleh bertukar). `saldo` 110, 120, 130 dan `minggu` 1, 2, 3; tercetak `3 130`. `print` di luar `while` agar hanya sekali, sesudah perulangan selesai.
- **Kunci latihan:** (1) `range(1, 11)`; baris terakhir `4 x 10 = 40`. (2) `for i in range(1, 6):` lalu `print(i * 2)`; tercetak 2, 4, 6, 8, 10. (3) `angka` tidak pernah berubah, jadi `1 <= 3` selalu benar; tambahkan `angka = angka + 1` di dalam `while`. (4) `for` bila banyak putaran sudah diketahui; `while` bila berhenti menurut kondisi.
- **Kunci "Latihan bercampur":** (1) 2, 4, 6. (2) b = 6; a = 5; tercetak 11.
- **Petunjuk bertahap:** (a) tulis nilai awal semua variabel; (b) isi tabel putaran: periksa kondisi, jalankan isi, ubah variabel; (c) berhenti saat kondisi salah; (d) cocokkan dengan hasil program.
- **AI:** tanpa AI. Kebijakan `smp-coding` (silabus bagian 7.1): AI generatif hanya demonstrasi guru, tanpa akun murid; asesmen tanpa AI.
- **Privasi:** semua angka rekaan; tanpa nama murid pada berkas.
- **Unsur pembelajaran:** ingat kembali dan jarak (`K`), PRIMM (`K` usia 11 sampai 14), tabel penelusuran (`K`), contoh lengkap lalu setengah jadi (`K`), Parsons (`M`), latihan bercampur (`K`).
