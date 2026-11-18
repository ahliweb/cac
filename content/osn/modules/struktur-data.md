## Untuk siapa modul ini

Modul ini untuk siswa SMA yang sudah menguasai dasar pemrograman C++17 (variabel, I/O, percabangan, perulangan, fungsi) dan ingin memahami struktur data yang sering dipakai pada OSN Informatika. Isinya mengikuti rumpun materi "Struktur data" pada silabus pembinaan: tipe primitif, array dan array multidimensi, string, stack dan queue, binary heap, DSU, serta Fenwick Tree dan Segment Tree. Modul ini juga memuat teknik pendukung yang disebut pada minggu-minggu terkait: STL dasar, prefix sum, difference array, two pointers/sliding window, deque, dan set/map.

Setelah mempelajari modul ini, kamu diharapkan bisa memilih struktur data berdasarkan operasi yang dibutuhkan dan batas soal, menuliskan struktur dasarnya sendiri, dan memperkirakan kompleksitasnya.

Cara memakai: baca penjelasan, ketik ulang setiap contoh (jangan hanya disalin), ubah nilainya, lalu kerjakan latihan. Contoh kode di modul ini hanya diperiksa bisa dikompilasi (C++17); itu tidak membuktikan contoh benar untuk semua masukan, jadi tetap uji sendiri. Modul ini tidak membahas graph dan tree; keduanya ada di modul tersendiri.

## Tipe primitif dan ukuran memori

Tipe primitif adalah tipe bawaan: `int`, `long long`, `double`, `char`, dan `bool`. Pemilihan tipe dibahas pada modul dasar pemrograman; di sini yang ditambahkan adalah kebiasaan memperkirakan memori.

| Tipe | Ukuran umum | Catatan |
| --- | --- | --- |
| `char`, `bool` | 1 byte | ukuran pasti bergantung kompiler; periksa dengan `sizeof` |
| `int` | 4 byte | pada kompiler yang umum dipakai |
| `long long` | 8 byte | paling sedikit 64 bit |
| `double` | 8 byte | pada kompiler yang umum dipakai |

Perkiraan kasar: array `int` berisi 1.000.000 elemen memakai sekitar 4 MB; array `long long` dengan jumlah elemen sama memakai sekitar 8 MB. Tabel 1000 x 1000 bertipe `int` juga sekitar 4 MB. Bandingkan dengan batas memori soal sebelum mendeklarasikan struktur yang besar.

## Array dan array multidimensi

Array menyimpan sejumlah elemen bertipe sama secara berurutan, diakses lewat indeks yang dimulai dari 0. Akses elemen ke-`i` berlangsung dalam waktu konstan.

```cpp
#include <iostream>
using namespace std;

const int MAKS = 100005;
int a[MAKS];            // array global: otomatis berisi 0

int main() {
    int n;
    cin >> n;
    for (int i = 0; i < n; i++) {
        cin >> a[i];
    }
    long long jumlah = 0;
    for (int i = 0; i < n; i++) {
        jumlah += a[i];
    }
    cout << jumlah << "\n";
    return 0;
}
```

Hal yang perlu diingat:

- Array di luar fungsi (global) berisi 0 pada awalnya. Array lokal tidak diberi nilai awal, jadi isinya sembarang.
- Array lokal yang sangat besar dapat menghabiskan memori stack program dan membuatnya berhenti. Untuk ukuran besar, letakkan array di luar fungsi atau pakai `vector`.
- Mengakses indeks di luar batas (misalnya `a[n]` pada array berukuran `n`) adalah perilaku tak terdefinisi. Program bisa tampak jalan, tetapi hasilnya tidak boleh diandalkan.
- `vector<int> v(n)` membuat `n` elemen bernilai 0 dan ukurannya bisa ditentukan saat program berjalan.

Array multidimensi dipakai untuk tabel, papan, atau grid. Elemen diakses dengan dua indeks: `g[baris][kolom]`.

