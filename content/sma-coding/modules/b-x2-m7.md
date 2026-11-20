## Untuk siapa modul ini

Modul ini untuk murid kelas X jalur B (Web dengan JavaScript, TypeScript, dan Bun), minggu `B-X2-M7` silabus v1.4.1: struktur data tumpukan (stack) dan antrian (queue). Prasyarat: modul `b-x2-m6` (DOM dan peristiwa) dan `b-x2-m1` (array).

Modul ini karangan penyusun dan disetujui pemilik program pada 2026-11-20 (keputusan lewat dialog; catatan tinjauan menjadi tindak lanjut revisi). Butir `E-BK-a` dan `E-BK-c` dipetakan silabus sebagai dipenuhi jalur ini; pemenuhan butir mengikuti pemetaan silabus, bukan status modul.

Contoh dijalankan penyusun dengan Bun 1.4.4 per 2026-11 (`bun run berkas.js`), dan keluaran yang tertempel adalah keluaran asli. Minggu ini kembali ke skrip Bun biasa tanpa halaman web. Tugas baca-dan-prediksi ditandai `AI: tanpa AI`; selain itu AI generatif boleh dipakai dengan etika dan dicatat, tanpa data pribadi, kata sandi, atau tugas bernilai pada permintaanmu. Semua data contoh karangan.

## Ingat kembali

Jawab dari ingatan, baru cek di bagian kunci. Soal 1 dari `b-x2-m6`, soal 2 dari `b-x2-m4`, soal 3 dari `b-x2-m1`.

1. Apa yang dilakukan `addEventListener("click", fungsi)`, dan kapan `fungsi` dijalankan?
2. Mengapa gambar memerlukan atribut `alt`?
3. Apa indeks elemen pertama sebuah array, dan ekspresi apa yang memberi elemen terakhir dari `daftar`?

## Tujuan

Setelah modul ini kamu dapat:

- menjelaskan LIFO (tumpukan) dan FIFO (antrian) dengan contoh;
- membuat `Tumpukan` dan `Antrian` sebagai kelas di atas array;
- memeriksa kurung seimbang dengan tumpukan;
- mensimulasikan antrian loket dan menangani kasus antrian kosong.

## Prediksi dulu

Ini tugas baca-dan-prediksi, `AI: tanpa AI`. **Tebak dulu, tulis jawabanmu, baru jalankan.**

```js
const tumpukan = [];
const antrian = [];
for (let i = 1; i <= 3; i++) {
  tumpukan.push(i);
  antrian.push(i);
}
console.log(tumpukan.pop(), antrian.shift());
console.log(tumpukan.pop(), antrian.shift(), tumpukan.length);
```

1. Apa yang tercetak pada tiap baris?
2. Keduanya diisi 1, 2, 3 dalam urutan yang sama. Mengapa elemen yang keluar berbeda?

## Contoh terselesaikan

Keluaran program tadi:

```text
3 1
2 2 1
```

Menurut MDN, `pop()` membuang dan mengembalikan elemen **terakhir** array, sedangkan `shift()` membuang dan mengembalikan elemen **pertama** dan menggeser semua elemen sisanya ke kiri; pada array kosong keduanya mengembalikan `undefined`. Dua kebiasaan itu adalah dua struktur data:

- **Tumpukan** bersifat LIFO, *last in, first out*: yang terakhir masuk keluar lebih dulu, seperti tumpukan piring. Array dengan `push` dan `pop`.
- **Antrian** bersifat FIFO, *first in, first out*: yang pertama masuk dilayani lebih dulu, seperti antrian loket. Array dengan `push` dan `shift`.

Agar tidak keliru memakai array biasa (yang membolehkan `isi[2]` atau `splice` di tengah), kita bungkus array dalam **kelas** yang hanya menyediakan operasi yang pantas. Menurut MDN, kelas adalah templat pembuat objek; `constructor` menyiapkan objek yang dibuat dengan `new`, dan `this` menunjuk objek itu di dalam metode.

