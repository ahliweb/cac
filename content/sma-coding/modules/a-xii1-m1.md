## Untuk siapa modul ini

Modul ini untuk murid kelas XII jalur A (Algoritmik dengan C++), minggu `A-XII1-M1` silabus v1.4.1: lintasan terpendek I. Prasyarat: modul `a-xi2-m12` (urutan modul; BFS dari `a-xi2-m6` dipakai di sini).

Modul ini karangan penyusun dan disetujui pemilik program pada 2026-11-20 (keputusan lewat dialog; catatan tinjauan menjadi tindak lanjut revisi). Butir `F-BK-c` dipetakan silabus sebagai dipenuhi jalur ini; pemenuhan butir mengikuti pemetaan silabus, bukan status modul. Keluarga materi OSN yang bertaut: `graph-tree`, yang seluruhnya ditandai pengayaan (P) di jembatan OSN, sehingga kelas reguler boleh melewatinya; murid yang menuju OSN mengerjakannya. Modul tidak menjanjikan kedalaman soal OSN.

Tiap soal latihan bertanda `AI: boleh` atau `AI: tanpa AI`. Masukan program lewat berkas: `./program < masukan.txt`. Semua data karangan.

## Ingat kembali

Jawab dari ingatan dulu, baru cek kunci. Soal 1 dari `a-xi2-m5`, soal 2 dari `a-xi2-m12`, soal 3 dari `a-xi2-m7`, soal 4 dari `a-xi2-m8`.

1. Kapan daftar tetangga lebih cocok daripada matriks tetangga?
2. Apa rumus galat rata-rata mutlak, dan mengapa dipakai nilai mutlak?
3. Mengapa DFS tidak menjamin lintasan terpendek?
4. Mengapa tanda "dikunjungi" pada BFS diberikan saat simpul dimasukkan ke antrian, bukan saat dikeluarkan?

## Tujuan

Setelah modul ini kamu dapat:

- menjelaskan mengapa BFS tidak cukup bila sisi punya bobot, dan menghitung panjang lintasan berbobot;
- menjelaskan **relaksasi** sebuah sisi dan menelusuri algoritma Bellman-Ford putaran demi putaran;
- menulis Bellman-Ford dan mendeteksi siklus negatif (keluaran minggu ini: program Bellman-Ford);
- menulis BFS 0-1 dengan `deque` dan menyebut banyak langkah kedua algoritma.

## Prediksi dulu

Tugas baca-dan-prediksi, `AI: tanpa AI`. **Tebak dulu, tulis, baru jalankan.** Tiga desa dihubungkan jalan dua arah: 1-3 sejauh 10, 1-2 sejauh 3, dan 2-3 sejauh 4.

1. Berapa sisi pada lintasan tersingkat dari desa 1 ke desa 3 (yang dicari BFS), dan berapa panjang lintasan terpendek berbobotnya?

Graf berarah lima simpul untuk Bellman-Ford, awal 1. Tiap baris `dari ke bobot`, diproses **berurutan dari atas** pada tiap putaran.

```text
4 5 3
2 4 1
3 4 5
3 2 2
1 3 1
1 2 4
```

2. Tulis `d[1..5]` sesudah putaran pertama (belum terjangkau ditulis `~`).
3. Pada putaran ke berapa `d[5]` tidak berubah lagi?

## Contoh terselesaikan

Panjang lintasan berbobot adalah **jumlah bobot sisinya**. BFS memproses simpul menurut banyak sisi, jadi ia dapat menyebut lintasan 1 sisi sebagai terdekat padahal ada lintasan 2 sisi yang lebih pendek, seperti pada tiga desa tadi (10 melawan 3 + 4 = 7).

Alat dasarnya **relaksasi**. Simpan `d[v]`, panjang lintasan terpendek yang sudah diketahui ke `v`; awalnya `INF` kecuali `d[awal] = 0`. Melonggarkan sisi `(u, v, w)` berarti: bila `d[u] + w < d[v]`, ganti `d[v]` dengan `d[u] + w`. Nilai `d[v]` selalu panjang sebuah lintasan nyata, sehingga hanya turun menuju jarak sebenarnya.

