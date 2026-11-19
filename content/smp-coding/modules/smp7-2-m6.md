## Untuk siapa modul ini

Modul ini untuk murid kelas 7 pada minggu keenam semester kedua. Kamu memakai Scratch tanpa akun; simpan berkas sesuai arahan gurumu. Kalau komputer terbatas, tabel penelusuran di kertas cukup untuk sebagian besar kegiatan. Waktunya satu pertemuan, 2 JP. Prasyaratnya `SMP7-2-M4` (daftar) dan `SMP7-2-M5` (strategi mengurutkan).

## Ingat kembali

Tutup modul ini dan jawab dari ingatan.

1. Tulis strategi tukar tetangga dalam satu kalimat. (`SMP7-2-M5`)
2. Daftar `nilai` berisi 30, 15, 20. Apa `item (2) of [nilai]` dan `length of [nilai]`? (`SMP7-2-M4`)
3. Ubah `10001` menjadi angka. (`SMP7-2-M3`)
4. `repeat (3)` berisi dua blok `move`. Berapa kali `move` berjalan? (`SMP7-1-M5`)

Kunci: (1) bandingkan dua kartu bersebelahan, tukar bila terbalik, ulangi sampai tak ada yang terbalik; (2) 15 dan 3; (3) 17; (4) enam kali.

## Tujuan

Setelah modul ini kamu dapat:

1. menulis penukaran dua isi daftar memakai variabel sementara `tmp`;
2. menulis program pengurutan kecil dengan dua `repeat` bersarang;
3. menelusuri program pengurutan dengan tabel per perbandingan;
4. menjelaskan mengapa jumlah putaran dan `tmp` penting.

## Prediksi dulu

Strategi tukar tetangga dari `SMP7-2-M5` bisa ditulis sebagai program. `repeat` luar mengulang putaran penuh; `repeat` dalam menggeser penunjuk `i` dari 1 sampai sebelum isi terakhir. Untuk menukar dua isi diperlukan **`tmp`** (tempat sementara): tanpa itu, isi pertama tertimpa sebelum sempat disalin.

Program B untuk daftar `angka` berisi 4, 2, 3, 1:

```text
when green flag clicked
delete all of [angka]
add [4] to [angka]
add [2] to [angka]
add [3] to [angka]
add [1] to [angka]
repeat (3)
  set [i] to (1)
  repeat (3)
    if <(item (i) of [angka]) > (item ((i) + (1)) of [angka])> then
      set [tmp] to (item (i) of [angka])
      replace item (i) of [angka] with (item ((i) + (1)) of [angka])
      replace item ((i) + (1)) of [angka] with (tmp)
    change [i] by (1)
```

**Prediksi.** Bayangkan `repeat` luar hanya berjalan **satu kali**. Apa isi `angka` sesudahnya? Tulis dulu.

**Jalankan.** Susun B dan telusuri satu putaran luar dengan tabel.

**Selidiki.** Cocokkan dengan prediksimu. Kartu terbesar akan ke mana sesudah satu putaran?

## Contoh terselesaikan

Penelusuran penuh program B, satu baris per perbandingan:

| Putaran | `i` | Perbandingan | Tukar? | `angka` sesudah |
| --- | --- | --- | --- | --- |
| 1 | 1 | 4 > 2 | ya | 2, 4, 3, 1 |
| 1 | 2 | 4 > 3 | ya | 2, 3, 4, 1 |
| 1 | 3 | 4 > 1 | ya | 2, 3, 1, 4 |
| 2 | 1 | 2 > 3 | tidak | 2, 3, 1, 4 |
| 2 | 2 | 3 > 1 | ya | 2, 1, 3, 4 |
| 2 | 3 | 3 > 4 | tidak | 2, 1, 3, 4 |
| 3 | 1 | 2 > 1 | ya | 1, 2, 3, 4 |
| 3 | 2 | 2 > 3 | tidak | 1, 2, 3, 4 |
| 3 | 3 | 3 > 4 | tidak | 1, 2, 3, 4 |

Hasil akhir 1, 2, 3, 4 dengan **5** pertukaran. Sesudah putaran pertama isi terbesar ada di ujung; sesudah putaran kedua, dua isi terbesar; karena itu empat isi memerlukan tiga putaran.

