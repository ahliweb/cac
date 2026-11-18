## Untuk siapa modul ini

Modul ini untuk siswa SMA reguler kelas X semester 2 sampai kelas XI yang ingin menilai secara kasar seberapa cepat atau lambat sebuah program, tanpa harus menjalankannya. Ia bagian dari seri Matematika Komputasi Dasar dan berstatus DRAF: karangan penyusun, belum disetujui pemilik, dan tidak dihitung sebagai pemenuhan butir capaian pembelajaran (hanya mendukung butir F-BK-b, justifikasi efisiensi, secara intuitif; bagian notasi O berada di luar rumusan capaian yang dikutip silabus).

Prasyarat: modul `matkom-sistem-bilangan-basis` (pangkat dua dan gagasan membagi dua berulang pada konversi basis). Logaritma basis 2 sendiri tidak dibahas di modul itu; ia diperkenalkan di modul ini sebagai "berapa kali dibagi dua". Disarankan, tetapi tidak wajib: modul `matkom-induksi-dan-rekursi-matematis` (hubungan rekurens).

Minggu silabus v1.1 yang berdekatan: jalur A `A-X2-M8` (pencarian), `A-X2-M12` (efisiensi intuitif), `A-XI1-M8` (merge sort, quick sort), `A-XI1-M12` (membandingkan strategi); jalur B `B-X2-M8` (pencarian) dan `B-XI1-M10` (efisiensi dan alternatif solusi). Bacaan mandiri atau rujukan guru; tanpa jadwal wajib.

Setelah mempelajari modul ini, kamu diharapkan bisa:

- membandingkan laju pertumbuhan fungsi konstan, logaritma, linear, n log n, kuadrat, dan eksponen;
- menghitung banyak langkah dari potongan program;
- menjelaskan mengapa pencarian biner cepat;
- menyederhanakan banyak langkah menjadi notasi O secara intuitif;
- mengira apakah sebuah solusi cukup cepat untuk batas masukan tertentu.

Modul ini tidak memakai definisi formal limit. Semua angka waktu bersifat perkiraan kasar, bukan pengukuran. Contoh C++17 hanya diperiksa bisa dikompilasi, contoh TypeScript diperiksa penyusun secara manual dengan menjalankannya; keduanya bukan bukti benar untuk semua masukan. Bagian pokok dapat dikerjakan di kertas.

## Ingat kembali

Jawab dari ingatan, tanpa membuka modul `matkom-sistem-bilangan-basis` dan `matkom-induksi-dan-rekursi-matematis`. Cocokkan di bagian kunci.

1. Ubah 100 ke biner dengan bagi berulang. Berapa kali pembagian yang dilakukan?
2. Tulis hubungan rekurens banyak langkah menara Hanoi dan nilai untuk 4 cakram.
3. Berapa banyak panggilan `fib(5)` bila dihitung langsung dari definisinya (C(0) = C(1) = 1, C(n) = C(n−1) + C(n−2) + 1)?
4. Berapa nilai terbesar yang muat pada 10 bit tanpa tanda minus?
5. Mengapa memeriksa beberapa contoh bukan bukti bahwa rumus benar untuk semua n?

## Mengapa perlu menilai kecepatan

Dua program dapat memberi jawaban yang sama tetapi satu selesai dalam sekejap dan satu selesai dalam berjam-jam, ketika datanya besar. Daripada mengukur waktu di komputer tertentu (yang berbeda-beda), kita menghitung **banyak langkah sebagai fungsi ukuran masukan n**, lalu melihat **bagaimana fungsi itu tumbuh** ketika n membesar.

## Logaritma sebagai "berapa kali dibagi dua"

log₂ n adalah pangkat yang harus dipakai pada 2 agar hasilnya n. Pemahaman praktis: **berapa kali n dapat dibagi dua sampai tinggal 1** (dibulatkan ke bawah).

- 1024 dibagi dua berulang: 512, 256, 128, 64, 32, 16, 8, 4, 2, 1, yaitu 10 kali. Jadi log₂ 1024 = 10.
- 1000 dibagi dua berulang (dibulatkan ke bawah): 500, 250, 125, 62, 31, 15, 7, 3, 1, yaitu 9 kali. Jadi log₂ 1000 sedikit di bawah 10 (kira-kira 9,97).
- Satu juta hanya perlu sekitar 20 kali dibagi dua, dan satu miliar sekitar 30 kali.

