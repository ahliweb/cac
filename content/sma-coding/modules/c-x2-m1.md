## Untuk siapa modul ini

Modul ini untuk murid kelas X jalur C (IoT dan robotika), minggu `C-X2-M1` silabus v1.3: ulasan dan penelusuran galat perangkat (F). Prasyarat: modul `c-x1-m12`; sebaiknya kamu juga sudah mengerjakan materi `c-x1-m8` sampai `c-x1-m13`.

Modul ini berstatus DRAF: karangan penyusun, belum ditinjau pemilik, dan tidak dihitung memenuhi butir capaian pembelajaran mana pun. Keluaran minggu ini: daftar galat umum (galat kode dan galat kabel). Latihan silabusnya: memperbaiki lima rangkaian dan program rusak.

Ada dua cara mengerjakan. **Dengan papan (F):** guru menyiapkan rangkaian dan program rusak, dan kamu menelusurinya. **Tanpa papan:** kamu mengerjakan kelima kasus tertulis di bagian Latihan dan menjalankan "papan tiruan" di komputer. Nomor pin pada contoh hanya contoh `[belum terverifikasi]` untuk papanmu.

## Keselamatan perangkat

- Daya hanya dari kabel USB. Tidak ada listrik jaringan (220 V) dan tidak ada baterai pada modul ini.
- **Cabut kabel USB sebelum mengubah rangkaian.** Penelusuran galat sering mengajak kita menggeser kabel; kebiasaan ini tidak boleh ditinggalkan saat terburu-buru.
- Periksa polaritas LED sebelum menyalakan. Tidak ada solder: papan percobaan dan kabel jumper sudah cukup.
- Jangan menyentuh komponen untuk "merasakan" apakah panas saat daya menyala. Bila papan atau komponen berbau atau berasap, cabut kabel dan panggil guru.

## Ingat kembali

Jawab dari ingatan dulu, baru cek di kunci. Soal 1 dari `c-x1-m12`, soal 2 dari `c-x1-m9`, soal 3 dari `c-x1-m8` dan `fondasi-keamanan-dasar`.

1. Berapa indeks elemen pertama dan terakhir pada larik berisi 5 elemen?
2. Dengan `INPUT_PULLUP`, nilai apa yang dibaca `digitalRead` saat tombol ditekan?
3. Sebutkan tiga hal yang kamu lakukan sebelum mengubah rangkaian.

## Tujuan

Setelah modul ini kamu dapat:

- membedakan galat kompilasi, galat logika, dan galat rangkaian dari gejalanya;
- memakai satu uji yang memisahkan galat kode dari galat rangkaian;
- mencetak nilai mentah ke monitor serial untuk melihat apa yang sebenarnya dibaca papan;
- menulis daftar galat umum, kolom kode dan kolom kabel (keluaran minggu ini).

## Prediksi dulu

Baca program dan keterangan rangkaian ini, lalu **tebak dulu, tulis jawabanmu, baru telusuri**.

```arduino
// Arduino-C++ untuk ESP32. Diperiksa check:module-code terhadap header tiruan (sintaks dan tipe saja, bukan bukti perilaku papan).
const int PIN_LED = 2;

void setup() {
  pinMode(PIN_LED, OUTPUT);
}

void loop() {
  digitalWrite(PIN_LED, HIGH);
  delay(500);
  digitalWrite(PIN_LED, LOW);
  delay(500);
}
```

Keterangan rangkaian: LED dan resistornya disambung ke pin 4, bukan pin 2.

1. Apa yang tampak pada LED?
2. Apakah ini galat kode atau galat rangkaian?
3. Sebutkan dua cara memperbaikinya.

## Contoh terselesaikan

Ada tiga jenis galat, dan masing-masing meninggalkan gejala yang berbeda. **Galat kompilasi:** program tidak bisa dibangun, dan pesan galat menunjuk baris yang bermasalah; tidak ada yang berjalan di papan. **Galat logika:** program terunggah dan berjalan, tetapi perilakunya tidak sesuai tujuan, seperti `=` yang tertukar dengan `==`. **Galat rangkaian:** programnya benar menurut rencana, tetapi sambungan fisiknya berbeda dari rencana, seperti kabel di pin lain, LED terbalik, atau sambungan longgar.

