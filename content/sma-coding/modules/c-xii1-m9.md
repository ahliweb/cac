## Untuk siapa modul ini

Modul ini untuk murid kelas XII jalur C (IoT dan robotika), minggu `C-XII1-M9` silabus v1.4: kalibrasi dan pengujian sistematis (F). Prasyarat: modul `c-xii1-m8` (membandingkan strategi). Kamu juga memakai kalibrasi sensor dari `c-xii1-m4`, yang belum terindeks saat modul ini ditulis.

Modul ini berstatus DRAF: karangan penyusun, belum ditinjau pemilik, dan tidak dihitung memenuhi butir capaian pembelajaran mana pun. Keluaran minggu ini: tabel hasil uji. Latihan silabusnya: sepuluh kali uji per strategi.

Ada dua cara mengerjakan. **Dengan papan (F):** kelompok mengalibrasi sensor dan menjalankan sepuluh lari per strategi pada lintasan modul 8. **Tanpa papan:** kamu menjalankan simulasi yang sama dengan derau berbenih (seed), model sederhana karangan. Nomor pin, ambang, dan angka kontras hanya contoh `[belum terverifikasi]` untuk robotmu.

## Keselamatan perangkat

- Papan memakai daya USB; motor memakai baterai AA/AAA yang disediakan guru lewat modul pengendali. Tidak ada listrik jaringan (220 V), tidak ada baterai litium tanpa pelindung, dan kamu tidak mengisi daya litium.
- Cabut baterai dan kabel USB sebelum mengubah rangkaian; periksa polaritas. Motor tidak disambung langsung ke pin papan. Tidak ada solder.
- Kalibrasi dikerjakan **tanpa menyalakan motor**: robot digeser dengan tangan. Lari uji hanya di meja bertepi atau lantai bersih; bagian yang bergerak tidak disentuh saat menyala, dan tombol berhenti serta pemutus daya diketahui letaknya.
- Sepuluh lari berturut-turut membuat motor dan pengendali hangat: beri jeda, dan papan atau modul yang terasa panas, berbau, atau berasap berarti cabut daya dan panggil guru. Tidak ada kamera atau mikrofon, dan tidak ada sensor tubuh.

## Ingat kembali

Jawab dari ingatan dulu, baru cek di kunci. Soal 1 dari `c-xii1-m6`, soal 2 dari `c-xii1-m1`, soal 3 dari `c-xii1-m8`.

1. Mengapa lintasan uji dan kondisi awal harus sama ketika dua strategi dibandingkan?
2. Mengapa nilai terburuk, bukan rata-rata, yang dibandingkan dengan batas pada kebutuhan?
3. Mengapa satu kali uji dari satu kondisi awal belum cukup untuk memilih strategi?

## Tujuan

Setelah modul ini kamu dapat:

- mengalibrasi ambang sensor dari nilai terkecil dan terbesar, dan memeriksa kontrasnya;
- merancang uji berulang: apa yang dijaga sama, apa yang dibiarkan bervariasi, berapa kali diulang;
- mencatat tiap percobaan dalam tabel beserta kondisinya, bukan hanya rata-ratanya;
- meringkas dengan rata-rata **dan** nilai terburuk, lalu menyimpulkan dengan hati-hati.

## Prediksi dulu

Pada modul 8, hidup-mati `T` = 8 punya simpangan terbesar 13 mm dan proporsional 3/4 punya 20 mm, dari satu lari. Sekarang tiap strategi diuji sepuluh kali; titik awal (6 sampai 18 mm) dan derau geseran (-1, 0, atau 1 mm per tick) ditentukan oleh benih, dan tiap benih dipakai untuk **kedua** strategi. **Tebak dulu, tulis jawabanmu, baru jalankan.**

1. Apakah hidup-mati masih punya simpangan terbesar yang lebih kecil, kira-kira berapa rata-ratanya, dan berapa terburuknya?
2. Apakah selisih tick tempuh kedua strategi masih sekitar 2?
3. Apa yang akan rusak bila kedua strategi memakai benih berbeda?

## Contoh terselesaikan

