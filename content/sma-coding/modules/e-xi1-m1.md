## Untuk siapa modul ini

Modul ini untuk murid kelas XI jalur E (komputasi kuantum), minggu `E-XI1-M1` silabus v1.4: mengapa komputasi kuantum, bit klasik dan acak. Ini modul pembuka jalur, jadi tidak ada prasyarat modul jalur E; cukup ingat bit dan bilangan biner dari `matkom-sistem-bilangan-basis` dan `FND-X1-M3`. Alat: peramban untuk Quirk (simulator visual di halaman web, tanpa akun). Contoh C++ opsional untuk murid yang sudah belajar C++ (jalur A).

Modul ini karangan penyusun dan disetujui pemilik program pada 2026-11-20 (keputusan lewat dialog; catatan tinjauan menjadi tindak lanjut revisi). Jalur E adalah pengayaan di luar rumusan capaian pembelajaran (CP); minggu ini tidak punya irisan pengayaan, jadi modul ini tidak dihitung memenuhi butir CP mana pun.

Aturan AI jalur ini: AI generatif boleh dipakai dengan etika dan dicatat, tanpa data pribadi, kata sandi, atau tugas bernilai pada permintaanmu, dan tanpa akun wajib. Saran: jawab dulu sendiri, baru minta penjelasan atau petunjuk bertahap. Setiap soal `Latihan` bertanda `AI: boleh` atau `AI: tanpa AI`.

Catatan untuk guru: tautan Quirk (versi 2.3, per 2026-11-19) dibuka penyusun lewat peramban tanpa antarmuka. Tidak ada akun, Qiskit, atau cloud quantum minggu ini.

## Ingat kembali

Pertanyaan diambil dari seri matematika komputasi. Jawab dari ingatan, baru cek di bagian kunci.

1. Berapa pola berbeda yang bisa disimpan 3 bit, dan mengapa? (dari `matkom-sistem-bilangan-basis`)
2. Berapa nilai `NOT (p AND q)` bila `p` = 1 dan `q` = 0? (dari `matkom-logika-proposisi`)
3. Bolehkah sebuah fungsi memberi dua keluaran berbeda untuk satu masukan yang sama? (dari `matkom-himpunan-relasi-fungsi`)

## Tujuan

Setelah modul ini kamu dapat:

- membedakan bit klasik, bit acak klasik, dan qubit secara garis besar;
- menjelaskan mengapa kalimat "komputer kuantum mencoba semua jawaban sekaligus" menyesatkan, dan menyebut satu hal yang dijanjikan dan satu yang bukan;
- membuka Quirk dan membaca tampilan peluangnya (`Chance`);
- menjelaskan dengan angka mengapa H dua kali berbeda dari pengacak klasik dua kali.

## Prediksi dulu

Dua mesin, keduanya mulai dari 0. Mesin klasik: sebuah "pengacak" mengubah bit menjadi 0 atau 1 dengan peluang sama, apa pun masukannya. Mesin kuantum di Quirk: gerbang H (dipelajari di `E-XI1-M8`) menaruh qubit pada keadaan yang saat dibaca memberi 0 atau 1 dengan peluang sama. Sebelum membaca contoh, tebak dan tulis: (1) setelah pengacak dipakai dua kali, berapa peluang bit terbaca 0? (2) setelah H dipakai dua kali, berapa peluang qubit terbaca 0? Beri satu kalimat alasan.

## Contoh terselesaikan

**Bit klasik dan bit acak klasik.** Bit biasa selalu bernilai 0 atau 1. Bila kita tidak tahu nilainya, kita mencatat peluangnya, misalnya `(p0, p1)` = (0,5 ; 0,5), dengan dua syarat: peluang tidak negatif dan jumlahnya 1. Pengacak mengubah `(p0, p1)` apa pun menjadi (0,5 ; 0,5), jadi dari `(1, 0)` kita mendapat `(0,5 ; 0,5)`, dan pengacak kedua juga memberi `(0,5 ; 0,5)`. Pengacak tidak bisa mengembalikan bit ke 0.

