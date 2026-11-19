## Untuk siapa modul ini

Modul ini untuk murid kelas XII jalur C (IoT dan robotika), minggu `C-XII1-M10` silabus v1.4: daya dan keselamatan baterai (F). Prasyarat: modul `c-xii1-m9` (kalibrasi dan pengujian sistematis) dan `FND-X1-M6` (keselamatan dan etika digital). Kamu juga memakai perkiraan waktu operasi dari `c-xii1-m2`, yang belum terindeks saat modul ini ditulis.

Modul ini berstatus DRAF: karangan penyusun, belum ditinjau pemilik, dan tidak dihitung memenuhi butir capaian pembelajaran mana pun. Keluaran minggu ini: lembar periksa daya. Latihan silabusnya: rencana daya robot.

Ada dua cara mengerjakan. **Dengan papan (F):** kelompok memasang pembagi tegangan dan memantau baterai robot dengan bimbingan guru. **Tanpa papan:** kamu menjalankan program lembar periksa di komputer dengan pembacaan karangan. Semua angka baterai, resistor, dan arus hanya contoh `[belum terverifikasi]`; ambil dari lembar data komponenmu dan dari pengukuran.

## Keselamatan perangkat

Modul ini tentang keselamatan daya, jadi aturannya lebih lengkap.

- Daya hanya dari USB atau baterai AA/AAA yang disediakan guru. Tidak ada listrik jaringan (220 V), tidak ada baterai litium tanpa pelindung, dan kamu tidak mengisi daya litium. Tidak ada solder.
- Jangan campur baterai baru dengan lama atau jenis yang berbeda dalam satu wadah. Periksa polaritas sebelum memasang; cabut baterai sebelum mengubah rangkaian.
- Jangan menyambung kutub positif dan negatif langsung dengan kabel atau logam. Baterai bocor, menggembung, atau panas diserahkan ke guru; jangan dibuka.
- Baterai habis diserahkan ke guru untuk dikumpulkan, bukan dibuang ke sampah biasa. Lepas baterai dari robot yang disimpan.
- Pin papan tidak boleh menerima tegangan di atas tegangan kerjanya; baterai tidak pernah langsung ke pin. Motor lewat modul pengendali, tidak ke pin papan.
- Papan, modul, motor, atau baterai yang terasa panas, berbau, atau berasap: cabut daya dan panggil guru. Tidak ada kamera atau mikrofon, dan tidak ada sensor tubuh.

## Ingat kembali

Jawab dari ingatan dulu, baru cek di kunci. Soal 1 dari `c-xii1-m2`, soal 2 dari `c-xii1-m7`, soal 3 dari `c-xii1-m9`.

1. Mengapa hitungan waktu operasi tidak memakai seluruh kapasitas baterai?
2. Apa yang terjadi bila `Kp` terlalu besar pada robot yang efek koreksinya tertunda satu tick, dan apa gejalanya pada hitungan pergantian arah?
3. Mengapa hasil uji dicatat bersama kondisi baterai dan lintasannya?

## Tujuan

Setelah modul ini kamu dapat:

- memilih sumber daya yang aman untuk robot sekolah dan menyebut aturan pemakaiannya;
- membaca tegangan baterai lewat pembagi tegangan dan ADC, dengan kalibrasi dua titik;
- menentukan ambang NORMAL, LEMAH, dan BERHENTI, dan membuat robot berhenti sendiri;
- menyusun lembar periksa daya: tegangan pin, waktu operasi, dan arus motor macet (keluaran minggu ini).

## Prediksi dulu

Empat sel AA diberi pembagi tegangan 20 kOhm dan 10 kOhm; pin hanya melihat R2 / (R1 + R2). Contoh kalibrasi: bacaan mentah 1850 sama dengan 1500 mV di pin, dan 2480 sama dengan 2000 mV. Ambang contoh: NORMAL bila baterai 5200 mV atau lebih, LEMAH bila 4600 sampai 5199, BERHENTI di bawahnya. **Tebak dulu, tulis jawabanmu, baru telusuri.**

1. Berapa persen dari tegangan baterai yang sampai ke pin, dan mengapa pembagi diperlukan?
2. Bacaan mentah 2480 berarti berapa mV di pin, dan berapa mV di baterai?
3. Robot berarus rata-rata kecil lolos uji waktu operasi. Apakah itu cukup untuk menyebutnya aman? Apa lagi yang perlu diperiksa?

## Contoh terselesaikan

