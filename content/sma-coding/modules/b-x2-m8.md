## Untuk siapa modul ini

Modul ini untuk murid kelas X jalur B (Web dengan JavaScript, TypeScript, dan Bun), minggu `B-X2-M8` silabus v1.4.1: pencarian sekuensial dan biner. Prasyarat: modul `b-x2-m7` (tumpukan dan antrian) dan `b-x2-m1` (array).

Modul ini berstatus DRAF: karangan penyusun, belum ditinjau pemilik. Butir `E-BK-a` (konsep struktur data dan algoritma standar) dan `E-BK-c` (menerapkan algoritma dan struktur data standar) dipetakan silabus sebagai dipenuhi jalur ini; modul draf ini belum dihitung sebagai pemenuhan kedua butir itu.

Contoh dijalankan penyusun dengan Bun 1.4.4 per 2026-11. Tugas baca-dan-prediksi ditandai `AI: tanpa AI`; selain itu AI generatif boleh dipakai dengan etika dan dicatat, tanpa data pribadi, kata sandi, atau tugas bernilai pada permintaanmu. Tiap soal `Latihan` bertanda `AI: boleh` atau `AI: tanpa AI`.

## Ingat kembali

Jawab dari ingatan dulu, baru cek di bagian kunci. Soal 1 dari `b-x2-m7`, soal 2 dari `b-x2-m5`, soal 3 dari `b-x1-m13`.

1. Apa beda LIFO dan FIFO? Beri satu contoh sehari-hari untuk masing-masing.
2. Mengapa `#khusus` mengalahkan `.penting` dan `.penting` mengalahkan `p`, walaupun urutan penulisannya berbeda?
3. Berapa tebakan terbanyak yang cukup untuk menemukan angka 1 sampai 100 bila selalu menebak tengah-tengah rentang?

## Tujuan

Setelah modul ini kamu dapat:

- menulis pencarian sekuensial yang mengembalikan indeks atau -1;
- menyebut syarat pencarian biner, lalu menulisnya dengan `kiri`, `kanan`, dan `tengah`;
- menelusuri pencarian biner dengan tabel nilai tiap langkah;
- membandingkan banyak langkah kedua pencarian pada data yang makin besar (keluaran minggu ini: skrip pencarian dan permainan tebak angka dengan cara biner).

## Prediksi dulu

Ini tugas baca-dan-prediksi, `AI: tanpa AI`. **Tebak dulu, tulis jawabanmu, baru jalankan.** Fungsi `cariIndeks` memeriksa elemen satu per satu dan mengembalikan objek berisi indeks pertama yang berisi `x` (atau -1) dan banyak perbandingan yang dilakukan. Baris terakhir memakai `indexOf` bawaan array.

```js
// prediksi-cari.js
function cariIndeks(daftar, x) {
  let banding = 0;
  for (let i = 0; i < daftar.length; i++) {
    banding++;
    if (daftar[i] === x) {
      return { indeks: i, banding: banding };
    }
  }
  return { indeks: -1, banding: banding };
}

const data = [4, 9, 7, 1, 7];
const a = cariIndeks(data, 7);
console.log(a.indeks, a.banding);
const b = cariIndeks(data, 5);
console.log(b.indeks, b.banding);
console.log(data.indexOf(7), data.indexOf(5));
```

1. Apa yang tercetak pada tiap baris?
2. Angka 7 muncul dua kali. Mengapa fungsi hanya melaporkan satu indeks?

## Contoh terselesaikan

Keluaran skrip prediksi (`bun run prediksi-cari.js`):

```text
2 3
-1 5
2 -1
```

Fungsi itu adalah **pencarian sekuensial**: periksa elemen satu per satu dari awal dan berhenti begitu ketemu. Mencari 7 selesai di indeks 2 setelah 3 perbandingan. Mencari 5, yang tidak ada, memeriksa semua 5 elemen. Kasus terbaik 1 perbandingan; kasus terburuk sebanyak data. Menurut MDN, `indexOf` membandingkan dengan `===` dan mengembalikan -1 bila tidak ada, jadi hasilnya sama; kamu menulis sendiri supaya bisa menghitung langkahnya.

