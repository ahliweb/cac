## Untuk siapa modul ini

Modul ini untuk siswa SMA yang sudah menguasai dasar pemrograman C++17 (variabel, percabangan, perulangan, fungsi) dan ingin belajar rekursi. Isinya mengikuti rumpun materi "Rekursi" pada silabus pembinaan: konsep rekursi, fungsi atau prosedur rekursif, divide-and-conquer, dan backtracking. Topik ini muncul pada minggu 4 (rekursi dasar dan call stack), minggu 5 (divide-and-conquer) dan minggu 6 (complete search dengan pruning dan backtracking).

Setelah mempelajari modul ini, kamu diharapkan bisa menulis fungsi rekursif dengan kasus dasar yang benar, menelusuri call stack dengan tangan, memecah masalah menjadi submasalah yang lebih kecil (divide-and-conquer), dan menjelajahi semua kemungkinan dengan backtracking.

Cara memakai: baca penjelasan, ketik ulang setiap contoh, telusuri dengan kertas untuk masukan kecil, lalu kerjakan latihan. Contoh kode di modul ini hanya diperiksa bisa dikompilasi (C++17); itu tidak membuktikan contoh benar untuk semua masukan, jadi tetap uji sendiri.

## Konsep rekursi

Fungsi rekursif adalah fungsi yang memanggil dirinya sendiri untuk menyelesaikan versi masalah yang lebih kecil. Setiap fungsi rekursif membutuhkan dua bagian:

1. Kasus dasar (base case): kondisi yang diselesaikan langsung tanpa memanggil diri sendiri. Tanpa kasus dasar, pemanggilan tidak pernah berhenti.
2. Kasus rekursif: bagian yang memanggil diri sendiri dengan masukan yang lebih dekat ke kasus dasar.

Contoh klasik: faktorial. Untuk bilangan bulat n >= 0, n! = n x (n-1)! dan 0! = 1.

```cpp
#include <iostream>
using namespace std;

long long faktorial(int n) {
    if (n == 0) {
        return 1;                    // kasus dasar
    }
    return n * faktorial(n - 1);     // kasus rekursif
}

int main() {
    int n;
    cin >> n;
    cout << faktorial(n) << "\n";
    return 0;
}
```

Untuk masukan `5`, keluarannya `120`. Dengan `long long`, program ini masih benar sampai n = 20 (20! = 2432902008176640000); mulai n = 21 hasilnya melampaui batas `long long`.

## Call stack

Setiap pemanggilan fungsi menyimpan variabel lokal dan titik kembalinya pada call stack. Pemanggilan baru ditumpuk di atas, dan saat sebuah pemanggilan selesai ia dibuang dari puncak tumpukan.

Penelusuran `faktorial(3)`:

```
faktorial(3) menunggu 3 * faktorial(2)
  faktorial(2) menunggu 2 * faktorial(1)
    faktorial(1) menunggu 1 * faktorial(0)
      faktorial(0) mengembalikan 1
    faktorial(1) mengembalikan 1 * 1 = 1
  faktorial(2) mengembalikan 2 * 1 = 2
faktorial(3) mengembalikan 3 * 2 = 6
```

Dua akibat penting:

- Kedalaman rekursi dibatasi oleh ukuran stack. Rekursi yang sangat dalam (misalnya ratusan ribu tingkat) dapat menyebabkan program berhenti karena stack habis (stack overflow). Batas persisnya bergantung pada lingkungan dan ukuran frame fungsi, jadi cek batas soal sebelum memilih pendekatan rekursif.
- Urutan kerja berbeda bergantung pada letak pernyataan: yang ditulis sebelum pemanggilan rekursif dijalankan saat masuk, yang ditulis sesudahnya dijalankan saat kembali.

```cpp
#include <iostream>
using namespace std;

void turun(int n) {
    if (n == 0) {
        return;
    }
    cout << n << " ";      // dijalankan saat masuk
    turun(n - 1);
    cout << n << " ";      // dijalankan saat kembali
}

int main() {
    turun(3);
    cout << "\n";          // keluaran: 3 2 1 1 2 3
    return 0;
}
```

## Fungsi rekursif dan prosedur rekursif

Fungsi rekursif mengembalikan nilai (seperti `faktorial`); prosedur rekursif bertipe `void` dan bekerja lewat efek samping seperti mencetak (seperti `turun`). Pola yang membantu merancangnya:

