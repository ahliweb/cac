## Untuk siapa modul ini

Modul ini untuk murid kelas XI jalur A (Algoritmik dengan C++), minggu `A-XI1-M8` silabus v1.4.1: merge sort, quick sort, dan `std::sort`. Prasyarat: modul `a-xi1-m7` (rekursi dan divide-and-conquer) dan `a-x2-m10` (insertion sort).

Modul ini berstatus DRAF: karangan penyusun, belum ditinjau pemilik. Butir `F-AP-a` dan `F-AP-b` dipetakan silabus sebagai dipenuhi jalur ini; modul draf ini belum dihitung sebagai pemenuhan. Keluarga materi OSN yang bertaut: `search-sort`. Merge sort dan quick sort ditandai pengayaan (P) di jembatan OSN: bagian `Pengayaan (P)` boleh dilewati oleh kelas reguler dan dikerjakan murid yang menuju OSN. Modul ini tidak menjanjikan kedalaman soal OSN.

Tiap soal latihan bertanda `AI: boleh` atau `AI: tanpa AI`. Masukan program diberikan lewat berkas: `./program < masukan.txt`. Pemeriksa repositori hanya menyatakan kode bisa dikompilasi; benar atau tidaknya untuk semua masukan tetap kamu uji sendiri.

## Ingat kembali

Jawab dari ingatan dulu, baru cek di kunci. Soal 1 dari `a-xi1-m7`, soal 2 dari `a-xi1-m5`, soal 3 dari `a-x2-m10`.

1. Sebutkan tiga langkah divide-and-conquer dan beri satu contoh.
2. Mengapa greedy benar untuk koin yang tiap nilainya kelipatan nilai di bawahnya?
3. Pada data seperti apa insertion sort paling lambat, dan kira-kira berapa langkahnya?

## Tujuan

Setelah modul ini kamu dapat:

- menelusuri merge sort: membelah, mengurutkan tiap bagian, lalu menggabungkan dua bagian terurut;
- menulis fungsi `gabung` dan menghitung banyak perbandingannya;
- memakai `std::sort` dengan pembanding sendiri untuk mengurutkan menurut dua kunci;
- menyebut perbedaan `sort` dan `stable_sort`, dan memperkirakan kapan pengurutan `O(n log n)` perlu dipakai.

## Prediksi dulu

Ini tugas baca-dan-prediksi, `AI: tanpa AI`. **Tebak dulu, tulis jawabanmu, baru jalankan.** Program menggabungkan dua `vector` yang sudah terurut menaik.

```cpp
#include <iostream>
#include <vector>
using namespace std;

int main() {
  vector<int> a = {2, 5, 9};
  vector<int> b = {3, 4, 10};
  vector<int> hasil;
  int i = 0;
  int j = 0;
  int banding = 0;
  while (i < (int)a.size() && j < (int)b.size()) {
    banding++;
    if (a[i] <= b[j]) {
      hasil.push_back(a[i]);
      i++;
    } else {
      hasil.push_back(b[j]);
      j++;
    }
  }
  while (i < (int)a.size()) {
    hasil.push_back(a[i]);
    i++;
  }
  while (j < (int)b.size()) {
    hasil.push_back(b[j]);
    j++;
  }
  for (int x : hasil) {
    cout << x << " ";
  }
  cout << "\n";
  cout << "perbandingan: " << banding << "\n";
}
```

1. Apa isi `hasil`?
2. Berapa kali dua elemen dibandingkan, dan mengapa elemen `10` tidak pernah dibandingkan lagi di akhir?

Simpan tebakanmu. Perbandingannya ada di bagian berikutnya.

## Contoh terselesaikan

Keluaran program tadi:

```text
2 3 4 5 9 10 
perbandingan: 5
```

Sisa elemen yang tidak perlu dibandingkan disalin begitu saja, karena sisanya sudah terurut. Itu kunci merge sort: **menggabungkan dua bagian terurut yang panjangnya `p` dan `q` memerlukan paling banyak `p + q - 1` perbandingan**. Merge sort memakai itu secara rekursif: bagi larik menjadi dua, urutkan tiap bagian dengan merge sort juga, lalu gabungkan. Bagian dengan satu elemen atau kurang sudah terurut; itulah kasus dasarnya.

