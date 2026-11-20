## Untuk siapa modul ini

Modul ini untuk murid kelas XI jalur B (Web dengan JavaScript, TypeScript, dan Bun), minggu `B-XI1-M9` silabus v1.4.1: strategi algoritmik di TypeScript. Prasyarat: modul `b-xi1-m8` (struktur data kompleks) dan `b-x2-m9` (pengurutan).

Modul ini berstatus DRAF: karangan penyusun, belum ditinjau pemilik. Butir `F-AP-a`, `F-AP-b`, dan `F-BK-b` dipetakan silabus sebagai dipenuhi jalur ini; modul draf ini belum dihitung sebagai pemenuhan butir-butir itu.

Contoh dijalankan penyusun dengan Bun 1.4.4 dan TypeScript 7.0.2 per 2026-11, dan keluaran yang tertempel adalah keluaran asli. Tugas baca-dan-prediksi ditandai `AI: tanpa AI`; selain itu AI generatif boleh dipakai dengan etika dan dicatat, tanpa data pribadi, kata sandi, atau tugas bernilai pada permintaanmu. Soal ditulis penyusun sendiri, bukan salinan soal kompetisi.

## Ingat kembali

Jawab dari ingatan dulu, baru cek di bagian kunci. Soal 1 dari `b-xi1-m8`, soal 2 dari `b-xi1-m6`, soal 3 dari `b-xi1-m1`.

1. Apa fungsi `Set` pada daftar ketetanggaan, dan apa yang terjadi bila `tambahSisi` dipanggil dua kali untuk pasangan yang sama?
2. Mengapa sebuah modul ES yang diimpor di dua berkas hanya dijalankan sekali?
3. Mengapa kesalahan paham kebutuhan makin mahal bila ditemukan makin lambat?

## Tujuan

Setelah modul ini kamu dapat:

- menerapkan strategi greedy dan menunjukkan kapan ia gagal;
- menulis fungsi rekursif dengan kasus dasar dan kasus rekursif yang jelas;
- mempercepat rekursi dengan memoisasi memakai `Map`;
- menjelaskan mengapa sebuah strategi dipilih (keluaran minggu ini: modul strategi).

## Prediksi dulu

Ini tugas baca-dan-prediksi, `AI: tanpa AI`. **Tebak dulu, tulis jawabanmu, baru jalankan.**

```ts
let panggilan = 0;

function fib(n: number): number {
  panggilan++;
  return n < 2 ? n : fib(n - 1) + fib(n - 2);
}

console.log(fib(5), panggilan);
```

1. Berapa nilai `fib(5)`?
2. Berapa kali `fib` dipanggil? Gambar pohon panggilannya dulu.

## Contoh terselesaikan

Keluaran program tadi:

```text
5 15
```

`fib(5)` memanggil `fib(4)` dan `fib(3)`, yang masing-masing memanggil lagi, sehingga `fib(2)` dihitung ulang berkali-kali. Itu **rekursi**: fungsi memanggil dirinya sendiri pada masalah yang lebih kecil, dengan **kasus dasar** (`n < 2`) yang menghentikannya. Tanpa kasus dasar, rekursi tidak pernah berhenti.

**Memoisasi** menyimpan hasil yang sudah dihitung dalam catatan (`Map`) agar tidak dihitung ulang. Bandingkan jumlah panggilan untuk `n = 25`:

```ts
let panggilanBiasa = 0;
let panggilanMemo = 0;

function fibBiasa(n: number): number {
  panggilanBiasa++;
  return n < 2 ? n : fibBiasa(n - 1) + fibBiasa(n - 2);
}

function fibMemo(n: number, catatan = new Map<number, number>()): number {
  panggilanMemo++;
  if (n < 2) return n;
  const ada = catatan.get(n);
  if (ada !== undefined) return ada;
  const hasil = fibMemo(n - 1, catatan) + fibMemo(n - 2, catatan);
  catatan.set(n, hasil);
  return hasil;
}

console.log(fibBiasa(25), panggilanBiasa);
console.log(fibMemo(25), panggilanMemo);
```

```text
75025 242785
75025 49
```

Hasilnya sama, tetapi 242.785 panggilan menjadi 49: tiap nilai dihitung sekali, jadi pekerjaan tumbuh sebanding dengan `n`, bukan berlipat ganda setiap `n` naik satu. Catatan dioper sebagai parameter supaya dipakai bersama oleh semua panggilan rekursif.

**Greedy** adalah strategi memilih yang terbaik *saat ini* di tiap langkah dan tidak pernah menyesal. Contoh: menukar uang dengan koin paling sedikit. Ambil koin terbesar yang masih muat, ulangi.

