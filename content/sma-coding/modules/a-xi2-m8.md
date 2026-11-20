## Untuk siapa modul ini

Modul ini untuk murid kelas XI jalur A (Algoritmik dengan C++), minggu `A-XI2-M8` silabus v1.4.1: grid sebagai graf. Prasyarat: modul `a-xi2-m7` (DFS dan keterhubungan) dan `a-x2-m3` (array dua dimensi); BFS dari `a-xi2-m6` dipakai di sini.

Modul ini berstatus DRAF: karangan penyusun, belum ditinjau pemilik. Butir `F-BK-c` dipetakan silabus sebagai dipenuhi jalur ini; modul draf ini belum dihitung sebagai pemenuhan. Keluarga materi OSN yang bertaut: `graph-tree`, yang seluruhnya ditandai pengayaan (P) di jembatan OSN, sehingga kelas reguler boleh melewati modul ini. Tiap soal latihan bertanda `AI: boleh` atau `AI: tanpa AI`. Masukan program diberikan lewat berkas: `./program < masukan.txt`.

## Ingat kembali

Jawab dari ingatan dulu, baru cek di kunci. Soal 1 dari `a-xi2-m5`, soal 2 dari `a-xi2-m7`, soal 3 dari `a-x2-m3`.

1. Pada graf tak berarah, mengapa jumlah semua derajat sama dengan dua kali banyak sisi?
2. Bagaimana menghitung banyak komponen terhubung dengan DFS?
3. Pada array dua dimensi, indeks pertama menunjuk baris atau kolom, dan apa akibatnya membaca di luar ukuran?

## Tujuan

Setelah modul ini kamu dapat:

- memodelkan grid sebagai graf: tiap sel satu simpul, tiap sel bersebelahan satu sisi (keluaran minggu ini: program grid);
- menulis daftar arah `dx` dan `dy` dan memeriksa batas grid sebelum membaca sebuah sel;
- menghitung area terhubung pada grid dengan BFS (pewarnaan area);
- mencari jarak terpendek di labirin dengan BFS dan menyebut banyak langkahnya.

## Prediksi dulu

Ini tugas baca-dan-prediksi, `AI: tanpa AI`. Tanda `#` adalah dinding dan `.` adalah lantai. Dua lantai berada di area yang sama bila bisa dicapai lewat langkah atas, bawah, kiri, atau kanan (bukan miring) yang hanya melewati lantai.

```text
..#...
..#.#.
###.#.
.#..#.
.#.##.
```

1. Berapa area lantai pada grid ini?
2. Area mana yang paling luas, dan berapa selnya?

Tulis tebakanmu, lalu cocokkan dengan keluaran program di bawah.

## Contoh terselesaikan

Grid adalah graf yang tidak perlu kamu simpan sebagai daftar tetangga. Simpulnya sel `(i, j)`. Sel lain bertetangga dengannya bila selisih baris dan kolomnya salah satu dari `(-1, 0)`, `(1, 0)`, `(0, -1)`, `(0, 1)`. Keempat selisih itu kita simpan dalam dua larik `dx` dan `dy`, sehingga satu perulangan mengunjungi semua tetangga. Sebelum membaca sel tetangga, **periksa dulu** bahwa barisnya antara 0 dan `R - 1` dan kolomnya antara 0 dan `C - 1`.

Program berikut menghitung area lantai dengan BFS: tiap kali menemukan lantai yang belum dikunjungi, ia mulai satu BFS baru, yang mewarnai seluruh area itu.

```cpp
#include <iostream>
#include <queue>
#include <string>
#include <utility>
#include <vector>
using namespace std;

int main() {
  int R, C;
  cin >> R >> C;
  vector<string> g(R);
  for (int i = 0; i < R; i++) {
    cin >> g[i];
  }
  int dx[4] = {-1, 1, 0, 0};
  int dy[4] = {0, 0, -1, 1};
  vector<vector<int>> warna(R, vector<int>(C, 0));
  int banyak = 0;
  int terluas = 0;
  for (int i = 0; i < R; i++) {
    for (int j = 0; j < C; j++) {
      if (g[i][j] != '.' || warna[i][j] != 0) {
        continue;
      }
      banyak++;
      int ukuran = 0;
      queue<pair<int, int>> q;
      q.push({i, j});
      warna[i][j] = banyak;
      while (!q.empty()) {
        pair<int, int> p = q.front();
        q.pop();
        ukuran++;
        for (int k = 0; k < 4; k++) {
          int a = p.first + dx[k];
          int b = p.second + dy[k];
          if (a < 0 || a >= R || b < 0 || b >= C) {
            continue;
          }
          if (g[a][b] == '.' && warna[a][b] == 0) {
            warna[a][b] = banyak;
            q.push({a, b});
          }
        }
      }
      if (ukuran > terluas) {
        terluas = ukuran;
      }
    }
  }
  cout << banyak << " area, terluas " << terluas << " sel\n";
  for (int i = 0; i < R; i++) {
    for (int j = 0; j < C; j++) {
      if (warna[i][j] == 0) {
        cout << '#';
      } else {
        cout << warna[i][j];
      }
    }
    cout << "\n";
  }
}
```

