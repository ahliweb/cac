## Untuk siapa modul ini

Modul ini untuk murid kelas X jalur B (Web dengan JavaScript, TypeScript, dan Bun), minggu `B-X2-M4` silabus v1.4.1: HTML dasar. Prasyarat: modul `b-x2-m3` (objek dan JSON) dan, di luar jalur ini, `FND-X1-M4` (bagaimana halaman web sampai ke peramban).

Modul ini karangan penyusun dan disetujui pemilik program pada 2026-11-20 (keputusan lewat dialog; catatan tinjauan menjadi tindak lanjut revisi). Butir `E-LD-f` (media digital untuk produksi dan diseminasi konten, partisipasi, kolaborasi) dipetakan silabus sebagai dipenuhi jalur ini; pemenuhan butir mengikuti pemetaan silabus, bukan status modul.

Minggu ini kamu menulis halaman, bukan program: HTML menyatakan isi dan artinya; tampilan diatur CSS (`b-x2-m5`) dan perilaku oleh JavaScript (`b-x2-m6`). Berkas HTML dibuka langsung di peramban. Blok `html` tidak diperiksa otomatis; penyusun membukanya di Chrome tanpa kepala dan mencatat yang tampak. Tugas baca-dan-prediksi ditandai `AI: tanpa AI`; selain itu AI generatif boleh dipakai dengan etika dan dicatat, tanpa data pribadi, kata sandi, atau tugas bernilai pada permintaanmu. Profil di modul ini karangan; jangan menaruh data dirimu atau orang lain di halaman latihan.

## Ingat kembali

Jawab dari ingatan, baru cek di bagian kunci. Soal 1 dari `b-x2-m3`, soal 2 dari `b-x2-m1`, soal 3 dari modul fondasi `fondasi-jaringan-dan-internet`.

1. Tulis objek `buku` dengan properti `judul` dan `tahun`, lalu cetak judulnya dengan titik dan dengan kurung siku.
2. Apa beda `map` dan `filter`? Tulis keduanya untuk `[1, 2, 3, 4]`: kuadratkan, dan ambil yang genap.
3. Apa tugas DNS ketika kamu mengetik alamat sebuah situs di peramban?

## Tujuan

Setelah modul ini kamu dapat:

- menulis kerangka dokumen HTML: `<!doctype html>`, `html` dengan `lang`, `head`, dan `body`;
- memakai judul `h1` sampai `h6`, paragraf, daftar (`ul`, `ol`, `li`), tautan (`a`), dan gambar (`img` dengan `alt`);
- memakai elemen semantik `header`, `nav`, `main`, `section`, dan `footer` untuk memberi arti pada bagian halaman;
- memeriksa hasilnya di peramban (keluaran minggu ini: halaman HTML profil fiktif).

## Prediksi dulu

HTML (HyperText Markup Language) menandai isi dengan **tag**, biasanya berpasangan seperti `<p>` dan `</p>`. Tag boleh bersarang; yang dibuka paling akhir ditutup paling dulu. Baca berkas ini dan **tebak dulu, tulis jawabanmu, baru buka di peramban**.

```html
<!doctype html>
<html lang="id">
  <head>
    <meta charset="utf-8">
    <title>Prediksi</title>
  </head>
  <body>
    <h1>Judul besar</h1>
    <p>Satu <strong>kalimat</strong> pendek.</p>
    <ul>
      <li>Satu</li>
      <li>Dua</li>
    </ul>
    <a href="https://example.com/">Ke contoh</a>
  </body>
</html>
```

1. Teks apa yang tampak di halaman, dan bagian mana yang tidak tampak?
2. Bagian mana yang tampil tebal, dan mana yang tampil sebagai butir?
3. Apa yang terjadi saat tautan diklik?

## Contoh terselesaikan

Pada percobaan penyusun di Chrome tanpa kepala (lebar 700 piksel), halaman prediksi tampil sebagai judul besar bercetak tebal `Judul besar`, paragraf `Satu kalimat pendek.` dengan `kalimat` tebal, dua butir bertitik, dan tautan `Ke contoh` berwarna biru bergaris bawah. Isi `<title>` tidak tampil di halaman, melainkan di judul tab.

