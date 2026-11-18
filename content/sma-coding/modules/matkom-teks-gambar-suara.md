## Untuk siapa modul ini

Modul ini untuk siswa SMA reguler kelas X yang ingin tahu bagaimana teks, gambar, dan suara disimpan sebagai bit. Ia bagian dari seri Matematika Komputasi Dasar dan berstatus DRAF: karangan penyusun, belum disetujui pemilik, dan tidak dihitung sebagai pemenuhan butir capaian pembelajaran. Topiknya berdekatan dengan pengolahan media digital (butir F-LD-f), tetapi tidak dihitung sebagai pemenuhannya.

Prasyarat: pengantar representasi data di `FND-X1-M3` (teks sebagai kode karakter, gambar sebagai kisi piksel, warna RGB) dan modul `matkom-sistem-bilangan-basis` (basis 2 dan 16).

Minggu silabus v1.1 yang berdekatan: jalur A `A-X2-M2` (string) dan `A-X2-M3` (array dua dimensi); jalur B `B-X2-M2` (string dan templat) dan `B-X2-M5` (CSS dasar; warna heksadesimal). Bacaan mandiri atau rujukan guru; tanpa jadwal wajib.

Setelah mempelajari modul ini, kamu diharapkan bisa:

- menjelaskan hubungan ASCII, Unicode, titik kode, dan UTF-8;
- menjelaskan mengapa panjang teks dalam karakter tidak selalu sama dengan panjangnya dalam byte;
- menghitung ukuran gambar mentah dan memahami kedalaman warna;
- menerapkan kompresi sederhana (pengodean panjang-ulang);
- menjelaskan cuplik, laju cuplik, dan kuantisasi pada suara, serta menghitung ukuran suara mentah.

Bagian pokok dapat dikerjakan di kertas. Contoh kode opsional. Contoh C++17 hanya diperiksa bisa dikompilasi, contoh TypeScript diperiksa penyusun secara manual dengan menjalankannya; keduanya bukan bukti benar untuk semua masukan. Semua contoh teks, gambar, dan suara di modul ini fiktif atau dibuat untuk latihan.

## Ulasan singkat

Kamu sudah tahu bahwa teks disimpan sebagai kode angka per karakter, bahwa gambar adalah kisi piksel, dan bahwa warna memakai komponen merah, hijau, biru. Di sini kita memperdalamnya: aturan penyandian yang dipakai internet (UTF-8), ukuran berkas, kompresi, dan suara.

## Teks: ASCII

ASCII memberi kode 0 sampai 127 untuk huruf Latin tanpa aksen, angka, tanda baca, dan karakter kontrol. Contoh:

| Karakter | Kode desimal | Heksadesimal | Biner (8 bit) |
| --- | --- | --- | --- |
| `A` | 65 | 41 | 01000001 |
| `Z` | 90 | 5A | 01011010 |
| `a` | 97 | 61 | 01100001 |
| `0` | 48 | 30 | 00110000 |
| spasi | 32 | 20 | 00100000 |

Perhatikan dua hal berguna: huruf kecil berselisih 32 dari huruf besar yang sama (`'a' - 'A' = 32`), dan karakter `'0'` bukan angka 0 melainkan kode 48, sehingga `'7' - '0'` bernilai 7.

ASCII hanya cukup untuk bahasa Inggris. Banyak bahasa, termasuk aksara Jepang, Arab, atau huruf beraksen, butuh lebih banyak.

## Teks: Unicode dan titik kode

**Unicode** adalah daftar besar yang memberi setiap karakter satu nomor yang disebut **titik kode** (ditulis `U+` diikuti heksadesimal). Daftarnya mencakup lebih dari satu juta kemungkinan nomor. Contoh:

| Karakter | Titik kode |
| --- | --- |
| `A` | U+0041 |
| `é` | U+00E9 |
| `€` | U+20AC |
| `日` | U+65E5 |
| emoji wajah tersenyum | U+1F600 |

Titik kode 0 sampai 127 sama persis dengan ASCII, sehingga ASCII adalah bagian dari Unicode.

Titik kode hanyalah nomor. **Penyandian** menentukan bagaimana nomor itu disimpan sebagai byte.

