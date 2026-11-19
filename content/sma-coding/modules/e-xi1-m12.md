## Untuk siapa modul ini

Modul ini untuk murid kelas XI jalur E (komputasi kuantum), minggu `E-XI1-M12` silabus v1.4: dua qubit dan hasil kali tensor. Prasyarat: modul `e-xi1-m11` (simulator sendiri II) dan hitungan matriks dari `e-xi1-m3`. Alat: kertas, kalkulator, dan Quirk (peramban, tanpa akun). Contoh C++ opsional (dasar pemrograman setara jalur A atau B); hitungan dikerjakan dengan tangan lebih dulu.

Modul ini berstatus DRAF: karangan penyusun, belum ditinjau pemilik. Jalur E adalah pengayaan di luar rumusan capaian pembelajaran (CP); minggu ini tidak punya irisan pengayaan, jadi modul ini tidak dihitung memenuhi butir CP mana pun.

Aturan AI jalur ini: AI generatif boleh dipakai dengan etika dan dicatat, tanpa data pribadi, kata sandi, atau tugas bernilai pada permintaanmu, dan tanpa akun wajib. Saran: jawab dulu sendiri, baru minta penjelasan atau petunjuk bertahap. Setiap soal `Latihan` bertanda `AI: boleh` atau `AI: tanpa AI`.

Catatan untuk guru: keadaan dua qubit sebagai vektor empat entri, hasil kali tensor, dan matriks `H` tensor `I` dibaca penyusun dari halaman IBM Quantum Learning "Quantum information" (multiple systems), per 2026-11-19. **Urutan kabel Quirk:** pada tampilan amplitudo akhir yang dibuka penyusun, kabel atas menentukan kolom dan kabel bawah menentukan baris. Dalam penulisan `|ab>` di modul ini (qubit pertama di kiri), qubit pertama adalah kabel **bawah** dan qubit kedua kabel **atas**; ini dibaca dari tampilan, bukan dari dokumentasi Quirk `[belum terverifikasi]`. Istilah "terjerat" hanya disebut sepintas (`E-XI2-M2`).

## Ingat kembali

Jawab dari ingatan, baru cek di bagian kunci.

1. Mengapa modulus kuadrat dari `i/akar2` sama dengan `1/akar2` kuadrat, dan apa artinya bagi peluang? (dari `e-xi1-m4`)
2. Apa beda interferensi konstruktif dan destruktif? Beri satu contoh angka. (dari `e-xi1-m9`)
3. Jika seribu shot dari peluang 0,5 memberi 515 hasil 0, apakah itu wajar? Beri kisarannya. (dari `e-xi1-m11`)

## Tujuan

Setelah modul ini kamu dapat:

- menuliskan `|00>`, `|01>`, `|10>`, `|11>` sebagai vektor empat komponen dengan urutan yang disepakati;
- menghitung hasil kali tensor dua keadaan satu qubit dan memeriksa bahwa hasilnya sah;
- menghitung peluang tiap hasil dua bit dari vektor empat komponen;
- memeriksa bahwa sebuah vektor empat komponen dapat atau tidak dapat difaktorkan menjadi dua qubit.

## Prediksi dulu

Qubit pertama berada pada `(0,6 ; 0,8)` dan qubit kedua pada `(0,8 ; -0,6)`; keduanya tidak saling terkait. Sebelum membaca contoh, tebak dan tulis: (1) berapa komponen vektor untuk keduanya sebagai satu sistem; (2) peluang qubit pertama terbaca 0; (3) apakah peluang `00` sama dengan 0,6 x 0,8 atau dengan kuadratnya.

## Contoh terselesaikan

**Empat hasil.** Dua qubit, bila dibaca, memberi satu dari empat hasil: `00`, `01`, `10`, `11` (digit kiri qubit pertama). Keadaannya adalah vektor empat komponen `(a00, a01, a10, a11)` dengan urutan itu, dan jumlah kuadrat komponennya harus 1 seperti pada satu qubit; peluang tiap hasil adalah kuadrat komponennya (`e-xi1-m6`). Vektor dasar: `|00> = (1, 0, 0, 0)`, `|01> = (0, 1, 0, 0)`, `|10> = (0, 0, 1, 0)`, `|11> = (0, 0, 0, 1)`.

