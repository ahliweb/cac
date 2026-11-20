## Untuk siapa modul ini

Modul ini untuk murid kelas XI jalur A (Algoritmik dengan C++), minggu `A-XI1-M7` silabus v1.4.1: rekursi dan divide-and-conquer. Prasyarat: modul `a-xi1-m6` dan `a-x2-m11` (pengantar rekursi).

Modul ini berstatus DRAF: karangan penyusun, belum ditinjau pemilik. Butir `F-AP-a`, `F-AP-b`, dan `F-BK-b` dipetakan silabus sebagai dipenuhi jalur ini; modul draf ini belum dihitung sebagai pemenuhan. Keluarga materi OSN yang bertaut: `rekursi` dan `strategi-problem-solving` (rekursi dan divide-and-conquer ada di panduan, bukan pengayaan). Modul tidak menjanjikan kedalaman soal OSN dan tidak menggantikan pembinaan OSN.

Bila kamu pernah memakai Python: gagasannya sama; yang baru adalah memperkirakan banyak langkah dari cara masalah dibelah. Tiap soal latihan bertanda `AI: boleh` atau `AI: tanpa AI`. Masukan program diberikan lewat berkas: `./program < masukan.txt`.

## Ingat kembali

Jawab dari ingatan dulu, baru cek di kunci. Soal 1 dari `a-xi1-m6`, soal 2 dari `a-xi1-m4`, soal 3 dari `a-x2-m13`.

1. Bagaimana kamu mencari contoh tandingan untuk sebuah aturan greedy?
2. Mengapa urutan data menurun dapat membuat pemangkasan lebih banyak?
3. Kapan sebaiknya data diurutkan dulu lalu dicari dengan pencarian biner, dan kapan cukup pencarian sekuensial?

## Tujuan

Setelah modul ini kamu dapat:

- menjelaskan tiga langkah divide-and-conquer: bagi, selesaikan submasalah, gabungkan hasilnya;
- menulis fungsi rekursif yang membelah masalah menjadi dua bagian yang lebih kecil;
- menulis pangkat cepat dan pencarian biner dalam bentuk rekursif;
- memperkirakan banyak langkah dari banyak pembelahan, dan menjelaskan mengapa kedalaman rekursinya kecil.

## Prediksi dulu

Ini tugas baca-dan-prediksi, `AI: tanpa AI`. **Tebak dulu, tulis jawabanmu, baru jalankan.** Fungsi menghitung `a` pangkat `n` dengan membelah `n` menjadi dua; parameter `kali` menghitung banyak perkalian.

```cpp
#include <iostream>
using namespace std;

long long pangkat(long long a, int n, int& kali) {
  if (n == 0) {
    return 1;
  }
  long long setengah = pangkat(a, n / 2, kali);
  kali++;
  if (n % 2 == 1) {
    kali++;
    return setengah * setengah * a;
  }
  return setengah * setengah;
}

int main() {
  int kali = 0;
  cout << pangkat(2, 10, kali) << " " << kali << "\n";
  kali = 0;
  cout << pangkat(3, 13, kali) << " " << kali << "\n";
}
```

1. Apa yang tercetak pada tiap baris?
2. Cara biasa (`a * a * ... * a`) memerlukan `n - 1` perkalian. Bandingkan untuk `n = 10`.

Simpan tebakanmu. Perbandingannya ada di bagian berikutnya.

## Contoh terselesaikan

Keluaran program tadi:

Keluaran:

```text
1024 6
1594323 7
```

Untuk `n = 10`: 1024 dengan 6 perkalian, bukan 9; untuk `n = 13`: 7 perkalian, bukan 12. **Divide-and-conquer** (bagi dan taklukkan) punya tiga langkah: *bagi* masalah menjadi bagian yang lebih kecil, *selesaikan* tiap bagian (biasanya dengan rekursi yang sama), dan *gabungkan* hasilnya. Pada pangkat cepat: `a^n = (a^(n/2))^2`, dan satu `a` lagi bila `n` ganjil. Karena `n` dibagi dua tiap kali, kedalaman rekursinya sekitar `log2 n`, dan tiap tingkat paling banyak dua perkalian, sehingga seluruhnya `O(log n)`. Program berikut membaca `a`, `n`, dan `m`, lalu mencetak `a^n` sisa bagi `m` (dengan `m` paling besar sekitar satu miliar, sehingga hasil kali dua bilangan di bawah `m` masih muat di `long long`).

