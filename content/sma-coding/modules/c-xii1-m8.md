## Untuk siapa modul ini

Modul ini untuk murid kelas XII jalur C (IoT dan robotika), minggu `C-XII1-M8` silabus v1.4: membandingkan strategi (F). Prasyarat terindeks: `c-xi2-m14`. Kamu juga memakai pengikut garis dari `c-xii1-m6` (hidup-mati) dan `c-xii1-m7` (proporsional), yang belum terindeks saat modul ini ditulis.

Modul ini karangan penyusun dan disetujui pemilik program pada 2026-11-20 (keputusan lewat dialog; catatan tinjauan menjadi tindak lanjut revisi). Ia mendukung butir `F-BK-b` (lebih dari satu solusi, justifikasi efisiensi), `F-AP-a` (konsep strategi algoritmik), dan `F-AP-b` (program terstruktur berdasarkan strategi), dan tidak dihitung memenuhi butir capaian pembelajaran mana pun; pemetaan `F-AP-a` untuk jalur C bersifat parsial. Keluaran minggu ini: laporan perbandingan. Latihan silabusnya: waktu tempuh dan galat dua strategi.

Ada dua cara mengerjakan. **Dengan papan (F):** kelompok memakai robot dan lintasan pita hitam yang sama dengan modul 6 dan 7, dengan pencatat lari di bawah. **Tanpa papan:** kamu menjalankan simulasi di komputer, dengan model sederhana karangan (bukan fisika robot nyata). Nomor pin, ambang, dan angka kecepatan hanya contoh `[belum terverifikasi]` untuk robotmu.

## Keselamatan perangkat

- Papan memakai daya USB; motor memakai baterai AA/AAA yang disediakan guru lewat modul pengendali. Tidak ada listrik jaringan (220 V), tidak ada baterai litium tanpa pelindung, dan kamu tidak mengisi daya litium.
- Cabut baterai dan kabel USB sebelum mengubah rangkaian; periksa polaritas. Motor tidak disambung langsung ke pin papan. Tidak ada solder.
- Setiap kali strategi atau parameter diganti, uji dulu dengan **roda terangkat**. Lari uji hanya di meja bertepi atau lantai bersih yang kosong; bagian yang bergerak tidak disentuh saat menyala.
- Siapkan cara memutus daya motor (saklar atau mencabut baterai) dan tombol berhenti; ketahui letaknya sebelum menyalakan. Pemegang stopwatch berdiri di luar jalur robot.
- Papan, modul, atau motor yang terasa panas, berbau, atau berasap: cabut daya dan panggil guru. Tidak ada kamera atau mikrofon, dan tidak ada sensor tubuh.

## Ingat kembali

Jawab dari ingatan dulu, baru cek di kunci. Soal 1 dari `c-xii1-m7`, soal 2 dari `c-xii1-m5`, soal 3 dari `c-xii1-m6`.

1. Mengapa mengalikan dulu, baru membagi, pada `-pembilang * galat / penyebut`?
2. Mengapa keadaan `AMAN` hanya bisa dikeluarkan oleh tindakan manusia?
3. Apa yang diukur oleh hitungan pergantian arah, dan apa yang ditunjukkan bila angkanya besar?

## Tujuan

Setelah modul ini kamu dapat:

- mengukur waktu tempuh dan simpangan dua strategi pada lintasan dan kondisi awal yang sama;
- menulis syarat wajib dan kriteria peringkat sebagai fungsi, bukan sebagai perasaan;
- menjustifikasi pilihan strategi dari angka, dan menyebut apa yang akan membalik pilihan itu;
- menyusun laporan perbandingan yang dapat diulang orang lain (keluaran minggu ini).

## Prediksi dulu

Model sama dengan modul 6 dan 7, dengan dua tambahan karangan. Robot harus menempuh 800 mm. Pada tiap tick robot maju 20 mm bila |x| paling banyak 10 mm (garis masih dekat), dan 10 mm bila lebih jauh; bila garis hilang robot berhenti. Sesudah tick ke-40 lintasan lurus. **Tebak dulu, tulis jawabanmu, baru jalankan.**

