## Untuk siapa modul ini

Modul ini untuk murid kelas XI jalur E (komputasi kuantum), minggu `E-XI2-M6` silabus v1.4: reversibilitas. Prasyarat: modul `e-xi2-m5` (gerbang fase dan rotasi), dan pengertian fungsi satu-ke-satu dari `matkom-himpunan-relasi-fungsi`. Alat: kertas, kalkulator, dan Quirk (peramban, tanpa akun). Contoh C++17 bersifat opsional (pustaka standar saja dan tanpa akun; murid jalur B boleh menerjemahkannya ke TypeScript); hitungan dikerjakan dengan tangan lebih dulu.

Modul ini berstatus DRAF: karangan penyusun, belum ditinjau pemilik. Jalur E adalah pengayaan di luar rumusan capaian pembelajaran (CP); minggu ini tidak punya irisan pengayaan, jadi modul ini tidak dihitung memenuhi butir CP mana pun.

Aturan AI jalur ini: AI generatif boleh dipakai dengan etika dan dicatat, tanpa data pribadi, kata sandi, atau tugas bernilai pada permintaanmu, dan tanpa akun wajib. Saran: jawab dulu sendiri, baru minta penjelasan atau petunjuk bertahap. Setiap soal `Latihan` bertanda `AI: boleh` atau `AI: tanpa AI`.

Catatan untuk guru: bahwa operasi yang deterministik dan uniter disebut reversibel, bahwa kebalikannya diberikan oleh konjugat transpos matriks uniter, dan matriks Toffoli (CCX) 8 x 8 dibaca penyusun dari halaman IBM Quantum Learning "Quantum information" (multiple systems), per 2026-11-19; halaman yang sama menyebut CNOT dan gerbang berkontrol lain. Pada amplitudo real, konjugat transpos sama dengan transpos biasa; modul ini memakai gerbang real saja pada bagian hitungan. Bahwa pengukuran tidak reversibel di modul ini ditunjukkan lewat contoh, bukan dikutip dari halaman itu. Pemeriksaan "uniter" di program hanya untuk matriks real dan beberapa contoh. Di Quirk, penyusun melihat bahwa pada tiga kabel, urutan dari bawah adalah qubit pertama, kedua, dan ketiga.

## Ingat kembali

Jawab dari ingatan, baru cek di bagian kunci.

1. Apa hasil gerbang S dua kali, dan apa kebalikan (invers) Z? (dari `e-xi2-m5`)
2. Berapa komponen vektor keadaan tiga qubit, dan sebutkan delapan hasilnya berurutan. (dari `e-xi1-m12`)
3. Apakah `(0,5 ; 0,5 ; 0,5 ; 0,5)` dapat difaktorkan? Tunjukkan dengan `a*d` dan `b*c`. (dari `e-xi2-m2`)

## Tujuan

Setelah modul ini kamu dapat:

- menjelaskan arti gerbang reversibel dan memeriksa bahwa sebuah gerbang klasik pada bit reversibel atau tidak;
- menjelaskan mengapa gerbang kuantum (matriks uniter) selalu reversibel, dan mengapa pengukuran tidak;
- menuliskan tabel kebenaran gerbang Toffoli dan menjelaskan efeknya;
- membuat AND dari Toffoli dengan bit ketiga yang dimulai dari 0.

## Prediksi dulu

Gerbang AND klasik mengubah dua bit menjadi satu bit. Gerbang Toffoli menerima tiga bit `a, b, c` dan membalik `c` hanya bila `a` dan `b` keduanya 1. Sebelum membaca contoh, tebak dan tulis: (1) bila keluaran AND adalah 0, apakah kamu dapat memastikan masukannya; (2) keluaran Toffoli untuk `110` dan untuk `111`; (3) bila bit ketiga dimulai dari 0, apa yang dihitung bit ketiga setelah Toffoli.

## Contoh terselesaikan

**Reversibel.** Sebuah operasi pada keadaan dasar reversibel bila keluarannya memberi tahu masukannya secara tunggal: ia fungsi satu-ke-satu dan pada (bijeksi, `matkom-himpunan-relasi-fungsi`), sehingga ada operasi kebalikan yang mengembalikan masukan. Halaman IBM yang dibaca penyusun menyebut operasi yang deterministik sekaligus uniter sebagai reversibel, dan kebalikannya diberikan konjugat transpos matriksnya.

