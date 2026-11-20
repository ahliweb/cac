## Untuk siapa modul ini

Modul ini untuk murid kelas XII jalur A (Algoritmik dengan C++), minggu `A-XII1-M8` silabus v1.4.1: aritmetika modular. Prasyarat: modul `a-xii1-m7` dan `a-x2-m5` (FPB, KPK, bilangan prima).

Modul ini karangan penyusun dan disetujui pemilik program pada 2026-11-20 (keputusan lewat dialog; catatan tinjauan menjadi tindak lanjut revisi). Silabus tidak memetakan butir capaian pembelajaran untuk minggu ini, jadi modul ini tidak dihitung memenuhi butir CP apa pun. Keluarga materi OSN yang bertaut: `aritmetika`; aritmetika modular ditandai pengayaan (P) di jembatan OSN, sehingga kelas reguler boleh melewati modul ini. Modul tidak menjanjikan kedalaman soal OSN dan tidak menggantikan pembinaan OSN.

Tiap soal latihan bertanda `AI: boleh` atau `AI: tanpa AI`. Masukan program diberikan lewat berkas: `./program < masukan.txt`. Semua angka dan data karangan.

## Ingat kembali

Jawab dari ingatan dulu, baru cek di kunci. Soal 1 dari `a-xii1-m7`, soal 2 dari `a-xii1-m5`, soal 3 dari `a-x2-m5`.

1. Apa rumus peralihan Pascal untuk `C(n, k)`, dan mengapa benar?
2. Apa yang dilakukan lebih dulu pada LCA sederhana bila dua simpul berbeda kedalaman?
3. Mengapa KPK sebaiknya dihitung `a / fpb(a, b) * b`, bukan `a * b / fpb(a, b)`?

## Tujuan

Setelah modul ini kamu dapat:

- menghitung sisa bagi dengan benar, termasuk untuk bilangan negatif di C++;
- menjaga hasil antara tetap kecil dengan `% m` pada tiap penjumlahan dan perkalian;
- menulis pemangkatan modular cepat dan menyebut banyak putarannya;
- mencari invers modular dengan teorema kecil Fermat untuk modulus prima, dan menyebut kapan invers tidak ada (keluaran minggu ini: program modular).

## Prediksi dulu

Ini tugas baca-dan-prediksi, `AI: tanpa AI`. **Tebak dulu, tulis jawabanmu, baru jalankan.** Dalam matematika, sisa bagi tak pernah negatif. Bagaimana dengan C++?

```cpp
#include <iostream>
using namespace std;

int main() {
  cout << 17 % 5 << " " << -17 % 5 << " " << ((-17 % 5) + 5) % 5 << "\n";
}
```

1. Apa yang tercetak?
2. Mengapa bentuk ketiga, `((-17 % 5) + 5) % 5`, memberi hasil yang berbeda dari bentuk kedua?

Simpan tebakanmu. Perbandingannya ada di bagian berikutnya.

## Contoh terselesaikan

Keluaran program tadi:

```text
2 -2 3
```

Di C++, hasil `%` mengikuti tanda bilangan yang dibagi, jadi `-17 % 5` bernilai `-2`. Untuk mendapat sisa di `0` sampai `m - 1`, pakai `((x % m) + m) % m`. Aritmetika modular bertumpu pada tiga sifat: `(a + b) % m = ((a % m) + (b % m)) % m`, `(a * b) % m = ((a % m) * (b % m)) % m`, dan hal serupa untuk pengurangan (dengan perbaikan tanda di atas). Pembagian tidak punya sifat serupa, itu sebabnya ada invers. Karena itu `% m` boleh dikerjakan setelah **setiap** operasi, sehingga hasil antara tak pernah melebihi `m - 1`, lalu perkalian dua hasil antara tak pernah melebihi `(m - 1)^2`. Untuk `m` sekitar `10^9`, itu masih di bawah batas `long long` (sekitar `9,2 * 10^18`), tetapi tidak di bawah batas `int`.