1. Tentukan arti fungsi dengan kalimat jelas, misalnya "`jumlah(a, i)` adalah jumlah elemen `a[i]` sampai akhir array".
2. Tulis kasus dasar: masukan terkecil yang jawabannya langsung diketahui.
3. Percayai bahwa pemanggilan rekursif memberi jawaban yang benar untuk masukan yang lebih kecil, lalu gunakan jawaban itu untuk membangun jawaban masukan sekarang.

```cpp
#include <iostream>
using namespace std;

int jumlah(const int a[], int i, int n) {
    if (i == n) {
        return 0;                          // tidak ada elemen tersisa
    }
    return a[i] + jumlah(a, i + 1, n);     // elemen ini + jumlah sisanya
}

int main() {
    int a[5] = {4, 8, 15, 16, 23};
    cout << jumlah(a, 0, 5) << "\n";       // 66
    return 0;
}
```

Rekursi tidak selalu lebih baik dari perulangan. Fibonacci berikut benar tetapi sangat lambat, karena submasalah yang sama dihitung berulang kali.

```cpp
#include <iostream>
using namespace std;

int fib(int n) {
    if (n <= 1) {
        return n;
    }
    return fib(n - 1) + fib(n - 2);
}

int main() {
    int n;
    cin >> n;
    cout << fib(n) << "\n";
    return 0;
}
```

Banyaknya pemanggilan `fib(n)` bertambah secara eksponensial terhadap n. Untuk n = 5 saja ada 15 pemanggilan (hitung sendiri dengan pohon rekursi). Memperbaikinya dengan menyimpan hasil submasalah adalah topik memoization pada modul strategi problem solving (dynamic programming).

## Divide-and-conquer

Divide-and-conquer memecah masalah menjadi submasalah yang lebih kecil dengan bentuk sama, menyelesaikan masing-masing secara rekursif, lalu menggabungkan hasilnya. Tiga langkah: bagi (divide), selesaikan (conquer), gabungkan (combine).

Contoh sederhana: mencari nilai terbesar pada rentang `[l, r]` dengan membagi dua rentang.

```cpp
#include <iostream>
#include <algorithm>
using namespace std;

int terbesar(const int a[], int l, int r) {
    if (l == r) {
        return a[l];                         // satu elemen
    }
    int m = l + (r - l) / 2;
    int kiri = terbesar(a, l, m);            // selesaikan separuh kiri
    int kanan = terbesar(a, m + 1, r);       // selesaikan separuh kanan
    return max(kiri, kanan);                 // gabungkan
}

int main() {
    int a[6] = {3, 9, 2, 7, 5, 8};
    cout << terbesar(a, 0, 5) << "\n";       // 9
    return 0;
}
```

Contoh ini hanya untuk melihat polanya; perulangan biasa sama cepat dan lebih sederhana. Divide-and-conquer menjadi unggul bila langkah gabung murah dan pembagian menyeimbangkan ukuran, misalnya pada merge sort dan pangkat cepat.

Pangkat cepat menghitung a^n dengan memakai a^n = (a^(n/2))^2 bila n genap, dan a^n = a x a^(n-1) bila n ganjil. Karena eksponen kira-kira dibagi dua tiap dua langkah, jumlah perkalian sekitar O(log n), bukan n.

```cpp
#include <iostream>
using namespace std;

long long pangkat(long long a, int n) {
    if (n == 0) {
        return 1;
    }
    if (n % 2 == 0) {
        long long setengah = pangkat(a, n / 2);
        return setengah * setengah;
    }
    return a * pangkat(a, n - 1);
}

int main() {
    cout << pangkat(2, 10) << "\n";     // 1024
    cout << pangkat(3, 13) << "\n";     // 1594323
    return 0;
}
```

Perhatikan `setengah` disimpan dalam variabel. Menulis `pangkat(a, n / 2) * pangkat(a, n / 2)` memanggil fungsi dua kali dan menghilangkan keuntungan kecepatannya. Hasil juga tetap harus muat dalam `long long`.

Peran divide-and-conquer pada pengurutan (merge sort dan quicksort) dibahas pada modul search dan sort.

## Backtracking

Backtracking menjelajahi semua kemungkinan solusi dengan membangunnya selangkah demi selangkah. Pada setiap langkah kita memilih salah satu opsi, menelusuri lebih dalam secara rekursif, lalu membatalkan pilihan itu (backtrack) agar bisa mencoba opsi lain. Cabang yang pasti tidak menghasilkan solusi dihentikan lebih awal (pruning).

Contoh pertama: mencetak semua himpunan bagian dari {1, 2, ..., n}. Untuk tiap elemen ada dua pilihan: dipakai atau tidak.

