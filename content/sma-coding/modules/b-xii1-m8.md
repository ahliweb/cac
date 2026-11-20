## Untuk siapa modul ini

Modul ini untuk murid kelas XII jalur B (Web dengan JavaScript, TypeScript, dan Bun), minggu `B-XII1-M8` silabus v1.4.1: SEO dasar. Prasyarat: modul `b-xii1-m7` (tema, CSS, dan aksesibilitas).

Modul ini berstatus DRAF: karangan penyusun, belum ditinjau pemilik. Silabus tidak memetakan butir capaian pembelajaran pada minggu ini.

**Konteks semester ini.** Kelasmu mengkustomisasi profil `landing` dari `awcms-one` sebagai studi kasus: kamu hanya mengubah merek, konten, tema, SEO, dan dokumentasi. Lingkungannya disiapkan gurumu; kamu tidak menyentuh backend. Fakta `awcms-one` dibaca dari repositori publiknya (`main`, 2026-11-20); yang tak bisa dicek ditandai `[belum terverifikasi]`.

Contoh dijalankan penyusun dengan Bun 1.4.4, Astro 7.4.13, dan TypeScript 6.0.3 per 2026-11 pada proyek karangan (warung kopi fiktif) di direktori sementara, tanpa akun. Baca-dan-prediksi `AI: tanpa AI`; selain itu AI boleh dipakai dengan etika, tanpa data pribadi atau rahasia.

## Ingat kembali

Jawab dari ingatan dulu, baru cek di bagian kunci. Soal 1 dari `b-xii1-m7`, soal 2 dari `b-xii1-m5`, soal 3 dari `b-xi2-m11`.

1. Mengapa `alt="foto"` lolos axe padahal tidak membantu pembaca layar, dan siapa yang menilai `alt` gambar?
2. Apa arti kode keluar 2 dan 3 pada `template:init`?
3. Apa beda "tidak tersambung" dengan status 404 saat mendiagnosis permintaan yang gagal?

## Tujuan

Setelah modul ini kamu dapat:

- menjelaskan apa yang dikerjakan dan tidak dijanjikan SEO;
- menulis judul dan deskripsi yang unik dan sesuai isi halaman;
- memeriksa URL kanonik, `robots.txt`, `alt`, dan satu `h1` per halaman;
- menjalankan audit pada hasil build dan memperbaiki temuannya (keluaran: halaman teroptimasi).

## Prediksi dulu

Ini tugas baca-dan-prediksi, `AI: tanpa AI`. **Tebak dulu, tulis jawabanmu, baru jalankan.**

```ts
function judulLengkap(judul: string, nama: string): string {
  return judul === nama ? judul : `${judul} — ${nama}`;
}

function ringkas(deskripsi: string | undefined, cadangan: string): string {
  return (deskripsi ?? cadangan).slice(0, 20);
}

console.log(judulLengkap("Kontak", "Warung Kopi Contoh"));
console.log(judulLengkap("Warung Kopi Contoh", "Warung Kopi Contoh"));
console.log(ringkas(undefined, "Kopi dan roti buatan sendiri."));
console.log(new URL("/tentang", "https://situs.example").href);
console.log(new URL("tentang", "https://situs.example/info/").href);
```

1. Apa lima baris yang tercetak?
2. Mengapa kanonik sebaiknya dibangun dari alamat situs lengkap, bukan `/tentang` saja?

## Contoh terselesaikan

Keluaran program tadi:

```text
Kontak — Warung Kopi Contoh
Warung Kopi Contoh
Kopi dan roti buatan
https://situs.example/tentang
https://situs.example/info/tentang
```

**Apa itu SEO.** Menurut panduan pemula Google, SEO membantu mesin pencari memahami isi situsmu dan membantu orang memutuskan apakah mau mengunjunginya. Tidak ada rahasia yang otomatis membuat situs berperingkat pertama; perubahan bisa butuh jam sampai bulan untuk terlihat.

