## Untuk siapa modul ini

Modul ini untuk murid kelas X jalur C (IoT dan robotika), minggu `C-X1-M9` silabus v1.3: masukan digital, percabangan, dan logika Boolean. Prasyarat: modul `c-x1-m8` (`setup()`, `loop()`, `digitalWrite`, `delay`). Kamu belum perlu pernah memprogram sebelum jalur ini.

Modul ini karangan penyusun dan disetujui pemilik program pada 2026-11-20 (keputusan lewat dialog; catatan tinjauan menjadi tindak lanjut revisi). Ia mendukung butir `E-BK-d` (solusi program sederhana dalam format pseudocode) dan tidak dihitung memenuhi butir capaian pembelajaran mana pun.

Ada dua cara mengerjakan. **Dengan papan (F):** kamu merakit satu tombol dan satu LED bersama kelompokmu. **Tanpa papan:** kamu menelusuri program di kertas dan menjalankan "papan tiruan" di komputer. Semua bagian pokok bisa dikerjakan tanpa papan. Nomor pin dan cara tombol disambung pada papanmu `[belum terverifikasi]`: ikuti lembar guru.

## Keselamatan perangkat

- Daya hanya dari kabel USB. Tidak ada listrik jaringan (220 V) dan tidak ada baterai pada modul ini.
- Cabut kabel USB sebelum memasang atau melepas kabel jumper, tombol, atau LED.
- LED di luar papan selalu dipasang bersama resistor yang disiapkan guru, dan kaki LED punya polaritas. Periksa polaritas sebelum menyalakan; nilai resistor ikuti lembar guru.
- Tidak ada solder. Papan percobaan dan kabel jumper sudah cukup.
- Papan atau komponen yang terasa panas, berbau, atau berasap: cabut kabel dan panggil guru.

## Ingat kembali

Jawab dari ingatan dulu, baru cek di kunci. Soal 1, 2, dan 4 dari `c-x1-m8`; soal 3 dari modul fondasi `fondasi-representasi-data`.

1. Apa beda `setup()` dan `loop()`?
2. Dalam diagram I-P-O, apakah tombol itu masukan atau keluaran? Bagaimana dengan LED?
3. Satu bit dapat menyimpan nilai apa saja?
4. Sebuah program memakai `delay(250)` setelah LED menyala dan `delay(250)` setelah LED padam. Berapa milidetik satu putaran `loop()`?

## Tujuan

Setelah modul ini kamu dapat:

- membaca keadaan tombol dengan `digitalRead` dan menjelaskan mengapa `INPUT_PULLUP` membuat tombol ditekan terbaca `LOW`;
- memakai `if`/`else` untuk membuat keputusan;
- menggabungkan syarat dengan `&&`, `||`, dan `!`;
- membuat tabel kebenaran dan program tombol-LED (keluaran minggu ini).

## Prediksi dulu

Baca program ini dan **tebak dulu, tulis jawabanmu, baru jalankan atau telusuri**. Tombol disambung ke pin 4 dan ke GND; mode `INPUT_PULLUP` menjaga pin tetap `HIGH` selama tombol tidak ditekan.

```arduino
// Arduino-C++ untuk ESP32. Diperiksa check:module-code terhadap header tiruan (sintaks dan tipe saja, bukan bukti perilaku papan).
const int PIN_TOMBOL = 4;   // contoh; periksa papanmu
const int PIN_LED = 2;

void setup() {
  pinMode(PIN_TOMBOL, INPUT_PULLUP);
  pinMode(PIN_LED, OUTPUT);
}

void loop() {
  if (digitalRead(PIN_TOMBOL) == LOW) {
    digitalWrite(PIN_LED, HIGH);
  } else {
    digitalWrite(PIN_LED, LOW);
  }
}
```

1. Tombol tidak ditekan: LED menyala atau padam?
2. Tombol ditekan: LED menyala atau padam?
3. Mengapa pembandingnya `LOW`, bukan `HIGH`?
4. Bila bagian `else` dihapus, apa yang terjadi setelah tombol dilepas?

