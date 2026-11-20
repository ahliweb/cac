## Untuk siapa modul ini

Modul ini untuk murid kelas XII jalur A (Algoritmik dengan C++), minggu `A-XII1-M2` silabus v1.4.1: Dijkstra. Prasyarat: modul `a-xii1-m1` (lintasan terpendek berbobot) dan `a-xi1-m10` (`priority_queue`).

Modul ini berstatus DRAF: karangan penyusun, belum ditinjau pemilik. Butir `F-BK-c` dipetakan silabus sebagai dipenuhi jalur ini; modul draf ini belum dihitung sebagai pemenuhan. Keluarga materi OSN yang bertaut: `graph-tree`, yang seluruhnya ditandai pengayaan (P) di jembatan OSN, sehingga kelas reguler boleh melewatinya. Modul tidak menjanjikan kedalaman soal OSN.

Tiap soal latihan bertanda `AI: boleh` atau `AI: tanpa AI`. Masukan program lewat berkas: `./program < masukan.txt`. Semua data karangan.

## Ingat kembali

Jawab dari ingatan dulu, baru cek kunci. Soal 1 dari `a-xii1-m1`, soal 2 dari `a-xi2-m13`, soal 3 dari `a-xi2-m8`, soal 4 dari `a-xi1-m10`.

1. Berapa putaran Bellman-Ford melonggarkan semua sisi, dan mengapa sebanyak itu cukup?
2. Apa yang membedakan laporan prediksi yang jujur dari yang menyesatkan?
3. Mengapa BFS memberi jarak terpendek pada graf tak berbobot, dan mengapa jaminan itu hilang bila sisinya punya bobot berbeda?
4. Bagaimana membuat `priority_queue` mengeluarkan elemen terkecil lebih dulu?

## Tujuan

Setelah modul ini kamu dapat:

- menjelaskan gagasan Dijkstra: simpul dengan jarak sementara terkecil sudah final;
- menulis Dijkstra dengan `priority_queue` dan mencetak rute (keluaran minggu ini: program Dijkstra);
- menjelaskan mengapa Dijkstra salah pada sisi bobot negatif;
- menyebut kompleksitas `O((n + m) log n)`.

## Prediksi dulu

Tugas baca-dan-prediksi, `AI: tanpa AI`. **Tebak dulu, tulis, baru jalankan.** Tiga desa, jalan dua arah: 1-2 sejauh 4, 1-3 sejauh 2, 2-3 sejauh 1. Mulai dari desa 1, selalu ambil desa yang jarak sementaranya terkecil.

1. Dalam urutan apa desa diambil, dan berapa jarak finalnya?
2. Berapa `d[2]` sesudah desa 1 diambil, dan berapa sesudah desa 3 diambil?

## Contoh terselesaikan

Dijkstra bekerja bila **semua bobot tak negatif**. Simpan `dist[v]` (jarak sementara) dan sebuah antrian prioritas berisi pasangan `(jarak, simpul)`. Selalu ambil pasangan berjarak terkecil. Karena tak ada bobot negatif, jalan lain ke simpul itu harus lewat simpul yang jaraknya lebih besar atau sama dan hanya menambah, jadi jarak yang baru keluar itu sudah **final**. Lalu longgarkan sisi-sisinya seperti pada Bellman-Ford (`a-xii1-m1`).

`priority_queue` tidak bisa mengubah entri di dalamnya. Maka tiap perbaikan jarak **memasukkan entri baru**, dan entri lama yang kemudian keluar dengan jarak lebih besar daripada `dist[u]` dilewati sebagai **usang**. Agar yang terkecil keluar lebih dulu, pasangan memakai `greater` (`a-xi1-m10`).