**Judul dan deskripsi.** Menurut dokumentasi Google tentang tautan judul dan *snippet*: tiap halaman punya `<title>` yang unik, ringkas, dan menggambarkan isinya; hindari judul samar seperti "Beranda", teks yang diulang di semua halaman, dan penjejalan kata kunci. Deskripsi (`<meta name="description">`) kadang dipakai sebagai ringkasan hasil pencarian bila lebih akurat daripada isi halaman; buat singkat dan berbeda untuk tiap halaman. Meta `keywords` tidak dipakai Google Search.

**URL kanonik, `robots.txt`, dan peta situs.** `rel="canonical"` menunjuk URL yang kamu anggap utama bila isi yang sama bisa dibuka lewat beberapa alamat; Google menyebutnya petunjuk, bukan aturan, dan menyarankan alamat mutlak. `robots.txt` mengatur apa yang boleh dijelajahi perayap, bukan menyembunyikan halaman: halaman yang diblokir masih bisa muncul di hasil pencarian tanpa deskripsi, jadi pakai `noindex` atau kata sandi. Peta situs (daftar URL penting) membantu penemuan halaman, terutama situs baru, tanpa menjamin pengindeksan. 

**Di `awcms-one`.** `BaseLayout.astro` menyusun kepala semua halaman. Menurut berkasnya di `main`: judul menjadi `${title} — ${identity.name}` kecuali sama dengan nama situs; deskripsi memakai `description` halaman, atau `identity.description` bila kosong, dipotong 160 karakter (pilihan situs itu, bukan aturan Google); URL kanonik dibuat dari `SITE_URL`. Berkas `apps/storefront/.env.example` memperingatkan bahwa `SITE_URL` yang salah tidak menggagalkan build tetapi mengarahkan perayap ke tempat lain. Menurut `docs/seo.md`, profil `landing` mendaftarkan dua sumber peta situs, tidak membuat umpan RSS, dan `robots.txt`-nya hanya melarang `/api/`.

Setelah `template:init` dijalankan dengan `--profil landing` pada salinan sementara, `DEFAULT_IDENTITY.description` berisi kalimat umum "Solusi tepercaya dari Warung Kopi Contoh". Halaman tanpa deskripsi sendiri jatuh ke kalimat itu, sehingga banyak halaman berdeskripsi kembar. 

**Audit sederhana.** Fungsi berikut memeriksa satu halaman hasil build. Ia hanya memeriksa bentuk, bukan mutu tulisan, dan memakai ekspresi reguler, bukan pengurai HTML.

```ts
function periksaHalaman(html: string): string[] {
  const temuan: string[] = [];

  const judul = /<title>([^<]*)<\/title>/.exec(html)?.[1]?.trim();
  if (!judul) temuan.push("tidak ada <title>");

  const deskripsi = /<meta name="description" content="([^"]*)"/.exec(html)?.[1];
  if (deskripsi === undefined || deskripsi.trim() === "") {
    temuan.push("tidak ada meta description");
  }

  const kanonik = /<link rel="canonical" href="([^"]*)"/.exec(html)?.[1];
  if (kanonik === undefined) temuan.push("tidak ada canonical");
  else if (!kanonik.startsWith("https://")) temuan.push("canonical bukan URL mutlak https");

  const banyakH1 = (html.match(/<h1[\s>]/g) ?? []).length;
  if (banyakH1 !== 1) temuan.push(`ada ${banyakH1} elemen h1 (seharusnya 1)`);

  for (const gambar of html.match(/<img\b[^>]*>/g) ?? []) {
    if (!/\balt="[^"]+"/.test(gambar)) temuan.push(`gambar tanpa alt: ${gambar}`);
  }
  return temuan;
}

const buruk =
  '<html><head><title></title><link rel="canonical" href="/tentang"></head>' +
  '<body><h1>A</h1><h1>B</h1><img src="a.svg"></body></html>';
const baik =
  '<html><head><title>Kontak — Warung Kopi Contoh</title>' +
  '<meta name="description" content="Alamat, jam buka, dan cara memesan.">' +
  '<link rel="canonical" href="https://situs.example/kontak"></head>' +
  '<body><h1>Kontak</h1><img src="a.svg" alt="Denah ke warung"></body></html>';

console.log(periksaHalaman(buruk));
console.log(periksaHalaman(baik));
```

