## Untuk siapa modul ini

Modul ini untuk murid kelas XI jalur A (Algoritmik dengan C++), minggu `A-XI2-M7` silabus v1.4.1: DFS (penelusuran mendalam) dan keterhubungan. Prasyarat: modul `a-xi2-m6` (BFS) dan `a-x2-m11` (pengantar rekursi).

Modul ini berstatus DRAF: karangan penyusun, belum ditinjau pemilik. Butir `F-BK-c` dipetakan silabus sebagai dipenuhi jalur ini; modul draf ini belum dihitung sebagai pemenuhan. Keluarga materi OSN yang bertaut: `graph-tree`, yang seluruhnya ditandai pengayaan (P) di jembatan OSN, sehingga kelas reguler boleh melewati modul ini. Modul tidak menjanjikan kedalaman soal OSN.

Tiap soal latihan bertanda `AI: boleh` atau `AI: tanpa AI`. Masukan program diberikan lewat berkas: `./program < masukan.txt`. Semua data karangan.

## Ingat kembali

Jawab dari ingatan dulu, baru cek di kunci. Soal 1 dari `a-xi2-m6`, soal 2 dari `a-xi2-m4`, soal 3 dari `a-xi1-m13`, soal 4 dari `a-x2-m11`.

1. Mengapa BFS memakai antrian dan dapat menemukan jarak terpendek pada graf tak berbobot?
2. Dari sel mana saja nilai `dp[i][j]` pada LCS dihitung, dan mengapa tabel diisi dari atas ke bawah dan kiri ke kanan?
3. Bagaimana memberi umpan balik sejawat yang spesifik dalam tiga kalimat?
4. Mengapa rekursi tanpa kasus dasar berbahaya, dan apa hubungannya dengan tumpukan pemanggilan?

## Tujuan

Setelah modul ini kamu dapat:

- menelusuri graf **mendalam**: menyusuri satu cabang sampai buntu, lalu kembali dan mencoba cabang lain;
- menulis DFS rekursif dengan larik penanda `sudah`;
- menghitung banyak komponen terhubung dan ukuran tiap komponen, serta menjawab apakah dua simpul terhubung;
- menyebut langkah DFS dan batas kedalaman rekursinya (keluaran minggu ini: program DFS).

## Prediksi dulu

Ini tugas baca-dan-prediksi, `AI: tanpa AI`. **Tebak dulu, tulis jawabanmu, baru jalankan.** Graf desa yang sama dengan modul BFS: jalan 1-2, 1-3, 2-4, 3-4, dan 4-5, mulai dari desa 1. Kali ini fungsi memanggil dirinya untuk tetangga pertama yang belum dikunjungi sebelum mencoba tetangga lainnya.

```cpp
#include <iostream>
#include <vector>
using namespace std;

vector<vector<int>> adj(6);
vector<bool> sudah(6, false);

void dfs(int u) {
  sudah[u] = true;
  cout << u << " ";
  for (int v : adj[u]) {
    if (!sudah[v]) {
      dfs(v);
    }
  }
}

int main() {
  int sisi[5][2] = {{1, 2}, {1, 3}, {2, 4}, {3, 4}, {4, 5}};
  for (int k = 0; k < 5; k++) {
    adj[sisi[k][0]].push_back(sisi[k][1]);
    adj[sisi[k][1]].push_back(sisi[k][0]);
  }
  dfs(1);
  cout << "\n";
}
```

1. Dalam urutan apa desa dicetak?
2. Apa bedanya dengan urutan BFS dari desa yang sama pada modul sebelumnya?

## Contoh terselesaikan

Telusuri dengan tangan: `dfs(1)` memilih tetangga pertama, 2; `dfs(2)` memilih 1 (sudah) lalu 4; `dfs(4)` memilih 2 (sudah), lalu 3; `dfs(3)` hanya bertetangga dengan 1 dan 4 yang sudah dikunjungi, sehingga kembali ke `dfs(4)`, yang lalu mengunjungi 5. DFS mengikuti satu cabang sedalam mungkin; bantuan tumpukan pemanggilan (modul `a-x2-m11`) menyimpan jalan pulangnya. Seperti BFS, simpul ditandai segera saat dikunjungi, sehingga tiap simpul diproses sekali.

