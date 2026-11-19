## Untuk siapa modul ini

Modul ini untuk murid kelas XI jalur E (komputasi kuantum), minggu `E-XI1-M3` silabus v1.4: matriks. Prasyarat: modul `e-xi1-m2` (vektor, panjang, hasil kali dalam). Matriks dibangun di sini dari awal; apakah materi itu sudah kamu terima di Matematika sekolah belum diverifikasi `[belum terverifikasi]`. Alat: kertas dan kalkulator. Contoh C++ bersifat opsional (dasar pemrograman setara jalur A atau B); minggu ini silabus meminta perkalian dengan tangan, lalu memeriksanya dengan program kecil.

Modul ini berstatus DRAF: karangan penyusun, belum ditinjau pemilik. Jalur E adalah pengayaan di luar rumusan capaian pembelajaran (CP); minggu ini tidak punya irisan pengayaan, jadi modul ini tidak dihitung memenuhi butir CP mana pun.

Aturan AI jalur ini: AI generatif boleh dipakai dengan etika dan dicatat, tanpa data pribadi, kata sandi, atau tugas bernilai pada permintaanmu, dan tanpa akun wajib. Saran: jawab dulu sendiri, baru minta penjelasan atau petunjuk bertahap. Setiap soal `Latihan` bertanda `AI: boleh` atau `AI: tanpa AI`.

## Ingat kembali

Jawab dari ingatan, baru cek di bagian kunci.

1. Berapa panjang vektor `(3, 4)`, dan bagaimana menormalkannya? (dari `e-xi1-m2`)
2. Apa arti fungsi `f` dari himpunan A ke himpunan B? Beri satu contoh. (dari `matkom-himpunan-relasi-fungsi`)
3. Ubah bilangan biner `101` ke desimal. (dari `matkom-sistem-bilangan-basis`)

## Tujuan

Setelah modul ini kamu dapat:

- mengalikan matriks 2 x 2 dengan vektor dua dimensi;
- mengalikan dua matriks 2 x 2;
- menjelaskan mengapa urutan perkalian matriks penting;
- menjelaskan sebuah matriks sebagai aturan yang mengubah vektor, dan memeriksa hitungan tanganmu dengan program kecil.

## Prediksi dulu

Diberikan `A = [[1, 2], [3, 4]]` (baris pertama 1 dan 2, baris kedua 3 dan 4), `v = (5, 6)`, dan `X = [[0, 1], [1, 0]]`. Sebelum menghitung, tebak dan tulis: (1) hasil `A` kali `v`; (2) apakah `A` kali `X` sama dengan `X` kali `A`.

## Contoh terselesaikan

**Matriks kali vektor.** Matriks adalah tabel bilangan yang bekerja sebagai aturan pengubah vektor. Tiap komponen hasil adalah hasil kali dalam satu baris matriks dengan vektor (ingat `e-xi1-m2`). Untuk `A` dan `v = (5, 6)`: komponen pertama `1*5 + 2*6 = 17`, komponen kedua `3*5 + 4*6 = 39`, jadi hasilnya `(17, 39)`.

**Matriks kali matriks.** Elemen baris `i` kolom `j` pada hasil adalah hasil kali dalam baris `i` matriks kiri dengan kolom `j` matriks kanan. Untuk `A` kali `X`: `[[1*0 + 2*1, 1*1 + 2*0], [3*0 + 4*1, 3*1 + 4*0]] = [[2, 1], [4, 3]]`. Untuk `X` kali `A`: `[[0*1 + 1*3, 0*2 + 1*4], [1*1 + 0*3, 1*2 + 0*4]] = [[3, 4], [1, 2]]`. Hasilnya berbeda: **urutan perkalian matriks penting**. `X` kali `A` menukar baris `A`, sedangkan `A` kali `X` menukar kolomnya.

**Matriks sebagai fungsi.** `X` menukar dua komponen: `X` kali `(1, 0)` adalah `(0, 1)`, dan `X` kali `X` memberi matriks identitas `[[1, 0], [0, 1]]` yang tidak mengubah vektor apa pun. Jadi `X` bisa dibalik (satu-satu, ingat `matkom-himpunan-relasi-fungsi`). Matriks `R = [[0, -1], [1, 0]]` memutar vektor 90 derajat: `R` kali `(3, 4)` adalah `(-4, 3)`, dan panjangnya tetap 5. `R` kali `R` memberi `-1` kali identitas, yaitu putar 180 derajat.

