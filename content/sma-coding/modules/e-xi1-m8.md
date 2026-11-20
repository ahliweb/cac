## Untuk siapa modul ini

Modul ini untuk murid kelas XI jalur E (komputasi kuantum), minggu `E-XI1-M8` silabus v1.4: gerbang satu qubit. Prasyarat: modul `e-xi1-m7` (pengukuran) dan hitungan matriks dari `e-xi1-m3`. Alat: kertas, kalkulator, dan Quirk (peramban, tanpa akun). Contoh C++ opsional untuk murid yang sudah punya dasar pemrograman (setara jalur A atau B); minggu ini seluruh hitungan dikerjakan dengan tangan lebih dulu.

Modul ini karangan penyusun dan disetujui pemilik program pada 2026-11-20 (keputusan lewat dialog; catatan tinjauan menjadi tindak lanjut revisi). Jalur E adalah pengayaan di luar rumusan capaian pembelajaran (CP); minggu ini tidak punya irisan pengayaan, jadi modul ini tidak dihitung memenuhi butir CP mana pun.

Aturan AI jalur ini: AI generatif boleh dipakai dengan etika dan dicatat, tanpa data pribadi, kata sandi, atau tugas bernilai pada permintaanmu, dan tanpa akun wajib. Saran: jawab dulu sendiri, baru minta penjelasan atau petunjuk bertahap. Setiap soal `Latihan` bertanda `AI: boleh` atau `AI: tanpa AI`.

Catatan untuk guru: matriks X, Z, dan H serta pernyataan bahwa operasi pada keadaan kuantum diwakili matriks uniter dibaca penyusun dari halaman IBM Quantum Learning "Quantum information" (single systems), per 2026-11-19. Tampilan Quirk (versi 2.3) dibuka penyusun lewat peramban tanpa antarmuka. Pada tampilan amplitudo akhir, penyusun melihat bahwa lingkaran kedua pada sirkuit X lalu H memiliki garis yang menghadap ke kiri, sedangkan pada sirkuit H saja garisnya menghadap ke kanan; makna garis itu sebagai fase tidak dibaca dari dokumentasi Quirk `[belum terverifikasi]`.

## Ingat kembali

Jawab dari ingatan, baru cek di bagian kunci.

1. Apakah `(0,5 ; 0,5)` keadaan sah? Jika bukan, bagaimana memperbaikinya? (dari `e-xi1-m5`)
2. Apa yang terjadi pada keadaan setelah dibaca, dan apa hasil pembacaan kedua pada keadaan yang sama? (dari `e-xi1-m7`)
3. Hitung matriks `[[0, 1], [1, 0]]` kali vektor `(3, 4)`. (dari `e-xi1-m3`)

## Tujuan

Setelah modul ini kamu dapat:

- menuliskan matriks gerbang X, Z, dan H;
- menerapkan gerbang pada `|0>`, `|1>`, dan keadaan umum dengan perkalian matriks-vektor;
- menerapkan dua gerbang berurutan dan menyebut gerbang mana yang dikalikan lebih dulu;
- menjelaskan mengapa sebuah gerbang tidak boleh mengubah panjang vektor keadaan.

## Prediksi dulu

Qubit mulai dari `|0>` (vektor `(1, 0)`). Sebelum membaca contoh, tebak dan tulis: (1) hasil X pada `|0>`; (2) hasil H pada `|0>`; (3) bila X dipakai lebih dulu lalu H, apakah peluang membaca 0 dan 1 sama dengan bila H dipakai saja? Apakah vektor keadaan akhirnya juga sama?

## Contoh terselesaikan

**Gerbang adalah matriks.** Gerbang satu qubit adalah matriks 2 x 2 yang mengubah vektor keadaan `(a0, a1)` menjadi vektor keadaan baru, lewat perkalian matriks-vektor seperti di `e-xi1-m3`. Dokumentasi IBM Quantum Learning menyebut bahwa operasi pada keadaan kuantum diwakili matriks uniter. Pada tingkat ini cukup satu akibatnya: gerbang mempertahankan panjang vektor, jadi keadaan sah (jumlah kuadrat amplitudo 1) tetap sah. Kita memakai amplitudo real; `h` di bawah adalah 1/akar2, kira-kira 0,7071.

