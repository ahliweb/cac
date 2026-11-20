## Untuk siapa modul ini

Modul ini untuk murid kelas XI jalur C (IoT dan robotika), minggu `C-XI1-M4` silabus v1.3: pustaka sendiri, yaitu membuat kelas atau pustaka kecil untuk sebuah sensor (F). Prasyarat: modul `c-xi1-m3` (tipe data bentukan). Kamu juga memakai fungsi dan konstanta dari `c-x1-m12`, waktu dari `c-x2-m7`, sensor jarak dari `c-x2-m11`, dan kasus uji dari `c-xi1-m2`.

Modul ini karangan penyusun dan disetujui pemilik program pada 2026-11-20 (keputusan lewat dialog; catatan tinjauan menjadi tindak lanjut revisi). Ia mendukung butir `F-AP-b` (program terstruktur berdasarkan strategi algoritmik) dan `F-AP-d` (program dengan struktur data kompleks memakai pustaka atau perangkat) dan tidak dihitung memenuhi butir capaian pembelajaran mana pun. Keluaran minggu ini: pustaka sensor. Latihan silabusnya: pustaka sensor jarak.

Ada dua cara mengerjakan. **Dengan papan (F):** kelompok merakit satu sensor jarak ultrasonik sesuai lembar guru. **Tanpa papan:** kamu menelusuri kelas di kertas dan menjalankan "papan tiruan" di komputer yang menguji bagian murninya (konversi dan rentang) dengan waktu gema karangan. Nama pin, lebar pulsa pemicu, kecepatan suara, dan batas rentang pada contoh hanya contoh `[belum terverifikasi]` untuk sensormu: baca lembar datanya.

## Keselamatan perangkat

- Daya hanya dari kabel USB. Tidak ada listrik jaringan (220 V) dan tidak ada baterai pada modul ini.
- Cabut kabel USB sebelum memasang atau memindahkan sensor. Hanya komponen yang disiapkan guru.
- Sebagian modul sensor jarak mengeluarkan sinyal 5 V pada kaki gema, yang dapat merusak pin papan 3,3 V `[belum terverifikasi]`. Sambungkan hanya sesuai lembar guru; jangan menyambung sendiri.
- Tidak ada solder. Papan percobaan dan kabel jumper sudah cukup.
- Modul ini tidak memakai kamera atau mikrofon, dan tidak mengukur tubuh siapa pun; benda uji berupa kardus atau papan.
- Papan atau komponen yang terasa panas, berbau, atau berasap: cabut kabel dan panggil guru.

## Ingat kembali

Jawab dari ingatan dulu, baru cek di kunci. Soal 1 dari `c-x2-m10`, soal 2 dari `c-xi1-m1`, soal 3 dari `c-xi1-m3`.

1. Mengapa pengurutan untuk median dilakukan pada salinan larik, bukan pada larik aslinya?
2. Sebut empat tahap proses rekayasa produk IoT secara berurutan.
3. Mengapa fungsi `cetak` menerima `const Pembacaan&`, bukan salinan `Pembacaan`?

## Tujuan

Setelah modul ini kamu dapat:

- menjelaskan bahwa pustaka adalah kode yang dibungkus dengan antarmuka kecil sehingga pemakai tidak perlu tahu isinya;
- menulis kelas dengan anggota privat (pin), anggota publik (`mulai`, `bacaCm`), dan fungsi statis yang murni;
- memisahkan bagian yang menyentuh perangkat keras dari bagian murni yang dapat diuji di komputer;
- memberi batas waktu tunggu pada pembacaan perangkat agar program tidak macet;
- menghasilkan pustaka sensor (keluaran minggu ini).

## Prediksi dulu

Bagian murni pustaka mengubah waktu gema (mikrodetik) menjadi sentimeter dengan `waktu x 0,0343 / 2`, dan menganggap jarak **valid** bila antara 2,0 dan 400,0 cm. **Tebak dulu, tulis jawabanmu, baru telusuri.** Untuk waktu gema 0, 117, 2915, dan 23400 mikrodetik:

1. Berapa jaraknya (dua angka di belakang koma)?
2. Mana yang valid?
3. Mengapa waktu 0 tidak boleh dianggap "jarak 0 cm yang valid", dan mengapa 116 dan 117 mikrodetik hanya selisih satu tetapi hasilnya berbeda?

## Contoh terselesaikan

Setiap sensor yang dipakai berulang layak punya **pustaka**: satu kelas yang membungkus pin, urutan perintah, dan aturan konversinya. Sketsa utama cukup menulis `sensor.bacaCm(cm)` tanpa tahu detailnya. Aturan C++ Core Guidelines yang berlaku: bila ada anggota yang privat, pakai `class` (C.8); antarmuka dibuat kecil dan bertipe jelas (I.4). Pin disimpan sebagai anggota **privat** supaya tidak diubah dari luar secara tak sengaja; yang dibuka hanya `mulai()` dan `bacaCm()`.

Kelas dibagi menjadi dua bagian. Bagian **perangkat keras** (`bacaMikrodetik`) mengirim pulsa pemicu, menunggu gema, dan mengukur lamanya; ia hanya bisa diuji di papan. Bagian **murni** (`cmDariMikrodetik` dan `dalamRentang`) hanya menghitung dan dideklarasikan `static`, sehingga dapat dipanggil tanpa membuat objek dan diuji di komputer seperti pada `c-xi1-m2`. Pembacaan perangkat keras diberi **batas waktu tunggu** (`BATAS_TUNGGU_US`): bila gema tak pernah datang, `while` berhenti dan mengembalikan `false`, bukan menggantung program selamanya.

```arduino
// Arduino-C++ untuk ESP32. Diperiksa check:module-code terhadap header tiruan (sintaks dan tipe saja, bukan bukti perilaku papan).
// Pada pustaka sungguhan kelas ini dipecah menjadi PengukurJarak.h dan PengukurJarak.cpp.
const float CM_PER_US = 0.0343f;                   // contoh; bergantung suhu udara
const float JARAK_MIN_CM = 2.0f;                   // contoh; periksa lembar data
const float JARAK_MAKS_CM = 400.0f;                // contoh; periksa lembar data
const unsigned long BATAS_TUNGGU_US = 30000;       // contoh batas waktu tunggu

class PengukurJarak {
 public:
  PengukurJarak(int pinPemicu, int pinGema) : pemicu_(pinPemicu), gema_(pinGema) {}

  void mulai() {
    pinMode(pemicu_, OUTPUT);
    pinMode(gema_, INPUT);
    digitalWrite(pemicu_, LOW);
  }

  // Bagian murni: hanya menghitung.
  static float cmDariMikrodetik(unsigned long mikrodetik) {
    return mikrodetik * CM_PER_US / 2.0f;
  }
  static bool dalamRentang(float cm) { return cm >= JARAK_MIN_CM && cm <= JARAK_MAKS_CM; }

  // Bagian perangkat keras: false bila gema tidak datang sebelum batas waktu.
  bool bacaMikrodetik(unsigned long &mikrodetik) {
    digitalWrite(pemicu_, HIGH);
    delayMicroseconds(10);                         // contoh lebar pulsa pemicu; periksa lembar data
    digitalWrite(pemicu_, LOW);
    unsigned long tunggu = micros();
    while (digitalRead(gema_) == LOW) {
      if (micros() - tunggu > BATAS_TUNGGU_US) {
        return false;
      }
    }
    unsigned long awal = micros();
    while (digitalRead(gema_) == HIGH) {
      if (micros() - awal > BATAS_TUNGGU_US) {
        return false;
      }
    }
    mikrodetik = micros() - awal;
    return true;
  }

  // Antarmuka yang dipakai sketsa: true hanya bila ada gema dan jaraknya valid.
  bool bacaCm(float &cm) {
    unsigned long mikrodetik = 0;
    if (!bacaMikrodetik(mikrodetik)) {
      return false;
    }
    float hasil = cmDariMikrodetik(mikrodetik);
    if (!dalamRentang(hasil)) {
      return false;
    }
    cm = hasil;
    return true;
  }

 private:
  int pemicu_;
  int gema_;
};

const int PIN_PEMICU = 25;                         // contoh; periksa papanmu
const int PIN_GEMA = 26;
const unsigned long SELANG_MS = 200;

PengukurJarak sensor(PIN_PEMICU, PIN_GEMA);
unsigned long mulai = 0;

void setup() {
  Serial.begin(115200);
  sensor.mulai();
  mulai = millis();
}

void loop() {
  if (millis() - mulai >= SELANG_MS) {
    mulai += SELANG_MS;
    float cm = 0.0f;
    if (sensor.bacaCm(cm)) {
      Serial.println(cm, 1);
    } else {
      Serial.println("tidak valid");
    }
  }
}
```

