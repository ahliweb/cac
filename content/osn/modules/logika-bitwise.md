## Untuk siapa modul ini

Modul ini untuk siswa SMA yang berlatih menuju OSN Informatika dan memakai C++17. Isinya mengikuti rumpun materi "Logika & bitwise": Boolean, tabel kebenaran, implikasi, biimplikasi dan XOR, modus ponens dan modus tollens, serta operasi bit. Pada silabus pembinaan, topik ini muncul di minggu 3 (logika, bitwise, dan kompleksitas), minggu 10 (pola bit dan bit mask dasar), minggu 16 (bitmask pada DP bila siap), dan minggu 25 (deduksi logis pada persiapan OSN-K).

Prasyarat: kamu sudah nyaman dengan variabel, `if`, `for`, fungsi, dan perbedaan `int` dengan `long long` (lihat modul "Dasar Pemrograman dengan C++").

Setelah mempelajari modul ini, kamu diharapkan bisa membuat tabel kebenaran, menilai sebuah penalaran logis sah atau tidak, membaca bilangan sebagai deretan bit, dan memakai operator bit dengan aman, termasuk untuk mewakili himpunan bagian.

Cara memakai: baca penjelasan, ketik ulang setiap contoh, ubah nilainya, lalu kerjakan latihan. Contoh kode di modul ini hanya diperiksa bisa dikompilasi (C++17); itu tidak membuktikan contoh benar untuk semua masukan, jadi tetap uji sendiri.

## Proposisi dan nilai Boolean

Proposisi adalah kalimat yang pasti bernilai benar atau salah, misalnya "7 adalah bilangan ganjil" (benar) atau "2 + 2 = 5" (salah). Kalimat perintah atau pertanyaan bukan proposisi. Nilai Boolean hanya dua: benar (`true`, ditulis 1) dan salah (`false`, ditulis 0).

Tiga penghubung dasar dan padanannya di C++:

| Penghubung | Lambang | C++ | Benar bila |
| --- | --- | --- | --- |
| Negasi (bukan) | ¬p | `!p` | p salah |
| Konjungsi (dan) | p ∧ q | `p && q` | p dan q keduanya benar |
| Disjungsi (atau) | p ∨ q | `p \|\| q` | paling sedikit satu benar |

"Atau" dalam logika bersifat inklusif: benar juga bila keduanya benar. Berbeda dengan "atau" sehari-hari pada "kopi atau teh", yang sering bermakna eksklusif (itulah XOR, dibahas di bawah).

```cpp
#include <iostream>
using namespace std;

int main() {
    int x;
    cin >> x;
    bool positif = x > 0;
    bool genap = x % 2 == 0;
    cout << (positif && genap) << " " << (positif || genap) << " " << !positif << "\n";
    return 0;
}
```

Untuk `x = 4`, keluarannya `1 1 0`. Untuk `x = -3`, keluarannya `0 0 1`.

Evaluasi hubung-singkat (short-circuit): pada `a && b`, bila `a` salah maka `b` tidak dievaluasi; pada `a || b`, bila `a` benar maka `b` tidak dievaluasi. Ini berguna untuk menjaga agar pengecekan tidak berbahaya, misalnya `b != 0 && a / b > 2` tidak akan membagi dengan nol.

## Tabel kebenaran

Tabel kebenaran mendaftar semua kombinasi nilai variabel dan nilai ekspresi untuk tiap kombinasi. Untuk `n` variabel ada `2^n` baris. Berikut tabel untuk dua variabel.

| p | q | p ∧ q | p ∨ q | p XOR q |
| --- | --- | --- | --- | --- |
| 0 | 0 | 0 | 0 | 0 |
| 0 | 1 | 0 | 1 | 1 |
| 1 | 0 | 0 | 1 | 1 |
| 1 | 1 | 1 | 1 | 0 |

Komputer dapat membuat tabel seperti itu dengan perulangan atas semua kemungkinan nilai. Teknik "coba semua kombinasi" ini dipakai lagi di bagian tentang penalaran dan himpunan bagian.

