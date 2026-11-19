# Matematika Diskret untuk Komputasi

> **DRAF — belum ditinjau.** Ini modul belajar untuk mata kuliah `KUL-I-103`
> (3 SKS, semester 2, jalur I), bagian dari program `kuliah-coding`. Konten
> karangan menurut ADR-0007; belum disetujui pemilik atau peninjau. Kode di
> modul ini adalah **C++17** (g++ 13.3, Linux) dan dipakai untuk **memeriksa**
> klaim pada contoh kecil, bukan untuk membuktikannya: tiap blok `cpp`
> dikompilasi dengan `-std=c++17 -Wall -Wextra` tanpa peringatan, dijalankan,
> dan keluarannya cocok dengan yang tertulis.

## Untuk siapa modul ini

Mahasiswa semester 2 informatika atau ilmu komputer. Tidak ada prasyarat mata
kuliah; kemampuan memprogram dasar dari `KUL-I-101` membantu membaca contoh.
Satu mata kuliah, satu semester: 14 pertemuan, ujian tengah sesudah pertemuan
7, ujian akhir sesudah pertemuan 14 `[asumsi]` (silabus 2.3). Kamu butuh kertas dan pena (bukti ditulis tangan), g++ (C++17), dan Git.
Matematika dipelajari dengan **menulis**, bukan hanya membaca bukti orang lain.

## Peta semester

| Pertemuan | Bagian | Pokok bahasan | CPMK | Kuis pembuka (jarak) |
| --- | --- | --- | --- | --- |
| 1 | 1 | Proposisi dan konektif | C1 | `KUL-I-101`: percabangan |
| 2 | 1 | Tabel kebenaran dan ekuivalensi | C1 | 1 |
| 3 | 1 | Kuantor dan contoh penyangkal; **kuis kumulatif 1** | C1 | 2, lalu 1 |
| 4 | 2 | Himpunan dan operasinya | C1 | 3, lalu 1 |
| 5 | 2 | Relasi dan relasi ekuivalen | C1 | 4, lalu 2 |
| 6 | 3 | Bukti langsung, kontraposisi, kontradiksi | C2 | 5, lalu 3 |
| 7 | 3 | Induksi matematika; **kuis kumulatif 2** | C2 | 6, lalu 4 |
| ujian tengah | | Ujian tertulis, tanpa AI | C1–C2 | |
| 8 | 3 | Induksi: pangkal dan langkah | C2 | 7, lalu 5 |
| 9 | 4 | Aturan jumlah dan kali; permutasi | C3 | 8, lalu 6 |
| 10 | 4 | Kombinasi dan koefisien binomial | C3 | 9, lalu 7 |
| 11 | 4 | Inklusi-eksklusi; prinsip sangkar merpati; **kuis kumulatif 3** | C3 | 10, lalu 8 |
| 12 | 5 | Graf: derajat dan jalur | C4 | 11, lalu 9 |
| 13 | 5 | Aritmetika modular | C4 | 12, lalu 10 |
| 14 | 5 | Bilangan prima dan FPB; **kuis kumulatif akhir** | C4 | 13, lalu 1 sampai 12 |
| ujian akhir | | Ujian tertulis, tanpa AI | C1–C4 | |

## Ingat kembali

Tiap pertemuan dibuka kuis 5 menit **tanpa catatan**, 3 sampai 5 soal. Kolom
terakhir peta menunjukkan asal soalnya, dengan jarak bertambah; pertemuan 1
mengambil dari `KUL-I-101`. Contoh soal pertemuan 4 (dari pertemuan 3 dan 1):

1. Tulis penyangkal pernyataan "semua bilangan prima ganjil".
2. Apa nilai kebenaran `p → q` bila `p` salah?
3. Apa beda `=` dan `==` pada C++?

Mengingat dengan usaha, bukan membaca ulang, yang membuat ingatan bertahan.

## Tujuan

Pada akhir semester kamu dapat (CPMK, silabus bagian 3.1):

- **C1** memakai logika, himpunan, relasi;
- **C2** membuktikan dengan induksi;
- **C3** menghitung (kombinatorika);
- **C4** memakai teori graf dan bilangan dasar.

