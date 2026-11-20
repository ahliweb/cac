## Untuk siapa modul ini

Modul ini untuk murid kelas XI jalur A (Algoritmik dengan C++), minggu `A-XI1-M4` silabus v1.4.1: pencarian lengkap dan pemangkasan. Prasyarat: modul `a-xi1-m3` (pencarian lengkap).

Modul ini berstatus DRAF: karangan penyusun, belum ditinjau pemilik. Butir `F-AP-a`, `F-AP-b`, dan `F-BK-b` dipetakan silabus sebagai dipenuhi jalur ini; modul draf ini belum dihitung sebagai pemenuhan. Keluarga materi OSN yang bertaut: `strategi-problem-solving` (pencarian lengkap dan pemangkasan ditandai pengayaan di jembatan silabus; bagian `Pengayaan (P)` boleh dilewati). Modul tidak menjanjikan kedalaman soal OSN dan tidak menggantikan pembinaan OSN.

Bila kamu pernah memakai Python: gagasannya sama dengan `break` atau `return` dini di dalam rekursi. Tiap soal latihan bertanda `AI: boleh` atau `AI: tanpa AI`. Masukan program diberikan lewat berkas: `./program < masukan.txt`.

## Ingat kembali

Jawab dari ingatan dulu, baru cek di kunci. Soal 1 dari `a-xi1-m3`, soal 2 dari `a-xi1-m1`, soal 3 dari `a-x2-m10`.

1. Berapa banyak subhimpunan sebuah himpunan `n` elemen, dan mengapa?
2. Mengapa spesifikasi perlu menyebut batasan, misalnya `1 <= n <= 1000`?
3. Mengapa elemen yang akan disisipkan harus disimpan di variabel sebelum elemen lain digeser?

## Tujuan

Setelah modul ini kamu dapat:

- menjelaskan kapan sebuah cabang pencarian boleh dipangkas tanpa kehilangan jawaban;
- menambahkan pemangkasan pada rekursi pencarian lengkap dan membandingkan banyak pemanggilannya;
- menjelaskan mengapa urutan data memengaruhi seberapa banyak yang terpangkas;
- (pengayaan) memangkas dengan batas optimistis pada masalah yang mencari nilai terbaik.

## Prediksi dulu

Ini tugas baca-dan-prediksi, `AI: tanpa AI`. **Tebak dulu, tulis jawabanmu, baru jalankan.** Semua bilangan positif. Dua fungsi menghitung banyak subhimpunan berjumlah paling banyak `batas`: yang pertama memeriksa di ujung rekursi, yang kedua langsung berhenti begitu jumlahnya melewati batas.

```cpp
#include <iostream>
#include <vector>
using namespace std;

int a[4] = {5, 4, 3, 2};
int batas = 6;
int panggilanA = 0;
int panggilanB = 0;

int hitungA(int i, int jumlah) {
  panggilanA++;
  if (i == 4) {
    return jumlah <= batas ? 1 : 0;
  }
  return hitungA(i + 1, jumlah) + hitungA(i + 1, jumlah + a[i]);
}

int hitungB(int i, int jumlah) {
  panggilanB++;
  if (jumlah > batas) {
    return 0;
  }
  if (i == 4) {
    return 1;
  }
  return hitungB(i + 1, jumlah) + hitungB(i + 1, jumlah + a[i]);
}

int main() {
  cout << hitungA(0, 0) << " " << panggilanA << "\n";
  cout << hitungB(0, 0) << " " << panggilanB << "\n";
}
```

1. Apakah kedua fungsi mencetak jawaban yang sama? Berapa banyak subhimpunan?
2. Mana yang melakukan lebih sedikit pemanggilan? Bila tebakanmu 31 untuk yang pertama, dari mana angka itu?

Simpan tebakanmu. Perbandingannya ada di bagian berikutnya.

## Contoh terselesaikan

Keluaran program tadi:

Keluaran:

```text
7 31
7 21
```

Jawabannya sama, 7 subhimpunan (`{}`, `{5}`, `{4}`, `{3}`, `{2}`, `{4, 2}`, dan `{3, 2}`), tetapi pemanggilannya berbeda. Yang pertama selalu `2^5 - 1 = 31` pemanggilan. **Pemangkasan** (*pruning*) membuang cabang yang pasti tak menghasilkan jawaban baru. Syaratnya penting: bila semua bilangan positif dan `jumlah` sudah melewati batas, menambah elemen hanya membuatnya makin besar, sehingga seluruh cabang di bawahnya tak mungkin memenuhi. Membuangnya tidak menghilangkan satu jawaban pun; hanya kerja yang sia-sia yang hilang. Program berikut membandingkan keduanya pada data lebih besar, dengan bilangan diurutkan menurun.

