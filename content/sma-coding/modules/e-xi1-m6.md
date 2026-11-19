## Untuk siapa modul ini

Modul ini untuk murid kelas XI jalur E (komputasi kuantum), minggu `E-XI1-M6` silabus v1.4: superposisi dan aturan Born. Prasyarat: modul `e-xi1-m5` (qubit dan keadaan). Alat: kertas, kalkulator, dan Quirk (peramban, tanpa akun). Contoh kode opsional: C++ (jalur A) dan satu contoh TypeScript dengan Bun (jalur B); keduanya diperiksa dengan dijalankan, bukan dibuktikan benar untuk semua masukan. Amplitudo real dahulu; kompleks hanya sebagai fase.

Modul ini berstatus DRAF: karangan penyusun, belum ditinjau pemilik. Jalur E adalah pengayaan di luar rumusan capaian pembelajaran (CP); minggu ini tidak punya irisan pengayaan, jadi modul ini tidak dihitung memenuhi butir CP mana pun.

Aturan AI jalur ini: AI generatif boleh dipakai dengan etika dan dicatat, tanpa data pribadi, kata sandi, atau tugas bernilai pada permintaanmu, dan tanpa akun wajib. Saran: jawab dulu sendiri, baru minta penjelasan atau petunjuk bertahap. Setiap soal `Latihan` bertanda `AI: boleh` atau `AI: tanpa AI`.

Catatan untuk guru: tampilan Quirk (versi 2.3, per 2026-11-19) pada tautan sirkuit di modul ini dibuka penyusun lewat peramban tanpa antarmuka; makna tepat ukuran dan garis pada tampilan `Amps` tidak dibaca dari dokumentasi Quirk `[belum terverifikasi]`.

## Ingat kembali

Jawab dari ingatan, baru cek di bagian kunci.

1. Tulis `|0>` dan `|1>` sebagai vektor dan sebutkan syarat sebuah keadaan sah. (dari `e-xi1-m5`)
2. Apakah `A` kali `B` selalu sama dengan `B` kali `A`? Beri satu contoh. (dari `e-xi1-m3`)
3. Pengacak klasik dua kali dan H dua kali dimulai dari 0: mengapa hasilnya berbeda? (dari `e-xi1-m1`)

## Tujuan

Setelah modul ini kamu dapat:

- menghitung peluang hasil 0 dan 1 dari amplitudo dengan aturan Born;
- menjelaskan superposisi tanpa mengatakan "bernilai 0 dan 1 sekaligus";
- menyusun tabel peluang untuk beberapa keadaan, termasuk yang beramplitudo negatif atau kompleks;
- membandingkan tabelmu dengan tampilan `Chance` di Quirk.

## Prediksi dulu

Qubit berada pada keadaan `(0,6 ; 0,8)`. Sebelum membaca contoh, tebak dan tulis: (1) peluang membaca 0 dan peluang membaca 1; (2) peluang bila keadaannya `(0,6 ; -0,8)`: sama atau berbeda dengan nomor 1?

## Contoh terselesaikan

**Aturan Born.** Bila qubit berada pada keadaan `(a, b)` dan dibaca, hasilnya 0 dengan peluang `|a|` kuadrat dan 1 dengan peluang `|b|` kuadrat. Aturan ini disebut aturan Born; dokumentasi IBM Quantum Learning menyatakannya sebagai peluang sama dengan nilai mutlak kuadrat entri vektor keadaan. Karena keadaan sah berjumlah modulus kuadrat 1 (`e-xi1-m5`), kedua peluang otomatis berjumlah 1; itulah alasan normalisasi.

**Superposisi.** Pada `(0,6 ; 0,8)` kedua amplitudo tidak nol, sehingga keadaan itu disebut superposisi `|0>` dan `|1>`. Frasa "bernilai 0 dan 1 sekaligus" menyesatkan: tidak ada pembacaan yang memberi "sebagian 0, sebagian 1". Yang ada hanya satu hasil acak, 0 atau 1, dengan peluang dari aturan Born. Hasilnya: P(0) = 0,6 x 0,6 = 0,36 dan P(1) = 0,8 x 0,8 = 0,64. Amplitudo 0,6 **bukan** peluang 0,6.

