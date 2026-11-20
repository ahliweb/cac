## Untuk siapa modul ini

Modul belajar untuk mata kuliah `KUL-K-301` (2 SKS, semester 5, jalur K),
bagian dari program `kuliah-coding`. Konten ini karangan menurut ADR-0007 dan disetujui pemilik program pada 2026-11-20 (keputusan lewat dialog; catatan tinjauan menjadi tindak lanjut revisi). Kode di modul adalah **C++17** (g++ 13.3, Linux): tiap blok
`cpp` yang lengkap dikompilasi dengan `-std=c++17 -Wall -Wextra` tanpa
peringatan, dijalankan, dan keluarannya cocok dengan yang tertulis.

Pembacanya mahasiswa semester 5 yang sudah menempuh `KUL-K-201` (templat, I/O
cepat, pustaka standar, pencarian biner, greedy, DP dasar, BFS dan DFS). Satu
mata kuliah, satu semester: 14 pertemuan, 2 SKS. Kamu butuh g++ (C++17), Git,
dan kertas untuk menulis argumen kebenaran. Matematika diskret (`KUL-I-103`)
dipakai di bagian graf dan teori bilangan.

**Tingkat AI: Merah saat kontes dan latihan kontes** (silabus 6.3). Soal latihan
di modul ini karangan sendiri; soal kontes nyata hanya **ditautkan** ke arsip
resminya dan tidak disalin.

## Peta semester

| Pertemuan | Bagian | Pokok bahasan | CPMK | Kuis pembuka (jarak) |
| --- | --- | --- | --- | --- |
| 1 | 1 | DP lanjutan: dua barisan (LCS) | C1, C3 | `KUL-K-201`: DP koin dan syarat pencarian biner |
| 2 | 1 | DP: pelacakan jawaban dan optimasi memori | C1, C3 | 1, lalu `KUL-K-201`: BFS |
| 3 | 1 | DP bitmask | C1 | 2, lalu 1 |
| 4 | 1 | DP bitmask: kompleksitas dan batas; **kontes tim 1** | C1, C3 | 3, lalu 1 |
| 5 | 2 | Jalur terpendek berbobot: Dijkstra | C1 | 4, lalu 2 |
| 6 | 2 | Pohon rentang minimum: Prim | C1 | 5, lalu 3 |
| 7 | 2 | Derajat, jalur Euler, dan lema jabat tangan | C1, C3 | 6, lalu 4 |
| 8 | 2 | Aliran maksimum dasar; **kontes tim 2** | C1, C3 | 7, lalu 5 |
| 9 | 3 | Teori bilangan: aritmetika modular dan pangkat cepat | C1 | 8, lalu 6 |
| 10 | 3 | FPB, gcd perluasan, invers modular, saringan | C1, C3 | 9, lalu 7 |
| 11 | 4 | Segment tree | C2 | 10, lalu 8 |
| 12 | 4 | DSU dan algoritma Kruskal; **kontes tim 3** | C2 | 11, lalu 9 |
| 13 | 5 | String: fungsi awalan dan pencocokan pola | C3 | 12, lalu 10 |
| 14 | 5 | Geometri dasar: hasil silang dan luas; **kuis kumulatif akhir** | C3 | 13, lalu 1 sampai 12 |

Penempatan kontes tim (pertemuan 4, 8, 12) dan satu tugas analisis algoritma
per bagian adalah usulan penyusun `[asumsi]`; silabus hanya menyebut "kontes
tim, tugas analisis algoritma". Tidak ada ujian tertulis di silabus mata
kuliah ini.

## Ingat kembali

Tiap pertemuan dibuka kuis 5 menit **tanpa catatan dan tanpa komputer**, 3
sampai 4 soal. Pertemuan awal mengambil dari `KUL-K-201` (dua semester lalu)
dan `KUL-I-103` (matematika diskret). Contoh soal pertemuan 1 sampai 7:

1. Tulis rekurensi DP koin dan jelaskan mengapa greedy "ambil koin terbesar"
   gagal pada pecahan `{1, 3, 4}` untuk target 6. (`KUL-K-201`)
2. Apa syarat agar pencarian biner pada jawaban sah, dan apa kompleksitasnya?
   (`KUL-K-201`)
3. Mengapa BFS memberi jarak terpendek pada graf tak berbobot dan DFS tidak?
   (`KUL-K-201`)
4. Apa lema jabat tangan, dan kapan graf terhubung punya jalur Euler?
   (`KUL-I-103`)
5. Tulis kerangka bukti induksi (pangkal dan langkah) untuk
   `1 + 2 + ... + n = n(n+1)/2`. (`KUL-I-103`)

Mengambil kembali dari ingatan membuat ingatan bertahan; membaca ulang tidak.
Di kontes kamu tak bisa membuka catatan, jadi kuis ini sekaligus latihannya.

## Tujuan

Pada akhir semester kamu dapat (CPMK, silabus bagian 3.3):

- **C1** menerapkan DP lanjutan, graf (jalur terpendek, pohon rentang minimum,
  aliran dasar), dan teori bilangan;
- **C2** menerapkan struktur data lanjutan (segment tree, DSU);
- **C3** menyelesaikan soal tingkat menengah dengan analisis kebenaran.

Poin C3 berarti jawabanmu tidak berhenti pada "lolos contoh": untuk tiap
algoritma kamu dapat menyatakan **invarian atau argumen** yang membuatnya benar,
dan **kompleksitasnya**.

## Bagian 1: DP lanjutan (pertemuan 1 sampai 4)

DP dasar (`KUL-K-201`) memakai satu indeks. DP lanjutan memakai **dua
indeks** (dua barisan), atau **himpunan bagian** sebagai keadaan (*bitmask*:
bilangan bulat yang bit-bit-nya menandai anggota himpunan). Tiga langkahnya
sama: keadaan, transisi, kasus dasar dan urutan. Yang berubah adalah banyaknya
keadaan, dan itu menentukan batas `n` yang masuk akal.

### Prediksi dulu

