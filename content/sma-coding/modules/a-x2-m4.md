## Untuk siapa modul ini

Modul ini untuk murid kelas X jalur A (Algoritmik dengan C++), minggu `A-X2-M4` silabus v1.4.1: ulasan dan penelusuran galat, serta aritmetika dasar. Prasyarat: modul `a-x2-m3` (array dua dimensi) dan `a-x1-m12` (fungsi). Kamu tidak perlu pernah memprogram sebelum jalur ini.

Modul ini berstatus DRAF: karangan penyusun, belum ditinjau pemilik. Silabus tidak memetakan butir capaian pembelajaran untuk minggu ini, jadi modul ini tidak dihitung memenuhi butir CP apa pun. Keluarga materi OSN yang bertaut: `aritmetika` (paritas, habis dibagi, dan sisa bagi sesuai CP, bukan pengayaan).

Separuh pertama modul adalah cara menemukan galat; separuh kedua adalah alat hitung yang akan kamu pakai terus. Tiap soal latihan bertanda `AI: boleh` atau `AI: tanpa AI`. Masukan program diberikan lewat berkas: `./program < masukan.txt`.

## Ingat kembali

Jawab dari ingatan dulu, baru cek di kunci. Soal 1 dari `a-x2-m3`, soal 2 dari `a-x2-m1`, soal 3 dari `a-x1-m10`.

1. Pada `m[b][k]`, mana indeks baris dan mana indeks kolom, dan berapa indeks terbesar masing-masing?
2. Mengapa mengakses `a[n]` pada array berukuran `n` adalah kesalahan?
3. Tulis `!(p && q)` dalam bentuk lain dengan hukum De Morgan.

## Tujuan

Setelah modul ini kamu dapat:

- membedakan galat kompilasi, galat logika, dan galat saat program berjalan;
- menemukan galat dengan mencetak nilai dan menguji dengan masukan kecil;
- menyusun daftar galat umum beserta gejalanya;
- memakai paritas, habis dibagi, sisa bagi, dan pengambilan digit.

## Prediksi dulu

Ini tugas baca-dan-prediksi, `AI: tanpa AI`. **Tebak dulu, tulis jawabanmu, baru jalankan.**

```cpp
#include <iostream>
using namespace std;

int main() {
  int n = 4821;
  cout << n % 2 << " " << n % 10 << " " << n / 10 << "\n";
  cout << (n % 3 == 0) << " " << (n % 7 == 0) << "\n";
}
```

1. Apa yang tercetak pada tiap baris?
2. Mengapa `n % 10` memberi digit terakhir, dan apa yang diberikan `n / 10`?

Simpan tebakanmu. Perbandingannya ada di bagian berikutnya.

## Contoh terselesaikan

Keluaran program tadi:

Keluaran:

```text
1 1 482
1 0
```

Bilangan 4821 ganjil (sisa 1), digit terakhirnya 1, dan `4821 / 10` membuang digit itu sehingga tersisa 482. Bilangan itu habis dibagi 3 (sisa 0, benar bernilai 1) tetapi tidak habis dibagi 7 (sisanya 5).

**Tiga jenis galat.** Galat kompilasi: kompilator menolak program dan menunjuk barisnya; baca pesan pertama dulu karena pesan lain sering akibatnya. Galat saat berjalan: program berhenti atau berperilaku aneh, misalnya mengakses di luar batas array. Galat logika: program berjalan dan memberi keluaran, tetapi keluarannya salah. Galat logika paling sulit karena tidak ada pesan.

**Cara mencarinya.** Pertama, ulangi galat dengan masukan sekecil mungkin. Kedua, tulis dulu apa yang kamu harapkan terjadi. Ketiga, cetak nilai variabel di tempat yang kamu curigai dan bandingkan dengan harapanmu. Keempat, ubah satu hal saja, lalu jalankan lagi. Program berikut seharusnya menjumlahkan digit sebuah bilangan, tetapi hasilnya salah; baris pertama di dalam perulangan mencetak nilai untuk pelacakan.

```cpp
#include <iostream>
using namespace std;

int main() {
  int n;
  cin >> n;
  int jumlah = 0;
  while (n > 0) {
    cout << "n = " << n << ", jumlah = " << jumlah << "\n";
    jumlah += n % 10;
    n = n / 100;
  }
  cout << "hasil: " << jumlah << "\n";
}
```

