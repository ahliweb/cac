## Untuk siapa modul ini

Modul ini untuk murid kelas XI jalur A (Algoritmik dengan C++), minggu `A-XI2-M1` silabus v1.4.1: pemrograman dinamis (DP), gagasannya. Prasyarat: modul `a-xi1-m12` (membandingkan strategi, tempat kamu mencicipi "DP kecil") dan `a-xi1-m7` (rekursi dan divide-and-conquer).

Modul ini berstatus DRAF: karangan penyusun, belum ditinjau pemilik. Butir `F-AP-a`, `F-AP-b`, dan `F-BK-b` dipetakan silabus sebagai dipenuhi jalur ini; modul draf ini belum dihitung sebagai pemenuhan. Keluarga materi OSN yang bertaut: `strategi-problem-solving`; DP termasuk panduan, bukan pengayaan, sehingga modul ini tidak punya bagian `Pengayaan (P)`. Modul tidak menjanjikan kedalaman soal OSN.

Tiap soal latihan bertanda `AI: boleh` atau `AI: tanpa AI`. Masukan program diberikan lewat berkas: `./program < masukan.txt`. Semua data karangan. Pemeriksa repositori hanya menyatakan kode bisa dikompilasi; benar tidaknya untuk semua masukan tetap kamu uji sendiri.

## Ingat kembali

Jawab dari ingatan dulu, baru cek di kunci. Soal 1 dari `a-xi1-m13`, soal 2 dari `a-xi1-m12`, soal 3 dari `a-xi1-m7`.

1. Mengapa solusi cepat diperiksa dengan solusi lengkap pada data kecil?
2. Mengapa pencarian lengkap lambat untuk `T` besar, dan apa yang membuat tabel DP lebih cepat?
3. Apa beda divide-and-conquer dengan rekursi yang hanya mengurangi `n` satu per satu?

## Tujuan

Setelah modul ini kamu dapat:

- mengenali dua ciri masalah yang cocok untuk DP: submasalah tumpang-tindih dan jawaban yang tersusun dari jawaban submasalah;
- menulis rekursi lalu menambahkan memoisasi (menyimpan jawaban yang sudah dihitung);
- menulis tabel yang diisi dari kasus kecil ke kasus besar;
- menghitung banyak langkah rekursi murni, memoisasi, dan tabel (keluaran minggu ini: program memoisasi).

## Prediksi dulu

Ini tugas baca-dan-prediksi, `AI: tanpa AI`. **Tebak dulu, tulis jawabanmu, baru jalankan.** Tangga taman karangan memiliki `n` anak tangga. Sekali melangkah kamu naik satu atau dua anak tangga. Fungsi `cara(n)` menghitung banyak urutan langkah untuk mencapai anak tangga ke-`n`, dan `panggilan` menghitung berapa kali fungsi dipanggil.

```cpp
#include <iostream>
using namespace std;

long long panggilan = 0;

long long cara(int n) {
  panggilan++;
  if (n <= 1) {
    return 1;
  }
  return cara(n - 1) + cara(n - 2);
}

int main() {
  cout << "cara(4) = " << cara(4) << "\n";
  cout << "panggilan = " << panggilan << "\n";
}
```

1. Berapa `cara(4)`?
2. Berapa kali `cara(2)` dipanggil selama `cara(4)` berjalan? Gambar pohon pemanggilannya.
3. Tebak kasar banyak `panggilan`.

Simpan tebakanmu. Perbandingannya ada di kunci.

## Contoh terselesaikan

Pohon pemanggilan `cara(4)` memuat `cara(2)` dua kali dan `cara(1)` tiga kali: masalah kecil yang sama dikerjakan berulang. Itulah ciri pertama DP, **submasalah tumpang-tindih**. Ciri kedua: jawaban `cara(n)` tersusun dari jawaban submasalah, yaitu `cara(n - 1) + cara(n - 2)` (anak tangga terakhir dicapai dari satu atau dua anak tangga di bawahnya). Dua cara menghilangkan pengulangan:

