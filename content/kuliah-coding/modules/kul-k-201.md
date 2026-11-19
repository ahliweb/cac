## Untuk siapa modul ini

Modul belajar untuk mata kuliah `KUL-K-201` (2 SKS, semester 3, jalur K),
bagian dari program `kuliah-coding`. Konten ini karangan menurut ADR-0007 dan
belum disetujui. Kode di modul adalah **C++17** (g++ 13.3, Linux): tiap blok
`cpp` yang lengkap dikompilasi dengan `-std=c++17 -Wall -Wextra` tanpa
peringatan, dijalankan, dan keluarannya cocok dengan yang tertulis.

Pembacanya mahasiswa semester 3 yang sudah menempuh `KUL-I-102` (struktur
data: *vector*, stack, queue, pohon, graf, BFS, DFS) atau punya bekal setara
(jalur A `sma-coding`, atau `KUL-U-101` dengan seleksi `[asumsi]`). Satu mata
kuliah, satu semester: 14 pertemuan, 2 SKS (beban per pertemuan lebih kecil
dari mata kuliah 3 SKS). Kamu butuh g++ (C++17) dan Git.

Mata kuliah ini **lanjutan OSN** ke arah ICPC: yang dilatih adalah membaca
soal, memperkirakan kompleksitas dari batas masukan, menulis kode ringkas yang
benar, dan menguji sendiri. **Tingkat AI: Merah saat kontes dan latihan
kontes** (silabus 6.3); bagian "Kebijakan AI dan log pemakaian" menjelaskan
yang boleh sesudahnya. Soal latihan di modul ini karangan sendiri; soal kontes
nyata hanya **ditautkan** ke arsip resminya dan tidak disalin.

## Peta semester

| Pertemuan | Bagian | Pokok bahasan | CPMK | Kuis pembuka (jarak) |
| --- | --- | --- | --- | --- |
| 1 | 1 | Templat kode dan I/O cepat | C4 | `KUL-I-102`: queue dan BFS |
| 2 | 1 | Pustaka standar: `vector`, `set`, `map`, `pair` | C4 | 1, lalu `KUL-I-102`: pencarian biner |
| 3 | 2 | Pengurutan dan pembanding | C1, C2 | 2, lalu 1 |
| 4 | 2 | Pencarian biner; **kontes 1** | C1, C2 | 3, lalu 1 |
| 5 | 2 | Pencarian biner pada jawaban | C1, C2 | 4, lalu 2 |
| 6 | 3 | Greedy: pilih yang paling cepat selesai; **kontes 2** | C1, C3 | 5, lalu 3 |
| 7 | 3 | Greedy: bukti dan contoh penyangkal | C1, C3 | 6, lalu 4 |
| 8 | 3 | Greedy dan pengurutan bersama | C1, C3 | 7, lalu 5 |
| 9 | 4 | DP: keadaan dan transisi; **kontes 3** | C1, C2 | 8, lalu 6 |
| 10 | 4 | DP: koin dan tas | C1, C2 | 9, lalu 7 |
| 11 | 4 | DP: urutan terpanjang dan tabel dua dimensi; **kontes 4** | C1, C2 | 10, lalu 8 |
| 12 | 5 | BFS pada graf dan kisi | C1, C3 | 11, lalu 9 |
| 13 | 5 | DFS dan komponen terhubung | C1, C3 | 12, lalu 10 |
| 14 | 5 | Menguji sendiri; kasus uji dan pembanding; **kontes 5** | C3 | 13, lalu 1 sampai 12 |

Kelima kontes mingguan itu perorangan dan penempatannya (pertemuan 4, 6, 9,
11, 14) usulan penyusun `[asumsi]`. Ini mata kuliah **tanpa ujian tertulis
tengah dan akhir** di silabus; asesmennya kontes dan analisis pascakontes.

## Ingat kembali

Tiap pertemuan dibuka kuis 5 menit **tanpa catatan dan tanpa komputer**, 3
sampai 4 soal, dari pertemuan sebelumnya dan yang lebih jauh (kolom terakhir
peta). Dua pertemuan pertama mengambil dari `KUL-I-102`, satu semester yang
lalu. Contoh soal pertemuan 1 dan 2:

1. Tulis BFS dengan queue dan penanda kunjungan. Mengapa penanda itu perlu?
2. Sebut biaya pencarian BST yang seimbang dan biaya terburuknya, dan data
   masukan yang membuatnya terburuk.
3. Mengapa pencarian biner mensyaratkan larik terurut, dan berapa langkahnya
   untuk 1000 elemen?
4. Apa beda stack dan queue pada urutan elemen yang keluar?

Mengingat dengan usaha, bukan membaca ulang catatan, yang membuat ingatan
bertahan. Pada kontes kamu tidak bisa membuka catatan, jadi latihan
mengambil kembali dari ingatan adalah latihan yang sama dengan hari kontes.

## Tujuan

Pada akhir semester kamu dapat (CPMK, silabus bagian 3.3):

- **C1** menyelesaikan soal bertipe OSN/ICPC dasar (pencarian, pengurutan,
  greedy, rekursi, struktur data standar) dalam batas waktu;
