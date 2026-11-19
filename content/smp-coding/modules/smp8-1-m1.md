## Untuk siapa modul ini

Modul ini untuk murid kelas 8 pada minggu pertama semester pertama. Kamu hanya memerlukan kertas dan pensil; tidak ada komputer. Waktunya satu pertemuan, 2 JP. Prasyaratnya `SMP7-1-M2` (algoritma sebagai urutan langkah). Semua toko, harga, dan angka di modul ini rekaan.

## Ingat kembali

Tutup modul ini dan jawab dari ingatan. Kelas 7 sudah berlalu, jadi ini ujian ingatan yang bagus.

1. Tulis langkah-langkah, dalam kalimat singkat, untuk mencari angka terbesar dari tiga angka. (`SMP7-2-M14`)
2. Kapan sebuah `if` menjalankan isinya? (`SMP7-1-M8`)
3. Tulis arti **dekomposisi** dengan kalimatmu sendiri. (`SMP7-1-M6`)

Kunci: (1) anggap angka pertama terbesar sementara; bandingkan dengan angka kedua dan ganti bila lebih besar; ulangi dengan angka ketiga; tampilkan yang tersisa; (2) bila kondisinya benar pada saat diperiksa; (3) memecah masalah besar menjadi bagian kecil yang dikerjakan sendiri-sendiri.

## Tujuan

Setelah modul ini kamu dapat:

1. membaca dan menulis *pseudocode* dengan lima kata baku: `BACA`, `TETAPKAN`, `JIKA`, `ULANGI`, `TAMPILKAN`;
2. mengubah soal cerita pendek menjadi langkah yang bisa ditelusuri;
3. menelusuri pseudocode dengan tabel nilai;
4. menjelaskan mengapa kosakata dibatasi.

## Prediksi dulu

*Pseudocode* adalah cara menulis langkah dengan kosakata terbatas, bukan bahasa pemrograman: tidak dijalankan komputer, tetapi cukup tepat untuk ditelusuri manusia. Kosakata yang dipakai di modul ini:

| Kata | Artinya |
| --- | --- |
| `BACA x` | ambil satu nilai masukan dan simpan di `x` |
| `TETAPKAN x = ...` | isi `x` dengan hasil hitungan di kanan |
| `JIKA ... MAKA` dan `LAINNYA` | menjalankan baris menjorok bila kondisi benar; `LAINNYA` bila salah |
| `ULANGI n KALI` | menjalankan baris menjorok sebanyak `n` kali |
| `TAMPILKAN x` | menuliskan nilai `x` (atau hasil hitungan seperti `a + b`) sebagai hasil |

Pseudocode P:

```text
Pseudocode:
BACA a
BACA b
TETAPKAN c = a + b
JIKA c > 10 MAKA
  TETAPKAN c = c - 10
TAMPILKAN c
```

**Prediksi.** Bila `a` = 7 dan `b` = 6, apa yang ditampilkan? Bila `a` = 2 dan `b` = 3? Tulis dulu.

**Jalankan.** Telusuri di kertas: tulis nilai `a`, `b`, `c` setelah tiap baris.

**Selidiki.** Cocokkan dengan prediksimu. Baris `JIKA` dilewati pada yang mana, dan mengapa?

## Contoh terselesaikan

Soal cerita: pensil harganya Rp2.000 per buah. Bila membeli 10 buah atau lebih, total dipotong Rp5.000. Berapa yang dibayar?

Langkahnya: masukan adalah banyak pensil `n`; hitung total; potong bila `n` cukup; tampilkan.

```text
Pseudocode:
BACA n
TETAPKAN total = n * 2000
JIKA n >= 10 MAKA
  TETAPKAN total = total - 5000
TAMPILKAN total
```

| n | n * 2000 | n >= 10 | total ditampilkan |
| --- | --- | --- | --- |
| 4 | 8000 | salah | 8000 |
| 10 | 20000 | benar | 15000 |
| 12 | 24000 | benar | 19000 |

