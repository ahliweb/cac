## Untuk siapa modul ini

Modul ini untuk murid kelas XII jalur A (Algoritmik dengan C++), minggu `A-XII1-M6` silabus v1.4.1: aturan berhitung I. Prasyarat: modul `a-xii1-m5` (urutan modul; materi graf tidak dipakai di sini). `long long` dan perulangan dari `a-x1-m11` dan `a-x2-m4` dipakai.

Modul ini berstatus DRAF: karangan penyusun, belum ditinjau pemilik. Silabus tidak memetakan butir capaian pembelajaran untuk minggu ini, jadi modul ini tidak dihitung memenuhi butir CP apa pun. Keluarga materi OSN yang bertaut: `aturan-berhitung`, yang ditandai pengayaan (P) di jembatan OSN, sehingga kelas reguler boleh melewatinya. Modul tidak menjanjikan kedalaman soal OSN.

Tiap soal latihan bertanda `AI: boleh` atau `AI: tanpa AI`. Masukan program lewat berkas: `./program < masukan.txt`. Semua data karangan.

## Ingat kembali

Jawab dari ingatan dulu, baru cek kunci. Soal 1 dari `a-xii1-m5`, soal 2 dari `a-xii1-m3`, soal 3 dari `a-xi2-m12`, soal 4 dari `a-xi1-m4`.

1. Bagaimana menghitung kedalaman semua simpul pohon berakar dengan satu penelusuran dari akar?
2. Berapa sisi pohon rentang dari graf terhubung dengan `n` simpul?
3. Kapan rata-rata bergerak lebih cocok daripada garis kecenderungan, dan sebaliknya?
4. Berapa banyak permutasi `n` unsur, dan mengapa itu membatasi `n` pada pencarian lengkap?

## Tujuan

Setelah modul ini kamu dapat:

- memakai **aturan jumlah** dan **aturan kali** untuk menghitung banyaknya susunan;
- menghitung `n!`, permutasi `P(n, k)`, dan kombinasi `C(n, k)`, dan menyebut kapan urutan penting;
- menulis program menghitung dengan `long long` dan mengenali luapan (keluaran minggu ini: program menghitung);
- memeriksa rumus dengan menghitung langsung untuk `n` kecil.

## Prediksi dulu

Tugas baca-dan-prediksi, `AI: tanpa AI`. **Tebak dulu, tulis, baru jalankan.** Kode loker terdiri atas tiga huruf dari `A, B, C, D, E`. Program ini menghitung kode dengan tiga perulangan bersarang.

```cpp
#include <iostream>
using namespace std;

int main() {
  int ulang = 0;
  int tanpaUlang = 0;
  int himpunan = 0;
  for (int a = 0; a < 5; a++) {
    for (int b = 0; b < 5; b++) {
      for (int c = 0; c < 5; c++) {
        ulang++;
        if (a != b && b != c && a != c) {
          tanpaUlang++;
        }
        if (a < b && b < c) {
          himpunan++;
        }
      }
    }
  }
  cout << "boleh ulang: " << ulang << "\n";
  cout << "tanpa ulang, urutan penting: " << tanpaUlang << "\n";
  cout << "tanpa ulang, urutan tak penting: " << himpunan << "\n";
}
```

1. Berapa nilai `ulang`, `tanpaUlang`, dan `himpunan`?
2. Mengapa `himpunan` lebih kecil dari `tanpaUlang`, dan berapa kali lipat?

## Contoh terselesaikan

Keluaran program tadi:

```text
boleh ulang: 125
tanpa ulang, urutan penting: 60
tanpa ulang, urutan tak penting: 10
```

Dua aturan dasar. **Aturan jumlah:** bila suatu pekerjaan bisa dilakukan dengan satu dari dua cara yang tidak bisa dipakai bersamaan, dengan `a` dan `b` pilihan, banyak cara `a + b` (2 bus atau 3 kereta: 5 cara). **Aturan kali:** bila pekerjaan terdiri atas dua tahap berurutan, dengan `a` pilihan di tahap pertama dan `b` di tahap kedua, banyak cara `a * b` (3 makanan dan 2 minuman: 6 paket). Kode loker memakai aturan kali: `5 * 5 * 5 = 125` boleh ulang; tanpa ulang pilihan berkurang tiap tahap, `5 * 4 * 3 = 60`.

Susunan semua `n` unsur berbeda adalah **permutasi**, `n!` (`n` faktorial). Memilih `k` dari `n` dengan urutan penting adalah `P(n, k) = n * (n - 1) * ... * (n - k + 1)`. Bila urutan tak penting, tiap himpunan `k` unsur muncul `k!` kali sebagai susunan, sehingga **kombinasi** `C(n, k) = P(n, k) / k!`. Di sini `60 / 3! = 10`, sesuai keluaran.

Faktorial naik cepat. Program berikut mencetak `n!` sampai `long long` tidak muat:

```cpp
#include <climits>
#include <iostream>
using namespace std;

int main() {
  long long f = 1;
  for (int n = 0; n <= 21; n++) {
    if (n > 0) {
      if (f > LLONG_MAX / n) {
        cout << n << "! meluap dari long long\n";
        break;
      }
      f *= n;
    }
    cout << n << "! = " << f << "\n";
  }
}
```

