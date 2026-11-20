## Untuk siapa modul ini

Modul ini untuk murid kelas XI jalur E (komputasi kuantum), minggu `E-XI2-M4` silabus v1.4: simulator sendiri III, yaitu memperluas simulator ke n qubit dan menghitung memori `2^n`. Prasyarat: modul `e-xi2-m3` (mengukur qubit terjerat). Di luar indeks, bagian kode memerlukan dasar pemrograman setara `A-X1-M9..M12` (C++) atau `B-X1-M9..M12` (TypeScript/Bun) dan simulator `E-XI1-M10` dan `E-XI1-M11`; guru memeriksanya. Bagian konsep dan hitungan memori terbuka bagi semua murid. Alat: kertas, kalkulator, dan kompilator C++17 (tanpa akun); versi TypeScript disertakan.

Modul ini karangan penyusun dan disetujui pemilik program pada 2026-11-20 (keputusan lewat dialog; catatan tinjauan menjadi tindak lanjut revisi). Jalur E adalah pengayaan di luar rumusan CP. Irisan pengayaan minggu ini `F-AP-d` tidak dihitung; modul ini tidak dihitung memenuhi butir CP mana pun.

Aturan AI jalur ini: AI generatif boleh dipakai dengan etika dan dicatat, tanpa data pribadi, kata sandi, atau tugas bernilai pada permintaanmu, dan tanpa akun wajib. Saran: jawab dulu sendiri, baru minta petunjuk bertahap; kode buatan AI kamu baca, jalankan, dan uji. Setiap soal `Latihan` bertanda `AI: boleh` atau `AI: tanpa AI`.

Catatan untuk guru: bahwa keadaan n qubit adalah vektor `2^n` komponen yang diberi indeks bit string dibaca penyusun dari halaman IBM Quantum Learning "Quantum information" (multiple systems), per 2026-11-19. Simulator karangan penyusun, dibandingkan dengan hitungan tangan `e-xi2-m1` dan `e-xi2-m2`. Memori adalah `2^n x 8` byte (amplitudo real; kompleks 16 byte). Ukuran satu `double` (8 byte) diukur dengan `sizeof`. Batas mesin lab tidak diukur.

## Ingat kembali

Jawab dari ingatan, baru cek di bagian kunci.

1. Berapa hasil CNOT pada keadaan `(h, 0, h, 0)`, dengan qubit pertama sebagai kontrol? (dari `e-xi2-m1`)
2. Pada keadaan Bell `(h, 0, 0, h)`, berapa peluang qubit pertama terbaca 0, dan bila terbaca 0, berapa peluang qubit kedua terbaca 0? (dari `e-xi2-m3`)
3. Ada berapa bilangan dalam vektor keadaan satu qubit, dan ada berapa dalam matriks gerbangnya? (dari `e-xi1-m10`)

## Tujuan

Setelah modul ini kamu dapat:

- menjelaskan bahwa keadaan n qubit adalah vektor dengan `2^n` komponen yang diberi indeks bit string, dan menghitung memorinya;
- menerapkan gerbang satu qubit pada qubit ke-k dengan memasangkan komponen yang hanya berbeda pada bit ke-k;
- menerapkan CNOT pada n qubit dengan menukar pasangan komponen;
- membangun keadaan terjerat tiga qubit dari H dan dua CNOT, lalu memeriksa hasilnya.

## Prediksi dulu

Tebak dan tulis: (1) berapa komponen untuk tiga dan sepuluh qubit; (2) berapa byte untuk vektor 30 qubit bila tiap amplitudo 8 byte; (3) berapa kali lipat memori bertambah bila satu qubit ditambahkan.

## Contoh terselesaikan

