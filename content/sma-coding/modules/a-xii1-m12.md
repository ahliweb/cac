## Untuk siapa modul ini

Modul ini untuk murid kelas XII jalur A (Algoritmik dengan C++), minggu `A-XII1-M12` silabus v1.4.1: program multi-berkas dan library. Prasyarat: modul `a-xii1-m11` dan `a-xi1-m2` (kualitas kode dan pengujian).

Modul ini karangan penyusun dan disetujui pemilik program pada 2026-11-20 (keputusan lewat dialog; catatan tinjauan menjadi tindak lanjut revisi). Butir `F-AP-d` dipetakan silabus sebagai dipenuhi jalur ini; pemenuhan butir mengikuti pemetaan silabus, bukan status modul. Tidak ada keluarga materi OSN yang dipetakan untuk minggu ini.

Perintah di modul ini dijalankan sungguhan di direktori sementara dengan g++ 13.3.0 dan GNU Make 4.3 (per 2026-11); kamu mengetik perintah yang sama di terminal di direktori kerjamu. Tiap soal latihan bertanda `AI: boleh` atau `AI: tanpa AI`. Semua data karangan.

## Ingat kembali

Jawab dari ingatan dulu, baru cek di kunci. Soal 1 dari `a-xii1-m11`, soal 2 dari `a-xii1-m9`, soal 3 dari `a-xii1-m4`.

1. Mengapa jarak dibandingkan lewat kuadratnya, dan tipe apa dipakai?
2. Mengapa jumlah rentang `[l, r]` ditulis `prefiks(r) - prefiks(l - 1)`?
3. Bagaimana DSU menjawab "apakah dua simpul sudah terhubung" dan berapa komponen yang tersisa?

## Tujuan

Setelah modul ini kamu dapat:

- membagi program menjadi berkas header (`.h`) berisi deklarasi dan berkas sumber (`.cpp`) berisi definisi;
- mengompilasi tiap berkas sumber menjadi berkas objek (`.o`) lalu menautkannya;
- memakai penjaga `#ifndef` dan membaca galat penaut seperti `undefined reference` dan `multiple definition`;
- memakai `make` agar hanya berkas yang berubah yang dikompilasi ulang (keluaran minggu ini: proyek multi-berkas).

## Prediksi dulu

Ini tugas baca-dan-prediksi, `AI: tanpa AI`. **Tebak dulu, tulis jawabanmu, baru jalankan.** Tiga berkas di bawah ini, `alat.h`, `a.cpp`, dan `b.cpp`, dikompilasi masing-masing dengan `g++ -c`, lalu `a.o` dan `b.o` ditautkan. Blok ditandai `setengah-jadi` hanya karena pemeriksa repositori memeriksa tiap blok sendirian; yang kamu lihat sudah dikompilasi bersama.

```cpp setengah-jadi
// alat.h
int kuadrat(int x) { return x * x; }
```

```cpp setengah-jadi
// a.cpp
#include "alat.h"
int dariA() { return kuadrat(3); }
```

```cpp setengah-jadi
// b.cpp
#include "alat.h"
#include <iostream>
int dariA();
int main() { std::cout << dariA() + kuadrat(4) << "\n"; }
```

1. Apakah `g++ -c a.cpp` dan `g++ -c b.cpp` masing-masing berhasil?
2. Apakah penautan `g++ a.o b.o -o salah` berhasil? Mengapa?

Simpan tebakanmu. Perbandingannya ada di bagian berikutnya.

## Contoh terselesaikan

Hasil yang sebenarnya:

```text
/usr/bin/ld: b.o: in function `kuadrat(int)':
b.cpp:(.text+0x0): multiple definition of `kuadrat(int)'; a.o:a.cpp:(.text+0x0): first defined here
collect2: error: ld returned 1 exit status
```

Kedua `-c` berhasil, tetapi penautan gagal: `kuadrat` **didefinisikan** di dua berkas objek, dan penaut menolak dua definisi untuk satu nama. Aturannya: header berisi **deklarasi** (nama dan tipe fungsi), berkas `.cpp` berisi **definisi** (isi fungsi), dan setiap fungsi didefinisikan tepat sekali di seluruh program.

