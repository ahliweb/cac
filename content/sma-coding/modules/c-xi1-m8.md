## Untuk siapa modul ini

Modul ini untuk murid kelas XI jalur C (IoT dan robotika), minggu `C-XI1-M8` silabus v1.3: efisiensi memori dan waktu pada mikrokontroler. Prasyarat formal di indeks: modul `c-x1-m12` (fungsi dan larik); urutan belajarnya setelah `c-xi1-m7` (kendali proporsional), yang belum terindeks saat modul ini ditulis dan diperiksa guru. Kamu juga memakai `struct` dari `c-xi1-m3`, jendela rata-rata bergerak dari `c-x2-m4`, dan antrian berkapasitas tetap dari `c-x2-m9`.

Modul ini karangan penyusun dan disetujui pemilik program pada 2026-11-20 (keputusan lewat dialog; catatan tinjauan menjadi tindak lanjut revisi). Ia mendukung butir `F-BK-b` (lebih dari satu solusi, justifikasi efisiensi) dan `F-AP-a` (konsep strategi algoritmik), dan tidak dihitung memenuhi butir capaian pembelajaran mana pun; pemetaan `F-BK-b` untuk jalur C bersifat parsial. Keluaran minggu ini: tabel perbandingan. Latihan silabusnya: larik melawan penyangga melingkar.

Minggu ini tidak bertanda (F): semua bagian pokok dikerjakan **tanpa papan**, dengan kertas dan program C++ biasa di komputer. Bila kamu mencoba dengan papan, ikuti aturan keselamatan modul sebelumnya: daya USB saja dan cabut kabel sebelum mengubah rangkaian. Ukuran tipe pada contoh adalah ukuran di komputer penulis; ukuran di papanmu **periksa sendiri** dengan `sizeof` `[belum terverifikasi]`.

## Ingat kembali

Jawab dari ingatan dulu, baru cek di kunci. Soal 1 dari `c-xi1-m5`, soal 2 dari `c-xi1-m7`, soal 3 dari `c-x2-m9`.

1. Apa harga yang dibayar dengan memperlebar pita histeresis?
2. Mengapa rumus duty ditulis mengalikan dulu baru membagi pada bilangan bulat?
3. Apa yang harus dilakukan antrian penuh ketika data baru datang, dan apa harga tiap pilihannya?

## Tujuan

Setelah modul ini kamu dapat:

- menghitung memori yang dipakai larik dan `struct` dalam byte, termasuk pengaruh tipe dan urutan anggota;
- menghitung kerja sebuah solusi dengan **menghitung operasi**, bukan menebak "terasa cepat";
- membandingkan dua struktur data pada memori dan waktu, dan menyebut harga masing-masing;
- memilih struktur yang hemat untuk anggaran memori tertentu dan menjustifikasinya;
- menyusun tabel perbandingan (keluaran minggu ini).

## Prediksi dulu

Dua cara menyimpan 8 pembacaan terakhir: **geser** (pembacaan baru masuk di ujung, semua yang lain digeser satu tempat) dan **melingkar** (pembacaan baru menimpa yang tertua, tanpa menggeser). Keduanya sudah penuh dan menerima satu pembacaan lagi. **Tebak dulu, tulis jawabanmu, baru telusuri.**

1. Berapa kali sebuah elemen larik disalin atau ditulis pada satu sisipan dengan cara geser? Dengan cara melingkar?
2. Bila jendelanya diperbesar menjadi 512, bagaimana angka itu berubah untuk masing-masing cara?
3. Apakah kedua cara menghasilkan jumlah isi jendela yang sama?

## Contoh terselesaikan

Mikrokontroler punya memori kecil dan tidak ada yang menggantikannya bila habis, sehingga dua pertanyaan perlu dijawab dengan **angka**: berapa **byte** yang dipakai, dan berapa **operasi** yang dikerjakan. Ukuran dihitung dengan `sizeof`. Tipe `int` bisa berbeda ukurannya antar papan, jadi tipe dengan lebar pasti (`int16_t`, `int32_t`) lebih jelas untuk perhitungan memori. Pada `struct`, kompilator dapat menyisipkan ruang kosong (*padding*) agar anggota terletak pada alamat yang cocok; **urutan anggota** karena itu memengaruhi ukuran. Aturan paddingnya bergantung pada platform: yang di bawah adalah hasil di komputer penulis.

