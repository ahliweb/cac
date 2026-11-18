## Untuk siapa modul ini

Modul ini untuk siswa SMA yang sudah menguasai dasar pemrograman C++17, rekursi, serta pencarian dan pengurutan, dan ingin belajar cara memilih strategi menyelesaikan soal. Isinya mengikuti rumpun materi "Strategi problem solving" pada silabus pembinaan: complete search dengan pruning, greedy, divide-and-conquer, dan dynamic programming.

Rumpun ini muncul pada banyak minggu silabus, sehingga modul ini disusun menurut strateginya, bukan menurut minggu. Pemetaannya:

| Minggu | Fokus pada silabus | Bagian modul |
| --- | --- | --- |
| 3 | Complexity dan constraint-driven selection | Memilih strategi dari batasan soal |
| 6 | Complete search dan pruning | Complete search dan pruning |
| 7 | Greedy fundamentals | Greedy |
| 13 sampai 16 | Dynamic programming I, II, sequence, dan integrasi | Dynamic programming |
| 8, 26, 27, 28 | Integrasi, OSN-P intensif, kontes campuran, kesiapan akhir | Strategi saat lomba |

Divide-and-conquer sebagai strategi dibahas pada bagiannya sendiri, dan melengkapi minggu 5 pada modul rekursi serta search dan sort.

Setelah mempelajari modul ini, kamu diharapkan bisa menolak solusi yang tidak layak sebelum menulis kode, merancang ruang pencarian dan memangkas cabang yang tidak perlu, membedakan kapan greedy valid dan kapan tidak, serta menjelaskan state, transisi, kasus dasar, dan kompleksitas dynamic programming sebelum coding.

Cara memakai: baca penjelasan, ketik ulang setiap contoh, telusuri dengan kertas untuk masukan kecil, lalu kerjakan latihan. Contoh kode di modul ini hanya diperiksa bisa dikompilasi (C++17); itu tidak membuktikan contoh benar untuk semua masukan, jadi tetap uji sendiri.

## Memilih strategi dari batasan soal

Sebelum menulis kode, perkirakan banyak operasi dari batasan soal. Sebagai acuan awal yang sangat kasar, banyak judge sanggup menjalankan sekitar 10^8 operasi sederhana per detik. Angka sebenarnya bergantung pada mesin, bahasa, dan batas waktu soal, jadi pakai hanya untuk menyaring pendekatan yang jelas tidak mungkin.

| Batas n | Kompleksitas yang biasanya masih layak | Pendekatan yang cocok |
| --- | --- | --- |
| sampai sekitar 10 | O(n!) (10! = 3.628.800) | enumerasi permutasi |
| sampai sekitar 20 | O(2^n) (2^20 = 1.048.576) | enumerasi himpunan bagian, backtracking |
| sampai sekitar 5.000 | O(n^2) (n^2 = 25.000.000) | DP dua dimensi, dua perulangan bersarang |
| sampai sekitar 100.000 | O(n log n) | pengurutan, binary search, greedy dengan pengurutan |
| sampai sekitar 1.000.000 | O(n) | satu kali lewat, prefix sum, DP linear |

Cara memakainya: baca batasan, hitung n (atau n^2, 2^n) untuk nilai terbesar, dan tolak pendekatan yang hasilnya jauh di atas 10^8. Sebuah solusi yang benar tetapi terlalu lambat hanya mendapat sebagian nilai. Perhatikan juga memori, dan tipe data: jumlah besar perlu `long long`.

## Complete search dan pruning

Complete search (brute force sistematis) mencoba semua kemungkinan dan memilih yang terbaik. Ini selalu benar bila ruang pencariannya kecil, dan sering menjadi solusi dasar untuk subtask. Dua alat utamanya adalah enumerasi (rekursi atau perulangan bersarang) dan pohon rekursi untuk membayangkan jumlah cabang.

Langkah merancangnya:

1. Tentukan apa yang dipilih pada tiap langkah dan berapa banyak langkah.
2. Hitung ukuran ruang pencarian dari pohon rekursinya, lalu cocokkan dengan batasan.
3. Tentukan syarat sah dan cara menghitung nilai solusi lengkap.

