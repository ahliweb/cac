## Untuk siapa modul ini

Modul ini untuk murid kelas XI jalur E (komputasi kuantum), minggu `E-XI1-M7` silabus v1.4: pengukuran. Prasyarat: modul `e-xi1-m6` (aturan Born). Alat: kertas, kalkulator, dan Quirk (peramban, tanpa akun). Contoh C++ opsional untuk murid yang sudah punya dasar pemrograman (setara jalur A atau B); minggu ini kamu mengamati histogram hasil, dan di `E-XI1-M10` dan `E-XI1-M11` kamu membangun simulator sendiri.

Modul ini karangan penyusun dan disetujui pemilik program pada 2026-11-20 (keputusan lewat dialog; catatan tinjauan menjadi tindak lanjut revisi). Jalur E adalah pengayaan di luar rumusan capaian pembelajaran (CP); minggu ini tidak punya irisan pengayaan, jadi modul ini tidak dihitung memenuhi butir CP mana pun.

Aturan AI jalur ini: AI generatif boleh dipakai dengan etika dan dicatat, tanpa data pribadi, kata sandi, atau tugas bernilai pada permintaanmu, dan tanpa akun wajib. Saran: jawab dulu sendiri, baru minta penjelasan atau petunjuk bertahap. Setiap soal `Latihan` bertanda `AI: boleh` atau `AI: tanpa AI`.

Catatan untuk guru: pernyataan bahwa keadaan menjadi `|0>` atau `|1>` setelah dibaca (keadaan runtuh) adalah postulat standar buku teks yang tidak ditemukan penyusun di halaman IBM Quantum Learning yang dibuka `[belum terverifikasi]`; aturan Born dan vektor satuan dibaca langsung dari halaman itu. Pada tautan Quirk yang tampil adalah peluang hasil hitungan yang sama tiap dimuat ulang, bukan sampel shot.

## Ingat kembali

Jawab dari ingatan, baru cek di bagian kunci.

1. Dari keadaan `(a, b)`, berapa peluang hasil 0 dan hasil 1? (dari `e-xi1-m6`)
2. Mengalikan dengan `i` memutar titik berapa derajat, dan apakah modulusnya berubah? (dari `e-xi1-m4`)
3. Sebutkan satu hal yang dijanjikan komputasi kuantum dan satu hal yang bukan. (dari `e-xi1-m1`)

## Tujuan

Setelah modul ini kamu dapat:

- menjelaskan bahwa satu pembacaan memberi satu hasil acak, dan menyebut keadaan setelah pembacaan;
- menjelaskan apa itu shot dan histogram hasil;
- memperkirakan jumlah hasil dari peluang dan jumlah shot, beserta kisaran wajar simpangannya;
- menjelaskan mengapa satu shot tidak cukup untuk mengetahui keadaan.

## Prediksi dulu

Sebuah qubit disiapkan pada keadaan `(0,6 ; 0,8)` lalu dibaca; seluruh proses diulang 1000 kali (1000 shot). Sebelum membaca contoh, tebak dan tulis: (1) kira-kira berapa kali hasil 0 dan berapa kali hasil 1; (2) apakah hasilnya persis sama dengan perkiraanmu bila diulang lagi 1000 shot; (3) bila keadaan itu dibaca dua kali berturut-turut tanpa disiapkan ulang, apakah hasil kedua pasti sama dengan hasil pertama.

## Contoh terselesaikan

**Satu shot.** Satu pembacaan menghasilkan tepat satu hasil, 0 atau 1, dengan peluang dari aturan Born (`e-xi1-m6`). Untuk `(0,6 ; 0,8)`: P(0) = 0,36 dan P(1) = 0,64. Satu hasil, misalnya 1, tidak memberitahu keadaan awalnya: keadaan `(0,8 ; 0,6)` juga bisa menghasilkan 1.

**Shot dan histogram.** Satu **shot** adalah satu kali seluruh proses: siapkan keadaan, jalankan sirkuit, baca. Mengulang N shot lalu menghitung berapa kali tiap hasil muncul menghasilkan **histogram**. Frekuensi (jumlah dibagi N) mendekati peluang bila N besar, tetapi tidak persis: jumlah hasil 0 pada N shot kira-kira N kali P(0), dengan simpangan wajar akar dari `N * P(0) * P(1)`. Untuk N = 1000: 1000 x 0,36 = 360 dan simpangan akar 230,4, kira-kira 15,2. Jadi 345 sampai 375 itu wajar, dan hasil seperti 361 tidak aneh.

