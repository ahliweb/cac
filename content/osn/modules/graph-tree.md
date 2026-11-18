## Untuk siapa modul ini

Modul ini untuk siswa SMA yang sudah memahami dasar pemrograman C++17, array, `vector`, dan struktur data dasar (queue, priority_queue, DSU), dan ingin mempelajari graph dan tree untuk OSN Informatika. Isinya mengikuti rumpun materi "Graph & tree" pada silabus pembinaan: representasi graph, BFS dan DFS, keterhubungan (connectivity), shortest path, MST, rooted tree, dan LCA. Urutannya mengikuti minggu-minggu terkait: dasar graph, shortest path, tree dan LCA, serta MST dan hubungannya dengan DSU.

Setelah mempelajari modul ini, kamu diharapkan bisa memodelkan cerita sebagai graph, memilih representasi dan algoritma sesuai batas soal, dan memperkirakan kompleksitasnya.

Cara memakai: baca penjelasan, ketik ulang setiap contoh (jangan hanya disalin), ubah nilainya, lalu kerjakan latihan. Contoh kode di modul ini hanya diperiksa bisa dikompilasi (C++17); itu tidak membuktikan contoh benar untuk semua masukan, jadi tetap uji sendiri. Struktur DSU, `priority_queue`, dan `queue` dipakai di sini; penjelasannya ada di modul struktur data.

## Graph dan istilah dasar

Graph terdiri dari simpul (node/vertex) dan sisi (edge) yang menghubungkan dua simpul. Beberapa istilah:

- Berarah (directed): sisi `a -> b` hanya bisa dilalui dari `a` ke `b`. Tak berarah (undirected): sisi bisa dilalui dua arah.
- Berbobot (weighted): setiap sisi punya nilai (jarak, biaya, waktu). Tak berbobot: semua sisi dianggap sama.
- Jalur (path): urutan simpul yang dihubungkan sisi. Siklus (cycle): jalur yang kembali ke simpul awal.
- Derajat (degree) sebuah simpul pada graph tak berarah: banyak sisi yang menyentuhnya.
- Terhubung (connected): ada jalur di antara setiap pasangan simpul. Komponen terhubung: kelompok simpul yang saling terhubung.
- Tree: graph tak berarah yang terhubung dan tidak punya siklus; dengan `N` simpul ia punya tepat `N - 1` sisi.

Kebiasaan penting: tentukan dulu apa yang menjadi simpul dan apa yang menjadi sisi dari cerita soal. Misalnya kota adalah simpul dan jalan adalah sisi; atau satu "keadaan" permainan adalah simpul dan satu langkah yang sah adalah sisi.

## Representasi graph

Ada tiga representasi yang umum.

| Representasi | Memori | Cek sisi `a-b` | Menelusuri tetangga `a` | Cocok untuk |
| --- | --- | --- | --- | --- |
| Adjacency list | O(N + M) | O(derajat) | O(derajat) | hampir semua soal; `N` besar, graph jarang |
| Adjacency matrix | O(N^2) | O(1) | O(N) | `N` kecil (beberapa ribu), graph padat, Floyd-Warshall |
| Edge list | O(M) | O(M) | O(M) | Kruskal, Bellman-Ford |

Untuk `N = 100.000`, matrix berisi 10^10 sel dan jelas tidak muat; pakai adjacency list. Untuk `N = 2000`, matrix `int` berisi 4 x 10^6 sel, sekitar 16 MB.

```cpp
#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n, m;
    cin >> n >> m;
    vector<vector<int>> adj(n + 1);           // simpul bernomor 1..n
    for (int i = 0; i < m; i++) {
        int a, b;
        cin >> a >> b;
        adj[a].push_back(b);
        adj[b].push_back(a);                  // graph tak berarah: simpan dua arah
    }
    for (int v = 1; v <= n; v++) {
        cout << v << ":";
        for (int w : adj[v]) {
            cout << " " << w;
        }
        cout << "\n";
    }
    return 0;
}
```

