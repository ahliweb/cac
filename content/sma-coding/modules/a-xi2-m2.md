## Untuk siapa modul ini

Modul ini untuk murid kelas XI jalur A (Algoritmik dengan C++), minggu `A-XI2-M2` silabus v1.4.1: DP satu dimensi. Prasyarat: modul `a-xi2-m1` (gagasan DP: memoisasi dan tabel).

Modul ini berstatus DRAF: karangan penyusun, belum ditinjau pemilik. Butir `F-AP-a`, `F-AP-b`, dan `F-BK-b` dipetakan silabus sebagai dipenuhi jalur ini; modul draf ini belum dihitung sebagai pemenuhan. Keluarga materi OSN yang bertaut: `strategi-problem-solving`; DP termasuk panduan, bukan pengayaan, sehingga modul ini tidak punya bagian `Pengayaan (P)`. Modul tidak menjanjikan kedalaman soal OSN.

Tiap soal latihan bertanda `AI: boleh` atau `AI: tanpa AI`. Masukan program diberikan lewat berkas: `./program < masukan.txt`. Semua data karangan.

## Ingat kembali

Jawab dari ingatan dulu, baru cek di kunci. Soal 1 dari `a-xi2-m1`, soal 2 dari `a-xi1-m13`, soal 3 dari `a-xi1-m8`.

1. Apa dua ciri masalah yang cocok diselesaikan dengan DP?
2. Sebutkan empat uji batas untuk program yang memilih dari rentang waktu.
3. Mengapa merge sort memerlukan larik bantu, dan apa akibatnya pada pemakaian memori?

## Tujuan

Setelah modul ini kamu dapat:

- merumuskan DP satu dimensi dengan tiga langkah: arti `dp[i]`, nilai awal, dan rumus peralihan;
- mengisi tabel `dp` dan menelusurinya dengan tangan;
- mencetak pilihan yang menghasilkan nilai terbaik, bukan hanya nilainya;
- menghitung banyak langkah dan memori, serta menghemat memori bila tabel hanya melihat beberapa sel terakhir (keluaran minggu ini: program DP satu dimensi).

## Prediksi dulu

Ini tugas baca-dan-prediksi, `AI: tanpa AI`. **Tebak dulu, tulis jawabanmu, baru jalankan.** Sebuah kebun karangan punya empat pohon berderet berisi 5, 6, 5, dan 1 buah. Dua pohon yang bersebelahan tidak boleh dipetik bersama. Program memilih pohon yang paling banyak buahnya dan masih boleh, berulang kali.

```cpp
#include <iostream>
#include <vector>
using namespace std;

int main() {
  vector<int> a = {5, 6, 5, 1};
  int n = a.size();
  vector<bool> boleh(n, true);
  int total = 0;
  while (true) {
    int terbaik = -1;
    for (int i = 0; i < n; i++) {
      if (boleh[i] && (terbaik == -1 || a[i] > a[terbaik])) {
        terbaik = i;
      }
    }
    if (terbaik == -1) {
      break;
    }
    total += a[terbaik];
    boleh[terbaik] = false;
    if (terbaik > 0) {
      boleh[terbaik - 1] = false;
    }
    if (terbaik + 1 < n) {
      boleh[terbaik + 1] = false;
    }
  }
  cout << "total " << total << "\n";
}
```

1. Berapa yang tercetak?
2. Adakah cara memetik dengan total lebih banyak? Tulis pohon mana saja.

## Contoh terselesaikan

Tebakan greedy tadi 7, padahal memetik pohon pertama dan ketiga memberi 10: greedy gagal lagi, jadi kita rumuskan DP satu dimensi dengan tiga langkah.

1. **Arti `dp[i]`:** total terbanyak yang dapat dipetik dari pohon `1` sampai `i`.
2. **Nilai awal:** `dp[0] = 0` (tak ada pohon) dan `dp[1] = a[1]`.
3. **Rumus peralihan:** pohon `i` dilewati (`dp[i - 1]`) atau dipetik, sehingga pohon `i - 1` tak boleh dipetik (`dp[i - 2] + a[i]`). Ambil yang lebih besar.

