## Untuk siapa modul ini

Modul ini untuk murid kelas XI jalur A (Algoritmik dengan C++), minggu `A-XI1-M10` silabus v1.4.1: antrian prioritas (heap) dengan `priority_queue`. Prasyarat: modul `a-xi1-m9` (`pair`, `set`, `map`) dan `a-x2-m7` (tumpukan dan antrian).

Modul ini berstatus DRAF: karangan penyusun, belum ditinjau pemilik. Butir `F-AP-a`, `F-AP-b`, `F-AP-d`, dan `F-BK-c` dipetakan silabus sebagai dipenuhi jalur ini; modul draf ini belum dihitung sebagai pemenuhan. Keluarga materi OSN yang bertaut: `struktur-data`; heap ditandai pengayaan (P) di jembatan OSN, sehingga bagian `Pengayaan (P)` (cara kerja heap di dalam larik) boleh dilewati oleh kelas reguler. Memakai `priority_queue` sendiri tetap bagian modul. Modul ini tidak menjanjikan kedalaman soal OSN.

Tiap soal latihan bertanda `AI: boleh` atau `AI: tanpa AI`. Masukan program diberikan lewat berkas: `./program < masukan.txt`. Semua data karangan.

## Ingat kembali

Jawab dari ingatan dulu, baru cek di kunci. Soal 1 dari `a-xi1-m9`, soal 2 dari `a-xi1-m7`, soal 3 dari `a-xi1-m2`.

1. Apa yang terjadi bila `m["x"]` dibaca padahal kunci `"x"` belum ada di `map`?
2. Mengapa pangkat cepat hanya memerlukan sekitar `log n` perkalian?
3. Mengapa fungsi kecil dengan satu tugas lebih mudah diuji daripada satu fungsi panjang?

## Tujuan

Setelah modul ini kamu dapat:

- memakai `priority_queue` dengan `push`, `top`, `pop`, `size`, dan `empty`;
- membuat antrian prioritas yang mengeluarkan nilai terkecil lebih dulu;
- menyelesaikan masalah "k nilai terbesar" dengan heap berukuran k;
- membandingkan heap, pengurutan penuh, dan pencarian sekuensial menurut banyak langkahnya.

## Prediksi dulu

Ini tugas baca-dan-prediksi, `AI: tanpa AI`. **Tebak dulu, tulis jawabanmu, baru jalankan.** Empat bilangan dimasukkan ke `priority_queue`, lalu dikeluarkan satu per satu.

```cpp
#include <iostream>
#include <queue>
using namespace std;

int main() {
  priority_queue<int> pq;
  pq.push(5);
  pq.push(1);
  pq.push(8);
  pq.push(3);
  cout << "top: " << pq.top() << ", ukuran: " << pq.size() << "\n";
  while (!pq.empty()) {
    cout << pq.top() << " ";
    pq.pop();
  }
  cout << "\n";
}
```

1. Apa isi baris pertama?
2. Dalam urutan apa bilangan keluar pada baris kedua? Apakah sama dengan `queue` biasa?

Simpan tebakanmu. Perbandingannya ada di bagian berikutnya.

## Contoh terselesaikan

Keluaran program tadi:

```text
top: 8, ukuran: 4
8 5 3 1 
```

`priority_queue` mengeluarkan **elemen terbesar lebih dulu**, bukan elemen yang masuk paling awal. `push` dan `pop` masing-masing `O(log n)` dan `top` `O(1)` (cppreference). Ia tidak menyediakan pencarian elemen sembarang; yang bisa kamu lihat hanyalah `top`. Untuk mengeluarkan yang **terkecil** lebih dulu, tambahkan `greater`: `priority_queue<int, vector<int>, greater<int>>`.

Masalah karangan: dari `n` bilangan, cari `k` bilangan terbesar. Cara pengurutan penuh mengurutkan semua (`n log n` langkah). Cara heap menyimpan hanya `k` bilangan terbesar sejauh ini dalam heap **terkecil** berukuran paling banyak `k`: bila ukurannya melebihi `k`, buang `top` (yang terkecil di antara kandidat). Dengan begitu tiap bilangan memakai paling banyak satu `push` dan satu `pop` pada heap berukuran `k`, sehingga langkahnya `n log k`.

```cpp
#include <functional>
#include <iostream>
#include <queue>
#include <vector>
using namespace std;

int main() {
  int n;
  int k;
  cin >> n >> k;
  priority_queue<int, vector<int>, greater<int>> pq;
  for (int i = 0; i < n; i++) {
    int x;
    cin >> x;
    pq.push(x);
    if ((int)pq.size() > k) {
      pq.pop();
    }
  }
  vector<int> hasil;
  while (!pq.empty()) {
    hasil.push_back(pq.top());
    pq.pop();
  }
  for (int i = (int)hasil.size() - 1; i >= 0; i--) {
    cout << hasil[i] << " ";
  }
  cout << "\n";
}
```

