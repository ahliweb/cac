## Untuk siapa modul ini

Modul ini untuk murid kelas XII jalur C (IoT dan robotika), minggu `C-XII2-M6` silabus v1.4: proyek akhir, sprint 1 (perangkat keras) (F). Prasyarat: modul `c-xii2-m5` (proyek akhir: rancangan). Kamu memakai rancangan minggu lalu dan daya baterai dari `C-XII1-M10` (belum terindeks saat modul ini ditulis).

Modul ini berstatus DRAF: karangan penyusun, belum ditinjau pemilik. Ia mendukung butir `F-BK-a` dan `F-AP-d`, dan tidak dihitung memenuhi butir capaian pembelajaran mana pun. Keluaran minggu ini: rangkaian teruji. Latihan silabusnya: perakitan.

Ada dua cara mengerjakan. **Dengan papan (F):** kelompok merakit rangkaian dari rancangan dan mengujinya bertahap. **Tanpa papan:** kelompok menghitung tegangan dan arus pada rangkaian karangan, menulis lembar uji, dan menjalankan program papan tiruan di komputer. Nomor pin dan angka pada contoh hanya contoh `[belum terverifikasi]` untuk papanmu.

## Keselamatan perangkat

- Papan memakai daya USB; motor memakai baterai AA/AAA dari guru lewat modul pengendali. Tidak ada listrik jaringan (220 V), baterai litium tanpa pelindung, atau pengisian daya litium oleh murid. Tidak ada solder.
- Cabut baterai dan kabel USB sebelum mengubah rangkaian; periksa polaritas. Pin papan tidak boleh menerima tegangan di atas tegangan kerjanya: baterai tidak pernah langsung ke pin, dan motor lewat modul pengendali.
- Motor pertama kali dinyalakan dengan **roda terangkat**, di meja bertepi, dengan tombol berhenti terpasang dan pemutus daya yang kamu ketahui letaknya. Bagian yang bergerak tidak disentuh saat menyala.
- Papan, modul, motor, atau baterai yang terasa panas, berbau, atau berasap: cabut daya dan panggil guru. Tidak ada kamera atau mikrofon, dan tidak ada sensor tubuh.

## Ingat kembali

Jawab dari ingatan dulu, baru cek di kunci. Soal 1 dari `c-xii2-m5`, soal 2 dari `c-xii2-m3`, soal 3 dari `c-xii1-m12`.

1. Mengapa tiap kebutuhan harus punya uji yang menunjuknya?
2. Mengapa tujuan ditulis dapat gagal, dan apa yang kamu lakukan bila model menunjukkan tujuan tidak tercapai?
3. Mengapa dokumen perlu nomor versi dan riwayat perubahan?

## Tujuan

Setelah modul ini kamu dapat:

- merakit rangkaian dari rancangan dan tabel pin yang sama dengan program;
- menghitung tegangan di pin **sebelum** menyambung baterai;
- menguji bertahap dan mencatat hasil tiap tahap pada lembar uji;
- menghasilkan rangkaian teruji (keluaran minggu ini).

## Rencana sprint

Sprint 1 menghubungkan rancangan `C-XII2-M5` dengan perangkat nyata. Kriteria selesainya diturunkan dari rancangan: rangkaian sesuai tabel pin, semua masukan terbaca, motor menyala hanya bila diizinkan, dan tombol berhenti bekerja. Tulis **prediksi** tiap tahap sebelum mengerjakannya, lalu bandingkan dengan hasil; selisihnya adalah bahan belajar. Pengujian dilakukan bertahap supaya kegagalan dapat ditunjuk ke satu penyebab:

| Tahap | Daya | Yang diperiksa | Titik periksa |
| --- | --- | --- | --- |
| 1 | tidak ada | rangkaian terhadap tabel pin; polaritas | orang lain dapat membaca rangkaian dari tabel |
| 2 | tanpa motor | tegangan di pin; masukan sensor | tegangan di bawah batas pin; bacaan masuk akal |
| 3 | tanpa motor | tombol berhenti | program melaporkan penekanan tombol |
| 4 | motor, roda terangkat | denyut singkat, lalu berhenti | arah putar sesuai; tak ada panas atau bau |

Tahap 2 mulai di komputer: hitung tegangan di pin dari baterai dan pembagi tegangan, dan jangan menyambung bila hasilnya melebihi batas pin. Program berikut membandingkan tiga rangkaian karangan.