**Pengujian sistematis** berarti menjaga sebagian hal tetap sama (lintasan, panjang, baterai, cara mulai) dan membiarkan sebagian bervariasi dengan terkendali (titik awal, derau), lalu mengulang. Pada simulasi, variasi itu datang dari pembangkit acak berbenih: benih yang sama selalu menghasilkan urutan yang sama, jadi percobaan nomor 3 dapat diulang persis, dan kedua strategi menghadapi titik awal dan derau yang sama. Pada robot nyata, kamu menandai titik awal, memakai baterai yang sama, mengulang sepuluh kali, dan mencatat **setiap** lari. Tabel yang menyimpan tiap percobaan memungkinkan orang lain menghitung ulang; tabel yang hanya berisi rata-rata tidak.

```cpp
// C++17 biasa, jalan di komputer. Diperiksa oleh check:module-code.
// MODEL SEDERHANA KARANGAN, bukan fisika robot nyata. Model sama dengan modul 8; ditambah derau yang
// dibangkitkan dari benih (seed), sehingga tiap percobaan dapat diulang persis.
#include <cstdint>
#include <cstdlib>
#include <iomanip>
#include <iostream>

const int JUMLAH_SENSOR = 5;
const int POSISI_SENSOR[JUMLAH_SENSOR] = {-30, -15, 0, 15, 30};
const int SETENGAH_LEBAR_GARIS = 10;
const int TICK_GESER = 40;
const int GESER[TICK_GESER] = {0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 4, 9, 9, 9, 9, 9, 0, 0, 0, 0,
                               0, -4, -4, -4, -4, -4, -4, -4, -4, -4, -4, 0, 0, 0, 0, 0, 0, 0, 0, 0};
const int PANJANG_LINTASAN = 800;
const int LAJU_CEPAT = 20;
const int LAJU_LAMBAT = 10;
const int TICK_MAKS = 120;
const int PENYEBUT = 4;
const int KOREKSI_MAKS = 15;
const int JUMLAH_UJI = 10;

bool gelap(int x, int i) { return std::abs(x + POSISI_SENSOR[i]) <= SETENGAH_LEBAR_GARIS; }

bool hitungGalat(int x, int &galat) {
  int jumlah = 0;
  int banyak = 0;
  for (int i = 0; i < JUMLAH_SENSOR; i++) {
    if (gelap(x, i)) {
      jumlah += POSISI_SENSOR[i];
      banyak++;
    }
  }
  if (banyak == 0 || banyak == JUMLAH_SENSOR) {
    return false;
  }
  galat = jumlah / banyak;
  return true;
}

int hidupMati(int galat, int T) {
  if (galat < 0) {
    return T;
  }
  if (galat > 0) {
    return -T;
  }
  return 0;
}

int proporsional(int galat, int pembilang) {
  int koreksi = -pembilang * galat / PENYEBUT;
  if (koreksi > KOREKSI_MAKS) {
    return KOREKSI_MAKS;
  }
  if (koreksi < -KOREKSI_MAKS) {
    return -KOREKSI_MAKS;
  }
  return koreksi;
}

// Pembangkit bilangan acak sederhana: benih yang sama selalu menghasilkan urutan yang sama.
int acak(uint32_t &benih, int rendah, int tinggi) {
  benih = benih * 1664525u + 1013904223u;
  return rendah + static_cast<int>((benih >> 16) % static_cast<uint32_t>(tinggi - rendah + 1));
}

struct Hasil {
  int tick;  // TICK_MAKS bila gagal
  bool selesai;
  int maks;
  int hilang;
};

// Satu percobaan. Benih menentukan titik awal (6 sampai 18 mm) dan derau geseran (-1, 0, atau 1 mm per tick).
Hasil uji(bool proporsionalAktif, int parameter, uint32_t benih) {
  Hasil h = {0, false, 0, 0};
  int x = acak(benih, 6, 18);
  int terdahulu = 0;
  int jarak = 0;
  for (int t = 0; t < TICK_MAKS && !h.selesai; t++) {
    int derau = acak(benih, -1, 1);  // dipanggil sekali per tick, apa pun strateginya
    int a = std::abs(x);
    if (a > h.maks) {
      h.maks = a;
    }
    int galat = 0;
    int koreksi = 0;
    if (hitungGalat(x, galat)) {
      koreksi = proporsionalAktif ? proporsional(galat, parameter) : hidupMati(galat, parameter);
      jarak += (a <= SETENGAH_LEBAR_GARIS) ? LAJU_CEPAT : LAJU_LAMBAT;
    } else {
      h.hilang++;
    }
    h.tick = t + 1;
    if (jarak >= PANJANG_LINTASAN) {
      h.selesai = true;
    }
    int geser = (t < TICK_GESER) ? GESER[t] : 0;
    x = x + geser + derau - terdahulu;
    terdahulu = koreksi;
  }
  return h;
}

struct Ringkasan {
  int rataTick;     // dibulatkan ke bawah
  int terburukTick;  // terbesar
  int rataMaks;
  int terburukMaks;
  int gagal;  // percobaan yang tidak selesai atau kehilangan garis
};

Ringkasan ringkas(const Hasil *h, int jumlah) {
  Ringkasan r = {0, 0, 0, 0, 0};
  int totalTick = 0;
  int totalMaks = 0;
  for (int i = 0; i < jumlah; i++) {
    totalTick += h[i].tick;
    totalMaks += h[i].maks;
    if (h[i].tick > r.terburukTick) {
      r.terburukTick = h[i].tick;
    }
    if (h[i].maks > r.terburukMaks) {
      r.terburukMaks = h[i].maks;
    }
    if (!h[i].selesai || h[i].hilang > 0) {
      r.gagal++;
    }
  }
  r.rataTick = totalTick / jumlah;
  r.rataMaks = totalMaks / jumlah;
  return r;
}

int main() {
  Hasil hm[JUMLAH_UJI];
  Hasil pr[JUMLAH_UJI];
  std::cout << "uji  benih  hidup-mati(tick,maks)  proporsional 3/4(tick,maks)\n";
  for (int i = 0; i < JUMLAH_UJI; i++) {
    uint32_t benih = 100 + i;  // benih yang sama untuk kedua strategi
    hm[i] = uji(false, 8, benih);
    pr[i] = uji(true, 3, benih);
    std::cout << std::setw(3) << i + 1 << std::setw(7) << benih << std::setw(14) << hm[i].tick << "," << std::setw(3)
              << hm[i].maks << std::setw(19) << pr[i].tick << "," << std::setw(3) << pr[i].maks << "\n";
  }
  Ringkasan a = ringkas(hm, JUMLAH_UJI);
  Ringkasan b = ringkas(pr, JUMLAH_UJI);
  std::cout << "ringkasan          rata tick  terburuk tick  rata maks  terburuk maks  gagal\n";
  std::cout << std::left << std::setw(19) << "hidup-mati T=8" << std::right << std::setw(9) << a.rataTick
            << std::setw(15) << a.terburukTick << std::setw(11) << a.rataMaks << std::setw(15) << a.terburukMaks
            << std::setw(7) << a.gagal << "\n";
  std::cout << std::left << std::setw(19) << "proporsional 3/4" << std::right << std::setw(9) << b.rataTick
            << std::setw(15) << b.terburukTick << std::setw(11) << b.rataMaks << std::setw(15) << b.terburukMaks
            << std::setw(7) << b.gagal << "\n";
}
```

