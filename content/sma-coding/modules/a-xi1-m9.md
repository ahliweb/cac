## Untuk siapa modul ini

Modul ini untuk murid kelas XI jalur A (Algoritmik dengan C++), minggu `A-XI1-M9` silabus v1.4.1: pustaka standar `pair`, `set`, dan `map`. Prasyarat: modul `a-xi1-m8` (pengurutan dan pembanding).

Modul ini karangan penyusun dan disetujui pemilik program pada 2026-11-20 (keputusan lewat dialog; catatan tinjauan menjadi tindak lanjut revisi). Butir `F-AP-a`, `F-AP-b`, `F-AP-d`, dan `F-BK-c` dipetakan silabus sebagai dipenuhi jalur ini; pemenuhan butir mengikuti pemetaan silabus, bukan status modul. Keluarga materi OSN yang bertaut: `struktur-data` (set dan map sesuai panduan, bukan pengayaan).

Tiap soal latihan bertanda `AI: boleh` atau `AI: tanpa AI`. Masukan program diberikan lewat berkas: `./program < masukan.txt`. Semua data di modul ini karangan.

## Ingat kembali

Jawab dari ingatan dulu, baru cek di kunci. Soal 1 dari `a-xi1-m8`, soal 2 dari `a-xi1-m6`, soal 3 dari `a-xi1-m1`.

1. Mengapa pembanding untuk `std::sort` memakai `<`, bukan `<=`?
2. Mengapa memilih kegiatan yang selesai paling awal tidak merugikan pilihan berikutnya?
3. Mengapa cacat spesifikasi lebih murah diperbaiki sebelum program ditulis daripada sesudahnya?

## Tujuan

Setelah modul ini kamu dapat:

- memakai `pair` untuk menyimpan dua nilai dan mengurutkannya;
- memakai `set` untuk membuang duplikat dan memeriksa keanggotaan;
- memakai `map` untuk menghitung frekuensi dan mencari nilai menurut kunci;
- memilih antara `vector`, `set`, dan `map` dengan alasan yang menyebut banyak langkahnya.

## Prediksi dulu

Ini tugas baca-dan-prediksi, `AI: tanpa AI`. **Tebak dulu, tulis jawabanmu, baru jalankan.** Program menghitung kemunculan kata dengan `map`.

```cpp
#include <iostream>
#include <map>
#include <string>
#include <vector>
using namespace std;

int main() {
  vector<string> kata = {"apel", "jeruk", "apel", "mangga", "jeruk", "apel"};
  map<string, int> frek;
  for (const string& k : kata) {
    frek[k]++;
  }
  for (const auto& p : frek) {
    cout << p.first << ": " << p.second << "\n";
  }
  cout << "banyak kunci: " << frek.size() << "\n";
}
```

1. Apa yang tercetak, dan dalam urutan apa kata muncul?
2. Apakah urutannya sama dengan urutan kata di `vector`? Mengapa?

Simpan tebakanmu. Perbandingannya ada di bagian berikutnya.

## Contoh terselesaikan

Keluaran program tadi:

```text
apel: 3
jeruk: 2
mangga: 1
banyak kunci: 3
```

`map<K, V>` menyimpan pasangan kunci dan nilai, **terurut menurut kunci**, dan tiap kunci muncul sekali. Menulis `frek[k]` mencari kunci `k`; bila belum ada, `map` membuat entri baru dengan nilai awal 0 (untuk `int`), sehingga `frek[k]++` menghitung tanpa pemeriksaan tambahan. Elemen `map` adalah `pair`: `p.first` kuncinya, `p.second` nilainya. `set<T>` mirip tetapi hanya menyimpan kunci, tanpa duplikat.

Berikut masukan dari berkas: `n` kata, dihitung dengan `map`, lalu dicari yang paling sering.

```cpp
#include <iostream>
#include <map>
#include <string>
using namespace std;

int main() {
  int n;
  cin >> n;
  map<string, int> frek;
  for (int i = 0; i < n; i++) {
    string kata;
    cin >> kata;
    frek[kata]++;
  }
  string terbanyak;
  int jumlah = 0;
  for (const auto& p : frek) {
    cout << p.first << ": " << p.second << "\n";
    if (p.second > jumlah) {
      jumlah = p.second;
      terbanyak = p.first;
    }
  }
  cout << "paling sering: " << terbanyak << " (" << jumlah << ")\n";
}
```