**Mengapa ini penting.** Di `E-XI1-M1` kamu memakai rumus H tanpa tahu asalnya; rumus itu perkalian matriks `H = [[h, h], [h, -h]]`, dengan `h` = 0,7071 (kira-kira 1/akar2), dengan vektor keadaan. `H` kali `(1, 0)` adalah `(0,7071 ; 0,7071)`, dan `H` kali `(0,7071 ; 0,7071)` adalah `(1 ; 0)` karena `0,7071*0,7071 + 0,7071*0,7071` = 1 dan `0,7071*0,7071 - 0,7071*0,7071` = 0. Dokumentasi IBM Quantum Learning menyebut bahwa pada keadaan klasik yang berpeluang, operasinya matriks stokastik (entri tidak negatif, tiap kolom berjumlah 1), sedangkan pada keadaan kuantum operasinya matriks uniter; keduanya dikalikan dengan vektor keadaan, jadi kamu perlu lancar mengalikan matriks. Tiap gerbang kuantum satu qubit adalah matriks 2 x 2 yang mempertahankan panjang vektor, seperti `R`.

Program berikut memeriksa angka di atas.

```cpp
#include <iostream>

struct Matriks {
    double a, b;  // baris 1
    double c, d;  // baris 2
};

struct Vektor {
    double x, y;
};

Vektor kaliVektor(Matriks m, Vektor v) {
    return {m.a * v.x + m.b * v.y, m.c * v.x + m.d * v.y};
}

Matriks kaliMatriks(Matriks p, Matriks q) {
    return {p.a * q.a + p.b * q.c, p.a * q.b + p.b * q.d,
            p.c * q.a + p.d * q.c, p.c * q.b + p.d * q.d};
}

void cetak(const char* nama, Matriks m) {
    std::cout << nama << " = [[" << m.a + 0.0 << ", " << m.b + 0.0 << "], [" << m.c + 0.0 << ", " << m.d + 0.0 << "]]\n";
}

int main() {
    Matriks A = {1, 2, 3, 4};
    Matriks X = {0, 1, 1, 0};
    Matriks R = {0, -1, 1, 0};

    Vektor hasil = kaliVektor(A, {5, 6});
    std::cout << "A * (5,6) = (" << hasil.x << ", " << hasil.y << ")\n";

    cetak("A * X", kaliMatriks(A, X));
    cetak("X * A", kaliMatriks(X, A));

    Vektor putar = kaliVektor(R, {3, 4});
    std::cout << "R * (3,4) = (" << putar.x << ", " << putar.y << ")\n";
    cetak("R * R", kaliMatriks(R, R));
    return 0;
}
```

Keluaran asli (dijalankan penyusun dengan `g++ -std=c++17 -Wall -Wextra`):

```text
A * (5,6) = (17, 39)
A * X = [[2, 1], [4, 3]]
X * A = [[3, 4], [1, 2]]
R * (3,4) = (-4, 3)
R * R = [[-1, 0], [0, -1]]
```

## Contoh setengah jadi

Lengkapi (kunci di bagian akhir).

1. `B = [[2, 0], [1, 3]]` dan `v = (1, 2)`: komponen pertama `2*1 + 0*2 = ____`, komponen kedua `1*1 + 3*2 = ____`.
2. `P = [[1, 1], [0, 1]]` dan `Q = [[1, 0], [1, 1]]`. `P` kali `Q` = `[[1*1 + 1*1, 1*0 + 1*1], [0*1 + 1*1, 0*0 + 1*1]] = [[____, ____], [____, ____]]`.
3. `Q` kali `P` = `[[____, ____], [____, ____]]`.
4. Apakah `P` kali `Q` sama dengan `Q` kali `P`? ____

## Soal Parsons

Susun baris-baris di bawah (sudah diacak) menjadi versi fungsi `kaliVektor` yang memakai peubah antara `x` dan `y` (hasilnya sama dengan fungsi di program di atas). Penjorokan sengaja dihilangkan supaya tidak membocorkan urutan.

```text
(a) double y = m.c * v.x + m.d * v.y;
(b) Vektor kaliVektor(Matriks m, Vektor v) {
(c) return {x, y};
(d) double x = m.a * v.x + m.b * v.y;
(e) }
```

## Latihan

1. **Identitas.** (`AI: tanpa AI`) Hitung `[[1, 0], [0, 1]]` kali `(7, -2)`.
2. **Dua vektor.** (`AI: boleh`) Hitung `[[2, 1], [0, 3]]` kali `(1, 1)` dan kali `(0, 1)`. Apa hubungan hasil kedua dengan kolom matriks?
3. **Tanda minus.** (`AI: tanpa AI`) Hitung `[[1, 0], [0, -1]]` kali `(0,6 ; 0,8)`. Hitung panjang sebelum dan sesudahnya.
4. **Rancang dulu.** (`AI: boleh`) Tulis pseudocode untuk elemen baris `i` kolom `j` dari hasil kali dua matriks 2 x 2, memakai hasil kali dalam. Baru ubah menjadi C++ bila kamu mau.
5. **Catatan pemakaian AI (opsional).** Bila memakai asisten AI, catat alat, tujuan, garis besar perintah, bagian yang dipakai, dan cara memeriksa jawabannya.

## Latihan bercampur

