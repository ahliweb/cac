## Untuk siapa modul ini

Modul ini untuk murid kelas XI jalur E (komputasi kuantum), minggu `E-XI2-M2` silabus v1.4: entanglement (keterjeratan) dan keadaan Bell. Prasyarat: modul `e-xi2-m1` (CNOT). Alat: kertas, kalkulator, dan Quirk (peramban, tanpa akun). Contoh C++17 bersifat opsional (pustaka standar saja dan tanpa akun; murid jalur B boleh menerjemahkannya ke TypeScript); hitungan dikerjakan dengan tangan lebih dulu.

Modul ini karangan penyusun dan disetujui pemilik program pada 2026-11-20 (keputusan lewat dialog; catatan tinjauan menjadi tindak lanjut revisi). Jalur E adalah pengayaan di luar rumusan capaian pembelajaran (CP); minggu ini tidak punya irisan pengayaan, jadi modul ini tidak dihitung memenuhi butir CP mana pun.

Aturan AI jalur ini: AI generatif boleh dipakai dengan etika dan dicatat, tanpa data pribadi, kata sandi, atau tugas bernilai pada permintaanmu, dan tanpa akun wajib. Saran: jawab dulu sendiri, baru minta penjelasan atau petunjuk bertahap. Setiap soal `Latihan` bertanda `AI: boleh` atau `AI: tanpa AI`.

Catatan untuk guru: empat keadaan Bell, fakta bahwa tak satu pun berupa produk, dan rangkaian H lalu CNOT yang membuatnya dibaca penyusun dari halaman IBM Quantum Learning "Quantum information" (multiple systems) dan "Quantum circuits", per 2026-11-19; halaman itu menulis keadaan Bell dengan huruf Yunani, modul ini dengan `Phi` dan `Psi`. Uji `a*d = b*c` untuk amplitudo real adalah pengembangan dari `e-xi1-m12`, bukan kutipan. Di Quirk, kabel bawah adalah qubit pertama; arah garis pada lingkaran amplitudo menunjukkan tanda (kanan positif, kiri negatif untuk amplitudo real). Angka dihitung ulang dengan program C++ di modul ini.

## Ingat kembali

Jawab dari ingatan, baru cek di bagian kunci.

1. Apa hasil CNOT pada keempat keadaan dasar `|00>`, `|01>`, `|10>`, `|11>`? (dari `e-xi2-m1`)
2. Tulis matriks H lalu hitung H kali (1, 0). (dari `e-xi1-m8`)
3. Bila hasil simulasi menyimpang dari prediksi, apa dua penyebab yang kamu periksa lebih dulu? (dari `e-xi1-m13`)

## Tujuan

Setelah modul ini kamu dapat:

- membangun keadaan Bell `(h, 0, 0, h)` dari `|00>` dengan H pada qubit pertama lalu CNOT;
- menjelaskan bahwa sebuah keadaan dua qubit yang tidak dapat difaktorkan disebut terjerat;
- memeriksa apakah sebuah vektor dua qubit dapat difaktorkan dengan uji `a*d = b*c`;
- menulis keempat keadaan Bell dan menyebut dari keadaan dasar mana masing-masing dibangun.

## Prediksi dulu

Mulai dari `|00>`. Pasang H pada qubit pertama, lalu CNOT dengan qubit pertama sebagai kontrol. Sebelum membaca contoh, tebak dan tulis: (1) keadaan akhirnya sebagai vektor empat komponen; (2) hasil apa saja yang mungkin bila kedua qubit dibaca, dan peluangnya; (3) apakah keadaan itu dapat ditulis sebagai produk dua qubit.

## Contoh terselesaikan

**Membangun keadaan Bell.** Langkah 1: H pada qubit pertama mengubah `|00>` menjadi `(h, 0, h, 0)`, yaitu `(h, h)` kali `|0>` (`e-xi1-m12`). Langkah 2: CNOT menukar komponen ketiga dan keempat, hasilnya `(h, 0, 0, h)`. Keadaan ini disebut `|Phi+>`. Bila dibaca, hasilnya `00` atau `11` masing-masing dengan peluang 0,5; hasil `01` dan `10` tidak pernah muncul.

