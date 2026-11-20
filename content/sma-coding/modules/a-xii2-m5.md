## Untuk siapa modul ini

Modul ini untuk murid kelas XII jalur A (Algoritmik dengan C++), minggu `A-XII2-M5` silabus v1.4.1: latihan terpadu I, yaitu memilih strategi dan struktur data yang tepat. Prasyarat: modul `a-xii2-m4` (backtracking dan pruning lanjutan).

Modul ini berstatus DRAF: karangan penyusun, belum ditinjau pemilik. Silabus tidak memetakan butir capaian pembelajaran untuk minggu ini, jadi modul ini tidak dihitung memenuhi butir CP apa pun. Modul ini **seluruhnya tanpa AI**: semua soal bertanda `AI: tanpa AI` (silabus bagian 7.4), karena tujuannya melatih kemampuan menyelesaikan masalah sendiri dari awal. Soal latihan adalah **soal karangan bergaya kompetitif**: ditulis ulang orisinal oleh penyusun, bukan salinan atau parafrase soal OSN, TOKI, IOI, atau platform lain. Sumber resmi hanya ditautkan: <https://osn.toki.id/>. Modul tidak menjanjikan kedalaman soal OSN dan tidak menggantikan pembinaan OSN.

Masukan program diberikan lewat berkas: `./program < masukan.txt`. Semua data karangan.

## Ingat kembali

Jawab dari ingatan dulu, baru cek di kunci. Soal 1 dari `a-xii2-m4`, soal 2 dari `a-xii2-m2`, soal 3 dari `a-xii1-m11`.

1. Sebutkan tiga cara memangkas ruang pencarian dan syarat agar pangkasan itu aman.
2. Apa saja enam isi satu baris catatan optimasi?
3. Bagaimana rumus tali sepatu menghitung luas poligon, dan mengapa hasilnya dibagi dua?

## Tujuan

Setelah modul ini kamu dapat:

- membaca batas sebuah soal dan memperkirakan banyak langkah yang masih wajar;
- memilih strategi (greedy, DP, pencarian, graf) dan struktur data dengan alasan, bukan kebiasaan;
- menguji pilihanmu pada contoh kecil, termasuk contoh yang mematahkan greedy;
- menulis catatan penyelesaian untuk tiap soal (keluaran minggu ini: solusi dan catatan).

## Prediksi dulu

Ini tugas baca-dan-prediksi, `AI: tanpa AI`. **Tebak dulu, tulis jawabanmu, baru jalankan.** Empat tugas berdurasi `4 1 3 2` menit dan tersedia 6 menit. Program mengambil tugas terpendek lebih dulu.

```cpp
#include <algorithm>
#include <iostream>
using namespace std;

int main() {
  int durasi[4] = {4, 1, 3, 2};
  int sisaWaktu = 6;
  sort(durasi, durasi + 4);
  int banyak = 0;
  for (int d : durasi) {
    if (d > sisaWaktu) {
      break;
    }
    sisaWaktu -= d;
    banyak++;
  }
  cout << banyak << " " << sisaWaktu << "\n";
}
```

1. Berapa tugas yang terambil dan berapa menit tersisa?
2. Apakah ada cara mengambil lebih banyak tugas? Jelaskan.

## Contoh terselesaikan

Keluaran program tadi:

```text
3 0
```

Tugas `1 2 3` memakai 6 menit. **Langkah memilih strategi** yang dipakai di seluruh modul ini: (1) baca batas dan perkirakan langkah; (2) tulis kandidat strategi; (3) cari contoh kecil yang bisa mematahkan tiap kandidat; (4) tulis dan uji; (5) catat. Pedoman kasar, bukan aturan: sekitar `10^8` langkah sederhana masih wajar untuk satu program.

| Batas ukuran | Langkah yang wajar | Kandidat |
| --- | --- | --- |
| `n <= 20` | `2^n` | pencarian lengkap, backtracking |
| `n <= 1000` | `n^2` atau `n * T` | DP dua dimensi, graf kecil |
| `n <= 10^5` | `n log n` | urutkan, antrian prioritas, `set` |
| `n <= 10^6` | `n` | satu penelusuran, jumlah prefiks |