Pemangkatan cepat (modul `a-xi1-m7`) dengan `% m` menghitung `a^b mod m` dalam `O(log b)` putaran: bila bit terendah `b` 1, kalikan ke hasil; kuadratkan `a`; geser `b` ke kanan. Program berikut membaca kueri `a b m` dan mencetak hasil beserta banyak putaran.

```cpp
#include <iostream>
using namespace std;

long long pangkatMod(long long a, long long b, long long m, int& langkah) {
  long long hasil = 1 % m;
  a %= m;
  while (b > 0) {
    langkah++;
    if (b % 2 == 1) {
      hasil = hasil * a % m;
    }
    a = a * a % m;
    b /= 2;
  }
  return hasil;
}

int main() {
  int q;
  cin >> q;
  for (int k = 0; k < q; k++) {
    long long a, b, m;
    cin >> a >> b >> m;
    int langkah = 0;
    long long h = pangkatMod(a, b, m, langkah);
    cout << a << "^" << b << " mod " << m << " = " << h << " (" << langkah << " putaran)\n";
  }
}
```

Masukan (`masukan.txt`):

```text
4
2 10 1000
3 200 1000000007
7 0 13
5 1000000000000 1000000007
```

Keluaran:

```text
2^10 mod 1000 = 24 (4 putaran)
3^200 mod 1000000007 = 136318165 (8 putaran)
7^0 mod 13 = 1 (0 putaran)
5^1000000000000 mod 1000000007 = 365103863 (40 putaran)
```

Baca angkanya. `2^10 = 1024`, sisa bagi 1000 adalah 24, dan `10` berbentuk biner `1010` sehingga ada 4 putaran. Eksponen `10^12` hanya 40 putaran karena `10^12` kira-kira `2^40`; perulangan biasa `b` kali akan memerlukan satu triliun langkah. Pemangkatan modular memerlukan `O(log b)` langkah.

**Invers modular.** `x` adalah invers `a` modulo `m` bila `a * x mod m = 1`; dengan itu "membagi dengan `a`" menjadi "mengalikan dengan `x`". Untuk modulus **prima** `P` dan `a` yang bukan kelipatan `P`, teorema kecil Fermat memberi `a^(P-1) mod P = 1`, sehingga inversnya `a^(P-2) mod P`.

```cpp
#include <iostream>
using namespace std;

long long pangkatMod(long long a, long long b, long long m) {
  long long hasil = 1;
  a %= m;
  while (b > 0) {
    if (b % 2 == 1) {
      hasil = hasil * a % m;
    }
    a = a * a % m;
    b /= 2;
  }
  return hasil;
}

int main() {
  const long long P = 1000000007;
  long long x;
  while (cin >> x) {
    long long inv = pangkatMod(x, P - 2, P);
    cout << "invers " << x << " = " << inv << ", cek: " << x * inv % P << "\n";
  }
}
```

Masukan (`masukan.txt`):

```text
2
3
123456789
```

Keluaran:

```text
invers 2 = 500000004, cek: 1
invers 3 = 333333336, cek: 1
invers 123456789 = 18633540, cek: 1
```

Kolom "cek" membuktikan hasilnya: `x * inv mod P` selalu 1. Satu syarat: invers hanya ada bila `FPB(a, m) = 1`; bagian pengayaan menunjukkan cara mencarinya untuk modulus yang bukan prima.

## Contoh setengah jadi

Lengkapi pemangkatan modular.

```cpp setengah-jadi
long long pangkatMod(long long a, long long b, long long m) {
  long long hasil = ____ % m;
  a %= m;
  while (b > ____) {
    if (b % 2 == 1) {
      hasil = hasil * a % ____;
    }
    a = a * a % m;
    b /= 2;
  }
  return hasil;
}
```

## Soal Parsons

Susun tujuh baris berikut (sudah diacak, tanpa lekuk) menjadi isi perulangan `while (b > 0)` pada `pangkatMod`. `AI: tanpa AI`: tujuannya melatih membaca urutan.

```text
(a) b /= 2;
(b) }
(c) if (b % 2 == 1) {
(d) a = a * a % m;
(e) hasil = hasil * a % m;
(f) while (b > 0) {
(g) }
```

