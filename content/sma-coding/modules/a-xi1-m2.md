## Untuk siapa modul ini

Modul ini untuk murid kelas XI jalur A (Algoritmik dengan C++), minggu `A-XI1-M2` silabus v1.4.1: kualitas kode dan pengujian. Prasyarat: modul `a-xi1-m1` (proses rekayasa program). Kamu akan menulis kasus uji dan menjaga agar kodemu mudah dibaca dan diubah.

Modul ini berstatus DRAF: karangan penyusun, belum ditinjau pemilik. Butir `F-AP-c` dan `F-BK-a` dipetakan silabus sebagai dipenuhi jalur ini; modul draf ini belum dihitung sebagai pemenuhan. Tidak ada keluarga materi OSN yang dipetakan untuk minggu ini.

Bila kamu pernah memakai Python: pengujian di sini sama gagasannya dengan menulis beberapa pemanggilan fungsi dan membandingkan hasilnya, hanya tanpa pustaka tambahan. Tiap soal latihan bertanda `AI: boleh` atau `AI: tanpa AI`. Masukan program diberikan lewat berkas: `./program < masukan.txt`.

## Ingat kembali

Jawab dari ingatan dulu, baru cek di kunci. Soal 1 dari `a-xi1-m1`, soal 2 dari `a-x2-m13`, soal 3 dari `a-x2-m8`.

1. Sebutkan empat tahap proses rekayasa program dan satu keluaran tiap tahap.
2. Sebutkan tiga uji batas untuk program yang mengelola tabel data.
3. Kira-kira berapa langkah pencarian biner untuk 1000 data, dibanding pencarian sekuensial pada kasus terburuk?

## Tujuan

Setelah modul ini kamu dapat:

- menulis kasus uji yang mencakup data biasa, data batas, dan data yang memancing cacat;
- menjalankan kasus uji secara otomatis dan membaca laporan lulus atau gagal;
- membandingkan fungsi cepat dengan pemeriksaan sifat atau cara sederhana pada banyak data kecil;
- memperbaiki kode agar mudah dibaca: nama jelas, fungsi kecil, tanpa angka ajaib.

## Prediksi dulu

Ini tugas baca-dan-prediksi, `AI: tanpa AI`. **Tebak dulu, tulis jawabanmu, baru jalankan.** Fungsi ini seharusnya mengembalikan nilai terbesar sebuah larik.

```cpp
#include <iostream>
#include <vector>
using namespace std;

int terbesar(const vector<int>& v) {
  int hasil = 0;
  for (int i = 0; i < (int)v.size(); i++) {
    if (v[i] > hasil) {
      hasil = v[i];
    }
  }
  return hasil;
}

int main() {
  vector<int> a = {3, 8, 1};
  vector<int> b = {-5, -2, -9};
  cout << terbesar(a) << " " << terbesar(b) << "\n";
}
```

1. Apa yang tercetak?
2. Bila fungsi ini kamu uji hanya dengan `a`, apakah cacatnya ketahuan? Data macam apa yang memancingnya?

Simpan tebakanmu. Perbandingannya ada di bagian berikutnya.

## Contoh terselesaikan

Keluaran program tadi:

Keluaran:

```text
8 0
```

Untuk `b`, nilai terbesar sebenarnya `-2`, tetapi fungsi mencetak 0: `hasil` dimulai dari 0, dan tak satu pun elemen negatif melampauinya. Dengan data `a` fungsi tampak benar. Pelajarannya: **satu contoh yang lulus tidak membuktikan program benar**; yang kamu cari adalah data yang memancing kegagalan. Daftar kasus uji yang baik untuk fungsi larik: data biasa; satu elemen; semua elemen sama; terbesar di awal, tengah, dan akhir; elemen negatif; elemen nol. Program berikut menjalankan kasus-kasus itu otomatis. Fungsi `uji` membandingkan hasil dengan harapan yang kamu hitung dengan tangan lebih dulu, lalu mencetak `LULUS` atau `GAGAL`.

```cpp
#include <iostream>
#include <string>
#include <vector>
using namespace std;

int terbesar(const vector<int>& v) {
  int hasil = 0;
  for (int i = 0; i < (int)v.size(); i++) {
    if (v[i] > hasil) {
      hasil = v[i];
    }
  }
  return hasil;
}

int lulus = 0;
int total = 0;

void uji(const string& nama, const vector<int>& data, int harapan) {
  int hasil = terbesar(data);
  total++;
  if (hasil == harapan) {
    lulus++;
    cout << "LULUS " << nama << "\n";
  } else {
    cout << "GAGAL " << nama << ": hasil " << hasil << ", harapan " << harapan << "\n";
  }
}

int main() {
  uji("biasa", {3, 8, 1}, 8);
  uji("satu elemen", {7}, 7);
  uji("semua sama", {4, 4, 4}, 4);
  uji("satu negatif", {-5}, -5);
  uji("semua negatif", {-5, -2, -9}, -2);
  uji("ada nol", {-1, 0, -3}, 0);
  cout << lulus << " dari " << total << " lulus\n";
}
```

