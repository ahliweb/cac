## Untuk siapa modul ini

Modul belajar untuk mata kuliah `KUL-I-102` (3 SKS, semester 2, jalur I), bagian
dari program `kuliah-coding`. Konten ini karangan menurut ADR-0007 dan belum
disetujui. Kode di modul ini adalah **C++17** (g++ 13.3, Linux): tiap blok `cpp`
dikompilasi dengan `-std=c++17 -Wall -Wextra` tanpa peringatan, dijalankan, dan
keluarannya cocok dengan yang tertulis.

Mahasiswa semester 2 informatika atau ilmu komputer yang sudah menempuh
`KUL-I-101` (fungsi, larik, penunjuk, rekursi). Satu mata kuliah, satu
semester: 14 pertemuan, ujian tengah sesudah pertemuan 7, ujian akhir sesudah
pertemuan 14 `[asumsi]` (silabus 2.3). Kamu butuh g++ (C++17) dan Git. Berbeda
dengan semester 1, contoh terselesaikan penuh hanya untuk konsep **baru**;
sisanya setengah jadi atau membaca kode orang lain.

## Peta semester

| Pertemuan | Bagian | Pokok bahasan | CPMK | Kuis pembuka (jarak) |
| --- | --- | --- | --- | --- |
| 1 | 1 | *Linked list* | C1 | `KUL-I-101`: penunjuk |
| 2 | 1 | Stack dan queue | C1 | 1, lalu `KUL-I-101`: larik |
| 3 | 2 | Pohon biner dan penelusuran | C1 | 2, lalu 1 |
| 4 | 2 | Pohon pencarian biner (BST); **kuis kumulatif 1** | C1 | 3, lalu 1 |
| 5 | 2 | Tinggi pohon, pencarian, pelepasan memori | C1 | 4, lalu 2 |
| 6 | 3 | Tabel hash | C1 | 5, lalu 3 |
| 7 | 3 | Tabrakan hash; **kuis kumulatif 2** | C1 | 6, lalu 4 |
| ujian tengah | | Ujian tertulis dan praktik, tanpa AI | C1 | |
| 8 | 3 | Heap | C1 | 7, lalu 5 |
| 9 | 4 | Graf: representasi | C1 | 8, lalu 6 |
| 10 | 4 | BFS | C1 | 9, lalu 7 |
| 11 | 4 | DFS; **kuis kumulatif 3** | C1 | 10, lalu 8 |
| 12 | 5 | Pengantar kompleksitas | C3 | 11, lalu 9 |
| 13 | 5 | Biaya operasi per struktur | C2, C3 | 12, lalu 10 |
| 14 | 5 | Memilih struktur; proyek; **kuis kumulatif akhir** | C2, C3 | 13, lalu 1 sampai 12 |
| ujian akhir | | Ujian tertulis dan praktik, tanpa AI | C1–C3 | |

## Ingat kembali

Tiap pertemuan dibuka kuis 5 menit **tanpa catatan**, 3 sampai 5 soal. Kolom
terakhir peta menunjukkan asal soalnya; jaraknya bertambah, dan pertemuan 1
dan 2 mengambil dari `KUL-I-101` yang sudah lewat. Contoh soal pertemuan 1:

1. Apa yang dilakukan `*p` dan apa yang dilakukan `&x`?
2. Mengapa `int f(int x)` yang mengubah `x` tidak mengubah variabel pemanggil?
3. Tulis kasus dasar dan langkah rekursif `fpb(a, b)`.
4. Apa akibatnya memakai memori sesudah `delete`?

Mengingat dengan usaha, bukan membaca ulang, yang membuat ingatan bertahan.

## Tujuan

Pada akhir semester kamu dapat (CPMK, silabus bagian 3.1):

- **C1** menerapkan list, stack, queue, pohon, tabel hash, heap, graf;
- **C2** memilih struktur data menurut kebutuhan;
- **C3** menganalisis biaya operasi.

