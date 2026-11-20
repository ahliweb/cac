## Untuk siapa modul ini

Modul belajar untuk mata kuliah `KUL-I-201` (3 SKS, semester 3, jalur I), bagian
dari program `kuliah-coding`. Konten ini karangan menurut ADR-0007 dan disetujui pemilik program pada 2026-11-20 (keputusan lewat dialog; catatan tinjauan menjadi tindak lanjut revisi). Kode di modul ini adalah **C++17** (g++ 13.3, Linux): tiap blok `cpp`
dikompilasi dengan `-std=c++17 -Wall -Wextra` tanpa peringatan, dijalankan, dan
keluarannya cocok dengan yang tertulis. Blok berinfo `setengah-jadi` sengaja
berlubang dan tidak dijalankan.

Mahasiswa semester 3 informatika atau ilmu komputer yang sudah menempuh
`KUL-I-102` (BFS, pohon, pencarian biner) dan `KUL-I-103` (logika, induksi).
Satu mata kuliah, satu semester: 14 pertemuan, ujian tengah sesudah
pertemuan 7, ujian akhir sesudah pertemuan 14 `[asumsi]` (silabus 2.3). Kamu
butuh g++ (C++17), kertas untuk bukti, dan Git. Di semester 3 contoh
terselesaikan penuh hanya untuk konsep **baru**; sisanya setengah jadi.
Intinya: bukan hanya membuat program yang jalan, tetapi **meyakinkan** bahwa
ia benar dan cukup cepat.

## Peta semester

| Pertemuan | Bagian | Pokok bahasan | CPMK | Kuis pembuka (jarak) |
| --- | --- | --- | --- | --- |
| 1 | 1 | Menghitung langkah; notasi O | C2 | `KUL-I-102`: pencarian biner |
| 2 | 1 | Omega, Theta; membandingkan pertumbuhan | C2 | 1, lalu `KUL-I-102`: BST |
| 3 | 2 | Rekurens: panggilan berulang | C2 | 2, lalu `KUL-I-103`: induksi |
| 4 | 2 | Menyelesaikan rekurens; **kuis kumulatif 1** | C2 | 3, lalu 1 |
| 5 | 3 | Greedy: pemilihan kegiatan | C1 | 4, lalu 2 |
| 6 | 3 | Greedy: kapan gagal | C1, C2 | 5, lalu 3 |
| 7 | 3 | *Divide and conquer*; **kuis kumulatif 2** | C1 | 6, lalu 4 |
| ujian tengah | | Ujian tertulis dan praktik, tanpa AI | C1–C2 | |
| 8 | 4 | DP: sub-masalah tumpang tindih | C1 | 7, lalu 5 |
| 9 | 4 | DP: tabel, koin, ransel | C1 | 8, lalu 6 |
| 10 | 4 | DP: LCS; **kuis kumulatif 3** | C1 | 9, lalu 7 |
| 11 | 5 | Graf: BFS pada grid | C1, C2 | 10, lalu 8; `KUL-I-102`: BFS |
| 12 | 5 | Pencarian dan kebenarannya | C1, C2 | 11, lalu 9 |
| 13 | 6 | Verifikasi cepat, pencarian lambat | C3 | 12, lalu 10 |
| 14 | 6 | Mengenali masalah sulit; **kuis kumulatif akhir** | C3 | 13, lalu 1 sampai 12 |
| ujian akhir | | Ujian tertulis dan praktik, tanpa AI | C1–C3 | |

## Ingat kembali

Tiap pertemuan dibuka kuis 5 menit **tanpa catatan**, 3 sampai 5 soal. Kolom
terakhir peta menunjukkan asal soalnya, dengan jarak bertambah; pertemuan 1
sampai 3 mengambil dari `KUL-I-102` dan `KUL-I-103`. Contoh soal:

1. Mengapa pencarian biner mensyaratkan larik terurut, dan berapa langkahnya
   untuk 1000 elemen?
2. Sebut biaya pencarian BST seimbang dan terburuknya, dan data yang membuatnya
   terburuk.
3. Tulis BFS dengan queue dan penanda kunjungan; mengapa penanda itu perlu?
4. Tulis kerangka bukti induksi (pangkal dan langkah) untuk
   1 + 2 + ... + n = n(n+1)/2.

Mengingat dengan usaha, bukan membaca ulang, yang membuat ingatan bertahan.

## Tujuan

Pada akhir semester kamu dapat (CPMK, silabus bagian 3.1):

