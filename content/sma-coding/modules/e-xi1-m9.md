## Untuk siapa modul ini

Modul ini untuk murid kelas XI jalur E (komputasi kuantum), minggu `E-XI1-M9` silabus v1.4: sirkuit satu qubit dan interferensi. Prasyarat: modul `e-xi1-m8` (gerbang X, Z, H). Alat: kertas, kalkulator, dan Quirk (peramban, tanpa akun). Contoh C++ opsional untuk murid yang sudah punya dasar pemrograman (setara jalur A atau B); minggu ini penelusuran dikerjakan dengan tangan lebih dulu.

Modul ini berstatus DRAF: karangan penyusun, belum ditinjau pemilik. Jalur E adalah pengayaan di luar rumusan capaian pembelajaran (CP); minggu ini tidak punya irisan pengayaan, jadi modul ini tidak dihitung memenuhi butir CP mana pun.

Aturan AI jalur ini: AI generatif boleh dipakai dengan etika dan dicatat, tanpa data pribadi, kata sandi, atau tugas bernilai pada permintaanmu, dan tanpa akun wajib. Saran: jawab dulu sendiri, baru minta penjelasan atau petunjuk bertahap. Setiap soal `Latihan` bertanda `AI: boleh` atau `AI: tanpa AI`.

Catatan untuk guru: Quirk (versi 2.3, per 2026-11-19) dibuka penyusun lewat peramban tanpa antarmuka. Menaruh gerbang H setelah pengukuran memunculkan tanda kuning "no remix (sorry)" pada tautan yang dibuka penyusun, sehingga efek pengukuran di tengah sirkuit dihitung dengan program, bukan di Quirk; penyebab pesan itu tidak dibaca dari dokumentasi `[belum terverifikasi]`. Matriks H dan amplitudo yang bisa negatif dibaca dari halaman IBM Quantum Learning "Quantum information".

## Ingat kembali

Jawab dari ingatan, baru cek di bagian kunci.

1. Pengacak klasik dua kali dan H dua kali dimulai dari 0: mengapa hasilnya berbeda? (dari `e-xi1-m1`)
2. Pada keadaan `(0,6 ; 0,8)`, berapa peluang membaca 0, dan mengapa bukan 0,6? (dari `e-xi1-m6`)
3. Berapa hasil X lalu H pada `|0>`, dan apakah peluangnya sama dengan H pada `|0>`? (dari `e-xi1-m8`)

## Tujuan

Setelah modul ini kamu dapat:

- membaca sirkuit satu qubit dari kiri ke kanan dan menuliskan keadaan setelah tiap gerbang;
- menuliskan sirkuit sebagai satu matriks dengan urutan perkalian yang benar;
- menjelaskan interferensi konstruktif dan destruktif dengan angka amplitudo;
- merancang sirkuit satu qubit dengan hasil bacaan yang ditentukan.

## Prediksi dulu

Qubit mulai dari `|0>`. Sebelum membaca contoh, tebak dan tulis peluang membaca 1 untuk tiga sirkuit: (1) H saja; (2) H lalu H; (3) H, Z, lalu H. Beri satu kalimat alasan untuk nomor 3.

## Contoh terselesaikan

**Membaca sirkuit.** Sirkuit adalah daftar gerbang yang dibaca dari kiri ke kanan: gerbang paling kiri dipakai lebih dulu. Cara menelusurinya: tulis keadaan awal, terapkan gerbang pertama, tulis hasilnya, dan seterusnya. Keadaan di tiap langkah itulah sirkuit beranotasi.

**H, Z, H pada `|0>`.** Rumus H pada `(a0, a1)` adalah `((a0 + a1)h ; (a0 - a1)h)` dengan `h` = 0,7071. Langkah 1, H: `(0,7071 ; 0,7071)`. Langkah 2, Z membalik tanda amplitudo kedua: `(0,7071 ; -0,7071)`. Langkah 3, H: `a0 = (0,7071 - 0,7071)h = 0` dan `a1 = (0,7071 + 0,7071)h = 1`. Hasil akhir `(0, 1)` atau `|1>`: peluang membaca 1 adalah 1.

**Interferensi.** Pada langkah 3, komponen `a0` menjumlahkan dua amplitudo yang berlawanan tanda sehingga saling menghapus: interferensi **destruktif**. Komponen `a1` menjumlahkan dua amplitudo yang searah sehingga menguat: interferensi **konstruktif**. Pada H lalu H (tanpa Z), keadaannya terbalik: `a0` menguat dan `a1` terhapus, sehingga kembali ke `|0>`. Peluang klasik tidak pernah negatif, jadi tidak bisa saling menghapus (`e-xi1-m1`).

