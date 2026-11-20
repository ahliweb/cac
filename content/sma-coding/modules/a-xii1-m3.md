## Untuk siapa modul ini

Modul ini untuk murid kelas XII jalur A (Algoritmik dengan C++), minggu `A-XII1-M3` silabus v1.4.1: pohon rentang minimum. Prasyarat: modul `a-xii1-m2` (Dijkstra); pengurutan dengan pembanding dari `a-xi1-m8` dipakai di sini.

Modul ini karangan penyusun dan disetujui pemilik program pada 2026-11-20 (keputusan lewat dialog; catatan tinjauan menjadi tindak lanjut revisi). Butir `F-BK-c` dipetakan silabus sebagai dipenuhi jalur ini; pemenuhan butir mengikuti pemetaan silabus, bukan status modul. Keluarga materi OSN yang bertaut: `graph-tree`, yang seluruhnya ditandai pengayaan (P) di jembatan OSN, sehingga kelas reguler boleh melewatinya. Modul tidak menjanjikan kedalaman soal OSN.

Tiap soal latihan bertanda `AI: boleh` atau `AI: tanpa AI`. Masukan program lewat berkas: `./program < masukan.txt`. Semua data karangan.

## Ingat kembali

Jawab dari ingatan dulu, baru cek kunci. Soal 1 dari `a-xii1-m2`, soal 2 dari `a-xi2-m7`, soal 3 dari `a-xi2-m9`, soal 4 dari `a-xi1-m8`.

1. Mengapa Dijkstra tidak boleh dipakai pada sisi bobot negatif?
2. Bagaimana menghitung banyak komponen terhubung dengan DFS?
3. Mengapa `ios::sync_with_stdio(false)` mempercepat masukan, dan apa yang dihindari sesudah memakainya?
4. Mengapa pembanding untuk `std::sort` memakai `<`, bukan `<=`?

## Tujuan

Setelah modul ini kamu dapat:

- menjelaskan **pohon rentang** (menghubungkan semua simpul tanpa siklus) dan yang **minimum**;
- menerapkan algoritma Kruskal: urutkan sisi, ambil sisi yang tidak menutup siklus;
- menulis program MST yang melapor biaya total dan graf yang tidak terhubung (keluaran minggu ini: program MST);
- menyebut banyak langkah Kruskal.

## Prediksi dulu

Tugas baca-dan-prediksi, `AI: tanpa AI`. **Tebak dulu, tulis, baru jalankan.** Empat desa akan dihubungkan kabel. Kabel yang mungkin (desa, desa, biaya): `1 2 5`, `2 3 1`, `1 3 2`, `3 4 4`, `2 4 6`. Periksa sisi dari yang termurah; ambil sisi bila ia menghubungkan dua desa yang belum terhubung lewat kabel yang sudah diambil.

1. Sisi mana yang diambil, mana yang ditolak, dan berapa biaya totalnya?
2. Berapa sisi yang diambil, dan apa hubungannya dengan 4 desa?

## Contoh terselesaikan

Pohon rentang graf terhubung adalah himpunan sisi yang menghubungkan semua simpul tanpa siklus; ia selalu punya `n - 1` sisi. **Pohon rentang minimum** (MST) adalah yang jumlah bobotnya terkecil. **Kruskal** mengurutkan semua sisi menurut bobot lalu memeriksanya satu per satu: sisi diambil bila kedua ujungnya berada di **komponen berbeda**; bila sudah sekomponen, sisi itu menutup siklus dan ditolak. Mengapa serakah ini benar: sisi termurah yang menghubungkan dua kelompok simpul tidak mungkin merugikan, sebab pohon rentang lain yang memakai sisi lebih mahal di tempat itu tidak lebih murah (sifat potongan; buktinya dibahas di bacaan lanjut).

Untuk mengetahui komponen, program memberi tiap simpul sebuah **label** dan, saat menggabung, mengganti semua label lama dengan label baru. Cara itu lambat dan diperbaiki di modul berikut.

