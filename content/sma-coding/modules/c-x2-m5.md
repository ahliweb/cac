## Untuk siapa modul ini

Modul ini untuk murid kelas X jalur C (IoT dan robotika), minggu `C-X2-M5` silabus v1.3: keluaran analog (PWM) (F). Prasyarat: modul `c-x2-m4` (larik dan rata-rata bergerak). Kamu juga memakai masukan analog dari `c-x1-m11`.

Modul ini berstatus DRAF: karangan penyusun, belum ditinjau pemilik, dan tidak dihitung memenuhi butir capaian pembelajaran mana pun. Keluaran minggu ini: program PWM. Latihan silabusnya: meredupkan dan menerangkan LED dengan potensiometer.

Ada dua cara mengerjakan. **Dengan papan (F):** kelompok merakit potensiometer dan LED sesuai lembar guru. **Tanpa papan:** kamu menelusuri program di kertas dan menjalankan "papan tiruan" di komputer yang mencetak nilai duty. Nomor pin dan batas pembacaan pada contoh hanya contoh `[belum terverifikasi]` untuk papanmu.

## Keselamatan perangkat

- Daya hanya dari kabel USB. Tidak ada listrik jaringan (220 V) dan tidak ada baterai pada modul ini.
- Cabut kabel USB sebelum memasang atau mengubah potensiometer atau LED. Periksa polaritas LED; LED selalu dipasang bersama resistor yang disiapkan guru.
- Pada modul ini pin papan hanya untuk LED. Motor, lampu, atau beban lain tidak pernah disambung langsung ke pin papan; beban seperti itu lewat modul pengendali yang disiapkan guru.
- Tidak ada solder. Papan percobaan dan kabel jumper sudah cukup.
- Papan atau komponen yang terasa panas, berbau, atau berasap: cabut kabel dan panggil guru.

## Ingat kembali

Jawab dari ingatan dulu, baru cek di kunci. Soal 1 dari `c-x1-m11`, soal 2 dari `c-x2-m4`, soal 3 dari `c-x2-m2`.

1. Mengapa ambang cahaya harus ditentukan dari pengukuran rangkaianmu sendiri, bukan ditebak?
2. Berapa rata-rata bergerak 3 pembacaan terakhir dari 10, 12, 20?
3. Mengapa `float f = c * (9 / 5) + 32;` memberi hasil salah walau `c` bertipe `float`?

## Tujuan

Setelah modul ini kamu dapat:

- menjelaskan PWM sebagai pulsa hidup-mati cepat dengan duty cycle tertentu;
- memakai `analogWrite` dengan nilai 0 sampai 255 untuk mengatur kecerahan LED;
- menghubungkan potensiometer ke LED dengan `map()`;
- menentukan batas bawah dan atas potensiometer dari pengukuran dan membatasinya dengan `constrain()`;
- menulis program PWM (keluaran minggu ini).

## Prediksi dulu

Program membaca potensiometer dan mengatur LED dengan `duty = map(mentah, 0, 4095, 0, 255)` memakai bilangan bulat. **Tebak dulu, tulis jawabanmu, baru telusuri.** Dua pembacaan: 512 dan 3000.

1. Berapa nilai `duty` tiap pembacaan (hasil dibulatkan ke bawah)?
2. Kira-kira berapa persen waktu LED menyala pada tiap pembacaan, yaitu `duty` dibagi 255?
3. Mengapa LED tampak redup atau terang tetap, bukan berkedip?

## Contoh terselesaikan

Pin papan hanya bisa `HIGH` atau `LOW`. Untuk mengatur kecerahan, papan menyalakan dan mematikan pin dengan sangat cepat. Bagian waktu pin menyala dalam satu siklus disebut **duty cycle**. Duty 50 persen berarti separuh waktu hidup, separuh mati, dan rata-rata tegangannya kira-kira separuh tegangan keluaran. Mata kita tidak mengikuti perubahan secepat itu, sehingga LED tampak redup, bukan berkedip; angka frekuensi PWM papanmu `[belum terverifikasi]`. Inilah **PWM** (*pulse width modulation*).

