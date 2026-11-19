## Untuk siapa modul ini

Modul ini untuk murid kelas XII jalur E (komputasi kuantum), minggu `E-XII2-M4` silabus v1.4: dampak komputasi kuantum ke keamanan informasi (konsep), yaitu hubungan dengan kriptografi yang dijelaskan dengan sumber, dengan keluaran catatan bersumber. Prasyarat: modul `e-xii2-m3` dan `e-xii1-m6` (Shor, konsep); modul `e-xii1-m10` belum terindeks, jadi guru memeriksanya. Di luar indeks, bagian kode memerlukan dasar pemrograman setara `A-X1-M9..M12` (C++); bagian konsep terbuka bagi semua murid. Alat: kertas, kalkulator, dan program C++ kecil di bawah.

Modul ini berstatus DRAF: karangan penyusun, belum ditinjau pemilik. Jalur E adalah pengayaan di luar rumusan CP; minggu ini tanpa irisan pengayaan, jadi modul ini tidak dihitung memenuhi butir CP mana pun. Modul ini bukan panduan memecahkan sistem nyata.

Aturan AI jalur ini: AI generatif boleh dipakai dengan etika dan dicatat, tanpa data pribadi, kata sandi, atau tugas bernilai pada permintaanmu, dan tanpa akun wajib. Saran: jawab dulu sendiri, baru minta petunjuk bertahap; kode buatan AI kamu baca, jalankan, dan uji. Setiap soal `Latihan` bertanda `AI: boleh` atau `AI: tanpa AI`.

Catatan untuk guru: klaim tentang kriptografi dibaca dari tiga halaman, per tanggal akses 2026-11-19: halaman proyek NIST "Post-Quantum Cryptography", FAQ NIST pada proyek yang sama (entri Grover dan AES bertanggal 18 November 2018; periksa apakah sudah diperbarui), dan kursus IBM Quantum Learning tentang algoritma Shor. Modul ini tidak memberi perkiraan jumlah qubit atau waktu untuk memecahkan kunci tertentu, karena penyusun tidak membaca sumber untuk itu.

## Ingat kembali

Jawab dari ingatan, baru cek di bagian kunci.

1. Pada algoritma hibrida, bagian mana dijalankan di perangkat kuantum dan bagian mana di komputer klasik? (dari `e-xii2-m3`)
2. Berapa kali lebih banyak shot yang dibutuhkan agar selang menyempit menjadi setengahnya? (dari `e-xii2-m1`)
3. Mengapa hitungan query Grover belum berarti komputer kuantum lebih cepat dalam waktu nyata? (dari `e-xii1-m10`)

## Tujuan

Setelah modul ini kamu dapat:

- menjelaskan, dengan kutipan sumber, mengapa komputer kuantum besar menjadi ancaman bagi kriptografi kunci publik;
- membedakan dampak algoritma Shor (kunci publik) dari dampak algoritma Grover (kunci simetris);
- menghitung dengan model sederhana bagaimana Grover menurunkan jumlah langkah pencarian kunci;
- memeriksa sebuah klaim keamanan: bersumber, terlalu luas, atau tidak bersumber.

Keluaran yang diminta silabus: catatan bersumber.

## Prediksi dulu

Sebuah kunci simetris 128 bit dicari dengan mencoba kunci satu per satu. Tebak dan tulis: (1) kira-kira berapa kali percobaan rata-rata secara klasik, dalam pangkat dua; (2) berapa iterasi Grover yang diperlukan, dalam pangkat dua; (3) apakah pengurangan itu otomatis berarti kunci 128 bit tidak aman terhadap komputer kuantum nyata.

## Contoh terselesaikan

**Dua algoritma, dua dampak.** Halaman NIST menyatakan bahwa bila komputer kuantum besar pernah dibangun, mesin itu akan dapat memecahkan banyak sistem kriptografi kunci publik yang dipakai sekarang; ia juga menyebut mesin seperti itu mungkin masih bertahun-tahun atau puluhan tahun lagi. Hubungannya dengan Shor: kursus IBM menunjukkan faktorisasi bilangan dapat direduksi menjadi pencarian orde yang diselesaikan efisien dengan estimasi fase (`e-xii1-m6`), sehingga mesin yang mampu menjalankannya mengancam sistem yang bergantung pada sulitnya faktorisasi. Kaitan rinci faktorisasi dengan sistem kunci publik tertentu tidak dibaca penyusun dari sumber modul ini; tandai `[belum terverifikasi]` bila kamu memakainya. Grover berbeda: ia hanya mempercepat pencarian secara kuadrat, jadi kunci simetris tidak runtuh, hanya "separuh bit" yang efektif pada model kasar.

