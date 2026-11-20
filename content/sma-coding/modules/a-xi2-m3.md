## Untuk siapa modul ini

Modul ini untuk murid kelas XI jalur A (Algoritmik dengan C++), minggu `A-XI2-M3` silabus v1.4.1: knapsack 0/1. Prasyarat: modul `a-xi2-m2` (DP satu dimensi).

Modul ini berstatus DRAF: karangan penyusun, belum ditinjau pemilik. Butir `F-AP-a`, `F-AP-b`, dan `F-BK-b` dipetakan silabus sebagai dipenuhi jalur ini; modul draf ini belum dihitung sebagai pemenuhan. Keluarga materi OSN yang bertaut: `strategi-problem-solving`; DP termasuk panduan, bukan pengayaan, sehingga modul ini tidak punya bagian `Pengayaan (P)`. Modul tidak menjanjikan kedalaman soal OSN.

Tiap soal latihan bertanda `AI: boleh` atau `AI: tanpa AI`. Masukan program diberikan lewat berkas: `./program < masukan.txt`. Semua data karangan.

## Ingat kembali

Jawab dari ingatan dulu, baru cek di kunci. Soal 1 dari `a-xi2-m2`, soal 2 dari `a-xi1-m9`, soal 3 dari `a-xi1-m3`.

1. Apa tiga hal yang perlu ditentukan saat merumuskan DP satu dimensi?
2. Kira-kira berapa langkah memasukkan 1.000.000 kunci berbeda ke `map`, dan mengapa isinya selalu terurut menurut kunci?
3. Berapa banyak himpunan bagian dari `n` unsur, dan mengapa itu membatasi `n` pada pencarian lengkap?

## Tujuan

Setelah modul ini kamu dapat:

- merumuskan knapsack 0/1: tiap barang diambil paling banyak satu kali, dengan batas kapasitas;
- mengisi tabel dua dimensi `dp[i][c]` dan mencetak barang yang dipilih;
- mengecilkan tabel menjadi satu dimensi dan menjelaskan mengapa kapasitas diulang dari besar ke kecil;
- menghitung langkah dan memori `n * W` (keluaran minggu ini: program knapsack).

## Prediksi dulu

Ini tugas baca-dan-prediksi, `AI: tanpa AI`. **Tebak dulu, tulis jawabanmu, baru jalankan.** Hanya ada satu barang karangan: berat 2, nilai 3, dan kapasitas tas 6. Barang itu hanya boleh diambil sekali. Dua perulangan mengisi tabel satu dimensi, satu dengan kapasitas menaik dan satu menurun.

```cpp
#include <algorithm>
#include <iostream>
#include <vector>
using namespace std;

int main() {
  int W = 6;
  int berat = 2;
  int nilai = 3;
  vector<int> naik(W + 1, 0);
  vector<int> turun(W + 1, 0);
  for (int c = berat; c <= W; c++) {
    naik[c] = max(naik[c], naik[c - berat] + nilai);
  }
  for (int c = W; c >= berat; c--) {
    turun[c] = max(turun[c], turun[c - berat] + nilai);
  }
  cout << "naik " << naik[W] << ", turun " << turun[W] << "\n";
}
```

1. Apa yang tercetak?
2. Mana dari keduanya yang benar untuk satu barang? Mengapa yang lain keliru?

## Contoh terselesaikan

Perulangan menaik mencetak 9: barang yang sama terambil tiga kali. Untuk knapsack 0/1 yang benar, kita rumuskan dengan tiga langkah seperti modul sebelumnya.

1. **Arti `dp[i][c]`:** nilai terbesar yang dapat dibawa bila hanya barang `1` sampai `i` boleh dipilih dan kapasitas `c`.
2. **Nilai awal:** `dp[0][c] = 0` untuk semua `c` (tanpa barang, tak ada nilai).
3. **Peralihan:** barang `i` tidak diambil (`dp[i - 1][c]`) atau diambil bila muat (`dp[i - 1][c - berat[i]] + nilai[i]`). Ambil yang lebih besar.

Program berikut membaca barang, mengisi tabel, mencetak barang terpilih dengan mundur dari `dp[n][W]`, lalu membandingkannya dengan greedy menurut nilai per berat (dibandingkan dengan perkalian silang, tanpa bilangan pecahan) dan dengan tabel satu dimensi.