- **Memoisasi** (atas-bawah): tetap rekursi, tetapi jawaban tiap `n` disimpan di `memo` dan dipakai bila ada. Penanda "belum dihitung" harus nilai yang tak mungkin menjadi jawaban, misalnya `-1`.
- **Tabel** (bawah-atas): isi `dp[0]`, `dp[1]`, lalu `dp[2]` dan seterusnya dengan perulangan, sehingga tiap nilai dihitung sekali dan rekursi tak diperlukan.

Program berikut menghitung ketiganya dan mencatat pekerjaannya.

```cpp
#include <iostream>
#include <vector>
using namespace std;

long long murni(int n, long long& panggilan) {
  panggilan++;
  if (n <= 1) {
    return 1;
  }
  return murni(n - 1, panggilan) + murni(n - 2, panggilan);
}

long long memoisasi(int n, vector<long long>& memo, long long& panggilan) {
  panggilan++;
  if (n <= 1) {
    return 1;
  }
  if (memo[n] != -1) {
    return memo[n];
  }
  memo[n] = memoisasi(n - 1, memo, panggilan) + memoisasi(n - 2, memo, panggilan);
  return memo[n];
}

long long tabel(int n, long long& langkah) {
  vector<long long> dp(n + 1, 1);
  for (int i = 2; i <= n; i++) {
    langkah++;
    dp[i] = dp[i - 1] + dp[i - 2];
  }
  return dp[n];
}

int main() {
  int uji[3] = {10, 20, 30};
  for (int i = 0; i < 3; i++) {
    int n = uji[i];
    long long a = 0;
    long long b = 0;
    long long c = 0;
    vector<long long> memo(n + 1, -1);
    long long hasil = murni(n, a);
    long long hasilMemo = memoisasi(n, memo, b);
    long long hasilTabel = tabel(n, c);
    cout << "n = " << n << ": cara " << hasil << ", murni " << a << " panggilan, memoisasi " << b << " panggilan, tabel " << c << " langkah, sama: " << (hasil == hasilMemo && hasil == hasilTabel ? "ya" : "tidak") << "\n";
  }
  long long b = 0;
  long long c = 0;
  vector<long long> memo(51, -1);
  long long hasilMemo = memoisasi(50, memo, b);
  long long hasilTabel = tabel(50, c);
  cout << "n = 50: cara " << hasilMemo << ", memoisasi " << b << " panggilan, tabel " << c << " langkah, sama: " << (hasilMemo == hasilTabel ? "ya" : "tidak") << "\n";
}
```

Keluaran:

```text
n = 10: cara 89, murni 177 panggilan, memoisasi 19 panggilan, tabel 9 langkah, sama: ya
n = 20: cara 10946, murni 21891 panggilan, memoisasi 39 panggilan, tabel 19 langkah, sama: ya
n = 30: cara 1346269, murni 2692537 panggilan, memoisasi 59 panggilan, tabel 29 langkah, sama: ya
n = 50: cara 20365011074, memoisasi 99 panggilan, tabel 49 langkah, sama: ya
```

Baca angkanya. Rekursi murni melonjak dari 177 ke 21.891 lalu 2.692.537 panggilan: naik sekitar 123 kali lipat tiap tambahan 10 anak tangga, sehingga ia eksponensial dan tidak layak untuk `n = 50`. Memoisasi hanya sekitar `2n` panggilan karena tiap `n` dihitung sekali dan pemanggilan berikutnya langsung membaca `memo`; tabel melakukan `n - 1` langkah. Keduanya `O(n)` langkah dengan memori `O(n)`. Harganya adalah larik `memo` atau `dp` sepanjang `n + 1`, dan tipe `long long` karena `cara(50)` sudah melewati batas `int`.

Dua cara itu dua wajah gagasan yang sama. Memoisasi hanya menghitung submasalah yang benar-benar dibutuhkan dan mudah ditulis dari rekursi yang sudah ada. Tabel menghindari kedalaman rekursi dan lebih mudah dihitung langkah dan memorinya. Mulailah dari rumus peralihan (`cara(n)` dari apa), lalu pilih yang lebih mudah ditulis.

## Contoh setengah jadi

