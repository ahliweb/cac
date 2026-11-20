## Untuk siapa modul ini

Modul ini untuk murid kelas XI jalur A (Algoritmik dengan C++), minggu `A-XI2-M10` silabus v1.4.1: data bervolume besar II (mengelompokkan dan merekap data). Prasyarat: modul `a-xi2-m9` (membaca CSV) dan `a-xi1-m9` (`map`).

Modul ini karangan penyusun dan disetujui pemilik program pada 2026-11-20 (keputusan lewat dialog; catatan tinjauan menjadi tindak lanjut revisi). Butir `F-AD-a` dipetakan silabus sebagai dipenuhi jalur ini; pemenuhan butir mengikuti pemetaan silabus, bukan status modul. Semua data di modul ini **sintetis**: karangan penyusun, tanpa data murid atau orang nyata. Tiap soal latihan bertanda `AI: boleh` atau `AI: tanpa AI`. Masukan program diberikan lewat berkas: `./program < data.csv`.

## Ingat kembali

Jawab dari ingatan dulu, baru cek di kunci. Soal 1 dari `a-xi2-m9`, soal 2 dari `a-xi2-m7`, soal 3 dari `a-xi2-m2`.

1. Berapa kolom yang dikembalikan `getline(ss, bagian, ',')` secara berulang untuk `a,,c` dan untuk `a,b,`?
2. Apa beda urutan kunjungan BFS dan DFS pada graf yang sama?
3. Mengapa tabel pemetik buah hanya memerlukan dua nilai terakhir, dan apa akibatnya pada memori?

## Tujuan

Setelah modul ini kamu dapat:

- mengelompokkan baris data menurut satu atau dua kolom dengan `map` (keluaran minggu ini: program rekap);
- menghitung per kelompok: banyak baris, jumlah, rata-rata, dan nilai terbesar;
- mengurutkan hasil rekap menurut jumlah dengan pembanding sendiri;
- menyebut banyak langkah merekap `n` baris ke `k` kelompok.

## Prediksi dulu

Ini tugas baca-dan-prediksi, `AI: tanpa AI`. Kelompok dibuat dengan menambahkan ke `map` menurut kunci. **Tebak dulu, tulis, baru jalankan.**

```cpp
#include <iostream>
#include <map>
#include <string>
using namespace std;

int main() {
  string kategori[5] = {"roti", "buah", "roti", "nasi", "buah"};
  int jumlah[5] = {3, 5, 4, 1, 2};
  map<string, int> total;
  for (int i = 0; i < 5; i++) {
    total[kategori[i]] += jumlah[i];
  }
  for (const auto& p : total) {
    cout << p.first << ": " << p.second << "\n";
  }
}
```

1. Apa yang tercetak, dan dalam urutan apa?
2. Apakah kamu perlu mengurutkan data lebih dulu agar kelompoknya terbentuk?

## Contoh terselesaikan

Keluaran program tadi:

```text
buah: 7
nasi: 1
roti: 7
```

Urutannya menurut kunci (abjad), bukan urutan data masuk, dan data tidak perlu diurutkan lebih dulu: `total[kategori[i]] += jumlah[i]` membuat entri baru bernilai 0 bila kunci belum ada, lalu menambahkannya. Inilah **pengelompokan**: baris dengan kunci sama bertemu di satu entri `map`.

Data sintetis kantin karangan berikut dikelompokkan menurut kolom `kategori`. Satu baris sengaja rusak (jumlah bukan angka) dan harus ditolak seperti di modul `a-xi2-m9`. Program menghitung per kategori: banyak baris, jumlah, rata-rata, dan nilai terbesar, lalu mencetaknya menurut jumlah terbesar.

