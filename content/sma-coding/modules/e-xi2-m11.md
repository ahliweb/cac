## Untuk siapa modul ini

Modul ini untuk murid kelas XI jalur E (komputasi kuantum), minggu `E-XI2-M11` silabus v1.4: algoritma Deutsch, yaitu menjelaskan dan menyimulasikan Deutsch satu qubit. Prasyarat: modul `e-xi2-m10` (oracle dan fungsi Boolean). Alat: kertas, kalkulator, dan simulatormu dari `e-xi2-m4` (C++17 atau TypeScript dengan Bun; tanpa akun); hitungan tangan lebih dulu.

Modul ini berstatus DRAF: karangan penyusun, belum ditinjau pemilik. Jalur E adalah pengayaan di luar rumusan CP; minggu ini tanpa irisan pengayaan, jadi modul ini tidak dihitung memenuhi butir CP mana pun.

Aturan AI jalur ini: AI generatif boleh dipakai dengan etika dan dicatat, tanpa data pribadi, kata sandi, atau tugas bernilai pada permintaanmu, dan tanpa akun wajib. Saran: jawab dulu sendiri, baru minta petunjuk bertahap; kode buatan AI kamu baca, jalankan, dan uji. Setiap soal `Latihan` bertanda `AI: boleh` atau `AI: tanpa AI`.

Catatan untuk guru: masalah Deutsch, sirkuit (H pada keduanya dari `|1>|0>` menurut urutan Qiskit, oracle, H), analisis keadaan, fenomena *phase kickback*, bahwa algoritma klasik pasti benar perlu dua query, dan bahwa keunggulannya "sederhana: satu query lawan dua" dibaca penyusun dari halaman IBM Quantum Learning "Deutsch's algorithm", per 2026-11-19. Modul ini memakai urutan qubit sendiri (qubit query di kiri, qubit bantu di kanan), sehingga vektornya tidak sama urutannya dengan halaman itu. Jejak amplitudo dihitung program dan tangan, bukan kutipan.

## Ingat kembali

Jawab dari ingatan, baru cek di bagian kunci.

1. Tuliskan efek oracle U_f pada |x, y>, dan mengapa U_f reversibel walau f konstan? (dari `e-xi2-m10`)
2. Berapa peluang menang terbaik strategi klasik pada permainan CHSH, dan berapa pada strategi kuantum dalam simulasi? (dari `e-xi2-m8`)
3. Mengapa H, baca, H memberi peluang 0 sebesar 0,5 sedangkan H, H memberi 1? (dari `e-xi1-m9`)

## Tujuan

Setelah modul ini kamu dapat:

- menelusuri algoritma Deutsch pada vektor dua qubit dan menyebut arti hasil bacaan (0 konstan, 1 seimbang);
- menyimulasikannya untuk keempat fungsi satu bit;
- menjelaskan hitungan "satu pemasangan oracle lawan dua query klasik" beserta batasnya.

## Prediksi dulu

Tebak dan tulis: (1) bila `f` konstan, apa hasil membaca qubit query pada akhir sirkuit, acak atau pasti; (2) berapa kali oracle dipasang; (3) apakah dari hasil itu kita tahu `f(0)` dan `f(1)` masing-masing.

## Contoh terselesaikan

**Masalah.** `f` dari 1 bit ke 1 bit; tentukan konstan atau seimbang. Pemeriksa klasik yang pasti benar perlu dua query: mengetahui satu nilai saja tidak cukup (`e-xi2-m10`).

**Sirkuit.** Dua qubit: qubit query (kiri) mulai dari `|0>`, qubit bantu (kanan) mulai dari `|1>`, jadi vektor awal `(0; 1; 0; 0)` untuk `00, 01, 10, 11`. Langkah: (1) H pada kedua qubit; (2) pasang oracle `U_f` satu kali; (3) H pada qubit query; (4) baca qubit query: 0 berarti konstan, 1 berarti seimbang.

**Jejak untuk `f(0) = 0`, `f(1) = 1`.** Setelah H pada keduanya: `(0,5; -0,5; 0,5; -0,5)`. Oracle menukar komponen `10` dan `11` (qubit bantu dibalik bila query 1): `(0,5; -0,5; -0,5; 0,5)`. H pada qubit query memasangkan komponen `(00, 10)` dan `(01, 11)`: `(0; 0; 0,7071; -0,7071)`. Qubit query pasti terbaca 1: seimbang.