**Soal A (karangan).** `n` tugas berdurasi `d_i` dan total waktu `T`. Berapa tugas paling banyak yang selesai? Untuk `n = 10^5`, `n log n` wajar, dan greedy urut terpendek benar: bila ada pilihan `k` tugas yang muat dalam `T`, maka `k` tugas terpendek juga muat, sebab jumlahnya tak lebih besar.

```cpp
#include <algorithm>
#include <iostream>
#include <vector>
using namespace std;

int main() {
  int n;
  int total;
  cin >> n >> total;
  vector<int> durasi(n);
  for (int& d : durasi) {
    cin >> d;
  }
  sort(durasi.begin(), durasi.end());
  int banyak = 0;
  for (int d : durasi) {
    if (d > total) {
      break;
    }
    total -= d;
    banyak++;
  }
  cout << banyak << "\n";
}
```

Masukan (`masukan.txt`):

```text
7 20
8 3 5 9 2 4 6
```

Keluaran:

```text
5
```

Terurut: `2 3 4 5 6 8 9`; lima pertama berjumlah 20 pas. Perkiraan langkah: pengurutan sekitar `7 * log2 7`, yaitu 20 perbandingan, ditambah paling banyak 7 pengurangan: `O(n log n)`.

**Soal B (karangan).** Sekarang tiap tugas punya nilai `v_i` dan yang dimaksimalkan adalah **jumlah nilai**. Greedy menurut rasio nilai per menit tampak masuk akal, tetapi bisa gagal. Program membandingkannya dengan DP knapsack 0/1 (modul `a-xi2-m3`) pada dua kasus.

```cpp
#include <algorithm>
#include <iostream>
#include <vector>
using namespace std;

int main() {
  int n;
  int batas;
  while (cin >> n >> batas) {
    vector<int> d(n);
    vector<int> v(n);
    for (int i = 0; i < n; i++) {
      cin >> d[i] >> v[i];
    }
    vector<int> urut(n);
    for (int i = 0; i < n; i++) {
      urut[i] = i;
    }
    sort(urut.begin(), urut.end(), [&](int x, int y) { return v[x] * d[y] > v[y] * d[x]; });
    int sisa = batas;
    int serakah = 0;
    for (int i : urut) {
      if (d[i] <= sisa) {
        sisa -= d[i];
        serakah += v[i];
      }
    }
    vector<int> dp(batas + 1, 0);
    long long langkah = 0;
    for (int i = 0; i < n; i++) {
      for (int w = batas; w >= d[i]; w--) {
        dp[w] = max(dp[w], dp[w - d[i]] + v[i]);
        langkah++;
      }
    }
    cout << "serakah rasio " << serakah << ", DP " << dp[batas] << " (" << langkah << " langkah DP)\n";
  }
}
```

Masukan (`masukan.txt`):

```text
3 10
6 61
5 50
5 50
4 10
5 10
4 40
6 30
3 50
```

Keluaran:

```text
serakah rasio 61, DP 100 (17 langkah DP)
serakah rasio 90, DP 90 (26 langkah DP)
```

Kasus pertama mematahkan greedy: rasio tertinggi `61/6` mengambil tugas 6 menit dan mengunci dua tugas 5 menit, padahal dua tugas 5 menit memberi 100. DP `O(n * T)` memeriksa semua kemungkinan secara sistematis dan selalu benar. Kasus kedua kebetulan sama; satu contoh yang cocok tidak membuktikan greedy benar, tetapi satu contoh yang gagal membuktikannya salah.

**Catatan penyelesaian** satu soal berisi lima baris: soal dalam satu kalimat, strategi dan alasannya, perkiraan langkah dan batas, uji kecil (termasuk yang mematahkan alternatif), dan kekeliruan yang kamu temukan.

## Contoh setengah jadi

Lengkapi program Soal A. Kuncinya ada di `Kunci dan petunjuk`.