1. Berapa tick paling sedikit yang mungkin, dan berapa tick bila robot selalu di laju lambat?
2. Dari hidup-mati `T` = 8, proporsional 2/4, 3/4, dan 4/4, strategi mana yang kamu duga tercepat, dan mana yang simpangan terbesarnya paling kecil?
3. Bila kamu hanya boleh memilih satu, apa yang kamu perlukan lebih dulu sebelum menjawab: angka atau tujuan robotnya?

## Contoh terselesaikan

Membandingkan strategi berarti mengukur hal yang sama dengan cara yang sama, lalu memutuskan dengan aturan yang ditulis **sebelum** melihat pemenangnya. Tiga ukuran: **tick tempuh** (waktu), **simpangan terbesar** (jarak terjauh dari garis), dan **rata-rata |x|**. Pilihan memakai dua tahap seperti pada `c-xii1-m2`: syarat wajib mencoret yang tidak layak, baru sisanya diperingkat. Syaratnya: lari selesai, garis tidak pernah hilang, dan simpangan terbesar tidak melewati batas. Peringkat: tick tempuh terkecil, rata-rata |x| memecahkan seri.

```cpp
// C++17 biasa, jalan di komputer. Diperiksa oleh check:module-code.
// MODEL SEDERHANA KARANGAN, bukan fisika robot nyata. Model dan lintasan sama dengan modul 6 dan 7.
// x = posisi tengah robot terhadap tengah garis (mm); positif = robot di kanan garis.
#include <cstdlib>
#include <iomanip>
#include <iostream>

const int JUMLAH_SENSOR = 5;
const int POSISI_SENSOR[JUMLAH_SENSOR] = {-30, -15, 0, 15, 30};  // mm dari tengah robot
const int SETENGAH_LEBAR_GARIS = 10;                              // mm
const int TICK_GESER = 40;                                        // tick pertama punya geseran; sesudahnya lurus
const int GESER[TICK_GESER] = {0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 4, 9, 9, 9, 9, 9, 0, 0, 0, 0,
                               0, -4, -4, -4, -4, -4, -4, -4, -4, -4, -4, 0, 0, 0, 0, 0, 0, 0, 0, 0};
const int PANJANG_LINTASAN = 800;  // mm yang harus ditempuh
const int LAJU_CEPAT = 20;         // mm per tick bila |x| <= 10 mm
const int LAJU_LAMBAT = 10;        // mm per tick bila robot lebih jauh dari garis
const int TICK_MAKS = 120;         // batas waktu: bila belum sampai, dianggap gagal
const int PENYEBUT = 4;
const int KOREKSI_MAKS = 15;

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

struct Strategi {
  const char *nama;
  bool proporsionalAktif;
  int parameter;
};

struct Ukuran {
  int tickTempuh;  // tick sampai PANJANG_LINTASAN tercapai; TICK_MAKS bila gagal
  bool selesai;
  int jumlahMutlak;  // jumlah |x| selama tickTempuh
  int maks;          // |x| terbesar
  int hilang;        // tick tanpa garis
};

Ukuran ukur(const Strategi &s, int x0) {
  Ukuran u = {0, false, 0, 0, 0};
  int x = x0;
  int terdahulu = 0;  // koreksi satu tick lalu
  int jarak = 0;
  for (int t = 0; t < TICK_MAKS && !u.selesai; t++) {
    int a = std::abs(x);
    u.jumlahMutlak += a;
    if (a > u.maks) {
      u.maks = a;
    }
    int galat = 0;
    int koreksi = 0;
    bool ada = hitungGalat(x, galat);
    if (ada) {
      koreksi = s.proporsionalAktif ? proporsional(galat, s.parameter) : hidupMati(galat, s.parameter);
      jarak += (a <= SETENGAH_LEBAR_GARIS) ? LAJU_CEPAT : LAJU_LAMBAT;
    } else {
      u.hilang++;  // garis hilang: robot berhenti, jarak tidak bertambah
    }
    u.tickTempuh = t + 1;
    if (jarak >= PANJANG_LINTASAN) {
      u.selesai = true;
    }
    int geser = (t < TICK_GESER) ? GESER[t] : 0;
    x = x + geser - terdahulu;
    terdahulu = koreksi;
  }
  return u;
}

const int MAKS_BOLEH = 25;  // syarat wajib: robot tidak boleh lebih dari 25 mm dari garis

// Syarat wajib lebih dulu: selesai, garis tidak hilang, dan simpangan terbesar tidak melewati batas.
bool lolos(const Ukuran &u, int maksBoleh) { return u.selesai && u.hilang == 0 && u.maks <= maksBoleh; }

// Dari yang lolos, yang tickTempuh-nya paling kecil menang; seri dipecahkan oleh rata-rata |x| terkecil.
// Mengembalikan -1 bila tidak ada yang lolos.
int pilih(const Ukuran *hasil, int jumlah, int maksBoleh) {
  int terbaik = -1;
  for (int i = 0; i < jumlah; i++) {
    if (!lolos(hasil[i], maksBoleh)) {
      continue;
    }
    if (terbaik < 0 || hasil[i].tickTempuh < hasil[terbaik].tickTempuh ||
        (hasil[i].tickTempuh == hasil[terbaik].tickTempuh && hasil[i].jumlahMutlak * hasil[terbaik].tickTempuh <
                                                               hasil[terbaik].jumlahMutlak * hasil[i].tickTempuh)) {
      terbaik = i;
    }
  }
  return terbaik;
}

int main() {
  const Strategi daftar[] = {
      {"hidup-mati T=8", false, 8}, {"proporsional 2/4", true, 2}, {"proporsional 3/4", true, 3}, {"proporsional 4/4", true, 4}};
  const int JUMLAH = 4;
  Ukuran hasil[JUMLAH];
  std::cout << "strategi           tick  selesai  rata2|x|  maks|x|  hilang  syarat\n";
  for (int i = 0; i < JUMLAH; i++) {
    const Ukuran &u = hasil[i] = ukur(daftar[i], 12);
    std::cout << std::left << std::setw(17) << daftar[i].nama << std::right << std::setw(5) << u.tickTempuh
              << std::setw(9) << (u.selesai ? "ya" : "tidak") << std::fixed << std::setprecision(1) << std::setw(10)
              << static_cast<double>(u.jumlahMutlak) / u.tickTempuh << std::setw(9) << u.maks << std::setw(8) << u.hilang
              << "  " << (lolos(u, MAKS_BOLEH) ? "lolos" : "dicoret") << "\n";
  }
  for (int batas : {MAKS_BOLEH, 15, 10}) {
    int p = pilih(hasil, JUMLAH, batas);
    std::cout << "batas simpangan " << batas << " mm: ";
    if (p < 0) {
      std::cout << "tidak ada yang lolos\n";
    } else {
      std::cout << daftar[p].nama << "\n";
    }
  }
}
```