**Mengapa berhasil.** Setelah H, qubit bantu berada pada `|-> = (h, -h)`. Gerbang X membalik tanda `|->`, jadi oracle pada `|x>|->` memberi `(-1)^f(x) |x>|->`: hasil `f(x)` pindah menjadi tanda pada qubit query, sedangkan qubit bantu tetap `|->` (*phase kickback*). Qubit query menjadi `((-1)^f(0) |0> + (-1)^f(1) |1>)` dibagi akar2. Bila `f(0) = f(1)`, tandanya sama, yaitu `|+>` sampai tanda global, dan H mengubahnya menjadi `|0>`. Bila berbeda, yaitu `|->`, H mengubahnya menjadi `|1>`. Itu interferensi seperti `e-xi1-m9`: tanda tidak mengubah peluang pembacaan langsung, tetapi mengubah hasil setelah H. Yang kamu peroleh hanya `f(0) XOR f(1)`, bukan `f(0)` dan `f(1)` sendiri; tanda global `(-1)^f(0)` tidak teramati (`e-xi2-m5`).

```cpp
#include <cmath>
#include <cstdio>
#include <vector>

using Vektor = std::vector<double>;
using Matriks = std::vector<Vektor>;

const double H1 = 1.0 / std::sqrt(2.0);
const Matriks H = {{H1, H1}, {H1, -H1}};

void tulis(const char* label, const Vektor& v) {
    std::printf("%s(", label);
    for (size_t i = 0; i < v.size(); i++)
        std::printf("%s%.4f", i ? "; " : "", v[i] + 0.0);  // + 0.0 menghindari "-0.0000"
    std::printf(")\n");
}

// Gerbang 2 x 2 pada qubit pertama (qubit query) dari vektor (00, 01, 10, 11).
Vektor gerbang_pertama(const Vektor& v, const Matriks& g) {
    Vektor hasil(4, 0.0);
    for (int y = 0; y < 2; y++) {
        double a = v[y], b = v[2 + y];
        hasil[y] = g[0][0] * a + g[0][1] * b;
        hasil[2 + y] = g[1][0] * a + g[1][1] * b;
    }
    return hasil;
}

Vektor gerbang_kedua(const Vektor& v, const Matriks& g) {
    Vektor hasil(4, 0.0);
    for (int x = 0; x < 2; x++) {
        double a = v[2 * x], b = v[2 * x + 1];
        hasil[2 * x] = g[0][0] * a + g[0][1] * b;
        hasil[2 * x + 1] = g[1][0] * a + g[1][1] * b;
    }
    return hasil;
}

// Oracle U_f: |x, y> menjadi |x, y XOR f(x)>. Menghitung berapa kali dipasang pada sirkuit.
struct Oracle {
    int f[2];
    int dipasang = 0;

    Vektor pasang(const Vektor& v) {
        dipasang += 1;
        Vektor hasil(4, 0.0);
        for (int x = 0; x < 2; x++)
            for (int y = 0; y < 2; y++) hasil[2 * x + (y ^ f[x])] = v[2 * x + y];
        return hasil;
    }
};

// Kembalikan peluang qubit query terbaca 1.
double deutsch(Oracle& oracle, bool tampil) {
    Vektor v = {0.0, 1.0, 0.0, 0.0};  // |0>|1>: qubit query 0, qubit bantu 1
    v = gerbang_pertama(v, H);
    v = gerbang_kedua(v, H);
    if (tampil) tulis("  setelah H, H     : ", v);
    v = oracle.pasang(v);
    if (tampil) tulis("  setelah oracle   : ", v);
    v = gerbang_pertama(v, H);
    if (tampil) tulis("  setelah H query  : ", v);
    return v[2] * v[2] + v[3] * v[3];
}

int main() {
    std::printf("jejak untuk f(0)=0, f(1)=1 (seimbang):\n");
    Oracle jejak{{0, 1}};
    deutsch(jejak, true);
    std::printf("semua empat fungsi:\n");
    for (int f0 = 0; f0 < 2; f0++) {
        for (int f1 = 0; f1 < 2; f1++) {
            Oracle o{{f0, f1}};
            double p1 = deutsch(o, false);
            std::printf("  f(0)=%d f(1)=%d (%s): P(query terbaca 1) = %.4f, oracle dipasang %d kali\n",
                        f0, f1, f0 == f1 ? "konstan" : "seimbang", p1, o.dipasang);
        }
    }
    return 0;
}
```

