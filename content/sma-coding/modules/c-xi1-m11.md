## Untuk siapa modul ini

Modul ini untuk murid kelas XI jalur C (IoT dan robotika), minggu `C-XI1-M11` silabus v1.3: pengiriman data antarperangkat II, yaitu merancang format pesan dan pemeriksaan galat sederhana. Prasyarat: modul `c-xi1-m10` (pengiriman data antarperangkat I). Kamu juga memakai `struct` dari `c-xi1-m3`, kasus uji dari `c-xi1-m2`, dan larik berukuran tetap dari `c-xi1-m8`.

Modul ini karangan penyusun dan disetujui pemilik program pada 2026-11-20 (keputusan lewat dialog; catatan tinjauan menjadi tindak lanjut revisi). Ia mendukung butir `F-BK-d` (jaringan; untuk jalur C: pengiriman data antarperangkat) dan tidak dihitung memenuhi butir capaian pembelajaran mana pun; pemetaan `F-BK-d` untuk jalur C bersifat parsial. Keluaran minggu ini: spesifikasi pesan. Latihan silabusnya: tambahkan penanda awal dan jumlah periksa.

Minggu ini tidak bertanda (F): semua bagian pokok dikerjakan **tanpa papan**, dengan kertas dan program C++ biasa di komputer yang menerima aliran karakter karangan. Bila kamu mencoba dengan dua papan, ikuti aturan keselamatan modul sebelumnya: daya USB saja, cabut kabel USB sebelum mengubah sambungan, dan GND bersama. Nama dan pin `Serial2` bergantung papan `[belum terverifikasi]`.

## Ingat kembali

Jawab dari ingatan dulu, baru cek di kunci. Soal 1 dari `c-xi1-m3`, soal 2 dari `c-xi1-m10`, soal 3 dari `c-xi1-m8`.

1. Sebut dua manfaat menyatukan data satu pembacaan dalam satu tipe sebelum mengirimnya ke perangkat lain.
2. Apa fungsi tanda akhir baris `\n` dalam pesan antar papan?
3. Mengapa urutan anggota `struct` dapat mengubah `sizeof` padahal isinya sama?

## Tujuan

Setelah modul ini kamu dapat:

- menulis spesifikasi pesan: penanda awal, ruas, pemisah, jumlah periksa, dan penanda akhir;
- menghitung jumlah periksa (jumlah kode karakter modulo 256) dan menuliskannya dalam dua digit heksadesimal;
- menulis penerima yang memeriksa pesan dan **menyinkronkan ulang** pada penanda awal setelah derau atau pesan terpotong;
- menjelaskan galat apa yang tertangkap jumlah periksa dan galat apa yang lolos;
- menyusun spesifikasi pesan (keluaran minggu ini).

## Prediksi dulu

Jumlah periksa pada modul ini: jumlahkan kode ASCII tiap karakter isi, lalu ambil sisa bagi 256. Kode yang dipakai: `S` = 83, `,` = 44, `1` = 49, `2` = 50. **Tebak dulu, tulis jawabanmu, baru telusuri.**

1. Berapa jumlah periksa isi `S,1` dalam desimal?
2. Isi berubah menjadi `S,2` (satu digit berubah di jalan). Apakah jumlah periksanya berubah?
3. Isi `S,12` berubah menjadi `S,21` (dua digit tertukar). Apakah jumlah periksanya berubah, dan apa artinya bagi penerima?

## Contoh terselesaikan

Pesan baris teks pada `c-xi1-m10` punya dua kelemahan. Penerima yang menyala di tengah aliran tidak tahu di mana pesan dimulai, dan satu karakter yang berubah di jalan (karena kabel longgar atau derau) lolos selama bentuknya masih angka. Maka spesifikasi pesan diperkaya: **penanda awal**, **jumlah periksa** (*checksum*), dan **penanda akhir**.

| Bagian | Isi | Fungsi |
| --- | --- | --- |
| Penanda awal | `$` | penerima memulai ulang di sini, apa pun yang tersisa dibuang |
| Isi | `S,<suhu10>,<cahaya>` | data; `S` menandai jenis pesan |
| Pemisah jumlah periksa | `*` | memisahkan isi dari jumlah periksa |
| Jumlah periksa | dua digit heksadesimal huruf besar | jumlah kode karakter isi, modulo 256 |
| Penanda akhir | `\n` | batas pesan, seperti pada `c-xi1-m10` |

