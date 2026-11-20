## Untuk siapa modul ini

Modul ini untuk murid kelas XI jalur A (Algoritmik dengan C++), minggu `A-XI1-M5` silabus v1.4.1: greedy I. Prasyarat: modul `a-xi1-m4` (pencarian lengkap dan pemangkasan). Pencarian lengkap kamu pakai di sini sebagai pembanding.

Modul ini berstatus DRAF: karangan penyusun, belum ditinjau pemilik. Butir `F-AP-a`, `F-AP-b`, dan `F-BK-b` dipetakan silabus sebagai dipenuhi jalur ini; modul draf ini belum dihitung sebagai pemenuhan. Keluarga materi OSN yang bertaut: `strategi-problem-solving` (greedy ada di panduan, bukan pengayaan). Modul tidak menjanjikan kedalaman soal OSN dan tidak menggantikan pembinaan OSN.

Bila kamu pernah memakai Python: gagasannya sama dengan perulangan yang selalu mengambil pilihan terbaik saat itu. Tiap soal latihan bertanda `AI: boleh` atau `AI: tanpa AI`. Masukan program diberikan lewat berkas: `./program < masukan.txt`.

## Ingat kembali

Jawab dari ingatan dulu, baru cek di kunci. Soal 1 dari `a-xi1-m4`, soal 2 dari `a-xi1-m2`, soal 3 dari `a-x2-m11`.

1. Kapan sebuah cabang pencarian boleh dipangkas tanpa kehilangan jawaban?
2. Mengapa kasus uji yang semuanya lulus tidak membuktikan bahwa program benar?
3. Mengapa `fib` rekursif sederhana lambat untuk `n` besar?

## Tujuan

Setelah modul ini kamu dapat:

- menjelaskan strategi greedy: pada tiap langkah ambil pilihan yang terbaik saat itu dan tidak pernah membatalkannya;
- menulis program greedy untuk menukar uang dengan koin paling sedikit;
- menyusun alasan mengapa pilihan serakah benar untuk himpunan koin tertentu;
- membandingkan hasil greedy dengan pencarian lengkap pada data kecil.

## Prediksi dulu

Ini tugas baca-dan-prediksi, `AI: tanpa AI`. **Tebak dulu, tulis jawabanmu, baru jalankan.** Mata uang karangan memakai koin bernilai 100, 50, 10, 5, dan 1. Fungsi menukar jumlah uang dengan selalu mengambil koin terbesar yang masih muat.

```cpp
#include <iostream>
using namespace std;

int banyakKoin(int uang) {
  int koin[5] = {100, 50, 10, 5, 1};
  int total = 0;
  for (int i = 0; i < 5; i++) {
    total += uang / koin[i];
    uang = uang % koin[i];
  }
  return total;
}

int main() {
  cout << banyakKoin(289) << " " << banyakKoin(94) << "\n";
}
```

1. Berapa koin untuk 289 dan untuk 94?
2. Apa isi `uang` setelah koin 100 diproses pada pemanggilan pertama?

Simpan tebakanmu. Perbandingannya ada di bagian berikutnya.

## Contoh terselesaikan

Keluaran program tadi:

Keluaran:

```text
11 9
```

Untuk 289: dua koin 100 (sisa 89), satu koin 50 (sisa 39), tiga koin 10 (sisa 9), satu koin 5 (sisa 4), empat koin 1, jadi `2 + 1 + 3 + 1 + 4 = 11`. **Greedy** (serakah) menyelesaikan masalah dengan satu rangkaian pilihan: pada tiap langkah ambil pilihan terbaik menurut satu aturan, dan jangan pernah membatalkannya. Tidak ada percabangan seperti pencarian lengkap, sehingga cepat. Program berikut membaca banyak jenis koin `n`, jumlah uang, dan nilai koin menurun, lalu mencetak banyak koin tiap jenis.

