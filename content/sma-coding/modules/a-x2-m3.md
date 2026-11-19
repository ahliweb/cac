## Untuk siapa modul ini

Modul ini untuk murid kelas X jalur A (Algoritmik dengan C++), minggu `A-X2-M3` silabus v1.4.1: array dua dimensi. Prasyarat: modul `a-x2-m2` (string) dan `a-x2-m1` (array satu dimensi). Kamu tidak perlu pernah memprogram sebelum jalur ini.

Modul ini berstatus DRAF: karangan penyusun, belum ditinjau pemilik. Butir `E-BK-d` dipetakan silabus sebagai dipenuhi jalur ini; modul draf ini belum dihitung sebagai pemenuhan. Keluarga materi OSN yang bertaut: `struktur-data` (array dua dimensi sesuai CP, bukan pengayaan).

Bila kamu pernah memakai Python: array dua dimensi C++ bukan daftar yang berisi daftar dengan panjang bebas. Semua barisnya berukuran sama dan ukurannya tetap. Tiap soal latihan bertanda `AI: boleh` atau `AI: tanpa AI`. Masukan program diberikan lewat berkas: `./program < masukan.txt`.

## Ingat kembali

Jawab dari ingatan dulu, baru cek di kunci. Soal 1 dari `a-x2-m2`, soal 2 dari `a-x1-m11`, soal 3 dari `a-x1-m9`.

1. Apa beda `cin >> s` dan `getline(cin, s)`?
2. Pada perulangan bersarang `for (int i = 0; i < 3; i++)` dengan `for (int j = 0; j < 4; j++)` di dalamnya, berapa kali badan yang paling dalam dijalankan?
3. Kapan kamu memilih `long long` dan bukan `int`?

## Tujuan

Setelah modul ini kamu dapat:

- mendeklarasikan array dua dimensi dan mengakses elemen lewat indeks baris dan kolom;
- membaca dan mencetak tabel data dengan dua perulangan bersarang;
- menghitung jumlah tiap baris, tiap kolom, dan diagonal;
- membuat transpos sebuah tabel.

## Prediksi dulu

Ini tugas baca-dan-prediksi, `AI: tanpa AI`. **Tebak dulu, tulis jawabanmu, baru jalankan.**

```cpp
#include <iostream>
using namespace std;

int main() {
  int m[2][3] = {{1, 2, 3}, {4, 5, 6}};
  cout << m[0][2] << " " << m[1][0] << "\n";
  m[1][1] = m[0][1] * 10;
  for (int i = 0; i < 2; i++) {
    int baris = 0;
    for (int j = 0; j < 3; j++) {
      baris += m[i][j];
    }
    cout << baris << "\n";
  }
}
```

1. Apa yang tercetak pada tiap baris?
2. Setelah `m[1][1] = m[0][1] * 10;`, apa isi baris kedua?

Simpan tebakanmu. Perbandingannya ada di bagian berikutnya.

## Contoh terselesaikan

Keluaran program tadi:

Keluaran:

```text
3 4
6
30
```

Array dua dimensi menyimpan tabel. Pada `int m[2][3]`, indeks pertama adalah **baris** (0 sampai 1) dan indeks kedua adalah **kolom** (0 sampai 2). Jadi `m[0][2]` adalah baris pertama kolom ketiga, bernilai 3. Setelah pengubahan, baris kedua berisi 4, 20, 6, sehingga jumlahnya 30.

Tabel diproses dengan dua perulangan bersarang: perulangan luar memilih baris, perulangan dalam memilih kolom. Seperti pada array satu dimensi, sediakan ukuran lebih besar dari batas masukan, baca banyak baris `b` dan kolom `k`, lalu pakai `b` kali `k` elemen pertama. Program berikut menghitung jumlah tiap baris dan tiap kolom.

