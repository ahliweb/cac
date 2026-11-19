## Untuk siapa modul ini

Modul ini untuk murid kelas XII jalur E (komputasi kuantum), minggu `E-XII1-M5` silabus v1.4: Grover III, yaitu menghubungkan jumlah pengulangan dengan akar `N` dan membandingkannya dengan pencarian linear, dengan keluaran tabel perbandingan. Prasyarat: modul `e-xii1-m4` (Grover II) dan `matkom-pertumbuhan-fungsi`. Di luar indeks, bagian kode memerlukan simulator n qubit `e-xi2-m4` dan dasar pemrograman setara `A-X1-M9..M12` (C++) atau `B-X1-M9..M12` (TypeScript/Bun); guru memeriksanya. Bagian konsep dan hitungan terbuka bagi semua murid. Alat: kertas, kalkulator, dan simulatormu (tanpa akun).

Modul ini berstatus DRAF: karangan penyusun, belum ditinjau pemilik. Jalur E adalah pengayaan di luar rumusan CP. Irisan pengayaan minggu ini `F-BK-b` (membandingkan beberapa strategi) tidak dihitung; modul ini tidak dihitung memenuhi butir CP mana pun.

Aturan AI jalur ini: AI generatif boleh dipakai dengan etika dan dicatat, tanpa data pribadi, kata sandi, atau tugas bernilai pada permintaanmu, dan tanpa akun wajib. Saran: jawab dulu sendiri, baru minta petunjuk bertahap; kode buatan AI kamu baca, jalankan, dan uji. Setiap soal `Latihan` bertanda `AI: boleh` atau `AI: tanpa AI`.

Catatan untuk guru: bahwa tiap pengulangan memutar keadaan sebesar `2 theta` dengan `sin(theta)` sama dengan akar dari (jumlah solusi dibagi `N`), sehingga peluang setelah `t` pengulangan adalah `sin²((2t + 1) theta)`, dibaca penyusun dari halaman IBM Quantum Learning "Analysis" pada pelajaran algoritma Grover, per 2026-11-19. Halaman "Introduction" pelajaran yang sama menyebut keunggulan Grover kuadrat dan diperkirakan belum praktis dalam waktu dekat. Semua angka di bawah dihitung ulang program; modul ini tidak menjanjikan bahwa Grover bermakna dapat dijalankan di perangkat saat ini.

## Ingat kembali

Jawab dari ingatan, baru cek di bagian kunci.

1. Tuliskan operasi cermin terhadap rata-rata pada amplitudo `a_i`, lalu hitung hasilnya untuk `(0,5; 0,5; -0,5; 0,5)`. (dari `e-xii1-m4`)
2. Apa efek oracle bit dengan qubit bantu `|->` pada keadaan `|x>`? (dari `e-xii1-m2`)
3. Mengapa tanda minus pada amplitudo tidak mengubah peluang pembacaan langsung tetapi dapat mengubah hasil setelah H? (dari `e-xi2-m11`)

## Tujuan

Setelah modul ini kamu dapat:

- menghitung sudut `theta` dan jumlah pengulangan `t` yang mendekati terbaik untuk `N` dengan satu item bertanda;
- memeriksa rumus `sin²((2t + 1) theta)` terhadap simulator sampai `N = 2^20`;
- membandingkan jumlah query Grover dengan query klasik, dan menyebut bahwa selisihnya kuadrat, bukan eksponensial.

Keluaran yang diminta silabus: tabel perbandingan.

## Prediksi dulu

Tebak dan tulis: (1) jumlah pengulangan terbaik untuk `N = 1024`; (2) perkiraan untuk `N = 1.048.576`; (3) bila `N` menjadi empat kali, jumlah pengulangan menjadi berapa kali; (4) apa yang terjadi bila pengulangan ditambah jauh melewati yang terbaik.

## Contoh terselesaikan

