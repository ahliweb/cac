## Untuk siapa modul ini

Modul ini untuk murid kelas XII jalur A (Algoritmik dengan C++), minggu `A-XII2-M1` silabus v1.4.1: pemeliharaan program I, yaitu memperbaiki dan merapikan solusi lama. Prasyarat: modul `a-xii1-m12` (program multi-berkas) dan `a-xi1-m2` (kualitas kode dan pengujian).

Modul ini berstatus DRAF: karangan penyusun, belum ditinjau pemilik. Butir `F-AP-c` dipetakan silabus sebagai dipenuhi jalur ini; modul draf ini belum dihitung sebagai pemenuhan. Silabus tidak memetakan keluarga materi OSN untuk minggu ini.

Bahan kerjamu adalah dua solusi yang pernah kamu tulis di semester lalu; siapkan keduanya sebelum mulai. Tiap soal latihan bertanda `AI: boleh` atau `AI: tanpa AI`. Masukan program diberikan lewat berkas: `./program < masukan.txt`. Semua data karangan.

## Ingat kembali

Jawab dari ingatan dulu, baru cek di kunci. Soal 1 dari `a-xii1-m14`, soal 2 dari `a-xii1-m12`, soal 3 dari `a-xii1-m7`.

1. Mengapa algoritma Dijkstra tidak boleh dipakai bila ada sisi berbobot negatif?
2. Apa fungsi penjaga `#ifndef` pada header?
3. Mengapa tabel Pascal lebih aman dari luapan daripada menghitung `n! / (k! * (n - k)!)`?

## Tujuan

Setelah modul ini kamu dapat:

- membedakan refaktor (mengubah susunan kode tanpa mengubah perilakunya) dari memperbaiki galat;
- merekam perilaku program lama sebagai uji pegangan sebelum mengubahnya;
- mengenali bau kode seperti nama tak jelas, angka ajaib, variabel global, dan salinan kode;
- merapikan program lama dengan langkah kecil dan membuktikan keluarannya tetap sama (keluaran minggu ini: daftar perbaikan).

## Prediksi dulu

Ini tugas baca-dan-prediksi, `AI: tanpa AI`. **Tebak dulu, tulis jawabanmu, baru jalankan.** Fungsi `jumlah` memakai variabel global `total` tanpa menyetelnya ulang.

```cpp
#include <iostream>
using namespace std;

int total = 0;

int jumlah(int a[], int n) {
  for (int i = 0; i < n; i++) {
    total += a[i];
  }
  return total;
}

int main() {
  int a[3] = {1, 2, 3};
  cout << jumlah(a, 3) << " " << jumlah(a, 3) << "\n";
}
```

1. Apa yang tercetak?
2. Mengapa fungsi seperti ini sulit dipelihara?

## Contoh terselesaikan

Keluaran program tadi:

```text
6 12
```

Pemanggilan kedua memberi 12 karena `total` tersisa dari pemanggilan pertama. Fungsi yang bergantung pada keadaan di luarnya sulit diuji dan sulit diubah: hasilnya bergantung pada riwayat pemanggilan.

**Aturan emas refaktor: rekam perilaku dulu, ubah sedikit-sedikit, jalankan ulang tiap kali.** Berikut solusi lama karangan: membaca `n` porsi makanan lalu mencetak jumlah porsi genap, banyak porsi bernilai 1, panjang deret nilai sama terpanjang, dan porsi terbesar. Ia benar, tetapi bernama `x y z t w`, memakai variabel global, dan tak punya fungsi.

```cpp
#include <iostream>
using namespace std;

int a[100], n, x, y, z, t, w;

int main() {
  cin >> n;
  for (int i = 0; i < n; i++) {
    cin >> a[i];
  }
  x = 0;
  for (int i = 0; i < n; i++) {
    if (a[i] % 2 == 0) {
      x += a[i];
    }
  }
  y = 0;
  for (int i = 0; i < n; i++) {
    if (a[i] == 1) {
      y++;
    }
  }
  z = 1;
  t = 1;
  for (int i = 1; i < n; i++) {
    if (a[i] == a[i - 1]) {
      t++;
    } else {
      t = 1;
    }
    if (t > z) {
      z = t;
    }
  }
  w = a[0];
  for (int i = 1; i < n; i++) {
    if (a[i] > w) {
      w = a[i];
    }
  }
  cout << "genap " << x << "\n";
  cout << "satu " << y << "\n";
  cout << "run " << z << "\n";
  cout << "maks " << w << "\n";
}
```

Masukan (`masukan1.txt`):

```text
8
3 2 2 2 1 1 4 1
```

Keluaran:

```text
genap 10
satu 3
run 3
maks 4
```

