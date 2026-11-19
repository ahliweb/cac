## Untuk siapa modul ini

Modul ini untuk murid kelas XI jalur C (IoT dan robotika), minggu `C-XI2-M10` silabus v1.4: rekap dan visualisasi. Prasyarat: modul `c-xi2-m9` (sumber data terbuka dan legal) dan `c-x2-m12` (pencatatan data); kamu juga memakai pengetahuan rata-rata dan penjagaan pembagian nol dari semester-semester sebelumnya.

Modul ini berstatus DRAF: karangan penyusun, belum ditinjau pemilik. Ia mendukung butir `F-AD-a` (data terbuka, keputusan, dan prediksi) dan tidak dihitung memenuhi butir capaian pembelajaran mana pun. Keluaran minggu ini: tabel dan grafik. Latihan silabusnya: rekap suhu per jam.

Seluruh modul ini dapat dikerjakan **tanpa papan**: program berjalan di komputer dengan data karangan, dan grafiknya berupa teks. Dengan papan, kamu dapat merekap data dari catatan yang kamu kumpulkan sendiri. Modul ini tidak memakai perangkat fisik; aturan keselamatan dari modul sebelumnya tetap berlaku bila kamu memakai papan.

## Ingat kembali

Jawab dari ingatan dulu, baru cek di kunci. Soal 1 dari `C-XI2-M2`, soal 2 dari `C-XI2-M7`, soal 3 dari `C-XI2-M9`.

1. Mengapa sandi bawaan perangkat harus diganti sebelum perangkat dipasang di jaringan?
2. Mengapa teks di dalam JSON harus meloloskan tanda kutip?
3. Mengapa satuan dan lokasi pengukuran dicatat di catatan sumber?

## Tujuan

Setelah modul ini kamu dapat:

- mengelompokkan pembacaan menurut satu kategori, di sini jam, dengan kunci pengelompokan yang jelas;
- menghitung jumlah, nilai terkecil, rata-rata, dan nilai terbesar per kelompok, dan mencatat berapa pembacaan yang gagal;
- menangani kelompok tanpa data sah tanpa membagi dengan nol;
- menyajikan rekap sebagai tabel dan grafik batang teks dengan sumbu dan satuan yang dinyatakan;
- menjelaskan bagaimana sumbu yang tidak dimulai dari nol mengubah kesan sebuah grafik.

## Prediksi dulu

Dua belas pembacaan suhu karangan, satu nilai tiap kira-kira 20 menit. Program di bawah mengelompokkan pembacaan per jam (detik dibagi 3600, dibulatkan ke bawah), melewatkan pembacaan yang gagal (`NAN`) tetapi menghitungnya, lalu mencetak tabel dan batang. **Tebak dulu, tulis jawabanmu, baru jalankan.**

| Detik | 300 | 1500 | 2700 | 3300 | 3900 | 5100 | 6300 | 6900 | 7500 | 8700 | 9900 | 10500 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Suhu | 27,0 | 27,4 | 27,9 | 28,5 | 28,8 | gagal | 29,6 | 29,2 | 29,0 | 28,4 | 27,8 | 27,5 |

1. Berapa pembacaan sah dan berapa yang gagal pada jam ke-1?
2. Jam mana yang rata-ratanya tertinggi? Perkirakan rata-ratanya.
3. Batang jam ke-0 lebih panjang atau lebih pendek daripada batang jam ke-2? Mengapa?

## Contoh terselesaikan

Data mentah yang panjang sulit dibaca. **Rekap** merangkumnya per **kategori**: kelompok pembacaan yang punya kunci yang sama, misalnya jam dalam hari, ruangan, atau sensor. Untuk tiap kelompok kita hitung jumlah pembacaan sah `n`, nilai terkecil, rata-rata, dan nilai terbesar. Dua hal sering terlupa. Pertama, **catat jumlah yang hilang**: rata-rata dari tiga pembacaan dan dari empat pembacaan tidak sama kuat, dan pembaca berhak tahu. Kedua, kelompok yang semua pembacaannya hilang tidak boleh dibagi dengan `n = 0`; ia dilaporkan sebagai "tidak ada data sah".

Grafik batang teks di bawah mencetak satu tanda `#` untuk tiap 0,25 derajat di atas batas bawah sumbu, yaitu 26. Grafik harus menyatakan sumbunya: apa yang diukur, satuannya, dan dari mana sumbu mulai. Datanya karangan.