- **C1** merancang algoritma (greedy, *divide and conquer*, DP);
- **C2** menganalisis kebenaran dan kompleksitas;
- **C3** mengenali masalah sulit.

## Bagian 1: Notasi asimtotik (pertemuan 1 dan 2)

Waktu dalam detik bergantung pada mesin; **banyak langkah menurut ukuran
masukan `n`** tidak. `O(f(n))`: untuk `n` cukup besar langkahnya paling banyak
kelipatan tetap `f(n)`; `Omega(f(n))`: paling sedikit; `Theta(f(n))`: keduanya.
Hanya suku yang tumbuh paling cepat, tanpa pengali: `3n^2 + 5n + 7` adalah
`Theta(n^2)`.

### Prediksi dulu

Tulis tiga angka untuk `n = 10` tanpa menjalankan, lalu tebak besaran untuk
`n = 1000` (puluhan, ribuan, ratusan ribu, jutaan).

```cpp
#include <iostream>
using namespace std;

long long linear(int n) {
    long long c = 0;
    for (int i = 0; i < n; i++) c++;
    return c;
}

long long segitiga(int n) {
    long long c = 0;
    for (int i = 0; i < n; i++)
        for (int j = 0; j < i; j++) c++;
    return c;
}

long long logaritma(int n) {
    long long c = 0;
    for (int i = n; i > 1; i /= 2) c++;
    return c;
}

int main() {
    for (int n : {10, 100, 1000}) {
        cout << n << ": " << linear(n) << ' ' << segitiga(n) << ' ' << logaritma(n) << '\n';
    }
    return 0;
}
// keluaran:
// 10: 10 45 3
// 100: 100 4950 6
// 1000: 1000 499500 9
```

### Contoh terselesaikan

`linear` adalah `Theta(n)` (satu langkah per elemen). `segitiga` menghitung
`0 + 1 + ... + (n-1) = n(n-1)/2` (45 dan 4950; deret yang kamu buktikan dengan
induksi di `KUL-I-103`) dan tetap `Theta(n^2)` karena pembagi dua dan suku
`-n` hanya konstanta dan suku kecil. `logaritma` membuang separuh tiap
langkah: `Theta(log n)`. Mengubah `n` sepuluh kali lipat membuat pola kuadrat
seratus kali lipat, linear sepuluh kali, logaritma hanya bertambah tiga:
algoritma yang cukup cepat untuk 10 bisa tak terpakai untuk sejuta.

### Contoh setengah jadi

```cpp setengah-jadi
for (int i = 1; i <= n; i *= 2)
    for (int j = 0; j < n; j++) c++;
// luar berjalan ___ kali; dalam ___ kali tiap putaran; total Theta(___)
```

### Latihan

1. **Ubah:** tambahkan perulangan ketiga pada `segitiga`; prediksi
   pertumbuhannya lalu jalankan.
2. **Buat:** hitung langkah pencarian linear dan biner untuk `n = 10^6`
   (hanya menghitung) dan cetak rasionya.
3. **Jelaskan:** mengapa `Theta(n^2 + n)` ditulis `Theta(n^2)`?
4. **Berpasangan (praktikum):** pengemudi mengetik, navigator menjelaskan
   dengan kata-kata, tukar peran tiap sekitar 10 menit; pasangan dibentuk acak
   per bagian dan tugas yang dinilai tetap perorangan. Tugas: satu orang
   menulis tiga potongan perulangan, pasangan menentukan notasinya tanpa
   menjalankan.

## Bagian 2: Rekurens (pertemuan 3 dan 4)

**Rekurens** menyatakan biaya ukuran `n` lewat biaya ukuran lebih kecil:
`T(1) = 1`, `T(n) = 2T(n/2) + n` berarti "bagi dua, selesaikan dua kali,
gabung dengan `n` langkah". Dua cara menyelesaikannya: **mengurai** (buka
beberapa tingkat sampai pola terlihat) dan **induksi** (tebak, lalu buktikan).

### Prediksi dulu

Fibonacci naif memanggil dirinya dua kali; versi *memo* menyimpan hasil.
Tebak banyak panggilan untuk `n = 20` (puluhan, ribuan, puluhan ribu) pada
masing-masing. Lalu hitung `T(1), T(2), T(4)` untuk rekurens di atas dengan
tangan.

### Contoh terselesaikan