Langkah pertama bukan mengetik ulang, melainkan **merekam**: simpan keluaran ini, dan buat dua masukan lagi untuk ukuran terkecil (`masukan2.txt`: satu porsi bernilai 5) dan semua nilai sama (`masukan3.txt`: lima porsi bernilai 7). Ketiga keluaran lama adalah uji pegangan: sesudah refaktor, keluaran baru harus sama persis. Uji seperti ini disebut uji karakterisasi, sebab ia mencatat apa yang dilakukan program, bukan apa yang seharusnya.

Langkah kedua: satu bau, satu perubahan. Di sini angka ajaib dan nama diperbaiki, lalu tiap pekerjaan dipindah ke fungsi bernama jelas yang menerima data lewat parameter, bukan lewat global.

```cpp
#include <algorithm>
#include <iostream>
#include <vector>
using namespace std;

int jumlahGenap(const vector<int>& porsi) {
  int jumlah = 0;
  for (int p : porsi) {
    if (p % 2 == 0) {
      jumlah += p;
    }
  }
  return jumlah;
}

int banyakNilai(const vector<int>& porsi, int nilai) {
  return static_cast<int>(count(porsi.begin(), porsi.end(), nilai));
}

int runTerpanjang(const vector<int>& porsi) {
  int terpanjang = 1;
  int saatIni = 1;
  for (size_t i = 1; i < porsi.size(); i++) {
    saatIni = (porsi[i] == porsi[i - 1]) ? saatIni + 1 : 1;
    terpanjang = max(terpanjang, saatIni);
  }
  return terpanjang;
}

int main() {
  int n;
  cin >> n;
  vector<int> porsi(n);
  for (int& p : porsi) {
    cin >> p;
  }
  cout << "genap " << jumlahGenap(porsi) << "\n";
  cout << "satu " << banyakNilai(porsi, 1) << "\n";
  cout << "run " << runTerpanjang(porsi) << "\n";
  cout << "maks " << *max_element(porsi.begin(), porsi.end()) << "\n";
}
```

Masukan (`masukan1.txt`):

```text
8
3 2 2 2 1 1 4 1
```

Keluaran:

```text
genap 10
satu 3
run 3
maks 4
```

Sesudah tiap perubahan, jalankan pembanding untuk ketiga masukan:

```bash
g++ -std=c++17 -Wall -Wextra -Werror -o lama lama.cpp
g++ -std=c++17 -Wall -Wextra -Werror -o baru baru.cpp
for i in 1 2 3; do ./lama < masukan$i.txt > a.txt; ./baru < masukan$i.txt > b.txt; cmp a.txt b.txt && echo "masukan$i sama"; done
```

Keluaran yang saya dapat saat menjalankannya:

```text
masukan1 sama
masukan2 sama
masukan3 sama
```

Perkiraan langkah untuk `n = 8`: membaca 8, lalu empat penelusuran 8, 8, 7, dan 7 putaran, sekitar 38 langkah. Versi baru melakukan hal yang sama, jadi refaktor tidak mengubah pertumbuhannya: keduanya `O(n)`. Refaktor mengubah keterbacaan, bukan kecepatan, dan memeriksa itu sama pentingnya dengan memeriksa keluaran.

Perhatikan satu hal yang sengaja **tidak** diubah: untuk `n = 0` kedua versi sama-sama salah (membaca `a[0]` atau `*max_element` pada larik kosong). Memperbaikinya mengubah perilaku, jadi itu pekerjaan terpisah dan dicatat sebagai galat, bukan sebagai refaktor.

## Contoh setengah jadi

Lengkapi fungsi `runTerpanjang` agar sama dengan di atas. Kuncinya ada di `Kunci dan petunjuk`.

```cpp setengah-jadi
int runTerpanjang(const vector<int>& porsi) {
  int terpanjang = ____;
  int saatIni = 1;
  for (size_t i = 1; i < porsi.size(); i++) {
    saatIni = (porsi[i] == porsi[____]) ? saatIni + ____ : 1;
    terpanjang = max(terpanjang, ____);
  }
  return terpanjang;
}
```

## Soal Parsons

Susun tujuh baris berikut (sudah diacak, tanpa lekuk) menjadi isi fungsi `jumlahGenap`. `AI: tanpa AI`: tujuannya melatih membaca urutan.

```text
(a) }
(b) jumlah += p;
(c) return jumlah;
(d) if (p % 2 == 0) {
(e) int jumlah = 0;
(f) }
(g) for (int p : porsi) {
```

## Latihan

