## Untuk siapa modul ini

Modul ini untuk murid kelas XII jalur A (Algoritmik dengan C++), minggu `A-XII1-M10` silabus v1.4.1: segment tree (pohon segmen), pengayaan. Prasyarat: modul `a-xii1-m9` (pohon Fenwick).

Modul ini karangan penyusun dan disetujui pemilik program pada 2026-11-20 (keputusan lewat dialog; catatan tinjauan menjadi tindak lanjut revisi). Butir `F-BK-c` dipetakan silabus sebagai dipenuhi jalur ini; pemenuhan butir mengikuti pemetaan silabus, bukan status modul. Keluarga materi OSN yang bertaut: `struktur-data`; segment tree ditandai pengayaan (P) di jembatan OSN dan judul minggunya memuat "pengayaan", sehingga kelas reguler boleh melewati modul ini. Modul tidak menjanjikan kedalaman soal OSN dan tidak menggantikan pembinaan OSN.

Tiap soal latihan bertanda `AI: boleh` atau `AI: tanpa AI`. Masukan program diberikan lewat berkas: `./program < masukan.txt`. Semua data karangan.

## Ingat kembali

Jawab dari ingatan dulu, baru cek di kunci. Soal 1 dari `a-xii1-m9`, soal 2 dari `a-xii1-m7`, soal 3 dari `a-xii1-m2`.

1. Berapa langkah `tambah` dan `jumlahPrefiks` pada Fenwick, dan apa yang dihitung `i & -i`?
2. Tulis rumus inklusi-eksklusi untuk `|A ∪ B|`, dan mengapa irisan dikurangkan?
3. Berapa kompleksitas Dijkstra dengan `priority_queue`, dalam `n` dan `m`?

## Tujuan

Setelah modul ini kamu dapat:

- menggambar segment tree untuk larik kecil: tiap simpul menyimpan jawaban untuk satu rentang;
- menulis `bangun`, `ubah` (pembaruan titik), dan `kueri` (minimum rentang) secara rekursif;
- menyebut tiga kasus pada kueri: rentang di luar, di dalam penuh, dan sebagian;
- membandingkan segment tree dengan Fenwick dan menyebut kapan masing-masing dipakai (keluaran minggu ini: program segment tree).

## Prediksi dulu

Ini tugas baca-dan-prediksi, `AI: tanpa AI`. **Tebak dulu, tulis jawabanmu, baru jalankan.** Tiap simpul menyimpan minimum rentangnya; simpul `node` punya anak `2 * node` (separuh kiri) dan `2 * node + 1` (separuh kanan).

```cpp
#include <algorithm>
#include <iostream>
#include <vector>
using namespace std;

vector<int> a = {4, 1, 3, 2};
vector<int> tree(16);

void bangun(int node, int l, int r) {
  if (l == r) {
    tree[node] = a[l];
    return;
  }
  int mid = (l + r) / 2;
  bangun(2 * node, l, mid);
  bangun(2 * node + 1, mid + 1, r);
  tree[node] = min(tree[2 * node], tree[2 * node + 1]);
}

int main() {
  bangun(1, 0, 3);
  for (int i = 1; i <= 7; i++) {
    cout << tree[i] << " ";
  }
  cout << "\n";
}
```

1. Apa yang tercetak untuk `tree[1]` sampai `tree[7]`?
2. Simpul mana yang menyimpan minimum seluruh larik, dan simpul mana saja yang menyimpan satu elemen?

Simpan tebakanmu. Perbandingannya ada di bagian berikutnya.

## Contoh terselesaikan

Keluaran program tadi:

```text
1 1 2 4 1 3 2 
```

`tree[1] = 1` adalah minimum seluruh larik; `tree[2] = 1` untuk `{4, 1}`; `tree[3] = 2` untuk `{3, 2}`; simpul 4 sampai 7 adalah elemen `4 1 3 2`. Pohon ini tersusun dalam larik: akar di indeks 1, anak simpul `v` di `2v` dan `2v + 1`. Karena rentang selalu dibagi dua, tingginya sekitar `log2 n`, dan larik berukuran `4n` cukup untuk `n` berapa pun.

Program berikut membaca larik dan kueri `1 i v` (ubah `a[i]` menjadi `v`) atau `2 l r` (minimum `a[l..r]`, posisi berbasis 1) dan mencetak banyak simpul yang dikunjungi. Kueri memutuskan tiga kasus pada tiap simpul: rentang simpul di luar kueri (kembalikan nilai netral `INT_MAX`), di dalam kueri penuh (kembalikan `tree[node]`), atau sebagian (tanya kedua anak).

