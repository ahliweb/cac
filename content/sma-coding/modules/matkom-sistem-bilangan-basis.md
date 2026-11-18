## Untuk siapa modul ini

Modul ini untuk siswa SMA reguler kelas X yang ingin memahami bilangan seperti yang dipahami komputer. Modul ini bagian dari seri Matematika Komputasi Dasar dan berstatus DRAF: isinya karangan penyusun, belum disetujui pemilik, dan bukan bagian dari capaian pembelajaran yang dihitung.

Prasyarat: pengantar representasi data pada minggu fondasi `FND-X1-M3` (bit, byte, konversi desimal-biner-heksadesimal secara kasar). Modul ini tidak mengulang pengantar itu, tetapi memperdalamnya.

Minggu silabus v1.1 yang berdekatan: `FND-X1-M3`, lalu jalur A `A-X1-M9` (variabel, tipe, masukan dan keluaran) atau jalur B `B-X1-M9`. Modul ini dapat dibaca sebagai bacaan mandiri atau bahan rujukan guru; tidak ada jadwal wajib.

Setelah mempelajari modul ini, kamu diharapkan bisa:

- menjelaskan nilai tempat dan membaca bilangan dalam basis 2, 8, 10, dan 16;
- mengonversi bilangan bulat antarbasis, termasuk lewat biner;
- menjumlah dan mengurangkan bilangan biner;
- menjelaskan mengapa pecahan seperti 0,1 tidak punya bentuk biner yang berhenti;
- menulis program kecil untuk konversi basis.

Bagian pokok dapat dikerjakan di kertas tanpa menulis kode. Contoh kode bersifat opsional. Contoh C++17 hanya diperiksa bisa dikompilasi, dan contoh TypeScript diperiksa penyusun secara manual dengan menjalankannya; keduanya tidak membuktikan benar untuk semua masukan.

## Ingat kembali

Jawab dari ingatan, tanpa membuka modul representasi data (`FND-X1-M3`). Cocokkan di bagian kunci.

1. Berapa nilai terbesar yang muat pada 8 bit tanpa tanda minus, dan berapa banyak nilai berbeda?
2. Ubah `00100101` ke desimal.
3. Ubah 100 ke biner 8 bit.
4. Satu simbol heksadesimal mewakili berapa bit?
5. Tuliskan tiga langkah mengubah kode warna `#FF8000` menjadi tiga angka desimal R, G, B.

## Ulasan singkat

Modul ini mengasumsikan kamu sudah pernah melihat bahwa komputer menyimpan data sebagai bit (0 atau 1), bahwa 8 bit membentuk satu byte, dan bahwa bilangan dapat ditulis dalam desimal, biner, atau heksadesimal. Di sini kita merapikan aturannya supaya berlaku untuk basis apa pun.

## Nilai tempat

Dalam bilangan desimal, setiap angka bernilai menurut posisinya. Bilangan 3.052 berarti:

3 x 1000 + 0 x 100 + 5 x 10 + 2 x 1 = 3 x 10^3 + 0 x 10^2 + 5 x 10^1 + 2 x 10^0

Angka di tiap posisi dikalikan pangkat dari **basis**. Pada desimal, basisnya 10 dan angka yang tersedia 0 sampai 9. Aturan yang sama berlaku untuk basis lain:

| Basis | Nama | Angka yang tersedia |
| --- | --- | --- |
| 2 | biner | 0, 1 |
| 8 | oktal | 0 sampai 7 |
| 10 | desimal | 0 sampai 9 |
| 16 | heksadesimal | 0 sampai 9, lalu A sampai F (A = 10, B = 11, C = 12, D = 13, E = 14, F = 15) |

Pada basis b, angka tertinggi adalah b - 1. Itu sebabnya angka `2` tidak pernah muncul dalam biner.

Untuk membedakan basis, tulis basis sebagai subskrip, misalnya 1101 basis 2 ditulis `1101₂`, atau dalam teks biasa `1101 (basis 2)`. Di kode, awalan umum: `0b` untuk biner, `0` atau `0o` untuk oktal (tergantung bahasa), `0x` untuk heksadesimal.