**Apa yang dilakukan NIST.** Menurut halaman proyek NIST, pada Agustus 2024 NIST merilis tiga standar utama kriptografi pasca-kuantum: FIPS 203 (ML-KEM, pembentukan kunci), FIPS 204 (ML-DSA, tanda tangan digital), dan FIPS 205 (SLH-DSA, tanda tangan digital berbasis hash tanpa keadaan). Halaman itu menyatakan organisasi sebaiknya mulai bermigrasi sekarang; NIST berencana menghapus algoritma yang rentan dari standarnya pada 2035, sistem berisiko tinggi lebih awal. Membangun infrastruktur kunci publik modern memakan hampir dua dekade, jadi persiapan tidak menunggu kepastian kapan mesin itu ada.

**Grover dan kunci simetris.** FAQ NIST menyatakan Grover memberi pengurangan langkah kuadrat, lalu menyebut faktor yang membuatnya kurang dramatis: perangkat kuantum kemungkinan lebih mahal, dan menurut pembuktian Zalka (1997) percepatan kuadrat penuh menuntut semua langkah Grover berjalan **berurutan**, padahal serangan nyata berjalan paralel masif. Kesimpulan FAQ (entri 2018): Grover kemungkinan besar memberi sedikit atau tanpa keuntungan terhadap AES, dan AES-128 akan tetap aman puluhan tahun, dengan asumsi tidak ada kelemahan baru. Program berikut menghitung model sederhana: ruang kunci `2^n`, klasik rata-rata `2^(n-1)` langkah, Grover satu perangkat `(pi/4) x 2^(n/2)` iterasi, dan bila `S` perangkat membagi rata, tiap perangkat mencari di `2^n / S` kunci.

```cpp
#include <cmath>
#include <cstdio>
#include <initializer_list>

// Model sederhana: ruang kunci N = 2^n. Pencarian klasik rata-rata mencoba N/2 kunci.
// Grover dengan satu perangkat memakai kira-kira (pi/4) * akar(N) iterasi berurutan.
// Dengan S perangkat, ruang kunci dibagi rata: tiap perangkat mencari di N/S kunci.
int main() {
    const double PI = std::acos(-1.0);
    const int log2_S = 40;  // pengandaian: 2^40 perangkat yang bekerja bersamaan
    std::printf("n    klasik 1 mesin   Grover 1 perangkat   klasik tiap mesin   Grover tiap perangkat\n");
    std::printf("bit  (log2 langkah)   (log2 iterasi)       (S = 2^%d)          (S = 2^%d)\n", log2_S, log2_S);
    for (int n : {64, 80, 128, 192, 256}) {
        double klasik = n - 1.0;
        double grover = std::log2(PI / 4.0) + n / 2.0;
        double klasik_p = klasik - log2_S;
        double grover_p = std::log2(PI / 4.0) + (n - log2_S) / 2.0;
        std::printf("%3d  %8.1f         %8.1f             %8.1f            %8.1f\n", n, klasik, grover, klasik_p, grover_p);
    }
    std::printf("selisih eksponen (klasik - Grover), n = 128: 1 perangkat %.1f, S = 2^%d: %.1f\n",
                127.0 - (std::log2(PI / 4.0) + 64.0), log2_S,
                (127.0 - log2_S) - (std::log2(PI / 4.0) + (128 - log2_S) / 2.0));
    return 0;
}
```

Keluaran asli (dikompilasi penyusun dengan `g++ -std=c++17 -Wall -Wextra`, lalu dijalankan):

```text
n    klasik 1 mesin   Grover 1 perangkat   klasik tiap mesin   Grover tiap perangkat
bit  (log2 langkah)   (log2 iterasi)       (S = 2^40)          (S = 2^40)
 64      63.0             31.7                 23.0                11.7
 80      79.0             39.7                 39.0                19.7
128     127.0             63.7                 87.0                43.7
192     191.0             95.7                151.0                75.7
256     255.0            127.7                215.0               107.7
selisih eksponen (klasik - Grover), n = 128: 1 perangkat 63.3, S = 2^40: 43.3
```