```cpp
#include <iostream>
using namespace std;

int main() {
    for (int p = 0; p <= 1; p++) {
        for (int q = 0; q <= 1; q++) {
            cout << p << " " << q << " " << (p && q) << " " << (p || q) << " " << (p != q) << "\n";
        }
    }
    return 0;
}
```

Keluarannya empat baris, sama dengan tabel di atas: `0 0 0 0 0`, `0 1 0 1 1`, `1 0 0 1 1`, `1 1 1 1 0`.

Dua ekspresi disebut ekuivalen bila tabel kebenarannya sama. Tautologi adalah ekspresi yang selalu benar; kontradiksi selalu salah. Hukum De Morgan yang berguna dalam menulis kondisi:

- ¬(p ∧ q) ekuivalen dengan ¬p ∨ ¬q, yaitu `!(p && q)` sama dengan `!p || !q`.
- ¬(p ∨ q) ekuivalen dengan ¬p ∧ ¬q, yaitu `!(p || q)` sama dengan `!p && !q`.

## Implikasi, biimplikasi, dan XOR

Implikasi "jika p maka q" (p → q) hanya salah pada satu keadaan: p benar tetapi q salah. Bila p salah, implikasinya dianggap benar (disebut benar secara hampa).

| p | q | p → q | p ↔ q | p XOR q |
| --- | --- | --- | --- | --- |
| 0 | 0 | 1 | 1 | 0 |
| 0 | 1 | 1 | 0 | 1 |
| 1 | 0 | 0 | 0 | 1 |
| 1 | 1 | 1 | 1 | 0 |

- Implikasi ekuivalen dengan ¬p ∨ q. Di C++: `!p || q`.
- Biimplikasi "p jika dan hanya jika q" (p ↔ q) benar bila p dan q bernilai sama. Di C++ untuk nilai 0/1: `p == q`.
- XOR (atau eksklusif) benar bila p dan q berbeda. XOR adalah negasi biimplikasi. Di C++ untuk nilai 0/1: `p != q` atau `p ^ q`.

Beberapa bentuk terkait implikasi p → q:

- Kontraposisi: ¬q → ¬p. Ekuivalen dengan implikasi asalnya.
- Konvers: q → p. Tidak ekuivalen dengan implikasi asalnya.
- Invers: ¬p → ¬q. Tidak ekuivalen dengan implikasi asalnya (invers ekuivalen dengan konvers).

```cpp
#include <iostream>
using namespace std;

bool implikasi(bool p, bool q) {
    return !p || q;
}

int main() {
    // "jika x habis dibagi 4 maka x genap" benar untuk setiap bilangan bulat x
    bool semuaBenar = true;
    for (int x = -20; x <= 20; x++) {
        bool p = x % 4 == 0;
        bool q = x % 2 == 0;
        if (!implikasi(p, q)) {
            semuaBenar = false;
        }
    }
    cout << semuaBenar << "\n";   // 1
    return 0;
}
```

Perhatikan: mencoba beberapa nilai hanya dapat membantah sebuah pernyataan (satu contoh penyangkal cukup), tidak membuktikannya untuk semua bilangan. Pada contoh di atas, pembuktiannya datang dari penalaran: kelipatan 4 pasti kelipatan 2.

## Modus ponens dan modus tollens

Penalaran (argumen) terdiri dari premis dan kesimpulan. Argumen disebut sah bila kesimpulannya pasti benar setiap kali semua premisnya benar.

- Modus ponens: premis "p → q" dan "p", kesimpulan "q".
  Contoh: jika hujan maka jalan basah; hujan; jadi jalan basah.
- Modus tollens: premis "p → q" dan "¬q", kesimpulan "¬p".
  Contoh: jika hujan maka jalan basah; jalan tidak basah; jadi tidak hujan.

Dua kekeliruan yang sering muncul pada soal penalaran:

- Mengafirmasi konsekuen: dari "p → q" dan "q" menyimpulkan "p". Tidak sah: jalan bisa basah karena hal lain.
- Menyangkal anteseden: dari "p → q" dan "¬p" menyimpulkan "¬q". Tidak sah dengan alasan yang sama.

