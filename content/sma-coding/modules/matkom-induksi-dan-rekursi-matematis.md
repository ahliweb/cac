## Untuk siapa modul ini

Modul ini untuk siswa SMA reguler kelas X semester 2 sampai kelas XI yang ingin bernalar tentang kebenaran rumus dan fungsi rekursif, bukan hanya mencobanya pada beberapa contoh. Ia bagian dari seri Matematika Komputasi Dasar dan berstatus DRAF: karangan penyusun, belum disetujui pemilik, dan tidak dihitung sebagai pemenuhan butir capaian pembelajaran (hanya mendukung butir F-AP-a dan F-BK-b, konsep strategi algoritmik dan justifikasi solusi).

Prasyarat: modul `matkom-logika-proposisi` (implikasi) dan `matkom-himpunan-relasi-fungsi` (fungsi dengan domain bilangan asli). Pernah menulis fungsi rekursif sederhana membantu.

Minggu silabus v1.1 yang berdekatan: jalur A `A-X2-M11` (pengantar rekursi), `A-XI1-M7` (rekursi dan divide-and-conquer), `A-XI2-M1` dan `A-XI2-M2` (pemrograman dinamis); jalur B `B-XI1-M9` (strategi algoritmik di TypeScript). Bacaan mandiri atau rujukan guru; tanpa jadwal wajib.

Setelah mempelajari modul ini, kamu diharapkan bisa:

- menuliskan barisan dan jumlah dengan notasi sigma, serta definisi rekursif;
- membuktikan rumus sederhana dengan induksi matematika (basis, hipotesis, langkah);
- membuktikan fungsi rekursif sederhana menghitung hasil yang benar;
- menuliskan hubungan rekurens untuk banyak langkah atau panggilan;
- memakai gagasan invarian untuk menalar perulangan.

Modul ini tentang **penalaran**. Cara kerja tumpukan panggilan (call stack) dan backtracking dibahas di modul OSN `rekursi`, bukan di sini. Contoh C++17 hanya diperiksa bisa dikompilasi, contoh TypeScript diperiksa penyusun secara manual dengan menjalankannya; keduanya bukan bukti benar untuk semua masukan. Bagian pokok dapat dikerjakan di kertas.

## Barisan dan deret

**Barisan** adalah daftar bilangan berurutan: a₁, a₂, a₃, ... Contoh: 2, 5, 8, 11, ... (selisih tetap 3).

**Deret** adalah jumlah suku-suku barisan. Notasi sigma menyingkat jumlah:

Σ (i = 1 sampai n) i = 1 + 2 + ... + n

Rumus yang sering dipakai: 1 + 2 + ... + n = n(n+1)/2. Pada n = 10: 55.

Dua cara menyatakan barisan:

- **rumus eksplisit**: aₙ = 3n − 1 (suku ke-n langsung dihitung dari n);
- **definisi rekursif**: a₁ = 2, aₙ = aₙ₋₁ + 3 untuk n ≥ 2 (suku bergantung pada suku sebelumnya).

Keduanya menghasilkan barisan yang sama: 2, 5, 8, 11, ... Pertanyaan menarik: bagaimana **membuktikan** bahwa keduanya selalu sama, untuk semua n? Contoh numerik tidak cukup, karena n tak terhingga banyaknya. Induksi menjawab itu.

## Definisi rekursif

Definisi rekursif punya dua bagian: **kasus dasar** (nilai awal yang diberikan langsung) dan **langkah rekursif** (cara memperoleh nilai berikutnya dari nilai sebelumnya).

- Faktorial: 0! = 1; n! = n · (n−1)! untuk n ≥ 1. Jadi 5! = 120.
- Fibonacci: F₀ = 0, F₁ = 1; Fₙ = Fₙ₋₁ + Fₙ₋₂ untuk n ≥ 2. Barisannya 0, 1, 1, 2, 3, 5, 8, 13, 21, ...
- Pangkat: a⁰ = 1; aⁿ = a · aⁿ⁻¹.
- Jumlah: S(0) = 0; S(n) = S(n−1) + n.

Tanpa kasus dasar, definisi tidak pernah berakhir, sama seperti fungsi rekursif tanpa kondisi berhenti.

## Induksi matematika

Bayangkan barisan domino tak terhingga. Semua domino jatuh bila (1) domino pertama jatuh, dan (2) setiap domino yang jatuh menjatuhkan domino berikutnya. Itulah induksi.

