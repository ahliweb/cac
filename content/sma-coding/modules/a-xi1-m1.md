## Untuk siapa modul ini

Modul ini untuk murid kelas XI jalur A (Algoritmik dengan C++), minggu `A-XI1-M1` silabus v1.4.1: proses rekayasa program. Prasyarat: modul `a-x2-m12` (efisiensi intuitif). Di kelas X kamu menulis program dari soal yang sudah jelas; di sini kamu belajar apa yang dikerjakan sebelum dan sesudah menulis kode.

Modul ini berstatus DRAF: karangan penyusun, belum ditinjau pemilik. Butir `F-BK-a` dipetakan silabus sebagai dipenuhi jalur ini; modul draf ini belum dihitung sebagai pemenuhan. Tidak ada keluarga materi OSN yang dipetakan untuk minggu ini.

Bila kamu pernah memakai Python: tahapnya sama untuk bahasa apa pun. Tiap soal latihan bertanda `AI: boleh` atau `AI: tanpa AI`. Masukan program diberikan lewat berkas: `./program < masukan.txt`.

## Ingat kembali

Jawab dari ingatan dulu, baru cek di kunci. Soal 1 dari `a-x2-m13`, soal 2 dari `a-x2-m12`, soal 3 dari `a-x2-m7`.

1. Mengapa kedua kolom sebuah tabel harus dipindahkan bersama saat diurutkan?
2. Urutkan dari yang paling lambat bertambah sampai yang paling cepat bertambah ketika `n` membesar: `n`, `n^2`, `log n`, `2^n`.
3. Mengapa pemeriksaan kurung seimbang cocok memakai tumpukan?

## Tujuan

Setelah modul ini kamu dapat:

- menguraikan empat tahap proses rekayasa program: spesifikasi, rancangan, implementasi, dan uji;
- menulis spesifikasi yang tegas: masukan, keluaran, batasan, aturan, dan contoh;
- menulis dokumen rancangan satu halaman sebelum memprogram;
- menunjukkan di tahap mana sebuah cacat berasal dan memperbaikinya di tahap itu.

## Prediksi dulu

Ini tugas baca-dan-prediksi, `AI: tanpa AI`. **Tebak dulu, tulis jawabanmu, baru jalankan.** Sebuah spesifikasi karangan berbunyi: "cetak rata-rata skor dengan dua angka di belakang koma". Seorang pemrogram menulis fungsi berikut.

```cpp
#include <iomanip>
#include <iostream>
using namespace std;

int rataRata(int jumlah, int n) {
  return jumlah / n;
}

int main() {
  cout << rataRata(23, 3) << " " << rataRata(24, 3) << "\n";
  cout << fixed << setprecision(2) << 23 / 3.0 << "\n";
}
```

1. Apa yang tercetak pada tiap baris?
2. Apakah baris pertama memenuhi spesifikasi? Bila tidak, di tahap mana cacatnya paling tepat diperbaiki?

Simpan tebakanmu. Perbandingannya ada di bagian berikutnya.

## Contoh terselesaikan

Keluaran program tadi:

Keluaran:

```text
7 8
7.67
```

Fungsi `rataRata` memakai pembagian bilangan bulat, sehingga 23 dibagi 3 menjadi 7, bukan 7,67. Kodenya konsisten dengan dirinya sendiri; yang salah adalah **keputusan** bahwa rata-rata disimpan sebagai `int`. Keputusan itu seharusnya diambil di rancangan, dan rancangan seharusnya mengikuti spesifikasi yang tegas. Karena itu proses rekayasa program memisahkan empat tahap:

| Tahap | Pertanyaan utama | Keluaran |
| --- | --- | --- |
| Spesifikasi | Apa yang harus dilakukan program, untuk masukan apa? | masukan, keluaran, batasan, aturan, contoh |
| Rancangan | Bagaimana caranya, dengan data dan fungsi apa? | pseudocode, daftar fungsi, pilihan tipe data |
| Implementasi | Bagaimana rancangan itu ditulis dalam C++? | kode yang bisa dikompilasi |
| Uji | Apakah program sesuai spesifikasi, termasuk pada data batas? | tabel kasus uji dengan hasil harapan |