Sah atau tidaknya sebuah argumen dapat diperiksa dengan tabel kebenaran: argumen sah tepat bila ekspresi (premis 1 ∧ premis 2 ∧ ...) → kesimpulan adalah tautologi.

```cpp
#include <iostream>
using namespace std;

bool implikasi(bool p, bool q) {
    return !p || q;
}

int main() {
    bool ponensSah = true;
    bool tollensSah = true;
    bool afirmasiSah = true;   // mengafirmasi konsekuen
    for (int p = 0; p <= 1; p++) {
        for (int q = 0; q <= 1; q++) {
            if (!implikasi(implikasi(p, q) && p, q)) {
                ponensSah = false;
            }
            if (!implikasi(implikasi(p, q) && !q, !p)) {
                tollensSah = false;
            }
            if (!implikasi(implikasi(p, q) && q, p)) {
                afirmasiSah = false;
            }
        }
    }
    cout << ponensSah << " " << tollensSah << " " << afirmasiSah << "\n";   // 1 1 0
    return 0;
}
```

Baris `p = 0, q = 1` adalah contoh penyangkal untuk bentuk mengafirmasi konsekuen: kedua premis benar, tetapi kesimpulannya salah.

## Operasi bit

Bilangan bulat disimpan sebagai deretan bit (0 atau 1). Bilangan 12 dalam biner adalah `1100` (8 + 4), sedangkan 10 adalah `1010` (8 + 2). Bit paling kanan disebut bit ke-0 (nilainya 1), bit di sebelahnya bit ke-1 (nilainya 2), dan seterusnya: bit ke-`i` bernilai `2^i`.

Operator bit bekerja pada setiap posisi bit secara terpisah.

| Operator | Nama | Hasil |
| --- | --- | --- |
| `a & b` | AND | bit 1 bila kedua bit 1 |
| `a \| b` | OR | bit 1 bila paling sedikit satu bit 1 |
| `a ^ b` | XOR | bit 1 bila kedua bit berbeda |
| `~a` | NOT | membalik semua bit |
| `a << k` | geser kiri | menggeser bit ke kiri sejauh `k`; setara mengalikan `2^k` bila tidak melampaui batas tipe |
| `a >> k` | geser kanan | menggeser bit ke kanan sejauh `k`; untuk nilai tak negatif setara pembagian bulat dengan `2^k` |

```cpp
#include <iostream>
using namespace std;

int main() {
    int a = 12, b = 10;               // 1100 dan 1010
    cout << (a & b) << "\n";          // 1000 = 8
    cout << (a | b) << "\n";          // 1110 = 14
    cout << (a ^ b) << "\n";          // 0110 = 6
    cout << (a << 1) << "\n";         // 11000 = 24
    cout << (a >> 2) << "\n";         // 0011 = 3
    cout << (~a) << "\n";             // -13 pada kompiler yang umum dipakai
    return 0;
}
```

Tentang `~a`: pada kompiler umum, bilangan bulat bertanda disimpan dalam komplemen dua, sehingga `~a` bernilai `-a - 1`. Karena itu `~12` adalah `-13`.

Jangan tertukar antara operator logika dan operator bit. `&&` dan `||` bekerja pada nilai benar/salah seluruh ekspresi, sedangkan `&` dan `|` bekerja pada bit. Misalnya `1 && 2` bernilai `1` (keduanya tak nol), tetapi `1 & 2` bernilai `0` (tidak ada posisi bit yang sama-sama 1).

Hati-hati urutan prioritas: operator perbandingan lebih kuat daripada `&`, `^`, dan `|`. Ekspresi `x & 1 == 0` dibaca sebagai `x & (1 == 0)`, yaitu `x & 0`, bukan "x genap". Selalu beri tanda kurung: `(x & 1) == 0`.

## Mask: mengecek, menyalakan, mematikan, dan membalik bit

Mask adalah bilangan yang bitnya dipilih untuk memilih posisi tertentu. Mask untuk bit ke-`i` adalah `1 << i`.