## Latihan

1. `AI: boleh` **Kueri pangkat.** Tulis pseudocode lebih dulu, lalu program yang membaca banyak kueri `a b m` dan mencetak `a^b mod m`. Uji `b = 0`, `m = 1`, dan `a` lebih besar dari `m`.
2. `AI: tanpa AI` **Telusuri.** Telusuri `pangkatMod(3, 5, 7)` putaran demi putaran dan tulis nilai `hasil`, `a`, dan `b` sesudah tiap putaran.
3. `AI: boleh` **Kombinasi modular.** Hitung `C(n, k) mod 1000000007` untuk `n` sampai satu juta dengan faktorial dan invers (`C(n, k) = n! / (k! (n-k)!)`). Uji `k = 0` dan `k = n`.
4. `AI: boleh` **Invers dengan percobaan.** Untuk `m` kecil, cari invers tiap `a` dari 1 sampai `m - 1` dengan mencoba semua `x`, dan cetak "tidak ada" bila tak ada. Uji `m = 12`.
5. *Opsional:* **catatan pemakaian AI.** Bila memakai AI generatif, jawab nomor 2 sendiri dulu, lalu minta penjelasan atau petunjuk bertahap, bukan program jadi. Catat alatnya, tujuanmu, garis besar perintahmu, bagian yang kamu pakai, dan caramu memeriksanya. Jangan menaruh data pribadi atau tugas bernilai pada perintah.

## Latihan bercampur

1. `AI: tanpa AI` Mengapa invers `a` modulo `m` hanya ada bila `FPB(a, m) = 1` (modul `a-x2-m5`)? Pakai hasil nomor 4 untuk menjelaskan.
2. `AI: boleh` Pada `hasil * a % m` dengan `m` sekitar `10^9`, tipe apa yang aman, dan mengapa perkalian tiga faktor sebelum `% m` tidak aman (modul pendamping `matkom-bilangan-bertanda-dan-luapan`)?
3. `AI: boleh` Bandingkan banyak langkah menghitung `a^b` dengan perulangan `b` kali dan dengan pemangkatan cepat untuk `b = 10^12` (modul `a-x2-m12`).

## Pengayaan (P)

Bagian ini boleh dilewati; ia bukan syarat modul berikutnya. Cara Fermat hanya untuk modulus prima. Untuk sembarang `m` dengan `FPB(a, m) = 1`, algoritma Euclid yang diperluas mencari `x` dan `y` dengan `a*x + m*y = FPB(a, m)`; bila FPB-nya 1, maka `x mod m` adalah invers `a`.

```cpp
#include <iostream>
using namespace std;

long long euclidPerluasan(long long a, long long b, long long& x, long long& y) {
  if (b == 0) {
    x = 1;
    y = 0;
    return a;
  }
  long long x1, y1;
  long long g = euclidPerluasan(b, a % b, x1, y1);
  x = y1;
  y = x1 - (a / b) * y1;
  return g;
}

int main() {
  long long a, m;
  while (cin >> a >> m) {
    long long x, y;
    long long g = euclidPerluasan(a, m, x, y);
    if (g != 1) {
      cout << "invers " << a << " mod " << m << ": tidak ada (FPB " << g << ")\n";
    } else {
      cout << "invers " << a << " mod " << m << " = " << ((x % m) + m) % m << "\n";
    }
  }
}
```

Masukan (`masukan.txt`):

```text
3 11
7 12
6 9
10 1000000007
```

Keluaran:

```text
invers 3 mod 11 = 4
invers 7 mod 12 = 7
invers 6 mod 9: tidak ada (FPB 3)
invers 10 mod 1000000007 = 700000005
```

Soal pengayaan, `AI: boleh`: buktikan dengan tangan bahwa `7 * 7 mod 12 = 1`, lalu jelaskan mengapa `6` tak punya invers modulo `9`.

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `a-xii1-m9` (pertanyaan 1), sekitar tiga minggu lagi di `a-xii1-m11` (pertanyaan 2), dan sekitar delapan minggu lagi di `a-xii2-m2` (pertanyaan 3). Jawab sekarang lalu simpan.

