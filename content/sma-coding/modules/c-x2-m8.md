## Untuk siapa modul ini

Modul ini untuk murid kelas X jalur C (IoT dan robotika), minggu `C-X2-M8` silabus v1.3: menampilkan data (F). Prasyarat: modul `c-x1-m12` (fungsi dan larik) dan keluaran serial dari `c-x1-m10`. Kamu juga memakai `millis()` dari `c-x2-m7` (waktu tanpa `delay`), pembacaan analog dari `c-x1-m11`, dan `map()` dari `c-x2-m5`.

Modul ini berstatus DRAF: karangan penyusun, belum ditinjau pemilik, dan tidak dihitung memenuhi butir capaian pembelajaran mana pun. Keluaran minggu ini: program tampilan. Latihan silabusnya: grafik suhu di plotter serial.

Ada dua cara mengerjakan. **Dengan papan (F):** kelompok membuka plotter serial di komputer dan menggambar pembacaan sensor suhu dari lembar guru. **Tanpa papan:** kamu menelusuri program di kertas dan menjalankan "papan tiruan" yang menggambar grafik dari huruf `#` di layar komputer. Nomor pin pada contoh hanya contoh `[belum terverifikasi]` untuk papanmu. Layar kecil (modul tampilan yang disambung ke papan) bergantung pada pustaka dan lembar guru; modul ini hanya memakai monitor dan plotter serial.

## Keselamatan perangkat

- Daya hanya dari kabel USB. Tidak ada listrik jaringan (220 V) dan tidak ada baterai pada modul ini.
- Cabut kabel USB sebelum memasang atau mengubah sensor. Sensor dan sambungannya hanya yang disiapkan guru.
- Tidak ada solder. Papan percobaan dan kabel jumper sudah cukup.
- Modul ini tidak memakai kamera atau mikrofon, dan tidak mengukur tubuh siapa pun.
- Papan atau komponen yang terasa panas, berbau, atau berasap: cabut kabel dan panggil guru.

## Ingat kembali

Jawab dari ingatan dulu, baru cek di kunci. Soal 1 dari `c-x2-m7`, soal 2 dari `c-x2-m5`, soal 3 dari `c-x1-m10`.

1. Tulis syarat `millis()` yang benar untuk "sudah lewat 500 ms sejak `mulai`".
2. Apa arti duty 50 persen pada PWM, dan mengapa LED tampak redup, bukan berkedip?
3. Apa yang kamu lihat di monitor serial bila kecepatannya (baud) berbeda dari yang ada di `Serial.begin`?

## Tujuan

Setelah modul ini kamu dapat:

- mengirim satu baris data berformat tetap ke plotter serial dan membacanya sebagai grafik;
- menampilkan dua deret nilai sekaligus, misalnya suhu dan ambangnya;
- menghitung panjang batang grafik teks dengan bilangan bulat dan membatasi nilai di luar rentang;
- menjelaskan mengapa skala sumbu dapat membuat grafik tampak melonjak atau datar;
- menulis program tampilan (keluaran minggu ini).

## Prediksi dulu

Grafik teks menggambar satu batang `#` untuk tiap nilai. Panjangnya dihitung `(nilai - minimum) * lebar / (maksimum - minimum)` dengan bilangan bulat (hasil dibulatkan ke bawah). **Tebak dulu, tulis jawabanmu, baru telusuri.** Rentang 0 sampai 50, lebar 10 `#`.

1. Berapa `#` untuk nilai 10, 35, dan 50?
2. Berapa `#` untuk nilai 4? Mengapa tidak ada `#` sama sekali walau nilainya bukan nol?
3. Apa yang terjadi bila nilainya 60?

## Contoh terselesaikan

Monitor serial menampilkan teks. **Plotter serial** menggambar angka sebagai garis terhadap waktu: papan hanya mengirim satu baris per titik, dan komputer menggambarnya. Arduino IDE 2 menyediakan plotter semacam itu; halaman tutorialnya dimuat lewat JavaScript sehingga penyusun tidak membaca isinya, jadi periksa sendiri format yang diterima versimu `[belum terverifikasi]`. Pola yang lazim: tiap deret diberi nama dan titik dua, dipisah koma, satu baris per pembacaan, tanpa kalimat lain, misalnya `suhu:25.3,ambang:30.0`. Menyelipkan kalimat seperti "Suhu sekarang" ke baris itu membuat plotter kehilangan angkanya.