Untuk mencetak pilihannya, mundur dari `i = n`: bila `dp[i] == dp[i - 1]`, pohon `i` tidak dipakai; bila tidak, pohon `i` dipakai dan loncat ke `i - 2`. Program berikut juga membandingkan dengan pencarian lengkap yang mencoba lewati atau petik di tiap pohon.

```cpp
#include <algorithm>
#include <iostream>
#include <vector>
using namespace std;

long long panggilan = 0;

int lengkap(const vector<int>& a, int i, int n) {
  panggilan++;
  if (i > n) {
    return 0;
  }
  return max(lengkap(a, i + 1, n), a[i] + lengkap(a, i + 2, n));
}

int main() {
  int n;
  cin >> n;
  vector<int> a(n + 1, 0);
  for (int i = 1; i <= n; i++) {
    cin >> a[i];
  }
  vector<int> dp(n + 1, 0);
  long long langkah = 0;
  if (n >= 1) {
    dp[1] = a[1];
  }
  for (int i = 2; i <= n; i++) {
    langkah++;
    dp[i] = max(dp[i - 1], dp[i - 2] + a[i]);
  }
  cout << "dp:";
  for (int i = 0; i <= n; i++) {
    cout << " " << dp[i];
  }
  cout << "\n";
  vector<int> pilih;
  int i = n;
  while (i >= 1) {
    if (dp[i] == dp[i - 1]) {
      i--;
    } else {
      pilih.push_back(i);
      i -= 2;
    }
  }
  cout << "pohon dipetik:";
  for (int k = (int)pilih.size() - 1; k >= 0; k--) {
    cout << " " << pilih[k];
  }
  cout << "\n";
  cout << "total " << dp[n] << " (" << langkah << " langkah)\n";
  int hasil = lengkap(a, 1, n);
  cout << "lengkap " << hasil << " (" << panggilan << " panggilan)\n";
}
```

Masukan (`masukan.txt`):

```text
12
4 1 9 3 5 2 8 6 7 1 3 5
```

Keluaran:

```text
dp: 0 4 4 13 13 18 18 26 26 33 33 36 38
pohon dipetik: 1 3 5 7 9 12
total 38 (11 langkah)
lengkap 38 (753 panggilan)
```

Baca angkanya. Tabel memerlukan `n - 1` langkah dan `n + 1` sel: `O(n)` langkah dan `O(n)` memori. Pencarian lengkap memanggil dirinya `1 + (panggilan dari i + 1) + (panggilan dari i + 2)`, pola yang sama dengan Fibonacci pada modul sebelumnya, sehingga eksponensial dalam `n`. Kedua cara memberi total yang sama, dan itu cara memeriksa DP: bandingkan dengan pencarian lengkap pada data kecil.

Perhatikan `dp[i]` hanya membaca `dp[i - 1]` dan `dp[i - 2]`. Bila kamu hanya butuh total (bukan pilihannya), dua variabel cukup dan memorinya menjadi `O(1)`. Pilihan tak dapat dicetak dari dua variabel, karena tabel penuh dipakai untuk mundur.

## Contoh setengah jadi

Tangga karangan dengan biaya menginjak tiap anak tangga. Kamu mulai dari tanah (biaya 0), boleh naik 1 atau 2 anak tangga sekali melangkah, dan harus menginjak anak tangga `n`. Cari biaya terkecil. Lengkapi.

```cpp setengah-jadi
vector<int> dp(n + 1, 0);
dp[0] = ____;
dp[1] = ____;
for (int i = 2; i <= n; i++) {
  dp[i] = biaya[i] + min(dp[i - 1], ____);
}
cout << dp[n] << "\n";
```

## Soal Parsons

Susun enam baris berikut (sudah diacak) menjadi program total terbanyak pemetik buah. `AI: tanpa AI`: tujuannya melatih membaca urutan.

