## Untuk siapa modul ini

Modul ini untuk murid kelas XI jalur E (komputasi kuantum), minggu `E-XI2-M12` silabus v1.4: algoritma Deutsch-Jozsa, yaitu menjelaskan dan menyimulasikannya pada tiga qubit. Prasyarat: modul `e-xi2-m11` (algoritma Deutsch). Di luar indeks, bagian kode memerlukan simulator `e-xi2-m4` (n qubit) dan dasar pemrograman setara `A-X1-M9..M12` (C++) atau `B-X1-M9..M12` (TypeScript/Bun); guru memeriksanya. Bagian konsep dan hitungan terbuka bagi semua murid. Alat: kertas, kalkulator, dan simulatormu (tanpa akun).

Modul ini berstatus DRAF: karangan penyusun, belum ditinjau pemilik. Jalur E adalah pengayaan di luar rumusan CP. Irisan pengayaan minggu ini `F-BK-b` (membandingkan beberapa strategi) tidak dihitung; modul ini tidak dihitung memenuhi butir CP mana pun.

Aturan AI jalur ini: AI generatif boleh dipakai dengan etika dan dicatat, tanpa data pribadi, kata sandi, atau tugas bernilai pada permintaanmu, dan tanpa akun wajib. Saran: jawab dulu sendiri, baru minta petunjuk bertahap; kode buatan AI kamu baca, jalankan, dan uji. Setiap soal `Latihan` bertanda `AI: boleh` atau `AI: tanpa AI`.

Catatan untuk guru: masalah Deutsch-Jozsa dengan janji "konstan atau seimbang", aturan baca (semua qubit query 0 berarti konstan, selain itu seimbang), batas `2^(n-1) + 1` query bagi algoritma klasik pasti benar, dan bahwa algoritma klasik acak dengan `k` masukan acak salah paling banyak dengan peluang `2^(1-k)` sehingga keunggulan kuantumnya "cukup sederhana" dibaca penyusun dari halaman IBM Quantum Learning "Deutsch-Jozsa algorithm", per 2026-11-19. Amplitudo dan peluang dihitung ulang program di bawah. Tidak ada klaim tentang perangkat nyata.

## Ingat kembali

Jawab dari ingatan, baru cek di bagian kunci.

1. Pada algoritma Deutsch, mengapa qubit bantu dimulai dari |1> lalu diberi H, dan apa keadaan qubit pertama sesudah oracle? (dari `e-xi2-m11`)
2. Mengapa penyadap yang membaca lalu mengirim ulang pada basis acak menimbulkan kesalahan sekitar 25 persen pada kunci tersaring? (dari `e-xi2-m9`)
3. Berapa memori kira-kira untuk menyimpan vektor 30 qubit bila tiap amplitudo 8 byte? (dari `e-xi2-m4`)

## Tujuan

Setelah modul ini kamu dapat:

- menelusuri Deutsch-Jozsa pada tiga qubit query dan satu qubit bantu, lalu menafsirkan hasil bacaan;
- membuat oracle konstan dan seimbang sebagai tabel delapan nilai dan menyimulasikannya;
- membandingkan satu pemasangan oracle dengan query klasik pasti benar dan acak, beserta batasnya.

## Prediksi dulu

Tebak dan tulis: (1) peluang membaca `000` pada qubit query untuk `f` konstan dan untuk `f` seimbang; (2) apa yang terjadi bila `f` melanggar janji, misalnya hanya satu nilai 1 dari delapan; (3) berapa query klasik terburuk untuk n = 3.

## Contoh terselesaikan

**Masalah.** `f` dari n bit ke 1 bit dengan janji: konstan atau seimbang (`e-xi2-m10`). Sirkuit: n qubit query dari `|0...0>` dan satu qubit bantu dari `|1>`; H pada semua qubit; satu pemasangan oracle; H pada n qubit query; baca. Semua n hasil 0 berarti konstan; ada satu saja yang 1 berarti seimbang.

**Mengapa berhasil.** Seperti `e-xi2-m11`: qubit bantu `|->` membuat oracle memberi tanda `(-1)^f(x)` pada tiap `|x>`, sehingga qubit query menjadi `(1/akar N)` kali jumlah `(-1)^f(x) |x>` dengan `N = 2^n`. H pada semua qubit query menjadikan amplitudo `|0...0>` sama dengan `(1/N)` kali jumlah `(-1)^f(x)`. Bila `f` konstan, jumlahnya `+N` atau `-N`, amplitudo `+1` atau `-1`, peluang 1. Bila seimbang, separuh `+1` dan separuh `-1`, jumlahnya 0, peluang `000` adalah 0. Bila janji dilanggar, hasilnya di antara: untuk satu nilai 1 dari delapan, `(7 - 1)/8 = 0,75`, peluang `0,5625`, tidak dapat disimpulkan. Itulah gunanya janji.

