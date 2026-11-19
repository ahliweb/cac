## Untuk siapa modul ini

Modul ini untuk jalur **personal** (`PRS`), 5 jam, sesudah `DW-PRS-M3`. Anda perlu penyunting teks, peramban web apa pun, dan (untuk bagian melayani halaman) Python 3 dan terminal; penulis memakai Python 3.12.3. Estimasi dua sesi `[asumsi]`.

Halaman profil hobi di modul ini **rekaan** ("Tokoh Contoh"). "Menerbitkan secara lokal" berarti halaman hanya dapat dibuka di komputer Anda sendiri. Modul ini **tidak** mengunggah apa pun ke internet; sebelum kelak mengunggah, baca bagian "Kesalahan umum" tentang apa yang tidak boleh ditaruh di halaman publik.

## Cek awal pengalaman

Jawab tanpa melihat apa pun, lalu cocokkan dengan kunci. Skor tidak dicatat.

1. Apa fungsi tag penutup seperti `</p>`?
2. Apa beda `<ul>` dan `<ol>`?
3. Pada `<a href="x.html">Buka</a>`, apa itu `href`?
4. Tulis aturan CSS yang membuat semua `h2` berwarna biru.
5. Apa yang diwakili `lang="id"` pada tag `<html>`?

Bila kelimanya benar, Anda boleh melewati "Contoh terselesaikan" dan "Contoh setengah jadi" dan langsung ke "Latihan".

## Ingat kembali

Tanpa melihat modul sebelumnya, tulis jawaban singkat.

1. (`DW-PRS-M3`) Apa beda mode `"w"` dan `"a"`, dan mengapa program yang menulis berkas perlu aman dijalankan dua kali?
2. (`DW-PRS-M2`) Mengapa `input()` perlu dibungkus `int(...)`?
3. (`DW-PRS-M1`) Apa itu menelusuri dengan tabel, dan mengapa dikerjakan sebelum langkah dianggap benar?

Cocokkan: (1) `"w"` mengosongkan berkas lalu menulis, `"a"` menambahkan di akhir; program yang menambah tanpa memeriksa membuat entri ganda bila dijalankan ulang; (2) karena `input()` memberi teks; (3) menuliskan nilai tiap langkah pada tabel, satu baris per putaran, supaya kesalahan terlihat sebelum program dijalankan.

## Tujuan

Setelah modul ini Anda dapat menulis halaman web dengan HTML dan CSS, dan membukanya secara lokal.

## Prediksi dulu

Sebelum membaca, tulis apa yang tampil di peramban untuk potongan ini: berapa butir daftar, dan kata mana yang tebal?

```html
<ul><li>Cabai</li><li>Kemangi</li></ul>
<p>Saya menanam <strong>cabai</strong> di balkon.</p>
```

## Contoh terselesaikan

### HTML: struktur halaman

HTML menandai **arti** bagian teks dengan tag: `<h1>` judul, `<p>` paragraf, `<ul>` dan `<li>` daftar, `<a href>` tautan, `<strong>` penekanan kuat. Hampir semua tag punya penutup (`</p>`); `<meta>` dan `<link>` tidak. **Atribut** seperti `href` ada di tag pembuka. Simpan sebagai `index.html`:

```html
<!doctype html>
<html lang="id">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Profil Hobi Contoh</title>
    <link rel="stylesheet" href="gaya.css">
  </head>
  <body>
    <header>
      <h1>Kebun Pot Tokoh Contoh</h1>
      <p>Catatan hobi menanam di pot (data rekaan).</p>
    </header>
    <main>
      <section>
        <h2>Tentang hobi ini</h2>
        <p>Saya menanam <strong>cabai</strong> dan <em>kemangi</em> di balkon.</p>
      </section>
      <section>
        <h2>Tanaman saya</h2>
        <ul>
          <li>Cabai rawit</li>
          <li>Kemangi</li>
          <li>Seledri</li>
        </ul>
      </section>
      <section>
        <h2>Jadwal siram</h2>
        <table>
          <tr><th>Hari</th><th>Tanaman</th></tr>
          <tr><td>Senin</td><td>Cabai rawit</td></tr>
          <tr><td>Kamis</td><td>Kemangi</td></tr>
        </table>
        <p><a href="https://developer.mozilla.org/en-US/docs/Web/HTML">Belajar HTML lebih lanjut</a></p>
      </section>
    </main>
  </body>
</html>
```

