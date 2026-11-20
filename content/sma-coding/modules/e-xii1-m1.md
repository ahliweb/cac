## Untuk siapa modul ini

Modul ini untuk murid kelas XII jalur E (komputasi kuantum), minggu `E-XII1-M1` silabus v1.4: algoritma Bernstein-Vazirani, yaitu menjelaskan dan menyimulasikannya, lalu menemukan string rahasia dengan satu query. Prasyarat: modul `e-xi2-m7` (teleportasi). Disarankan sudah membaca `e-xi2-m10` sampai `e-xi2-m12` (oracle, Deutsch, Deutsch-Jozsa); modul itu belum terindeks saat ini, jadi guru memeriksanya. Di luar indeks, bagian kode memerlukan simulator n qubit `e-xi2-m4` dan dasar pemrograman setara `A-X1-M9..M12` (C++) atau `B-X1-M9..M12` (TypeScript/Bun). Bagian konsep dan hitungan terbuka bagi semua murid. Alat: kertas, kalkulator, dan simulatormu (tanpa akun).

Modul ini karangan penyusun dan disetujui pemilik program pada 2026-11-20 (keputusan lewat dialog; catatan tinjauan menjadi tindak lanjut revisi). Jalur E adalah pengayaan di luar rumusan CP; minggu ini tanpa irisan pengayaan, jadi modul ini tidak dihitung memenuhi butir CP mana pun.

Aturan AI jalur ini: AI generatif boleh dipakai dengan etika dan dicatat, tanpa data pribadi, kata sandi, atau tugas bernilai pada permintaanmu, dan tanpa akun wajib. Saran: jawab dulu sendiri, baru minta petunjuk bertahap; kode buatan AI kamu baca, jalankan, dan uji. Setiap soal `Latihan` bertanda `AI: boleh` atau `AI: tanpa AI`.

Catatan untuk guru: rumusan masalah (janji bahwa `f(x)` sama dengan `s . x` modulo 2), fakta bahwa sirkuit Deutsch-Jozsa menyelesaikannya dengan satu query, dan batas bawah `n` query klasik (tiap query membuka satu bit informasi) dibaca penyusun dari halaman IBM Quantum Learning "The Deutsch-Jozsa algorithm" (bagian Bernstein-Vazirani), per 2026-11-19. Semua angka di bawah dihitung ulang program. Tidak ada klaim tentang perangkat nyata.

## Ingat kembali

Jawab dari ingatan, baru cek di bagian kunci.

1. Apa yang dipindahkan dan apa yang dikirim lewat kanal klasik pada teleportasi? (dari `e-xi2-m7`)
2. Pada Deutsch-Jozsa, bila semua n qubit query terbaca 0 apa artinya, dan bila ada satu yang terbaca 1? (dari `e-xi2-m12`)
3. Apa kerja oracle bit pada `|x>|y>`, dan apa yang terjadi bila dipasang dua kali? (dari `e-xi2-m10`)

## Tujuan

Setelah modul ini kamu dapat:

- menyatakan masalah Bernstein-Vazirani dan menghitung `f(x)` dari string rahasia `s`;
- menelusuri sirkuitnya pada dua qubit query dengan tangan, lalu menyimulasikannya pada empat qubit query;
- membandingkan satu pemasangan oracle dengan `n` query klasik dan menyebut batas perbandingan itu.

Keluaran yang diminta silabus: sirkuit dan hasil.

## Prediksi dulu

Tebak dan tulis, sebelum membaca contoh: (1) untuk `s = 101` dan `n = 3`, berapa `f(110)` dan `f(111)`; (2) apa yang kamu harapkan terbaca pada tiga qubit query setelah sirkuit Deutsch-Jozsa dipasang pada `f` ini; (3) berapa query yang diperlukan algoritma klasik; (4) apa yang terjadi bila `f` tidak berbentuk `s . x`.

## Contoh terselesaikan

**Masalah.** Ada fungsi `f` dari `n` bit ke 1 bit. Janji: ada string rahasia `s` dengan `f(x) = s . x`, yaitu XOR dari bit-bit `x` yang berada di posisi bit 1 pada `s`. Tugas: temukan `s`. Contoh `s = 1011`: `f(1111) = 1 XOR 0 XOR 1 XOR 1 = 1` dan `f(0100) = 0`.

**Cara klasik.** Tanyakan `f` pada `1000`, `0100`, `0010`, `0001`. Tiap jawaban adalah satu bit `s`, jadi `n` query. Tiap query hanya membuka satu bit informasi dan ada `n` bit yang dicari, sehingga tidak ada cara klasik yang lebih sedikit.

