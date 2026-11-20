## Untuk siapa modul ini

Modul ini untuk murid kelas XII jalur C (IoT dan robotika), minggu `C-XII2-M2` silabus v1.4: pemeliharaan program II. Prasyarat: modul `c-xii2-m1` (pemeliharaan program I). Kamu juga memakai penyangga melingkar dari `c-xi1-m9`.

Modul ini karangan penyusun dan disetujui pemilik program pada 2026-11-20 (keputusan lewat dialog; catatan tinjauan menjadi tindak lanjut revisi). Ia mendukung butir `F-AP-c` (pengembangan, pemeliharaan, dan penyempurnaan algoritma standar ke dalam kode dengan memperhatikan kualitasnya) dan tidak dihitung memenuhi butir capaian pembelajaran mana pun. Keluaran minggu ini: catatan optimasi. Latihan silabusnya: mengurangi pemakaian memori.

Ada dua cara mengerjakan. **Dengan papan:** kamu mencetak `sizeof` langsung di papan lewat Serial untuk melihat ukuran sebenarnya. **Tanpa papan:** kamu memakai ukuran dari komputer, yang dapat berbeda dari papanmu `[belum terverifikasi]`. Keselamatan perangkat: modul ini bekerja di komputer; bila kamu mengunggah ke papan, ikuti aturan daya USB, cabut daya sebelum mengubah rangkaian, dan tanpa solder.

## Ingat kembali

Jawab dari ingatan dulu, baru cek di kunci. Soal 1 dari `c-xii2-m1`, soal 2 dari `c-xii1-m13`, soal 3 dari `c-xii1-m8`.

1. Apa yang dibuktikan uji karakterisasi setelah refaktor, dan apa yang tidak dibuktikannya?
2. Mengapa kriteria selesai ditulis sebelum mengerjakan? Beri satu contoh kriteria yang dapat diuji.
3. Sebut bagian-bagian laporan perbandingan strategi agar orang lain dapat mengulang ujinya.

## Tujuan

Setelah modul ini kamu dapat:

- mengukur pemakaian memori sebelum mengubah program, bukan menebak;
- mengurangi ukuran data dengan mengurutkan anggota struktur dan memilih tipe yang cukup;
- membuktikan bahwa isi data tidak berubah setelah dipadatkan;
- menulis catatan optimasi: masalah, ukuran sebelum dan sesudah, perubahan, ongkos, dan keputusan (keluaran minggu ini).

## Prediksi dulu

Sebuah rekaman sensor memiliki empat anggota, dalam urutan ini: `bool valid`, `uint32_t waktuMs`, `int32_t nilai`, `bool alarm`. Anggap anggota 4 byte harus berada di alamat kelipatan 4, dan seluruh struktur dibulatkan ke kelipatan 4. **Tebak dulu, tulis jawabanmu, baru telusuri.**

1. Berapa byte satu rekaman bila urutannya seperti di atas? Berapa bila anggota diurutkan dari terbesar ke terkecil?
2. Bila rekaman diganti dua `uint16_t` (detik sejak mulai; nilai 12 bit ditambah dua bendera di bit atas), berapa byte untuk 600 rekaman?
3. Apa batas masa rekam bila waktu disimpan sebagai detik dalam `uint16_t`?

## Contoh terselesaikan

Optimasi punya urutan: **ukur, ubah satu hal, ukur lagi, uji bahwa hasilnya tetap benar, catat**. Mengoptimasi tanpa mengukur adalah menebak: kamu bisa menghabiskan waktu pada bagian yang tidak bermasalah. Mulailah dengan alasan: memori hampir penuh, atau kebutuhan proyek (lihat kriteria selesai) menuntutnya. Bila tidak ada alasan terukur, tidak mengoptimasi adalah keputusan yang sah dan program yang lebih mudah dibaca.

Ukuran dibaca dengan `sizeof`, yang menurut dokumentasi Arduino mengembalikan jumlah byte sebuah tipe atau larik (tipe `size_t`). Karena ukuran `int` dan `long` dapat berbeda antar papan, contoh memakai tipe berukuran tetap (`uint16_t`, `uint32_t`). Penjajaran dan penjejalan anggota struktur ditentukan kompiler dan papan, jadi angka komputer ini adalah patokan, bukan janji untuk papanmu.

Ada dua perubahan pada rekaman 600 detik: (A) mengurutkan anggota, yang tidak mengubah isi; (B) memadatkan: detik di `uint16_t`, nilai ADC di 12 bit, dua bendera di bit 12 dan 13. Perubahan B menambah kode pengemasan, jadi isinya diuji pulang-pergi pada seluruh nilai 0 sampai 4095 dan semua kombinasi bendera.