```text
[ "tidak ada <title>", "tidak ada meta description", "canonical bukan URL mutlak https",
  "ada 2 elemen h1 (seharusnya 1)", "gambar tanpa alt: <img src=\"a.svg\">"
]
[]
```

Pada proyek Astro kecil `situs-contoh` (tiga halaman), fungsi itu dipasang di `scripts/periksa-seo.ts` bersama pemeriksa deskripsi kembar, dan skrip membaca semua `.html` di `dist` setelah build:

```sh
bun --bun astro build
bun scripts/periksa-seo.ts
```

```text
deskripsi sama di index.html, kontak/index.html: "Kopi dan roti buatan sendiri di kota fiktif Contohan."
audit SEO: 1 temuan
```

Beranda dan Kontak sama-sama jatuh ke deskripsi cadangan. Dengan `SITE_URL=http://localhost:4321`, build tetap sukses (kode keluar 0) tetapi audit melaporkan empat temuan: tiga kanonik bukan `https` dan deskripsi kembar tadi. Pada build profil `landing` milik uji bawaan `awcms-one` (konten tiruan, `SITE_URL` kosong sehingga bawaannya `localhost`), skrip yang sama menemukan tujuh hal: enam kanonik bukan `https` dan satu deskripsi kembar. Perbaikan di proyek contoh: beri halaman Kontak deskripsi sendiri. Di `awcms-one`, halaman statis dari CMS memakai kolom `metaDescription` miliknya bila ada; cara murid mengisinya di lingkungan kelas mengikuti petunjuk gurumu `[belum terverifikasi]`.

## Contoh setengah jadi

Lengkapi `cariKembar` agar mengembalikan satu baris untuk tiap deskripsi yang dipakai lebih dari satu halaman (kunci di bawah):

```ts setengah-jadi
function cariKembar(halaman: { jalur: string; deskripsi: string }[]): string[] {
  const peta = new Map<string, string[]>();
  for (const h of halaman) {
    const daftar = peta.get(h.deskripsi) ?? ____;
    daftar.push(h.jalur);
    peta.set(h.deskripsi, ____);
  }
  const hasil: string[] = [];
  for (const [deskripsi, jalur] of peta) {
    if (jalur.length ____ 1) hasil.push(`${jalur.join(", ")}: ${deskripsi}`);
  }
  return hasil;
}
```

## Soal Parsons

Susun baris berikut menjadi fungsi yang memeriksa kanonik (kunci di bawah). Satu baris tidak terpakai.

```text
  return temuan;
}
function periksaKanonik(html: string): string[] {
  else if (!kanonik.startsWith("https://")) temuan.push("canonical bukan URL mutlak https");
  const temuan: string[] = [];
  const kanonik = /<link rel="canonical" href="([^"]*)"/.exec(html)?.[1];
  if (kanonik === undefined) temuan.push("tidak ada canonical");
  temuan.push(kanonik);
```

## Latihan

1. `AI: boleh` Untuk situs profil organisasi fiktif dengan halaman Beranda, Layanan, dan Kontak, tulis `<title>` dan deskripsi tiap halaman. Semuanya berbeda, deskripsi paling panjang 160 karakter, tanpa kata kunci yang dijejalkan.
2. `AI: tanpa AI` Telusuri HTML ini dan tulis semua temuan yang akan dilaporkan `periksaHalaman`: `<html><head><title>Beranda</title><meta name="description" content=""><link rel="canonical" href="https://situs.example/"></head><body><h1>Selamat datang</h1><img src="a.svg" alt=""></body></html>`.
3. `AI: boleh` Tambahkan satu pemeriksaan ke `periksaHalaman`: elemen `<html>` harus punya atribut `lang`. Jalankan pada halaman yang memenuhi dan yang tidak.
4. `AI: tanpa AI` Halaman `/draf-harga` belum boleh muncul di hasil pencarian. Seorang teman menambahkan `Disallow: /draf-harga` ke `robots.txt`. Cukupkah, dan apa yang lebih tepat?
5. `AI: boleh` (opsional) Catatan pemakaian AI: alat, tujuan, garis besar perintah, bagian yang dipakai, cara memeriksa, dan konfirmasi tanpa data pribadi atau rahasia.