Tahap tidak selalu berjalan lurus: uji bisa menunjukkan bahwa spesifikasi kurang tegas, dan kamu kembali ke atas. Berikut satu putaran lengkap untuk masalah karangan: rekap skor kuis. **Spesifikasi.** Masukan: bilangan bulat `n` (1 sampai 1000), lalu `n` skor bulat dari 0 sampai 100. Keluaran: jumlah, rata-rata dengan dua angka di belakang koma, skor tertinggi, skor terendah, dan banyak skor yang lulus. Aturan: skor lulus bila paling sedikit 60. **Rancangan.** Satu pembacaan data ke `vector<int>`; empat fungsi kecil (`jumlah`, `tertinggi`, `terendah`, `banyakLulus`); rata-rata dihitung sebagai `double` dari jumlah. Banyak langkah: tiap fungsi memeriksa `n` skor satu kali, jadi sekitar `4n` langkah ditambah `n` langkah membaca; untuk `n = 6` sekitar 30 langkah. **Implementasi:**

```cpp
#include <iomanip>
#include <iostream>
#include <vector>
using namespace std;

int jumlah(const vector<int>& skor) {
  int total = 0;
  for (int i = 0; i < (int)skor.size(); i++) {
    total += skor[i];
  }
  return total;
}

int tertinggi(const vector<int>& skor) {
  int hasil = skor[0];
  for (int i = 1; i < (int)skor.size(); i++) {
    if (skor[i] > hasil) {
      hasil = skor[i];
    }
  }
  return hasil;
}

int terendah(const vector<int>& skor) {
  int hasil = skor[0];
  for (int i = 1; i < (int)skor.size(); i++) {
    if (skor[i] < hasil) {
      hasil = skor[i];
    }
  }
  return hasil;
}

int banyakLulus(const vector<int>& skor, int batas) {
  int banyak = 0;
  for (int i = 0; i < (int)skor.size(); i++) {
    if (skor[i] >= batas) {
      banyak++;
    }
  }
  return banyak;
}

int main() {
  int n;
  cin >> n;
  vector<int> skor(n);
  for (int i = 0; i < n; i++) {
    cin >> skor[i];
  }
  int total = jumlah(skor);
  cout << "jumlah " << total << "\n";
  cout << fixed << setprecision(2) << "rata-rata " << (double)total / n << "\n";
  cout << "tertinggi " << tertinggi(skor) << "\n";
  cout << "terendah " << terendah(skor) << "\n";
  cout << "lulus " << banyakLulus(skor, 60) << "\n";
}
```

**Uji.** Dua kasus uji: data biasa dan data dengan `n = 1` yang sekaligus memuat skor tepat 60 (batas lulus). Masukan kasus pertama (`masukan.txt`):

```text
6
72 55 90 60 48 85
```

Keluaran:

```text
jumlah 410
rata-rata 68.33
tertinggi 90
terendah 48
lulus 4
```

Hitung dengan tangan: jumlah `72 + 55 + 90 + 60 + 48 + 85 = 410`, rata-rata `410 / 6 = 68,33`, dan empat skor mencapai 60. Cocok. Kasus kedua, `n = 1` dan skor 60, harus menghasilkan jumlah 60, rata-rata 60,00, tertinggi dan terendah 60, lulus 1. Dalam notasi O-besar, seluruh program `O(n)`: beberapa perulangan tunggal yang berurutan menjumlahkan langkah, tidak mengalikannya. Catatan: pemeriksa repositori hanya menyatakan kode ini bisa dikompilasi; kebenarannya untuk semua masukan tetap kamu uji sendiri.

## Contoh setengah jadi

Lengkapi rancangan fungsi yang menghitung banyak skor di antara dua batas (inklusif). Spesifikasinya: `dari <= skor <= sampai`.

```cpp setengah-jadi
int banyakDi(const vector<int>& skor, int dari, int sampai) {
  int banyak = 0;
  for (int i = 0; i < (int)skor.size(); i++) {
    if (skor[i] >= ____ && skor[i] ____ sampai) {
      banyak++;
    }
  }
  return ____;
}
```

## Soal Parsons

Susun sembilan baris berikut (sudah diacak) menjadi fungsi `tertinggi`. `AI: tanpa AI`: tujuannya melatih membaca urutan.

