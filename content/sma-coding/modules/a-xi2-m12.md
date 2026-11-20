## Untuk siapa modul ini

Modul ini untuk murid kelas XI jalur A (Algoritmik dengan C++), minggu `A-XI2-M12` silabus v1.4.1: prediksi sederhana. Prasyarat: modul `a-xi2-m11` (catatan sumber) dan `a-xi2-m10` (rekap); bilangan desimal dari `a-x1-m9` dipakai di sini.

Modul ini karangan penyusun dan disetujui pemilik program pada 2026-11-20 (keputusan lewat dialog; catatan tinjauan menjadi tindak lanjut revisi). Butir `F-AD-a` dipetakan silabus sebagai dipenuhi jalur ini; pemenuhan butir mengikuti pemetaan silabus, bukan status modul. Semua data di modul ini **sintetis**: deretan angka karangan penyusun, tanpa data murid atau orang nyata. Prediksi di sini sangat sederhana dan bukan ramalan pasti. Tiap soal latihan bertanda `AI: boleh` atau `AI: tanpa AI`. Masukan program diberikan lewat berkas: `./program < data.txt`.

## Ingat kembali

Jawab dari ingatan dulu, baru cek di kunci. Soal 1 dari `a-xi2-m11`, soal 2 dari `a-xi2-m9`, soal 3 dari `a-xi2-m4`.

1. Apa saja yang perlu ada dalam catatan sumber sebuah dataset?
2. Mengapa data dari luar divalidasi baris demi baris, dan apa yang dicatat untuk baris yang ditolak?
3. Mengapa tabel LCS untuk dua kata sepanjang 10.000 sangat besar, dan bagaimana mengakalinya bila hanya panjangnya yang dibutuhkan?

## Tujuan

Setelah modul ini kamu dapat:

- menghitung rata-rata bergerak dan memakainya sebagai prediksi nilai berikutnya (keluaran minggu ini: program prediksi);
- mencocokkan garis kecenderungan dengan data dan memakainya untuk memprediksi;
- mengukur galat prediksi dengan galat rata-rata mutlak pada data yang tidak dipakai membuatnya;
- memilih cara yang lebih baik berdasarkan galat, bukan perasaan.

## Prediksi dulu

Ini tugas baca-dan-prediksi, `AI: tanpa AI`. Prediksi nilai ke-`i` adalah rata-rata tiga nilai tepat sebelumnya; galatnya adalah selisih mutlak dengan nilai sebenarnya. **Tebak dulu, tulis, baru jalankan.**

```cpp
#include <cmath>
#include <iostream>
using namespace std;

int main() {
  double v[5] = {10, 12, 14, 13, 15};
  int k = 3;
  double jumlahGalat = 0;
  for (int i = k; i < 5; i++) {
    double ramal = (v[i - 1] + v[i - 2] + v[i - 3]) / 3.0;
    double galat = fabs(ramal - v[i]);
    cout << "i=" << i << " ramal " << ramal << " asli " << v[i] << " galat " << galat << "\n";
    jumlahGalat += galat;
  }
  cout << "galat rata-rata " << jumlahGalat / (5 - k) << "\n";
}
```

1. Apa yang tercetak pada tiap baris?
2. Menurutmu, berapa prediksi nilai ke-6 dengan cara yang sama?

Simpan tebakanmu. Nomor 2 dibahas di kunci.

## Contoh terselesaikan

Keluaran program tadi:

```text
i=3 ramal 12 asli 13 galat 1
i=4 ramal 13 asli 15 galat 2
galat rata-rata 1.5
```

Dua cara sederhana memprediksi nilai berikutnya dari deretan waktu. **Rata-rata bergerak** memakai rata-rata `k` nilai terakhir; ia meredam naik turun acak tetapi tertinggal bila data naik terus. **Garis kecenderungan** mencocokkan garis `y = a + b x` dengan semua data dengan metode kuadrat terkecil lalu memperpanjangnya. Dengan `x = 0, 1, ..., n - 1`, kemiringannya `b = (n Σxy - Σx Σy) / (n Σx² - (Σx)²)` dan `a = (Σy - b Σx) / n`.