1. Normalkan `(6, 8)` (`e-xi1-m2`), lalu kalikan dengan `X`. Berapa panjang hasilnya?
2. Satu bit klasik punya 2 pola; matriks yang bekerja pada vektor peluangnya berukuran 2 x 2. Berapa ukuran dan banyak entri matriks untuk 2 bit, dan untuk 3 bit? (`matkom-sistem-bilangan-basis`)
3. `X` kali `X` adalah identitas. Apa hasil `X` kali `(X kali v)` untuk sembarang `v`, dan apa artinya bagi sifat "bisa dibalik"? (`matkom-himpunan-relasi-fungsi`)

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `e-xi1-m4` (satu minggu lagi), `e-xi1-m6` (sekitar tiga minggu lagi), dan `e-xi1-m11` (sekitar delapan minggu lagi). Jawab sekarang lalu simpan.

1. Hitung `[[0, 1], [1, 0]]` kali `(1, 0)`.
2. Apakah `A` kali `B` selalu sama dengan `B` kali `A`? Beri satu contoh.
3. Matriks `R = [[0, -1], [1, 0]]` diterapkan pada `(3, 4)`: berapa hasilnya dan berapa panjangnya?

## Kesalahan umum

- **Mengalikan elemen dengan elemen yang seletak.** Perkalian matriks memakai baris kali kolom, bukan elemen kali elemen.
- **"A kali B sama dengan B kali A."** Pada umumnya tidak; urutan penting.
- **Mengalikan kolom dengan baris.** Pada `A` kali `v`, baris `A` dikalikan dengan `v`.
- **Hasil matriks kali vektor dianggap satu bilangan.** Hasilnya vektor, satu komponen per baris matriks.
- **Mengira semua matriks mempertahankan panjang.** `A = [[1, 2], [3, 4]]` mengubah panjang; yang mempertahankan hanya jenis tertentu seperti `R` dan `X`.

## Cek mandiri

- [ ] Saya dapat mengalikan matriks 2 x 2 dengan vektor.
- [ ] Saya dapat mengalikan dua matriks 2 x 2.
- [ ] Saya dapat menunjukkan bahwa urutan perkalian penting.
- [ ] Saya dapat menjelaskan matriks sebagai aturan pengubah vektor.
- [ ] Saya dapat memeriksa hitungan tangan dengan program kecil.
- [ ] Saya mencatat pemakaian AI bila saya memakainya.

## Kunci dan petunjuk

**Ingat kembali.** 1: panjang 5; bagi tiap komponen dengan 5 menjadi `(0,6 ; 0,8)`. 2: setiap anggota A dipasangkan dengan tepat satu anggota B; contoh: `f(x) = x + 1` dari bilangan bulat ke bilangan bulat. 3: 1 x 4 + 0 x 2 + 1 x 1 = 5.

**Prediksi dulu.** (1) `(17, 39)`; (2) tidak sama: `[[2, 1], [4, 3]]` lawan `[[3, 4], [1, 2]]`. Banyak murid menebak sama karena perkalian bilangan bersifat tukar.

**Contoh setengah jadi.** 1: 2 dan 7. 2: `[[2, 1], [1, 1]]`. 3: `[[1*1 + 0*0, 1*1 + 0*1], [1*1 + 1*0, 1*1 + 1*1]] = [[1, 1], [1, 2]]`. 4: tidak sama.

**Soal Parsons.** b, d, a, c, e (d dan a boleh bertukar). Fungsi dibuka, kedua komponen dihitung, hasil dikembalikan, fungsi ditutup.

**Latihan.** 1: `(7, -2)`. 2: `(3, 3)` dan `(1, 3)`; hasil kedua adalah kolom kedua matriks, dan hasil `M` kali `(0, 1)` selalu kolom kedua. 3: `(0,6 ; -0,8)`; panjang sebelum dan sesudah sama-sama 1, karena 0,36 + 0,64 = 1. 4: contoh: `hasil[i][j] = P[i][1]*Q[1][j] + P[i][2]*Q[2][j]`, untuk `i` dan `j` dari 1 sampai 2. 5: opsional.

**Latihan bercampur.** 1: `(0,6 ; 0,8)` kali `X` menjadi `(0,8 ; 0,6)`, panjang 1. 2: 2 bit: 4 x 4 = 16 entri; 3 bit: 8 x 8 = 64 entri. 3: hasilnya `v`; operasi `X` bisa dibalik dengan menerapkannya lagi.

**Ulang berjarak.** 1: `(0, 1)`. 2: tidak selalu; `A kali X` tidak sama dengan `X kali A` di atas. 3: `(-4, 3)` dan panjang 5.

## Langkah berikutnya

Modul berikut: `e-xi1-m4` (bilangan kompleks dasar). Bacaan pendamping: `matkom-himpunan-relasi-fungsi` untuk gagasan fungsi satu-satu.
