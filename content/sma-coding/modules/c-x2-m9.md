## Untuk siapa modul ini

Modul ini untuk murid kelas X jalur C (IoT dan robotika), minggu `C-X2-M9` silabus v1.3: struktur data tumpukan dan antrian sebagai penyangga. Prasyarat: modul `c-x2-m8` (menampilkan data). Kamu juga memakai larik dan fungsi dari `c-x1-m12`, penggeseran isi larik dari `c-x2-m4`, dan `millis()` dari `c-x2-m7`.

Modul ini berstatus DRAF: karangan penyusun, belum ditinjau pemilik. Ia mendukung butir `E-BK-a` (konsep struktur data dan algoritma standar) dan `E-BK-c` (menerapkan algoritma dan struktur data standar), dan tidak dihitung memenuhi butir capaian pembelajaran mana pun. Keluaran minggu ini: program stack/queue. Latihan silabusnya: simulasi antrian pembacaan (sintetis).

Minggu ini tidak bertanda (F): semua bagian pokok dikerjakan **tanpa papan**, dengan kertas dan "papan tiruan" di komputer yang memakai pembacaan karangan. Bila kamu mencoba dengan papan, ikuti aturan keselamatan modul sebelumnya: daya USB saja dan cabut kabel sebelum mengubah rangkaian. Nomor pin pada contoh hanya contoh `[belum terverifikasi]` untuk papanmu.

## Ingat kembali

Jawab dari ingatan dulu, baru cek di kunci. Soal 1 dari `c-x2-m8`, soal 2 dari `c-x2-m6`, soal 3 dari `c-x2-m1`.

1. Mengapa grafik di plotter bisa tampak melonjak padahal suhunya hanya berubah 0,4 derajat?
2. Apa beda buzzer aktif dan buzzer pasif?
3. Mengapa mengubah satu hal pada satu waktu mempercepat penemuan galat?

## Tujuan

Setelah modul ini kamu dapat:

- membedakan antrian (FIFO, masuk pertama keluar pertama) dan tumpukan (LIFO, masuk terakhir keluar pertama);
- menulis operasi `masuk`, `keluar`, `dorong`, dan `ambil` pada larik berkapasitas tetap;
- menjelaskan mengapa antrian dipakai sebagai penyangga antara pembaca sensor dan pemroses;
- menangani antrian penuh dan kosong tanpa menulis di luar larik;
- menulis program stack/queue (keluaran minggu ini).

## Prediksi dulu

Dua struktur kosong, masing-masing berkapasitas 3: sebuah antrian dan sebuah tumpukan. Pada keduanya dilakukan urutan yang sama: masukkan 5, masukkan 8, keluarkan satu nilai, masukkan 3, keluarkan satu nilai. (Antrian: `masuk` dan `keluar`. Tumpukan: `dorong` dan `ambil`.) **Tebak dulu, tulis jawabanmu, baru telusuri.**

1. Dua nilai apa yang keluar dari antrian, berurutan, dan apa yang tersisa?
2. Dua nilai apa yang keluar dari tumpukan, berurutan, dan apa yang tersisa?
3. Mengapa hasilnya berbeda padahal urutan operasinya sama?

## Contoh terselesaikan

Sensor mengirim pembacaan tiap 100 ms, tetapi pemrosesan kadang lebih lambat, misalnya karena mencetak atau menunggu. Tanpa penampung, pembacaan yang datang saat papan sibuk hilang. **Antrian** adalah penyangga yang menampung pembacaan sementara: yang pertama masuk diproses pertama (*first in, first out*). **Tumpukan** menyimpan menurut kebalikannya: yang terakhir masuk diambil pertama (*last in, first out*), seperti tumpukan piring; ia cocok bila yang terbaru paling dibutuhkan, atau bila urutan perlu dibalik.

Keduanya dibuat dari larik berukuran tetap dan satu penghitung. Pada antrian, `masuk` menaruh nilai di posisi `terisi`, dan `keluar` mengambil posisi 0 lalu menggeser sisanya ke depan, seperti `tambah` pada rata-rata bergerak di `c-x2-m4`. Dua keadaan batas harus dijaga: penuh (data baru tidak muat) dan kosong (tidak ada yang bisa diambil). Contoh ini menolak data baru ketika penuh dan menghitung berapa yang ditolak. Pilihan lain, yaitu membuang yang tertua, punya harga lain; keduanya tetap kehilangan data.

