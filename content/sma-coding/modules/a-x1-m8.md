## Untuk siapa modul ini

Modul ini untuk murid kelas X yang mengambil jalur A (Algoritmik dengan C++). Ia mendampingi minggu `A-X1-M8` silabus v1.4.1: lingkungan g++, algoritma, pseudocode, dan diagram alir. Prasyarat: `FND-X1-M1` (model Input-Proses-Output, modul `fondasi-komputer-dan-hardware`) dan `FND-X1-M3` (biner dan heksadesimal, modul `fondasi-representasi-data`). Kamu belum perlu pernah memprogram.

Modul ini berstatus DRAF: karangan penyusun, belum ditinjau pemilik. Butir `E-BK-d` (solusi program sederhana dalam format pseudocode) dipetakan silabus sebagai dipenuhi jalur ini pada minggu ini; modul draf ini belum dihitung sebagai pemenuhan. Minggu ini belum bertaut ke keluarga materi OSN; keluarga pertama muncul di `a-x1-m9`.

Jalankan semua contoh di komputer, lalu kerjakan latihan. Tiap soal latihan bertanda `AI: boleh` atau `AI: tanpa AI`. Pemeriksaan otomatis repositori hanya memastikan program bisa dikompilasi, bukan benar untuk semua masukan.

## Ingat kembali

Jawab dari ingatan dulu, baru cek di kunci. Karena ini minggu pertama jalur, soalnya diambil dari modul fondasi (`fondasi-komputer-dan-hardware`, `fondasi-software-dan-sistem-operasi`, `fondasi-representasi-data`).

1. Sebutkan tiga bagian siklus Input-Proses-Output dan beri satu contoh program atau perangkat.
2. Ubah bilangan biner `1101` menjadi desimal.
3. Berapa nilai berbeda yang dapat disimpan satu byte?
4. Nama berkas `Program Pertama (1).CPP` kurang rapi. Tulis satu nama yang lebih baik dan sebut satu aturannya.

## Tujuan

Setelah modul ini kamu dapat:

- menyebut tiga langkah dari berkas `.cpp` sampai keluaran tercetak: menulis, mengompilasi, menjalankan;
- mengompilasi dan menjalankan program pertama (`hello.cpp`) dengan `g++`, termasuk membaca pesan galat pertamanya;
- menulis tiga pseudocode sederhana: mencetak teks, menukar dua nilai, mencari nilai terbesar dari tiga;
- menggambar diagram alir untuk satu algoritma dan menelusurinya dengan sebuah nilai.

## Prediksi dulu

Ini tugas baca-dan-prediksi, `AI: tanpa AI`. Baca program ini dan **tebak dulu, tulis jawabanmu, baru jalankan**. Tebaklah dari bentuknya walau sebagian baris belum kamu kenal.

```cpp
#include <iostream>

int main() {
  std::cout << "Halo";
  std::cout << " dunia";
  std::cout << "\n";
  std::cout << "Baris dua\n";
}
```

1. Berapa baris yang tercetak?
2. Apa isi baris pertama? Apakah ada spasi di antara "Halo" dan "dunia"? Dari mana asalnya?
3. Apa yang dilakukan `"\n"`?

Simpan tebakanmu. Perbandingannya ada di bagian berikutnya.

## Contoh terselesaikan

Cocokkan dulu tebakanmu. Program pada bagian prediksi mencetak:

Keluaran:

```text
Halo dunia
Baris dua
```

Program ditulis dalam **berkas teks** berekstensi `.cpp`, lalu **dikompilasi** oleh kompilator menjadi berkas yang bisa dijalankan. Dalam model I-P-O: masukannya berkas `.cpp`, prosesnya penerjemahan, keluarannya berkas program. Alurnya tiga langkah: tulis, kompilasi, jalankan. Bila kamu mengubah berkas `.cpp`, kompilasi ulang dulu, kalau tidak yang jalan masih program lama.