Dua kata `AGGTAB` dan `GXTXAYB`. **Subsekuens persekutuan terpanjang**
(*longest common subsequence*, LCS): urutan terpanjang yang muncul di kedua
kata dengan urutan sama (huruf tidak harus bersebelahan). Tebak panjangnya dan
satu contoh urutannya dengan mencoret huruf di kertas.

### Contoh terselesaikan

Keadaan `dp[i][j]` = panjang LCS dari `i` huruf pertama kata pertama dan `j`
huruf pertama kata kedua. Bila huruf ke-`i` dan ke-`j` sama,
`dp[i][j] = dp[i-1][j-1] + 1`; bila tidak, `max(dp[i-1][j], dp[i][j-1])`.
Kasus dasar: baris dan kolom 0 bernilai 0. Mengisinya baris demi baris
cukup, karena tiap sel hanya bergantung pada sel di atas dan di kirinya.
Pelacakan mundur dari `dp[n][m]` memulihkan urutan itu sendiri.

```cpp
#include <algorithm>
#include <iostream>
#include <string>
#include <vector>
using namespace std;

int main() {
    string a = "AGGTAB";
    string b = "GXTXAYB";
    int n = static_cast<int>(a.size());
    int m = static_cast<int>(b.size());
    // dp[i][j] = panjang LCS dari a[0..i) dan b[0..j)
    vector<vector<int>> dp(n + 1, vector<int>(m + 1, 0));
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= m; j++) {
            if (a[i - 1] == b[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }
    string hasil;
    int i = n;
    int j = m;
    while (i > 0 && j > 0) {
        if (a[i - 1] == b[j - 1]) {
            hasil += a[i - 1];
            i--;
            j--;
        } else if (dp[i - 1][j] >= dp[i][j - 1]) {
            i--;
        } else {
            j--;
        }
    }
    reverse(hasil.begin(), hasil.end());
    cout << dp[n][m] << ' ' << hasil << '\n';
    return 0;
}
// keluaran:
// 4 GTAB
```

Kompleksitas: `n · m` sel, tiap sel `O(1)`, jadi `O(n·m)` waktu dan memori.
Untuk `n = m = 5000` itu 25 juta sel (sekitar 100 MB bila `int`; ingat batas
memori soal). Karena baris `i` hanya memakai baris `i-1`, memori bisa
turun menjadi `O(m)` bila pelacakan mundur tidak diperlukan. Argumen
kebenaran: tiap subsekuens persekutuan terpanjang dari `a[0..i)` dan
`b[0..j)` entah memakai huruf terakhir keduanya (bila sama) atau membuang
salah satu; dua kasus itu kamu `max`-kan, jadi tak ada kemungkinan terlewat.

**DP bitmask.** Keadaan `dp[mask][v]` = biaya terkecil mengunjungi tepat
kota-kota dalam `mask` mulai dari kota 0 dan berakhir di `v`. Contoh: empat
kota dengan jarak simetris; cari tur terpendek yang mengunjungi tiap kota
sekali dan kembali ke kota 0 (*traveling salesman*, versi kecil).

```cpp
#include <algorithm>
#include <iostream>
#include <vector>
using namespace std;

int main() {
    const int INF = 1000000000;
    const int n = 4;
    int jarak[n][n] = {
        {0, 10, 15, 20},
        {10, 0, 35, 25},
        {15, 35, 0, 30},
        {20, 25, 30, 0},
    };
    // dp[mask][v] = biaya terkecil dari kota 0, mengunjungi tepat himpunan mask, berakhir di v
    vector<vector<int>> dp(1 << n, vector<int>(n, INF));
    dp[1][0] = 0;
    for (int mask = 1; mask < (1 << n); mask++) {
        for (int v = 0; v < n; v++) {
            if (dp[mask][v] == INF || !(mask & (1 << v))) {
                continue;
            }
            for (int w = 0; w < n; w++) {
                if (mask & (1 << w)) {
                    continue;
                }
                int baru = mask | (1 << w);
                dp[baru][w] = min(dp[baru][w], dp[mask][v] + jarak[v][w]);
            }
        }
    }
    int terbaik = INF;
    for (int v = 1; v < n; v++) {
        terbaik = min(terbaik, dp[(1 << n) - 1][v] + jarak[v][0]);
    }
    cout << terbaik << '\n';
    return 0;
}
// keluaran:
// 80
```

Kompleksitas: `2^n · n` keadaan, tiap keadaan mencoba `n` kota berikutnya,
jadi `O(2^n · n²)`. Untuk `n = 20` itu sekitar `10^6 · 400 = 4 · 10^8`
langkah sederhana, dan memori `2^20 · 20` bilangan `int` sekitar 80 MB:
tepi batas. Untuk `n = 12` mudah. Mencoba semua urutan kota `O(n!)` sudah tak
selesai pada `n = 15`; bitmask memangkasnya dengan mengingat himpunan yang
sudah dikunjungi, bukan urutannya. Tur 0-1-3-2-0 berbiaya
`10 + 25 + 30 + 15 = 80`, dan tak ada tur lain yang lebih kecil.

### Contoh setengah jadi

Lengkapi pengisian DP *tas* satu dimensi dengan memori `O(W)` untuk nilai
terbesar pada kapasitas `W` (tiap barang paling banyak sekali):

```cpp setengah-jadi
vector<int> dp(W + 1, 0);
for (int i = 0; i < n; i++) {
    for (int w = W; w >= ___; w--) {
        dp[w] = max(dp[w], dp[w - berat[i]] + ___);
    }
}
// dp[W] = nilai terbesar
```

### Latihan

1. **Ubah:** ubah LCS agar mencetak **jarak sunting** (banyak sisip, hapus,
   ganti minimum untuk mengubah satu kata menjadi yang lain). Tulis keadaan
   dan transisinya di kertas dulu; kasus dasar baris dan kolom 0 bukan nol.
2. **Buat:** pada `n` tugas dengan lama kerja dan keuntungan, dan waktu
   total `T`, pilih himpunan dengan keuntungan terbesar (tas 0/1). Nyatakan
   kompleksitasnya.