```arduino
// Arduino-C++ untuk ESP32. Diperiksa check:module-code terhadap header tiruan (sintaks dan tipe saja, bukan bukti perilaku papan).
const int PIN_SENSOR = 34;                      // contoh; periksa papanmu
const unsigned long SELANG_BACA_MS = 100;
const unsigned long SELANG_PROSES_MS = 300;
const int KAPASITAS = 4;

int antrian[KAPASITAS];
int terisi = 0;
int hilang = 0;
unsigned long terakhirBaca = 0;
unsigned long terakhirProses = 0;

bool masuk(int nilai) {
  if (terisi == KAPASITAS) {
    hilang++;
    return false;
  }
  antrian[terisi] = nilai;
  terisi++;
  return true;
}

bool keluar(int& nilai) {
  if (terisi == 0) {
    return false;
  }
  nilai = antrian[0];
  for (int i = 0; i < terisi - 1; i++) {
    antrian[i] = antrian[i + 1];
  }
  terisi--;
  return true;
}

void setup() {
  Serial.begin(115200);
}

void loop() {
  unsigned long sekarang = millis();
  if (sekarang - terakhirBaca >= SELANG_BACA_MS) {
    terakhirBaca = sekarang;
    masuk(analogRead(PIN_SENSOR));
  }
  if (sekarang - terakhirProses >= SELANG_PROSES_MS) {
    terakhirProses = sekarang;
    int nilai = 0;
    if (keluar(nilai)) {
      Serial.println(nilai);
    }
  }
}
```

Pada program itu pembaca menambah satu pembacaan tiap 100 ms dan pemroses mengambil satu tiap 300 ms, sehingga antrian pasti penuh. Penyangga hanya menyerap lonjakan singkat; bila rata-rata data masuk lebih besar daripada rata-rata data diproses, kapasitas sebesar apa pun akhirnya penuh. Papan tiruan di bawah memakai fungsi yang sama dengan langkah waktu dan data karangan: satu pembacaan masuk tiap langkah, satu diproses tiap dua langkah. Di bagian akhir tumpukan menunjukkan urutan kebalikannya.

```cpp
// C++17 biasa, jalan di komputer. Diperiksa oleh check:module-code.
#include <iostream>

const int KAPASITAS = 4;

// Antrian (FIFO): masuk di belakang, keluar dari depan.
int antrian[KAPASITAS];
int terisi = 0;
int hilang = 0;               // berapa data ditolak karena antrian penuh

bool masuk(int nilai) {
  if (terisi == KAPASITAS) {
    hilang++;
    return false;
  }
  antrian[terisi] = nilai;
  terisi++;
  return true;
}

bool keluar(int& nilai) {
  if (terisi == 0) {
    return false;
  }
  nilai = antrian[0];
  for (int i = 0; i < terisi - 1; i++) {
    antrian[i] = antrian[i + 1];   // geser ke depan
  }
  terisi--;
  return true;
}

// Tumpukan (LIFO): dorong di atas, ambil dari atas.
int tumpukan[KAPASITAS];
int atas = 0;

bool dorong(int nilai) {
  if (atas == KAPASITAS) {
    return false;
  }
  tumpukan[atas] = nilai;
  atas++;
  return true;
}

bool ambil(int& nilai) {
  if (atas == 0) {
    return false;
  }
  atas--;
  nilai = tumpukan[atas];
  return true;
}

void cetakIsi() {
  std::cout << "[";
  for (int i = 0; i < terisi; i++) {
    std::cout << (i > 0 ? " " : "") << antrian[i];
  }
  std::cout << "]";
}

int main() {
  // Antrian: satu pembacaan masuk tiap langkah, satu diproses tiap dua langkah.
  for (int t = 1; t <= 8; t++) {
    std::cout << "t=" << t << " masuk " << 20 + t;
    if (!masuk(20 + t)) {
      std::cout << " (ditolak)";
    }
    int nilai = 0;
    if (t % 2 == 0 && keluar(nilai)) {
      std::cout << ", diproses " << nilai;
    }
    std::cout << " -> ";
    cetakIsi();
    std::cout << "\n";
  }
  std::cout << "hilang: " << hilang << "\n";

  // Tumpukan: dorong 21, 22, 23 lalu ambil tiga kali.
  dorong(21);
  dorong(22);
  dorong(23);
  int nilai = 0;
  std::cout << "tumpukan keluar:";
  while (ambil(nilai)) {
    std::cout << " " << nilai;
  }
  std::cout << "\n";
}
```

Keluarannya:

```text
t=1 masuk 21 -> [21]
t=2 masuk 22, diproses 21 -> [22]
t=3 masuk 23 -> [22 23]
t=4 masuk 24, diproses 22 -> [23 24]
t=5 masuk 25 -> [23 24 25]
t=6 masuk 26, diproses 23 -> [24 25 26]
t=7 masuk 27 -> [24 25 26 27]
t=8 masuk 28 (ditolak), diproses 24 -> [25 26 27]
hilang: 1
tumpukan keluar: 23 22 21
```

