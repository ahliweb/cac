## Untuk siapa modul ini

Modul ini untuk murid kelas XI jalur A (Algoritmik dengan C++), minggu `A-XI2-M6` silabus v1.4.1: BFS (penelusuran melebar). Prasyarat: modul `a-xi2-m5` (representasi graf) dan `a-x2-m7` (antrian dan tumpukan).

Modul ini berstatus DRAF: karangan penyusun, belum ditinjau pemilik. Butir `F-BK-c` dipetakan silabus sebagai dipenuhi jalur ini; modul draf ini belum dihitung sebagai pemenuhan. Keluarga materi OSN yang bertaut: `graph-tree`, yang seluruhnya ditandai pengayaan (P) di jembatan OSN, sehingga kelas reguler boleh melewati modul ini. Modul tidak menjanjikan kedalaman soal OSN.

Tiap soal latihan bertanda `AI: boleh` atau `AI: tanpa AI`. Masukan program diberikan lewat berkas: `./program < masukan.txt`. Semua data karangan.

## Ingat kembali

Jawab dari ingatan dulu, baru cek di kunci. Soal 1 dari `a-xi2-m5`, soal 2 dari `a-xi2-m3`, soal 3 dari `a-xi1-m12`, soal 4 dari `a-x2-m7`.

1. Kapan memilih matriks ketetanggaan dan kapan daftar ketetanggaan?
2. Berapa langkah dan memori DP knapsack untuk `n` barang dan kapasitas `W`?
3. Apa saja yang perlu ada dalam laporan perbandingan tiga strategi?
4. Apa beda LIFO dan FIFO? Beri satu contoh sehari-hari untuk tiap-tiapnya.

## Tujuan

Setelah modul ini kamu dapat:

- menelusuri graf **melebar**: simpul terdekat dari simpul awal dikunjungi lebih dulu;
- menulis BFS dengan antrian dan larik jarak;
- mencetak jarak terpendek (banyak sisi) dari satu simpul ke semua simpul, dan satu jalur terpendeknya;
- menghitung langkah BFS (keluaran minggu ini: program BFS).

## Prediksi dulu

Ini tugas baca-dan-prediksi, `AI: tanpa AI`. **Tebak dulu, tulis jawabanmu, baru jalankan.** Lima desa karangan dihubungkan jalan dua arah 1-2, 1-3, 2-4, 3-4, dan 4-5. Perjalanan dimulai dari desa 1. BFS memasukkan desa awal ke antrian; tiap kali mengambil satu desa dari depan, semua tetangganya yang belum pernah dicapai diberi jarak dan masuk antrian.

```cpp
#include <iostream>
#include <queue>
#include <vector>
using namespace std;

int main() {
  vector<vector<int>> adj(6);
  int sisi[5][2] = {{1, 2}, {1, 3}, {2, 4}, {3, 4}, {4, 5}};
  for (int k = 0; k < 5; k++) {
    adj[sisi[k][0]].push_back(sisi[k][1]);
    adj[sisi[k][1]].push_back(sisi[k][0]);
  }
  vector<int> dist(6, -1);
  queue<int> antrian;
  dist[1] = 0;
  antrian.push(1);
  while (!antrian.empty()) {
    int u = antrian.front();
    antrian.pop();
    cout << u << " ";
    for (int v : adj[u]) {
      if (dist[v] == -1) {
        dist[v] = dist[u] + 1;
        antrian.push(v);
      }
    }
  }
  cout << "\n";
  for (int i = 1; i <= 5; i++) {
    cout << "jarak " << i << " = " << dist[i] << "\n";
  }
}
```

1. Dalam urutan apa desa dicetak?
2. Berapa jarak tiap desa?

## Contoh terselesaikan

