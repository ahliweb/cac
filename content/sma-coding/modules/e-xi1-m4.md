## Untuk siapa modul ini

Modul ini untuk murid kelas XI jalur E (komputasi kuantum), minggu `E-XI1-M4` silabus v1.4: bilangan kompleks dasar. Prasyarat: modul `e-xi1-m3` (matriks), dan vektor dari `e-xi1-m2`. Bilangan kompleks dibangun di sini dari awal; apakah materi itu sudah kamu terima di Matematika sekolah belum diverifikasi `[belum terverifikasi]`. Silabus menetapkan **amplitudo real dahulu**: bilangan kompleks di jalur ini hanya dipakai untuk memahami **fase**, bukan untuk hitungan rumit. Alat: kertas dan kalkulator; contoh C++ opsional (dasar pemrograman setara jalur A atau B).

Modul ini berstatus DRAF: karangan penyusun, belum ditinjau pemilik. Jalur E adalah pengayaan di luar rumusan capaian pembelajaran (CP); minggu ini tidak punya irisan pengayaan, jadi modul ini tidak dihitung memenuhi butir CP mana pun.

Aturan AI jalur ini: AI generatif boleh dipakai dengan etika dan dicatat, tanpa data pribadi, kata sandi, atau tugas bernilai pada permintaanmu, dan tanpa akun wajib. Saran: jawab dulu sendiri, baru minta penjelasan atau petunjuk bertahap. Setiap soal `Latihan` bertanda `AI: boleh` atau `AI: tanpa AI`.

## Ingat kembali

Jawab dari ingatan, baru cek di bagian kunci.

1. Hitung `[[0, 1], [1, 0]]` kali `(1, 0)`. (dari `e-xi1-m3`)
2. Mengapa kalimat "komputer kuantum mencoba semua jawaban sekaligus lalu memilih yang benar" menyesatkan? (dari `e-xi1-m1`)
3. Hitung hasil kali dalam `(3, 4)` dan `(4, -3)`. (dari `e-xi1-m2`)

## Tujuan

Setelah modul ini kamu dapat:

- menulis bilangan kompleks `a + bi` dan menjumlahkan serta mengalikannya;
- menghitung modulus dan konjugat, dan memakai `z` kali konjugatnya sama dengan modulus kuadrat;
- menjelaskan fase sebagai sudut dan perkalian dengan `i` sebagai putaran 90 derajat;
- menjelaskan mengapa fase tidak mengubah peluang tetapi mengubah hasil penjumlahan amplitudo.

## Prediksi dulu

Ambil `z = 3 + 4i`, dengan `i` bilangan yang kuadratnya -1. Sebelum menghitung, tebak dan tulis: (1) modulus `z` (panjang titik `(3, 4)` dari titik asal); (2) hasil `z` kali `3 - 4i`; (3) ke arah mana titik `(3, 4)` berpindah bila `z` dikalikan `i`, dan apakah jaraknya dari titik asal berubah.

## Contoh terselesaikan

**Bilangan kompleks.** Bilangan kompleks `z = a + bi` terdiri dari bagian real `a` dan bagian imajiner `b`, dengan aturan `i*i = -1`. Gambarkan `z` sebagai titik `(a, b)` di bidang: sumbu mendatar bagian real, sumbu tegak bagian imajiner. Itu persis seperti vektor dua dimensi di `e-xi1-m2`. Penjumlahan komponen demi komponen: `(1 + 2i) + (3 + i) = 4 + 3i`. Perkalian memakai `i*i = -1`: `(a + bi)(c + di) = (ac - bd) + (ad + bc)i`.

**Modulus dan konjugat.** Modulus `|z|` adalah panjang titiknya: akar dari `a*a + b*b`. Untuk `3 + 4i`: akar dari 25, yaitu 5. Konjugat `z*` hanya membalik tanda bagian imajiner: `3 - 4i`. Kalikan: `(3 + 4i)(3 - 4i) = 9 - 12i + 12i - 16 i*i = 9 + 16 = 25`, yaitu modulus kuadrat. Bukan `z` kuadrat: `(3 + 4i)(3 + 4i) = -7 + 24i`, bilangan lain.

**Fase.** **Fase** adalah sudut titik `z` terhadap sumbu real positif. Titik `1 + i` berjarak akar 2 dan bersudut 45 derajat. Mengalikan dengan `i` memutar titik 90 derajat berlawanan arah jarum jam tanpa mengubah jaraknya: `i * (3 + 4i) = 3i + 4 i*i = -4 + 3i`, modulus tetap 5. Bilangan dengan modulus 1 dan sudut `t` ditulis `cos t + i sin t`; untuk 0, 90, 180, dan 270 derajat bilangan itu adalah `1`, `i`, `-1`, dan `-i`.