Pembedanya adalah pertanyaan sederhana: *apa yang harus aku ubah supaya benar, programnya atau sambungannya?* Untuk menjawabnya, jalankan satu **uji pemisah** dan ubah hanya satu hal pada satu waktu. Bila kamu mengubah tiga hal sekaligus lalu semuanya jalan, kamu tidak tahu mana yang memperbaiki. Uji pemisah yang paling berguna: muat program kedip yang sudah kamu tahu benar. Bila LED kedip, rangkaian dan papan baik, jadi galatnya ada di programmu. Bila tidak, galatnya ada di rangkaian atau papan.

Papan tiruan di bawah tahu di pin mana LED sebenarnya terpasang, dan mencetak apa yang akan terjadi pada program pertama murid di bagian Prediksi.

```cpp
// C++17 biasa, jalan di komputer. Diperiksa oleh check:module-code.
#include <iostream>

// Papan tiruan yang tahu keadaan rangkaian.
const int OUTPUT = 3;
const int HIGH = 1;
const int LOW = 0;
const int PIN_LED_TERPASANG = 4;  // LED sebenarnya disambung ke pin ini

void pinMode(int, int) {}
void delay(long) {}
void digitalWrite(int pin, int nilai) {
  std::cout << "pin " << pin << (nilai == HIGH ? " HIGH" : " LOW") << ": ";
  if (pin == PIN_LED_TERPASANG) {
    std::cout << (nilai == HIGH ? "LED menyala" : "LED padam") << "\n";
  } else {
    std::cout << "tidak ada yang tersambung\n";
  }
}

// Program murid, versi pertama.
const int PIN_LED = 2;

void setup() {
  pinMode(PIN_LED, OUTPUT);
}

void loop() {
  digitalWrite(PIN_LED, HIGH);
  delay(500);
  digitalWrite(PIN_LED, LOW);
  delay(500);
}

int main() {
  setup();
  loop();
}
```

Keluarannya:

```text
pin 2 HIGH: tidak ada yang tersambung
pin 2 LOW: tidak ada yang tersambung
```

Program menulis ke pin 2 dan memang tidak ada yang tersambung di sana. Ini bukan galat bahasa; ini ketidaksesuaian antara program dan rangkaian. Ada dua perbaikan yang sah: ubah `PIN_LED` menjadi 4, atau (setelah mencabut kabel USB) pindahkan kabel ke pin 2. Mana yang dipilih ditentukan lembar guru, yang menyebut pin mana yang resmi. Dengan `PIN_LED` bernilai 4, keluarannya menjadi:

```text
pin 4 HIGH: LED menyala
pin 4 LOW: LED padam
```

Tabel berikut mulai daftar galat umummu: gejala, dugaan, dan uji yang memisahkan.

| Gejala | Dugaan | Uji yang memisahkan |
| --- | --- | --- |
| Program tidak mau terunggah | kode (kompilasi) atau kabel USB | baca pesan galat dan baris yang ditunjuk; coba kabel USB lain |
| LED tidak menyala sama sekali | kode, pin tidak sesuai, atau LED terbalik | muat program kedip yang sudah benar; periksa pin dan polaritas |
| Tombol selalu terbaca sama | logika terbalik, atau kaki tombol tidak tersambung | cetak nilai mentah `digitalRead` dan tekan lepas tombol |
| Nilai sensor melompat acak | sambungan longgar atau pin masukan mengambang | cabut daya, periksa sambungan, lalu cetak nilai lagi |

## Contoh setengah jadi

Sekarang sebagian diisi olehmu. Program ini mencetak nilai mentah tombol ke monitor serial setiap 200 ms, alat utama untuk membedakan galat logika dari galat kabel. Lengkapi bagian `____`.

```arduino setengah-jadi
// Arduino-C++ untuk ESP32. Lengkapi bagian ____.
const int PIN_TOMBOL = 15;   // contoh; periksa papanmu

void setup() {
  Serial.begin(115200);
  pinMode(PIN_TOMBOL, ____);
}

void loop() {
  int nilai = digitalRead(____);
  Serial.println(____);
  delay(200);
}
```