**Satu matriks.** Urutan gerbang H, Z, H sama dengan hasil kali `H Z H` (gerbang yang dipakai lebih dulu ditulis paling kanan, `e-xi1-m8`). Hasilnya `[[0, 1], [1, 0]]`, yaitu matriks X. Jadi tiga gerbang itu bekerja sebagai satu gerbang X.

**Membaca di tengah memutus interferensi.** Bila qubit dibaca setelah H pertama, lalu H dipakai lagi, hasilnya lain. Setelah dibaca, keadaan menjadi `|0>` atau `|1>` (`e-xi1-m7`), masing-masing dengan peluang 0,5. Dari `|0>`, H memberi `(h, h)` dan P(0) = 0,5. Dari `|1>`, H memberi `(h, -h)` dan P(0) = 0,5. Jadi P(0) akhir = 0,5 x 0,5 + 0,5 x 0,5 = 0,5, bukan 1. Tanpa pembacaan, dua jalur amplitudo bertemu dan saling menghapus; dengan pembacaan, jalurnya sudah dipilih satu dan tidak ada yang bisa dihapus.

Program berikut menelusuri lima sirkuit, menghitung `H Z H` sebagai satu matriks, dan menghitung peluang H, baca, H.

```cpp
#include <cmath>
#include <iomanip>
#include <iostream>
#include <string>

struct Matriks {
    double a, b;
    double c, d;
};

struct Keadaan {
    double a0, a1;
};

const double h = 1.0 / std::sqrt(2.0);

Matriks gerbang(char nama) {
    switch (nama) {
        case 'X': return {0, 1, 1, 0};
        case 'Z': return {1, 0, 0, -1};
        default: return {h, h, h, -h};  // 'H'
    }
}

Keadaan terapkan(Matriks g, Keadaan k) {
    return {g.a * k.a0 + g.b * k.a1, g.c * k.a0 + g.d * k.a1};
}

Matriks kali(Matriks p, Matriks q) {
    return {p.a * q.a + p.b * q.c, p.a * q.b + p.b * q.d,
            p.c * q.a + p.d * q.c, p.c * q.b + p.d * q.d};
}

// Sirkuit ditulis kiri ke kanan: gerbang pertama diterapkan lebih dulu.
void telusuri(const std::string& sirkuit) {
    Keadaan k = {1, 0};
    std::cout << "sirkuit " << sirkuit << ": (" << k.a0 << ", " << k.a1 << ")";
    for (char g : sirkuit) {
        k = terapkan(gerbang(g), k);
        std::cout << " -" << g << "-> (" << k.a0 << ", " << k.a1 << ")";
    }
    std::cout << "  P(1) = " << k.a1 * k.a1 << "\n";
}

int main() {
    std::cout << std::fixed << std::setprecision(4);
    telusuri("H");
    telusuri("HH");
    telusuri("HZH");
    telusuri("HXH");
    telusuri("HZZH");

    // Satu matriks untuk sirkuit HZH: gerbang yang diterapkan terakhir ada di kiri.
    Matriks hzh = kali(gerbang('H'), kali(gerbang('Z'), gerbang('H')));
    std::cout << "H Z H sebagai satu matriks = [[" << hzh.a << ", " << hzh.b << "], ["
              << hzh.c << ", " << hzh.d << "]]\n";

    // H, baca, H: hitung peluang akhir dari pohon peluang.
    double peluangNol = 0;
    for (int hasil = 0; hasil <= 1; hasil++) {
        Keadaan awal = terapkan(gerbang('H'), {1, 0});
        double pHasil = (hasil == 0) ? awal.a0 * awal.a0 : awal.a1 * awal.a1;
        Keadaan sesudah = (hasil == 0) ? Keadaan{1, 0} : Keadaan{0, 1};
        Keadaan akhir = terapkan(gerbang('H'), sesudah);
        peluangNol += pHasil * akhir.a0 * akhir.a0;
    }
    std::cout << "H, baca, H: P(0) akhir = " << peluangNol << "\n";
    return 0;
}
```

Keluaran asli (dijalankan penyusun dengan `g++ -std=c++17 -Wall -Wextra`):

```text
sirkuit H: (1.0000, 0.0000) -H-> (0.7071, 0.7071)  P(1) = 0.5000
sirkuit HH: (1.0000, 0.0000) -H-> (0.7071, 0.7071) -H-> (1.0000, 0.0000)  P(1) = 0.0000
sirkuit HZH: (1.0000, 0.0000) -H-> (0.7071, 0.7071) -Z-> (0.7071, -0.7071) -H-> (0.0000, 1.0000)  P(1) = 1.0000
sirkuit HXH: (1.0000, 0.0000) -H-> (0.7071, 0.7071) -X-> (0.7071, 0.7071) -H-> (1.0000, 0.0000)  P(1) = 0.0000
sirkuit HZZH: (1.0000, 0.0000) -H-> (0.7071, 0.7071) -Z-> (0.7071, -0.7071) -Z-> (0.7071, 0.7071) -H-> (1.0000, 0.0000)  P(1) = 0.0000
H Z H sebagai satu matriks = [[0.0000, 1.0000], [1.0000, 0.0000]]
H, baca, H: P(0) akhir = 0.5000
```