Keluaran asli (dikompilasi penyusun dengan `g++ -std=c++17 -Wall -Wextra`, lalu dijalankan):

```text
jejak untuk f(0)=0, f(1)=1 (seimbang):
  setelah H, H     : (0.5000; -0.5000; 0.5000; -0.5000)
  setelah oracle   : (0.5000; -0.5000; -0.5000; 0.5000)
  setelah H query  : (0.0000; 0.0000; 0.7071; -0.7071)
semua empat fungsi:
  f(0)=0 f(1)=0 (konstan): P(query terbaca 1) = 0.0000, oracle dipasang 1 kali
  f(0)=0 f(1)=1 (seimbang): P(query terbaca 1) = 1.0000, oracle dipasang 1 kali
  f(0)=1 f(1)=0 (seimbang): P(query terbaca 1) = 1.0000, oracle dipasang 1 kali
  f(0)=1 f(1)=1 (konstan): P(query terbaca 1) = 0.0000, oracle dipasang 1 kali
```

**TypeScript dengan Bun (jalur B).** Padanan program di atas; keluarannya sama persis dengan versi C++ (dijalankan penyusun dengan `bun`, dibandingkan baris demi baris dengan `diff`).

```ts
type Vektor = number[];
type Matriks = number[][];

const H1 = 1 / Math.sqrt(2);
const H: Matriks = [[H1, H1], [H1, -H1]];

function tulis(label: string, v: Vektor): void {
  // + 0 menghindari "-0.0000", sama dengan versi C++
  console.log(`${label}(${v.map((x) => (x + 0).toFixed(4)).join("; ")})`);
}

// Gerbang 2 x 2 pada qubit pertama (qubit query) dari vektor (00, 01, 10, 11).
function gerbangPertama(v: Vektor, g: Matriks): Vektor {
  const hasil: Vektor = [0, 0, 0, 0];
  for (let y = 0; y < 2; y++) {
    const a = v[y];
    const b = v[2 + y];
    hasil[y] = g[0][0] * a + g[0][1] * b;
    hasil[2 + y] = g[1][0] * a + g[1][1] * b;
  }
  return hasil;
}

function gerbangKedua(v: Vektor, g: Matriks): Vektor {
  const hasil: Vektor = [0, 0, 0, 0];
  for (let x = 0; x < 2; x++) {
    const a = v[2 * x];
    const b = v[2 * x + 1];
    hasil[2 * x] = g[0][0] * a + g[0][1] * b;
    hasil[2 * x + 1] = g[1][0] * a + g[1][1] * b;
  }
  return hasil;
}

// Oracle U_f: |x, y> menjadi |x, y XOR f(x)>. Menghitung berapa kali dipasang pada sirkuit.
class Oracle {
  dipasang = 0;
  constructor(readonly f: [number, number]) {}

  pasang(v: Vektor): Vektor {
    this.dipasang += 1;
    const hasil: Vektor = [0, 0, 0, 0];
    for (let x = 0; x < 2; x++) {
      for (let y = 0; y < 2; y++) hasil[2 * x + (y ^ this.f[x])] = v[2 * x + y];
    }
    return hasil;
  }
}

// Kembalikan peluang qubit query terbaca 1.
function deutsch(oracle: Oracle, tampil: boolean): number {
  let v: Vektor = [0, 1, 0, 0]; // |0>|1>: qubit query 0, qubit bantu 1
  v = gerbangPertama(v, H);
  v = gerbangKedua(v, H);
  if (tampil) tulis("  setelah H, H     : ", v);
  v = oracle.pasang(v);
  if (tampil) tulis("  setelah oracle   : ", v);
  v = gerbangPertama(v, H);
  if (tampil) tulis("  setelah H query  : ", v);
  return v[2] * v[2] + v[3] * v[3];
}

console.log("jejak untuk f(0)=0, f(1)=1 (seimbang):");
deutsch(new Oracle([0, 1]), true);
console.log("semua empat fungsi:");
for (let f0 = 0; f0 < 2; f0++) {
  for (let f1 = 0; f1 < 2; f1++) {
    const o = new Oracle([f0, f1]);
    const p1 = deutsch(o, false);
    console.log(
      `  f(0)=${f0} f(1)=${f1} (${f0 === f1 ? "konstan" : "seimbang"}): P(query terbaca 1) = ${p1.toFixed(4)}, oracle dipasang ${o.dipasang} kali`,
    );
  }
}
```

