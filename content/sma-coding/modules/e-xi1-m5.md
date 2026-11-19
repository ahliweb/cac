## Untuk siapa modul ini

Modul ini untuk murid kelas XI jalur E (komputasi kuantum), minggu `E-XI1-M5` silabus v1.4: qubit dan keadaan. Prasyarat: modul `e-xi1-m4` (bilangan kompleks) dan, di belakangnya, `matkom-sistem-bilangan-basis` untuk gagasan bit dan biner. Modul ini mempertemukan vektor satuan (`e-xi1-m2`) dengan amplitudo (`e-xi1-m1`). Alat: kertas dan kalkulator; contoh C++ opsional (dasar pemrograman setara jalur A atau B). Amplitudo real dahulu: bilangan kompleks hanya muncul sebagai contoh fase.

Modul ini berstatus DRAF: karangan penyusun, belum ditinjau pemilik. Jalur E adalah pengayaan di luar rumusan capaian pembelajaran (CP); minggu ini tidak punya irisan pengayaan, jadi modul ini tidak dihitung memenuhi butir CP mana pun.

Aturan AI jalur ini: AI generatif boleh dipakai dengan etika dan dicatat, tanpa data pribadi, kata sandi, atau tugas bernilai pada permintaanmu, dan tanpa akun wajib. Saran: jawab dulu sendiri, baru minta penjelasan atau petunjuk bertahap. Setiap soal `Latihan` bertanda `AI: boleh` atau `AI: tanpa AI`.

## Ingat kembali

Jawab dari ingatan, baru cek di bagian kunci.

1. Hitung modulus dan konjugat `3 + 4i`. (dari `e-xi1-m4`)
2. Kapan hasil kali dalam dua vektor sama dengan nol, dan apa artinya? (dari `e-xi1-m2`)
3. Apakah `A` kali `B` selalu sama dengan `B` kali `A` untuk dua matriks? Beri satu contoh. (dari `e-xi1-m3`)

## Tujuan

Setelah modul ini kamu dapat:

- menuliskan `|0>` dan `|1>` sebagai vektor, dan keadaan umum `a|0> + b|1>` sebagai pasangan amplitudo;
- menyatakan syarat normalisasi (jumlah modulus kuadrat sama dengan 1);
- memeriksa apakah sebuah pasangan amplitudo adalah keadaan sah dan memperbaikinya dengan normalisasi;
- membedakan keadaan qubit dari hasil yang terbaca darinya.

## Prediksi dulu

Berikut enam pasangan amplitudo untuk satu qubit: (a) `(0,6 ; 0,8)`; (b) `(0,5 ; 0,5)`; (c) `(1 ; 1)`; (d) `(0,6 ; -0,8)`; (e) `(i/akar2 ; 1/akar2)`; (f) `(0,6 ; 0,7)`. Sebelum membaca contoh, tebak dan tulis mana yang sah sebagai keadaan qubit, dan satu alasan umum untuk yang tidak sah.

## Contoh terselesaikan

**Qubit.** Qubit adalah sistem yang keadaan klasiknya hanya 0 dan 1, seperti bit, tetapi keadaannya dicatat sebagai vektor. Dua keadaan paling sederhana diberi nama `|0>` dan `|1>` (dibaca "ket nol" dan "ket satu"; tanda `|...>` hanya penanda nama vektor):

```text
|0> = (1, 0)        |1> = (0, 1)
```

Keadaan umum adalah gabungan `a|0> + b|1>`, ditulis sebagai pasangan `(a, b)`. Gabungan seperti ini yang biasa disebut **superposisi** (di dokumentasi IBM Quantum Learning: kombinasi linear keadaan `0` dan `1`). Syaratnya: keadaan sah bila vektornya berpanjang 1, yaitu `|a|*|a| + |b|*|b| = 1` (di sini `|a|` modulus, ingat `e-xi1-m4`). Dokumentasi yang sama menyatakan bahwa vektor keadaan kuantum adalah vektor satuan menurut norma Euclid. Untuk amplitudo real, keadaan sah adalah titik pada lingkaran satuan, misalnya `(cos 30 derajat ; sin 30 derajat) = (0,8660 ; 0,5)`.

