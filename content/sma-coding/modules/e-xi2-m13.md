## Untuk siapa modul ini

Modul ini untuk murid kelas XI jalur E (komputasi kuantum), minggu `E-XI2-M13` silabus v1.4: proyek mini semester 2, yaitu menyajikan satu fenomena (Bell, teleportasi, atau Deutsch-Jozsa) lewat simulasi dan poster, dikerjakan berkelompok. Prasyarat: modul `e-xi2-m12`; modul `e-xi2-m2`, `e-xi2-m7`, dan `e-xi2-m4` (simulator n qubit) sesuai fenomena yang kamu pilih. Alat: kertas, kalkulator, simulatormu dari `e-xi2-m4` (C++17 atau TypeScript dengan Bun; tanpa akun).

Modul ini karangan penyusun dan disetujui pemilik program pada 2026-11-20 (keputusan lewat dialog; catatan tinjauan menjadi tindak lanjut revisi). Jalur E adalah pengayaan di luar rumusan CP; minggu ini tanpa irisan pengayaan, jadi modul ini tidak dihitung memenuhi butir CP mana pun. Jangan menaruh nama lengkap, foto, atau suara murid pada poster atau berkas; pakai nama peran.

Aturan AI jalur ini: AI generatif boleh dipakai dengan etika dan dicatat, tanpa data pribadi, kata sandi, atau tugas bernilai pada permintaanmu, dan tanpa akun wajib. Saran: tulis rencana dan prediksimu dulu, baru minta petunjuk bertahap; kode buatan AI kamu baca, jalankan, dan uji. Catat pemakaian AI pada Daftar periksa.

## Ingat kembali

Jawab dari ingatan, baru cek di bagian kunci.

1. Berapa fungsi Boolean dari 2 bit ke 1 bit, dan berapa yang konstan, seimbang, dan bukan keduanya? (dari `e-xi2-m10`)
2. Apa janji (promise) pada masalah Deutsch-Jozsa, dan apa yang terjadi bila fungsinya bukan konstan maupun seimbang? (dari `e-xi2-m12`)
3. Apa beda fase global dan fase relatif, dan mana yang mengubah peluang? (dari `e-xi2-m5`)

## Tujuan

Setelah modul ini kamu dapat:

- menulis rencana proyek dengan pertanyaan, prediksi sebelum menjalankan, dan kriteria selesai;
- menguji simulasimu dengan tiga pemeriksaan sebelum mempercayai hasilnya;
- menyusun poster yang menyatakan batas klaim dengan jujur.

Keluaran yang diminta silabus: simulasi dan poster.

## Rencana proyek

Pilih satu fenomena: keadaan Bell (`e-xi2-m2`, `e-xi2-m3`), teleportasi (`e-xi2-m7`), atau Deutsch-Jozsa (`e-xi2-m12`). Sebelum menulis kode, tulis: pertanyaan, prediksi angka, cara memeriksa, kriteria selesai, pembagian peran, dan batas klaim. Contoh rencana untuk Bell (satu halaman):

- **Pertanyaan.** Seberapa sering dua qubit terjerat terbaca sama, dan apakah hasil `01` dan `10` pernah muncul?
- **Prediksi (ditulis sebelum menjalankan).** `P(00) = P(11) = 0,5`; `01` dan `10` tidak pernah. Pada 1000 shot, harapan 500 untuk `00`, simpangan wajar 15,8, sehingga tiga simpangan kira-kira 47.
- **Cara.** Simulator: H pada qubit 0, lalu CNOT 0 ke 1; baca 1000 shot dengan benih tetap.
- **Pemeriksaan.** Jumlah kuadrat 1; vektor sama dengan hitungan tangan; hasil shot dalam tiga simpangan.
- **Kriteria selesai.** Ketiga pemeriksaan lolos, dan poster memuat sirkuit, tabel prediksi lawan hasil, serta keluaran asli.
- **Peran.** Peran A kode, Peran B hitungan tangan, Peran C poster; bergantian meninjau.
- **Batas klaim.** Simulasi di komputer klasik, bukan perangkat nyata; tidak ada klaim komunikasi atau kecepatan; dua amplop bit acak juga memberi "selalu sama" (`e-xi2-m3`, `e-xi2-m8`).

Teleportasi: prediksi keempat hasil Alice masing-masing 0,25 dan keadaan Bob sesudah koreksi sama dengan yang dikirim. Deutsch-Jozsa: prediksi `P(000)` 1 untuk konstan dan 0 untuk seimbang, serta apa yang terjadi di luar janji.

