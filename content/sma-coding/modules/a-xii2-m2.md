## Untuk siapa modul ini

Modul ini untuk murid kelas XII jalur A (Algoritmik dengan C++), minggu `A-XII2-M2` silabus v1.4.1: pemeliharaan program II, yaitu mengoptimalkan solusi dan mencatat alasannya. Prasyarat: modul `a-xii2-m1` (pemeliharaan program I).

Modul ini berstatus DRAF: karangan penyusun, belum ditinjau pemilik. Butir `F-AP-c` dipetakan silabus sebagai dipenuhi jalur ini; modul draf ini belum dihitung sebagai pemenuhan. Silabus tidak memetakan keluarga materi OSN untuk minggu ini.

Siapkan satu solusi lambat milikmu; di akhir kamu menulis catatan optimasi untuknya. Tiap soal latihan bertanda `AI: boleh` atau `AI: tanpa AI`. Masukan program diberikan lewat berkas: `./program < masukan.txt`. Semua data karangan.

## Ingat kembali

Jawab dari ingatan dulu, baru cek di kunci. Soal 1 dari `a-xii2-m1`, soal 2 dari `a-xii1-m13`, soal 3 dari `a-xii1-m8`.

1. Mengapa refaktor harus didahului uji yang merekam keluaran program lama?
2. Mengapa memilih Fenwick untuk jumlah dan segment tree untuk minimum pada proyek contoh?
3. Mengapa `-17 % 5` bernilai `-2` di C++, dan bagaimana mendapat sisa di `0` sampai `4`?

## Tujuan

Setelah modul ini kamu dapat:

- mengukur banyak langkah sebuah program dengan penghitung, bukan menebak;
- menemukan bagian yang menghabiskan paling banyak langkah dan mengubah hanya bagian itu;
- membuktikan versi cepat memberi jawaban yang sama dengan versi lambat lewat uji pembanding;
- menulis catatan optimasi: masalah, bukti, perubahan, hasil, dan harga yang dibayar (keluaran minggu ini: catatan optimasi).

## Prediksi dulu

Ini tugas baca-dan-prediksi, `AI: tanpa AI`. **Tebak dulu, tulis jawabanmu, baru jalankan.** Perulangan bersarang ini menghitung berapa kali isi perulangan dalam dijalankan.

```cpp
#include <iostream>
using namespace std;

int main() {
  int n = 6;
  int langkah = 0;
  for (int i = 0; i < n; i++) {
    for (int j = i + 1; j < n; j++) {
      langkah++;
    }
  }
  cout << langkah << "\n";
}
```

1. Berapa yang tercetak untuk `n = 6`?
2. Tebak rumus umumnya dalam `n`, lalu perkirakan hasilnya untuk `n = 2000`.

## Contoh terselesaikan

Keluaran program tadi:

```text
15
```

Itu `6 * 5 / 2`: tiap pasangan indeks `i < j` diperiksa sekali, jadi isinya berjalan `n * (n - 1) / 2` kali, kuadratik dalam `n`. Untuk `n = 2000` berarti hampir dua juta langkah.

**Aturan: ukur dulu, baru ubah.** Optimasi berdasarkan tebakan sering menyasar bagian yang salah. Pasang penghitung langkah pada bagian yang dicurigai dan lihat angkanya. Masalah karangan: diberi `n` bilangan antara 0 dan 1000 dan sebuah `target`, hitung banyak pasangan indeks `i < j` dengan `a[i] + a[j] = target`. Versi lambat memeriksa semua pasangan. Versi cepat memanfaatkan batas nilai: hitung dulu berapa kali tiap nilai muncul, lalu pasangkan nilai `v` dengan `target - v`. Bila `v` sama dengan `target - v`, pasangannya `f * (f - 1) / 2`; bila berbeda, `f(v) * f(target - v)`, dan tiap nilai hanya dipasangkan dari sisi yang lebih kecil agar tak terhitung dua kali.

Bagian terakhir program membandingkan keduanya pada 300 masukan acak kecil berbenih tetap: itulah **uji pembanding**, jaring pengaman optimasi.