**Bellman-Ford** melonggarkan **semua** sisi, berulang-ulang. Lintasan terpendek tanpa simpul berulang punya paling banyak `n - 1` sisi, dan setelah putaran ke-`k` setiap simpul yang jaraknya memakai paling banyak `k` sisi sudah benar. Maka `n - 1` putaran cukup. Bila putaran ke-`n` masih memperbaiki sesuatu, ada **siklus negatif** (lingkaran berjumlah bobot negatif) yang terjangkau, dan jarak terpendek tidak terdefinisi.

```cpp
#include <iostream>
#include <vector>
using namespace std;

struct Sisi {
  int dari;
  int ke;
  long long bobot;
};

int main() {
  int n, m, s;
  cin >> n >> m >> s;
  vector<Sisi> sisi(m);
  for (int i = 0; i < m; i++) {
    cin >> sisi[i].dari >> sisi[i].ke >> sisi[i].bobot;
  }
  const long long INF = 1000000000000000000LL;
  vector<long long> d(n + 1, INF);
  d[s] = 0;
  int periksa = 0;
  for (int putaran = 1; putaran <= n; putaran++) {
    bool berubah = false;
    for (const Sisi& e : sisi) {
      periksa++;
      if (d[e.dari] != INF && d[e.dari] + e.bobot < d[e.ke]) {
        d[e.ke] = d[e.dari] + e.bobot;
        berubah = true;
      }
    }
    if (putaran < n) {
      cout << "putaran " << putaran << ":";
      for (int i = 1; i <= n; i++) {
        if (d[i] == INF) {
          cout << " ~";
        } else {
          cout << " " << d[i];
        }
      }
      cout << "\n";
    } else if (berubah) {
      cout << "ada siklus negatif\n";
    } else {
      cout << "tidak ada siklus negatif\n";
    }
  }
  cout << periksa << " pemeriksaan sisi\n";
}
```

Masukan (`masukan.txt`):

```text
5 6 1
4 5 3
2 4 1
3 4 5
3 2 2
1 3 1
1 2 4
```

Keluaran:

```text
putaran 1: 0 4 1 ~ ~
putaran 2: 0 3 1 5 ~
putaran 3: 0 3 1 4 8
putaran 4: 0 3 1 4 7
tidak ada siklus negatif
30 pemeriksaan sisi
```

Cocokkan dengan prediksimu. Jarak merambat satu sisi tiap putaran, karena sisi `4 5` dan `2 4` belum bisa bekerja selagi `d[4]` dan `d[2]` masih `~`. Pemeriksaan sisi ada `n * m = 5 * 6 = 30`, sesuai keluaran, jadi waktunya `O(n * m)`.

Masukan berikut punya lingkaran `2 -> 3 -> 2` berbobot `-5 + 1 = -4`:

```text
4 4 1
1 2 3
2 3 -5
3 2 1
3 4 2
```

```text
putaran 1: 0 -1 -2 0
putaran 2: 0 -5 -6 -4
putaran 3: 0 -9 -10 -8
ada siklus negatif
16 pemeriksaan sisi
```

Putaran ke-4 (`n = 4`) masih memperbaiki, jadi program melapor siklus negatif.

Bila bobot hanya **0 atau 1**, ada cara lebih cepat: **BFS 0-1**. Ganti antrian dengan `deque` (antrian dua ujung). Sisi bobot 0 tidak menambah jarak, sehingga tetangganya masuk ke **depan** dan diproses lebih dulu; sisi bobot 1 masuk ke **belakang** seperti BFS biasa. Isi `deque` tetap terurut menurut jarak. Ceritanya: simpul halte, ruas bobot 0 gratis, ruas bobot 1 membayar satu koin.

```cpp
#include <deque>
#include <iostream>
#include <utility>
#include <vector>
using namespace std;

int main() {
  int n, m, s;
  cin >> n >> m >> s;
  vector<vector<pair<int, int>>> adj(n + 1);
  for (int i = 0; i < m; i++) {
    int u, v, w;
    cin >> u >> v >> w;
    adj[u].push_back({v, w});
    adj[v].push_back({u, w});
  }
  const int INF = 1000000000;
  vector<int> d(n + 1, INF);
  deque<int> dq;
  d[s] = 0;
  dq.push_back(s);
  int diproses = 0;
  while (!dq.empty()) {
    int u = dq.front();
    dq.pop_front();
    diproses++;
    for (const auto& e : adj[u]) {
      int v = e.first;
      int w = e.second;
      if (d[u] + w < d[v]) {
        d[v] = d[u] + w;
        if (w == 0) {
          dq.push_front(v);
        } else {
          dq.push_back(v);
        }
      }
    }
  }
  for (int i = 1; i <= n; i++) {
    cout << "halte " << i << ": ";
    if (d[i] == INF) {
      cout << "tak terjangkau\n";
    } else {
      cout << d[i] << " koin\n";
    }
  }
  cout << diproses << " kali diproses untuk " << n << " halte\n";
}
```