```cpp
// C++17 biasa, jalan di komputer. Diperiksa oleh check:module-code.
#include <cmath>
#include <cstdio>
#include <map>
#include <string>

struct Pembacaan {
  long detik;   // detik sejak program pengamat mulai
  double suhu;  // NAN bila sensor gagal dibaca
};

struct Rekap {
  int n = 0;       // jumlah pembacaan sah
  int hilang = 0;  // jumlah pembacaan gagal
  double jumlah = 0;
  double min = 0;
  double max = 0;
};

const double BATAS_BAWAH = 26.0;  // sumbu grafik dimulai dari 26, bukan 0
const double SKALA = 4.0;         // 1 derajat = 4 tanda

void tambah(Rekap &r, double suhu) {
  if (std::isnan(suhu)) {
    r.hilang++;
    return;
  }
  if (r.n == 0 || suhu < r.min) r.min = suhu;
  if (r.n == 0 || suhu > r.max) r.max = suhu;
  r.jumlah += suhu;
  r.n++;
}

int panjangBatang(double rata) {
  int p = static_cast<int>(std::lround((rata - BATAS_BAWAH) * SKALA));
  if (p < 0) p = 0;
  return p;
}

int main() {
  // Data karangan: dua belas pembacaan dalam tiga jam.
  const Pembacaan data[] = {
      {300, 27.0},  {1500, 27.4}, {2700, 27.9}, {3300, 28.5}, {3900, 28.8},  {5100, NAN},
      {6300, 29.6}, {6900, 29.2}, {7500, 29.0}, {8700, 28.4}, {9900, 27.8}, {10500, 27.5},
  };
  std::map<int, Rekap> perJam;
  for (const Pembacaan &p : data) {
    tambah(perJam[static_cast<int>(p.detik / 3600)], p.suhu);
  }

  std::printf("jam |  n hilang  min  rata  maks\n");
  for (const auto &baris : perJam) {
    const Rekap &r = baris.second;
    if (r.n == 0) {
      std::printf("%3d |  0 %6d  (tidak ada data sah)\n", baris.first, r.hilang);
      continue;
    }
    std::printf("%3d | %2d %6d %5.1f %5.1f %5.1f\n", baris.first, r.n, r.hilang, r.min,
                r.jumlah / r.n, r.max);
  }

  std::printf("\nrata-rata per jam (sumbu mulai dari %.0f derajat C, satu tanda = %.2f derajat)\n",
              BATAS_BAWAH, 1.0 / SKALA);
  for (const auto &baris : perJam) {
    const Rekap &r = baris.second;
    if (r.n == 0) continue;
    double rata = r.jumlah / r.n;
    std::printf("jam %d | %s %.1f\n", baris.first, std::string(panjangBatang(rata), '#').c_str(),
                rata);
  }
}
```

Keluarannya:

```text
jam |  n hilang  min  rata  maks
  0 |  4      0  27.0  27.7  28.5
  1 |  3      1  28.8  29.2  29.6
  2 |  4      0  27.5  28.2  29.0

rata-rata per jam (sumbu mulai dari 26 derajat C, satu tanda = 0.25 derajat)
jam 0 | ####### 27.7
jam 1 | ############# 29.2
jam 2 | ######### 28.2
```

Jam ke-1 punya tiga pembacaan sah dan satu gagal, dan rata-ratanya dihitung dari tiga (87,6 dibagi 3 = 29,2). Rata-rata jam ke-2 adalah 28,175 yang dicetak 28,2 dengan satu desimal. Batang jam ke-1 tampak hampir dua kali panjang batang jam ke-0 (13 lawan 7 tanda), padahal rata-ratanya 29,2 dan 27,7, hanya berbeda 1,5 derajat. Itu akibat sumbu yang dimulai dari 26: panjang batang menunjukkan jarak dari 26, bukan nilai suhunya. Sumbu yang dipotong sah untuk suhu selama dinyatakan, tetapi pembaca yang tidak melihat keterangannya akan menyimpulkan lonjakan besar. Bila sumbu dimulai dari 0, batang jam ke-0 dan ke-1 hampir sama panjang (rasio sekitar 0,95), yang lebih jujur untuk kesan "tidak berbeda jauh" tetapi menyembunyikan tren. Tidak ada satu sumbu yang selalu benar: yang wajib adalah menyatakannya dan memilih yang sesuai pertanyaanmu.

