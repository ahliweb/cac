## Untuk siapa modul ini

Modul ini untuk siswa SMA yang sudah menguasai dasar pemrograman C++17 (variabel, perulangan, fungsi, array) dan ingin belajar pencarian dan pengurutan. Isinya mengikuti rumpun materi "Search & sort" pada silabus pembinaan: linear search dan binary search, bubble sort dan insertion sort, serta merge sort, quicksort, dan heap sort. Topik ini muncul pada minggu 4 (search dan sort dasar) dan minggu 5 (sorting lanjut dan divide-and-conquer). Minggu 4 juga menyebut prefix sum sebagai pendukung, jadi ada bagian singkat tentangnya di akhir penjelasan.

Setelah mempelajari modul ini, kamu diharapkan bisa memilih cara mencari dan mengurutkan yang sesuai dengan batasan soal, menjelaskan invarian sederhana pada binary search, dan membandingkan kompleksitas serta trade-off algoritma pengurutan.

Cara memakai: baca penjelasan, ketik ulang setiap contoh, telusuri dengan kertas untuk masukan kecil, lalu kerjakan latihan. Bagian merge sort dan quicksort memakai rekursi; bila belum nyaman, baca dulu modul rekursi. Contoh kode di modul ini hanya diperiksa bisa dikompilasi (C++17); itu tidak membuktikan contoh benar untuk semua masukan, jadi tetap uji sendiri.

## Mengukur kecepatan: kompleksitas waktu

Untuk membandingkan algoritma kita menghitung kira-kira berapa langkah yang dibutuhkan bila ukuran data n membesar, dan menuliskannya dengan notasi Big-O. Yang dihitung adalah pertumbuhan, bukan detik.

| Notasi | Contoh |
| --- | --- |
| O(1) | mengakses `a[i]` |
| O(log n) | binary search |
| O(n) | linear search, satu kali lewat array |
| O(n log n) | merge sort |
| O(n^2) | bubble sort dan insertion sort (kasus terburuk) |

Dua catatan: Big-O menggambarkan batas atas pertumbuhan dan membuang konstanta, jadi dua algoritma dengan Big-O sama bisa berbeda kecepatannya; dan sebuah algoritma bisa punya kasus terbaik, rata-rata, dan terburuk yang berbeda.

## Linear search

Linear search memeriksa elemen satu per satu dari awal sampai ketemu atau habis. Cocok untuk data yang tidak terurut. Waktunya O(n).

```cpp
#include <iostream>
using namespace std;

int cari(const int a[], int n, int x) {
    for (int i = 0; i < n; i++) {
        if (a[i] == x) {
            return i;          // indeks pertama yang cocok
        }
    }
    return -1;                 // tidak ditemukan
}

int main() {
    int a[6] = {7, 3, 9, 3, 1, 5};
    cout << cari(a, 6, 3) << "\n";     // 1
    cout << cari(a, 6, 4) << "\n";     // -1
    return 0;
}
```

## Binary search

Binary search mencari pada array yang sudah terurut dengan cara membuang separuh kemungkinan pada setiap langkah. Waktunya O(log n): untuk n = 1.000.000 hanya sekitar 20 langkah (2^20 = 1.048.576).

Kunci agar benar adalah invarian: pernyataan yang selalu benar pada tiap putaran. Pada versi berikut kita memakai rentang setengah terbuka `[lo, hi)` dan menjaga invarian: semua elemen di sebelah kiri `lo` bernilai kurang dari `x`, dan semua elemen mulai dari `hi` ke kanan bernilai paling sedikit `x`. Rentang menyusut setiap putaran, dan saat `lo == hi`, posisi itu adalah indeks pertama yang nilainya paling sedikit `x`.

```cpp
#include <iostream>
using namespace std;

// indeks pertama i dengan a[i] >= x; bernilai n bila tidak ada
int batasBawah(const int a[], int n, int x) {
    int lo = 0, hi = n;
    while (lo < hi) {
        int mid = lo + (hi - lo) / 2;
        if (a[mid] < x) {
            lo = mid + 1;      // mid tidak mungkin jawabannya
        } else {
            hi = mid;          // mid masih mungkin jawabannya
        }
    }
    return lo;
}

int main() {
    int a[6] = {1, 3, 3, 5, 8, 9};
    int p = batasBawah(a, 6, 3);
    if (p < 6 && a[p] == 3) {
        cout << p << "\n";             // 1
    } else {
        cout << -1 << "\n";
    }
    cout << batasBawah(a, 6, 4) << "\n";    // 3 (posisi 4 akan disisipkan)
    return 0;
}
```

