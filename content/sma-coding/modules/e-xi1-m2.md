## Untuk siapa modul ini

Modul ini untuk murid kelas XI jalur E (komputasi kuantum), minggu `E-XI1-M2` silabus v1.4: probabilitas dan vektor. Prasyarat: modul `e-xi1-m1`. Probabilitas dan vektor dibangun di sini dari awal tanpa mengandalkan Matematika sekolah, karena apakah materi itu sudah kamu terima belum diverifikasi `[belum terverifikasi]`; bila sudah, modul ini menjadi ulasan. Alat: kertas dan kalkulator. Contoh C++ bersifat opsional untuk murid yang sudah punya dasar pemrograman (setara jalur A atau B); bagian pokok tidak memerlukannya.

Modul ini karangan penyusun dan disetujui pemilik program pada 2026-11-20 (keputusan lewat dialog; catatan tinjauan menjadi tindak lanjut revisi). Jalur E adalah pengayaan di luar rumusan capaian pembelajaran (CP); minggu ini tidak punya irisan pengayaan, jadi modul ini tidak dihitung memenuhi butir CP mana pun.

Aturan AI jalur ini: AI generatif boleh dipakai dengan etika dan dicatat, tanpa data pribadi, kata sandi, atau tugas bernilai pada permintaanmu, dan tanpa akun wajib. Saran: jawab dulu sendiri, baru minta penjelasan atau petunjuk bertahap. Setiap soal `Latihan` bertanda `AI: boleh` atau `AI: tanpa AI`.

## Ingat kembali

Jawab dari ingatan, baru cek di bagian kunci.

1. Sebutkan satu hal yang dijanjikan komputasi kuantum dan satu hal yang bukan. (dari `e-xi1-m1`)
2. Apa itu pasangan terurut `(a, b)`, dan apakah `(1, 2)` sama dengan `(2, 1)`? (dari `matkom-himpunan-relasi-fungsi`)
3. Berapa nilai terbesar yang muat pada 8 bit tanpa tanda minus? (dari `FND-X1-M3`)

## Tujuan

Setelah modul ini kamu dapat:

- menghitung peluang kejadian diskret dengan menghitung hasil yang cocok;
- menjumlahkan vektor dua dimensi dan mengalikannya dengan bilangan;
- menghitung panjang, normalisasi, dan hasil kali dalam vektor dua dimensi;
- menjelaskan beda "jumlah sama dengan 1" pada vektor peluang dan "panjang sama dengan 1" pada vektor satuan.

## Prediksi dulu

Perhatikan vektor `(3, 4)`. Sebelum menghitung, tebak dan tulis: (1) panjangnya; (2) vektor searah dengannya yang panjangnya tepat 1; (3) berapa jumlah kuadrat kedua komponen vektor yang kamu tebak di nomor 2.

## Contoh terselesaikan

**Peluang diskret.** Bila semua hasil sama mungkin, peluang kejadian adalah banyak hasil yang cocok dibagi banyak seluruh hasil. Dua dadu punya 6 x 6 = 36 pasangan. Jumlah 7 muncul pada 6 pasangan (1+6, 2+5, 3+4, 4+3, 5+2, 6+1), jadi peluangnya 6/36 = 1/6, kira-kira 0,1667. Peluang semua hasil yang mungkin selalu berjumlah 1. Untuk koin berat dengan peluang kepala 0,7, peluang ekor haruslah 0,3.

**Vektor dua dimensi.** Vektor `(x, y)` adalah pasangan terurut yang bisa digambar sebagai anak panah dari titik asal. Penjumlahan dilakukan komponen demi komponen: `(1, 2) + (3, 1) = (4, 3)`. Perkalian dengan bilangan mengalikan tiap komponen: `2 * (1, 2) = (2, 4)`.

**Panjang dan normalisasi.** Menurut Pythagoras, panjang `(x, y)` adalah akar dari `x*x + y*y`. Untuk `(3, 4)` panjangnya akar dari 25, yaitu 5. **Normalisasi** membagi tiap komponen dengan panjang sehingga panjangnya menjadi 1: `(3/5, 4/5) = (0,6 ; 0,8)`. Jumlah kuadratnya 0,36 + 0,64 = 1.

**Hasil kali dalam.** Hasil kali dalam `(x1, y1)` dan `(x2, y2)` adalah satu bilangan, `x1*x2 + y1*y2`. Bila hasilnya 0, kedua vektor tegak lurus. `(3, 4)` dan `(4, -3)`: 12 - 12 = 0, tegak lurus. `(1, 2)` dan `(3, 1)`: 3 + 2 = 5.