```cpp
#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n, m;
    cin >> n >> m;
    vector<vector<int>> g(n, vector<int>(m));
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < m; j++) {
            cin >> g[i][j];
        }
    }
    for (int i = 0; i < n; i++) {
        long long jumlahBaris = 0;
        for (int j = 0; j < m; j++) {
            jumlahBaris += g[i][j];
        }
        cout << jumlahBaris << "\n";
    }
    return 0;
}
```

Untuk masukan `2 3` diikuti baris `1 2 3` dan `4 5 6`, keluarannya `6` lalu `15`. Dua perulangan bersarang di atas berjalan dalam waktu sebanding dengan `n * m`. Hati-hati menukar `n` dan `m` ketika menentukan batas perulangan.

## String

Pada C++, `string` adalah deretan karakter yang ukurannya dapat berubah. Isinya dapat diakses dengan indeks seperti array, dari 0.

```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
    string s;
    cin >> s;                       // membaca satu kata (berhenti di spasi)
    int vokal = 0;
    for (char c : s) {
        if (c == 'a' || c == 'i' || c == 'u' || c == 'e' || c == 'o') {
            vokal++;
        }
    }
    cout << s.size() << " " << vokal << "\n";

    string t = s.substr(0, 2);      // mulai indeks 0, panjang 2
    cout << t + "!" << "\n";
    return 0;
}
```

Jika masukannya `halo`, keluarannya `4 2` lalu `ha!`.

Hal yang perlu diperhatikan:

- `cin >> s` membaca satu kata. Untuk membaca satu baris penuh yang berisi spasi, pakai `getline(cin, s)`. Jika sebelumnya ada `cin >> n`, sisa baris baru masih tertinggal di masukan; panggil `cin.ignore()` sebelum `getline`, atau `getline(cin >> ws, s)`.
- `s.size()` bertipe tak bertanda (`size_t`). Ekspresi seperti `s.size() - 1` pada string kosong menghasilkan bilangan sangat besar. Ubah ke `int` bila perlu: `int n = s.size();`.
- Membandingkan dua string (`==`), menyambung (`+`), dan `substr` membutuhkan waktu sebanding dengan panjang string yang terlibat. Menyambung berulang kali di dalam perulangan panjang dengan `s = s + c` dapat lambat; `s += c` lebih baik.
- Karakter dapat diperlakukan sebagai bilangan: `c - 'a'` bernilai 0 untuk `'a'`, 1 untuk `'b'`, dan seterusnya (untuk huruf kecil). Ini berguna untuk array pencacah huruf berukuran 26.

## STL dasar: vector, pair, sort, set, dan map

STL adalah pustaka standar C++ yang menyediakan struktur data dan algoritma siap pakai. Berikut yang paling sering dipakai:

| Struktur | Fungsi | Kompleksitas operasi utama |
| --- | --- | --- |
| `vector<T>` | array dinamis; `push_back`, `size`, akses `[i]` | akses O(1); `push_back` O(1) amortized |
| `pair<A, B>` | menyimpan dua nilai; `first` dan `second` | O(1) |
| `sort(awal, akhir)` | mengurutkan | O(n log n) |
| `set<T>` | himpunan terurut tanpa duplikat; `insert`, `erase`, `count`, `find` | O(log n) per operasi |
| `map<K, V>` | pasangan kunci-nilai terurut menurut kunci | O(log n) per operasi |

```cpp
#include <algorithm>
#include <iostream>
#include <map>
#include <set>
#include <vector>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> a(n);
    for (int i = 0; i < n; i++) {
        cin >> a[i];
    }

    sort(a.begin(), a.end());
    set<int> unik(a.begin(), a.end());
    map<int, int> frekuensi;
    for (int x : a) {
        frekuensi[x]++;               // jika kunci belum ada, dibuat dengan nilai 0
    }

    cout << unik.size() << "\n";
    for (const auto& [nilai, banyak] : frekuensi) {
        cout << nilai << ": " << banyak << "\n";
    }
    return 0;
}
```

