## Untuk siapa modul ini

Modul ini untuk murid kelas X jalur C (IoT dan robotika), minggu `C-X2-M4` silabus v1.3: larik (array) dan rata-rata bergerak. Prasyarat: modul `c-x2-m3` (data berkualitas) dan modul `c-x1-m12` (fungsi dan larik).

Modul ini berstatus DRAF: karangan penyusun, belum ditinjau pemilik. Ia mendukung butir `E-BK-a` (konsep struktur data dan algoritma standar) dan `E-BK-c` (menerapkan algoritma dan struktur data standar) dan tidak dihitung memenuhi butir capaian pembelajaran mana pun. Keluaran minggu ini: program penyaring. Latihan silabusnya: rata-rata 5 pembacaan terakhir.

Minggu ini tidak bertanda (F): semua bagian pokok dikerjakan **tanpa papan**, dengan kertas dan "papan tiruan" di komputer. Bila kamu mencoba dengan papan, ikuti aturan keselamatan modul sebelumnya (daya USB saja, cabut kabel sebelum mengubah rangkaian). Nomor pin pada contoh hanya contoh `[belum terverifikasi]` untuk papanmu.

## Ingat kembali

Jawab dari ingatan dulu, baru cek di kunci. Soal 1 dari `c-x1-m10`, soal 2 dari `c-x2-m3`, soal 3 dari `c-x2-m1`.

1. Tulis `for` yang menghitung mundur dari 5 sampai 1.
2. Tulis `dalamRentang` untuk nilai 0 sampai 100 memakai `&&`.
3. Dengan `INPUT_PULLUP`, `digitalRead` terbaca `HIGH` terus walau tombol ditekan. Sebut satu dugaan di kode dan satu dugaan di rangkaian.

## Tujuan

Setelah modul ini kamu dapat:

- menyimpan beberapa pembacaan terakhir dalam larik;
- menggeser isi larik untuk membuang pembacaan tertua;
- menghitung rata-rata bergerak dengan benar, termasuk saat jendela belum penuh;
- menjelaskan untung dan rugi jendela yang lebih besar;
- menulis program penyaring pembacaan sensor (keluaran minggu ini).

## Prediksi dulu

Rata-rata bergerak 3 pembacaan terakhir: hitung rata-rata dari **paling banyak** tiga pembacaan terbaru. **Tebak dulu, tulis jawabanmu, baru telusuri.** Pembacaan yang masuk berurutan:

```text
10, 12, 14, 16, 30
```

1. Tulis rata-rata setelah tiap pembacaan masuk.
2. Pembacaan terakhir (30) melompat jauh. Berapa kenaikan rata-ratanya dibanding rata-rata sebelumnya?
3. Mengapa dua rata-rata pertama dihitung dari kurang dari tiga pembacaan?

## Contoh terselesaikan

Larik adalah struktur data: tempat menyimpan beberapa nilai bertipe sama berderet, dengan indeks dari 0. Rata-rata bergerak adalah algoritma standar untuk meredam derau: alih-alih memakai satu pembacaan, kita memakai rata-rata `N` pembacaan terakhir. Jendelanya "bergerak" karena tiap pembacaan baru menggeser yang tertua keluar.

Kita butuh tiga hal: larik `jendela` berukuran `N`, penghitung `terisi` yang mencatat berapa elemen yang sudah berisi, dan dua fungsi. Fungsi `tambah()` mengisi larik dari indeks 0 sampai penuh; sesudah penuh, ia menggeser tiap elemen satu tempat ke kiri (elemen 1 menjadi elemen 0, dan seterusnya), lalu menaruh nilai baru di ujung kanan. Fungsi `rataRata()` menjumlahkan **hanya** elemen yang sudah terisi dan membaginya dengan `terisi`, bukan dengan `N`, karena saat jendela belum penuh pembagi `N` akan menghasilkan angka terlalu kecil. Jumlahnya `float` supaya pembagiannya berkoma. Bila belum ada data, hasilnya NaN, dengan alasan yang sama seperti pembacaan gagal di `c-x2-m2`: jangan mengarang angka.

