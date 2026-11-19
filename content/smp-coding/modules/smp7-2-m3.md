## Untuk siapa modul ini

Modul ini untuk murid kelas 7 pada minggu ketiga semester kedua. Ini modul **pengayaan**: tidak tercantum dalam rumusan capaian pembelajaran. Kamu memerlukan kertas berpetak 5 x 5, pensil, dan kartu 16, 8, 4, 2, 1 dari `SMP7-2-M2`. Scratch tidak diperlukan; guru boleh memperagakannya di layar kelas. Waktunya satu pertemuan, 2 JP. Prasyaratnya `SMP7-2-M2` (biner lima bit).

## Ingat kembali

Tutup modul ini dan jawab dari ingatan.

1. Ubah `01101` menjadi angka. (`SMP7-2-M2`)
2. Apa beda data dan informasi? (`SMP7-2-M1`)
3. `set [a] to (4)`, lalu `change [a] by (3)`, lalu `change [a] by (-2)`. Berapa isi `a`? (`SMP7-1-M9`)

Kunci: (1) 13; (2) data adalah fakta mentah, informasi adalah data yang diolah untuk menjawab pertanyaan; (3) 5.

## Tujuan

Setelah modul ini kamu dapat:

1. menjelaskan bahwa **teks** disimpan sebagai nomor huruf dan **gambar** sebagai nomor warna tiap titik;
2. menyebut **piksel** sebagai satu titik terkecil dari gambar;
3. mengubah gambar hitam-putih 5 x 5 menjadi lima angka, dan sebaliknya;
4. menjelaskan apa yang berubah bila gambar lebih besar atau berwarna.

## Prediksi dulu

Di `SMP7-2-M2` huruf menjadi nomor. Gambar bisa dibagi menjadi kotak kecil bernama **piksel**. Pada gambar hitam-putih, piksel hitam ditulis `1` dan putih `0`. Satu baris lima kotak adalah satu kelompok lima bit, jadi bisa ditulis sebagai satu angka dengan kartu 16, 8, 4, 2, 1.

Gambar rekaan dengan lima baris, dikodekan per baris menjadi angka: **4, 14, 31, 4, 4**.

**Prediksi.** Seperti apa gambarnya menurutmu? Tulis dulu.

**Jalankan.** Ubah tiap angka menjadi lima bit, lalu arsir kotak yang bernilai 1.

**Selidiki.** Cocokkan dengan prediksimu. Bit apa yang menjadi baris pertama?

## Contoh terselesaikan

Kode gambar **4, 14, 31, 4, 4**:

