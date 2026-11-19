## Untuk siapa modul ini

Modul ini untuk murid kelas XI jalur E (komputasi kuantum), minggu `E-XI1-M11` silabus v1.4: simulator sendiri II. Prasyarat: modul `e-xi1-m10` (simulator sendiri I). Bagian pemrograman mensyaratkan dasar setara `A-X1-M9..M12` (C++) atau `B-X1-M9..M12` (TypeScript dengan Bun), yang tidak diindeks sebagai prasyarat modul ini; bagian konsep (pembacaan sebagai undian berbobot, shot, histogram) terbuka bagi semua murid. Alat: kertas, kalkulator, dan kompilator C++ atau Bun.

Modul ini berstatus DRAF: karangan penyusun, belum ditinjau pemilik. Jalur E adalah pengayaan di luar rumusan capaian pembelajaran (CP). Minggu ini menyentuh butir pengayaan `F-AP-d` (program dengan struktur data kompleks memakai library atau perangkat) hanya lewat simulator buatan sendiri; irisan itu tidak dihitung memenuhi CP.

Aturan AI jalur ini: AI generatif boleh dipakai dengan etika dan dicatat, tanpa data pribadi, kata sandi, atau tugas bernilai pada permintaanmu, dan tanpa akun wajib. Saran: jawab dulu sendiri, baru minta penjelasan atau petunjuk bertahap. Setiap soal `Latihan` bertanda `AI: boleh` atau `AI: tanpa AI`.

Catatan untuk guru: pembangkit bilangan acak di modul ini ditulis sendiri (kongruensi linear dengan konstanta 1664525 dan 1013904223, aritmetika 32 bit) agar C++ dan TypeScript menghasilkan angka yang sama persis; keduanya dijalankan penyusun dan keluarannya identik. Pembangkit ini **bukan untuk keamanan**: urutannya dapat ditebak dari benihnya. Konstanta itu dipakai sebagai contoh kerja, bukan klaim tentang mutu statistiknya `[belum terverifikasi]`.

## Ingat kembali

Jawab dari ingatan, baru cek di bagian kunci.

1. Matriks `R = [[0, -1], [1, 0]]` diterapkan pada `(3, 4)`: berapa hasilnya dan berapa panjangnya? (dari `e-xi1-m3`)
2. Mengapa Z tidak mengubah peluang hasil pada `(0,7071 ; 0,7071)`, tetapi tetap mengubah keadaannya? (dari `e-xi1-m8`)
3. Dalam simulator, bagaimana vektor keadaan disimpan dan bagaimana satu gerbang diterapkan? (dari `e-xi1-m10`)

## Tujuan

Setelah modul ini kamu dapat:

- menyimulasikan satu pembacaan dengan bilangan acak semu dari amplitudo keadaan;
- menjalankan banyak shot dan menyusun histogram hasil;
- membandingkan histogram dengan peluang hasil hitungan tangan memakai simpangan wajar;
- menjelaskan mengapa pembangkit dengan benih tetap memberi hasil yang bisa diulang persis.

## Prediksi dulu

Simulatormu menyimpan keadaan setelah H pada `|0>`, lalu membaca 1000 shot. Sebelum membaca contoh, tebak dan tulis: (1) jumlah hasil 0 yang diharapkan dan kisaran wajarnya; (2) apakah hasilnya sama persis bila program dijalankan dua kali tanpa mengubah apa pun; (3) bila sirkuitnya H, Z, H, berapa hasil 0 dan hasil 1?

## Contoh terselesaikan

**Satu pembacaan sebagai undian berbobot.** Bangkitkan bilangan acak `r` di [0, 1). Jumlahkan peluang hasil satu per satu: bila `r` lebih kecil dari peluang hasil 0, hasilnya 0; bila tidak, 1. Peluang hasil ke-`i` adalah amplitudo ke-`i` kuadrat (aturan Born, `e-xi1-m6`). Fungsi `ukur` di bawah menulis ini untuk sebanyak apa pun hasil, sehingga dua qubit (`e-xi1-m12`) tidak perlu kode baru.

**Benih tetap.** Pembangkit bilangan acak semu menghasilkan deretan yang ditentukan seluruhnya oleh benihnya: benih sama, deretan sama. Itu berguna untuk menguji program (hasil bisa diulang), tetapi artinya "acak" di sini hanyalah tampak acak. Qubit nyata tidak bisa diulang persis seperti ini (lihat `e-xi1-m13`).

