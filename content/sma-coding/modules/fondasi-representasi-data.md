## Untuk siapa modul ini

Modul ini untuk murid kelas X pemula yang mengikuti minggu fondasi ketiga (FND-X1-M3): representasi data. Kamu belajar bahwa komputer menyimpan semua hal (angka, teks, gambar) sebagai deretan nol dan satu.

Topik ini adalah **prasyarat**: ia membantu kamu memahami cara kerja memori komputer, tipe data pada pemrograman nanti, dan operasi bit. Topik ini tidak dihitung sebagai pemenuhan butir capaian pembelajaran tertentu.

Setelah mempelajari modul ini, kamu diharapkan bisa:

- mengonversi bilangan desimal, biner, dan heksadesimal;
- menjelaskan bit dan byte;
- menjelaskan bahwa teks disimpan sebagai kode karakter;
- menjelaskan gambar sebagai kisi piksel, dan warna sebagai gabungan merah-hijau-biru.

Cara memakai: kerjakan perhitungan dengan tangan di lembar kerja. Jangan hanya membaca. Kunci ada di akhir; semua angkanya sudah dihitung ulang.

## Ingat kembali

Jawab dari ingatan, tanpa membuka modul sebelumnya (FND-X1-M1 dan M2). Cocokkan di bagian kunci.

1. Apa yang disimpan memori komputer Von Neumann, selain data?
2. Sebutkan lima peran sistem operasi.
3. Apa beda perangkat lunak sistem dan aplikasi? Beri satu contoh tiap jenis.
4. Apa yang dimaksud atribusi, dan mengapa karya berlisensi perlu diberi atribusi?
5. Mengapa sebuah berkas yang ekstensinya diganti dari `.txt` menjadi `.png` tidak berubah menjadi gambar?

## Bit dan byte

Komputer dibangun dari komponen yang hanya punya dua keadaan, misalnya arus ada atau tidak ada. Dua keadaan itu ditulis 0 dan 1.

- **Bit** adalah satu angka biner: 0 atau 1.
- **Byte** adalah kumpulan 8 bit. Satu byte bisa menyimpan 2^8 = 256 kemungkinan nilai (0 sampai 255).

| Satuan | Ukuran |
| --- | --- |
| 1 byte | 8 bit |
| 1 KB | 1024 byte |
| 1 MB | 1024 KB |

Catatan: sebagian produsen penyimpanan memakai 1 KB = 1000 byte. Itu sebabnya kapasitas yang tertulis di kemasan dan di komputer bisa sedikit berbeda. Untuk membedakannya, ada penulisan baku KiB (kibibyte, 1024 byte) dan MiB (mebibyte, 1024 KiB) untuk kelipatan 1024, sedangkan KB dan MB dalam arti SI berarti 1000. Di modul ini, 1 KB = 1024 byte dipakai agar cocok dengan modul sebelumnya; saat membaca angka kapasitas di dunia nyata, periksa pihak mana yang memakai arti yang mana.

Dengan n bit, ada 2^n kemungkinan nilai, sehingga nilai terbesar tanpa tanda minus adalah 2^n - 1.

| Jumlah bit | Banyak nilai | Nilai terbesar |
| --- | --- | --- |
| 1 | 2 | 1 |
| 4 | 16 | 15 |
| 8 | 256 | 255 |
| 10 | 1024 | 1023 |

## Bilangan biner

Bilangan desimal memakai sepuluh angka (0 sampai 9) dan nilai tempat kelipatan 10. Bilangan biner memakai dua angka (0 dan 1) dan nilai tempat kelipatan 2. Untuk 8 bit, nilai tempatnya dari kiri ke kanan:

```text
128  64  32  16   8   4   2   1
```

### Biner ke desimal

**Prediksi dulu.** Tanpa menghitung rinci, tebak: apakah `00110101` lebih besar atau lebih kecil dari 64, dan mengapa? Tulis tebakanmu, lalu periksa dengan contoh di bawah.

Jumlahkan nilai tempat yang bernilai 1. Contoh: `00110101`.

```text
nilai tempat : 128 64 32 16  8  4  2  1
bit          :   0  0  1  1  0  1  0  1
yang dijumlah:         32 16     4     1   -> 32 + 16 + 4 + 1 = 53
```

Jadi `00110101` = 53. Contoh lain: `1010` = 8 + 2 = 10, dan `01001101` = 64 + 8 + 4 + 1 = 77.

### Desimal ke biner

Kurangkan nilai tempat terbesar yang muat, mulai dari 128. Contoh: 202.