3. **Jelaskan:** mengapa DP bitmask masuk akal untuk `n = 18` tetapi tidak
   untuk `n = 40`?
4. **Berpasangan (praktikum):** satu menurunkan keadaan dan transisi untuk
   soal karangan di kertas, satu menulis kode dari kertas itu; tukar peran
   tiap sekitar 10 menit. Kontes tim bukan berpasangan, dan tugas yang dinilai
   tetap perorangan.

## Bagian 2: Graf lanjutan (pertemuan 5 sampai 8)

Graf berbobot menambah satu pertanyaan: bobotnya apa dan boleh negatif?
**Dijkstra** mencari jarak terpendek dari satu sumber pada graf dengan bobot
**tak negatif**. **Pohon rentang minimum** (*minimum spanning tree*, MST)
adalah himpunan sisi yang menghubungkan semua simpul dengan jumlah bobot
terkecil. **Aliran maksimum** menghitung berapa banyak yang dapat dialirkan
dari sumber ke muara melalui sisi berkapasitas.

### Prediksi dulu

Graf tak berarah, lima simpul 0 sampai 4, sisi (bobot): 0-1 (4), 0-2 (1),
2-1 (2), 1-3 (1), 2-3 (5), 3-4 (3). Tulis jarak terpendek dari simpul 0 ke tiap
simpul, jumlah bobot MST, dan jumlah semua derajat simpul.

### Contoh terselesaikan

Dijkstra memakai *priority queue* (min-heap) berisi pasangan (jarak, simpul);
simpul yang diambil dengan jarak yang sudah lebih besar dari catatan
dilewati. Prim memakai ide mirip untuk MST: selalu tambahkan sisi terkecil
yang menjangkau simpul baru.

```cpp
#include <functional>
#include <iostream>
#include <queue>
#include <utility>
#include <vector>
using namespace std;

int main() {
    const long long INF = 1000000000000LL;
    int n = 5;
    vector<vector<pair<int, int>>> adj(n);
    auto sisi = [&](int a, int b, int w) {
        adj[a].push_back({b, w});
        adj[b].push_back({a, w});
    };
    sisi(0, 1, 4);
    sisi(0, 2, 1);
    sisi(2, 1, 2);
    sisi(1, 3, 1);
    sisi(2, 3, 5);
    sisi(3, 4, 3);

    vector<long long> dist(n, INF);
    priority_queue<pair<long long, int>, vector<pair<long long, int>>, greater<>> pq;
    dist[0] = 0;
    pq.push({0, 0});
    while (!pq.empty()) {
        pair<long long, int> top = pq.top();
        pq.pop();
        long long d = top.first;
        int u = top.second;
        if (d > dist[u]) {
            continue;
        }
        for (const auto &e : adj[u]) {
            if (d + e.second < dist[e.first]) {
                dist[e.first] = d + e.second;
                pq.push({dist[e.first], e.first});
            }
        }
    }
    for (long long d : dist) {
        cout << d << ' ';
    }
    cout << '\n';

    // Prim dari simpul 0 pada graf yang sama
    vector<bool> dalam(n, false);
    priority_queue<pair<int, int>, vector<pair<int, int>>, greater<>> p2;
    p2.push({0, 0});
    int total = 0;
    while (!p2.empty()) {
        pair<int, int> top = p2.top();
        p2.pop();
        if (dalam[top.second]) {
            continue;
        }
        dalam[top.second] = true;
        total += top.first;
        for (const auto &e : adj[top.second]) {
            if (!dalam[e.first]) {
                p2.push({e.second, e.first});
            }
        }
    }
    cout << total << '\n';

    // Lema jabat tangan: jumlah derajat = 2 * banyak sisi; derajat ganjil selalu genap banyaknya
    int jumlahDerajat = 0;
    int ganjil = 0;
    for (int u = 0; u < n; u++) {
        int deg = static_cast<int>(adj[u].size());
        jumlahDerajat += deg;
        if (deg % 2 == 1) {
            ganjil++;
        }
    }
    cout << jumlahDerajat << ' ' << ganjil << '\n';
    return 0;
}
// keluaran:
// 0 3 1 4 7 
// 7
// 12 4
```

Penelusuran Dijkstra: dari 0, simpul 2 jaraknya 1 dan simpul 1 jaraknya 4;
mengambil simpul 2 (jarak 1) memperbaiki simpul 1 menjadi 3 (`1 + 2`) dan
menetapkan simpul 3 sementara 6; mengambil simpul 1 (jarak 3) memperbaiki
simpul 3 menjadi 4 (`3 + 1`); lalu simpul 4 menjadi 7 (`4 + 3`). Jarak:
`0 3 1 4 7`. MST: sisi 0-2 (1), 1-3 (1), 2-1 (2), 3-4 (3) berjumlah 7.

Kompleksitas: Dijkstra dan Prim dengan heap `O((V + E) log V)` (di sini
`V = 5`, `E = 6`); memori `O(V + E)`. Yang penting dalam analisis
kebenaran: Dijkstra **gagal bila ada bobot negatif**, sebab argumen kunci
("simpul dengan jarak sementara terkecil sudah final") bergantung pada
tidak adanya jalur lewat simpul lain yang menjadi lebih pendek. Untuk bobot
negatif pakai algoritma lain (Bellman-Ford; hanya disebut di sini).
Bobot jarak dan jumlahnya disimpan `long long` bila batas soal besar; di sini
`int` cukup karena total kecil.

**Derajat dan jalur Euler.** *Lema jabat tangan*: jumlah derajat seluruh
simpul sama dengan dua kali banyaknya sisi (tiap sisi dihitung di dua ujung),
sehingga banyaknya simpul berderajat ganjil selalu genap. Keluaran `12 4`
cocok: derajat 2, 3, 3, 3, 1 berjumlah 12 = 2 × 6 sisi, dan empat simpul
ganjil. Sebuah graf terhubung punya **jalur Euler** (melewati tiap sisi tepat
sekali) bila banyaknya simpul berderajat ganjil 0 atau 2; sirkuit Euler
(kembali ke awal) bila 0. Graf contoh punya empat simpul ganjil, jadi **tidak**
punya jalur Euler. Pemeriksaannya cukup menghitung derajat: `O(V + E)`.