## Bagian 1: Logika (pertemuan 1 sampai 3)

**Proposisi** adalah kalimat yang benar atau salah. Konektif: `¬` (bukan),
`∧` (dan), `∨` (atau), `→` (jika-maka), `↔` (jika dan hanya jika). Titik
penting: `p → q` hanya salah bila `p` benar dan `q` salah. **Kontraposisi**
dari `p → q` adalah `¬q → ¬p`; **konvers**-nya `q → p`.

### Prediksi dulu

Tanpa menjalankan, isi tabel kebenaran untuk `p → q`, `¬q → ¬p`, dan `q → p`
pada empat kombinasi `p, q`, lalu tebak: mana yang ekuivalen dengan `p → q`?

### Contoh terselesaikan

Komputer ikut memeriksa tabel kecil. Di C++, `p → q` ditulis `!p || q`.

```cpp
#include <iostream>
using namespace std;

int main() {
    bool sama_kontra = true;
    bool sama_konvers = true;
    for (int p = 0; p <= 1; p++) {
        for (int q = 0; q <= 1; q++) {
            bool implikasi = !p || q;
            bool kontra = q || !p;
            bool konvers = !q || p;
            cout << p << ' ' << q << ' ' << implikasi << ' ' << kontra << ' ' << konvers
                 << '\n';
            if (implikasi != kontra) {
                sama_kontra = false;
            }
            if (implikasi != konvers) {
                sama_konvers = false;
            }
        }
    }
    cout << sama_kontra << ' ' << sama_konvers << '\n';
    return 0;
}
// keluaran:
// 0 0 1 1 1
// 0 1 1 1 0
// 1 0 0 0 1
// 1 1 1 1 1
// 1 0
```

