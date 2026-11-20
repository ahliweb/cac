## Untuk siapa modul ini

Modul ini untuk murid kelas XII jalur E (komputasi kuantum), minggu `E-XII1-M13` silabus v1.4: proyek mini semester 1, yaitu membandingkan simulator dan hasil perangkat, dikerjakan berkelompok dengan keluaran laporan; kelompok memilih topiknya. Prasyarat: modul `e-xii1-m12`; sesuai topik, modul `e-xii1-m8` (derau), `e-xii1-m10` (Grover), dan simulatormu (C++17 atau TypeScript dengan Bun). Di luar indeks, bagian kode memerlukan dasar pemrograman setara `A-X1-M9..M12` (C++). Hasil perangkat hanya berasal dari demonstrasi guru (`e-xii1-m12`) atau arsip sintetis; **tanpa akun murid, tanpa token**. Alat: kertas, kalkulator, dan program C++ di bawah.

Modul ini karangan penyusun dan disetujui pemilik program pada 2026-11-20 (keputusan lewat dialog; catatan tinjauan menjadi tindak lanjut revisi). Jalur E adalah pengayaan di luar rumusan CP; minggu ini tanpa irisan pengayaan, jadi modul ini tidak dihitung memenuhi butir CP mana pun. Jangan menaruh nama lengkap, foto, atau suara murid pada laporan; pakai nama peran.

Aturan AI jalur ini: AI generatif boleh dipakai dengan etika dan dicatat, tanpa data pribadi, kata sandi, atau tugas bernilai pada permintaanmu, dan tanpa akun wajib. Saran: tulis rencana dan prediksimu dulu, baru minta petunjuk bertahap; kode buatan AI kamu baca, jalankan, dan uji. Catat pemakaian AI pada Daftar periksa.

## Ingat kembali

Jawab dari ingatan, baru cek di bagian kunci.

1. Mengapa percepatan kuadrat dari Grover bukan percepatan eksponensial? (dari `e-xii1-m5`)
2. Mengapa hasil `01` dan `10` muncul pada perangkat nyata tetapi tidak pada simulator ideal? (dari `e-xii1-m12`)
3. Pada kode Grover Qiskit, bagian mana oracle dan bagian mana pembalikan terhadap rata-rata? (dari `e-xii1-m10`)

## Tujuan

Setelah modul ini kamu dapat:

- menulis rencana perbandingan dengan pertanyaan, prediksi sebelum menjalankan, dan kriteria selesai;
- mengukur jarak antara histogram simulator dan histogram perangkat atau arsip dengan tiga pemeriksaan;
- menyusun laporan yang menyatakan batas klaim dengan jujur.

Keluaran yang diminta silabus: laporan.

## Rencana proyek

Pilih satu topik: (A) cocokkan model derau Bell dengan histogram hasil demonstrasi atau arsip `e-xii1-m12`; (B) bandingkan Grover `N = 8` ideal, Grover berderau di simulatormu, dan peluang dari Qiskit lokal (`e-xii1-m10`); (C) kurva H, tunggu, H terhadap waktu tunggu (`e-xii1-m8`). Sebelum menulis kode, tulis: pertanyaan, prediksi angka, cara memeriksa, kriteria selesai, peran, dan batas klaim. Contoh rencana topik A (satu halaman):

- **Pertanyaan.** Berapa kesalahan baca `r` yang paling cocok dengan arsip, bila kesalahan gerbang dianggap `p = 0,003`?
- **Prediksi (ditulis sebelum menjalankan).** Bagian hasil terlarang arsip 0,048, sedangkan model memberi sekitar `2r(1 - r)`; maka `r` sekitar 0,025.
- **Cara.** Hitung jarak variasi total antara histogram arsip dan peluang model untuk `r` dari 0 sampai 0,050 dengan langkah 0,001; ambil yang terkecil.
- **Pemeriksaan.** Peluang model berjumlah 1; tanpa derau jaraknya sama dengan bagian hasil terlarang; jarak terbaik tidak lebih kecil daripada yang wajar akibat shot terbatas.
- **Kriteria selesai.** Ketiga pemeriksaan lolos dan laporan memuat tabel prediksi lawan hasil serta keluaran asli.
- **Peran.** Peran A kode, Peran B hitungan tangan, Peran C laporan; bergantian meninjau.
- **Batas klaim.** Arsip sintetis dibangkitkan dari model yang sama, jadi kecocokannya melingkar dan tidak membuktikan apa pun tentang perangkat nyata; model dua parameter jauh lebih sederhana daripada derau nyata; satu demonstrasi bukan ukuran perangkat.