## Basis lain ke desimal

Kalikan tiap angka dengan pangkat basis pada posisinya, lalu jumlahkan.

`11010₂ = 1 x 16 + 1 x 8 + 0 x 4 + 1 x 2 + 0 x 1 = 26`

`745 (basis 8) = 7 x 64 + 4 x 8 + 5 x 1 = 448 + 32 + 5 = 485`

`1AF (basis 16) = 1 x 256 + 10 x 16 + 15 x 1 = 256 + 160 + 15 = 431`

Pangkat dua yang sering muncul sebaiknya dihafal: 1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024.

## Desimal ke basis lain: bagi berulang

Untuk mengubah bilangan bulat desimal ke basis b: bagi bilangan dengan b, catat **sisa**, ulangi dengan hasil bagi sampai hasil bagi 0. Baca sisa dari yang **terakhir ke yang pertama**.

Contoh: ubah 217 ke biner.

| Bilangan | Dibagi 2 | Hasil bagi | Sisa |
| --- | --- | --- | --- |
| 217 | 217 / 2 | 108 | 1 |
| 108 | 108 / 2 | 54 | 0 |
| 54 | 54 / 2 | 27 | 0 |
| 27 | 27 / 2 | 13 | 1 |
| 13 | 13 / 2 | 6 | 1 |
| 6 | 6 / 2 | 3 | 0 |
| 3 | 3 / 2 | 1 | 1 |
| 1 | 1 / 2 | 0 | 1 |

Sisa dari bawah ke atas: `11011001`. Jadi `217 = 11011001₂`.

Mengapa cara ini benar? Sisa pertama adalah angka paling kanan (posisi 2^0): ia memberi tahu apakah bilangan ganjil. Setelah dibagi dua, bilangan "bergeser satu posisi", dan sisa berikutnya adalah angka di posisi 2^1, dan seterusnya.

Pembuktian balik (pengecekan): `128 + 64 + 16 + 8 + 1 = 217`. Selalu cek hasil dengan konversi balik.

## Lewat biner: biner, oktal, dan heksadesimal

Satu angka heksadesimal tepat setara empat bit, karena 16 = 2^4. Satu angka oktal tepat setara tiga bit, karena 8 = 2^3. Karena itu konversi antara biner dan heksadesimal atau oktal tidak perlu hitungan: cukup kelompokkan bit.

Biner ke heksadesimal: kelompokkan empat bit dari kanan, lalu ubah tiap kelompok.

`11011001₂` menjadi `1101 1001`, yaitu `D` dan `9`. Hasil: `D9 (basis 16)`.

Biner ke oktal: kelompokkan tiga bit dari kanan.

`11011001₂` menjadi `011 011 001`, yaitu `3 3 1`. Hasil: `331 (basis 8)`.

Jadi `217 = 11011001₂ = D9 (basis 16) = 331 (basis 8)`. Ketiganya adalah bilangan yang sama.

Arah sebaliknya: ubah tiap angka heksadesimal menjadi empat bit. `3E8 (basis 16)` menjadi `0011 1110 1000`, yaitu `1111101000₂`, yang bernilai 1000 desimal.

Inilah alasan heksadesimal dipakai: ia **ringkas** dan mudah diterjemahkan ke biner. Satu byte (8 bit) selalu persis dua angka heksadesimal, dari `00` sampai `FF` (0 sampai 255).

## Mengapa komputer memakai basis 2

Perangkat keras paling mudah dibuat andal dengan dua keadaan: ada tegangan atau tidak ada, magnet ke satu arah atau ke arah lain. Membedakan dua keadaan jauh lebih tahan terhadap gangguan daripada membedakan sepuluh tingkat tegangan. Semua data, baik bilangan, teks, gambar, maupun suara, akhirnya dinyatakan sebagai deretan bit. Manusia memakai heksadesimal atau desimal hanya sebagai penulisan yang lebih nyaman.

Satu catatan: n bit dapat membentuk 2^n pola berbeda. Dengan 8 bit ada 256 pola (0 sampai 255).

## Aritmetika biner

Penjumlahan biner sama seperti desimal, tetapi "simpanan" muncul saat jumlah kolom mencapai 2.