```cpp
#include <iostream>
#include <vector>
using namespace std;

int n;
vector<int> terpilih;

void bagian(int i) {
    if (i > n) {
        for (int x : terpilih) {
            cout << x << " ";
        }
        cout << "\n";
        return;
    }
    terpilih.push_back(i);     // pilihan 1: pakai i
    bagian(i + 1);
    terpilih.pop_back();       // batalkan pilihan (backtrack)
    bagian(i + 1);             // pilihan 2: tidak pakai i
}

int main() {
    cin >> n;
    bagian(1);
    return 0;
}
```

Untuk `n = 3` program mencetak 8 baris (2^3 himpunan bagian), termasuk satu baris kosong untuk himpunan kosong. Baris pertama adalah `1 2 3` dan baris terakhir kosong.

Contoh kedua: semua permutasi dari 1..n dengan penanda elemen yang sudah dipakai.

```cpp
#include <iostream>
#include <vector>
using namespace std;

int n;
vector<int> susunan;
bool dipakai[10];

void permutasi() {
    if ((int)susunan.size() == n) {
        for (int x : susunan) {
            cout << x << " ";
        }
        cout << "\n";
        return;
    }
    for (int x = 1; x <= n; x++) {
        if (dipakai[x]) {
            continue;                  // pruning: x sudah dipakai
        }
        dipakai[x] = true;
        susunan.push_back(x);
        permutasi();
        susunan.pop_back();            // backtrack
        dipakai[x] = false;
    }
}

int main() {
    cin >> n;
    permutasi();
    return 0;
}
```

Untuk `n = 3`, keluarannya enam baris: `1 2 3`, `1 3 2`, `2 1 3`, `2 3 1`, `3 1 2`, `3 2 1`. Jumlah permutasi adalah n!, sehingga cara ini hanya praktis untuk n kecil (kira-kira sampai 10; 10! = 3.628.800).

Contoh ketiga: pruning yang lebih berarti, yaitu N-Queens. Letakkan n ratu pada papan n x n sehingga tidak ada dua ratu yang saling menyerang (baris, kolom, atau diagonal sama). Kita letakkan satu ratu per baris, dan memeriksa apakah kolom serta kedua diagonal masih bebas sebelum menelusuri lebih dalam.

```cpp
#include <iostream>
using namespace std;

int n;
bool kolom[20], diag1[40], diag2[40];

int hitung(int baris) {
    if (baris == n) {
        return 1;                               // semua ratu terpasang
    }
    int total = 0;
    for (int k = 0; k < n; k++) {
        if (kolom[k] || diag1[baris + k] || diag2[baris - k + n - 1]) {
            continue;                           // pruning: sudah diserang
        }
        kolom[k] = diag1[baris + k] = diag2[baris - k + n - 1] = true;
        total += hitung(baris + 1);
        kolom[k] = diag1[baris + k] = diag2[baris - k + n - 1] = false;   // backtrack
    }
    return total;
}

int main() {
    cin >> n;
    cout << hitung(0) << "\n";
    return 0;
}
```

Untuk `n = 4` jawabannya `2`, untuk `n = 6` jawabannya `4`, dan untuk `n = 8` jawabannya `92`. Tanpa pruning kita memeriksa semua penempatan; dengan pruning, banyak cabang dipotong sejak dini.

Kerangka umum backtracking:

1. Tentukan keadaan yang dibangun dan kapan ia lengkap (kasus dasar).
2. Untuk setiap opsi yang sah pada langkah ini: terapkan opsi, panggil rekursif, batalkan opsi.
3. Kembalikan semua perubahan keadaan secara tepat setelah pemanggilan rekursif; lupa membatalkan adalah sumber kesalahan paling umum.

Gagasan lebih lengkap tentang complete search dan pruning dibahas pada modul strategi problem solving.

## Kesalahan umum

- Lupa kasus dasar, atau kasus dasarnya tidak pernah tercapai karena masukan tidak mengecil.
- Kasus dasar tidak mencakup semua masukan terkecil (misalnya hanya `n == 1` padahal `n` bisa 0).
- Rekursi terlalu dalam sehingga stack habis.
- Memanggil fungsi rekursif dua kali untuk nilai yang sama (seperti `pangkat` di atas) sehingga lambat.
- Pada backtracking: lupa membatalkan pilihan sebelum mencoba opsi berikutnya, atau membatalkan tidak simetris dengan penerapannya.
- Mengabaikan overflow: `int` tidak cukup untuk faktorial dan pangkat.
- Menganggap rekursi selalu lebih cepat atau lebih lambat dari perulangan; yang menentukan adalah banyaknya pemanggilan, bukan gaya penulisannya.

## Latihan

