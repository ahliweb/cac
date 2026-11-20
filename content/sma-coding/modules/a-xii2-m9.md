## Untuk siapa modul ini

Modul ini untuk murid kelas XII jalur A (Algoritmik dengan C++), minggu `A-XII2-M9` silabus v1.4.1: ulasan struktur data. Prasyarat: modul `a-xii2-m8` dan `a-xii1-m10` (segment tree). Keluaran minggu ini adalah **tabel pemilihan**: untuk tiap kebutuhan, struktur data yang dipilih, operasi yang dilayani, dan perkiraan langkahnya.

Modul ini karangan penyusun dan disetujui pemilik program pada 2026-11-20 (keputusan lewat dialog; catatan tinjauan menjadi tindak lanjut revisi). Silabus tidak memetakan butir capaian pembelajaran untuk minggu ini, jadi modul ini tidak dihitung memenuhi butir CP apa pun. Tiap soal latihan bertanda `AI: boleh` atau `AI: tanpa AI`. Masukan program diberikan lewat berkas: `./program < masukan.txt`. Semua angka dan data karangan.

## Ingat kembali

Jawab dari ingatan dulu, baru cek di kunci. Soal 1 dari `a-xii2-m8`, soal 2 dari `a-xii2-m6`, soal 3 dari `a-xii2-m1`.

1. Apa saja isi laporan alternatif, dan mengapa dua solusi dibandingkan lebih dulu pada masukan kecil?
2. Bagaimana penghitung langkah menunjukkan bahwa solusi linear mengungguli solusi kuadrat dan kubik?
3. Apa beda refaktor dan memperbaiki galat?

## Tujuan

Setelah modul ini kamu dapat:

- menyebut operasi utama dan banyak langkah `vector`, `set`, `map`, `priority_queue`, larik jumlah prefiks, Fenwick, segment tree, dan himpunan saling lepas;
- memilih struktur data dari operasi yang dibutuhkan, bukan dari kebiasaan;
- membuktikan pilihan dengan menghitung langkah pada contoh;
- menyusun tabel pemilihan beserta alasannya (keluaran minggu ini).

## Prediksi dulu

**Tebak dulu, tulis jawabanmu, baru jalankan.** Lima bilangan yang sama dimasukkan ke tiga struktur berbeda.

```cpp
#include <iostream>
#include <map>
#include <queue>
#include <set>
using namespace std;

int main() {
  int data[] = {4, 1, 4, 3, 1};
  set<int> s;
  priority_queue<int> pq;
  map<int, int> m;
  for (int x : data) {
    s.insert(x);
    pq.push(x);
    m[x]++;
  }
  cout << s.size() << " " << pq.size() << " " << m.size() << "\n";
  cout << *s.begin() << " " << pq.top() << " " << m[4] << "\n";
  pq.pop();
  pq.pop();
  cout << pq.top() << "\n";
}
```

1. Apa tiga baris yang tercetak?
2. Mengapa ukuran `set`, `priority_queue`, dan `map` tidak sama?

Simpan tebakanmu. Perbandingannya ada di bagian berikutnya.

## Contoh terselesaikan

Keluaran program tadi:

```text
3 5 3
1 4 2
3
```

`set` dan `map` menyimpan kunci unik (tiga nilai berbeda), sedangkan `priority_queue` menyimpan semua elemen termasuk kembar (lima). `top()` antrian prioritas bawaan memberi yang terbesar (4); setelah dua `4` keluar, yang terbesar berikutnya 3.

**Studi kasus: rekap gudang karangan.** Ada `n` stok barang; perintah `U i v` mengubah stok barang ke-`i` menjadi `v`, perintah `S l r` menanyakan jumlah stok pada rentang. Tiga kandidat: (A) larik biasa dengan perulangan tiap kueri, (B) larik jumlah prefiks yang dibangun ulang tiap perubahan, (C) Fenwick (modul `a-xii1-m9`). Program berikut menjalankan ketiganya pada satu masukan, memeriksa bahwa jawabannya sama, dan menghitung langkah tiap cara.