Masukan (`masukan.txt`):

```text
4821
```

Keluaran:

```text
n = 4821, jumlah = 0
n = 48, jumlah = 1
hasil: 9
```

Harapannya, `n` berkurang satu digit tiap putaran: 4821, 482, 48, 4. Yang tercetak 4821 lalu 48, jadi `n` kehilangan dua digit sekaligus. Galatnya ada pada `n / 100`; seharusnya `n / 10`. Setelah diperbaiki dan cetakan pelacak dibuang:

```cpp
#include <iostream>
using namespace std;

int main() {
  int n;
  cin >> n;
  int jumlah = 0;
  while (n > 0) {
    jumlah += n % 10;
    n = n / 10;
  }
  cout << "jumlah digit: " << jumlah << "\n";
}
```

Masukan (`masukan.txt`):

```text
4821
```

Keluaran:

```text
jumlah digit: 15
```

**Sisa bagi dan bilangan negatif.** `a % d == 0` berarti `a` habis dibagi `d`. Bilangan genap dicirikan `n % 2 == 0`. Pada bilangan negatif, sisa bagi C++ mengikuti tanda bilangan yang dibagi: `-7 % 2` bernilai -1, bukan 1. Karena itu, uji ganjil yang aman adalah `n % 2 != 0`, bukan `n % 2 == 1`.

```cpp
#include <iostream>
using namespace std;

int main() {
  int n;
  cin >> n;
  if (n % 2 != 0) {
    cout << "ganjil\n";
  } else {
    cout << "genap\n";
  }
  cout << "sisa bagi 3: " << n % 3 << "\n";
}
```

Masukan (`masukan.txt`):

```text
-7
```

Keluaran:

```text
ganjil
sisa bagi 3: -1
```

## Contoh setengah jadi

Program yang membaca `n` positif dan mencetak banyak digitnya. Lengkapi bagian `____`.

```cpp setengah-jadi
#include <iostream>
using namespace std;

int main() {
  int n;
  cin >> n;
  int banyak = 0;
  while (n ____ 0) {
    banyak++;
    n = n ____ 10;
  }
  cout << ____ << "\n";
}
```

## Soal Parsons

Susun baris-baris berikut (sudah diacak; indentasi ikut barisnya) menjadi badan `main` yang menjumlahkan digit bilangan 4821 dengan `% 10` dan `/ 10`, lalu mencetak hasilnya. `AI: tanpa AI`: tujuannya melatih membaca urutan program.

```text
(a)   cout << jumlah << "\n";
(b)   int jumlah = 0;
(c)     n = n / 10;
(d)   }
(e)   int n = 4821;
(f)   while (n > 0) {
(g)     jumlah += n % 10;
```

## Latihan

1. `AI: tanpa AI` **Perbaiki lima program rusak.** Tiap program tampak wajar, tetapi keluarannya tidak sesuai harapan. Untuk tiap program: cetak nilai untuk melacak, temukan galatnya, perbaiki, dan tulis satu kalimat tentang jenis galatnya. Harapan program (a): 2,66667; (b): 4; (c): 10; (d): `tidak`; (e): 2.
2. `AI: boleh` **Digit penjumlahan.** Baca bilangan bulat positif dan cetak banyak digit serta jumlah digitnya dalam satu baris dipisah spasi. Uji dengan 90210.
3. `AI: boleh` **Sisa bagi.** Baca `a` dan `b` (b tidak nol), lalu cetak hasil bagi bulat, sisa, dan `ya` atau `tidak` untuk "a habis dibagi b". Uji dengan 47 dan 6.
4. `AI: boleh` **Daftar galat umum.** Gabungkan hasil nomor 1 dengan galat yang pernah kamu alami, lalu tulis lima galat umum: gejala, jenis, dan cara menemukannya.
5. *Opsional:* **catatan pemakaian AI.** Bila memakai AI generatif, jawab nomor 2 sendiri dulu, lalu minta penjelasan atau petunjuk bertahap, bukan program jadi. Catat alatnya, tujuanmu, garis besar perintahmu, bagian yang kamu pakai, dan caramu memeriksanya (jalankan atau telusuri). Jangan menaruh data pribadi atau tugas bernilai pada perintah.