**Aliran maksimum (Edmonds-Karp).** Cari jalur dari sumber ke muara yang masih
punya sisa kapasitas dengan BFS, alirkan sebanyak kapasitas sisa terkecil di
jalur itu, kurangi kapasitas sisi maju, tambah sisi balik (supaya aliran bisa
"dibatalkan"), ulangi sampai tak ada jalur. Dengan BFS, jumlah jalur tambahan
dibatasi `O(V·E)`, sehingga total `O(V·E²)`.

```cpp
#include <algorithm>
#include <iostream>
#include <queue>
#include <vector>
using namespace std;

struct Aliran {
    struct Sisi {
        int ke;
        int sisa;
    };
    vector<Sisi> sisi;
    vector<vector<int>> adj;
    explicit Aliran(int n) : adj(n) {}
    void tambah(int a, int b, int kapasitas) {
        adj[a].push_back(static_cast<int>(sisi.size()));
        sisi.push_back({b, kapasitas});
        adj[b].push_back(static_cast<int>(sisi.size()));
        sisi.push_back({a, 0});
    }
    // Edmonds-Karp: jalur tambahan dicari dengan BFS
    int maks(int s, int t) {
        int total = 0;
        while (true) {
            vector<int> asal(adj.size(), -1);
            queue<int> q;
            q.push(s);
            asal[s] = -2;
            while (!q.empty() && asal[t] == -1) {
                int u = q.front();
                q.pop();
                for (int id : adj[u]) {
                    if (sisi[id].sisa > 0 && asal[sisi[id].ke] == -1) {
                        asal[sisi[id].ke] = id;
                        q.push(sisi[id].ke);
                    }
                }
            }
            if (asal[t] == -1) {
                break;
            }
            int bawa = 1000000000;
            for (int v = t; v != s; v = sisi[asal[v] ^ 1].ke) {
                bawa = min(bawa, sisi[asal[v]].sisa);
            }
            for (int v = t; v != s; v = sisi[asal[v] ^ 1].ke) {
                sisi[asal[v]].sisa -= bawa;
                sisi[asal[v] ^ 1].sisa += bawa;
            }
            total += bawa;
        }
        return total;
    }
};

int main() {
    Aliran g(4);
    g.tambah(0, 1, 3);
    g.tambah(0, 2, 2);
    g.tambah(1, 2, 1);
    g.tambah(1, 3, 2);
    g.tambah(2, 3, 3);
    cout << g.maks(0, 3) << '\n';
    return 0;
}
// keluaran:
// 5
```

Sisi disimpan berpasangan (`id` dan `id ^ 1`): sisi maju dan sisi baliknya.
Hasil 5: ada tiga jalur tambahan (0-1-3 membawa 2, 0-2-3 membawa 2, 0-1-2-3
membawa 1). Dan 5 juga batas atas yang mudah dicek: seluruh kapasitas yang
keluar dari simpul 0 berjumlah 3 + 2 = 5, sehingga tak mungkin lebih.

### Contoh setengah jadi

Lengkapi pemeriksaan "semua derajat genap" untuk sirkuit Euler pada graf
terhubung dengan `deg[u]` sudah dihitung:

```cpp setengah-jadi
bool adaSirkuitEuler(const vector<int> &deg) {
    for (int d : deg) {
        if (d % ___ != 0) {
            return ___;
        }
    }
    return ___;
}
```

### Latihan

1. **Ubah:** ubah Dijkstra agar mencetak jalur (urutan simpul) dari 0 ke 4,
   dengan menyimpan simpul pendahulu tiap simpul.
2. **Buat:** diberikan graf berbobot dan simpul `s`, cari simpul yang paling
   jauh dari `s` dengan jarak terpendeknya. Nyatakan kompleksitasnya.
3. **Jelaskan:** beri graf kecil dengan satu bobot negatif tempat Dijkstra
   memberi jawaban salah, dan tunjukkan langkahnya.
4. **Berpasangan:** satu menggambar graf enam simpul dan menyembunyikan
   jawaban jarak terpendek; satu menjalankan Dijkstra di kertas; cocokkan
   dengan program.

## Bagian 3: Teori bilangan (pertemuan 9 dan 10)

Soal kontes sering meminta jawaban "modulo `10^9 + 7`" (bilangan prima yang
lazim, supaya jawaban muat di `long long`). **Aritmetika modular**:
`(a + b) mod m`, `(a · b) mod m` boleh dihitung dengan mengambil sisa pada
tiap langkah. **Pangkat cepat** menghitung `a^e mod m` dalam `O(log e)` dengan
mengkuadratkan berulang. **gcd perluasan** mencari bilangan bulat `x, y` dengan
`a·x + b·y = gcd(a, b)`; dari situ **invers modular** `a^{-1} mod m` (bila
`gcd(a, m) = 1`).

### Prediksi dulu

Hitung dengan tangan: `3^200 mod 7` (petunjuk: pangkat 3 modulo 7 berulang
dengan siklus 6) dan invers 3 modulo 11 (bilangan `x` dengan `3x mod 11 = 1`).
Berapa banyak bilangan prima sampai 50?

### Contoh terselesaikan