Pembacaan dikirim tiap 200 ms, tetapi tanpa `delay()`: seperti di `c-x2-m7`, program mencatat kapan terakhir mencetak dan mengecek selisih waktunya di tiap putaran. Fungsi `suhuDariMentah` memakai rumus contoh; sensormu punya rumus dari lembar datanya sendiri `[belum terverifikasi]`.

```arduino
// Arduino-C++ untuk ESP32. Diperiksa check:module-code terhadap header tiruan (sintaks dan tipe saja, bukan bukti perilaku papan).
const int PIN_SENSOR = 34;               // contoh; periksa papanmu
const unsigned long SELANG_MS = 200;
const float AMBANG = 30.0f;              // ukur sendiri; ini contoh

unsigned long mulai = 0;

float suhuDariMentah(int mentah) {
  return mentah * 50.0f / 4095.0f;       // rumus contoh, bukan rumus sensor nyata
}

void cetakPlotter(float suhu, float ambang) {
  Serial.print("suhu:");
  Serial.print(suhu, 1);
  Serial.print(",ambang:");
  Serial.print(ambang, 1);
  Serial.println();
}

void setup() {
  Serial.begin(115200);
  mulai = millis();
}

void loop() {
  if (millis() - mulai >= SELANG_MS) {
    mulai = millis();
    cetakPlotter(suhuDariMentah(analogRead(PIN_SENSOR)), AMBANG);
  }
}
```

Tanpa papan, fungsi `cetakPlotter` yang sama dijalankan di komputer, bersama grafik teks `panjangBatang`. Fungsi itu memetakan nilai ke lebar batang seperti `map()`: `(nilai - minimum) * lebar / (maksimum - minimum)`, dengan perkalian lebih dulu supaya pembagian bilangan bulat tidak membuang hasil.

```cpp
// C++17 biasa, jalan di komputer. Diperiksa oleh check:module-code.
#include <iomanip>
#include <iostream>
#include <string>

// Papan tiruan: Serial mencetak ke layar komputer.
struct SerialTiruan {
  void print(const std::string& teks) { std::cout << teks; }
  void print(float nilai, int digit) { std::cout << std::fixed << std::setprecision(digit) << nilai; }
  void println(const std::string& teks) { std::cout << teks << "\n"; }
};
SerialTiruan Serial;

// Program yang sama dengan versi Arduino.
void cetakPlotter(float suhu, float ambang) {
  Serial.print("suhu:");
  Serial.print(suhu, 1);
  Serial.print(",ambang:");
  Serial.print(ambang, 1);
  Serial.println("");
}

// Grafik teks: banyak '#' sebanding dengan nilai pada rentang minimum sampai maksimum.
int panjangBatang(int nilai, int minimum, int maksimum, int lebar) {
  return (nilai - minimum) * lebar / (maksimum - minimum);
}

int main() {
  cetakPlotter(25.3f, 30.0f);
  cetakPlotter(25.7f, 30.0f);
  const int SUHU[] = {10, 25, 30, 40};
  for (int s : SUHU) {
    std::cout << std::setw(2) << s << " | " << std::string(panjangBatang(s, 0, 40, 20), '#') << "\n";
  }
}
```

Keluarannya:

```text
suhu:25.3,ambang:30.0
suhu:25.7,ambang:30.0
10 | #####
25 | ############
30 | ###############
40 | ####################
```

Perhatikan 25: 25 x 20 / 40 = 12,5 dan hasilnya 12 karena pembagian bilangan bulat membuang pecahan. Grafik teks ini kasar, tetapi cukup untuk melihat bentuk data.

Ada satu hal lagi: **skala**. Plotter biasanya menyesuaikan sumbu dengan datanya, sehingga perubahan 0,4 derajat tampak seperti lonjakan besar. Banyak orang menambah dua deret konstan sebagai batas sumbu, misalnya `rendah:0,tinggi:50`; periksa apakah plotter versimu bereaksi begitu `[belum terverifikasi]`. Grafik yang jujur menyebut rentang sumbunya.

