## Untuk siapa modul ini

Modul ini untuk murid kelas X jalur B (Web dengan JavaScript, TypeScript, dan Bun), minggu `B-X2-M9` silabus v1.4.1: pengurutan dengan bubble sort dan insertion sort. Prasyarat: modul `b-x2-m8` (pencarian sekuensial dan biner), yang butuh data terurut.

Modul ini karangan penyusun dan disetujui pemilik program pada 2026-11-20 (keputusan lewat dialog; catatan tinjauan menjadi tindak lanjut revisi). Butir `E-BK-a` dan `E-BK-c` dipetakan silabus sebagai dipenuhi jalur ini; pemenuhan butir mengikuti pemetaan silabus, bukan status modul.

Contoh dijalankan penyusun dengan Bun 1.4.4 per 2026-11. Tugas baca-dan-prediksi ditandai `AI: tanpa AI`; selain itu AI generatif boleh dipakai dengan etika dan dicatat, tanpa data pribadi, kata sandi, atau tugas bernilai pada permintaanmu. Tiap soal `Latihan` bertanda `AI: boleh` atau `AI: tanpa AI`.

## Ingat kembali

Jawab dari ingatan dulu, baru cek di bagian kunci. Soal 1 dari `b-x2-m8`, soal 2 dari `b-x2-m6`, soal 3 dari `b-x2-m1`.

1. Apa syarat data agar pencarian biner boleh dipakai, dan mengapa syarat itu perlu?
2. Mengapa `document.querySelector` dapat mengembalikan `null`, dan bagaimana mencegahnya?
3. Tulis kode yang menukar `daftar[0]` dengan `daftar[1]` memakai satu variabel sementara.

## Tujuan

Setelah modul ini kamu dapat:

- menelusuri bubble sort dan insertion sort langkah demi langkah;
- menulis kedua pengurutan dengan array dan perulangan (keluaran minggu ini: skrip urut);
- menghitung perbandingan dan pertukaran, lalu membandingkan kedua cara pada tiga jenis data;
- memakai `sort` bawaan dengan fungsi pembanding yang benar untuk angka.

## Prediksi dulu

Ini tugas baca-dan-prediksi, `AI: tanpa AI`. **Tebak dulu, tulis jawabanmu, baru jalankan.** Skrip mencetak isi array setelah tiap putaran luar. Ingat: `a.join(" ")` menyambung elemen dengan spasi.

```js
// prediksi-bubble.js
const a = [5, 1, 4, 2];
for (let putaran = 0; putaran < a.length - 1; putaran++) {
  for (let i = 0; i < a.length - 1 - putaran; i++) {
    if (a[i] > a[i + 1]) {
      const sementara = a[i];
      a[i] = a[i + 1];
      a[i + 1] = sementara;
    }
  }
  console.log("putaran", putaran + 1 + ":", a.join(" "));
}
```

1. Apa yang tercetak pada tiap baris?
2. Setelah putaran pertama, elemen mana yang pasti sudah di tempat akhirnya?

## Contoh terselesaikan

Keluaran skrip prediksi:

```text
putaran 1: 1 4 2 5
putaran 2: 1 2 4 5
putaran 3: 1 2 4 5
```

Itu **bubble sort**: bandingkan dua elemen bertetangga dan tukar bila urutannya salah. Satu putaran penuh membawa elemen terbesar ke ujung kanan, seperti gelembung naik. Karena itu putaran berikutnya cukup memeriksa sampai sebelum ujung yang sudah beres: batas `a.length - 1 - putaran`.

**Insertion sort** bekerja seperti merapikan kartu di tangan: ambil satu kartu, geser kartu yang lebih besar ke kanan, lalu sisipkan kartu itu di celahnya. Bagian kiri selalu sudah terurut. Skrip berikut mencetak array setelah tiap kartu disisipkan.

```js
// insertion-jejak.js
const a = [7, 3, 5, 2];
for (let i = 1; i < a.length; i++) {
  const x = a[i];
  let j = i - 1;
  while (j >= 0 && a[j] > x) {
    a[j + 1] = a[j];
    j--;
  }
  a[j + 1] = x;
  console.log("i =", i + ":", a.join(" "));
}
```