```js
class Tumpukan {
  constructor() {
    this.isi = [];
  }

  masuk(nilai) {
    this.isi.push(nilai);
  }

  keluar() {
    return this.isi.pop();
  }

  puncak() {
    return this.isi[this.isi.length - 1];
  }

  kosong() {
    return this.isi.length === 0;
  }

  ukuran() {
    return this.isi.length;
  }
}

class Antrian {
  constructor() {
    this.isi = [];
  }

  masuk(nilai) {
    this.isi.push(nilai);
  }

  keluar() {
    return this.isi.shift();
  }

  depan() {
    return this.isi[0];
  }

  kosong() {
    return this.isi.length === 0;
  }

  ukuran() {
    return this.isi.length;
  }
}

const t = new Tumpukan();
t.masuk("a");
t.masuk("b");
t.masuk("c");
console.log(t.puncak(), t.ukuran());
console.log(t.keluar(), t.keluar(), t.ukuran());

const a = new Antrian();
a.masuk("a");
a.masuk("b");
a.masuk("c");
console.log(a.depan(), a.ukuran());
console.log(a.keluar(), a.keluar(), a.ukuran());
console.log(new Tumpukan().keluar(), new Antrian().keluar());
```

```text
c 3
c b 1
a 3
a b 1
undefined undefined
```

Nama operasinya sama (`masuk`, `keluar`), tetapi yang keluar berbeda. `puncak()` dan `depan()` hanya **melihat**; `keluar()` **membuang**. Baris terakhir menunjukkan beda dengan banyak bahasa lain: mengeluarkan dari wadah kosong tidak menimbulkan galat, melainkan diam-diam menghasilkan `undefined`, jadi periksa `kosong()` lebih dulu. Kelas ini memakai `shift()`, yang menggeser seluruh isi; untuk data kecil cukup, dan efisiensi dibahas di modul berikutnya.

**Kurung seimbang.** Simpan tiap kurung buka. Tiap kurung tutup harus berpasangan dengan kurung buka teratas; bila tumpukan kosong atau pasangannya salah, hasilnya tidak seimbang; di akhir tumpukan harus kosong. Objek `pasangan` memetakan kurung tutup ke kurung bukanya (dari `b-x2-m3`).

```js
class Tumpukan {
  constructor() {
    this.isi = [];
  }

  masuk(nilai) {
    this.isi.push(nilai);
  }

  keluar() {
    return this.isi.pop();
  }

  kosong() {
    return this.isi.length === 0;
  }
}

const pasangan = { ")": "(", "]": "[", "}": "{" };

function seimbang(teks) {
  const t = new Tumpukan();
  for (const c of teks) {
    if (c === "(" || c === "[" || c === "{") {
      t.masuk(c);
    } else if (pasangan[c] !== undefined) {
      if (t.kosong() || t.keluar() !== pasangan[c]) {
        return false;
      }
    }
  }
  return t.kosong();
}

for (const teks of ["{[()]}", "([)]", "(()", "a(b)c"]) {
  console.log(teks, seimbang(teks) ? "seimbang" : "tidak seimbang");
}
```

```text
{[()]} seimbang
([)] tidak seimbang
(() tidak seimbang
a(b)c seimbang
```

Pada `([)]`, kurung tutup `)` bertemu `[` di puncak, bukan `(`. Pada `(()`, tidak ada pasangan yang salah, tetapi tumpukan masih berisi di akhir. Contoh antrian: loket dengan data karangan; `D` berarti pelanggan baru datang dan mendapat nomor berikutnya, `L` berarti loket melayani yang terdepan.

```js
class Antrian {
  constructor() {
    this.isi = [];
  }

  masuk(nilai) {
    this.isi.push(nilai);
  }

  keluar() {
    return this.isi.shift();
  }

  kosong() {
    return this.isi.length === 0;
  }
}

const perintah = ["D", "D", "L", "D", "L", "L", "L"];
const antrian = new Antrian();
let nomor = 0;
for (const p of perintah) {
  if (p === "D") {
    nomor = nomor + 1;
    antrian.masuk(nomor);
  } else if (p === "L") {
    if (antrian.kosong()) {
      console.log("loket kosong");
    } else {
      console.log("melayani nomor", antrian.keluar());
    }
  }
}
```

