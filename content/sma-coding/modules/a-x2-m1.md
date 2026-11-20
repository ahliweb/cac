## Untuk siapa modul ini

Modul ini untuk murid kelas X jalur A (Algoritmik dengan C++), minggu `A-X2-M1` silabus v1.4.1: array satu dimensi. Prasyarat: modul `a-x1-m12` (fungsi dan parameter). Kamu tidak perlu pernah memprogram sebelum jalur ini, tetapi modul ini memakai perulangan dan fungsi dari semester 1.

Modul ini karangan penyusun dan disetujui pemilik program pada 2026-11-20 (keputusan lewat dialog; catatan tinjauan menjadi tindak lanjut revisi). Butir `E-BK-d` dipetakan silabus sebagai dipenuhi jalur ini; pemenuhan butir mengikuti pemetaan silabus, bukan status modul. Keluarga materi OSN yang bertaut: `struktur-data` (array sesuai CP, bukan pengayaan).

Bila kamu pernah memakai Python: array C++ berukuran tetap, semua elemennya bertipe sama, dan tidak ada pengecekan batas indeks. Urutan modul: tebak dulu, lengkapi, susun, baru menulis dari kosong. Tiap soal latihan bertanda `AI: boleh` atau `AI: tanpa AI`. Masukan program diberikan lewat berkas: `./program < masukan.txt`.

## Ingat kembali

Jawab dari ingatan dulu, baru cek di kunci. Soal 1 dari `a-x1-m11`, soal 2 dari `a-x1-m12`, soal 3 dari `a-x1-m13`.

1. Berapa kali badan `for (int i = 0; i < 5; i++)` dijalankan?
2. Kapan sebuah parameter perlu ditulis dengan `&`?
3. Mengapa nilai batas perlu diuji, bukan hanya nilai biasa?

## Tujuan

Setelah modul ini kamu dapat:

- mendeklarasikan array, mengisinya, dan mengakses elemen lewat indeks yang dimulai dari 0;
- memproses barisan data dengan perulangan: jumlah, maksimum, minimum, dan rata-rata;
- membalik isi array tanpa array tambahan;
- menulis fungsi yang menerima array dan ukurannya.

## Prediksi dulu

Ini tugas baca-dan-prediksi, `AI: tanpa AI`. **Tebak dulu, tulis jawabanmu, baru jalankan.**

```cpp
#include <iostream>
using namespace std;

int main() {
  int a[5] = {4, 8, 15, 16, 23};
  cout << a[0] << " " << a[4] << "\n";
  a[2] = a[1] + a[3];
  cout << a[2] << "\n";
  int total = 0;
  for (int i = 0; i < 5; i++) {
    total += a[i];
  }
  cout << total << "\n";
}
```

1. Apa yang tercetak pada tiap baris?
2. Setelah `a[2] = a[1] + a[3];`, apa isi array secara lengkap?

Simpan tebakanmu. Perbandingannya ada di bagian berikutnya.

## Contoh terselesaikan

Keluaran program tadi:

Keluaran:

```text
4 23
24
75
```

Array adalah deretan variabel bertipe sama yang disimpan berurutan dan diberi satu nama. `int a[5]` membuat lima `int`; elemennya `a[0]` sampai `a[4]`. **Indeks dimulai dari 0**, jadi elemen terakhir berindeks ukuran dikurangi satu. Setelah baris pengubahan, isinya 4, 8, 24, 16, 23, dan jumlahnya 75.

Ukuran array harus diketahui saat program dibuat. Kebiasaan yang aman: sediakan array lebih besar dari batas masukan (misalnya 100), baca `n`, lalu pakai hanya `n` elemen pertama. Program berikut membaca `n` bilangan, lalu mencetak maksimum, minimum, dan rata-ratanya. Maksimum dan minimum dimulai dari elemen pertama, bukan dari 0, karena semua data bisa saja negatif.

