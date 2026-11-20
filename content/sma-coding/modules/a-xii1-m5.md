## Untuk siapa modul ini

Modul ini untuk murid kelas XII jalur A (Algoritmik dengan C++), minggu `A-XII1-M5` silabus v1.4.1: pohon berakar dan LCA (leluhur bersama terendah). Prasyarat: modul `a-xii1-m4` dan `a-xi2-m7` (DFS dan keterhubungan); BFS dari `a-xi2-m6` dipakai di sini.

Modul ini karangan penyusun dan disetujui pemilik program pada 2026-11-20 (keputusan lewat dialog; catatan tinjauan menjadi tindak lanjut revisi). Butir `F-BK-c` dipetakan silabus sebagai dipenuhi jalur ini; pemenuhan butir mengikuti pemetaan silabus, bukan status modul. Keluarga materi OSN yang bertaut: `graph-tree`, yang seluruhnya ditandai pengayaan (P) di jembatan OSN, sehingga kelas reguler boleh melewatinya. Modul tidak menjanjikan kedalaman soal OSN.

Tiap soal latihan bertanda `AI: boleh` atau `AI: tanpa AI`. Masukan program lewat berkas: `./program < masukan.txt`. Semua data karangan.

## Ingat kembali

Jawab dari ingatan dulu, baru cek kunci. Soal 1 dari `a-xii1-m4`, soal 2 dari `a-xii1-m2`, soal 3 dari `a-xi2-m11`, soal 4 dari `a-xi2-m8`.

1. Apa yang dilakukan kompresi lintasan pada `cari`?
2. Mengapa Dijkstra melewati entri yang jaraknya lebih besar daripada `dist[u]` saat entri itu keluar dari antrian?
3. Mengapa lisensi dibaca pada halaman dataset itu sendiri, bukan diandaikan dari portal yang menampungnya?
4. Mengapa DFS rekursif berisiko pada graf yang sangat dalam, dan apa penggantinya?

## Tujuan

Setelah modul ini kamu dapat:

- memodelkan **pohon berakar** dan memakai istilah induk, anak, daun, kedalaman, dan ukuran subpohon;
- menghitung induk, kedalaman, dan ukuran subpohon dengan satu BFS dari akar (keluaran minggu ini: program pohon);
- menjelaskan LCA dan mencarinya dengan menaikkan simpul menurut kedalaman;
- menghitung jarak dua simpul lewat LCA dan menyebut `O(kedalaman)` per kueri.

## Prediksi dulu

Tugas baca-dan-prediksi, `AI: tanpa AI`. **Tebak dulu, tulis, baru jalankan.** Pohon sembilan simpul dengan akar 1; baris pertama banyak simpul, sisanya sisi:

```text
9
1 2
1 3
2 4
2 5
3 6
5 7
5 8
6 9
```

1. Berapa kedalaman simpul 9 (akar kedalaman 0), dan siapa induk simpul 7?
2. Berapa ukuran subpohon simpul 5, termasuk dirinya sendiri?
3. Siapa leluhur bersama terendah simpul 7 dan 8, dan siapa untuk simpul 4 dan 9?

## Contoh terselesaikan

**Pohon** adalah graf terhubung tanpa siklus dengan `n - 1` sisi. Pilih satu simpul sebagai **akar**, dan setiap sisi mendapat arah: tiap simpul selain akar punya satu **induk**, dan simpul di bawahnya adalah **anak**. **Daun** adalah simpul tanpa anak. **Kedalaman** simpul adalah banyak sisi ke akar, dan **subpohon** sebuah simpul adalah ia beserta semua keturunannya.

Satu BFS dari akar memberi induk dan kedalaman sekaligus (jarak BFS pada pohon adalah kedalaman). Simpul selalu ditemukan **sesudah** induknya, sehingga bila urutan BFS dibaca **mundur**, tiap simpul bisa menambahkan ukurannya ke induknya. Tanpa rekursi, jadi aman untuk pohon yang dalam.

