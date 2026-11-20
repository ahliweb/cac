## Untuk siapa modul ini

Modul ini untuk murid kelas X jalur A (Algoritmik dengan C++), minggu `A-X2-M5` silabus v1.4.1: FPB, KPK, dan bilangan prima. Prasyarat: modul `a-x2-m4` (galat dan aritmetika dasar). Kamu tidak perlu pernah memprogram sebelum jalur ini.

Modul ini karangan penyusun dan disetujui pemilik program pada 2026-11-20 (keputusan lewat dialog; catatan tinjauan menjadi tindak lanjut revisi). Silabus tidak memetakan butir capaian pembelajaran untuk minggu ini, jadi modul ini tidak dihitung memenuhi butir CP apa pun. Keluarga materi OSN yang bertaut: `aritmetika` (FPB, KPK, dan prima sesuai CP, bukan pengayaan; aritmetika modular adalah pengayaan di kelas XII).

Tiap soal latihan bertanda `AI: boleh` atau `AI: tanpa AI`. Masukan program diberikan lewat berkas: `./program < masukan.txt`.

## Ingat kembali

Jawab dari ingatan dulu, baru cek di kunci. Soal 1 dari `a-x2-m4`, soal 2 dari `a-x2-m2`, soal 3 dari `a-x1-m11`.

1. Sebutkan dua cara menemukan galat dengan mencetak nilai dan uji kecil.
2. Bagaimana mengubah karakter digit `'7'` menjadi bilangan 7?
3. Mengapa uji prima cukup memeriksa pembagi sampai `i * i <= n`?

## Tujuan

Setelah modul ini kamu dapat:

- menghitung FPB dengan algoritma Euclid dan KPK dari FPB;
- menguraikan bilangan menjadi faktor prima;
- membuat daftar bilangan prima dengan saringan sederhana;
- membandingkan dua cara menguji bilangan prima dengan menghitung langkahnya.

## Prediksi dulu

Ini tugas baca-dan-prediksi, `AI: tanpa AI`. **Tebak dulu, tulis jawabanmu, baru jalankan.**

```cpp
#include <iostream>
using namespace std;

int fpb(int a, int b) {
  while (b != 0) {
    int sisa = a % b;
    a = b;
    b = sisa;
  }
  return a;
}

int main() {
  cout << fpb(48, 18) << "\n";
  cout << fpb(17, 5) << "\n";
  cout << 48 / fpb(48, 18) * 18 << "\n";
}
```

1. Apa yang tercetak pada tiap baris?
2. Baris ketiga menghitung apa, dan mengapa dibagi dulu sebelum dikali?

Simpan tebakanmu. Perbandingannya ada di bagian berikutnya.

## Contoh terselesaikan

Keluaran program tadi:

Keluaran:

```text
6
1
144
```

FPB(48, 18) = 6. FPB(17, 5) = 1: kedua bilangan tidak punya faktor persekutuan selain 1 (disebut saling prima). Baris ketiga menghitung KPK(48, 18) = 144 dengan rumus `a / FPB * b`: perkalian `a * b` mengandung FPB dua kali, jadi dibagi FPB satu kali. Membagi lebih dulu menjaga hasil antara tetap kecil. Program berikut memakai `long long` karena KPK bisa jauh lebih besar dari kedua bilangan; pada 4.000.000.000 dan 6.000.000.000, `a * b` bernilai 2,4 x 10^19 dan melewati batas `long long`, sedangkan `a / FPB * b` hanya 12.000.000.000.

```cpp
#include <iostream>
using namespace std;

long long fpb(long long a, long long b) {
  while (b != 0) {
    long long sisa = a % b;
    a = b;
    b = sisa;
  }
  return a;
}

long long kpk(long long a, long long b) {
  return a / fpb(a, b) * b;
}

int main() {
  long long a, b;
  cin >> a >> b;
  cout << "FPB = " << fpb(a, b) << "\n";
  cout << "KPK = " << kpk(a, b) << "\n";
}
```

Masukan (`masukan.txt`):

```text
4000000000 6000000000
```

Keluaran:

```text
FPB = 2000000000
KPK = 12000000000
```

Bilangan prima adalah bilangan yang lebih besar dari 1 dan hanya habis dibagi 1 dan dirinya sendiri; angka 1 bukan prima. **Faktorisasi prima** menguraikan bilangan menjadi perkalian bilangan prima. Cara sederhana: bagi `n` dengan 2 selama habis, lalu dengan 3, dan seterusnya; yang tersisa di akhir, bila lebih dari 1, juga prima.