```text
(a)   dp[i] = max(dp[i - 1], dp[i - 2] + a[i]);
(b) dp[0] = 0;
(c) cout << dp[n] << "\n";
(d) for (int i = 2; i <= n; i++) {
(e) }
(f) dp[1] = a[1];
```

## Latihan

1. `AI: boleh` **Pemetik.** Tulis pseudocode lebih dulu, lalu program yang membaca `n` dan `n` bilangan lalu mencetak total terbanyak. Uji `n = 0`, `n = 1`, `n = 2`, dan semua bilangan 0. Mengapa `n = 0` perlu penjagaan sendiri?
2. `AI: tanpa AI` **Telusuri.** Isi tabel `dp` untuk `a = {5, 6, 5, 1}` dengan tangan. Pohon mana yang dipetik?
3. `AI: boleh` **Urutan naik terpanjang.** Diberikan `n` bilangan, cari panjang barisan bagian (tidak harus bersebelahan) yang naik tegas. Pakai `dp[i]` = panjang terpanjang yang berakhir di `i`, dengan `dp[i] = 1 + max(dp[j])` atas `j < i` dan `a[j] < a[i]`. Berapa langkahnya?
4. `AI: boleh` **Hemat memori.** Tulis versi pemetik yang memakai dua variabel saja. Mengapa versi ini tak dapat mencetak pilihan?
5. *Opsional:* **catatan pemakaian AI.** Bila memakai AI generatif, jawab nomor 2 sendiri dulu, lalu minta penjelasan atau petunjuk bertahap, bukan program jadi. Catat alatnya, tujuanmu, garis besar perintahmu, bagian yang kamu pakai, dan caramu memeriksanya. Jangan menaruh data pribadi atau tugas bernilai pada perintah.

## Latihan bercampur

1. `AI: boleh` Tulis program yang mencoba semua larik panjang 4 bernilai 1 sampai 6 dan menghitung berapa larik yang membuat greedy "ambil terbesar" berbeda dari DP (teknik pembanding modul `a-xi1-m13`).
2. `AI: tanpa AI` Tabel `dp` untuk `n = 1.000.000` bertipe `long long` memakai kira-kira berapa memori (modul `a-x2-m6`, `vector`)?
3. `AI: boleh` Voucher DP (modul `a-xi1-m12`) membaca beberapa sel sebelumnya, sedangkan pemetik membaca dua. Apa yang sama dan apa yang berbeda pada pengisian tabelnya?

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `a-xi2-m3` (pertanyaan 1), sekitar tiga minggu lagi di `a-xi2-m5` (pertanyaan 2), dan sekitar delapan minggu lagi di `a-xi2-m10` (pertanyaan 3). Jawab sekarang lalu simpan.

1. Apa tiga hal yang perlu ditentukan saat merumuskan DP satu dimensi?
2. Bagaimana mencetak pilihan yang menghasilkan nilai terbaik dari tabel DP?
3. Mengapa tabel pemetik buah hanya memerlukan dua nilai terakhir, dan apa akibatnya pada memori?

## Kesalahan umum

- **Arti `dp[i]` tidak ditulis.** Tanpa arti yang jelas, rumus peralihan sulit diperiksa; tulis satu kalimat dulu.
- **Mengira greedy benar karena cocok pada satu data.** Uji dengan pencarian lengkap pada data kecil.
- **Lupa penjagaan `n = 0` atau `n = 1`.** `dp[1]` dan `dp[i - 2]` bisa keluar dari larik.
- **Mencetak pilihan dengan maju, bukan mundur.** Pilihan dibaca dari `dp[n]` ke belakang, sehingga hasilnya urut terbalik.
- **Menghemat memori lalu tetap ingin mencetak pilihan.** Dua variabel tak cukup untuk mundur.

## Cek mandiri

- [ ] Saya dapat menulis arti `dp[i]`, nilai awal, dan rumus peralihan.
- [ ] Saya dapat mengisi tabel dan menelusurinya dengan tangan.
- [ ] Saya dapat mencetak pilihan dari tabel.
- [ ] Saya dapat menyebut langkah dan memori DP satu dimensi.
- [ ] Saya dapat menguji DP dengan pencarian lengkap pada data kecil.