Untuk graph berbobot, simpan pasangan `(tetangga, bobot)`: `vector<vector<pair<int, long long>>> adj(n + 1);`. Untuk graph berarah, cukup `adj[a].push_back(b)` tanpa baris kedua. Perhatikan bahwa soal bisa memuat sisi ganda atau sisi ke diri sendiri; baca batasan soal.

## BFS dan shortest path tak berbobot

BFS (Breadth-First Search) menjelajahi graph lapis demi lapis dari simpul awal memakai queue. Karena simpul dikunjungi berurutan menurut banyak sisi dari simpul awal, BFS menemukan jarak terpendek (dalam jumlah sisi) pada graph tak berbobot. Waktunya O(N + M).

```cpp
#include <iostream>
#include <queue>
#include <vector>
using namespace std;

int main() {
    int n, m, awal;
    cin >> n >> m >> awal;
    vector<vector<int>> adj(n + 1);
    for (int i = 0; i < m; i++) {
        int a, b;
        cin >> a >> b;
        adj[a].push_back(b);
        adj[b].push_back(a);
    }

    vector<int> jarak(n + 1, -1);             // -1 berarti belum dikunjungi
    queue<int> q;
    jarak[awal] = 0;
    q.push(awal);
    while (!q.empty()) {
        int v = q.front();
        q.pop();
        for (int w : adj[v]) {
            if (jarak[w] == -1) {
                jarak[w] = jarak[v] + 1;
                q.push(w);
            }
        }
    }
    for (int v = 1; v <= n; v++) {
        cout << jarak[v] << (v < n ? ' ' : '\n');
    }
    return 0;
}
```

Untuk `6 5 1` dan sisi `1 2`, `1 3`, `2 4`, `3 4`, `4 5`, keluarannya `0 1 1 2 3 -1` (simpul 6 tidak terjangkau). Tandai simpul sebagai dikunjungi saat dimasukkan ke queue, bukan saat dikeluarkan, supaya tiap simpul masuk satu kali.

BFS juga berlaku pada grid: setiap sel adalah simpul dan sel bertetangga (atas, bawah, kiri, kanan) yang tidak terhalang adalah sisinya. Tidak perlu membangun adjacency list; cukup periksa empat arah.

## DFS dan connectivity

DFS (Depth-First Search) menjelajahi sedalam mungkin lewat satu cabang sebelum kembali. Ia ditulis dengan rekursi (memakai call stack) atau stack eksplisit. Waktunya O(N + M). DFS berguna untuk menghitung komponen terhubung, mendeteksi siklus, dan menelusuri tree.

```cpp
#include <iostream>
#include <vector>
using namespace std;

vector<vector<int>> adj;
vector<bool> dikunjungi;

void dfs(int v) {
    dikunjungi[v] = true;
    for (int w : adj[v]) {
        if (!dikunjungi[w]) {
            dfs(w);
        }
    }
}

int main() {
    int n, m;
    cin >> n >> m;
    adj.assign(n + 1, {});
    dikunjungi.assign(n + 1, false);
    for (int i = 0; i < m; i++) {
        int a, b;
        cin >> a >> b;
        adj[a].push_back(b);
        adj[b].push_back(a);
    }
    int komponen = 0;
    for (int v = 1; v <= n; v++) {
        if (!dikunjungi[v]) {
            komponen++;
            dfs(v);
        }
    }
    cout << komponen << "\n";
    return 0;
}
```

Untuk `6 3` dengan sisi `1 2`, `2 3`, `4 5`, komponennya `{1,2,3}`, `{4,5}`, dan `{6}`, jadi keluarannya `3`.

Peringatan: rekursi sedalam 100.000 atau lebih (misalnya graph berbentuk rantai panjang) dapat menghabiskan call stack pada beberapa lingkungan, dan program berhenti. Pada graph yang bisa sedalam itu, pakai stack eksplisit atau BFS. DSU juga dapat menghitung komponen terhubung dan cocok bila sisi datang satu per satu.

## Dijkstra: shortest path berbobot nonnegatif

Dijkstra mencari jarak terpendek dari satu simpul awal ke semua simpul pada graph yang semua bobotnya nonnegatif. Idenya: selalu proses simpul yang jaraknya sementara paling kecil, lalu coba perpendek jarak tetangganya (relaksasi). Dengan `priority_queue` waktunya sekitar O((N + M) log N). Dijkstra tidak benar bila ada sisi bernilai negatif.

