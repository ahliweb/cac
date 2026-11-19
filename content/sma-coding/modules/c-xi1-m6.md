## Untuk siapa modul ini

Modul ini untuk murid kelas XI jalur C (IoT dan robotika), minggu `C-XI1-M6` silabus v1.3: kendali hidup-mati, yaitu merancang kendali hidup-mati pada kasus pemanas atau kipas simulasi (F). Prasyarat: modul `c-xi1-m5` (alternatif solusi I: ambang dan histeresis). Kamu juga memakai struktur data dari `c-xi1-m3`, kasus uji dari `c-xi1-m2`, dan pembacaan data dari `c-x2-m12`.

Modul ini berstatus DRAF: karangan penyusun, belum ditinjau pemilik. Ia mendukung butir `F-BK-b` (lebih dari satu solusi, strategi algoritmik, justifikasi efisiensi), `F-AP-a`, dan `F-AP-b`, dan tidak dihitung memenuhi butir capaian pembelajaran mana pun; pemetaan butir `F-BK-b` untuk jalur C bersifat parsial. Keluaran minggu ini: program kendali. Latihan silabusnya: termostat mini.

Ada dua cara mengerjakan. **Dengan papan (F):** kelompok merakit satu sensor suhu dan satu LED yang berperan sebagai "pemanas" sesuai lembar guru. **Tanpa papan:** kamu menjalankan "papan tiruan" di komputer yang mensimulasikan ruangan karangan. Model ruangan di modul ini **bukan fisika ruangan nyata**, hanya mainan dengan dua angka. Nomor pin, rumus suhu, dan angka lain pada contoh hanya contoh `[belum terverifikasi]` untuk papanmu.

## Keselamatan perangkat

- Daya hanya dari kabel USB. Tidak ada listrik jaringan (220 V) dan tidak ada baterai pada modul ini.
- "Pemanas" pada modul ini adalah **LED**. Elemen pemanas nyata, solder, pengering rambut, dan beban listrik jaringan tidak dipakai dan tidak disambung ke papan. Relai hanya bila disiapkan guru dan hanya untuk beban rendah.
- Cabut kabel USB sebelum memasang atau memindahkan sensor dan LED. Periksa polaritas LED dan pasang resistor sesuai lembar guru.
- Tidak ada solder. Papan percobaan dan kabel jumper sudah cukup.
- Modul ini tidak memakai kamera atau mikrofon, dan tidak mengukur tubuh siapa pun.
- Papan atau komponen yang terasa panas, berbau, atau berasap: cabut kabel dan panggil guru.

## Ingat kembali

Jawab dari ingatan dulu, baru cek di kunci. Soal 1 dari `c-x2-m12`, soal 2 dari `c-xi1-m5`, soal 3 dari `c-xi1-m3`.

1. Mengapa data sintetis boleh dipakai untuk menguji program pencatat sebelum data nyata?
2. Mengapa histeresis memakai dua batas yang berbeda, bukan satu?
3. Apa yang terjadi bila `Penyangga` dipakai tanpa memberi nilai awal pada `terisi`?

## Tujuan

Setelah modul ini kamu dapat:

- menjelaskan kendali hidup-mati: keluaran hanya punya dua keadaan, ditentukan dengan membandingkan ukuran dengan nilai acuan (setpoint);
- menulis kendali hidup-mati dengan histeresis dari nilai acuan dan lebar pita;
- menjalankan simulasi sederhana dan membaca ayunan suhu dan jumlah pergantian;
- memilih keadaan aman saat sensor gagal dibaca, dan menjelaskan alasannya;
- menulis program kendali (keluaran minggu ini).

## Prediksi dulu

Ruangan karangan: setiap langkah, bila pemanas menyala suhu naik 0,7; bila mati suhu turun 0,5. Nilai acuan 28,0 dan lebar pita 1,0, jadi pemanas menyala bila suhu di bawah 27,0 dan mati bila di atas 29,0, dan di antaranya tetap. Suhu awal 24,2 dan pemanas mati. **Tebak dulu, tulis jawabanmu, baru telusuri.**

