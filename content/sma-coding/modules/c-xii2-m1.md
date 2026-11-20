## Untuk siapa modul ini

Modul ini untuk murid kelas XII jalur C (IoT dan robotika), minggu `C-XII2-M1` silabus v1.4: pemeliharaan program I. Prasyarat: modul `c-xii1-m7` (pengikut garis, strategi 2) dan `c-xi1-m2` (kualitas kode dan pengujian). Kamu juga memakai dokumentasi dan pemeliharaan dari `C-XII1-M12`, yang belum terindeks saat modul ini ditulis.

Modul ini karangan penyusun dan disetujui pemilik program pada 2026-11-20 (keputusan lewat dialog; catatan tinjauan menjadi tindak lanjut revisi). Ia mendukung butir `F-AP-c` (pengembangan, pemeliharaan, dan penyempurnaan algoritma standar ke dalam kode dengan memperhatikan kualitasnya) dan tidak dihitung memenuhi butir capaian pembelajaran mana pun. Keluaran minggu ini: daftar perbaikan. Latihan silabusnya: merapikan (refaktor) satu proyek semester lalu.

Ada dua cara mengerjakan. **Dengan papan:** kamu merapikan program robot semester lalu di komputer, lalu mengunggahnya dan mengujinya lagi dengan roda terangkat. **Tanpa papan:** seluruh kerja di komputer dengan program pembanding. Keselamatan perangkat: modul ini bekerja di komputer; bila kamu mengunggah ke robot, ikuti aturan daya USB atau baterai AA/AAA dari guru, cabut daya sebelum mengubah rangkaian, dan uji dengan roda terangkat. Angka ambang dan kecepatan pada contoh hanya contoh `[belum terverifikasi]` untuk robotmu.

## Ingat kembali

Jawab dari ingatan dulu, baru cek di kunci. Soal 1 dari `c-xii1-m12`, soal 2 dari `c-xii1-m7`, soal 3 dari `c-xi1-m2`.

1. Sebut tiga isi tabel pin pada dokumen perakitan.
2. Sebut dua bagian program pengikut garis yang dapat dipindahkan ke fungsi atau konstanta bernama agar mudah dirawat.
3. Mengapa uji dengan masukan jauh dari batas tidak menemukan galat `<` lawan `<=`?

## Tujuan

Setelah modul ini kamu dapat:

- membedakan **refaktor** (struktur berubah, perilaku tetap) dari perbaikan galat (perilaku berubah);
- menulis uji karakterisasi yang menangkap perilaku program lama sebelum menyentuhnya;
- merapikan program dengan langkah kecil dan menjalankan uji setelah tiap langkah;
- menulis daftar perbaikan berisi masalah, perubahan, dan bukti (keluaran minggu ini).

## Prediksi dulu

Fungsi `lama(a, b, c, d, e, kiri, kanan)` dari proyek pengikut garis menerima lima bacaan sensor. Sensor dianggap gelap bila bacaannya **lebih besar** dari ambangnya (1800, 2000, 1875, 2110, 1740). **Tebak dulu, tulis jawabanmu, baru telusuri.**

1. Bila kelima bacaan sama dengan ambangnya masing-masing, berapa `kiri` dan `kanan`?
2. Bila hanya sensor tengah bernilai 1876 dan yang lain tepat di ambang, berapa `kiri` dan `kanan`?
3. Seorang murid merapikan kode dan mengganti `>` dengan `>=` tanpa sengaja. Mengapa uji yang hanya memakai bacaan 800 di atas atau di bawah ambang tidak akan menangkapnya?

## Contoh terselesaikan

Merapikan program lama itu berisiko: tanpa uji kamu tidak tahu apakah kamu mengubah perilakunya. Karena itu langkah pertama **bukan** mengedit, melainkan menangkap perilaku sekarang apa adanya dalam **uji karakterisasi**: jalankan program lama pada banyak masukan, simpan keluarannya, dan jadikan itu patokan, termasuk bila perilakunya aneh. Tujuannya bukan membuktikan program benar, hanya membuktikan bahwa perilaku tidak berubah selama kamu merapikan.

Lalu catat apa yang mengganggu. Daftar perbaikan untuk `lama` kira-kira begini:

| Masalah | Contoh di `lama` | Perbaikan |
| --- | --- | --- |
| Nama tidak bermakna | `a`, `g`, `n`, `k` | nama jelas: `bacaan`, `jumlah`, `banyak`, `koreksi` |
| Angka ajaib | `1800`, `150`, `-3`, `4` | konstanta bernama (pelajaran `c-xi1-m2`) |
| Blok yang diulang lima kali | `if (a > 1800) ...` | satu perulangan atas larik |
| Satu fungsi mengerjakan semuanya | `lama` menghitung galat, koreksi, dan kecepatan | fungsi kecil, satu tugas masing-masing |

