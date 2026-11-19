## Untuk siapa modul ini

Modul ini untuk murid kelas XII jalur C (IoT dan robotika), minggu `C-XII1-M7` silabus v1.4: pengikut garis, strategi 2 (F). Prasyarat: modul `c-xii1-m6` (pengikut garis, strategi 1). Kamu juga memakai kendali proporsional dari `c-xi1-m7` dan sensor garis dari `c-xii1-m4`.

Modul ini berstatus DRAF: karangan penyusun, belum ditinjau pemilik. Ia mendukung butir `F-AP-a` (konsep strategi algoritmik) dan `F-AP-b` (program terstruktur berdasarkan strategi algoritmik), dan tidak dihitung memenuhi butir capaian pembelajaran mana pun; pemetaan `F-AP-a` untuk jalur C bersifat parsial. Keluaran minggu ini: program proporsional. Latihan silabusnya: lintasan uji yang sama dengan modul 6.

Ada dua cara mengerjakan. **Dengan papan (F):** kelompok memakai robot dan lintasan pita hitam yang sama dengan modul 6. **Tanpa papan:** kamu menjalankan simulasi yang sama dengan modul 6 di komputer, dengan model sederhana karangan (bukan fisika robot nyata). Nomor pin, ambang, dan angka kecepatan hanya contoh `[belum terverifikasi]` untuk robotmu.

## Keselamatan perangkat

- Papan memakai daya USB; motor memakai baterai AA/AAA yang disediakan guru lewat modul pengendali. Tidak ada listrik jaringan (220 V), tidak ada baterai litium tanpa pelindung, dan kamu tidak mengisi daya litium.
- Cabut baterai dan kabel USB sebelum mengubah rangkaian; periksa polaritas. Motor tidak disambung langsung ke pin papan. Tidak ada solder.
- Setiap kali `Kp` diubah, uji dulu dengan **roda terangkat**. Uji di lintasan hanya di meja bertepi atau lantai bersih yang kosong; bagian yang bergerak tidak disentuh saat menyala.
- Siapkan cara memutus daya motor (saklar atau mencabut baterai) dan tombol berhenti; ketahui letaknya sebelum menyalakan. Robot yang berayun hebat dihentikan.
- Papan, modul, atau motor yang terasa panas, berbau, atau berasap: cabut daya dan panggil guru. Tidak ada kamera atau mikrofon, dan tidak ada sensor tubuh.

## Ingat kembali

Jawab dari ingatan dulu, baru cek di kunci. Soal 1 dari `c-xii1-m6`, soal 2 dari `c-xii1-m4`, soal 3 dari `C-XI2-M13`.

1. Mengapa koreksi hidup-mati yang terlalu besar membuat robot sering berganti arah?
2. Mengapa galat dari lima sensor bernilai kasar (berundak), dan apa akibatnya pada koreksi proporsional?
3. Mengapa sistem perlu keadaan aman bila pesan sah berhenti datang?

## Tujuan

Setelah modul ini kamu dapat:

- menjelaskan kendali proporsional pada pengikut garis: koreksi sebanding dengan galat;
- menulis `proporsional(galat, pembilang)` dengan perkalian lebih dulu dan pembatasan koreksi (clamp);
- membandingkan proporsional dengan hidup-mati pada lintasan dan ukuran yang sama;
- menjelaskan mengapa `Kp` yang terlalu besar membuat robot berayun bila koreksinya tertunda;
- menjalankan robot pada lintasan uji yang sama dan mencatat hasilnya (keluaran minggu ini: program).

## Prediksi dulu

Fungsi `proporsional(galat, 3)` menghitung `-3 * galat / 4` dengan bilangan bulat (dipotong), lalu menjepit hasilnya ke -15 sampai 15. Jadi `Kp` = 3/4. **Tebak dulu, tulis jawabanmu, baru telusuri.**

1. Berapa koreksi untuk galat -22, -7, 7, dan -15?
2. Berapa koreksi untuk galat 0, dan mengapa pada robot nyata galat 0 sering terjadi pada rentang |x| yang kecil?
3. Bila `Kp` dinaikkan menjadi 6/4 pada robot yang koreksinya baru terasa satu tick kemudian, menurutmu jumlah pergantian arah bertambah atau berkurang, dan mengapa?

