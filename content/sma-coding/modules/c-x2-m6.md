## Untuk siapa modul ini

Modul ini untuk murid kelas X jalur C (IoT dan robotika), minggu `C-X2-M6` silabus v1.3: aktuator servo dan buzzer (F). Prasyarat: modul `c-x2-m5` (PWM). Kamu juga memakai fungsi dari `c-x1-m12`.

Modul ini karangan penyusun dan disetujui pemilik program pada 2026-11-20 (keputusan lewat dialog; catatan tinjauan menjadi tindak lanjut revisi), dan tidak dihitung memenuhi butir capaian pembelajaran mana pun. Keluaran minggu ini: program aktuator. Latihan silabusnya: palang pintu mini.

Ada dua cara mengerjakan. **Dengan papan (F):** kelompok merakit servo dan buzzer sesuai lembar guru. **Tanpa papan:** kamu menelusuri program di kertas dan menjalankan "papan tiruan" di komputer yang mencetak apa yang akan dilakukan servo dan buzzer. Nomor pin, rentang sudut, dan pustaka servo pada contoh hanya contoh `[belum terverifikasi]` untuk papan dan servomu.

## Keselamatan perangkat

- Daya hanya dari kabel USB atau sumber yang disiapkan guru. Tidak ada listrik jaringan (220 V) dan tidak ada baterai litium.
- Cabut daya sebelum memasang servo, lengan, buzzer, atau mengubah kabel. Periksa polaritas buzzer.
- Servo bergerak dan dapat menjepit jari. **Jangan menyentuh lengan atau palang saat daya menyala**, dan jangan memutar lengan dengan tangan untuk "membantu".
- Kabel sinyal servo ke pin papan; kabel dayanya mengikuti lembar guru, bukan ditebak. Arus yang dibutuhkan servo dan batas pin papanmu `[belum terverifikasi]`; motor atau servo tidak disambung langsung ke pin untuk daya.
- Batasi sudut sesuai batas mekanik palang. Lengan yang didorong melewati batasnya dapat berdengung, panas, atau rusak: matikan daya dan panggil guru.
- Buzzer jangan didekatkan ke telinga, dan bunyikan secukupnya. Papan atau komponen yang berbau atau berasap: cabut daya dan panggil guru.
- Tidak ada solder.

## Ingat kembali

Jawab dari ingatan dulu, baru cek di kunci. Soal 1 dari `c-x1-m12`, soal 2 dari `c-x2-m5`, soal 3 dari `c-x2-m3`.

1. Mengapa memecah program menjadi fungsi memudahkan pengujian?
2. Berapa `map(2048, 0, 4095, 0, 255)` dengan aturan bilangan bulat?
3. Bagaimana membedakan lonjakan palsu dari perubahan nyata?

## Tujuan

Setelah modul ini kamu dapat:

- memberi servo sudut tujuan dengan pustaka servo dan menjelaskan bahwa gerakannya butuh waktu;
- membatasi sudut dengan fungsi kecil yang dapat diuji sendiri;
- membunyikan nada dengan frekuensi tertentu dan membedakan buzzer aktif dan pasif;
- menyusun siklus palang pintu mini dari fungsi-fungsi kecil (keluaran minggu ini);
- menyebut aturan keselamatan untuk bagian yang bergerak.

## Prediksi dulu

Baca program ini dan **tebak dulu, tulis jawabanmu, baru telusuri**. Palang hanya bisa bergerak sampai 90 derajat.

```arduino
// Arduino-C++ untuk ESP32. Diperiksa check:module-code terhadap header tiruan (sintaks dan tipe saja, bukan bukti perilaku papan).
#include <ESP32Servo.h>

Servo servo;

void setup() {
  servo.attach(13);
  servo.write(0);
}

void loop() {
  servo.write(90);
  delay(2000);
  servo.write(0);
  delay(2000);
}
```

1. Berapa derajat total yang ditempuh lengan dalam satu putaran `loop()` (naik dan turun)?
2. Berapa detik satu putaran `loop()`, bila waktu gerak servo diabaikan?
3. Apa yang kemungkinan terjadi bila `servo.write(90)` diganti `servo.write(150)`?

## Contoh terselesaikan

Servo adalah motor kecil dengan pengatur sendiri. Kamu tidak mengatur kecepatan putarnya; kamu hanya memberi **sudut tujuan** dengan `write(sudut)`, dan servo mengejar sudut itu. Fungsi `write` kembali segera, sedangkan gerak lengan butuh waktu. Karena itu program menunggu `GERAK_MS` setelah memberi sudut (angka contoh 500 ms; ukur dengan servomu). Tanpa tunggu, baris berikutnya berjalan ketika lengan belum sampai.