```cpp
#include <iostream>
using namespace std;

int main() {
  int a[100];
  int n;
  cin >> n;
  for (int i = 0; i < n; i++) {
    cin >> a[i];
  }
  int maks = a[0];
  int mini = a[0];
  long long jumlah = 0;
  for (int i = 0; i < n; i++) {
    if (a[i] > maks) {
      maks = a[i];
    }
    if (a[i] < mini) {
      mini = a[i];
    }
    jumlah += a[i];
  }
  cout << "maks = " << maks << "\n";
  cout << "min = " << mini << "\n";
  cout << "rata-rata = " << static_cast<double>(jumlah) / n << "\n";
}
```

Masukan (`masukan.txt`):

```text
6
12 7 30 5 18 9
```

Keluaran:

```text
maks = 30
min = 5
rata-rata = 13.5
```

Membalik array dilakukan dengan menukar elemen pertama dengan terakhir, kedua dengan kedua dari belakang, dan seterusnya. Pertukaran berhenti di tengah; kalau terus sampai ujung, array dibalik dua kali dan kembali seperti semula. Pertukarannya memakai variabel sementara (`a-x1-m8`). Array yang dikirim ke fungsi tidak disalin: fungsi bekerja pada array aslinya, jadi ukurannya dikirim sebagai parameter terpisah.

```cpp
#include <iostream>
using namespace std;

void balik(int a[], int n) {
  for (int i = 0; i < n / 2; i++) {
    int sementara = a[i];
    a[i] = a[n - 1 - i];
    a[n - 1 - i] = sementara;
  }
}

int main() {
  int a[100];
  int n;
  cin >> n;
  for (int i = 0; i < n; i++) {
    cin >> a[i];
  }
  balik(a, n);
  for (int i = 0; i < n; i++) {
    if (i > 0) {
      cout << " ";
    }
    cout << a[i];
  }
  cout << "\n";
}
```

Masukan (`masukan.txt`):

```text
5
3 1 4 1 5
```

Keluaran:

```text
5 1 4 1 3
```

## Contoh setengah jadi

Program yang membaca `n` bilangan dan mencetak berapa banyak yang genap. Lengkapi bagian `____`.

```cpp setengah-jadi
#include <iostream>
using namespace std;

int main() {
  int a[100];
  int n;
  cin >> n;
  for (int i = 0; i < ____; i++) {
    cin >> a[____];
  }
  int genap = ____;
  for (int i = 0; i < n; i++) {
    if (a[i] % 2 == ____) {
      genap++;
    }
  }
  cout << genap << "\n";
}
```

## Soal Parsons

Susun baris-baris berikut (sudah diacak) menjadi badan `main` yang membaca `n` bilangan lalu mencetaknya dari yang terakhir ke yang pertama, satu per baris. `AI: tanpa AI`: tujuannya melatih membaca urutan program.

```text
(a)   int a[100];
(b)   }
(c)   for (int i = n - 1; i >= 0; i--) {
(d)   int n;
(e)   cin >> n;
(f)   for (int i = 0; i < n; i++) {
(g)     cin >> a[i];
(h)   }
(i)     cout << a[i] << "\n";
```

## Latihan

1. `AI: boleh` **Pseudocode dulu.** Tulis pseudocode lalu program yang membaca `n` suhu sintetis (bilangan bulat) dan mencetak selisih antara suhu tertinggi dan terendah. Uji dengan 6 suhu: 28 31 25 30 27 29.
2. `AI: tanpa AI` **Telusuri.** Buat tabel penelusuran `balik` untuk array 2, 7, 1, 8 (`n = 4`): isi array setelah tiap pertukaran. Apa hasil akhirnya?
3. `AI: boleh` **Letak maksimum.** Cetak indeks (mulai dari 0) kemunculan pertama nilai terbesar. Uji dengan 6 / 4 9 2 9 1 7.
4. `AI: boleh` **Di atas rata-rata.** Cetak berapa banyak elemen yang lebih besar dari rata-rata. Uji dengan 5 / 10 20 30 40 50.
5. *Opsional:* **catatan pemakaian AI.** Bila memakai AI generatif, jawab nomor 1 sendiri dulu, lalu minta penjelasan atau petunjuk bertahap, bukan program jadi. Catat alatnya, tujuanmu, garis besar perintahmu, bagian yang kamu pakai, dan caramu memeriksanya (jalankan atau telusuri). Jangan menaruh data pribadi atau tugas bernilai pada perintah.

