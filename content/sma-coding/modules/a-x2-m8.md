## Untuk siapa modul ini

Modul ini untuk murid kelas X jalur A (Algoritmik dengan C++), minggu `A-X2-M8` silabus v1.4.1: pencarian sekuensial dan biner. Prasyarat: modul `a-x2-m7` (tumpukan dan antrian) dan `a-x2-m1` (array satu dimensi). Kamu tidak perlu pernah memprogram sebelum jalur ini.

Modul ini karangan penyusun dan disetujui pemilik program pada 2026-11-20 (keputusan lewat dialog; catatan tinjauan menjadi tindak lanjut revisi). Butir `E-BK-a` dan `E-BK-c` dipetakan silabus sebagai dipenuhi jalur ini; pemenuhan butir mengikuti pemetaan silabus, bukan status modul. Keluarga materi OSN yang bertaut: `search-sort` (pencarian sesuai CP, bukan pengayaan).

Bila kamu pernah memakai Python: `x in daftar` mencari secara sekuensial tanpa terlihat; di sini kamu menulis dan menghitung langkahnya sendiri. Tiap soal latihan bertanda `AI: boleh` atau `AI: tanpa AI`. Masukan program diberikan lewat berkas: `./program < masukan.txt`.

## Ingat kembali

Jawab dari ingatan dulu, baru cek di kunci. Soal 1 dari `a-x2-m7`, soal 2 dari `a-x2-m5`, soal 3 dari `a-x2-m1`.

1. Apa beda LIFO dan FIFO? Beri satu contoh sehari-hari untuk tiap-tiapnya.
2. Apa yang dilakukan saringan terhadap kelipatan sebuah bilangan prima?
3. Tulis perulangan yang menjumlahkan semua elemen array `a` berukuran `n`.

## Tujuan

Setelah modul ini kamu dapat:

- menulis pencarian sekuensial yang mengembalikan indeks atau -1;
- menjelaskan syarat dan langkah pencarian biner, lalu menulisnya;
- menelusuri pencarian biner dengan tabel `kiri`, `kanan`, dan `tengah`;
- membandingkan banyak langkah kedua pencarian pada data yang makin besar.

## Prediksi dulu

Ini tugas baca-dan-prediksi, `AI: tanpa AI`. **Tebak dulu, tulis jawabanmu, baru jalankan.** Fungsi mengembalikan indeks pertama yang berisi `x`, atau -1; parameter `banding` menghitung perbandingan yang dilakukan.

```cpp
#include <iostream>
#include <vector>
using namespace std;

int cariIndeks(vector<int>& v, int x, int& banding) {
  banding = 0;
  int n = v.size();
  for (int i = 0; i < n; i++) {
    banding++;
    if (v[i] == x) {
      return i;
    }
  }
  return -1;
}

int main() {
  vector<int> v = {4, 9, 7, 1, 7};
  int banding;
  cout << cariIndeks(v, 7, banding) << " " << banding << "\n";
  cout << cariIndeks(v, 5, banding) << " " << banding << "\n";
}
```

1. Apa yang tercetak pada tiap baris?
2. Angka 7 muncul dua kali. Mengapa fungsi hanya melaporkan satu indeks?

Simpan tebakanmu. Perbandingannya ada di bagian berikutnya.

## Contoh terselesaikan

Keluaran program tadi:

Keluaran:

```text
2 3
-1 5
```

Fungsi itu adalah **pencarian sekuensial**: periksa elemen satu per satu dari awal dan berhenti begitu ketemu. Mencari 7 selesai di indeks 2 setelah 3 perbandingan. Mencari 5, yang tidak ada, memeriksa semua 5 elemen. Pada kasus terbaik 1 perbandingan; pada kasus terburuk sebanyak data. Cara ini tidak menuntut apa pun dari data.

**Pencarian biner** menuntut satu syarat: data **sudah terurut**. Dengan syarat itu, satu perbandingan di tengah membuang separuh data. Bila nilai di tengah lebih kecil dari yang dicari, semua elemen di kirinya pasti lebih kecil juga, jadi bagian itu dibuang. Simpan dua batas, `kiri` dan `kanan`, yang membatasi bagian yang masih mungkin berisi `x`. Ulangi selama `kiri <= kanan`: hitung `tengah`; bila `v[tengah] == x` selesai, bila lebih kecil geser `kiri` ke `tengah + 1`, bila lebih besar geser `kanan` ke `tengah - 1`. Program berikut membaca `n` data terurut, lalu `q` pertanyaan, dan mencetak banyak langkah tiap pencarian.

