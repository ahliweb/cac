## Untuk siapa modul ini

Modul ini untuk murid kelas X jalur A (Algoritmik dengan C++), minggu `A-X2-M6` silabus v1.4.1: struktur data daftar (`vector`). Prasyarat: modul `a-x2-m5` (FPB, KPK, prima) dan `a-x2-m1` (array satu dimensi). Kamu tidak perlu pernah memprogram sebelum jalur ini.

Modul ini berstatus DRAF: karangan penyusun, belum ditinjau pemilik. Butir `E-BK-a` dan `E-BK-c` dipetakan silabus sebagai dipenuhi jalur ini; modul draf ini belum dihitung sebagai pemenuhan. Keluarga materi OSN yang bertaut: `struktur-data` (daftar sesuai CP, bukan pengayaan).

Bila kamu pernah memakai Python: `vector` mirip `list` tetapi semua elemennya bertipe sama, dan `v[i]` tidak mengecek batas. Tiap soal latihan bertanda `AI: boleh` atau `AI: tanpa AI`. Masukan program diberikan lewat berkas: `./program < masukan.txt`.

## Ingat kembali

Jawab dari ingatan dulu, baru cek di kunci. Soal 1 dari `a-x2-m5`, soal 2 dari `a-x2-m3`, soal 3 dari `a-x1-m12`.

1. Berapa FPB(48, 18), dan bagaimana KPK dihitung dari FPB?
2. Bagaimana menghitung jumlah tiap kolom sebuah tabel?
3. Sebutkan dua keuntungan memecah program menjadi fungsi.

## Tujuan

Setelah modul ini kamu dapat:

- membuat `vector`, menambah dan menghapus elemen, dan membaca ukurannya;
- membaca data sampai habis tanpa mengetahui banyaknya lebih dulu;
- menghitung frekuensi dengan `vector` sebagai penghitung;
- menjelaskan bahwa `vector` yang dikirim ke fungsi disalin kecuali parameternya `&`.

## Prediksi dulu

Ini tugas baca-dan-prediksi, `AI: tanpa AI`. **Tebak dulu, tulis jawabanmu, baru jalankan.**

```cpp
#include <iostream>
#include <vector>
using namespace std;

int main() {
  vector<int> v;
  v.push_back(5);
  v.push_back(8);
  v.push_back(2);
  cout << v.size() << " " << v[1] << " " << v.back() << "\n";
  v.pop_back();
  v[0] = v[0] + 1;
  int n = v.size();
  for (int i = 0; i < n; i++) {
    if (i > 0) {
      cout << " ";
    }
    cout << v[i];
  }
  cout << "\n";
}
```

1. Apa yang tercetak pada tiap baris?
2. Berapa ukuran `v` pada akhir program?

Simpan tebakanmu. Perbandingannya ada di bagian berikutnya.

## Contoh terselesaikan

Keluaran program tadi:

Keluaran:

```text
3 8 2
6 8
```

`vector<int> v;` membuat daftar kosong yang ukurannya berubah. `push_back(x)` menambah `x` di ujung, `pop_back()` membuang elemen ujung, `back()` membaca elemen ujung, `size()` memberi banyak elemen, dan `empty()` menyatakan apakah daftar kosong. Elemen diakses seperti array, `v[i]`, dengan indeks 0 sampai `size() - 1`. Setelah tiga penambahan, `v` berisi 5, 8, 2; `pop_back()` membuang 2; lalu elemen pertama menjadi 6.

Untuk menghapus elemen di tengah, `erase` memakai posisi, yaitu `v.begin() + i` untuk elemen berindeks `i`. `insert(posisi, nilai)` menyisipkan di depan posisi itu. Elemen sesudahnya bergeser. Program berikut membaca `n` bilangan, menghapus elemen berindeks `k`, lalu menyisipkan 99 di indeks 1.

```cpp
#include <iostream>
#include <vector>
using namespace std;

int main() {
  int n;
  cin >> n;
  vector<int> v;
  for (int i = 0; i < n; i++) {
    int x;
    cin >> x;
    v.push_back(x);
  }
  int k;
  cin >> k;
  v.erase(v.begin() + k);
  v.insert(v.begin() + 1, 99);
  int m = v.size();
  for (int i = 0; i < m; i++) {
    if (i > 0) {
      cout << " ";
    }
    cout << v[i];
  }
  cout << "\n";
  cout << "ukuran: " << m << "\n";
}
```