```cpp
#include <iostream>
#include <vector>
using namespace std;

const int NILAI_MAKS = 1000;

long long lambat(const vector<int>& a, int target, long long& langkah) {
  long long pasangan = 0;
  for (size_t i = 0; i < a.size(); i++) {
    for (size_t j = i + 1; j < a.size(); j++) {
      langkah++;
      if (a[i] + a[j] == target) {
        pasangan++;
      }
    }
  }
  return pasangan;
}

long long cepat(const vector<int>& a, int target, long long& langkah) {
  vector<long long> frek(NILAI_MAKS + 1, 0);
  for (int x : a) {
    langkah++;
    frek[x]++;
  }
  long long pasangan = 0;
  for (int v = 0; v <= NILAI_MAKS; v++) {
    langkah++;
    int w = target - v;
    if (w < v || w > NILAI_MAKS) {
      continue;
    }
    if (w == v) {
      pasangan += frek[v] * (frek[v] - 1) / 2;
    } else {
      pasangan += frek[v] * frek[w];
    }
  }
  return pasangan;
}

vector<int> bangkitkan(int n, unsigned seed) {
  vector<int> a(n);
  unsigned s = seed;
  for (int& x : a) {
    s = s * 1103515245u + 12345u;
    x = static_cast<int>((s >> 16) % (NILAI_MAKS + 1));
  }
  return a;
}

int main() {
  int n = 2000;
  int target = 1000;
  vector<int> a = bangkitkan(n, 7);
  long long langkahLambat = 0;
  long long langkahCepat = 0;
  long long p1 = lambat(a, target, langkahLambat);
  long long p2 = cepat(a, target, langkahCepat);
  cout << "n = " << n << ", target = " << target << "\n";
  cout << "lambat: " << p1 << " pasangan, " << langkahLambat << " langkah\n";
  cout << "cepat : " << p2 << " pasangan, " << langkahCepat << " langkah\n";

  int beda = 0;
  for (int uji = 0; uji < 300; uji++) {
    vector<int> b = bangkitkan(1 + uji % 60, 100 + uji);
    long long l1 = 0;
    long long l2 = 0;
    if (lambat(b, 500 + uji, l1) != cepat(b, 500 + uji, l2)) {
      beda++;
    }
  }
  cout << "uji pembanding: " << beda << " selisih dari 300 uji\n";
}
```

Keluaran:

```text
n = 2000, target = 1000
lambat: 2070 pasangan, 1999000 langkah
cepat : 2070 pasangan, 3001 langkah
uji pembanding: 0 selisih dari 300 uji
```

Jawabannya sama, 2070, tetapi langkahnya turun dari 1.999.000 menjadi 3001, sekitar 666 kali lebih sedikit. Versi lambat `O(n^2)`; versi cepat `O(n + V)` dengan `V` batas nilai (di sini 1000). Bila `n = 10^5`, selisihnya makin lebar: `O(n^2)` sekitar `5 * 10^9` langkah, sedangkan `O(n + V)` sekitar `10^5` langkah.

Harganya: versi cepat hanya benar bila nilai berada dalam `0..1000` dan memakai memori `V`. Hal ini harus ditulis, bukan disembunyikan. Satu baris catatan optimasi memuat enam hal:

| Kolom | Isi untuk contoh ini |
| --- | --- |
| Masalah | Menghitung pasangan berjumlah target terlalu lambat untuk `n` besar |
| Bukti | Penghitung: 1.999.000 langkah untuk `n = 2000` |
| Perubahan | Hitung frekuensi nilai, pasangkan `v` dengan `target - v` |
| Hasil | 3001 langkah; jawaban sama pada 300 uji pembanding |
| Harga | Hanya untuk nilai `0..1000`; memori tambahan `V` |
| Cara memeriksa | Uji pembanding berbenih tetap, termasuk nilai kembar dan `target` ganjil |

## Contoh setengah jadi

Lengkapi bagian versi cepat. Kuncinya ada di `Kunci dan petunjuk`.

```cpp setengah-jadi
  vector<long long> frek(____ + 1, 0);
  for (int x : a) {
    langkah++;
    frek[____]++;
  }
  // ... untuk nilai v yang sama dengan target - v:
  pasangan += frek[v] * (frek[v] - ____) / ____;
```

## Soal Parsons

Susun tujuh baris berikut (sudah diacak, tanpa lekuk) menjadi perulangan kedua fungsi `cepat`. `AI: tanpa AI`: tujuannya melatih membaca urutan.

