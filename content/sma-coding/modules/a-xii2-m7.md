## Untuk siapa modul ini

Modul ini untuk murid kelas XII jalur A (Algoritmik dengan C++), minggu `A-XII2-M7` silabus v1.4.1: latihan terpadu III, yaitu menganalisis kesalahan jawaban. Prasyarat: modul `a-xii2-m6` (latihan terpadu II); bawa jawabanmu yang salah atau kurang dari kontes mini.

Modul ini karangan penyusun dan disetujui pemilik program pada 2026-11-20 (keputusan lewat dialog; catatan tinjauan menjadi tindak lanjut revisi). Silabus tidak memetakan butir capaian pembelajaran untuk minggu ini, jadi modul ini tidak dihitung memenuhi butir CP apa pun. Modul ini **seluruhnya tanpa AI**: semua soal bertanda `AI: tanpa AI` (silabus bagian 7.4), karena tujuannya menyelesaikan ulang sendiri. Soal karangan bergaya kompetitif, ditulis orisinal, bukan salinan atau parafrase soal OSN, TOKI, IOI, atau platform lain; sumber resmi hanya ditautkan: <https://osn.toki.id/>. Modul tidak menjanjikan kedalaman soal OSN.

Masukan program diberikan lewat berkas: `./program < masukan.txt`. Semua data karangan.

## Ingat kembali

Jawab dari ingatan dulu, baru cek di kunci. Soal 1 dari `a-xii2-m6`, soal 2 dari `a-xii2-m4`, soal 3 dari `a-xii1-m13`.

1. Mengapa membaca semua soal dulu dan mengambil jawaban sebagian lebih dulu membantu saat waktu terbatas?
2. Mengapa pangkasan tidak boleh mengubah jawaban, dan bagaimana membuktikannya pada sebuah program?
3. Apa saja isi laporan proyek program yang lengkap?

## Tujuan

Setelah modul ini kamu dapat:

- menggolongkan sebuah kesalahan: salah baca soal, salah model, galat penulisan kode, atau galat efisiensi;
- menemukan masukan terkecil yang membuat program salah, dengan pembanding yang pasti benar;
- memperbaiki sebab (bukan gejala) dan menulis uji agar galat itu tak muncul lagi;
- menyelesaikan ulang soal itu sendiri sesudah jeda (keluaran minggu ini: catatan analisis galat).

## Prediksi dulu

Ini tugas baca-dan-prediksi, `AI: tanpa AI`. **Tebak dulu, tulis jawabanmu, baru jalankan.** Fungsi ini mencari panjang ruas terpanjang bilangan positif dengan jumlah **paling banyak** `S`, memakai dua penunjuk.

```cpp
#include <algorithm>
#include <iostream>
#include <vector>
using namespace std;

int salah(const vector<int>& a, int S) {
  int n = static_cast<int>(a.size());
  int kiri = 0;
  int jumlah = 0;
  int terbaik = 0;
  for (int kanan = 0; kanan < n; kanan++) {
    jumlah += a[kanan];
    while (jumlah >= S) {
      jumlah -= a[kiri];
      kiri++;
    }
    terbaik = max(terbaik, kanan - kiri + 1);
  }
  return terbaik;
}

int main() {
  vector<int> a = {3, 2, 4};
  cout << salah(a, 5) << "\n";
}
```

1. Apa yang tercetak untuk `{3, 2, 4}` dan `S = 5`?
2. Berapa jawaban yang sebenarnya, dan di baris mana kamu mencurigai sebabnya?

## Contoh terselesaikan

Keluaran program tadi:

```text
1
```

Jawaban sebenarnya 2: ruas `3, 2` berjumlah 5, yang masih "paling banyak 5". Sebabnya pada `while (jumlah >= S)`: perbandingan memakai `>=`, padahal jumlah yang sama dengan `S` masih sah. Itu galat penulisan kode (batas yang bergeser satu), bukan salah model.

**Empat langkah analisis galat:** (1) **reproduksi**: temukan masukan terkecil yang membuat program salah; (2) **bandingkan** dengan solusi yang pasti benar walau lambat; (3) **lokalisasi**: cari baris dan sebabnya, golongkan galatnya; (4) **perbaiki dan kunci**: perbaiki sebab, tambahkan masukan itu sebagai uji. Langkah 1 dan 2 bisa diotomatiskan: bangkitkan semua masukan kecil berurutan dari yang terpendek, bandingkan dengan pembanding paksa, berhenti pada selisih pertama.

