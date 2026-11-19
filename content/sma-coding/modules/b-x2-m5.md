## Untuk siapa modul ini

Modul ini untuk murid kelas X jalur B (Web dengan JavaScript, TypeScript, dan Bun), minggu `B-X2-M5` silabus v1.4.1: CSS dasar dan responsif. Prasyarat: modul `b-x2-m4` (HTML dasar); kamu memakai halaman HTML yang kamu tulis di sana.

Modul ini berstatus DRAF: karangan penyusun, belum ditinjau pemilik. Butir `E-LD-f` (media digital untuk produksi konten, partisipasi, kolaborasi) dipetakan silabus sebagai dipenuhi jalur ini; modul draf ini belum dihitung sebagai pemenuhan butir itu.

Blok `html` dan `css` tidak diperiksa otomatis. Penyusun membukanya di Google Chrome 158 tanpa kepala (per 2026-11) dan mencatat angka yang terukur serta tangkapan layar; yang tidak dilihat tidak diklaim. Tugas baca-dan-prediksi ditandai `AI: tanpa AI`; selain itu AI generatif boleh dipakai dengan etika dan dicatat, tanpa data pribadi atau tugas bernilai pada permintaanmu. Semua isi halaman karangan.

## Ingat kembali

Jawab dari ingatan, baru cek di bagian kunci. Soal 1 dari `b-x2-m4`, soal 2 dari `b-x2-m2`, soal 3 dari `b-x2-m1`.

1. Sebutkan tiga elemen semantik HTML selain `div` dan fungsi masing-masing.
2. Tulis kode yang mengubah `teks` menjadi huruf besar, dan kode yang mengubah `"a-b-c"` menjadi array `["a", "b", "c"]`.
3. Apa indeks elemen pertama sebuah array, dan ekspresi apa yang memberi elemen terakhir dari `daftar`?

## Tujuan

Setelah modul ini kamu dapat:

- menulis aturan CSS (selektor, properti, nilai) dan menautkan berkas CSS ke halaman HTML;
- memakai selektor elemen, kelas, dan id, serta menjelaskan aturan mana yang menang saat bentrok;
- menjelaskan model kotak dan memakai `box-sizing: border-box`;
- membuat tata letak dua kolom dengan flexbox yang menumpuk di layar sempit memakai `@media`;
- memeriksa hasilnya pada dua lebar jendela (keluaran: halaman bergaya yang responsif).

## Prediksi dulu

CSS (Cascading Style Sheets) berisi **aturan**: selektor yang memilih elemen, lalu daftar `properti: nilai;` di dalam kurung kurawal. Baca ini dan **tebak dulu, tulis jawabanmu, baru jalankan atau buka di peramban**.

```html
<p>Satu</p>
<p class="penting">Dua</p>
<p class="penting" id="khusus">Tiga</p>
```

```css
p { color: blue; }
.penting { color: green; }
#khusus { color: red; }
p { font-size: 20px; }
```

1. Apa warna dan ukuran huruf tiap paragraf?
2. Mengapa warna tidak ditentukan oleh urutan penulisan saja?

## Contoh terselesaikan

Penyusun membaca gaya yang dihitung peramban. Hasilnya: `Satu` biru, `Dua` hijau, `Tiga` merah; ketiganya berukuran 20 piksel.

**Kekhususan (specificity).** Peramban memilih satu aturan bila beberapa aturan menyentuh properti yang sama. Menurut MDN, selektor id mengalahkan selektor kelas, dan selektor kelas mengalahkan selektor elemen, berapa pun banyaknya; bila kekhususannya sama, aturan yang ditulis paling akhir menang. Itu sebabnya `Tiga` merah walaupun aturan `p` ditulis paling akhir.

**Model kotak.** Menurut MDN, tiap elemen berupa kotak berlapis dari dalam ke luar: isi, padding, border, margin. Dengan nilai bawaan, `width` mengatur lebar isi saja; padding dan border ditambahkan di luarnya. Pada percobaan penyusun, kotak `width: 300px; padding: 20px; border: 5px solid` tampak selebar 350 piksel; dengan `border-box` selebar 300 piksel, karena `width` mencakup padding dan border.

