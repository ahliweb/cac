## Untuk siapa modul ini

Modul ini untuk murid kelas XI jalur A (Algoritmik dengan C++), minggu `A-XI2-M5` silabus v1.4.1: graf dan representasinya. Prasyarat: modul `a-xi2-m4` (urutan modul; materi DP string tidak dipakai di sini), `a-x2-m3` (array dua dimensi), dan `a-x2-m6` (`vector`).

Modul ini karangan penyusun dan disetujui pemilik program pada 2026-11-20 (keputusan lewat dialog; catatan tinjauan menjadi tindak lanjut revisi). Butir `F-BK-c` dipetakan silabus sebagai dipenuhi jalur ini; pemenuhan butir mengikuti pemetaan silabus, bukan status modul. Keluarga materi OSN yang bertaut: `graph-tree`, yang seluruhnya ditandai pengayaan (P) di jembatan OSN (graf tidak disebut di butir CP yang dikutip silabus). Maka kelas reguler boleh melewati modul ini beserta `a-xi2-m6`, `a-xi2-m7`, dan `a-xi2-m8`; murid yang menuju OSN mengerjakannya. Modul tidak menjanjikan kedalaman soal OSN.

Tiap soal latihan bertanda `AI: boleh` atau `AI: tanpa AI`. Masukan program diberikan lewat berkas: `./program < masukan.txt`. Semua data karangan.

## Ingat kembali

Jawab dari ingatan dulu, baru cek di kunci. Soal 1 dari `a-xi2-m4`, soal 2 dari `a-xi2-m2`, soal 3 dari `a-xi1-m11`, soal 4 dari `a-x2-m6`.

1. Apa beda subsekuens dan substring?
2. Bagaimana mencetak pilihan yang menghasilkan nilai terbaik dari tabel DP?
3. Berapa banyak permutasi `n` unsur, dan mengapa itu membatasi `n` pada pencarian lengkap?
4. Apa yang dilakukan `push_back` dan `pop_back`?

## Tujuan

Setelah modul ini kamu dapat:

- menyebut istilah graf: simpul, sisi, tetangga, derajat, berarah dan tak berarah;
- membaca graf dari masukan ke matriks ketetanggaan dan ke daftar ketetanggaan;
- menghitung derajat tiap simpul dan memeriksa apakah dua simpul bertetangga;
- memilih representasi dengan alasan yang menyebut memori dan langkah (keluaran minggu ini: program graf).

## Prediksi dulu

Ini tugas baca-dan-prediksi, `AI: tanpa AI`. **Tebak dulu, tulis jawabanmu, baru jalankan.** Graf adalah kumpulan **simpul** (titik) yang dihubungkan **sisi** (garis). Lima desa karangan bernomor 1 sampai 5 dan empat jalan dua arah. Daftar `adj[i]` menyimpan tetangga desa `i`.

```cpp
#include <iostream>
#include <vector>
using namespace std;

int main() {
  vector<vector<int>> adj(6);
  int sisi[4][2] = {{1, 2}, {1, 3}, {2, 3}, {4, 5}};
  for (int k = 0; k < 4; k++) {
    int u = sisi[k][0];
    int v = sisi[k][1];
    adj[u].push_back(v);
    adj[v].push_back(u);
  }
  int jumlah = 0;
  for (int i = 1; i <= 5; i++) {
    cout << "desa " << i << ": " << adj[i].size() << " tetangga\n";
    jumlah += adj[i].size();
  }
  cout << "jumlah " << jumlah << "\n";
}
```

1. Berapa tetangga tiap desa?
2. Berapa `jumlah`, dan apa hubungannya dengan empat sisi?

## Contoh terselesaikan

Banyak tetangga sebuah simpul disebut **derajatnya**. Pada graf tak berarah tiap sisi dihitung dua kali (sekali di tiap ujung), sehingga jumlah semua derajat sama dengan dua kali banyak sisi. Ada dua cara menyimpan graf dengan `n` simpul dan `m` sisi.

- **Matriks ketetanggaan:** tabel `n` kali `n`; `mat[u][v] = 1` bila ada sisi dari `u` ke `v`. Memeriksa sisi satu langkah, tetapi memorinya `n * n` sel walau sisinya sedikit, dan menelusuri tetangga satu simpul memerlukan `n` langkah.
- **Daftar ketetanggaan:** `adj[u]` berisi tetangga `u`. Memorinya `n + 2m` entri (tak berarah); menelusuri tetangga `u` hanya sebanyak derajatnya, tetapi memeriksa satu sisi bisa selambat derajat simpul itu.

