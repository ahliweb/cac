## Untuk siapa modul ini

Modul ini untuk murid kelas X jalur C (IoT dan robotika), minggu `C-X2-M2` silabus v1.3: sensor suhu dan kelembapan (F). Prasyarat: modul `c-x2-m1` (penelusuran galat). Kamu juga memakai tipe data dari `c-x1-m11`.

Modul ini berstatus DRAF: karangan penyusun, belum ditinjau pemilik, dan tidak dihitung memenuhi butir capaian pembelajaran mana pun. Keluaran minggu ini: program pembacaan sensor. Latihan silabusnya: menampilkan suhu ruang kelas.

Ada dua cara mengerjakan. **Dengan papan (F):** kelompok merakit sensor suhu dan kelembapan sesuai lembar guru dan membaca nilainya di monitor serial. **Tanpa papan:** kamu menelusuri program di kertas dan menjalankan "papan tiruan" di komputer yang memberi pembacaan karangan. Pustaka sensor di modul ini adalah **contoh karangan** untuk belajar pola; pustaka sungguhan untuk sensormu punya nama fungsi sendiri, jadi baca dokumentasinya `[belum terverifikasi]`.

## Keselamatan perangkat

- Daya hanya dari kabel USB. Tidak ada listrik jaringan (220 V) dan tidak ada baterai pada modul ini.
- Cabut kabel USB sebelum memasang atau melepas sensor. Sambungkan kaki daya, GND, dan data hanya sesuai lembar guru; tegangan kerja sensor dan batas tegangan pin papanmu `[belum terverifikasi]`, jadi jangan menebak.
- Tidak ada solder. Papan percobaan dan kabel jumper sudah cukup.
- Sensor di modul ini mengukur ruangan, bukan tubuh siapa pun, dan tidak ada kamera atau mikrofon.
- Papan atau komponen yang terasa panas, berbau, atau berasap: cabut kabel dan panggil guru.

## Ingat kembali

Jawab dari ingatan dulu, baru cek di kunci. Soal 1 dari `c-x1-m8`, soal 2 dari `c-x1-m13`, soal 3 dari `c-x2-m1`, soal 4 dari `c-x1-m11`.

1. Selama `delay(500)` berjalan, apakah papan dapat membaca tombol? Mengapa?
2. Mengapa nilai batas perlu diuji, bukan hanya nilai biasa?
3. Bila LED tidak menyala, apa satu uji yang memisahkan galat kode dari galat rangkaian?
4. Berapa hasil `7 / 2` dan `7.0 / 2` dalam C++, dan mengapa berbeda?

## Tujuan

Setelah modul ini kamu dapat:

- menjelaskan alur membaca sensor lewat pustaka: membuat objek, memulai, membaca, memeriksa kegagalan, memakai nilai;
- menyebut satuan hasil bacaan (derajat Celsius dan persen kelembapan relatif);
- mengubah satuan suhu dengan tipe data yang benar;
- menulis program pembacaan sensor yang mencetak nilai dan menangani kegagalan baca (keluaran minggu ini).

## Prediksi dulu

Baca program ini dan **tebak dulu, tulis jawabanmu, baru telusuri**. Sensor melaporkan suhu 30,0.

```arduino
// Arduino-C++ untuk ESP32. Diperiksa check:module-code terhadap header tiruan (sintaks dan tipe saja, bukan bukti perilaku papan).
#include <PustakaSensor.h>

SensorIklim sensor(4);

void setup() {
  Serial.begin(115200);
  sensor.mulai();
}

void loop() {
  float suhu = sensor.bacaSuhu();
  float f = suhu * (9 / 5) + 32;
  Serial.println(f, 1);
  delay(2000);
}
```

1. Berapa nilai `f` yang tercetak?
2. Berapa nilai `f` yang seharusnya, bila 30,0 derajat Celsius diubah ke Fahrenheit dengan rumus F = C x 9 / 5 + 32?
3. Berapa kali sensor dibaca dalam 10 detik bila waktu baca diabaikan?

## Contoh terselesaikan