```cpp
#include <iostream>
using namespace std;

int main() {
  int n;
  cin >> n;
  bool awal = true;
  for (int i = 2; i * i <= n; i++) {
    while (n % i == 0) {
      if (!awal) {
        cout << " ";
      }
      cout << i;
      awal = false;
      n = n / i;
    }
  }
  if (n > 1) {
    if (!awal) {
      cout << " ";
    }
    cout << n;
  }
  cout << "\n";
}
```

Masukan (`masukan.txt`):

```text
360
```

Keluaran:

```text
2 2 2 3 3 5
```

Berapa langkah yang dihemat dengan batas `i * i <= n`? Program ini menghitung banyak pemeriksaan pada dua cara uji prima untuk 9973. Parameter `langkah` bertanda `&` agar hitungannya sampai ke `main`.

```cpp
#include <iostream>
using namespace std;

bool primaPelan(int n, int& langkah) {
  if (n < 2) {
    return false;
  }
  for (int i = 2; i < n; i++) {
    langkah++;
    if (n % i == 0) {
      return false;
    }
  }
  return true;
}

bool primaCepat(int n, int& langkah) {
  if (n < 2) {
    return false;
  }
  for (int i = 2; i * i <= n; i++) {
    langkah++;
    if (n % i == 0) {
      return false;
    }
  }
  return true;
}

int main() {
  int n = 9973;
  int a = 0;
  int b = 0;
  bool p1 = primaPelan(n, a);
  bool p2 = primaCepat(n, b);
  cout << "pelan: " << (p1 ? "prima" : "bukan") << ", " << a << " langkah\n";
  cout << "cepat: " << (p2 ? "prima" : "bukan") << ", " << b << " langkah\n";
}
```

Keluaran:

```text
pelan: prima, 9971 langkah
cepat: prima, 98 langkah
```

Cara pertama memeriksa semua pembagi sampai `n - 1`, jadi langkahnya naik secara linear: bila `n` menjadi 100 kali lebih besar, langkahnya sekitar 100 kali lebih banyak. Cara kedua hanya naik sekitar 10 kali untuk `n` yang 100 kali lebih besar.

**Saringan sederhana** mendaftar semua prima sampai batas tertentu: tandai semua bilangan dari 2 sebagai prima, lalu untuk tiap bilangan prima `i`, coret kelipatannya mulai dari `i * i` (kelipatan yang lebih kecil sudah dicoret oleh prima yang lebih kecil).

```cpp
#include <iostream>
using namespace std;

int main() {
  bool prima[51];
  for (int i = 2; i <= 50; i++) {
    prima[i] = true;
  }
  for (int i = 2; i * i <= 50; i++) {
    if (prima[i]) {
      for (int j = i * i; j <= 50; j += i) {
        prima[j] = false;
      }
    }
  }
  bool awal = true;
  for (int i = 2; i <= 50; i++) {
    if (prima[i]) {
      if (!awal) {
        cout << " ";
      }
      cout << i;
      awal = false;
    }
  }
  cout << "\n";
}
```

Keluaran:

```text
2 3 5 7 11 13 17 19 23 29 31 37 41 43 47
```

## Contoh setengah jadi

Saringan yang menghitung banyak bilangan prima sampai 30. Lengkapi bagian `____`.

```cpp setengah-jadi
#include <iostream>
using namespace std;

int main() {
  bool prima[31];
  for (int i = 2; i <= 30; i++) {
    prima[i] = ____;
  }
  for (int i = 2; i * i <= ____; i++) {
    if (prima[i]) {
      for (int j = ____; j <= 30; j += ____) {
        prima[j] = false;
      }
    }
  }
  int banyak = 0;
  for (int i = 2; i <= 30; i++) {
    if (prima[i]) {
      banyak++;
    }
  }
  cout << banyak << "\n";
}
```

## Soal Parsons

Susun baris-baris berikut (sudah diacak; indentasi ikut barisnya) menjadi badan `main` yang mencetak faktor prima 12, satu per baris. `AI: tanpa AI`: tujuannya melatih membaca urutan program.

```text
(a)       n = n / i;
(b)   while (n > 1) {
(c)     }
(d)   int n = 12;
(e)       i++;
(f)       cout << i << "\n";
(g)   }
(h)   int i = 2;
(i)     } else {
(j)     if (n % i == 0) {
```

## Latihan

