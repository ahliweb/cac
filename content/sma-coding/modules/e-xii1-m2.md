## Untuk siapa modul ini

Modul ini untuk murid kelas XII jalur E (komputasi kuantum), minggu `E-XII1-M2` silabus v1.4: pembalikan fase, yaitu menjelaskan oracle fase dan tanda minus pada amplitudo, dengan keluaran diagram amplitudo. Prasyarat: modul `e-xii1-m1` (Bernstein-Vazirani). Di luar indeks, bagian kode memerlukan simulator n qubit `e-xi2-m4` dan dasar pemrograman setara `A-X1-M9..M12` (C++) atau `B-X1-M9..M12` (TypeScript/Bun); guru memeriksanya. Bagian konsep dan hitungan terbuka bagi semua murid. Alat: kertas, kalkulator, dan simulatormu (tanpa akun).

Modul ini berstatus DRAF: karangan penyusun, belum ditinjau pemilik. Jalur E adalah pengayaan di luar rumusan CP; minggu ini tanpa irisan pengayaan, jadi modul ini tidak dihitung memenuhi butir CP mana pun.

Aturan AI jalur ini: AI generatif boleh dipakai dengan etika dan dicatat, tanpa data pribadi, kata sandi, atau tugas bernilai pada permintaanmu, dan tanpa akun wajib. Saran: jawab dulu sendiri, baru minta petunjuk bertahap; kode buatan AI kamu baca, jalankan, dan uji. Setiap soal `Latihan` bertanda `AI: boleh` atau `AI: tanpa AI`.

Catatan untuk guru: istilah "gerbang query fase" `Z_f`, yang memberi `|x>` tanda `(-1)^f(x)`, dan fakta bahwa mengalikan seluruh keadaan dengan tanda yang sama hanya mengubah fase global, dibaca penyusun dari halaman IBM Quantum Learning "Analysis" pada pelajaran algoritma Grover, per 2026-11-19. Amplitudo di bawah dihitung ulang program. Tidak ada klaim tentang perangkat nyata.

## Ingat kembali

Jawab dari ingatan, baru cek di bagian kunci.

1. Apa janji pada masalah Bernstein-Vazirani, dan berapa query klasik yang diperlukan untuk string rahasia `n` bit? (dari `e-xii1-m1`)
2. Pada keadaan Bell, berapa peluang dua hasil sama bila arah baca kedua qubit berselisih sudut pi/8? (dari `e-xi2-m8`)
3. Bagaimana membandingkan hasil 1000 shot dengan peluang hitungan tangan memakai simpangan wajar? (dari `e-xi2-m13`)

## Tujuan

Setelah modul ini kamu dapat:

- membedakan fase global (tanda sama pada semua amplitudo) dari fase relatif, dan menyebut mana yang terlihat;
- menunjukkan bahwa oracle bit dengan qubit bantu `|->` bekerja sebagai oracle fase;
- menelusuri `|x>` menjadi `-|x>` pada keadaan seragam dua qubit dan menggambar diagram amplitudonya.

Keluaran yang diminta silabus: diagram amplitudo.

## Prediksi dulu

Keadaan seragam dua qubit adalah `(0,5; 0,5; 0,5; 0,5)`. Tebak dan tulis: (1) setelah tanda minus pada `|11>` saja, berapa peluang tiap hasil bila langsung dibaca; (2) bila lalu H dipasang pada kedua qubit, apakah hasilnya masih `00`, atau berubah; (3) apa yang terjadi bila tanda minus ada pada `|01>` dan `|11>` sekaligus.

## Contoh terselesaikan

**Oracle fase.** Oracle bit mengubah `|x>|y>` menjadi `|x>|y XOR f(x)>`. Bila qubit bantu berada di `|->`, efeknya (`e-xi2-m11`, `e-xii1-m1`) hanyalah tanda: `|x>` menjadi `(-1)^f(x) |x>` dan qubit bantu tetap `|->`. Ini oracle fase. Bila `f` menandai satu masukan, hanya satu amplitudo berganti tanda.

**Diagram amplitudo.** Gambar tiap amplitudo sebagai batang ke atas (positif) atau ke bawah (negatif); tinggi batang `0,5`. Oracle fase pada `|11>` membalik batang terakhir saja. Panjang batang tidak berubah, jadi peluang tidak berubah.