Logaritma tumbuh **sangat lambat**: ukuran masukan dikalikan seribu hanya menambah sekitar 10 langkah.

## Perbandingan keluarga fungsi

| Nama | Bentuk | Contoh program |
| --- | --- | --- |
| konstan | 1 | mengambil elemen ke-i dari array |
| logaritma | log n | pencarian biner |
| linear | n | satu perulangan atas data |
| n log n | n log n | pengurutan yang efisien (merge sort) |
| kuadrat | n² | dua perulangan bersarang atas data |
| eksponen | 2ⁿ | mencoba semua himpunan bagian |

Nilai kira-kira (log memakai basis 2):

| n | log n | n log n | n² | 2ⁿ |
| --- | --- | --- | --- | --- |
| 10 | 3,3 | 33 | 100 | 1.024 |
| 100 | 6,6 | 664 | 10.000 | sekitar 1,3 x 10³⁰ |
| 1.000 | 10 | sekitar 10.000 | 1.000.000 | tak terbayangkan |
| 1.000.000 | 19,9 | sekitar 20.000.000 | 10¹² | tak terbayangkan |

Pelajaran dari tabel: di n kecil, semuanya terlihat murah. Di n besar, kuadrat sudah sangat berat dan eksponen mustahil. Perbedaan **bentuk** fungsi jauh lebih penting daripada perbedaan faktor tetap kecil.

## Menghitung langkah dari program

Hitung berapa kali pernyataan di dalam perulangan dijalankan.

- Satu perulangan `for i dari 1 sampai n`: n langkah.
- Dua perulangan bersarang, masing-masing sampai n: n · n = n² langkah.
- Perulangan dalam yang bergantung pada luar, misalnya `j` dari 0 sampai `i − 1`: 0 + 1 + ... + (n−1) = n(n−1)/2 langkah. Untuk n = 100 itu 4.950 langkah, dan bentuknya tetap kuadrat (separuh dari n²).
- Perulangan yang menggandakan: `i = 1; selama i < n: i = i · 2`: sekitar log₂ n langkah. Untuk n = 1000 itu 10 langkah.
- Perulangan dalam sebuah perulangan menggandakan: n · log n langkah.

## Pencarian biner

Pencarian sekuensial pada daftar berurut memeriksa satu per satu: paling banyak n langkah. Pencarian biner memeriksa elemen tengah, lalu membuang separuh daftar yang tidak mungkin berisi nilai yang dicari. Tiap langkah membagi dua ruang pencarian, sehingga banyak langkah paling banyak ⌊log₂ n⌋ + 1.

| n | Sekuensial (paling banyak) | Biner (paling banyak) |
| --- | --- | --- |
| 7 | 7 | 3 |
| 1.000 | 1.000 | 10 |
| 1.000.000 | 1.000.000 | 20 |

Syarat: daftar harus **sudah terurut**. Mengurutkan dulu butuh biaya sendiri, sehingga biner menguntungkan terutama bila pencarian dilakukan berkali-kali.

## Notasi O secara intuitif

**Notasi O** menyingkat bentuk pertumbuhan dengan dua aturan sederhana:

1. Buang suku yang tumbuh lebih lambat (hanya suku terbesar berpengaruh ketika n besar).
2. Buang faktor pengali tetap.

Contoh: 3n² + 5n + 7 langkah ditulis O(n²). n(n−1)/2 langkah ditulis O(n²). 100 langkah tetap ditulis O(1). 5 · n log n + n ditulis O(n log n).

Arti O(f(n)): untuk n cukup besar, banyak langkah **tidak melebihi** sebuah kelipatan f(n). Ini batas atas, bukan hitungan persis. Penjelasan formal dengan limit tidak dibahas di modul ini.

Penting: O(n²) hanya mengatakan bagaimana waktu tumbuh. Dua program O(n) bisa berbeda kecepatan 100 kali karena faktor tetapnya.

## Mengira waktu dari batas masukan

Aturan praktis kasar `[perkiraan]`: komputer biasa mengerjakan sekitar 10⁸ operasi sederhana per detik. Dengan anggaran sekitar 10⁸ langkah:

| Kompleksitas | Ukuran masukan terbesar yang masih aman (kira-kira) |
| --- | --- |
| O(n) | puluhan sampai ratusan juta |
| O(n log n) | sekitar 4,5 juta |
| O(n²) | sekitar 10.000 |
| O(2ⁿ) | sekitar 26 |

Contoh: n = 10⁵. Solusi O(n²) butuh sekitar 10¹⁰ langkah atau sekitar 100 detik, terlalu lambat. Solusi O(n log n) butuh sekitar 1,7 juta langkah atau sekitar 0,02 detik, sangat cepat. Contoh lain: n = 10⁶ dengan O(n²) butuh 10¹² langkah, sekitar 10.000 detik atau 2,8 jam.

Pola kerja: **baca batas masukan, perkirakan langkah, pilih bentuk solusi**. Itulah alasan soal pemrograman menyebut batas n.

## Hubungan dengan rekursi

Pada modul sebelumnya, banyak panggilan Fibonacci rekursif tumbuh 1, 3, 5, 9, 15, ... hingga 21.891 pada n = 20. Pertumbuhannya eksponensial: tiap n bertambah satu, banyak panggilan kira-kira dikali 1,6. Karena itu cara langsung tidak layak untuk n besar, dan perlu strategi lain (misalnya menyimpan hasil, dibahas di jalur A kelas XI).

## Contoh kode

### C++17: menghitung langkah (opsional)

**Prediksi dulu.** Sebelum membaca komentar keluaran, tulis tebakanmu: untuk 1.000.000 data terurut dan nilai yang dicari tidak ada, berapa langkah pencarian sekuensial dan berapa langkah pencarian biner? Lalu berapa kali `hitung++` dijalankan untuk m = 100 pada dua perulangan bersarang?

```cpp
#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n = 1000000;
    vector<int> data(n);
    for (int i = 0; i < n; i++) {
        data[i] = i * 2;  // terurut: 0, 2, 4, ...
    }
    int dicari = 2000001;  // lebih besar dari semua data: tidak ada, kasus terburuk

    // Pencarian sekuensial: menghitung langkah.
    long long langkahSekuensial = 0;
    for (int i = 0; i < n; i++) {
        langkahSekuensial++;
        if (data[i] == dicari) {
            break;
        }
    }

    // Pencarian biner: menghitung langkah.
    int kiri = 0;
    int kanan = n - 1;
    int langkahBiner = 0;
    while (kiri <= kanan) {
        langkahBiner++;
        int tengah = kiri + (kanan - kiri) / 2;
        if (data[tengah] == dicari) {
            break;
        } else if (data[tengah] < dicari) {
            kiri = tengah + 1;
        } else {
            kanan = tengah - 1;
        }
    }
    cout << langkahSekuensial << " " << langkahBiner << "\n";  // 1000000 20

    // Dua perulangan bersarang dengan batas yang bergantung: n(n-1)/2.
    int m = 100;
    long long hitung = 0;
    for (int i = 0; i < m; i++) {
        for (int j = 0; j < i; j++) {
            hitung++;
        }
    }
    cout << hitung << "\n";  // 4950
    return 0;
}
```

### TypeScript: tabel pertumbuhan (opsional)

Contoh TypeScript ini diperiksa secara manual oleh penyusun dengan menjalankannya memakai Bun; tidak diperiksa otomatis oleh repositori.

```ts
function langkahBiner(n: number): number {
  let kiri = 0;
  let kanan = n - 1;
  let langkah = 0;
  while (kiri <= kanan) {
    langkah++;
    const tengah = Math.floor((kiri + kanan) / 2);
    kiri = tengah + 1; // kasus terburuk: selalu membuang bagian kiri
  }
  return langkah;
}

for (const n of [7, 1000, 1000000]) {
  console.log(n, langkahBiner(n), Math.floor(Math.log2(n)) + 1); // dua angka terakhir sama
}

console.log("n  log2(n)  n*log2(n)  n^2");
for (const n of [10, 100, 1000]) {
  const log = Math.log2(n);
  console.log(n, log.toFixed(2), Math.round(n * log), n * n);
}

// Berapa kali 1000 dapat dibagi dua sampai tinggal 1?
let h = 1000;
let kali = 0;
while (h > 1) {
  h = Math.floor(h / 2);
  kali++;
}
console.log(kali); // 9
```