Contoh proyek: pustaka graf kecil. Header `graf.h` menyatakan apa yang ditawarkan pustaka. Penjaga `#ifndef GRAF_H` mencegah isi header terbaca dua kali dalam satu berkas sumber.

```cpp
#ifndef GRAF_H
#define GRAF_H

#include <vector>

// Jarak (banyak sisi) dari simpul mulai ke tiap simpul; -1 bila tak terjangkau.
std::vector<int> jarakBfs(const std::vector<std::vector<int>>& adj, int mulai);

// Banyak komponen terhubung pada graf tak berarah.
int hitungKomponen(const std::vector<std::vector<int>>& adj);

#endif
```

Berkas `graf.cpp` mendefinisikan fungsi-fungsinya, dan `main.cpp` memakainya. Dua blok berikut ditandai `setengah-jadi` hanya karena keduanya menyertakan `graf.h` dan tidak berdiri sendiri; semuanya dikompilasi dan dijalankan bersama di bawah.

```cpp setengah-jadi
#include "graf.h"

#include <queue>

std::vector<int> jarakBfs(const std::vector<std::vector<int>>& adj, int mulai) {
  std::vector<int> jarak(adj.size(), -1);
  std::queue<int> antrian;
  jarak[mulai] = 0;
  antrian.push(mulai);
  while (!antrian.empty()) {
    int u = antrian.front();
    antrian.pop();
    for (int v : adj[u]) {
      if (jarak[v] == -1) {
        jarak[v] = jarak[u] + 1;
        antrian.push(v);
      }
    }
  }
  return jarak;
}

int hitungKomponen(const std::vector<std::vector<int>>& adj) {
  std::vector<bool> sudah(adj.size(), false);
  int banyak = 0;
  for (int i = 1; i < (int)adj.size(); i++) {
    if (sudah[i]) {
      continue;
    }
    banyak++;
    std::vector<int> jarak = jarakBfs(adj, i);
    for (int j = 1; j < (int)adj.size(); j++) {
      if (jarak[j] != -1) {
        sudah[j] = true;
      }
    }
  }
  return banyak;
}
```

```cpp setengah-jadi
#include <iostream>
#include <vector>

#include "graf.h"

int main() {
  int n, m;
  std::cin >> n >> m;
  std::vector<std::vector<int>> adj(n + 1);
  for (int k = 0; k < m; k++) {
    int u, v;
    std::cin >> u >> v;
    adj[u].push_back(v);
    adj[v].push_back(u);
  }
  std::vector<int> jarak = jarakBfs(adj, 1);
  for (int i = 1; i <= n; i++) {
    std::cout << "jarak ke " << i << " = " << jarak[i] << "\n";
  }
  std::cout << "komponen " << hitungKomponen(adj) << "\n";
}
```

Masukan graf (`masukan.txt`):

```text
6 5
1 2
2 3
3 1
4 5
5 6
```

Kompilasi tiap berkas sumber, tautkan, lalu jalankan:

```bash
g++ -std=c++17 -Wall -Wextra -Werror -c graf.cpp -o graf.o
g++ -std=c++17 -Wall -Wextra -Werror -c main.cpp -o main.o
g++ main.o graf.o -o peta
./peta < masukan.txt
ls
```

Keluaran:

```text
jarak ke 1 = 0
jarak ke 2 = 1
jarak ke 3 = 1
jarak ke 4 = -1
jarak ke 5 = -1
jarak ke 6 = -1
komponen 2
graf.cpp
graf.h
graf.o
main.cpp
main.o
masukan.txt
peta
uji.cpp
```

Tiap `.cpp` menjadi satu `.o`; `g++ main.o graf.o` hanya menautkan. Karena pustaka terpisah, berkas `uji.cpp` bisa memakai `graf.o` yang sama untuk menguji tanpa program utama:

```bash
g++ -std=c++17 -Wall -Wextra -Werror -c uji.cpp -o uji.o
g++ uji.o graf.o -o uji
./uji
```

Keluaran:

```text
LULUS
```

Lupa menautkan `graf.o` memberi galat penaut, bukan galat kompilasi:

```bash
g++ main.o -o peta_salah
```