## Contoh terselesaikan

Pada **kendali proporsional** koreksi sebanding dengan galat: garis jauh di kiri berarti koreksi besar ke kiri, garis dekat berarti koreksi kecil. Rumusnya `koreksi = -Kp * galat`, dengan `Kp` = pembilang / 4 agar tetap bilangan bulat; kalikan dulu, baru bagi, supaya pecahan tidak hilang, seperti pada `c-xi1-m7`. Koreksi dijepit supaya kecepatan roda tidak keluar dari rentang. Sensor hanya lima titik, jadi galat berundak; di zona tengah galat 0 dan tidak ada koreksi.

Dua sifat perlu dipahami. Pertama, koreksi baru ada bila ada galat: pada tikungan yang terus-menerus, proporsional menyisakan galat tertentu supaya koreksinya sebanding dengan geseran lintasan. Kedua, bila efek koreksi tertunda, `Kp` yang terlalu besar mengoreksi berlebihan: robot melewati garis, lalu dikoreksi balik lebih besar lagi, dan berayun.

Program berikut memakai model, lintasan uji, dan ukuran yang **sama persis** dengan modul 6, sehingga perbandingannya adil. Baris pertama adalah hidup-mati `T` = 8 dari modul 6.

```cpp
// C++17 biasa, jalan di komputer. Diperiksa oleh check:module-code.
// MODEL SEDERHANA KARANGAN, bukan fisika robot nyata: robot nyata punya kelembaman arah dan berayun lebih besar.
// x = posisi tengah robot terhadap tengah garis (mm); positif = robot di kanan garis.
#include <cstdlib>
#include <iomanip>
#include <iostream>

const int JUMLAH_SENSOR = 5;
const int POSISI_SENSOR[JUMLAH_SENSOR] = {-30, -15, 0, 15, 30};  // mm dari tengah robot
const int SETENGAH_LEBAR_GARIS = 10;                              // mm
const int TICK = 40;                                              // satu tick = satu putaran loop()
// Lintasan uji: geseran garis per tick (mm). Dipakai sama persis oleh strategi lain.
const int GESER[TICK] = {0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 4, 9, 9, 9, 9, 9, 0, 0, 0, 0,
                         0, -4, -4, -4, -4, -4, -4, -4, -4, -4, -4, 0, 0, 0, 0, 0, 0, 0, 0, 0};

bool gelap(int x, int i) { return std::abs(x + POSISI_SENSOR[i]) <= SETENGAH_LEBAR_GARIS; }

// false bila garis hilang atau semua sensor gelap (tidak valid).
bool hitungGalat(int x, int &galat) {
  int jumlah = 0;
  int banyak = 0;
  for (int i = 0; i < JUMLAH_SENSOR; i++) {
    if (gelap(x, i)) {
      jumlah += POSISI_SENSOR[i];
      banyak++;
    }
  }
  if (banyak == 0 || banyak == JUMLAH_SENSOR) {
    return false;
  }
  galat = jumlah / banyak;
  return true;
}

const int PENYEBUT = 4;      // Kp = pembilang / 4
const int KOREKSI_MAKS = 15;  // batas koreksi (clamp)

// Strategi 1 (modul 6): hidup-mati, koreksi tetap sebesar T.
int hidupMati(int galat, int T) {
  if (galat < 0) {
    return T;
  }
  if (galat > 0) {
    return -T;
  }
  return 0;
}

// Strategi 2: proporsional. Koreksi sebanding dengan galat; kalikan dulu, lalu bagi.
int proporsional(int galat, int pembilang) {
  int koreksi = -pembilang * galat / PENYEBUT;
  if (koreksi > KOREKSI_MAKS) {
    return KOREKSI_MAKS;
  }
  if (koreksi < -KOREKSI_MAKS) {
    return -KOREKSI_MAKS;
  }
  return koreksi;
}

struct Hasil {
  int jumlahMutlak;
  int maks;
  int pergantian;
  int hilang;
  int jejak[TICK];
};

Hasil simulasi(int x0, bool proporsionalAktif, int parameter) {
  Hasil h = {0, 0, 0, 0, {}};
  int x = x0;
  int terdahulu = 0;      // koreksi satu tick lalu: efeknya baru terasa sekarang
  int arahTerakhir = 0;
  for (int t = 0; t < TICK; t++) {
    h.jejak[t] = x;
    int a = std::abs(x);
    h.jumlahMutlak += a;
    if (a > h.maks) {
      h.maks = a;
    }
    int galat = 0;
    int koreksi = 0;
    if (hitungGalat(x, galat)) {
      koreksi = proporsionalAktif ? proporsional(galat, parameter) : hidupMati(galat, parameter);
    } else {
      h.hilang++;
    }
    if (koreksi * arahTerakhir < 0) {
      h.pergantian++;
    }
    if (koreksi != 0) {
      arahTerakhir = koreksi;
    }
    x = x + GESER[t] - terdahulu;
    terdahulu = koreksi;
  }
  return h;
}

void cetakBaris(const char *nama, int parameter, const Hasil &h) {
  std::cout << std::setw(12) << nama << " " << std::setw(4) << parameter << "  " << std::fixed << std::setprecision(1)
            << std::setw(8) << static_cast<double>(h.jumlahMutlak) / TICK << "  " << std::setw(7) << h.maks << "  "
            << std::setw(10) << h.pergantian << "  " << std::setw(6) << h.hilang << "\n";
}

int main() {
  std::cout << "strategi     param  rata2|x|  maks|x|  pergantian  hilang\n";
  cetakBaris("hidup-mati", 8, simulasi(12, false, 8));
  for (int k : {1, 2, 3, 4, 6}) {
    cetakBaris("proporsional", k, simulasi(12, true, k));
  }
  Hasil h = simulasi(12, true, 3);
  std::cout << "jejak x untuk Kp=3/4:";
  for (int t = 0; t < TICK; t++) {
    if (t % 20 == 0) {
      std::cout << "\n ";
    }
    std::cout << " " << h.jejak[t];
  }
  std::cout << "\n";
}
```

