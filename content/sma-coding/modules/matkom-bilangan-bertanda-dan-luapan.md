## Untuk siapa modul ini

Modul ini untuk siswa SMA reguler kelas X yang sudah mengenal basis 2 dan konversi bilangan bulat. Ia bagian dari seri Matematika Komputasi Dasar dan berstatus DRAF: karangan penyusun, belum disetujui pemilik, dan tidak dihitung sebagai pemenuhan butir capaian pembelajaran (hanya mendukung pemahaman model komputer pada butir E-BK-e).

Prasyarat: modul `matkom-sistem-bilangan-basis` (nilai tempat, konversi, aritmetika biner), dan pengantar representasi data di `FND-X1-M3`.

Minggu silabus v1.1 yang berdekatan: jalur A `A-X1-M9` (tipe data) dan `A-X2-M4` (aritmetika dasar); jalur B `B-X1-M9`. Bacaan mandiri atau rujukan guru; tanpa jadwal wajib.

Setelah mempelajari modul ini, kamu diharapkan bisa:

- menuliskan bilangan bulat negatif dengan komplemen dua pada n bit dan membacanya kembali;
- menyebut rentang bilangan bertanda dan tak bertanda pada n bit;
- menjelaskan luapan (overflow) dan akibatnya pada program;
- menjelaskan mengapa `0.1 + 0.2` tidak persis `0.3` dan cara membandingkan bilangan pecahan dengan aman.

Bagian pokok dapat dikerjakan di kertas. Contoh kode opsional: contoh C++17 hanya diperiksa bisa dikompilasi, contoh TypeScript diperiksa penyusun secara manual dengan menjalankannya. Keduanya bukan bukti kebenaran untuk semua masukan.

## Ulasan singkat

Kamu sudah tahu bahwa n bit membentuk 2^n pola dan bahwa bilangan tak negatif ditulis dengan nilai tempat basis 2. Pertanyaan baru di sini: bagaimana menyimpan bilangan **negatif** hanya dengan nol dan satu, dan apa yang terjadi bila hasil hitung tidak muat.

## Gagasan 1: bit tanda dan besar tanda

Cara paling mudah: sisihkan bit paling kiri sebagai **bit tanda** (0 untuk positif, 1 untuk negatif), dan bit sisanya menyimpan besarnya. Pada 8 bit, `00000101` adalah +5 dan `10000101` adalah -5.

Kelemahannya: ada dua nol, `00000000` (+0) dan `10000000` (-0), dan rangkaian penjumlahan harus punya aturan khusus tanda. Perangkat keras jadi lebih rumit. Karena itu cara ini jarang dipakai untuk bilangan bulat.

## Gagasan 2: komplemen satu

Untuk menyatakan negatif suatu bilangan, **balik semua bit** (0 jadi 1, 1 jadi 0). Contoh 8 bit: +5 = `00000101`, maka -5 = `11111010`. Masih ada dua nol (`00000000` dan `11111111`), sehingga cara ini hanya jadi langkah antara menuju komplemen dua.

## Gagasan 3: komplemen dua

Komplemen dua dipakai pada hampir semua komputer. Aturan membuat negatif: **balik semua bit, lalu tambah 1**.

Contoh pada 8 bit, cari -5:

1. +5 = `00000101`.
2. Balik semua bit: `11111010`.
3. Tambah 1: `11111011`.

Jadi -5 = `11111011`. Cek dengan penjumlahan: `00000101 + 11111011 = 1 00000000`; bit ke-9 dibuang karena hanya ada 8 bit, sehingga hasilnya `00000000` = 0. Itu benar: 5 + (-5) = 0.

Inilah keunggulan komplemen dua: **penjumlahan biasa bekerja untuk positif maupun negatif** tanpa aturan khusus, dan hanya ada satu nol.

Cara lain membacanya: pada n bit, bit paling kiri bernilai **-2^(n-1)** (negatif), dan bit lain bernilai positif seperti biasa. Pada 8 bit, `11111011` bernilai -128 + 64 + 32 + 16 + 8 + 2 + 1 = -5.

Contoh lain, cari -37 pada 8 bit: 37 = `00100101`, balik `11011010`, tambah 1 menjadi `11011011`. Cek: -128 + 64 + 16 + 8 + 2 + 1 = -37.

Membaca bilangan negatif dari bit: bila bit paling kiri 1, hasilnya negatif; ulangi aturan yang sama (balik, tambah 1) untuk mendapat besarnya. Contoh `10010110`: balik `01101001`, tambah 1 menjadi `01101010` = 106, sehingga nilainya -106.

## Rentang bilangan

Pada n bit:

| Jenis | Rentang | Banyak nilai |
| --- | --- | --- |
| Tak bertanda | 0 sampai 2^n - 1 | 2^n |
| Bertanda (komplemen dua) | -2^(n-1) sampai 2^(n-1) - 1 | 2^n |

| Bit | Bertanda | Tak bertanda |
| --- | --- | --- |
| 8 | -128 sampai 127 | 0 sampai 255 |
| 16 | -32.768 sampai 32.767 | 0 sampai 65.535 |
| 32 | -2.147.483.648 sampai 2.147.483.647 | 0 sampai 4.294.967.295 |