| Gerbang | Matriks | Pada `\|0>` | Pada `\|1>` | Kerja |
| --- | --- | --- | --- | --- |
| X | `[[0, 1], [1, 0]]` | `(0, 1)` | `(1, 0)` | menukar `\|0>` dan `\|1>` (mirip NOT) |
| Z | `[[1, 0], [0, -1]]` | `(1, 0)` | `(0, -1)` | membalik tanda amplitudo `\|1>` |
| H | `h` kali `[[1, 1], [1, -1]]` | `(h, h)` | `(h, -h)` | membuat superposisi sama rata |

**Dua gerbang berurutan.** Sirkuit "X lalu H" memberi `H(X|0>)`. Langkah 1: `X (1, 0) = (0, 1)`. Langkah 2: `H (0, 1) = (h*0 + h*1 ; h*0 - h*1) = (h, -h)`. Gerbang yang dipakai paling awal berada paling dekat vektor, sehingga dalam hasil kali matriks ia dituliskan paling kanan: `H X`. Hasilnya `(0,7071 ; -0,7071)`, dengan peluang 0,5 dan 0,5, **sama** dengan H saja pada peluang tetapi **berbeda** pada vektor (tanda amplitudo kedua). Peluang tidak melihat tanda, tetapi gerbang berikutnya bisa; itu inti modul `e-xi1-m9`.

**Gerbang yang tidak sah.** Matriks `[[1, 1], [1, 1]]` pada `(1, 0)` memberi `(1, 1)`, jumlah kuadratnya 2, jadi bukan keadaan sah; matriks itu bukan gerbang. Alasan sederhana mengapa panjang harus tetap: peluang yang dihitung dari aturan Born (`e-xi1-m6`) harus berjumlah 1.

Program berikut menerapkan tiga gerbang pada tiga keadaan dan menjumlahkan kuadrat hasilnya.

```cpp
#include <cmath>
#include <iomanip>
#include <iostream>
#include <string>

struct Matriks {
    double a, b;  // baris 1
    double c, d;  // baris 2
};

struct Keadaan {
    double a0, a1;  // amplitudo untuk |0> dan |1>
};

// Matriks dikalikan vektor keadaan: tiap komponen hasil adalah hasil kali dalam satu baris dengan vektor.
Keadaan terapkan(Matriks g, Keadaan k) {
    return {g.a * k.a0 + g.b * k.a1, g.c * k.a0 + g.d * k.a1};
}

double jumlahKuadrat(Keadaan k) {
    return k.a0 * k.a0 + k.a1 * k.a1;
}

int main() {
    const double h = 1.0 / std::sqrt(2.0);  // 0,7071
    const Matriks X = {0, 1, 1, 0};
    const Matriks Z = {1, 0, 0, -1};
    const Matriks H = {h, h, h, -h};

    struct Gerbang {
        std::string nama;
        Matriks m;
    };
    const Gerbang daftar[] = {{"X", X}, {"Z", Z}, {"H", H}};
    const Keadaan masukan[] = {{1, 0}, {0, 1}, {0.6, 0.8}};

    std::cout << std::fixed << std::setprecision(4);
    for (const Gerbang& g : daftar) {
        for (const Keadaan& k : masukan) {
            Keadaan hasil = terapkan(g.m, k);
            std::cout << g.nama << " pada (" << k.a0 << ", " << k.a1 << ") = (" << hasil.a0
                      << ", " << hasil.a1 << "), jumlah kuadrat " << jumlahKuadrat(hasil) << "\n";
        }
    }

    // X lalu H pada |0>: X diterapkan lebih dulu.
    Keadaan s = terapkan(H, terapkan(X, {1, 0}));
    std::cout << "X lalu H pada |0> = (" << s.a0 << ", " << s.a1 << "), P(0) = " << s.a0 * s.a0
              << ", P(1) = " << s.a1 * s.a1 << "\n";
    return 0;
}
```

Keluaran asli (dijalankan penyusun dengan `g++ -std=c++17 -Wall -Wextra`):