```cpp
// C++17 biasa, jalan di komputer. Diperiksa oleh check:module-code.
#include <cstdint>
#include <iostream>

struct UrutanBoros {
  bool valid;
  uint32_t detik;
  bool kedua;
  float suhu;
};

struct UrutanHemat {
  uint32_t detik;
  float suhu;
  bool valid;
  bool kedua;
};

int main() {
  std::cout << "uint8_t  " << sizeof(uint8_t) << " byte\n";
  std::cout << "int16_t  " << sizeof(int16_t) << " byte\n";
  std::cout << "int32_t  " << sizeof(int32_t) << " byte\n";
  std::cout << "float    " << sizeof(float) << " byte\n";
  std::cout << "UrutanBoros " << sizeof(UrutanBoros) << " byte\n";
  std::cout << "UrutanHemat " << sizeof(UrutanHemat) << " byte\n";
  const int ANGGARAN = 1024;
  std::cout << "muat dalam " << ANGGARAN << " byte: int16_t " << ANGGARAN / sizeof(int16_t)
            << ", float " << ANGGARAN / sizeof(float) << ", UrutanHemat "
            << ANGGARAN / sizeof(UrutanHemat) << "\n";
}
```

Keluarannya:

```text
uint8_t  1 byte
int16_t  2 byte
int32_t  4 byte
float    4 byte
UrutanBoros 16 byte
UrutanHemat 12 byte
muat dalam 1024 byte: int16_t 512, float 256, UrutanHemat 85
```

Dua `struct` itu berisi anggota yang sama, tetapi yang pertama 16 byte dan yang kedua 12 byte. Pada anggaran 1024 byte itu menentukan apakah muat 64 atau 85 pembacaan. Menyimpan suhu sebagai `int16_t` bersatuan sepersepuluh derajat (281 untuk 28,1) memakai separuh memori `float`, dengan harga: rentang dan ketelitiannya ditetapkan sendiri.

Sekarang waktu. Mengukur dengan jam tidak adil di komputer karena hasilnya bergantung pada mesin; menghitung **operasi** hasilnya sama di mana pun. Program di bawah memasukkan 1000 sampel ke jendela dengan dua cara dan menghitung penulisan elemen larik. Cara `tambahMelingkar` memakai `%` agar indeks kembali ke 0 setelah ujung; ia dijelaskan lengkap di `c-xi1-m9`, minggu ini hanya biayanya yang dibandingkan.

```cpp
// C++17 biasa, jalan di komputer. Diperiksa oleh check:module-code.
#include <iomanip>
#include <iostream>

const int KAPASITAS_MAKS = 512;

struct Jendela {
  int data[KAPASITAS_MAKS];
  int kapasitas;
  int terisi;
  int kepala;
};

long salinan = 0;

void tambahGeser(Jendela& j, int nilai) {
  if (j.terisi == j.kapasitas) {
    for (int i = 1; i < j.kapasitas; i++) {
      j.data[i - 1] = j.data[i];
      salinan++;
    }
    j.terisi = j.kapasitas - 1;
  }
  j.data[j.terisi] = nilai;
  salinan++;
  j.terisi++;
}

void tambahMelingkar(Jendela& j, int nilai) {
  if (j.terisi < j.kapasitas) {
    j.data[(j.kepala + j.terisi) % j.kapasitas] = nilai;
    j.terisi++;
  } else {
    j.data[j.kepala] = nilai;
    j.kepala = (j.kepala + 1) % j.kapasitas;
  }
  salinan++;
}

long jumlahJendela(const Jendela& j) {
  long total = 0;
  for (int i = 0; i < j.terisi; i++) {
    total += j.data[(j.kepala + i) % j.kapasitas];
  }
  return total;
}

int main() {
  const int UKURAN[] = {8, 64, 512};
  const int SAMPEL = 1000;
  std::cout << "jendela  geser  melingkar  jumlah sama\n";
  for (int n : UKURAN) {
    Jendela a = {};
    Jendela b = {};
    a.kapasitas = n;
    b.kapasitas = n;
    salinan = 0;
    for (int s = 1; s <= SAMPEL; s++) {
      tambahGeser(a, s);
    }
    long geser = salinan;
    salinan = 0;
    for (int s = 1; s <= SAMPEL; s++) {
      tambahMelingkar(b, s);
    }
    long melingkar = salinan;
    std::cout << std::setw(7) << n << std::setw(8) << geser << std::setw(11) << melingkar
              << std::setw(13) << (jumlahJendela(a) == jumlahJendela(b) ? "ya" : "TIDAK") << "\n";
  }
}
```

