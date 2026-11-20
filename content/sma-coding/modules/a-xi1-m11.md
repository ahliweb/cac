## Untuk siapa modul ini

Modul ini untuk murid kelas XI jalur A (Algoritmik dengan C++), minggu `A-XI1-M11` silabus v1.4.1: backtracking. Prasyarat: modul `a-xi1-m10` (antrian prioritas), `a-xi1-m4` (pencarian lengkap dan pemangkasan), dan `a-x2-m11` (rekursi).

Modul ini karangan penyusun dan disetujui pemilik program pada 2026-11-20 (keputusan lewat dialog; catatan tinjauan menjadi tindak lanjut revisi). Butir `F-AP-a`, `F-AP-b`, dan `F-BK-b` dipetakan silabus sebagai dipenuhi jalur ini; pemenuhan butir mengikuti pemetaan silabus, bukan status modul. Keluarga materi OSN yang bertaut: `rekursi` dan `strategi-problem-solving`; pencarian lengkap dan pemangkasan ditandai pengayaan (P), sehingga bagian `Pengayaan (P)` boleh dilewati oleh kelas reguler. Modul ini tidak menjanjikan kedalaman soal OSN.

Tiap soal latihan bertanda `AI: boleh` atau `AI: tanpa AI`. Masukan program diberikan lewat berkas: `./program < masukan.txt`. Semua soal karangan.

## Ingat kembali

Jawab dari ingatan dulu, baru cek di kunci. Soal 1 dari `a-xi1-m10`, soal 2 dari `a-xi1-m8`, soal 3 dari `a-xi1-m3`.

1. Elemen mana yang dikeluarkan `top()` pada `priority_queue<int>` bawaan, dan bagaimana membuatnya mengeluarkan yang terkecil?
2. Kira-kira berapa perbandingan merge sort untuk `n = 1024`, dan berapa untuk bubble sort?
3. Pada rekursi subhimpunan, apa dua pilihan di tiap elemen dan kapan rekursi berhenti?

## Tujuan

Setelah modul ini kamu dapat:

- menelusuri backtracking sebagai pilih, jelajahi, lalu batalkan pilihan;
- menulis fungsi rekursif yang membangun semua permutasi dan semua penempatan yang sah;
- menghitung banyak pemanggilan untuk menilai besarnya ruang pencarian;
- menjelaskan mengapa menolak pilihan yang sudah salah lebih awal menghemat langkah.

## Prediksi dulu

Ini tugas baca-dan-prediksi, `AI: tanpa AI`. **Tebak dulu, tulis jawabanmu, baru jalankan.** Program menyusun semua urutan dari angka 1 sampai 3.

```cpp
#include <iostream>
#include <vector>
using namespace std;

void susun(int pos, int n, vector<int>& cur, vector<bool>& dipakai) {
  if (pos == n) {
    for (int x : cur) {
      cout << x << " ";
    }
    cout << "\n";
    return;
  }
  for (int x = 1; x <= n; x++) {
    if (dipakai[x]) {
      continue;
    }
    dipakai[x] = true;
    cur.push_back(x);
    susun(pos + 1, n, cur, dipakai);
    cur.pop_back();
    dipakai[x] = false;
  }
}

int main() {
  int n = 3;
  vector<int> cur;
  vector<bool> dipakai(n + 1, false);
  susun(0, n, cur, dipakai);
}
```

1. Ada berapa baris, dan baris apa yang pertama dan terakhir?
2. Pada baris `cur.pop_back(); dipakai[x] = false;`, apa yang terjadi bila dua baris itu dihapus?

Simpan tebakanmu. Perbandingannya ada di bagian berikutnya.

## Contoh terselesaikan

Keluaran program tadi:

```text
1 2 3 
1 3 2 
2 1 3 
2 3 1 
3 1 2 
3 2 1 
```

Pola **backtracking**: di tiap langkah (1) **pilih** satu kemungkinan yang masih boleh, (2) **jelajahi**: panggil fungsi yang sama untuk langkah berikutnya, (3) **batalkan** pilihan itu agar kemungkinan lain bisa dicoba. Bagian ketiga membuat keadaan kembali seperti sebelum langkah (1). Ruang pencarian berbentuk pohon: akar adalah keadaan kosong, tiap cabang satu pilihan, dan daun adalah hasil lengkap. Untuk `n = 3`, `susun` dipanggil `1 + 3 + 6 + 6 = 16` kali: satu di akar, tiga pada tingkat pertama, enam pada tingkat kedua, dan enam daun. Ada `n!` permutasi, jadi langkahnya sekitar `O(n * n!)`; `n = 10` sudah 3.628.800 daun.