Tiga hal yang perlu diingat. Pertama, tiap angka di soal punya tempat: harga di `TETAPKAN`, batas di `JIKA`, potongan di baris menjorok. Kedua, uji di batas: `n` = 10 membuktikan `>=` dan bukan `>`. Ketiga, tiap baris berisi satu tindakan, seperti kebiasaan kartu instruksi.

## Contoh setengah jadi

Soal cerita: tabungan awal dibaca; tiap minggu ditambah Rp5.000 selama 4 minggu; tampilkan tabungan akhir. Isi bagian kosong.

```text setengah-jadi
Pseudocode:
BACA tabungan
ULANGI ____ KALI
  TETAPKAN tabungan = tabungan + ____
TAMPILKAN tabungan
```

Telusuri dengan tabungan awal 20000: tulis nilai `tabungan` sesudah tiap putaran.

## Susun urutannya

Enam baris berikut sudah diacak. Susun menjadi pseudocode yang menampilkan angka yang lebih besar dari dua angka.

- **A.** `BACA a`
- **B.** `BACA b`
- **C.** `JIKA a > b MAKA`
- **D.** `  TAMPILKAN a` (menjorok di bawah `JIKA`)
- **E.** `LAINNYA`
- **F.** `  TAMPILKAN b` (menjorok di bawah `LAINNYA`)

Tulis urutan hurufnya. Jelaskan mengapa `BACA` harus sebelum `JIKA`.

## Latihan

1. **Ubah.** Pada soal pensil, ganti syarat potongan menjadi 8 buah atau lebih. Berapa total untuk `n` = 8?
2. **Buat.** Soal cerita kedua: tiket masuk Rp3.000; bila umur kurang dari 12, harga Rp1.500. Tulis pseudocode dan telusuri untuk umur 10 dan 12.
3. **Buat.** Soal cerita ketiga: tiga nilai dibaca; tampilkan rata-ratanya. Telusuri untuk 3, 6, dan 9.
4. **Jelaskan.** Dengan dua kalimat, jelaskan mengapa pseudocode memakai kata yang itu-itu saja.

## Latihan bercampur

Pseudocode adalah cara tulis baru, jadi latihan bercampur dengan topik minggu-minggu sebelumnya dimulai di modul berikutnya; dua soal ini mengulang Scratch kelas 7.

1. Program: `set [a] to (1)`, lalu `repeat (3)` berisi `change [a] by (a)`. Berapa `a` akhirnya? (`SMP7-1-M5`, `SMP7-1-M9`)
2. `if <(x) > (5)> then say [besar] else say [kecil]` dengan x = 5. Apa yang diucapkan? (`SMP7-1-M8`)

## Ulang berjarak

Kerjakan ulang tanpa melihat modul ini, lalu cocokkan:

- **Minggu depan** (`SMP8-1-M2`): tulis pseudocode tiga baris yang membaca dua angka dan menampilkan jumlahnya.
- **Sekitar sebulan lagi** (`SMP8-1-M5`): tulis pseudocode dengan `ULANGI 5 KALI` yang menampilkan jumlah 1 + 2 + 3 + 4 + 5.
- **Akhir semester** (`SMP8-1-M14`): ubah satu soal cerita bertahap menjadi pseudocode dan telusuri dua masukan.

## Kesalahan umum

- **Menulis kalimat bebas yang tidak bisa ditelusuri**, misalnya "hitung harganya". Kenali: kamu tidak bisa membuat tabel nilai darinya.
- **Lupa menyiapkan nilai awal.** Kenali: baris `TETAPKAN x = x + ...` memakai `x` yang belum pernah diisi.
- **Mencampur penetapan dan perbandingan.** `TETAPKAN x = 5` mengisi; `JIKA x = 5` bertanya. Kenali: kamu menulis `JIKA` tetapi maksudmu mengisi.
- **Menambah kata baru** (misalnya "AMBIL") di tengah jalan. Kenali: temanmu tidak bisa menelusuri tulisanmu tanpa bertanya.
- **Tidak menguji di batas.** Kenali: `>` dan `>=` memberi hasil sama pada semua contohmu.