```cpp
#include <cmath>
#include <cstdint>
#include <cstdio>
#include <vector>

using Vektor = std::vector<double>;

const double H1 = 1.0 / std::sqrt(2.0);
const int N = 2;

uint32_t benih = 2026;  // benih tetap, hanya untuk simulasi

double acak01() {
    benih = 1664525u * benih + 1013904223u;
    return benih / 4294967296.0;
}

void gerbang_h(Vektor& v, int k) {
    int geser = N - 1 - k;
    for (size_t i = 0; i < v.size(); i++) {
        if (((i >> geser) & 1) == 0) {
            size_t j = i | (size_t(1) << geser);
            double a = v[i], b = v[j];
            v[i] = H1 * (a + b);
            v[j] = H1 * (a - b);
        }
    }
}

void cnot(Vektor& v, int kontrol, int target) {
    int gk = N - 1 - kontrol, gt = N - 1 - target;
    for (size_t i = 0; i < v.size(); i++) {
        if (((i >> gk) & 1) == 1 && ((i >> gt) & 1) == 0) {
            size_t j = i | (size_t(1) << gt);
            double tmp = v[i];
            v[i] = v[j];
            v[j] = tmp;
        }
    }
}

Vektor bangun_bell() {
    Vektor v = {1.0, 0.0, 0.0, 0.0};
    gerbang_h(v, 0);
    cnot(v, 0, 1);
    return v;
}

// Tiga pemeriksaan proyek: normalisasi, kecocokan dengan hitungan tangan, dan simpangan.
void periksa(const Vektor& v, const Vektor& harapan, int shot) {
    double jumlah = 0;
    for (double x : v) jumlah += x * x;
    std::printf("1. jumlah kuadrat = %.4f (harus 1)\n", jumlah);
    bool cocok = true;
    for (size_t i = 0; i < v.size(); i++)
        if (std::fabs(v[i] - harapan[i]) > 1e-9) cocok = false;
    std::printf("2. sama dengan hitungan tangan: %s\n", cocok ? "ya" : "tidak");

    std::vector<int> hitung(v.size(), 0);
    for (int s = 0; s < shot; s++) {
        double r = acak01(), kum = 0.0;
        for (size_t i = 0; i < v.size(); i++) {
            kum += v[i] * v[i];
            if (r < kum || i == v.size() - 1) {
                hitung[i]++;
                break;
            }
        }
    }
    std::printf("   hasil [%d, %d, %d, %d] dari %d shot\n", hitung[0], hitung[1], hitung[2], hitung[3], shot);
    for (size_t i = 0; i < v.size(); i++) {
        double p = v[i] * v[i];
        double harap = shot * p;
        double sigma = std::sqrt(shot * p * (1 - p));
        double selisih = std::fabs(hitung[i] - harap);
        std::printf("3. komponen %zu: harapan %.1f, simpangan %.1f, selisih %.1f, dalam 3 simpangan: %s\n", i,
                    harap, sigma, selisih, selisih <= 3 * sigma ? "ya" : "tidak");
    }
}

int main() {
    periksa(bangun_bell(), {H1, 0, 0, H1}, 1000);
    return 0;
}
```

Keluaran asli (dikompilasi penyusun dengan `g++ -std=c++17 -Wall -Wextra`, lalu dijalankan):

```text
1. jumlah kuadrat = 1.0000 (harus 1)
2. sama dengan hitungan tangan: ya
   hasil [502, 0, 0, 498] dari 1000 shot
3. komponen 0: harapan 500.0, simpangan 15.8, selisih 2.0, dalam 3 simpangan: ya
3. komponen 1: harapan 0.0, simpangan 0.0, selisih 0.0, dalam 3 simpangan: ya
3. komponen 2: harapan 0.0, simpangan 0.0, selisih 0.0, dalam 3 simpangan: ya
3. komponen 3: harapan 500.0, simpangan 15.8, selisih 2.0, dalam 3 simpangan: ya
```

Pemeriksaan lolos hanya untuk kasus yang diuji; ia tidak membuktikan program benar untuk semua masukan.

## Daftar periksa

- [ ] Rencana tertulis, dan prediksi angka dicatat sebelum program dijalankan.
- [ ] Pemeriksaan 1: jumlah kuadrat amplitudo sama dengan 1.
- [ ] Pemeriksaan 2: vektor sama dengan hitungan tangan untuk kasus kecil.
- [ ] Pemeriksaan 3: hasil shot dalam tiga simpangan wajar dari harapan; bila di luar, cari penyebabnya lebih dulu, jangan melebarkan ambang.
- [ ] Uji gagal: sengaja rusak satu baris (misalnya hapus CNOT) dan pastikan pemeriksaan menangkapnya.
- [ ] Log pemakaian AI bila dipakai: alat, tujuan, garis besar perintah, bagian yang dipakai, dan cara memeriksanya; kode buatan AI dibaca dan diuji.
- [ ] Privasi: tanpa nama lengkap, foto, atau suara murid pada poster dan berkas; pakai nama peran.
- [ ] Poster memuat batas klaim: simulasi bukan perangkat nyata, tanpa klaim kecepatan atau komunikasi lebih cepat dari cahaya; keluaran asli ditempel.
- [ ] Sumber yang dipakai ditautkan, tanpa menyalin teks halamannya.

## Umpan balik sejawat

Tukar proyek dengan kelompok lain dan beri ulasan: satu yang sudah baik, satu yang perlu diperbaiki, satu langkah berikutnya. Periksa apakah prediksi ditulis sebelum hasil, apakah angka poster sama dengan keluaran program, dan apakah batas klaim jujur. Nilai karyanya, bukan orangnya.