Berikut `hello.cpp`:

```cpp
#include <iostream>

int main() {
  std::cout << "Halo, dunia!\n";
}
```

Keluaran:

```text
Halo, dunia!
```

Di terminal, tanda `$` hanya penanda bahwa komputer menunggu perintah; jangan diketik.

```text
$ g++ -std=c++17 -Wall -Wextra hello.cpp -o hello
$ ./hello
```

Baris pertama berarti: kompilasi `hello.cpp` dengan standar C++17, minta peringatan tambahan (`-Wall` dan `-Wextra`, lihat dokumentasi GCC), simpan hasilnya sebagai `hello`. Baris kedua menjalankan hasilnya. Di sistem operasi lain nama berkas hasil dan cara menjalankannya bisa berbeda (di Windows biasanya `hello.exe`); ikuti petunjuk lab sekolahmu, karena detail pemasangan `[belum terverifikasi]`.

Arti baris program: `#include <iostream>` memuat fasilitas masukan dan keluaran. `int main()` adalah titik awal. `std::cout` mencetak ke layar; `<<` menyambung yang dicetak; `"\n"` pindah baris. Tiap pernyataan diakhiri titik koma. Bila ada galat, `g++` mencetak nama berkas, nomor baris, dan penjelasan; baca dari **pesan pertama**, karena ia sering menimbulkan galat lain di bawahnya.

**Algoritma** adalah urutan langkah berhingga yang jelas untuk menyelesaikan masalah. **Pseudocode** menuliskannya dengan bahasa sehari-hari yang rapi, tanpa aturan sintaks bahasa pemrograman tertentu. Tiga pseudocode tugas minggu ini; `<-` berarti "isi dengan".

```text
CETAK TEKS
  cetak "Halo, dunia!"

TUKAR DUA NILAI
  masukan: a, b
  sementara <- a
  a <- b
  b <- sementara
  keluaran: a, b

TERBESAR DARI TIGA
  masukan: p, q, r
  terbesar <- p
  BILA q > terbesar: terbesar <- q
  BILA r > terbesar: terbesar <- r
  keluaran: terbesar
```

Diagram alir untuk "terbesar dari tiga" (kotak adalah langkah, belah ketupat adalah pertanyaan ya atau tidak):

```text
[mulai]
   |
[terbesar <- p]
   |
<q > terbesar?> --ya--> [terbesar <- q]
   | tidak                    |
   +<-------------------------+
   |
<r > terbesar?> --ya--> [terbesar <- r]
   | tidak                    |
   +<-------------------------+
   |
[cetak terbesar]
   |
[selesai]
```

Telusuri dengan p = 12, q = 40, r = 25: awalnya terbesar = 12. Karena 40 > 12, terbesar menjadi 40. Karena 25 > 40 salah, terbesar tetap 40. Hasilnya 40.

Pseudocode kedua dijadikan program. Nilai awalnya ditulis langsung di program; membaca masukan dari papan ketik baru dibahas di `a-x1-m9`.

```cpp
#include <iostream>

int main() {
  int a = 7;
  int b = 3;
  int sementara = a;
  a = b;
  b = sementara;
  std::cout << "a = " << a << ", b = " << b << "\n";
}
```

Keluaran:

```text
a = 3, b = 7
```

## Contoh setengah jadi

Sekarang pseudocode ketiga dijadikan program. Kamu belum belajar `if` secara resmi; cukup tahu bahwa `if (syarat) { ... }` berarti "bila syarat benar, kerjakan isi di dalam kurung kurawal". Lengkapi bagian `____`.

```cpp setengah-jadi
#include <iostream>

int main() {
  int p = 12;
  int q = 40;
  int r = 25;
  int terbesar = ____;
  if (q > terbesar) {
    terbesar = ____;
  }
  if (r > ____) {
    terbesar = r;
  }
  std::cout << "terbesar = " << terbesar << "\n";
}
```

## Soal Parsons