```cpp
#include <cmath>
#include <cstdio>
#include <set>
#include <vector>

using Vektor = std::vector<double>;
using Fungsi = std::vector<int>;  // 2^n nilai f(0), f(1), ...

const double H1 = 1.0 / std::sqrt(2.0);
const int n = 3;       // qubit query: 0, 1, 2 (kiri); qubit bantu: nomor 3 (paling kanan)
const int N = n + 1;

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

// Kembalikan peluang n qubit query terbaca 000.
double deutsch_jozsa(const Fungsi& f) {
    Vektor v(size_t(1) << N, 0.0);
    v[1] = 1.0;  // |000>|1>
    for (int k = 0; k < N; k++) gerbang_h(v, k);
    v = pasang_oracle(v, f);  // satu pemasangan oracle
    for (int k = 0; k < n; k++) gerbang_h(v, k);
    return v[0] * v[0] + v[1] * v[1];  // query 000, qubit bantu 0 atau 1
}

void cetak(const char* nama, const Fungsi& f) {
    std::printf("%-28s f = ", nama);
    for (int x : f) std::printf("%d", x);
    std::printf("  P(000) = %.4f\n", deutsch_jozsa(f));
}

int main() {
    Fungsi konstan_0(8, 0), konstan_1(8, 1), bit_pertama(8), paritas(8), satu_saja(8, 0);
    for (int x = 0; x < 8; x++) {
        bit_pertama[x] = (x >> 2) & 1;                            // f(x) = bit paling kiri dari x
        paritas[x] = ((x >> 2) ^ (x >> 1) ^ x) & 1;               // f(x) = XOR semua bit x
    }
    satu_saja[0] = 1;                                             // bukan konstan, bukan seimbang
    cetak("konstan 0", konstan_0);
    cetak("konstan 1", konstan_1);
    cetak("bit pertama", bit_pertama);
    cetak("paritas", paritas);
    cetak("satu saja (melanggar janji)", satu_saja);

    // Semua 2 + 70 = 72 fungsi yang memenuhi janji.
    std::vector<Fungsi> janji = {konstan_0, konstan_1};
    for (int topeng = 0; topeng < 256; topeng++) {
        if (__builtin_popcount(topeng) != 4) continue;  // seimbang: tepat empat nilai 1
        Fungsi f(8);
        for (int x = 0; x < 8; x++) f[x] = (topeng >> x) & 1;
        janji.push_back(f);
    }
    std::set<long> p_konstan, p_seimbang;  // peluang dibulatkan ke 1e-6
    for (size_t i = 0; i < janji.size(); i++)
        (i < 2 ? p_konstan : p_seimbang).insert(std::lround(deutsch_jozsa(janji[i]) * 1e6));
    std::printf("fungsi yang memenuhi janji: %zu\n", janji.size());
    std::printf("P(000) untuk yang konstan  : %zu nilai berbeda, %.6f\n", p_konstan.size(),
                *p_konstan.begin() / 1e6);
    std::printf("P(000) untuk yang seimbang : %zu nilai berbeda, %.6f\n", p_seimbang.size(),
                *p_seimbang.begin() / 1e6);

    // Pembanding klasik pasti benar lawan klasik acak (k masukan acak bebas).
    std::printf("query klasik terburuk 2^(n-1)+1 untuk n = 3, 10, 20: %ld, %ld, %ld\n", (1L << 2) + 1,
                (1L << 9) + 1, (1L << 19) + 1);
    for (int k : {3, 11})
        std::printf("klasik acak, k = %d query: salah paling banyak %.6f (bila seimbang)\n", k,
                    std::pow(2.0, 1 - k));
    return 0;
}
```

Keluaran asli (dikompilasi penyusun dengan `g++ -std=c++17 -Wall -Wextra`, lalu dijalankan):