**`2^n` komponen.** Tiap qubit tambahan menggandakan jumlah hasil (2, 4, 8, ...), jadi n qubit punya `2^n` hasil dan vektor `2^n` komponen. Komponen ke-i (mulai dari 0) cocok dengan bit string biner i: untuk tiga qubit, komponen ke-5 adalah `101` karena 5 dalam biner adalah 101 (`matkom-sistem-bilangan-basis`). Qubit ke-0 adalah bit paling kiri, seperti urutan `00, 01, 10, 11` sebelumnya.

**Gerbang pada qubit ke-k.** Gerbang 2 x 2 pada qubit ke-k tidak mengubah qubit lain. Kumpulkan komponen yang berbeda hanya pada bit ke-k, yaitu pasangan `(bit k = 0, bit k = 1)`. Untuk tiap pasangan `(a, b)`, hitung `(g00*a + g01*b, g10*a + g11*b)` seperti pada satu qubit. Untuk n qubit ada `2^(n-1)` pasangan. Misalnya H pada qubit tengah dari tiga qubit memasangkan komponen `(0, 2)`, `(1, 3)`, `(4, 6)`, `(5, 7)`.

**CNOT.** Bila kontrol bernilai 1, tukar dua komponen yang berbeda hanya pada bit target; bila kontrol 0, tidak ada yang berubah. Itu sama dengan menukar komponen ketiga dan keempat pada dua qubit (`e-xi2-m1`).

**Memori.** Vektor `2^n` komponen dengan 8 byte per komponen memerlukan `2^n x 8` byte. Menambah satu qubit menggandakan memori, dan waktu tiap gerbang ikut berlipat dua karena pekerjaannya sebanding dengan `2^n`. Pada n = 30 itu 8 GiB; amplitudo kompleks memakai 16 byte per komponen. Jadi simulator vektor keadaan hanya cocok untuk n kecil. Dari sini tidak dapat disimpulkan apa pun tentang berapa qubit yang dapat dikendalikan perangkat nyata.

```cpp
#include <cmath>
#include <cstdint>
#include <cstdio>
#include <vector>

using Vektor = std::vector<double>;
using Gerbang = double[2][2];

const double h = 1.0 / std::sqrt(2.0);
const Gerbang H = {{h, h}, {h, -h}};

Vektor keadaan_awal(int n) {
    Vektor v(size_t(1) << n, 0.0);
    v[0] = 1.0;  // |00...0>
    return v;
}

// Terapkan gerbang 2 x 2 g pada qubit ke-k (0 = paling kiri), di tempat.
void gerbang_satu(Vektor& v, int n, const Gerbang& g, int k) {
    int geser = n - 1 - k;
    for (size_t i = 0; i < v.size(); i++) {
        if (((i >> geser) & 1) == 0) {         // bit qubit k bernilai 0
            size_t j = i | (size_t(1) << geser);  // pasangannya: bit itu bernilai 1
            double a = v[i], b = v[j];
            v[i] = g[0][0] * a + g[0][1] * b;
            v[j] = g[1][0] * a + g[1][1] * b;
        }
    }
}

// Bila kontrol bernilai 1, tukar dua komponen yang beda hanya pada bit target.
void cnot(Vektor& v, int n, int kontrol, int target) {
    int gk = n - 1 - kontrol;
    int gt = n - 1 - target;
    for (size_t i = 0; i < v.size(); i++) {
        if (((i >> gk) & 1) == 1 && ((i >> gt) & 1) == 0) {
            size_t j = i | (size_t(1) << gt);
            double sementara = v[i];
            v[i] = v[j];
            v[j] = sementara;
        }
    }
}

void tampilkan(const Vektor& v, int n) {
    for (size_t i = 0; i < v.size(); i++) {
        if (std::fabs(v[i]) > 1e-12) {
            std::printf("  ");
            for (int bit = n - 1; bit >= 0; bit--) std::putchar(((i >> bit) & 1) ? '1' : '0');
            std::printf(": amplitudo %+.4f, peluang %.4f\n", v[i], v[i] * v[i]);
        }
    }
}

int main() {
    // Dua qubit: keadaan Bell.
    Vektor v2 = keadaan_awal(2);
    gerbang_satu(v2, 2, H, 0);
    cnot(v2, 2, 0, 1);
    std::printf("dua qubit, H lalu CNOT:\n");
    tampilkan(v2, 2);

    // Tiga qubit: H pada qubit 0, lalu CNOT 0->1 dan 1->2.
    Vektor v3 = keadaan_awal(3);
    gerbang_satu(v3, 3, H, 0);
    cnot(v3, 3, 0, 1);
    cnot(v3, 3, 1, 2);
    std::printf("tiga qubit, H, CNOT 0->1, CNOT 1->2:\n");
    tampilkan(v3, 3);

    // H pada semua qubit: n = 12.
    int n = 12;
    Vektor v = keadaan_awal(n);
    for (int k = 0; k < n; k++) gerbang_satu(v, n, H, k);
    double jumlah = 0.0;
    for (double x : v) jumlah += x * x;
    std::printf("n = %d: %zu komponen, jumlah kuadrat %.4f, tiap peluang %.6f\n", n, v.size(), jumlah,
                v[0] * v[0]);

    // Memori vektor keadaan bila tiap amplitudo satu double (8 byte).
    std::printf("memori vektor n qubit, %zu byte per amplitudo:\n", sizeof(double));
    const int ukuran_n[4] = {10, 20, 30, 40};
    const uint64_t satuan[4] = {uint64_t(1) << 40, uint64_t(1) << 30, uint64_t(1) << 20, uint64_t(1) << 10};
    const char* nama[4] = {"TiB", "GiB", "MiB", "KiB"};
    for (int m : ukuran_n) {
        uint64_t komponen = uint64_t(1) << m;
        uint64_t byte = komponen * sizeof(double);
        int s = 0;
        while (s < 3 && byte < satuan[s]) s++;
        std::printf("  n = %d: %llu komponen, %llu byte = %g %s\n", m, (unsigned long long)komponen,
                    (unsigned long long)byte, double(byte) / double(satuan[s]), nama[s]);
    }
    return 0;
}
```