Keluaran dapat ditelusuri dengan menulis isi antrian. Mulai `[1]`; ambil 1 dan masukkan 2 dan 3 (`[2, 3]`); ambil 2 dan masukkan 4 (`[3, 4]`); ambil 3, desa 4 sudah punya jarak (`[4]`); ambil 4 dan masukkan 5 (`[5]`); ambil 5 (`[]`). BFS memproses simpul menurut jaraknya: semua simpul berjarak `k` keluar dari antrian sebelum simpul berjarak `k + 1`. Karena itu jarak pertama yang diberikan ke sebuah simpul adalah jarak terpendek **dalam banyak sisi**, asal sisi tak berbobot (atau berbobot sama). Kunci kebenaran lain: tandai simpul begitu masuk antrian (`dist[v] != -1`), bukan saat keluar, supaya tidak masuk dua kali.

Program berikut membaca graf, awal `s`, dan tujuan `t`, lalu mencetak urutan kunjungan, jarak, jalur terpendek memakai larik `induk` (siapa yang menemukan simpul itu), dan banyak langkah.

```cpp
#include <algorithm>
#include <iostream>
#include <queue>
#include <vector>
using namespace std;

int main() {
  int n;
  int m;
  cin >> n >> m;
  vector<vector<int>> adj(n + 1);
  for (int k = 0; k < m; k++) {
    int u;
    int v;
    cin >> u >> v;
    adj[u].push_back(v);
    adj[v].push_back(u);
  }
  int s;
  int t;
  cin >> s >> t;
  vector<int> dist(n + 1, -1);
  vector<int> induk(n + 1, 0);
  queue<int> antrian;
  dist[s] = 0;
  antrian.push(s);
  int diproses = 0;
  long long sisiDiperiksa = 0;
  cout << "urutan:";
  while (!antrian.empty()) {
    int u = antrian.front();
    antrian.pop();
    diproses++;
    cout << " " << u;
    for (int v : adj[u]) {
      sisiDiperiksa++;
      if (dist[v] == -1) {
        dist[v] = dist[u] + 1;
        induk[v] = u;
        antrian.push(v);
      }
    }
  }
  cout << "\n";
  for (int i = 1; i <= n; i++) {
    if (dist[i] == -1) {
      cout << "jarak " << i << ": tak terjangkau\n";
    } else {
      cout << "jarak " << i << ": " << dist[i] << "\n";
    }
  }
  if (dist[t] == -1) {
    cout << "tidak ada jalur ke " << t << "\n";
  } else {
    vector<int> jalur;
    for (int x = t; x != s; x = induk[x]) {
      jalur.push_back(x);
    }
    jalur.push_back(s);
    reverse(jalur.begin(), jalur.end());
    cout << "jalur:";
    for (int x : jalur) {
      cout << " " << x;
    }
    cout << "\n";
  }
  cout << "simpul diproses " << diproses << ", sisi diperiksa " << sisiDiperiksa << "\n";
}
```

Masukan (`masukan.txt`):

```text
9 8
1 2
1 3
2 4
3 4
4 5
5 6
3 7
8 9
1 6
```

Keluaran:

```text
urutan: 1 2 3 4 7 5 6
jarak 1: 0
jarak 2: 1
jarak 3: 1
jarak 4: 2
jarak 5: 3
jarak 6: 4
jarak 7: 2
jarak 8: tak terjangkau
jarak 9: tak terjangkau
jalur: 1 2 4 5 6
simpul diproses 7, sisi diperiksa 14
```

Baca angkanya. Simpul 8 dan 9 tak terjangkau dari 1 karena berada di kelompok lain (nanti disebut komponen). Tiap simpul yang terjangkau diproses satu kali (7 simpul) dan tiap sisi di kelompok itu diperiksa dari kedua ujungnya (`2 * 7 = 14`); sisi 8-9 tidak ikut karena tak terjangkau. Jadi BFS memerlukan `O(n + m)` langkah dengan daftar ketetanggaan, dan memori `O(n + m)` untuk graf ditambah `O(n)` untuk `dist`, `induk`, dan antrian. Dengan matriks ketetanggaan tiap simpul memeriksa `n` sel sehingga `O(n * n)`.

