## Untuk siapa modul ini

Modul ini untuk murid kelas XI jalur A (Algoritmik dengan C++), minggu `A-XI2-M9` silabus v1.4.1: data bervolume besar I (membaca berkas dan masukan cepat). Prasyarat: modul `a-xi2-m8`. String dari `a-x2-m2` dan `vector` dari `a-x2-m6` dipakai di sini.

Modul ini berstatus DRAF: karangan penyusun, belum ditinjau pemilik. Butir `F-AD-a` dipetakan silabus sebagai dipenuhi jalur ini; modul draf ini belum dihitung sebagai pemenuhan. Semua data di modul ini **sintetis**: dibuat penyusun dan jelas karangan, tanpa data murid atau orang nyata; datamu sendiri juga harus begitu. Tiap soal latihan bertanda `AI: boleh` atau `AI: tanpa AI`. Masukan program diberikan lewat berkas: `./program < data.csv`.

## Ingat kembali

Jawab dari ingatan dulu, baru cek di kunci. Soal 1 dari `a-xi2-m8`, soal 2 dari `a-xi2-m6`, soal 3 dari `a-xi2-m1`.

1. Mengapa batas grid diperiksa sebelum sel tetangga dibaca?
2. Apa yang terjadi bila lupa menandai simpul sebagai sudah dikunjungi saat memasukkannya ke antrian?
3. Kira-kira berapa memori larik `long long` untuk satu juta sel, dan mengapa itu penting saat memilih tabel DP?

## Tujuan

Setelah modul ini kamu dapat:

- membaca berkas CSV baris demi baris dan memecahnya menjadi kolom (keluaran minggu ini: program berkas);
- menolak dan menghitung baris yang rusak, bukan membiarkan program salah diam-diam;
- menyalakan masukan cepat dengan `ios::sync_with_stdio(false)` dan `cin.tie(nullptr)` serta menyebut syaratnya;
- memperkirakan banyak langkah membaca `n` baris.

## Prediksi dulu

Ini tugas baca-dan-prediksi, `AI: tanpa AI`. Satu baris CSV berisi kolom yang dipisah koma. **Tebak dulu, tulis, baru jalankan.**

```cpp
#include <iostream>
#include <sstream>
#include <string>
using namespace std;

int main() {
  string baris = "2026-01-05,minuman,12";
  istringstream ss(baris);
  string bagian;
  int nomor = 0;
  while (getline(ss, bagian, ',')) {
    nomor++;
    cout << nomor << ": [" << bagian << "]\n";
  }
  cout << nomor << " kolom\n";
}
```

1. Apa yang tercetak, baris demi baris?
2. Bila barisnya `a,b,c,`, menurutmu berapa kolom yang terbaca?

Simpan tebakanmu. Hasil nomor 1 ada di bagian berikut; nomor 2 kamu uji sendiri pada soal latihan.

## Contoh terselesaikan

Keluaran program tadi:

```text
1: [2026-01-05]
2: [minuman]
3: [12]
3 kolom
```

`istringstream` membungkus sebuah `string` sehingga bisa dibaca seperti `cin`, dan `getline(ss, bagian, ',')` mengambil teks sampai koma berikutnya (cppreference). Itulah cara memecah satu baris.

Berkas CSV (comma-separated values) adalah teks: baris pertama sering berupa **judul kolom**, sisanya data. Contoh sintetis `data.csv` penjualan kantin karangan (di bawah program) sengaja berisi dua baris rusak.

Program berikut membaca dari `cin` (berkas diberikan dengan `< data.csv`), membuang baris judul, menolak baris yang kolomnya bukan tiga atau jumlahnya bukan angka, serta menghitung yang sah.

```cpp
#include <iostream>
#include <sstream>
#include <string>
#include <vector>
using namespace std;

bool semuaAngka(const string& s) {
  if (s.empty()) {
    return false;
  }
  for (char c : s) {
    if (c < '0' || c > '9') {
      return false;
    }
  }
  return true;
}

int main() {
  ios::sync_with_stdio(false);
  cin.tie(nullptr);
  string baris;
  getline(cin, baris);
  int nomor = 1;
  int sah = 0;
  int ditolak = 0;
  long long total = 0;
  while (getline(cin, baris)) {
    nomor++;
    vector<string> kolom;
    istringstream ss(baris);
    string bagian;
    while (getline(ss, bagian, ',')) {
      kolom.push_back(bagian);
    }
    if (kolom.size() != 3 || !semuaAngka(kolom[2])) {
      cout << "baris " << nomor << " ditolak: " << baris << "\n";
      ditolak++;
      continue;
    }
    sah++;
    total += stoll(kolom[2]);
  }
  cout << sah << " baris sah, " << ditolak << " ditolak, jumlah " << total << "\n";
}
```