**Qubit.** Qubit dicatat dengan sepasang bilangan `(a0, a1)` yang disebut amplitudo; peluang membacanya sebagai 0 atau 1 adalah kuadrat amplitudo (alasannya di `E-XI1-M6`). Keadaan awal `(1, 0)`. Gerbang H mengubah `(a0, a1)` menjadi `((a0 + a1)/akar2, (a0 - a1)/akar2)`. Setelah H pertama: `(0,7071 ; 0,7071)`, peluang 0,5 dan 0,5, sama dengan pengacak. Setelah H kedua: `a0 = (0,7071 + 0,7071)/1,4142 = 1` dan `a1 = (0,7071 - 0,7071)/1,4142 = 0`, jadi peluang 0 adalah 1. Pada langkah kedua, dua suku di `a1` saling menghapus karena salah satunya diberi tanda minus. Itulah **interferensi**: amplitudo boleh negatif dan bisa saling menghapus, sedangkan peluang klasik tidak pernah negatif sehingga tidak bisa saling menghapus.

Program berikut menghitung keduanya dan juga melempar 1000 koin klasik (pembangkit acak dengan benih tetap, jadi hasilnya selalu sama).

```cpp
#include <cmath>
#include <iomanip>
#include <iostream>
#include <random>

int main() {
    std::cout << std::fixed << std::setprecision(4);

    std::mt19937 rng(7);
    int kepala = 0;
    for (int i = 0; i < 1000; i++) {
        if (rng() % 2 == 0) kepala++;
    }
    std::cout << "koin klasik: " << kepala << " kepala dari 1000\n";

    // Pengacak klasik pada peluang (p0, p1): apa pun masukannya, keluarannya 50:50.
    double p0 = 1.0, p1 = 0.0;
    for (int langkah = 1; langkah <= 2; langkah++) {
        double baru0 = 0.5 * p0 + 0.5 * p1;
        double baru1 = 0.5 * p0 + 0.5 * p1;
        p0 = baru0;
        p1 = baru1;
        std::cout << "klasik, pengacak ke-" << langkah << ": P(0)=" << p0 << " P(1)=" << p1 << "\n";
    }

    // Gerbang H pada amplitudo (a0, a1): a0' = (a0 + a1)/akar2, a1' = (a0 - a1)/akar2.
    double a0 = 1.0, a1 = 0.0;
    const double akar2 = std::sqrt(2.0);
    for (int langkah = 1; langkah <= 2; langkah++) {
        double baru0 = (a0 + a1) / akar2;
        double baru1 = (a0 - a1) / akar2;
        a0 = baru0;
        a1 = baru1;
        std::cout << "kuantum, H ke-" << langkah << ": amplitudo (" << a0 << ", " << a1
                  << ") P(0)=" << a0 * a0 << " P(1)=" << a1 * a1 << "\n";
    }
    return 0;
}
```

Keluaran asli (dijalankan penyusun dengan `g++ -std=c++17 -Wall -Wextra`):

```text
koin klasik: 505 kepala dari 1000
klasik, pengacak ke-1: P(0)=0.5000 P(1)=0.5000
klasik, pengacak ke-2: P(0)=0.5000 P(1)=0.5000
kuantum, H ke-1: amplitudo (0.7071, 0.7071) P(0)=0.5000 P(1)=0.5000
kuantum, H ke-2: amplitudo (1.0000, 0.0000) P(0)=1.0000 P(1)=0.0000
```