```cpp
#include <iostream>
using namespace std;

int main() {
  int m[50][50];
  int b, k;
  cin >> b >> k;
  for (int i = 0; i < b; i++) {
    for (int j = 0; j < k; j++) {
      cin >> m[i][j];
    }
  }
  for (int i = 0; i < b; i++) {
    int jumlah = 0;
    for (int j = 0; j < k; j++) {
      jumlah += m[i][j];
    }
    cout << "baris " << i + 1 << ": " << jumlah << "\n";
  }
  for (int j = 0; j < k; j++) {
    int jumlah = 0;
    for (int i = 0; i < b; i++) {
      jumlah += m[i][j];
    }
    cout << "kolom " << j + 1 << ": " << jumlah << "\n";
  }
}
```

Masukan (`masukan.txt`):

```text
2 3
1 2 3
4 5 6
```

Keluaran:

```text
baris 1: 6
baris 2: 15
kolom 1: 5
kolom 2: 7
kolom 3: 9
```

Pada jumlah kolom, perulangan luarnya memilih kolom dan perulangan dalamnya menelusuri baris. Hanya urutan kedua perulangan itu yang berubah.

Transpos tabel menukar baris dan kolom: elemen `m[i][j]` menjadi `t[j][i]`. Tabel `b` baris `k` kolom menjadi `k` baris `b` kolom. Karena bentuknya berubah, hasilnya disimpan di array baru.

```cpp
#include <iostream>
using namespace std;

int main() {
  int m[50][50];
  int t[50][50];
  int b, k;
  cin >> b >> k;
  for (int i = 0; i < b; i++) {
    for (int j = 0; j < k; j++) {
      cin >> m[i][j];
      t[j][i] = m[i][j];
    }
  }
  for (int j = 0; j < k; j++) {
    for (int i = 0; i < b; i++) {
      if (i > 0) {
        cout << " ";
      }
      cout << t[j][i];
    }
    cout << "\n";
  }
}
```

Masukan (`masukan.txt`):

```text
2 3
1 2 3
4 5 6
```

Keluaran:

```text
1 4
2 5
3 6
```

Bila array dua dimensi dikirim ke fungsi, ukuran kolomnya harus tertulis di parameter, misalnya `int m[][50]`; banyak baris dan kolom yang dipakai dikirim sebagai parameter terpisah.

## Contoh setengah jadi

Program yang membaca matriks persegi `n` kali `n` dan mencetak jumlah diagonal utamanya (elemen yang barisnya sama dengan kolomnya). Lengkapi bagian `____`.

```cpp setengah-jadi
#include <iostream>
using namespace std;

int main() {
  int m[50][50];
  int n;
  cin >> n;
  for (int i = 0; i < ____; i++) {
    for (int j = 0; j < n; j++) {
      cin >> ____;
    }
  }
  int jumlah = ____;
  for (int i = 0; i < n; i++) {
    jumlah += m[i][____];
  }
  cout << jumlah << "\n";
}
```

## Soal Parsons

Susun baris-baris berikut (sudah diacak; indentasi ikut barisnya) menjadi badan `main` yang mencetak jumlah seluruh elemen tabel 2 kali 3. `AI: tanpa AI`: tujuannya melatih membaca urutan program.

```text
(a)   int total = 0;
(b)   }
(c)       total += m[i][j];
(d)   cout << total << "\n";
(e)     }
(f)   int m[2][3] = {{1, 2, 3}, {4, 5, 6}};
(g)   for (int i = 0; i < 2; i++) {
(h)     for (int j = 0; j < 3; j++) {
```

## Latihan

1. `AI: boleh` **Pseudocode dulu.** Tulis pseudocode lalu program yang membaca tabel `b` kali `k` dan mencetak elemen terbesarnya. Uji dengan tabel 2 kali 3: 1 9 3 dan 4 5 6.
2. `AI: tanpa AI` **Telusuri.** Tulis hasil transpos tabel 2 kali 3 berisi baris 7 8 9 dan 1 2 3. Berapa baris dan kolom hasilnya?
3. `AI: boleh` **Dua diagonal.** Untuk matriks persegi, cetak jumlah diagonal utama (`m[i][i]`) dan jumlah diagonal sekunder (`m[i][n - 1 - i]`), dipisah spasi. Uji dengan matriks 3 kali 3: 2 0 1, lalu 0 3 0, lalu 4 0 5.
4. `AI: boleh` **Peta sintetis.** Tabel berisi 0 dan 1 menandai petak kosong (0) dan terisi (1) pada denah karangan. Cetak banyak petak kosong. Uji dengan tabel 3 kali 4: 1 0 0 1, lalu 0 0 1 1, lalu 1 1 0 0.
5. *Opsional:* **catatan pemakaian AI.** Bila memakai AI generatif, jawab nomor 1 sendiri dulu, lalu minta penjelasan atau petunjuk bertahap, bukan program jadi. Catat alatnya, tujuanmu, garis besar perintahmu, bagian yang kamu pakai, dan caramu memeriksanya (jalankan atau telusuri). Jangan menaruh data pribadi atau tugas bernilai pada perintah.