```cpp
// C++17 biasa, jalan di komputer. Diperiksa oleh check:module-code.
// "Papan tiruan": hitung tegangan di pin SEBELUM menyambung baterai. Semua angka adalah CONTOH;
// ukur dengan voltmeter dan periksa lembar data papanmu.
#include <iostream>

const int PIN_MV_MAKS = 3100;  // contoh batas aman pada pin papan 3,3 V

struct Rangkaian {
  const char *nama;
  int sel;          // jumlah sel AA
  int mvPerSelMaks;  // contoh: sel baru tanpa beban
  int r1Ohm;
  int r2Ohm;
};

// Pin hanya melihat R2 / (R1 + R2). Kalikan dulu, baru bagi.
int mvDiPin(int mvBaterai, int r1, int r2) { return mvBaterai * r2 / (r1 + r2); }

int main() {
  const Rangkaian daftar[] = {
      {"pembagi 20k/10k", 4, 1600, 20000, 10000},
      {"pembagi 10k/10k", 4, 1600, 10000, 10000},
      {"tanpa pembagi", 4, 1600, 0, 1},
  };
  for (const Rangkaian &r : daftar) {
    int mvBat = r.sel * r.mvPerSelMaks;
    int mvPin = mvDiPin(mvBat, r.r1Ohm, r.r2Ohm);
    std::cout << r.nama << ": baterai " << mvBat << " mV, pin " << mvPin << " mV -> "
              << (mvPin <= PIN_MV_MAKS ? "AMAN disambung" : "JANGAN disambung") << "\n";
  }
}
```

Keluaran program (dijalankan penulis dengan `g++ -std=c++17`):

```text
pembagi 20k/10k: baterai 6400 mV, pin 2133 mV -> AMAN disambung
pembagi 10k/10k: baterai 6400 mV, pin 3200 mV -> JANGAN disambung
tanpa pembagi: baterai 6400 mV, pin 6400 mV -> JANGAN disambung
```

Perhatikan bahwa pembagi 10k/10k tampak masuk akal tetapi baterai baru melampaui batas contoh 3100 mV; hanya hitungan yang menangkapnya sebelum papan rusak. Sketsa berikut menguji bertahap di papan: tahap 1 hanya membaca masukan, tahap 2 memberi satu denyut motor 300 ms dan berhenti. Ia hanya diperiksa sintaksnya terhadap header tiruan, tidak dijalankan pada papan, dan nama fungsi PWM mengikuti Arduino-ESP32 versi 3 `[belum terverifikasi]`.

```arduino
// Arduino-C++ untuk ESP32. Diperiksa check:module-code terhadap header tiruan (sintaks dan tipe saja, bukan bukti perilaku papan).
// Semua nomor pin dan angka contoh; ganti dengan lembar guru dan tabel pin kelompokmu.
// Uji bertahap: ubah TAHAP satu per satu. Tahap 1 tanpa motor; tahap 2 hanya dengan roda terangkat.
const int TAHAP = 1;                 // 1 = baca masukan; 2 = denyut motor 300 ms
const int PIN_SENSOR[5] = {32, 33, 34, 35, 36};
const int PIN_BATERAI = 39;          // lewat pembagi tegangan; periksa papanmu
const int PIN_BERHENTI = 4;          // tombol berhenti ke GND
const int PIN_KIRI_IN1 = 17;
const int PIN_KIRI_IN2 = 16;
const int PIN_KIRI_PWM = 27;
const int DENYUT_PWM = 100;          // rendah: cukup untuk melihat roda berputar
const unsigned long DENYUT_MS = 300;

void motorKiri(int kecepatan) {
  digitalWrite(PIN_KIRI_IN1, kecepatan > 0 ? HIGH : LOW);
  digitalWrite(PIN_KIRI_IN2, LOW);
  ledcWrite(PIN_KIRI_PWM, kecepatan > 0 ? kecepatan : 0);
}

void setup() {
  Serial.begin(115200);
  pinMode(PIN_BERHENTI, INPUT_PULLUP);
  pinMode(PIN_KIRI_IN1, OUTPUT);
  pinMode(PIN_KIRI_IN2, OUTPUT);
  ledcAttach(PIN_KIRI_PWM, 1000, 8);
  motorKiri(0);                      // keadaan awal: motor mati
}

void loop() {
  if (digitalRead(PIN_BERHENTI) == LOW) {
    motorKiri(0);
    Serial.println("BERHENTI ditekan");
    delay(200);
    return;
  }
  if (TAHAP == 1) {
    for (int i = 0; i < 5; i++) {
      Serial.print(analogRead(PIN_SENSOR[i]));
      Serial.print(" ");
    }
    Serial.print("baterai(mentah)=");
    Serial.println(analogRead(PIN_BATERAI));
    delay(500);
  } else {
    motorKiri(DENYUT_PWM);
    delay(DENYUT_MS);
    motorKiri(0);
    delay(2000);                     // jeda: periksa roda, panas, dan bau
  }
}
```

## Daftar periksa

Kerjakan berurutan; tiap titik periksa harus dapat ditunjukkan kepada orang lain.

1. `AI: tanpa AI` **Hitung dulu.** Hitung tegangan di pin untuk rangkaian proyekmu dengan baterai terbaru. Titik periksa: di bawah batas pin papanmu (periksa lembar datanya).
2. `AI: boleh` **Perbarui tabel pin.** Tulis tabel pin dari daftar pin bernama yang sama dengan program. Titik periksa: tidak ada pin kembar.
3. `AI: tanpa AI` **Tahap 1 sampai 3.** Rakit, lalu uji tanpa motor dan catat tiap tahap pada lembar uji (tanggal, prediksi, hasil). Titik periksa: orang lain dapat mengulangnya.
4. `AI: boleh` **Tahap 4.** Roda terangkat, denyut singkat, periksa arah dan suhu. Titik periksa: tombol berhenti menghentikan motor.
5. `AI: boleh` **Riwayat.** Tambahkan satu baris riwayat perubahan dokumen. Titik periksa: nomor versi naik.
6. *Opsional:* **catatan pemakaian AI.** Bila memakai AI generatif, tulis dulu perhitungan sendiri, lalu minta kritik, bukan hasil jadi. Catat alatnya, tujuanmu, garis besar perintahmu, bagian yang kamu pakai, dan cara memeriksanya. Jangan menaruh data pribadi pada perintah.

