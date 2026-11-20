## Untuk siapa modul ini

Modul ini untuk murid kelas XI jalur A (Algoritmik dengan C++), minggu `A-XI1-M14` silabus v1.4.1: asesmen dan refleksi semester 1 kelas XI. Prasyarat: modul `a-xi1-m12` dan seluruh modul `a-xi1-m1` sampai `a-xi1-m13`; modul ini menilai semuanya.

Modul ini karangan penyusun dan disetujui pemilik program pada 2026-11-20 (keputusan lewat dialog; catatan tinjauan menjadi tindak lanjut revisi), dan tidak dihitung sebagai pemenuhan butir capaian pembelajaran. Asesmen ini **tanpa AI**: jangan memakai AI generatif saat mengerjakannya (silabus 7.4), karena tujuannya melihat apa yang bisa kamu selesaikan sendiri. Bobot nilai dan predikat mengikuti kebijakan sekolah `[belum terverifikasi]`; modul ini hanya memberi soal dan kunci latihan. Semua data di soal adalah karangan.

## Ingat kembali

Ini inti asesmen: jawab dari ingatan, tanpa melihat catatan, lalu cocokkan dengan kunci. Soal 1 dari `a-xi1-m13`, soal 2 dari `a-xi1-m11`, soal 3 dari `a-xi1-m6`, soal 4 dari `a-xi1-m8`, soal 5 dari `a-xi1-m9`.

1. Mengapa solusi cepat diperiksa dengan solusi lengkap pada data kecil?
2. Mengapa pemangkasan menghemat langkah, dan syarat apa yang membuatnya aman?
3. Mengapa sebuah greedy harus dibuktikan atau diuji, tidak cukup terasa masuk akal?
4. Mengapa pembanding untuk `std::sort` memakai `<`, bukan `<=`?
5. Apa yang terjadi bila `m[k]` dibaca padahal kunci `k` belum ada di `map`?

## Tujuan

Soal di modul ini menilai apakah kamu dapat:

- menulis pseudocode lalu program C++ yang memakai pengurutan dengan pembanding, `set`, atau `map`;
- menelusuri program rekursif atau backtracking dan menghitung banyak pemanggilannya;
- menemukan galat pada pembanding, backtracking, dan pemakaian `map`;
- memilih strategi (greedy, pencarian lengkap, heap) dengan alasan yang menyebut kebenaran dan banyak langkah.

## Latihan bercampur

Kerjakan sendiri, `AI: tanpa AI`, dengan waktu yang ditetapkan gurumu.

1. **Tulis.** Tulis pseudocode lalu program: baca `n`, lalu `n` pasang `nama skor`. Cetak peringkat dengan skor menurun, dan nama menaik bila skor sama; lalu cetak banyak skor yang berbeda. Pakai `std::sort` dengan pembanding sendiri dan `set`.
2. **Telusuri.** Program berikut dijalankan. Apa yang tercetak, dan berapa kali `hitung` dipanggil untuk `hitung(0, 6)`? Gambar pohon pemanggilannya.

   ```cpp
   #include <iostream>
   using namespace std;

   int a[3] = {2, 3, 4};

   int hitung(int i, int sisa) {
     if (sisa == 0) {
       return 1;
     }
     if (i == 3 || sisa < 0) {
       return 0;
     }
     return hitung(i + 1, sisa - a[i]) + hitung(i + 1, sisa);
   }

   int main() {
     cout << hitung(0, 6) << "\n";
   }
   ```

3. **Cari galat.** Tiga potongan berikut sengaja salah. Untuk tiap potongan tulis galatnya, akibatnya, dan perbaikannya.

   ```text
   (a) bool lebihDulu(const Murid& a, const Murid& b) { return a.nilai >= b.nilai; }
   (b) cur.push_back(x);
       susun(pos + 1, n, cur, dipakai);
   (c) if (frek["pir"] > 0) { cout << "ada pir\n"; }
   ```

4. **Praktik.** Kompilasi programmu dari nomor 1 dengan `g++ -std=c++17 -Wall -Wextra` dan jalankan dengan masukan dari berkas. Tulis dua uji yang kamu pilih, satu di antaranya `n = 1`, beserta hasil yang kamu prediksi.
5. **Strategi.** (a) Beri satu himpunan voucher dan satu `T` yang membuat greedy "terbesar dulu" gagal, lengkap dengan hitungannya. (b) Dari satu juta bilangan kamu perlu sepuluh terbesar: pilih strategi dan beri alasan dengan perkiraan banyak langkah.

## Refleksi

Tulis jawabanmu di jurnalmu sendiri. Jurnal ini tidak dikumpulkan ke repositori dan tidak ada jawaban benar atau salah; yang dinilai adalah kejujuran dan rencanamu.

1. Apa dua hal yang sekarang sudah kamu kuasai? Tulis buktinya (soal mana yang kamu jawab tanpa ragu).
2. Apa satu hal yang masih keliru atau membingungkan? Soal mana yang memperlihatkannya?
3. Apa yang akan kamu lakukan berbeda minggu depan, dan kapan kamu akan mengulang bagian yang lemah?
4. Dari semua yang dipelajari, bagian mana yang paling menarik untuk semester berikutnya, dan mengapa?

Mengulang bagian yang lemah dengan mencoba mengingat lebih dulu, lalu menjarakkan waktunya, membantu ingatan jangka panjang lebih baik daripada membaca ulang catatan.

## Cek mandiri