Perintahnya `analogWrite(pin, nilai)`. Menurut dokumentasi Arduino-ESP32 (versi "latest" per 2026-11), resolusi bawaannya 8 bit sehingga nilai 0 berarti selalu mati dan 255 selalu hidup, dan nilai di atas batas diperlakukan sebagai penuh hidup. Dokumentasi yang sama mencatat perubahan antar versi untuk fungsi LEDC yang lebih rendah, jadi periksa versi inti papanmu; contoh di sini hanya memakai `analogWrite`.

Potensiometer adalah pembagi tegangan yang diputar tangan: kaki tengahnya ke pin masukan analog menghasilkan nilai dari ujung bawah ke ujung atas. Pembacaan 0 sampai 4095 pada contoh ini mengikuti modul sebelumnya `[belum terverifikasi]` untuk papanmu. Dalam praktik potensiometer jarang mencapai tepat 0 dan 4095, sama seperti ambang cahaya yang harus diukur. Maka batas bawah dan atas diukur lalu dipakai untuk `constrain()` (membatasi nilai) dan `map()`.

```arduino
// Arduino-C++ untuk ESP32. Diperiksa check:module-code terhadap header tiruan (sintaks dan tipe saja, bukan bukti perilaku papan).
const int PIN_POT = 34;      // contoh; periksa papanmu
const int PIN_LED = 5;       // contoh; periksa papanmu
const int POT_MIN = 40;      // ukur sendiri; ini contoh
const int POT_MAX = 4050;    // ukur sendiri; ini contoh

void setup() {
  pinMode(PIN_LED, OUTPUT);
}

void loop() {
  int mentah = analogRead(PIN_POT);
  int terbatas = constrain(mentah, POT_MIN, POT_MAX);
  int duty = map(terbatas, POT_MIN, POT_MAX, 0, 255);
  analogWrite(PIN_LED, duty);
  delay(20);
}
```

Papan tiruan di bawah menghitung duty dengan dua cara, kasar (0 sampai 4095) dan terkalibrasi, untuk lima pembacaan, lalu menjalankan satu putaran `loop()`.

```cpp
// C++17 biasa, jalan di komputer. Diperiksa oleh check:module-code.
#include <iostream>

// Papan tiruan: pengganti fungsi Arduino.
int nilai_pot = 0;

int analogRead(int) { return nilai_pot; }
void analogWrite(int pin, int nilai) {
  std::cout << "pin " << pin << ": duty " << nilai << " dari 255 (" << nilai * 100 / 255 << " persen)\n";
}
void delay(long) {}
long map(long x, long in_min, long in_max, long out_min, long out_max) {
  return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}
int batasi(int x, int bawah, int atas) {
  return x < bawah ? bawah : (x > atas ? atas : x);
}

// Program yang sama dengan versi Arduino.
const int PIN_POT = 34;
const int PIN_LED = 5;
const int POT_MIN = 40;     // ukur sendiri; ini contoh
const int POT_MAX = 4050;   // ukur sendiri; ini contoh

int dutyKasar(int mentah) {
  return map(mentah, 0, 4095, 0, 255);
}

int dutyKalibrasi(int mentah) {
  int terbatas = batasi(mentah, POT_MIN, POT_MAX);
  return map(terbatas, POT_MIN, POT_MAX, 0, 255);
}

void loop() {
  analogWrite(PIN_LED, dutyKalibrasi(analogRead(PIN_POT)));
  delay(20);
}

int main() {
  const int BACAAN[] = {0, 1024, 2048, 3072, 4095};
  for (int mentah : BACAAN) {
    std::cout << "mentah " << mentah << ": kasar " << dutyKasar(mentah) << ", terkalibrasi "
              << dutyKalibrasi(mentah) << "\n";
  }
  nilai_pot = 2045;
  std::cout << "satu putaran loop() dengan mentah " << nilai_pot << ": ";
  loop();
}
```

Keluarannya:

```text
mentah 0: kasar 0, terkalibrasi 0
mentah 1024: kasar 63, terkalibrasi 62
mentah 2048: kasar 127, terkalibrasi 127
mentah 3072: kasar 191, terkalibrasi 192
mentah 4095: kasar 255, terkalibrasi 255
satu putaran loop() dengan mentah 2045: pin 5: duty 127 dari 255 (49 persen)
```