```cpp setengah-jadi
  sort(durasi.begin(), durasi.end());
  int banyak = 0;
  for (int d : durasi) {
    if (d > ____) {
      break;
    }
    total ____ d;
    banyak____;
  }
```

## Soal Parsons

Susun enam baris berikut (sudah diacak, tanpa lekuk) menjadi inti DP knapsack. `AI: tanpa AI`.

```text
(a) for (int i = 0; i < n; i++) {
(b) }
(c) dp[w] = max(dp[w], dp[w - d[i]] + v[i]);
(d) vector<int> dp(batas + 1, 0);
(e) }
(f) for (int w = batas; w >= d[i]; w--) {
```

## Latihan

Semua soal `AI: tanpa AI`. Tulis catatan penyelesaian untuk tiap soal. Soal karangan; data fiktif.

1. **Antrean loket.** `n` pelanggan, pelanggan ke-`i` butuh `t_i` menit. Urutkan agar jumlah waktu tunggu semua pelanggan (sebelum dilayani) minimum, lalu cetak jumlah itu. Batasan: `n <= 10^5`, `t_i <= 10^4`. Contoh: masukan `5` dan `4 2 7 1 3` memberi `20`.
2. **Lorong dengan satu pukulan.** Peta `r x c` berisi `S` (awal), `T` (tujuan), `.` (kosong), `#` (dinding). Bergerak empat arah. Kamu boleh menembus **paling banyak satu** dinding. Cetak langkah minimum, atau `-1`. Batasan: `r, c <= 500`. Contoh: peta `4 5` di Kunci memberi `6`.
3. **Cara membayar.** Koin bernilai 1, 2, dan 5 tersedia tak terbatas. Berapa cara membayar `n` (urutan koin tak diperhitungkan)? Batasan: `n <= 1000`. Contoh: `10` memberi `10`.
4. **Catatan harga.** `q` perintah: `T x` menambah harga `x`; `H` menghapus harga terkecil; `B` mencetak harga terbesar atau `kosong`. Batasan: `q <= 10^5`.

## Latihan bercampur

1. `AI: tanpa AI` Soal 1 bila `t_i` boleh `10^9` dan `n = 10^5`: tipe apa untuk jumlah dan mengapa (modul `a-xii1-m8`)?
2. `AI: tanpa AI` Mengapa soal 2 memakai keadaan `(sel, dinding yang sudah ditembus)` dan bukan hanya sel (modul `a-xii2-m3`)?
3. `AI: tanpa AI` Pada soal 3, apa yang berubah bila urutan koin diperhitungkan, dan bagaimana mengubah program (modul `a-xi2-m2`)?

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `a-xii2-m6` (pertanyaan 1), sekitar tiga minggu lagi di `a-xii2-m8` (pertanyaan 2), dan sekitar delapan minggu lagi di `a-xii2-m13` (pertanyaan 3). Jawab sekarang lalu simpan.

1. Apa lima langkah memilih strategi dari batas soal?
2. Mengapa greedy menurut rasio nilai per berat bisa gagal pada soal knapsack? Beri contoh.
3. Apa lima isi catatan penyelesaian satu soal?

## Kesalahan umum

- **Memilih algoritma dari kebiasaan.** Mulailah dari batas dan contoh yang mematahkan, bukan dari algoritma favorit.
- **Mengira satu contoh cocok membuktikan greedy.** Hanya contoh yang gagal yang membuktikan sesuatu.
- **Keadaan BFS kurang lengkap.** Pada soal 2, tanpa hitungan dinding hasilnya salah.
- **Urutan perulangan koin tertukar.** Koin di luar menghitung kombinasi; jumlah di luar menghitung urutan.
- **Menulis kode sebelum catatan.** Catatan satu baris tentang strategi mencegah menulis ulang.

## Cek mandiri