```cpp
#include <iostream>
#include <vector>
using namespace std;

const long long MOD = 1000000007LL;

long long pangkat(long long a, long long e, long long m) {
    long long hasil = 1 % m;
    a %= m;
    while (e > 0) {
        if (e & 1) {
            hasil = hasil * a % m;
        }
        a = a * a % m;
        e >>= 1;
    }
    return hasil;
}

// Mengembalikan g = gcd(a, b) dan mengisi x, y sehingga a*x + b*y = g
long long gcdPerluasan(long long a, long long b, long long &x, long long &y) {
    if (b == 0) {
        x = 1;
        y = 0;
        return a;
    }
    long long x1 = 0;
    long long y1 = 0;
    long long g = gcdPerluasan(b, a % b, x1, y1);
    x = y1;
    y = x1 - (a / b) * y1;
    return g;
}

int main() {
    cout << pangkat(3, 200, 7) << ' ' << pangkat(2, 62, MOD) << '\n';

    long long x = 0;
    long long y = 0;
    long long g = gcdPerluasan(240, 46, x, y);
    cout << g << ' ' << x << ' ' << y << '\n';

    // invers modular 3 terhadap 11 lewat gcd perluasan, lalu lewat Fermat (modulus prima)
    gcdPerluasan(3, 11, x, y);
    long long inv = ((x % 11) + 11) % 11;
    cout << inv << ' ' << pangkat(3, 9, 11) << '\n';

    // saringan Eratosthenes sampai 50
    int batas = 50;
    vector<bool> prima(batas + 1, true);
    prima[0] = false;
    prima[1] = false;
    for (int i = 2; i * i <= batas; i++) {
        if (prima[i]) {
            for (int j = i * i; j <= batas; j += i) {
                prima[j] = false;
            }
        }
    }
    int banyak = 0;
    for (int i = 0; i <= batas; i++) {
        if (prima[i]) {
            banyak++;
        }
    }
    cout << banyak << '\n';
    return 0;
}
// keluaran:
// 2 145586002
// 2 -9 47
// 4 4
// 15
```

Penjelasan keluaran. `3^200 mod 7 = 2`: karena `3^6 ≡ 1 (mod 7)` dan
`200 = 6·33 + 2`, hasilnya `3^2 = 9 ≡ 2`. `2^62 mod (10^9 + 7) = 145586002`.
`gcd(240, 46) = 2` dengan `240·(-9) + 46·47 = -2160 + 2162 = 2`. Invers 3
modulo 11 adalah 4 (`3·4 = 12 ≡ 1`); cara kedua memakai teorema kecil Fermat:
untuk modulus prima `p`, `a^{p-2}` adalah invers `a`, jadi `3^9 mod 11 = 4`.
Ada 15 bilangan prima sampai 50.

Kompleksitas: `pangkat` `O(log e)`; `gcdPerluasan` `O(log min(a, b))`;
saringan Eratosthenes `O(n log log n)` waktu dan `O(n)` memori. Dua
kesalahan klasik: `hasil * a` untuk `m` sekitar `10^9` muat di `long long`
(`10^18 < 9,2 · 10^18`), tetapi untuk `m` sekitar `10^{18}` tidak, dan sisa
bilangan negatif di C++ bisa negatif sehingga dinormalkan dengan
`((x % m) + m) % m` seperti pada `inv`. Mengurangi dua nilai modular lalu
mencetak tanpa normalisasi adalah penyebab "hasil negatif" yang umum.

### Contoh setengah jadi

Lengkapi pembagian modular `a / b mod p` untuk `p` prima dan `b` tidak
habis dibagi `p` dengan Fermat:

```cpp setengah-jadi
long long bagi(long long a, long long b, long long p) {
    long long inv = pangkat(b, ___, p);   // invers b modulo p
    return a % p * inv % ___;
}
```

### Latihan

1. **Ubah:** ubah `pangkat` agar menghitung `a^e` modulo `m` untuk `e` sampai
   `10^{18}`, dan jelaskan kapan perkalian dalam `long long` meluap.
2. **Buat:** hitung banyaknya bilangan prima di antara `1` dan `10^6` dengan
   saringan; nyatakan kompleksitas waktu dan memori.
3. **Jelaskan:** mengapa invers modular `a` modulo `m` ada bila dan hanya bila
   `gcd(a, m) = 1`?
4. **Berpasangan:** satu memilih modulus komposit (mis. 12) dan mencari
   bilangan tanpa invers, satu menjelaskan mengapa lewat gcd.

## Bagian 4: Struktur data lanjutan (pertemuan 11 dan 12)

**Segment tree** menjawab pertanyaan rentang (jumlah, minimum, ...) dan
mengubah satu elemen masing-masing dalam `O(log n)`. Implementasi iteratif
memakai larik `t` berukuran `2n` dengan daun di `t[n .. 2n-1]` dan tiap simpul
dalam menyimpan gabungan dua anaknya. **DSU** (*disjoint set union*, atau
*union-find*) memelihara partisi himpunan dengan operasi `cari` dan `gabung`;
dengan kompresi jalur dan penggabungan menurut ukuran, tiap operasi
amortisasi hampir konstan (fungsi invers Ackermann).

### Prediksi dulu

Larik `[5, 3, 8, 1, 4, 2]`. Berapa jumlah elemen indeks 1 sampai 3, dan
jumlah semua? Sesudah elemen indeks 3 diubah menjadi 10, berapa jumlah indeks
1 sampai 3 dan nilai indeks 3? Lalu: MST graf bagian 2 dengan Kruskal (urutkan
sisi menaik, ambil bila tidak membentuk lingkaran). Berapa total dan banyak
sisi?

### Contoh terselesaikan