| Tujuan | Ekspresi |
| --- | --- |
| mengecek bit ke-`i` | `(x >> i) & 1` atau `(x & (1LL << i)) != 0` |
| menyalakan bit ke-`i` | `x \| (1LL << i)` |
| mematikan bit ke-`i` | `x & ~(1LL << i)` |
| membalik bit ke-`i` | `x ^ (1LL << i)` |

```cpp
#include <iostream>
using namespace std;

int main() {
    long long x = 10;                 // 1010
    int i = 2;
    cout << ((x >> i) & 1) << "\n";   // bit ke-2 dari 1010 adalah 0
    x = x | (1LL << i);               // 1110 = 14
    cout << x << "\n";
    x = x & ~(1LL << 1);              // matikan bit ke-1: 1100 = 12
    cout << x << "\n";
    x = x ^ (1LL << 3);               // balik bit ke-3: 0100 = 4
    cout << x << "\n";
    return 0;
}
```

Keluarannya `0`, `14`, `12`, `4`.

Beberapa pola kecil yang sering dipakai:

- `x & 1` bernilai 1 bila `x` ganjil, 0 bila genap (untuk bilangan tak negatif).
- `x & (x - 1)` mematikan bit 1 yang paling kanan. Ini dapat dipakai untuk menghitung banyak bit 1: ulangi sampai `x` menjadi 0 dan hitung banyak ulangannya.
- Untuk `x > 0`, `x & -x` menghasilkan bit 1 paling kanan saja (pada kompiler umum yang memakai komplemen dua).

```cpp
#include <iostream>
using namespace std;

int banyakBitSatu(unsigned long long x) {
    int hitung = 0;
    while (x > 0) {
        x &= x - 1;     // buang satu bit 1 paling kanan
        hitung++;
    }
    return hitung;
}

int main() {
    cout << banyakBitSatu(13) << "\n";   // 1101 -> 3
    cout << banyakBitSatu(64) << "\n";   // 1000000 -> 1
    cout << __builtin_popcountll(13ULL) << "\n";   // 3
    return 0;
}
```

`__builtin_popcountll` adalah fungsi bawaan GCC dan Clang, bukan bagian standar C++17 (standar baru, C++20, menyediakan `std::popcount`). Pada judge yang memakai g++ umumnya tersedia, tetapi memahami cara manualnya tetap penting.

## Batas dan perilaku tak terdefinisi pada pergeseran

Pergeseran paling sering menjadi sumber kesalahan tersembunyi.

- Menggeser dengan jumlah negatif, atau dengan jumlah yang sama dengan atau lebih besar daripada lebar tipe (misalnya `1 << 32` pada `int` 32 bit), adalah perilaku tak terdefinisi menurut standar C++. Hasilnya tidak boleh diandalkan.
- Pada `int` bertanda, menggeser ke kiri sampai mengenai bit tanda atau melewatinya bermasalah: untuk nilai yang tidak muat, hasilnya tidak terdefinisi. Hindari `1 << 31` pada `int`.
- Menggeser ke kanan bilangan negatif bertanda bergantung pada implementasi (pada praktiknya sering mempertahankan tanda). Untuk operasi bit murni, pakai tipe tak bertanda (`unsigned`) atau pastikan nilainya tak negatif.
- Literal `1` bertipe `int`. Untuk mask yang lebih dari 31 bit, tulis `1LL << i` agar perhitungan dilakukan dalam `long long`. Sama seperti perkalian pada modul dasar, mengubah tipe hasil tidak menolong bila operasinya sendiri sudah terjadi dalam `int`.

```cpp
#include <iostream>
using namespace std;

int main() {
    int i = 40;
    long long benar = 1LL << i;
    cout << benar << "\n";        // 1099511627776
    // int salah = 1 << i;        // perilaku tak terdefinisi: jangan dilakukan
    return 0;
}
```

## Bitmask untuk himpunan bagian

Himpunan dengan `n` elemen (n kecil, misalnya paling banyak sekitar 20) dapat diwakili oleh sebuah bilangan `mask` dengan `n` bit: bit ke-`i` bernilai 1 bila elemen ke-`i` ikut dipilih. Bilangan `0` sampai `2^n - 1` mewakili semua `2^n` himpunan bagian.