Keluaran program (angka dihitung penulis dengan `g++ -std=c++17`):

```text
uji  benih  hidup-mati(tick,maks)  proporsional 3/4(tick,maks)
  1    100            46, 27                 44, 19
  2    101            44, 23                 44, 22
  3    102            45, 20                 47, 20
  4    103            45, 18                 43, 19
  5    104            44, 18                 44, 17
  6    105            43, 20                 45, 22
  7    106            44, 25                 44, 17
  8    107            42, 15                 43, 25
  9    108            45, 19                 45, 21
 10    109            46, 21                 45, 20
ringkasan          rata tick  terburuk tick  rata maks  terburuk maks  gagal
hidup-mati T=8            44             46         20             27      0
proporsional 3/4          44             47         20             25      0
```

Bacalah dengan jujur. Rata-rata tick keduanya sama (44) dan rata-rata simpangan terbesar juga sama (20 mm). Kesimpulan dari satu lari pada modul 8, bahwa hidup-mati lebih tenang (13 lawan 20 mm), **tidak bertahan**: pada sepuluh uji simpangan terbesar hidup-mati mencapai 27 mm, sedangkan proporsional hanya 25 mm. Dengan batas 25 mm dari modul 8, hidup-mati melanggar pada 1 dari 10 uji (uji 1), proporsional pada 0 (uji 8 tepat 25 mm). Itu sebabnya yang dibandingkan dengan batas adalah nilai terburuk: robot harus aman pada lari yang paling buruk, bukan pada lari yang biasa. Namun 10 uji tetap sedikit; dengan 30 benih berturut-turut terburuknya tetap 27 mm lawan 25 mm, dan kesimpulan yang jujur adalah "proporsional 3/4 sedikit lebih aman pada model ini", bukan "jauh lebih baik".