```cpp
#include <iostream>
using namespace std;

long long banyakKali = 0;

long long pangkatMod(long long a, long long n, long long m) {
  if (n == 0) {
    return 1 % m;
  }
  long long setengah = pangkatMod(a, n / 2, m);
  banyakKali++;
  long long hasil = setengah * setengah % m;
  if (n % 2 == 1) {
    banyakKali++;
    hasil = hasil * (a % m) % m;
  }
  return hasil;
}

int main() {
  long long a, n, m;
  cin >> a >> n >> m;
  cout << pangkatMod(a, n, m) << " dengan " << banyakKali << " perkalian\n";
}
```

Masukan (`masukan.txt`):

```text
3 1000000000000 1000000007
```

Keluaran:

```text
570188345 dengan 53 perkalian
```

Pangkatnya satu triliun, tetapi hanya puluhan perkalian: `log2` satu triliun sekitar 40, dan tiap tingkat paling banyak dua perkalian, sehingga paling banyak sekitar 80. Cara biasa tak mungkin selesai. Contoh kedua, pencarian biner dalam bentuk rekursif, juga membelah dua; di sini hanya satu bagian yang dikerjakan, sehingga tidak ada langkah gabung. Program membaca `n` data terurut dan `q` pertanyaan, lalu mencetak indeks dan kedalaman rekursi.

```cpp
#include <iostream>
#include <vector>
using namespace std;

int cari(const vector<int>& v, int x, int kiri, int kanan, int dalam, int& kedalaman) {
  kedalaman = dalam;
  if (kiri > kanan) {
    return -1;
  }
  int tengah = kiri + (kanan - kiri) / 2;
  if (v[tengah] == x) {
    return tengah;
  }
  if (v[tengah] < x) {
    return cari(v, x, tengah + 1, kanan, dalam + 1, kedalaman);
  }
  return cari(v, x, kiri, tengah - 1, dalam + 1, kedalaman);
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
    int x, kedalaman;
    cin >> x;
    int hasil = cari(v, x, 0, n - 1, 1, kedalaman);
    cout << x << ": indeks " << hasil << ", kedalaman " << kedalaman << "\n";
  }
}
```

Masukan (`masukan.txt`):

```text
12
3 8 12 17 21 26 30 35 41 47 52 60
3
26 60 5
```

Keluaran:

```text
26: indeks 5, kedalaman 1
60: indeks 11, kedalaman 4
5: indeks -1, kedalaman 5
```

Untuk 12 data, nilai yang ada ditemukan paling dalam di kedalaman 4, dan nilai yang tak ada berakhir di kedalaman 5 (pemanggilan terakhir memeriksa rentang kosong), sesuai `2^3 = 8 < 12 <= 2^4 = 16`: `O(log n)` langkah. Bedakan dari rekursi yang hanya mengurangi `n` satu per satu (seperti faktorial di `a-x2-m11`), yang kedalamannya `n`. Membelah dua membuat tumpukan pemanggilan dangkal dan langkahnya sedikit.

## Contoh setengah jadi

Lengkapi pangkat cepat untuk `a^n` (tanpa modulo).

```cpp setengah-jadi
long long pangkat(long long a, int n) {
  if (n == ____) {
    return 1;
  }
  long long setengah = pangkat(a, n / ____);
  if (n % 2 == 0) {
    return setengah * setengah;
  }
  return setengah * setengah * ____;
}
```

## Soal Parsons

Susun delapan baris berikut (sudah diacak) menjadi fungsi rekursif yang menjumlah `a[kiri..kanan]` dengan membelah dua. `AI: tanpa AI`: tujuannya melatih membaca urutan.