```cpp
#include <iostream>
#include <vector>
using namespace std;

int main() {
  int n, uang;
  cin >> n >> uang;
  vector<int> koin(n);
  for (int i = 0; i < n; i++) {
    cin >> koin[i];
  }
  int total = 0;
  int sisa = uang;
  for (int i = 0; i < n; i++) {
    int banyak = sisa / koin[i];
    sisa = sisa % koin[i];
    total += banyak;
    cout << koin[i] << " x " << banyak << "\n";
  }
  if (sisa > 0) {
    cout << "tidak bisa dibayar pas\n";
  } else {
    cout << "total " << total << " koin\n";
  }
}
```

Masukan (`masukan.txt`):

```text
5 289
100 50 10 5 1
```

Keluaran:

```text
100 x 2
50 x 1
10 x 3
5 x 1
1 x 4
total 11 koin
```

Langkahnya hanya `n = 5` putaran, masing-masing satu pembagian; secara O-besar `O(n)` untuk `n` jenis koin (bila koin sudah terurut menurun). Bandingkan dengan mencoba semua kombinasi.

**Mengapa benar?** Greedy tidak otomatis benar; ia perlu alasan. Untuk koin 1, 5, 10, 50, 100, setiap nilai adalah kelipatan nilai di bawahnya. Ambil sebuah penukaran **optimal**. Ia tidak mungkin memakai lima koin 1 atau lebih (lima koin 1 dapat diganti satu koin 5 dengan koin lebih sedikit); paling banyak satu koin 5 (dua koin 5 diganti satu koin 10); paling banyak empat koin 10 (lima koin 10 diganti satu koin 50); paling banyak satu koin 50. Jadi nilai semua koin yang lebih kecil dari suatu jenis selalu kurang dari nilai jenis berikutnya, sehingga setiap koin terbesar yang masih muat **harus** ikut dalam penukaran optimal. Itulah pembenaran pilihan serakahnya. Bila alasan itu tak berlaku, greedy bisa salah. Program berikut membandingkan greedy dengan pencarian lengkap yang mencoba setiap banyak koin tiap jenis, pada dua himpunan koin.

```cpp
#include <iostream>
#include <vector>
using namespace std;

int serakah(const vector<int>& koin, int uang) {
  int total = 0;
  for (int i = 0; i < (int)koin.size(); i++) {
    total += uang / koin[i];
    uang %= koin[i];
  }
  return uang == 0 ? total : -1;
}

int terbaik(const vector<int>& koin, int i, int sisa) {
  if (sisa == 0) {
    return 0;
  }
  if (i == (int)koin.size()) {
    return -1;
  }
  int hasil = -1;
  for (int banyak = 0; banyak * koin[i] <= sisa; banyak++) {
    int sisanya = terbaik(koin, i + 1, sisa - banyak * koin[i]);
    if (sisanya >= 0 && (hasil == -1 || banyak + sisanya < hasil)) {
      hasil = banyak + sisanya;
    }
  }
  return hasil;
}

int main() {
  vector<int> a = {100, 50, 10, 5, 1};
  vector<int> b = {4, 3, 1};
  cout << "100 50 10 5 1, uang 289: serakah " << serakah(a, 289) << ", terbaik " << terbaik(a, 0, 289) << "\n";
  cout << "4 3 1, uang 6: serakah " << serakah(b, 6) << ", terbaik " << terbaik(b, 0, 6) << "\n";
}
```

Keluaran:

```text
100 50 10 5 1, uang 289: serakah 11, terbaik 11
4 3 1, uang 6: serakah 3, terbaik 2
```

Untuk koin 4, 3, 1 dan uang 6, greedy mengambil 4 lalu 1 dan 1 (tiga koin), padahal dua koin 3 cukup. Satu contoh seperti ini disebut contoh tandingan: ia cukup untuk membuktikan bahwa greedy salah pada himpunan itu. Modul berikutnya membahas cara mencarinya. Pencarian lengkap di sini hanya untuk data kecil sebagai pembanding, bukan untuk uang besar.