Untuk membuktikan pernyataan P(n) benar untuk semua bilangan bulat n ≥ n₀:

1. **Basis**: tunjukkan P(n₀) benar.
2. **Hipotesis induksi**: andaikan P(k) benar untuk suatu k ≥ n₀ (ini hanya anggapan sementara).
3. **Langkah induksi**: dengan memakai hipotesis, tunjukkan P(k+1) benar.

Kesimpulan: P(n) benar untuk semua n ≥ n₀.

### Contoh 1: jumlah n bilangan asli pertama

Buktikan P(n): 1 + 2 + ... + n = n(n+1)/2.

- Basis (n = 1): ruas kiri 1; ruas kanan 1·2/2 = 1. Sama.
- Hipotesis: 1 + 2 + ... + k = k(k+1)/2.
- Langkah: tambahkan (k+1) di kedua ruas.

1 + 2 + ... + k + (k+1) = k(k+1)/2 + (k+1) = (k+1)(k/2 + 1) = (k+1)(k+2)/2.

Bentuk terakhir adalah rumus untuk n = k+1. Terbukti.

### Contoh 2: jumlah bilangan ganjil

Buktikan: 1 + 3 + 5 + ... + (2n−1) = n².

- Basis (n = 1): ruas kiri 1; ruas kanan 1² = 1.
- Hipotesis: 1 + 3 + ... + (2k−1) = k².
- Langkah: tambahkan suku berikutnya, 2(k+1) − 1 = 2k+1: k² + 2k + 1 = (k+1)². Terbukti.

### Contoh 3: jumlah pangkat dua

Buktikan: 1 + 2 + 4 + ... + 2ⁿ = 2ⁿ⁺¹ − 1.

- Basis (n = 0): ruas kiri 1; ruas kanan 2¹ − 1 = 1.
- Hipotesis: 1 + 2 + ... + 2ᵏ = 2ᵏ⁺¹ − 1.
- Langkah: tambah 2ᵏ⁺¹: 2ᵏ⁺¹ − 1 + 2ᵏ⁺¹ = 2 · 2ᵏ⁺¹ − 1 = 2ᵏ⁺² − 1. Terbukti.

Hasil ini menjelaskan mengapa n bit dapat menyimpan nilai terbesar 2ⁿ − 1.

## Membuktikan fungsi rekursif benar

Fungsi rekursif dibuktikan dengan induksi pada ukuran masukan: kasus dasar sama dengan basis, dan pemanggilan rekursif yang dianggap benar adalah hipotesis.

Contoh: fungsi `jumlah(n)` yang didefinisikan `jumlah(0) = 0` dan `jumlah(n) = jumlah(n-1) + n`. Klaim: `jumlah(n) = n(n+1)/2`.

- Basis: `jumlah(0) = 0 = 0·1/2`.
- Hipotesis: `jumlah(k) = k(k+1)/2`.
- Langkah: `jumlah(k+1) = jumlah(k) + (k+1) = k(k+1)/2 + (k+1) = (k+1)(k+2)/2`.

Jadi fungsi itu benar untuk semua n ≥ 0. Pola yang sama dipakai untuk membuktikan `pangkat(a, n)` benar: basis `pangkat(a, 0) = 1`, langkah `a · pangkat(a, k) = aᵏ⁺¹`.

## Hubungan rekurens: menghitung banyak langkah

Banyak langkah suatu algoritma rekursif sering ditulis sebagai hubungan rekurens.

### Menara Hanoi

Memindahkan n cakram: pindahkan n−1 cakram ke tiang bantu, pindahkan cakram terbesar, lalu pindahkan n−1 cakram itu ke atasnya. Banyak langkah T(n):

T(1) = 1; T(n) = 2 · T(n−1) + 1.

Nilainya 1, 3, 7, 15, 31, ... Tebakan: T(n) = 2ⁿ − 1. Buktikan dengan induksi:

- Basis: T(1) = 1 = 2¹ − 1.
- Hipotesis: T(k) = 2ᵏ − 1.
- Langkah: T(k+1) = 2 · T(k) + 1 = 2(2ᵏ − 1) + 1 = 2ᵏ⁺¹ − 1. Terbukti.

Jadi 5 cakram butuh 2⁵ − 1 = 31 langkah, dan 30 cakram sudah lebih dari satu miliar langkah.

### Banyak panggilan pada Fibonacci rekursif