```text
202 - 128 = 74   -> bit 128 = 1
 74 -  64 = 10   -> bit  64 = 1
 10 -  32 tak muat -> bit 32 = 0
 10 -  16 tak muat -> bit 16 = 0
 10 -   8 =  2   -> bit   8 = 1
  2 -   4 tak muat -> bit  4 = 0
  2 -   2 =  0   -> bit   2 = 1
  0 -   1 tak muat -> bit  1 = 0
```

Jadi 202 = `11001010`. Pengecekan: 128 + 64 + 8 + 2 = 202.

Tabel beberapa bilangan:

| Desimal | Biner (8 bit) |
| --- | --- |
| 5 | 00000101 |
| 13 | 00001101 |
| 25 | 00011001 |
| 37 | 00100101 |
| 100 | 01100100 |
| 255 | 11111111 |

## Bilangan heksadesimal

Bilangan biner panjang sulit dibaca. **Heksadesimal** memakai 16 simbol: 0 sampai 9, lalu A sampai F.

| Heksa | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | A | B | C | D | E | F |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Desimal | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 |
| Biner | 0000 | 0001 | 0010 | 0011 | 0100 | 0101 | 0110 | 0111 | 1000 | 1001 | 1010 | 1011 | 1100 | 1101 | 1110 | 1111 |

Satu simbol heksadesimal mewakili tepat 4 bit. Jadi satu byte ditulis dengan dua simbol heksadesimal. Cara mengubah: pisahkan bit menjadi kelompok 4, lalu ganti tiap kelompok.

```text
11001010 -> 1100 1010 -> C A -> CA
```

Dari heksadesimal ke desimal: `CA` = 12 x 16 + 10 = 202. Kebalikannya: `3F` -> 0011 1111 = `00111111` = 63, dan `FF` = 15 x 16 + 15 = 255.

Awalan `0x` sering dipakai untuk menandai heksadesimal pada pemrograman, misalnya `0xCA`. Awalan `#` dipakai pada kode warna, misalnya `#CA8040` (dibahas di bagian warna).

## Teks sebagai kode karakter

Komputer menyimpan huruf sebagai angka. Tabel yang memetakan karakter ke angka disebut tabel kode karakter. Salah satu yang paling dasar adalah ASCII.

| Karakter | Kode desimal | Kode biner | Heksa |
| --- | --- | --- | --- |
| spasi | 32 | 00100000 | 20 |
| 0 | 48 | 00110000 | 30 |
| A | 65 | 01000001 | 41 |
| B | 66 | 01000010 | 42 |
| M | 77 | 01001101 | 4D |
| a | 97 | 01100001 | 61 |

Ketentuan penting: huruf besar dan kecil berbeda kode (a = A + 32), dan huruf berurutan memiliki kode berurutan (A = 65, B = 66, C = 67, dan seterusnya). Angka 0 sebagai karakter berkode 48, bukan 0.

Contoh: kata fiktif `KOPI`.

```text
K = 75 = 01001011
O = 79 = 01001111
P = 80 = 01010000
I = 73 = 01001001
```

Jadi `KOPI` disimpan sebagai 4 byte: `4B 4F 50 49` (heksadesimal). Contoh lain: `SMA` = `83 77 65`, dan `Halo` = `72 97 108 111`.

ASCII hanya mencakup 128 karakter dasar. Karakter dari aksara dan bahasa lain, serta emoji, memakai standar lebih besar (misalnya Unicode); kita tidak membahasnya mendalam di sini.

## Gambar sebagai kisi piksel

Gambar digital adalah kisi kotak kecil yang disebut **piksel**. Pada gambar hitam-putih, tiap piksel cukup 1 bit: 0 untuk putih (atau terang) dan 1 untuk hitam (gelap).

Contoh gambar 8x8 (muka tersenyum). Tiap baris adalah satu byte.

```text
Baris  Bit       Gambar     Heksa
1      00111100   ..####..   3C
2      01000010   .#....#.   42
3      10100101   #.#..#.#   A5
4      10000001   #......#   81
5      10100101   #.#..#.#   A5
6      10011001   #..##..#   99
7      01000010   .#....#.   42
8      00111100   ..####..   3C
```

Seluruh gambar ini hanya `3C 42 A5 81 A5 99 42 3C`, yaitu 8 byte. Dengan cara sama, kamu bisa menyimpan gambar apa pun sebagai angka.

## Warna: merah, hijau, biru

Layar membuat warna dengan mencampur tiga cahaya: merah (R), hijau (G), dan biru (B). Tiap komponen bernilai 0 sampai 255 (satu byte). Satu piksel berwarna memakai 3 byte, yaitu 24 bit. Kode warna sering ditulis heksadesimal: `#RRGGBB`.