## Latihan bercampur

1. `AI: boleh` (dari `b-xii1-m7`) Logo di beranda ber`alt="gambar"`. Mengapa itu merugikan pembaca layar dan tidak membantu mesin pencari, dan apa gantinya?
2. `AI: boleh` (dari `b-xi2-m10`) Judul halaman diambil dari teks pengunjung dan ditulis ke `<title>` lewat templat string tanpa escape. Apa risikonya, dan perbaikannya?

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `b-xii1-m9` (pertanyaan 1), sekitar tiga minggu lagi di `b-xii1-m11` (pertanyaan 2), dan sekitar delapan minggu lagi di semester berikutnya, modul `b-xii2-m2` (pertanyaan 3). Jawab sekarang lalu simpan.

1. Sebutkan empat hal yang diperiksa audit SEO dasar pada tiap halaman.
2. Mengapa `Disallow` di `robots.txt` bukan cara menyembunyikan halaman dari hasil pencarian, dan apa gantinya?
3. Apa yang terjadi bila `SITE_URL` salah, dan mengapa build tetap sukses?

## Kesalahan umum

- **Menjanjikan peringkat.** SEO tidak menjamin peringkat.
- **Judul yang sama di semua halaman.** Tiap halaman butuh judul yang menggambarkan isinya.
- **Menjejalkan kata kunci atau mengisi `keywords`.** Tidak membantu; meta `keywords` tidak dipakai.
- **Mengira `robots.txt` menyembunyikan halaman.** Ia hanya mengatur penjelajahan; pakai `noindex` atau kata sandi.
- **Menganggap audit hijau berarti mutu baik.** Audit hanya memeriksa bentuk; `SITE_URL` salah tetap perlu dicek.

## Cek mandiri

- [ ] Saya dapat menjelaskan apa yang dikerjakan SEO dan batasnya.
- [ ] Saya dapat menulis judul dan deskripsi unik untuk tiap halaman.
- [ ] Saya dapat menjelaskan fungsi kanonik, `robots.txt`, dan peta situs.
- [ ] Saya dapat menjalankan audit pada hasil build dan memperbaiki temuannya.
- [ ] Saya tahu `SITE_URL` yang salah tidak menggagalkan build.

## Kunci dan petunjuk

**Ingat kembali.** 1: axe hanya memeriksa ada atau tidaknya `alt`, bukan maknanya; manusia (kamu, sejawat, atau pengguna) yang menilai. 2: 2 berarti flag wajib kurang pada mode tanpa terminal (atau nilai tidak sah); 3 berarti ditolak tanpa `--yes`, karena pohon kerja kotor atau karena `package.json` masih bernama `awcms-one`. 3: "tidak tersambung" berarti tidak ada respons sama sekali, jadi cek server hidup, alamat, dan port; 404 berarti server hidup tetapi jalur tidak dikenal, jadi cek ejaan jalur dan rute.

**Prediksi dulu.** 1: lima baris seperti di bagian contoh; baris ketiga terpotong tepat dua puluh karakter. 2: `new URL("/tentang", situs)` dan `new URL("tentang", "https://situs.example/info/")` memberi hasil berbeda; alamat mutlak yang dibangun dari `site` menghindari salah tafsir jalur relatif, dan Google menyarankan alamat mutlak untuk kanonik.

**Contoh setengah jadi.** Kunci, dijalankan penyusun:

```ts
function cariKembar(halaman: { jalur: string; deskripsi: string }[]): string[] {
  const peta = new Map<string, string[]>();
  for (const h of halaman) {
    const daftar = peta.get(h.deskripsi) ?? [];
    daftar.push(h.jalur);
    peta.set(h.deskripsi, daftar);
  }
  const hasil: string[] = [];
  for (const [deskripsi, jalur] of peta) {
    if (jalur.length > 1) hasil.push(`${jalur.join(", ")}: ${deskripsi}`);
  }
  return hasil;
}

console.log(
  cariKembar([
    { jalur: "a.html", deskripsi: "sama" },
    { jalur: "b.html", deskripsi: "sama" },
    { jalur: "c.html", deskripsi: "lain" },
  ]),
);
```

```text
[ "a.html, b.html: sama" ]
```

**Soal Parsons.** Urutan: `function periksaKanonik(...) {`, `const temuan: string[] = [];`, `const kanonik = ...;`, `if (kanonik === undefined) temuan.push(...);`, `else if (!kanonik.startsWith("https://")) temuan.push(...);`, `return temuan;`, `}`. Baris `temuan.push(kanonik);` tidak terpakai: ia akan memasukkan alamat yang benar ke daftar temuan.

**Latihan.** 1: tidak ada kunci tunggal; contoh: Beranda "Warung Kopi Contoh: kopi dan roti buatan sendiri", Layanan "Layanan pesan antar dan pesanan kelompok", Kontak "Kontak dan jam buka" dengan deskripsi satu kalimat yang berbeda untuk tiap halaman. 2: dua temuan: "tidak ada meta description" (isinya kosong) dan "gambar tanpa alt" (`alt=""` tidak lolos pemeriksaan ini); judul, kanonik, dan `h1` lolos. Perhatikan bahwa `alt=""` memang sah untuk gambar dekoratif; pemeriksa sederhana ini sengaja ketat dan hasilnya perlu dinilai manusia. 3: contoh, dijalankan penyusun:

```ts
function periksaLang(html: string): string[] {
  return /<html[^>]*\blang="[^"]+"/.test(html) ? [] : ["elemen html tanpa atribut lang"];
}

console.log(periksaLang('<html lang="id"><body></body></html>'));
console.log(periksaLang("<html><body></body></html>"));
```

```text
[]
[ "elemen html tanpa atribut lang" ]
```

4: tidak cukup. Menurut dokumentasi Google, halaman yang diblokir `robots.txt` masih bisa diindeks bila ditautkan dari tempat lain dan tampil tanpa deskripsi; pakai `noindex` pada halaman atau lindungi dengan kata sandi. Kombinasi aturan penjelajahan dan pengindeksan bisa saling meniadakan, jadi baca dokumentasinya sebelum menggabungkan keduanya. 5: tidak ada kunci tunggal.

**Latihan bercampur.** 1: teks "gambar" tidak memberi tahu apa isi gambar; pembaca layar hanya mengucapkan kata itu. Gantilah dengan peran gambar, misalnya `alt="Logo Warung Kopi Contoh"`. 2: teks bisa berisi HTML yang diurai peramban (XSS); escape keluaran sesuai konteks. Di Astro, ekspresi `{judul}` pada templat sudah di-escape; masalah muncul bila HTML disusun dari string dan dimasukkan tanpa escape.

**Ulang berjarak.** 1: judul unik, deskripsi ada dan tidak kembar, kanonik mutlak `https`, satu `h1`, dan `alt` pada gambar (empat dari lima ini sudah cukup). 2: perayap hanya diminta tidak menjelajahi; URL yang ditautkan tempat lain masih bisa diindeks tanpa deskripsi; gantinya `noindex` atau kata sandi. 3: kanonik dan Open Graph menunjuk alamat yang salah, padahal build hanya membaca nilainya dan tidak memeriksa apakah alamat itu benar; karena itu ada audit setelah build.

## Langkah berikutnya

Modul berikut: `b-xii1-m9` (pengujian dan gerbang mutu), yang menjadikan audit ini bagian dari pemeriksaan otomatis. Bacaan lanjut: dokumentasi Google yang ditautkan di rujukan dan `docs/seo.md` di `awcms-one`.
