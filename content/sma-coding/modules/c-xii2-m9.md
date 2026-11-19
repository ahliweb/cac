## Untuk siapa modul ini

Modul ini untuk murid kelas XII jalur C (IoT dan robotika), minggu `C-XII2-M9` silabus v1.4: proyek akhir, sprint 4 (penyempurnaan). Prasyarat terindeks: `c-xii2-m8`. Kamu memakai lembar uji `C-XII2-M6` dan program inti `C-XII2-M7` yang belum terindeks saat modul ini ditulis, serta kebutuhan K1 sampai K5 dari rancangan `C-XII2-M5`.

Modul ini berstatus DRAF: karangan penyusun, belum ditinjau pemilik. Ia mendukung butir `F-BK-a` dan `F-AP-d`, dan tidak dihitung memenuhi butir capaian pembelajaran mana pun. Keluaran minggu ini: rilis kandidat. Latihan silabusnya: perbaikan.

Dengan papan atau tanpa papan, bagian pokok dikerjakan di komputer dengan perangkat tiruan. Keselamatan perangkat: bila kamu mengunggah ke robot, ikuti aturan sprint 1 (roda terangkat, tombol berhenti terpasang, daya dari guru, tanpa listrik 220 V atau solder). Angka dan batas pada contoh hanya contoh karangan.

## Ingat kembali

Jawab dari ingatan dulu, baru cek kunci. Soal 1 dari `c-xii2-m8`, soal 2 dari `c-xii2-m6`, soal 3 dari `c-xii2-m1`.

1. Mengapa pengiriman data lewat jaringan tidak dilakukan saat robot `MAJU`?
2. Apa yang dicatat pada lembar uji agar orang lain dapat mengulang ujimu?
3. Sebut tiga bau kode dan satu perbaikan untuk masing-masing.

## Tujuan

Setelah modul ini kamu dapat:

- menjalankan uji regresi tanpa papan yang tiap ujinya menunjuk satu kebutuhan;
- menilai satu perubahan dengan uji sebelum dan sesudah, bukan dengan perasaan;
- membekukan fitur dan hanya memperbaiki galat sampai rilis;
- menulis catatan rilis yang jujur tentang yang masih belum beres;
- menghasilkan rilis kandidat (keluaran minggu ini).

## Rencana sprint

Sprint 4 memperbaiki kualitas dan keandalan, bukan menambah fitur. Kriteria selesainya: semua uji lulus, tiap perubahan dibuat **satu per satu** dengan uji ulang (seperti perbaikan galat dan refaktor dipisah di `c-xii2-m1`), fitur dibekukan, dan fitur yang boleh dipotong menurut rancangan sudah dipotong bila waktu tidak cukup. **Rilis kandidat** adalah versi yang kamu yakini siap, tetapi masih menunggu ulasan sejawat dan pengujian akhir.

**Uji regresi** menjalankan ulang semua uji setelah setiap perubahan, supaya perbaikan di satu tempat tidak merusak tempat lain. Tulis **prediksi** dulu: kebutuhan K3 menuntut berhenti secepat mungkin saat garis hilang, jadi seseorang menurunkan `HILANG_MAKS` dari 3 menjadi 2. Uji mana yang akan gagal? Program berikut menjalankan tiga uji karangan, tiap uji menunjuk kebutuhannya, pada kedua nilai.

