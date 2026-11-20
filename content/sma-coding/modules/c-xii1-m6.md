## Untuk siapa modul ini

Modul ini untuk murid kelas XII jalur C (IoT dan robotika), minggu `C-XII1-M6` silabus v1.4: pengikut garis, strategi 1 (F). Prasyarat: modul `c-xii1-m5` (mesin keadaan robot). Kamu juga memakai `c-xii1-m4` (sensor garis), `c-xii1-m3` (roda), dan `c-xi1-m6` (hidup-mati).

Modul ini karangan penyusun dan disetujui pemilik program pada 2026-11-20 (keputusan lewat dialog; catatan tinjauan menjadi tindak lanjut revisi). Ia mendukung butir `F-AP-a` (konsep strategi algoritmik) dan `F-AP-b` (program terstruktur berdasarkan strategi algoritmik), dan tidak dihitung memenuhi butir capaian pembelajaran mana pun; pemetaan `F-AP-a` untuk jalur C bersifat parsial. Keluaran minggu ini: program pengikut garis. Latihan silabusnya: lintasan uji.

Ada dua cara mengerjakan. **Dengan papan (F):** kelompok memakai robot dari modul 3 dan 4 pada lintasan pita hitam di permukaan putih. **Tanpa papan:** kamu menjalankan simulasi di komputer, dengan **model sederhana karangan**, bukan fisika robot nyata: robot nyata punya kelembaman arah dan berayun lebih besar. Nomor pin, ambang, dan angka kecepatan hanya contoh `[belum terverifikasi]` untuk robotmu.

## Keselamatan perangkat

- Papan memakai daya USB; motor memakai baterai AA/AAA yang disediakan guru lewat modul pengendali. Tidak ada listrik jaringan (220 V), tidak ada baterai litium tanpa pelindung, dan kamu tidak mengisi daya litium.
- Cabut baterai dan kabel USB sebelum mengubah rangkaian; periksa polaritas. Motor tidak disambung langsung ke pin papan. Tidak ada solder.
- Uji pertama dengan **roda terangkat** untuk memeriksa arah koreksi. Uji di lintasan hanya di meja bertepi atau lantai bersih yang kosong; bagian yang bergerak tidak disentuh saat menyala.
- Siapkan cara memutus daya motor (saklar atau mencabut baterai) dan tombol berhenti. Robot berhenti bila garis hilang.
- Papan, modul, atau motor yang terasa panas, berbau, atau berasap: cabut daya dan panggil guru. Tidak ada kamera atau mikrofon, dan tidak ada sensor tubuh.

## Ingat kembali

Jawab dari ingatan dulu, baru cek di kunci. Soal 1 dari `c-xii1-m5`, soal 2 dari `c-xii1-m3`, soal 3 dari `C-XI2-M12`.

1. Mengapa waktu pada mesin keadaan diperiksa dengan `sekarang - mulaiKeadaan >= lama`, bukan dengan `delay`?
2. Pada robot dua roda, roda mana yang dibuat lebih lambat agar robot belok ke kiri?
3. Mengapa fungsi keputusan dipisahkan dari pembacaan sensor dan penulisan pin?

## Tujuan

Setelah modul ini kamu dapat:

- menjelaskan kendali hidup-mati pada pengikut garis: koreksi tetap ke arah garis, apa pun besar galatnya;
- menulis fungsi keputusan `hidupMati` yang murni dan menghubungkannya ke kecepatan roda;
- menjalankan simulasi pada lintasan uji dan membaca tiga ukuran: rata-rata |x|, maksimum |x|, dan pergantian arah;
- menjelaskan mengapa koreksi terlalu kecil kalah oleh tikungan dan terlalu besar membuat robot berayun;
- menjalankan robot di lintasan uji dan mencatat hasilnya.

## Prediksi dulu

Model: `x` adalah posisi tengah robot terhadap tengah garis dalam mm (positif di kanan garis). Pada tiap tick, `x` baru sama dengan `x` ditambah geseran lintasan dikurangi **koreksi tick sebelumnya** (koreksi baru terasa satu tick kemudian). Lima sensor berada di -30, -15, 0, 15, 30 mm; sensor gelap bila garis (lebar 20 mm) berada di bawahnya. Galat adalah rata-rata posisi sensor gelap (dipotong), koreksi `T` = 8 positif untuk belok kiri, dan geseran awal 0. Robot mulai di `x` = 12. **Tebak dulu, tulis jawabanmu, baru jalankan.**