## Cek mandiri

Tutup modul, jawab tanpa melihat, lalu periksa.

1. Sebut lima kata baku pseudocode modul ini dan fungsi singkatnya.
2. Telusuri soal pensil untuk `n` = 9. Berapa total?
3. Mengapa uji di batas penting?

Daftar periksa (kosong; kamu isi sendiri, tidak dikumpulkan):

- [ ] Aku bisa mengubah soal cerita pendek menjadi pseudocode.
- [ ] Aku bisa menelusuri pseudocode dengan tabel nilai.
- [ ] Aku bisa menyebut mengapa kosakata dibatasi.

Kunci: (1) `BACA`, `TETAPKAN`, `JIKA`, `ULANGI`, `TAMPILKAN`; (2) 18000, tanpa potongan; (3) kesalahan syarat sering muncul tepat di batas.

## Langkah berikutnya

`SMP8-1-M2`, "Blok buatan sendiri (fungsi)". Bagian pseudocode yang berulang akan diberi nama, dan di Scratch nama itu menjadi blok milikmu sendiri.

## Catatan untuk guru

- **Waktu:** 2 JP x 40 menit `[asumsi]` (silabus bagian 2). Berpasangan boleh untuk "Prediksi dulu" dan "Latihan"; bukan jaminan efek belajar.
- **Alat:** tanpa layar. Lima kata baku di tabel adalah kosakata kelas yang disusun penulis, bukan standar baku; CP menyebut "kosakata terbatas atau simbol", jadi guru boleh menyesuaikan asal tetap terbatas dan konsisten. Penulis menelusuri tangan dan menghitung ulang semua nilai dengan skrip bantu.
- **Butir CP:** corpus memetakan minggu ini ke `D-BK-a` dan `D-BK-e`. Modul ini tidak menyatakan CP "terpenuhi"; ia hanya melatih menulis dan menelusuri langkah dengan kosakata terbatas.
- **Kunci "Prediksi dulu":** (7, 6): c = 13, lalu 3, tampil 3; (2, 3): c = 5, `JIKA` dilewati, tampil 5.
- **Kunci "Contoh setengah jadi":** `ULANGI 4 KALI` dan `+ 5000`; tabungan sesudah tiap putaran: 25000, 30000, 35000, 40000.
- **Kunci "Susun urutannya":** A, B, C, D, E, F. `BACA` harus lebih dulu karena `JIKA` membandingkan nilai yang sudah ada.
- **Kunci latihan:** (1) 8 x 2000 = 16000, dipotong 5000 menjadi 11000. (2) `BACA umur`, `TETAPKAN harga = 3000`, `JIKA umur < 12 MAKA` lalu `TETAPKAN harga = 1500`, `TAMPILKAN harga`; umur 10 menghasilkan 1500, umur 12 menghasilkan 3000. (3) `BACA a`, `BACA b`, `BACA c`, `TETAPKAN rata = (a + b + c) / 3`, `TAMPILKAN rata`; hasil 6. (4) kosakata sedikit membuat orang lain bisa menelusuri tanpa bertanya.
- **Kunci "Latihan bercampur":** (1) a = 1, 2, 4, 8; akhirnya 8. (2) `x > 5` salah untuk 5, jadi "kecil".
- **Petunjuk bertahap:** (a) tulis masukannya; (b) tulis nilai yang dihitung; (c) tulis syarat dan akibatnya; (d) uji tiga masukan termasuk batas.
- **AI:** tanpa AI. Kebijakan `smp-coding` (silabus bagian 7.1): AI generatif hanya demonstrasi guru, tanpa akun murid; asesmen tanpa AI.
- **Privasi:** semua contoh rekaan; tanpa nama murid pada berkas.
- **Unsur pembelajaran:** ingat kembali dan jarak (`K`), PRIMM (`K` usia 11 sampai 14), tabel penelusuran (`K`), contoh lengkap lalu setengah jadi (`K`), Parsons (`M`), latihan bercampur (`K`).