- **C2** membaca batas soal dan memperkirakan kompleksitas;
- **C3** membuat kasus uji sendiri;
- **C4** memakai pustaka standar C++ secara efisien.

## Bagian 1: Templat, I/O cepat, dan pustaka standar (pertemuan 1 dan 2)

Soal kontes diberi masukan lewat masukan standar dan jawabanmu dibaca dari
keluaran standar. Dua kebiasaan kecil menghemat waktu: mematikan sinkronisasi
`cin`/`cout` dengan `stdio` (`ios::sync_with_stdio(false)` dan
`cin.tie(nullptr)`) agar pembacaan jutaan bilangan tidak lambat, dan memakai
`long long` untuk jumlah yang bisa melewati sekitar dua miliar (batas `int`
32 bit umumnya). Dua hal itu tidak mengubah hasil, hanya kecepatan dan
keamanan overflow.

### Prediksi dulu

Tanpa menjalankan, tulis empat bilangan yang dicetak program ini. (Ingat:
`lower_bound` mengembalikan posisi elemen pertama yang tidak lebih kecil dari
nilai; `upper_bound` posisi elemen pertama yang lebih besar.)

```cpp
#include <algorithm>
#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> a = {5, 1, 4, 1, 3};
    sort(a.begin(), a.end());
    int lo = static_cast<int>(lower_bound(a.begin(), a.end(), 4) - a.begin());
    int banyak1 = static_cast<int>(upper_bound(a.begin(), a.end(), 1) -
                                   lower_bound(a.begin(), a.end(), 1));
    sort(a.begin(), a.end(), greater<int>());
    cout << lo << ' ' << banyak1 << ' ' << a[0] << ' ' << a[4] << '\n';
    return 0;
}
```

### Contoh terselesaikan

Templat paling sederhana yang cukup untuk hampir semua soal: baca `n`,
baca `n` bilangan, hitung, cetak. Contoh ini menjumlahkan dan mencari
terkecil dan terbesar.

```cpp
#include <algorithm>
#include <iostream>
#include <vector>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    int n;
    cin >> n;
    vector<long long> a(n);
    for (auto &x : a) {
        cin >> x;
    }
    long long jumlah = 0;
    for (long long x : a) {
        jumlah += x;
    }
    sort(a.begin(), a.end());
    cout << jumlah << '\n' << a.front() << ' ' << a.back() << '\n';
    return 0;
}
```

Dengan masukan

```text
5
4 -2 9 1 7
```

keluarannya

```text
19
-2 9
```

Kompleksitas: membaca dan menjumlahkan `O(n)`, mengurutkan `O(n log n)`;
yang terbesar menentukan, jadi `O(n log n)` total. Memakai `'\n'` dan bukan
`endl` penting: `endl` memaksa keluaran dikosongkan setiap kali dan
memperlambat program yang mencetak banyak baris.

Pustaka standar yang akan kamu pakai terus: `vector` (larik dinamis, akses
`O(1)`, tambah di belakang `O(1)` diamortisasi), `pair` (dua nilai, dibanding
menurut anggota pertama lalu kedua), `set` dan `map` (terurut, operasi
`O(log n)`), dan `sort`, `lower_bound`, `upper_bound`, `next_permutation`
dari `<algorithm>`. Dokumentasi rujukannya ada di bagian rujukan.

### Contoh setengah jadi

Lengkapi program yang membaca `n` kata dan mencetak berapa kata berbeda
(hint: `set` hanya menyimpan satu salinan):

```cpp setengah-jadi
#include <iostream>
#include <set>
#include <string>
using namespace std;

int main() {
    int n;
    cin >> n;
    set<string> kata;
    for (int i = 0; i < n; i++) {
        string s;
        cin >> s;
        kata.___(s);
    }
    cout << kata.___() << '\n';
    return 0;
}
```

### Latihan

1. **Ubah:** ubah templat agar mencetak jumlah, rata-rata sebagai bilangan
   pecahan dengan dua desimal (`cout << fixed << setprecision(2)`), dan
   selisih terbesar antara dua elemen. Jelaskan mengapa selisih terbesar tidak
   perlu perulangan bersarang.
2. **Buat:** program yang membaca `n` pasang (nama, nilai) dan mencetak
   nama-nama diurutkan dari nilai terbesar; bila nilai sama, urut abjad.
   Nyatakan kompleksitasnya.
3. **Jelaskan:** mengapa `int` untuk jumlah `10^5` bilangan masing-masing
   sampai `10^9` bisa salah, dan apa yang kamu pakai?
4. **Berpasangan (praktikum):** pengemudi mengetik, navigator membaca soal
   dan mengawasi; tukar peran tiap sekitar 10 menit; pasangan dibentuk acak
   per bagian. Latihan berpasangan bukan kontes: tugas yang dinilai tetap
   perorangan.

## Bagian 2: Pengurutan dan pencarian biner (pertemuan 3 sampai 5)

Mengurutkan sering membuat soal yang tampak sulit menjadi mudah: sesudah
terurut, pasangan, duplikat, dan rentang dapat dicari dengan dua penunjuk
atau pencarian biner. **Pencarian biner** membuang separuh kemungkinan tiap
langkah, jadi `O(log n)` pada larik terurut. Versi yang lebih kuat adalah
**pencarian biner pada jawaban**: bila "bisakah jawabannya ≤ x?" berubah dari
tidak ke ya tepat sekali ketika x naik (monoton), kamu mencari x terkecil
yang membuatnya ya.

