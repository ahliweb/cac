## Untuk siapa modul ini

Modul ini untuk murid kelas XI jalur E (komputasi kuantum), minggu `E-XI2-M9` silabus v1.4: pengayaan distribusi kunci (konsep), yaitu menelusuri ide protokol BB84 pada simulasi dan menyebut batasnya. Prasyarat: modul `e-xi2-m8`; modul `e-xi2-m7` sebaiknya sudah kamu kerjakan. Alat: kertas, kalkulator, dan C++17 opsional (tanpa akun; murid jalur B boleh menerjemahkannya ke TypeScript); hitungan tangan lebih dulu.

Modul ini berstatus DRAF: karangan penyusun, belum ditinjau pemilik. Jalur E adalah pengayaan di luar rumusan CP; minggu ini pengayaan murni, jadi modul ini tidak dihitung memenuhi butir CP mana pun.

Aturan AI jalur ini: AI generatif boleh dipakai dengan etika dan dicatat, tanpa data pribadi, kata sandi, atau tugas bernilai pada permintaanmu, dan tanpa akun wajib. Saran: jawab dulu sendiri, baru minta petunjuk bertahap; kode buatan AI kamu baca, jalankan, dan uji. Setiap soal `Latihan` bertanda `AI: boleh` atau `AI: tanpa AI`.

Catatan untuk guru: langkah BB84 (dua basis, penyaringan, pembandingan sebagian bit, saluran publik terautentikasi) dibaca penyusun dari cetak ulang makalah Bennett dan Brassard (arXiv:2003.06557, naskah asli 1984), termasuk bahwa penyadap yang membaca dan mengirim ulang semua foton pada satu basis menimbulkan ketidakcocokan pada 1/4 bit yang dibaca ulang di basis asli. Batas QKD dibaca dari halaman NCSC (lembaga keamanan siber Inggris) "Quantum security technologies"; keduanya per 2026-11-19. Penyadap berbasis acak di modul ini adalah hitungan penyusun yang juga memberi 1/4, dicek dengan simulasi. Semua data sintetis. Modul ini bukan panduan membuat sistem kunci: pembangkit acak di programnya (kongruensi linear buatan sendiri) mudah ditebak dan tidak boleh dipakai untuk keperluan keamanan.

## Ingat kembali

Jawab dari ingatan, baru cek di bagian kunci.

1. Mengapa pengukuran tidak reversibel, padahal gerbang kuantum reversibel? (dari `e-xi2-m6`)
2. Mengapa keterjeratan tidak dapat dipakai pemain CHSH untuk saling mengirim pesan? (dari `e-xi2-m8`)
3. Apa yang terjadi pada keadaan setelah dibaca, dan apa hasil pembacaan kedua pada keadaan yang sama? (dari `e-xi1-m7`)

## Tujuan

Setelah modul ini kamu dapat:

- menelusuri langkah BB84 (siapkan, baca, saring, bandingkan) pada tabel bit sintetis;
- menunjukkan lewat hitungan dan simulasi bahwa penyadap yang membaca lalu mengirim ulang menimbulkan kesalahan sekitar 25 persen pada kunci tersaring;
- menyebut batas protokol: simulasi bukan keamanan nyata, dan QKD memerlukan saluran terautentikasi.

## Prediksi dulu

Tebak dan tulis: (1) seberapa sering basis Alice dan Bob sama bila keduanya memilih acak; (2) tanpa penyadap, berapa persen bit tersaring tidak cocok; (3) berapa persen bila ada penyadap yang membaca di basis acak lalu mengirim ulang.

## Contoh terselesaikan

**Dua basis.** Basis 0 memakai `|0>` dan `|1>`. Basis 1 memakai `|+> = (h, h)` dan `|-> = (h, -h)`. Bit 0 dikirim sebagai `|0>` (basis 0) atau `|+>` (basis 1); bit 1 sebagai `|1>` atau `|->`. Dibaca di basis yang sama, hasilnya pasti bit itu. Dibaca di basis lain, hasilnya acak 50:50: `|+>` dibaca di basis 0 memberi 0 dengan peluang `h² = 0,5`. Setelah dibaca, qubit menjadi keadaan yang dibaca (`e-xi1-m7`). `|0>` dan `|+>` tidak saling tegak lurus (hasil kali dalamnya `h`, bukan 0), jadi tidak ada satu pembacaan pun yang membedakannya dengan pasti.