**Istilah.** Satu elemen terdiri atas tag pembuka, isi, dan tag penutup. Atribut adalah keterangan tambahan di dalam tag pembuka, ditulis `nama="nilai"`, seperti `href` pada `a`. Elemen tanpa isi, seperti `meta` dan `img`, disebut *void element* dan tidak memakai tag penutup. Indentasi hanya membantu manusia membaca susunan bersarang.

Sekarang halaman profil lengkap dengan elemen semantik. Menurut MDN, `header` memuat konten pengantar, `nav` tautan navigasi, `main` konten utama dokumen, `section` bagian yang sebaiknya punya judul, dan `footer` biasanya informasi penulis atau hak cipta.

```html
<!doctype html>
<html lang="id">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Profil Dewi-contoh</title>
  </head>
  <body>
    <header>
      <h1>Dewi-contoh</h1>
      <nav>
        <a href="#tentang">Tentang</a>
        <a href="#hobi">Hobi</a>
      </nav>
    </header>
    <main>
      <section id="tentang">
        <h2>Tentang</h2>
        <p>Murid kelas X karangan yang sedang belajar membuat halaman web.</p>
      </section>
      <section id="hobi">
        <h2>Hobi</h2>
        <ul>
          <li>Membaca</li>
          <li>Menggambar</li>
          <li>Bermain catur</li>
        </ul>
      </section>
    </main>
    <footer>
      <p>Halaman latihan; semua isinya karangan.</p>
    </footer>
  </body>
</html>
```

Hasil di peramban tanpa kepala: judul `Dewi-contoh`, dua tautan, dua judul bagian dengan isinya, lalu kalimat penutup. **Elemen semantik tidak mengubah tampilan** pada gaya bawaan: halaman terlihat sama seperti bila semuanya `div`. Gunanya adalah arti, agar pembaca layar, mesin pencari, dan kamu sendiri nanti dapat mengenali kepala halaman, navigasi, isi utama, dan kaki halaman. Tautan `#tentang` menuju elemen yang `id`-nya `tentang`.

Atribut penting. `lang="id"` pada `html`: menurut MDN, ini membantu pembaca layar menentukan bahasa yang diucapkan. `charset="utf-8"` menyatakan pengodean teks. `alt` pada gambar: menurut MDN, peramban dapat menggantikan gambar yang gagal dimuat dengan teks `alt`, jadi berikan nilai yang bermakna. Contoh: `<img src="logo.svg" alt="Logo kelas: huruf B dalam lingkaran">`; pada percobaan penyusun dengan berkas yang tidak ada, peramban menampilkan teks `alt` itu.

## Contoh setengah jadi

Lengkapi bagian `____` untuk halaman klub karangan: bahasa halaman (Indonesia), elemen kepala halaman, elemen isi utama, elemen daftar bertitik, dan atribut tujuan tautan.

```html
<!doctype html>
<html lang="____">
  <head>
    <meta charset="utf-8">
    <title>Klub Catur-contoh</title>
  </head>
  <body>
    <____>
      <h1>Klub Catur-contoh</h1>
    </____>
    <____>
      <h2>Jadwal</h2>
      <p>Latihan setiap Kamis sore.</p>
      <____>
        <li>Papan</li>
        <li>Jam</li>
      </____>
      <a ____="https://example.com/">Info lengkap</a>
    </____>
  </body>
</html>
```

## Soal Parsons

Susun baris-baris di bawah (sudah diacak) menjadi halaman HTML paling sederhana yang benar.

```text
(a)   <body>
(b) </html>
(c)     <title>Halaman Pertama</title>
(d) <html lang="id">
(e)   </head>
(f)   </body>
(g)   <head>
(h)     <h1>Halo</h1>
(i) <!doctype html>
```

## Latihan

1. `AI: tanpa AI` **Baca dan prediksi.** Tanpa membuka peramban, tulis apa yang akan tampil (berkas `x.svg` tidak ada):

   ```html
   <h1>Judul</h1>
   <p>Satu
      dua


      tiga</p>
   <ol>
     <li>A</li>
     <li>B</li>
   </ol>
   <img src="x.svg" alt="Gambar contoh">
   ```