Masukan (`masukan.txt`):

```text
5 6
..#...
..#.#.
###.#.
.#..#.
.#.##.
```

Keluaran:

```text
3 area, terluas 12 sel
11#222
11#2#2
###2#2
3#22#2
3#2##2
```

Cocokkan dengan prediksimu. Tiap sel masuk antrian paling banyak satu kali (ditandai `warna` saat dimasukkan, bukan saat dikeluarkan), dan tiap sel yang keluar memeriksa empat tetangga. Untuk `R * C = 30` sel, itu paling banyak sekitar `4 * 30 = 120` pemeriksaan, jadi waktunya `O(R * C)`.

Labirin adalah grid yang sama dengan awal `S` dan tujuan `T`. Karena BFS menjelajah lapis demi lapis, sel yang pertama kali dicapai pada lapis ke-`d` berjarak tepat `d` langkah. Program berikut mengisi `jarak` dan mencetak jarak ke `T`.

```cpp
#include <iostream>
#include <queue>
#include <string>
#include <utility>
#include <vector>
using namespace std;

int main() {
  int R, C;
  cin >> R >> C;
  vector<string> g(R);
  int si = 0, sj = 0, ti = 0, tj = 0;
  for (int i = 0; i < R; i++) {
    cin >> g[i];
    for (int j = 0; j < C; j++) {
      if (g[i][j] == 'S') {
        si = i;
        sj = j;
      } else if (g[i][j] == 'T') {
        ti = i;
        tj = j;
      }
    }
  }
  int dx[4] = {-1, 1, 0, 0};
  int dy[4] = {0, 0, -1, 1};
  vector<vector<int>> jarak(R, vector<int>(C, -1));
  queue<pair<int, int>> q;
  q.push({si, sj});
  jarak[si][sj] = 0;
  int diperiksa = 0;
  while (!q.empty()) {
    pair<int, int> p = q.front();
    q.pop();
    diperiksa++;
    for (int k = 0; k < 4; k++) {
      int a = p.first + dx[k];
      int b = p.second + dy[k];
      if (a < 0 || a >= R || b < 0 || b >= C) {
        continue;
      }
      if (g[a][b] != '#' && jarak[a][b] == -1) {
        jarak[a][b] = jarak[p.first][p.second] + 1;
        q.push({a, b});
      }
    }
  }
  if (jarak[ti][tj] == -1) {
    cout << "tidak ada jalan\n";
  } else {
    cout << "jarak terpendek " << jarak[ti][tj] << " langkah\n";
  }
  cout << diperiksa << " sel diproses dari " << R * C << " sel\n";
}
```

Masukan (`masukan.txt`):

```text
5 7
S.#....
.##.##.
...#...
.#...#T
.#.#...
```

Keluaran:

```text
jarak terpendek 11 langkah
25 sel diproses dari 35 sel
```

Jarak `-1` menandai "belum dicapai", dan itu sekaligus berfungsi sebagai catatan dikunjungi. Jika `T` tidak pernah dicapai, jaraknya tetap `-1` dan program melapor tidak ada jalan. Waktunya sama dengan area di atas: `O(R * C)`. Memakai DFS rekursif untuk grid besar berisiko memenuhi tumpukan pemanggilan, sehingga BFS dengan antrian sendiri lebih aman.

## Contoh setengah jadi

Lengkapi potongan yang menghitung banyak tetangga lantai dari sel `(i, j)` pada grid `g` berukuran `R` kali `C`.

```cpp setengah-jadi
int dx[4] = {-1, 1, 0, 0};
int dy[4] = {0, 0, -1, 1};
int tetangga = 0;
for (int k = 0; k < ____; k++) {
  int a = i + dx[k];
  int b = j + ____[k];
  if (a < 0 || a >= ____ || b < 0 || b >= C) {
    continue;
  }
  if (g[a][b] == '.') {
    tetangga++;
  }
}
```

## Soal Parsons