**Protokol.** (1) Alice memilih bit dan basis acak, lalu mengirim qubitnya. (2) Bob memilih basis acak dan membaca. (3) Lewat saluran biasa mereka mengumumkan basis, bukan bit, dan menyimpan posisi dengan basis sama, kira-kira separuh; sisanya dibuang. (4) Mereka membandingkan secara terbuka sebagian bit tersaring; bila terlalu banyak yang tidak cocok, mereka curiga ada gangguan dan membatalkan; bit yang tidak diumumkan menjadi bahan kunci. Langkah lanjutan (koreksi galat, penguatan privasi) tidak dibahas.

**Penyadap.** Eve membaca setiap qubit di basis acak lalu mengirim ulang. Ia memilih basis benar dengan peluang 1/2: qubit tidak terganggu. Ia salah dengan peluang 1/2: qubit runtuh ke keadaan basis yang salah, dan Bob, bila basisnya sama dengan Alice, membaca acak sehingga salah dengan peluang 1/2. Kesalahan di kunci tersaring: `1/2 x 1/2 = 1/4`. Eve tidak dapat menyalin qubit untuk membacanya nanti (`e-xi2-m7`).

```cpp
#include <cmath>
#include <cstdint>
#include <cstdio>
#include <vector>

struct Qubit {
    double a0, a1;  // amplitudo |0> dan |1>
};

const double H1 = 1.0 / std::sqrt(2.0);

// Pembangkit semu buatan sendiri; benih tetap. Hanya untuk simulasi, BUKAN untuk kunci sungguhan.
uint32_t benih = 2026;

double acak01() {
    benih = 1664525u * benih + 1013904223u;
    return benih / 4294967296.0;
}

int acak_bit() { return acak01() < 0.5 ? 0 : 1; }

Qubit gerbang_h(Qubit q) { return {H1 * (q.a0 + q.a1), H1 * (q.a0 - q.a1)}; }

// Basis 0: |0> atau |1>. Basis 1: |+> atau |->, yaitu H dikenakan pada |0> atau |1>.
Qubit siapkan(int bit, int basis) {
    Qubit q = bit == 0 ? Qubit{1.0, 0.0} : Qubit{0.0, 1.0};
    return basis == 1 ? gerbang_h(q) : q;
}

// Baca dalam basis itu. Kembalikan hasil; keadaan runtuh ke keadaan basis yang dibaca.
int baca(Qubit& q, int basis) {
    Qubit w = basis == 1 ? gerbang_h(q) : q;  // H memutar basis 1 menjadi basis 0
    int hasil = acak01() < w.a0 * w.a0 ? 0 : 1;
    q = siapkan(hasil, basis);
    return hasil;
}

struct Hasil {
    int tersaring = 0;
    int tidak_cocok = 0;
};

Hasil jalankan(int n, bool ada_penyadap, bool cetak) {
    Hasil h;
    if (cetak) std::printf("bit  basisA basisB  hasilB  disimpan\n");
    for (int i = 0; i < n; i++) {
        int bit = acak_bit(), basis_a = acak_bit(), basis_b = acak_bit();
        Qubit q = siapkan(bit, basis_a);
        if (ada_penyadap) baca(q, acak_bit());  // Eve membaca di basis acak lalu mengirim ulang
        int hasil = baca(q, basis_b);
        bool simpan = basis_a == basis_b;
        if (simpan) {
            h.tersaring++;
            if (hasil != bit) h.tidak_cocok++;
        }
        if (cetak)
            std::printf("  %d      %d      %d      %d      %s\n", bit, basis_a, basis_b, hasil,
                        simpan ? "ya" : "tidak");
    }
    return h;
}

int main() {
    jalankan(8, false, true);
    for (int penyadap = 0; penyadap < 2; penyadap++) {
        Hasil h = jalankan(4000, penyadap == 1, false);
        std::printf("penyadap=%s: kunci tersaring %d bit, tidak cocok %d (%.3f)\n",
                    penyadap ? "ya" : "tidak", h.tersaring, h.tidak_cocok,
                    static_cast<double>(h.tidak_cocok) / h.tersaring);
    }
    return 0;
}
```

