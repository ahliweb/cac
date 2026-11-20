## Untuk siapa modul ini

Modul ini untuk murid kelas XII jalur B (Web dengan JavaScript, TypeScript, dan Bun), minggu `B-XII1-M1` silabus v1.4.1: Astro, halaman statis dan komponen. Prasyarat: modul `b-xi2-m12` (penyajian statis) dan `b-xi1-m6` (modul ESM dan paket).

Modul ini karangan penyusun dan disetujui pemilik program pada 2026-11-20 (keputusan lewat dialog; catatan tinjauan menjadi tindak lanjut revisi). Silabus memetakan butir `F-AP-d` pada minggu ini; pemenuhan butir mengikuti pemetaan silabus, bukan status modul.

Semua contoh dijalankan penyusun dengan Bun 1.4.4 dan Astro 7.4.13 per 2026-11, di folder sementara, tanpa akun dan tanpa data nyata. Sekolah dalam contoh karangan belaka. Tugas baca-dan-prediksi `AI: tanpa AI`; selain itu AI boleh dipakai dengan etika dan dicatat, tanpa data pribadi atau rahasia pada permintaanmu.

## Ingat kembali

Jawab dari ingatan dulu, baru cek di bagian kunci. Soal 1 dari `b-xi2-m10`, soal 2 dari `b-xi2-m12`, soal 3 dari `b-xi2-m7`.

1. Apa itu XSS, dan apa dua cara mencegahnya?
2. Apa yang boleh dan tidak boleh ada di folder yang disajikan ke orang lain?
3. Sebutkan dua cara membuat grafik tetap dapat dipahami tanpa melihat warna atau gambarnya.

## Tujuan

Setelah modul ini kamu dapat:

- membuat proyek Astro dengan `bun create astro` dan membangunnya menjadi situs statis;
- menjelaskan bagian `---` (skrip komponen) dan templat pada berkas `.astro`, serta kapan skrip itu berjalan;
- membuat komponen yang menerima `props` dan memakainya berulang dari data;
- membedakan `bun run dev` dari `bun run build` dan menyebut folder yang diserahkan (keluaran minggu ini: situs Astro).

## Prediksi dulu

Ini tugas baca-dan-prediksi, `AI: tanpa AI`. **Tebak dulu, tulis jawabanmu, baru jalankan.**

```astro
---
const nama = "Klub <b>Robot</b> & Coding";
const jam = 2;
---
<p>{nama}</p>
<p>{jam + 1} jam</p>
<p set:html={nama}></p>
```

1. Apa isi HTML yang dihasilkan untuk ketiga baris `<p>`?
2. Apakah ada kode JavaScript dari berkas ini yang ikut dikirim ke peramban?

## Contoh terselesaikan

Astro adalah kerangka untuk situs yang sebagian besar isinya tetap. Berkas `.astro` punya dua bagian: skrip komponen di antara dua garis `---`, dan templat HTML di bawahnya (dokumentasi Astro menyebut garis itu *code fence*). Skrip berjalan **saat build**, di komputermu, bukan di peramban pengunjung. Penyusun membuat proyek lalu memasangnya:

```sh
bun create astro@latest situs -- --template minimal --no-install --no-git --yes
cd situs
bun install
bunx astro --version
```

```text
astro   v7.4.13
```

Proyek baru memuat `src/pages/index.astro`; setiap berkas di `src/pages/` menjadi satu halaman. Penyusun menaruh contoh prediksi di `src/pages/prediksi.astro` lalu membangun:

```sh
bun run build
```

```text
$ astro build
[types] Generated 150ms
[build] output: "static"
[build] mode: "static"
[build] Collecting build info...
[build] ✓ Completed in 170ms.
[build] Building static entrypoints...
[vite] ✓ built in 123ms
[vite] ✓ built in 19ms
[build] Rearranging server assets...

generating static routes 
  ├─ /prediksi/index.html (+7ms) 
  ├─ /index.html (+2ms) 
✓ Completed in 31ms.

[build] ✓ Completed in 206ms.
[build] 2 page(s) built in 376ms
[build] Complete!
```

Awalan jam pada tiap baris dan baris jalur folder dibuang agar mudah dibaca; angka milidetik berbeda di komputermu. Isi `dist/prediksi/index.html` yang dihasilkan:

```text
<!DOCTYPE html><p>Klub &lt;b&gt;Robot&lt;/b&gt; &amp; Coding</p><p>3 jam</p><p>Klub <b>Robot</b> & Coding</p>
```

Jadi `{nama}` di templat **di-escape**: tanda `<` menjadi `&lt;` sehingga tampil sebagai teks, sama dengan `esc` di modul `b-xi2-m7`. Ekspresi `{jam + 1}` dihitung saat build, hasilnya `3`. Atribut `set:html` menyisipkan teks **tanpa** escape: `<b>` menjadi huruf tebal sungguhan. Pakai `set:html` hanya untuk teks milikmu sendiri, tidak untuk data dari luar. Penyusun juga menghitung kata `<script` pada `dist/index.html`: hasilnya 0, karena komponen Astro hanya menghasilkan HTML kecuali kamu menambahkan skrip sendiri.