Mengapa `tmp`? Misalkan isi 4 dan 2 ditukar tanpa `tmp`: `replace item (1) with (item (2))` membuat daftar 2, 2, dan `replace item (2) with (item (1))` tetap 2. Angka 4 hilang. Dengan `tmp`, 4 disimpan dulu.

Tiga hal yang perlu diingat. Dua `repeat` bersarang: yang dalam berjalan penuh untuk tiap putaran luar. `set [i] to (1)` harus di dalam putaran luar supaya `i` kembali ke awal. Jumlah putaran dalam sebanyak isi dikurangi satu, supaya `item (i + 1)` selalu ada.

## Contoh setengah jadi

Satu putaran untuk daftar `angka` berisi 3, 1, 2. Isi bagian kosong, lalu telusuri.

```text
set [i] to (1)
repeat (2)
  if <(item (i) of [angka]) > (item ((i) + (1)) of [angka])> then
    set [tmp] to (item (i) of [angka])
    replace item (i) of [angka] with (item ((i) + (1)) of [angka])
    replace item ((i) + (1)) of [angka] with (____)
  change [i] by (____)
```

Sebut isi `angka` sesudahnya.

## Susun urutannya

Empat baris penukaran berikut sudah diacak. Susun menjadi blok yang menukar isi nomor `i` dan nomor `i + 1` bila isi nomor `i` lebih besar.

- **A.** `if <(item (i) of [angka]) > (item ((i) + (1)) of [angka])> then`
- **B.** `  set [tmp] to (item (i) of [angka])` (di dalam `if`)
- **C.** `  replace item (i) of [angka] with (item ((i) + (1)) of [angka])` (di dalam `if`)
- **D.** `  replace item ((i) + (1)) of [angka] with (tmp)` (di dalam `if`)

Tulis urutan hurufnya. Jelaskan mengapa B harus sebelum C.

## Latihan

1. **Ubah.** Pada program B, ganti `>` menjadi `<`. Prediksi isi akhir `angka` (4, 2, 3, 1), lalu telusuri.
2. **Ubah.** Ganti `repeat (3)` luar menjadi `repeat (2)`. Apakah daftar 4, 2, 3, 1 sudah urut? Telusuri.
3. **Buat.** Tulis program yang mengurutkan daftar berisi dua isi, 9 dan 4, dengan satu perbandingan.
4. **Selidiki.** Hapus `set [i] to (1)` dari dalam putaran luar dan letakkan sebelum `repeat` luar. Apa yang salah pada putaran kedua?
5. **Jelaskan.** Dengan dua kalimat, jelaskan mengapa `tmp` diperlukan.

## Latihan bercampur

Dua soal ini mencampur topik modul ini dengan modul sebelumnya.

1. Tukar tetangga pada kartu 3, 2, 1: berapa pertukaran sampai urut? (`SMP7-2-M5`)
2. Daftar `d` berisi 4, 6, 2. Program menjumlahkannya dengan `i` dan `repeat (length of [d])`. Berapa ucapan sprite? (`SMP7-2-M4`)

## Ulang berjarak

Kerjakan ulang tanpa melihat modul ini, lalu cocokkan:

- **Minggu depan** (`SMP7-2-M7`): tulis tiga blok yang menukar dua isi daftar memakai `tmp`.
- **Sekitar sebulan lagi** (`SMP7-2-M11`): sebut tiga kasus uji untuk program pengurutan, yaitu daftar yang sudah urut, terbalik, dan berisi angka kembar.
- **Akhir semester** (`SMP7-2-M14`): tulis dari ingatan dua `repeat` bersarang yang mengurutkan daftar kecil.

## Kesalahan umum

- **Menukar tanpa `tmp`.** Kenali: dua isi menjadi sama.
- **Lupa mengembalikan `i` ke 1.** Kenali: putaran kedua tidak membandingkan apa-apa.
- **Putaran dalam terlalu banyak.** Pada empat isi, `repeat (4)` membandingkan isi nomor 4 dengan isi nomor 5 yang tidak ada.
- **Putaran luar terlalu sedikit.** Kenali: daftar hampir urut, tetapi masih ada yang terbalik.
- **Memakai `>=`.** Menukar dua isi sama tidak perlu; kenali dari pertukaran yang tidak mengubah apa-apa.