```cpp
#include <functional>
#include <iostream>
#include <queue>
#include <utility>
#include <vector>
using namespace std;

const long long TAK_HINGGA = 1000000000000000000LL;

int main() {
    int n, m, awal;
    cin >> n >> m >> awal;
    vector<vector<pair<int, long long>>> adj(n + 1);
    for (int i = 0; i < m; i++) {
        int a, b;
        long long w;
        cin >> a >> b >> w;
        adj[a].push_back({b, w});
        adj[b].push_back({a, w});
    }

    vector<long long> jarak(n + 1, TAK_HINGGA);
    priority_queue<pair<long long, int>, vector<pair<long long, int>>,
                   greater<pair<long long, int>>> pq;
    jarak[awal] = 0;
    pq.push({0, awal});
    while (!pq.empty()) {
        auto [d, v] = pq.top();
        pq.pop();
        if (d > jarak[v]) {
            continue;                         // entri usang: sudah ada jarak lebih baik
        }
        for (auto [w, bobot] : adj[v]) {
            if (jarak[v] + bobot < jarak[w]) {
                jarak[w] = jarak[v] + bobot;
                pq.push({jarak[w], w});
            }
        }
    }
    for (int v = 1; v <= n; v++) {
        if (jarak[v] == TAK_HINGGA) {
            cout << -1;
        } else {
            cout << jarak[v];
        }
        cout << (v < n ? ' ' : '\n');
    }
    return 0;
}
```

Untuk `5 5 1` dan sisi `1 2 4`, `1 3 1`, `3 2 2`, `2 4 1`, `3 4 5`: jarak dari simpul 1 ke simpul 3 adalah 1, ke simpul 2 adalah 3 (lewat simpul 3, lebih pendek daripada 4 langsung), ke simpul 4 adalah 4, dan simpul 5 tidak terjangkau. Keluarannya `0 3 1 4 -1`. Pakai `long long` untuk jarak: jumlah bobot sepanjang jalur bisa melebihi batas `int`.

## Bellman-Ford dan sisi negatif

Bellman-Ford menangani bobot negatif. Ia mengulang relaksasi seluruh sisi sebanyak `N - 1` kali, dengan waktu O(N * M). Jika pada putaran ke-`N` masih ada jarak yang membaik, ada siklus negatif yang dapat dicapai dari simpul awal: siklus yang total bobotnya negatif, sehingga jarak terpendek tidak terdefinisi karena bisa terus diperkecil dengan mengelilingi siklus itu.

```cpp
#include <iostream>
#include <vector>
using namespace std;

const long long TAK_HINGGA = 1000000000000000000LL;

struct Sisi {
    int dari, ke;
    long long bobot;
};

int main() {
    int n, m, awal;
    cin >> n >> m >> awal;
    vector<Sisi> sisi(m);
    for (auto& e : sisi) {
        cin >> e.dari >> e.ke >> e.bobot;       // graph berarah
    }

    vector<long long> jarak(n + 1, TAK_HINGGA);
    jarak[awal] = 0;
    bool siklusNegatif = false;
    for (int putaran = 1; putaran <= n; putaran++) {
        bool berubah = false;
        for (const auto& e : sisi) {
            if (jarak[e.dari] != TAK_HINGGA && jarak[e.dari] + e.bobot < jarak[e.ke]) {
                jarak[e.ke] = jarak[e.dari] + e.bobot;
                berubah = true;
            }
        }
        if (!berubah) {
            break;
        }
        if (putaran == n) {
            siklusNegatif = true;
        }
    }

    if (siklusNegatif) {
        cout << "ADA SIKLUS NEGATIF" << "\n";
    } else {
        for (int v = 1; v <= n; v++) {
            if (jarak[v] == TAK_HINGGA) {
                cout << "-";
            } else {
                cout << jarak[v];
            }
            cout << (v < n ? ' ' : '\n');
        }
    }
    return 0;
}
```