Program berikut membaca graf, membangun keduanya, mencetak daftar, memeriksa jumlah derajat, lalu menjawab pertanyaan "ada sisi `a`-`b`?" sambil menghitung langkah masing-masing representasi.

```cpp
#include <iostream>
#include <vector>
using namespace std;

int main() {
  int n;
  int m;
  cin >> n >> m;
  vector<vector<int>> mat(n + 1, vector<int>(n + 1, 0));
  vector<vector<int>> adj(n + 1);
  for (int k = 0; k < m; k++) {
    int u;
    int v;
    cin >> u >> v;
    mat[u][v] = 1;
    mat[v][u] = 1;
    adj[u].push_back(v);
    adj[v].push_back(u);
  }
  int jumlah = 0;
  for (int i = 1; i <= n; i++) {
    cout << i << " (derajat " << adj[i].size() << "):";
    for (int v : adj[i]) {
      cout << " " << v;
    }
    cout << "\n";
    jumlah += adj[i].size();
  }
  cout << "jumlah derajat " << jumlah << ", dua kali sisi " << 2 * m << "\n";
  cout << "sel matriks " << (n + 1) * (n + 1) << ", entri daftar " << jumlah << "\n";
  int q;
  cin >> q;
  for (int k = 0; k < q; k++) {
    int a;
    int b;
    cin >> a >> b;
    int langkah = 0;
    bool ada = false;
    for (int v : adj[a]) {
      langkah++;
      if (v == b) {
        ada = true;
        break;
      }
    }
    cout << a << "-" << b << ": matriks " << (mat[a][b] ? "ada" : "tidak") << " (1 langkah), daftar " << (ada ? "ada" : "tidak") << " (" << langkah << " langkah)\n";
  }
}
```

Masukan (`masukan.txt`):

```text
6 7
1 2
1 3
2 3
2 4
3 5
4 5
5 6
3
3 5
2 5
6 1
```

Keluaran:

```text
1 (derajat 2): 2 3
2 (derajat 3): 1 3 4
3 (derajat 3): 1 2 5
4 (derajat 2): 2 5
5 (derajat 3): 3 4 6
6 (derajat 1): 5
jumlah derajat 14, dua kali sisi 14
sel matriks 49, entri daftar 14
3-5: matriks ada (1 langkah), daftar ada (3 langkah)
2-5: matriks tidak (1 langkah), daftar tidak (3 langkah)
6-1: matriks tidak (1 langkah), daftar tidak (1 langkah)
```

Baca angkanya. Jumlah derajat 14 sama dengan `2 * 7`. Daftar menyimpan 14 entri, matriks 49 sel. Pada graf sekecil ini bedanya tak terasa; ia terasa pada graf besar. Untuk 100.000 simpul dan 200.000 sisi, matriks memerlukan sekitar `10^10` sel, sedangkan daftar hanya 400.000 entri. Karena itu graf jarang (sisi jauh lebih sedikit dari `n * n`) hampir selalu disimpan sebagai daftar; matriks cocok bila `n` kecil (sekitar seribu ke bawah) atau pemeriksaan sisi sangat sering. Menelusuri semua tetangga dan semua simpul `O(n + m)` dengan daftar dan `O(n * n)` dengan matriks.

## Contoh setengah jadi

Lengkapi pembacaan sisi tak berarah ke daftar ketetanggaan.

```cpp setengah-jadi
for (int k = 0; k < m; k++) {
  int u;
  int v;
  cin >> u >> v;
  adj[u].push_back(____);
  adj[____].push_back(u);
}
```

## Soal Parsons

Susun tujuh baris berikut (sudah diacak, tanpa lekuk) menjadi pembacaan graf. Deklarasi `int n, m, u, v;` sudah ada di atasnya. `AI: tanpa AI`: tujuannya melatih membaca urutan.

```text
(a) cin >> n >> m;
(b) adj[u].push_back(v);
(c) for (int k = 0; k < m; k++) {
(d) vector<vector<int>> adj(n + 1);
(e) adj[v].push_back(u);
(f) cin >> u >> v;
(g) }
```

## Latihan