## Latihan bercampur

1. Baca `n` kata ke array `string kata[50]`, lalu cetak kata yang paling panjang (modul `a-x2-m2`).
2. Tulis fungsi `int jumlahBaris(int m[][50], int k, int i)` yang mengembalikan jumlah baris ke-`i` dari tabel dengan `k` kolom, lalu pakai untuk mencetak jumlah baris pertama (modul `a-x1-m12`).
3. Tulis program yang menyatakan apakah matriks persegi bersifat simetris, yaitu `m[i][j] == m[j][i]` untuk semua `i` dan `j` (modul `a-x1-m10`: gabungan syarat).

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `a-x2-m4` (pertanyaan 1), sekitar tiga minggu lagi di `a-x2-m6` (pertanyaan 2), dan sekitar delapan minggu lagi di `a-x2-m11` (pertanyaan 3). Jawab sekarang lalu simpan.

1. Pada `m[b][k]`, mana indeks baris dan mana indeks kolom, dan berapa indeks terbesar masing-masing?
2. Bagaimana menghitung jumlah tiap kolom sebuah tabel?
3. Mengapa transpos tidak bisa ditulis di tempat yang sama pada tabel yang bukan persegi?

## Kesalahan umum

- **Menukar indeks baris dan kolom.** `m[j][i]` bukan `m[i][j]`. Pada tabel yang bukan persegi, galat ini membuat program membaca di luar tabel.
- **Menukar batas perulangan.** Perulangan baris berjalan sampai `b`, perulangan kolom sampai `k`; memakai `n` untuk keduanya hanya benar bila tabel persegi.
- **Memakai elemen yang belum diisi.** Array lokal berisi nilai sembarang. Isi dulu, atau mulai dengan `int m[50][50] = {};` agar semuanya 0.
- **Menyediakan ukuran terlalu kecil.** Tabel 60 kali 60 tidak muat di `m[50][50]`; baca batas masukan lebih dulu.
- **Menulis ulang transpos pada array yang sama.** Menyalin `m[i][j]` ke `m[j][i]` menimpa nilai yang belum sempat disalin; pakai array kedua.

## Cek mandiri

- [ ] Saya dapat menyebut indeks pertama sebagai baris dan indeks kedua sebagai kolom.
- [ ] Saya dapat membaca dan mencetak tabel dengan dua perulangan bersarang.
- [ ] Saya dapat menghitung jumlah baris, kolom, dan diagonal.
- [ ] Saya dapat membuat transpos tabel ke array baru.
- [ ] Saya menulis pseudocode sebelum programnya.

## Kunci dan petunjuk

**Ingat kembali.** 1: `cin >> s` membaca satu kata dan berhenti di spasi; `getline(cin, s)` membaca satu baris utuh. 2: 12 kali (3 kali 4). 3: bila nilainya bisa melewati sekitar 2,1 miliar, misalnya jumlah banyak bilangan besar atau hasil perkalian.

**Prediksi dulu.** 1: `3 4`, `6`, `30`. 2: 4, 20, 6.

**Contoh setengah jadi.** Isi: `n`, `m[i][j]`, `0`, `i`. Program lengkapnya:

```cpp
#include <iostream>
using namespace std;

int main() {
  int m[50][50];
  int n;
  cin >> n;
  for (int i = 0; i < n; i++) {
    for (int j = 0; j < n; j++) {
      cin >> m[i][j];
    }
  }
  int jumlah = 0;
  for (int i = 0; i < n; i++) {
    jumlah += m[i][i];
  }
  cout << jumlah << "\n";
}
```