```ts
function koinGreedy(nominal: number[], target: number): number[] {
  const urut = [...nominal].sort((a, b) => b - a);
  const hasil: number[] = [];
  let sisa = target;
  for (const koin of urut) {
    while (sisa >= koin) {
      hasil.push(koin);
      sisa -= koin;
    }
  }
  return sisa === 0 ? hasil : [];
}

console.log(koinGreedy([1, 5, 10, 25], 63));
console.log(koinGreedy([1, 3, 4], 6));
```

```text
[ 25, 25, 10, 1, 1, 1 ]
[ 4, 1, 1 ]
```

Untuk koin 1, 5, 10, 25 hasilnya enam koin. Untuk koin 1, 3, 4 dan target 6, greedy memberi tiga koin (4, 1, 1), padahal dua koin cukup (3 dan 3). Jadi **greedy tidak selalu optimal**; satu contoh tandingan sudah cukup membantahnya, tetapi tidak ada jumlah contoh yang membuktikannya benar. Untuk koin kedua itu, kita butuh strategi yang mencoba semua pilihan koin dan mengingat hasilnya:

```ts
function koinMinimum(
  nominal: number[],
  target: number,
  catatan = new Map<number, number>(),
): number {
  if (target === 0) return 0;
  const ada = catatan.get(target);
  if (ada !== undefined) return ada;
  let terbaik = Infinity;
  for (const koin of nominal) {
    if (koin <= target) {
      terbaik = Math.min(terbaik, 1 + koinMinimum(nominal, target - koin, catatan));
    }
  }
  catatan.set(target, terbaik);
  return terbaik;
}

console.log(koinMinimum([1, 3, 4], 6));
console.log(koinMinimum([1, 5, 10, 25], 63));
console.log(koinMinimum([2, 4], 7));
```

```text
2
6
Infinity
```

Baris terakhir: target 7 tidak mungkin dibentuk dari 2 dan 4, jadi hasilnya `Infinity`. Pilih strategi dengan alasan: greedy cepat dan sederhana tetapi hanya benar bila ada dasarnya; rekursi dengan memoisasi lebih umum dan lebih lambat.

## Contoh setengah jadi

Lengkapi fungsi rekursif `faktorial` (hasil kali 1 sampai `n`, dan `faktorial(0)` adalah 1).

```ts setengah-jadi
function faktorial(n: number): number {
  if (n === ____) return ____;
  return n * faktorial(____);
}
```

## Soal Parsons

Susun baris-baris berikut (sudah diacak) menjadi `fibMemo` yang benar. `AI: tanpa AI`.

```text
(a) const hasil = fibMemo(n - 1, catatan) + fibMemo(n - 2, catatan);
(b) if (n < 2) return n;
(c) catatan.set(n, hasil);
(d) const ada = catatan.get(n);
(e) return hasil;
(f) if (ada !== undefined) return ada;
```

## Latihan

1. `AI: tanpa AI` **Telusuri.** Untuk `fibMemo(5)`, tuliskan urutan panggilan dan hitung berapa kali fungsi dipanggil.
2. `AI: boleh` **Contoh tandingan.** Cari tahu apakah greedy optimal untuk koin 1, 6, 10 dan target 12. Tunjukkan dengan program.
3. `AI: boleh` **Rekursi.** Tulis `jumlahDigit(n)` (jumlah angka penyusun bilangan bulat tak negatif) dan `pangkat(basis, eksponen)` secara rekursif. Tulis kasus dasarnya dulu.
4. `AI: boleh` **Tulis pseudocode dulu**, lalu kode: dari daftar kegiatan `[mulai, selesai]` yang tidak boleh bertabrakan, pilih sebanyak mungkin dengan strategi "pilih yang paling cepat selesai". Uji dengan `[[1, 3], [2, 5], [4, 7], [6, 8], [7, 10], [9, 11]]`.
5. *Opsional:* **catatan pemakaian AI.** Kerjakan nomor 4 sendiri dulu, lalu minta petunjuk bertahap, bukan jawaban jadi. Catat alatnya, tujuanmu, garis besar perintahmu, bagian yang kamu pakai, dan cara memeriksanya (bandingkan dengan hitungan tanganmu). Jangan menaruh data pribadi atau tugas bernilai pada perintah.

## Latihan bercampur

