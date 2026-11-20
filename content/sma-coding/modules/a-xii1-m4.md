## Untuk siapa modul ini

Modul ini untuk murid kelas XII jalur A (Algoritmik dengan C++), minggu `A-XII1-M4` silabus v1.4.1: himpunan saling lepas (DSU, *disjoint set union*). Prasyarat: modul `a-xii1-m3` (Kruskal); rekursi dari `a-x2-m11` dipakai di sini.

Modul ini karangan penyusun dan disetujui pemilik program pada 2026-11-20 (keputusan lewat dialog; catatan tinjauan menjadi tindak lanjut revisi). Butir `F-BK-c` dipetakan silabus sebagai dipenuhi jalur ini; pemenuhan butir mengikuti pemetaan silabus, bukan status modul. Keluarga materi OSN yang bertaut: `graph-tree` dan `struktur-data`; DSU ditandai pengayaan (P) di jembatan OSN, sehingga kelas reguler boleh melewatinya. Modul tidak menjanjikan kedalaman soal OSN.

Tiap soal latihan bertanda `AI: boleh` atau `AI: tanpa AI`. Masukan program lewat berkas: `./program < masukan.txt`. Semua data karangan.

## Ingat kembali

Jawab dari ingatan dulu, baru cek kunci. Soal 1 dari `a-xii1-m3`, soal 2 dari `a-xii1-m1`, soal 3 dari `a-xi2-m10`, soal 4 dari `a-x2-m11`.

1. Mengapa Kruskal mengurutkan sisi menurut bobot dan menolak sisi yang menutup siklus?
2. Bagaimana Bellman-Ford mengetahui adanya siklus negatif?
3. Kapan rata-rata menyesatkan, dan ringkasan apa lagi yang dilaporkan di sampingnya?
4. Mengapa rekursi tanpa kasus dasar berbahaya, dan apa hubungannya dengan tumpukan pemanggilan?

## Tujuan

Setelah modul ini kamu dapat:

- memodelkan kelompok yang saling lepas sebagai pohon dengan satu **akar** per kelompok;
- menulis `cari` dengan **kompresi lintasan** dan `gabung` menurut ukuran (keluaran minggu ini: program DSU);
- menjawab "apakah dua unsur sekelompok" dan menghitung kelompok yang tersisa selagi sisi bertambah;
- menyebut bahwa tiap operasi praktis hampir konstan dan membandingkannya dengan label di modul sebelumnya.

## Prediksi dulu

Tugas baca-dan-prediksi, `AI: tanpa AI`. **Tebak dulu, tulis, baru jalankan.** Larik `induk` menyimpan induk tiap simpul; simpul akar menunjuk dirinya sendiri. Di sini simpul 5 menurun lewat rantai 4, 3, 2 ke akar 1.

```cpp
#include <iostream>
using namespace std;

int induk[6] = {0, 1, 1, 2, 3, 4};
int langkah = 0;

int cari(int x) {
  if (induk[x] != x) {
    langkah++;
    induk[x] = cari(induk[x]);
  }
  return induk[x];
}

void cetak() {
  for (int i = 1; i <= 5; i++) {
    cout << induk[i] << " ";
  }
  cout << "\n";
}

int main() {
  cout << "sebelum: ";
  cetak();
  int akar = cari(5);
  cout << "akar " << akar << " ditemukan dalam " << langkah << " langkah naik\n";
  cout << "sesudah: ";
  cetak();
  langkah = 0;
  cari(5);
  cout << "pencarian kedua: " << langkah << " langkah naik\n";
}
```

1. Berapa langkah naik pada `cari(5)` pertama?
2. Tulis isi `induk` sesudahnya, dan berapa langkah naik pada pencarian kedua?

## Contoh terselesaikan

Keluaran program tadi:

```text
sebelum: 1 1 2 3 4 
akar 1 ditemukan dalam 4 langkah naik
sesudah: 1 1 1 1 1 
pencarian kedua: 1 langkah naik
```

Fungsi `cari` naik sampai akar, lalu `induk[x] = cari(induk[x])` membuat **setiap simpul di lintasan itu menunjuk akar langsung**. Itulah **kompresi lintasan**: pencarian pertama mahal (4 langkah), tetapi pencarian kedua murah (1 langkah).