**Pencarian biner** menuntut satu syarat: data **sudah terurut**. Dengan syarat itu, satu perbandingan di tengah membuang separuh data. Bila nilai di tengah lebih kecil dari yang dicari, semua elemen di kirinya pasti lebih kecil juga, jadi bagian itu dibuang. Simpan dua batas, `kiri` dan `kanan`, yang membatasi bagian yang masih mungkin berisi `x`. Ulangi selama `kiri <= kanan`, seperti pseudocode berikut:

```text
KIRI = 0, KANAN = banyak data - 1
SELAMA KIRI <= KANAN:
  TENGAH = pembulatan ke bawah dari (KIRI + KANAN) / 2
  JIKA data[TENGAH] = X: kembalikan TENGAH
  JIKA data[TENGAH] < X: KIRI = TENGAH + 1
  JIKA TIDAK: KANAN = TENGAH - 1
kembalikan -1
```

Skrip berikut mencari tiga nilai pada data terurut dan mencetak banyak langkah tiap pencarian. `Math.floor` diperlukan karena `/ 2` bisa menghasilkan pecahan.

```js
// biner.js
function cariBiner(terurut, x) {
  let kiri = 0;
  let kanan = terurut.length - 1;
  let langkah = 0;
  while (kiri <= kanan) {
    langkah++;
    const tengah = Math.floor((kiri + kanan) / 2);
    if (terurut[tengah] === x) {
      return { indeks: tengah, langkah: langkah };
    } else if (terurut[tengah] < x) {
      kiri = tengah + 1;
    } else {
      kanan = tengah - 1;
    }
  }
  return { indeks: -1, langkah: langkah };
}

const data = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91];
for (const x of [23, 91, 40]) {
  const h = cariBiner(data, x);
  if (h.indeks === -1) {
    console.log(x, "tidak ada,", h.langkah, "langkah");
  } else {
    console.log(x, "di indeks", h.indeks + ",", h.langkah, "langkah");
  }
}
```

Keluarannya:

```text
23 di indeks 5, 3 langkah
91 di indeks 9, 4 langkah
40 tidak ada, 4 langkah
```

Telusuri `23`: `kiri = 0`, `kanan = 9`, `tengah = 4` berisi 16, lebih kecil, sehingga `kiri = 5`. Lalu `tengah = 7` berisi 56, lebih besar, sehingga `kanan = 6`. Lalu `tengah = 5` berisi 23: ketemu pada langkah ketiga.

Seberapa besar bedanya dengan sekuensial? Skrip berikut mencari 7, yang pasti tidak ada pada data `0, 2, 4, ...`, dengan data yang makin banyak. Pencarian sekuensial pada kasus terburuk memeriksa semua `n` data.

```js
// banding.js
function cariBiner(terurut, x) {
  let kiri = 0;
  let kanan = terurut.length - 1;
  let langkah = 0;
  while (kiri <= kanan) {
    langkah++;
    const tengah = Math.floor((kiri + kanan) / 2);
    if (terurut[tengah] === x) {
      return { indeks: tengah, langkah: langkah };
    } else if (terurut[tengah] < x) {
      kiri = tengah + 1;
    } else {
      kanan = tengah - 1;
    }
  }
  return { indeks: -1, langkah: langkah };
}

for (const n of [1000, 2000, 4000, 1000000]) {
  const data = [];
  for (let i = 0; i < n; i++) {
    data.push(2 * i);
  }
  const h = cariBiner(data, 7);
  console.log("n =", n + ": sekuensial", n, "langkah, biner", h.langkah, "langkah");
}
```

Keluarannya:

```text
n = 1000: sekuensial 1000 langkah, biner 10 langkah
n = 2000: sekuensial 2000 langkah, biner 11 langkah
n = 4000: sekuensial 4000 langkah, biner 12 langkah
n = 1000000: sekuensial 1000000 langkah, biner 20 langkah
```

Pada sekuensial, data dua kali lebih banyak berarti langkah dua kali lebih banyak: naik secara linear. Pada biner, data dua kali lebih banyak hanya menambah satu langkah, karena satu langkah lagi cukup untuk membuang separuh data tambahan. Karena itu mengurutkan data lebih dulu sering sepadan bila pencarian dilakukan berkali-kali (`b-x2-m9`).

## Contoh setengah jadi

Lengkapi bagian `____` pada pencarian biner berikut. Fungsi ini hanya mengembalikan indeks.