Keluaran:

```text
/usr/bin/ld: main.o: in function `main':
main.cpp:(.text+0x11a): undefined reference to `jarakBfs(std::vector<std::vector<int, std::allocator<int> >, std::allocator<std::vector<int, std::allocator<int> > > > const&, int)'
/usr/bin/ld: main.cpp:(.text+0x1d2): undefined reference to `hitungKomponen(std::vector<std::vector<int, std::allocator<int> >, std::allocator<std::vector<int, std::allocator<int> > > > const&)'
collect2: error: ld returned 1 exit status
```

`undefined reference` berarti ada deklarasi tetapi tak ada definisi di berkas objek mana pun yang ditautkan.

Perkiraan langkah program contoh: `jarakBfs` memproses tiap simpul dan tiap sisi sekali, sekitar `6 + 2 * 5 = 16` langkah untuk graf ini, jadi `O(n + m)`. `hitungKomponen` memanggilnya sekali per komponen dan memindai larik jarak sepanjang `n` tiap kali, sehingga `O(k * n + m)` untuk `k` komponen; di sini `k = 2`. Pemisahan berkas tak mengubah banyak langkah program; ia mengubah kerja kompilasi: perubahan `main.cpp` hanya mengompilasi ulang `main.cpp`, bukan `graf.cpp`.

## Contoh setengah jadi

Header tanpa penjaga menimbulkan galat jika terbaca dua kali. Lengkapi penjaga.

```cpp setengah-jadi
#ifndef ____
#define ____

struct Titik {
  int x;
  int y;
};

#____
```

## Soal Parsons

Susun enam baris berikut (sudah diacak, tanpa lekuk) menjadi `Makefile` dua aturan: variabel, lalu aturan `peta`, lalu aturan `main.o`. Baris perintah di Makefile diawali karakter tab. `AI: tanpa AI`: tujuannya melatih membaca urutan.

```text
(a) peta: main.o graf.o
(b) CXX = g++
(c) g++ main.o graf.o -o peta
(d) main.o: main.cpp graf.h
(e) g++ -std=c++17 -Wall -Wextra -Werror -c main.cpp -o main.o
(f) CXXFLAGS = -std=c++17 -Wall -Wextra -Werror
```

## Latihan

1. `AI: boleh` **Pustaka geometri.** Pindahkan `jarakKuadrat` dan `luasDua` dari modul `a-xii1-m11` ke `geo.h` dan `geo.cpp`, dan beri `main.cpp` yang memakainya. Tulis pseudocode pembagiannya lebih dulu.
2. `AI: tanpa AI` **Prediksi galat.** `titik.h` berisi `struct Titik` tanpa penjaga, dan `main.cpp` menyertakan `geo.h` (yang menyertakan `titik.h`) lalu `titik.h` lagi. Tebak galatnya sebelum menjalankan.
3. `AI: boleh` **Make.** Tulis `Makefile` untuk proyek graf, jalankan `make`, ubah satu berkas, dan catat perintah apa saja yang berjalan.
4. `AI: boleh` **Tambah fungsi.** Tambahkan `jarakAntara(adj, a, b)` ke pustaka graf, ubah `uji.cpp`, dan kompilasi ulang. Berkas mana yang harus dikompilasi ulang?
5. *Opsional:* **catatan pemakaian AI.** Bila memakai AI generatif, jawab nomor 2 sendiri dulu, lalu minta penjelasan atau petunjuk bertahap, bukan program jadi. Catat alatnya, tujuanmu, garis besar perintahmu, bagian yang kamu pakai, dan caramu memeriksanya. Jangan menaruh data pribadi atau tugas bernilai pada perintah.

## Latihan bercampur

1. `AI: tanpa AI` Pustaka graf memakai daftar ketetanggaan. Bila kamu menggantinya dengan matriks, apa yang berubah pada `graf.h`, dan berkas mana yang harus dikompilasi ulang (modul `a-xi2-m5`)?
2. `AI: boleh` Mengapa `uji.cpp` berguna sebagai pengganti memeriksa dengan mata, dan kasus uji tepi apa yang kamu tambahkan (modul `a-xi1-m2`)?
3. `AI: boleh` Tulis tiga jenis pesan galat dari bagian ini dan tentukan masing-masing tahap yang memunculkannya: kompilasi atau penautan.

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `a-xii1-m13` (pertanyaan 1), sekitar tiga minggu lagi di `a-xii2-m1` (pertanyaan 2), dan sekitar delapan minggu lagi di `a-xii2-m6` (pertanyaan 3). Jawab sekarang lalu simpan.

1. Apa isi berkas `.h` dan apa isi berkas `.cpp`, dan mengapa satu fungsi didefinisikan tepat sekali?
2. Apa fungsi penjaga `#ifndef` pada header?
3. Apa beda galat `undefined reference` dan `multiple definition`?