## Bagian 1: Struktur linear (pertemuan 1 dan 2)

*Linked list* menyimpan elemen dalam simpul yang saling menunjuk, sehingga
menyisip di depan murah tetapi mengakses elemen ke-`k` mahal. **Stack**
mengambil elemen terakhir yang masuk (LIFO); **queue** mengambil yang pertama
masuk (FIFO).

### Prediksi dulu

Tanpa menjalankan, tulis keluaran program ini:

```cpp
#include <iostream>
#include <queue>
#include <stack>
using namespace std;

int main() {
    stack<int> s;
    queue<int> q;
    for (int i = 1; i <= 4; i++) {
        s.push(i);
        q.push(i);
    }
    s.pop();
    q.pop();
    cout << s.top() << ' ' << q.front() << ' ' << s.size() << ' ' << q.size() << '\n';
    return 0;
}
```

### Contoh terselesaikan

Simpul, penyisipan di depan, pembalikan, dan pelepasan memori:

```cpp
#include <iostream>
using namespace std;

struct Simpul {
    int nilai;
    Simpul *next;
};

Simpul *tambahDepan(Simpul *kepala, int v) {
    return new Simpul{v, kepala};
}

Simpul *balik(Simpul *kepala) {
    Simpul *prev = nullptr;
    while (kepala != nullptr) {
        Simpul *sesudah = kepala->next;
        kepala->next = prev;
        prev = kepala;
        kepala = sesudah;
    }
    return prev;
}

void cetak(const Simpul *k) {
    for (; k != nullptr; k = k->next) {
        cout << k->nilai << (k->next ? " -> " : "\n");
    }
}

void hapusSemua(Simpul *k) {
    while (k != nullptr) {
        Simpul *sesudah = k->next;
        delete k;
        k = sesudah;
    }
}

int main() {
    Simpul *kepala = nullptr;
    for (int v = 3; v >= 1; v--) {
        kepala = tambahDepan(kepala, v);
    }
    cetak(kepala);
    kepala = balik(kepala);
    cetak(kepala);
    hapusSemua(kepala);
    return 0;
}
// keluaran:
// 1 -> 2 -> 3
// 3 -> 2 -> 1
```

Tabel penelusuran `balik` pada 1 -> 2 -> 3 (nilai simpul yang ditunjuk):

| Putaran | `kepala` | `prev` sesudah putaran | Arah panah yang diubah |
| --- | --- | --- | --- |
| 1 | 1 | 1 | 1 menunjuk `nullptr` |
| 2 | 2 | 2 | 2 menunjuk 1 |
| 3 | 3 | 3 | 3 menunjuk 2 |

Simpan `sesudah` **sebelum** mengubah `kepala->next`; kalau tidak, sisa daftar
hilang. Setiap `new` dipasangkan dengan `delete` di `hapusSemua`.

Stack cocok untuk mengecek tanda kurung seimbang: setiap kurung buka
ditumpuk, setiap kurung tutup harus cocok dengan puncak.

```cpp
#include <iostream>
#include <stack>
#include <string>
using namespace std;

bool seimbang(const string &s) {
    stack<char> tumpukan;
    for (char c : s) {
        if (c == '(' || c == '[' || c == '{') {
            tumpukan.push(c);
        } else {
            if (tumpukan.empty()) {
                return false;
            }
            char buka = tumpukan.top();
            tumpukan.pop();
            if ((c == ')' && buka != '(') || (c == ']' && buka != '[') ||
                (c == '}' && buka != '{')) {
                return false;
            }
        }
    }
    return tumpukan.empty();
}

int main() {
    cout << seimbang("{[()]}") << seimbang("([)]") << seimbang("((") << '\n';
    return 0;
}
// keluaran:
// 100
```

### Contoh setengah jadi

Lengkapi fungsi yang menghitung panjang daftar:

```text
int panjang(const Simpul *k) {
    int n = 0;
    while (___) {
        n++;
        k = ___;
    }
    return n;
}
```

### Latihan