Keluaran asli (`g++ -std=c++17 -Wall -Wextra`):

```text
dua qubit, H lalu CNOT:
  00: amplitudo +0.7071, peluang 0.5000
  11: amplitudo +0.7071, peluang 0.5000
tiga qubit, H, CNOT 0->1, CNOT 1->2:
  000: amplitudo +0.7071, peluang 0.5000
  111: amplitudo +0.7071, peluang 0.5000
n = 12: 4096 komponen, jumlah kuadrat 1.0000, tiap peluang 0.000244
memori vektor n qubit, 8 byte per amplitudo:
  n = 10: 1024 komponen, 8192 byte = 8 KiB
  n = 20: 1048576 komponen, 8388608 byte = 8 MiB
  n = 30: 1073741824 komponen, 8589934592 byte = 8 GiB
  n = 40: 1099511627776 komponen, 8796093022208 byte = 8 TiB
```

Bacaan hasilnya: dua qubit memberi `(h, 0, 0, h)` seperti `e-xi2-m2`; tiga qubit hanya `000` dan `111`; n = 12 memberi 4096 peluang sama. Satu `double` memang 8 byte, sama dengan asumsi tabel memori.

**TypeScript dengan Bun (jalur B).** Versi ini setara dengan C++ dan keluarannya sama persis (dijalankan dengan `bun`, dibandingkan baris demi baris).