**Komponen** adalah berkas `.astro` yang dipakai ulang. Komponen menerima data lewat `Astro.props`:

```astro
---
const { judul, ringkas, jam } = Astro.props;
---
<article class="kartu">
  <h3>{judul}</h3>
  <p>{ringkas}</p>
  <p>Jam per pekan: {jam}</p>
</article>
```

Halaman memakainya sekali per entri data:

```astro
---
import KartuProgram from "../components/KartuProgram.astro";

const program = [
  { judul: "Klub Robot", ringkas: "Merakit dan memprogram robot sederhana.", jam: 2 },
  { judul: "Klub Menulis", ringkas: "Menulis berita sekolah.", jam: 1 },
];
---
<html lang="id">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <title>Sekolah Contoh</title>
  </head>
  <body>
    <h1>Sekolah Contoh</h1>
    <p>Sekolah fiktif untuk latihan.</p>
    {program.map((p) => <KartuProgram judul={p.judul} ringkas={p.ringkas} jam={p.jam} />)}
  </body>
</html>
```

Hasil build berisi dua `<article class="kartu">`, satu per entri. Folder `public/` disalin apa adanya ke `dist/` (penyusun melihat `favicon.svg` dan `favicon.ico` di sana), jadi aturan modul `b-xi2-m12` berlaku: tidak ada rahasia di dalamnya.

**Build bukan pemeriksa tipe.** Penyusun menambahkan `interface Props { judul: string; ringkas: string; jam: number; }` pada komponen dan sengaja menulis `jam: "satu"` di data. `bun run build` tetap berhasil. Perintah `bunx astro check` (setelah `bun add -d @astrojs/check typescript@6`) melaporkan: `src/pages/index.astro:18:75 - error ts(2322): Type 'string | number' is not assignable to type 'number'` dan keluar dengan kode 1. Pada percobaan penyusun, `astro check` menolak TypeScript 7.0.2 dengan pesan agar memasang TypeScript 6; versi 6.0.3 berhasil. Cek ulang pesan itu di komputermu karena alat ini cepat berubah.

**Dev dan build.** `bun run dev` menjalankan server pengembangan di `localhost`; HTML-nya disisipi skrip alat pengembang (`/@vite/client`), jadi bukan hasil akhir. `bun run build` menulis situs statis ke folder `dist/`; folder itulah yang diserahkan.

## Contoh setengah jadi

Lengkapi komponen `Tombol.astro` yang menerima `teks` dan `href` (kunci di bawah):

```astro setengah-jadi
---
const { ____, href } = Astro.props;
---
<a class="tombol" href={____}>{teks}</a>
```

Bagaimana kamu memakainya di halaman untuk tombol "Daftar" yang menuju `/daftar/`?

## Soal Parsons

Susun baris berikut menjadi `KartuProgram.astro` yang benar (kunci di bawah). Satu baris tidak terpakai.

```text
---
const { judul, ringkas } = Astro.props;
<h3>{judul}</h3>
---
<article class="kartu">
<p>{ringkas}</p>
</article>
const judul = Astro.props.ringkas;
```

## Latihan

1. `AI: tanpa AI` Tebak HTML hasil dari `const n = 3;` dengan `<p>{n * 2} jam</p>` dan `<p>{"<i>x</i>"}</p>`, lalu bangun dan cocokkan.
2. `AI: tanpa AI` Tulis `console.log("jalan")` di skrip komponen lalu `bun run build`. Muncul di terminal atau di HTML? Mengapa?
3. `AI: boleh` Tulis dulu rancangan di kertas: tiga komponen untuk halaman sekolah fiktifmu (mis. kartu, tombol, kaki halaman). Lalu buat dan pakai ketiganya di `index.astro` dari satu larik data.
4. `AI: boleh` Buat skrip komponen melempar galat (`throw new Error("API mati")`). Apa yang dilakukan `bun run build`?
5. `AI: boleh` (opsional) Catatan pemakaian AI: alat, tujuan, garis besar perintah, bagian yang dipakai, dan cara memeriksanya.

## Latihan bercampur

1. `AI: boleh` (dari `b-xi2-m12`) Berkas apa dari proyek Astro yang ikut tersaji bila kamu menyajikan `dist/`, dan apa yang tidak ikut?
2. `AI: boleh` (dari `b-xi2-m9`) Skrip komponen memanggil `fetch` ke sebuah API. Kapan panggilan itu terjadi, dan apa akibatnya bila API sedang mati saat build?

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `b-xii1-m2` (pertanyaan 1), sekitar tiga minggu lagi di `b-xii1-m4` (pertanyaan 2), dan sekitar delapan minggu lagi di `b-xii1-m9` (pertanyaan 3). Jawab sekarang lalu simpan.