```cpp
#include <algorithm>
#include <iostream>
#include <vector>
using namespace std;

int salah(const vector<int>& a, int S) {
  int n = static_cast<int>(a.size());
  int kiri = 0;
  int jumlah = 0;
  int terbaik = 0;
  for (int kanan = 0; kanan < n; kanan++) {
    jumlah += a[kanan];
    while (jumlah >= S) {
      jumlah -= a[kiri];
      kiri++;
    }
    terbaik = max(terbaik, kanan - kiri + 1);
  }
  return terbaik;
}

int benar(const vector<int>& a, int S) {
  int n = static_cast<int>(a.size());
  int kiri = 0;
  int jumlah = 0;
  int terbaik = 0;
  for (int kanan = 0; kanan < n; kanan++) {
    jumlah += a[kanan];
    while (jumlah > S) {
      jumlah -= a[kiri];
      kiri++;
    }
    terbaik = max(terbaik, kanan - kiri + 1);
  }
  return terbaik;
}

int paksa(const vector<int>& a, int S) {
  int n = static_cast<int>(a.size());
  int terbaik = 0;
  for (int i = 0; i < n; i++) {
    int jumlah = 0;
    for (int j = i; j < n; j++) {
      jumlah += a[j];
      if (jumlah <= S) {
        terbaik = max(terbaik, j - i + 1);
      }
    }
  }
  return terbaik;
}

// Semua larik berisi nilai 1..6 dengan panjang n, dalam urutan menaik.
vector<int> larikKe(int n, int nomor) {
  vector<int> a(n);
  for (int& x : a) {
    x = 1 + nomor % 6;
    nomor /= 6;
  }
  return a;
}

int main() {
  const int S = 5;
  bool ketemu = false;
  for (int n = 1; n <= 4 && !ketemu; n++) {
    int total = 1;
    for (int i = 0; i < n; i++) {
      total *= 6;
    }
    for (int nomor = 0; nomor < total && !ketemu; nomor++) {
      vector<int> a = larikKe(n, nomor);
      if (salah(a, S) != paksa(a, S)) {
        ketemu = true;
        cout << "kasus terkecil yang gagal: n = " << n << ", S = " << S << ", a =";
        for (int x : a) {
          cout << " " << x;
        }
        cout << "\nsalah = " << salah(a, S) << ", paksa = " << paksa(a, S) << "\n";
      }
    }
  }
  int beda = 0;
  int uji = 0;
  for (int n = 1; n <= 4; n++) {
    int total = 1;
    for (int i = 0; i < n; i++) {
      total *= 6;
    }
    for (int nomor = 0; nomor < total; nomor++) {
      vector<int> a = larikKe(n, nomor);
      uji++;
      if (benar(a, S) != paksa(a, S)) {
        beda++;
      }
    }
  }
  cout << "benar: " << beda << " selisih dari " << uji << " uji\n";
}
```

Keluaran:

```text
kasus terkecil yang gagal: n = 1, S = 5, a = 5
salah = 0, paksa = 1
benar: 0 selisih dari 1554 uji
```

Pencarian menemukan masukan terkecil: satu bilangan `5` dengan `S = 5`, yang membuat versi salah menjawab 0 padahal 1. Versi benar (dengan `>`) cocok dengan pembanding paksa pada seluruh 1554 larik (`6 + 36 + 216 + 1296`). Kasus sekecil itu membuat penyebabnya hampir kasatmata: tepat di perbandingan dengan `S`. Pembanding paksa `O(n^2)` mahal untuk masukan besar, tetapi murah untuk masukan kecil, dan memang hanya dipakai untuk menguji; solusi dua penunjuk `O(n)`.

Hasil analisis ditulis sebagai satu baris catatan analisis galat:

| Kolom | Isi untuk contoh ini |
| --- | --- |
| Soal | ruas terpanjang berjumlah paling banyak `S` |
| Golongan | galat penulisan kode (batas `>=` bukan `>`) |
| Masukan terkecil | `n = 1`, `a = 5`, `S = 5` |
| Sebab | jumlah yang tepat sama dengan `S` dianggap melebihi |
| Perbaikan | ganti `>=` dengan `>`; tambah masukan itu sebagai uji tetap |
| Pelajaran | tulis uji untuk nilai tepat di batas sebelum mengirim jawaban |

Terakhir, **selesaikan ulang sendiri**: beberapa hari kemudian, tutup kunci dan catatan, lalu tulis ulang solusi dari awal. Bila kamu hanya membaca perbaikan lalu menyalinnya, kamu belum tahu apakah kamu bisa.

## Contoh setengah jadi

Lengkapi pencari masukan terkecil. Kuncinya ada di `Kunci dan petunjuk`.

```cpp setengah-jadi
  for (int n = 1; n <= ____ && !ketemu; n++) {
    for (int nomor = 0; nomor < total && !____; nomor++) {
      vector<int> a = larikKe(n, nomor);
      if (salah(a, S) ____ paksa(a, S)) {
        ketemu = true;
      }
    }
  }
```