Keluaran program (angka dihitung penulis dengan `g++ -std=c++17`):

```text
strategi           tick  selesai  rata2|x|  maks|x|  hilang  syarat
hidup-mati T=8      47       ya       6.5       13       0  lolos
proporsional 2/4    46       ya       6.6       22       0  lolos
proporsional 3/4    45       ya       5.7       20       0  lolos
proporsional 4/4    51       ya      10.6       27       0  dicoret
batas simpangan 25 mm: proporsional 3/4
batas simpangan 15 mm: hidup-mati T=8
batas simpangan 10 mm: tidak ada yang lolos
```

Bacalah dengan jujur. Proporsional 3/4 tercepat (45 tick) dan rata-rata paling dekat ke garis (5,7 mm), tetapi selisihnya dari hidup-mati hanya 2 tick, dari **satu** kondisi awal. Hidup-mati punya simpangan terbesar paling kecil (13 mm). Proporsional 4/4 berayun, lambat, dan melewati batas 25 mm, jadi dicoret. Pemenang bergantung pada tujuan: bila robot harus tetap dalam 15 mm dari garis, hanya hidup-mati yang lolos; bila batasnya 10 mm, tidak ada yang lolos, dan jawaban jujurnya "belum ada strategi yang memenuhi", bukan memilih yang paling mendekati. Model ini karangan, jadi hasilnya mengajari cara membandingkan, bukan menggambarkan robotmu.