```cpp
// C++17 biasa, jalan di komputer. Diperiksa oleh check:module-code.
// Mengukur memori tiga tata letak rekaman data sensor, lalu membuktikan isinya tidak berubah.
// Ukuran di komputer ini bisa berbeda dari papanmu: di papan, cetak sizeof sendiri.
#include <cstdint>
#include <iostream>

// Versi 1 (asli): urutan sesuka hati.
struct RekamAsli {
  bool valid;
  uint32_t waktuMs;
  int32_t nilai;
  bool alarm;
};

// Perubahan A: urutkan anggota dari yang terbesar ke terkecil (tidak mengubah isi).
struct RekamUrut {
  uint32_t waktuMs;
  int32_t nilai;
  bool valid;
  bool alarm;
};

// Perubahan B: pakai tipe yang cukup. Waktu = detik sejak mulai (maks 65535 s, sekitar 18 jam).
// Nilai ADC 0..4095 muat di 12 bit; dua bendera memakai bit 12 dan 13.
struct RekamPadat {
  uint16_t detik;
  uint16_t paket;
};

const uint16_t MASKER_NILAI = 0x0FFF;
const uint16_t BIT_VALID = 1u << 12;
const uint16_t BIT_ALARM = 1u << 13;

RekamPadat padatkan(uint16_t detik, int nilai, bool valid, bool alarm) {
  RekamPadat r;
  r.detik = detik;
  r.paket = static_cast<uint16_t>(nilai & MASKER_NILAI) | (valid ? BIT_VALID : 0) | (alarm ? BIT_ALARM : 0);
  return r;
}

int nilaiDari(const RekamPadat &r) { return r.paket & MASKER_NILAI; }
bool validDari(const RekamPadat &r) { return (r.paket & BIT_VALID) != 0; }
bool alarmDari(const RekamPadat &r) { return (r.paket & BIT_ALARM) != 0; }

const int BANYAK = 600;  // 10 menit, satu rekaman per detik

int main() {
  std::cout << "tata letak   byte/rekaman  byte untuk " << BANYAK << " rekaman\n";
  std::cout << "asli         " << sizeof(RekamAsli) << "             " << sizeof(RekamAsli) * BANYAK << "\n";
  std::cout << "urut         " << sizeof(RekamUrut) << "             " << sizeof(RekamUrut) * BANYAK << "\n";
  std::cout << "padat        " << sizeof(RekamPadat) << "              " << sizeof(RekamPadat) * BANYAK << "\n";

  // Uji kebenaran: semua nilai ADC 0..4095 x 4 kombinasi bendera harus kembali persis sama.
  int salah = 0;
  int diuji = 0;
  for (int nilai = 0; nilai <= 4095; nilai++) {
    for (int b = 0; b < 4; b++) {
      bool valid = (b & 1) != 0;
      bool alarm = (b & 2) != 0;
      RekamPadat r = padatkan(1234, nilai, valid, alarm);
      diuji++;
      if (nilaiDari(r) != nilai || validDari(r) != valid || alarmDari(r) != alarm || r.detik != 1234) {
        salah++;
      }
    }
  }
  std::cout << "uji pulang-pergi: " << diuji << " kasus, salah: " << salah << "\n";
  // Uji tepi yang SENGAJA melanggar batas: nilai 4096 tidak muat di 12 bit.
  RekamPadat luar = padatkan(0, 4096, true, false);
  std::cout << "nilai 4096 kembali sebagai: " << nilaiDari(luar) << "\n";
}
```

Keluaran program (dijalankan penulis dengan `g++ -std=c++17`):

```text
tata letak   byte/rekaman  byte untuk 600 rekaman
asli         16             9600
urut         12             7200
padat        4              2400
uji pulang-pergi: 16384 kasus, salah: 0
nilai 4096 kembali sebagai: 0
```

Bacalah dengan jujur. Hanya dengan mengurutkan anggota, 25 persen memori hilang (16 ke 12 byte) tanpa perubahan lain, dan itu murah dan aman. Pemadatan menghemat 75 persen (16 ke 4 byte), tetapi ongkosnya jelas: kode pengemasan tambahan, masa rekam dibatasi 65535 detik (sekitar 18 jam), dan nilai di luar 0 sampai 4095 diam-diam rusak: 4096 kembali sebagai 0 tanpa peringatan. Itu perilaku yang harus dicatat atau dicegah, bukan disembunyikan.

Di papan, cetak ukuran sebenarnya dengan sketsa berikut. Ia hanya diperiksa sintaksnya terhadap header tiruan, tidak dijalankan di papan.