```text
melayani nomor 1
melayani nomor 2
melayani nomor 3
loket kosong
```

## Contoh setengah jadi

Membalik kata dengan `Tumpukan` (kelas di atas): huruf dimasukkan satu per satu, lalu diambil dari atas. Lengkapi bagian `____`.

```js setengah-jadi
const t = new Tumpukan();
for (const huruf of "kode") {
  t.____(huruf);
}
let hasil = "";
while (!t.____()) {
  hasil = hasil + t.____();
}
console.log(hasil);
```

## Soal Parsons

Susun baris-baris berikut (sudah diacak) menjadi program yang mencetak 5, lalu 8, dari sebuah `Antrian`. Baris (a) dan (e) sama persis, jadi boleh bertukar tempat. `AI: tanpa AI`.

```text
(a) console.log(a.depan());
(b) a.masuk(8);
(c) a.keluar();
(d) const a = new Antrian();
(e) console.log(a.depan());
(f) a.masuk(5);
```

## Latihan

1. `AI: tanpa AI` **Telusuri.** Pada `Tumpukan` kosong lalu pada `Antrian` kosong, jalankan `masuk(1)`, `masuk(2)`, `keluar()`, `masuk(3)`, `keluar()`, `keluar()`, `keluar()`. Tulis nilai yang dikembalikan tiap `keluar()`.
2. `AI: boleh` **Pseudocode dulu.** Tulis pseudocode lalu skrip yang menguji palindrom dengan satu `Tumpukan` dan satu `Antrian`: masukkan tiap huruf ke keduanya, lalu bandingkan huruf yang keluar dari keduanya. Uji dengan `katak` dan `kayu`.
3. `AI: boleh` **Ekspresi postfiks.** Dalam notasi postfiks operatornya mengikuti dua angka: `5 2 + 3 *` bermakna (5 + 2) x 3. Tulis fungsi yang membaca teks itu (dipecah dengan `split(" ")`): angka dimasukkan ke tumpukan; operator `+`, `-`, `*` mengambil dua angka teratas dan memasukkan hasilnya. Uji dengan `5 2 + 3 *` dan `10 4 -`.
4. `AI: boleh` **Tombol kembali.** Tulis kelas `Riwayat` dengan `kunjungi(nama)` dan `kembali()`; `kembali()` membuang halaman sekarang dan mengembalikan halaman sebelumnya, tetapi tidak membuang halaman terakhir yang tersisa. Uji dengan `beranda`, `profil`, `galeri`, lalu tiga kali `kembali()`.
5. *Opsional:* **catatan pemakaian AI.** Kerjakan nomor 2 sendiri dulu, lalu minta penjelasan atau petunjuk bertahap, bukan skrip jadi. Catat alatnya, tujuanmu, garis besar perintahmu, bagian yang kamu pakai, dan cara memeriksanya. Jangan menaruh data pribadi atau tugas bernilai pada perintah.

## Latihan bercampur

1. Masukkan `[1, 2, 3, 4]` ke `Tumpukan`, keluarkan semuanya ke array baru, lalu ambil yang genap dengan `filter` (dari `b-x2-m1`).
2. Masukkan dua objek `{ nomor, nama }` bernama karangan ke `Antrian`, keluarkan satu, lalu cetak isi antrian dengan `JSON.stringify` (dari `b-x2-m3`).
3. Rancang di kertas (tanpa menjalankan) tombol `Batalkan` pada daftar tugas `b-x2-m6`: apa yang disimpan di tumpukan riwayat, kapan, dan apa yang dilakukan saat tombol diklik?

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `b-x2-m8` (pertanyaan 1), sekitar tiga minggu lagi di `b-x2-m10` (pertanyaan 2), dan sekitar delapan minggu lagi di `b-xi1-m1` (pertanyaan 3). Jawab sekarang lalu simpan.

1. Apa beda LIFO dan FIFO? Beri satu contoh sehari-hari untuk tiap-tiapnya.
2. Mengapa `keluar()` pada wadah kosong berbahaya walaupun tidak menimbulkan galat, dan bagaimana mencegahnya?
3. Mengapa pemeriksaan kurung seimbang cocok memakai tumpukan?