```cpp
#include <algorithm>
#include <iostream>
#include <vector>
using namespace std;

struct Sisi {
  int u;
  int v;
  int bobot;
};

bool lebihDulu(const Sisi& a, const Sisi& b) {
  if (a.bobot != b.bobot) {
    return a.bobot < b.bobot;
  }
  if (a.u != b.u) {
    return a.u < b.u;
  }
  return a.v < b.v;
}

int main() {
  int n, m;
  cin >> n >> m;
  vector<Sisi> sisi(m);
  for (int i = 0; i < m; i++) {
    cin >> sisi[i].u >> sisi[i].v >> sisi[i].bobot;
  }
  sort(sisi.begin(), sisi.end(), lebihDulu);
  vector<int> komp(n + 1);
  for (int i = 1; i <= n; i++) {
    komp[i] = i;
  }
  long long total = 0;
  int dipilih = 0;
  int ganti = 0;
  for (const Sisi& e : sisi) {
    if (komp[e.u] == komp[e.v]) {
      cout << "tolak " << e.u << "-" << e.v << " (" << e.bobot << "): membentuk siklus\n";
      continue;
    }
    int lama = komp[e.v];
    int baru = komp[e.u];
    for (int i = 1; i <= n; i++) {
      if (komp[i] == lama) {
        komp[i] = baru;
        ganti++;
      }
    }
    total += e.bobot;
    dipilih++;
    cout << "pilih " << e.u << "-" << e.v << " (" << e.bobot << ")\n";
  }
  cout << "biaya " << total << " dengan " << dipilih << " sisi";
  if (dipilih < n - 1) {
    cout << ", graf tidak terhubung\n";
  } else {
    cout << "\n";
  }
  cout << ganti << " penggantian label\n";
}
```

Masukan (`masukan.txt`):

```text
6 9
1 2 4
1 3 3
2 3 2
2 4 5
3 4 7
3 5 6
4 5 1
4 6 8
5 6 3
```

Keluaran:

```text
pilih 4-5 (1)
pilih 2-3 (2)
pilih 1-3 (3)
pilih 5-6 (3)
tolak 1-2 (4): membentuk siklus
pilih 2-4 (5)
tolak 3-5 (6): membentuk siklus
tolak 3-4 (7): membentuk siklus
tolak 4-6 (8): membentuk siklus
biaya 14 dengan 5 sisi
8 penggantian label
```

Cocokkan dengan prediksimu pada pola yang sama. Pengurutan sekitar `m * log2 m = 9 * 3 = 27` perbandingan, dan 9 pemeriksaan sisi. Penggantian label ada 8, paling banyak `n * (n - 1) = 30`. Jadi waktunya `O(m log m + n^2)`.

Bila graf tidak terhubung, hasilnya **hutan rentang**: pohon pada tiap komponen, dengan kurang dari `n - 1` sisi. Masukan berikut punya dua komponen:

```text
5 3
1 2 6
2 3 2
4 5 9
```

```text
pilih 2-3 (2)
pilih 1-2 (6)
pilih 4-5 (9)
biaya 17 dengan 3 sisi, graf tidak terhubung
4 penggantian label
```

Tiga sisi saja, jadi `5 - 3 = 2` komponen.

## Contoh setengah jadi

Lengkapi pembanding urutan dan pemeriksaan siklus.

```cpp setengah-jadi
bool lebihDulu(const Sisi& a, const Sisi& b) {
  return a.____ < b.____;
}
// ...
if (komp[e.u] ____ komp[e.v]) {
  continue;  // sisi ini menutup siklus
}
```

## Soal Parsons

Susun enam baris berikut (sudah diacak) menjadi satu langkah Kruskal untuk sisi `e`. `AI: tanpa AI`.

```text
(a)   int lama = komp[e.v];
(b)   for (int i = 1; i <= n; i++) {
(c)     if (komp[i] == lama) komp[i] = komp[e.u];
(d)   }
(e)   total += e.bobot;
(f)   if (komp[e.u] == komp[e.v]) continue;
```

## Latihan

1. `AI: boleh` **Biaya jaringan minimum.** Lima gedung, kabel (gedung, gedung, biaya): `1 2 3`, `1 3 8`, `2 3 4`, `2 4 7`, `3 4 2`, `3 5 6`, `4 5 9`. Tulis pseudocode dulu, lalu cari biaya minimum.
2. `AI: boleh` **Komponen.** Tambahkan keluaran banyak komponen graf, dan satu kalimat bila graf terhubung.
3. `AI: tanpa AI` **Telusur.** Pada graf soal 1, tulis larik `komp` sesudah tiap sisi diambil, dan jumlah penggantian label.
4. `AI: boleh` **Maksimum.** Ubah program agar menghasilkan pohon rentang dengan biaya **terbesar**. Apa satu baris yang diubah?
5. *Opsional:* **catatan pemakaian AI.** Bila memakai AI generatif, jawab nomor 3 sendiri dulu, lalu minta penjelasan atau petunjuk bertahap, bukan program jadi. Catat alat, tujuan, garis besar perintah, bagian yang kamu pakai, dan cara memeriksanya. Jangan menaruh data pribadi atau tugas bernilai pada perintah.