Masukan (`masukan.txt`):

```text
7 9 1
1 2 1
1 3 0
3 4 1
4 5 0
2 5 1
5 6 0
2 6 1
6 7 1
4 7 1
```

Keluaran:

```text
halte 1: 0 koin
halte 2: 1 koin
halte 3: 0 koin
halte 4: 1 koin
halte 5: 1 koin
halte 6: 1 koin
halte 7: 2 koin
9 kali diproses untuk 7 halte
```

Isi `deque` hanya memuat dua nilai jarak bersebelahan, sehingga tiap simpul masuk paling banyak dua kali: pemrosesan paling banyak `2n` (di sini 9 dari batas 14) dan pemeriksaan sisi `O(n + m)`.

## Contoh setengah jadi

Lengkapi inti Bellman-Ford: banyak putaran, bobot yang ditambahkan, dan simpul yang diperbarui.

```cpp setengah-jadi
for (int putaran = 1; putaran < ____; putaran++) {
  for (const Sisi& e : sisi) {
    if (d[e.dari] != INF && d[e.dari] + ____ < d[____]) {
      d[e.ke] = d[e.dari] + e.bobot;
    }
  }
}
```

## Soal Parsons

Susun delapan baris berikut (sudah diacak) menjadi satu langkah BFS 0-1 yang memproses simpul `u` yang baru keluar dari `deque`. `AI: tanpa AI`.

```text
(a)     if (d[u] + w < d[v]) {
(b)       d[v] = d[u] + w;
(c)       if (w == 0) dq.push_front(v);
(d)       else dq.push_back(v);
(e)     }
(f)   for (const auto& e : adj[u]) {
(g)     int v = e.first, w = e.second;
(h)   }
```

## Latihan

1. `AI: boleh` **Jarak berbobot kecil.** Graf berarah lima simpul, awal 1: `1 2 4`, `1 3 6`, `3 2 -3`, `2 4 -1`, `3 5 5`, `4 5 2` (dari, ke, bobot). Tulis pseudocode dulu, lalu cari `d[1..5]` dengan Bellman-Ford, dan cocokkan dengan program.
2. `AI: boleh` **Rute.** Tambahkan larik `asal` agar program mencetak rute terpendek ke simpul tertentu.
3. `AI: tanpa AI` **Telusur.** Pada graf soal 1, sisi diproses berurutan `4 5 2`, `2 4 -1`, `3 5 5`, `3 2 -3`, `1 2 4`, `1 3 6`. Tulis `d` sesudah tiap putaran. Berapa putaran `d` masih berubah?
4. `AI: boleh` **Koin.** Pada graf halte tak berarah berbobot 0 atau 1, cetak koin minimum dari halte 1 ke halte `n`, atau `tidak ada`. Apa yang rusak bila ada ruas bobot 2?
5. *Opsional:* **catatan pemakaian AI.** Bila memakai AI generatif, jawab nomor 3 sendiri dulu, lalu minta penjelasan atau petunjuk bertahap, bukan program jadi. Catat alat, tujuan, garis besar perintah, bagian yang kamu pakai, dan cara memeriksanya. Jangan menaruh data pribadi atau tugas bernilai pada perintah.

## Latihan bercampur

1. `AI: boleh` Pada rantai 5 simpul (4 sisi berarah, bobot 1), bandingkan langkah BFS dengan Bellman-Ford (modul `a-xi2-m6`).
2. `AI: tanpa AI` Mengapa Bellman-Ford cukup memakai daftar sisi, bukan daftar tetangga (modul `a-xi2-m5`)?
3. `AI: boleh` Mengapa program memeriksa `d[e.dari] != INF` sebelum menambahkan bobot, dan mengapa `INF` dipilih `10^18` pada `long long` (modul `a-x2-m4`)?

## Pengayaan (P)