```cpp
#include <algorithm>
#include <iomanip>
#include <iostream>
#include <map>
#include <sstream>
#include <string>
#include <utility>
#include <vector>
using namespace std;

struct Rekap {
  int banyak = 0;
  long long jumlah = 0;
  int terbesar = 0;
};

bool semuaAngka(const string& s) {
  if (s.empty()) {
    return false;
  }
  for (char c : s) {
    if (c < '0' || c > '9') {
      return false;
    }
  }
  return true;
}

int main() {
  ios::sync_with_stdio(false);
  cin.tie(nullptr);
  string baris;
  getline(cin, baris);
  map<string, Rekap> peta;
  int ditolak = 0;
  while (getline(cin, baris)) {
    vector<string> kolom;
    istringstream ss(baris);
    string bagian;
    while (getline(ss, bagian, ',')) {
      kolom.push_back(bagian);
    }
    if (kolom.size() != 3 || !semuaAngka(kolom[2])) {
      ditolak++;
      continue;
    }
    int nilai = stoi(kolom[2]);
    Rekap& r = peta[kolom[1]];
    r.banyak++;
    r.jumlah += nilai;
    if (nilai > r.terbesar) {
      r.terbesar = nilai;
    }
  }
  vector<pair<long long, string>> urut;
  for (const auto& p : peta) {
    urut.push_back({p.second.jumlah, p.first});
  }
  sort(urut.begin(), urut.end(), [](const pair<long long, string>& a, const pair<long long, string>& b) {
    if (a.first != b.first) {
      return a.first > b.first;
    }
    return a.second < b.second;
  });
  cout << fixed << setprecision(2);
  for (const auto& u : urut) {
    const Rekap& r = peta[u.second];
    cout << u.second << ": " << r.banyak << " baris, jumlah " << r.jumlah << ", rata-rata " << (double)r.jumlah / r.banyak << ", terbesar " << r.terbesar << "\n";
  }
  cout << ditolak << " baris ditolak\n";
}
```

Masukan (`data.csv`):

```text
bulan,kategori,jumlah
2026-01,minuman,120
2026-01,roti,70
2026-01,buah,40
2026-01,nasi,25
2026-02,minuman,95
2026-02,roti,88
2026-02,buah,52
2026-02,nasi,41
2026-03,minuman,140
2026-03,roti,64
2026-03,buah,tidak-ada
2026-03,nasi,30
```

Keluaran:

```text
minuman: 3 baris, jumlah 355, rata-rata 118.33, terbesar 140
roti: 3 baris, jumlah 222, rata-rata 74.00, terbesar 88
nasi: 3 baris, jumlah 96, rata-rata 32.00, terbesar 41
buah: 2 baris, jumlah 92, rata-rata 46.00, terbesar 52
1 baris ditolak
```

Pada `peta[u.second]` kuncinya pasti ada, sehingga tidak membuat entri baru. Rata-rata dibagi `banyak` yang pasti lebih dari 0 karena entri baru hanya lahir saat ada baris sah. Hati-hati dengan rata-rata saja: satu nilai yang sangat besar menariknya jauh dari kebanyakan data, jadi laporkan juga banyak baris dan nilai terbesar (dan sebaiknya terkecil) di sampingnya.

Pengelompokan dua kolom memakai kunci `pair`. Program berikut menjumlahkan menurut (`bulan`, `kategori`) dan mencetak satu baris per pasangan, terurut menurut bulan lalu kategori karena `pair` dibandingkan leksikografis.

```cpp
#include <iostream>
#include <map>
#include <sstream>
#include <string>
#include <utility>
#include <vector>
using namespace std;

int main() {
  string baris;
  getline(cin, baris);
  map<pair<string, string>, long long> total;
  while (getline(cin, baris)) {
    vector<string> kolom;
    istringstream ss(baris);
    string bagian;
    while (getline(ss, bagian, ',')) {
      kolom.push_back(bagian);
    }
    if (kolom.size() != 3) {
      continue;
    }
    total[{kolom[0], kolom[1]}] += stoll(kolom[2]);
  }
  for (const auto& p : total) {
    cout << p.first.first << " " << p.first.second << " " << p.second << "\n";
  }
}
```

Masukan (`masukan.txt`):

```text
bulan,kategori,jumlah
2026-02,roti,10
2026-01,roti,5
2026-02,roti,7
2026-01,buah,3
```

Keluaran:

```text
2026-01 buah 3
2026-01 roti 5
2026-02 roti 17
```

Perkiraan langkah: tiap baris memerlukan satu pencarian di `map` dengan `k` entri, yaitu sekitar `log2 k` langkah, ditambah pemecahan baris yang sebanding dengan panjangnya. Untuk 200.000 baris dan empat kategori kira-kira `200.000 * 2 = 400.000` langkah pencarian, jadi merekap `n` baris itu `O(n log k)`. Mengurutkan hasil rekap hanya `k log k` dan tidak bergantung pada `n`: itu sebabnya merekap dulu baru mengurutkan jauh lebih murah daripada mengurutkan semua baris.

Untuk melihat volume, kamu dapat menjalankan program pertama pada berkas `besar.csv` dari modul `a-xi2-m9` (kolomnya cocok). Perintah dan keluaran asli:

```text
$ ./rekap < besar.csv
nasi: 50000 baris, jumlah 1282699, rata-rata 25.65, terbesar 50
buah: 50000 baris, jumlah 1277112, rata-rata 25.54, terbesar 50
roti: 50000 baris, jumlah 1275660, rata-rata 25.51, terbesar 50
minuman: 50000 baris, jumlah 1266787, rata-rata 25.34, terbesar 50
0 baris ditolak
```

## Contoh setengah jadi

Lengkapi potongan yang menghitung banyak kemunculan tiap kategori dari `vector<string> kat` dan mencetak kategori beserta jumlahnya.

```cpp setengah-jadi
map<string, int> hitung;
for (const string& k : ____) {
  hitung[k]____;
}
for (const auto& p : hitung) {
  cout << p.____ << " " << p.second << "\n";
}
```

## Soal Parsons

Susun delapan baris berikut (sudah diacak) menjadi potongan yang menjumlahkan nilai per kunci, lalu mencetak. `AI: tanpa AI`.

```text
(a)   map<string, long long> jumlah;
(b)   for (int i = 0; i < n; i++) {
(c)     jumlah[kunci[i]] += nilai[i];
(d)   }
(e)   for (const auto& p : jumlah) {
(f)     cout << p.first << " " << p.second << "\n";
(g)   }
(h)   // kunci dan nilai sudah terisi sebanyak n
```

## Latihan

1. `AI: boleh` **Per bulan.** Pada `data.csv` contoh, cetak jumlah per `bulan`, bukan per kategori. Tulis pseudocode dulu; apa yang berubah dari program rekap?
2. `AI: boleh` **Terbesar dan terkecil.** Tambahkan nilai terkecil per kategori. Apa nilai awal yang aman untuk `terkecil`?
3. `AI: tanpa AI` **Prediksi.** Pada `map<string, int> m;` dijalankan `m["a"] += 2; m["b"] += 1; m["a"] += 3;`. Apa isi `m` dan berapa `size()`?
4. `AI: boleh` **Peringkat.** Cetak tiga kategori dengan jumlah terbesar. Haruskah seluruh hasil diurutkan?
5. *Opsional:* **catatan pemakaian AI.** Bila memakai AI generatif, jawab nomor 3 sendiri dulu, lalu minta penjelasan atau petunjuk bertahap, bukan program jadi. Catat alatnya, tujuanmu, garis besar perintahmu, bagian yang kamu pakai, dan caramu memeriksanya. Jangan menaruh data pribadi atau tugas bernilai pada perintah.

## Latihan bercampur

1. `AI: boleh` Mengapa `vector<pair<long long, string>>` yang dibangun dari `map` perlu pembanding sendiri agar jumlah terbesar tampil lebih dulu, dan apa yang terjadi bila jumlahnya sama (modul `a-xi1-m8`)?
2. `AI: tanpa AI` Memakai `heap` berukuran 3 untuk tiga kategori terbesar dari `k` kategori: kira-kira berapa langkah, dibanding mengurutkan semuanya (modul `a-xi1-m10`)?
3. `AI: boleh` Berkas berisi 10 juta baris tetapi hanya 5 kategori. Apa yang memakan waktu dan apa yang memakan memori pada programmu (modul `a-xi2-m9`)?

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `a-xi2-m11` (pertanyaan 1), sekitar tiga minggu lagi di `a-xi2-m13` (pertanyaan 2), dan sekitar delapan minggu lagi di `a-xii1-m4` (pertanyaan 3). Jawab sekarang lalu simpan.

1. Mengapa `map` bisa mengelompokkan data tanpa mengurutkannya lebih dulu, dan terurut menurut apa isinya?
2. Kira-kira berapa langkah merekap `n` baris ke `k` kelompok dengan `map`?
3. Kapan rata-rata menyesatkan, dan ringkasan apa lagi yang dilaporkan di sampingnya?

## Kesalahan umum

- **Membaca dengan `peta[k]` untuk memeriksa.** Kunci yang belum ada ikut dibuat; pakai `find` atau `count` untuk memeriksa.
- **Membagi dengan `banyak` yang nol.** Hanya hitung rata-rata untuk kelompok yang punya baris.
- **Mengurutkan semua baris padahal cukup merekap dulu.** Pekerjaan `n log n` terbuang untuk sesuatu yang bisa `n log k`.
- **Memberi nilai awal `terbesar` yang salah.** Untuk data yang bisa negatif, 0 bukan nilai awal yang aman.
- **Menganggap rata-rata menggambarkan semua baris.** Satu nilai ekstrem menariknya; laporkan juga sebaran.