Susun tujuh baris berikut (sudah diacak) menjadi satu langkah memeriksa empat tetangga sel `(x, y)` pada BFS jarak. `AI: tanpa AI`.

```text
(a)   if (a < 0 || a >= R || b < 0 || b >= C) continue;
(b)   for (int k = 0; k < 4; k++) {
(c)     int a = x + dx[k], b = y + dy[k];
(d)     jarak[a][b] = jarak[x][y] + 1;
(e)     q.push({a, b});
(f)   }
(g)     if (g[a][b] == '#' || jarak[a][b] != -1) continue;
```

## Latihan

1. `AI: boleh` **Pulau.** Pada grid `#` (daratan) dan `.` (laut), hitung banyak pulau bila daratan yang bersentuhan miring juga dianggap satu pulau (delapan arah). Tulis pseudocode dulu; perubahan utamanya ada di larik arah.
2. `AI: boleh` **Pewarnaan.** Cetak grid dengan tiap area lantai ditandai huruf `a`, `b`, dan seterusnya, serta banyak sel tiap area, dari yang terbesar.
3. `AI: tanpa AI` **Telusur.** Pada labirin tanpa dinding berukuran 3 kali 3 dengan `S` di pojok kiri atas dan `T` di pojok kanan bawah, berapa jarak terpendek? Berapa sel yang berjarak tepat 2 dari `S`?
4. `AI: boleh` **Batas.** Ubah program labirin agar mencetak `tidak ada jalan` untuk grid satu sel `S` tanpa `T`, dan agar tidak membaca di luar grid pada `R = 1`.
5. *Opsional:* **catatan pemakaian AI.** Bila memakai AI generatif, jawab nomor 3 sendiri dulu, lalu minta penjelasan atau petunjuk bertahap, bukan program jadi. Catat alatnya, tujuanmu, garis besar perintahmu, bagian yang kamu pakai, dan caramu memeriksanya. Jangan menaruh data pribadi atau tugas bernilai pada perintah.

## Latihan bercampur

1. `AI: boleh` Mengapa tanda "dikunjungi" diberikan saat sel dimasukkan ke antrian, bukan saat dikeluarkan? Apa yang terjadi bila ditunda (modul `a-xi2-m6`)?
2. `AI: tanpa AI` Daftar tetangga untuk grid 1000 kali 1000 sel disimpan eksplisit: kira-kira berapa banyak sisi, dan mengapa `dx` dan `dy` lebih hemat (modul `a-xi2-m5`)?
3. `AI: boleh` Hitung area dengan DFS rekursif. Pada grid berapa besar ia berisiko gagal, dan apa penggantinya (modul `a-x2-m11`)?

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `a-xi2-m9` (pertanyaan 1), sekitar tiga minggu lagi di `a-xi2-m11` (pertanyaan 2), dan sekitar delapan minggu lagi di `a-xii1-m2` (pertanyaan 3). Jawab sekarang lalu simpan.

1. Mengapa batas grid diperiksa sebelum sel tetangga dibaca?
2. Berapa kira-kira langkah BFS pada grid 1000 kali 1000, dan mengapa tiap sel dimasukkan antrian paling banyak sekali?
3. Mengapa BFS memberi jarak terpendek pada graf tak berbobot, dan mengapa jaminan itu hilang bila sisinya punya bobot berbeda?

## Kesalahan umum

- **Membaca `g[a][b]` sebelum memeriksa batas.** Sel di luar grid memberi perilaku tak terdefinisi.
- **Menukar peran `dx` dan `dy`.** Satu larik menggeser baris dan satunya menggeser kolom; konsisten pada seluruh program.
- **Menandai dikunjungi saat dikeluarkan dari antrian.** Satu sel bisa masuk berkali-kali dan langkah membengkak.
- **Mengira jarak BFS miring sama dengan tegak.** Dengan empat arah, langkah miring dihitung dua langkah.
- **Lupa menangani `S` sama dengan `T` atau `T` tak terjangkau.** Jarak 0 dan "tidak ada jalan" adalah dua kasus batas.

## Cek mandiri

- [ ] Saya dapat menjelaskan sel sebagai simpul dan sel bersebelahan sebagai sisi.
- [ ] Saya dapat menulis `dx` dan `dy` dan memeriksa batas sebelum membaca sel.
- [ ] Saya dapat menghitung area terhubung dengan BFS.
- [ ] Saya dapat mencari jarak terpendek di labirin dan melaporkan bila tidak ada jalan.
- [ ] Saya dapat menyebut banyak langkah BFS grid dalam `R` dan `C`.

## Kunci dan petunjuk

