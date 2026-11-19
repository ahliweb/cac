## Untuk siapa modul ini

Modul ini untuk murid kelas XII jalur C (IoT dan robotika), minggu `C-XII1-M4` silabus v1.4: sensor garis dan jarak (F). Prasyarat: modul `c-xii1-m3` (motor DC dan pengendali motor). Kamu juga memakai ambang dari pengukuran (`c-x1-m11`), sensor jarak (`c-x2-m11`), dan histeresis (`c-xi1-m5`).

Modul ini berstatus DRAF: karangan penyusun, belum ditinjau pemilik, dan tidak dihitung memenuhi butir capaian pembelajaran mana pun. Keluaran minggu ini: program sensor. Latihan silabusnya: kalibrasi sensor garis.

Ada dua cara mengerjakan. **Dengan papan (F):** kelompok memasang satu larik lima sensor garis dan satu sensor jarak sesuai lembar guru. **Tanpa papan:** kamu menjalankan "papan tiruan" di komputer dengan data kalibrasi dan pembacaan karangan. Nomor pin, rentang nilai, dan arah nilai (hitam lebih besar atau lebih kecil) bergantung rangkaian: ukur dan baca lembar guru `[belum terverifikasi]`.

## Keselamatan perangkat

- Papan memakai daya USB. Tidak ada listrik jaringan (220 V) dan tidak ada baterai litium.
- Saat **kalibrasi, motor mati**: kamu menggeser robot dengan tangan melintasi garis. Robot tidak berjalan sendiri pada modul ini.
- Sebagian modul sensor jarak mengeluarkan sinyal 5 V pada kaki gema yang dapat merusak pin papan 3,3 V `[belum terverifikasi]`. Sambungkan hanya sesuai lembar guru.
- Cabut kabel USB sebelum memasang atau memindahkan sensor. Tidak ada kewajiban solder.
- Lintasan berupa pita hitam di permukaan putih; halangan berupa kardus, bukan orang atau hewan.
- Tidak ada kamera atau mikrofon, dan tidak ada sensor tubuh. Papan atau komponen yang terasa panas, berbau, atau berasap: cabut daya dan panggil guru.

## Ingat kembali

Jawab dari ingatan dulu, baru cek di kunci. Soal 1 dari `c-xii1-m3`, soal 2 dari `c-xii1-m1`, soal 3 dari `C-XI2-M10`.

1. Mengapa roda yang berlawanan arah tidak boleh dibalik seketika, dan apa yang dilakukan `langkahKecepatan`?
2. Apa beda kebutuhan, batasan, dan rancangan? Beri satu contoh masing-masing pada robot pengantar kotak.
3. Apa yang dilaporkan bila semua data satu kelompok hilang, dan mengapa tidak boleh dibagi dengan nol?

## Tujuan

Setelah modul ini kamu dapat:

- menentukan ambang tiap sensor garis dari kalibrasi, yaitu nilai di atas putih dan di atas hitam;
- mengubah lima pembacaan menjadi pola bit dan perkiraan posisi garis (galat) dalam milimeter;
- membedakan garis hilang (semua terang) dari pola tidak valid (semua gelap);
- menentukan batas berhenti jarak dengan dua batas (histeresis) dan memperlakukan kegagalan beruntun sebagai keadaan aman;
- menulis program sensor yang bisa diuji di komputer (keluaran minggu ini).

## Prediksi dulu

Sensor ke-4 (indeks 3) punya nilai putih 720 dan hitam 3500, sehingga ambangnya (720 + 3500) / 2 = 2110. Posisi lima sensor dari tengah robot: -30, -15, 0, 15, 30 mm. Galat adalah rata-rata posisi sensor yang gelap, dipotong ke bilangan bulat. **Tebak dulu, tulis jawabanmu, baru jalankan.**

1. Sensor itu membaca 2050. Gelap atau terang dengan ambang sendiri 2110? Dan bila semua sensor memakai satu ambang bersama 1900?
2. Berapa galat untuk pola `00110` (sensor indeks 2 dan 3 gelap), dan di sisi mana garisnya?
3. Berapa galat bila pola `11111` (semua gelap) dihitung seperti biasa, dan mengapa angka itu menyesatkan?