Hal yang perlu dipahami:

- Array harus terurut. Pada data tidak terurut hasilnya tidak berarti.
- `mid = lo + (hi - lo) / 2` menghindari overflow yang mungkin terjadi pada `(lo + hi) / 2` bila indeks sangat besar.
- Bagian tersulit adalah memilih `lo = mid + 1` atau `hi = mid`. Bila salah satunya tidak mengecilkan rentang, perulangan tidak pernah berhenti.
- C++ menyediakan `lower_bound` dan `upper_bound` pada `<algorithm>`, yang bekerja dengan cara yang sama pada array atau vector terurut.

Binary search tidak terbatas pada array. Gagasannya berlaku untuk setiap pertanyaan dengan pola "salah, salah, ..., benar, benar" (monoton), misalnya mencari bilangan bulat terkecil yang memenuhi suatu syarat. Itu dikerjakan pada Latihan 4.

## Bubble sort

Bubble sort berkali-kali membandingkan pasangan elemen bersebelahan dan menukarnya bila urutannya salah. Setelah putaran pertama, elemen terbesar berada di ujung kanan; setelah putaran ke-k, k elemen terbesar sudah di tempatnya.

```cpp
#include <iostream>
#include <utility>
using namespace std;

void bubbleSort(int a[], int n) {
    for (int i = 0; i < n - 1; i++) {
        bool tukar = false;
        for (int j = 0; j + 1 < n - i; j++) {
            if (a[j] > a[j + 1]) {
                swap(a[j], a[j + 1]);
                tukar = true;
            }
        }
        if (!tukar) {
            break;             // sudah terurut
        }
    }
}

int main() {
    int a[5] = {5, 1, 4, 2, 8};
    bubbleSort(a, 5);
    for (int i = 0; i < 5; i++) {
        cout << a[i] << " ";   // 1 2 4 5 8
    }
    cout << "\n";
    return 0;
}
```

Waktu kasus terburuk O(n^2). Dengan penanda `tukar`, kasus terbaik (data sudah terurut) O(n). Banyaknya penukaran sama dengan banyaknya inversi, yaitu pasangan posisi i < j dengan `a[i] > a[j]`.

## Insertion sort

Insertion sort membangun bagian terurut di kiri. Pada tiap langkah, ambil elemen berikutnya lalu geser elemen yang lebih besar ke kanan sampai menemukan tempat yang tepat, seperti menyusun kartu di tangan.

```cpp
#include <iostream>
using namespace std;

void insertionSort(int a[], int n) {
    for (int i = 1; i < n; i++) {
        int kunci = a[i];
        int j = i - 1;
        while (j >= 0 && a[j] > kunci) {
            a[j + 1] = a[j];       // geser ke kanan
            j--;
        }
        a[j + 1] = kunci;
    }
}

int main() {
    int a[5] = {5, 1, 4, 2, 8};
    insertionSort(a, 5);
    for (int i = 0; i < 5; i++) {
        cout << a[i] << " ";       // 1 2 4 5 8
    }
    cout << "\n";
    return 0;
}
```

Invarian: sebelum memproses indeks i, bagian `a[0..i-1]` sudah terurut. Waktu kasus terburuk O(n^2), kasus terbaik O(n). Insertion sort cepat untuk data kecil atau hampir terurut, dan banyaknya pergeseran juga sama dengan banyaknya inversi.

Bubble sort dan insertion sort mudah dipahami, tetapi pada n sekitar 100.000 kasus terburuknya sudah terlalu lambat (sekitar 10^10 operasi). Untuk itu dipakai algoritma O(n log n).

## Merge sort

Merge sort memakai divide-and-conquer: bagi array menjadi dua, urutkan masing-masing secara rekursif, lalu gabungkan dua bagian terurut (merge) dengan dua penunjuk.