Masukan (`masukan.txt`):

```text
3
1 2 3
4 5 6
7 8 9
```

Keluaran:

```text
15
```

**Soal Parsons.** Urutan benar: f, a, g, h, c, e, b, d. Baris (e) menutup perulangan dalam (indentasi 4) dan (b) menutup perulangan luar (indentasi 2); keduanya tidak boleh bertukar.

**Latihan.** 1: pseudocode: baca b dan k; baca tabel; terbesar <- elemen pertama; untuk tiap baris dan kolom: bila lebih besar, perbarui; cetak terbesar. Program contoh:

```cpp
#include <iostream>
using namespace std;

int main() {
  int m[50][50];
  int b, k;
  cin >> b >> k;
  for (int i = 0; i < b; i++) {
    for (int j = 0; j < k; j++) {
      cin >> m[i][j];
    }
  }
  int terbesar = m[0][0];
  for (int i = 0; i < b; i++) {
    for (int j = 0; j < k; j++) {
      if (m[i][j] > terbesar) {
        terbesar = m[i][j];
      }
    }
  }
  cout << terbesar << "\n";
}
```

Masukan (`masukan.txt`):

```text
2 3
1 9 3
4 5 6
```

Keluaran:

```text
9
```

2: hasil transpos berukuran 3 baris 2 kolom: `7 1`, `8 2`, `9 3` (kolom pertama tabel asli menjadi baris pertama). 3: program contoh:

```cpp
#include <iostream>
using namespace std;

int main() {
  int m[50][50];
  int n;
  cin >> n;
  for (int i = 0; i < n; i++) {
    for (int j = 0; j < n; j++) {
      cin >> m[i][j];
    }
  }
  int utama = 0;
  int sekunder = 0;
  for (int i = 0; i < n; i++) {
    utama += m[i][i];
    sekunder += m[i][n - 1 - i];
  }
  cout << utama << " " << sekunder << "\n";
}
```

Masukan (`masukan.txt`):

```text
3
2 0 1
0 3 0
4 0 5
```

Keluaran:

```text
10 8
```

4: program contoh:

```cpp
#include <iostream>
using namespace std;

int main() {
  int m[50][50];
  int b, k;
  cin >> b >> k;
  int kosong = 0;
  for (int i = 0; i < b; i++) {
    for (int j = 0; j < k; j++) {
      cin >> m[i][j];
      if (m[i][j] == 0) {
        kosong++;
      }
    }
  }
  cout << kosong << "\n";
}
```

Masukan (`masukan.txt`):

```text
3 4
1 0 0 1
0 0 1 1
1 1 0 0
```

Keluaran:

```text
6
```

**Latihan bercampur.** 1: `if (kata[i].size() > kata[terpanjang].size()) { terpanjang = i; }` dengan `terpanjang` dimulai 0. 2: `int jumlahBaris(int m[][50], int k, int i) { int jumlah = 0; for (int j = 0; j < k; j++) { jumlah += m[i][j]; } return jumlah; }`, dipanggil `jumlahBaris(m, k, 0)`. 3: mulai dengan `bool simetris = true;`, dan di dalam dua perulangan bersarang: `if (m[i][j] != m[j][i]) { simetris = false; }`; cetak `ya` atau `bukan`.

**Ulang berjarak.** 1: indeks pertama baris (terbesar `b - 1`), indeks kedua kolom (terbesar `k - 1`). 2: perulangan luar menelusuri kolom `j`, perulangan dalam menelusuri baris `i`, dan menjumlahkan `m[i][j]`. 3: tabel `b` kali `k` menjadi `k` kali `b`; bentuknya berbeda, sehingga isinya tidak muat di array yang sama tanpa saling menimpa.

## Langkah berikutnya

Modul berikut: `a-x2-m4` (ulasan dan penelusuran galat; aritmetika dasar), yang melatih menemukan kesalahan pada program seperti yang kamu tulis di sini. Modul terkait: `matkom-teks-gambar-suara` sebagai bacaan pendamping tentang gambar sebagai tabel angka. Bacaan lanjut: halaman cppreference tentang array.