Masukan (`masukan.txt`):

```text
10 3
14 7 21 3 18 9 25 11 2 16
```

Keluaran:

```text
25 21 18 
```

Telusuri tiga bilangan pertama: heap menjadi `{14}`, `{7, 14}`, `{7, 14, 21}`. Bilangan 3 masuk lalu ukuran 4 melebihi `k = 3`, sehingga 3 dibuang. Bilangan 18 masuk dan 7 dibuang: `{14, 18, 21}`. Begitu seterusnya sampai `{18, 21, 25}`. Untuk `n = 10` dan `k = 3`, tiap bilangan menyentuh heap berukuran paling banyak 4, sekitar 2 langkah per operasi. Program berikut menghitung perbandingan untuk data besar.

```cpp
#include <cmath>
#include <iomanip>
#include <iostream>
using namespace std;

int main() {
  cout << fixed << setprecision(0);
  double n = 1000000;
  int kk[3] = {3, 10, 1000};
  for (int i = 0; i < 3; i++) {
    cout << "n = 1000000, k = " << kk[i] << ": heap sekitar " << n * log2(kk[i]) << " langkah, urut penuh sekitar " << n * log2(n) << " langkah\n";
  }
}
```

Keluaran:

```text
n = 1000000, k = 3: heap sekitar 1584963 langkah, urut penuh sekitar 19931569 langkah
n = 1000000, k = 10: heap sekitar 3321928 langkah, urut penuh sekitar 19931569 langkah
n = 1000000, k = 1000: heap sekitar 9965784 langkah, urut penuh sekitar 19931569 langkah
```

Cara heap `O(n log k)`, cara urut penuh `O(n log n)`. Selisihnya besar bila `k` kecil. Heap juga memakai memori hanya sebesar `k`, tidak sebesar `n`.

Heap sering dipakai dengan `pair`: urutan prioritas lalu nama. Dengan `greater` pada `pair<int, string>`, angka prioritas kecil keluar dulu, dan bila sama nama menaik.

```cpp
#include <functional>
#include <iostream>
#include <queue>
#include <string>
#include <utility>
#include <vector>
using namespace std;

int main() {
  typedef pair<int, string> Tugas;
  priority_queue<Tugas, vector<Tugas>, greater<Tugas>> pq;
  pq.push({2, "cetak"});
  pq.push({1, "backup"});
  pq.push({3, "arsip"});
  pq.push({1, "alarm"});
  while (!pq.empty()) {
    cout << pq.top().first << " " << pq.top().second << "\n";
    pq.pop();
  }
}
```

Keluaran:

```text
1 alarm
1 backup
2 cetak
3 arsip
```

## Contoh setengah jadi

Lengkapi program yang mencetak `k` bilangan **terkecil** menggunakan heap terbesar (`priority_queue` bawaan) berukuran paling banyak `k`.

```cpp setengah-jadi
priority_queue<int> pq;
for (int i = 0; i < n; i++) {
  int x;
  cin >> x;
  pq.push(x);
  if ((int)pq.size() > ____) {
    pq.____();
  }
}
```

## Soal Parsons

Susun delapan baris berikut (sudah diacak) menjadi program yang mencetak bilangan terbesar ke-`k`. `AI: tanpa AI`: tujuannya melatih membaca urutan.

```text
(a)   priority_queue<int, vector<int>, greater<int>> pq;
(b)   for (int i = 0; i < n; i++) {
(c)     cin >> x;
(d)     pq.push(x);
(e)     if ((int)pq.size() > k) pq.pop();
(f)   }
(g)   int x;
(h)   cout << pq.top() << "\n";
```

## Latihan

1. `AI: boleh` **k terbesar.** Baca `n` dan `k`, lalu `n` bilangan. Cetak `k` bilangan terbesar dari yang terbesar. Tulis pseudocode lebih dulu.
2. `AI: boleh` **Antrean tugas.** Baca `n`, lalu `n` pasang `prioritas nama` (angka kecil didahulukan). Cetak urutan penanganan dengan `priority_queue` dan `greater`.
3. `AI: tanpa AI` **Telusuri.** Pada `priority_queue<int>` kosong: `push(4)`, `push(9)`, `push(4)`, `push(1)`, `pop()`, `push(7)`. Tulis `top()` dan `size()` setelah langkah terakhir.
4. `AI: boleh` **Hitung.** Untuk `n = 1000000` dan `k = 10`, bandingkan perkiraan langkah cara heap dan cara urut penuh. Mengapa memori cara heap lebih kecil?
5. *Opsional:* **catatan pemakaian AI.** Bila memakai AI generatif, jawab nomor 3 sendiri dulu, lalu minta penjelasan atau petunjuk bertahap, bukan program jadi. Catat alatnya, tujuanmu, garis besar perintahmu, bagian yang kamu pakai, dan caramu memeriksanya. Jangan menaruh data pribadi atau tugas bernilai pada perintah.