## Latihan bercampur

1. Tulis fungsi `int maksimum(int a[], int n)` yang mengembalikan nilai terbesar, lalu panggil dari `main` (modul `a-x1-m12`).
2. Baca `n` skor sintetis (0 sampai 100) ke dalam array, lalu cetak huruf `A` untuk skor 85 ke atas, `B` untuk 70 ke atas, selain itu `C`, satu huruf per baris (modul `a-x1-m10`).
3. Jumlah 100000 bilangan yang masing-masing sampai 1.000.000.000 disimpan di variabel bertipe apa, dan mengapa (modul `a-x1-m9`)?

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `a-x2-m2` (pertanyaan 1), sekitar tiga minggu lagi di `a-x2-m4` (pertanyaan 2), dan sekitar delapan minggu lagi di `a-x2-m9` (pertanyaan 3). Jawab sekarang lalu simpan.

1. Apa indeks elemen pertama dan terakhir array berukuran `n`?
2. Mengapa mengakses `a[n]` pada array berukuran `n` adalah kesalahan?
3. Bagaimana menukar isi `a[i]` dan `a[j]`?

## Kesalahan umum

- **Mengira indeks dimulai dari 1.** Array berukuran `n` berindeks 0 sampai `n - 1`; perulangan `i <= n` membaca satu elemen terlalu jauh.
- **Mengakses di luar batas.** C++ tidak menolak `a[100]` pada array berukuran 100. Program bisa tampak jalan, memberi nilai sembarang, atau berhenti mendadak, sehingga galatnya sulit dilacak.
- **Memulai maksimum dari 0.** Bila semua data negatif, hasilnya salah. Mulai dari `a[0]`.
- **Membagi dua bilangan bulat untuk rata-rata.** `jumlah / n` memotong pecahan; ubah salah satunya menjadi `double`.
- **Lupa bahwa array tidak disalin ke fungsi.** Fungsi yang mengubah `a[i]` mengubah array di `main`, dan ukurannya harus dikirim sendiri.

## Cek mandiri

- [ ] Saya dapat menjelaskan bahwa indeks array dimulai dari 0.
- [ ] Saya dapat mengisi dan mencetak array dengan perulangan.
- [ ] Saya dapat mencari maksimum, minimum, dan rata-rata.
- [ ] Saya dapat membalik array dengan pertukaran sampai tengah.
- [ ] Saya menulis pseudocode sebelum programnya.

## Kunci dan petunjuk

**Ingat kembali.** 1: 5 kali (i = 0 sampai 4). 2: bila fungsi harus mengubah variabel aslinya (atau menghindari menyalin data besar). 3: karena galat sering muncul di batas (nilai terkecil, terbesar, atau tepat di perbatasan percabangan).

**Prediksi dulu.** 1: `4 23`, `24`, `75`. 2: 4, 8, 24, 16, 23.

**Contoh setengah jadi.** Isi: `n`, `i`, `0`, `0`. Program lengkapnya:

```cpp
#include <iostream>
using namespace std;

int main() {
  int a[100];
  int n;
  cin >> n;
  for (int i = 0; i < n; i++) {
    cin >> a[i];
  }
  int genap = 0;
  for (int i = 0; i < n; i++) {
    if (a[i] % 2 == 0) {
      genap++;
    }
  }
  cout << genap << "\n";
}
```

Masukan (`masukan.txt`):

```text
6
3 8 12 5 7 10
```

Keluaran:

```text
3
```