Untuk `4 4 1` dan sisi berarah `1 2 4`, `1 3 5`, `3 2 -3`, `2 4 2`: jarak ke simpul 2 adalah 2 (lewat simpul 3: 5 - 3), ke simpul 3 adalah 5, ke simpul 4 adalah 4. Keluarannya `0 2 5 4`. Untuk sisi `1 2 1`, `2 3 -2`, `3 2 1`, siklus 2 -> 3 -> 2 bertotal -1 sehingga keluarannya `ADA SIKLUS NEGATIF`.

Catatan: pada graph tak berarah, sisi negatif sudah berarti siklus negatif (sisi itu bisa dilalui bolak-balik), jadi Bellman-Ford biasanya dipakai pada graph berarah.

## Floyd-Warshall: jarak semua pasangan

Floyd-Warshall menghitung jarak terpendek antara semua pasangan simpul dengan matrix dan tiga perulangan bersarang, dalam waktu O(N^3) dan memori O(N^2). Untuk `N = 400`, itu sekitar 6,4 x 10^7 langkah; untuk `N` puluhan ribu tidak mungkin. Urutan perulangan penting: simpul perantara `k` harus berada di perulangan paling luar.

```cpp
#include <algorithm>
#include <iostream>
#include <vector>
using namespace std;

const long long TAK_HINGGA = 1000000000000000000LL;

int main() {
    int n, m;
    cin >> n >> m;
    vector<vector<long long>> d(n + 1, vector<long long>(n + 1, TAK_HINGGA));
    for (int i = 1; i <= n; i++) {
        d[i][i] = 0;
    }
    for (int i = 0; i < m; i++) {
        int a, b;
        long long w;
        cin >> a >> b >> w;
        d[a][b] = min(d[a][b], w);              // graph berarah
    }
    for (int k = 1; k <= n; k++) {
        for (int i = 1; i <= n; i++) {
            for (int j = 1; j <= n; j++) {
                if (d[i][k] != TAK_HINGGA && d[k][j] != TAK_HINGGA) {
                    d[i][j] = min(d[i][j], d[i][k] + d[k][j]);
                }
            }
        }
    }
    cout << d[1][n] << "\n";
    return 0;
}
```

Untuk `3 3` dan sisi `1 2 3`, `2 3 4`, `1 3 10`, keluarannya `7`. Jika sesudah selesai ada `d[i][i] < 0`, graph punya siklus negatif. Contoh di atas mencetak `d[1][n]` apa adanya; jika simpul `n` tidak terjangkau, nilainya `TAK_HINGGA`, jadi periksa itu sebelum dicetak pada soal sungguhan.

### Memilih algoritma shortest path

| Situasi | Algoritma | Waktu |
| --- | --- | --- |
| Semua sisi berbobot sama | BFS | O(N + M) |
| Bobot nonnegatif, satu simpul awal | Dijkstra | sekitar O((N + M) log N) |
| Ada bobot negatif, satu simpul awal, perlu deteksi siklus negatif | Bellman-Ford | O(N * M) |
| Semua pasangan, `N` kecil | Floyd-Warshall | O(N^3) |

## Tree dan rooted tree

Tree dapat "digantung" pada sebuah akar (root) sehingga setiap simpul selain akar punya satu induk (parent). Kedalaman (depth) sebuah simpul adalah banyak sisi dari akar ke simpul itu; akar berkedalaman 0. Subtree sebuah simpul adalah simpul itu beserta seluruh keturunannya. Pemikiran subtree ("jawaban simpul ini dihitung dari jawaban anak-anaknya") menjadi dasar banyak soal tree.

Berikut DFS dari akar 1 yang menghitung induk, kedalaman, dan ukuran subtree setiap simpul.