2. `AI: boleh` **Profil fiktif.** Gambar dulu sketsa susunan halaman di kertas (kepala, navigasi, dua bagian, kaki halaman), lalu tulis `profil.html` untuk tokoh karanganmu sendiri: `h1`, dua `section` dengan `h2`, satu daftar, satu tautan ke bagian lain di halaman yang sama, dan `footer`. Buka di peramban dan cocokkan dengan sketsamu.
3. `AI: boleh` **Ganti `div` dengan elemen semantik.** Tulis ulang potongan ini dengan `header`, `h1`, `main`, dan `footer`:

   ```html
   <div class="atas"><div class="judul">Klub Catur-contoh</div></div>
   <div class="isi"><p>Latihan setiap Kamis sore.</p></div>
   <div class="bawah">Halaman karangan</div>
   ```
4. `AI: boleh` **Periksa halamanmu.** Pada `profil.html`, periksa: ada `<!doctype html>`, `lang`, dan `<title>`; satu `h1`; judul tidak melompat; tiap gambar punya `alt`.
5. *Opsional:* **catatan pemakaian AI.** Kerjakan nomor 2 sendiri dulu, lalu minta penjelasan atau petunjuk bertahap, bukan halaman jadi. Catat alatnya, tujuanmu, garis besar perintahmu, bagian yang kamu pakai, dan cara memeriksanya (buka di peramban, cocokkan dengan sketsa). Jangan menaruh data pribadi atau tugas bernilai pada perintah.

## Latihan bercampur

1. Dari array `["membaca", "menggambar"]`, hasilkan teks `<li>...</li>` untuk tiap hobi dengan `map` dan templat, lalu gabungkan dengan `join` (dari `b-x2-m1` dan `b-x2-m2`).
2. Tulis fungsi `buatKartu(buku)` yang menerima objek `{ judul, tahun }` dan mengembalikan teks `<article><h2>judul</h2><p>Terbit tahun</p></article>` (dari `b-x2-m3` dan `b-x1-m12`).

Keduanya skrip Bun yang mencetak teks HTML; menempelkannya ke halaman dibahas di `b-x2-m6`.

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `b-x2-m5` (pertanyaan 1), sekitar tiga minggu lagi di `b-x2-m7` (pertanyaan 2), dan sekitar delapan minggu lagi, modul `b-x2-m12` (pertanyaan 3). Jawab sekarang lalu simpan.

1. Sebutkan tiga elemen semantik HTML selain `div` dan fungsi masing-masing.
2. Mengapa gambar memerlukan atribut `alt`?
3. Apa isi `<head>` dibandingkan dengan isi `<body>`?

## Kesalahan umum

- **Mengira baris baru di berkas menjadi baris baru di halaman.** Pada percobaan penyusun, paragraf yang ditulis dengan beberapa baris kosong tampil sebagai satu baris `Satu dua tiga`; peramban meringkas spasi dan baris baru. Pisahkan teks dengan `<p>`.
- **Memilih judul karena ukurannya.** `h1` sampai `h6` menyatakan tingkat, bukan ukuran huruf. Menurut MDN, satu halaman sebaiknya punya satu `h1` dan tingkat judul tidak dilompati; ukuran huruf diatur dengan CSS (`b-x2-m5`).
- **Gambar tanpa `alt`.** Pembaca layar dan peramban yang gagal memuat gambar tidak punya apa-apa untuk disampaikan. Untuk gambar hiasan, MDN menyebut `alt=""` sebagai penanda.
- **Tag bersarang tidak teratur.** `<b>tebal <i>miring</b> habis</i>` tetap tampil karena peramban menebak dan memperbaikinya, tetapi hasilnya mungkin bukan maksudmu. Tutup tag dalam urutan terbalik dari pembukaannya.
- **Mengira elemen semantik mengubah tampilan.** Arti dan tampilan adalah dua hal yang terpisah.
- **Lupa `<!doctype html>` atau `<title>`.** Menurut MDN, `<!doctype html>` mencegah peramban beralih ke mode quirks (mode kompatibilitas situs lama), dan `<title>` tampil di bilah judul atau tab.

## Cek mandiri

- [ ] Saya dapat menulis kerangka HTML lengkap dari ingatan.
- [ ] Saya dapat memakai judul, paragraf, daftar, tautan, dan gambar dengan `alt`.
- [ ] Saya dapat memilih elemen semantik sesuai artinya.
- [ ] Saya membuat sketsa halaman dan mencocokkannya dengan hasil di peramban.