### Prediksi dulu

Larik `[7, 2, 5, 10, 8]` harus dibagi menjadi paling banyak 2 bagian
berurutan (tanpa mengacak urutan). Jumlah terbesar di antara bagian-bagian
itu ingin kamu buat sekecil mungkin. Tebak jawabannya dengan mencoba satu
dua pemisahan di kertas, lalu baca contoh.

### Contoh terselesaikan

Fungsi `bisa(a, k, batas)` memeriksa apakah ada pembagian dengan jumlah tiap
bagian paling banyak `batas`. Pemeriksaannya greedy: tambahkan elemen ke bagian
sekarang selama masih muat, buka bagian baru bila tidak. Karena `bisa`
monoton terhadap `batas`, pencarian biner mencari batas terkecil.

```cpp
#include <iostream>
#include <vector>
using namespace std;

// Bisakah larik dibagi menjadi paling banyak k bagian berurutan
// dengan jumlah tiap bagian <= batas?
bool bisa(const vector<int> &a, int k, long long batas) {
    int bagian = 1;
    long long sekarang = 0;
    for (int x : a) {
        if (x > batas) {
            return false;
        }
        if (sekarang + x > batas) {
            bagian++;
            sekarang = 0;
        }
        sekarang += x;
    }
    return bagian <= k;
}

int main() {
    vector<int> a = {7, 2, 5, 10, 8};
    int k = 2;
    long long lo = 0;
    long long hi = 0;
    for (int x : a) {
        hi += x;
    }
    while (lo < hi) {
        long long mid = (lo + hi) / 2;
        if (bisa(a, k, mid)) {
            hi = mid;
        } else {
            lo = mid + 1;
        }
    }
    cout << lo << '\n';
    return 0;
}
// keluaran:
// 18
```

Penelusuran: jumlah total 32, jadi rentang awal `[0, 32]`. Untuk `batas = 16`
elemen 10 dan 8 tidak muat bersama (18 > 16), bagian jadi 3 dan `bisa` gagal;
untuk `batas = 18`, bagian `[7, 2, 5]` (14) dan `[10, 8]` (18) cukup, jadi
`bisa` berhasil; 17 gagal karena 10 + 8 > 17. Jawabannya 18. Pencarian bersyarat
`lo < hi` dengan `hi = mid` ketika berhasil menjaga `hi` selalu berupa jawaban
yang sah.

Kompleksitas: tiap pemanggilan `bisa` `O(n)`; rentang `[0, S]` dengan `S` jumlah
total dibelah dua tiap putaran sehingga ada sekitar `log2(S)` putaran.
Total `O(n log S)`. Mencoba semua batas satu per satu akan `O(n * S)`.
Dengan `n = 10^5` dan `S = 10^{14}` selisihnya adalah antara selesai dalam
sekejap dan tidak pernah selesai.

Dua kesalahan klasik: mengira `bisa` monoton padahal tidak (periksa dulu: kalau
batas naik, apakah jawaban selalu tetap ya?), dan `lo + hi` yang melewati
`int` (pakai `long long`).

### Contoh setengah jadi

Lengkapi pencarian biner "indeks pertama elemen yang ≥ `t`" pada larik terurut
`a` yang berukuran `n` (hasil `n` bila tidak ada):

```cpp setengah-jadi
int lo = 0;
int hi = n;
while (lo < hi) {
    int mid = (lo + hi) / 2;
    if (a[mid] ___ t) {
        lo = ___;
    } else {
        hi = ___;
    }
}
// lo = indeks pertama dengan a[lo] >= t
```

### Latihan

1. **Ubah:** ubah program di atas agar `k = 3` dan prediksi hasilnya lebih
   dulu; jalankan dan bandingkan.
2. **Buat:** diberikan `n` papan panjang dan sebuah target `m`, cari panjang
   potong terbesar bulat `h` sehingga jumlah `(papan - h)` untuk papan yang
   lebih panjang dari `h` paling sedikit `m` (soal karangan; periksa
   monotonnya). Nyatakan kompleksitasnya.
3. **Jelaskan:** mengapa dua penunjuk pada larik terurut mencari pasangan
   berjumlah `t` dalam `O(n)` sesudah pengurutan `O(n log n)`?
4. **Berpasangan:** satu menulis masukan kecil yang membuat pencarian biner
   salah bila `mid = (lo + hi) / 2` dan `hi = mid - 1`, satu menjelaskan
   di mana invarian rusak.

## Bagian 3: Greedy (pertemuan 6 sampai 8)

**Greedy** memilih langkah yang tampak terbaik saat ini dan tidak pernah
menyesal. Greedy benar hanya bila ada **alasan**: pilihan pertama tak pernah
membuat hasil akhir lebih buruk daripada yang mungkin. Tanpa alasan itu,
greedy sering salah. Tugas utamamu bukan menulis greedy, tetapi memutuskan
apakah ia benar: cari **contoh penyangkal** kecil, atau tulis argumen
pertukaran.

