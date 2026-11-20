## Untuk siapa modul ini

Modul ini untuk murid kelas XII jalur A (Algoritmik dengan C++), minggu `A-XII1-M7` silabus v1.4.1: aturan berhitung II. Prasyarat: modul `a-xii1-m6` (permutasi dan kombinasi); array dua dimensi dari `a-x2-m3` dipakai di sini.

Modul ini karangan penyusun dan disetujui pemilik program pada 2026-11-20 (keputusan lewat dialog; catatan tinjauan menjadi tindak lanjut revisi). Silabus tidak memetakan butir capaian pembelajaran untuk minggu ini, jadi modul ini tidak dihitung memenuhi butir CP apa pun. Keluarga materi OSN yang bertaut: `aturan-berhitung`, yang ditandai pengayaan (P) di jembatan OSN, sehingga kelas reguler boleh melewatinya. Modul tidak menjanjikan kedalaman soal OSN.

Tiap soal latihan bertanda `AI: boleh` atau `AI: tanpa AI`. Masukan program lewat berkas: `./program < masukan.txt`. Semua data karangan.

## Ingat kembali

Jawab dari ingatan dulu, baru cek kunci. Soal 1 dari `a-xii1-m6`, soal 2 dari `a-xii1-m4`, soal 3 dari `a-xi2-m13`, soal 4 dari `a-xi2-m1`.

1. Kapan dipakai aturan jumlah dan kapan aturan kali?
2. Mengapa `gabung` harus menyambung akar, bukan simpul sembarang?
3. Apa saja isi laporan analisis data yang lengkap?
4. Apa dua ciri masalah yang cocok diselesaikan dengan DP?

## Tujuan

Setelah modul ini kamu dapat:

- membangun **segitiga Pascal** dengan rumus peralihan dan menjawab `C(n, k)` dari tabelnya (keluaran minggu ini: program binomial);
- menjelaskan mengapa `C(n, k) = C(n - 1, k - 1) + C(n - 1, k)`;
- memakai **inklusi-eksklusi** untuk dua dan tiga himpunan;
- memeriksa hasil dengan menghitung langsung dan menyebut batas luapan tabel.

## Prediksi dulu

Tugas baca-dan-prediksi, `AI: tanpa AI`. **Tebak dulu, tulis, baru jalankan.** Dua baris segitiga Pascal, tiap angka adalah jumlah dua angka di atasnya:

```text
baris 3: 1 3 3 1
baris 4: 1 4 6 4 1
```

1. Tulis baris 5 dan baris 6. Berapa `C(6, 3)`?
2. Berapa bilangan dari 1 sampai 30 yang habis dibagi 2 atau 3? Habis dibagi 2 ada 15, habis dibagi 3 ada 10, habis dibagi keduanya ada 5.

## Contoh terselesaikan

Mengapa `C(n, k) = C(n - 1, k - 1) + C(n - 1, k)`: ambil satu unsur khusus `X` dari `n` unsur. Kelompok `k` unsur yang memuat `X` dibentuk dengan memilih `k - 1` dari `n - 1` unsur lain; yang tidak memuat `X` dengan memilih `k` dari `n - 1`. Kedua kasus tidak bertumpang tindih dan mencakup semuanya. Itu rumus peralihan untuk tabel `C[i][j]` (baris `i`, kolom `j`), dengan `C[i][0] = 1`.

```cpp
#include <iostream>
using namespace std;

long long C[61][61];

int main() {
  for (int i = 0; i <= 60; i++) {
    C[i][0] = 1;
    for (int j = 1; j <= i; j++) {
      C[i][j] = C[i - 1][j - 1] + C[i - 1][j];
    }
  }
  for (int i = 0; i <= 5; i++) {
    for (int j = 0; j <= i; j++) {
      cout << C[i][j] << " ";
    }
    cout << "\n";
  }
  int q;
  cin >> q;
  for (int t = 0; t < q; t++) {
    int n, k;
    cin >> n >> k;
    cout << "C(" << n << ", " << k << ") = " << C[n][k] << "\n";
  }
}
```

Masukan (`masukan.txt`; angka pertama banyak kueri):

```text
4
10 3
20 10
40 20
60 30
```

Keluaran:

```text
1 
1 1 
1 2 1 
1 3 3 1 
1 4 6 4 1 
1 5 10 10 5 1 
C(10, 3) = 120
C(20, 10) = 184756
C(40, 20) = 137846528820
C(60, 30) = 118264581564861424
```

Cocokkan dengan prediksimu pada baris 5. Tabel sampai `n = 60` butuh sekitar `60 * 61 / 2 = 1830` penjumlahan, `O(n^2)`, dan sesudahnya tiap kueri `O(1)`. Batas 60 disengaja: `C(66, 33)` masih muat di `long long`, tetapi `C(67, 33)` meluap. Bandingkan dengan perkalian bertahap di modul sebelumnya, `O(k)` per kueri tanpa tabel: untuk satu kueri itu menang, untuk banyak kueri tabel menang.

**Inklusi-eksklusi.** Bila `A` dan `B` bertumpang tindih, menjumlah `|A| + |B|` menghitung irisan dua kali, sehingga `|A ∪ B| = |A| + |B| - |A ∩ B|`. Untuk tiga himpunan: jumlah ketiganya, kurangi jumlah ketiga irisan berpasangan, tambah irisan ketiganya. Pada soal prediksi: `15 + 10 - 5 = 20`. Program berikut menghitung bilangan dari 1 sampai `N` yang habis dibagi 2, 3, atau 5 (irisan pada kelipatan `6`, `10`, `15`, dan `30`), dan memeriksanya dengan menghitung langsung:

```cpp
#include <iostream>
using namespace std;

int main() {
  int N;
  cin >> N;
  long long rumus = N / 2 + N / 3 + N / 5 - N / 6 - N / 10 - N / 15 + N / 30;
  long long langsung = 0;
  for (int x = 1; x <= N; x++) {
    if (x % 2 == 0 || x % 3 == 0 || x % 5 == 0) {
      langsung++;
    }
  }
  cout << "inklusi-eksklusi: " << rumus << "\n";
  cout << "hitung langsung: " << langsung << "\n";
  cout << "tidak habis dibagi satupun: " << N - rumus << "\n";
}
```

Masukan (`masukan.txt`):

```text
100
```

Keluaran:

```text
inklusi-eksklusi: 74
hitung langsung: 74
tidak habis dibagi satupun: 26
```

Rumusnya `O(1)`, sedangkan menghitung langsung `O(N)`: untuk `N = 10^9` itu satu miliar langkah.

## Contoh setengah jadi

Lengkapi pembangunan segitiga Pascal: nilai awal, batas kolom, dan baris di atas.

```cpp setengah-jadi
for (int i = 0; i <= 60; i++) {
  C[i][0] = ____;
  for (int j = 1; j <= ____; j++) {
    C[i][j] = C[i - 1][j - 1] + C[____][j];
  }
}
```

## Soal Parsons

Susun enam baris berikut (sudah diacak) menjadi program yang mencetak banyak bilangan `1..N` yang habis dibagi 2 atau 3. `AI: tanpa AI`.

```text
(a) long long gabungan = x + y - xy;
(b) long long xy = N / 6;
(c) cout << gabungan << "\n";
(d) int N; cin >> N;
(e) long long x = N / 2;
(f) long long y = N / 3;
```

## Latihan

1. `AI: boleh` **Binomial dengan Pascal.** Tulis pseudocode dulu, lalu program yang menjawab `q` kueri `C(n, k)` dengan tabel. Berapa `C(10, 4)`, `C(30, 15)`, dan `C(50, 25)`?
2. `AI: boleh` **Habis dibagi.** Berapa bilangan dari 1 sampai 1000 yang habis dibagi 3, 5, atau 7? Periksa dengan program.
3. `AI: tanpa AI` **Telusur.** Dari baris 6 (`1 6 15 20 15 6 1`) tulis baris 7. Periksa bahwa jumlah baris 5 adalah `2^5`.
4. `AI: boleh` **Tak satupun.** Berapa bilangan dari 1 sampai 60 yang tidak habis dibagi 2, 3, maupun 5? Hitung dengan rumus lalu periksa langsung.
5. *Opsional:* **catatan pemakaian AI.** Bila memakai AI generatif, jawab nomor 3 sendiri dulu, lalu minta penjelasan atau petunjuk bertahap, bukan program jadi. Catat alat, tujuan, garis besar perintah, bagian yang kamu pakai, dan cara memeriksanya. Jangan menaruh data pribadi atau tugas bernilai pada perintah.