**Halaman dua kolom yang responsif.** Berkas `index.html` menautkan `gaya.css` lewat `<link rel="stylesheet" href="gaya.css">`. Tag `meta viewport` di `head` meminta peramban seluler memakai lebar layar sebenarnya; menurut MDN, tanpa tag itu sebagian perangkat menata halaman pada jendela maya yang lebih lebar lalu mengecilkannya, sehingga aturan layar sempit tidak berlaku. Penyusun tidak menguji perangkat seluler; yang diuji hanya lebar jendela.

```html
<!doctype html>
<html lang="id">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Klub Catur-contoh</title>
    <link rel="stylesheet" href="gaya.css">
  </head>
  <body>
    <header>
      <h1>Klub Catur-contoh</h1>
    </header>
    <main class="dua-kolom">
      <section class="kolom">
        <h2>Jadwal</h2>
        <p>Latihan setiap Kamis sore.</p>
      </section>
      <section class="kolom">
        <h2>Peralatan</h2>
        <ul>
          <li>Papan</li>
          <li>Jam</li>
        </ul>
      </section>
    </main>
    <footer>
      <p>Halaman latihan; semua isinya karangan.</p>
    </footer>
  </body>
</html>
```

`gaya.css` dimulai dari layar sempit (satu kolom), lalu `@media (min-width: 600px)` mengubahnya untuk jendela selebar 600 piksel atau lebih. Menurut MDN, `display: flex` menjadikan anak langsung elemen itu butir flex, `flex-direction` menentukan arah sumbu utama (`column` menumpuk, `row` berjajar), dan `flex: 1` membagi ruang sama rata.

```css
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: sans-serif;
  color: #222222;
  background: #ffffff;
}

header {
  padding: 16px;
  color: #ffffff;
  background: #1f4e79;
}

footer {
  padding: 0 16px;
}

.dua-kolom {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
}

.kolom {
  padding: 12px;
  border: 2px solid #1f4e79;
}

@media (min-width: 600px) {
  .dua-kolom {
    flex-direction: row;
  }

  .kolom {
    flex: 1;
  }
}
```

Pada percobaan penyusun, di jendela selebar 400 piksel kedua `section` bertumpuk (arah `column`), masing-masing selebar 368 piksel; di jendela 800 piksel keduanya berjajar (arah `row`), masing-masing selebar 376 piksel, dipisahkan celah 16 piksel dari `gap`. Tangkapan layar 800 piksel menunjukkan header biru berjudul putih dan dua kotak berbingkai biru berdampingan.

## Contoh setengah jadi

Daftar kartu yang menumpuk di layar sempit dan berjajar mulai 600 piksel. Lengkapi `____`: properti ukuran kotak, selektor daftar, awalan lebar minimum, arah baris, dan nilai `flex` pembagi rata.

```html
<ul class="daftar-kartu">
  <li class="kartu">Papan</li>
  <li class="kartu">Jam</li>
  <li class="kartu">Buku</li>
</ul>
```

```css
* {
  ____: border-box;
}

____ {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 0;
  list-style: none;
}

.kartu {
  padding: 12px;
  border: 1px solid #555555;
}

@media (____-width: 600px) {
  .daftar-kartu {
    flex-direction: ____;
  }

  .kartu {
    flex: ____;
  }
}
```

## Soal Parsons

Susun baris-baris di bawah (sudah diacak) menjadi dua aturan: judul berukuran 24 piksel, dan pada lebar 600 piksel ke atas berukuran 32 piksel. Baris (g) dan (h) sama persis, jadi boleh bertukar tempat.

```text
(a)     font-size: 32px;
(b) .judul {
(c) @media (min-width: 600px) {
(d)   }
(e)   font-size: 24px;
(f)   .judul {
(g) }
(h) }
```

## Latihan

