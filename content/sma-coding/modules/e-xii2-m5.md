## Untuk siapa modul ini

Modul ini untuk murid kelas XII jalur E (komputasi kuantum), minggu `E-XII2-M5` silabus v1.4: etika, ekspektasi, dan karier, yaitu membedakan harapan realistis dari hype, dengan keluaran refleksi. Prasyarat: modul `e-xii2-m4`; modul `e-xii1-m11` (peran cloud quantum) belum terindeks, jadi guru memeriksanya. Di luar indeks, bagian kode memerlukan dasar pemrograman setara `A-X1-M9..M12` (C++); bagian konsep terbuka bagi semua murid. Alat: kertas, kalkulator, dan program C++ kecil di bawah.

Modul ini karangan penyusun dan disetujui pemilik program pada 2026-11-20 (keputusan lewat dialog; catatan tinjauan menjadi tindak lanjut revisi). Jalur E adalah pengayaan di luar rumusan CP; minggu ini tanpa irisan pengayaan, jadi modul ini tidak dihitung memenuhi butir CP mana pun.

Aturan AI jalur ini: AI generatif boleh dipakai dengan etika dan dicatat, tanpa data pribadi, kata sandi, atau tugas bernilai pada permintaanmu, dan tanpa akun wajib. Saran: jawab dulu sendiri, baru minta petunjuk bertahap; kode buatan AI kamu baca, jalankan, dan uji. Setiap soal `Latihan` bertanda `AI: boleh` atau `AI: tanpa AI`.

Catatan untuk guru: penilaian "realistis" dibaca dari ringkasan makalah Preskill, "Quantum Computing in the NISQ era and beyond" (arXiv:1801.00862), dari halaman proyek dan FAQ NIST tentang kriptografi pasca-kuantum, dan dari ringkasan Bennett dkk. tentang kekuatan dan kelemahan komputasi kuantum (arXiv:quant-ph/9701001), semuanya per tanggal akses 2026-11-19. Artikel yang dianalisis di modul ini **karangan penyusun**: perusahaan, majalah, dan angkanya fiktif. Modul ini sengaja tidak memuat angka lowongan, gaji, atau jumlah pekerjaan, karena penyusun tidak membaca sumber untuk itu; bagian karier hanya berisi pertanyaan untuk murid dan guru.

## Ingat kembali

Jawab dari ingatan, baru cek di bagian kunci.

1. Apa yang dikatakan NIST tentang Grover dan AES-128, dan apa dua alasan yang disebut? (dari `e-xii2-m4`)
2. Apa yang dilakukan mitigasi derau, dan apa yang tidak dilakukannya? (dari `e-xii2-m2`)
3. Mengapa sekolah tidak membuat akun cloud quantum untuk murid, dan apa yang tidak boleh ada pada label pekerjaan? (dari `e-xii1-m11`)

## Tujuan

Setelah modul ini kamu dapat:

- menguji klaim populer tentang komputasi kuantum dengan pertanyaan yang sama setiap kali;
- menghitung dengan model sederhana mengapa percepatan kuadrat belum tentu lebih murah;
- menulis refleksi tentang etika pelaporan, privasi, dan kejujuran terhadap batas hasilmu sendiri;
- menyusun pertanyaan karier yang bersumber, bukan angka tak bersumber.

Keluaran yang diminta silabus: refleksi.

## Prediksi dulu

Anggap satu langkah kuantum `c = 10^6` kali lebih mahal daripada satu langkah klasik (pengandaian, bukan data perangkat). Pencarian klasik di ruang `N` kunci memakai kira-kira `N/2` langkah; Grover memakai kira-kira `(pi/4) x akar(N)` langkah, masing-masing `c` kali lebih mahal. Tebak dan tulis: (1) pada 40 bit apakah Grover lebih murah; (2) pada 100 bit apakah Grover lebih murah, dan kira-kira berapa kali.

## Contoh terselesaikan

