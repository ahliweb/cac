## Untuk siapa modul ini

Modul ini untuk murid kelas XII jalur A (Algoritmik dengan C++), minggu `A-XII2-M10` silabus v1.4.1: ulasan strategi. Prasyarat: modul `a-xii2-m9` dan `a-xi2-m4` (DP pada string). Keluaran minggu ini adalah **tabel pemilihan** antara greedy, pemrograman dinamis (DP), dan pencarian lengkap, dengan justifikasi efisiensi.

Modul ini karangan penyusun dan disetujui pemilik program pada 2026-11-20 (keputusan lewat dialog; catatan tinjauan menjadi tindak lanjut revisi). Butir capaian pembelajaran yang bertaut: `F-BK-b` (beberapa strategi dan justifikasi efisiensi). Tiap soal latihan bertanda `AI: boleh` atau `AI: tanpa AI`. Masukan program diberikan lewat berkas: `./program < masukan.txt`. Semua angka dan data karangan.

## Ingat kembali

Jawab dari ingatan dulu, baru cek di kunci. Soal 1 dari `a-xii2-m9`, soal 2 dari `a-xii2-m7`, soal 3 dari `a-xii2-m2`.

1. Struktur data apa yang dipilih untuk jumlah rentang dengan pembaruan, dan berapa langkah tiap operasi?
2. Sebutkan empat golongan galat dan satu contoh untuk tiap golongan.
3. Apa risiko mengoptimalkan tanpa uji pembanding?

## Tujuan

Setelah modul ini kamu dapat:

- menyebut ciri masalah yang cocok untuk greedy, DP, dan pencarian lengkap;
- menjalankan ketiga strategi pada satu masalah kecil dan membandingkan jawaban dan kerjanya;
- mencari contoh tandingan untuk sebuah greedy;
- menyusun tabel pemilihan strategi beserta alasan efisiensinya (keluaran minggu ini).

## Prediksi dulu

**Tebak dulu, tulis jawabanmu, baru jalankan.** Knapsack kecil: kapasitas 10 dan tiga barang `(berat, nilai)`: `(6, 30)`, `(5, 20)`, `(5, 20)`. Greedy berikut mengurutkan menurut nilai per berat (dibandingkan lewat perkalian silang agar tak ada pembagian) lalu mengambil barang yang masih muat.

```cpp
#include <algorithm>
#include <iostream>
#include <vector>
using namespace std;

int main() {
  int W = 10;
  vector<pair<int, int>> barang = {{6, 30}, {5, 20}, {5, 20}};
  sort(barang.begin(), barang.end(), [](const pair<int, int>& a, const pair<int, int>& b) {
    return a.second * b.first > b.second * a.first;
  });
  int sisa = W;
  int nilai = 0;
  for (auto& b : barang) {
    if (b.first <= sisa) {
      sisa -= b.first;
      nilai += b.second;
    }
  }
  cout << nilai << "\n";
}
```

1. Barang mana yang diambil, dan berapa nilai yang tercetak?
2. Adakah pilihan barang dengan nilai total lebih besar? Cari dengan tangan.

Simpan tebakanmu. Perbandingannya ada di bagian berikutnya.

## Contoh terselesaikan

Keluaran program tadi:

```text
30
```

Rasio nilai per berat: `5`, `4`, `4`. Greedy mengambil `(6, 30)`, lalu `(5, 20)` tak muat (sisa 4), jadi 30. Padahal dua barang berberat 5 muat dan bernilai `20 + 20 = 40`. Pilihan lokal "rasio terbaik" menutup kemungkinan yang lebih baik: itu contoh tandingan.

Program berikut menjalankan **tiga strategi** pada tiap kasus: greedy rasio, pencarian lengkap atas semua himpunan bagian (`2^n`, lewat bit pada `mask`), dan DP satu dimensi (modul `a-xi2-m3`), lalu menandai bila greedy salah. Kasus kedua sengaja ramah bagi greedy.