Untuk masukan `5` dan `3 1 3 2 1`, keluarannya `3`, lalu `1: 2`, `2: 1`, `3: 2`. Perhatikan bahwa `frekuensi[x]` menyisipkan kunci baru bila belum ada; untuk sekadar memeriksa keberadaan, pakai `count` atau `find`.

## Prefix sum

Prefix sum menyimpan jumlah awalan: `p[i]` = jumlah `a[1]` sampai `a[i]`, dengan `p[0] = 0`. Jumlah elemen dari indeks `l` sampai `r` (indeks mulai dari 1) menjadi `p[r] - p[l-1]`, dihitung dalam waktu konstan. Pembangunannya O(n), jadi `q` pertanyaan selesai dalam O(n + q), bukan O(n * q).

```cpp
#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n, q;
    cin >> n >> q;
    vector<long long> p(n + 1, 0);
    for (int i = 1; i <= n; i++) {
        int x;
        cin >> x;
        p[i] = p[i - 1] + x;
    }
    while (q--) {
        int l, r;
        cin >> l >> r;
        cout << p[r] - p[l - 1] << "\n";
    }
    return 0;
}
```

Untuk `n = 5`, `q = 1`, elemen `3 1 4 1 5`, dan pertanyaan `2 4`: `p = 0 3 4 8 9 14`, jadi jawabannya `p[4] - p[1] = 9 - 3 = 6` (yaitu 1 + 4 + 1). Pakai `long long` untuk `p` karena jumlah banyak bilangan mudah melampaui batas `int`.

## Difference array

Difference array adalah kebalikan prefix sum, cocok untuk banyak operasi "tambahkan `v` ke semua elemen dari `l` sampai `r`" yang dijawab sekaligus di akhir. Simpan `d`, lalu untuk setiap operasi lakukan `d[l] += v` dan `d[r+1] -= v`. Nilai akhir elemen ke-`i` adalah jumlah berjalan `d[1] + ... + d[i]`. Setiap operasi O(1) dan pembacaan akhir O(n).

```cpp
#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n, m;
    cin >> n >> m;
    vector<long long> d(n + 2, 0);
    while (m--) {
        int l, r;
        long long v;
        cin >> l >> r >> v;
        d[l] += v;
        d[r + 1] -= v;
    }
    long long sekarang = 0;
    for (int i = 1; i <= n; i++) {
        sekarang += d[i];
        cout << sekarang << (i < n ? ' ' : '\n');
    }
    return 0;
}
```

Untuk `n = 4` dengan operasi `1 2 5` dan `2 4 3`: operasi pertama membuat `d[1] = 5` dan `d[3] = -5`; operasi kedua membuat `d[2] = 3` dan `d[5] = -3`. Jumlah berjalan dari `d[1]` sampai `d[4]` adalah 5, 8, 3, 3, jadi keluarannya `5 8 3 3`.

## Two pointers dan sliding window

Teknik dua penunjuk menggerakkan dua indeks (`kiri` dan `kanan`) yang masing-masing hanya maju. Karena tiap indeks bergerak paling banyak `n` langkah, total pekerjaan O(n). Contoh: mencari segmen berurutan terpanjang yang jumlahnya tidak melebihi `K`, dengan semua elemen tidak negatif.

```cpp
#include <algorithm>
#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n;
    long long k;
    cin >> n >> k;
    vector<long long> a(n);
    for (int i = 0; i < n; i++) {
        cin >> a[i];
    }

    int terbaik = 0, kiri = 0;
    long long jumlah = 0;
    for (int kanan = 0; kanan < n; kanan++) {
        jumlah += a[kanan];
        while (jumlah > k) {          // jendela terlalu berat: geser sisi kiri
            jumlah -= a[kiri];
            kiri++;
        }
        terbaik = max(terbaik, kanan - kiri + 1);
    }
    cout << terbaik << "\n";
    return 0;
}
```