## Contoh terselesaikan

Larik sensor garis terdiri atas beberapa sensor pantul cahaya sebaris. Garis hitam memantulkan lebih sedikit cahaya daripada permukaan putih, tetapi apakah nilai analognya naik atau turun bergantung pada rangkaian; pada contoh ini hitam memberi nilai lebih besar. Sensor tidak identik, dan cahaya ruangan serta permukaan lintasan memengaruhi nilainya. Karena itu **kalibrasi**: gerakkan robot melintasi garis dengan motor mati, catat nilai terkecil (putih) dan terbesar (hitam) tiap sensor, dan jadikan **titik tengahnya** ambang sensor itu. Ambang dihitung per sensor, bukan satu angka untuk semua.

Dari lima bit, galat dihitung sebagai rata-rata posisi sensor yang gelap; negatif berarti garis di kiri. Galat ini kasar dan berundak karena hanya ada lima titik. Dua keadaan khusus tidak dipaksa menjadi angka: **tidak ada sensor gelap** (garis hilang) dan **semua sensor gelap** (persimpangan atau sensor bermasalah): keduanya bukan "garis di tengah".

```cpp
// C++17 biasa, jalan di komputer. Diperiksa oleh check:module-code.
// Data kalibrasi dan pembacaan KARANGAN. Pada rangkaian contoh ini garis hitam memberi nilai LEBIH BESAR;
// pada rangkaianmu bisa terbalik, jadi ukur dulu.
#include <iostream>

const int JUMLAH_SENSOR = 5;
const int POSISI_SENSOR[JUMLAH_SENSOR] = {-30, -15, 0, 15, 30};  // mm dari tengah robot

struct Kalibrasi {
  int putih[JUMLAH_SENSOR];
  int hitam[JUMLAH_SENSOR];
};

// Ambang tiap sensor: titik tengah antara nilai di atas putih dan di atas hitam.
int ambang(const Kalibrasi &k, int i) { return (k.putih[i] + k.hitam[i]) / 2; }

// Satu bit per sensor; bit 0 = sensor paling kiri.
unsigned bitGelap(const Kalibrasi &k, const int baca[JUMLAH_SENSOR]) {
  unsigned bit = 0;
  for (int i = 0; i < JUMLAH_SENSOR; i++) {
    if (baca[i] > ambang(k, i)) {
      bit |= 1u << i;
    }
  }
  return bit;
}

enum class Status { ADA_GARIS, HILANG, TIDAK_VALID };

// galat = posisi garis terhadap tengah robot (mm); negatif: garis di kiri.
Status hitungGalat(unsigned bit, int &galat) {
  int jumlah = 0;
  int banyak = 0;
  for (int i = 0; i < JUMLAH_SENSOR; i++) {
    if (bit & (1u << i)) {
      jumlah += POSISI_SENSOR[i];
      banyak++;
    }
  }
  if (banyak == 0) {
    return Status::HILANG;
  }
  if (banyak == JUMLAH_SENSOR) {
    return Status::TIDAK_VALID;  // persimpangan atau sensor salah: jangan percaya
  }
  galat = jumlah / banyak;
  return Status::ADA_GARIS;
}

int main() {
  // Lima sensor tidak identik: nilai putih dan hitamnya berbeda-beda.
  const Kalibrasi kal = {{600, 700, 650, 720, 580}, {3000, 3300, 3100, 3500, 2900}};
  std::cout << "sensor putih hitam ambang\n";
  for (int i = 0; i < JUMLAH_SENSOR; i++) {
    std::cout << "  " << i << "   " << kal.putih[i] << "  " << kal.hitam[i] << "  " << ambang(kal, i) << "\n";
  }
  const int pembacaan[4][JUMLAH_SENSOR] = {
      {650, 1500, 3100, 900, 600},   // garis di tengah
      {700, 3200, 3000, 800, 640},   // garis agak ke kiri
      {620, 720, 700, 800, 3000},    // garis di ujung kanan
      {630, 740, 660, 760, 600},     // semua putih
  };
  for (int p = 0; p < 4; p++) {
    unsigned bit = bitGelap(kal, pembacaan[p]);
    int galat = 0;
    Status s = hitungGalat(bit, galat);
    std::cout << "baca " << p << ": bit=";
    for (int i = 0; i < JUMLAH_SENSOR; i++) {
      std::cout << ((bit >> i) & 1u);
    }
    if (s == Status::ADA_GARIS) {
      std::cout << " galat=" << galat << " mm\n";
    } else {
      std::cout << (s == Status::HILANG ? " garis hilang" : " tidak valid") << "\n";
    }
  }
}
```