| Warna | R, G, B | Kode |
| --- | --- | --- |
| hitam | 0, 0, 0 | #000000 |
| putih | 255, 255, 255 | #FFFFFF |
| merah | 255, 0, 0 | #FF0000 |
| hijau | 0, 255, 0 | #00FF00 |
| biru | 0, 0, 255 | #0000FF |
| oranye | 255, 128, 0 | #FF8000 |
| abu-abu | 128, 128, 128 | #808080 |

Contoh menghitung ukuran: gambar 100 x 100 piksel berwarna, tanpa kompresi, berisi 10.000 piksel x 3 byte = 30.000 byte (sekitar 29,3 KB). Ukuran berkas gambar yang sebenarnya biasanya lebih kecil karena dikompresi.

## Kegiatan

**Kegiatan 1: Lembar kerja konversi (kertas, berpasangan).** Kerjakan Latihan 1 sampai 3, saling periksa dengan pasangan memakai tabel nilai tempat.

**Kegiatan 2: Menyandikan kata.** Bentuk kelompok. Tiap kelompok memilih satu kata fiktif pendek (maksimal lima huruf), mengubahnya menjadi deret kode desimal memakai tabel kode karakter, lalu menukar deret itu dengan kelompok lain untuk disandi balik. Jangan memakai nama, alamat, atau data pribadi.

**Kegiatan 3: Gambar 8x8.** Pada kertas kotak 8 x 8, hitamkan kotak untuk membuat gambar sederhana (misalnya huruf, hati, atau rumah). Tulis tiap baris sebagai deret 8 bit, lalu ubah menjadi dua simbol heksadesimal. Tukarkan deret heksadesimal dengan temanmu dan minta ia menggambar ulang.

**Kegiatan 4: Memilih warna.** Di aplikasi gambar pada komputer lab (aplikasi apa pun yang menampilkan kode warna), pilih tiga warna dan catat kode heksadesimalnya. Terjemahkan ke nilai R, G, B desimal.

## Latihan

### Latihan 1: Biner ke desimal

Ubah ke desimal: `1111`, `10000000`, `00110101`, `01001101`.

### Latihan 2: Desimal ke biner

Ubah ke biner 8 bit: 37, 100, 202.

### Latihan 3: Heksadesimal

a. Ubah `00111111` dan `10100101` ke heksadesimal.
b. Ubah `7C` dan `C0` ke biner dan desimal.

### Latihan 4: Berapa nilai terbesar?

Berapa nilai terbesar yang muat pada 4 bit, 8 bit, dan 10 bit (tanpa tanda minus)? Berapa banyak nilai berbeda pada 8 bit?

### Latihan 5: Kode karakter

a. Sandikan `KOPI` ke deret kode desimal.
b. Sandi balik deret `72 97 108 111`.
c. Tanpa melihat tabel, berapa kode huruf `C` bila `A` = 65?

### Latihan 6: Gambar

a. Deret `18 3C 7E 18 18 18 18 18` adalah gambar 8x8. Ubah tiap byte ke biner dan gambarlah. Apa bentuknya?
b. Berapa byte yang dibutuhkan satu gambar hitam-putih 8x8?

### Latihan 7: Warna

a. Tulis kode heksadesimal warna R = 255, G = 255, B = 0.
b. Kode `#4682B4` bernilai R, G, B berapa?
c. Berapa byte yang dibutuhkan gambar berwarna 10 x 10 piksel tanpa kompresi?

### Latihan 8: Tantangan (opsional)

Jumlahkan secara biner `1011` dan `0110`, lalu ubah hasilnya ke desimal. Cek dengan menjumlahkan versi desimalnya.

### Latihan 9: Susun langkah (soal Parsons)

Langkah mengubah desimal ke biner 8 bit dengan cara pengurangan berikut tercampur. Susun menjadi urutan yang benar.

```text
(a) ulangi untuk nilai tempat berikutnya sampai nilai tempat 1
(b) tulis nilai tempat 128 64 32 16 8 4 2 1
(c) bila nilai tempat muat, tulis bit 1 lalu kurangkan; bila tidak, tulis bit 0
(d) cek: jumlahkan nilai tempat yang bit-nya 1
(e) mulai dari nilai tempat terbesar
```

Lalu pakai urutan itu untuk mengubah 77 ke biner.

## Latihan bercampur dan ulang berjarak

Kerjakan tanpa melihat catatan.

