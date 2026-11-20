## Untuk siapa modul ini

Modul ini untuk murid kelas XI jalur A (Algoritmik dengan C++), minggu `A-XI1-M3` silabus v1.4.1: pencarian lengkap (*complete search*); operasi bit dasar sebagai pengayaan. Prasyarat: modul `a-xi1-m2` dan `a-x2-m12` (efisiensi intuitif, notasi O-besar).

Modul ini karangan penyusun dan disetujui pemilik program pada 2026-11-20 (keputusan lewat dialog; catatan tinjauan menjadi tindak lanjut revisi). Butir `F-AP-a`, `F-AP-b`, dan `F-BK-b` dipetakan silabus sebagai dipenuhi jalur ini; pemenuhan butir mengikuti pemetaan silabus, bukan status modul. Keluarga materi OSN yang bertaut: `strategi-problem-solving` (pencarian lengkap ditandai pengayaan di jembatan silabus) dan `logika-bitwise` (operasi bit: pengayaan, bagian `Pengayaan (P)` yang boleh dilewati). Modul tidak menjanjikan kedalaman soal OSN dan tidak menggantikan pembinaan OSN.

Bila kamu pernah memakai Python: gagasannya sama dengan menulis perulangan atau rekursi yang mencoba semua pilihan. Tiap soal latihan bertanda `AI: boleh` atau `AI: tanpa AI`. Masukan program diberikan lewat berkas: `./program < masukan.txt`.

## Ingat kembali

Jawab dari ingatan dulu, baru cek di kunci. Soal 1 dari `a-xi1-m2`, soal 2 dari `a-x2-m11`, soal 3 dari `a-x2-m9`.

1. Sebutkan tiga jenis kasus uji tepi untuk fungsi yang mengolah larik.
2. Mengapa rekursi tanpa kasus dasar berbahaya, dan apa hubungannya dengan tumpukan pemanggilan?
3. Mengapa bubble sort boleh berhenti lebih awal bila satu putaran tidak menukar apa pun?

## Tujuan

Setelah modul ini kamu dapat:

- menjelaskan pencarian lengkap: mencoba semua kemungkinan dan memeriksa tiap kemungkinan;
- menulis rekursi yang mencoba dua pilihan (ambil atau lewati) untuk tiap elemen;
- memperkirakan banyak langkah pencarian lengkap dan menentukan batas `n` yang masih masuk akal;
- (pengayaan) memakai `&`, `|`, `^`, dan geser untuk mewakili subhimpunan dengan satu bilangan.

## Prediksi dulu

Ini tugas baca-dan-prediksi, `AI: tanpa AI`. **Tebak dulu, tulis jawabanmu, baru jalankan.** Fungsi menghitung banyak cara memilih elemen larik (boleh tidak satu pun) sehingga jumlahnya tepat `sisa`.

```cpp
#include <iostream>
#include <vector>
using namespace std;

int hitung(const vector<int>& a, int i, int sisa) {
  if (i == (int)a.size()) {
    return sisa == 0 ? 1 : 0;
  }
  return hitung(a, i + 1, sisa) + hitung(a, i + 1, sisa - a[i]);
}

int main() {
  vector<int> a = {2, 3, 5};
  cout << hitung(a, 0, 5) << " " << hitung(a, 0, 0) << "\n";
}
```

1. Apa yang tercetak?
2. Mengapa pemilihan "tidak satu pun elemen" ikut terhitung untuk sisa 0?

Simpan tebakanmu. Perbandingannya ada di bagian berikutnya.

## Contoh terselesaikan

Keluaran program tadi:

Keluaran:

```text
2 1
```

Ada dua cara menjumlah 5: `{5}` dan `{2, 3}`; untuk sisa 0 tepat satu cara, yaitu memilih tak satu pun. **Pencarian lengkap** berarti: bangkitkan setiap kemungkinan, periksa masing-masing, dan simpan yang memenuhi. Ia selalu benar karena tak ada kemungkinan yang terlewat; harganya adalah waktu. Untuk tiap elemen ada dua pilihan, ambil atau lewati, sehingga himpunan `n` elemen punya `2^n` subhimpunan. Program berikut membaca `n` (paling banyak 20), target, dan `n` bilangan positif, lalu mencetak semua subhimpunan berjumlah target beserta banyak pemanggilan fungsi.

