## Untuk siapa modul ini

Modul ini untuk murid kelas X jalur A (Algoritmik dengan C++), minggu `A-X1-M9` silabus v1.4.1: variabel, tipe data, ekspresi, serta masukan dan keluaran. Prasyarat: modul `a-x1-m8` (mengompilasi dan menjalankan program, pseudocode). Modul ini mengajar dari awal; kamu tidak perlu pernah memprogram sebelumnya.

Modul ini karangan penyusun dan disetujui pemilik program pada 2026-11-20 (keputusan lewat dialog; catatan tinjauan menjadi tindak lanjut revisi). Butir `E-BK-d` dipetakan silabus sebagai dipenuhi jalur ini; pemenuhan butir mengikuti pemetaan silabus, bukan status modul. Keluarga materi OSN yang bertaut: `dasar-pemrograman` (sesuai CP, bukan pengayaan).

Bila kamu pernah memakai bahasa teks seperti Python, konsepnya sama tetapi aturannya beda: di C++ tipe variabel ditulis dan tetap, pernyataan diakhiri titik koma, dan program dikompilasi dulu. Karena itu urutan modul ini membaca dan menebak dulu, lalu melengkapi, baru menulis dari kosong. Tiap soal latihan bertanda `AI: boleh` atau `AI: tanpa AI`. Masukan program diberikan lewat berkas: `./program < masukan.txt`.

## Ingat kembali

Jawab dari ingatan dulu, baru cek di kunci. Soal 1 dari `a-x1-m8`, soal 2 dari `fondasi-keamanan-dasar`, soal 3 dari `fondasi-komputer-dan-hardware`.

1. Sebutkan tiga langkah dari berkas `.cpp` sampai keluaran tercetak.
2. Sebutkan dua ciri kata sandi yang kuat.
3. Apa beda RAM dan penyimpanan?

## Tujuan

Setelah modul ini kamu dapat:

- memilih tipe `int`, `long long`, `double`, `char`, atau `bool` yang sesuai untuk sebuah nilai;
- menulis ekspresi dengan `+`, `-`, `*`, `/`, `%` dan menjelaskan mengapa pembagian dua bilangan bulat menghasilkan bilangan bulat;
- membaca data dengan `cin` dan menulis dengan `cout`, termasuk format desimal;
- menulis program hitung berformat (keluaran minggu ini).

## Prediksi dulu

Ini tugas baca-dan-prediksi, `AI: tanpa AI`. **Tebak dulu, tulis jawabanmu, baru jalankan.**

```cpp
#include <iostream>
using namespace std;

int main() {
  int a = 17;
  int b = 5;
  cout << a / b << "\n";
  cout << a % b << "\n";
  cout << a / 5.0 << "\n";
  double x = a / b;
  cout << x << "\n";
}
```

1. Apa yang tercetak pada tiap baris?
2. Variabel `x` bertipe `double`, tetapi apakah hasilnya 3,4? Mengapa atau mengapa tidak?
3. Apa fungsi `%`?

Simpan tebakanmu. Perbandingannya ada di bagian berikutnya.

## Contoh terselesaikan

Keluaran program tadi:

Keluaran:

```text
3
2
3.4
3
```

Dua bilangan bulat dibagi menghasilkan bilangan bulat (sisa dibuang): `17 / 5` adalah 3. Sisanya diambil dengan `%`: `17 % 5` adalah 2. Bila salah satu operan bertipe `double` (`17 / 5.0`), hasilnya pecahan 3,4. `double x = a / b;` menghitung `a / b` sebagai pembagian bulat dulu (3), baru menyimpannya ke `x`. Bila kamu terbiasa dengan Python: di sana `/` selalu pecahan; di C++ itu bergantung tipe operan.

**Variabel** adalah nama untuk tempat menyimpan nilai, dengan tipe yang menentukan jenis dan ukuran nilainya. Ukuran tipe bergantung komputer; berikut hasil pada mesin penyusun modul (`g++` 13.3.0, Linux), sebagai contoh bukan janji. Jangkauan `int` dan `long long` kamu cek sendiri di komputermu.

| Tipe | Isi | Pakai bila |
| --- | --- | --- |
| `int` | bilangan bulat | nilai bulat yang tidak terlalu besar |
| `long long` | bilangan bulat lebih besar | hasil kali atau jumlah bisa melewati batas `int` |
| `double` | bilangan pecahan | pengukuran, rata-rata, perhitungan desimal |
| `char` | satu karakter | satu huruf atau tanda, ditulis `'A'` |
| `bool` | `true` atau `false` | jawaban ya atau tidak |

```cpp
#include <iostream>
#include <limits>
using namespace std;

int main() {
  cout << "int: " << sizeof(int) << " byte, maks " << numeric_limits<int>::max() << "\n";
  cout << "long long: " << sizeof(long long) << " byte, maks " << numeric_limits<long long>::max() << "\n";
  cout << "double: " << sizeof(double) << " byte\n";
  cout << "char: " << sizeof(char) << " byte\n";
  cout << "bool: " << sizeof(bool) << " byte\n";
  cout << 100000LL * 100000 << "\n";
}
```