Gunakan DFS untuk **keterhubungan**. Dua simpul **terhubung** bila ada jalur di antaranya; himpunan simpul yang saling terhubung disebut **komponen**. Cara menghitungnya: untuk tiap simpul `i` yang belum dikunjungi, mulai DFS baru dari `i` dan tandai semua yang tercapai dengan nomor komponen yang sama. Banyak DFS baru yang dimulai sama dengan banyak komponen. Program berikut membaca graf, menghitung komponen beserta ukurannya, dan menjawab pertanyaan "apakah `a` dan `b` terhubung?"

```cpp
#include <iostream>
#include <vector>
using namespace std;

int n;
vector<vector<int>> adj;
vector<int> komp;
long long langkah = 0;

void dfs(int u, int nomor) {
  komp[u] = nomor;
  langkah++;
  for (int v : adj[u]) {
    langkah++;
    if (komp[v] == 0) {
      dfs(v, nomor);
    }
  }
}

int main() {
  int m;
  cin >> n >> m;
  adj.assign(n + 1, vector<int>());
  komp.assign(n + 1, 0);
  for (int k = 0; k < m; k++) {
    int u;
    int v;
    cin >> u >> v;
    adj[u].push_back(v);
    adj[v].push_back(u);
  }
  int banyak = 0;
  for (int i = 1; i <= n; i++) {
    if (komp[i] == 0) {
      banyak++;
      dfs(i, banyak);
    }
  }
  cout << "komponen: " << banyak << "\n";
  for (int nomor = 1; nomor <= banyak; nomor++) {
    int ukuran = 0;
    for (int i = 1; i <= n; i++) {
      if (komp[i] == nomor) {
        ukuran++;
      }
    }
    cout << "komponen " << nomor << ": " << ukuran << " simpul\n";
  }
  int q;
  cin >> q;
  for (int k = 0; k < q; k++) {
    int a;
    int b;
    cin >> a >> b;
    cout << a << " dan " << b << ": " << (komp[a] == komp[b] ? "terhubung" : "tidak terhubung") << "\n";
  }
  cout << "langkah " << langkah << "\n";
}
```

Masukan (`masukan.txt`):

```text
10 7
1 2
2 3
3 1
4 5
6 7
7 8
8 6
3
1 3
3 4
9 9
```

Keluaran:

```text
komponen: 5
komponen 1: 3 simpul
komponen 2: 2 simpul
komponen 3: 3 simpul
komponen 4: 1 simpul
komponen 5: 1 simpul
1 dan 3: terhubung
3 dan 4: tidak terhubung
9 dan 9: terhubung
langkah 24
```

Baca angkanya. Ada lima komponen: `{1, 2, 3}`, `{4, 5}`, `{6, 7, 8}`, serta simpul 9 dan 10 yang terisolasi. Langkah `10 + 2 * 7 = 24`: tiap simpul dimasuki sekali dan tiap sisi diperiksa dari kedua ujungnya, jadi DFS memerlukan `O(n + m)` langkah dengan daftar ketetanggaan, sama dengan BFS. Pilihan di antara keduanya: BFS bila yang dicari jarak terpendek; DFS bila cukup keterhubungan dan struktur. Satu peringatan: rekursi menambah satu bingkai per simpul pada jalur, sehingga untuk graf berbentuk rantai dengan `n` sangat besar kedalaman rekursi sebesar `n` dapat menghabiskan tumpukan pemanggilan yang terbatas. Versi dengan `stack` sendiri ada di bagian pengayaan.

## Contoh setengah jadi

Lengkapi DFS rekursif.

```cpp setengah-jadi
void dfs(int u) {
  sudah[u] = ____;
  for (int v : adj[u]) {
    if (!____[v]) {
      dfs(____);
    }
  }
}
```

## Soal Parsons

Susun delapan baris berikut (sudah diacak, tanpa lekuk) menjadi penghitung komponen di `main`. Larik `sudah` dan fungsi `dfs(int u)` sudah ada. `AI: tanpa AI`: tujuannya melatih membaca urutan.

```text
(a) dfs(i);
(b) }
(c) for (int i = 1; i <= n; i++) {
(d) cout << komponen << "\n";
(e) komponen++;
(f) int komponen = 0;
(g) if (!sudah[i]) {
(h) }
```

## Latihan