Keluaran program (angka dihitung penulis dengan `g++ -std=c++17`):

```text
strategi     param  rata2|x|  maks|x|  pergantian  hilang
  hidup-mati    8       6.6       13           4       0
proporsional    1      13.4       36           1       0
proporsional    2       7.6       22           3       0
proporsional    3       6.3       20           3       0
proporsional    4      10.9       27          12       0
proporsional    6      12.4       35          11       0
jejak x untuk Kp=3/4:
  12 12 1 -10 -10 -5 0 9 13 12 5 -2 2 11 20 18 12 1 -10 -10
  -5 0 1 -3 -7 -11 -10 -3 -2 -6 -10 -9 -4 1 1 1 1 1 1 1
```

Bacalah dengan jujur. `Kp` = 3/4 sedikit lebih baik pada rata-rata |x| (6,3 lawan 6,6 mm) dan sedikit lebih tenang (3 pergantian lawan 4), tetapi **lebih buruk** pada maksimum |x| (20 lawan 13 mm): di tikungan tajam proporsional butuh galat yang cukup besar dulu sebelum koreksinya setara geseran. `Kp` terlalu kecil (1/4) tertinggal, dan `Kp` besar (4/4 ke atas) berayun dengan 11 atau 12 pergantian karena koreksinya tertunda. Tidak ada pemenang mutlak: keduanya butuh penyetelan, dan perbandingan yang lengkap beserta justifikasinya dikerjakan pada `C-XII1-M8`.

Sketsa berikut menerapkan strategi proporsional pada papan. Ia hanya diperiksa sintaksnya terhadap header tiruan, tidak dijalankan pada papan; nama PWM mengikuti Arduino-ESP32 versi 3 `[belum terverifikasi]`, dan ambang berasal dari kalibrasi modul 4.