### Prediksi dulu

Ada 8 rapat dengan (mulai, selesai): (1,4), (3,5), (0,6), (5,7), (3,9), (5,9),
(6,10), (8,11). Satu ruang; dua rapat tidak boleh bertumpuk (rapat yang mulai
tepat saat yang lain selesai boleh). Berapa rapat paling banyak yang bisa
dijadwalkan? Tulis tebakanmu dan satu aturan pemilihan yang kamu pakai
(paling awal mulai? paling singkat? paling cepat selesai?).

### Contoh terselesaikan

Aturan yang benar: urutkan menurut waktu **selesai**, lalu ambil rapat yang
mulai tidak lebih awal dari selesai rapat terakhir yang dipilih.

```cpp
#include <algorithm>
#include <iostream>
#include <utility>
#include <vector>
using namespace std;

int main() {
    // (mulai, selesai); pilih rapat sebanyak mungkin yang tidak bertumpuk
    vector<pair<int, int>> rapat = {{1, 4}, {3, 5}, {0, 6}, {5, 7},
                                    {3, 9}, {5, 9}, {6, 10}, {8, 11}};
    sort(rapat.begin(), rapat.end(),
         [](const pair<int, int> &x, const pair<int, int> &y) { return x.second < y.second; });
    int terakhir = -1;
    int dipilih = 0;
    for (const auto &r : rapat) {
        if (r.first >= terakhir) {
            dipilih++;
            terakhir = r.second;
            cout << '(' << r.first << ',' << r.second << ") ";
        }
    }
    cout << '\n' << dipilih << '\n';
    return 0;
}
// keluaran:
// (1,4) (5,7) (8,11) 
// 3
```

Mengapa benar (argumen pertukaran): misalkan ada jadwal optimal yang rapat
pertamanya bukan yang selesai paling awal. Tukar rapat pertamanya dengan yang
selesai paling awal; karena yang itu selesai tidak lebih lambat, rapat-rapat
berikutnya tetap muat, jadi jumlah rapat tidak turun. Ulangi pada sisa rapat.

Contoh penyangkal untuk dua aturan yang tampak masuk akal: "ambil yang
paling awal mulai" salah pada `(0,10), (1,2), (3,4)`: ia memilih `(0,10)`
saja, padahal `(1,2)` dan `(3,4)` muat berdua. "Ambil yang paling singkat"
salah pada `(0,5), (4,6), (5,10)`: ia memilih `(4,6)` yang bertumpuk dengan
dua lainnya, padahal `(0,5)` dan `(5,10)` muat berdua. Satu contoh penyangkal yang kecil cukup untuk membuktikan aturan itu salah;
seratus contoh yang cocok tidak membuktikannya benar.

Kompleksitas: pengurutan `O(n log n)`, pemilihan `O(n)`; total `O(n log n)`.

### Contoh setengah jadi

Aturan: "kamu punya `n` tugas dengan lama kerja berbeda dan satu pekerja;
kerjakan yang terpendek dulu untuk meminimalkan jumlah waktu selesai semua
tugas". Lengkapi kodenya, lalu pikirkan: mengapa urutan menaik menurut lama kerja memberi jumlah
waktu selesai terkecil?

```cpp setengah-jadi
sort(lama.begin(), lama.end());          // menaik menurut lama kerja
long long waktu = 0;
long long total = 0;
for (int x : lama) {
    waktu += ___;
    total += ___;
}
// total = jumlah waktu selesai semua tugas
```

### Latihan

1. **Ubah:** ubah program rapat agar menghitung rapat terbanyak bila rapat
   yang mulai tepat saat yang lain selesai **dianggap bertumpuk**. Satu tanda
   berubah; yang mana?
2. **Buat:** n kegiatan dengan (mulai, selesai) dan sejumlah ruang tak
   terbatas; hitung ruang paling sedikit agar semua terjadwal. Petunjuk:
   urutkan peristiwa awal dan akhir. Nyatakan kompleksitasnya.
3. **Jelaskan:** cari contoh penyangkal untuk greedy "ambil koin terbesar
   dulu" pada pecahan `{1, 3, 4}` dan target 6 (bagian 4 melanjutkan ini).
4. **Berpasangan:** satu menuliskan aturan greedy untuk soal karangan, satu
   mencari contoh penyangkal dengan tangan; ganti peran.

## Bagian 4: DP dasar (pertemuan 9 sampai 11)

**Pemrograman dinamis** (DP) dipakai bila soal bisa dipecah menjadi
sub-soal yang bertumpuk dan jawaban tiap sub-soal dipakai ulang. Langkahnya
selalu tiga: (1) tentukan **keadaan** (apa yang harus diketahui), (2) tulis
**transisi** (jawaban dari jawaban sub-soal yang lebih kecil), (3) tentukan
**kasus dasar** dan **urutan** pengisian. Kompleksitasnya banyaknya keadaan
dikali biaya transisi.

### Prediksi dulu

Pecahan koin `{1, 3, 4}`, target 6. Berapa koin paling sedikit? Bandingkan
dengan "ambil koin terbesar dulu". Tulis kedua hitungan sebelum membaca
contoh.

### Contoh terselesaikan

