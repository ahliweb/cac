## Untuk siapa modul ini

Modul ini untuk murid kelas XII jalur E (komputasi kuantum), minggu `E-XII1-M7` silabus v1.4: batas komputasi kuantum, yaitu membedakan klaim "lebih cepat" yang benar dan yang keliru, dengan keluaran tabel fakta dan mitos II. Prasyarat: modul `e-xii1-m6` (Fourier kuantum dan Shor, konsep). Di luar indeks, bagian kode (simulasi pembacaan) memerlukan dasar pemrograman setara `A-X1-M9..M12` (C++); guru memeriksanya. Bagian konsep dan penilaian klaim terbuka bagi semua murid. Alat: kertas, kalkulator, dan program kecil (tanpa akun).

Modul ini karangan penyusun dan disetujui pemilik program pada 2026-11-20 (keputusan lewat dialog; catatan tinjauan menjadi tindak lanjut revisi). Jalur E adalah pengayaan di luar rumusan CP; minggu ini tanpa irisan pengayaan, jadi modul ini tidak dihitung memenuhi butir CP mana pun.

Aturan AI jalur ini: AI generatif boleh dipakai dengan etika dan dicatat, tanpa data pribadi, kata sandi, atau tugas bernilai pada permintaanmu, dan tanpa akun wajib. Saran: jawab dulu sendiri, baru minta petunjuk bertahap; kode buatan AI kamu baca, jalankan, dan uji. Setiap soal `Latihan` bertanda `AI: boleh` atau `AI: tanpa AI`.

Catatan untuk guru: keunggulan kuadrat Grover dan perkiraan bahwa ia belum praktis dalam waktu dekat dibaca penyusun dari halaman IBM Quantum Learning "Introduction" pelajaran algoritma Grover, per 2026-11-19. Batas bahwa, relatif terhadap oracle acak, kelas NP tidak dapat diselesaikan mesin kuantum dalam waktu `o(2^(n/2))` dibaca dari ringkasan makalah Bennett, Bernstein, Brassard, dan Vazirani di arXiv (quant-ph/9701001), per 2026-11-19; itu hasil pada model oracle, bukan pernyataan tentang setiap masalah nyata. Pernyataan NIST bahwa komputer kuantum yang cukup besar mungkin masih bertahun-tahun atau puluhan tahun lagi dibaca dari halaman "Post-Quantum Cryptography", per 2026-11-19. Tiga klaim berita di Latihan karangan penyusun, bukan kutipan. Modul ini tidak membuat klaim lain tentang perangkat nyata.

## Ingat kembali

Jawab dari ingatan, baru cek di bagian kunci.

1. Bagian mana dari algoritma Shor yang kuantum, dan bagian mana yang klasik? (dari `e-xii1-m6`)
2. Mengapa terlalu banyak pengulangan Grover justru menurunkan peluang item bertanda? (dari `e-xii1-m4`)
3. Mengapa keunggulan satu query lawan `2^(n-1) + 1` query tidak berarti komputer kuantum lebih cepat untuk semua masalah? (dari `e-xi2-m13`)

## Tujuan

Setelah modul ini kamu dapat:

- menguji klaim "komputer kuantum lebih cepat" dengan tiga pertanyaan: masalah apa, dibanding apa, diukur dengan apa;
- membongkar gambaran "mencoba semua jawaban sekaligus" memakai simulasi pembacaan;
- menyusun tabel fakta dan mitos yang bersumber dan menilai tiga klaim berita.

Keluaran yang diminta silabus: tabel fakta dan mitos II.

## Prediksi dulu

Keadaan seragam `N = 1024` item (10 qubit) punya satu jawaban. Tebak dan tulis: (1) dari 1000 shot, berapa kali jawaban terbaca; (2) berapa kali bila lebih dulu dipasang 25 pengulangan Grover; (3) kira-kira berapa pengulangan Grover untuk `N = 2^40`, dan apakah itu berarti "seketika".

## Contoh terselesaikan

**Tiga pertanyaan penguji klaim.** (1) *Masalah apa?* Masalah khusus dengan janji atau oracle, atau "semua masalah"? (2) *Dibanding apa?* Algoritma klasik terbaik yang diketahui, atau yang paling naif? (3) *Diukur dengan apa?* Query, langkah hitung, atau waktu nyata, termasuk biaya membangun oracle dan memuat data?

