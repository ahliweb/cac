## Untuk siapa modul ini

Modul ini untuk murid kelas XI jalur E (komputasi kuantum), minggu `E-XI1-M13` silabus v1.4: proyek mini semester 1. Prasyarat: modul `e-xi1-m12` dan seluruh materi semester ini, `e-xi1-m1` sampai `e-xi1-m12`. Alat: kertas, Quirk (peramban, tanpa akun), dan simulatormu dari `e-xi1-m10` dan `e-xi1-m11` (C++ untuk jalur A atau TypeScript dengan Bun untuk jalur B). Murid tanpa dasar pemrograman dapat mengerjakan versi tangan: sirkuit, prediksi, dan hitungan peluang tanpa simulator, ditambah pengamatan di Quirk.

Modul ini karangan penyusun dan disetujui pemilik program pada 2026-11-20 (keputusan lewat dialog; catatan tinjauan menjadi tindak lanjut revisi). Jalur E adalah pengayaan di luar rumusan capaian pembelajaran (CP); minggu ini tidak punya irisan pengayaan, jadi modul ini tidak dihitung memenuhi butir CP mana pun.

Aturan AI jalur ini: AI generatif boleh dipakai dengan etika dan dicatat, tanpa data pribadi, kata sandi, atau tugas bernilai pada permintaanmu, dan tanpa akun wajib. Proyek ini mensyaratkan **log pemakaian AI** (alat, tujuan, garis besar perintah, bagian yang dipakai, cara memeriksa). Seluruh data proyek adalah bit hasil simulasi; tanpa data pribadi, nama nyata, atau foto.

Catatan untuk guru: program contoh dijalankan penyusun (`g++ -std=c++17 -Wall -Wextra`). Pembangkit semu yang dipakai deterministik dan tidak aman; bit proyek ini tidak boleh dipakai untuk kata sandi, kunci, atau keputusan nyata. Bahwa qubit nyata tidak dapat disalin atau dibaca seluruh amplitudonya penyusun tulis dari pengetahuan umum, tidak dicari di dokumentasi IBM yang dibuka `[belum terverifikasi]`.

## Ingat kembali

Jawab dari ingatan, baru cek di bagian kunci.

1. Mengapa `(0,6 ; -0,8)` sah walaupun ada tanda minus? (dari `e-xi1-m5`)
2. Bagaimana memeriksa bahwa keadaan hasil simulasi masih sah, dan mengapa tidak memakai `==`? (dari `e-xi1-m10`)
3. Tulis `|01>` dan `|10>` sebagai vektor empat komponen, dengan urutan dasar yang dipakai. (dari `e-xi1-m12`)

## Tujuan

Setelah modul ini kamu dapat:

- menyusun satu sirkuit satu qubit yang menjadi pembangkit bit simulasi dan menuliskan prediksi peluangnya;
- menjalankannya di simulatormu atau menghitungnya dengan tangan, dan menguji frekuensi bit terhadap prediksi;
- menjelaskan mengapa lolos uji frekuensi belum berarti keacakan sejati;
- menyajikan hasil sebagai laporan dan sirkuit yang bisa dibuka orang lain di Quirk.

Keluaran yang diminta silabus: laporan dan sirkuit.

## Rencana proyek

Sebelum menjalankan apa pun, tulis rencana satu halaman: tujuan, sirkuit pilihanmu, prediksi hasil, kriteria selesai, dan batas klaim. Catatan silabus untuk proyek ini: yang dibuat adalah simulasi, bukan keacakan sejati.

Contoh rencana terselesaikan untuk **pembangkit bit dari sirkuit H**:

| Bagian | Isi contoh |
| --- | --- |
| Tujuan | Membangkitkan 10000 bit dari sirkuit H, lalu menguji apakah frekuensinya mendekati 0,5. |
| Sirkuit | `\|0>`, H, baca (di Quirk, tampilan `Chance` kabel pertama 50.0%). |
| Prediksi | Bit 1 kira-kira 5000 dengan simpangan wajar 50. Dari 5000 pasangan bit berurutan, tiap pasangan `00`, `01`, `10`, `11` kira-kira 1250 dengan simpangan wajar 30,6. |
| Kriteria selesai | Jumlah bit 1 dalam tiga simpangan; tiap pasangan dalam tiga simpangan; laporan menyebut batas klaim. |
| Batas klaim | Bit berasal dari pembangkit semu dengan benih tetap; bukan keacakan sejati dan bukan untuk keamanan. |