```text
konstan 0                    f = 00000000  P(000) = 1.0000
konstan 1                    f = 11111111  P(000) = 1.0000
bit pertama                  f = 00001111  P(000) = 0.0000
paritas                      f = 01101001  P(000) = 0.0000
satu saja (melanggar janji)  f = 10000000  P(000) = 0.5625
fungsi yang memenuhi janji: 72
P(000) untuk yang konstan  : 1 nilai berbeda, 1.000000
P(000) untuk yang seimbang : 1 nilai berbeda, 0.000000
query klasik terburuk 2^(n-1)+1 untuk n = 3, 10, 20: 5, 513, 524289
klasik acak, k = 3 query: salah paling banyak 0.250000 (bila seimbang)
klasik acak, k = 11 query: salah paling banyak 0.000977 (bila seimbang)
```

**TypeScript dengan Bun (jalur B).** Padanan program di atas; keluarannya sama persis dengan versi C++ (dijalankan penyusun dengan `bun`, dibandingkan baris demi baris dengan `diff`).

```ts
type Vektor = number[];
type Fungsi = number[]; // 2^n nilai f(0), f(1), ...

const H1 = 1 / Math.sqrt(2);
const n = 3; // qubit query: 0, 1, 2 (kiri); qubit bantu: nomor 3 (paling kanan)
const N = n + 1;

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

// Kembalikan peluang n qubit query terbaca 000.
function deutschJozsa(f: Fungsi): number {
  let v: Vektor = new Array(1 << N).fill(0);
  v[1] = 1; // |000>|1>
  for (let k = 0; k < N; k++) gerbangH(v, k);
  v = pasangOracle(v, f); // satu pemasangan oracle
  for (let k = 0; k < n; k++) gerbangH(v, k);
  return v[0] * v[0] + v[1] * v[1]; // query 000, qubit bantu 0 atau 1
}

function cetak(nama: string, f: Fungsi): void {
  console.log(`${nama.padEnd(28)} f = ${f.join("")}  P(000) = ${deutschJozsa(f).toFixed(4)}`);
}

const seragam = (nilai: number): Fungsi => new Array(8).fill(nilai);
const dariBit = (g: (x: number) => number): Fungsi => Array.from({ length: 8 }, (_, x) => g(x));
const banyakSatu = (x: number): number => x.toString(2).split("1").length - 1;

const konstan0 = seragam(0);
const konstan1 = seragam(1);
const satuSaja = dariBit((x) => (x === 0 ? 1 : 0)); // bukan konstan, bukan seimbang
cetak("konstan 0", konstan0);
cetak("konstan 1", konstan1);
cetak("bit pertama", dariBit((x) => (x >> 2) & 1)); // f(x) = bit paling kiri dari x
cetak("paritas", dariBit((x) => ((x >> 2) ^ (x >> 1) ^ x) & 1)); // f(x) = XOR semua bit x
cetak("satu saja (melanggar janji)", satuSaja);

// Semua 2 + 70 = 72 fungsi yang memenuhi janji.
const janji: Fungsi[] = [konstan0, konstan1];
for (let topeng = 0; topeng < 256; topeng++) {
  if (banyakSatu(topeng) !== 4) continue; // seimbang: tepat empat nilai 1
  janji.push(dariBit((x) => (topeng >> x) & 1));
}
const pKonstan = new Set<number>();
const pSeimbang = new Set<number>();
janji.forEach((f, i) => (i < 2 ? pKonstan : pSeimbang).add(Math.round(deutschJozsa(f) * 1e6)));
console.log(`fungsi yang memenuhi janji: ${janji.length}`);
console.log(`P(000) untuk yang konstan  : ${pKonstan.size} nilai berbeda, ${([...pKonstan][0] / 1e6).toFixed(6)}`);
console.log(`P(000) untuk yang seimbang : ${pSeimbang.size} nilai berbeda, ${([...pSeimbang][0] / 1e6).toFixed(6)}`);

// Pembanding klasik pasti benar lawan klasik acak (k masukan acak bebas).
console.log(`query klasik terburuk 2^(n-1)+1 untuk n = 3, 10, 20: ${[3, 10, 20].map((m) => 2 ** (m - 1) + 1).join(", ")}`);
for (const k of [3, 11]) {
  console.log(`klasik acak, k = ${k} query: salah paling banyak ${(2 ** (1 - k)).toFixed(6)} (bila seimbang)`);
}
```

Bacaan hasilnya: dari 72 fungsi yang memenuhi janji, semua yang konstan memberi `P(000) = 1` dan semua yang seimbang memberi 0, dengan satu pemasangan oracle; fungsi yang melanggar janji memberi 0,5625. Pembanding klasik: algoritma pasti benar perlu 5 query untuk n = 3, 513 untuk n = 10, dan 524289 untuk n = 20. Namun algoritma klasik acak yang bertanya pada `k` masukan acak dan menjawab konstan bila semua sama, salah paling banyak dengan peluang `2^(1-k)`: dengan 11 query kurang dari 0,1 persen. Karena itu keunggulan kuantum di sini cukup sederhana, dan hanya terhadap pemeriksa klasik yang tidak boleh salah sama sekali.