1. Mengapa tiap perkalian pada pemangkatan modular diikuti `% m`, dan tipe apa yang dipakai untuk hasil antara?
2. Kapan invers `a` modulo `m` ada, dan bagaimana mencarinya bila `m` prima?
3. Mengapa `-17 % 5` bernilai `-2` di C++, dan bagaimana mendapat sisa di `0` sampai `4`?

## Kesalahan umum

- **Mengira `%` selalu tak negatif.** Pada bilangan negatif C++ memberi hasil negatif; perbaiki dengan `((x % m) + m) % m`.
- **Memakai `int` untuk hasil antara.** `a * a` dengan `a` sekitar `10^9` melebihi batas `int` dan `long long` perlu dipakai sejak awal.
- **Lupa `% m` pada salah satu langkah.** Hasil antara membengkak dan akhirnya meluap.
- **Membagi dalam modulo dengan `/`.** `(a / b) % m` tidak sama dengan hasil modular; pakai invers.
- **Memakai rumus Fermat pada modulus bukan prima.** Hasilnya bukan invers; periksa dengan `a * x % m == 1`.

## Cek mandiri

- [ ] Saya dapat menghitung sisa bagi bilangan negatif di C++ agar jatuh di `0` sampai `m - 1`.
- [ ] Saya dapat menulis `pangkatMod` dan menyebut banyak putarannya.
- [ ] Saya dapat mencari invers modular untuk modulus prima dan memeriksanya.
- [ ] Saya dapat menyebut syarat adanya invers.
- [ ] Saya dapat menjelaskan mengapa `% m` dilakukan setelah tiap operasi.

## Kunci dan petunjuk

**Ingat kembali.** 1: `C(n, k) = C(n-1, k-1) + C(n-1, k)`: ambil satu unsur khusus; kelompok yang memuatnya tinggal memilih `k - 1` dari sisa `n - 1`, yang tidak memuatnya memilih `k` dari `n - 1`. 2: naikkan simpul yang lebih dalam sampai kedalamannya sama dengan yang lain. 3: `a * b` bisa meluap padahal KPK-nya masih muat; membagi dulu menjaga hasil antara kecil.

**Prediksi dulu.** 1: `2 -2 3`. 2: `-17 % 5` bernilai `-2`; menambah `5` memberi `3`, yang sudah di rentang `0` sampai `4`. `% 5` yang kedua diperlukan untuk bilangan positif: `x = 7` memberi `(2 + 5) % 5 = 2`, bukan `7`.

**Contoh setengah jadi.** Isi: `1`, `0`, dan `m`. Program lengkap:

```cpp
#include <iostream>
using namespace std;

long long pangkatMod(long long a, long long b, long long m) {
  long long hasil = 1 % m;
  a %= m;
  while (b > 0) {
    if (b % 2 == 1) {
      hasil = hasil * a % m;
    }
    a = a * a % m;
    b /= 2;
  }
  return hasil;
}

int main() {
  cout << pangkatMod(3, 5, 7) << " " << pangkatMod(2, 10, 1000) << " " << pangkatMod(9, 0, 1) << "\n";
}
```

Keluaran:

```text
5 24 0
```

**Soal Parsons.** Urutan: f, c, e, b, d, a, g. Baris f membuka `while`; baris c, e, dan b adalah `if` beserta isi dan kurung penutupnya; baris d dan a melanjutkan putaran; baris g menutup `while`. Kuadrat `a` dan pembagian dua `b` dilakukan di luar `if`, sebab terjadi pada tiap putaran.