**Quirk.** Buka [tautan H, Z, H](https://algassert.com/quirk#circuit=%7B%22cols%22:%5B%5B%22H%22%5D,%5B%22Z%22%5D,%5B%22H%22%5D%5D%7D): penyusun melihat `Chance` "On" (100%) pada kabel pertama, sesuai hitungan tangan. Pada [tautan H, H](https://algassert.com/quirk#circuit=%7B%22cols%22:%5B%5B%22H%22%5D,%5B%22H%22%5D%5D%7D) tampil "Off". Pada [tautan H, X, H](https://algassert.com/quirk#circuit=%7B%22cols%22:%5B%5B%22H%22%5D,%5B%22X%22%5D,%5B%22H%22%5D%5D%7D) tampil "Off", dan pada [tautan H, Z, Z, H](https://algassert.com/quirk#circuit=%7B%22cols%22:%5B%5B%22H%22%5D,%5B%22Z%22%5D,%5B%22Z%22%5D,%5B%22H%22%5D%5D%7D) juga "Off". Yang tampil adalah peluang hitungan, bukan sampel acak. **Prediksi dulu**, baru buka tautannya.

## Contoh setengah jadi

Lengkapi (kunci di bagian akhir).

1. Sirkuit H, X, H pada `|0>`: setelah H `(h, h)`; setelah X `(____ ; ____)`; setelah H `(____ ; ____)`. Peluang membaca 1: ____.
2. Sirkuit X, H, H pada `|0>`: setelah X `(____ ; ____)`; setelah H `(h ; ____)`; setelah H kedua `(____ ; ____)`.
3. Lengkapi pembentukan satu matriks dari dua gerbang, gerbang `g1` dipakai lebih dulu:

```cpp setengah-jadi
Matriks sirkuit2 = kali(____, ____);  // g2 dipakai sesudah g1
```

## Soal Parsons

Susun baris-baris di bawah (sudah diacak) menjadi fungsi `telusuri` yang menerapkan tiap gerbang sirkuit pada keadaan awal `(1, 0)`. Penjorokan sengaja dihilangkan.

```text
(a) void telusuri(const std::string& sirkuit) {
(b) Keadaan k = {1, 0};
(c) for (char g : sirkuit) {
(d) k = terapkan(gerbang(g), k);
(e) }
(f) }
```

## Latihan

1. **Dengan tangan.** (`AI: tanpa AI`) Telusuri H, X, H pada `|1>`. Tulis keadaan setelah tiap gerbang dan peluang membaca 1.
2. **Rancang.** (`AI: tanpa AI`) Rancang sirkuit dari `|0>` yang membuat peluang membaca 1 sebesar 1, tanpa gerbang X. Buktikan dengan penelusuran.
3. **Tanda tersembunyi.** (`AI: boleh`) Rancang dua sirkuit dari `|0>` yang sama-sama memberi peluang 0,5 dan 0,5, tetapi vektor akhirnya berbeda: `(h, h)` dan `(h, -h)`.
4. **Prediksi lalu uji.** (`AI: boleh`) Tebak peluang membaca 1 untuk H, Z, H, Z, H, lalu telusuri dan cocokkan di Quirk.
5. **Catatan pemakaian AI (opsional).** Bila memakai asisten AI, catat alat, tujuan, garis besar perintah, bagian yang dipakai, dan cara memeriksa jawabannya.

## Latihan bercampur

1. Keadaan `(0,8 ; -0,6)` diberi H. Hitung vektor hasil dan peluang membaca 0. (`e-xi1-m8`, `e-xi1-m6`)
2. Sirkuit H, Z, H dibaca 1000 shot pada simulator. Berapa hasil 1 yang diharapkan, dan bila simulatormu melaporkan 998, apa yang kamu curigai? (`e-xi1-m7`)
3. Hitung `Z X` dan `X Z`. Apakah gerbang X dan Z saling bertukar tempat tanpa mengubah hasil? (`e-xi1-m3`)

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `e-xi1-m10` (satu minggu lagi), `e-xi1-m12` (sekitar tiga minggu lagi), dan `e-xi2-m3` (sekitar delapan minggu lagi). Jawab sekarang lalu simpan.

1. Tulis sirkuit H, Z, H sebagai satu matriks: gerbang mana yang ditulis paling kanan, dan apa hasilnya?
2. Apa beda interferensi konstruktif dan destruktif? Beri satu contoh angka.
3. Mengapa H, baca, H memberi peluang 0 sebesar 0,5 sedangkan H, H memberi 1?

## Kesalahan umum

- **"Z tidak berguna karena tidak mengubah peluang."** Z bekerja lewat tanda; gerbang H sesudahnya mengubah tanda itu menjadi perbedaan peluang.
- **"Dua H selalu kembali ke awal, jadi H adalah NOT."** H dua kali memang kembali ke `(1, 0)`, tetapi H sekali menghasilkan superposisi, bukan menukar `|0>` dan `|1>`.
- **"Membaca di tengah sirkuit tidak mengubah apa-apa."** Setelah dibaca keadaan menjadi `|0>` atau `|1>`, sehingga interferensi tidak terjadi lagi.

## Cek mandiri

- [ ] Saya dapat menelusuri sirkuit satu qubit dan menulis keadaan tiap langkah.
- [ ] Saya dapat menuliskan sirkuit sebagai satu matriks dengan urutan yang benar.
- [ ] Saya dapat menjelaskan interferensi konstruktif dan destruktif dengan angka.
- [ ] Saya dapat merancang sirkuit satu qubit dengan hasil yang ditentukan.
- [ ] Saya mencatat pemakaian AI bila saya memakainya.

## Kunci dan petunjuk

**Ingat kembali.** 1: pengacak klasik mencampur peluang yang tidak negatif sehingga tetap 0,5 dan 0,5; H memakai amplitudo yang bisa negatif sehingga dua suku di `a1` saling menghapus dan kembali ke `(1, 0)`. 2: P(0) = 0,6 x 0,6 = 0,36; 0,6 adalah amplitudo, peluang adalah kuadratnya. 3: `(0,7071 ; -0,7071)`; peluang sama (0,5 dan 0,5), tetapi vektornya berbeda.

**Prediksi dulu.** (1) 0,5; (2) 0; (3) 1: dua suku di `a0` berlawanan tanda dan saling menghapus, dua suku di `a1` searah dan menguat. Banyak murid menebak 0,5 untuk nomor 3 karena Z "tidak mengubah peluang".

**Contoh setengah jadi.** 1: setelah X `(0,7071 ; 0,7071)`; setelah H `(1 ; 0)`; peluang membaca 1 adalah 0. 2: setelah X `(0, 1)`; setelah H `(h ; -h)`; setelah H kedua `(0 ; 1)` (hitung: `a0 = (h - h)h = 0`, `a1 = (h + h)h = 1`). 3: `kali(g2, g1)`.

**Soal Parsons.** a, b, c, d, e, f.

**Latihan.** 1: H `(0, 1) = (h, -h)`; X `(h, -h) = (-h, h)`; H `(-h, h) = ((-h + h)h ; (-h - h)h) = (0 ; -1)`; peluang membaca 1 adalah 1 (vektor `(0, -1)`, tandanya tidak terlihat). 2: H, Z, H: penelusuran ada di contoh terselesaikan. 3: contoh: H saja memberi `(h, h)`; X lalu H memberi `(h, -h)` (atau H lalu Z). 4: H, Z, H memberi `(0, 1)`; Z memberi `(0, -1)`; H memberi `(-h, h)`; peluang membaca 1 adalah 0,5. 5: opsional.

**Latihan bercampur.** 1: `((0,8 - 0,6)h ; (0,8 + 0,6)h) = (0,1414 ; 0,9899)`; P(0) = 0,02. 2: 1000 hasil 1. Peluangnya persis 1, jadi simpangan wajarnya 0 dan 998 tidak mungkin pada simulator yang benar; curigai galat di kode (misalnya gerbang atau urutan penerapannya salah). 3: `Z X = [[0, 1], [-1, 0]]` dan `X Z = [[0, -1], [1, 0]]`; tidak sama, tidak bertukar tempat.

**Ulang berjarak.** 1: paling kanan adalah gerbang yang dipakai lebih dulu; hasil `H Z H = [[0, 1], [1, 0]]`, yaitu X. 2: konstruktif: amplitudo searah dijumlahkan sehingga membesar (`h + h` dikali `h` = 1); destruktif: amplitudo berlawanan tanda dijumlahkan sehingga hilang (`h - h` = 0). 3: setelah dibaca keadaannya `|0>` atau `|1>` dan H memberi 0,5 dari keduanya; tanpa baca, dua jalur amplitudo saling menghapus.

## Langkah berikutnya

Modul berikut: `e-xi1-m10` (simulator sendiri I): kamu menyimpan vektor keadaan dalam program dan menerapkan matriks gerbang dengan kode. Bacaan pendamping: `e-xi1-m8` (gerbang X, Z, H).