```cpp
#include <iostream>
#include <numeric>
#include <utility>
#include <vector>
using namespace std;

struct SegmenTree {
    int n;
    vector<long long> t;
    explicit SegmenTree(int n_) : n(n_), t(2 * n_, 0) {}
    // titik: a[i] = nilai
    void ubah(int i, long long nilai) {
        for (t[i += n] = nilai; i > 1; i /= 2) {
            t[i / 2] = t[i] + t[i ^ 1];
        }
    }
    // jumlah pada [l, r)
    long long jumlah(int l, int r) const {
        long long hasil = 0;
        for (l += n, r += n; l < r; l /= 2, r /= 2) {
            if (l & 1) {
                hasil += t[l++];
            }
            if (r & 1) {
                hasil += t[--r];
            }
        }
        return hasil;
    }
};

struct DSU {
    vector<int> induk;
    vector<int> ukuran;
    explicit DSU(int n) : induk(n), ukuran(n, 1) { iota(induk.begin(), induk.end(), 0); }
    int cari(int x) { return induk[x] == x ? x : induk[x] = cari(induk[x]); }
    bool gabung(int a, int b) {
        a = cari(a);
        b = cari(b);
        if (a == b) {
            return false;
        }
        if (ukuran[a] < ukuran[b]) {
            swap(a, b);
        }
        induk[b] = a;
        ukuran[a] += ukuran[b];
        return true;
    }
};

int main() {
    SegmenTree st(6);
    int awal[6] = {5, 3, 8, 1, 4, 2};
    for (int i = 0; i < 6; i++) {
        st.ubah(i, awal[i]);
    }
    cout << st.jumlah(1, 4) << ' ' << st.jumlah(0, 6) << '\n';
    st.ubah(3, 10);
    cout << st.jumlah(1, 4) << ' ' << st.jumlah(3, 4) << '\n';

    // Kruskal pada graf yang sama dengan Prim: (berat, a, b)
    vector<pair<int, pair<int, int>>> sisi = {{4, {0, 1}}, {1, {0, 2}}, {2, {2, 1}},
                                              {1, {1, 3}}, {5, {2, 3}}, {3, {3, 4}}};
    for (size_t i = 0; i < sisi.size(); i++) {
        for (size_t j = i + 1; j < sisi.size(); j++) {
            if (sisi[j].first < sisi[i].first) {
                swap(sisi[i], sisi[j]);
            }
        }
    }
    DSU d(5);
    int total = 0;
    int dipakai = 0;
    for (const auto &e : sisi) {
        if (d.gabung(e.second.first, e.second.second)) {
            total += e.first;
            dipakai++;
        }
    }
    cout << total << ' ' << dipakai << '\n';
    return 0;
}
// keluaran:
// 12 23
// 21 10
// 7 4
```

Penelusuran: jumlah indeks 1 sampai 3 = `3 + 8 + 1 = 12` dan total
`5 + 3 + 8 + 1 + 4 + 2 = 23`; sesudah indeks 3 menjadi 10, jumlahnya
`3 + 8 + 10 = 21` dan nilai indeks 3 adalah 10. Kruskal mengambil sisi
berbobot 1 (dua), 2, lalu 3, menolak 4 dan 5 karena membentuk lingkaran,
sehingga total 7 dengan 4 sisi: sama dengan Prim, sebagaimana mestinya
(MST mungkin tak unik tetapi totalnya selalu sama). Penyortiran sisi di
contoh ini sengaja ditulis dengan dua perulangan agar singkat; pada soal
nyata pakai `sort` (`O(E log E)`).

Kompleksitas: segment tree membangun lewat `n` kali `ubah` `O(n log n)`;
tiap `ubah` dan `jumlah` `O(log n)`. DSU: tiap operasi amortisasi hampir
`O(1)`; Kruskal `O(E log E)` oleh pengurutan. Argumen kebenaran Kruskal:
sisi terkecil yang tidak membentuk lingkaran selalu aman dipilih (sifat
potongan), mirip argumen pertukaran greedy di `KUL-K-201`.

### Contoh setengah jadi

Lengkapi pertanyaan "berapa himpunan tersisa" dengan DSU yang sudah ada:

```cpp setengah-jadi
int himpunan = n;
for (auto [a, b] : pasangan) {
    if (d.___(a, b)) {
        himpunan--;
    }
}
```

### Latihan

1. **Ubah:** ubah `SegmenTree` agar menjawab **minimum** pada rentang, bukan
   jumlah. Dua baris berubah; elemen netralnya apa?
2. **Buat:** pada `n` orang dan `q` pernyataan "a dan b berteman", jawab
   berapa kelompok pertemanan terbesar sesudah tiap pernyataan, memakai
   `ukuran` DSU. Nyatakan kompleksitasnya.
3. **Jelaskan:** mengapa kompresi jalur saja (tanpa penggabungan menurut
   ukuran) tetap membuat DSU cepat, dan apa yang tetap perlu kamu waspadai
   pada rekursi `cari` untuk `n` sangat besar?
4. **Berpasangan:** satu merancang pertanyaan rentang karangan beserta
   jawaban hitung-tangan; satu mengujinya pada program; cari satu kasus tepi
   (rentang kosong, satu elemen).

## Bagian 5: String dan geometri dasar (pertemuan 13 dan 14)

**Fungsi awalan** (*prefix function*) `pi[i]` = panjang awalan terpanjang
dari `s[0..i]` yang juga akhiran (sejati) dari `s[0..i]`. Dengan fungsi itu,
mencari pola dalam teks (pola `+ '#' +` teks) berjalan `O(n + m)`, bukan
`O(n·m)`. **Geometri dasar** dengan koordinat bulat dikerjakan dengan
**hasil silang** (*cross product*) tanpa bilangan pecahan: tanda
`silang(o, a, b)` menyatakan belok kiri (positif), kanan (negatif), atau
segaris (nol). Luas poligon dihitung dengan rumus tali sepatu.

### Prediksi dulu

Tulis fungsi awalan untuk `aabaaab` dengan tangan. Berapa kali `abab` muncul
dalam `abababab` (kemunculan boleh bertumpuk)? Berapa dua kali luas persegi
panjang dengan titik `(0,0)`, `(4,0)`, `(4,3)`, `(0,3)`, dan apa tanda hasil
silang `(0,0)->(4,0)->(4,3)`?

### Contoh terselesaikan