1. Pada tick 0, sensor mana yang gelap, berapa galatnya, dan berapa koreksi serta kecepatan roda (kiri/kanan, kecepatan dasar 150, 5 unit per mm)?
2. Berapa `x` pada tick 1 dan tick 2?
3. Pada tick 2 berapa koreksinya, dan mengapa `x` pada tick 3 tetap melewati garis ke sisi kiri?

## Contoh terselesaikan

Pada **kendali hidup-mati** robot hanya memutuskan arah: garis di kiri berarti koreksi tetap sebesar `T` ke kiri, garis di kanan berarti `T` ke kanan, dan galat 0 berarti lurus. Koreksi menjadi selisih kecepatan roda: koreksi positif memperlambat roda kiri dan mempercepat roda kanan, 5 unit per mm. Dengan `T` = 8 roda menjadi 110 dan 190. Karena sensor hanya lima titik, ada zona tengah (kira-kira |x| kurang dari 5 mm) tempat galat 0 dan tidak ada koreksi.

Lintasan uji berupa urutan geseran garis per tick pada 40 tick: lurus, tikungan landai (4 mm per tick selama 5 tick), tikungan tajam (9 mm per tick selama 5 tick), lurus, lalu tikungan berlawanan (-4 mm per tick selama 10 tick). Lintasan dan titik awal yang **sama persis** dipakai strategi lain di modul berikutnya supaya adil. Tiga ukuran: rata-rata |x| (makin kecil makin dekat garis), maksimum |x|, dan **pergantian arah** koreksi (makin banyak makin berayun). Kolom `hilang` menghitung tick tanpa garis; robot berhenti bila itu terjadi.

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
const int KECEPATAN_DASAR = 150;
const int UNIT_PER_MM = 5;  // selisih 5 unit kecepatan tiap roda menggeser robot 1 mm per tick

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

// Strategi 1: hidup-mati. Koreksi tetap sebesar T ke arah garis; positif = belok kiri.
int hidupMati(int galat, int T) {
  if (galat < 0) {
    return T;
  }
  if (galat > 0) {
    return -T;
  }
  return 0;
}

struct Hasil {
  int jumlahMutlak;
  int maks;
  int pergantian;
  int hilang;
  int jejak[TICK];
};

