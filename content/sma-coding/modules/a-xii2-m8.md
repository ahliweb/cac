## Untuk siapa modul ini

Modul ini untuk murid kelas XII jalur A (Algoritmik dengan C++), minggu `A-XII2-M8` silabus v1.4.1: latihan terpadu IV. Prasyarat: modul `a-xii2-m7`. Keluaran minggu ini adalah **laporan alternatif**: satu soal, dua solusi, dan alasan memilih salah satu.

Modul ini karangan penyusun dan disetujui pemilik program pada 2026-11-20 (keputusan lewat dialog; catatan tinjauan menjadi tindak lanjut revisi). Butir capaian pembelajaran yang bertaut: `F-BK-b` (beberapa strategi dan justifikasi efisiensi). Seluruh modul ini **tanpa AI** (silabus 7.4): latihan terpadu melatih kemampuan menyelesaikan ulang soal sendiri, jadi jangan memakai AI generatif untuk bagian mana pun, termasuk tugas baca-dan-prediksi. Soalnya dibuat orisinal oleh penyusun dan bergaya soal kompetitif; ia tidak menyalin atau memparafrasekan soal lomba atau platform mana pun. Semua angka dan data karangan, dan masukan program diberikan lewat berkas: `./program < masukan.txt`.

## Ingat kembali

Jawab dari ingatan dulu, baru cek di kunci. Soal 1 dari `a-xii2-m7`, soal 2 dari `a-xii2-m5`, soal 3 dari `a-xii1-m10`.

1. Apa empat langkah menganalisis jawaban yang salah?
2. Mengapa greedy menurut rasio nilai per berat bisa gagal pada soal knapsack? Beri contoh.
3. Mengapa segment tree memakai larik berukuran sekitar `4n`, dan berapa langkah kueri dan pembaruannya?

## Tujuan

Setelah modul ini kamu dapat:

- membaca soal gaya kompetitif lalu menuliskan batasan, contoh, dan perkiraan langkah sebelum memilih cara;
- menulis dua solusi berbeda untuk satu soal dan memeriksa bahwa keduanya sepakat pada masukan kecil;
- membandingkan kedua solusi dengan banyak langkah, memori, dan risiko luapan, lalu memilih dengan alasan;
- menyusun laporan alternatif pendek (keluaran minggu ini).

## Prediksi dulu

Ini tugas baca-dan-prediksi, `AI: tanpa AI`. **Tebak dulu, tulis jawabanmu, baru jalankan.** Soal yang dipakai sepanjang modul, "Kupon Gabungan": ada `n` kupon bernilai `a[i]`; hitung banyak pasangan `(i, j)` dengan `i < j` dan `a[i] + a[j] = T`. Pasangan dihitung menurut posisi, jadi dua kupon bernilai 5 di posisi berbeda dihitung sebagai pasangan sendiri.

```cpp
#include <iostream>
#include <vector>
using namespace std;

int main() {
  vector<int> a = {3, 7, 5, 5, 2, 8, 5, 5};
  int T = 10;
  long long pasangan = 0;
  long long periksa = 0;
  for (size_t i = 0; i < a.size(); i++) {
    for (size_t j = i + 1; j < a.size(); j++) {
      periksa++;
      if (a[i] + a[j] == T) {
        pasangan++;
      }
    }
  }
  cout << pasangan << " " << periksa << "\n";
}
```

1. Apa dua bilangan yang tercetak?
2. Bila `a` berisi dua juta kupon, apakah cara ini masih layak? Perkirakan banyak perbandingannya.

Simpan tebakanmu. Perbandingannya ada di bagian berikutnya.

## Contoh terselesaikan

Keluaran program tadi:

```text
8 28
```

Ada `4` kupon bernilai 5 sehingga `C(4, 2) = 6` pasangan, ditambah `(3, 7)` dan `(2, 8)`, jadi 8. Banyak perbandingan `n(n - 1) / 2 = 28`.

**Langkah membaca soal.** Tulis dulu batasan: misalkan `n` sampai `2 * 10^5`, `a[i]` dan `T` sampai `10^9`. Dari batasan itu, jawaban bisa mencapai sekitar `n^2 / 2`, yaitu `2 * 10^10`, sehingga `int` tidak cukup dan jawaban harus `long long`. Perkirakan langkah tiap cara sebelum menulis kode.