Pustaka adalah kumpulan fungsi siap pakai. Kamu tidak menulis ulang cara papan "berbicara" dengan sensor; kamu membuat objek sensor, memanggil `mulai()` sekali di `setup()`, lalu meminta nilai dengan `bacaSuhu()` dan `bacaLembap()`. Pustaka hanya meminta data lewat kabel dari sensor; ia tidak "tahu" suhu ruangan dengan sendirinya. Hasilnya bertipe `float`: suhu dalam derajat Celsius dan kelembapan relatif dalam persen, yaitu perbandingan uap air di udara terhadap jumlah maksimum yang bisa dikandung udara pada suhu itu. Angka 60 persen bukan berarti 60 persen isi udara adalah air.

Sensor butuh jeda antar pembacaan; lamanya tertulis di lembar data sensormu (contoh di sini 2 detik `[belum terverifikasi]`), dan membaca terlalu sering menghasilkan nilai yang tidak bisa dipercaya. Bila pembacaan gagal, pustaka mengembalikan nilai khusus NaN ("bukan angka"). NaN tidak boleh dipakai seperti suhu: kamu memeriksanya dengan `isnan()` lebih dulu.

```arduino
// Arduino-C++ untuk ESP32. Diperiksa check:module-code terhadap header tiruan (sintaks dan tipe saja, bukan bukti perilaku papan).
// SensorIklim adalah pustaka contoh karangan; pustaka sungguhan punya nama sendiri.
#include <PustakaSensor.h>

const int PIN_SENSOR = 4;              // contoh; periksa papanmu
const unsigned long JEDA_MS = 2000;    // contoh; baca lembar data sensormu

SensorIklim sensor(PIN_SENSOR);

float keFahrenheit(float celsius) {
  return celsius * 9.0f / 5.0f + 32.0f;
}

void setup() {
  Serial.begin(115200);
  sensor.mulai();
}

void loop() {
  float suhu = sensor.bacaSuhu();
  float lembap = sensor.bacaLembap();
  if (isnan(suhu) || isnan(lembap)) {
    Serial.println("Gagal membaca sensor");
  } else {
    Serial.print("Suhu: ");
    Serial.print(suhu, 1);
    Serial.print(" C, lembap: ");
    Serial.print(lembap, 1);
    Serial.println(" %");
  }
  delay(JEDA_MS);
}
```

Papan tiruan di bawah memberi empat pembacaan karangan; yang ketiga gagal. Perhatikan konversi: `9.0f / 5.0f` adalah pembagian bilangan berkoma, sedangkan `9 / 5` pada bilangan bulat bernilai 1.

```cpp
// C++17 biasa, jalan di komputer. Diperiksa oleh check:module-code.
#include <cmath>
#include <iomanip>
#include <iostream>

// Pustaka sensor tiruan: empat putaran pembacaan, putaran ketiga gagal.
struct SensorIklim {
  int giliran = 0;
  void mulai() {}
  float bacaSuhu() {
    const float DATA[] = {28.5f, 28.7f, NAN, 28.6f};
    return DATA[giliran];
  }
  float bacaLembap() {
    const float DATA[] = {61.0f, 60.5f, NAN, 60.0f};
    return DATA[giliran];
  }
};

// Program yang sama dengan versi Arduino.
SensorIklim sensor;

float keFahrenheit(float celsius) {
  return celsius * 9.0f / 5.0f + 32.0f;
}

void setup() {
  sensor.mulai();
}

void loop() {
  float suhu = sensor.bacaSuhu();
  float lembap = sensor.bacaLembap();
  if (std::isnan(suhu) || std::isnan(lembap)) {
    std::cout << "Gagal membaca sensor\n";
    return;
  }
  std::cout << std::fixed << std::setprecision(1);
  std::cout << "Suhu: " << suhu << " C (" << keFahrenheit(suhu) << " F), lembap: " << lembap << " %\n";
}

int main() {
  setup();
  for (sensor.giliran = 0; sensor.giliran < 4; sensor.giliran++) loop();
}
```

Keluarannya:

```text
Suhu: 28.5 C (83.3 F), lembap: 61.0 %
Suhu: 28.7 C (83.7 F), lembap: 60.5 %
Gagal membaca sensor
Suhu: 28.6 C (83.5 F), lembap: 60.0 %
```