**Cara kuantum.** Sirkuitnya sama dengan Deutsch-Jozsa (`e-xi2-m12`): `n` qubit query dari `|0...0>`, satu qubit bantu dari `|1>`, H pada semua qubit, satu pemasangan oracle, H pada `n` qubit query, lalu baca.

**Mengapa berhasil.** Seperti `e-xi2-m11`, qubit bantu `|->` membuat oracle memberi tanda `(-1)^f(x)` pada `|x>`. Jadi qubit query menjadi `(1/akar N)` kali jumlah `(-1)^(s . x) |x>`. Keadaan persis seperti itulah hasil H pada semua qubit untuk string dasar `|s>`. Karena H dipasang dua kali mengembalikan keadaan semula, H kedua mengubahnya menjadi `|s>` dan bacaannya `s` dengan peluang 1. Cek `n = 2`, `s = 11`: setelah oracle amplitudonya `(1, -1, -1, 1)/2`, sama dengan H pada `|1>` lalu `|1>` lagi, yaitu `|->|->`; H pada kedua qubit mengembalikan `|11>`.

```cpp
#include <cmath>
#include <cstdio>
#include <vector>

using Vektor = std::vector<double>;
using Fungsi = std::vector<int>;  // 2^n nilai f(0), f(1), ...

const double H1 = 1.0 / std::sqrt(2.0);
const int n = 4;       // qubit query: 0..3 (kiri); qubit bantu: nomor 4 (paling kanan)
const int N = n + 1;

int paritas(int x) {  // XOR semua bit x
    int p = 0;
    for (; x > 0; x >>= 1) p ^= x & 1;
    return p;
}

void cetak_bit(int x, int panjang) {
    for (int k = panjang - 1; k >= 0; k--) std::printf("%d", (x >> k) & 1);
}

// Gerbang H pada qubit ke-k (0 = paling kiri), di tempat.
void gerbang_h(Vektor& v, int k) {
    int geser = N - 1 - k;
    for (size_t i = 0; i < v.size(); i++) {
        if (((i >> geser) & 1) == 0) {
            size_t j = i | (size_t(1) << geser);
            double a = v[i], b = v[j];
            v[i] = H1 * (a + b);
            v[j] = H1 * (a - b);
        }
    }
}

// |x, y> menjadi |x, y XOR f(x)>; x = n bit kiri, y = qubit bantu.
Vektor pasang_oracle(const Vektor& v, const Fungsi& f) {
    Vektor baru(v.size(), 0.0);
    for (size_t i = 0; i < v.size(); i++) {
        size_t x = i >> 1, y = i & 1;
        baru[(x << 1) | (y ^ f[x])] = v[i];
    }
    return baru;
}

// Peluang tiap hasil bacaan n qubit query setelah sirkuit dengan satu pemasangan oracle.
std::vector<double> sirkuit(const Fungsi& f) {
    Vektor v(size_t(1) << N, 0.0);
    v[1] = 1.0;  // |0000>|1>
    for (int k = 0; k < N; k++) gerbang_h(v, k);
    v = pasang_oracle(v, f);  // satu pemasangan oracle
    for (int k = 0; k < n; k++) gerbang_h(v, k);
    std::vector<double> p(size_t(1) << n, 0.0);
    for (size_t i = 0; i < v.size(); i++) p[i >> 1] += v[i] * v[i];
    return p;
}

Fungsi dari_rahasia(int s) {  // f(x) = s . x mod 2
    Fungsi f(size_t(1) << n);
    for (int x = 0; x < (1 << n); x++) f[x] = paritas(s & x);
    return f;
}

// Klasik: bertanya pada x = 1000, 0100, 0010, 0001; n query.
int klasik(const Fungsi& f, int& banyak_query) {
    int s = 0;
    banyak_query = 0;
    for (int i = 0; i < n; i++) {
        int x = 1 << (n - 1 - i);
        s |= f[x] << (n - 1 - i);
        banyak_query++;
    }
    return s;
}

void cetak_peluang(const std::vector<double>& p) {
    for (int i = 0; i < (1 << n); i++) {
        if (p[i] > 1e-9) {
            std::printf("  ");
            cetak_bit(i, n);
            std::printf("  P = %.4f\n", p[i]);
        }
    }
}

int main() {
    int rahasia = 11;  // 1011
    std::printf("rahasia s = ");
    cetak_bit(rahasia, n);
    std::printf("\nhasil bacaan dengan peluang > 0:\n");
    cetak_peluang(sirkuit(dari_rahasia(rahasia)));

    int benar = 0;
    for (int s = 0; s < (1 << n); s++) {
        std::vector<double> q = sirkuit(dari_rahasia(s));
        if (std::fabs(q[s] - 1.0) < 1e-9) benar++;
    }
    std::printf("s yang pulih dengan peluang 1: %d dari %d\n", benar, 1 << n);

    int banyak = 0;
    int s_klasik = klasik(dari_rahasia(rahasia), banyak);
    std::printf("klasik: s = ");
    cetak_bit(s_klasik, n);
    std::printf(" setelah %d query\n", banyak);

    // Di luar janji: f(x) = x0 AND x1 (bukan s . x).
    Fungsi dan_dua(size_t(1) << n);
    for (int x = 0; x < (1 << n); x++) dan_dua[x] = ((x >> 3) & 1) & ((x >> 2) & 1);
    std::printf("f = AND dua bit pertama (melanggar janji):\n");
    cetak_peluang(sirkuit(dan_dua));
    return 0;
}
```