## Latihan

### Latihan 1: Logaritma

Berapa kira-kira log₂ 64, log₂ 1.000.000, dan berapa kali 100 dapat dibagi dua (dibulatkan ke bawah) sampai tinggal 1?

### Latihan 2: Menghitung langkah

Berapa kali baris `hitung++` dijalankan? (a) `untuk i dari 1 sampai n: hitung++`, (b) `untuk i dari 1 sampai n: untuk j dari 1 sampai n: hitung++`, (c) `i = 1; selama i < n: hitung++; i = i · 2`, untuk n = 1024.

### Latihan 3: Notasi O

Tuliskan notasi O: (a) 4n + 20, (b) 2n² + 100n, (c) 7, (d) 3n log n + 10n, (e) n(n+1)/2.

### Latihan 4: Pencarian biner

Daftar terurut berisi 100.000 bilangan. Berapa pemeriksaan paling banyak untuk pencarian biner? Untuk sekuensial?

### Latihan 5: Perkiraan waktu

Soal berbatas n sampai 200.000. Solusimu O(n²). Kira-kira berapa langkah dan apakah cukup cepat (anggaran 10⁸ langkah per detik)? Apa alternatifnya?

### Latihan 6: Eksponen

Mencoba semua himpunan bagian dari n anggota butuh 2ⁿ langkah. Pada n berapa nilai ini pertama kali melebihi satu miliar (10⁹)? Petunjuk: 2¹⁰ = 1.024.

### Latihan 7: Bandingkan dua solusi

Solusi P butuh 50n langkah. Solusi Q butuh n² langkah. Untuk n berapa Q lebih cepat? Untuk n berapa P lebih cepat? Apa pelajarannya tentang faktor tetap?

### Latihan 8: Susun program (soal Parsons)

Sembilan baris berikut tercampur. Susun menjadi pencarian biner yang mengembalikan indeks, atau -1 bila tidak ada. Tiap baris dipakai satu kali.

```text
(a) if (data[tengah] < dicari) kiri = tengah + 1; else kanan = tengah - 1;
(b) return -1;
(c) while (kiri <= kanan) {
(d) int cariBiner(const vector<int>& data, int dicari) {
(e) int tengah = kiri + (kanan - kiri) / 2;
(f) }   // menutup fungsi
(g) int kiri = 0, kanan = (int)data.size() - 1;
(h) if (data[tengah] == dicari) return tengah;
(i) }   // menutup perulangan
```

### Latihan 9: Lengkapi kode (soal setengah jadi)

Lengkapi penghitung langkah untuk perulangan yang menggandakan, lalu tulis notasi O-nya:

```text
long long langkah = 0;
for (long long i = 1; i < n; i = i * ____) {
    langkah++;
}
```

### Latihan bercampur dan ulang berjarak

Kerjakan tanpa melihat catatan.

1. Urutkan dari paling lambat tumbuh: n log n, 2ⁿ, n, n², log n, 1. Beri satu contoh program untuk tiap bentuk.
2. Solusi O(n²) untuk n = 50.000 dan anggaran 10⁸ langkah per detik: perkirakan waktunya. Cukupkah?
3. Berapa langkah paling banyak pencarian biner pada 5.000 data?
4. Hanoi butuh 2ⁿ − 1 langkah. Pada n berapa lebih dari 10¹² langkah? Bandingkan dengan Latihan 6.
5. Jelaskan dengan kata-katamu mengapa notasi O membuang faktor tetap, namun faktor tetap tetap penting dalam praktik. (Penjelasan diri.)

Jadwal ulang: jawab lagi tanpa catatan setelah satu hari dan setelah satu minggu; ganti angkanya. Soal ini juga bisa dipakai guru sebagai pemanasan pada minggu pencarian dan pengurutan.

### Kunci singkat