**Hasil kali tensor.** Bila qubit pertama `(a, b)` dan qubit kedua `(c, d)` tidak saling terkait, keadaan bersama adalah `(a*c, a*d, b*c, b*d)`. Untuk `(0,6 ; 0,8)` dan `(0,8 ; -0,6)`: `(0,48 ; -0,36 ; 0,64 ; -0,48)`. Jumlah kuadratnya `0,2304 + 0,1296 + 0,4096 + 0,2304 = 1`, sah. Peluang `00` adalah 0,2304, yaitu `0,6^2 x 0,8^2`: **kuadrat** dari hasil kali, bukan 0,6 x 0,8. Peluang qubit pertama terbaca 0 adalah `0,2304 + 0,1296 = 0,36 = 0,6^2`, tepat peluangnya sendirian: itu arti "tidak saling terkait".

**Satu gerbang pada satu qubit.** H pada qubit pertama dari `|00>` memberi `H|0>` tensor `|0>` = `(h, 0, h, 0)`. Matriks 4 x 4 `H` tensor `I` (identitas pada qubit kedua) pada `(1, 0, 0, 0)` memberi hasil yang sama; program di bawah memeriksanya.

**Tidak semua vektor adalah produk.** Vektor `(h, 0, 0, h)` sah (jumlah kuadrat 1). Untuk produk `(a*c, a*d, b*c, b*d)` selalu berlaku `(a*c)(b*d) = (a*d)(b*c)`, yaitu komponen pertama kali keempat sama dengan kedua kali ketiga. Pada `(h, 0, 0, h)`: `h*h = 0,5`, sedangkan `0*0 = 0`; tidak sama, jadi bukan produk dua qubit. Keadaan semacam itu disebut terjerat; ini bahan `E-XI2-M2`. Uji ini untuk amplitudo real; bila `ad = bc`, baris kedua adalah kelipatan baris pertama dan vektornya produk.

**Tiga qubit.** Aturan yang sama memberi delapan komponen untuk `000` sampai `111`. Komponen berlipat dua tiap qubit (`E-XI2-M4`).

**C++ (opsional).**