```js setengah-jadi
// biner-setengah.js
function cariBiner(terurut, x) {
  let kiri = 0;
  let kanan = terurut.length - 1;
  while (kiri ____ kanan) {
    const tengah = Math.floor((kiri + kanan) / ____);
    if (terurut[tengah] === x) {
      return ____;
    } else if (terurut[tengah] < x) {
      kiri = ____;
    } else {
      kanan = ____;
    }
  }
  return -1;
}
```

## Soal Parsons

Susun delapan baris berikut (sudah diacak) menjadi badan satu putaran `while` pencarian biner. `AI: tanpa AI`: tujuannya melatih membaca urutan.

```text
(a)     kiri = tengah + 1;
(b)   const tengah = Math.floor((kiri + kanan) / 2);
(c)     return tengah;
(d)   } else {
(e)     kanan = tengah - 1;
(f)   } else if (terurut[tengah] < x) {
(g)   if (terurut[tengah] === x) {
(h)   }
```

## Latihan

1. `AI: boleh` **Pseudocode dulu.** Tulis pseudocode lalu skrip: untuk tiap `x` dalam `[7, 5, 4]`, cetak indeks pertama kemunculannya di `[4, 9, 7, 1, 7]` atau -1, memakai pencarian sekuensial tulisanmu sendiri.
2. `AI: tanpa AI` **Telusuri.** Pada data `[3, 8, 14, 21, 27, 35, 49]`, telusuri pencarian biner untuk `35` lalu untuk `10`. Tulis tabel `kiri`, `kanan`, `tengah`, dan nilai di tengah pada tiap langkah.
3. `AI: boleh` **Tebak angka biner.** Angka rahasia 1 sampai 100 diberikan sebagai argumen (`bun run tebak-biner.js 73`, dibaca dengan `Number(Bun.argv[2])`). Tulis skrip yang menebak dengan membagi dua daerah tebakan dan mencetak tiap tebakan beserta penilaiannya (`terlalu kecil`, `terlalu besar`, atau `tepat`). Uji dengan 73.
4. `AI: boleh` **Tantangan: batas bawah.** Pada data terurut menaik, kembalikan indeks elemen pertama yang tidak lebih kecil dari `x`, atau `terurut.length` bila tidak ada. Petunjuk: pakai `kiri = 0` dan `kanan = terurut.length`, ulangi selama `kiri < kanan`. Uji dengan `[1, 3, 3, 3, 7, 9]` dan `x` sama dengan 3, 4, dan 10.
5. *Opsional:* **catatan pemakaian AI.** Kerjakan nomor 1 sendiri dulu, lalu minta penjelasan atau petunjuk bertahap, bukan skrip jadi. Catat alatnya, tujuanmu, garis besar perintahmu, bagian yang kamu pakai, dan cara memeriksanya (jalankan atau telusuri). Jangan menaruh data pribadi atau tugas bernilai pada perintah.

## Latihan bercampur

1. `AI: boleh` Cari indeks kemunculan pertama huruf `k` pada teks `"kemudi"` dengan perulangan, dan pada `"buah"` dengan `indexOf` (dari `b-x2-m2`).
2. `AI: boleh` Dari array objek buku `{ judul, tahun }` (dari `b-x2-m3`), cari indeks buku dengan judul tertentu secara sekuensial, lalu cari indeks buku dengan tahun tertentu secara biner pada array yang sudah terurut menurut tahun.

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `b-x2-m9` (pertanyaan 1), sekitar tiga minggu lagi di `b-x2-m11` (pertanyaan 2), dan sekitar delapan minggu lagi di semester berikutnya, modul `b-xi1-m2` (pertanyaan 3). Jawab sekarang lalu simpan.

1. Apa syarat data agar pencarian biner boleh dipakai, dan mengapa syarat itu perlu?
2. Mengapa batas digeser ke `tengah + 1` atau `tengah - 1`, bukan ke `tengah`?
3. Kira-kira berapa langkah pencarian biner untuk 1000 data, dibanding pencarian sekuensial pada kasus terburuk?

## Kesalahan umum