Latihan di bawah dibuat khusus untuk modul ini. Kerjakan di komputer, lalu bandingkan dengan contoh masukan dan keluaran.

### Latihan 1: Jumlah digit rekursif

Masukan: satu bilangan bulat `N` (0 <= N <= 1.000.000.000). Cetak jumlah digit desimalnya, dihitung dengan fungsi rekursif (tanpa perulangan).

Contoh masukan: `90210`
Contoh keluaran: `12`

Petunjuk: jumlah digit N sama dengan `N % 10` ditambah jumlah digit `N / 10`. Kapan berhenti?

### Latihan 2: Palindrom

Masukan: satu kata huruf kecil dengan panjang paling banyak 1000. Cetak `YA` bila kata itu palindrom (terbaca sama dari depan dan belakang), selain itu `TIDAK`. Kerjakan secara rekursif dengan membandingkan karakter pertama dan terakhir lalu memeriksa bagian dalam.

Contoh masukan: `malam`
Contoh keluaran: `YA`

Contoh masukan: `kasur`
Contoh keluaran: `TIDAK`

Petunjuk: tulis fungsi `cek(s, i, j)`. Kasus dasar apa yang berlaku bila `i >= j`?

### Latihan 3: Pangkat

Masukan: dua bilangan bulat `A` dan `N` (1 <= A <= 10, 0 <= N <= 18). Cetak A^N dengan pangkat cepat rekursif.

Contoh masukan: `3 13`
Contoh keluaran: `1594323`

Petunjuk: pastikan memakai `long long`. Untuk `A = 10` dan `N = 18` hasilnya 10^18 dan masih muat.

### Latihan 4: Jumlah himpunan bagian

Masukan: baris pertama `N` dan `T` (1 <= N <= 20, 1 <= T <= 1000), baris kedua `N` bilangan bulat positif (masing-masing paling banyak 1000). Cetak banyaknya himpunan bagian (berdasarkan posisi elemen) yang jumlahnya tepat `T`.

Contoh masukan:
```
4 5
1 2 3 4
```
Contoh keluaran: `2`

Penjelasan contoh: himpunan bagian yang berjumlah 5 adalah {1, 4} dan {2, 3}.

Petunjuk: untuk tiap elemen ada dua pilihan, pakai atau tidak pakai. Karena semua bilangan positif, hentikan cabang yang jumlahnya sudah melebihi `T` (pruning).

### Latihan 5: Tanpa dua satu berurutan

Masukan: satu bilangan bulat `N` (1 <= N <= 30). Cetak banyaknya string biner (hanya karakter 0 dan 1) dengan panjang N yang tidak memuat dua karakter `1` bersebelahan.

Contoh masukan: `3`
Contoh keluaran: `5`

Penjelasan contoh: string yang sah adalah `000`, `001`, `010`, `100`, `101`.

Petunjuk: bangun string dari kiri ke kanan; karakter berikutnya boleh `1` hanya bila karakter sebelumnya `0`. Untuk `N = 4` jawabannya `8`.

### Latihan 6: Dry-run call stack

Tanpa menjalankan, tentukan keluaran program berikut untuk `f(3)`, dan gambar tumpukan pemanggilannya. Lalu jalankan untuk memeriksa.

```cpp
#include <iostream>
using namespace std;

int f(int n) {
    if (n == 0) {
        return 1;
    }
    cout << n << " ";
    int hasil = n * f(n - 1);
    cout << hasil << " ";
    return hasil;
}

int main() {
    f(3);
    cout << "\n";
    return 0;
}
```

## Cek mandiri

Setelah selesai, pastikan kamu bisa menjawab tanpa melihat catatan:

- Apa dua bagian yang wajib ada pada fungsi rekursif?
- Apa yang terjadi bila kasus dasar tidak pernah tercapai?
- Pada `turun(3)`, mengapa angka dicetak dua kali dengan urutan terbalik?
- Mengapa `fib` rekursif sederhana lambat, padahal benar?
- Apa tiga langkah divide-and-conquer?
- Pada backtracking, mengapa pilihan harus dibatalkan setelah pemanggilan rekursif?
- Apa itu pruning dan mengapa membuat N-Queens lebih cepat?

## Langkah berikutnya

Lanjutkan ke modul search dan sort (rekursi dipakai pada merge sort dan quicksort), lalu ke modul strategi problem solving (complete search dengan pruning dan dynamic programming). Untuk cakupan resmi dan silabus terbaru, rujuk halaman silabus OSN di bagian Rujukan. Untuk soal latihan tambahan, pilih soal dari arsip resmi lalu kerjakan sendiri; jangan menyalin soal ke dalam modul ini.