## Soal Parsons

Susun baris-baris di bawah (sudah diacak) menjadi program yang mencetak nilai tombol tiap 200 ms.

```text
(a) }
(b)   delay(200);
(c) void loop() {
(d)   Serial.println(nilai);
(e)   int nilai = digitalRead(PIN_TOMBOL);
```

## Latihan

1. `AI: boleh` **Pseudocode dulu.** LED tidak menyala. Tulis pseudocode berisi langkah penelusuran berurutan, satu uji per langkah, termasuk kapan kamu berhenti dan memanggil guru.
2. `AI: tanpa AI` **Golongkan.** Untuk tiap kasus, tulis jenis galatnya (kompilasi, logika, atau rangkaian) dan apa yang diubah. (a) Pesan galat: `expected ';' before '}' token`. (b) LED menyala saat tombol dilepas, padahal harus saat ditekan; programnya memakai `INPUT_PULLUP` dan `if (digitalRead(PIN_TOMBOL) == HIGH)`. (c) Program kedip yang benar tidak menyalakan LED yang kaki panjangnya disambung ke GND. (d) Program memakai pin 5, rangkaian di pin 4. (e) Nilai sensor melompat acak antara 0 dan 4095 padahal ruangan tenang.
3. `AI: tanpa AI` **Keluaran minggu ini.** Tulis daftar galat umummu dalam dua kolom, galat kode dan galat kabel, masing-masing minimal empat baris. Tiap baris: gejala, penyebab, dan cara memeriksa. Boleh memakai tabel di atas sebagai awal, tetapi tambahkan baris dari pengalamanmu sendiri.
4. *Opsional:* **catatan pemakaian AI.** Bila memakai AI generatif, kerjakan nomor 2 sendiri dulu, lalu minta petunjuk bertahap, bukan jawaban jadi. Catat alatnya, tujuanmu, garis besar perintahmu, bagian yang kamu pakai, dan cara memeriksanya (menjalankan atau menelusuri). Jangan menaruh data pribadi atau tugas bernilai pada perintah.

## Latihan bercampur

1. Larik `POLA` berisi 3 elemen, dan perulangannya `for (int i = 0; i <= 3; i++)`. Jenis galat apa ini, dan bagaimana memperbaikinya?
2. Program menulis `int persen = 3000 / 4095 * 100;` dan mencetak 0. Jelaskan, lalu tulis dua cara menghitung yang benar.
3. LED harus menyala bila tombol A ditekan **dan** tombol B tidak ditekan (keduanya `INPUT_PULLUP`). Tulis kondisinya.

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `c-x2-m2` (sekitar satu minggu lagi), `c-x2-m4` (sekitar tiga minggu lagi), dan `c-x2-m9` (sekitar delapan minggu lagi). Jawab sekarang lalu simpan.

1. Bila LED tidak menyala, apa satu uji yang memisahkan galat kode dari galat rangkaian?
2. Dengan `INPUT_PULLUP`, `digitalRead` terbaca `HIGH` terus walau tombol ditekan. Sebut satu dugaan di kode dan satu dugaan di rangkaian.
3. Mengapa mengubah satu hal pada satu waktu mempercepat penemuan galat?

## Kesalahan umum

- **Mengubah banyak hal sekaligus.** Bila semuanya jadi benar, kamu tidak tahu apa yang memperbaikinya, dan galat yang sama muncul lagi nanti.
- **Menyalahkan papan lebih dulu.** Papan jarang rusak; sambungan longgar, polaritas terbalik, dan nomor pin yang tidak cocok jauh lebih sering.
- **Mengira "berhasil dikompilasi" berarti benar.** Kompilasi hanya memeriksa bahasa, bukan tujuanmu, dan tidak memeriksa kabelmu.
- **Mengira papan tiruan membuktikan rangkaian.** Papan tiruan hanya memeriksa logika di komputer; sambungan nyata hanya terbukti dengan papan.
- **Mengubah kabel saat daya menyala.** Cabut kabel USB dulu, setiap kali.

## Cek mandiri