Masalah klasik yang lebih menarik adalah menaruh `N` ratu pada papan `N x N` tanpa ada dua ratu yang seruang baris, kolom, atau diagonal. Sebuah ratu per baris cukup, sehingga yang dipilih adalah kolomnya. Pilihan yang sudah melanggar **ditolak segera** (pemangkasan), sehingga cabang di bawahnya tidak pernah dijelajahi. Berikut semua penempatan untuk `N = 4`:

```cpp
#include <cstdlib>
#include <iostream>
#include <vector>
using namespace std;

bool aman(const vector<int>& kolom, int baris, int k) {
  for (int b = 0; b < baris; b++) {
    if (kolom[b] == k || abs(kolom[b] - k) == baris - b) {
      return false;
    }
  }
  return true;
}

void taruh(int baris, int n, vector<int>& kolom) {
  if (baris == n) {
    for (int b = 0; b < n; b++) {
      for (int k = 0; k < n; k++) {
        cout << (kolom[b] == k ? 'Q' : '.');
      }
      cout << "\n";
    }
    cout << "\n";
    return;
  }
  for (int k = 0; k < n; k++) {
    if (aman(kolom, baris, k)) {
      kolom[baris] = k;
      taruh(baris + 1, n, kolom);
    }
  }
}

int main() {
  int n = 4;
  vector<int> kolom(n, -1);
  taruh(0, n, kolom);
}
```

Keluaran:

```text
.Q..
...Q
Q...
..Q.

..Q.
Q...
...Q
.Q..
```

Di sini langkah "batalkan" tidak perlu ditulis, karena `kolom[baris]` ditimpa pada pilihan berikutnya. Seberapa besar penghematan pemangkasan? Program berikut menghitung banyak pemanggilan `taruh` dan banyak penempatan sah untuk beberapa ukuran papan, dibandingkan dengan `N^N`, banyak cara menaruh satu ratu per baris tanpa memeriksa apa pun.

```cpp
#include <cstdlib>
#include <iostream>
#include <vector>
using namespace std;

bool aman(const vector<int>& kolom, int baris, int k) {
  for (int b = 0; b < baris; b++) {
    if (kolom[b] == k || abs(kolom[b] - k) == baris - b) {
      return false;
    }
  }
  return true;
}

void taruh(int baris, int n, vector<int>& kolom, long long& jumlah, long long& panggilan) {
  panggilan++;
  if (baris == n) {
    jumlah++;
    return;
  }
  for (int k = 0; k < n; k++) {
    if (aman(kolom, baris, k)) {
      kolom[baris] = k;
      taruh(baris + 1, n, kolom, jumlah, panggilan);
    }
  }
}

int main() {
  for (int n = 4; n <= 8; n++) {
    vector<int> kolom(n, -1);
    long long jumlah = 0;
    long long panggilan = 0;
    taruh(0, n, kolom, jumlah, panggilan);
    long long semua = 1;
    for (int i = 0; i < n; i++) {
      semua *= n;
    }
    cout << "N = " << n << ": " << jumlah << " penempatan, " << panggilan << " pemanggilan, tanpa pemangkasan " << semua << "\n";
  }
}
```

Keluaran:

```text
N = 4: 2 penempatan, 17 pemanggilan, tanpa pemangkasan 256
N = 5: 10 penempatan, 54 pemanggilan, tanpa pemangkasan 3125
N = 6: 4 penempatan, 153 pemanggilan, tanpa pemangkasan 46656
N = 7: 40 penempatan, 552 pemanggilan, tanpa pemangkasan 823543
N = 8: 92 penempatan, 2057 pemanggilan, tanpa pemangkasan 16777216
```

Untuk `N = 8`, pemangkasan menyisakan sebagian kecil dari `16.777.216` kemungkinan. Namun pemanggilannya tetap tumbuh cepat: 2057 pada `N = 8`, lalu sekitar empat kali lipat pada tiap tambahan satu baris (latihan 3 menunjukkan angkanya). Backtracking menolak cabang yang jelas gagal; ia tidak membuat ruang pencarian kecil.

## Contoh setengah jadi

Lengkapi fungsi yang menghitung banyak "kode bendera": string sepanjang `n` dari huruf `A`, `B`, `C` tanpa dua huruf yang sama berdampingan.