Karena lengan palang punya batas mekanik, sudut dikirim lewat fungsi `batasiSudut()` yang menjepit nilai ke rentang aman. Fungsi sekecil ini bisa diuji sendiri di komputer tanpa servo, termasuk di batasnya. Untuk buzzer ada dua jenis. **Buzzer aktif** punya pembangkit nada sendiri: ia berbunyi dengan nada tetap bila diberi daya, dan program hanya menghidupkan atau mematikannya. **Buzzer pasif** perlu sinyal berfrekuensi: nada ditentukan frekuensi yang kamu berikan, dalam hertz. Sebagai patokan, 440 Hz adalah nada A standar, dan menggandakan frekuensi menaikkan nada satu oktaf. Pada contoh ini buzzer pasif dibunyikan dengan `ledcWriteTone(pin, frekuensi)`, dan frekuensi 0 mendiamkannya. Dokumentasi Arduino-ESP32 (versi "latest" per 2026-11-19) menyebut pin harus disiapkan lebih dulu, dengan `ledcAttach(pin, frekuensi, resolusi)` di `setup()`; fungsi ini bisa berbeda di versi inti papanmu.

```arduino
// Arduino-C++ untuk ESP32. Diperiksa check:module-code terhadap header tiruan (sintaks dan tipe saja, bukan bukti perilaku papan).
// Pustaka servo untuk ESP32 biasanya terpisah dan namanya bisa berbeda [belum terverifikasi].
#include <ESP32Servo.h>

const int PIN_SERVO = 13;     // contoh; periksa papanmu
const int PIN_BUZZER = 18;    // contoh; periksa papanmu
const int PIN_TOMBOL = 15;    // contoh; periksa papanmu
const int SUDUT_TUTUP = 0;
const int SUDUT_BUKA = 90;    // sesuaikan dengan batas mekanik palangmu
const int GERAK_MS = 500;     // perkiraan; ukur dengan servomu

Servo servo;

int batasiSudut(int sudut) {
  if (sudut < SUDUT_TUTUP) {
    return SUDUT_TUTUP;
  }
  if (sudut > SUDUT_BUKA) {
    return SUDUT_BUKA;
  }
  return sudut;
}

void geser(int sudut) {
  servo.write(batasiSudut(sudut));
  delay(GERAK_MS);
}

void bunyi(int frekuensi, int lama_ms) {
  ledcWriteTone(PIN_BUZZER, frekuensi);
  delay(lama_ms);
  ledcWriteTone(PIN_BUZZER, 0);
}

void siklusPalang() {
  bunyi(1000, 200);
  geser(SUDUT_BUKA);
  delay(2000);
  bunyi(500, 200);
  geser(SUDUT_TUTUP);
}

void setup() {
  pinMode(PIN_TOMBOL, INPUT_PULLUP);
  ledcAttach(PIN_BUZZER, 2000, 8);
  servo.attach(PIN_SERVO);
  geser(SUDUT_TUTUP);
}

void loop() {
  if (digitalRead(PIN_TOMBOL) == LOW) {
    siklusPalang();
  }
}
```

Papan tiruan di bawah memakai fungsi yang sama dan mencetak linimasa satu siklus beserta uji `batasiSudut()` untuk nilai di bawah, di dalam, dan di atas rentang.

```cpp
// C++17 biasa, jalan di komputer. Diperiksa oleh check:module-code.
#include <iostream>

// Papan dan pustaka tiruan: mencetak apa yang akan dilakukan papan.
long waktu_ms = 0;
void delay(long ms) { waktu_ms += ms; }

struct Servo {
  void attach(int) {}
  void write(int sudut) {
    std::cout << waktu_ms << " ms: servo ke " << sudut << " derajat\n";
  }
};
bool ledcAttach(int, int, int) { return true; }
void ledcWriteTone(int, int frekuensi) {
  if (frekuensi > 0) {
    std::cout << waktu_ms << " ms: bunyi " << frekuensi << " Hz\n";
  } else {
    std::cout << waktu_ms << " ms: diam\n";
  }
}

// Program yang sama dengan versi Arduino.
const int PIN_SERVO = 13;
const int PIN_BUZZER = 18;
const int SUDUT_TUTUP = 0;
const int SUDUT_BUKA = 90;
const int GERAK_MS = 500;   // perkiraan; ukur dengan servomu

Servo servo;

int batasiSudut(int sudut) {
  if (sudut < SUDUT_TUTUP) {
    return SUDUT_TUTUP;
  }
  if (sudut > SUDUT_BUKA) {
    return SUDUT_BUKA;
  }
  return sudut;
}

void geser(int sudut) {
  servo.write(batasiSudut(sudut));
  delay(GERAK_MS);
}

void bunyi(int frekuensi, int lama_ms) {
  ledcWriteTone(PIN_BUZZER, frekuensi);
  delay(lama_ms);
  ledcWriteTone(PIN_BUZZER, 0);
}

void siklusPalang() {
  bunyi(1000, 200);
  geser(SUDUT_BUKA);
  delay(2000);
  bunyi(500, 200);
  geser(SUDUT_TUTUP);
}

void setup() {
  ledcAttach(PIN_BUZZER, 2000, 8);
  servo.attach(PIN_SERVO);
  geser(SUDUT_TUTUP);
}

int main() {
  setup();
  siklusPalang();
  std::cout << "uji batasiSudut: " << batasiSudut(-10) << " " << batasiSudut(45) << " " << batasiSudut(120) << "\n";
}
```