## Contoh setengah jadi

Lengkapi perulangan greedy yang mencetak banyak tiap koin.

```cpp setengah-jadi
for (int i = 0; i < n; i++) {
  int banyak = sisa / ____;
  sisa = sisa ____ koin[i];
  total += ____;
}
```

## Soal Parsons

Susun enam baris berikut (sudah diacak) menjadi fungsi greedy yang mengembalikan banyak koin. `AI: tanpa AI`: tujuannya melatih membaca urutan.

```text
(a)   int total = 0;
(b) int tukar(int uang, const int koin[], int n) {
(c)   return total;
(d)   for (int i = 0; i < n; i++) {
(e)   }
(f)     total += uang / koin[i]; uang %= koin[i];
```

## Latihan

1. `AI: boleh` **Tukar uang.** Tulis pseudocode lalu program yang membaca `n`, uang, dan `n` nilai koin menurun, lalu mencetak banyak koin tiap jenis dan totalnya. Uji dengan `n = 1` (koin 1) dan dengan uang yang lebih kecil dari semua koin selain 1.
2. `AI: tanpa AI` **Alasan.** Susun alasan satu paragraf mengapa greedy benar untuk koin 1, 2, 4, 8. Mulailah dari dua koin 1, dua koin 2, dan dua koin 4.
3. `AI: boleh` **Gagal total.** Untuk koin 5 dan 2 (urutan 5, 2), cari sebuah uang yang greedy menyatakan tak bisa dibayar pas padahal ada caranya. Tulis program pembanding seperti di contoh.
4. `AI: tanpa AI` **Hitung tangan.** Tukar 387 dengan koin 100, 50, 10, 5, 1. Berapa koin tiap jenis dan berapa totalnya?
5. *Opsional:* **catatan pemakaian AI.** Bila memakai AI generatif, jawab nomor 1 sendiri dulu, lalu minta penjelasan atau petunjuk bertahap, bukan program jadi. Catat alatnya, tujuanmu, garis besar perintahmu, bagian yang kamu pakai, dan caramu memeriksanya (jalankan atau telusuri). Jangan menaruh data pribadi atau tugas bernilai pada perintah.

## Latihan bercampur

1. `AI: boleh` Dengan rekursi ambil-atau-lewati, hitung banyak subhimpunan `{1, 2, 3, 4}` berjumlah 5 (modul `a-xi1-m3`).
2. `AI: boleh` Pada pencarian lengkap koin, bagaimana pemangkasan "jumlah koin sementara sudah tidak lebih baik dari yang terbaik" bekerja (modul `a-xi1-m4`)?
3. `AI: tanpa AI` Tulis empat kasus uji tepi untuk fungsi tukar uang, dengan harapan yang kamu hitung dengan tangan (modul `a-xi1-m2`).

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `a-xi1-m6` (pertanyaan 1), sekitar tiga minggu lagi di `a-xi1-m8` (pertanyaan 2), dan sekitar delapan minggu lagi di `a-xi1-m13` (pertanyaan 3). Jawab sekarang lalu simpan.

1. Apa arti pilihan serakah, dan mengapa tidak ada percabangan seperti pada pencarian lengkap?
2. Mengapa greedy benar untuk koin yang tiap nilainya kelipatan nilai di bawahnya?
3. Bagaimana pencarian lengkap pada data kecil dipakai untuk menguji sebuah greedy?

## Kesalahan umum

- **Mengira greedy selalu benar.** Koin 4, 3, 1 untuk uang 6 adalah contoh tandingan.
- **Memeriksa greedy hanya dengan satu contoh yang lulus.** Contoh lulus tidak membuktikan kebenaran; carilah contoh tandingan.
- **Lupa koin harus terurut menurun.** Greedy mengambil koin terbesar dulu; urutan acak memberi hasil acak.
- **Mengira pilihan serakah boleh dibatalkan nanti.** Greedy tidak mundur; bila perlu mundur, itu bukan greedy.
- **Tidak menangani sisa.** Bila tak ada koin 1, sisa bisa tertinggal; program harus menyatakan "tidak bisa".