```cpp
#include <cmath>
#include <iomanip>
#include <iostream>
#include <string>
#include <vector>

using Vektor = std::vector<double>;
using Matriks = std::vector<Vektor>;

const double H1 = 1.0 / std::sqrt(2.0);
const Matriks H = {{H1, H1}, {H1, -H1}};
const Matriks I = {{1, 0}, {0, 1}};

Vektor terapkan(const Matriks& gerbang, const Vektor& keadaan) {
    Vektor hasil(keadaan.size(), 0.0);
    for (size_t baris = 0; baris < gerbang.size(); baris++) {
        for (size_t kolom = 0; kolom < keadaan.size(); kolom++) {
            hasil[baris] += gerbang[baris][kolom] * keadaan[kolom];
        }
    }
    return hasil;
}

// Hasil kali tensor dua vektor: (a, b) dan (c, d) menjadi (a*c, a*d, b*c, b*d).
Vektor tensor(const Vektor& p, const Vektor& q) {
    Vektor hasil;
    for (double x : p) {
        for (double y : q) hasil.push_back(x * y);
    }
    return hasil;
}

// Hasil kali tensor dua matriks, dengan pola blok yang sama.
Matriks tensor(const Matriks& p, const Matriks& q) {
    Matriks hasil(p.size() * q.size(), Vektor(p[0].size() * q[0].size(), 0.0));
    for (size_t i = 0; i < p.size(); i++)
        for (size_t j = 0; j < p[0].size(); j++)
            for (size_t k = 0; k < q.size(); k++)
                for (size_t l = 0; l < q[0].size(); l++)
                    hasil[i * q.size() + k][j * q[0].size() + l] = p[i][j] * q[k][l];
    return hasil;
}

void tampilkan(const std::string& label, const Vektor& v) {
    std::cout << label << " = (";
    for (size_t i = 0; i < v.size(); i++) std::cout << (i ? ", " : "") << v[i];
    std::cout << ")  P(00,01,10,11) = (";
    for (size_t i = 0; i < v.size(); i++) std::cout << (i ? ", " : "") << v[i] * v[i];
    std::cout << ")\n";
}

// Uji faktorisasi untuk keadaan dua qubit beramplitudo real (a, b, c, d): a*d = b*c.
bool bisaDifaktorkan(const Vektor& v) {
    return std::fabs(v[0] * v[3] - v[1] * v[2]) < 1e-9;
}

int main() {
    std::cout << std::fixed << std::setprecision(4);
    Vektor nol = {1, 0};
    Vektor satu = {0, 1};

    tampilkan("|0>|0>", tensor(nol, nol));
    tampilkan("|0>|1>", tensor(nol, satu));
    tampilkan("|1>|0>", tensor(satu, nol));
    tampilkan("|1>|1>", tensor(satu, satu));

    Vektor plus = terapkan(H, nol);
    tampilkan("H|0> kali |0>", tensor(plus, nol));
    tampilkan("H|0> kali H|0>", tensor(plus, plus));

    Vektor produk = tensor({0.6, 0.8}, {0.8, -0.6});
    tampilkan("(0,6 ; 0,8) kali (0,8 ; -0,6)", produk);

    // H pada qubit pertama saja = matriks H (tensor) I yang berukuran 4 x 4.
    Vektor lewatMatriks = terapkan(tensor(H, I), tensor(nol, nol));
    tampilkan("(H tensor I) pada |00>", lewatMatriks);

    Vektor tak = {H1, 0, 0, H1};
    std::cout << "produk di atas dapat difaktorkan: " << (bisaDifaktorkan(produk) ? "ya" : "tidak") << "\n";
    std::cout << "(0,7071 ; 0 ; 0 ; 0,7071) dapat difaktorkan: "
              << (bisaDifaktorkan(tak) ? "ya" : "tidak") << "\n";
    return 0;
}
```

Keluaran asli (dijalankan penyusun dengan `g++ -std=c++17 -Wall -Wextra`):

```text
|0>|0> = (1.0000, 0.0000, 0.0000, 0.0000)  P(00,01,10,11) = (1.0000, 0.0000, 0.0000, 0.0000)
|0>|1> = (0.0000, 1.0000, 0.0000, 0.0000)  P(00,01,10,11) = (0.0000, 1.0000, 0.0000, 0.0000)
|1>|0> = (0.0000, 0.0000, 1.0000, 0.0000)  P(00,01,10,11) = (0.0000, 0.0000, 1.0000, 0.0000)
|1>|1> = (0.0000, 0.0000, 0.0000, 1.0000)  P(00,01,10,11) = (0.0000, 0.0000, 0.0000, 1.0000)
H|0> kali |0> = (0.7071, 0.0000, 0.7071, 0.0000)  P(00,01,10,11) = (0.5000, 0.0000, 0.5000, 0.0000)
H|0> kali H|0> = (0.5000, 0.5000, 0.5000, 0.5000)  P(00,01,10,11) = (0.2500, 0.2500, 0.2500, 0.2500)
(0,6 ; 0,8) kali (0,8 ; -0,6) = (0.4800, -0.3600, 0.6400, -0.4800)  P(00,01,10,11) = (0.2304, 0.1296, 0.4096, 0.2304)
(H tensor I) pada |00> = (0.7071, 0.0000, 0.7071, 0.0000)  P(00,01,10,11) = (0.5000, 0.0000, 0.5000, 0.0000)
produk di atas dapat difaktorkan: ya
(0,7071 ; 0 ; 0 ; 0,7071) dapat difaktorkan: tidak
```