1. `AI: boleh` **Dua solusi lamamu.** Pilih dua solusi dari semester lalu. Untuk tiap solusi: jalankan dengan minimal tiga masukan (biasa, terkecil, batas) dan simpan keluarannya; tulis daftar perbaikan (nama, angka ajaib, fungsi panjang, salinan kode, variabel global); ubah satu butir, jalankan ulang, baru lanjut. Keluaranmu: daftar perbaikan dan bukti keluaran tetap sama.
2. `AI: tanpa AI` **Cium baunya.** Baca fungsi `f` di bawah dan sebut tiga bau kode di dalamnya.
3. `AI: tanpa AI` **Rapikan.** Tulis ulang `f` menjadi dua fungsi bernama jelas dan satu konstanta, dengan perilaku sama untuk semua masukan.
4. `AI: boleh` **Pembanding otomatis.** Tulis skrip `bash` yang mengompilasi dua versi, menjalankannya pada semua berkas `masukan*.txt`, dan mencetak `sama` atau `BEDA` per berkas.
5. *Opsional:* **catatan pemakaian AI.** Bila memakai AI generatif, kerjakan nomor 2 sendiri dulu, lalu minta penjelasan atau petunjuk bertahap, bukan program jadi. Catat alatnya, tujuanmu, garis besar perintahmu, bagian yang kamu pakai, dan caramu memeriksanya. Jangan menaruh data pribadi atau tugas bernilai pada perintah.

```cpp
#include <vector>
using namespace std;

int f(vector<int> v, int k) {
  int c = 0;
  for (int i = 0; i < (int)v.size(); i++) {
    if (v[i] % k == 0) {
      c = c + 1;
    }
  }
  int d = 0;
  for (int i = 0; i < (int)v.size(); i++) {
    if (v[i] > 100) {
      d = d + 1;
    }
  }
  return c * 1000 + d;
}
```

## Latihan bercampur

1. `AI: boleh` Mengganti `int` menjadi `long long` pada solusi lama membuat hasil untuk masukan besar benar. Mengapa itu bukan refaktor murni, dan bagaimana mencatatnya di daftar perbaikan (modul `a-xii1-m8`)?
2. `AI: tanpa AI` Saat memecah solusi menjadi `.h` dan `.cpp`, bagian mana yang boleh pindah ke header, dan apa yang terjadi bila definisi biasa ikut pindah (modul `a-xii1-m12`)?
3. `AI: boleh` Untuk `n = 0`, mengapa daftar perbaikan memisahkan "refaktor" dari "perbaikan galat", dan di urutan mana keduanya dikerjakan (modul `a-xi1-m2`)?

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `a-xii2-m2` (pertanyaan 1), sekitar tiga minggu lagi di `a-xii2-m4` (pertanyaan 2), dan sekitar delapan minggu lagi di `a-xii2-m9` (pertanyaan 3). Jawab sekarang lalu simpan.

1. Mengapa refaktor harus didahului uji yang merekam keluaran program lama?
2. Sebutkan tiga bau kode dan satu perbaikan untuk masing-masing.
3. Apa beda refaktor dan memperbaiki galat?

## Kesalahan umum

- **Merefaktor tanpa uji pegangan.** Tanpa rekaman keluaran lama, kamu tak tahu apakah perilaku berubah.
- **Mengubah banyak hal sekaligus.** Bila keluaran berubah, kamu tak tahu perubahan mana penyebabnya; ubah satu butir, jalankan ulang.
- **Mencampur refaktor dengan perbaikan galat.** Keluaran berbeda dan kamu tak tahu apakah itu perbaikan atau kerusakan.
- **Menghapus kode yang "tampak tak terpakai".** Periksa dulu dengan pencarian dan uji; kompilator hanya memberi peringatan untuk sebagian kasus.
- **Mengira kode yang jalan tak perlu dirapikan.** Biaya terbesar kode ada pada membacanya kembali dan mengubahnya.

## Cek mandiri

- [ ] Saya dapat menyebut beda refaktor dan memperbaiki galat.
- [ ] Saya dapat merekam keluaran program lama untuk beberapa masukan sebagai uji pegangan.
- [ ] Saya dapat menyebut tiga bau kode dan cara memperbaikinya.
- [ ] Saya dapat membandingkan keluaran lama dan baru dengan `cmp` atau `diff`.
- [ ] Saya menulis daftar perbaikan yang menyebut apa yang diubah dan bukti perilakunya sama.

## Kunci dan petunjuk

**Ingat kembali.** 1: Dijkstra menetapkan jarak simpul terdekat sebagai final dengan anggapan tak ada jalur lain yang lebih pendek lewat simpul yang belum ditetapkan; sisi negatif bisa memperpendek jalur sesudahnya, sehingga anggapan itu runtuh. 2: penjaga mencegah isi header terbaca dua kali dalam satu berkas sumber, sehingga definisi (misalnya struktur) tidak ganda. 3: tabel Pascal hanya menjumlahkan nilai yang tak melebihi hasil akhir; `n!` meluap lebih dulu (`20!` masih muat di `long long`, `21!` meluap) walaupun `C(n, k)` masih kecil.