Keluarannya:

```text
jendela  geser  melingkar  jumlah sama
      8    7944       1000           ya
     64   59968       1000           ya
    512  250368       1000           ya
```

Telusuri angka pertama: pada jendela 8, delapan sisipan pertama menulis satu kali masing-masing (8). Sisanya, 992 sisipan, masing-masing menggeser 7 elemen lalu menulis 1: 992 x 8 = 7936. Jumlahnya 7944. Cara melingkar selalu menulis satu kali per sisipan, apa pun ukuran jendelanya: 1000. Kerja cara geser tumbuh sebanding dengan ukuran jendela; kerja cara melingkar tetap. Isinya sama (kolom terakhir "ya"), jadi pilihannya murni soal harga: cara melingkar lebih cepat, tetapi membaca "elemen ke-i dari yang tertua" memerlukan `(kepala + i) % kapasitas`, bukan `data[i]`. Cara geser lebih mudah dibaca. Pada jendela 8 dengan sampel yang jarang, selisihnya mungkin tidak terasa; pada jendela 512 dengan sampel cepat, selisihnya menentukan apakah papan masih sempat mengerjakan hal lain. Hasil ini menghitung penulisan larik, bukan waktu nyata: waktu nyata bergantung papan dan kompilator, dan baru diketahui dengan mengukur di papan.

Sketsa di bawah mengukur dengan `micros()` pada papan. Larik dibuat `volatile` agar kompilator tidak membuang perulangan yang hasilnya tak dipakai. Ia hanya diperiksa sintaksnya terhadap header tiruan, tidak dijalankan pada papan; angkanya baru ada bila kamu menjalankannya.

```arduino
// Arduino-C++ untuk ESP32. Diperiksa check:module-code terhadap header tiruan (sintaks dan tipe saja, bukan bukti perilaku papan).
const int KAPASITAS = 64;
const int ULANG = 200;

volatile int16_t dataGeser[KAPASITAS];
volatile int16_t dataMelingkar[KAPASITAS];
int kepala = 0;

void sisipGeser(int16_t nilai) {
  for (int i = 1; i < KAPASITAS; i++) {
    dataGeser[i - 1] = dataGeser[i];
  }
  dataGeser[KAPASITAS - 1] = nilai;
}

void sisipMelingkar(int16_t nilai) {
  dataMelingkar[kepala] = nilai;
  kepala = (kepala + 1) % KAPASITAS;
}

void setup() {
  Serial.begin(115200);
  unsigned long awal = micros();
  for (int i = 0; i < ULANG; i++) {
    sisipGeser(static_cast<int16_t>(i));
  }
  unsigned long geserUs = micros() - awal;
  awal = micros();
  for (int i = 0; i < ULANG; i++) {
    sisipMelingkar(static_cast<int16_t>(i));
  }
  unsigned long melingkarUs = micros() - awal;
  Serial.print("geser (us): ");
  Serial.println(geserUs);
  Serial.print("melingkar (us): ");
  Serial.println(melingkarUs);
}

void loop() {}
```

## Contoh setengah jadi

Hitung berapa pembacaan yang muat dalam anggaran. Lengkapi bagian `____`: ukuran satu pembacaan diambil dari `sizeof`, bukan ditebak.

```cpp setengah-jadi
// C++17. Lengkapi bagian ____.
#include <cstdint>

struct Pembacaan {
  int16_t suhu10;
  int16_t cahaya;
};

int jumlahMuat(int anggaranByte) {
  return anggaranByte / ____(____);
}
```

## Soal Parsons

Susun baris-baris di bawah (sudah diacak) menjadi `tambahGeser` yang menghitung salinan.

```text
(a)   j.data[j.terisi] = nilai;
(b) void tambahGeser(Jendela& j, int nilai) {
(c)     }
(d)     for (int i = 1; i < j.kapasitas; i++) {
(e)   if (j.terisi == j.kapasitas) {
(f)       salinan++;
(g)       j.data[i - 1] = j.data[i];
(h)     j.terisi = j.kapasitas - 1;
(i)   }
(j)   salinan++;
(k)   j.terisi++;
(l) }
```