- [ ] Saya dapat memperkirakan langkah dari batas soal.
- [ ] Saya dapat mencari contoh kecil yang mematahkan sebuah greedy.
- [ ] Saya dapat memilih struktur data dan menyebut alasannya.
- [ ] Saya menulis catatan penyelesaian lima baris untuk tiap soal.
- [ ] Saya mengerjakan semua tanpa AI dan menyimpan catatan kesalahanku.

## Kunci dan petunjuk

**Ingat kembali.** 1: periksa batasan sedini mungkin, batas dari sisa pilihan, dan urutan pilihan yang menguntungkan; pangkasan aman bila hanya membuang cabang yang pasti gagal sehingga jawaban tak berubah. 2: masalah, bukti (angka langkah), perubahan, hasil, harga yang dibayar, dan cara memeriksa. 3: dua kali luas adalah nilai mutlak jumlah `x_i * y_(i+1) - x_(i+1) * y_i` dengan titik terakhir disambung ke titik pertama; jumlah itu memberi dua kali luas, sehingga dibagi dua (menyimpan dua kali luas menjaga hitungan bulat).

**Prediksi dulu.** 1: `3 0`. 2: tidak; tugas terpendek memakai waktu paling sedikit, sehingga tak ada tiga tugas yang lebih murah daripada `1 2 3`, dan empat tugas butuh 10 menit.

**Contoh setengah jadi.** Isi: `total`, `-=`, dan `++` (dengan `banyak++`). Urutan menaik menjamin tugas termurah diambil dulu.

**Soal Parsons.** Urutan: d, a, f, c, b, e. Perulangan `w` menurun agar tiap tugas dipakai paling banyak sekali.

**Latihan.** 1: greedy: layani yang tercepat lebih dulu, karena waktu layanan tiap pelanggan dihitung sebanyak pelanggan sesudahnya; `O(n log n)`; jumlah `long long`.

```cpp
#include <algorithm>
#include <iostream>
#include <vector>
using namespace std;

int main() {
  int n;
  cin >> n;
  vector<long long> layanan(n);
  for (long long& t : layanan) {
    cin >> t;
  }
  sort(layanan.begin(), layanan.end());
  long long tunggu = 0;
  long long total = 0;
  for (long long t : layanan) {
    total += tunggu;
    tunggu += t;
  }
  cout << total << "\n";
}
```

Masukan (`masukan.txt`):

```text
5
4 2 7 1 3
```

Keluaran:

```text
20
```

Terurut `1 2 3 4 7`: tunggu `0 + 1 + 3 + 6 + 10 = 20`. 2: BFS atas keadaan `(baris, kolom, dinding ditembus 0 atau 1)`, paling banyak `2 * r * c` keadaan dan empat sisi tiap keadaan: `O(r * c)`.

```cpp
#include <iostream>
#include <queue>
#include <string>
#include <vector>
using namespace std;

struct Keadaan {
  int baris;
  int kolom;
  int bobol;
};

int main() {
  int r;
  int c;
  cin >> r >> c;
  vector<string> peta(r);
  for (string& s : peta) {
    cin >> s;
  }
  int sb = 0;
  int sk = 0;
  int tb = 0;
  int tk = 0;
  for (int i = 0; i < r; i++) {
    for (int j = 0; j < c; j++) {
      if (peta[i][j] == 'S') {
        sb = i;
        sk = j;
      }
      if (peta[i][j] == 'T') {
        tb = i;
        tk = j;
      }
    }
  }
  vector<vector<vector<int>>> jarak(r, vector<vector<int>>(c, vector<int>(2, -1)));
  queue<Keadaan> antre;
  jarak[sb][sk][0] = 0;
  antre.push({sb, sk, 0});
  const int db[4] = {1, -1, 0, 0};
  const int dk[4] = {0, 0, 1, -1};
  while (!antre.empty()) {
    Keadaan u = antre.front();
    antre.pop();
    for (int a = 0; a < 4; a++) {
      int nb = u.baris + db[a];
      int nk = u.kolom + dk[a];
      if (nb < 0 || nb >= r || nk < 0 || nk >= c) {
        continue;
      }
      int nbobol = u.bobol + (peta[nb][nk] == '#' ? 1 : 0);
      if (nbobol > 1 || jarak[nb][nk][nbobol] != -1) {
        continue;
      }
      jarak[nb][nk][nbobol] = jarak[u.baris][u.kolom][u.bobol] + 1;
      antre.push({nb, nk, nbobol});
    }
  }
  int a0 = jarak[tb][tk][0];
  int a1 = jarak[tb][tk][1];
  int terbaik = -1;
  if (a0 != -1) {
    terbaik = a0;
  }
  if (a1 != -1 && (terbaik == -1 || a1 < terbaik)) {
    terbaik = a1;
  }
  cout << terbaik << "\n";
}
```