Sketsa berikut mengalibrasi lima sensor: nilai terkecil dan terbesar selama penyapuan, ambang di titik tengahnya, dan peringatan bila kontras kurang. Ia hanya diperiksa sintaksnya terhadap header tiruan, tidak dijalankan pada papan, dan tidak menyalakan motor.

```arduino
// Arduino-C++ untuk ESP32. Diperiksa check:module-code terhadap header tiruan (sintaks dan tipe saja, bukan bukti perilaku papan).
// Semua nomor pin dan angka contoh. Motor TIDAK dinyalakan: robot digeser dengan tangan di atas pita hitam dan lantai putih.
// Kalibrasi lima sensor garis: catat nilai terkecil dan terbesar selama penyapuan, lalu ambil titik tengahnya.
const int JUMLAH_SENSOR = 5;
const int PIN_SENSOR[JUMLAH_SENSOR] = {32, 33, 34, 35, 36};
const int PIN_MULAI = 5;               // tombol mulai ke GND
const unsigned long LAMA_SAPU_MS = 5000;
const int KONTRAS_MIN = 400;           // selisih terbesar-terkecil yang dianggap cukup (contoh)

int nilaiMin[JUMLAH_SENSOR];
int nilaiMax[JUMLAH_SENSOR];

void sapu() {
  for (int i = 0; i < JUMLAH_SENSOR; i++) {
    nilaiMin[i] = 4095;
    nilaiMax[i] = 0;
  }
  unsigned long mulai = millis();
  while (millis() - mulai < LAMA_SAPU_MS) {
    for (int i = 0; i < JUMLAH_SENSOR; i++) {
      int nilai = analogRead(PIN_SENSOR[i]);
      if (nilai < nilaiMin[i]) {
        nilaiMin[i] = nilai;
      }
      if (nilai > nilaiMax[i]) {
        nilaiMax[i] = nilai;
      }
    }
  }
}

void laporkan() {
  Serial.println("sensor,pin,min,max,ambang,status");
  for (int i = 0; i < JUMLAH_SENSOR; i++) {
    int ambang = (nilaiMin[i] + nilaiMax[i]) / 2;
    Serial.print(i);
    Serial.print(",");
    Serial.print(PIN_SENSOR[i]);
    Serial.print(",");
    Serial.print(nilaiMin[i]);
    Serial.print(",");
    Serial.print(nilaiMax[i]);
    Serial.print(",");
    Serial.print(ambang);
    Serial.print(",");
    Serial.println(nilaiMax[i] - nilaiMin[i] >= KONTRAS_MIN ? "baik" : "kontras kurang: periksa tinggi dan kabel");
  }
}

void setup() {
  Serial.begin(115200);
  pinMode(PIN_MULAI, INPUT_PULLUP);
  Serial.println("Tekan tombol mulai, lalu geser robot di atas pita dan lantai selama 5 detik.");
}

void loop() {
  if (digitalRead(PIN_MULAI) == LOW) {
    sapu();
    laporkan();
    delay(1000);
  }
}
```

Catat bersama tabel: tanggal, lintasan, tinggi sensor dari lantai, kondisi baterai, benih atau titik awal, dan versi program. Hasil yang tidak diketahui kondisinya tidak dapat dibandingkan lagi minggu depan.

## Contoh setengah jadi

Lengkapi `____` pada `ringkas`: jumlahkan tick tiap percobaan, simpan yang terbesar, hitung percobaan yang gagal, lalu bagi dengan banyak percobaan.