Keluarannya:

```text
sensor putih hitam ambang
  0   600  3000  1800
  1   700  3300  2000
  2   650  3100  1875
  3   720  3500  2110
  4   580  2900  1740
baca 0: bit=00100 galat=0 mm
baca 1: bit=01100 galat=-7 mm
baca 2: bit=00001 galat=30 mm
baca 3: bit=00000 garis hilang
```

Baca 0 memberi galat 0 karena hanya sensor tengah yang gelap. Baca 1 menyalakan sensor indeks 1 dan 2, sehingga rata-ratanya (-15 + 0) / 2 dipotong menjadi -7: garis agak ke kiri. Baca 3 berada di bawah semua ambang, jadi garis hilang.

Bagian kedua mengubah waktu gema sensor jarak menjadi sentimeter (dibagi dua karena gema pergi dan pulang) dan memutuskan berhenti dengan **dua batas**: berhenti di bawah 15 cm, lanjut di atas 20 cm, dan di antaranya mengikuti keputusan sebelumnya. "Tidak ada gema" bisa berarti halangan terlalu jauh atau sensor gagal, sehingga satu kegagalan tidak mengubah keputusan, tetapi tiga kegagalan beruntun dianggap kerusakan: robot berhenti dan keadaan darurat menyala.

```cpp
// C++17 biasa, jalan di komputer. Diperiksa oleh check:module-code.
// Waktu gema KARANGAN. 0 berarti tidak ada gema (batas waktu terlewati).
#include <iostream>

const int BATAS_BERHENTI_CM = 15;  // contoh; ukur sendiri untuk robotmu
const int BATAS_LANJUT_CM = 20;    // lebih besar dari batas berhenti: histeresis
const int GAGAL_BERUNTUN_MAKS = 3;

// jarak = waktu x kecepatan / 2; 0,0343 cm per mikrodetik = 343 m/s (contoh pada suhu ruang).
int cmDariMikrodetik(unsigned long mikrodetik) {
  return static_cast<int>(mikrodetik * 343UL / 20000UL);  // kalikan dulu, lalu bagi (cm, dipotong)
}

// Mengingat keputusan sebelumnya: antara dua batas, tetap seperti semula.
bool haruBerhenti(bool sebelumnya, int cm) {
  if (cm < BATAS_BERHENTI_CM) {
    return true;
  }
  if (cm > BATAS_LANJUT_CM) {
    return false;
  }
  return sebelumnya;
}

struct Pemantau {
  bool berhenti = false;
  int gagalBeruntun = 0;
  bool darurat = false;  // sensor dianggap rusak
};

void masukkan(Pemantau &p, unsigned long mikrodetik) {
  if (mikrodetik == 0) {
    p.gagalBeruntun++;
    if (p.gagalBeruntun >= GAGAL_BERUNTUN_MAKS) {
      p.darurat = true;
      p.berhenti = true;
    }
    return;  // satu kegagalan tidak mengubah keputusan
  }
  p.gagalBeruntun = 0;
  p.darurat = false;
  p.berhenti = haruBerhenti(p.berhenti, cmDariMikrodetik(mikrodetik));
}

int main() {
  const int JUMLAH = 12;
  const unsigned long gema[JUMLAH] = {2332, 1400, 1166, 932, 816, 1105, 1250, 0, 1000, 0, 0, 0};
  Pemantau p;
  std::cout << "us    cm  berhenti darurat\n";
  for (int i = 0; i < JUMLAH; i++) {
    masukkan(p, gema[i]);
    std::cout << gema[i] << "  ";
    if (gema[i] == 0) {
      std::cout << "-";
    } else {
      std::cout << cmDariMikrodetik(gema[i]);
    }
    std::cout << "  " << (p.berhenti ? "ya" : "tidak") << "  " << (p.darurat ? "DARURAT" : "-") << "\n";
  }
}
```