Program (a) sampai (e) untuk nomor 1:

```cpp
#include <iostream>
using namespace std;

int main() {
  int a = 5, b = 2, c = 1;
  double rata = (a + b + c) / 3;
  cout << "rata-rata = " << rata << "\n";
}
```

Keluaran yang didapat (a):

```text
rata-rata = 2
```

```cpp
#include <iostream>
using namespace std;

int main() {
  int banyak = 0;
  for (int i = 1; i <= 9; i++) {
    if (i % 2 == 1) {
      banyak++;
    }
  }
  cout << "banyak genap = " << banyak << "\n";
}
```

Keluaran yang didapat (b):

```text
banyak genap = 5
```

```cpp
#include <iostream>
using namespace std;

int main() {
  int n = 4;
  int jumlah = 0;
  for (int i = 1; i < n; i++) {
    jumlah += i;
  }
  cout << "jumlah 1 sampai " << n << " = " << jumlah << "\n";
}
```

Keluaran yang didapat (c):

```text
jumlah 1 sampai 4 = 6
```

```cpp
#include <iostream>
using namespace std;

int main() {
  int n = 9;
  if (n % 3 == 0 || n % 5 == 0) {
    cout << "habis dibagi 3 dan 5\n";
  } else {
    cout << "tidak\n";
  }
}
```

Keluaran yang didapat (d):

```text
habis dibagi 3 dan 5
```

```cpp
#include <iostream>
using namespace std;

int main() {
  int n = 4821;
  int puluhan = n / 10;
  cout << "digit puluhan = " << puluhan << "\n";
}
```

Keluaran yang didapat (e):

```text
digit puluhan = 482
```

## Latihan bercampur

1. Baca `n` bilangan ke array, lalu cetak banyak yang genap dan banyak yang ganjil dalam dua baris (modul `a-x2-m1`).
2. Cetak semua bilangan 1 sampai 30 yang habis dibagi 3 tetapi tidak habis dibagi 6 (modul `a-x1-m11` dan `a-x1-m10`).
3. Jumlah digit sebuah bilangan dapat dihitung dengan aritmetika (`% 10`, `/ 10`) atau dengan string seperti pada `a-x2-m2`. Kapan masing-masing cara lebih cocok?

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `a-x2-m5` (pertanyaan 1), sekitar tiga minggu lagi di `a-x2-m7` (pertanyaan 2), dan sekitar delapan minggu lagi di `a-x2-m12` (pertanyaan 3). Jawab sekarang lalu simpan.

1. Sebutkan dua cara menemukan galat dengan mencetak nilai dan uji kecil.
2. Bagaimana mengambil digit terakhir bilangan bulat positif dan membuang digit itu?
3. Bagaimana memeriksa bahwa `n` habis dibagi `d`?

## Kesalahan umum

- **Mengubah banyak hal sekaligus.** Bila lima baris diubah dan program kini benar, kamu tidak tahu perubahan mana yang menolong. Ubah satu hal, jalankan, dan catat.
- **Membaca semua pesan galat.** Mulai dari pesan pertama; pesan sesudahnya sering hanya akibat dari yang pertama.
- **Mengandalkan "kelihatannya benar".** Galat logika baru tampak setelah program diuji dengan masukan kecil yang jawabannya kamu hitung sendiri.
- **Meninggalkan cetakan pelacak.** Cetakan untuk mencari galat harus dibuang sebelum program diserahkan, karena mengotori keluaran.
- **Memakai `n % 2 == 1` untuk uji ganjil.** Pada bilangan negatif sisanya -1, sehingga uji itu salah; pakai `n % 2 != 0`.

## Cek mandiri

- [ ] Saya dapat membedakan galat kompilasi, galat saat berjalan, dan galat logika.
- [ ] Saya dapat melacak galat dengan mencetak nilai dan masukan kecil.
- [ ] Saya dapat mengambil dan membuang digit terakhir dengan `% 10` dan `/ 10`.
- [ ] Saya dapat memeriksa paritas dan habis dibagi.
- [ ] Saya menulis pseudocode sebelum programnya.