## Kesalahan umum

- **Mengeluarkan dari wadah kosong.** `pop()` dan `shift()` mengembalikan `undefined` tanpa galat, dan nilai itu bisa merambat ke bagian lain program. Periksa `kosong()` lebih dulu.
- **Tertukar `pop()` dan `shift()`.** `pop()` mengambil dari belakang (tumpukan), `shift()` dari depan (antrian).
- **Mengira `puncak()` atau `depan()` membuang elemen.** Keduanya hanya melihat; `keluar()` yang membuang.
- **Mengakses isi dari luar.** `t.isi[1]` mengabaikan tujuan pembungkus. Pakai metode kelas saja.
- **Lupa memeriksa sisa di akhir kurung seimbang.** `(()` tidak pernah bertemu kurung tutup yang salah, tetapi tumpukannya masih berisi.

## Cek mandiri

- [ ] Saya dapat menjelaskan LIFO dan FIFO dengan contoh.
- [ ] Saya dapat menulis kelas `Tumpukan` dan `Antrian` di atas array.
- [ ] Saya dapat memeriksa kurung seimbang dengan tumpukan.
- [ ] Saya dapat menangani wadah kosong dengan `kosong()`.
- [ ] Saya menulis pseudocode sebelum skripnya.

## Kunci dan petunjuk

**Ingat kembali.** 1: memasang `fungsi` agar dijalankan setiap kali peristiwa `click` terjadi pada elemen itu, bukan saat pemasangan. 2: sebagai teks pengganti bila gambar gagal dimuat dan agar pembaca layar dapat menyampaikan isinya. 3: indeks pertama 0; elemen terakhir `daftar[daftar.length - 1]`.

**Prediksi dulu.** 1: `3 1` lalu `2 2 1`. 2: tumpukan mengeluarkan yang terakhir masuk (3, lalu 2), antrian yang pertama masuk (1, lalu 2); setelah dua kali `pop()` tumpukan masih berisi satu elemen.

**Contoh setengah jadi.** Isian berurutan: `masuk`, `kosong`, `keluar`. Program lengkapnya:

```js
class Tumpukan {
  constructor() {
    this.isi = [];
  }

  masuk(nilai) {
    this.isi.push(nilai);
  }

  keluar() {
    return this.isi.pop();
  }

  puncak() {
    return this.isi[this.isi.length - 1];
  }

  kosong() {
    return this.isi.length === 0;
  }
}

const t = new Tumpukan();
for (const huruf of "kode") {
  t.masuk(huruf);
}
let hasil = "";
while (!t.kosong()) {
  hasil = hasil + t.keluar();
}
console.log(hasil);
```

```text
edok
```

**Soal Parsons.** Urutan benar: d, f, b, e, c, a (dengan a dan e boleh bertukar). Pencetakan pertama menunjukkan 5 karena 5 masuk lebih dulu; setelah `keluar()` yang depan menjadi 8.

**Latihan.** 1: `Tumpukan`: 2, 3, 1, `undefined`. `Antrian`: 1, 2, 3, `undefined`. 2: pseudocode: untuk tiap huruf: masukkan ke tumpukan dan antrian; selama tumpukan tidak kosong: bila huruf yang keluar dari keduanya berbeda, bukan palindrom; bila tidak ada beda, palindrom. Skrip yang dijalankan:

```js
class Tumpukan {
  constructor() {
    this.isi = [];
  }

  masuk(nilai) {
    this.isi.push(nilai);
  }

  keluar() {
    return this.isi.pop();
  }

  kosong() {
    return this.isi.length === 0;
  }
}

class Antrian {
  constructor() {
    this.isi = [];
  }

  masuk(nilai) {
    this.isi.push(nilai);
  }

  keluar() {
    return this.isi.shift();
  }

  kosong() {
    return this.isi.length === 0;
  }
}

function palindrom(teks) {
  const t = new Tumpukan();
  const a = new Antrian();
  for (const huruf of teks) {
    t.masuk(huruf);
    a.masuk(huruf);
  }
  while (!t.kosong()) {
    if (t.keluar() !== a.keluar()) {
      return false;
    }
  }
  return true;
}

for (const kata of ["katak", "kayu"]) {
  console.log(kata, palindrom(kata) ? "palindrom" : "bukan palindrom");
}
```