**Simpangan wajar.** Seperti di `e-xi1-m7`, jumlah hasil 0 pada N shot kira-kira N kali P(0), dengan simpangan wajar akar dari `N * P(0) * P(1)`. Untuk H pada `|0>` dan N = 1000: harapan 500 dan simpangan akar 250, kira-kira 15,8. Selisih lebih dari tiga simpangan sangat jarang; bila sering terjadi, curigai kodenya.

**C++ (jalur A).**

```cpp
#include <cmath>
#include <cstdint>
#include <iomanip>
#include <iostream>
#include <string>
#include <vector>

using Vektor = std::vector<double>;
using Matriks = std::vector<Vektor>;

const double H1 = 1.0 / std::sqrt(2.0);
const Matriks Z = {{1, 0}, {0, -1}};
const Matriks H = {{H1, H1}, {H1, -H1}};

Vektor terapkan(const Matriks& gerbang, const Vektor& keadaan) {
    Vektor hasil(keadaan.size(), 0.0);
    for (size_t baris = 0; baris < gerbang.size(); baris++) {
        for (size_t kolom = 0; kolom < keadaan.size(); kolom++) {
            hasil[baris] += gerbang[baris][kolom] * keadaan[kolom];
        }
    }
    return hasil;
}

// Pembangkit bilangan acak semu buatan sendiri (kongruensi linear): sama seperti
// versi TypeScript, sehingga keduanya menghasilkan angka yang sama.
uint32_t benih = 12345;

double acak01() {
    benih = 1664525u * benih + 1013904223u;  // aritmetika 32 bit, melingkar
    return benih / 4294967296.0;             // bilangan di [0, 1)
}

// Satu shot: kembalikan indeks hasil; peluang indeks i adalah amplitudo ke-i kuadrat.
int ukur(const Vektor& keadaan) {
    double r = acak01();
    double kumulatif = 0;
    for (size_t i = 0; i < keadaan.size(); i++) {
        kumulatif += keadaan[i] * keadaan[i];
        if (r < kumulatif) return static_cast<int>(i);
    }
    return static_cast<int>(keadaan.size()) - 1;  // sisa galat pembulatan
}

void jalankan(const std::string& label, const Vektor& keadaan, int shot) {
    std::vector<int> hitung(keadaan.size(), 0);
    for (int i = 0; i < shot; i++) hitung[ukur(keadaan)]++;

    std::cout << label << ", " << shot << " shot\n";
    for (size_t hasil = 0; hasil < hitung.size(); hasil++) {
        double p = keadaan[hasil] * keadaan[hasil];
        double harapan = shot * p;
        double simpangan = std::sqrt(shot * p * (1 - p));
        std::cout << "  hasil " << hasil << ": " << std::setw(4) << hitung[hasil]
                  << "  (harapan " << harapan << ", selisih " << hitung[hasil] - harapan;
        if (simpangan > 0) {
            std::cout << " = " << (hitung[hasil] - harapan) / simpangan << " simpangan";
        }
        std::cout << ")";
        if (hitung[hasil] >= 20) std::cout << "  " << std::string(hitung[hasil] / 20, '#');
        std::cout << "\n";
    }
}

int main() {
    std::cout << std::fixed << std::setprecision(1);
    Vektor nol = {1, 0};
    jalankan("H pada |0>", terapkan(H, nol), 1000);
    jalankan("keadaan (0,6 ; 0,8)", {0.6, 0.8}, 1000);
    jalankan("H, Z, H pada |0>", terapkan(H, terapkan(Z, terapkan(H, nol))), 1000);
    return 0;
}
```

Keluaran asli (dijalankan penyusun dengan `g++ -std=c++17 -Wall -Wextra`):

```text
H pada |0>, 1000 shot
  hasil 0:  489  (harapan 500.0, selisih -11.0 = -0.7 simpangan)  ########################
  hasil 1:  511  (harapan 500.0, selisih 11.0 = 0.7 simpangan)  #########################
keadaan (0,6 ; 0,8), 1000 shot
  hasil 0:  369  (harapan 360.0, selisih 9.0 = 0.6 simpangan)  ##################
  hasil 1:  631  (harapan 640.0, selisih -9.0 = -0.6 simpangan)  ###############################
H, Z, H pada |0>, 1000 shot
  hasil 0:    0  (harapan 0.0, selisih 0.0)
  hasil 1: 1000  (harapan 1000.0, selisih 0.0 = 0.0 simpangan)  ##################################################
```