```cpp
#include <iostream>
#include <vector>
using namespace std;

int cariBiner(vector<int>& v, int x, int& langkah) {
  int kiri = 0;
  int n = v.size();
  int kanan = n - 1;
  langkah = 0;
  while (kiri <= kanan) {
    langkah++;
    int tengah = kiri + (kanan - kiri) / 2;
    if (v[tengah] == x) {
      return tengah;
    } else if (v[tengah] < x) {
      kiri = tengah + 1;
    } else {
      kanan = tengah - 1;
    }
  }
  return -1;
}

int main() {
  int n;
  cin >> n;
  vector<int> v(n);
  for (int i = 0; i < n; i++) {
    cin >> v[i];
  }
  int q;
  cin >> q;
  for (int j = 0; j < q; j++) {
    int x, langkah;
    cin >> x;
    int hasil = cariBiner(v, x, langkah);
    if (hasil == -1) {
      cout << x << " tidak ada, " << langkah << " langkah\n";
    } else {
      cout << x << " di indeks " << hasil << ", " << langkah << " langkah\n";
    }
  }
}
```

Masukan (`masukan.txt`):

```text
10
2 5 8 12 16 23 38 56 72 91
3
23 91 40
```

Keluaran:

```text
23 di indeks 5, 3 langkah
91 di indeks 9, 4 langkah
40 tidak ada, 4 langkah
```

Telusuri `23`: `kiri = 0`, `kanan = 9`, `tengah = 4` berisi 16, lebih kecil, sehingga `kiri = 5`. Lalu `tengah = 7` berisi 56, lebih besar, sehingga `kanan = 6`. Lalu `tengah = 5` berisi 23: ketemu pada langkah ketiga. Seberapa besar bedanya dengan sekuensial? Program berikut mencari bilangan ganjil yang pasti tidak ada pada `v[i] = 2 * i`, dengan data yang makin banyak.

```cpp
#include <iostream>
#include <vector>
using namespace std;

int cariBiner(vector<int>& v, int x, int& langkah) {
  int kiri = 0;
  int n = v.size();
  int kanan = n - 1;
  langkah = 0;
  while (kiri <= kanan) {
    langkah++;
    int tengah = kiri + (kanan - kiri) / 2;
    if (v[tengah] == x) {
      return tengah;
    } else if (v[tengah] < x) {
      kiri = tengah + 1;
    } else {
      kanan = tengah - 1;
    }
  }
  return -1;
}

int main() {
  int ukuran[4] = {1000, 2000, 4000, 1000000};
  for (int k = 0; k < 4; k++) {
    int n = ukuran[k];
    vector<int> v(n);
    for (int i = 0; i < n; i++) {
      v[i] = 2 * i;
    }
    int langkah;
    cariBiner(v, 7, langkah);
    cout << "n = " << n << ": sekuensial " << n << " langkah, biner " << langkah << " langkah\n";
  }
}
```

Keluaran:

```text
n = 1000: sekuensial 1000 langkah, biner 10 langkah
n = 2000: sekuensial 2000 langkah, biner 11 langkah
n = 4000: sekuensial 4000 langkah, biner 12 langkah
n = 1000000: sekuensial 1000000 langkah, biner 20 langkah
```

Pada sekuensial, data dua kali lebih banyak berarti langkah dua kali lebih banyak: naik secara linear. Pada biner, data dua kali lebih banyak hanya menambah satu langkah, karena satu langkah lagi cukup untuk membuang separuh data tambahan. Itu sebabnya mengurutkan data lebih dulu sering sepadan bila pencarian dilakukan berkali-kali (modul `a-x2-m9` dan `a-x2-m10` membahas pengurutan).

## Contoh setengah jadi

Lengkapi bagian `____` pada pencarian biner berikut.

```cpp setengah-jadi
int cariBiner(vector<int>& v, int x) {
  int kiri = 0;
  int n = v.size();
  int kanan = n - 1;
  while (kiri ____ kanan) {
    int tengah = kiri + (kanan - kiri) / ____;
    if (v[tengah] == x) {
      return ____;
    } else if (v[tengah] < x) {
      kiri = ____;
    } else {
      kanan = ____;
    }
  }
  return -1;
}
```