Masukan (`masukan.txt`):

```text
8
buku pena buku tas pena buku tas penghapus
```

Keluaran:

```text
buku: 3
pena: 2
penghapus: 1
tas: 2
paling sering: buku (3)
```

Pada seri yang sama jumlahnya, kata pertama menurut abjad menang karena `>` tidak mengganti. Sekarang `set` untuk membuang duplikat dan `pair` untuk menyimpan dua nilai sekaligus.

```cpp
#include <algorithm>
#include <iostream>
#include <set>
#include <string>
#include <utility>
#include <vector>
using namespace std;

int main() {
  int n;
  cin >> n;
  set<int> ada;
  for (int i = 0; i < n; i++) {
    int x;
    cin >> x;
    ada.insert(x);
  }
  cout << ada.size() << " nilai berbeda:";
  for (int y : ada) {
    cout << " " << y;
  }
  cout << "\n";
  vector<pair<int, string>> v = {{3, "c"}, {1, "z"}, {3, "a"}, {2, "m"}};
  sort(v.begin(), v.end());
  for (const auto& p : v) {
    cout << "(" << p.first << ", " << p.second << ") ";
  }
  cout << "\n";
}
```

Masukan (`masukan.txt`):

```text
9
5 3 8 3 5 5 1 9 8
```

Keluaran:

```text
5 nilai berbeda: 1 3 5 8 9
(1, z) (2, m) (3, a) (3, c) 
```

`pair` dibandingkan **leksikografis**: `first` dulu, `second` hanya bila `first` sama (cppreference), maka `(3, "a")` mendahului `(3, "c")`. Mengapa tidak cukup `vector` biasa? Satu operasi `set` atau `map` memerlukan `O(log n)` langkah (cppreference). Memasukkan `n` data memerlukan sekitar `n log2 n` langkah, sedangkan menelusuri `vector` tiap kali untuk mencari duplikat sekitar `n * n / 2`. Program berikut menghitung angkanya.

```cpp
#include <cmath>
#include <iomanip>
#include <iostream>
using namespace std;

int main() {
  cout << fixed << setprecision(0);
  long long ukuran[3] = {1000, 100000, 1000000};
  for (int k = 0; k < 3; k++) {
    long long n = ukuran[k];
    cout << "n = " << n << ": set sekitar " << n * log2((double)n) << " langkah, vector sekitar " << n * n / 2 << " langkah\n";
  }
}
```

Keluaran:

```text
n = 1000: set sekitar 9966 langkah, vector sekitar 500000 langkah
n = 100000: set sekitar 1660964 langkah, vector sekitar 5000000000 langkah
n = 1000000: set sekitar 19931569 langkah, vector sekitar 500000000000 langkah
```

Pada `n = 100000` pendekatan `vector` sekitar 5.000.000.000 langkah, sedangkan `set` sekitar 1.700.000. Jadi pendekatan `set` `O(n log n)`, pendekatan `vector` `O(n^2)`. Harganya: `set` dan `map` memakai lebih banyak memori per elemen dan tidak bisa diakses dengan indeks `v[i]`.

## Contoh setengah jadi

Lengkapi program yang menghitung frekuensi bilangan, lalu mencetak tiap bilangan beserta jumlahnya dalam urutan menaik.

```cpp setengah-jadi
map<int, int> frek;
for (int i = 0; i < n; i++) {
  int x;
  cin >> x;
  frek[x]____;
}
for (auto& p : frek) {
  cout << p.____ << ": " << p.____ << "\n";
}
```

## Soal Parsons

Susun delapan baris berikut (sudah diacak) menjadi program yang mencetak banyak nilai berbeda, lalu nilai-nilai itu menaik. `AI: tanpa AI`: tujuannya melatih membaca urutan.

```text
(a)   for (int y : ada) cout << y << " ";
(b)   set<int> ada;
(c)   cout << ada.size() << "\n";
(d)   int x;
(e)   for (int i = 0; i < n; i++) {
(f)     cin >> x;
(g)     ada.insert(x);
(h)   }
```

## Latihan

