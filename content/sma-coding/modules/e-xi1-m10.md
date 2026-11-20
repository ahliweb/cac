## Untuk siapa modul ini

Modul ini untuk murid kelas XI jalur E (komputasi kuantum), minggu `E-XI1-M10` silabus v1.4: simulator sendiri I. Prasyarat: modul `e-xi1-m9` (sirkuit satu qubit). Bagian pemrograman mensyaratkan dasar setara `A-X1-M9..M12` (C++) atau `B-X1-M9..M12` (TypeScript dengan Bun), yang tidak diindeks sebagai prasyarat modul ini; bagian konsep (vektor keadaan disimpan sebagai larik, gerbang sebagai matriks) terbuka bagi semua murid. Alat: kertas, kalkulator, dan kompilator C++ atau Bun.

Modul ini karangan penyusun dan disetujui pemilik program pada 2026-11-20 (keputusan lewat dialog; catatan tinjauan menjadi tindak lanjut revisi). Jalur E adalah pengayaan di luar rumusan capaian pembelajaran (CP). Minggu ini menyentuh butir pengayaan `F-AP-d` (program dengan struktur data kompleks memakai library atau perangkat) hanya lewat simulator vektor keadaan buatan sendiri; irisan itu tidak dihitung memenuhi CP.

Aturan AI jalur ini: AI generatif boleh dipakai dengan etika dan dicatat, tanpa data pribadi, kata sandi, atau tugas bernilai pada permintaanmu, dan tanpa akun wajib. Saran: jawab dulu sendiri, baru minta penjelasan atau petunjuk bertahap. Setiap soal `Latihan` bertanda `AI: boleh` atau `AI: tanpa AI`.

Catatan untuk guru: kedua program (C++ dan TypeScript) dijalankan penyusun dan menghasilkan keluaran yang sama persis. Versi alat per 2026-11-19: `g++` dan Bun sebagaimana terpasang di mesin penyusun; sebutkan versi yang dipakai kelas bila perlu. Simulator ini memakai amplitudo real; bilangan kompleks ditunda ke jalur lanjutan.

## Ingat kembali

Jawab dari ingatan, baru cek di bagian kunci.

1. Mengapa jumlah kuadrat komponen vektor yang sudah dinormalkan sama dengan 1? (dari `e-xi1-m2`)
2. Mengapa histogram 1000 shot dari keadaan `(0,6 ; 0,8)` tidak persis 360 dan 640? (dari `e-xi1-m7`)
3. Tulis sirkuit H, Z, H sebagai satu matriks: gerbang mana yang ditulis paling kanan, dan apa hasilnya? (dari `e-xi1-m9`)

## Tujuan

Setelah modul ini kamu dapat:

- menyimpan vektor keadaan satu qubit sebagai larik dua bilangan;
- menyimpan gerbang sebagai matriks 2 x 2 dan menerapkannya pada vektor dengan kode;
- memeriksa dalam kode bahwa keadaan hasil masih sah;
- menjalankan sirkuit di simulatormu dan mencocokkannya dengan hitungan tangan.

## Prediksi dulu

Sebuah simulator menyimpan keadaan sebagai larik `(a0, a1)` dan menerapkan gerbang dengan perkalian matriks-vektor. Sebelum membaca contoh, tebak dan tulis: (1) berapa bilangan yang disimpan untuk keadaan satu qubit, dan berapa untuk satu gerbang; (2) bila simulator menerapkan H lalu H pada `(1, 0)`, apa yang tercetak; (3) mengapa simulator perlu memeriksa jumlah kuadrat hasilnya.

## Contoh terselesaikan

**Penyimpanan.** Keadaan satu qubit adalah dua amplitudo, jadi cukup larik berisi dua `double`. Gerbang adalah matriks 2 x 2, yaitu empat bilangan. Kita memakai larik di dalam larik agar fungsi `terapkan` yang sama nanti bisa dipakai untuk vektor yang lebih panjang (`e-xi1-m12`).