Contoh isi `S,281,2100`: jumlah kodenya 521, dan 521 modulo 256 adalah 9, ditulis `09`. Pesan lengkapnya `$S,281,2100*09`. Penerima menghitung jumlah dari isi yang ia terima, membandingkannya dengan dua digit di belakang `*`, dan menolak pesan bila berbeda. Penanda awal membuat penerima **tersinkron ulang**: bila pesan terputus di tengah, `$` berikutnya membuangnya dan mulai dari awal; karakter sebelum `$` pertama (derau) diabaikan. Penyimpangan format sesudah jumlah periksa cocok (bilangan hilang, huruf kecil, sisa karakter) tetap ditolak oleh `periksaPesan`.

Program di bawah membangun lima pesan karangan dan merusaknya dengan cara berbeda, lalu menjalankan penerima. Fungsi `buatPesan` dan `periksaPesan` tidak menyentuh serial sehingga dapat diuji di komputer (`c-xi1-m2`).

```cpp
// C++17 biasa, jalan di komputer. Diperiksa oleh check:module-code.
#include <iostream>
#include <string>

const int PANJANG_MAKS = 32;

struct Pesan {
  int suhu10;
  int cahaya;
};

unsigned char jumlahPeriksa(const char* isi, int n) {
  unsigned char jumlah = 0;
  for (int i = 0; i < n; i++) {
    jumlah = static_cast<unsigned char>(jumlah + static_cast<unsigned char>(isi[i]));
  }
  return jumlah;
}

int tulisBilangan(char* tujuan, int pos, int nilai) {
  if (nilai < 0) {
    tujuan[pos++] = '-';
    nilai = -nilai;
  }
  char balik[12];
  int n = 0;
  do {
    balik[n++] = static_cast<char>('0' + nilai % 10);
    nilai /= 10;
  } while (nilai > 0);
  while (n > 0) {
    tujuan[pos++] = balik[--n];
  }
  return pos;
}

// Bentuk: $S,<suhu10>,<cahaya>*HH  (HH = jumlah periksa isi, dua digit heksadesimal)
int buatPesan(char* keluar, const Pesan& pesan) {
  const char HEKS[] = "0123456789ABCDEF";
  int pos = 0;
  keluar[pos++] = '$';
  int awalIsi = pos;
  keluar[pos++] = 'S';
  keluar[pos++] = ',';
  pos = tulisBilangan(keluar, pos, pesan.suhu10);
  keluar[pos++] = ',';
  pos = tulisBilangan(keluar, pos, pesan.cahaya);
  unsigned char jp = jumlahPeriksa(keluar + awalIsi, pos - awalIsi);
  keluar[pos++] = '*';
  keluar[pos++] = HEKS[jp >> 4];
  keluar[pos++] = HEKS[jp & 0x0F];
  keluar[pos] = '\0';
  return pos;
}

int nilaiHeks(char c) {
  if (c >= '0' && c <= '9') {
    return c - '0';
  }
  if (c >= 'A' && c <= 'F') {
    return c - 'A' + 10;
  }
  return -1;
}

bool bacaBilangan(const char*& p, int& hasil) {
  int tanda = 1;
  if (*p == '-') {
    tanda = -1;
    p++;
  }
  if (*p < '0' || *p > '9') {
    return false;
  }
  int nilai = 0;
  while (*p >= '0' && *p <= '9') {
    nilai = nilai * 10 + (*p - '0');
    p++;
  }
  hasil = tanda * nilai;
  return true;
}

// true hanya bila awal, jumlah periksa, dan isi semuanya sesuai spesifikasi.
bool periksaPesan(const char* baris, Pesan& pesan) {
  if (baris[0] != '$') {
    return false;
  }
  int bintang = -1;
  for (int i = 1; baris[i] != '\0'; i++) {
    if (baris[i] == '*') {
      bintang = i;
      break;
    }
  }
  if (bintang < 0) {
    return false;
  }
  int tinggi = nilaiHeks(baris[bintang + 1]);
  int rendah = tinggi < 0 ? -1 : nilaiHeks(baris[bintang + 2]);
  if (tinggi < 0 || rendah < 0 || baris[bintang + 3] != '\0') {
    return false;
  }
  if (jumlahPeriksa(baris + 1, bintang - 1) != tinggi * 16 + rendah) {
    return false;
  }
  const char* p = baris + 1;
  if (p[0] != 'S' || p[1] != ',') {
    return false;
  }
  p += 2;
  if (!bacaBilangan(p, pesan.suhu10) || *p != ',') {
    return false;
  }
  p++;
  return bacaBilangan(p, pesan.cahaya) && *p == '*';
}

enum HasilTerima { BELUM, SIAP, DIBUANG };

struct Penerima {
  char baris[PANJANG_MAKS];
  int panjang;
  bool mulai;
  bool kepanjangan;
};

HasilTerima terima(Penerima& r, char c) {
  if (c == '\r') {
    return BELUM;
  }
  if (c == '$') {  // penanda awal: mulai ulang, apa pun yang tersisa dibuang
    r.mulai = true;
    r.kepanjangan = false;
    r.panjang = 0;
  }
  if (!r.mulai) {
    return BELUM;  // derau sebelum penanda awal diabaikan
  }
  if (c != '\n') {
    if (r.panjang < PANJANG_MAKS - 1) {
      r.baris[r.panjang++] = c;
    } else {
      r.kepanjangan = true;
    }
    return BELUM;
  }
  HasilTerima hasil = r.kepanjangan ? DIBUANG : SIAP;
  r.baris[r.panjang] = '\0';
  r.panjang = 0;
  r.mulai = false;
  r.kepanjangan = false;
  return hasil;
}

int main() {
  char a[PANJANG_MAKS];
  buatPesan(a, {281, 2100});
  std::cout << "pesan pertama: " << a << "\n";
  std::string aliran;
  aliran += std::string(a) + "\r\n";
  char b[PANJANG_MAKS];
  buatPesan(b, {285, 2150});
  b[9] = '6';  // satu digit berubah di jalan: 2150 menjadi 2160
  aliran += std::string(b) + "\n";
  aliran += "xx#";  // derau sebelum pesan
  char c[PANJANG_MAKS];
  buatPesan(c, {290, 2200});
  aliran += std::string(c) + "\n";
  aliran += "$S,28";  // pesan terputus; pesan berikut mulai di tengahnya
  char d[PANJANG_MAKS];
  buatPesan(d, {295, 2250});
  aliran += std::string(d) + "\n";
  char e[PANJANG_MAKS];
  buatPesan(e, {281, 2300});
  char tmp = e[4];  // dua digit tertukar di jalan: 281 menjadi 218
  e[4] = e[5];
  e[5] = tmp;
  aliran += std::string(e) + "\n";

  Penerima r = {};
  int diterima = 0;
  int ditolak = 0;
  for (char ch : aliran) {
    if (terima(r, ch) == SIAP) {
      Pesan p = {};
      if (periksaPesan(r.baris, p)) {
        diterima++;
        std::cout << "diterima: suhu10=" << p.suhu10 << " cahaya=" << p.cahaya << "\n";
      } else {
        ditolak++;
        std::cout << "ditolak: " << r.baris << "\n";
      }
    }
  }
  std::cout << "diterima " << diterima << ", ditolak " << ditolak << "\n";
}
```