**Solusi A (pencarian lengkap):** coba semua pasangan, `O(n^2)`. Untuk `n = 2 * 10^5` itu sekitar `2 * 10^10` perbandingan, jauh di atas pedoman seratus juta langkah per detik. **Solusi B (struktur data):** simpan banyak kemunculan tiap nilai di `map`; untuk tiap `a[i]` tambahkan banyak kemunculan `T - a[i]` yang sudah terlihat, lalu catat `a[i]`. Itu `O(n log n)`: sekitar `2 * 10^5 * 18`, kurang dari empat juta langkah. Program berikut menjalankan keduanya pada satu masukan dan menghitung kerja masing-masing.

```cpp
#include <iostream>
#include <map>
#include <vector>
using namespace std;

int main() {
  int n;
  int T;
  cin >> n >> T;
  vector<int> a(n);
  for (int i = 0; i < n; i++) {
    cin >> a[i];
  }
  long long hasilA = 0;
  long long periksa = 0;
  for (int i = 0; i < n; i++) {
    for (int j = i + 1; j < n; j++) {
      periksa++;
      if (a[i] + a[j] == T) {
        hasilA++;
      }
    }
  }
  map<int, long long> banyak;
  long long hasilB = 0;
  long long operasi = 0;
  for (int i = 0; i < n; i++) {
    auto it = banyak.find(T - a[i]);
    operasi++;
    if (it != banyak.end()) {
      hasilB += it->second;
    }
    banyak[a[i]]++;
    operasi++;
  }
  cout << "A: " << hasilA << " pasangan, " << periksa << " perbandingan\n";
  cout << "B: " << hasilB << " pasangan, " << operasi << " operasi map\n";
}
```

Masukan (`masukan.txt`):

```text
8 10
3 7 5 5 2 8 5 5
```

Keluaran:

```text
A: 8 pasangan, 28 perbandingan
B: 8 pasangan, 16 operasi map
```

Jawaban sama, kerjanya berbeda: 28 lawan 16 sudah pada `n = 8`, dan selisihnya melebar cepat. Kesepakatan pada satu contoh belum membuktikan apa-apa, jadi **uji pembanding** dipakai: jalankan A dan B pada banyak masukan kecil acak (nilai 1 sampai 6 agar sering ada duplikat) dan hitung berapa kali jawabannya beda.

```cpp
#include <iostream>
#include <map>
#include <vector>
using namespace std;

long long solusiA(const vector<int>& a, int T) {
  long long hasil = 0;
  for (size_t i = 0; i < a.size(); i++) {
    for (size_t j = i + 1; j < a.size(); j++) {
      if (a[i] + a[j] == T) {
        hasil++;
      }
    }
  }
  return hasil;
}

long long solusiB(const vector<int>& a, int T) {
  map<int, long long> banyak;
  long long hasil = 0;
  for (int x : a) {
    auto it = banyak.find(T - x);
    if (it != banyak.end()) {
      hasil += it->second;
    }
    banyak[x]++;
  }
  return hasil;
}

int main() {
  unsigned long long benih = 12345;
  auto acak = [&](int batas) {
    benih = benih * 6364136223846793005ULL + 1442695040888963407ULL;
    return (int)((benih >> 33) % batas);
  };
  int beda = 0;
  for (int uji = 0; uji < 300; uji++) {
    int n = 1 + acak(12);
    int T = 2 + acak(11);
    vector<int> a(n);
    for (int& x : a) {
      x = 1 + acak(6);
    }
    if (solusiA(a, T) != solusiB(a, T)) {
      beda++;
    }
  }
  cout << "300 uji, " << beda << " beda\n";
}
```

```text
300 uji, 0 beda
```

Nol perbedaan pada 300 uji menambah keyakinan, tetapi tidak membuktikan. Karena A sederhana, ia dipakai sebagai pembanding bagi B pada masukan kecil. **Laporan alternatif** untuk soal ini memuat: (1) dua solusi dan gagasan tiap solusi, (2) tabel perbandingan, (3) hasil uji pembanding, dan (4) pilihan beserta alasannya.