Keluarannya:

```text
i = 1: 3 7 5 2
i = 2: 3 5 7 2
i = 3: 2 3 5 7
```

Pada `i = 3`, `x = 2` lebih kecil dari ketiga elemen di kirinya, jadi ketiganya bergeser satu tempat dan `j` turun sampai -1; syarat `j >= 0` menghentikan penggeseran di ujung kiri, dan `x` masuk ke `a[0]`.

Mana yang lebih sedikit langkahnya? Skrip berikut menghitung perbandingan dan pertukaran (atau pergeseran) kedua cara pada tiga jenis data berukuran 8. Keduanya bekerja pada salinan, `[...awal]`, supaya data asli tidak berubah.

```js
// banding-urut.js
function bubble(awal) {
  const a = [...awal];
  let banding = 0;
  let tukar = 0;
  for (let putaran = 0; putaran < a.length - 1; putaran++) {
    for (let i = 0; i < a.length - 1 - putaran; i++) {
      banding++;
      if (a[i] > a[i + 1]) {
        const sementara = a[i];
        a[i] = a[i + 1];
        a[i + 1] = sementara;
        tukar++;
      }
    }
  }
  return { hasil: a, banding: banding, tukar: tukar };
}

function insertion(awal) {
  const a = [...awal];
  let banding = 0;
  let geser = 0;
  for (let i = 1; i < a.length; i++) {
    const x = a[i];
    let j = i - 1;
    while (j >= 0) {
      banding++;
      if (a[j] > x) {
        a[j + 1] = a[j];
        geser++;
        j--;
      } else {
        break;
      }
    }
    a[j + 1] = x;
  }
  return { hasil: a, banding: banding, geser: geser };
}

const jenis = {
  terurut: [1, 2, 3, 4, 5, 6, 7, 8],
  terbalik: [8, 7, 6, 5, 4, 3, 2, 1],
  acak: [5, 2, 8, 1, 7, 3, 6, 4],
};
for (const nama in jenis) {
  const b = bubble(jenis[nama]);
  const s = insertion(jenis[nama]);
  console.log(nama + ":");
  console.log("  bubble    banding", b.banding, "tukar", b.tukar);
  console.log("  insertion banding", s.banding, "geser", s.geser);
}
```

Keluarannya:

```text
terurut:
  bubble    banding 28 tukar 0
  insertion banding 7 geser 0
terbalik:
  bubble    banding 28 tukar 28
  insertion banding 28 geser 28
acak:
  bubble    banding 28 tukar 14
  insertion banding 19 geser 14
```

Tiga pengamatan. Pertama, bubble versi ini selalu 28 perbandingan (8 x 7 / 2), apa pun datanya. Kedua, insertion hanya 7 perbandingan pada data yang sudah terurut, tetapi sama banyak dengan bubble pada data terbalik. Ketiga, banyak pertukaran bubble sama dengan banyak pergeseran insertion; itu bukan kebetulan, karena tiap pertukaran bubble dan tiap pergeseran insertion memperbaiki tepat satu pasangan elemen yang terbalik urutannya. Bila data dua kali lebih banyak, perbandingan bubble kira-kira empat kali lebih banyak (16 elemen: 120): naik secara kuadrat, lebih cepat daripada pencarian sekuensial yang hanya naik dua kali.

**`sort` bawaan.** Menurut MDN, tanpa fungsi pembanding `sort` mengubah elemen menjadi teks lalu membandingkannya; ia mengubah array aslinya dan mengembalikan array yang sama; urutan elemen yang setara tetap (stabil) sejak ECMAScript 2019.

```js
// sort-bawaan.js
const angka = [10, 9, 1, 100];
console.log([...angka].sort());
console.log([...angka].sort((a, b) => a - b));
const asli = [3, 1, 2];
const hasil = asli.sort((a, b) => a - b);
console.log(asli, hasil === asli);
```

Keluarannya:

```text
[ 1, 10, 100, 9 ]
[ 1, 9, 10, 100 ]
[ 1, 2, 3 ] true
```

Tanpa pembanding, `"9"` dianggap lebih besar dari `"100"` karena `"9" > "1"` huruf demi huruf. Pembanding `(a, b) => a - b` mengurutkan angka menaik.

## Contoh setengah jadi

Lengkapi insertion sort berikut: ambil elemen ke-`i`, mulai dari indeks sebelumnya, geser selama elemen di kiri lebih besar, lalu sisipkan.

```js setengah-jadi
// insertion-setengah.js
function insertionSort(a) {
  for (let i = ____; i < a.length; i++) {
    const x = a[____];
    let j = i - 1;
    while (j >= 0 && a[j] ____ x) {
      a[j + 1] = ____;
      j--;
    }
    a[____] = x;
  }
}

const data = [9, 4, 6, 1];
insertionSort(data);
console.log(data);
```

## Soal Parsons

Susun sembilan baris berikut (sudah diacak) menjadi fungsi `insertionSort`. `AI: tanpa AI`: tujuannya melatih membaca urutan dan kurung.

```text
(a)     a[j + 1] = a[j];
(b)   const x = a[i];
(c)   a[j + 1] = x;
(d)   let j = i - 1;
(e)     j--;
(f) for (let i = 1; i < a.length; i++) {
(g)   while (j >= 0 && a[j] > x) {
(h)   }
(i) }
```

## Latihan

1. `AI: tanpa AI` **Telusuri.** Untuk `[6, 2, 5, 1]`, tulis isi array setelah tiap putaran bubble sort, lalu setelah tiap penyisipan insertion sort.
2. `AI: boleh` **Hitung pertukaran.** Tulis `hitungTukar(awal)` yang menjalankan bubble sort pada salinan dan mengembalikan banyak pertukaran. Uji dengan `[3, 1, 2]`, `[1, 2, 3]`, `[3, 2, 1]`, dan `[5, 2, 8, 1, 7, 3, 6, 4]`.
3. `AI: boleh` **Berhenti lebih awal.** Ubah bubble sort: bila satu putaran tidak menukar apa pun, hentikan. Cetak banyak perbandingan untuk data terurut dan data acak di contoh.
4. `AI: boleh` **Urutkan objek.** Urutkan array objek `{ judul, tahun }` menaik menurut `tahun` dengan insertion sort tulisanmu, lalu dengan `sort` bawaan dan pembanding.
5. *Opsional:* **catatan pemakaian AI.** Kerjakan nomor 2 sendiri dulu, lalu minta penjelasan atau petunjuk bertahap, bukan skrip jadi. Catat alatnya, tujuanmu, garis besar perintahmu, bagian yang kamu pakai, dan cara memeriksanya (jalankan dengan data yang jawabannya sudah kamu hitung). Jangan menaruh data pribadi atau tugas bernilai pada perintah.

## Latihan bercampur

1. `AI: boleh` Mengapa `[10, 9, 1].sort()` tidak memberi `[1, 9, 10]`? Perbaiki, lalu cetak array aslinya dan pastikan kamu tahu apakah ia berubah.
2. `AI: boleh` Urutkan `[42, 7, 19, 3, 88, 25]`, lalu cari 25 dan 26 dengan pencarian biner dari `b-x2-m8`. Urutkan juga `["pisang", "apel", "jeruk"]` (string, dari `b-x2-m2`).

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `b-x2-m10` (pertanyaan 1), sekitar tiga minggu lagi di `b-x2-m12` (pertanyaan 2), dan sekitar delapan minggu lagi di semester berikutnya, modul `b-xi1-m3` (pertanyaan 3). Jawab sekarang lalu simpan.

1. Setelah satu putaran penuh bubble sort menaik, elemen mana yang pasti sudah di tempat akhirnya?
2. Pada data seperti apa insertion sort sangat sedikit langkahnya, dan pada data seperti apa paling banyak?
3. Mengapa `[10, 9, 1].sort()` tanpa pembanding memberi hasil yang mengejutkan, dan bagaimana memperbaikinya?