Program berikut memeriksa tujuh pasangan, termasuk enam di bagian `Prediksi dulu`. Syarat dibandingkan dengan toleransi kecil karena bilangan pecahan tidak tepat (`e-xi1-m4`).

```cpp
#include <cmath>
#include <complex>
#include <iomanip>
#include <iostream>

using Kompleks = std::complex<double>;

struct Keadaan {
    const char* nama;
    Kompleks a;  // amplitudo untuk |0>
    Kompleks b;  // amplitudo untuk |1>
};

int main() {
    std::cout << std::fixed << std::setprecision(4);
    const double s = 1.0 / std::sqrt(2.0);

    Keadaan daftar[] = {
        {"|0>", 1.0, 0.0},
        {"(0,6 ; 0,8)", 0.6, 0.8},
        {"(0,5 ; 0,5)", 0.5, 0.5},
        {"(1 ; 1)", 1.0, 1.0},
        {"(0,6 ; -0,8)", 0.6, -0.8},
        {"(i/akar2 ; 1/akar2)", Kompleks(0.0, s), s},
        {"(0,6 ; 0,7)", 0.6, 0.7},
    };

    for (const Keadaan& k : daftar) {
        double jumlah = std::norm(k.a) + std::norm(k.b);
        bool sah = std::fabs(jumlah - 1.0) < 1e-9;
        std::cout << k.nama << ": |a|^2 + |b|^2 = " << jumlah << (sah ? " sah" : " TIDAK sah") << "\n";
    }
    return 0;
}
```

Keluaran asli (dijalankan penyusun dengan `g++ -std=c++17 -Wall -Wextra`):

```text
|0>: |a|^2 + |b|^2 = 1.0000 sah
(0,6 ; 0,8): |a|^2 + |b|^2 = 1.0000 sah
(0,5 ; 0,5): |a|^2 + |b|^2 = 0.5000 TIDAK sah
(1 ; 1): |a|^2 + |b|^2 = 2.0000 TIDAK sah
(0,6 ; -0,8): |a|^2 + |b|^2 = 1.0000 sah
(i/akar2 ; 1/akar2): |a|^2 + |b|^2 = 1.0000 sah
(0,6 ; 0,7): |a|^2 + |b|^2 = 0.8500 TIDAK sah
```

Bacalah hasilnya. `(0,5 ; 0,5)` berjumlah 0,5: bukan keadaan, tetapi bila dibagi panjangnya (`0,7071`) menjadi `(0,7071 ; 0,7071)`, keadaan setelah H di `E-XI1-M1`. `(1 ; 1)` berjumlah 2; bila dibagi `akar2` menjadi `(0,7071 ; 0,7071)` juga. `(0,6 ; -0,8)` sah walau ada tanda minus: yang dijumlahkan kuadrat, jadi tanda tidak mengubah jumlah. `(i/akar2 ; 1/akar2)` sah karena modulus kuadrat `i/akar2` adalah 0,5. Pasangan `(0,6 ; 0,7)` berjumlah 0,85, bukan keadaan.

**Keadaan bukan hasil baca.** Ada tak hingga banyak keadaan sah (setiap titik pada lingkaran, dan lebih banyak lagi bila amplitudo kompleks), tetapi pembacaan satu qubit hanya memberi 0 atau 1, seperti satu bit (`E-XI1-M7`). Satu qubit tidak otomatis menyimpan dua bit data yang bisa dibaca: keadaannya dicatat dengan sepasang bilangan, tetapi yang bisa kamu baca hanya satu hasil. Dua bit klasik punya empat pola; dua qubit nanti punya empat amplitudo (`E-XI1-M12`).