1. `AI: boleh` **Komponen.** Tulis pseudocode lebih dulu, lalu program yang membaca graf dan mencetak banyak komponen dan ukuran komponen terbesar. Uji `m = 0`, graf yang terhubung penuh, dan simpul terisolasi.
2. `AI: tanpa AI` **Telusuri.** Untuk graf pada `Prediksi dulu` tetapi mulai dari desa 5, tulis urutan kunjungan DFS.
3. `AI: boleh` **Kelompok pesan.** Murid karangan bernomor 1 sampai `n`; sepasang murid saling meneruskan pesan bila terhubung. Cetak anggota tiap kelompok dalam urutan menaik.
4. `AI: boleh` **Apakah pohon?** Graf tak berarah dengan `n` simpul adalah pohon bila terhubung dan `m = n - 1`. Tulis program yang mencetak `ya` atau `tidak`.
5. *Opsional:* **catatan pemakaian AI.** Bila memakai AI generatif, jawab nomor 2 sendiri dulu, lalu minta penjelasan atau petunjuk bertahap, bukan program jadi. Catat alatnya, tujuanmu, garis besar perintahmu, bagian yang kamu pakai, dan caramu memeriksanya. Jangan menaruh data pribadi atau tugas bernilai pada perintah.

## Latihan bercampur

1. `AI: tanpa AI` Mengapa DFS rekursif pada rantai sejuta simpul berisiko, dan apa hubungannya dengan tumpukan pemanggilan (modul `a-x2-m11`)?
2. `AI: boleh` Tulis urutan kunjungan BFS dan DFS dari desa 1 pada graf `Prediksi dulu` (modul `a-xi2-m6`). Untuk keperluan apa tiap-tiapnya lebih cocok?
3. `AI: boleh` DFS pada graf menandai simpul dan tidak pernah membatalkan tandanya, sedangkan backtracking (modul `a-xi1-m11`) membatalkan pilihannya. Apa akibatnya pada banyak langkah?

## Pengayaan (P)

Bagian ini boleh dilewati; ia bukan syarat modul berikutnya. DFS tanpa rekursi memakai `stack` sendiri sehingga tak bergantung pada tumpukan pemanggilan. Cara paling sederhana: masukkan simpul awal; ambil simpul teratas; bila belum dikunjungi, tandai dan masukkan semua tetangganya.

```cpp
#include <iostream>
#include <stack>
#include <vector>
using namespace std;

int main() {
  vector<vector<int>> adj(6);
  int sisi[5][2] = {{1, 2}, {1, 3}, {2, 4}, {3, 4}, {4, 5}};
  for (int k = 0; k < 5; k++) {
    adj[sisi[k][0]].push_back(sisi[k][1]);
    adj[sisi[k][1]].push_back(sisi[k][0]);
  }
  vector<bool> sudah(6, false);
  stack<int> tumpuk;
  tumpuk.push(1);
  while (!tumpuk.empty()) {
    int u = tumpuk.top();
    tumpuk.pop();
    if (sudah[u]) {
      continue;
    }
    sudah[u] = true;
    cout << u << " ";
    for (int v : adj[u]) {
      if (!sudah[v]) {
        tumpuk.push(v);
      }
    }
  }
  cout << "\n";
}
```

Keluaran:

```text
1 3 4 5 2 
```

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `a-xi2-m8` (pertanyaan 2), sekitar tiga minggu lagi di `a-xi2-m10` (pertanyaan 2), dan sekitar delapan minggu lagi di `a-xii1-m1` (pertanyaan 3). Jawab sekarang lalu simpan.

1. Bagaimana menghitung banyak komponen terhubung dengan DFS?
2. Apa beda urutan kunjungan BFS dan DFS pada graf yang sama?
3. Mengapa DFS tidak menjamin lintasan terpendek?

## Kesalahan umum

- **Lupa menandai simpul saat dikunjungi.** Pada graf bersiklus rekursi tak berhenti.
- **Menghitung komponen dengan satu DFS dari simpul 1 saja.** Simpul di komponen lain tak tersentuh; DFS harus dimulai dari tiap simpul yang belum dikunjungi.
- **Mengira DFS memberi jarak terpendek.** Jalur yang ditemukan DFS bisa jauh lebih panjang daripada yang terpendek.
- **Menyamakan urutan DFS rekursif dengan versi `stack`.** Keduanya penelusuran mendalam yang sah, tetapi urutan tetangga bisa berbeda.
- **Rekursi terlalu dalam.** Graf rantai besar dapat menghabiskan tumpukan pemanggilan; ukur kedalaman terburuk sebelum memilih rekursi.

## Cek mandiri