Masukan (`data.csv`):

```text
tanggal,kategori,jumlah
2026-01-05,minuman,12
2026-01-05,roti,7
2026-01-06,minuman,abc
2026-01-06,roti,9
2026-01-07,minuman
2026-01-07,buah,4
```

Keluaran:

```text
baris 4 ditolak: 2026-01-06,minuman,abc
baris 6 ditolak: 2026-01-07,minuman
4 baris sah, 2 ditolak, jumlah 32
```

Pada keluaran, nomor baris menghitung baris judul sebagai baris 1, sehingga dua baris rusak mudah dicari di berkas. Prinsipnya: **data dari luar tidak dipercaya** sebelum diperiksa; program yang menelan baris rusak diam-diam memberi jumlah yang salah tanpa tanda. Fungsi `stoll` (cppreference) mengubah teks angka menjadi `long long`, dan hanya dipanggil setelah `semuaAngka` yakin.

Dua baris di awal `main` menyalakan masukan cepat. Secara bawaan aliran C++ disinkronkan dengan `stdio` milik C; `ios::sync_with_stdio(false)` mematikan sinkronisasi itu sehingga aliran boleh menyangga sendiri, yang menurut cppreference "may be considerably faster in some cases". `cin.tie(nullptr)` melepas `cin` dari `cout` sehingga `cout` tidak dikosongkan tiap kali `cin` membaca. Harganya: cppreference menyatakan jaminan bebas mencampur I/O C++ dan C hilang, jadi sesudah itu **jangan** mencampur `cin` dengan `scanf` atau `getchar` pada aliran yang sama. Efeknya baru terasa untuk ratusan ribu baris; ukur sendiri dengan perintah `time ./program < berkas`, karena angkanya berbeda tiap mesin.

Untuk merasakan volume, program berikut membuat berkas sintetis `besar.csv` berisi 200.000 baris dengan deretan bilangan acak semu yang selalu sama, lalu melaporkan jumlahnya.

```cpp
#include <fstream>
#include <iostream>
using namespace std;

int main() {
  const char* nama[4] = {"minuman", "roti", "buah", "nasi"};
  ofstream f("besar.csv");
  f << "tanggal,kategori,jumlah\n";
  long long x = 12345;
  long long total = 0;
  int n = 200000;
  for (int i = 0; i < n; i++) {
    x = (x * 1103515245LL + 12345LL) % 2147483648LL;
    int kategori = (int)(x % 4);
    int jumlah = 1 + (int)((x / 7) % 50);
    int hari = 1 + i % 28;
    f << "2026-01-" << (hari < 10 ? "0" : "") << hari << "," << nama[kategori] << "," << jumlah << "\n";
    total += jumlah;
  }
  cout << "menulis " << n << " baris, jumlah " << total << "\n";
}
```

Keluaran:

```text
menulis 200000 baris, jumlah 5102258
```

Pembaca berikut membuka berkas itu dengan `ifstream` (cppreference), mengambil kolom terakhir tiap baris dengan `rfind` dan `substr`, serta menghitung jumlahnya. Angkanya harus sama dengan program pembuat; kecocokan itu cara memeriksa bahwa membacanya benar.

```cpp
#include <fstream>
#include <iostream>
#include <string>
using namespace std;

int main() {
  ifstream f("besar.csv");
  string baris;
  f >> baris;
  int banyak = 0;
  long long total = 0;
  while (f >> baris) {
    size_t k2 = baris.rfind(',');
    total += stoll(baris.substr(k2 + 1));
    banyak++;
  }
  cout << "membaca " << banyak << " baris, jumlah " << total << "\n";
}
```

Keluaran:

```text
membaca 200000 baris, jumlah 5102258
```

Perkiraan langkah: tiap karakter berkas dibaca sekali, dengan rata-rata sekitar 20 karakter per baris, sehingga 200.000 baris menyentuh sekitar `200.000 * 20 = 4.000.000` karakter. Membaca `n` baris itu `O(n)`: dua kali lebih banyak baris, dua kali lebih banyak kerja. Ini yang penting untuk volume besar: setiap baris disentuh **satu kali**; bila programmu membaca ulang seluruh berkas untuk tiap baris, kerjanya menjadi `n * n` dan tidak selesai.