Aturan kolom: 0+0=0, 0+1=1, 1+0=1, 1+1=10 (tulis 0, simpan 1), 1+1+1=11 (tulis 1, simpan 1).

Contoh: `10110₂ + 1011₂` (yaitu 22 + 11).

```
  10110
+ 01011
-------
 100001
```

Dari kanan: 0+1=1; 1+1=0 simpan 1; 1+0+1=0 simpan 1; 0+1+1=0 simpan 1; 1+0+1=0 simpan 1; sisa simpanan 1. Hasil `100001₂ = 33`. Cek: 22 + 11 = 33.

Pengurangan memakai "pinjam" dengan cara yang sama. Contoh `101101₂ - 11011₂` (yaitu 45 - 27):

```
  101101
- 011011
--------
  010010
```

Hasil `10010₂ = 18`. Cek: 45 - 27 = 18.

Pergeseran: menambah satu angka 0 di kanan bilangan biner mengalikannya dengan 2, seperti menambah angka 0 di kanan bilangan desimal mengalikan dengan 10. Misalnya `1101₂ = 13`, dan `11010₂ = 26`.

## Pecahan biner secara singkat

Posisi di kanan koma bernilai 1/2, 1/4, 1/8, dan seterusnya (pangkat negatif dua).

`0,101₂ = 1/2 + 0 + 1/8 = 0,625`

Untuk mengubah pecahan desimal ke biner: kalikan bagian pecahan dengan 2, catat angka bulatnya (0 atau 1), ulangi dengan sisa pecahan sampai 0.

Contoh 0,625: 0,625 x 2 = 1,25 (catat 1); 0,25 x 2 = 0,5 (catat 0); 0,5 x 2 = 1,0 (catat 1). Hasil `0,101₂`.

Tetapi 0,1 desimal tidak berhenti: 0,1 x 2 = 0,2 (0); 0,2 x 2 = 0,4 (0); 0,4 x 2 = 0,8 (0); 0,8 x 2 = 1,6 (1); 0,6 x 2 = 1,2 (1); 0,2 x 2 = 0,4 (0) ... pola `0011` berulang tanpa akhir: `0,0001100110011...₂`. Komputer harus memotongnya sehingga hanya mendekati 0,1. Akibatnya dibahas di modul berikutnya (bilangan mengambang dan galat pembulatan).

Hanya pecahan yang penyebutnya (setelah disederhanakan) pangkat dua, seperti 1/2, 3/8, 13/16, yang punya bentuk biner berhingga.

## Contoh kode

### C++17: konversi basis (opsional)

Program ini mengubah bilangan bulat tak negatif ke basis 2 sampai 16 dengan cara bagi berulang, sama seperti tabel di atas.

**Prediksi dulu.** Sebelum membaca komentar keluaran di dalam kode, baca fungsi `keBasis` dan tulis tebakanmu: apa tiga baris yang dicetak untuk `n = 217`? Telusuri satu putaran `while` dengan basis 2 di kertas untuk membantu.

```cpp
#include <algorithm>
#include <iostream>
#include <string>
using namespace std;

string keBasis(long long n, int basis) {
    const string angka = "0123456789ABCDEF";
    if (n == 0) {
        return "0";
    }
    string hasil;
    while (n > 0) {
        hasil += angka[n % basis];
        n /= basis;
    }
    reverse(hasil.begin(), hasil.end());
    return hasil;
}

int main() {
    long long n = 217;
    cout << keBasis(n, 2) << "\n";   // 11011001
    cout << keBasis(n, 8) << "\n";   // 331
    cout << keBasis(n, 16) << "\n";  // D9
    return 0;
}
```

Sisa dikumpulkan dari yang pertama, sehingga string perlu dibalik di akhir. Pustaka bawaan juga menyediakan `stoll(teks, nullptr, basis)` untuk arah sebaliknya (teks berbasis b ke bilangan).

### TypeScript: konversi basis (opsional)

Contoh TypeScript ini diperiksa secara manual oleh penyusun dengan menjalankannya memakai Bun; ia tidak diperiksa otomatis oleh repositori.