**Fase global lawan relatif.** Mengalikan seluruh keadaan dengan `-1` mengubah semua batang sekaligus, dan tidak ada percobaan yang dapat membedakannya. Satu keadaan dasar `|x>` menjadi `-|x>` pun tidak dapat dibedakan dari `|x>`. Tanda hanya bermakna *relatif* terhadap amplitudo lain di dalam superposisi, dan terlihat lewat interferensi, yaitu H sesudahnya.

```cpp
#include <cmath>
#include <cstdio>
#include <vector>

using Vektor = std::vector<double>;
using Fungsi = std::vector<int>;

const double H1 = 1.0 / std::sqrt(2.0);
const int n = 2;       // qubit query: 0 dan 1 (kiri); qubit bantu: nomor 2 (paling kanan)
const int N = n + 1;

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

Vektor pasang_oracle(const Vektor& v, const Fungsi& f) {
    Vektor baru(v.size(), 0.0);
    for (size_t i = 0; i < v.size(); i++) {
        size_t x = i >> 1, y = i & 1;
        baru[(x << 1) | (y ^ f[x])] = v[i];
    }
    return baru;
}

void cetak_vektor(const char* nama, const Vektor& v) {
    std::printf("%-24s", nama);
    for (double a : v) std::printf(" %7.4f", a);
    std::printf("\n");
}

// Dua qubit saja: H pada keduanya, lalu peluang tiap hasil.
Vektor peluang_setelah_hh(const Vektor& u) {
    Vektor p(4, 0.0);
    for (int y = 0; y < 4; y++) {
        double jumlah = 0.0;
        for (int x = 0; x < 4; x++) {
            int titik = x & y;                       // x . y mod 2 = paritas bit yang sama-sama 1
            int tanda = (((titik >> 1) ^ titik) & 1) ? -1 : 1;
            jumlah += tanda * u[x];
        }
        double b = 0.5 * jumlah;
        p[y] = b * b;
    }
    return p;
}

void cetak_skenario(const char* nama, const Vektor& u) {
    Vektor langsung(4);
    for (int x = 0; x < 4; x++) langsung[x] = u[x] * u[x];
    Vektor sesudah = peluang_setelah_hh(u);
    std::printf("%-26s langsung:", nama);
    for (double p : langsung) std::printf(" %.2f", p);
    std::printf("   setelah H,H:");
    for (double p : sesudah) std::printf(" %.2f", p);
    std::printf("\n");
}

int main() {
    // Bagian 1: oracle bit dengan qubit bantu |-> sama dengan pembalikan fase.
    Fungsi f = {0, 0, 0, 1};  // f(x) = 1 hanya untuk x = 11
    Vektor v(size_t(1) << N, 0.0);
    v[1] = 1.0;  // |00>|1>
    for (int k = 0; k < N; k++) gerbang_h(v, k);
    cetak_vektor("sebelum oracle", v);
    Vektor sesudah = pasang_oracle(v, f);
    cetak_vektor("sesudah oracle", sesudah);

    Vektor u = {0.5, 0.5, 0.5, 0.5};  // keadaan query saja
    u[3] = -u[3];                     // pembalikan fase langsung pada |11>
    double beda = 0.0;
    for (int x = 0; x < 4; x++) {
        for (int y = 0; y < 2; y++) {
            double harap = u[x] * (y == 0 ? H1 : -H1);  // qubit bantu tetap |->
            beda = std::fmax(beda, std::fabs(sesudah[(x << 1) | y] - harap));
        }
    }
    std::printf("sama dengan pembalikan fase langsung: %s\n", beda < 1e-12 ? "ya" : "tidak");

    // Bagian 2: tanda minus tidak terlihat langsung, tetapi terlihat setelah H.
    cetak_skenario("tanpa tanda", {0.5, 0.5, 0.5, 0.5});
    cetak_skenario("tanda pada semua (global)", {-0.5, -0.5, -0.5, -0.5});
    cetak_skenario("tanda pada 11", {0.5, 0.5, 0.5, -0.5});
    cetak_skenario("tanda pada 01 dan 11", {0.5, -0.5, 0.5, -0.5});
    cetak_skenario("tanda pada 10 dan 11", {0.5, 0.5, -0.5, -0.5});
    return 0;
}
```

Keluaran asli (dikompilasi penyusun dengan `g++ -std=c++17 -Wall -Wextra`, lalu dijalankan):

