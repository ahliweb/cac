## Untuk siapa modul ini

Modul ini untuk murid kelas 8 pada minggu kedua semester kedua. Kamu memakai editor Python yang disiapkan gurumu; kertas dipakai untuk tabel penelusuran. Python adalah pengayaan di luar capaian pembelajaran. Waktunya satu pertemuan, 2 JP. Prasyaratnya `SMP8-2-M1` (blok ke teks). Semua nama dan angka di modul ini rekaan.

## Ingat kembali

Tutup modul ini dan jawab dari ingatan.

1. Tulis padanan Python untuk `set [x] to (5)` dan `say (x)`. (`SMP8-2-M1`)
2. Sebut dua masukan dan dua keluaran pada micro:bit simulator. (`SMP8-1-M10`)
3. Tulis pseudocode tiga baris yang membaca dua angka dan menampilkan jumlahnya. (`SMP8-1-M1`)

Kunci: (1) `x = 5` dan `print(x)`; (2) masukan: tombol, sensor suhu; keluaran: layar LED, bunyi; (3) `BACA a`, `BACA b`, `TAMPILKAN a + b`.

## Tujuan

Setelah modul ini kamu dapat:

1. mencetak teks dan hasil hitungan dengan `print`;
2. membaca masukan pengguna dengan `input` dan mengubahnya menjadi bilangan dengan `int`;
3. menelusuri variabel yang nilainya diganti;
4. menjelaskan mengapa mengganti `a` tidak mengubah `b` yang sudah dihitung dari `a`.

## Prediksi dulu

Variabel di Python adalah nama untuk sebuah nilai yang disimpan. Tanda `=` berarti **mengisi**, bukan "sama dengan" seperti di matematika. Program P:

```python
a = 5
b = a + 2
a = 10
print(a, b)
```

**Prediksi.** Apa yang dicetak? Tebak nilai `a` dan `b` dulu, lalu tulis.

**Jalankan.** Telusuri dengan tabel: tulis `a` dan `b` sesudah tiap baris.

| Sesudah baris | a | b |
| --- | --- | --- |
| 1 | | |
| 2 | | |
| 3 | | |

**Selidiki.** Cocokkan dengan prediksimu, lalu jalankan di editor. Mengapa `b` tetap 7 padahal `a` sudah 10?

## Contoh terselesaikan

Penelusuran P: baris 1 menghasilkan a = 5; baris 2 menghitung 5 + 2 sekali dan menyimpan 7 ke `b`; baris 3 mengganti `a` menjadi 10, tetapi `b` sudah tersimpan. Dicetak `10 7`.

Sekarang program yang menyapa dan menghitung keliling persegi:

```python
nama = input("Namamu? ")
sisi = int(input("Panjang sisi persegi (cm)? "))
print("Halo,", nama)
print("Keliling persegimu:", 4 * sisi, "cm")
```

Bila pengguna mengetik `Murid-01` lalu `6`, layar menunjukkan (bagian sesudah tanda tanya diketik pengguna):

```text
Namamu? Murid-01
Panjang sisi persegi (cm)? 6
Halo, Murid-01
Keliling persegimu: 24 cm
```

Tiga hal yang perlu diingat. Pertama, `input` selalu menghasilkan **teks**, jadi `int(...)` mengubahnya menjadi bilangan agar bisa dihitung. Kedua, `print` dengan koma memisahkan isinya dengan satu spasi; tanda `+` pada teks menggabung tanpa spasi. Ketiga, tiap baris diproses dari atas ke bawah, sehingga nilai yang dipakai harus sudah diisi di baris sebelumnya.

## Contoh setengah jadi

Program yang membaca dua bilangan dan mencetak jumlahnya. Isi bagian kosong.

```python setengah-jadi
a = ____(input("Angka pertama? "))
b = int(input("Angka kedua? "))
print("Jumlah:", ____)
```

Telusuri untuk masukan 8 dan 5. Apa yang tercetak?

## Susun urutannya

Empat baris berikut sudah diacak. Susun menjadi program yang menghitung dan mencetak total harga pensil.

- **A.** `harga = int(input("Harga satu pensil (Rp)? "))`
- **B.** `banyak = int(input("Berapa pensil? "))`
- **C.** `total = harga * banyak`
- **D.** `print("Total:", total)`

Tulis urutan hurufnya. A dan B boleh bertukar tempat; jelaskan mengapa C harus sesudah keduanya.

## Latihan

1. **Ubah.** Ubah program keliling menjadi program luas persegi. Apa yang tercetak untuk sisi 6?
2. **Buat.** Tulis program yang membaca umur sebagai bilangan lalu mencetak "Tahun depan umurmu" dan umur ditambah satu. Telusuri untuk masukan 13.
3. **Selidiki.** Program `umur = input("Umurmu? ")` lalu `print(umur + 1)` berhenti dengan `TypeError`. Apa penyebabnya dan bagaimana memperbaikinya?
4. **Jelaskan.** Dengan dua kalimat, jelaskan mengapa pada program P nilai `b` tidak ikut menjadi 12.

## Latihan bercampur

1. Terjemahkan ke Python: `set [skor] to (0)`, lalu `repeat (2)` berisi `change [skor] by (5)`, lalu `say (skor)`. Berapa yang tercetak? (`SMP8-2-M1`)
2. Scratch: `set [a] to (2)`, lalu `repeat (3)` berisi `change [a] by (a)`. Berapa `a` akhirnya? (`SMP8-1-M4`)

## Ulang berjarak