```cpp
#include <iostream>
#include <vector>
using namespace std;

long long panggilan = 0;

long long fibLambat(int n) {
    panggilan++;
    return n < 2 ? n : fibLambat(n - 1) + fibLambat(n - 2);
}

long long fibMemo(int n, vector<long long> &memo) {
    panggilan++;
    if (n < 2) return n;
    if (memo[n] == -1) memo[n] = fibMemo(n - 1, memo) + fibMemo(n - 2, memo);
    return memo[n];
}

int main() {
    cout << fibLambat(20) << ' ' << panggilan << '\n';
    panggilan = 0;
    vector<long long> memo(21, -1);
    cout << fibMemo(20, memo) << ' ' << panggilan << '\n';
    return 0;
}
// keluaran:
// 6765 21891
// 6765 39
```

Fibonacci naif memanggil 21891 kali karena sub-masalah yang sama dihitung
berulang; menyimpan hasil menurunkannya menjadi 39 (`2n - 1`). Untuk
`T`, uraikan: `T(n) = 2T(n/2) + n = 4T(n/4) + 2n = 8T(n/8) + 3n = ...`;
setelah `log2 n` tingkat, `T(n) = n + n log2 n`. Nilainya: 1, 4, 12, 32, 80,
... Buktikan tebakan itu untuk `n` pangkat dua dengan induksi:

- pangkal: `T(1) = 1 = 1*0 + 1`;
- langkah: andaikan `T(m) = m log2 m + m`; maka
  `T(2m) = 2T(m) + 2m = 2m log2 m + 4m = 2m (log2 m + 1) + 2m =
  2m log2 (2m) + 2m`.

Jadi `T(n) = Theta(n log n)`: pola *merge sort*.

### Contoh setengah jadi

Pencarian biner: satu perbandingan lalu separuh data, `T(n) = T(n/2) + 1`.

```text setengah-jadi
// T(n) = T(n/2) + 1 = T(n/4) + 2 = ... = T(1) + ___
// jadi T(n) = Theta(___); untuk n = 1000 sekitar ___ langkah
```

### Latihan

1. **Ubah:** ganti rekurens menjadi `T(n) = T(n/2) + n`; prediksi
   pertumbuhannya (masih `n log n`?).
2. **Buat:** tulis fungsi `T` dan cetak `T(1)` sampai `T(64)` untuk memeriksa
   rumusnya; lalu buktikan `T(n) = 2n - 1` untuk `T(n) = 2T(n/2) + 1`.
3. **Jelaskan:** mengapa fibonacci naif sekitar `1,6^n` panggilan dan versi
   memo `Theta(n)`?
4. **Berpasangan:** satu orang menguraikan `T(n) = 3T(n/3) + n` di kertas,
   satu orang memeriksanya dengan program.

## Bagian 3: Greedy dan *divide and conquer* (pertemuan 5 sampai 7)

**Greedy** memilih yang terbaik sekarang dan tak menyesal: cepat, tetapi
**benar hanya bila terbukti**. Pembuktian khas, *exchange argument*:
solusi optimal manapun dapat diubah memuat pilihan greedy tanpa menjadi
lebih buruk. ***Divide and conquer*** membagi masalah menjadi bagian sejenis
yang lebih kecil, menyelesaikannya, menggabungkan; biayanya rekurens bagian 2.

### Prediksi dulu

(a) Delapan kegiatan (mulai, selesai): (1,4), (3,5), (0,6), (5,7), (3,9),
(5,9), (6,10), (8,11). Dua kegiatan boleh dipilih bila yang satu mulai pada
atau sesudah yang lain selesai. Tebak jumlah terbanyak. (b) Koin 1, 3, 4,
uang 6: berapa koin paling sedikit, dan berapa bila selalu ambil koin
terbesar? (c) `3^20` dihitung dengan "kuadratkan separuh": tebak jumlah
perkalian (kira-kira 20 atau jauh lebih sedikit).

### Contoh terselesaikan