```cpp
#include <algorithm>
#include <climits>
#include <iostream>
#include <vector>
using namespace std;

int n;
vector<int> a;
vector<int> tree;
long long dikunjungi = 0;

void bangun(int node, int l, int r) {
  if (l == r) {
    tree[node] = a[l];
    return;
  }
  int mid = (l + r) / 2;
  bangun(2 * node, l, mid);
  bangun(2 * node + 1, mid + 1, r);
  tree[node] = min(tree[2 * node], tree[2 * node + 1]);
}

void ubah(int node, int l, int r, int pos, int val) {
  dikunjungi++;
  if (l == r) {
    tree[node] = val;
    return;
  }
  int mid = (l + r) / 2;
  if (pos <= mid) {
    ubah(2 * node, l, mid, pos, val);
  } else {
    ubah(2 * node + 1, mid + 1, r, pos, val);
  }
  tree[node] = min(tree[2 * node], tree[2 * node + 1]);
}

int kueri(int node, int l, int r, int ql, int qr) {
  dikunjungi++;
  if (qr < l || r < ql) {
    return INT_MAX;
  }
  if (ql <= l && r <= qr) {
    return tree[node];
  }
  int mid = (l + r) / 2;
  return min(kueri(2 * node, l, mid, ql, qr), kueri(2 * node + 1, mid + 1, r, ql, qr));
}

int main() {
  int q;
  cin >> n >> q;
  a.resize(n);
  for (int i = 0; i < n; i++) {
    cin >> a[i];
  }
  tree.assign(4 * n, 0);
  bangun(1, 0, n - 1);
  for (int k = 0; k < q; k++) {
    int jenis;
    cin >> jenis;
    long long sebelum = dikunjungi;
    if (jenis == 1) {
      int i;
      int v;
      cin >> i >> v;
      ubah(1, 0, n - 1, i - 1, v);
      cout << "ubah " << i << " menjadi " << v;
    } else {
      int l;
      int r;
      cin >> l >> r;
      cout << "minimum " << l << ".." << r << " = " << kueri(1, 0, n - 1, l - 1, r - 1);
    }
    cout << " (" << dikunjungi - sebelum << " simpul)\n";
  }
}
```

Masukan (`masukan.txt`):

```text
8 6
5 3 7 9 6 4 1 2
2 1 8
2 3 5
1 7 10
2 6 8
1 4 0
2 3 5
```

Keluaran:

```text
minimum 1..8 = 1 (1 simpul)
minimum 3..5 = 6 (9 simpul)
ubah 7 menjadi 10 (4 simpul)
minimum 6..8 = 2 (7 simpul)
ubah 4 menjadi 0 (4 simpul)
minimum 3..5 = 0 (9 simpul)
```

Baca angkanya. Kueri `1..8` hanya mengunjungi akar karena rentangnya penuh, sedangkan `3..5` mengunjungi 9 dari 15 simpul. Pembaruan selalu mengunjungi satu jalur dari akar ke daun: 4 simpul untuk `n = 8`, yaitu `log2 8 + 1`. Kueri mengunjungi paling banyak dua simpul "sebagian" per tingkat sehingga `O(log n)` langkah, kira-kira beberapa kali `log2 n` simpul; untuk `n = 10^5` itu puluhan simpul, bukan `10^5`. Bandingkan dengan Fenwick: Fenwick lebih ringkas dan cepat untuk jumlah, tetapi segment tree mampu minimum, maksimum, dan operasi lain yang tak punya pengurangan.

## Contoh setengah jadi

Lengkapi kueri minimum rentang.

```cpp setengah-jadi
int kueri(int node, int l, int r, int ql, int qr) {
  if (qr < l || r < ql) {
    return ____;
  }
  if (ql <= l && r <= qr) {
    return tree[____];
  }
  int mid = (l + r) / 2;
  return min(kueri(2 * node, l, mid, ql, qr), kueri(____, mid + 1, r, ql, qr));
}
```

## Soal Parsons

Susun tujuh baris berikut (sudah diacak, tanpa lekuk) menjadi bagian akhir fungsi `ubah(node, l, r, pos, val)`, yaitu sesudah kasus daun. `AI: tanpa AI`: tujuannya melatih membaca urutan.

```text
(a) ubah(2 * node + 1, mid + 1, r, pos, val);
(b) } else {
(c) tree[node] = min(tree[2 * node], tree[2 * node + 1]);
(d) int mid = (l + r) / 2;
(e) ubah(2 * node, l, mid, pos, val);
(f) if (pos <= mid) {
(g) }
```

## Latihan