Keadaan `dp[s]` = koin paling sedikit untuk membentuk nilai `s`;
transisi `dp[s] = min(dp[s - c] + 1)` untuk tiap koin `c ≤ s`; kasus dasar
`dp[0] = 0`; isi dari `s` kecil ke besar.

```cpp
#include <iostream>
#include <vector>
using namespace std;

int main() {
    const int INF = 1000000000;
    vector<int> koin = {1, 3, 4};
    int target = 6;
    vector<int> dp(target + 1, INF);
    dp[0] = 0;
    for (int s = 1; s <= target; s++) {
        for (int c : koin) {
            if (s >= c && dp[s - c] + 1 < dp[s]) {
                dp[s] = dp[s - c] + 1;
            }
        }
    }
    for (int s = 0; s <= target; s++) {
        cout << dp[s] << ' ';
    }
    cout << '\n';
    int sisa = target;
    int greedy = 0;
    for (int i = static_cast<int>(koin.size()) - 1; i >= 0; i--) {
        greedy += sisa / koin[i];
        sisa %= koin[i];
    }
    cout << greedy << '\n';
    return 0;
}
// keluaran:
// 0 1 2 1 1 2 2 
// 3
```

Tabel `dp` untuk `s = 0 sampai 6`: 0, 1, 2, 1, 1, 2, 2. Jadi `dp[6] = 2`
(3 + 3), padahal greedy (4 + 1 + 1) memakai 3 koin: inilah contoh penyangkal
untuk greedy koin. Kompleksitas: `target * |koin|` langkah,
`O(target · |koin|)`. `INF` dipilih cukup besar tetapi masih aman bila
ditambah 1 pada `int`; menyimpan `INT_MAX` lalu menambah 1 meluap.

Pola serupa untuk **tas 0/1** (setiap barang paling banyak sekali): keadaan
`dp[w]` nilai terbesar dengan kapasitas `w`; perulangan barang di luar dan
kapasitas di dalam **dari besar ke kecil**, supaya satu barang tidak dipakai
dua kali dalam satu putaran. Urutan yang terbalik adalah kesalahan pemula
yang sangat sering.

### Contoh setengah jadi

Lengkapi `dp` banyaknya cara membayar `target` dengan koin `c` (urutan koin
tidak dibedakan: koin di luar, nilai di dalam):

```cpp setengah-jadi
vector<long long> cara(target + 1, 0);
cara[0] = ___;
for (int c : koin) {
    for (int s = c; s <= target; s++) {
        cara[s] += cara[___];
    }
}
// cara[target] = banyaknya cara
```

### Latihan

1. **Ubah:** ubah `dp` koin agar mencetak juga koin apa saja yang dipakai
   (simpan koin terakhir tiap `s`, lalu mundur dari `target`).
2. **Buat:** *Urutan naik terpanjang*: `dp[i]` = panjang urutan naik terpanjang
   yang berakhir di `a[i]`. Tulis transisi dan nyatakan kompleksitasnya
   (kuadrat); sebut gagasan untuk `O(n log n)` tanpa menulisnya.
3. **Jelaskan:** mengapa pada tas 0/1 perulangan kapasitas harus dari besar
   ke kecil?
4. **Berpasangan:** satu menulis keadaan dan transisi di kertas untuk soal
   karangan, satu menerjemahkannya menjadi kode; bandingkan sebelum menjalankan.

## Bagian 5: Graf dasar dengan BFS dan DFS (pertemuan 12 sampai 14)

Banyak soal kontes adalah graf tersamar: kisi (peta), keadaan permainan,
hubungan antar orang. **BFS** dengan queue memberi jarak terpendek dalam
banyaknya langkah pada graf tak berbobot. **DFS** menyelam dalam dan cocok
untuk menghitung komponen terhubung. Kisi `n × m` punya `n·m` simpul dan tiap
simpul paling banyak empat tetangga, jadi keduanya `O(n·m)`.

### Prediksi dulu

Peta berikut (`.` terbuka, `#` dinding, `S` mulai di kiri atas, `T` tujuan di
kanan bawah). Gerak hanya empat arah. Berapa langkah terpendek dari `S` ke
`T`, dan berapa **komponen terhubung** daerah terbuka (kelompok petak terbuka
yang saling terhubung)?