```cpp
#include <cmath>
#include <cstdio>

// Peluang [00, 01, 10, 11] untuk Bell: kesalahan gerbang (peluang p, separuhnya membalik satu bit)
// dan kesalahan baca (r per bit). Model sederhana, sama dengan e-xii1-m12.
void model(double p, double r, double hasil[4]) {
    double ideal[4] = {0.5, 0.0, 0.0, 0.5};
    double salah[4] = {0.0, 0.5, 0.5, 0.0};
    double a[4];
    for (int i = 0; i < 4; i++) a[i] = (1.0 - p / 2.0) * ideal[i] + (p / 2.0) * salah[i];
    for (int o = 0; o < 4; o++) {
        hasil[o] = 0.0;
        for (int i = 0; i < 4; i++) {
            int beda = o ^ i;
            int bit_beda = (beda & 1) + ((beda >> 1) & 1);
            hasil[o] += a[i] * std::pow(r, bit_beda) * std::pow(1.0 - r, 2 - bit_beda);
        }
    }
}

double jarak(const double a[4], const double b[4]) {  // jarak variasi total
    double s = 0.0;
    for (int i = 0; i < 4; i++) s += 0.5 * std::fabs(a[i] - b[i]);
    return s;
}

int main() {
    const int arsip[4] = {1926, 106, 86, 1882};  // arsip sintetis kelas-demo-01 (bukan perangkat nyata)
    const int shot = 4000;
    double frak[4];
    for (int i = 0; i < 4; i++) frak[i] = arsip[i] / double(shot);

    double tanpa[4];
    model(0.0, 0.0, tanpa);
    std::printf("tanpa derau: jarak ke arsip = %.4f\n", jarak(tanpa, frak));

    double terbaik = 1.0, r_terbaik = 0.0;
    for (int langkah = 0; langkah <= 50; langkah++) {
        double r = langkah / 1000.0;
        double m[4];
        model(0.003, r, m);
        double j = jarak(m, frak);
        if (j < terbaik) {
            terbaik = j;
            r_terbaik = r;
        }
    }
    std::printf("p = 0.003, r terbaik = %.3f, jarak ke arsip = %.4f\n", r_terbaik, terbaik);

    // Jarak yang timbul hanya karena jumlah shot terbatas: simpangan mutlak rata-rata
    // sebuah hasil kira-kira akar(2 / pi) x akar(p (1 - p) / shot).
    double m[4];
    model(0.003, r_terbaik, m);
    double acak = 0.0;
    const double PI = std::acos(-1.0);
    for (int i = 0; i < 4; i++) acak += 0.5 * std::sqrt(2.0 / PI) * std::sqrt(m[i] * (1.0 - m[i]) / shot);
    std::printf("jarak yang timbul hanya karena shot terbatas kira-kira %.4f\n", acak);
    return 0;
}
```

Keluaran asli (dikompilasi penyusun dengan `g++ -std=c++17 -Wall -Wextra`, lalu dijalankan):

```text
tanpa derau: jarak ke arsip = 0.0480
p = 0.003, r terbaik = 0.022, jarak ke arsip = 0.0080
jarak yang timbul hanya karena shot terbatas kira-kira 0.0082
```

Bacaan: tanpa derau jaraknya 0,048; model dengan `r = 0,022` menurunkannya menjadi 0,008, yang sebanding dengan jarak akibat shot terbatas (0,0082), jadi sisa selisih wajar sebagai acak. Prediksi `r` sekitar 0,025 lebih besar daripada hasil 0,022, karena prediksi mengabaikan pembagian antara `00` dan `11`. Karena arsip dibangkitkan dengan `r = 0,0234`, hasil 0,022 hanya menunjukkan program menemukan kembali parameter yang ditanam.

## Daftar periksa

- [ ] Rencana tertulis, dan prediksi angka dicatat sebelum program dijalankan.
- [ ] Pemeriksaan 1: peluang model berjumlah 1.
- [ ] Pemeriksaan 2: tanpa derau, jarak sama dengan bagian hasil terlarang histogram.
- [ ] Pemeriksaan 3: jarak terbaik dibandingkan dengan jarak akibat shot terbatas; bila jauh lebih besar, cari penyebabnya, jangan menambah parameter sampai pas.
- [ ] Uji gagal: sengaja ubah satu baris (misalnya hapus kesalahan baca) dan pastikan pemeriksaan menangkapnya.
- [ ] Log pemakaian AI bila dipakai: alat, tujuan, garis besar perintah, bagian yang dipakai, dan cara memeriksanya.
- [ ] Privasi dan keselamatan data: tanpa nama murid, token, CRN, atau nama akun; label pekerjaan sintetis.
- [ ] Laporan memuat batas klaim: sumber histogram (nyata atau sintetis), tanggal, jumlah shot, tanpa klaim kecepatan atau keunggulan kuantum.
- [ ] Sumber yang dipakai ditautkan, tanpa menyalin teks halamannya.

## Umpan balik sejawat

Tukar laporan dengan kelompok lain dan beri ulasan: satu yang sudah baik, satu yang perlu diperbaiki, satu langkah berikutnya. Periksa apakah prediksi ditulis sebelum hasil, apakah angka laporan sama dengan keluaran program, dan apakah batas klaim jujur tentang sumber data. Nilai karyanya, bukan orangnya.