```ts
type Vektor = number[];
type Gerbang = number[][];

const h = 1 / Math.sqrt(2);
const H: Gerbang = [[h, h], [h, -h]];

function keadaanAwal(n: number): Vektor {
  const v: Vektor = new Array(2 ** n).fill(0);
  v[0] = 1; // |00...0>
  return v;
}

// Terapkan gerbang 2 x 2 g pada qubit ke-k (0 = paling kiri), di tempat.
function gerbangSatu(v: Vektor, n: number, g: Gerbang, k: number): void {
  const geser = n - 1 - k;
  for (let i = 0; i < v.length; i++) {
    if (((i >> geser) & 1) === 0) { // bit qubit k bernilai 0
      const j = i | (1 << geser);   // pasangannya: bit itu bernilai 1
      const a = v[i], b = v[j];
      v[i] = g[0][0] * a + g[0][1] * b;
      v[j] = g[1][0] * a + g[1][1] * b;
    }
  }
}

// Bila kontrol bernilai 1, tukar dua komponen yang beda hanya pada bit target.
function cnot(v: Vektor, n: number, kontrol: number, target: number): void {
  const gk = n - 1 - kontrol;
  const gt = n - 1 - target;
  for (let i = 0; i < v.length; i++) {
    if (((i >> gk) & 1) === 1 && ((i >> gt) & 1) === 0) {
      const j = i | (1 << gt);
      [v[i], v[j]] = [v[j], v[i]];
    }
  }
}

function tampilkan(v: Vektor, n: number): void {
  v.forEach((x, i) => {
    if (Math.abs(x) > 1e-12) {
      const tanda = x >= 0 ? "+" : "-";
      console.log(`  ${i.toString(2).padStart(n, "0")}: amplitudo ${tanda}${Math.abs(x).toFixed(4)}, peluang ${(x * x).toFixed(4)}`);
    }
  });
}

// Dua qubit: keadaan Bell.
const v2 = keadaanAwal(2);
gerbangSatu(v2, 2, H, 0);
cnot(v2, 2, 0, 1);
console.log("dua qubit, H lalu CNOT:");
tampilkan(v2, 2);

// Tiga qubit: H pada qubit 0, lalu CNOT 0->1 dan 1->2.
const v3 = keadaanAwal(3);
gerbangSatu(v3, 3, H, 0);
cnot(v3, 3, 0, 1);
cnot(v3, 3, 1, 2);
console.log("tiga qubit, H, CNOT 0->1, CNOT 1->2:");
tampilkan(v3, 3);

// H pada semua qubit: n = 12.
const n = 12;
const v = keadaanAwal(n);
for (let k = 0; k < n; k++) gerbangSatu(v, n, H, k);
const jumlah = v.reduce((s, x) => s + x * x, 0);
console.log(`n = ${n}: ${v.length} komponen, jumlah kuadrat ${jumlah.toFixed(4)}, tiap peluang ${(v[0] * v[0]).toFixed(6)}`);

// Memori vektor keadaan bila tiap amplitudo satu Float64 (8 byte).
const bytePerAmplitudo = Float64Array.BYTES_PER_ELEMENT;
console.log(`memori vektor n qubit, ${bytePerAmplitudo} byte per amplitudo:`);
const satuan: [number, string][] = [[2 ** 40, "TiB"], [2 ** 30, "GiB"], [2 ** 20, "MiB"], [2 ** 10, "KiB"]];
for (const m of [10, 20, 30, 40]) {
  const komponen = 2 ** m;
  const byte = komponen * bytePerAmplitudo;
  const [ukuran, nama] = satuan.find(([u]) => byte >= u) ?? satuan[3];
  console.log(`  n = ${m}: ${komponen} komponen, ${byte} byte = ${byte / ukuran} ${nama}`);
}
```

**Menelusuri.** Untuk tiga qubit setelah H pada qubit 0: `(h, 0, 0, 0, h, 0, 0, 0)`, komponen `000` dan `100`. CNOT 0 ke 1 menukar komponen yang qubit-0-nya 1 dan qubit-1-nya berbeda: `100` dan `110`, jadi `(h, 0, 0, 0, 0, 0, h, 0)`. CNOT 1 ke 2 menukar komponen `110` dan `111`: `(h, 0, 0, 0, 0, 0, 0, h)`.

## Contoh setengah jadi