```cpp
#include <iostream>
#include <vector>
using namespace std;

void gabung(vector<int>& v, int kiri, int tengah, int kanan, vector<int>& bantu, long long& banding) {
  int i = kiri;
  int j = tengah;
  int k = kiri;
  while (i < tengah && j < kanan) {
    banding++;
    if (v[i] <= v[j]) {
      bantu[k] = v[i];
      i++;
    } else {
      bantu[k] = v[j];
      j++;
    }
    k++;
  }
  while (i < tengah) {
    bantu[k] = v[i];
    i++;
    k++;
  }
  while (j < kanan) {
    bantu[k] = v[j];
    j++;
    k++;
  }
  for (int x = kiri; x < kanan; x++) {
    v[x] = bantu[x];
  }
}

void urutGabung(vector<int>& v, int kiri, int kanan, vector<int>& bantu, long long& banding) {
  if (kanan - kiri <= 1) {
    return;
  }
  int tengah = kiri + (kanan - kiri) / 2;
  urutGabung(v, kiri, tengah, bantu, banding);
  urutGabung(v, tengah, kanan, bantu, banding);
  gabung(v, kiri, tengah, kanan, bantu, banding);
}

int main() {
  int ukuran[4] = {8, 64, 512, 4096};
  for (int u = 0; u < 4; u++) {
    int n = ukuran[u];
    vector<int> v(n);
    for (int i = 0; i < n; i++) {
      v[i] = (i * 37) % n;
    }
    vector<int> bantu(n);
    long long banding = 0;
    urutGabung(v, 0, n, bantu, banding);
    bool terurut = true;
    for (int i = 1; i < n; i++) {
      if (v[i - 1] > v[i]) {
        terurut = false;
      }
    }
    cout << "n = " << n << ": " << banding << " perbandingan, bubble sort " << (long long)n * (n - 1) / 2 << ", terurut: " << (terurut ? "ya" : "tidak") << "\n";
  }
}
```

Keluaran:

```text
n = 8: 17 perbandingan, bubble sort 28, terurut: ya
n = 64: 318 perbandingan, bubble sort 2016, terurut: ya
n = 512: 3766 perbandingan, bubble sort 130816, terurut: ya
n = 4096: 37177 perbandingan, bubble sort 8386560, terurut: ya
```

Data karangan ini `(i * 37) % n` adalah susunan acak-semu. Pembelahan menghasilkan sekitar `log2 n` tingkat, dan tiap tingkat menggabungkan seluruh `n` elemen dengan paling banyak `n` perbandingan. Untuk `n = 4096` ada 12 tingkat, jadi batas atasnya sekitar `4096 * 12 = 49152`; angka sebenarnya lebih kecil dan jauh di bawah 8.386.560 milik bubble sort. Jadi merge sort `O(n log n)`, sedangkan bubble sort `O(n^2)`. Harganya: larik `bantu` seukuran data.

Dalam praktik kamu jarang menulis pengurut sendiri. `std::sort` dari `<algorithm>` berkompleksitas `O(n log n)` perbandingan (cppreference), dan menerima **pembanding**: fungsi yang mengembalikan `true` bila `a` harus berada sebelum `b`. Pembanding harus menyatakan "lebih dulu secara tegas": `a` sebelum `a` itu salah, sehingga ia memakai `<`, bukan `<=`. Berikut urutan dua kunci pada data karangan: skor menurun, lalu kode menaik bila skornya sama.

```cpp
#include <algorithm>
#include <iostream>
#include <string>
#include <vector>
using namespace std;

struct Peserta {
  string kode;
  int skor;
};

bool lebihDulu(const Peserta& a, const Peserta& b) {
  if (a.skor != b.skor) {
    return a.skor > b.skor;
  }
  return a.kode < b.kode;
}

int main() {
  vector<Peserta> p = {{"P03", 80}, {"P01", 95}, {"P07", 80}, {"P02", 95}, {"P05", 70}};
  sort(p.begin(), p.end(), lebihDulu);
  for (const Peserta& x : p) {
    cout << x.kode << " " << x.skor << "\n";
  }
}
```