**Quirk.** Buka [tautan H pada kabel bawah](https://algassert.com/quirk#circuit=%7B%22cols%22:%5B%5B1,%22H%22%5D%5D%7D): penyusun melihat dua lingkaran sama besar pada kolom pertama, yaitu `00` dan `10` dalam penulisan modul ini, sesuai `(h, 0, h, 0)`. Pada [tautan H di kedua kabel](https://algassert.com/quirk#circuit=%7B%22cols%22:%5B%5B%22H%22,%22H%22%5D%5D%7D) penyusun melihat empat lingkaran sama kecil, sesuai `(0,5 ; 0,5 ; 0,5 ; 0,5)`. **Prediksi dulu**, baru buka tautannya.

## Contoh setengah jadi

Lengkapi (kunci di bagian akhir).

1. `|10>` dalam vektor empat komponen adalah `(____ ; ____ ; ____ ; ____)`.
2. `(0,6 ; 0,8)` tensor `(1, 0)` = `(____ ; ____ ; ____ ; ____)`.
3. Lengkapi hasil kali tensor dua vektor:

```cpp setengah-jadi
Vektor tensor(const Vektor& p, const Vektor& q) {
    Vektor hasil;
    for (double x : p) {
        for (double y : q) hasil.push_back(____ * ____);
    }
    return hasil;
}
```

## Soal Parsons

Susun baris-baris di bawah (sudah diacak) menjadi fungsi uji faktorisasi yang benar. Penjorokan sengaja dihilangkan.

```text
(a) bool bisaDifaktorkan(const Vektor& v) {
(b) return std::fabs(v[0] * v[3] - v[1] * v[2]) < 1e-9;
(c) }
```

## Latihan

1. **Dengan tangan.** (`AI: tanpa AI`) Hitung `(0,8 ; 0,6)` tensor `(0,6 ; 0,8)`, periksa jumlah kuadratnya, dan sebutkan peluang `01`.
2. **Uji faktorisasi.** (`AI: tanpa AI`) Keadaan `(0,5 ; 0,5 ; 0,5 ; -0,5)` sah. Apakah ia produk dua qubit? Tunjukkan dengan uji `ad = bc`.
3. **Prediksi lalu uji.** (`AI: boleh`) Di Quirk, pasang X pada kabel atas dan H pada kabel bawah. Tebak lingkaran mana yang muncul, tulis keadaannya dalam penulisan modul ini, lalu cek di [tautan](https://algassert.com/quirk#circuit=%7B%22cols%22:%5B%5B%22X%22,%22H%22%5D%5D%7D).
4. **Rancang dulu.** (`AI: boleh`) Tulis pseudocode yang menerima dua vektor dua komponen dan mengembalikan vektor empat komponen. Baru ubah menjadi kode bila mau.
5. **Catatan pemakaian AI (opsional).** Bila memakai asisten AI, catat alat, tujuan, garis besar perintah, bagian yang dipakai, dan cara memeriksa jawabannya.

## Latihan bercampur

1. Untuk keadaan `(0,48 ; -0,36 ; 0,64 ; -0,48)`, hitung peluang `10` dan peluang qubit kedua terbaca 1. (`e-xi1-m6`)
2. H dipasang pada kedua qubit dari `|00>`. Tulis keadaan hasilnya dan peluang tiap hasil; berapa hasil `11` yang diharapkan dari 1000 shot, beserta simpangan wajarnya? (`e-xi1-m8`, `e-xi1-m7`)

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `e-xi1-m13` (satu minggu lagi), `e-xi2-m1` (sekitar tiga minggu lagi), dan `e-xi2-m6` (sekitar delapan minggu lagi). Jawab sekarang lalu simpan.

1. Tulis `|01>` dan `|10>` sebagai vektor empat komponen, dengan urutan dasar yang dipakai.
2. Bagaimana menghitung keadaan produk dari `(a, b)` dan `(c, d)`? Beri contoh angka.
3. Berapa komponen vektor keadaan tiga qubit, dan sebutkan delapan hasilnya berurutan.

## Kesalahan umum

- **"Peluang `00` adalah 0,6 x 0,8."** Peluang adalah kuadrat amplitudo; 0,6 x 0,8 adalah amplitudo hasil `00` pada contoh, bukan peluangnya.
- **"Di Quirk kabel atas selalu qubit pertama dalam penulisan `|ab>`."** Kabel atas adalah qubit kedua dalam penulisan modul ini; periksa dengan satu gerbang X.

## Cek mandiri

- [ ] Saya dapat menuliskan empat keadaan dasar dua qubit sebagai vektor.
- [ ] Saya dapat menghitung hasil kali tensor dua keadaan satu qubit.
- [ ] Saya dapat menghitung peluang tiap hasil dua bit.
- [ ] Saya dapat memeriksa apakah vektor empat komponen dapat difaktorkan.
- [ ] Saya mencatat pemakaian AI bila saya memakainya.

## Kunci dan petunjuk

**Ingat kembali.** 1: modulus `i/akar2` adalah `1/akar2` (panjang bilangan i satu), jadi kuadratnya 0,5; artinya peluang 0,5, sama dengan amplitudo real `1/akar2`; fase tidak mengubah peluang. 2: konstruktif: amplitudo searah dijumlahkan sehingga membesar (`(h + h)h = 1`); destruktif: amplitudo berlawanan tanda dijumlahkan sehingga hilang (`(h - h)h = 0`). 3: wajar; harapan 500, simpangan akar 250, kira-kira 15,8; kisaran satu simpangan 484 sampai 516, dan 515 berselisih kira-kira 0,95 simpangan.

**Prediksi dulu.** (1) empat komponen; (2) 0,36, yaitu `0,6^2`; (3) kuadratnya: `(0,6 x 0,8)^2 = 0,2304`. Banyak murid menjawab 0,48.

**Contoh setengah jadi.** 1: `(0, 0, 1, 0)`. 2: `(0,6 ; 0 ; 0,8 ; 0)`. 3: `x * y`.

**Soal Parsons.** a, b, c.

**Latihan.** 1: `(0,48 ; 0,64 ; 0,36 ; 0,48)`; jumlah kuadrat `0,2304 + 0,4096 + 0,1296 + 0,2304 = 1`; peluang `01` adalah `0,64^2 = 0,4096`. 2: `ad = 0,5 x (-0,5) = -0,25` dan `bc = 0,5 x 0,5 = 0,25`; tidak sama, jadi bukan produk dua qubit. 3: yang muncul adalah dua lingkaran sama besar pada kolom kedua; dalam penulisan modul ini keadaannya `(0 ; h ; 0 ; h)`, yaitu qubit pertama `(h, h)` dan qubit kedua `|1>`. 4: contoh: `hasil = []; untuk x dalam p: untuk y dalam q: tambahkan x kali y ke hasil`. 5: opsional.

**Latihan bercampur.** 1: peluang `10` adalah `0,64^2 = 0,4096`; peluang qubit kedua terbaca 1 adalah peluang `01` ditambah `11`, yaitu `0,1296 + 0,2304 = 0,36`, sama dengan `0,6^2` karena qubit kedua adalah `(0,8 ; -0,6)`. 2: `(0,5 ; 0,5 ; 0,5 ; 0,5)`; peluang tiap hasil 0,25; harapan 250 hasil `11`, simpangan akar(1000 x 0,25 x 0,75) = akar 187,5, kira-kira 13,7.

**Ulang berjarak.** 1: `|01> = (0, 1, 0, 0)` dan `|10> = (0, 0, 1, 0)`, dengan urutan `00, 01, 10, 11`. 2: `(a*c, a*d, b*c, b*d)`; contoh `(0,6 ; 0,8)` dan `(0,8 ; -0,6)` memberi `(0,48 ; -0,36 ; 0,64 ; -0,48)`. 3: delapan komponen; urutan `000, 001, 010, 011, 100, 101, 110, 111`.

## Langkah berikutnya

Modul berikut: `e-xi1-m13` (proyek mini): menyusun dan menjelaskan satu sirkuit satu qubit sebagai pembangkit bit simulasi. Bacaan pendamping: `e-xi1-m3` (perkalian matriks) dan `e-xi1-m6` (aturan Born).
