## Untuk siapa modul ini

Modul ini untuk murid kelas X jalur B (Web dengan JavaScript, TypeScript, dan Bun), minggu `B-X2-M1` silabus v1.4.1: array. Prasyarat: modul `b-x1-m12` (fungsi), yang berarti kamu sudah memakai variabel, percabangan, perulangan, dan fungsi di semester 1.

Modul ini berstatus DRAF: karangan penyusun, belum ditinjau pemilik. Butir `E-BK-d` (solusi program sederhana dalam format pseudocode) dipetakan silabus sebagai dipenuhi jalur ini; modul draf ini belum dihitung sebagai pemenuhan butir itu.

Contoh dijalankan penyusun dengan Bun 1.4.4 per 2026-11. Tugas baca-dan-prediksi ditandai `AI: tanpa AI` karena tujuannya melatih membaca kode sendiri. Selain itu AI generatif boleh dipakai dengan etika dan dicatat, tanpa data pribadi, kata sandi, atau tugas bernilai pada permintaanmu. Saran: jawab dulu sendiri, baru minta penjelasan atau petunjuk bertahap.

## Ingat kembali

Jawab dari ingatan, baru cek di bagian kunci. Soal 1 dari `b-x1-m10`, soal 2 dari `b-x1-m12`, soal 3 dari `b-x1-m8`, soal 4 dari `b-x1-m11`.

1. Tulis kondisi JavaScript yang benar bila bilangan `n` genap.
2. Tulis fungsi panah `duaKali` yang mengembalikan dua kali parameternya.
3. Apa itu algoritma? Tulis pseudocode untuk menukar dua nilai dari ingatan.
4. Berapa kali blok `for (let i = 0; i < 5; i++)` berjalan, dan berapa nilai `i` pada putaran terakhir?

## Tujuan

Setelah modul ini kamu dapat:

- membuat array dan membaca elemennya lewat indeks yang dimulai dari 0, serta memakai `length`;
- menambah dan mengambil elemen dengan `push` dan `pop`;
- menelusuri array dengan `for` dan `for...of`;
- memakai `map`, `filter`, dan `reduce` untuk mengubah, menyaring, dan merangkum array;
- menulis skrip array (keluaran minggu ini), misalnya menghitung rata-rata dan menyaring nilai.

## Prediksi dulu

Array adalah daftar nilai berurutan dalam kurung siku. Setiap elemen punya nomor urut yang disebut indeks, dan indeks pertama adalah 0. `length` adalah banyaknya elemen. Baca skrip ini dan **tebak dulu, tulis jawabanmu per baris, baru jalankan**.

```js
// prediksi-array.js
const buah = ["apel", "jeruk", "mangga"];
console.log(buah[0]);
console.log(buah[2]);
console.log(buah.length);
console.log(buah[3]);
buah.push("pisang");
console.log(buah.length);
console.log(buah[buah.length - 1]);
const angka = [1, 2, 3, 4];
console.log(angka.map((x) => x * 10));
```

1. Apa yang tercetak pada tiap baris?
2. `buah` dideklarasikan dengan `const`, tetapi `push` berhasil. Apa yang kamu simpulkan tentang `const` pada array?
3. Mengapa elemen terakhir ditulis `buah[buah.length - 1]`?

## Contoh terselesaikan

Keluaran skrip prediksi di atas:

```text
apel
mangga
3
undefined
4
pisang
[ 10, 20, 30, 40 ]
```

`buah[3]` tidak ada pada array tiga elemen, sehingga hasilnya `undefined`. Menurut dokumentasi MDN, `push` menambah elemen di akhir array dan mengembalikan panjang barunya, sedangkan `pop` mengambil elemen terakhir dan mengembalikannya.

**Tiga metode.** `map` menghasilkan array baru dari hasil fungsi pada tiap elemen. `filter` menghasilkan array baru berisi elemen yang lolos uji fungsi. `reduce` merangkum seluruh array menjadi satu nilai; ia menerima fungsi dengan dua parameter (akumulator dan elemen) dan nilai awal. Ketiganya tidak mengubah array asli. Skrip di bawah memakai nilai karangan dan membandingkan `for...of` dengan `reduce`.