Perhatikan bahwa rentang negatif lebih panjang satu: ada -128 tetapi tidak ada +128 pada 8 bit.

## Luapan dan melilit

**Luapan (overflow)** terjadi saat hasil hitung di luar rentang tipe yang dipakai. Bilangan "melilit" seperti odometer atau jam: setelah nilai terbesar kembali ke nilai terkecil.

Pada 8 bit tak bertanda: 200 + 100 = 300, tetapi 300 tidak muat. Hasil tersimpan 300 - 256 = 44.

Pada 8 bit bertanda: 100 + 50 = 150 tidak muat (maksimum 127). Pola bitnya `10010110`, yang dibaca sebagai -106 (sama dengan 150 - 256).

Pada 32 bit bertanda: 2.147.483.647 + 1 melilit menjadi -2.147.483.648.

Akibat di program nyata: jumlah yang tampaknya besar tiba-tiba negatif, rata-rata salah, atau perulangan tak berhenti. Cara mencegah:

- pilih tipe yang cukup besar (misalnya 64 bit) sebelum menghitung, bukan sesudahnya;
- periksa sebelum menjumlah, bukan sesudah (di C++ luapan pada tipe bertanda adalah perilaku tak terdefinisi, jadi memeriksa hasilnya sesudah kejadian tidak dapat diandalkan);
- ingat bahwa tipe `number` di JavaScript dan TypeScript adalah pecahan mengambang 64 bit: bilangan bulat tepat hanya sampai 2^53 - 1 = 9.007.199.254.740.991 (`Number.MAX_SAFE_INTEGER`), sedangkan `BigInt` tidak punya batas itu.

## Bilangan pecahan mengambang dan galat pembulatan

Komputer menyimpan bilangan pecahan dalam bentuk mirip notasi ilmiah: tanda, bilangan penting (mantisa), dan pangkat dua (eksponen). Standar yang umum disebut IEEE 754. Pada 64 bit (`double` di C++, `number` di JavaScript) tersedia sekitar 15 sampai 17 angka desimal penting.

Seperti dibahas di modul sebelumnya, 0,1 tidak punya bentuk biner berhingga, sehingga tersimpan sebagai nilai terdekat yang bisa dibentuk. Karena itu:

- `0.1 + 0.2` menghasilkan `0.30000000000000004`, bukan `0.3`;
- `0.1 + 0.2 == 0.3` bernilai **salah**.

Ini bukan kekeliruan komputer, melainkan akibat pembulatan yang tak terhindarkan. Yang persis hanya pecahan dengan penyebut pangkat dua, misalnya `0.5 + 0.25 = 0.75`.

Aturan praktis:

- **Jangan membandingkan pecahan dengan `==`.** Bandingkan selisihnya dengan batas toleransi, misalnya `abs(a - b) < 1e-9`.
- Untuk uang atau hitungan yang harus persis, simpan dalam satuan terkecil sebagai bilangan bulat (misalnya sen, bukan pecahan rupiah).
- Menjumlah banyak pecahan dapat menumpuk galat kecil.

## Memilih tipe

Pertanyaan yang dapat kamu tanyakan sebelum memilih tipe: berapa nilai terbesar dan terkecil yang mungkin muncul, termasuk hasil antara? Apakah bilangan bisa negatif? Apakah harus persis? Jawabannya menentukan: bulat atau pecahan, bertanda atau tidak, dan berapa bit.

## Contoh kode

### C++17: memeriksa luapan sebelum menjumlah (opsional)

Pada tipe bertanda, periksa dulu apakah penjumlahan muat.

```cpp
#include <climits>
#include <cstdint>
#include <iostream>
using namespace std;

bool bisaDijumlah(int a, int b) {
    if (b > 0 && a > INT_MAX - b) {
        return false;
    }
    if (b < 0 && a < INT_MIN - b) {
        return false;
    }
    return true;
}

int main() {
    // Tipe tak bertanda melilit dengan aturan yang jelas.
    uint8_t x = 200;
    uint8_t y = 100;
    uint8_t jumlah = static_cast<uint8_t>(x + y);
    cout << static_cast<int>(jumlah) << "\n";  // 44

    cout << bisaDijumlah(2147483647, 1) << "\n";  // 0 (tidak muat)
    cout << bisaDijumlah(100, 200) << "\n";       // 1 (muat)

    // Membandingkan pecahan dengan toleransi.
    double a = 0.1 + 0.2;
    double b = 0.3;
    double selisih = a > b ? a - b : b - a;
    cout << (a == b) << " " << (selisih < 1e-9) << "\n";  // 0 1
    return 0;
}
```

### TypeScript: melilit dan galat pembulatan (opsional)

Contoh TypeScript ini diperiksa secara manual oleh penyusun dengan menjalankannya memakai Bun; tidak diperiksa otomatis oleh repositori.