Boleh dilewati. Untuk jarak **semua pasangan** simpul, **Floyd-Warshall** memakai tiga perulangan: untuk tiap perantara `k`, perbaiki `d[i][j]` bila `d[i][k] + d[k][j]` lebih pendek; `k` harus terluar. Waktunya `O(n^3)`.

```cpp
#include <iostream>
using namespace std;

int main() {
  const int INF = 1000000;
  int d[4][4] = {
      {0, 5, INF, 10},
      {INF, 0, 3, INF},
      {INF, INF, 0, 1},
      {INF, INF, INF, 0},
  };
  for (int k = 0; k < 4; k++) {
    for (int i = 0; i < 4; i++) {
      for (int j = 0; j < 4; j++) {
        if (d[i][k] + d[k][j] < d[i][j]) {
          d[i][j] = d[i][k] + d[k][j];
        }
      }
    }
  }
  for (int i = 0; i < 4; i++) {
    for (int j = 0; j < 4; j++) {
      if (d[i][j] >= INF) {
        cout << "  ~";
      } else {
        cout << "  " << d[i][j];
      }
    }
    cout << "\n";
  }
}
```

Keluaran:

```text
  0  5  8  9
  ~  0  3  4
  ~  ~  0  1
  ~  ~  ~  0
```

`~` menandai pasangan tak terjangkau.

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `a-xii1-m2` (pertanyaan 1), sekitar tiga minggu lagi di `a-xii1-m4` (pertanyaan 2), dan sekitar delapan minggu lagi di `a-xii1-m9` (pertanyaan 3). Jawab sekarang lalu simpan.

1. Berapa putaran Bellman-Ford melonggarkan semua sisi, dan mengapa sebanyak itu cukup?
2. Bagaimana Bellman-Ford mengetahui adanya siklus negatif?
3. Mengapa pada BFS 0-1 sisi bobot 0 dimasukkan ke depan `deque` dan sisi bobot 1 ke belakang?

## Kesalahan umum

- **Memakai BFS biasa pada graf berbobot.** BFS menghitung banyak sisi, bukan jumlah bobot.
- **Menambah `INF` dengan bobot tanpa memeriksa.** `INF` ditambah bobot negatif tampak terhingga, sehingga simpul yang belum terjangkau salah dianggap terjangkau.
- **Salah hitung putaran.** `n - 1` putaran cukup untuk jarak; putaran ke-`n` memeriksa siklus negatif.
- **Memakai BFS 0-1 untuk bobot lain.** Deque tidak lagi terurut menurut jarak.

## Cek mandiri

- [ ] Saya dapat menjelaskan mengapa BFS tidak menjamin lintasan terpendek pada graf berbobot.
- [ ] Saya dapat menelusuri Bellman-Ford putaran demi putaran dan mendeteksi siklus negatif.
- [ ] Saya dapat menulis BFS 0-1 dengan `deque`.
- [ ] Saya dapat menyebut `O(n * m)` untuk Bellman-Ford dan `O(n + m)` untuk BFS 0-1.

## Kunci dan petunjuk

**Ingat kembali.** 1: daftar bila graf jarang atau `n` besar, karena memorinya `n + 2m`; matriks bila `n` kecil dan pemeriksaan sisi sangat sering, karena satu langkah tetapi memori `n * n`. 2: jumlah `|prediksi - asli|` dibagi banyak titik; nilai mutlak mencegah galat positif dan negatif saling menghapus. 3: DFS mengikuti cabang pertama yang tersedia tanpa membandingkan panjang jalur, sehingga jalur yang ditemukan bisa jauh lebih panjang daripada yang terpendek. 4: bila ditandai saat dikeluarkan, sel atau simpul yang sama dapat dimasukkan oleh beberapa tetangganya sebelum diproses, sehingga antrian memuat duplikat dan langkah membengkak.

**Prediksi dulu.** 1: lintasan 1 sisi (langsung), tetapi yang terpendek berbobot adalah 1-2-3 dengan panjang `3 + 4 = 7`. 2: `d = 0 4 1 ~ ~`: hanya `1 3` dan `1 2` yang bekerja pada putaran pertama (di masukan itu `d[3] = 1` dan `d[2] = 4`). 3: lihat keluaran program; `d[5]` baru mencapai nilai akhir pada putaran ke-4 (`n - 1`), dan putaran ke-5 tidak mengubah apa-apa.

**Contoh setengah jadi.** Isi: `n`, `e.bobot`, `e.ke`. Program lengkap yang mencetak jarak akhir:

```cpp
#include <iostream>
#include <vector>
using namespace std;

struct Sisi {
  int dari;
  int ke;
  long long bobot;
};

int main() {
  int n, m, s;
  cin >> n >> m >> s;
  vector<Sisi> sisi(m);
  for (int i = 0; i < m; i++) {
    cin >> sisi[i].dari >> sisi[i].ke >> sisi[i].bobot;
  }
  const long long INF = 1000000000000000000LL;
  vector<long long> d(n + 1, INF);
  d[s] = 0;
  for (int putaran = 1; putaran < n; putaran++) {
    for (const Sisi& e : sisi) {
      if (d[e.dari] != INF && d[e.dari] + e.bobot < d[e.ke]) {
        d[e.ke] = d[e.dari] + e.bobot;
      }
    }
  }
  for (int i = 1; i <= n; i++) {
    cout << d[i] << " ";
  }
  cout << "\n";
}
```

Masukan (`masukan.txt`):

```text
5 6 1
1 2 4
1 3 6
3 2 -3
2 4 -1
3 5 5
4 5 2
```

Keluaran:

```text
0 3 6 2 4
```

**Soal Parsons.** Urutan benar: f, g, a, b, c, d, e, h. Baris (g) memberi nama `v` dan `w` sebelum dipakai di (a); `if (w == 0)` pada (c) memilih ujung deque.

**Latihan.** 1: pseudocode: `d[awal] = 0`, lalu ulangi `n - 1` kali: untuk tiap sisi, bila `d[dari] + bobot < d[ke]` perbarui `d[ke]`. Hasilnya `d = 0 3 6 2 4` (simpul 2 lewat 1-3-2 dengan `6 - 3 = 3`, bukan langsung 4). 2: simpan `asal[ke] = dari` saat memperbarui; rute dibangun mundur dari tujuan lewat `asal` lalu dibalik. 3: `d` berturut-turut `0 4 6 ~ ~`, `0 3 6 3 11`, `0 3 6 2 5`, `0 3 6 2 4`, lalu tak berubah; jadi `d` masih berubah pada 4 putaran (`n - 1`, kasus terburuk untuk urutan sisi yang tak menguntungkan). Cocokkan dengan menjalankan program contoh pada masukan itu. 4: jalankan BFS 0-1 dari 1 lalu cetak `d[n]` bila bukan `INF`. Dengan bobot 2 isi `deque` bisa memuat tiga nilai jarak berbeda sehingga tidak lagi terurut; pakai Dijkstra (modul berikut).

**Latihan bercampur.** 1: BFS: `n + m = 5 + 4 = 9` langkah; Bellman-Ford: `n * m = 5 * 4 = 20` pemeriksaan sisi (dalam kasus terburuk), jadi BFS lebih hemat; keduanya benar pada bobot 1 yang seragam. 2: tiap putaran menyentuh setiap sisi tepat sekali tanpa peduli simpulnya, sehingga cukup satu larik sisi dan satu perulangan. 3: `INF` ditambah bobot bisa meluap atau, bila bobotnya negatif, tampak lebih kecil dari `INF`; `10^18` jauh di atas jarak nyata tetapi masih di bawah batas `long long` (sekitar `9.2 * 10^18`), sehingga penambahan satu bobot tidak meluap.

**Pengayaan (P).** Tidak ada kunci tunggal; pastikan kamu dapat menjelaskan mengapa `k` harus perulangan terluar.

**Ulang berjarak.** 1: `n - 1` putaran, karena lintasan terpendek yang tidak mengulang simpul punya paling banyak `n - 1` sisi dan tiap putaran memperpanjang jarak yang benar satu sisi. 2: dengan menjalankan putaran ke-`n`; bila masih ada sisi yang bisa dilonggarkan, ada siklus negatif yang terjangkau dari awal. 3: sisi bobot 0 tidak menambah jarak, sehingga tetangganya setara dengan simpul yang sedang diproses dan harus diproses lebih dulu (depan); sisi bobot 1 menambah jarak satu sehingga menunggu di belakang, dan `deque` tetap terurut menurut jarak.

## Langkah berikutnya

Modul berikut: `a-xii1-m2` (Dijkstra), untuk bobot tak negatif. Modul terkait: `matkom-pertumbuhan-fungsi`. Bacaan lanjut: halaman cppreference tentang `std::deque`.
