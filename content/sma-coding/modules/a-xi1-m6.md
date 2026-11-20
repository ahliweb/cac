## Untuk siapa modul ini

Modul ini untuk murid kelas XI jalur A (Algoritmik dengan C++), minggu `A-XI1-M6` silabus v1.4.1: greedy II. Prasyarat: modul `a-xi1-m5` (greedy I). Fokusnya menguji kapan sebuah strategi greedy benar atau salah.

Modul ini karangan penyusun dan disetujui pemilik program pada 2026-11-20 (keputusan lewat dialog; catatan tinjauan menjadi tindak lanjut revisi). Butir `F-AP-a`, `F-AP-b`, dan `F-BK-b` dipetakan silabus sebagai dipenuhi jalur ini; pemenuhan butir mengikuti pemetaan silabus, bukan status modul. Keluarga materi OSN yang bertaut: `strategi-problem-solving` (greedy ada di panduan, bukan pengayaan). Modul tidak menjanjikan kedalaman soal OSN dan tidak menggantikan pembinaan OSN.

Bila kamu pernah memakai Python: gagasannya sama dengan memilih urutan lalu menyaring dalam satu perulangan. Tiap soal latihan bertanda `AI: boleh` atau `AI: tanpa AI`. Masukan program diberikan lewat berkas: `./program < masukan.txt`.

## Ingat kembali

Jawab dari ingatan dulu, baru cek di kunci. Soal 1 dari `a-xi1-m5`, soal 2 dari `a-xi1-m3`, soal 3 dari `a-x2-m12`.

1. Apa arti pilihan serakah, dan mengapa tidak ada percabangan seperti pada pencarian lengkap?
2. Mengapa pencarian lengkap selalu menghasilkan jawaban benar, dan apa harganya?
3. Apa arti `O(n^2)` secara intuitif, dan mengapa konstanta di depannya diabaikan?

## Tujuan

Setelah modul ini kamu dapat:

- menulis greedy pemilihan kegiatan: sebanyak mungkin kegiatan yang tidak bentrok;
- menyebut tiga aturan pilihan yang menggoda dan menemukan contoh tandingan bagi yang salah;
- menyusun alasan mengapa aturan "selesai paling awal dulu" benar;
- menguji sebuah greedy dengan pencarian lengkap pada data kecil.

## Prediksi dulu

Ini tugas baca-dan-prediksi, `AI: tanpa AI`. **Tebak dulu, tulis jawabanmu, baru jalankan.** Tiga kegiatan karangan punya jam mulai dan jam selesai: `(1, 6)`, `(5, 8)`, dan `(7, 12)`. Dua kegiatan bentrok bila waktunya beririsan; kegiatan yang mulai tepat saat yang lain selesai tidak bentrok. Dua aturan greedy mengurutkan kegiatan, lalu memilih yang tidak bentrok dengan pilihan sebelumnya.

```cpp
#include <iostream>
#include <vector>
using namespace std;

int pilih(const vector<int>& mulai, const vector<int>& selesai, const vector<int>& kunci) {
  int n = mulai.size();
  vector<int> urut(n);
  for (int i = 0; i < n; i++) {
    urut[i] = i;
  }
  for (int i = 1; i < n; i++) {
    int x = urut[i];
    int j = i - 1;
    while (j >= 0 && kunci[urut[j]] > kunci[x]) {
      urut[j + 1] = urut[j];
      j--;
    }
    urut[j + 1] = x;
  }
  vector<int> dipilih;
  for (int t = 0; t < n; t++) {
    int a = urut[t];
    bool bentrok = false;
    for (int b : dipilih) {
      if (mulai[a] < selesai[b] && mulai[b] < selesai[a]) {
        bentrok = true;
      }
    }
    if (!bentrok) {
      dipilih.push_back(a);
    }
  }
  return dipilih.size();
}

int main() {
  vector<int> mulai = {1, 5, 7};
  vector<int> selesai = {6, 8, 12};
  vector<int> durasi = {5, 3, 5};
  cout << pilih(mulai, selesai, selesai) << " " << pilih(mulai, selesai, durasi) << "\n";
}
```

