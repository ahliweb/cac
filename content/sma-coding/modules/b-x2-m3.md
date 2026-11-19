## Untuk siapa modul ini

Modul ini untuk murid kelas X jalur B (Web dengan JavaScript, TypeScript, dan Bun), minggu `B-X2-M3` silabus v1.4.1: objek dan JSON. Prasyarat: modul `b-x2-m2` (string dan templat), dan sepanjang modul ini kamu memakai array dari `b-x2-m1`.

Modul ini berstatus DRAF: karangan penyusun, belum ditinjau pemilik. Butir `E-BK-d` (solusi program sederhana dalam format pseudocode) dipetakan silabus sebagai dipenuhi jalur ini; modul draf ini belum dihitung sebagai pemenuhan butir itu.

Contoh dijalankan penyusun dengan Bun 1.4.4 per 2026-11. Tugas baca-dan-prediksi ditandai `AI: tanpa AI`; selain itu AI generatif boleh dipakai dengan etika dan dicatat, tanpa data pribadi, kata sandi, atau tugas bernilai pada permintaanmu. Semua data di modul ini karangan: nama murid dan judul buku tidak merujuk orang atau buku nyata.

## Ingat kembali

Jawab dari ingatan, baru cek di bagian kunci. Soal 1 dari `b-x2-m2`, soal 2 dari `b-x2-m1`, soal 3 dari `b-x1-m10`.

1. Tulis templat string yang mencetak `Halo, <nama>!` memakai variabel `nama`.
2. Apa yang dikembalikan `push`, dan apa yang dikembalikan `pop`?
3. Sebutkan tiga nilai yang termasuk falsy.

## Tujuan

Setelah modul ini kamu dapat:

- membuat objek dengan properti bernama dan membacanya dengan titik atau kurung siku;
- menambah, mengubah, dan menghapus properti;
- memodelkan data dengan array berisi objek, lalu menelusuri dan menyaringnya;
- mengubah objek menjadi teks JSON dan sebaliknya dengan `JSON.stringify` dan `JSON.parse`;
- menulis dan membaca berkas JSON dengan Bun (keluaran minggu ini: berkas JSON, misalnya daftar buku karangan).

## Prediksi dulu

Objek mengelompokkan nilai dengan nama. Setiap pasangan `nama: nilai` disebut properti, ditulis di dalam kurung kurawal. Properti dibaca dengan `objek.nama` atau `objek["nama"]`. Baca skrip ini dan **tebak dulu, tulis jawabanmu per baris, baru jalankan**.

```js
// prediksi-objek.js
const murid = { nama: "Dewi-contoh", kelas: "X", nilai: [80, 90] };
console.log(murid.nama);
console.log(murid["kelas"]);
console.log(murid.nilai[1]);
console.log(murid.umur);
murid.umur = 16;
console.log(murid.umur);
delete murid.kelas;
console.log(murid);
console.log(JSON.stringify(murid));
```

1. Apa yang tercetak pada tiap baris? Bagaimana menurutmu `console.log(murid)` menampilkan objek?
2. `murid.umur` tidak ada di awal. Apa yang terjadi saat dibaca, dan apa yang terjadi setelah diberi nilai?
3. Menurutmu, `JSON.stringify` mengubah objek menjadi apa?

## Contoh terselesaikan

Keluaran skrip prediksi di atas:

```text
Dewi-contoh
X
90
undefined
16
{
  nama: "Dewi-contoh",
  nilai: [ 80, 90 ],
  umur: 16,
}
{"nama":"Dewi-contoh","nilai":[80,90],"umur":16}
```

Membaca properti yang tidak ada menghasilkan `undefined`, tetapi memberinya nilai langsung membuat properti itu ada. `delete` menghapus properti, dan `console.log` di Bun menampilkan objek satu properti per baris.

**JSON** adalah format teks untuk menyimpan data. Menurut dokumentasi MDN, `JSON.stringify` mengubah nilai JavaScript menjadi string JSON dan `JSON.parse` membangun kembali nilai dari string JSON. Aturan JSON lebih ketat daripada JavaScript: nama properti harus berupa string dengan tanda kutip ganda dan koma di ujung akhir dilarang. Nilai `undefined` tidak termasuk nilai JSON yang sah, sehingga properti yang bernilai `undefined` dihilangkan.