Cara menilainya jujur: **uji pada data yang belum dilihat**. Tiap titik dari indeks 4 ke atas diprediksi hanya dengan data sebelumnya, lalu dibandingkan dengan nilai aslinya. Galatnya dirata-ratakan menjadi **galat rata-rata mutlak** (mean absolute error): jumlah selisih mutlak dibagi banyak titik. Nilai mutlak dipakai supaya galat positif dan negatif tidak saling menghapus.

Data sintetis di bawah adalah pengunjung bulanan perpustakaan karangan selama 12 bulan. Program memprediksi bulan ke-13 dengan kedua cara, menghitung galat tiap cara, dan menyatakan mana yang lebih baik.

```cpp
#include <cmath>
#include <iomanip>
#include <iostream>
#include <vector>
using namespace std;

double rataBergerak(const vector<double>& v, int hingga, int k) {
  double jumlah = 0;
  for (int i = hingga - k; i < hingga; i++) {
    jumlah += v[i];
  }
  return jumlah / k;
}

double garis(const vector<double>& v, int hingga) {
  double sx = 0, sy = 0, sxy = 0, sxx = 0;
  for (int i = 0; i < hingga; i++) {
    sx += i;
    sy += v[i];
    sxy += i * v[i];
    sxx += (double)i * i;
  }
  double n = hingga;
  double b = (n * sxy - sx * sy) / (n * sxx - sx * sx);
  double a = (sy - b * sx) / n;
  return a + b * hingga;
}

int main() {
  int n;
  cin >> n;
  vector<double> v(n);
  for (int i = 0; i < n; i++) {
    cin >> v[i];
  }
  int k = 3;
  int mulai = 4;
  double galatRB = 0, galatGaris = 0;
  for (int i = mulai; i < n; i++) {
    galatRB += fabs(rataBergerak(v, i, k) - v[i]);
    galatGaris += fabs(garis(v, i) - v[i]);
  }
  int titik = n - mulai;
  cout << fixed << setprecision(2);
  cout << "galat rata-rata bergerak: " << galatRB / titik << "\n";
  cout << "galat garis kecenderungan: " << galatGaris / titik << "\n";
  cout << "ramalan bulan " << n + 1 << ": rata-rata bergerak " << rataBergerak(v, n, k) << ", garis " << garis(v, n) << "\n";
  cout << "lebih baik: " << (galatRB < galatGaris ? "rata-rata bergerak" : "garis kecenderungan") << "\n";
}
```

Masukan (`data.txt`):

```text
12
120 132 128 141 150 147 158 165 160 172 181 177
```

Keluaran:

```text
galat rata-rata bergerak: 10.58
galat garis kecenderungan: 4.68
ramalan bulan 13: rata-rata bergerak 176.67, garis 187.29
lebih baik: garis kecenderungan
```

Datanya naik terus, dan keluaran menunjukkan garis kecenderungan lebih kecil galatnya, sedangkan rata-rata bergerak tertinggal di bawah nilai asli. Itu sesuai sifat kedua cara. Pada data yang naik turun tanpa arah, urutannya bisa terbalik, sehingga yang menentukan adalah galatnya, bukan keyakinanmu.

Perkiraan langkah: satu ramalan rata-rata bergerak menjumlahkan `k` nilai, dan satu ramalan garis menyentuh semua titik sebelumnya. Dengan `n = 12` dan 8 titik uji, itu kurang dari `8 * (3 + 12) = 120` operasi penjumlahan. Untuk `n` titik, pengujian garis menyentuh sekitar `n * n / 2` titik, jadi `O(n²)` karena garis dihitung ulang tiap kali; rata-rata bergerak hanya `O(n * k)`.

## Contoh setengah jadi

Lengkapi fungsi yang menghitung galat rata-rata mutlak dua deretan yang sama panjang.

```cpp setengah-jadi
double galatRata(const vector<double>& asli, const vector<double>& ramal) {
  double jumlah = 0;
  for (int i = 0; i < (int)____.size(); i++) {
    jumlah += fabs(asli[i] - ____[i]);
  }
  return jumlah / ____.size();
}
```