Dasarnya sederhana: tiap kelompok adalah satu pohon, dan dua unsur sekelompok bila `cari` mereka memberi akar yang sama. `gabung(a, b)` mencari akar keduanya; bila berbeda, akar yang **lebih kecil** (menurut ukuran kelompok) disambung ke akar yang lebih besar. Penyambungan harus antar-**akar**, bukan simpul sembarang, supaya semua simpul kedua kelompok ikut pindah. Penggabungan menurut ukuran menjaga pohon tetap pendek, paling tinggi sekitar `log2 n`.

Program berikut membaca `n` unsur dan `q` perintah `G a b` (gabung) atau `T a b` (tanya), dan menghitung kelompok yang tersisa:

```cpp
#include <iostream>
#include <utility>
#include <vector>
using namespace std;

vector<int> induk;
vector<int> ukuran;
long long langkah = 0;

int cari(int x) {
  if (induk[x] != x) {
    langkah++;
    induk[x] = cari(induk[x]);
  }
  return induk[x];
}

bool gabung(int a, int b) {
  a = cari(a);
  b = cari(b);
  if (a == b) {
    return false;
  }
  if (ukuran[a] < ukuran[b]) {
    swap(a, b);
  }
  induk[b] = a;
  ukuran[a] += ukuran[b];
  return true;
}

int main() {
  int n, q;
  cin >> n >> q;
  induk.resize(n + 1);
  ukuran.assign(n + 1, 1);
  for (int i = 1; i <= n; i++) {
    induk[i] = i;
  }
  int komponen = n;
  for (int i = 0; i < q; i++) {
    char jenis;
    int a, b;
    cin >> jenis >> a >> b;
    if (jenis == 'G') {
      if (gabung(a, b)) {
        komponen--;
        cout << "gabung " << a << " " << b << ": sekarang " << komponen << " komponen\n";
      } else {
        cout << "gabung " << a << " " << b << ": sudah sekomponen\n";
      }
    } else {
      cout << "tanya " << a << " " << b << ": " << (cari(a) == cari(b) ? "ya" : "tidak") << "\n";
    }
  }
  cout << langkah << " langkah naik untuk " << q << " operasi\n";
}
```

Masukan (`masukan.txt`):

```text
8 10
G 1 2
G 3 4
T 1 4
G 2 3
T 1 4
G 1 4
G 5 6
T 5 8
G 6 8
T 5 8
```

Keluaran:

```text
gabung 1 2: sekarang 7 komponen
gabung 3 4: sekarang 6 komponen
tanya 1 4: tidak
gabung 2 3: sekarang 5 komponen
tanya 1 4: ya
gabung 1 4: sudah sekomponen
gabung 5 6: sekarang 4 komponen
tanya 5 8: tidak
gabung 6 8: sekarang 3 komponen
tanya 5 8: ya
7 langkah naik untuk 10 operasi
```

Pertanyaan `T 1 4` mula-mula `tidak`, lalu `ya` setelah `G 2 3` menyambung dua kelompok. Perintah `G 1 4` ditolak karena sudah sekelompok. Dengan kedua trik, tiap operasi amortisasi sangat dekat dengan konstan (tepatnya `O(α(n))`, kebalikan fungsi Ackermann yang tumbuh sangat lambat; klaim ini dari pengetahuan umum, `[belum terverifikasi]`). Di sini 7 langkah naik untuk 10 operasi. Bandingkan dengan label di modul `a-xii1-m3`, yang menyentuh hingga `n` simpul tiap penggabungan: dengan DSU, Kruskal didominasi pengurutan, `O(m log m)`.

## Contoh setengah jadi

Lengkapi `cari` dan penyambungan menurut ukuran.

```cpp setengah-jadi
int cari(int x) {
  if (induk[x] != ____) {
    induk[x] = ____(induk[x]);
  }
  return induk[x];
}
// dalam gabung, setelah a dan b menjadi akar:
if (ukuran[a] ____ ukuran[b]) {
  swap(a, b);
}
```

## Soal Parsons

Susun tujuh baris berikut (sudah diacak) menjadi isi `gabung(a, b)`. `AI: tanpa AI`.

```text
(a)   if (a == b) return false;
(b)   a = cari(a);
(c)   b = cari(b);
(d)   induk[b] = a;
(e)   ukuran[a] += ukuran[b];
(f)   if (ukuran[a] < ukuran[b]) swap(a, b);
(g)   return true;
```

## Latihan