## Kesalahan umum

- **Mengurutkan angka dengan `sort()` polos.** Hasilnya urutan teks: `[1, 10, 100, 9]`. Beri pembanding `(a, b) => a - b`.
- **Lupa bahwa `sort` mengubah array aslinya.** Bila data asli masih dibutuhkan, urutkan salinan: `[...asli].sort(...)`.
- **Batas putaran dalam yang terlalu lebar.** Tanpa `- 1` pada `a.length - 1 - putaran`, `a[i + 1]` melewati ujung array dan bernilai `undefined`, sehingga perbandingannya tidak bermakna.
- **Lupa menyimpan `x` sebelum menggeser.** Tanpa `const x = a[i]`, penggeseran menimpa nilai itu dan satu nilai hilang dari array.
- **Menaruh `x` di tempat yang salah.** Elemen disisipkan di `a[j + 1]` setelah perulangan, bukan di `a[j]`.
- **Mengira bubble sort cukup satu putaran.** Satu putaran hanya menempatkan satu elemen; pada `[5, 1, 4, 2]` butuh tiga putaran.

## Cek mandiri

- [ ] Saya dapat menelusuri bubble sort dan insertion sort dengan tabel atau jejak array.
- [ ] Saya dapat menulis insertion sort dengan syarat `j >= 0` yang benar.
- [ ] Saya dapat menghitung perbandingan dan pertukaran pada tiga jenis data.
- [ ] Saya dapat menjelaskan mengapa `sort()` polos salah untuk angka.
- [ ] Saya menyalin array sebelum diurutkan bila data asli masih dibutuhkan.

## Kunci dan petunjuk

**Ingat kembali.** 1: data harus terurut; tanpa itu, membuang separuh data berdasarkan elemen tengah tidak menjamin bahwa yang dicari tidak ada di bagian yang dibuang. 2: karena tidak ada elemen yang cocok (selektor salah atau skrip berjalan sebelum elemen ada); periksa selektornya, taruh skrip di akhir `body` atau beri `defer`. 3: `const sementara = daftar[0]; daftar[0] = daftar[1]; daftar[1] = sementara;`.

**Prediksi dulu.** 1: `putaran 1: 1 4 2 5`, `putaran 2: 1 2 4 5`, `putaran 3: 1 2 4 5`. 2: angka 5, yang terbesar, di ujung kanan.

**Contoh setengah jadi.** Isi berurutan: `1`, `i`, `>`, `a[j]`, `j + 1`. Kunci yang dijalankan:

```js
// insertion-kunci.js
function insertionSort(a) {
  for (let i = 1; i < a.length; i++) {
    const x = a[i];
    let j = i - 1;
    while (j >= 0 && a[j] > x) {
      a[j + 1] = a[j];
      j--;
    }
    a[j + 1] = x;
  }
}

const data = [9, 4, 6, 1];
insertionSort(data);
console.log(data);
```

Keluarannya:

```text
[ 1, 4, 6, 9 ]
```

**Soal Parsons.** Urutan benar: f, b, d, g, a, e, h, c, i. Baris c ada setelah `while` ditutup oleh h, dan i menutup `for`.

**Latihan.** 1: bubble untuk `[6, 2, 5, 1]`: putaran 1: `2 5 1 6`; putaran 2: `2 1 5 6`; putaran 3: `1 2 5 6`. Insertion: `i = 1`: `2 6 5 1`; `i = 2`: `2 5 6 1`; `i = 3`: `1 2 5 6`. 2: kunci yang dijalankan:

```js
// hitung-tukar.js
function hitungTukar(awal) {
  const a = [...awal];
  let tukar = 0;
  for (let putaran = 0; putaran < a.length - 1; putaran++) {
    for (let i = 0; i < a.length - 1 - putaran; i++) {
      if (a[i] > a[i + 1]) {
        const sementara = a[i];
        a[i] = a[i + 1];
        a[i + 1] = sementara;
        tukar++;
      }
    }
  }
  return tukar;
}

console.log(hitungTukar([3, 1, 2]), hitungTukar([1, 2, 3]), hitungTukar([3, 2, 1]), hitungTukar([5, 2, 8, 1, 7, 3, 6, 4]));
```