1. Ubah `01001101` ke desimal dan ke heksadesimal.
2. Kata `SMA` disimpan sebagai berapa byte? Tulis dalam heksadesimal.
3. Gambar hitam-putih 16 x 16 piksel butuh berapa byte tanpa kompresi? (Petunjuk: 1 bit per piksel.)
4. Sebuah berkas bernama `foto.png` ditulis ulang oleh seorang murid fiktif sebagai `foto.txt` tanpa mengubah isinya. Apakah isinya jadi teks? Jelaskan dengan kata-katamu, mengaitkan modul sebelumnya tentang ekstensi berkas dan modul ini tentang bit. (Penjelasan diri.)
5. Mengapa program kartu pada modul pertama bisa menyimpan angka di memori, padahal memori hanya menyimpan bit?

Jadwal ulang: jawab lagi tanpa catatan setelah satu hari dan setelah satu minggu; ganti angka pada soal 1 dan 3.

## Kuis formatif

1. Berapa bit dalam 1 byte?
2. Ubah `00001101` ke desimal.
3. Ubah 25 ke biner 8 bit.
4. Satu simbol heksadesimal sama dengan berapa bit?
5. Mengapa teks bisa disimpan di komputer?
6. Berapa byte yang dipakai satu piksel berwarna (R, G, B)?

## Cek mandiri

- Aku bisa mengubah biner, desimal, dan heksadesimal dengan lembar kerja.
- Aku bisa menjelaskan mengapa `KOPI` dapat disimpan sebagai angka.
- Aku bisa menggambar gambar 8x8 dari deret bit.

## Kunci dan petunjuk

**Latihan 1.** 15, 128, 53, 77.

**Latihan 2.** 37 = `00100101` (32 + 4 + 1); 100 = `01100100` (64 + 32 + 4); 202 = `11001010`.

**Latihan 3.** a. `00111111` = `3F`, `10100101` = `A5`. b. `7C` = 0111 1100 = `01111100` = 124; `C0` = 1100 0000 = `11000000` = 192.

**Latihan 4.** 15, 255, 1023. Pada 8 bit ada 256 nilai berbeda.

**Latihan 5.** a. 75 79 80 73. b. Halo. c. 67 (karena huruf berurutan).

**Latihan 6.** a. Bit: `00011000`, `00111100`, `01111110`, `00011000`, `00011000`, `00011000`, `00011000`, `00011000`; bentuknya anak panah ke atas. b. 8 byte.

**Latihan 7.** a. `#FFFF00` (kuning). b. R = 70 (46 heksa), G = 130 (82 heksa), B = 180 (B4 heksa). c. 10 x 10 x 3 = 300 byte.

**Latihan 8.** `1011` = 11 dan `0110` = 6; jumlahnya 17 = `10001`. Cek: 16 + 1 = 17.

**Latihan 9.** Urutan: (b), (e), (c), (a), (d). Untuk 77: 77 - 64 = 13 (bit 64 = 1); 32 dan 16 tidak muat (0, 0); 13 - 8 = 5 (bit 8 = 1); 5 - 4 = 1 (bit 4 = 1); 2 tidak muat (0); 1 - 1 = 0 (bit 1 = 1). Hasil `01001101`. Cek: 64 + 8 + 4 + 1 = 77. Bila urutanmu beda: bagian "mulai dari terbesar" harus sebelum "muat atau tidak"; ulangi menyusun dengan menjalankan langkahmu pada 77 dan lihat di mana macet.

**Ingat kembali.** 1: instruksi program. 2: mengelola proses, memori, berkas, perangkat, antarmuka. 3: sistem mengelola komputer (contoh sistem operasi), aplikasi membantu pengguna mengerjakan sesuatu (contoh peramban). 4: menyebut pembuat dan sumber; menghargai pembuat dan memenuhi syarat lisensi. 5: ekstensi hanya label; isi berkas tidak berubah. Bila ada yang salah, baca ulang bagian itu saja di modul asalnya lalu jawab lagi besok.

**Latihan bercampur.** 1: `01001101` = 77 = `4D`. 2: 3 byte: `53 4D 41`. 3: 16 x 16 = 256 bit = 32 byte. 4: tidak; isinya tetap data gambar, hanya namanya yang berubah, sehingga pembuka teks menampilkan karakter acak; keduanya adalah deretan bit dan yang menentukan tafsirnya adalah format. 5: angka disandikan sebagai deret bit (biner), sama seperti teks dan gambar.

**Kuis.** 1: 8. 2: 13 (8 + 4 + 1). 3: `00011001` (16 + 8 + 1). 4: 4 bit. 5: setiap karakter punya kode angka dalam tabel kode karakter. 6: 3 byte.

## Langkah berikutnya

Lanjutkan ke modul jaringan dan internet (FND-X1-M4 dan M5). Di sana data dikirim antarperangkat dalam potongan kecil; semuanya tetap berupa bit yang baru saja kamu pelajari. Pada jalur pemrograman nanti, pengetahuan ini dipakai untuk memahami tipe data dan operasi bit.
