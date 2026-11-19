## Untuk siapa modul ini

Modul ini untuk murid kelas XII jalur C (IoT dan robotika), minggu `C-XII1-M5` silabus v1.4: mesin keadaan robot (F). Prasyarat: modul `c-xii1-m4` (sensor garis dan jarak) dan `c-x2-m7` (waktu tanpa `delay` dan mesin keadaan sederhana). Kamu juga memakai kendali roda dari `c-xii1-m3`.

Modul ini berstatus DRAF: karangan penyusun, belum ditinjau pemilik. Ia mendukung butir `F-AP-b` (program terstruktur berdasarkan strategi algoritmik) dan tidak dihitung memenuhi butir capaian pembelajaran mana pun. Keluaran minggu ini: diagram keadaan. Latihan silabusnya: robot menghindari halangan.

Ada dua cara mengerjakan. **Dengan papan (F):** kelompok memakai robot dari modul 3 dan 4 (dua motor, modul pengendali, satu sensor jarak, satu tombol mulai). **Tanpa papan:** kamu menjalankan mesin keadaan di komputer dengan urutan jarak karangan. Nomor pin, batas jarak, dan kecepatan pada contoh hanya contoh `[belum terverifikasi]` untuk robotmu.

## Keselamatan perangkat

- Papan memakai daya USB; motor memakai baterai AA/AAA yang disediakan guru lewat modul pengendali. Tidak ada listrik jaringan (220 V), tidak ada baterai litium tanpa pelindung, dan kamu tidak mengisi daya litium.
- Cabut baterai dan kabel USB sebelum mengubah rangkaian; periksa polaritas. Motor tidak disambung langsung ke pin papan. Tidak ada solder.
- Uji pertama dengan **roda terangkat** di atas dudukan. Uji berikutnya di meja bertepi atau lantai bersih, dengan halangan berupa kardus, bukan orang atau hewan.
- Robot mundur dan berputar sendiri: tangan dan kabel di luar jalur roda, dan bagian yang bergerak tidak disentuh saat menyala. Tombol mulai tidak menghentikan robot yang sedang berjalan; siapkan cara memutus daya motor (saklar atau mencabut baterai) dan ketahui letaknya sebelum menyalakan.
- Papan, modul, atau motor yang terasa panas, berbau, atau berasap: cabut daya dan panggil guru. Tidak ada kamera atau mikrofon, dan tidak ada sensor tubuh.

## Ingat kembali

Jawab dari ingatan dulu, baru cek di kunci. Soal 1 dari `c-xii1-m4`, soal 2 dari `c-xii1-m2`, soal 3 dari `C-XI2-M11`.

1. Mengapa tiap sensor garis diberi ambang sendiri hasil kalibrasi, bukan satu ambang untuk semuanya?
2. Mengapa perkiraan waktu operasi memakai arus rata-rata, dan apa yang membuatnya meleset pada motor yang macet?
3. Sebut satu keadaan yang membuat garis tren menebak jauh meleset.

## Tujuan

Setelah modul ini kamu dapat:

- memodelkan perilaku robot sebagai keadaan, masukan, dan peralihan, lalu menggambarnya sebagai diagram keadaan;
- menulis mesin keadaan sebagai fungsi yang menerima masukan dan mengembalikan perintah roda, tanpa menyentuh pin;
- menghitung lama keadaan dengan `sekarang - mulaiKeadaan >= lama`, bukan dengan `delay`;
- merancang keadaan aman yang hanya bisa dikeluarkan oleh tindakan manusia;
- menguji mesin dengan urutan masukan karangan.

## Prediksi dulu

Mesin punya lima keadaan: `DIAM`, `MAJU`, `MUNDUR`, `BELOK`, `AMAN`. Dari `MAJU`, jarak di bawah 15 cm pindah ke `MUNDUR`; `MUNDUR` pindah ke `BELOK` setelah 500 ms; `BELOK` pindah ke `MAJU` setelah 600 ms. Tiga pembacaan jarak gagal beruntun di `MAJU` pindah ke `AMAN`. Satu masukan datang tiap 100 ms; robot sudah di `MAJU`, dan jaraknya 40 cm pada t = 100 ms, lalu 14 cm pada t = 200 ms dan seterusnya. **Tebak dulu, tulis jawabanmu, baru jalankan.**

1. Pada t berapa robot masuk `MUNDUR`?
2. Pada t berapa robot kembali ke `MAJU`?
3. Bila tiga pembacaan gagal beruntun terjadi di `MAJU`, apa yang dilakukan roda dan bagaimana robot keluar dari `AMAN`?