Keluaran:

```text
0! = 1
1! = 1
2! = 2
3! = 6
4! = 24
5! = 120
6! = 720
7! = 5040
8! = 40320
9! = 362880
10! = 3628800
11! = 39916800
12! = 479001600
13! = 6227020800
14! = 87178291200
15! = 1307674368000
16! = 20922789888000
17! = 355687428096000
18! = 6402373705728000
19! = 121645100408832000
20! = 2432902008176640000
21! meluap dari long long
```

`12!` (sekitar `4,8 * 10^8`) muat di `int`, tetapi `13!` tidak (sekitar `6,2 * 10^9`, di atas batas `int` sekitar `2,1 * 10^9`); `long long` bertahan sampai `20!`, dan `21!` meluap. Karena itu `C(n, k)` tidak dihitung dari `n!` penuh. Program berikut mengalikan bertahap, `c = c * (n - k + i) / i`, dan setiap hasil antara adalah bilangan bulat (setelah `i` langkah nilainya `C(n - k + i, i)`):

```cpp
#include <iostream>
using namespace std;

int main() {
  int n, k;
  cin >> n >> k;
  long long p = 1;
  for (int i = 0; i < k; i++) {
    p *= n - i;
  }
  long long c = 1;
  for (int i = 1; i <= k; i++) {
    c = c * (n - k + i) / i;
  }
  cout << "P(" << n << ", " << k << ") = " << p << "\n";
  cout << "C(" << n << ", " << k << ") = " << c << "\n";
}
```

Masukan (`masukan.txt`):

```text
10 3
```

Keluaran:

```text
P(10, 3) = 720
C(10, 3) = 120
```

Hanya `k` langkah perkalian, `O(k)`, tanpa ada `n!` yang harus muat.

## Contoh setengah jadi

Lengkapi perulangan kombinasi `C(n, k)`: batas, selisih, dan pembagi.

```cpp setengah-jadi
long long c = 1;
for (int i = 1; i <= ____; i++) {
  c = c * (n - k + ____) / ____;
}
```

## Soal Parsons

Susun enam baris berikut (sudah diacak) menjadi program yang membaca `n` dan `k` dan mencetak `C(n, k)`. `AI: tanpa AI`.

```text
(a) cin >> n >> k;
(b) int n, k;
(c) for (int i = 1; i <= k; i++) {
(d)   c = c * (n - k + i) / i;
(e) }
(f) long long c = 1;
```

## Latihan

1. `AI: boleh` **Banyaknya susunan.** Rak berisi 6 buku berbeda. Berapa susunan seluruhnya, dan berapa bila dua buku tertentu harus bersebelahan? Tulis pseudocode atau rumusnya dulu.
2. `AI: boleh` **Pengurus.** Dari 8 orang, berapa cara memilih ketua, sekretaris, dan bendahara (orangnya berbeda), dan berapa cara memilih panitia 3 orang tanpa jabatan? Periksa dengan program.
3. `AI: tanpa AI` **Plat.** Kode terdiri atas dua huruf `A` sampai `Z` lalu tiga digit `0` sampai `9`, boleh berulang. Berapa kode berbeda?
4. `AI: boleh` **Luapan.** Cari `n` terbesar sehingga `n!` masih muat di `int` 32-bit dan di `long long`, dengan program.
5. *Opsional:* **catatan pemakaian AI.** Bila memakai AI generatif, jawab nomor 3 sendiri dulu, lalu minta penjelasan atau petunjuk bertahap, bukan program jadi. Catat alat, tujuan, garis besar perintah, bagian yang kamu pakai, dan cara memeriksanya. Jangan menaruh data pribadi atau tugas bernilai pada perintah.

## Latihan bercampur

1. `AI: boleh` Berapa langkah mencoba semua permutasi 11 unsur, dan layakkah dalam sekitar satu detik (modul `a-xi1-m4`)?
2. `AI: tanpa AI` Pohon pada modul sebelumnya punya 4 daun. Berapa pasang daun berbeda yang bisa dipilih sebagai kueri LCA (modul `a-xii1-m5`)?
3. `AI: boleh` Graf lengkap 4 simpul punya 6 sisi. Berapa himpunan 3 sisi, dan berapa di antaranya membentuk segitiga? Sisanya berapa pohon rentang (modul `a-xii1-m3`)?

## Pengayaan (P)

Boleh dilewati. **Bintang dan batang:** membagi `s` benda sama ke `r` anak, boleh 0, ada `C(s + r - 1, r - 1)` cara. Untuk 10 permen ke 3 anak, `C(12, 2) = 66`. Program berikut memeriksanya dengan menghitung langsung:

```cpp
#include <iostream>
using namespace std;

int main() {
  int cara = 0;
  for (int a = 0; a <= 10; a++) {
    for (int b = 0; b <= 10 - a; b++) {
      cara++;
    }
  }
  long long rumus = 12LL * 11 / 2;
  cout << "hitung langsung: " << cara << "\n";
  cout << "C(12, 2): " << rumus << "\n";
}
```