```cpp
#include <iostream>
#include <vector>
using namespace std;

long long panggilanA = 0;
long long panggilanB = 0;

long long hitungA(const vector<int>& a, int i, int jumlah, int batas) {
  panggilanA++;
  if (i == (int)a.size()) {
    return jumlah <= batas ? 1 : 0;
  }
  return hitungA(a, i + 1, jumlah, batas) + hitungA(a, i + 1, jumlah + a[i], batas);
}

long long hitungB(const vector<int>& a, int i, int jumlah, int batas) {
  panggilanB++;
  if (jumlah > batas) {
    return 0;
  }
  if (i == (int)a.size()) {
    return 1;
  }
  return hitungB(a, i + 1, jumlah, batas) + hitungB(a, i + 1, jumlah + a[i], batas);
}

int main() {
  int n, batas;
  cin >> n >> batas;
  vector<int> a(n);
  for (int i = 0; i < n; i++) {
    cin >> a[i];
  }
  long long jawabA = hitungA(a, 0, 0, batas);
  long long jawabB = hitungB(a, 0, 0, batas);
  cout << "tanpa pangkas: " << jawabA << " subhimpunan, " << panggilanA << " pemanggilan\n";
  cout << "dengan pangkas: " << jawabB << " subhimpunan, " << panggilanB << " pemanggilan\n";
}
```

Masukan (`masukan.txt`):

```text
12 20
19 17 15 13 11 9 8 7 5 4 3 2
```

Keluaran:

```text
tanpa pangkas: 109 subhimpunan, 8191 pemanggilan
dengan pangkas: 109 subhimpunan, 363 pemanggilan
```

Tanpa pangkas: `2^13 - 1 = 8191` pemanggilan untuk `n = 12`, tepat seperti tercetak. Dengan pangkas jauh lebih sedikit, karena bilangan besar di depan cepat melewati batas 20. Jawaban sama; itu syarat sahnya pemangkasan. Namun waspadai dua hal. Pertama, urutan: bila bilangan kecil ada di depan, jumlah lebih lambat melewati batas dan lebih sedikit yang terpangkas. Kedua, kasus terburuk: bila `batas` sangat besar, tak satu cabang pun dipangkas dan pencarian tetap `O(2^n)`; pemangkasan memperbaiki kasus yang beruntung, bukan kasus terburuk. Pemangkasan lain yang sering dipakai pada kombinasi berukuran tetap `k`: berhenti bila elemen yang tersisa tak cukup untuk melengkapi `k`. Semuanya sama prinsipnya: **tanyakan, apakah cabang ini masih mungkin menghasilkan sesuatu yang berguna?** Bila tidak, tinggalkan.

## Contoh setengah jadi

Lengkapi fungsi dengan pemangkasan untuk memilih tepat `k` elemen berjumlah paling banyak `batas`, bilangan positif.

```cpp setengah-jadi
long long hitung(const vector<int>& a, int i, int dipilih, int jumlah, int k, int batas) {
  if (jumlah ____ batas) return 0;
  if (dipilih == k) return 1;
  if (i == (int)a.size()) return 0;
  if (dipilih + ((int)a.size() - i) < ____) return 0;
  return hitung(a, i + 1, dipilih, jumlah, k, batas) + hitung(a, i + 1, ____, jumlah + a[i], k, batas);
}
```

## Soal Parsons

Susun lima baris berikut (sudah diacak) menjadi fungsi pencarian dengan pemangkasan jumlah. `AI: tanpa AI`: tujuannya melatih membaca urutan.

```text
(a)   if (jumlah > batas) return 0;
(b)   if (i == n) return 1;
(c) int cari(int i, int jumlah) {
(d)   return cari(i + 1, jumlah) + cari(i + 1, jumlah + a[i]);
(e) }
```

## Latihan

1. `AI: boleh` **Hitung dengan pangkas.** Tulis program yang membaca `n` (paling banyak 20), `batas`, dan `n` bilangan positif, lalu mencetak banyak subhimpunan berjumlah paling banyak `batas` dan banyak pemanggilan. Bandingkan dengan `2^(n+1) - 1` untuk `n = 10`.
2. `AI: tanpa AI` **Telusuri.** Untuk `a = {3, 2, 1}` dan `batas = 4`, gambar pohon pemanggilan fungsi dengan pemangkasan. Cabang mana yang terpangkas dan berapa pemanggilannya?
3. `AI: boleh` **Pasangan.** Diberikan `n` bilangan positif terurut menaik dan `batas`, hitung banyak pasangan `i < j` dengan `a[i] + a[j] <= batas`. Pakai `break` pada perulangan dalam begitu jumlah melewati batas. Berapa langkah terburuknya?
4. `AI: tanpa AI` **Mengapa positif?** Beri contoh larik berisi bilangan negatif sehingga pemangkasan "jumlah melewati batas, maka berhenti" membuang jawaban yang benar.
5. *Opsional:* **catatan pemakaian AI.** Bila memakai AI generatif, jawab nomor 1 sendiri dulu, lalu minta penjelasan atau petunjuk bertahap, bukan program jadi. Catat alatnya, tujuanmu, garis besar perintahmu, bagian yang kamu pakai, dan caramu memeriksanya (jalankan atau telusuri). Jangan menaruh data pribadi atau tugas bernilai pada perintah.