Masukan (`masukan.txt`):

```text
5
10 20 30 40 50
2
```

Keluaran:

```text
10 99 20 40 50
ukuran: 5
```

Setelah menghapus indeks 2 (nilai 30), isinya 10, 20, 40, 50; setelah penyisipan di indeks 1 menjadi 10, 99, 20, 40, 50. Karena `vector` bisa tumbuh, data dapat dibaca sampai habis tanpa mengetahui banyaknya: `while (cin >> x)` berhenti saat tidak ada lagi bilangan. Perulangan `for (int x : v)` menelusuri semua elemen tanpa indeks. Contoh berikut menghitung frekuensi nilai ujian sintetis 0 sampai 10 dengan `vector` penghitung: `frek[x]` menyimpan berapa kali nilai `x` muncul.

```cpp
#include <iostream>
#include <vector>
using namespace std;

int main() {
  vector<int> frek(11, 0);
  int x;
  while (cin >> x) {
    frek[x]++;
  }
  for (int nilai = 0; nilai <= 10; nilai++) {
    if (frek[nilai] > 0) {
      cout << nilai << " muncul " << frek[nilai] << " kali\n";
    }
  }
}
```

Masukan (`masukan.txt`):

```text
7 9 7 10 3 9 7 0
```

Keluaran:

```text
0 muncul 1 kali
3 muncul 1 kali
7 muncul 3 kali
9 muncul 2 kali
10 muncul 1 kali
```

`vector<int> frek(11, 0)` membuat 11 elemen yang semuanya 0. Berbeda dari array biasa, `vector` yang dikirim ke fungsi **disalin** seperti parameter lain, kecuali parameternya `&`:

```cpp
#include <iostream>
#include <vector>
using namespace std;

void tambahSalinan(vector<int> v) {
  v.push_back(99);
}

void tambahAsli(vector<int>& v) {
  v.push_back(99);
}

int main() {
  vector<int> a = {1, 2};
  tambahSalinan(a);
  cout << a.size() << "\n";
  tambahAsli(a);
  cout << a.size() << "\n";
}
```

Keluaran:

```text
2
3
```

## Contoh setengah jadi

Program yang membaca bilangan sampai habis dan mencetak banyak dan jumlahnya. Lengkapi bagian `____`.

```cpp setengah-jadi
#include <iostream>
#include <vector>
using namespace std;

int main() {
  vector<int> v;
  int x;
  while (cin >> ____) {
    v.____(x);
  }
  int n = v.____();
  long long jumlah = 0;
  for (int y : v) {
    jumlah += ____;
  }
  cout << "banyak = " << n << ", jumlah = " << jumlah << "\n";
}
```

## Soal Parsons

Susun baris-baris berikut (sudah diacak; indentasi ikut barisnya) menjadi badan `main` yang mencetak isi `v` dari belakang ke depan dengan membuang elemen ujungnya satu per satu. `AI: tanpa AI`: tujuannya melatih membaca urutan program.

```text
(a)     v.pop_back();
(b)   vector<int> v = {3, 1, 4};
(c)   }
(d)   while (!v.empty()) {
(e)     cout << v.back() << "\n";
```

## Latihan

1. `AI: boleh` **Pseudocode dulu.** Tulis pseudocode lalu program yang membaca bilangan sampai habis ke `vector`, lalu mencetak isi vector baru yang hanya memuat bilangan positif, dipisah spasi. Uji dengan 3 -1 4 0 -5 9.
2. `AI: tanpa AI` **Telusuri.** Tulis isi `v` setelah tiap operasi: `push_back(4)`, `push_back(7)`, `push_back(1)`, `pop_back()`, `v[0] = v[0] + v.back()`, `push_back(9)`, `v.erase(v.begin() + 1)`. Berapa ukuran akhirnya?
3. `AI: boleh` **Frekuensi huruf.** Baca satu kata huruf kecil dan cetak tiap huruf yang muncul beserta banyaknya, berurutan menurut abjad, misalnya `a 2`. Pakai `vector<int> frek(26, 0)` dan `c - 'a'`. Uji dengan `algoritma`.
4. `AI: boleh` **Sisip terurut.** Baca `n`, lalu `n` bilangan yang sudah terurut menaik, lalu `x`. Sisipkan `x` pada tempat yang menjaga urutan, dan cetak hasilnya. Uji dengan 4 bilangan 2 5 8 11 dan `x = 6`.
5. *Opsional:* **catatan pemakaian AI.** Bila memakai AI generatif, jawab nomor 1 sendiri dulu, lalu minta penjelasan atau petunjuk bertahap, bukan program jadi. Catat alatnya, tujuanmu, garis besar perintahmu, bagian yang kamu pakai, dan caramu memeriksanya (jalankan atau telusuri). Jangan menaruh data pribadi atau tugas bernilai pada perintah.