```text
S.#...
.##.#.
....#.
.##...
...#.T
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
    vector<string> peta = {
        "S.#...",
        ".##.#.",
        "....#.",
        ".##...",
        "...#.T",
    };
    int n = static_cast<int>(peta.size());
    int m = static_cast<int>(peta[0].size());
    const int dr[4] = {1, -1, 0, 0};
    const int dc[4] = {0, 0, 1, -1};

    vector<vector<int>> jarak(n, vector<int>(m, -1));
    queue<pair<int, int>> q;
    jarak[0][0] = 0;
    q.push({0, 0});
    while (!q.empty()) {
        pair<int, int> u = q.front();
        q.pop();
        for (int d = 0; d < 4; d++) {
            int r = u.first + dr[d];
            int c = u.second + dc[d];
            if (r < 0 || r >= n || c < 0 || c >= m || peta[r][c] == '#' || jarak[r][c] != -1) {
                continue;
            }
            jarak[r][c] = jarak[u.first][u.second] + 1;
            q.push({r, c});
        }
    }
    cout << jarak[4][5] << '\n';

    int komponen = 0;
    vector<vector<bool>> lihat(n, vector<bool>(m, false));
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < m; j++) {
            if (peta[i][j] == '#' || lihat[i][j]) {
                continue;
            }
            komponen++;
            vector<pair<int, int>> tumpukan = {{i, j}};
            lihat[i][j] = true;
            while (!tumpukan.empty()) {
                pair<int, int> u = tumpukan.back();
                tumpukan.pop_back();
                for (int d = 0; d < 4; d++) {
                    int r = u.first + dr[d];
                    int c = u.second + dc[d];
                    if (r < 0 || r >= n || c < 0 || c >= m || peta[r][c] == '#' || lihat[r][c]) {
                        continue;
                    }
                    lihat[r][c] = true;
                    tumpukan.push_back({r, c});
                }
            }
        }
    }
    cout << komponen << '\n';
    return 0;
}
// keluaran:
// 9
// 1
```

Arah ditulis sebagai tabel `dr`, `dc` supaya tidak menulis empat cabang yang
mirip. `jarak[r][c] != -1` berfungsi ganda sebagai penanda kunjungan dan
mencegah putaran tak berujung. Pada peta ini jalur terpendek 9 langkah
(bawah, bawah, kanan, kanan, kanan, bawah, kanan, kanan, bawah; 9 juga selisih
baris ditambah selisih kolom, jadi tak mungkin lebih pendek) dan seluruh
daerah terbuka satu komponen, karena
setiap petak terbuka terhubung ke `S`. DFS di sini memakai tumpukan eksplisit
(*vector*) supaya tidak ada rekursi dalam pada kisi besar: rekursi sedalam
sekitar satu juta tingkat dapat melebihi ruang tumpukan panggilan.

Kompleksitas: BFS `O(n·m)` waktu dan memori, DFS `O(n·m)`.

### Contoh setengah jadi

Lengkapi pemeriksaan batas yang aman, urutannya penting (periksa batas dulu
sebelum membaca `peta[r][c]`):

```cpp setengah-jadi
bool dalamPeta(int r, int c, int n, int m) {
    return r >= ___ && r < ___ && c >= 0 && c < ___;
}
```

### Latihan

1. **Ubah:** ubah BFS agar gerak diagonal juga diizinkan (delapan arah) dan
   prediksi jarak ke `T` lebih dulu. Tabel arah mana yang berubah?
2. **Buat:** hitung berapa petak terbuka yang bisa dicapai dari `S`, dan
   cetak `-1` bila `T` tak terjangkau. Nyatakan kompleksitasnya.
   Tulis juga versi DFS **rekursif** untuk komponen terhubung dan jelaskan
   kapan kamu lebih memilih tumpukan eksplisit.
3. **Jelaskan:** mengapa BFS dari `S` memberi jarak terpendek tetapi DFS
   tidak?
4. **Berpasangan:** satu merancang peta enam kali enam dengan jawaban yang
   sudah dihitung dengan tangan; satu menjalankan programnya; cocokkan.

## Menguji sendiri: kasus uji dan pembanding (pertemuan 14)

Kebenaran di kontes dibuktikan oleh **kasus uji yang kamu buat sendiri**.
Resepnya: tulis solusi **lambat tapi pasti benar** (pembanding, biasanya
mencoba semua kemungkinan), tulis solusi cepat, lalu bandingkan keduanya pada
ribuan masukan acak **kecil**. Satu selisih menunjukkan masukan penyangkal
yang bisa dikecilkan dan ditelusuri. Contoh: menghitung pasangan `i < j` dengan
`a[i] + a[j] = t`, versi cepat memakai dua penunjuk sesudah pengurutan
(`O(n log n)`) dan pembanding memakai dua perulangan (`O(n²)`).

```cpp
#include <algorithm>
#include <iostream>
#include <random>
#include <vector>
using namespace std;

// Cepat, O(n log n): berapa pasangan i < j dengan a[i] + a[j] == t.
long long cepat(vector<int> a, int t) {
    sort(a.begin(), a.end());
    long long total = 0;
    int i = 0;
    int j = static_cast<int>(a.size()) - 1;
    while (i < j) {
        int s = a[i] + a[j];
        if (s < t) {
            i++;
        } else if (s > t) {
            j--;
        } else if (a[i] == a[j]) {
            long long k = j - i + 1;
            total += k * (k - 1) / 2;
            break;
        } else {
            int x = a[i];
            int y = a[j];
            long long cx = 0;
            long long cy = 0;
            while (a[i] == x) {
                cx++;
                i++;
            }
            while (a[j] == y) {
                cy++;
                j--;
            }
            total += cx * cy;
        }
    }
    return total;
}

// Pembanding, O(n^2): dua perulangan bersarang.
long long lambat(const vector<int> &a, int t) {
    long long total = 0;
    for (size_t i = 0; i < a.size(); i++) {
        for (size_t j = i + 1; j < a.size(); j++) {
            if (a[i] + a[j] == t) {
                total++;
            }
        }
    }
    return total;
}

int main() {
    mt19937 rng(12345);
    int salah = 0;
    for (int kasus = 1; kasus <= 2000; kasus++) {
        int n = static_cast<int>(rng() % 8) + 1;
        vector<int> a(n);
        for (int &x : a) {
            x = static_cast<int>(rng() % 6);
        }
        int t = static_cast<int>(rng() % 11);
        if (cepat(a, t) != lambat(a, t)) {
            salah++;
        }
    }
    cout << "kasus berbeda: " << salah << '\n';
    return 0;
}
// keluaran:
// kasus berbeda: 0
```