## Contoh setengah jadi

Sekarang sebagian diisi olehmu. Fungsi ini mengirim baris plotter dengan dua nama deret: `suhu` dan `ambang`. Lengkapi bagian `____`.

```arduino setengah-jadi
// Arduino-C++ untuk ESP32. Lengkapi bagian ____.
void cetakPlotter(float suhu, float ambang) {
  Serial.print("____:");
  Serial.print(suhu, 1);
  Serial.print(",____:");
  Serial.print(ambang, 1);
  Serial.println();
}
```

## Soal Parsons

Susun baris-baris di bawah (sudah diacak) menjadi `loop()` yang mencetak satu titik tiap `SELANG_MS`.

```text
(a)     mulai = millis();
(b) }
(c) void loop() {
(d)   }
(e)     cetakPlotter(suhuDariMentah(analogRead(PIN_SENSOR)), AMBANG);
(f)   if (millis() - mulai >= SELANG_MS) {
```

## Latihan

1. `AI: boleh` **Pseudocode dulu.** Tulis pseudocode lalu programnya: kirim ke plotter suhu dan ambangnya tiap 500 ms tanpa `delay()` (keluaran minggu ini).
2. `AI: tanpa AI` **Hitung.** Berapa `panjangBatang(20, 0, 50, 25)` dan `panjangBatang(7, 0, 50, 25)` dengan bilangan bulat?
3. `AI: tanpa AI` **Cari galat.** Dengan rentang 0 sampai 40 dan lebar 20, `panjangBatang(50, 0, 40, 20)` memberi 25 dan `panjangBatang(-5, 0, 40, 20)` memberi -2. Apa akibatnya pada batang, dan perbaikan apa yang mencegahnya?
4. `AI: boleh` **Bila papan tersedia (opsional).** Catat 20 pembacaan suhu, lalu bandingkan bentuk grafiknya dengan dan tanpa batas sumbu tetap. Mana yang lebih menyesatkan, dan mengapa? Jangan mengubah rangkaian saat daya menyala.
5. *Opsional:* **catatan pemakaian AI.** Bila memakai AI generatif, jawab nomor 1 sendiri dulu, lalu minta penjelasan atau petunjuk bertahap, bukan program jadi. Catat alatnya, tujuanmu, garis besar perintahmu, bagian yang kamu pakai, dan cara memeriksanya (jalankan atau telusuri). Jangan menaruh data pribadi atau tugas bernilai pada perintah.

## Latihan bercampur

1. Tiga pembacaan suhu: 24,0; 24,6; 25,2. Berapa rata-rata bergerak tiganya, dan mengapa menghaluskan sebelum menggambar membuat grafik lebih mudah dibaca?
2. Berapa `map(2048, 0, 4095, 0, 255)` dengan aturan bilangan bulat, dan apa hubungannya dengan `panjangBatang`?

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `c-x2-m9` (sekitar satu minggu lagi), `c-x2-m11` (sekitar tiga minggu lagi), dan modul kedua kelas XI jalur C (sekitar delapan minggu lagi). Jawab sekarang lalu simpan.

1. Mengapa grafik di plotter bisa tampak melonjak padahal suhunya hanya berubah 0,4 derajat?
2. Hitung `panjangBatang(30, 0, 40, 20)` dengan bilangan bulat.
3. Mengapa menaruh pencetakan di fungsi tersendiri, bukan di tengah logika, memudahkan pengujian?

## Kesalahan umum

- **Menyelipkan kalimat ke baris plotter.** Plotter membutuhkan nama deret dan angka; kalimat tambahan membuat angkanya tidak terbaca.
- **Mencetak dengan `delay()` di dalam `loop()`.** Papan tidak tanggap selama menunggu; pakai `millis()` seperti di `c-x2-m7`.
- **Mengira grafik yang landai berarti data stabil.** Skala sumbu yang terlalu lebar menyembunyikan perubahan, dan yang terlalu sempit melebih-lebihkannya.
- **Membagi dulu, mengalikan kemudian pada bilangan bulat.** `(nilai - minimum) / (maksimum - minimum) * lebar` hampir selalu 0; kalikan dulu.
- **Tidak membatasi nilai di luar rentang.** Nilai di bawah minimum membuat panjang batang negatif; nilai di atas maksimum membuat batang melewati lebar.