```cpp
#include <algorithm>
#include <iostream>
#include <utility>
#include <vector>
using namespace std;

int pilihKegiatan(vector<pair<int, int>> k) {
    sort(k.begin(), k.end(), [](const pair<int, int> &a, const pair<int, int> &b) {
        return a.second < b.second;
    });
    int terpilih = 0, akhir = -1;
    for (const auto &x : k) {
        if (x.first >= akhir) {
            terpilih++;
            akhir = x.second;
        }
    }
    return terpilih;
}

int koinGreedy(const vector<int> &koin, int uang) {
    int n = 0;
    for (int i = static_cast<int>(koin.size()) - 1; i >= 0; i--) {
        n += uang / koin[i];
        uang %= koin[i];
    }
    return n;
}

long long pangkat(long long a, int n, int &kali) {
    if (n == 0) return 1;
    long long h = pangkat(a, n / 2, kali);
    kali++;
    if (n % 2 == 0) return h * h;
    kali++;
    return h * h * a;
}

int main() {
    vector<pair<int, int>> kegiatan = {{1, 4}, {3, 5}, {0, 6}, {5, 7},
                                       {3, 9}, {5, 9}, {6, 10}, {8, 11}};
    cout << pilihKegiatan(kegiatan) << '\n';
    cout << koinGreedy({1, 3, 4}, 6) << '\n';
    int kali = 0;
    cout << pangkat(3, 20, kali) << ' ' << kali << '\n';
    return 0;
}
// keluaran:
// 3
// 3
// 3486784401 7
```

**Pemilihan kegiatan.** Urutkan menurut waktu selesai, ambil yang pertama,
lalu tiap yang mulai sesudah yang terakhir diambil: (1,4), (5,7), (8,11).
Benar menurut *exchange*: misalkan solusi optimal `O` dimulai dengan `x`
yang bukan selesai paling awal (`g`). Ganti `x` dengan `g`: `g` selesai tak
lebih lambat, tak ada tabrakan baru, jumlah tetap; jadi ada solusi optimal
memuat `g`, sisanya masalah serupa lebih kecil, dan induksi menyimpulkan
seluruhnya. Biaya `Theta(n log n)` (pengurutan).

**Koin.** Greedy memberi 3 koin (4 + 1 + 1), padahal 3 + 3 hanya 2. Satu
**contoh penyangkal** membuktikan strategi salah; satu contoh yang cocok
**tidak** membuktikannya benar. Greedy koin benar untuk 1, 5, 10, 25 tetapi
tidak untuk 1, 3, 4; bagian 4 memakai DP.

***Divide and conquer.*** `pangkat` memecah `a^n` menjadi `(a^(n/2))^2`
(dikali `a` bila `n` ganjil): `T(n) = T(n/2) + 1`, jadi `Theta(log n)`, hanya
7 perkalian untuk `3^20` dibanding 19 perkalian langsung. *Merge sort*
(bagian 2) membagi dua dan menggabungkan dengan `Theta(n)`, sehingga
`Theta(n log n)`. Kebenarannya bertumpu pada **invarian**: setelah kedua
setengah diurutkan, penggabungan selalu mengambil yang terkecil dari dua
kepala.

### Contoh setengah jadi

```cpp setengah-jadi
int cariBiner(const vector<int> &a, int lo, int hi, int t) {
    if (lo > hi) return ___;
    int mid = (lo + hi) / 2;
    if (a[mid] == t) return mid;
    if (a[mid] < t) return cariBiner(a, ___, hi, t);
    return cariBiner(a, lo, ___, t);
}
```

### Latihan

1. **Ubah:** urutkan kegiatan menurut waktu **mulai**; cari masukan yang
   menyangkalnya dan jalankan.
2. **Buat:** cari himpunan koin lain dan uang yang menyangkal greedy; tulis
   hitungannya. Lalu tulis *merge sort* dan hitung banyak pasangan terbalik
   dengan menambah `m - i` tiap elemen kanan lebih dulu diambil.
3. **Jelaskan:** apa beda "tak menemukan contoh penyangkal" dan "terbukti
   benar"?
4. **Berpasangan:** satu orang menjelaskan *exchange argument* kegiatan dengan
   kata sendiri, satu orang mencari celah (misalnya dua kegiatan selesai
   bersamaan).

## Bagian 4: Pemrograman dinamis (pertemuan 8 sampai 10)

**DP** dipakai bila ada **sub-masalah tumpang tindih** dan **substruktur
optimal**. Empat langkah: tentukan **keadaan**, tulis **rekurens**, tentukan
**kasus dasar**, tentukan **urutan pengisian** agar yang dibutuhkan sudah terisi.

### Prediksi dulu

Koin 1, 3, 4: koin minimum untuk 6 dan 10? Ransel 0/1 (tiap barang paling
banyak sekali), barang (berat, nilai) = (2,3), (3,4), (4,6), kapasitas 5:
nilai terbesar?

### Contoh terselesaikan