Program berikut untuk papan membaca masukan analog tiap 200 ms, menaruhnya di jendela, dan mencetak nilai mentah beserta rata-ratanya.

```arduino
// Arduino-C++ untuk ESP32. Tidak dikompilasi oleh check:module-code.
const int PIN_SENSOR = 34;   // contoh; periksa papanmu
const int N = 5;             // ukuran jendela
float jendela[N];
int terisi = 0;

void tambah(float x) {
  if (terisi < N) {
    jendela[terisi] = x;
    terisi++;
  } else {
    for (int i = 0; i < N - 1; i++) {
      jendela[i] = jendela[i + 1];
    }
    jendela[N - 1] = x;
  }
}

float rataRata() {
  if (terisi == 0) {
    return NAN;
  }
  float jumlah = 0.0f;
  for (int i = 0; i < terisi; i++) {
    jumlah += jendela[i];
  }
  return jumlah / terisi;
}

void setup() {
  Serial.begin(115200);
}

void loop() {
  float x = analogRead(PIN_SENSOR);
  tambah(x);
  Serial.print(x, 0);
  Serial.print(" -> ");
  Serial.println(rataRata(), 1);
  delay(200);
}
```

Papan tiruan di bawah memakai fungsi yang sama tetapi dengan data karangan; pembacaan keempat (31) sengaja melonjak.

```cpp
// C++17 biasa, jalan di komputer. Diperiksa oleh check:module-code.
#include <cmath>
#include <iomanip>
#include <iostream>

const int N = 5;           // ukuran jendela
float jendela[N];
int terisi = 0;            // berapa elemen jendela yang sudah berisi

void tambah(float x) {
  if (terisi < N) {
    jendela[terisi] = x;
    terisi++;
  } else {
    for (int i = 0; i < N - 1; i++) {
      jendela[i] = jendela[i + 1];   // geser ke kiri, buang yang tertua
    }
    jendela[N - 1] = x;
  }
}

float rataRata() {
  if (terisi == 0) {
    return NAN;                      // belum ada data untuk dirata-ratakan
  }
  float jumlah = 0.0f;
  for (int i = 0; i < terisi; i++) {
    jumlah += jendela[i];
  }
  return jumlah / terisi;
}

int main() {
  const float DATA[] = {20, 22, 21, 31, 22, 21, 23, 22};
  std::cout << std::fixed << std::setprecision(1);
  for (float x : DATA) {
    tambah(x);
    std::cout << "masuk " << x << "  rata-rata " << rataRata() << "\n";
  }
}
```

Keluarannya:

```text
masuk 20.0  rata-rata 20.0
masuk 22.0  rata-rata 21.0
masuk 21.0  rata-rata 21.0
masuk 31.0  rata-rata 23.5
masuk 22.0  rata-rata 23.2
masuk 21.0  rata-rata 23.4
masuk 23.0  rata-rata 23.6
masuk 22.0  rata-rata 23.8
```

Nilai 31 hanya menaikkan rata-rata dari 21,0 menjadi 23,5, bukan menjadi 31: lonjakannya teredam. Tetapi ia tidak hilang. Rata-rata tetap lebih tinggi sampai 31 tergeser keluar dari jendela lima pembacaan, yaitu setelah pembacaan kesembilan. Itulah harga penyaring ini: lonjakan ikut mengotori beberapa pembacaan berikutnya. Jendela yang lebih besar membuat hasil lebih halus tetapi lebih lambat mengikuti perubahan yang nyata; jendela berukuran 1 sama dengan tanpa penyaring.

## Contoh setengah jadi

Sekarang sebagian diisi olehmu. Tujuannya: `rataRata()` yang menjumlahkan hanya elemen yang sudah terisi. Lengkapi bagian `____`.

