## Untuk siapa modul ini

Modul ini untuk murid kelas XII jalur C (IoT dan robotika), minggu `C-XII1-M3` silabus v1.4: motor DC dan pengendali motor (F). Prasyarat: modul `c-xii1-m2` (arsitektur dan pemilihan komponen). Kamu juga memakai PWM dari `c-x2-m5` dan `millis()` dari `c-x2-m7`.

Modul ini berstatus DRAF: karangan penyusun, belum ditinjau pemilik, dan tidak dihitung memenuhi butir capaian pembelajaran mana pun (keterampilan perakitan tidak dihitung sebagai butir CP). Keluaran minggu ini: program motor. Latihan silabusnya: robot maju-mundur-belok.

Ada dua cara mengerjakan. **Dengan papan (F):** kelompok merakit dua motor DC kecil, satu modul pengendali motor, dan satu tombol berhenti sesuai lembar guru. **Tanpa papan:** kamu menjalankan "papan tiruan" di komputer yang mencetak sinyal yang akan dikirim ke modul pengendali. Pemetaan pin arah dan cara modulmu menerima PWM bervariasi: baca lembar guru `[belum terverifikasi]`. Nomor pin pada contoh hanya contoh.

## Keselamatan perangkat

- Papan memakai daya USB. Motor memakai baterai AA/AAA yang disediakan guru, lewat modul pengendali. Tidak ada listrik jaringan (220 V), tidak ada baterai litium tanpa pelindung, dan kamu tidak mengisi daya litium.
- Motor **tidak** disambung langsung ke pin papan. Pin papan hanya mengirim sinyal ke modul pengendali bertegangan rendah. Hubungan ground antara papan dan modul dibuat sesuai lembar guru.
- Cabut baterai dan kabel USB sebelum memasang atau memindahkan kabel, dan periksa polaritas. Jangan melepas atau memasang kabel motor saat menyala. Tidak ada kewajiban solder.
- Uji pertama dengan **roda terangkat** di atas dudukan. Berikutnya robot diuji di meja bertepi atau lantai bersih, dengan jalur kosong dan tangan di luar jalur roda.
- Bagian yang bergerak tidak disentuh saat menyala. Motor yang tertahan (macet) dimatikan segera, tidak dibiarkan menahan beban.
- Papan, modul, atau motor yang terasa panas, berbau, atau berasap: cabut daya dan panggil guru. Modul ini tidak memakai kamera atau mikrofon, dan tidak mengukur tubuh siapa pun.

## Ingat kembali

Jawab dari ingatan dulu, baru cek di kunci. Soal 1 dari `c-xii1-m2`, soal 2 dari `c-x2-m5`, soal 3 dari `C-XI2-M9`.

1. Mengapa syarat wajib diperiksa lebih dulu daripada skor berbobot?
2. Apa arti duty 50 persen pada PWM, dan mengapa LED tampak redup, bukan berkedip?
3. Apa beda 'data dapat diunduh' dan 'data boleh dipakai dan dibagikan'?

## Tujuan

Setelah modul ini kamu dapat:

- menjelaskan bahwa arah putar ditentukan polaritas dan kecepatan oleh PWM, serta mengapa itu butuh modul pengendali;
- memetakan kecepatan bertanda (-255 sampai 255) ke dua pin arah dan satu nilai duty;
- membatasi perubahan kecepatan dan berhenti dulu sebelum membalik arah;
- merangkai maju, mundur, dan belok dari kecepatan roda kiri dan kanan;
- menyediakan cara berhenti yang pasti, tanpa menunggu skenario selesai.

## Prediksi dulu

Fungsi `dariKecepatan(k)` menjepit `k` ke rentang -255 sampai 255, lalu menghasilkan `IN1`, `IN2`, dan `duty`: positif maju (`IN1` tinggi), negatif mundur (`IN2` tinggi), nol berhenti. Fungsi `langkahKecepatan(sekarang, target, langkahMaks)` mendekati target paling banyak `langkahMaks` per langkah, tetapi bila tandanya berlawanan ia menuju 0 dulu. **Tebak dulu, tulis jawabanmu, baru jalankan.**

1. Apa `IN1`, `IN2`, dan `duty` untuk `dariKecepatan(-300)`?
2. Berapa `langkahKecepatan(0, 200, 60)`?
3. Roda berputar maju pada +100 dan targetnya -100, `langkahMaks` 60. Tulis lima nilai kecepatan berturut-turut mulai dari +100.

## Contoh terselesaikan