```cpp
#include <iostream>
#include <string>
#include <utility>
#include <vector>
using namespace std;

// pi[i] = panjang awalan terpanjang dari s[0..i] yang juga akhiran sejati-nya
vector<int> fungsiAwalan(const string &s) {
    vector<int> pi(s.size(), 0);
    for (size_t i = 1; i < s.size(); i++) {
        int k = pi[i - 1];
        while (k > 0 && s[i] != s[k]) {
            k = pi[k - 1];
        }
        if (s[i] == s[k]) {
            k++;
        }
        pi[i] = k;
    }
    return pi;
}

typedef pair<long long, long long> Titik;

long long silang(Titik o, Titik a, Titik b) {
    return (a.first - o.first) * (b.second - o.second) - (a.second - o.second) * (b.first - o.first);
}

int main() {
    string pola = "abab";
    string teks = "abababab";
    vector<int> pi = fungsiAwalan(pola + "#" + teks);
    int muncul = 0;
    for (size_t i = pola.size() + 1; i < pi.size(); i++) {
        if (pi[i] == static_cast<int>(pola.size())) {
            muncul++;
        }
    }
    for (int v : fungsiAwalan("aabaaab")) {
        cout << v << ' ';
    }
    cout << '\n' << muncul << '\n';

    // luas poligon dengan rumus tali sepatu (dua kali luas, bilangan bulat)
    vector<Titik> poligon = {{0, 0}, {4, 0}, {4, 3}, {0, 3}};
    long long dua = 0;
    for (size_t i = 0; i < poligon.size(); i++) {
        Titik a = poligon[i];
        Titik b = poligon[(i + 1) % poligon.size()];
        dua += a.first * b.second - a.second * b.first;
    }
    cout << dua << '\n';
    cout << silang({0, 0}, {4, 0}, {4, 3}) << ' ' << silang({0, 0}, {4, 3}, {4, 0}) << ' '
         << silang({0, 0}, {2, 2}, {4, 4}) << '\n';
    return 0;
}
// keluaran:
// 0 1 0 1 2 2 3 
// 3
// 24
// 12 -12 0
```

Penjelasan: untuk `aabaaab` fungsi awalannya `0 1 0 1 2 2 3`
(mis. di indeks 6 awalan `aab` juga akhiran `aab`). Pemisah `#` (karakter
yang tak ada di pola atau teks) mencegah awalan melampaui pola. `abab`
muncul 3 kali di `abababab` (posisi 0, 2, 4). Dua kali luas persegi panjang
`4 × 3` adalah 24 sehingga luasnya 12; dua kali luas dipakai agar tetap
bilangan bulat. Hasil silang `12` positif (belok kiri), `-12` untuk arah
sebaliknya, dan `0` untuk tiga titik segaris.

Kompleksitas: fungsi awalan `O(n)` amortisasi (total langkah `k` mundur
tak melebihi total langkah majunya), pencocokan `O(n + m)`, luas poligon
`O(n)`. Pakai `long long` untuk koordinat sampai `10^9`: hasil kali
sampai `10^{18}` masih muat.

### Contoh setengah jadi

Lengkapi pemeriksaan "tiga titik segaris":

```cpp setengah-jadi
bool segaris(Titik a, Titik b, Titik c) {
    return silang(___, ___, ___) == 0;
}
```

### Latihan

1. **Ubah:** ubah pencocokan agar mencetak posisi mulai tiap kemunculan pola
   dalam teks (indeks `i - 2 * |pola|`; periksa sendiri alasannya di kertas).
2. **Buat:** diberikan string, hitung periode terkecil (panjang `p` terkecil
   sehingga string tersusun dari pengulangan awalan sepanjang `p`) memakai
   fungsi awalan. Nyatakan kompleksitasnya.
3. **Jelaskan:** mengapa geometri dengan koordinat bulat dikerjakan dengan
   hasil silang, bukan dengan sudut atau pecahan?
4. **Berpasangan:** satu menggambar poligon sembarang di kertas berpetak dan
   menghitung luasnya dengan tali sepatu, satu memeriksanya dengan program.

## Latihan bercampur

Setelah bagian 2 sampai 5, kerjakan soal yang **tidak menyebut** tekniknya.
Contoh (karangan sendiri): "Seribu kota dihubungkan jalan berbobot; cari
biaya terkecil agar semua kota terhubung" (MST); "Berapa jarak terpendek dari
kota 1 ke tiap kota bila semua jalan berbobot positif?" (Dijkstra);
"Jawab `10^5` pertanyaan jumlah rentang dengan pembaruan" (segment tree);
"Berapa cara memilih `k` dari `n` modulo `10^9 + 7`?" (faktorial dan invers
modular). Kamu memutuskan jenis soalnya dulu, baru memilih teknik; itulah
yang dilatih kuis kumulatif. Kontes tim bergaya sama, dikerjakan bersama
oleh tim tetapi dengan **satu tulisan analisis algoritma perorangan** sesudahnya.

Soal kontes nyata untuk latihan **ditautkan**, bukan disalin: arsip soal OSN
Bidang Informatika (`https://osn.toki.id/arsip`) dan kumpulan soal latihan CSES
(`https://cses.fi/problemset/`), dan penjelasan teknik di CP-Algorithms
(`https://cp-algorithms.com/`). Kamu membaca pernyataan soal di situs
sumbernya.

## Ulang berjarak

Kerjakan ulang tanpa melihat solusi lama:

- satu minggu setelah bagian: tulis ulang dari ingatan Dijkstra, pangkat
  cepat, DSU, atau DP LCS;
- awal tiap bagian baru: dua soal dari bagian sebelumnya;
- minggu sebelum kontes: tiga soal yang dahulu salah, tanpa petunjuk
  (editorial hanya sesudah mencoba menyelesaikan ulang);
- semester 7: tulis ulang Dijkstra dan DSU tanpa melihat; `KUL-K-401`
  memakainya di bawah tekanan waktu.

Pertanyaan yang akan muncul lagi di `KUL-K-401`:

- Mengapa Dijkstra gagal pada bobot negatif, dan apa kompleksitasnya dengan
  heap?
- Tulis operasi `cari` dan `gabung` DSU. Mengapa kompresi jalur menolong?
- Bagaimana kamu menangani sisa negatif pada aritmetika modular di C++?

## Kebijakan AI dan log pemakaian

Mata kuliah ini **Merah saat kontes dan latihan kontes** (silabus bagian 6.3,
jalur K): selama kontes tim dan latihan kontes **tidak ada AI**, termasuk
oleh teman setimmu atas namamu. Yang dinilai adalah kemampuan tim
menyelesaikan soal dalam batas waktu.