`<head>` memuat keterangan tentang halaman (judul tab, huruf, tautan ke gaya); `<body>` memuat yang tampil. Elemen seperti `header`, `main`, dan `section` memberi arti pada bagian halaman sehingga lebih mudah dipahami pembaca layar dan mesin pencari. Penjelasan lengkap ada di [dokumentasi HTML MDN](https://developer.mozilla.org/en-US/docs/Web/HTML).

Jawaban prediksi: dua butir daftar, dan kata "cabai" pada paragraf tebal.

### CSS: tampilan

CSS terdiri dari **aturan**: pemilih (siapa yang diatur), lalu pasangan properti dan nilai dalam kurung kurawal. Simpan sebagai `gaya.css` di folder yang sama:

```css
body {
  font-family: sans-serif;
  max-width: 40rem;
  margin: 0 auto;
  padding: 1rem;
  color: #222222;
  background-color: #ffffff;
}

h1 {
  color: #2d6a4f;
}

section {
  margin-top: 1.5rem;
}

table {
  border-collapse: collapse;
}

th,
td {
  border: 1px solid #999999;
  padding: 0.25rem 0.75rem;
}

a {
  color: #1b4f8a;
}
```

`max-width: 40rem` menjaga baris tidak terlalu panjang; `th, td` memakai satu aturan untuk dua pemilih. Teks gelap di latar terang menjaga keterbacaan. Dasar CSS ada di [panduan CSS MDN](https://developer.mozilla.org/en-US/docs/Web/CSS). Penulis memeriksa bahwa tag di `index.html` berpasangan lengkap (dengan skrip pemeriksa tag buatan sendiri memakai `html.parser` dari Python) dan bahwa kedua berkas dilayani dengan benar; tampilan visual Anda yang akan memeriksanya di peramban Anda sendiri.

### Membuka halaman secara lokal

Dua cara, keduanya hanya di komputer Anda:

1. **Buka berkasnya langsung** di peramban (menu Buka berkas, atau seret `index.html` ke jendela peramban).
2. **Layani dari folder** dengan server bawaan Python, terikat ke alamat lokal saja:

```text
python3 -m http.server 8000 --bind 127.0.0.1
```

Lalu buka `http://127.0.0.1:8000/index.html` di peramban; hentikan dengan `Ctrl+C`. Penulis menjalankannya dan memeriksa bahwa `index.html` dan `gaya.css` dijawab `200` dengan jenis `text/html` dan `text/css` ([dokumentasi `http.server`](https://docs.python.org/3/library/http.server.html)). Server ini untuk latihan di komputer sendiri; ia bukan untuk melayani pengunjung dari internet. Gunakan `--bind 127.0.0.1` supaya perangkat lain di jaringan Anda tidak dapat mengaksesnya.

## Contoh setengah jadi

Lengkapi tiga titik `___` agar tampil subjudul "Jadwal pupuk" dan tautan yang bisa diklik:

```html setengah-jadi
<___>Jadwal pupuk</___>
<p><a ___="https://developer.mozilla.org/en-US/docs/Web/CSS">Belajar CSS</a></p>
```

Prediksi dulu apa yang tampil jika Anda salah menulis nama atributnya. Kerangka berlubang bukan halaman yang berjalan sampai Anda mengisinya.

## Latihan

1. **Ubah.** Ganti warna `h1` menjadi warna lain yang tetap mudah dibaca dan tambahkan satu tanaman ke daftar. Prediksi dulu apa yang berubah di tampilan.
2. **Buat.** Buat halaman profil hobi Anda sendiri (rekaan atau umum) dengan judul, tiga bagian, satu daftar, dan satu tabel. Pisahkan gayanya di `gaya.css`.
3. **Jelaskan.** Ubah `href="gaya.css"` menjadi `href="gayaa.css"`. Apa yang terlihat, dan mengapa halaman tetap tampil walau tanpa gaya?
4. **Buat.** Tambahkan aturan CSS yang membuat baris tabel bergantian warna (cari `:nth-child` di dokumentasi CSS, lalu uji di halaman Anda).
5. **Berpasangan (opsional).** Tukar halaman dengan rekan; masing-masing membuka halaman rekan di peramban, memperbesar tampilan (zoom) ke 200 persen, dan mencatat satu bagian yang sulit dibaca. Peserta mandiri boleh melakukannya pada halaman sendiri.

## Latihan bercampur

1. (`DW-PRS-M3`) Tulis program Python yang menghasilkan teks `<ul>` dengan satu `<li>` untuk tiap nama dalam daftar `["Cabai rawit", "Kemangi", "Seledri & daun bawang"]`. Prediksi dulu bagaimana tanda `&` seharusnya ditulis dalam HTML, lalu periksa dengan `html.escape`.
2. (`DW-FND-M1`) Daftar tiga hal yang tidak Anda taruh di halaman yang kelak bisa dibaca orang lain, dan jelaskan alasannya.

## Keluaran portofolio

**Halaman profil hobi sintetis.** Satu `index.html` dan satu `gaya.css` yang membuka dengan benar secara lokal, dengan isi rekaan atau umum (tanpa nama, alamat, nomor telepon, atau foto orang nyata). Sertakan satu kalimat tentang cara Anda membukanya.

## Ulang berjarak

Tanpa melihat modul ini, kerjakan ulang dan cocokkan. Pertanyaan ini akan muncul lagi di "Ingat kembali" modul berikutnya.

| Kapan | Pertanyaan |
| --- | --- |
| Satu minggu lagi (modul berikutnya) | Apa beda HTML dan CSS, dan mengapa gaya dipisah ke berkas sendiri? |
| Tiga modul lagi | Tulis dari ingatan kerangka dokumen HTML dengan `head`, `title`, dan satu tautan ke berkas CSS. |
| Akhir jalur | Apa yang harus diperiksa sebelum halaman pribadi dibagikan kepada orang lain? |

## Kebijakan AI

Modul ini tidak memakai asisten AI; kebijakan lengkap program ada di `DW-FND-M1` dan dipakai penuh pada `DW-PKJ-M6`, `DW-PRO-M13`, dan `DW-BIS-M7` (silabus bagian 9.1).

## Kesalahan umum

- **Tag tidak ditutup atau bersilang.** `<p>Teks <strong>tebal</p></strong>` membuat peramban menebak; tutup dari dalam ke luar.
- **Jalur berkas salah.** Bila `gaya.css` tidak di folder yang sama dengan `index.html`, `href` tidak menemukannya dan halaman tampil tanpa gaya.
- **Titik koma atau kurung kurawal terlupa di CSS.** Satu karakter hilang membuat aturan sesudahnya diabaikan.
- **Menaruh data pribadi nyata di halaman.** Alamat rumah, nomor telepon, foto anak atau orang lain, dan kata sandi tidak ditaruh di halaman yang bisa dibagikan.
- **Membuka server latihan ke jaringan.** Tanpa `--bind 127.0.0.1`, perangkat lain di jaringan yang sama mungkin dapat membuka folder Anda.

## Cek mandiri

Tutup modul dan jawab:

1. Tulis dari ingatan kerangka halaman HTML dengan `head`, `title`, `body`, dan satu judul.
2. Apa yang dilakukan `href` pada `<link>` dan pada `<a>`?
3. Apa beda membuka berkas langsung dan melayaninya dengan `http.server`?

Daftar periksa (kosong; Anda isi sendiri, tidak dikumpulkan):

- [ ] Semua tag di halaman saya berpasangan.
- [ ] Halaman terbaca pada zoom 200 persen.
- [ ] Tidak ada data pribadi nyata di halaman.
- [ ] Server latihan terikat ke `127.0.0.1` dan sudah saya hentikan.

## Kunci dan petunjuk

- **Cek awal:** (1) menandai akhir elemen; (2) `<ul>` daftar bertitik tanpa urutan, `<ol>` daftar bernomor berurutan; (3) alamat tujuan tautan; (4) `h2 { color: blue; }`; (5) bahasa isi halaman (Indonesia), yang membantu pembaca layar dan mesin pencari.
- **Prediksi:** dua butir daftar; "cabai" pada paragraf tebal.
- **Setengah jadi:** `h2` (pembuka dan penutup) dan `href`. Bila nama atribut salah, tautan tetap tampil sebagai teks tetapi tidak bisa diklik.
- **Latihan 3:** halaman tampil sebagai teks biasa dengan gaya bawaan peramban, sebab peramban tidak berhenti karena berkas gaya tidak ditemukan.
- **Latihan 4:** aturan seperti `tr:nth-child(even) { background-color: #eeeeee; }`.
- **Latihan bercampur 1:** `&` ditulis `&amp;`; keluarannya adalah `<ul>`, tiga baris `  <li>...</li>` (yang ketiga `Seledri &amp; daun bawang`), lalu `</ul>` (dijalankan penulis).
- **Petunjuk bila macet:** buka alat pengembang peramban atau cek jalur berkas; sebagian besar masalah "gaya tidak muncul" adalah nama atau letak berkas yang berbeda.

## Langkah berikutnya

`DW-PRS-M5`: Anda sudah memakai Python dan membuat halaman. Berikutnya Python dipakai untuk menjalankan pekerjaan berulang: menamai ulang berkas, menghitung anggaran, dan mengingatkan jadwal.

## Catatan untuk pendamping

- **Waktu:** 5 jam. **Bahan:** penyunting teks, peramban, Python 3, terminal. Penulis menjalankan skrip Python dengan `python3 -I` (Python 3.12.3), memeriksa pasangan tag `index.html`, dan memeriksa respons `http.server` (200, `text/html` dan `text/css`). Tampilan visual di peramban tidak diperiksa penulis.
- **Tanda siap lanjut:** peserta membuka halaman buatannya secara lokal dan menjelaskan peran `<link>` dan aturan CSS.
- **Privasi:** pastikan tidak ada foto atau data pribadi nyata di halaman latihan, dan server latihan tidak dibuka ke jaringan.
