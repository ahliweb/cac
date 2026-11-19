## Untuk siapa modul ini

Modul ini untuk murid kelas 7 pada minggu keempat semester kedua. Kamu memakai Scratch tanpa akun; simpan berkas sesuai arahan gurumu. Kalau komputer terbatas, tabel penelusuran di kertas cukup untuk sebagian besar kegiatan. Waktunya satu pertemuan, 2 JP. Prasyaratnya `SMP7-1-M9` (variabel) dan `SMP7-2-M1` (data dan tabel).

## Ingat kembali

Tutup modul ini dan jawab dari ingatan.

1. Tulis dari ingatan program yang menghitung skor lewat tiga putaran. (`SMP7-1-M9`, `SMP7-1-M5`)
2. Ubah `01010` menjadi angka. (`SMP7-2-M3`)
3. Beri satu contoh data diskrit dan satu informasi yang bisa diambil dari tabel. (`SMP7-2-M1`)
4. Apa yang dijalankan `if ... else` bila kondisinya salah? (`SMP7-1-M8`)

Kunci: (1) contoh: `set [skor] to (0)`, `repeat (3)` berisi `change [skor] by (10)`, lalu `say (skor)`; hasil 30; yang penting `set` di luar `repeat`; (2) 10; (3) jawaban bebas, mis. banyak saudara, dan "paling banyak murid punya satu saudara"; (4) cabang `else`.

## Tujuan

Setelah modul ini kamu dapat:

1. menjelaskan **daftar** (*list*) sebagai kumpulan nilai berurutan dengan nomor urut mulai 1;
2. memakai `add`, `replace`, `item`, dan `length of` pada daftar Scratch;
3. menelusuri isi daftar langkah demi langkah dengan tabel;
4. menjumlahkan isi daftar dengan perulangan dan penunjuk nomor `i`.

## Prediksi dulu

Satu variabel hanya menyimpan satu nilai. Bila datanya banyak, misalnya jumlah buku delapan murid, kita memakai **daftar**: satu nama untuk banyak nilai yang berurutan. Tiap nilai punya **nomor urut** (indeks), dan di Scratch nomornya dimulai dari 1. Blok yang dipakai: `add [x] to [daftar]` menaruh di ujung akhir, `replace item (n) of [daftar] with [x]` mengganti isi nomor n, `(item (n) of [daftar])` membaca isi nomor n, dan `(length of [daftar])` memberi banyak isi.

Program Z (daftar `nilai` dibuat lewat kategori Variabel):

```text
when green flag clicked
delete all of [nilai]
add [30] to [nilai]
add [10] to [nilai]
add [20] to [nilai]
replace item (2) of [nilai] with [15]
say (item (2) of [nilai]) for (2) seconds
```

**Prediksi.** Apa isi `nilai` pada akhirnya, dan apa yang diucapkan sprite? Tulis dulu.

**Jalankan.** Susun Z, klik bendera hijau, dan isi tabel penelusuran:

| Blok | Isi `nilai` |
| --- | --- |
| `delete all of [nilai]` | |
| `add [30] to [nilai]` | |
| `add [10] to [nilai]` | |
| `add [20] to [nilai]` | |
| `replace item (2) of [nilai] with [15]` | |

**Selidiki.** Cocokkan dengan prediksimu. Mengapa `delete all` perlu di awal? Karena daftar, seperti variabel, menyimpan isinya sampai diubah.

## Contoh terselesaikan

Penelusuran program Z:

| Blok | Isi `nilai` | Alasan |
| --- | --- | --- |
| `delete all of [nilai]` | kosong | Daftar dikosongkan supaya mulai bersih. |
| `add [30] to [nilai]` | 30 | Nomor 1. |
| `add [10] to [nilai]` | 30, 10 | Nomor 2. |
| `add [20] to [nilai]` | 30, 10, 20 | Nomor 3. |
| `replace item (2) of [nilai] with [15]` | 30, 15, 20 | Isi nomor 2 diganti. |

Sprite mengucapkan 15. Sekarang menjumlahkan isi daftar `nilai` (30, 15, 20) dengan penunjuk `i`:

```text
when green flag clicked
set [jumlah] to (0)
set [i] to (1)
repeat (length of [nilai])
  change [jumlah] by (item (i) of [nilai])
  change [i] by (1)
say (jumlah) for (2) seconds
```

