## Untuk siapa modul ini

Modul ini untuk murid kelas XI jalur C (IoT dan robotika), minggu `C-XI1-M3` silabus v1.3: tipe data bentukan. Prasyarat: modul `c-xi1-m2` (kualitas kode dan pengujian) dan `c-x1-m12` (fungsi dan larik). Kamu juga memakai penyangga dari `c-x2-m9` dan pemeriksaan data dari `c-x2-m12`.

Modul ini karangan penyusun dan disetujui pemilik program pada 2026-11-20 (keputusan lewat dialog; catatan tinjauan menjadi tindak lanjut revisi). Ia mendukung butir `F-BK-c` (memilih solusi terbaik dengan struktur data yang lebih kompleks dan abstrak) dan `F-AP-b` (program terstruktur berdasarkan strategi algoritmik) dan tidak dihitung memenuhi butir capaian pembelajaran mana pun. Keluaran minggu ini: modul data. Latihan silabusnya: `struct Pembacaan`.

Minggu ini tidak bertanda (F): semua bagian pokok dikerjakan **tanpa papan**, dengan kertas dan program C++ biasa di komputer. Bila kamu mencoba dengan papan, ikuti aturan keselamatan modul sebelumnya (daya USB saja, cabut kabel sebelum mengubah rangkaian). Nomor pin dan rumus suhu pada contoh Arduino hanya contoh `[belum terverifikasi]` untuk papanmu. Data pada contoh adalah karangan.

## Ingat kembali

Jawab dari ingatan dulu, baru cek di kunci. Soal 1 dari `c-x2-m9`, soal 2 dari `c-xi1-m2`, soal 3 dari `c-x1-m12`.

1. Mengapa larik dan penghitung `terisi` yang selalu dipakai bersama sebaiknya disatukan dalam satu tipe?
2. Pada kasus uji yang disimpan dalam dua larik sejajar (`MASUKAN` dan `HARAPAN`), apa risikonya bila urutannya bergeser atau panjangnya berbeda?
3. Berapa indeks elemen pertama dan terakhir pada larik berisi 5 elemen?

## Tujuan

Setelah modul ini kamu dapat:

- mendefinisikan `struct` yang menyatukan beberapa data yang selalu dipakai bersama, dan membaca anggotanya dengan tanda titik;
- membuat nilai `struct` lewat fungsi yang memeriksa isinya, dan meneruskannya ke fungsi dengan `const` dan rujukan;
- membuat larik `struct` dan `struct` yang berisi larik, lalu menjelaskan mengapa nilai awal penting;
- menggantikan dua larik sejajar dengan satu larik `struct`;
- menghasilkan modul data (keluaran minggu ini).

## Prediksi dulu

Lima pembacaan karangan dimasukkan berurutan ke penyangga berkapasitas 4. Tiap pembacaan terdiri atas detik, suhu, dan cahaya. Satu pembacaan **valid** bila suhu antara 15,0 dan 45,0 dan cahaya antara 0 dan 4095: (0; 28,1; 2100), (30; 28,2; 2150), (60; 85,0; 2100), (90; 28,4; 5000), (120; 28,5; 2200). **Tebak dulu, tulis jawabanmu, baru telusuri.**

1. Berapa dari empat pembacaan yang tersimpan berstatus valid?
2. Apa yang dikembalikan `tambah` untuk pembacaan kelima, dan apa yang terjadi pada isi penyangga?
3. Mengapa pembacaan pada detik 60 dan 90 tetap disimpan walaupun tidak valid?

## Contoh terselesaikan

Satu pembacaan sensor terdiri atas beberapa data yang selalu bepergian bersama: waktunya, suhunya, cahayanya, dan apakah ia valid. Bila disimpan sebagai empat larik terpisah, setiap fungsi harus menerima empat parameter, dan satu indeks yang meleset membuat suhu dipasangkan dengan cahaya yang salah. **`struct`** menyatukan data itu menjadi satu tipe baru. C++ Core Guidelines menganjurkan hal yang sama: data yang saling berkaitan diorganisasi dalam struktur (C.1). Anggota dibaca dengan tanda titik: `p.suhu`.

