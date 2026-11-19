## Untuk siapa modul ini

Modul ini untuk murid kelas XII jalur E (komputasi kuantum), minggu `E-XII1-M6` silabus v1.4: gagasan Fourier kuantum dan Shor (konsep), yaitu menyebut peran transformasi Fourier dan ide pemfaktoran, tanpa mengimplementasikan algoritma Shor, dengan keluaran catatan konsep. Prasyarat: modul `e-xii1-m5` (Grover III). Di luar indeks, bagian kode (hanya bagian klasik, bukan simulator kuantum) memerlukan dasar pemrograman setara `A-X1-M9..M12` (C++); guru memeriksanya. Bagian konsep dan hitungan terbuka bagi semua murid. Alat: kertas, kalkulator, dan program kecil (tanpa akun).

Modul ini berstatus DRAF: karangan penyusun, belum ditinjau pemilik. Jalur E adalah pengayaan di luar rumusan CP; minggu ini tanpa irisan pengayaan, jadi modul ini tidak dihitung memenuhi butir CP mana pun.

Aturan AI jalur ini: AI generatif boleh dipakai dengan etika dan dicatat, tanpa data pribadi, kata sandi, atau tugas bernilai pada permintaanmu, dan tanpa akun wajib. Saran: jawab dulu sendiri, baru minta petunjuk bertahap; kode buatan AI kamu baca, jalankan, dan uji. Setiap soal `Latihan` bertanda `AI: boleh` atau `AI: tanpa AI`.

Catatan untuk guru: bahwa pemfaktoran dikembalikan ke masalah pencarian orde, dan bahwa bagian itu murni klasik sedangkan hanya pencarian orde yang memerlukan komputer kuantum, dibaca penyusun dari halaman IBM Quantum Learning "Shor's algorithm" pada pelajaran faktorisasi dan estimasi fase, per 2026-11-19. Halaman NIST "Post-Quantum Cryptography" (per 2026-11-19) menyebut komputer kuantum yang cukup besar untuk memecahkan sandi umum mungkin masih bertahun-tahun atau puluhan tahun lagi. Pernyataan silabus bahwa Shor bermakna tidak dapat dijalankan di perangkat saat ini `[belum terverifikasi]`: penyusun tidak membuka sumber khusus untuknya.

## Ingat kembali

Jawab dari ingatan, baru cek di bagian kunci.

1. Berapa pengulangan Grover yang mendekati terbaik untuk `N = 1024`, dan berapa query klasik terburuk? (dari `e-xii1-m5`)
2. Mengapa Grover tidak "memeriksa semua item sekaligus lalu membaca jawabannya"? (dari `e-xii1-m3`)
3. Mengapa jumlah query klasik terburuk `2^(n-1) + 1` tumbuh jauh lebih cepat dari `n`, dan berapa untuk `n = 10`? (dari `e-xi2-m12`)

## Tujuan

Setelah modul ini kamu dapat:

- menjelaskan bahwa memfaktorkan `N` dapat dikembalikan ke pencarian orde `r`, dan menunjuk bagian klasik dan bagian kuantumnya;
- menyebut peran transformasi Fourier: menampakkan periode sebuah barisan berkala;
- menghitung bagian klasik dengan tangan dan program, dan menyebut batas modul ini (tidak ada implementasi kuantum).

Keluaran yang diminta silabus: catatan konsep.

## Prediksi dulu

Tebak dan tulis: (1) untuk `N = 15` dan `a = 7`, berapa periode barisan `7^x mod 15` (`x = 0, 1, 2, ...`); (2) faktor apa yang muncul; (3) barisan 0/1 berperiode 4 sepanjang 16, di indeks mana transformasi Fourier-nya besar; (4) apakah `N = 15` memerlukan komputer kuantum.

## Contoh terselesaikan

**Dari pemfaktoran ke orde.** Pilih `a` dengan `fpb(a, N) = 1`. Orde `r` adalah bilangan bulat positif terkecil dengan `a^r` sama dengan 1 modulo `N`. Bila `r` genap dan `a^(r/2)` bukan `-1` modulo `N`, maka `fpb(a^(r/2) - 1, N)` dan `fpb(a^(r/2) + 1, N)` adalah faktor sejati `N`. Alasan singkat: `(a^(r/2) - 1)(a^(r/2) + 1) = a^r - 1` kelipatan `N`, tetapi tidak satu pun faktornya kelipatan `N`, sehingga fpb membagi `N` secara sejati. Contoh `N = 15`, `a = 7`: barisan `1, 7, 4, 13, 1, ...` berperiode `r = 4`; `7^2 = 49` sisa 4; `fpb(3, 15) = 3` dan `fpb(5, 15) = 5`.