**Berkas dengan Bun.** Menurut dokumentasi Bun, `Bun.write(tujuan, data)` menulis ke berkas dan `Bun.file(path)` membuat rujukan ke berkas yang `.json()`-nya membaca isi sebagai objek JSON; keduanya bersifat asinkron, sehingga dipanggil dengan `await`. Contoh di bawah memakai `await` di tingkat atas berkas dan berjalan tanpa dibungkus fungsi pada percobaan penyusun.

```js
// buku.js
const buku = [
  { judul: "Belajar Array", tahun: 2020, tersedia: true },
  { judul: "Dasar Web", tahun: 2018, tersedia: false },
  { judul: "Algoritma Ringan", tahun: 2022, tersedia: true },
];

for (const b of buku) {
  console.log(`${b.judul} (${b.tahun})`);
}

const tersedia = buku.filter((b) => b.tersedia);
console.log(tersedia.map((b) => b.judul));

buku.push({ judul: "Git Pemula", tahun: 2023, tersedia: true });
await Bun.write("buku.json", JSON.stringify(buku, null, 2));

const dibaca = await Bun.file("buku.json").json();
console.log(dibaca.length);
console.log(dibaca[3].judul);
```

Keluarannya:

```text
Belajar Array (2020)
Dasar Web (2018)
Algoritma Ringan (2022)
[ "Belajar Array", "Algoritma Ringan" ]
4
Git Pemula
```

Argumen kedua dan ketiga `JSON.stringify` mengatur tampilan; `null, 2` membuat berkas berindentasi dua spasi agar mudah dibaca manusia (parameter `space` pada dokumentasi MDN). Isi `buku.json` yang tertulis, bagian awalnya:

```json
[
  {
    "judul": "Belajar Array",
    "tahun": 2020,
    "tersedia": true
  },
```

Pola yang berguna: **array berisi objek** adalah cara umum memodelkan tabel. Tiap objek satu baris, tiap properti satu kolom, sehingga `filter`, `map`, dan `reduce` dari `b-x2-m1` langsung bisa dipakai.

## Contoh setengah jadi

Lengkapi bagian `____` agar keluarannya `75`, `Budi-contoh`, teks JSON dengan properti `kelas`, dan `X`.

```js setengah-jadi
// objek-setengah.js
const siswa = { nama: "Budi-contoh", nilai: 75 };
console.log(siswa.____);
console.log(siswa["____"]);
siswa.____ = "X";
const teks = JSON.____(siswa);
console.log(teks);
const objek = JSON.____(teks);
console.log(objek.kelas);
```

## Soal Parsons

Susun baris-baris di bawah (sudah diacak) menjadi fungsi `cariBuku(daftar, judul)` yang mengembalikan objek buku pertama dengan judul itu, atau `null` bila tidak ada.

```text
(a)   return b;
(b) function cariBuku(daftar, judul) {
(c)   return null;
(d)     if (b.judul === judul) {
(e) }
(f)   for (const b of daftar) {
(g)     }
(h)   }
```

## Latihan

1. `AI: tanpa AI` **Baca dan prediksi.** Tanpa menjalankan, tulis apa yang tercetak:

   ```js
   const a = { x: 1, y: { z: 2 } };
   const b = a;
   b.y.z = 9;
   console.log(a.y.z);
   console.log(a.w);
   console.log(a.w === undefined);
   console.log(JSON.stringify({ n: 1, f: undefined, s: "t" }));
   console.log(JSON.parse("[1, 2, 3]").length);
   ```
2. `AI: boleh` **Daftar buku.** Buat array tiga objek buku karanganmu sendiri, tambahkan satu buku, cetak judul yang tersedia, lalu simpan ke `buku.json` dan baca kembali.
3. `AI: boleh` **Cari buku.** Tulis pseudocode lalu fungsi `cariBuku(daftar, judul)`. Uji dengan judul yang ada dan yang tidak ada.
4. `AI: boleh` **Rekap.** Dari daftar tiga buku, buat objek `rekap` dengan properti `tersedia` dan `dipinjam` yang berisi banyaknya buku masing-masing, lalu hitung rata-rata tahun terbitnya dengan `reduce`.
5. *Opsional:* **catatan pemakaian AI.** Bila memakai AI generatif, jawab nomor 3 sendiri dulu, lalu minta penjelasan atau petunjuk bertahap, bukan skrip jadi. Catat alatnya, tujuanmu, garis besar perintahmu, bagian yang kamu pakai, dan cara memeriksanya (uji dengan judul yang hasilnya kamu tahu). Jangan menaruh data pribadi atau tugas bernilai pada perintah.