Fungsi `buatPembacaan` mengisi `struct` dan sekaligus memutuskan `valid`, sehingga aturan pemeriksaan hidup di satu tempat. Fungsi `cetak` menerima `const Pembacaan&`: rujukan menghindari menyalin seluruh isi, dan `const` menjanjikan bahwa fungsi itu tidak mengubahnya. `Penyangga` menyatukan larik dan penghitung `terisi`, seperti pada `c-x2-m9`. Perhatikan `Penyangga b = {};`: kurung kurawal kosong memberi semua anggota nilai awal nol. Tanpa itu, `terisi` berisi sampah dan `tambah` menulis ke tempat acak di memori.

```cpp
// C++17 biasa, jalan di komputer. Diperiksa oleh check:module-code.
#include <iomanip>
#include <iostream>

struct Pembacaan {
  unsigned long detik;
  float suhu;
  int cahaya;
  bool valid;
};

Pembacaan buatPembacaan(unsigned long detik, float suhu, int cahaya) {
  Pembacaan p;
  p.detik = detik;
  p.suhu = suhu;
  p.cahaya = cahaya;
  p.valid = suhu >= 15.0f && suhu <= 45.0f && cahaya >= 0 && cahaya <= 4095;
  return p;
}

void cetak(const Pembacaan& p) {
  std::cout << p.detik << "," << p.suhu << "," << p.cahaya << ","
            << (p.valid ? "valid" : "tidak valid") << "\n";
}

const int KAPASITAS = 4;

struct Penyangga {
  Pembacaan data[KAPASITAS];
  int terisi;
};

bool tambah(Penyangga& b, const Pembacaan& p) {
  if (b.terisi >= KAPASITAS) {
    return false;
  }
  b.data[b.terisi] = p;
  b.terisi++;
  return true;
}

int main() {
  std::cout << std::fixed << std::setprecision(1);
  Penyangga b = {};
  const Pembacaan masuk[] = {
      buatPembacaan(0, 28.1f, 2100), buatPembacaan(30, 28.2f, 2150),
      buatPembacaan(60, 85.0f, 2100), buatPembacaan(90, 28.4f, 5000),
      buatPembacaan(120, 28.5f, 2200)};
  for (const Pembacaan& p : masuk) {
    if (!tambah(b, p)) {
      std::cout << "penuh: pembacaan detik " << p.detik << " ditolak\n";
    }
  }
  int jumlahValid = 0;
  for (int i = 0; i < b.terisi; i++) {
    cetak(b.data[i]);
    if (b.data[i].valid) {
      jumlahValid++;
    }
  }
  std::cout << "tersimpan " << b.terisi << ", valid " << jumlahValid << "\n";
}
```

Keluarannya:

```text
penuh: pembacaan detik 120 ditolak
0,28.1,2100,valid
30,28.2,2150,valid
60,85.0,2100,tidak valid
90,28.4,5000,tidak valid
tersimpan 4, valid 2
```

Pembacaan yang tidak valid tetap disimpan beserta tandanya, seperti baris yang ditolak pada `c-x2-m12` dicatat alasannya, bukan dibuang diam-diam; program lain yang memutuskan memakainya atau tidak. Pada papan, `struct` bekerja sama persis karena Arduino memakai C++. Sketsa di bawah membaca dua sensor ke satu `Pembacaan` dan mengirimnya sebagai satu baris; ia hanya diperiksa sintaksnya terhadap header tiruan, bukan dijalankan pada papan.

```arduino
// Arduino-C++ untuk ESP32. Diperiksa check:module-code terhadap header tiruan (sintaks dan tipe saja, bukan bukti perilaku papan).
const int PIN_SUHU = 34;                 // contoh; periksa papanmu
const int PIN_CAHAYA = 35;               // contoh; periksa papanmu
const unsigned long SELANG_MS = 1000;

struct Pembacaan {
  unsigned long detik;
  float suhu;
  int cahaya;
  bool valid;
};

unsigned long mulai = 0;

float suhuDariMentah(int mentah) {
  return mentah * 50.0f / 4095.0f;       // rumus contoh, bukan rumus sensor nyata
}

Pembacaan baca() {
  Pembacaan p;
  p.detik = millis() / 1000;
  p.suhu = suhuDariMentah(analogRead(PIN_SUHU));
  p.cahaya = analogRead(PIN_CAHAYA);
  p.valid = p.suhu >= 15.0f && p.suhu <= 45.0f;
  return p;
}

void kirim(const Pembacaan& p) {
  Serial.print(p.detik);
  Serial.print(',');
  Serial.print(p.suhu, 1);
  Serial.print(',');
  Serial.print(p.cahaya);
  Serial.print(',');
  Serial.println(p.valid ? "valid" : "tidak valid");
}

void setup() {
  Serial.begin(115200);
  mulai = millis();
}

void loop() {
  if (millis() - mulai >= SELANG_MS) {
    mulai += SELANG_MS;
    kirim(baca());
  }
}
```