**Mana klasik, mana kuantum.** Seluruh langkah di atas klasik. Yang sulit adalah menemukan `r` untuk `N` besar: mencoba `x` satu per satu memerlukan sampai `r` langkah, dan `r` dapat mendekati ukuran `N`. Menurut sumber di atas, hanya bagian ini yang memerlukan komputer kuantum. Itulah ide Shor.

**Peran transformasi Fourier.** Untuk barisan berkala, transformasi Fourier diskret memusatkan besarnya pada kelipatan `panjang / periode`. Program di bawah memperlihatkannya pada skala kecil dengan hitungan klasik biasa. Transformasi Fourier kuantum adalah padanannya pada amplitudo sebuah keadaan; rinciannya di luar modul ini, dan modul ini tidak mengimplementasikannya.

```cpp
#include <cmath>
#include <cstdio>
#include <vector>

const double PI = std::acos(-1.0);

long fpb(long a, long b) {  // pembagi persekutuan terbesar
    while (b != 0) {
        long sisa = a % b;
        a = b;
        b = sisa;
    }
    return a;
}

long pangkat_mod(long a, long x, long m) {
    long hasil = 1 % m;
    for (long i = 0; i < x; i++) hasil = (hasil * a) % m;
    return hasil;
}

// Bagian KLASIK dari ide Shor: cari orde r (a^r = 1 mod N) dengan mencoba satu per satu.
long orde(long a, long N) {
    long nilai = a % N;
    long r = 1;
    while (nilai != 1) {
        nilai = (nilai * a) % N;
        r++;
    }
    return r;
}

void coba_faktor(long a, long N) {
    long r = orde(a, N);
    std::printf("N = %ld, a = %ld: orde r = %ld", N, a, r);
    if (r % 2 != 0) {
        std::printf(" -> r ganjil, ganti a\n");
        return;
    }
    long y = pangkat_mod(a, r / 2, N);
    if (y == N - 1) {
        std::printf(" -> a^(r/2) = -1 mod N, ganti a\n");
        return;
    }
    std::printf(" -> a^(r/2) = %ld; fpb(%ld, N) = %ld, fpb(%ld, N) = %ld\n", y, y - 1, fpb(y - 1, N), y + 1,
                fpb(y + 1, N));
}

// Besar transformasi Fourier diskret dari barisan 0/1 (hanya klasik, hitungan langsung).
void besar_fourier(const char* nama, long a, long N, int panjang) {
    std::vector<double> x(panjang, 0.0);
    for (int j = 0; j < panjang; j++) x[j] = (pangkat_mod(a, j, N) == 1) ? 1.0 : 0.0;
    std::printf("%s (a = %ld, N = %ld, panjang %d), |X_k| untuk k = 0..%d:\n ", nama, a, N, panjang, panjang - 1);
    for (int k = 0; k < panjang; k++) {
        double re = 0.0, im = 0.0;
        for (int j = 0; j < panjang; j++) {
            double sudut = 2.0 * PI * j * k / panjang;
            re += x[j] * std::cos(sudut);
            im -= x[j] * std::sin(sudut);
        }
        std::printf(" %.2f", std::sqrt(re * re + im * im));
    }
    std::printf("\n");
}

int main() {
    coba_faktor(7, 15);
    coba_faktor(2, 15);
    coba_faktor(2, 21);
    coba_faktor(14, 15);
    coba_faktor(2, 7);

    besar_fourier("periode 4 membagi panjang", 7, 15, 16);
    besar_fourier("periode 6 tidak membagi panjang", 2, 21, 16);
    return 0;
}
```

Keluaran asli (dikompilasi penyusun dengan `g++ -std=c++17 -Wall -Wextra`, lalu dijalankan):

```text
N = 15, a = 7: orde r = 4 -> a^(r/2) = 4; fpb(3, N) = 3, fpb(5, N) = 5
N = 15, a = 2: orde r = 4 -> a^(r/2) = 4; fpb(3, N) = 3, fpb(5, N) = 5
N = 21, a = 2: orde r = 6 -> a^(r/2) = 8; fpb(7, N) = 7, fpb(9, N) = 3
N = 15, a = 14: orde r = 2 -> a^(r/2) = -1 mod N, ganti a
N = 7, a = 2: orde r = 3 -> r ganjil, ganti a
periode 4 membagi panjang (a = 7, N = 15, panjang 16), |X_k| untuk k = 0..15:
  4.00 0.00 0.00 0.00 4.00 0.00 0.00 0.00 4.00 0.00 0.00 0.00 4.00 0.00 0.00 0.00
periode 6 tidak membagi panjang (a = 2, N = 21, panjang 16), |X_k| untuk k = 0..15:
  3.00 0.41 1.00 2.41 1.00 2.41 1.00 0.41 3.00 0.41 1.00 2.41 1.00 2.41 1.00 0.41
```