## Umpan balik sejawat

Tukar lembar uji dengan kelompok lain. Beri masukan: **satu yang sudah baik**, **satu yang perlu diperbaiki**, dan **satu langkah berikutnya**. Sebut butir tertentu, misalnya "tahap 3 belum mencatat prediksi", bukan "kurang rapi". Pemrograman berpasangan paling banyak dibuktikan pada mahasiswa, jadi anggap ini praktik yang layak dicoba, bukan jaminan hasil.

## Latihan bercampur

1. Dari `C-XII1-M10`: mengapa baterai tidak pernah langsung ke pin, dan apa yang melindungi pin?
2. Dari `c-xii2-m1`: setelah kamu mengganti nomor pin di daftar bernama, apa yang harus diuji ulang?

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `C-XII2-M7` (sekitar satu minggu lagi), `C-XII2-M9` (sekitar tiga minggu lagi), dan `C-XII2-M14` (sekitar delapan minggu lagi). Jawab sekarang lalu simpan.

1. Mengapa rangkaian diuji bertahap, dari tanpa daya hingga motor?
2. Apa yang dicatat pada lembar uji agar orang lain dapat mengulang ujimu?
3. Mengapa roda diangkat dan tombol berhenti dipasang sebelum motor dinyalakan pertama kali?

## Kesalahan umum

- **Menyambung baterai sebelum menghitung tegangan di pin.** Pin dapat rusak.
- **Langsung menyalakan motor di lintasan.** Roda terangkat dulu.
- **Mengubah rangkaian tanpa memperbarui tabel pin.** Dokumen dan program tidak sama.
- **Menguji semua sekaligus.** Kegagalan tidak dapat ditunjuk ke satu penyebab.
- **Menulis prediksi sesudah hasil.** Itu bukan prediksi.

## Cek mandiri

- [ ] Saya menghitung tegangan di pin sebelum menyambung baterai.
- [ ] Rangkaian saya sesuai tabel pin dan program.
- [ ] Saya menguji bertahap dan mencatat tiap tahap.
- [ ] Tombol berhenti saya uji sebelum motor menyala di lintasan.
- [ ] Saya memperbarui riwayat perubahan dokumen.

## Kunci dan petunjuk

**Ingat kembali.** 1: kebutuhan tanpa uji tidak dapat dibuktikan tercapai, dan uji tanpa kebutuhan tidak punya tujuan. 2: supaya hasil dapat dinilai jujur; bila model menunjukkan tujuan tidak tercapai, tinjau tujuan atau tambah sistemnya secara terbuka, lalu uji ulang. 3: supaya orang lain tahu versi mana yang sedang dipegang dan apa yang berubah, kapan, dan mengapa, sehingga pemeliharaan tidak berupa tebakan.

**Rencana sprint.** Rangkaian yang baik terlihat dari lembar uji: tiap tahap punya tanggal, prediksi, hasil, dan paraf kelompok. Tegangan di pin dihitung dari pembagi: 6400 x 10000 / (20000 + 10000) = 2133 mV; untuk 10k/10k: 6400 x 10000 / 20000 = 3200 mV, di atas batas contoh.

**Daftar periksa.** Rubrik singkat: nomor 1 ada rumus dan angka; nomor 2 tabel pin dibuat dari daftar pin bernama; nomor 3 lembar uji memuat prediksi sebelum hasil; nomor 4 tombol berhenti terbukti bekerja; nomor 5 versi naik; nomor 6 opsional.

**Umpan balik sejawat.** Umpan balik yang baik menyebut butir, bukan kesan umum, dan memberi langkah yang bisa dikerjakan minggu depan.

**Latihan bercampur.** 1: pin tidak tahan tegangan baterai; pembagi tegangan menurunkan tegangan di pin ke bawah batas aman. 2: ulangi tahap pengujian yang menyentuh pin itu (masukan atau keluaran), dan perbarui tabel pin serta riwayat perubahan.

**Ulang berjarak.** 1: supaya kegagalan dapat ditunjuk ke satu penyebab dan kerusakan dicegah sebelum motor menyala. 2: tanggal, prediksi, hasil, kondisi (daya, tahap), dan siapa yang menguji. 3: roda terangkat dan tombol berhenti mencegah robot melaju tak terkendali saat arah putar atau program belum terbukti benar.

## Langkah berikutnya

Modul berikut: `C-XII2-M7` (sprint 2: program). Bacaan lanjut: `analogRead` dan ADC Arduino-ESP32 (lihat Rujukan).