## Soal Parsons

Susun delapan baris berikut (sudah diacak) menjadi fungsi rata-rata bergerak dari `v[hingga - k]` sampai `v[hingga - 1]`. `AI: tanpa AI`.

```text
(a)   double rataBergerak(const vector<double>& v, int hingga, int k) {
(b)     double jumlah = 0;
(c)     for (int i = hingga - k; i < hingga; i++) {
(d)       jumlah += v[i];
(e)     }
(f)     return jumlah / k;
(g)   }
(h)   // hingga adalah indeks yang akan diprediksi
```

## Latihan

1. `AI: boleh` **Jendela.** Ubah `k` menjadi 2 lalu 4 pada program contoh. Cara pasti galat rata-rata bergerak turun atau naik? Tulis pseudocode lebih dulu untuk pengujian beberapa `k`.
2. `AI: boleh` **Data sendiri.** Buat 10 angka sintetis yang naik turun tanpa arah. Cara mana yang lebih baik, dan apakah sama dengan data naik di contoh?
3. `AI: tanpa AI` **Telusur.** Deretan `2 4 6 8`: berapa prediksi garis kecenderungan untuk nilai berikutnya? Berapa prediksi rata-rata bergerak `k = 2`?
4. `AI: boleh` **Batas.** Program contoh gagal bila `n` kurang dari 5. Tambahkan pemeriksaan agar program melapor "data terlalu sedikit" dan tidak membagi dengan nol.
5. *Opsional:* **catatan pemakaian AI.** Bila memakai AI generatif, jawab nomor 3 sendiri dulu, lalu minta penjelasan atau petunjuk bertahap, bukan program jadi. Catat alatnya, tujuanmu, garis besar perintahmu, bagian yang kamu pakai, dan caramu memeriksanya. Jangan menaruh data pribadi atau tugas bernilai pada perintah.

## Latihan bercampur

1. `AI: boleh` Rekap data per kategori dengan `map` (modul `a-xi2-m10`), lalu prediksi bulan berikut untuk satu kategori dari deret bulanannya.
2. `AI: tanpa AI` Mengapa membagi `jumlah / k` dengan `k` bertipe `int` dan `jumlah` bertipe `double` tetap memberi hasil desimal, sedangkan dua `int` tidak (modul `a-x1-m9`)?
3. `AI: boleh` Catat sumber dan lisensi data deretanmu dalam satu baris catatan sumber, termasuk tanggal akses (modul `a-xi2-m11`).

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `a-xi2-m13` (pertanyaan 1), sekitar tiga minggu lagi di `a-xii1-m1` (pertanyaan 2), dan sekitar delapan minggu lagi di `a-xii1-m6` (pertanyaan 3). Jawab sekarang lalu simpan.

1. Mengapa prediksi dinilai dengan data yang tidak dipakai untuk membuatnya?
2. Apa rumus galat rata-rata mutlak, dan mengapa dipakai nilai mutlak?
3. Kapan rata-rata bergerak lebih cocok daripada garis kecenderungan, dan sebaliknya?

## Kesalahan umum

- **Menilai prediksi dengan data yang sudah dipakai membuatnya.** Galatnya tampak kecil secara menyesatkan.
- **Memakai rata-rata bergerak untuk data yang naik terus.** Prediksinya selalu tertinggal.
- **Memperpanjang garis jauh ke depan.** Makin jauh dari data, makin tidak bisa dipercaya.
- **Membagi dua bilangan `int` lalu mengira hasilnya desimal.** Pecahan terbuang.
- **Menganggap prediksi sebagai kepastian.** Laporkan galatnya di samping angka prediksi.

## Cek mandiri

- [ ] Saya dapat menghitung rata-rata bergerak dari `k` nilai terakhir.
- [ ] Saya dapat mencocokkan garis kecenderungan dan memakainya memprediksi.
- [ ] Saya dapat menghitung galat rata-rata mutlak pada data uji.
- [ ] Saya dapat memilih cara prediksi berdasarkan galat.
- [ ] Saya dapat menyebut keterbatasan prediksi sederhana.