## Cek mandiri

Tutup modul, jawab tanpa melihat, lalu periksa.

1. Mengapa penukaran dua isi daftar butuh `tmp`?
2. Berapa putaran luar yang cukup untuk empat isi pada program B?
3. Sesudah satu putaran luar, isi mana yang pasti sudah di tempat akhirnya?

Daftar periksa (kosong; kamu isi sendiri, tidak dikumpulkan):

- [ ] Aku bisa menulis penukaran dengan `tmp`.
- [ ] Aku bisa menelusuri dua `repeat` bersarang.
- [ ] Aku bisa menjelaskan jumlah putaran.

Kunci: (1) tanpa `tmp`, isi pertama tertimpa; (2) tiga; (3) isi terbesar, di ujung.

## Langkah berikutnya

`SMP7-2-M7`, "Game: koordinat, gerak, tabrakan". Kita pindah ke permainan: sprite yang bergerak di panggung dan bereaksi saat bersentuhan.

## Catatan untuk guru

- **Waktu:** 2 JP x 40 menit `[asumsi]` (silabus bagian 2). Berpasangan boleh untuk "Prediksi dulu" dan "Latihan"; bukan jaminan efek belajar.
- **Alat:** Scratch tanpa akun murid; daftar dan variabel dari kategori Variabel. Nama blok bisa berbeda menurut bahasa antarmuka. Penulis menelusuri tangan semua program dan mensimulasikan hitungannya di luar Scratch; guru sebaiknya mencoba dulu di editor.
- **Butir CP:** corpus memetakan minggu ini ke `D-BK-e` dan `DK-BK-c`. Modul ini tidak menyatakan CP "terpenuhi"; ia hanya melatih menulis instruksi urutan, pengulangan, dan kondisi.
- **Kunci "Prediksi dulu":** 2, 3, 1, 4; terbesar (4) ada di ujung.
- **Kunci "Contoh setengah jadi":** `tmp` dan `1`; sesudahnya 1, 2, 3.
- **Kunci "Susun urutannya":** A, B, C, D. `tmp` harus menyimpan isi nomor `i` sebelum ditimpa.
- **Kunci latihan:** (1) 4, 3, 2, 1 (urut turun): putaran 1: 4 < 2 salah; 2 < 3 benar, tukar menjadi 4, 3, 2, 1; 2 < 1 salah; putaran berikutnya tidak ada pertukaran. (2) belum: sesudah dua putaran 2, 1, 3, 4. (3) `add [9]`, `add [4]`, `set [i] to (1)`, `repeat (1)` berisi `if` dan tiga baris penukaran; hasil 4, 9. (4) pada putaran kedua `i` sudah 4, jadi perbandingan memakai isi di luar daftar. (5) tanpa `tmp`, isi yang akan disalin sudah tertimpa.
- **Kunci "Latihan bercampur":** (1) 3 pertukaran (3, 2, 1 menjadi 2, 3, 1; lalu 2, 1, 3; lalu 1, 2, 3). (2) 4 + 6 + 2 = 12.
- **Petunjuk bertahap:** (a) tulis isi daftar awal; (b) telusuri satu perbandingan per baris; (c) tulis isi daftar sesudah tiap penukaran.
- **AI:** tanpa AI. Kebijakan `smp-coding` (silabus bagian 7.1): AI generatif hanya demonstrasi guru, tanpa akun murid; asesmen tanpa AI.
- **Privasi:** tanpa nama murid pada berkas proyek.
- **Unsur pembelajaran:** ingat kembali dan jarak (`K`), PRIMM (`K` usia 11 sampai 14), tabel penelusuran (`K`), contoh lengkap lalu setengah jadi (`K`), Parsons (`M`), latihan bercampur (`K`).

## Rujukan

- *Panduan Mata Pelajaran Informatika, Fase D – F*, BSKAP, 2025:
  <https://repositori.kemendikdasmen.go.id/33634/1/32.%20Panduan%20Mata%20Pelajaran%20Informatika.pdf>
- Scratch, tentang Scratch (situs resmi Scratch Foundation): <https://scratch.mit.edu/about>