## Contoh setengah jadi

Lengkapi `tambah` agar menghitung pembacaan hilang, memperbarui nilai terkecil dan terbesar, dan menjumlahkan hanya pembacaan sah.

```cpp setengah-jadi
// C++17. Lengkapi bagian ____.
#include <cmath>

struct Rekap {
  int n = 0;
  int hilang = 0;
  double jumlah = 0;
  double min = 0;
  double max = 0;
};

void tambah(Rekap &r, double suhu) {
  if (std::isnan(suhu)) {
    r.hilang____;
    return;
  }
  if (r.n == 0 || suhu < r.min) r.min = ____;
  if (r.n == 0 || suhu ____ r.max) r.max = suhu;
  r.jumlah += suhu;
  r.n____;
}
```

## Soal Parsons

Susun baris-baris di bawah (sudah diacak) menjadi `panjangBatang`: tinggi batang sebanding dengan jarak dari batas bawah sumbu, dan tidak pernah negatif.

```text
(a)   if (p < 0) p = 0;
(b) int panjangBatang(double rata) {
(c)   return p;
(d) }
(e)   int p = static_cast<int>(std::lround((rata - BATAS_BAWAH) * SKALA));
```

## Latihan

1. `AI: tanpa AI` **Rekap dengan tangan.** Pembacaan (detik; suhu): (600; 26,0), (1800; 27,0), (2400; gagal), (3700; 28,0), (5000; 29,5). Buat tabel per jam: jumlah sah, jumlah gagal, terkecil, rata-rata, terbesar, dan panjang batang (aturan program: satu tanda per 0,25 derajat di atas 26).
2. `AI: boleh` **Pseudocode dulu.** Tulis pseudocode lalu tambahkan ke program satu kolom **rentang** (terbesar dikurangi terkecil) per jam. Sebutkan tiga kasus uji, termasuk jam yang semua pembacaannya gagal.
3. `AI: tanpa AI` **Nilai grafik.** Dua grafik batang menampilkan rata-rata 27,7 (jam 0) dan 29,2 (jam 1): grafik A dengan sumbu dari 0, grafik B dengan sumbu dari 26. Tulis kesan yang timbul pada tiap grafik, dan keterangan apa yang wajib ditambahkan pada grafik B.
4. `AI: boleh` **Rekap suhu per jam.** Ganti `data` dengan catatanmu sendiri atau data karangan dari gurumu (tanpa data pribadi), jalankan, dan tulis dua kalimat yang menjelaskan apa yang terlihat dan apa yang tidak dapat disimpulkan.
5. *Opsional:* **catatan pemakaian AI.** Bila memakai AI generatif, kerjakan nomor 3 sendiri dulu, lalu minta kritik atas jawabanmu, bukan jawaban jadi. Catat alat, tujuan, garis besar perintah, bagian yang dipakai, dan cara memeriksanya. Jangan menaruh sandi, kunci, atau data pribadi pada perintah.

## Latihan bercampur

1. Satu jam hanya berisi pembacaan gagal. Apa yang terjadi bila rata-ratanya dihitung `jumlah / n`, dan apa yang harus dilaporkan? (dari `C-XI2-M9`)
2. Tulis pesan JSON untuk baris rekap jam ke-1 (`jam`, `rata`, `n`, `hilang`), satu desimal untuk rata-rata. (dari `C-XI2-M7`)

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `C-XI2-M11` (sekitar satu minggu lagi), `C-XI2-M13` (sekitar tiga minggu lagi), dan `C-XII1-M4` (sekitar delapan minggu lagi). Jawab sekarang lalu simpan.

1. Mengapa sumbu grafik yang tidak dimulai dari nol harus dinyatakan dengan jelas?
2. Mengapa rekap per jam perlu mencatat jumlah data sah `n` di samping rata-rata?
3. Apa yang dilaporkan bila semua data satu kelompok hilang, dan mengapa tidak boleh dibagi dengan nol?

## Kesalahan umum