Baterai tidak menyimpan tegangan tetap. Tegangannya turun saat terpakai dan saat beban berat, dan motor yang macet menarik arus jauh lebih besar dari arus rata-rata. Baterai yang lemah membuat papan bisa mati atau berperilaku aneh di tengah lari, sehingga robot sebaiknya **berhenti sendiri** sebelum itu terjadi.

Untuk membaca tegangan baterai, bagi dulu dengan dua resistor, karena pin papan tidak tahan tegangan baterai. `analogRead` pada ESP32 mengembalikan bilangan mentah yang tidak terkalibrasi; dokumentasi Arduino-ESP32 menyediakan `analogReadMilliVolts` untuk hasil terkalibrasi, tetapi modul ini memakai cara yang selalu bisa kamu lakukan sendiri: **kalibrasi dua titik** dengan voltmeter. Kamu mengukur tegangan di pin pada dua kondisi, mencatat bacaan mentahnya, lalu menginterpolasi. Tegangan baterai diperoleh dengan mengalikan dulu, baru membagi, agar pecahan tidak hilang. Keputusan BERHENTI terkunci: hanya pengguna yang membukanya, seperti `AMAN` pada `c-xii1-m5`.

```cpp
// C++17 biasa, jalan di komputer. Diperiksa oleh check:module-code.
// Angka baterai, resistor, dan arus adalah CONTOH karangan; ambil dari lembar data komponenmu dan dari pengukuran.
#include <iomanip>
#include <iostream>
#include <string>

// Pembagi tegangan: tegangan baterai -> R1 -> pin ADC -> R2 -> GND. Pin hanya melihat R2 / (R1 + R2).
const int R1_OHM = 20000;
const int R2_OHM = 10000;
const int PIN_MV_MAKS = 3100;  // contoh batas aman tegangan di pin papan 3,3 V; periksa lembar data papanmu

// Kalibrasi dua titik: dua pembacaan mentah ADC dicocokkan dengan voltmeter (tegangan DI PIN, dalam mV).
const int RAW_1 = 1850;
const int MV_1 = 1500;
const int RAW_2 = 2480;
const int MV_2 = 2000;

int rawKeMvPin(int raw) { return MV_1 + (raw - RAW_1) * (MV_2 - MV_1) / (RAW_2 - RAW_1); }

// Kalikan dulu, baru bagi, agar pecahan tidak hilang.
int mvBaterai(int mvPin) { return mvPin * (R1_OHM + R2_OHM) / R2_OHM; }

enum Status { NORMAL, LEMAH, BERHENTI };

// Ambang contoh untuk empat sel AA; tentukan ambangmu dari lembar data dan uji.
Status statusDaya(int mvBat) {
  if (mvBat >= 5200) {
    return NORMAL;
  }
  if (mvBat >= 4600) {
    return LEMAH;
  }
  return BERHENTI;
}

const char *namaStatus(Status s) {
  if (s == NORMAL) {
    return "NORMAL";
  }
  if (s == LEMAH) {
    return "LEMAH";
  }
  return "BERHENTI";
}

struct Rencana {
  int kapasitasMah;
  int arusRataMa;    // arus rata-rata semua komponen
  int arusMacetMa;   // arus bila kedua motor macet (dari lembar data, contoh)
  int batasPengendaliMa;
  int tegangMaksMv;  // tegangan baterai paling tinggi (baru)
  int menitMinimum;
};

const int FAKTOR_PERSEN = 70;  // asumsi latihan, sama dengan modul 2

int menitOperasi(const Rencana &r) { return r.kapasitasMah * FAKTOR_PERSEN * 60 / (100 * r.arusRataMa); }

void periksa(const char *butir, bool lolos, const std::string &catatan) {
  std::cout << std::left << std::setw(26) << butir << (lolos ? "lolos   " : "GAGAL   ") << catatan << "\n";
}

int main() {
  std::cout << "raw   mV pin   mV baterai   status\n";
  for (int raw : {2480, 2160, 1950, 1850, 1700}) {
    int mvPin = rawKeMvPin(raw);
    int mvBat = mvBaterai(mvPin);
    std::cout << std::setw(4) << raw << std::setw(8) << mvPin << std::setw(13) << mvBat << "   " << namaStatus(statusDaya(mvBat))
              << "\n";
  }
  std::cout << "\nlembar periksa daya\n";
  Rencana r = {1500, 520, 1800, 1200, 6400, 30};
  int mvPinMaks = r.tegangMaksMv * R2_OHM / (R1_OHM + R2_OHM);
  periksa("tegangan pin saat baru", mvPinMaks <= PIN_MV_MAKS, std::to_string(mvPinMaks) + " mV, batas " + std::to_string(PIN_MV_MAKS));
  periksa("waktu operasi", menitOperasi(r) >= r.menitMinimum, std::to_string(menitOperasi(r)) + " menit, minimum " + std::to_string(r.menitMinimum));
  periksa("arus motor macet", r.arusMacetMa <= r.batasPengendaliMa,
          std::to_string(r.arusMacetMa) + " mA, batas pengendali " + std::to_string(r.batasPengendaliMa));
}
```