```cpp
#include <iostream>
#include <string>
#include <vector>
using namespace std;

int n;
vector<long long> fen;

int tambahFen(int i, long long v) {
  int langkah = 0;
  for (; i <= n; i += i & -i) {
    fen[i] += v;
    langkah++;
  }
  return langkah;
}

long long prefiksFen(int i, int& langkah) {
  long long s = 0;
  for (; i > 0; i -= i & -i) {
    s += fen[i];
    langkah++;
  }
  return s;
}

int main() {
  int q;
  cin >> n >> q;
  vector<long long> a(n + 1, 0);
  vector<long long> pref(n + 1, 0);
  fen.assign(n + 1, 0);
  for (int i = 1; i <= n; i++) {
    cin >> a[i];
    pref[i] = pref[i - 1] + a[i];
    tambahFen(i, a[i]);
  }
  long long totA = 0;
  long long totB = 0;
  long long totC = 0;
  bool sama = true;
  for (int k = 0; k < q; k++) {
    string perintah;
    int x;
    int y;
    cin >> perintah >> x >> y;
    if (perintah == "S") {
      long long hasilA = 0;
      for (int i = x; i <= y; i++) {
        hasilA += a[i];
      }
      int langA = y - x + 1;
      long long hasilB = pref[y] - pref[x - 1];
      int langB = 2;
      int langC = 0;
      long long hasilC = prefiksFen(y, langC) - prefiksFen(x - 1, langC);
      if (hasilA != hasilB || hasilB != hasilC) {
        sama = false;
      }
      totA += langA;
      totB += langB;
      totC += langC;
      cout << "S " << x << " " << y << " = " << hasilA << " | langkah A " << langA << ", B " << langB << ", C " << langC << "\n";
    } else {
      long long selisih = y - a[x];
      a[x] = y;
      int langB = n - x + 1;
      for (int i = x; i <= n; i++) {
        pref[i] += selisih;
      }
      int langC = tambahFen(x, selisih);
      totA += 1;
      totB += langB;
      totC += langC;
      cout << "U " << x << " " << y << " | langkah A 1, B " << langB << ", C " << langC << "\n";
    }
  }
  cout << "total langkah: A " << totA << ", B " << totB << ", C " << totC << "\n";
  cout << (sama ? "semua jawaban sama" : "ADA JAWABAN BEDA") << "\n";
}
```

Masukan (`masukan.txt`):

```text
8 6
5 3 8 6 2 7 4 1
S 1 8
U 3 10
S 2 5
U 8 9
S 3 8
S 1 1
```

Keluaran:

```text
S 1 8 = 36 | langkah A 8, B 2, C 1
U 3 10 | langkah A 1, B 6, C 3
S 2 5 = 21 | langkah A 4, B 2, C 3
U 8 9 | langkah A 1, B 1, C 1
S 3 8 = 38 | langkah A 6, B 2, C 2
S 1 1 = 5 | langkah A 1, B 2, C 1
total langkah: A 21, B 15, C 11
semua jawaban sama
```

Semua jawaban sama; yang berbeda hanya kerjanya. A murah untuk pembaruan tetapi mahal untuk rentang panjang (`O(n)` per kueri); B murah untuk kueri (dua langkah) tetapi mahal tiap pembaruan (`O(n)`); C seimbang (`O(log n)` untuk keduanya). Dengan `n = q = 10^5` dan campuran kueri dan pembaruan, A dan B masing-masing mendekati `10^10` langkah, sedangkan C sekitar `10^5 * 17`, kurang dari dua juta. Bila **tidak ada pembaruan**, B menang karena membangunnya hanya sekali.

**Tabel pemilihan.** Pilih dari operasi yang dibutuhkan:

| Kebutuhan utama | Struktur | Langkah per operasi | Catatan |
| --- | --- | --- | --- |
| Akses menurut indeks, tambah di ujung | `vector` | `O(1)` | cadangan terbaik bila tak perlu cari |
| Cek ada atau tidak, tanpa kembar, terurut | `set` | `O(log n)` | tak ada akses indeks |
| Hitung kemunculan menurut kunci | `map` | `O(log n)` | `m[x]` membuat kunci baru bila belum ada |
| Ambil terbesar atau terkecil berulang | `priority_queue` | `O(log n)` | tak bisa mencari atau menghapus elemen tengah |
| Jumlah rentang, data tetap | jumlah prefiks | `O(1)` kueri | pembaruan `O(n)` |
| Jumlah rentang dengan pembaruan | Fenwick | `O(log n)` | hanya operasi yang bisa dikurangkan |
| Minimum, maksimum, atau gabungan lain pada rentang | segment tree | `O(log n)` | memori sekitar `2n` sampai `4n` |
| Gabung kelompok dan tanya satu kelompok | himpunan saling lepas | hampir `O(1)` | tak bisa memisah |

## Contoh setengah jadi

Lengkapi dua tempat bertanda `____` agar program mencetak nilai terbesar ke-`k` dan jumlah `k` nilai terbesar dengan heap berukuran `k`. Petunjuk: heap harus mengeluarkan yang **terkecil**, dan ukurannya dibatasi `k`. Kuncinya ada di `Kunci dan petunjuk`.