```cpp
#include <iostream>
#include <vector>
using namespace std;

vector<vector<int>> adj;
vector<int> induk, kedalaman, ukuran;

void dfs(int v, int dari) {
    induk[v] = dari;
    ukuran[v] = 1;
    for (int w : adj[v]) {
        if (w != dari) {
            kedalaman[w] = kedalaman[v] + 1;
            dfs(w, v);
            ukuran[v] += ukuran[w];
        }
    }
}

int main() {
    int n;
    cin >> n;
    adj.assign(n + 1, {});
    induk.assign(n + 1, 0);
    kedalaman.assign(n + 1, 0);
    ukuran.assign(n + 1, 0);
    for (int i = 0; i < n - 1; i++) {
        int a, b;
        cin >> a >> b;
        adj[a].push_back(b);
        adj[b].push_back(a);
    }
    dfs(1, 0);
    for (int v = 1; v <= n; v++) {
        cout << v << " " << induk[v] << " " << kedalaman[v] << " " << ukuran[v] << "\n";
    }
    return 0;
}
```

Untuk `n = 7` dengan sisi `1 2`, `1 3`, `2 4`, `2 5`, `3 6`, `3 7`: simpul 1 berinduk 0, kedalaman 0, ukuran 7; simpul 2 dan 3 berkedalaman 1 dan berukuran 3; simpul 4 sampai 7 berkedalaman 2 dan berukuran 1. Pada tree, penelusuran tidak memerlukan penanda `dikunjungi`; cukup hindari kembali ke induk.

Urutan penelusuran tree ada dua macam yang sering disebut: preorder (proses simpul sebelum anak-anaknya) dan postorder (proses simpul setelah anak-anaknya, seperti penghitungan `ukuran` di atas).

## LCA (Lowest Common Ancestor)

LCA dari dua simpul `u` dan `v` pada rooted tree adalah leluhur bersama yang paling dalam (paling jauh dari akar). Cara naif: naikkan simpul yang lebih dalam sampai sejajar, lalu naikkan keduanya bersama sampai bertemu; ini O(N) per pertanyaan dan lambat bila pertanyaan banyak.

Binary lifting menyimpan `naik[j][v]`, yaitu leluhur ke-`2^j` dari `v`. Pembangunan O(N log N) dan tiap pertanyaan O(log N). Berikut versi yang membangun induk dan kedalaman dengan BFS (tanpa rekursi). Nilai `LOG = 18` cukup untuk kedalaman di bawah 2^18 = 262.144.

```cpp
#include <iostream>
#include <queue>
#include <utility>
#include <vector>
using namespace std;

const int LOG = 18;

int main() {
    int n, q;
    cin >> n >> q;
    vector<vector<int>> adj(n + 1);
    for (int i = 0; i < n - 1; i++) {
        int a, b;
        cin >> a >> b;
        adj[a].push_back(b);
        adj[b].push_back(a);
    }

    vector<vector<int>> naik(LOG, vector<int>(n + 1, 1));
    vector<int> kedalaman(n + 1, -1);
    queue<int> antre;
    kedalaman[1] = 0;
    naik[0][1] = 1;                            // induk akar adalah dirinya sendiri
    antre.push(1);
    while (!antre.empty()) {
        int v = antre.front();
        antre.pop();
        for (int w : adj[v]) {
            if (kedalaman[w] == -1) {
                kedalaman[w] = kedalaman[v] + 1;
                naik[0][w] = v;
                antre.push(w);
            }
        }
    }
    for (int j = 1; j < LOG; j++) {
        for (int v = 1; v <= n; v++) {
            naik[j][v] = naik[j - 1][naik[j - 1][v]];
        }
    }

    while (q--) {
        int u, v;
        cin >> u >> v;
        if (kedalaman[u] < kedalaman[v]) {
            swap(u, v);
        }
        int selisih = kedalaman[u] - kedalaman[v];
        for (int j = 0; j < LOG; j++) {
            if ((selisih >> j) & 1) {
                u = naik[j][u];
            }
        }
        if (u != v) {
            for (int j = LOG - 1; j >= 0; j--) {
                if (naik[j][u] != naik[j][v]) {
                    u = naik[j][u];
                    v = naik[j][v];
                }
            }
            u = naik[0][u];
        }
        cout << u << "\n";
    }
    return 0;
}
```

Pada tree 7 simpul di bagian sebelumnya, LCA(4, 5) adalah 2, LCA(4, 6) adalah 1, dan LCA(2, 4) adalah 2. Kegunaan LCA yang sering muncul: jarak antara dua simpul pada tree sama dengan `kedalaman[u] + kedalaman[v] - 2 * kedalaman[lca(u, v)]`.