1. `AI: boleh` **Hitung kata.** Baca `n` kata. Cetak tiap kata beserta jumlahnya, dari yang paling sering; bila sama, menurut abjad. Petunjuk: pindahkan hasil `map` ke `vector<pair<int, string>>` lalu urutkan dengan pembanding. Tulis pseudocode lebih dulu.
2. `AI: boleh` **Hapus duplikat.** Baca `n` bilangan dan cetak tiap bilangan hanya pada kemunculan pertamanya, dengan urutan asli. Petunjuk: `set` untuk mencatat yang sudah terlihat.
3. `AI: tanpa AI` **Prediksi.** Pada `map<string, int> m;` dijalankan `m["a"];` lalu `m["b"] = 2;`. Berapa `m.size()`? Lalu `m.count("c")` bernilai berapa, dan berapa `m.size()` setelah `m["c"];`?
4. `AI: boleh` **Pasangan.** Simpan `n` pasangan `(jarak, kode)` dalam `vector<pair<int, string>>` dan cetak dari jarak terdekat; bila jarak sama, kode menaik.
5. *Opsional:* **catatan pemakaian AI.** Bila memakai AI generatif, jawab nomor 3 sendiri dulu, lalu minta penjelasan atau petunjuk bertahap, bukan program jadi. Catat alatnya, tujuanmu, garis besar perintahmu, bagian yang kamu pakai, dan caramu memeriksanya. Jangan menaruh data pribadi atau tugas bernilai pada perintah.

## Latihan bercampur

1. `AI: boleh` Mengapa `sort` bawaan pada `pair<int, string>` mengurutkan `first` menaik, dan pembanding apa yang membuat `first` menurun tetapi `second` menaik (modul `a-xi1-m8`)?
2. `AI: tanpa AI` Menghapus duplikat dengan `vector` dan `erase` untuk `n = 100000` data yang semuanya berbeda: kira-kira berapa langkah dibanding `set` (modul `a-x2-m6`)?
3. `AI: boleh` Pencarian biner pada `vector` terurut dan `set::find` sama-sama `O(log n)`. Kapan masing-masing lebih tepat (modul `a-x2-m8`)?

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `a-xi1-m10` (pertanyaan 1), sekitar tiga minggu lagi di `a-xi1-m12` (pertanyaan 2), dan sekitar delapan minggu lagi di `a-xi2-m3` (pertanyaan 2). Jawab sekarang lalu simpan.

1. Apa yang terjadi bila `m["x"]` dibaca padahal kunci `"x"` belum ada di `map`?
2. Apa beda `set` dan `map`, dan kapan memilih masing-masing?
3. Kira-kira berapa langkah memasukkan 1.000.000 kunci berbeda ke `map`, dan mengapa isinya selalu terurut menurut kunci?

## Kesalahan umum

- **Membaca dengan `m[k]` untuk sekadar memeriksa.** Kunci yang belum ada ikut dibuat dan `size()` bertambah; pakai `find` atau `count` untuk memeriksa.
- **Mengira `map` mengikuti urutan masuk.** Iterasinya menurut kunci, bukan urutan pemasukan.
- **Mengira `set` menyimpan duplikat.** Memasukkan nilai yang sama lagi tidak mengubah isinya.
- **Mengubah kunci dari `p.first` saat iterasi.** Kunci `map` tidak boleh diubah; hanya `p.second` yang boleh.
- **Memakai `map` padahal cukup array atau `vector`.** Bila kuncinya bilangan kecil yang rapat, larik penghitung lebih sederhana dan cepat.

## Cek mandiri

- [ ] Saya dapat memakai `pair` dan mengurutkannya.
- [ ] Saya dapat membuang duplikat dengan `set`.
- [ ] Saya dapat menghitung frekuensi dengan `map`.
- [ ] Saya tahu `m[k]` membuat entri bila kunci belum ada.
- [ ] Saya dapat membandingkan `vector`, `set`, dan `map` menurut banyak langkahnya.

## Kunci dan petunjuk

**Ingat kembali.** 1: dua elemen setara tidak boleh dinyatakan saling mendahului; `<=` melanggar aturan itu. 2: kegiatan yang selesai paling awal meninggalkan waktu terbanyak, dan kegiatan pertama pada solusi terbaik mana pun dapat ditukar dengannya tanpa bentrok. 3: sebelum kode ditulis cukup mengubah kalimat; sesudahnya rancangan, kode, dan uji yang bersandar pada spesifikasi itu ikut harus diubah.

**Prediksi dulu.** 1: `apel: 3`, `jeruk: 2`, `mangga: 1`, lalu `banyak kunci: 3`. 2: tidak sama; `map` terurut menurut kunci (abjad), bukan urutan masuk.