Keluaran program (angka dihitung penulis dengan `g++ -std=c++17`):

```text
raw   mV pin   mV baterai   status
2480    2000         6000   NORMAL
2160    1746         5238   NORMAL
1950    1579         4737   LEMAH
1850    1500         4500   BERHENTI
1700    1381         4143   BERHENTI

lembar periksa daya
tegangan pin saat baru    lolos   2133 mV, batas 3100
waktu operasi             lolos   121 menit, minimum 30
arus motor macet          GAGAL   1800 mA, batas pengendali 1200
```

Bacalah dengan jujur. Dua butir lembar pertama lolos, tetapi **arus motor macet gagal**: 1800 mA melewati batas pengendali 1200 mA. Rata-rata arus (520 mA) menutupi puncak ini, sama seperti pada `c-xii1-m2`. Perbaikannya bukan mengubah angka agar lolos, melainkan mengubah rancangan: pilih pengendali yang lebih kuat, batasi arus, atau deteksi macet dan matikan motor. Waktu operasi 121 menit memakai faktor 70 persen yang hanya asumsi latihan; kapasitas tertera tidak seluruhnya tersedia pada beban nyata.

Sketsa berikut memantau baterai dan mengunci motor saat BERHENTI. Ia hanya diperiksa sintaksnya terhadap header tiruan, tidak dijalankan pada papan, dan nomor pin ADC-nya harus kamu periksa pada papanmu.

```arduino
// Arduino-C++ untuk ESP32. Diperiksa check:module-code terhadap header tiruan (sintaks dan tipe saja, bukan bukti perilaku papan).
// Semua nomor pin dan angka contoh; ganti dengan hasil pengukuran voltmeter dan lembar data. Pembagi tegangan WAJIB terpasang.
// Memantau tegangan baterai lewat pembagi R1 = 20 kOhm dan R2 = 10 kOhm; baterai TIDAK pernah langsung ke pin papan.
const int PIN_BATERAI = 39;  // pin masukan ADC di papan contoh; periksa papanmu
const int PIN_KIRI_IN1 = 17;
const int PIN_KIRI_IN2 = 16;
const int PIN_KIRI_PWM = 27;
const int PIN_KANAN_IN1 = 18;
const int PIN_KANAN_IN2 = 19;
const int PIN_KANAN_PWM = 14;
const int R1_OHM = 20000;
const int R2_OHM = 10000;
const int RAW_1 = 1850;  // dua titik kalibrasi dari voltmeter, tegangan DI PIN dalam mV
const int MV_1 = 1500;
const int RAW_2 = 2480;
const int MV_2 = 2000;
const int BATAS_LEMAH_MV = 5200;
const int BATAS_BERHENTI_MV = 4600;
const int JUMLAH_BACA = 8;
const unsigned long SELANG_LAPOR_MS = 1000;

bool terkunci = false;  // sekali BERHENTI, hanya pengguna yang membukanya: ganti baterai lalu tekan reset
unsigned long terakhirLapor = 0;

void hentikanMotor() {
  digitalWrite(PIN_KIRI_IN1, LOW);
  digitalWrite(PIN_KIRI_IN2, LOW);
  digitalWrite(PIN_KANAN_IN1, LOW);
  digitalWrite(PIN_KANAN_IN2, LOW);
  ledcWrite(PIN_KIRI_PWM, 0);
  ledcWrite(PIN_KANAN_PWM, 0);
}

int bacaRataRata() {
  long jumlah = 0;
  for (int i = 0; i < JUMLAH_BACA; i++) {
    jumlah += analogRead(PIN_BATERAI);
  }
  return static_cast<int>(jumlah / JUMLAH_BACA);
}

int mvBaterai(int raw) {
  int mvPin = MV_1 + (raw - RAW_1) * (MV_2 - MV_1) / (RAW_2 - RAW_1);
  return mvPin * (R1_OHM + R2_OHM) / R2_OHM;  // kalikan dulu, baru bagi
}

void setup() {
  Serial.begin(115200);
  pinMode(PIN_KIRI_IN1, OUTPUT);
  pinMode(PIN_KIRI_IN2, OUTPUT);
  pinMode(PIN_KANAN_IN1, OUTPUT);
  pinMode(PIN_KANAN_IN2, OUTPUT);
  ledcAttach(PIN_KIRI_PWM, 1000, 8);
  ledcAttach(PIN_KANAN_PWM, 1000, 8);
  hentikanMotor();
  terakhirLapor = millis();
}

void loop() {
  int mv = mvBaterai(bacaRataRata());
  if (mv < BATAS_BERHENTI_MV && !terkunci) {
    terkunci = true;
    hentikanMotor();
    Serial.println("BERHENTI: baterai lemah. Ganti baterai lalu tekan reset.");
  }
  if (millis() - terakhirLapor >= SELANG_LAPOR_MS) {
    terakhirLapor = millis();
    Serial.print(mv);
    Serial.print(" mV ");
    Serial.println(terkunci ? "BERHENTI" : (mv < BATAS_LEMAH_MV ? "LEMAH" : "NORMAL"));
  }
  if (terkunci) {
    hentikanMotor();
  }
}
```