## Latihan bercampur

1. `AI: boleh` Hitung frekuensi kata dengan `map`, lalu cetak tiga kata paling sering memakai heap berisi `pair` (modul `a-xi1-m9`).
2. `AI: tanpa AI` Memasukkan 3, 1, 2 ke `queue` dan ke `priority_queue` bawaan: tulis urutan keluar masing-masing (modul `a-x2-m7`).
3. `AI: boleh` Alternatif k terbesar: urutkan menurun dengan `std::sort`, ambil `k` pertama. Kapan cara ini cukup baik dibanding heap (modul `a-xi1-m8`)?

## Pengayaan (P)

Bagian ini boleh dilewati. `priority_queue` di dalamnya biasanya sebuah **heap biner** yang disimpan dalam larik: elemen di indeks `i` punya induk di `(i - 1) / 2`, dan induk tidak pernah lebih kecil daripada anaknya (heap maks). Saat `push`, elemen baru ditaruh di ujung lalu **naik** selama lebih besar daripada induknya. Karena tingginya sekitar `log2 n`, `push` paling banyak sekitar `log2 n` pertukaran.

```cpp
#include <iostream>
#include <vector>
using namespace std;

void dorong(vector<int>& h, int x, int& tukar) {
  h.push_back(x);
  int i = (int)h.size() - 1;
  while (i > 0 && h[(i - 1) / 2] < h[i]) {
    swap(h[(i - 1) / 2], h[i]);
    i = (i - 1) / 2;
    tukar++;
  }
}

int main() {
  vector<int> h;
  int tukar = 0;
  int data[6] = {4, 9, 2, 7, 12, 5};
  for (int i = 0; i < 6; i++) {
    dorong(h, data[i], tukar);
    cout << "setelah " << data[i] << ":";
    for (int y : h) {
      cout << " " << y;
    }
    cout << "\n";
  }
  cout << "pertukaran: " << tukar << "\n";
}
```

Keluaran:

```text
setelah 4: 4
setelah 9: 9 4
setelah 2: 9 4 2
setelah 7: 9 7 2 4
setelah 12: 12 9 2 4 7
setelah 5: 12 9 5 4 7 2
pertukaran: 5
```

Bandingkan dengan tebakanmu: elemen terbesar selalu berada di indeks 0, tetapi larik **tidak** terurut seluruhnya. Itu sebabnya heap hanya menjamin `top`.

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `a-xi1-m11` (pertanyaan 1), sekitar tiga minggu lagi di `a-xi1-m13` (pertanyaan 2), dan sekitar delapan minggu lagi di `a-xi2-m4` (pertanyaan 3). Jawab sekarang lalu simpan.

1. Elemen mana yang dikeluarkan `top()` pada `priority_queue<int>` bawaan, dan bagaimana membuatnya mengeluarkan yang terkecil?
2. Berapa langkah `push` dan `pop` pada `priority_queue`, dan apa yang tidak bisa dilakukannya?
3. Mengapa untuk `k` nilai terbesar dari `n` data, heap berukuran `k` lebih hemat daripada mengurutkan semuanya?

## Kesalahan umum

- **Memanggil `top()` atau `pop()` pada heap kosong.** Periksa `empty()` lebih dulu.
- **Mengira isi heap terurut.** Hanya elemen teratas yang dijamin; iterasi tidak tersedia, dan mengeluarkan semua elemen memerlukan `n` kali `pop`.
- **Memakai heap terbesar untuk "k terbesar".** Heap kandidat harus yang **terkecil** di atas, agar yang dibuang adalah kandidat terlemah.
- **Lupa `greater` dan `<functional>` untuk heap terkecil.** Tanpanya `top` tetap yang terbesar.
- **Menyimpan pasangan dengan urutan terbalik.** Pada `pair`, `first` menentukan prioritas dulu; letakkan prioritas di `first`.

## Cek mandiri

- [ ] Saya dapat memakai `push`, `top`, `pop`, `size`, dan `empty`.
- [ ] Saya dapat membuat heap yang mengeluarkan nilai terkecil lebih dulu.
- [ ] Saya dapat menyelesaikan k nilai terbesar dengan heap berukuran k.
- [ ] Saya dapat menyebut `O(log n)` untuk `push` dan `pop`.
- [ ] Saya dapat membandingkan heap dengan pengurutan penuh.