**Mengapa fase penting padahal tidak mengubah peluang.** Peluang nanti diperoleh dari modulus kuadrat amplitudo, jadi `i/akar2` dan `1/akar2` sama-sama bermodulus kuadrat 0,5: fase saja tidak terlihat saat membaca. Tetapi fase menentukan hasil bila dua amplitudo dijumlahkan, seperti pada H dua kali di `E-XI1-M1`. Dua amplitudo 0,5 yang searah berjumlah 1, kuadratnya 1; yang berlawanan berjumlah 0, kuadratnya 0. Penjumlahan peluang klasik hanya bisa memberi 0,25 + 0,25 = 0,5. Perbedaan itulah sumber interferensi.

Program berikut menghitung angka di atas dengan `std::complex` (dokumentasi cppreference).

```cpp
#include <cmath>
#include <complex>
#include <iomanip>
#include <iostream>

using Kompleks = std::complex<double>;

double bulat(double x) {
    return std::round(x * 10000.0) / 10000.0 + 0.0;  // membuang -0.0000
}

void cetak(const char* nama, Kompleks z) {
    double im = bulat(z.imag());
    std::cout << nama << " = " << bulat(z.real()) << (im < 0 ? " - " : " + ")
              << std::fabs(im) << "i\n";
}

int main() {
    std::cout << std::fixed << std::setprecision(4);
    const double PI = std::acos(-1.0);

    Kompleks z(3.0, 4.0);
    std::cout << "modulus 3+4i = " << std::abs(z) << "\n";
    cetak("konjugat", std::conj(z));
    std::cout << "z * konjugat = " << (z * std::conj(z)).real() << "\n";

    cetak("i * z", Kompleks(0.0, 1.0) * z);

    Kompleks w(1.0, 1.0);
    std::cout << "modulus 1+i = " << std::abs(w) << ", sudut = "
              << std::arg(w) * 180.0 / PI << " derajat\n";

    Kompleks a = Kompleks(1.0, 1.0) / std::sqrt(2.0);
    std::cout << "modulus kuadrat (1+i)/akar2 = " << std::norm(a) << "\n";

    Kompleks b = Kompleks(0.0, 1.0) / std::sqrt(2.0);
    std::cout << "modulus kuadrat i/akar2 = " << std::norm(b)
              << ", 1/akar2 kuadrat = " << 0.5 << "\n";

    // Fase e^{i theta} = cos(theta) + i sin(theta): modulusnya selalu 1.
    for (int derajat : {0, 90, 180, 270}) {
        double t = derajat * PI / 180.0;
        Kompleks f(std::cos(t), std::sin(t));
        std::cout << derajat << " derajat: ";
        cetak("fase", f);
    }
    return 0;
}
```

Keluaran asli (dijalankan penyusun dengan `g++ -std=c++17 -Wall -Wextra`):

```text
modulus 3+4i = 5.0000
konjugat = 3.0000 - 4.0000i
z * konjugat = 25.0000
i * z = -4.0000 + 3.0000i
modulus 1+i = 1.4142, sudut = 45.0000 derajat
modulus kuadrat (1+i)/akar2 = 1.0000
modulus kuadrat i/akar2 = 0.5000, 1/akar2 kuadrat = 0.5000
0 derajat: fase = 1.0000 + 0.0000i
90 derajat: fase = 0.0000 + 1.0000i
180 derajat: fase = -1.0000 + 0.0000i
270 derajat: fase = 0.0000 - 1.0000i
```

## Contoh setengah jadi

Lengkapi dengan `z = 8 + 6i` (kunci di bagian akhir).

1. Modulus `|z|` adalah akar dari `8*8 + 6*6 = ____`, yaitu ____.
2. Konjugat `z*` = ____.
3. `z` kali `z*` = `8*8 + 6*6` = ____.
4. `i * z` = `8i + 6 i*i` = ____ + ____i, dan modulusnya ____.

## Soal Parsons

Susun baris-baris di bawah (sudah diacak) menjadi program kecil yang mencetak modulus `3 + 4i`.

```text
(a) std::cout << std::abs(z) << "\n";
(b) int main() {
(c) #include <complex>
(d) Kompleks z(3.0, 4.0);
(e) using Kompleks = std::complex<double>;
(f) #include <iostream>
(g)     return 0;
(h) }
```

## Latihan

1. **Modulus dan konjugat.** (`AI: tanpa AI`) Untuk `z = 5 + 12i` hitung modulus, konjugat, dan `z` kali konjugatnya.
2. **Putaran.** (`AI: boleh`) Hitung `i * (2 + 3i)`, lalu `i * i * (2 + 3i)`. Berapa derajat total putaran pada hasil kedua?
3. **Modulus satu.** (`AI: tanpa AI`) Apakah `(3 + 4i)/5` bermodulus 1? Tunjukkan hitungannya.
4. **Dua amplitudo.** (`AI: boleh`) Hitung modulus kuadrat `(1 + i)/2` dan `(1 - i)/2`, lalu jumlahkan kedua hasilnya.
5. **Catatan pemakaian AI (opsional).** Bila memakai asisten AI, catat alat, tujuan, garis besar perintah, bagian yang dipakai, dan cara memeriksa jawabannya.