**Mitos "mencoba semua jawaban sekaligus".** Superposisi menyimpan amplitudo untuk semua item, tetapi satu pembacaan memberi satu hasil acak (`e-xii1-m3`). Program di bawah menunjukkannya: dari keadaan seragam, 1000 shot memberi 650 hasil berbeda dan tidak satu pun membaca jawaban. Itu wajar: tiap shot mengenai jawaban dengan peluang 1/1024, jadi peluang 1000 shot tidak pernah mengenainya sekitar 0,376. Setelah 25 pengulangan Grover, 998 dari 1000 shot membaca jawaban. Yang membuat jawaban terbaca bukan "mencoba semua", melainkan interferensi yang menaikkan amplitudonya.

```cpp
#include <cmath>
#include <cstdint>
#include <cstdio>
#include <set>
#include <vector>

using Vektor = std::vector<double>;

const double PI = std::acos(-1.0);

uint32_t benih = 2026;  // benih tetap, hanya untuk simulasi

double acak01() {
    benih = 1664525u * benih + 1013904223u;
    return benih / 4294967296.0;
}

// Satu shot: satu hasil acak dengan peluang kuadrat amplitudo.
size_t baca(const Vektor& a) {
    double r = acak01(), kumulatif = 0.0;
    for (size_t i = 0; i < a.size(); i++) {
        kumulatif += a[i] * a[i];
        if (r < kumulatif) return i;
    }
    return a.size() - 1;
}

void balik_fase(Vektor& a, size_t m) { a[m] = -a[m]; }

void balik_rata(Vektor& a) {
    double jumlah = 0.0;
    for (double x : a) jumlah += x;
    double rata = jumlah / double(a.size());
    for (double& x : a) x = 2.0 * rata - x;
}

void ringkas(const char* nama, const Vektor& a, size_t jawaban, int shot) {
    int kena = 0;
    std::set<size_t> beda;
    for (int i = 0; i < shot; i++) {
        size_t hasil = baca(a);  // setiap shot menyiapkan ulang keadaan
        beda.insert(hasil);
        if (hasil == jawaban) kena++;
    }
    std::printf("%-26s %d shot: jawaban terbaca %d kali, %zu hasil berbeda\n", nama, shot, kena, beda.size());
}

int main() {
    const int n = 10;
    const size_t N = size_t(1) << n;
    const size_t jawaban = 700;

    Vektor seragam(N, 1.0 / std::sqrt(double(N)));
    ringkas("superposisi seragam", seragam, jawaban, 1000);

    Vektor a = seragam;
    for (int t = 0; t < 25; t++) {  // 25 pemanggilan oracle (lihat modul e-xii1-m5)
        balik_fase(a, jawaban);
        balik_rata(a);
    }
    ringkas("setelah 25 pengulangan", a, jawaban, 1000);

    std::printf("n   N                query klasik terburuk   pengulangan Grover (pi/4 * akar N)\n");
    for (int m : {10, 20, 30, 40}) {
        double banyak = std::pow(2.0, m);
        std::printf("%2d  %-16.0f %-22.0f  %.0f\n", m, banyak, banyak - 1.0, PI / 4.0 * std::sqrt(banyak));
    }
    return 0;
}
```

Keluaran asli (dikompilasi penyusun dengan `g++ -std=c++17 -Wall -Wextra`, lalu dijalankan):

```text
superposisi seragam        1000 shot: jawaban terbaca 0 kali, 650 hasil berbeda
setelah 25 pengulangan     1000 shot: jawaban terbaca 998 kali, 3 hasil berbeda
n   N                query klasik terburuk   pengulangan Grover (pi/4 * akar N)
10  1024             1023                    25
20  1048576          1048575                 804
30  1073741824       1073741823              25736
40  1099511627776    1099511627775           823550
```

Bacaan tabel kedua: pada `N = 2^40`, query klasik terburuk 1.099.511.627.775, sedangkan Grover sekitar 823.550 pengulangan, selisih sekitar satu juta kali. Itu kuadrat (`e-xii1-m5`). Namun satu pengulangan pada perangkat nyata jauh lebih mahal daripada satu langkah komputer biasa; sumber di atas memperkirakan keunggulan kuadrat ini tersapu oleh kecepatan komputer klasik untuk masalah yang dapat dijalankan dalam waktu dekat.

**Tabel fakta dan mitos II.**