Contoh: ada n barang, tiap barang punya berat dan nilai. Pilih himpunan barang dengan total berat paling banyak W dan total nilai terbesar, untuk n kecil. Tiap barang dipakai atau tidak, jadi ada 2^n kemungkinan.

```cpp
#include <algorithm>
#include <iostream>
using namespace std;

int n, W;
int berat[20], nilai[20];
int terbaik = 0;

void cari(int i, int beratSekarang, int nilaiSekarang) {
    if (beratSekarang > W) {
        return;                                    // pruning: sudah melebihi kapasitas
    }
    if (i == n) {
        terbaik = max(terbaik, nilaiSekarang);
        return;
    }
    cari(i + 1, beratSekarang + berat[i], nilaiSekarang + nilai[i]);   // pakai barang i
    cari(i + 1, beratSekarang, nilaiSekarang);                          // lewati barang i
}

int main() {
    cin >> n >> W;
    for (int i = 0; i < n; i++) {
        cin >> berat[i] >> nilai[i];
    }
    cari(0, 0, 0);
    cout << terbaik << "\n";
    return 0;
}
```

Untuk masukan

```
4 10
5 10
4 40
6 30
3 50
```

keluarannya `90` (barang kedua dan keempat: berat 4 + 3 = 7, nilai 40 + 50 = 90).

Pruning adalah memangkas cabang yang pasti tidak berguna. Di atas, cabang yang beratnya sudah melebihi `W` dihentikan, karena menambah barang tidak akan membuatnya sah lagi (berat tidak negatif). Pruning yang benar tidak boleh membuang solusi optimal: untuk setiap pruning, tanyakan "apakah ada solusi lebih baik di cabang ini?". Bentuk pruning lain adalah menghentikan cabang yang bahkan dengan perkiraan paling optimistik tidak bisa mengalahkan jawaban terbaik yang sudah ada (sering disebut branch and bound). Pruning mengurangi kerja pada kebanyakan masukan, tetapi kasus terburuk tetap bisa eksponensial.

Complete search juga penting sebagai pembanding: pada kontes, tulis dulu brute force yang benar untuk n kecil, karena ia berguna untuk memeriksa solusi yang lebih cepat nanti (lihat bagian "Strategi saat lomba"). Teknik backtracking dasar (memilih, menelusuri, membatalkan) dijelaskan pada modul rekursi.

## Greedy

Greedy membangun solusi dengan memilih opsi yang tampak terbaik saat itu (greedy choice) dan tidak pernah menyesalinya. Kalau valid, hasilnya cepat dan sederhana, biasanya dengan memulai dari pengurutan. Masalahnya, greedy tidak selalu benar: kamu harus bisa menjelaskan mengapa pilihan itu aman, atau menemukan contoh tandingan (counterexample).

Contoh yang valid: memilih sebanyak mungkin kegiatan yang tidak tumpang tindih. Setiap kegiatan punya waktu mulai dan selesai, dan kegiatan yang selesai tepat saat kegiatan lain mulai tidak dianggap bertumpukan. Greedy choice: urutkan menurut waktu selesai, lalu pilih kegiatan yang mulainya tidak lebih awal dari waktu selesai kegiatan terakhir yang dipilih.

```cpp
#include <algorithm>
#include <iostream>
#include <utility>
#include <vector>
using namespace std;

int main() {
    vector<pair<int, int>> kegiatan;     // (selesai, mulai)
    int n;
    cin >> n;
    for (int i = 0; i < n; i++) {
        int mulai, selesai;
        cin >> mulai >> selesai;
        kegiatan.push_back({selesai, mulai});
    }
    sort(kegiatan.begin(), kegiatan.end());

    int banyak = 0;
    int terakhir = -1;                   // waktu selesai kegiatan terakhir yang dipilih
    for (auto [selesai, mulai] : kegiatan) {
        if (mulai >= terakhir) {
            banyak++;
            terakhir = selesai;
        }
    }
    cout << banyak << "\n";
    return 0;
}
```

Untuk enam kegiatan (1,4), (2,3), (3,5), (4,6), (6,8), (5,9), keluarannya `3`: setelah diurutkan menurut waktu selesai, terpilih (2,3), (3,5), dan (6,8). Program ini mengasumsikan waktu mulai tidak negatif.