1. `AI: boleh` (dari `b-xi1-m8`) Ubah `koinGreedy` agar nominal ganda dibuang lebih dulu dengan `Set`. Apa yang berubah pada hasil untuk `[1, 1, 5]` dan target 7?
2. `AI: boleh` (dari `b-xi1-m7`) Tulis uji `bun test` untuk `koinGreedy` dengan dua kasus: koin 1, 5, 10, 25 target 63 (enam koin), dan koin 1, 3, 4 target 6 (kamu harapkan dua koin). Uji mana yang gagal, dan apa artinya?

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `b-xi1-m10` (pertanyaan 1), sekitar tiga minggu lagi di `b-xi1-m12` (pertanyaan 2), dan sekitar delapan minggu lagi di semester berikutnya, modul `b-xi2-m3` (pertanyaan 3). Jawab sekarang lalu simpan.

1. Beri contoh data yang membuat strategi greedy untuk menukar uang tidak optimal, dan jelaskan mengapa satu contoh tandingan cukup membantah strategi itu.
2. Apa dua bagian yang harus ada pada fungsi rekursif, dan apa yang terjadi bila salah satunya hilang?
3. Apa yang disimpan memoisasi, dan di mana catatannya harus dibuat agar bekerja?

## Kesalahan umum

- **Mengira greedy selalu benar.** Cocok untuk koin 1, 5, 10, 25 tetapi gagal untuk 1, 3, 4. Periksa dengan contoh tandingan sebelum percaya.
- **Tanpa kasus dasar atau salah arah.** Pada percobaan penyusun, `1 + hitungMundur(n - 1)` tanpa kasus dasar menghasilkan `RangeError` dengan pesan `Maximum call stack size exceeded.`. Fungsi yang hanya berisi `return hitungMundur(n - 1)` malah tidak berhenti selama dua menit (penyebabnya tidak diselidiki penyusun `[belum terverifikasi]`); hentikan dengan Ctrl+C.
- **Membuat catatan di dalam fungsi.** Bila `new Map()` dibuat di badan `fibKeliru` pada tiap panggilan, hasilnya tetap benar tetapi panggilannya 242.785 untuk `n = 25`, sama seperti tanpa memoisasi pada percobaan penyusun. Catatan harus dibuat sekali di luar rekursi atau dioper sebagai parameter.
- **Memoisasi tanpa memeriksa `undefined`.** `get` mengembalikan `undefined` bila belum ada; periksa dengan `!== undefined`, bukan dengan kebenaran nilai, karena hasil `0` adalah nilai sah.
- **Mencampur penelusuran dengan keyakinan.** Kode yang menghasilkan angka masuk akal belum tentu benar untuk semua masukan; uji beberapa kasus, termasuk yang tidak mungkin (seperti target 7 dengan koin 2 dan 4).

## Cek mandiri

- [ ] Saya dapat menjelaskan greedy dan memberi contoh tandingan.
- [ ] Saya dapat menulis fungsi rekursif dengan kasus dasar dan menelusurinya.
- [ ] Saya dapat menambahkan memoisasi dengan `Map` dan menjelaskan manfaatnya.
- [ ] Saya dapat memberi alasan memilih satu strategi dibanding yang lain.
- [ ] Soal yang saya kerjakan ditulis atau dipahami sendiri, bukan disalin.

## Kunci dan petunjuk

**Ingat kembali.** 1: `Set` menjaga tiap teman hanya sekali; pemanggilan kedua tidak mengubah apa pun. 2: karena modul dimuat dan dijalankan sekali lalu hasilnya dipakai bersama. 3: kesalahan di kebutuhan memengaruhi rancangan, kode, uji, dan dokumen sekaligus.

**Prediksi dulu.** 1: 5. 2: 15 panggilan; `fib(2)` dihitung tiga kali dan `fib(3)` dua kali.

**Contoh setengah jadi.** Isi berurutan: `0`, `1`, `n - 1`. Kuncinya dijalankan penyusun:

```ts
function faktorial(n: number): number {
  if (n === 0) return 1;
  return n * faktorial(n - 1);
}

console.log(faktorial(0), faktorial(5));
```

```text
1 120
```

**Soal Parsons.** Urutan benar: b, d, f, a, c, e. Kasus dasar dulu (b), lalu cek catatan (d, f), baru hitung (a), simpan (c), dan kembalikan (e).

**Latihan.** 1: urutan panggilan: 5, 4, 3, 2, 1, 0 (turun sampai kasus dasar), lalu 1 (cabang kanan `fibMemo(3)`), 2 (dari catatan, cabang kanan `fibMemo(4)`), dan 3 (dari catatan, cabang kanan `fibMemo(5)`). Total 9 panggilan (dijalankan penyusun: `5 9`). 2: `[10, 1, 1]` (tiga koin) tetapi `[6, 6]` (dua koin) lebih baik; dijalankan penyusun:

```ts
import { koinGreedy } from "./koin-lib";
import { koinMinimum } from "./minimum-lib";
console.log(koinGreedy([1, 6, 10], 12), koinMinimum([1, 6, 10], 12));
```

```text
[ 10, 1, 1 ] 2
```

(`koin-lib` dan `minimum-lib` adalah fungsi di atas yang diberi `export`.) 3: contoh jawaban, dijalankan penyusun:

```ts
function jumlahDigit(n: number): number {
  if (n < 10) return n;
  return (n % 10) + jumlahDigit(Math.floor(n / 10));
}

function pangkat(basis: number, eksponen: number): number {
  if (eksponen === 0) return 1;
  return basis * pangkat(basis, eksponen - 1);
}

console.log(jumlahDigit(4082), pangkat(2, 10));
```

```text
14 1024
```

4: pseudocode: urutkan kegiatan menurut waktu selesai; `selesaiTerakhir` awalnya sangat kecil; untuk tiap kegiatan, bila `mulai >= selesaiTerakhir`, pilih dan perbarui `selesaiTerakhir`. Contoh jawaban, dijalankan penyusun:

```ts
function pilihKegiatan(kegiatan: [number, number][]): [number, number][] {
  const urut = [...kegiatan].sort((a, b) => a[1] - b[1]);
  const dipilih: [number, number][] = [];
  let selesaiTerakhir = -Infinity;
  for (const k of urut) {
    if (k[0] >= selesaiTerakhir) {
      dipilih.push(k);
      selesaiTerakhir = k[1];
    }
  }
  return dipilih;
}

console.log(
  pilihKegiatan([[1, 3], [2, 5], [4, 7], [6, 8], [7, 10], [9, 11]]),
);
```

```text
[
  [ 1, 3 ], [ 4, 7 ], [ 7, 10 ]
]
```

Tiga kegiatan terpilih; coba jelaskan dengan kata-katamu mengapa memilih yang paling cepat selesai menyisakan paling banyak ruang. Itu alasan, bukan bukti; bukti lengkap ada di luar tingkat modul ini.

**Latihan bercampur.** 1: `new Set(nominal)` membuang nominal ganda, bukan koin yang dipakai berulang; untuk `[1, 1, 5]` dan target 7 hasilnya tetap `[5, 1, 1]`, jadi tidak ada yang berubah (hanya nominal `1` tidak lagi diproses dua kali). 2: uji kedua gagal; keluaran asli dijalankan penyusun (alamat berkas diringkas):

```text
bun test v1.4.4 (38afee6c8)

koin.test.ts:
4 | test("63 dengan koin 1, 5, 10, 25 memakai 6 koin", () => {
5 |   expect(koinGreedy([1, 5, 10, 25], 63).length).toBe(6);
6 | });
7 | 
8 | test("6 dengan koin 1, 3, 4 seharusnya cukup 2 koin", () => {
9 |   expect(koinGreedy([1, 3, 4], 6).length).toBe(2);
                                              ^
error: expect(received).toBe(expected)

Expected: 2
Received: 3

      at <anonymous> (.../koin.test.ts:9:43)
(fail) 6 dengan koin 1, 3, 4 seharusnya cukup 2 koin [0.38ms]

 1 pass
 1 fail
 2 expect() calls
Ran 2 tests across 1 file. [3.00ms]
```

Uji yang gagal bukan kesalahan uji: ia menangkap cacat strategi (greedy tidak optimal untuk koin itu).

**Ulang berjarak.** 1: koin 1, 3, 4 dengan target 6: greedy memberi 4+1+1 (tiga koin) padahal 3+3 (dua koin); cukup satu contoh karena klaim "selalu optimal" menjadi salah. 2: kasus dasar yang menghentikan dan kasus rekursif yang memperkecil masalah; tanpa kasus dasar terjadi `RangeError` (atau tidak berhenti). 3: hasil yang sudah dihitung, dengan kunci masalahnya (mis. `n`); catatan dibuat sekali di luar rekursi atau dioper sebagai parameter, bukan dibuat ulang tiap panggilan.

## Langkah berikutnya

Modul berikut: `b-xi1-m10` (efisiensi dan alternatif solusi), yang mengukur waktu dua solusi untuk soal yang sama. Modul terkait: `matkom-induksi-dan-rekursi-matematis`. Bacaan lanjut: halaman MDN tentang rekursi dan memoisasi (daftar istilah), dan tentang `Map`.