1. **Ubah:** ubah `seimbang` agar mengabaikan karakter selain kurung.
2. **Buat:** fungsi `Simpul *tambahBelakang(Simpul *kepala, int v)`; jelaskan
   mengapa ia lebih mahal daripada `tambahDepan` tanpa penunjuk ekor.
3. **Jelaskan:** apa beda stack dan queue pada urutan keluar elemen?
4. **Berpasangan (praktikum):** pengemudi mengetik, navigator menjelaskan
   dengan kata-kata, tukar peran tiap sekitar 10 menit; pasangan dibentuk acak
   per bagian dan tugas yang dinilai tetap perorangan.

## Bagian 2: Pohon (pertemuan 3 sampai 5)

**Pohon biner** adalah simpul dengan paling banyak dua anak. **Pohon pencarian
biner** (BST): semua nilai di anak kiri lebih kecil dari simpul, di anak kanan
lebih besar. Penelusuran *inorder* pada BST menghasilkan nilai terurut.

### Prediksi dulu

Gambarkan BST setelah menyisipkan 6, 2, 9, 1, 4, 8 (berurutan, mulai 6 sebagai
akar). Tulis urutan *inorder*, banyaknya simpul pada jalur terpanjang dari akar
ke daun, dan apakah 5 ada di pohon.

### Contoh terselesaikan

```cpp
#include <iostream>
using namespace std;

struct Pohon {
    int nilai;
    Pohon *kiri;
    Pohon *kanan;
};

Pohon *sisip(Pohon *p, int v) {
    if (p == nullptr) {
        return new Pohon{v, nullptr, nullptr};
    }
    if (v < p->nilai) {
        p->kiri = sisip(p->kiri, v);
    } else if (v > p->nilai) {
        p->kanan = sisip(p->kanan, v);
    }
    return p;
}

bool cari(const Pohon *p, int v) {
    if (p == nullptr) {
        return false;
    }
    if (v == p->nilai) {
        return true;
    }
    return v < p->nilai ? cari(p->kiri, v) : cari(p->kanan, v);
}

int tinggi(const Pohon *p) {
    if (p == nullptr) {
        return 0;
    }
    int a = tinggi(p->kiri);
    int b = tinggi(p->kanan);
    return 1 + (a > b ? a : b);
}

void inorder(const Pohon *p) {
    if (p == nullptr) {
        return;
    }
    inorder(p->kiri);
    cout << p->nilai << ' ';
    inorder(p->kanan);
}

void hapusPohon(Pohon *p) {
    if (p == nullptr) {
        return;
    }
    hapusPohon(p->kiri);
    hapusPohon(p->kanan);
    delete p;
}

int main() {
    Pohon *akar = nullptr;
    int data[6] = {6, 2, 9, 1, 4, 8};
    for (int v : data) {
        akar = sisip(akar, v);
    }
    inorder(akar);
    cout << '\n' << tinggi(akar) << ' ' << cari(akar, 4) << ' ' << cari(akar, 5) << '\n';
    hapusPohon(akar);
    return 0;
}
// keluaran:
// 1 2 4 6 8 9 
// 3 1 0
```

Kasus dasar rekursi selalu `p == nullptr`. `hapusPohon` menghapus anak
**sebelum** induk (urutan *postorder*); kalau induk dihapus lebih dulu, kamu
kehilangan penunjuk ke anak. Perhatikan: BST yang disisipi 1, 2, 3, 4, 5
berurutan menjadi satu rantai ke kanan sehingga tingginya 5 dan pencariannya
selinear daftar; itulah alasan adanya pohon seimbang (di luar mata kuliah ini
selain disebut).

### Contoh setengah jadi

Lengkapi fungsi yang menghitung banyak simpul:

```text
int banyak(const Pohon *p) {
    if (p == nullptr) {
        return ___;
    }
    return 1 + banyak(p->kiri) + ___;
}
```

### Latihan

