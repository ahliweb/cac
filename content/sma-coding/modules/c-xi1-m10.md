## Untuk siapa modul ini

Modul ini untuk murid kelas XI jalur C (IoT dan robotika), minggu `C-XI1-M10` silabus v1.3: pengiriman data antarperangkat I, yaitu mengirim data antar dua papan lewat serial (F). Prasyarat: modul `c-xi1-m9` (penyangga melingkar), `c-x1-m10` (keluaran serial), dan `FND-X1-M5` (data dikirim dalam potongan dan pemecahan masalah jaringan dasar). Kamu juga memakai `struct` dari `c-xi1-m3` dan kasus uji dari `c-xi1-m2`.

Modul ini berstatus DRAF: karangan penyusun, belum ditinjau pemilik. Ia mendukung butir `F-BK-d` (jaringan; untuk jalur C: pengiriman data antarperangkat) dan tidak dihitung memenuhi butir capaian pembelajaran mana pun; pemetaan `F-BK-d` untuk jalur C bersifat parsial. Keluaran minggu ini: protokol sederhana. Latihan silabusnya: kirim pembacaan dari papan A ke papan B.

Ada dua cara mengerjakan. **Dengan dua papan (F):** kelompok menyambung dua papan sesuai lembar guru. **Tanpa papan:** kamu menjalankan "papan tiruan" di komputer yang menerima aliran karakter karangan, dan semua bagian pokok tetap dapat dikerjakan. Nama dan nomor pin serial kedua (`Serial2`) berbeda antar papan, dan sebagian papan ESP32 tidak punya UART ketiga; periksa dokumentasi papanmu dan lembar guru `[belum terverifikasi]`. Nilai kecepatan dan ukuran pada contoh hanya contoh.

## Keselamatan perangkat

- Daya hanya dari kabel USB (tiap papan satu kabel). Tidak ada listrik jaringan (220 V) dan tidak ada baterai pada modul ini.
- Cabut kedua kabel USB sebelum memasang, memindahkan, atau mencabut kabel jumper antar papan.
- Sambungkan **GND ke GND**, lalu TX papan A ke RX papan B dan RX papan A ke TX papan B (silang). Jangan menyambung pin ke daya atau ke perangkat bertegangan lain; tegangan logika pin papan dan perangkat lain berbeda dan harus dicocokkan menurut lembar data papanmu `[belum terverifikasi]`.
- Tidak ada solder. Papan percobaan dan kabel jumper sudah cukup.
- Modul ini tidak memakai kamera atau mikrofon, dan tidak mengukur tubuh siapa pun.
- Papan atau kabel yang terasa panas, berbau, atau berasap: cabut kabel USB dan panggil guru.

## Ingat kembali

Jawab dari ingatan dulu, baru cek di kunci. Soal 1 dari `c-xi1-m2`, soal 2 dari `c-xi1-m7`, soal 3 dari `c-xi1-m9`, soal 4 dari `c-x1-m10`.

1. Sebut tiga ciri kode yang mudah dibaca orang lain.
2. Sebut satu keuntungan dan satu kerugian kendali proporsional dibandingkan hidup-mati.
3. Bila penyangga penuh dan data baru datang, apa yang dilakukan penyangga melingkar pada modul `c-xi1-m9`, dan apa harganya?
4. Mengapa kecepatan (baud) di program dan di monitor serial harus sama?

## Tujuan

Setelah modul ini kamu dapat:

- menjelaskan pengiriman serial antar dua papan: TX ke RX secara silang, GND bersama, dan baud yang disepakati;
- menjelaskan mengapa aliran byte tidak punya batas pesan dan bagaimana tanda akhir baris menjadi batasnya;
- menulis penerima yang membaca karakter satu per satu tanpa `delay`, dengan penyangga berukuran tetap;
- menguraikan baris teks menjadi nilai dan menolak baris yang rusak;
- menuliskan protokol sederhana (keluaran minggu ini): apa yang dikirim, dalam urutan apa, dan bagaimana batasnya.

## Prediksi dulu

Papan A mengirim pesan berbentuk `suhu10,cahaya` diakhiri `\n`, dengan `suhu10` suhu dikali 10 (281 berarti 28,1 derajat). Penerima mengumpulkan karakter sampai `\n`. Data tiba **terpotong** karena aliran tidak peduli batas pesan: potongan pertama `281,2100\n29`, potongan kedua `0,2200\n`. **Tebak dulu, tulis jawabanmu, baru telusuri.**