- [ ] Saya dapat menelusuri DFS dengan tangan dan menulis urutannya.
- [ ] Saya dapat menulis DFS rekursif dengan larik `sudah`.
- [ ] Saya dapat menghitung komponen dan ukurannya.
- [ ] Saya dapat menjawab apakah dua simpul terhubung.
- [ ] Saya dapat menyebut langkah DFS dan risiko kedalaman rekursinya.

## Kunci dan petunjuk

**Ingat kembali.** 1: karena simpul diproses menurut urutan masuknya, semua simpul berjarak `k` keluar sebelum yang berjarak `k + 1`, sehingga jarak pertama yang diberikan sudah yang terpendek (dalam banyak sisi, sisi tak berbobot). 2: dari tiga sel: kiri-atas `dp[i - 1][j - 1]` (bila huruf sama), atas `dp[i - 1][j]`, dan kiri `dp[i][j - 1]`; ketiganya sudah terisi bila tabel diisi baris demi baris dari kiri ke kanan. 3: satu yang sudah baik (menunjuk bagian), satu yang perlu diperbaiki (dengan alasan), dan satu langkah berikutnya. 4: pemanggilan tidak pernah berhenti, dan tiap pemanggilan menambah satu bingkai di tumpukan pemanggilan yang berukuran terbatas; akhirnya tempat habis dan program berhenti dengan galat.

**Prediksi dulu.** 1: `1 2 4 3 5`. 2: BFS memberi `1 2 3 4 5` (menurut jarak); DFS menyusuri `1 2 4` lebih dulu sebelum kembali ke 3. Keluaran sebenarnya:

```text
1 2 4 3 5 
```

**Contoh setengah jadi.** Isi: `true`, `sudah`, dan `v`. Program lengkap yang menghitung komponen pada graf kecil:

```cpp
#include <iostream>
#include <vector>
using namespace std;

vector<vector<int>> adj(6);
vector<bool> sudah(6, false);

void dfs(int u) {
  sudah[u] = true;
  for (int v : adj[u]) {
    if (!sudah[v]) {
      dfs(v);
    }
  }
}

int main() {
  adj[1] = {2};
  adj[2] = {1};
  adj[3] = {4};
  adj[4] = {3};
  int komponen = 0;
  for (int i = 1; i <= 5; i++) {
    if (!sudah[i]) {
      komponen++;
      dfs(i);
    }
  }
  cout << "komponen: " << komponen << "\n";
}
```

Keluaran:

```text
komponen: 3
```

**Soal Parsons.** Urutan benar: f, c, g, e, a, b, h, d (dua baris `}` setara dan boleh bertukar).

**Latihan.** 1: pseudocode: `sudah[*] = salah`; untuk `i` dari 1 sampai `n`: bila belum, `komponen++`, DFS dari `i` sambil menghitung ukuran; simpan ukuran terbesar; cetak. Program contoh:

```cpp
#include <algorithm>
#include <iostream>
#include <vector>
using namespace std;

vector<vector<int>> adj;
vector<bool> sudah;

int dfs(int u) {
  sudah[u] = true;
  int ukuran = 1;
  for (int v : adj[u]) {
    if (!sudah[v]) {
      ukuran += dfs(v);
    }
  }
  return ukuran;
}

int main() {
  int n;
  int m;
  cin >> n >> m;
  adj.assign(n + 1, vector<int>());
  sudah.assign(n + 1, false);
  for (int k = 0; k < m; k++) {
    int u;
    int v;
    cin >> u >> v;
    adj[u].push_back(v);
    adj[v].push_back(u);
  }
  int komponen = 0;
  int terbesar = 0;
  for (int i = 1; i <= n; i++) {
    if (!sudah[i]) {
      komponen++;
      terbesar = max(terbesar, dfs(i));
    }
  }
  cout << "komponen " << komponen << ", terbesar " << terbesar << "\n";
}
```

Masukan (`masukan.txt`):

```text
6 3
1 2
2 3
5 6
```

Keluaran:

```text
komponen 3, terbesar 3
```

Dengan `m = 0` jawabannya `n` komponen berukuran 1; graf terhubung penuh memberi 1 komponen. 2: `dfs(5)` memilih 4; `dfs(4)` memilih 2; `dfs(2)` memilih 1; `dfs(1)` memilih 3. Urutan: `5 4 2 1 3`. 3: program contoh:

```cpp
#include <iostream>
#include <vector>
using namespace std;

vector<vector<int>> adj;
vector<int> komp;

void dfs(int u, int nomor) {
  komp[u] = nomor;
  for (int v : adj[u]) {
    if (komp[v] == 0) {
      dfs(v, nomor);
    }
  }
}

int main() {
  int n;
  int m;
  cin >> n >> m;
  adj.assign(n + 1, vector<int>());
  komp.assign(n + 1, 0);
  for (int k = 0; k < m; k++) {
    int u;
    int v;
    cin >> u >> v;
    adj[u].push_back(v);
    adj[v].push_back(u);
  }
  int banyak = 0;
  for (int i = 1; i <= n; i++) {
    if (komp[i] == 0) {
      banyak++;
      dfs(i, banyak);
    }
  }
  for (int nomor = 1; nomor <= banyak; nomor++) {
    cout << "kelompok " << nomor << ":";
    for (int i = 1; i <= n; i++) {
      if (komp[i] == nomor) {
        cout << " " << i;
      }
    }
    cout << "\n";
  }
}
```

Masukan (`masukan.txt`):

```text
7 4
5 1
2 6
1 7
6 3
```

Keluaran:

```text
kelompok 1: 1 5 7
kelompok 2: 2 3 6
kelompok 3: 4
```

Anggota dicetak menaik karena pencetakan menelusuri `i` dari 1 sampai `n`, bukan urutan DFS. 4: program contoh:

```cpp
#include <iostream>
#include <vector>
using namespace std;

vector<vector<int>> adj;
vector<bool> sudah;

void dfs(int u) {
  sudah[u] = true;
  for (int v : adj[u]) {
    if (!sudah[v]) {
      dfs(v);
    }
  }
}

int main() {
  int n;
  int m;
  cin >> n >> m;
  adj.assign(n + 1, vector<int>());
  sudah.assign(n + 1, false);
  for (int k = 0; k < m; k++) {
    int u;
    int v;
    cin >> u >> v;
    adj[u].push_back(v);
    adj[v].push_back(u);
  }
  dfs(1);
  bool terhubung = true;
  for (int i = 1; i <= n; i++) {
    if (!sudah[i]) {
      terhubung = false;
    }
  }
  cout << (terhubung && m == n - 1 ? "ya" : "tidak") << "\n";
}
```

Masukan (`masukan.txt`):

```text
5 5
1 2
2 3
3 1
3 4
4 5
```

Keluaran:

```text
tidak
```

Graf itu terhubung tetapi `m = n`, jadi ada siklus dan bukan pohon; hapus sisi `3 1` untuk membuatnya pohon.

**Latihan bercampur.** 1: tiap simpul pada jalur memerlukan satu bingkai pemanggilan; pada rantai sejuta simpul kedalaman sejuta bingkai dapat melampaui ukuran tumpukan pemanggilan yang terbatas dan program berhenti dengan galat; gunakan versi dengan `stack` sendiri. 2: BFS `1 2 3 4 5`, DFS `1 2 4 3 5`; BFS untuk jarak terpendek, DFS untuk keterhubungan dan struktur. 3: DFS graf memproses tiap simpul sekali sehingga `O(n + m)`; backtracking membatalkan tanda dan mencoba semua kemungkinan sehingga banyak langkahnya bisa eksponensial.

**Pengayaan (P).** Keluaran `1 3 4 5 2` berbeda dari rekursif `1 2 4 3 5`, karena tetangga dimasukkan ke tumpukan dan yang terakhir masuk (3) diambil dulu. Keduanya penelusuran mendalam yang sah; bila ingin urutan sama dengan rekursif, masukkan tetangga dalam urutan terbalik.

**Ulang berjarak.** 1: untuk tiap simpul yang belum dikunjungi, mulai DFS baru dan tambah hitungan satu; banyak DFS baru yang dimulai adalah banyak komponen. 2: BFS mengunjungi menurut jarak dari awal (lapis demi lapis); DFS menyusuri satu cabang sampai buntu sebelum kembali. 3: DFS mengikuti cabang pertama yang tersedia tanpa membandingkan panjang jalur, sehingga jalur yang ditemukan bisa jauh lebih panjang daripada yang terpendek.

## Langkah berikutnya

Modul berikut: `a-xi2-m8` (grid sebagai graf: BFS dan DFS pada petak). Modul terkait: `matkom-himpunan-relasi-fungsi`. Bacaan lanjut: halaman cppreference tentang `std::stack` dan `std::vector`.