Keluarannya:

```text
us    cm  berhenti darurat
2332  39  tidak  -
1400  24  tidak  -
1166  19  tidak  -
932  15  tidak  -
816  13  ya  -
1105  18  ya  -
1250  21  tidak  -
0  -  tidak  -
1000  17  tidak  -
0  -  tidak  -
0  -  tidak  -
0  -  ya  DARURAT
```

Pada 13 cm robot berhenti; pada 18 cm (di antara batas) ia tetap berhenti; baru pada 21 cm ia lanjut. Kegagalan tunggal (baris `0`) diabaikan; tiga kegagalan beruntun menyalakan `DARURAT` dan berhenti. Nilai 0,0343 cm per mikrodetik adalah contoh pada suhu ruang; suhu mengubahnya sedikit `[belum terverifikasi]`.

Sketsa berikut membaca lima sensor dan sensor jarak pada papan. Ia hanya diperiksa sintaksnya terhadap header tiruan, tidak dijalankan pada papan; sensor jarak memakai pustaka karangan `PustakaJarak` seperti pada `c-x2-m11`, dan lembar guru menyebut pustaka milik papanmu.

```arduino
// Arduino-C++ untuk ESP32. Diperiksa check:module-code terhadap header tiruan (sintaks dan tipe saja, bukan bukti perilaku papan).
#include "PustakaJarak.h"

const int JUMLAH_SENSOR = 5;
const int PIN_SENSOR[JUMLAH_SENSOR] = {32, 33, 34, 35, 36};  // contoh; periksa papanmu
const int POSISI_SENSOR[JUMLAH_SENSOR] = {-30, -15, 0, 15, 30};
const int PIN_PEMICU = 25;                                   // contoh
const int PIN_GEMA = 26;
const unsigned long SELANG_MS = 50;
const int MODE_KALIBRASI_MS = 4000;

int putih[JUMLAH_SENSOR];   // nilai terkecil yang terlihat saat kalibrasi
int hitam[JUMLAH_SENSOR];   // nilai terbesar yang terlihat saat kalibrasi (pada rangkaian ini hitam lebih besar)
SensorJarak jarak(PIN_PEMICU, PIN_GEMA);
unsigned long mulai = 0;

void kalibrasi() {
  for (int i = 0; i < JUMLAH_SENSOR; i++) {
    putih[i] = 4095;
    hitam[i] = 0;
  }
  unsigned long awal = millis();
  while (millis() - awal < MODE_KALIBRASI_MS) {   // geser robot melintasi garis dengan tangan, motor mati
    for (int i = 0; i < JUMLAH_SENSOR; i++) {
      int nilai = analogRead(PIN_SENSOR[i]);
      if (nilai < putih[i]) {
        putih[i] = nilai;
      }
      if (nilai > hitam[i]) {
        hitam[i] = nilai;
      }
    }
  }
  for (int i = 0; i < JUMLAH_SENSOR; i++) {
    Serial.print(putih[i]);
    Serial.print(" ");
    Serial.println(hitam[i]);   // periksa: selisihnya harus jelas besar; bila kecil, ulangi
  }
}

void setup() {
  Serial.begin(115200);
  jarak.mulai();
  kalibrasi();
  mulai = millis();
}

void loop() {
  if (millis() - mulai < SELANG_MS) {
    return;
  }
  mulai = millis();
  int jumlah = 0;
  int banyak = 0;
  for (int i = 0; i < JUMLAH_SENSOR; i++) {
    int ambang = (putih[i] + hitam[i]) / 2;
    if (analogRead(PIN_SENSOR[i]) > ambang) {
      jumlah += POSISI_SENSOR[i];
      banyak++;
    }
  }
  if (banyak == 0) {
    Serial.println("hilang");
  } else if (banyak == JUMLAH_SENSOR) {
    Serial.println("tidak valid");
  } else {
    Serial.println(jumlah / banyak);   // galat dalam mm
  }
  unsigned long us = 0;
  if (jarak.bacaMikrodetik(us)) {
    Serial.println(us * 343UL / 20000UL);   // cm
  }
}
```