Sketsa berikut mencatat satu lari robot sebagai satu baris CSV. Ia hanya diperiksa sintaksnya terhadap header tiruan, tidak dijalankan pada papan. Galat yang ia catat berasal dari lima sensor sehingga kasar dan berundak; angkanya tidak sama dengan |x| pada model.

```arduino
// Arduino-C++ untuk ESP32. Diperiksa check:module-code terhadap header tiruan (sintaks dan tipe saja, bukan bukti perilaku papan).
// Semua nomor pin dan angka contoh; ganti dengan hasil kalibrasi dan lembar guru. Jalankan pertama kali dengan roda terangkat.
// Pengukur lari uji: satu lari, satu baris CSV. Garis melintang di akhir lintasan membuat kelima sensor gelap.

const int JUMLAH_SENSOR = 5;
const int PIN_SENSOR[JUMLAH_SENSOR] = {32, 33, 34, 35, 36};
const int POSISI_SENSOR[JUMLAH_SENSOR] = {-30, -15, 0, 15, 30};
const int AMBANG[JUMLAH_SENSOR] = {1800, 2000, 1875, 2110, 1740};  // dari kalibrasi modul 4
const int PIN_KIRI_IN1 = 17;
const int PIN_KIRI_IN2 = 16;
const int PIN_KIRI_PWM = 27;
const int PIN_KANAN_IN1 = 18;
const int PIN_KANAN_IN2 = 19;
const int PIN_KANAN_PWM = 14;
const int PIN_BERHENTI = 4;  // tombol berhenti ke GND
const int PIN_MULAI = 5;     // tombol mulai ke GND
const int KECEPATAN_DASAR = 150;
const int UNIT_PER_MM = 5;
const int KOREKSI_MAKS = 15;
const bool PAKAI_PROPORSIONAL = true;  // ubah satu hal pada satu waktu
const int PEMBILANG = 3;               // dipakai kedua strategi: T untuk hidup-mati, pembilang Kp untuk proporsional
const int PENYEBUT = 4;
const unsigned long SELANG_MS = 20;
const unsigned long BATAS_MS = 60000;  // lari yang lebih lama dianggap gagal

bool berlari = false;
unsigned long mulaiLari = 0;
unsigned long mulaiTick = 0;
long jumlahMutlak = 0;  // jumlah |galat sensor| (mm); kasar, bukan posisi sebenarnya
int maksGalat = 0;
int jumlahTick = 0;
int jumlahHilang = 0;

void tulisMotor(int pinIn1, int pinIn2, int pinPwm, int kecepatan) {
  int k = constrain(kecepatan, -255, 255);
  digitalWrite(pinIn1, k > 0 ? HIGH : LOW);
  digitalWrite(pinIn2, k < 0 ? HIGH : LOW);
  ledcWrite(pinPwm, k < 0 ? -k : k);
}

void kendali(int kiri, int kanan) {
  tulisMotor(PIN_KIRI_IN1, PIN_KIRI_IN2, PIN_KIRI_PWM, kiri);
  tulisMotor(PIN_KANAN_IN1, PIN_KANAN_IN2, PIN_KANAN_PWM, kanan);
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

int proporsional(int galat) {
  int koreksi = -PEMBILANG * galat / PENYEBUT;
  return constrain(koreksi, -KOREKSI_MAKS, KOREKSI_MAKS);
}

void akhiri(const char *alasan) {
  kendali(0, 0);
  berlari = false;
  Serial.print(PAKAI_PROPORSIONAL ? "proporsional" : "hidup-mati");
  Serial.print(",");
  Serial.print(PEMBILANG);
  Serial.print(",");
  Serial.print(millis() - mulaiLari);
  Serial.print(",");
  Serial.print(jumlahTick > 0 ? jumlahMutlak / jumlahTick : 0);
  Serial.print(",");
  Serial.print(maksGalat);
  Serial.print(",");
  Serial.print(jumlahHilang);
  Serial.print(",");
  Serial.println(alasan);
}

void setup() {
  Serial.begin(115200);
  pinMode(PIN_KIRI_IN1, OUTPUT);
  pinMode(PIN_KIRI_IN2, OUTPUT);
  pinMode(PIN_KANAN_IN1, OUTPUT);
  pinMode(PIN_KANAN_IN2, OUTPUT);
  pinMode(PIN_BERHENTI, INPUT_PULLUP);
  pinMode(PIN_MULAI, INPUT_PULLUP);
  ledcAttach(PIN_KIRI_PWM, 1000, 8);
  ledcAttach(PIN_KANAN_PWM, 1000, 8);
  kendali(0, 0);
  Serial.println("strategi,parameter,waktu_ms,rata2_galat_mm,maks_galat_mm,tick_hilang,akhir");
}

void loop() {
  if (digitalRead(PIN_BERHENTI) == LOW) {
    if (berlari) {
      akhiri("dihentikan");
    }
    kendali(0, 0);
    return;
  }
  if (!berlari) {
    if (digitalRead(PIN_MULAI) == LOW) {
      berlari = true;
      mulaiLari = millis();
      mulaiTick = mulaiLari;
      jumlahMutlak = 0;
      maksGalat = 0;
      jumlahTick = 0;
      jumlahHilang = 0;
    }
    return;
  }
  if (millis() - mulaiLari > BATAS_MS) {
    akhiri("waktu habis");
    return;
  }
  if (millis() - mulaiTick < SELANG_MS) {
    return;
  }
  mulaiTick = millis();
  int jumlah = 0;
  int banyak = 0;
  for (int i = 0; i < JUMLAH_SENSOR; i++) {
    if (analogRead(PIN_SENSOR[i]) > AMBANG[i]) {  // pada rangkaian ini hitam lebih besar
      jumlah += POSISI_SENSOR[i];
      banyak++;
    }
  }
  if (banyak == JUMLAH_SENSOR) {
    akhiri("garis akhir");
    return;
  }
  if (banyak == 0) {
    jumlahHilang++;
    kendali(0, 0);  // garis hilang: berhenti, tidak menebak
    return;
  }
  int galat = jumlah / banyak;
  int koreksi = PAKAI_PROPORSIONAL ? proporsional(galat) : hidupMati(galat, PEMBILANG);
  jumlahTick++;
  jumlahMutlak += galat < 0 ? -galat : galat;
  if ((galat < 0 ? -galat : galat) > maksGalat) {
    maksGalat = galat < 0 ? -galat : galat;
  }
  kendali(KECEPATAN_DASAR - UNIT_PER_MM * koreksi, KECEPATAN_DASAR + UNIT_PER_MM * koreksi);
}
```