## Contoh terselesaikan

Perilaku robot yang bergantung pada apa yang baru terjadi paling jelas dimodelkan sebagai **mesin keadaan**: daftar keadaan, perintah roda di tiap keadaan, dan peralihan dengan syaratnya. Diagram keadaan untuk robot penghindar halangan:

```text
DIAM --tombol--> MAJU --jarak < 15 cm--> MUNDUR --500 ms--> BELOK --600 ms--> MAJU
                  |
                  +--3 kali gagal baca--> AMAN --tombol--> DIAM
```

| Keadaan | Roda (kiri, kanan) | Syarat keluar |
| --- | --- | --- |
| DIAM | (0, 0) | tombol mulai ditekan: ke MAJU |
| MAJU | (150, 150) | jarak di bawah 15 cm: ke MUNDUR; tiga kegagalan baca beruntun: ke AMAN |
| MUNDUR | (-120, -120) | sudah 500 ms: ke BELOK |
| BELOK | (150, -150) | sudah 600 ms: ke MAJU |
| AMAN | (0, 0) | tombol ditekan: ke DIAM |

Keadaan ditulis sebagai `enum class`, sesuai anjuran C++ Core Guidelines (Enum.3). Keputusan ditulis sebagai fungsi `langkah` yang menerima masukan (tombol, jarak, waktu) dan mengembalikan perintah roda; ia tidak membaca sensor dan tidak menulis pin, sehingga dapat diuji di komputer dengan masukan karangan. Waktu keadaan dihitung dengan `sekarang - mulaiKeadaan`, yang tetap benar saat `millis()` kembali ke 0 karena tipenya `unsigned long`. `AMAN` hanya bisa dikeluarkan oleh tombol, yaitu tindakan manusia: robot tidak boleh pulih sendiri dari keadaan yang ia anggap rusak.

```cpp
// C++17 biasa, jalan di komputer. Diperiksa oleh check:module-code.
// Keputusan robot dipisah dari pin dan sensor, jadi bisa diuji dengan masukan karangan.
#include <iostream>

enum class Keadaan { DIAM, MAJU, MUNDUR, BELOK, AMAN };

const int BATAS_HALANGAN_CM = 15;
const int GAGAL_BERUNTUN_MAKS = 3;
const unsigned long LAMA_MUNDUR_MS = 500;
const unsigned long LAMA_BELOK_MS = 600;

struct Masukan {
  bool tombolMulai;
  bool jarakValid;
  int jarakCm;
  unsigned long sekarang;  // milidetik, seperti millis()
};

struct Keluaran {
  int kiri;
  int kanan;
};

struct Mesin {
  Keadaan keadaan = Keadaan::DIAM;
  unsigned long mulaiKeadaan = 0;
  int gagalBeruntun = 0;
};

void pindah(Mesin &m, Keadaan baru, unsigned long sekarang) {
  m.keadaan = baru;
  m.mulaiKeadaan = sekarang;
}

// Satu langkah: membaca masukan, boleh pindah keadaan, mengembalikan perintah roda.
Keluaran langkah(Mesin &m, const Masukan &in) {
  switch (m.keadaan) {
    case Keadaan::DIAM:
      if (in.tombolMulai) {
        m.gagalBeruntun = 0;
        pindah(m, Keadaan::MAJU, in.sekarang);
        return {150, 150};
      }
      return {0, 0};
    case Keadaan::MAJU:
      if (!in.jarakValid) {
        m.gagalBeruntun++;
        if (m.gagalBeruntun >= GAGAL_BERUNTUN_MAKS) {
          pindah(m, Keadaan::AMAN, in.sekarang);
          return {0, 0};
        }
      } else {
        m.gagalBeruntun = 0;
        if (in.jarakCm < BATAS_HALANGAN_CM) {
          pindah(m, Keadaan::MUNDUR, in.sekarang);
          return {-120, -120};
        }
      }
      return {150, 150};
    case Keadaan::MUNDUR:
      if (in.sekarang - m.mulaiKeadaan >= LAMA_MUNDUR_MS) {
        pindah(m, Keadaan::BELOK, in.sekarang);
        return {150, -150};
      }
      return {-120, -120};
    case Keadaan::BELOK:
      if (in.sekarang - m.mulaiKeadaan >= LAMA_BELOK_MS) {
        pindah(m, Keadaan::MAJU, in.sekarang);
        return {150, 150};
      }
      return {150, -150};
    case Keadaan::AMAN:
      if (in.tombolMulai) {
        pindah(m, Keadaan::DIAM, in.sekarang);  // perlu tindakan manusia untuk keluar
      }
      return {0, 0};
  }
  return {0, 0};
}

const char *nama(Keadaan k) {
  switch (k) {
    case Keadaan::DIAM: return "DIAM";
    case Keadaan::MAJU: return "MAJU";
    case Keadaan::MUNDUR: return "MUNDUR";
    case Keadaan::BELOK: return "BELOK";
    case Keadaan::AMAN: return "AMAN";
  }
  return "?";
}

int main() {
  // Satu masukan tiap 100 ms. jarak -1 = pembacaan gagal.
  const int JUMLAH = 26;
  const int jarak[JUMLAH] = {60, 60, 55, 40, 28, 16, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 70,
                             -1, -1, 65, -1, -1, -1, 50, 50};
  Mesin m;
  Keadaan terakhir = m.keadaan;
  for (int t = 0; t < JUMLAH; t++) {
    Masukan in = {t == 1 || t == 24, jarak[t] >= 0, jarak[t], static_cast<unsigned long>(t) * 100};
    Keluaran k = langkah(m, in);
    if (m.keadaan != terakhir) {
      std::cout << "t=" << in.sekarang << " ms: " << nama(terakhir) << " -> " << nama(m.keadaan) << ", roda ("
                << k.kiri << "," << k.kanan << ")\n";
      terakhir = m.keadaan;
    }
  }
}
```