## Soal Parsons

Susun delapan baris berikut (sudah diacak) menjadi badan satu putaran `while` pencarian biner. `AI: tanpa AI`: tujuannya melatih membaca urutan.

```text
(a)       kiri = tengah + 1;
(b)     int tengah = kiri + (kanan - kiri) / 2;
(c)       return tengah;
(d)     } else {
(e)       kanan = tengah - 1;
(f)     } else if (v[tengah] < x) {
(g)     if (v[tengah] == x) {
(h)     }
```

## Latihan

1. `AI: boleh` **Pseudocode dulu.** Tulis pseudocode lalu program: baca `n` bilangan, lalu `q` pertanyaan; untuk tiap pertanyaan cetak indeks pertama kemunculannya atau -1, memakai pencarian sekuensial. Uji dengan data `4 9 7 1 7` dan pertanyaan `7 5 4`.
2. `AI: tanpa AI` **Telusuri.** Pada data `3 8 14 21 27 35 49`, telusuri pencarian biner untuk `35` lalu untuk `10`. Tulis tabel `kiri`, `kanan`, `tengah`, dan nilai di tengah pada tiap langkah.
3. `AI: boleh` **Tebak angka.** Rahasianya sebuah bilangan 1 sampai 100 yang dibaca dari masukan. Tulis program yang menebak dengan membagi dua daerah tebakan dan mencetak tiap tebakan beserta penilaiannya (`terlalu kecil`, `terlalu besar`, atau `tepat`). Uji dengan rahasia 73.
4. `AI: boleh` **Tantangan: batas bawah.** Pada data terurut menaik, cetak indeks elemen pertama yang tidak lebih kecil dari `x`, atau `n` bila tidak ada. Petunjuk: pakai `kiri = 0` dan `kanan = n`, ulangi selama `kiri < kanan`. Uji dengan data `1 3 3 3 7 9` dan `x` sama dengan 3, 4, dan 10.
5. *Opsional:* **catatan pemakaian AI.** Bila memakai AI generatif, jawab nomor 1 sendiri dulu, lalu minta penjelasan atau petunjuk bertahap, bukan program jadi. Catat alatnya, tujuanmu, garis besar perintahmu, bagian yang kamu pakai, dan caramu memeriksanya (jalankan atau telusuri). Jangan menaruh data pribadi atau tugas bernilai pada perintah.

## Latihan bercampur

1. `AI: boleh` Baca satu kata (modul `a-x2-m2`), cari secara sekuensial indeks kemunculan pertama huruf `k`, dan cetak -1 bila tidak ada. Uji dengan `kemudi` dan `buah`.
2. `AI: boleh` Simpan bilangan prima sampai 50 di sebuah `vector` (modul `a-x2-m5`), lalu cari 37 dengan pencarian biner. Berapa langkahnya?

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `a-x2-m9` (pertanyaan 1), sekitar tiga minggu lagi di `a-x2-m11` (pertanyaan 2), dan sekitar delapan minggu lagi di `a-xi1-m2` (pertanyaan 3). Jawab sekarang lalu simpan.

1. Apa syarat data agar pencarian biner boleh dipakai, dan mengapa syarat itu perlu?
2. Mengapa batas digeser ke `tengah + 1` atau `tengah - 1`, bukan ke `tengah`?
3. Kira-kira berapa langkah pencarian biner untuk 1000 data, dibanding pencarian sekuensial pada kasus terburuk?

## Kesalahan umum

- **Memakai pencarian biner pada data yang belum terurut.** Hasilnya bisa salah tanpa ada pesan galat. Pastikan data terurut dulu.
- **Menggeser batas ke `tengah`, bukan `tengah + 1`.** Pada dua elemen terakhir, `tengah` sama dengan `kiri`, sehingga `kiri` tidak bergerak dan perulangan tidak pernah berhenti.
- **Memakai `kiri < kanan` pada versi dengan `kanan = n - 1`.** Elemen terakhir yang tersisa tidak pernah diperiksa. Pada versi itu syaratnya `kiri <= kanan`.
- **Mencampur indeks dengan nilai.** Fungsi mengembalikan indeks; nilai yang dicari adalah `x`. Jangan mengembalikan 0 untuk "tidak ketemu", karena 0 adalah indeks yang sah.
- **Mengira pencarian biner selalu lebih baik.** Untuk satu kali pencarian pada data tak terurut, mengurutkan lebih dulu lebih mahal daripada satu pencarian sekuensial.