| Baris | Angka | Kartu terpasang | Lima bit | Kotak (# hitam, . putih) |
| --- | --- | --- | --- | --- |
| 1 | 4 | 4 | `00100` | `..#..` |
| 2 | 14 | 8 + 4 + 2 | `01110` | `.###.` |
| 3 | 31 | 16 + 8 + 4 + 2 + 1 | `11111` | `#####` |
| 4 | 4 | 4 | `00100` | `..#..` |
| 5 | 4 | 4 | `00100` | `..#..` |

Gambarnya seperti pohon sederhana: mahkota melebar, lalu batang. Teks bekerja dengan ide yang sama: kata "ADA" menjadi nomor 1, 4, 1 dengan aturan A = 1.

Tiga hal yang perlu diingat. Gambar hitam-putih 5 x 5 membutuhkan 25 bit, lima angka lima bit. Gambar yang lebih halus berarti piksel lebih banyak dan data lebih besar. Gambar berwarna butuh lebih banyak bit per piksel, misalnya dua bit per piksel untuk empat pilihan warna. Agar semua komputer memahami pesan yang sama, ada tabel kode baku yang disepakati bersama untuk huruf.

## Contoh setengah jadi

Huruf **T** pada kisi 5 x 5: baris pertama penuh hitam, lalu satu batang di tengah. Isi bagian kosong.

| Baris | Kotak | Lima bit | Angka |
| --- | --- | --- | --- |
| 1 | `#####` | `11111` | 31 |
| 2 | `..#..` | ____ | ____ |
| 3 | `..#..` | ____ | ____ |
| 4 | `..#..` | ____ | ____ |
| 5 | `..#..` | ____ | ____ |

## Susun urutannya

Lima langkah mengubah gambar kisi menjadi angka sudah diacak. Susun dalam urutan yang benar.

- **A.** Gambar kisi 5 x 5 di kertas.
- **B.** Isi tiap kotak: hitam = 1, putih = 0.
- **C.** Baca satu baris dari kiri ke kanan sebagai lima bit.
- **D.** Ubah lima bit menjadi satu angka dengan kartu 16, 8, 4, 2, 1.
- **E.** Ulangi untuk baris berikutnya sampai kelima baris selesai.

Tulis urutan hurufnya. Jelaskan mengapa kisi digambar sebelum kotak diisi.

## Latihan

1. **Ubah.** Ubah angka baris ketiga pada gambar pohon dari 31 menjadi 10. Gambar baru seperti apa?
2. **Buat.** Gambar huruf **L** di kisi 5 x 5 dan tulis lima angkanya.
3. **Selidiki.** Satu baris pada kisi 5 x 5 punya berapa kemungkinan susunan kotak? Berapa baris yang kamu butuhkan untuk satu gambar?
4. **Buat.** Rancang gambar rekaan sendiri (bentuk sederhana) dan tuliskan kodenya untuk dibaca temanmu.
5. **Jelaskan.** Dengan dua kalimat, jelaskan mengapa gambar berwarna butuh lebih banyak bit per piksel.

## Latihan bercampur

Piksel dan gambar adalah konsep baru, jadi latihan bercampur yang memuat gambar dimulai di modul berikutnya; dua soal ini mengulang topik sebelumnya.

1. Sandikan kata **AKU** dengan A = 1, K = 11, U = 21 menjadi tiga kelompok lima bit. (`SMP7-2-M2`)
2. Tabel berisi 8 murid rekaan memilih cara berangkat: 4 jalan, 2 sepeda, 2 angkutan. Tulis satu kalimat informasi dari data itu. (`SMP7-2-M1`)

## Ulang berjarak

Kerjakan ulang tanpa melihat modul ini, lalu cocokkan:

- **Minggu depan** (`SMP7-2-M4`): sebut tiga contoh data yang bisa disimpan sebagai daftar angka.
- **Sekitar sebulan lagi** (`SMP7-2-M10`): jelaskan dengan dua kalimat bagaimana komputer menyimpan huruf dan gambar sebagai angka.
- **Akhir semester** (`SMP7-2-M14`): ubah gambar huruf L 5 x 5 menjadi lima angka tanpa melihat contoh.

## Kesalahan umum

- **Mengira gambar tidak bisa menjadi angka.** Kenali: kamu menyebut gambar "tidak ada angkanya".
- **Salah arah membaca bit.** Membaca baris dari kanan menghasilkan gambar terbalik kiri-kanan.
- **Menyamakan resolusi dan ukuran layar.** Piksel lebih banyak berarti lebih halus, bukan layar lebih besar.
- **Lupa bahwa warna menambah bit.** Dua warna cukup satu bit; empat warna butuh dua.

## Cek mandiri

Tutup modul, jawab tanpa melihat, lalu periksa.

1. Apa itu piksel?
2. Ubah baris `10001` menjadi angka.
3. Mengapa gambar berwarna butuh lebih banyak bit per piksel?

Daftar periksa (kosong; kamu isi sendiri, tidak dikumpulkan):

- [ ] Aku bisa mengubah satu baris kisi menjadi angka.
- [ ] Aku bisa menjelaskan piksel.
- [ ] Aku bisa menjelaskan mengapa warna menambah bit.

Kunci: (1) titik terkecil dari gambar; (2) 17; (3) lebih banyak pilihan warna butuh lebih banyak kemungkinan nilai, jadi lebih banyak bit.

## Langkah berikutnya

`SMP7-2-M4`, "Daftar (list)". Kamu akan menyimpan beberapa nilai, seperti lima angka gambar tadi, dalam satu daftar di Scratch.

## Catatan untuk guru

- **Waktu:** 2 JP x 40 menit `[asumsi]` (silabus bagian 2). Berpasangan boleh untuk "Prediksi dulu" dan "Latihan"; bukan jaminan efek belajar.
- **Alat:** kertas berpetak 5 x 5 dan kartu 16, 8, 4, 2, 1. Silabus mencantumkan "- atau Scratch"; modul ini memakai versi tanpa alat. Bila ingin Scratch, peragakan saja di layar kelas; tidak ada langkah Scratch di modul ini.
- **Butir CP:** minggu ini pengayaan dan **tidak mengklaim butir CP**. Tidak ada pernyataan CP "terpenuhi".
- **Kunci "Prediksi dulu":** pohon sederhana (mahkota melebar, batang): 00100, 01110, 11111, 00100, 00100; baris pertama `00100`.
- **Kunci "Contoh setengah jadi":** `00100`, 4 untuk keempat baris.
- **Kunci "Susun urutannya":** A, B, C, D, E. Kisi lebih dulu agar ada kotak untuk diisi.
- **Kunci latihan:** (1) angka 10 = `01010`: baris ketiga menjadi `.#.#.`; pohon tidak lagi punya garis penuh. (2) L: `10000`, `10000`, `10000`, `10000`, `11111` = 16, 16, 16, 16, 31. (3) 32 susunan; lima baris. (4) jawaban bebas asal setiap angka 0 sampai 31. (5) lebih banyak pilihan warna butuh lebih banyak kemungkinan nilai per piksel.
- **Kunci "Latihan bercampur":** (1) `00001 01011 10101`. (2) contoh: "Cara berangkat yang paling banyak adalah jalan kaki (4 dari 8)."
- **Petunjuk bertahap:** (a) tulis lima bit per baris; (b) arsir kotak 1; (c) cek hasil dengan kartu.
- **AI:** tanpa AI. Kebijakan `smp-coding` (silabus bagian 7.1): AI generatif hanya demonstrasi guru, tanpa akun murid; asesmen tanpa AI.
- **Privasi:** gambar rekaan benda atau huruf; jangan membuat gambar wajah murid atau memakai foto.
- **Unsur pembelajaran:** ingat kembali dan jarak (`K`), PRIMM (`K` usia 11 sampai 14), contoh lengkap lalu setengah jadi (`K`), Parsons (`M`), latihan bercampur (`K`).