Bacaan hasil. Untuk `N = 15` dengan `a = 7` dan `a = 2`, `r = 4` dan faktornya 3 dan 5; untuk `N = 21`, `a = 2` memberi `r = 6` dan faktor 7 dan 3. Tidak semua `a` berhasil: `a = 14` memberi `a^(r/2) = -1`, dan `a = 2` modulo 7 memberi `r` ganjil; pada kasus itu `a` diganti. Pada barisan berperiode 4 sepanjang 16, besar Fourier `4,00` tepat di `k = 0, 4, 8, 12` dan 0 di tempat lain: kelipatan `16/4`. Pada periode 6 (tidak membagi 16) puncaknya tidak lagi tajam: `3,00` di `k = 0` dan `k = 8`, dan `2,41` di `k = 3, 5, 11, 13`, di dekat kelipatan `16/6`.

**Batasnya.** Modul ini tidak mengimplementasikan Shor dan tidak menjanjikan bahwa Shor bermakna dapat dijalankan di perangkat saat ini. Bagian klasik di atas hanya berlatih pada `N` kecil; untuk `N` sungguhan diperlukan mesin berskala besar, yang menurut NIST mungkin masih bertahun-tahun atau puluhan tahun lagi (per 2026-11-19).

## Contoh setengah jadi

Lengkapi (kunci di bagian akhir).

1. Untuk `N = 21`, `a = 2`: barisan `2^x mod 21` adalah `1, 2, 4, 8, 16, 11, 1`, jadi `r` = ____; `2^3` = ____; `fpb(7, 21)` = ____ dan `fpb(9, 21)` = ____.
2. Lengkapi:

```cpp setengah-jadi
long fpb(long a, long b) {
    while (b != 0) {
        long sisa = a % b;
        a = ____;
        b = sisa;
    }
    return a;
}
```

## Soal Parsons

Susun baris-baris di bawah (sudah diacak) menjadi isi fungsi `orde`. Penjorokan dan kurung kurawal penutup sengaja dihilangkan.

```text
(a) r++;
(b) long r = 1;
(c) nilai = (nilai * a) % N;
(d) return r;
(e) while (nilai != 1) {
(f) long nilai = a % N;
```

## Latihan

1. **Dengan tangan.** (`AI: tanpa AI`) Untuk `N = 35` dan `a = 3`, tulis `3^x mod 35` sampai kembali ke 1, tentukan `r`, lalu cari faktor dengan `fpb`.
2. **Ubah program.** (`AI: boleh`) Prediksi dulu, lalu jalankan `coba_faktor` untuk `a = 4` dan `a = 11` pada `N = 15`, dan untuk `a = 3` pada `N = 35`.
3. **Rancang dulu.** (`AI: boleh`) Tulis pseudocode yang mencoba `a` dari 2 sampai `N - 1` untuk `N = 21` dan melaporkan `a` mana yang berhasil dan mana yang diganti, beserta alasannya.
4. **Membaca sumber.** (`AI: tanpa AI`) Baca halaman IBM Quantum Learning "Shor's algorithm" (lihat Rujukan). Tulis tiga kalimat catatan bersumber: bagian mana yang klasik, bagian mana yang kuantum, dan apa yang direduksi ke apa. Tanpa klaim yang tidak ada di halaman itu.
5. **Catatan pemakaian AI (opsional).** Bila memakai asisten AI, catat alat, tujuan, garis besar perintah, bagian yang dipakai, dan cara memeriksanya.

## Latihan bercampur

1. Pada Bernstein-Vazirani, H kedua mengubah pola tanda `(-1)^(s . x)` menjadi satu hasil `s`. Apa kemiripannya dengan transformasi Fourier yang menampakkan periode? (`e-xii1-m1`)
2. Program di atas memerlukan 4 langkah untuk `r`, sedangkan Grover pada `N = 16` memakai 3 pengulangan. Mengapa kedua angka itu tidak boleh dibandingkan langsung? (`e-xii1-m5`)

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `e-xii1-m7` (satu minggu lagi), `e-xii1-m9` (sekitar tiga minggu lagi), dan `e-xii1-m14` (sekitar delapan minggu lagi). Jawab sekarang lalu simpan.

1. Bagian mana dari algoritma Shor yang kuantum, dan bagian mana yang klasik?
2. Apa itu orde `r` dari `a` modulo `N`, dan bagaimana `r` memberi faktor `N`?
3. Mengapa transformasi Fourier berguna untuk menemukan periode?