```cpp setengah-jadi
#include <iostream>
#include <queue>
#include <vector>
using namespace std;

int main() {
  int n;
  int k;
  cin >> n >> k;
  priority_queue<int, vector<int>, ____> pq;
  long long jumlah = 0;
  for (int i = 0; i < n; i++) {
    int x;
    cin >> x;
    pq.push(x);
    jumlah += x;
    if ((int)pq.size() > ____) {
      jumlah -= pq.top();
      pq.pop();
    }
  }
  cout << pq.top() << " " << jumlah << "\n";
}
```

## Soal Parsons

`AI: tanpa AI`. Susun baris berikut menjadi isi `main` yang mencetak nilai yang paling sering muncul dan banyak kemunculannya (bila seri, pilih nilai terkecil); `#include` dan `data` sudah ada. Kunci tercantum.

```text
cout << terbaik << " " << paling << "\n";
    paling = jumlah;
  banyak[x]++;
map<int, int> banyak;
int paling = 0;
    terbaik = kunci;
  }
for (auto& [kunci, jumlah] : banyak) {
  if (jumlah > paling) {
for (int x : data) {
}
int terbaik = -1;
}
```

## Latihan

1. `AI: boleh` Salin tabel pemilihan dan tambahkan satu kolom "alasan tidak dipilih" untuk tiap struktur pada kasus rekap gudang.
2. `AI: boleh` Antrean layanan: tiket bertingkat darurat 1 sampai 3, dilayani dari tingkat tertinggi, dan tiket seimbang menurut nomor terkecil. Pilih struktur dan tulis programnya untuk masukan `5` tiket bertingkat `2 1 3 3 1`.
3. `AI: tanpa AI` Daftar nama dalam kotak masuk: cek cepat apakah sebuah nama sudah terdaftar, dan cetak semua nama terurut. Pilih struktur dan sebut langkah tiap operasi.
4. `AI: boleh` Fenwick untuk `n = 10^6` bilangan `long long`: berapa megabita memorinya, dan mengapa `long long` dipilih bila nilai bisa `10^9`?
5. `AI: boleh` Sebuah jaringan kabel mulai dari `n` titik terpisah; perintah `G a b` menyambung dua titik dan `T a b` menanyakan apakah terhubung. Pilih struktur dan sebut langkahnya.

## Latihan bercampur

1. `AI: boleh` Pada tabel pemilihan, struktur mana yang menyimpan jawaban rentang sehingga cocok untuk minimum, dan mengapa Fenwick tak cocok (modul `a-xii1-m10`)?
2. `AI: tanpa AI` Seratus ribu nilai stok sampai `10^9` dijumlahkan di Fenwick. Mengapa `int` tak cukup, dan berapa batas atas jumlahnya (modul `a-xii1-m8`)?

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `a-xii2-m10` (pertanyaan 1), sekitar tiga minggu lagi di `a-xii2-m12` (pertanyaan 2), dan pertanyaan 3 untuk pengulangan mandiri (tidak ada modul jalur A sesudah `a-xii2-m14`). Jawab sekarang lalu simpan.

1. Struktur data apa yang dipilih untuk jumlah rentang dengan pembaruan, dan berapa langkah tiap operasi?
2. Mengapa `m[x]` pada `map` bisa menambah kunci, dan kapan itu masalah?
3. Apa beda `set` dan `priority_queue` bila `5` bilangan dengan `3` nilai berbeda dimasukkan ke keduanya?

## Kesalahan umum

- **Memilih struktur dari kebiasaan.** Tanyakan dulu operasi apa yang dilakukan paling sering.
- **Memakai larik jumlah prefiks untuk data yang berubah.** Tiap perubahan membangun ulang `O(n)`.
- **Membaca `m[x]` hanya untuk mengecek.** Itu menambah kunci `x`; pakai `find` atau `count`.
- **Mengira `priority_queue` bisa mencari elemen.** Ia hanya memberi elemen terbesar atau terkecil.
- **Mengira Fenwick melayani semua operasi rentang.** Ia butuh operasi yang bisa dikurangkan, seperti jumlah.

## Cek mandiri

- [ ] Saya dapat menyebut operasi dan langkah tiap struktur pada tabel pemilihan.
- [ ] Saya dapat memilih struktur dari operasi yang dibutuhkan.
- [ ] Saya dapat membuktikan pilihan dengan menghitung langkah.
- [ ] Saya dapat menyebut kapan jumlah prefiks lebih baik daripada Fenwick.
- [ ] Saya dapat menjelaskan mengapa `m[x]` menambah kunci.

## Kunci dan petunjuk

**Ingat kembali.** 1: dua solusi dengan gagasan masing-masing, tabel perbandingan, hasil uji pembanding, dan pilihan beserta alasan; masukan kecil dipakai karena jawabannya mudah ditelusuri dengan tangan. 2: penghitung langkah mencatat langkah nyata tiap solusi: pada 300 bilangan kubik 4.545.100, kuadrat 45.150, linear 300, padahal ketiganya menjawab sama (262); selisih itulah yang menentukan poin pada batas besar. 3: refaktor mempertahankan perilaku sehingga uji pegangan bermakna; perbaikan galat mengubah perilaku dan butuh uji baru; catat dan kerjakan keduanya terpisah.