1. Berapa baris yang siap setelah potongan pertama, dan apa isinya?
2. Apa isi baris yang siap setelah potongan kedua?
3. Bila `\n` tidak pernah datang, apa yang terjadi pada penerima yang tidak menjaga panjang baris?

## Contoh terselesaikan

Kabel serial membawa **aliran byte**, bukan pesan. Pengirim dan penerima tidak berbagi jam; mereka hanya **sepakat** pada kecepatan (baud), sehingga penerima tahu seberapa lama satu bit berlangsung. Bila baud berbeda, byte dibaca salah dan yang muncul huruf acak, seperti pada `c-x1-m10`. Tegangan pun hanya bermakna terhadap acuan yang sama, maka GND kedua papan disambung. Karena aliran tidak punya batas pesan, **batas itu harus kita buat sendiri**. Cara paling sederhana: satu pesan satu baris teks, diakhiri `\n`. Pesan teks juga mudah dibaca manusia saat diagnosis (`c-xi1-m12`).

Perhatikan satu kebiasaan Arduino: `Serial.println` mengirim `\r` lalu `\n` (lihat rujukan `Serial.println` di akhir modul). Penerima yang hanya mencari `\n` akan menemukan `\r` terselip di ujung baris dan menolak semuanya, jadi `\r` diabaikan. Penerima juga **tidak boleh menunggu** (`delay`, `c-x2-m7`): ia memproses karakter yang sudah ada di tiap putaran `loop`. Baris disimpan di larik berukuran tetap (`c-xi1-m8`): bila baris melebihi kapasitas, penerima menandainya `kepanjangan` dan membuangnya saat `\n` tiba, bukan menumbuhkan larik atau menulis di luar larik. Penerima menerima masukan dari luar yang tidak dapat dipercaya ukurannya.

`urai` memeriksa bentuk baris: bilangan, koma, bilangan, lalu akhir baris, tanpa sisa. Lolos `urai` hanya berarti **bentuknya** benar; apakah suhunya masuk akal (`valid` pada `c-xi1-m3`) adalah pemeriksaan lain.

```cpp
// C++17 biasa, jalan di komputer. Diperiksa oleh check:module-code.
#include <iostream>
#include <string>

const int PANJANG_MAKS = 16;

struct Pesan {
  int suhu10;  // suhu dikali 10, mis. 281 berarti 28,1 derajat
  int cahaya;
};

enum HasilTerima { BELUM, SIAP, DIBUANG };

struct Penerima {
  char baris[PANJANG_MAKS];
  int panjang;
  bool kepanjangan;
};

HasilTerima terima(Penerima& r, char c) {
  if (c == '\r') {
    return BELUM;  // println mengirim "\r\n"; karakter \r diabaikan
  }
  if (c != '\n') {
    if (r.panjang < PANJANG_MAKS - 1) {
      r.baris[r.panjang] = c;
      r.panjang++;
    } else {
      r.kepanjangan = true;
    }
    return BELUM;
  }
  HasilTerima hasil = r.kepanjangan ? DIBUANG : SIAP;
  r.baris[r.panjang] = '\0';
  r.panjang = 0;
  r.kepanjangan = false;
  return hasil;
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

bool urai(const char* baris, Pesan& pesan) {
  const char* p = baris;
  if (!bacaBilangan(p, pesan.suhu10) || *p != ',') {
    return false;
  }
  p++;
  return bacaBilangan(p, pesan.cahaya) && *p == '\0';
}

int main() {
  // Aliran karakter karangan: tiga baris sah, satu terlalu panjang, satu rusak.
  const std::string ALIRAN =
      "281,2100\r\n285,2150\r\n0123456789012345678\n290,\n-5,3000\n";
  Penerima r = {};
  int sah = 0;
  int dibuang = 0;
  int rusak = 0;
  for (char c : ALIRAN) {
    HasilTerima h = terima(r, c);
    if (h == DIBUANG) {
      dibuang++;
      std::cout << "dibuang: baris terlalu panjang\n";
    } else if (h == SIAP) {
      Pesan p = {};
      if (urai(r.baris, p)) {
        sah++;
        std::cout << "sah: suhu10=" << p.suhu10 << " cahaya=" << p.cahaya << "\n";
      } else {
        rusak++;
        std::cout << "rusak: \"" << r.baris << "\"\n";
      }
    }
  }
  std::cout << "sah " << sah << ", rusak " << rusak << ", dibuang " << dibuang << "\n";
}
```