Binary lifting adalah salah satu cara. Ada cara lain (misalnya Euler tour dengan sparse table); silabus menyebut LCA "sesuai level", jadi pahami konsepnya lebih dulu sebelum menghafal implementasi.

## MST: Kruskal dan Prim

Pada graph tak berarah, berbobot, dan terhubung, spanning tree adalah tree yang memuat semua simpul memakai sebagian sisi. MST (Minimum Spanning Tree) adalah spanning tree dengan total bobot sisi terkecil. MST selalu punya `N - 1` sisi.

Kruskal mengurutkan sisi menurut bobot, lalu mengambil sisi bila kedua ujungnya belum terhubung (diperiksa dengan DSU). Waktunya O(M log M), didominasi pengurutan. Idenya benar karena sisi terkecil yang tidak membentuk siklus selalu aman diambil.

```cpp
#include <algorithm>
#include <iostream>
#include <numeric>
#include <vector>
using namespace std;

struct Sisi {
    int a, b;
    long long bobot;
};

vector<int> induk;

int cari(int x) {
    while (induk[x] != x) {
        induk[x] = induk[induk[x]];
        x = induk[x];
    }
    return x;
}

int main() {
    int n, m;
    cin >> n >> m;
    vector<Sisi> sisi(m);
    for (auto& e : sisi) {
        cin >> e.a >> e.b >> e.bobot;
    }
    sort(sisi.begin(), sisi.end(),
         [](const Sisi& x, const Sisi& y) { return x.bobot < y.bobot; });

    induk.resize(n + 1);
    iota(induk.begin(), induk.end(), 0);
    long long total = 0;
    int dipakai = 0;
    for (const auto& e : sisi) {
        int ra = cari(e.a), rb = cari(e.b);
        if (ra != rb) {
            induk[ra] = rb;
            total += e.bobot;
            dipakai++;
        }
    }
    if (dipakai == n - 1) {
        cout << total << "\n";
    } else {
        cout << "TIDAK TERHUBUNG" << "\n";
    }
    return 0;
}
```

Untuk `4 5` dan sisi `1 2 4`, `2 3 3`, `1 3 1`, `3 4 2`, `2 4 5`: urutan sisi menurut bobot adalah (1-3, 1), (3-4, 2), (2-3, 3), (1-2, 4), (2-4, 5). Sisi pertama sampai ketiga diambil; sisi keempat dan kelima membentuk siklus dan dilewati. Total `1 + 2 + 3 = 6`. Versi singkat di atas memakai DSU tanpa penggabungan berdasarkan ukuran; path compression saja sudah cukup cepat untuk batas soal pada umumnya.

Prim membangun MST dari satu simpul dengan terus menambahkan sisi paling murah yang menghubungkan pohon yang sudah ada ke simpul baru, mirip Dijkstra. Waktunya sekitar O(M log N) dengan `priority_queue`, dan cocok bila graph disimpan sebagai adjacency list.

```cpp
#include <functional>
#include <iostream>
#include <queue>
#include <utility>
#include <vector>
using namespace std;

int main() {
    int n, m;
    cin >> n >> m;
    vector<vector<pair<int, long long>>> adj(n + 1);
    for (int i = 0; i < m; i++) {
        int a, b;
        long long w;
        cin >> a >> b >> w;
        adj[a].push_back({b, w});
        adj[b].push_back({a, w});
    }

    vector<bool> masuk(n + 1, false);
    priority_queue<pair<long long, int>, vector<pair<long long, int>>,
                   greater<pair<long long, int>>> pq;
    pq.push({0, 1});
    long long total = 0;
    int jumlahMasuk = 0;
    while (!pq.empty()) {
        auto [w, v] = pq.top();
        pq.pop();
        if (masuk[v]) {
            continue;
        }
        masuk[v] = true;
        total += w;
        jumlahMasuk++;
        for (auto [tetangga, bobot] : adj[v]) {
            if (!masuk[tetangga]) {
                pq.push({bobot, tetangga});
            }
        }
    }
    if (jumlahMasuk == n) {
        cout << total << "\n";
    } else {
        cout << "TIDAK TERHUBUNG" << "\n";
    }
    return 0;
}
```