**Quirk.** Buka [tautan sirkuit satu H](https://algassert.com/quirk#circuit=%7B%22cols%22:%5B%5B%22H%22%5D,%5B%22Chance%22%5D%5D%7D): penyusun melihat satu gerbang H dan tampilan `Chance` 50.0%. Pada [tautan dua H](https://algassert.com/quirk#circuit=%7B%22cols%22:%5B%5B%22H%22%5D,%5B%22H%22%5D,%5B%22Chance%22%5D%5D%7D) tampilan `Chance` berubah menjadi "Off" (nol persen), sesuai hitungan tangan. Bila tautan tidak membuka sirkuit, seret H dan `Chance` dari kotak alat. Yang tampil adalah peluang hasil hitungan, bukan sampel acak.

**Apa yang dijanjikan dan apa yang bukan.** Komputasi kuantum menjanjikan algoritma khusus yang untuk masalah tertentu memerlukan langkah lebih sedikit daripada cara klasik yang diketahui; contohnya kamu lihat di semester XII. Yang bukan janjinya: semua program menjadi lebih cepat, atau komputer kuantum "mencoba semua jawaban sekaligus lalu langsung membaca yang benar". Gambaran garis besar yang lebih tepat: keadaan kuantum menyimpan amplitudo untuk banyak hasil, tetapi saat dibaca hanya satu hasil acak keluar; algoritma yang baik mengatur interferensi supaya amplitudo hasil yang benar membesar dan yang salah saling menghapus. Klaim tentang perangkat kuantum nyata cepat berubah; modul ini tidak membuatnya.

## Contoh setengah jadi

Lengkapi dengan angka (kunci di bagian akhir).

1. Mulai dari `(1, 0)`. Setelah H: `a0 = (1 + 0)/akar2 = ____` dan `a1 = (1 - 0)/akar2 = ____` (empat desimal).
2. Setelah H kedua dari `(0,7071 ; 0,7071)`: `a0 = ____` dan `a1 = ____`. Peluang membaca 0 adalah ____ dan membaca 1 adalah ____.
3. Mengapa pengacak klasik tidak bisa kembali ke `(1, 0)`, sedangkan H dua kali bisa? ____

## Soal susun urutan

Ini baris-baris perulangan yang menerapkan H dua kali pada program di atas, sudah diacak. Susun menjadi perulangan yang benar. Perhatikan: kedua nilai baru harus dihitung sebelum salah satu nilai lama diganti.

```text
(a) a0 = baru0;
(b) double baru0 = (a0 + a1) / akar2;
(c) a1 = baru1;
(d) for (int langkah = 1; langkah <= 2; langkah++) {
(e) double baru1 = (a0 - a1) / akar2;
(f) }
```

## Latihan

1. **Pengacak berulang.** (`AI: tanpa AI`) Mulai dari `(1, 0)`, pakai pengacak klasik tiga kali. Tulis peluang 0 setelah tiap langkah.
2. **Tiga H.** (`AI: boleh`) Tebak `Chance` bila H dipakai tiga kali, lalu coba di [tautan tiga H](https://algassert.com/quirk#circuit=%7B%22cols%22:%5B%5B%22H%22%5D,%5B%22H%22%5D,%5B%22H%22%5D,%5B%22Chance%22%5D%5D%7D) dan jelaskan dengan hitungan tangan.
3. **Fakta atau mitos.** (`AI: tanpa AI`) Untuk tiap klaim tulis fakta atau mitos dan satu alasan: (a) komputer kuantum mencoba semua jawaban sekaligus dan langsung membaca yang benar; (b) membaca satu qubit sekali memberi 0 atau 1; (c) H dua kali pada `(1, 0)` mengembalikannya ke `(1, 0)`; (d) komputer kuantum membuat semua program lebih cepat. Ini bahan catatan "fakta dan mitos" minggu ini.
4. **Catatan pemakaian AI (opsional).** Bila memakai asisten AI, catat alat, tujuan, garis besar perintah, bagian yang dipakai, dan cara memeriksa jawabannya.

## Latihan bercampur

1. Tiga bit klasik diacak semuanya. Berapa peluang tiap pola 3 bit dan berapa jumlah seluruh peluang? (`matkom-sistem-bilangan-basis`)
2. Gerbang NOT klasik membalik bit. Mengapa dua kali NOT mengembalikan bit, tetapi dua kali pengacak tidak? (`matkom-logika-proposisi`)

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `e-xi1-m2` (satu minggu lagi), `e-xi1-m4` (sekitar tiga minggu lagi), dan `e-xi1-m9` (sekitar delapan minggu lagi). Jawab sekarang lalu simpan.

1. Sebutkan satu hal yang dijanjikan komputasi kuantum dan satu hal yang bukan.
2. Mengapa kalimat "komputer kuantum mencoba semua jawaban sekaligus lalu memilih yang benar" menyesatkan?
3. Pengacak klasik dua kali dan H dua kali dimulai dari 0: mengapa hasilnya berbeda?

## Kesalahan umum

- **"Qubit adalah bit yang bernilai 0 dan 1 sekaligus."** Yang dicatat adalah sepasang amplitudo; saat dibaca, hasilnya 0 atau 1.
- **"Komputer kuantum mencoba semua jawaban sekaligus."** Hanya satu hasil acak yang terbaca; kekuatannya ada pada interferensi yang diatur algoritma.
- **"Quirk adalah mesin kuantum sungguhan."** Quirk adalah simulator di komputer klasik.

## Cek mandiri

- [ ] Saya dapat membedakan bit klasik, bit acak klasik, dan qubit secara garis besar.
- [ ] Saya dapat menyebut satu hal yang dijanjikan dan satu yang bukan dijanjikan komputasi kuantum.
- [ ] Saya dapat membaca `Chance` di Quirk dan menghitung H dua kali dengan tangan.
- [ ] Saya mencatat pemakaian AI bila saya memakainya.

## Kunci dan petunjuk

**Ingat kembali.** 1: 8 pola, karena tiap bit punya 2 pilihan dan 2 x 2 x 2 = 8. 2: `p AND q` = 0, jadi `NOT` memberi 1. 3: tidak; fungsi memberi satu keluaran untuk satu masukan, sehingga proses acak bukan fungsi dari masukan saja.

**Prediksi dulu.** Hasil: (1) 0,5; (2) 1. Banyak orang menebak 0,5 untuk keduanya karena menganggap H sama dengan pengacak; hitungan tangan menunjukkan amplitudo kedua yang saling menghapus.

**Contoh setengah jadi.** 1: 0,7071 dan 0,7071. 2: `a0` = 1 dan `a1` = 0; peluang 0 adalah 1 dan peluang 1 adalah 0. 3: pengacak mencampur peluang yang tidak negatif sehingga informasi tentang masukan hilang; H memakai amplitudo yang bisa negatif sehingga dua suku bisa saling menghapus.

**Soal susun urutan.** d, b, e, a, c, f (a dan c boleh bertukar). Kedua nilai baru dihitung dulu, baru `a0` dan `a1` diganti; bila `a0` diganti sebelum `baru1` dihitung, hasilnya salah.

**Latihan.** 1: 0,5 ; 0,5 ; 0,5 (setelah satu langkah semuanya 0,5). 2: tiga H sama dengan satu H, jadi `Chance` 50.0% (penyusun melihatnya di Quirk); hitung: H dua kali memberi `(1, 0)`, H ketiga memberi `(0,7071 ; 0,7071)`. 3: (a) mitos; (b) fakta; (c) fakta; (d) mitos, hanya masalah tertentu dengan algoritma khusus. 4: opsional.

**Latihan bercampur.** 1: tiap pola 1/8 = 0,125 dan jumlahnya 1. 2: NOT adalah pembalikan pasti sehingga dua kali kembali; pengacak membuang informasi masukan (masukan 0 dan 1 sama-sama menghasilkan 0,5 ; 0,5), jadi tidak bisa dibalik.

**Ulang berjarak.** 1: dijanjikan algoritma khusus yang lebih hemat langkah untuk masalah tertentu; bukan: semua program lebih cepat. 2: hanya satu hasil acak yang terbaca; kekuatan ada pada interferensi. 3: pengacak mencampur peluang yang tidak negatif; amplitudo H bisa negatif dan saling menghapus.

## Langkah berikutnya

Modul berikut: `e-xi1-m2` (probabilitas dan vektor). Bacaan pendamping: `matkom-sistem-bilangan-basis` dan `matkom-himpunan-relasi-fungsi`. Modul ini menyebut H dan amplitudo lebih dulu agar kamu punya alasan mempelajari vektor, matriks, dan bilangan kompleks.