Lengkapi (kunci di bagian akhir).

1. Untuk empat qubit ada ____ komponen; komponen ke-9 adalah bit string `____` (biner 4 digit).
2. Untuk n = 5 dan 8 byte per amplitudo, memori `2^5 x 8` = ____ byte.
3. Lengkapi pembuatan keadaan GHZ tiga qubit (qubit 0 diberi H, lalu CNOT berantai):

```cpp setengah-jadi
Vektor v = keadaan_awal(3);
gerbang_satu(v, 3, H, ____);
cnot(v, 3, 0, ____);
cnot(v, 3, ____, 2);
```

## Soal Parsons

Susun baris-baris di bawah (sudah diacak) menjadi fungsi yang membuat keadaan awal n qubit. Baris (b) sampai (d) berada di dalam fungsi; penjorokan dan `}` penutup tidak diberikan.

```text
(a) Vektor keadaan_awal(int n) {
(b) Vektor v(size_t(1) << n, 0.0);
(c) v[0] = 1.0;
(d) return v;
```

## Latihan

1. **Tabel memori.** (`AI: tanpa AI`) Lengkapi memori vektor untuk n = 5, 15, dan 25 dengan 8 byte per amplitudo, lalu ulangi dengan 16 byte (amplitudo kompleks).
2. **Telusuri pasangan.** (`AI: tanpa AI`) Untuk tiga qubit, tulis pasangan indeks yang digabung oleh H pada qubit 0 dan pada qubit 2.
3. **Titik jenuh di mesin lab.** (`AI: boleh`) Ubah n pada bagian "H pada semua qubit" menjadi 14, 16, dan 18, dan catat waktu (misalnya `std::chrono::steady_clock` di C++ atau `performance.now()` di Bun) serta, bila bisa, memori mesinmu. Berhenti bila mesin melambat atau memori hampir habis; jangan mencoba n besar (batas dari gurumu). Angka bergantung mesin; ujilah polanya: berapa kali lipat waktu bertambah per qubit tambahan?
4. **Rancang dulu.** (`AI: boleh`) Tulis pseudocode keadaan GHZ untuk n qubit (H pada qubit 0, lalu CNOT dari qubit k ke k+1).
5. **Catatan pemakaian AI (opsional).** Bila memakai asisten AI, catat alat, tujuan, garis besar perintah, bagian yang dipakai, dan cara memeriksa jawabannya.

## Latihan bercampur

1. GHZ tiga qubit dibaca 1000 shot. Perkirakan jumlah `000` dengan simpangannya, dan hasil yang tidak pernah muncul. (`e-xi1-m7`)
2. Pada keadaan GHZ tiga qubit, qubit pertama terbaca 1. Apa hasil dua qubit lainnya? (`e-xi2-m3`)
3. Komponen ke-5 dan ke-6 pada vektor tiga qubit cocok dengan bit string apa? (`matkom-sistem-bilangan-basis`)

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `e-xi2-m5` (satu minggu lagi), `e-xi2-m7` (sekitar tiga minggu lagi), dan `e-xi2-m12` (sekitar delapan minggu lagi). Jawab sekarang lalu simpan.

1. Berapa komponen vektor keadaan n qubit, dan berapa untuk n = 10?
2. Bagaimana membangun keadaan tiga qubit `(h, 0, 0, 0, 0, 0, 0, h)` dari `|000>`?
3. Berapa memori kira-kira untuk menyimpan vektor 30 qubit bila tiap amplitudo 8 byte?

## Kesalahan umum

- **"Menambah satu qubit menambah satu komponen."** Menggandakannya: `2^n`, bukan `n`.
- **"Simulator dengan 30 qubit hanya butuh 30 angka."** Ia butuh `2^30` angka; itulah sebabnya simulator vektor keadaan mencapai batas memori cepat.
- **"Qubit ke-0 adalah bit paling kanan."** Dalam modul ini qubit ke-0 adalah bit paling kiri, seperti urutan `00, 01, 10, 11`; mengubah kesepakatan mengubah letak komponen.
- **"Simulator menjalankan gerbang pada tiap qubit satu per satu di memori terpisah."** Semua qubit berbagi satu vektor; itulah mengapa keadaan terjerat dapat disimpan.