Bacaan hasilnya: jejak sama dengan tangan; empat fungsi dipisahkan pasti, dan oracle dipasang sekali. **Batasnya:** halaman IBM menyebut keunggulan ini sederhana (satu query lawan dua) dan hitungannya hanya model query. Simulator kita menyusun oracle dengan menelusuri `f` di semua masukan, jadi simulasi ini tidak memperlihatkan kecepatan apa pun; yang diperlihatkan hanya hitungan pemasangan oracle pada sirkuit. Tidak ada klaim tentang kecepatan komputer kuantum nyata.

## Contoh setengah jadi

Lengkapi (kunci di bagian akhir).

1. Setelah H pada keduanya dari `(0; 1; 0; 0)`, vektornya `(____; ____; ____; ____)` (angka 0,5 dengan tanda).
2. Untuk `f(0) = 0` dan `f(1) = 0` oracle tidak mengubah vektor. H pada qubit query dari `(0,5; -0,5; 0,5; -0,5)` memberi `(____; ____; 0; 0)`.
3. Lengkapi:

```cpp setengah-jadi
Vektor pasang(const Vektor& v) {
    dipasang += ____;
    Vektor hasil(4, 0.0);
    for (int x = 0; x < 2; x++)
        for (int y = 0; y < 2; y++) hasil[2 * x + (y ____ f[x])] = v[2 * x + y];
    return hasil;
}
```

## Soal Parsons

Susun baris-baris di bawah (sudah diacak) menjadi isi metode `pasang` pada oracle. Penjorokan sengaja dihilangkan.

```text
(a) return hasil;
(b) for (int y = 0; y < 2; y++)
(c) Vektor hasil(4, 0.0);
(d) hasil[2 * x + (y ^ f[x])] = v[2 * x + y];
(e) for (int x = 0; x < 2; x++)
```

## Latihan

1. **Dengan tangan.** (`AI: tanpa AI`) Untuk `f(0) = 1`, `f(1) = 0`, tulis vektor setelah H pada keduanya, setelah oracle, dan setelah H pada qubit query. Apa hasil bacaan dan kesimpulannya?
2. **Dengan rumus.** (`AI: tanpa AI`) Untuk `f(0) = 1`, `f(1) = 1`, tulis keadaan qubit query setelah oracle dengan rumus `(-1)^f(x)`, lalu setelah H. Apakah tanda minus global memengaruhi hasil?
3. **Tanpa H terakhir.** (`AI: boleh`) Hapus pemanggilan `gerbang_pertama` setelah oracle. Prediksi dulu `P(query terbaca 1)` untuk keempat fungsi, jalankan, dan jelaskan.
4. **Rancang dulu.** (`AI: boleh`) Tulis pseudocode pemeriksa klasik yang pasti benar untuk fungsi satu bit, dan sebut berapa query yang ia pakai.
5. **Catatan pemakaian AI (opsional).** Bila memakai asisten AI, catat alat, tujuan, garis besar perintah, bagian yang dipakai, dan cara memeriksanya.

## Latihan bercampur

1. Hitung hasil kali tensor `(h, h)` dan `(h, -h)`, dan bandingkan dengan keadaan setelah H pada keduanya. (`e-xi1-m12`)
2. Sebuah simulasi Deutsch untuk `f` seimbang melaporkan `P(query terbaca 1) = 0,97`. Apa dua penyebab yang kamu periksa lebih dulu? (`e-xi1-m13`)
3. Apakah mengalikan seluruh keadaan dengan -1 mengubah peluang pembacaan apa pun? (`e-xi2-m5`)

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `e-xi2-m12` (satu minggu lagi), `e-xi2-m14` (sekitar tiga minggu lagi), dan `e-xii1-m5` (sekitar delapan minggu lagi). Jawab sekarang lalu simpan.

1. Pada algoritma Deutsch, mengapa qubit bantu dimulai dari |1> lalu diberi H, dan apa keadaan qubit pertama sesudah oracle?
2. Apa yang dihitung hitungan "satu query lawan dua" pada algoritma Deutsch, dan apa yang tidak dibuktikannya tentang kecepatan komputer?
3. Mengapa tanda minus pada amplitudo tidak mengubah peluang pembacaan langsung tetapi dapat mengubah hasil setelah H?

## Kesalahan umum