1. Apa isi bagian di antara dua garis `---` pada berkas `.astro`, dan kapan kode itu dijalankan?
2. Mengapa `{nama}` di templat Astro aman bila `nama` berisi tanda `<`, dan kapan `set:html` berbahaya?
3. Apa beda `bun run build` dan `bun run dev` pada proyek Astro, dan folder mana yang diserahkan sebagai situs statis?

## Kesalahan umum

- **Mengira skrip komponen berjalan di peramban.** Ia berjalan saat build; `console.log` muncul di terminal, bukan di Konsol peramban.
- **Memakai `set:html` untuk data luar.** Teks yang tidak di-escape bisa memuat markah; pakai `{...}`.
- **Menyerahkan hasil `bun run dev`.** Itu bukan keluaran akhir; serahkan isi `dist/`.
- **Mengira build memeriksa tipe.** Pada percobaan penyusun, tipe salah tetap lolos build; jalankan `astro check`.
- **Salah huruf pada nama komponen.** Komponen ditulis berawalan huruf besar (`KartuProgram`); huruf kecil dibaca sebagai tag HTML biasa.
- **Menaruh catatan pribadi di `public/`.** Semua isinya disalin ke `dist/` dan publik.

## Cek mandiri

- [ ] Saya dapat membuat proyek Astro dan membangunnya ke `dist/`.
- [ ] Saya dapat menjelaskan skrip komponen dan templat, dan kapan skrip itu berjalan.
- [ ] Saya dapat membuat komponen dengan `props` dan memakainya dari data.
- [ ] Saya dapat menjelaskan mengapa `{...}` aman dan `set:html` berisiko.

## Kunci dan petunjuk

**Ingat kembali.** 1: XSS adalah menyisipkan skrip lewat teks yang tidak di-escape; cegah dengan meng-escape keluaran dan memakai `textContent`. 2: boleh: berkas yang memang publik (HTML, CSS, JavaScript, gambar); tidak boleh: `.env`, kunci, data pribadi, folder `.git`, dan catatan internal. 3: teks pengganti (`<title>` dan tabel data) dan label teks pada elemen (bukan hanya warna).

**Prediksi dulu.** 1: baris pertama `<p>Klub &lt;b&gt;Robot&lt;/b&gt; &amp; Coding</p>`, kedua `<p>3 jam</p>`, ketiga `<p>Klub <b>Robot</b> & Coding</p>`. 2: tidak; `dist/prediksi/index.html` hanya berisi HTML.

**Contoh setengah jadi.** Kunci: `teks` dan `href`. Pemakaian: `<Tombol teks="Daftar" href="/daftar/" />` setelah `import Tombol from "../components/Tombol.astro";` di skrip halaman.

**Soal Parsons.** Urutan: `---`, `const { judul, ringkas } = Astro.props;`, `---`, `<article class="kartu">`, `<h3>{judul}</h3>`, `<p>{ringkas}</p>`, `</article>`. Baris `const judul = Astro.props.ringkas;` tidak terpakai.

**Latihan.** 1: `<p>6 jam</p><p>&lt;i&gt;x&lt;/i&gt;</p>` (dijalankan penyusun). 2: muncul di terminal saat build (`frontmatter jalan di build, n = 3` pada percobaan penyusun) dan tidak ada di `dist/uji/index.html`, karena skrip komponen berjalan saat build. 3: tidak ada kunci tunggal; periksa bahwa tiap komponen punya satu tugas dan datanya dari satu larik. 4: pada percobaan penyusun build berhenti dengan `[build] Caught error rendering /gagal: Error: API mati: 503` dan kode keluar 1: build berhenti, bukan melanjutkan dengan halaman rusak. 5: tidak ada kunci tunggal.

**Latihan bercampur.** 1: ikut: isi `dist/` termasuk salinan `public/`; tidak ikut: `src/`, `node_modules/`, dan `.env`. Cek isi `dist/` dengan `find dist -type f`. 2: panggilan terjadi saat build, di komputer pembangun. Bila API mati dan galat dilempar, build gagal (seperti latihan 4); bila galat ditangkap dan diganti data lama, situs terbit dengan data lama tanpa pemberitahuan. Periksa `respons.ok`.

**Ulang berjarak.** 1: kode JavaScript atau TypeScript komponen; dijalankan saat build di komputer pembangun, bukan di peramban pengunjung. 2: Astro meng-escape ekspresi `{...}` (diamati: `&lt;b&gt;`), jadi teks tampil apa adanya; `set:html` menyisipkan mentah, berbahaya bila teksnya dari luar. 3: `dev` menjalankan server pengembangan di `localhost` dengan skrip alat pengembang; `build` menulis berkas statis ke `dist/`, dan `dist/` itulah yang diserahkan.

## Langkah berikutnya

Modul berikut: `b-xii1-m2` (tata letak dan konten bersama). Bacaan lanjut: dokumentasi Astro tentang komponen (`https://docs.astro.build/en/basics/astro-components/`) dan halaman (`https://docs.astro.build/en/basics/astro-pages/`), serta panduan TypeScript di Astro (`https://docs.astro.build/en/guides/typescript/`).