Bacaan hasilnya. Untuk 128 bit, klasik memerlukan sekitar `2^127` langkah dan Grover satu perangkat sekitar `2^63,7` iterasi: eksponennya hampir separuh. Bila `2^40` perangkat bekerja bersamaan, selisih eksponen turun dari 63,3 menjadi 43,3: bagian dari keunggulan hilang karena Grover tidak membagi dengan rapi. Tetapi model ini **tidak memuat** biaya per langkah (satu iterasi memerlukan seluruh sirkuit sandi), derau, atau koreksi kesalahan, padahal FAQ NIST menyebut teknologi kuantum yang dibayangkan sekarang berorde lebih lambat dan lebih boros energi untuk operasi sejenis (`e-xii2-m5`). Angka ini bukan ramalan serangan nyata; ia hanya menunjukkan asal sebutan "separuh bit".

**Aturan catatan bersumber.** Tiap kalimat klaim ditulis bersama sumbernya (judul, alamat, bagian) dan tanggal akses. Klaim tanpa sumber ditandai `[belum terverifikasi]` atau dibuang; "semua", "pasti", dan "sudah" biasanya terlalu luas.

## Contoh setengah jadi

Lengkapi (kunci di bagian akhir).

1. Untuk `n = 64`, `log2` iterasi Grover satu perangkat adalah `log2(pi/4) + 64/2` = ____ (satu desimal).
2. Lengkapi:

```cpp setengah-jadi
double klasik = n - ____;
double grover = std::log2(PI / 4.0) + n / ____;
```

## Soal Parsons

Susun baris-baris di bawah (sudah diacak) menjadi bagian dalam program yang menghitung klasik per mesin.

```text
(a)     for (int n : {64, 80, 128, 192, 256}) {
(b)         double klasik_p = klasik - log2_S;
(c)     }
(d)         double klasik = n - 1.0;
```

## Latihan

1. **Hitung.** (`AI: tanpa AI`) Untuk `n = 96`, hitung `log2` langkah klasik rata-rata, `log2` iterasi Grover satu perangkat, dan selisihnya.
2. **Ubah data.** (`AI: boleh`) Ubah `log2_S` menjadi 60. Prediksi dulu selisih eksponen untuk `n = 128`, lalu jalankan.
3. **Kutipan.** (`AI: tanpa AI`) Tulis dua kalimat tentang dampak komputasi kuantum pada kriptografi, masing-masing dengan sumber dari daftar rujukan modul (judul, alamat, bagian). Tandai kalimat yang tidak dapat kamu sumberkan.
4. **Periksa klaim.** (`AI: boleh`) Nilai tiap klaim: bersumber, terlalu luas, atau tidak bersumber (dan sumber apa yang dibutuhkan). (a) "Komputer kuantum akan memecahkan semua enkripsi." (b) "NIST merilis tiga standar utama kriptografi pasca-kuantum pada Agustus 2024." (c) "AES-128 sudah tidak aman terhadap komputer kuantum." (d) "Komputer kuantum sudah memecahkan RSA-2048." (e) "Organisasi sebaiknya mulai bermigrasi ke kriptografi pasca-kuantum sekarang."
5. **Catatan pemakaian AI (opsional).** Bila memakai asisten AI, catat alat, tujuan, garis besar perintah, bagian yang dipakai, dan cara memeriksanya.

## Latihan bercampur

1. Untuk `N = 15` dan `a = 7` orde `r = 4`. Faktor apa yang muncul dari `gcd(a^(r/2) - 1, N)` dan `gcd(a^(r/2) + 1, N)`? (`e-xii1-m6`)
2. Pada empat item dengan satu item bertanda, berapa iterasi Grover untuk peluang 1, dan mengapa? (`e-xii1-m5`)

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `e-xii2-m5` (satu minggu lagi), `e-xii2-m7` (sekitar tiga minggu lagi), dan `e-xii2-m12` (sekitar delapan minggu lagi). Jawab sekarang lalu simpan.

1. Apa yang dikatakan NIST tentang Grover dan AES-128, dan apa dua alasan yang disebut?
2. Mengapa klaim "komputer kuantum akan memecahkan semua enkripsi" terlalu luas dan tidak bersumber?
3. Apa beda dampak komputer kuantum pada kunci publik (Shor) dan kunci simetris (Grover) menurut sumbermu?

## Kesalahan umum