**Menerapkan gerbang.** Fungsi `terapkan` melakukan persis hitungan tangan dari `e-xi1-m8`: komponen hasil ke-`baris` adalah hasil kali dalam baris itu dengan vektor keadaan. Sirkuit adalah pemanggilan `terapkan` berurutan: gerbang pertama di bagian dalam, gerbang terakhir di bagian luar.

**Memeriksa keadaan sah.** Fungsi `jumlahKuadrat` menjumlahkan kuadrat amplitudo (`e-xi1-m5`). Fungsi `sah` membandingkannya dengan 1 dengan toleransi `1e-9`, bukan dengan `==`, karena bilangan pecahan di komputer menyimpan galat pembulatan kecil. Simulator yang baik menandai keadaan yang tidak sah; matriks `[[1, 1], [1, 1]]` pada `(1, 0)` memberi jumlah kuadrat 2 dan ditandai.

**C++ (jalur A).**

```cpp
#include <cmath>
#include <iomanip>
#include <iostream>
#include <string>
#include <vector>

using Vektor = std::vector<double>;  // vektor keadaan: satu amplitudo per hasil
using Matriks = std::vector<Vektor>; // matriks gerbang: baris demi baris

const double H1 = 1.0 / std::sqrt(2.0);

const Matriks X = {{0, 1}, {1, 0}};
const Matriks Z = {{1, 0}, {0, -1}};
const Matriks H = {{H1, H1}, {H1, -H1}};

// Hasil = matriks kali vektor: tiap komponen adalah hasil kali dalam satu baris dengan vektor.
Vektor terapkan(const Matriks& gerbang, const Vektor& keadaan) {
    Vektor hasil(keadaan.size(), 0.0);
    for (size_t baris = 0; baris < gerbang.size(); baris++) {
        for (size_t kolom = 0; kolom < keadaan.size(); kolom++) {
            hasil[baris] += gerbang[baris][kolom] * keadaan[kolom];
        }
    }
    return hasil;
}

double jumlahKuadrat(const Vektor& keadaan) {
    double total = 0;
    for (double amplitudo : keadaan) total += amplitudo * amplitudo;
    return total;
}

bool sah(const Vektor& keadaan) {
    return std::fabs(jumlahKuadrat(keadaan) - 1.0) < 1e-9;
}

void tampilkan(const std::string& label, const Vektor& keadaan) {
    std::cout << label << ": (" << keadaan[0] << ", " << keadaan[1] << ")  P(0) = "
              << keadaan[0] * keadaan[0] << "  P(1) = " << keadaan[1] * keadaan[1]
              << (sah(keadaan) ? "  sah" : "  TIDAK SAH") << "\n";
}

int main() {
    std::cout << std::fixed << std::setprecision(4);
    Vektor nol = {1, 0};

    tampilkan("awal |0>", nol);
    tampilkan("H", terapkan(H, nol));
    tampilkan("H lalu H", terapkan(H, terapkan(H, nol)));
    tampilkan("H, Z, H", terapkan(H, terapkan(Z, terapkan(H, nol))));
    tampilkan("X lalu H", terapkan(H, terapkan(X, nol)));

    // Matriks yang bukan gerbang: [[1, 1], [1, 1]] tidak mempertahankan panjang.
    Matriks rusak = {{1, 1}, {1, 1}};
    tampilkan("matriks [[1,1],[1,1]] pada |0>", terapkan(rusak, nol));

    // Gerbang putaran bilangan real dengan sudut 60 derajat.
    const double PI = std::acos(-1.0);
    double sudut = PI / 3;
    Matriks putar = {{std::cos(sudut), -std::sin(sudut)}, {std::sin(sudut), std::cos(sudut)}};
    tampilkan("putar 60 derajat pada |0>", terapkan(putar, nol));
    return 0;
}
```

Keluaran asli (dijalankan penyusun dengan `g++ -std=c++17 -Wall -Wextra`):

