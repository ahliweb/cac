## Untuk siapa modul ini

Modul ini untuk murid kelas XI jalur C (IoT dan robotika), minggu `C-XI1-M7` silabus v1.3: alternatif solusi II, kendali proporsional, yaitu membandingkan kendali hidup-mati dan proporsional (F). Prasyarat: modul `c-xi1-m6` (kendali hidup-mati). Kamu juga memakai histeresis dari `c-xi1-m5`, kasus uji dari `c-xi1-m2`, dan keluaran analog (PWM) dari `c-x2-m5`.

Modul ini karangan penyusun dan disetujui pemilik program pada 2026-11-20 (keputusan lewat dialog; catatan tinjauan menjadi tindak lanjut revisi). Ia mendukung butir `F-BK-b` (lebih dari satu solusi, strategi algoritmik, justifikasi efisiensi), `F-AP-a`, dan `F-AP-b`, dan tidak dihitung memenuhi butir capaian pembelajaran mana pun; pemetaan butir `F-BK-b` untuk jalur C bersifat parsial. Keluaran minggu ini: laporan perbandingan. Latihan silabusnya: kecerahan proporsional terhadap cahaya.

Ada dua cara mengerjakan. **Dengan papan (F):** kelompok merakit satu sensor cahaya dan satu LED dengan resistor sesuai lembar guru. **Tanpa papan:** kamu menjalankan "papan tiruan" di komputer yang membaca data cahaya karangan. Cara menghasilkan PWM pada ESP32 bergantung pada versi inti Arduino-ESP32 (ada `analogWrite` dan antarmuka `ledc`): periksa dokumentasinya dan lembar guru `[belum terverifikasi]`. Nomor pin dan angka cahaya pada contoh hanya contoh untuk rangkaianmu; ukur sendiri.

## Keselamatan perangkat

- Daya hanya dari kabel USB. Tidak ada listrik jaringan (220 V) dan tidak ada baterai pada modul ini.
- Cabut kabel USB sebelum memasang atau memindahkan sensor dan LED. Periksa polaritas LED dan pasang resistor sesuai lembar guru; jangan menyambung LED langsung tanpa resistor.
- Tidak ada motor dan tidak ada beban selain satu LED pada modul ini.
- Tidak ada solder. Papan percobaan dan kabel jumper sudah cukup.
- Modul ini tidak memakai kamera atau mikrofon, dan tidak mengukur tubuh siapa pun.
- Papan atau komponen yang terasa panas, berbau, atau berasap: cabut kabel dan panggil guru.

## Ingat kembali

Jawab dari ingatan dulu, baru cek di kunci. Soal 1 dari `c-x2-m13`, soal 2 dari `c-xi1-m6`, soal 3 dari `c-xi1-m4`.

1. Mengapa penyaring dipasang sebelum keputusan, bukan sesudahnya?
2. Pada termostat hidup-mati, mengapa suhu tidak pernah tepat di nilai acuan melainkan berayun?
3. Mengapa pembacaan gema diberi batas waktu tunggu?

## Tujuan

Setelah modul ini kamu dapat:

- menjelaskan kendali proporsional: keluaran berubah **sebanding** dengan selisih antara ukuran dan nilai acuan;
- menulis fungsi proporsional dengan pembatasan (clamp) pada kedua ujung dan aritmetika bilangan bulat yang benar;
- membandingkan hidup-mati, histeresis, dan proporsional pada data yang sama dengan ukuran yang ditetapkan lebih dulu;
- menjustifikasi pilihan solusi dengan menyebut keuntungan dan harganya;
- menulis laporan perbandingan (keluaran minggu ini).

## Prediksi dulu

Fungsi `dutyProporsional(cahaya)` mengatur kecerahan LED: makin gelap, makin terang. Bila `cahaya` dijepit ke rentang `GELAP = 500` sampai `TERANG = 3500`, duty-nya `(TERANG - cahaya) * 255 / (TERANG - GELAP)` dengan bilangan bulat (pecahan dipotong). **Tebak dulu, tulis jawabanmu, baru telusuri.**