```cpp
#include <algorithm>
#include <iostream>
#include <vector>
using namespace std;

int koinDP(const vector<int> &koin, int uang) {
    vector<int> dp(uang + 1, 1000000);
    dp[0] = 0;
    for (int u = 1; u <= uang; u++)
        for (int c : koin)
            if (c <= u) dp[u] = min(dp[u], dp[u - c] + 1);
    return dp[uang];
}

int ransel(const vector<int> &berat, const vector<int> &nilai, int kapasitas) {
    vector<int> dp(kapasitas + 1, 0);
    for (size_t i = 0; i < berat.size(); i++)
        for (int w = kapasitas; w >= berat[i]; w--)
            dp[w] = max(dp[w], dp[w - berat[i]] + nilai[i]);
    return dp[kapasitas];
}

int main() {
    cout << koinDP({1, 3, 4}, 6) << ' ' << koinDP({1, 3, 4}, 10) << '\n';
    cout << ransel({2, 3, 4}, {3, 4, 6}, 5) << '\n';
    return 0;
}
// keluaran:
// 2 3
// 7
```

**Koin.** `dp[u]` = koin minimum untuk `u`; `dp[u] = 1 + min(dp[u - c])` untuk
`c <= u`; dasar `dp[0] = 0`; `u` naik karena `dp[u - c]` lebih kecil.
`dp[6] = 2` (3 + 3), yang tak ditemukan greedy; `dp[10] = 3` (3 + 3 + 4);
biaya `Theta(uang * banyak koin)`.

**Ransel 0/1.** `dp[w]` = nilai terbesar berkapasitas `w`. Kapasitas diulang
**menurun** agar `dp[w - berat[i]]` masih keadaan **sebelum** barang `i`
dipakai; bila menaik, barang terambil berkali-kali dan masalahnya menjadi
ransel tak terbatas. Hasil 7 (barang 2 dan 3, berat 5, nilai 3 + 4).

**LCS** (subsekuens persekutuan terpanjang) untuk dua teks `a` dan `b`:
`t[i][j]` = panjang LCS `i` karakter pertama `a` dan `j` karakter pertama
`b`; bila `a[i-1] == b[j-1]`, `t[i][j] = t[i-1][j-1] + 1`, bila tidak
`max(t[i-1][j], t[i][j-1])`; baris dan kolom 0 berisi 0; biaya
`Theta(|a| * |b|)`.

### Contoh setengah jadi

Tabel LCS untuk `ab` (baris) dan `ba` (kolom), baris dan kolom 0 berisi 0:

```text setengah-jadi
        ""  b  a
   ""    0  0  0
   a     0  ___ ___
   b     0  ___ ___
```

### Latihan

1. **Ubah:** ubah `koinDP` agar mencetak koin yang dipakai; prediksi hasil
   untuk 6 lebih dulu.
2. **Buat:** hitung banyak **cara** membayar `u` dengan koin 1, 3, 4 (urutan
   tak dihitung); tulis keadaan, rekurens, dan dasar sebelum mengetik. Lalu
   tulis LCS untuk `kancil` dan `pancing` (hasilnya 4).
3. **Jelaskan:** apa tanda masalah cocok untuk DP, dan apa bedanya dengan
   hanya menambah *memo* ke rekursi?
4. **Berpasangan:** satu orang menyusun rekurens di kertas, satu orang
   mengisi tabel dengan tangan untuk dua kata pendek; cocokkan dengan program.

## Bagian 5: Graf dan pencarian (pertemuan 11 dan 12)

Dari `KUL-I-102` kamu punya BFS. Kini BFS sebagai alat rancangan: peta grid
adalah graf (sel = simpul, sel bertetangga bukan dinding = sisi) dan BFS
memberi **jalur terpendek menurut banyak langkah** karena menjelajah lapis
demi lapis.

### Prediksi dulu

`S` mulai (kiri atas), `T` tujuan, `#` dinding; gerak empat arah, tiap langkah
berbiaya 1. Tebak langkah minimum `S` ke `T`.

```text
S.#.....
..#.###.
..#...#.
....#.#T
.####...
```

### Contoh terselesaikan

```cpp
#include <iostream>
#include <queue>
#include <string>
#include <utility>
#include <vector>
using namespace std;

int main() {
    vector<string> peta = {"S.#.....", "..#.###.", "..#...#.", "....#.#T", ".####..."};
    int baris = static_cast<int>(peta.size());
    int kolom = static_cast<int>(peta[0].size());
    vector<vector<int>> jarak(baris, vector<int>(kolom, -1));
    queue<pair<int, int>> q;
    jarak[0][0] = 0;
    q.push({0, 0});
    int dr[4] = {1, -1, 0, 0};
    int dc[4] = {0, 0, 1, -1};
    while (!q.empty()) {
        auto [r, c] = q.front();
        q.pop();
        for (int k = 0; k < 4; k++) {
            int nr = r + dr[k], nc = c + dc[k];
            if (nr < 0 || nr >= baris || nc < 0 || nc >= kolom) continue;
            if (peta[nr][nc] == '#' || jarak[nr][nc] != -1) continue;
            jarak[nr][nc] = jarak[r][c] + 1;
            q.push({nr, nc});
        }
    }
    cout << jarak[3][7] << '\n';
    return 0;
}
// keluaran:
// 14
```