```text
(a)     if (skor[i] > hasil) {
(b)   int hasil = skor[0];
(c) int tertinggi(const vector<int>& skor) {
(d)   return hasil;
(e)       hasil = skor[i];
(f)     }
(g)   for (int i = 1; i < (int)skor.size(); i++) {
(h)   }
(i) }
```

## Latihan

1. `AI: boleh` **Rancang dulu.** Masalah karangan: rekap pemakaian lab komputer. Masukan `n` sesi, tiap sesi berisi lama pakai dalam menit. Tulis dokumen satu halaman dengan lima bagian: masukan, keluaran (total menit, rata-rata, sesi terlama, banyak sesi lebih dari 90 menit), batasan, aturan, dan contoh. Tambahkan rancangan: pseudocode dan daftar fungsi.
2. `AI: tanpa AI` **Kasus uji.** Untuk program rekap skor di contoh, tulis tiga kasus uji batas beserta keluaran harapannya yang kamu hitung dengan tangan: skor semua sama, skor 59 dan 60, dan `n = 2` dengan skor 0 dan 100.
3. `AI: boleh` **Implementasi.** Tulis program dari dokumen nomor 1, jalankan dengan masukan contohmu, dan bandingkan keluarannya dengan hitungan tanganmu.
4. `AI: tanpa AI` **Di tahap mana?** Untuk tiap kasus, nyatakan tahap tempat cacat sebaiknya diperbaiki: (a) program mencetak 7 padahal yang diminta 7,67; (b) spesifikasi tidak menyebut apa yang terjadi bila `n = 0`; (c) program mencatat `skor[i] > 60` padahal aturannya "paling sedikit 60"; (d) tidak ada kasus uji dengan `n = 1`.
5. *Opsional:* **catatan pemakaian AI.** Bila memakai AI generatif, jawab nomor 1 sendiri dulu, lalu minta penjelasan atau petunjuk bertahap, bukan program jadi. Catat alatnya, tujuanmu, garis besar perintahmu, bagian yang kamu pakai, dan caramu memeriksanya (jalankan atau telusuri). Jangan menaruh data pribadi atau tugas bernilai pada perintah.

## Latihan bercampur

1. `AI: boleh` Telusuri dengan tabel tumpukan: apakah `([]{)}` kurung seimbang? Pada baris mana ketahuan, dan apa isi tumpukan saat itu (modul `a-x2-m7`)?
2. `AI: boleh` Bila `n = 1000`, berapa kira-kira langkah program rekap skor, dan berapa bila rekap diganti dengan mengurutkan dulu memakai bubble sort (modul `a-x2-m9` dan `a-x2-m12`)?
3. `AI: tanpa AI` Rekap perlu mencari apakah skor 77 ada di antara 10000 skor yang sudah terurut. Cara apa yang kamu pilih, dan kira-kira berapa langkah paling banyak (modul `a-x2-m8`)?

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `a-xi1-m2` (pertanyaan 1), sekitar tiga minggu lagi di `a-xi1-m4` (pertanyaan 2), dan sekitar delapan minggu lagi di `a-xi1-m9` (pertanyaan 3). Jawab sekarang lalu simpan.

1. Sebutkan empat tahap proses rekayasa program dan satu keluaran tiap tahap.
2. Mengapa spesifikasi perlu menyebut batasan, misalnya `1 <= n <= 1000`?
3. Mengapa cacat spesifikasi lebih murah diperbaiki sebelum program ditulis daripada sesudahnya?

## Kesalahan umum

- **Langsung menulis kode.** Tanpa spesifikasi dan rancangan, kamu menebak apa yang diminta; sering yang kamu selesaikan adalah masalah lain.
- **Spesifikasi yang samar.** "Rata-rata" tanpa menyebut pembulatan, atau "lulus" tanpa menyebut apakah 60 termasuk, membuat dua pemrogram menulis dua program yang berbeda.
- **Menguji hanya dengan contoh dari soal.** Contoh soal biasanya data biasa; cacat sering bersembunyi di data batas.
- **Menganggap program yang berhasil dikompilasi sudah benar.** Kompilator memeriksa sintaks dan tipe, bukan maksudmu.
- **Memperbaiki gejala di kode, padahal sumbernya spesifikasi.** Menambal kode tanpa membetulkan spesifikasi membuat cacat yang sama muncul lagi.

## Cek mandiri

