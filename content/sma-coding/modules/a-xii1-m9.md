## Untuk siapa modul ini

Modul ini untuk murid kelas XII jalur A (Algoritmik dengan C++), minggu `A-XII1-M9` silabus v1.4.1: pohon Fenwick (*Binary Indexed Tree*). Prasyarat: modul `a-xii1-m8` dan `a-xi1-m3` (operasi bit).

Modul ini karangan penyusun dan disetujui pemilik program pada 2026-11-20 (keputusan lewat dialog; catatan tinjauan menjadi tindak lanjut revisi). Butir `F-BK-c` dipetakan silabus sebagai dipenuhi jalur ini; pemenuhan butir mengikuti pemetaan silabus, bukan status modul. Keluarga materi OSN yang bertaut: `struktur-data`; Fenwick ditandai pengayaan (P) di jembatan OSN, sehingga kelas reguler boleh melewati modul ini. Modul tidak menjanjikan kedalaman soal OSN dan tidak menggantikan pembinaan OSN.

Tiap soal latihan bertanda `AI: boleh` atau `AI: tanpa AI`. Masukan program diberikan lewat berkas: `./program < masukan.txt`. Semua data karangan.

## Ingat kembali

Jawab dari ingatan dulu, baru cek di kunci. Soal 1 dari `a-xii1-m8`, soal 2 dari `a-xii1-m6`, soal 3 dari `a-xii1-m1`.

1. Mengapa tiap perkalian pada pemangkatan modular diikuti `% m`, dan tipe apa yang dipakai untuk hasil antara?
2. Berapa banyak susunan `k` dari `n` unsur berbeda bila urutan penting dan bila tidak?
3. Mengapa pada BFS 0-1 sisi bobot 0 dimasukkan ke depan `deque` dan sisi bobot 1 ke belakang?

## Tujuan

Setelah modul ini kamu dapat:

- menghitung `i & -i`, bit 1 terendah dari `i`, dan menjelaskan peran bit itu pada Fenwick;
- menulis `tambah` (pembaruan titik) dan `jumlahPrefiks` (kueri) dengan masing-masing sekitar `log n` langkah;
- menjawab jumlah rentang `[l, r]` sebagai selisih dua jumlah prefiks;
- menyebut kapan Fenwick lebih cocok daripada larik jumlah prefiks biasa (keluaran minggu ini: program Fenwick).

## Prediksi dulu

Ini tugas baca-dan-prediksi, `AI: tanpa AI`. **Tebak dulu, tulis jawabanmu, baru jalankan.** Operasi `i & -i` mengambil bit 1 terendah dari `i` (bilangan negatif disimpan sebagai komplemen dua).

```cpp
#include <iostream>
using namespace std;

int main() {
  for (int i = 1; i <= 8; i++) {
    cout << (i & -i) << " ";
  }
  cout << "\n";
}
```

1. Apa yang tercetak?
2. Pada bilangan berapa hasilnya sama dengan bilangan itu sendiri?

Simpan tebakanmu. Perbandingannya ada di bagian berikutnya.

## Contoh terselesaikan

Keluaran program tadi:

```text
1 2 1 4 1 2 1 8 
```

Masalahnya: larik `a[1..n]` dengan dua operasi, `tambah(i, v)` dan jumlah `a[l..r]`. Larik jumlah prefiks menjawab kueri dalam satu langkah tetapi tiap pembaruan menggeser `O(n)` entri; larik biasa memperbarui dalam satu langkah tetapi kueri menjumlah `O(n)` elemen. Fenwick mengambil jalan tengah: kedua operasi `O(log n)`.

Idenya: simpan `tree[i]`, jumlah `lowbit(i)` elemen yang berakhir di `i`, dengan `lowbit(i) = i & -i`. Jadi `tree[8]` menjumlah `a[1..8]`, `tree[6]` menjumlah `a[5..6]`, dan `tree[7]` hanya `a[7]`. Jumlah prefiks `1..i` didapat dengan melepas bit 1 terendah satu demi satu: `i -= i & -i`. Pembaruan naik ke blok yang memuat `i`: `i += i & -i`.