```cpp
#include <algorithm>
#include <iostream>
#include <vector>
using namespace std;

int main() {
  int t;
  cin >> t;
  for (int kasus = 1; kasus <= t; kasus++) {
    int n;
    int W;
    cin >> n >> W;
    vector<int> w(n);
    vector<int> v(n);
    for (int i = 0; i < n; i++) {
      cin >> w[i] >> v[i];
    }
    vector<int> urut(n);
    for (int i = 0; i < n; i++) {
      urut[i] = i;
    }
    sort(urut.begin(), urut.end(), [&](int a, int b) { return v[a] * w[b] > v[b] * w[a]; });
    int sisa = W;
    int greedy = 0;
    for (int i : urut) {
      if (w[i] <= sisa) {
        sisa -= w[i];
        greedy += v[i];
      }
    }
    int lengkap = 0;
    for (int mask = 0; mask < (1 << n); mask++) {
      int berat = 0;
      int nilai = 0;
      for (int i = 0; i < n; i++) {
        if (mask & (1 << i)) {
          berat += w[i];
          nilai += v[i];
        }
      }
      if (berat <= W && nilai > lengkap) {
        lengkap = nilai;
      }
    }
    vector<int> dp(W + 1, 0);
    for (int i = 0; i < n; i++) {
      for (int c = W; c >= w[i]; c--) {
        dp[c] = max(dp[c], dp[c - w[i]] + v[i]);
      }
    }
    cout << "kasus " << kasus << ": greedy " << greedy << ", lengkap " << lengkap << " (" << (1 << n) << " himpunan), DP " << dp[W]
         << " (" << n * W << " sel)" << (greedy < lengkap ? "  <- greedy salah" : "") << "\n";
  }
}
```

Masukan (`masukan.txt`):

```text
2
3 10
6 30
5 20
5 20
3 10
2 3
3 4
4 5
```

Keluaran:

```text
kasus 1: greedy 30, lengkap 40 (8 himpunan), DP 40 (30 sel)  <- greedy salah
kasus 2: greedy 12, lengkap 12 (8 himpunan), DP 12 (30 sel)
```

Hitung kerjanya. Greedy hanya mengurutkan: `O(n log n)`. Pencarian lengkap mencoba `2^n` himpunan dan menjumlah `n` barang tiap kali: `O(n * 2^n)`, 24 langkah jumlah untuk `n = 3` tetapi sekitar `20 * 10^6` untuk `n = 20`. DP mengisi `n * W` sel: 30 sel di sini. Greedy tercepat tetapi tak selalu benar; pencarian lengkap selalu benar tetapi hanya untuk `n` kecil; DP benar selama `W` kecil. Pada kasus kedua ketiganya sama (12), tetapi kecocokan pada satu kasus bukan bukti; greedy hanya dipakai bila ada bukti atau uji pembanding pada masukan kecil (modul `a-xi1-m6`).

**Tabel pemilihan strategi.** Pertanyaan yang diajukan berurutan:

| Pertanyaan | Bila ya | Bila tidak |
| --- | --- | --- |
| Adakah pilihan lokal yang terbukti aman (tak merugikan pilihan berikutnya)? | greedy, `O(n log n)` | lanjut |
| Apakah submasalah bertumpang-tindih dan keadaannya kecil (mis. `n * W` muat)? | DP | lanjut |
| Apakah `n` cukup kecil untuk `2^n` (sekitar `n <= 20`)? | pencarian lengkap, tambah pemangkasan bila bisa | cari model lain atau batasan baru |

## Contoh setengah jadi

Lengkapi dua tempat bertanda `____` pada DP knapsack satu dimensi. Petunjuk: kapasitas diulang dari besar ke kecil, dan barang menambah nilainya sendiri. Kuncinya ada di `Kunci dan petunjuk`.

```cpp setengah-jadi
#include <algorithm>
#include <iostream>
#include <vector>
using namespace std;

int main() {
  int n;
  int W;
  cin >> n >> W;
  vector<int> dp(W + 1, 0);
  for (int i = 0; i < n; i++) {
    int w;
    int v;
    cin >> w >> v;
    for (int c = ____; c >= w; c--) {
      dp[c] = max(dp[c], dp[c - w] + ____);
    }
  }
  cout << dp[W] << "\n";
}
```

## Soal Parsons

`AI: tanpa AI`. Susun baris berikut menjadi isi `main` yang mencari nilai terbaik dengan pencarian lengkap pada tiga barang tetap; `#include` dan deklarasi `n`, `W`, `w`, `v` sudah ada. Kunci tercantum.

```text
cout << terbaik << "\n";
  int nilai = 0;
      berat += w[i];
  if (berat <= W && nilai > terbaik) {
int terbaik = 0;
    }
for (int mask = 0; mask < (1 << n); mask++) {
  int berat = 0;
  for (int i = 0; i < n; i++) {
    if (mask & (1 << i)) {
      nilai += v[i];
    terbaik = nilai;
  }
  }
}
```