- **Menghitung pembacaan gagal sebagai 0.** Itu menarik rata-rata turun tanpa alasan; lewati dan catat jumlahnya.
- **Membagi dengan `n` tanpa memeriksa `n = 0`.** Hasilnya tidak terdefinisi atau program berhenti.
- **Grafik tanpa sumbu, satuan, atau titik mulai.** Pembaca menafsirkan panjang batang sebagai nilai.
- **Mengira sumbu yang dipotong pasti curang.** Ia sah bila dinyatakan; yang bermasalah adalah menyembunyikannya.
- **Merekap tanpa kunci kelompok yang jelas.** Detik 3599 dan 3600 berada di jam yang berbeda; tulis aturannya.

## Cek mandiri

- [ ] Saya dapat mengelompokkan pembacaan per jam dan menghitung n, terkecil, rata-rata, dan terbesar.
- [ ] Saya mencatat jumlah pembacaan yang gagal tiap kelompok.
- [ ] Saya menjaga agar kelompok kosong tidak dibagi dengan nol.
- [ ] Saya dapat membaca grafik batang teks dan menyebut sumbunya.
- [ ] Saya dapat menjelaskan bagaimana titik mulai sumbu mengubah kesan.

## Kunci dan petunjuk

**Ingat kembali.** 1: sandi bawaan sudah diketahui orang dan paling dulu dicoba, sehingga perangkat dengan sandi bawaan mudah diambil alih. 2: tanda kutip tanpa lolos mengakhiri teks lebih awal sehingga struktur pesan rusak atau salah tafsir. 3: satuan dan lokasi menentukan apakah dua angka layak dibandingkan, mis. suhu di bawah naungan dan di terik berbeda.

**Prediksi dulu.** 1: tiga pembacaan sah dan satu gagal (jam ke-1 berisi detik 3900, 5100, 6300, 6900). 2: jam ke-1; rata-rata 29,2. 3: lebih pendek; rata-rata jam ke-0 (27,7) lebih rendah daripada jam ke-2 (28,2) sehingga batangnya 7 tanda lawan 9 tanda.

**Contoh setengah jadi.** Isian berurutan: `++`, `suhu`, `>`, lalu `++`. Hasil kunci yang dikompilasi dan dijalankan penulis: pembacaan 27,0, gagal, 26,5 memberi `n=2`, `hilang=1`, terkecil 26,5, terbesar 27,0.

**Soal Parsons.** Urutan benar: b, e, a, c, d. Pembatasan `p < 0` ada sesudah menghitung dan sebelum `return`.

**Latihan.** 1: jam 0: sah 2, gagal 1, terkecil 26,0, rata-rata 26,5, terbesar 27,0, batang 2 tanda. Jam 1: sah 2, gagal 0, terkecil 28,0, rata-rata 28,75, terbesar 29,5, batang 11 tanda (28,75 dikurangi 26 dikali 4). Nilai dihitung penulis dengan program. 2: pseudocode: untuk tiap kelompok bila `n > 0` hitung `max - min`, selain itu tulis tanda "tidak ada"; kasus uji: satu pembacaan (rentang 0), dua pembacaan berbeda, semua gagal. 3: grafik A tampak hampir sama panjang (sekitar 0,95 kali), grafik B tampak hampir dua kali; keterangan wajib: sumbu dimulai dari 26 derajat Celsius, bukan 0, beserta satuannya. 4: tidak ada kunci tunggal; jawaban yang baik menyebut tren yang tampak dan batasnya (mis. sedikit pembacaan per jam, pembacaan yang gagal).

**Latihan bercampur.** 1: `jumlah / n` dengan `n = 0` tidak terdefinisi (hasil bilangan desimal `nan`, atau galat pada bilangan bulat); laporkan "tidak ada data sah" dan jumlah yang gagal. 2: `{"jam":1,"rata":29.2,"n":3,"hilang":1}`.

**Ulang berjarak.** 1: karena panjang batang tampak sebagai nilai; sumbu yang dipotong membuat beda kecil tampak besar, jadi pembaca perlu tahu. 2: rata-rata dari sedikit data kurang kuat dibanding dari banyak data, dan pembaca perlu tahu berapa pembacaan yang gagal. 3: laporkan "tidak ada data sah" bersama jumlah gagal; membagi dengan nol tidak terdefinisi dan merusak seluruh hitungan.

## Langkah berikutnya

Modul berikut: `c-xi2-m11` (prediksi sederhana), yang memakai rekap dan rata-rata bergerak untuk menebak nilai berikutnya. Pembacaan lanjut: pengantar rata-rata bergerak dari NIST (Engineering Statistics Handbook).