Keluaran:

```text
LULUS biasa
LULUS satu elemen
LULUS semua sama
GAGAL satu negatif: hasil 0, harapan -5
GAGAL semua negatif: hasil 0, harapan -2
LULUS ada nol
4 dari 6 lulus
```

Dua kasus gagal, dan keduanya melibatkan bilangan negatif. Perbaikannya satu baris: mulai dari elemen pertama, bukan dari 0 (spesifikasi menjamin ada paling sedikit satu elemen).

```text
int hasil = v[0];
```

Kasus uji tulisan tangan terbatas oleh imajinasimu. Cara kedua: periksa **sifat** hasil pada banyak data kecil sekaligus. Sifat nilai terbesar: hasilnya ada di data, dan tak ada elemen yang lebih besar darinya. Program berikut membangkitkan semua larik panjang 1 sampai 3 dengan nilai -2 sampai 2, yaitu `5 + 25 + 125 = 155` larik, dan memeriksa dua versi fungsi. Seluruhnya hanya sekitar 430 elemen per versi untuk pembangkitan dan 430 lagi untuk pemeriksaan: kecil, karena data ujinya kecil.

```cpp
#include <iostream>
#include <vector>
using namespace std;

int terbesarSalah(const vector<int>& v) {
  int hasil = 0;
  for (int i = 0; i < (int)v.size(); i++) {
    if (v[i] > hasil) {
      hasil = v[i];
    }
  }
  return hasil;
}

int terbesarBenar(const vector<int>& v) {
  int hasil = v[0];
  for (int i = 1; i < (int)v.size(); i++) {
    if (v[i] > hasil) {
      hasil = v[i];
    }
  }
  return hasil;
}

bool sifatTerpenuhi(const vector<int>& v, int hasil) {
  bool ada = false;
  for (int i = 0; i < (int)v.size(); i++) {
    if (v[i] == hasil) {
      ada = true;
    }
    if (v[i] > hasil) {
      return false;
    }
  }
  return ada;
}

int main() {
  int gagalSalah = 0;
  int gagalBenar = 0;
  int banyak = 0;
  for (int panjang = 1; panjang <= 3; panjang++) {
    int semua = 1;
    for (int k = 0; k < panjang; k++) {
      semua *= 5;
    }
    for (int kode = 0; kode < semua; kode++) {
      vector<int> v(panjang);
      int sisa = kode;
      for (int k = 0; k < panjang; k++) {
        v[k] = sisa % 5 - 2;
        sisa /= 5;
      }
      banyak++;
      if (!sifatTerpenuhi(v, terbesarSalah(v))) {
        gagalSalah++;
      }
      if (!sifatTerpenuhi(v, terbesarBenar(v))) {
        gagalBenar++;
      }
    }
  }
  cout << banyak << " larik, gagal versi salah " << gagalSalah << ", gagal versi benar " << gagalBenar << "\n";
}
```

Keluaran:

```text
155 larik, gagal versi salah 14, gagal versi benar 0
```

Versi benar lolos semua larik kecil itu; versi salah gagal pada larik yang seluruh elemennya negatif. Ini tidak membuktikan kebenaran untuk semua masukan, tetapi menutup banyak celah dengan murah. Dalam notasi O-besar, tiap pemeriksaan `O(n)` pada larik `n` elemen.

Kualitas kode adalah separuh lain modul ini. Kode yang diuji akan kamu baca berkali-kali, jadi: beri nama yang menyatakan isi (`banyakLulus`, bukan `f2`); satu fungsi satu tugas; ganti angka ajaib dengan nama (`BATAS_LULUS`, bukan `60` di tiga tempat); tulis komentar untuk **mengapa**, bukan untuk apa yang sudah jelas dari kode; indentasi seragam; dan kompilasi dengan `-Wall -Wextra -Werror` sehingga peringatan dianggap galat. Hari ini kamu memakai perintah `g++ -std=c++17 -Wall -Wextra -Werror program.cpp -o program`. Untuk berkas uji: simpan masukan di `uji1.in` dan keluaran harapan di `uji1.harap`, lalu bandingkan keluaran program dengan `diff`.