1. Berapa kegiatan yang terpilih oleh aturan "selesai paling awal dulu" dan oleh aturan "durasi terpendek dulu"?
2. Mana yang menurutmu masuk akal secara intuisi, dan apakah intuisi itu cukup?

Simpan tebakanmu. Perbandingannya ada di bagian berikutnya.

## Contoh terselesaikan

Keluaran program tadi:

Keluaran:

```text
2 1
```

Aturan "selesai paling awal dulu" memilih `(1, 6)` lalu `(7, 12)`: dua kegiatan. Aturan "durasi terpendek dulu" memilih `(5, 8)` yang bentrok dengan keduanya: satu kegiatan. Kedua aturan tampak masuk akal, tetapi salah satunya salah, dan **satu contoh tandingan cukup** untuk membuktikannya. Program berikut membaca `n` kegiatan dan memilih dengan aturan yang benar: urutkan menurut jam selesai, lalu ambil kegiatan yang mulai tidak sebelum selesainya kegiatan terakhir yang dipilih.

```cpp
#include <iostream>
#include <vector>
using namespace std;

int main() {
  int n;
  cin >> n;
  vector<int> mulai(n);
  vector<int> selesai(n);
  for (int i = 0; i < n; i++) {
    cin >> mulai[i] >> selesai[i];
  }
  for (int i = 1; i < n; i++) {
    int m = mulai[i];
    int s = selesai[i];
    int j = i - 1;
    while (j >= 0 && selesai[j] > s) {
      mulai[j + 1] = mulai[j];
      selesai[j + 1] = selesai[j];
      j--;
    }
    mulai[j + 1] = m;
    selesai[j + 1] = s;
  }
  int akhir = -1;
  int banyak = 0;
  for (int i = 0; i < n; i++) {
    if (mulai[i] >= akhir) {
      banyak++;
      akhir = selesai[i];
      cout << "(" << mulai[i] << ", " << selesai[i] << ")\n";
    }
  }
  cout << banyak << " kegiatan\n";
}
```

Masukan (`masukan.txt`):

```text
8
2 5
1 3
4 8
7 10
9 12
3 6
11 14
6 9
```

Keluaran:

```text
(1, 3)
(3, 6)
(6, 9)
(9, 12)
4 kegiatan
```

Langkah: insertion sort untuk `n = 8` paling banyak sekitar `8 * 7 / 2 = 28` perbandingan, lalu pemindaian 8 langkah. Pemindaian `O(n)`; dengan pengurutan insertion total `O(n^2)`, dan dengan pengurutan yang lebih cepat `O(n log n)`.

**Mengapa benar?** Ambil sebuah himpunan kegiatan yang optimal. Kegiatan pertamanya, katakan `x`, tak lebih awal selesai daripada kegiatan `g` yang selesai paling awal di seluruh data. Ganti `x` dengan `g`: karena `g` selesai tak lebih lambat daripada `x`, ia tidak bentrok dengan kegiatan-kegiatan optimal sesudahnya, dan banyaknya tetap sama. Jadi ada solusi optimal yang memuat `g`. Sisa masalahnya sama bentuknya: pilih sebanyak mungkin dari kegiatan yang mulai tidak sebelum `g` selesai. Terapkan argumen itu berulang. Itu argumen pertukaran. Aturan "mulai paling awal dulu" dan "durasi terpendek dulu" tak punya argumen seperti itu; program berikut mencari contoh tandingannya dengan membandingkan ketiga aturan pada beberapa himpunan kecil dengan hasil terbaik dari pencarian lengkap.