1. Berapa duty untuk cahaya 500, 2000, 3000, 4000, dan 100?
2. Pada data berderau di sekitar 2000, mana yang kamu duga keluarannya melonjak paling besar antar pembacaan: hidup-mati (menyala penuh bila cahaya di bawah 2000) atau proporsional?
3. Pada cahaya 3000, LED hidup-mati mati total. Apa yang dilakukan LED proporsional, dan apakah itu keuntungan atau kerugian?

## Contoh terselesaikan

Pada **kendali proporsional** keluaran bergantung pada **seberapa jauh** ukuran dari nilai acuan, bukan hanya di sisi mana. Semakin gelap, semakin terang LED; keluaran berubah mulus ketika masukan berubah sedikit. Rentang masukan dijepit (`GELAP` dan `TERANG`) supaya keluaran tidak keluar dari 0 sampai 255. Rumus memakai bilangan bulat dan **mengalikan lebih dulu baru membagi**: `(TERANG - c) * 255` dihitung dulu, lalu dibagi `3000`. Bila dibagi dulu, `2500 / 3000` menjadi 0 pada bilangan bulat dan seluruh hasil hilang.

Tiga solusi dibandingkan pada data karangan yang sama dengan `c-xi1-m5`: hidup-mati (ambang 2000), histeresis (nyala di bawah 1900, mati di atas 2100), dan proporsional. Ukuran perbandingan ditetapkan lebih dulu: **perubahan keluaran terbesar antar dua sampel berurutan** (skala 0 sampai 255). Ukuran ini menangkap kedipan: makin kecil, makin tenang. Ketiganya berupa fungsi yang tidak menyentuh pin sehingga dapat diuji di komputer.

```cpp
// C++17 biasa, jalan di komputer. Diperiksa oleh check:module-code.
#include <cstdlib>
#include <iomanip>
#include <iostream>

const int GELAP = 500;
const int TERANG = 3500;
const int BATAS = 2000;
const int BATAS_NYALA = 1900;
const int BATAS_MATI = 2100;
const int DUTY_MAKS = 255;

int dutyProporsional(int cahaya) {
  int c = cahaya;
  if (c < GELAP) {
    c = GELAP;
  }
  if (c > TERANG) {
    c = TERANG;
  }
  return (TERANG - c) * DUTY_MAKS / (TERANG - GELAP);
}

int dutyAmbang(int cahaya) { return cahaya < BATAS ? DUTY_MAKS : 0; }

int dutyHisteresis(int sebelumnya, int cahaya) {
  if (cahaya < BATAS_NYALA) {
    return DUTY_MAKS;
  }
  if (cahaya > BATAS_MATI) {
    return 0;
  }
  return sebelumnya;
}

const int JUMLAH = 16;
const int CAHAYA[JUMLAH] = {2300, 2100, 2010, 1990, 2005, 1995, 2020, 1985,
                            1880, 1950, 2000, 2060, 2120, 2080, 2150, 2250};

int main() {
  int ambang = 0;
  int histeresis = 0;
  int proporsional = dutyProporsional(CAHAYA[0]);
  int lonjakAmbang = 0;
  int lonjakHisteresis = 0;
  int lonjakProporsional = 0;
  std::cout << "cahaya  ambang  histeresis  proporsional\n";
  for (int i = 0; i < JUMLAH; i++) {
    int a = dutyAmbang(CAHAYA[i]);
    int h = dutyHisteresis(histeresis, CAHAYA[i]);
    int p = dutyProporsional(CAHAYA[i]);
    if (i > 0) {
      lonjakAmbang = std::max(lonjakAmbang, std::abs(a - ambang));
      lonjakHisteresis = std::max(lonjakHisteresis, std::abs(h - histeresis));
      lonjakProporsional = std::max(lonjakProporsional, std::abs(p - proporsional));
    }
    ambang = a;
    histeresis = h;
    proporsional = p;
    std::cout << std::setw(6) << CAHAYA[i] << "  " << std::setw(6) << a << "  " << std::setw(10)
              << h << "  " << std::setw(12) << p << "\n";
  }
  std::cout << "perubahan terbesar antar sampel: ambang " << lonjakAmbang << ", histeresis "
            << lonjakHisteresis << ", proporsional " << lonjakProporsional << "\n";
}
```