## Latihan

1. `AI: boleh` Untuk tiga situasi (jumlah barang 15 dengan kapasitas `10^9`; seribu barang dengan kapasitas 1000; jadwal kegiatan yang dipilih menurut waktu selesai) pilih strategi dan tulis alasannya dengan perkiraan langkah.
2. `AI: boleh` Cari contoh tandingan untuk greedy "ambil nilai terbesar dulu" pada knapsack berkapasitas 10 dengan barang `(9, 10)`, `(5, 6)`, `(5, 6)`. Apakah greedy rasio juga salah pada contoh itu?
3. `AI: tanpa AI` Dengan `n = 25` dan `W = 10^9`, hitung banyak himpunan bagian dan banyak sel DP, lalu pilih strategi menurut pedoman seratus juta langkah per detik.
4. `AI: boleh` Mengapa memilih kegiatan yang selesai paling awal tak memerlukan DP (modul `a-xi1-m6`)?
5. `AI: boleh` Untuk subsekuens persekutuan terpanjang dua kata sepanjang 1000 (modul `a-xi2-m4`), strategi apa yang layak, dan berapa selnya?

## Latihan bercampur

1. `AI: boleh` Greedy rasio mengurutkan semua barang. Kapan `priority_queue` lebih tepat daripada `sort` untuk memilih yang terbaik berulang kali (modul `a-xii2-m9`)?
2. `AI: tanpa AI` DP banyak cara menaiki `n` anak tangga (satu atau dua anak tangga sekali langkah) menghasilkan bilangan sangat besar untuk `n = 50`. Tulis peralihan dengan modulo `10^9 + 7` (modul `a-xii1-m8`) dan jalankan.

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `a-xii2-m11` (pertanyaan 1), sekitar tiga minggu lagi di `a-xii2-m13` (pertanyaan 2), dan sekitar empat minggu lagi di `a-xii2-m14` (pertanyaan 3). Jawab sekarang lalu simpan.

1. Apa tiga pertanyaan pada tabel pemilihan strategi, dan dalam urutan apa diajukan?
2. Mengapa greedy rasio salah pada knapsack `(6, 30)`, `(5, 20)`, `(5, 20)` dengan kapasitas 10?
3. Mengapa pencarian lengkap `2^n` layak untuk `n = 20` tetapi tidak untuk `n = 40`?

## Kesalahan umum

- **Mengira greedy benar karena benar pada contoh.** Cari contoh tandingan dan uji dengan pencarian lengkap pada data kecil.
- **Memakai DP tanpa memeriksa ukuran tabel.** `n * W` dengan `W = 10^9` tak muat.
- **Memakai pencarian lengkap tanpa menghitung `2^n`.** Hitung dulu apakah masuk pedoman seratus juta langkah per detik.
- **Mengulang kapasitas dari kecil ke besar pada knapsack 0/1 satu dimensi.** Satu barang terambil berkali-kali.
- **Memilih strategi tanpa menulis alasannya.** Tabel pemilihan tanpa justifikasi efisiensi belum selesai.

## Cek mandiri

- [ ] Saya dapat menyebut ciri masalah untuk greedy, DP, dan pencarian lengkap.
- [ ] Saya dapat mencari contoh tandingan untuk sebuah greedy.
- [ ] Saya dapat menghitung `2^n` dan `n * W` untuk menilai kelayakan.
- [ ] Saya dapat menulis tabel pemilihan beserta alasannya.
- [ ] Saya dapat menjelaskan mengapa kapasitas diulang dari besar ke kecil.

## Kunci dan petunjuk

**Ingat kembali.** 1: Fenwick; `tambah` dan `prefiks` masing-masing `O(log n)` (tanpa pembaruan, jumlah prefiks biasa cukup). 2: salah baca soal (menjawab "kurang dari S" padahal "paling banyak S"); salah model (DP genteng dengan satu keadaan); galat penulisan kode (`>=` bukan `>`); galat efisiensi (loop ganda `O(n^2)` pada `n = 2 * 10^5` kena batas waktu). 3: versi cepat yang salah lebih berbahaya daripada versi lambat yang benar; tanpa pembanding, jawaban yang salah pada masukan tertentu tak terdeteksi, sedangkan uji pembanding berbenih tetap pada ukuran kecil menangkapnya.