Laporan perbandingan memuat lima bagian: tujuan robot dan batas yang disepakati; kondisi uji (lintasan, kondisi awal, baterai, nilai parameter); tabel hasil; keputusan beserta alasan yang menyebut syarat dan peringkat; dan batasan (berapa kali uji, apa yang belum diukur).

## Contoh setengah jadi

Lengkapi `____` pada `pilih`: syarat wajib memakai batas yang diberikan, dan yang lebih sedikit tick-nya menang.

```cpp setengah-jadi
// C++17. Lengkapi bagian ____.
int pilih(const Ukuran *hasil, int jumlah, int maksBoleh) {
  int terbaik = -1;
  for (int i = 0; i < jumlah; i++) {
    if (!lolos(hasil[i], ____)) { continue; }
    if (terbaik < 0 || hasil[i].tickTempuh ____ hasil[terbaik].tickTempuh) { terbaik = ____; }
  }
  return terbaik;
}
```

## Soal Parsons

Susun baris-baris di bawah (sudah diacak) menjadi inti perulangan `ukur`. Perhatikan: koreksi harus sudah dihitung sebelum disimpan sebagai `terdahulu`, dan `x` memakai `terdahulu` yang lama.

```text
(a)     u.tickTempuh = t + 1;
(b)     if (jarak >= PANJANG_LINTASAN) { u.selesai = true; }
(c)     bool ada = hitungGalat(x, galat);
(d)     x = x + geser - terdahulu;
(e)     terdahulu = koreksi;
(f)     if (ada) { koreksi = ...; jarak += ...; } else { u.hilang++; }
(g)     int geser = (t < TICK_GESER) ? GESER[t] : 0;
```