Keluarannya:

```text
cahaya  ambang  histeresis  proporsional
  2300       0           0           102
  2100       0           0           119
  2010       0           0           126
  1990     255           0           128
  2005       0           0           127
  1995     255           0           127
  2020       0           0           125
  1985     255           0           128
  1880     255         255           137
  1950     255         255           131
  2000       0         255           127
  2060       0         255           122
  2120       0           0           117
  2080       0           0           120
  2150       0           0           114
  2250       0           0           106
perubahan terbesar antar sampel: ambang 255, histeresis 255, proporsional 17
```

Hasilnya perlu dibaca dengan jujur. Histeresis menyingkirkan kedipan berulang (dua pergantian, bukan enam), tetapi setiap pergantiannya tetap melonjak penuh: 255. Proporsional tidak pernah melonjak lebih dari 17, jadi tenang pada derau. Harganya ada dua: LED proporsional **tidak pernah benar-benar mati** pada cahaya yang masih jauh dari `TERANG` (lihat 106 pada cahaya 2250), dan rumusnya hanya bermakna bila `GELAP` dan `TERANG` diukur dengan benar. Duty yang sebanding juga belum berarti kecerahan yang terlihat sebanding; mata tidak menanggapi kecerahan secara linear `[belum terverifikasi]`, sehingga yang dibandingkan di sini adalah duty, bukan kecerahan yang terlihat. Pilihan antara ketiganya bergantung pada aktuator: relai hanya punya dua keadaan sehingga hidup-mati atau histeresis; LED dan kipas dengan PWM dapat proporsional.

Sketsa Arduino di bawah memakai fungsi proporsional yang sama pada LED. Ia hanya diperiksa sintaksnya terhadap header tiruan, tidak dijalankan pada papan.

```arduino
// Arduino-C++ untuk ESP32. Diperiksa check:module-code terhadap header tiruan (sintaks dan tipe saja, bukan bukti perilaku papan).
const int PIN_CAHAYA = 34;               // contoh; periksa papanmu
const int PIN_LED = 2;                   // contoh; periksa papanmu dan cara PWM inti papanmu
const int GELAP = 500;                   // ukur sendiri; ini contoh
const int TERANG = 3500;                 // ukur sendiri; ini contoh
const int DUTY_MAKS = 255;
const unsigned long SELANG_MS = 50;

unsigned long mulai = 0;

int dutyProporsional(int cahaya) {
  int c = constrain(cahaya, GELAP, TERANG);
  return (TERANG - c) * DUTY_MAKS / (TERANG - GELAP);
}

void setup() {
  pinMode(PIN_LED, OUTPUT);
  mulai = millis();
}

void loop() {
  if (millis() - mulai >= SELANG_MS) {
    mulai += SELANG_MS;
    analogWrite(PIN_LED, dutyProporsional(analogRead(PIN_CAHAYA)));
  }
}
```

## Contoh setengah jadi

Sekarang kipas proporsional terhadap suhu: pada `PANAS_MULAI` kipas mulai dari 0 dan pada `PANAS_PENUH` kipas penuh. Lengkapi bagian `____`.

```cpp setengah-jadi
// C++17. Lengkapi bagian ____.
const int GELAP = 500;
const int TERANG = 3500;

int duty(int cahaya) {
  int c = cahaya;
  if (c < GELAP) {
    c = ____;
  }
  if (c > TERANG) {
    c = ____;
  }
  return (TERANG - c) * 255 / (____ - GELAP);
}
```

## Soal Parsons

Susun baris-baris di bawah (sudah diacak) menjadi `dutyProporsional`.

```text
(a)   return (TERANG - c) * DUTY_MAKS / (TERANG - GELAP);
(b)   if (c > TERANG) {
(c) int dutyProporsional(int cahaya) {
(d)     c = GELAP;
(e)   }
(f)   int c = cahaya;
(g)   if (c < GELAP) {
(h)     c = TERANG;
(i)   }
(j) }
```

## Latihan