## Contoh setengah jadi

Lengkapi `____` pada `bitGelap`: gelap bila nilainya **di atas** ambangnya sendiri.

```cpp setengah-jadi
// C++17. Lengkapi bagian ____.
unsigned bitGelap(const Kalibrasi &k, const int baca[JUMLAH_SENSOR]) {
  unsigned bit = 0;
  for (int i = 0; i < JUMLAH_SENSOR; i++) {
    if (baca[i] ____ ambang(k, i)) {
      bit |= 1u << ____;
    }
  }
  return ____;
}
```

## Soal Parsons

Susun baris-baris di bawah (sudah diacak) menjadi fungsi `masukkan`. Dua baris terakhir di luar `if` boleh bertukar.

```text
(a)     p.gagalBeruntun++;
(b) void masukkan(Pemantau &p, unsigned long mikrodetik) {
(c)   p.gagalBeruntun = 0;
(d)     return;
(e)   if (mikrodetik == 0) {
(f)     if (p.gagalBeruntun >= GAGAL_BERUNTUN_MAKS) { p.darurat = true; p.berhenti = true; }
(g)   }
(h)   p.darurat = false;
(i)   p.berhenti = haruBerhenti(p.berhenti, cmDariMikrodetik(mikrodetik));
(j) }
```

## Latihan

1. `AI: tanpa AI` **Hitung galat.** Dengan posisi -30, -15, 0, 15, 30, berapa galat untuk pola `10000`, `01110`, dan `00011`?
2. `AI: boleh` **Kalibrasi sensor garis (F).** Dengan motor mati, geser robot melintasi garis, catat nilai putih dan hitam tiap sensor, hitung ambangnya, dan periksa bahwa selisihnya jelas besar. Tanpa papan, ganti data kalibrasi di program dengan angka karanganmu dan jalankan.
3. `AI: tanpa AI` **Pola tidak valid.** Beri dua kemungkinan penyebab pola `11111`, dan tulis apa yang sebaiknya dilakukan robot.
4. `AI: boleh` **Ubah batas.** Ubah batas berhenti menjadi 12 cm dan batas lanjut menjadi 18 cm. Prediksikan dulu apa yang berubah pada keluaran, lalu jalankan.
5. *Opsional:* **catatan pemakaian AI.** Bila memakai AI generatif, kerjakan nomor 1 sendiri dulu, lalu minta penjelasan bertahap bila ragu, bukan jawaban jadi. Catat alatnya, tujuanmu, garis besar perintahmu, bagian yang kamu pakai, dan cara memeriksanya. Jangan menaruh data pribadi pada perintah.

## Latihan bercampur

1. Mengapa jarak memakai dua batas dan bukan satu (dari `c-xi1-m5`)?
2. Sebut dua cara memeriksa bahwa sensormu membaca dengan benar tanpa bergantung pada program (dari `c-x2-m3`).

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `C-XII1-M5` (sekitar satu minggu lagi), `C-XII1-M7` (sekitar tiga minggu lagi), dan `C-XII1-M12` (sekitar delapan minggu lagi). Jawab sekarang lalu simpan.

1. Mengapa tiap sensor garis diberi ambang sendiri hasil kalibrasi, bukan satu ambang untuk semuanya?
2. Mengapa galat dari lima sensor bernilai kasar (berundak), dan apa akibatnya pada koreksi proporsional?
3. Catatan apa yang harus ada dalam dokumen perakitan agar orang lain dapat mengulang kalibrasi sensor garis?

## Kesalahan umum

- **Satu ambang untuk semua sensor.** Pakai ambang per sensor.
- **Mengira nilai besar selalu putih.** Arah nilai bergantung rangkaian; ukur dulu.
- **Menganggap semua sensor gelap sebagai garis di tengah.** Itu persimpangan atau sensor bermasalah.
- **Menganggap tidak ada gema sebagai jalan kosong.** Itu bisa kegagalan sensor; hitung kegagalan beruntun.
- **Kalibrasi sekali lalu dipakai di tempat lain.** Cahaya dan permukaan mengubah nilai; ulangi bila berubah.
- **Memakai satu batas jarak.** Robot berhenti dan jalan berganti-ganti.

