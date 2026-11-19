## Untuk siapa modul ini

Modul ini untuk murid kelas X jalur A (Algoritmik dengan C++), minggu `A-X2-M9` silabus v1.4.1: pengurutan dengan bubble sort. Prasyarat: modul `a-x2-m8` (pencarian sekuensial dan biner). Kamu tidak perlu pernah memprogram sebelum jalur ini.

Modul ini berstatus DRAF: karangan penyusun, belum ditinjau pemilik. Butir `E-BK-a` dan `E-BK-c` dipetakan silabus sebagai dipenuhi jalur ini; modul draf ini belum dihitung sebagai pemenuhan. Keluarga materi OSN yang bertaut: `search-sort` (pengurutan dasar sesuai CP, bukan pengayaan).

Bila kamu pernah memakai Python: `sorted(daftar)` mengurutkan dengan satu panggilan. Di sini kamu menulis pengurutnya sendiri supaya paham apa yang terjadi di dalamnya dan berapa langkahnya. Tiap soal latihan bertanda `AI: boleh` atau `AI: tanpa AI`. Masukan program diberikan lewat berkas: `./program < masukan.txt`.

## Ingat kembali

Jawab dari ingatan dulu, baru cek di kunci. Soal 1 dari `a-x2-m8`, soal 2 dari `a-x2-m6`, soal 3 dari `a-x2-m1`.

1. Apa syarat data agar pencarian biner boleh dipakai, dan mengapa syarat itu perlu?
2. Bagaimana menghapus elemen berindeks `i` dari sebuah `vector`?
3. Bagaimana menukar isi `a[i]` dan `a[j]`?

## Tujuan

Setelah modul ini kamu dapat:

- menelusuri bubble sort putaran demi putaran pada data kecil;
- menulis bubble sort dengan penghenti dini bila tidak ada pertukaran;
- menghitung banyak perbandingan dan pertukaran yang dilakukan;
- menjelaskan mengapa langkahnya naik jauh lebih cepat daripada banyak datanya.

## Prediksi dulu

Ini tugas baca-dan-prediksi, `AI: tanpa AI`. **Tebak dulu, tulis jawabanmu, baru jalankan.** Program ini membandingkan pasangan bertetangga sebanyak **satu putaran** saja.

```cpp
#include <iostream>
#include <vector>
using namespace std;

int main() {
  vector<int> v = {6, 3, 5, 1, 4};
  int n = v.size();
  int tukar = 0;
  for (int j = 0; j < n - 1; j++) {
    if (v[j] > v[j + 1]) {
      int t = v[j];
      v[j] = v[j + 1];
      v[j + 1] = t;
      tukar++;
    }
  }
  for (int i = 0; i < n; i++) {
    if (i > 0) {
      cout << " ";
    }
    cout << v[i];
  }
  cout << "\n" << "pertukaran: " << tukar << "\n";
}
```

1. Apa isi `v` setelah satu putaran, dan berapa pertukarannya?
2. Elemen mana yang sekarang pasti berada di tempat akhirnya?

Simpan tebakanmu. Perbandingannya ada di bagian berikutnya.

## Contoh terselesaikan

Keluaran program tadi:

Keluaran:

```text
3 5 1 4 6
pertukaran: 4
```

Angka 6 "menggelembung" ke ujung kanan karena ia lebih besar dari semua tetangga yang ditemuinya dan terus ditukar. Itulah gagasan **bubble sort**: bandingkan pasangan bertetangga dan tukar bila urutannya salah; satu putaran penuh menempatkan elemen terbesar di ujung kanan. Putaran berikutnya cukup memeriksa bagian yang tersisa, yang makin pendek. Setelah `n - 1` putaran semua elemen pasti di tempatnya. Bila satu putaran tidak melakukan pertukaran sama sekali, data sudah terurut dan perulangan boleh berhenti: itu **penghenti dini**, ditandai variabel `adaTukar`. Program berikut mencetak isi setelah tiap putaran dan menghitung perbandingan serta pertukaran.

```cpp
#include <iostream>
#include <vector>
using namespace std;

int main() {
  int n;
  cin >> n;
  vector<int> v(n);
  for (int i = 0; i < n; i++) {
    cin >> v[i];
  }
  int banding = 0;
  int tukar = 0;
  for (int putaran = 1; putaran < n; putaran++) {
    bool adaTukar = false;
    for (int j = 0; j < n - putaran; j++) {
      banding++;
      if (v[j] > v[j + 1]) {
        int t = v[j];
        v[j] = v[j + 1];
        v[j + 1] = t;
        tukar++;
        adaTukar = true;
      }
    }
    cout << "putaran " << putaran << ":";
    for (int i = 0; i < n; i++) {
      cout << " " << v[i];
    }
    cout << "\n";
    if (!adaTukar) {
      break;
    }
  }
  cout << "perbandingan " << banding << ", pertukaran " << tukar << "\n";
}
```