1. `AI: boleh` **Minimum rentang.** Tulis pseudocode lebih dulu, lalu program seperti contoh. Uji `n = 1`, `l = r`, dan pembaruan di posisi pertama dan terakhir.
2. `AI: tanpa AI` **Telusuri.** Untuk larik `4 1 3 2` dan kueri `3..4` (berbasis 1), tulis simpul yang dikunjungi, nilai yang dikembalikan tiap simpul, dan hasilnya.
3. `AI: boleh` **Jumlah.** Ubah segment tree menjadi penjawab jumlah rentang. Apa yang menjadi nilai netral dan cara menggabung anak?
4. `AI: boleh` **Minimum beserta posisi.** Kembalikan nilai minimum dan posisi terkiri yang mencapainya. Apa yang disimpan di tiap simpul?
5. *Opsional:* **catatan pemakaian AI.** Bila memakai AI generatif, jawab nomor 2 sendiri dulu, lalu minta penjelasan atau petunjuk bertahap, bukan program jadi. Catat alatnya, tujuanmu, garis besar perintahmu, bagian yang kamu pakai, dan caramu memeriksanya. Jangan menaruh data pribadi atau tugas bernilai pada perintah.

## Latihan bercampur

1. `AI: tanpa AI` Mengapa tinggi segment tree sekitar `log2 n`, dan apa hubungannya dengan pembagian dua pada divide-and-conquer (modul `a-xi1-m7`)?
2. `AI: boleh` Untuk `10^5` data dengan `10^5` pembaruan dan kueri jumlah, mana yang lebih ringan memorinya, Fenwick atau segment tree, dan mengapa (modul `a-xii1-m9`)?
3. `AI: boleh` Kueri minimum dengan perulangan biasa menelusuri `r - l + 1` elemen. Untuk `10^5` kueri pada `n = 10^5`, kira-kira berapa langkah, dibanding segment tree (modul `a-x2-m12`)?

## Pengayaan (P)

Bagian ini boleh dilewati; ia bukan syarat modul berikutnya. Seluruh topik minggu ini sudah pengayaan; bagian ini lebih jauh lagi: segment tree **iteratif** dari bawah ke atas tanpa rekursi dan dengan larik hanya `2n`. Daun ada di `t[n + i]`; kueri memakai rentang setengah terbuka `[l, r)`. Program ini membaca masukan yang sama dengan program contoh dan hanya mencetak hasil kueri.

```cpp
#include <algorithm>
#include <climits>
#include <iostream>
#include <vector>
using namespace std;

int n;
vector<int> t;

void ubah(int p, int v) {
  for (t[p += n] = v; p > 1; p >>= 1) {
    t[p >> 1] = min(t[p], t[p ^ 1]);
  }
}

int kueri(int l, int r) {
  int hasil = INT_MAX;
  for (l += n, r += n; l < r; l >>= 1, r >>= 1) {
    if (l & 1) {
      hasil = min(hasil, t[l++]);
    }
    if (r & 1) {
      hasil = min(hasil, t[--r]);
    }
  }
  return hasil;
}

int main() {
  int q;
  cin >> n >> q;
  t.assign(2 * n, 0);
  for (int i = 0; i < n; i++) {
    cin >> t[n + i];
  }
  for (int i = n - 1; i > 0; i--) {
    t[i] = min(t[2 * i], t[2 * i + 1]);
  }
  for (int k = 0; k < q; k++) {
    int jenis;
    cin >> jenis;
    if (jenis == 1) {
      int i;
      int v;
      cin >> i >> v;
      ubah(i - 1, v);
    } else {
      int l;
      int r;
      cin >> l >> r;
      cout << kueri(l - 1, r) << "\n";
    }
  }
}
```

Masukan (`masukan.txt`):

```text
8 6
5 3 7 9 6 4 1 2
2 1 8
2 3 5
1 7 10
2 6 8
1 4 0
2 3 5
```

Keluaran:

```text
1
6
2
0
```

Jawabannya sama dengan program rekursif. Soal pengayaan, `AI: boleh`: jelaskan mengapa `t[p >> 1] = min(t[p], t[p ^ 1])` memperbarui induk dengan benar.

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `a-xii1-m11` (pertanyaan 1), sekitar tiga minggu lagi di `a-xii1-m13` (pertanyaan 2), dan sekitar delapan minggu lagi di `a-xii2-m4` (pertanyaan 3). Jawab sekarang lalu simpan.

1. Mengapa segment tree memakai larik berukuran sekitar `4n`, dan berapa langkah kueri dan pembaruannya?
2. Operasi apa yang dilayani segment tree tetapi tidak Fenwick? Jelaskan dengan minimum.
3. Sebutkan tiga kasus pada kueri rekursif segment tree.

## Kesalahan umum

- **Larik `tree` terlalu kecil.** `2n` tidak cukup untuk versi rekursif; pakai `4n`.
- **Nilai netral salah.** Untuk minimum, netralnya `INT_MAX`; `0` merusak hasil bila semua data positif.
- **Lupa memperbarui induk sesudah anak berubah.** Jawaban rentang yang meliputi simpul itu menjadi basi.
- **Mencampur indeks berbasis 0 dan 1.** Samakan satu kebiasaan dan ubah di tepi masukan.
- **Mengira kueri selalu menelusuri sampai daun.** Rentang yang penuh berhenti di simpul itu juga.