Perbedaannya kecil di tengah, tetapi di ujung penting: dengan cara kasar, potensiometer yang hanya mencapai 4050 tidak pernah membuat LED penuh terang; dengan batas terukur, kedua ujung putaran memberi 0 dan 255. Angka `49 persen` berasal dari 127 x 100 / 255 dengan pembagian bilangan bulat.

## Contoh setengah jadi

Sekarang sebagian diisi olehmu. Tujuannya: potensiometer di `PIN_POT` mengatur LED di `PIN_LED` memakai batas 0 sampai 4095. Lengkapi bagian `____`.

```arduino setengah-jadi
// Arduino-C++ untuk ESP32. Lengkapi bagian ____.
void loop() {
  int mentah = analogRead(PIN_POT);
  int duty = map(mentah, 0, ____, 0, ____);
  analogWrite(____, duty);
  delay(20);
}
```

## Soal Parsons

Susun baris-baris di bawah (sudah diacak) menjadi `loop()` yang mengatur LED dari potensiometer.

```text
(a)   analogWrite(PIN_LED, duty);
(b)   int duty = map(mentah, 0, 4095, 0, 255);
(c)   int mentah = analogRead(PIN_POT);
(d) void loop() {
(e)   delay(20);
(f) }
```

## Latihan

1. `AI: boleh` **Pseudocode dulu.** Tulis pseudocode lalu programnya: potensiometer meredupkan dan menerangkan LED, dengan batas bawah dan atas yang diukur (keluaran minggu ini).
2. `AI: tanpa AI` **Hitung.** Berapa `map(1000, 0, 4095, 0, 255)` dengan bilangan bulat, dan berapa persen duty-nya (duty x 100 / 255, bilangan bulat)?
3. `AI: tanpa AI` **Cari galat.** Program menulis `analogWrite(PIN_LED, analogRead(PIN_POT));`. Mengapa LED terang penuh untuk sebagian besar putaran potensiometer?
4. `AI: boleh` **Bila papan tersedia (opsional).** Putar potensiometer ke kedua ujung dan catat lima pembacaan tiap ujung. Pilih `POT_MIN` dan `POT_MAX` yang aman dan jelaskan pilihanmu. Jangan mengubah rangkaian saat daya menyala.
5. *Opsional:* **catatan pemakaian AI.** Bila memakai AI generatif, jawab nomor 1 sendiri dulu, lalu minta penjelasan atau petunjuk bertahap, bukan program jadi. Catat alatnya, tujuanmu, garis besar perintahmu, bagian yang kamu pakai, dan cara memeriksanya (jalankan atau telusuri). Jangan menaruh data pribadi atau tugas bernilai pada perintah.

## Latihan bercampur

1. Tiga pembacaan potensiometer: 1000, 1030, 1010. Berapa rata-rata bergerak tiganya (satu angka di belakang koma), dan mengapa menghaluskan sebelum `map()` membantu?
2. Satu pembacaan potensiometer tiba-tiba 0 di antara pembacaan sekitar 2000. Apa yang tampak pada LED, dan sebut satu cara dari minggu-minggu lalu untuk mengatasinya.

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `c-x2-m6` (sekitar satu minggu lagi), `c-x2-m8` (sekitar tiga minggu lagi), dan `c-x2-m13` (sekitar delapan minggu lagi). Jawab sekarang lalu simpan.

1. Berapa `map(2048, 0, 4095, 0, 255)` dengan aturan bilangan bulat?
2. Apa arti duty 50 persen pada PWM, dan mengapa LED tampak redup, bukan berkedip?
3. Mengapa batas bawah dan atas potensiometer perlu diukur, bukan diasumsikan 0 dan 4095?

## Kesalahan umum