## Contoh setengah jadi

Lengkapi fungsi yang memecah satu baris menjadi `vector<string>` berdasarkan koma.

```cpp setengah-jadi
vector<string> pecah(const string& baris) {
  vector<string> kolom;
  istringstream ss(____);
  string bagian;
  while (getline(ss, bagian, ____)) {
    kolom.____(bagian);
  }
  return kolom;
}
```

## Soal Parsons

Susun delapan baris berikut (sudah diacak) menjadi program yang menghitung banyak baris sesudah baris judul dari `cin`. `AI: tanpa AI`.

```text
(a)   while (getline(cin, baris)) {
(b)     banyak++;
(c)   }
(d)   cout << banyak << "\n";
(e)   getline(cin, baris);
(f)   string baris;
(g)   int banyak = 0;
(h)   cin.tie(nullptr);
```

## Latihan

1. `AI: boleh` **Jumlah per berkas.** Pada `data.csv` contoh, tulis program yang mencetak jumlah penjualan hanya untuk kategori `minuman` pada baris yang sah. Tulis pseudocode dulu.
2. `AI: boleh` **Komentar.** Perluas program agar baris yang diawali `#` dilewati tanpa dihitung ditolak, dan baris kosong dilewati.
3. `AI: tanpa AI` **Prediksi.** Berapa kolom yang dikembalikan pemecahan koma untuk `a,,c`, untuk `a,b,`, dan untuk `,b`? Jalankan lalu bandingkan.
4. `AI: boleh` **Batas.** Berkas hanya berisi baris judul, atau kosong sama sekali. Apa keluaran programmu, dan apakah ada pembacaan yang bermasalah?
5. *Opsional:* **catatan pemakaian AI.** Bila memakai AI generatif, jawab nomor 3 sendiri dulu, lalu minta penjelasan atau petunjuk bertahap, bukan program jadi. Catat alatnya, tujuanmu, garis besar perintahmu, bagian yang kamu pakai, dan caramu memeriksanya. Jangan menaruh data pribadi atau tugas bernilai pada perintah.

## Latihan bercampur

1. `AI: boleh` Hitung banyak area lantai pada grid yang dibaca dari berkas, bukan dari ketikan, dan laporkan bila barisnya kurang dari `R` (modul `a-xi2-m8`).
2. `AI: tanpa AI` Mengapa `stoll("12abc")` tidak aman dipanggil langsung pada data luar, dan apa penjaganya (modul `a-x1-m13`)?
3. `AI: boleh` Simpan jumlah per kategori dalam `map<string, long long>`; berapa langkah untuk 200.000 baris dengan 4 kategori, dibanding `vector` yang dicari berurutan (modul `a-xi1-m9`)?

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `a-xi2-m10` (pertanyaan 1), sekitar tiga minggu lagi di `a-xi2-m12` (pertanyaan 2), dan sekitar delapan minggu lagi di `a-xii1-m3` (pertanyaan 3). Jawab sekarang lalu simpan.

1. Berapa kolom yang dikembalikan `getline(ss, bagian, ',')` secara berulang untuk `a,,c` dan untuk `a,b,`?
2. Mengapa data dari luar divalidasi baris demi baris, dan apa yang dicatat untuk baris yang ditolak?
3. Mengapa `ios::sync_with_stdio(false)` mempercepat masukan, dan apa yang dihindari sesudah memakainya?

## Kesalahan umum

- **Tidak membuang baris judul.** Kata `jumlah` ikut dianggap angka dan program berhenti atau salah.
- **Menelan baris rusak diam-diam.** Totalnya tampak wajar padahal ada data yang hilang; hitung dan laporkan yang ditolak.
- **Mencampur `cin` dengan `scanf` setelah `sync_with_stdio(false)`.** Urutan masukan menjadi kacau.
- **Mengira koma di akhir menambah kolom kosong.** `getline` dengan pemisah tidak mengembalikan kolom kosong yang terakhir.
- **Membaca ulang seluruh berkas untuk tiap baris.** Pekerjaan membengkak dari `n` menjadi `n * n`.

## Cek mandiri