## Kunci dan petunjuk

**Ingat kembali.** 1: `m["x"]` membuat entri baru bernilai awal (0 untuk `int`) dan `size()` bertambah. 2: tiap langkah membelah pangkat menjadi setengah, sehingga hanya sekitar `log n` tingkat dengan satu atau dua perkalian per tingkat. 3: masukan dan keluarannya jelas sehingga dapat dicoba sendiri tanpa menjalankan seluruh program, dan bila gagal letak cacatnya sempit.

**Prediksi dulu.** 1: `top: 8, ukuran: 4`. 2: `8 5 3 1`, dari yang terbesar. Tidak sama dengan `queue`, yang akan mengeluarkan `5 1 8 3` sesuai urutan masuk.

**Contoh setengah jadi.** Isi: `k` dan `pop`. Program lengkap:

```cpp
#include <iostream>
#include <queue>
#include <vector>
using namespace std;

int main() {
  int n;
  int k;
  cin >> n >> k;
  priority_queue<int> pq;
  for (int i = 0; i < n; i++) {
    int x;
    cin >> x;
    pq.push(x);
    if ((int)pq.size() > k) {
      pq.pop();
    }
  }
  vector<int> hasil;
  while (!pq.empty()) {
    hasil.push_back(pq.top());
    pq.pop();
  }
  for (int i = (int)hasil.size() - 1; i >= 0; i--) {
    cout << hasil[i] << " ";
  }
  cout << "\n";
}
```

Masukan (`masukan.txt`):

```text
8 3
9 4 7 1 8 2 6 5
```

Keluaran:

```text
1 2 4 
```

**Soal Parsons.** Urutan benar: a, g, b, c, d, e, f, h. Heap terkecil berukuran `k` menyimpan `k` terbesar; `top`-nya adalah yang ke-`k` terbesar.

**Latihan.** 1: pseudocode: baca `n`, `k`; heap terkecil kosong; untuk tiap bilangan: `push`, bila ukuran lebih dari `k` maka `pop`; keluarkan semua isi heap ke daftar; cetak dari belakang. Program contoh sama dengan contoh terselesaikan di atas (masukan `10 3` memberi `25 21 18`). 2: program contoh:

```cpp
#include <functional>
#include <iostream>
#include <queue>
#include <string>
#include <utility>
#include <vector>
using namespace std;

int main() {
  typedef pair<int, string> Tugas;
  int n;
  cin >> n;
  priority_queue<Tugas, vector<Tugas>, greater<Tugas>> pq;
  for (int i = 0; i < n; i++) {
    int p;
    string nama;
    cin >> p >> nama;
    pq.push({p, nama});
  }
  while (!pq.empty()) {
    cout << pq.top().second << "\n";
    pq.pop();
  }
}
```

Masukan (`masukan.txt`):

```text
4
2 cetak
1 backup
3 arsip
1 alarm
```

Keluaran:

```text
alarm
backup
cetak
arsip
```

3: setelah `push` 4, 9, 4, 1 dan `pop()` (mengeluarkan 9), isi `{4, 4, 1}`; `push(7)` memberi `{7, 4, 4, 1}`, jadi `top() = 7` dan `size() = 4`. 4: heap: `1.000.000 * log2 10`, sekitar 3.300.000 langkah; urut penuh: sekitar 19.900.000. Heap hanya menyimpan 10 bilangan, urut penuh menyimpan semuanya.

**Latihan bercampur.** 1: `map` untuk frekuensi, lalu heap `pair<int, string>` terkecil berukuran 3 yang membuang yang terlemah; cetak dari terbesar. 2: `queue`: `3 1 2`; `priority_queue`: `3 2 1`. 3: urut penuh cukup baik bila `n` kecil, atau bila seluruh data memang perlu terurut; heap menang bila `k` jauh lebih kecil dari `n` atau data datang bertahap.

**Pengayaan (P).** Tidak ada kunci tunggal; pastikan kamu menemukan bahwa elemen terbesar ada di indeks 0 dan bahwa isi larik tidak terurut penuh.

**Ulang berjarak.** 1: yang terbesar; gunakan `priority_queue<int, vector<int>, greater<int>>`. 2: keduanya `O(log n)`; `priority_queue` tidak dapat mencari elemen sembarang atau menelusuri isinya. 3: heap `k` hanya `n log k` langkah dan memori `k`, sedangkan mengurutkan semuanya `n log n` langkah dan menyimpan seluruh data.

## Langkah berikutnya

Modul berikut: `a-xi1-m11` (backtracking). Bacaan lanjut: halaman cppreference tentang `std::priority_queue`.