**Soal Parsons.** Urutan benar: d, a, e, f, g, h, c, i, b. Baris (b) dan (h) sama-sama `}`, jadi boleh bertukar tempat. Seluruh pembacaan harus selesai (ditutup `}`) sebelum perulangan pencetakan dimulai.

**Latihan.** 1: pseudocode: baca n; baca n suhu; tertinggi <- suhu pertama; terendah <- suhu pertama; ulangi untuk tiap suhu: perbarui tertinggi dan terendah; cetak tertinggi - terendah. Program contoh:

```cpp
#include <iostream>
using namespace std;

int main() {
  int a[100];
  int n;
  cin >> n;
  for (int i = 0; i < n; i++) {
    cin >> a[i];
  }
  int tinggi = a[0];
  int rendah = a[0];
  for (int i = 1; i < n; i++) {
    if (a[i] > tinggi) {
      tinggi = a[i];
    }
    if (a[i] < rendah) {
      rendah = a[i];
    }
  }
  cout << tinggi - rendah << "\n";
}
```

Masukan (`masukan.txt`):

```text
6
28 31 25 30 27 29
```

Keluaran:

```text
6
```

2: awal (2, 7, 1, 8); i = 0 menukar a[0] dan a[3]: (8, 7, 1, 2); i = 1 menukar a[1] dan a[2]: (8, 1, 7, 2); `n / 2` = 2, jadi berhenti. Hasil akhir 8, 1, 7, 2. 3: simpan indeks `idx` yang diperbarui hanya bila `a[i] > maks` (bukan `>=`) agar yang tercatat kemunculan pertama. Program contoh:

```cpp
#include <iostream>
using namespace std;

int main() {
  int a[100];
  int n;
  cin >> n;
  for (int i = 0; i < n; i++) {
    cin >> a[i];
  }
  int idx = 0;
  for (int i = 1; i < n; i++) {
    if (a[i] > a[idx]) {
      idx = i;
    }
  }
  cout << idx << "\n";
}
```

Masukan (`masukan.txt`):

```text
6
4 9 2 9 1 7
```

Keluaran:

```text
1
```

4: program contoh (rata-rata disimpan sebagai `double` supaya tidak terpotong):

```cpp
#include <iostream>
using namespace std;

int main() {
  int a[100];
  int n;
  cin >> n;
  long long jumlah = 0;
  for (int i = 0; i < n; i++) {
    cin >> a[i];
    jumlah += a[i];
  }
  double rata = static_cast<double>(jumlah) / n;
  int banyak = 0;
  for (int i = 0; i < n; i++) {
    if (a[i] > rata) {
      banyak++;
    }
  }
  cout << banyak << "\n";
}
```

Masukan (`masukan.txt`):

```text
5
10 20 30 40 50
```

Keluaran:

```text
2
```

**Latihan bercampur.** 1: `int maksimum(int a[], int n) { int m = a[0]; for (int i = 1; i < n; i++) { if (a[i] > m) { m = a[i]; } } return m; }`. 2: baca ke array, lalu satu perulangan dengan `if (a[i] >= 85) {...} else if (a[i] >= 70) {...} else {...}`. 3: `long long`: jumlahnya sampai 10^14, jauh melewati batas `int` (sekitar 2,1 miliar).

**Ulang berjarak.** 1: indeks 0 dan `n - 1`. 2: indeks yang sah hanya 0 sampai `n - 1`; `a[n]` berada di luar array dan hasilnya tidak terdefinisi. 3: pakai variabel sementara: `int t = a[i]; a[i] = a[j]; a[j] = t;`.

## Langkah berikutnya

Modul berikut: `a-x2-m2` (string), yang memperlakukan teks sebagai deretan karakter berindeks. Modul terkait: `matkom-sistem-bilangan-basis` dan `matkom-bilangan-bertanda-dan-luapan` sebagai bacaan pendamping tentang batas tipe bilangan. Bacaan lanjut: halaman cppreference tentang array.