Untuk `n = 5`, `K = 5`, elemen `2 1 3 1 1`, keluarannya `3`. Syarat penting: semua elemen tidak negatif. Dengan elemen negatif, menggeser `kiri` tidak lagi menjamin jumlah mengecil, sehingga cara ini tidak benar.

## Stack dan queue

Stack (tumpukan) bersifat LIFO: yang terakhir masuk, pertama keluar. Operasinya `push`, `pop`, `top`, dan `empty`, masing-masing O(1). Contoh klasik: memeriksa kurung yang seimbang.

```cpp
#include <iostream>
#include <stack>
#include <string>
using namespace std;

int main() {
    string s;
    cin >> s;
    stack<char> st;
    bool ok = true;
    for (char c : s) {
        if (c == '(' || c == '[' || c == '{') {
            st.push(c);
        } else {
            if (st.empty()) {
                ok = false;
                break;
            }
            char atas = st.top();
            st.pop();
            if ((c == ')' && atas != '(') || (c == ']' && atas != '[') ||
                (c == '}' && atas != '{')) {
                ok = false;
                break;
            }
        }
    }
    if (!st.empty()) {
        ok = false;
    }
    cout << (ok ? "SEIMBANG" : "TIDAK") << "\n";
    return 0;
}
```

Untuk `([]{})` keluarannya `SEIMBANG`; untuk `(]` keluarannya `TIDAK`. Selalu periksa `empty()` sebelum `top()` atau `pop()`; memanggilnya pada stack kosong adalah perilaku tak terdefinisi.

Queue (antrean) bersifat FIFO: yang pertama masuk, pertama keluar. Operasinya `push`, `pop`, `front`, dan `empty`, masing-masing O(1). Queue menjadi dasar BFS pada graph. `deque` adalah antrean dua sisi: `push_front`, `push_back`, `pop_front`, `pop_back`, juga O(1), dan elemennya dapat diakses dengan indeks.

```cpp
#include <deque>
#include <iostream>
#include <queue>
using namespace std;

int main() {
    queue<int> q;
    for (int i = 1; i <= 3; i++) {
        q.push(i * 10);
    }
    while (!q.empty()) {
        cout << q.front() << " ";    // 10 20 30
        q.pop();
    }
    cout << "\n";

    deque<int> dq;
    dq.push_back(2);
    dq.push_front(1);
    dq.push_back(3);
    cout << dq.front() << " " << dq.back() << " " << dq[1] << "\n";   // 1 3 2
    return 0;
}
```

## Binary heap dan priority_queue

Binary heap adalah struktur yang selalu dapat memberikan elemen terbesar (max-heap) atau terkecil (min-heap) dengan cepat. Di C++, `priority_queue` adalah heap. Secara bawaan ia adalah max-heap: `top()` O(1), `push` dan `pop` O(log n). Untuk min-heap, tambahkan `greater<int>` dan `vector<int>`.

Contoh: ada tali dengan panjang tertentu; menyambung dua tali berpanjang `x` dan `y` berbiaya `x + y` dan menghasilkan tali berpanjang `x + y`. Biaya total minimum untuk menyambung semuanya menjadi satu diperoleh dengan selalu menyambung dua tali terpendek (strategi greedy yang bisa dibuktikan, bukan sekadar kebiasaan).

```cpp
#include <functional>
#include <iostream>
#include <queue>
#include <vector>
using namespace std;

int main() {
    int n;
    cin >> n;
    priority_queue<long long, vector<long long>, greater<long long>> pq;
    for (int i = 0; i < n; i++) {
        long long x;
        cin >> x;
        pq.push(x);
    }
    long long biaya = 0;
    while (pq.size() > 1) {
        long long a = pq.top();
        pq.pop();
        long long b = pq.top();
        pq.pop();
        biaya += a + b;
        pq.push(a + b);
    }
    cout << biaya << "\n";
    return 0;
}
```