**Geometri.** Pada keadaan dengan satu item bertanda, pengulangan Grover memutar keadaan sebesar `2 theta` pada bidang yang direntang arah tak bertanda dan arah bertanda, dengan `sin(theta) = 1/akar N`. Awalnya sudut `theta`; setelah `t` pengulangan sudutnya `(2t + 1) theta`, dan peluang item bertanda adalah `sin²((2t + 1) theta)`. Peluang mendekati 1 bila `(2t + 1) theta` dekat `90°`, jadi `t` kira-kira `pi/(4 theta) - 1/2`. Karena `theta` kira-kira `1/akar N`, `t` kira-kira `(pi/4) akar N`.

**Cek dengan `N = 8`** (`e-xii1-m4`): `theta` kira-kira 20,7°. `t = 1`: 62,1°, `sin²` = 0,7812; `t = 2`: 103,6°, 0,9453; `t = 3`: 145,0°, 0,3301. Persis angka simulasi di modul itu.

**Program.** Simulasi memakai dua operasi `balik_fase` dan `balik_rata` langsung pada vektor, agar `N` sampai `2^20` mudah dijalankan (`g++ -O2` membuatnya kurang dari satu detik).

```cpp
#include <cmath>
#include <cstdio>
#include <vector>

using Vektor = std::vector<double>;

const double PI = std::acos(-1.0);

void balik_fase(Vektor& a, size_t m) { a[m] = -a[m]; }

void balik_rata(Vektor& a) {
    double jumlah = 0.0;
    for (double x : a) jumlah += x;
    double rata = jumlah / double(a.size());
    for (double& x : a) x = 2.0 * rata - x;
}

// Sudut theta dengan sin(theta) = 1 / akar(N) untuk satu item ditandai.
double sudut(long banyak) { return std::asin(1.0 / std::sqrt(double(banyak))); }

// Jumlah pengulangan terbaik: pi / (4 theta) - 1/2, dibulatkan.
long ulangan_terbaik(long banyak) { return std::lround(PI / (4.0 * sudut(banyak)) - 0.5); }

double peluang_rumus(long banyak, long t) {
    double s = std::sin((2.0 * double(t) + 1.0) * sudut(banyak));
    return s * s;
}

// Simulasi: t pengulangan; kembalikan peluang item ditandai.
double simulasi(int n, long t) {
    size_t banyak = size_t(1) << n;
    size_t ditandai = banyak / 3;  // sembarang item
    Vektor a(banyak, 1.0 / std::sqrt(double(banyak)));
    for (long i = 0; i < t; i++) {
        balik_fase(a, ditandai);  // satu pemanggilan oracle
        balik_rata(a);
    }
    return a[ditandai] * a[ditandai];
}

int main() {
    std::printf("n     N   t   P(simulasi)  P(rumus)  query klasik terburuk (N-1)\n");
    for (int n = 2; n <= 20; n += 2) {
        long banyak = 1L << n;
        long t = ulangan_terbaik(banyak);
        std::printf("%2d %8ld %4ld  %.6f  %.6f  %8ld\n", n, banyak, t, simulasi(n, t), peluang_rumus(banyak, t), banyak - 1);
    }

    std::printf("terlalu banyak pengulangan, N = 64 (n = 6), t terbaik = %ld:\n", ulangan_terbaik(64));
    for (long t = 0; t <= 14; t++) std::printf(" t=%ld: %.4f", t, simulasi(6, t));
    std::printf("\n");

    std::printf("pendekatan pi/4 * akar(N) untuk n = 10, 20, 30: %.1f, %.1f, %.1f\n", PI / 4.0 * std::sqrt(1024.0),
                PI / 4.0 * std::sqrt(1048576.0), PI / 4.0 * std::sqrt(1073741824.0));
    return 0;
}
```

Keluaran asli (dikompilasi penyusun dengan `g++ -std=c++17 -Wall -Wextra`, lalu dijalankan):