**Keadaan setelah dibaca.** Setelah hasil dibaca, keadaannya menjadi `|0>` bila hasil 0 dan `|1>` bila hasil 1 (disebut keadaan runtuh; `[belum terverifikasi]` dari sumber yang dibuka, lihat catatan guru). Karena itu pembacaan kedua pada keadaan yang sama pasti mengulang hasil pertama. Di perangkat nyata, tiap shot harus menyiapkan keadaan dari awal; di simulator buatan sendiri kita bisa menyimpan vektor sehingga tampak mudah, tetapi itu kemudahan simulator saja (bahwa keadaan tidak bisa digandakan dibahas di `E-XI2-M7`).

Program berikut mensimulasikan pembacaan dengan pembangkit bilangan acak (benih tetap, sehingga keluarannya selalu sama): 10, 100, 1000, dan 10000 shot berturut-turut, lalu lima percobaan membaca dua kali.

```cpp
#include <iomanip>
#include <iostream>
#include <random>

std::mt19937 rng(2026);

double acak01() {
    return rng() / 4294967296.0;  // bilangan acak di [0, 1)
}

// Satu pengukuran: hasil 0 dengan peluang p0, selain itu 1.
int ukur(double p0) {
    return acak01() < p0 ? 0 : 1;
}

int main() {
    const double p0 = 0.36;  // keadaan (0,6 ; 0,8): P(0) = 0,6^2

    std::cout << std::fixed << std::setprecision(3);
    int jumlahShot[] = {10, 100, 1000, 10000};
    for (int n : jumlahShot) {
        int nol = 0;
        for (int i = 0; i < n; i++) {
            if (ukur(p0) == 0) nol++;
        }
        std::cout << n << " shot: hasil 0 muncul " << nol << " kali, frekuensi "
                  << static_cast<double>(nol) / n << "\n";
    }

    // Runtuhnya keadaan: setelah hasil pertama, keadaan menjadi |0> atau |1>,
    // sehingga pengukuran kedua pada keadaan yang sama pasti mengulang hasilnya.
    for (int percobaan = 1; percobaan <= 5; percobaan++) {
        int pertama = ukur(p0);
        double p0Sesudah = (pertama == 0) ? 1.0 : 0.0;
        int kedua = ukur(p0Sesudah);
        std::cout << "percobaan " << percobaan << ": pertama " << pertama
                  << ", kedua " << kedua << "\n";
    }
    return 0;
}
```

Keluaran asli (dijalankan penyusun dengan `g++ -std=c++17 -Wall -Wextra`):

```text
10 shot: hasil 0 muncul 3 kali, frekuensi 0.300
100 shot: hasil 0 muncul 41 kali, frekuensi 0.410
1000 shot: hasil 0 muncul 361 kali, frekuensi 0.361
10000 shot: hasil 0 muncul 3537 kali, frekuensi 0.354
percobaan 1: pertama 1, kedua 1
percobaan 2: pertama 1, kedua 1
percobaan 3: pertama 0, kedua 0
percobaan 4: pertama 1, kedua 1
percobaan 5: pertama 0, kedua 0
```

Bacaan hasilnya: pada 1000 shot, hasil 0 muncul 361 kali, dekat harapan 360. Pada 10 shot frekuensi 0,300 jauh dari 0,36, tetapi simpangan wajarnya kira-kira 1,5 kali; makin banyak shot, frekuensi makin mendekati peluang (10000 shot: 3537 di sekitar 3600, simpangan wajar 48). Pada kelima percobaan terakhir hasil kedua selalu sama dengan hasil pertama.