Keluarannya:

```text
t=100 ms: DIAM -> MAJU, roda (150,150)
t=600 ms: MAJU -> MUNDUR, roda (-120,-120)
t=1100 ms: MUNDUR -> BELOK, roda (150,-150)
t=1700 ms: BELOK -> MAJU, roda (150,150)
t=2300 ms: MAJU -> AMAN, roda (0,0)
t=2400 ms: AMAN -> DIAM, roda (0,0)
```

Peralihan mengikuti diagram: halangan terdeteksi pada 600 ms (14 cm), mundur selama 500 ms, berputar selama 600 ms, lalu maju lagi. Dua kegagalan baca pertama (pada 1800 dan 1900 ms) baru dihitung; pembacaan sah pada 2000 ms mengosongkan hitungan, sehingga hanya tiga kegagalan **beruntun** berikutnya (2100 sampai 2300 ms) yang membawa ke `AMAN`. Keterbatasan rancangan ini: di `MUNDUR` dan `BELOK` sensor jarak tidak diperiksa, jadi robot "buta" selama 1,1 detik itu.

Sketsa berikut memasang mesin yang sama pada papan. Ia hanya diperiksa sintaksnya terhadap header tiruan, tidak dijalankan pada papan; sensor jarak memakai pustaka karangan `PustakaJarak` dan nama PWM mengikuti Arduino-ESP32 versi 3 `[belum terverifikasi]` untuk versi yang kamu pasang.