```text
./program < uji1.in > uji1.out
diff uji1.out uji1.harap
```

## Contoh setengah jadi

Lengkapi fungsi `terkecil` yang benar untuk data negatif, lalu uji.

```cpp setengah-jadi
int terkecil(const vector<int>& v) {
  int hasil = ____;
  for (int i = 1; i < (int)v.size(); i++) {
    if (v[i] ____ hasil) {
      hasil = v[i];
    }
  }
  return hasil;
}
```

## Soal Parsons

Susun delapan baris berikut (sudah diacak) menjadi fungsi `uji` yang mencetak `LULUS` atau `GAGAL`. `AI: tanpa AI`: tujuannya melatih membaca urutan.

```text
(a)   if (hasil == harapan) {
(b)   int hasil = terbesar(data);
(c)     cout << "GAGAL\n";
(d) void uji(const vector<int>& data, int harapan) {
(e)   } else {
(f)     cout << "LULUS\n";
(g)   }
(h) }
```

## Latihan

1. `AI: boleh` **Uji `terkecil`.** Tulis fungsi `terkecil` yang benar, lalu tulis enam kasus uji dengan harapan yang kamu hitung dengan tangan, dan jalankan dengan fungsi `uji` seperti di contoh.
2. `AI: tanpa AI` **Berkas uji tepi.** Untuk program rekap skor di `a-xi1-m1`, tulis empat berkas masukan dan keluaran harapannya yang menyentuh batas: `n = 1`, skor tepat 60, semua skor 0, dan semua skor 100. Hitung keluaran harapannya dengan tangan.
3. `AI: boleh` **Cari cacat.** Fungsi berikut seharusnya menghitung banyak bilangan genap di larik. Tulis dua kasus uji yang memperlihatkan cacatnya, lalu perbaiki.
4. `AI: tanpa AI` **Sifat tanpa jawaban.** Kamu tidak tahu jawaban benar sebuah fungsi `urutkan`. Sebutkan dua sifat hasilnya yang dapat kamu periksa tanpa menyelesaikan masalahnya sendiri.
5. *Opsional:* **catatan pemakaian AI.** Bila memakai AI generatif, jawab nomor 1 sendiri dulu, lalu minta penjelasan atau petunjuk bertahap, bukan program jadi. Catat alatnya, tujuanmu, garis besar perintahmu, bagian yang kamu pakai, dan caramu memeriksanya (jalankan atau telusuri). Jangan menaruh data pribadi atau tugas bernilai pada perintah.

Fungsi untuk nomor 3:

```cpp
#include <vector>
using namespace std;

int banyakGenap(const vector<int>& v) {
  int banyak = 0;
  for (int i = 0; i < (int)v.size(); i++) {
    if (i % 2 == 0) {
      banyak++;
    }
  }
  return banyak;
}
```

## Latihan bercampur

1. `AI: boleh` Tulis lima kasus uji tepi untuk pencarian biner yang mengembalikan indeks atau -1: data satu elemen, nilai di ujung kiri, nilai di ujung kanan, nilai lebih kecil dari semua, dan nilai lebih besar dari semua (modul `a-x2-m8`).
2. `AI: boleh` Sebutkan dua sifat yang harus dipenuhi hasil insertion sort, dan satu larik kecil yang memancing cacat bila elemen yang disisipkan tidak disimpan dulu (modul `a-x2-m10`).
3. `AI: tanpa AI` Cacat "program mencetak 7, padahal 7,67" ditemukan saat uji. Di tahap mana ia diperbaiki, dan kasus uji apa yang kamu tambahkan agar tidak muncul lagi (modul `a-xi1-m1`)?

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `a-xi1-m3` (pertanyaan 1), sekitar tiga minggu lagi di `a-xi1-m5` (pertanyaan 2), dan sekitar delapan minggu lagi di `a-xi1-m10` (pertanyaan 3). Jawab sekarang lalu simpan.

1. Sebutkan tiga jenis kasus uji tepi untuk fungsi yang mengolah larik.
2. Mengapa kasus uji yang semuanya lulus tidak membuktikan bahwa program benar?
3. Mengapa fungsi kecil dengan satu tugas lebih mudah diuji daripada satu fungsi panjang?

## Kesalahan umum

- **Menguji hanya dengan data dari soal.** Contoh soal biasanya data biasa; cacat tinggal di data batas.
- **Menghitung harapan dari keluaran program.** Bila harapan diambil dari program yang diuji, cacatnya ikut tersalin; hitung dengan tangan lebih dulu.
- **Mengira semua lulus berarti benar.** Kasus uji hanya menunjukkan ada atau tidak adanya kegagalan pada data yang dicoba.
- **Mengabaikan peringatan kompilator.** Peringatan sering menunjuk cacat nyata, misalnya perbandingan bilangan bertanda dengan tak bertanda.
- **Angka ajaib dan nama pendek.** `60` yang tersebar di banyak tempat sulit diubah serentak, dan `f2` tidak memberi tahu apa isinya.

