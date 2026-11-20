## Untuk siapa modul ini

Modul ini untuk murid kelas XII jalur C (IoT dan robotika), minggu `C-XII2-M7` silabus v1.4: proyek akhir, sprint 2 (program). Prasyarat: modul `c-xii2-m6` (sprint 1: perangkat keras). Kamu juga memakai penyangga melingkar dari `c-xi1-m9`, mesin keadaan dari `c-xii1-m5` (belum terindeks saat modul ini ditulis), dan kendali proporsional dari `c-xii1-m7`.

Modul ini karangan penyusun dan disetujui pemilik program pada 2026-11-20 (keputusan lewat dialog; catatan tinjauan menjadi tindak lanjut revisi). Ia mendukung butir `F-BK-a` dan `F-AP-d` (struktur data dan pemakaian library atau perangkat yang tersedia), dan tidak dihitung memenuhi butir capaian pembelajaran mana pun. Keluaran minggu ini: program inti. Latihan silabusnya: implementasi.

Dengan papan atau tanpa papan, bagian pokok dikerjakan di komputer dengan perangkat tiruan; menyambungkannya ke papan nyata adalah sprint berikutnya. Keselamatan perangkat: minggu ini tidak ada rangkaian yang diubah; bila kamu mengunggah ke robot, ikuti aturan sprint 1 (roda terangkat, tombol berhenti, daya dari guru). Angka koreksi dan kecepatan hanya contoh `[belum terverifikasi]` untuk robotmu.

## Ingat kembali

Jawab dari ingatan dulu, baru cek di kunci. Soal 1 dari `c-xii2-m6`, soal 2 dari `c-xii2-m4`, soal 3 dari `c-xii1-m13`.

1. Mengapa rangkaian diuji bertahap, dari tanpa daya hingga motor?
2. Mengapa rahasia yang pernah masuk repositori harus dianggap bocor?
3. Mengapa risiko ditulis bersama tindakan pencegahan dan penanggung jawabnya?

## Tujuan

Setelah modul ini kamu dapat:

- memisahkan logika keputusan dari perangkat keras lewat antarmuka kecil;
- menulis mesin keadaan dengan keadaan aman dan tombol berhenti;
- menyimpan catatan terakhir dalam penyangga melingkar berukuran tetap;
- menguji program inti dengan perangkat tiruan berskenario, termasuk garis hilang;
- menghasilkan program inti (keluaran minggu ini).

## Rencana sprint

Sprint 2 menulis program inti rancanganmu. Kriteria selesainya: logika berjalan pada skenario uji tanpa papan, keadaan aman dicapai bila garis hilang atau tombol berhenti ditekan, dan log tidak memakai memori tanpa batas. Strukturnya tiga lapis. **Antarmuka** `Perangkat` adalah satu-satunya bagian yang menyentuh dunia luar (tombol, sensor, roda). **Logika** (`Robot`) hanya memakai antarmuka itu, sehingga dapat diuji tanpa papan. **Log** menyimpan beberapa catatan terakhir. Di papan, kamu menulis satu kelas lain yang mengisi antarmuka yang sama dengan `analogRead` dan pin; logikanya tidak berubah. Tulis **prediksi** sebelum menjalankan: pada skenario karangan (galat 0, 0, -8, -4, 0, lalu garis hilang tiga tick), kapan robot masuk keadaan `AMAN`?