Untuk `4` tali berpanjang `4 3 2 6`: sambung 2 dan 3 (biaya 5), sambung 4 dan 5 (biaya 9), sambung 6 dan 9 (biaya 15); total `29`. Waktunya O(n log n).

`priority_queue` tidak dapat menghapus atau mengubah elemen sembarang; hanya elemen paling atas yang dapat diambil. Jika butuh itu, `set` bisa menjadi alternatif dengan operasi O(log n).

## DSU (Disjoint Set Union)

DSU menyimpan sekumpulan himpunan yang saling lepas dan mendukung dua operasi: `cari(x)` yang mengembalikan wakil himpunan tempat `x` berada, dan `gabung(a, b)` yang menyatukan dua himpunan. Awalnya setiap elemen berdiri sendiri. Dua elemen berada dalam himpunan yang sama bila wakilnya sama.

Dua optimisasi membuat DSU sangat cepat: menggabungkan berdasarkan ukuran (himpunan kecil digantungkan ke himpunan besar) dan path compression (saat mencari, elemen diarahkan lebih dekat ke wakil). Dengan keduanya, waktu amortized per operasi hampir konstan (tepatnya sebanding dengan invers fungsi Ackermann, yang untuk ukuran masukan praktis tidak lebih dari beberapa). Versi di bawah memakai path halving, salah satu bentuk path compression.

```cpp
#include <algorithm>
#include <iostream>
#include <vector>
using namespace std;

struct DSU {
    vector<int> induk, ukuran;

    explicit DSU(int n) : induk(n + 1), ukuran(n + 1, 1) {
        for (int i = 0; i <= n; i++) {
            induk[i] = i;
        }
    }

    int cari(int x) {
        while (induk[x] != x) {
            induk[x] = induk[induk[x]];   // path halving
            x = induk[x];
        }
        return x;
    }

    bool gabung(int a, int b) {
        a = cari(a);
        b = cari(b);
        if (a == b) {
            return false;                 // sudah satu himpunan
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
    DSU dsu(6);
    dsu.gabung(1, 2);
    dsu.gabung(3, 4);
    dsu.gabung(2, 3);
    cout << (dsu.cari(1) == dsu.cari(4)) << "\n";   // 1
    cout << (dsu.cari(1) == dsu.cari(5)) << "\n";   // 0
    return 0;
}
```

Pemakaian umum: menghitung banyak komponen terhubung (kurangi satu setiap `gabung` yang berhasil), menjawab "apakah dua titik terhubung", dan algoritma Kruskal pada graph. Perhatikan bahwa DSU hanya mendukung penggabungan, bukan pemisahan.

## Fenwick Tree

Fenwick Tree (Binary Indexed Tree) menjawab dua hal dalam O(log N): mengubah satu elemen (point update) dan menghitung jumlah awalan (prefix query). Jumlah rentang `[l, r]` didapat dari `jumlah(r) - jumlah(l-1)`. Indeks dimulai dari 1. Operasi `i & -i` mengambil bit terendah yang menyala pada `i`, dan menentukan rentang yang dipegang setiap sel.

```cpp
#include <iostream>
#include <vector>
using namespace std;

struct Fenwick {
    int n;
    vector<long long> t;

    explicit Fenwick(int n) : n(n), t(n + 1, 0) {}

    void tambah(int i, long long v) {
        for (; i <= n; i += i & -i) {
            t[i] += v;
        }
    }

    long long jumlah(int i) const {
        long long s = 0;
        for (; i > 0; i -= i & -i) {
            s += t[i];
        }
        return s;
    }

    long long jumlah(int l, int r) const {
        return jumlah(r) - jumlah(l - 1);
    }
};

int main() {
    int a[] = {0, 3, 1, 4, 1, 5};            // indeks 1..5
    Fenwick fw(5);
    for (int i = 1; i <= 5; i++) {
        fw.tambah(i, a[i]);
    }
    cout << fw.jumlah(2, 4) << "\n";           // 6
    fw.tambah(3, 10);                          // elemen ke-3 menjadi 14
    cout << fw.jumlah(2, 4) << "\n";           // 16
    return 0;
}
```