Keluaran asli (dikompilasi penyusun dengan `g++ -std=c++17 -Wall -Wextra`, lalu dijalankan):

```text
rahasia s = 1011
hasil bacaan dengan peluang > 0:
  1011  P = 1.0000
s yang pulih dengan peluang 1: 16 dari 16
klasik: s = 1011 setelah 4 query
f = AND dua bit pertama (melanggar janji):
  0000  P = 0.2500
  0100  P = 0.2500
  1000  P = 0.2500
  1100  P = 0.2500
```

**TypeScript dengan Bun (jalur B).** Padanan program di atas; keluarannya sama persis dengan versi C++ (dijalankan penyusun dengan `bun`, dibandingkan dengan `diff`).

```ts
type Vektor = number[];
type Fungsi = number[]; // 2^n nilai f(0), f(1), ...

const H1 = 1 / Math.sqrt(2);
const n = 4; // qubit query: 0..3 (kiri); qubit bantu: nomor 4 (paling kanan)
const N = n + 1;

function paritas(x: number): number {
  let p = 0;
  for (; x > 0; x >>= 1) p ^= x & 1;
  return p;
}

const bit = (x: number, panjang: number): string => x.toString(2).padStart(panjang, "0");

// Gerbang H pada qubit ke-k (0 = paling kiri), di tempat.
function gerbangH(v: Vektor, k: number): void {
  const geser = N - 1 - k;
  for (let i = 0; i < v.length; i++) {
    if (((i >> geser) & 1) === 0) {
      const j = i | (1 << geser);
      const a = v[i];
      const b = v[j];
      v[i] = H1 * (a + b);
      v[j] = H1 * (a - b);
    }
  }
}

// |x, y> menjadi |x, y XOR f(x)>; x = n bit kiri, y = qubit bantu.
function pasangOracle(v: Vektor, f: Fungsi): Vektor {
  const baru: Vektor = new Array(v.length).fill(0);
  for (let i = 0; i < v.length; i++) {
    const x = i >> 1;
    const y = i & 1;
    baru[(x << 1) | (y ^ f[x])] = v[i];
  }
  return baru;
}

// Peluang tiap hasil bacaan n qubit query setelah sirkuit dengan satu pemasangan oracle.
function sirkuit(f: Fungsi): number[] {
  let v: Vektor = new Array(1 << N).fill(0);
  v[1] = 1; // |0000>|1>
  for (let k = 0; k < N; k++) gerbangH(v, k);
  v = pasangOracle(v, f); // satu pemasangan oracle
  for (let k = 0; k < n; k++) gerbangH(v, k);
  const p: number[] = new Array(1 << n).fill(0);
  for (let i = 0; i < v.length; i++) p[i >> 1] += v[i] * v[i];
  return p;
}

const dariRahasia = (s: number): Fungsi => Array.from({ length: 1 << n }, (_, x) => paritas(s & x)); // f(x) = s . x mod 2

// Klasik: bertanya pada x = 1000, 0100, 0010, 0001; n query.
function klasik(f: Fungsi): { s: number; banyak: number } {
  let s = 0;
  let banyak = 0;
  for (let i = 0; i < n; i++) {
    const x = 1 << (n - 1 - i);
    s |= f[x] << (n - 1 - i);
    banyak++;
  }
  return { s, banyak };
}

function cetakPeluang(p: number[]): void {
  p.forEach((nilai, i) => {
    if (nilai > 1e-9) console.log(`  ${bit(i, n)}  P = ${nilai.toFixed(4)}`);
  });
}

const rahasia = 11; // 1011
console.log(`rahasia s = ${bit(rahasia, n)}`);
console.log("hasil bacaan dengan peluang > 0:");
cetakPeluang(sirkuit(dariRahasia(rahasia)));

let benar = 0;
for (let s = 0; s < 1 << n; s++) {
  if (Math.abs(sirkuit(dariRahasia(s))[s] - 1) < 1e-9) benar++;
}
console.log(`s yang pulih dengan peluang 1: ${benar} dari ${1 << n}`);

const k = klasik(dariRahasia(rahasia));
console.log(`klasik: s = ${bit(k.s, n)} setelah ${k.banyak} query`);

// Di luar janji: f(x) = x0 AND x1 (bukan s . x).
const danDua: Fungsi = Array.from({ length: 1 << n }, (_, x) => ((x >> 3) & 1) & ((x >> 2) & 1));
console.log("f = AND dua bit pertama (melanggar janji):");
cetakPeluang(sirkuit(danDua));
```