Keluarannya:

```text
0 ms: servo ke 0 derajat
500 ms: bunyi 1000 Hz
700 ms: diam
700 ms: servo ke 90 derajat
3200 ms: bunyi 500 Hz
3400 ms: diam
3400 ms: servo ke 0 derajat
uji batasiSudut: 0 45 90
```

Baca linimasanya: palang ditutup pada 0 ms dan program menunggu 500 ms. Nada 1000 Hz berbunyi 200 ms, palang dibuka pada 700 ms dan ditahan 2000 ms setelah geraknya selesai. Nada rendah 500 Hz menandai penutupan pada 3200 ms, dan palang kembali ke 0 pada 3400 ms. Uji `batasiSudut()` menjepit -10 dan 120 ke 0 dan 90, sedangkan 45 tidak berubah. Papan tiruan hanya membuktikan logika dan urutan; kecepatan servo dan nada buzzer sungguhan hanya terbukti dengan papan.

## Contoh setengah jadi

Sekarang sebagian diisi olehmu. Tujuannya: fungsi `bunyi` membunyikan nada pada frekuensi tertentu selama waktu tertentu, lalu mendiamkannya. Lengkapi bagian `____`.

```arduino setengah-jadi
// Arduino-C++ untuk ESP32. Lengkapi bagian ____.
void bunyi(int frekuensi, int lama_ms) {
  ledcWriteTone(PIN_BUZZER, ____);
  delay(____);
  ledcWriteTone(PIN_BUZZER, ____);
}
```

## Soal Parsons

Susun baris-baris di bawah (sudah diacak) menjadi `batasiSudut()` yang hanya menjepit batas atas.

```text
(a)   return sudut;
(b)   if (sudut > SUDUT_BUKA) {
(c) int batasiSudut(int sudut) {
(d)     return SUDUT_BUKA;
(e)   }
(f) }
```

## Latihan

1. `AI: boleh` **Pseudocode dulu.** Tulis pseudocode lalu programnya: bila tombol ditekan, palang membuka dengan bunyi pendek, bertahan 2 detik, lalu menutup dengan bunyi lebih rendah (keluaran minggu ini).
2. `AI: tanpa AI` **Telusuri.** Pada linimasa di atas, pada milidetik berapa `servo.write(90)` dipanggil dan pada milidetik berapa palang kembali ke 0? Berapa lama siklus sampai selesai bergerak, dengan `GERAK_MS` bernilai 500?
3. `AI: tanpa AI` **Tulis uji.** Tulis hasil yang diharapkan `batasiSudut(-1)`, `batasiSudut(0)`, `batasiSudut(90)`, dan `batasiSudut(91)` sebelum menjalankannya.
4. `AI: boleh` **Bila papan tersedia (opsional).** Mulai dari `SUDUT_BUKA` yang kecil, misalnya 30, lalu naikkan sedikit demi sedikit sampai palang cukup terbuka. Hentikan bila servo berdengung, dan jangan menyentuh lengan saat daya menyala.
5. *Opsional:* **catatan pemakaian AI.** Bila memakai AI generatif, jawab nomor 1 sendiri dulu, lalu minta penjelasan atau petunjuk bertahap, bukan program jadi. Catat alatnya, tujuanmu, garis besar perintahmu, bagian yang kamu pakai, dan cara memeriksanya (jalankan atau telusuri). Jangan menaruh data pribadi atau tugas bernilai pada perintah.

## Latihan bercampur

1. Sudut servo diatur dari potensiometer: `map(mentah, 40, 4050, 0, 90)`. Berapa sudut untuk pembacaan 2045 (bilangan bulat)?
2. Satu pembacaan potensiometer melonjak sesaat ke 4095 tanpa penyaring. Apa yang dilakukan palang, dan apa dua cara dari minggu lalu untuk mencegahnya?

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `c-x2-m7` (sekitar satu minggu lagi), `c-x2-m9` (sekitar tiga minggu lagi), dan `c-x2-m14` (sekitar delapan minggu lagi). Jawab sekarang lalu simpan.