Susun baris-baris di bawah (sudah diacak) menjadi program `tukar` pada contoh terselesaikan. Tanda `AI: tanpa AI`: tujuannya melatih membaca urutan langkah.

```text
(a)   int sementara = a;
(b) }
(c)   a = b;
(d) int main() {
(e)   int a = 7;
(f)   b = sementara;
(g) #include <iostream>
(h)   int b = 3;
(i)   std::cout << "a = " << a << ", b = " << b << "\n";
```

## Latihan

1. `AI: boleh` **Pseudocode dulu.** Tulis pseudocode untuk memutar tiga nilai: a diisi nilai b, b diisi nilai c, c diisi nilai a yang lama. Lalu jadikan program dengan a = 1, b = 2, c = 3 dan jalankan.
2. `AI: tanpa AI` **Telusuri.** Seseorang menukar dua nilai dengan `a = b;` lalu `b = a;` (tanpa variabel sementara) pada a = 7 dan b = 3. Berapa a dan b setelahnya? Mengapa?
3. `AI: boleh` **Diagram alir.** Gambar diagram alir untuk "terbesar dari tiga" lalu telusuri dengan p = 5, q = 5, r = 2. Apa hasilnya, dan apakah diagram itu perlu diubah untuk nilai yang sama besar?
4. `AI: boleh` **Lingkungan.** Kompilasi dan jalankan `hello.cpp` dengan teks berbeda. Lalu hapus satu titik koma, kompilasi, dan salin pesan galat pertama. Pulihkan program.
5. *Opsional:* **catatan pemakaian AI.** Bila memakai AI generatif, jawab nomor 1 sendiri dulu, lalu minta penjelasan atau petunjuk bertahap, bukan program jadi. Catat alatnya, tujuanmu, garis besar perintahmu, bagian yang kamu pakai, dan caramu memeriksanya (jalankan atau telusuri). Jangan menaruh data pribadi atau tugas bernilai pada perintah.

## Latihan bercampur

Soal ini memadukan modul fondasi dengan modul ini.

1. Gambar diagram I-P-O untuk `g++`: apa masukannya, prosesnya, dan keluarannya?
2. Sebuah program memakai nilai `00101010` (biner). Berapa nilainya dalam desimal dan heksadesimal?
3. Susun folder `jalur-a` untuk tiga berkas latihan minggu ini dan beri nama yang rapi untuk masing-masing.

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `a-x1-m9` (pertanyaan 1), sekitar tiga minggu lagi di `a-x1-m11` (pertanyaan 2), dan sekitar delapan minggu lagi di `a-x2-m2` (pertanyaan 3). Jawab sekarang lalu simpan.

1. Sebutkan tiga langkah dari berkas `.cpp` sampai keluaran tercetak.
2. Mengapa menukar dua nilai memerlukan variabel sementara?
3. Apa beda pseudocode dan program C++, dan apa untungnya menulis pseudocode lebih dulu?

## Kesalahan umum

- **Titik koma hilang atau kurung tidak berpasangan.** Kompilator menolak program; baca pesan galat pertama dan lihat baris yang disebut atau baris sebelumnya.
- **Mengubah berkas tanpa kompilasi ulang.** Yang dijalankan masih program lama; kompilasi lagi setelah tiap perubahan.
- **Menukar dua nilai tanpa variabel sementara.** `a = b; b = a;` membuat keduanya sama, karena nilai lama a sudah hilang.
- **Mengira `=` berarti "sama dengan".** Di C++ ia berarti "isi variabel kiri dengan nilai kanan".

## Cek mandiri

- [ ] Saya dapat menyebut tiga langkah dari berkas `.cpp` sampai keluaran.
- [ ] Saya dapat mengompilasi dan menjalankan `hello.cpp` sendiri.
- [ ] Saya dapat membaca pesan galat `g++` dari yang pertama.
- [ ] Saya dapat menulis pseudocode untuk tukar dua nilai dan terbesar dari tiga.
- [ ] Saya dapat menelusuri diagram alir dengan satu nilai.