Untuk graph yang sama, Prim dari simpul 1 juga menghasilkan `6`. MST tidak selalu unik, tetapi total bobot minimumnya selalu sama. Pilih Kruskal bila sisi sudah berupa daftar; pilih Prim bila graph padat atau sudah berupa adjacency list.

## Kesalahan umum

- Indeks simpul bergeser satu (simpul bernomor 1..N, array berukuran `N`, bukan `N + 1`).
- Lupa menambahkan sisi dua arah pada graph tak berarah, atau menambahkannya dua arah pada graph berarah.
- Pada BFS, menandai simpul dikunjungi saat dikeluarkan dari queue sehingga simpul masuk berkali-kali.
- Memakai Dijkstra pada graph dengan bobot negatif.
- Memakai `int` untuk jarak atau total bobot, atau memakai `TAK_HINGGA` yang bila ditambah bobot menjadi overflow.
- Rekursi DFS terlalu dalam pada graph berbentuk rantai.
- Pada Floyd-Warshall, menaruh simpul perantara `k` di perulangan dalam, bukan paling luar.
- Pada MST, lupa memeriksa bahwa graph terhubung (jumlah sisi terpakai harus `N - 1`).
- Pada LCA, lupa menyamakan kedalaman lebih dulu sebelum menaikkan kedua simpul bersama.

## Latihan

Latihan di bawah dibuat khusus untuk modul ini. Kerjakan di komputer, lalu bandingkan dengan contoh masukan dan keluaran.

### Latihan 1: Derajat simpul

Masukan: `N` dan `M` (1 <= N <= 100.000, 0 <= M <= 200.000), lalu `M` baris `a` dan `b` yang menyatakan sisi tak berarah (tidak ada sisi ganda atau sisi ke diri sendiri). Cetak derajat simpul 1 sampai `N`, dipisahkan spasi.

Contoh masukan:

```
4 4
1 2
1 3
1 4
2 3
```

Contoh keluaran: `3 2 2 1`

Petunjuk: tidak perlu menyimpan graph; cukup hitung kemunculan tiap simpul.

### Latihan 2: Banyak komponen

Masukan: `N` dan `M`, lalu `M` sisi tak berarah. Cetak banyak komponen terhubung.

Contoh masukan:

```
8 5
1 2
2 3
3 1
4 5
6 7
```

Contoh keluaran: `4`

Petunjuk: kerjakan dengan DFS atau BFS, lalu tulis ulang dengan DSU dan bandingkan.

### Latihan 3: Jalan di labirin

Masukan: `R` dan `C` (1 <= R, C <= 1000), lalu `R` baris string sepanjang `C` berisi `.` (kosong), `#` (tembok), `S` (awal), dan `T` (tujuan); masing-masing `S` dan `T` muncul tepat sekali. Dari satu sel, kamu boleh berpindah ke sel kosong (atau `T`) di atas, bawah, kiri, atau kanan. Cetak banyak langkah minimum dari `S` ke `T`, atau `-1` bila tidak mungkin.

Contoh masukan:

```
3 5
S.#.T
.#...
...#.
```

Contoh keluaran: `8`

Petunjuk: jalur terpendek tidak lurus; ia berkelok ke bawah, melewati celah di antara tembok, lalu naik lagi. Telusuri sendiri dengan tangan, lalu ubah masukan agar `T` terkurung tembok dan periksa bahwa programmu mencetak `-1`. Jumlah sel bisa mencapai 10^6, jadi simpan jarak dalam array dua dimensi.

### Latihan 4: Perjalanan tercepat

Masukan: `N` dan `M`, lalu `M` baris `a`, `b`, `w` (waktu tempuh jalan dua arah, 1 <= w <= 1.000.000.000). Cetak waktu tercepat dari kota 1 ke kota `N`, atau `-1` bila tidak terhubung.

Contoh masukan:

```
4 5
1 2 7
1 3 2
3 2 3
2 4 1
3 4 8
```

