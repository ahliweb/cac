## Untuk siapa modul ini

Modul ini untuk murid kelas XII jalur A (Algoritmik dengan C++), minggu `A-XII2-M14` silabus v1.4.1: asesmen dan refleksi semester 2 kelas XII, yang menutup jalur A. Prasyarat: modul `a-xii2-m10` dan seluruh modul `a-xii2-m1` sampai `a-xii2-m13`; modul ini menilai strategi, struktur data, pemodelan, pengujian, dan proyek akhir.

Modul ini karangan penyusun dan disetujui pemilik program pada 2026-11-20 (keputusan lewat dialog; catatan tinjauan menjadi tindak lanjut revisi), dan tidak dihitung sebagai pemenuhan butir capaian pembelajaran. Asesmen ini **tanpa AI**: jangan memakai AI generatif saat mengerjakannya (silabus 7.4), karena tujuannya melihat apa yang bisa kamu selesaikan sendiri. Bobot nilai dan predikat mengikuti kebijakan sekolah `[belum terverifikasi]`; modul ini hanya memberi soal dan kunci latihan. Semua data di soal adalah karangan.

## Ingat kembali

Ini inti asesmen: jawab dari ingatan, tanpa melihat catatan, lalu cocokkan dengan kunci. Soal 1 dari `a-xii2-m13`, soal 2 dari `a-xii2-m11`, soal 3 dari `a-xii2-m10`, soal 4 dari `a-xii2-m8`, soal 5 dari `a-xii2-m6`.

1. Apa lima bagian demo lima menit, dan mengapa perlu cadangan keluaran tertulis?
2. Mengapa prototipe bagian paling berisiko ditulis lebih dulu?
3. Mengapa pencarian lengkap `2^n` layak untuk `n = 20` tetapi tidak untuk `n = 40`?
4. Bagaimana memperkirakan dari batas masukan bahwa solusi `O(n^2)` tak layak untuk `n = 2 * 10^5`?
5. Apa tiga hal yang dicatat sesudah kontes mini untuk tiap soal?

## Tujuan

Soal di modul ini menilai apakah kamu dapat:

- memilih greedy, DP, atau pencarian lengkap dengan alasan langkah dan memori;
- memilih struktur data dari operasi yang dibutuhkan;
- menelusuri program kecil dan menemukan galat tipe, luapan, serta strategi yang salah;
- menulis program lalu mengujinya dengan kasus tepi dan menyebut banyak langkahnya.

## Latihan bercampur

Kerjakan sendiri, `AI: tanpa AI`, dengan waktu yang ditetapkan gurumu.

1. **Tulis.** Tulis pseudocode lalu program: ada `n` pesanan dengan waktu memasak `t[i]`, dilayani satu per satu. Hitung jumlah waktu tunggu (waktu sebelum pesanan mulai dimasak) bila urutan dipilih sehingga jumlah itu sekecil mungkin.
2. **Telusuri.** Program berikut dijalankan. Apa yang tercetak, dan apa arti baris kedua dibanding nilai `dp[8]`?

```cpp
#include <algorithm>
#include <iostream>
#include <vector>
using namespace std;

int main() {
  int koin[] = {1, 4, 5};
  int target = 8;
  vector<int> dp(target + 1, 1000);
  dp[0] = 0;
  for (int c = 1; c <= target; c++) {
    for (int k : koin) {
      if (c >= k) {
        dp[c] = min(dp[c], dp[c - k] + 1);
      }
    }
  }
  for (int c = 0; c <= target; c++) {
    cout << dp[c] << (c < target ? " " : "\n");
  }
  int sisa = target;
  int banyak = 0;
  for (int k = 2; k >= 0; k--) {
    while (sisa >= koin[k]) {
      sisa -= koin[k];
      banyak++;
    }
  }
  cout << banyak << "\n";
}
```

3. **Cari galat.** Tiga potongan berikut sengaja salah. Untuk tiap potongan tulis galatnya, akibatnya, dan perbaikannya.