## Cek mandiri

- [ ] Saya menghitung ambang tiap sensor dari kalibrasi, bukan menebak.
- [ ] Saya dapat mengubah pola bit menjadi galat dan menyebut keterbatasannya.
- [ ] Saya memisahkan garis hilang dan pola tidak valid dari galat.
- [ ] Saya memakai dua batas untuk jarak dan menghitung kegagalan beruntun.
- [ ] Saya tahu kalibrasi dilakukan dengan motor mati.

## Kunci dan petunjuk

**Ingat kembali.** 1: pembalikan seketika memberi guncangan dan lonjakan beban pada motor dan baterai; `langkahKecepatan` menuju 0 dulu, lalu menaikkan kecepatan bertahap. 2: kebutuhan = apa yang harus dilakukan (berhenti sebelum menabrak); batasan = syarat lingkungan (daya hanya USB atau baterai AA/AAA guru); rancangan = cara (sensor jarak dan dua motor DC). 3: laporkan bahwa tidak ada data atau "tidak tersedia"; membagi dengan nol tidak terdefinisi, dan melaporkan 0 menyesatkan karena 0 adalah nilai yang mungkin.

**Prediksi dulu.** 1: dengan ambang sendiri 2110, nilai 2050 terang; dengan ambang bersama 1900, nilai itu gelap; jadi ambang bersama memberi hasil berbeda. 2: (0 + 15) / 2 = 7 (dipotong); garis di kanan robot. 3: rata-ratanya 0, tampak seperti garis di tengah, padahal mungkin persimpangan atau semua sensor tertutup gelap; pola itu harus ditandai tidak valid.

**Contoh setengah jadi.** Isian berurutan: `>`, `i`, `bit`. Kunci yang dikompilasi dan dijalankan penulis menghasilkan keluaran yang sama dengan contoh terselesaikan.

**Soal Parsons.** Urutan benar: b, e, a, f, d, g, c, h, i, j (c dan h boleh bertukar). `return` di dalam `if` menghentikan fungsi sebelum bagian pembacaan yang valid.

**Latihan.** 1: `10000` memberi -30; `01110` memberi (-15 + 0 + 15) / 3 = 0; `00011` memberi (15 + 30) / 2 = 22 (dipotong). 2: tidak ada kunci tunggal; jawaban yang baik mencatat tiap sensor dan memeriksa bahwa selisih putih dan hitam jelas besar. 3: contoh penyebab: persimpangan atau garis melintang, sensor tertutup bayangan atau ambang salah; robot sebaiknya berhenti atau melambat dan tidak menebak arah. 4: dengan batas 12 dan 18, tidak ada baris yang membuat robot berhenti karena jarak (13 cm dan 18 cm berada di antara batas, dan keputusan awal adalah jalan); satu-satunya `ya` ada di baris terakhir karena tiga kegagalan beruntun menyalakan `DARURAT`.

**Latihan bercampur.** 1: karena jarak yang berayun di sekitar satu batas membuat keputusan berganti-ganti; dua batas menahan keputusan di antaranya. 2: contoh: bandingkan dengan benda yang jaraknya diukur dengan penggaris atau meteran, dan lihat nilai mentah di Serial Monitor saat sensor ditutup atau dibuka.

**Ulang berjarak.** 1: tiap sensor punya nilai putih dan hitam yang berbeda sehingga satu ambang akan salah pada sebagian sensor. 2: hanya ada lima titik sehingga posisi garis berubah dalam lompatan dan ada zona tengah yang galatnya 0; koreksi proporsional ikut berlompat dan tidak bereaksi pada selisih kecil. 3: arah nilai (hitam lebih besar atau lebih kecil), nilai putih dan hitam tiap sensor, ambang hasil hitungan, kondisi cahaya dan permukaan saat kalibrasi, dan tanggalnya.

## Langkah berikutnya

Modul berikut: `c-xii1-m5` (mesin keadaan robot), yang memakai sensor jarak ini untuk menghindari halangan. Bacaan lanjut: dokumentasi `analogRead` dan `pulseIn` serta ADC Arduino-ESP32 (lihat Rujukan).