## Teks: UTF-8

UTF-8 adalah penyandian paling umum di web. Ia memakai **1 sampai 4 byte** per karakter:

| Rentang titik kode | Banyak byte | Pola bit |
| --- | --- | --- |
| U+0000 sampai U+007F | 1 | `0xxxxxxx` |
| U+0080 sampai U+07FF | 2 | `110xxxxx 10xxxxxx` |
| U+0800 sampai U+FFFF | 3 | `1110xxxx 10xxxxxx 10xxxxxx` |
| U+10000 sampai U+10FFFF | 4 | `11110xxx 10xxxxxx 10xxxxxx 10xxxxxx` |

Huruf `x` diisi bit-bit titik kode. Byte pertama menunjukkan berapa byte karakter itu (jumlah angka 1 di awal), dan byte lanjutan selalu diawali `10`.

### Contoh dikerjakan: `é` (U+00E9)

1. U+00E9 = 233 = `11101001` (8 bit), termasuk rentang 2 byte.
2. Pola 2 byte punya 11 tempat bit; isi dari kanan dan sisanya nol di kiri: `00011 101001`.
3. Masukkan ke pola: `110`+`00011` = `11000011` (C3), dan `10`+`101001` = `10101001` (A9).

Hasil: byte `C3 A9`. Jadi `é` memakai 2 byte.

### Contoh dikerjakan: `€` (U+20AC)

U+20AC = `0010 0000 1010 1100` (16 bit). Termasuk rentang 3 byte (16 tempat bit): `0010 000010 101100`. Masukkan ke pola: `11100010` (E2), `10000010` (82), `10101100` (AC). Hasil: `E2 82 AC`, yaitu 3 byte.

Emoji U+1F600 memakai 4 byte: `F0 9F 98 80`.

### Panjang karakter tidak sama dengan panjang byte

| Teks | Banyak karakter (titik kode) | Banyak byte UTF-8 |
| --- | --- | --- |
| `Indonesia` | 9 | 9 |
| `café` | 4 | 5 |
| `日本` | 2 | 6 |

Akibat nyata: fungsi yang menghitung panjang string di sebagian bahasa menghitung **byte** (misalnya `std::string::size()` di C++), di bahasa lain menghitung **unit penyandian** (misalnya `string.length` di JavaScript yang menghitung unit 16 bit, sehingga emoji dihitung 2). Selalu cek apa yang dihitung fungsi yang kamu pakai, terutama untuk batas panjang kolom isian atau pemotongan teks.

## Gambar raster

Gambar raster adalah kisi piksel. Tiap piksel menyimpan warna.

**Kedalaman warna** adalah banyak bit per piksel:

| Kedalaman | Banyak warna | Catatan |
| --- | --- | --- |
| 1 bit | 2 | hitam dan putih |
| 8 bit | 256 | satu kanal abu-abu, atau palet 256 warna |
| 24 bit | 16.777.216 | RGB: 8 bit tiap merah, hijau, biru |

Warna RGB 24 bit sering ditulis sebagai `#RRGGBB` dalam heksadesimal; tiap pasang angka adalah satu byte (0 sampai 255). Contoh:

- `#FF8000`: merah 255, hijau 128, biru 0 (oranye).
- `#808080`: abu-abu sedang (ketiganya 128).
- `#000000` hitam, `#FFFFFF` putih.

**Ukuran gambar mentah** = lebar x tinggi x byte per piksel. Foto 1920 x 1080 piksel pada 24 bit: 1920 x 1080 x 3 = 6.220.800 byte, sekitar 5,93 MiB (dibagi 1.048.576). Karena itulah gambar hampir selalu dikompresi.

Hubungan dengan pemrograman: gambar adalah **array dua dimensi** (baris dan kolom) yang tiap selnya satu piksel.

## Kompresi dasar: pengodean panjang-ulang

Kompresi mengurangi ukuran dengan memakai pola. **Pengodean panjang-ulang** (run-length encoding, RLE) mengganti deretan nilai yang sama dengan pasangan (banyak, nilai).

Contoh: `AAAABBBCCD` menjadi `4A3B2C1D` (10 karakter menjadi 8). Cocok untuk gambar dengan blok warna besar yang sama.