## Latihan

1. `AI: tanpa AI` **Hitung.** Robot menempuh 800 mm; 30 tick pertama di laju cepat (20 mm per tick), sisanya di laju lambat (10 mm per tick). Berapa tick tempuhnya?
2. `AI: boleh` **Dua strategi, satu lari (F).** Dengan pencatat lari, jalankan hidup-mati lalu proporsional pada lintasan yang sama, dari titik awal yang sama, dengan roda terangkat lebih dulu. Ubah satu hal pada satu waktu dan salin dua baris CSV ke tabelmu. Tanpa papan, jalankan simulasi dan salin tabelnya.
3. `AI: tanpa AI` **Balikkan pilihan.** Dari tabel contoh, siapa pemenang bila batas simpangan 19 mm? Jelaskan mengapa pemenangnya berubah dari batas 25 mm.
4. `AI: boleh` **Ubah batas koreksi.** Ubah `KOREKSI_MAKS` menjadi 6, prediksikan dulu siapa pemenang pada batas 25 mm, lalu jalankan.
5. *Opsional:* **catatan pemakaian AI.** Bila memakai AI generatif, kerjakan nomor 3 sendiri dulu, lalu minta kritik atas alasanmu, bukan jawaban jadi. Catat alatnya, tujuanmu, garis besar perintahmu, bagian yang kamu pakai, dan cara memeriksanya. Jangan menaruh data pribadi pada perintah.

## Latihan bercampur

1. Pada `c-xii1-m5` robot masuk `AMAN` bila garis hilang. Bagaimana syarat "garis tidak pernah hilang" pada `lolos` berhubungan dengan itu?
2. Pada `c-xii1-m2` pemenang berbalik ketika bobot berubah. Apa padanannya di modul ini, dan mengapa satu ukuran saja, seperti tick tempuh, tidak cukup untuk memutuskan strategi?

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `C-XII1-M9` (sekitar satu minggu lagi), `C-XII1-M11` (sekitar tiga minggu lagi), dan `C-XII2-M2` (sekitar delapan minggu lagi). Jawab sekarang lalu simpan.

1. Mengapa satu kali uji dari satu kondisi awal belum cukup untuk memilih strategi?
2. Mengapa syarat wajib dipasang sebelum meranking strategi, dan apa yang terjadi pada pemenangnya bila syaratnya diubah?
3. Sebut bagian-bagian laporan perbandingan agar orang lain dapat mengulang ujinya.

## Kesalahan umum

- **Membandingkan pada kondisi berbeda.** Lintasan, titik awal, atau baterai yang berubah membuat selisih tidak bisa dipercaya.
- **Memilih syarat setelah melihat pemenang.** Itu membenarkan pilihan yang sudah dibuat, bukan memutuskan.
- **Menganggap selisih kecil sebagai bukti.** Dua tick dari satu lari bisa hanya kebetulan.
- **Memilih yang paling mendekati bila tak ada yang lolos.** Lapor bahwa syaratnya belum terpenuhi.
- **Mengira hasil model berlaku untuk robot nyata.** Model hanya mengajari cara membandingkan.

## Cek mandiri

- [ ] Saya mengukur dua strategi pada lintasan dan kondisi awal yang sama.
- [ ] Saya menulis syarat wajib dan peringkat sebelum melihat hasil.
- [ ] Saya dapat menyebut apa yang membalik pilihan saya.
- [ ] Saya melaporkan batasan ujiku, termasuk berapa kali uji.
- [ ] Saya menguji dengan roda terangkat lebih dulu.