```text
(a)   if (kiri == kanan) return a[kiri];
(b)   int tengah = (kiri + kanan) / 2;
(c) int jumlah(const int a[], int kiri, int kanan) {
(d)   int kiriJumlah = jumlah(a, kiri, tengah);
(e)   int kananJumlah = jumlah(a, tengah + 1, kanan);
(f)   return kiriJumlah + kananJumlah;
(g) }
```

## Latihan

1. `AI: boleh` **Pangkat cepat.** Tulis pseudocode lalu program yang membaca `a`, `n`, `m` dan mencetak `a^n` sisa bagi `m`. Uji dengan `n = 0`, `n = 1`, dan `m = 1`.
2. `AI: tanpa AI` **Telusuri.** Telusuri `pangkatMod(2, 13, 1000)` dengan tabel pemanggilan. Berapa hasilnya dan berapa perkalian?
3. `AI: boleh` **Jumlah membelah.** Tulis fungsi `jumlah(a, kiri, kanan)` yang membelah dua seperti di soal Parsons, lalu hitung banyak pemanggilannya untuk `n = 8` dan `n = 16`. Apa polanya?
4. `AI: tanpa AI` **Kedalaman.** Berapa kedalaman paling besar pencarian biner rekursif untuk satu juta data? Jelaskan dengan pangkat dua.
5. *Opsional:* **catatan pemakaian AI.** Bila memakai AI generatif, jawab nomor 1 sendiri dulu, lalu minta penjelasan atau petunjuk bertahap, bukan program jadi. Catat alatnya, tujuanmu, garis besar perintahmu, bagian yang kamu pakai, dan caramu memeriksanya (jalankan atau telusuri). Jangan menaruh data pribadi atau tugas bernilai pada perintah.

## Latihan bercampur

1. `AI: boleh` Bandingkan banyak pemanggilan pencarian lengkap subhimpunan `2^(n+1) - 1` dengan pangkat cepat untuk `n = 40` (modul `a-xi1-m3`).
2. `AI: tanpa AI` Mengapa `pangkat(a, n - 1)` yang dipanggil rekursif berbahaya untuk `n = 1000000000`, sedangkan pangkat cepat aman (modul `a-x2-m11`)?
3. `AI: boleh` Tulis tiga kasus uji tepi untuk pangkat cepat dan pencarian biner rekursif (modul `a-xi1-m2`).

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `a-xi1-m8` (pertanyaan 1), sekitar tiga minggu lagi di `a-xi1-m10` (pertanyaan 2), dan sekitar delapan minggu lagi di `a-xi2-m1` (pertanyaan 3). Jawab sekarang lalu simpan.

1. Sebutkan tiga langkah divide-and-conquer dan beri satu contoh.
2. Mengapa pangkat cepat hanya memerlukan sekitar `log n` perkalian?
3. Apa beda divide-and-conquer dengan rekursi yang hanya mengurangi `n` satu per satu?

## Kesalahan umum

- **Membelah tetapi tidak mengecil.** Bila kedua bagian sama besar dengan masalahnya, rekursi tak pernah berhenti.
- **Lupa kasus dasar.** `n == 0` pada pangkat dan `kiri > kanan` pada pencarian biner harus ada.
- **Luapan.** Hasil kali dua bilangan yang besar bisa melewati `long long`; ambil sisa bagi tiap kali dan perhatikan batas `m`.
- **Menghitung dua kali bagian yang sama.** Menulis `pangkat(a, n / 2) * pangkat(a, n / 2)` memanggil dua kali, sehingga kembali ke `O(n)`; simpan hasilnya di variabel.
- **Menyamakan semua rekursi dengan divide-and-conquer.** Rekursi yang mengurangi `n` satu per satu tidak membelah, dan kedalamannya `n`.

## Cek mandiri