```cpp
#include <iostream>
#include <vector>
using namespace std;

int n;
vector<long long> tree;
long long langkah = 0;

void tambah(int i, long long v) {
  while (i <= n) {
    tree[i] += v;
    i += i & -i;
    langkah++;
  }
}

long long jumlahPrefiks(int i) {
  long long s = 0;
  while (i > 0) {
    s += tree[i];
    i -= i & -i;
    langkah++;
  }
  return s;
}

int main() {
  int q;
  cin >> n >> q;
  tree.assign(n + 1, 0);
  for (int i = 1; i <= n; i++) {
    long long x;
    cin >> x;
    tambah(i, x);
  }
  long long langkahBangun = langkah;
  for (int k = 0; k < q; k++) {
    int jenis;
    cin >> jenis;
    if (jenis == 1) {
      int i;
      long long v;
      cin >> i >> v;
      tambah(i, v);
      cout << "tambah " << i << " " << v << "\n";
    } else {
      int l;
      int r;
      cin >> l >> r;
      cout << "jumlah " << l << ".." << r << " = " << jumlahPrefiks(r) - jumlahPrefiks(l - 1) << "\n";
    }
  }
  cout << "langkah bangun " << langkahBangun << ", langkah kueri " << langkah - langkahBangun << "\n";
}
```

Masukan (`masukan.txt`):

```text
8 6
5 3 7 9 6 4 1 2
2 1 8
2 3 5
1 4 10
2 3 5
1 8 -2
2 1 8
```

Keluaran:

```text
jumlah 1..8 = 37
jumlah 3..5 = 22
tambah 4 10
jumlah 3..5 = 32
tambah 8 -2
jumlah 1..8 = 45
langkah bangun 20, langkah kueri 11
```

Baca angkanya. Membangun dengan `n = 8` pembaruan memakai 20 langkah, kira-kira `n log n`; ke-6 operasi sesudahnya memakai 11 langkah, jadi rata-rata kurang dari 2 langkah per operasi untuk `n = 8`. Untuk `n = 10^5`, tiap operasi paling banyak sekitar 17 langkah (`log2 10^5` kira-kira 17), tetapi larik jumlah prefiks biasa memerlukan hingga `10^5` langkah per pembaruan. Rentang `[l, r]` dihitung `prefiks(r) - prefiks(l - 1)`.

## Contoh setengah jadi

Lengkapi kueri jumlah prefiks.

```cpp setengah-jadi
long long jumlahPrefiks(int i) {
  long long s = ____;
  while (i > 0) {
    s += tree[____];
    i -= i & ____;
  }
  return s;
}
```

## Soal Parsons

Susun enam baris berikut (sudah diacak, tanpa lekuk) menjadi fungsi `tambah`. Larik `tree` dan ukuran `n` sudah ada. `AI: tanpa AI`: tujuannya melatih membaca urutan.

```text
(a) i += i & -i;
(b) void tambah(int i, long long v) {
(c) }
(d) tree[i] += v;
(e) while (i <= n) {
(f) }
```

## Latihan

1. `AI: boleh` **Fenwick.** Tulis pseudocode lebih dulu, lalu program yang membaca `n`, larik, dan kueri tambah titik dan jumlah rentang. Uji `n = 1`, `l = r`, dan `i = n`.
2. `AI: tanpa AI` **Telusuri.** Untuk larik `5 3 7 9 6 4 1 2`, tulis simpul `tree` mana saja yang dijumlah oleh `jumlahPrefiks(7)`, dan berapa langkahnya.
3. `AI: boleh` **Inversi.** Permutasi `a[1..n]`. Hitung banyak pasangan `i < j` dengan `a[i] > a[j]` dalam `O(n log n)`: untuk tiap `a[i]`, tanyakan berapa nilai yang sudah terlihat dan lebih besar.
4. `AI: boleh` **Tambah rentang, kueri titik.** Tambah `v` pada semua `a[l..r]` dan baca satu nilai `a[i]`, memakai Fenwick atas larik selisih. Uji dengan dua pembaruan yang bertumpuk.
5. *Opsional:* **catatan pemakaian AI.** Bila memakai AI generatif, jawab nomor 2 sendiri dulu, lalu minta penjelasan atau petunjuk bertahap, bukan program jadi. Catat alatnya, tujuanmu, garis besar perintahmu, bagian yang kamu pakai, dan caramu memeriksanya. Jangan menaruh data pribadi atau tugas bernilai pada perintah.

## Latihan bercampur

1. `AI: tanpa AI` Untuk `n = 10^5` dengan `10^5` pembaruan dan `10^5` kueri, bandingkan kira-kira banyak langkah larik jumlah prefiks biasa dan Fenwick (modul `a-x2-m12`).
2. `AI: boleh` Mengapa Fenwick memakai indeks mulai dari 1? Apa yang terjadi pada perulangan `i += i & -i` bila `i = 0`?
3. `AI: boleh` Jumlah isi Fenwick dapat melampaui `int`. Bila soal meminta jawaban modulo `10^9 + 7`, di mana `% m` diletakkan (modul `a-xii1-m8`)?

## Pengayaan (P)

Bagian ini boleh dilewati; ia bukan syarat modul berikutnya. Membangun Fenwick dengan `n` pembaruan memerlukan `O(n log n)`. Ada cara `O(n)`: salin larik ke `tree`, lalu untuk tiap `i` dari 1 sampai `n`, tambahkan `tree[i]` ke "induknya" `i + (i & -i)` bila masih di dalam `n`.