```cpp
#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> a = {2, 3, 5};
    int n = (int)a.size();
    for (int mask = 0; mask < (1 << n); mask++) {
        long long jumlah = 0;
        for (int i = 0; i < n; i++) {
            if ((mask >> i) & 1) {
                jumlah += a[i];
            }
        }
        cout << mask << " " << jumlah << "\n";
    }
    return 0;
}
```

Keluarannya delapan baris. Misalnya `mask = 5` (biner `101`) memilih elemen ke-0 dan ke-2, yaitu 2 dan 5, sehingga jumlahnya 7: baris `5 7`. Kompleksitasnya `O(2^n * n)`, sehingga hanya cocok untuk `n` kecil. Perhatikan juga bahwa `mask = 0` mewakili himpunan kosong.

Sifat XOR yang berguna: `a ^ a = 0`, `a ^ 0 = a`, dan XOR bersifat komutatif serta asosiatif. Akibatnya, bila sebuah daftar bilangan berisi setiap nilai dua kali kecuali satu nilai, XOR seluruh daftar menghasilkan nilai yang muncul sekali itu, karena pasangan yang sama saling menghapus.

```cpp
#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;
    int hasil = 0;
    for (int i = 0; i < n; i++) {
        int x;
        cin >> x;
        hasil ^= x;
    }
    cout << hasil << "\n";
    return 0;
}
```

Untuk masukan `5` lalu `7 3 7 9 9`, keluarannya `3`.

## Kesalahan umum

- Menulis `x & 1 == 0` tanpa tanda kurung, padahal perbandingan diproses lebih dulu.
- Memakai `1 << i` untuk `i >= 31` pada `int` (perilaku tak terdefinisi); seharusnya `1LL << i`.
- Mencampur `&&` dengan `&` (atau `||` dengan `|`) sehingga hasilnya berbeda dari yang dimaksud.
- Menyimpulkan "jika p maka q, q benar, jadi p benar" (mengafirmasi konsekuen), atau "p salah, jadi q salah" (menyangkal anteseden).
- Menganggap implikasi salah bila p salah; padahal implikasi dengan p salah selalu benar.
- Menggeser ke kanan bilangan negatif dan mengandalkan hasilnya.
- Mengira `~x` sama dengan `-x`; yang benar pada komplemen dua adalah `-x - 1`.

## Latihan

Latihan di bawah dibuat khusus untuk modul ini. Kerjakan di komputer atau di kertas, lalu bandingkan dengan contoh masukan dan keluaran.

### Latihan 1: Nilai satu bit

Masukan: dua bilangan bulat `N` dan `k` pada satu baris (0 <= N <= 10^18, 0 <= k <= 59). Cetak bit ke-`k` dari `N` (0 atau 1), dengan bit ke-0 adalah bit paling kanan.

Contoh masukan: `13 2`
Contoh keluaran: `1`

Contoh lain: masukan `13 1` memberi keluaran `0` (13 dalam biner adalah `1101`).

Petunjuk: perhatikan tipe data `N` dan cara membentuk mask.

### Latihan 2: Banyak bit satu

Masukan: satu bilangan bulat `N` (0 <= N <= 10^18). Cetak banyak bit 1 pada representasi binernya, tanpa memakai fungsi bawaan.

Contoh masukan: `255`
Contoh keluaran: `8`

Contoh lain: masukan `1000` memberi keluaran `6`.

### Latihan 3: Himpunan bagian berjumlah tertentu

Masukan: baris pertama berisi `n` dan `S` (1 <= n <= 20, 1 <= S <= 10^9). Baris kedua berisi `n` bilangan bulat positif, masing-masing paling besar 10^6. Cetak banyaknya himpunan bagian (berdasarkan posisi, bukan nilai) yang jumlah elemennya tepat `S`.

Contoh masukan:
```text
4 5
1 2 3 4
```
Contoh keluaran: `2`

Penjelasan: himpunan bagian `{1, 4}` dan `{2, 3}`. Contoh lain: masukan `3 3` lalu `1 2 3` memberi keluaran `2` (yaitu `{3}` dan `{1, 2}`).

