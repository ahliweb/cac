## Untuk siapa modul ini

Modul ini untuk murid kelas XI jalur A (Algoritmik dengan C++), minggu `A-XI1-M12` silabus v1.4.1: membandingkan strategi. Prasyarat: modul `a-xi1-m11` (backtracking) dan seluruh modul strategi sebelumnya, terutama greedy dan pencarian lengkap.

Modul ini berstatus DRAF: karangan penyusun, belum ditinjau pemilik. Butir `F-AP-a`, `F-AP-b`, dan `F-BK-b` dipetakan silabus sebagai dipenuhi jalur ini; modul draf ini belum dihitung sebagai pemenuhan. Keluarga materi OSN yang bertaut: `strategi-problem-solving`. Pemrograman dinamis (DP) baru dibahas penuh di semester berikutnya; di sini kamu hanya mencicipi "DP kecil" sebagai pembanding dan tidak diharapkan menguasainya.

Tiap soal latihan bertanda `AI: boleh` atau `AI: tanpa AI`. Semua soal karangan.

## Ingat kembali

Jawab dari ingatan dulu, baru cek di kunci. Soal 1 dari `a-xi1-m11`, soal 2 dari `a-xi1-m9`, soal 3 dari `a-xi1-m4`.

1. Sebutkan tiga bagian tiap langkah backtracking.
2. Apa beda `set` dan `map`, dan kapan memilih masing-masing?
3. Mengapa pemangkasan tidak mengubah kompleksitas kasus terburuk pencarian lengkap?

## Tujuan

Setelah modul ini kamu dapat:

- menulis tiga solusi untuk satu masalah: greedy, pencarian lengkap, dan DP kecil;
- menghitung banyak langkah masing-masing dan mencari data yang membuat greedy salah;
- memilih strategi dengan alasan yang menyebut kebenaran, banyak langkah, dan memori;
- menyusun laporan perbandingan satu halaman (keluaran minggu ini).

## Prediksi dulu

Ini tugas baca-dan-prediksi, `AI: tanpa AI`. **Tebak dulu, tulis jawabanmu, baru jalankan.** Mesin voucher karangan memberi potongan 4, 3, atau 1 poin. Untuk mencapai tepat `T` poin dengan voucher sesedikit mungkin, program memilih voucher terbesar yang masih muat, berulang kali.

```cpp
#include <iostream>
#include <vector>
using namespace std;

int serakah(const vector<int>& voucher, int T) {
  int jumlah = 0;
  for (int v : voucher) {
    jumlah += T / v;
    T = T % v;
  }
  return jumlah;
}

int main() {
  vector<int> voucher = {4, 3, 1};
  cout << "T = 6: " << serakah(voucher, 6) << " voucher\n";
  cout << "T = 7: " << serakah(voucher, 7) << " voucher\n";
}
```

1. Apa yang tercetak?
2. Adakah cara memakai lebih sedikit voucher untuk `T = 6`? Tulis caranya.

Simpan tebakanmu. Perbandingannya ada di bagian berikutnya.

## Contoh terselesaikan

Keluaran program tadi:

```text
T = 6: 3 voucher
T = 7: 2 voucher
```

Untuk `T = 6` greedy memilih `4 + 1 + 1`, tiga voucher, padahal `3 + 3` hanya dua. Greedy cepat tetapi **tidak selalu benar**; kebenarannya bergantung pada himpunan voucher. Dua strategi lain selalu benar. **Pencarian lengkap** mencoba setiap voucher pertama, lalu menyelesaikan sisanya dengan cara yang sama: `terbaik(T) = 1 + min(terbaik(T - v))` atas voucher yang muat. **DP kecil** memakai pengamatan bahwa sisa yang sama dihitung berulang: ia mengisi tabel `dp[t]` dari `t = 1` sampai `T`, sehingga tiap nilai dihitung sekali. Program berikut menjalankan ketiganya dan menghitung langkahnya.

```cpp
#include <algorithm>
#include <iostream>
#include <vector>
using namespace std;

const int TAK_HINGGA = 1000000;

int serakah(const vector<int>& voucher, int T) {
  int jumlah = 0;
  for (int v : voucher) {
    jumlah += T / v;
    T = T % v;
  }
  return jumlah;
}

int lengkap(const vector<int>& voucher, int T, long long& panggilan) {
  panggilan++;
  if (T == 0) {
    return 0;
  }
  int terbaik = TAK_HINGGA;
  for (int v : voucher) {
    if (v <= T) {
      terbaik = min(terbaik, 1 + lengkap(voucher, T - v, panggilan));
    }
  }
  return terbaik;
}

int tabel(const vector<int>& voucher, int T, long long& langkah) {
  vector<int> dp(T + 1, TAK_HINGGA);
  dp[0] = 0;
  for (int t = 1; t <= T; t++) {
    for (int v : voucher) {
      langkah++;
      if (v <= t && dp[t - v] + 1 < dp[t]) {
        dp[t] = dp[t - v] + 1;
      }
    }
  }
  return dp[T];
}

int main() {
  vector<int> voucher = {4, 3, 1};
  int uji[4] = {6, 10, 20, 30};
  for (int i = 0; i < 4; i++) {
    int T = uji[i];
    long long panggilan = 0;
    long long langkah = 0;
    int a = serakah(voucher, T);
    int b = lengkap(voucher, T, panggilan);
    int c = tabel(voucher, T, langkah);
    cout << "T = " << T << ": serakah " << a << ", lengkap " << b << " (" << panggilan << " pemanggilan), tabel " << c << " (" << langkah << " langkah)\n";
  }
}
```