**Prediksi dulu.** 1: `6 12`. 2: hasilnya bergantung pada berapa kali fungsi dipanggil sebelumnya; fungsi tak bisa diuji sendirian dan mengubah satu bagian dapat merusak bagian lain lewat `total`.

**Contoh setengah jadi.** Isi: `1`, `i - 1`, `1`, dan `saatIni`. Program lengkapnya:

```cpp
#include <algorithm>
#include <iostream>
#include <vector>
using namespace std;

int runTerpanjang(const vector<int>& porsi) {
  int terpanjang = 1;
  int saatIni = 1;
  for (size_t i = 1; i < porsi.size(); i++) {
    saatIni = (porsi[i] == porsi[i - 1]) ? saatIni + 1 : 1;
    terpanjang = max(terpanjang, saatIni);
  }
  return terpanjang;
}

int main() {
  cout << runTerpanjang({3, 2, 2, 2, 1, 1, 4, 1}) << " " << runTerpanjang({5}) << " " << runTerpanjang({7, 7, 7, 7, 7}) << "\n";
}
```

Keluaran:

```text
3 1 5
```

Ketiganya sama dengan baris `run` pada tiga masukan tadi.

**Soal Parsons.** Urutan: e, g, d, b, a, f, c. Baris e menyiapkan penampung, g membuka perulangan, d membuka `if`, b menambah, a menutup `if`, f menutup perulangan, c mengembalikan hasil.

**Latihan.** 1: daftar perbaikan yang baik menyebut tiap butir beserta uji yang membuktikannya; periksa bahwa tiap keluaran lama masih sama persis. 2: tiga bau: nama `f`, `c`, `d`, dan `v` tak bermakna; angka ajaib `100` dan `1000`; dua perulangan hampir kembar; `vector` dioper per salinan, bukan per rujukan konstan. 3: salah satu bentuk:

```cpp
#include <iostream>
#include <vector>
using namespace std;

const int AMBANG_BESAR = 100;
const int PENGALI = 1000;

int banyakKelipatan(const vector<int>& nilai, int k) {
  int banyak = 0;
  for (int x : nilai) {
    if (x % k == 0) {
      banyak++;
    }
  }
  return banyak;
}

int banyakBesar(const vector<int>& nilai) {
  int banyak = 0;
  for (int x : nilai) {
    if (x > AMBANG_BESAR) {
      banyak++;
    }
  }
  return banyak;
}

int f(const vector<int>& v, int k) {
  return banyakKelipatan(v, k) * PENGALI + banyakBesar(v);
}

int main() {
  cout << f({5, 10, 150, 200, 7}, 5) << " " << f({1, 2, 3}, 2) << "\n";
}
```

Keluaran:

```text
4002 1000
```

Cek dengan tangan: untuk `{5, 10, 150, 200, 7}` dan `k = 5` ada empat kelipatan 5 (5, 10, 150, 200) dan dua nilai di atas 100 (150, 200), sehingga `4 * 1000 + 2 = 4002`; untuk `{1, 2, 3}` dan `k = 2` ada satu kelipatan dan tak ada nilai di atas 100, yaitu `1000`. Nilai ini sama dengan yang dihitung fungsi `f` lama.

4: contoh: `for f in masukan*.txt; do ./lama < $f > a.txt; ./baru < $f > b.txt; if cmp -s a.txt b.txt; then echo "$f sama"; else echo "$f BEDA"; fi; done`.

**Latihan bercampur.** 1: perilaku berubah untuk masukan besar (luapan jadi hasil benar), jadi itu perbaikan galat; catat terpisah dengan masukan yang menunjukkannya. 2: deklarasi (dan definisi `inline` atau templat); definisi biasa di header menghasilkan `multiple definition` saat penautan bila dua berkas menyertakannya. 3: refaktor mempertahankan perilaku sehingga uji pegangan bermakna; perbaikan galat mengubah perilaku dan butuh uji baru. Kerjakan refaktor lebih dulu bila perlu agar galat mudah dilihat, tetapi pisahkan keduanya.

## Langkah berikutnya

Modul berikutnya, `a-xii2-m2` (pemeliharaan program II), memakai uji pegangan yang sama untuk mempercepat solusi lambat dan mencatat alasannya. Modul terkait: `matkom-pertumbuhan-fungsi`. Bacaan lanjut: halaman cppreference tentang `std::vector` dan `std::count`, serta halaman opsi peringatan GCC.