```cpp
#include <algorithm>
#include <iostream>
#include <vector>
using namespace std;

vector<int> berat;
vector<int> nilai;

bool lebihDulu(int a, int b) {
  return nilai[a] * berat[b] > nilai[b] * berat[a];
}

int main() {
  int n;
  int W;
  cin >> n >> W;
  berat.assign(n + 1, 0);
  nilai.assign(n + 1, 0);
  for (int i = 1; i <= n; i++) {
    cin >> berat[i] >> nilai[i];
  }
  vector<vector<int>> dp(n + 1, vector<int>(W + 1, 0));
  long long langkah = 0;
  for (int i = 1; i <= n; i++) {
    for (int c = 0; c <= W; c++) {
      langkah++;
      dp[i][c] = dp[i - 1][c];
      if (c >= berat[i]) {
        dp[i][c] = max(dp[i][c], dp[i - 1][c - berat[i]] + nilai[i]);
      }
    }
  }
  for (int i = 0; i <= n; i++) {
    cout << "i=" << i << ":";
    for (int c = 0; c <= W; c++) {
      cout << " " << dp[i][c];
    }
    cout << "\n";
  }
  cout << "nilai terbaik " << dp[n][W] << " (" << langkah << " langkah)\n";
  vector<int> dipakai;
  int sisa = W;
  for (int i = n; i >= 1; i--) {
    if (dp[i][sisa] != dp[i - 1][sisa]) {
      dipakai.push_back(i);
      sisa -= berat[i];
    }
  }
  cout << "barang dipakai:";
  for (int k = (int)dipakai.size() - 1; k >= 0; k--) {
    cout << " " << dipakai[k];
  }
  cout << "\n";
  vector<int> urut;
  for (int i = 1; i <= n; i++) {
    urut.push_back(i);
  }
  sort(urut.begin(), urut.end(), lebihDulu);
  int muat = W;
  int serakah = 0;
  for (int k = 0; k < n; k++) {
    int i = urut[k];
    if (berat[i] <= muat) {
      muat -= berat[i];
      serakah += nilai[i];
    }
  }
  vector<int> satu(W + 1, 0);
  for (int i = 1; i <= n; i++) {
    for (int c = W; c >= berat[i]; c--) {
      satu[c] = max(satu[c], satu[c - berat[i]] + nilai[i]);
    }
  }
  cout << "greedy nilai per berat: " << serakah << ", satu dimensi: " << satu[W] << ", sama dengan tabel: " << (satu[W] == dp[n][W] ? "ya" : "tidak") << "\n";
}
```

Masukan (`masukan.txt`):

```text
4 10
6 30
5 22
5 22
2 5
```

Keluaran:

```text
i=0: 0 0 0 0 0 0 0 0 0 0 0
i=1: 0 0 0 0 0 0 30 30 30 30 30
i=2: 0 0 0 0 0 22 30 30 30 30 30
i=3: 0 0 0 0 0 22 30 30 30 30 44
i=4: 0 0 5 5 5 22 30 30 35 35 44
nilai terbaik 44 (44 langkah)
barang dipakai: 2 3
greedy nilai per berat: 35, satu dimensi: 44, sama dengan tabel: ya
```

Baca angkanya. Greedy memilih barang pertama (nilai per berat terbesar, 5) dan hanya menyisakan barang berat 2: 35, padahal barang ke-2 dan ke-3 bersama memberi 44. Pencarian lengkap mencoba `2^n` himpunan bagian; tabel hanya `n * (W + 1)` langkah, sehingga `O(nW)` langkah dan `O(nW)` memori. Tabel satu dimensi menghasilkan nilai yang sama dengan memori `O(W)`, tetapi barang yang dipilih tak dapat dicetak dari tabel itu.

Mengapa kapasitas diulang dari besar ke kecil? Pada `dp[c]` satu dimensi, `dp[c - berat]` harus masih berisi keadaan **sebelum** barang `i`. Perulangan menurun membaca sel yang belum diubah pada putaran barang ini; perulangan menaik membaca sel yang sudah memasukkan barang `i`, sehingga barang terambil berkali-kali, seperti hasil 9 pada tebakanmu.