## Kunci dan petunjuk

**Ingat kembali.** 1: bila dibagi dulu, `3 / 4` pada bilangan bulat menjadi 0 dan koreksi hilang; mengalikan dulu mempertahankan pecahan sampai pembagian terakhir. 2: keadaan aman adalah penghenti terakhir; bila program yang sama boleh mengeluarkan robot dari sana, penyebab masalah bisa berulang tanpa ada orang yang memeriksanya; manusia memeriksa dulu, lalu menekan tombol. 3: seberapa sering koreksi berbalik arah; angka besar berarti robot berayun melewati garis bolak-balik.

**Prediksi dulu.** 1: 800 / 20 = 40 tick paling sedikit; 800 / 10 = 80 tick bila selalu lambat. 2: tidak ada kunci tunggal; tulis alasanmu, lalu bandingkan dengan tabel. 3: tujuan robot: batas simpangan dan prioritas waktu menentukan syarat dan peringkat; angka tanpa tujuan tidak memutuskan apa-apa.

**Contoh setengah jadi.** Isian berurutan: `maksBoleh`, `<`, `i`. Kunci dikompilasi dan dijalankan penulis pada tiga hasil contoh: batas 25 mm memilih yang tercepat yang lolos, batas 15 mm memilih yang simpangannya kecil, dan batas 5 mm menghasilkan -1 (tidak ada yang lolos).

**Soal Parsons.** Urutan benar: g, c, f, a, b, d, e (g boleh di mana saja sebelum d, dan a boleh sebelum c). `c` sebelum `f` karena `f` memakai hasil galat; `d` sebelum `e` supaya `x` memakai koreksi tick sebelumnya, bukan koreksi sekarang.

**Latihan.** 1: 30 x 20 = 600 mm; sisa 200 mm pada 10 mm per tick = 20 tick; total 50 tick. 2: tidak ada kunci tunggal; tabel yang baik memuat dua baris dengan kondisi yang sama dan satu kalimat keputusan yang menyebut syarat. 3: pada batas 19 mm hanya hidup-mati yang lolos (simpangan 13 mm; 2/4 punya 22 mm dan 3/4 punya 20 mm), sehingga ia menang meski lebih lambat; syarat wajib mengubah siapa yang boleh bersaing. 4: dengan `KOREKSI_MAKS` 6, 2/4 melewati 25 mm (29 mm) dan dicoret, dan pemenangnya menjadi proporsional 4/4 dengan 46 tick; koreksi yang dijepit rendah membuat 4/4 tidak berayun parah (dihitung penulis).

**Latihan bercampur.** 1: garis hilang adalah gejala bahwa robot kehilangan jalur; di `c-xii1-m5` itu memicu `AMAN`, dan di `lolos` itu mencoret strategi, jadi strategi yang membuat robot masuk `AMAN` tidak boleh menang. 2: padanannya adalah batas simpangan: mengubahnya membalik pemenang, seperti bobot pada `c-xii1-m2`; strategi tercepat bisa saja berayun atau hampir kehilangan garis, dan ukuran lain menangkap risiko yang tidak terlihat pada waktu.

**Ulang berjarak.** 1: hasil satu uji bisa dipengaruhi kondisi awal atau kebetulan; selisih kecil mungkin hilang pada uji lain (diselidiki pada `C-XII1-M9`). 2: syarat mengubah siapa yang boleh bersaing; bila diubah, pemenang bisa berbalik, sehingga syarat harus dibenarkan dari tujuan robot dan ditulis lebih dulu. 3: tujuan dan batas, kondisi uji, tabel hasil, keputusan dengan alasan, dan batasan.

## Langkah berikutnya

Modul berikut: `C-XII1-M9` (kalibrasi dan pengujian sistematis), yang mengulang uji sepuluh kali per strategi dan mencatat hasilnya. Bacaan lanjut: dokumentasi `constrain`, `millis`, dan `analogRead` (lihat Rujukan).