Mengapa benar (exchange argument sederhana): ambil solusi optimal mana pun. Kegiatan pertamanya selesai tidak lebih awal dari kegiatan yang selesainya paling awal secara keseluruhan. Gantilah kegiatan pertama itu dengan kegiatan yang selesai paling awal; kegiatan lain dalam solusi tetap tidak bertumpuk, jadi jumlahnya tidak berkurang. Jadi ada solusi optimal yang memuat pilihan greedy, lalu argumen yang sama berlaku untuk sisa masalahnya. Kamu perlu melatih diri menulis sketsa bukti seperti ini untuk setiap greedy yang kamu pakai.

Contoh yang gagal: menukar uang dengan koin paling sedikit. Untuk koin 1, 5, 10, dan 25, mengambil koin terbesar yang masih muat memberi jawaban optimal (misalnya 41 = 25 + 10 + 5 + 1, empat koin). Tetapi untuk koin 1, 3, dan 4 dengan target 6, greedy mengambil 4 + 1 + 1 (tiga koin), sedangkan 3 + 3 (dua koin) lebih baik. Satu contoh tandingan sudah cukup untuk menolak sebuah greedy. Untuk kasus seperti ini, gunakan dynamic programming.

Pedoman: coba greedy, cari contoh tandingan pada kasus kecil (bandingkan dengan complete search), dan hanya percaya greedy bila kamu punya alasan atau sketsa bukti.

## Divide-and-conquer

Divide-and-conquer memecah masalah menjadi submasalah lebih kecil dengan bentuk sama, menyelesaikan secara rekursif, lalu menggabungkan hasil (bagi, selesaikan, gabungkan). Merge sort adalah contoh utamanya (lihat modul search dan sort). Contoh lain: jumlah terbesar dari subarray yang berurutan (tidak boleh kosong). Jawaban ada di separuh kiri, separuh kanan, atau melintasi titik tengah.

```cpp
#include <algorithm>
#include <iostream>
#include <vector>
using namespace std;

long long terbesar(const vector<int>& a, int l, int r) {
    if (l == r) {
        return a[l];
    }
    int m = l + (r - l) / 2;
    long long kiri = terbesar(a, l, m);
    long long kanan = terbesar(a, m + 1, r);

    // subarray yang melintasi titik tengah: perluas ke kiri dan ke kanan dari tengah
    long long jumlah = 0, terbaikKiri = a[m];
    for (int i = m; i >= l; i--) {
        jumlah += a[i];
        terbaikKiri = max(terbaikKiri, jumlah);
    }
    jumlah = 0;
    long long terbaikKanan = a[m + 1];
    for (int i = m + 1; i <= r; i++) {
        jumlah += a[i];
        terbaikKanan = max(terbaikKanan, jumlah);
    }
    return max({kiri, kanan, terbaikKiri + terbaikKanan});
}

int main() {
    vector<int> a = {-2, 1, -3, 4, -1, 2, 1, -5, 4};
    cout << terbesar(a, 0, (int)a.size() - 1) << "\n";   // 6
    return 0;
}
```

Subarray terbaiknya adalah 4, -1, 2, 1 dengan jumlah 6. Waktunya O(n log n): ada sekitar log2(n) tingkat dan tiap tingkat melakukan kerja O(n) pada langkah gabung. (Soal ini juga bisa diselesaikan lebih sederhana dalam O(n) dengan DP satu dimensi; itu bukan alasan untuk melewatkan pola bagi-selesaikan-gabung.)

## Dynamic programming

Dynamic programming (DP) dipakai bila masalah dapat dipecah menjadi submasalah yang tumpang tindih dan jawaban optimal tersusun dari jawaban submasalah. Tiap submasalah dihitung sekali lalu disimpan. Kerangka merancang DP, yang sebaiknya kamu tulis sebelum coding:

1. State: apa saja parameter yang menentukan sebuah submasalah, dan apa arti `dp[state]` dengan kalimat yang jelas.
2. Transisi: bagaimana `dp[state]` dihitung dari state yang lebih kecil.
3. Kasus dasar: state terkecil yang nilainya langsung diketahui.
4. Urutan: state mana dihitung lebih dulu, dan di mana jawaban akhirnya.
5. Kompleksitas: (banyak state) x (kerja per transisi), dan memorinya.