## Kesalahan umum

- **Mendefinisikan fungsi di header.** Dua berkas yang menyertakannya menghasilkan `multiple definition` saat penautan.
- **Menyertakan berkas `.cpp` dengan `#include`.** Fungsinya terdefinisi di dua tempat; sertakan header saja.
- **Lupa penjaga header.** Struktur terdefinisi dua kali dalam satu berkas sumber dan kompilator menolak.
- **Lupa menautkan berkas objek.** Muncul `undefined reference` padahal kodenya ada.
- **Mengira `make` selalu mengompilasi semua.** `make` memakai waktu ubah berkas; aturan yang kurang `graf.h` membuat ubahan header tak terdeteksi.

## Cek mandiri

- [ ] Saya dapat menyebut isi `.h` dan isi `.cpp`.
- [ ] Saya dapat mengompilasi dua berkas `.cpp` menjadi `.o` lalu menautkannya.
- [ ] Saya dapat menjelaskan penjaga `#ifndef`.
- [ ] Saya dapat membedakan galat kompilasi dan galat penautan.
- [ ] Saya dapat menulis `Makefile` kecil dan menjelaskan apa yang dikompilasi ulang.

## Kunci dan petunjuk

**Ingat kembali.** 1: kuadrat selisih bulat sehingga perbandingan tepat; tipe `long long` karena kuadrat selisih `10^9` mencapai `10^18`. 2: `prefiks(r)` menjumlah `1..r`; mengurangi `prefiks(l - 1)` membuang `1..l-1` sehingga tersisa `l..r`. 3: dua simpul terhubung bila `cari` keduanya sama; banyak komponen dikurangi satu setiap `gabung` yang berhasil dari awal `n`.

**Prediksi dulu.** 1: ya, masing-masing berhasil karena tiap berkas sendirian sah. 2: gagal, karena `a.o` dan `b.o` sama-sama berisi definisi `kuadrat` (galatnya di bagian Contoh terselesaikan).

**Contoh setengah jadi.** Isi: `TITIK_H` pada kedua baris (nama apa pun asal sama) dan `endif`. Header lengkap:

```cpp
#ifndef TITIK_H
#define TITIK_H

struct Titik {
  int x;
  int y;
};

#endif
```

Tanpa penjaga itu, dua `#include "titik.h"` dalam satu berkas sumber menghasilkan:

```text
In file included from main.cpp:2:
titik.h:1:8: error: redefinition of ‘struct Titik’
    1 | struct Titik {
      |        ^~~~~
In file included from geo.h:1,
                 from main.cpp:1:
titik.h:1:8: note: previous definition of ‘struct Titik’
    1 | struct Titik {
      |        ^~~~~
```

**Soal Parsons.** Urutan: b, f, a, c, d, e. Perintah `c` ada di bawah aturan `a`, dan perintah `e` di bawah aturan `d`. Urutan kedua aturan boleh dibalik; yang tak boleh adalah menaruh perintah di luar aturan.

**Latihan.** 1: pseudocode: `geo.h` berisi dua deklarasi dan penjaga; `geo.cpp` menyertakan `geo.h` dan mendefinisikan keduanya; `main.cpp` menyertakan `geo.h`; kompilasi tiga `-c` lalu tautkan tiga `.o`. Hasil nyata:

```cpp
#ifndef GEO_H
#define GEO_H

#include <vector>

long long jarakKuadrat(long long x1, long long y1, long long x2, long long y2);
long long luasDua(const std::vector<long long>& x, const std::vector<long long>& y);

#endif
```