```arduino
// Arduino-C++ untuk ESP32. Diperiksa check:module-code terhadap header tiruan (sintaks dan tipe saja, bukan bukti perilaku papan).
// Mencetak ukuran sebenarnya DI PAPAN; jangan percaya angka komputer untuk papanmu.
#include <stdint.h>

struct RekamUrut {
  uint32_t waktuMs;
  int32_t nilai;
  bool valid;
  bool alarm;
};

struct RekamPadat {
  uint16_t detik;
  uint16_t paket;
};

void setup() {
  Serial.begin(115200);
  Serial.print("RekamUrut = ");
  Serial.println(sizeof(RekamUrut));
  Serial.print("RekamPadat = ");
  Serial.println(sizeof(RekamPadat));
}

void loop() {}
```

Catatan optimasi mengikuti bentuk berikut (isian karangan dari contoh di atas):

```text
Masalah dan alasan: penyangga 600 rekaman memakai 9600 byte; kriteria K6: muat dengan sisa memori.
Ukuran sebelum: 16 byte per rekaman, 9600 byte.
Perubahan (satu per satu): A urutkan anggota; B padatkan menjadi 4 byte.
Ukuran sesudah: A 7200 byte; B 2400 byte.
Uji kebenaran: pulang-pergi 16384 kasus, salah 0; nilai di luar 0..4095 belum ditangani.
Ongkos: kode pengemasan, masa rekam maksimum 18 jam, kode lebih sulit dibaca.
Keputusan: pakai A; pakai B hanya bila memori benar-benar kurang.
```

## Contoh setengah jadi

Lengkapi `____` pada fungsi pengemasan nilai 12 bit dan bendera `valid` di bit 12.

```cpp setengah-jadi
// C++17. Lengkapi bagian ____.
const uint16_t MASKER_NILAI = 0x0FFF;
const uint16_t BIT_VALID = 1u << ____;
uint16_t paket(int nilai, bool valid) {
  return static_cast<uint16_t>(nilai & ____) | (valid ? ____ : 0);
}
int nilaiDari(uint16_t p) { return p & ____; }
```

## Soal Parsons

Susun baris-baris di bawah (sudah diacak; kurung kurawal penutup tidak ditulis) menjadi inti uji pulang-pergi.

```text
(a)       RekamPadat r = padatkan(1234, nilai, valid, alarm);
(b)   for (int nilai = 0; nilai <= 4095; nilai++) {
(c)     for (int b = 0; b < 4; b++) {
(d)       bool valid = (b & 1) != 0;
(e)       if (nilaiDari(r) != nilai || validDari(r) != valid) { salah++; }
```

## Latihan

1. `AI: tanpa AI` **Hitung.** Struktur `{uint8_t a; uint32_t b; uint8_t c; uint16_t d;}` dengan aturan penjajaran seperti pada Prediksi dulu: berapa byte? Berapa bila diurutkan `b, d, a, c`?
2. `AI: boleh` **Optimasi proyekmu.** Pilih satu struktur data atau larik dari proyekmu. Cetak ukurannya, ubah satu hal, cetak lagi, uji bahwa isinya sama, dan tulis catatan optimasi.
3. `AI: tanpa AI` **Perlukah?** Papan punya memori bebas jauh lebih besar dari 9600 byte (angka papanmu: periksa). Haruskah kamu memadatkan? Beri dua pertimbangan.
4. `AI: boleh` **Lindungi batas.** `padatkan(0, 4096, ...)` memberi nilai 0 diam-diam. Ubah `padatkan` agar nilai di luar 0 sampai 4095 menandai rekaman tidak valid, lalu perluas uji pulang-pergi dengan nilai -1 dan 4096.
5. *Opsional:* **catatan pemakaian AI.** Bila memakai AI generatif, kerjakan nomor 3 sendiri dulu, lalu minta kritik atas jawabanmu, bukan jawaban jadi. Catat alatnya, tujuanmu, garis besar perintahmu, bagian yang kamu pakai, dan cara memeriksanya. Kode buatan AI dibaca, dijalankan, dan diuji. Jangan menaruh data pribadi pada perintah.

## Latihan bercampur

1. Dari `c-xii2-m1`: sebelum memadatkan struktur, uji apa yang kamu tulis lebih dulu supaya tahu perilakunya tidak berubah?
2. Dari `c-xi1-m9`: penyangga melingkar menimpa data tertua. Berapa byte untuk 120 `RekamPadat`, dan apa yang hilang dibanding 600 rekaman?

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `C-XII2-M3` (sekitar satu minggu lagi), `C-XII2-M5` (sekitar tiga minggu lagi), dan `C-XII2-M10` (sekitar delapan minggu lagi). Jawab sekarang lalu simpan.

1. Mengapa kamu mengukur memori sebelum mengubah program?
2. Bagian apa saja pada catatan optimasi yang membuat orang lain dapat menilai keputusanmu?
3. Sebut dua ongkos memadatkan data, dan mengapa lebih kecil tidak selalu lebih baik.