```cpp
#include <iostream>
#include <vector>
using namespace std;

int main() {
  vector<long long> a = {0, 5, 3, 7, 9, 6, 4, 1, 2};
  int n = 8;
  vector<long long> pelan(n + 1, 0);
  for (int i = 1; i <= n; i++) {
    for (int j = i; j <= n; j += j & -j) {
      pelan[j] += a[i];
    }
  }
  vector<long long> cepat = a;
  for (int i = 1; i <= n; i++) {
    int j = i + (i & -i);
    if (j <= n) {
      cepat[j] += cepat[i];
    }
  }
  for (int i = 1; i <= n; i++) {
    cout << pelan[i] << " ";
  }
  cout << "\n";
  for (int i = 1; i <= n; i++) {
    cout << cepat[i] << " ";
  }
  cout << "\n";
}
```

Keluaran:

```text
5 8 7 24 6 10 1 37 
5 8 7 24 6 10 1 37 
```

Baris pertama hasil `n` pembaruan, baris kedua hasil `O(n)`; keduanya sama. Soal pengayaan, `AI: boleh`: jelaskan mengapa urutan `i` menaik menjamin `tree[i]` sudah lengkap saat dipakai.

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `a-xii1-m10` (pertanyaan 1), sekitar tiga minggu lagi di `a-xii1-m12` (pertanyaan 2), dan sekitar delapan minggu lagi di `a-xii2-m3` (pertanyaan 3). Jawab sekarang lalu simpan.

1. Berapa langkah `tambah` dan `jumlahPrefiks` pada Fenwick, dan apa yang dihitung `i & -i`?
2. Mengapa jumlah rentang `[l, r]` ditulis `prefiks(r) - prefiks(l - 1)`?
3. Kapan Fenwick lebih cocok daripada larik jumlah prefiks biasa?

## Kesalahan umum

- **Memakai indeks mulai dari 0.** `i & -i` bernilai 0 untuk `i = 0` sehingga perulangan tak pernah maju; pakai indeks 1 sampai `n`.
- **Mengira `tree[i]` adalah `a[i]`.** Yang disimpan adalah jumlah blok yang berakhir di `i`.
- **Lupa `l - 1`.** `prefiks(r) - prefiks(l)` membuang `a[l]` dari jawaban.
- **Memakai `int` untuk jumlah.** Jumlah banyak nilai besar meluap; pakai `long long`.
- **Memakai Fenwick untuk minimum.** Pengurangan tak berlaku untuk minimum; modul berikutnya memakai segment tree.

## Cek mandiri

- [ ] Saya dapat menyebut bit apa yang diambil `i & -i`.
- [ ] Saya dapat menulis `tambah` dan `jumlahPrefiks` tanpa melihat catatan.
- [ ] Saya dapat menjawab jumlah rentang dari dua jumlah prefiks.
- [ ] Saya dapat menyebut langkah tiap operasi Fenwick dan alasannya.
- [ ] Saya dapat menulis uji batas: `n = 1`, `l = r`, `i = n`.

## Kunci dan petunjuk

**Ingat kembali.** 1: tanpa `% m`, hasil antara membengkak dan meluap; dengan `% m` setelah tiap operasi, perkalian dua hasil antara tak melebihi `(m - 1)^2`, yang muat di `long long` untuk `m` sekitar `10^9`. 2: urutan penting `P(n, k) = n * (n - 1) * ... * (n - k + 1)`; urutan tak penting `C(n, k) = P(n, k) / k!`. 3: sisi bobot 0 tidak menambah jarak, sehingga tetangganya harus diproses lebih dulu (depan); sisi bobot 1 menunggu di belakang, dan `deque` tetap terurut menurut jarak.

**Prediksi dulu.** 1: `1 2 1 4 1 2 1 8`. 2: pada pangkat dua (1, 2, 4, 8), karena bilangan itu hanya punya satu bit 1.

**Contoh setengah jadi.** Isi: `0`, `i`, dan `-i`. Program lengkap, dengan `tree` yang dibangun dari larik contoh:

```cpp
#include <iostream>
#include <vector>
using namespace std;

vector<long long> tree = {0, 5, 8, 7, 24, 6, 10, 1, 37};

long long jumlahPrefiks(int i) {
  long long s = 0;
  while (i > 0) {
    s += tree[i];
    i -= i & -i;
  }
  return s;
}

int main() {
  cout << jumlahPrefiks(8) << " " << jumlahPrefiks(5) << " " << jumlahPrefiks(7) << "\n";
}
```

Keluaran:

```text
37 30 35
```