Jalur terpendek 14: dari `S` turun tiga sel di kolom 0, ke kanan sampai
kolom 3 pada baris 3, naik satu sel, ke kanan sampai kolom 5, turun dua sel
ke baris 4, ke kanan sampai kolom 7, naik satu sel ke `T` (lewat atas 16).
Kebenaran BFS: antrean selalu berisi simpul berjarak `d` lalu `d + 1`
(invarian), jadi tiap simpul pertama kali ditemukan lewat jalur terpendek.
Biaya `Theta(V + E)`; memori sebesar lapisan terlebar. Untuk bobot sisi bukan
1, BFS **tidak** cukup.

### Contoh setengah jadi

```cpp setengah-jadi
// BFS yang hanya menjawab apakah T terjangkau
if (peta[r][c] == ___) return true;   // di dalam while
// ... setelah while: return ___;
```

### Latihan

1. **Ubah:** kurung `T` dengan dinding; prediksi `jarak[3][7]` (`-1`).
2. **Buat:** cetak jalur, bukan hanya panjangnya (simpan sel asal); tulis dulu
   keadaan tambahan yang perlu.
3. **Jelaskan:** mengapa BFS memberi jalur terpendek pada grid tanpa bobot,
   dan mengapa memakai memori besar pada grid lebar?
4. **Berpasangan:** satu orang membuat peta sepuluh baris, satu orang
   memprediksi jarak dengan tangan.

## Bagian 6: Kelas masalah (pertemuan 13 dan 14)

Sebagian masalah **sulit dipecahkan tetapi mudah diperiksa**. Masalah
keputusan (ya atau tidak) ada di **P** bila dijawab dalam waktu polinom
terhadap ukuran masukan; di **NP** bila ada **sertifikat** yang dapat
diperiksa dalam waktu polinom. Semua masalah di P juga di NP. Apakah P sama
dengan NP belum terselesaikan per 2026-11 menurut pengetahuan penyusun;
yang dilatih di sini adalah **mengenali** masalah yang diduga sulit dan
strategi menghadapinya.

### Prediksi dulu

Himpunan `{3, 34, 4, 12, 5, 2}`: ada subhimpunan berjumlah 9? Berjumlah 30?
Tebak berapa subhimpunan dicoba cara lugu untuk 6 elemen dan untuk 60.

### Contoh terselesaikan

```cpp
#include <iostream>
#include <vector>
using namespace std;

bool subsetBrute(const vector<int> &a, int target, long long &diperiksa) {
    int n = static_cast<int>(a.size());
    for (long long mask = 0; mask < (1LL << n); mask++) {
        diperiksa++;
        int jumlah = 0;
        for (int i = 0; i < n; i++)
            if (mask & (1LL << i)) jumlah += a[i];
        if (jumlah == target) return true;
    }
    return false;
}

bool verifikasi(const vector<int> &a, const vector<int> &indeks, int target) {
    int jumlah = 0;
    for (int i : indeks) jumlah += a[i];
    return jumlah == target;
}

int main() {
    vector<int> a = {3, 34, 4, 12, 5, 2};
    long long diperiksa = 0;
    cout << subsetBrute(a, 9, diperiksa) << ' ' << diperiksa << '\n';
    diperiksa = 0;
    cout << subsetBrute(a, 30, diperiksa) << ' ' << diperiksa << '\n';
    cout << verifikasi(a, {2, 4}, 9) << '\n';
    return 0;
}
// keluaran:
// 1 21
// 0 64
// 1
```

Jumlah 9 ada (4 dan 5) pada percobaan ke-21; 30 tidak ada setelah semua
`2^6 = 64` diperiksa. Untuk 60 elemen, `2^60` percobaan: mustahil.
`verifikasi` memeriksa **sertifikat** (indeks 2 dan 4, 4 + 5 = 9) dalam
langkah sebanyak panjangnya: memeriksa mudah, mencari sulit; itu ciri NP.
DP `bisa[s]` dengan `s` dari `target` turun ke `x` menjawab dalam
`Theta(n * target)`, tetapi itu **bukan** polinom terhadap ukuran masukan
(`target` berbit `b` bernilai hingga `2^b`): **pseudo-polinom**. Jumlah
subhimpunan diketahui **NP-lengkap**: sama sulitnya dengan seluruh NP;
algoritma polinom untuknya berarti P sama dengan NP.