## Kunci dan petunjuk

**Ingat kembali.** 1: indeks pertama adalah baris (terbesar `b - 1`), indeks kedua adalah kolom (terbesar `k - 1`). 2: indeks yang sah hanya 0 sampai `n - 1`; `a[n]` berada di luar array dan hasilnya tidak terdefinisi. 3: `!(p && q)` sama dengan `!p || !q`.

**Prediksi dulu.** 1: `1 1 482`, `1 0`. 2: dibagi 10 menyisakan satu digit terakhir sebagai sisa; hasil bagi bulat membuang digit itu.

**Contoh setengah jadi.** Isi: `>`, `/`, `banyak`. Program lengkapnya:

```cpp
#include <iostream>
using namespace std;

int main() {
  int n;
  cin >> n;
  int banyak = 0;
  while (n > 0) {
    banyak++;
    n = n / 10;
  }
  cout << banyak << "\n";
}
```

Masukan (`masukan.txt`):

```text
90210
```

Keluaran:

```text
5
```

**Soal Parsons.** Urutan benar: e, b, f, g, c, d, a; hasil yang tercetak 15. Variabel `n` dan `jumlah` harus dideklarasikan sebelum perulangan, dan `}` menutup perulangan sebelum hasil dicetak.

**Latihan.** 1: (a) galat logika: kedua operan `int` sehingga pembagian dipotong; tulis `(a + b + c) / 3.0`. (b) galat logika: yang dicacah ganjil; ganti menjadi `i % 2 == 0`. (c) galat logika: batas kurang satu; ganti menjadi `i <= n`, hasilnya 10. (d) galat logika: `||` seharusnya `&&`; untuk 9 hasilnya `tidak`. (e) galat logika: `n / 10` membuang digit terakhir tetapi belum mengambil digit puluhan; pakai `n / 10 % 10`, hasilnya 2. Semuanya galat logika karena berjalan tanpa pesan. 2: program contoh:

```cpp
#include <iostream>
using namespace std;

int main() {
  int n;
  cin >> n;
  int banyak = 0;
  int jumlah = 0;
  while (n > 0) {
    jumlah += n % 10;
    banyak++;
    n = n / 10;
  }
  cout << banyak << " " << jumlah << "\n";
}
```

Masukan (`masukan.txt`):

```text
90210
```

Keluaran:

```text
5 12
```

3: program contoh:

```cpp
#include <iostream>
using namespace std;

int main() {
  int a, b;
  cin >> a >> b;
  cout << a / b << " " << a % b << " ";
  if (a % b == 0) {
    cout << "ya\n";
  } else {
    cout << "tidak\n";
  }
}
```

Masukan (`masukan.txt`):

```text
47 6
```

Keluaran:

```text
7 5 tidak
```

4: contoh isi: gejala "keluaran 2 padahal 2,66667", jenis galat logika, cara menemukan: hitung tangan satu contoh kecil dan bandingkan.

**Latihan bercampur.** 1: dalam satu perulangan: `if (a[i] % 2 == 0) { genap++; } else { ganjil++; }`. 2: `for (int i = 1; i <= 30; i++) { if (i % 3 == 0 && i % 6 != 0) { cout << i << "\n"; } }`; hasilnya 3, 9, 15, 21, 27. 3: aritmetika cepat dan tidak butuh string, tetapi hanya untuk bilangan yang muat di tipe bilangan; string cocok bila bilangannya terlalu panjang untuk `long long` atau datang sebagai teks.

**Ulang berjarak.** 1: contoh: mencetak nilai variabel di tempat yang dicurigai, dan menjalankan program dengan masukan kecil yang jawabannya dihitung tangan. 2: `n % 10` untuk digit terakhir, `n / 10` untuk membuangnya. 3: periksa `n % d == 0`.

## Langkah berikutnya

Modul berikut: `a-x2-m5` (FPB, KPK, bilangan prima), yang memakai sisa bagi dan perulangan dari modul ini. Modul terkait: `matkom-bilangan-bertanda-dan-luapan` sebagai bacaan pendamping tentang bilangan negatif dan luapan. Bacaan lanjut: halaman GCC tentang pilihan peringatan (`-Wall`, `-Wextra`).