- **Memakai pencarian biner pada data yang belum terurut.** Pada data `[9, 2, 5, 1, 7]`, `indexOf(1)` memberi 3, tetapi pencarian biner tulisan kita memberi -1, tanpa pesan galat. Pastikan data terurut dulu.
- **Lupa `Math.floor`.** Untuk `kiri = 0` dan `kanan = 9`, `(kiri + kanan) / 2` bernilai 4,5, dan `terurut[4.5]` adalah `undefined`, jadi perbandingannya tidak pernah sama dan hasilnya salah.
- **Menggeser batas ke `tengah`, bukan `tengah + 1`.** Pada dua elemen terakhir, `tengah` sama dengan `kiri`, sehingga `kiri` tidak bergerak dan perulangan tidak pernah berhenti.
- **Memakai `kiri < kanan` pada versi dengan `kanan = terurut.length - 1`.** Elemen terakhir yang tersisa tidak pernah diperiksa. Pada versi itu syaratnya `kiri <= kanan`.
- **Mengira biner selalu lebih baik.** Untuk satu pencarian pada data tak terurut, mengurutkan lebih dulu lebih mahal daripada satu pencarian sekuensial.

## Cek mandiri

- [ ] Saya dapat menulis pencarian sekuensial yang mengembalikan indeks atau -1.
- [ ] Saya dapat menyebut syarat pencarian biner dan alasannya.
- [ ] Saya dapat menelusuri pencarian biner dengan tabel `kiri`, `kanan`, `tengah`.
- [ ] Saya dapat menjelaskan mengapa langkah biner naik pelan saat data membesar.
- [ ] Saya menulis pseudocode sebelum skripnya.

## Kunci dan petunjuk

**Ingat kembali.** 1: LIFO: yang terakhir masuk keluar lebih dulu, contoh tumpukan piring; FIFO: yang pertama masuk keluar lebih dulu, contoh antrian loket. 2: peramban membandingkan kekhususan lebih dulu (id lebih kuat daripada kelas, kelas lebih kuat daripada elemen); urutan penulisan hanya menentukan bila kekhususannya sama. 3: 7 tebakan (modul `b-x1-m13`: tiap tebakan membuang separuh kemungkinan).

**Prediksi dulu.** 1: `2 3`, `-1 5`, dan `2 -1`. 2: fungsi berhenti pada `return` pertama; indeks 4 tidak pernah diperiksa. Untuk melaporkan semuanya, perulangan harus berjalan terus dan mencatat tiap indeks.

**Contoh setengah jadi.** Isi: `<=`, `2`, `tengah`, `tengah + 1`, `tengah - 1`. Kunci yang dijalankan:

```js
// biner-kunci.js
function cariBiner(terurut, x) {
  let kiri = 0;
  let kanan = terurut.length - 1;
  while (kiri <= kanan) {
    const tengah = Math.floor((kiri + kanan) / 2);
    if (terurut[tengah] === x) {
      return tengah;
    } else if (terurut[tengah] < x) {
      kiri = tengah + 1;
    } else {
      kanan = tengah - 1;
    }
  }
  return -1;
}

console.log(cariBiner([1, 4, 6, 9, 12], 9), cariBiner([1, 4, 6, 9, 12], 5));
```

Keluarannya:

```text
3 -1
```

**Soal Parsons.** Urutan benar: b, g, c, f, a, d, e, h. Baris b menghitung `tengah` lebih dulu karena baris g, f, dan e memakainya.

**Latihan.** 1: pseudocode: untuk tiap `x`, periksa array dari indeks 0; bila sama, cetak indeks dan berhenti; bila habis, cetak -1. Skrip contoh:

```js
// cari-banyak.js
function cariIndeks(daftar, x) {
  for (let i = 0; i < daftar.length; i++) {
    if (daftar[i] === x) {
      return i;
    }
  }
  return -1;
}

const data = [4, 9, 7, 1, 7];
for (const x of [7, 5, 4]) {
  console.log(cariIndeks(data, x));
}
```

Keluarannya:

```text
2
-1
0
```

2: untuk `35`: `kiri 0, kanan 6, tengah 3` (21, lebih kecil) maka `kiri 4`; `tengah 5` (35) ketemu, dua langkah. Untuk `10`: `kiri 0, kanan 6, tengah 3` (21, lebih besar) maka `kanan 2`; `tengah 1` (8, lebih kecil) maka `kiri 2`; `tengah 2` (14, lebih besar) maka `kanan 1`; sekarang `kiri > kanan`, tidak ada, tiga langkah. 3: skrip contoh:

```js
// tebak-biner.js
const rahasia = Number(Bun.argv[2]);
let kiri = 1;
let kanan = 100;
while (kiri <= kanan) {
  const tebakan = Math.floor((kiri + kanan) / 2);
  if (tebakan === rahasia) {
    console.log("tebak", tebakan + ": tepat");
    break;
  } else if (tebakan < rahasia) {
    console.log("tebak", tebakan + ": terlalu kecil");
    kiri = tebakan + 1;
  } else {
    console.log("tebak", tebakan + ": terlalu besar");
    kanan = tebakan - 1;
  }
}
```

```sh
bun run tebak-biner.js 73
```

```text
tebak 50: terlalu kecil
tebak 75: terlalu besar
tebak 62: terlalu kecil
tebak 68: terlalu kecil
tebak 71: terlalu kecil
tebak 73: tepat
```

Enam tebakan untuk 73; untuk 1 sampai 100, paling banyak 7 tebakan cukup. 4: skrip contoh dengan `kanan = terurut.length` (batas kanan tidak termasuk):

```js
// batas-bawah.js
function batasBawah(terurut, x) {
  let kiri = 0;
  let kanan = terurut.length;
  while (kiri < kanan) {
    const tengah = Math.floor((kiri + kanan) / 2);
    if (terurut[tengah] < x) {
      kiri = tengah + 1;
    } else {
      kanan = tengah;
    }
  }
  return kiri;
}

const data = [1, 3, 3, 3, 7, 9];
console.log(batasBawah(data, 3), batasBawah(data, 4), batasBawah(data, 10));
```

Keluarannya:

```text
1 4 6
```

Di sini `kanan = tengah` benar karena `tengah` mungkin jawabannya, dan perulangan tetap berhenti karena syaratnya `kiri < kanan`. Dua versi batas itu tidak boleh dicampur.

**Latihan bercampur.** 1: contoh:

```js
// huruf-k.js
const kata = "kemudi";
let hasil = -1;
for (let i = 0; i < kata.length && hasil === -1; i++) {
  if (kata[i] === "k") {
    hasil = i;
  }
}
console.log(hasil, "buah".indexOf("k"));
```

```text
0 -1
```

2: contoh:

```js
// cari-judul.js
const buku = [
  { judul: "Dasar Web", tahun: 2018 },
  { judul: "Belajar Array", tahun: 2020 },
  { judul: "Contoh Objek", tahun: 2020 },
  { judul: "Latihan JSON", tahun: 2023 },
  { judul: "Peta Git", tahun: 2025 },
];

function cariJudul(daftar, judul) {
  for (let i = 0; i < daftar.length; i++) {
    if (daftar[i].judul === judul) {
      return i;
    }
  }
  return -1;
}

function cariTahun(terurut, tahun) {
  let kiri = 0;
  let kanan = terurut.length - 1;
  while (kiri <= kanan) {
    const tengah = Math.floor((kiri + kanan) / 2);
    if (terurut[tengah].tahun === tahun) {
      return tengah;
    } else if (terurut[tengah].tahun < tahun) {
      kiri = tengah + 1;
    } else {
      kanan = tengah - 1;
    }
  }
  return -1;
}

console.log(cariJudul(buku, "Latihan JSON"), cariJudul(buku, "Tidak Ada"));
console.log(cariTahun(buku, 2023), cariTahun(buku, 2021));
```

```text
3 -1
3 -1
```

Pada pencarian biner untuk objek, yang dibandingkan adalah properti `tahun`, bukan objeknya. Bila beberapa buku sama tahunnya (2020), biner mengembalikan salah satunya, bukan harus yang pertama.

**Ulang berjarak.** 1: data harus terurut; tanpa itu, membuang separuh data berdasarkan elemen tengah tidak menjamin bahwa yang dicari tidak ada di bagian yang dibuang. 2: karena `tengah` sudah diperiksa dan bukan jawaban; menggesernya melewati `tengah` memastikan daerah pencarian mengecil di tiap putaran, sehingga perulangan pasti berhenti. 3: sekitar 10 langkah untuk biner (1000 data cukup dibagi dua sekitar 10 kali) dan paling banyak 1000 untuk sekuensial.

## Langkah berikutnya

Modul berikut: `b-x2-m9` (pengurutan dengan bubble sort dan insertion sort), yang menyiapkan data agar pencarian biner dapat dipakai. Modul terkait: `matkom-pertumbuhan-fungsi` untuk membaca mengapa 20 langkah cukup untuk sejuta data. Bacaan lanjut: halaman MDN tentang `Array.prototype.indexOf` dan dokumentasi Bun tentang menjalankan skrip.