Bacaan hasil: untuk `s = 1011` hanya `1011` yang terbaca (peluang 1), dan semua 16 string rahasia pulih dengan satu pemasangan oracle, sedangkan klasik memerlukan 4 query. Untuk `f` yang melanggar janji (AND dua bit pertama) hasilnya tersebar pada empat string, masing-masing 0,25, sehingga tidak menunjuk satu `s`. Itulah gunanya janji.

**Batasnya.** Hitungan query adalah model: oracle dianggap sudah tersedia dan biaya membangunnya tidak dihitung. Simulator kita menelusuri `2^(n+1)` amplitudo, jadi ia tidak memperlihatkan percepatan waktu. Dan dalam model ini keunggulannya linear: satu query lawan `n`, bukan eksponensial seperti pada Deutsch-Jozsa pasti benar.

## Contoh setengah jadi

Lengkapi (kunci di bagian akhir).

1. Untuk `s = 101`: `f(110) = 1.1 XOR 0.1 XOR 1.0` = ____; `f(111)` = ____.
2. Setelah oracle dan H pada qubit query, bacaan qubit query adalah string ____, bukan `000`.
3. Lengkapi:

```cpp setengah-jadi
Fungsi dari_rahasia(int s) {  // f(x) = s . x mod 2
    Fungsi f(size_t(1) << ____);
    for (int x = 0; x < (1 << n); x++) f[x] = paritas(s ____ x);  // AND bit demi bit
    return f;
}
```

## Soal Parsons

Susun baris-baris di bawah (sudah diacak) menjadi isi fungsi `sirkuit` sampai oracle dan H kedua selesai.

```text
(a) v = pasang_oracle(v, f);
(b) for (int k = 0; k < n; k++) gerbang_h(v, k);
(c) v[1] = 1.0;
(d) for (int k = 0; k < N; k++) gerbang_h(v, k);
(e) Vektor v(size_t(1) << N, 0.0);
```

## Latihan

1. **Dengan tangan.** (`AI: tanpa AI`) Untuk `n = 2`, `s = 10`: tulis `f` pada `00`, `01`, `10`, `11`; tulis amplitudo qubit query setelah oracle; lalu telusuri H pada kedua qubit dan baca hasilnya.
2. **Temukan `s`.** (`AI: boleh`) Fungsi tiga bit `f = 01011010` (nilai pada `000` sampai `111` berurutan) memenuhi janji. Temukan `s` dengan tiga query klasik, lalu periksa lima nilai lainnya.
3. **Ubah n.** (`AI: boleh`) Ubah `n` menjadi 6 dan `s` menjadi `101101`. Prediksi dulu hasilnya, lalu jalankan. Berapa amplitudo yang disimpan simulator?
4. **Rancang dulu.** (`AI: boleh`) Tulis pseudocode yang memeriksa, dengan menelusuri semua `2^n` masukan, apakah sebuah tabel `f` memenuhi janji Bernstein-Vazirani untuk `s` dari tiga query klasik tadi.
5. **Catatan pemakaian AI (opsional).** Bila memakai asisten AI, catat alat, tujuan, garis besar perintah, bagian yang dipakai, dan cara memeriksanya.

## Latihan bercampur

1. Tiga fungsi dari tiga bit: konstan 1 (`11111111`), bit pertama (`00001111`), dan XOR semua bit (`01101001`). Mana yang memenuhi janji Bernstein-Vazirani, dan mana yang memenuhi janji Deutsch-Jozsa? (`e-xi2-m12`)
2. Berapa byte memori simulator untuk 20 qubit query dan satu qubit bantu bila tiap amplitudo 8 byte? (`e-xi2-m4`)

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `e-xii1-m2` (satu minggu lagi), `e-xii1-m4` (sekitar tiga minggu lagi), dan `e-xii1-m9` (sekitar delapan minggu lagi). Jawab sekarang lalu simpan.