1. Mengapa sudut servo dibatasi sebelum dikirim ke `write`?
2. Apa beda buzzer aktif dan buzzer pasif?
3. Sebut dua aturan keselamatan untuk bagian yang bergerak.

## Kesalahan umum

- **Mengira servo sampai ke sudut seketika.** `write` kembali segera; gerak lengan butuh waktu, jadi tunggu sebelum langkah berikutnya.
- **Memaksa sudut melewati batas mekanik.** Lengan terus didorong, berdengung, dan bisa rusak; batasi sudut di program.
- **Mengabaikan lembar guru untuk daya servo.** Daya servo tidak diambil sembarangan dari pin papan.
- **Mengira buzzer pasif bunyi hanya dengan `HIGH`.** Buzzer pasif perlu sinyal berfrekuensi; yang aktif cukup diberi daya.
- **Menukar frekuensi dengan durasi.** Frekuensi menentukan tinggi nada; durasi menentukan lamanya bunyi.
- **Menyentuh bagian bergerak saat daya menyala.** Cabut daya dulu.
- **Mengira `delay` panjang tidak masalah.** Selama `delay(2000)` palang tidak membaca tombol atau sensor; minggu depan kamu belajar menunggu tanpa membeku.

## Cek mandiri

- [ ] Saya dapat memberi servo sudut tujuan dan menjelaskan mengapa perlu menunggu geraknya.
- [ ] Saya membatasi sudut dengan fungsi yang bisa diuji.
- [ ] Saya dapat membedakan buzzer aktif dan pasif.
- [ ] Saya dapat membaca linimasa siklus palang.
- [ ] Saya tahu aturan keselamatan untuk bagian yang bergerak.

## Kunci dan petunjuk

**Ingat kembali.** 1: tiap fungsi dapat dicoba sendiri dengan masukan yang diketahui, sehingga galat lebih cepat ditemukan. 2: 2048 x 255 / 4095 = 127,5 menjadi 127. 3: lonjakan palsu hanya satu atau dua pembacaan lalu kembali; perubahan nyata bertahan beberapa pembacaan dan cocok dengan alat acuan.

**Prediksi dulu.** 1: 180 derajat (90 naik, 90 turun). 2: 4 detik (2 detik + 2 detik). 3: lengan berusaha melewati batas mekanik palang; motor terus mendorong sehingga dapat berdengung, panas, atau merusak gigi servo. Karena itu sudut dibatasi.

**Contoh setengah jadi.** Isian berurutan: `frekuensi`, `lama_ms`, `0`. Program lengkapnya dikompilasi penulis dengan `Arduino.h` tiruan tanpa peringatan.

**Soal Parsons.** Urutan benar: c, b, d, e, a, f.

**Latihan.** 1: pseudocode: BILA tombol ditekan: bunyikan nada tinggi singkat; geser palang ke buka dan tunggu geraknya; tunggu 2 detik; bunyikan nada rendah; geser palang ke tutup. 2: `servo.write(90)` dipanggil pada 700 ms; palang kembali ke 0 pada 3400 ms, dan siklus selesai bergerak pada 3900 ms (3400 + 500). 3: `batasiSudut(-1)` = 0; `batasiSudut(0)` = 0; `batasiSudut(90)` = 90; `batasiSudut(91)` = 90. 4: tidak ada kunci tunggal; jawaban yang baik menyebut sudut yang dipakai dan alasannya.

**Latihan bercampur.** 1: (2045 - 40) x 90 / 4010 = 2005 x 90 / 4010 = 45. 2: palang melompat ke sudut batas sesaat lalu kembali; cegah dengan rata-rata bergerak (`c-x2-m4`) atau menandai lonjakan (`c-x2-m3`).

**Ulang berjarak.** 1: agar lengan tidak didorong melewati batas mekanik palang. 2: buzzer aktif berbunyi dengan nada tetap bila diberi daya; buzzer pasif perlu sinyal berfrekuensi dan nadanya diatur frekuensi itu. 3: contoh: tidak menyentuh bagian bergerak saat daya menyala; cabut daya sebelum memasang atau mengubah; batasi sudut sesuai batas mekanik; jangan memutar lengan dengan tangan.

## Langkah berikutnya

Modul berikut: `c-x2-m7` (waktu tanpa `delay` dan mesin keadaan sederhana), yang membuat palang tetap tanggap saat menunggu. Modul terkait: `matkom-himpunan-relasi-fungsi` untuk gagasan fungsi dalam matematika. Pembacaan lanjut: dokumentasi pustaka servo dan LEDC.