```cpp
#include <iostream>
#include <vector>
using namespace std;

long long panggilan = 0;
int ditemukan = 0;

void cari(const vector<int>& a, int i, int sisa, vector<int>& terpilih) {
  panggilan++;
  if (i == (int)a.size()) {
    if (sisa == 0) {
      ditemukan++;
      cout << "{";
      for (int k = 0; k < (int)terpilih.size(); k++) {
        cout << (k > 0 ? " " : "") << terpilih[k];
      }
      cout << "}\n";
    }
    return;
  }
  cari(a, i + 1, sisa, terpilih);
  terpilih.push_back(a[i]);
  cari(a, i + 1, sisa - a[i], terpilih);
  terpilih.pop_back();
}

int main() {
  int n, target;
  cin >> n >> target;
  vector<int> a(n);
  for (int i = 0; i < n; i++) {
    cin >> a[i];
  }
  vector<int> terpilih;
  cari(a, 0, target, terpilih);
  cout << ditemukan << " subhimpunan, " << panggilan << " pemanggilan\n";
}
```

Masukan (`masukan.txt`):

```text
6 10
3 5 2 7 8 4
```

Keluaran:

```text
{2 8}
{3 7}
{3 5 2}
3 subhimpunan, 127 pemanggilan
```

Pohon pemanggilan punya `1 + 2 + 4 + ... + 2^6 = 127` simpul untuk `n = 6`, tepat seperti yang tercetak. Dalam notasi O-besar, pencarian lengkap ini `O(2^n)` pemanggilan (ditambah kerja mencetak). Tabelnya: `n = 20` sekitar satu juta pemanggilan (`2^20 = 1048576`), aman; `n = 30` sekitar satu miliar, jauh di luar pedoman seratus juta langkah per detik. Itulah mengapa soal pencarian lengkap membatasi `n` kecil. Bila yang dicari kombinasi berukuran tetap, perulangan bersarang lebih ringan: tiga bilangan berjumlah target cukup tiga perulangan `i < j < k`, yaitu `O(n^3)`, dengan banyak langkah `n(n-1)(n-2)/6`, yaitu 1140 untuk `n = 20`. Pegangan pencarian lengkap: pastikan **semua** kemungkinan dicoba sekali, dan hitung dulu banyaknya.

## Contoh setengah jadi

Lengkapi fungsi yang menghitung banyak subhimpunan berjumlah `sisa` dengan kasus dasar yang benar untuk larik kosong.

```cpp setengah-jadi
int hitung(const vector<int>& a, int i, int sisa) {
  if (i == ____) {
    return sisa == ____ ? 1 : 0;
  }
  return hitung(a, i + 1, sisa) + hitung(a, ____, sisa - a[i]);
}
```

## Soal Parsons

Susun delapan baris berikut (sudah diacak) menjadi fungsi tiga perulangan bersarang yang menghitung banyak tiga bilangan (indeks `i < j < k`) berjumlah `target`. `AI: tanpa AI`: tujuannya melatih membaca urutan.

```text
(a)       for (int k = j + 1; k < n; k++) {
(b)   int banyak = 0;
(c)         if (a[i] + a[j] + a[k] == target) banyak++;
(d)     for (int j = i + 1; j < n; j++) {
(e)   for (int i = 0; i < n; i++) {
(f)       }
(g)     }
(h)   }
```

## Latihan

1. `AI: boleh` **Subhimpunan.** Tulis pseudocode lalu program yang membaca `n` (paling banyak 15), target, dan `n` bilangan positif, lalu mencetak banyak subhimpunan berjumlah target. Uji dengan tiga kasus, termasuk tanpa jawaban dan target 0.
2. `AI: tanpa AI` **Telusuri.** Untuk `a = {1, 2}` dan target 2, gambar pohon pemanggilan `hitung`. Berapa pemanggilan, dan berapa subhimpunan yang cocok?
3. `AI: boleh` **Tiga bilangan.** Tulis program yang membaca `n` bilangan dan target, lalu mencetak banyak tiga bilangan (indeks `i < j < k`) yang berjumlah target. Berapa langkah untuk `n = 30`?
4. `AI: boleh` **Tepat k.** Ubah rekursi nomor 1 supaya hanya menghitung subhimpunan berukuran tepat `k`. Parameter apa yang perlu ditambahkan?
5. *Opsional:* **catatan pemakaian AI.** Bila memakai AI generatif, jawab nomor 1 sendiri dulu, lalu minta penjelasan atau petunjuk bertahap, bukan program jadi. Catat alatnya, tujuanmu, garis besar perintahmu, bagian yang kamu pakai, dan caramu memeriksanya (jalankan atau telusuri). Jangan menaruh data pribadi atau tugas bernilai pada perintah.