Keluarannya:

```text
sah: suhu10=281 cahaya=2100
sah: suhu10=285 cahaya=2150
dibuang: baris terlalu panjang
rusak: "290,"
sah: suhu10=-5 cahaya=3000
sah 3, rusak 1, dibuang 1
```

Baca hasilnya dengan jujur. Dua baris pertama lolos walaupun satu memakai `\r\n`. Baris ketiga 19 karakter, melebihi 15 yang muat (satu tempat dipakai `\0` penutup), sehingga dibuang. Baris `290,` rusak karena tidak ada bilangan kedua. Baris `-5,3000` **lolos** `urai`, tetapi suhu -0,5 derajat belum tentu masuk akal di ruangan; kelolosan bentuk bukan kelolosan makna. Penerima ini dicoba pada aliran karangan di komputer; kabel, derau, dan waktu sungguhan baru teruji dengan dua papan.

Sketsa di bawah ada dua: pengirim untuk papan A dan penerima untuk papan B. Kedua hanya diperiksa sintaksnya terhadap header tiruan, tidak dijalankan pada papan.

```arduino
// Arduino-C++ untuk ESP32, papan A (pengirim). Diperiksa check:module-code terhadap header tiruan (sintaks dan tipe saja, bukan bukti perilaku papan).

const int PIN_SUHU = 34;                 // contoh; periksa papanmu
const int PIN_CAHAYA = 35;               // contoh; periksa papanmu
const unsigned long BAUD = 115200;       // harus sama dengan papan B
const unsigned long SELANG_MS = 1000;

unsigned long mulai = 0;

void setup() {
  Serial.begin(115200);                  // monitor serial di komputer
  Serial2.begin(BAUD);                   // pin bawaan Serial2: periksa papanmu
  mulai = millis();
}

void loop() {
  if (millis() - mulai >= SELANG_MS) {
    mulai += SELANG_MS;
    int suhu10 = analogRead(PIN_SUHU) * 500 / 4095;   // rumus contoh, bukan rumus sensor nyata
    int cahaya = analogRead(PIN_CAHAYA);
    Serial2.print(suhu10);
    Serial2.print(',');
    Serial2.println(cahaya);             // println menambah \r\n
  }
}
```

```arduino
// Arduino-C++ untuk ESP32, papan B (penerima). Diperiksa check:module-code terhadap header tiruan (sintaks dan tipe saja, bukan bukti perilaku papan).

const unsigned long BAUD = 115200;       // harus sama dengan papan A
const int PANJANG_MAKS = 16;

struct Pesan {
  int suhu10;
  int cahaya;
};

char baris[PANJANG_MAKS];
int panjang = 0;
bool kepanjangan = false;

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

bool urai(const char* teks, Pesan& pesan) {
  const char* p = teks;
  if (!bacaBilangan(p, pesan.suhu10) || *p != ',') {
    return false;
  }
  p++;
  return bacaBilangan(p, pesan.cahaya) && *p == '\0';
}

void setup() {
  Serial.begin(115200);
  Serial2.begin(BAUD);
}

void loop() {
  while (Serial2.available() > 0) {      // proses yang sudah ada, tanpa menunggu
    char c = static_cast<char>(Serial2.read());
    if (c == '\r') {
      continue;
    }
    if (c != '\n') {
      if (panjang < PANJANG_MAKS - 1) {
        baris[panjang++] = c;
      } else {
        kepanjangan = true;
      }
      continue;
    }
    baris[panjang] = '\0';
    Pesan p = {};
    if (!kepanjangan && urai(baris, p)) {
      Serial.print("suhu10=");
      Serial.print(p.suhu10);
      Serial.print(" cahaya=");
      Serial.println(p.cahaya);
    } else {
      Serial.println("baris ditolak");
    }
    panjang = 0;
    kepanjangan = false;
  }
}
```

## Contoh setengah jadi

Lengkapi `terima` yang mengabaikan `\r`, menolak baris terlalu panjang, dan menandai baris siap saat `\n`. Bagian `____` ada pada tiga tempat.