Keluaran:

```text
hitung langsung: 66
C(12, 2): 66
```

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `a-xii1-m7` (pertanyaan 1), sekitar tiga minggu lagi di `a-xii1-m9` (pertanyaan 2), dan sekitar delapan minggu lagi di `a-xii1-m14` (pertanyaan 3). Jawab sekarang lalu simpan.

1. Kapan dipakai aturan jumlah dan kapan aturan kali?
2. Berapa banyak susunan `k` dari `n` unsur berbeda bila urutan penting dan bila tidak?
3. Mengapa faktorial cepat meluap, dan mengapa `C(n, k)` tidak dihitung dari `n!` penuh?

## Kesalahan umum

- **Menjumlah tahap yang berurutan.** Tahap yang berurutan dikalikan; yang saling meniadakan dijumlahkan.
- **Memakai `P` untuk soal himpunan.** Bila urutan tak penting, bagi dengan `k!`.
- **Menghitung `C(n, k)` dari `n!` penuh.** `21!` sudah meluap di `long long`.
- **Membagi sebelum mengalikan.** Pembagian bulat dapat memotong hasil; kalikan dulu, baru bagi.
- **Lupa pilihan berkurang pada pengambilan tanpa pengembalian.** Tiap tahap tersisa satu pilihan lebih sedikit.

## Cek mandiri

- [ ] Saya dapat membedakan aturan jumlah dan aturan kali.
- [ ] Saya dapat menghitung `n!`, `P(n, k)`, dan `C(n, k)`.
- [ ] Saya dapat menyebut kapan urutan penting.
- [ ] Saya dapat mengenali batas `int` dan `long long` pada faktorial.
- [ ] Saya dapat memeriksa rumus dengan menghitung langsung untuk `n` kecil.

## Kunci dan petunjuk

**Ingat kembali.** 1: mulai dari akar dengan kedalaman 0; tiap anak berkedalaman induknya ditambah 1, dengan BFS atau DFS. 2: `n - 1` sisi. 3: rata-rata bergerak untuk data naik turun acak tanpa arah; garis kecenderungan untuk data yang bergerak searah. 4: `n!`; naik sangat cepat (10 unsur sudah 3.628.800), sehingga pencarian lengkap hanya untuk `n` kecil.

**Prediksi dulu.** 1: `125`, `60`, dan `10`. 2: karena himpunan tidak membedakan urutan: tiga huruf yang sama dapat disusun `3! = 6` cara, dan `60 / 6 = 10`.

**Contoh setengah jadi.** Isi: `k`, `i`, `i`. Program lengkap yang mencetak `C(n, k)` dengan mengambil `k` yang lebih kecil:

```cpp
#include <iostream>
using namespace std;

int main() {
  int n, k;
  cin >> n >> k;
  long long c = 1;
  if (k > n - k) {
    k = n - k;
  }
  for (int i = 1; i <= k; i++) {
    c = c * (n - k + i) / i;
  }
  cout << c << "\n";
}
```

Masukan (`masukan.txt`):

```text
30 27
```

Keluaran:

```text
4060
```

Memakai `C(n, k) = C(n, n - k)`, cukup 3 langkah, bukan 27.

**Soal Parsons.** Urutan benar: b, a, f, c, d, e (a dan b boleh bertukar, juga f dengan keduanya, asalkan semuanya sebelum perulangan c).

**Latihan.** 1: `6! = 720`; dua buku bersebelahan dianggap satu blok: `5!` susunan blok dikali 2 urutan dalam blok, `120 * 2 = 240`. 2: `P(8, 3) = 8 * 7 * 6 = 336`; `C(8, 3) = 336 / 6 = 56`. 3: `26 * 26 * 10 * 10 * 10 = 676.000`. 4: `12` untuk `int` dan `20` untuk `long long`, sesuai tabel faktorial.

**Latihan bercampur.** 1: `11! = 39.916.800` percobaan, kira-kira `4 * 10^7`; layak dalam sekitar satu detik bila tiap percobaan murah. 2: `C(4, 2) = 6` pasang. 3: `C(6, 3) = 20` himpunan; segitiga ada `C(4, 3) = 4` (tiap tiga simpul membentuk satu); sisanya `16` pohon rentang.

**Pengayaan (P).** Tidak ada kunci tunggal; pastikan hitungan langsung dan rumus memberi angka sama.

**Ulang berjarak.** 1: aturan jumlah bila dua cara saling meniadakan (pilih salah satu); aturan kali bila ada tahap berurutan yang semuanya harus dilakukan. 2: urutan penting `P(n, k) = n * (n - 1) * ... * (n - k + 1)`; urutan tak penting `C(n, k) = P(n, k) / k!`. 3: faktorial mengalikan bilangan yang terus membesar, sehingga `21!` sudah melampaui `long long`; `C(n, k)` dihitung dengan perkalian dan pembagian bertahap agar hasil antara tetap kecil.

## Langkah berikutnya

Modul berikut: `a-xii1-m7` (aturan berhitung II: segitiga Pascal dan inklusi-eksklusi). Bacaan lanjut: halaman cppreference tentang `std::next_permutation`.