1. **Ubah:** ubah `inorder` menjadi *preorder* (cetak simpul sebelum anak);
   prediksi keluarannya untuk pohon di atas lebih dulu.
2. **Buat:** fungsi `int terkecil(const Pohon *p)` yang mengikuti anak kiri.
3. **Telusuri:** gambarkan BST dari 5, 3, 8, 1, 4, 7 dan tulis *inorder*.
4. **Berpasangan:** satu menyusun urutan sisip yang menghasilkan pohon
   setinggi mungkin, satu menyusun yang serendah mungkin untuk tujuh nilai;
   bandingkan.

## Bagian 3: Tabel hash dan heap (pertemuan 6 sampai 8)

**Tabel hash** memetakan kunci ke nomor ember lewat fungsi hash; kunci yang
jatuh di ember sama disebut **tabrakan** (*collision*). Dengan *chaining*,
tiap ember menyimpan daftar. **Heap** (min-heap) adalah pohon biner lengkap
yang disimpan di larik, dengan induk tidak lebih besar dari anaknya; elemen
terkecil selalu di indeks 0.

### Prediksi dulu

Fungsi hash `k % 5`. Kunci 12, 7, 22, 5, 17 dimasukkan berurutan. Tulis isi
tiap ember dan berapa elemen di ember terpadat.

### Contoh terselesaikan

```cpp
#include <iostream>
#include <vector>
using namespace std;

struct TabelHash {
    vector<vector<int>> ember;
    explicit TabelHash(int m) : ember(m) {}
    int indeks(int k) const { return k % static_cast<int>(ember.size()); }
    void masuk(int k) { ember[indeks(k)].push_back(k); }
    bool ada(int k) const {
        for (int x : ember[indeks(k)]) {
            if (x == k) {
                return true;
            }
        }
        return false;
    }
};

int main() {
    TabelHash t(5);
    int kunci[5] = {12, 7, 22, 5, 17};
    for (int k : kunci) {
        t.masuk(k);
    }
    for (const auto &e : t.ember) {
        cout << e.size() << ' ';
    }
    cout << '\n' << t.ada(22) << ' ' << t.ada(3) << '\n';
    return 0;
}
// keluaran:
// 1 0 4 0 0 
// 1 0
```

Pada rata-rata, pencarian menyentuh satu ember kecil sehingga murah; pada
kasus terburuk semua kunci jatuh di ember sama dan pencarian selinear daftar.
Hash yang baik menyebar kunci; pada contoh ini kelima kunci terkumpul karena
`k % 5` bertemu kelipatan yang sama.

Heap dengan *sift-up* saat menyisip dan *sift-down* saat mengambil minimum:

```cpp
#include <iostream>
#include <utility>
#include <vector>
using namespace std;

struct MinHeap {
    vector<int> h;
    void masuk(int v) {
        h.push_back(v);
        int i = static_cast<int>(h.size()) - 1;
        while (i > 0 && h[(i - 1) / 2] > h[i]) {
            swap(h[(i - 1) / 2], h[i]);
            i = (i - 1) / 2;
        }
    }
    int ambilMin() {
        int hasil = h[0];
        h[0] = h.back();
        h.pop_back();
        int n = static_cast<int>(h.size());
        int i = 0;
        while (true) {
            int kecil = i;
            int kiri = 2 * i + 1;
            int kanan = 2 * i + 2;
            if (kiri < n && h[kiri] < h[kecil]) {
                kecil = kiri;
            }
            if (kanan < n && h[kanan] < h[kecil]) {
                kecil = kanan;
            }
            if (kecil == i) {
                break;
            }
            swap(h[i], h[kecil]);
            i = kecil;
        }
        return hasil;
    }
};

int main() {
    MinHeap m;
    int data[5] = {5, 3, 8, 1, 4};
    for (int v : data) {
        m.masuk(v);
    }
    for (int x : m.h) {
        cout << x << ' ';
    }
    cout << '\n';
    while (!m.h.empty()) {
        cout << m.ambilMin() << ' ';
    }
    cout << '\n';
    return 0;
}
// keluaran:
// 1 3 8 5 4 
// 1 3 4 5 8 
```