- [ ] Saya dapat menyebut empat tahap proses rekayasa program dan keluaran tiap tahap.
- [ ] Saya dapat menulis spesifikasi dengan masukan, keluaran, batasan, aturan, dan contoh.
- [ ] Saya dapat menulis rancangan satu halaman sebelum memprogram.
- [ ] Saya dapat menunjuk tahap asal sebuah cacat.
- [ ] Saya menghitung keluaran harapan dengan tangan sebelum menjalankan program.

## Kunci dan petunjuk

**Ingat kembali.** 1: karena baris adalah satu data; memindahkan satu kolom saja memisahkan kode dari skornya. 2: `log n`, `n`, `n^2`, `2^n`. 3: kurung yang dibuka terakhir harus ditutup lebih dulu (LIFO), persis perilaku tumpukan.

**Prediksi dulu.** 1: `7 8` lalu `7.67`. 2: tidak memenuhi; cacatnya di rancangan (tipe hasil `int`), yang bersumber dari spesifikasi yang tidak ditegakkan sampai ke tipe data.

**Contoh setengah jadi.** Isi: `dari`, `<=`, dan `banyak`. Program lengkap beserta pengujinya:

```cpp
#include <iostream>
#include <vector>
using namespace std;

int banyakDi(const vector<int>& skor, int dari, int sampai) {
  int banyak = 0;
  for (int i = 0; i < (int)skor.size(); i++) {
    if (skor[i] >= dari && skor[i] <= sampai) {
      banyak++;
    }
  }
  return banyak;
}

int main() {
  vector<int> skor = {72, 55, 90, 60, 48, 85};
  cout << banyakDi(skor, 60, 85) << " " << banyakDi(skor, 0, 100) << "\n";
}
```

Keluaran:

```text
3 6
```

**Soal Parsons.** Urutan benar: c, b, g, a, e, f, h, d, i. Baris (f) menutup `if` dan (h) menutup `for`.

**Latihan.** 1: dokumen yang baik menyebut batas `n`, apakah "lebih dari 90" memasukkan 90 (tidak), dan memuat satu contoh dengan hitungan tangan. 2: semua sama, mis. tiga skor 50: jumlah 150, rata-rata 50,00, tertinggi 50, terendah 50, lulus 0. Skor 59 dan 60 dalam `n = 2`: jumlah 119, rata-rata 59,50, tertinggi 60, terendah 59, lulus 1. Skor 0 dan 100: jumlah 100, rata-rata 50,00, tertinggi 100, terendah 0, lulus 1. 3: bandingkan baris demi baris; bila beda, tanyakan dulu apakah hitungan tangan atau program yang salah. 4: (a) rancangan; (b) spesifikasi; (c) implementasi; (d) uji.

**Latihan bercampur.** 1: `(` masuk, `[` masuk, `]` cocok dengan `[` dan keluar, `{` masuk, `)` bertemu `{` di puncak: tidak cocok. Saat itu tumpukan berisi `(` dan `{` (puncak `{`). 2: sekitar 5000 langkah untuk rekap (lima perulangan atas 1000 data); bubble sort sekitar `1000 * 999 / 2`, hampir 500 ribu perbandingan, jadi sekitar seratus kali lebih banyak. 3: pencarian biner, paling banyak sekitar 14 langkah (`2^13 = 8192 < 10000 <= 2^14 = 16384`).

**Ulang berjarak.** 1: spesifikasi (masukan, keluaran, batasan, aturan, contoh), rancangan (pseudocode dan daftar fungsi), implementasi (kode), uji (tabel kasus uji). 2: batasan menentukan algoritma yang masuk akal dan tipe data yang cukup; `n` sampai 1000 dan `n` sampai sepuluh juta menuntut cara yang berbeda. 3: makin banyak pekerjaan yang bergantung pada keputusan yang salah, makin banyak yang harus dibongkar; mengubah satu kalimat spesifikasi lebih murah daripada menulis ulang rancangan dan kode.

## Langkah berikutnya

Modul berikut: `a-xi1-m2` (kualitas kode dan pengujian), tempat kamu mengubah kasus uji menjadi berkas uji yang dijalankan program. Modul terkait: `matkom-pertumbuhan-fungsi`. Bacaan lanjut: halaman GCC tentang `-Wall`, `-Wextra`, dan `-Werror`, tiga pilihan yang membuat kompilator ikut memeriksa kodemu.