1. Pada langkah ke berapa dan pada suhu berapa pemanas **pertama kali mati**? (Langkah pertama bernomor 0; keputusan diambil sebelum suhu berubah pada langkah itu.)
2. Setelah mati, pada langkah ke berapa pemanas **menyala lagi**, dan pada suhu berapa?
3. Apakah suhu pernah berhenti tepat di 28,0? Mengapa?

## Contoh terselesaikan

**Kendali hidup-mati** adalah bentuk kendali paling sederhana: bila ukuran di bawah nilai acuan, nyalakan; bila di atas, matikan. Termostat setrika, kulkas, dan kipas otomatis banyak memakainya. Tanpa pita, ia berkedip di sekitar nilai acuan seperti pada `c-xi1-m5`; maka dipakai **histeresis** dengan nilai acuan dan lebar pita. Akibatnya suhu tidak pernah **tepat** di nilai acuan: ia **berayun** di sekitarnya, naik saat pemanas menyala dan turun saat mati. Lebar ayunan bergantung pada lebar pita, kecepatan naik, dan kecepatan turun.

Pemanasan di komputer disimulasikan dengan fungsi `keputusanPemanas`, yang tidak menyentuh pin dan sama dengan fungsi histeresis sebelumnya, ditambah model ruangan yang hanya berisi dua angka. Program mencetak hanya saat pemanas berganti keadaan, lalu merangkum ayunan **setelah pemanasan awal** (yaitu setelah pemanas mati untuk pertama kali).

```cpp
// C++17 biasa, jalan di komputer. Diperiksa oleh check:module-code.
#include <iomanip>
#include <iostream>

const float SETPOINT = 28.0f;
const float PITA = 1.0f;
const float PANAS_PER_LANGKAH = 0.7f;    // model karangan, bukan fisika ruangan nyata
const float HILANG_PER_LANGKAH = 0.5f;
const int LANGKAH = 40;

bool keputusanPemanas(bool sebelumnya, float suhu) {
  if (suhu < SETPOINT - PITA) {
    return true;
  }
  if (suhu > SETPOINT + PITA) {
    return false;
  }
  return sebelumnya;
}

int main() {
  std::cout << std::fixed << std::setprecision(1);
  float suhu = 24.2f;
  bool pemanas = false;
  bool sudahMati = false;
  int ganti = 0;
  float terendah = 1000.0f;
  float tertinggi = -1000.0f;
  for (int t = 0; t < LANGKAH; t++) {
    bool baru = keputusanPemanas(pemanas, suhu);
    if (baru != pemanas) {
      ganti++;
      std::cout << "langkah " << t << ": suhu " << suhu << " -> pemanas "
                << (baru ? "NYALA" : "mati") << "\n";
      if (!baru) {
        sudahMati = true;
      }
    }
    pemanas = baru;
    suhu += pemanas ? PANAS_PER_LANGKAH : -HILANG_PER_LANGKAH;
    if (sudahMati) {
      if (suhu < terendah) {
        terendah = suhu;
      }
      if (suhu > tertinggi) {
        tertinggi = suhu;
      }
    }
  }
  std::cout << "pergantian: " << ganti << "\n";
  std::cout << "setelah pemanasan awal: terendah " << terendah << ", tertinggi " << tertinggi
            << "\n";
}
```

Keluarannya:

```text
langkah 0: suhu 24.2 -> pemanas NYALA
langkah 7: suhu 29.1 -> pemanas mati
langkah 12: suhu 26.6 -> pemanas NYALA
langkah 16: suhu 29.4 -> pemanas mati
langkah 21: suhu 26.9 -> pemanas NYALA
langkah 24: suhu 29.0 -> pemanas mati
langkah 29: suhu 26.5 -> pemanas NYALA
langkah 33: suhu 29.3 -> pemanas mati
langkah 38: suhu 26.8 -> pemanas NYALA
pergantian: 9
setelah pemanasan awal: terendah 26.5, tertinggi 29.4
```