1. `AI: boleh` **Derajat.** Tulis pseudocode lebih dulu, lalu program yang membaca graf tak berarah, mencetak derajat tiap simpul, dan mencetak simpul berderajat terbesar (nomor terkecil bila sama). Uji graf tanpa sisi, satu simpul, dan simpul terisolasi.
2. `AI: tanpa AI` **Gambar.** Daftar ketetanggaan sebuah graf: `1: 2 3`, `2: 1 3 4`, `3: 1 2`, `4: 2`. Gambar grafnya, tulis matriks 4 kali 4, dan hitung banyak sisi dari jumlah derajat.
3. `AI: boleh` **Berarah.** Pada graf berarah, baris `u v` berarti sisi dari `u` ke `v` saja. Cetak derajat keluar dan derajat masuk tiap simpul.
4. `AI: boleh` **Sisi ganda.** Bila masukan memuat sisi yang sama dua kali, daftar menyimpan tetangga dua kali. Ubah program agar memakai matriks untuk mengabaikan duplikat dan mencetak banyak sisi unik.
5. *Opsional:* **catatan pemakaian AI.** Bila memakai AI generatif, jawab nomor 2 sendiri dulu, lalu minta penjelasan atau petunjuk bertahap, bukan program jadi. Catat alatnya, tujuanmu, garis besar perintahmu, bagian yang kamu pakai, dan caramu memeriksanya. Jangan menaruh data pribadi atau tugas bernilai pada perintah.

## Latihan bercampur

1. `AI: boleh` Pada `vector<vector<int>> adj`, baris-barisnya boleh berbeda panjang. Apa yang tidak mungkin pada array dua dimensi biasa (modul `a-x2-m3`), dan mengapa itu cocok untuk graf?
2. `AI: tanpa AI` Bagaimana mengganti `vector<int>` tiap simpul dengan `set<int>` agar duplikat hilang sendiri dan pemeriksaan sisi `O(log n)` (modul `a-xi1-m9`)? Apa harganya?
3. `AI: boleh` Tabel LCS dua kata sepanjang `m` dan `n` memerlukan `m * n` sel (modul `a-xi2-m4`), seperti matriks ketetanggaan `n * n`. Kapan keduanya terlalu besar untuk memori?

## Pengayaan (P)

Bagian ini boleh dilewati; ia bukan syarat modul berikutnya. Graf **berbobot** memberi tiap sisi sebuah angka (jarak, biaya). Daftar ketetanggaan menyimpan pasangan `(tetangga, bobot)` memakai `pair` (modul `a-xi1-m9`). Cara lain adalah **daftar sisi**: satu `vector` berisi semua `(u, v, bobot)`, cocok bila sisi diurutkan atau diproses satu per satu.

```cpp
#include <iostream>
#include <utility>
#include <vector>
using namespace std;

int main() {
  int n = 4;
  vector<vector<pair<int, int>>> adj(n + 1);
  int sisi[4][3] = {{1, 2, 5}, {1, 3, 2}, {2, 3, 1}, {3, 4, 7}};
  int total = 0;
  for (int k = 0; k < 4; k++) {
    int u = sisi[k][0];
    int v = sisi[k][1];
    int w = sisi[k][2];
    adj[u].push_back({v, w});
    adj[v].push_back({u, w});
    total += w;
  }
  for (int i = 1; i <= n; i++) {
    cout << i << ":";
    for (pair<int, int> p : adj[i]) {
      cout << " (" << p.first << ", bobot " << p.second << ")";
    }
    cout << "\n";
  }
  cout << "jumlah bobot semua sisi " << total << "\n";
}
```

Keluaran:

```text
1: (2, bobot 5) (3, bobot 2)
2: (1, bobot 5) (3, bobot 1)
3: (1, bobot 2) (2, bobot 1) (4, bobot 7)
4: (3, bobot 7)
jumlah bobot semua sisi 15
```

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `a-xi2-m6` (pertanyaan 1), sekitar tiga minggu lagi di `a-xi2-m8` (pertanyaan 1), dan sekitar delapan minggu lagi di `a-xi2-m13` (pertanyaan 3). Jawab sekarang lalu simpan.

1. Kapan memilih matriks ketetanggaan dan kapan daftar ketetanggaan?
2. Pada graf tak berarah, mengapa jumlah semua derajat sama dengan dua kali banyak sisi?
3. Kira-kira berapa entri daftar ketetanggaan untuk 100.000 simpul dan 200.000 sisi tak berarah, dan mengapa matriksnya tak muat?