1. `AI: boleh` **Komponen dinamis.** Enam kota, jalan dibuka berurutan: `1 2`, `3 4`, `5 6`, `2 3`, `4 5`. Tulis pseudocode dulu, lalu cetak banyak komponen dan ukuran komponen terbesar sesudah tiap jalan.
2. `AI: boleh` **Kruskal cepat.** Ganti label pada program modul `a-xii1-m3` dengan DSU; keluarannya harus sama.
3. `AI: tanpa AI` **Telusur.** `induk[1..6] = 1 1 2 3 4 5` (rantai). Tulis `induk` sesudah `cari(6)` dengan kompresi, dan banyak langkah naik pencarian pertama dan kedua.
4. `AI: boleh` **Kelompok.** Tambahkan perintah `U x` yang mencetak ukuran kelompok yang memuat `x`.
5. *Opsional:* **catatan pemakaian AI.** Bila memakai AI generatif, jawab nomor 3 sendiri dulu, lalu minta penjelasan atau petunjuk bertahap, bukan program jadi. Catat alat, tujuan, garis besar perintah, bagian yang kamu pakai, dan cara memeriksanya. Jangan menaruh data pribadi atau tugas bernilai pada perintah.

## Latihan bercampur

1. `AI: boleh` Mengapa `cari` rekursif aman pada DSU yang menggabung menurut ukuran bila `n = 1.000.000` (modul `a-x2-m11`)?
2. `AI: tanpa AI` Untuk `n = m = 100.000`, bandingkan kira-kira langkah penggantian label dengan pengurutan sisi pada Kruskal (modul `a-xii1-m3`).
3. `AI: boleh` Menghitung komponen: kapan DFS cukup, dan kapan DSU lebih cocok (modul `a-xi2-m7`)?

## Pengayaan (P)

Boleh dilewati. Karena `cari` murah, DSU cocok untuk **mendeteksi siklus** pada sisi yang datang satu per satu: sisi yang kedua ujungnya sudah sekelompok menutup siklus. Program berikut mencetak nomor sisi pertama yang menutup siklus:

```cpp
#include <iostream>
#include <vector>
using namespace std;

vector<int> induk;

int cari(int x) {
  if (induk[x] != x) {
    induk[x] = cari(induk[x]);
  }
  return induk[x];
}

int main() {
  int n = 6;
  int sisi[6][2] = {{1, 2}, {2, 3}, {4, 5}, {3, 1}, {5, 6}, {2, 6}};
  induk.resize(n + 1);
  for (int i = 1; i <= n; i++) {
    induk[i] = i;
  }
  for (int i = 0; i < 6; i++) {
    int a = cari(sisi[i][0]);
    int b = cari(sisi[i][1]);
    if (a == b) {
      cout << "sisi ke-" << i + 1 << " membentuk siklus\n";
      return 0;
    }
    induk[a] = b;
  }
  cout << "tidak ada siklus\n";
}
```

Keluaran:

```text
sisi ke-4 membentuk siklus
```

Sisi ke-4 (`3 1`) menutup lingkaran `1-2-3`.

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `a-xii1-m5` (pertanyaan 1), sekitar tiga minggu lagi di `a-xii1-m7` (pertanyaan 2), dan sekitar delapan minggu lagi di `a-xii1-m12` (pertanyaan 3). Jawab sekarang lalu simpan.

1. Apa yang dilakukan kompresi lintasan pada `cari`?
2. Mengapa `gabung` harus menyambung akar, bukan simpul sembarang?
3. Bagaimana DSU menjawab "apakah dua simpul sudah terhubung" dan berapa komponen yang tersisa?

## Kesalahan umum

- **Membandingkan `induk[a]` dengan `induk[b]`.** Yang dibandingkan akar, yaitu hasil `cari(a)` dan `cari(b)`.
- **Menyambung simpul biasa, bukan akar.** Sebagian kelompok terputus dari akarnya.
- **Lupa mengisi `induk[i] = i` di awal.** Tiap simpul harus akar kelompoknya sendiri.
- **Memakai ukuran simpul biasa.** Ukuran dicatat dan dibandingkan pada akar.
- **Mengira kompresi mengubah jawaban.** Ia hanya mempercepat; kelompok tetap sama.

## Cek mandiri

- [ ] Saya dapat menjelaskan kelompok sebagai pohon dengan satu akar.
- [ ] Saya dapat menulis `cari` dengan kompresi lintasan.
- [ ] Saya dapat menulis `gabung` menurut ukuran.
- [ ] Saya dapat menghitung komponen tersisa selagi sisi bertambah.
- [ ] Saya dapat menjelaskan mengapa DSU lebih cepat daripada label.

## Kunci dan petunjuk