```cpp
#include <iostream>
#include <queue>
#include <vector>
using namespace std;

int main() {
  int n;
  cin >> n;
  vector<vector<int>> adj(n + 1);
  for (int i = 0; i < n - 1; i++) {
    int u, v;
    cin >> u >> v;
    adj[u].push_back(v);
    adj[v].push_back(u);
  }
  vector<int> induk(n + 1, 0);
  vector<int> kedalaman(n + 1, -1);
  vector<int> urutan;
  queue<int> antrian;
  kedalaman[1] = 0;
  antrian.push(1);
  while (!antrian.empty()) {
    int u = antrian.front();
    antrian.pop();
    urutan.push_back(u);
    for (int v : adj[u]) {
      if (kedalaman[v] == -1) {
        kedalaman[v] = kedalaman[u] + 1;
        induk[v] = u;
        antrian.push(v);
      }
    }
  }
  vector<int> ukuran(n + 1, 1);
  for (int i = n - 1; i > 0; i--) {
    int v = urutan[i];
    ukuran[induk[v]] += ukuran[v];
  }
  cout << "simpul induk kedalaman ukuran\n";
  for (int i = 1; i <= n; i++) {
    cout << i << " " << induk[i] << " " << kedalaman[i] << " " << ukuran[i] << "\n";
  }
}
```

Masukan (`masukan.txt`):

```text
9
1 2
1 3
2 4
2 5
3 6
5 7
5 8
6 9
```

Keluaran:

```text
simpul induk kedalaman ukuran
1 0 0 9
2 1 1 5
3 1 1 3
4 2 2 1
5 2 2 3
6 3 2 2
7 5 3 1
8 5 3 1
9 6 3 1
```

Cocokkan dengan prediksimu. Tiap sisi diperiksa dua kali dan tiap simpul masuk antrian sekali, jadi sekitar `2 * 8 + 9 = 25` langkah, `O(n)`.

**LCA** dua simpul adalah leluhur bersama (pada jalur ke akar) yang paling dalam. Cara sederhana: naikkan simpul yang **lebih dalam** sampai kedalamannya sama, lalu naikkan keduanya bersama sampai bertemu. Jarak antara dua simpul adalah `kedalaman[u] + kedalaman[v] - 2 * kedalaman[lca]`.

```cpp
#include <iostream>
#include <queue>
#include <vector>
using namespace std;

int main() {
  int n;
  cin >> n;
  vector<vector<int>> adj(n + 1);
  for (int i = 0; i < n - 1; i++) {
    int u, v;
    cin >> u >> v;
    adj[u].push_back(v);
    adj[v].push_back(u);
  }
  vector<int> induk(n + 1, 0);
  vector<int> kedalaman(n + 1, -1);
  queue<int> antrian;
  kedalaman[1] = 0;
  antrian.push(1);
  while (!antrian.empty()) {
    int u = antrian.front();
    antrian.pop();
    for (int v : adj[u]) {
      if (kedalaman[v] == -1) {
        kedalaman[v] = kedalaman[u] + 1;
        induk[v] = u;
        antrian.push(v);
      }
    }
  }
  int q;
  cin >> q;
  for (int i = 0; i < q; i++) {
    int u, v;
    cin >> u >> v;
    int a = u;
    int b = v;
    int naik = 0;
    while (kedalaman[a] > kedalaman[b]) {
      a = induk[a];
      naik++;
    }
    while (kedalaman[b] > kedalaman[a]) {
      b = induk[b];
      naik++;
    }
    while (a != b) {
      a = induk[a];
      b = induk[b];
      naik += 2;
    }
    int jarak = kedalaman[u] + kedalaman[v] - 2 * kedalaman[a];
    cout << "lca(" << u << ", " << v << ") = " << a << ", jarak " << jarak << " sisi, naik " << naik << " langkah\n";
  }
}
```

Masukan (`masukan.txt`; setelah pohon, banyak kueri lalu pasangan simpul):

```text
9
1 2
1 3
2 4
2 5
3 6
5 7
5 8
6 9
4
7 8
4 9
7 4
9 3
```

Keluaran:

```text
lca(7, 8) = 5, jarak 2 sisi, naik 2 langkah
lca(4, 9) = 1, jarak 5 sisi, naik 5 langkah
lca(7, 4) = 2, jarak 3 sisi, naik 3 langkah
lca(9, 3) = 3, jarak 2 sisi, naik 2 langkah
```

Pada kueri `(4, 9)` naik 5 langkah: 4 dan 9 berkedalaman 2 dan 3; 9 naik satu, lalu keduanya naik bersama dua kali ke akar. Kueri `(9, 3)` hanya 2 langkah karena 3 sendiri leluhur 9. Waktu tiap kueri `O(kedalaman)`: pada pohon berbentuk rantai itu `O(n)`, dan untuk `q` kueri `O(q * n)`.

## Contoh setengah jadi

Lengkapi LCA sederhana: penyamaan kedalaman, lalu naik bersama.

```cpp setengah-jadi
while (kedalaman[a] > ____) {
  a = ____[a];
}
while (a != b) {
  a = induk[a];
  b = ____[b];
}
```

## Soal Parsons

Susun lima baris berikut (sudah diacak) menjadi penghitung ukuran subpohon dari `urutan` BFS. `AI: tanpa AI`.

```text
(a) for (int i = n - 1; i > 0; i--) {
(b)   ukuran[induk[v]] += ukuran[v];
(c) }
(d) vector<int> ukuran(n + 1, 1);
(e)   int v = urutan[i];
```

## Latihan

1. `AI: boleh` **Kedalaman dan LCA.** Pohon tujuh simpul: `1 2`, `1 3`, `2 4`, `2 5`, `3 6`, `3 7`, akar 1. Tulis pseudocode dulu, lalu cetak kedalaman tiap simpul dan LCA dari `(4, 5)`, `(4, 6)`, `(7, 3)`.
2. `AI: boleh` **Jarak.** Cetak jarak antara dua simpul lewat LCA. Berapa jarak `(4, 7)` pada pohon soal 1?
3. `AI: tanpa AI` **Telusur.** Pada pohon Prediksi, tulis urutan BFS dari 1, induk tiap simpul, dan ukuran tiap subpohon.
4. `AI: boleh` **Daun dan tinggi.** Hitung banyak daun dan tinggi pohon (kedalaman terbesar).
5. *Opsional:* **catatan pemakaian AI.** Bila memakai AI generatif, jawab nomor 3 sendiri dulu, lalu minta penjelasan atau petunjuk bertahap, bukan program jadi. Catat alat, tujuan, garis besar perintah, bagian yang kamu pakai, dan cara memeriksanya. Jangan menaruh data pribadi atau tugas bernilai pada perintah.

## Latihan bercampur

1. `AI: boleh` Mengapa kedalaman dari BFS sama dengan jarak dari akar pada pohon (modul `a-xi2-m6`)?
2. `AI: tanpa AI` Masukan berisi `n - 1` sisi. Bagaimana DSU memeriksa bahwa sisi-sisi itu benar membentuk pohon (modul `a-xii1-m4`)?
3. `AI: boleh` Pada pohon berbobot, jarak dari akar ke semua simpul cukup dihitung dengan satu penelusuran, tanpa antrian prioritas. Mengapa (modul `a-xii1-m2`)?

## Pengayaan (P)

Boleh dilewati. Untuk `q` kueri besar, naik satu langkah per langkah terlalu lambat. **Loncatan biner** menyimpan `naik[j][v]`, leluhur ke-`2^j` dari `v`. Tabelnya `n * log2 n` sel dan tiap kueri `O(log n)`: selisih kedalaman diurai menjadi bit-bitnya, lalu kedua simpul meloncat sejauh mungkin selama leluhurnya masih berbeda. Untuk `n = q = 100.000`, kira-kira `100.000 * 17 = 1,7 juta` langkah, dibanding hingga `10^10` pada cara sederhana.