**Dua pagar.** Preskill menulis bahwa mesin 50 sampai 100 qubit mungkin dapat melakukan tugas yang melampaui komputer klasik, tetapi derau gerbang membatasi ukuran sirkuit yang dapat dijalankan andal, dan mesin 100 qubit "tidak akan segera mengubah dunia". NIST menyebut mesin kuantum besar mungkin masih bertahun-tahun atau puluhan tahun lagi, tetapi tetap meminta organisasi mulai bersiap. Kedua kalimat itu realistis sekaligus tidak meremehkan: harapan yang baik tidak berarti "tidak ada apa-apa" dan tidak berarti "segera mengubah segalanya".

**Tiga pertanyaan uji klaim.** (1) Dibandingkan dengan apa: algoritma klasik terbaik, atau hanya yang paling lambat? (2) Pada ukuran dan waktu nyata mana: apakah biaya tiap langkah, derau, dan koreksinya sudah dihitung? (3) Apa sumber primernya, tanggalnya, dan apakah hasilnya dari perangkat nyata atau simulasi, dengan berapa shot dan selang (`e-xii2-m1`)?

**Hitungan impas.** Percepatan kuadrat tidak otomatis lebih murah bila tiap langkah kuantum mahal. Impas terjadi saat `N/2 = c x (pi/4) x akar(N)`, yaitu `akar(N) = c x pi / 2`.

```cpp
#include <cmath>
#include <cstdio>
#include <initializer_list>

// Pengandaian (bukan data perangkat): satu langkah kuantum c kali lebih mahal daripada
// satu langkah klasik. Klasik: N/2 langkah. Grover: (pi/4) * akar(N) langkah, masing-masing c.
// Impas terjadi bila N/2 = c * (pi/4) * akar(N), yaitu akar(N) = c * pi / 2.
int main() {
    const double PI = std::acos(-1.0);
    std::printf("c (mahalnya satu langkah kuantum)   N impas (bit)   n = 40: klasik/kuantum   n = 100: klasik/kuantum\n");
    for (double c : {1.0, 1e3, 1e6, 1e9}) {
        double bit_impas = 2.0 * std::log2(c * PI / 2.0);
        double rasio40 = std::pow(2.0, 39.0) / (c * (PI / 4.0) * std::pow(2.0, 20.0));
        double rasio100 = std::pow(2.0, 99.0) / (c * (PI / 4.0) * std::pow(2.0, 50.0));
        std::printf("%-35.0e %8.1f        %14.3g          %14.3g\n", c, bit_impas, rasio40, rasio100);
    }
    return 0;
}
```

Keluaran asli (dikompilasi penyusun dengan `g++ -std=c++17 -Wall -Wextra`, lalu dijalankan):

```text
c (mahalnya satu langkah kuantum)   N impas (bit)   n = 40: klasik/kuantum   n = 100: klasik/kuantum
1e+00                                    1.3              6.68e+05                7.17e+14
1e+03                                   21.2                   668                7.17e+11
1e+06                                   41.2                 0.668                7.17e+08
1e+09                                   61.1              0.000668                7.17e+05
```

Bacaan hasilnya. Pada `c = 10^6`, impas sekitar 41 bit: pada 40 bit Grover justru kira-kira satu setengah kali lebih mahal (rasio klasik per kuantum 0,668), pada 100 bit ia sekitar `7 x 10^8` kali lebih murah. Pada `c = 10^9`, impasnya sekitar 61 bit. Jadi pertanyaan "berapa ukuran masalahnya" menentukan jawaban, dan keunggulan kuadrat bukan "lebih cepat untuk semua". Model ini hanya mengandaikan satu mesin dan satu perangkat tanpa derau dan tanpa koreksi; angka `c` adalah pengandaian. Ringkasan Bennett dkk. memberi alasan teoretis mengapa pencarian tak terstruktur tidak diharapkan lebih baik daripada kira-kira `akar(N)` langkah pada oracle acak.