## Latihan bercampur

1. Tulis ulang pembalikan array dari modul `a-x2-m1` memakai `vector`, dengan fungsi `void balik(vector<int>& v)`.
2. Baca kata-kata sampai habis ke `vector<string>`, lalu cetak banyak kata dan kata terpanjang (modul `a-x2-m2`).
3. Simpan semua faktor prima 360 di `vector` (faktor yang berulang ikut disimpan), lalu cetak banyaknya (modul `a-x2-m5`).

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `a-x2-m7` (pertanyaan 1), sekitar tiga minggu lagi di `a-x2-m9` (pertanyaan 2), dan sekitar delapan minggu lagi di `a-x2-m14` (pertanyaan 3). Jawab sekarang lalu simpan.

1. Apa yang dilakukan `push_back` dan `pop_back`?
2. Bagaimana menghapus elemen berindeks `i` dari sebuah `vector`?
3. Apa keuntungan `vector` dibanding array biasa, dan apa yang tetap harus kamu jaga?

## Kesalahan umum

- **Mengisi `v[i]` pada vector yang belum punya elemen ke-`i`.** `vector<int> v; v[0] = 5;` bukan menambah elemen; itu mengakses di luar batas. Pakai `push_back`, atau buat ukuran awal dengan `vector<int> v(n)`.
- **Mengira `v[i]` mengecek batas.** Indeks di luar `0` sampai `size() - 1` tidak ditolak; hasilnya tidak terdefinisi, seperti pada array.
- **Membandingkan `int i` dengan `v.size()`.** Ukuran bertipe tak bertanda; kompilator memperingatkan. Simpan `int n = v.size();` lalu bandingkan dengan `n`.
- **Memanggil `back()` atau `pop_back()` pada vector kosong.** Periksa `empty()` lebih dulu.
- **Menghapus elemen sambil menelusuri dengan indeks.** Setelah `erase`, elemen berikutnya bergeser ke indeks yang sama dan terlewat; jangan menaikkan `i` pada putaran itu, atau bangun vector baru.

## Cek mandiri

- [ ] Saya dapat menambah dan menghapus elemen `vector`.
- [ ] Saya dapat membaca data sampai habis ke `vector`.
- [ ] Saya dapat menghitung frekuensi dengan `vector` penghitung.
- [ ] Saya dapat menjelaskan kapan `vector` perlu dikirim dengan `&`.
- [ ] Saya menulis pseudocode sebelum programnya.

## Kunci dan petunjuk

**Ingat kembali.** 1: FPB(48, 18) = 6; KPK = `a / FPB * b` = 144. 2: perulangan luar menelusuri kolom, perulangan dalam menelusuri baris, dan menjumlahkan `m[i][j]`. 3: contoh: tiap bagian bisa diuji sendiri dan dipakai ulang; program lebih mudah dibaca.

**Prediksi dulu.** 1: `3 8 2`, `6 8`. 2: 2 elemen (5 menjadi 6, 8 tetap, 2 dibuang).

**Contoh setengah jadi.** Isi: `x`, `push_back`, `size`, `y`. Program lengkapnya:

```cpp
#include <iostream>
#include <vector>
using namespace std;

int main() {
  vector<int> v;
  int x;
  while (cin >> x) {
    v.push_back(x);
  }
  int n = v.size();
  long long jumlah = 0;
  for (int y : v) {
    jumlah += y;
  }
  cout << "banyak = " << n << ", jumlah = " << jumlah << "\n";
}
```

Masukan (`masukan.txt`):