```text
n     N   t   P(simulasi)  P(rumus)  query klasik terburuk (N-1)
 2        4    1  1.000000  1.000000         3
 4       16    3  0.961319  0.961319        15
 6       64    6  0.996586  0.996586        63
 8      256   12  0.999947  0.999947       255
10     1024   25  0.999461  0.999461      1023
12     4096   50  0.999945  0.999945      4095
14    16384  100  1.000000  1.000000     16383
16    65536  201  0.999988  0.999988     65535
18   262144  402  0.999998  0.999998    262143
20  1048576  804  1.000000  1.000000   1048575
terlalu banyak pengulangan, N = 64 (n = 6), t terbaik = 6:
 t=0: 0.0156 t=1: 0.1348 t=2: 0.3439 t=3: 0.5914 t=4: 0.8164 t=5: 0.9635 t=6: 0.9966 t=7: 0.9074 t=8: 0.7180 t=9: 0.4750 t=10: 0.2381 t=11: 0.0656 t=12: 0.0001 t=13: 0.0576 t=14: 0.2239
pendekatan pi/4 * akar(N) untuk n = 10, 20, 30: 25.1, 804.2, 25735.9
```

**TypeScript dengan Bun (jalur B).** Padanan program di atas; keluarannya sama persis dengan versi C++ (dijalankan penyusun dengan `bun`, dibandingkan dengan `diff`).

```ts
type Vektor = number[];

const PI = Math.PI;

function balikFase(a: Vektor, m: number): void {
  a[m] = -a[m];
}

function balikRata(a: Vektor): void {
  let jumlah = 0;
  for (const x of a) jumlah += x;
  const rata = jumlah / a.length;
  for (let i = 0; i < a.length; i++) a[i] = 2 * rata - a[i];
}

// Sudut theta dengan sin(theta) = 1 / akar(N) untuk satu item ditandai.
const sudut = (banyak: number): number => Math.asin(1 / Math.sqrt(banyak));

// Jumlah pengulangan terbaik: pi / (4 theta) - 1/2, dibulatkan.
const ulanganTerbaik = (banyak: number): number => Math.round(PI / (4 * sudut(banyak)) - 0.5);

function peluangRumus(banyak: number, t: number): number {
  const s = Math.sin((2 * t + 1) * sudut(banyak));
  return s * s;
}

// Simulasi: t pengulangan; kembalikan peluang item ditandai.
function simulasi(n: number, t: number): number {
  const banyak = 2 ** n;
  const ditandai = Math.floor(banyak / 3); // sembarang item
  const a: Vektor = new Array(banyak).fill(1 / Math.sqrt(banyak));
  for (let i = 0; i < t; i++) {
    balikFase(a, ditandai); // satu pemanggilan oracle
    balikRata(a);
  }
  return a[ditandai] * a[ditandai];
}

console.log("n     N   t   P(simulasi)  P(rumus)  query klasik terburuk (N-1)");
for (let n = 2; n <= 20; n += 2) {
  const banyak = 2 ** n;
  const t = ulanganTerbaik(banyak);
  console.log(
    `${String(n).padStart(2)} ${String(banyak).padStart(8)} ${String(t).padStart(4)}  ${simulasi(n, t).toFixed(6)}  ${peluangRumus(banyak, t).toFixed(6)}  ${String(banyak - 1).padStart(8)}`,
  );
}

console.log(`terlalu banyak pengulangan, N = 64 (n = 6), t terbaik = ${ulanganTerbaik(64)}:`);
let baris = "";
for (let t = 0; t <= 14; t++) baris += ` t=${t}: ${simulasi(6, t).toFixed(4)}`;
console.log(baris);

const kira = (banyak: number): string => ((PI / 4) * Math.sqrt(banyak)).toFixed(1);
console.log(`pendekatan pi/4 * akar(N) untuk n = 10, 20, 30: ${kira(1024)}, ${kira(1048576)}, ${kira(1073741824)}`);
```