## Cek mandiri

- [ ] Saya dapat menulis kasus uji biasa, batas, dan pemancing cacat.
- [ ] Saya dapat menjalankan uji secara otomatis dan membaca laporannya.
- [ ] Saya dapat memeriksa sifat hasil pada banyak data kecil.
- [ ] Saya menghitung keluaran harapan dengan tangan, bukan dari program.
- [ ] Saya mengompilasi dengan `-Wall -Wextra -Werror` dan memperbaiki setiap peringatan.

## Kunci dan petunjuk

**Ingat kembali.** 1: spesifikasi, rancangan, implementasi, uji, masing-masing dengan keluarannya. 2: misalnya tabel kosong atau satu baris, nilai kembar, dan nilai di ujung urutan. 3: sekitar 10 langkah untuk biner (`2^10 = 1024`), sampai 1000 untuk sekuensial.

**Prediksi dulu.** 1: `8 0`. 2: tidak ketahuan; data yang memancingnya adalah larik yang seluruhnya negatif.

**Contoh setengah jadi.** Isi: `v[0]` dan `<`. Program lengkap beserta ujinya:

```cpp
#include <iostream>
#include <vector>
using namespace std;

int terkecil(const vector<int>& v) {
  int hasil = v[0];
  for (int i = 1; i < (int)v.size(); i++) {
    if (v[i] < hasil) {
      hasil = v[i];
    }
  }
  return hasil;
}

int main() {
  vector<int> a = {3, 8, 1};
  vector<int> b = {-5, -2, -9};
  cout << terkecil(a) << " " << terkecil(b) << "\n";
}
```

Keluaran:

```text
1 -9
```

**Soal Parsons.** Urutan benar: d, b, a, f, e, c, g, h.

**Latihan.** 1: kasus yang baik: biasa, satu elemen, semua sama, semua negatif, ada nol, terkecil di akhir. 2: `n = 1` dengan skor 60: jumlah 60, rata-rata 60,00, tertinggi 60, terendah 60, lulus 1; semua 0 (misalnya `n = 3`): jumlah 0, rata-rata 0,00, tertinggi 0, terendah 0, lulus 0; semua 100 (misalnya `n = 2`): jumlah 200, rata-rata 100,00, tertinggi 100, terendah 100, lulus 2. 3: fungsi menghitung banyak indeks genap, bukan elemen genap. Kasus uji: `{1, 3, 5}` seharusnya 0 tetapi fungsi menghasilkan 2; `{2}` memberi 1 (kebetulan benar). Perbaikan: `if (v[i] % 2 == 0)`. 4: hasil terurut menaik (tiap elemen tidak lebih besar dari sesudahnya), dan hasil memuat elemen yang sama dengan data awal (misalnya jumlah dan banyak elemennya sama).

**Latihan bercampur.** 1: `{9}` mencari 9 (indeks 0) dan 4 (-1); `{2, 5, 8}` mencari 2 (indeks 0); mencari 8 (indeks 2); mencari 1 (-1); mencari 9 (-1). 2: hasil terurut dan merupakan permutasi data awal; `{3, 1}` salah bila elemen yang disisipkan tertimpa saat menggeser. 3: di rancangan (tipe `double`); tambahkan kasus uji dengan jumlah yang tidak habis dibagi `n`, mis. skor 72, 73, 74, 74.

**Ulang berjarak.** 1: data satu elemen, nilai kembar atau semua sama, dan nilai di ujung (terbesar atau terkecil di awal atau akhir). 2: uji hanya mencoba data yang kamu pikirkan; cacat bisa ada di data yang tak terpikir. 3: tiap fungsi dapat diuji sendiri dengan data kecil, dan bila uji gagal, penyebabnya terbatas pada beberapa baris.

## Langkah berikutnya

Modul berikut: `a-xi1-m3` (pencarian lengkap), tempat kasus uji kecil dan pembanding berguna untuk memastikan program mencoba semua kemungkinan. Modul terkait: `matkom-pertumbuhan-fungsi`. Bacaan lanjut: halaman GCC tentang pilihan peringatan, dan halaman cppreference `std::numeric_limits` yang memuat batas tipe bilangan, sumber nilai awal alternatif bagi pencarian nilai terbesar.