Perhatikan bahwa RLE bisa **memperbesar** data yang jarang berulang: `ABCD` menjadi `1A1B1C1D` (4 menjadi 8). Tidak ada kompresi yang baik untuk semua data.

Kompresi **tanpa kehilangan** bisa dibalik persis (RLE termasuk). Kompresi **dengan kehilangan** (seperti banyak format foto dan musik) membuang detail yang sulit dikenali manusia dan tidak bisa dikembalikan persis.

## Suara

Suara adalah gelombang tekanan yang kontinu. Untuk menyimpannya, komputer:

1. **Mencuplik** (sampling): mengukur tinggi gelombang berulang kali pada selang waktu tetap. Banyak cuplikan per detik disebut **laju cuplik**, dalam hertz (Hz). CD memakai 44.100 Hz.
2. **Mengkuantisasi**: membulatkan tiap ukuran ke salah satu dari 2^b tingkat, dengan b bit per cuplikan. 8 bit memberi 256 tingkat; 16 bit memberi 65.536 tingkat.

Laju cuplik lebih tinggi menangkap bunyi bernada tinggi; secara umum laju cuplik harus lebih dari dua kali frekuensi tertinggi yang ingin ditangkap. Bit lebih banyak menghaluskan bunyi (galat pembulatan lebih kecil).

**Ukuran suara mentah** = laju cuplik x byte per cuplikan x banyak kanal x lama (detik). Contoh: 44.100 x 2 byte x 2 kanal (stereo) x 60 detik = 10.584.000 byte, sekitar 10 MB per menit. Contoh lain: 8.000 Hz, 8 bit, mono (1 kanal), 10 detik = 80.000 byte.

Contoh kuantisasi: gelombang bernilai 0,5 pada skala -1 sampai 1, dengan 3 bit (8 tingkat bernomor 0 sampai 7). Geser ke skala 0 sampai 1: (0,5 + 1) / 2 = 0,75. Kalikan 7: 5,25. Bulatkan: tingkat 5. Selisih 0,25 tingkat adalah galat kuantisasi.

## Contoh kode

### C++17: panjang karakter dan RLE (opsional)

Program ini menghitung byte dan karakter UTF-8 pada teks yang ditulis dengan kode byte eksplisit, serta mengkodekan RLE.

```cpp
#include <iostream>
#include <string>
using namespace std;

// Menghitung karakter UTF-8: byte lanjutan berpola 10xxxxxx tidak dihitung.
int hitungKarakter(const string& s) {
    int n = 0;
    for (unsigned char c : s) {
        if ((c & 0xC0) != 0x80) {
            n++;
        }
    }
    return n;
}

string rle(const string& s) {
    string hasil;
    size_t i = 0;
    while (i < s.size()) {
        size_t j = i;
        while (j < s.size() && s[j] == s[i]) {
            j++;
        }
        hasil += to_string(j - i);
        hasil += s[i];
        i = j;
    }
    return hasil;
}

int main() {
    string kafe = "caf\xC3\xA9";  // "café" ditulis dengan byte UTF-8 eksplisit
    cout << kafe.size() << " byte, " << hitungKarakter(kafe) << " karakter\n";  // 5 byte, 4 karakter
    cout << rle("AAAABBBCCD") << "\n";  // 4A3B2C1D
    return 0;
}
```

Operator bit `&` di atas hanya dipakai sebagai alat; pembahasan operasi bit sendiri ada di pengayaan kelas XI dan modul `logika-bitwise`.

### TypeScript: byte UTF-8 dan RLE (opsional)

Contoh TypeScript ini diperiksa secara manual oleh penyusun dengan menjalankannya memakai Bun; tidak diperiksa otomatis oleh repositori.