1. Apa janji pada masalah Bernstein-Vazirani, dan berapa query klasik yang diperlukan untuk string rahasia `n` bit?
2. Apa yang terjadi pada hasil Bernstein-Vazirani bila `f` melanggar janji? Beri contoh.
3. Sebutkan langkah sirkuit Bernstein-Vazirani berurutan dan apa yang dibaca di akhir.

## Kesalahan umum

- **"Komputer kuantum mencoba semua string rahasia sekaligus."** Oracle dipasang sekali; interferensi mengumpulkan amplitudo pada satu string, `s`. Yang terbaca satu hasil, bukan daftar jawaban.
- **"Algoritma ini bekerja untuk fungsi apa pun."** Hanya bila janji berlaku; di luar janji bacaannya tersebar.
- **"Satu query berarti satu langkah waktu."** Itu hitungan query pada model oracle; membangun oracle tidak dihitung.
- **"Keunggulannya eksponensial."** Di sini satu query lawan `n` query, selisih linear.

## Cek mandiri

- [ ] Saya dapat menghitung `f(x) = s . x` untuk `s` dan `x` yang diberikan.
- [ ] Saya dapat menyebut langkah sirkuit dan mengapa hasilnya `s`.
- [ ] Saya dapat menelusuri `n = 2` dengan tangan.
- [ ] Saya dapat menyebut batas perbandingan satu query lawan `n` query.
- [ ] Saya mencatat pemakaian AI bila saya memakainya.

## Kunci dan petunjuk

**Ingat kembali.** 1: dipindahkan: informasi kuantum keadaan yang dikirim (bukan materi); dikirim lewat kanal klasik: dua bit hasil bacaan Alice; keadaan Alice sendiri hilang. 2: semua 0 berarti konstan; satu saja 1 berarti seimbang. 3: `|x>|y>` menjadi `|x>|y XOR f(x)>`; ia permutasi komponen, dan dipasang dua kali mengembalikan keadaan semula.

**Prediksi dulu.** (1) `f(110) = 1.1 XOR 0.1 XOR 1.0 = 1`; `f(111) = 1 XOR 0 XOR 1 = 0`. (2) `101`. (3) tiga. (4) bacaan tersebar, tidak menunjuk satu string.

**Contoh setengah jadi.** 1: `1` dan `0`. 2: `101`. 3: `n`; `&`. Kunci ini dikompilasi dan dijalankan penyusun (isinya fungsi `dari_rahasia` di atas).

**Soal Parsons.** e, c, d, a, b.

**Latihan.** 1: `f(00) = 0`, `f(01) = 0`, `f(10) = 1`, `f(11) = 1`; amplitudo setelah oracle `(1, 1, -1, -1)/2`, yaitu `|->` pada qubit pertama dan `|+>` pada qubit kedua; H pada keduanya memberi `|1>|0>`, bacaan `10`. 2: `f(001) = 1`, `f(010) = 0`, `f(100) = 1` sehingga `s = 101`; lima nilai lain mengikuti `s . x`: `011` memberi 1, `101` memberi 0, `110` memberi 1, `111` memberi 0, dan `000` memberi 0, cocok dengan tabel. 3: bacaan `101101` dengan peluang 1; amplitudo `2^7` = 128. 4: contoh: `untuk setiap x dari 0 sampai 2^n - 1: bandingkan f[x] dengan paritas(s AND x); bila ada yang berbeda, janji dilanggar`. 5: opsional.

**Latihan bercampur.** 1: konstan 1 tidak memenuhi Bernstein-Vazirani (karena `f(0...0)` harus 0 pada `s . x`), tetapi memenuhi janji Deutsch-Jozsa (konstan); bit pertama sama dengan `s . x` untuk `s = 100` dan seimbang, jadi memenuhi keduanya; XOR semua bit sama dengan `s . x` untuk `s = 111` dan seimbang, jadi memenuhi keduanya. 2: `2^21 x 8` = 16.777.216 byte = 16 MiB.

**Ulang berjarak.** 1: janji: ada `s` dengan `f(x) = s . x`; klasik `n` query. 2: bacaan tersebar pada beberapa string dan tidak menunjuk satu `s`; contoh AND dua bit pertama memberi empat string masing-masing 0,25. 3: qubit query `|0...0>` dan qubit bantu `|1>`; H pada semua; satu oracle; H pada qubit query; baca qubit query, hasilnya `s`.

## Langkah berikutnya

Modul berikut: `e-xii1-m2` (pembalikan fase). Bacaan pendamping: `e-xi2-m11` dan `e-xi2-m12` (Deutsch dan Deutsch-Jozsa).