```text
sebelum oracle            0.3536 -0.3536  0.3536 -0.3536  0.3536 -0.3536  0.3536 -0.3536
sesudah oracle            0.3536 -0.3536  0.3536 -0.3536  0.3536 -0.3536 -0.3536  0.3536
sama dengan pembalikan fase langsung: ya
tanpa tanda                langsung: 0.25 0.25 0.25 0.25   setelah H,H: 1.00 0.00 0.00 0.00
tanda pada semua (global)  langsung: 0.25 0.25 0.25 0.25   setelah H,H: 1.00 0.00 0.00 0.00
tanda pada 11              langsung: 0.25 0.25 0.25 0.25   setelah H,H: 0.25 0.25 0.25 0.25
tanda pada 01 dan 11       langsung: 0.25 0.25 0.25 0.25   setelah H,H: 0.00 1.00 0.00 0.00
tanda pada 10 dan 11       langsung: 0.25 0.25 0.25 0.25   setelah H,H: 0.00 0.00 1.00 0.00
```

Bacaan hasil. Urutan komponen tiga qubit adalah `|000>, |001>, ... , |111>` (qubit bantu paling kanan). Oracle hanya menukar dua komponen terakhir, dan dua komponen itu `-0,3536` dan `0,3536` berganti tempat, sama dengan tanda `-1` pada `|11>` dengan qubit bantu tetap `|->`; program memastikan kesamaannya. Dari lima skenario, pembacaan langsung selalu `0,25` untuk tiap hasil, jadi tanda tidak terlihat langsung. Setelah H pada kedua qubit: tanpa tanda memberi `00` pasti; tanda pada semua amplitudo (fase global) memberi `00` pasti pula; tanda pada `11` saja membuat peluang tersebar rata, sehingga informasinya ada tetapi belum terkumpul (inilah yang dikerjakan Grover di `e-xii1-m3`); tanda pada `01` dan `11` memberi `01` pasti, yaitu Bernstein-Vazirani dengan `s = 01` (`e-xii1-m1`).

**Batasnya.** Simulator membaca vektor langsung; pada qubit nyata tanda tidak dapat dibaca langsung, dan oracle fase harus dibangun dari gerbang yang menghitung `f`. Biaya membangunnya tidak dihitung di sini.

## Contoh setengah jadi

Lengkapi (kunci di bagian akhir).

1. Tanda minus pada `|10>` mengubah `(0,5; 0,5; 0,5; 0,5)` menjadi `(____)`.
2. Lengkapi:

```cpp setengah-jadi
    Vektor u = {0.5, 0.5, 0.5, 0.5};
    u[____] = -u[____];  // pembalikan fase langsung pada |11>
    // ... di dalam perulangan: qubit bantu tetap |->
    double harap = u[x] * (y == 0 ? H1 : ____);
```

## Soal Parsons

Susun baris-baris di bawah (sudah diacak) menjadi isi fungsi `pasang_oracle`. Kurung kurawal penutup perulangan sengaja dihilangkan.

```text
(a) Vektor baru(v.size(), 0.0);
(b) size_t x = i >> 1, y = i & 1;
(c) baru[(x << 1) | (y ^ f[x])] = v[i];
(d) return baru;
(e) for (size_t i = 0; i < v.size(); i++) {
```

## Latihan

1. **Fase global.** (`AI: tanpa AI`) Tanda minus pada `|00>` dan `|01>` saja. Tulis vektornya, ubah menjadi `-1` kali vektor yang sudah kamu kenal, lalu tebak hasil setelah H pada kedua qubit. Cek dengan program.
2. **Pola lain.** (`AI: tanpa AI`) Tanda minus pada `|01>` dan `|10>`. Tebak hasil setelah H pada kedua qubit, lalu hitung dengan rumus `b_y = (1/2) x jumlah (-1)^(x.y) a_x`.
3. **Tambah skenario.** (`AI: boleh`) Tambahkan kedua pola di atas ke program, lalu cocokkan dengan tebakanmu.
4. **Rancang dulu.** (`AI: boleh`) Tulis pseudocode fungsi `sama_hingga_fase_global(a, b)` untuk vektor real: benar bila `a` sama dengan `b` atau dengan `-b`.
5. **Catatan pemakaian AI (opsional).** Bila memakai asisten AI, catat alat, tujuan, garis besar perintah, bagian yang dipakai, dan cara memeriksanya.

## Latihan bercampur

1. Untuk tanda minus pada `|11>`, berapa harapan dan simpangan wajar bila 1000 shot dibaca langsung dan hasil `00` dihitung? (`e-xi2-m13`)
2. Fungsi dua bit `f(x)` sama dengan bit terakhir `x`: string rahasia apa pada Bernstein-Vazirani, dan berapa pemasangan oracle kuantum yang diperlukan? (`e-xii1-m1`)

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `e-xii1-m3` (satu minggu lagi), `e-xii1-m5` (sekitar tiga minggu lagi), dan `e-xii1-m10` (sekitar delapan minggu lagi). Jawab sekarang lalu simpan.