## Latihan bercampur

1. `AI: boleh` Untuk `C(40, 20)`, bandingkan langkah satu kueri dan seribu kueri antara tabel Pascal dan perkalian bertahap (modul `a-xii1-m6`).
2. `AI: tanpa AI` Mengapa rumus peralihan Pascal bisa dilihat sebagai DP, dan apa yang terjadi bila ia ditulis rekursif tanpa tabel (modul `a-xi2-m1`)?
3. `AI: boleh` Dari 6 unsur, berapa pasang yang bisa diberi perintah `G`? Setelah lima `G` yang berhasil pada kelompok yang awalnya terpisah, berapa kelompok tersisa (modul `a-xii1-m4`)?

## Pengayaan (P)

Boleh dilewati. Banyak permutasi `n` unsur yang tidak membiarkan satu pun unsur di tempat awalnya disebut **derangement**, `D(n)`; ia dapat dibuktikan dengan inklusi-eksklusi dan memenuhi `D(n) = (n - 1) * (D(n - 1) + D(n - 2))`. Program berikut membandingkan rumus itu dengan hitungan langsung memakai `next_permutation` sampai `n = 7`:

```cpp
#include <algorithm>
#include <iostream>
#include <numeric>
#include <vector>
using namespace std;

int main() {
  long long D[8];
  D[0] = 1;
  D[1] = 0;
  for (int n = 2; n <= 7; n++) {
    D[n] = (n - 1) * (D[n - 1] + D[n - 2]);
  }
  for (int n = 1; n <= 7; n++) {
    vector<int> p(n);
    iota(p.begin(), p.end(), 0);
    int langsung = 0;
    do {
      bool tetap = false;
      for (int i = 0; i < n; i++) {
        if (p[i] == i) {
          tetap = true;
        }
      }
      if (!tetap) {
        langsung++;
      }
    } while (next_permutation(p.begin(), p.end()));
    cout << "n = " << n << ": rumus " << D[n] << ", langsung " << langsung << "\n";
  }
}
```

Keluaran:

```text
n = 1: rumus 0, langsung 0
n = 2: rumus 1, langsung 1
n = 3: rumus 2, langsung 2
n = 4: rumus 9, langsung 9
n = 5: rumus 44, langsung 44
n = 6: rumus 265, langsung 265
n = 7: rumus 1854, langsung 1854
```

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `a-xii1-m8` (pertanyaan 1), sekitar tiga minggu lagi di `a-xii1-m10` (pertanyaan 2), dan sekitar delapan minggu lagi di `a-xii2-m1` (pertanyaan 3). Jawab sekarang lalu simpan.

1. Apa rumus peralihan Pascal untuk `C(n, k)`, dan mengapa benar?
2. Tulis rumus inklusi-eksklusi untuk `|A ∪ B|`, dan mengapa irisan dikurangkan?
3. Mengapa tabel Pascal lebih aman dari luapan daripada menghitung `n! / (k! * (n - k)!)`?

## Kesalahan umum

- **Menjumlah `|A| + |B|` tanpa mengurangi irisan.** Unsur di irisan terhitung dua kali.
- **Lupa menambah irisan ketiga pada tiga himpunan.** Irisan ketiganya terkurang tiga kali dan terhitung tiga kali, sehingga harus ditambahkan sekali lagi.
- **Memakai `N / 2 * 3` sebagai irisan.** Irisan "habis dibagi 2 dan 3" adalah `N / 6`, kelipatan persekutuan terkecil.
- **Membaca baris di atas yang belum terisi.** Mulai dari baris 0 dan isi berurutan; `C[0][0] = 1`.
- **Menaikkan `n` melebihi batas luapan.** Di atas `n = 66` tabel `long long` mulai meluap.

## Cek mandiri

- [ ] Saya dapat menjelaskan mengapa tiap angka Pascal adalah jumlah dua angka di atasnya.
- [ ] Saya dapat membangun tabel `C[i][j]` dan menjawab kueri.
- [ ] Saya dapat menulis inklusi-eksklusi untuk dua dan tiga himpunan.
- [ ] Saya dapat memeriksa hasil rumus dengan menghitung langsung.
- [ ] Saya dapat menyebut batas luapan tabel binomial.

## Kunci dan petunjuk