```js
// array-nilai.js
const nilai = [80, 65, 90, 70, 55];

let jumlah = 0;
for (const n of nilai) {
  jumlah += n;
}
console.log("rata-rata (for):", jumlah / nilai.length);

const total = nilai.reduce((akumulator, n) => akumulator + n, 0);
console.log("rata-rata (reduce):", total / nilai.length);

const lulus = nilai.filter((n) => n >= 70);
console.log("lulus:", lulus);

const naik = nilai.map((n) => n + 5);
console.log("naik 5:", naik);
console.log("asli:", nilai);
```

Keluarannya:

```text
rata-rata (for): 72
rata-rata (reduce): 72
lulus: [ 80, 90, 70 ]
naik 5: [ 85, 70, 95, 75, 60 ]
asli: [ 80, 65, 90, 70, 55 ]
```

Penelusuran `reduce` pada `nilai` dengan nilai awal 0:

| Elemen `n` | `akumulator` sebelum | hasil `akumulator + n` |
| --- | --- | --- |
| 80 | 0 | 80 |
| 65 | 80 | 145 |
| 90 | 145 | 235 |
| 70 | 235 | 305 |
| 55 | 305 | 360 |

Hasil akhirnya 360, dan `360 / 5` adalah 72. Baris terakhir keluaran menunjukkan array asli tidak berubah oleh `map` dan `filter`.

## Contoh setengah jadi

Lengkapi bagian `____` agar `genap` berisi `[2, 4]` dan `jumlahKuadrat` bernilai 30 (yaitu 1 + 4 + 9 + 16).

```js setengah-jadi
// array-setengah.js
const angka = [1, 2, 3, 4];
const genap = angka.filter((x) => x ____ 2 === 0);
console.log(genap);
const jumlahKuadrat = angka.map((x) => ____).reduce((a, b) => ____, 0);
console.log(jumlahKuadrat);
```

## Soal Parsons

Susun baris-baris di bawah (sudah diacak) menjadi fungsi `rataRata(daftar)` yang mengembalikan rata-rata elemen array.

```text
(a)   return jumlah / daftar.length;
(b)   for (const n of daftar) {
(c) function rataRata(daftar) {
(d)     jumlah += n;
(e)   let jumlah = 0;
(f) }
(g)   }
```

## Latihan

1. `AI: tanpa AI` **Baca dan prediksi.** Tanpa menjalankan, tulis apa yang tercetak:

   ```js
   const a = [5, 3, 8];
   const b = a;
   b.push(1);
   console.log(a.length);
   const c = a.map((x) => x * 2);
   console.log(c, a);
   console.log(a.filter((x) => x > 4).length);
   console.log(a[a.length - 1]);
   ```
2. `AI: boleh` **Rata-rata.** Tulis pseudocode lalu fungsi `rataRata(daftar)`. Uji dengan `[80, 65, 90]` dan dengan array kosong, lalu jelaskan hasil yang kedua.
3. `AI: boleh` **Saring nilai.** Dari `[80, 65, 90, 70, 55, 72]` (nilai karangan), cetak nilai yang lebih dari atau sama dengan 70 dan banyaknya, memakai `filter`.
4. `AI: boleh` **Terbesar.** Tulis fungsi `terbesar(daftar)` dengan `for...of` tanpa `Math.max`, lalu tulis versi `reduce`-nya. Uji dengan `[4, 9, 2]` dan `[-5, -2, -9]`.
5. *Opsional:* **catatan pemakaian AI.** Bila memakai AI generatif, jawab nomor 4 sendiri dulu, lalu minta penjelasan atau petunjuk bertahap, bukan skrip jadi. Catat alatnya, tujuanmu, garis besar perintahmu, bagian yang kamu pakai, dan cara memeriksanya (uji dengan array yang hasilnya kamu tahu). Jangan menaruh data pribadi atau tugas bernilai pada perintah.

