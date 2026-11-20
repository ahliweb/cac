## Untuk siapa modul ini

Modul ini untuk murid kelas XI jalur A (Algoritmik dengan C++), minggu `A-XI2-M14` silabus v1.4.1: asesmen dan refleksi semester 2 kelas XI. Prasyarat: modul `a-xi2-m12` dan seluruh modul `a-xi2-m1` sampai `a-xi2-m13`; modul ini menilai pemrograman dinamis, graf, dan data.

Modul ini berstatus DRAF: karangan penyusun, belum ditinjau pemilik, dan tidak dihitung sebagai pemenuhan butir capaian pembelajaran. Asesmen ini **tanpa AI**: jangan memakai AI generatif saat mengerjakannya (silabus 7.4), karena tujuannya melihat apa yang bisa kamu selesaikan sendiri. Bobot nilai dan predikat mengikuti kebijakan sekolah `[belum terverifikasi]`; modul ini hanya memberi soal dan kunci latihan. Semua data di soal adalah karangan.

## Ingat kembali

Ini inti asesmen: jawab dari ingatan, tanpa melihat catatan, lalu cocokkan dengan kunci. Soal 1 dari `a-xi2-m13`, soal 2 dari `a-xi2-m11`, soal 3 dari `a-xi2-m6`. Soal 4 (inti `a-xi2-m2`) dan soal 5 (inti `a-xi2-m12`) adalah tambahan penguji inti semester.

1. Mengapa data terbuka tetap dicek sebelum dianalisis, dan apa yang dicatat tentang baris rusak?
2. Apa yang wajib dilakukan bila memakai data berlisensi CC BY 4.0 dan mengubahnya?
3. Berapa langkah BFS pada graf dengan `n` simpul dan `m` sisi bila memakai daftar ketetanggaan?
4. Apa yang disimpan sebuah tabel DP satu dimensi, dan apa yang menentukan urutan mengisinya?
5. Apa rumus galat rata-rata mutlak, dan mengapa dipakai nilai mutlak?

## Tujuan

Soal di modul ini menilai apakah kamu dapat:

- memodelkan grid sebagai graf dan menelusuri BFS beserta banyak langkahnya;
- membaca data CSV, menolak baris rusak, merekap per kelompok, dan memprediksi dengan galat;
- menyebut syarat memakai data terbuka dengan lisensi dan atribusi yang benar;
- memilih strategi (BFS atau DFS, rata-rata bergerak atau garis) dengan alasan yang menyebut kebenaran dan banyak langkah.

## Latihan bercampur

Kerjakan sendiri, `AI: tanpa AI`, dengan waktu yang ditetapkan gurumu.

1. **Tulis.** Tulis pseudocode lalu program: baca CSV `ruang,nilai` dengan satu baris judul. Tolak baris yang bukan dua kolom atau nilainya bukan angka dan hitung. Cetak jumlah tiap ruang (terurut menurut nama ruang) dan ruang dengan jumlah terbesar. Pakai `map`.
2. **Telusuri.** Program berikut dijalankan. Apa yang tercetak, dan mengapa jumlah sel yang diproses bukan 9?

   ```cpp
   #include <iostream>
   #include <queue>
   #include <string>
   #include <utility>
   using namespace std;

   int main() {
     string g[3] = {"S.#", "..#", ".T."};
     int jarak[3][3];
     for (int i = 0; i < 3; i++) {
       for (int j = 0; j < 3; j++) {
         jarak[i][j] = -1;
       }
     }
     int dx[4] = {-1, 1, 0, 0};
     int dy[4] = {0, 0, -1, 1};
     queue<pair<int, int>> q;
     q.push({0, 0});
     jarak[0][0] = 0;
     int diproses = 0;
     while (!q.empty()) {
       pair<int, int> p = q.front();
       q.pop();
       diproses++;
       for (int k = 0; k < 4; k++) {
         int a = p.first + dx[k];
         int b = p.second + dy[k];
         if (a < 0 || a >= 3 || b < 0 || b >= 3) {
           continue;
         }
         if (g[a][b] != '#' && jarak[a][b] == -1) {
           jarak[a][b] = jarak[p.first][p.second] + 1;
           q.push({a, b});
         }
       }
     }
     cout << jarak[2][1] << " " << diproses << "\n";
   }
   ```