- [ ] Saya dapat memecah satu baris CSV dengan `istringstream` dan `getline`.
- [ ] Saya dapat membuang baris judul dan menolak baris rusak sambil menghitungnya.
- [ ] Saya dapat menyalakan masukan cepat dan menyebut syaratnya.
- [ ] Saya dapat memperkirakan banyak langkah membaca `n` baris.
- [ ] Saya memakai data sintetis atau data berlisensi, tidak data orang nyata.

## Kunci dan petunjuk

**Ingat kembali.** 1: sel di luar grid yang dibaca memberi perilaku tak terdefinisi. 2: simpul bisa masuk antrian berkali-kali sehingga langkah membengkak, dan pada graf bersiklus program bisa tak berhenti. 3: satu juta `long long` ada `1.000.000 * 8 = 8.000.000` bita, sekitar 8 MB; tabel yang terlalu besar tidak muat atau lambat, sehingga ukuran tabel dihitung sebelum memilih rumusan DP.

**Prediksi dulu.** 1: lihat keluaran program di atas: tiga kolom, masing-masing dalam kurung siku. 2: `a,b,c,` terbaca tiga kolom; koma terakhir tidak menghasilkan kolom kosong.

**Contoh setengah jadi.** Isi: `baris`, `','`, `push_back`. Program lengkap:

```cpp
#include <iostream>
#include <sstream>
#include <string>
#include <vector>
using namespace std;

vector<string> pecah(const string& baris) {
  vector<string> kolom;
  istringstream ss(baris);
  string bagian;
  while (getline(ss, bagian, ',')) {
    kolom.push_back(bagian);
  }
  return kolom;
}

int main() {
  string baris;
  while (getline(cin, baris)) {
    cout << pecah(baris).size() << "\n";
  }
}
```

Masukan (`masukan.txt`):

```text
a,,c
a,b,
,b
x
```

Keluaran:

```text
3
2
2
1
```

Keluaran ini juga jawaban soal 3: tiga, dua, dua, satu kolom.

**Soal Parsons.** Urutan benar: f, g, h, e, a, b, c, d. Deklarasi dulu, lalu pelepasan `cin`, lalu membuang judul, baru perulangan, dan terakhir pencetakan.

**Latihan.** 1: pseudocode: buang judul; untuk tiap baris pecah menjadi kolom; bila tidak tiga kolom atau jumlah bukan angka, lewati; bila `kolom[1]` sama dengan `minuman`, tambahkan jumlah; cetak. Pada `data.csv` contoh, baris sah `minuman` hanya `2026-01-05` (12), jadi jumlahnya 12. 2: tambahkan di awal perulangan `if (baris.empty() || baris[0] == '#') continue;` sebelum memecah. 3: tiga, dua, dua (lihat keluaran di atas). 4: hanya judul memberi `0 baris sah, 0 ditolak, jumlah 0`; berkas kosong juga, karena `getline` pertama gagal dan perulangan tak berjalan; tidak ada pembacaan bermasalah.

**Latihan bercampur.** 1: baca grid dengan `getline` per baris; bila `baris.size()` kurang dari `C` atau barisnya kurang dari `R`, laporkan masukan rusak sebelum BFS. 2: `stoll` melempar galat pada teks yang tidak berawalan angka dan diam-diam berhenti pada huruf pertama non-angka untuk `12abc` (hasil 12); penjaganya `semuaAngka`. 3: sekitar `200.000 * log2(4) = 400.000` langkah untuk `map`; `vector` dengan pencarian berurutan sekitar `200.000 * 4 / 2 = 400.000` juga karena kategori hanya empat; `map` unggul bila kategorinya ribuan.

**Ulang berjarak.** 1: tiga kolom untuk `a,,c` (kolom tengah kosong) dan dua kolom untuk `a,b,`. 2: karena baris rusak tidak kelihatan dari hasil akhir; catat nomor baris dan isinya serta jumlah baris ditolak. 3: tanpa sinkronisasi dengan `stdio`, `cin` tidak perlu berbagi buffer dengan C; yang dihindari adalah mencampur `cin` dengan `scanf`, `getchar`, atau sejenisnya, karena jaminan urutannya hilang.

## Langkah berikutnya

Modul berikut: `a-xi2-m10` (data bervolume besar II: mengelompokkan dan merekap). Modul terkait: `matkom-pertumbuhan-fungsi`. Bacaan lanjut: halaman cppreference tentang `std::getline`, `std::istringstream`, dan `std::ifstream`.