## Latihan bercampur

1. Histogram 1000 shot: `00` = 470, `01` = 28, `10` = 24, `11` = 478. Hitung jarak variasi total terhadap simulator ideal, bagian hasil terlarang, dan `z` untuk `00`. (`e-xii1-m12`)
2. Untuk Grover `N = 16`, pengulangan `t` mana yang terbaik dan berapa peluangnya? (`e-xii1-m10`)

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `e-xii1-m14` (satu minggu lagi), `e-xii2-m2` (sekitar tiga minggu lagi), dan `e-xii2-m7` (sekitar delapan minggu lagi). Jawab sekarang lalu simpan.

1. Apa tiga pemeriksaan sebelum menyimpulkan bahwa model derau cocok dengan sebuah histogram?
2. Mengapa kecocokan model dengan arsip yang dibangkitkan dari model yang sama tidak membuktikan apa pun tentang perangkat nyata?
3. Sebutkan batas klaim yang harus ada pada laporan perbandingan simulator dan perangkat.

## Kesalahan umum

- **"Jarak terkecil berarti model benar."** Ia hanya yang paling cocok dengan data itu; pada arsip sintetis kecocokannya melingkar.
- **"Jarak dapat dibuat nol."** Shot terbatas memberi jarak minimum sekitar 0,008 pada contoh ini.
- **"Dua parameter menjelaskan semua derau perangkat."** Model hanya pendekatan kasar.
- **"Satu demonstrasi mengukur kualitas perangkat."** Ia satu pekerjaan pada satu waktu.

## Cek mandiri

- [ ] Saya menulis rencana dan prediksi sebelum menjalankan program.
- [ ] Saya menjalankan tiga pemeriksaan dan satu uji gagal.
- [ ] Laporan saya menyatakan sumber data dan batas klaim.
- [ ] Saya memberi dan menerima umpan balik sejawat.
- [ ] Saya mencatat pemakaian AI bila saya memakainya.

## Kunci dan petunjuk

**Ingat kembali.** 1: percepatan kuadrat mengubah `N = 2^n` menjadi `akar N = 2^(n/2)`, yang tetap eksponensial dalam `n` (hanya eksponennya setengah). 2: ada derau gerbang, derau baca, dan dekoherensi pada perangkat nyata; simulator ideal tidak memodelkannya. 3: oracle: `x(0)`, `ccz`, `x(0)`; pembalikan rata-rata: `h`, `x` semua, `ccz`, `x` semua, `h`.

**Rencana proyek.** Tidak ada satu jawaban benar. Rencana yang baik memuat pertanyaan yang dapat diuji, prediksi angka sebelum menjalankan, kriteria selesai, dan batas klaim. Hitungan prediksi: `2r(1 - r) = 0,048` memberi `r` sekitar 0,0246; keluaran asli 0,022. Uji gagal: tanpa kesalahan baca (`r = 0`), model tidak dapat menghasilkan hasil terlarang lebih dari sekitar 0,0015, jadi jarak ke arsip tetap sekitar 0,047; pemeriksaan 3 menangkap hal itu.

**Daftar periksa.** Jarak akibat shot terbatas dihitung program; jarak terbaik 0,0080 sebanding dengan 0,0082.

**Umpan balik sejawat.** Contoh baik: "Prediksi ditulis lebih dulu dan batas klaim menyebut arsip sintetis." Perlu diperbaiki: "Laporan belum menyebut jumlah shot." Langkah berikutnya: "Tambahkan uji gagal."

**Latihan bercampur.** 1: jarak `0,5 x (0,03 + 0,028 + 0,024 + 0,022)` = 0,052; hasil terlarang `(28 + 24) / 1000` = 0,052; `z` untuk `00`: `(470 - 500) / akar(250)` = -1,90. 2: `theta = asin(1/4)`; `t = 1`: 0,4727; `t = 2`: 0,9084; `t = 3`: 0,9613; `t = 4`: 0,5817; terbaik `t = 3` dengan peluang 0,9613 (hitungan penyusun dengan program kecil).

**Ulang berjarak.** 1: peluang model berjumlah 1; tanpa derau jarak sama dengan bagian hasil terlarang; jarak terbaik dibandingkan dengan jarak akibat shot terbatas. 2: model menghasilkan arsipnya sendiri, jadi menemukan parameternya kembali tidak menguji dunia nyata. 3: sumber histogram (nyata atau sintetis), tanggal, jumlah shot, model yang disederhanakan, tanpa klaim keunggulan atau kecepatan, dan tanpa data pribadi.

## Langkah berikutnya

Modul berikut: `e-xii1-m14` (asesmen dan refleksi semester 1). Bacaan pendamping: `e-xii1-m12` dan `e-xii1-m8`.