```ts
function keBasis(n: number, basis: number): string {
  return n.toString(basis).toUpperCase();
}

function dariBasis(teks: string, basis: number): number {
  return parseInt(teks, basis);
}

console.log(keBasis(217, 2)); // 11011001
console.log(keBasis(217, 16)); // D9
console.log(dariBasis("1AF", 16)); // 431
console.log(dariBasis("745", 8)); // 485
```

## Latihan

Kerjakan di kertas dahulu. Latihan memakai soal tahap lanjut, bukan mengulang latihan fondasi (menyandikan kata atau menggambar gambar 8x8).

### Latihan 1: Ke desimal

Ubah ke desimal: (a) `101101₂`, (b) `364 (basis 8)`, (c) `2F (basis 16)`.

### Latihan 2: Dari desimal

Ubah 1000 ke biner, oktal, dan heksadesimal. Gunakan bagi berulang untuk satu basis, lalu turunkan dua basis lain lewat biner.

### Latihan 3: Lewat biner

Ubah `7C5 (basis 16)` ke oktal tanpa lewat desimal.

### Latihan 4: Aritmetika biner

Hitung `110101₂ + 10111₂` dan `100000₂ - 1011₂`. Cek hasilnya dalam desimal.

### Latihan 5: Pecahan

Ubah 0,8125 ke biner. Lalu tentukan: apakah 0,3 desimal punya bentuk biner berhingga? Berikan alasan.

### Latihan 6: Banyak pola

Berapa bilangan berbeda yang dapat disimpan dalam 10 bit? Berapa angka heksadesimal yang dibutuhkan untuk menulis nilai terbesarnya?

### Latihan 7: Kode (opsional)

Tulis fungsi yang menerima teks biner (misalnya `"101101"`) dan mengembalikan nilai desimalnya tanpa memakai fungsi konversi bawaan. Petunjuk: telusuri dari kiri; tiap angka baru, kalikan hasil sementara dengan 2 lalu tambahkan angka itu.

### Latihan 8: Susun program (soal Parsons)

Baris fungsi `keBasis` berikut tercampur (bagian `if (n == 0)` dilewati). Susun menjadi badan fungsi yang benar. Tiap baris dipakai satu kali.

```text
(a) reverse(hasil.begin(), hasil.end());
(b) hasil += angka[n % basis];
(c) while (n > 0) {
(d) n /= basis;
(e) return hasil;
(f) string hasil;
(g) }
```

### Latihan 9: Lengkapi kode (soal setengah jadi)

Lengkapi fungsi yang mengubah teks biner menjadi nilai (tanpa fungsi konversi bawaan), memakai gagasan dari Latihan 7:

```text
long long dariBiner(const string& teks) {
    long long hasil = 0;
    for (char c : teks) {
        hasil = hasil * ____ + (c - '____');
    }
    return hasil;
}
```

### Latihan bercampur dan ulang berjarak

Kerjakan tanpa melihat catatan.

1. Ubah `0b11010110` ke heksadesimal tanpa lewat desimal, lalu ke desimal. Selain itu, ubah 0,375 ke biner.
2. Sebuah gambar 8x8 hitam-putih disimpan sebagai 8 byte. Satu baris bernilai `A5` heksadesimal; gambarlah baris itu (1 = hitam). (dari modul representasi data)
3. Mengapa `0,1` desimal tidak punya bentuk biner yang berhenti, padahal `0,5` punya? Jelaskan dengan kata-katamu. (Penjelasan diri.)
4. Temukan kesalahannya: murid fiktif menulis `1010 + 110 = 10010`. Cek dengan desimal: apa yang salah, dan berapa hasil yang benar?

Jadwal ulang: jawab lagi tanpa catatan setelah satu hari dan setelah satu minggu; ganti angkanya. Soal serupa muncul lagi di awal modul bilangan bertanda.

### Kunci singkat