3. **Cari galat.** Tiga potongan berikut sengaja salah. Untuk tiap potongan tulis galatnya, akibatnya, dan perbaikannya.

   ```text
   (a) if (g[a][b] == '.' && a >= 0 && a < R) { ... }
   (b) rata = jumlah / k;     // jumlah dan k bertipe int
   (c) cocokkan garis pada seluruh 12 bulan, lalu hitung galatnya pada 12 bulan yang sama
   ```

4. **Praktik.** Kompilasi programmu dari nomor 1 dengan `g++ -std=c++17 -Wall -Wextra` dan jalankan dengan masukan dari berkas. Tulis dua uji yang kamu pilih, satu di antaranya hanya baris judul, beserta hasil yang kamu prediksi.
5. **Strategi.** (a) Sebuah dataset di situs tanpa penerbit dan tanpa lisensi tertulis: pakai atau tolak, dengan dua alasan. (b) Deret `5 7 9 11 13` naik tetap: cara prediksi mana yang cocok, dan berapa ramalan nilai berikutnya dari tiap cara (`k = 2` untuk rata-rata bergerak)? (c) Jarak terpendek di grid satu juta sel: BFS atau DFS, dengan perkiraan langkah.

## Refleksi

Tulis jawabanmu di jurnalmu sendiri. Jurnal ini tidak dikumpulkan ke repositori dan tidak ada jawaban benar atau salah; yang dinilai adalah kejujuran dan rencanamu.

1. Apa dua hal yang sekarang sudah kamu kuasai? Tulis buktinya (soal mana yang kamu jawab tanpa ragu).
2. Apa satu hal yang masih keliru atau membingungkan? Soal mana yang memperlihatkannya?
3. Apa yang akan kamu lakukan berbeda minggu depan, dan kapan kamu akan mengulang bagian yang lemah?
4. Dari DP, graf, dan data, bagian mana yang paling ingin kamu dalami di kelas XII, dan mengapa?

Mengulang bagian yang lemah dengan mencoba mengingat lebih dulu, lalu menjarakkan waktunya, membantu ingatan jangka panjang lebih baik daripada membaca ulang catatan.

## Cek mandiri

- [ ] Saya dapat menelusuri BFS pada grid dan menyebut banyak langkahnya.
- [ ] Saya dapat membaca CSV, menolak baris rusak, dan merekap dengan `map`.
- [ ] Saya dapat menyebut syarat memakai data CC BY 4.0 dan alasan menolak data tanpa lisensi.
- [ ] Saya dapat memprediksi dengan rata-rata bergerak atau garis dan menilainya dengan galat.
- [ ] Saya dapat mengompilasi dan menguji programku dengan nilai batas.

## Kunci dan petunjuk

**Ingat kembali.** 1: lisensi membolehkan memakai, bukan menjamin benar; baris rusak dicatat nomor dan isinya serta jumlahnya. 2: mencantumkan nama yang sesuai, menyertakan tautan ke lisensi, dan menyatakan bahwa telah ada perubahan. 3: `O(n + m)`: tiap simpul diproses sekali dan tiap sisi diperiksa dua kali. 4: tabel menyimpan jawaban tiap submasalah yang lebih kecil (misalnya terbaik untuk `i` pertama); urutan isi mengikuti ketergantungan, yaitu submasalah yang dibutuhkan terisi dulu. 5: jumlah `|prediksi - asli|` dibagi banyak titik; nilai mutlak mencegah galat positif dan negatif saling menghapus.

**Latihan bercampur.** 1: pseudocode: buang judul; untuk tiap baris pecah; bila bukan dua kolom atau nilai bukan angka, `ditolak++`; selain itu `jumlah[kolom[0]] += nilai`; cetak `map` (otomatis terurut menurut kunci) dan simpan yang terbesar. Program contoh:

```cpp
#include <iostream>
#include <map>
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
  string baris;
  getline(cin, baris);
  map<string, long long> jumlah;
  int ditolak = 0;
  while (getline(cin, baris)) {
    vector<string> k;
    istringstream ss(baris);
    string bagian;
    while (getline(ss, bagian, ',')) {
      k.push_back(bagian);
    }
    if (k.size() != 2 || !semuaAngka(k[1])) {
      ditolak++;
      continue;
    }
    jumlah[k[0]] += stoll(k[1]);
  }
  string terbesar;
  long long nilaiTerbesar = -1;
  for (const auto& p : jumlah) {
    cout << p.first << " " << p.second << "\n";
    if (p.second > nilaiTerbesar) {
      nilaiTerbesar = p.second;
      terbesar = p.first;
    }
  }
  cout << "terbesar: " << terbesar << ", ditolak: " << ditolak << "\n";
}
```

Masukan (`masukan.txt`):

```text
ruang,nilai
b,5
a,3
b,x
a,4
c,9
```

Keluaran:

```text
a 7
b 5
c 9
terbesar: c, ditolak: 1
```

2: keluaran program:

```text
3 7
```

Jarak ke `T` adalah 3 langkah. Yang diproses 7, bukan 9, karena dua sel dinding (`#`) tidak pernah masuk antrian. 3: (a) batas diperiksa sesudah `g[a][b]` dibaca; akibatnya perilaku tak terdefinisi untuk sel di luar grid; perbaikan: periksa `a` dan `b` lebih dulu, baru baca `g[a][b]`. (b) pembagian dua `int` membuang pecahan; akibatnya rata-rata terpotong; perbaikan: jadikan salah satu `double`. (c) galat dihitung pada data yang dipakai membuat garis; akibatnya tampak kecil secara menyesatkan; perbaikan: prediksi tiap titik hanya dari data sebelumnya. 4: contoh uji: hanya baris judul dengan prediksi `terbesar: , ditolak: 0` (tidak ada ruang); masukan di atas dengan prediksi seperti keluaran kunci. Bila `g++` memberi peringatan, baca dan perbaiki. 5: (a) tolak: tanpa lisensi tertulis tidak ada izin, dan tanpa penerbit keterpercayaannya tidak bisa dinilai. (b) garis kecenderungan cocok karena data naik tetap; untuk `5 7 9 11 13` ramalannya 15, sedangkan rata-rata bergerak `k = 2` memberi `(11 + 13) / 2 = 12`. (c) BFS: sekitar `4 * 1.000.000` pemeriksaan, `O(R * C)`, dan menjamin jarak terpendek; DFS rekursif berisiko memenuhi tumpukan dan tidak menjamin terpendek.

**Rubrik singkat.** Untuk soal 1 dan 4, periksa empat hal: ketepatan (program memenuhi tujuan), keterbacaan (nama dan fungsi jelas), pengujian (disebut cara mengujinya, termasuk nilai batas), dan justifikasi (alasan pilihan). Skala yang disarankan: sudah, sebagian, belum, per hal. Untuk soal 2, 3, dan 5, jawaban dinilai benar bila angka dan alasan sama dengan kunci atau setara.

**Refleksi.** Tidak ada kunci. Jawaban yang baik menyebut bukti, bagian yang lemah, dan rencana yang jelas waktunya.

## Langkah berikutnya

Kelas XII semester 1 jalur A dimulai dengan `a-xii1-m1` (lintasan terpendek I), yang melanjutkan BFS ke graf berbobot. Jadikan hasil refleksi tadi rencana belajarmu sebelum minggu pertama. Modul terkait: `matkom-pertumbuhan-fungsi` untuk memperdalam perbandingan pertumbuhan langkah. Bacaan lanjut: halaman cppreference tentang `std::queue` dan `std::map`.