## Contoh setengah jadi

Kasus uji dari `c-xi1-m2` dapat disatukan dalam satu `struct` sehingga masukan dan harapan tidak mungkin bergeser. Lengkapi bagian `____`.

```cpp setengah-jadi
// C++17. Lengkapi bagian ____.
#include <iostream>

struct KasusUji {
  ____ masukan;
  const char* ____;
};

const KasusUji DAFTAR[] = {{999, "GELAP"}, {1000, "REDUP"}};

int main() {
  std::cout << DAFTAR[1].____ << "\n";
}
```

## Soal Parsons

Susun baris-baris di bawah (sudah diacak) menjadi fungsi `tambah`.

```text
(a)   b.data[b.terisi] = p;
(b)   return true;
(c) bool tambah(Penyangga& b, const Pembacaan& p) {
(d)   if (b.terisi >= KAPASITAS) {
(e)     return false;
(f)   }
(g)   b.terisi++;
(h) }
```

## Latihan

1. `AI: boleh` **Pseudocode dulu.** Tulis pseudocode lalu fungsi `suhuTertinggi(const Pembacaan data[], int jumlah)` yang mengembalikan suhu tertinggi di antara pembacaan yang **valid**, atau -1 bila tidak ada satu pun yang valid. Uji dengan data karangan, termasuk larik yang semuanya tidak valid (keluaran minggu ini: modul data).
2. `AI: tanpa AI` **Cari galat.** Pada `Penyangga b;` (tanpa `= {}`), `terisi` tidak diberi nilai. Apa risikonya saat `tambah(b, p)` dipanggil pertama kali?
3. `AI: tanpa AI` **Rancang.** Tulis `struct` untuk satu pembacaan sensor jarak: waktunya, jaraknya dalam sentimeter, dan apakah valid. Pilih tipe yang tepat untuk tiap anggota.
4. `AI: boleh` **Tambah anggota.** Tambahkan anggota `float kelembapan` ke `Pembacaan`. Bagian program mana yang harus ikut diubah?
5. *Opsional:* **catatan pemakaian AI.** Bila memakai AI generatif, jawab nomor 1 sendiri dulu, lalu minta petunjuk bertahap atau kritik, bukan program jadi. Catat alatnya, tujuanmu, garis besar perintahmu, bagian yang kamu pakai, dan cara memeriksanya (jalankan atau telusuri). Jangan menaruh data pribadi atau tugas bernilai pada perintah.

## Latihan bercampur

1. Fungsi `perluAlarm` dari `c-xi1-m1` menerima larik `double`. Bagaimana tanda tangannya berubah bila menerima larik `Pembacaan`, dan baris mana di dalamnya yang ikut berubah?
2. Tulis empat kasus uji tepi (`c-xi1-m2`) untuk anggota `valid` hasil `buatPembacaan` pada suhu 14,9; 15,0; 45,0; dan 45,1 (cahaya 2000).

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `c-xi1-m4` (sekitar satu minggu lagi), `c-xi1-m6` (sekitar tiga minggu lagi), dan `c-xi1-m11` (sekitar delapan minggu lagi). Jawab sekarang lalu simpan.

1. Mengapa fungsi `cetak` menerima `const Pembacaan&`, bukan salinan `Pembacaan`?
2. Apa yang terjadi bila `Penyangga` dipakai tanpa memberi nilai awal pada `terisi`?
3. Sebut dua manfaat menyatukan data satu pembacaan dalam satu tipe sebelum mengirimnya ke perangkat lain.

## Kesalahan umum