Masukan (`masukan.txt`):

```text
5
6 3 5 1 4
```

Keluaran:

```text
putaran 1: 3 5 1 4 6
putaran 2: 3 1 4 5 6
putaran 3: 1 3 4 5 6
putaran 4: 1 3 4 5 6
perbandingan 10, pertukaran 7
```

Putaran 4 tidak menukar apa pun, sehingga perulangan berhenti. Banyak pertukaran selalu sama dengan banyak pasangan yang urutannya terbalik pada data awal; pada `6 3 5 1 4` ada 7 pasangan seperti itu. Sekarang, bagaimana banyak langkah berubah bila datanya membesar? Program berikut mengurutkan deret terbalik (kasus terburuk) dan deret yang sudah terurut (kasus terbaik, dengan penghenti dini).

```cpp
#include <iostream>
#include <vector>
using namespace std;

void urut(vector<int>& v, long long& banding, long long& tukar) {
  int n = v.size();
  banding = 0;
  tukar = 0;
  for (int putaran = 1; putaran < n; putaran++) {
    bool adaTukar = false;
    for (int j = 0; j < n - putaran; j++) {
      banding++;
      if (v[j] > v[j + 1]) {
        int t = v[j];
        v[j] = v[j + 1];
        v[j + 1] = t;
        tukar++;
        adaTukar = true;
      }
    }
    if (!adaTukar) {
      break;
    }
  }
}

int main() {
  int ukuran[3] = {10, 100, 1000};
  for (int k = 0; k < 3; k++) {
    int n = ukuran[k];
    vector<int> terbalik(n);
    vector<int> terurut(n);
    for (int i = 0; i < n; i++) {
      terbalik[i] = n - i;
      terurut[i] = i;
    }
    long long b1, t1, b2, t2;
    urut(terbalik, b1, t1);
    urut(terurut, b2, t2);
    cout << "n = " << n << ": terbalik " << b1 << " perbandingan, " << t1 << " pertukaran; terurut " << b2 << " perbandingan\n";
  }
}
```

Keluaran:

```text
n = 10: terbalik 45 perbandingan, 45 pertukaran; terurut 9 perbandingan
n = 100: terbalik 4950 perbandingan, 4950 pertukaran; terurut 99 perbandingan
n = 1000: terbalik 499500 perbandingan, 499500 pertukaran; terurut 999 perbandingan
```

Pada data terbalik, banyak perbandingan adalah `n * (n - 1) / 2`. Data 10 kali lebih banyak membuat langkah sekitar 100 kali lebih banyak: itulah **naik secara kuadrat**. Pada data yang sudah terurut, satu putaran saja sudah cukup untuk tahu bahwa tidak ada yang perlu ditukar, sehingga langkahnya hanya `n - 1`: naik secara linear.

## Contoh setengah jadi

Lengkapi bagian `____` pada bubble sort berikut (tanpa penghenti dini).

```cpp setengah-jadi
int n = v.size();
for (int putaran = 1; putaran < n; putaran++) {
  for (int j = 0; j < n - ____; j++) {
    if (v[j] ____ v[j + 1]) {
      int t = v[j];
      v[j] = ____;
      v[j + 1] = ____;
    }
  }
}
```

## Soal Parsons

Susun tujuh baris berikut (sudah diacak) menjadi satu putaran bubble sort yang menukar pasangan bertetangga bila terbalik. `AI: tanpa AI`: tujuannya melatih membaca urutan.

```text
(a)     int t = v[j];
(b)     v[j] = v[j + 1];
(c)   for (int j = 0; j < n - 1; j++) {
(d)     v[j + 1] = t;
(e)   }
(f)   if (v[j] > v[j + 1]) {
(g)   }
```

## Latihan

1. `AI: boleh` **Pseudocode dulu.** Tulis pseudocode lalu program yang membaca `n` bilangan, mengurutkannya **menurun** dengan bubble sort, lalu mencetak hasilnya dan banyak pertukaran. Uji dengan `5` dan `2 7 4 9 1`.
2. `AI: tanpa AI` **Telusuri.** Untuk data `4 2 5 1`, tulis isi data setelah tiap putaran dan jumlah pertukaran seluruhnya.
3. `AI: boleh` **Urutkan kata.** Baca `n` kata, urutkan menurut abjad dengan bubble sort (bandingkan `string` dengan `>`), lalu cetak satu kata per baris. Uji dengan `4` dan `kuda apel zebra bunga`.
4. `AI: boleh` **Penghenti dini.** Ubah program contoh agar mencetak berapa putaran dijalankan sebelum berhenti. Uji dengan `5` dan `1 2 3 5 4`, lalu perkirakan dulu hasilnya sebelum menjalankan.
5. *Opsional:* **catatan pemakaian AI.** Bila memakai AI generatif, jawab nomor 1 sendiri dulu, lalu minta penjelasan atau petunjuk bertahap, bukan program jadi. Catat alatnya, tujuanmu, garis besar perintahmu, bagian yang kamu pakai, dan caramu memeriksanya (jalankan atau telusuri). Jangan menaruh data pribadi atau tugas bernilai pada perintah.