- **Mengira `analogWrite` menghasilkan tegangan analog sungguhan.** Yang keluar adalah pulsa hidup-mati cepat; efeknya terasa sebagai tegangan rata-rata.
- **Memberi nilai di luar 0 sampai 255.** Pada dokumentasi Arduino-ESP32 nilai terlalu besar dianggap penuh hidup, sehingga LED tidak lagi bereaksi pada sebagian besar putaran; papan lain bisa berbeda `[belum terverifikasi]`.
- **Mengira kecerahan yang terlihat naik lurus dengan duty.** Mata biasanya tidak menilai kecerahan secara lurus; lihat sendiri dan jangan mengandalkan angka.
- **Mengira potensiometer selalu 0 sampai 4095.** Ukur sendiri batas bawah dan atasnya.
- **Menyambung beban besar langsung ke pin papan.** Motor atau lampu lewat modul pengendali.
- **Mengira fungsi PWM sama di semua versi inti papan.** Dokumentasi Arduino-ESP32 mencatat perubahan antar versi; periksa versi papanmu.

## Cek mandiri

- [ ] Saya dapat menjelaskan duty cycle dengan kata-kataku sendiri.
- [ ] Saya memakai `analogWrite` dengan nilai 0 sampai 255.
- [ ] Saya dapat menghitung `map()` dengan bilangan bulat.
- [ ] Saya mengukur batas potensiometer, bukan menebaknya.
- [ ] Saya tahu beban besar tidak disambung langsung ke pin papan.

## Kunci dan petunjuk

**Ingat kembali.** 1: nilai sensor berbeda antar rangkaian dan ruangan, jadi ambang dari rangkaianmu sendiri. 2: (10 + 12 + 20) / 3 = 14. 3: karena `9 / 5` dihitung sebagai bilangan bulat lebih dulu dan bernilai 1.

**Prediksi dulu.** 1: 512 x 255 / 4095 = 31,88 menjadi 31; 3000 x 255 / 4095 = 186,8 menjadi 186. 2: 31 x 100 / 255 = 12 persen; 186 x 100 / 255 = 72 persen (bilangan bulat). 3: pin dihidupkan dan dimatikan jauh lebih cepat daripada yang bisa diikuti mata.

**Contoh setengah jadi.** Isian berurutan: `4095`, `255`, `PIN_LED`. Program lengkapnya dikompilasi penulis dengan `Arduino.h` tiruan tanpa peringatan.

**Soal Parsons.** Urutan benar: d, c, b, a, e, f.

**Latihan.** 1: pseudocode: ULANG TERUS: baca potensiometer; batasi ke POT_MIN sampai POT_MAX; petakan ke 0 sampai 255; tulis ke LED; tunggu 20 ms. 2: 1000 x 255 / 4095 = 62,27 menjadi 62; 62 x 100 / 255 = 24 persen. 3: pembacaan bisa sampai 4095, jauh di atas 255; pada dokumentasi Arduino-ESP32 nilai di atas batas dianggap penuh hidup, sehingga LED terang penuh begitu pembacaan melewati 255, yaitu hampir seluruh putaran. Perbaikan: `map()` ke 0 sampai 255 lebih dulu. 4: tidak ada kunci tunggal; jawaban yang baik memakai nilai yang masih terbaca stabil di ujung putaran dan menyebut bahwa angkanya berasal dari pengukuran.

**Latihan bercampur.** 1: (1000 + 1030 + 1010) / 3 = 1013,3; getaran kecil pada pembacaan tidak langsung terlihat sebagai kedip pada LED. 2: LED berkedip gelap sekilas; atasi dengan rata-rata bergerak (`c-x2-m4`) atau menandai lonjakan (`c-x2-m3`).

**Ulang berjarak.** 1: 2048 x 255 / 4095 = 127,5 menjadi 127. 2: LED hidup separuh waktu dan mati separuh waktu, bergantian jauh lebih cepat daripada yang bisa diikuti mata, sehingga tampak redup. 3: nilai nyata potensiometer berbeda antar komponen dan rangkaian; tanpa pengukuran, ujung putaran tidak memberi keluaran penuh.

## Langkah berikutnya

Modul berikut: `c-x2-m6` (aktuator: servo dan buzzer), yang menggerakkan dan membunyikan sesuatu dari keputusan program. Modul terkait: `fondasi-komputer-dan-hardware` untuk gagasan masukan dan keluaran. Pembacaan lanjut: dokumentasi Arduino-ESP32 tentang LEDC.