## Latihan bercampur

1. Pada teleportasi `(0,8 ; 0,6)`, berapa peluang tiap hasil Alice, dan apa keadaan Bob sesudah koreksi? (`e-xi2-m7`)
2. Simulasi Deutsch-Jozsa n = 3 untuk `f` seimbang melaporkan `P(000) = 0,5`. Apa dua penyebab yang kamu periksa lebih dulu? (`e-xi2-m12`, `e-xi1-m13`)
3. Tunjukkan bahwa `(0,6 ; 0 ; 0 ; 0,8)` tidak dapat difaktorkan. (`e-xi2-m2`)

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `e-xi2-m14` (satu minggu lagi), `e-xii1-m2` (sekitar tiga minggu lagi), dan `e-xii1-m7` (sekitar delapan minggu lagi). Jawab sekarang lalu simpan.

1. Apa tiga hal yang kamu cek sebelum mempercayai hasil simulasi proyekmu?
2. Bagaimana membandingkan hasil 1000 shot dengan peluang hitungan tangan memakai simpangan wajar?
3. Mengapa keunggulan satu query lawan 2^(n-1)+1 query tidak berarti komputer kuantum lebih cepat untuk semua masalah?

## Kesalahan umum

- **"Hasil cocok dengan harapan berarti kodenya benar."** Hanya untuk kasus yang diuji; karena itu ada uji gagal yang disengaja.
- **"Lebarkan ambang tiga simpangan supaya lolos."** Hasil di luar ambang adalah petunjuk adanya galat; cari penyebabnya.
- **"Poster boleh menulis komputer kuantum lebih cepat."** Simulasi di komputer klasik tidak mendukung klaim kecepatan atau klaim tentang perangkat nyata.

## Cek mandiri

- [ ] Saya menulis rencana dan prediksi sebelum menjalankan program.
- [ ] Saya menjalankan tiga pemeriksaan dan satu uji gagal.
- [ ] Poster saya menyatakan batas klaim dan memuat keluaran asli.
- [ ] Saya memberi dan menerima umpan balik sejawat.
- [ ] Saya mencatat pemakaian AI bila saya memakainya.

## Kunci dan petunjuk

**Ingat kembali.** 1: 16 fungsi; 2 konstan, 6 seimbang, 8 bukan keduanya. 2: janji: `f` konstan atau seimbang; di luar janji hasilnya tidak menentukan (satu nilai 1 dari delapan memberi `P(000) = 0,5625`). 3: fase global adalah faktor yang sama pada seluruh vektor dan tidak mengubah peluang apa pun; fase relatif (beda arah antar komponen) mengubah peluang lewat interferensi setelah gerbang seperti H.

**Rencana proyek.** Tidak ada satu jawaban benar. Rencana yang baik memuat pertanyaan yang dapat diuji, prediksi angka sebelum menjalankan, kriteria selesai, dan batas klaim. Uji gagal: tanpa CNOT vektornya `(h, 0, h, 0)`; jumlah kuadrat masih 1, tetapi pemeriksaan 2 menjadi tidak (dicek penyusun dengan mengganti vektor), jadi pemeriksaan 2 yang menangkap galat itu, bukan pemeriksaan 1.

**Daftar periksa.** Poster yang baik menempelkan keluaran asli; tiga simpangan untuk 1000 shot Bell kira-kira 47 (`3 x akar(1000 x 0,25)` = 47,4).

**Umpan balik sejawat.** Contoh baik: "Prediksi ditulis lebih dulu dan angkanya cocok." Perlu diperbaiki: "Batas klaim belum menyebut bahwa ini simulasi." Langkah berikutnya: "Tambahkan uji gagal."

**Latihan bercampur.** 1: tiap hasil Alice 0,25; keadaan Bob sesudah koreksi `(0,8 ; 0,6)` untuk keempat hasil (keluaran penyusun). 2: oracle atau urutan qubit salah (qubit bantu tidak dimulai dari `|1>`, atau tidak diberi H), atau H pada qubit query terlewat; bandingkan dengan hitungan tangan n = 1 atau 2. 3: `a*d = 0,6 x 0,8 = 0,48` dan `b*c = 0 x 0 = 0`; tidak sama, jadi terjerat.

**Ulang berjarak.** 1: jumlah kuadrat 1 (normalisasi); sama dengan hitungan tangan untuk kasus kecil; hasil shot dalam tiga simpangan wajar dari harapan. 2: hitung harapan `shot x peluang` dan simpangan `akar(shot x p x (1 - p))`, lalu lihat selisih dalam satuan simpangan; lebih dari kira-kira tiga simpangan mencurigakan. 3: itu hitungan jumlah query dalam model dengan oracle yang dianggap tersedia, hanya untuk masalah dengan janji tertentu, dan terhadap algoritma klasik pasti benar; klasik acak hampir selalu benar dengan sedikit query.

## Langkah berikutnya

Modul berikut: `e-xi2-m14` (asesmen dan refleksi semester 2). Bacaan pendamping: modul fenomena yang kamu pilih (`e-xi2-m2`, `e-xi2-m7`, atau `e-xi2-m12`).