## Cek mandiri

- [ ] Saya dapat menjelaskan mengapa vektor n qubit punya `2^n` komponen.
- [ ] Saya dapat menghitung memori `2^n x 8` byte.
- [ ] Saya dapat memasangkan komponen untuk gerbang pada qubit ke-k.
- [ ] Saya dapat membangun keadaan GHZ tiga qubit dengan H dan dua CNOT.
- [ ] Saya mencatat pemakaian AI bila saya memakainya.

## Kunci dan petunjuk

**Ingat kembali.** 1: `(h, 0, 0, h)`; qubit pertama H dan kedua `|0>`, CNOT menukar komponen ketiga dan keempat. 2: peluang qubit pertama terbaca 0 adalah 0,5; bila terbaca 0, qubit kedua pasti `|0>`, jadi peluangnya 1. 3: dua bilangan pada vektor, empat pada matriks.

**Prediksi dulu.** (1) 8 dan 1024; (2) `2^30 x 8 = 8 589 934 592` byte, kira-kira 8 GiB; (3) dua kali lipat. Banyak murid menjawab bahwa memori hanya bertambah sedikit karena "hanya satu qubit".

**Contoh setengah jadi.** 1: 16 komponen; komponen ke-9 adalah `1001`. 2: `32 x 8 = 256` byte. 3: `0`, lalu `1`, lalu `1`; yaitu `gerbang_satu(v, 3, H, 0)`, `cnot(v, 3, 0, 1)`, `cnot(v, 3, 1, 2)`.

**Soal Parsons.** a, b, c, d.

**Latihan.** 1: n = 5: `256` byte (8 byte) atau `512` byte (16 byte); n = 15: `262144` byte = 256 KiB atau 512 KiB; n = 25: `268435456` byte = 256 MiB atau 512 MiB. 2: H pada qubit 0 menggabungkan `(0, 4)`, `(1, 5)`, `(2, 6)`, `(3, 7)` (komponen yang hanya beda pada bit paling kiri); H pada qubit 2 menggabungkan `(0, 1)`, `(2, 3)`, `(4, 5)`, `(6, 7)`. 3: hasil bergantung mesin; polanya waktu bertambah kira-kira dua kali per qubit tambahan (pekerjaan tiap gerbang sebanding dengan `2^n`), dan memori juga dua kali; angka pastinya milik mesinmu. 4: contoh: `v = keadaan_awal(n); gerbang_satu(v, n, H, 0); untuk k dari 0 sampai n-2: cnot(v, n, k, k+1)`. 5: opsional.

**Latihan bercampur.** 1: peluang `000` 0,5; harapan 500, simpangan akar(1000 x 0,5 x 0,5) = akar 250, kira-kira 15,8; hasil selain `000` dan `111` tidak pernah muncul. 2: kedua qubit lain terbaca 1, jadi hasil `111`. 3: komponen ke-5 adalah `101` dan ke-6 adalah `110` (5 = 101 dan 6 = 110 dalam biner).

**Ulang berjarak.** 1: `2^n` komponen; untuk n = 10 ada 1024. 2: H pada qubit 0, lalu CNOT dari qubit 0 ke 1, lalu CNOT dari qubit 1 ke 2. 3: `2^30 x 8 = 8 589 934 592` byte, kira-kira 8 GiB.

## Langkah berikutnya

Modul berikut: `e-xi2-m5` (gerbang fase dan rotasi, pengayaan): gerbang Y, S, T dan rotasi. Bacaan pendamping: `e-xi1-m10` dan `e-xi1-m11` (simulator satu qubit).