Putaran ketiga tidak mencetak angka karena salah satu nilainya NaN, dan syarat memakai `||`: cukup satu nilai gagal untuk menolak seluruh pembacaan. Hitungan baris pertama: 28,5 x 9 / 5 = 51,3; ditambah 32 menjadi 83,3.

## Contoh setengah jadi

Sekarang sebagian diisi olehmu. Tujuannya: fungsi `loop()` mencetak suhu dengan satu angka di belakang koma, dan menolak pembacaan gagal. Lengkapi bagian `____`; `sensor` dan `JEDA_MS` seperti pada contoh terselesaikan.

```arduino setengah-jadi
// Arduino-C++ untuk ESP32. Lengkapi bagian ____.
void loop() {
  float suhu = sensor.bacaSuhu();
  if (____(suhu)) {
    Serial.println("Gagal membaca sensor");
  } else {
    Serial.print(suhu, ____);
    Serial.println(" C");
  }
  delay(____);
}
```

## Soal Parsons

Susun baris-baris di bawah (sudah diacak) menjadi `loop()` yang berhenti lebih awal bila pembacaan gagal.

```text
(a)   return;
(b)   float suhu = sensor.bacaSuhu();
(c)   if (isnan(suhu)) {
(d) void loop() {
(e)   }
(f)   Serial.println(suhu, 1);
(g) }
```

## Latihan

1. `AI: boleh` **Pseudocode dulu.** Tulis pseudocode lalu programnya: baca suhu dan kelembapan tiap 2 detik, cetak "Suhu ruang: ... C", dan tambahkan kata "lembap" bila kelembapan lebih dari 70 persen (ambang contoh).
2. `AI: tanpa AI` **Hitung.** Ubah 25 derajat Celsius ke Fahrenheit. Lalu ubah 0 derajat Celsius ke Kelvin dengan K = C + 273,15.
3. `AI: tanpa AI` **Cari galat.** Pada program `float f = c * (9 / 5) + 32;` dengan `c` bernilai 30,0, berapa `f`, mengapa, dan bagaimana memperbaikinya?
4. `AI: boleh` **Bila papan tersedia (opsional).** Pilih bersama guru dua tempat di kelas. Catat pembacaan di kedua tempat dan selisihnya. Jangan menyentuh kabel saat daya menyala.
5. *Opsional:* **catatan pemakaian AI.** Bila memakai AI generatif, jawab nomor 1 sendiri dulu, lalu minta penjelasan atau petunjuk bertahap, bukan program jadi. Catat alatnya, tujuanmu, garis besar perintahmu, bagian yang kamu pakai, dan cara memeriksanya (jalankan atau telusuri). Jangan menaruh data pribadi atau tugas bernilai pada perintah.

## Latihan bercampur

1. Program menyimpan `int lembap = sensor.bacaLembap();` dan pembacaannya 60,5. Berapa yang tersimpan, dan kapan ini penting?
2. Monitor serial menampilkan teks acak atau kosong padahal program terunggah. Tulis dua dugaan di program dan dua dugaan di perangkat atau kabel, dan satu uji untuk masing-masing.
3. Tulis syarat: suhu antara 20 dan 30 derajat (termasuk batas) **dan** kelembapan kurang dari 70 persen.

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `c-x2-m3` (sekitar satu minggu lagi), `c-x2-m5` (sekitar tiga minggu lagi), dan `c-x2-m10` (sekitar delapan minggu lagi). Jawab sekarang lalu simpan.

1. Apa arti `isnan(suhu)` bernilai benar, dan mengapa nilai itu tidak boleh langsung dicetak sebagai suhu?
2. Mengapa `float f = c * (9 / 5) + 32;` memberi hasil salah walau `c` bertipe `float`?
3. Mengapa sensor perlu jeda antar pembacaan, dan dari mana kamu tahu lamanya?

## Kesalahan umum