Papan tiruan di bawah menguji bagian murni yang **sama persis** dengan teks di kelas di atas (disalin ke kelas `Konversi` agar bisa dijalankan di komputer). Daftar uji memakai `struct` dari `c-xi1-m3`, dan mencakup nilai tepat di sekitar batas bawah (116 dan 117) dan batas atas (23323 dan 23400).

```cpp
// C++17 biasa, jalan di komputer. Diperiksa oleh check:module-code.
#include <iomanip>
#include <iostream>

const float CM_PER_US = 0.0343f;        // contoh; bergantung suhu udara
const float JARAK_MIN_CM = 2.0f;        // contoh; periksa lembar data
const float JARAK_MAKS_CM = 400.0f;     // contoh; periksa lembar data

class Konversi {
 public:
  static float cmDariMikrodetik(unsigned long mikrodetik) {
    return mikrodetik * CM_PER_US / 2.0f;
  }
  static bool dalamRentang(float cm) { return cm >= JARAK_MIN_CM && cm <= JARAK_MAKS_CM; }
};

struct KasusUji {
  unsigned long mikrodetik;
  bool harapanValid;
};

int main() {
  const KasusUji DAFTAR[] = {{0, false},    {116, false},   {117, true},
                             {2915, true},  {23323, true},  {23400, false}};
  std::cout << std::fixed << std::setprecision(2);
  int gagal = 0;
  for (const KasusUji& k : DAFTAR) {
    float cm = Konversi::cmDariMikrodetik(k.mikrodetik);
    bool valid = Konversi::dalamRentang(cm);
    std::cout << k.mikrodetik << " us -> " << cm << " cm, " << (valid ? "valid" : "tidak valid")
              << (valid == k.harapanValid ? "" : "  <-- GAGAL") << "\n";
    if (valid != k.harapanValid) {
      gagal++;
    }
  }
  std::cout << (6 - gagal) << " dari 6 lulus\n";
}
```

Keluarannya:

```text
0 us -> 0.00 cm, tidak valid
116 us -> 1.99 cm, tidak valid
117 us -> 2.01 cm, valid
2915 us -> 49.99 cm, valid
23323 us -> 399.99 cm, valid
23400 us -> 401.31 cm, tidak valid
6 dari 6 lulus
```

Lolosnya enam uji hanya membuktikan bahwa konversi dan rentang sesuai tabel; bagian perangkat keras (pulsa, gema, batas waktu) tidak tersentuh dan baru teruji di papan dengan sensor dan penggaris. Kelas sebagai pustaka juga tidak otomatis benar: ia hanya membuat kesalahan terkumpul di satu tempat, sehingga mudah ditemukan dan diperbaiki sekali untuk semua pemakainya.

## Contoh setengah jadi

Lengkapi kelas kecil yang menyimpan satu pin LED dan menyalakannya; bagian `____` adalah anggota dan pemanggilan yang hilang.

```arduino setengah-jadi
// Arduino-C++ untuk ESP32. Lengkapi bagian ____.
class Lampu {
 public:
  Lampu(int pin) : pin_(pin) {}
  void mulai() { pinMode(____, OUTPUT); }
  void nyalakan() { digitalWrite(pin_, ____); }
 ____:
  int pin_;
};
```