**Tanda dan fase tidak terlihat di sini.** Untuk `(0,6 ; -0,8)` peluangnya juga 0,36 dan 0,64, karena kuadrat tidak peduli tanda. Untuk amplitudo kompleks, yang dikuadratkan adalah modulusnya, jadi `((1 + i)/2 ; (1 - i)/2)` memberi 0,5 dan 0,5. Tanda dan fase baru terlihat bila gerbang menjumlahkan amplitudo (`E-XI1-M9`).

Program berikut menghitung peluang untuk beberapa keadaan tetap, lalu untuk tiga keadaan acak sintetis. Keadaan acak dibuat dari dua bilangan acak (pembangkit dengan benih tetap) yang dinormalkan; sebarannya tidak seragam dan hanya contoh, bukan data nyata.

```cpp
#include <cmath>
#include <iomanip>
#include <iostream>
#include <random>

int main() {
    std::cout << std::fixed << std::setprecision(4);

    // Aturan Born untuk amplitudo real: P(0) = a*a, P(1) = b*b.
    double tetap[][2] = {{0.6, 0.8}, {1.0 / std::sqrt(2.0), 1.0 / std::sqrt(2.0)}, {std::sqrt(3.0) / 2.0, 0.5}, {0.6, -0.8}};
    for (auto& k : tetap) {
        std::cout << "(" << k[0] << ", " << k[1] << ") -> P(0)=" << k[0] * k[0]
                  << " P(1)=" << k[1] * k[1] << "\n";
    }

    // Keadaan acak sintetis: dua bilangan acak, lalu dinormalkan.
    std::mt19937 rng(11);
    for (int i = 1; i <= 3; i++) {
        double x = 2.0 * (rng() / 4294967296.0) - 1.0;
        double y = 2.0 * (rng() / 4294967296.0) - 1.0;
        double panjang = std::sqrt(x * x + y * y);
        double a = x / panjang;
        double b = y / panjang;
        std::cout << "acak " << i << ": (" << a << ", " << b << ") P(0)=" << a * a
                  << " P(1)=" << b * b << " jumlah=" << a * a + b * b << "\n";
    }
    return 0;
}
```

Keluaran asli (dijalankan penyusun dengan `g++ -std=c++17 -Wall -Wextra`):

```text
(0.6000, 0.8000) -> P(0)=0.3600 P(1)=0.6400
(0.7071, 0.7071) -> P(0)=0.5000 P(1)=0.5000
(0.8660, 0.5000) -> P(0)=0.7500 P(1)=0.2500
(0.6000, -0.8000) -> P(0)=0.3600 P(1)=0.6400
acak 1: (-0.5952, -0.8036) P(0)=0.3542 P(1)=0.6458 jumlah=1.0000
acak 2: (-0.9460, 0.3243) P(0)=0.8948 P(1)=0.1052 jumlah=1.0000
acak 3: (-0.1194, -0.9928) P(0)=0.0143 P(1)=0.9857 jumlah=1.0000
```

Untuk murid jalur B, keadaan tetap yang sama dalam TypeScript (diperiksa penyusun dengan `bun`, versi 1.4.4, per 2026-11):

```ts
// Aturan Born untuk amplitudo real: P(0) = a*a, P(1) = b*b.
const keadaan: [number, number][] = [
  [0.6, 0.8],
  [1 / Math.sqrt(2), 1 / Math.sqrt(2)],
  [Math.sqrt(3) / 2, 0.5],
  [0.6, -0.8],
];

for (const [a, b] of keadaan) {
  console.log(
    `(${a.toFixed(4)}, ${b.toFixed(4)}) -> P(0)=${(a * a).toFixed(4)} P(1)=${(b * b).toFixed(4)}`,
  );
}
```

Keluaran asli (`bun run m6.ts`):

```text
(0.6000, 0.8000) -> P(0)=0.3600 P(1)=0.6400
(0.7071, 0.7071) -> P(0)=0.5000 P(1)=0.5000
(0.8660, 0.5000) -> P(0)=0.7500 P(1)=0.2500
(0.6000, -0.8000) -> P(0)=0.3600 P(1)=0.6400
```