### Memoization dan tabulation

Ada dua cara menulis DP. Memoization adalah rekursi yang menyimpan hasil (top-down). Tabulation mengisi tabel dari state kecil ke besar dengan perulangan (bottom-up). Keduanya menurunkan Fibonacci dari eksponensial menjadi O(n).

```cpp
#include <iostream>
using namespace std;

long long memo[91];
bool sudah[91];

long long fib(int n) {
    if (n <= 1) {
        return n;                          // kasus dasar
    }
    if (sudah[n]) {
        return memo[n];                    // sudah pernah dihitung
    }
    sudah[n] = true;
    memo[n] = fib(n - 1) + fib(n - 2);
    return memo[n];
}

int main() {
    cout << fib(50) << "\n";               // 12586269025
    return 0;
}
```

Versi tabulation:

```cpp
#include <iostream>
using namespace std;

int main() {
    long long dp[91];
    dp[0] = 0;
    dp[1] = 1;
    for (int i = 2; i <= 50; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }
    cout << dp[50] << "\n";                // 12586269025
    return 0;
}
```

Nilai fib(90) masih muat dalam `long long`, tetapi fib(93) tidak; periksa batasnya.

### Coin change dan rekonstruksi

Masalah: dengan koin 1, 3, 4, berapa koin paling sedikit untuk menyusun nilai 6? Greedy gagal (lihat di atas), DP benar.

- State: `dp[v]` = banyak koin paling sedikit untuk nilai `v`.
- Transisi: `dp[v] = min(dp[v - c] + 1)` untuk semua koin `c <= v` dengan `dp[v - c]` terjangkau.
- Kasus dasar: `dp[0] = 0`. Nilai yang tidak terjangkau diberi tanda khusus (di sini angka sangat besar).
- Kompleksitas: O(V x banyak jenis koin).

Untuk merekonstruksi koin yang dipakai, simpan koin yang dipilih pada tiap state lalu telusuri mundur.

```cpp
#include <algorithm>
#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> koin = {1, 3, 4};
    int V = 6;
    const int TAK_TERJANGKAU = 1000000000;

    vector<int> dp(V + 1, TAK_TERJANGKAU);
    vector<int> pilih(V + 1, 0);
    dp[0] = 0;
    for (int v = 1; v <= V; v++) {
        for (int c : koin) {
            if (c <= v && dp[v - c] != TAK_TERJANGKAU && dp[v - c] + 1 < dp[v]) {
                dp[v] = dp[v - c] + 1;
                pilih[v] = c;
            }
        }
    }

    if (dp[V] == TAK_TERJANGKAU) {
        cout << -1 << "\n";
        return 0;
    }
    cout << dp[V] << "\n";                 // 2
    for (int v = V; v > 0; v -= pilih[v]) {
        cout << pilih[v] << " ";           // 3 3
    }
    cout << "\n";
    return 0;
}
```

### Knapsack 0/1 dan optimasi memori

Setiap barang boleh dipakai paling banyak sekali. Dengan n barang dan kapasitas W, kita bisa menyelesaikannya dalam O(n x W), jauh lebih baik daripada 2^n bila W kecil. State: `dp[i][w]` = nilai terbesar memakai i barang pertama dengan kapasitas w. Karena `dp[i]` hanya bergantung pada `dp[i-1]`, tabelnya bisa diperkecil menjadi satu dimensi (optimasi memori), asalkan kapasitas dilewati dari besar ke kecil agar sebuah barang tidak terpakai dua kali.

```cpp
#include <algorithm>
#include <iostream>
#include <vector>
using namespace std;

int main() {
    int berat[4] = {5, 4, 6, 3};
    int nilai[4] = {10, 40, 30, 50};
    int W = 10;

    vector<int> dp(W + 1, 0);              // dp[w]: nilai terbesar dengan kapasitas w
    for (int i = 0; i < 4; i++) {
        for (int w = W; w >= berat[i]; w--) {     // dari besar ke kecil
            dp[w] = max(dp[w], dp[w - berat[i]] + nilai[i]);
        }
    }
    cout << dp[W] << "\n";                 // 90
    return 0;
}
```