```cpp
#include <iostream>
#include <vector>
using namespace std;

int urutanPilih(const vector<int>& mulai, const vector<int>& selesai, int aturan) {
  int n = mulai.size();
  vector<int> kunci(n);
  for (int i = 0; i < n; i++) {
    kunci[i] = aturan == 0 ? selesai[i] : (aturan == 1 ? mulai[i] : selesai[i] - mulai[i]);
  }
  vector<int> urut(n);
  for (int i = 0; i < n; i++) {
    urut[i] = i;
  }
  for (int i = 1; i < n; i++) {
    int x = urut[i];
    int j = i - 1;
    while (j >= 0 && kunci[urut[j]] > kunci[x]) {
      urut[j + 1] = urut[j];
      j--;
    }
    urut[j + 1] = x;
  }
  vector<int> dipilih;
  for (int t = 0; t < n; t++) {
    int a = urut[t];
    bool bentrok = false;
    for (int b : dipilih) {
      if (mulai[a] < selesai[b] && mulai[b] < selesai[a]) {
        bentrok = true;
      }
    }
    if (!bentrok) {
      dipilih.push_back(a);
    }
  }
  return dipilih.size();
}

int terbaik(const vector<int>& mulai, const vector<int>& selesai, int i, vector<int>& dipilih) {
  if (i == (int)mulai.size()) {
    return dipilih.size();
  }
  int hasil = terbaik(mulai, selesai, i + 1, dipilih);
  bool bentrok = false;
  for (int b : dipilih) {
    if (mulai[i] < selesai[b] && mulai[b] < selesai[i]) {
      bentrok = true;
    }
  }
  if (!bentrok) {
    dipilih.push_back(i);
    int ambil = terbaik(mulai, selesai, i + 1, dipilih);
    dipilih.pop_back();
    if (ambil > hasil) {
      hasil = ambil;
    }
  }
  return hasil;
}

int main() {
  vector<vector<int>> mulaiSemua = {{1, 5, 7}, {1, 2, 4}, {2, 1, 4, 7, 9, 3, 11, 6}};
  vector<vector<int>> selesaiSemua = {{6, 8, 12}, {10, 3, 5}, {5, 3, 8, 10, 12, 6, 14, 9}};
  for (int h = 0; h < 3; h++) {
    vector<int> dipilih;
    cout << "himpunan " << h + 1 << ": selesai-dulu " << urutanPilih(mulaiSemua[h], selesaiSemua[h], 0)
         << ", mulai-dulu " << urutanPilih(mulaiSemua[h], selesaiSemua[h], 1)
         << ", singkat-dulu " << urutanPilih(mulaiSemua[h], selesaiSemua[h], 2)
         << ", terbaik " << terbaik(mulaiSemua[h], selesaiSemua[h], 0, dipilih) << "\n";
  }
}
```

Keluaran:

```text
himpunan 1: selesai-dulu 2, mulai-dulu 2, singkat-dulu 1, terbaik 2
himpunan 2: selesai-dulu 2, mulai-dulu 1, singkat-dulu 2, terbaik 2
himpunan 3: selesai-dulu 4, mulai-dulu 4, singkat-dulu 4, terbaik 4
```

Pada himpunan 1, "durasi terpendek dulu" salah; pada himpunan 2, "mulai paling awal dulu" salah (`(1, 10)` menutup dua kegiatan pendek yang tak bentrok satu sama lain). "Selesai paling awal dulu" tak pernah kalah dari yang terbaik, sesuai argumen tadi. Sebaliknya, tiga himpunan yang cocok bukan bukti; argumenlah yang membuktikan, sedangkan uji menemukan contoh tandingan.

## Contoh setengah jadi

Lengkapi pemindaian greedy setelah kegiatan terurut menurut jam selesai.

```cpp setengah-jadi
int akhir = -1;
int banyak = 0;
for (int i = 0; i < n; i++) {
  if (mulai[i] ____ akhir) {
    banyak++;
    akhir = ____[i];
  }
}
cout << ____ << "\n";
```

## Soal Parsons

Susun delapan baris berikut (sudah diacak) menjadi pemindaian greedy untuk pemilihan kegiatan. `AI: tanpa AI`: tujuannya melatih membaca urutan.