## Kesalahan umum

- **"Shor mencoba semua pembagi sekaligus."** Shor mengembalikan pemfaktoran ke pencarian periode; interferensi dan Fourier yang menampakkan periode.
- **"Seluruh algoritma Shor itu kuantum."** Hampir semua langkah klasik, termasuk `fpb`; hanya pencarian orde yang memerlukan komputer kuantum.
- **"Satu pembacaan langsung memberi `r`."** Ia memberi petunjuk; pengolahan klasik lanjutan diperlukan.
- **"Setiap `a` memberi faktor."** Bila `r` ganjil atau `a^(r/2)` sama dengan `-1` modulo `N`, `a` diganti.

## Cek mandiri

- [ ] Saya dapat menyebut orde `r` dan menghitungnya untuk `N` kecil.
- [ ] Saya dapat memakai `fpb` untuk mendapat faktor dari `r` genap.
- [ ] Saya dapat menunjuk bagian klasik dan kuantum dari ide Shor.
- [ ] Saya dapat menjelaskan peran transformasi Fourier pada barisan berkala.
- [ ] Saya mencatat pemakaian AI bila saya memakainya.

## Kunci dan petunjuk

**Ingat kembali.** 1: sekitar 25 pengulangan; query klasik terburuk 1023. 2: oracle dipanggil sekali pada superposisi; satu bacaan memberi satu item acak, dan hanya interferensi yang menaikkan peluang item bertanda. 3: `2^(n-1) + 1` berlipat dua tiap `n` bertambah satu (eksponensial), sedangkan `n` bertambah satu-satu; untuk `n = 10` menjadi 513.

**Prediksi dulu.** (1) 4. (2) 3 dan 5. (3) indeks `0, 4, 8, 12`. (4) tidak; `N = 15` diselesaikan dengan tangan, dan komputer kuantum baru dibutuhkan untuk `N` yang jauh lebih besar.

**Contoh setengah jadi.** 1: `r = 6`; `2^3 = 8`; `fpb(7, 21) = 7` dan `fpb(9, 21) = 3`. 2: `b`. Kunci ini dikompilasi dan dijalankan penyusun (potongan itu ada di program di atas).

**Soal Parsons.** f, b, e, c, a, d.

**Latihan.** 1: `3^x mod 35`: `3, 9, 27, 11, 33, 29, 17, 16, 13, 4, 12, 1`, jadi `r = 12`; `3^6` sisa 29; `fpb(28, 35) = 7` dan `fpb(30, 35) = 5` (keluaran program penyusun cocok). 2: `a = 4` dan `a = 11` pada `N = 15`: `r = 2`, faktor 3 dan 5; `a = 3` pada `N = 35`: `r = 12`, faktor 7 dan 5 (keluaran program penyusun). 3: contoh: `untuk a dari 2 sampai N - 1: jika fpb(a, N) > 1 laporkan faktor langsung; selain itu hitung r; jika r ganjil atau a^(r/2) = N - 1 laporkan "ganti a"; selain itu laporkan fpb(a^(r/2) - 1, N) dan fpb(a^(r/2) + 1, N)`. 4: contoh jawaban: pemfaktoran direduksi ke pencarian orde; reduksi dan pengolahan hasilnya klasik; hanya pencarian orde memakai komputer kuantum (estimasi fase); semua dari halaman itu. 5: opsional.

**Latihan bercampur.** 1: keduanya mengubah pola tanda atau pola berkala menjadi puncak yang mudah dibaca: tanda `(-1)^(s . x)` menjadi satu hasil `s`, barisan berkala menjadi puncak di kelipatan `panjang / periode`. 2: keduanya berbeda masalah dan satuan: yang pertama langkah hitung klasik untuk mencari periode, yang kedua jumlah pemanggilan oracle pada pencarian tak terurut.

**Ulang berjarak.** 1: hampir semua klasik (pilih `a`, hitung `fpb`, olah `r`); hanya pencarian orde yang kuantum. 2: `r` adalah bilangan bulat positif terkecil dengan `a^r` sama dengan 1 modulo `N`; bila `r` genap dan `a^(r/2)` bukan `-1`, maka `fpb(a^(r/2) +- 1, N)` memberi faktor. 3: barisan berkala memberi puncak tajam di kelipatan `panjang / periode` pada transformasi Fourier, sehingga periode dapat dibaca dari posisi puncak.

## Langkah berikutnya

Modul berikut: `e-xii1-m7` (batas komputasi kuantum). Bacaan pendamping: `e-xii1-m1` dan `e-xii1-m5`.