```cpp
// C++17 biasa, jalan di komputer. Diperiksa oleh check:module-code.
// Uji regresi tanpa papan: tiap uji menunjuk satu kebutuhan. Logika robot sama dengan modul c-xii2-m7,
// diringkas; satu-satunya yang diubah di antara dua putaran adalah HILANG_MAKS. Semua angka karangan.
#include <iostream>
#include <vector>

enum Keadaan { DIAM, MAJU, AMAN };
const char *NAMA[] = {"DIAM", "MAJU", "AMAN"};

struct Masukan {
  bool mulai;
  bool berhenti;
  bool garis;  // false bila garis hilang
};

class Robot {
 public:
  explicit Robot(int hilangMaks) : hilangMaks_(hilangMaks) {}
  Keadaan langkah(const Masukan &m) {
    if (m.berhenti) {
      keadaan_ = AMAN;
    }
    if (keadaan_ == DIAM && m.mulai) {
      keadaan_ = MAJU;
      hilang_ = 0;
    }
    if (keadaan_ == MAJU) {
      hilang_ = m.garis ? 0 : hilang_ + 1;
      if (hilang_ >= hilangMaks_) {
        keadaan_ = AMAN;
      }
    }
    return keadaan_;
  }

 private:
  int hilangMaks_;
  Keadaan keadaan_ = DIAM;
  int hilang_ = 0;
};

struct Uji {
  const char *id;
  const char *kebutuhan;
  const char *nama;
  std::vector<Masukan> skenario;
  Keadaan harapan;  // keadaan di tick terakhir
};

int jalankan(int hilangMaks, const std::vector<Uji> &daftar) {
  std::cout << "HILANG_MAKS = " << hilangMaks << "\n";
  int gagal = 0;
  for (const Uji &u : daftar) {
    Robot robot(hilangMaks);
    Keadaan akhir = DIAM;
    for (const Masukan &m : u.skenario) {
      akhir = robot.langkah(m);
    }
    bool lulus = akhir == u.harapan;
    std::cout << "  " << u.id << " untuk " << u.kebutuhan << " (" << u.nama << "): " << NAMA[akhir]
              << (lulus ? " LULUS" : " GAGAL") << "\n";
    if (!lulus) {
      gagal++;
    }
  }
  return gagal;
}

int main() {
  const Masukan M0 = {true, false, true};   // mulai, garis ada
  const Masukan G = {false, false, true};   // garis ada
  const Masukan H = {false, false, false};  // garis hilang
  const Masukan B = {false, true, true};    // tombol berhenti
  std::vector<Uji> daftar = {
      {"U1", "K3", "garis hilang terus", {M0, G, G, H, H, H, H}, AMAN},
      {"U2", "K3", "tombol berhenti", {M0, G, B, G}, AMAN},
      {"U3", "K1", "garis hilang 2 tick lalu kembali", {M0, G, H, H, G, G}, MAJU},
  };
  int gagal3 = jalankan(3, daftar);
  int gagal2 = jalankan(2, daftar);
  std::cout << "uji gagal: " << gagal3 << " (HILANG_MAKS 3), " << gagal2 << " (HILANG_MAKS 2)\n";
}
```

Keluaran program (dijalankan penulis dengan `g++ -std=c++17`):

```text
HILANG_MAKS = 3
  U1 untuk K3 (garis hilang terus): AMAN LULUS
  U2 untuk K3 (tombol berhenti): AMAN LULUS
  U3 untuk K1 (garis hilang 2 tick lalu kembali): MAJU LULUS
HILANG_MAKS = 2
  U1 untuk K3 (garis hilang terus): AMAN LULUS
  U2 untuk K3 (tombol berhenti): AMAN LULUS
  U3 untuk K1 (garis hilang 2 tick lalu kembali): AMAN GAGAL
uji gagal: 0 (HILANG_MAKS 3), 1 (HILANG_MAKS 2)
```

Bacalah dengan jujur. "Perbaikan" untuk K3 melanggar uji U3, yang melindungi K1: robot berhenti sia-sia pada derau dua tick. Tanpa uji itu, perubahan tampak benar. Keputusannya milik kelompok: tetap 3 dan catat jarak melaju buta dalam catatan rilis, atau cari penyaring lain; uji **tidak dihapus** supaya hasil menjadi lunak. Matriks keterlacakan untuk rilis kandidat:

| Kebutuhan | Uji | Hasil |
| --- | --- | --- |
| K1 waktu | U3 (tiruan), lari 2 m (menunggu `C-XII2-M11`) | U3 lulus; lari belum |
| K2 simpangan | lari 10 kali (menunggu `C-XII2-M11`) | belum |
| K3 berhenti | U1, U2 | lulus |
| K4 lama beroperasi | uji 30 menit (menunggu `C-XII2-M11`) | belum |
| K5 tanpa data pribadi | pemeriksaan tabel data | lulus |

## Daftar periksa

Kerjakan berurutan; tiap titik periksa harus dapat ditunjukkan kepada orang lain.

1. `AI: boleh` **Bekukan fitur.** Tulis fitur yang tersisa dan potong yang boleh dipotong. Titik periksa: tidak ada fitur baru setelah ini.
2. `AI: tanpa AI` **Uji regresi.** Tulis satu uji tiruan per kebutuhan yang dapat diuji tanpa papan, dengan id kebutuhannya. Titik periksa: prediksi tertulis sebelum menjalankan.
3. `AI: boleh` **Bau kode.** Temukan tiga bau (nama tidak bermakna, angka ajaib, blok berulang) dan perbaiki satu per satu. Titik periksa: semua uji lulus setelah tiap perbaikan.
4. `AI: tanpa AI` **Satu perubahan, satu uji.** Ubah satu konstanta, jalankan semua uji, catat sebelum dan sesudah. Titik periksa: lembar uji memuat tanggal, prediksi, hasil, dan penguji.
5. `AI: boleh` **Catatan rilis.** Tulis nomor versi, perubahan, dan yang diketahui belum beres. Titik periksa: orang lain dapat mengulang ujimu.
6. *Opsional:* **catatan pemakaian AI.** Bila memakai AI generatif, tulis dulu rancangan sendiri, lalu minta kritik, bukan kode jadi; kode buatan AI dibaca, dijalankan, dan diuji. Catat alatnya, tujuanmu, garis besar perintahmu, bagian yang kamu pakai, dan cara memeriksanya. Jangan menaruh data pribadi atau kata sandi pada perintah.