Telusuri awalnya: dari 24,2 pemanas menyala dan suhu naik 0,7 per langkah hingga 29,1 pada langkah 7, yang di atas 29,0 sehingga pemanas mati. Lalu suhu turun 0,5 per langkah: 28,6; 28,1; 27,6; 27,1; 26,6 pada langkah 12, di bawah 27,0, sehingga pemanas menyala lagi. Suhu berayun antara kira-kira 26,5 dan 29,4, **melebihi pita 27 sampai 29**, karena keputusan baru berlaku satu langkah setelah batas dilewati (suhu "melampaui" sebelum pemanas bereaksi). Pada langkah 24 angka yang tercetak "29,0" adalah pembulatan nilai yang sedikit di atas 29,0; itu sebabnya batas diuji dengan nilai yang tidak jatuh persis di batas. Hasilnya hanya berlaku untuk model karangan ini.

Pada papan, LED yang berperan sebagai pemanas dikendalikan oleh keputusan yang sama. Sketsa di bawah menambahkan satu aturan **aman**: bila pembacaan sensor tidak valid, pemanas dimatikan, bukan dibiarkan seperti sebelumnya. Alasannya: pemanas yang menyala tanpa diawasi lebih berbahaya daripada pemanas yang mati. Sketsa ini hanya diperiksa sintaksnya terhadap header tiruan, tidak dijalankan pada papan.

```arduino
// Arduino-C++ untuk ESP32. Diperiksa check:module-code terhadap header tiruan (sintaks dan tipe saja, bukan bukti perilaku papan).
const int PIN_SUHU = 34;                 // contoh; periksa papanmu
const int PIN_PEMANAS = 2;               // LED sebagai "pemanas"; contoh
const float SETPOINT = 28.0f;            // ukur dan putuskan sendiri; ini contoh
const float PITA = 1.0f;
const float SUHU_MIN_VALID = 15.0f;
const float SUHU_MAKS_VALID = 45.0f;
const unsigned long SELANG_MS = 1000;

bool pemanas = false;
unsigned long mulai = 0;

float suhuDariMentah(int mentah) {
  return mentah * 50.0f / 4095.0f;       // rumus contoh, bukan rumus sensor nyata
}

bool suhuValid(float suhu) {
  return suhu >= SUHU_MIN_VALID && suhu <= SUHU_MAKS_VALID;
}

bool keputusanPemanas(bool sebelumnya, float suhu) {
  if (!suhuValid(suhu)) {
    return false;                        // keadaan aman: mati
  }
  if (suhu < SETPOINT - PITA) {
    return true;
  }
  if (suhu > SETPOINT + PITA) {
    return false;
  }
  return sebelumnya;
}

void setup() {
  pinMode(PIN_PEMANAS, OUTPUT);
  mulai = millis();
}

void loop() {
  if (millis() - mulai >= SELANG_MS) {
    mulai += SELANG_MS;
    float suhu = suhuDariMentah(analogRead(PIN_SUHU));
    pemanas = keputusanPemanas(pemanas, suhu);
    digitalWrite(PIN_PEMANAS, pemanas ? HIGH : LOW);
  }
}
```

## Contoh setengah jadi

Sekarang kipas pendingin yang menyala bila **panas**: nilai acuan 30,0 dan lebar pita 1,0 (menyala di atas 31,0, mati di bawah 29,0). Lengkapi bagian `____`.

```cpp setengah-jadi
// C++17. Lengkapi bagian ____.
const float SETPOINT = 30.0f;
const float PITA = 1.0f;

bool keputusanKipas(bool sebelumnya, float suhu) {
  if (suhu ____ SETPOINT + PITA) {
    return true;
  }
  if (suhu ____ SETPOINT - PITA) {
    return false;
  }
  return ____;
}
```

## Soal Parsons

Susun baris-baris di bawah (sudah diacak) menjadi `loop()` yang memperbarui pemanas tiap `SELANG_MS`.

```text
(a)     digitalWrite(PIN_PEMANAS, pemanas ? HIGH : LOW);
(b) void loop() {
(c)     pemanas = keputusanPemanas(pemanas, suhu);
(d)   }
(e)     float suhu = suhuDariMentah(analogRead(PIN_SUHU));
(f)   if (millis() - mulai >= SELANG_MS) {
(g)     mulai += SELANG_MS;
(h) }
```

## Latihan