## Latihan

1. `AI: boleh` **Pseudocode dulu.** Satu pembacaan disimpan sebagai `struct` dengan `uint32_t detik`, `int16_t suhu10`, `int16_t cahaya`, dan `bool valid`. Tulis pseudocode lalu program kecil yang mencetak `sizeof` struct itu dan berapa pembacaan yang muat dalam 2000 byte. Bandingkan dengan struct tanpa `valid`.
2. `AI: tanpa AI` **Hitung.** Jendela berkapasitas 100 menerima 300 sampel. Berapa penulisan elemen total dengan cara geser, dan dengan cara melingkar? Tunjukkan langkahnya.
3. `AI: tanpa AI` **Pilih dan justifikasi.** Sensor menghasilkan 50 pembacaan per detik dan kamu memerlukan jendela 5 detik dari `int16_t`. Berapa byte jendelanya? Berapa penulisan per detik pada cara geser dan pada cara melingkar? Mana yang kamu pilih bila papanmu juga harus mengerjakan hal lain, dan apa harganya?
4. `AI: boleh` **Bila papan tersedia (opsional).** Jalankan sketsa pengukur waktu di atas, catat kedua angkanya, lalu ulangi dengan `KAPASITAS` 16 dan 128. Tanpa papan, kerjakan nomor 2 dan 3. Jangan mengubah rangkaian saat daya menyala.
5. *Opsional:* **catatan pemakaian AI.** Bila memakai AI generatif, jawab nomor 3 sendiri dulu, lalu minta petunjuk bertahap atau kritik atas tabel perbandinganmu, bukan tabel jadi. Catat alatnya, tujuanmu, garis besar perintahmu, bagian yang kamu pakai, dan cara memeriksanya. Jangan menaruh data pribadi atau tugas bernilai pada perintah.

## Latihan bercampur

1. Tulis tiga kasus uji tepi (`c-xi1-m2`) untuk `tambahMelingkar` pada kapasitas 3: jendela kosong, tepat penuh, dan satu sisipan setelah penuh.
2. Histeresis (`c-xi1-m5`) memerlukan satu `bool` untuk mengingat keadaan sebelumnya. Berapa tambahan memori itu dibanding ambang tunggal, dan apa yang didapat dari harga itu?

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `c-xi1-m9` (sekitar satu minggu lagi), `c-xi1-m11` (sekitar tiga minggu lagi), dan `c-xi2-m2` (sekitar delapan minggu lagi). Jawab sekarang lalu simpan.

1. Pada jendela 64, berapa penulisan elemen per sisipan untuk cara geser dan untuk cara melingkar?
2. Mengapa urutan anggota `struct` dapat mengubah `sizeof` padahal isinya sama?
3. Mengapa menulis di luar batas larik bisa menjadi celah keamanan, bukan hanya galat?

## Kesalahan umum

- **Menebak ukuran dan kecepatan.** "Rasanya cukup" bukan jawaban; hitung byte dengan `sizeof` dan operasi dengan hitungan.
- **Mengira `int` selalu sama besar.** Ukurannya bergantung papan; pakai tipe berlebar pasti untuk perhitungan memori.
- **Mengira jumlah anggota menentukan ukuran `struct`.** Padding dapat menambah byte; urutan anggota ikut menentukan.
- **Mengukur waktu tanpa menahan kompilator.** Perulangan yang hasilnya tak dipakai dapat dibuang kompilator sehingga waktunya tampak nol; larik `volatile` atau hasil yang dicetak mencegahnya.
- **Menulis di luar batas larik.** Indeks yang melewati ujung menimpa memori lain dan perilakunya tak terdefinisi; itu sebabnya indeks melingkar memakai `%`, dan nilai masukan dari luar harus diperiksa sebelum dipakai sebagai indeks.

## Cek mandiri

- [ ] Saya dapat menghitung memori larik dan `struct` dengan `sizeof` dan menjelaskan padding.
- [ ] Saya menghitung operasi untuk membandingkan solusi, bukan menebak.
- [ ] Saya dapat menyebut harga cara geser dan cara melingkar.
- [ ] Saya memilih struktur berdasarkan anggaran memori dan beban kerja, dan menjustifikasinya.
- [ ] Saya tahu bahwa ukuran di komputer belum tentu sama di papanku.