```ts
const pengode = new TextEncoder();

function ringkas(teks: string): string {
  const karakter = [...teks].length; // menghitung titik kode
  const byteUtf8 = pengode.encode(teks).length;
  return `${teks}: ${karakter} karakter, ${byteUtf8} byte`;
}

console.log(ringkas("Indonesia")); // 9 karakter, 9 byte
console.log(ringkas("café")); // 4 karakter, 5 byte
console.log(ringkas("日本")); // 2 karakter, 6 byte
console.log("😀".length); // 2: length menghitung unit 16 bit

function rle(teks: string): string {
  let hasil = "";
  let i = 0;
  while (i < teks.length) {
    let j = i;
    while (j < teks.length && teks[j] === teks[i]) {
      j++;
    }
    hasil += `${j - i}${teks[i]}`;
    i = j;
  }
  return hasil;
}

console.log(rle("AAAABBBCCD")); // 4A3B2C1D
```

## Latihan

Soal berikut sengaja berbeda dari latihan fondasi (menyandikan kata, menggambar 8x8) dan menuntut tahap lanjut.

### Latihan 1: ASCII

Berapa kode ASCII `'M'` jika `'A'` = 65? Berapa kode `'m'`? Berapa nilai `'8' - '0'`?

### Latihan 2: UTF-8

Tuliskan byte UTF-8 untuk `ñ` (U+00F1). Petunjuk: rentang 2 byte; 0xF1 = `11110001`.

### Latihan 3: Karakter dan byte

Hitung banyak karakter dan banyak byte UTF-8 untuk `aku ❤` (spasi dihitung; `❤` titik kode U+2764 berada di rentang 3 byte).

### Latihan 4: Ukuran gambar

Gambar 800 x 600 piksel, 24 bit, mentah. Berapa byte? Berapa kira-kira bila hanya 8 bit per piksel?

### Latihan 5: Warna

Ubah `#3366CC` ke tiga angka desimal (merah, hijau, biru). Berapa banyak warna berbeda pada 24 bit?

### Latihan 6: RLE

Kodekan `WWWWWWBBWWW` dengan RLE. Lalu dekode `3x2y5z`. Beri satu contoh teks yang justru membesar saat di-RLE.

### Latihan 7: Suara

Rekaman mono, 16 bit, 22.050 Hz, 30 detik. Berapa byte mentahnya? Berapa banyak tingkat kuantisasi yang tersedia?

### Kunci singkat

- Latihan 1: 'M' = 77; 'm' = 109; `'8' - '0'` = 8.
- Latihan 2: 241 = `11110001`; diisi ke 11 tempat bit menjadi `00011 110001`. Byte pertama `110`+`00011` = `11000011` (C3), byte kedua `10`+`110001` = `10110001` (B1). Hasil `C3 B1`.
- Latihan 3: 5 karakter; byte: `aku ` 4 byte + 3 byte = 7 byte.
- Latihan 4: 800 x 600 x 3 = 1.440.000 byte; pada 8 bit: 480.000 byte.
- Latihan 5: `33` = 51, `66` = 102, `CC` = 204; 16.777.216 warna (2^24).
- Latihan 6: `6W2B3W`; `3x2y5z` menjadi `xxxyyzzzzz`; contoh membesar: `ABCD` menjadi `1A1B1C1D`.
- Latihan 7: 22.050 x 2 x 1 x 30 = 1.323.000 byte; 65.536 tingkat.

## Kesalahan umum

- Mengira satu karakter selalu satu byte.
- Mengira `length` string selalu menghitung karakter yang terlihat (emoji dan huruf beraksen dapat berbeda).
- Mengira kompresi selalu mengecilkan data.
- Mencampur kedalaman warna (bit per piksel) dengan banyak kanal (RGB punya tiga kanal).
- Memotong string UTF-8 pada byte sembarang sehingga karakter terpotong separuh.

## Cek mandiri

- Apa beda titik kode dan byte?
- Mengapa `é` memakai 2 byte dalam UTF-8 tetapi `e` hanya 1?
- Bagaimana rumus ukuran gambar mentah?
- Apa yang dilakukan laju cuplik dan apa yang dilakukan kuantisasi?
- Kapan RLE justru merugikan?

## Langkah berikutnya

Lanjutkan ke modul seri berikutnya, `matkom-logika-proposisi`, untuk bahasa logika yang dipakai dalam kondisi program.

Jembatan ke modul OSN: string dan array dua dimensi sebagai kisi piksel dilanjutkan di modul `struktur-data`.