Bacaan hasil. Pada tiap baris simulasi dan rumus sama sampai enam desimal. Jumlah pengulangan `1, 3, 6, 12, 25, 50, 100, 201, 402, 804` kira-kira dua kali lipat tiap `N` empat kali lipat, yaitu `akar N`, sedangkan query klasik terburuk `N - 1` ikut menjadi empat kali. Untuk `N = 2^20`: 804 pengulangan lawan 1.048.575 query klasik, kira-kira 1300 kali lebih sedikit. Di tabel kedua (`N = 64`) peluang naik sampai `0,9966` pada `t = 6`, lalu turun: `0,9074` pada `t = 7` dan `0,0001` pada `t = 12`. Jadi jumlah pengulangan harus dipilih, bukan sebanyak mungkin.

**Batasnya.** Grover mempercepat secara *kuadrat*, bukan eksponensial: `akar(2^n)` sama dengan `2^(n/2)`, yang tetap eksponensial dalam `n`. Hitungan ini hanya query ke oracle; membangun oracle tidak dihitung. Simulator kita memperbarui `N` amplitudo tiap pengulangan, sehingga waktunya sekitar `t x N`, lebih lambat dari pencarian klasik langsung, dan memorinya `8N` byte (`2^20` amplitudo: 8 MiB; `2^30`: 8 GiB). Karena itu ia memeriksa rumus, bukan memperlihatkan percepatan waktu.

## Contoh setengah jadi

Lengkapi (kunci di bagian akhir).

1. Untuk `N = 16`: `sin(theta)` = ____ dan `t` = bulatkan `pi/(4 theta) - 1/2` = ____.
2. Lengkapi:

```cpp setengah-jadi
long ulangan_terbaik(long banyak) { return std::lround(PI / (4.0 * sudut(banyak)) - ____); }

double peluang_rumus(long banyak, long t) {
    double s = std::sin((____ * double(t) + 1.0) * sudut(banyak));
    return s * s;
}
```

## Soal Parsons

Susun baris-baris di bawah (sudah diacak) menjadi isi fungsi `simulasi`. Kurung kurawal penutup perulangan sengaja dihilangkan.

```text
(a) size_t ditandai = banyak / 3;
(b) balik_rata(a);
(c) for (long i = 0; i < t; i++) {
(d) Vektor a(banyak, 1.0 / std::sqrt(double(banyak)));
(e) size_t banyak = size_t(1) << n;
(f) return a[ditandai] * a[ditandai];
(g) balik_fase(a, ditandai);
```

## Latihan

1. **Dengan tangan.** (`AI: tanpa AI`) Untuk `N = 16`, `theta` kira-kira 14,48°. Hitung peluang setelah `t = 2` dan `t = 3`, dan pilih yang terbaik.
2. **Perkiraan.** (`AI: tanpa AI`) Untuk `N = 1.000.000` (bukan pangkat dua), perkirakan `t` dan berapa kali lebih sedikit dari query klasik terburuk 999.999.
3. **Dua item bertanda.** (`AI: boleh`) Ubah program agar dua item bertanda pada `N = 1024`. Prediksi dulu `t` terbaik (petunjuk: `sin(theta)` sekarang `akar(2/N)`), lalu jalankan.
4. **Rancang dulu.** (`AI: boleh`) Tulis pseudocode yang mencari `t` terbaik dengan simulasi, bukan rumus: berhenti saat peluang mulai turun.
5. **Catatan pemakaian AI (opsional).** Bila memakai asisten AI, catat alat, tujuan, garis besar perintah, bagian yang dipakai, dan cara memeriksanya.

## Latihan bercampur

1. Berapa memori simulator untuk 25 qubit bila tiap amplitudo 8 byte? (`e-xii1-m4`, `e-xi2-m4`)
2. Bila `N` naik `2^10` kali, `akar N` naik berapa kali, dan apa artinya bagi banyak pengulangan Grover? (`matkom-pertumbuhan-fungsi`)

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `e-xii1-m6` (satu minggu lagi), `e-xii1-m8` (sekitar tiga minggu lagi), dan `e-xii1-m13` (sekitar delapan minggu lagi). Jawab sekarang lalu simpan.