Nilai kecil (0 sampai 5, panjang sampai 8) sengaja dipilih supaya **duplikat
dan kasus tepi sering muncul**: itulah yang memunculkan bug. Masukan acak yang
besar jarang menyentuh kasus tepi. Keluaran "0" tidak membuktikan
kebenaran, hanya bahwa 2000 kasus kecil cocok; dan nol selisih tidak berarti
bila generatornya kurang bervariasi, karena pembanding yang hanya melihat
masukan yang seragam tidak menguji apa-apa. Cara memeriksa pengujinya sendiri:
rusak `cepat` dengan sengaja (mis. hapus cabang `a[i] == a[j]`) dan pastikan
selisih muncul.

Kasus uji tepi yang selalu dicoba: `n = 1`, semua elemen sama, nilai
minimum dan maksimum menurut batas soal, masukan yang sudah terurut dan
terbalik terurut.

## Latihan bercampur

Setelah bagian 3, 4, dan 5, kerjakan soal yang **tidak menyebut** tekniknya.
Contoh (karangan sendiri): "Diberikan `n` bilangan dan `d`, berapa pasang
`(i, j)` yang selisihnya tepat `d`?" (urutkan lalu dua penunjuk atau pencarian
biner), "Diberikan `n` tugas dengan lama kerja, berapa tugas paling banyak
yang selesai dalam `T` menit?" (greedy: yang singkat dulu), dan "Peta kisi
dengan dinding: apakah dua petak terhubung?" (BFS atau DFS). Kamu memutuskan
jenis soalnya dulu, baru memilih teknik; keterampilan mengenali jenis soal itu
yang dilatih. Kontes mingguan bergaya sama.

Soal kontes nyata untuk latihan **ditautkan**, bukan disalin: arsip soal OSN
Bidang Informatika (`https://osn.toki.id/arsip`) dan kumpulan soal latihan CSES
(`https://cses.fi/problemset/`). Dosen memilih soalnya; kamu membaca
pernyataannya di situs sumber dan mengerjakannya di komputermu.

## Ulang berjarak

Kerjakan ulang tanpa melihat solusi lama:

- satu minggu setelah bagian: tulis ulang dari ingatan satu program contoh
  (pencarian biner pada jawaban, greedy rapat, DP koin, BFS kisi);
- awal tiap bagian baru: dua soal dari bagian sebelumnya;
- minggu sebelum kontes: tiga soal yang dahulu salah, diselesaikan **tanpa
  petunjuk** (editorial hanya sesudah mencoba);
- semester 5: tulis ulang pencarian biner pada jawaban dan DP koin tanpa
  melihat; `KUL-K-301` memakai keduanya dan menambah DP lanjutan.

Pertanyaan yang akan muncul lagi di `KUL-K-301`:

- Tulis rekurensi DP koin dan jelaskan mengapa greedy gagal pada `{1, 3, 4}`.
- Apa syarat agar pencarian biner pada jawaban sah?
- Mengapa BFS memberi jarak terpendek pada graf tak berbobot?

## Kebijakan AI dan log pemakaian

Mata kuliah ini **Merah saat kontes dan latihan kontes** (silabus bagian 6.3,
jalur K): AI tidak boleh dipakai sama sekali selama kontes mingguan maupun
latihan yang dinyatakan sebagai latihan kontes. Alasannya sederhana: yang
dinilai adalah kemampuanmu menyelesaikan soal sendiri dalam batas waktu, dan
kemampuan itu hanya tumbuh bila kamu yang berpikir.

**Sesudah kontes**, AI boleh dipakai untuk menjelaskan solusi, dengan
pengungkapan, **lalu** kamu mengerjakan ulang (*re-solve*) soal itu tanpa AI
dan tanpa melihat penjelasan. Pengerjaan ulang itu yang membuktikan kamu
mengerti. Catat pemakaian AI sesudah kontes di repositorimu sendiri: alat dan
versi, tujuan, perintah, bagian keluaran yang dipakai (log). Jangan
memasukkan data pribadi, kata sandi, atau kunci ke layanan AI. Dosen dapat
mewawancarai kamu tentang solusimu dan memintamu mengubahnya langsung. Dosen
menetapkan tingkat per tugas dan menuliskannya di lembar tugas.

Pemakaian AI di luar kontes, mis. untuk menjelaskan konsep, mengikuti
tingkat yang ditetapkan dosen pada lembar tugas masing-masing.

## Kesalahan umum

- **Meluap `int`.** Jumlah atau hasil kali dua `int` besar memerlukan
  `long long`; periksa batas soal sebelum menulis kode.