```cpp
// C++17 biasa, jalan di komputer. Diperiksa oleh check:module-code.
// Program inti robot dipisah dari perangkat keras lewat antarmuka kecil, sehingga dapat diuji tanpa papan.
// Perangkat TIRUAN di bawah memutar skenario karangan; di papan, kelas lain mengisi antarmuka yang sama.
#include <cstdint>
#include <iostream>

enum Keadaan { DIAM, MAJU, AMAN };
const char *NAMA[] = {"DIAM", "MAJU", "AMAN"};

// Antarmuka: satu-satunya bagian yang menyentuh dunia luar.
class Perangkat {
 public:
  virtual ~Perangkat() {}
  virtual bool tombolMulai() = 0;
  virtual bool tombolBerhenti() = 0;
  virtual bool bacaGalat(int &galat) = 0;  // false bila garis hilang
  virtual void setRoda(int kiri, int kanan) = 0;
};

// Penyangga melingkar: menyimpan N catatan terakhir; yang paling lama ditimpa (pelajaran c-xi1-m9).
struct Catatan {
  uint16_t tick;
  uint8_t keadaan;
  int8_t koreksi;
};

const int KAPASITAS = 6;

struct LogBulat {
  Catatan isi[KAPASITAS];
  int awal = 0;
  int banyak = 0;
  void tambah(const Catatan &c) {
    int indeks = (awal + banyak) % KAPASITAS;
    isi[indeks] = c;
    if (banyak < KAPASITAS) {
      banyak++;
    } else {
      awal = (awal + 1) % KAPASITAS;
    }
  }
};

const int HILANG_MAKS = 3;     // garis hilang beruntun sebelum AMAN
const int KP_PEMBILANG = 3;
const int KP_PENYEBUT = 4;
const int KOREKSI_MAKS = 15;
const int KECEPATAN_DASAR = 150;
const int UNIT_PER_MM = 5;

int koreksiDari(int galat) {
  int k = -KP_PEMBILANG * galat / KP_PENYEBUT;
  if (k > KOREKSI_MAKS) return KOREKSI_MAKS;
  if (k < -KOREKSI_MAKS) return -KOREKSI_MAKS;
  return k;
}

class Robot {
 public:
  explicit Robot(Perangkat &p) : perangkat_(p) {}
  Keadaan keadaan() const { return keadaan_; }
  const LogBulat &log() const { return log_; }

  void langkah(int tick) {
    int koreksi = 0;
    if (perangkat_.tombolBerhenti()) {
      keadaan_ = AMAN;
    }
    if (keadaan_ == DIAM && perangkat_.tombolMulai()) {
      keadaan_ = MAJU;
      hilang_ = 0;
    }
    if (keadaan_ == MAJU) {
      int galat = 0;
      if (perangkat_.bacaGalat(galat)) {
        hilang_ = 0;
        koreksi = koreksiDari(galat);
        perangkat_.setRoda(KECEPATAN_DASAR - UNIT_PER_MM * koreksi, KECEPATAN_DASAR + UNIT_PER_MM * koreksi);
      } else {
        hilang_++;
        if (hilang_ >= HILANG_MAKS) {
          keadaan_ = AMAN;
        }
      }
    }
    if (keadaan_ != MAJU) {
      perangkat_.setRoda(0, 0);
    }
    log_.tambah({static_cast<uint16_t>(tick), static_cast<uint8_t>(keadaan_), static_cast<int8_t>(koreksi)});
  }

 private:
  Perangkat &perangkat_;
  Keadaan keadaan_ = DIAM;
  int hilang_ = 0;
  LogBulat log_;
};

// Perangkat tiruan: skenario galat per tick; 99 berarti garis hilang.
class PerangkatTiruan : public Perangkat {
 public:
  void maju(int tick) { tick_ = tick; }
  bool tombolMulai() override { return tick_ == 1; }
  bool tombolBerhenti() override { return false; }
  bool bacaGalat(int &galat) override {
    static const int SKENARIO[] = {0, 0, -8, -4, 0, 99, 99, 99, 3, 3};
    int g = SKENARIO[tick_];
    if (g == 99) return false;
    galat = g;
    return true;
  }
  void setRoda(int kiri, int kanan) override {
    kiri_ = kiri;
    kanan_ = kanan;
  }
  int kiri_ = 0;
  int kanan_ = 0;

 private:
  int tick_ = 0;
};

int main() {
  PerangkatTiruan p;
  Robot robot(p);
  for (int t = 0; t < 10; t++) {
    p.maju(t);
    robot.langkah(t);
    std::cout << "tick " << t << ": " << NAMA[robot.keadaan()] << " roda=(" << p.kiri_ << "," << p.kanan_ << ")\n";
  }
  std::cout << "log (" << robot.log().banyak << " terakhir dari 10):\n";
  for (int i = 0; i < robot.log().banyak; i++) {
    const Catatan &c = robot.log().isi[(robot.log().awal + i) % KAPASITAS];
    std::cout << "  tick " << c.tick << " " << NAMA[c.keadaan] << " koreksi " << static_cast<int>(c.koreksi) << "\n";
  }
}
```