Tangga yang sama, tetapi sekali melangkah boleh naik 1, 2, atau 3 anak tangga. Lengkapi memoisasinya.

```cpp setengah-jadi
long long cara3(int n, vector<long long>& memo) {
  if (n < 0) {
    return ____;
  }
  if (n == 0) {
    return 1;
  }
  if (memo[n] != -1) {
    return ____;
  }
  memo[n] = cara3(n - 1, memo) + cara3(n - 2, memo) + cara3(n - ____, memo);
  return memo[n];
}
```

## Soal Parsons

Susun enam baris berikut (sudah diacak) menjadi fungsi `cara` dengan memoisasi. `AI: tanpa AI`: tujuannya melatih membaca urutan.

```text
(a)   if (n <= 1) return 1;
(b)   if (memo[n] != -1) return memo[n];
(c) long long cara(int n, vector<long long>& memo) {
(d)   memo[n] = cara(n - 1, memo) + cara(n - 2, memo);
(e)   return memo[n];
(f) }
```

## Latihan

1. `AI: boleh` **Tabel tangga.** Tulis pseudocode lebih dulu, lalu program yang membaca `t`, kemudian `t` bilangan `n` (0 sampai 80), dan mencetak `cara(n)` memakai tabel. Mengapa `n = 0` dan `n = 80` perlu diuji?
2. `AI: tanpa AI` **Anak tangga rusak.** Tangga punya 6 anak tangga dan anak tangga ke-3 rusak (tidak boleh diinjak). Isi tabel `dp` dengan tangan. Berapa cara mencapai anak tangga ke-6?
3. `AI: boleh` **Layakkah?** Banyak panggilan `murni(n)` sama dengan `2 * cara(n) - 1`. Untuk `n = 60`, `cara(60)` kira-kira `2,5 * 10^12`. Dengan pedoman seratus juta langkah per detik, berapa lama kira-kira?
4. `AI: boleh` **Taman berpetak.** Robot berada di petak kiri-atas taman `r` baris dan `c` kolom, dan hanya bergerak ke kanan atau ke bawah. Hitung banyak jalur ke petak kanan-bawah dengan tabel dua dimensi. Uji `r = 3, c = 4`.
5. *Opsional:* **catatan pemakaian AI.** Bila memakai AI generatif, jawab nomor 2 sendiri dulu, lalu minta penjelasan atau petunjuk bertahap, bukan program jadi. Catat alatnya, tujuanmu, garis besar perintahmu, bagian yang kamu pakai, dan caramu memeriksanya. Jangan menaruh data pribadi atau tugas bernilai pada perintah.

## Latihan bercampur

1. `AI: boleh` Pangkat cepat (modul `a-xi1-m7`) juga rekursi. Apakah ada submasalah yang dihitung berulang di sana? Mengapa ia tidak memerlukan memoisasi?
2. `AI: tanpa AI` Pada `lengkap(6)` untuk voucher `{1, 3, 4}` (modul `a-xi1-m12`), sisa mana yang dihitung berulang dan berapa kali?
3. `AI: boleh` Tulis `fib(n)` dengan `fib(0) = 0` dan `fib(1) = 1` memakai memoisasi (modul `a-x2-m11`). Berapa panggilan untuk `fib(30)`, dibanding 2.692.537 pada versi murni?

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `a-xi2-m2` (pertanyaan 1), sekitar tiga minggu lagi di `a-xi2-m4` (pertanyaan 2), dan sekitar delapan minggu lagi di `a-xi2-m9` (pertanyaan 3). Jawab sekarang lalu simpan.

1. Apa dua ciri masalah yang cocok diselesaikan dengan DP?
2. Apa beda memoisasi dan tabel, dan mengapa penanda "belum dihitung" tidak boleh nilai yang mungkin menjadi jawaban?
3. Kira-kira berapa memori larik `long long` untuk satu juta sel, dan mengapa itu penting saat memilih tabel DP?

## Kesalahan umum