Jika perulangan `w` dibalik menjadi dari kecil ke besar, barang yang sama bisa dipakai berkali-kali; itu menyelesaikan masalah lain (barang tak terbatas).

### DP pada grid

Banyak jalur dari pojok kiri atas ke pojok kanan bawah pada grid, hanya boleh bergerak ke kanan atau ke bawah, dengan sel terhalang (`#`) tidak boleh dilewati.

- State: `dp[i][j]` = banyak jalur ke sel (i, j).
- Transisi: `dp[i][j] = dp[i-1][j] + dp[i][j-1]` bila sel bebas, dan 0 bila terhalang.
- Kasus dasar: `dp[0][0] = 1` bila sel itu bebas.

```cpp
#include <iostream>
#include <string>
#include <vector>
using namespace std;

int main() {
    vector<string> grid = {
        "...",
        ".#.",
        "...",
    };
    int n = (int)grid.size();
    int m = (int)grid[0].size();

    vector<vector<long long>> dp(n, vector<long long>(m, 0));
    if (grid[0][0] == '.') {
        dp[0][0] = 1;
    }
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < m; j++) {
            if (grid[i][j] == '#' || (i == 0 && j == 0)) {
                continue;
            }
            if (i > 0) {
                dp[i][j] += dp[i - 1][j];
            }
            if (j > 0) {
                dp[i][j] += dp[i][j - 1];
            }
        }
    }
    cout << dp[n - 1][m - 1] << "\n";      // 2
    return 0;
}
```

### Barisan: LIS dan LCS

Barisan menaik terpanjang (LIS, longest increasing subsequence) mencari subbarisan (boleh melompati elemen, urutan dijaga) yang menaik tegas dengan panjang terbesar. Dengan `dp[i]` = panjang LIS yang berakhir di indeks i, transisinya `dp[i] = 1 + max(dp[j])` untuk `j < i` dengan `a[j] < a[i]`. Waktunya O(n^2).

```cpp
#include <algorithm>
#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> a = {3, 1, 4, 1, 5, 9, 2, 6};
    int n = (int)a.size();
    vector<int> dp(n, 1);
    int terbaik = 0;
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < i; j++) {
            if (a[j] < a[i]) {
                dp[i] = max(dp[i], dp[j] + 1);
            }
        }
        terbaik = max(terbaik, dp[i]);
    }
    cout << terbaik << "\n";               // 4
    return 0;
}
```

Ada formulasi lain yang O(n log n): simpan, untuk tiap panjang, nilai ujung terkecil dari suatu subbarisan menaik dengan panjang itu, lalu perbarui dengan binary search.

```cpp
#include <algorithm>
#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> a = {3, 1, 4, 1, 5, 9, 2, 6};
    vector<int> ujung;                     // ujung[k]: ujung terkecil subbarisan menaik panjang k+1
    for (int x : a) {
        auto it = lower_bound(ujung.begin(), ujung.end(), x);
        if (it == ujung.end()) {
            ujung.push_back(x);
        } else {
            *it = x;
        }
    }
    cout << ujung.size() << "\n";          // 4
    return 0;
}
```

Perhatikan bahwa isi `ujung` bukan subbarisan yang sebenarnya, hanya panjangnya yang benar. Membandingkan dua formulasi seperti ini (O(n^2) yang sederhana dan O(n log n) yang lebih cepat) adalah bagian dari berpikir tentang trade-off: pilih sesuai batasan n. LCS (longest common subsequence) mirip, dengan state dua indeks: `dp[i][j]` untuk awalan sepanjang i dan j dari dua string, dan transisi bergantung pada apakah karakter terakhirnya sama.

### Memeriksa kebenaran dan men-debug DP

- Tuliskan arti `dp[state]` dalam satu kalimat. Banyak kesalahan berasal dari arti yang berubah-ubah.
- Periksa kasus dasar dan indeks batas (indeks negatif, indeks melewati ukuran tabel).
- Periksa urutan pengisian: state yang dibutuhkan harus sudah dihitung.
- Bandingkan hasil dengan complete search pada masukan kecil.
- Untuk state yang tidak mungkin, gunakan nilai tanda yang tidak ikut terhitung (jangan sampai `tak terjangkau + 1` menjadi seolah-olah jawaban).
- Cek ukuran jawaban terhadap tipe data (`long long`).