## Contoh setengah jadi

Lengkapi (kunci di bagian akhir).

1. `(3, 4)`: jumlah kuadrat `3*3 + 4*4 = ____`, jadi bukan keadaan. Dinormalkan menjadi `(3/____ ; 4/____) = (____ ; ____)`.
2. Cari `b` bila `(0,8 ; b)` keadaan sah dan `b` positif: `b*b = 1 - 0,8*0,8 = ____`, jadi `b = ____`.
3. Lengkapi fungsi pemeriksa (isi `____` dengan nama fungsi atau nilai yang tepat):

```cpp setengah-jadi
bool sah(Kompleks a, Kompleks b) {
    double jumlah = std::____(a) + std::____(b);   // modulus kuadrat
    return std::fabs(jumlah - ____) < 1e-9;        // syarat normalisasi
}
```

## Soal Parsons

Susun baris-baris di bawah (sudah diacak) menjadi perulangan pemeriksa pada program di atas. Penjorokan sengaja dihilangkan.

```text
(a) bool sah = std::fabs(jumlah - 1.0) < 1e-9;
(b) for (const Keadaan& k : daftar) {
(c) std::cout << k.nama << (sah ? " sah" : " TIDAK sah") << "\n";
(d) double jumlah = std::norm(k.a) + std::norm(k.b);
(e) }
```

## Latihan

1. **Sah atau bukan.** (`AI: tanpa AI`) Periksa `(0,28 ; 0,96)`, `(0,5 ; 0,8)`, `(0 ; -1)`, dan `(0,6i ; 0,8)`.
2. **Normalisasi.** (`AI: boleh`) Jadikan `(1, 2)` dan `(1, -1)` keadaan sah dengan normalisasi, empat desimal.
3. **Mencari amplitudo.** (`AI: tanpa AI`) Bila `a = 1/akar3` (kira-kira 0,5774) dan `b` positif real, berapa `b`?
4. **Rancang dulu.** (`AI: boleh`) Tulis pseudocode fungsi `jadikanKeadaan(a, b)` yang menormalkan pasangan amplitudo dan menolak pasangan `(0, 0)`. Mengapa pasangan nol tidak bisa dinormalkan?
5. **Catatan pemakaian AI (opsional).** Bila memakai asisten AI, catat alat, tujuan, garis besar perintah, bagian yang dipakai, dan cara memeriksa jawabannya.

## Latihan bercampur

1. Kalikan keadaan `(0,6 ; 0,8)` dengan matriks `X` (`e-xi1-m3`). Apakah hasilnya masih keadaan sah? Mengapa?
2. Apakah `((1 + i)/2 ; (1 - i)/2)` keadaan sah? (`e-xi1-m4`)
3. Tiga bit klasik punya 8 pola. Berapa amplitudo yang diperlukan untuk mencatat keadaan tiga qubit nanti? (`matkom-sistem-bilangan-basis`)

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `e-xi1-m6` (satu minggu lagi), `e-xi1-m8` (sekitar tiga minggu lagi), dan `e-xi1-m13` (sekitar delapan minggu lagi). Jawab sekarang lalu simpan.

1. Tulis `|0>` dan `|1>` sebagai vektor dan sebutkan syarat sebuah keadaan sah.
2. Apakah `(0,5 ; 0,5)` keadaan sah? Jika bukan, bagaimana memperbaikinya?
3. Mengapa `(0,6 ; -0,8)` sah walaupun ada tanda minus?

## Kesalahan umum