## Cek mandiri

- [ ] Saya dapat menulis pencarian sekuensial yang mengembalikan indeks atau -1.
- [ ] Saya dapat menyebut syarat pencarian biner dan alasannya.
- [ ] Saya dapat menelusuri pencarian biner dengan tabel `kiri`, `kanan`, `tengah`.
- [ ] Saya dapat menjelaskan mengapa langkah biner naik pelan saat data membesar.
- [ ] Saya menulis pseudocode sebelum programnya.

## Kunci dan petunjuk

**Ingat kembali.** 1: LIFO: yang terakhir masuk keluar lebih dulu, contoh tumpukan piring; FIFO: yang pertama masuk keluar lebih dulu, contoh antrian loket. 2: saringan mencoret semua kelipatan bilangan prima itu (mulai dari kuadratnya), sehingga bilangan yang tidak tercoret sampai akhir adalah bilangan prima. 3: `int jumlah = 0; for (int i = 0; i < n; i++) { jumlah += a[i]; }`.

**Prediksi dulu.** 1: `2 3` dan `-1 5`. 2: fungsi berhenti pada `return` pertama; indeks 4 tidak pernah diperiksa. Untuk melaporkan semuanya, perulangan harus berjalan terus dan mencatat tiap indeks.

**Contoh setengah jadi.** Isi: `<=`, `2`, `tengah`, `tengah + 1`, `tengah - 1`. Program lengkap dengan `main`:

```cpp
#include <iostream>
#include <vector>
using namespace std;

int cariBiner(vector<int>& v, int x) {
  int kiri = 0;
  int n = v.size();
  int kanan = n - 1;
  while (kiri <= kanan) {
    int tengah = kiri + (kanan - kiri) / 2;
    if (v[tengah] == x) {
      return tengah;
    } else if (v[tengah] < x) {
      kiri = tengah + 1;
    } else {
      kanan = tengah - 1;
    }
  }
  return -1;
}

int main() {
  vector<int> v = {1, 4, 6, 9, 12};
  cout << cariBiner(v, 9) << " " << cariBiner(v, 5) << "\n";
}
```

Keluaran:

```text
3 -1
```

**Soal Parsons.** Urutan benar: b, g, c, f, a, d, e, h.

**Latihan.** 1: pseudocode: baca n bilangan ke larik; baca q; untuk tiap pertanyaan: periksa larik dari indeks 0; bila sama, cetak indeks dan berhenti; bila habis, cetak -1. Program contoh:

```cpp
#include <iostream>
#include <vector>
using namespace std;

int cariIndeks(vector<int>& v, int x) {
  int n = v.size();
  for (int i = 0; i < n; i++) {
    if (v[i] == x) {
      return i;
    }
  }
  return -1;
}

int main() {
  int n;
  cin >> n;
  vector<int> v(n);
  for (int i = 0; i < n; i++) {
    cin >> v[i];
  }
  int q;
  cin >> q;
  for (int j = 0; j < q; j++) {
    int x;
    cin >> x;
    cout << cariIndeks(v, x) << "\n";
  }
}
```

Masukan (`masukan.txt`):

```text
5
4 9 7 1 7
3
7 5 4
```

Keluaran:

```text
2
-1
0
```

2: untuk `35`: `kiri 0, kanan 6, tengah 3` (21, lebih kecil) maka `kiri 4`; `tengah 5` (35) ketemu, dua langkah. Untuk `10`: `kiri 0, kanan 6, tengah 3` (21, lebih besar) maka `kanan 2`; `tengah 1` (8, lebih kecil) maka `kiri 2`; `tengah 2` (14, lebih besar) maka `kanan 1`; sekarang `kiri > kanan`, tidak ada, tiga langkah. 3: program contoh:

```cpp
#include <iostream>
using namespace std;

int main() {
  int rahasia;
  cin >> rahasia;
  int kiri = 1;
  int kanan = 100;
  while (kiri <= kanan) {
    int tebakan = kiri + (kanan - kiri) / 2;
    if (tebakan == rahasia) {
      cout << "tebak " << tebakan << ": tepat\n";
      return 0;
    } else if (tebakan < rahasia) {
      cout << "tebak " << tebakan << ": terlalu kecil\n";
      kiri = tebakan + 1;
    } else {
      cout << "tebak " << tebakan << ": terlalu besar\n";
      kanan = tebakan - 1;
    }
  }
}
```

Masukan (`masukan.txt`):

```text
73
```

Keluaran:

```text
tebak 50: terlalu kecil
tebak 75: terlalu besar
tebak 62: terlalu kecil
tebak 68: terlalu kecil
tebak 71: terlalu kecil
tebak 73: tepat
```

Untuk 1 sampai 100, paling banyak 7 tebakan cukup. 4: program contoh dengan `kanan = n` (batas kanan tidak termasuk):

```cpp
#include <iostream>
#include <vector>
using namespace std;

int batasBawah(vector<int>& v, int x) {
  int kiri = 0;
  int kanan = v.size();
  while (kiri < kanan) {
    int tengah = kiri + (kanan - kiri) / 2;
    if (v[tengah] < x) {
      kiri = tengah + 1;
    } else {
      kanan = tengah;
    }
  }
  return kiri;
}

int main() {
  vector<int> v = {1, 3, 3, 3, 7, 9};
  cout << batasBawah(v, 3) << " " << batasBawah(v, 4) << " " << batasBawah(v, 10) << "\n";
}
```

Keluaran:

```text
1 4 6
```

Di sini `kanan = tengah` benar karena `tengah` mungkin jawabannya, dan perulangan tetap berhenti karena syaratnya `kiri < kanan`. Dua versi batas itu tidak boleh dicampur.

**Latihan bercampur.** 1: program contoh:

```cpp
#include <iostream>
#include <string>
using namespace std;

int main() {
  string t;
  cin >> t;
  int n = t.size();
  int hasil = -1;
  for (int i = 0; i < n && hasil == -1; i++) {
    if (t[i] == 'k') {
      hasil = i;
    }
  }
  cout << hasil << "\n";
}
```

Masukan (`masukan.txt`):

```text
kemudi
```

Keluaran:

```text
0
```

Dengan masukan `buah` hasilnya `-1`. 2: program contoh:

```cpp
#include <iostream>
#include <vector>
using namespace std;

bool prima(int n) {
  if (n < 2) {
    return false;
  }
  for (int i = 2; i * i <= n; i++) {
    if (n % i == 0) {
      return false;
    }
  }
  return true;
}

int main() {
  vector<int> v;
  for (int i = 2; i <= 50; i++) {
    if (prima(i)) {
      v.push_back(i);
    }
  }
  int kiri = 0;
  int n = v.size();
  int kanan = n - 1;
  int langkah = 0;
  while (kiri <= kanan) {
    langkah++;
    int tengah = kiri + (kanan - kiri) / 2;
    if (v[tengah] == 37) {
      cout << "37 di indeks " << tengah << " setelah " << langkah << " langkah\n";
      return 0;
    } else if (v[tengah] < 37) {
      kiri = tengah + 1;
    } else {
      kanan = tengah - 1;
    }
  }
  cout << "tidak ada\n";
}
```

Keluaran:

```text
37 di indeks 11 setelah 2 langkah
```

Ada 15 bilangan prima sampai 50; `tengah = 7` berisi 19, lalu `tengah = 11` berisi 37.

**Ulang berjarak.** 1: data harus terurut; tanpa itu, membuang separuh data berdasarkan elemen tengah tidak menjamin bahwa yang dicari tidak ada di bagian yang dibuang. 2: karena `tengah` sudah diperiksa dan bukan jawaban; menggesernya melewati `tengah` memastikan daerah pencarian mengecil di tiap putaran, sehingga perulangan pasti berhenti. 3: sekitar 10 langkah untuk biner (1000 data cukup dibagi dua sekitar 10 kali) dan paling banyak 1000 untuk sekuensial.

## Langkah berikutnya

Modul berikut: `a-x2-m9` (pengurutan dengan bubble sort), yang menyiapkan data agar pencarian biner dapat dipakai. Bacaan lanjut: halaman cppreference tentang `std::find` dan `std::binary_search`, dan modul `matkom-pertumbuhan-fungsi` untuk membaca mengapa 20 langkah cukup untuk sejuta data.