```text
awal |0>: (1.0000, 0.0000)  P(0) = 1.0000  P(1) = 0.0000  sah
H: (0.7071, 0.7071)  P(0) = 0.5000  P(1) = 0.5000  sah
H lalu H: (1.0000, 0.0000)  P(0) = 1.0000  P(1) = 0.0000  sah
H, Z, H: (0.0000, 1.0000)  P(0) = 0.0000  P(1) = 1.0000  sah
X lalu H: (0.7071, -0.7071)  P(0) = 0.5000  P(1) = 0.5000  sah
matriks [[1,1],[1,1]] pada |0>: (1.0000, 1.0000)  P(0) = 1.0000  P(1) = 1.0000  TIDAK SAH
putar 60 derajat pada |0>: (0.5000, 0.8660)  P(0) = 0.2500  P(1) = 0.7500  sah
```

**TypeScript dengan Bun (jalur B).** Isinya sama; keluarannya sama persis dengan versi C++ (dijalankan penyusun dengan `bun`, dibandingkan baris demi baris).

```ts
type Vektor = number[];
type Matriks = number[][];

const H1 = 1 / Math.sqrt(2);
const X: Matriks = [[0, 1], [1, 0]];
const Z: Matriks = [[1, 0], [0, -1]];
const H: Matriks = [[H1, H1], [H1, -H1]];

// Hasil = matriks kali vektor: tiap komponen adalah hasil kali dalam satu baris dengan vektor.
function terapkan(gerbang: Matriks, keadaan: Vektor): Vektor {
  const hasil: Vektor = new Array(keadaan.length).fill(0);
  for (let baris = 0; baris < gerbang.length; baris++) {
    for (let kolom = 0; kolom < keadaan.length; kolom++) {
      hasil[baris] += gerbang[baris][kolom] * keadaan[kolom];
    }
  }
  return hasil;
}

function jumlahKuadrat(keadaan: Vektor): number {
  return keadaan.reduce((total, amplitudo) => total + amplitudo * amplitudo, 0);
}

function sah(keadaan: Vektor): boolean {
  return Math.abs(jumlahKuadrat(keadaan) - 1) < 1e-9;
}

function tampilkan(label: string, k: Vektor): void {
  console.log(
    `${label}: (${k[0].toFixed(4)}, ${k[1].toFixed(4)})  P(0) = ${(k[0] * k[0]).toFixed(4)}  P(1) = ${(k[1] * k[1]).toFixed(4)}${sah(k) ? "  sah" : "  TIDAK SAH"}`,
  );
}

const nol: Vektor = [1, 0];
tampilkan("awal |0>", nol);
tampilkan("H", terapkan(H, nol));
tampilkan("H lalu H", terapkan(H, terapkan(H, nol)));
tampilkan("H, Z, H", terapkan(H, terapkan(Z, terapkan(H, nol))));
tampilkan("X lalu H", terapkan(H, terapkan(X, nol)));
tampilkan("matriks [[1,1],[1,1]] pada |0>", terapkan([[1, 1], [1, 1]], nol));
const sudut = Math.PI / 3;
const putar: Matriks = [[Math.cos(sudut), -Math.sin(sudut)], [Math.sin(sudut), Math.cos(sudut)]];
tampilkan("putar 60 derajat pada |0>", terapkan(putar, nol));
```

**Bacaan hasil.** H lalu H kembali ke `|0>`, H, Z, H memberi `|1>` (cocok dengan `e-xi1-m9`), dan X lalu H memberi `(0,7071 ; -0,7071)` (cocok dengan `e-xi1-m8`). Gerbang putar 60 derajat memberi `(0,5 ; 0,866)`, yaitu peluang 0,25 dan 0,75: matriks putaran bilangan real juga mempertahankan panjang, sehingga ia gerbang yang sah.

## Contoh setengah jadi

Lengkapi (kunci di bagian akhir).