- **"Keadaan sah bila jumlah amplitudonya 1."** Yang berjumlah 1 adalah modulus kuadrat; jumlah `0,6 + 0,8` adalah 1,4 tetapi keadaan itu sah.
- **"Tanda minus membuat keadaan tidak sah."** Kuadrat tidak peduli tanda; minus mengubah hal lain nanti (interferensi).
- **"`|0>` adalah nol."** `|0>` adalah vektor `(1, 0)`, bukan vektor nol; "0" hanya nama keadaan klasik.
- **"Qubit hanya punya dua keadaan."** Dua keadaan hanyalah yang paling sederhana; ada tak hingga banyak keadaan sah.
- **"Keadaan sama dengan hasil baca."** Pembacaan hanya memberi 0 atau 1 secara acak (`E-XI1-M7`).

## Cek mandiri

- [ ] Saya dapat menuliskan `|0>`, `|1>`, dan `a|0> + b|1>` sebagai vektor.
- [ ] Saya dapat menyatakan syarat normalisasi.
- [ ] Saya dapat memeriksa dan memperbaiki pasangan amplitudo dengan normalisasi.
- [ ] Saya dapat menjelaskan bedanya keadaan dan hasil baca.
- [ ] Saya mencatat pemakaian AI bila saya memakainya.

## Kunci dan petunjuk

**Ingat kembali.** 1: modulus 5; konjugat `3 - 4i`. 2: bila hasilnya nol; kedua vektor tegak lurus (atau salah satunya vektor nol). 3: tidak selalu; contoh `A kali X` tidak sama dengan `X kali A` di `e-xi1-m3`.

**Prediksi dulu.** Sah: (a), (d), (e). Tidak sah: (b) jumlah 0,5; (c) jumlah 2; (f) jumlah 0,85. Alasan umum: jumlah modulus kuadratnya bukan 1. Banyak murid menyatakan (d) tidak sah karena minus.

**Contoh setengah jadi.** 1: 25; `(3/5 ; 4/5) = (0,6 ; 0,8)`. 2: `1 - 0,64 = 0,36`, jadi `b = 0,6`. 3: `norm`, `norm`, `1.0`. Fungsi `std::norm` pada bilangan kompleks memberi modulus kuadrat (cppreference).

**Soal Parsons.** b, d, a, c, e. Perulangan dibuka, jumlah dihitung, syarat dibandingkan, hasil dicetak, perulangan ditutup.

**Latihan.** 1: `(0,28 ; 0,96)`: 0,0784 + 0,9216 = 1, sah; `(0,5 ; 0,8)`: 0,25 + 0,64 = 0,89, bukan; `(0 ; -1)`: sah; `(0,6i ; 0,8)`: 0,36 + 0,64 = 1, sah. 2: `(1, 2)` panjang akar 5 menjadi `(0,4472 ; 0,8944)`; `(1, -1)` panjang akar 2 menjadi `(0,7071 ; -0,7071)`. 3: `b*b = 1 - 1/3 = 2/3`, jadi `b` kira-kira 0,8165. 4: contoh: `p = a*a + b*b` (modulus kuadrat); jika `p` sama dengan 0, tolak; selain itu kembalikan `(a/akar(p), b/akar(p))`. Pasangan nol tidak punya arah dan pembagian dengan nol tidak terdefinisi. 5: opsional.

**Latihan bercampur.** 1: `(0,8 ; 0,6)`, masih sah: 0,64 + 0,36 = 1; `X` hanya menukar komponen sehingga jumlah kuadrat tidak berubah. 2: modulus kuadrat tiap komponen 0,5, jumlah 1: sah. 3: 8 amplitudo, satu per pola (2 pangkat 3).

**Ulang berjarak.** 1: `|0> = (1, 0)` dan `|1> = (0, 1)`; keadaan sah bila jumlah modulus kuadrat sama dengan 1. 2: bukan (jumlah 0,5); bagi dengan panjang `0,7071` menjadi `(0,7071 ; 0,7071)`. 3: yang dijumlahkan adalah kuadrat: 0,36 + 0,64 = 1.

## Langkah berikutnya

Modul berikut: `e-xi1-m6` (superposisi dan aturan Born): dari keadaan menuju peluang hasil. Bacaan pendamping: `matkom-sistem-bilangan-basis`.