## Kunci dan petunjuk

**Ingat kembali.** 1: `const buku = { judul: "Dasar Web", tahun: 2018 };` lalu `console.log(buku.judul)` dan `console.log(buku["judul"])`. 2: `map` menghasilkan array sama panjang dari hasil fungsi (`[1, 2, 3, 4].map((x) => x * x)` memberi `[1, 4, 9, 16]`); `filter` menyaring elemen yang lolos uji (`[1, 2, 3, 4].filter((x) => x % 2 === 0)` memberi `[2, 4]`). 3: DNS menerjemahkan nama situs menjadi alamat IP, seperti buku telepon.

**Prediksi dulu.** 1: `Judul besar`, `Satu kalimat pendek.`, `Satu`, `Dua`, `Ke contoh`. `<title>` dan `<meta>` tidak tampil di halaman; `<title>` tampil di tab. 2: `Judul besar` (judul) dan kata `kalimat` (`strong`) tebal; `Satu` dan `Dua` tampil sebagai butir `ul`. 3: peramban pindah ke `https://example.com/`.

**Contoh setengah jadi.** Isian berurutan: `id`; `header` (pembuka) dan `header` (penutup); `main` (pembuka) dan `main` (penutup di akhir isi); `ul` (pembuka dan penutup); `href`. Kunci lengkap:

```html
<!doctype html>
<html lang="id">
  <head>
    <meta charset="utf-8">
    <title>Klub Catur-contoh</title>
  </head>
  <body>
    <header>
      <h1>Klub Catur-contoh</h1>
    </header>
    <main>
      <h2>Jadwal</h2>
      <p>Latihan setiap Kamis sore.</p>
      <ul>
        <li>Papan</li>
        <li>Jam</li>
      </ul>
      <a href="https://example.com/">Info lengkap</a>
    </main>
  </body>
</html>
```

**Soal Parsons.** Urutan benar: i, d, g, c, e, a, h, f, b. `head` ditutup sebelum `body` dibuka, dan `html` ditutup paling akhir.

**Latihan.** 1: judul besar `Judul`; satu baris `Satu dua tiga` (spasi dan baris baru diringkas); daftar bernomor `1. A` dan `2. B`; karena `x.svg` tidak ada, peramban menampilkan teks `Gambar contoh` (pada percobaan penyusun tampil dengan ikon gambar rusak). 2: periksa hasilmu terhadap sketsa; kerangka seperti `profil.html` di atas. 3: kunci:

```html
<header><h1>Klub Catur-contoh</h1></header>
<main><p>Latihan setiap Kamis sore.</p></main>
<footer>Halaman karangan</footer>
```

4: periksa satu per satu di halamanmu; bila ada judul yang melompat, ubah tingkatnya.

**Latihan bercampur.** Kunci yang dijalankan:

```js
// html-dari-array.js
const hobi = ["membaca", "menggambar"];
const daftar = hobi.map((h) => `  <li>${h}</li>`).join("\n");
console.log(`<ul>\n${daftar}\n</ul>`);

function buatKartu(buku) {
  return `<article><h2>${buku.judul}</h2><p>Terbit ${buku.tahun}</p></article>`;
}
console.log(buatKartu({ judul: "Dasar Web", tahun: 2018 }));
```

```text
<ul>
  <li>membaca</li>
  <li>menggambar</li>
</ul>
<article><h2>Dasar Web</h2><p>Terbit 2018</p></article>
```

**Ulang berjarak.** 1: `header` (pengantar halaman), `nav` (tautan navigasi), `main` (isi utama), `section` (bagian bertopik, sebaiknya dengan judul), `footer` (kaki halaman); tiga di antaranya sudah cukup. 2: sebagai teks pengganti bila gambar gagal dimuat dan agar pembaca layar dapat menyampaikan isinya. 3: `<head>` memuat keterangan tentang dokumen (misalnya `meta` dan `title`) yang tidak tampil di halaman; `<body>` memuat isi yang tampil.

## Langkah berikutnya

Modul berikut: `b-x2-m5` (CSS dasar dan responsif), yang menata tampilan halaman yang baru kamu tulis. Bacaan lanjut: halaman MDN tentang sintaks HTML dasar dan tentang elemen `header`, `nav`, `main`, `section`, dan `footer`.