Pekerjaannya bertahap: ubah satu hal, jalankan uji, baru lanjut. Ukuran uji penting. Program berikut menguji 32 pola sensor (tiap sensor gelap atau terang) pada tiga jarak dari ambang: tepat di ambang (belum gelap) atau satu di atasnya (gelap), satu dari ambang, dan jauh (800). Pola dan jarak tepi itu yang menangkap galat satu langkah. Program juga memuat satu versi baru yang sengaja salah (`>=`) untuk melihat apakah uji mendeteksinya.

```cpp
// C++17 biasa, jalan di komputer. Diperiksa oleh check:module-code.
// Versi LAMA (belum dirapikan) dan versi BARU (sudah dirapikan) harus memberi hasil yang sama.
#include <iostream>

// ---- LAMA: satu fungsi, angka ajaib, blok yang diulang ----
void lama(int a, int b, int c, int d, int e, int &kiri, int &kanan) {
  int g = 0, n = 0;
  if (a > 1800) { g += -30; n++; }
  if (b > 2000) { g += -15; n++; }
  if (c > 1875) { g += 0; n++; }
  if (d > 2110) { g += 15; n++; }
  if (e > 1740) { g += 30; n++; }
  if (n == 0 || n == 5) { kiri = 0; kanan = 0; return; }
  int k = -3 * (g / n) / 4;
  if (k > 15) k = 15;
  if (k < -15) k = -15;
  kiri = 150 - 5 * k;
  kanan = 150 + 5 * k;
}

// ---- BARU: konstanta bernama, fungsi kecil satu tugas ----
const int JUMLAH_SENSOR = 5;
const int AMBANG[JUMLAH_SENSOR] = {1800, 2000, 1875, 2110, 1740};
const int POSISI[JUMLAH_SENSOR] = {-30, -15, 0, 15, 30};
const int KP_PEMBILANG = 3;
const int KP_PENYEBUT = 4;
const int KOREKSI_MAKS = 15;
const int KECEPATAN_DASAR = 150;
const int UNIT_PER_MM = 5;

bool gelap(int bacaan, int i) { return bacaan > AMBANG[i]; }

// false bila garis hilang atau semua sensor gelap.
bool hitungGalat(const int bacaan[], int &galat) {
  int jumlah = 0;
  int banyak = 0;
  for (int i = 0; i < JUMLAH_SENSOR; i++) {
    if (gelap(bacaan[i], i)) {
      jumlah += POSISI[i];
      banyak++;
    }
  }
  if (banyak == 0 || banyak == JUMLAH_SENSOR) {
    return false;
  }
  galat = jumlah / banyak;
  return true;
}

int jepit(int nilai, int batas) {
  if (nilai > batas) return batas;
  if (nilai < -batas) return -batas;
  return nilai;
}

int proporsional(int galat) { return jepit(-KP_PEMBILANG * galat / KP_PENYEBUT, KOREKSI_MAKS); }

void baru(const int bacaan[], int &kiri, int &kanan) {
  int galat = 0;
  if (!hitungGalat(bacaan, galat)) {
    kiri = 0;
    kanan = 0;
    return;
  }
  int k = proporsional(galat);
  kiri = KECEPATAN_DASAR - UNIT_PER_MM * k;
  kanan = KECEPATAN_DASAR + UNIT_PER_MM * k;
}

// Versi baru yang SALAH: ">=" menggantikan ">" pada ambang.
void baruSalah(const int bacaan[], int &kiri, int &kanan) {
  int tebal[JUMLAH_SENSOR];
  for (int i = 0; i < JUMLAH_SENSOR; i++) {
    tebal[i] = bacaan[i] >= AMBANG[i] ? AMBANG[i] + 1 : AMBANG[i];
  }
  baru(tebal, kiri, kanan);
}

// Uji karakterisasi: 32 pola sensor x 3 jarak dari ambang. Tiap kasus: bandingkan keluaran lama dan baru.
// Jarak 0 = tepat di ambang (belum gelap) atau satu di atasnya (gelap); 1 = satu dari ambang; 800 = jauh.
int main() {
  int total = 0;
  int sama = 0;
  int samaSalah = 0;
  const int JARAK[3] = {0, 1, 800};
  for (int pola = 0; pola < 32; pola++) {
    for (int j = 0; j < 3; j++) {
      int r[JUMLAH_SENSOR];
      for (int i = 0; i < JUMLAH_SENSOR; i++) {
        bool g = (pola >> i) & 1;
        int jarak = JARAK[j];
        r[i] = g ? AMBANG[i] + (jarak == 0 ? 1 : jarak) : AMBANG[i] - jarak;
      }
      int lk = 0, ln = 0, bk = 0, bn = 0, sk = 0, sn = 0;
      lama(r[0], r[1], r[2], r[3], r[4], lk, ln);
      baru(r, bk, bn);
      baruSalah(r, sk, sn);
      total++;
      if (lk == bk && ln == bn) sama++;
      if (lk == sk && ln == sn) samaSalah++;
    }
  }
  std::cout << "kasus uji: " << total << "\n";
  std::cout << "baru sama dengan lama: " << sama << " dari " << total << "\n";
  std::cout << "baru-salah sama dengan lama: " << samaSalah << " dari " << total << "\n";
}
```