```arduino
// Arduino-C++ untuk ESP32. Diperiksa check:module-code terhadap header tiruan (sintaks dan tipe saja, bukan bukti perilaku papan).
#include "PustakaJarak.h"

enum class Keadaan { DIAM, MAJU, MUNDUR, BELOK, AMAN };

const int BATAS_HALANGAN_CM = 15;
const int GAGAL_BERUNTUN_MAKS = 3;
const unsigned long LAMA_MUNDUR_MS = 500;
const unsigned long LAMA_BELOK_MS = 600;

struct Masukan {
  bool tombolMulai;
  bool jarakValid;
  int jarakCm;
  unsigned long sekarang;  // milidetik, seperti millis()
};

struct Keluaran {
  int kiri;
  int kanan;
};

struct Mesin {
  Keadaan keadaan = Keadaan::DIAM;
  unsigned long mulaiKeadaan = 0;
  int gagalBeruntun = 0;
};

void pindah(Mesin &m, Keadaan baru, unsigned long sekarang) {
  m.keadaan = baru;
  m.mulaiKeadaan = sekarang;
}

// Satu langkah: membaca masukan, boleh pindah keadaan, mengembalikan perintah roda.
Keluaran langkah(Mesin &m, const Masukan &in) {
  switch (m.keadaan) {
    case Keadaan::DIAM:
      if (in.tombolMulai) {
        m.gagalBeruntun = 0;
        pindah(m, Keadaan::MAJU, in.sekarang);
        return {150, 150};
      }
      return {0, 0};
    case Keadaan::MAJU:
      if (!in.jarakValid) {
        m.gagalBeruntun++;
        if (m.gagalBeruntun >= GAGAL_BERUNTUN_MAKS) {
          pindah(m, Keadaan::AMAN, in.sekarang);
          return {0, 0};
        }
      } else {
        m.gagalBeruntun = 0;
        if (in.jarakCm < BATAS_HALANGAN_CM) {
          pindah(m, Keadaan::MUNDUR, in.sekarang);
          return {-120, -120};
        }
      }
      return {150, 150};
    case Keadaan::MUNDUR:
      if (in.sekarang - m.mulaiKeadaan >= LAMA_MUNDUR_MS) {
        pindah(m, Keadaan::BELOK, in.sekarang);
        return {150, -150};
      }
      return {-120, -120};
    case Keadaan::BELOK:
      if (in.sekarang - m.mulaiKeadaan >= LAMA_BELOK_MS) {
        pindah(m, Keadaan::MAJU, in.sekarang);
        return {150, 150};
      }
      return {150, -150};
    case Keadaan::AMAN:
      if (in.tombolMulai) {
        pindah(m, Keadaan::DIAM, in.sekarang);  // perlu tindakan manusia untuk keluar
      }
      return {0, 0};
  }
  return {0, 0};
}

const char *nama(Keadaan k) {
  switch (k) {
    case Keadaan::DIAM: return "DIAM";
    case Keadaan::MAJU: return "MAJU";
    case Keadaan::MUNDUR: return "MUNDUR";
    case Keadaan::BELOK: return "BELOK";
    case Keadaan::AMAN: return "AMAN";
  }
  return "?";
}

// Bagian papan: sensor jarak, tombol, dan modul pengendali motor. Nomor pin contoh; periksa papanmu dan lembar guru.
const int PIN_PEMICU = 25;
const int PIN_GEMA = 26;
const int PIN_MULAI = 4;   // tombol mulai ke GND, INPUT_PULLUP: ditekan = LOW
const int PIN_KIRI_IN1 = 17;
const int PIN_KIRI_IN2 = 16;
const int PIN_KIRI_PWM = 27;
const int PIN_KANAN_IN1 = 18;
const int PIN_KANAN_IN2 = 19;
const int PIN_KANAN_PWM = 14;
const unsigned long SELANG_MS = 100;

SensorJarak sensor(PIN_PEMICU, PIN_GEMA);
Mesin mesin;
unsigned long mulai = 0;

void tulisMotor(int pinIn1, int pinIn2, int pinPwm, int kecepatan) {
  int k = constrain(kecepatan, -255, 255);
  digitalWrite(pinIn1, k > 0 ? HIGH : LOW);
  digitalWrite(pinIn2, k < 0 ? HIGH : LOW);
  ledcWrite(pinPwm, k < 0 ? -k : k);
}

void setup() {
  Serial.begin(115200);
  pinMode(PIN_MULAI, INPUT_PULLUP);
  pinMode(PIN_KIRI_IN1, OUTPUT);
  pinMode(PIN_KIRI_IN2, OUTPUT);
  pinMode(PIN_KANAN_IN1, OUTPUT);
  pinMode(PIN_KANAN_IN2, OUTPUT);
  ledcAttach(PIN_KIRI_PWM, 1000, 8);
  ledcAttach(PIN_KANAN_PWM, 1000, 8);
  sensor.mulai();
  tulisMotor(PIN_KIRI_IN1, PIN_KIRI_IN2, PIN_KIRI_PWM, 0);   // mulai dalam keadaan berhenti
  tulisMotor(PIN_KANAN_IN1, PIN_KANAN_IN2, PIN_KANAN_PWM, 0);
  mulai = millis();
}

void loop() {
  if (millis() - mulai < SELANG_MS) {
    return;
  }
  mulai = millis();
  unsigned long us = 0;
  bool valid = sensor.bacaMikrodetik(us);
  Masukan in = {digitalRead(PIN_MULAI) == LOW, valid, valid ? static_cast<int>(us * 343UL / 20000UL) : 0, millis()};
  Keadaan sebelum = mesin.keadaan;
  Keluaran k = langkah(mesin, in);
  tulisMotor(PIN_KIRI_IN1, PIN_KIRI_IN2, PIN_KIRI_PWM, k.kiri);
  tulisMotor(PIN_KANAN_IN1, PIN_KANAN_IN2, PIN_KANAN_PWM, k.kanan);
  if (mesin.keadaan != sebelum) {
    Serial.println(nama(mesin.keadaan));
  }
}
```