Keluaran:

```text
P01 95
P02 95
P03 80
P07 80
P05 70
```

`std::sort` tidak menjamin urutan elemen yang dianggap setara tetap seperti semula; bila itu penting, pakai `std::stable_sort`. Dengan pembanding dua kunci di atas tidak ada elemen setara, karena kode berbeda-beda.

## Contoh setengah jadi

Lengkapi pembanding yang mengurutkan kata menurut panjang menaik, lalu menurut abjad bila panjangnya sama.

```cpp setengah-jadi
bool lebihDulu(const string& a, const string& b) {
  if (a.size() != b.size()) {
    return a.size() ____ b.size();
  }
  return a ____ b;
}
```

## Soal Parsons

Susun delapan baris berikut (sudah diacak) menjadi badan fungsi `gabung` yang menggabungkan `a` dan `b` yang terurut menjadi `hasil`. `AI: tanpa AI`: tujuannya melatih membaca urutan.

```text
(a)   while (i < a.size() && j < b.size()) {
(b)     if (a[i] <= b[j]) { hasil.push_back(a[i]); i++; }
(c)     else { hasil.push_back(b[j]); j++; }
(d)   }
(e)   int i = 0, j = 0;
(f)   while (i < a.size()) { hasil.push_back(a[i]); i++; }
(g)   while (j < b.size()) { hasil.push_back(b[j]); j++; }
(h)   vector<int> hasil;
```

## Latihan

1. `AI: boleh` **Dua kunci dari masukan.** Baca `n`, lalu `n` pasang `nama nilai`. Urutkan dengan `std::sort` menurut nilai menurun, lalu nama menaik, dan cetak. Tulis pseudocode lebih dulu.
2. `AI: tanpa AI` **Telusuri.** Gabungkan `1 4 6` dan `2 3 7` seperti `gabung`: tulis hasilnya dan banyak perbandingan.
3. `AI: boleh` **Stabil.** Urutkan pasangan `(kode, skor)` hanya menurut skor dengan `std::stable_sort`. Apa bedanya dengan `sort` bila ada skor sama?
4. `AI: boleh` **Hitung tingkat.** Untuk `n = 8`, berapa tingkat pembelahan dan berapa batas atas perbandingan merge sort `n * log2 n`? Bandingkan dengan keluaran contoh.
5. *Opsional:* **catatan pemakaian AI.** Bila memakai AI generatif, jawab nomor 2 sendiri dulu, lalu minta penjelasan atau petunjuk bertahap, bukan program jadi. Catat alatnya, tujuanmu, garis besar perintahmu, bagian yang kamu pakai, dan caramu memeriksanya. Jangan menaruh data pribadi atau tugas bernilai pada perintah.

## Latihan bercampur

1. `AI: boleh` Urutkan sebuah `vector` lalu jawab tiga pertanyaan "ada atau tidak" dengan pencarian biner buatanmu (modul `a-x2-m8`).
2. `AI: tanpa AI` Berapa banyak geseran yang dilakukan insertion sort pada `4 3 2 1` (modul `a-x2-m10`)?
3. `AI: boleh` Berapa kali `urutGabung` dipanggil untuk `n = 8`, termasuk panggilan kasus dasar? Gambar pohon pemanggilannya (modul `a-xi1-m7`).

## Pengayaan (P)

Bagian ini boleh dilewati. **Quick sort** juga membagi, tetapi urutannya berbeda: pilih satu **pivot**, pindahkan yang lebih kecil ke kiri dan yang lebih besar ke kanan (*partisi*), lalu urutkan kedua sisi. Tidak perlu larik bantu, namun jaminannya berbeda: bila pivot terus jatuh di ujung, pembagiannya timpang dan langkahnya `O(n^2)`. Program berikut memakai elemen terakhir sebagai pivot dan menghitung perbandingan pada data yang sudah terurut dan data acak-semu.