```cpp
#include <iostream>
#include <vector>
using namespace std;

void gabung(vector<int>& a, int l, int m, int r) {
    vector<int> hasil;
    int i = l, j = m + 1;
    while (i <= m && j <= r) {
        if (a[i] <= a[j]) {
            hasil.push_back(a[i++]);
        } else {
            hasil.push_back(a[j++]);
        }
    }
    while (i <= m) {
        hasil.push_back(a[i++]);
    }
    while (j <= r) {
        hasil.push_back(a[j++]);
    }
    for (int k = 0; k < (int)hasil.size(); k++) {
        a[l + k] = hasil[k];
    }
}

void mergeSort(vector<int>& a, int l, int r) {
    if (l >= r) {
        return;
    }
    int m = l + (r - l) / 2;
    mergeSort(a, l, m);
    mergeSort(a, m + 1, r);
    gabung(a, l, m, r);
}

int main() {
    vector<int> a = {38, 27, 43, 3, 9, 82, 10};
    mergeSort(a, 0, (int)a.size() - 1);
    for (int x : a) {
        cout << x << " ";      // 3 9 10 27 38 43 82
    }
    cout << "\n";
    return 0;
}
```

Kenapa O(n log n): array dibagi dua sampai ukuran 1, sehingga ada sekitar log2(n) tingkat; pada tiap tingkat, seluruh elemen digabung dengan total kerja O(n). Waktu O(n log n) berlaku pada semua kasus. Konsekuensinya, merge sort memakai memori tambahan O(n). Tanda `<=` pada `gabung` menjaga elemen sama tetap berurutan seperti semula (sort stabil).

## Quicksort

Quicksort memilih satu elemen sebagai pivot, menyusun ulang array (partisi) sehingga elemen yang lebih kecil dari pivot ada di kirinya dan yang lebih besar atau sama ada di kanannya, lalu mengurutkan kedua sisi secara rekursif. Berbeda dari merge sort, kerja utamanya ada pada tahap bagi (partisi), dan tidak perlu tahap gabung.

```cpp
#include <iostream>
#include <utility>
#include <vector>
using namespace std;

int partisi(vector<int>& a, int l, int r) {
    int pivot = a[r];
    int i = l;                         // a[l..i-1] semua < pivot
    for (int j = l; j < r; j++) {
        if (a[j] < pivot) {
            swap(a[i], a[j]);
            i++;
        }
    }
    swap(a[i], a[r]);                  // pivot ke posisinya
    return i;
}

void quickSort(vector<int>& a, int l, int r) {
    if (l >= r) {
        return;
    }
    int p = partisi(a, l, r);
    quickSort(a, l, p - 1);
    quickSort(a, p + 1, r);
}

int main() {
    vector<int> a = {10, 7, 8, 9, 1, 5};
    quickSort(a, 0, (int)a.size() - 1);
    for (int x : a) {
        cout << x << " ";              // 1 5 7 8 9 10
    }
    cout << "\n";
    return 0;
}
```

Kompleksitas: rata-rata O(n log n) bila pivot membagi cukup seimbang, tetapi kasus terburuk O(n^2) bila pivot selalu ekstrem. Dengan pivot elemen terakhir seperti di atas, array yang sudah terurut membuat setiap partisi hanya menyingkirkan satu elemen. Cara umum menghindarinya adalah memilih pivot secara acak atau dari elemen tengah. Quicksort tidak stabil dan hanya memakai memori tambahan kecil selain stack rekursi.

## Heap sort

Heap sort memakai struktur binary heap: pohon biner hampir penuh yang disimpan dalam array, dengan sifat max-heap bahwa setiap simpul tidak lebih kecil dari anak-anaknya, sehingga elemen terbesar selalu di puncak. Gagasannya: bangun max-heap dari seluruh elemen, lalu berulang kali tukar puncak (terbesar) ke posisi paling kanan yang belum terurut, kecilkan heap satu elemen, dan perbaiki sifat heap. Waktunya O(n log n) pada semua kasus dengan memori tambahan O(1), tetapi tidak stabil. Rincian heap (sift-down, sift-up) dibahas pada topik struktur data; di sini cukup memahami konsepnya. Pustaka C++ menyediakan operasinya:

```cpp
#include <algorithm>
#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> a = {4, 10, 3, 5, 1};
    make_heap(a.begin(), a.end());     // bangun max-heap
    sort_heap(a.begin(), a.end());     // urutkan menaik memakai heap
    for (int x : a) {
        cout << x << " ";              // 1 3 4 5 10
    }
    cout << "\n";
    return 0;
}
```

## Membandingkan algoritma pengurutan