Petunjuk: pakai bitmask. Pikirkan mengapa himpunan kosong tidak pernah dihitung untuk `S >= 1`.

### Latihan 4: Angka yang sendirian

Masukan: baris pertama berisi `N` (ganjil, 1 <= N <= 100.000). Baris kedua berisi `N` bilangan bulat antara 1 dan 10^9. Setiap nilai muncul tepat dua kali, kecuali satu nilai yang muncul sekali. Cetak nilai yang muncul sekali, tanpa menyimpan seluruh daftar.

Contoh masukan:
```text
5
4 1 2 1 2
```
Contoh keluaran: `4`

### Latihan 5: Logika

Kerjakan di kertas.

1. Buat tabel kebenaran untuk `(p XOR q) ↔ ¬(p ↔ q)`. Apa yang kamu simpulkan dari kolom terakhirnya?
2. Pada setiap argumen berikut, tentukan sah atau tidak sah, dan sebutkan namanya bila cocok dengan modus ponens atau modus tollens:
   - Jika sebuah bilangan habis dibagi 6 maka bilangan itu genap. Bilangan 14 genap. Jadi 14 habis dibagi 6.
   - Jika sebuah bilangan habis dibagi 6 maka bilangan itu genap. Bilangan 9 tidak genap. Jadi 9 tidak habis dibagi 6.
3. Tuliskan kontraposisi dan konvers dari "jika n prima dan n > 2 maka n ganjil". Mana yang selalu benar?

Setelah itu, periksa jawaban nomor 1 dengan program yang menelusuri semua kombinasi `p` dan `q`.

### Latihan 6: Dry-run bit

Tanpa menjalankan, tentukan keluaran program berikut untuk masukan `12 10`. Tulis `x` dan `y` dalam biner terlebih dahulu, lalu jalankan untuk memeriksa.

```cpp
#include <iostream>
using namespace std;

int main() {
    int x, y;
    cin >> x >> y;
    cout << (x & y) << " " << (x | y) << " " << (x ^ y) << " " << (x << 2) << " " << (y >> 1) << "\n";
    return 0;
}
```

### Latihan 7: Temukan kesalahannya

Program berikut dimaksudkan menghitung banyak bit 1 pada `n` (hingga 10^18), tetapi memberi hasil salah atau tidak dapat diandalkan untuk bilangan besar. Jelaskan penyebabnya dan perbaiki. Rancang satu masukan yang menunjukkan masalahnya.

```cpp
#include <iostream>
using namespace std;

int main() {
    long long n;
    cin >> n;
    int hitung = 0;
    for (int i = 0; i < 60; i++) {
        if (n & (1 << i)) {
            hitung++;
        }
    }
    cout << hitung << "\n";
    return 0;
}
```

## Cek mandiri

Setelah selesai, pastikan kamu bisa menjawab tanpa melihat catatan:

- Kapan `p → q` bernilai salah, dan bagaimana menuliskannya dengan `!` dan `||`?
- Apa beda kontraposisi, konvers, dan invers; mana yang ekuivalen dengan implikasi asalnya?
- Mengapa "jika hujan maka jalan basah; jalan basah; jadi hujan" tidak sah?
- Berapa hasil `12 & 10`, `12 | 10`, dan `12 ^ 10`, dan bagaimana menghitungnya dari biner?
- Mengapa `x & 1 == 0` bukan pengecekan genap yang benar?
- Mengapa `1 << 40` tidak boleh dipakai pada `int`, dan apa gantinya?
- Mengapa XOR seluruh daftar menemukan nilai yang muncul sekali?

## Langkah berikutnya

Lanjutkan ke topik minggu berikutnya pada silabus, lalu ulangi bitmask saat DP dan pencarian lengkap memakainya. Untuk melihat cakupan resmi dan silabus terbaru, rujuk halaman silabus OSN di bagian Rujukan. Untuk soal latihan tambahan, pilih soal dari arsip resmi lalu kerjakan sendiri; jangan menyalin soal ke dalam modul ini.