## Contoh setengah jadi

Lengkapi inti BFS.

```cpp setengah-jadi
queue<int> antrian;
dist[s] = ____;
antrian.push(s);
while (!antrian.empty()) {
  int u = antrian.front();
  antrian.pop();
  for (int v : adj[u]) {
    if (dist[v] == ____) {
      dist[v] = dist[u] + ____;
      antrian.push(v);
    }
  }
}
```

## Soal Parsons

Susun sebelas baris berikut (sudah diacak, tanpa lekuk) menjadi inti BFS. Deklarasi `queue<int> antrian;` dan `dist[s] = 0;` sudah ada di atasnya. `AI: tanpa AI`: tujuannya melatih membaca urutan.

```text
(a) }
(b) antrian.push(v);
(c) int u = antrian.front();
(d) for (int v : adj[u]) {
(e) antrian.push(s);
(f) dist[v] = dist[u] + 1;
(g) }
(h) while (!antrian.empty()) {
(i) if (dist[v] == -1) {
(j) antrian.pop();
(k) }
```

## Latihan

1. `AI: boleh` **Jarak.** Tulis pseudocode lebih dulu, lalu program yang membaca graf dan `s`, lalu mencetak jarak ke semua simpul (`-1` bila tak terjangkau). Uji simpul awal terisolasi, graf tak terhubung, dan jalur lurus.
2. `AI: tanpa AI` **Telusuri antrian.** Untuk graf pada `Prediksi dulu` tetapi mulai dari desa 5, tulis isi antrian di tiap langkah dan jarak akhirnya.
3. `AI: boleh` **Permainan angka.** Mulai dari angka 1, tiap langkah boleh menambah 1 atau mengalikan 2. Cari langkah paling sedikit mencapai `N` (`N` sampai 1000) dengan BFS; "simpul"-nya adalah angka dan sisinya dua operasi itu (graf yang tak pernah ditulis). Karena angka hanya naik, angka di atas `N` tak perlu dikunjungi.
4. `AI: boleh` **Lapisan.** Cetak banyak simpul pada tiap jarak dari `s`.
5. *Opsional:* **catatan pemakaian AI.** Bila memakai AI generatif, jawab nomor 2 sendiri dulu, lalu minta penjelasan atau petunjuk bertahap, bukan program jadi. Catat alatnya, tujuanmu, garis besar perintahmu, bagian yang kamu pakai, dan caramu memeriksanya. Jangan menaruh data pribadi atau tugas bernilai pada perintah.

## Latihan bercampur

1. `AI: tanpa AI` Bila antrian diganti tumpukan (modul `a-x2-m7`), urutan kunjungan berubah menjadi apa dan masih menjamin jarak terpendek?
2. `AI: boleh` Berapa langkah BFS bila graf disimpan sebagai matriks ketetanggaan (modul `a-xi2-m5`), dibandingkan daftar? Mana yang dipilih untuk `n = 100000` dan `m = 200000`?
3. `AI: boleh` Desa memiliki nama (teks), bukan nomor. Bagaimana memetakan nama ke nomor simpul dengan `map<string, int>` agar BFS tetap berlaku (modul `a-xi1-m9`)?

## Pengayaan (P)

Bagian ini boleh dilewati; ia bukan syarat modul berikutnya. **BFS multi-sumber** memasukkan beberapa simpul awal sekaligus ke antrian dengan jarak 0. Hasilnya jarak tiap simpul ke sumber **terdekat**, tanpa mengulang BFS untuk tiap sumber: tetap `O(n + m)`. Contoh: dua pos pemadam di desa 1 dan 6 pada graf contoh.