```cpp setengah-jadi
// C++17. Lengkapi bagian ____.
Ringkasan ringkas(const Hasil *h, int jumlah) {
  Ringkasan r = {0, 0, 0, 0, 0};
  int totalTick = 0;
  for (int i = 0; i < jumlah; i++) {
    totalTick += h[i].____;
    if (h[i].tick ____ r.terburukTick) { r.terburukTick = h[i].tick; }
    if (!h[i].selesai ____ h[i].hilang > 0) { r.gagal++; }
  }
  r.rataTick = totalTick / ____;
  return r;
}
```

## Soal Parsons

Susun baris-baris di bawah (sudah diacak) menjadi kalibrasi satu sensor. Titik awal `terkecil` dan `terbesar` harus ditetapkan sebelum penyapuan.

```text
(a) int ambang = (terkecil + terbesar) / 2;
(b)   if (nilai > terbesar) { terbesar = nilai; }
(c) int terkecil = 4095;
(d) while (millis() - mulai < LAMA_SAPU_MS) {
(e)   int nilai = analogRead(PIN_SENSOR);
(f) }
(g) int terbesar = 0;
(h)   if (nilai < terkecil) { terkecil = nilai; }
(i) unsigned long mulai = millis();
```

## Latihan

1. `AI: tanpa AI` **Hitung.** Satu sensor terbaca antara 380 dan 3120 selama penyapuan. Berapa ambangnya? Sensor lain terbaca antara 1500 dan 1800; berapa ambangnya, dan apakah kontrasnya cukup untuk `KONTRAS_MIN` 400?
2. `AI: boleh` **Sepuluh lari (F).** Tandai titik awal, jalankan sepuluh lari per strategi dengan pencatat lari modul 8, dan simpan semua baris. Hitung rata-rata dan nilai terburuk. Tanpa papan, ganti benih awal dari 100 ke 200, prediksikan dulu apakah kesimpulanmu berubah, lalu jalankan.
3. `AI: tanpa AI` **Baca tabel.** Berapa uji hidup-mati yang melampaui 25 mm, dan berapa proporsional? Tulis satu kalimat laporan yang jujur.
4. `AI: boleh` **Tambah uji.** Ubah `JUMLAH_UJI` menjadi 30. Prediksikan dulu apakah nilai terburuk bisa turun, lalu jalankan.
5. *Opsional:* **catatan pemakaian AI.** Bila memakai AI generatif, kerjakan nomor 3 sendiri dulu, lalu minta kritik atas kalimat laporanmu, bukan jawaban jadi. Catat alatnya, tujuanmu, garis besar perintahmu, bagian yang kamu pakai, dan cara memeriksanya. Jangan menaruh data pribadi pada perintah.

## Latihan bercampur

1. Pada `c-xii1-m4` tiap sensor punya ambang sendiri. Apa yang terjadi pada `hitungGalat` bila satu sensor memakai ambang yang salah?
2. Pada `c-x2-m10` kamu memakai median untuk membuang lonjakan. Bagaimana nilai terburuk pada tabel uji berbeda dari lonjakan yang dibuang median, dan mengapa di sini ia tidak dibuang?

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `C-XII1-M10` (sekitar satu minggu lagi), `C-XII1-M12` (sekitar tiga minggu lagi), dan `C-XII2-M3` (sekitar delapan minggu lagi). Jawab sekarang lalu simpan.

1. Mengapa hasil uji dicatat bersama kondisi baterai dan lintasannya?
2. Mengapa tabel hasil uji menyimpan setiap percobaan, bukan hanya rata-ratanya?
3. Bila rata-rata dua strategi hampir sama tetapi nilai terburuknya berbeda, strategi mana yang kamu pilih untuk robot di lantai kelas, dan mengapa?

## Kesalahan umum

- **Benih berbeda untuk strategi berbeda.** Selisih hasil bisa berasal dari titik awal, bukan dari strategi.
- **Hanya melaporkan rata-rata.** Lari terburuk yang melanggar batas ikut tersembunyi.
- **Mengira sepuluh uji sudah pasti.** Sepuluh uji mengurangi kebetulan, tidak menghilangkannya.
- **Mengubah beberapa hal sekaligus di antara dua uji.** Kamu tidak tahu mana yang menyebabkan perubahan.
- **Kalibrasi di bawah cahaya yang berbeda.** Ambang dari ruangan terang tidak berlaku di ruangan gelap; ulangi kalibrasi.