## Kunci dan petunjuk

**Ingat kembali.** 1: masukan, proses, keluaran; contoh kalkulator (tombol, hitung, layar). 2: 1101 biner = 8 + 4 + 1 = 13. 3: 256 nilai (0 sampai 255). 4: contoh `program-pertama-1.cpp`; aturannya: tanpa spasi dan karakter khusus, huruf kecil, ekstensi yang jelas.

**Prediksi dulu.** 1: dua baris. 2: "Halo dunia"; spasi datang dari teks `" dunia"` yang diawali spasi, bukan dari `<<`. 3: pindah ke baris berikutnya; `std::cout << "Halo";` dan `std::cout << " dunia";` mencetak di baris yang sama karena tidak ada `\n` di antaranya.

**Contoh setengah jadi.** Isi: `int terbesar = p;`, `terbesar = q;`, `if (r > terbesar)`. Program lengkapnya:

```cpp
#include <iostream>

int main() {
  int p = 12;
  int q = 40;
  int r = 25;
  int terbesar = p;
  if (q > terbesar) {
    terbesar = q;
  }
  if (r > terbesar) {
    terbesar = r;
  }
  std::cout << "terbesar = " << terbesar << "\n";
}
```

Keluaran:

```text
terbesar = 40
```

**Soal Parsons.** Urutan benar: g, d, e, h, a, c, f, i, b. Baris (g) `#include` selalu di atas; baris (b) menutup `main` dan harus terakhir.

**Latihan.** 1: pseudocode contoh: sementara <- a; a <- b; b <- c; c <- sementara. Hasil program: a = 2, b = 3, c = 1. Program contoh:

```cpp
#include <iostream>

int main() {
  int a = 1;
  int b = 2;
  int c = 3;
  int sementara = a;
  a = b;
  b = c;
  c = sementara;
  std::cout << "a = " << a << ", b = " << b << ", c = " << c << "\n";
}
```

Keluaran:

```text
a = 2, b = 3, c = 1
```

2: setelah `a = b;` nilai a menjadi 3 dan nilai 7 hilang; lalu `b = a;` mengisi b dengan 3, jadi a = 3 dan b = 3. 3: p = 5; 5 > 5 salah; 2 > 5 salah; hasil 5. Diagram tidak perlu diubah: nilai yang sama besar menghasilkan nilai yang sama, jadi memilih salah satunya tidak masalah. 4: pesan bergantung versi `g++`; pada `g++` 13.3.0 bentuknya `hello.cpp:4:32: error: expected ';' before '}' token`. Yang dinilai: kamu menyalin pesan pertama dan memulihkan program.

**Latihan bercampur.** 1: masukan berkas `.cpp`; proses kompilator menerjemahkan; keluaran berkas program (atau pesan galat). 2: 00101010 biner = 32 + 8 + 2 = 42 desimal = 2A heksadesimal. 3: contoh `jalur-a/hello.cpp`, `jalur-a/tukar.cpp`, `jalur-a/terbesar.cpp`.

**Ulang berjarak.** 1: tulis berkas, kompilasi, jalankan. 2: karena nilai lama a hilang begitu a diisi nilai b; variabel sementara menyimpannya dulu. 3: pseudocode untuk manusia dan tanpa aturan sintaks ketat; program C++ dikompilasi dan aturannya ketat; pseudocode membantu memikirkan langkah sebelum sibuk dengan sintaks.

## Langkah berikutnya

Modul berikut: `a-x1-m9` (variabel, tipe data, ekspresi, masukan dan keluaran), yang mengganti nilai tetap dengan masukan dari papan ketik. Modul terkait: `fondasi-software-dan-sistem-operasi` untuk aturan nama berkas dan folder. Bacaan lanjut: dokumentasi opsi peringatan GCC (`-Wall`, `-Wextra`).