## Latihan bercampur

1. `AI: boleh` Urutkan `9 4 7 1 8`, lalu cari 7 dengan pencarian biner. Berapa langkahnya (modul `a-x2-m8`)?
2. `AI: tanpa AI` Mengapa fungsi `void urut(vector<int>& v)` harus memakai `&`, dan apa yang terjadi bila `&` dihapus (modul `a-x2-m6`)?
3. `AI: boleh` Sebuah tabel 3 baris dan 4 kolom (modul `a-x2-m3`). Bagaimana mengurutkan isi tiap baris secara terpisah dengan bubble sort?

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `a-x2-m10` (pertanyaan 1), sekitar tiga minggu lagi di `a-x2-m12` (pertanyaan 2), dan sekitar delapan minggu lagi di `a-xi1-m3` (pertanyaan 3). Jawab sekarang lalu simpan.

1. Setelah satu putaran penuh bubble sort menaik, elemen mana yang pasti sudah di tempat akhirnya?
2. Berapa perbandingan yang dilakukan bubble sort tanpa penghenti dini pada `n` data, dan kira-kira berapa kali lipat bertambahnya bila `n` menjadi 10 kali lebih besar?
3. Mengapa bubble sort boleh berhenti lebih awal bila satu putaran tidak menukar apa pun?

## Kesalahan umum

- **Menulis `j <= n - 1` pada perulangan bagian dalam.** Pada `j = n - 1`, `v[j + 1]` adalah `v[n]`, di luar array. Batas yang benar adalah `j < n - 1` (atau `j < n - putaran`).
- **Menukar tanpa variabel sementara.** `v[j] = v[j + 1]; v[j + 1] = v[j];` membuat kedua elemen bernilai sama dan nilai pertama hilang.
- **Mengira satu putaran cukup untuk mengurutkan semuanya.** Satu putaran hanya menempatkan elemen terbesar; banyak putaran bergantung pada letak elemen kecil.
- **Salah arah perbandingan.** `>` mengurutkan menaik; `<` mengurutkan menurun. Tertukarnya keduanya menghasilkan urutan terbalik tanpa pesan galat.
- **Mengira bubble sort pilihan baik untuk data besar.** Langkahnya naik secara kuadrat; untuk data puluhan ribu, cara itu sudah lambat.

## Cek mandiri

- [ ] Saya dapat menelusuri bubble sort putaran demi putaran.
- [ ] Saya dapat menulis bubble sort dengan penghenti dini.
- [ ] Saya dapat menghitung banyak perbandingan dan pertukaran.
- [ ] Saya dapat menjelaskan mengapa langkahnya naik secara kuadrat.
- [ ] Saya menulis pseudocode sebelum programnya.

## Kunci dan petunjuk

**Ingat kembali.** 1: data harus sudah terurut; tanpa itu, membuang separuh data berdasarkan elemen tengah tidak menjamin yang dicari tidak ada di bagian yang dibuang. 2: `v.erase(v.begin() + i);` menghapus elemen berindeks `i` dan menggeser sisanya ke kiri. 3: pakai variabel sementara: `int t = a[i]; a[i] = a[j]; a[j] = t;`.

**Prediksi dulu.** 1: `3 5 1 4 6` dan 4 pertukaran (6 bertukar dengan 3, 5, 1, lalu 4). 2: angka 6 di ujung kanan, karena ia terbesar dan ikut tertukar sampai habis.

**Contoh setengah jadi.** Isi: `putaran`, `>`, `v[j + 1]`, `t`. Program lengkap:

```cpp
#include <iostream>
#include <vector>
using namespace std;

int main() {
  vector<int> v = {5, 2, 9, 1};
  int n = v.size();
  for (int putaran = 1; putaran < n; putaran++) {
    for (int j = 0; j < n - putaran; j++) {
      if (v[j] > v[j + 1]) {
        int t = v[j];
        v[j] = v[j + 1];
        v[j + 1] = t;
      }
    }
  }
  for (int i = 0; i < n; i++) {
    if (i > 0) {
      cout << " ";
    }
    cout << v[i];
  }
  cout << "\n";
}
```

Keluaran:

```text
1 2 5 9
```

**Soal Parsons.** Urutan benar: c, f, a, b, d, g, e. Baris (g) menutup `if` dan baris (e) menutup `for`.