```text
(a) }
(b) int w = target - v;
(c) if (w < v || w > NILAI_MAKS) {
(d) continue;
(e) }
(f) for (int v = 0; v <= NILAI_MAKS; v++) {
(g) langkah++;
```

## Latihan

1. `AI: boleh` **Solusi lambatmu.** Pilih satu solusi lambat milikmu. Pasang penghitung langkah, ukur untuk dua ukuran masukan, tentukan bagian yang paling boros, ubah hanya bagian itu, dan tulis catatan optimasi enam kolom.
2. `AI: tanpa AI` **Perkiraan.** Untuk `n = 10^5` dan `NILAI_MAKS = 1000`, perkirakan langkah `lambat` dan `cepat`. Mengapa `pasangan` harus `long long`?
3. `AI: boleh` **Percepat.** Hitung banyak pasangan indeks `i < j` dengan `(a[i] + a[j])` habis dibagi 7, untuk `n` sampai `10^5` dan nilai sampai `10^9`. Tulis pseudocode lebih dulu. Uji dengan `n = 1` dan nilai negatif.
4. `AI: boleh` **Uji pembanding.** Untuk nomor 3, tulis versi lambat sederhana dan pembanding berbenih tetap pada ukuran kecil, dan laporkan banyak selisih.
5. *Opsional:* **catatan pemakaian AI.** Bila memakai AI generatif, kerjakan nomor 2 sendiri dulu, lalu minta penjelasan atau petunjuk bertahap, bukan program jadi. Catat alatnya, tujuanmu, garis besar perintahmu, bagian yang kamu pakai, dan caramu memeriksanya. Jangan menaruh data pribadi atau tugas bernilai pada perintah.

## Latihan bercampur

1. `AI: tanpa AI` Untuk `10^5` pembaruan dan `10^5` kueri jumlah rentang, mengapa Fenwick lebih baik daripada larik jumlah prefiks biasa (modul `a-xii1-m9`)?
2. `AI: boleh` Pada nomor 3 tadi nilai bisa negatif. Mengapa `x % 7` saja tidak cukup, dan apa perbaikannya (modul `a-xii1-m8`)?
3. `AI: boleh` Versi lambat memanggil `a.size()` di tiap putaran. Apakah itu masalah utama versi lambat? Jawab dengan hitungan langkah, bukan dengan firasat (modul `a-x2-m12`).

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `a-xii2-m3` (pertanyaan 1), sekitar tiga minggu lagi di `a-xii2-m5` (pertanyaan 2), dan sekitar delapan minggu lagi di `a-xii2-m10` (pertanyaan 3). Jawab sekarang lalu simpan.

1. Mengapa mengukur banyak langkah lebih dulu daripada mengoptimalkan berdasarkan firasat?
2. Apa saja enam isi satu baris catatan optimasi?
3. Apa risiko mengoptimalkan tanpa uji pembanding?

## Kesalahan umum

- **Mengoptimalkan tanpa mengukur.** Bagian yang kamu curigai belum tentu yang paling boros.
- **Tanpa uji pembanding.** Versi cepat yang salah lebih berbahaya daripada versi lambat yang benar.
- **Menyembunyikan harga optimasi.** Batas nilai, memori tambahan, dan kode yang lebih sulit dibaca harus dicatat.
- **Mengira langkah sama dengan waktu.** Penghitung langkah memberi perbandingan yang stabil; waktu jalan berubah dari mesin ke mesin.
- **Mengoptimalkan yang sudah cukup cepat.** Bila batas soal terpenuhi dengan margin, kode yang lebih sederhana lebih berharga.

## Cek mandiri

- [ ] Saya dapat memasang penghitung langkah dan membaca hasilnya.
- [ ] Saya dapat menyebut bagian yang paling boros dengan bukti angka.
- [ ] Saya menulis uji pembanding berbenih tetap sebelum mengganti solusi.
- [ ] Saya dapat menyebut harga yang dibayar sebuah optimasi.
- [ ] Saya dapat menulis satu baris catatan optimasi lengkap.

## Kunci dan petunjuk