## Kunci dan petunjuk

**Ingat kembali.** 1: submasalah tumpang-tindih (masalah kecil yang sama muncul berkali-kali) dan jawaban yang tersusun dari jawaban submasalah. 2: contoh: `n = 0`, `n = 1`, semua bertumpuk, tidak ada yang bertumpuk, selesai tepat saat yang lain mulai. 3: karena penggabungan menulis hasil ke tempat lain sebelum disalin balik; ia memakai tambahan memori sebesar data.

**Prediksi dulu.** 1: `total 7` (greedy memilih 6, lalu pohon 1 dan 3 terlarang, tinggal pohon 4 berisi 1). 2: ya, pohon 1 dan 3 memberi `5 + 5 = 10`.

**Contoh setengah jadi.** Isi: `0`, `biaya[1]`, dan `dp[i - 2]`. Program lengkap untuk biaya `3, 2, 4, 6, 1`:

```cpp
#include <algorithm>
#include <iostream>
#include <vector>
using namespace std;

int main() {
  vector<int> biaya = {0, 3, 2, 4, 6, 1};
  int n = 5;
  vector<int> dp(n + 1, 0);
  dp[0] = 0;
  dp[1] = biaya[1];
  for (int i = 2; i <= n; i++) {
    dp[i] = biaya[i] + min(dp[i - 1], dp[i - 2]);
  }
  cout << dp[n] << "\n";
}
```

Keluaran:

```text
7
```

**Soal Parsons.** Urutan benar: b, f, d, a, e, c (b dan f boleh bertukar tempat).

**Latihan.** 1: pseudocode: baca `n`; bila `n = 0` cetak 0; `dp[0] = 0`, `dp[1] = a[1]`; untuk `i` dari 2 sampai `n`: `dp[i] = max(dp[i-1], dp[i-2] + a[i])`; cetak `dp[n]`. Penjagaan `n = 0` perlu karena `dp[1]` tak ada pada larik berukuran 1. Program contoh:

```cpp
#include <algorithm>
#include <iostream>
#include <vector>
using namespace std;

int main() {
  int n;
  cin >> n;
  vector<int> a(n + 2, 0);
  for (int i = 1; i <= n; i++) {
    cin >> a[i];
  }
  vector<int> dp(n + 2, 0);
  dp[1] = a[1];
  for (int i = 2; i <= n; i++) {
    dp[i] = max(dp[i - 1], dp[i - 2] + a[i]);
  }
  cout << dp[n] << "\n";
}
```

Masukan (`masukan.txt`):

```text
5
2 7 9 3 1
```

Keluaran:

```text
12
```

Larik berukuran `n + 2` membuat `dp[1]` tetap sah untuk `n = 0` (nilainya 0, `dp[0]` dicetak 0). 2: `dp[0] = 0`, `dp[1] = 5`, `dp[2] = max(5, 6) = 6`, `dp[3] = max(6, 5 + 5) = 10`, `dp[4] = max(10, 6 + 1) = 10`; mundur: `dp[4] = dp[3]` jadi pohon 4 dilewati, `dp[3] != dp[2]` jadi pohon 3 dipetik, loncat ke 1, `dp[1] != dp[0]` jadi pohon 1 dipetik: pohon 1 dan 3. 3: program contoh dengan `n^2` langkah paling banyak (dua perulangan bersarang):

```cpp
#include <algorithm>
#include <iostream>
#include <vector>
using namespace std;

int main() {
  int n;
  cin >> n;
  vector<int> a(n);
  for (int i = 0; i < n; i++) {
    cin >> a[i];
  }
  vector<int> dp(n, 1);
  long long langkah = 0;
  int terpanjang = 0;
  for (int i = 0; i < n; i++) {
    for (int j = 0; j < i; j++) {
      langkah++;
      if (a[j] < a[i]) {
        dp[i] = max(dp[i], dp[j] + 1);
      }
    }
    terpanjang = max(terpanjang, dp[i]);
  }
  cout << "terpanjang " << terpanjang << " (" << langkah << " langkah)\n";
}
```