**Latihan.** 1: pseudocode: baca n dan data; ulangi putaran 1 sampai n - 1: untuk tiap j dari 0 sampai n - putaran - 1: bila v[j] < v[j + 1], tukar dan tambah pertukaran; cetak data dan pertukaran. Program contoh:

```cpp
#include <iostream>
#include <vector>
using namespace std;

int main() {
  int n;
  cin >> n;
  vector<int> v(n);
  for (int i = 0; i < n; i++) {
    cin >> v[i];
  }
  int tukar = 0;
  for (int putaran = 1; putaran < n; putaran++) {
    for (int j = 0; j < n - putaran; j++) {
      if (v[j] < v[j + 1]) {
        int t = v[j];
        v[j] = v[j + 1];
        v[j + 1] = t;
        tukar++;
      }
    }
  }
  for (int i = 0; i < n; i++) {
    if (i > 0) {
      cout << " ";
    }
    cout << v[i];
  }
  cout << "\n" << "pertukaran: " << tukar << "\n";
}
```

Masukan (`masukan.txt`):

```text
5
2 7 4 9 1
```

Keluaran:

```text
9 7 4 2 1
pertukaran: 5
```

2: putaran 1: `2 4 1 5` (dua pertukaran: 4 dengan 2, 5 dengan 1); putaran 2: `2 1 4 5` (satu pertukaran); putaran 3: `1 2 4 5` (satu pertukaran); jumlah 4 pertukaran. Itu sama dengan 4 pasangan terbalik pada data awal: (4, 2), (4, 1), (2, 1), (5, 1). 3: program contoh:

```cpp
#include <iostream>
#include <string>
#include <vector>
using namespace std;

int main() {
  int n;
  cin >> n;
  vector<string> v(n);
  for (int i = 0; i < n; i++) {
    cin >> v[i];
  }
  for (int putaran = 1; putaran < n; putaran++) {
    for (int j = 0; j < n - putaran; j++) {
      if (v[j] > v[j + 1]) {
        string t = v[j];
        v[j] = v[j + 1];
        v[j + 1] = t;
      }
    }
  }
  for (int i = 0; i < n; i++) {
    cout << v[i] << "\n";
  }
}
```

Masukan (`masukan.txt`):

```text
4
kuda apel zebra bunga
```

Keluaran:

```text
apel
bunga
kuda
zebra
```

4: perkiraan: putaran 1 menukar 5 dan 4 sehingga data terurut; putaran 2 tidak menukar apa pun lalu berhenti, jadi 2 putaran. Program contoh:

```cpp
#include <iostream>
#include <vector>
using namespace std;

int main() {
  int n;
  cin >> n;
  vector<int> v(n);
  for (int i = 0; i < n; i++) {
    cin >> v[i];
  }
  int dijalankan = 0;
  for (int putaran = 1; putaran < n; putaran++) {
    dijalankan++;
    bool adaTukar = false;
    for (int j = 0; j < n - putaran; j++) {
      if (v[j] > v[j + 1]) {
        int t = v[j];
        v[j] = v[j + 1];
        v[j + 1] = t;
        adaTukar = true;
      }
    }
    if (!adaTukar) {
      break;
    }
  }
  cout << "putaran dijalankan: " << dijalankan << "\n";
}
```

Masukan (`masukan.txt`):

```text
5
1 2 3 5 4
```

Keluaran:

```text
putaran dijalankan: 2
```

**Latihan bercampur.** 1: setelah diurutkan menjadi `1 4 7 8 9`: `kiri 0, kanan 4, tengah 2` berisi 7, ketemu pada langkah pertama. 2: tanpa `&`, fungsi mengurutkan salinan; `vector` di `main` tidak berubah, sehingga data di `main` tetap tidak terurut. 3: untuk tiap baris `b`, jalankan bubble sort pada elemen `m[b][0]` sampai `m[b][3]` (bandingkan `m[b][j]` dengan `m[b][j + 1]`); perulangan luar atas baris, di dalamnya dua perulangan bubble sort.

**Ulang berjarak.** 1: elemen terbesar, di ujung kanan bagian yang sedang diurutkan. 2: `n * (n - 1) / 2` perbandingan; mis. 45 untuk `n = 10` dan 4950 untuk `n = 100`, sekitar 100 kali lebih banyak. 3: bila tidak ada pertukaran, tiap pasangan bertetangga sudah berurutan, yang berarti seluruh data sudah terurut.

## Langkah berikutnya

Modul berikut: `a-x2-m10` (insertion sort), cara lain mengurutkan yang kadang jauh lebih singkat. Bacaan lanjut: halaman cppreference tentang `std::swap`, yang menukar dua nilai dengan satu panggilan.