## Latihan bercampur

1. `AI: boleh` Tulis tiga kasus uji tepi untuk fungsi `hitung`: larik kosong, satu elemen, dan target yang mustahil (modul `a-xi1-m2`).
2. `AI: tanpa AI` Seberapa dalam rekursi `hitung` untuk `n` elemen, dan apa dampaknya pada tumpukan pemanggilan (modul `a-x2-m11`)?
3. `AI: boleh` Untuk `n = 30`, berapa kira-kira detik pencarian lengkap `2^(n+1)` pemanggilan pada pedoman seratus juta per detik, dan berapa bila `n = 25` (modul `a-x2-m12`)?

## Pengayaan (P)

Bagian ini boleh dilewati; ia bukan syarat modul berikutnya. Satu bilangan bulat dapat mewakili subhimpunan: bit ke-`k` bernilai 1 berarti elemen ke-`k` dipilih. Operator yang dipakai: `(m >> k) & 1` membaca bit ke-`k`; `m | (1 << k)` menyalakannya; `m ^ (1 << k)` membaliknya; dan `a ^= b; b ^= a; a ^= b;` menukar dua bilangan tanpa variabel bantu (hanya mekanisme; variabel bantu lebih mudah dibaca). Semua subhimpunan `n` elemen adalah bilangan `0` sampai `2^n - 1`.

```cpp
#include <iostream>
#include <vector>
using namespace std;

int main() {
  vector<int> a = {3, 5, 2, 7, 8, 4};
  int n = a.size();
  int target = 10;
  int ditemukan = 0;
  for (int mask = 0; mask < (1 << n); mask++) {
    int jumlah = 0;
    for (int k = 0; k < n; k++) {
      if ((mask >> k) & 1) {
        jumlah += a[k];
      }
    }
    if (jumlah == target) {
      ditemukan++;
    }
  }
  cout << ditemukan << " subhimpunan dari " << (1 << n) << " mask\n";
  int x = 5;
  int y = 9;
  x ^= y;
  y ^= x;
  x ^= y;
  cout << x << " " << y << "\n";
}
```

Keluaran:

```text
3 subhimpunan dari 64 mask
9 5
```

Hasilnya sama dengan rekursi, dengan `2^6 = 64` mask. Soal pengayaan, `AI: boleh`: tulis perulangan yang mencetak bit ke-0 sampai ke-7 bilangan 44 dari bit tertinggi ke terendah; nilainya harus `00101100`.

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `a-xi1-m4` (pertanyaan 1), sekitar tiga minggu lagi di `a-xi1-m6` (pertanyaan 2), dan sekitar delapan minggu lagi di `a-xi1-m11` (pertanyaan 3). Jawab sekarang lalu simpan.

1. Berapa banyak subhimpunan sebuah himpunan `n` elemen, dan mengapa?
2. Mengapa pencarian lengkap selalu menghasilkan jawaban benar, dan apa harganya?
3. Pada rekursi subhimpunan, apa dua pilihan di tiap elemen dan kapan rekursi berhenti?

## Kesalahan umum

- **Melewatkan kemungkinan.** Lupa kasus "tidak ambil" atau "larik kosong" membuat hitungan kurang satu.
- **Menghitung kemungkinan dua kali.** Subhimpunan `{2, 3}` dan `{3, 2}` sama; paksa urutan indeks menaik agar tiap himpunan muncul sekali.
- **Tidak memperkirakan banyak kemungkinan.** `2^30` sekitar satu miliar; mencoba tanpa menghitung dulu berujung program yang tak selesai.
- **Mengira pencarian lengkap selalu lambat.** Untuk `n` kecil ia sederhana, benar, dan cepat; ia juga pembanding yang baik bagi solusi cepat.
- **Lupa membatalkan pilihan.** Setelah memanggil rekursi dengan elemen terpilih, `pop_back` mengembalikan keadaan.

## Cek mandiri

