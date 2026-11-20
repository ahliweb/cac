## Untuk siapa modul ini

Modul ini untuk murid kelas X yang mengambil jalur C (IoT dan robotika). Ia mendampingi minggu `C-X1-M8` silabus v1.3: mikrokontroler, papan, dan program pertama, dengan keluaran digital. Prasyarat: `FND-X1-M1` (model Input-Proses-Output, modul `fondasi-komputer-dan-hardware`) dan `FND-X1-M3` (biner, modul `fondasi-representasi-data`). Tidak perlu pernah memprogram.

Modul ini karangan penyusun dan disetujui pemilik program pada 2026-11-20 (keputusan lewat dialog; catatan tinjauan menjadi tindak lanjut revisi), dan tidak dihitung sebagai pemenuhan butir capaian pembelajaran. Ia mendukung butir `E-BK-d` (solusi program sederhana dalam format pseudocode) dan, pada bagian model I-P-O saja, butir `E-BK-e` (peran sistem operasi tidak dibahas di sini).

Ada dua cara mengerjakan. **Dengan papan (F):** kamu mengunggah program ke papan ESP32 bersama kelompokmu. **Tanpa papan:** kamu menelusuri program di kertas dan menjalankan "papan tiruan" di komputer. Semua bagian pokok bisa dikerjakan tanpa papan. Nomor pin dan perilaku papan tertentu pada modul ini `[belum terverifikasi]`: periksa lembar papanmu dan tanya guru.

## Keselamatan perangkat

- Papan hanya memakai daya dari kabel USB. Tidak ada listrik jaringan (220 V) dan tidak ada baterai pada modul ini.
- Hari ini kamu hanya memakai LED bawaan papan. Kamu tidak merakit rangkaian apa pun.
- Cabut kabel USB sebelum mengubah apa pun pada rangkaian, dan baca daftar periksa keselamatan lab yang dipajang guru.
- Daftar periksa keselamatan lab dibaca bersama guru pada minggu ini, sebelum kamu menyentuh papan.
- Papan yang terasa panas, berbau, atau berasap: cabut kabel dan panggil guru.

## Ingat kembali

Jawab dari ingatan dulu, baru cek di modul fondasi. Karena ini minggu pertama jalur, soalnya diambil dari modul fondasi (`fondasi-komputer-dan-hardware`, `fondasi-representasi-data`).

1. Sebutkan tiga bagian siklus Input-Proses-Output dan beri satu contoh perangkat.
2. Apa beda memori (RAM) dan penyimpanan?
3. Berapa nilai yang dapat disimpan satu bit? Berapa nilai berbeda yang dapat disimpan satu byte?
4. Tulis 10101010 (biner) dalam heksadesimal.

## Tujuan

Setelah modul ini kamu dapat:

- menjelaskan sensor, mikrokontroler, dan aktuator sebagai Masukan, Proses, dan Keluaran;
- membaca kerangka program `setup()` dan `loop()` serta menyebut tugas tiap bagian;
- memakai `pinMode`, `digitalWrite`, dan `delay` dengan nilai dalam variabel;
- menulis pseudocode lebih dulu, lalu programnya.

## Prediksi dulu

Baca program ini dan **tebak dulu, tulis jawabanmu, baru jalankan atau telusuri**.

```arduino
// Arduino-C++ untuk ESP32. Diperiksa check:module-code terhadap header tiruan (sintaks dan tipe saja, bukan bukti perilaku papan).
const int PIN_LED = 2;      // nomor pin LED bawaan; periksa papanmu
const int JEDA_MS = 500;    // lama jeda dalam milidetik

void setup() {
  pinMode(PIN_LED, OUTPUT);
}

void loop() {
  digitalWrite(PIN_LED, HIGH);
  delay(JEDA_MS);
  digitalWrite(PIN_LED, LOW);
  delay(JEDA_MS);
}
```

1. Berapa detik LED menyala setiap kali?
2. Berapa kali LED menyala dalam 10 detik?
3. Bagian mana yang dijalankan sekali, bagian mana yang diulang terus?
4. Apa yang berubah bila `JEDA_MS` menjadi 250?

Simpan tebakanmu. Perbandingannya ada di bagian berikutnya.

## Contoh terselesaikan

Papan ESP32 adalah mikrokontroler: komputer kecil dengan prosesor, memori, dan pin untuk menyambung ke benda lain. Dalam kerangka I-P-O:

| Masukan | Proses | Keluaran |
| --- | --- | --- |
| (belum ada; hari ini tanpa sensor) | program `loop()` menghitung waktu | LED (aktuator) menyala atau padam |

Pelacakan program di atas:

- `setup()` jalan **sekali** saat papan menyala: `pinMode` menyatakan pin 2 dipakai untuk keluaran.
- `loop()` jalan **berulang tanpa henti**. `digitalWrite(..., HIGH)` memberi tegangan pada pin sehingga LED menyala. `delay(500)` membuat papan menunggu 500 ms. Lalu `LOW` memadamkan LED, dan menunggu lagi 500 ms.
- Satu putaran `loop()` memakan 500 + 500 = 1000 ms. Jadi LED menyala 0,5 detik tiap putaran, 10 kali dalam 10 detik.

Program berikut adalah **papan tiruan** yang berjalan di komputer: ia memakai `setup()` dan `loop()` yang sama, tetapi `digitalWrite` hanya mencetak apa yang akan dilakukan papan. Ia membantumu menelusuri tanpa papan.

```cpp
// C++17 biasa, jalan di komputer. Diperiksa oleh check:module-code.
#include <iostream>

// Papan tiruan: pengganti fungsi Arduino.
const int OUTPUT = 1;
const int HIGH = 1;
const int LOW = 0;
long waktu_ms = 0;

void pinMode(int pin, int mode) {
  std::cout << "pinMode(" << pin << ", " << mode << ")\n";
}
void digitalWrite(int pin, int nilai) {
  std::cout << waktu_ms << " ms: pin " << pin << (nilai == HIGH ? " HIGH" : " LOW") << "\n";
}
void delay(long ms) { waktu_ms += ms; }

// Program yang sama dengan di atas.
const int PIN_LED = 2;
const int JEDA_MS = 500;

void setup() { pinMode(PIN_LED, OUTPUT); }

void loop() {
  digitalWrite(PIN_LED, HIGH);
  delay(JEDA_MS);
  digitalWrite(PIN_LED, LOW);
  delay(JEDA_MS);
}

int main() {
  setup();
  for (int i = 0; i < 3; i++) loop();  // papan sungguhan mengulang tanpa henti
}
```

Keluarannya:

```text
pinMode(2, 1)
0 ms: pin 2 HIGH
500 ms: pin 2 LOW
1000 ms: pin 2 HIGH
1500 ms: pin 2 LOW
2000 ms: pin 2 HIGH
2500 ms: pin 2 LOW
```

Cocokkan dengan tebakanmu. Bila ada yang meleset, cari baris yang kamu salah baca.

## Contoh setengah jadi

Sekarang sebagian diisi olehmu. Tujuannya: LED berkedip **dua kali cepat** (masing-masing 100 ms) lalu jeda 1 detik. Lengkapi bagian `____`.

```arduino setengah-jadi
// Arduino-C++ untuk ESP32. Diperiksa check:module-code terhadap header tiruan (sintaks dan tipe saja, bukan bukti perilaku papan).
const int PIN_LED = 2;
const int KEDIP_MS = 100;
const int JEDA_PANJANG_MS = ____;

void setup() {
  pinMode(PIN_LED, OUTPUT);
}

void loop() {
  digitalWrite(PIN_LED, HIGH);
  delay(KEDIP_MS);
  digitalWrite(PIN_LED, ____);
  delay(KEDIP_MS);
  // kedipan kedua: tulis sendiri empat baris
  ____
  delay(JEDA_PANJANG_MS);
}
```

## Soal Parsons

Susun baris-baris di bawah (sudah diacak) menjadi program yang sama dengan contoh terselesaikan.

```text
(a)   delay(JEDA_MS);
(b) void loop() {
(c)   digitalWrite(PIN_LED, LOW);
(d) }
(e) void setup() {
(f)   pinMode(PIN_LED, OUTPUT);
(g)   digitalWrite(PIN_LED, HIGH);
(h)   delay(JEDA_MS);
(i) }
```

## Latihan

1. `AI: boleh` **Pseudocode dulu.** Tulis pseudocode untuk: LED menyala 200 ms, padam 800 ms, diulang terus. Baru tulis programnya dengan dua konstanta, `NYALA_MS` dan `PADAM_MS`.
2. `AI: tanpa AI` **Hitung.** Untuk program nomor 1, berapa ms satu putaran? Berapa kali LED menyala dalam 10 detik?
3. `AI: tanpa AI` **Telusuri.** Ubah papan tiruan sesuai nomor 1 dan jalankan. Cocokkah dengan hitunganmu?
4. `AI: boleh` **Dengan papan (F).** Unggah program nomor 1 ke papan. Bila LED tidak menyala, periksa nomor pin LED bawaan papanmu dan tanya guru sebelum mengubah apa pun pada rangkaian.
5. *Opsional:* **catatan pemakaian AI.** Bila memakai AI generatif, jawab nomor 1 sendiri dulu, lalu minta penjelasan atau petunjuk bertahap, bukan program jadi. Catat alatnya, tujuanmu, garis besar perintahmu, bagian yang kamu pakai, dan caramu memeriksanya (jalankan atau telusuri). Jangan menaruh data pribadi atau tugas bernilai pada perintah.