1. Keadaan satu qubit disimpan dalam larik berukuran ____, gerbang dalam matriks ____ x ____.
2. Lengkapi perkalian matriks-vektor:

```cpp setengah-jadi
Vektor terapkan(const Matriks& gerbang, const Vektor& keadaan) {
    Vektor hasil(keadaan.size(), 0.0);
    for (size_t baris = 0; baris < gerbang.size(); baris++) {
        for (size_t kolom = 0; kolom < keadaan.size(); kolom++) {
            hasil[____] += gerbang[____][____] * keadaan[____];
        }
    }
    return hasil;
}
```

3. Lengkapi pemeriksaan sah: `return std::fabs(jumlahKuadrat(keadaan) ____ 1.0) < ____;`

## Soal Parsons

Susun baris-baris di bawah (sudah diacak) menjadi fungsi `jumlahKuadrat` yang benar. Penjorokan sengaja dihilangkan.

```text
(a) double jumlahKuadrat(const Vektor& keadaan) {
(b) double total = 0;
(c) for (double amplitudo : keadaan) total += amplitudo * amplitudo;
(d) return total;
(e) }
```

## Latihan

1. **Prediksi keluaran.** (`AI: tanpa AI`) Bila `main` ditambah `tampilkan("X lalu Z", terapkan(Z, terapkan(X, nol)));`, apa yang tercetak? Tulis dulu, baru jalankan.
2. **Gerbang baru.** (`AI: boleh`) Matriks `[[0,6 ; 0,8], [0,8 ; -0,6]]` dipakai pada `(1, 0)`, `(0, 1)`, dan `(0,6 ; 0,8)`. Dengan tangan lalu dengan program, apakah ia gerbang yang sah?
3. **Sudut lain.** (`AI: boleh`) Ubah sudut putaran menjadi 90 derajat. Apa hasilnya pada `|0>`, dan apa gerbang yang dikenal yang mirip?
4. **Rancang dulu.** (`AI: boleh`) Tulis pseudocode fungsi `jalankanSirkuit` yang menerima daftar matriks gerbang dan keadaan awal, lalu mengembalikan keadaan akhir. Baru ubah menjadi kode bila mau.
5. **Catatan pemakaian AI (opsional).** Bila memakai asisten AI, catat alat, tujuan, garis besar perintah, bagian yang dipakai, dan cara memeriksa jawabannya.

## Latihan bercampur

1. Keadaan `(0,6 ; 0,8)` diberi gerbang Z. Tulis vektor hasil dan peluang membaca 0. (`e-xi1-m8`, `e-xi1-m6`)
2. Telusuri H, X, H pada `|0>` dengan tangan, lalu tebak apa yang dicetak simulatormu. (`e-xi1-m9`)
3. Keadaan `(3, 4)` dinormalkan menjadi apa, dan mengapa simulator sebaiknya memeriksanya sebelum membaca? (`e-xi1-m2`, `e-xi1-m5`)

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `e-xi1-m11` (satu minggu lagi), `e-xi1-m13` (sekitar tiga minggu lagi), dan `e-xi2-m4` (sekitar delapan minggu lagi). Jawab sekarang lalu simpan.

1. Dalam simulator, bagaimana vektor keadaan disimpan dan bagaimana satu gerbang diterapkan?
2. Bagaimana memeriksa bahwa keadaan hasil simulasi masih sah, dan mengapa tidak memakai `==`?
3. Ada berapa bilangan dalam vektor keadaan satu qubit, dan ada berapa dalam matriks gerbangnya?

## Kesalahan umum

- **"Simulator menyimpan peluang."** Simulator menyimpan amplitudo; peluang baru dihitung dengan mengkuadratkannya.
- **"Jumlah kuadrat harus persis 1, jadi `== 1.0` pasti benar."** Bilangan pecahan menyimpan galat pembulatan; bandingkan dengan toleransi kecil.
- **"Urutan pemanggilan `terapkan` tidak penting."** Gerbang pertama berada di dalam; menukar urutan menghasilkan sirkuit lain (`e-xi1-m8`).
- **"Simulator saya membuktikan qubit nyata berperilaku sama."** Simulator hanya menghitung model matematika yang kita tuliskan; ia tidak menguji perangkat kuantum.