Mengenali: masalah tampak seperti "pilih himpunan bagian dengan sifat
tertentu" dan greedy atau DP sederhana tak kunjung ketemu: curigai kelas
sulit, lalu batasi ukuran masukan, cari algoritma pseudo-polinom, pakai
pendekatan, atau cari kasus khusus mudah. **Bukti kesulitan** memerlukan
reduksi dari masalah NP-lengkap yang dikenal; kecurigaan bukan bukti.

### Contoh setengah jadi

```text setengah-jadi
// 1. "Memeriksa sertifikat subset sum ada di P": ___
// 2. "Algoritma polinom untuk subset sum sudah diketahui": ___
// 3. "Subset sum dengan target kecil dijawab cepat oleh DP": ___
```

### Latihan

1. **Ubah:** hentikan percabangan bila jumlah sudah melebihi `target` (semua
   bilangan positif) dan bandingkan `diperiksa`; apakah kelas masalahnya
   berubah?
2. **Buat:** verifikator sertifikat untuk "urutan simpul ini memuat semua
   simpul tepat satu kali dan tiap pasangan berurutan terhubung"; sebut
   biayanya.
3. **Jelaskan:** apa beda masalah yang dapat **diverifikasi** cepat dan yang
   dapat **dipecahkan** cepat?
4. **Berpasangan:** satu orang menyebut masalah sehari-hari yang tampak
   "pilih himpunan bagian", satu orang menulis sertifikat dan cara
   memeriksanya.

**Proyek rancangan (pertemuan 13 dan 14).** Pilih satu masalah dari daftar
dosen (jadwal, pengepakan, rute pendek). Tidak ada contoh terselesaikan: kamu
bekerja dari spesifikasi. Tulis rumusan dan masukan sintetis, dua rancangan,
argumen kebenaran dan hitungan langkah, ukuran masukan terjangkau, dan tanda
apakah masalahnya dicurigai sulit. Sertakan riwayat Git dengan sedikitnya
empat *commit* dan empat uji `assert` termasuk kasus tepi. Pertemuan 13
berpasangan, 14 mandiri dengan refleksi satu halaman.

## Latihan bercampur

Setelah bagian 3, 4, dan 5, kerjakan soal yang **tidak menyebut** tekniknya.
Contoh: "Diberikan sepuluh ribu pesanan berjam mulai dan selesai, ambil
sebanyak mungkin yang tak bertabrakan." Kamu memutuskan greedy, DP, atau
cara lain dan menulis alasannya. Kuis kumulatif (pertemuan 4, 7, 10, 14)
berbentuk sama, termasuk menyebut notasi biayanya.

## Ulang berjarak

Kerjakan ulang tanpa melihat solusi lama:

- satu minggu setelah bagian: tulis ulang satu algoritma (mis. `koinDP`,
  pemilihan kegiatan) dari ingatan dan tulis notasi biayanya;
- awal tiap bagian baru: dua soal dari bagian sebelumnya;
- minggu sebelum ujian: tiga soal yang dahulu salah;
- semester berikutnya: tulis ulang `ransel` dan alasan perulangan menurun;
  `KUL-K-301` dan `KUL-I-303` memakainya.

## Kebijakan AI dan log pemakaian

Silabus bagian 6.3 **belum menyatakan** tingkat AI mata kuliah ini. Modul
memakai usulan baku `[asumsi]` (Q2 rancangan): **Kuning** untuk tugas
pemrograman dan bukti, **Hijau** untuk proyek rancangan bagian 6, **Merah**
untuk ujian; dosen menetapkan per tugas. Pada Kuning, AI boleh menjelaskan
konsep dan mengusulkan contoh penyangkal, **tidak** boleh menghasilkan solusi
atau bukti yang kamu serahkan, dan hanya setelah gerbang kesiapan: kamu dapat
(1) menelusuri program pendek, (2) menulis satu uji yang gagal bila kode
salah, (3) menjelaskan kode atau bukti dengan kata sendiri. Bila memakai AI,
catat di repositorimu sendiri: alat dan versi, tujuan, perintah, bagian
keluaran yang dipakai (log). Jangan memasukkan data pribadi, kata sandi, atau
kunci. Dosen dapat mewawancarai kamu tentang algoritma dan buktimu.

