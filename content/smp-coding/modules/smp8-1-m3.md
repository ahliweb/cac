## Untuk siapa modul ini

Modul ini untuk murid kelas 8 pada minggu ketiga semester pertama. Kamu memakai Scratch tanpa akun dengan ekstensi Pen; simpan berkas sesuai arahan gurumu. Kalau komputer terbatas, tabel penelusuran di kertas cukup untuk sebagian besar kegiatan. Waktunya satu pertemuan, 2 JP. Prasyaratnya `SMP8-1-M2` (blok buatan sendiri).

## Ingat kembali

Tutup modul ini dan jawab dari ingatan.

1. Jelaskan satu manfaat merapikan program berulang dengan blok buatan sendiri. (`SMP8-1-M2`)
2. Tulis pseudocode yang menampilkan "lulus" bila nilai 60 atau lebih, dan "ulang" bila tidak. (`SMP8-1-M1`)
3. Tulis aturan sudut putar untuk bentuk beraturan n sisi, dan hitung untuk n = 5. (`SMP7-1-M7`)

Kunci: (1) satu resep dipakai berkali-kali, dan bila perlu diubah cukup di satu tempat; (2) `BACA nilai`, `JIKA nilai >= 60 MAKA`, `TAMPILKAN "lulus"`, `LAINNYA`, `TAMPILKAN "ulang"`; (3) 360 dibagi n; untuk n = 5 hasilnya 72.

## Tujuan

Setelah modul ini kamu dapat:

1. menjelaskan **abstraksi** sebagai memberi nama pada bagian yang berulang dan menyembunyikan detailnya;
2. mengenali bagian program yang sama dan bagian yang berbeda;
3. merapikan program lama dengan blok buatan sendiri yang bermasukan;
4. menghitung baris dan tempat perubahan sebelum dan sesudah dirapikan.

## Prediksi dulu

**Abstraksi** berarti kita memakai sesuatu lewat namanya tanpa memikirkan isinya lagi. Kamu memakai `move (10) steps` tanpa tahu bagaimana layar menggambar; blok buatanmu juga begitu: orang yang memanggil `kotak-di (0) (0)` cukup tahu *apa* hasilnya, tidak *bagaimana*.

Program P (sprite mulai di (0, 0), menghadap 90):

```text
define garis-ke-kanan (n)
repeat (n)
  move (10) steps

when green flag clicked
go to x: (0) y: (0)
point in direction (90)
garis-ke-kanan (3)
garis-ke-kanan (2)
```

**Prediksi.** Berapa kali `move` dijalankan seluruhnya, dan di mana sprite berhenti? Tulis dulu.

**Jalankan.** Telusuri dengan tabel:

| Panggilan | `move` dijalankan | x sesudahnya |
| --- | --- | --- |
| `garis-ke-kanan (3)` | | |
| `garis-ke-kanan (2)` | | |

**Selidiki.** Cocokkan dengan prediksimu. Isi `define` tidak berubah; hanya masukan yang berbeda.

## Contoh terselesaikan

Penelusuran P: panggilan pertama 3 kali `move`, x = 30; panggilan kedua 2 kali, x = 50. Total 5 kali, berhenti di x = 50.

Program lama yang menggambar tiga persegi sisi 30 (garis tidak menyambung karena `pen up` sebelum pindah):

```text
when green flag clicked
point in direction (90)
pen up
go to x: (-60) y: (0)
pen down
repeat (4)
  move (30) steps
  turn right (90) degrees
pen up
go to x: (0) y: (0)
pen down
repeat (4)
  move (30) steps
  turn right (90) degrees
pen up
go to x: (60) y: (0)
pen down
repeat (4)
  move (30) steps
  turn right (90) degrees
```

Langkah merapikan: cari bagian yang sama (`pen up` sampai `turn`), tandai yang berbeda (hanya x dan y pada `go to`), beri nama dan masukan, pindahkan ke `define`, ganti bagian lama dengan panggilan.

```text
define kotak-di (x) (y)
pen up
go to x: (x) y: (y)
pen down
repeat (4)
  move (30) steps
  turn right (90) degrees

when green flag clicked
point in direction (90)
kotak-di (-60) (0)
kotak-di (0) (0)
kotak-di (60) (0)
```