```cpp
#include <iostream>
#include <utility>
using namespace std;

int main() {
  const int LOG = 4;
  int n = 9;
  int induk[10] = {0, 0, 1, 1, 2, 2, 3, 5, 5, 6};
  int kedalaman[10];
  int naik[LOG][10];
  kedalaman[1] = 0;
  for (int v = 2; v <= n; v++) {
    kedalaman[v] = kedalaman[induk[v]] + 1;
  }
  for (int v = 0; v <= n; v++) {
    naik[0][v] = induk[v];
  }
  for (int j = 1; j < LOG; j++) {
    for (int v = 0; v <= n; v++) {
      naik[j][v] = naik[j - 1][naik[j - 1][v]];
    }
  }
  int u = 7;
  int v = 9;
  int a = u;
  int b = v;
  if (kedalaman[a] < kedalaman[b]) {
    swap(a, b);
  }
  int selisih = kedalaman[a] - kedalaman[b];
  int lompat = 0;
  for (int j = 0; j < LOG; j++) {
    if ((selisih >> j) & 1) {
      a = naik[j][a];
      lompat++;
    }
  }
  if (a != b) {
    for (int j = LOG - 1; j >= 0; j--) {
      if (naik[j][a] != naik[j][b]) {
        a = naik[j][a];
        b = naik[j][b];
        lompat += 2;
      }
    }
    a = induk[a];
  }
  cout << "lca(" << u << ", " << v << ") = " << a << " dengan " << lompat << " lompatan\n";
}
```

Keluaran:

```text
lca(7, 9) = 1 dengan 2 lompatan
```

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `a-xii1-m6` (pertanyaan 1), sekitar tiga minggu lagi di `a-xii1-m8` (pertanyaan 2), dan sekitar delapan minggu lagi di `a-xii1-m13` (pertanyaan 3). Jawab sekarang lalu simpan.

1. Bagaimana menghitung kedalaman semua simpul pohon berakar dengan satu penelusuran dari akar?
2. Apa yang dilakukan lebih dulu pada LCA sederhana bila dua simpul berbeda kedalaman?
3. Berapa langkah LCA sederhana pada pohon berbentuk rantai `n` simpul, dan mengapa?

## Kesalahan umum

- **Membahas induk dan anak tanpa memilih akar.** Pohon tak berakar tidak punya arah.
- **Menaikkan kedua simpul bersama sebelum kedalamannya sama.** Keduanya bisa saling melewati LCA.
- **Mengurangi kedalaman LCA hanya sekali pada jarak.** Rumusnya `2 * kedalaman[lca]`.
- **Memakai DFS rekursif pada rantai sangat dalam.** Tumpukan pemanggilan penuh.
- **Tidak konsisten kedalaman akar (0 atau 1).** Selisih tetap benar, tetapi angka yang dicetak berbeda satu.

## Cek mandiri

- [ ] Saya dapat menjelaskan induk, anak, daun, kedalaman, dan subpohon.
- [ ] Saya dapat menghitung induk, kedalaman, dan ukuran dengan BFS.
- [ ] Saya dapat mencari LCA dengan menaikkan simpul.
- [ ] Saya dapat menghitung jarak dua simpul lewat LCA.
- [ ] Saya dapat menyebut `O(kedalaman)` per kueri dan kapan itu terlalu lambat.

## Kunci dan petunjuk

**Ingat kembali.** 1: membuat semua simpul di lintasan pencarian langsung menunjuk akar, sehingga pencarian berikutnya lebih pendek. 2: karena `priority_queue` tidak mengubah entri; entri lama tetap tinggal dan keluar belakangan dengan jarak yang sudah tertinggal. 3: karena lisensi bisa berbeda tiap dataset; halaman depan portal yang dibuka penyusun tidak memuat keterangan lisensi. 4: sebuah graf sangat dalam bisa menumpuk satu juta pemanggilan bersarang dan memenuhi tumpukan; ganti dengan antrian atau tumpukan buatan sendiri.

**Prediksi dulu.** 1: kedalaman 3 (`9 -> 6 -> 3 -> 1`); induk simpul 7 adalah 5. 2: 3 simpul (5, 7, dan 8). 3: LCA(7, 8) adalah 5; LCA(4, 9) adalah 1.