1. `AI: tanpa AI` **Baca dan prediksi.** Tanpa membuka peramban, jawab: (a) paragraf `<p class="penting">` dengan aturan `.penting { color: red; }` lalu `p.penting { color: green; }` berwarna apa, dan mengapa? (b) Berapa lebar tampak kotak `width: 300px; padding: 20px; border: 5px solid black; margin: 10px;`, dengan dan tanpa `box-sizing: border-box`? Lebar tampak dihitung sampai tepi border.
2. `AI: boleh` **Profil bergaya.** Sketsa dulu halaman profil dari `b-x2-m4` di kertas (warna dan jarak). Tulis dan tautkan `gaya.css`: warna latar `header`, jarak antar-bagian, gaya `nav`. Buka di peramban dan cocokkan dengan sketsamu.
3. `AI: boleh` **Tiga bagian.** Tambahkan `section` ketiga ("Biaya"). Perkirakan lebar tiap kolom pada jendela 700 piksel sebelum mengukurnya.
4. `AI: boleh` **Periksa halamanmu.** Buka pada jendela sempit (sekitar 400 piksel) dan lebar (sekitar 800 piksel): tidak ada gulir mendatar, teks terbaca, susunan berubah pada 600 piksel.
5. *Opsional:* **catatan pemakaian AI.** Kerjakan nomor 2 sendiri dulu, lalu minta penjelasan atau petunjuk bertahap, bukan CSS jadi. Catat alatnya, tujuanmu, garis besar perintahmu, bagian yang kamu pakai, dan cara memeriksanya. Jangan menaruh data pribadi atau tugas bernilai pada perintah.

## Latihan bercampur

1. Dari array objek tema `{ nama, warna }`, hasilkan teks aturan CSS `.nama { color: warna; }` untuk tiap tema dengan `map`, templat, dan `join` (dari `b-x2-m1`, `b-x2-m2`, dan `b-x2-m3`).
2. Tulis fungsi `namaKelas(teks)` yang mengubah `"Klub Catur"` menjadi `klub-catur`, nama yang cocok sebagai kelas CSS (dari `b-x2-m2`).
3. Periksa `profil.html` dari `b-x2-m4`: adakah `meta viewport` dan `<link>` ke `gaya.css`?

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `b-x2-m6` (pertanyaan 1), sekitar tiga minggu lagi di `b-x2-m8` (pertanyaan 2), dan sekitar delapan minggu lagi, modul `b-x2-m13` (pertanyaan 3). Jawab sekarang lalu simpan.

1. Sebutkan empat lapisan model kotak dari dalam ke luar, dan apa yang diubah `box-sizing: border-box`.
2. Mengapa `#khusus` mengalahkan `.penting` dan `.penting` mengalahkan `p`, walaupun urutan penulisannya berbeda?
3. Tulis `@media` yang membuat `.dua-kolom` berjajar mulai lebar 600 piksel.

## Kesalahan umum

- **Titik koma terlewat.** Pada percobaan penyusun, `.a { color: red font-size: 30px; }` membuat kedua deklarasi diabaikan: teks tetap hitam dan berukuran 16 piksel. Tiap deklarasi diakhiri `;`.
- **Selektor kelas tanpa titik.** `penting { ... }` memilih elemen `<penting>`, bukan kelas. Kelas ditulis `.penting`, id `#khusus`.
- **`width: 100%` ditambah padding.** Pada percobaan penyusun di jendela 600 piksel, kotak `width: 100%; padding: 20px` membuat halaman melebar sampai 640 piksel dan muncul gulir mendatar. Pakai `box-sizing: border-box`.
- **Tertukar margin dan padding.** Padding di dalam border (ruang bagi isi); margin di luar border (jarak ke tetangga).
- **Mengira aturan terakhir selalu menang.** Urutan baru menentukan bila kekhususannya sama; `p.penting` mengalahkan `.penting` walaupun ditulis lebih dulu.

## Cek mandiri