```cpp
#include <algorithm>
#include <functional>
#include <iostream>
#include <queue>
#include <utility>
#include <vector>
using namespace std;

int main() {
  int n, m, s, t;
  cin >> n >> m >> s >> t;
  vector<vector<pair<int, int>>> adj(n + 1);
  for (int i = 0; i < m; i++) {
    int u, v, w;
    cin >> u >> v >> w;
    adj[u].push_back({v, w});
    adj[v].push_back({u, w});
  }
  const long long INF = 1000000000000000000LL;
  vector<long long> dist(n + 1, INF);
  vector<int> asal(n + 1, 0);
  priority_queue<pair<long long, int>, vector<pair<long long, int>>,
                 greater<pair<long long, int>>>
      pq;
  dist[s] = 0;
  pq.push({0, s});
  int keluar = 0;
  int usang = 0;
  while (!pq.empty()) {
    pair<long long, int> teratas = pq.top();
    pq.pop();
    keluar++;
    long long d = teratas.first;
    int u = teratas.second;
    if (d > dist[u]) {
      usang++;
      continue;
    }
    for (const auto& e : adj[u]) {
      int v = e.first;
      long long nd = d + e.second;
      if (nd < dist[v]) {
        dist[v] = nd;
        asal[v] = u;
        pq.push({nd, v});
      }
    }
  }
  for (int i = 1; i <= n; i++) {
    cout << "jarak ke " << i << ": ";
    if (dist[i] == INF) {
      cout << "tak terjangkau\n";
    } else {
      cout << dist[i] << "\n";
    }
  }
  if (dist[t] < INF) {
    vector<int> jalur;
    for (int x = t; x != 0; x = asal[x]) {
      jalur.push_back(x);
    }
    reverse(jalur.begin(), jalur.end());
    cout << "rute:";
    for (int x : jalur) {
      cout << " " << x;
    }
    cout << "\n";
  }
  cout << keluar << " entri keluar antrian, " << usang << " usang\n";
}
```

Masukan (`masukan.txt`; angka pertama: simpul, sisi, awal, tujuan):

```text
7 10 1 7
1 2 4
1 3 2
2 3 1
2 4 5
3 4 8
3 5 10
4 6 2
5 6 3
5 7 5
6 7 6
```

Keluaran:

```text
jarak ke 1: 0
jarak ke 2: 3
jarak ke 3: 2
jarak ke 4: 8
jarak ke 5: 12
jarak ke 6: 10
jarak ke 7: 16
rute: 1 3 2 4 6 7
9 entri keluar antrian, 2 usang
```

Cocokkan dengan prediksimu pada pola yang sama. Tiap sisi berarah memasukkan paling banyak satu entri, sehingga entri paling banyak `2m + 1 = 21`; di sini yang keluar 9. Tiap `push` dan `pop` `O(log n)`, jadi waktunya `O((n + m) log n)`. Bellman-Ford pada graf ini butuh `n * 2m = 140` pemeriksaan sisi berarah, dan selisihnya melonjak pada graf besar.

Bobot negatif merusak gagasan "yang keluar sudah final". Program berikut menjalankan versi yang menganggap simpul keluar sebagai final, lalu membandingkannya dengan Bellman-Ford pada graf berarah dengan sisi `3 -> 2` berbobot `-4`:

```cpp
#include <algorithm>
#include <functional>
#include <iostream>
#include <queue>
#include <utility>
#include <vector>
using namespace std;

int main() {
  int n = 4;
  int sisi[4][3] = {{1, 2, 2}, {1, 3, 5}, {3, 2, -4}, {2, 4, 1}};
  const long long INF = 1000000000000000000LL;

  vector<vector<pair<int, int>>> adj(n + 1);
  for (int i = 0; i < 4; i++) {
    adj[sisi[i][0]].push_back({sisi[i][1], sisi[i][2]});
  }
  vector<long long> dist(n + 1, INF);
  vector<bool> selesai(n + 1, false);
  priority_queue<pair<long long, int>, vector<pair<long long, int>>,
                 greater<pair<long long, int>>>
      pq;
  dist[1] = 0;
  pq.push({0, 1});
  while (!pq.empty()) {
    int u = pq.top().second;
    pq.pop();
    if (selesai[u]) {
      continue;
    }
    selesai[u] = true;
    for (const auto& e : adj[u]) {
      if (!selesai[e.first] && dist[u] + e.second < dist[e.first]) {
        dist[e.first] = dist[u] + e.second;
        pq.push({dist[e.first], e.first});
      }
    }
  }

  vector<long long> bf(n + 1, INF);
  bf[1] = 0;
  for (int putaran = 1; putaran < n; putaran++) {
    for (int i = 0; i < 4; i++) {
      int u = sisi[i][0];
      int v = sisi[i][1];
      if (bf[u] != INF && bf[u] + sisi[i][2] < bf[v]) {
        bf[v] = bf[u] + sisi[i][2];
      }
    }
  }
  for (int i = 1; i <= n; i++) {
    cout << "simpul " << i << ": Dijkstra " << dist[i] << ", Bellman-Ford " << bf[i] << "\n";
  }
}
```