Penelusuran susunan larik: 5; 3 5 (3 naik); 3 5 8; 1 naik dua kali menjadi
1 3 8 5; 4 tinggal di bawah 3 sehingga 1 3 8 5 4. Larik bukan terurut penuh
(8 berada sebelum 5) tetapi memenuhi syarat induk-anak. Indeks anak dari
`i` adalah `2i + 1` dan `2i + 2`. Pustaka standar menyediakan
`std::priority_queue` dan `std::unordered_map` yang memakai ide ini; pahami
dulu cara kerjanya baru memakai pustakanya.

### Contoh setengah jadi

Lengkapi *sift-up*; ingat induk `i` ada di indeks `(i - 1) / 2`:

```text
int i = h.size() - 1;
while (i > 0 && h[___] > h[i]) {
    swap(h[___], h[i]);
    i = ___;
}
```

### Latihan

1. **Ubah:** ubah `MinHeap` menjadi max-heap dan prediksi susunan lariknya
   untuk data yang sama.
2. **Buat:** ubah `TabelHash` agar fungsi hash menjumlahkan kode karakter
   untuk kunci `string`.
3. **Jelaskan:** mengapa pencarian di tabel hash bisa jadi lambat walau
   ember banyak?
4. **Berpasangan:** tukar `TabelHash` dan **cari lima kunci** yang membuat
   semuanya jatuh di satu ember.

## Bagian 4: Graf dasar (pertemuan 9 sampai 11)

**Graf** terdiri atas simpul dan sisi. Daftar ketetanggaan
(`vector<vector<int>>`) menyimpan tetangga tiap simpul. **BFS** menjelajah
lapis demi lapis memakai queue dan memberi jarak terpendek dalam banyaknya
sisi pada graf tak berbobot; **DFS** menyelam sedalam mungkin memakai
rekursi atau stack.

### Prediksi dulu

Graf tak berarah, simpul 0 sampai 5, sisi: 0-1, 0-2, 1-3, 2-3, 3-4; simpul 5
sendirian. Tetangga ditulis berurutan menurut sisi yang dimasukkan. Tulis
urutan kunjungan BFS dari simpul 0 dan jarak tiap simpul dari 0 (gunakan
`-1` bila tak terjangkau).

### Contoh terselesaikan

```cpp
#include <iostream>
#include <queue>
#include <vector>
using namespace std;

vector<vector<int>> adj(6);

void sisi(int a, int b) {
    adj[a].push_back(b);
    adj[b].push_back(a);
}

void dfs(int u, vector<bool> &lihat) {
    lihat[u] = true;
    cout << u << ' ';
    for (int v : adj[u]) {
        if (!lihat[v]) {
            dfs(v, lihat);
        }
    }
}

int main() {
    sisi(0, 1);
    sisi(0, 2);
    sisi(1, 3);
    sisi(2, 3);
    sisi(3, 4);

    vector<int> jarak(6, -1);
    queue<int> q;
    jarak[0] = 0;
    q.push(0);
    while (!q.empty()) {
        int u = q.front();
        q.pop();
        for (int v : adj[u]) {
            if (jarak[v] == -1) {
                jarak[v] = jarak[u] + 1;
                q.push(v);
            }
        }
    }
    for (int d : jarak) {
        cout << d << ' ';
    }
    cout << '\n';

    vector<bool> lihat(6, false);
    int komponen = 0;
    for (int u = 0; u < 6; u++) {
        if (!lihat[u]) {
            komponen++;
            dfs(u, lihat);
            cout << "| ";
        }
    }
    cout << '\n' << komponen << '\n';
    return 0;
}
// keluaran:
// 0 1 1 2 3 -1 
// 0 1 3 2 4 | 5 | 
// 2
```

