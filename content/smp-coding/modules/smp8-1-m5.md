## Untuk siapa modul ini

Modul ini untuk murid kelas 8 pada minggu kelima semester pertama. Kamu memakai Scratch tanpa akun; simpan berkas sesuai arahan gurumu. Kalau komputer terbatas, tabel penelusuran di kertas cukup untuk sebagian besar kegiatan. Waktunya satu pertemuan, 2 JP. Prasyaratnya `SMP8-1-M3` (abstraksi).

## Ingat kembali

Tutup modul ini dan jawab dari ingatan.

1. Tulis pseudocode dengan `ULANGI 5 KALI` yang menampilkan jumlah 1 + 2 + 3 + 4 + 5. (`SMP8-1-M1`)
2. Telusuri `set [a] to (0)`, lalu `repeat (4)` berisi `change [a] by (3)`; tulis nilai `a` per putaran. (`SMP8-1-M4`)
3. Barisan 2, 4, 6, 8: tulis aturan umumnya. (`SMP7-1-M7`)

Kunci: (1) `TETAPKAN jumlah = 0`, `TETAPKAN i = 0`, `ULANGI 5 KALI` berisi `TETAPKAN i = i + 1` dan `TETAPKAN jumlah = jumlah + i`, lalu `TAMPILKAN jumlah`, hasil 15; (2) 3, 6, 9, 12; (3) bilangan ke-n adalah 2 dikali n.

## Tujuan

Setelah modul ini kamu dapat:

1. memakai `mod` (sisa bagi) untuk menguji apakah satu bilangan habis dibagi bilangan lain;
2. menulis program yang mengumpulkan **faktor** sebuah bilangan;
3. memakai banyak faktor untuk memeriksa bilangan prima;
4. menulis program yang menghasilkan **pola bilangan** dan menelusurinya.

## Prediksi dulu

Operator `(a) mod (b)` memberi **sisa** a dibagi b; misalnya 10 mod 3 = 1 dan 10 mod 5 = 0. Sebuah bilangan b adalah **faktor** dari n bila n mod b = 0.

Program P:

```text
when green flag clicked
set [n] to (6)
set [i] to (1)
set [banyak] to (0)
repeat (n)
  if <((n) mod (i)) = (0)> then
    change [banyak] by (1)
  change [i] by (1)
```

**Prediksi.** Berapa `banyak` pada akhirnya? Tulis dulu.

**Jalankan.** Telusuri dengan tabel:

| i | n mod i | sisa = 0? | banyak |
| --- | --- | --- | --- |
| 1 | | | |
| 2 | | | |
| 3 | | | |
| 4 | | | |
| 5 | | | |
| 6 | | | |

**Selidiki.** Cocokkan dengan prediksimu. Bilangan mana saja yang membuat sisanya 0?

## Contoh terselesaikan

Penelusuran P: sisa 0, 0, 0, 2, 1, 0; sisa 0 pada i = 1, 2, 3, 6, jadi `banyak` = 4.

Sekarang program yang menyimpan faktor n = 10 ke daftar:

```text
when green flag clicked
set [n] to (10)
delete all of [faktor]
set [i] to (1)
repeat (n)
  if <((n) mod (i)) = (0)> then
    add (i) to [faktor]
  change [i] by (1)
```

| i | n mod i | masuk daftar? |
| --- | --- | --- |
| 1 | 0 | ya |
| 2 | 0 | ya |
| 3 | 1 | tidak |
| 4 | 2 | tidak |
| 5 | 0 | ya |
| 6 | 4 | tidak |
| 7 | 3 | tidak |
| 8 | 2 | tidak |
| 9 | 1 | tidak |
| 10 | 0 | ya |

Daftar `faktor` berisi 1, 2, 5, 10. Bilangan **prima** adalah bilangan lebih dari 1 yang tepat memiliki dua faktor. Untuk n = 7 sisanya 0, 1, 1, 3, 2, 1, 0, jadi faktornya 1 dan 7 saja: prima. Untuk n = 10 ada empat faktor, jadi bukan prima.