**Terjerat.** Apakah `(h, 0, 0, h)` produk `(a, b)` kali `(c, d)` = `(ac, ad, bc, bd)`? Anggap ya. Maka `ac = h` dan `bd = h`, sehingga a, b, c, d semuanya tidak nol; tetapi `ad = 0` memerlukan salah satu dari keduanya nol. Bertentangan, jadi bukan produk. Cara cepat: untuk produk, `a*d` selalu sama dengan `b*c`; di sini `h*h = 0,5` sedangkan `0*0 = 0`. Keadaan dua qubit yang tidak dapat difaktorkan seperti ini disebut **terjerat** (*entangled*). Pada keadaan terjerat, kita tidak dapat lagi menyatakan "keadaan qubit pertama" dan "keadaan qubit kedua" secara terpisah; hanya keadaan pasangannya yang punya vektor.

**Empat keadaan Bell.** Memulai dari keempat keadaan dasar, lalu H pada qubit pertama dan CNOT:

- `|00>` menjadi `|Phi+> = (h, 0, 0, h)`;
- `|01>` menjadi `|Psi+> = (0, h, h, 0)`;
- `|10>` menjadi `|Phi-> = (h, 0, 0, -h)`;
- `|11>` menjadi `|Psi-> = (0, h, -h, 0)`.

Keempatnya terjerat dan saling tegak lurus: bila komponen yang sesuai dikalikan lalu dijumlahkan (hasil kali dalam), tiap pasangan berbeda memberi 0. `Phi+` dan `Phi-` memberi peluang sama (0,5 untuk `00` dan `11`) tetapi berbeda tanda pada komponen `11`: beda fase relatif, yang baru terlihat bila ada gerbang lanjutan (`E-XI2-M5`).

```cpp
#include <cmath>
#include <cstdio>
#include <string>
#include <vector>

using Vektor = std::vector<double>;
using Matriks = std::vector<Vektor>;

const double h = 1.0 / std::sqrt(2.0);

Vektor kali(const Matriks& matriks, const Vektor& vektor) {
    Vektor hasil;
    for (const Vektor& baris : matriks) {
        double jumlah = 0.0;
        for (size_t j = 0; j < vektor.size(); j++) jumlah += baris[j] * vektor[j];
        hasil.push_back(jumlah);
    }
    return hasil;
}

std::string tulis(const Vektor& v) {
    std::string s = "(";
    for (size_t i = 0; i < v.size(); i++) {
        char buf[32];
        std::snprintf(buf, sizeof buf, "%.4f", v[i] + 0.0);
        if (i > 0) s += ", ";
        s += buf;
    }
    return s + ")";
}

// Untuk amplitudo real (a, b, c, d): produk dua qubit bila a*d = b*c.
bool bisa_difaktorkan(const Vektor& v) { return std::fabs(v[0] * v[3] - v[1] * v[2]) < 1e-9; }

int main() {
    const Matriks CNOT = {{1, 0, 0, 0}, {0, 1, 0, 0}, {0, 0, 0, 1}, {0, 0, 1, 0}};
    // H pada qubit pertama, qubit kedua dibiarkan (matriks H tensor I).
    const Matriks H_PERTAMA = {
        {h, 0, h, 0},
        {0, h, 0, h},
        {h, 0, -h, 0},
        {0, h, 0, -h},
    };
    const char* nama[4] = {"00", "01", "10", "11"};

    Vektor bell[4];
    for (int i = 0; i < 4; i++) {
        Vektor dasar(4, 0.0);
        dasar[i] = 1.0;
        bell[i] = kali(CNOT, kali(H_PERTAMA, dasar));
        std::printf("|%s>  -> %s  dapat difaktorkan: %s\n", nama[i], tulis(bell[i]).c_str(),
                    bisa_difaktorkan(bell[i]) ? "ya" : "tidak");
    }

    // Perbandingan: H pada kedua qubit dari |00> memberi (h, h) kali (h, h), sebuah produk.
    Vektor produk = {0.5, 0.5, 0.5, 0.5};
    std::printf("produk %s  dapat difaktorkan: %s\n", tulis(produk).c_str(),
                bisa_difaktorkan(produk) ? "ya" : "tidak");

    // Empat keadaan Bell saling tegak lurus: hasil kali dalam 0 antar pasangan berbeda.
    double terbesar = 0.0;
    for (int i = 0; i < 4; i++)
        for (int j = i + 1; j < 4; j++) {
            double dalam = 0.0;
            for (int k = 0; k < 4; k++) dalam += bell[i][k] * bell[j][k];
            if (std::fabs(dalam) > terbesar) terbesar = std::fabs(dalam);
        }
    std::printf("hasil kali dalam terbesar antar pasangan berbeda: %.4f\n", terbesar);
    return 0;
}
```