| Putaran | `i` sebelum | item `i` | jumlah |
| --- | --- | --- | --- |
| 1 | 1 | 30 | 30 |
| 2 | 2 | 15 | 45 |
| 3 | 3 | 20 | 65 |

Sprite mengucapkan 65. Tiga hal yang perlu diingat. Daftar punya urutan dan nomor, variabel biasa tidak. `i` menunjuk nomor yang sedang dibaca dan harus ditambah tiap putaran. Jumlah putaran sama dengan `length of`, sehingga program tetap benar bila isi daftar bertambah.

## Contoh setengah jadi

Daftar `buku` berisi 5, 6, 5 (jumlah buku tiga murid rekaan). Isi bagian kosong, lalu telusuri.

```text
when green flag clicked
set [jumlah] to (0)
set [i] to (____)
repeat (length of [buku])
  change [jumlah] by (item (i) of [buku])
  change [i] by (____)
say (jumlah) for (2) seconds
```

Sebut ucapan sprite.

## Susun urutannya

Tujuh baris berikut sudah diacak. Susun menjadi program yang menjumlahkan isi daftar `buku` lalu mengucapkan hasilnya.

- **A.** `when green flag clicked`
- **B.** `set [jumlah] to (0)`
- **C.** `set [i] to (1)`
- **D.** `repeat (length of [buku])`
- **E.** `  change [jumlah] by (item (i) of [buku])` (di dalam `repeat`)
- **F.** `  change [i] by (1)` (di dalam `repeat`)
- **G.** `say (jumlah) for (2) seconds`

Tulis urutan hurufnya. Jelaskan mengapa `set [jumlah]` dan `set [i]` harus sebelum `repeat`.

## Latihan

1. **Ubah.** Pada program jumlah dengan `buku` = 5, 6, 5, tambahkan `add [9] to [buku]` sebelum `set [jumlah] to (0)`. Prediksi ucapan sprite, lalu telusuri.
2. **Buat.** Tulis program yang membuat daftar `saudara` berisi 1, 0, 2 dan mengucapkan item nomor 3.
3. **Selidiki.** Pada program jumlah (`buku` = 5, 6, 5), hapus baris `change [i] by (1)`. Telusuri. Apa yang diucapkan?
4. **Buat.** Dengan daftar `buku` = 5, 6, 5, 7, tulis program yang mengucapkan banyak isi daftar dengan `length of`.
5. **Jelaskan.** Dengan dua kalimat, jelaskan beda variabel biasa dan daftar.

## Latihan bercampur

Daftar baru dikenalkan, jadi latihan bercampur yang memuat daftar dimulai di modul berikutnya; dua soal ini mencampur topik sebelumnya.

1. Mana yang diskrit: banyak saudara, tinggi badan dalam sentimeter dengan pecahan, pilihan cara berangkat? Beri alasan. (`SMP7-2-M1`)
2. Program: `set [a] to (1)`, lalu `repeat (4)` berisi `if <(a) < (4)> then change [a] by (2) else change [a] by (-3)`. Berapa nilai akhir `a`? (`SMP7-1-M5`, `SMP7-1-M8`, `SMP7-1-M9`)

## Ulang berjarak

Kerjakan ulang tanpa melihat modul ini, lalu cocokkan:

- **Minggu depan** (`SMP7-2-M6`): tulis cara membaca item nomor `i` dan menjumlahkan isi daftar.
- **Sekitar sebulan lagi** (`SMP7-2-M8`): tulis blok yang menaruh satu nilai ke ujung daftar `skor-tertinggi` dan sebut nomor urut isi pertama.
- **Akhir semester** (`SMP7-2-M14`): tulis program yang menjumlahkan daftar `nilai` berisi tiga angka, tanpa melihat contoh.

## Kesalahan umum

- **Mengira nomor urut mulai dari 0.** Di Scratch mulai dari 1. Kenali: item pertama tidak pernah terbaca.
- **Lupa `change [i] by (1)`.** Kenali: yang dijumlahkan item yang sama berulang.
- **Lupa `delete all` di awal.** Kenali: daftar makin panjang tiap bendera diklik.
- **Menaruh `set [jumlah] to (0)` di dalam `repeat`.** Kenali: jumlah selalu hanya item terakhir.
- **Mengira `add` mengganti isi.** `add` menambah di ujung; yang mengganti adalah `replace`.