| Klaim | Status | Alasan dan sumber |
| --- | --- | --- |
| "Komputer kuantum mencoba semua jawaban sekaligus." | Mitos | Satu bacaan memberi satu hasil acak; hanya interferensi yang menaikkan peluang jawaban (program di atas). |
| "Komputer kuantum lebih cepat untuk semua masalah." | Mitos | Keunggulan yang diketahui khusus: model query dengan janji (Deutsch-Jozsa, Bernstein-Vazirani), pencarian (kuadrat), dan faktorisasi (teori). |
| "Grover memberi percepatan kuadrat untuk pencarian tak terurut." | Fakta, dalam model oracle | Sekitar `akar N` lawan `N` pemanggilan oracle; belum praktis dalam waktu dekat (IBM Quantum Learning). |
| "Komputer kuantum dapat menyelesaikan semua masalah NP dengan cepat." | Mitos | Relatif terhadap oracle acak, NP tidak dapat diselesaikan dalam waktu `o(2^(n/2))` (Bennett dkk., arXiv quant-ph/9701001); hasil pada model oracle. |
| "Algoritma Shor sudah memecahkan sandi sungguhan." | Mitos | Memerlukan mesin berskala besar yang menurut NIST mungkin masih bertahun-tahun atau puluhan tahun lagi (per 2026-11-19). |

**Batasnya.** Tabel ini ringkas dan hanya memuat yang bersumber dari halaman yang dibuka penyusun per 2026-11-19; bidang ini berubah cepat, jadi periksa tanggal dan sumber sebelum menyebut sebuah klaim sebagai fakta.

## Contoh setengah jadi

Lengkapi (kunci di bagian akhir).

1. Untuk `N = 2^30`, pengulangan Grover kira-kira `(pi/4) x 2^15` = ____ (bulatkan).
2. Lengkapi:

```cpp setengah-jadi
size_t baca(const Vektor& a) {
    double r = acak01(), kumulatif = 0.0;
    for (size_t i = 0; i < a.size(); i++) {
        kumulatif += a[i] * ____;  // peluang = kuadrat amplitudo
        if (r < kumulatif) return i;
    }
    return a.size() - 1;
}
```

## Soal Parsons

Susun baris-baris di bawah (sudah diacak) menjadi isi fungsi `ringkas`. Kurung kurawal penutup sengaja dihilangkan.

```text
(a) std::set<size_t> beda;
(b)     beda.insert(hasil);
(c) int kena = 0;
(d)     if (hasil == jawaban) kena++;
(e) for (int i = 0; i < shot; i++) {
(f)     size_t hasil = baca(a);
```

## Latihan

1. **Hitung.** (`AI: tanpa AI`) Peluang satu shot dari keadaan seragam `N = 1024` membaca jawaban adalah `1/1024`. Hitung peluang 1000 shot tidak pernah membacanya, dan jelaskan mengapa "0 kali" pada keluaran bukan kejanggalan.
2. **Nilai tiga klaim.** (`AI: tanpa AI`) Dengan tiga pertanyaan penguji, nilai klaim karangan berikut. (a) "Chip kuantum baru memecahkan semua enkripsi dalam hitungan detik." (b) "Komputer kuantum menghitung semua kemungkinan sekaligus, sehingga rute terbaik ditemukan seketika." (c) "Dengan algoritma Grover, mencari satu item di antara satu triliun cukup sekitar sejuta langkah."
3. **Ubah program.** (`AI: boleh`) Ubah jumlah pengulangan menjadi 10 dan 40. Prediksi dulu peluangnya dengan rumus `e-xii1-m5`, lalu jalankan dan bandingkan jumlah shot yang mengenai jawaban.
4. **Rancang dulu.** (`AI: boleh`) Tulis daftar periksa lima butir untuk menilai artikel populer tentang komputasi kuantum, dengan tiga pertanyaan penguji di dalamnya.
5. **Catatan pemakaian AI (opsional).** Bila memakai asisten AI, catat alat, tujuan, garis besar perintah, bagian yang dipakai, dan cara memeriksanya.

## Latihan bercampur

1. Untuk `N = 2^20`, berapa pengulangan Grover dan query klasik terburuk, dan apa arti perbandingannya? (`e-xii1-m5`)
2. Pada algoritma Shor, hitungan klasik apa yang mudah dan apa yang sulit untuk `N` besar? (`e-xii1-m6`)

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `e-xii1-m8` (satu minggu lagi), `e-xii1-m10` (sekitar tiga minggu lagi), dan `e-xii2-m1` (sekitar delapan minggu lagi). Jawab sekarang lalu simpan.

1. Mengapa "komputer kuantum mencoba semua jawaban sekaligus" adalah gambaran yang menyesatkan?
2. Sebutkan tiga pertanyaan untuk menguji klaim berita bahwa komputer kuantum "lebih cepat".
3. Mengapa histogram 1000 shot dari peluang 0,5 tidak persis 500, dan berapa simpangan wajarnya?

## Kesalahan umum