## Kunci dan petunjuk

**Ingat kembali.** 1: nama, penerbit, lisensi, tanggal akses, tautan sumber, dan ada tidaknya data pribadi. 2: karena baris rusak tidak kelihatan dari hasil akhir; catat nomor baris dan isinya serta jumlah baris ditolak. 3: `10.001 * 10.001` sel `int` sekitar `10^8` sel, sekitar 400 MB; bila hanya panjangnya yang dibutuhkan, dua baris cukup (memori `2 * n`), tetapi satu subsekuens tak dapat dicetak dari dua baris tanpa teknik tambahan.

**Prediksi dulu.** 1: lihat keluaran di atas: galat 1 dan 2, galat rata-rata 1.5. 2: rata-rata tiga nilai terakhir `(14 + 13 + 15) / 3`, yaitu 14.

**Contoh setengah jadi.** Isi: `asli`, `ramal`, `asli`. Program lengkap:

```cpp
#include <cmath>
#include <iostream>
#include <vector>
using namespace std;

double galatRata(const vector<double>& asli, const vector<double>& ramal) {
  double jumlah = 0;
  for (int i = 0; i < (int)asli.size(); i++) {
    jumlah += fabs(asli[i] - ramal[i]);
  }
  return jumlah / asli.size();
}

int main() {
  vector<double> asli = {10, 20, 30};
  vector<double> ramal = {12, 18, 33};
  cout << galatRata(asli, ramal) << "\n";
}
```

Keluaran:

```text
2.33333
```

**Soal Parsons.** Urutan benar: h, a, b, c, d, e, f, g. Baris (h) hanya komentar tentang arti `hingga`; penjumlahan ada di dalam perulangan dan pembagian dengan `k` sesudahnya.

**Latihan.** 1: pseudocode: untuk tiap `k` dalam daftar, hitung galat rata-rata bergerak dengan uji yang sama, cetak, pilih yang terkecil. Pada data naik contoh, `k` lebih kecil biasanya memberi galat lebih kecil karena tertinggal lebih sedikit; periksa dengan menjalankannya, bukan menebak. 2: pada data naik turun tanpa arah, garis kecenderungan tidak memberi keunggulan sehingga rata-rata bergerak bisa lebih baik; bandingkan galat keduanya dari programmu. 3: garis untuk `2 4 6 8` (x dari 0): `a = 2`, `b = 2`, prediksi `x = 4` adalah 10; rata-rata bergerak `k = 2` memberi `(6 + 8) / 2 = 7`. 4: tambahkan `if (n < 5) { cout << "data terlalu sedikit\n"; return 0; }` sebelum menghitung `titik`; `titik` tidak boleh nol. 

**Latihan bercampur.** 1: kelompokkan baris menurut (bulan, kategori) dan isi satu `vector<double>` per kategori; lalu panggil fungsi prediksi yang sama. 2: bila salah satu operan desimal, operan `int` dikonversi ke `double` sebelum dibagi; dua `int` dibagi sebagai bilangan bulat. 3: contoh: `Pengunjung perpustakaan karangan;Penyusun modul;CC0-1.0;2026-11-20` (data karangan).

**Ulang berjarak.** 1: nilai uji harus belum dilihat model; kalau tidak, galatnya tampak kecil karena model sudah "menghafal". 2: jumlah `|prediksi - asli|` dibagi banyak titik; nilai mutlak mencegah galat positif dan negatif saling menghapus. 3: rata-rata bergerak untuk data naik turun acak tanpa arah; garis kecenderungan untuk data yang bergerak searah.

## Langkah berikutnya

Modul berikut: `a-xi2-m13` (proyek analisis data terbuka), yang memadukan membaca, merekap, menilai sumber, dan memprediksi. Modul terkait: `matkom-pertumbuhan-fungsi`. Bacaan lanjut: halaman cppreference tentang `std::vector` dan `std::fabs`.