## Contoh setengah jadi

Lengkapi `____`: tegangan baterai dari tegangan pin dengan kedua resistor, dan arus macet aman bila tidak melebihi batas pengendali.

```cpp setengah-jadi
// C++17. Lengkapi bagian ____.
int mvBaterai(int mvPin) { return mvPin * (____ + R2_OHM) / ____; }

bool arusMacetAman(const Rencana &r) { return r.arusMacetMa ____ r.batasPengendaliMa; }
```

## Soal Parsons

Susun baris-baris di bawah (sudah diacak) menjadi perulangan tabel status. Tiap baris memakai hasil baris sebelumnya.

```text
(a)   Status s = statusDaya(mvBat);
(b) for (int raw : {2480, 2160, 1950}) {
(c)   int mvPin = rawKeMvPin(raw);
(d) }
(e)   std::cout << raw << " " << mvBat << " " << namaStatus(s) << "\n";
(f)   int mvBat = mvBaterai(mvPin);
```

## Latihan

1. `AI: tanpa AI` **Hitung.** Dengan kalibrasi contoh, bacaan mentah 2000 berarti berapa mV di pin dan di baterai, dan apa statusnya?
2. `AI: tanpa AI` **Pembagi yang salah.** Bila R1 = R2 = 10 kOhm dan baterai baru 6400 mV, berapa mV di pin? Apakah lolos batas 3100 mV? Apa perbaikannya?
3. `AI: boleh` **Rencana daya (F).** Isi lembar periksa daya robotmu dari lembar data dan pengukuran voltmeter (bimbingan guru). Tanpa papan, ubah `Rencana` menjadi kapasitas 1000 mAh, arus rata-rata 700 mA, dan arus macet 1100 mA, lalu prediksikan dan jalankan.
4. `AI: boleh` **Mengapa terkunci?** Tulis dua alasan keputusan BERHENTI sebaiknya terkunci, bukan membuka sendiri saat tegangan naik lagi.
5. *Opsional:* **catatan pemakaian AI.** Bila memakai AI generatif, kerjakan nomor 2 sendiri dulu, lalu minta kritik atas perbaikanmu, bukan jawaban jadi. Catat alatnya, tujuanmu, garis besar perintahmu, bagian yang kamu pakai, dan cara memeriksanya. Jangan menaruh data pribadi pada perintah.

## Latihan bercampur

1. Pada `c-xii1-m5` robot masuk `AMAN` bila pembacaan gagal. Bagaimana BERHENTI karena baterai lemah berbeda dari `AMAN`, dan apa yang sama?
2. Pada `c-xi1-m5` kendali hidup-mati memakai histeresis. Mengapa ambang LEMAH dan BERHENTI sebaiknya diberi jarak, dan apa yang terjadi bila tegangan berayun di sekitar satu ambang?

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `C-XII1-M11` (sekitar satu minggu lagi), `C-XII1-M13` (sekitar tiga minggu lagi), dan `C-XII2-M4` (sekitar delapan minggu lagi). Jawab sekarang lalu simpan.

1. Mengapa tegangan baterai harus dibagi sebelum masuk ke pin ADC?
2. Sebut dua tanda baterai lemah yang harus membuat robot berhenti, bukan terus berjalan.
3. Mengapa arus saat motor macet lebih penting daripada arus rata-rata untuk memilih pengendali motor?

## Kesalahan umum