- **Memakai `0` sebagai penanda "belum dihitung".** Bila jawabannya bisa 0 (misalnya tangga dengan anak tangga rusak), nilai itu dikira belum dihitung dan dihitung ulang.
- **Lupa kasus dasar.** Tanpa `n <= 1`, rekursi tak berhenti.
- **Memakai `int` untuk jumlah cara.** `cara(47)` sudah melewati `2.147.483.647`; pakai `long long`.
- **Larik `memo` kekecilan.** Indeks `n` memerlukan ukuran `n + 1`.
- **Mengira memoisasi selalu menolong.** Bila tiap submasalah hanya muncul sekali (seperti pangkat cepat), menyimpan jawaban hanya menambah memori.

## Cek mandiri

- [ ] Saya dapat menunjukkan submasalah yang dihitung berulang pada pohon pemanggilan.
- [ ] Saya dapat menulis rumus peralihan sebuah masalah DP.
- [ ] Saya dapat menambahkan memoisasi pada rekursi.
- [ ] Saya dapat menulis tabel yang diisi dari kasus kecil.
- [ ] Saya dapat menghitung banyak langkah dan memori tiap cara.

## Kunci dan petunjuk

**Ingat kembali.** 1: cara lengkap pasti benar dan sederhana, sehingga bisa menjadi pembanding yang dipercaya untuk solusi cepat yang belum terbukti. 2: karena sisa yang sama dihitung berulang dan pemanggilan berlipat; tabel menghitung tiap sisa sekali. 3: divide-and-conquer membagi masalah menjadi bagian yang jauh lebih kecil (misalnya separuh), sehingga kedalamannya `log n`; rekursi satu per satu hanya mengurangi `n` satu, sehingga kedalamannya `n`.

**Prediksi dulu.** 1: `cara(4) = 5`. 2: dua kali (dari `cara(4)` lewat `cara(2)`, dan dari `cara(3)` lewat `cara(2)`); `cara(1)` dipanggil tiga kali. 3: pohonnya punya 9 simpul. Keluaran sebenarnya:

```text
cara(4) = 5
panggilan = 9
```

**Contoh setengah jadi.** Isi: `0`, `memo[n]`, dan `3`. Anak tangga negatif tidak ada, sehingga tidak menyumbang cara. Program lengkap:

```cpp
#include <iostream>
#include <vector>
using namespace std;

long long cara3(int n, vector<long long>& memo) {
  if (n < 0) {
    return 0;
  }
  if (n == 0) {
    return 1;
  }
  if (memo[n] != -1) {
    return memo[n];
  }
  memo[n] = cara3(n - 1, memo) + cara3(n - 2, memo) + cara3(n - 3, memo);
  return memo[n];
}

int main() {
  int n = 10;
  vector<long long> memo(n + 1, -1);
  cout << "cara3(" << n << ") = " << cara3(n, memo) << "\n";
}
```

Keluaran:

```text
cara3(10) = 274
```

**Soal Parsons.** Urutan benar: c, a, b, d, e, f.

**Latihan.** 1: pseudocode: baca `t`; ulangi `t` kali: baca `n`; `dp[0] = dp[1] = 1`; untuk `i` dari 2 sampai `n`: `dp[i] = dp[i-1] + dp[i-2]`; cetak `dp[n]`. `n = 0` menguji kasus dasar (tabel hanya `dp[0]`), `n = 80` menguji bahwa `long long` cukup. Program contoh:

```cpp
#include <iostream>
#include <vector>
using namespace std;

int main() {
  int t;
  cin >> t;
  for (int k = 0; k < t; k++) {
    int n;
    cin >> n;
    vector<long long> dp(n + 2, 1);
    for (int i = 2; i <= n; i++) {
      dp[i] = dp[i - 1] + dp[i - 2];
    }
    cout << "cara(" << n << ") = " << dp[n] << "\n";
  }
}
```

Masukan (`masukan.txt`):

```text
4
0
1
10
80
```

Keluaran:

```text
cara(0) = 1
cara(1) = 1
cara(10) = 89
cara(80) = 37889062373143906
```