```cpp setengah-jadi
#include "geo.h"

long long jarakKuadrat(long long x1, long long y1, long long x2, long long y2) {
  long long dx = x1 - x2;
  long long dy = y1 - y2;
  return dx * dx + dy * dy;
}

long long luasDua(const std::vector<long long>& x, const std::vector<long long>& y) {
  int n = x.size();
  long long jumlah = 0;
  for (int i = 0; i < n; i++) {
    int j = (i + 1) % n;
    jumlah += x[i] * y[j] - x[j] * y[i];
  }
  return jumlah < 0 ? -jumlah : jumlah;
}
```

```cpp setengah-jadi
#include <iostream>
#include <vector>

#include "geo.h"

int main() {
  std::vector<long long> x = {0, 4, 0};
  std::vector<long long> y = {0, 0, 3};
  std::cout << jarakKuadrat(0, 0, 4, 3) << " " << luasDua(x, y) << "\n";
}
```

```bash
g++ -std=c++17 -Wall -Wextra -Werror -c geo.cpp -o geo.o
g++ -std=c++17 -Wall -Wextra -Werror -c main.cpp -o main.o
g++ main.o geo.o -o geoprog
./geoprog
```

Keluaran:

```text
25 12
```

2: galatnya `redefinition of 'struct Titik'` (lihat keluaran di atas). 3: `Makefile` berikut (baris perintah diawali tab):

```make
CXX = g++
CXXFLAGS = -std=c++17 -Wall -Wextra -Werror

all: peta uji

peta: main.o graf.o
	$(CXX) main.o graf.o -o peta

uji: uji.o graf.o
	$(CXX) uji.o graf.o -o uji

main.o: main.cpp graf.h
	$(CXX) $(CXXFLAGS) -c main.cpp -o main.o

uji.o: uji.cpp graf.h
	$(CXX) $(CXXFLAGS) -c uji.cpp -o uji.o

graf.o: graf.cpp graf.h
	$(CXX) $(CXXFLAGS) -c graf.cpp -o graf.o

clean:
	rm -f *.o peta uji
```

`make` pertama mengompilasi semua:

```text
g++ -std=c++17 -Wall -Wextra -Werror -c main.cpp -o main.o
g++ -std=c++17 -Wall -Wextra -Werror -c graf.cpp -o graf.o
g++ main.o graf.o -o peta
g++ -std=c++17 -Wall -Wextra -Werror -c uji.cpp -o uji.o
g++ uji.o graf.o -o uji
```

Sesudah `touch main.cpp`, hanya `main.o` dan `peta` yang dibuat ulang:

```text
g++ -std=c++17 -Wall -Wextra -Werror -c main.cpp -o main.o
g++ main.o graf.o -o peta
```

Jalankan `make` lagi tanpa perubahan:

```text
make: Nothing to be done for 'all'.
```

4: ubah `graf.h`, `graf.cpp`, dan `uji.cpp`. Karena `graf.h` berubah, semua berkas yang menyertakannya (`main.cpp`, `uji.cpp`, dan `graf.cpp`) dikompilasi ulang; `make` melakukan ini lewat aturan `graf.h` pada tiap `.o`.

**Latihan bercampur.** 1: tipe parameter pada deklarasi di `graf.h` berubah; setiap berkas yang menyertakan `graf.h` (`main.cpp`, `uji.cpp`, dan `graf.cpp`) dikompilasi ulang. 2: pengujian otomatis dapat diulang tiap kali kode berubah; tambahkan graf satu simpul, graf tanpa sisi, dan simpul yang tak terjangkau. 3: `redefinition of 'struct Titik'`: kompilasi; `undefined reference to ...`: penautan; `multiple definition of ...`: penautan.

## Langkah berikutnya

Modul berikutnya, `a-xii1-m13`, adalah proyek, tempat pustaka sendiri sangat berguna. Gunakan pustaka graf atau geometri yang kamu buat tadi. Modul terkait: `a-xi1-m2`. Bacaan lanjut: panduan GCC tentang pilihan `-c` dan `-o`, dan panduan GNU Make.