## Kesalahan umum

- **Hanya menambah satu arah pada graf tak berarah.** `adj[u]` memuat `v` tetapi `adj[v]` tidak memuat `u`; telusuran dari `v` melewatkan sisi itu.
- **Larik berukuran `n`, simpul bernomor 1 sampai `n`.** Indeks `n` keluar dari larik; pakai ukuran `n + 1`.
- **Memakai matriks untuk graf besar yang jarang.** `n * n` sel tidak muat walau sisinya sedikit.
- **Menghitung jumlah sisi dari jumlah derajat tanpa membagi dua.** Pada graf tak berarah jumlah derajat adalah `2m`.
- **Tidak memperhatikan sisi ganda dan gelung.** Sisi `u u` atau sisi berulang mengubah derajat; tetapkan aturannya sebelum membaca.

## Cek mandiri

- [ ] Saya dapat menyebut simpul, sisi, tetangga, dan derajat.
- [ ] Saya dapat membaca graf ke matriks dan ke daftar ketetanggaan.
- [ ] Saya dapat menghitung derajat tiap simpul.
- [ ] Saya dapat menyebut memori dan langkah tiap representasi.
- [ ] Saya dapat memilih representasi dengan alasan.

## Kunci dan petunjuk

**Ingat kembali.** 1: subsekuens boleh melompati huruf asal urutan terjaga; substring harus berupa huruf yang berdekatan tanpa lompatan. 2: mundur dari `dp[n]`: bila `dp[i] == dp[i - 1]` item `i` tak dipakai, bila tidak ia dipakai dan indeks loncat sesuai rumus (`i - 2` pada pemetik); simpan juga pilihan tiap sel bila rumusnya rumit. 3: `n!`; naik sangat cepat (10 unsur sudah 3.628.800), sehingga pencarian lengkap hanya untuk `n` kecil. 4: `push_back` menambah elemen di ujung; `pop_back` membuang elemen di ujung.

**Prediksi dulu.** 1: desa 1: 2, desa 2: 2, desa 3: 2, desa 4: 1, desa 5: 1. 2: `jumlah 8`, dua kali empat sisi, karena tiap sisi dihitung di kedua ujungnya. Keluaran sebenarnya:

```text
desa 1: 2 tetangga
desa 2: 2 tetangga
desa 3: 2 tetangga
desa 4: 1 tetangga
desa 5: 1 tetangga
jumlah 8
```

**Contoh setengah jadi.** Isi: `v` dan `v`. Program lengkap:

```cpp
#include <iostream>
#include <vector>
using namespace std;

int main() {
  int n;
  int m;
  cin >> n >> m;
  vector<vector<int>> adj(n + 1);
  for (int k = 0; k < m; k++) {
    int u;
    int v;
    cin >> u >> v;
    adj[u].push_back(v);
    adj[v].push_back(u);
  }
  for (int i = 1; i <= n; i++) {
    cout << i << ":";
    for (int v : adj[i]) {
      cout << " " << v;
    }
    cout << "\n";
  }
}
```

Masukan (`masukan.txt`):

```text
4 3
1 2
2 3
3 4
```

Keluaran:

```text
1: 2
2: 1 3
3: 2 4
4: 3
```

**Soal Parsons.** Urutan benar: a, d, c, f, b, e, g (b dan e boleh bertukar tempat).

**Latihan.** 1: pseudocode: baca graf; untuk tiap simpul `i`: `derajat[i] = adj[i].size()`; simpan `i` dengan derajat terbesar (ganti hanya bila benar-benar lebih besar agar nomor terkecil menang); cetak. Program contoh:

```cpp
#include <iostream>
#include <vector>
using namespace std;

int main() {
  int n;
  int m;
  cin >> n >> m;
  vector<int> derajat(n + 1, 0);
  for (int k = 0; k < m; k++) {
    int u;
    int v;
    cin >> u >> v;
    derajat[u]++;
    derajat[v]++;
  }
  int terbaik = 1;
  for (int i = 1; i <= n; i++) {
    cout << "derajat " << i << " = " << derajat[i] << "\n";
    if (derajat[i] > derajat[terbaik]) {
      terbaik = i;
    }
  }
  cout << "terbesar: simpul " << terbaik << "\n";
}
```

Masukan (`masukan.txt`):

```text
5 4
1 2
1 3
1 4
4 5
```

Keluaran:

```text
derajat 1 = 3
derajat 2 = 1
derajat 3 = 1
derajat 4 = 2
derajat 5 = 1
terbesar: simpul 1
```

Untuk derajat saja daftar penuh tak diperlukan; larik penghitung cukup. Uji `m = 0` (semua derajat 0, hasil simpul 1), `n = 1`, dan simpul terisolasi (derajat 0 tak boleh membuat program salah). 2: grafnya: 1-2, 1-3, 2-3, 2-4. Matriks (baris 1 sampai 4): `0 1 1 0`, `1 0 1 1`, `1 1 0 0`, `0 1 0 0`. Jumlah derajat `2 + 3 + 2 + 1 = 8`, jadi 4 sisi. 3: program contoh:

```cpp
#include <iostream>
#include <vector>
using namespace std;

int main() {
  int n;
  int m;
  cin >> n >> m;
  vector<int> keluar(n + 1, 0);
  vector<int> masuk(n + 1, 0);
  for (int k = 0; k < m; k++) {
    int u;
    int v;
    cin >> u >> v;
    keluar[u]++;
    masuk[v]++;
  }
  for (int i = 1; i <= n; i++) {
    cout << i << ": keluar " << keluar[i] << ", masuk " << masuk[i] << "\n";
  }
}
```

Masukan (`masukan.txt`):

```text
4 4
1 2
1 3
3 2
4 1
```

Keluaran:

```text
1: keluar 2, masuk 1
2: keluar 0, masuk 2
3: keluar 1, masuk 1
4: keluar 1, masuk 0
```

Jumlah derajat keluar dan jumlah derajat masuk masing-masing sama dengan `m`. 4: program contoh:

```cpp
#include <iostream>
#include <vector>
using namespace std;

int main() {
  int n;
  int m;
  cin >> n >> m;
  vector<vector<int>> mat(n + 1, vector<int>(n + 1, 0));
  int unik = 0;
  for (int k = 0; k < m; k++) {
    int u;
    int v;
    cin >> u >> v;
    if (u != v && mat[u][v] == 0) {
      mat[u][v] = 1;
      mat[v][u] = 1;
      unik++;
    }
  }
  cout << "sisi unik: " << unik << " dari " << m << " baris\n";
}
```

Masukan (`masukan.txt`):

```text
4 6
1 2
2 1
2 3
3 3
2 3
3 4
```

Keluaran:

```text
sisi unik: 3 dari 6 baris
```

**Latihan bercampur.** 1: pada array dua dimensi biasa tiap baris sama panjang (`n` kolom); pada graf jarang kebanyakan baris pendek, sehingga baris berbeda panjang menghemat memori sebesar sel kosong matriks. 2: ganti `vector<int>` dengan `set<int>` dan pakai `insert`; duplikat tak masuk dua kali dan `adj[a].count(b)` memeriksa sisi dalam `O(log n)`; harganya memori lebih besar per entri dan penelusuran tetangga lebih lambat daripada `vector`. 3: bila hasil kali itu mendekati atau melewati jumlah sel yang muat di memori (misalnya `10^5 * 10^5 = 10^10` sel); pada `10^4 * 10^4 * 4` bita sekitar 400 MB sudah berat.

**Pengayaan (P).** Keluaran di atas menunjukkan tiap pasangan beserta bobotnya; jumlah bobot semua sisi dihitung satu kali per sisi (`5 + 2 + 1 + 7 = 15`), bukan dua kali walau tiap sisi masuk dua daftar.

**Ulang berjarak.** 1: daftar bila graf jarang atau `n` besar, karena memorinya `n + 2m` dan menelusuri tetangga hanya sebanyak derajat; matriks bila `n` kecil dan pemeriksaan sisi sangat sering, karena satu langkah tetapi memori `n * n`. 2: karena tiap sisi memiliki dua ujung dan menambah derajat kedua ujungnya masing-masing satu. 3: `2 * 200.000 = 400.000` entri (ditambah satu daftar per simpul); matriks `100.000 * 100.000 = 10^10` sel, jauh di atas memori yang lazim tersedia.

## Langkah berikutnya

Modul berikut: `a-xi2-m6` (BFS: menelusuri graf melebar dan mencari jarak terpendek tak berbobot). Modul terkait: `matkom-himpunan-relasi-fungsi` (relasi sebagai graf). Bacaan lanjut: halaman cppreference tentang `std::vector` dan `std::pair`.