**Prediksi dulu.** 1: `3 5 3`, lalu `1 4 2`, lalu `3`. 2: `set` dan `map` membuang kunci kembar; `priority_queue` menyimpan semua lima elemen.

**Contoh setengah jadi.** Isi: `greater<int>` dan `k`. Program lengkap:

```cpp
#include <iostream>
#include <queue>
#include <vector>
using namespace std;

int main() {
  int n;
  int k;
  cin >> n >> k;
  priority_queue<int, vector<int>, greater<int>> pq;
  long long jumlah = 0;
  for (int i = 0; i < n; i++) {
    int x;
    cin >> x;
    pq.push(x);
    jumlah += x;
    if ((int)pq.size() > k) {
      jumlah -= pq.top();
      pq.pop();
    }
  }
  cout << pq.top() << " " << jumlah << "\n";
}
```

Masukan:

```text
8 3
5 9 2 7 9 1 6 8
```

Keluaran:

```text
8 26
```

Tiga terbesar adalah 9, 9, 8; yang terkecil di antaranya (8) ada di puncak heap dan jumlahnya 26. Heap berukuran `k` memakai `O(n log k)` langkah.

**Soal Parsons.** Urutan benar sama dengan bagian dalam `main` berikut (13 baris; indentasi dihitung dari isi `main`, jadi `}` berindentasi dua spasi menutup `if`):

```cpp
#include <iostream>
#include <map>
using namespace std;

int main() {
  int data[] = {4, 2, 4, 2, 7, 2, 4};
  map<int, int> banyak;
  for (int x : data) {
    banyak[x]++;
  }
  int terbaik = -1;
  int paling = 0;
  for (auto& [kunci, jumlah] : banyak) {
    if (jumlah > paling) {
      paling = jumlah;
      terbaik = kunci;
    }
  }
  cout << terbaik << " " << paling << "\n";
}
```

```text
2 3
```

Nilai 4 dan 2 sama-sama muncul tiga kali; karena `map` menelusuri kunci naik dan syaratnya `>`, nilai 2 yang menang.

**Latihan.** 1: contoh alasan: A tidak dipilih karena kueri `O(n)`; B karena pembaruan `O(n)`; C dipilih karena keduanya `O(log n)`. 2: `priority_queue` berisi `{tingkat, -nomor}` sehingga tingkat tertinggi keluar dulu dan, bila seri, nomor terkecil (negatifnya terbesar). Program dengan masukan contoh:

```cpp
#include <iostream>
#include <queue>
#include <utility>
using namespace std;

int main() {
  int n;
  cin >> n;
  priority_queue<pair<int, int>> pq;
  for (int nomor = 1; nomor <= n; nomor++) {
    int tingkat;
    cin >> tingkat;
    pq.push({tingkat, -nomor});
  }
  while (!pq.empty()) {
    cout << -pq.top().second << " ";
    pq.pop();
  }
  cout << "\n";
}
```

Masukan:

```text
5
2 1 3 3 1
```

Keluaran:

```text
3 4 1 2 5 
```

Tiket 3 dan 4 bertingkat 3 (nomor terkecil dulu), lalu tiket 1 bertingkat 2, lalu tiket 2 dan 5. 3: `set<string>`; cek dengan `count` `O(log n)`, sisip `O(log n)`, dan telusur terurut `O(n)`. 4: `10^6 * 8` byte sekitar 8 megabita (ditambah satu sel). `long long` dipilih karena jumlah `10^6` nilai sampai `10^9` mencapai `10^15`. 5: himpunan saling lepas; `G` menyatukan, `T` membandingkan wakil kelompok, keduanya hampir `O(1)`.

**Latihan bercampur.** 1: segment tree menyimpan jawaban tiap rentang (mis. minimum); Fenwick menjawab lewat selisih dua prefiks, dan minimum tak punya pengurangan. 2: jumlah bisa `10^5 * 10^9 = 10^14`, melebihi batas `int` (sekitar `2,1 * 10^9`); `long long` (sampai sekitar `9,2 * 10^18`) cukup, dan bila perlu modulo, `% m` dilakukan tiap penjumlahan.

## Langkah berikutnya

Modul berikutnya, `a-xii2-m10`, adalah ulasan strategi: memilih antara greedy, pemrograman dinamis, dan pencarian lengkap. Bawa tabel pemilihanmu. Modul terkait: `a-xii1-m10`. Bacaan lanjut: halaman cppreference tentang `std::set`, `std::map`, dan `std::priority_queue`.