Penyusun melihat `Chance` 50.0% pada [tautan sirkuit H](https://algassert.com/quirk#circuit=%7B%22cols%22:%5B%5B%22H%22%5D%5D%7D). Program contoh membangun H pada `|0>`, membangkitkan 10000 bit lewat `ukur`, menghitung bit 1 dan pasangan bit, lalu mengulang untuk sirkuit putar 60 derajat sebagai pembanding.

```cpp
#include <cmath>
#include <cstdint>
#include <iomanip>
#include <iostream>
#include <string>
#include <vector>

using Vektor = std::vector<double>;
using Matriks = std::vector<Vektor>;

Vektor terapkan(const Matriks& gerbang, const Vektor& keadaan) {
    Vektor hasil(keadaan.size(), 0.0);
    for (size_t baris = 0; baris < gerbang.size(); baris++) {
        for (size_t kolom = 0; kolom < keadaan.size(); kolom++) {
            hasil[baris] += gerbang[baris][kolom] * keadaan[kolom];
        }
    }
    return hasil;
}

uint32_t benih = 12345;

double acak01() {
    benih = 1664525u * benih + 1013904223u;
    return benih / 4294967296.0;
}

int ukur(const Vektor& keadaan) {
    return acak01() < keadaan[0] * keadaan[0] ? 0 : 1;
}

// Uji frekuensi: apakah jumlah bit 1 wajar bila peluang adilnya 0,5?
void uji(const std::string& label, const Vektor& keadaan, int n) {
    std::vector<int> bit;
    for (int i = 0; i < n; i++) bit.push_back(ukur(keadaan));

    int satu = 0;
    for (int b : bit) satu += b;
    double simpangan = std::sqrt(n * 0.5 * 0.5);
    std::cout << label << ": " << n << " bit, bit 1 = " << satu << " (harapan " << n / 2
              << ", " << (satu - n / 2.0) / simpangan << " simpangan)\n";

    int pasangan[4] = {0, 0, 0, 0};  // 00, 01, 10, 11 pada pasangan tak bertumpuk
    for (int i = 0; i + 1 < n; i += 2) pasangan[bit[i] * 2 + bit[i + 1]]++;
    std::cout << "  pasangan 00,01,10,11 = " << pasangan[0] << ", " << pasangan[1] << ", "
              << pasangan[2] << ", " << pasangan[3] << " (harapan " << n / 8 << " tiap pasangan)\n";
}

int main() {
    std::cout << std::fixed << std::setprecision(2);
    const double h = 1.0 / std::sqrt(2.0);
    const Matriks H = {{h, h}, {h, -h}};
    const double sudut = std::acos(-1.0) / 3;  // 60 derajat
    const Matriks putar = {{std::cos(sudut), -std::sin(sudut)}, {std::sin(sudut), std::cos(sudut)}};

    uji("sirkuit H", terapkan(H, {1, 0}), 10000);
    uji("sirkuit putar 60 derajat", terapkan(putar, {1, 0}), 10000);
    return 0;
}
```

Keluaran asli (dijalankan penyusun):

```text
sirkuit H: 10000 bit, bit 1 = 5053 (harapan 5000, 1.06 simpangan)
  pasangan 00,01,10,11 = 1198, 1278, 1273, 1251 (harapan 1250 tiap pasangan)
sirkuit putar 60 derajat: 10000 bit, bit 1 = 7488 (harapan 5000, 49.76 simpangan)
  pasangan 00,01,10,11 = 299, 968, 946, 2787 (harapan 1250 tiap pasangan)
```

Bacaan hasilnya: untuk sirkuit H, bit 1 berjumlah 5053, selisih 53 dari 5000, kira-kira 1,06 simpangan; pasangan 1198, 1278, 1273, 1251 semuanya dalam dua simpangan dari 1250. Lolos. Sirkuit putar 60 derajat memberi 7488 bit 1, hampir 50 simpangan dari 5000: gagal, sesuai peluang 0,75 (`e-xi1-m10`). Uji yang sama menolak sirkuit yang tidak adil.

## Daftar periksa

1. Tulis rencana (tujuan, sirkuit, prediksi, kriteria selesai, batas klaim).
2. Hitung peluang sirkuitmu dengan tangan dan bandingkan dengan `Chance` di Quirk (satu sirkuit satu qubit, tanpa gerbang pembacaan di tengah).
3. Jalankan simulatormu dengan benih tetap dan catat jumlah bit 1 dan hitungan pasangan.
4. Ubah benih dan jalankan lagi; hasilnya berubah tetapi tetap di sekitar prediksi.
5. Bandingkan tiap hitungan dengan prediksi dalam simpangan wajar; tulis apakah lolos.
6. Uji satu sirkuit pembanding yang kamu perkirakan gagal (misalnya H, Z, H yang selalu memberi 1) dan tunjukkan bahwa ujimu menolaknya.
7. Periksa privasi dan keselamatan: tanpa data pribadi di laporan; pembangkit hanya untuk simulasi, bukan keamanan.
8. Isi log pemakaian AI bila memakai AI, lalu tulis laporan satu sampai dua halaman dengan tautan sirkuit Quirk.

## Umpan balik sejawat

Tukar laporan dengan teman (berpasangan atau berkelompok). Beri tiga hal: **satu yang sudah baik**, **satu yang perlu diperbaiki**, dan **satu langkah berikutnya**. Periksa bahwa prediksi ditulis sebelum hasil, bahwa batas klaim jujur, dan bahwa tautan Quirk membuka sirkuit yang sama dengan yang dilaporkan. 

## Latihan bercampur

1. Keadaan `(0,6 ; 0,8)` diberi H. Hitung peluang kedua hasil dan harapan hasil 0 dari 10000 bit. (`e-xi1-m8`, `e-xi1-m6`)
2. Hitung H, X, H pada `|0>` dan tulis bit yang akan dihasilkannya bila dibaca berulang. (`e-xi1-m9`)
3. Dari 1000 shot sebuah pembangkit memberi 540 bit 1. Hitung selisih dari harapan 500 dalam simpangan wajar, dan putuskan lolos atau tidak. (`e-xi1-m11`)

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `e-xi1-m14` (satu minggu lagi), `e-xi2-m2` (sekitar tiga minggu lagi), dan `e-xi2-m7` (sekitar delapan minggu lagi). Jawab sekarang lalu simpan.

1. Mengapa uji frekuensi yang lolos belum membuktikan bahwa bit-bit itu acak sejati?
2. Bila hasil simulasi menyimpang dari prediksi, apa dua penyebab yang kamu periksa lebih dulu?
3. Apa yang dapat dilakukan simulator pada vektor keadaan yang tidak dapat dilakukan pada qubit nyata?

## Kesalahan umum

- **"Frekuensi mendekati 0,5, jadi bit-bitnya acak sejati."** Pembangkit semu dengan benih tetap menghasilkan deretan yang bisa diulang dan ditebak; uji frekuensi hanya satu sifat.
- **"Simulasi ini membuktikan perilaku komputer kuantum nyata."** Ia hanya menghitung model yang kamu tuliskan.
- **"Bit dari proyek ini cocok untuk kata sandi."** Tidak: pembangkitnya dapat ditebak.

## Cek mandiri

- [ ] Saya menulis rencana dan prediksi sebelum menjalankan.
- [ ] Saya menghitung peluang sirkuitku dengan tangan dan memeriksanya di Quirk.
- [ ] Saya menguji frekuensi dalam satuan simpangan wajar.
- [ ] Saya menuliskan batas klaim: simulasi, bukan keacakan sejati.
- [ ] Saya memberi dan menerima umpan balik sejawat.
- [ ] Saya mencatat pemakaian AI bila saya memakainya.

## Kunci dan petunjuk

**Ingat kembali.** 1: tanda minus hanya membalik arah amplitudo; sah dipersyaratkan oleh jumlah kuadrat `0,36 + 0,64 = 1`, dan kuadrat membuang tanda. 2: hitung jumlah kuadrat amplitudo dan bandingkan dengan 1 dengan toleransi kecil; galat pembulatan membuat `==` tidak andal. 3: `|01> = (0, 1, 0, 0)` dan `|10> = (0, 0, 1, 0)` dengan urutan `00, 01, 10, 11`.

**Rencana proyek.** Contoh rencana ada di bagian itu. Periksa rencanamu: ada prediksi bilangan sebelum menjalankan, ada kriteria selesai yang dapat diperiksa, dan ada batas klaim.

**Daftar periksa.** Titik periksa: langkah 2 harus cocok dengan `Chance`; langkah 4 menunjukkan bahwa benih mengubah hitungan; langkah 6: H, Z, H memberi 10000 bit 1 dan ditolak (simpangan sangat besar dari 5000).

**Umpan balik sejawat.** Tidak ada jawaban tunggal; ukuran mutunya adalah umpan balik yang spesifik dan dapat dikerjakan.

**Latihan bercampur.** 1: `(0,9899 ; -0,1414)`, P(0) = 0,98 dan P(1) = 0,02; harapan 9800 hasil 0 dari 10000. 2: H memberi `(h, h)`, X memberi `(h, h)`, H memberi `(1, 0)`; bit yang dihasilkan selalu 0. 3: simpangan 15,8; selisih 40 kira-kira 2,5 simpangan; jarang (mendekati batas tiga simpangan), jadi curigai tetapi belum tentu gagal; ulangi dengan benih lain dan lebih banyak bit.

**Ulang berjarak.** 1: lolos uji frekuensi hanya satu sifat; pembangkit semu dengan benih tetap menghasilkan deretan yang dapat diulang dan ditebak. 2: kemungkinan kesalahan kode (urutan gerbang, peluang yang salah hitung) atau fluktuasi acak biasa dalam simpangan wajar; periksa dengan benih lain dan lebih banyak shot. 3: menyalin vektor keadaan dan membaca seluruh amplitudo kapan saja; pada qubit nyata hanya hasil pembacaan yang diperoleh (`[belum terverifikasi]`, lihat catatan guru).

## Langkah berikutnya

Modul berikut: `e-xi1-m14` (asesmen dan refleksi semester 1). Bacaan pendamping: `e-xi1-m11` (shot dan simpangan wajar).