Keluaran:

```text
int: 4 byte, maks 2147483647
long long: 8 byte, maks 9223372036854775807
double: 8 byte
char: 1 byte
bool: 1 byte
10000000000
```

Angka terakhir 10.000.000.000 tidak muat di `int`, jadi dihitung dengan `long long` (akhiran `LL`). Melewati batas `int` pada variabel `int` adalah galat pemrograman; modul `matkom-bilangan-bertanda-dan-luapan` membahas sebabnya.

Sekarang program hitung berformat: luas dan keliling persegi panjang dari masukan. `cin >> panjang >> lebar;` membaca dua bilangan yang dipisah spasi atau baris. `fixed` dan `setprecision(2)` menetapkan dua angka di belakang koma.

```cpp
#include <iostream>
#include <iomanip>
using namespace std;

int main() {
  double panjang, lebar;
  cin >> panjang >> lebar;
  double luas = panjang * lebar;
  double keliling = 2 * (panjang + lebar);
  cout << fixed << setprecision(2);
  cout << "luas = " << luas << "\n";
  cout << "keliling = " << keliling << "\n";
}
```

Masukan (`masukan.txt`):

```text
7.5 4
```

Keluaran:

```text
luas = 30.00
keliling = 23.00
```

## Contoh setengah jadi

Program serupa: konversi suhu Celsius ke Fahrenheit dengan rumus F = C x 9 / 5 + 32. Lengkapi bagian `____`. Hati-hati dengan jenis pembagiannya.

```cpp setengah-jadi
#include <iostream>
#include <iomanip>
using namespace std;

int main() {
  double celsius;
  cin >> ____;
  double fahrenheit = celsius * 9.0 / ____ + 32;
  cout << fixed << setprecision(1) << ____ << "\n";
}
```

## Soal Parsons

Susun baris-baris berikut (sudah diacak) menjadi program yang membaca dua bilangan dan mencetak rata-ratanya. `AI: tanpa AI`: tujuannya melatih membaca urutan program.

```text
(a)   double rata = (x + y) / 2;
(b) #include <iostream>
(c)   cout << rata << "\n";
(d) }
(e)   cin >> x >> y;
(f) using namespace std;
(g) int main() {
(h)   double x, y;
```

## Latihan

1. `AI: boleh` **Pseudocode dulu.** Tulis pseudocode untuk membaca dua bilangan bulat a dan b lalu mencetak hasil bagi bulat dan sisanya. Baru tulis programnya dan jalankan dengan masukan `47 6`.
2. `AI: tanpa AI` **Telusuri.** Setelah `int a = 7; double b = a / 2; double c = a / 2.0;` berapa nilai b dan c? Jelaskan perbedaannya.
3. `AI: boleh` **Lingkaran.** Baca jari-jari (`double`), cetak luas dan keliling dengan dua angka di belakang koma. Pakai `const double PI = 3.14159265358979;`. Uji dengan jari-jari 10.
4. `AI: boleh` **Rata-rata yang benar.** Baca dua `int`, cetak rata-ratanya sebagai pecahan. Tulis dulu versi yang keliru (hasilnya dibulatkan ke bawah), lalu perbaiki. Uji dengan 7 dan 4.
5. *Opsional:* **catatan pemakaian AI.** Bila memakai AI generatif, jawab nomor 1 sendiri dulu, lalu minta penjelasan atau petunjuk bertahap, bukan program jadi. Catat alatnya, tujuanmu, garis besar perintahmu, bagian yang kamu pakai, dan caramu memeriksanya (jalankan atau telusuri). Jangan menaruh data pribadi atau tugas bernilai pada perintah.

## Latihan bercampur

1. Ubah program `tukar` dari `a-x1-m8` agar membaca a dan b dari `cin`. Uji dengan `7 3`.
2. Tipe `char` menyimpan satu byte. Berapa nilai berbeda yang bisa disimpan satu byte, dan mengapa (modul `fondasi-representasi-data`)?
3. Tulis nama rapi untuk berkas program konversi suhu, lalu perintah `g++` untuk mengompilasinya menjadi program bernama `suhu`.

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `a-x1-m10` (pertanyaan 1), sekitar tiga minggu lagi di `a-x1-m12` (pertanyaan 2), dan sekitar delapan minggu lagi di `a-x2-m3` (pertanyaan 3). Jawab sekarang lalu simpan.

1. Berapa hasil `17 / 5` dan `17 % 5` pada bilangan bulat?
2. Mengapa `9 / 5` bukan 1,8 pada C++, dan bagaimana memperbaikinya?
3. Kapan kamu memilih `long long` dan bukan `int`?

## Kesalahan umum