Kerjakan ulang tanpa melihat modul ini, lalu cocokkan:

- **Minggu depan** (`SMP8-2-M3`): jelaskan mengapa `input()` selalu menghasilkan teks dan bagaimana mengubahnya menjadi bilangan.
- **Sekitar sebulan lagi** (`SMP8-2-M6`): tulis padanan Python untuk `ask [7 + 5 = ?] and wait` lalu `if <(answer) = (12)> then`.
- **Akhir semester** (`SMP8-2-M13`): tulis tiga baris Python yang membaca umur dari pengguna lalu mencetak umurnya tahun depan.

## Kesalahan umum

- **Mengira variabel seperti rumus yang selalu diperbarui.** Kenali: kamu menebak `b` ikut berubah setelah `a` diganti.
- **Lupa `int(...)` pada hasil `input`.** Kenali: `TypeError`, atau angka tergabung seperti `13` dan `5` menjadi `135`.
- **Lupa menutup tanda kutip atau kurung.** Kenali: `SyntaxError` dengan keterangan teks yang belum ditutup.
- **Salah huruf besar dan kecil pada nama.** Kenali: `NameError`, karena `Nama` dan `nama` dianggap dua nama berbeda.
- **Memakai nama variabel sebelum diisi.** Kenali: `NameError` pada baris pertama yang memakainya.

## Cek mandiri

Tutup modul, jawab tanpa melihat, lalu periksa.

1. Apa yang dicetak: `x = 4`, `y = x * 3`, `x = 1`, `print(x, y)`?
2. Mengapa hasil `input` perlu dibungkus `int(...)` sebelum dijumlahkan?
3. Tulis dua baris yang membaca bilangan `n` lalu mencetak `n * n`.

Daftar periksa (kosong; kamu isi sendiri, tidak dikumpulkan):

- [ ] Aku bisa mencetak teks dan hasil hitungan.
- [ ] Aku bisa membaca bilangan dari pengguna dengan `int(input(...))`.
- [ ] Aku bisa menelusuri nilai variabel baris demi baris.

Kunci: (1) `1 12`; (2) karena `input` menghasilkan teks, dan teks tidak bisa dijumlahkan dengan bilangan; (3) `n = int(input("n? "))` dan `print(n * n)`.

## Langkah berikutnya

`SMP8-2-M3`, "Ekspresi dan tipe data (pengayaan)". Kamu mengenal jenis nilai di Python: bilangan bulat, bilangan desimal, dan teks, serta operasi yang berlaku pada masing-masing.

## Catatan untuk guru

- **Waktu:** 2 JP x 40 menit `[asumsi]` (silabus bagian 2). Berpasangan boleh untuk "Prediksi dulu" dan "Latihan"; bukan jaminan efek belajar.
- **Alat:** Python 3 dengan editor sekolah. Penulis menjalankan semua program dengan Python 3.12.3 (masukan lewat pipa) dan keluarannya sama dengan yang tertulis; bila masukan diketik langsung, layar menampilkan tanda tanya lalu teks pengguna di baris yang sama. Pesan galat bisa berbeda antarversi Python.
- **Butir CP:** corpus memetakan minggu ini ke `DK-BK-c*` (irisan); `cpCodes` modul kosong karena pemrograman teks melampaui rumusan CP. Modul tidak menyatakan CP "terpenuhi".
- **Kunci "Prediksi dulu":** setelah baris 1: a = 5; baris 2: b = 7; baris 3: a = 10; dicetak `10 7`.
- **Kunci "Contoh setengah jadi":** `int` dan `a + b`; untuk 8 dan 5 tercetak `Jumlah: 13`.
- **Kunci "Susun urutannya":** A, B, C, D (atau B, A, C, D). C memakai `harga` dan `banyak` sehingga harus sesudah keduanya diisi; untuk 2000 dan 7 tercetak `Total: 14000`.
- **Kunci latihan:** (1) `print("Luas persegimu:", sisi * sisi, "cm persegi")`; sisi 6 mencetak 36. (2) `umur = int(input("Umurmu? "))` lalu `print("Tahun depan umurmu", umur + 1)`; masukan 13 mencetak `Tahun depan umurmu 14`. (3) `input` menghasilkan teks dan `+ 1` tidak bisa menambah teks dengan bilangan (`TypeError: can only concatenate str (not "int") to str`); perbaikan `int(umur) + 1`, yang mencetak 14. (4) `b` dihitung sekali pada baris 2 dan hasilnya disimpan; mengganti `a` kemudian tidak menghitung ulang `b`.
- **Kunci "Latihan bercampur":** (1) 5, lalu 10; tercetak 10. (2) a = 4, 8, 16; akhirnya 16.
- **Petunjuk bertahap:** (a) tulis nilai tiap variabel di tabel; (b) ingat `=` mengisi dari kanan ke kiri; (c) tandai hasil `input` sebagai teks; (d) bungkus dengan `int` bila akan dihitung.
- **AI:** tanpa AI. Kebijakan `smp-coding` (silabus bagian 7.1): AI generatif hanya demonstrasi guru, tanpa akun murid; asesmen tanpa AI.
- **Privasi:** nama masukan contoh rekaan (`Murid-01`); tanpa nama murid pada berkas.
- **Unsur pembelajaran:** ingat kembali dan jarak (`K`), PRIMM (`K` usia 11 sampai 14), tabel penelusuran (`K`), contoh lengkap lalu setengah jadi (`K`), Parsons (`M`), latihan bercampur (`K`).