**Ingat kembali.** 1: aturan jumlah bila dua cara saling meniadakan (pilih salah satu); aturan kali bila ada tahap berurutan yang semuanya harus dilakukan. 2: karena hanya akar yang mewakili seluruh kelompok; menyambung simpul biasa meninggalkan sebagian kelompok di pohon lain. 3: pertanyaan keputusan, sumber dan lisensi, cara membersihkan data, hasil rekap, ramalan dengan galat, keterbatasan, dan saran keputusan. 4: submasalah tumpang-tindih (masalah kecil yang sama muncul berkali-kali) dan jawaban yang tersusun dari jawaban submasalah.

**Prediksi dulu.** 1: baris 5: `1 5 10 10 5 1`; baris 6: `1 6 15 20 15 6 1`; `C(6, 3) = 20`. 2: `15 + 10 - 5 = 20`; angka 6, 12, 18, 24, 30 terhitung dua kali bila hanya dijumlah.

**Contoh setengah jadi.** Isi: `1`, `i`, `i - 1`. Program lengkap yang mencetak `C(n, k)` tiap kueri:

```cpp
#include <iostream>
using namespace std;

long long C[61][61];

int main() {
  for (int i = 0; i <= 60; i++) {
    C[i][0] = 1;
    for (int j = 1; j <= i; j++) {
      C[i][j] = C[i - 1][j - 1] + C[i - 1][j];
    }
  }
  int q;
  cin >> q;
  for (int t = 0; t < q; t++) {
    int n, k;
    cin >> n >> k;
    cout << C[n][k] << "\n";
  }
}
```

Masukan (`masukan.txt`):

```text
3
10 4
30 15
50 25
```

Keluaran:

```text
210
155117520
126410606437752
```

**Soal Parsons.** Urutan benar: d, lalu e, f, dan b dalam urutan apa pun, kemudian a, lalu c. Hasil antara `x`, `y`, dan `xy` harus ada sebelum `gabungan`, dan `N` harus dibaca sebelum semuanya.

**Latihan.** 1: `C(10, 4) = 210`, `C(30, 15) = 155.117.520`, `C(50, 25) = 126.410.606.437.752`; semuanya muat di `long long`. 2: `333 + 200 + 142 - 66 - 47 - 28 + 9 = 543` (irisan pada kelipatan 15, 21, 35, dan 105). 3: baris 7: `1 7 21 35 35 21 7 1`; jumlah baris 5 `1 + 5 + 10 + 10 + 5 + 1 = 32 = 2^5`. 4: `60 - (30 + 20 + 12 - 10 - 6 - 4 + 2) = 60 - 44 = 16`.

**Latihan bercampur.** 1: satu kueri: perkalian 20 langkah, tabel sampai `n = 40` sekitar `820` penjumlahan; seribu kueri: perkalian sekitar `20.000` langkah, tabel sekitar `820 + 1000`. 2: submasalah `C(n - 1, k - 1)` dan `C(n - 1, k)` tumpang-tindih dan jawabannya tersusun dari keduanya; tanpa tabel, rekursi menghitung ulang yang sama berkali-kali dan waktunya melonjak. 3: `C(6, 2) = 15` pasang; lima `G` yang berhasil menggabungkan 6 kelompok menjadi `6 - 5 = 1`.

**Pengayaan (P).** Tidak ada kunci tunggal; pastikan kedua hitungan memberi angka sama untuk tiap `n`.

**Ulang berjarak.** 1: `C(n, k) = C(n - 1, k - 1) + C(n - 1, k)`: ambil satu unsur khusus; kelompok yang memuatnya tinggal memilih `k - 1` dari sisa `n - 1`, yang tidak memuatnya memilih `k` dari `n - 1`. 2: `|A ∪ B| = |A| + |B| - |A ∩ B|`; unsur di irisan terhitung di `|A|` dan di `|B|`, jadi dikurangkan sekali agar terhitung sekali. 3: tabel hanya menjumlah bilangan yang paling besar sebesar hasil akhir, sedangkan `n!` dan `k!` meluap jauh lebih dulu (`21!` sudah melampaui `long long`).

## Langkah berikutnya

Modul berikut: `a-xii1-m8` (aritmetika modular), untuk hasil hitungan yang melampaui batas `long long`. Modul terkait: `matkom-induksi-dan-rekursi-matematis`. Bacaan lanjut: halaman cppreference tentang `std::next_permutation`.