## Contoh setengah jadi

Lengkapi `____` pada keadaan `MUNDUR`: pindah setelah lama habis (selisih waktu), ke keadaan yang benar, dan roda mundur tetap.

```cpp setengah-jadi
// C++17. Lengkapi bagian ____.
    case Keadaan::MUNDUR:
      if (in.sekarang ____ m.mulaiKeadaan >= LAMA_MUNDUR_MS) {
        pindah(m, Keadaan::____, in.sekarang);
        return {150, -150};
      }
      return {____, -120};
```

## Soal Parsons

Susun baris-baris di bawah (sudah diacak) menjadi bagian `case Keadaan::MAJU` pada fungsi `langkah`.

```text
(a)       return {150, 150};
(b)     case Keadaan::MAJU:
(c)       } else {
(d)       if (!in.jarakValid) {
(e)         m.gagalBeruntun++;
(f)         if (m.gagalBeruntun >= GAGAL_BERUNTUN_MAKS) { pindah(m, Keadaan::AMAN, in.sekarang); return {0, 0}; }
(g)         m.gagalBeruntun = 0;
(h)         if (in.jarakCm < BATAS_HALANGAN_CM) { pindah(m, Keadaan::MUNDUR, in.sekarang); return {-120, -120}; }
(i)       }
```

## Latihan

1. `AI: tanpa AI` **Telusuri celahnya.** Pada kode contoh, apa yang terjadi bila sensor jarak gagal tiga kali beruntun saat robot berada di `MUNDUR`? Apa risikonya dan bagaimana perbaikannya?
2. `AI: boleh` **Rancang dulu.** Tulis pseudocode, lalu gambar diagram keadaan robot penghindar halangan versimu sendiri (latihan silabus), dengan tabel keadaan, roda, dan syarat keluar. Boleh menambah keadaan.
3. `AI: tanpa AI` **Keadaan jeda.** Tambahkan keadaan `JEDA` (200 ms berhenti) di antara `MUNDUR` dan `BELOK` agar roda tidak berbalik seketika seperti pada modul 3. Tulis peralihan barunya dan bagian `langkah` yang berubah.
4. `AI: boleh` **Dengan papan (F).** Dengan roda terangkat, tirukan halangan dengan telapak tangan di depan sensor dan catat tiap peralihan di Serial Monitor; lalu uji di lantai dengan kardus. Tanpa papan, ubah urutan jarak di program, prediksikan peralihannya, lalu jalankan.
5. *Opsional:* **catatan pemakaian AI.** Bila memakai AI generatif, kerjakan nomor 2 sendiri dulu, lalu minta kritik atas diagrammu, bukan program jadi. Catat alatnya, tujuanmu, garis besar perintahmu, bagian yang kamu pakai, dan cara memeriksanya. Jangan menaruh data pribadi pada perintah.

## Latihan bercampur

1. Pada `BELOK` roda berkecepatan (150, -150). Ke arah mana robot berputar, dan mengapa (dari `c-xii1-m3`)?
2. Tulis satu kebutuhan terukur beserta cara uji untuk keadaan `AMAN` (dari `c-xii1-m1`).

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `C-XII1-M6` (sekitar satu minggu lagi), `C-XII1-M8` (sekitar tiga minggu lagi), dan `C-XII1-M13` (sekitar delapan minggu lagi). Jawab sekarang lalu simpan.

1. Mengapa waktu pada mesin keadaan diperiksa dengan `sekarang - mulaiKeadaan >= lama`, bukan dengan `delay`?
2. Mengapa keadaan `AMAN` hanya bisa dikeluarkan oleh tindakan manusia?
3. Gambarkan diagram keadaan robot penghindar halangan dengan lima keadaan dan sebutkan syarat tiap panah.

## Kesalahan umum

- **Satu `if` besar tanpa keadaan yang diberi nama.** Perilaku sulit ditelusuri dan sulit diuji.
- **Tidak menyetel `mulaiKeadaan` saat pindah.** Lama keadaan baru dihitung dari keadaan lama.
- **Memakai `delay` di dalam keadaan.** Tombol dan sensor tidak terbaca selama menunggu.
- **Keadaan yang keluar sendiri dari `AMAN`.** Kegagalan yang disembunyikan akan terulang.
- **Keadaan buntu.** Setiap keadaan butuh syarat keluar, kecuali yang sengaja menunggu manusia.
- **Menguji hanya jalur normal.** Uji juga kegagalan baca, halangan yang terus ada, dan tombol di keadaan yang salah.