- Latihan 1: (a) 45; (b) 3 x 64 + 6 x 8 + 4 = 244; (c) 2 x 16 + 15 = 47.
- Latihan 2: `1111101000₂`, `1750 (basis 8)`, `3E8 (basis 16)`. Cek: 3 x 256 + 14 x 16 + 8 = 1000.
- Latihan 3: `7C5` menjadi `0111 1100 0101`; regrup tiga bit dari kanan: `011 111 000 101`, yaitu `3705 (basis 8)`.
- Latihan 4: `110101₂ + 10111₂ = 1001100₂` (53 + 23 = 76); `100000₂ - 1011₂ = 10101₂` (32 - 11 = 21).
- Latihan 5: `0,1101₂`. Untuk 0,3: tidak berhingga, karena 3/10 setelah disederhanakan punya faktor 5 pada penyebut, bukan hanya pangkat dua.
- Latihan 6: 2^10 = 1024 bilangan (0 sampai 1023). Nilai terbesar 1023 = `3FF (basis 16)`, tiga angka.
- Latihan 7: awalnya hasil 0; untuk `"101101"` hasil berturut-turut 1, 2, 5, 11, 22, 45.
- Latihan 8: urutan (f), (c), (b), (d), (g), (a), (e). Bila `reverse` ditaruh di dalam perulangan, hasilnya kacau; bila `n /= basis` terlupa, perulangan tak berhenti. Jalankan urutanmu pada `n = 6`, basis 2 dengan tabel jejak untuk memeriksa.
- Latihan 9: `hasil * 2 + (c - '0')`. Untuk `"101"`: 1, 2, 5. Bila hasilmu salah, telusuri `"11"` dulu dengan tabel jejak.
- Ingat kembali: 1: 255; 256 nilai. 2: 37. 3: `01100100`. 4: 4 bit. 5: pisahkan `FF`, `80`, `00`; ubah tiap pasangan ke desimal (255, 128, 0). Bila ada yang salah, baca ulang bagian itu di modul `FND-X1-M3` lalu jawab lagi besok.
- Latihan bercampur: 1: `11010110` = `D6` = 214; 0,375 = `0,011` (0,375 x 2 = 0,75 (0); 0,75 x 2 = 1,5 (1); 0,5 x 2 = 1,0 (1)). 2: `A5` = `10100101`, gambar `#.#..#.#`. 3: penyebut 10 punya faktor 5, bukan hanya pangkat dua, sehingga pembagian berulang tak pernah menghasilkan sisa nol; 0,5 = 1/2 berhenti. 4: `1010` = 10 dan `110` = 6, jumlahnya 16 = `10000`, sedangkan `10010` = 18; kolom kedua, ketiga, dan keempat dari kanan masing-masing menghasilkan simpanan 1, sehingga hasil akhirnya `10000`; murid itu menghentikan rantai simpanan lebih awal. Pelajaran: konversi balik ke desimal adalah cara menguji hasil.

## Kesalahan umum

- Membaca sisa dari atas ke bawah (urutan terbalik) pada metode bagi berulang.
- Mengelompokkan bit dari kiri, bukan dari kanan, saat ke heksadesimal atau oktal. Tambahkan nol di kiri bila kelompok terakhir kurang.
- Menganggap `10` selalu "sepuluh". Dalam biner `10₂` adalah dua, dalam heksadesimal `10` adalah enam belas.
- Lupa bahwa pecahan desimal yang sederhana (0,1) tidak sederhana dalam biner.
- Menulis angka yang tidak ada di basisnya, misalnya `9` dalam oktal.

## Cek mandiri

- Mengapa angka tertinggi di basis b adalah b - 1?
- Bagaimana mengonversi `1011 0110₂` ke heksadesimal tanpa menghitung desimalnya?
- Berapa bilangan berbeda yang bisa disimpan dalam n bit?
- Mengapa 0,1 desimal tidak persis tersimpan dalam biner?

## Langkah berikutnya

Lanjutkan ke modul `matkom-bilangan-bertanda-dan-luapan` untuk bilangan negatif, komplemen dua, luapan, dan galat pembulatan, lalu ke `matkom-teks-gambar-suara`.

Jembatan ke modul OSN: nilai tempat dan sisa bagi dipakai lagi pada modul `aritmetika`, sedangkan penulisan bilangan dalam biner menjadi dasar operasi bit di modul `logika-bitwise`.