- [ ] Saya dapat menyebut tiga langkah divide-and-conquer.
- [ ] Saya dapat menulis pangkat cepat dan pencarian biner rekursif.
- [ ] Saya dapat menjelaskan mengapa langkahnya `O(log n)`.
- [ ] Saya dapat menunjuk kasus dasar dan memastikan masalah mengecil.
- [ ] Saya menyimpan hasil submasalah di variabel, bukan menghitungnya dua kali.

## Kunci dan petunjuk

**Ingat kembali.** 1: tulis pencarian lengkap yang pasti benar, bandingkan pada banyak data kecil, dan cari data yang jawabannya berbeda. 2: bilangan besar di depan cepat melewati batas, sehingga cabang terpangkas lebih awal dan lebih besar. 3: bila data sudah terurut dan banyak pertanyaan, biner; bila hanya satu pertanyaan pada data tak terurut, cukup sekuensial karena mengurutkan lebih mahal.

**Prediksi dulu.** 1: `1024 6` dan `1594323 7`. 2: 6 perkalian dibanding 9.

**Contoh setengah jadi.** Isi: `0`, `2`, dan `a`. Program lengkap:

```cpp
#include <iostream>
using namespace std;

long long pangkat(long long a, int n) {
  if (n == 0) {
    return 1;
  }
  long long setengah = pangkat(a, n / 2);
  if (n % 2 == 0) {
    return setengah * setengah;
  }
  return setengah * setengah * a;
}

int main() {
  cout << pangkat(5, 7) << " " << pangkat(2, 20) << "\n";
}
```

Keluaran:

```text
78125 1048576
```

**Soal Parsons.** Urutan benar: c, a, b, d, e, f, g.

**Latihan.** 1: `n = 0` memberi `1 % m`, jadi 1 untuk `m > 1` dan 0 untuk `m = 1`; `n = 1` memberi `a % m`. 2: `13 -> 6 -> 3 -> 1 -> 0`; perkalian: `n = 1`: 2, `n = 3`: 2, `n = 6`: 1, `n = 13`: 2, total 7; hasil `8192 mod 1000 = 192`. 3: pemanggilan untuk `n = 8` adalah 15 dan untuk `n = 16` adalah 31, yaitu `2n - 1`; langkahnya `O(n)`, karena tiap elemen dikunjungi sekali. 4: `2^19 = 524288 < 1000000 <= 2^20`, jadi kedalaman sekitar 20 (satu lebih bila pemanggilan rentang kosong ikut dihitung).

**Latihan bercampur.** 1: pencarian lengkap untuk `n = 40` sekitar `2^41`, lebih dari dua triliun; pangkat cepat hanya 8 perkalian (`40 -> 20 -> 10 -> 5 -> 2 -> 1 -> 0`, satu perkalian bila genap dan dua bila ganjil). 2: rekursi satu per satu membuat kedalaman satu miliar bingkai di tumpukan, yang melampaui batas tumpukan; pangkat cepat hanya sekitar 30 bingkai. 3: `n = 0`, `n = 1`, dan `m = 1` untuk pangkat; pencarian biner pada satu elemen, nilai di ujung kiri atau kanan, dan nilai yang tak ada.

**Ulang berjarak.** 1: bagi, selesaikan, gabungkan; contoh: pangkat cepat atau pencarian biner. 2: karena `n` dibagi dua tiap tingkat, ada sekitar `log2 n` tingkat dengan paling banyak dua perkalian tiap tingkat. 3: divide-and-conquer membagi masalah menjadi bagian yang jauh lebih kecil (misalnya separuh), sehingga kedalamannya `log n`; rekursi satu per satu hanya mengurangi `n` satu, sehingga kedalamannya `n`.

## Langkah berikutnya

Modul berikut: `a-xi1-m8` (merge sort, quick sort, dan `std::sort`), tempat membelah dua dipakai untuk mengurutkan. Modul terkait: `matkom-induksi-dan-rekursi-matematis` dan `matkom-pertumbuhan-fungsi`. Bacaan lanjut: halaman cppreference tentang `std::binary_search`, yang menyatakan paling banyak sekitar `log2(N)` perbandingan.