```cpp setengah-jadi
void bangun(string& s, int n, int& jumlah) {
  if ((int)s.size() == n) {
    jumlah++;
    return;
  }
  for (char c = 'A'; c <= 'C'; c++) {
    if (!s.empty() && s.back() ____ c) {
      continue;
    }
    s.push_back(c);
    bangun(s, n, jumlah);
    s.____();
  }
}
```

## Soal Parsons

Susun sembilan baris berikut (sudah diacak) menjadi fungsi `susun` untuk permutasi. Dua baris `}` identik; yang pertama menutup `for`. `AI: tanpa AI`: tujuannya melatih membaca urutan.

```text
(a)   cur.pop_back(); dipakai[x] = false;
(b)   if (pos == n) { cetak(); return; }
(c)   }
(d) void susun(int pos) {
(e)     susun(pos + 1);
(f)   for (int x = 1; x <= n; x++) {
(g)     dipakai[x] = true; cur.push_back(x);
(h)     if (dipakai[x]) continue;
(i) }
```

## Latihan

1. `AI: boleh` **Tanpa tempat semula.** Baca `n`. Hitung berapa permutasi dari `1..n` yang tidak menaruh angka `i` di posisi ke-`i`. Tulis pseudocode lebih dulu.
2. `AI: boleh` **Pilih k.** Baca `n` dan `k`. Cetak semua pilihan `k` angka berbeda dari `1..n` dalam urutan menaik, satu pilihan per baris.
3. `AI: boleh` **Ukuran papan.** Jalankan program N-ratu untuk `N = 9` dan `N = 10`. Berapa penempatan dan berapa pemanggilan? Bandingkan dengan `N^N`.
4. `AI: tanpa AI` **Telusuri.** Berapa kali `susun` dipanggil untuk `n = 4`, termasuk pemanggilan pada daun? Hitung tingkat demi tingkat.
5. *Opsional:* **catatan pemakaian AI.** Bila memakai AI generatif, jawab nomor 4 sendiri dulu, lalu minta penjelasan atau petunjuk bertahap, bukan program jadi. Catat alatnya, tujuanmu, garis besar perintahmu, bagian yang kamu pakai, dan caramu memeriksanya. Jangan menaruh data pribadi atau tugas bernilai pada perintah.

## Latihan bercampur

1. `AI: boleh` Untuk `N = 6`, bandingkan banyak pemanggilan dengan `6^6`. Apa arti selisihnya bagi pemangkasan (modul `a-xi1-m4`)?
2. `AI: tanpa AI` Berapa kedalaman terdalam tumpukan pemanggilan `susun` untuk `n = 3`, dan apa kasus dasarnya (modul `a-x2-m11`)?
3. `AI: boleh` Bangun semua susunan huruf `A`, `A`, `B` dengan backtracking, simpan di `set<string>`, dan cetak banyak susunan berbeda (modul `a-xi1-m9`).

## Pengayaan (P)

Bagian ini boleh dilewati. Pemangkasan lebih kuat memakai **batas**: bila jumlah sementara sudah melewati target dan semua bilangan positif, cabang itu tidak mungkin berhasil. Program berikut menghitung banyaknya himpunan bagian dari sepuluh bilangan karangan yang jumlahnya tepat 40, dengan dan tanpa pemangkasan.

```cpp
#include <iostream>
using namespace std;

int angka[10] = {3, 5, 7, 9, 11, 13, 15, 17, 19, 21};
long long panggilan;

int hitung(int i, int sisa, bool pangkas) {
  panggilan++;
  if (pangkas && sisa < 0) {
    return 0;
  }
  if (i == 10) {
    return sisa == 0 ? 1 : 0;
  }
  return hitung(i + 1, sisa - angka[i], pangkas) + hitung(i + 1, sisa, pangkas);
}

int main() {
  panggilan = 0;
  int a = hitung(0, 40, false);
  cout << "tanpa pemangkasan: " << a << " himpunan, " << panggilan << " pemanggilan\n";
  panggilan = 0;
  int b = hitung(0, 40, true);
  cout << "dengan pemangkasan: " << b << " himpunan, " << panggilan << " pemanggilan\n";
}
```

Keluaran:

```text
tanpa pemangkasan: 14 himpunan, 2047 pemanggilan
dengan pemangkasan: 14 himpunan, 1031 pemanggilan
```

Jawabannya sama; yang berkurang hanya pemanggilan. Pemangkasan aman bila hanya membuang cabang yang pasti gagal: di sini `sisa < 0` pasti gagal karena semua bilangan positif.

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `a-xi1-m12` (pertanyaan 1), sekitar tiga minggu lagi di `a-xi1-m14` (pertanyaan 2), dan sekitar delapan minggu lagi di `a-xi2-m5` (pertanyaan 3). Jawab sekarang lalu simpan.