## Contoh terselesaikan

Tombol adalah masukan, program adalah proses, LED adalah keluaran. Masukan digital hanya punya dua nilai: `HIGH` atau `LOW`. Dengan `INPUT_PULLUP`, resistor di dalam papan menarik pin ke `HIGH`; menekan tombol menyambungkan pin ke GND sehingga terbaca `LOW`. Tanpa mode itu, pin yang tidak tersambung ke apa pun dapat terbaca `HIGH` atau `LOW` secara acak (dokumentasi `digitalRead`), jadi pembacaan tidak bisa dipercaya.

Bagian `if (kondisi) { ... } else { ... }` menjalankan blok pertama bila kondisinya benar, dan blok kedua bila salah. Di bawah ini papan tiruan yang menjalankan program yang sama dengan lima pembacaan tombol yang sudah ditentukan.

```cpp
// C++17 biasa, jalan di komputer. Diperiksa oleh check:module-code.
#include <iostream>

// Papan tiruan: pengganti fungsi Arduino.
const int INPUT_PULLUP = 5;
const int OUTPUT = 3;
const int HIGH = 1;
const int LOW = 0;

// Pembacaan tombol per langkah: HIGH = tidak ditekan, LOW = ditekan.
const int BACAAN[] = {HIGH, HIGH, LOW, LOW, HIGH};
int langkah = 0;

void pinMode(int, int) {}
int digitalRead(int) { return BACAAN[langkah]; }
void digitalWrite(int pin, int nilai) {
  std::cout << "langkah " << langkah << ": LED pin " << pin
            << (nilai == HIGH ? " nyala" : " padam") << "\n";
}

// Program yang sama dengan di atas.
const int PIN_TOMBOL = 4;
const int PIN_LED = 2;

void setup() {
  pinMode(PIN_TOMBOL, INPUT_PULLUP);
  pinMode(PIN_LED, OUTPUT);
}

void loop() {
  if (digitalRead(PIN_TOMBOL) == LOW) {
    digitalWrite(PIN_LED, HIGH);
  } else {
    digitalWrite(PIN_LED, LOW);
  }
}

int main() {
  setup();
  for (langkah = 0; langkah < 5; langkah++) loop();
}
```

Keluarannya:

```text
langkah 0: LED pin 2 padam
langkah 1: LED pin 2 padam
langkah 2: LED pin 2 nyala
langkah 3: LED pin 2 nyala
langkah 4: LED pin 2 padam
```

Cocokkan dengan tebakanmu. LED menyala tepat pada langkah ketika tombol terbaca `LOW`.

Untuk menggabungkan syarat ada tiga operator. `A && B` (dan) benar bila keduanya benar. `A || B` (atau) benar bila salah satu atau keduanya benar. `!A` (bukan) membalik nilai. Tabel kebenaran mendaftar semua kombinasi; program ini mencetaknya (1 = benar, 0 = salah).

```cpp
// C++17 biasa, jalan di komputer. Diperiksa oleh check:module-code.
#include <iostream>

int main() {
  std::cout << "A B | A&&B A||B !A\n";
  for (int a = 0; a <= 1; a++) {
    for (int b = 0; b <= 1; b++) {
      std::cout << a << " " << b << " |   " << (a && b) << "     "
                << (a || b) << "    " << !a << "\n";
    }
  }
}
```

Keluarannya:

```text
A B | A&&B A||B !A
0 0 |   0     0    1
0 1 |   0     1    1
1 0 |   0     1    0
1 1 |   1     1    0
```

Dua tombol dapat dipakai bersama. Misalnya "LED menyala bila A ditekan dan B juga ditekan" ditulis `if (a_ditekan && b_ditekan)`.

## Contoh setengah jadi

Sekarang sebagian diisi olehmu. Tujuannya: LED menyala bila **tepat satu** dari dua tombol ditekan (bukan keduanya, bukan tidak ada). Lengkapi bagian `____`.