## Latihan bercampur

Soal ini memadukan modul fondasi dengan modul ini.

1. Gambar diagram I-P-O untuk lampu lalu lintas mini dengan tombol penyeberang: apa masukannya, prosesnya, dan keluarannya?
2. Anggap `HIGH` = 1 dan `LOW` = 0. Program contoh menghasilkan urutan 1, 0, 1, 0, 1, 0, 1, 0 pada delapan langkah berurutan. Tulis sebagai bilangan biner delapan bit, ubah ke desimal dan heksadesimal.
3. Mengapa kabel USB dicabut sebelum rangkaian diubah, padahal tegangannya rendah? Jawab dengan satu kalimat.

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `c-x1-m9` (pertanyaan 1), sekitar tiga minggu lagi di `c-x1-m11` (pertanyaan 2), dan sekitar delapan minggu lagi di semester berikutnya (pertanyaan 3). Jawab sekarang lalu simpan.

1. Apa beda `setup()` dan `loop()`?
2. Sebutkan satu sensor dan satu aktuator, lalu tunjukkan posisinya pada diagram I-P-O.
3. Selama `delay(500)` berjalan, apakah papan dapat membaca tombol? Mengapa?

## Kesalahan umum

- **Lupa `pinMode`.** Pin belum dinyatakan sebagai keluaran, sehingga LED bisa tidak menyala atau redup; perilakunya bergantung papan.
- **Tanda titik koma hilang atau kurung tidak tertutup.** Kompiler (penyusun program) akan menolak program; baca pesan galat dari baris pertama.
- **Mengira `delay` memakai detik.** Satuannya milidetik: `delay(1000)` = 1 detik.
- **Mengira `loop()` berjalan sekali.** Ia berulang terus selama papan menyala.
- **Salah nomor pin.** Nomor pin LED bawaan berbeda antar papan; periksa dulu.

## Cek mandiri

- [ ] Saya dapat menjelaskan I-P-O pada papan dengan LED.
- [ ] Saya dapat menyebut tugas `setup()` dan `loop()`.
- [ ] Saya dapat menghitung periode dan jumlah kedipan dari nilai `delay`.
- [ ] Saya menulis pseudocode sebelum programnya.
- [ ] Saya tahu langkah keselamatan sebelum mengubah rangkaian.

## Kunci dan petunjuk

**Ingat kembali.** 1: masukan, proses, keluaran; contoh kalkulator (tombol, hitung, layar). 2: RAM sementara dan cepat, penyimpanan tetap dan lebih lambat. 3: satu bit menyimpan 0 atau 1; satu byte 256 nilai berbeda (0 sampai 255). 4: 10101010 biner = AA heksadesimal.

**Prediksi dulu.** 1: 0,5 detik. 2: 10 kali. 3: `setup()` sekali, `loop()` berulang. 4: periode menjadi 500 ms; kedipan menjadi dua kali lebih cepat.

**Contoh setengah jadi.** `JEDA_PANJANG_MS = 1000`, `LOW`, lalu `digitalWrite(PIN_LED, HIGH); delay(KEDIP_MS); digitalWrite(PIN_LED, LOW); delay(KEDIP_MS);`.

**Soal Parsons.** Urutan benar: e, f, i, b, g, a, c, h, d. Baris (i) menutup `setup`; baris (d) menutup `loop`. Perhatikan penempatan kurung kurawal.

**Latihan.** 2: periode 1000 ms; 10 kali menyala dalam 10 detik. Pseudocode contoh: ULANG TERUS: nyalakan LED; tunggu 200 ms; padamkan LED; tunggu 800 ms.

**Latihan bercampur.** 1: masukan tombol penyeberang, proses program menentukan lampu, keluaran tiga lampu. 2: 10101010 biner = 170 desimal = AA heksadesimal. 3: agar tidak terjadi hubung singkat atau salah polaritas saat papan masih menyala.

**Ulang berjarak.** 3: tidak; papan menunggu dan tidak menjalankan baris berikutnya. Gagasan ini dipakai lagi di modul waktu tanpa `delay` pada semester berikutnya.

## Langkah berikutnya

Modul berikut: `c-x1-m9` (masukan digital, percabangan, logika Boolean), yang menambahkan tombol sebagai masukan. Modul terkait: `fondasi-keamanan-dasar` untuk kebiasaan aman secara umum. Pembacaan lanjut: dokumentasi `pinMode`, `digitalWrite`, dan `delay` di Arduino dan dokumentasi Arduino-ESP32 milik Espressif.
