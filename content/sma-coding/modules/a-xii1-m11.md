## Untuk siapa modul ini

Modul ini untuk murid kelas XII jalur A (Algoritmik dengan C++), minggu `A-XII1-M11` silabus v1.4.1: geometri dasar. Prasyarat: modul `a-xii1-m10` dan `a-xi1-m2` (kualitas kode dan pengujian).

Modul ini karangan penyusun dan disetujui pemilik program pada 2026-11-20 (keputusan lewat dialog; catatan tinjauan menjadi tindak lanjut revisi). Silabus tidak memetakan butir capaian pembelajaran untuk minggu ini, jadi modul ini tidak dihitung memenuhi butir CP apa pun. Keluarga materi OSN yang bertaut: `geometri-dasar`, yang ditandai pengayaan (P) di jembatan OSN, sehingga kelas reguler boleh melewati modul ini. Modul tidak menjanjikan kedalaman soal OSN dan tidak menggantikan pembinaan OSN.

Tiap soal latihan bertanda `AI: boleh` atau `AI: tanpa AI`. Masukan program diberikan lewat berkas: `./program < masukan.txt`. Semua koordinat karangan.

## Ingat kembali

Jawab dari ingatan dulu, baru cek di kunci. Soal 1 dari `a-xii1-m10`, soal 2 dari `a-xii1-m8`, soal 3 dari `a-xii1-m3`.

1. Mengapa segment tree memakai larik berukuran sekitar `4n`, dan berapa langkah kueri dan pembaruannya?
2. Kapan invers `a` modulo `m` ada, dan bagaimana mencarinya bila `m` prima?
3. Apa beda pohon rentang minimum dan pohon lintasan terpendek dari satu simpul?

## Tujuan

Setelah modul ini kamu dapat:

- memakai koordinat bulat dan menghitung jarak Euclid dengan Pythagoras;
- membandingkan jarak lewat kuadratnya agar hitungannya tepat;
- menghitung keliling dan luas poligon dengan rumus tali sepatu;
- memakai tanda perkalian silang untuk menentukan arah belok tiga titik (keluaran minggu ini: program geometri).

## Prediksi dulu

Ini tugas baca-dan-prediksi, `AI: tanpa AI`. **Tebak dulu, tulis jawabanmu, baru jalankan.** Dua nilai dicetak: panjang sisi miring segitiga siku-siku dengan sisi 3 dan 4, dan hasil perbandingan `sqrt(2) * sqrt(2) == 2` (`1` bila benar, `0` bila salah).

```cpp
#include <cmath>
#include <iostream>
using namespace std;

int main() {
  cout << hypot(3, 4) << " " << (sqrt(2) * sqrt(2) == 2) << "\n";
}
```

1. Apa yang tercetak?
2. Mengapa hasil perbandingan kedua mengkhawatirkan untuk program geometri?

Simpan tebakanmu. Perbandingannya ada di bagian berikutnya.

## Contoh terselesaikan

Keluaran program tadi:

```text
5 0
```

Bilangan pecahan tersimpan dengan pembulatan, jadi `sqrt(2) * sqrt(2)` bernilai kira-kira `2,0000000000000004`, bukan tepat 2. Aturannya: sebisa mungkin hitung dengan bilangan **bulat** dan bandingkan yang bulat. Titik ditulis `(x, y)`. Jarak dua titik menurut Pythagoras adalah `sqrt(dx^2 + dy^2)`, dengan `dx = x2 - x1` dan `dy = y2 - y1`. Untuk membandingkan dua jarak, bandingkan **kuadratnya** `dx^2 + dy^2` yang bulat; akar kuadrat hanya diambil saat mencetak. Pakai `long long` karena kuadrat selisih `10^9` mencapai `10^18` (modul `a-xii1-m8`).

Program berikut mencari pasangan titik terdekat dengan mencoba semua pasangan.

```cpp
#include <cmath>
#include <iostream>
#include <vector>
using namespace std;

int main() {
  int n;
  cin >> n;
  vector<long long> x(n);
  vector<long long> y(n);
  for (int i = 0; i < n; i++) {
    cin >> x[i] >> y[i];
  }
  long long terkecil = -1;
  int pa = 0;
  int pb = 0;
  long long pasangan = 0;
  for (int i = 0; i < n; i++) {
    for (int j = i + 1; j < n; j++) {
      pasangan++;
      long long dx = x[i] - x[j];
      long long dy = y[i] - y[j];
      long long d2 = dx * dx + dy * dy;
      if (terkecil == -1 || d2 < terkecil) {
        terkecil = d2;
        pa = i;
        pb = j;
      }
    }
  }
  cout << "pasangan " << pa + 1 << " dan " << pb + 1 << ", jarak kuadrat " << terkecil << ", jarak " << sqrt((double)terkecil) << "\n";
  cout << pasangan << " pasangan diperiksa\n";
}
```