```cpp setengah-jadi
// C++17. Lengkapi bagian ____.
const int PANJANG_MAKS = 16;

struct Penerima {
  char baris[PANJANG_MAKS];
  int panjang;
  bool kepanjangan;
};

bool terima(Penerima& r, char c) {  // true bila satu baris utuh siap
  if (c == '____') {
    return false;
  }
  if (c != '____') {
    if (r.panjang < ____ - 1) {
      r.baris[r.panjang++] = c;
    } else {
      r.kepanjangan = true;
    }
    return false;
  }
  r.baris[r.panjang] = '\0';
  r.panjang = 0;
  bool sah = !r.kepanjangan;
  r.kepanjangan = false;
  return sah;
}
```

## Soal Parsons

Susun baris-baris di bawah (sudah diacak) menjadi bagian pengirim `loop`: tiap `SELANG_MS`, kirim `suhu10`, koma, lalu `cahaya` dan akhir baris.

```text
(a)     int cahaya = analogRead(PIN_CAHAYA);
(b) void loop() {
(c)     Serial2.print(',');
(d)     mulai += SELANG_MS;
(e)     Serial2.print(suhu10);
(f)   if (millis() - mulai >= SELANG_MS) {
(g)     int suhu10 = analogRead(PIN_SUHU) * 500 / 4095;
(h)     Serial2.println(cahaya);
(i)   }
(j) }
```

## Latihan

1. `AI: boleh` **Pseudocode dulu.** Tulis pseudocode lalu fungsi `masukAkal(const Pesan&)` yang benar bila `suhu10` antara 150 dan 450 dan `cahaya` antara 0 dan 4095. Uji pada (281, 2100), (-5, 3000), dan (281, 5000).
2. `AI: tanpa AI` **Telusuri.** Potongan `12,3\n4` lalu `5,6\n` diterima penerima di atas. Berapa baris siap setelah tiap potongan, dan apa isinya?
3. `AI: tanpa AI` **Cari galat.** Seorang murid membuang baris `if (c == '\r') return BELUM;` dari `terima`. Papan A memakai `println`. Apa yang terjadi pada tiap baris, dan mengapa?
4. `AI: boleh` **Bila dua papan tersedia (opsional).** Sambung dua papan sesuai lembar guru dengan daya dicabut, unggah pengirim dan penerima, lalu catat lima baris yang diterima. Tanpa papan, kerjakan nomor 1 sampai 3. Jangan mengubah kabel saat daya menyala.
5. *Opsional:* **catatan pemakaian AI.** Bila memakai AI generatif, jawab nomor 2 sendiri dulu, lalu minta petunjuk bertahap atau kritik atas protokolmu, bukan protokol jadi. Catat alatnya, tujuanmu, garis besar perintahmu, bagian yang kamu pakai, dan cara memeriksanya. Jangan menaruh data pribadi atau tugas bernilai pada perintah.

## Latihan bercampur

1. Tulis lima kasus uji tepi (`c-xi1-m2`) untuk `urai`: teks kosong, `281,`, `,2100`, `281,2100`, dan `281,21x0`, lengkap dengan hasil yang diharapkan.
2. Papan B memakai keputusan hidup-mati (`c-xi1-m6`) dari pesan yang diterima. Bila tidak ada pesan sah selama 5 detik, apa yang sebaiknya dilakukan pemanas, dan mengapa?

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `c-xi1-m11` (sekitar satu minggu lagi), `c-xi1-m13` (sekitar tiga minggu lagi), dan `c-xi2-m4` (sekitar delapan minggu lagi). Jawab sekarang lalu simpan.

1. Apa fungsi tanda akhir baris `\n` dalam pesan antar papan?
2. Mengapa kedua papan harus berbagi GND dan memakai baud yang sama?
3. Mengapa penerima memakai penyangga berukuran tetap dan membuang baris yang terlalu panjang, bukan menumbuhkannya?

## Kesalahan umum

- **Menyambung TX ke TX.** Sambungan yang benar silang: TX papan A ke RX papan B, dan sebaliknya.
- **Lupa menyambung GND.** Tanpa acuan bersama, sinyal tidak terbaca andal.
- **Baud berbeda di dua sisi.** Hasilnya huruf acak, bukan pesan yang rusak sedikit.
- **Mengira satu `read` sama dengan satu pesan.** Data tiba terpotong; kumpulkan sampai tanda akhir baris.
- **Lupa `\r` dari `println`.** Penerima yang hanya menunggu `\n` membaca `\r` sebagai bagian isi dan menolak semuanya.
- **Menyamakan "bentuk benar" dengan "nilai masuk akal".** `-5,3000` lolos penguraian; kewajaran diperiksa terpisah.