| Aspek | Solusi A | Solusi B |
| --- | --- | --- |
| Langkah | `O(n^2)` | `O(n log n)` |
| Memori | `O(1)` tambahan | `O(n)` untuk `map` |
| Risiko | lambat untuk `n` besar | jawaban perlu `long long` |
| Cocok untuk | `n` kecil, pembanding | `n` besar |

Pilihan: B untuk masukan sebenarnya karena `n` bisa `2 * 10^5`, dengan A disimpan sebagai pembanding uji.

## Contoh setengah jadi

Lengkapi dua tempat bertanda `____` agar program menghitung pasangan dengan cara B langsung saat membaca (satu lintasan tanpa menyimpan larik). Petunjuk: yang dicari adalah pasangan yang sudah terlihat, lalu nilai sekarang dicatat. Kuncinya ada di `Kunci dan petunjuk`.

```cpp setengah-jadi
#include <iostream>
#include <map>
using namespace std;

int main() {
  int n;
  int T;
  cin >> n >> T;
  map<int, long long> banyak;
  long long hasil = 0;
  for (int i = 0; i < n; i++) {
    int x;
    cin >> x;
    hasil += banyak[____];
    banyak[____]++;
  }
  cout << hasil << "\n";
}
```

## Soal Parsons

`AI: tanpa AI`. Susun baris berikut menjadi fungsi `hitungA` yang benar (kerangka `#include` dan `main` sudah ada). Kunci tercantum.

```text
      }
  return pasangan;
  long long pasangan = 0;
    for (size_t j = i + 1; j < a.size(); j++) {
      if (a[i] + a[j] == T) {
long long hitungA(const vector<int>& a, int T) {
        pasangan++;
  for (size_t i = 0; i < a.size(); i++) {
      }
    }
}
```

Indentasi pada daftar sudah menunjukkan tingkat tiap baris di jawaban akhir.

## Latihan

Kerjakan sendiri, tanpa AI.

1. `AI: tanpa AI` Tulis solusi C untuk Kupon Gabungan: urutkan, lalu dua penunjuk dari ujung. Bagaimana kamu menangani nilai kembar, dan berapa langkahnya?
2. `AI: tanpa AI` Untuk `n = 200000` dan semua kupon bernilai 5 dengan `T = 10`, berapa jawabannya? Apa yang terjadi bila jawaban disimpan di `int`?
3. `AI: tanpa AI` Soal kedua, "banyak nilai berbeda" dalam `n` bilangan: tulis dua solusi (loop ganda dan urutkan lalu hitung perubahan nilai) dan jalankan pada `7` bilangan `4 9 4 1 9 9 2`.
4. `AI: tanpa AI` Buat laporan alternatif satu halaman untuk soal nomor 3 dengan keempat bagiannya.

## Latihan bercampur

1. `AI: tanpa AI` Variasi: hitung pasangan `i < j` dengan `a[i] + a[j]` habis dibagi `m`, nilai boleh negatif (modul `a-xii1-m8`). Tulis alternatif yang hanya `O(n + m)`.
2. `AI: tanpa AI` Kupon bisa dikoreksi nilainya dan kamu juga ditanya jumlah nilai kupon pada rentang posisi. Struktur apa yang kamu pilih, dan mengapa bukan larik jumlah prefiks biasa (modul `a-xii1-m9`)?

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `a-xii2-m9` (pertanyaan 1), sekitar tiga minggu lagi di `a-xii2-m11` (pertanyaan 2), dan sekitar enam minggu lagi di `a-xii2-m14` (pertanyaan 4). Jawab sekarang lalu simpan.

1. Apa saja isi laporan alternatif, dan mengapa dua solusi dibandingkan lebih dulu pada masukan kecil?
2. Mengapa uji pembanding yang tak menemukan beda belum membuktikan solusi B benar?
3. Bagaimana memperkirakan dari batas masukan bahwa solusi `O(n^2)` tak layak untuk `n = 2 * 10^5`?

## Kesalahan umum

- **Memilih solusi sebelum menghitung batas.** Cara pertama yang terpikir belum tentu cukup cepat; hitung langkahnya dulu.
- **Menyimpan jumlah pasangan di `int`.** Jawaban bisa melebihi dua miliar; pakai `long long` sejak awal.
- **Mengira dua solusi yang sepakat pada contoh pasti sama.** Uji dengan banyak masukan kecil, termasuk nilai kembar dan `n = 1`.
- **Salah menangani nilai kembar pada dua penunjuk.** Saat `a[l] == a[r]`, jumlah pasangannya `len * (len - 1) / 2`, bukan 1.
- **Menulis laporan tanpa alasan.** Tabel tanpa kalimat pilihan belum menjustifikasi apa-apa.