Keluaran:

```text
simpul 1: Dijkstra 0, Bellman-Ford 0
simpul 2: Dijkstra 2, Bellman-Ford 1
simpul 3: Dijkstra 5, Bellman-Ford 5
simpul 4: Dijkstra 3, Bellman-Ford 2
```

Simpul 2 keluar dengan jarak 2 dan dikunci, padahal lewat `1 -> 3 -> 2` jaraknya `5 - 4 = 1`.

## Contoh setengah jadi

Lengkapi tiga bagian Dijkstra: pembanding antrian, penyaring entri usang, dan penyimpan rute.

```cpp setengah-jadi
priority_queue<pair<long long, int>, vector<pair<long long, int>>,
               ____<pair<long long, int>>> pq;
// ...
if (d > ____[u]) {
  continue;
}
// ...
if (nd < dist[v]) {
  dist[v] = nd;
  asal[v] = ____;
  pq.push({nd, v});
}
```

## Soal Parsons

Susun tujuh baris berikut (sudah diacak) menjadi inti perulangan Dijkstra. `AI: tanpa AI`.

```text
(a)   pq.pop();
(b)   int u = teratas.second;
(c) while (!pq.empty()) {
(d)   if (teratas.first > dist[u]) continue;
(e)   pair<long long, int> teratas = pq.top();
(f)   // longgarkan semua sisi dari u
(g) }
```

## Latihan

1. `AI: boleh` **Rute termurah.** Jaringan 5 kota tak berarah (kota, kota, biaya): `1 2 7`, `1 3 3`, `3 2 2`, `2 4 6`, `3 4 9`, `4 5 1`, `3 5 14`. Tulis pseudocode dulu, lalu cari biaya dan rute termurah dari 1 ke 5.
2. `AI: boleh` **Banyak rute.** Tambahkan larik `cacah` agar program mencetak banyaknya rute terpendek ke tiap simpul.
3. `AI: tanpa AI` **Telusur.** Pada graf soal 1, tulis isi antrian prioritas tiap kali `pop`. Berapa entri yang keluar, dan berapa yang usang?
4. `AI: boleh` **Negatif.** Beri graf tiga simpul dengan satu sisi negatif yang membuat versi "keluar berarti final" salah, dan tulis jarak keliru dan yang benar.
5. *Opsional:* **catatan pemakaian AI.** Bila memakai AI generatif, jawab nomor 3 sendiri dulu, lalu minta penjelasan atau petunjuk bertahap, bukan program jadi. Catat alat, tujuan, garis besar perintah, bagian yang kamu pakai, dan cara memeriksanya. Jangan menaruh data pribadi atau tugas bernilai pada perintah.

## Latihan bercampur

1. `AI: boleh` Pada `n = m = 100.000`, bandingkan kira-kira langkah Bellman-Ford dan Dijkstra (modul `a-xii1-m1`).
2. `AI: tanpa AI` Pada grid tiap sel punya biaya masuk berbeda. Mengapa BFS tidak lagi cukup, dan algoritma apa gantinya (modul `a-xi2-m8`)?
3. `AI: boleh` Mengapa jarak disimpan sebagai `long long` bila bobot sampai satu miliar dan lintasan sampai seratus ribu sisi (modul `a-x2-m4`)?