Keluaran program (dijalankan penulis dengan `g++ -std=c++17`):

```text
tick 0: DIAM roda=(0,0)
tick 1: MAJU roda=(150,150)
tick 2: MAJU roda=(120,180)
tick 3: MAJU roda=(135,165)
tick 4: MAJU roda=(150,150)
tick 5: MAJU roda=(150,150)
tick 6: MAJU roda=(150,150)
tick 7: AMAN roda=(0,0)
tick 8: AMAN roda=(0,0)
tick 9: AMAN roda=(0,0)
log (6 terakhir dari 10):
  tick 4 MAJU koreksi 0
  tick 5 MAJU koreksi 0
  tick 6 MAJU koreksi 0
  tick 7 AMAN koreksi 0
  tick 8 AMAN koreksi 0
  tick 9 AMAN koreksi 0
```

Bacalah dengan jujur. Garis hilang pertama pada tick 5, tetapi `AMAN` baru pada tick 7: pada tick 5 dan 6 roda masih memakai perintah terakhir (150, 150) karena program belum mengubah roda, jadi robot melaju dua tick tanpa melihat garis. Itu keputusan desain: `HILANG_MAKS` = 3 menahan derau sesaat tetapi memperpanjang jarak melaju buta. Bila satu tick 20 ms seperti sketsa `c-xii1-m7`, itu 40 ms; pada robot cepat bisa berarti beberapa sentimeter. Bila kriteria menuntut berhenti lebih cepat, turunkan `HILANG_MAKS` lalu uji ulang. Log hanya enam catatan terakhir: tick 0 sampai 3 sudah ditimpa; itulah harga memori tetap. Program ini hanya diuji pada satu skenario; tambahkan skenario tombol berhenti dan garis yang kembali.

## Daftar periksa

Kerjakan berurutan; tiap titik periksa harus dapat ditunjukkan kepada orang lain.

1. `AI: boleh` **Antarmuka.** Tulis daftar fungsi `Perangkat` untuk proyekmu (masukan, keluaran, tombol). Titik periksa: tidak ada pemanggilan perangkat keras di luar kelas yang mengisinya.
2. `AI: tanpa AI` **Logika murni.** Tulis fungsi keputusan yang hanya menerima angka dan mengembalikan angka, beserta tabel kasus uji termasuk nilai tepat di batas. Titik periksa: semua kasus lulus.
3. `AI: boleh` **Keadaan aman.** Tambahkan keadaan `AMAN` dan tombol berhenti; tentukan syarat keluar dari `AMAN` (hanya oleh manusia). Titik periksa: roda berhenti pada skenario garis hilang.
4. `AI: boleh` **Log.** Pilih kapasitas penyangga dan hitung byte yang dipakai. Titik periksa: ukuran tetap dan tercatat.
5. `AI: tanpa AI` **Skenario uji.** Tulis tiga skenario perangkat tiruan: normal, garis hilang sebentar lalu kembali, garis hilang terus. Titik periksa: prediksi tertulis sebelum menjalankan.
6. *Opsional:* **catatan pemakaian AI.** Bila memakai AI generatif, tulis dulu rancangan sendiri, lalu minta kritik, bukan kode jadi. Kode buatan AI dibaca, dijalankan, dan diuji. Catat alatnya, tujuanmu, garis besar perintahmu, bagian yang kamu pakai, dan cara memeriksanya. Jangan menaruh data pribadi pada perintah.

## Umpan balik sejawat

Tukar kode dan skenario uji dengan kelompok lain. Beri masukan: **satu yang sudah baik**, **satu yang perlu diperbaiki**, dan **satu langkah berikutnya**. Sebut butir tertentu, misalnya "keadaan `AMAN` tidak mematikan roda", bukan "kurang aman". Ulasan berpasangan ini praktik yang layak dicoba, bukan jaminan hasil (buktinya paling banyak pada mahasiswa).