**Contoh setengah jadi.** Isi: `++`, `first`, `second`. Program lengkap:

```cpp
#include <iostream>
#include <map>
using namespace std;

int main() {
  int n;
  cin >> n;
  map<int, int> frek;
  for (int i = 0; i < n; i++) {
    int x;
    cin >> x;
    frek[x]++;
  }
  for (auto& p : frek) {
    cout << p.first << ": " << p.second << "\n";
  }
}
```

Masukan (`masukan.txt`):

```text
6
4 2 4 4 2 7
```

Keluaran:

```text
2: 2
4: 3
7: 1
```

**Soal Parsons.** Urutan benar: b, d, e, f, g, h, c, a. Deklarasi `set` dan `x` dulu, lalu perulangan baca, lalu cetak banyaknya, lalu isinya.

**Latihan.** 1: pseudocode: baca kata ke `map`; salin ke `vector` pasangan `(jumlah, kata)`; urutkan dengan pembanding (jumlah besar dulu, kata kecil bila sama); cetak. Program contoh:

```cpp
#include <algorithm>
#include <iostream>
#include <map>
#include <string>
#include <utility>
#include <vector>
using namespace std;

bool lebihDulu(const pair<int, string>& a, const pair<int, string>& b) {
  if (a.first != b.first) {
    return a.first > b.first;
  }
  return a.second < b.second;
}

int main() {
  int n;
  cin >> n;
  map<string, int> frek;
  for (int i = 0; i < n; i++) {
    string kata;
    cin >> kata;
    frek[kata]++;
  }
  vector<pair<int, string>> v;
  for (const auto& p : frek) {
    v.push_back({p.second, p.first});
  }
  sort(v.begin(), v.end(), lebihDulu);
  for (const auto& p : v) {
    cout << p.second << " " << p.first << "\n";
  }
}
```

Masukan (`masukan.txt`):

```text
8
buku pena buku tas pena buku tas penghapus
```

Keluaran:

```text
buku 3
pena 2
tas 2
penghapus 1
```

2: program contoh:

```cpp
#include <iostream>
#include <set>
using namespace std;

int main() {
  int n;
  cin >> n;
  set<int> terlihat;
  for (int i = 0; i < n; i++) {
    int x;
    cin >> x;
    if (terlihat.count(x) == 0) {
      terlihat.insert(x);
      cout << x << " ";
    }
  }
  cout << "\n";
}
```

Masukan (`masukan.txt`):

```text
7
4 2 4 9 2 7 9
```

Keluaran:

```text
4 2 9 7 
```

3: setelah `m["a"];` dan `m["b"] = 2;` ukurannya 2; `m.count("c")` bernilai 0; setelah `m["c"];` ukurannya 3, karena `m["c"]` membuat entri baru bernilai 0. 4: pakai `pair<int, string>` dengan `sort` bawaan; urutan jarak lalu kode terjadi otomatis karena perbandingan leksikografis.

**Latihan bercampur.** 1: karena perbandingan `pair` bawaan leksikografis menaik; pembanding: bila `first` berbeda, `return a.first > b.first`, selain itu `return a.second < b.second`. 2: `vector` dengan `erase`: sekitar `n * n / 2 = 5.000.000.000` langkah (tiap pemeriksaan dan penggeseran); `set`: sekitar `100000 * 17 = 1.700.000`. 3: pencarian biner pada `vector` terurut cocok bila data tetap dan banyak pertanyaan; `set::find` cocok bila data terus bertambah atau berkurang di sela pencarian.

**Ulang berjarak.** 1: `map` membuat entri baru bernilai awal (0 untuk `int`) dan `size()` bertambah. 2: `set` menyimpan kunci saja; `map` menyimpan pasangan kunci dan nilai; pakai `set` untuk keanggotaan dan `map` untuk menghitung atau menyimpan data per kunci. 3: sekitar `1.000.000 * 20 = 20.000.000` langkah; `map` disimpan dalam struktur pohon seimbang yang mengurutkan kunci (cppreference menyebut `set` biasanya berupa pohon merah-hitam; `map` terurut menurut kunci dengan cara serupa).

## Langkah berikutnya

Modul berikut: `a-xi1-m10` (antrian prioritas atau heap). Modul terkait: `matkom-himpunan-relasi-fungsi`. Bacaan lanjut: halaman cppreference tentang `std::map`, `std::set`, dan `std::pair`.