1. `AI: boleh` **Pseudocode dulu.** Tulis pseudocode lalu program yang membaca `n` dan mencetak banyak pembagi positifnya. Uji dengan 36.
2. `AI: tanpa AI` **Telusuri.** Buat tabel penelusuran program Parsons untuk `n = 252` (kolom `n`, `i`, dan faktor yang tercetak). Faktor apa saja yang tercetak, dan berapa kali `i` bertambah?
3. `AI: boleh` **KPK tiga bilangan.** Baca tiga bilangan dan cetak KPK-nya dengan `kpk(kpk(a, b), c)`. Uji dengan 4, 6, dan 10.
4. `AI: boleh` **Prima kembar.** Dengan saringan, cetak semua pasangan prima yang berselisih 2 sampai 50, satu pasangan per baris, misalnya `3 5`.
5. *Opsional:* **catatan pemakaian AI.** Bila memakai AI generatif, jawab nomor 1 sendiri dulu, lalu minta penjelasan atau petunjuk bertahap, bukan program jadi. Catat alatnya, tujuanmu, garis besar perintahmu, bagian yang kamu pakai, dan caramu memeriksanya (jalankan atau telusuri). Jangan menaruh data pribadi atau tugas bernilai pada perintah.

## Latihan bercampur

1. Baca `n` bilangan ke array dan cetak FPB seluruhnya. Uji dengan 12, 18, dan 30 (modul `a-x2-m1`).
2. Baca satu kata dan cetak `ya` bila panjangnya bilangan prima (modul `a-x2-m2`).
3. Bilangan sempurna sama dengan jumlah pembagi positifnya selain dirinya sendiri (misalnya 6 = 1 + 2 + 3). Cetak semua bilangan sempurna sampai 500. Tulis dulu satu uji kecil yang kamu hitung tangan (modul `a-x2-m4`).

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `a-x2-m6` (pertanyaan 1), sekitar tiga minggu lagi di `a-x2-m8` (pertanyaan 2), dan sekitar delapan minggu lagi di `a-x2-m13` (pertanyaan 3). Jawab sekarang lalu simpan.

1. Berapa FPB(48, 18), dan bagaimana KPK dihitung dari FPB?
2. Apa yang dilakukan saringan terhadap kelipatan sebuah bilangan prima?
3. Mengapa KPK sebaiknya dihitung `a / fpb(a, b) * b`, bukan `a * b / fpb(a, b)`?

## Kesalahan umum

- **Menganggap 1 prima.** Prima harus lebih besar dari 1; uji prima mengembalikan `false` untuk `n < 2`.
- **Memeriksa pembagi sampai `n` itu sendiri.** Perulangan `i <= n` selalu menemukan `n % n == 0`, sehingga semua bilangan dianggap bukan prima.
- **Lupa faktor prima terakhir.** Pada 14, perulangan berhenti setelah membagi 2 dan menyisakan 7; tanpa `if (n > 1)` di akhir, faktor 7 hilang.
- **`i * i` melewati batas `int`.** Untuk `n` mendekati 2 miliar, `i * i` bisa meluap; pakai `long long`.
- **Menghitung KPK dengan `a * b / fpb`.** Hasil kali bisa meluap walau KPK-nya masih muat; bagi lebih dulu.

## Cek mandiri

- [ ] Saya dapat menghitung FPB dengan algoritma Euclid dan KPK dari FPB.
- [ ] Saya dapat menguraikan bilangan menjadi faktor prima.
- [ ] Saya dapat menjelaskan mengapa uji prima berhenti di `i * i <= n`.
- [ ] Saya dapat menulis saringan sederhana.
- [ ] Saya menulis pseudocode sebelum programnya.

## Kunci dan petunjuk

**Ingat kembali.** 1: contoh: mencetak nilai variabel di tempat yang dicurigai, dan menjalankan program dengan masukan kecil yang jawabannya dihitung tangan. 2: `'7' - '0'` bernilai 7. 3: bila `n = a * b` dengan `a <= b`, maka `a <= sqrt(n)`; jadi bila `n` punya pembagi selain 1 dan dirinya, ada satu yang tidak lebih dari akar `n`, dan syarat `i * i <= n` cukup.

**Prediksi dulu.** 1: `6`, `1`, `144`. 2: KPK(48, 18); dibagi dulu agar angka antara tetap kecil.

**Contoh setengah jadi.** Isi: `true`, `30`, `i * i`, `i`. Program lengkapnya:

```cpp
#include <iostream>
using namespace std;

int main() {
  bool prima[31];
  for (int i = 2; i <= 30; i++) {
    prima[i] = true;
  }
  for (int i = 2; i * i <= 30; i++) {
    if (prima[i]) {
      for (int j = i * i; j <= 30; j += i) {
        prima[j] = false;
      }
    }
  }
  int banyak = 0;
  for (int i = 2; i <= 30; i++) {
    if (prima[i]) {
      banyak++;
    }
  }
  cout << banyak << "\n";
}
```

Keluaran:

```text
10
```

**Soal Parsons.** Urutan benar: d, h, b, j, f, a, i, e, c, g. Baris (c) menutup `else` dan (g) menutup `while`, jadi tidak boleh bertukar. Faktor yang tercetak: 2, 2, 3.

**Latihan.** 1: pseudocode: baca n; banyak <- 0; untuk i dari 1 sampai n: bila n habis dibagi i, tambah banyak; cetak banyak. Program contoh:

```cpp
#include <iostream>
using namespace std;

int main() {
  int n;
  cin >> n;
  int banyak = 0;
  for (int i = 1; i <= n; i++) {
    if (n % i == 0) {
      banyak++;
    }
  }
  cout << banyak << "\n";
}
```

Masukan (`masukan.txt`):

```text
36
```

Keluaran:

```text
9
```

2: awal `n = 252`, `i = 2`. (252, 2): tercetak 2, n = 126. (126, 2): tercetak 2, n = 63. (63, 2): tidak habis, i = 3. (63, 3): tercetak 3, n = 21. (21, 3): tercetak 3, n = 7. (7, 3): tidak habis, i = 4. (7, 4): i = 5. (7, 5): i = 6. (7, 6): i = 7. (7, 7): tercetak 7, n = 1; berhenti. Tercetak 2, 2, 3, 3, 7; `i` bertambah 5 kali (dari 2 ke 7). 3: program contoh:

```cpp
#include <iostream>
using namespace std;

long long fpb(long long a, long long b) {
  while (b != 0) {
    long long sisa = a % b;
    a = b;
    b = sisa;
  }
  return a;
}

long long kpk(long long a, long long b) {
  return a / fpb(a, b) * b;
}

int main() {
  long long a, b, c;
  cin >> a >> b >> c;
  cout << kpk(kpk(a, b), c) << "\n";
}
```

Masukan (`masukan.txt`):

```text
4 6 10
```

Keluaran:

```text
60
```

4: program contoh:

```cpp
#include <iostream>
using namespace std;

int main() {
  bool prima[51];
  for (int i = 2; i <= 50; i++) {
    prima[i] = true;
  }
  for (int i = 2; i * i <= 50; i++) {
    if (prima[i]) {
      for (int j = i * i; j <= 50; j += i) {
        prima[j] = false;
      }
    }
  }
  for (int i = 2; i + 2 <= 50; i++) {
    if (prima[i] && prima[i + 2]) {
      cout << i << " " << i + 2 << "\n";
    }
  }
}
```

Keluaran:

```text
3 5
5 7
11 13
17 19
29 31
41 43
```

**Latihan bercampur.** 1: `g = a[0]; for (int i = 1; i < n; i++) { g = fpb(g, a[i]); }`; hasilnya 6. 2: panjang kata `kata.size()` diuji dengan fungsi `prima`; kata `kode` (4) tidak, `belajar` (7) ya. 3: `for (int i = 1; i <= 500; i++)`, jumlahkan pembagi `d` dari 1 sampai `i - 1` yang habis membagi `i`, cetak `i` bila jumlahnya sama dengan `i`; hasilnya 6, 28, 496. Uji tangan: pembagi 28 selain dirinya adalah 1, 2, 4, 7, 14, jumlahnya 28.

**Ulang berjarak.** 1: FPB(48, 18) = 6; KPK = `a / FPB * b` = 144. 2: mencoret (menandai bukan prima) kelipatan prima itu. 3: karena `a * b` bisa melewati batas tipe walau hasil KPK masih muat; membagi lebih dulu menjaga hasil antara kecil.

## Langkah berikutnya

Modul berikut: `a-x2-m6` (struktur data `vector`), yang menyimpan data dengan ukuran yang berubah, misalnya daftar faktor yang belum diketahui banyaknya. Modul terkait: `matkom-sistem-bilangan-basis` sebagai bacaan pendamping tentang bilangan. Bacaan lanjut: halaman cppreference tentang `std::gcd` dan `std::lcm` (tersedia sejak C++17).