Motor DC berputar ke satu arah bila arus mengalir ke satu arah; membalik polaritas membalik putaran. Pin papan tidak kuat dan tidak boleh menggerakkan motor, jadi ada **modul pengendali** berisi jembatan-H, yang membalik polaritas atas sinyal kecil dari papan (cara kerja rinci ada di lembar data modulmu). Kecepatan diatur dengan PWM, seperti kecerahan LED pada `c-x2-m5`. Pada modul contoh ini tiap motor punya dua pin arah dan satu pin kecepatan:

| IN1 | IN2 | Efek pada contoh |
| --- | --- | --- |
| rendah | rendah | berhenti |
| tinggi | rendah | maju |
| rendah | tinggi | mundur |
| tinggi | tinggi | rem atau terlarang, tergantung modul: baca lembar guru dan jangan dipakai bila ragu |

Robot dua roda berbelok dengan **selisih kecepatan**: untuk belok kiri, roda kiri dibuat lebih lambat daripada roda kanan. Membalik arah seketika dari maju penuh ke mundur penuh memberi guncangan dan lonjakan beban pada motor dan baterai, sehingga fungsi `langkahKecepatan` berhenti dulu dan mengubah kecepatan bertahap. Program papan tiruan berikut tidak menyentuh pin; ia hanya mencetak apa yang akan dikirim.

```cpp
// C++17 biasa, jalan di komputer. Diperiksa oleh check:module-code.
// "Papan tiruan": mencetak apa yang akan dikirim ke modul pengendali motor. Pemetaan IN1/IN2 contoh;
// modulmu bisa berbeda, baca lembar guru.
#include <iostream>

const int KECEPATAN_MAKS = 255;

struct Perintah {
  bool in1;
  bool in2;
  int duty;
};

int jepit(int nilai, int rendah, int tinggi) {
  if (nilai < rendah) {
    return rendah;
  }
  if (nilai > tinggi) {
    return tinggi;
  }
  return nilai;
}

// kecepatan bertanda: positif maju, negatif mundur, 0 berhenti.
Perintah dariKecepatan(int kecepatan) {
  int k = jepit(kecepatan, -KECEPATAN_MAKS, KECEPATAN_MAKS);
  if (k > 0) {
    return {true, false, k};
  }
  if (k < 0) {
    return {false, true, -k};
  }
  return {false, false, 0};
}

// Satu langkah menuju target. Tidak boleh membalik arah langsung: berhenti dulu.
int langkahKecepatan(int sekarang, int target, int langkahMaks) {
  if (sekarang * target < 0) {
    target = 0;
  }
  if (target > sekarang + langkahMaks) {
    return sekarang + langkahMaks;
  }
  if (target < sekarang - langkahMaks) {
    return sekarang - langkahMaks;
  }
  return target;
}

void cetak(const char *nama, int kecepatan) {
  Perintah p = dariKecepatan(kecepatan);
  std::cout << nama << " " << kecepatan << " -> IN1=" << p.in1 << " IN2=" << p.in2 << " duty=" << p.duty << "\n";
}

int main() {
  // Gerakan dirangkai dari kecepatan roda kiri dan kanan.
  std::cout << "gerakan (kiri,kanan):\n";
  const int V = 150;
  const int gerakan[5][2] = {{V, V}, {-V, -V}, {V / 2, V}, {V, 0}, {V, -V}};
  const char *nama[5] = {"maju", "mundur", "belok kiri landai", "belok kanan tajam", "putar di tempat"};
  for (int i = 0; i < 5; i++) {
    std::cout << "  " << nama[i] << ": (" << gerakan[i][0] << "," << gerakan[i][1] << ")\n";
  }
  cetak("kiri ", 150);
  cetak("kanan", -300);
  cetak("kiri ", 0);
  std::cout << "dari +100 ke -100, langkah paling banyak 60:";
  int v = 100;
  std::cout << " " << v;
  for (int i = 0; i < 4; i++) {
    v = langkahKecepatan(v, -100, 60);
    std::cout << " " << v;
  }
  std::cout << "\n";
}
```

Keluarannya:

```text
gerakan (kiri,kanan):
  maju: (150,150)
  mundur: (-150,-150)
  belok kiri landai: (75,150)
  belok kanan tajam: (150,0)
  putar di tempat: (150,-150)
kiri  150 -> IN1=1 IN2=0 duty=150
kanan -300 -> IN1=0 IN2=1 duty=255
kiri  0 -> IN1=0 IN2=0 duty=0
dari +100 ke -100, langkah paling banyak 60: 100 40 0 -60 -100
```