- **Membagi dua `int` lalu mengharap pecahan.** `7 / 2` adalah 3; tulis `7 / 2.0` atau ubah salah satu variabel menjadi `double`.
- **Menyimpan hasil `a / b` ke `double` dan mengira sudah aman.** Pembagian bulat terjadi lebih dulu; perbaikannya di operan, bukan di variabel hasil.
- **Lupa `fixed` dan `setprecision`.** Keluaran `double` bisa tampil tanpa angka di belakang koma atau dalam notasi ilmiah; tetapkan formatnya.
- **Memakai `int` untuk hasil kali besar.** `100000 * 100000` tidak muat di `int`; pakai `long long`.
- **Urutan `cin >>` tidak sesuai urutan masukan.** Nilai tertukar masuk ke variabel yang salah.

## Cek mandiri

- [ ] Saya dapat memilih tipe yang sesuai untuk suatu nilai.
- [ ] Saya dapat menjelaskan hasil `/` dan `%` pada bilangan bulat.
- [ ] Saya dapat membaca dan menulis data dengan `cin` dan `cout`.
- [ ] Saya dapat memformat bilangan desimal dengan `fixed` dan `setprecision`.
- [ ] Saya menulis pseudocode sebelum programnya.

## Kunci dan petunjuk

**Ingat kembali.** 1: tulis berkas, kompilasi, jalankan. 2: contoh jawaban: panjang, tidak mudah ditebak, tidak dipakai di banyak akun. 3: RAM sementara dan cepat, isinya hilang saat listrik mati; penyimpanan menyimpan tetap dan lebih lambat.

**Prediksi dulu.** 1: 3, 2, 3.4, 3 (pada format bawaan `cout`). 2: bukan; `a / b` dihitung sebagai pembagian bulat (3) sebelum disimpan ke `x`. 3: `%` memberi sisa bagi.

**Contoh setengah jadi.** Isi: `cin >> celsius;`, `5.0`, `fahrenheit`. Program lengkapnya:

```cpp
#include <iostream>
#include <iomanip>
using namespace std;

int main() {
  double celsius;
  cin >> celsius;
  double fahrenheit = celsius * 9.0 / 5.0 + 32;
  cout << fixed << setprecision(1) << fahrenheit << "\n";
}
```

Masukan (`masukan.txt`):

```text
36.6
```

Keluaran:

```text
97.9
```

Bentuk `celsius * 9 / 5` juga benar karena `celsius` bertipe `double`; yang salah adalah `9 / 5 * celsius`, sebab `9 / 5` dihitung lebih dulu sebagai bilangan bulat (1).

**Soal Parsons.** Urutan benar: b, f, g, h, e, a, c, d. Baris (b) `#include` lebih dulu dari (f) `using`; (d) menutup `main`.

**Latihan.** 1: pseudocode: baca a, b; cetak a bagi b (bulat); cetak a sisa b. Program contoh:

```cpp
#include <iostream>
using namespace std;

int main() {
  int a, b;
  cin >> a >> b;
  cout << "hasil bagi = " << a / b << ", sisa = " << a % b << "\n";
}
```

Masukan (`masukan.txt`):

```text
47 6
```

Keluaran:

```text
hasil bagi = 7, sisa = 5
```

2: b = 3 karena `a / 2` dihitung bulat; c = 3,5 karena `2.0` membuat pembagian pecahan. 3: program contoh:

```cpp
#include <iostream>
#include <iomanip>
using namespace std;

int main() {
  const double PI = 3.14159265358979;
  double r;
  cin >> r;
  cout << fixed << setprecision(2);
  cout << "luas = " << PI * r * r << "\n";
  cout << "keliling = " << 2 * PI * r << "\n";
}
```

Masukan (`masukan.txt`):

```text
10
```

Keluaran:

```text
luas = 314.16
keliling = 62.83
```

4: versi keliru `(a + b) / 2` dengan `int` memberi 5 untuk 7 dan 4. Versi benar:

```cpp
#include <iostream>
#include <iomanip>
using namespace std;

int main() {
  int a, b;
  cin >> a >> b;
  double rata = (a + b) / 2.0;
  cout << fixed << setprecision(1) << rata << "\n";
}
```

Masukan (`masukan.txt`):

```text
7 4
```

Keluaran:

```text
5.5
```

**Latihan bercampur.** 1: ganti `int a = 7; int b = 3;` dengan `int a, b; cin >> a >> b;`; hasil untuk `7 3` adalah `a = 3, b = 7`. 2: 256 nilai, karena satu byte 8 bit dan 2^8 = 256. 3: contoh `konversi-suhu.cpp`; perintah `g++ -std=c++17 -Wall -Wextra konversi-suhu.cpp -o suhu`.

**Ulang berjarak.** 1: 3 dan 2. 2: karena kedua operan `int`, hasilnya bulat (1); tulis `9.0 / 5` atau `9 / 5.0`. 3: bila hasil jumlah atau hasil kali bisa melebihi sekitar 2 miliar (batas `int` pada komputer lab).

## Langkah berikutnya

Modul berikut: `a-x1-m10` (percabangan dan logika Boolean), yang membuat program memilih tindakan. Modul terkait: `matkom-sistem-bilangan-basis` dan `matkom-bilangan-bertanda-dan-luapan` sebagai bacaan pendamping. Bacaan lanjut: halaman cppreference tentang tipe dasar dan `std::cin`.