- **Baterai langsung ke pin.** Pin bisa rusak; selalu lewat pembagi dan periksa tegangan maksimum.
- **Menganggap bacaan mentah ADC sudah tepat dalam volt.** Kalibrasi dengan voltmeter.
- **Membagi dulu, baru mengalikan.** Pecahan hilang pada bilangan bulat.
- **Menilai daya dari arus rata-rata saja.** Puncak dan motor macet menentukan keselamatan pengendali.
- **Memakai satu ambang tanpa jarak.** Tegangan yang bergetar membuat status berganti-ganti.
- **Menganggap baterai lemah hanya soal waktu operasi.** Papan dapat mati atau berperilaku aneh sebelum baterai benar-benar habis.

## Cek mandiri

- [ ] Saya dapat menyebut aturan keselamatan baterai kelas ini.
- [ ] Saya menghitung tegangan baterai dari bacaan ADC dengan pembagi dan kalibrasi.
- [ ] Saya memeriksa tegangan pin, waktu operasi, dan arus macet pada lembar periksa.
- [ ] Saya membuat robot berhenti sendiri dan terkunci sampai manusia membukanya.
- [ ] Saya menandai angka yang berasal dari contoh dan mengambil angka asli dari lembar data.

## Kunci dan petunjuk

**Ingat kembali.** 1: kapasitas tertera tidak seluruhnya tersedia pada beban nyata, jadi hitungan memakai faktor (70 persen di sini, asumsi latihan) agar perkiraan tidak terlalu optimistis. 2: robot melewati garis, dikoreksi balik lebih besar, dan terus berayun; pergantian arah naik tajam. 3: baterai yang melemah atau lintasan yang berubah mengubah hasil walau program sama, jadi hasil tanpa catatan kondisi tidak dapat dibandingkan.

**Prediksi dulu.** 1: 10 / (20 + 10) = sepertiga, sekitar 33 persen; pin papan tidak tahan tegangan baterai penuh. 2: 2000 mV di pin; 2000 x 30000 / 10000 = 6000 mV di baterai. 3: tidak cukup; periksa juga arus macet terhadap batas pengendali dan tegangan di pin, dan baterai yang melemah.

**Contoh setengah jadi.** Isian berurutan: `R1_OHM`, `R2_OHM`, `<=`. Kunci dikompilasi dan dijalankan penulis dengan hasil yang sama pada contoh terselesaikan.

**Soal Parsons.** Urutan benar: b, c, f, a, e, d. Tiap baris memakai hasil baris sebelumnya: `mvPin` sebelum `mvBat`, `mvBat` sebelum `s`, dan `s` sebelum dicetak.

**Latihan.** 1: 1500 + (2000 - 1850) x 500 / 630 = 1500 + 119 = 1619 mV di pin; 1619 x 3 = 4857 mV di baterai; status LEMAH (di antara 4600 dan 5199). 2: 6400 x 10000 / 20000 = 3200 mV, melewati 3100 mV, jadi gagal; perbaikan: R1 = 20 kOhm dan R2 = 10 kOhm (pin menerima 2133 mV). 3: tidak ada kunci tunggal untuk robot nyata; tanpa papan, 1000 x 70 x 60 / (100 x 700) = 60 menit dan arus macet 1100 mA lolos, jadi ketiga baris lolos. 4: contoh: tegangan baterai naik lagi saat beban dilepas padahal baterainya tetap lemah, sehingga membuka sendiri membuat robot berjalan lagi lalu mati di tengah lintasan; dan penyebab perlu diperiksa manusia sebelum robot dijalankan lagi.

**Latihan bercampur.** 1: sama: keduanya mematikan motor dan hanya pengguna yang membukanya; beda: `AMAN` dipicu pembacaan sensor yang gagal, BERHENTI dipicu tegangan baterai. 2: jarak mencegah status berganti-ganti terus; tanpa jarak, tegangan yang berayun di sekitar ambang membuat robot bergantian LEMAH dan NORMAL.

**Ulang berjarak.** 1: pin tidak tahan tegangan baterai penuh; pembagi menurunkan tegangan hingga di bawah batas pin. 2: contoh: tegangan di bawah ambang BERHENTI, atau papan yang sering mati ulang saat motor menyala. 3: motor macet menarik arus jauh melebihi rata-rata; pengendali yang dipilih dari rata-rata bisa rusak atau panas pada puncaknya.

## Langkah berikutnya

Modul berikut: `C-XII1-M11` (hukum dan etika sensor), yang menimbang apa yang boleh direkam oleh perangkat. Bacaan lanjut: dokumentasi ADC Arduino-ESP32 dan `analogRead` (lihat Rujukan).