- **Membaca batas soal sesudah menulis kode.** Batas menentukan algoritma;
  `n = 10^5` dan `O(n²)` tidak akan selesai.
- **Pencarian biner dengan batas salah.** Satu langkah di `lo` atau `hi`
  menjadi perulangan tak berujung. Uji pada larik dengan satu dan dua elemen.
- **Greedy tanpa alasan.** Tulis argumen pertukaran atau cari contoh
  penyangkal sebelum percaya.
- **DP dengan urutan pengisian salah.** Sub-soal harus sudah terisi sebelum
  dipakai.
- **Tidak menandai simpul BFS saat dimasukkan ke queue**, hanya saat diambil,
  sehingga satu simpul masuk berkali-kali.
- **Hanya menguji kasus contoh soal.** Kasus contoh hampir tak pernah
  menyentuh kasus tepi.
- **Menjalankan `endl` pada banyak baris keluaran**: lambat.

## Cek mandiri

Tutup modul, jawab, baru periksa.

1. Tuliskan templat C++ untuk membaca `n` dan `n` bilangan dengan I/O cepat.
2. Untuk `n = 10^5`, algoritma dengan kompleksitas apa yang masih wajar, dan
   apa yang tidak?
3. Tulis syarat monoton pencarian biner pada jawaban untuk soal pembagian
   larik di bagian 2.
4. Beri contoh penyangkal untuk "ambil koin terbesar dulu".
5. Tulis keadaan, transisi, dan kasus dasar DP koin.
6. Mengapa BFS di kisi memakai `jarak = -1` sebagai penanda kunjungan?
7. Apa yang kamu lakukan sesudah kontes bila ingin AI menjelaskan solusi?

Daftar periksa (kosong; kamu isi sendiri, tidak dikumpulkan):

- [ ] Aku dapat memperkirakan kompleksitas dari batas soal.
- [ ] Aku dapat menulis pencarian biner dan pencarian biner pada jawaban.
- [ ] Aku dapat menilai apakah sebuah greedy benar atau mencari penyangkalnya.
- [ ] Aku dapat menulis keadaan, transisi, dan urutan DP sederhana.
- [ ] Aku dapat menulis BFS dan DFS pada kisi.
- [ ] Aku dapat menulis pembanding lambat dan membandingkannya dengan solusi cepat.

## Kunci dan petunjuk

- **Bagian 1:** prediksi `3 2 5 1` (terurut `1 1 3 4 5`: `lower_bound` untuk 4
  di indeks 3; dua angka 1; terbesar 5; terkecil 1). Templat: jumlah 19,
  terkecil dan terbesar `-2 9`. Setengah jadi: `insert`, `size`.
- **Bagian 2:** prediksi 18 (`[7,2,5]` dan `[10,8]`). Setengah jadi: `<`,
  `mid + 1`, `mid`. Latihan 1: dengan `k = 3` jawabannya 14 (`[7,2,5]`,
  `[10]`, `[8]`).
- **Bagian 3:** prediksi 3 rapat `(1,4) (5,7) (8,11)`. Setengah jadi:
  `x`, `waktu`.
- **Bagian 4:** `dp = 0 1 2 1 1 2 2`; greedy 3 koin. Setengah jadi:
  `1`, `s - c`.
- **Bagian 5:** 9 langkah, 1 komponen. Setengah jadi: `0`, `n`, `m`.
- **Menguji sendiri:** keluaran `kasus berbeda: 0`.
- **Petunjuk bertahap bila macet:** (1) selesaikan masukan kecil dengan
  tangan, tulis langkahnya; (2) cari pola pada langkah itu: pencarian,
  pilihan terbaik, atau pembagian sub-soal; (3) tulis pembanding lambat
  dulu, baru percepat.

## Langkah berikutnya

`KUL-K-301` (Pemrograman Kompetitif II) memakai pencarian biner pada jawaban,
DP, BFS, dan kebiasaan menguji sendiri, lalu menambah DP lanjutan, jalur
terpendek berbobot, pohon rentang minimum, aliran, teori bilangan, segment
tree, dan DSU. `KUL-I-201` (Analisis dan Desain Algoritma) membahas
analisis kompleksitas dan kebenaran secara formal.

## Catatan untuk dosen

Bobot dan bentuk asesmen berikut **usulan**; prodi menetapkan (silabus 6.1,
6.2): lima kontes mingguan perorangan (pertemuan 4, 6, 9, 11, 14) dengan soal
**ditautkan dari arsip resmi atau karangan dosen, tidak disalin ke bahan
ini**, dan analisis pascakontes tertulis. Ujian tertulis tengah dan akhir
tidak disebut di silabus mata kuliah ini; modul tidak menambahkannya.
Kontes dan latihan kontes berlaku Merah; sesudah kontes, penjelasan AI hanya
dengan pengungkapan dan log lalu *re-solve* tanpa AI, dan *re-solve* itu
memberi bukti pemahaman yang lebih kuat daripada kunci jawaban. Editorial
dibuka hanya sesudah mahasiswa mencoba menyelesaikan ulang tanpa petunjuk.
Variasi tugas: ubah angka dan cerita soal karangan per mahasiswa. Pemrograman
berpasangan hanya pada latihan; kontes perorangan.