## Cek mandiri

- [ ] Saya dapat menggambar diagram keadaan dan menulis tabel keadaan, roda, dan syarat keluar.
- [ ] Saya menulis `langkah` sebagai fungsi yang tidak menyentuh pin dan mengujinya dengan masukan karangan.
- [ ] Saya menghitung lama keadaan dengan selisih `millis()`, bukan `delay`.
- [ ] Saya merancang keadaan aman yang butuh tindakan manusia.
- [ ] Saya menguji pertama dengan roda terangkat.

## Kunci dan petunjuk

**Ingat kembali.** 1: tiap sensor punya nilai putih dan hitam yang berbeda sehingga satu ambang akan salah pada sebagian sensor. 2: arus rata-rata tidak menyertakan lonjakan; motor yang macet menarik arus jauh lebih besar sehingga baterai habis lebih cepat dari hitungan. 3: contoh: data yang terus naik atau turun (rata-rata bergerak tertinggal), perubahan mendadak, atau data yang terlalu sedikit; garis tren hanya menebak dengan baik bila pola lalu berlanjut.

**Prediksi dulu.** 1: t = 200 ms (jarak 14 cm kurang dari 15 pada masukan itu). 2: `MUNDUR` mulai 200 ms dan berlangsung 500 ms, sehingga `BELOK` mulai pada 700 ms; `BELOK` berlangsung 600 ms, sehingga `MAJU` lagi pada 1300 ms. 3: roda (0, 0) dan keadaan `AMAN`; keluar hanya dengan tombol (menuju `DIAM`), yaitu tindakan manusia.

**Contoh setengah jadi.** Isian berurutan: `-`, `BELOK`, `-120`. Kunci yang dikompilasi dan dijalankan penulis menghasilkan keluaran yang sama dengan contoh terselesaikan.

**Soal Parsons.** Urutan benar: b, d, e, f, c, g, h, i, a. Kegagalan dihitung di cabang pertama; cabang `else` mengosongkan hitungan lalu memeriksa halangan; `return` terakhir menjaga roda maju bila tidak ada peralihan.

**Latihan.** 1: tidak terjadi apa-apa: `MUNDUR` mengabaikan sensor dan hitungan kegagalan tidak bertambah di sana. Risikonya robot mundur dalam keadaan buta; perbaikannya menghitung kegagalan di semua keadaan yang bergerak, atau memeriksa sensor sebelum mundur lama. 2: tidak ada kunci tunggal; diagram yang baik punya syarat keluar tiap keadaan dan satu keadaan aman. 3: `MUNDUR --500 ms--> JEDA --200 ms--> BELOK`; `JEDA` mengembalikan roda (0, 0); di `MUNDUR` tujuan peralihan diganti `JEDA`, dan satu `case` baru ditambahkan. 4: tidak ada kunci tunggal; jawaban yang baik mencatat tiap peralihan beserta waktunya.

**Latihan bercampur.** 1: ke kanan di tempat: roda kiri maju dan roda kanan mundur, sehingga robot berputar searah jarum jam. 2: contoh: "bila sensor jarak gagal tiga kali beruntun, roda berhenti dan tetap berhenti sampai tombol ditekan; uji dengan mencabut sensor lima kali".

**Ulang berjarak.** 1: `delay` menghentikan program sehingga tombol dan sensor tidak terbaca; selisih `millis()` membiarkan `loop()` berjalan terus. 2: kegagalan yang membuat robot menganggap dirinya rusak perlu diperiksa manusia; bila pulih sendiri, kerusakan yang sama bisa membuatnya bergerak lagi tanpa pengawasan. 3: DIAM ke MAJU (tombol), MAJU ke MUNDUR (jarak di bawah 15 cm), MUNDUR ke BELOK (500 ms), BELOK ke MAJU (600 ms), MAJU ke AMAN (tiga kegagalan baca beruntun), AMAN ke DIAM (tombol).

## Langkah berikutnya

Modul berikut: `c-xii1-m6` (pengikut garis: strategi 1), yang memakai sensor garis dan kendali roda untuk mengikuti lintasan. Bacaan lanjut: dokumentasi `millis()` dan contoh Blink tanpa `delay` (lihat Rujukan).