1. `AI: boleh` **Pseudocode dulu.** Tulis pseudocode lalu fungsi `dutyKipas(float suhu)` yang proporsional: 0 pada suhu 26,0 ke bawah, 255 pada suhu 34,0 ke atas, dan linear di antaranya (potong pecahan dengan `static_cast<int>`). Uji pada 20, 26, 30, 34, dan 40 (keluaran minggu ini: laporan perbandingan kipas hidup-mati melawan proporsional, dengan tabel ukuran seperti di contoh).
2. `AI: tanpa AI` **Hitung.** Berapa `dutyProporsional(1000)` dan `dutyProporsional(2500)` dengan bilangan bulat? Tunjukkan langkahnya.
3. `AI: tanpa AI` **Cari galat.** Apa yang terjadi bila `GELAP` dan `TERANG` diisi sama dengan 1000? Bagaimana mencegahnya?
4. `AI: boleh` **Bila papan tersedia (opsional).** Rakit sensor cahaya dan LED sesuai lembar guru, ukur `GELAP` dan `TERANG` ruanganmu dengan menutup dan menyinari sensor, lalu amati LED saat sensor ditutup perlahan. Tanpa papan, kerjakan nomor 1. Jangan mengubah rangkaian saat daya menyala.
5. *Opsional:* **catatan pemakaian AI.** Bila memakai AI generatif, jawab nomor 1 sendiri dulu, lalu minta petunjuk bertahap atau kritik atas laporanmu, bukan laporan jadi. Catat alatnya, tujuanmu, garis besar perintahmu, bagian yang kamu pakai, dan cara memeriksanya. Jangan menaruh data pribadi atau tugas bernilai pada perintah.

## Latihan bercampur

1. Tulis lima kasus uji tepi (`c-xi1-m2`) untuk `dutyProporsional`: di bawah `GELAP`, tepat `GELAP`, di tengah, tepat `TERANG`, dan di atas `TERANG`.
2. Kendali hidup-mati pada `c-xi1-m6` memakai suhu dan pita. Sebut satu alasan relai memerlukan hidup-mati atau histeresis dan tidak cocok untuk proporsional.

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `c-xi1-m8` (sekitar satu minggu lagi), `c-xi1-m10` (sekitar tiga minggu lagi), dan `c-xi2-m1` (sekitar delapan minggu lagi). Jawab sekarang lalu simpan.

1. Mengapa rumus duty ditulis mengalikan dulu baru membagi pada bilangan bulat?
2. Sebut satu keuntungan dan satu kerugian kendali proporsional dibandingkan hidup-mati.
3. Apa beda perubahan keluaran terbesar antar sampel pada kendali hidup-mati dan proporsional untuk masukan yang berderau?

## Kesalahan umum

- **Membagi dulu pada bilangan bulat.** `2500 / 3000` bernilai 0; kalikan dulu baru bagi.
- **Lupa menjepit masukan.** Cahaya di luar 500 sampai 3500 menghasilkan duty negatif atau di atas 255.
- **Mengira proporsional selalu lebih baik.** Ia tenang, tetapi tidak pernah benar-benar mati dan butuh `GELAP` dan `TERANG` yang diukur; aktuator dua keadaan tidak bisa memanfaatkannya.
- **Menyamakan duty dengan kecerahan terlihat.** Duty sebanding tidak berarti kecerahan yang terlihat sebanding.
- **Membandingkan tanpa ukuran yang ditetapkan lebih dulu.** "Terlihat lebih halus" tidak dapat diuji; pakai angka seperti perubahan terbesar antar sampel.

## Cek mandiri

- [ ] Saya dapat menjelaskan kendali proporsional dan menulis rumusnya dengan bilangan bulat.
- [ ] Saya menjepit masukan pada kedua ujung dan menghindari pembagian dengan nol.
- [ ] Saya membandingkan solusi dengan ukuran yang ditetapkan lebih dulu.
- [ ] Saya menyebut keuntungan dan harga tiap solusi.
- [ ] Saya mengukur `GELAP` dan `TERANG` dari rangkaianku, tidak menebak.