## Soal Parsons

Susun baris-baris di bawah (sudah diacak) menjadi `bacaCm`.

```text
(a)   float hasil = cmDariMikrodetik(mikrodetik);
(b)   return true;
(c)   if (!dalamRentang(hasil)) {
(d)   cm = hasil;
(e)     return false;
(f)   }
(g)   unsigned long mikrodetik = 0;
(h)   if (!bacaMikrodetik(mikrodetik)) {
(i)     return false;
(j)   }
(k) bool bacaCm(float &cm) {
(l) }
```

## Latihan

1. `AI: boleh` **Pseudocode dulu.** Tambahkan ke kelas fungsi `bacaRataCm(float &cm, int jumlah)` yang memanggil `bacaCm` sebanyak `jumlah` kali, menghitung rata-rata pembacaan yang valid, dan mengembalikan `false` bila tidak ada satu pun yang valid. Tulis pseudocode lebih dulu (keluaran minggu ini: pustaka sensor).
2. `AI: tanpa AI` **Mengapa batas waktu?** Apa yang terjadi pada program bila `while (digitalRead(gema_) == LOW)` tidak punya batas waktu dan kabel gema terlepas?
3. `AI: tanpa AI` **Uji tepi.** Mengapa tidak ada waktu gema bulat yang menghasilkan tepat 2,00 cm, dan bagaimana pasangan 116 dan 117 mikrodetik tetap menguji batas bawah?
4. `AI: boleh` **Bila papan tersedia (opsional).** Pasang sensor sesuai lembar guru, letakkan kardus pada 10, 20, dan 40 cm dari penggaris, dan bandingkan pembacaan kelas dengan penggaris. Tanpa papan, kerjakan nomor 3 dan tambahkan dua kasus uji karangan. Jangan mengubah rangkaian saat daya menyala.
5. *Opsional:* **catatan pemakaian AI.** Bila memakai AI generatif, jawab nomor 1 sendiri dulu, lalu minta petunjuk bertahap atau kritik, bukan program jadi. Catat alatnya, tujuanmu, garis besar perintahmu, bagian yang kamu pakai, dan cara memeriksanya (jalankan atau telusuri). Jangan menaruh data pribadi atau tugas bernilai pada perintah.

## Latihan bercampur

1. Ganti pasangan `bool` dan parameter keluaran pada `bacaCm` dengan satu `struct` hasil (`c-xi1-m3`) yang berisi `cm` dan `valid`. Tulis `struct`-nya dan tanda tangan fungsinya, lalu sebut satu keuntungan dan satu kerugiannya.
2. Tulis empat kasus uji tepi (`c-xi1-m2`) untuk `dalamRentang` pada 1,99; 2,00; 400,00; dan 400,01.

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `c-xi1-m5` (sekitar satu minggu lagi), `c-xi1-m7` (sekitar tiga minggu lagi), dan `c-xi1-m12` (sekitar delapan minggu lagi). Jawab sekarang lalu simpan.

1. Apa beda bagian publik dan privat sebuah kelas, dan mengapa pin disimpan sebagai anggota privat?
2. Mengapa pembacaan gema diberi batas waktu tunggu?
3. Sebut dua hal yang harus didokumentasikan agar pustaka sensor dapat dipakai orang lain tanpa membaca isinya.

## Kesalahan umum

- **Menaruh semua di satu kelas tanpa memisahkan bagian murni.** Akibatnya tidak ada yang bisa diuji tanpa papan.
- **Tanpa batas waktu tunggu.** Satu kabel lepas membuat seluruh program menggantung di perulangan `while`.
- **Mengira kelas membuat sensor akurat.** Kelas hanya membungkus; ketelitian tetap bergantung pada sensor, rumus, dan kalibrasi.
- **Membuka semua anggota sebagai publik.** Pin atau keadaan dalam dapat diubah dari luar secara tak sengaja.
- **Mengira pustaka sendiri sama dengan pustaka resmi.** Pustaka karanganmu belum diuji orang lain dan tidak dijamin cocok dengan semua papan atau sensor.