## Cek mandiri

- [ ] Saya mengalibrasi sensor dari nilai terkecil dan terbesar dan memeriksa kontrasnya.
- [ ] Saya menjaga lintasan dan baterai sama, dan memakai titik awal atau benih yang sama untuk kedua strategi.
- [ ] Saya menyimpan setiap percobaan, bukan hanya rata-rata.
- [ ] Saya melaporkan nilai terburuk dan membandingkannya dengan batas.
- [ ] Saya menyatakan batas kesimpulanku: berapa kali uji dan apa yang belum diuji.

## Kunci dan petunjuk

**Ingat kembali.** 1: bila lintasan atau titik awal berbeda, selisih hasil bisa berasal dari kondisi itu, bukan dari strategi. 2: robot yang melanggar batas pada lari terburuk tetap melanggarnya walau rata-ratanya baik; batas keselamatan atau kebutuhan berlaku pada kasus terburuk. 3: satu uji bisa dipengaruhi titik awal atau kebetulan; selisih kecil bisa hilang pada uji lain.

**Prediksi dulu.** 1: tidak; rata-rata kira-kira sama (20 mm untuk keduanya) dan terburuk hidup-mati 27 mm, proporsional 25 mm. 2: ya, selisih rata-rata tick nol dan terburuknya 46 lawan 47. 3: selisih bisa berasal dari titik awal atau derau yang berbeda, bukan dari strategi.

**Contoh setengah jadi.** Isian berurutan: `tick`, `>`, `||`, `jumlah`. Kunci yang dikompilasi dan dijalankan penulis pada tabel contoh menghasilkan rata-rata tick 44 dan 44, terburuk 46 dan 47.

**Soal Parsons.** Urutan benar: c, g, i, d, e, h, b, f, a (c, g, dan i boleh bertukar; h dan b boleh bertukar). `a` terakhir karena ambang dihitung setelah penyapuan selesai; `c` dan `g` harus sebelum `d` supaya nilai awal ada.

**Latihan.** 1: (380 + 3120) / 2 = 1750; (1500 + 1800) / 2 = 1650; kontras sensor kedua 300, kurang dari 400, jadi tidak cukup. 2: tidak ada kunci tunggal; jawaban yang baik menyimpan sepuluh baris per strategi, menyebut kondisi tetap, dan melaporkan nilai terburuk. 3: hidup-mati 1 uji (uji 1 dengan 27 mm), proporsional 0 (uji 8 tepat 25 mm); laporan contoh: "Pada 10 uji, hidup-mati melanggar batas 25 mm satu kali dan proporsional tidak pernah." 4: tidak bisa turun, karena 30 benih memuat 10 benih pertama; dengan 30 uji terburuk tetap 27 mm lawan 25 mm (dihitung penulis), sedangkan yang berubah hanya rata-rata (simpangan terbesar 20 lawan 19 mm).

**Latihan bercampur.** 1: sensor itu akan terbaca gelap atau terang pada saat yang salah, sehingga galat bergeser atau garis dianggap hilang; itu sebabnya kalibrasi diperiksa kontrasnya. 2: median membuang lonjakan tunggal yang kemungkinan derau pengukuran; nilai terburuk adalah hasil nyata dari sistem pada kondisi buruk, dan membuangnya akan menyembunyikan risiko.

**Ulang berjarak.** 1: baterai yang melemah atau lintasan yang berubah mengubah hasil walau program sama, jadi tanpa catatan kondisi hasil tidak dapat dibandingkan. 2: dari tiap percobaan orang lain dapat menghitung ulang nilai terburuk, sebaran, dan percobaan yang aneh; rata-rata menghilangkannya. 3: contoh jawaban: pilih yang terburuknya lebih baik bila robot dekat orang atau tepi meja, karena yang penting aman pada lari terburuk; tulis alasannya dan syaratnya.

## Langkah berikutnya

Modul berikut: `C-XII1-M10` (daya dan keselamatan baterai), yang membaca tegangan baterai dan menyusun lembar periksa daya. Bacaan lanjut: dokumentasi `analogRead` dan ADC Arduino-ESP32 (lihat Rujukan).