- **"Algoritma Deutsch menghitung `f(0)` dan `f(1)` sekaligus lalu membaca keduanya."** Yang terbaca hanya `f(0) XOR f(1)`.
- **"Satu query kuantum berarti komputer kuantum lebih cepat."** Itu hitungan model query, keunggulannya sederhana, dan oracle dianggap tersedia; tidak ada klaim waktu.
- **"Hasil 0 berarti `f(x) = 0`."** Hasil 0 berarti `f` konstan; nilai `f` sendiri tidak diketahui.
- **"Qubit bantu hanya sampah."** Ia dimulai dari `|1>`, diberi H menjadi `|->`, dan membuat hasil `f(x)` pindah menjadi tanda pada qubit query.

## Cek mandiri

- [ ] Saya dapat menelusuri empat langkah algoritma Deutsch pada vektor dua qubit.
- [ ] Saya dapat menjelaskan arti hasil bacaan 0 dan 1.
- [ ] Saya dapat menjelaskan phase kickback secara singkat.
- [ ] Saya dapat menyebut batas klaim "satu query lawan dua".
- [ ] Saya mencatat pemakaian AI bila saya memakainya.

## Kunci dan petunjuk

**Ingat kembali.** 1: `|x>|y>` menjadi `|x>|y XOR f(x)>`; ia hanya menukar tempat komponen (permutasi), jadi reversibel walau `f` konstan tidak satu-satu. 2: klasik paling banyak 3/4; kuantum dalam simulasi kira-kira 0,8536. 3: H, baca, H: bacaan memutus keadaan menjadi `|0>` atau `|1>` sehingga tidak ada interferensi dan peluang 0,5; H, H tanpa bacaan: kedua jalur amplitudo berinterferensi dan hasilnya `|0>` pasti.

**Prediksi dulu.** (1) pasti: 0; (2) satu kali; (3) tidak, hanya `f(0) XOR f(1)`.

**Contoh setengah jadi.** 1: `(0,5; -0,5; 0,5; -0,5)`. 2: `(0,7071; -0,7071; 0; 0)`. 3: `1` untuk `self.dipasang += 1`; `^` (XOR). Kunci ini dikompilasi dan dijalankan penyusun.

**Soal Parsons.** c, e, b, d, a.

**Latihan.** 1: setelah H, H: `(0,5; -0,5; 0,5; -0,5)`; oracle membalik qubit bantu bila query 0 (`f(0) = 1`): `(-0,5; 0,5; 0,5; -0,5)`; H pada query: `(0; 0; -0,7071; 0,7071)`; query terbaca 1 dengan peluang 1, jadi seimbang. 2: setelah oracle `(-|0> - |1>)` dibagi akar2, yaitu `-|+>`; H memberi `-|0>`; tanda minus global tidak teramati, query terbaca 0, jadi konstan. 3: tanpa H terakhir, qubit query tetap `((-1)^f(0) |0> + (-1)^f(1) |1>)` dibagi akar2 dan terbaca 0 atau 1 dengan peluang 0,5 untuk keempat fungsi (keluaran penyusun 0,5): informasi ada di tanda, dan tanda hanya terlihat lewat interferensi. 4: contoh: `tanya f(0); tanya f(1); jika sama konstan, jika beda seimbang`; 2 query. 5: opsional.

**Latihan bercampur.** 1: `(h*h; h*(-h); h*h; h*(-h)) = (0,5; -0,5; 0,5; -0,5)`, sama. 2: kode: oracle salah susun, H terlewat, atau vektor tidak dinormalkan; hitungan tangan kecil (`f` satu bit) untuk dibandingkan. 3: tidak; peluang adalah kuadrat amplitudo, `(-1)^2 = 1` (fase global).

**Ulang berjarak.** 1: qubit bantu `|1>` diberi H menjadi `|->`; `X|-> = -|->`, sehingga oracle memberi tanda `(-1)^f(x)` pada qubit query dan qubit bantu tetap `|->`; qubit query menjadi `((-1)^f(0) |0> + (-1)^f(1) |1>)` dibagi akar2. 2: banyak pemasangan oracle (satu) lawan banyak query klasik pasti benar (dua) dalam model query; tidak membuktikan komputer kuantum lebih cepat dalam waktu, karena biaya membangun oracle tidak dihitung. 3: peluang adalah kuadrat amplitudo sehingga tanda hilang; tetapi H menjumlahkan amplitudo, dan tanda menentukan penguatan atau pembatalan (interferensi).

## Langkah berikutnya

Modul berikut: `e-xi2-m12` (algoritma Deutsch-Jozsa pada tiga qubit). Bacaan pendamping: `e-xi1-m9` (interferensi) dan `e-xi2-m10` (oracle).