```ts
// Operator `| 0` memotong hasil menjadi bilangan bulat bertanda 32 bit.
const maksimum32 = 2147483647;
console.log((maksimum32 + 1) | 0); // -2147483648

// Bilangan bulat di number tepat hanya sampai 2^53 - 1.
console.log(Number.MAX_SAFE_INTEGER); // 9007199254740991
console.log(2 ** 53 === 2 ** 53 + 1); // true, hasilnya sudah tidak tepat

// BigInt tidak melilit pada batas itu.
console.log(2n ** 53n + 1n); // 9007199254740993n

// Pecahan: jangan memakai ===, pakai toleransi.
console.log(0.1 + 0.2); // 0.30000000000000004
console.log(0.1 + 0.2 === 0.3); // false
console.log(Math.abs(0.1 + 0.2 - 0.3) < 1e-9); // true
```

## Latihan

### Latihan 1: Komplemen dua

Tuliskan -37 dan -100 dalam komplemen dua 8 bit (langkah: balik, tambah 1). Cek dengan penjumlahan.

### Latihan 2: Membaca bit

Berapa nilai desimal `11101100` jika dibaca sebagai 8 bit **tak bertanda**, dan jika dibaca sebagai **bertanda** (komplemen dua)?

### Latihan 3: Rentang

Tulis rentang bilangan bertanda pada 12 bit dan pada 16 bit.

### Latihan 4: Melilit

Pada 8 bit bertanda, berapa hasil tersimpan untuk 127 + 1, dan untuk -128 - 1? Jelaskan dengan gagasan odometer.

### Latihan 5: Memilih tipe

Sebuah program menjumlah 100.000 nilai, masing-masing paling besar 50.000. Apakah jumlahnya muat dalam 32 bit bertanda? Tipe apa yang aman?

### Latihan 6: Pecahan

Jelaskan mengapa `0.1 + 0.2 != 0.3` tetapi `0.5 + 0.25 == 0.75` dalam komputer. Tulis cara membandingkan yang aman.

### Latihan 7: Temukan kesalahannya (C++)

Program berikut mengaku menjumlah dua bilangan bertanda dan mendeteksi luapan dengan memeriksa hasilnya. Mengapa pendekatan ini tidak dapat diandalkan di C++, dan bagaimana memperbaikinya?

```cpp
#include <iostream>
using namespace std;

int main() {
    int a = 2000000000;
    int b = 2000000000;
    int c = a + b;
    if (c < 0) {
        cout << "luapan\n";
    } else {
        cout << c << "\n";
    }
    return 0;
}
```

### Kunci singkat

- Latihan 1: -37 = `11011011`; -100: 100 = `01100100`, balik `10011011`, tambah 1 menjadi `10011100`. Cek: -128 + 16 + 8 + 4 = -100.
- Latihan 2: tak bertanda 128 + 64 + 32 + 8 + 4 = 236; bertanda 236 - 256 = -20.
- Latihan 3: 12 bit: -2048 sampai 2047; 16 bit: -32.768 sampai 32.767.
- Latihan 4: 127 + 1 menjadi -128; -128 - 1 menjadi 127 (melilit di kedua ujung).
- Latihan 5: jumlah maksimum 5.000.000.000, melebihi 2.147.483.647, sehingga tidak muat; pakai 64 bit.
- Latihan 6: 0,1 dan 0,2 tidak punya bentuk biner berhingga sehingga tersimpan terbulatkan, sedangkan 0,5, 0,25, 0,75 adalah pecahan dengan penyebut pangkat dua. Bandingkan dengan `abs(a - b) < 1e-9`.
- Latihan 7: luapan pada tipe `int` bertanda adalah perilaku tak terdefinisi, sehingga pemeriksaan sesudahnya tidak dijamin; kompiler bahkan boleh menganggapnya tidak pernah terjadi. Perbaikan: hitung dengan `long long`, atau periksa dulu seperti `a > INT_MAX - b`.

## Kesalahan umum

- Lupa menambah 1 setelah membalik bit (itu komplemen satu, bukan komplemen dua).
- Membaca bit yang sama sebagai tak bertanda padahal tipenya bertanda, atau sebaliknya.
- Memeriksa luapan sesudah menjumlah pada tipe bertanda di C++.
- Membandingkan pecahan dengan `==`.
- Menganggap `number` di JavaScript selalu tepat untuk bilangan bulat besar.

## Cek mandiri

- Bagaimana langkah membuat -x dari x dalam komplemen dua?
- Mengapa komplemen dua lebih disukai daripada bit tanda?
- Berapa rentang bilangan bertanda n bit?
- Apa yang terjadi bila 200 + 100 dijumlah dalam 8 bit tak bertanda?
- Mengapa `0.1 + 0.2` tidak persis `0.3`, dan apa pengganti `==`?

## Langkah berikutnya

Lanjutkan ke `matkom-teks-gambar-suara` untuk melihat bagaimana teks, gambar, dan suara dipecah menjadi bit.

Jembatan ke modul OSN: rumpun `dasar-pemrograman` membahas `int` dan `long long` serta luapan pada modul `dasar-pemrograman`, dan rumpun `logika-bitwise` membahas pergeseran bit dan batasnya pada modul `logika-bitwise`.