Masukan (`masukan.txt`):

```text
4 5
S.#..
.##.#
.#..T
.....
```

Keluaran:

```text
6
```

Jalur 6 langkah menembus satu dinding di baris pertama (`(0,1)`, `(0,2)` dinding, `(0,3)`, `(1,3)`, `(2,3)`, `(2,4)`); tanpa menembus, jalur terpendek 8 langkah. Uji yang perlu: peta dengan semua dinding (`-1`) dan awal bersebelahan dengan tujuan. 3: DP kombinasi dengan koin di perulangan luar: `cara[s] += cara[s - koin]`.

```cpp
#include <iostream>
#include <vector>
using namespace std;

int main() {
  int n;
  while (cin >> n) {
    const int koin[3] = {1, 2, 5};
    vector<long long> cara(n + 1, 0);
    cara[0] = 1;
    for (int k : koin) {
      for (int s = k; s <= n; s++) {
        cara[s] += cara[s - k];
      }
    }
    cout << cara[n] << "\n";
  }
}
```

Masukan (`masukan.txt`):

```text
10
5
1
```

Keluaran:

```text
10
4
1
```

Untuk 5: `5`, `2+2+1`, `2+1+1+1`, `1+1+1+1+1`: empat cara. 4: `multiset` menyimpan harga terurut dengan penghapusan dan pembacaan ujung `O(log n)`: `begin()` terkecil, `rbegin()` terbesar.

```cpp
#include <iostream>
#include <set>
using namespace std;

int main() {
  int q;
  cin >> q;
  multiset<int> catatan;
  for (int i = 0; i < q; i++) {
    char perintah;
    cin >> perintah;
    if (perintah == 'T') {
      int x;
      cin >> x;
      catatan.insert(x);
    } else if (perintah == 'H') {
      if (!catatan.empty()) {
        catatan.erase(catatan.begin());
      }
    } else {
      if (catatan.empty()) {
        cout << "kosong\n";
      } else {
        cout << *catatan.rbegin() << "\n";
      }
    }
  }
}
```

Masukan (`masukan.txt`):

```text
8
T 5
T 9
B
H
B
H
H
B
```

Keluaran:

```text
9
9
kosong
```

Perintah `H` pada catatan kosong tak berbuat apa-apa; `H` kedua menghapus 9 sehingga `B` terakhir mencetak `kosong`.

**Latihan bercampur.** 1: jumlah bisa mendekati `n^2 / 2 * 10^9`, jauh di atas `int`; `long long` memadai (sekitar `5 * 10^18`, batas `9,2 * 10^18`), dan kehati-hatian dibutuhkan karena sudah hampir batas. 2: sel yang sama bisa dicapai dengan atau tanpa menembus dinding, dan jarak pada dua keadaan itu berbeda serta menentukan lanjutan. 3: bila urutan penting, perulangan jumlah di luar dan koin di dalam; `cara[s] = sum cara[s - koin]`.

## Langkah berikutnya

Modul berikutnya, `a-xii2-m6` (latihan terpadu II), memuat kontes mini kelas berbatas waktu, juga tanpa AI. Modul terkait: `matkom-pertumbuhan-fungsi`. Bacaan lanjut: halaman resmi <https://osn.toki.id/> (hanya tautan, tanpa menyalin soal) dan halaman cppreference tentang `std::multiset`.