**Dua macam "berjumlah 1".** Vektor peluang `(0,6 ; 0,4)` berjumlah 1 tetapi panjangnya akar dari 0,52, kira-kira 0,7211, jadi bukan vektor satuan. Vektor `(0,6 ; 0,8)` panjangnya 1 tetapi jumlah komponennya 1,4. Dalam komputasi kuantum, keadaan dicatat sebagai vektor yang **panjangnya** 1 dan peluang diperoleh dari **kuadrat** komponennya (`E-XI1-M6`); jangan tertukar dengan vektor peluang klasik.

Program berikut menghitung semua angka di atas. Semuanya berupa fungsi kecil agar mudah dipakai ulang di simulator pada `E-XI1-M10`.

```cpp
#include <cmath>
#include <iomanip>
#include <iostream>

struct Vektor {
    double x;
    double y;
};

double panjang(Vektor v) {
    return std::sqrt(v.x * v.x + v.y * v.y);
}

double hasilKaliDalam(Vektor a, Vektor b) {
    return a.x * b.x + a.y * b.y;
}

Vektor normalisasi(Vektor v) {
    double p = panjang(v);
    return {v.x / p, v.y / p};
}

int main() {
    std::cout << std::fixed << std::setprecision(4);

    // Peluang diskret: dua dadu, jumlah 7.
    int cocok = 0;
    for (int a = 1; a <= 6; a++) {
        for (int b = 1; b <= 6; b++) {
            if (a + b == 7) cocok++;
        }
    }
    std::cout << "jumlah 7: " << cocok << " dari 36 = " << cocok / 36.0 << "\n";

    Vektor v = {3.0, 4.0};
    std::cout << "panjang (3,4) = " << panjang(v) << "\n";

    Vektor n = normalisasi(v);
    std::cout << "normalisasi: (" << n.x << ", " << n.y << ")\n";
    std::cout << "kuadrat komponen: " << n.x * n.x << " dan " << n.y * n.y
              << ", jumlah " << n.x * n.x + n.y * n.y << "\n";

    std::cout << "(3,4).(4,-3) = " << hasilKaliDalam(v, {4.0, -3.0}) << "\n";
    std::cout << "(1,2).(3,1) = " << hasilKaliDalam({1.0, 2.0}, {3.0, 1.0}) << "\n";

    Vektor u = normalisasi({1.0, 1.0});
    std::cout << "normalisasi (1,1): (" << u.x << ", " << u.y << ")\n";
    return 0;
}
```

Keluaran asli (dijalankan penyusun dengan `g++ -std=c++17 -Wall -Wextra`):

```text
jumlah 7: 6 dari 36 = 0.1667
panjang (3,4) = 5.0000
normalisasi: (0.6000, 0.8000)
kuadrat komponen: 0.3600 dan 0.6400, jumlah 1.0000
(3,4).(4,-3) = 0.0000
(1,2).(3,1) = 5.0000
normalisasi (1,1): (0.7071, 0.7071)
```

## Contoh setengah jadi

Lengkapi dengan vektor `(5, 12)` (kunci di bagian akhir).

1. Panjangnya adalah akar dari `5*5 + 12*12 = ____`, yaitu ____.
2. Normalisasi: `(5/____, 12/____)`, kira-kira `(____ ; ____)` (empat desimal).
3. Jumlah kuadrat komponen hasil normalisasi: `25/169 + 144/169 = ____`.
4. Hasil kali dalam `(5, 12)` dan `(12, -5)` adalah ____, jadi keduanya ____.

## Soal Parsons

Susun baris-baris di bawah (sudah diacak) menjadi fungsi `normalisasi` pada program di atas.

```text
(a) double p = panjang(v);
(b)     return {v.x / p, v.y / p};
(c) Vektor normalisasi(Vektor v) {
(d) }
```

## Latihan

1. **Dua dadu.** (`AI: tanpa AI`) Berapa peluang jumlah 5? Berapa peluang jumlah 11 atau lebih? Tulis pasangan yang cocok.
2. **Normalisasi.** (`AI: boleh`) Normalkan `(1, 2)`. Berapa panjang sebelum dan sesudahnya, dan berapa jumlah kuadrat komponen hasilnya?
3. **Tegak lurus.** (`AI: tanpa AI`) Hitung hasil kali dalam `(2, 1)` dan `(1, -2)`, lalu `(1, 2)` dan `(2, 3)`. Mana yang tegak lurus?
4. **Rancang dulu.** (`AI: boleh`) Tulis pseudocode fungsi `adalahVektorSatuan(x, y)` yang benar bila panjang vektor 1 dalam toleransi 0,000001, tanpa memakai akar. Baru ubah menjadi C++ bila kamu mau.
5. **Catatan pemakaian AI (opsional).** Bila memakai asisten AI, catat alat, tujuan, garis besar perintah, bagian yang dipakai, dan cara memeriksa jawabannya.

## Latihan bercampur