## Cek mandiri

- [ ] Saya dapat menulis kelas dengan anggota privat dan publik.
- [ ] Saya memisahkan bagian perangkat keras dari bagian murni.
- [ ] Saya memberi batas waktu tunggu pada pembacaan perangkat.
- [ ] Saya menguji bagian murni dengan nilai di sekitar batas.
- [ ] Saya tahu apa yang harus dicatat agar pustakaku dapat dipakai orang lain.

## Kunci dan petunjuk

**Ingat kembali.** 1: karena pengurutan mengubah isi larik; salinan menjaga urutan pembacaan asli tetap utuh untuk perhitungan lain, misalnya rata-rata bergerak. 2: kebutuhan, rancangan, implementasi, uji. 3: untuk menghindari menyalin seluruh isi, dan `const` menjamin fungsi itu tidak mengubah datanya.

**Prediksi dulu.** 1: 0 menjadi 0,00 cm; 117 menjadi 2,01 cm; 2915 menjadi 49,99 cm; 23400 menjadi 401,31 cm. 2: hanya 117 dan 2915 yang valid; 0 di bawah 2,0 dan 23400 di atas 400,0. 3: waktu 0 berarti tidak ada gema yang diukur, bukan benda yang menempel pada sensor; 116 menghasilkan 1,99 (di bawah 2,0) dan 117 menghasilkan 2,01 (di atas 2,0), sehingga keduanya mengapit batas.

**Contoh setengah jadi.** Isian berurutan: `pin_`, `HIGH`, `private`. Kelas lengkapnya dikompilasi penulis dengan `Arduino.h` tiruan tanpa peringatan.

**Soal Parsons.** Urutan benar: k, g, h, i, j, a, c, e, f, d, b, l.

**Latihan.** 1: pseudocode: jumlah = 0, banyak = 0; ulangi `jumlah` kali: bila `bacaCm` berhasil, tambahkan ke jumlah dan banyak; setelah itu bila banyak = 0 kembalikan `false`, selain itu `cm` = jumlah / banyak dan kembalikan `true`. 2: program menunggu selamanya (gema tak pernah naik), sehingga bagian lain tidak jalan; batas waktu mengubah macet menjadi `false` yang dapat ditangani. 3: 2,00 cm berarti 116,6 mikrodetik, bukan bilangan bulat; 116 memberi 1,99 (di bawah batas) dan 117 memberi 2,01 (di atas batas), sehingga batas teruji dari kedua sisi. 4: tidak ada kunci tunggal; jawaban yang baik menyebut selisih pembacaan dengan penggaris dan kemungkinan penyebabnya (sudut benda, suhu udara, permukaan).

**Latihan bercampur.** 1: contoh: `struct HasilJarak { float cm; bool valid; };` dan `HasilJarak bacaCm();`. Keuntungan: tidak ada parameter keluaran yang mudah terlewat. Kerugian: `cm` berisi nilai tak bermakna saat `valid` salah, sehingga pemanggil harus selalu memeriksa `valid`. 2: 1,99 (ditolak), 2,00 (diterima), 400,00 (diterima), 400,01 (ditolak).

**Ulang berjarak.** 1: anggota publik dapat dipakai dari luar kelas; privat hanya dari dalam. Pin dibuat privat supaya tidak diubah dari luar secara tak sengaja. 2: agar program tidak menggantung bila gema tidak pernah datang (kabel lepas, tak ada benda). 3: contoh: pin yang dipakai dan rentang ukur yang valid; satuan hasil; apa yang dikembalikan saat gagal; bahwa nilai contoh perlu diperiksa pada lembar data.

## Langkah berikutnya

Modul berikut: `c-xi1-m5` (alternatif solusi I: ambang dan histeresis), yang memakai pustaka sensor sebagai masukan keputusan. Modul terkait: `fondasi-komputer-dan-hardware` untuk gambaran perangkat keras. Pembacaan lanjut: panduan membuat pustaka Arduino.