Bila `fib(n)` dihitung langsung dari definisinya, banyak panggilan C(n) memenuhi C(0) = C(1) = 1 dan C(n) = C(n−1) + C(n−2) + 1. Nilainya: 1, 1, 3, 5, 9, 15, 25, 41, 67, 109, 177, ... Pada n = 10 ada 177 panggilan, dan pada n = 20 ada 21.891 panggilan. Pertumbuhannya cepat; modul `matkom-pertumbuhan-fungsi` membahas artinya.

## Invarian perulangan

**Invarian** adalah pernyataan yang benar setiap kali perulangan akan dimulai (sebelum tiap iterasi). Ia dibuktikan seperti induksi: benar di awal (basis), dan bila benar sebelum suatu iterasi maka benar sesudahnya (langkah). Saat perulangan berhenti, invarian ditambah kondisi berhenti memberi hasil yang diinginkan.

Contoh: menjumlah 1 sampai n.

```
jumlah = 0
untuk i dari 1 sampai n:
    jumlah = jumlah + i
```

Invarian: "sebelum iterasi untuk nilai i, jumlah = 1 + 2 + ... + (i−1)". Awal: i = 1, jumlah = 0 (jumlah kosong). Langkah: iterasi menambah i, sehingga jumlah menjadi 1 + ... + i, sesuai invarian untuk i+1. Setelah iterasi n selesai, jumlah = 1 + ... + n.

## Waspadai pola yang tampak benar

Pola pada beberapa contoh bukan bukti. Perhatikan n² + n + 41. Untuk n = 0, 1, 2, ..., 39, hasilnya selalu bilangan prima. Tetapi pada n = 40: 40² + 40 + 41 = 1.681 = 41 · 41, bukan prima. Pernyataan "untuk semua n hasilnya prima" salah, dan hanya pemeriksaan sampai 39 yang menyesatkan. Karena itu bukti diperlukan.

## Contoh kode

Kode tidak membuktikan rumus; ia hanya memeriksa sejumlah nilai. Dua kegunaannya: menemukan tebakan, dan menangkap rumus yang salah dengan satu contoh tandingan.

### C++17: memeriksa rumus dan menghitung panggilan (opsional)

```cpp
#include <iostream>
using namespace std;

long long banyakPanggilan = 0;

long long fib(int n) {
    banyakPanggilan++;
    if (n < 2) {
        return n;
    }
    return fib(n - 1) + fib(n - 2);
}

long long hanoi(int n) {
    if (n == 1) {
        return 1;
    }
    return 2 * hanoi(n - 1) + 1;
}

int main() {
    bool rumusBenar = true;
    for (int n = 1; n <= 20; n++) {
        long long langsung = 0;
        for (int i = 1; i <= n; i++) {
            langsung += i;
        }
        if (langsung != (long long)n * (n + 1) / 2) {
            rumusBenar = false;
        }
    }
    cout << rumusBenar << "\n";  // 1

    cout << hanoi(5) << " " << ((1LL << 5) - 1) << "\n";  // 31 31

    banyakPanggilan = 0;
    fib(10);
    cout << banyakPanggilan << "\n";  // 177
    return 0;
}
```

### TypeScript: invarian dan contoh tandingan (opsional)

Contoh TypeScript ini diperiksa secara manual oleh penyusun dengan menjalankannya memakai Bun; tidak diperiksa otomatis oleh repositori.

```ts
function jumlahDenganInvarian(n: number): number {
  let jumlah = 0;
  for (let i = 1; i <= n; i++) {
    // Invarian: sebelum iterasi ini, jumlah = 1 + ... + (i - 1).
    if (jumlah !== ((i - 1) * i) / 2) {
      throw new Error(`invarian rusak pada i = ${i}`);
    }
    jumlah += i;
  }
  return jumlah;
}

console.log(jumlahDenganInvarian(10)); // 55

function adalahPrima(n: number): boolean {
  if (n < 2) {
    return false;
  }
  for (let d = 2; d * d <= n; d++) {
    if (n % d === 0) {
      return false;
    }
  }
  return true;
}

// Mencari contoh tandingan untuk "n*n + n + 41 selalu prima".
for (let n = 0; n < 100; n++) {
  if (!adalahPrima(n * n + n + 41)) {
    console.log(`contoh tandingan pertama: n = ${n}, nilai ${n * n + n + 41}`);
    break;
  }
}
```

## Latihan

### Latihan 1: Induksi pada jumlah

Buktikan dengan induksi: 1 + 3 + 5 + ... + (2n−1) = n². Tuliskan basis, hipotesis, dan langkah tanpa melihat Contoh 2.