1. Sebutkan tiga bagian tiap langkah backtracking.
2. Mengapa pemangkasan menghemat langkah, dan syarat apa yang membuatnya aman?
3. Berapa banyak permutasi `n` unsur, dan mengapa itu membatasi `n` pada pencarian lengkap?

## Kesalahan umum

- **Lupa membatalkan pilihan.** Tanpa `pop_back` dan penanda `dipakai` dikembalikan, keadaan bocor ke cabang lain dan hasilnya salah atau terlewat.
- **Tidak ada kasus dasar.** Rekursi tidak berhenti, atau hasil lengkap tidak pernah dicetak.
- **Pemangkasan yang membuang solusi sah.** Syarat penolakan harus benar-benar pasti gagal; uji pada ukuran kecil yang bisa dihitung tangan.
- **Menghitung hasil di tengah, bukan di daun.** Cetak atau hitung hanya saat `pos == n`.
- **Mengira backtracking selalu cepat.** Ia hanya menolak cabang yang jelas gagal; ruang pencarian tetap bisa raksasa.

## Cek mandiri

- [ ] Saya dapat menelusuri pilih, jelajahi, dan batalkan.
- [ ] Saya dapat menulis fungsi rekursif untuk permutasi.
- [ ] Saya dapat menghitung banyak pemanggilan untuk ukuran kecil.
- [ ] Saya dapat menjelaskan fungsi pemangkasan dan syarat amannya.
- [ ] Saya menulis pseudocode sebelum programnya.

## Kunci dan petunjuk

**Ingat kembali.** 1: yang terbesar; pakai `priority_queue<int, vector<int>, greater<int>>`. 2: merge sort sekitar `1024 * 10 = 10240` (batas atas); bubble sort `1024 * 1023 / 2 = 523776`. 3: ambil elemen itu atau lewati; rekursi berhenti bila tak ada elemen tersisa (larik kosong), saat semua elemen sudah diputuskan.

**Prediksi dulu.** 1: enam baris; pertama `1 2 3`, terakhir `3 2 1`. 2: bila `pop_back` dan `dipakai[x] = false` dihapus, angka yang sudah dipilih tidak pernah bebas lagi dan `cur` terus bertambah; hanya satu baris, `1 2 3`, yang tercetak, karena semua angka tetap berstatus terpakai dan tak ada pilihan lain tersisa.

**Contoh setengah jadi.** Isi: `==` dan `pop_back`. Program lengkap:

```cpp
#include <iostream>
#include <string>
using namespace std;

void bangun(string& s, int n, int& jumlah) {
  if ((int)s.size() == n) {
    jumlah++;
    return;
  }
  for (char c = 'A'; c <= 'C'; c++) {
    if (!s.empty() && s.back() == c) {
      continue;
    }
    s.push_back(c);
    bangun(s, n, jumlah);
    s.pop_back();
  }
}

int main() {
  for (int n = 1; n <= 6; n++) {
    string s;
    int jumlah = 0;
    bangun(s, n, jumlah);
    cout << "n = " << n << ": " << jumlah << "\n";
  }
}
```

Keluaran:

```text
n = 1: 3
n = 2: 6
n = 3: 12
n = 4: 24
n = 5: 48
n = 6: 96
```

Polanya `3 * 2^(n - 1)`: tiga pilihan untuk huruf pertama dan dua untuk tiap huruf berikutnya.

**Soal Parsons.** Urutan benar: d, b, f, h, g, e, a, c, i. Baris `}` pertama menutup `for`, yang kedua menutup fungsi.

**Latihan.** 1: pseudocode: `susun(pos)`: bila `pos = n` hitung 1; untuk tiap `x` belum dipakai dan `x != pos + 1`: pilih, rekursi, batalkan. Program contoh:

```cpp
#include <iostream>
#include <vector>
using namespace std;

int n;
int jumlah;
vector<bool> dipakai;

void susun(int pos) {
  if (pos == n) {
    jumlah++;
    return;
  }
  for (int x = 1; x <= n; x++) {
    if (dipakai[x] || x == pos + 1) {
      continue;
    }
    dipakai[x] = true;
    susun(pos + 1);
    dipakai[x] = false;
  }
}

int main() {
  cin >> n;
  dipakai.assign(n + 1, false);
  susun(0);
  cout << jumlah << "\n";
}
```

Masukan (`masukan.txt`):