Hasil simulasi(int x0, int T) {
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
      koreksi = hidupMati(galat, T);
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

int main() {
  std::cout << "T  kiri/kanan  rata2|x|  maks|x|  pergantian  hilang\n";
  for (int T : {5, 8, 12}) {
    Hasil h = simulasi(12, T);
    std::cout << std::setw(2) << T << "  " << std::setw(3) << KECEPATAN_DASAR - UNIT_PER_MM * T << "/" << std::setw(3)
              << KECEPATAN_DASAR + UNIT_PER_MM * T << "  " << std::fixed << std::setprecision(1) << std::setw(8)
              << static_cast<double>(h.jumlahMutlak) / TICK << "  " << std::setw(7) << h.maks << "  " << std::setw(10)
              << h.pergantian << "  " << std::setw(6) << h.hilang << "\n";
  }
  Hasil h = simulasi(12, 8);
  std::cout << "jejak x untuk T=8:";
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
T  kiri/kanan  rata2|x|  maks|x|  pergantian  hilang
 5  125/175       8.0       27           1       0
 8  110/190       6.6       13           4       0
12   90/210      10.8       26          11       0
jejak x untuk T=8:
  12 12 4 -4 -4 -4 -4 0 4 8 12 8 9 10 11 12 13 5 -3 -11
  -11 -3 1 -3 -7 -11 -7 -3 1 -3 -7 -11 -3 5 5 -3 -11 -11 -3 5
```

Bacalah dengan jujur. `T` = 5 lebih kecil dari geseran tikungan tajam (9 mm per tick), sehingga robot tertinggal dan `x` memuncak 27 mm. `T` = 12 berlebihan: robot berayun dengan 11 pergantian arah. `T` = 8 terbaik **pada lintasan karangan ini**, bukan terbaik untuk semua lintasan. Hidup-mati sederhana dan mudah dipahami, tetapi satu besar koreksi harus cocok untuk tikungan landai sekaligus tajam, dan itu kelemahannya.

Sketsa berikut menerapkan strategi yang sama pada papan. Ia hanya diperiksa sintaksnya terhadap header tiruan, tidak dijalankan pada papan; nama PWM mengikuti Arduino-ESP32 versi 3 `[belum terverifikasi]`, dan ambang berasal dari kalibrasi modul 4.

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
const int T_KOREKSI = 8;
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

int hidupMati(int galat, int T) {
  if (galat < 0) {
    return T;
  }
  if (galat > 0) {
    return -T;
  }
  return 0;
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
  int koreksi = hidupMati(jumlah / banyak, T_KOREKSI);   // positif: belok kiri
  kendali(KECEPATAN_DASAR - UNIT_PER_MM * koreksi, KECEPATAN_DASAR + UNIT_PER_MM * koreksi);
}
```

## Contoh setengah jadi

Lengkapi `____` pada fungsi keputusan dan pemetaan koreksi ke roda: garis di kiri (galat negatif) berarti belok kiri, dan roda kiri melambat saat koreksi positif.

```cpp setengah-jadi
// C++17. Lengkapi bagian ____.
int hidupMati(int galat, int T) {
  if (galat ____ 0) { return T; }
  if (galat ____ 0) { return ____; }
  return 0;
}

void kecepatanRoda(int koreksi, int &kiri, int &kanan) {
  kiri = KECEPATAN_DASAR - ____ * koreksi;
  kanan = KECEPATAN_DASAR + UNIT_PER_MM * koreksi;
}
```

## Soal Parsons

Susun baris-baris di bawah (sudah diacak) menjadi satu langkah keputusan pengikut garis.

```text
(a)   int galat = 0;
(b)   if (!hitungGalat(x, galat)) {
(c)     kendali(0, 0);
(d)     return;
(e)   }
(f)   int koreksi = hidupMati(galat, T);
(g)   kendali(KECEPATAN_DASAR - UNIT_PER_MM * koreksi, KECEPATAN_DASAR + UNIT_PER_MM * koreksi);
(h) void satuTick(int x) {
(i) }
```

## Latihan

1. `AI: tanpa AI` **Telusuri.** Untuk `T` = 5 dan `x` awal 12, tulis `x` pada tick 0 sampai 3 dan koreksi pada tick 0 sampai 3.
2. `AI: boleh` **Lintasan uji (F).** Pasang pita hitam dengan satu tikungan landai dan satu tajam. Dengan roda terangkat, periksa arah koreksi; lalu jalankan di lintasan dengan `T` = 5, 8, dan 12 dan catat berapa kali robot keluar jalur dan berayun. Tanpa papan, ubah `T` dan `GESER` di simulasi, prediksikan dulu, lalu jalankan.
3. `AI: tanpa AI` **Batas model.** Sebut tiga hal pada robot nyata yang tidak ada pada simulasi.
4. `AI: boleh` **Ukuran baru.** Tambahkan satu ukuran, misalnya tick pertama saat |x| tidak lebih dari 5, lalu jalankan untuk `T` = 5, 8, dan 12.
5. *Opsional:* **catatan pemakaian AI.** Bila memakai AI generatif, kerjakan nomor 1 sendiri dulu, lalu minta petunjuk bertahap atas ukuran barumu, bukan program jadi. Catat alatnya, tujuanmu, garis besar perintahmu, bagian yang kamu pakai, dan cara memeriksanya. Jangan menaruh data pribadi pada perintah.

## Latihan bercampur

1. Termostat hidup-mati suhunya berayun di sekitar nilai acuan (dari `c-xi1-m6`). Apa kemiripannya dengan pengikut garis hidup-mati?
2. Apakah zona tengah tempat galat 0 sama dengan histeresis pada `c-xi1-m5`? Jelaskan.

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `C-XII1-M7` (sekitar satu minggu lagi), `C-XII1-M9` (sekitar tiga minggu lagi), dan `C-XII1-M14` (sekitar delapan minggu lagi). Jawab sekarang lalu simpan.

1. Mengapa koreksi hidup-mati yang terlalu besar membuat robot sering berganti arah?
2. Mengapa lintasan uji dan kondisi awal harus sama ketika dua strategi dibandingkan?
3. Sebut dua ukuran yang dipakai untuk menilai pengikut garis dan satu kelemahan masing-masing.

## Kesalahan umum

- **Tanda koreksi terbalik.** Robot menjauhi garis; periksa dengan roda terangkat.
- **Mengira koreksi besar pasti lebih baik.** Terlalu besar membuat robot berayun.
- **Menyimpulkan dari satu lintasan.** `T` terbaik di satu lintasan belum tentu terbaik di lintasan lain.
- **Tidak menangani garis hilang.** Robot melaju buta; hentikan.
- **Menyamakan simulasi dengan robot nyata.** Model ini sangat disederhanakan.
- **Lupa bahwa koreksi tertunda.** Efek koreksi tick ini baru terasa pada tick berikutnya.

## Cek mandiri

- [ ] Saya dapat menjelaskan kendali hidup-mati pada pengikut garis.
- [ ] Saya menulis fungsi keputusan yang murni dan menghubungkannya ke roda.
- [ ] Saya membaca tiga ukuran dan menyebut maknanya.
- [ ] Saya menguji pertama dengan roda terangkat dan menyediakan cara berhenti.
- [ ] Saya tidak menganggap hasil simulasi sebagai hasil robot.

## Kunci dan petunjuk

**Ingat kembali.** 1: `delay` menghentikan program sehingga tombol dan sensor tidak terbaca; selisih `millis()` membiarkan `loop()` berjalan terus. 2: roda kiri. 3: fungsi yang tidak menyentuh sensor atau pin dapat diuji di komputer dengan masukan karangan, lebih mudah dibaca, dan tidak berubah bila perangkatnya diganti.

**Prediksi dulu.** 1: hanya sensor di -15 mm yang gelap (|12 - 15| = 3 dan sensor lain terlalu jauh), galat -15, koreksi +8; roda kiri 150 - 5 x 8 = 110, roda kanan 150 + 5 x 8 = 190. 2: `x` tick 1 tetap 12 (koreksi tick 0 belum terasa), `x` tick 2 = 12 - 8 = 4. 3: pada x = 4 hanya sensor tengah gelap, galat 0, koreksi 0; tetapi koreksi +8 dari tick 1 baru terasa, sehingga `x` tick 3 = 4 - 8 = -4: robot melewati garis karena koreksinya tertunda.

**Contoh setengah jadi.** Isian berurutan: `<`, `>`, `-T`, `UNIT_PER_MM`. Kunci yang dikompilasi dan dijalankan penulis menghasilkan keluaran yang sama dengan contoh terselesaikan.

**Soal Parsons.** Urutan benar: h, a, b, c, d, e, f, g, i. Garis hilang atau tidak valid ditangani lebih dulu dan mengembalikan fungsi; keputusan dan kendali roda hanya dijalankan bila galat valid.

**Latihan.** 1: `x` = 12, 12, 7, 2 pada tick 0 sampai 3; koreksi = 5, 5, 5, 0 (pada x = 2 hanya sensor tengah gelap, galat 0). 2: tidak ada kunci tunggal; jawaban yang baik mencatat hasil tiap `T` pada tikungan landai dan tajam dan tidak menyimpulkan dari satu percobaan. 3: contoh: kelembaman arah dan massa robot, kecepatan dan gesekan roda, pencahayaan serta kualitas lintasan; simulasi hanya model yang menyederhanakan semuanya. 4: tidak ada kunci tunggal; jawaban yang baik menyebut ukuran baru dan nilainya per `T`.

**Latihan bercampur.** 1: keduanya hanya memutuskan arah, sehingga keluaran melompat dan keadaan berayun di sekitar target. 2: tidak sama: zona mati hanya mengabaikan galat kecil dan tidak mengingat keputusan sebelumnya; histeresis memakai dua batas dan tetap pada keputusan terakhir di antara batas.

**Ulang berjarak.** 1: koreksi besar membuat robot melewati garis ke sisi seberang pada tick berikutnya, lalu dikoreksi balik, begitu terus. 2: bila lintasan atau titik awal berbeda, selisih hasil bisa berasal dari lintasan, bukan dari strategi. 3: contoh: rata-rata |x| (tidak menunjukkan seberapa sering berayun) dan pergantian arah (tidak menunjukkan seberapa jauh dari garis); maksimum |x| (hanya satu tick terburuk).

## Langkah berikutnya

Modul berikut: `c-xii1-m7` (pengikut garis: strategi 2), yang menjalankan kendali proporsional pada lintasan uji yang sama. Bacaan lanjut: dokumentasi `analogRead` dan PWM Arduino-ESP32 (lihat Rujukan).