## Pengayaan (P)

Boleh dilewati. Pada graf **padat** (`m` mendekati `n^2`) antrian prioritas tidak selalu terbaik. Alternatifnya mencari simpul berjarak terkecil dengan menyapu seluruh larik `dist` tiap kali: `O(n^2)` tanpa struktur data. Untuk `n = 2000` dan `m` sekitar dua juta, versi antrian kira-kira `2.000.000 * 21 = 42 juta` langkah, sedangkan larik sekitar `4 juta + 2 juta`. Pilih menurut kerapatan graf.

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `a-xii1-m3` (pertanyaan 1), sekitar tiga minggu lagi di `a-xii1-m5` (pertanyaan 2), dan sekitar delapan minggu lagi di `a-xii1-m10` (pertanyaan 3). Jawab sekarang lalu simpan.

1. Mengapa Dijkstra tidak boleh dipakai pada sisi bobot negatif?
2. Mengapa Dijkstra melewati entri yang jaraknya lebih besar daripada `dist[u]` saat entri itu keluar dari antrian?
3. Berapa kompleksitas Dijkstra dengan `priority_queue`, dalam `n` dan `m`?

## Kesalahan umum

- **Memakai Dijkstra pada bobot negatif.** Simpul yang sudah keluar bisa saja belum final.
- **Pembanding antrian terbalik.** Tanpa `greater`, yang terbesar keluar lebih dulu.
- **Lupa menyaring entri usang.** Simpul diproses berulang dan langkah membengkak.
- **Memakai `int` untuk jarak.** Jumlah bobot lintasan panjang dapat meluap.
- **Mengira jarak simpul final saat dimasukkan ke antrian.** Final baru bila keluar dengan jarak sama dengan `dist`.

## Cek mandiri

- [ ] Saya dapat menjelaskan mengapa simpul yang keluar lebih dulu sudah final.
- [ ] Saya dapat menulis Dijkstra dengan `priority_queue` dan `greater`.
- [ ] Saya dapat membangun rute dengan larik `asal`.
- [ ] Saya dapat menjelaskan kegagalan pada bobot negatif.
- [ ] Saya dapat menyebut `O((n + m) log n)`.

## Kunci dan petunjuk

**Ingat kembali.** 1: `n - 1` putaran, karena lintasan terpendek tanpa simpul berulang punya paling banyak `n - 1` sisi dan tiap putaran memperpanjang jarak yang benar satu sisi. 2: laporan yang jujur menyertakan galat, cara menguji, dan keterbatasan; yang menyesatkan hanya menyebut angka ramalan. 3: BFS memproses lapis demi lapis, sehingga simpul pertama kali dicapai lewat jumlah sisi paling sedikit; bila sisi berbobot, jalan dengan sisi lebih sedikit bisa lebih mahal sehingga lapis tidak lagi berarti jarak. 4: tambahkan `greater`: `priority_queue<int, vector<int>, greater<int>>`.

**Prediksi dulu.** 1: desa 1 (jarak 0), desa 3 (jarak 2), desa 2 (jarak 3). 2: sesudah desa 1 diambil `d[2] = 4` dan `d[3] = 2`; sesudah desa 3 diambil `d[2] = 2 + 1 = 3`.

**Contoh setengah jadi.** Isi: `greater`, `dist`, `u`. Program lengkap yang mencetak jarak:

```cpp
#include <functional>
#include <iostream>
#include <queue>
#include <utility>
#include <vector>
using namespace std;

int main() {
  int n, m, s, t;
  cin >> n >> m >> s >> t;
  (void)t;
  vector<vector<pair<int, int>>> adj(n + 1);
  for (int i = 0; i < m; i++) {
    int u, v, w;
    cin >> u >> v >> w;
    adj[u].push_back({v, w});
    adj[v].push_back({u, w});
  }
  vector<long long> dist(n + 1, 1000000000000000000LL);
  priority_queue<pair<long long, int>, vector<pair<long long, int>>,
                 greater<pair<long long, int>>>
      pq;
  dist[s] = 0;
  pq.push({0, s});
  while (!pq.empty()) {
    pair<long long, int> teratas = pq.top();
    pq.pop();
    long long d = teratas.first;
    int u = teratas.second;
    if (d > dist[u]) {
      continue;
    }
    for (const auto& e : adj[u]) {
      int v = e.first;
      long long nd = d + e.second;
      if (nd < dist[v]) {
        dist[v] = nd;
        pq.push({nd, v});
      }
    }
  }
  for (int i = 1; i <= n; i++) {
    cout << dist[i] << " ";
  }
  cout << "\n";
}
```

Masukan (`masukan.txt`):

```text
7 10 1 7
1 2 4
1 3 2
2 3 1
2 4 5
3 4 8
3 5 10
4 6 2
5 6 3
5 7 5
6 7 6
```

Keluaran:

```text
0 3 2 8 12 10 16
```

**Soal Parsons.** Urutan benar: c, e, a, b, d, f, g. Baris (e) membaca `top` sebelum (a) membuangnya, dan (d) memakai `u` yang diberi nama di (b).

**Latihan.** 1: biaya 12 lewat `1 -> 3 -> 2 -> 4 -> 5` (`3 + 2 + 6 + 1`), lebih murah daripada 17 lewat `3 -> 5`. Pseudocode: `dist[awal] = 0`; selama antrian tak kosong ambil yang terkecil, lewati bila usang, longgarkan tetangga dan masukkan entri baru. 2: `cacah[awal] = 1`; bila `nd < dist[v]` set `cacah[v] = cacah[u]`; bila `nd == dist[v]` tambahkan `cacah[v] += cacah[u]` (tanpa memasukkan entri baru). 3: isi antrian sesudah tiap `pop` dan pelonggaran: `{(0,1)}`; `{(3,3),(7,2)}`; `{(5,2),(7,2),(12,4),(17,5)}`; `{(7,2),(11,4),(12,4),(17,5)}`; `(7,2)` usang; `{(12,4),(12,5),(17,5)}` sesudah `(11,4)` keluar dan `(12,5)` masuk; seterusnya. Jumlah entri keluar 8, usang 3 (`(7,2)`, `(12,4)`, `(17,5)`); cocok dengan keluaran program contoh bila dijalankan pada masukan soal 1. 4: sisi `1 -> 2` bobot 2, `1 -> 3` bobot 5, `3 -> 2` bobot `-4`: versi keliru menyebut `d[2] = 2`, padahal benar `5 - 4 = 1`.

**Latihan bercampur.** 1: Bellman-Ford sekitar `n * m = 10^10` pemeriksaan; Dijkstra sekitar `(n + m) log2 n`, yakni `200.000 * 17 = 3,4 juta`. 2: BFS menghitung banyak langkah, bukan jumlah biaya; gantinya Dijkstra (atau BFS 0-1 bila biaya hanya 0 dan 1). 3: lintasan sampai `100.000 * 10^9 = 10^14` melampaui `int` (sekitar `2,1 * 10^9`) tetapi muat di `long long`.

**Pengayaan (P).** Tidak ada kunci tunggal; pastikan kamu dapat menjelaskan kapan larik lebih cepat daripada antrian.

**Ulang berjarak.** 1: karena gagasan "yang keluar lebih dulu sudah final" bergantung pada jalan lain yang hanya menambah jarak; sisi negatif bisa memperpendek jalan lewat simpul yang keluar belakangan. 2: karena `priority_queue` tidak mengubah entri; entri lama tetap tinggal dan keluar belakangan dengan jarak yang sudah tertinggal. 3: `O((n + m) log n)`, karena entri paling banyak `2m + 1` dan tiap `push` dan `pop` `O(log n)`.

## Langkah berikutnya

Modul berikut: `a-xii1-m3` (pohon rentang minimum). Modul terkait: `matkom-pertumbuhan-fungsi`. Bacaan lanjut: halaman cppreference tentang `std::priority_queue`.