```text
4
```

Keluaran:

```text
9
```

2: program contoh:

```cpp
#include <iostream>
#include <vector>
using namespace std;

int n;
int k;
vector<int> pilih;

void cari(int mulai) {
  if ((int)pilih.size() == k) {
    for (int x : pilih) {
      cout << x << " ";
    }
    cout << "\n";
    return;
  }
  for (int x = mulai; x <= n; x++) {
    pilih.push_back(x);
    cari(x + 1);
    pilih.pop_back();
  }
}

int main() {
  cin >> n >> k;
  cari(1);
}
```

Masukan (`masukan.txt`):

```text
4 2
```

Keluaran:

```text
1 2 
1 3 
1 4 
2 3 
2 4 
3 4 
```

3: gunakan program N-ratu dengan `n` dari 9 dan 10; hasilnya dicetak oleh program berikut, yang sama dengan contoh dengan rentang `N = 9` sampai `10`:

```cpp
#include <cstdlib>
#include <iostream>
#include <vector>
using namespace std;

bool aman(const vector<int>& kolom, int baris, int k) {
  for (int b = 0; b < baris; b++) {
    if (kolom[b] == k || abs(kolom[b] - k) == baris - b) {
      return false;
    }
  }
  return true;
}

void taruh(int baris, int n, vector<int>& kolom, long long& jumlah, long long& panggilan) {
  panggilan++;
  if (baris == n) {
    jumlah++;
    return;
  }
  for (int k = 0; k < n; k++) {
    if (aman(kolom, baris, k)) {
      kolom[baris] = k;
      taruh(baris + 1, n, kolom, jumlah, panggilan);
    }
  }
}

int main() {
  for (int n = 9; n <= 10; n++) {
    vector<int> kolom(n, -1);
    long long jumlah = 0;
    long long panggilan = 0;
    taruh(0, n, kolom, jumlah, panggilan);
    cout << "N = " << n << ": " << jumlah << " penempatan, " << panggilan << " pemanggilan\n";
  }
}
```

Keluaran:

```text
N = 9: 352 penempatan, 8394 pemanggilan
N = 10: 724 penempatan, 35539 pemanggilan
```

Bandingkan dengan `9^9 = 387.420.489` dan `10^10 = 10.000.000.000`: pemangkasan menyisakan sebagian kecil saja. 4: tingkat 0: 1; tingkat 1: 4; tingkat 2: `4 * 3 = 12`; tingkat 3: `12 * 2 = 24`; tingkat 4: 24 daun; jumlah `1 + 4 + 12 + 24 + 24 = 65` pemanggilan.

**Latihan bercampur.** 1: untuk `N = 6`, pemanggilan jauh di bawah `6^6 = 46656` (lihat keluaran contoh); selisihnya adalah cabang yang tidak pernah dijelajahi berkat pemangkasan. 2: kedalaman terdalam 4 pemanggilan (`pos` 0 sampai 3); kasus dasarnya `pos == n`. 3: program contoh:

```cpp
#include <iostream>
#include <set>
#include <string>
using namespace std;

string huruf = "AAB";
set<string> hasil;
string cur;
bool dipakai[3];

void susun() {
  if (cur.size() == 3) {
    hasil.insert(cur);
    return;
  }
  for (int i = 0; i < 3; i++) {
    if (dipakai[i]) {
      continue;
    }
    dipakai[i] = true;
    cur.push_back(huruf[i]);
    susun();
    cur.pop_back();
    dipakai[i] = false;
  }
}

int main() {
  susun();
  cout << hasil.size() << " susunan berbeda dari 6 percobaan\n";
}
```

Keluaran:

```text
3 susunan berbeda dari 6 percobaan
```

**Pengayaan (P).** Tidak ada kunci tunggal; pastikan kamu menjelaskan mengapa jawaban sama tetapi pemanggilan berbeda.

**Ulang berjarak.** 1: memilih, menjelajahi (rekursi), dan membatalkan pilihan. 2: cabang yang sudah pasti gagal tidak dijelajahi, sehingga banyak pemanggilan berkurang; syaratnya hanya membuang cabang yang benar-benar tidak mungkin menghasilkan solusi. 3: `n!`; naik sangat cepat (10 unsur sudah 3.628.800), sehingga pencarian lengkap hanya untuk `n` kecil.

## Langkah berikutnya

Modul berikut: `a-xi1-m12` (membandingkan strategi). Bacaan lanjut: halaman cppreference tentang `std::next_permutation`, cara siap pakai menghasilkan permutasi.