```arduino setengah-jadi
// Arduino-C++ untuk ESP32. Diperiksa check:module-code terhadap header tiruan (sintaks dan tipe saja, bukan bukti perilaku papan).
const int PIN_A = 4;
const int PIN_B = 5;
const int PIN_LED = 2;

void setup() {
  pinMode(PIN_A, INPUT_PULLUP);
  pinMode(PIN_B, INPUT_PULLUP);
  pinMode(PIN_LED, OUTPUT);
}

void loop() {
  bool a_ditekan = (digitalRead(PIN_A) == ____);
  bool b_ditekan = (digitalRead(PIN_B) == LOW);
  if ((a_ditekan || b_ditekan) && ____(a_ditekan && b_ditekan)) {
    digitalWrite(PIN_LED, HIGH);
  } else {
    digitalWrite(PIN_LED, ____);
  }
}
```

## Soal Parsons

Susun baris-baris di bawah (sudah diacak) menjadi fungsi `loop()` dari program tombol-LED pada bagian Prediksi.

```text
(a) } else {
(b)   digitalWrite(PIN_LED, LOW);
(c) void loop() {
(d)   if (digitalRead(PIN_TOMBOL) == LOW) {
(e) }
(f)   digitalWrite(PIN_LED, HIGH);
(g) }
```

## Latihan

1. `AI: boleh` **Pseudocode dulu.** Tulis pseudocode, lalu programnya: LED menyala hanya bila tombol A dan tombol B ditekan bersamaan.
2. `AI: tanpa AI` **Tabel kebenaran.** Lengkapi tabel untuk `(A || B) && !(A && B)` pada empat kombinasi A dan B.
3. `AI: tanpa AI` **Telusuri.** Pada program contoh setengah jadi, tombol A ditekan terus selama lima langkah dan tombol B ditekan hanya pada langkah 2 dan 3. Tulis keadaan LED (nyala atau padam) pada langkah 0 sampai 4.
4. `AI: boleh` **Dengan papan (F).** Rakit satu tombol dan satu LED sesuai lembar guru dengan kabel USB dicabut, lalu unggah program Prediksi. Bila LED menyala tanpa tombol ditekan, jangan mengubah rangkaian sendiri: periksa dulu polaritas LED dan tanya guru.
5. *Opsional:* **catatan pemakaian AI.** Bila memakai AI generatif, jawab nomor 1 sendiri dulu, lalu minta penjelasan atau petunjuk bertahap, bukan program jadi. Catat alatnya, tujuanmu, garis besar perintahmu, bagian yang kamu pakai, dan cara memeriksanya (jalankan atau telusuri). Jangan menaruh data pribadi atau tugas bernilai pada perintah.

## Latihan bercampur

1. Dua tombol mewakili bilangan dua bit: A bit tinggi, B bit rendah, ditekan = 1. Tulis nilai desimal untuk keempat kombinasi (A, B).
2. Program `c-x1-m8` memakai `JEDA_MS = 250`. Berapa kali LED menyala dalam 10 detik?
3. Gambar diagram I-P-O untuk bel pintu mini: apa masukannya, prosesnya, dan keluarannya? Kondisi apa yang kamu tulis agar bel berbunyi?

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `c-x1-m10` (pertanyaan 1), sekitar tiga minggu lagi di `c-x1-m12` (pertanyaan 2), dan sekitar delapan minggu lagi di semester berikutnya (pertanyaan 3). Jawab sekarang lalu simpan.

1. Lengkapi tabel kebenaran `A && B` untuk keempat kombinasi A dan B.
2. Dengan `INPUT_PULLUP`, nilai apa yang dibaca `digitalRead` saat tombol ditekan?
3. Beri satu contoh keputusan sehari-hari yang memakai "dan" dan satu yang memakai "atau", lalu tulis dengan `&&` atau `||`.

## Kesalahan umum