## Umpan balik sejawat

Tukar rilis kandidat dan matriks keterlacakan dengan kelompok lain. Beri masukan: **satu yang sudah baik**, **satu yang perlu diperbaiki** (sebut butirnya, misalnya "K2 belum punya uji"), dan **satu langkah berikutnya**. Ulasan berpasangan ini praktik yang layak dicoba, bukan jaminan hasil.

## Latihan bercampur

1. Dari `c-xii2-m7`: dengan `HILANG_MAKS` 4, berapa uji di atas yang gagal, dan apa yang tidak tertangkap?
2. Dari `c-xii2-m8`: kapasitas log dinaikkan dari 6 ke 12. Uji regresi apa yang kamu tambahkan?

## Ulang berjarak

Pertanyaan 1 akan muncul lagi di `Ingat kembali` modul `C-XII2-M10` (sekitar satu minggu lagi), dan pertanyaan 2 dan 3 di `C-XII2-M12` (sekitar tiga minggu lagi). Jawab sekarang lalu simpan.

1. Mengapa tiap perubahan penyempurnaan dibuat satu per satu dan diuji ulang?
2. Apa yang dilakukan bila "perbaikan" membuat satu uji gagal?
3. Apa beda rilis kandidat dengan rilis akhir?

## Kesalahan umum

- **Mengubah banyak hal sekaligus.** Uji yang gagal tidak dapat ditunjuk ke satu penyebab.
- **Menghapus atau melonggarkan uji agar lulus.**
- **Menambah fitur setelah pembekuan.**
- **Mengumumkan "tidak ada galat" tanpa daftar yang belum beres.**

## Cek mandiri

- [ ] Tiap kebutuhan yang dapat diuji punya uji yang menunjuknya.
- [ ] Aku mengubah satu hal lalu menjalankan semua uji.
- [ ] Catatan rilisku memuat yang belum beres.
- [ ] Prediksiku ditulis sebelum menjalankan.

## Kunci dan petunjuk

**Ingat kembali.** 1: pengiriman menunggu sampai batas waktu bila server diam, dan selama itu robot tidak membaca garis. 2: tanggal, prediksi, hasil, kondisi (daya, tahap), dan siapa yang menguji. 3: contoh: nama tidak bermakna (beri nama jelas), angka ajaib (konstanta bernama), blok yang diulang (perulangan atau fungsi).

**Rencana sprint.** Prediksi: U3 gagal pada `HILANG_MAKS` 2, karena dua tick hilang sudah cukup membuat robot berhenti padahal garis kembali; keluaran program membenarkannya (1 gagal). Pada 3, ketiganya lulus.

**Daftar periksa.** Rubrik singkat: nomor 1 daftar fitur dan yang dipotong; nomor 2 id kebutuhan pada tiap uji dan prediksi bertanggal; nomor 3 uji lulus setelah tiap perbaikan; nomor 4 satu konstanta berubah dan tercatat sebelum dan sesudah; nomor 5 versi, perubahan, dan yang belum beres; nomor 6 opsional.

**Umpan balik sejawat.** Umpan balik yang baik menyebut butir, bukan kesan umum, dan memberi langkah yang bisa dikerjakan minggu depan.

**Latihan bercampur.** 1: tidak ada yang gagal pada `HILANG_MAKS` 4 (U1 masih mencapai `AMAN` pada tick terakhir); yang tidak tertangkap adalah robot berhenti satu tick lebih lambat. Perbaikannya: tambah batas pada uji, misalnya "AMAN paling lambat tick 5". 2: uji yang mengisi log melebihi 6 catatan dan memeriksa bahwa penghitung tertimpa dan isi tertua benar pada kapasitas baru; juga memeriksa batas memori.

**Ulang berjarak.** 1: supaya uji yang gagal dapat ditunjuk ke satu penyebab. 2: tinjau kebutuhan yang bertentangan secara terbuka dan putuskan sebagai kelompok; jangan menghapus uji. 3: rilis kandidat masih menunggu ulasan dan pengujian akhir, dan berisi daftar yang diketahui belum beres.

## Langkah berikutnya

Modul berikut: `C-XII2-M10` (ulasan sejawat). Bacaan lanjut: istilah "proses rekayasa" pada glosarium Panduan Mata Pelajaran Informatika (tahap pengujian sampai pemeliharaan dan penyempurnaan; lihat Rujukan).