## Kunci dan petunjuk

**Ingat kembali.** 1: tanggapan lebih lambat, karena keputusan baru berganti setelah masukan menyeberangi pita lebih jauh. 2: karena pembagian bilangan bulat memotong pecahan; `2500 / 3000` menjadi 0 dan seluruh hasil hilang, sedangkan mengalikan dulu mempertahankan ketelitian. 3: menolak data baru (yang baru hilang) atau membuang yang tertua (yang lama hilang); keduanya kehilangan data, pilihannya bergantung pada data mana yang lebih berharga.

**Prediksi dulu.** 1: cara geser menulis 7 kali untuk menggeser dan 1 kali untuk menaruh nilai baru, total 8; cara melingkar 1. 2: pada 512, cara geser 512 penulisan per sisipan (511 geser + 1), cara melingkar tetap 1. 3: ya, jumlah isi jendelanya sama.

**Contoh setengah jadi.** Isian berurutan: `sizeof` lalu `Pembacaan`, sehingga barisnya `return anggaranByte / sizeof(Pembacaan);`. Pembacaan itu 4 byte, jadi 1024 byte memuat 256. Fungsi lengkapnya dikompilasi dan dijalankan penulis tanpa peringatan.

**Soal Parsons.** Urutan benar: b, e, d, g, f, c, h, i, a, j, k, l.

**Latihan.** 1: pseudocode: tentukan struct, cetak `sizeof(struct)`, hitung `2000 / sizeof`. Hasil di komputer penulis: struct dengan `valid` 12 byte sehingga muat 166; tanpa `valid` 8 byte sehingga muat 250. Anggota `bool` 1 byte memaksa padding 3 byte, sehingga satu anggota kecil menaikkan ukuran 4 byte. 2: cara geser: 100 penulisan untuk 100 sampel pertama, lalu 200 sampel masing-masing 99 geser + 1 tulis = 100, total 100 + 20000 = 20100; cara melingkar: 300. 3: jendela 250 elemen x 2 byte = 500 byte. Cara geser: tiap sisipan 249 geser + 1 tulis = 250, kali 50 per detik = 12500 penulisan per detik; cara melingkar: 50 per detik. Bila papan harus mengerjakan hal lain, pilih cara melingkar; harganya kode pembacaan yang memakai `%` dan lebih sulit dibaca. 4: tidak ada kunci tunggal; jawaban yang baik mencatat kedua waktu dan menyebut bahwa waktu geser naik bersama `KAPASITAS`.

**Latihan bercampur.** 1: kosong: `terisi` 0 dan jumlah isi 0; tepat penuh (sisip 1, 2, 3): isi urut 1, 2, 3 dan `kepala` 0; satu sisipan lagi (4): isi urut 2, 3, 4 dan `kepala` 1 (angka 1 tertimpa). 2: satu `bool`, kira-kira 1 byte (padding bisa menambah); yang didapat adalah keputusan yang tidak berkedip di sekitar batas, dengan harga memori kecil dan tanggapan yang lebih lambat.

**Ulang berjarak.** 1: 64 penulisan (63 geser + 1 tulis) untuk cara geser dan 1 untuk cara melingkar. 2: karena kompilator menyisipkan padding agar anggota terletak di alamat yang cocok; mengurutkan anggota besar dulu mengurangi padding. 3: karena tulisan di luar batas menimpa data lain yang tidak dimaksudkan, termasuk data yang menentukan jalannya program; perilakunya tak terdefinisi menurut standar C++, sehingga penyerang yang mengirim masukan terlalu panjang dapat memanfaatkannya `[belum terverifikasi]`.

## Langkah berikutnya

Modul berikut: `c-xi1-m9` (struktur data: penyangga melingkar), yang merancang dengan lengkap cara melingkar yang baru kamu hitung biayanya. Modul terkait: `c-x2-m9` (antrian), `c-xi1-m3` (`struct`), dan `matkom-pertumbuhan-fungsi` untuk gagasan membandingkan pertumbuhan kerja. Pembacaan lanjut: rujukan `sizeof()` Arduino dan panduan memori Arduino.