**Quirk.** Buka [tautan H, pengukuran, lalu `Chance`](https://algassert.com/quirk#circuit=%7B%22cols%22:%5B%5B%22H%22%5D,%5B%22Measure%22%5D,%5B%22Chance%22%5D%5D%7D). Penyusun melihat bahwa setelah gerbang pengukuran jalur qubit berubah menjadi garis ganda (menyimpan hasil klasik), tampilan `Chance` 50.0%, dan keterangan merah "assuming measurement deferred" di bawah tampilan amplitudo akhir. Karena Quirk menampilkan peluang hasil hitungan dan bukan sampel acak, histogram shot kamu peroleh dari program simulator, bukan dari Quirk; di Quirk kamu **memprediksi dulu** nilai peluang lalu membandingkannya dengan `Chance`.

## Contoh setengah jadi

Lengkapi (kunci di bagian akhir).

1. Keadaan `(0,6 ; 0,8)`, 1000 shot: hasil 0 diharapkan 1000 x 0,36 = ____ kali, dan simpangan wajar `akar(1000 * 0,36 * 0,64)` kira-kira ____.
2. Pada program tercatat 361. Selisihnya dari harapan ____ kali, kira-kira ____ simpangan; apakah wajar? ____
3. Lengkapi satu pembacaan dan perulangan shot:

```cpp setengah-jadi
// Satu shot: hasil 0 dengan peluang p0, selain itu 1.
int ukur(double p0) {
    return acak01() ____ p0 ? ____ : ____;
}

int nol = 0;
for (int i = 0; i < ____; i++) {      // n shot
    if (ukur(0.36) == ____) nol++;    // hitung hasil 0
}
```

## Soal Parsons

Susun baris-baris di bawah (sudah diacak) menjadi bagian pembuka program: pembangkit global, fungsi bilangan acak, dan fungsi pembacaan. Penjorokan sengaja dihilangkan.

```text
(a) int ukur(double p0) {
(b) return acak01() < p0 ? 0 : 1;
(c) }
(d) double acak01() {
(e) return rng() / 4294967296.0;
(f) }
(g) std::mt19937 rng(2026);
```

## Latihan

1. **Perkiraan.** (`AI: tanpa AI`) Keadaan `(0,6 ; 0,8)`, 500 shot. Perkirakan jumlah hasil 0 dan hasil 1, dan simpangan wajar hasil 0.
2. **Ubah benih.** (`AI: boleh`) Ubah benih pembangkit pada program, jalankan 1000 shot, dan catat jumlah hasil 0. Apakah masih di kisaran 345 sampai 375? Jelaskan mengapa hasilmu tidak persis 360.
3. **Satu shot.** (`AI: tanpa AI`) Satu shot memberi hasil 0 dari sebuah qubit. Mengapa itu belum cukup untuk memastikan keadaannya `(0,6 ; 0,8)`? Beri satu keadaan lain yang mungkin menghasilkan 0.
4. **Rancang dulu.** (`AI: boleh`) Tulis pseudocode yang menerima peluang `p0` dan jumlah shot `n`, lalu mengembalikan histogram (jumlah hasil 0 dan hasil 1). Baru ubah menjadi kode bila mau.
5. **Catatan pemakaian AI (opsional).** Bila memakai asisten AI, catat alat, tujuan, garis besar perintah, bagian yang dipakai, dan cara memeriksa jawabannya.

## Latihan bercampur

1. Keadaan `(0,96 ; -0,28)` dibaca 1000 shot. Hitung peluang dengan aturan Born lalu perkirakan jumlah hasil 0. (`e-xi1-m6`)
2. Setelah hasil 1 dibaca, keadaannya `|1>`. Tulis sebagai vektor dan periksa bahwa ia keadaan sah. (`e-xi1-m5`)
3. Apakah pembacaan adalah fungsi dari keadaan (satu masukan, satu keluaran)? Jelaskan dengan `(0,6 ; 0,8)`. (`matkom-himpunan-relasi-fungsi`)

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `e-xi1-m8` (satu minggu lagi), `e-xi1-m10` (sekitar tiga minggu lagi), dan `e-xi2-m1` (sekitar delapan minggu lagi). Jawab sekarang lalu simpan.

1. Apa yang terjadi pada keadaan setelah dibaca, dan apa hasil pembacaan kedua pada keadaan yang sama?
2. Mengapa histogram 1000 shot dari keadaan `(0,6 ; 0,8)` tidak persis 360 dan 640?
3. Apa arti shot, dan mengapa satu shot tidak cukup untuk mengetahui keadaan?

## Kesalahan umum

- **"Peluang 0,36 berarti 1000 shot pasti memberi 360."** Itu rata-rata; hasil nyata berkisar di sekitarnya.
- **"Satu hasil cukup untuk mengetahui keadaan."** Banyak keadaan bisa memberi hasil yang sama; keadaan hanya bisa diperkirakan dari banyak shot.
- **"Setelah hasil 1, keadaan tetap `(0,6 ; 0,8)`."** Keadaan menjadi `|1>`; pembacaan kedua pasti 1.
- **"Quirk mengambil sampel acak seperti perangkat nyata."** Pada tautan yang dibuka penyusun, Quirk menampilkan peluang hitungan; histogram shot berasal dari program simulator atau perangkat.

## Cek mandiri

- [ ] Saya dapat menjelaskan bahwa satu pembacaan memberi satu hasil acak.
- [ ] Saya dapat menyebut keadaan setelah dibaca dan hasil pembacaan kedua.
- [ ] Saya dapat menjelaskan shot dan histogram.
- [ ] Saya dapat memperkirakan jumlah hasil dan kisaran wajarnya dari peluang.
- [ ] Saya dapat menjelaskan mengapa satu shot tidak cukup.
- [ ] Saya mencatat pemakaian AI bila saya memakainya.

## Kunci dan petunjuk

**Ingat kembali.** 1: P(0) = `|a|` kuadrat dan P(1) = `|b|` kuadrat. 2: 90 derajat berlawanan arah jarum jam; modulus tidak berubah. 3: dijanjikan algoritma khusus yang lebih hemat langkah untuk masalah tertentu; bukan: semua program lebih cepat atau semua jawaban sekaligus.

**Prediksi dulu.** (1) kira-kira 360 hasil 0 dan 640 hasil 1; (2) tidak persis, kira-kira 345 sampai 375 hasil 0; (3) ya, setelah dibaca keadaannya menjadi `|0>` atau `|1>` sehingga hasil kedua pasti sama. Banyak murid menebak 600 dan 800 (peluang sama dengan amplitudo).

**Contoh setengah jadi.** 1: 360; kira-kira 15,2. 2: selisih 1 kali, kira-kira 0,07 simpangan: wajar. 3: `<`, `0`, `1`; `n`; `0`.

**Soal Parsons.** g, d, e, f, a, b, c. Pembangkit dibuat lebih dulu, lalu fungsi bilangan acak, lalu fungsi `ukur` yang memakainya.

**Latihan.** 1: 500 x 0,36 = 180 hasil 0 dan 320 hasil 1; simpangan akar(500 x 0,36 x 0,64) = akar 115,2, kira-kira 10,7. 2: hasil bergantung benih; wajar bila di 345 sampai 375 (sekitar dua pertiga kasus berada dalam satu simpangan), dan kadang di luarnya karena acak. 3: keadaan `(0,8 ; 0,6)` juga bisa memberi 0 (peluang 0,64); satu hasil tidak membedakan keduanya. 4: contoh: `nol = 0; ulangi n kali: jika bilangan acak di [0,1) kurang dari p0, nol = nol + 1; kembalikan (nol, n - nol)`. 5: opsional.

**Latihan bercampur.** 1: P(0) = 0,96 x 0,96 = 0,9216; perkiraan 922 hasil 0 dari 1000 shot. 2: `|1> = (0, 1)`; modulus kuadrat 0 + 1 = 1, sah. 3: bukan: keadaan yang sama bisa memberi 0 maupun 1 pada shot berbeda, sehingga pembacaan adalah proses acak, bukan fungsi dari keadaan saja.

**Ulang berjarak.** 1: keadaan menjadi `|0>` atau `|1>` sesuai hasil; pembacaan kedua pasti sama dengan yang pertama. 2: setiap shot acak; jumlah hasil hanya berada di sekitar harapan dengan simpangan wajar (kira-kira 15,2). 3: shot adalah satu kali proses siapkan, jalankan, dan baca; satu hasil bisa berasal dari banyak keadaan.

## Langkah berikutnya

Modul berikut: `e-xi1-m8` (gerbang satu qubit): matriks X, Z, dan H yang kamu pakai sejak minggu pertama. Bacaan pendamping: `matkom-himpunan-relasi-fungsi`.