```arduino setengah-jadi
// Arduino-C++ untuk ESP32. Lengkapi bagian ____.
float rataRata() {
  if (terisi == 0) {
    return NAN;
  }
  float jumlah = 0.0f;
  for (int i = 0; i < ____; i++) {
    jumlah += jendela[____];
  }
  return jumlah / ____;
}
```

## Soal Parsons

Susun baris-baris di bawah (sudah diacak) menjadi bagian `else` dari `tambah()` untuk jendela yang sudah penuh.

```text
(a)     jendela[N - 1] = x;
(b)     }
(c)     for (int i = 0; i < N - 1; i++) {
(d)       jendela[i] = jendela[i + 1];
```

## Latihan

1. `AI: boleh` **Pseudocode dulu.** Tulis pseudocode lalu programnya: simpan 5 pembacaan terakhir dan cetak rata-ratanya setiap ada pembacaan baru (keluaran minggu ini).
2. `AI: tanpa AI` **Telusuri.** Jendela berukuran 3 dan data 6, 9, 3, 12. Tulis isi jendela dan rata-rata setelah tiap pembacaan.
3. `AI: tanpa AI` **Cari galat.** `rataRata()` memakai `jumlah / N` selalu. Data masuk 10 lalu 20. Berapa hasil yang dicetak, berapa seharusnya, dan bagaimana memperbaikinya?
4. `AI: boleh` **Pilih ukuran jendela.** Bandingkan jendela berukuran 2 dan 10. Mana yang lebih halus, mana yang lebih cepat mengikuti perubahan nyata, dan untuk keperluan apa kamu memilih masing-masing?
5. *Opsional:* **catatan pemakaian AI.** Bila memakai AI generatif, jawab nomor 1 sendiri dulu, lalu minta penjelasan atau petunjuk bertahap, bukan program jadi. Catat alatnya, tujuanmu, garis besar perintahmu, bagian yang kamu pakai, dan cara memeriksanya (jalankan atau telusuri). Jangan menaruh data pribadi atau tugas bernilai pada perintah.

## Latihan bercampur

1. Jendela berukuran 5 berisi empat pembacaan 28, lalu masuk 85 tanpa validasi rentang. Berapa rata-ratanya, dan mengapa `dalamRentang()` dari `c-x2-m3` sebaiknya dipanggil sebelum `tambah()`?
2. Rata-rata 28,4 derajat Celsius diubah ke Fahrenheit. Berapa hasilnya dengan satu angka di belakang koma?
3. Perulangan `for (int i = 0; i <= N; i++) { jumlah += jendela[i]; }` dengan `N` bernilai 5. Apa yang salah?

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `c-x2-m5` (sekitar satu minggu lagi), `c-x2-m7` (sekitar tiga minggu lagi), dan `c-x2-m12` (sekitar delapan minggu lagi). Jawab sekarang lalu simpan.

1. Berapa rata-rata bergerak 3 pembacaan terakhir dari 10, 12, 20?
2. Apa yang terjadi pada rata-rata bergerak bila satu pembacaan melonjak, dan apa harga memperbesar jendela?
3. Mengapa `rataRata()` harus menjaga agar tidak membagi dengan nol saat jendela masih kosong?

## Kesalahan umum

- **Membagi dengan `N` sebelum jendela penuh.** Dua pembacaan pertama menghasilkan angka terlalu kecil; bagi dengan `terisi`.
- **Indeks keluar dari larik.** `i <= N` membaca `jendela[5]` yang tidak ada pada larik lima elemen.
- **Mengira rata-rata bergerak menghapus lonjakan.** Ia hanya meredam, dan lonjakan tetap memengaruhi hasil selama masih berada di jendela.
- **Jendela terlalu besar.** Hasil sangat halus tetapi terlambat menunjukkan perubahan nyata.
- **Mengira larik "mengingat" urutan sendiri.** Larik hanya tempat menyimpan; kamu yang menggeser isinya.
- **Memakai `int` untuk jumlah dan pembagian.** Bagian desimal terbuang; pakai `float`.