## Contoh setengah jadi

Tiga barang karangan berberat `2, 3, 4` dan bernilai `3, 4, 5`, kapasitas 5. Lengkapi knapsack satu dimensi.

```cpp setengah-jadi
vector<int> dp(W + 1, 0);
for (int i = 1; i <= n; i++) {
  for (int c = ____; c >= berat[i]; c--) {
    dp[c] = max(dp[c], dp[c - ____] + nilai[i]);
  }
}
cout << dp[____] << "\n";
```

## Soal Parsons

Susun tujuh baris berikut (sudah diacak) menjadi knapsack satu dimensi. `AI: tanpa AI`: tujuannya melatih membaca urutan.

```text
(a)     for (int c = W; c >= berat[i]; c--) {
(b)       dp[c] = max(dp[c], dp[c - berat[i]] + nilai[i]);
(c) vector<int> dp(W + 1, 0);
(d) for (int i = 1; i <= n; i++) {
(e)     }
(f)   }
(g) cout << dp[W] << "\n";
```

## Latihan

1. `AI: boleh` **Knapsack.** Tulis pseudocode lebih dulu, lalu program satu dimensi yang membaca `n`, `W`, dan `n` pasang berat dan nilai, lalu mencetak nilai terbaik. Uji `W = 0`, barang yang lebih berat dari `W`, dan semua barang muat.
2. `AI: tanpa AI` **Telusuri.** Untuk barang berberat `2, 3, 4` dan bernilai `3, 4, 5` dengan `W = 5`, isi tabel `dp[i][c]` dengan tangan. Barang mana yang terpilih?
3. `AI: boleh` **Jumlah tepat.** Diberikan `n` bilangan positif dan beberapa pertanyaan `S`, tentukan apakah ada himpunan bagian yang jumlahnya tepat `S`. Pakai `bisa[c]` bernilai benar atau salah dan perulangan menurun.
4. `AI: tanpa AI` **Pilih strategi.** Pilih pencarian lengkap, DP, atau tak satu pun, dengan perkiraan langkah: (a) `n = 20`, `W = 10^9`; (b) `n = 1000`, `W = 10^4`; (c) `n = 1000`, `W = 10^12`.
5. *Opsional:* **catatan pemakaian AI.** Bila memakai AI generatif, jawab nomor 2 sendiri dulu, lalu minta penjelasan atau petunjuk bertahap, bukan program jadi. Catat alatnya, tujuanmu, garis besar perintahmu, bagian yang kamu pakai, dan caramu memeriksanya. Jangan menaruh data pribadi atau tugas bernilai pada perintah.

## Latihan bercampur

1. `AI: boleh` Untuk `n = 20` barang, berapa himpunan bagian yang dicoba pencarian lengkap, dan layakkah pada pedoman seratus juta langkah per detik (modul `a-xi1-m3`)?
2. `AI: tanpa AI` Tabel `dp[i][c]` untuk `n = 1000` dan `W = 10^4` bertipe `int` memakai kira-kira berapa memori? Bandingkan dengan array dua dimensi biasa (modul `a-x2-m3`).
3. `AI: boleh` Tulis pencarian lengkap rekursif untuk contoh di atas (ambil atau lewati tiap barang) sebagai pembanding DP, dan cetak banyak pemanggilannya (teknik pembanding modul `a-xi1-m13`).

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `a-xi2-m4` (pertanyaan 1), sekitar tiga minggu lagi di `a-xi2-m6` (pertanyaan 2), dan sekitar delapan minggu lagi di `a-xi2-m11` (pertanyaan 3). Jawab sekarang lalu simpan.

1. Mengapa pada knapsack 0/1 satu dimensi kapasitas harus diulang dari besar ke kecil?
2. Berapa langkah dan memori DP knapsack untuk `n` barang dan kapasitas `W`?
3. Mengapa DP knapsack tidak layak bila `W = 10^12` meskipun `n` kecil, dan strategi apa yang masih mungkin?

## Kesalahan umum

