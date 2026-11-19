## Untuk siapa modul ini

Modul ini untuk murid kelas 9 pada minggu pertama semester pertama. Kamu memakai kertas dan pensil; tidak ada layar yang dibutuhkan. Waktunya satu pertemuan, 2 JP. Prasyaratnya `SMP7-1-M7` (pola dan generalisasi) dan `SMP8-1-M3` (abstraksi). Semua angka di modul ini rekaan.

## Ingat kembali

Tutup modul ini dan jawab dari ingatan.

1. Jelaskan abstraksi dengan satu contoh blok. (`SMP8-1-M3`)
2. Apa beda pola dan generalisasi? (`SMP7-1-M7`)
3. Sebut lima langkah mencari kesalahan dari menjalankan sampai uji ulang. (`SMP7-1-M11`)

Kunci: (1) memberi nama dan menyembunyikan detail, misalnya `kotak-di` menyembunyikan cara menggambar persegi; (2) pola adalah susunan berulang yang kamu amati, generalisasi adalah aturan umum yang berlaku untuk banyak kasus; (3) jalankan dan catat hasil, bandingkan dengan harapan, telusuri sampai baris pertama yang berbeda, ubah satu hal, uji ulang.

## Tujuan

Setelah modul ini kamu dapat:

1. memakai empat langkah: pahami, rencanakan, kerjakan, tinjau ulang;
2. membuat tabel kasus kecil, menemukan pola, dan menulis aturan umum;
3. meninjau ulang sebuah jawaban dengan cara yang berbeda;
4. menuliskan alasan untuk tiap langkah.

## Prediksi dulu

Banyak soal sulit menjadi mudah bila kamu mencoba kasus kecil dulu. Barisan: 3, 7, 11, 15, ... Setiap bilangan disebut suku, dan suku pertama adalah 3.

**Prediksi.** Berapa suku ke-10? Tulis dulu tebakanmu dan alasannya.

**Jalankan.** Lengkapi tabel dengan tangan.

| suku ke | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| nilai | 3 | 7 | 11 | 15 | | | | | | |

**Selidiki.** Cocokkan dengan tebakanmu. Apa yang tetap pada setiap langkah, dan bagaimana kamu bisa mendapat suku ke-10 tanpa menulis semua suku?

## Contoh terselesaikan

Soal: enam murid berjabat tangan, dan setiap dua murid berjabat tangan tepat sekali. Berapa jabat tangan seluruhnya?

- **Pahami.** Yang ditanya jumlah jabat tangan, yaitu pasangan, bukan jumlah murid.
- **Rencanakan.** Coba kasus kecil dan catat dalam tabel.

| murid | 1 | 2 | 3 | 4 | 5 | 6 |
| --- | --- | --- | --- | --- | --- | --- |
| jabat tangan | 0 | 1 | 3 | 6 | 10 | 15 |

Pola: murid baru ke-n menambah n dikurangi 1 jabat tangan, sebab ia berjabat dengan semua yang sudah ada. Tambahannya 1, 2, 3, 4, 5.

- **Kerjakan.** 0 + 1 + 2 + 3 + 4 + 5 = 15.
- **Tinjau ulang dengan cara lain.** Tiap murid berjabat dengan 5 murid lain: 6 x 5 = 30. Tiap jabat tangan terhitung dua kali, dari sisi kedua murid, jadi 30 dibagi 2 = 15. Dua cara memberi 15, maka jawabannya meyakinkan.

Aturan umum untuk `n` murid: `n` x (`n` - 1) dibagi 2. Untuk `n` = 6 hasilnya 15, cocok dengan tabel.

Untuk barisan di "Prediksi dulu": nilai bertambah 4 tiap langkah, jadi suku ke-10 adalah 3 + 4 x 9 = 39. Angka 9, bukan 10, karena dari suku pertama ke suku ke-10 hanya ada sembilan langkah.

## Contoh setengah jadi

Persegi dari batang korek api disusun berjajar: satu persegi memakai 4 batang, dua persegi 7 batang, tiga persegi 10 batang. Berapa batang untuk 10 persegi? Isi bagian kosong.