Alasan: `jarak[v] == -1` berfungsi ganda sebagai penanda "belum dikunjungi";
tanpa penanda itu graf berputar selamanya. BFS dari 0 mengunjungi 0, lalu 1 dan
2, lalu 3, lalu 4; jarak 3 ke simpul 4 karena jalur 0-1-3-4. DFS dari 0 masuk
dalam lewat 1 ke 3 lalu kembali ke 2 dan 4. Memanggil DFS dari tiap simpul yang
belum dikunjungi menghitung **komponen terhubung**: dua, yaitu {0,1,2,3,4}
dan {5}.

### Contoh setengah jadi

Lengkapi perulangan BFS yang menghitung banyak simpul terjangkau dari `s`:

```text
queue<int> q;
vector<bool> lihat(n, false);
lihat[s] = true;
q.push(s);
int terjangkau = 0;
while (!q.empty()) {
    int u = q.front();
    q.pop();
    terjangkau++;
    for (int v : adj[u]) {
        if (!lihat[___]) {
            lihat[___] = true;
            q.___(v);
        }
    }
}
```

### Latihan

1. **Ubah:** tambahkan sisi 4-5 dan prediksi keluaran BFS dan banyak komponen
   sebelum menjalankan.
2. **Buat:** fungsi yang menjawab apakah ada jalur dari `a` ke `b`.
3. **Jelaskan:** mengapa BFS memberi jarak terpendek tetapi DFS tidak?
4. **Berpasangan:** gambar graf tujuh simpul bersama, tulis urutan BFS dan DFS
   masing-masing, lalu bandingkan dan cari sebabnya bila berbeda.

## Bagian 5: Kompleksitas dan memilih struktur (pertemuan 12 sampai 14)

Biaya operasi diukur dari **banyaknya langkah** menurut ukuran masukan `n`,
dengan notasi O (hanya suku yang paling menentukan untuk `n` besar): `O(1)`
tetap, `O(log n)` setiap langkah membuang separuh, `O(n)` seimbang dengan `n`,
`O(n^2)` bila ada perulangan bersarang. Ini tahap pengenalan; analisis lebih
formal ada di `KUL-I-201`.

### Prediksi dulu

Larik terurut berisi 1 sampai 1000. Kamu mencari 777 dengan (a) pencarian linear
dari depan dan (b) pencarian biner yang membagi dua rentang. Tebak banyak
perbandingan masing-masing (urutan besaran saja) sebelum membaca contoh.

### Contoh terselesaikan

```cpp
#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> a;
    for (int i = 1; i <= 1000; i++) {
        a.push_back(i);
    }
    int target = 777;

    int linear = 0;
    for (int x : a) {
        linear++;
        if (x == target) {
            break;
        }
    }

    int biner = 0;
    int lo = 0;
    int hi = static_cast<int>(a.size()) - 1;
    while (lo <= hi) {
        int mid = (lo + hi) / 2;
        biner++;
        if (a[mid] == target) {
            break;
        }
        if (a[mid] < target) {
            lo = mid + 1;
        } else {
            hi = mid - 1;
        }
    }
    cout << linear << ' ' << biner << '\n';
    return 0;
}
// keluaran:
// 777 8
```

Pencarian biner butuh paling banyak sekitar `log2(1000)` (sekitar 10) langkah;
di sini 8. Pencarian linear 777 langkah. Tetapi pencarian biner **mensyaratkan
larik terurut**; mengurutkan dulu juga punya biaya. Tabel biaya operasi
(rata-rata kecuali dinyatakan; `n` elemen):

| Struktur | Akses menurut posisi | Cari nilai | Sisip | Catatan |
| --- | --- | --- | --- | --- |
| `vector` | `O(1)` | `O(n)` | `O(1)` di belakang (diamortisasi) | memori berurutan |
| *Linked list* | `O(n)` | `O(n)` | `O(1)` di depan | penunjuk tambahan |
| Stack, queue | hanya ujung | | `O(1)` | urutan terbatas |
| BST | | `O(log n)` bila seimbang, `O(n)` terburuk | idem | menjaga urut |
| Tabel hash | | `O(1)` rata-rata, `O(n)` terburuk | `O(1)` rata-rata | tanpa urutan |
| Min-heap | minimum `O(1)` | `O(n)` | `O(log n)` | ambil minimum `O(log n)` |