## Cek mandiri

- [ ] Saya dapat menjelaskan sambungan TX-RX silang, GND bersama, dan baud yang sama.
- [ ] Saya dapat menjelaskan mengapa pesan perlu batas dan memakai tanda akhir baris.
- [ ] Saya menulis penerima tanpa `delay`, dengan penyangga berukuran tetap.
- [ ] Saya menolak baris terlalu panjang atau rusak dan mencatat jumlahnya.
- [ ] Saya menuliskan protokol: apa yang dikirim, urutannya, dan batasnya.

## Kunci dan petunjuk

**Ingat kembali.** 1: contoh: nama bermakna, konstanta bernama, satu tugas per fungsi, komentar yang menjelaskan alasan. 2: keuntungan: keluaran tenang dan tidak melonjak saat masukan berderau; kerugian: tidak pernah benar-benar mati dan butuh rentang `GELAP` dan `TERANG` yang diukur. 3: ia menimpa elemen tertua dan memajukan `kepala`; harganya kehilangan data tertua. 4: karena kedua sisi harus membaca lama satu bit yang sama; bila berbeda, byte terbaca salah dan yang tampil huruf acak.

**Prediksi dulu.** 1: satu baris, yaitu `281,2100`; `29` belum lengkap dan menunggu `\n`. 2: `290,2200`, karena `29` dari potongan pertama disambung `0,2200` dari potongan kedua. 3: karakter terus menumpuk tanpa batas; pada larik tetap tanpa penjagaan ia menimpa memori lain, dan pada penerima ini baris ditandai `kepanjangan` lalu dibuang.

**Contoh setengah jadi.** Isian berurutan: `\r`, `\n`, `PANJANG_MAKS`. Fungsi lengkapnya dikompilasi dan dijalankan penulis tanpa peringatan.

**Soal Parsons.** Urutan benar: b, f, d, g, a, e, c, h, i, j.

**Latihan.** 1: pseudocode: kembalikan benar bila `suhu10 >= 150` dan `suhu10 <= 450` dan `cahaya >= 0` dan `cahaya <= 4095`. Hasil: (281, 2100) benar; (-5, 3000) salah karena suhu di bawah 150; (281, 5000) salah karena cahaya di atas 4095. 2: setelah `12,3\n4`, satu baris siap: `12,3` (karakter `4` menunggu); setelah `5,6\n`, satu baris lagi: `45,6`. 3: tiap baris berakhir `\r` sebelum `\n`, sehingga isi baris `281,2100\r`; `urai` menemukan `\r` setelah bilangan kedua, bukan akhir teks, dan menolak semuanya. Perbaikan: abaikan `\r` atau pakai `print` dengan `'\n'` saja. 4: tidak ada kunci tunggal; jawaban yang baik mencatat lima baris yang diterima dan menyebut apa yang dilakukan bila baud diubah di satu sisi.

**Latihan bercampur.** 1: kosong gagal; `281,` gagal (bilangan kedua tidak ada); `,2100` gagal (bilangan pertama tidak ada); `281,2100` berhasil; `281,21x0` gagal (huruf `x` tersisa). 2: pemanas dimatikan, karena tidak adanya pesan berarti tidak ada informasi dan pemanas menyala tanpa pengawasan berisiko; keputusan aman yang sama dengan sensor yang gagal dibaca.

**Ulang berjarak.** 1: tanda itu menandai batas satu pesan; aliran byte tidak punya batas sendiri. 2: tegangan hanya bermakna terhadap acuan yang sama, dan baud menentukan lama satu bit; tanpa keduanya penerima tidak dapat membaca isi dengan benar. 3: memori mikrokontroler terbatas, dan penerima menerima masukan yang ukurannya tidak dapat dipercaya; membuang baris yang kepanjangan mencegah kehabisan memori atau penulisan di luar larik.

## Langkah berikutnya

Modul berikut: `c-xi1-m11` (pengiriman data antarperangkat II), yang menambahkan penanda awal dan jumlah periksa pada pesan. Modul terkait: `c-xi1-m9` (penyangga), `c-xi1-m3` (`struct`), dan `FND-X1-M5`. Pembacaan lanjut: halaman Serial (UART) dokumentasi Arduino-ESP32 dan rujukan `Serial` Arduino.