Keluaran program (dijalankan penulis dengan `g++ -std=c++17`):

```text
kasus uji: 96
baru sama dengan lama: 96 dari 96
baru-salah sama dengan lama: 66 dari 96
```

Bacalah dengan jujur. Versi baru sama dengan lama pada seluruh 96 kasus, jadi kita punya bukti sebatas 96 kasus itu, bukan untuk semua pembacaan sensor yang mungkin. Versi yang salah gagal pada 30 kasus; semuanya kasus tepat di ambang. Seandainya hanya ada kasus jauh dari ambang, versi salah akan lolos. Uji karakterisasi hanya sebaik kasus tepi yang kamu pilih.

## Contoh setengah jadi

Lengkapi `____` pada `jepit`, yang membatasi nilai ke rentang -batas sampai batas.

```cpp setengah-jadi
// C++17. Lengkapi bagian ____.
const int BATAS_MAKS = 15;
int jepit(int nilai, int batas) {
  if (nilai > ____) { return batas; }
  if (nilai < ____) { return -batas; }
  return ____;
}
```

## Soal Parsons

Susun baris-baris di bawah (sudah diacak; kurung kurawal penutup tidak ditulis) menjadi isi `hitungGalat` setelah dirapikan.

```text
(a)     jumlah += POSISI[i];
(b)   for (int i = 0; i < JUMLAH_SENSOR; i++) {
(c)   int banyak = 0;
(d)     if (gelap(bacaan[i], i)) {
(e)       banyak++;
(f)   int jumlah = 0;
```

## Latihan

1. `AI: tanpa AI` **Cium baunya.** Fragmen karangan ini sulit dirawat: `void k(int a,int b){ if(a>500){x=a*7/10;} if(b>500){y=b*7/10;} z=x+y; if(z>1000)z=1000; }`. Sebut tiga masalah pemeliharaan di dalamnya.
2. `AI: boleh` **Refaktor proyekmu.** Pilih satu program dari semester lalu (mis. pengikut garis dari `c-xii1-m6` atau `c-xii1-m7`). Tulis uji karakterisasi lebih dulu, lakukan tiga perubahan kecil dengan uji setelah tiap perubahan, dan tulis daftar perbaikan: masalah, perubahan, dan hasil uji.
3. `AI: tanpa AI` **Prediksi galat.** Pada `proporsional`, seorang murid mengganti `-KP_PEMBILANG * galat / KP_PENYEBUT` dengan `-(KP_PEMBILANG / KP_PENYEBUT) * galat`. Prediksi: lolos uji karakterisasi atau tidak, dan mengapa.
4. `AI: boleh` **Refaktor atau perbaikan?** Saat merapikan kamu melihat bahwa `lama` tidak memeriksa bacaan di luar 0 sampai 4095. Haruskah itu diperbaiki di langkah refaktor yang sama? Jelaskan.
5. *Opsional:* **catatan pemakaian AI.** Bila memakai AI generatif, kerjakan nomor 3 sendiri dulu, lalu minta kritik atas penjelasanmu, bukan jawaban jadi. Catat alatnya, tujuanmu, garis besar perintahmu, bagian yang kamu pakai, dan cara memeriksanya. Kode buatan AI dibaca, dijalankan, dan diuji. Jangan menaruh data pribadi pada perintah.

## Latihan bercampur

1. Dari `c-xi1-m2`: tulis tiga kasus uji untuk `jepit` yang menyertakan nilai tepat di batas, dan hasil yang kamu harapkan.
2. Dari `c-xii1-m12`: setelah refaktor mengganti nama konstanta pin, bagian dokumen perakitan mana yang harus ikut diperbarui, dan mengapa riwayat perubahan perlu dicatat?

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `C-XII2-M2` (sekitar satu minggu lagi), `C-XII2-M4` (sekitar tiga minggu lagi), dan `C-XII2-M9` (sekitar delapan minggu lagi). Jawab sekarang lalu simpan.