Keluarannya:

```text
pesan pertama: $S,281,2100*09
diterima: suhu10=281 cahaya=2100
ditolak: $S,285,2160*12
diterima: suhu10=290 cahaya=2200
diterima: suhu10=295 cahaya=2250
diterima: suhu10=218 cahaya=2300
diterima 4, ditolak 1
```

Telusuri hasilnya. Pesan kedua mulanya `S,285,2150` dengan jumlah 530, yaitu 18 atau `12`. Satu digit berubah (`5` menjadi `6`, kode naik 1), sehingga isi yang diterima berjumlah 19 (`13`), berbeda dari `12`: **ditolak**. Derau `xx#` sebelum `$` diabaikan, dan `$S,28` yang terputus dibuang oleh `$` berikutnya, jadi pesan ketiga dan keempat diterima. Pesan kelima menunjukkan **batas jumlah periksa**: `281` yang menjadi `218` memiliki jumlah yang sama, karena penjumlahan tidak peduli urutan, sehingga pesan **diterima dengan nilai yang salah**. Jumlah periksa menangkap banyak galat acak, tetapi tidak semua: penukaran karakter dan galat yang saling meniadakan lolos. Jumlah periksa juga **bukan keamanan**: siapa pun dapat menghitungnya dan memalsukan pesan (dibahas di `c-xi2-m2`); fungsinya hanya mendeteksi kerusakan tak sengaja. Hasil ini berasal dari aliran karangan di komputer; derau sungguhan dan waktu belum teruji.