**AND tidak reversibel.** AND memetakan empat masukan ke dua keluaran: keluaran 0 berasal dari `00`, `01`, atau `10`; keluaran 1 dari `11`. Dari keluaran 0 kamu tidak tahu masukannya, jadi informasi hilang dan tidak ada operasi kebalikan.

**Gerbang kuantum reversibel.** Gerbang kuantum adalah matriks uniter. Matriks uniter punya kebalikan: untuk matriks real, kebalikannya transpos. H dan CNOT adalah kebalikan dirinya sendiri (H kali H dan CNOT kali CNOT memberi identitas); S bukan kebalikan dirinya sendiri; kebalikannya mengalikan komponen `|1>` dengan `-i`, yaitu memutar fase ke arah sebaliknya. Karena reversibel, sirkuit kuantum tidak dapat memakai AND atau OR biasa begitu saja.

**Toffoli.** Toffoli (CCX, "controlled-controlled-NOT") membalik bit ketiga hanya bila dua bit pertama keduanya 1. Matriksnya 8 x 8 dan hanya menukar dua komponen: `110` dan `111`. Ia reversibel: dikerjakan dua kali, hasilnya kembali. Bila bit ketiga dimulai dari 0, hasilnya `(a, b, a AND b)`: dua bit pertama tetap, bit ketiga menjadi AND. Dengan begitu AND diperoleh tanpa kehilangan informasi, karena masukan `a` dan `b` ikut tersimpan.

**Pengukuran tidak reversibel.** Keadaan `(0,6 ; 0,8)` dan `(0,8 ; 0,6)` dibaca dan hasilnya 1: keduanya menjadi `|1>` (`e-xi1-m7`). Dari `|1>` kamu tidak dapat tahu keadaan awalnya. Matriks "baca hasil 0" `[[1, 0], [0, 0]]` tidak uniter. Jadi pembacaan memang kehilangan informasi, berbeda dari gerbang.