```cpp
#include <iostream>
#include <vector>
using namespace std;

void urutCepat(vector<int>& v, int kiri, int kanan, long long& banding) {
  if (kanan - kiri <= 1) {
    return;
  }
  int pivot = v[kanan - 1];
  int batas = kiri;
  for (int i = kiri; i < kanan - 1; i++) {
    banding++;
    if (v[i] < pivot) {
      swap(v[i], v[batas]);
      batas++;
    }
  }
  swap(v[batas], v[kanan - 1]);
  urutCepat(v, kiri, batas, banding);
  urutCepat(v, batas + 1, kanan, banding);
}

int main() {
  int n = 1000;
  vector<int> terurut(n);
  vector<int> acak(n);
  for (int i = 0; i < n; i++) {
    terurut[i] = i;
    acak[i] = (i * 7919) % n;
  }
  long long b1 = 0;
  long long b2 = 0;
  urutCepat(terurut, 0, n, b1);
  urutCepat(acak, 0, n, b2);
  cout << "terurut: " << b1 << " perbandingan\n";
  cout << "acak-semu: " << b2 << " perbandingan\n";
}
```

Keluaran:

```text
terurut: 499500 perbandingan
acak-semu: 11414 perbandingan
```

Pada data terurut hasilnya `n * (n - 1) / 2 = 499500`, tepat kasus terburuk. Itu sebabnya implementasi nyata memilih pivot lebih hati-hati; cppreference menyatakan `std::sort` tetap `O(n log n)` pada kasus terburuk.

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `a-xi1-m9` (pertanyaan 1), sekitar tiga minggu lagi di `a-xi1-m11` (pertanyaan 2), dan sekitar delapan minggu lagi di `a-xi2-m2` (pertanyaan 3). Jawab sekarang lalu simpan.

1. Mengapa pembanding untuk `std::sort` memakai `<`, bukan `<=`?
2. Kira-kira berapa perbandingan merge sort untuk `n = 1024`, dan berapa untuk bubble sort?
3. Mengapa merge sort memerlukan larik bantu, dan apa akibatnya pada pemakaian memori?

## Kesalahan umum

- **Pembanding memakai `<=`.** Dua elemen setara membuatnya mengatakan "a sebelum b" sekaligus "b sebelum a"; perilaku `sort` menjadi tak terjamin. Pakai `<` atau `>`.
- **Salah menghitung batas gabungan.** Setengah terbuka `[kiri, tengah)` dan `[tengah, kanan)` konsisten; mencampur dengan batas tertutup menggandakan atau menghilangkan satu elemen.
- **Lupa menyalin sisa.** Setelah satu bagian habis, sisa bagian lain harus disalin; tanpa itu data hilang.
- **Mengira `std::sort` stabil.** Elemen setara bisa bertukar urutan; pakai `stable_sort` bila urutan asal penting.
- **Mengira quick sort selalu cepat.** Tanpa pemilihan pivot yang baik, data terurut menjadi kasus terburuk.

## Cek mandiri

- [ ] Saya dapat menelusuri `gabung` untuk dua larik terurut.
- [ ] Saya dapat menjelaskan merge sort sebagai membagi, mengurutkan, dan menggabungkan.
- [ ] Saya dapat menulis pembanding dua kunci untuk `std::sort`.
- [ ] Saya dapat menyebut beda `sort` dan `stable_sort`.
- [ ] Saya menulis pseudocode sebelum programnya.

## Kunci dan petunjuk

**Ingat kembali.** 1: bagi masalah menjadi bagian yang lebih kecil, selesaikan tiap bagian (rekursif), gabungkan hasilnya; contoh: pencarian biner atau pangkat cepat. 2: bila solusi terbaik tidak memakai koin terbesar yang masih muat, koin-koin kecilnya yang berjumlah sama dapat ditukar dengan satu koin besar karena nilainya kelipatan, tanpa menambah jumlah koin. 3: pada data terbalik; sekitar `n * (n - 1) / 2` langkah.

**Prediksi dulu.** 1: `2 3 4 5 9 10`. 2: lima perbandingan: `2:3`, `5:3`, `5:4`, `5:10`, `9:10`. Setelah `9` dipakai, `a` habis dan sisa `b` (yaitu `10`) langsung disalin.

**Contoh setengah jadi.** Isi: `<` dan `<`. Program lengkap:

```cpp
#include <algorithm>
#include <iostream>
#include <string>
#include <vector>
using namespace std;

bool lebihDulu(const string& a, const string& b) {
  if (a.size() != b.size()) {
    return a.size() < b.size();
  }
  return a < b;
}

int main() {
  vector<string> k = {"kiwi", "apel", "pir", "jeruk", "ara"};
  sort(k.begin(), k.end(), lebihDulu);
  for (const string& s : k) {
    cout << s << " ";
  }
  cout << "\n";
}
```

Keluaran:

```text
ara pir apel kiwi jeruk 
```

**Soal Parsons.** Urutan benar: h, e, a, b, c, d, f, g. Deklarasi dulu, lalu perulangan utama, lalu dua perulangan sisa.

**Latihan.** 1: pseudocode: baca `n` pasang ke `vector`; urutkan dengan pembanding (nilai lebih besar dulu, nama lebih kecil bila sama); cetak. Program contoh:

```cpp
#include <algorithm>
#include <iostream>
#include <string>
#include <vector>
using namespace std;

struct Murid {
  string nama;
  int nilai;
};

bool lebihDulu(const Murid& a, const Murid& b) {
  if (a.nilai != b.nilai) {
    return a.nilai > b.nilai;
  }
  return a.nama < b.nama;
}

int main() {
  int n;
  cin >> n;
  vector<Murid> m(n);
  for (int i = 0; i < n; i++) {
    cin >> m[i].nama >> m[i].nilai;
  }
  sort(m.begin(), m.end(), lebihDulu);
  for (const Murid& x : m) {
    cout << x.nama << " " << x.nilai << "\n";
  }
}
```

Masukan (`masukan.txt`):

```text
5
tiga 80
satu 95
tujuh 80
dua 95
lima 70
```

Keluaran:

```text
dua 95
satu 95
tiga 80
tujuh 80
lima 70
```

2: hasil `1 2 3 4 6 7` dengan lima perbandingan: `1:2`, `4:2`, `4:3`, `4:7`, `6:7`. 3: dengan `stable_sort` elemen berskor sama tetap dalam urutan masukan; dengan `sort` urutannya boleh berubah. Contoh:

```cpp
#include <algorithm>
#include <iostream>
#include <string>
#include <utility>
#include <vector>
using namespace std;

bool menurutSkor(const pair<string, int>& a, const pair<string, int>& b) {
  return a.second > b.second;
}

int main() {
  vector<pair<string, int>> p = {{"C", 80}, {"A", 95}, {"B", 80}, {"D", 95}};
  stable_sort(p.begin(), p.end(), menurutSkor);
  for (const auto& x : p) {
    cout << x.first << " " << x.second << "\n";
  }
}
```

Keluaran:

```text
A 95
D 95
C 80
B 80
```

4: `log2 8 = 3` tingkat, batas atas `8 * 3 = 24` perbandingan; keluaran contoh untuk `n = 8` menunjukkan angka sebenarnya, yang tidak melebihi batas itu.

**Latihan bercampur.** 1: urutkan dulu (`sort`), lalu pencarian biner seperti di `a-x2-m8`. 2: `4 3 2 1`: `1 + 2 + 3 = 6` geseran. 3: `urutGabung` dipanggil 15 kali untuk `n = 8` (`2n - 1`): 1 pemanggilan awal, 2, 4, dan 8 pemanggilan kasus dasar.

**Pengayaan (P).** Tidak ada kunci tunggal; pastikan kamu dapat menjelaskan mengapa data terurut dengan pivot terakhir memberi pembagian `0` dan `n - 1`.

**Ulang berjarak.** 1: karena dua elemen setara tidak boleh dinyatakan saling mendahului; `<=` melanggar aturan itu. 2: merge sort sekitar `1024 * 10 = 10240` (batas atas); bubble sort `1024 * 1023 / 2 = 523776`. 3: karena penggabungan menulis hasil ke tempat lain sebelum disalin balik; ia memakai tambahan memori sebesar data.

## Langkah berikutnya

Modul berikut: `a-xi1-m9` (pustaka standar: `pair`, `set`, `map`). Bacaan lanjut: halaman cppreference tentang `std::sort` dan `std::stable_sort`.