- **Lupa memberi nilai awal.** `Penyangga b;` meninggalkan `terisi` berisi sampah; `= {}` memperbaikinya.
- **Menyalin `struct` besar ke tiap fungsi.** Teruskan lewat `const` dan rujukan bila fungsi hanya membaca.
- **Mengira `struct` otomatis memeriksa isinya.** Tipe hanya menyatukan data; aturan seperti "suhu antara 15 dan 45" tetap harus ditulis, misalnya di `buatPembacaan`.
- **Menaruh terlalu banyak hal di satu `struct`.** Data yang tidak selalu dipakai bersama sebaiknya tidak dipaksa menyatu.
- **Mengira modul data dengan satu uji lulus sudah benar.** Uji hanya mencakup nilai yang kamu tulis; periksa juga nilai tepat di batas.

## Cek mandiri

- [ ] Saya dapat menulis `struct` dan membaca anggotanya dengan tanda titik.
- [ ] Saya memeriksa isi data di satu fungsi pembuat, bukan di mana-mana.
- [ ] Saya selalu memberi nilai awal pada `struct` yang berisi penghitung.
- [ ] Saya meneruskan `struct` ke fungsi dengan `const` dan rujukan bila hanya dibaca.
- [ ] Saya dapat menggantikan dua larik sejajar dengan satu larik `struct`.

## Kunci dan petunjuk

**Ingat kembali.** 1: karena keduanya harus selalu konsisten; bila satu berubah tanpa yang lain, penghitung tidak lagi menggambarkan isi larik. 2: bila urutan bergeser, masukan dipasangkan dengan harapan yang salah; bila panjang berbeda, pembacaan melewati ujung larik. 3: indeks pertama 0 dan terakhir 4.

**Prediksi dulu.** 1: dua yang valid (detik 0 dan 30); detik 60 (suhu 85,0) dan detik 90 (cahaya 5000) tidak valid. 2: `tambah` mengembalikan `false` karena `terisi` sudah 4 sama dengan kapasitas; isi penyangga tidak berubah, jadi pembacaan kelima hilang. 3: agar program lain dapat melihat dan memutuskan sendiri; membuangnya diam-diam menyembunyikan masalah sensor.

**Contoh setengah jadi.** Isian berurutan: `int`, `harapan`, `harapan`. Program lengkapnya dikompilasi dan dijalankan penulis tanpa peringatan; ia mencetak `REDUP`.

**Soal Parsons.** Urutan benar: c, d, e, f, a, g, b, h.

**Latihan.** 1: pseudocode: simpan `tertinggi` = -1; untuk tiap pembacaan: bila valid dan suhunya lebih besar dari `tertinggi`, simpan; kembalikan `tertinggi`. Pada larik yang semuanya tidak valid, hasilnya -1. 2: `terisi` bisa berisi angka acak (bahkan negatif atau besar), sehingga `b.data[b.terisi]` menulis ke luar larik, yaitu perilaku tak terdefinisi. 3: contoh: `struct PembacaanJarak { unsigned long detik; float cm; bool valid; };` (waktu tidak negatif; jarak berkoma; valid benar atau salah). 4: `buatPembacaan` (parameter dan pengisian), `cetak`, dan tempat lain yang membuat atau mencetak `Pembacaan` (juga kasus uji bila ada).

**Latihan bercampur.** 1: parameter pertama menjadi `const Pembacaan data[]` dan perbandingan menjadi `data[i].suhu > batas`; selebihnya sama. 2: 14,9 menghasilkan `false`; 15,0 `true`; 45,0 `true`; 45,1 `false`.

**Ulang berjarak.** 1: untuk menghindari menyalin seluruh isi tiap pemanggilan, dan `const` menjamin fungsi itu tidak mengubah datanya. 2: `terisi` berisi sampah sehingga `tambah` dapat menulis ke luar larik atau menganggap penyangga penuh. 3: contoh: data yang berkaitan tidak tercecer atau salah pasangan; fungsi pengirim cukup menerima satu parameter.

## Langkah berikutnya

Modul berikut: `c-xi1-m4` (pustaka sendiri), yang menaruh `struct` dan fungsi-fungsinya dalam satu kelas untuk sensor jarak. Modul terkait: `fondasi-representasi-data` untuk gagasan bagaimana data diwakili. Pembacaan lanjut: C++ Core Guidelines bagian kelas dan hierarki kelas (C).