Keluaran asli (dikompilasi penyusun dengan `g++ -std=c++17 -Wall -Wextra`, lalu dijalankan):

```text
bit  basisA basisB  hasilB  disimpan
  0      0      0      0      ya
  1      0      1      1      tidak
  0      1      0      0      tidak
  1      0      1      1      tidak
  1      0      0      1      ya
  1      1      0      1      tidak
  1      0      0      1      ya
  0      1      1      0      ya
penyadap=tidak: kunci tersaring 1955 bit, tidak cocok 0 (0.000)
penyadap=ya: kunci tersaring 2011 bit, tidak cocok 493 (0.245)
```

Bacaan hasilnya: dari 8 qubit, 4 posisi disimpan dan semuanya cocok. Tanpa penyadap tidak ada yang tidak cocok; dengan penyadap 493 dari 2011, kira-kira 25 persen. Harapan 503 dengan simpangan wajar kira-kira 19, jadi 493 wajar. Simulasi ini tanpa derau saluran; ambang ketidakcocokan yang diterima ditetapkan protokol, bukan modul ini.

**Kunci untuk apa.** Kunci tersaring dipakai sebagai sandi XOR (*one-time pad*): sandi = pesan XOR kunci, dan dekripsi = sandi XOR kunci. Syaratnya kunci acak sejati, rahasia, dan sekali pakai.

```cpp
#include <cstdio>
#include <vector>

using Bit = std::vector<int>;

Bit xor_bit(const Bit& a, const Bit& b) {
    Bit hasil;
    for (size_t i = 0; i < a.size(); i++) hasil.push_back(a[i] ^ b[i]);
    return hasil;
}

void tulis(const char* label, const Bit& v) {
    std::printf("%s", label);
    for (int x : v) std::printf("%d", x);
    std::printf("\n");
}

int main() {
    Bit pesan = {1, 0, 1, 1, 0, 0, 1, 0};  // pesan sintetis, 8 bit
    Bit kunci = {0, 1, 1, 0, 1, 0, 0, 1};  // kunci contoh 8 bit (bukan kunci sungguhan)
    Bit sandi = xor_bit(pesan, kunci);
    Bit kembali = xor_bit(sandi, kunci);
    tulis("pesan   : ", pesan);
    tulis("kunci   : ", kunci);
    tulis("sandi   : ", sandi);
    tulis("dekripsi: ", kembali);
    std::printf("sama dengan pesan: %s\n", kembali == pesan ? "ya" : "tidak");
    Bit salah = {0, 1, 1, 0, 1, 0, 0, 0};  // kunci salah di satu posisi
    tulis("kunci salah satu bit -> ", xor_bit(sandi, salah));
    return 0;
}
```

Keluaran asli (dikompilasi penyusun dengan `g++ -std=c++17 -Wall -Wextra`, lalu dijalankan):

```text
pesan   : 10110010
kunci   : 01101001
sandi   : 11011011
dekripsi: 10110010
sama dengan pesan: ya
kunci salah satu bit -> 10110011
```

**Batas.** Per 2026-11-19, NCSC menyatakan bahwa QKD tidak menyediakan autentikasi sehingga rentan terhadap penyerang fisik di tengah jalur, dan harus dipasang bersama autentikasi yang aman dari ancaman kuantum. NCSC juga tidak merekomendasikan QKD untuk aplikasi pemerintah atau militer dan menilai kriptografi tahan-kuantum sebagai mitigasi terbaik. Simulasi di atas tidak membuktikan keamanan apa pun.

## Contoh setengah jadi

Lengkapi (kunci di bagian akhir).

1. Alice memilih bit 1 dan basis 1, jadi qubitnya `|____>` (`|+>` atau `|->`). Bob membaca di basis 1 dan memperoleh hasil ____.
2. Kesalahan di kunci tersaring akibat Eve: ____ x ____ = ____.
3. Lengkapi dua fungsi:

```cpp setengah-jadi
Qubit siapkan(int bit, int basis) {
    Qubit q = bit == 0 ? Qubit{1.0, 0.0} : Qubit{0.0, 1.0};
    return basis == ____ ? gerbang_h(q) : q;
}

bool disimpan(int basis_a, int basis_b) {
    return basis_a ____ basis_b;
}
```

## Soal Parsons

Susun baris-baris di bawah (sudah diacak) menjadi isi satu putaran perulangan: pilih nilai acak, siapkan qubit, baca, lalu simpan bila basis sama. Penjorokan dan kurung kurawal penutup sengaja dihilangkan.

```text
(a) int hasil = baca(q, basis_b);
(b) Qubit q = siapkan(bit, basis_a);
(c) int bit = acak_bit(), basis_a = acak_bit(), basis_b = acak_bit();
(d) if (basis_a == basis_b) {
(e) h.tersaring++;
```

## Latihan

1. **Dengan tangan.** (`AI: tanpa AI`) Alice mengirim bit 1 di basis 0 dan Bob membaca di basis 1. Hitung peluang Bob memperoleh 0 (terapkan H pada `(0, 1)` lalu baca), dan apakah posisi itu disimpan.
2. **Tabel.** (`AI: tanpa AI`) Tanpa penyadap, untuk tiap `(bit, basis Alice, basis Bob)`: (0,0,0), (1,0,1), (1,1,1), (0,1,0), (0,1,1), (1,0,0), tulis apakah posisi disimpan dan, bila ya, hasil Bob.
3. **Berapa bit dibandingkan.** (`AI: tanpa AI`) Dengan penyadap, tiap bit yang dibandingkan lolos (cocok) dengan peluang 3/4. Berapa peluang 20 bit yang dibandingkan lolos semua? Paling sedikit berapa bit agar peluang lolos di bawah 1 persen?
4. **Rancang dulu.** (`AI: boleh`) Tulis pseudocode memperkirakan tingkat ketidakcocokan: pilih setengah posisi tersaring secara acak, bandingkan, hitung proporsi tidak cocok, bandingkan dengan ambang.
5. **Ubah n.** (`AI: boleh`) Ubah 4000 menjadi 400. Prediksi dulu panjang kunci tersaring dan jumlah tidak cocok dengan penyadap, lalu jalankan.
6. **Catatan pemakaian AI (opsional).** Bila memakai asisten AI, catat alat, tujuan, garis besar perintah, bagian yang dipakai, dan cara memeriksanya.

## Latihan bercampur

1. Pesan `1011` dan kunci `0110`: tulis sandi XOR, lalu dekripsinya. (`matkom-logika-proposisi`)
2. Kunci tersaring 1000 bit dengan penyadap: berapa bit tidak cocok yang diharapkan dan berapa simpangan wajarnya? (`e-xi1-m7`)
3. Mengapa Eve tidak dapat menyalin qubit lalu membaca salinannya belakangan? (`e-xi2-m7`)

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `e-xi2-m10` (satu minggu lagi), `e-xi2-m12` (sekitar tiga minggu lagi), dan `e-xii1-m3` (sekitar delapan minggu lagi). Jawab sekarang lalu simpan.

1. Bagaimana satu bit kunci dipakai mengenkripsi satu bit pesan dengan XOR, dan bagaimana mendekripsinya?
2. Mengapa penyadap yang membaca lalu mengirim ulang pada basis acak menimbulkan kesalahan sekitar 25 persen pada kunci tersaring?
3. Mengapa keadaan |0> dan |+> tidak dapat dibedakan dengan pasti oleh satu pembacaan?

## Kesalahan umum

- **"BB84 mengirim pesan lewat qubit."** Yang dihasilkan adalah kunci acak bersama; pesan dienkripsi terpisah, misalnya dengan XOR.
- **"Penyadap pasti tertangkap."** Ia terdeteksi secara statistik: bila hanya sedikit bit yang dibandingkan, peluang ia lolos masih ada.
- **"Simulasi ini aman untuk kunci sungguhan."** pembangkit acak di program ini mudah ditebak, dan keamanan nyata memerlukan perangkat, autentikasi, dan langkah lanjutan.