```arduino
// Arduino-C++ untuk ESP32. Diperiksa check:module-code terhadap header tiruan (sintaks dan tipe saja, bukan bukti perilaku papan).
// Semua nomor pin dan angka contoh; ganti dengan hasil kalibrasi dan lembar guru. Jalankan pertama kali dengan roda terangkat.
const int JUMLAH_SENSOR = 5;
const int PIN_SENSOR[JUMLAH_SENSOR] = {32, 33, 34, 35, 36};
const int POSISI_SENSOR[JUMLAH_SENSOR] = {-30, -15, 0, 15, 30};
const int AMBANG[JUMLAH_SENSOR] = {1800, 2000, 1875, 2110, 1740};  // dari kalibrasi modul 4
const int PIN_KIRI_IN1 = 17;
const int PIN_KIRI_IN2 = 16;
const int PIN_KIRI_PWM = 27;
const int PIN_KANAN_IN1 = 18;
const int PIN_KANAN_IN2 = 19;
const int PIN_KANAN_PWM = 14;
const int PIN_BERHENTI = 4;   // tombol berhenti ke GND
const int KECEPATAN_DASAR = 150;
const int UNIT_PER_MM = 5;
const int KP_PEMBILANG = 3;    // Kp = 3/4; stel dengan uji pada lintasan yang sama
const int KP_PENYEBUT = 4;
const int KOREKSI_MAKS = 15;
const unsigned long SELANG_MS = 20;

unsigned long mulai = 0;

void tulisMotor(int pinIn1, int pinIn2, int pinPwm, int kecepatan) {
  int k = constrain(kecepatan, -255, 255);
  digitalWrite(pinIn1, k > 0 ? HIGH : LOW);
  digitalWrite(pinIn2, k < 0 ? HIGH : LOW);
  ledcWrite(pinPwm, k < 0 ? -k : k);
}

void kendali(int kiri, int kanan) {
  tulisMotor(PIN_KIRI_IN1, PIN_KIRI_IN2, PIN_KIRI_PWM, kiri);
  tulisMotor(PIN_KANAN_IN1, PIN_KANAN_IN2, PIN_KANAN_PWM, kanan);
}

int proporsional(int galat) {
  int koreksi = -KP_PEMBILANG * galat / KP_PENYEBUT;   // kalikan dulu, lalu bagi
  return constrain(koreksi, -KOREKSI_MAKS, KOREKSI_MAKS);
}

void setup() {
  Serial.begin(115200);
  pinMode(PIN_KIRI_IN1, OUTPUT);
  pinMode(PIN_KIRI_IN2, OUTPUT);
  pinMode(PIN_KANAN_IN1, OUTPUT);
  pinMode(PIN_KANAN_IN2, OUTPUT);
  pinMode(PIN_BERHENTI, INPUT_PULLUP);
  ledcAttach(PIN_KIRI_PWM, 1000, 8);
  ledcAttach(PIN_KANAN_PWM, 1000, 8);
  kendali(0, 0);
  mulai = millis();
}

void loop() {
  if (digitalRead(PIN_BERHENTI) == LOW) {
    kendali(0, 0);
    return;
  }
  if (millis() - mulai < SELANG_MS) {
    return;
  }
  mulai = millis();
  int jumlah = 0;
  int banyak = 0;
  for (int i = 0; i < JUMLAH_SENSOR; i++) {
    if (analogRead(PIN_SENSOR[i]) > AMBANG[i]) {   // pada rangkaian ini hitam lebih besar
      jumlah += POSISI_SENSOR[i];
      banyak++;
    }
  }
  if (banyak == 0 || banyak == JUMLAH_SENSOR) {
    kendali(0, 0);                                  // garis hilang atau tidak valid: berhenti
    return;
  }
  int koreksi = proporsional(jumlah / banyak);   // positif: belok kiri
  kendali(KECEPATAN_DASAR - UNIT_PER_MM * koreksi, KECEPATAN_DASAR + UNIT_PER_MM * koreksi);
}
```

## Contoh setengah jadi

Lengkapi `____` pada `proporsional`: kalikan dulu dengan galat, lalu jepit pada kedua ujung.

```cpp setengah-jadi
// C++17. Lengkapi bagian ____.
int proporsional(int galat, int pembilang) {
  int koreksi = -pembilang * ____ / PENYEBUT;
  if (koreksi > ____) { return KOREKSI_MAKS; }
  if (koreksi < ____) { return -KOREKSI_MAKS; }
  return koreksi;
}
```

## Soal Parsons