```text
(a)   int akhir = -1, banyak = 0;
(b)   for (int i = 0; i < n; i++) {
(c)     if (mulai[i] >= akhir) {
(d)       banyak++;
(e)       akhir = selesai[i];
(f)     }
(g)   }
(h)   return banyak;
```

## Latihan

1. `AI: boleh` **Pilih kegiatan.** Tulis pseudocode lalu program yang membaca `n` kegiatan dan mencetak banyak kegiatan maksimal. Uji dengan `n = 1`, semua kegiatan bentrok, tak ada yang bentrok, dan satu pasang yang hanya bersentuhan di ujung.
2. `AI: tanpa AI` **Contoh tandingan.** Buat empat kegiatan sehingga aturan "mulai paling awal dulu" memilih satu kegiatan padahal tiga kegiatan dapat dipilih.
3. `AI: boleh` **Uji pembanding.** Bandingkan greedy "selesai paling awal dulu" dengan pencarian lengkap pada seribu himpunan kecil buatan (misalnya dengan pembangkit bilangan sederhana buatanmu sendiri). Berapa selisih yang kamu temukan?
4. `AI: tanpa AI` **Hitung tangan.** Dengan aturan "selesai paling awal dulu", pilih dari `(3, 5)`, `(1, 4)`, `(5, 9)`, `(0, 2)`, dan `(6, 8)`. Kegiatan mana yang terpilih?
5. *Opsional:* **catatan pemakaian AI.** Bila memakai AI generatif, jawab nomor 1 sendiri dulu, lalu minta penjelasan atau petunjuk bertahap, bukan program jadi. Catat alatnya, tujuanmu, garis besar perintahmu, bagian yang kamu pakai, dan caramu memeriksanya (jalankan atau telusuri). Jangan menaruh data pribadi atau tugas bernilai pada perintah.

## Latihan bercampur

1. `AI: tanpa AI` Alasan greedy koin di `a-xi1-m5` memakai "kelipatan", sedangkan greedy kegiatan memakai pertukaran. Apa persamaan keduanya (modul `a-xi1-m5`)?
2. `AI: boleh` Mengapa insertion sort yang stabil membantu bila dua kegiatan selesai pada jam yang sama (modul `a-x2-m10`)?
3. `AI: boleh` Rancang pemangkasan untuk pencarian lengkap kegiatan: bila banyak terpilih ditambah sisa kegiatan tak lebih besar dari yang terbaik, berhenti (modul `a-xi1-m4`).

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `a-xi1-m7` (pertanyaan 1), sekitar tiga minggu lagi di `a-xi1-m9` (pertanyaan 2), dan sekitar delapan minggu lagi di `a-xi1-m14` (pertanyaan 3). Jawab sekarang lalu simpan.

1. Bagaimana kamu mencari contoh tandingan untuk sebuah aturan greedy?
2. Mengapa memilih kegiatan yang selesai paling awal tidak merugikan pilihan berikutnya?
3. Mengapa sebuah greedy harus dibuktikan atau diuji, tidak cukup terasa masuk akal?

## Kesalahan umum

- **Menganggap aturan yang tampak masuk akal pasti benar.** "Durasi terpendek dulu" tampak wajar, tetapi gagal.
- **Memeriksa dengan terlalu sedikit data.** Aturan yang salah bisa cocok pada beberapa contoh; uji dengan banyak data kecil dan pencarian lengkap.
- **Salah mengartikan bentrok.** Bila `selesai == mulai`, kegiatan tidak bentrok; memakai `>` bukan `>=` membuang pilihan yang sah.
- **Lupa mengurutkan lebih dulu.** Greedy kegiatan benar hanya setelah data terurut menurut jam selesai.
- **Menyamakan "tak ada contoh tandingan yang kutemukan" dengan "benar".** Hanya argumen atau bukti yang menutup semua kasus.