## Cek mandiri

- [ ] Saya dapat menjelaskan strategi greedy dengan kata-kata sendiri.
- [ ] Saya dapat menulis program tukar uang greedy.
- [ ] Saya dapat menyusun alasan sebuah greedy benar.
- [ ] Saya dapat membandingkan greedy dengan pencarian lengkap pada data kecil.
- [ ] Saya menyebut contoh tandingan ketika greedy salah.

## Kunci dan petunjuk

**Ingat kembali.** 1: bila cabang itu pasti tak menghasilkan jawaban baru, misalnya jumlah melewati batas dengan bilangan positif. 2: uji hanya mencoba data yang kamu pikirkan; cacat bisa ada di data lain. 3: ia menghitung ulang submasalah yang sama berkali-kali, sehingga pemanggilan berlipat.

**Prediksi dulu.** 1: `11 9` (94: satu koin 50, empat koin 10, empat koin 1). 2: 89.

**Contoh setengah jadi.** Isi: `koin[i]`, `%`, dan `banyak`. Program lengkap:

```cpp
#include <iostream>
using namespace std;

int main() {
  int koin[5] = {100, 50, 10, 5, 1};
  int uang = 41;
  int sisa = uang;
  int total = 0;
  int n = 5;
  for (int i = 0; i < n; i++) {
    int banyak = sisa / koin[i];
    sisa = sisa % koin[i];
    total += banyak;
  }
  cout << total << "\n";
}
```

Keluaran:

```text
5
```

**Soal Parsons.** Urutan benar: b, a, d, f, e, c.

**Latihan.** 1: gunakan program contoh; uang lebih kecil dari semua koin selain 1 menghasilkan semua koin 1. 2: dua koin 1 diganti satu koin 2 (lebih sedikit), dua koin 2 satu koin 4, dua koin 4 satu koin 8; maka solusi optimal memakai paling banyak satu koin 1, satu koin 2, dan satu koin 4, dan nilainya paling banyak 7 sehingga kurang dari 8; karena itu koin 8 terbesar yang muat harus ikut. 3: uang 8: greedy mengambil 5, lalu 2, sisa 1 yang tak bisa dibayar, sehingga menyatakan tidak bisa; padahal `2 + 2 + 2 + 2 = 8`. 4: 3 koin 100, 1 koin 50, 3 koin 10, 1 koin 5, 2 koin 1; total 10 koin.

**Latihan bercampur.** 1: `{1, 4}` dan `{2, 3}`, jadi 2. 2: bila banyak koin sementara sudah sama dengan atau lebih besar dari yang terbaik, cabang itu tak mungkin memperbaikinya, jadi dibuang. 3: misalnya uang 0 (0 koin), uang sama dengan satu koin (1 koin), uang 1 (1 koin), dan uang yang lebih kecil dari semua koin selain 1.

**Ulang berjarak.** 1: ambil pilihan terbaik menurut satu aturan dan tak pernah membatalkannya; karena tak ada yang dibatalkan, tak perlu mencoba cabang lain. 2: koin lebih kecil yang menjumlah ke nilai jenis berikutnya selalu dapat diganti satu koin, sehingga koin terbesar yang muat tidak merugikan. 3: tulis pencarian lengkap yang pasti benar, lalu bandingkan jawabannya dengan greedy pada banyak data kecil; satu selisih adalah contoh tandingan.

## Langkah berikutnya

Modul berikut: `a-xi1-m6` (greedy II), tempat kamu menguji kapan greedy benar atau salah. Modul terkait: `matkom-pertumbuhan-fungsi`. Bacaan lanjut: halaman cppreference tentang `std::vector`.