## Kesalahan umum

- **Mengira satu contoh yang cocok membuktikan greedy.** Hanya contoh
  penyangkal yang tegas; pembenaran perlu bukti.
- **Mengira `O(n)` berarti `n` langkah tepat.** Notasi mengabaikan konstanta.
- **DP tanpa kasus dasar atau urutan pengisian salah.**
- **Ransel 0/1 dengan kapasitas menaik.** Barang terambil berkali-kali.
- **Menyamakan "tak ketemu algoritma cepat" dengan "mustahil".** Kesulitan
  perlu reduksi.
- **Mengira DP subset sum polinom.** Ia pseudo-polinom.

## Cek mandiri

Tutup modul, jawab, baru periksa.

1. Tulis `T(n)` untuk *merge sort* dan notasinya.
2. Beri contoh penyangkal greedy koin dan hitung hasil DP-nya.
3. Tulis rekurens LCS dan dua kasus dasarnya.
4. Mengapa kapasitas ransel 0/1 diulang menurun?
5. Apa itu sertifikat, dan mengapa mudah diperiksa belum berarti mudah dicari?
6. Sebut tiga hal yang harus bisa kamu lakukan sebelum memakai AI pada tugas
   Kuning.

Daftar periksa (kosong; kamu isi sendiri, tidak dikumpulkan):

- [ ] Aku dapat menghitung langkah dan menulis notasinya.
- [ ] Aku dapat menyelesaikan rekurens dan membuktikannya dengan induksi.
- [ ] Aku dapat memilih greedy, *divide and conquer*, atau DP dengan alasan.
- [ ] Aku dapat menulis keadaan, rekurens, dan kasus dasar DP.
- [ ] Aku dapat menyebut tanda masalah yang dicurigai sulit.

## Kunci dan petunjuk

- **Bagian 1:** `n = 10` memberi `10 45 3`. Setengah jadi: sekitar `log2 n`
  kali, `n` kali, `Theta(n log n)`.
- **Bagian 2:** naif 21891 panggilan, memo 39; `T(1), T(2), T(4)` = 1, 4, 12.
  Setengah jadi: `log2 n`, `Theta(log n)`, sekitar 10. Latihan 2:
  `T(2m) = 2(2m - 1) + 1 = 2(2m) - 1`.
- **Bagian 3:** kegiatan 3; koin greedy 3 (optimal 2); `3^20 = 3486784401`
  dengan 7 perkalian. Setengah jadi: `-1`, `mid + 1`, `mid - 1`.
- **Bagian 4:** koin 6 adalah 2, 10 adalah 3; ransel 7. Tabel LCS: baris `a`:
  0, 1; baris `b`: 1, 1.
- **Bagian 5:** 14. Setengah jadi: `'T'`, `false`.
- **Bagian 6:** 9 ada, 30 tidak; 64 subhimpunan untuk 6 elemen, `2^60` untuk
  60. Setengah jadi: ya; belum diketahui (tak ada algoritma polinom yang
  dikenal); ya.
- **Petunjuk bertahap bila macet:** (1) kerjakan contoh sangat kecil dengan
  tangan; (2) tulis rekurens atau invarian dalam satu kalimat sebelum kode;
  (3) cari langkah tempat tabelmu dan programmu mulai berbeda.

## Langkah berikutnya

`KUL-I-303` (Kecerdasan Buatan dan Pembelajaran Mesin) memakai pencarian dan
analisis biaya modul ini. `KUL-K-301` (Pemrograman Kompetitif II) memakai DP
dan graf lanjutan. `KUL-I-202` memakai gagasan indeks yang menurunkan biaya
pencarian dari `n` menjadi `log n`.

## Catatan untuk dosen

Bobot dan bentuk asesmen berikut **usulan**; prodi menetapkan (silabus 6.1,
6.2): tugas rancangan dengan argumen kebenaran ditulis tangan, kuis kumulatif,
wawancara kode singkat, ujian tertulis dan praktik tanpa AI. Variasi tugas per
mahasiswa: ganti jenis data (kegiatan, koin, peta). Praktikum berpasangan
dengan pasangan acak per bagian; jangan menilai pasangan. Dasar teori NP
dibatasi pengenalan (P, NP, sertifikat, subset sum); reduksi formal dan
algoritma jalur terpendek berbobot tidak termasuk topik corpus (lanjutan di
`KUL-K-301`).