## Cek mandiri

- [ ] Saya dapat menggambar segment tree untuk larik berisi empat sampai delapan elemen.
- [ ] Saya dapat menyebut tiga kasus kueri dan nilai yang dikembalikan tiap kasus.
- [ ] Saya dapat menulis `ubah` dan `kueri` rekursif.
- [ ] Saya dapat menyebut banyak langkah kueri dan pembaruan beserta alasannya.
- [ ] Saya dapat membedakan kapan memakai Fenwick dan kapan segment tree.

## Kunci dan petunjuk

**Ingat kembali.** 1: keduanya sekitar `log n` langkah; `i & -i` adalah bit 1 terendah dari `i`, yang menentukan ukuran blok `tree[i]`. 2: `|A ∪ B| = |A| + |B| - |A ∩ B|`; unsur di irisan terhitung di `|A|` dan di `|B|`, jadi dikurangkan sekali agar terhitung sekali. 3: `O((n + m) log n)`, karena entri paling banyak `2m + 1` dan tiap `push` dan `pop` `O(log n)`.

**Prediksi dulu.** 1: `1 1 2 4 1 3 2`. 2: simpul 1 menyimpan minimum seluruh larik; simpul 4 sampai 7 menyimpan satu elemen.

**Contoh setengah jadi.** Isi: `INT_MAX`, `node`, dan `2 * node + 1`. Program lengkap dengan pohon dari larik `5 3 7 9` yang sudah dibangun:

```cpp
#include <algorithm>
#include <climits>
#include <iostream>
#include <vector>
using namespace std;

vector<int> tree = {0, 3, 3, 7, 5, 3, 7, 9, 0, 0, 0, 0, 0, 0, 0, 0};

int kueri(int node, int l, int r, int ql, int qr) {
  if (qr < l || r < ql) {
    return INT_MAX;
  }
  if (ql <= l && r <= qr) {
    return tree[node];
  }
  int mid = (l + r) / 2;
  return min(kueri(2 * node, l, mid, ql, qr), kueri(2 * node + 1, mid + 1, r, ql, qr));
}

int main() {
  cout << kueri(1, 0, 3, 0, 2) << " " << kueri(1, 0, 3, 2, 3) << "\n";
}
```

Keluaran:

```text
3 7
```

**Soal Parsons.** Urutan: d, f, e, b, a, g, c. Baris `d` menghitung titik tengah; `f` sampai `g` memilih anak yang memuat `pos`; `c` memperbarui simpul ini setelah anaknya berubah.

**Latihan.** 1: pseudocode: `bangun(node, l, r)`: bila `l = r` simpan `a[l]`; selain itu bangun kedua anak lalu `tree[node] = min` kedua anak. `kueri`: bila di luar kembalikan netral; bila di dalam penuh kembalikan `tree[node]`; selain itu gabungkan kedua anak. Pada `n = 1`, akar adalah daun. 2: akar `[0, 3]` sebagian, anak kiri `[0, 1]` di luar (mengembalikan `INT_MAX`), anak kanan `[2, 3]` di dalam penuh dan mengembalikan `tree[3] = 2`; hasilnya `min(INT_MAX, 2) = 2`, dengan 3 simpul dikunjungi. 3: netral `0`, penggabungan `tree[2 * node] + tree[2 * node + 1]` (dan di kasus di luar dikembalikan `0`). 4: simpan `pair<int, int>` berisi nilai dan posisi; membandingkan `pair` membandingkan nilai dulu, lalu posisi, sehingga posisi terkiri menang pada seri.

**Latihan bercampur.** 1: tiap tingkat membagi dua rentang, jadi setelah `k` tingkat ukuran rentang sekitar `n / 2^k`, dan berhenti saat 1 sehingga `k` sekitar `log2 n`. 2: Fenwick hanya `n + 1` entri, segment tree `4n`; Fenwick lebih ringan. 3: perulangan biasa `10^5 * 10^5 = 10^10` langkah; segment tree `10^5` kali puluhan simpul, sekitar jutaan.

**Pengayaan.** Indeks `p` dan `p ^ 1` adalah dua saudara (anak dari induk yang sama `p >> 1`); induk menyimpan minimum keduanya.

## Langkah berikutnya

Modul berikutnya, `a-xii1-m11` (geometri dasar), meninggalkan struktur data. Gunakan Fenwick dan segment tree lagi pada proyek `a-xii1-m13`. Modul terkait: `a-xii1-m9`. Bacaan lanjut: halaman cppreference tentang `std::min` dan `std::vector`.