**Sesudah kontes**, AI boleh dipakai untuk menjelaskan solusi, dengan
pengungkapan, **lalu** kamu mengerjakan ulang (*re-solve*) tanpa AI dan tanpa
melihat penjelasannya. Catat pemakaiannya di repositorimu sendiri: alat dan
versi, tujuan, perintah, bagian keluaran yang dipakai (log). Jangan memasukkan
data pribadi, kata sandi, atau kunci ke layanan AI. Dosen dapat mewawancarai
kamu tentang kode yang kamu serahkan dan memintamu mengubahnya langsung. Tulisan
analisis algoritma adalah milikmu: argumen kebenaran dan kompleksitas yang kamu
tulis harus bisa kamu jelaskan sendiri. Tingkat per tugas ditetapkan dosen di
lembar tugas.

## Kesalahan umum

- **Dijkstra pada bobot negatif.** Hasilnya salah tanpa pesan galat.
- **Lupa normalisasi sisa negatif.** `(-7) % 5` bernilai `-2` di C++.
- **`INF` yang meluap saat ditambah.** Pilih `INF` yang aman untuk `INF + w`.
- **Memori DP dua dimensi berlebih.** Hitung `n·m` kali ukuran elemen
  sebelum menulis kode.
- **Menginisialisasi DSU atau segment tree tidak sesuai indeks** (mulai 0 atau 1).
- **Mengira Kruskal dan Prim berbeda total.** Total MST sama; pilihan sisi bisa
  berbeda.
- **Tidak menulis kasus tepi:** `n = 1`, graf tanpa sisi, string kosong,
  rentang kosong.
- **Percaya greedy atau DP tanpa pembanding.** Tulis pembanding lambat dan uji
  pada masukan acak kecil (`KUL-K-201`).

## Cek mandiri

Tutup modul, jawab, baru periksa.

1. Tuliskan keadaan dan transisi LCS dan hitung `dp` untuk `AB` dan `BA`.
2. Untuk `n = 18` dan `n = 30`, mana yang cocok untuk DP bitmask, dan mengapa?
3. Sebut syarat Dijkstra dan kompleksitasnya dengan heap.
4. Apa lema jabat tangan, dan kapan graf terhubung punya jalur Euler?
5. Hitung `2^10 mod 7` dengan pangkat cepat (tulis tiap langkah).
6. Tulis `cari` DSU dengan kompresi jalur.
7. Apa yang terjadi bila dua kali luas poligon bernilai negatif?
8. Apa yang kamu lakukan sesudah kontes bila ingin AI menjelaskan solusi?

Daftar periksa (kosong; kamu isi sendiri, tidak dikumpulkan):

- [ ] Aku dapat menurunkan keadaan dan transisi DP dua dimensi dan bitmask.
- [ ] Aku dapat menulis Dijkstra, Prim atau Kruskal, dan aliran dasar.
- [ ] Aku dapat memakai pangkat cepat, gcd perluasan, dan invers modular.
- [ ] Aku dapat menulis segment tree dan DSU.
- [ ] Aku dapat menulis argumen kebenaran dan kompleksitas tiap algoritma.

## Kunci dan petunjuk

- **Bagian 1:** prediksi `4 GTAB`; bitmask `80`. Setengah jadi: `berat[i]`,
  `nilai[i]`. Latihan LCS `AB` dan `BA` (cek mandiri 1): `dp[2][2] = 1`.
- **Bagian 2:** jarak `0 3 1 4 7`; MST 7; jumlah derajat 12 dengan 4 simpul
  ganjil, jadi tak ada jalur Euler; aliran maksimum 5. Setengah jadi: `2`,
  `false`, `true`.
- **Bagian 3:** `3^200 mod 7 = 2`; invers 3 modulo 11 adalah 4; ada 15
  bilangan prima sampai 50. Setengah jadi: `p - 2`, `p`.
- **Bagian 4:** `12 23`, lalu `21 10`; Kruskal 7 dengan 4 sisi. Setengah
  jadi: `gabung`.
- **Bagian 5:** fungsi awalan `0 1 0 1 2 2 3`; `abab` muncul 3 kali; dua kali
  luas 24; hasil silang `12`. Setengah jadi: `a, b, c`.
- **Cek mandiri 5:** `2^10 = 1024 = 7 · 146 + 2`, jadi 2. **Cek mandiri 7:**
  titik-titik poligon terurut searah jarum jam; luas yang sebenarnya adalah
  nilai mutlaknya dibagi dua.
- **Petunjuk bertahap bila macet:** (1) selesaikan masukan kecil dengan tangan
  dan catat langkah; (2) tulis pembanding lambat dan temukan masukan kecil
  yang beda; (3) tulis argumen kebenaran satu paragraf sebelum
  mengoptimalkan.

## Langkah berikutnya

`KUL-K-401` (Studio Tim Kompetisi) memakai semua alat modul ini dalam
simulasi kontes tim tiga orang dengan satu komputer, lalu menganalisis soal
yang gagal. `KUL-I-201` (Analisis dan Desain Algoritma) memberi landasan
formal analisis kompleksitas dan kebenaran.

## Catatan untuk dosen

Bobot dan bentuk asesmen berikut **usulan**; prodi menetapkan (silabus 6.1,
6.2): kontes tim dan tugas analisis algoritma perorangan per bagian (argumen
kebenaran dan kompleksitas). Soal kontes **ditautkan dari arsip resmi atau
karangan dosen**, tidak disalin ke bahan ini. Tingkat Merah saat kontes dan
latihan kontes; penjelasan AI sesudahnya hanya dengan pengungkapan dan log lalu
*re-solve* tanpa AI. Tugas yang dinilai tetap perorangan walau kontes
berkelompok: tulisan analisis dan wawancara kode. Variasi tugas: ganti
graf, string, dan modulus per mahasiswa. Aliran maksimum disajikan sebagai
algoritma dasar (Edmonds-Karp); pembahasan lanjut (Dinic, aliran biaya
minimum) di luar corpus.