- [ ] Saya dapat membedakan galat kompilasi, logika, dan rangkaian dari gejalanya.
- [ ] Saya dapat menyebut satu uji pemisah galat kode dari galat rangkaian.
- [ ] Saya dapat mencetak nilai mentah masukan ke monitor serial.
- [ ] Saya mengubah satu hal pada satu waktu dan mencatat hasilnya.
- [ ] Saya mencabut kabel USB sebelum mengubah rangkaian.

## Kunci dan petunjuk

**Ingat kembali.** 1: indeks 0 dan 4. 2: `LOW`. 3: contoh jawaban: cabut kabel USB, periksa polaritas, pastikan tidak ada listrik jaringan 220 V, dan siapkan laporan ke guru bila papan panas atau berbau.

**Prediksi dulu.** 1: LED tidak menyala, karena program menulis ke pin 2 sedangkan LED ada di pin 4. 2: ketidaksesuaian antara program dan rangkaian; bahasanya benar, jadi bukan galat kompilasi, dan yang salah adalah salah satu dari keduanya terhadap lembar guru. 3: ubah `PIN_LED` menjadi 4, atau cabut daya lalu pindahkan kabel ke pin 2.

**Contoh setengah jadi.** Isian berurutan: `INPUT_PULLUP`, `PIN_TOMBOL`, `nilai`. Program lengkapnya dikompilasi penulis dengan `Arduino.h` tiruan tanpa peringatan.

**Soal Parsons.** Urutan benar: c, e, d, b, a.

**Latihan.** 1: contoh pseudocode: muat program kedip yang benar; bila LED kedip, galatnya di programmu (cetak nilai variabel); bila tidak, cabut daya, periksa polaritas dan nomor pin; coba LED lain; bila masih gagal, panggil guru. 2: (a) kompilasi: tambahkan titik koma pada baris yang ditunjuk. (b) logika: ganti `== HIGH` menjadi `== LOW`. (c) rangkaian: cabut daya, tukar sambungan sehingga kaki panjang ke pin lewat resistor dan kaki pendek ke GND. (d) ketidaksesuaian: ikuti lembar guru lalu ubah program atau pindahkan kabel. (e) rangkaian: sambungan longgar atau pin masukan mengambang; cabut daya dan periksa. 3: tidak ada kunci tunggal; daftar yang baik memuat gejala yang bisa diamati, penyebab yang masuk akal, dan uji yang bisa dikerjakan murid.

**Latihan bercampur.** 1: galat logika (satu lebih): `POLA[3]` tidak ada, ganti menjadi `i < 3`. 2: 3000 / 4095 adalah pembagian bilangan bulat yang hasilnya 0, lalu 0 x 100 tetap 0. Benar: `3000 * 100 / 4095` yang bernilai 73, atau `map(3000, 0, 4095, 0, 100)`. 3: `digitalRead(PIN_A) == LOW && digitalRead(PIN_B) == HIGH`.

**Ulang berjarak.** 1: muat program kedip yang sudah benar; bila LED kedip, galat ada di programmu. 2: kode: logika terbalik (`== HIGH` padahal ditekan terbaca `LOW`); rangkaian: kaki tombol tidak tersambung ke GND. 3: kamu tahu perubahan mana yang memperbaiki, dan tidak menambah galat baru.

## Langkah berikutnya

Modul berikut: `c-x2-m2` (sensor suhu dan kelembapan), yang memakai kebiasaan penelusuran ini ketika sensor memberi nilai aneh. Modul terkait: `fondasi-keamanan-dasar` untuk kebiasaan aman. Pembacaan lanjut: dokumentasi Arduino tentang `Serial`.

## Rujukan

- Arduino, rujukan bahasa: `pinMode()` dan `digitalRead()`. <https://docs.arduino.cc/language-reference/en/functions/digital-io/pinMode/>, <https://docs.arduino.cc/language-reference/en/functions/digital-io/digitalread/>
- Arduino, rujukan bahasa: `Serial.println()`. <https://docs.arduino.cc/language-reference/en/functions/communication/serial/println/>
- Espressif, dokumentasi Arduino-ESP32. <https://docs.espressif.com/projects/arduino-esp32/en/latest/>