## Latihan bercampur

1. Dari `c-xii2-m2`: berapa byte satu `Catatan` pada program di atas, dan berapa byte enam catatan?
2. Dari `c-xii2-m6`: bila pin motor berganti, bagian mana dari program inti berubah dan bagian mana tidak?

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `C-XII2-M8` (sekitar satu minggu lagi), `C-XII2-M10` (sekitar tiga minggu lagi), dan `C-XII2-M14` (sekitar tujuh minggu lagi, karena minggu terakhir semester). Jawab sekarang lalu simpan.

1. Mengapa logika keputusan dipisahkan dari perangkat lewat antarmuka?
2. Mengapa log memakai penyangga melingkar, dan apa yang hilang bila penuh?
3. Mengapa robot masuk `AMAN` setelah beberapa pembacaan garis hilang beruntun, bukan satu?

## Kesalahan umum

- **Memanggil `analogRead` di tengah logika.** Logika tidak dapat diuji tanpa papan.
- **Keadaan `AMAN` yang tidak mematikan roda.** Nama keadaan tidak menghentikan motor; setel roda ke nol.
- **Log tanpa batas.** Memori habis dan robot mati ulang.
- **Menguji hanya skenario yang berhasil.** Garis hilang dan tombol berhenti yang menentukan keselamatan.

## Cek mandiri

- [ ] Logika saya tidak memanggil perangkat keras langsung.
- [ ] Saya menguji logika dengan perangkat tiruan berskenario.
- [ ] Keadaan `AMAN` mematikan roda dan hanya manusia yang mengeluarkan robot darinya.
- [ ] Log saya berukuran tetap dan saya tahu berapa byte.
- [ ] Prediksi saya ditulis sebelum menjalankan.

## Kunci dan petunjuk

**Ingat kembali.** 1: supaya kegagalan dapat ditunjuk ke satu penyebab dan kerusakan dicegah sebelum motor menyala. 2: riwayat repositori menyimpan salinan; orang yang punya akses ke riwayat masih dapat membacanya, jadi rahasia diganti. 3: risiko tanpa pencegahan hanya daftar kekhawatiran, dan tanpa penanggung jawab tidak ada yang bertindak.

**Rencana sprint.** Prediksi: garis hilang pada tick 5, 6, dan 7; hitungan mencapai tiga pada tick 7, jadi `AMAN` pada tick 7 (keluaran program menunjukkannya, dengan roda (150, 150) pada tick 5 dan 6).

**Daftar periksa.** Rubrik singkat: nomor 1 semua akses perangkat lewat antarmuka; nomor 2 fungsi murni dengan kasus tepi; nomor 3 roda (0, 0) pada `AMAN` dan syarat keluar oleh manusia; nomor 4 kapasitas dan byte tertulis; nomor 5 tiga skenario dengan prediksi bertanggal; nomor 6 opsional.

**Umpan balik sejawat.** Umpan balik yang baik menyebut butir, bukan kesan umum, dan memberi langkah yang bisa dikerjakan minggu depan.

**Latihan bercampur.** 1: `uint16_t` 2 byte + `uint8_t` 1 + `int8_t` 1 = 4 byte; enam catatan = 24 byte (ditambah dua `int` penghitung penyangga). 2: hanya kelas yang mengisi antarmuka (pin dan pembacaan) yang berubah; `Robot` dan `koreksiDari` tetap, dan tabel pin serta riwayat dokumen diperbarui.

**Ulang berjarak.** 1: logika yang tidak menyentuh perangkat keras dapat diuji di komputer dengan skenario, dan perangkat yang berganti tidak mengubah logika. 2: memori tetap sehingga tidak habis; yang hilang adalah catatan tertua yang ditimpa catatan baru. 3: satu pembacaan hilang bisa derau sesaat; beberapa beruntun menandakan garis benar-benar hilang; harganya robot melaju buta beberapa tick.

## Langkah berikutnya

Modul berikut: `C-XII2-M8` (sprint 3: jaringan dan data). Bacaan lanjut: `millis()` pada referensi Arduino dan C++ Core Guidelines (lihat Rujukan).