**Soal Parsons.** Urutan: b, e, d, a, c, f. Baris `d` dan `a` ada di dalam `while`; `c` menutup `while` dan `f` menutup fungsi.

**Latihan.** 1: pseudocode: `tree[1..n] = 0`; untuk tiap nilai awal panggil `tambah`; `tambah(i, v)`: selama `i <= n`: `tree[i] += v`, `i += i & -i`; `prefiks(i)`: selama `i > 0`: tambahkan `tree[i]`, `i -= i & -i`. Pada `n = 1`, `tambah` berhenti setelah satu langkah; pada `l = 1`, `prefiks(0) = 0`. 2: `7` memakai `tree[7]` (hanya `a[7]` = 1), lalu `i = 6`: `tree[6]` (`a[5..6]` = 10), lalu `i = 4`: `tree[4]` (`a[1..4]` = 24), lalu `i = 0`. Jumlahnya 35 dalam 3 langkah, sama dengan banyak bit 1 pada `7 = 111` dalam biner. 3: nilai `a[i]` lebih besar dari yang sudah terlihat sebanyak `i` (elemen sebelumnya) dikurangi yang `<= a[i]`:

```cpp
#include <iostream>
#include <vector>
using namespace std;

int n;
vector<int> tree;

void tambah(int i) {
  while (i <= n) {
    tree[i]++;
    i += i & -i;
  }
}

int jumlahPrefiks(int i) {
  int s = 0;
  while (i > 0) {
    s += tree[i];
    i -= i & -i;
  }
  return s;
}

int main() {
  cin >> n;
  vector<int> a(n);
  for (int i = 0; i < n; i++) {
    cin >> a[i];
  }
  tree.assign(n + 1, 0);
  long long inversi = 0;
  for (int i = 0; i < n; i++) {
    inversi += i - jumlahPrefiks(a[i]);
    tambah(a[i]);
  }
  long long brute = 0;
  for (int i = 0; i < n; i++) {
    for (int j = i + 1; j < n; j++) {
      if (a[i] > a[j]) {
        brute++;
      }
    }
  }
  cout << "Fenwick " << inversi << ", percobaan " << brute << "\n";
}
```

Masukan (`masukan.txt`):

```text
6
4 2 6 1 3 5
```

Keluaran:

```text
Fenwick 7, percobaan 7
```

Hitung tangan: `4>2, 4>1, 4>3, 2>1, 6>1, 6>3, 6>5` ada 7 pasangan. 4: tambah `v` pada `[l, r]` menjadi `tambah(l, v)` dan `tambah(r + 1, -v)` pada larik selisih; nilai titik `i` adalah `jumlahPrefiks(i)`. Contoh `n = 6`: tambah 5 pada `[2, 4]`, lalu tambah 3 pada `[4, 5]`:

```cpp
#include <iostream>
#include <vector>
using namespace std;

int n;
vector<long long> tree;

void tambah(int i, long long v) {
  while (i <= n) {
    tree[i] += v;
    i += i & -i;
  }
}

long long jumlahPrefiks(int i) {
  long long s = 0;
  while (i > 0) {
    s += tree[i];
    i -= i & -i;
  }
  return s;
}

int main() {
  n = 6;
  tree.assign(n + 1, 0);
  tambah(2, 5);
  tambah(5, -5);
  tambah(4, 3);
  tambah(6, -3);
  for (int i = 1; i <= n; i++) {
    cout << jumlahPrefiks(i) << " ";
  }
  cout << "\n";
}
```

Keluaran:

```text
0 5 5 8 3 0 
```

Titik 4 bernilai `5 + 3 = 8` karena kedua rentang bertumpuk di sana.

**Latihan bercampur.** 1: larik prefiks biasa: `10^5` pembaruan kali `10^5` geseran per pembaruan, sekitar `10^10`; Fenwick: `2 * 10^5` operasi kali sekitar 17 langkah, sekitar `3,4 * 10^6`. 2: dengan `i = 0`, `i & -i = 0` sehingga `i` tak berubah dan perulangan tak berakhir. 3: pada `tree[i] = (tree[i] + v) % m` tiap penambahan, dan pada hasil selisih perbaiki tanda dengan `((x % m) + m) % m`.

**Pengayaan.** Induk `j = i + lowbit(i)` selalu lebih besar dari `i`; saat `i` diproses, semua `k < i` yang mengalir ke `i` sudah diproses, sehingga `tree[i]` sudah lengkap.

## Langkah berikutnya

Modul berikutnya, `a-xii1-m10` (segment tree), menjawab kueri minimum yang tak bisa ditangani Fenwick. Modul terkait: `a-xi1-m3` untuk operasi bit. Bacaan lanjut: halaman cppreference tentang operator aritmetika dan bitwise.