```text
3 8 12 5 7
```

Keluaran:

```text
banyak = 5, jumlah = 35
```

**Soal Parsons.** Urutan benar: b, d, e, a, c; hasilnya 4, 1, 3 (satu per baris). `}` menutup `while` dan harus sesudah `pop_back()`.

**Latihan.** 1: pseudocode: baca bilangan sampai habis ke v; hasil <- kosong; untuk tiap x di v: bila x > 0, tambahkan x ke hasil; cetak hasil. Program contoh:

```cpp
#include <iostream>
#include <vector>
using namespace std;

int main() {
  vector<int> v;
  vector<int> hasil;
  int x;
  while (cin >> x) {
    v.push_back(x);
  }
  for (int y : v) {
    if (y > 0) {
      hasil.push_back(y);
    }
  }
  int n = hasil.size();
  for (int i = 0; i < n; i++) {
    if (i > 0) {
      cout << " ";
    }
    cout << hasil[i];
  }
  cout << "\n";
}
```

Masukan (`masukan.txt`):

```text
3 -1 4 0 -5 9
```

Keluaran:

```text
3 4 9
```

2: (4); (4, 7); (4, 7, 1); `pop_back` membuang 1 menjadi (4, 7); `v[0] = 4 + 7` menjadi (11, 7); `push_back(9)` menjadi (11, 7, 9); `erase` indeks 1 menjadi (11, 9). Ukuran akhir 2. 3: program contoh:

```cpp
#include <iostream>
#include <string>
#include <vector>
using namespace std;

int main() {
  string s;
  cin >> s;
  vector<int> frek(26, 0);
  int n = s.size();
  for (int i = 0; i < n; i++) {
    frek[s[i] - 'a']++;
  }
  for (int h = 0; h < 26; h++) {
    if (frek[h] > 0) {
      cout << static_cast<char>('a' + h) << " " << frek[h] << "\n";
    }
  }
}
```

Masukan (`masukan.txt`):

```text
algoritma
```

Keluaran:

```text
a 2
g 1
i 1
l 1
m 1
o 1
r 1
t 1
```

4: cari indeks pertama `i` dengan `v[i] > x`, lalu `insert` di posisi itu (bila tidak ada, `push_back`). Program contoh:

```cpp
#include <iostream>
#include <vector>
using namespace std;

int main() {
  int n;
  cin >> n;
  vector<int> v;
  for (int i = 0; i < n; i++) {
    int y;
    cin >> y;
    v.push_back(y);
  }
  int x;
  cin >> x;
  int posisi = n;
  for (int i = 0; i < n; i++) {
    if (v[i] > x) {
      posisi = i;
      break;
    }
  }
  v.insert(v.begin() + posisi, x);
  int m = v.size();
  for (int i = 0; i < m; i++) {
    if (i > 0) {
      cout << " ";
    }
    cout << v[i];
  }
  cout << "\n";
}
```

Masukan (`masukan.txt`):

```text
4
2 5 8 11
6
```

Keluaran:

```text
2 5 6 8 11
```

**Latihan bercampur.** 1: `void balik(vector<int>& v) { int n = v.size(); for (int i = 0; i < n / 2; i++) { int t = v[i]; v[i] = v[n - 1 - i]; v[n - 1 - i] = t; } }`; tanpa `&`, yang terbalik hanya salinan. 2: `while (cin >> kata) { daftar.push_back(kata); }`, lalu telusuri untuk panjang terbesar. 3: lakukan faktorisasi seperti pada `a-x2-m5`, tetapi `push_back(i)` menggantikan pencetakan; faktor 360 adalah 2, 2, 2, 3, 3, 5 sehingga banyaknya 6.

**Ulang berjarak.** 1: `push_back` menambah elemen di ujung; `pop_back` membuang elemen di ujung. 2: `v.erase(v.begin() + i)`. 3: ukurannya berubah sesuai kebutuhan dan menyimpan ukurannya sendiri; yang tetap dijaga: indeks harus di antara 0 dan `size() - 1`, dan jangan mengakses vector kosong.

## Langkah berikutnya

Modul berikut: `a-x2-m7` (tumpukan dan antrian), dua cara membatasi akses ke daftar. Bacaan lanjut: halaman cppreference tentang `std::vector`.