```text
X pada (1.0000, 0.0000) = (0.0000, 1.0000), jumlah kuadrat 1.0000
X pada (0.0000, 1.0000) = (1.0000, 0.0000), jumlah kuadrat 1.0000
X pada (0.6000, 0.8000) = (0.8000, 0.6000), jumlah kuadrat 1.0000
Z pada (1.0000, 0.0000) = (1.0000, 0.0000), jumlah kuadrat 1.0000
Z pada (0.0000, 1.0000) = (0.0000, -1.0000), jumlah kuadrat 1.0000
Z pada (0.6000, 0.8000) = (0.6000, -0.8000), jumlah kuadrat 1.0000
H pada (1.0000, 0.0000) = (0.7071, 0.7071), jumlah kuadrat 1.0000
H pada (0.0000, 1.0000) = (0.7071, -0.7071), jumlah kuadrat 1.0000
H pada (0.6000, 0.8000) = (0.9899, -0.1414), jumlah kuadrat 1.0000
X lalu H pada |0> = (0.7071, -0.7071), P(0) = 0.5000, P(1) = 0.5000
```

**Quirk.** Buka [tautan H saja](https://algassert.com/quirk#circuit=%7B%22cols%22:%5B%5B%22H%22%5D%5D%7D) dan [tautan X lalu H](https://algassert.com/quirk#circuit=%7B%22cols%22:%5B%5B%22X%22%5D,%5B%22H%22%5D%5D%7D). Penyusun melihat `Chance` 50.0% pada keduanya, sesuai hitungan tangan. Pada tampilan amplitudo akhir, dua lingkaran sama besar pada keduanya; hanya garis di lingkaran kedua yang berbeda arah (lihat catatan guru). Quirk menaruh kabel pertama di baris atas; yang kita pakai di sini hanya satu kabel, jadi kabel kedua boleh diabaikan.

## Contoh setengah jadi

Lengkapi (kunci di bagian akhir).

1. Z pada `(0,6 ; 0,8)` memberi `(____ ; ____)`.
2. H pada `(1, 0)` memberi `(h ; ____)`, dan H pada `(0, 1)` memberi `(h ; ____)`.
3. Lengkapi fungsi yang menerapkan matriks pada keadaan:

```cpp setengah-jadi
Keadaan terapkan(Matriks g, Keadaan k) {
    return {g.a * k.a0 + g.b * ____, g.c * ____ + g.d * ____};
}
```

## Soal Parsons

Susun baris-baris di bawah (sudah diacak) menjadi fungsi `jumlahKuadrat` yang benar. Penjorokan sengaja dihilangkan.

```text
(a) double jumlahKuadrat(Keadaan k) {
(b) return k.a0 * k.a0 + k.a1 * k.a1;
(c) }
```

## Latihan

1. **Dengan tangan.** (`AI: tanpa AI`) Hitung H pada `(0,8 ; 0,6)`, lalu periksa bahwa jumlah kuadrat hasilnya 1.
2. **Urutan.** (`AI: tanpa AI`) Hitung Z lalu X pada `|0>` dan X lalu Z pada `|0>`. Apakah vektornya sama? Apakah peluangnya sama?
3. **Gerbang atau bukan.** (`AI: boleh`) Apakah `[[1, 0], [0, 2]]` dapat menjadi gerbang? Buktikan dengan `(0, 1)`.
4. **Rancang dulu.** (`AI: boleh`) Tulis pseudocode yang menerima nama gerbang (`X`, `Z`, atau `H`) dan keadaan, lalu mengembalikan keadaan baru. Baru ubah menjadi kode bila mau.
5. **Catatan pemakaian AI (opsional).** Bila memakai asisten AI, catat alat, tujuan, garis besar perintah, bagian yang dipakai, dan cara memeriksa jawabannya.

## Latihan bercampur

1. Keadaan `(0,28 ; -0,96)`: periksa bahwa ia sah, lalu hitung peluang membaca 0. (`e-xi1-m5`, `e-xi1-m6`)
2. Hitung matriks X kali Z dan Z kali X. Apakah sama? (`e-xi1-m3`)
3. Keadaan `(0,6 ; 0,8)` dibaca 1000 shot. Berapa hasil 0 yang diharapkan dan berapa simpangan wajarnya? (`e-xi1-m7`)

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `e-xi1-m9` (satu minggu lagi), `e-xi1-m11` (sekitar tiga minggu lagi), dan `e-xi2-m2` (sekitar delapan minggu lagi). Jawab sekarang lalu simpan.

1. Berapa hasil X lalu H pada `|0>`, dan apakah peluangnya sama dengan H pada `|0>`?
2. Mengapa Z tidak mengubah peluang hasil pada `(0,7071 ; 0,7071)`, tetapi tetap mengubah keadaannya?
3. Tulis matriks H lalu hitung H kali `(1, 0)`.

## Kesalahan umum

- **"H adalah lemparan koin."** H adalah perkalian matriks yang pasti dan bisa dibalik; keacakan baru muncul saat membaca.
- **"Z tidak melakukan apa-apa karena peluangnya tidak berubah."** Z mengubah tanda amplitudo; efeknya tampak setelah gerbang berikutnya (`e-xi1-m9`).
- **"X lalu H sama dengan H lalu X."** Urutan penting; hitung keduanya dan bandingkan vektornya.
- **"Gerbang yang dipakai pertama ditulis paling kiri di hasil kali matriks."** Terbalik: gerbang pertama ditulis paling kanan, dekat vektor.

## Cek mandiri

- [ ] Saya dapat menuliskan matriks X, Z, dan H.
- [ ] Saya dapat menerapkan gerbang pada `|0>`, `|1>`, dan keadaan umum.
- [ ] Saya dapat menerapkan dua gerbang berurutan dengan urutan yang benar.
- [ ] Saya dapat menjelaskan mengapa gerbang harus mempertahankan panjang vektor.
- [ ] Saya mencatat pemakaian AI bila saya memakainya.

## Kunci dan petunjuk

**Ingat kembali.** 1: bukan; `0,25 + 0,25 = 0,5`, bukan 1. Bagi tiap komponen dengan akar 0,5 sehingga menjadi `(0,7071 ; 0,7071)`. 2: keadaan menjadi `|0>` atau `|1>` sesuai hasil; pembacaan kedua pasti sama dengan yang pertama. 3: `(0*3 + 1*4 ; 1*3 + 0*4) = (4, 3)`.

**Prediksi dulu.** (1) `(0, 1)`; (2) `(0,7071 ; 0,7071)`; (3) peluang sama (0,5 dan 0,5), tetapi vektor akhirnya berbeda: `(0,7071 ; -0,7071)`. Banyak murid menganggap keduanya sama karena peluangnya sama.

**Contoh setengah jadi.** 1: `(0,6 ; -0,8)`. 2: `0,7071`; `-0,7071`. 3: `k.a1`; `k.a0`; `k.a1`.

**Soal Parsons.** a, b, c.

**Latihan.** 1: `((0,8 + 0,6)h ; (0,8 - 0,6)h) = (0,9899 ; 0,1414)`; jumlah kuadrat `0,98 + 0,02 = 1`. 2: Z lalu X: Z `(1, 0) = (1, 0)`, X `(1, 0) = (0, 1)`, hasil `(0, 1)`. X lalu Z: X `(1, 0) = (0, 1)`, Z `(0, 1) = (0, -1)`, hasil `(0, -1)`. Vektornya berbeda (tanda), peluangnya sama (1 untuk hasil 1). 3: bukan; `(0, 1)` menjadi `(0, 2)` dengan jumlah kuadrat 4. 4: contoh: `jika nama = X: kembalikan (a1, a0); jika Z: kembalikan (a0, -a1); jika H: kembalikan ((a0 + a1)*h, (a0 - a1)*h)`. 5: opsional.

**Latihan bercampur.** 1: `0,0784 + 0,9216 = 1`, sah; P(0) = 0,0784. 2: X kali Z = `[[0, -1], [1, 0]]` dan Z kali X = `[[0, 1], [-1, 0]]`; tidak sama. 3: 360; simpangan akar(1000 x 0,36 x 0,64), kira-kira 15,2.

**Ulang berjarak.** 1: `(0,7071 ; -0,7071)`; peluang sama (0,5 dan 0,5), vektor berbeda. 2: peluang dari kuadrat amplitudo, dan tanda hilang saat dikuadratkan; keadaan berubah dari `(h, h)` menjadi `(h, -h)`. 3: `H = h [[1, 1], [1, -1]]`; H kali `(1, 0) = (h, h)`.

## Langkah berikutnya

Modul berikut: `e-xi1-m9` (sirkuit satu qubit dan interferensi): menyusun gerbang menjadi sirkuit dan melihat tanda amplitudo bekerja. Bacaan pendamping: `e-xi1-m3` (perkalian matriks).