- **"Komputer kuantum memecahkan semua enkripsi."** Sumber NIST menyebut banyak sistem kunci publik, bukan semua; kunci simetris terkena dampak yang lebih kecil.
- **"Grover membuat AES-128 menjadi 64 bit dan tidak aman."** Itu hanya hitungan iterasi; NIST menimbang biaya perangkat dan langkah berurutan, dan menilai AES-128 kemungkinan tetap aman puluhan tahun (entri 2018).
- **"Mesin besarnya belum ada, jadi tunggu saja."** NIST menyatakan migrasi memakan waktu lama dan sebaiknya dimulai sekarang.
- **"Model modul ini meramalkan serangan nyata."** Ia hanya menghitung langkah.
- **"Satu sumber lama pasti masih berlaku."** Entri FAQ yang kamu baca bertanggal 2018; periksa pembaruannya.

## Cek mandiri

- [ ] Saya dapat menjelaskan dampak Shor pada kunci publik dengan sumber.
- [ ] Saya dapat menjelaskan mengapa dampak Grover pada kunci simetris lebih kecil.
- [ ] Saya dapat menyebut tiga standar NIST Agustus 2024.
- [ ] Saya dapat menandai klaim yang terlalu luas atau tidak bersumber.
- [ ] Saya mencatat pemakaian AI bila saya memakainya.

## Kunci dan petunjuk

**Ingat kembali.** 1: perangkat kuantum menyiapkan keadaan berparameter dan membacanya; komputer klasik menghitung energi atau biaya dari hitungan, gradien, dan memperbarui parameter. 2: empat kali, karena lebar selang sebanding `1 / akar(shot)`. 3: hitungan query hanya menghitung pemanggilan oracle; belum termasuk waktu per langkah, derau, kompilasi ke gerbang perangkat, antrean, dan biaya.

**Prediksi dulu.** (1) `2^127`. (2) kira-kira `2^63,7`, sekitar `2^64`. (3) tidak otomatis: biaya per langkah, langkah berurutan, dan perangkat yang diperlukan belum dihitung (lihat FAQ NIST).

**Contoh setengah jadi.** 1: `-0,35 + 32` = 31,7. 2: `1.0` dan `2.0`. Kunci ini dikompilasi penyusun (potongan itu ada di program di atas).

**Soal Parsons.** a, d, b, c.

**Latihan.** 1: klasik `95`; Grover `log2(pi/4) + 48` = 47,65 (47,7); selisih 47,3. 2: klasik per mesin `127 - 60` = 67; Grover per perangkat `-0,35 + (128 - 60)/2` = 33,65; selisih 33,3 (keluaran varian program memberi 33,3). 3: contoh kalimat: "NIST merilis tiga standar utama kriptografi pasca-kuantum pada Agustus 2024 (halaman proyek NIST Post-Quantum Cryptography, bagian PQC Standards)." Kalimat tanpa sumber ditandai atau dibuang. 4: (a) terlalu luas; sumber NIST menyebut banyak sistem kunci publik, dan mesin besarnya mungkin masih jauh. (b) bersumber (halaman proyek NIST). (c) bertentangan dengan FAQ NIST (entri 2018: AES-128 kemungkinan aman puluhan tahun); tandai bahwa entri itu lama. (d) tidak bersumber pada rujukan modul; butuh sumber primer sebelum dinyatakan, dan NIST menyebut mesin seperti itu mungkin masih bertahun-tahun atau puluhan tahun lagi. (e) bersumber (halaman proyek NIST). 5: opsional.

**Latihan bercampur.** 1: `7^2 = 49`; `gcd(48, 15)` = 3 dan `gcd(50, 15)` = 5; jadi faktor 3 dan 5. 2: satu iterasi: `sin(theta) = 1/2`, `theta = 30°`, dan `(2t + 1) x 30° = 90°` untuk `t = 1`.

**Ulang berjarak.** 1: Grover memberi pengurangan langkah kuadrat, tetapi NIST menyebut perangkat kuantum kemungkinan lebih mahal dan percepatan penuh menuntut langkah berurutan (Zalka 1997) sehingga serangan paralel kurang diuntungkan; hasilnya, AES-128 kemungkinan tetap aman puluhan tahun (entri 2018). 2: sumber NIST menyebut "banyak" sistem kunci publik, bukan semua; kunci simetris terdampak lebih kecil. 3: Shor mengancam sistem kunci publik yang bergantung pada faktorisasi (NIST: banyak sistem kunci publik; kaitan rincinya perlu sumber tambahan); Grover hanya memberi pengurangan kuadrat pada pencarian kunci simetris.

## Langkah berikutnya

Modul berikut: `e-xii2-m5` (etika, ekspektasi, dan karier). Bacaan pendamping: `e-xii1-m6` dan `e-xii1-m7`.