1. Berapa pengulangan Grover yang mendekati terbaik untuk `N = 1024`, dan berapa query klasik terburuk?
2. Apa rumus peluang item bertanda setelah `t` pengulangan, dengan `sin(theta) = 1/akar N`?
3. Mengapa percepatan kuadrat dari Grover bukan percepatan eksponensial?

## Kesalahan umum

- **"Makin banyak pengulangan makin pasti."** Peluang berosilasi; melewati `t` terbaik membuatnya turun.
- **"Grover mempercepat secara eksponensial."** Selisihnya kuadrat: `N` lawan `akar N`.
- **"Rumus memberi peluang tepat 1."** Ia memberi peluang tinggi; untuk `N = 16` yang terbaik 0,9613.
- **"Simulator membuktikan komputer kuantum lebih cepat."** Simulator memperbarui `N` amplitudo tiap pengulangan; ia membuktikan rumus, bukan percepatan waktu.

## Cek mandiri

- [ ] Saya dapat menghitung `theta` dan `t` terbaik untuk `N` tertentu.
- [ ] Saya dapat memakai `sin²((2t + 1) theta)`.
- [ ] Saya dapat membandingkan `t` dengan query klasik `N - 1`.
- [ ] Saya dapat menjelaskan mengapa percepatannya kuadrat dan bukan eksponensial.
- [ ] Saya mencatat pemakaian AI bila saya memakainya.

## Kunci dan petunjuk

**Ingat kembali.** 1: `a_i` menjadi `2r - a_i` dengan `r` rata-rata; hasilnya `(0; 0; 1; 0)`. 2: memberi tanda `(-1)^f(x)` pada `|x>`, dan qubit bantu tetap `|->`. 3: peluang adalah kuadrat amplitudo sehingga tanda hilang; tetapi H menjumlahkan amplitudo, dan tanda menentukan penguatan atau pembatalan (interferensi).

**Prediksi dulu.** (1) 25. (2) 804. (3) dua kali. (4) peluang berosilasi dan turun, bahkan mendekati 0 pada `N = 64` dengan `t = 12`.

**Contoh setengah jadi.** 1: `1/4`; `theta = 14,48°`, `pi/(4 theta) = 3,11`, dikurangi 0,5 memberi 2,61, dibulatkan `t = 3`. 2: `0.5` dan `2.0`. Kunci ini dikompilasi dan dijalankan penyusun (potongan itu ada di program di atas).

**Soal Parsons.** e, a, d, c, g, b, f.

**Latihan.** 1: `t = 2`: `sin²(5 x 14,48°) = sin²(72,4°)` = 0,9084; `t = 3`: `sin²(7 x 14,48°) = sin²(101,4°)` = 0,9613; terbaik `t = 3` (keluaran program penyusun cocok). 2: `t` kira-kira `(pi/4) x 1000` = 785; 999.999 dibagi 785 kira-kira 1274 kali. 3: `t` terbaik 17 dengan peluang total 0,9994 (keluaran program penyusun, sama dengan rumus). 4: contoh: `a = seragam; t = 0; sebelumnya = peluang(a); ulangi: balik_fase; balik_rata; sekarang = peluang(a); jika sekarang < sebelumnya berhenti dan kembalikan t; sebelumnya = sekarang; t = t + 1`. 5: opsional.

**Latihan bercampur.** 1: `2^25 x 8` byte = 268.435.456 byte = 256 MiB. 2: `akar(2^10) = 2^5` = 32 kali; jumlah pengulangan hanya naik 32 kali walau `N` naik 1024 kali.

**Ulang berjarak.** 1: sekitar 25 pengulangan; query klasik terburuk 1023. 2: `sin²((2t + 1) theta)`. 3: `N = 2^n` menjadi `akar N = 2^(n/2)`, yang tetap eksponensial dalam `n` (hanya setengah eksponennya).

## Langkah berikutnya

Modul berikut: `e-xii1-m6` (gagasan Fourier kuantum dan Shor). Bacaan pendamping: `matkom-pertumbuhan-fungsi` dan `e-xii1-m4`.