```cpp
#include <cmath>
#include <cstdio>
#include <set>
#include <vector>

using Matriks = std::vector<std::vector<double>>;

// Balik bit c bila a dan b keduanya 1. Tiga bit dibungkus menjadi satu bilangan 0..7: (a, b, c).
int toffoli(int x) {
    int a = (x >> 2) & 1, b = (x >> 1) & 1, c = x & 1;
    return (a << 2) | (b << 1) | (c ^ (a & b));
}

void cetak_bit(int x) { std::printf("%d %d %d", (x >> 2) & 1, (x >> 1) & 1, x & 1); }

Matriks matriks_toffoli() {
    Matriks m(8, std::vector<double>(8, 0.0));
    for (int i = 0; i < 8; i++) m[toffoli(i)][i] = 1.0;
    return m;
}

// Untuk matriks real: uniter bila M kali transposnya = identitas.
bool uniter_real(const Matriks& m) {
    size_t n = m.size();
    for (size_t i = 0; i < n; i++)
        for (size_t j = 0; j < n; j++) {
            double nilai = 0.0;
            for (size_t k = 0; k < m[0].size(); k++) nilai += m[i][k] * m[j][k];
            if (std::fabs(nilai - (i == j ? 1.0 : 0.0)) > 1e-9) return false;
        }
    return true;
}

const char* benar(bool b) { return b ? "benar" : "salah"; }

// Keadaan sesudah hasil dibaca: |0> atau |1>, apa pun amplitudo awalnya (asal hasil itu mungkin muncul).
void setelah_baca(const double v[2], int hasil, double keluar[2]) {
    if (v[hasil] == 0.0) std::printf("hasil mustahil\n");
    keluar[0] = hasil == 0 ? 1.0 : 0.0;
    keluar[1] = hasil == 0 ? 0.0 : 1.0;
}

int main() {
    std::printf("tabel Toffoli (a b c -> a b c')\n");
    std::set<int> keluaran;
    for (int x = 0; x < 8; x++) {
        std::printf("  ");
        cetak_bit(x);
        std::printf(" -> ");
        cetak_bit(toffoli(x));
        std::printf("\n");
        keluaran.insert(toffoli(x));
    }
    std::printf("keluaran berbeda: %zu dari 8 masukan\n", keluaran.size());

    // AND biasa: empat masukan, hanya dua keluaran, jadi tidak dapat dibalik.
    std::printf("AND mengelompokkan masukan:\n");
    for (int hasil = 0; hasil < 2; hasil++) {
        std::printf("  keluaran %d <-", hasil);
        for (int a = 0; a < 2; a++)
            for (int b = 0; b < 2; b++)
                if ((a & b) == hasil) std::printf(" (%d, %d)", a, b);
        std::printf("\n");
    }

    // AND lewat Toffoli: bit ketiga dimulai dari 0.
    for (int a = 0; a < 2; a++)
        for (int b = 0; b < 2; b++) {
            int bit_ketiga = toffoli((a << 2) | (b << 1)) & 1;
            std::printf("  Toffoli(%d, %d, 0) -> bit ketiga %d, sama dengan AND: %s\n", a, b, bit_ketiga,
                        benar(bit_ketiga == (a & b)));
        }

    // Toffoli dua kali memberi masukan semula.
    bool semua = true;
    for (int x = 0; x < 8; x++)
        if (toffoli(toffoli(x)) != x) semua = false;
    std::printf("Toffoli dua kali = semula: %s\n", benar(semua));

    double h = 1.0 / std::sqrt(2.0);
    std::printf("H uniter           : %s\n", benar(uniter_real({{h, h}, {h, -h}})));
    std::printf("CNOT uniter        : %s\n",
                benar(uniter_real({{1, 0, 0, 0}, {0, 1, 0, 0}, {0, 0, 0, 1}, {0, 0, 1, 0}})));
    std::printf("Toffoli uniter     : %s\n", benar(uniter_real(matriks_toffoli())));
    std::printf("baca hasil 0 (proyeksi [[1,0],[0,0]]) uniter: %s\n", benar(uniter_real({{1, 0}, {0, 0}})));

    // Dua keadaan awal berbeda, satu keadaan sesudahnya: pembacaan tidak dapat dibalik.
    const double awal[2][2] = {{0.6, 0.8}, {0.8, 0.6}};
    for (const auto& v : awal) {
        double sesudah[2];
        setelah_baca(v, 1, sesudah);
        std::printf("keadaan awal (%.1f, %.1f) -> setelah hasil 1 dibaca: (%.0f, %.0f)\n", v[0], v[1],
                    sesudah[0], sesudah[1]);
    }
    return 0;
}
```

Keluaran asli (`g++ -std=c++17 -Wall -Wextra`):

```text
tabel Toffoli (a b c -> a b c')
  0 0 0 -> 0 0 0
  0 0 1 -> 0 0 1
  0 1 0 -> 0 1 0
  0 1 1 -> 0 1 1
  1 0 0 -> 1 0 0
  1 0 1 -> 1 0 1
  1 1 0 -> 1 1 1
  1 1 1 -> 1 1 0
keluaran berbeda: 8 dari 8 masukan
AND mengelompokkan masukan:
  keluaran 0 <- (0, 0) (0, 1) (1, 0)
  keluaran 1 <- (1, 1)
  Toffoli(0, 0, 0) -> bit ketiga 0, sama dengan AND: benar
  Toffoli(0, 1, 0) -> bit ketiga 0, sama dengan AND: benar
  Toffoli(1, 0, 0) -> bit ketiga 0, sama dengan AND: benar
  Toffoli(1, 1, 0) -> bit ketiga 1, sama dengan AND: benar
Toffoli dua kali = semula: benar
H uniter           : benar
CNOT uniter        : benar
Toffoli uniter     : benar
baca hasil 0 (proyeksi [[1,0],[0,0]]) uniter: salah
keadaan awal (0.6, 0.8) -> setelah hasil 1 dibaca: (0, 1)
keadaan awal (0.8, 0.6) -> setelah hasil 1 dibaca: (0, 1)
```

Bacaan hasilnya: Toffoli menghasilkan 8 keluaran berbeda dari 8 masukan (reversibel) dan hanya baris `110` dan `111` yang berubah; AND mengelompokkan tiga masukan ke keluaran 0.