## Cek mandiri

- [ ] Saya dapat menyimpan pembacaan terakhir dalam larik dan menggeser isinya.
- [ ] Saya menghitung rata-rata dengan membagi `terisi`, bukan `N`.
- [ ] Saya dapat menelusuri rata-rata bergerak pada data kecil.
- [ ] Saya dapat menjelaskan untung dan rugi jendela yang lebih besar.
- [ ] Saya menghindari indeks di luar larik.

## Kunci dan petunjuk

**Ingat kembali.** 1: `for (int i = 5; i >= 1; i--)`. 2: `return x >= 0 && x <= 100;` (boleh ditambah `!isnan(x)`). 3: kode: logika terbalik (`== HIGH` padahal ditekan terbaca `LOW`); rangkaian: kaki tombol tidak tersambung ke GND.

**Prediksi dulu.** 1: 10, 11, 12, 14, 20 (misalnya setelah 12: (10 + 12) / 2 = 11; setelah 30: (14 + 16 + 30) / 3 = 20). 2: dari 14 menjadi 20, naik 6, sedangkan nilai masuk melonjak dari 16 ke 30. 3: baru satu atau dua pembacaan yang ada; jendela belum penuh.

**Contoh setengah jadi.** Isian berurutan: `terisi`, `i`, `terisi`. Fungsi lengkapnya dikompilasi penulis dengan `Arduino.h` tiruan tanpa peringatan.

**Soal Parsons.** Urutan benar: c, d, b, a.

**Latihan.** 1: pseudocode: simpan pembacaan di larik; bila belum penuh, isi berikutnya; bila penuh, geser ke kiri dan taruh di ujung; hitung jumlah hanya elemen terisi, bagi dengan banyaknya, cetak. 2: [6] rata-rata 6; [6, 9] 7,5; [6, 9, 3] 6; [9, 3, 12] 8. 3: dicetak 6 (30 / 5), seharusnya 15 (30 / 2); ganti pembagi menjadi `terisi`. 4: jendela 10 lebih halus tetapi lebih lambat; jendela 2 lebih cepat tetapi derau lebih terasa. Jawaban dinilai dari alasan yang menghubungkan ukuran dengan keperluan (misalnya: tampilan yang tenang atau reaksi cepat).

**Latihan bercampur.** 1: (28 x 4 + 85) / 5 = 197 / 5 = 39,4; satu nilai ganjil mengotori rata-rata, jadi tolak dulu nilai di luar rentang. 2: 28,4 x 9 / 5 + 32 = 51,12 + 32 = 83,12, sehingga 83,1. 3: `jendela[5]` tidak ada; seharusnya `i < N` (atau `i < terisi`).

**Ulang berjarak.** 1: (10 + 12 + 20) / 3 = 14. 2: rata-rata naik tetapi lebih kecil dari lonjakannya, dan pengaruhnya bertahan sampai nilai itu keluar dari jendela; jendela lebih besar lebih halus tetapi lebih lambat mengikuti perubahan nyata. 3: pembagian dengan nol tidak bermakna; hasilnya NaN atau tak terdefinisi, jadi lebih jujur tidak menghitung.

## Langkah berikutnya

Modul berikut: `c-x2-m5` (keluaran analog atau PWM), yang memakai nilai analog sebagai masukan untuk mengatur kecerahan. Di kelas XI jalur ini ada penyangga melingkar, cara menyimpan jendela tanpa menggeser seluruh isi. Pembacaan lanjut: rujukan Arduino tentang `analogRead()`.

## Rujukan

- Arduino, rujukan bahasa: `analogRead()`. <https://docs.arduino.cc/language-reference/en/functions/analog-io/analogRead/>
- Arduino, rujukan bahasa: `Serial.println()`. <https://docs.arduino.cc/language-reference/en/functions/communication/serial/println/>