```cpp setengah-jadi
(a) int koin[] = {1, 4, 5};  int sisa = 8, banyak = 0;
    for (int k = 2; k >= 0; k--) while (sisa >= koin[k]) { sisa -= koin[k]; banyak++; }
    // diklaim "paling sedikit koin" untuk semua nilai target
(b) int n = 200000;  int pasangan = n * (n - 1) / 2;  // banyak pasangan kupon
(c) map<string, int> stok;  if (stok["pensil"] > 0) { /* cek apakah ada */ }
```

4. **Praktik.** Bagi programmu dari nomor 1 menjadi fungsi `totalTunggu`, kompilasi dengan `g++ -std=c++17 -Wall -Wextra`, dan tulis tiga uji dengan hasil yang kamu hitung dengan tangan sebelum menjalankan: satu pesanan, tiga pesanan sama, dan urutan menurun.
5. **Memilih.** Pilih strategi atau struktur data, dengan perkiraan langkah: (a) `10^5` data stok dengan kueri jumlah rentang dan koreksi nilai; (b) `22` barang, pilih himpunan terbaik di bawah kapasitas `10^9`; (c) `10^5` kegiatan berwaktu mulai dan selesai, pilih sebanyak mungkin yang tak bertabrakan.

## Refleksi

Tulis jawabanmu di jurnalmu sendiri. Jurnal ini tidak dikumpulkan ke repositori dan tidak ada jawaban benar atau salah; yang dinilai adalah kejujuran dan rencanamu.

1. Apa dua hal yang sekarang sudah kamu kuasai di jalur A? Tulis buktinya (soal atau proyek mana yang kamu selesaikan tanpa ragu).
2. Apa satu hal yang masih keliru atau membingungkan? Soal mana yang memperlihatkannya?
3. Apa yang akan kamu lakukan berbeda dalam proyek berikutnya, dan kapan kamu akan mengulang bagian yang lemah?
4. Dari proyek akhirmu, apa satu keputusan rancangan yang kamu pertahankan dan satu yang akan kamu ubah?

Mengulang bagian yang lemah dengan mencoba mengingat lebih dulu, lalu menjarakkan waktunya, membantu ingatan jangka panjang lebih baik daripada membaca ulang catatan. Karena tidak ada modul jalur A sesudah ini, jadwalkan sendiri pengulanganmu.

## Cek mandiri

- [ ] Saya dapat memilih greedy, DP, atau pencarian lengkap dengan alasan.
- [ ] Saya dapat memilih struktur data dari operasi yang dibutuhkan.
- [ ] Saya dapat menelusuri program kecil dan menemukan galatnya.
- [ ] Saya dapat menulis uji tepi dan menghitung hasilnya dengan tangan.
- [ ] Saya dapat menyebut banyak langkah programku.

## Kunci dan petunjuk

**Ingat kembali.** 1: pertanyaan dan masukan, rancangan, demo langsung, bukti uji dan angka, dan satu hal yang akan diubah; cadangan tertulis ada karena demo langsung bisa gagal. 2: bagian paling berisiko menentukan layak tidaknya rancangan; menulisnya lebih dulu menemukan masalah saat perbaikan masih murah. 3: `2^20` sekitar satu juta, di dalam pedoman seratus juta langkah per detik; `2^40` sekitar satu triliun, jauh di luarnya. 4: `n^2` untuk `n = 2 * 10^5` adalah `4 * 10^10`, ratusan kali di atas pedoman seratus juta langkah per detik. 5: strategi dan alasannya, perkiraan langkah dan batas, serta hasil uji beserta satu hal yang akan diubah; ditulis tiga baris tiap soal sesudah uji ulang.

**Latihan bercampur.** 1: pseudocode: urutkan `t` menaik; `mulai = 0`, `total = 0`; untuk tiap pesanan, `total += mulai` lalu `mulai += t[i]`. Mengerjakan yang tercepat dulu mengecilkan waktu tunggu semua pesanan sesudahnya. Program dengan masukan karangan:

```cpp
#include <algorithm>
#include <iostream>
#include <vector>
using namespace std;

int main() {
  int n;
  cin >> n;
  vector<int> t(n);
  for (int& x : t) {
    cin >> x;
  }
  sort(t.begin(), t.end());
  long long mulai = 0;
  long long total = 0;
  for (int i = 0; i < n; i++) {
    total += mulai;
    mulai += t[i];
  }
  cout << total << "\n";
}
```

Masukan (`masukan.txt`):

```text
5
4 2 7 1 3
```

Keluaran:

```text
20
```

Urutan `1 2 3 4 7`: waktu mulai `0, 1, 3, 6, 10`, jumlahnya 20. Pengurutan `O(n log n)`, perhitungan `O(n)`. 2: keluaran program:

```text
0 1 2 3 1 1 2 3 2
4
```

Baris pertama adalah banyak koin paling sedikit untuk `0` sampai `8`; `dp[8] = 2` (`4 + 4`). Baris kedua, 4 koin (`5 + 1 + 1 + 1`), adalah hasil greedy; greedy lebih buruk dari `dp[8]` pada koin `{1, 4, 5}`. 3: (a) greedy koin tak selalu paling sedikit; pada `{1, 4, 5}` dan target 8 ia memberi 4 padahal 2 mungkin; perbaikan: DP atau uji greedy dengan pencarian lengkap pada data kecil. (b) `n * (n - 1)` meluap pada `int` (jawaban sebenarnya `19999900000`); perbaikan: `long long pasangan = (long long)n * (n - 1) / 2`. (c) `stok["pensil"]` menambah kunci `"pensil"` bernilai 0 bila belum ada, sehingga mengecek mengubah `map`; perbaikan: `stok.count("pensil")` atau `find`. 4: contoh uji dan hasil tangan:

```cpp
#include <algorithm>
#include <iostream>
#include <vector>
using namespace std;

long long totalTunggu(vector<int> t) {
  sort(t.begin(), t.end());
  long long mulai = 0;
  long long total = 0;
  for (size_t i = 0; i < t.size(); i++) {
    total += mulai;
    mulai += t[i];
  }
  return total;
}

int main() {
  cout << totalTunggu({5}) << " " << totalTunggu({3, 3, 3}) << " " << totalTunggu({3, 2, 1}) << "\n";
}
```

```text
0 9 4
```

Satu pesanan: 0. Tiga pesanan bernilai 3: waktu mulai `0, 3, 6`, jumlah 9. Urutan `3, 2, 1` diurutkan menjadi `1, 2, 3`: `0 + 1 + 3 = 4`. Bila `g++` memberi peringatan, baca dan perbaiki. 5: (a) Fenwick: koreksi dan jumlah rentang masing-masing sekitar 17 langkah untuk `10^5`. (b) pencarian lengkap: `2^22` sekitar `4,2 * 10^6` himpunan, dikali 22 untuk penjumlahan sekitar `9,2 * 10^7`, masih mendekati pedoman, sedangkan DP `22 * 10^9` tak layak. (c) greedy menurut waktu selesai paling awal setelah pengurutan, `O(n log n)`.

**Rubrik singkat.** Untuk soal 1 dan 4, periksa empat hal: ketepatan, keterbacaan, pengujian (termasuk nilai batas), dan justifikasi. Skala yang disarankan: sudah, sebagian, belum, per hal. Untuk soal 2, 3, dan 5, jawaban dinilai benar bila angka dan alasan sama dengan kunci atau setara.

**Refleksi.** Tidak ada kunci. Jawaban yang baik menyebut bukti, bagian yang lemah, dan rencana yang jelas waktunya.

## Langkah berikutnya

Ini modul terakhir jalur A. Jadikan hasil refleksi tadi rencana belajar mandirimu: ulangi bagian yang lemah dengan menjarakkan waktu dan mencoba mengingat lebih dulu. Modul terkait: `matkom-pertumbuhan-fungsi` untuk memperdalam perbandingan pertumbuhan langkah. Bacaan lanjut: halaman cppreference tentang `std::sort` dan `std::vector`.