**Prediksi dulu.** 1: urutan rasio `(6, 30)`, `(5, 20)`, `(5, 20)`; hanya `(6, 30)` diambil, nilai 30. 2: ya, `(5, 20)` dan `(5, 20)` muat (berat 10) dengan nilai 40.

**Contoh setengah jadi.** Isi: `W` dan `v`. Program lengkap:

```cpp
#include <algorithm>
#include <iostream>
#include <vector>
using namespace std;

int main() {
  int n;
  int W;
  cin >> n >> W;
  vector<int> dp(W + 1, 0);
  for (int i = 0; i < n; i++) {
    int w;
    int v;
    cin >> w >> v;
    for (int c = W; c >= w; c--) {
      dp[c] = max(dp[c], dp[c - w] + v);
    }
  }
  cout << dp[W] << "\n";
}
```

Masukan:

```text
3 10
6 30
5 20
5 20
```

Keluaran:

```text
40
```

Hasil 40 sama dengan pencarian lengkap.

**Soal Parsons.** Urutan benar sama dengan isi `main` berikut (15 baris; indentasi dihitung dari isi `main`):

```cpp
#include <iostream>
using namespace std;

int main() {
  int n = 3;
  int W = 10;
  int w[] = {6, 5, 5};
  int v[] = {30, 20, 20};
  int terbaik = 0;
  for (int mask = 0; mask < (1 << n); mask++) {
    int berat = 0;
    int nilai = 0;
    for (int i = 0; i < n; i++) {
      if (mask & (1 << i)) {
        berat += w[i];
        nilai += v[i];
      }
    }
    if (berat <= W && nilai > terbaik) {
      terbaik = nilai;
    }
  }
  cout << terbaik << "\n";
}
```

```text
40
```

**Latihan.** 1: 15 barang dengan `W = 10^9`: pencarian lengkap `2^15 = 32768` himpunan, layak; seribu barang dengan `W = 1000`: DP `10^6` sel, layak; jadwal kegiatan: greedy menurut selesai paling awal, `O(n log n)`. 2: greedy nilai terbesar mengambil `(9, 10)` (sisa 1) sehingga nilainya 10, padahal `(5, 6)` dan `(5, 6)` memberi 12. Greedy rasio mengurutkan `(5, 6)` (rasio 1,2) sebelum `(9, 10)` (rasio sekitar 1,11) sehingga memberi 12, benar di sini; greedy rasio tetap salah pada contoh bagian Contoh terselesaikan. 3:

```cpp
#include <iostream>
using namespace std;

int main() {
  long long n = 25;
  long long W = 1000000000;
  cout << (1LL << n) << " " << n * W << "\n";
}
```

```text
33554432 25000000000
```

Himpunan bagian sekitar `3,4 * 10^7`, layak (dikali 25 untuk penjumlahan tetap sekitar `8 * 10^8`, perlu hati-hati). Sel DP `2,5 * 10^10`, tak layak. Pilih pencarian lengkap, dengan pemangkasan bila mungkin. 4: kegiatan yang selesai paling awal menyisakan waktu terbanyak sehingga tak merugikan pilihan berikutnya; keadaan DP tak diperlukan. 5: DP dua dimensi, `1001 * 1001`, sekitar satu juta sel; pencarian lengkap atas subsekuens `2^1000` mustahil.

**Latihan bercampur.** 1: `priority_queue` tepat bila elemen baru terus masuk dan yang terbaik diambil berulang; `sort` cukup bila datanya tetap dan urutannya dipakai sekali. 2: `dp[i] = (dp[i - 1] + dp[i - 2]) % MOD`, dengan `dp[0] = dp[1] = 1`:

```cpp
#include <iostream>
#include <vector>
using namespace std;

int main() {
  const long long MOD = 1000000007;
  int n = 50;
  vector<long long> dp(n + 1, 0);
  dp[0] = 1;
  dp[1] = 1;
  for (int i = 2; i <= n; i++) {
    dp[i] = (dp[i - 1] + dp[i - 2]) % MOD;
  }
  cout << dp[n] << "\n";
}
```

```text
365010934
```

Jumlah cara sebenarnya `20365011074`, sisanya modulo `10^9 + 7` adalah 365010934.

## Langkah berikutnya

Modul berikutnya, `a-xii2-m11`, adalah proyek akhir tahap pertama: rancangan. Bawa tabel pemilihan strategi dan struktur datamu karena rancangan proyek memintanya. Modul terkait: `a-xi2-m3`. Bacaan lanjut: halaman cppreference tentang `std::sort` dan `std::vector`.