Sketsa pengirim di bawah memakai fungsi yang sama untuk papan A. Penerimanya adalah gabungan `terima` dan `periksaPesan` di atas dengan `Serial2.read()` seperti pada `c-xi1-m10`. Ia hanya diperiksa sintaksnya terhadap header tiruan, tidak dijalankan pada papan.

```arduino
// Arduino-C++ untuk ESP32, papan A (pengirim). Diperiksa check:module-code terhadap header tiruan (sintaks dan tipe saja, bukan bukti perilaku papan).

const int PIN_SUHU = 34;                 // contoh; periksa papanmu
const int PIN_CAHAYA = 35;               // contoh; periksa papanmu
const unsigned long BAUD = 115200;       // harus sama dengan papan B
const unsigned long SELANG_MS = 1000;

struct Pesan {
  int suhu10;
  int cahaya;
};

unsigned long mulai = 0;

unsigned char jumlahPeriksa(const char* isi, int n) {
  unsigned char jumlah = 0;
  for (int i = 0; i < n; i++) {
    jumlah = static_cast<unsigned char>(jumlah + static_cast<unsigned char>(isi[i]));
  }
  return jumlah;
}

int tulisBilangan(char* tujuan, int pos, int nilai) {
  if (nilai < 0) {
    tujuan[pos++] = '-';
    nilai = -nilai;
  }
  char balik[12];
  int n = 0;
  do {
    balik[n++] = static_cast<char>('0' + nilai % 10);
    nilai /= 10;
  } while (nilai > 0);
  while (n > 0) {
    tujuan[pos++] = balik[--n];
  }
  return pos;
}

int buatPesan(char* keluar, const Pesan& pesan) {
  const char HEKS[] = "0123456789ABCDEF";
  int pos = 0;
  keluar[pos++] = '$';
  int awalIsi = pos;
  keluar[pos++] = 'S';
  keluar[pos++] = ',';
  pos = tulisBilangan(keluar, pos, pesan.suhu10);
  keluar[pos++] = ',';
  pos = tulisBilangan(keluar, pos, pesan.cahaya);
  unsigned char jp = jumlahPeriksa(keluar + awalIsi, pos - awalIsi);
  keluar[pos++] = '*';
  keluar[pos++] = HEKS[jp >> 4];
  keluar[pos++] = HEKS[jp & 0x0F];
  keluar[pos] = '\0';
  return pos;
}

void setup() {
  Serial2.begin(BAUD);                   // pin bawaan Serial2: periksa papanmu
  mulai = millis();
}

void loop() {
  if (millis() - mulai >= SELANG_MS) {
    mulai += SELANG_MS;
    Pesan p = {analogRead(PIN_SUHU) * 500 / 4095, analogRead(PIN_CAHAYA)};  // rumus suhu contoh
    char keluar[32];
    buatPesan(keluar, p);
    Serial2.print(keluar);
    Serial2.print('\n');
  }
}
```

## Contoh setengah jadi

Lengkapi `nilaiHeks`, yang mengubah satu karakter heksadesimal huruf besar menjadi nilainya, atau -1 bila bukan. Bagian `____` ada pada tiga tempat.

```cpp setengah-jadi
// C++17. Lengkapi bagian ____.
int nilaiHeks(char c) {
  if (c >= '0' && c <= '9') {
    return c - '____';
  }
  if (c >= 'A' && c <= 'F') {
    return c - 'A' + ____;
  }
  return ____;
}
```

## Soal Parsons

Susun baris-baris di bawah (sudah diacak) menjadi `jumlahPeriksa`.

```text
(a)   for (int i = 0; i < n; i++) {
(b)     jumlah = static_cast<unsigned char>(jumlah + static_cast<unsigned char>(isi[i]));
(c) unsigned char jumlahPeriksa(const char* isi, int n) {
(d)   unsigned char jumlah = 0;
(e)   return jumlah;
(f)   }
(g) }
```