Keluaran:

```text
T = 6: serakah 3, lengkap 2 (24 pemanggilan), tabel 2 (18 langkah)
T = 10: serakah 4, lengkap 3 (168 pemanggilan), tabel 3 (30 langkah)
T = 20: serakah 5, lengkap 5 (20736 pemanggilan), tabel 5 (60 langkah)
T = 30: serakah 9, lengkap 8 (2550408 pemanggilan), tabel 8 (90 langkah)
```

Baca angkanya. Greedy salah pada `T = 6`, `10`, dan `30`, tetapi kebetulan benar pada `T = 20`: **satu contoh yang benar tidak membuktikan greedy benar**. Pencarian lengkap selalu benar, namun pemanggilannya naik sekitar 123 kali lipat tiap tambahan 10 poin (168, lalu 20.736, lalu 2.550.408): ia eksponensial dalam `T`, tidak layak untuk `T` ribuan. DP kecil selalu benar dengan `T * k` langkah (`k` banyak jenis voucher): `O(T * k)`. Harganya adalah larik `dp` sepanjang `T + 1`. Greedy sendiri `O(k)` per pertanyaan dan hampir tanpa memori.

| Strategi | Benar? | Langkah | Memori | Cocok bila |
| --- | --- | --- | --- | --- |
| Greedy | hanya bila terbukti atau diuji untuk himpunannya | sangat sedikit | hampir tanpa | pilihan lokal terbaik terbukti aman |
| Pencarian lengkap | selalu | eksponensial | sedikit (tumpukan) | `T` atau `n` sangat kecil, atau sebagai pemeriksa |
| DP kecil | selalu | `T * k` | larik `T + 1` | submasalah berulang dan `T` tidak raksasa |

Kebiasaan yang berguna: tulis solusi lengkap yang lambat tetapi pasti benar, lalu pakai untuk **memeriksa** solusi cepat pada data kecil.

## Contoh setengah jadi

Lengkapi pengisian tabel DP untuk voucher `{1, 3, 4}`.

```cpp setengah-jadi
vector<int> dp(T + 1, 1000000);
dp[0] = ____;
for (int t = 1; t <= T; t++) {
  for (int v : voucher) {
    if (v <= t && dp[t - v] + 1 < dp[t]) {
      dp[t] = dp[t - v] + ____;
    }
  }
}
```

## Soal Parsons

Susun delapan baris berikut (sudah diacak) menjadi fungsi yang mengembalikan voucher paling sedikit untuk `T`. `AI: tanpa AI`: tujuannya melatih membaca urutan.

```text
(a)   dp[0] = 0;
(b)   for (int t = 1; t <= T; t++) {
(c)   vector<int> dp(T + 1, TAK_HINGGA);
(d)     for (int v : voucher) {
(e)       if (v <= t) dp[t] = min(dp[t], dp[t - v] + 1);
(f)     }
(g)   }
(h)   return dp[T];
```

## Latihan

1. `AI: boleh` **Cari kegagalan.** Untuk voucher `{6, 5, 1}`, tulis program yang mencari `T` terkecil sampai 30 tempat greedy dan DP berbeda. Tulis pseudocode lebih dulu.
2. `AI: tanpa AI` **Pilih strategi.** Pilih satu strategi dan beri alasan untuk tiap keadaan: (a) voucher `{1, 5, 10, 25}` dan banyak pertanyaan; (b) 20 bilangan dan dicari himpunan bagian yang jumlahnya tepat `T`; (c) voucher `{1, 3, 4}` dan `T = 100000`.
3. `AI: boleh` **Laporan.** Tulis laporan satu halaman untuk keluaran contoh pada `T = 30`: tabel tiga strategi (hasil, langkah, memori), strategi yang kamu pilih, dan alasannya.
4. `AI: boleh` **Voucher apa saja.** Tambahkan ke solusi DP pencatatan voucher yang dipakai, lalu cetak pilihan untuk `T = 10`.
5. *Opsional:* **catatan pemakaian AI.** Bila memakai AI generatif, jawab nomor 2 sendiri dulu, lalu minta penjelasan atau petunjuk bertahap, bukan program jadi. Catat alatnya, tujuanmu, garis besar perintahmu, bagian yang kamu pakai, dan caramu memeriksanya. Jangan menaruh data pribadi atau tugas bernilai pada perintah.