Fenwick Tree singkat dan cepat, tetapi terutama cocok untuk operasi yang punya "lawan" (seperti jumlah, yang bisa dikurangkan). Untuk operasi seperti minimum pada rentang sembarang, pakai Segment Tree.

## Segment Tree

Segment Tree membagi rentang `[1, n]` menjadi dua bagian secara rekursif dan menyimpan hasil gabungan (agregat) tiap segmen. Ia mendukung point update dan range query dalam O(log n) untuk operasi yang asosiatif, seperti jumlah, minimum, atau maksimum. Array berukuran `4n` cukup untuk menampung seluruh simpul. Contoh berikut menyimpan minimum.

```cpp
#include <algorithm>
#include <iostream>
#include <vector>
using namespace std;

const long long TAK_HINGGA = 4000000000000000000LL;

struct SegTree {
    int n;
    vector<long long> t;

    explicit SegTree(int n) : n(n), t(4 * n, TAK_HINGGA) {}

    void ubah(int simpul, int l, int r, int pos, long long nilai) {
        if (l == r) {
            t[simpul] = nilai;
            return;
        }
        int tengah = (l + r) / 2;
        if (pos <= tengah) {
            ubah(2 * simpul, l, tengah, pos, nilai);
        } else {
            ubah(2 * simpul + 1, tengah + 1, r, pos, nilai);
        }
        t[simpul] = min(t[2 * simpul], t[2 * simpul + 1]);
    }

    long long tanya(int simpul, int l, int r, int ql, int qr) const {
        if (qr < l || r < ql) {
            return TAK_HINGGA;               // di luar rentang: elemen netral untuk min
        }
        if (ql <= l && r <= qr) {
            return t[simpul];
        }
        int tengah = (l + r) / 2;
        return min(tanya(2 * simpul, l, tengah, ql, qr),
                   tanya(2 * simpul + 1, tengah + 1, r, ql, qr));
    }
};

int main() {
    int a[] = {0, 5, 2, 8, 1, 4};             // indeks 1..5
    SegTree st(5);
    for (int i = 1; i <= 5; i++) {
        st.ubah(1, 1, 5, i, a[i]);
    }
    cout << st.tanya(1, 1, 5, 1, 3) << "\n";   // 2
    st.ubah(1, 1, 5, 2, 9);                    // elemen ke-2 menjadi 9
    cout << st.tanya(1, 1, 5, 1, 3) << "\n";   // 5
    cout << st.tanya(1, 1, 5, 2, 5) << "\n";   // 1
    return 0;
}
```

Elemen netral (di sini `TAK_HINGGA`) adalah nilai yang tidak mengubah hasil agregat; untuk jumlah netralnya 0, untuk maksimum nilai yang sangat kecil.

## Memilih struktur data

Tanyakan dulu: operasi apa saja yang dilakukan, seberapa sering, dan berapa batas `N` serta jumlah operasi?

| Kebutuhan | Pilihan |
| --- | --- |
| Akses per indeks, data tetap | array atau `vector` |
| Jumlah rentang, tanpa perubahan data | prefix sum |
| Banyak penambahan rentang, hasil dibaca di akhir | difference array |
| Segmen berurutan dengan syarat monoton | two pointers |
| Yang terakhir masuk diproses dulu | stack |
| Yang pertama masuk diproses dulu | queue atau deque |
| Selalu ambil terbesar atau terkecil | priority_queue |
| Cek keanggotaan dan hitung frekuensi | set atau map |
| Gabung himpunan dan cek apakah satu himpunan | DSU |
| Jumlah rentang dengan perubahan elemen | Fenwick Tree |
| Minimum atau maksimum rentang dengan perubahan elemen, atau agregat lain | Segment Tree |