## Cek mandiri

- [ ] Saya dapat menulis greedy pemilihan kegiatan.
- [ ] Saya dapat menyebut aturan greedy yang salah dan contoh tandingannya.
- [ ] Saya dapat menjelaskan argumen pertukaran secara garis besar.
- [ ] Saya dapat menguji greedy dengan pencarian lengkap.
- [ ] Saya memperlakukan "bentrok" dengan batas yang jelas.

## Kunci dan petunjuk

**Ingat kembali.** 1: ambil pilihan terbaik menurut satu aturan dan tak membatalkannya; tidak ada yang perlu dicoba ulang, jadi tidak bercabang. 2: tak ada kemungkinan yang terlewat; harganya waktu yang tumbuh cepat. 3: bila `n` menjadi 10 kali lebih besar, langkahnya sekitar 100 kali; konstanta tidak mengubah pola itu.

**Prediksi dulu.** 1: `2 1`. 2: intuisi "pendek lebih baik" menggoda, tetapi tidak cukup; contohnya membuktikan sebaliknya.

**Contoh setengah jadi.** Isi: `>=`, `selesai`, dan `banyak`. Program lengkap, dengan data yang sudah terurut menurut jam selesai:

```cpp
#include <iostream>
#include <vector>
using namespace std;

int main() {
  vector<int> mulai = {0, 1, 3, 6, 5};
  vector<int> selesai = {2, 4, 5, 8, 9};
  int n = 5;
  int akhir = -1;
  int banyak = 0;
  for (int i = 0; i < n; i++) {
    if (mulai[i] >= akhir) {
      banyak++;
      akhir = selesai[i];
    }
  }
  cout << banyak << "\n";
}
```

Keluaran:

```text
3
```

**Soal Parsons.** Urutan benar: a, b, c, d, e, f, g, h.

**Latihan.** 1: kasus tepi: `n = 1` memberi 1; semua bentrok memberi 1; tak ada yang bentrok memberi `n`; `(1, 3)` dan `(3, 5)` memberi 2. 2: `(1, 20)`, `(2, 4)`, `(5, 7)`, `(8, 10)`: mulai paling awal memilih `(1, 20)` dan menutup semuanya (1 kegiatan), padahal tiga kegiatan pendek tak bentrok. 3: bila implementasi benar, selisih nol; selisih tak nol menandakan cacat di program atau di pembangkit. 4: urutan menurut selesai: `(0, 2)`, `(1, 4)`, `(3, 5)`, `(6, 8)`, `(5, 9)`; terpilih `(0, 2)`, `(3, 5)`, `(6, 8)`, yaitu tiga kegiatan.

**Latihan bercampur.** 1: keduanya menunjukkan bahwa pilihan serakah tidak merugikan: ada solusi optimal yang memuatnya, dan sisa masalah berbentuk sama. 2: bila urutannya stabil, kegiatan yang selesai pada jam yang sama tetap berurutan seperti di masukan, sehingga hasilnya dapat diperkirakan. 3: bila terpilih + sisa kegiatan yang belum diperiksa tak lebih besar dari terbaik, cabang itu tak dapat memperbaikinya.

**Ulang berjarak.** 1: tulis pencarian lengkap yang pasti benar, bandingkan pada banyak himpunan kecil, dan cari himpunan yang jawabannya berbeda. 2: kegiatan yang selesai paling awal meninggalkan sisa waktu terbanyak; ia dapat menggantikan kegiatan pertama solusi mana pun tanpa menambah bentrok. 3: tampak masuk akal tidak menutup semua kasus; satu contoh tandingan cukup untuk membuktikan salah, sedangkan benar memerlukan argumen.

## Langkah berikutnya

Modul berikut: `a-xi1-m7` (rekursi dan divide-and-conquer), tempat kamu memecah masalah menjadi submasalah. Modul terkait: `matkom-pertumbuhan-fungsi`. Bacaan lanjut: halaman cppreference tentang `for` loop.