- **"Kuantum selalu lebih cepat."** Keunggulan yang diketahui khusus untuk masalah dan model tertentu.
- **"Satu bacaan memberi semua jawaban."** Satu shot memberi satu hasil; histogram dari banyak shot memberi peluang.
- **"Batas oracle berarti kuantum tidak pernah menolong untuk NP."** Itu hasil pada model oracle; ia membatasi pencarian tak terstruktur, bukan setiap masalah nyata.
- **"Selisih satu juta kali berarti seketika."** Hitungan query mengabaikan biaya oracle, galat, dan kecepatan perangkat.

## Cek mandiri

- [ ] Saya dapat menyebut tiga pertanyaan penguji klaim "lebih cepat".
- [ ] Saya dapat menjelaskan mengapa superposisi bukan "mencoba semua sekaligus".
- [ ] Saya dapat membedakan keunggulan kuadrat dari keunggulan eksponensial.
- [ ] Saya dapat menunjuk sumber untuk setiap baris tabel fakta dan mitos.
- [ ] Saya mencatat pemakaian AI bila saya memakainya.

## Kunci dan petunjuk

**Ingat kembali.** 1: hampir semua klasik (pilih `a`, hitung `fpb`, olah `r`); hanya pencarian orde yang kuantum. 2: setelah titik terbaik amplitudo item bertanda berputar melewati puncak dan peluangnya menurun lagi (delapan item: 0,9453 lalu 0,3301). 3: itu hitungan jumlah query dalam model dengan oracle yang dianggap tersedia, hanya untuk masalah dengan janji tertentu, dan terhadap algoritma klasik pasti benar; klasik acak hampir selalu benar dengan sedikit query.

**Prediksi dulu.** (1) kira-kira 1 (harapan 0,98), bisa 0. (2) hampir semua, sekitar 999 (peluang 0,9995). (3) sekitar 823.550; tidak seketika, karena ratusan ribu pengulangan tetap diperlukan dan tiap pengulangan memanggil oracle.

**Contoh setengah jadi.** 1: `(pi/4) x 32768` = 25736 (keluaran program di `e-xii1-m5`: 25735,9). 2: `a[i]`. Kunci ini dikompilasi dan dijalankan penyusun (potongan itu ada di program di atas).

**Soal Parsons.** c, a, e, f, b, d.

**Latihan.** 1: `(1 - 1/1024)^1000` kira-kira `e^(-0,977)` = 0,376 (dihitung penyusun: 0,3764); jadi sekitar 38 persen dari percobaan semacam itu memang tidak mengenai jawaban sekalipun; harapan jumlah hasil berbeda `1024 x (1 - 0,376)` kira-kira 638, dekat 650. 2: (a) keliru atau berlebihan: masalahnya "semua enkripsi" terlalu luas, tidak ada pembanding, dan NIST menyebut mesin yang cukup besar mungkin masih bertahun-tahun atau puluhan tahun lagi; (b) mitos: bacaan memberi satu hasil, tidak ada "semua sekaligus"; (c) benar dalam model query: akar dari satu triliun sekitar satu juta (`(pi/4)` kali satu juta, sekitar 785 ribu); tetapi biaya oracle dan kecepatan perangkat tidak dihitung. 3: rumus `e-xii1-m5` untuk `N = 1024`: `t = 10` memberi 0,3724 dan `t = 40` memberi 0,3281; jumlah shot yang mengenai jawaban kira-kira 370 dan 330 dari 1000 (angka pasti bergantung pada benih; penyusun tidak menjalankan keduanya). 4: contoh butir: apa masalahnya; dibanding apa; diukur dengan apa; siapa sumbernya dan kapan; apakah ada klaim "semua" atau "seketika". 5: opsional.

**Latihan bercampur.** 1: 804 pengulangan lawan 1.048.575 query, kira-kira 1300 kali; selisih kuadrat dalam model oracle. 2: mudah: memilih `a`, `fpb`, dan mengolah `r` menjadi faktor; sulit: menemukan orde `r` untuk `N` besar.

**Ulang berjarak.** 1: satu bacaan hanya memberi satu hasil acak; amplitudo semua item ada, tetapi jawaban baru terbaca bila interferensi menaikkan peluangnya. 2: masalah apa; dibanding apa; diukur dengan apa. 3: shot acak; harapan `1000 x 0,5` = 500 dan simpangan wajar `akar(1000 x 0,5 x 0,5)` = 15,8, jadi selisih sekitar 16 masih wajar.

## Langkah berikutnya

Modul berikut: `e-xii1-m8` (derau dan dekoherensi). Bacaan pendamping: `e-xii1-m5` dan `e-xi2-m13`.