Patokan kasar: komputer menjalankan sekitar 10^8 operasi sederhana dalam satu detik pada soal kompetisi; angka ini hanya perkiraan dan bergantung pada soal dan mesin. Jika `N` dan `Q` sama-sama 2 x 10^5, solusi O(N * Q) berarti sekitar 4 x 10^10 operasi dan tidak akan selesai, sedangkan O((N + Q) log N) hanya sekitar 7 juta.

## Kesalahan umum

- Indeks bergeser satu: lupa bahwa array mulai dari 0 sementara prefix sum, DSU, dan Fenwick di modul ini memakai indeks 1.
- Ukuran array terlalu kecil untuk `r + 1`, `n + 1`, atau `4 * n`.
- Memakai `int` untuk jumlah yang bisa melebihi sekitar 2 x 10^9.
- Memanggil `top()`, `front()`, atau `pop()` pada struktur yang kosong.
- Memakai two pointers pada data yang punya elemen negatif.
- Lupa membalik urutan pada `priority_queue` untuk min-heap (bawaannya max-heap).
- Menulis `frekuensi[x]` hanya untuk memeriksa keberadaan, sehingga menambah kunci tanpa sengaja.
- Pada DSU, lupa memanggil `cari` sebelum membandingkan atau menggabungkan.
- Pada Segment Tree, memakai elemen netral yang salah.

## Latihan

Latihan di bawah dibuat khusus untuk modul ini. Kerjakan di komputer, lalu bandingkan dengan contoh masukan dan keluaran.

### Latihan 1: Jumlah rentang

Masukan: baris pertama `N` dan `Q` (1 <= N, Q <= 200.000). Baris kedua `N` bilangan bulat, masing-masing antara -1.000.000.000 dan 1.000.000.000. Lalu `Q` baris, masing-masing berisi `l` dan `r` (1 <= l <= r <= N). Untuk setiap pertanyaan, cetak jumlah elemen dari indeks `l` sampai `r`.

Contoh masukan:

```
5 2
4 -1 3 2 -2
1 3
2 5
```

Contoh keluaran:

```
6
2
```

Petunjuk: perkirakan nilai terbesar jawaban sebelum memilih tipe data.

### Latihan 2: Penyiraman kebun

Masukan: baris pertama `N` (banyak petak) dan `M` (banyak penyiraman). Setiap dari `M` baris berisi `l`, `r`, dan `v`: petak `l` sampai `r` bertambah `v` satuan air. Semua petak awalnya berisi 0. Cetak isi akhir setiap petak, dipisahkan spasi.

Contoh masukan:

```
5 2
1 3 2
2 5 1
```

Contoh keluaran: `2 3 3 1 1`

Petunjuk: gunakan difference array dan ingat ukuran `N + 2`.

### Latihan 3: Elemen lebih besar berikutnya

Masukan: `N` (1 <= N <= 100.000), lalu `N` bilangan bulat. Untuk setiap posisi `i`, cetak elemen pertama di sebelah kanan `i` yang lebih besar dari `a[i]`, atau `-1` bila tidak ada. Pisahkan dengan spasi.

Contoh masukan:

```
5
2 1 5 3 4
```

Contoh keluaran: `5 5 -1 4 -1`

Petunjuk: proses dari kiri ke kanan sambil menyimpan indeks yang jawabannya belum ditemukan pada sebuah stack. Setiap elemen masuk dan keluar stack paling banyak satu kali.

### Latihan 4: Koin terbesar

Masukan: `N`, `K`, lalu `N` bilangan bulat positif (nilai koin). Lakukan `K` kali: ambil koin bernilai terbesar, tambahkan nilainya ke skor, lalu kembalikan koin itu dengan nilai dikurangi 1, kecuali bila nilainya menjadi 0 (maka koin dibuang). Jika koin habis sebelum `K` langkah, berhenti. Cetak skor akhir.

Contoh masukan:

```
3 4
5 3 2
```

Contoh keluaran: `15`

Petunjuk: pakai `priority_queue`, dan jaga skor dalam `long long`.

### Latihan 5: Jembatan antarpulau