**Latihan.** 1: pseudocode: `hasil = 1 % m; a = a % m; selama b > 0: bila b ganjil, hasil = hasil * a % m; a = a * a % m; b = b / 2`. Untuk `m = 1`, `1 % m = 0` sehingga semua hasil 0; `b = 0` memberi 1 (atau 0 bila `m = 1`). 2: awal `hasil = 1, a = 3, b = 5`. Putaran 1: `b` ganjil, `hasil = 3`; `a = 9 % 7 = 2`; `b = 2`. Putaran 2: `b` genap; `a = 4`; `b = 1`. Putaran 3: `b` ganjil, `hasil = 3 * 4 % 7 = 5`; `a = 16 % 7 = 2`; `b = 0`. Hasil 5 (cek: `243 = 34 * 7 + 5`). 3: hitung faktorial sekali, lalu tiap kueri dengan dua invers Fermat:

```cpp
#include <iostream>
#include <vector>
using namespace std;

const long long P = 1000000007;

long long pangkatMod(long long a, long long b) {
  long long hasil = 1;
  a %= P;
  while (b > 0) {
    if (b % 2 == 1) {
      hasil = hasil * a % P;
    }
    a = a * a % P;
    b /= 2;
  }
  return hasil;
}

int main() {
  int n;
  int q;
  cin >> n >> q;
  vector<long long> fakt(n + 1, 1);
  for (int i = 1; i <= n; i++) {
    fakt[i] = fakt[i - 1] * i % P;
  }
  for (int t = 0; t < q; t++) {
    int a;
    int k;
    cin >> a >> k;
    long long hasil = fakt[a] * pangkatMod(fakt[k], P - 2) % P * pangkatMod(fakt[a - k], P - 2) % P;
    cout << "C(" << a << ", " << k << ") = " << hasil << "\n";
  }
}
```

Masukan (`masukan.txt`):

```text
1000000 4
10 3
1000000 2
5 0
1000000 500000
```

Keluaran:

```text
C(10, 3) = 120
C(1000000, 2) = 999496507
C(5, 0) = 1
C(1000000, 500000) = 996692777
```

`C(10, 3) = 120` cocok dengan hitungan tangan, dan `k = 0` memberi 1. 4: program percobaan (banyak langkah `O(m^2)`):

```cpp
#include <iostream>
using namespace std;

int main() {
  int m;
  cin >> m;
  for (int a = 1; a < m; a++) {
    int inv = -1;
    for (int x = 1; x < m; x++) {
      if (a * x % m == 1 % m) {
        inv = x;
        break;
      }
    }
    if (inv == -1) {
      cout << a << ": tidak ada\n";
    } else {
      cout << a << ": " << inv << "\n";
    }
  }
}
```

Masukan (`masukan.txt`):

```text
12
```

Keluaran:

```text
1: 1
2: tidak ada
3: tidak ada
4: tidak ada
5: 5
6: tidak ada
7: 7
8: tidak ada
9: tidak ada
10: tidak ada
11: 11
```

Hanya `a` yang `FPB(a, 12) = 1` (yaitu 1, 5, 7, 11) punya invers; masing-masing kebetulan invers dirinya sendiri.

**Latihan bercampur.** 1: bila `FPB(a, m) = g > 1`, maka `a * x mod m` selalu kelipatan `g`, sehingga tak pernah 1; itulah yang tampak pada 2, 3, 4, 6, 8, 9, 10 untuk `m = 12`. 2: `long long`; satu faktor di bawah `10^9 + 7` dikali satu faktor lain tetap di bawah sekitar `10^18`, sedangkan tiga faktor mencapai sekitar `10^27`, jauh melewati `9,2 * 10^18`. 3: perulangan biasa `10^12` langkah (tidak layak); pemangkatan cepat 40 putaran.

**Pengayaan.** `7 * 7 = 49 = 4 * 12 + 1`. Untuk `6` modulo `9`: `FPB(6, 9) = 3`, sehingga `6 * x mod 9` hanya bisa 0, 3, atau 6, tak pernah 1.

## Langkah berikutnya

Modul berikutnya, `a-xii1-m9` (pohon Fenwick), memakai operasi bit dari `a-xi1-m3`; modul `a-xii1-m11` memakai `long long` secara hati-hati seperti di sini. Modul terkait: `matkom-bilangan-bertanda-dan-luapan`. Bacaan lanjut: halaman cppreference tentang operator aritmetika, yang memerinci tanda hasil `%`.