## Cek mandiri

- [ ] Saya dapat menyimpan vektor keadaan dan matriks gerbang dalam program.
- [ ] Saya dapat menerapkan matriks pada vektor dengan kode.
- [ ] Saya dapat memeriksa keadaan sah dengan toleransi.
- [ ] Saya dapat menjalankan sirkuit di simulatorku dan mencocokkannya dengan hitungan tangan.
- [ ] Saya mencatat pemakaian AI bila saya memakainya.

## Kunci dan petunjuk

**Ingat kembali.** 1: peluang semua hasil harus berjumlah 1 dan peluang tiap hasil adalah kuadrat amplitudonya, sehingga jumlah kuadrat komponen adalah 1. 2: tiap shot acak; jumlah hasil hanya berada di sekitar harapan dengan simpangan wajar (kira-kira 15,2). 3: yang dipakai lebih dulu ditulis paling kanan; hasil `H Z H = [[0, 1], [1, 0]]`, yaitu X.

**Prediksi dulu.** (1) dua bilangan untuk keadaan, empat untuk gerbang; (2) `(1.0000, 0.0000)` dengan P(0) = 1; (3) untuk menangkap matriks yang bukan gerbang atau galat kode: hasil yang tidak sah berarti ada kesalahan.

**Contoh setengah jadi.** 1: 2; 2 x 2. 2: `hasil[baris] += gerbang[baris][kolom] * keadaan[kolom]`. 3: `-`; `1e-9`.

**Soal Parsons.** a, b, c, d, e.

**Latihan.** 1: X lalu Z pada `|0>`: X memberi `(0, 1)`, Z memberi `(0, -1)`. Tercetak: `X lalu Z: (0.0000, -1.0000)  P(0) = 0.0000  P(1) = 1.0000  sah`. 2: pada `(1, 0)` hasil `(0,6 ; 0,8)`, pada `(0, 1)` hasil `(0,8 ; -0,6)`, keduanya sah; pada `(0,6 ; 0,8)` hasil `(0,36 + 0,64 ; 0,48 - 0,48) = (1 ; 0)`, juga sah. Matriks itu mempertahankan panjang pada ketiga masukan, sehingga bisa menjadi gerbang. 3: putar 90 derajat memberi `(0, 1)` (jumlah kuadrat 1), mirip gerbang X pada `|0>`; namun matriks putarnya `[[0, -1], [1, 0]]` bukan X. 4: contoh: `k = awal; untuk tiap gerbang g dalam daftar: k = terapkan(g, k); kembalikan k`. 5: opsional.

**Latihan bercampur.** 1: Z memberi `(0,6 ; -0,8)`; P(0) = 0,36. 2: H memberi `(h, h)`, X memberi `(h, h)`, H memberi `(1, 0)`; tercetak `(1.0000, 0.0000)`. 3: `(3, 4)` dibagi panjang 5 menjadi `(0,6 ; 0,8)`; keadaan tak ternormalkan memberi peluang yang tidak berjumlah 1.

**Ulang berjarak.** 1: sebagai larik dua amplitudo; gerbang sebagai matriks 2 x 2 yang dikalikan pada vektor, baris demi baris. 2: hitung jumlah kuadrat amplitudo dan bandingkan dengan 1 dalam toleransi kecil; galat pembulatan membuat `==` tidak andal. 3: dua bilangan pada vektor, empat pada matriks.

## Langkah berikutnya

Modul berikut: `e-xi1-m11` (simulator sendiri II): menambah pembacaan dengan pembangkit acak dan histogram. Bacaan pendamping: `e-xi1-m8` dan `e-xi1-m9` untuk hitungan tangan yang kamu bandingkan dengan program.