**Quirk.** Buka [tautan gerbang `Y^1/3` dan `Chance`](https://algassert.com/quirk#circuit=%7B%22cols%22:%5B%5B%22Y%5E%E2%85%93%22%5D,%5B%22Chance%22%5D%5D%7D). Gerbang itu mengubah `(1, 0)` menjadi keadaan yang peluang bacanya sama dengan keadaan `(0,8660 ; 0,5)` (hitungan penyusun; faktor fase di depan seluruh keadaan tidak mengubah peluang); kamu tidak perlu memahami gerbangnya sekarang. Penyusun melihat `Chance` 25.0% dan, pada tampilan amplitudo, dua lingkaran berbeda ukuran. `Chance` di Quirk adalah peluang membaca 1, sehingga 25% sesuai `b` kuadrat = 0,25 dan peluang membaca 0 adalah 75%, sama dengan baris ketiga tabel di atas. Bila tautan tidak membuka sirkuit, susun manual dari kotak alat dan bandingkan dengan gerbang `H` (50.0%).

## Contoh setengah jadi

Lengkapi (kunci di bagian akhir).

1. Keadaan `(0,28 ; 0,96)`: P(0) = `0,28*0,28` = ____ dan P(1) = `0,96*0,96` = ____. Jumlahnya ____.
2. Keadaan `(0,6 ; 0,8i)`: P(1) = `|0,8i|` kuadrat = ____.
3. Keadaan `(a ; 0,6)` dengan `a` positif: P(1) = ____, P(0) = ____, jadi `a` = ____.

## Soal Parsons

Susun baris-baris di bawah (sudah diacak) menjadi isi perulangan pembuat keadaan acak pada program di atas. Penjorokan dan urutan `x` sebelum `y` penting (nilai `x` diambil lebih dulu dari pembangkit).

```text
(a) double a = x / panjang;
(b) double panjang = std::sqrt(x * x + y * y);
(c) double b = y / panjang;
(d) double y = 2.0 * (rng() / 4294967296.0) - 1.0;
(e) double x = 2.0 * (rng() / 4294967296.0) - 1.0;
```

## Latihan

1. **Tabel peluang.** (`AI: tanpa AI`) Hitung P(0) dan P(1) untuk `(0,96 ; -0,28)`, `(0 ; 1)`, dan `(0,5 ; 0,8660)`.
2. **Bandingkan di Quirk.** (`AI: boleh`) Buka tautan `Y^1/3` di atas, catat `Chance`, lalu ganti dengan gerbang `H` dan catat lagi. Tulis keadaan dan tabel peluang tiap kasus.
3. **Keadaan dari dua bilangan.** (`AI: tanpa AI`) Normalkan `(3, -4)` menjadi keadaan, lalu hitung peluangnya.
4. **Rancang dulu.** (`AI: boleh`) Tulis pseudocode fungsi `peluang(a, b)` yang mengembalikan P(0) dan P(1) dan menolak masukan yang jumlahnya bukan 1 (dengan toleransi). Baru ubah menjadi kode bila mau.
5. **Catatan pemakaian AI (opsional).** Bila memakai asisten AI, catat alat, tujuan, garis besar perintah, bagian yang dipakai, dan cara memeriksa jawabannya.

## Latihan bercampur

1. Pasangan `(0,6 ; 0,7)` dikuadratkan menjadi 0,36 dan 0,49. Apakah ini distribusi peluang yang sah, dan apa yang salah dari pasangan awalnya? (`e-xi1-m5`)
2. Hitung peluang untuk `((1 + i)/2 ; (1 - i)/2)` dengan modulus kuadrat. (`e-xi1-m4`)
3. Tiga qubit yang dibaca memberi satu dari berapa hasil berbeda? Tulis semuanya. (`matkom-sistem-bilangan-basis`)

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `e-xi1-m7` (satu minggu lagi), `e-xi1-m9` (sekitar tiga minggu lagi), dan `e-xi1-m14` (sekitar delapan minggu lagi). Jawab sekarang lalu simpan.

1. Dari keadaan `(a, b)`, berapa peluang hasil 0 dan hasil 1?
2. Pada keadaan `(0,6 ; 0,8)`, berapa peluang membaca 0, dan mengapa bukan 0,6?
3. Apakah amplitudo negatif membuat peluang negatif? Jelaskan.

## Kesalahan umum

- **"Amplitudo 0,6 berarti peluang 60 persen."** Peluang adalah kuadrat: 0,36.
- **"Superposisi berarti bernilai 0 dan 1 sekaligus."** Pembacaan selalu memberi satu hasil; superposisi adalah keadaan dengan lebih dari satu amplitudo tak nol.
- **"Peluang dari jumlah amplitudo."** Untuk satu keadaan yang dibaca, peluang tiap hasil dari kuadrat amplitudonya sendiri.
- **"Tanda minus menurunkan peluang."** Pada pembacaan langsung tanda tidak berpengaruh; pengaruhnya muncul bila amplitudo dijumlahkan.
- **"Peluang 0,36 berarti tepat 36 dari 100 pembacaan."** Itu kecenderungan; hasil nyata bervariasi (`E-XI1-M7`).

## Cek mandiri

- [ ] Saya dapat menghitung P(0) dan P(1) dari amplitudo.
- [ ] Saya dapat menjelaskan superposisi tanpa "0 dan 1 sekaligus".
- [ ] Saya dapat menunjukkan bahwa tanda minus tidak mengubah peluang pembacaan langsung.
- [ ] Saya dapat membandingkan tabelku dengan `Chance` di Quirk.
- [ ] Saya mencatat pemakaian AI bila saya memakainya.

## Kunci dan petunjuk

**Ingat kembali.** 1: `|0> = (1, 0)` dan `|1> = (0, 1)`; sah bila jumlah modulus kuadrat 1. 2: tidak selalu; `A kali X` tidak sama dengan `X kali A`. 3: pengacak mencampur peluang yang tidak negatif; amplitudo H bisa negatif dan saling menghapus.

**Prediksi dulu.** (1) 0,36 dan 0,64; (2) sama: 0,36 dan 0,64. Banyak murid menebak 0,6 dan 0,8.

**Contoh setengah jadi.** 1: 0,0784; 0,9216; jumlah 1. 2: 0,64. 3: P(1) = 0,36; P(0) = 0,64; `a` = 0,8.

**Soal Parsons.** e, d, b, a, c (a dan c boleh bertukar). `x` diambil sebelum `y` karena menjadi bilangan acak pertama.

**Latihan.** 1: `(0,96 ; -0,28)`: 0,9216 dan 0,0784; `(0 ; 1)`: 0 dan 1; `(0,5 ; 0,8660)`: 0,25 dan 0,75. 2: `Y^1/3`: keadaan setara `(0,8660 ; 0,5)`, `Chance` 25.0%, P(0) = 0,75 dan P(1) = 0,25; `H`: keadaan `(0,7071 ; 0,7071)`, `Chance` 50.0%, P(0) = P(1) = 0,5. 3: panjang 5, keadaan `(0,6 ; -0,8)`, peluang 0,36 dan 0,64. 4: contoh: `p0 = |a|*|a|; p1 = |b|*|b|; jika |p0 + p1 - 1| lebih besar dari 0,000001 maka tolak; kembalikan (p0, p1)`. 5: opsional.

**Latihan bercampur.** 1: jumlahnya 0,85, bukan 1, jadi bukan distribusi sah; pasangan awal tidak dinormalkan (jumlah modulus kuadrat 0,85). 2: 0,5 dan 0,5. 3: 8 hasil: 000, 001, 010, 011, 100, 101, 110, 111.

**Ulang berjarak.** 1: P(0) adalah `|a|` kuadrat dan P(1) adalah `|b|` kuadrat. 2: 0,36; peluang adalah kuadrat amplitudo, bukan amplitudonya. 3: tidak; peluang berasal dari modulus kuadrat yang selalu tidak negatif.

## Langkah berikutnya

Modul berikut: `e-xi1-m7` (pengukuran): hasil acak, runtuhnya keadaan, dan jumlah percobaan (shot). Bacaan pendamping: `matkom-sistem-bilangan-basis`.