```cpp
#include <iostream>
#include <queue>
#include <vector>
using namespace std;

int main() {
  int n = 7;
  vector<vector<int>> adj(n + 1);
  int sisi[7][2] = {{1, 2}, {1, 3}, {2, 4}, {3, 4}, {4, 5}, {5, 6}, {3, 7}};
  for (int k = 0; k < 7; k++) {
    adj[sisi[k][0]].push_back(sisi[k][1]);
    adj[sisi[k][1]].push_back(sisi[k][0]);
  }
  vector<int> dist(n + 1, -1);
  queue<int> antrian;
  int pos[2] = {1, 6};
  for (int k = 0; k < 2; k++) {
    dist[pos[k]] = 0;
    antrian.push(pos[k]);
  }
  while (!antrian.empty()) {
    int u = antrian.front();
    antrian.pop();
    for (int v : adj[u]) {
      if (dist[v] == -1) {
        dist[v] = dist[u] + 1;
        antrian.push(v);
      }
    }
  }
  for (int i = 1; i <= n; i++) {
    cout << "desa " << i << ": " << dist[i] << " dari pos terdekat\n";
  }
}
```

Keluaran:

```text
desa 1: 0 dari pos terdekat
desa 2: 1 dari pos terdekat
desa 3: 1 dari pos terdekat
desa 4: 2 dari pos terdekat
desa 5: 1 dari pos terdekat
desa 6: 0 dari pos terdekat
desa 7: 2 dari pos terdekat
```

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `a-xi2-m7` (pertanyaan 1), sekitar tiga minggu lagi di `a-xi2-m9` (pertanyaan 2), dan sekitar delapan minggu lagi di `a-xi2-m14` (pertanyaan 3). Jawab sekarang lalu simpan.

1. Mengapa BFS memakai antrian dan dapat menemukan jarak terpendek pada graf tak berbobot?
2. Apa yang terjadi bila lupa menandai simpul sebagai sudah dikunjungi saat memasukkannya ke antrian?
3. Berapa langkah BFS pada graf dengan `n` simpul dan `m` sisi bila memakai daftar ketetanggaan?

## Kesalahan umum

- **Menandai saat keluar dari antrian, bukan saat masuk.** Satu simpul bisa masuk antrian berkali-kali sehingga langkah membengkak.
- **Memakai tumpukan lalu menyebutnya BFS.** Urutannya menjadi penelusuran mendalam dan jaraknya tak lagi terjamin terpendek.
- **Menyamakan jarak terpendek dengan jalur berbobot terkecil.** BFS menghitung banyak sisi; bila sisi berbobot berbeda, perlu algoritma lain.
- **Lupa menangani simpul yang tak terjangkau.** `dist` tetap `-1`; mencetaknya sebagai jarak 0 atau `-1` tanpa penjelasan menyesatkan.
- **Membangun jalur dengan arah terbalik.** Larik `induk` dibaca dari tujuan ke awal; balik dulu sebelum dicetak.

## Cek mandiri

- [ ] Saya dapat menelusuri isi antrian BFS dengan tangan.
- [ ] Saya dapat menulis BFS dengan `dist` dan antrian.
- [ ] Saya dapat mencetak jarak dan satu jalur terpendek.
- [ ] Saya dapat menyebut langkah BFS dengan daftar ketetanggaan.
- [ ] Saya dapat menjelaskan mengapa penanda diberikan saat masuk antrian.

## Kunci dan petunjuk

**Ingat kembali.** 1: daftar bila graf jarang atau `n` besar, karena memorinya `n + 2m` dan menelusuri tetangga hanya sebanyak derajat; matriks bila `n` kecil dan pemeriksaan sisi sangat sering, karena satu langkah tetapi memori `n * n`. 2: `O(n * W)` langkah; `O(n * W)` memori untuk tabel dua dimensi dan `O(W)` untuk satu dimensi. 3: hasil tiap strategi, banyak langkah (dihitung atau diukur), memori, data yang membuat greedy salah, strategi yang dipilih, dan alasannya. 4: LIFO: yang terakhir masuk keluar lebih dulu, contoh tumpukan piring; FIFO: yang pertama masuk keluar lebih dulu, contoh antrian loket.