**Contoh setengah jadi.** Isi: `kedalaman[b]`, `induk`, `induk`. Program lengkap yang mencetak LCA tiap kueri:

```cpp
#include <iostream>
#include <queue>
#include <vector>
using namespace std;

int main() {
  int n;
  cin >> n;
  vector<vector<int>> adj(n + 1);
  for (int i = 0; i < n - 1; i++) {
    int u, v;
    cin >> u >> v;
    adj[u].push_back(v);
    adj[v].push_back(u);
  }
  vector<int> induk(n + 1, 0);
  vector<int> kedalaman(n + 1, -1);
  queue<int> antrian;
  kedalaman[1] = 0;
  antrian.push(1);
  while (!antrian.empty()) {
    int u = antrian.front();
    antrian.pop();
    for (int v : adj[u]) {
      if (kedalaman[v] == -1) {
        kedalaman[v] = kedalaman[u] + 1;
        induk[v] = u;
        antrian.push(v);
      }
    }
  }
  int q;
  cin >> q;
  for (int i = 0; i < q; i++) {
    int a, b;
    cin >> a >> b;
    while (kedalaman[a] > kedalaman[b]) {
      a = induk[a];
    }
    while (kedalaman[b] > kedalaman[a]) {
      b = induk[b];
    }
    while (a != b) {
      a = induk[a];
      b = induk[b];
    }
    cout << a << "\n";
  }
}
```

Masukan (`masukan.txt`):

```text
9
1 2
1 3
2 4
2 5
3 6
5 7
5 8
6 9
4
7 8
4 9
7 4
9 3
```

Keluaran:

```text
5
1
2
3
```

**Soal Parsons.** Urutan benar: d, a, e, b, c. Ukuran awal 1 (d), lalu dari simpul terakhir ke awal (a), ambil simpulnya (e), dan tambahkan ke induknya (b).

**Latihan.** 1: kedalaman `0 1 1 2 2 2 2`; LCA(4,5) = 2, LCA(4,6) = 1, LCA(7,3) = 3. 2: `kedalaman[u] + kedalaman[v] - 2 * kedalaman[lca]`; jarak (4, 7) = `2 + 2 - 0 = 4`. 3: urutan BFS `1 2 3 4 5 6 7 8 9`; induk `0 1 1 2 2 3 5 5 6`; ukuran `9 5 3 1 3 2 1 1 1`. 4: daun adalah simpul tanpa anak (bukan akar): pohon Prediksi memiliki 4 daun (4, 7, 8, 9) dan tinggi 3.

**Latihan bercampur.** 1: BFS memberi jarak paling sedikit sisi dari akar, dan pada pohon hanya ada satu lintasan ke tiap simpul, jadi itu sama dengan kedalaman. 2: tambahkan sisi satu per satu; bila `gabung` mengembalikan `false` ada siklus; dan setelah `n - 1` sisi tanpa siklus, graf terhubung dan berbentuk pohon. 3: hanya ada satu lintasan dari akar ke tiap simpul, sehingga jarak tinggal ditambahkan sepanjang jalan dari induk dengan `O(n)` tanpa memilih yang terpendek.

**Pengayaan (P).** Tidak ada kunci tunggal; pastikan kamu dapat menjelaskan mengapa loncatan dicoba dari yang terbesar ke yang terkecil.

**Ulang berjarak.** 1: mulai dari akar dengan kedalaman 0; tiap anak berkedalaman induknya ditambah 1, dengan BFS atau DFS. 2: naikkan simpul yang lebih dalam sampai kedalamannya sama dengan yang lain. 3: sekitar `n` langkah, karena pada rantai kedalaman terbesar `n - 1` dan simpul terdalam harus naik sepanjang itu.

## Langkah berikutnya

Modul berikut: `a-xii1-m6` (aturan berhitung I). Modul terkait: `matkom-himpunan-relasi-fungsi`. Bacaan lanjut: halaman cppreference tentang `std::queue`.