1. `AI: boleh` **Pseudocode dulu.** Tulis pseudocode lalu program simulasi untuk kipas pada contoh setengah jadi: suhu awal 33,0; bila kipas menyala suhu turun 0,6 per langkah; bila mati suhu naik 0,4 per langkah; 40 langkah. Cetak setiap pergantian dan rangkuman ayunan (keluaran minggu ini: program kendali).
2. `AI: tanpa AI` **Aman atau tidak.** Pada `keputusanPemanas` versi Arduino, apa yang terjadi bila kabel sensor terlepas dan `analogRead` mengembalikan 0? Mengapa itu diperlakukan sebagai keadaan aman?
3. `AI: tanpa AI` **Pita dan ayunan.** Bila `PITA` diperkecil menjadi 0,2 pada model contoh, apa yang terjadi pada jumlah pergantian dan pada lebar ayunan? Jelaskan dengan akal sehat tanpa menjalankan program, lalu jalankan untuk memeriksa.
4. `AI: boleh` **Bila papan tersedia (opsional).** Rakit sensor suhu dan LED sesuai lembar guru. Hangatkan sensor dengan telapak tangan beberapa detik dan catat kapan LED berganti. Tanpa papan, kerjakan nomor 1 dengan angka modelmu sendiri. Jangan mengubah rangkaian saat daya menyala dan jangan memakai pemanas nyata.
5. *Opsional:* **catatan pemakaian AI.** Bila memakai AI generatif, jawab nomor 1 sendiri dulu, lalu minta petunjuk bertahap atau kritik atas programmu, bukan program jadi. Catat alatnya, tujuanmu, garis besar perintahmu, bagian yang kamu pakai, dan cara memeriksanya (jalankan dan telusuri). Jangan menaruh data pribadi atau tugas bernilai pada perintah.

## Latihan bercampur

1. Tulis empat kasus uji tepi (`c-xi1-m2`) untuk `keputusanPemanas` versi Arduino: dua di batas pita (dengan `sebelumnya` benar dan salah) dan dua dengan suhu tidak valid.
2. Pembacaan suhu dan keputusan pemanas dicatat satu baris per langkah (`c-x2-m12`). Tulis kepala berkas dan dua baris contoh, termasuk satu baris dengan pembacaan tidak valid.

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `c-xi1-m7` (sekitar satu minggu lagi), `c-xi1-m9` (sekitar tiga minggu lagi), dan `c-xi1-m14` (sekitar delapan minggu lagi). Jawab sekarang lalu simpan.

1. Pada termostat hidup-mati, mengapa suhu tidak pernah tepat di nilai acuan melainkan berayun?
2. Bila sensor suhu gagal dibaca, apakah pemanas sebaiknya tetap menyala atau dimatikan, dan mengapa?
3. Sebut dua ukuran untuk menilai kualitas kendali hidup-mati.

## Kesalahan umum

- **Mengira suhu akan berhenti tepat di nilai acuan.** Kendali hidup-mati selalu berayun; yang bisa diatur hanya lebarnya.
- **Memakai satu batas tanpa pita.** Pemanas berganti terus di sekitar nilai acuan, dan aktuator (relai, LED) cepat aus atau berkedip.
- **Menganggap pembacaan tidak valid sebagai suhu rendah.** Pembacaan 0 karena kabel lepas bukan suhu 0 derajat; perlakukan sebagai tidak valid dan pilih keadaan aman.
- **Menyamakan model karangan dengan ruangan nyata.** Angka naik dan turun per langkah hanyalah mainan; ruangan nyata punya inersia dan kebocoran yang berbeda.
- **Memakai beban nyata untuk mencoba.** Pada modul ini "pemanas" adalah LED; jangan menyambung elemen pemanas atau listrik jaringan ke papan.

## Cek mandiri

- [ ] Saya dapat menjelaskan kendali hidup-mati dengan nilai acuan dan pita.
- [ ] Saya dapat membaca ayunan dan jumlah pergantian dari keluaran simulasi.
- [ ] Saya menetapkan keadaan aman bila sensor tidak valid.
- [ ] Saya menguji batas pita dengan nilai di kedua sisinya.
- [ ] Saya tidak menyambung beban listrik nyata pada papan.

## Kunci dan petunjuk