1. Empat bit acak seragam punya berapa pola, dan berapa peluang tiap pola? (`matkom-sistem-bilangan-basis`)
2. Pada `e-xi1-m1`, setelah H pertama keadaannya `(0,7071 ; 0,7071)`. Hitung panjang vektor itu.
3. Vektor peluang pengacak klasik adalah `(0,5 ; 0,5)`. Apakah vektor itu satuan? Hitung panjangnya.

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `e-xi1-m3` (satu minggu lagi), `e-xi1-m5` (sekitar tiga minggu lagi), dan `e-xi1-m10` (sekitar delapan minggu lagi). Jawab sekarang lalu simpan.

1. Berapa panjang vektor `(3, 4)`, dan bagaimana menormalkannya?
2. Kapan hasil kali dalam dua vektor sama dengan nol, dan apa artinya?
3. Mengapa jumlah kuadrat komponen vektor yang sudah dinormalkan sama dengan 1?

## Kesalahan umum

- **"Panjang vektor adalah jumlah komponennya."** Panjang adalah akar dari jumlah kuadrat; jumlah komponen `(3, 4)` adalah 7, panjangnya 5.
- **Menormalkan dengan membagi dengan jumlah komponen.** Itu menghasilkan vektor peluang (jumlah 1), bukan vektor satuan (panjang 1).
- **Lupa akar.** Jumlah kuadrat 25 bukan panjang; panjangnya 5.
- **"Hasil kali dalam adalah vektor."** Hasilnya satu bilangan.
- **"Hasil kali dalam nol berarti salah satu vektornya nol."** Bisa juga kedua vektor tegak lurus.

## Cek mandiri

- [ ] Saya dapat menghitung peluang dengan menghitung hasil yang cocok.
- [ ] Saya dapat menjumlahkan vektor dan mengalikannya dengan bilangan.
- [ ] Saya dapat menghitung panjang dan menormalkan vektor dua dimensi.
- [ ] Saya dapat menghitung hasil kali dalam dan menyebut arti hasil nol.
- [ ] Saya dapat membedakan vektor peluang dan vektor satuan.
- [ ] Saya mencatat pemakaian AI bila saya memakainya.

## Kunci dan petunjuk

**Ingat kembali.** 1: dijanjikan algoritma khusus yang lebih hemat langkah untuk masalah tertentu; bukan: semua program lebih cepat atau semua jawaban sekaligus. 2: dua bilangan yang urutannya penting; `(1, 2)` tidak sama dengan `(2, 1)`. 3: 255.

**Prediksi dulu.** (1) 5; (2) `(0,6 ; 0,8)`; (3) 1. Banyak murid menebak panjang 7 (jumlah komponen).

**Contoh setengah jadi.** 1: 25 + 144 = 169, panjang 13. 2: 5/13 dan 12/13, kira-kira (0,3846 ; 0,9231). 3: 169/169 = 1. 4: 60 - 60 = 0, tegak lurus.

**Soal Parsons.** c, a, b, d. Tanda kurung kurawal pembuka fungsi di awal, panjang dihitung dulu, baru dibagi, lalu kurung tutup.

**Latihan.** 1: jumlah 5 pada (1,4), (2,3), (3,2), (4,1): 4/36 = 1/9, kira-kira 0,1111. Jumlah 11 atau lebih: (5,6), (6,5), (6,6): 3/36, kira-kira 0,0833. 2: panjang awal akar 5, kira-kira 2,2361; hasil `(0,4472 ; 0,8944)` berpanjang 1; jumlah kuadratnya 0,2 + 0,8 = 1. 3: `(2,1)` dan `(1,-2)`: 2 - 2 = 0, tegak lurus; `(1,2)` dan `(2,3)`: 2 + 6 = 8, tidak. 4: contoh pseudocode: `selisih = |x*x + y*y - 1|; kembalikan selisih < 0,000001`. Membandingkan kuadrat menghindari akar dan galat pembulatannya; toleransi dipakai karena bilangan desimal tidak persis. 5: opsional.

**Latihan bercampur.** 1: 16 pola, peluang 1/16 = 0,0625 tiap pola. 2: akar dari 0,5 + 0,5 = 1 (angka 0,7071 dibulatkan, jadi hitungan kalkulator bisa 0,99999). 3: panjang akar dari 0,5, kira-kira 0,7071, bukan satuan; jumlahnya 1 tetapi panjangnya bukan 1.

**Ulang berjarak.** 1: 5; bagi tiap komponen dengan 5 menjadi `(0,6 ; 0,8)`. 2: bila hasilnya nol; kedua vektor tegak lurus (atau salah satunya vektor nol). 3: karena panjangnya 1 dan panjang kuadrat adalah jumlah kuadrat komponen.

## Langkah berikutnya

Modul berikut: `e-xi1-m3` (matriks), tempat kamu mengubah vektor dengan matriks. Bacaan pendamping: `matkom-himpunan-relasi-fungsi` untuk gagasan pasangan terurut.