- **Kapasitas diulang menaik pada tabel satu dimensi.** Barang terambil berkali-kali; itu knapsack lain, bukan 0/1.
- **Mengira greedy nilai per berat selalu benar.** Contoh di atas menunjukkan 35 melawan 44.
- **Lupa pemeriksaan `c >= berat[i]`.** Indeks `c - berat[i]` negatif keluar dari larik.
- **Tabel `int` untuk nilai yang besar.** Bila jumlah nilai bisa melewati `2.147.483.647`, pakai `long long`.
- **Membaca kapasitas sebagai banyak barang.** `n` banyak barang, `W` kapasitas; langkahnya `n * W`, bukan `n + W`.

## Cek mandiri

- [ ] Saya dapat menulis arti `dp[i][c]`, nilai awal, dan peralihan knapsack.
- [ ] Saya dapat mengisi tabel dan mencetak barang terpilih.
- [ ] Saya dapat menjelaskan mengapa kapasitas diulang menurun.
- [ ] Saya dapat menyebut langkah dan memori `n * W`.
- [ ] Saya dapat mencari data yang membuat greedy salah.

## Kunci dan petunjuk

**Ingat kembali.** 1: arti `dp[i]`, nilai awal, dan rumus peralihan. 2: sekitar `1.000.000 * 20 = 20.000.000` langkah; `map` disimpan dalam struktur pohon seimbang yang mengurutkan kunci (cppreference menyebut `set` biasanya berupa pohon merah-hitam; `map` terurut menurut kunci dengan cara serupa). 3: `2^n`; naik sangat cepat (`2^20` sekitar satu juta masih layak, `2^40` sekitar satu triliun tidak), sehingga pencarian lengkap hanya untuk `n` kecil.

**Prediksi dulu.** 1: `naik 9, turun 3`. 2: `turun`: satu barang hanya boleh sekali, nilainya 3. `naik` membaca `naik[c - berat]` yang sudah memasukkan barang itu, sehingga barang terambil tiga kali (`3 * 2 = 6` kapasitas, nilai 9).

**Contoh setengah jadi.** Isi: `W`, `berat[i]`, dan `W`. Program lengkap:

```cpp
#include <algorithm>
#include <iostream>
#include <vector>
using namespace std;

int main() {
  int n = 3;
  int W = 5;
  vector<int> berat = {0, 2, 3, 4};
  vector<int> nilai = {0, 3, 4, 5};
  vector<int> dp(W + 1, 0);
  for (int i = 1; i <= n; i++) {
    for (int c = W; c >= berat[i]; c--) {
      dp[c] = max(dp[c], dp[c - berat[i]] + nilai[i]);
    }
  }
  cout << dp[W] << "\n";
}
```

Keluaran:

```text
7
```

**Soal Parsons.** Urutan benar: c, d, a, b, e, f, g (baris `e` menutup perulangan `c`, baris `f` menutup perulangan `i`).

**Latihan.** 1: pseudocode: `dp[0..W] = 0`; untuk tiap barang `i`: untuk `c` dari `W` turun sampai `berat[i]`: `dp[c] = max(dp[c], dp[c - berat[i]] + nilai[i])`; cetak `dp[W]`. `W = 0` menguji bahwa tak ada barang yang muat; barang terlalu berat menguji bahwa perulangan dalam tak berjalan. Program contoh:

```cpp
#include <algorithm>
#include <iostream>
#include <vector>
using namespace std;

int main() {
  int n;
  int W;
  cin >> n >> W;
  vector<int> dp(W + 1, 0);
  for (int i = 0; i < n; i++) {
    int berat;
    int nilai;
    cin >> berat >> nilai;
    for (int c = W; c >= berat; c--) {
      dp[c] = max(dp[c], dp[c - berat] + nilai);
    }
  }
  cout << dp[W] << "\n";
}
```

Masukan (`masukan.txt`):

```text
3 0
1 5
2 6
3 7
```

Keluaran:

```text
0
```