Untuk DP yang state-nya berupa himpunan kecil (bitmask) atau interval, mulai dengan kasus yang sudah dipahami lebih dulu; topik itu menyentuh logika bitwise dan hanya dikenalkan bila kamu sudah siap.

## Strategi saat lomba

Pada minggu-minggu integrasi dan simulasi kontes, kemampuan memilih strategi menjadi bagian dari strategi lomba:

- Baca seluruh soal dan batasan lebih dulu, lalu urutkan dari yang paling mudah. Kerjakan yang paling pasti dulu.
- Soal sering punya subtask dengan batasan lebih kecil. Complete search untuk subtask kecil mengamankan nilai sebagian; setelah itu tingkatkan ke solusi penuh.
- Simpan brute force yang benar sebagai pembanding (baseline). Buat generator masukan kecil acak, jalankan dua program pada banyak masukan, dan bandingkan keluarannya (stress testing). Satu masukan yang berbeda menunjukkan kesalahan sekaligus contoh untuk dilacak.
- Soal simulasi cukup dikerjakan seperti yang tertulis; teknik pendukung seperti prefix sum dan two pointers sering mengubah O(n^2) menjadi O(n).
- Alokasikan waktu: jangan menghabiskan seluruh waktu pada satu soal. Setelah beberapa soal diselesaikan, kembali ke soal yang tertinggal.
- Setelah lomba, lakukan postmortem: mengapa gagal, strategi apa yang kurang, dan apa yang dilatih berikutnya. Perbaiki kelemahan topik dengan mengerjakan ulang soal yang pernah gagal.

## Kesalahan umum

- Memilih greedy tanpa alasan atau contoh tandingan.
- Memangkas cabang (pruning) yang ternyata membuang solusi optimal.
- Mengabaikan batasan sehingga memilih pendekatan yang jauh terlalu lambat.
- DP tanpa arti state yang jelas, atau transisi yang menyentuh state yang belum dihitung.
- Salah kasus dasar atau salah indeks batas pada tabel DP.
- Pada knapsack satu dimensi: arah perulangan kapasitas terbalik.
- Overflow, atau memakai nilai "tak terhingga" yang bisa ikut dijumlahkan dan menjadi jawaban palsu.
- Memanggil rekursi yang menghitung ulang submasalah yang sama tanpa memoization.
- Tidak menguji dengan kasus ujung (n terkecil, nilai terbesar) dan tidak membandingkan dengan brute force.

## Latihan

Latihan di bawah dibuat khusus untuk modul ini. Kerjakan di komputer, lalu bandingkan dengan contoh masukan dan keluaran.

### Latihan 1: Contoh tandingan greedy

Untuk koin bernilai 1, 3, dan 4 serta target 10, tentukan dengan tangan banyak koin yang dipakai greedy (selalu ambil koin terbesar yang masih muat) dan banyak koin minimum sebenarnya. Tulis susunan koin untuk masing-masing. Lalu tulis program DP coin change dan periksa jawabanmu.

### Latihan 2: Penjadwalan kegiatan

Masukan: baris pertama `N` (1 <= N <= 100.000); lalu `N` baris berisi dua bilangan bulat `mulai` dan `selesai` (0 <= mulai < selesai <= 1.000.000.000). Cetak banyak kegiatan terbanyak yang bisa dipilih tanpa bertumpukan (kegiatan yang selesai tepat saat kegiatan lain mulai boleh dipilih bersama).

Contoh masukan:
```
5
1 3
2 5
3 6
5 7
6 9
```
Contoh keluaran: `3`

Petunjuk: urutkan menurut waktu selesai. Tulis sketsa singkat mengapa urutan menurut waktu mulai tidak cukup (cari contoh tandingan).

### Latihan 3: Menaiki tangga

Masukan: satu bilangan bulat `N` (1 <= N <= 80). Kamu menaiki tangga dengan `N` anak tangga; tiap langkah boleh naik 1 atau 2 anak tangga. Cetak banyak urutan langkah berbeda untuk mencapai anak tangga ke-N.

Contoh masukan: `5`
Contoh keluaran: `8`