| Ukuran | Program lama | Program rapi |
| --- | --- | --- |
| Jumlah baris | 20 | 12 |
| Tempat mengubah sisi 30 menjadi 40 | 3 | 1 |
| Jumlah `move` dijalankan | 12 | 12 |

Hasil gambarnya sama: jumlah `move` tetap 12. Yang berubah adalah cara kita membaca dan mengubah program. Program utama kini cukup dibaca sebagai tiga kalimat; detail pindah ke satu tempat.

## Contoh setengah jadi

Rapikan program lama dua segitiga sisi 40 berikut.

```text
when green flag clicked
point in direction (90)
pen up
go to x: (-30) y: (0)
pen down
repeat (3)
  move (40) steps
  turn right (120) degrees
pen up
go to x: (30) y: (0)
pen down
repeat (3)
  move (40) steps
  turn right (120) degrees
```

Isi bagian kosong:

```text setengah-jadi
define segitiga-di (x) (y)
pen up
go to x: (____) y: (____)
pen down
repeat (3)
  move (40) steps
  turn right (120) degrees

when green flag clicked
point in direction (90)
segitiga-di (-30) (0)
segitiga-di (____) (____)
```

## Susun urutannya

Enam langkah merapikan program sudah diacak. Susun menjadi urutan yang masuk akal.

- **A.** Cari bagian program yang berulang.
- **B.** Tandai bagian yang berbeda antar pengulangan.
- **C.** Beri nama dan jadikan bagian yang berbeda sebagai masukan.
- **D.** Pindahkan bagian yang sama ke dalam `define`.
- **E.** Ganti bagian lama dengan panggilan.
- **F.** Jalankan dan bandingkan hasilnya dengan sebelum dirapikan.

Tulis urutan hurufnya. Jelaskan mengapa langkah F dilakukan.

## Latihan

1. **Ubah.** Tambahkan masukan `ukuran` pada `kotak-di` sehingga `move` memakai `ukuran`, lalu panggil dengan ukuran 30, 20, dan 10 di tiga tempat berbeda.
2. **Buat.** Program lama: `when green flag clicked` lalu tiga kali berturut-turut `say [Halo] for (2) seconds` dan `move (10) steps`. Tulis blok `sapa-maju` dan program utamanya.
3. **Selidiki.** Untuk soal 2, hitung baris sebelum dan sesudah. Apakah lebih pendek? Berapa tempat diubah bila "Halo" menjadi "Hai"?
4. **Jelaskan.** Dengan dua kalimat, jelaskan beda *apa* yang dikerjakan blok dan *bagaimana* ia mengerjakannya.

## Latihan bercampur

1. Dengan `pen down`, program `persegi (20)` dimulai di (0, 0) menghadap 90. Di mana sprite berhenti dan menghadap ke mana? (`SMP8-1-M2`)
2. Pseudocode: `BACA a`, `ULANGI 3 KALI` berisi `TETAPKAN a = a * 2`, lalu `TAMPILKAN a`. Berapa yang ditampilkan untuk `a` = 3? (`SMP8-1-M1`)

## Ulang berjarak

Kerjakan ulang tanpa melihat modul ini, lalu cocokkan:

- **Minggu depan** (`SMP8-1-M4`): beri satu contoh detail yang boleh disembunyikan di balik nama blok dan satu yang harus tetap menjadi masukan.
- **Akhir semester** (`SMP8-1-M14`): rapikan satu program berulang: tulis `define` dan panggilannya.
- **Semester depan** (`SMP9-1-M1`): jelaskan abstraksi dengan satu contoh blok dari modul ini.

## Kesalahan umum

- **Menyamakan abstraksi dengan memendekkan program.** Program rapi bisa sama panjang. Kenali: kamu menilai hasil hanya dari jumlah baris.
- **Menyembunyikan terlalu banyak.** Semua angka tetap di dalam isi, sehingga tidak bisa diatur. Kenali: tiap ukuran baru butuh blok baru.
- **Menjadikan semua hal masukan.** Blok punya terlalu banyak kurung. Kenali: panggilan sulit dibaca.
- **Tidak membandingkan hasil sesudah merapikan.** Kenali: gambar berubah tanpa disadari.
- **Nama yang menjelaskan *bagaimana*, bukan *apa*** (misalnya `ulang-empat-kali` untuk persegi). Kenali: nama harus diganti bila isinya berubah.