Masukan: `N` (banyak pulau) dan `M` (banyak jembatan), lalu `M` baris `a` dan `b`: sebuah jembatan menghubungkan pulau `a` dan `b`. Awalnya tidak ada jembatan. Setelah setiap jembatan dibangun, cetak banyak kelompok pulau yang saling terhubung.

Contoh masukan:

```
5 4
1 2
3 4
2 1
2 3
```

Contoh keluaran: `4 3 3 2` (dipisahkan spasi, satu baris).

Petunjuk: gunakan DSU; kurangi hitungan hanya bila `gabung` mengembalikan `true`.

### Latihan 6: Toko dengan harga berubah

Masukan: `N`, `Q`, lalu `N` bilangan bulat awal. Setiap dari `Q` baris berformat `1 i v` (tambahkan `v` ke elemen ke-`i`) atau `2 l r` (cetak jumlah elemen `l` sampai `r`).

Contoh masukan:

```
5 4
1 2 3 4 5
2 1 3
1 2 10
2 1 3
2 2 5
```

Contoh keluaran:

```
6
16
24
```

Petunjuk: gunakan Fenwick Tree. Mengapa prefix sum biasa tidak cukup di sini?

### Latihan 7: Matriks

Masukan: `N` dan `M` (1 <= N, M <= 1000), lalu tabel `N x M` bilangan bulat. Cetak jumlah setiap baris pada satu baris keluaran, lalu jumlah setiap kolom pada baris berikutnya.

Contoh masukan:

```
2 3
1 2 3
4 5 6
```

Contoh keluaran:

```
6 15
5 7 9
```

### Latihan 8: Pilih struktur data

Tanpa menulis kode, pilih struktur data yang paling tepat dan beri alasan singkat (operasi dan kompleksitas) untuk setiap kasus berikut:

1. Ada `N = 200.000` suhu harian. Diberikan `Q = 200.000` pertanyaan "berapa suhu terendah dari hari `l` sampai `r`", dan suhu tidak pernah berubah.
2. Sama seperti nomor 1, tetapi di antara pertanyaan ada perubahan suhu pada satu hari tertentu.
3. Kamu menerima bilangan satu per satu. Setiap kali ada perintah "ambil", kamu harus mengeluarkan bilangan terkecil di antara yang belum diambil, lalu menghapusnya.
4. Kamu harus memeriksa apakah sebuah kata pernah muncul sebelumnya di antara `100.000` kata.

Setelah itu, perkirakan jumlah operasi kasar bila kamu memakai cara paling sederhana (menghitung ulang setiap kali) untuk nomor 1 dan bandingkan dengan pilihanmu.

## Cek mandiri

Setelah selesai, pastikan kamu bisa menjawab tanpa melihat catatan:

- Mengapa array lokal berukuran 10^7 sebaiknya dihindari, dan apa gantinya?
- Apa yang diwakili `p[r] - p[l-1]`, dan mengapa indeks dimulai dari 1?
- Mengapa `d[r+1] -= v` diperlukan pada difference array?
- Kapan two pointers valid, dan mengapa elemen negatif merusaknya?
- Apa beda stack, queue, dan priority_queue dalam urutan keluarnya elemen?
- Apa dua optimisasi DSU, dan apa yang tidak bisa dilakukan DSU?
- Kapan memilih Fenwick Tree dan kapan Segment Tree?
- Apa elemen netral, dan apa nilainya untuk jumlah, minimum, dan maksimum?

## Langkah berikutnya

Lanjutkan ke topik graph dan tree (BFS, DFS, shortest path, MST), tempat queue, priority_queue, dan DSU dipakai langsung. Untuk melihat cakupan resmi dan silabus terbaru, rujuk halaman silabus OSN di bagian Rujukan. Untuk soal latihan tambahan, pilih soal dari arsip resmi (https://osn.toki.id/arsip) lalu kerjakan sendiri; jangan menyalin soal ke dalam modul ini.