## Soal Parsons

Susun lima baris berikut (sudah diacak, tanpa lekuk) menjadi empat langkah analisis galat ditambah satu langkah lanjutan. `AI: tanpa AI`.

```text
(a) perbaiki sebabnya dan jadikan masukan itu uji tetap
(b) temukan masukan terkecil yang gagal
(c) bandingkan dengan solusi paksa yang pasti benar
(d) cari baris dan sebabnya, lalu golongkan galatnya
(e) selesaikan ulang sendiri sesudah jeda
```

## Latihan

Semua soal `AI: tanpa AI`. Untuk tiap potongan kode: temukan masukan terkecil yang membuatnya salah, golongkan galatnya, dan perbaiki.

1. **Jumlah kuadrat.** Kode berikut seharusnya menjumlahkan kuadrat bilangan (tiap bilangan paling banyak `10^5`).

```cpp
#include <vector>
using namespace std;

int jumlahKuadrat(const vector<int>& a) {
  int total = 0;
  for (int x : a) {
    total += x * x;
  }
  return total;
}
```

2. **Pencarian biner.** Fungsi ini seharusnya mengembalikan indeks pertama yang nilainya tidak kurang dari `x` pada larik terurut, atau banyak elemen bila tak ada.

```cpp
#include <vector>
using namespace std;

int pertamaTidakKurang(const vector<int>& a, int x) {
  int lo = 0;
  int hi = static_cast<int>(a.size()) - 1;
  while (lo < hi) {
    int mid = (lo + hi) / 2;
    if (a[mid] < x) {
      lo = mid + 1;
    } else {
      hi = mid;
    }
  }
  return lo;
}
```

3. **Anagram.** Fungsi ini dipanggil beberapa kali dalam satu program dan seharusnya benar untuk tiap pasangan.

```cpp
#include <string>
using namespace std;

int hitung[26];

bool anagram(const string& s, const string& t) {
  if (s.size() != t.size()) {
    return false;
  }
  for (size_t i = 0; i < s.size(); i++) {
    hitung[s[i] - 'a']++;
    hitung[t[i] - 'a']--;
  }
  for (int c = 0; c < 26; c++) {
    if (hitung[c] != 0) {
      return false;
    }
  }
  return true;
}
```

4. **Jawabanmu sendiri.** Ambil satu jawaban yang salah atau kurang dari kontes mini `a-xii2-m6`, dan tulis satu baris catatan analisis galat enam kolom beserta perbaikannya.

## Latihan bercampur

1. `AI: tanpa AI` Mengapa pencari masukan terkecil memeriksa panjang 1 lebih dulu, lalu 2, dan seterusnya, dan bukan acak?
2. `AI: tanpa AI` Galat nomor 1 baru tampak untuk nilai besar. Bagaimana menghasilkan masukan besar untuk uji, dan solusi paksa mana yang masih memadai (modul `a-xii2-m2`)?
3. `AI: tanpa AI` Mengapa pangkasan di modul `a-xii2-m4` perlu diuji dengan cara yang sama seperti di sini?

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `a-xii2-m8` (pertanyaan 1), sekitar tiga minggu lagi di `a-xii2-m10` (pertanyaan 2), dan pertanyaan 3 untuk pengulangan mandiri (delapan minggu lagi sudah melewati akhir semester). Jawab sekarang lalu simpan.

1. Apa empat langkah menganalisis jawaban yang salah?
2. Sebutkan empat golongan galat dan satu contoh untuk tiap golongan.
3. Mengapa menyelesaikan ulang sendiri sesudah jeda lebih berguna daripada hanya membaca kunci?

## Kesalahan umum

- **Memperbaiki gejala.** Menambah kasus khusus untuk satu masukan yang gagal tanpa memahami sebabnya.
- **Menguji hanya dengan masukan besar.** Masukan kecil membuat sebab terlihat.
- **Tanpa pembanding paksa.** Tanpa jawaban pasti benar, kamu tak tahu program salah.
- **Tidak menggolongkan galat.** Galat model tak sembuh dengan memperbaiki satu baris.
- **Langsung menyalin kunci.** Selesaikan ulang sendiri dulu; menyalin tak menguji pemahaman.

## Cek mandiri

- [ ] Saya dapat menyebut empat langkah analisis galat.
- [ ] Saya dapat mencari masukan terkecil yang gagal dengan pembanding paksa.
- [ ] Saya dapat menggolongkan sebuah galat dan menyebut sebabnya.
- [ ] Saya menulis uji tetap untuk tiap galat yang kuperbaiki.
- [ ] Saya menjadwalkan menyelesaikan ulang sendiri sesudah jeda.

## Kunci dan petunjuk