## Kunci dan petunjuk

**Ingat kembali.** 1: karena penyaring membuang lonjakan sebelum keputusan diambil; bila dipasang sesudahnya, keputusan sudah terpicu oleh lonjakan itu. 2: karena keputusan hanya berganti bila suhu melewati batas pita, dan sesudah berganti suhu bergerak ke arah sebaliknya; ia melewati nilai acuan bolak-balik. 3: agar program tidak menggantung bila gema tidak pernah datang (kabel lepas, tak ada benda).

**Prediksi dulu.** 1: cahaya 500 menghasilkan 255; 2000 menghasilkan 127 (1500 x 255 / 3000 = 127,5 dipotong); 3000 menghasilkan 42 (500 x 255 / 3000 = 42,5 dipotong); 4000 dijepit ke 3500 sehingga 0; 100 dijepit ke 500 sehingga 255. 2: hidup-mati melonjak paling besar (0 ke 255) saat pembacaan melewati 2000; proporsional hanya berubah sedikit. 3: LED proporsional tetap menyala redup (42); itu keuntungan bila ingin kecerahan sesuai gelap, kerugian bila ingin mati total pada cahaya cukup.

**Contoh setengah jadi.** Isian berurutan: `GELAP`, `TERANG`, `TERANG`. Fungsi lengkapnya dikompilasi dan dijalankan penulis tanpa peringatan.

**Soal Parsons.** Urutan benar: c, f, g, d, e, b, h, i, a, j.

**Latihan.** 1: pseudocode: bila suhu <= 26 kembalikan 0; bila suhu >= 34 kembalikan 255; selain itu kembalikan `(suhu - 26) / (34 - 26) * 255` dipotong ke bilangan bulat. Hasil pada penulis: 20 menjadi 0, 26 menjadi 0, 30 menjadi 127, 34 menjadi 255, 40 menjadi 255. 2: 1000 menjadi (3500 - 1000) x 255 / 3000 = 637500 / 3000 = 212 (212,5 dipotong); 2500 menjadi 1000 x 255 / 3000 = 85. 3: pembagi `TERANG - GELAP` menjadi 0, yaitu pembagian dengan nol (perilaku tak terdefinisi pada bilangan bulat); cegah dengan memeriksa bahwa `TERANG` lebih besar dari `GELAP` saat awal atau memakai nilai bawaan yang aman. 4: tidak ada kunci tunggal; jawaban yang baik mencatat nilai `GELAP` dan `TERANG` hasil ukur dan menyebut bagaimana LED berubah.

**Latihan bercampur.** 1: contoh: 400 menghasilkan 255; 500 menghasilkan 255; 2000 menghasilkan 127; 3500 menghasilkan 0; 3600 menghasilkan 0. 2: relai hanya punya dua keadaan (menyala atau mati), sehingga keluaran proporsional (nilai di antara) tidak dapat diwujudkannya; menggerakkannya dengan PWM cepat tidak sesuai dengan cara kerja kontak relai (periksa lembar data relaimu) `[belum terverifikasi]`.

**Ulang berjarak.** 1: `2500 / 3000` pada bilangan bulat dipotong menjadi 0 sehingga seluruh hasil hilang; mengalikan dulu mempertahankan ketelitian. 2: keuntungan: keluaran tenang dan tidak melonjak saat masukan berderau; kerugian: tidak pernah benar-benar mati dan butuh rentang `GELAP` dan `TERANG` yang diukur. 3: hidup-mati melonjak sebesar rentang penuh keluaran (255 pada contoh) saat masukan melewati batas; proporsional hanya berubah sebanding dengan selisih masukan (paling banyak 17 pada contoh).

## Langkah berikutnya

Modul berikut: `c-xi1-m8` (efisiensi memori dan waktu pada mikrokontroler), yang menanyakan berapa banyak sumber daya yang dipakai solusi-solusi seperti ini. Modul terkait: `matkom-pertumbuhan-fungsi` untuk gagasan membandingkan pertumbuhan kerja. Pembacaan lanjut: dokumentasi `map()` dan `constrain()` Arduino serta antarmuka `ledc` ESP32.