**Ingat kembali.** 1: karena jawabannya kamu ketahui lebih dulu, sehingga kesalahan program tampak jelas tanpa bergantung pada sensor dan tanpa data pribadi. 2: karena satu batas membuat keputusan berganti bolak-balik saat masukan berderau di sekitarnya; dua batas membuatnya berganti hanya setelah masukan melewati pita. 3: `terisi` berisi sampah, sehingga `tambah` dapat menulis ke luar larik atau menganggap penyangga penuh.

**Prediksi dulu.** 1: langkah 7 pada suhu 29,1 (24,2 ditambah 0,7 sebanyak tujuh kali). 2: langkah 12 pada suhu 26,6 (29,1 dikurangi 0,5 sebanyak lima kali). 3: tidak; suhu bergerak 0,7 naik atau 0,5 turun per langkah dan keputusan hanya berganti di luar pita 27 sampai 29, sehingga suhu terus berayun.

**Contoh setengah jadi.** Isian berurutan: `>`, `<`, `sebelumnya`. Fungsi lengkapnya dikompilasi dan dijalankan penulis tanpa peringatan.

**Soal Parsons.** Urutan benar: b, f, g, e, c, a, d, h.

**Latihan.** 1: pseudocode: suhu = 33,0; kipas mati; ulangi 40 langkah: putuskan kipas dari suhu dan keadaan sebelumnya; bila berganti cetak; suhu turun 0,6 bila menyala atau naik 0,4 bila mati; catat terendah dan tertinggi setelah kipas mati pertama kali. Tidak ada kunci angka tunggal; pada penulis, kipas menyala pada langkah 0, mati pada langkah 7 (suhu 28,8), lalu berganti 8 kali seluruhnya, dengan ayunan setelah mati pertama kali antara 28,8 dan 31,2. 2: pembacaan 0 menghasilkan suhu 0 yang di luar 15 sampai 45, sehingga tidak valid dan pemanas dimatikan; ini aman karena pemanas yang menyala tanpa pengawasan lebih berbahaya daripada yang mati. 3: pita yang lebih sempit membuat pergantian lebih sering dan ayunan lebih sempit, tetapi tidak nol karena keputusan tertunda satu langkah; pada penulis, 18 pergantian (lawan 9) dan ayunan 27,3 sampai 28,8 (lawan 26,5 sampai 29,4) dalam 40 langkah. 4: tidak ada kunci tunggal; jawaban yang baik menyebut kapan LED berganti dan hubungannya dengan batas pita.

**Latihan bercampur.** 1: contoh: (`sebelumnya` salah, 26,9) menjadi benar; (benar, 27,0) tetap benar; (benar, 29,1) menjadi salah; (benar, 0,0) menjadi salah (tidak valid); nilai lain di sekitar batas diterima bila sesuai penelusuranmu. 2: contoh: `# suhu dan pemanas, data karangan`, `# satuan: langkah, suhu derajat Celsius, pemanas 1 menyala 0 mati`, `langkah,suhu_c,pemanas`, lalu `0,24.2,1` dan `1,,0` (suhu kosong karena tidak valid, pemanas mati).

**Ulang berjarak.** 1: karena keputusan hanya berganti bila suhu melewati batas pita, dan sesudah berganti suhu bergerak ke arah sebaliknya; ia melewati nilai acuan bolak-balik. 2: dimatikan, karena pembacaan yang gagal berarti tidak ada informasi dan pemanas menyala tanpa pengawasan berisiko. 3: contoh: lebar ayunan dan jumlah pergantian per satuan waktu (juga boleh: lambatnya mencapai nilai acuan).

## Langkah berikutnya

Modul berikut: `c-xi1-m7` (alternatif solusi II: kendali proporsional), yang membandingkan kendali hidup-mati dengan kendali proporsional. Modul terkait: `pendamping-keamanan-lanjut-konektivitas` untuk gagasan perangkat yang aman. Pembacaan lanjut: dokumentasi `digitalWrite()` untuk memahami keluaran digital.

## Rujukan

- Arduino, rujukan bahasa: `digitalWrite()`. <https://docs.arduino.cc/language-reference/en/functions/digital-io/digitalwrite/>
- Arduino, rujukan bahasa: `analogRead()`. <https://docs.arduino.cc/language-reference/en/functions/analog-io/analogRead/>
- Arduino, rujukan bahasa: `millis()`. <https://docs.arduino.cc/language-reference/en/functions/time/millis/>