### Contoh setengah jadi (memilih struktur)

Pasangkan kebutuhan dengan struktur dan beri satu alasan:

```text
(a) antrian pesanan yang dilayani sesuai urutan datang       -> ___
(b) "apakah kode ini sudah pernah terpakai?" sangat sering   -> ___
(c) selalu ambil tugas dengan prioritas terkecil             -> ___
(d) menelusuri teman-teman dari teman (jaringan relasi)      -> ___
```

### Latihan

1. **Ubah:** ubah program pencarian untuk `n = 1000000` dan prediksi
   perbandingan binernya; jalankan dan bandingkan.
2. **Buat:** fungsi yang menghitung ada tidaknya duplikat dalam larik dengan
   dua cara: perulangan bersarang dan tabel hash; sebut biaya tiap cara.
3. **Jelaskan:** mengapa BST yang disisipi data terurut menjadi lambat?
4. **Berpasangan:** satu orang memilih struktur untuk skenario (b), satu
   orang menantang dengan masukan terburuk; ganti peran.

**Proyek kecil (pertemuan 13 dan 14).** Bangun daftar kontak sintetis
(nama rekaan, tanpa data nyata) dengan dua struktur berbeda untuk pencarian
dan bandingkan jumlah langkah pada 10, 1000, dan 100000 entri. Tidak ada
contoh terselesaikan: kamu bekerja dari spesifikasi. Sertakan riwayat Git
dengan sedikitnya empat *commit* dan empat uji `assert` termasuk kasus tepi.
Pertemuan 13 berpasangan, 14 mandiri dengan refleksi satu halaman.

## Latihan bercampur

Setelah bagian 2, 3, dan 4, kerjakan soal yang **tidak menyebut** struktur apa
yang perlu. Contoh: "Diberikan seribu pesan berprioritas, cetak sepuluh
terpenting." Kamu memutuskan memakai heap, urut penuh, atau struktur lain.
Kuis kumulatif (pertemuan 4, 7, 11, 14) berbentuk sama, dengan soal dari
semua struktur yang sudah dipelajari.

## Ulang berjarak

Kerjakan ulang tanpa melihat solusi lama:

- satu minggu setelah bagian: tulis ulang satu struktur (mis. `balik` atau
  `sisip`) dari ingatan;
- awal tiap bagian baru: dua soal dari bagian sebelumnya;
- minggu sebelum ujian: tiga soal yang dahulu salah;
- semester 3: tulis ulang BFS dan pencarian biner tanpa melihat; `KUL-I-201`
  memakai keduanya.

## Kebijakan AI dan log pemakaian

Mata kuliah ini **Kuning** (silabus bagian 6.3): AI boleh menjelaskan konsep,
**tidak** boleh menghasilkan solusi yang kamu serahkan, dan hanya setelah
gerbang kesiapan: kamu dapat (1) menelusuri program pendek, (2) menulis satu
uji yang gagal bila kode salah, (3) menjelaskan kode dengan kata sendiri;
gerbang ini ditandai sejak `KUL-I-101` dan diverifikasi ulang di pertemuan 1.
**Ujian praktik berlaku Merah**: tanpa AI. Bila memakai AI untuk menjelaskan,
catat di repositorimu sendiri: alat dan versi, tujuan, perintah, bagian
keluaran yang dipakai (log). Jangan memasukkan data pribadi, kata sandi, atau
kunci. Dosen dapat mewawancarai kamu tentang implementasimu dan memintamu
mengubahnya langsung. Dosen menetapkan tingkat per tugas.

## Kesalahan umum

- **Menghapus simpul sebelum menyimpan penunjuk berikutnya.** Simpan `next`
  dulu.