- [ ] Saya dapat menulis program dengan `sort` berpembanding, `set`, atau `map`.
- [ ] Saya dapat menelusuri rekursi dan backtracking dan menghitung pemanggilannya.
- [ ] Saya dapat menemukan galat pembanding, lupa membatalkan pilihan, dan `m[k]` yang membuat entri.
- [ ] Saya dapat memilih strategi dan menjelaskan alasannya dengan perkiraan langkah.
- [ ] Saya dapat mengompilasi dan menguji programku dengan nilai batas.

## Kunci dan petunjuk

**Ingat kembali.** 1: cara lengkap pasti benar dan sederhana, sehingga menjadi pembanding yang dipercaya untuk solusi cepat yang belum terbukti. 2: cabang yang pasti gagal tidak dijelajahi sehingga pemanggilan berkurang; syaratnya hanya membuang cabang yang benar-benar tidak mungkin berhasil. 3: aturan yang tampak masuk akal bisa gagal pada data tertentu, misalnya durasi terpendek dulu; hanya bukti atau uji terhadap solusi lengkap pada banyak data kecil yang meyakinkan. 4: dua elemen setara tidak boleh dinyatakan saling mendahului; `<=` melanggar aturan itu. 5: `m[k]` membuat entri baru bernilai awal dan `size()` bertambah.

**Latihan bercampur.** 1: pseudocode: baca `n` pasang ke `vector`; urutkan dengan pembanding (skor besar dulu, nama kecil bila sama); cetak; masukkan semua skor ke `set`; cetak `size()`. Program contoh:

```cpp
#include <algorithm>
#include <iostream>
#include <set>
#include <string>
#include <vector>
using namespace std;

struct Murid {
  string nama;
  int skor;
};

bool lebihDulu(const Murid& a, const Murid& b) {
  if (a.skor != b.skor) {
    return a.skor > b.skor;
  }
  return a.nama < b.nama;
}

int main() {
  int n;
  cin >> n;
  vector<Murid> m(n);
  set<int> berbeda;
  for (int i = 0; i < n; i++) {
    cin >> m[i].nama >> m[i].skor;
    berbeda.insert(m[i].skor);
  }
  sort(m.begin(), m.end(), lebihDulu);
  for (const Murid& x : m) {
    cout << x.nama << " " << x.skor << "\n";
  }
  cout << berbeda.size() << " skor berbeda\n";
}
```

Masukan (`masukan.txt`):

```text
5
lima 70
dua 90
satu 90
empat 70
tiga 85
```

Keluaran:

```text
dua 90
satu 90
tiga 85
empat 70
lima 70
3 skor berbeda
```

2: hanya satu himpunan bagian berjumlah 6, yaitu `{2, 4}`, sehingga tercetak `1`. Pohon: `hitung(0, 6)` memanggil `(1, 4)` dan `(1, 6)`; masing-masing memanggil dua lagi pada tingkat berikutnya, dan seterusnya sampai tingkat 3, sehingga `1 + 2 + 4 + 8 = 15` pemanggilan. Satu-satunya daun yang bernilai 1 adalah `(3, 0)`, dicapai dengan memilih 2, melewati 3, memilih 4. Keluarannya:

```text
1
```

3: (a) `>=` membuat dua elemen setara saling mendahului; akibatnya perilaku `sort` tak terjamin; perbaikan `>` dan tambahkan kunci kedua. (b) tidak ada `cur.pop_back()` dan pemulihan `dipakai[x]` sesudah pemanggilan rekursif; akibatnya pilihan bocor ke cabang lain dan hasil terlewat; perbaikan: tambahkan `cur.pop_back(); dipakai[x] = false;`. (c) `frek["pir"]` membuat entri `"pir"` bernilai 0 bila belum ada; akibatnya `size()` bertambah; perbaikan: `frek.count("pir") > 0` atau `frek.find("pir") != frek.end()`. 4: contoh uji: masukan `1` dan `satu 50` dengan prediksi `satu 50` lalu `1 skor berbeda`; masukan di atas dengan prediksi seperti keluaran kunci. Bila `g++` memberi peringatan, baca dan perbaiki. 5: (a) voucher `{4, 3, 1}` dan `T = 6`: greedy memilih `4 + 1 + 1` (3 voucher) padahal `3 + 3` (2 voucher). (b) heap terkecil berukuran 10: sekitar `1.000.000 * log2 10`, yaitu 3.300.000 langkah, dibanding sekitar 19.900.000 langkah bila diurutkan semuanya, dan memori hanya 10 bilangan.

**Rubrik singkat.** Untuk soal 1 dan 4, periksa empat hal: ketepatan (program memenuhi tujuan), keterbacaan (nama dan fungsi jelas), pengujian (disebut cara mengujinya, termasuk nilai batas), dan justifikasi (alasan pilihan). Skala yang disarankan: sudah, sebagian, belum, per hal. Untuk soal 2, 3, dan 5, jawaban dinilai benar bila angka dan alasan sama dengan kunci atau setara.

**Refleksi.** Tidak ada kunci. Jawaban yang baik menyebut bukti, bagian yang lemah, dan rencana yang jelas waktunya.

## Langkah berikutnya

Semester berikutnya jalur A dimulai dengan `a-xi2-m1` (pemrograman dinamis: gagasan), yang mengembangkan "DP kecil" dari minggu 12. Jadikan hasil refleksi tadi rencana belajarmu sebelum minggu pertama. Modul terkait: `matkom-pertumbuhan-fungsi` untuk memperdalam perbandingan pertumbuhan langkah. Bacaan lanjut: halaman cppreference tentang `std::sort` dan `std::map`.