Masukan (`masukan.txt`):

```text
5
1 1
8 2
3 7
9 3
2 2
```

Keluaran:

```text
pasangan 1 dan 5, jarak kuadrat 2, jarak 1.41421
10 pasangan diperiksa
```

Pasangan 2 dan 4, yaitu `(8, 2)` dan `(9, 3)`, juga berjarak kuadrat 2 tetapi tidak dipilih karena perbandingannya `<` ketat; yang pertama ditemukan menang. Banyak langkah `n(n-1)/2 = 10`, jadi `O(n^2)`; untuk `n = 10^5` terlalu lambat, dan ada cara yang lebih cepat di luar modul ini.

**Luas poligon.** Rumus tali sepatu: untuk titik poligon berurutan, `2 * luas = |jumlah (x_i * y_(i+1) - x_(i+1) * y_i)|`, titik terakhir disambung ke titik pertama. Tanda jumlahnya menunjukkan arah urutan titik: positif berlawanan arah jarum jam. Menyimpan dua kali luas menjaga hitungan tetap bulat.

```cpp
#include <cmath>
#include <iomanip>
#include <iostream>
#include <vector>
using namespace std;

int main() {
  int n;
  cin >> n;
  vector<long long> x(n);
  vector<long long> y(n);
  for (int i = 0; i < n; i++) {
    cin >> x[i] >> y[i];
  }
  double keliling = 0;
  long long duaLuas = 0;
  for (int i = 0; i < n; i++) {
    int j = (i + 1) % n;
    keliling += hypot(x[j] - x[i], y[j] - y[i]);
    duaLuas += x[i] * y[j] - x[j] * y[i];
  }
  cout << fixed << setprecision(3);
  cout << "keliling " << keliling << "\n";
  cout << "luas " << llabs(duaLuas) / 2 << (llabs(duaLuas) % 2 ? ".5" : "") << "\n";
  cout << "arah " << (duaLuas > 0 ? "berlawanan arah jarum jam" : "searah jarum jam") << "\n";
}
```

Masukan (`masukan.txt`):

```text
6
0 0
4 0
4 2
2 2
2 4
0 4
```

Keluaran:

```text
keliling 16.000
luas 12
arah berlawanan arah jarum jam
```

Poligon ini bentuk L: persegi `4 x 4` dikurangi persegi `2 x 2`, luasnya `16 - 4 = 12`, sesuai. Kelilingnya `4 + 2 + 2 + 2 + 2 + 4 = 16`. Banyak langkah `O(n)`.

## Contoh setengah jadi

Lengkapi fungsi dua kali luas poligon.

```cpp setengah-jadi
long long luasDua(const vector<long long>& x, const vector<long long>& y) {
  int n = x.size();
  long long jumlah = 0;
  for (int i = 0; i < n; i++) {
    int j = (i + ____) % n;
    jumlah += x[i] * y[____] - x[j] * y[i];
  }
  return jumlah < 0 ? ____ : jumlah;
}
```

## Soal Parsons

Susun enam baris berikut (sudah diacak, tanpa lekuk) menjadi penghitung keliling poligon dari larik `x` dan `y`. `AI: tanpa AI`: tujuannya melatih membaca urutan.

```text
(a) cout << keliling << "\n";
(b) int j = (i + 1) % n;
(c) for (int i = 0; i < n; i++) {
(d) }
(e) keliling += hypot(x[j] - x[i], y[j] - y[i]);
(f) double keliling = 0;
```

## Latihan

1. `AI: boleh` **Pasangan terjauh.** Tulis pseudocode lebih dulu, lalu ubah program contoh agar mencetak pasangan dengan jarak kuadrat **terbesar**. Uji `n = 2` dan semua titik sama.
2. `AI: tanpa AI` **Telusuri.** Hitung dengan tangan dua kali luas segitiga `(0, 0)`, `(4, 0)`, `(0, 3)` dengan rumus tali sepatu, tulis tiap suku, lalu luasnya.
3. `AI: boleh` **Arah belok.** Untuk titik `a`, `b`, `c` hitung `(bx - ax) * (cy - ay) - (by - ay) * (cx - ax)`. Cetak "berlawanan arah jarum jam" bila positif, "searah jarum jam" bila negatif, dan "segaris" bila nol.
4. `AI: boleh` **Konveks?** Poligon sederhana adalah konveks bila semua belok berturutan memiliki tanda yang sama. Tulis programnya dengan hasil dari nomor 3.
5. *Opsional:* **catatan pemakaian AI.** Bila memakai AI generatif, jawab nomor 2 sendiri dulu, lalu minta penjelasan atau petunjuk bertahap, bukan program jadi. Catat alatnya, tujuanmu, garis besar perintahmu, bagian yang kamu pakai, dan caramu memeriksanya. Jangan menaruh data pribadi atau tugas bernilai pada perintah.