Masukan (`masukan.txt`):

```text
8
3 1 4 1 5 9 2 6
```

Keluaran:

```text
terpanjang 4 (28 langkah)
```

Langkahnya `n * (n - 1) / 2 = 28` untuk `n = 8`: `O(n^2)`; memorinya `O(n)`. 4: dua variabel `sebelum2` dan `sebelum1` bergeser tiap langkah; program contoh:

```cpp
#include <algorithm>
#include <iostream>
using namespace std;

int main() {
  int n;
  cin >> n;
  int sebelum2 = 0;
  int sebelum1 = 0;
  for (int i = 1; i <= n; i++) {
    int a;
    cin >> a;
    int sekarang = max(sebelum1, sebelum2 + a);
    sebelum2 = sebelum1;
    sebelum1 = sekarang;
  }
  cout << sebelum1 << "\n";
}
```

Masukan (`masukan.txt`):

```text
5
2 7 9 3 1
```

Keluaran:

```text
12
```

Versi ini tak dapat mencetak pilihan karena nilai lama dibuang; untuk mundur diperlukan seluruh tabel (atau catatan keputusan tiap `i`).

**Latihan bercampur.** 1: program contoh:

```cpp
#include <algorithm>
#include <iostream>
#include <vector>
using namespace std;

int main() {
  int beda = 0;
  int total = 0;
  for (int p = 1; p <= 6; p++) {
    for (int q = 1; q <= 6; q++) {
      for (int r = 1; r <= 6; r++) {
        for (int s = 1; s <= 6; s++) {
          vector<int> a = {p, q, r, s};
          vector<bool> boleh(4, true);
          int serakah = 0;
          while (true) {
            int terbaik = -1;
            for (int i = 0; i < 4; i++) {
              if (boleh[i] && (terbaik == -1 || a[i] > a[terbaik])) {
                terbaik = i;
              }
            }
            if (terbaik == -1) {
              break;
            }
            serakah += a[terbaik];
            boleh[terbaik] = false;
            if (terbaik > 0) {
              boleh[terbaik - 1] = false;
            }
            if (terbaik + 1 < 4) {
              boleh[terbaik + 1] = false;
            }
          }
          int dua = 0;
          int satu = 0;
          for (int i = 0; i < 4; i++) {
            int sekarang = max(satu, dua + a[i]);
            dua = satu;
            satu = sekarang;
          }
          total++;
          if (serakah != satu) {
            beda++;
          }
        }
      }
    }
  }
  cout << "dari " << total << " larik, greedy berbeda dari DP pada " << beda << " larik\n";
}
```

Keluaran:

```text
dari 1296 larik, greedy berbeda dari DP pada 70 larik
```

2: `1.000.000 * 8` bita, sekitar 8 MB. 3: sama: tiap `dp[i]` dihitung dari sel yang sudah terisi dengan menggeser `i` dari kecil ke besar; beda: voucher membaca sel sejauh nilai tiap voucher dan mengambil minimum, pemetik membaca persis dua sel dan mengambil maksimum.

**Ulang berjarak.** 1: arti `dp[i]`, nilai awal, dan rumus peralihan. 2: mundur dari `dp[n]`: bila `dp[i] == dp[i - 1]` item `i` tak dipakai, bila tidak ia dipakai dan indeks loncat sesuai rumus (`i - 2` pada pemetik); simpan juga pilihan tiap sel bila rumusnya rumit. 3: karena `dp[i]` hanya membaca `dp[i - 1]` dan `dp[i - 2]`; dua variabel cukup sehingga memori `O(1)`, tetapi pilihan tak dapat dicetak.

## Langkah berikutnya

Modul berikut: `a-xi2-m3` (knapsack 0/1: DP dengan dua pembatas, barang dan kapasitas). Modul terkait: `matkom-induksi-dan-rekursi-matematis`. Bacaan lanjut: halaman cppreference tentang `std::max` dan `std::vector`.