**Quirk.** Buka [Toffoli dengan masukan `110`](https://algassert.com/quirk#circuit=%7B%22cols%22:%5B%5B%22X%22,%22%E2%80%A2%22,%22%E2%80%A2%22%5D%5D,%22init%22:%5B0,1,1%5D%7D): kabel bawah dan tengah bernilai 1 (kontrol), kabel atas bernilai 0 (target). Penyusun melihat ketiga tampilan kabel menyatakan "On" dan kotak amplitudo hanya menyala pada sel `11` di baris terbawah, yaitu keluaran `111` (kabel atas dibalik). **Prediksi dulu**, baru buka tautannya.

## Contoh setengah jadi

Lengkapi (kunci di bagian akhir).

1. Toffoli pada `101` memberi `____`; pada `110` memberi `____`.
2. NOT dari Toffoli: bila `a = 1` dan `b = 1`, `c` menjadi `____` dari `c`.
3. Lengkapi gerbang Toffoli:

```cpp setengah-jadi
int toffoli(int x) {
    int a = (x >> 2) & 1, b = (x >> 1) & 1, c = x & 1;
    return (a << 2) | (b << 1) | (c ^ (____ & ____));
}
```

## Soal Parsons

Susun baris-baris di bawah (sudah diacak) menjadi pemeriksaan bahwa Toffoli adalah kebalikan dirinya sendiri. Penjorokan sengaja dihilangkan.

```text
(a) std::printf("Toffoli dua kali = semula: %s\n", semua ? "benar" : "salah");
(b) if (toffoli(toffoli(x)) != x) semua = false;
(c) bool semua = true;
(d) for (int x = 0; x < 8; x++)
```

## Latihan

1. **Dengan tangan.** (`AI: tanpa AI`) Tulis keluaran Toffoli untuk `101`, `110`, dan `111`, dan tunjukkan bahwa `111` lalu Toffoli lalu Toffoli kembali ke `111`.
2. **Buat AND dan NOT.** (`AI: tanpa AI`) Tulis tabel keluaran bit ketiga Toffoli pada `(a, b, 0)` untuk empat pasangan `ab`. Lalu tunjukkan bagaimana Toffoli dengan `a = b = 1` bertindak sebagai NOT pada `c`.
3. **OR.** (`AI: boleh`) Apakah OR dua bit reversibel? Hitung berapa masukan memberi keluaran 0 dan berapa keluaran 1, dan simpulkan.
4. **Rancang dulu.** (`AI: boleh`) Tulis pseudocode yang menerima daftar keluaran untuk setiap masukan dan menjawab "reversibel" atau "tidak". Petunjuk: bandingkan jumlah keluaran berbeda dengan jumlah masukan.
5. **Catatan pemakaian AI (opsional).** Bila memakai asisten AI, catat alat, tujuan, garis besar perintah, bagian yang dipakai, dan cara memeriksa jawabannya.

## Latihan bercampur

1. CNOT memetakan indeks komponen `0, 1, 2, 3` ke indeks lain. Tulis pemetaannya dan periksa bahwa ia satu-ke-satu. (`e-xi2-m1`, `matkom-himpunan-relasi-fungsi`)
2. Dua keadaan awal berbeda, `(0,6 ; 0,8)` dan `(0,8 ; 0,6)`, dibaca dan hasilnya 1. Apa keadaan sesudah pembacaan, dan apa artinya bagi reversibilitas? (`e-xi1-m7`)
3. Hitung H kali H dan jelaskan mengapa itu menunjukkan H reversibel. (`e-xi1-m8`)

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `e-xi2-m7` (satu minggu lagi), `e-xi2-m9` (sekitar tiga minggu lagi), dan `e-xi2-m14` (sekitar delapan minggu lagi). Jawab sekarang lalu simpan.

1. Apa arti gerbang reversibel? Beri satu contoh gerbang kuantum dan satu gerbang klasik yang reversibel.
2. Mengapa pengukuran tidak reversibel, padahal gerbang kuantum reversibel?
3. Tuliskan efek Toffoli pada `(a, b, 0)` dan jelaskan mengapa itu menghitung AND.

## Kesalahan umum

- **"Semua gerbang klasik dapat dibalik."** AND dan OR tidak: keluarannya tidak menentukan masukan secara tunggal.
- **"Reversibel berarti gerbangnya tidak mengubah apa pun."** Gerbang tetap mengubah keadaan; yang dijamin adalah adanya gerbang kebalikan.
- **"Pembacaan adalah gerbang kuantum juga, jadi reversibel."** Pembacaan memberi hasil acak dan membuat keadaan menjadi `|0>` atau `|1>`; keadaan awal tidak dapat dipulihkan.
- **"Toffoli memberi AND saja."** Ia hanya memberi AND bila bit ketiga dimulai dari 0; ia juga menyimpan `a` dan `b`.
- **"Simulator tahu kebalikan gerbang karena ia 'mengingat' langkah."** Kebalikan adalah matriks (konjugat transpos); simulator tidak perlu mengingat riwayat.

## Cek mandiri

- [ ] Saya dapat menjelaskan arti reversibel dan memeriksanya pada tabel.
- [ ] Saya dapat menjelaskan mengapa AND tidak reversibel.
- [ ] Saya dapat menuliskan tabel Toffoli.
- [ ] Saya dapat membuat AND dari Toffoli.
- [ ] Saya mencatat pemakaian AI bila saya memakainya.

## Kunci dan petunjuk

**Ingat kembali.** 1: S dua kali memberi Z; Z adalah kebalikan dirinya sendiri (Z kali Z = identitas). 2: delapan komponen; urutan `000, 001, 010, 011, 100, 101, 110, 111`. 3: `a*d = 0,25` dan `b*c = 0,25`, sama, jadi dapat difaktorkan: `(h, h)` kali `(h, h)`.

**Prediksi dulu.** (1) tidak: keluaran 0 berasal dari tiga masukan; (2) `110` menjadi `111` dan `111` menjadi `110`; (3) AND dari `a` dan `b`. Banyak murid menjawab "AND, jadi pasti reversibel karena 0 dan 1 hanya dua".

**Contoh setengah jadi.** 1: `101` dan `111`. 2: `c` dibalik (menjadi kebalikannya). 3: `a & b`.

**Soal Parsons.** c, d, b, a. Nyatakan `semua` dulu, lalu perulangan, lalu periksa di dalam perulangan, lalu cetak.

**Latihan.** 1: `101` tetap `101`; `110` menjadi `111`; `111` menjadi `110`; `111` ke `110` ke `111`. 2: `(0,0,0)` ke bit ketiga 0; `(0,1,0)` ke 0; `(1,0,0)` ke 0; `(1,1,0)` ke 1; itu AND; dengan `a = b = 1`: `(1,1,0)` ke `(1,1,1)` dan `(1,1,1)` ke `(1,1,0)`, jadi `c` menjadi kebalikannya (NOT). 3: OR memberi 0 hanya untuk `00` (satu masukan) dan 1 untuk `01`, `10`, `11` (tiga masukan); dari keluaran 1 tak diketahui masukannya, jadi OR tidak reversibel. 4: contoh: `jika jumlah keluaran berbeda sama dengan jumlah masukan, jawab "reversibel"; selain itu "tidak"`. 5: opsional.

**Latihan bercampur.** 1: indeks `0 ke 0`, `1 ke 1`, `2 ke 3`, `3 ke 2`; keempat keluaran berbeda, jadi satu-ke-satu. 2: keduanya menjadi `(0, 1)` atau `|1>`; dua masukan berbeda memberi satu keluaran, jadi tidak ada kebalikan: pembacaan tidak reversibel. 3: `H kali H` memberi `[[h*h + h*h, h*h - h*h], [h*h - h*h, h*h + h*h]] = [[1, 0], [0, 1]]`; H kebalikan dirinya sendiri, jadi ada gerbang yang membatalkannya.

**Ulang berjarak.** 1: operasi yang dapat dibalik tanpa kehilangan informasi, yaitu ada operasi kebalikan; gerbang kuantum: X, H, atau CNOT; gerbang klasik: Toffoli (atau NOT). 2: pembacaan menjadikan keadaan berbeda menuju keadaan yang sama (`|0>` atau `|1>`) dan matriks bacanya tidak uniter, jadi informasi tentang amplitudo hilang; gerbang uniter punya kebalikan. 3: Toffoli memberi `(a, b, a AND b)`, karena bit ketiga yang mulai dari 0 dibalik hanya bila `a` dan `b` keduanya 1.

## Langkah berikutnya

Modul berikut: `e-xi2-m7` (tak dapat menggandakan dan teleportasi, konsep): apa yang tidak dapat disalin oleh gerbang. Bacaan pendamping: `matkom-himpunan-relasi-fungsi` (fungsi satu-ke-satu).