Susun baris-baris di bawah (sudah diacak) menjadi inti perulangan `simulasi`. Perhatikan urutan dua baris yang memperbarui `x` dan `terdahulu`: urutan yang salah menghapus penundaan.

```text
(a)     x = x + GESER[t] - terdahulu;
(b)     if (hitungGalat(x, galat)) { koreksi = proporsional(galat, parameter); } else { h.hilang++; }
(c)     int koreksi = 0;
(d)     h.jejak[t] = x;
(e)     terdahulu = koreksi;
(f)     int galat = 0;
```

## Latihan

1. `AI: tanpa AI` **Hitung.** Berapa koreksi proporsional `Kp` = 3/4 untuk galat -30, -15, 0, 15, dan 30?
2. `AI: boleh` **Lintasan uji yang sama (F).** Pakai pita hitam yang sama dengan modul 6. Dengan roda terangkat, periksa arah koreksi; lalu jalankan dengan pembilang 1, 3, dan 6 satu per satu (ubah satu hal pada satu waktu) dan catat berapa kali robot keluar jalur dan seberapa sering ia berayun. Tanpa papan, ubah pembilang di simulasi, prediksikan dulu, lalu jalankan.
3. `AI: tanpa AI` **Jelaskan.** Mengapa pergantian arah naik tajam pada `Kp` 4/4 ke atas? Jelaskan dengan penundaan satu tick.
4. `AI: boleh` **Ubah batas koreksi.** Ubah `KOREKSI_MAKS` menjadi 6, prediksikan dulu pengaruhnya pada tikungan tajam, lalu jalankan.
5. *Opsional:* **catatan pemakaian AI.** Bila memakai AI generatif, kerjakan nomor 3 sendiri dulu, lalu minta kritik atas penjelasanmu, bukan jawaban jadi. Catat alatnya, tujuanmu, garis besar perintahmu, bagian yang kamu pakai, dan cara memeriksanya. Jangan menaruh data pribadi pada perintah.

## Latihan bercampur

1. Pada `c-xi1-m7` proporsional lebih tenang pada derau. Apa yang menjadi "derau" pada pembacaan sensor garis, dan bagaimana proporsional menanggapinya dibanding hidup-mati?
2. Bagaimana mesin keadaan dari `c-xii1-m5` diubah agar robot pengikut garis berhenti di keadaan `AMAN` bila garis hilang tiga tick beruntun?

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `C-XII1-M8` (sekitar satu minggu lagi), `C-XII1-M10` (sekitar tiga minggu lagi), dan `C-XII2-M1` (sekitar delapan minggu lagi). Jawab sekarang lalu simpan.

1. Mengapa mengalikan dulu, baru membagi, pada `-pembilang * galat / penyebut`?
2. Apa yang terjadi bila `Kp` terlalu besar pada robot yang efek koreksinya tertunda satu tick, dan apa gejalanya pada hitungan pergantian arah?
3. Sebut dua bagian program pengikut garis yang dapat dipindahkan ke fungsi atau konstanta bernama agar mudah dirawat.

## Kesalahan umum

- **Membagi dulu, baru mengalikan.** `3 / 4` pada bilangan bulat menjadi 0 dan koreksi hilang.
- **Tidak menjepit koreksi.** Kecepatan roda bisa keluar dari rentang atau berbalik arah tanpa disengaja.
- **`Kp` terlalu besar.** Robot berayun lebih parah, bukan lebih cepat mengikuti garis.
- **Menjepit terlalu rendah.** Koreksi tidak bisa menyaingi tikungan tajam dan robot tertinggal.
- **Mengubah dua hal sekaligus.** Bila `Kp` dan kecepatan dasar diubah bersama, kamu tidak tahu penyebab perubahannya.
- **Menganggap `Kp` terbaik satu lintasan berlaku untuk semua.** Uji ulang di lintasan lain.

## Cek mandiri

- [ ] Saya dapat menjelaskan kendali proporsional pada pengikut garis.
- [ ] Saya menulis koreksi dengan perkalian lebih dulu dan menjepitnya.
- [ ] Saya membandingkan dua strategi pada lintasan dan ukuran yang sama.
- [ ] Saya dapat menjelaskan ayunan akibat `Kp` besar dan koreksi tertunda.
- [ ] Saya mengubah satu hal pada satu waktu dan menguji dengan roda terangkat.