## Latihan bercampur

1. Tukar `daftar[0]` dan `daftar[1]` pada `["a", "b", "c"]` memakai satu variabel sementara (dari `b-x1-m8`), lalu cetak array-nya.
2. Isi array `kuadrat` dengan 1, 4, 9, 16, 25 memakai `for` dan `push` (dari `b-x1-m11`).
3. Tulis fungsi `jumlahGenap(angka)` yang memakai `filter` dan `reduce` untuk menjumlahkan elemen genap (dari `b-x1-m10` dan `b-x1-m12`). Uji dengan `[1, 2, 3, 4, 5, 6]`.

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `b-x2-m2` (pertanyaan 1), sekitar tiga minggu lagi di `b-x2-m4` (pertanyaan 2), dan sekitar delapan minggu lagi, modul `b-x2-m9` (pertanyaan 3). Jawab sekarang lalu simpan.

1. Apa indeks elemen pertama sebuah array, dan ekspresi apa yang memberi elemen terakhir dari `daftar`?
2. Apa beda `map` dan `filter`? Tulis keduanya untuk `[1, 2, 3, 4]`: kuadratkan, dan ambil yang genap.
3. Tulis kode yang menukar `daftar[0]` dengan `daftar[1]` memakai satu variabel sementara.

## Kesalahan umum

- **Salah satu di batas indeks.** `daftar[daftar.length]` selalu `undefined`, karena indeks terakhir adalah `length - 1`. Pada perulangan, `i <= daftar.length` membaca satu elemen terlalu banyak.
- **Mengira `const` membuat isi array tidak bisa berubah.** `const` hanya melarang mengisi ulang variabelnya; isi array tetap bisa diubah dengan `push`.
- **Mengira `b = a` menyalin array.** Keduanya menunjuk array yang sama, sehingga `b.push(1)` juga mengubah isi `a`.
- **Membandingkan array dengan `===`.** `[1, 2] === [1, 2]` bernilai `false` karena yang dibandingkan adalah array yang sama atau bukan, bukan isinya.
- **`reduce` tanpa nilai awal pada array kosong.** Menurut dokumentasi MDN, ini melempar `TypeError`; tulis nilai awal, misalnya `reduce((a, b) => a + b, 0)`.
- **Lupa menyimpan hasil `map`.** `map` tidak mengubah array asli; hasilnya hilang bila tidak ditaruh di variabel.

## Cek mandiri

- [ ] Saya dapat membuat array dan membaca elemennya lewat indeks, termasuk elemen terakhir.
- [ ] Saya dapat memakai `push`, `pop`, dan `length`.
- [ ] Saya dapat menelusuri array dengan `for` dan `for...of`.
- [ ] Saya dapat menulis `map`, `filter`, dan `reduce` dan menjelaskan bedanya.
- [ ] Saya menguji fungsi array dengan array kosong.
- [ ] Saya menulis pseudocode sebelum fungsinya.

## Kunci dan petunjuk

**Ingat kembali.** 1: `n % 2 === 0`. 2: `const duaKali = (x) => x * 2;`. 3: algoritma adalah urutan langkah untuk menyelesaikan masalah; pseudocode tukar: `SEMENTARA = A`, `A = B`, `B = SEMENTARA`. 4: lima kali; `i` terakhir 4.

**Prediksi dulu.** 1: `apel`, `mangga`, `3`, `undefined`, `4`, `pisang`, `[ 10, 20, 30, 40 ]`. 2: `const` melarang mengisi ulang variabel `buah`, tetapi tidak melarang mengubah isi array. 3: indeks terakhir selalu satu lebih kecil dari `length`, karena indeks mulai dari 0.

**Contoh setengah jadi.** Isian berurutan: `%`; `x * x`; `a + b`. Kuncinya, yang dijalankan:

```js
// array-kunci.js
const angka = [1, 2, 3, 4];
const genap = angka.filter((x) => x % 2 === 0);
console.log(genap);
const jumlahKuadrat = angka.map((x) => x * x).reduce((a, b) => a + b, 0);
console.log(jumlahKuadrat);
```

Keluarannya:

```text
[ 2, 4 ]
30
```

**Soal Parsons.** Urutan benar: c, e, b, d, g, a, f. Baris (g) menutup `for` dan (f) menutup fungsi; `return` harus berada setelah perulangan selesai.

**Latihan.** 1: `4` (`b` dan `a` satu array yang sama, sehingga `push(1)` menambah elemen keempat), lalu `[ 10, 6, 16, 2 ] [ 5, 3, 8, 1 ]`, lalu `2` (hanya 5 dan 8 yang lebih dari 4), lalu `1`. 2: pseudocode: `JUMLAH = 0`; `UNTUK TIAP N DI DAFTAR: JUMLAH = JUMLAH + N`; `KEMBALIKAN JUMLAH / BANYAK DAFTAR`. Kunci yang dijalankan:

```js
// rata-rata.js
function rataRata(daftar) {
  let jumlah = 0;
  for (const n of daftar) {
    jumlah += n;
  }
  return jumlah / daftar.length;
}
console.log(rataRata([80, 65, 90]));
console.log(rataRata([]));
```

```text
78.33333333333333
NaN
```

Pada array kosong jumlahnya 0 dan banyaknya 0, sehingga `0 / 0` menghasilkan `NaN`. Fungsi yang baik memutuskan sendiri apa yang dikembalikan untuk array kosong. 3: `nilai.filter((n) => n >= 70)` memberi `[80, 90, 70, 72]`, banyaknya 4. 4: kunci yang dijalankan:

```js
// terbesar.js
function terbesar(daftar) {
  let maks = daftar[0];
  for (const n of daftar) {
    if (n > maks) {
      maks = n;
    }
  }
  return maks;
}
console.log(terbesar([4, 9, 2]));
console.log(terbesar([-5, -2, -9]));
console.log(terbesar([]));
const viaReduce = [4, 9, 2].reduce((m, n) => (n > m ? n : m));
console.log(viaReduce);
```

```text
9
-2
undefined
9
```

Maks awal diambil dari elemen pertama, bukan 0, agar array berisi bilangan negatif tetap benar. Array kosong menghasilkan `undefined`.

**Latihan bercampur.** Kunci yang dijalankan:

```js
// campur-array.js
const daftar = ["a", "b", "c"];
const sementara = daftar[0];
daftar[0] = daftar[1];
daftar[1] = sementara;
console.log(daftar);

const kuadrat = [];
for (let i = 1; i <= 5; i++) {
  kuadrat.push(i * i);
}
console.log(kuadrat);

function jumlahGenap(angka) {
  return angka.filter((n) => n % 2 === 0).reduce((a, b) => a + b, 0);
}
console.log(jumlahGenap([1, 2, 3, 4, 5, 6]));
```

```text
[ "b", "a", "c" ]
[ 1, 4, 9, 16, 25 ]
12
```

**Ulang berjarak.** 1: indeks 0; `daftar[daftar.length - 1]`. 2: `map` menghasilkan array sama panjang dari hasil fungsi (`[1, 2, 3, 4].map((x) => x * x)` memberi `[1, 4, 9, 16]`); `filter` menyaring elemen yang lolos uji (`[1, 2, 3, 4].filter((x) => x % 2 === 0)` memberi `[2, 4]`). 3: `const sementara = daftar[0]; daftar[0] = daftar[1]; daftar[1] = sementara;`.

## Langkah berikutnya

Modul berikut: `b-x2-m2` (string dan templat), yang memperlakukan teks seperti array karakter dan memakai banyak metode yang mirip. Bacaan lanjut: halaman MDN tentang `Array` beserta `map`, `filter`, dan `reduce`.