1. Apa yang dibuktikan uji karakterisasi setelah refaktor, dan apa yang tidak dibuktikannya?
2. Mengapa perbaikan galat dipisahkan dari refaktor?
3. Sebut tiga bau kode dan satu perbaikan untuk masing-masing.

## Kesalahan umum

- **Mengedit dulu, menguji belakangan.** Tanpa patokan kamu tidak tahu apa yang berubah.
- **Menguji hanya jauh dari batas.** Galat `>` lawan `>=` bersembunyi tepat di ambang.
- **Mencampur refaktor dan perbaikan galat.** Saat uji gagal kamu tidak tahu penyebabnya.
- **Mengubah banyak hal sebelum menjalankan uji.** Satu langkah kecil, satu uji.
- **Menganggap 96 kasus lolos berarti benar untuk semua masukan.** Uji hanya menyatakan perilaku sama pada kasus yang diuji.

## Cek mandiri

- [ ] Saya dapat menjelaskan perbedaan refaktor dan perbaikan galat.
- [ ] Saya menulis uji karakterisasi sebelum mengubah program lama.
- [ ] Uji saya mencakup kasus tepat di batas.
- [ ] Saya mengubah satu hal, menguji, lalu lanjut.
- [ ] Daftar perbaikan saya memuat masalah, perubahan, dan bukti.

## Kunci dan petunjuk

**Ingat kembali.** 1: nama atau nomor pin, fungsinya (komponen yang disambung), dan mode atau catatan khusus pin (masukan, keluaran, analog). 2: contoh: `hitungGalat` dan `proporsional` menjadi fungsi, dan angka seperti `KOREKSI_MAKS`, penyebut, dan posisi sensor menjadi konstanta bernama. 3: galat itu hanya tampak pada nilai tepat di batas atau satu di sampingnya; masukan jauh memberi hasil yang sama pada `<` dan `<=`.

**Prediksi dulu.** 1: tidak ada sensor gelap (`>` tidak terpenuhi pada nilai yang sama dengan ambang), garis hilang, jadi `kiri` = 0 dan `kanan` = 0. 2: hanya sensor tengah gelap; galat 0; koreksi 0; `kiri` = 150 dan `kanan` = 150. 3: pada bacaan 800 di atas atau di bawah ambang, `>` dan `>=` memberi jawaban sama; beda hanya bila bacaan tepat sama dengan ambang.

**Contoh setengah jadi.** Isian berurutan: `batas`, `-batas`, `nilai`. Kunci dikompilasi dan dijalankan penulis: `jepit` untuk 22, -22, 7, 15, dan 16 menghasilkan 15, -15, 7, 15, 15.

**Soal Parsons.** Urutan benar: f, c, b, d, a, e (f dan c boleh bertukar; a dan e boleh bertukar di dalam `if`). Variabel harus ada sebelum perulangan; `jumlah` dan `banyak` ditambah hanya bila sensor gelap.

**Latihan.** 1: nama `k`, `a`, `b`, `x`, `y`, `z` tidak bermakna; angka ajaib 500, 7/10, dan 1000; blok untuk `a` dan `b` hampir kembar (diulang). 2: tidak ada kunci tunggal; jawaban yang baik menunjukkan uji dijalankan sebelum dan sesudah tiap perubahan dan mencatat bila ada yang gagal. 3: tidak lolos; `3 / 4` pada bilangan bulat adalah 0 sehingga koreksi selalu 0 dan setiap kasus yang koreksi lamanya bukan 0 gagal. 4: tidak; itu perubahan perilaku, jadi catat di daftar perbaikan, lakukan sebagai langkah terpisah dengan ujinya diubah sengaja, supaya uji karakterisasi tetap berarti.

**Latihan bercampur.** 1: contoh: `jepit(22, 15)` harus 15; `jepit(15, 15)` harus 15 (tepat di batas); `jepit(-16, 15)` harus -15. 2: tabel pin harus mengikuti nama baru; riwayat perubahan memberi tahu orang lain apa yang berubah, kapan, dan mengapa, sehingga pemeliharaan tidak berupa tebakan.

**Ulang berjarak.** 1: ia membuktikan perilaku sama pada kasus yang diuji; ia tidak membuktikan program benar atau bebas galat, dan tidak mencakup kasus yang tidak diuji. 2: bila uji gagal, kamu tahu penyebabnya salah satu saja; perubahan perilaku harus disengaja dan diuji sendiri. 3: contoh: nama tidak bermakna (beri nama jelas), angka ajaib (konstanta bernama), blok yang diulang (perulangan atau fungsi).

## Langkah berikutnya

Modul berikut: `C-XII2-M2` (pemeliharaan program II: optimasi dan catatan alasan). Bacaan lanjut: `const` dan C++ Core Guidelines (lihat Rujukan).