## Cek mandiri

Tutup modul, jawab tanpa melihat, lalu periksa.

1. Apa arti daftar dan nomor urutnya di Scratch?
2. Daftar `d` berisi 4, 8. Setelah `add [6] to [d]`, berapa `length of [d]` dan apa `item (2) of [d]`?
3. Mengapa jumlah putaran dipasang `length of [nilai]` dan bukan angka tetap?

Daftar periksa (kosong; kamu isi sendiri, tidak dikumpulkan):

- [ ] Aku bisa memakai `add`, `replace`, dan `item`.
- [ ] Aku bisa menelusuri isi daftar dengan tabel.
- [ ] Aku bisa menjumlahkan isi daftar dengan `i`.

Kunci: (1) kumpulan nilai berurutan; nomor mulai 1; (2) 3 dan 8; (3) supaya program tetap benar bila isi daftar berubah.

## Langkah berikutnya

`SMP7-2-M5`, "Mencari dan mengurutkan". Kamu akan memikirkan cara mencari satu nilai dan mengurutkan kartu, sebelum menulis program pengurutan di `SMP7-2-M6`.

## Catatan untuk guru

- **Waktu:** 2 JP x 40 menit `[asumsi]` (silabus bagian 2). Berpasangan boleh untuk "Prediksi dulu" dan "Latihan"; bukan jaminan efek belajar.
- **Alat:** Scratch tanpa akun murid; daftar dibuat lewat kategori Variabel ("Make a List"). Nama blok bisa berbeda menurut bahasa antarmuka. Penulis menelusuri tangan semua program di modul ini dan tidak menjalankannya di editor Scratch; guru sebaiknya mencoba dulu.
- **Butir CP:** corpus memetakan minggu ini ke `D-BK-b`, `D-BK-e`, dan `D-BK-a`. Modul ini tidak menyatakan CP "terpenuhi"; cakupan `D-BK-b` bersifat sebagian (daftar dan tabel).
- **Kunci "Prediksi dulu":** 30, 15, 20; sprite mengucapkan 15.
- **Kunci "Contoh setengah jadi":** `set [i] to (1)` dan `change [i] by (1)`; sprite mengucapkan 16.
- **Kunci "Susun urutannya":** A, B, C, D, E, F, G (B dan C boleh tertukar). Keduanya harus di luar `repeat` agar bernilai awal satu kali.
- **Kunci latihan:** (1) isi 5, 6, 5, 9; jumlah 25. (2) `delete all`, `add [1]`, `add [0]`, `add [2]`, `say (item (3) of [saudara])`: 2. (3) `i` tetap 1: 5 + 5 + 5 = 15. (4) `say (length of [buku])`: 4. (5) variabel menyimpan satu nilai; daftar menyimpan banyak nilai berurutan dengan nomor.
- **Kunci "Latihan bercampur":** (1) banyak saudara diskrit; tinggi badan dengan pecahan bukan diskrit (nilainya bisa di antara dua angka); pilihan cara berangkat diskrit (pilihan terbatas). (2) putaran 1: 1 < 4, a = 3; putaran 2: 3 < 4, a = 5; putaran 3: 5 < 4 salah, a = 2; putaran 4: 2 < 4, a = 4. Nilai akhir 4.
- **Petunjuk bertahap:** (a) tulis isi daftar awal; (b) perbarui satu isi per baris; (c) telusuri `i` dan jumlah per putaran.
- **AI:** tanpa AI. Kebijakan `smp-coding` (silabus bagian 7.1): AI generatif hanya demonstrasi guru, tanpa akun murid; asesmen tanpa AI.
- **Privasi:** tanpa nama murid pada berkas proyek; data daftar rekaan.
- **Unsur pembelajaran:** ingat kembali dan jarak (`K`), PRIMM (`K` usia 11 sampai 14), tabel penelusuran (`K`), contoh lengkap lalu setengah jadi (`K`), Parsons (`M`), latihan bercampur (`K`).

## Rujukan

- *Panduan Mata Pelajaran Informatika, Fase D – F*, BSKAP, 2025:
  <https://repositori.kemendikdasmen.go.id/33634/1/32.%20Panduan%20Mata%20Pelajaran%20Informatika.pdf>
- Scratch, tentang Scratch (situs resmi Scratch Foundation): <https://scratch.mit.edu/about>