- [ ] Saya dapat menautkan `gaya.css` ke HTML dan menulis aturan dengan selektor elemen, kelas, dan id.
- [ ] Saya dapat menyebut empat lapisan model kotak dan memakai `border-box`.
- [ ] Saya dapat membuat susunan yang menumpuk di layar sempit dan berjajar di layar lebar.
- [ ] Saya memeriksa halamanku pada dua lebar jendela.

## Kunci dan petunjuk

**Ingat kembali.** 1: `header` (pengantar halaman), `nav` (navigasi), `main` (isi utama), `section` (bagian bertopik), `footer` (kaki halaman); tiga cukup. 2: `teks.toUpperCase()` dan `"a-b-c".split("-")`. 3: indeks pertama 0; elemen terakhir `daftar[daftar.length - 1]`.

**Prediksi dulu.** 1: `Satu` biru, `Dua` hijau, `Tiga` merah; semuanya 20 piksel, karena hanya satu aturan menetapkan `font-size` dan ia memilih semua `p`. 2: karena peramban lebih dulu membandingkan kekhususan (id lebih kuat daripada kelas, kelas lebih kuat daripada elemen); urutan penulisan hanya dipakai bila kekhususannya sama.

**Contoh setengah jadi.** Isian berurutan: `box-sizing`; `.daftar-kartu`; `min`; `row`; `1`. Kunci lengkap:

```css
* {
  box-sizing: border-box;
}

.daftar-kartu {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 0;
  list-style: none;
}

.kartu {
  padding: 12px;
  border: 1px solid #555555;
}

@media (min-width: 600px) {
  .daftar-kartu {
    flex-direction: row;
  }

  .kartu {
    flex: 1;
  }
}
```

**Soal Parsons.** Urutan benar: b, e, g, c, f, a, d, h (dengan g dan h boleh bertukar). Aturan dasar ditutup sebelum `@media` dibuka, dan `@media` ditutup paling akhir.

**Latihan.** 1: (a) hijau, karena `p.penting` berkekhususan elemen ditambah kelas, lebih tinggi daripada `.penting`, walaupun `.penting` ditulis lebih dulu (penyusun mengukur hijau). (b) 350 piksel tanpa `border-box` (300 + 2 x 20 + 2 x 5) dan 300 piksel dengan `border-box`; margin tidak dihitung. 2: periksa terhadap sketsa; kerangka seperti `gaya.css` di atas. 3: pada jendela 700 piksel, pada percobaan penyusun tiga `section` berjajar masing-masing selebar 212 piksel; perkiraan dari rumus: (700 - 2 x 16 padding - 2 x 16 celah) / 3 = 212. 4: bila ada gulir mendatar, cari lebar tetap atau `width: 100%` yang ditambah padding.

**Latihan bercampur.** Kunci yang dijalankan:

```js
// aturan-dari-array.js
const tema = [
  { nama: "utama", warna: "#1f4e79" },
  { nama: "aksen", warna: "#c0392b" },
];
const css = tema.map((t) => `.${t.nama} { color: ${t.warna}; }`).join("\n");
console.log(css);

function namaKelas(teks) {
  return teks.toLowerCase().split(" ").join("-");
}
console.log(namaKelas("Klub Catur"));
```

```text
.utama { color: #1f4e79; }
.aksen { color: #c0392b; }
klub-catur
```

3: pastikan `<meta name="viewport" content="width=device-width, initial-scale=1">` dan `<link rel="stylesheet" href="gaya.css">` ada di `head`.

**Ulang berjarak.** 1: isi, padding, border, margin; `border-box` membuat `width` mencakup isi, padding, dan border. 2: peramban membandingkan kekhususan lebih dulu: id lebih kuat daripada kelas, kelas lebih kuat daripada elemen; urutan hanya menentukan bila kekhususannya sama. 3: `@media (min-width: 600px) { .dua-kolom { flex-direction: row; } }`.

## Langkah berikutnya

Modul berikut: `b-x2-m6` (DOM dan peristiwa), yang membuat halaman yang baru kamu tata bereaksi terhadap klik. Modul terkait: `matkom-teks-gambar-suara`. Bacaan lanjut: halaman MDN tentang model kotak, kekhususan, media query, dan flexbox.