2: `dp[0] = 1`, `dp[1] = 1`, `dp[2] = 2`, `dp[3] = 0` (rusak), `dp[4] = dp[3] + dp[2] = 2`, `dp[5] = dp[4] + dp[3] = 2`, `dp[6] = dp[5] + dp[4] = 4`. Jawabannya 4. Program yang memeriksa jawaban itu (anak tangga rusak diberikan sebagai masukan):

```cpp
#include <iostream>
#include <vector>
using namespace std;

int main() {
  int n;
  int rusak;
  cin >> n >> rusak;
  vector<bool> tak(n + 1, false);
  for (int i = 0; i < rusak; i++) {
    int k;
    cin >> k;
    tak[k] = true;
  }
  vector<long long> dp(n + 1, 0);
  dp[0] = 1;
  for (int i = 1; i <= n; i++) {
    if (tak[i]) {
      continue;
    }
    dp[i] = dp[i - 1];
    if (i >= 2) {
      dp[i] += dp[i - 2];
    }
  }
  cout << "cara ke anak tangga " << n << " = " << dp[n] << "\n";
}
```

Masukan (`masukan.txt`):

```text
6 1
3
```

Keluaran:

```text
cara ke anak tangga 6 = 4
```

3: `2 * 2,5 * 10^12 = 5 * 10^12` panggilan, dibagi `10^8` per detik menjadi sekitar `50.000` detik, kurang lebih 14 jam: tidak layak. Tabel hanya 59 langkah. 4: rumus `dp[i][j] = dp[i-1][j] + dp[i][j-1]` dengan baris dan kolom pertama bernilai 1. Program contoh:

```cpp
#include <iostream>
#include <vector>
using namespace std;

int main() {
  int r;
  int c;
  cin >> r >> c;
  vector<vector<long long>> dp(r, vector<long long>(c, 1));
  for (int i = 1; i < r; i++) {
    for (int j = 1; j < c; j++) {
      dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
    }
  }
  cout << "jalur: " << dp[r - 1][c - 1] << "\n";
}
```

Masukan (`masukan.txt`):

```text
3 4
```

Keluaran:

```text
jalur: 10
```

Langkahnya `r * c` dan memorinya `r * c` sel.

**Latihan bercampur.** 1: tidak. Pangkat cepat membagi `n` menjadi dua bagian yang dihitung sekali dan tiap tingkat hanya memuat satu submasalah baru, sehingga tidak ada pekerjaan yang diulang; memoisasi tidak menghemat apa pun. 2: sisa `2` dihitung tiga kali (dari 6, dari 5, dari 3). 3: program:

```cpp
#include <iostream>
#include <vector>
using namespace std;

long long fib(int n, vector<long long>& memo, long long& panggilan) {
  panggilan++;
  if (n <= 1) {
    return n;
  }
  if (memo[n] != -1) {
    return memo[n];
  }
  memo[n] = fib(n - 1, memo, panggilan) + fib(n - 2, memo, panggilan);
  return memo[n];
}

int main() {
  long long panggilan = 0;
  vector<long long> memo(31, -1);
  cout << "fib(30) = " << fib(30, memo, panggilan) << ", " << panggilan << " panggilan\n";
}
```

Keluaran:

```text
fib(30) = 832040, 59 panggilan
```

**Ulang berjarak.** 1: submasalah tumpang-tindih (masalah kecil yang sama muncul berkali-kali) dan jawaban yang tersusun dari jawaban submasalah. 2: memoisasi rekursi atas-bawah dengan jawaban disimpan; tabel memakai perulangan bawah-atas; penanda yang bisa menjadi jawaban membuat jawaban yang sah dikira belum dihitung. 3: satu juta `long long` ada `1.000.000 * 8 = 8.000.000` bita, sekitar 8 MB; tabel yang terlalu besar tidak muat atau lambat, sehingga ukuran tabel dihitung sebelum memilih rumusan DP.

## Langkah berikutnya

Modul berikut: `a-xi2-m2` (DP satu dimensi: merumuskan arti `dp[i]` dan rumus peralihan untuk masalah pemilihan). Modul terkait: `matkom-induksi-dan-rekursi-matematis`. Bacaan lanjut: halaman cppreference tentang `std::vector`.