Keluaran asli (`g++ -std=c++17 -Wall -Wextra`):

```text
|00>  -> (0.7071, 0.0000, 0.0000, 0.7071)  dapat difaktorkan: tidak
|01>  -> (0.0000, 0.7071, 0.7071, 0.0000)  dapat difaktorkan: tidak
|10>  -> (0.7071, 0.0000, 0.0000, -0.7071)  dapat difaktorkan: tidak
|11>  -> (0.0000, 0.7071, -0.7071, 0.0000)  dapat difaktorkan: tidak
produk (0.5000, 0.5000, 0.5000, 0.5000)  dapat difaktorkan: ya
hasil kali dalam terbesar antar pasangan berbeda: 0.0000
```

Program ini hanya memeriksa uji `a*d = b*c` untuk amplitudo real pada beberapa vektor; ia tidak membuktikan bahwa uji itu benar untuk semua masukan (pembuktiannya ada di atas, untuk produk umum).

**Quirk.** Buka [H pada kabel bawah lalu CNOT](https://algassert.com/quirk#circuit=%7B%22cols%22:%5B%5B1,%22H%22%5D,%5B%22X%22,%22%E2%80%A2%22%5D%5D%7D). Penyusun melihat dua lingkaran sama besar, pada sel kiri-atas (`00`) dan kanan-bawah (`11`), dengan garis menunjuk ke kanan, dan tampilan peluang tiap kabel 50,0 persen. Tampilan per kabel hanya 50 persen: kabel itu sendiri tidak memberi tahu bahwa keduanya selalu sama. Pada [versi dengan masukan `|10>`](https://algassert.com/quirk#circuit=%7B%22cols%22:%5B%5B1,%22H%22%5D,%5B%22X%22,%22%E2%80%A2%22%5D%5D,%22init%22:%5B0,1%5D%7D) penyusun melihat bahwa garis pada lingkaran `11` menunjuk ke kiri, sesuai `Phi-`. **Prediksi dulu**, baru buka tautannya.

## Contoh setengah jadi

Lengkapi (kunci di bagian akhir).

1. `(0,5 ; 0,5 ; 0,5 ; 0,5)` dapat difaktorkan bila `a*d = ____` dan `b*c = ____` sama; di sini keduanya ____.
2. Untuk `|Psi+> = (0 ; h ; h ; 0)`: `a*d = ____`, `b*c = ____`, jadi terjerat atau produk? ____
3. Lengkapi uji faktorisasi:

```cpp setengah-jadi
bool bisa_difaktorkan(const Vektor& v) {
    return std::fabs(v[____] * v[____] - v[____] * v[____]) < 1e-9;
}
```

## Soal Parsons

Susun baris-baris di bawah (sudah diacak) menjadi pembangunan keadaan Bell dari `|00>`. Penjorokan sengaja dihilangkan.

```text
(a) Vektor awal = {1, 0, 0, 0};
(b) Vektor sesudah_h = kali(H_PERTAMA, awal);
(c) Vektor bell = kali(CNOT, sesudah_h);
(d) std::printf("%s\n", tulis(bell).c_str());
```

## Latihan

1. **Dengan tangan.** (`AI: tanpa AI`) Tiga vektor: A = `(0,6 ; 0,8 ; 0 ; 0)`, B = `(0 ; 0,6 ; 0,8 ; 0)`, C = `(0,6 ; 0 ; 0 ; 0,8)`. Periksa tiap vektor sah (jumlah kuadrat 1), lalu tentukan apakah produk atau terjerat.
2. **Prediksi lalu uji.** (`AI: boleh`) Mulai dari `|10>`, H pada qubit pertama, lalu CNOT. Tebak keadaan akhir dan peluang tiap hasil, lalu cek di [tautan](https://algassert.com/quirk#circuit=%7B%22cols%22:%5B%5B1,%22H%22%5D,%5B%22X%22,%22%E2%80%A2%22%5D%5D,%22init%22:%5B0,1%5D%7D).
3. **Bangun.** (`AI: boleh`) Dari keadaan dasar mana H lalu CNOT menghasilkan `|Psi->`? Jelaskan dengan penelusuran komponen.
4. **Rancang dulu.** (`AI: boleh`) Tulis pseudocode yang menerima vektor empat komponen dan menjawab "produk" atau "terjerat". Mengapa perbandingan memakai toleransi kecil dan bukan `==`?
5. **Catatan pemakaian AI (opsional).** Bila memakai asisten AI, catat alat, tujuan, garis besar perintah, bagian yang dipakai, dan cara memeriksa jawabannya.

## Latihan bercampur

1. Dari `|Phi+>`, pasang H pada qubit pertama saja. Tulis keadaan hasilnya, peluang tiap hasil, dan periksa apakah masih terjerat. (`e-xi1-m8`, `e-xi1-m12`)
2. `|Phi+>` dibaca 1000 shot. Perkirakan jumlah hasil `00`, simpangan wajarnya, dan jumlah hasil `01`. (`e-xi1-m7`)

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `e-xi2-m3` (satu minggu lagi), `e-xi2-m5` (sekitar tiga minggu lagi), dan `e-xi2-m8` (sekitar enam minggu lagi). Jawab sekarang lalu simpan.

1. Bagaimana membangun keadaan Bell `(h, 0, 0, h)` dari `|00>`, dan apa peluang tiap hasil dua bit?
2. Apa beda `(h, 0, 0, h)` dan `(h, 0, 0, -h)`, dan apakah peluang hasilnya berbeda?
3. Bagaimana memeriksa bahwa vektor dua qubit tidak dapat difaktorkan? Beri contoh angka.

## Kesalahan umum

- **"Terjerat berarti dua qubit saling mengirim pesan."** Terjerat hanya berarti vektor pasangannya tidak dapat difaktorkan; apakah ini dapat dipakai mengirim pesan dibahas di `E-XI2-M3`.
- **"Keadaan Bell sama dengan dua qubit yang masing-masing 50:50."** Dua qubit `(h, h)` yang terpisah memberi keempat hasil dengan peluang 0,25; keadaan Bell hanya memberi `00` dan `11`.
- **"Uji `a*d = b*c` berlaku untuk semua vektor empat komponen."** Ujinya untuk amplitudo real seperti di modul ini; keadaan yang jumlah kuadratnya bukan 1 bukan keadaan sah sejak awal.
- **"Simulator membuat qubit terjerat dengan menghubungkan dua objek."** Simulator hanya menyimpan satu vektor empat komponen; "keterjeratan" adalah sifat vektor itu.

## Cek mandiri

- [ ] Saya dapat membangun `(h, 0, 0, h)` dari `|00>` dengan H dan CNOT.
- [ ] Saya dapat menjelaskan arti terjerat.
- [ ] Saya dapat memeriksa produk atau terjerat dengan `a*d` dan `b*c`.
- [ ] Saya dapat menulis keempat keadaan Bell.
- [ ] Saya mencatat pemakaian AI bila saya memakainya.

## Kunci dan petunjuk

**Ingat kembali.** 1: `|00>` ke `|00>`, `|01>` ke `|01>`, `|10>` ke `|11>`, `|11>` ke `|10>`. 2: `H = h [[1, 1], [1, -1]]`; H kali `(1, 0) = (h, h)`. 3: kemungkinan kesalahan kode (urutan gerbang, peluang yang salah hitung) atau fluktuasi acak biasa dalam simpangan wajar; periksa dengan benih lain dan lebih banyak shot.

**Prediksi dulu.** (1) `(h, 0, 0, h)`; (2) `00` dan `11` masing-masing 0,5; `01` dan `10` tidak pernah; (3) bukan produk. Banyak murid menjawab empat hasil sama kemungkinannya, seperti dua qubit `(h, h)` terpisah.

**Contoh setengah jadi.** 1: `0,5 x 0,5 = 0,25` dan `0,5 x 0,5 = 0,25`; sama, jadi dapat difaktorkan (produk `(h, h)` kali `(h, h)`). 2: `a*d = 0 x 0 = 0`, `b*c = h x h = 0,5`; tidak sama, terjerat. 3: `v[0] * v[3] - v[1] * v[2]`, yaitu indeks `0, 3, 1, 2`.

**Soal Parsons.** a, b, c, d.

**Latihan.** 1: A: `0,36 + 0,64 = 1`; `a*d = 0`, `b*c = 0`; produk `(0,6 ; 0,8)` kali `|0>`. B: sah; `a*d = 0 x 0 = 0`, `b*c = 0,6 x 0,8 = 0,48`; terjerat. C: sah; `a*d = 0,6 x 0,8 = 0,48`, `b*c = 0`; terjerat. 2: dari `|10>`, H pertama memberi `(h, 0, -h, 0)`, CNOT menukar komponen ketiga dan keempat sehingga `(h, 0, 0, -h) = Phi-`; peluang `00` dan `11` masing-masing 0,5; di Quirk lingkaran sama besar, dan yang `11` bergaris ke kiri. 3: dari `|11>`: H pertama memberi `(0, h, 0, -h)`, CNOT menukar komponen ketiga dan keempat: `(0, h, -h, 0) = Psi-`. 4: contoh: `jika abs(a*d - b*c) kurang dari 1e-9, jawab "produk", selain itu "terjerat"`; toleransi dipakai karena angka desimal tersimpan dengan galat pembulatan, sehingga `==` tidak andal (`e-xi1-m10`). 5: opsional.

**Latihan bercampur.** 1: `H` pada qubit pertama dari `(h, 0, 0, h)` memberi `(0,5 ; 0,5 ; 0,5 ; -0,5)`; peluang tiap hasil 0,25; `a*d = 0,5 x (-0,5) = -0,25`, `b*c = 0,5 x 0,5 = 0,25`, tidak sama, jadi masih terjerat. 2: harapan 500; simpangan akar(1000 x 0,5 x 0,5) = akar 250, kira-kira 15,8; hasil `01` selalu 0.

**Ulang berjarak.** 1: H pada qubit pertama dari `|00>` lalu CNOT; `00` dan `11` masing-masing 0,5, `01` dan `10` nol. 2: beda tanda pada komponen `11`; peluang sama (0,5 dan 0,5), beda fase relatif. 3: bandingkan `a*d` dengan `b*c` (komponen berurutan `a, b, c, d`); contoh `(h, 0, 0, h)` memberi `0,5` lawan `0`, jadi terjerat.

## Langkah berikutnya

Modul berikut: `e-xi2-m3` (mengukur qubit terjerat): apa arti hasil `00` dan `11`. Bacaan pendamping: `e-xi1-m12` (hasil kali tensor).