`dariKecepatan(-300)` dijepit menjadi -255, sehingga duty 255 dan arah mundur. Urutan `100 40 0 -60 -100` menunjukkan roda melambat, berhenti di 0 (langkah dari 40 ke 0 lebih kecil dari 60), lalu baru mundur; tidak ada nilai di antara 40 dan -60 yang dilewati sekaligus. Duty yang sama pada dua motor tidak selalu menghasilkan kecepatan yang sama: motor berbeda sedikit, sehingga robot bisa condong ke satu sisi dan perlu dikalibrasi lewat pengujian.

Sketsa berikut menjalankan skenario gerak tanpa `delay`, memakai `millis()`, dan menyiapkan tombol berhenti yang dibaca terus-menerus. Ia hanya diperiksa sintaksnya terhadap header tiruan, tidak dijalankan pada papan. Nama fungsi PWM (`ledcAttach`, `ledcWrite`) mengikuti dokumentasi Arduino-ESP32 versi 3; versi inti lain berbeda, periksa versi yang kamu pasang `[belum terverifikasi]`. Tombol berhenti ini **tidak** menggantikan cara memutus daya motor: guru atau kamu harus tetap bisa mencabut baterai motor.

```arduino
// Arduino-C++ untuk ESP32. Diperiksa check:module-code terhadap header tiruan (sintaks dan tipe saja, bukan bukti perilaku papan).
// Semua nomor pin contoh; periksa papanmu dan lembar guru. Hanya sinyal ke modul pengendali, bukan daya motor.
const int PIN_KIRI_IN1 = 17;
const int PIN_KIRI_IN2 = 16;
const int PIN_KIRI_PWM = 27;
const int PIN_KANAN_IN1 = 18;
const int PIN_KANAN_IN2 = 19;
const int PIN_KANAN_PWM = 14;
const int PIN_BERHENTI = 4;       // tombol berhenti ke GND
const int KECEPATAN_MAKS = 255;   // resolusi 8 bit
const unsigned long SELANG_MS = 20;
const int LANGKAH_MAKS = 60;      // perubahan terbesar per selang

struct Langkah {
  int kiri;
  int kanan;
  unsigned long lamaMs;
};

const Langkah SKENARIO[] = {{150, 150, 1500}, {0, 0, 500}, {75, 150, 1000}, {0, 0, 500}, {-120, -120, 1000}, {0, 0, 1000}};
const int JUMLAH_LANGKAH = sizeof(SKENARIO) / sizeof(SKENARIO[0]);

int kiriSekarang = 0;
int kananSekarang = 0;
int indeks = 0;
unsigned long mulaiLangkah = 0;
unsigned long mulaiSelang = 0;

int langkahKecepatan(int sekarang, int target, int langkahMaks) {
  if (sekarang * target < 0) {
    target = 0;
  }
  if (target > sekarang + langkahMaks) {
    return sekarang + langkahMaks;
  }
  if (target < sekarang - langkahMaks) {
    return sekarang - langkahMaks;
  }
  return target;
}

void tulisMotor(int pinIn1, int pinIn2, int pinPwm, int kecepatan) {
  int k = constrain(kecepatan, -KECEPATAN_MAKS, KECEPATAN_MAKS);
  digitalWrite(pinIn1, k > 0 ? HIGH : LOW);
  digitalWrite(pinIn2, k < 0 ? HIGH : LOW);
  ledcWrite(pinPwm, k < 0 ? -k : k);
}

void setup() {
  Serial.begin(115200);
  pinMode(PIN_KIRI_IN1, OUTPUT);
  pinMode(PIN_KIRI_IN2, OUTPUT);
  pinMode(PIN_KANAN_IN1, OUTPUT);
  pinMode(PIN_KANAN_IN2, OUTPUT);
  pinMode(PIN_BERHENTI, INPUT_PULLUP);
  ledcAttach(PIN_KIRI_PWM, 1000, 8);   // frekuensi contoh; lihat lembar guru
  ledcAttach(PIN_KANAN_PWM, 1000, 8);
  tulisMotor(PIN_KIRI_IN1, PIN_KIRI_IN2, PIN_KIRI_PWM, 0);  // mulai dalam keadaan berhenti
  tulisMotor(PIN_KANAN_IN1, PIN_KANAN_IN2, PIN_KANAN_PWM, 0);
  mulaiLangkah = millis();
  mulaiSelang = millis();
}

void loop() {
  if (digitalRead(PIN_BERHENTI) == LOW) {   // tombol ditekan: berhenti, tanpa menunggu skenario
    kiriSekarang = 0;
    kananSekarang = 0;
    tulisMotor(PIN_KIRI_IN1, PIN_KIRI_IN2, PIN_KIRI_PWM, 0);
    tulisMotor(PIN_KANAN_IN1, PIN_KANAN_IN2, PIN_KANAN_PWM, 0);
    return;
  }
  if (millis() - mulaiSelang < SELANG_MS) {
    return;
  }
  mulaiSelang = millis();
  if (millis() - mulaiLangkah >= SKENARIO[indeks].lamaMs && indeks < JUMLAH_LANGKAH - 1) {
    indeks++;
    mulaiLangkah = millis();
  }
  kiriSekarang = langkahKecepatan(kiriSekarang, SKENARIO[indeks].kiri, LANGKAH_MAKS);
  kananSekarang = langkahKecepatan(kananSekarang, SKENARIO[indeks].kanan, LANGKAH_MAKS);
  tulisMotor(PIN_KIRI_IN1, PIN_KIRI_IN2, PIN_KIRI_PWM, kiriSekarang);
  tulisMotor(PIN_KANAN_IN1, PIN_KANAN_IN2, PIN_KANAN_PWM, kananSekarang);
}
```