Petunjuk: tulis state dan transisinya lebih dulu. Untuk `N = 80` hasilnya masih muat dalam `long long`.

### Latihan 4: Knapsack

Masukan: baris pertama `N` dan `W` (1 <= N <= 100, 1 <= W <= 10.000); lalu `N` baris berisi `berat` dan `nilai` (1 <= berat <= W, 1 <= nilai <= 1000). Cetak nilai total terbesar dengan total berat paling banyak `W`, setiap barang dipakai paling banyak sekali.

Contoh masukan:
```
4 5
2 3
3 4
4 5
5 6
```
Contoh keluaran: `7`

Penjelasan contoh: pilih barang berat 2 (nilai 3) dan berat 3 (nilai 4). Barang berat 5 saja hanya bernilai 6.

Petunjuk: pakai tabel satu dimensi dengan kapasitas dari besar ke kecil.

### Latihan 5: Jalur pada grid

Masukan: baris pertama `N` dan `M` (1 <= N, M <= 30); lalu `N` baris string sepanjang `M` berisi `.` (sel bebas) atau `#` (sel terhalang). Mulai dari sel kiri atas, dengan hanya bergerak ke kanan atau ke bawah, cetak banyak jalur ke sel kanan bawah. Cetak `0` bila sel awal terhalang atau tidak ada jalur.

Contoh masukan:
```
3 3
...
.#.
...
```
Contoh keluaran: `2`

Petunjuk: pada grid kosong 30 x 30 jawabannya sekitar 3 x 10^16, masih muat dalam `long long`. Pikirkan baris dan kolom pertama.

### Latihan 6: Barisan menaik terpanjang

Masukan: baris pertama `N` (1 <= N <= 5000), baris kedua `N` bilangan bulat. Cetak panjang subbarisan menaik tegas terpanjang.

Contoh masukan:
```
8
3 1 4 1 5 9 2 6
```
Contoh keluaran: `4`

Penjelasan contoh: salah satu subbarisan terpanjang adalah 1, 4, 5, 9.

Petunjuk: bagaimana jika `N` sampai 100.000? Pendekatan mana yang masih layak?

### Latihan 7: Pilih pendekatan dari batasan

Untuk tiap situasi berikut, tentukan kompleksitas tertinggi yang masih layak dan sebutkan satu pendekatan yang cocok (tanpa menulis kode), lalu jelaskan alasannya:

1. Pilih himpunan bagian dari `n = 18` bilangan sehingga jumlahnya mendekati sebuah target.
2. Urutkan `n = 100.000` kegiatan dan pilih sebanyak mungkin yang tidak bertumpukan.
3. Hitung banyak cara mencapai sebuah nilai dengan `n = 2.000` jenis langkah dan nilai sampai 2.000.
4. Cari bilangan terkecil yang memenuhi syarat monoton pada rentang sampai 10^18.

## Cek mandiri

Setelah selesai, pastikan kamu bisa menjawab tanpa melihat catatan:

- Bagaimana memperkirakan apakah sebuah pendekatan cukup cepat dari batasan soal?
- Apa itu pruning dan bagaimana memastikan pruning tidak membuang solusi optimal?
- Apa yang membuat greedy valid, dan bagaimana menolaknya dengan contoh tandingan?
- Apa tiga langkah divide-and-conquer, dan apa bedanya dengan DP?
- Apa saja yang harus kamu tulis sebelum menulis DP (state, transisi, kasus dasar, urutan, kompleksitas)?
- Apa beda memoization dan tabulation?
- Mengapa knapsack satu dimensi mengisi kapasitas dari besar ke kecil?
- Apa gunanya brute force yang benar saat lomba?

## Langkah berikutnya

Lanjutkan dengan berlatih memilih strategi pada soal campuran: kerjakan dulu dengan complete search untuk batasan kecil, lalu tingkatkan. Teknik pendukung seperti prefix sum dan struktur data dibahas pada topik terkait di silabus. Untuk cakupan resmi dan silabus terbaru, rujuk halaman silabus OSN di bagian Rujukan. Untuk soal latihan tambahan, pilih soal dari arsip resmi lalu kerjakan sendiri; jangan menyalin soal ke dalam modul ini.