- [ ] Saya dapat menjelaskan pencarian lengkap dan mengapa ia selalu benar.
- [ ] Saya dapat menulis rekursi ambil-atau-lewati untuk subhimpunan.
- [ ] Saya dapat memperkirakan banyak langkah dan memilih batas `n`.
- [ ] Saya dapat memakai pencarian lengkap sebagai pembanding uji.
- [ ] (Pengayaan) Saya dapat membaca bit ke-`k` dan menghitung subhimpunan dengan mask.

## Kunci dan petunjuk

**Ingat kembali.** 1: misalnya data satu elemen, nilai kembar, dan nilai di ujung. 2: tanpa kasus dasar, pemanggilan berjalan terus, tumpukan pemanggilan terus tumbuh sampai habis. 3: bila satu putaran tak menukar apa pun, data sudah terurut, jadi putaran lain sia-sia.

**Prediksi dulu.** 1: `2 1`. 2: kasus dasar `i == n` dengan `sisa == 0` terpenuhi juga saat tak satu pun diambil; jumlah himpunan kosong adalah 0.

**Contoh setengah jadi.** Isi: `(int)a.size()`, `0`, dan `i + 1`. Program lengkap:

```cpp
#include <iostream>
#include <vector>
using namespace std;

int hitung(const vector<int>& a, int i, int sisa) {
  if (i == (int)a.size()) {
    return sisa == 0 ? 1 : 0;
  }
  return hitung(a, i + 1, sisa) + hitung(a, i + 1, sisa - a[i]);
}

int main() {
  vector<int> a = {4, 6, 10};
  cout << hitung(a, 0, 10) << " " << hitung(a, 0, 20) << " " << hitung(a, 0, 3) << "\n";
}
```

Keluaran:

```text
2 1 0
```

**Soal Parsons.** Urutan benar: b, e, d, a, c, f, g, h. Tiga penutup `}` menutup `k`, `j`, dan `i`.

**Latihan.** 1: pakai fungsi pada contoh; kasus: `{1, 2, 3}` target 3 menghasilkan 2 (`{3}` dan `{1, 2}`), `{4, 5}` target 3 menghasilkan 0, target 0 selalu menghasilkan 1. 2: dua anak dari tiap simpul; `n = 2` memberi `1 + 2 + 4 = 7` pemanggilan; subhimpunan cocok: `{2}`, jadi satu. 3: tiga perulangan `i < j < k`; `n = 30` memberi `30 * 29 * 28 / 6 = 4060` langkah. 4: tambah parameter `sisaBanyak` yang berkurang tiap elemen diambil, dan kasus dasar menuntut `sisaBanyak == 0` selain `sisa == 0`.

**Latihan bercampur.** 1: larik kosong dengan target 0 memberi 1 dan target 5 memberi 0; satu elemen `{5}`: target 5 memberi 1, target 0 memberi 1; target mustahil, misalnya `{1, 2}` target 100, memberi 0. 2: kedalaman `n + 1` pemanggilan; tiap pemanggilan menyimpan satu bingkai di tumpukan, sehingga `n` kecil aman tetapi kedalaman sangat besar tidak. 3: `2^31` sekitar 2,1 miliar pemanggilan, sekitar 21 detik pada pedoman itu; `n = 25` memberi `2^26` sekitar 67 juta, di bawah satu detik.

**Pengayaan (P).** Bit 44 dari tertinggi: 0, 0, 1, 0, 1, 1, 0, 0. Program:

```cpp
#include <iostream>
using namespace std;

int main() {
  int x = 44;
  for (int k = 7; k >= 0; k--) {
    cout << ((x >> k) & 1);
  }
  cout << "\n";
}
```

Keluaran:

```text
00101100
```

**Ulang berjarak.** 1: `2^n`, karena tiap elemen punya dua pilihan, ambil atau lewati, dan pilihan itu bebas. 2: karena tak ada kemungkinan yang terlewat; harganya waktu yang tumbuh cepat. 3: ambil atau lewati elemen `i`; berhenti bila `i == n`, lalu memeriksa sisa.

## Langkah berikutnya

Modul berikut: `a-xi1-m4` (pencarian lengkap dan pemangkasan), tempat kamu membuang cabang yang pasti sia-sia. Modul terkait: `matkom-sistem-bilangan-basis` untuk bit dan basis dua, serta `matkom-pertumbuhan-fungsi`. Bacaan lanjut: halaman cppreference tentang operator aritmetika, yang memuat operator bit dan geser.