- Latihan 1: log₂ 64 = 6; log₂ 1.000.000 sekitar 19,9; 100 dibagi dua: 50, 25, 12, 6, 3, 1, yaitu 6 kali.
- Latihan 2: (a) n; (b) n²; (c) 10 (untuk i = 1, 2, 4, ..., 512).
- Latihan 3: (a) O(n); (b) O(n²); (c) O(1); (d) O(n log n); (e) O(n²).
- Latihan 4: biner paling banyak ⌊log₂ 100.000⌋ + 1 = 17 (karena log₂ 100.000 sekitar 16,6); sekuensial paling banyak 100.000.
- Latihan 5: n² = 4 x 10¹⁰ langkah, sekitar 400 detik pada 10⁸ langkah per detik: terlalu lambat. Alternatif: bentuk O(n log n) atau O(n).
- Latihan 6: 2³⁰ = 1.073.741.824, sehingga n = 30 (n = 29 memberi 536.870.912).
- Latihan 7: Q lebih cepat untuk n < 50 (n² < 50n); sama pada n = 50; P lebih cepat untuk n > 50. Faktor tetap (50) hanya menentukan titik silang, tetapi pada n besar bentuk (linear versus kuadrat) menang.
- Latihan 8: urutan (d), (g), (c), (e), (h), (a), (i), (b), (f); dua kurung tutup berbeda: (i) menutup perulangan dan (f) menutup fungsi. Pengembalian -1 harus di luar perulangan, setelah semua kemungkinan habis. Bila kamu menaruh `kiri = tengah` tanpa `+ 1`, perulangan bisa tak berhenti; telusuri `data = {2, 4}`, `dicari = 4`.
- Latihan 9: `2`; langkahnya sekitar log₂ n, jadi O(log n). Bila kamu mengisi 1 atau 3, telusuri n = 16 dengan tabel jejak.
- Ingat kembali: 1: 100 = `1100100`; tujuh kali pembagian (100, 50, 25, 12, 6, 3, 1). 2: T(1) = 1, T(n) = 2T(n−1) + 1; T(4) = 15. 3: C(5) = 15. 4: 1023. 5: jumlah n tak terhingga, sedangkan contoh hanya berhingga; contoh n² + n + 41 gagal di n = 40. Bila ada yang salah, ulangi bagian itu di modul asalnya lalu jawab lagi besok.
- Latihan bercampur: 1: 1, log n, n, n log n, n², 2ⁿ; contoh: ambil elemen array, pencarian biner, satu perulangan, merge sort, dua perulangan bersarang, mencoba semua himpunan bagian. 2: (5 x 10⁴)² = 2,5 x 10⁹ langkah, sekitar 25 detik: terlalu lambat. 3: ⌊log₂ 5000⌋ + 1 = 12 + 1 = 13 (log₂ 5000 sekitar 12,3). 4: 2⁴⁰ = 1.099.511.627.776 sedikit di atas 10¹², jadi n = 40 (n = 39 memberi sekitar 5,5 x 10¹¹); bandingkan dengan n = 30 untuk 10⁹: tambahan 10 pada n mengalikan nilai sekitar 1.000. 5: notasi O membandingkan bentuk pertumbuhan pada n besar; dalam praktik 100 kali lebih lambat tetap terasa pada n tertentu.

## Kesalahan umum

- Menganggap O(n²) selalu lebih lambat daripada O(n) pada n kecil; pada n kecil faktor tetap bisa mengubah urutannya.
- Menjalankan pencarian biner pada daftar yang belum terurut.
- Menghitung langkah hanya dari satu perulangan dan lupa perulangan bersarang.
- Menganggap waktu di satu komputer berlaku di semua komputer; yang dibandingkan adalah bentuk pertumbuhan.
- Memakai notasi O sebagai hitungan persis, padahal ia batas atas dan mengabaikan faktor tetap.

## Cek mandiri

- Apa arti log₂ n dalam bahasa "berapa kali dibagi dua"?
- Urutkan dari paling lambat tumbuh: n², log n, 2ⁿ, n, n log n.
- Mengapa pencarian biner butuh sekitar log₂ n langkah, dan apa syaratnya?
- Bagaimana menyederhanakan 5n² + 3n + 9 ke notasi O?
- Mengapa batas masukan penting untuk memilih solusi?

## Langkah berikutnya

Lanjutkan ke pembahasan pencarian dan pengurutan pada minggu terkait, dan nilai solusimu sendiri dengan menghitung langkah sebelum menjalankannya.

Jembatan ke modul OSN: pencarian dan pengurutan ada di modul `search-sort` (rumpun `search-sort`), rekursi di modul `rekursi` (rumpun `rekursi`), dan pemilihan strategi di modul `strategi-problem-solving` (rumpun `strategi-problem-solving`).