```text
2 0 3 14
```

3: kunci yang dijalankan:

```js
// bubble-berhenti.js
function bubbleBerhenti(awal) {
  const a = [...awal];
  let banding = 0;
  for (let putaran = 0; putaran < a.length - 1; putaran++) {
    let ada = false;
    for (let i = 0; i < a.length - 1 - putaran; i++) {
      banding++;
      if (a[i] > a[i + 1]) {
        const sementara = a[i];
        a[i] = a[i + 1];
        a[i + 1] = sementara;
        ada = true;
      }
    }
    if (!ada) {
      break;
    }
  }
  return { hasil: a, banding: banding };
}

console.log(bubbleBerhenti([1, 2, 3, 4, 5, 6, 7, 8]).banding);
console.log(bubbleBerhenti([5, 2, 8, 1, 7, 3, 6, 4]).banding);
```

```text
7
25
```

Data terurut kini hanya 7 perbandingan (satu putaran tanpa pertukaran), dan data acak 25 dari 28. 4: kunci yang dijalankan:

```js
// urut-buku.js
const buku = [
  { judul: "Peta Git", tahun: 2025 },
  { judul: "Dasar Web", tahun: 2018 },
  { judul: "Latihan JSON", tahun: 2023 },
  { judul: "Belajar Array", tahun: 2020 },
];

for (let i = 1; i < buku.length; i++) {
  const x = buku[i];
  let j = i - 1;
  while (j >= 0 && buku[j].tahun > x.tahun) {
    buku[j + 1] = buku[j];
    j--;
  }
  buku[j + 1] = x;
}
console.log(buku.map((b) => b.tahun + " " + b.judul));

const lagi = [
  { judul: "Peta Git", tahun: 2025 },
  { judul: "Dasar Web", tahun: 2018 },
];
lagi.sort((p, q) => p.tahun - q.tahun);
console.log(lagi.map((b) => b.judul));
```

```text
[ "2018 Dasar Web", "2020 Belajar Array", "2023 Latihan JSON", "2025 Peta Git" ]
[ "Dasar Web", "Peta Git" ]
```

Yang dibandingkan adalah `tahun`, tetapi yang dipindahkan seluruh objek.

**Latihan bercampur.** 1: tanpa pembanding, angka diurutkan sebagai teks; perbaikan: `(a, b) => a - b`. `sort` mengubah array aslinya, jadi array asli ikut terurut; urutkan salinan bila urutan awal masih dibutuhkan. 2: kunci yang dijalankan:

```js
// urut-lalu-cari.js
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

const data = [42, 7, 19, 3, 88, 25];
const terurut = [...data].sort((a, b) => a - b);
console.log(terurut);
console.log(cariBiner(terurut, 25), cariBiner(terurut, 26));
console.log(["pisang", "apel", "jeruk"].sort());
```

```text
[ 3, 7, 19, 25, 42, 88 ]
3 -1
[ "apel", "jeruk", "pisang" ]
```

String diurutkan menurut urutan huruf, jadi `sort()` polos memang tepat untuk teks sederhana.

**Ulang berjarak.** 1: elemen terbesar, di ujung kanan. 2: sangat sedikit pada data yang sudah (hampir) terurut, paling banyak pada data terbalik. 3: tanpa pembanding, elemen dibandingkan sebagai teks sehingga `"10"` lebih kecil dari `"9"`; perbaiki dengan `(a, b) => a - b`.

## Langkah berikutnya

Modul berikut: `b-x2-m10` (data berkualitas), yang memeriksa dan merapikan data tabel sebelum diurutkan atau dicari. Modul terkait: `matkom-pertumbuhan-fungsi` untuk membaca mengapa langkah bubble naik kuadrat. Bacaan lanjut: halaman MDN tentang `Array.prototype.sort`.