| Algoritma | Terburuk | Rata-rata atau tipikal | Memori tambahan | Stabil |
| --- | --- | --- | --- | --- |
| Bubble sort | O(n^2) | O(n^2) | O(1) | ya |
| Insertion sort | O(n^2) | O(n^2) | O(1) | ya |
| Merge sort | O(n log n) | O(n log n) | O(n) | ya |
| Quicksort | O(n^2) | O(n log n) | kecil (stack rekursi) | tidak |
| Heap sort | O(n log n) | O(n log n) | O(1) | tidak |

Stabil berarti elemen dengan kunci sama tetap dalam urutan semula. Itu penting saat mengurutkan berdasarkan beberapa kunci berturut-turut.

Dalam lomba, hampir selalu cukup memakai `sort` dari `<algorithm>`, yang berkompleksitas O(n log n) dalam kasus terburuk. Bila butuh kestabilan, pakai `stable_sort`. Kamu tetap perlu memahami algoritma di atas karena soal sering memintamu mengubah atau memanfaatkan idenya (misalnya penggabungan pada merge sort untuk menghitung inversi).

```cpp
#include <algorithm>
#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> a = {5, 2, 9, 1, 7};
    sort(a.begin(), a.end());                       // menaik
    for (int x : a) {
        cout << x << " ";                           // 1 2 5 7 9
    }
    cout << "\n";
    sort(a.begin(), a.end(), greater<int>());       // menurun
    for (int x : a) {
        cout << x << " ";                           // 9 7 5 2 1
    }
    cout << "\n";
    return 0;
}
```

## Prefix sum sebagai pendukung

Prefix sum menyimpan jumlah awalan: `p[i]` adalah jumlah `a[0]` sampai `a[i-1]`. Setelah O(n) persiapan, jumlah elemen pada rentang `[l, r]` (0-based, inklusif) dapat dijawab dalam O(1) dengan `p[r + 1] - p[l]`. Cara ini sering dipasangkan dengan pengurutan dan binary search.

```cpp
#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> a = {2, 5, 1, 4, 3};
    vector<long long> p(a.size() + 1, 0);
    for (size_t i = 0; i < a.size(); i++) {
        p[i + 1] = p[i] + a[i];
    }
    cout << p[4] - p[1] << "\n";       // jumlah a[1..3] = 5 + 1 + 4 = 10
    return 0;
}
```

## Kesalahan umum

- Memakai binary search pada array yang belum diurutkan.
- Perulangan binary search tidak berhenti karena `lo` atau `hi` tidak bergerak (misalnya `lo = mid` dengan `mid` condong ke kiri).
- Selisih satu pada batas (`<` vs `<=`, rentang tertutup vs setengah terbuka) yang tidak konsisten antara kondisi perulangan dan pembaruan.
- Overflow pada `(lo + hi) / 2` atau pada jumlah di prefix sum yang disimpan dalam `int`.
- Memakai bubble atau insertion sort untuk n besar (kira-kira di atas beberapa puluh ribu).
- Quicksort dengan pivot buruk pada data yang sudah terurut.
- Membandingkan dengan fungsi pembanding yang tidak konsisten (misalnya `<=` pada `sort`), yang pada `std::sort` dapat menyebabkan perilaku tak terdefinisi.
- Lupa bahwa `sort` tidak stabil sehingga urutan elemen sama bisa berubah.

## Latihan

Latihan di bawah dibuat khusus untuk modul ini. Kerjakan di komputer, lalu bandingkan dengan contoh masukan dan keluaran.

### Latihan 1: Kemunculan pertama

Masukan: baris pertama `N` (1 <= N <= 100.000) dan `Q` (1 <= Q <= 100.000); baris kedua `N` bilangan bulat terurut menaik (boleh ada yang sama); baris ketiga `Q` bilangan bulat yang dicari. Untuk tiap pencarian, cetak indeks (mulai dari 0) kemunculan pertama bilangan itu, atau `-1` bila tidak ada, satu jawaban per baris.

Contoh masukan:
```
6 2
1 3 3 5 8 9
3 4
```
Contoh keluaran:
```
1
-1
```

Petunjuk: pakai `batasBawah`, lalu periksa apakah elemen pada posisi itu sama dengan yang dicari. Jangan memakai linear search; mengapa kira-kira 10^10 langkah terlalu lambat?

### Latihan 2: Hitung inversi