## Cek mandiri

- [ ] Saya dapat menelusuri empat langkah BB84 pada tabel bit sintetis.
- [ ] Saya dapat menjelaskan mengapa penyadap menimbulkan kesalahan sekitar 25 persen.
- [ ] Saya dapat menyebut dua batas QKD dan batas simulasi ini.
- [ ] Saya mencatat pemakaian AI bila saya memakainya.

## Kunci dan petunjuk

**Ingat kembali.** 1: gerbang dapat dibalik tanpa kehilangan informasi (matriks uniter punya kebalikan), sedangkan pembacaan menjadikan beberapa keadaan awal berbeda satu keadaan yang sama (`|0>` atau `|1>`), sehingga keadaan awal tidak dapat dipulihkan. 2: peluang hasil satu pihak 50:50 apa pun yang dilakukan pihak lain, jadi tidak ada pesan yang lewat. 3: keadaan menjadi keadaan yang dibaca (`|0>` atau `|1>`); pembacaan kedua pada keadaan yang sama memberi hasil yang sama dengan peluang 1.

**Prediksi dulu.** (1) separuh; (2) 0 persen; (3) kira-kira 25 persen.

**Contoh setengah jadi.** 1: `|->` (bit 1 di basis 1); hasil 1 (basis sama, hasil pasti bit). 2: `1/2 x 1/2 = 1/4`. 3: `1` untuk `basis == 1`; `==` untuk `disimpan`. Kunci ini dikompilasi dan dijalankan penyusun.

**Soal Parsons.** c, b, a, d, e.

**Latihan.** 1: `H (0, 1) = (h, -h)`; peluang 0 = `h²` = 0,5; tidak disimpan karena basis berbeda. 2: disimpan: (0,0,0) hasil 0; (1,1,1) hasil 1; (0,1,1) hasil 0; (1,0,0) hasil 1. Tidak disimpan: (1,0,1) dan (0,1,0). 3: `(3/4)^20` = 0,0032 (kira-kira 0,3 persen); `(3/4)^16` = 0,0100 masih sedikit di atas 1 persen dan `(3/4)^17` = 0,0075, jadi paling sedikit 17 bit. 4: contoh: `pilih k posisi acak dari kunci tersaring; umumkan bit di posisi itu; salah = jumlah yang tidak sama; tingkat = salah / k; bila tingkat > ambang, batal; buang posisi yang diumumkan dari kunci`. 5: panjang kunci tersaring kira-kira 200; tanpa penyadap tidak cocok 0, dengan penyadap kira-kira 50 dengan simpangan 6 (hasil bergantung benih). 6: opsional.

**Latihan bercampur.** 1: `1011 XOR 0110 = 1101`; dekripsi `1101 XOR 0110 = 1011`. 2: harapan 250; simpangan akar(1000 x 0,25 x 0,75) = akar 187,5, kira-kira 13,7. 3: no-cloning: tidak ada gerbang yang menyalin keadaan sembarang; satu-satunya cara membaca adalah mengukur, yang mengubah keadaan bila basisnya salah.

**Ulang berjarak.** 1: sandi = pesan XOR kunci; dekripsi = sandi XOR kunci, karena `(p XOR k) XOR k = p`. 2: Eve salah basis dengan peluang 1/2, qubit lalu runtuh ke basis yang salah, dan Bob (basis sama dengan Alice) salah dengan peluang 1/2 sehingga `1/2 x 1/2 = 1/4`. 3: hasil kali dalamnya `h`, bukan 0, jadi tidak saling tegak lurus; hasil 0 di basis 0 dapat berasal dari `|0>` (peluang 1) maupun `|+>` (peluang 0,5).

## Langkah berikutnya

Modul berikut: `e-xi2-m10` (oracle dan fungsi Boolean). Bacaan pendamping: `e-xi2-m7` (tak dapat menggandakan). Minggu `E-XII2-M4` silabus kelak membahas dampak komputasi kuantum pada keamanan informasi.