## Latihan bercampur

1. `AI: boleh` Gambar pohon pemanggilan `lengkap` untuk `T = 6` dengan voucher `{1, 3, 4}`. Sisa mana yang dihitung berulang (modul `a-xi1-m11`)?
2. `AI: boleh` Greedy memerlukan voucher terurut menurun. Tulis pembanding untuk `std::sort` yang melakukannya (modul `a-xi1-m8`).
3. `AI: tanpa AI` Gagasan DP "simpan jawaban agar tidak dihitung ulang" dapat memakai `map<int, int>` dari `T` ke jawabannya. Sebutkan satu keuntungan dan satu kerugian dibanding larik `dp` (modul `a-xi1-m9`).

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `a-xi1-m13` (pertanyaan 1), sekitar tiga minggu lagi di `a-xi2-m1` (pertanyaan 2), dan sekitar delapan minggu lagi di `a-xi2-m6` (pertanyaan 3). Jawab sekarang lalu simpan.

1. Mengapa greedy bisa gagal, dan beri satu contoh voucher yang menunjukkannya?
2. Mengapa pencarian lengkap lambat untuk `T` besar, dan apa yang membuat tabel DP lebih cepat?
3. Apa saja yang perlu ada dalam laporan perbandingan tiga strategi?

## Kesalahan umum

- **Mengira greedy benar karena satu contoh cocok.** `T = 20` di atas cocok, tetapi `T = 6` tidak; uji pada banyak data kecil.
- **Memakai pencarian lengkap untuk `T` besar.** Pemanggilannya tumbuh berlipat; hitung dulu perkiraan langkahnya.
- **Tidak mengurutkan voucher untuk greedy.** Greedy "terbesar dulu" salah bila urutannya acak.
- **Salah nilai awal tabel DP.** `dp[0]` harus 0, dan "tak mungkin" harus bilangan besar yang tidak meluap saat ditambah satu.
- **Laporan tanpa data.** Menyebut "DP lebih baik" tanpa angka langkah tidak dapat diperiksa orang lain.

## Cek mandiri

- [ ] Saya dapat menulis solusi greedy, lengkap, dan DP kecil untuk satu masalah.
- [ ] Saya dapat mencari data yang membuat greedy salah.
- [ ] Saya dapat menghitung banyak langkah tiap strategi.
- [ ] Saya dapat memilih strategi dan menjelaskan alasannya.
- [ ] Saya dapat menyusun laporan perbandingan.

## Kunci dan petunjuk

**Ingat kembali.** 1: memilih, menjelajahi (rekursi), dan membatalkan pilihan. 2: `set` menyimpan kunci saja; `map` menyimpan pasangan kunci dan nilai. 3: bila tak ada cabang yang memenuhi syarat pangkas, semua kemungkinan tetap dijelajahi, sehingga kasus terburuk tetap `2^n`; pemangkasan hanya menghemat pada data yang menguntungkan.

**Prediksi dulu.** 1: `T = 6: 3 voucher` (4 + 1 + 1) dan `T = 7: 2 voucher` (4 + 3). 2: ya, `3 + 3` memakai dua voucher.

**Contoh setengah jadi.** Isi: `0` dan `1`. Program lengkap yang juga mencetak seluruh tabel:

```cpp
#include <iostream>
#include <vector>
using namespace std;

int main() {
  vector<int> voucher = {1, 3, 4};
  int T = 10;
  vector<int> dp(T + 1, 1000000);
  dp[0] = 0;
  for (int t = 1; t <= T; t++) {
    for (int v : voucher) {
      if (v <= t && dp[t - v] + 1 < dp[t]) {
        dp[t] = dp[t - v] + 1;
      }
    }
  }
  for (int t = 0; t <= T; t++) {
    cout << dp[t] << " ";
  }
  cout << "\n";
}
```

Keluaran:

```text
0 1 2 1 1 2 2 2 2 3 3 
```

**Soal Parsons.** Urutan benar: c, a, b, d, e, f, g, h.

**Latihan.** 1: pseudocode: untuk `T` dari 1 sampai 30: hitung `serakah` dan `dp[T]`; cetak `T` pertama yang berbeda. Program contoh:

```cpp
#include <algorithm>
#include <iostream>
#include <vector>
using namespace std;

int main() {
  vector<int> voucher = {6, 5, 1};
  int batas = 30;
  vector<int> dp(batas + 1, 1000000);
  dp[0] = 0;
  for (int t = 1; t <= batas; t++) {
    for (int v : voucher) {
      if (v <= t) {
        dp[t] = min(dp[t], dp[t - v] + 1);
      }
    }
  }
  for (int T = 1; T <= batas; T++) {
    int sisa = T;
    int jumlah = 0;
    for (int v : voucher) {
      jumlah += sisa / v;
      sisa = sisa % v;
    }
    if (jumlah != dp[T]) {
      cout << "T pertama yang berbeda: " << T << " (serakah " << jumlah << ", DP " << dp[T] << ")\n";
      return 0;
    }
  }
  cout << "tidak ada perbedaan sampai " << batas << "\n";
}
```

Keluaran:

```text
T pertama yang berbeda: 10 (serakah 5, DP 2)
```

2: (a) greedy, tetapi hanya setelah diuji; program berikut membandingkan greedy dan DP untuk `{1, 5, 10, 25}` sampai 1000 (itu pengujian, bukan bukti); (b) pencarian lengkap: `2^20 = 1.048.576` himpunan bagian, masih layak; (c) DP: `100000 * 3 = 300000` langkah, sedangkan pencarian lengkap tidak layak.

```cpp
#include <algorithm>
#include <iostream>
#include <vector>
using namespace std;

int main() {
  vector<int> voucher = {25, 10, 5, 1};
  int batas = 1000;
  vector<int> dp(batas + 1, 1000000);
  dp[0] = 0;
  int beda = 0;
  for (int t = 1; t <= batas; t++) {
    for (int v : voucher) {
      if (v <= t) {
        dp[t] = min(dp[t], dp[t - v] + 1);
      }
    }
    int sisa = t;
    int jumlah = 0;
    for (int v : voucher) {
      jumlah += sisa / v;
      sisa = sisa % v;
    }
    if (jumlah != dp[t]) {
      beda++;
    }
  }
  cout << "T yang berbeda sampai " << batas << ": " << beda << "\n";
}
```

Keluaran:

```text
T yang berbeda sampai 1000: 0
```

3: angka dari keluaran contoh untuk `T = 30`: greedy 9 voucher (salah, benar 8) dengan sedikit langkah dan hampir tanpa memori; pencarian lengkap 8 voucher dengan 2.550.408 pemanggilan; tabel 8 voucher dengan 90 langkah dan larik 31 sel. Laporan yang baik memilih DP kecil untuk jawaban pasti dan menyebut angka-angka itu sebagai alasannya. 4: program contoh:

```cpp
#include <iostream>
#include <vector>
using namespace std;

int main() {
  vector<int> voucher = {1, 3, 4};
  int T = 10;
  vector<int> dp(T + 1, 1000000);
  vector<int> pakai(T + 1, 0);
  dp[0] = 0;
  for (int t = 1; t <= T; t++) {
    for (int v : voucher) {
      if (v <= t && dp[t - v] + 1 < dp[t]) {
        dp[t] = dp[t - v] + 1;
        pakai[t] = v;
      }
    }
  }
  cout << dp[T] << " voucher:";
  int sisa = T;
  while (sisa > 0) {
    cout << " " << pakai[sisa];
    sisa -= pakai[sisa];
  }
  cout << "\n";
}
```

Keluaran:

```text
3 voucher: 3 3 4
```

**Latihan bercampur.** 1: `lengkap(6)` memanggil `lengkap(5)`, `lengkap(3)`, `lengkap(2)`; `lengkap(5)` memanggil `4`, `2`, `1`; `lengkap(3)` memanggil `2` dan `0`; `lengkap(2)` memanggil `1`. Sisa `2` dihitung tiga kali (dari 6, dari 5, dari 3): itulah pekerjaan berulang yang dihilangkan tabel DP. 2: `bool lebihDulu(int a, int b) { return a > b; }` lalu `sort(voucher.begin(), voucher.end(), lebihDulu);`. 3: keuntungan: hanya menyimpan sisa yang benar-benar dibutuhkan; kerugian: tiap akses `O(log n)` dan memori per entri lebih besar daripada larik.

**Ulang berjarak.** 1: karena pilihan terbesar yang tampak terbaik saat itu bisa menutup jalan ke solusi yang lebih baik; contoh voucher `{4, 3, 1}` dengan `T = 6`: greedy 3, benar 2. 2: karena sisa yang sama dihitung berulang dan pemanggilan berlipat; tabel menghitung tiap sisa sekali. 3: hasil tiap strategi, banyak langkah (dihitung atau diukur), memori, data yang membuat greedy salah, strategi yang dipilih, dan alasannya.

## Langkah berikutnya

Modul berikut: `a-xi1-m13` (proyek mini yang memadukan strategi). Semester berikutnya membahas DP secara penuh mulai `a-xi2-m1`. Modul terkait: `matkom-induksi-dan-rekursi-matematis`. Bacaan lanjut: halaman cppreference tentang `std::min` dan `std::vector`.