```text
katak palindrom
kayu bukan palindrom
```

3: bila operator datang, `kanan` keluar lebih dulu, baru `kiri`; urutan itu penting untuk `-`. Skrip yang dijalankan:

```js
class Tumpukan {
  constructor() {
    this.isi = [];
  }

  masuk(nilai) {
    this.isi.push(nilai);
  }

  keluar() {
    return this.isi.pop();
  }
}

function hitung(ekspresi) {
  const t = new Tumpukan();
  for (const token of ekspresi.split(" ")) {
    if (token === "+" || token === "-" || token === "*") {
      const kanan = t.keluar();
      const kiri = t.keluar();
      if (token === "+") {
        t.masuk(kiri + kanan);
      } else if (token === "-") {
        t.masuk(kiri - kanan);
      } else {
        t.masuk(kiri * kanan);
      }
    } else {
      t.masuk(Number(token));
    }
  }
  return t.keluar();
}

console.log(hitung("5 2 + 3 *"));
console.log(hitung("10 4 -"));
```

```text
21
6
```

4: halaman sekarang ada di puncak tumpukan; `kembali()` membuang puncak bila masih ada lebih dari satu halaman, lalu mengembalikan puncak yang baru. Skrip yang dijalankan:

```js
class Tumpukan {
  constructor() {
    this.isi = [];
  }

  masuk(nilai) {
    this.isi.push(nilai);
  }

  keluar() {
    return this.isi.pop();
  }

  puncak() {
    return this.isi[this.isi.length - 1];
  }

  ukuran() {
    return this.isi.length;
  }
}

class Riwayat {
  constructor() {
    this.halaman = new Tumpukan();
  }

  kunjungi(nama) {
    this.halaman.masuk(nama);
  }

  kembali() {
    if (this.halaman.ukuran() > 1) {
      this.halaman.keluar();
    }
    return this.halaman.puncak();
  }
}

const r = new Riwayat();
r.kunjungi("beranda");
r.kunjungi("profil");
r.kunjungi("galeri");
console.log(r.kembali());
console.log(r.kembali());
console.log(r.kembali());
```

```text
profil
beranda
beranda
```

**Latihan bercampur.** 1: keluaran `[ 4, 2 ]` (elemen keluar dari yang terakhir masuk, sehingga urutan terbalik, lalu `filter` mengambil yang genap). 2: setelah satu `keluar()` antrian menyisakan objek kedua; skrip contoh mencetak `[{"nomor":2,"nama":"Budi-contoh"}]`. 3: simpan salinan teks daftar sebelum setiap perubahan ke tumpukan; saat `Batalkan` diklik, ambil puncak tumpukan (bila tidak kosong) dan pasang kembali ke halaman dengan `textContent`.

**Ulang berjarak.** 1: LIFO: yang terakhir masuk keluar lebih dulu, contoh tumpukan piring; FIFO: yang pertama masuk keluar lebih dulu, contoh antrian loket. 2: hasilnya `undefined` yang bisa merambat tanpa terlihat; periksa `kosong()` sebelum memanggilnya. 3: kurung tutup harus berpasangan dengan kurung buka terakhir yang belum tertutup, yaitu elemen teratas tumpukan.

## Langkah berikutnya

Modul berikut: `b-x2-m8` (pencarian sekuensial dan biner), yang menelusuri data dalam array. Nanti `b-xi1-m6` membahas cara memisahkan kelas seperti ini ke berkas modul sendiri, dan `b-xi1-m8` kembali ke struktur data dengan tipe TypeScript. Modul terkait: `matkom-himpunan-relasi-fungsi`. Bacaan lanjut: halaman MDN tentang `Array.prototype.push`, `pop`, `shift`, dan tentang kelas.