**Batasnya.** Hitungan query adalah model: oracle dianggap sudah tersedia, dan biaya membangunnya tidak dihitung. Simulator kita membangun oracle dengan menelusuri `f` di semua masukan dan memerlukan `2^(n+1)` amplitudo (`e-xi2-m4`), jadi ia tidak memperlihatkan percepatan waktu apa pun. Tidak ada klaim tentang perangkat kuantum nyata.

## Contoh setengah jadi

Lengkapi (kunci di bagian akhir).

1. Untuk n = 3 vektor memiliki ____ komponen (tiga qubit query dan satu qubit bantu). Fungsi `00001111` punya ____ nilai 1, jadi seimbang.
2. `P(000)` untuk seimbang `((4 - 4)/8)²` = ____; untuk konstan `((8 - 0)/8)²` = ____.
3. Lengkapi:

```cpp setengah-jadi
double deutsch_jozsa(const Fungsi& f) {
    Vektor v(size_t(1) << N, 0.0);
    v[____] = 1.0;  // |000>|1>
    for (int k = 0; k < N; k++) gerbang_h(v, k);
    v = pasang_oracle(v, f);
    for (int k = 0; k < ____; k++) gerbang_h(v, k);  // H hanya pada qubit query
    return v[0] * v[0] + v[1] * v[1];
}
```

## Soal Parsons

Susun baris-baris di bawah (sudah diacak) menjadi pembuatan daftar fungsi yang memenuhi janji. Penjorokan dan kurung kurawal penutup sengaja dihilangkan.

```text
(a) Fungsi f(8);
(b) janji.push_back(f);
(c) std::vector<Fungsi> janji = {konstan_0, konstan_1};
(d) if (__builtin_popcount(topeng) != 4) continue;
(e) for (int topeng = 0; topeng < 256; topeng++) {
(f) for (int x = 0; x < 8; x++) f[x] = (topeng >> x) & 1;
```

## Latihan

1. **Dengan tangan.** (`AI: tanpa AI`) Hitung `P(000)` untuk `f = 11110000`, `f = 11111111`, dan `f = 10000000` memakai rumus `((jumlah (-1)^f(x))/8)²`.
2. **Buat oracle.** (`AI: tanpa AI`) Tulis tabel delapan nilai untuk: konstan 1; `f(x)` sama dengan bit terakhir `x`; dan `f(x) = 1` hanya bila dua bit pertama `x` sama dengan 1. Golongkan masing-masing (konstan, seimbang, atau bukan keduanya).
3. **Ubah n.** (`AI: boleh`) Ubah `n` menjadi 2 dan `f` menjadi vektor empat nilai. Prediksi dulu `P(00)` untuk 2 fungsi konstan dan 6 fungsi seimbang, lalu jalankan.
4. **Rancang dulu.** (`AI: boleh`) Tulis pseudocode pemeriksa klasik acak: pilih `k` masukan acak, bertanya, jawab konstan bila semua sama. Berapa peluang ia salah pada fungsi seimbang?
5. **Catatan pemakaian AI (opsional).** Bila memakai asisten AI, catat alat, tujuan, garis besar perintah, bagian yang dipakai, dan cara memeriksanya.

## Latihan bercampur

1. Ada berapa fungsi dari 3 bit ke 1 bit, dan berapa yang seimbang? (`e-xi2-m10`)
2. Pemeriksa klasik acak memakai `k = 5` masukan acak bebas. Berapa peluang ia salah pada fungsi seimbang? (`e-xi1-m2`)
3. Bandingkan `n` dengan `2^(n-1) + 1` untuk n = 5, 10, dan 20. (`matkom-pertumbuhan-fungsi`)

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `e-xi2-m13` (satu minggu lagi), `e-xii1-m1` (sekitar tiga minggu lagi), dan `e-xii1-m6` (sekitar delapan minggu lagi). Jawab sekarang lalu simpan.

1. Apa janji (promise) pada masalah Deutsch-Jozsa, dan apa yang terjadi bila fungsinya bukan konstan maupun seimbang?
2. Pada Deutsch-Jozsa, bila semua n qubit query terbaca 0 apa artinya, dan bila ada satu yang terbaca 1?
3. Mengapa jumlah query klasik terburuk 2^(n-1)+1 tumbuh jauh lebih cepat dari n, dan berapa untuk n = 10?