## Cek mandiri

- [ ] Saya menulis batasan dan perkiraan langkah sebelum memilih cara.
- [ ] Saya menulis dua solusi berbeda untuk satu soal.
- [ ] Saya menguji keduanya pada masukan kecil dan membandingkan hasilnya.
- [ ] Saya memilih solusi dengan alasan langkah, memori, dan luapan.
- [ ] Saya mengerjakan seluruh modul tanpa AI.

## Kunci dan petunjuk

**Ingat kembali.** 1: reproduksi dengan masukan terkecil yang membuat program salah; bandingkan dengan solusi yang pasti benar walau lambat; lokalisasi baris dan sebabnya lalu golongkan galatnya; perbaiki sebabnya dan tambahkan masukan itu sebagai uji tetap. 2: rasio tertinggi bisa mengunci kapasitas dengan barang yang menyisakan ruang tak terpakai; pada tugas `(6, 61)`, `(5, 50)`, `(5, 50)` dengan batas 10, greedy rasio memilih `(6, 61)` dan berhenti di 61, padahal dua tugas 5 menit memberi 100; satu contoh yang gagal membuktikan greedy salah. 3: tiap simpul menyimpan rentang, dan tinggi pohon tak melebihi `ceil(log2 n) + 1`, sehingga `4n` selalu cukup; kueri dan pembaruan `O(log n)`.

**Prediksi dulu.** 1: `8 28`. 2: tidak layak; `n(n - 1) / 2` untuk `n = 2 * 10^6` sekitar `2 * 10^12`.

**Contoh setengah jadi.** Isi: `T - x` dan `x`. Program lengkap:

```cpp
#include <iostream>
#include <map>
using namespace std;

int main() {
  int n;
  int T;
  cin >> n >> T;
  map<int, long long> banyak;
  long long hasil = 0;
  for (int i = 0; i < n; i++) {
    int x;
    cin >> x;
    hasil += banyak[T - x];
    banyak[x]++;
  }
  cout << hasil << "\n";
}
```

Masukan:

```text
6 10
5 5 5 3 7 1
```

Keluaran:

```text
4
```

Tiga kupon bernilai 5 membentuk 3 pasangan, ditambah `(3, 7)`: 4. Pencarian `banyak[T - x]` dilakukan **sebelum** `banyak[x]++` agar kupon tidak dipasangkan dengan dirinya sendiri.

**Soal Parsons.** Urutan benar (11 baris; indentasi dua spasi per tingkat):

```cpp
#include <iostream>
#include <vector>
using namespace std;

long long hitungA(const vector<int>& a, int T) {
  long long pasangan = 0;
  for (size_t i = 0; i < a.size(); i++) {
    for (size_t j = i + 1; j < a.size(); j++) {
      if (a[i] + a[j] == T) {
        pasangan++;
      }
    }
  }
  return pasangan;
}

int main() {
  vector<int> a = {1, 9, 4, 6, 5};
  cout << hitungA(a, 10) << "\n";
}
```

```text
2
```

Pada `{1, 9, 4, 6, 5}` dan `T = 10`, pasangannya `(1, 9)` dan `(4, 6)`, jadi 2.

**Latihan.** 1: urutkan `a`; `l = 0`, `r = n - 1`. Bila jumlah kurang dari `T`, geser `l`; bila lebih, geser `r`; bila sama dan nilai ujung berbeda, kalikan banyak kembar kiri dan kanan lalu lompati keduanya; bila `a[l] == a[r]`, semua elemen di antaranya kembar dan pasangannya `len * (len - 1) / 2`. Pengurutan `O(n log n)`, penelusuran `O(n)`. Program dengan masukan contoh Kupon Gabungan:

```cpp
#include <algorithm>
#include <iostream>
#include <vector>
using namespace std;

int main() {
  int n;
  int T;
  cin >> n >> T;
  vector<int> a(n);
  for (int& x : a) {
    cin >> x;
  }
  sort(a.begin(), a.end());
  long long hasil = 0;
  int l = 0;
  int r = n - 1;
  while (l < r) {
    int s = a[l] + a[r];
    if (s < T) {
      l++;
    } else if (s > T) {
      r--;
    } else if (a[l] == a[r]) {
      long long len = r - l + 1;
      hasil += len * (len - 1) / 2;
      break;
    } else {
      int cl = 0;
      int cr = 0;
      int x = a[l];
      int y = a[r];
      while (a[l] == x) {
        l++;
        cl++;
      }
      while (a[r] == y) {
        r--;
        cr++;
      }
      hasil += (long long)cl * cr;
    }
  }
  cout << hasil << "\n";
}
```

Masukan:

```text
8 10
3 7 5 5 2 8 5 5
```

Keluaran:

```text
8
```

Jawaban 8 sama dengan solusi A dan B. 2: `n(n - 1) / 2` dengan `n = 200000`:

```cpp
#include <iostream>
using namespace std;

int main() {
  long long n = 200000;
  cout << n * (n - 1) / 2 << "\n";
}
```

```text
19999900000
```

Itu sekitar `2 * 10^10`, melebihi batas `int` (sekitar `2,1 * 10^9`); menyimpannya di `int` meluap dan memberi hasil yang salah. 3: loop ganda menghitung `a[i]` yang belum muncul sebelumnya (`O(n^2)`); cara urut menghitung posisi tempat nilai berubah (`O(n log n)`).

```cpp
#include <algorithm>
#include <iostream>
#include <vector>
using namespace std;

int main() {
  int n;
  cin >> n;
  vector<int> a(n);
  for (int& x : a) {
    cin >> x;
  }
  int beda1 = 0;
  for (int i = 0; i < n; i++) {
    bool muncul = false;
    for (int j = 0; j < i; j++) {
      if (a[j] == a[i]) {
        muncul = true;
      }
    }
    if (!muncul) {
      beda1++;
    }
  }
  sort(a.begin(), a.end());
  int beda2 = 0;
  for (int i = 0; i < n; i++) {
    if (i == 0 || a[i] != a[i - 1]) {
      beda2++;
    }
  }
  cout << beda1 << " " << beda2 << "\n";
}
```

Masukan:

```text
7
4 9 4 1 9 9 2
```

Keluaran:

```text
4 4
```

Keduanya memberi 4 (nilai 1, 2, 4, 9). 4: laporan memuat gagasan loop ganda dan gagasan urut, tabel (`O(n^2)` lawan `O(n log n)`, memori `O(1)` lawan sortir di tempat atau salinan), hasil perbandingan 4 sama 4, dan pilihan cara urut untuk `n` besar.

**Latihan bercampur.** 1: sisa tiap nilai dihitung `((x % m) + m) % m` agar tak negatif; pasangan sisa `r` adalah `(m - r) % m`; hitung banyak sisa yang sudah terlihat, `O(n + m)`. Program dengan masukan karangan:

```cpp
#include <iostream>
#include <vector>
using namespace std;

int main() {
  int n;
  int m;
  cin >> n >> m;
  vector<long long> banyak(m, 0);
  long long hasil = 0;
  for (int i = 0; i < n; i++) {
    long long x;
    cin >> x;
    int r = (int)(((x % m) + m) % m);
    int pasangan = (m - r) % m;
    hasil += banyak[pasangan];
    banyak[r]++;
  }
  cout << hasil << "\n";
}
```

Masukan:

```text
6 5
-3 8 2 7 -2 12
```

Keluaran:

```text
8
```

Empat nilai bersisa 2 dan dua bersisa 3 sehingga `4 * 2 = 8` pasangan. 2: Fenwick; koreksi satu nilai `O(log n)` dan jumlah rentang `prefiks(r) - prefiks(l - 1)` juga `O(log n)`, sedangkan larik jumlah prefiks biasa perlu dibangun ulang `O(n)` tiap koreksi.

## Langkah berikutnya

Modul berikutnya, `a-xii2-m9`, adalah ulasan struktur data: memilih struktur untuk kebutuhan lewat tabel pemilihan. Bawa laporan alternatifmu. Modul terkait: `matkom-pertumbuhan-fungsi`. Bacaan lanjut: halaman cppreference tentang `std::map` dan `std::sort`.