Tiga hal yang perlu diingat. Pertama, `repeat (n)` dan `i` mulai dari 1 membuat setiap kandidat dari 1 sampai n diperiksa. Kedua, `change [i]` ada di luar `if` supaya `i` naik tiap putaran. Ketiga, satu program yang sama bisa menjawab banyak pertanyaan hanya dengan mengganti n.

## Contoh setengah jadi

Pola bilangan segitiga: 1, 3, 6, 10, 15. Isi bagian kosong, lalu tulis isi `pola` sesudah program selesai.

```text setengah-jadi
set [jumlah] to (0)
set [i] to (0)
delete all of [pola]
repeat (5)
  change [i] by (1)
  change [jumlah] by (____)
  add (____) to [pola]
```

## Susun urutannya

Tujuh baris berikut sudah diacak. Susun menjadi program faktor pada contoh terselesaikan.

- **A.** `set [n] to (10)`
- **B.** `delete all of [faktor]`
- **C.** `set [i] to (1)`
- **D.** `repeat (n)`
- **E.** `  if <((n) mod (i)) = (0)> then` (di dalam `repeat`)
- **F.** `    add (i) to [faktor]` (di dalam `if`)
- **G.** `  change [i] by (1)` (di dalam `repeat`, sesudah `if`)

Tulis urutan hurufnya. Jelaskan mengapa `change [i]` ada sesudah `if`, bukan di dalamnya.

## Latihan

1. **Ubah.** Ganti `n` menjadi 15. Tulis isi `faktor` dan banyaknya.
2. **Buat.** Tambahkan di akhir: bila `faktor` berisi tepat dua nilai, ucapkan "prima", bila tidak "bukan". Apa hasilnya untuk n = 13 dan n = 9?
3. **Buat.** Ubah program pola agar menghasilkan bilangan persegi 1, 4, 9, 16, 25.
4. **Selidiki.** Pada program faktor dengan n = 10, ganti `repeat (n)` menjadi `repeat (5)`. Faktor apa yang hilang, dan mengapa?
5. **Jelaskan.** Dengan dua kalimat, jelaskan mengapa sisa 0 berarti sebuah bilangan adalah faktor.

## Latihan bercampur

1. Kamu ingin membungkus program faktor dalam blok `hitung-faktor`. Apa yang menjadi masukannya, dan mengapa? (`SMP8-1-M2`, `SMP8-1-M3`)
2. Program: `set [t] to (20)`, `set [v] to (0)`, lalu `repeat (2)` berisi `change [v] by (3)` dan `change [t] by ((0) - (v))`. Berapa `t` dan `v` akhirnya? (`SMP8-1-M4`)

## Ulang berjarak

Kerjakan ulang tanpa melihat modul ini, lalu cocokkan:

- **Akhir semester** (`SMP8-1-M14`): tulis dari ingatan program yang menyimpan semua faktor sebuah bilangan ke daftar.
- **Awal semester depan** (`SMP8-2-M5`): jelaskan apa yang berubah dan apa yang tetap pada tiap putaran perulangan yang memakai variabel `i`.
- **Semester depan** (`SMP9-1-M8`): sebut dua cara berbeda memeriksa apakah sebuah bilangan prima.

## Kesalahan umum

- **Memulai `i` dari 0.** Pembagian dengan 0 tidak terdefinisi. Kenali: hasil tabelmu bergeser satu baris.
- **Menaruh `change [i]` di dalam `if`.** `i` hanya naik bila sisa 0. Kenali: perulangan berhenti menguji bilangan baru.
- **Mengira 1 adalah prima.** 1 hanya punya satu faktor. Kenali: banyak faktor 1, bukan 2.
- **Lupa `delete all of [faktor]`.** Isi lama menumpuk. Kenali: daftar berisi faktor dari n sebelumnya.
- **Menulis `mod` terbalik** (`i mod n`). Kenali: hasil berbeda dari tabelmu.