**Ingat kembali.** 1: karena tiap sisi memiliki dua ujung dan menambah derajat kedua ujungnya masing-masing satu. 2: untuk tiap simpul yang belum dikunjungi, mulai DFS baru dan tambah hitungan satu; banyak DFS baru yang dimulai adalah banyak komponen. 3: indeks pertama baris; membaca di luar ukuran memberi perilaku tak terdefinisi: bisa salah nilai atau program berhenti.

**Prediksi dulu.** Lihat keluaran program area di atas. Aturan: sel `.` terhubung bila bersebelahan tegak atau datar. Pewarnaan memberi angka yang sama pada satu area.

**Contoh setengah jadi.** Isi: `4`, `dy`, `R`. Program lengkap yang mencetak banyak tetangga lantai tiap sel lantai:

```cpp
#include <iostream>
#include <string>
#include <vector>
using namespace std;

int main() {
  int R, C;
  cin >> R >> C;
  vector<string> g(R);
  for (int i = 0; i < R; i++) {
    cin >> g[i];
  }
  int dx[4] = {-1, 1, 0, 0};
  int dy[4] = {0, 0, -1, 1};
  for (int i = 0; i < R; i++) {
    for (int j = 0; j < C; j++) {
      if (g[i][j] != '.') {
        cout << '#';
        continue;
      }
      int tetangga = 0;
      for (int k = 0; k < 4; k++) {
        int a = i + dx[k];
        int b = j + dy[k];
        if (a < 0 || a >= R || b < 0 || b >= C) {
          continue;
        }
        if (g[a][b] == '.') {
          tetangga++;
        }
      }
      cout << tetangga;
    }
    cout << "\n";
  }
}
```

Masukan (`masukan.txt`):

```text
3 4
..#.
.#..
....
```

Keluaran:

```text
21#1
2#23
2232
```

**Soal Parsons.** Urutan benar: b, c, a, g, d, e, f. Baris (a) memeriksa batas sebelum (g) membaca `g[a][b]`; tanda dikunjungi (d) diberikan bersamaan dengan (e), saat dimasukkan.

**Latihan.** 1: pseudocode: sama dengan program area, tetapi `dx` dan `dy` berisi delapan pasangan selisih (semua kombinasi `-1, 0, 1` kecuali `(0, 0)`), dan lantai diganti daratan `#`. 2: simpan hasil tiap BFS dalam `vector<pair<int, char>>` (ukuran, huruf), urutkan menurun menurut ukuran. 3: jarak ke `T` adalah 4 langkah (dua ke kanan dan dua ke bawah, urutan bebas); sel berjarak tepat 2 dari `S` ada 3, yaitu `(0, 2)`, `(1, 1)`, `(2, 0)`. 4: pada grid satu sel `S` tanpa `T`, `ti` dan `tj` tetap 0 sehingga `jarak[0][0]` bernilai 0 dan tercetak jarak 0; untuk melaporkan `tidak ada jalan`, tandai ada tidaknya `T` saat membaca. Batas diperiksa dengan `a < 0 || a >= R`, jadi `R = 1` aman.

**Latihan bercampur.** 1: bila ditandai saat dikeluarkan, sel yang sama dapat dimasukkan oleh beberapa tetangganya sebelum diproses, sehingga antrian bisa memuat duplikat dan langkah membengkak. 2: sekitar `1000 * 1000 * 4 / 2 = 2.000.000` sisi tak berarah bila tiap sisi dihitung sekali, plus memori daftar; `dx` dan `dy` hanya delapan bilangan karena tetangga dihitung dari posisi. 3: sebuah area satu juta sel bisa menumpuk satu juta pemanggilan bersarang dan memenuhi tumpukan; ganti dengan antrian atau tumpukan buatan sendiri.

**Ulang berjarak.** 1: bila sel di luar grid dibaca, perilakunya tak terdefinisi. 2: sekitar `4 * 1.000.000 = 4.000.000` pemeriksaan tetangga, karena tiap sel masuk antrian paling banyak sekali dan memeriksa empat tetangga; jadi `O(R * C)`. 3: BFS memproses lapis demi lapis, sehingga sel pertama kali dicapai lewat jumlah sisi paling sedikit; bila sisi berbobot, jalan dengan sisi lebih sedikit bisa lebih mahal sehingga lapis tidak lagi berarti jarak.

## Langkah berikutnya

Modul berikut: `a-xi2-m9` (data bervolume besar I), yang beralih dari grid kecil ke berkas data yang besar. Modul terkait: `matkom-himpunan-relasi-fungsi`. Bacaan lanjut: halaman cppreference tentang `std::queue` dan `std::vector`.