## Kesalahan umum

- **Mengoptimasi tanpa mengukur.** Kamu mungkin mengubah bagian yang tidak bermasalah.
- **Mengubah banyak hal sekaligus.** Kamu tidak tahu perubahan mana yang menghemat atau merusak.
- **Tidak menguji bahwa isi tetap sama.** Pemadatan bisa memotong nilai tanpa tanda.
- **Mengira `sizeof` memberi jumlah elemen.** Ia memberi byte; bagi dengan ukuran satu elemen untuk jumlah elemen.
- **Mengira ukuran tipe sama di semua papan.** Cetak sendiri di papanmu, atau pakai tipe berukuran tetap.
- **Mengorbankan keterbacaan tanpa alasan.** Kode yang hemat tetapi tak dapat dirawat melanggar tujuan pemeliharaan.

## Cek mandiri

- [ ] Saya mengukur ukuran sebelum dan sesudah tiap perubahan.
- [ ] Saya mengubah satu hal pada satu waktu.
- [ ] Saya menguji bahwa isi data tidak berubah.
- [ ] Catatan optimasi saya memuat alasan, ongkos, dan keputusan.
- [ ] Saya tahu kapan tidak mengoptimasi adalah pilihan yang tepat.

## Kunci dan petunjuk

**Ingat kembali.** 1: ia membuktikan perilaku sama pada kasus yang diuji; ia tidak membuktikan program benar. 2: supaya kriteria tidak disesuaikan dengan hasil dan dapat gagal; contoh: "10 lari berturut-turut tanpa melampaui 25 mm". 3: tujuan dan batas, kondisi uji, tabel hasil, keputusan dengan alasan, dan batasan.

**Prediksi dulu.** 1: urutan asli: `valid` 1 byte lalu 3 byte pengisi, `waktuMs` 4, `nilai` 4, `alarm` 1 lalu 3 byte pengisi: 16 byte; diurutkan: 4 + 4 + 1 + 1 = 10, dibulatkan ke kelipatan 4 menjadi 12 byte. 2: 4 byte x 600 = 2400 byte. 3: 65535 detik, sekitar 18,2 jam; setelah itu hitungan melingkar ke 0.

**Contoh setengah jadi.** Isian berurutan: `12`, `MASKER_NILAI`, `BIT_VALID`, `MASKER_NILAI`. Kunci dikompilasi dan dijalankan penulis: `paket(2500, true)` kembali sebagai nilai 2500 dengan bendera valid menyala.

**Soal Parsons.** Urutan benar: b, c, d, a, e (`d` harus sebelum `a` karena `a` memakai `valid`; baris `alarm` tidak ditulis). Dua perulangan menjelajahi semua nilai dan semua kombinasi bendera.

**Latihan.** 1: asli: `a` 1 byte + 3 pengisi, `b` 4, `c` 1 + 1 pengisi, `d` 2: 12 byte; diurutkan `b, d, a, c`: 4 + 2 + 1 + 1 = 8 byte (dikompilasi dan dijalankan penulis: 12 dan 8). 2: tidak ada kunci tunggal; catatan yang baik memuat ukuran sebelum dan sesudah dari alat ukur, bukan perkiraan, dan uji isi sama. 3: tidak perlu bila tidak ada kebutuhan terukur; pemadatan menambah kode pengemasan, membatasi rentang (18 jam), dan mengurangi keterbacaan, jadi ongkosnya harus diimbangi manfaat. 4: contoh: `if (nilai < 0 || nilai > 4095) { valid = false; nilai = 0; }` di awal `padatkan`; uji -1 dan 4096 harus menghasilkan bendera valid padam.

**Latihan bercampur.** 1: uji karakterisasi: jalankan versi lama pada banyak masukan termasuk nilai tepat di batas, dan simpan keluarannya sebagai patokan. 2: 4 byte x 120 = 480 byte; yang hilang adalah rekaman lama: hanya 2 menit terakhir yang tersimpan, bukan 10 menit.

**Ulang berjarak.** 1: tanpa ukuran kamu tidak tahu bagian mana yang bermasalah dan tidak bisa menunjukkan bahwa perubahan membantu. 2: alasan dan masalah, ukuran sebelum, perubahan, ukuran sesudah, uji kebenaran, ongkos, dan keputusan. 3: contoh: kode pengemasan tambahan yang sulit dibaca, rentang yang dibatasi (18 jam), dan kemungkinan nilai di luar batas rusak diam-diam; lebih kecil tidak berguna bila program menjadi lebih sulit dirawat atau salah.

## Langkah berikutnya

Modul berikut: `C-XII2-M3` (memodelkan masalah lapangan). Bacaan lanjut: `sizeof` dan `const` pada referensi Arduino (lihat Rujukan).