## Cek mandiri

Tutup modul, jawab tanpa melihat, lalu periksa.

1. Berapa 17 mod 5, dan apakah 5 faktor dari 17?
2. Tulis semua faktor dari 12.
3. Mengapa pola bilangan segitiga memakai `jumlah` yang terus bertambah?

Daftar periksa (kosong; kamu isi sendiri, tidak dikumpulkan):

- [ ] Aku bisa memakai `mod` untuk menguji faktor.
- [ ] Aku bisa menelusuri program faktor dengan tabel.
- [ ] Aku bisa menulis program pola bilangan.

Kunci: (1) 2; bukan faktor karena sisanya tidak 0; (2) 1, 2, 3, 4, 6, 12; (3) tiap bilangan baru adalah jumlah sebelumnya ditambah `i` yang naik, sehingga `jumlah` harus menyimpan hasil putaran lalu.

## Langkah berikutnya

`SMP8-1-M6`, "Lembar kerja: pilah, urutkan, saring data". Kita meninggalkan Scratch untuk bekerja dengan tabel data: memilah, mengurutkan, dan menyaring baris.

## Catatan untuk guru

- **Waktu:** 2 JP x 40 menit `[asumsi]` (silabus bagian 2). Berpasangan boleh untuk "Prediksi dulu" dan "Latihan"; bukan jaminan efek belajar.
- **Alat:** Scratch tanpa akun murid. Operator `mod` ada di kategori Operators; nama bisa berbeda menurut bahasa antarmuka. Penulis menelusuri tangan dan menghitung ulang dengan skrip bantu; ia tidak menjalankan program di editor Scratch.
- **Butir CP:** corpus memetakan minggu ini ke `D-BK-a`. Modul ini tidak menyatakan CP "terpenuhi"; ia hanya melatih berpikir komputasional pada soal bilangan.
- **Kunci "Prediksi dulu":** sisa 0, 0, 0, 2, 1, 0; banyak = 4 (faktor 1, 2, 3, 6).
- **Kunci "Contoh setengah jadi":** `change [jumlah] by (i)` dan `add (jumlah) to [pola]`; `pola` berisi 1, 3, 6, 10, 15.
- **Kunci "Susun urutannya":** A, B, C, D, E, F, G. Bila `change [i]` ada di dalam `if`, `i` tidak naik saat sisa bukan 0.
- **Kunci latihan:** (1) 1, 3, 5, 15; banyak 4. (2) tambah `if <(length of [faktor]) = (2)> then say [prima] else say [bukan]`; n = 13 menghasilkan faktor 1 dan 13, jadi "prima"; n = 9 menghasilkan 1, 3, 9, jadi "bukan". (3) `add ((i) * (i)) to [pola]` dengan `i` mulai 0 dan naik 1; hasil 1, 4, 9, 16, 25. (4) tinggal 1, 2, 5; faktor 10 hilang karena i berhenti di 5. (5) sisa 0 berarti pembagian habis tanpa sisa.
- **Kunci "Latihan bercampur":** (1) `n`, karena itu bagian yang berbeda antar panggilan. (2) v = 3 lalu 6; t = 17 lalu 11; akhirnya t = 11 dan v = 6.
- **Petunjuk bertahap:** (a) tulis nilai awal `n` dan `i`; (b) hitung n mod i tiap putaran; (c) putuskan masuk daftar atau tidak; (d) naikkan `i` dan lanjut.
- **AI:** tanpa AI. Kebijakan `smp-coding` (silabus bagian 7.1): AI generatif hanya demonstrasi guru, tanpa akun murid; asesmen tanpa AI.
- **Privasi:** tanpa nama murid pada berkas proyek.
- **Unsur pembelajaran:** ingat kembali dan jarak (`K`), PRIMM (`K` usia 11 sampai 14), tabel penelusuran (`K`), contoh lengkap lalu setengah jadi (`K`), Parsons (`M`), latihan bercampur (`K`).