## Kesalahan umum

- **"Deutsch-Jozsa mencoba semua `2^n` masukan sekaligus lalu memilih jawabannya."** Oracle dipasang sekali; yang terbaca hanya apakah semua tanda sama, bukan nilai `f` di tiap masukan.
- **"Deutsch-Jozsa mengalahkan semua algoritma klasik."** Hanya yang pasti benar; algoritma klasik acak dengan sedikit query hampir selalu benar.
- **"Algoritma ini bekerja untuk setiap fungsi."** Hanya bila janji berlaku; di luar janji hasilnya ambigu (contoh `P(000) = 0,5625`).
- **"Hasil bukan `000` memberi tahu `f` yang mana."** Ia hanya menandakan seimbang.

## Cek mandiri

- [ ] Saya dapat menyebut langkah sirkuit Deutsch-Jozsa dan arti hasil bacaannya.
- [ ] Saya dapat menghitung `P(000)` dari jumlah `(-1)^f(x)`.
- [ ] Saya dapat membuat oracle konstan dan seimbang sebagai tabel.
- [ ] Saya dapat menyebut batas keunggulan terhadap pemeriksa klasik acak.
- [ ] Saya mencatat pemakaian AI bila saya memakainya.

## Kunci dan petunjuk

**Ingat kembali.** 1: qubit bantu `|1>` diberi H menjadi `|->`; `X|-> = -|->`, jadi oracle memberi tanda `(-1)^f(x)` pada qubit query; qubit query menjadi `((-1)^f(0) |0> + (-1)^f(1) |1>)` dibagi akar2. 2: Eve salah basis dengan peluang 1/2 sehingga qubit runtuh ke basis yang salah; Bob dengan basis sama salah dengan peluang 1/2; `1/2 x 1/2 = 1/4`. 3: `2^30 x 8` byte = 8589934592 byte = 8 GiB.

**Prediksi dulu.** (1) 1 untuk konstan dan 0 untuk seimbang; (2) hasilnya di antara dan tidak menentukan (0,5625 pada contoh); (3) 5.

**Contoh setengah jadi.** 1: 16 komponen; 4 nilai 1. 2: 0 dan 1. 3: `1` (komponen `0001` berarti `|000>|1>`); `n` (3). Kunci ini dikompilasi dan dijalankan penyusun.

**Soal Parsons.** c, e, d, a, f, b.

**Latihan.** 1: `11110000`: empat -1 dan empat +1, jumlah 0, peluang 0; `11111111`: jumlah -8, `(-8/8)² = 1`; `10000000`: `(7 - 1)/8 = 0,75`, peluang 0,5625. 2: konstan 1 = `11111111` (konstan); bit terakhir = `01010101` (seimbang, empat nilai 1); dua bit pertama 1 = `00000011` (dua nilai 1 dari delapan, bukan keduanya; `P(000)` = `((6 - 2)/8)²` = 0,25 menurut program penyusun). 3: untuk n = 2 ada 2 konstan dan 6 seimbang yang memenuhi janji: `P(00)` = 1 untuk konstan dan 0 untuk seimbang (keluaran penyusun). 4: contoh: `ulangi k kali: x = masukan acak; catat f(x); jika semua nilai sama jawab konstan, jika ada yang beda jawab seimbang`; peluang salah `2^(1-k)`. 5: opsional.

**Latihan bercampur.** 1: `2^8` = 256 fungsi; seimbang `C(8, 4)` = 70. 2: `2^(1-5)` = 1/16 = 0,0625. 3: n = 5, 10, 20 berturut-turut dibanding 17, 513, dan 524289.

**Ulang berjarak.** 1: janji: `f` konstan atau seimbang; di luar janji hasilnya tidak menentukan (mis. satu nilai 1 dari delapan memberi `P(000) = 0,5625`). 2: semua 0 berarti konstan; satu saja 1 berarti seimbang. 3: `2^(n-1) + 1` berlipat dua tiap n bertambah satu (eksponensial), sedangkan n bertambah satu-satu; untuk n = 10 menjadi 513.

## Langkah berikutnya

Modul berikut: `e-xi2-m13` (proyek mini semester 2): menyajikan satu fenomena. Bacaan pendamping: `e-xi2-m10` dan `e-xi2-m11` (oracle dan Deutsch).