## Latihan bercampur

1. `AI: boleh` Untuk `n = 25`, berapa pemanggilan tanpa pangkas, dan apakah itu masuk akal pada pedoman seratus juta langkah per detik (modul `a-xi1-m3`)?
2. `AI: boleh` Rancang uji pembanding untuk fungsi dengan pangkas: bandingkan jawabannya dengan fungsi tanpa pangkas pada semua larik kecil. Mengapa uji itu menangkap pemangkasan yang salah (modul `a-xi1-m2`)?
3. `AI: tanpa AI` Mengurutkan data menurun sebelum pencarian memerlukan satu pengurutan. Berapa langkah insertion sort pada kasus terburuk untuk 20 data, dan apakah ia sepadan dengan penghematannya (modul `a-x2-m10`)?

## Pengayaan (P)

Bagian ini boleh dilewati; ia bukan syarat modul berikutnya. Untuk masalah yang mencari nilai terbaik, misalnya jumlah subhimpunan terbesar yang tidak melewati `batas`, pemangkasan memakai **batas optimistis**: bila jumlah sekarang ditambah *semua* elemen yang tersisa pun tak melampaui nilai terbaik yang sudah ada, cabang itu tak mungkin memperbaikinya, dan boleh dibuang.

```cpp
#include <iostream>
#include <vector>
using namespace std;

vector<int> a = {19, 17, 15, 13, 11, 9, 8, 7, 5, 4, 3, 2};
vector<int> sisaTotal;
int batas = 60;
int terbaik = 0;
long long panggilan = 0;
bool pakaiBatas = true;

void cari(int i, int jumlah) {
  panggilan++;
  if (jumlah > batas) {
    return;
  }
  if (jumlah > terbaik) {
    terbaik = jumlah;
  }
  if (i == (int)a.size()) {
    return;
  }
  if (pakaiBatas && jumlah + sisaTotal[i] <= terbaik) {
    return;
  }
  cari(i + 1, jumlah + a[i]);
  cari(i + 1, jumlah);
}

int main() {
  int n = a.size();
  sisaTotal.assign(n + 1, 0);
  for (int i = n - 1; i >= 0; i--) {
    sisaTotal[i] = sisaTotal[i + 1] + a[i];
  }
  cari(0, 0);
  cout << "dengan batas optimistis: terbaik " << terbaik << ", " << panggilan << " pemanggilan\n";
  terbaik = 0;
  panggilan = 0;
  pakaiBatas = false;
  cari(0, 0);
  cout << "tanpa batas optimistis: terbaik " << terbaik << ", " << panggilan << " pemanggilan\n";
}
```

Keluaran:

```text
dengan batas optimistis: terbaik 60, 1007 pemanggilan
tanpa batas optimistis: terbaik 60, 5243 pemanggilan
```

Nilai terbaik sama; hanya banyak pemanggilan yang berbeda. Soal pengayaan, `AI: boleh`: mengapa program mencoba "ambil" lebih dulu sebelum "lewati", dan apa akibatnya pada seberapa cepat `terbaik` membesar?

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `a-xi1-m5` (pertanyaan 1), sekitar tiga minggu lagi di `a-xi1-m7` (pertanyaan 2), dan sekitar delapan minggu lagi di `a-xi1-m12` (pertanyaan 3). Jawab sekarang lalu simpan.

1. Kapan sebuah cabang pencarian boleh dipangkas tanpa kehilangan jawaban?
2. Mengapa urutan data menurun dapat membuat pemangkasan lebih banyak?
3. Mengapa pemangkasan tidak mengubah kompleksitas kasus terburuk pencarian lengkap?

## Kesalahan umum