- **`=` tertukar dengan `==`.** `if (x = LOW)` memberi nilai pada `x`, bukan membandingkan, dan kondisinya hampir selalu salah arah. Kompiler yang baik memberi peringatan; bacalah.
- **Logika terbalik pada `INPUT_PULLUP`.** Mengira tombol ditekan terbaca `HIGH`. Pada mode ini tombol ditekan terbaca `LOW`.
- **Pin masukan dibiarkan mengambang.** Tanpa `INPUT_PULLUP` atau resistor penarik, nilai yang terbaca bisa acak.
- **Mengira `&&` sama dengan "lalu".** `&&` menggabungkan syarat dalam satu keputusan, bukan menjalankan dua langkah berurutan.
- **Kurung kurawal `else` salah tempat.** Baris di bawah `else` tanpa kurung kurawal bukan bagian dari `else`.

## Cek mandiri

- [ ] Saya dapat menjelaskan mengapa `INPUT_PULLUP` membuat tombol ditekan terbaca `LOW`.
- [ ] Saya dapat menulis `if`/`else` dengan kondisi yang benar.
- [ ] Saya dapat melengkapi tabel kebenaran untuk `&&`, `||`, dan `!`.
- [ ] Saya menulis pseudocode sebelum programnya.
- [ ] Saya tahu langkah keselamatan sebelum mengubah rangkaian.

## Kunci dan petunjuk

**Ingat kembali.** 1: `setup()` sekali saat papan menyala, `loop()` berulang terus. 2: tombol masukan, LED keluaran. 3: 0 atau 1. 4: 250 + 250 = 500 ms.

**Prediksi dulu.** 1: padam (pin terbaca `HIGH`, kondisi `== LOW` salah, jalan ke `else`). 2: menyala. 3: karena dengan `INPUT_PULLUP` tombol ditekan menyambungkan pin ke GND. 4: LED yang sudah menyala tidak pernah dipadamkan lagi.

**Contoh setengah jadi.** Isian berurutan: `LOW`, `!`, `LOW`. Kondisi `(a_ditekan || b_ditekan) && !(a_ditekan && b_ditekan)` benar bila tepat satu tombol ditekan.

**Soal Parsons.** Urutan benar: c, d, f, a, b, g, e. Baris (a) menutup `if` dan membuka `else`; baris (g) menutup `else`; baris (e) menutup `loop`. Baris (g) dan (e) sama-sama `}`, jadi keduanya boleh bertukar tempat.

**Latihan.** 1: pseudocode: ULANG TERUS: BILA A ditekan DAN B ditekan, nyalakan LED; JIKA TIDAK padamkan LED. Kondisi: `if (a_ditekan && b_ditekan)`. 2: baris (A, B): (0,0) menjadi 0; (0,1) menjadi 1; (1,0) menjadi 1; (1,1) menjadi 0. 3: A ditekan tiap langkah; B hanya langkah 2 dan 3. Langkah 0: nyala; 1: nyala; 2: padam; 3: padam; 4: nyala.

**Latihan bercampur.** 1: (0,0) menjadi 0; (0,1) menjadi 1; (1,0) menjadi 2; (1,1) menjadi 3. 2: satu putaran 250 + 250 = 500 ms, jadi 2 kali per detik dan 20 kali dalam 10 detik. 3: masukan tombol, proses program, keluaran bel; kondisi `if (digitalRead(PIN_TOMBOL) == LOW)` untuk bunyi.

**Ulang berjarak.** 1: hanya baris (1,1) benar: 0, 0, 0, 1. 2: `LOW`. 3: contoh jawaban: "membawa payung bila hujan atau mendung" menjadi `hujan || mendung`; "boleh masuk bila membawa kartu dan terdaftar" menjadi `kartu && terdaftar`.

## Langkah berikutnya

Modul berikut: `c-x1-m10` (perulangan dan keluaran serial), yang membuat program mengulang dan mencetak nilai untuk mencari galat. Modul terkait: `matkom-logika-proposisi` membahas tabel kebenaran lebih dalam. Pembacaan lanjut: dokumentasi `pinMode`, `digitalRead` (Arduino) dan GPIO pada dokumentasi Arduino-ESP32 milik Espressif.