## Cek mandiri

- [ ] Saya dapat menulis satu baris plotter dengan dua deret bernama.
- [ ] Saya mencetak tiap selang waktu tanpa `delay()`.
- [ ] Saya dapat menghitung panjang batang dengan bilangan bulat.
- [ ] Saya membatasi nilai di luar rentang sebelum menghitung.
- [ ] Saya dapat menjelaskan bagaimana skala sumbu memengaruhi kesan grafik.

## Kunci dan petunjuk

**Ingat kembali.** 1: `millis() - mulai >= 500`. 2: LED hidup separuh waktu dan mati separuh waktu, bergantian jauh lebih cepat daripada yang bisa diikuti mata, sehingga tampak redup. 3: layar kosong atau berisi huruf acak.

**Prediksi dulu.** 1: 10 x 10 / 50 = 2; 35 x 10 / 50 = 7; 50 x 10 / 50 = 10. 2: 4 x 10 / 50 = 0,8 menjadi 0, karena pembagian bilangan bulat membuang pecahan. 3: 60 x 10 / 50 = 12, melewati lebar 10.

**Contoh setengah jadi.** Isian berurutan: `suhu`, `ambang`. Program lengkapnya dikompilasi penulis dengan `Arduino.h` tiruan tanpa peringatan.

**Soal Parsons.** Urutan benar: c, f, a, e, d, b.

**Latihan.** 1: pseudocode: ULANG TERUS: BILA waktu sejak cetak terakhir sudah 500 ms atau lebih: catat waktu sekarang; baca sensor; ubah ke suhu; cetak suhu dan ambang. Syaratnya `millis() - mulai >= 500`. 2: 20 x 25 / 50 = 10; 7 x 25 / 50 = 3,5 menjadi 3. 3: batang lebih panjang dari lebar, dan panjang negatif tidak bermakna sehingga program bisa gagal atau tidak menggambar apa pun. Perbaikan: batasi nilainya lebih dulu dengan `constrain(nilai, minimum, maksimum)`. 4: tidak ada kunci tunggal; jawaban yang baik menyebut bahwa sumbu yang disesuaikan otomatis memperbesar perubahan kecil dan karena itu perlu menyebut rentang sumbunya.

**Latihan bercampur.** 1: (24,0 + 24,6 + 25,2) / 3 = 24,6; getaran kecil pada pembacaan tidak mengacaukan bentuk garis. 2: 2048 x 255 / 4095 = 127,5 menjadi 127; keduanya memetakan satu rentang ke rentang lain dengan perkalian lebih dulu.

**Ulang berjarak.** 1: plotter menyesuaikan sumbunya dengan data, sehingga selisih kecil memenuhi tinggi grafik. 2: 30 x 20 / 40 = 15. 3: fungsi yang hanya mencetak dapat diperiksa tanpa sensor, dan logika tidak tercampur dengan keluaran.

## Langkah berikutnya

Modul berikut: `c-x2-m9` (tumpukan dan antrian sebagai penyangga), yang menyimpan pembacaan sebelum ditampilkan atau diproses. Modul terkait: `fondasi-representasi-data` untuk gagasan tentang cara data disajikan. Pembacaan lanjut: dokumentasi `Serial.println()` di Arduino.

## Rujukan

- Arduino, rujukan bahasa: `Serial.print()` dan `Serial.println()`. <https://docs.arduino.cc/language-reference/en/functions/communication/serial/print/>, <https://docs.arduino.cc/language-reference/en/functions/communication/serial/println/>
- Arduino, rujukan bahasa: `millis()`. <https://docs.arduino.cc/language-reference/en/functions/time/millis/>
- Arduino, tutorial Serial Plotter di Arduino IDE 2 (halaman dimuat lewat JavaScript; isinya tidak dibaca penyusun). Dibuka 2026-11-19 (status 200). <https://docs.arduino.cc/software/ide-v2/tutorials/ide-v2-serial-plotter/>