- **Lupa kasus `nullptr`.** Fungsi rekursif pohon dan daftar harus menangani
  `nullptr` dulu.
- **Tidak menandai simpul graf yang sudah dikunjungi.** Hasilnya berputar
  selamanya.
- **Mengira tabel hash selalu `O(1)`.** Itu rata-rata; tabrakan banyak merusaknya.
- **Mengira BST selalu seimbang.** Data terurut membuatnya selinear daftar.
- **Mengabaikan pelepasan memori.** `new` tanpa `delete` bocor.

## Cek mandiri

Tutup modul, jawab, baru periksa.

1. Tulis tabel penelusuran `balik` pada 4 -> 5 -> 6.
2. Jelaskan LIFO dan FIFO dengan satu contoh tiap-tiap.
3. Gambar BST dari 4, 2, 6, 1 dan tulis *inorder*-nya.
4. Mengapa BFS memakai queue dan DFS rekursif memakai stack panggilan?
5. Sebut tiga hal yang harus bisa kamu lakukan sebelum memakai AI pada tugas
   Kuning.

Daftar periksa (kosong; kamu isi sendiri, tidak dikumpulkan):

- [ ] Aku dapat menulis dan menelusuri operasi pada *linked list*.
- [ ] Aku dapat menyisip dan mencari di BST serta menjelaskan tingginya.
- [ ] Aku dapat menjelaskan tabrakan hash dan dampaknya.
- [ ] Aku dapat menulis BFS dan DFS dan menjelaskan perbedaannya.
- [ ] Aku dapat memilih struktur dan menyebut biayanya.

## Kunci dan petunjuk

- **Bagian 1:** prediksi `3 2 3 3`. `seimbang`: `1 0 0`. Setengah jadi:
  `k != nullptr`, `k->next`.
- **Bagian 2:** inorder `1 2 4 6 8 9`, tinggi 3 (jalur 6-2-4 atau 6-9-8), 5
  tidak ada. Setengah jadi: `0`, `banyak(p->kanan)`. Latihan 3: inorder
  `1 3 4 5 7 8`.
- **Bagian 3:** ember 0: 5; ember 1: kosong; ember 2: 12, 7, 22, 17; ember 3
  dan 4: kosong; ember terpadat 4 elemen. Setengah jadi: `(i - 1) / 2`,
  `(i - 1) / 2`, `(i - 1) / 2`.
- **Bagian 4:** BFS `0 1 2 3 4`, jarak `0 1 1 2 3 -1`. Setengah jadi: `v`, `v`,
  `push`.
- **Bagian 5:** linear 777, biner 8. Pilihan: (a) queue, (b) tabel hash, (c)
  min-heap, (d) graf dengan BFS.
- **Petunjuk bertahap bila macet:** (1) gambar struktur dengan kotak dan
  panah untuk masukan kecil; (2) telusuri tiap operasi pada gambar itu; (3)
  cari langkah tempat gambar dan kodemu mulai berbeda.

## Langkah berikutnya

`KUL-I-201` (Analisis dan Desain Algoritma) memakai BFS, pencarian biner, dan
analisis biaya modul ini. `KUL-I-202` (Basis Data) memakai ide indeks pohon dan
hash. `KUL-I-306` memakai graf dan pohon untuk adegan.

## Catatan untuk dosen

Bobot dan bentuk asesmen berikut **usulan**; prodi menetapkan (silabus 6.1,
6.2): tugas implementasi per bagian, wawancara kode singkat, ujian tertulis dan
praktik tanpa AI. Variasi tugas per mahasiswa: ganti jenis data (pesanan,
kontak, jadwal). Praktikum berpasangan dengan pasangan acak per bagian; jangan
menilai pasangan. Pohon seimbang (AVL, merah-hitam) tidak termasuk topik
corpus, hanya disebut. Penelusuran dengan gambar kotak dan panah sebelum
mengetik memberi manfaat besar pada pemula.