Dengan `W = 0` tak ada barang yang muat sehingga hasilnya 0; ubah masukan untuk menguji dua keadaan lain. 2: baris `i = 0`: `0 0 0 0 0 0`; `i = 1`: `0 0 3 3 3 3`; `i = 2`: `0 0 3 4 4 7`; `i = 3`: `0 0 3 4 5 7`. Nilai terbaik 7; mundur dari `dp[3][5] = dp[2][5]` berarti barang 3 tidak dipakai, `dp[2][5] != dp[1][5]` berarti barang 2 dipakai (kapasitas sisa 2), `dp[1][2] != dp[0][2]` berarti barang 1 dipakai: barang 1 dan 2. 3: program contoh:

```cpp
#include <iostream>
#include <vector>
using namespace std;

int main() {
  int n;
  cin >> n;
  vector<int> a(n);
  int total = 0;
  for (int i = 0; i < n; i++) {
    cin >> a[i];
    total += a[i];
  }
  vector<bool> bisa(total + 1, false);
  bisa[0] = true;
  for (int i = 0; i < n; i++) {
    for (int c = total; c >= a[i]; c--) {
      if (bisa[c - a[i]]) {
        bisa[c] = true;
      }
    }
  }
  int q;
  cin >> q;
  for (int k = 0; k < q; k++) {
    int s;
    cin >> s;
    cout << s << ": " << (s <= total && bisa[s] ? "ada" : "tidak ada") << "\n";
  }
}
```

Masukan (`masukan.txt`):

```text
6
3 34 4 12 5 2
2
9
30
```

Keluaran:

```text
9: ada
30: tidak ada
```

Langkahnya `n * total`. 4: (a) pencarian lengkap: `2^20` sekitar satu juta himpunan bagian, layak; DP memerlukan `20 * 10^9 = 2 * 10^10` langkah dan larik raksasa, tidak layak. (b) DP: `1000 * 10^4 = 10^7` langkah, layak; pencarian lengkap `2^1000` mustahil. (c) tak satu pun dengan cara ini: DP `1000 * 10^12 = 10^15` langkah dan memori `10^12`; pencarian lengkap `2^1000`.

**Latihan bercampur.** 1: `2^20 = 1.048.576` himpunan bagian; sekitar satu juta langkah dasar jauh di bawah seratus juta per detik, jadi layak. 2: `1000 * 10001 * 4` bita, sekitar 40 MB; array dua dimensi biasa dengan jumlah sel yang sama memakai memori yang sama, jadi ukuran tabel dihitung dulu sebelum memilih rumusan. 3: program:

```cpp
#include <algorithm>
#include <iostream>
#include <vector>
using namespace std;

vector<int> berat = {0, 6, 5, 5, 2};
vector<int> nilai = {0, 30, 22, 22, 5};
long long panggilan = 0;

int lengkap(int i, int sisa) {
  panggilan++;
  if (i > 4) {
    return 0;
  }
  int terbaik = lengkap(i + 1, sisa);
  if (berat[i] <= sisa) {
    terbaik = max(terbaik, nilai[i] + lengkap(i + 1, sisa - berat[i]));
  }
  return terbaik;
}

int main() {
  int hasil = lengkap(1, 10);
  cout << "lengkap " << hasil << " (" << panggilan << " panggilan)\n";
}
```

Keluaran:

```text
lengkap 44 (20 panggilan)
```

Hasilnya 44, sama dengan tabel; pemanggilannya bertambah berlipat dengan `n`, sedangkan tabel `n * (W + 1)`.

**Ulang berjarak.** 1: agar `dp[c - berat]` masih berisi keadaan sebelum barang ini; perulangan menaik membaca sel yang sudah memasukkan barang yang sama sehingga barang terambil berulang. 2: `O(n * W)` langkah; `O(n * W)` memori untuk tabel dua dimensi dan `O(W)` untuk satu dimensi. 3: langkahnya `n * W` dan tabelnya sepanjang `W + 1` sel, keduanya tumbuh bersama `W`, sehingga `W` raksasa tak muat dan tak selesai; bila `n` sangat kecil (sekitar 20 ke bawah) pencarian lengkap `2^n` masih mungkin.

## Langkah berikutnya

Modul berikut: `a-xi2-m4` (DP pada string, pengayaan: tabel dua dimensi untuk dua barisan). Modul terkait: `matkom-himpunan-relasi-fungsi` (himpunan bagian). Bacaan lanjut: halaman cppreference tentang `std::max` dan `std::vector`.