## Latihan bercampur

1. Tulis fungsi panah `ringkas(b)` yang mengembalikan `<judul> (<tahun>)` dengan templat (dari `b-x2-m2`).
2. Dari array objek `[{ tahun: 2020 }, { tahun: 2018 }, { tahun: 2022 }]`, cari tahun paling awal dengan `reduce` (dari `b-x2-m1`).
3. Objek `{ judul: "Nol", tahun: 0 }` punya properti `tahun` bernilai 0. Apa hasil `if (b0.tahun)` dan mengapa? Tulis kondisi yang benar untuk memeriksa bahwa properti itu ada (dari `b-x1-m10`).

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `b-x2-m4` (pertanyaan 1), sekitar tiga minggu lagi di `b-x2-m6` (pertanyaan 2), dan sekitar delapan minggu lagi, modul `b-x2-m11` (pertanyaan 3). Jawab sekarang lalu simpan.

1. Tulis objek `buku` dengan properti `judul` dan `tahun`, lalu cetak judulnya dengan titik dan dengan kurung siku.
2. Apa yang dikerjakan `JSON.stringify` dan `JSON.parse`?
3. Apa jadinya `JSON.parse('{nama: "Dewi"}')`, dan mengapa?

## Kesalahan umum

- **Mengira `b = a` menyalin objek.** Keduanya menunjuk objek yang sama; mengubah `b.x` juga mengubah `a.x`.
- **Membaca properti dari `undefined`.** `a.w` yang tidak ada bernilai `undefined`, tetapi `a.w.z` melempar `TypeError`, karena `undefined` tidak punya properti.
- **Menulis JSON seperti JavaScript.** `{nama: "Dewi"}` (nama tanpa tanda kutip) dan `{"a": 1,}` (koma di ujung) sama-sama ditolak `JSON.parse` dengan `SyntaxError`, sesuai aturan JSON di dokumentasi MDN.
- **Memakai titik padahal nama properti ada di variabel.** Bila `kunci = "x"`, maka `a.kunci` mencari properti bernama `kunci` (hasilnya `undefined`), sedangkan `a[kunci]` mencari properti `x`.
- **Lupa `await`.** `Bun.file("tmp.json").json()` tanpa `await` mengembalikan janji (`Promise`), bukan objeknya; pada percobaan penyusun pemeriksaan `instanceof Promise` bernilai `true`.
- **Heran properti hilang dari JSON.** `JSON.stringify({ n: 1, f: undefined })` menghasilkan `{"n":1}`, karena nilai `undefined` dihilangkan.

## Cek mandiri

- [ ] Saya dapat membuat objek dan membaca propertinya dengan titik dan kurung siku.
- [ ] Saya dapat menambah, mengubah, dan menghapus properti.
- [ ] Saya dapat menelusuri dan menyaring array berisi objek.
- [ ] Saya dapat mengubah objek menjadi JSON dan sebaliknya.
- [ ] Saya tahu aturan JSON: nama properti bertanda kutip ganda dan tanpa koma di ujung.
- [ ] Saya dapat menulis dan membaca berkas JSON dengan Bun.

## Kunci dan petunjuk

**Ingat kembali.** 1: `` `Halo, ${nama}!` ``. 2: `push` mengembalikan panjang baru array dan `pop` mengembalikan elemen yang diambil dari ujung. 3: contoh: `0`, `""`, `null` (juga `undefined`, `NaN`, `false`).

**Prediksi dulu.** 1: `Dewi-contoh`, `X`, `90`, `undefined`, `16`, objek tanpa `kelas`, lalu teks JSON. Bun menampilkan objek satu properti per baris. 2: dibaca `undefined`; setelah diberi nilai, properti itu ada dan bernilai 16. 3: menjadi teks (string) berformat JSON.

**Contoh setengah jadi.** Isian berurutan: `nilai`; `nama`; `kelas`; `stringify`; `parse`. Kuncinya, yang dijalankan:

```js
// objek-kunci.js
const siswa = { nama: "Budi-contoh", nilai: 75 };
console.log(siswa.nilai);
console.log(siswa["nama"]);
siswa.kelas = "X";
const teks = JSON.stringify(siswa);
console.log(teks);
const objek = JSON.parse(teks);
console.log(objek.kelas);
```

Keluarannya:

```text
75
Budi-contoh
{"nama":"Budi-contoh","nilai":75,"kelas":"X"}
X
```

**Soal Parsons.** Urutan benar: b, f, d, a, g, h, c, e. Baris (g) menutup `if`, (h) menutup `for`, dan (e) menutup fungsi; `return null` hanya dicapai bila perulangan selesai tanpa menemukan buku.

**Latihan.** 1: `9` (`b` dan `a` satu objek yang sama), `undefined`, `true`, `{"n":1,"s":"t"}`, `3`. 2: lihat `buku.js` di atas sebagai contoh. 3: pseudocode: `UNTUK TIAP B DI DAFTAR: bila B.judul sama dengan JUDUL maka KEMBALIKAN B`; `KEMBALIKAN null`. Kunci yang dijalankan:

```js
// cari-buku.js
function cariBuku(daftar, judul) {
  for (const b of daftar) {
    if (b.judul === judul) {
      return b;
    }
  }
  return null;
}
const daftar = [
  { judul: "Dasar Web", tahun: 2018 },
  { judul: "Git Pemula", tahun: 2023 },
];
console.log(cariBuku(daftar, "Git Pemula"));
console.log(cariBuku(daftar, "Tidak Ada"));
```

```text
{
  judul: "Git Pemula",
  tahun: 2023,
}
null
```

4: kunci yang dijalankan:

```js
// rekap-buku.js
const buku = [
  { judul: "Belajar Array", tahun: 2020, tersedia: true },
  { judul: "Dasar Web", tahun: 2018, tersedia: false },
  { judul: "Algoritma Ringan", tahun: 2022, tersedia: true },
];
const rekap = { tersedia: 0, dipinjam: 0 };
for (const b of buku) {
  if (b.tersedia) {
    rekap.tersedia++;
  } else {
    rekap.dipinjam++;
  }
}
console.log(rekap);
const rataTahun = buku.reduce((jumlah, b) => jumlah + b.tahun, 0) / buku.length;
console.log(rataTahun);
```

```text
{
  tersedia: 2,
  dipinjam: 1,
}
2020
```

**Latihan bercampur.** Kunci yang dijalankan:

```js
// campur-objek.js
const ringkas = (b) => `${b.judul} (${b.tahun})`;
console.log(ringkas({ judul: "Dasar Web", tahun: 2018 }));
const bukuLama = [{ tahun: 2020 }, { tahun: 2018 }, { tahun: 2022 }];
console.log(bukuLama.reduce((m, b) => (b.tahun < m ? b.tahun : m), bukuLama[0].tahun));
const b0 = { judul: "Nol", tahun: 0 };
if (b0.tahun) {
  console.log("a: ada");
} else {
  console.log("a: dianggap tidak ada");
}
if (b0.tahun !== undefined) {
  console.log("b: ada");
}
```

```text
Dasar Web (2018)
2018
a: dianggap tidak ada
b: ada
```

Nomor 3: `0` termasuk falsy, sehingga `if (b0.tahun)` salah walaupun propertinya ada; pemeriksaan `b0.tahun !== undefined` benar.

**Ulang berjarak.** 1: `const buku = { judul: "Dasar Web", tahun: 2018 };` lalu `console.log(buku.judul)` dan `console.log(buku["judul"])`. 2: `JSON.stringify` mengubah nilai JavaScript menjadi teks JSON; `JSON.parse` mengubah teks JSON menjadi nilai JavaScript. 3: `SyntaxError`, karena JSON mewajibkan nama properti ditulis dengan tanda kutip ganda: `{"nama": "Dewi"}`.

## Langkah berikutnya

Modul berikut: `b-x2-m4` (HTML dasar), tempat data dan teks mulai ditampilkan sebagai halaman. Bacaan lanjut: halaman MDN tentang bekerja dengan objek dan tentang `JSON`, serta dokumentasi Bun tentang File I/O.