**Prediksi dulu.** 1: `1 2 3 4 5`. 2: jarak 1 = 0, 2 = 1, 3 = 1, 4 = 2, 5 = 3. Keluaran sebenarnya:

```text
1 2 3 4 5 
jarak 1 = 0
jarak 2 = 1
jarak 3 = 1
jarak 4 = 2
jarak 5 = 3
```

**Contoh setengah jadi.** Isi: `0`, `-1`, dan `1`. Program lengkap pada graf kecil:

```cpp
#include <iostream>
#include <queue>
#include <vector>
using namespace std;

int main() {
  int n = 4;
  vector<vector<int>> adj(n + 1);
  adj[1] = {2};
  adj[2] = {1, 3};
  adj[3] = {2, 4};
  adj[4] = {3};
  int s = 1;
  vector<int> dist(n + 1, -1);
  queue<int> antrian;
  dist[s] = 0;
  antrian.push(s);
  while (!antrian.empty()) {
    int u = antrian.front();
    antrian.pop();
    for (int v : adj[u]) {
      if (dist[v] == -1) {
        dist[v] = dist[u] + 1;
        antrian.push(v);
      }
    }
  }
  for (int i = 1; i <= n; i++) {
    cout << "jarak " << i << " = " << dist[i] << "\n";
  }
}
```

Keluaran:

```text
jarak 1 = 0
jarak 2 = 1
jarak 3 = 2
jarak 4 = 3
```

**Soal Parsons.** Urutan benar: e, h, c, j, d, i, f, b, a, g, k (ketiga baris `}` setara dan boleh bertukar, asal penutupnya cocok dengan pembukanya).

**Latihan.** 1: pseudocode: `dist[*] = -1`; `dist[s] = 0`, masukkan `s`; selama antrian tak kosong: ambil `u`; untuk tiap tetangga `v` dengan `dist[v] == -1`: `dist[v] = dist[u] + 1`, masukkan `v`; cetak `dist`. Program contoh:

```cpp
#include <iostream>
#include <queue>
#include <vector>
using namespace std;

int main() {
  int n;
  int m;
  cin >> n >> m;
  vector<vector<int>> adj(n + 1);
  for (int k = 0; k < m; k++) {
    int u;
    int v;
    cin >> u >> v;
    adj[u].push_back(v);
    adj[v].push_back(u);
  }
  int s;
  cin >> s;
  vector<int> dist(n + 1, -1);
  queue<int> antrian;
  dist[s] = 0;
  antrian.push(s);
  while (!antrian.empty()) {
    int u = antrian.front();
    antrian.pop();
    for (int v : adj[u]) {
      if (dist[v] == -1) {
        dist[v] = dist[u] + 1;
        antrian.push(v);
      }
    }
  }
  for (int i = 1; i <= n; i++) {
    cout << i << ": " << dist[i] << "\n";
  }
}
```

Masukan (`masukan.txt`):

```text
5 3
1 2
2 3
4 5
2
```

Keluaran:

```text
1: 1
2: 0
3: 1
4: -1
5: -1
```

Simpul 4 dan 5 berada di kelompok lain sehingga `-1`. 2: dari desa 5: antrian `[5]`; ambil 5 masukkan 4 (`[4]`); ambil 4 masukkan 2 dan 3 (`[2, 3]`); ambil 2 masukkan 1 (`[3, 1]`); ambil 3 dan 1 tanpa tambahan. Jarak: 5 = 0, 4 = 1, 2 = 2, 3 = 2, 1 = 3. 3: program contoh:

```cpp
#include <iostream>
#include <queue>
#include <vector>
using namespace std;

int main() {
  int N;
  cin >> N;
  int batas = N;
  vector<int> dist(batas + 1, -1);
  queue<int> antrian;
  dist[1] = 0;
  antrian.push(1);
  while (!antrian.empty()) {
    int x = antrian.front();
    antrian.pop();
    int tetangga[2] = {x + 1, x * 2};
    for (int k = 0; k < 2; k++) {
      int y = tetangga[k];
      if (y <= batas && dist[y] == -1) {
        dist[y] = dist[x] + 1;
        antrian.push(y);
      }
    }
  }
  cout << "langkah paling sedikit ke " << N << ": " << dist[N] << "\n";
}
```

Masukan (`masukan.txt`):

```text
10
```

Keluaran:

```text
langkah paling sedikit ke 10: 4
```

Urutannya `1, 2, 4, 5, 10` (empat langkah). 4: program contoh:

```cpp
#include <iostream>
#include <queue>
#include <vector>
using namespace std;

int main() {
  int n;
  int m;
  cin >> n >> m;
  vector<vector<int>> adj(n + 1);
  for (int k = 0; k < m; k++) {
    int u;
    int v;
    cin >> u >> v;
    adj[u].push_back(v);
    adj[v].push_back(u);
  }
  int s;
  cin >> s;
  vector<int> dist(n + 1, -1);
  vector<int> banyak(n + 1, 0);
  queue<int> antrian;
  dist[s] = 0;
  antrian.push(s);
  while (!antrian.empty()) {
    int u = antrian.front();
    antrian.pop();
    banyak[dist[u]]++;
    for (int v : adj[u]) {
      if (dist[v] == -1) {
        dist[v] = dist[u] + 1;
        antrian.push(v);
      }
    }
  }
  for (int d = 0; d <= n && banyak[d] > 0; d++) {
    cout << "jarak " << d << ": " << banyak[d] << " simpul\n";
  }
}
```

Masukan (`masukan.txt`):

```text
6 6
1 2
1 3
2 4
3 4
4 5
5 6
1
```

Keluaran:

```text
jarak 0: 1 simpul
jarak 1: 2 simpul
jarak 2: 1 simpul
jarak 3: 1 simpul
jarak 4: 1 simpul
```

**Latihan bercampur.** 1: simpul diambil dari yang terakhir masuk, sehingga penelusuran menyusuri satu cabang sampai habis (bergaya mendalam); jarak yang diberikan tak lagi menjamin terpendek. 2: dengan matriks `O(n * n)`, `10^10` untuk contoh itu; dengan daftar `O(n + m)`, sekitar 500.000; pilih daftar. 3: simpan `map<string, int>` yang memberi nomor 1, 2, 3, ... pada nama baru saat dibaca (`ids.size() + 1`), simpan nama aslinya di `vector<string>` untuk mencetak hasil, lalu BFS bekerja pada nomor.

**Pengayaan (P).** Desa 4 dan 7 berjarak 2 dari pos terdekat (desa 4 dari desa 1 lewat 2 atau dari desa 6 lewat 5, desa 7 dari desa 1 lewat 3); satu BFS dengan dua awal sudah cukup, tanpa dua kali BFS.

**Ulang berjarak.** 1: karena simpul diproses menurut urutan masuknya, semua simpul berjarak `k` keluar sebelum yang berjarak `k + 1`, sehingga jarak pertama yang diberikan sudah yang terpendek (dalam banyak sisi, sisi tak berbobot). 2: simpul bisa masuk antrian berkali-kali sehingga langkah membengkak, dan pada graf bersiklus program bisa tak berhenti. 3: `O(n + m)`: tiap simpul diproses sekali dan tiap sisi diperiksa dua kali.

## Langkah berikutnya

Modul berikut: `a-xi2-m7` (DFS dan keterhubungan: komponen graf). Modul terkait: `matkom-himpunan-relasi-fungsi`. Bacaan lanjut: halaman cppreference tentang `std::queue`.