## Contoh setengah jadi

Lengkapi `____` pada `dariKecepatan`: jepit ke rentang yang benar dan petakan arah ke pin.

```cpp setengah-jadi
// C++17. Lengkapi bagian ____.
Perintah dariKecepatan(int kecepatan) {
  int k = jepit(kecepatan, -____, KECEPATAN_MAKS);
  if (k > 0) {
    return {true, false, ____};
  }
  if (k < 0) {
    return {____, ____, -k};
  }
  return {false, false, 0};
}
```

## Soal Parsons

Susun baris-baris di bawah (sudah diacak) menjadi fungsi `langkahKecepatan`. Dua baris `if` terakhir sebelum `return target` boleh bertukar.

```text
(a)   if (sekarang * target < 0) {
(b) int langkahKecepatan(int sekarang, int target, int langkahMaks) {
(c)     target = 0;
(d)   }
(e)   if (target > sekarang + langkahMaks) { return sekarang + langkahMaks; }
(f)   if (target < sekarang - langkahMaks) { return sekarang - langkahMaks; }
(g)   return target;
(h) }
```

## Latihan

1. `AI: tanpa AI` **Telusuri.** Tulis `IN1`, `IN2`, dan `duty` untuk `dariKecepatan` dengan masukan 0, 80, -255, dan 400.
2. `AI: boleh` **Rancang dulu.** Tulis pseudocode lalu tabel skenario robot maju-mundur-belok (latihan silabus): pasangan (kiri, kanan) dan lama tiap langkah, tanpa kecepatan di atas 150 dan dengan jeda berhenti di antara arah yang berlawanan.
3. `AI: tanpa AI` **Selisih kecepatan.** Tulis pasangan (kiri, kanan) untuk putar kiri di tempat dan belok kanan landai, dengan kecepatan dasar 150.
4. `AI: boleh` **Dengan papan (F).** Dengan roda terangkat, jalankan skenariomu dan periksa arah putar tiap roda. Bila satu roda berputar terbalik, tukar `IN1` dan `IN2` roda itu **di program**, atau tukar kabel motornya dengan daya dicabut. Catat hasilnya. Tanpa papan, kerjakan nomor 2 dan jalankan program tiruan.
5. *Opsional:* **catatan pemakaian AI.** Bila memakai AI generatif, kerjakan nomor 2 sendiri dulu, lalu minta kritik atas skenariomu, bukan program jadi. Catat alatnya, tujuanmu, garis besar perintahmu, bagian yang kamu pakai, dan cara memeriksanya. Jangan menaruh data pribadi pada perintah.

## Latihan bercampur

1. Duty 128 dari 255 kira-kira berapa persen, dan apa artinya bagi rata-rata tegangan yang diterima motor (dari `c-x2-m5`)?
2. Mengapa sketsa skenario memakai `millis()` dan bukan `delay()` (dari `c-x2-m7`)?

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `C-XII1-M4` (sekitar satu minggu lagi), `C-XII1-M6` (sekitar tiga minggu lagi), dan `C-XII1-M11` (sekitar delapan minggu lagi). Jawab sekarang lalu simpan.