**Ingat kembali.** 1: tanpa rekaman keluaran lama kamu tak punya bukti bahwa perilaku tak berubah; rekaman itulah yang dibandingkan sesudah tiap perubahan kecil. 2: jumlah bisa dikurangkan (jumlah rentang = prefiks `r` dikurang prefiks `l - 1`), sehingga Fenwick yang pendek dan cepat cukup; minimum tak punya pengurangan, sehingga perlu segment tree yang menyimpan jawaban tiap rentang; keduanya sekitar `log n` langkah. 3: C++ membulatkan hasil bagi ke arah nol, sehingga `-17 = (-3) * 5 + (-2)` dan sisa mengikuti tanda yang dibagi; sisa di `0` sampai `4` didapat dengan `((x % 5) + 5) % 5`, yaitu `3`.

**Prediksi dulu.** 1: `15`. 2: `n * (n - 1) / 2`; untuk `n = 2000` hasilnya `1999000`.

**Contoh setengah jadi.** Isi: `NILAI_MAKS`, `x`, `1`, dan `2`. Rumus `f * (f - 1) / 2` memilih dua dari `f` kemunculan tanpa memperhatikan urutan.

**Soal Parsons.** Urutan: f, g, b, c, d, e, a. Baris f membuka perulangan, g menghitung langkah, b menghitung pasangan nilai, c dan d melewati nilai tanpa pasangan, e menutup `if`, a menutup perulangan.

**Latihan.** 1: catatan yang baik menunjukkan angka langkah sebelum dan sesudah, jawaban yang sama pada uji pembanding, dan satu harga. 2: lambat `10^5 * (10^5 - 1) / 2 = 4999950000` langkah, cepat sekitar `10^5 + 1001 = 101001` langkah, selisih sekitar 49.500 kali. Hasil pasangan bisa mencapai sekitar `5 * 10^9`, melebihi batas `int` (sekitar `2,1 * 10^9`). 3: hitung berapa nilai bersisa `0` sampai `6` bila dibagi 7; pasangan sisa `0` dengan `0` berjumlah `f * (f - 1) / 2`, dan pasangan sisa `r` dengan `7 - r` berjumlah `f(r) * f(7 - r)` untuk `r` 1 sampai 3.

```cpp
#include <iostream>
using namespace std;

int main() {
  int n;
  cin >> n;
  long long sisa[7] = {0, 0, 0, 0, 0, 0, 0};
  for (int i = 0; i < n; i++) {
    int x;
    cin >> x;
    sisa[((x % 7) + 7) % 7]++;
  }
  long long pasangan = sisa[0] * (sisa[0] - 1) / 2;
  for (int r = 1; r <= 3; r++) {
    pasangan += sisa[r] * sisa[7 - r];
  }
  cout << pasangan << "\n";
}
```

Masukan (`masukan.txt`):

```text
6
3 4 10 11 7 14
```

Keluaran:

```text
5
```

Cek dengan tangan: pasangan `(3, 4)`, `(3, 11)`, `(4, 10)`, `(10, 11)`, dan `(7, 14)`: lima. Nilai negatif ditangani oleh `((x % 7) + 7) % 7`. Versi lambatnya cukup dua perulangan; langkahnya `O(n^2)` melawan `O(n)` untuk versi frekuensi sisa. 4: bangkitkan masukan kecil dengan pembangkit berbenih tetap seperti pada contoh terselesaikan, jalankan keduanya, dan hitung berapa kali jawabannya berbeda; target 0 selisih.

**Latihan bercampur.** 1: larik prefiks menjawab kueri dalam satu langkah tetapi tiap pembaruan menggeser `O(n)` entri, jadi `10^5 * 10^5` langkah untuk pembaruan; Fenwick `O(log n)` untuk keduanya. 2: sisa bilangan negatif bernilai negatif, sehingga indeks `sisa[]` bisa negatif dan di luar larik; perbaikannya `((x % 7) + 7) % 7`. 3: bukan masalah utama: pemanggilan itu bernilai satu langkah per putaran, sedangkan kuadratiknya `n(n-1)/2` putaran; ukur dan lihat bahwa jumlah putaran, bukan pemanggilan `size()`, yang mendominasi.

## Langkah berikutnya

Modul berikutnya, `a-xii2-m3` (memodelkan masalah), memakai kebiasaan menghitung langkah untuk memilih graf atau DP dari soal cerita. Modul terkait: `matkom-pertumbuhan-fungsi`. Bacaan lanjut: halaman cppreference tentang `std::vector` dan halaman opsi peringatan GCC.