**Ingat kembali.** 1: waktu terbatas membuat satu soal sulit bisa menghabiskan semuanya; membaca semua dulu memilih urutan, dan jawaban sebagian (subtugas) mengamankan poin. 2: pangkasan hanya boleh membuang cabang yang pasti tak menghasilkan jawaban; buktinya membandingkan hasil versi berpangkas dengan versi tanpa pangkas pada ukuran kecil (jawaban harus sama, hanya banyak simpul yang berbeda). 3: pertanyaan, struktur data dan alasannya, hasil uji, satu hal yang berbeda dari prediksi, dan satu hal yang akan diubah; ditambah banyak langkah program dan batas masukannya.

**Prediksi dulu.** 1: `1`. 2: jawaban sebenarnya 2; sebabnya `>=` pada `while (jumlah >= S)`: jumlah yang tepat `S` masih sah.

**Contoh setengah jadi.** Isi: `4`, `ketemu`, dan `!=`. Pencarian berhenti pada selisih pertama dengan panjang terpendek.

**Soal Parsons.** Urutan: b, c, d, a, e.

**Latihan.** Perbaikan ketiganya dalam satu program, beserta uji pada masukan terkecil:

```cpp
#include <iostream>
#include <string>
#include <vector>
using namespace std;

long long jumlahKuadrat(const vector<int>& a) {
  long long total = 0;
  for (int x : a) {
    total += static_cast<long long>(x) * x;
  }
  return total;
}

int pertamaTidakKurang(const vector<int>& a, int x) {
  int lo = 0;
  int hi = static_cast<int>(a.size());
  while (lo < hi) {
    int mid = (lo + hi) / 2;
    if (a[mid] < x) {
      lo = mid + 1;
    } else {
      hi = mid;
    }
  }
  return lo;
}

bool anagram(const string& s, const string& t) {
  if (s.size() != t.size()) {
    return false;
  }
  int hitung[26] = {0};
  for (size_t i = 0; i < s.size(); i++) {
    hitung[s[i] - 'a']++;
    hitung[t[i] - 'a']--;
  }
  for (int c = 0; c < 26; c++) {
    if (hitung[c] != 0) {
      return false;
    }
  }
  return true;
}

int main() {
  cout << jumlahKuadrat({46341}) << "\n";
  cout << pertamaTidakKurang({1}, 5) << " " << pertamaTidakKurang({1, 3}, 2) << " " << pertamaTidakKurang({1, 3}, 9) << "\n";
  cout << anagram("ab", "cd") << anagram("a", "a") << anagram("a", "a") << "\n";
}
```

Keluaran:

```text
2147488281
1 1 2
011
```

1: masukan terkecil `{46341}`: kuadratnya `2147488281` melebihi batas `int` (`2147483647`); galat luapan (golongan galat penulisan kode atau pilihan tipe); perbaikan `long long`. Pada mesin penyusun, kode lama mencetak angka negatif untuk masukan itu (secara baku luapan `int` bertanda tak terdefinisi). 2: masukan terkecil `a = {1}`, `x = 5`: kode lama memberi 0 padahal jawabannya 1 (banyak elemen); sebabnya `hi = n - 1` tak pernah dapat menghasilkan `n`; perbaikan: rentang setengah terbuka `hi = n`. Golongan: galat penulisan kode (batas). 3: dua pemanggilan `anagram("a", "a")` sesudah `anagram("ab", "cd")` memberi `false` padahal `true`, karena `hitung` global menyisakan nilai dari panggilan sebelumnya; perbaikan: larik lokal yang dimulai dari nol. Golongan: galat penulisan kode (keadaan global yang tak disetel ulang). 4: periksa bahwa uji tetapmu memuat masukan terkecil dan kamu dapat menjelaskan sebabnya tanpa melihat kode.

**Latihan bercampur.** 1: panjang terpendek yang gagal menampilkan sebab paling jelas, dan karena panjang 1 lebih dulu, kasus terkecil ditemukan pertama. 2: bangkitkan nilai besar dengan pembangkit berbenih tetap; pembanding paksa tetap cukup bila ukuran larik kecil walau nilainya besar, sebab luapan bergantung pada nilai, bukan banyak elemen. 3: pangkasan yang salah mengubah jawaban; hanya perbandingan dengan versi tanpa pangkas pada ukuran kecil yang membuktikannya aman.

## Langkah berikutnya

Modul berikutnya, `a-xii2-m8` (latihan terpadu IV), memintamu menyajikan beberapa alternatif solusi untuk satu soal, juga tanpa AI. Modul terkait: `matkom-pertumbuhan-fungsi`. Bacaan lanjut: halaman resmi <https://osn.toki.id/> (hanya tautan) dan halaman cppreference tentang `std::vector`.