Contoh keluaran: `6`

Petunjuk: jalur 1 -> 3 -> 2 -> 4 berwaktu 2 + 3 + 1. Pakai `long long`.

### Latihan 5: Siklus negatif

Masukan: `N` dan `M`, lalu `M` sisi berarah `a`, `b`, `w` (w boleh negatif). Cetak `ADA` bila dari simpul 1 dapat dicapai sebuah siklus dengan total bobot negatif, selain itu cetak `TIDAK`.

Contoh masukan:

```
3 3
1 2 4
2 3 -6
3 2 1
```

Contoh keluaran: `ADA`

Petunjuk: siklus 2 -> 3 -> 2 berbobot -6 + 1 = -5. Ubah bobot sisi `3 2` menjadi 8 dan perhatikan perubahan jawabannya.

### Latihan 6: Kabel jaringan

Masukan: `N` dan `M`, lalu `M` baris `a`, `b`, `w`: biaya memasang kabel antara `a` dan `b`. Cetak biaya minimum agar semua komputer saling terhubung, atau `TIDAK TERHUBUNG` bila mustahil.

Contoh masukan:

```
5 7
1 2 2
1 3 3
2 3 1
2 4 4
3 4 5
4 5 6
3 5 7
```

Contoh keluaran: `13`

Petunjuk: urutkan sisi menurut biaya; sisi mana saja yang dilewati dan mengapa?

### Latihan 7: Jarak pada tree

Masukan: `N` (banyak simpul) dan `Q` (banyak pertanyaan), lalu `N - 1` sisi tree, lalu `Q` pasangan `u v`. Untuk setiap pasangan, cetak banyak sisi pada jalur dari `u` ke `v`.

Contoh masukan:

```
7 3
1 2
1 3
2 4
2 5
3 6
3 7
4 7
4 5
2 4
```

Contoh keluaran:

```
4
2
1
```

Petunjuk: gunakan rumus jarak dari bagian LCA dan kode LCA sebagai dasar.

### Latihan 8: Pilih representasi dan algoritma

Tanpa menulis kode, pilih representasi dan algoritma yang paling tepat, beserta perkiraan jumlah operasi:

1. `N = 100.000` simpul, `M = 200.000` jalan berbobot positif, satu simpul awal, jarak ke semua simpul.
2. `N = 300` simpul, jarak terpendek dari setiap simpul ke setiap simpul lain.
3. `N = 100.000` simpul, semua sisi berbobot sama, jumlah langkah terpendek dari simpul 1.
4. Sebuah graph berarah dengan beberapa sisi bernilai negatif dan `N = 1000`, `M = 5000`: apakah ada siklus negatif dari simpul 1?

Perkirakan: untuk nomor 1, `(N + M) log N` kira-kira 3 x 10^5 x 17, sekitar 5 juta. Untuk nomor 2, hitung `N^3`. Bandingkan dengan kira-kira 10^8 operasi sederhana per detik.

## Cek mandiri

Setelah selesai, pastikan kamu bisa menjawab tanpa melihat catatan:

- Kapan memilih adjacency list dan kapan adjacency matrix?
- Mengapa BFS menemukan jarak terpendek pada graph tak berbobot?
- Mengapa Dijkstra tidak boleh dipakai bila ada sisi negatif?
- Apa arti siklus negatif, dan bagaimana Bellman-Ford mendeteksinya?
- Mengapa perulangan `k` pada Floyd-Warshall harus paling luar?
- Berapa banyak sisi pada tree dengan `N` simpul, dan pada MST?
- Bagaimana DSU dipakai oleh Kruskal?
- Bagaimana menghitung jarak dua simpul pada tree dengan LCA?

## Langkah berikutnya

Lanjutkan ke topik berikutnya pada silabus, misalnya geometri dasar dan campuran algoritma serta struktur data. Untuk melihat cakupan resmi dan silabus terbaru, rujuk halaman silabus OSN di bagian Rujukan. Untuk soal latihan tambahan, pilih soal dari arsip resmi (https://osn.toki.id/arsip) lalu kerjakan sendiri; jangan menyalin soal ke dalam modul ini.