**Artikel karangan untuk dianalisis.** "Majalah Contoh" (fiktif) memuat: *"Perusahaan Contoh Q mengumumkan chip kuantum 1000 qubit yang bebas derau. Karena komputer kuantum mencoba semua jawaban sekaligus, ia sudah ribuan kali lebih cepat untuk segala hal, dan semua enkripsi akan runtuh tahun depan. Hasilnya terbukti pada satu percobaan."* Untuk tiap kalimat: tandai tanda hype, tulis pertanyaan uji yang gagal dijawab, dan tulis versi yang bersumber.

**Etika.** Etika di jalur ini hampir semuanya soal kejujuran dan kehati-hatian: melabeli hasil simulator sebagai simulator dan hasil perangkat sebagai perangkat, menyebut batas klaim, tidak menaruh nama murid atau kontak pada label pekerjaan cloud (`e-xii1-m12`), dan tidak mengajari orang memecahkan sistem nyata (`e-xii2-m4`).

## Contoh setengah jadi

Lengkapi (kunci di bagian akhir).

1. Untuk `c = 10^6`: `2 x log2(10^6 x pi / 2)` = ____ bit (satu desimal).
2. Lengkapi:

```cpp setengah-jadi
double bit_impas = 2.0 * std::log2(c * PI / ____);
```

## Soal Parsons

Susun baris-baris di bawah (sudah diacak) menjadi versi pendek dari bagian dalam program.

```text
(a)     for (double c : {1.0, 1e3, 1e6, 1e9}) {
(b)         double bit_impas = 2.0 * std::log2(c * PI / 2.0);
(c)         std::printf("%-35.0e %8.1f\n", c, bit_impas);
(d)     }
```

## Latihan

1. **Hitung.** (`AI: tanpa AI`) Hitung dengan tangan bit impas untuk `c = 10^3`.
2. **Ubah data.** (`AI: boleh`) Tambahkan `c = 10^4`. Prediksi dulu bit impas, lalu jalankan.
3. **Analisis artikel.** (`AI: tanpa AI`) Kerjakan analisis artikel karangan di atas: untuk tiap kalimat, tanda hype, pertanyaan uji yang gagal, dan versi bersumber.
4. **Refleksi.** (`AI: boleh`) Tulis satu paragraf: bagaimana kamu melaporkan hasil demonstrasi (simulator atau perangkat) kepada teman yang bukan murid jalur E tanpa melebih-lebihkan? Tulis juga dua pertanyaan karier yang ingin kamu tanyakan kepada guru, dengan sumber yang akan kamu cari.
5. **Catatan pemakaian AI (opsional).** Bila memakai asisten AI, catat alat, tujuan, garis besar perintah, bagian yang dipakai, dan cara memeriksanya. Refleksi pada soal 4 kamu tulis sendiri.

## Latihan bercampur

1. Berapa shot minimal agar setengah lebar selang 95 persen untuk `p` sekitar 0,5 paling besar 0,01? (`e-xii2-m1`)
2. Untuk kunci 128 bit, berapa `log2` iterasi Grover satu perangkat menurut model `e-xii2-m4`? (`e-xii2-m4`)

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `e-xii2-m6` (satu minggu lagi), `e-xii2-m8` (sekitar tiga minggu lagi), dan `e-xii2-m13` (sekitar delapan minggu lagi). Jawab sekarang lalu simpan.

1. Pada `c = 10^6`, pada ukuran ruang kunci berapa bit pencarian Grover mulai lebih murah daripada klasik?
2. Mengapa hasil yang cocok dengan perhitungan tangan lebih meyakinkan daripada hasil yang cocok dengan program yang sama?
3. Beri dua contoh tanda hype dalam artikel populer tentang komputasi kuantum.

## Kesalahan umum

- **"Percepatan kuadrat berarti lebih cepat untuk semua ukuran."** Biaya per langkah membuat impas pada ukuran tertentu.
- **"Pengandaian `c` di modul ini adalah data perangkat."** Itu pengandaian untuk melatih penalaran.
- **"Skeptis berarti menolak semuanya."** Skeptis berarti meminta sumber, pembanding, dan batas; sumber NIST sendiri meminta persiapan.
- **"Artikel karangan di modul ini melaporkan kejadian nyata."** Perusahaan, majalah, dan angkanya fiktif.
- **"Etika hanya urusan aturan sekolah."** Kejujuran melabeli hasil dan menjaga data pekerjaan adalah kebiasaan, bukan hanya aturan.