Kolom 3 dan 4 sama pada keempat baris, jadi `p → q` ekuivalen dengan
kontraposisinya; kolom 5 berbeda pada baris kedua, jadi konvers **tidak**
ekuivalen. Hukum De Morgan: `¬(p ∧ q) ≡ ¬p ∨ ¬q`. Kuantor: `∀x P(x)` ("untuk
semua"), `∃x P(x)` ("ada"). Penyangkalnya bertukar: `¬∀x P(x) ≡ ∃x ¬P(x)`.
Untuk membantah "untuk semua", **satu contoh penyangkal cukup**; untuk
mendukungnya, contoh sebanyak apa pun **bukan bukti**.

```cpp
#include <iostream>
using namespace std;

bool prima(int n) {
    if (n < 2) {
        return false;
    }
    for (int d = 2; d * d <= n; d++) {
        if (n % d == 0) {
            return false;
        }
    }
    return true;
}

int main() {
    for (int n = 0; n <= 20; n++) {
        if (!prima(n * n + n + 11)) {
            cout << n << ' ' << n * n + n + 11 << '\n';
            break;
        }
    }
    return 0;
}
// keluaran:
// 10 121
```

Klaim "`n² + n + 11` prima untuk semua `n ≥ 0`" benar untuk `n` = 0 sampai 9
(sepuluh kali berturut-turut) tetapi gagal di `n = 10`, karena 121 = 11 · 11.
Satu penyangkal meruntuhkan seluruh klaim.

### Contoh setengah jadi

Lengkapi tabel untuk `¬(p ∧ q)` dan `¬p ∨ ¬q`, lalu simpulkan:

```text
p q | p∧q | ¬(p∧q) | ¬p | ¬q | ¬p∨¬q
0 0 |  ?  |   ?    | 1  | 1  |   ?
0 1 |  0  |   ?    | 1  | 0  |   1
1 0 |  0  |   1    | ?  | 1  |   ?
1 1 |  ?  |   0    | 0  | ?  |   0
```

### Latihan

1. **Ubah:** ubah program pertama agar memeriksa apakah `p ↔ q` ekuivalen
   dengan `(p → q) ∧ (q → p)`.
2. **Buat:** tulis penyangkal dari "ada bilangan genap yang prima" dengan
   kuantor, lalu nyatakan benar atau salah.
3. **Jelaskan:** dengan kalimatmu sendiri, mengapa mencoba seratus contoh
   tidak membuktikan pernyataan "untuk semua".
4. **Berpasangan (pertemuan latihan):** satu orang menulis pernyataan
   berkuantor, satu orang menyangkalnya; tukar peran tiap sekitar 10 menit.
   Pasangan dibentuk acak per bagian; tugas yang dinilai tetap perorangan.

## Bagian 2: Himpunan dan relasi (pertemuan 4 dan 5)

**Himpunan** adalah kumpulan objek berbeda. Operasi: gabungan `A ∪ B`, irisan
`A ∩ B`, selisih `A \ B`. Banyak anggota gabungan:
`|A ∪ B| = |A| + |B| − |A ∩ B|`. **Relasi** `R` pada himpunan `S` adalah
himpunan pasangan terurut. Sifat: **refleksif** (`(a,a)` ada untuk semua `a`),
**simetris** (`(a,b)` ada maka `(b,a)` ada), **transitif** (`(a,b)` dan `(b,c)`
ada maka `(a,c)` ada). Relasi yang ketiganya terpenuhi adalah **relasi
ekuivalen**, dan ia membagi `S` menjadi kelas-kelas.

### Prediksi dulu

Pada `S = {1, 2, 3}`, nyatakan apakah `R = {(1,2), (2,3)}` refleksif, simetris,
transitif. Lalu: apakah `R' = {(1,1), (2,2), (3,3), (1,2), (2,1)}` relasi
ekuivalen, dan bagaimana kelas-kelasnya?

### Contoh terselesaikan

```cpp
#include <iostream>
using namespace std;

const int N = 3;

bool refleksif(const bool r[N][N]) {
    for (int i = 0; i < N; i++) {
        if (!r[i][i]) {
            return false;
        }
    }
    return true;
}

bool simetris(const bool r[N][N]) {
    for (int i = 0; i < N; i++) {
        for (int j = 0; j < N; j++) {
            if (r[i][j] && !r[j][i]) {
                return false;
            }
        }
    }
    return true;
}

bool transitif(const bool r[N][N]) {
    for (int i = 0; i < N; i++) {
        for (int j = 0; j < N; j++) {
            for (int k = 0; k < N; k++) {
                if (r[i][j] && r[j][k] && !r[i][k]) {
                    return false;
                }
            }
        }
    }
    return true;
}

int main() {
    bool r1[N][N] = {{false, true, false}, {false, false, true}, {false, false, false}};
    bool r2[N][N] = {{true, true, false}, {true, true, false}, {false, false, true}};
    cout << refleksif(r1) << simetris(r1) << transitif(r1) << '\n';
    cout << refleksif(r2) << simetris(r2) << transitif(r2) << '\n';

    bool a[10] = {};
    bool b[10] = {};
    for (int x : {1, 2, 3, 4}) {
        a[x] = true;
    }
    for (int x : {3, 4, 5}) {
        b[x] = true;
    }
    int gabungan = 0;
    int irisan = 0;
    int selisih = 0;
    for (int x = 0; x < 10; x++) {
        gabungan += (a[x] || b[x]);
        irisan += (a[x] && b[x]);
        selisih += (a[x] && !b[x]);
    }
    cout << gabungan << ' ' << irisan << ' ' << selisih << '\n';
    return 0;
}
// keluaran:
// 000
// 111
// 5 2 2
```

Indeks matriks 0 sampai 2 mewakili elemen 1 sampai 3. `R` tidak refleksif,
tidak simetris, dan tidak transitif (ada `(1,2)` dan `(2,3)` tanpa `(1,3)`).
`R'` memenuhi ketiganya sehingga relasi ekuivalen; kelasnya `{1, 2}` dan `{3}`.
Cek rumus: `|A ∪ B| = 4 + 3 − 2 = 5` cocok dengan hitungan program.

### Contoh setengah jadi

Lengkapi fungsi yang memeriksa antisimetris (jika `(a,b)` dan `(b,a)` ada maka
`a = b`):

```text
bool antisimetris(const bool r[N][N]) {
    for (int i = 0; i < N; i++) {
        for (int j = 0; j < N; j++) {
            if (i != j && r[i][j] && ___) {
                return false;
            }
        }
    }
    return true;
}
```

### Latihan

1. **Ubah:** jalankan pemeriksa pada relasi "kurang dari atau sama dengan" pada
   `{1, 2, 3}` (prediksi dulu sifat-sifatnya).
2. **Buat:** pada `{0, ..., 5}` definisikan `a ~ b` bila `a mod 2 = b mod 2`;
   tulis kelas ekuivalennya.
3. **Jelaskan:** mengapa kelas-kelas relasi ekuivalen tidak beririsan?
4. **Berpasangan:** satu orang mengusulkan relasi acak pada empat elemen, yang
   lain memutuskan sifat-sifatnya tanpa program, lalu cocokkan dengan program.

## Bagian 3: Bukti dan induksi (pertemuan 6 sampai 8)

Tiga bentuk bukti: **langsung** (mulai dari yang diketahui), **kontraposisi**
(buktikan `¬q → ¬p`, ekuivalen dengan `p → q` seperti terlihat pada tabel
bagian 1), dan **kontradiksi** (anggap salah, turunkan yang mustahil).
**Induksi matematika** membuktikan `P(n)` untuk semua `n ≥ n₀`: (1) **pangkal**:
`P(n₀)` benar; (2) **langkah**: dari `P(k)` benar (hipotesis induksi) buktikan
`P(k+1)`. Seperti domino: yang pertama jatuh dan tiap yang jatuh menjatuhkan
berikutnya.

### Prediksi dulu

Program kecil menguji `2ⁿ ≥ n²` untuk `n` = 1 sampai 20. Tebak: untuk berapa
`n` pernyataan itu **salah**, sebelum membaca keluaran di bawah?

### Contoh terselesaikan

```cpp
#include <iostream>
using namespace std;

int main() {
    bool jumlah_benar = true;
    for (long long n = 1; n <= 10; n++) {
        long long s = 0;
        for (long long i = 1; i <= n; i++) {
            s += i;
        }
        if (s != n * (n + 1) / 2) {
            jumlah_benar = false;
        }
    }
    cout << jumlah_benar << '\n';
    for (long long n = 1; n <= 20; n++) {
        if ((1LL << n) < n * n) {
            cout << n << '\n';
        }
    }
    return 0;
}
// keluaran:
// 1
// 3
```

Hasil `1` hanya menunjukkan rumus `1 + 2 + ... + n = n(n+1)/2` cocok sampai
`n = 10`; itu **bukan bukti**. Buktinya dengan induksi:

- **Pangkal** `n = 1`: ruas kiri 1, ruas kanan `1·2/2 = 1`. Sama.
- **Langkah:** anggap benar untuk `k`: `1 + ... + k = k(k+1)/2`. Maka
  `1 + ... + k + (k+1) = k(k+1)/2 + (k+1) = (k+1)(k+2)/2`, yaitu rumus untuk
  `k+1`. Selesai.

Contoh kedua menunjukkan peran **pangkal**: `2ⁿ ≥ n²` salah hanya untuk
`n = 3` dalam jangkauan itu. Bukti `2ⁿ ≥ n²` untuk semua `n ≥ 4`: pangkal
`n = 4`: 16 ≥ 16. Langkah: bila `2ᵏ ≥ k²` dengan `k ≥ 4`, maka
`2ᵏ⁺¹ ≥ 2k² ≥ (k+1)²` karena `k² ≥ 2k + 1` untuk `k ≥ 3`. Bila pangkalnya
salah pilih (mis. `n = 3`), induksi tidak berjalan. **Kontraposisi** contoh:
untuk membuktikan "jika `n²` genap maka `n` genap", buktikan "jika `n` ganjil
maka `n²` ganjil": `n = 2m + 1` sehingga `n² = 4m² + 4m + 1 = 2(2m² + 2m) + 1`,
ganjil.

### Contoh setengah jadi

Lengkapi bukti bahwa `1 + 3 + 5 + ... + (2n − 1) = n²`:

```text
Pangkal n = 1: ruas kiri ___, ruas kanan ___.
Langkah: anggap 1 + 3 + ... + (2k − 1) = k².
  Maka 1 + 3 + ... + (2k − 1) + (2(k+1) − 1) = k² + ___ = (k + 1)².
```

### Latihan

1. **Ubah:** ubah program agar menguji `3ⁿ ≥ n³`; prediksi dulu untuk `n` mana
   salah, lalu buat kerangka bukti induksinya.
2. **Buat:** buktikan dengan induksi `2ⁿ > n` untuk semua `n ≥ 1`.
3. **Jelaskan:** apa yang rusak bila bukti induksi hanya mengecek pangkal?
4. **Berpasangan:** satu orang menulis langkah induksi, yang lain memeriksa
   baris demi baris dan menandai satu kalimat yang kurang jelas.

## Bagian 4: Hitungan (pertemuan 9 sampai 11)

**Aturan kali:** pilihan bertahap yang bebas dikalikan. **Aturan jumlah:**
pilihan yang saling lepas dijumlahkan. **Permutasi** `n` objek berbeda: `n!`.
**Kombinasi** `C(n, k) = n! / (k!(n−k)!)` memilih tanpa memperhatikan urutan,
dan `C(n, k) = C(n−1, k−1) + C(n−1, k)` (segitiga Pascal). Jumlah semua
`C(n, k)` untuk `k = 0..n` adalah `2ⁿ` (setiap elemen dipilih atau tidak).
**Inklusi-eksklusi:** `|A ∪ B| = |A| + |B| − |A ∩ B|`. **Sangkar merpati:**
menaruh lebih dari `m` benda ke `m` kotak, minimal satu kotak berisi dua.

### Prediksi dulu

Berapa kata sandi berpanjang 3 dari huruf `A B C D` bila (a) boleh mengulang
huruf, (b) tidak boleh mengulang? Berapa cara memilih 2 dari 5 orang?

### Contoh terselesaikan

Hitungan dengan rumus lalu diperiksa dengan menghitung satu per satu:

```cpp
#include <algorithm>
#include <iostream>
#include <string>
using namespace std;

int main() {
    string s = "ABCD";
    int perm = 0;
    do {
        perm++;
    } while (next_permutation(s.begin(), s.end()));

    long long c[6][6] = {};
    for (int n = 0; n <= 5; n++) {
        c[n][0] = 1;
        for (int k = 1; k <= n; k++) {
            c[n][k] = c[n - 1][k - 1] + (k <= n - 1 ? c[n - 1][k] : 0);
        }
    }
    int pasang = 0;
    for (int mask = 0; mask < 32; mask++) {
        if (__builtin_popcount(mask) == 2) {
            pasang++;
        }
    }
    long long baris = 0;
    for (int k = 0; k <= 5; k++) {
        baris += c[5][k];
    }
    int atau = 0;
    for (int i = 1; i <= 100; i++) {
        if (i % 2 == 0 || i % 3 == 0) {
            atau++;
        }
    }
    cout << perm << ' ' << c[5][2] << ' ' << pasang << ' ' << baris << ' ' << atau << '\n';
    return 0;
}
// keluaran:
// 24 10 10 32 67
```

(a) `4·4·4 = 64`; (b) `4·3·2 = 24`, sama dengan `perm` program (`4!`).
`C(5, 2) = 10` baik dari segitiga Pascal maupun dari menghitung semua subset
berukuran 2. Satu baris Pascal berjumlah `2⁵ = 32`. Bilangan 1 sampai 100 yang
habis dibagi 2 atau 3: `50 + 33 − 16 = 67` (16 adalah yang habis dibagi 6).
Tanpa pengurangan, kelipatan 6 terhitung dua kali. Sangkar merpati: di antara
13 orang, minimal dua lahir di bulan yang sama.

### Contoh setengah jadi

Lengkapi pengisian segitiga Pascal dengan syarat batas:

```text
for (int n = 0; n <= 5; n++) {
    c[n][0] = ___;
    for (int k = 1; k <= n; k++) {
        c[n][k] = c[n-1][___] + c[n-1][___];
    }
}
```

### Latihan

1. **Ubah:** ubah program agar menghitung `C(6, 3)` dan jumlah baris keenam;
   prediksi dulu.
2. **Buat:** hitung banyak bilangan 1 sampai 200 yang habis dibagi 3 atau 5
   dengan inklusi-eksklusi, lalu periksa dengan program.
3. **Jelaskan:** mengapa `C(n, k) = C(n, n−k)`?
4. **Berpasangan:** satu orang menulis soal hitungan tanpa rumus, yang lain
   memilih aturannya dan memeriksa dengan brute force.

## Bagian 5: Graf, aritmetika modular, bilangan dasar (pertemuan 12 sampai 14)

**Graf** `G = (V, E)`: simpul dan sisi. **Derajat** simpul adalah banyak sisi
yang menempel. **Lema jabat tangan:** jumlah semua derajat sama dengan `2|E|`
(tiap sisi dihitung dari dua ujungnya). Graf terhubung punya jalur yang
melewati tiap sisi tepat sekali bila banyak simpul berderajat ganjil adalah 0
atau 2 (teorema Euler). **Aritmetika modular:** `a mod m` adalah sisa bagi
bilangan bulat; `a ≡ b (mod m)` bila `m` membagi `a − b`. **Prima:** bilangan
lebih dari 1 yang hanya habis dibagi 1 dan dirinya.

### Prediksi dulu

Graf lima simpul 0 sampai 4 dengan sisi 0-1, 0-2, 1-2, 2-3, 3-4. Tulis derajat
tiap simpul, jumlahnya, dan banyak simpul berderajat ganjil. Lalu: berapa
`-7 % 5` di C++, dan berapa `-7 mod 5` menurut definisi matematika?

### Contoh terselesaikan

```cpp
#include <iostream>
using namespace std;

long long pangkatMod(long long a, long long e, long long m) {
    long long hasil = 1;
    a %= m;
    while (e > 0) {
        if (e % 2 == 1) {
            hasil = hasil * a % m;
        }
        a = a * a % m;
        e /= 2;
    }
    return hasil;
}

int main() {
    int sisi[5][2] = {{0, 1}, {0, 2}, {1, 2}, {2, 3}, {3, 4}};
    int derajat[5] = {};
    for (auto &s : sisi) {
        derajat[s[0]]++;
        derajat[s[1]]++;
    }
    int jumlah = 0;
    int ganjil = 0;
    for (int d : derajat) {
        cout << d << ' ';
        jumlah += d;
        ganjil += d % 2;
    }
    cout << "| " << jumlah << " | " << ganjil << '\n';

    cout << -7 % 5 << ' ' << ((-7 % 5) + 5) % 5 << '\n';
    cout << pangkatMod(3, 200, 7) << '\n';
    for (int x = 1; x < 7; x++) {
        if (3 * x % 7 == 1) {
            cout << x << '\n';
        }
    }
    int banyakPrima = 0;
    bool bukan[51] = {};
    for (int i = 2; i <= 50; i++) {
        if (!bukan[i]) {
            banyakPrima++;
            for (int j = i * i; j <= 50; j += i) {
                bukan[j] = true;
            }
        }
    }
    cout << banyakPrima << '\n';
    return 0;
}
// keluaran:
// 2 2 3 2 1 | 10 | 2
// -2 3
// 2
// 5
// 15
```

Jumlah derajat 10 sama dengan `2·5` sisi; ada dua simpul berderajat ganjil (2
dan 4), jadi ada jalur yang melewati tiap sisi tepat sekali, yang harus
dimulai di salah satunya. Di C++, `%` pada operan negatif bisa memberi hasil
negatif (`-7 % 5 = -2`); sisa matematika adalah 3, sehingga
koreksi `((a % m) + m) % m` perlu. Pangkat modular memakai kuadrat berulang:
`3²⁰⁰ mod 7`; karena `3⁶ ≡ 1 (mod 7)` dan `200 = 6·33 + 2`, hasilnya `3² mod 7 = 2`,
cocok dengan program. Invers 3 modulo 7 adalah 5 karena `3·5 = 15 ≡ 1 (mod 7)`.
Ada 15 bilangan prima sampai 50. Algoritma
Euclid untuk FPB (`KUL-I-101`, bagian 2) bertumpu pada
`FPB(a, b) = FPB(b, a mod b)`.

### Contoh setengah jadi

Lengkapi pemeriksa "apakah graf punya jalur Euler" setelah derajat dihitung:

```text
bool adaJalurEuler(const int derajat[], int n) {
    int ganjil = 0;
    for (int i = 0; i < n; i++) {
        ganjil += ___;
    }
    return ganjil == ___ || ganjil == ___;
}
```

Asumsikan grafnya terhubung (keterhubungan diperiksa dengan DFS, `KUL-I-102`).

### Latihan

1. **Ubah:** tambahkan sisi 4-0 pada graf contoh dan prediksi jumlah derajat
   serta banyak simpul ganjil sebelum menjalankan.
2. **Buat:** hitung `2¹⁰⁰ mod 13` dengan pangkat modular dan jelaskan
   mengapa tidak menghitung `2¹⁰⁰` langsung.
3. **Jelaskan:** mengapa jumlah derajat sebuah graf selalu genap?
4. **Berpasangan:** satu orang membuat graf acak enam simpul, yang lain
   menyimpulkan jalur Euler tanpa menggambar jalurnya; periksa dengan
   mencoba menelusuri.

**Proyek kecil (pertemuan 13 dan 14).** Laporan dua halaman: pilih satu topik
(mis. mod untuk tabel hash di `KUL-I-102`), tulis satu bukti atau hitungan
**dengan tangan** plus program kecil yang memeriksa contoh, dan jelaskan batas:
yang dibuktikan dan yang hanya diperiksa. Pertemuan 13 berpasangan, 14 mandiri.

## Latihan bercampur

Setelah bagian 2, 4, dan 5, kerjakan soal yang **tidak menyebut** bagiannya.
Contoh: "Dari 12 orang, berapa cara memilih panitia 3 orang?" Kamu memutuskan
aturan yang dipakai. Kuis kumulatif (pertemuan 3, 7, 11, 14) berbentuk sama.

## Ulang berjarak

Kerjakan ulang tanpa melihat solusi lama:

- satu minggu setelah bagian: tulis ulang satu bukti dari bagian itu;
- awal tiap bagian baru: dua soal dari bagian sebelumnya;
- minggu sebelum ujian: tiga soal yang dahulu salah;
- semester 3: tulis ulang bukti induksi `1 + ... + n` tanpa melihat;
  `KUL-I-201` memakai induksi untuk membuktikan kebenaran algoritma dan
  rekurens.

## Kebijakan AI dan log pemakaian

Silabus 6.3 belum menyatakan tingkat AI untuk mata kuliah ini; modul ini
memakai **usulan baku `[asumsi]`** (rancangan modul, keputusan pemilik
2026-11-19): **Kuning** untuk latihan dan tugas (AI boleh menjelaskan konsep
atau memeriksa penalaran yang sudah kamu tulis, tidak menghasilkan jawaban yang
diserahkan, dan hanya setelah kamu dapat menjelaskan sebuah bukti dengan kata
sendiri), dan **Merah** untuk kuis dan ujian tertulis. Dosen menetapkan tingkat
per tugas dan dapat mengubah usulan ini. Bila memakai AI untuk menjelaskan,
catat di repositorimu sendiri: alat dan versi, tujuan, perintah, bagian
keluaran yang dipakai (log). Jangan memasukkan data pribadi atau kata sandi.
AI dapat keliru pada matematika dengan meyakinkan; periksa dengan contoh
kecil dan program.

## Kesalahan umum

- **Mengira contoh adalah bukti.** Seratus contoh bukan bukti; satu
  penyangkal cukup membantah.
- **Menukar `p → q` dengan konvers `q → p`.** Keduanya tidak ekuivalen.
- **Induksi tanpa pangkal atau dengan pangkal yang keliru.** Tanpa pangkal,
  rantai domino tidak dimulai.
- **Menghitung dua kali.** Lupa mengurangi irisan pada inklusi-eksklusi.
- **Menyamakan `%` C++ dengan mod matematika** untuk bilangan negatif.

## Cek mandiri

Tutup modul, jawab, baru periksa.

1. Tulis kontraposisi "jika `n²` ganjil maka `n` ganjil".
2. Tulis penyangkal "untuk semua `x`, `x² > x`" pada bilangan bulat.
3. Tulis kerangka induksi untuk `2ⁿ > n`.
4. Hitung `C(6, 2)` dan jelaskan mengapa sama dengan `C(6, 4)`.
5. Hitung `-13 mod 5` menurut definisi matematika.

Daftar periksa (kosong; kamu isi sendiri, tidak dikumpulkan):

- [ ] Aku dapat mengisi tabel kebenaran dan memutuskan ekuivalensi.
- [ ] Aku dapat memeriksa sifat relasi dan menyebut kelas ekuivalennya.
- [ ] Aku dapat menulis bukti induksi lengkap dengan pangkal dan langkah.
- [ ] Aku dapat memilih aturan hitung yang tepat dan memeriksanya.
- [ ] Aku dapat menghitung derajat, sisa modular, dan menjelaskan batas contoh.

## Kunci dan petunjuk

- **Bagian 1:** tabel `p → q`: `1 1 0 1`; `¬q → ¬p` sama; `q → p`: `1 0 1 1`.
  Hanya kontraposisi yang ekuivalen. Setengah jadi baris demi baris: `0 1 1`;
  `1`; `0 1`; `1 0`. Soal Ingat kembali 1: ada 2, prima yang genap.
- **Bagian 2:** `R`: `000`; `R'`: relasi ekuivalen, kelas `{1,2}` dan `{3}`.
  Setengah jadi: `r[j][i]`. Latihan 2: kelas `{0,2,4}` dan `{1,3,5}`.
- **Bagian 3:** salah hanya untuk `n = 3`. Setengah jadi: `1`, `1`; `2k + 1` (karena `2(k+1) − 1 = 2k + 1`).
- **Bagian 4:** (a) 64, (b) 24, dua dari lima: 10. Setengah jadi: `1`, `k-1`,
  `k`. Latihan 2: `66 + 40 − 13 = 93`.
- **Bagian 5:** derajat `2 2 3 2 1`, jumlah 10, ganjil 2; `-7 % 5 = -2` di
  C++ dan 3 menurut matematika. Setengah jadi: `derajat[i] % 2`, `0`, `2`.
  Cek mandiri 5: `-13 mod 5 = 2`.
- **Petunjuk bertahap bila macet:** (1) tulis ulang soal dengan angka kecil
  dan selesaikan dengan tangan; (2) cari pola atau rumus dari beberapa
  kasus; (3) periksa rumusmu pada kasus kecil dengan program, lalu cari
  pembuktian umum.

## Langkah berikutnya

`KUL-I-201` (Analisis dan Desain Algoritma) memakai induksi, hitungan, dan graf
modul ini. `KUL-I-301` memakai aritmetika modular untuk kriptografi dasar.
`KUL-K-301` memakai teori bilangan dan graf untuk soal kontes.

## Catatan untuk dosen

Bobot dan bentuk asesmen berikut **usulan**; prodi menetapkan (silabus 6.1,
6.2): kuis kumulatif (pertemuan 3, 7, 11, 14), ujian tertulis tengah dan akhir
tanpa AI, tugas bukti per bagian. Silabus menyebut asesmen kuis dan ujian
tertulis; modul tidak menambah proyek berbobot, hanya laporan dua halaman
sebagai bahan belajar. Variasi tugas: ganti angka dan struktur graf per
mahasiswa. Program C++ di modul ini hanya memeriksa contoh; tekankan bahwa itu
bukan bukti. Tingkat AI di atas `[asumsi]`, usulan baku keputusan pemilik
2026-11-19.

## Rujukan

- Oscar Levin, *Discrete Mathematics: An Open Introduction* (buku terbuka),
  dibuka 2026-11-19: <https://discrete.openmathbooks.org/dmoi3.html>
- MIT OpenCourseWare, *Mathematics for Computer Science* (6.042J, Spring 2015),
  dibuka 2026-11-19:
  <https://ocw.mit.edu/courses/6-042j-mathematics-for-computer-science-spring-2015/>
- Standard C++ Foundation, *Get Started* (isocpp.org), dibuka 2026-11-19:
  <https://isocpp.org/get-started>
- ACM/IEEE-CS/AAAI, *Computer Science Curricula 2023*, knowledge area MSF:
  <https://csed.acm.org/knowledge-areas/> (daftar KA terverifikasi;
  rincian unit **tidak** dibaca, jadi tidak dikutip).