- **Menganggap nilai sensor selalu benar.** Pembacaan bisa gagal; periksa NaN sebelum memakainya.
- **Memakai `9 / 5` pada bilangan bulat.** Hasilnya 1, bukan 1,8. Tulis `9.0f / 5.0f` atau kalikan lebih dulu.
- **Membaca sensor terlalu sering.** Ikuti jeda dari lembar data; `delay` yang terlalu pendek membuat nilai tidak dapat dipercaya.
- **Mencampur satuan.** Ambang yang ditulis dalam Celsius tidak boleh dibandingkan dengan nilai Fahrenheit.
- **Mengira kelembapan relatif 60 persen berarti 60 persen udara adalah air.** Itu perbandingan terhadap jumlah maksimum pada suhu yang sama.
- **Mengira pustaka mengetahui suhu dengan sendirinya.** Pustaka hanya meminta nilai dari sensor lewat kabel; bila kabel lepas, pustaka tidak punya nilai untuk diberikan.

## Cek mandiri

- [ ] Saya dapat menjelaskan alur membaca sensor lewat pustaka.
- [ ] Saya dapat menyebut satuan suhu dan kelembapan yang dibaca.
- [ ] Saya memeriksa kegagalan baca dengan `isnan()` sebelum memakai nilai.
- [ ] Saya mengubah Celsius ke Fahrenheit tanpa jebakan pembagian bilangan bulat.
- [ ] Saya tahu dari mana mencari jeda minimum antar pembacaan.

## Kunci dan petunjuk

**Ingat kembali.** 1: tidak; selama `delay` papan menunggu dan tidak menjalankan baris berikutnya, sehingga penekanan tombol dapat terlewat. 2: galat paling sering muncul di batas, seperti tepat di ambang. 3: muat program kedip yang sudah benar; bila LED kedip, galat ada di programmu. 4: 3 dan 3,5; pembagian dua `int` membuang sisa, sedangkan operand berkoma membuat hasil berkoma.

**Prediksi dulu.** 1: 62,0, karena `9 / 5` pada bilangan bulat bernilai 1 sehingga 30,0 x 1 + 32. 2: 30,0 x 9 / 5 + 32 = 54 + 32 = 86,0. 3: 5 kali (10 detik dibagi 2 detik).

**Contoh setengah jadi.** Isian berurutan: `isnan`, `1`, `JEDA_MS`. Program lengkapnya dikompilasi penulis dengan `Arduino.h` dan `PustakaSensor.h` tiruan tanpa peringatan.

**Soal Parsons.** Urutan benar: d, b, c, a, e, f, g.

**Latihan.** 1: pseudocode: ULANG TERUS: baca suhu dan lembap; BILA salah satunya tidak valid, cetak pesan gagal; JIKA TIDAK, cetak suhu, dan bila lembap > 70, tambah kata "lembap"; tunggu 2 detik. 2: 25 x 9 / 5 + 32 = 45 + 32 = 77 derajat Fahrenheit; 0 + 273,15 = 273,15 Kelvin. 3: `f` bernilai 62,0 karena 9 / 5 menjadi 1; perbaiki dengan `c * 9.0f / 5.0f + 32.0f`. 4: tidak ada kunci tunggal; jawaban yang baik mencatat dua angka dan selisih, serta menyebut mengapa tempatnya bisa berbeda.

**Latihan bercampur.** 1: tersimpan 60; bagian desimal dibuang. Penting bila selisih kecil menentukan keputusan, misalnya ambang 60,5. 2: dugaan program: lupa `Serial.begin`, atau kecepatan `Serial.begin` tidak sama dengan kecepatan monitor; dugaan perangkat: kabel USB hanya untuk mengisi daya tanpa jalur data (umum terjadi), atau monitor memilih port yang salah. Ujinya: muat program kedip sederhana, atau ganti kabel dan pilih ulang port. 3: `suhu >= 20 && suhu <= 30 && lembap < 70`.

**Ulang berjarak.** 1: artinya pembacaan gagal dan nilainya bukan angka; mencetaknya sebagai suhu menyesatkan, dan membandingkannya dengan ambang tidak bermakna. 2: karena `9 / 5` dihitung sebagai bilangan bulat lebih dulu dan bernilai 1. 3: sensor butuh waktu menyiapkan pembacaan; lamanya tertulis di lembar data sensor.

## Langkah berikutnya

Modul berikut: `c-x2-m3` (data berkualitas dari sensor), yang memeriksa rentang dan membuang data ganjil dari pembacaan seperti ini. Modul terkait: `fondasi-komputer-dan-hardware` untuk gagasan masukan dan keluaran. Pembacaan lanjut: lembar data sensormu dan dokumentasi pustakanya.