## Latihan bercampur

1. Terapkan `R = [[0, -1], [1, 0]]` pada `(3, 4)` (`e-xi1-m3`) dan bandingkan dengan `i * (3 + 4i)`. Apa kesimpulanmu?
2. Hitung panjang vektor `(6, 8)` (`e-xi1-m2`) dan modulus `6 + 8i`. Mengapa sama?
3. Program kadang mencetak modulus kuadrat 0,99999999 padahal teorinya 1. Mengapa, dan bagaimana membandingkan dengan aman? (`matkom-bilangan-bertanda-dan-luapan`)

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `e-xi1-m5` (satu minggu lagi), `e-xi1-m7` (sekitar tiga minggu lagi), dan `e-xi1-m12` (sekitar delapan minggu lagi). Jawab sekarang lalu simpan.

1. Hitung modulus dan konjugat `3 + 4i`.
2. Mengalikan dengan `i` memutar titik berapa derajat, dan apakah modulusnya berubah?
3. Mengapa modulus kuadrat `i/akar2` sama dengan `1/akar2` kuadrat, dan apa artinya bagi peluang?

## Kesalahan umum

- **"`i*i = 1`."** Yang benar `i*i = -1`; semua hitungan bergantung pada ini.
- **"Modulus adalah `a + b`."** Modulus adalah akar dari `a*a + b*b`.
- **"Modulus kuadrat sama dengan `z` kuadrat."** `z` kuadrat adalah bilangan lain (`-7 + 24i` untuk `3 + 4i`); modulus kuadrat adalah `z` kali konjugatnya.
- **"Fase mengubah peluang hasil."** Fase saja tidak mengubah modulus kuadrat; ia berpengaruh saat amplitudo dijumlahkan.
- **"Bagian imajiner berarti tidak nyata dan tidak berguna."** Itu hanya nama; ia menghitung sudut dan putaran dengan tepat.

## Cek mandiri

- [ ] Saya dapat menjumlahkan dan mengalikan bilangan kompleks sederhana.
- [ ] Saya dapat menghitung modulus dan konjugat.
- [ ] Saya dapat menjelaskan fase sebagai sudut dan `i` sebagai putaran 90 derajat.
- [ ] Saya dapat menjelaskan mengapa fase tidak mengubah peluang tetapi mengubah penjumlahan amplitudo.
- [ ] Saya mencatat pemakaian AI bila saya memakainya.

## Kunci dan petunjuk

**Ingat kembali.** 1: `(0, 1)`. 2: hanya satu hasil acak yang terbaca; kekuatan algoritma ada pada interferensi yang mengatur amplitudo. 3: 12 - 12 = 0.

**Prediksi dulu.** (1) 5; (2) 25; (3) titik berputar 90 derajat berlawanan arah jarum jam ke `(-4, 3)` dan jaraknya tetap 5.

**Contoh setengah jadi.** 1: 64 + 36 = 100, yaitu 10. 2: `8 - 6i`. 3: 100. 4: `-6 + 8i`, modulus 10 (akar dari 36 + 64).

**Soal Parsons.** c, f, e, b, d, a, g, h (c dan f boleh bertukar). Berkas pustaka dulu, lalu nama pendek, lalu fungsi `main` dengan isinya.

**Latihan.** 1: modulus 13; konjugat `5 - 12i`; hasil kali 169. 2: `i*(2 + 3i) = 2i + 3 i*i = -3 + 2i`; kali `i` lagi: `-2 - 3i`; total putaran 180 derajat. 3: modulus akar dari `(3/5)*(3/5) + (4/5)*(4/5) = 0,36 + 0,64 = 1`, ya. 4: `|1 + i|` kuadrat adalah 2, dibagi 4 menjadi 0,5; hal sama untuk `(1 - i)/2`; jumlahnya 1. 5: opsional.

**Latihan bercampur.** 1: `R` kali `(3, 4)` adalah `(-4, 3)`, sama dengan `-4 + 3i`; matriks `R` dan perkalian `i` sama-sama memutar 90 derajat. 2: 10 dan 10; rumusnya sama (akar jumlah kuadrat), hanya penamaan yang berbeda. 3: bilangan pecahan tidak tepat di komputer (galat pembulatan); bandingkan selisih dengan toleransi kecil, bukan dengan `==`.

**Ulang berjarak.** 1: modulus 5, konjugat `3 - 4i`. 2: 90 derajat; modulus tidak berubah. 3: keduanya bernilai 0,5; fase tidak mengubah peluang bila amplitudo dibaca tanpa dijumlahkan.

## Langkah berikutnya

Modul berikut: `e-xi1-m5` (qubit dan keadaan), tempat vektor, panjang satu, dan amplitudo bertemu. Bacaan pendamping: `matkom-bilangan-bertanda-dan-luapan` untuk galat pembulatan.