## Latihan bercampur

1. `AI: tanpa AI` Mengapa membandingkan dua jarak lewat kuadrat lebih baik daripada lewat `sqrt` dan perbandingan `double`?
2. `AI: boleh` Koordinat mencapai `10^9`. Satu suku `x_i * y_j` muat di `long long`, tetapi apa yang mungkin terjadi pada jumlah banyak suku (modul `a-xii1-m8`)?
3. `AI: boleh` Banyak titik berkoordinat bulat pada ruas dari `(0, 0)` ke `(6, 9)` (termasuk kedua ujung) adalah `FPB(6, 9) + 1`. Mengapa FPB muncul (modul `a-x2-m5`)?

## Pengayaan (P)

Bagian ini boleh dilewati; ia bukan syarat modul berikutnya. Seluruh topik minggu ini sudah pengayaan; bagian ini lebih jauh lagi. Teorema Pick: untuk poligon sederhana dengan titik sudut berkoordinat bulat, `luas = I + B / 2 - 1`, dengan `I` titik bulat di dalam dan `B` titik bulat di batas. Titik batas tiap sisi `FPB(|dx|, |dy|)`. Maka `I = (2 * luas - B + 2) / 2`.

```cpp
#include <iostream>
#include <numeric>
#include <vector>
using namespace std;

int main() {
  int n;
  cin >> n;
  vector<long long> x(n);
  vector<long long> y(n);
  for (int i = 0; i < n; i++) {
    cin >> x[i] >> y[i];
  }
  long long duaLuas = 0;
  long long batas = 0;
  for (int i = 0; i < n; i++) {
    int j = (i + 1) % n;
    duaLuas += x[i] * y[j] - x[j] * y[i];
    long long dx = x[j] - x[i];
    long long dy = y[j] - y[i];
    batas += gcd(dx < 0 ? -dx : dx, dy < 0 ? -dy : dy);
  }
  if (duaLuas < 0) {
    duaLuas = -duaLuas;
  }
  long long dalam = (duaLuas - batas + 2) / 2;
  cout << "titik batas " << batas << ", titik dalam " << dalam << "\n";
}
```

Masukan (`masukan.txt`):

```text
6
0 0
4 0
4 2
2 2
2 4
0 4
```

Keluaran:

```text
titik batas 16, titik dalam 5
```

Cek dengan tangan pada poligon L: titik dalam adalah `(1, 1)`, `(2, 1)`, `(3, 1)`, `(1, 2)`, dan `(1, 3)`, yaitu 5. Soal pengayaan, `AI: boleh`: hitung `I` dan `B` untuk persegi `3 x 3` dengan teorema Pick lalu cocokkan dengan menghitung titiknya.

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `a-xii1-m12` (pertanyaan 1), sekitar tiga minggu lagi di `a-xii1-m14` (pertanyaan 2), dan sekitar delapan minggu lagi di `a-xii2-m5` (pertanyaan 3). Jawab sekarang lalu simpan.

1. Mengapa jarak dibandingkan lewat kuadratnya, dan tipe apa dipakai?
2. Apa arti tanda hasil perkalian silang `(b - a) x (c - a)`?
3. Bagaimana rumus tali sepatu menghitung luas poligon, dan mengapa hasilnya dibagi dua?

## Kesalahan umum

- **Membandingkan `double` dengan `==`.** Pembulatan membuat dua nilai yang seharusnya sama berbeda sedikit; pakai bilangan bulat atau toleransi kecil.
- **Memakai `sqrt` untuk membandingkan jarak.** Kuadrat sudah cukup dan tepat.
- **Lupa menyambung titik terakhir ke titik pertama.** Luas dan keliling kehilangan satu sisi; pakai `(i + 1) % n`.
- **Memakai `int` untuk kuadrat selisih.** Kuadrat `10^5` sudah `10^10` yang melebihi `int`.
- **Mengira luas selalu bulat.** Dua kali luas bulat; luasnya bisa berakhiran `.5`.

## Cek mandiri

- [ ] Saya dapat menghitung jarak dua titik dan jarak kuadratnya.
- [ ] Saya dapat menjelaskan mengapa jarak dibandingkan lewat kuadrat.
- [ ] Saya dapat memakai rumus tali sepatu dan menyebut arti tandanya.
- [ ] Saya dapat menentukan arah belok tiga titik dengan perkalian silang.
- [ ] Saya dapat menyebut tipe data yang aman untuk koordinat besar.

## Kunci dan petunjuk