```text setengah-jadi
Pahami: yang ditanya adalah banyak ____ untuk 10 persegi.
Kasus kecil: 1 persegi 4 batang, 2 persegi 7, 3 persegi 10.
Pola: tiap persegi baru menambah ____ batang.
Aturan: batang = 4 + ____ x (n - 1).
Untuk n = 10: ____ batang.
Tinjau ulang: gambar 10 persegi lalu hitung garis ____ dan garis ____ secara terpisah.
```

## Susun urutannya

Enam langkah pemecahan soal berikut sudah diacak. Susun menjadi urutan yang masuk akal.

- **A.** Tulis jawaban beserta alasannya.
- **B.** Baca soal dan tulis apa yang ditanya.
- **C.** Hitung kasus kecil dan catat dalam tabel.
- **D.** Pakai aturan untuk kasus yang besar.
- **E.** Tinjau ulang dengan cara yang berbeda.
- **F.** Cari pola dan tulis aturan umum.

Tulis urutan hurufnya. Jelaskan mengapa langkah tinjau ulang bukan yang pertama.

## Latihan

1. **Ubah.** Ubah soal jabat tangan menjadi 9 murid. Hitung dengan dua cara dan cocokkan.
2. **Buat.** Tulis satu soal barisan dengan selisih tetap, lengkap dengan tabel kasus kecil, aturan, dan kunci. Tukar dengan temanmu dan periksa kuncinya.
3. **Selidiki.** Dari 2, 4, 8, seorang murid menulis suku ke-5 adalah 14, dan temannya menulis 32. Tulis aturan yang dipakai masing-masing. Apakah tiga suku cukup untuk memastikan pola?
4. **Jelaskan.** Mengapa menghitung ulang dengan cara yang sama kurang meyakinkan dibanding cara yang berbeda?

## Latihan bercampur

1. Pseudocode: `TETAPKAN a = 2`, lalu `ULANGI 3 KALI` berisi `TETAPKAN a = a * 2`, lalu `TAMPILKAN a`. Berapa yang ditampilkan? (`SMP8-1-M1`)
2. Pada blok buatan `kotak-di (x) (y) (ukuran)`, sebut satu hal yang disembunyikan nama blok dan satu hal yang tetap menjadi masukan. (`SMP8-1-M3`)

## Ulang berjarak

Kerjakan ulang tanpa melihat modul ini, lalu cocokkan:

- **Minggu depan** (`SMP9-1-M2`): sebut empat langkah memecahkan masalah dan satu cara meninjau ulang jawaban.
- **Beberapa minggu lagi** (`SMP9-1-M8`): sebut dua cara berbeda meninjau ulang sebuah jawaban.
- **Akhir semester** (`SMP9-1-M14`): untuk barisan 5, 8, 11, 14, ..., tulis aturan dan hitung suku ke-20.

## Kesalahan umum

- **Menganggap dua atau tiga suku sudah memastikan pola.** Kenali: temanmu menemukan aturan lain yang juga cocok.
- **Menjawab tanpa menulis yang ditanya.** Kenali: jawabanmu "6", padahal yang ditanya jumlah jabat tangan.
- **Salah menghitung banyak langkah.** Kenali: suku ke-10 dihitung dengan 3 + 4 x 10, bukan 3 + 4 x 9.
- **Tinjau ulang dengan mengulang cara yang sama.** Kenali: kesalahan yang sama muncul lagi.
- **Menulis jawaban tanpa alasan.** Kenali: orang lain tidak bisa memeriksa langkahmu.

## Cek mandiri

Tutup modul, jawab tanpa melihat, lalu periksa.

1. Sebut empat langkah memecahkan masalah.
2. Berapa suku ke-8 dari 4, 9, 14, 19, ...? Tulis aturannya.
3. Hitung jabat tangan 8 murid dengan dua cara.

Daftar periksa (kosong; kamu isi sendiri, tidak dikumpulkan):