### Latihan 2: Rumus baru

Buktikan: 2 + 4 + 6 + ... + 2n = n(n+1). Petunjuk: basis n = 1; langkah menambah 2(k+1).

### Latihan 3: Barisan

Barisan didefinisikan a₁ = 2, aₙ = aₙ₋₁ + 3. Hitung a₁₀. Buktikan dengan induksi bahwa aₙ = 3n − 1.

### Latihan 4: Hanoi

Berapa langkah minimum untuk 6 cakram menurut T(n) = 2ⁿ − 1? Berapa bila setiap langkah 1 detik dan n = 20 (dalam hari, pembulatan kasar)?

### Latihan 5: Temukan kesalahan pada bukti

Klaim: 1 + 2 + ... + n = n(n+1)/2 + 1 untuk semua n ≥ 1. "Bukti": andaikan benar untuk k. Untuk k+1: k(k+1)/2 + 1 + (k+1) = (k+1)(k+2)/2 + 1, sesuai rumus. Jadi terbukti. Mengapa klaim itu salah padahal langkahnya benar?

### Latihan 6: Invarian

Sebuah perulangan menghitung faktorial: `hasil = 1; untuk i dari 1 sampai n: hasil = hasil * i`. Tuliskan invariannya dan jelaskan mengapa hasil akhirnya n!.

### Latihan 7: Banyak panggilan

Gunakan C(0) = C(1) = 1 dan C(n) = C(n−1) + C(n−2) + 1 untuk menghitung C(6). Lalu cocokkan dengan 2 · Fₙ₊₁ − 1 dengan F₀ = 0, F₁ = 1. (Tebakan itu dapat dibuktikan dengan induksi; coba untuk tantangan.)

### Kunci singkat

- Latihan 1: lihat Contoh 2; basis 1 = 1², hipotesis jumlah k suku = k², langkah k² + (2k+1) = (k+1)².
- Latihan 2: basis 2 = 1·2. Langkah: k(k+1) + 2(k+1) = (k+1)(k+2).
- Latihan 3: a₁₀ = 2 + 9 · 3 = 29 = 3·10 − 1. Basis a₁ = 2 = 3·1 − 1; langkah aₖ₊₁ = aₖ + 3 = 3k − 1 + 3 = 3(k+1) − 1.
- Latihan 4: 2⁶ − 1 = 63 langkah. Untuk n = 20: 1.048.575 detik, sekitar 12,1 hari.
- Latihan 5: basis salah (n = 1 memberi ruas kiri 1 tetapi ruas kanan 2). Langkah induksi saja tidak cukup; basis wajib benar.
- Latihan 6: sebelum iterasi untuk i, hasil = (i−1)!. Awal i = 1: hasil = 1 = 0!. Setiap iterasi mengalikan i sehingga hasil = i!. Setelah i = n selesai, hasil = n!.
- Latihan 7: C(6) = C(5) + C(4) + 1 = 15 + 9 + 1 = 25; 2 · F₇ − 1 = 2 · 13 − 1 = 25. Cocok.

## Kesalahan umum

- Melewatkan basis, atau membuktikan basis yang salah.
- Memakai pernyataan yang hendak dibuktikan sebagai hipotesis untuk **semua** n (itu berputar); hipotesis hanya untuk satu k.
- Menganggap pemeriksaan beberapa contoh sebagai bukti.
- Pada langkah, tidak memakai hipotesis sama sekali.
- Mengira induksi hanya untuk jumlah; ia juga untuk fungsi rekursif, ketaksamaan, dan sifat program.

## Cek mandiri

- Apa tiga bagian bukti induksi?
- Mengapa basis wajib?
- Bagaimana induksi dipakai untuk membuktikan fungsi rekursif benar?
- Apa itu hubungan rekurens, dan apa contohnya untuk Hanoi?
- Apa invarian perulangan?

## Langkah berikutnya

Lanjutkan ke `matkom-pertumbuhan-fungsi` untuk melihat seberapa cepat hasil seperti 2ⁿ tumbuh dan mengapa itu penting untuk efisiensi algoritma.

Jembatan ke modul OSN: fungsi rekursif dan cara kerjanya ada di modul `rekursi` (rumpun `rekursi`), barisan dan Fibonacci di modul `aturan-berhitung` (rumpun `aturan-berhitung`), dan pembagian masalah serta pemrograman dinamis di modul `strategi-problem-solving` (rumpun `strategi-problem-solving`).