Telusuri `t=8`: antrian sudah berisi empat data, jadi 28 ditolak dan `hilang` menjadi 1; baru sesudah itu 24 diproses. Menggeser seluruh isi tiap kali `keluar` boros bila antriannya panjang; cara yang lebih hemat, penyangga melingkar, dibahas di kelas XI.

## Contoh setengah jadi

Sekarang sebagian diisi olehmu. Lengkapi `masuk` pada antrian di atas. Lengkapi bagian `____`.

```arduino setengah-jadi
// Arduino-C++ untuk ESP32. Lengkapi bagian ____.
bool masuk(int nilai) {
  if (terisi == ____) {
    hilang++;
    return ____;
  }
  antrian[____] = nilai;
  terisi++;
  return true;
}
```

## Soal Parsons

Susun baris-baris di bawah (sudah diacak) menjadi fungsi `keluar` yang benar.

```text
(a)   nilai = antrian[0];
(b) }
(c)   return true;
(d)   terisi--;
(e) bool keluar(int& nilai) {
(f)   if (terisi == 0) {
(g)     return false;
(h)   }
(i)   for (int i = 0; i < terisi - 1; i++) { antrian[i] = antrian[i + 1]; }
```

## Latihan

1. `AI: boleh` **Pseudocode dulu.** Tulis pseudocode lalu program tumpukan `dorong` dan `ambil` berkapasitas 5, lalu pakai untuk mencetak tiga pembacaan terakhir dari yang terbaru (keluaran minggu ini).
2. `AI: tanpa AI` **Telusuri.** Antrian berkapasitas 3. Pada langkah ke-t masuk pembacaan 10 x t (10, 20, 30, ...). Pada langkah 3 dan 6 satu data diproses, setelah data langkah itu masuk. Berapa data ditolak sampai akhir langkah 6, dan apa isi antrian?
3. `AI: tanpa AI` **Cari galat.** Seorang murid menghapus baris `if (terisi == KAPASITAS)` dari `masuk`. Apa yang terjadi saat antrian sudah penuh dan satu data lagi datang?
4. `AI: boleh` **Bila papan tersedia (opsional).** Jalankan program contoh dengan `SELANG_PROSES_MS` 300 dan 100, lalu amati berapa kali pesan penuh muncul bila kamu menambahkannya. Jangan mengubah rangkaian saat daya menyala.
5. *Opsional:* **catatan pemakaian AI.** Bila memakai AI generatif, jawab nomor 1 sendiri dulu, lalu minta penjelasan atau petunjuk bertahap, bukan program jadi. Catat alatnya, tujuanmu, garis besar perintahmu, bagian yang kamu pakai, dan cara memeriksanya (jalankan atau telusuri). Jangan menaruh data pribadi atau tugas bernilai pada perintah.

## Latihan bercampur

1. Grafik teks memakai `(nilai - minimum) * lebar / (maksimum - minimum)`. Berapa `#` untuk nilai 15 pada rentang 0 sampai 60 dengan lebar 30?
2. Pembaca menaruh satu pembacaan tiap 100 ms dan pemroses mengambil satu tiap 300 ms. Dalam 3 detik, kira-kira berapa yang masuk, berapa yang diproses, dan berapa kapasitas yang diperlukan agar tidak ada yang ditolak?

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `c-x2-m10` (sekitar satu minggu lagi), `c-x2-m12` (sekitar tiga minggu lagi), dan modul ketiga kelas XI jalur C (sekitar delapan minggu lagi). Jawab sekarang lalu simpan.

1. Dari antrian yang berisi 5, 8, 3 (masuk berurutan), nilai mana yang keluar lebih dulu, dan nilai mana yang keluar lebih dulu dari tumpukan yang berisi urutan sama?
2. Apa yang harus dilakukan antrian penuh ketika data baru datang, dan apa harga tiap pilihannya?
3. Mengapa larik dan penghitung `terisi` yang selalu dipakai bersama sebaiknya disatukan dalam satu tipe?

## Kesalahan umum

- **Mengira antrian dan tumpukan sama.** Urutan keluarnya berlawanan: antrian memberi yang tertua dulu, tumpukan yang terbaru dulu.
- **Tidak menjaga keadaan penuh dan kosong.** Menulis di luar larik merusak variabel lain tanpa pesan galat; mengambil dari yang kosong memberi nilai sembarang.
- **Mengira penyangga yang besar menyelesaikan segalanya.** Bila data masuk rata-rata lebih cepat daripada diproses, penyangga hanya menunda penuhnya.
- **Lupa menggeser isi antrian setelah `keluar`.** Elemen di depan terus sama dan yang diproses selalu data lama.
- **Menyamakan "larik berkapasitas tetap" dengan memori tak terbatas.** Papan punya memori kecil; kapasitas dipilih sesuai kebutuhan dan batas papan `[belum terverifikasi]`.

## Cek mandiri