- [ ] Aku bisa mencoba kasus kecil dan membuat tabel.
- [ ] Aku bisa menulis aturan umum dari pola.
- [ ] Aku bisa meninjau ulang dengan cara yang berbeda.

Kunci: (1) pahami, rencanakan, kerjakan, tinjau ulang; (2) 4 + 5 x 7 = 39, aturannya bertambah 5 tiap suku; (3) 0 + 1 + 2 + ... + 7 = 28, dan 8 x 7 dibagi 2 = 28.

## Langkah berikutnya

`SMP9-1-M2`, "Teks (*string*)". Kamu mulai memakai Python untuk memproses kalimat, dan kebiasaan mencoba kasus kecil serta meninjau ulang tetap dipakai pada program.

## Catatan untuk guru

- **Waktu:** 2 JP x 40 menit `[asumsi]` (silabus bagian 2). Berpasangan boleh untuk "Prediksi dulu" dan "Latihan"; bukan jaminan efek belajar.
- **Alat:** kertas dan pensil. Empat langkah "pahami, rencanakan, kerjakan, tinjau ulang" adalah kerangka kerja modul ini, bukan istilah resmi silabus; silabus menyebut pemecahan masalah dengan dekomposisi, abstraksi, pengenalan pola, dan algoritma. Penulis menghitung ulang semua angka dengan skrip bantu.
- **Butir CP:** corpus memetakan minggu ini ke `D-BK-a`. Modul ini tidak menyatakan CP "terpenuhi"; ia hanya melatih pemecahan masalah dengan kasus kecil, pola, dan tinjau ulang.
- **Kunci "Prediksi dulu":** 3, 7, 11, 15, 19, 23, 27, 31, 35, 39; selisih tetap 4; suku ke-10 = 3 + 4 x 9 = 39.
- **Kunci "Contoh setengah jadi":** korek api; 3; 3; 31 batang. Tinjau ulang: 10 persegi punya 20 garis mendatar (dua per persegi) dan 11 garis tegak, jadi 20 + 11 = 31.
- **Kunci "Susun urutannya":** B, C, F, D, E, A. Tinjau ulang datang sesudah ada jawaban yang bisa diperiksa.
- **Kunci latihan:** (1) 0 + 1 + ... + 8 = 36, dan 9 x 8 dibagi 2 = 36. (2) jawaban bebas; periksa kunci cocok dengan aturan. (3) 14 memakai selisih yang naik 2, 4, 6 (aturan "tambah 2, lalu 4, lalu 6"); 32 memakai kali 2. Kedua aturan cocok dengan 2, 4, 8, jadi tiga suku tidak cukup. (4) cara yang sama bisa mengulang salah paham yang sama; cara berbeda menguji hasil dari sudut lain.
- **Kunci "Latihan bercampur":** (1) 16 (2, 4, 8, 16). (2) disembunyikan: cara menggambar persegi; masukan: posisi `x`, `y`, dan `ukuran`, karena berbeda antar panggilan.
- **Kunci "Ulang berjarak":** minggu depan: pahami, rencanakan, kerjakan, tinjau ulang; cara lain, misalnya hitung dengan dua rumus atau dengan gambar. Akhir semester: bertambah 3 tiap suku; 5 + 3 x 19 = 62.
- **Petunjuk bertahap:** (a) tulis yang ditanya; (b) hitung kasus 1, 2, 3 dalam tabel; (c) cari yang tetap atau yang bertambah; (d) tulis aturan, lalu cek pada kasus kecil.
- **AI:** tanpa AI. Kebijakan `smp-coding` (silabus bagian 7.1): AI generatif hanya demonstrasi guru, tanpa akun murid; asesmen tanpa AI.
- **Privasi:** semua angka rekaan; tanpa nama murid pada berkas.
- **Unsur pembelajaran:** ingat kembali dan jarak (`K`), PRIMM (`K` usia 11 sampai 14), contoh lengkap lalu setengah jadi (`K`), Parsons (`M`), latihan bercampur (`K`).