**Ingat kembali.** 1: mengurutkan agar sisi termurah dipertimbangkan lebih dulu, dan menolak sisi sekomponen karena ia menutup siklus sehingga bukan lagi pohon. 2: dengan menjalankan putaran ke-`n`; bila masih ada sisi yang bisa dilonggarkan, ada siklus negatif yang terjangkau dari awal. 3: bila ada nilai ekstrem atau data timpang; laporkan juga banyak baris, nilai terbesar dan terkecil. 4: pemanggilan tidak pernah berhenti, dan tiap pemanggilan menambah satu bingkai di tumpukan pemanggilan yang berukuran terbatas; akhirnya tempat habis dan program berhenti dengan galat.

**Prediksi dulu.** 1: 4 langkah (simpul 5, 4, 3, 2 bukan akar). 2: `induk = 1 1 1 1 1`, dan pencarian kedua 1 langkah (simpul 5 langsung menunjuk akar 1). Cocokkan dengan keluaran di bagian contoh.

**Contoh setengah jadi.** Isi: `x`, `cari`, `<`. Program lengkap yang mencetak banyak kelompok sisa:

```cpp
#include <iostream>
#include <utility>
#include <vector>
using namespace std;

vector<int> induk;
vector<int> ukuran;

int cari(int x) {
  if (induk[x] != x) {
    induk[x] = cari(induk[x]);
  }
  return induk[x];
}

bool gabung(int a, int b) {
  a = cari(a);
  b = cari(b);
  if (a == b) {
    return false;
  }
  if (ukuran[a] < ukuran[b]) {
    swap(a, b);
  }
  induk[b] = a;
  ukuran[a] += ukuran[b];
  return true;
}

int main() {
  int n, q;
  cin >> n >> q;
  induk.resize(n + 1);
  ukuran.assign(n + 1, 1);
  for (int i = 1; i <= n; i++) {
    induk[i] = i;
  }
  int komponen = n;
  for (int i = 0; i < q; i++) {
    char jenis;
    int a, b;
    cin >> jenis >> a >> b;
    if (jenis == 'G' && gabung(a, b)) {
      komponen--;
    }
  }
  cout << "komponen: " << komponen << "\n";
}
```

Masukan (`masukan.txt`):

```text
8 10
G 1 2
G 3 4
T 1 4
G 2 3
T 1 4
G 1 4
G 5 6
T 5 8
G 6 8
T 5 8
```

Keluaran:

```text
komponen: 3
```

**Soal Parsons.** Urutan benar: b, c, a, f, d, e, g. Akar dicari lebih dulu (b, c) sebelum dibandingkan di (a); (f) menukar agar `a` menjadi akar yang lebih besar sebelum (d) dan (e).

**Latihan.** 1: sesudah tiap jalan: `5 komponen, terbesar 2`; `4, 2`; `3, 2`; `2, 4`; `1, 6`. 2: ganti `komp` dengan `induk` dan `ukuran`; sisi diambil bila `gabung(u, v)` mengembalikan `true`. 3: sesudah `cari(6)` pertama: `induk = 1 1 1 1 1 1`; pencarian pertama 5 langkah (simpul 6, 5, 4, 3, 2) dan kedua 1 langkah. 4: cetak `ukuran[cari(x)]`.

**Latihan bercampur.** 1: kedalaman pohon paling tinggi sekitar `log2 n = 20`, jadi rekursi hanya sekitar 20 bingkai. 2: label sekitar `n * (n - 1) = 10^10` penggantian; pengurutan sekitar `m * log2 m = 100.000 * 17 = 1,7 juta`. 3: DFS cukup bila graf tetap dan komponen dihitung sekali; DSU lebih cocok bila sisi datang bertahap dan jawaban dibutuhkan sesudah tiap sisi, karena tidak perlu mengulang penelusuran `O(n + m)`.

**Pengayaan (P).** Tidak ada kunci tunggal; pastikan kamu dapat menjelaskan mengapa `cari` kedua sisi diperiksa sebelum disambung.

**Ulang berjarak.** 1: membuat semua simpul di lintasan pencarian langsung menunjuk akar, sehingga pencarian berikutnya lebih pendek. 2: karena hanya akar yang mewakili seluruh kelompok; menyambung simpul biasa meninggalkan sebagian kelompok di pohon lain. 3: dua simpul terhubung bila `cari` keduanya sama; banyak komponen dikurangi satu setiap `gabung` yang berhasil dari awal `n`.

## Langkah berikutnya

Modul berikut: `a-xii1-m5` (pohon berakar dan LCA). Modul terkait: `matkom-himpunan-relasi-fungsi`. Bacaan lanjut: halaman cppreference tentang `std::swap`.