Masukan: baris pertama `N` (1 <= N <= 2000), baris kedua `N` bilangan bulat. Cetak banyaknya pasangan posisi i < j dengan `a[i] > a[j]`.

Contoh masukan:
```
4
2 4 1 3
```
Contoh keluaran: `3`

Penjelasan contoh: pasangan (2, 1), (4, 1), dan (4, 3).

Petunjuk: untuk N sampai 2000, dua perulangan bersarang (O(N^2)) sudah cukup. Sebagai tantangan, pikirkan bagaimana tahap gabung pada merge sort dapat menghitungnya dalam O(N log N). Hasil terbesar untuk N = 2000 adalah 1.999.000 sehingga `int` cukup, tetapi untuk N yang lebih besar perhatikan tipe datanya.

### Latihan 3: Dry-run insertion sort

Tanpa menjalankan program, tuliskan isi array setelah setiap nilai `i` pada insertion sort di atas untuk masukan `5 2 4 6 1 3`, dan hitung total pergeseran (jumlah eksekusi `a[j + 1] = a[j]`). Lalu periksa dengan menjalankannya (tambahkan pencetakan sementara). Setelah itu cocokkan total pergeseran dengan banyaknya inversi pada array awal.

### Latihan 4: Akar bulat

Masukan: satu bilangan bulat `N` (0 <= N <= 10^18). Cetak bilangan bulat terbesar `x` dengan `x * x <= N`, memakai binary search pada jawaban (jangan memakai `sqrt`).

Contoh masukan: `50`
Contoh keluaran: `7`

Contoh masukan: `1000000000000000000`
Contoh keluaran: `1000000000`

Petunjuk: jawaban berada pada rentang 0 sampai 10^9, dan syarat `x * x <= N` bernilai benar lalu salah ketika x membesar. Gunakan `long long`; periksa bahwa `x * x` tidak overflow untuk x paling besar yang kamu uji.

### Latihan 5: Gabungkan dua larik terurut

Masukan: baris pertama `N` dan `M` (1 <= N, M <= 100.000); baris kedua `N` bilangan terurut menaik; baris ketiga `M` bilangan terurut menaik. Cetak seluruh `N + M` bilangan dalam urutan menaik, dipisahkan spasi, tanpa memanggil `sort`. Waktu harus O(N + M).

Contoh masukan:
```
3 4
1 4 7
2 3 5 8
```
Contoh keluaran: `1 2 3 4 5 7 8`

Petunjuk: pakai dua penunjuk seperti pada fungsi `gabung`.

### Latihan 6: Temukan kesalahannya

Fungsi berikut dimaksudkan mencari indeks pertama elemen yang nilainya paling sedikit `x` pada array terurut `a[0..n-1]` (dengan asumsi elemen seperti itu ada). Namun program tidak pernah berhenti untuk beberapa masukan. Temukan masukan yang menyebabkannya (petunjuk: n = 2), jelaskan penyebabnya, lalu perbaiki.

```cpp
int cari(const int a[], int n, int x) {
    int lo = 0, hi = n - 1;
    while (lo < hi) {
        int mid = (lo + hi) / 2;
        if (a[mid] < x) {
            lo = mid;
        } else {
            hi = mid;
        }
    }
    return lo;
}
```

## Cek mandiri

Setelah selesai, pastikan kamu bisa menjawab tanpa melihat catatan:

- Apa syarat agar binary search boleh dipakai?
- Apa invarian pada binary search `batasBawah` di atas?
- Mengapa insertion sort cepat pada data yang hampir terurut?
- Mengapa merge sort selalu O(n log n), dan apa harganya?
- Kapan quicksort menjadi O(n^2) dan bagaimana menghindarinya?
- Apa arti sort yang stabil dan kapan itu penting?
- Dalam kondisi apa kamu cukup memakai `sort` dari pustaka standar?

## Langkah berikutnya

Lanjutkan ke modul rekursi bila belum, lalu ke modul strategi problem solving (complete search, greedy, dan dynamic programming), di mana pengurutan dan binary search sering menjadi langkah pendukung. Untuk cakupan resmi dan silabus terbaru, rujuk halaman silabus OSN di bagian Rujukan. Untuk soal latihan tambahan, pilih soal dari arsip resmi lalu kerjakan sendiri; jangan menyalin soal ke dalam modul ini.