## Kunci dan petunjuk

**Ingat kembali.** 1: koreksi besar membuat robot melewati garis ke sisi seberang pada tick berikutnya, lalu dikoreksi balik, begitu terus. 2: hanya ada lima titik sehingga posisi garis berubah dalam lompatan dan ada zona tengah dengan galat 0; koreksi proporsional ikut berlompat dan tidak bereaksi pada selisih kecil. 3: contoh: pesan sah yang berhenti datang bisa berarti pengirim atau jaringan rusak; tanpa keadaan aman alat terus bertindak berdasarkan keputusan lama yang sudah tidak berlaku.

**Prediksi dulu.** 1: galat -22 menghasilkan 66 / 4 = 16, dijepit menjadi 15; galat -7 menghasilkan 21 / 4 = 5; galat 7 menghasilkan -5; galat -15 menghasilkan 45 / 4 = 11. 2: koreksi 0; sensor tengah saja yang gelap pada |x| yang kecil (kira-kira kurang dari 5 mm), sehingga galat 0. 3: bertambah; koreksi yang lebih besar melampaui garis, dan karena efeknya baru terasa satu tick kemudian koreksi berikutnya sudah berbalik arah (pada tabel: 11 pergantian untuk 6/4).

**Contoh setengah jadi.** Isian berurutan: `galat`, `KOREKSI_MAKS`, `-KOREKSI_MAKS`. Kunci yang dikompilasi dan dijalankan penulis menghasilkan keluaran yang sama dengan contoh terselesaikan.

**Soal Parsons.** Urutan benar: d, f, c, b, a, e (d, f, dan c boleh bertukar di awal). `x` diperbarui dengan `terdahulu` yang lama **sebelum** `terdahulu` diganti dengan koreksi sekarang; bila `e` ditaruh sebelum `a`, penundaan satu tick hilang.

**Latihan.** 1: galat -30 menghasilkan 90 / 4 = 22, dijepit menjadi 15; -15 menghasilkan 11; 0 menghasilkan 0; 15 menghasilkan -11; 30 menghasilkan -15. 2: tidak ada kunci tunggal; jawaban yang baik mencatat tiap pembilang dan menyebut pembilang yang berayun. 3: koreksi terlalu besar melewati garis; efeknya terasa satu tick kemudian, ketika robot sudah di sisi seberang, sehingga koreksi berikutnya berbalik dan terus memperbesar ayunan sampai terjepit batas. 4: dengan `KOREKSI_MAKS` 6, tikungan tajam (geseran 9 mm per tick) tidak bisa dikejar: untuk `Kp` 3/4 rata-rata |x| naik dari 6,3 menjadi 8,2 dan maksimum dari 20 menjadi 25 (dihitung penulis).

**Latihan bercampur.** 1: derau berupa satu sensor yang kadang gelap dan kadang terang di tepi garis, sehingga galat melompat kecil; hidup-mati menanggapi dengan koreksi tetap penuh dan berganti arah, proporsional dengan koreksi kecil sehingga lebih tenang. 2: tambahkan hitungan garis hilang beruntun di `MAJU` dan pindah ke `AMAN` pada hitungan ketiga, seperti pada kegagalan baca jarak.

**Ulang berjarak.** 1: bila dibagi dulu, `3 / 4` pada bilangan bulat menjadi 0 dan seluruh koreksi hilang; mengalikan dulu mempertahankan pecahan sampai pembagian terakhir. 2: robot melewati garis, dikoreksi balik lebih besar, dan terus berayun; hitungan pergantian arah naik tajam (pada tabel 11 sampai 12). 3: contoh: `hitungGalat` dan `proporsional` dijadikan fungsi terpisah, dan angka seperti `KOREKSI_MAKS`, `PENYEBUT`, dan posisi sensor dijadikan konstanta bernama.

## Langkah berikutnya

Modul berikut: `C-XII1-M8` (membandingkan strategi, belum terindeks saat modul ini ditulis), yang mengukur dan menjustifikasi pilihan antara hidup-mati dan proporsional. Bacaan lanjut: penjelasan kendali proporsional dan PID (lihat Rujukan).