1. Mengapa tanda minus pada seluruh keadaan tidak dapat dibedakan, sedangkan tanda minus pada sebagian amplitudo dapat?
2. Apa efek oracle bit dengan qubit bantu `|->` pada keadaan `|x>`?
3. Pada keadaan seragam empat item dengan satu item bertanda, mengapa pembacaan langsung masih `0,25` untuk tiap item?

## Kesalahan umum

- **"Tanda minus membuat peluang negatif."** Peluang adalah kuadrat amplitudo, jadi selalu tidak negatif; tanda hanya bekerja lewat interferensi.
- **"Tanda minus pada seluruh keadaan mengubah keadaan."** Itu fase global; tidak ada percobaan yang membedakannya.
- **"Oracle fase memberi tahu jawabannya."** Pembacaan langsung tidak berubah (semua `0,25`); jawaban baru muncul setelah operasi lain.
- **"Qubit bantu berubah karena oracle."** Ia tetap `|->`; tanda berpindah ke qubit query (*phase kickback*).

## Cek mandiri

- [ ] Saya dapat menyebut beda fase global dan fase relatif.
- [ ] Saya dapat menjelaskan mengapa oracle bit dengan `|->` menjadi oracle fase.
- [ ] Saya dapat menelusuri tanda minus pada `|x>` sampai hasil setelah H.
- [ ] Saya dapat menggambar diagram amplitudo untuk dua qubit.
- [ ] Saya mencatat pemakaian AI bila saya memakainya.

## Kunci dan petunjuk

**Ingat kembali.** 1: janji: ada `s` dengan `f(x) = s . x`; klasik `n` query. 2: `cos²(pi/8) = (1 + cos(pi/4))/2`, kira-kira 0,8536 (peluang dua hasil sama adalah `cos²` selisih sudut). 3: hitung harapan `shot x peluang` dan simpangan `akar(shot x p x (1 - p))`, lalu lihat selisih dalam satuan simpangan; lebih dari kira-kira tiga simpangan mencurigakan.

**Prediksi dulu.** (1) `0,25` untuk tiap hasil, karena kuadrat `-0,5` sama dengan kuadrat `0,5`. (2) Berubah: tersebar rata `0,25` untuk keempat hasil. (3) `01` pasti.

**Contoh setengah jadi.** 1: `0,5; 0,5; -0,5; 0,5`. 2: `3` dan `3`; `-H1`. Kunci ini dikompilasi dan dijalankan penyusun (potongan itu ada di program di atas).

**Soal Parsons.** a, e, b, c, d.

**Latihan.** 1: `(-0,5; -0,5; 0,5; 0,5)` sama dengan `-1` kali `(0,5; 0,5; -0,5; -0,5)`, tanda global tak terlihat, sehingga hasilnya sama dengan skenario tanda pada `10` dan `11`: `10` pasti (peluang 1). 2: `(0,5; -0,5; -0,5; 0,5)` memberi `b_11 = (1/2)(0,5 + 0,5 + 0,5 + 0,5) = 1`, jadi `11` pasti (dihitung penyusun, cocok dengan program). 3: hasil program harus sama dengan 1 dan 2. 4: contoh: `jika semua a[i] sama dengan b[i] kembalikan benar; jika semua a[i] sama dengan -b[i] kembalikan benar; selain itu salah`. 5: opsional.

**Latihan bercampur.** 1: harapan 250 dan simpangan `akar(1000 x 0,25 x 0,75)` = 13,7, sedangkan tanda tidak mengubah pembacaan langsung. 2: `s = 01` dan satu pemasangan oracle.

**Ulang berjarak.** 1: fase global tidak mengubah peluang apa pun, termasuk setelah operasi lain; tanda pada sebagian amplitudo mengubah hasil interferensi, jadi bisa terbaca setelah H. 2: memberi tanda `(-1)^f(x)` pada `|x>`, dan qubit bantu tetap `|->`. 3: kuadrat amplitudo `±0,5` sama dengan `0,25`; tanda baru terlihat setelah interferensi.

## Langkah berikutnya

Modul berikut: `e-xii1-m3` (Grover I). Bacaan pendamping: `e-xi2-m11` (Deutsch dan qubit bantu `|->`) dan `e-xii1-m1`.