1. Mengapa roda yang berlawanan arah tidak boleh dibalik seketika, dan apa yang dilakukan `langkahKecepatan`?
2. Pada robot dua roda, roda mana yang dibuat lebih lambat agar robot belok ke kiri?
3. Sebut dua aturan keselamatan saat menguji robot yang bergerak.

## Kesalahan umum

- **Menyambung motor langsung ke pin papan.** Pin tidak kuat; pakai modul pengendali.
- **Lupa menyambung ground antara papan dan modul** sesuai lembar guru: sinyal tidak punya acuan sehingga robot bergerak tidak menentu.
- **Membalik arah seketika.** Berhenti dulu atau ubah kecepatan bertahap.
- **Mengira duty sama dengan kecepatan terukur.** Duty adalah perintah, bukan kecepatan; dua motor bisa berbeda pada duty yang sama.
- **Menguji pertama kali dengan roda di atas meja tanpa dudukan.** Robot bisa jatuh; angkat roda dulu.
- **Membiarkan motor macet menyala.** Matikan segera.

## Cek mandiri

- [ ] Saya dapat menjelaskan peran modul pengendali dan mengapa motor tidak disambung ke pin papan.
- [ ] Saya dapat memetakan kecepatan bertanda ke pin arah dan duty.
- [ ] Saya membatasi perubahan kecepatan dan berhenti dulu sebelum membalik arah.
- [ ] Saya menguji pertama dengan roda terangkat dan menyediakan cara berhenti.
- [ ] Saya tahu aturan keselamatan untuk bagian yang bergerak.

## Kunci dan petunjuk

**Ingat kembali.** 1: komponen yang gagal syarat tidak boleh dipilih apa pun skornya; skor hanya untuk meranking yang sudah layak. 2: duty 50 persen berarti keluaran tinggi separuh waktu; karena PWM bergantian sangat cepat, mata merata-ratakannya sehingga LED tampak redup, bukan berkedip. 3: data yang dapat diunduh belum tentu boleh dipakai atau dibagikan; lisensi menentukan apa yang boleh dilakukan dan syarat atribusinya.

**Prediksi dulu.** 1: `IN1`=0, `IN2`=1, `duty`=255 (dijepit dari -300 ke -255). 2: 60 (naik paling banyak 60). 3: 100, 40, 0, -60, -100. Dari 40 ke target -100 tandanya berlawanan sehingga target dianggap 0; 40 ke 0 lebih kecil dari 60 sehingga langsung 0; baru dari 0 turun 60 ke -60 lalu -100.

**Contoh setengah jadi.** Isian berurutan: `KECEPATAN_MAKS` (255), `k`, `false`, `true`. Kunci yang dikompilasi dan dijalankan penulis menghasilkan keluaran yang sama dengan contoh terselesaikan.

**Soal Parsons.** Urutan benar: b, a, c, d, e, f, g, h (e dan f boleh bertukar). Pemeriksaan tanda berlawanan ada di awal, sebelum pembatasan langkah.

**Latihan.** 1: 0 menghasilkan IN1=0, IN2=0, duty 0; 80 menghasilkan 1, 0, 80; -255 menghasilkan 0, 1, 255; 400 dijepit ke 255 menghasilkan 1, 0, 255. 2: tidak ada kunci tunggal; skenario yang baik menyisipkan berhenti di antara maju dan mundur dan tidak melewati 150. 3: putar kiri di tempat: (-150, 150); belok kanan landai: (150, 75). 4: tidak ada kunci tunggal; jawaban yang baik mencatat roda mana yang terbalik dan perbaikan yang dipilih.

**Latihan bercampur.** 1: sekitar 50 persen; motor menerima tegangan rata-rata kira-kira separuh dari tegangan penuh sehingga berputar lebih lambat. 2: `delay()` menghentikan program sehingga tombol berhenti tidak terbaca selama menunggu; `millis()` membiarkan `loop()` terus membaca tombol.

**Ulang berjarak.** 1: pembalikan seketika memberi guncangan dan lonjakan beban pada motor dan baterai; `langkahKecepatan` menuju 0 dulu dan menaikkan kecepatan bertahap. 2: roda kiri. 3: contoh: roda diangkat pada uji pertama dan robot diuji di meja bertepi; bagian yang bergerak tidak disentuh saat menyala; motor yang macet dimatikan.

## Langkah berikutnya

Modul berikut: `c-xii1-m4` (sensor garis dan jarak), yang memberi robot kemampuan membaca lintasan dan halangan. Bacaan lanjut: dokumentasi PWM Arduino-ESP32 (lihat Rujukan) dan lembar data modul pengendali dari guru.