## Cek mandiri

Tutup modul, jawab tanpa melihat, lalu periksa.

1. Apa itu abstraksi, dengan satu contoh dari modul ini?
2. Pada `kotak-di`, bagian mana yang menjadi masukan dan mengapa?
3. Mengapa program rapi belum tentu lebih pendek?

Daftar periksa (kosong; kamu isi sendiri, tidak dikumpulkan):

- [ ] Aku bisa menemukan bagian yang berulang dan yang berbeda.
- [ ] Aku bisa merapikan program dengan blok bermasukan.
- [ ] Aku bisa menjelaskan *apa* versus *bagaimana*.

Kunci: (1) memberi nama dan menyembunyikan detail, misalnya `kotak-di` menyembunyikan cara menggambar persegi; (2) x dan y, karena bagian itulah yang berbeda antar panggilan; (3) manfaat utamanya satu tempat perubahan dan nama yang jelas, bukan jumlah baris.

## Langkah berikutnya

`SMP8-1-M4`, "Simulasi sains sederhana". Kamu akan memakai variabel dan perulangan untuk meniru gerak dan siklus, dan mengakui bahwa tiap simulasi menyederhanakan kenyataan.

## Catatan untuk guru

- **Waktu:** 2 JP x 40 menit `[asumsi]` (silabus bagian 2). Berpasangan boleh untuk "Prediksi dulu" dan "Latihan"; bukan jaminan efek belajar.
- **Alat:** Scratch tanpa akun murid; ekstensi Pen. Nama blok bisa berbeda menurut bahasa antarmuka. Penulis menelusuri tangan dan menghitung ulang dengan skrip bantu; ia tidak menjalankan program di editor Scratch. Hitungan baris di tabel: program lama 20 baris (satu `when`, satu `point in direction`, tiga kelompok enam baris), program rapi 12 baris (tujuh di `define`, lima di program utama).
- **Butir CP:** corpus memetakan minggu ini ke `D-BK-a`. Modul ini tidak menyatakan CP "terpenuhi"; ia hanya melatih mengenali pola dan menamainya.
- **Kunci "Prediksi dulu":** panggilan pertama 3 `move` dan x = 30; panggilan kedua 2 `move` dan x = 50.
- **Kunci "Contoh setengah jadi":** `go to x: (x) y: (y)`; panggilan kedua `segitiga-di (30) (0)`.
- **Kunci "Susun urutannya":** A, B, C, D, E, F. Langkah F memastikan merapikan tidak mengubah hasil.
- **Kunci latihan:** (1) `define kotak-di (x) (y) (ukuran)` dengan `move (ukuran) steps`; panggilan `kotak-di (-60) (0) (30)`, `kotak-di (0) (0) (20)`, `kotak-di (60) (0) (10)`. (2) `define sapa-maju` berisi `say [Halo] for (2) seconds` dan `move (10) steps`; program utama: bendera hijau lalu tiga `sapa-maju`. (3) sebelum 7 baris, sesudah 7 baris, jadi tidak lebih pendek; "Halo" diubah di 3 tempat sebelum dan 1 tempat sesudah. (4) *apa* adalah hasil yang dijanjikan nama; *bagaimana* adalah langkah di dalam isi.
- **Kunci "Latihan bercampur":** (1) kembali ke (0, 0) menghadap 90. (2) a = 3, 6, 12, 24; ditampilkan 24.
- **Petunjuk bertahap:** (a) tulis ulang dua bagian yang tampak sama berdampingan; (b) lingkari yang berbeda; (c) jadikan yang berbeda sebagai masukan; (d) bandingkan hasil.
- **AI:** tanpa AI. Kebijakan `smp-coding` (silabus bagian 7.1): AI generatif hanya demonstrasi guru, tanpa akun murid; asesmen tanpa AI.
- **Privasi:** tanpa nama murid pada berkas proyek.
- **Unsur pembelajaran:** ingat kembali dan jarak (`K`), PRIMM (`K` usia 11 sampai 14), tabel penelusuran (`K`), contoh lengkap lalu setengah jadi (`K`), Parsons (`M`), latihan bercampur (`K`).