- **Memangkas cabang yang masih bisa berhasil.** Pemangkasan "jumlah melewati batas" hanya sah bila semua bilangan positif; dengan bilangan negatif jumlah bisa turun lagi.
- **Mengira pemangkasan menghilangkan kerja terburuk.** Bila tak ada yang terpangkas, kerja tetap `2^n`.
- **Memeriksa syarat pangkas di tempat yang salah.** Memeriksa hanya di ujung rekursi tidak memangkas apa pun.
- **Tidak membandingkan dengan versi tanpa pangkas.** Versi sederhana adalah pembanding terbaik; keduanya harus memberi jawaban sama pada data kecil.
- **Lupa urutan data.** Data yang sama dengan urutan lain dapat memangkas jauh lebih banyak atau lebih sedikit.

## Cek mandiri

- [ ] Saya dapat menyebut syarat sahnya sebuah pemangkasan.
- [ ] Saya dapat menambahkan pemangkasan pada rekursi dan menghitung pemanggilannya.
- [ ] Saya dapat menjelaskan pengaruh urutan data.
- [ ] Saya membandingkan versi dengan dan tanpa pangkas pada data kecil.
- [ ] (Pengayaan) Saya dapat menjelaskan batas optimistis.

## Kunci dan petunjuk

**Ingat kembali.** 1: `2^n`, karena tiap elemen punya dua pilihan yang bebas. 2: batasan menentukan algoritma yang masuk akal dan tipe data yang cukup. 3: bila elemen lain digeser lebih dulu, nilainya tertimpa dan hilang.

**Prediksi dulu.** 1: ya, 7 subhimpunan. 2: yang kedua; angka 31 berasal dari `2^5 - 1`, jumlah simpul pohon lengkap untuk 4 elemen.

**Contoh setengah jadi.** Isi: `>`, `k`, dan `dipilih + 1`. Program lengkap:

```cpp
#include <iostream>
#include <vector>
using namespace std;

long long hitung(const vector<int>& a, int i, int dipilih, int jumlah, int k, int batas) {
  if (jumlah > batas) return 0;
  if (dipilih == k) return 1;
  if (i == (int)a.size()) return 0;
  if (dipilih + ((int)a.size() - i) < k) return 0;
  return hitung(a, i + 1, dipilih, jumlah, k, batas) + hitung(a, i + 1, dipilih + 1, jumlah + a[i], k, batas);
}

int main() {
  vector<int> a = {5, 4, 3, 2, 1};
  cout << hitung(a, 0, 0, 0, 2, 6) << "\n";
}
```

Keluaran:

```text
6
```

**Soal Parsons.** Urutan benar: c, a, b, d, e.

**Latihan.** 1: gunakan `hitungB` pada contoh; untuk `n = 10` tanpa pangkas 2047 pemanggilan, dengan pangkas lebih sedikit bila `batas` kecil dibanding jumlah semua bilangan. 2: satu-satunya cabang yang terpangkas adalah simpul `(2, 5)`, yaitu setelah memilih 3 dan 2 (jumlah 5 melewati 4); dua pemanggilan di bawahnya terhemat. Totalnya 13 pemanggilan (15 tanpa pangkas) dan 6 subhimpunan yang memenuhi. 3: dua perulangan; paling buruk `n(n-1)/2` langkah bila tak ada `break`. 4: `{5, -3}` dengan batas 4: setelah mengambil 5 jumlah 5 melewati 4 sehingga dipangkas, padahal `5 + (-3) = 2` memenuhi.

**Latihan bercampur.** 1: `2^26` sekitar 67 juta pemanggilan, di bawah satu detik; masuk akal. 2: bandingkan dua jawaban pada semua larik panjang paling banyak 4 dengan nilai kecil; bila pangkas membuang jawaban yang benar, hitungan berbeda. 3: terburuk `20 * 19 / 2 = 190` perbandingan; sepadan bila pemangkasan menghemat jauh lebih dari itu.

**Pengayaan (P).** Mengambil dulu menghasilkan jumlah besar lebih awal, sehingga `terbaik` cepat besar dan lebih banyak cabang terpangkas oleh batas optimistis.

**Ulang berjarak.** 1: bila yakin tak ada jawaban baru yang mungkin di bawahnya, misalnya jumlah sudah melewati batas dengan semua bilangan positif. 2: bilangan besar di depan cepat melewati batas, sehingga cabang terpangkas lebih dini dan lebih besar. 3: pada masukan terburuk tak ada cabang yang memenuhi syarat pangkas, sehingga semua kemungkinan tetap dicoba.

## Langkah berikutnya

Modul berikut: `a-xi1-m5` (greedy I), tempat kamu membuat satu pilihan serakah, bukan mencoba semua. Modul terkait: `matkom-pertumbuhan-fungsi`. Bacaan lanjut: halaman cppreference tentang `std::vector`, yang memuat `assign` yang dipakai di bagian pengayaan.