**Ingat kembali.** 1: simpul bernomor `2v` dan `2v + 1` untuk anak `v`; bila `n` bukan pangkat dua, indeks terbesar bisa mendekati `4n`, sehingga larik `4n` aman untuk `n` berapa pun. Kueri dan pembaruan sekitar `log n` langkah. 2: invers ada bila `FPB(a, m) = 1`; untuk `m` prima hitung `a^(m-2) mod m`. 3: MST meminimumkan jumlah bobot seluruh pohon; pohon lintasan terpendek meminimumkan jarak dari satu simpul ke tiap simpul lain, sehingga keduanya bisa memilih sisi berbeda.

**Prediksi dulu.** 1: `5 0`. 2: pembulatan membuat `sqrt(2) * sqrt(2)` tidak tepat 2, sehingga uji sama dengan pada pecahan gagal; geometri harus memakai bilangan bulat bila mungkin.

**Contoh setengah jadi.** Isi: `1`, `j`, dan `-jumlah`. Program lengkap untuk segitiga `(0, 0)`, `(4, 0)`, `(0, 3)`:

```cpp
#include <iostream>
#include <vector>
using namespace std;

long long luasDua(const vector<long long>& x, const vector<long long>& y) {
  int n = x.size();
  long long jumlah = 0;
  for (int i = 0; i < n; i++) {
    int j = (i + 1) % n;
    jumlah += x[i] * y[j] - x[j] * y[i];
  }
  return jumlah < 0 ? -jumlah : jumlah;
}

int main() {
  vector<long long> x = {0, 4, 0};
  vector<long long> y = {0, 0, 3};
  long long d = luasDua(x, y);
  cout << d << " " << d / 2 << "\n";
}
```

Keluaran:

```text
12 6
```

**Soal Parsons.** Urutan: f, c, b, e, d, a.

**Latihan.** 1: pseudocode: simpan `terbesar = -1`; untuk tiap pasangan hitung `d2`; bila `d2 > terbesar` simpan pasangannya. Untuk `n = 2` hanya ada satu pasangan; bila semua titik sama jawabnya 0. 2: suku `i = 0`: `0*0 - 4*0 = 0`; `i = 1`: `4*3 - 0*0 = 12`; `i = 2`: `0*0 - 0*3 = 0`. Jumlah 12, luas `12 / 2 = 6`. 3:

```cpp
#include <iostream>
using namespace std;

long long silang(long long ax, long long ay, long long bx, long long by, long long cx, long long cy) {
  return (bx - ax) * (cy - ay) - (by - ay) * (cx - ax);
}

int main() {
  long long uji[3][6] = {{0, 0, 4, 0, 4, 3}, {0, 0, 4, 0, 4, -3}, {0, 0, 2, 2, 5, 5}};
  for (int k = 0; k < 3; k++) {
    long long s = silang(uji[k][0], uji[k][1], uji[k][2], uji[k][3], uji[k][4], uji[k][5]);
    cout << s << ": " << (s > 0 ? "berlawanan arah jarum jam" : (s < 0 ? "searah jarum jam" : "segaris")) << "\n";
  }
}
```

Keluaran:

```text
12: berlawanan arah jarum jam
-12: searah jarum jam
0: segaris
```

Titik `(0, 0)`, `(4, 0)`, `(4, 3)` belok ke kiri (berlawanan arah jarum jam), `(4, -3)` belok ke kanan, dan tiga titik sejajar menghasilkan 0. 4: hitung perkalian silang untuk tiap tiga titik berturutan (dengan indeks `% n`); poligon sederhana konveks bila tak ada tanda positif bercampur dengan negatif (nol boleh bila tiga titik segaris).

**Latihan bercampur.** 1: kuadrat adalah bilangan bulat sehingga perbandingan tepat; `sqrt` menghasilkan pecahan yang dibulatkan sehingga dua jarak yang sama bisa tampak berbeda. 2: jumlah banyak suku sebesar `10^18` dapat melebihi batas `long long` (sekitar `9,2 * 10^18`) dan meluap; gunakan `__int128` atau kecilkan koordinat. 3: sepanjang ruas, tiap `FPB` langkah kecil `(dx / g, dy / g)` jatuh pada titik bulat; `(0, 0)`, `(2, 3)`, `(4, 6)`, `(6, 9)` ada 4, sesuai `3 + 1`.

**Pengayaan.** Persegi `3 x 3` (titik sudut `(0, 0)`, `(3, 0)`, `(3, 3)`, `(0, 3)`): `luas = 9`, `B = 12`, `I = 9 - 6 + 1 = 4`, dan titik dalam `(1, 1)`, `(2, 1)`, `(1, 2)`, `(2, 2)` memang 4.

## Langkah berikutnya

Modul berikutnya, `a-xii1-m12` (program multi-berkas), membahas cara memecah program ke pustaka; fungsi geometri bisa menjadi pustaka pertamamu. Modul terkait: `a-xii1-m8`. Bacaan lanjut: halaman cppreference tentang `std::hypot` dan `std::sqrt`.