## Latihan bercampur

1. `AI: boleh` Segitiga `1 2 2`, `2 3 2`, `1 3 3`. Apakah pohon rentang minimumnya sama dengan pohon lintasan terpendek dari simpul 1 (modul `a-xii1-m2`)?
2. `AI: tanpa AI` Pada graf tak terhubung, berapa komponen bila Kruskal memilih `k` sisi (modul `a-xi2-m7`)?
3. `AI: boleh` Bila ada dua sisi berbobot sama, urutan mana pun memberi biaya total sama, tetapi sisi terpilih bisa berbeda. Mengapa pembanding tiga kunci pada program contoh membuat hasilnya selalu sama (modul `a-xi1-m8`)?

## Pengayaan (P)

Boleh dilewati. **Prim** menumbuhkan satu pohon dari satu simpul: selalu ambil sisi termurah yang menghubungkan pohon ke simpul di luarnya, dengan antrian prioritas seperti Dijkstra tetapi kuncinya bobot **sisi**, bukan jarak dari awal. Pada graf yang sama dengan contoh, hasilnya harus sama:

```cpp
#include <functional>
#include <iostream>
#include <queue>
#include <utility>
#include <vector>
using namespace std;

int main() {
  int n = 6;
  int sisi[9][3] = {{1, 2, 4}, {1, 3, 3}, {2, 3, 2}, {2, 4, 5}, {3, 4, 7},
                    {3, 5, 6}, {4, 5, 1}, {4, 6, 8}, {5, 6, 3}};
  vector<vector<pair<int, int>>> adj(n + 1);
  for (int i = 0; i < 9; i++) {
    adj[sisi[i][0]].push_back({sisi[i][1], sisi[i][2]});
    adj[sisi[i][1]].push_back({sisi[i][0], sisi[i][2]});
  }
  vector<bool> masuk(n + 1, false);
  priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> pq;
  pq.push({0, 1});
  int total = 0;
  int dipilih = 0;
  while (!pq.empty()) {
    pair<int, int> teratas = pq.top();
    pq.pop();
    int u = teratas.second;
    if (masuk[u]) {
      continue;
    }
    masuk[u] = true;
    total += teratas.first;
    dipilih++;
    for (const auto& e : adj[u]) {
      if (!masuk[e.first]) {
        pq.push({e.second, e.first});
      }
    }
  }
  cout << "biaya Prim " << total << " dengan " << dipilih - 1 << " sisi\n";
}
```

Keluaran:

```text
biaya Prim 14 dengan 5 sisi
```

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `a-xii1-m4` (pertanyaan 1), sekitar tiga minggu lagi di `a-xii1-m6` (pertanyaan 2), dan sekitar delapan minggu lagi di `a-xii1-m11` (pertanyaan 3). Jawab sekarang lalu simpan.

1. Mengapa Kruskal mengurutkan sisi menurut bobot dan menolak sisi yang menutup siklus?
2. Berapa sisi pohon rentang dari graf terhubung dengan `n` simpul?
3. Apa beda pohon rentang minimum dan pohon lintasan terpendek dari satu simpul?

## Kesalahan umum

- **Mengambil sisi tanpa memeriksa komponen.** Biaya mungkin turun, tetapi hasilnya memuat siklus.
- **Mengira MST memberi lintasan terpendek.** MST meminimumkan jumlah bobot seluruh pohon, bukan jarak dari simpul tertentu.
- **Mengurutkan menurun.** Hasilnya pohon biaya maksimum.
- **Lupa memeriksa jumlah sisi terpilih.** Bila kurang dari `n - 1`, graf tidak terhubung.
- **Mengganti label hanya satu simpul saat menggabung.** Komponen lama tertinggal dengan label berbeda.

## Cek mandiri

- [ ] Saya dapat menjelaskan pohon rentang dan mengapa sisinya `n - 1`.
- [ ] Saya dapat menjalankan Kruskal dengan tangan.
- [ ] Saya dapat menulis pembanding sisi dan program Kruskal.
- [ ] Saya dapat mendeteksi graf tak terhubung dari jumlah sisi terpilih.
- [ ] Saya dapat menyebut `O(m log m + n^2)` untuk versi label.

## Kunci dan petunjuk