## Latihan

1. `AI: boleh` **Pseudocode dulu.** Tulis spesifikasi pesan baru dengan tiga ruas, `S,<suhu10>,<cahaya>,<nomor>`, dengan nomor urut pesan, lalu hitung pesan lengkap untuk suhu10 281, cahaya 2100, nomor 7 (kode `7` adalah 55, dan jumlah isi `S,281,2100` adalah 521). Keluaran minggu ini: spesifikasi itu dalam tabel seperti di contoh.
2. `AI: tanpa AI` **Hitung.** Berapa jumlah periksa (desimal dan heksadesimal) isi `S,5`, dan bagaimana pesan lengkapnya? (`5` adalah 53.)
3. `AI: tanpa AI` **Analisis.** Untuk tiap galat berikut pada isi `S,300,1500`, apakah jumlah periksa mendeteksinya: (a) satu digit berubah, (b) dua digit tertukar, (c) koma pertama bergeser satu tempat sehingga isi menjadi `S,3,001500`?
4. `AI: boleh` **Bila dua papan tersedia (opsional).** Tambahkan jumlah periksa ke pengirim dan penerima modul `c-xi1-m10`, kirim lima pesan, lalu cabut dan pasang kabel RX dengan daya dicabut saat memindahkan, dan catat berapa pesan yang ditolak. Tanpa papan, kerjakan nomor 1 sampai 3.
5. *Opsional:* **catatan pemakaian AI.** Bila memakai AI generatif, jawab nomor 3 sendiri dulu, lalu minta petunjuk bertahap atau kritik atas spesifikasimu, bukan spesifikasi jadi. Catat alatnya, tujuanmu, garis besar perintahmu, bagian yang kamu pakai, dan cara memeriksanya. Jangan menaruh data pribadi atau tugas bernilai pada perintah.

## Latihan bercampur

1. Tulis lima kasus uji tepi (`c-xi1-m2`) untuk `periksaPesan` pada isi `S,5,6` (jumlah periksa benar `16`): tanpa `$`, tanpa `*`, jumlah periksa salah (`17`), sisa karakter di belakang jumlah periksa, dan pesan yang benar. Tulis hasil yang diharapkan.
2. Penerima di papan B memasukkan suhu dari pesan yang diterima ke penyangga melingkar (`c-xi1-m9`) untuk rata-rata lima pesan terakhir. Apa yang terjadi pada rata-rata bila satu pesan ditolak, dan apakah itu masuk akal?

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `c-xi1-m12` (sekitar satu minggu lagi), `c-xi1-m14` (sekitar tiga minggu lagi), dan `c-xi2-m5` (sekitar delapan minggu lagi). Jawab sekarang lalu simpan.

1. Mengapa jumlah periksa yang cocok belum menjamin isi pesan benar?
2. Hitung jumlah periksa (jumlah kode karakter modulo 256) untuk isi `AB` (A = 65, B = 66).
3. Mengapa pengirim dan penerima harus sepakat pada format pesan, dan apa yang terjadi bila tidak?

## Kesalahan umum

- **Mengira jumlah periksa melindungi dari pemalsuan.** Ia hanya mendeteksi kerusakan tak sengaja; siapa pun dapat menghitung ulang.
- **Menghitung jumlah periksa di atas bagian yang berbeda di dua sisi.** Bila pengirim menyertakan `$` dan penerima tidak (atau sebaliknya), semua pesan ditolak.
- **Lupa membuang sisa karakter saat `$` datang.** Pesan terputus tersambung dengan pesan berikutnya dan membentuk pesan palsu.
- **Memakai huruf kecil pada heksadesimal padahal spesifikasi huruf besar.** Pemeriksa yang ketat menolak `b0` walaupun nilainya sama dengan `B0`; spesifikasi harus jelas dan dipatuhi kedua sisi.
- **Menyamakan "diterima" dengan "benar".** Pesan `S,218` yang berasal dari `S,281` lolos jumlah periksa.

## Cek mandiri