- [ ] Saya dapat menjelaskan FIFO dan LIFO dengan contoh sehari-hari.
- [ ] Saya dapat menulis `masuk` dan `keluar` pada larik berkapasitas tetap.
- [ ] Saya menjaga keadaan penuh dan kosong.
- [ ] Saya dapat menjelaskan kapan penyangga membantu dan kapan tidak.
- [ ] Saya menelusuri isi struktur tiap langkah di kertas.

## Kunci dan petunjuk

**Ingat kembali.** 1: plotter menyesuaikan sumbunya dengan data, sehingga selisih kecil memenuhi tinggi grafik. 2: buzzer aktif berbunyi dengan nada tetap bila diberi daya; buzzer pasif perlu sinyal berfrekuensi dan nadanya diatur frekuensi itu. 3: kamu tahu perubahan mana yang memperbaiki, dan tidak menambah galat baru.

**Prediksi dulu.** 1: antrian: 5 lalu 8 keluar; tersisa 3. 2: tumpukan: 8 lalu 3 keluar; tersisa 5. 3: antrian mengeluarkan yang tertua, tumpukan yang terbaru. Telusur tumpukan: dorong 5 menjadi [5]; dorong 8 menjadi [5 8]; ambil memberi 8; dorong 3 menjadi [5 3]; ambil memberi 3.

**Contoh setengah jadi.** Isian berurutan: `KAPASITAS`, `false`, `terisi`. Program lengkapnya dikompilasi penulis dengan `Arduino.h` tiruan tanpa peringatan.

**Soal Parsons.** Urutan benar: e, f, g, h, a, i, d, c, b. Baris `nilai = antrian[0]` harus sebelum penggeseran, karena penggeseran menimpa posisi 0; `terisi--` sesudah penggeseran karena penggeseran memakai `terisi` lama.

**Latihan.** 1: pseudocode: ambil kapasitas 5; `dorong`: bila `atas` sama dengan kapasitas, tolak; bila tidak, taruh di `tumpukan[atas]` lalu tambah `atas`; `ambil`: bila `atas` sama dengan 0, gagal; bila tidak, kurangi `atas` lalu kembalikan `tumpukan[atas]`. Dorong tiap pembacaan; tiga `ambil` terakhir memberi yang terbaru dulu. 2: langkah 1: [10]; 2: [10 20]; 3: masuk 30 lalu 10 diproses, [20 30]; 4: [20 30 40]; 5: 50 ditolak (1), tetap [20 30 40]; 6: 60 ditolak (2), lalu 20 diproses, [30 40]. Jadi 2 data ditolak dan isinya 30, 40. 3: penghitung `terisi` melewati `KAPASITAS`, dan `antrian[terisi] = nilai` menulis di luar larik, merusak memori lain; perilakunya tidak terdefinisi dan galatnya tidak tampak langsung. 4: tidak ada kunci tunggal; dengan pemroses 300 ms antrian cepat penuh, dengan 100 ms ia seimbang dengan pembaca dan jarang penuh.

**Latihan bercampur.** 1: 15 x 30 / 60 = 7,5 menjadi 7. 2: masuk kira-kira 30, diproses kira-kira 10, jadi tertimbun kira-kira 20; kapasitas minimal kira-kira 20, dan tetap akan penuh bila pembacaan berlanjut, karena lajunya tidak seimbang.

**Ulang berjarak.** 1: antrian mengeluarkan 5 lebih dulu; tumpukan mengeluarkan 3 lebih dulu. 2: menolak data baru (yang tertua tetap aman, yang baru hilang) atau membuang yang tertua (yang terbaru tetap masuk, yang lama hilang); keduanya kehilangan data, dan pilihannya bergantung pada data mana yang lebih berharga. 3: agar keduanya tidak terpisah atau tidak sinkron; dengan satu tipe, fungsi menerima satu hal, dan aturan "larik dan penghitung selalu bersama" tidak bisa dilanggar tanpa sengaja.

## Langkah berikutnya

Modul berikut: `c-x2-m10` (pencarian dan pengurutan data sensor), yang memakai larik untuk mencari nilai dan menghitung median. Modul terkait: `fondasi-komputer-dan-hardware` untuk gagasan memori yang terbatas. Pembacaan lanjut: halaman `std::queue` dan `std::stack` di cppreference, yaitu versi pustaka standar C++ untuk komputer (tidak dipakai pada contoh papan di sini).

## Rujukan

- Arduino, rujukan bahasa: struktur larik (`Array`). <https://docs.arduino.cc/language-reference/en/variables/data-types/array/>
- cppreference: `std::queue` dan `std::stack`. <https://en.cppreference.com/w/cpp/container/queue>, <https://en.cppreference.com/w/cpp/container/stack>
- Arduino, rujukan bahasa: `millis()`. <https://docs.arduino.cc/language-reference/en/functions/time/millis/>