**Ingat kembali.** 1: gagasan "yang keluar lebih dulu sudah final" bergantung pada jalan lain yang hanya menambah jarak; sisi negatif bisa memperpendek jalan lewat simpul yang keluar belakangan. 2: untuk tiap simpul yang belum dikunjungi, mulai DFS baru dan tambah hitungan satu; banyak DFS baru yang dimulai adalah banyak komponen. 3: tanpa sinkronisasi dengan `stdio`, `cin` tidak perlu berbagi buffer dengan C; yang dihindari adalah mencampur `cin` dengan `scanf`, `getchar`, atau sejenisnya, karena jaminan urutannya hilang. 4: karena dua elemen setara tidak boleh dinyatakan saling mendahului; `<=` melanggar aturan itu.

**Prediksi dulu.** 1: urutan `2 3 1` (diambil), `1 3 2` (diambil), `3 4 4` (diambil), `1 2 5` (ditolak: 1 dan 2 sudah terhubung lewat 3), `2 4 6` (ditolak); biaya `1 + 2 + 4 = 7`. 2: tiga sisi, yaitu `n - 1 = 3`.

**Contoh setengah jadi.** Isi: `bobot`, `bobot`, `==`. Program lengkap yang mencetak biaya total:

```cpp
#include <algorithm>
#include <iostream>
#include <vector>
using namespace std;

struct Sisi {
  int u;
  int v;
  int bobot;
};

bool lebihDulu(const Sisi& a, const Sisi& b) {
  return a.bobot < b.bobot;
}

int main() {
  int n, m;
  cin >> n >> m;
  vector<Sisi> sisi(m);
  for (int i = 0; i < m; i++) {
    cin >> sisi[i].u >> sisi[i].v >> sisi[i].bobot;
  }
  sort(sisi.begin(), sisi.end(), lebihDulu);
  vector<int> komp(n + 1);
  for (int i = 1; i <= n; i++) {
    komp[i] = i;
  }
  int total = 0;
  for (const Sisi& e : sisi) {
    if (komp[e.u] == komp[e.v]) {
      continue;
    }
    int lama = komp[e.v];
    for (int i = 1; i <= n; i++) {
      if (komp[i] == lama) {
        komp[i] = komp[e.u];
      }
    }
    total += e.bobot;
  }
  cout << total << "\n";
}
```

Masukan (`masukan.txt`):

```text
6 9
1 2 4
1 3 3
2 3 2
2 4 5
3 4 7
3 5 6
4 5 1
4 6 8
5 6 3
```

Keluaran:

```text
14
```

**Soal Parsons.** Urutan benar: f, a, b, c, d, e. Pemeriksaan siklus (f) lebih dulu; `lama` disimpan di (a) sebelum perulangan menimpa label.

**Latihan.** 1: urutan sisi `3 4 2`, `1 2 3`, `2 3 4`, `3 5 6` diambil, sisanya ditolak; biaya `2 + 3 + 4 + 6 = 15`. 2: komponen `n - dipilih`; terhubung bila `dipilih == n - 1`. 3: awal `1 2 3 4 5`; sesudah `3-4`: `1 2 3 3 5`; sesudah `1-2`: `1 1 3 3 5`; sesudah `2-3`: `1 1 1 1 5`; sesudah `3-5`: `1 1 1 1 1`; penggantian label `1 + 1 + 2 + 1 = 5`. 4: ubah pembanding menjadi `a.bobot > b.bobot`.

**Latihan bercampur.** 1: tidak sama. MST mengambil `1-2` dan `2-3` (biaya 4), sedangkan pohon lintasan terpendek dari 1 mengambil `1-2` dan `1-3`, karena jarak ke 3 langsung 3 lebih pendek daripada `2 + 2 = 4`. 2: `n - k` komponen. 3: karena bobot sama diurutkan lagi menurut `u` lalu `v`, sehingga urutan sisi bobot sama pasti tunggal dan hasilnya selalu sama.

**Pengayaan (P).** Tidak ada kunci tunggal; pastikan biaya Prim sama dengan Kruskal untuk graf yang sama.

**Ulang berjarak.** 1: mengurutkan agar sisi termurah dipertimbangkan lebih dulu, dan menolak sisi sekomponen karena ia menutup siklus sehingga bukan lagi pohon. 2: `n - 1` sisi. 3: MST meminimumkan jumlah bobot seluruh pohon; pohon lintasan terpendek meminimumkan jarak dari satu simpul ke tiap simpul lain, sehingga keduanya bisa memilih sisi berbeda.

## Langkah berikutnya

Modul berikut: `a-xii1-m4` (himpunan saling lepas, yang menggantikan label dengan struktur yang jauh lebih cepat). Modul terkait: `matkom-pertumbuhan-fungsi`. Bacaan lanjut: halaman cppreference tentang `std::sort`.