## Cek mandiri

- [ ] Saya dapat mengelompokkan data dengan `map` tanpa mengurutkannya.
- [ ] Saya dapat merekap banyak, jumlah, rata-rata, dan terbesar per kelompok.
- [ ] Saya dapat memakai kunci `pair` untuk dua kolom.
- [ ] Saya dapat mengurutkan hasil rekap dengan pembanding sendiri.
- [ ] Saya dapat menyebut banyak langkah merekap `n` baris ke `k` kelompok.

## Kunci dan petunjuk

**Ingat kembali.** 1: tiga kolom untuk `a,,c` dan dua kolom untuk `a,b,`. 2: BFS mengunjungi menurut jarak dari awal (lapis demi lapis); DFS menyusuri satu cabang sampai buntu sebelum kembali. 3: karena `dp[i]` hanya membaca `dp[i - 1]` dan `dp[i - 2]`; dua variabel cukup sehingga memori `O(1)`, tetapi pilihan tak dapat dicetak.

**Prediksi dulu.** 1: lihat keluaran di atas: `buah`, lalu `nasi`, lalu `roti`, terurut abjad menurut kunci. 2: tidak; `map` menaruh baris berkunci sama pada entri yang sama dengan sendirinya.

**Contoh setengah jadi.** Isi: `kat`, `++`, `first`. Program lengkap:

```cpp
#include <iostream>
#include <map>
#include <string>
#include <vector>
using namespace std;

int main() {
  vector<string> kat = {"roti", "buah", "roti", "nasi", "roti"};
  map<string, int> hitung;
  for (const string& k : kat) {
    hitung[k]++;
  }
  for (const auto& p : hitung) {
    cout << p.first << " " << p.second << "\n";
  }
}
```

Keluaran:

```text
buah 1
nasi 1
roti 3
```

**Soal Parsons.** Urutan benar: h, a, b, c, d, e, f, g. Baris (h) hanya komentar tentang keadaan awal; urutan (a) sebelum perulangan agar `map` ada saat dipakai.

**Latihan.** 1: kuncinya `kolom[0]` (bulan), bukan `kolom[1]`; selebihnya sama. Hasil untuk `data.csv` contoh: `2026-01` jumlah 255, `2026-02` jumlah 276, `2026-03` jumlah 234 (baris rusak ditolak). 2: nilai awal terkecil harus lebih besar dari semua data yang mungkin, misalnya nilai pertama yang dibaca untuk kelompok itu atau `INT_MAX`; setelah itu `if (nilai < r.terkecil)`. 3: `m` berisi `a: 5` dan `b: 1`, `size()` bernilai 2. 4: tidak perlu mengurutkan semuanya; cukup `partial_sort` atau heap berukuran 3, tetapi karena kategori hanya `k` kecil, mengurutkan hasil rekap sudah murah (`k log k`).

**Latihan bercampur.** 1: `pair` dibandingkan menaik; agar jumlah terbesar lebih dulu pembanding memakai `a.first > b.first`, dan bila sama memakai nama menaik supaya urutannya pasti. 2: sekitar `k * log2 3` langkah untuk heap berukuran 3 (sekitar 1,6 kali `k`) dibanding `k log2 k` untuk mengurutkan semuanya; hanya terasa bila `k` besar. 3: waktu dihabiskan membaca dan memecah 10 juta baris (`O(n)`); memori hanya untuk 5 entri `map`, bukan untuk 10 juta baris, karena baris tidak disimpan setelah direkap.

**Ulang berjarak.** 1: `map` menaruh entri menurut kunci saat memasukkan, sehingga baris berkunci sama bertemu di entri yang sama; isinya terurut menurut kunci. 2: sekitar `n * log2 k` langkah pencarian, jadi `O(n log k)`. 3: bila ada nilai ekstrem atau data timpang; laporkan juga banyak baris, nilai terbesar dan terkecil.

## Langkah berikutnya

Modul berikut: `a-xi2-m11` (sumber data terbuka dan legal): dari mana data yang layak direkap datang dan bolehkah dipakai. Modul terkait: `matkom-himpunan-relasi-fungsi`. Bacaan lanjut: halaman cppreference tentang `std::map` dan `std::unordered_map`.