Bacaan hasilnya: 489 dan 511 untuk H pada `|0>` berselisih 11 dari harapan 500, kira-kira 0,7 simpangan: wajar. Keadaan `(0,6 ; 0,8)` memberi 369 dan 631 terhadap harapan 360 dan 640, wajar. Sirkuit H, Z, H memberi 1000 hasil 1: peluangnya persis 1, sehingga tidak ada simpangan, sesuai `e-xi1-m9`.

**TypeScript dengan Bun (jalur B).** Pembangkit memakai `Math.imul` dan `>>> 0` untuk meniru aritmetika 32 bit. Keluarannya sama persis dengan versi C++ (dijalankan penyusun dengan `bun`, dibandingkan baris demi baris).

```ts
type Vektor = number[];
type Matriks = number[][];

const H1 = 1 / Math.sqrt(2);
const Z: Matriks = [[1, 0], [0, -1]];
const H: Matriks = [[H1, H1], [H1, -H1]];

function terapkan(gerbang: Matriks, keadaan: Vektor): Vektor {
  const hasil: Vektor = new Array(keadaan.length).fill(0);
  for (let baris = 0; baris < gerbang.length; baris++) {
    for (let kolom = 0; kolom < keadaan.length; kolom++) {
      hasil[baris] += gerbang[baris][kolom] * keadaan[kolom];
    }
  }
  return hasil;
}

// Pembangkit bilangan acak semu yang sama dengan versi C++ (kongruensi linear, 32 bit).
let benih = 12345;

function acak01(): number {
  benih = (Math.imul(1664525, benih) + 1013904223) >>> 0; // melingkar di 32 bit
  return benih / 4294967296; // bilangan di [0, 1)
}

// Satu shot: kembalikan indeks hasil; peluang indeks i adalah amplitudo ke-i kuadrat.
function ukur(keadaan: Vektor): number {
  const r = acak01();
  let kumulatif = 0;
  for (let i = 0; i < keadaan.length; i++) {
    kumulatif += keadaan[i] * keadaan[i];
    if (r < kumulatif) return i;
  }
  return keadaan.length - 1; // sisa galat pembulatan
}

function jalankan(label: string, keadaan: Vektor, shot: number): void {
  const hitung: number[] = new Array(keadaan.length).fill(0);
  for (let i = 0; i < shot; i++) hitung[ukur(keadaan)]++;

  console.log(`${label}, ${shot} shot`);
  for (let hasil = 0; hasil < hitung.length; hasil++) {
    const p = keadaan[hasil] * keadaan[hasil];
    const harapan = shot * p;
    const simpangan = Math.sqrt(shot * p * (1 - p));
    let baris = `  hasil ${hasil}: ${String(hitung[hasil]).padStart(4)}  (harapan ${harapan.toFixed(1)}, selisih ${(hitung[hasil] - harapan).toFixed(1)}`;
    if (simpangan > 0) baris += ` = ${((hitung[hasil] - harapan) / simpangan).toFixed(1)} simpangan`;
    baris += ")";
    if (hitung[hasil] >= 20) baris += `  ${"#".repeat(Math.floor(hitung[hasil] / 20))}`;
    console.log(baris);
  }
}

const nol: Vektor = [1, 0];
jalankan("H pada |0>", terapkan(H, nol), 1000);
jalankan("keadaan (0,6 ; 0,8)", [0.6, 0.8], 1000);
jalankan("H, Z, H pada |0>", terapkan(H, terapkan(Z, terapkan(H, nol))), 1000);
```

**Makin banyak shot.** Jumlah hasil dengan 10000 shot memberi selisih lebih besar dalam angka mutlak (misalnya 53 dari harapan 5000 untuk H pada `|0>`, lawan 11 pada 1000 shot), tetapi lebih kecil dibanding total: simpangan wajar tumbuh kira-kira seperti akar N, sedangkan frekuensi (jumlah dibagi N) mendekati peluang seperti 1 per akar N.

## Contoh setengah jadi

Lengkapi (kunci di bagian akhir).

1. Keadaan `(0,8 ; 0,6)` memberi P(0) = ____ dan P(1) = ____. Pada 1000 shot, harapan hasil 0 adalah ____ dan simpangan wajar kira-kira ____.
2. Lengkapi fungsi `ukur` untuk dua hasil:

```cpp setengah-jadi
int ukur(const Vektor& keadaan) {
    double r = acak01();
    double kumulatif = 0;
    for (size_t i = 0; i < keadaan.size(); i++) {
        kumulatif += keadaan[i] * ____;
        if (r < ____) return ____;
    }
    return static_cast<int>(keadaan.size()) - 1;
}
```

3. Pada 1000 shot hasil 0 muncul 380 kali padahal harapannya 360 dan simpangan 15,2. Selisihnya ____ simpangan; apakah wajar? ____

## Soal Parsons

Susun baris-baris di bawah (sudah diacak) menjadi pembangkit bilangan acak yang benar. Penjorokan sengaja dihilangkan.

```text
(a) uint32_t benih = 12345;
(b) double acak01() {
(c) benih = 1664525u * benih + 1013904223u;
(d) return benih / 4294967296.0;
(e) }
```

## Latihan

1. **Perkiraan.** (`AI: tanpa AI`) Keadaan setelah H pada `(0,6 ; 0,8)`: tentukan peluang kedua hasil, harapan hasil 0 pada 1000 shot, dan simpangan wajar.
2. **Ubah benih.** (`AI: boleh`) Ubah benih menjadi 777 dan jalankan. Catat hasil 0 untuk H pada `|0>`. Mengapa hasilnya berubah padahal peluangnya sama?
3. **Seribu jadi sepuluh ribu.** (`AI: boleh`) Ubah semua jumlah shot menjadi 10000 dan ubah pembagi panjang batang agar tidak terlalu panjang. Bandingkan selisih mutlak dan selisih relatif dengan 1000 shot.
4. **Rancang dulu.** (`AI: boleh`) Tulis pseudocode yang menerima keadaan dua qubit (empat amplitudo) dan jumlah shot, lalu mengembalikan empat hitungan. Baru ubah menjadi kode bila mau.
5. **Catatan pemakaian AI (opsional).** Bila memakai asisten AI, catat alat, tujuan, garis besar perintah, bagian yang dipakai, dan cara memeriksa jawabannya.

## Latihan bercampur

1. Keadaan `(0,28 ; 0,96)` diberi H. Hitung vektor hasil, peluang, dan hitungan yang diharapkan pada 1000 shot. (`e-xi1-m8`, `e-xi1-m6`)
2. Telusuri H, Z, H, Z pada `|0>` dengan tangan lalu tebak histogram simulatormu. (`e-xi1-m9`)
3. Mengapa perulangan `for` pada fungsi `terapkan` perlu dua tingkat, satu untuk baris dan satu untuk kolom? (`e-xi1-m10`)

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `e-xi1-m12` (satu minggu lagi), `e-xi1-m14` (sekitar tiga minggu lagi), dan `e-xi2-m5` (sekitar delapan minggu lagi). Jawab sekarang lalu simpan.

1. Jika seribu shot dari peluang 0,5 memberi 515 hasil 0, apakah itu wajar? Beri kisarannya.
2. Mengapa pembangkit bilangan acak dengan benih tetap menghasilkan keluaran yang sama setiap dijalankan, dan apa artinya bagi keacakan simulasi?
3. Saat jumlah shot membesar, apa yang terjadi pada selisih mutlak dan pada selisih relatif terhadap harapan?

## Kesalahan umum

- **"Keluaran yang sama tiap dijalankan berarti ada bug."** Benih tetap memang menghasilkan keluaran sama; ubah benih untuk melihat variasi.
- **"Seribu shot harus memberi persis 360."** Itu harapan; hasil berada di sekitarnya dengan simpangan wajar.
- **"Pembangkit buatan sendiri ini aman untuk kata sandi."** Tidak: urutannya dapat ditebak, hanya untuk simulasi.
- **"Menyimulasikan pembacaan berarti menyimpulkan keadaan dari satu hasil."** Simulator tahu vektor keadaannya; satu hasil tetap tidak membeberkan keadaan.

## Cek mandiri

- [ ] Saya dapat menyimulasikan satu pembacaan dari amplitudo.
- [ ] Saya dapat menjalankan banyak shot dan menyusun histogram.
- [ ] Saya dapat membandingkan histogram dengan peluang tangan memakai simpangan wajar.
- [ ] Saya dapat menjelaskan benih tetap dan keterbatasannya.
- [ ] Saya mencatat pemakaian AI bila saya memakainya.

## Kunci dan petunjuk

**Ingat kembali.** 1: `R (3, 4) = (0*3 + (-1)*4 ; 1*3 + 0*4) = (-4, 3)`; panjang akar(16 + 9) = 5, tidak berubah. 2: peluang dari kuadrat amplitudo, jadi tanda hilang; tetapi Z mengubah `(h, h)` menjadi `(h, -h)`, dan gerbang berikutnya bisa menjadikannya beda peluang. 3: larik dua amplitudo; gerbang matriks 2 x 2 yang dikalikan pada vektor, baris demi baris.

**Prediksi dulu.** (1) 500, kira-kira 484 sampai 516 (satu simpangan 15,8); (2) ya, sama persis karena benihnya tetap; (3) 0 hasil 0 dan 1000 hasil 1. Banyak murid menebak keluaran berubah tiap kali dijalankan.

**Contoh setengah jadi.** 1: 0,64 dan 0,36; harapan 640; simpangan akar(1000 x 0,64 x 0,36) = akar 230,4, kira-kira 15,2. 2: `keadaan[i]`; `kumulatif`; `static_cast<int>(i)`. 3: selisih 20, kira-kira 1,3 simpangan; wajar.

**Soal Parsons.** a, b, c, d, e.

**Latihan.** 1: H `(0,6 ; 0,8) = (0,9899 ; -0,1414)`; P(0) = 0,98 dan P(1) = 0,02; harapan hasil 0 adalah 980; simpangan akar(1000 x 0,98 x 0,02) = akar 19,6, kira-kira 4,4. 2: dengan benih 777, H pada `|0>` memberi 503 hasil 0 dan 497 hasil 1 (keluaran penyusun; berubah karena deretan acaknya berbeda, peluang tetap 0,5). 3: dengan 10000 shot penyusun memperoleh 4947 dan 5053 untuk H pada `|0>`, serta 3651 dan 6349 untuk `(0,6 ; 0,8)`; selisih mutlak 53 dan 51 lebih besar daripada 11 dan 9 pada 1000 shot, tetapi selisih relatif (53 per 5000, kira-kira 1,1 persen) lebih kecil daripada 11 per 500 (kira-kira 2,2 persen). 4: contoh: `hitung = [0, 0, 0, 0]; ulangi n kali: ambil r acak di [0, 1); jumlahkan kuadrat amplitudo berurutan sampai melewati r; naikkan hitung pada indeks itu; kembalikan hitung`. 5: opsional.

**Latihan bercampur.** 1: `((0,28 + 0,96)h ; (0,28 - 0,96)h) = (0,8768 ; -0,4808)`; P(0) = 0,7688 dan P(1) = 0,2312; harapan 768,8 dan 231,2. 2: H, Z, H memberi `(0, 1)`; Z memberi `(0, -1)`; peluang membaca 1 adalah 1, jadi 1000 hasil 1 dan 0 hasil 0. 3: satu tingkat untuk memilih baris hasil, satu untuk menjumlahkan hasil kali dalam di sepanjang kolom.

**Ulang berjarak.** 1: wajar; harapan 500, simpangan 15,8, jadi kisaran satu simpangan 484 sampai 516 dan 515 berselisih kira-kira 0,95 simpangan. 2: deretan ditentukan oleh benih, jadi benih sama memberi deretan sama; artinya simulasi tampak acak tetapi bisa diulang dan ditebak, bukan keacakan sejati. 3: selisih mutlak tumbuh kira-kira seperti akar N, sedangkan selisih relatif terhadap harapan mengecil kira-kira seperti 1 per akar N.

## Langkah berikutnya

Modul berikut: `e-xi1-m12` (dua qubit dan hasil kali tensor): vektor empat komponen untuk dua qubit; fungsi `ukur` dari modul ini sudah siap memakainya. Bacaan pendamping: `e-xi1-m7` (shot dan histogram).