- [ ] Saya dapat menyebut bagian pesan beserta fungsinya: penanda awal, isi, jumlah periksa, penanda akhir.
- [ ] Saya dapat menghitung jumlah periksa dan menuliskannya dalam heksadesimal.
- [ ] Saya menulis penerima yang menyinkronkan ulang pada penanda awal.
- [ ] Saya dapat menyebut galat yang tertangkap dan yang lolos jumlah periksa.
- [ ] Saya menulis spesifikasi pesan yang tidak menimbulkan dua tafsir.

## Kunci dan petunjuk

**Ingat kembali.** 1: contoh: data yang berkaitan tidak tercecer atau salah pasangan; fungsi pengirim cukup menerima satu parameter. 2: tanda itu menandai batas satu pesan; aliran byte tidak punya batas sendiri. 3: karena kompilator menyisipkan padding agar anggota terletak di alamat yang cocok; mengurutkan anggota besar dulu mengurangi padding.

**Prediksi dulu.** 1: 83 + 44 + 49 = 176 (heksadesimal `B0`). 2: ya, berubah: 83 + 44 + 50 = 177, sehingga penerima menolak pesan. 3: tidak berubah: `S,12` dan `S,21` sama-sama berjumlah 83 + 44 + 49 + 50 = 226, sehingga penerima menerima pesan yang salah; jumlah penjumlahan tidak peduli urutan.

**Contoh setengah jadi.** Isian berurutan: `0`, `10`, `-1`, sehingga `return c - '0';`, `return c - 'A' + 10;`, `return -1;`. Fungsi lengkapnya dikompilasi dan dijalankan penulis tanpa peringatan.

**Soal Parsons.** Urutan benar: c, d, a, b, f, e, g.

**Latihan.** 1: tabel: penanda awal `$`; isi `S,<suhu10>,<cahaya>,<nomor>`; pemisah `*`; jumlah periksa dua digit heksadesimal huruf besar; penanda akhir `\n`. Jumlah isi `S,281,2100,7` adalah 521 + 44 + 55 = 620, dan 620 modulo 256 adalah 108, yaitu `6C`. Pesan lengkap: `$S,281,2100,7*6C`. 2: 83 + 44 + 53 = 180, heksadesimal `B4`; pesan `$S,5*B4`. 3: (a) ya, jumlah berubah (kecuali dua galat saling meniadakan); (b) tidak, penjumlahan tidak peduli urutan; (c) tidak, jumlah isi `S,300,1500` dan `S,3,001500` sama-sama 4 (sisa bagi 256), sehingga lolos jumlah periksa; bentuknya pun masih sah (`suhu10` terbaca 3 dan `cahaya` terbaca 1500 karena nol di depan diabaikan), jadi pesan diterima dengan suhu yang salah. 4: tidak ada kunci tunggal; jawaban yang baik mencatat jumlah pesan ditolak dan menyebut bahwa pesan yang ditolak tidak memengaruhi keputusan.

**Latihan bercampur.** 1: `S,5,6*16` (tanpa `$`): gagal; `$S,5,6` (tanpa `*`): gagal; `$S,5,6*17`: gagal karena jumlah periksa benar `16`; `$S,5,6*16x`: gagal karena ada sisa karakter; `$S,5,6*16`: berhasil. Hasil ini dijalankan penulis pada `periksaPesan` di atas. 2: pesan yang ditolak tidak masuk ke penyangga sehingga rata-rata tetap dari lima pesan terakhir yang sah; itu masuk akal, karena nilai yang mungkin rusak tidak boleh memengaruhi keputusan, dengan harga rata-rata sedikit tertinggal.

**Ulang berjarak.** 1: karena banyak galat lolos jumlah periksa, seperti dua digit tertukar atau galat yang saling meniadakan; ia mendeteksi kerusakan acak, bukan membuktikan kebenaran. 2: 65 + 66 = 131. 3: karena penerima hanya dapat menafsirkan aliran byte menurut aturan yang diketahuinya; bila format berbeda, pesan ditolak atau, lebih buruk, terbaca dengan arti yang salah.

## Langkah berikutnya

Modul berikut: `c-xi1-m12` (pemecahan masalah sambungan), yang memakai pengamatan seperti jumlah pesan sah dan ditolak untuk menelusuri sumber gangguan. Modul terkait: `c-xi1-m10` (protokol awal), `FND-X1-M5`, dan `c-xi2-m2` untuk keamanan konektivitas. Pembacaan lanjut: rujukan `Serial.read()` dan `Serial.available()` Arduino.