## Cek mandiri

- [ ] Saya dapat menyebut tiga pertanyaan untuk menguji klaim populer.
- [ ] Saya dapat menjelaskan mengapa percepatan kuadrat belum tentu lebih murah.
- [ ] Saya dapat menandai tanda hype pada sebuah artikel.
- [ ] Saya dapat menulis refleksi tentang kejujuran pelaporan.
- [ ] Saya mencatat pemakaian AI bila saya memakainya.

## Kunci dan petunjuk

**Ingat kembali.** 1: Grover memberi pengurangan langkah kuadrat, tetapi perangkat kuantum kemungkinan lebih mahal dan percepatan penuh menuntut langkah berurutan (Zalka 1997); AES-128 kemungkinan tetap aman puluhan tahun (entri 2018). 2: memperbaiki perkiraan nilai harap lewat percobaan tambahan dan pengolahan hasil; tidak membuat gerbang lebih baik dan bukan koreksi kesalahan. 3: akun dan data pekerjaan berada pada penyedia dengan ketentuan layanan dan batas usia; label pekerjaan harus sintetis, tanpa nama murid, nama sekolah, kontak, atau token (menurut `e-xii1-m11` dan `e-xii1-m12`).

**Prediksi dulu.** (1) tidak; kira-kira 1,5 kali lebih mahal. (2) ya; kira-kira `7 x 10^8` kali lebih murah.

**Contoh setengah jadi.** 1: `2 x 20,58` = 41,2. 2: `2.0`. Kunci ini dikompilasi penyusun (potongan itu ada di program di atas).

**Soal Parsons.** a, b, c, d.

**Latihan.** 1: `c x pi / 2` = `1000 x 1,5708` = 1570,8; `log2(1570,8)` = 10,62; dikali 2 = 21,2 bit. 2: `10000 x 1,5708` = 15708; `log2` = 13,94; dikali 2 = 27,9 bit (keluaran varian program dengan `1e4` memberi 27,9). 3: contoh jawaban. Kalimat 1: "bebas derau" tidak bersumber; versi bersumber: "perusahaan melaporkan chip dengan sekian qubit dan tingkat kesalahan gerbang sekian (sumber, tanggal)". Kalimat 2: "mencoba semua jawaban sekaligus" adalah gambaran yang menyesatkan; "ribuan kali lebih cepat untuk segala hal" gagal pertanyaan 1 dan 2; "semua enkripsi akan runtuh tahun depan" terlalu luas dan tidak bersumber (NIST menyebut mesin seperti itu mungkin masih bertahun-tahun atau puluhan tahun lagi). Kalimat 3: "terbukti pada satu percobaan" gagal pertanyaan 3: satu percobaan tanpa shot, selang, dan pembanding bukan bukti. 4: jawaban pribadi; kriteria: menyebut sumber data (simulator atau perangkat), jumlah shot dan selang, serta batas klaim; pertanyaan karier disertai sumber yang akan dicari. 5: opsional.

**Latihan bercampur.** 1: `n = z^2 x p (1 - p) / h^2` = `1,96^2 x 0,25 / 0,01^2` = 9604. 2: `log2(pi/4) + 64` = 63,7.

**Ulang berjarak.** 1: sekitar 41 bit pada model `c = 10^6` (`2 x log2(c x pi / 2)`). 2: hasil yang cocok dengan program yang sama hanya menunjukkan program konsisten dengan dirinya; hitungan tangan adalah pembanding independen. 3: contoh: "bebas derau", "mencoba semua jawaban sekaligus", "lebih cepat untuk segala hal", "semua enkripsi runtuh", dan "terbukti" tanpa data.

## Langkah berikutnya

Modul berikut: `e-xii2-m6` (proyek akhir: rancangan). Bacaan pendamping: `e-xii1-m7` dan `e-xii2-m4`.
