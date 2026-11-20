## Untuk siapa modul ini

Modul ini untuk murid kelas XII jalur B (Web dengan JavaScript, TypeScript, dan Bun), minggu `B-XII1-M2` silabus v1.4.1: tata letak dan konten. Prasyarat: modul `b-xii1-m1` (Astro: halaman statis dan komponen).

Modul ini karangan penyusun dan disetujui pemilik program pada 2026-11-20 (keputusan lewat dialog; catatan tinjauan menjadi tindak lanjut revisi). Silabus memetakan butir `F-AP-d` pada minggu ini; pemenuhan butir mengikuti pemetaan silabus, bukan status modul.

Contoh dijalankan penyusun dengan Bun 1.4.4 dan Astro 7.4.13 per 2026-11, di folder sementara, tanpa akun. Sekolah, klub, dan surel dalam contoh karangan (domain `.example`). Tugas baca-dan-prediksi `AI: tanpa AI`; selain itu AI boleh dipakai dengan etika dan dicatat, tanpa data pribadi atau rahasia pada permintaanmu.

## Ingat kembali

Jawab dari ingatan dulu, baru cek di bagian kunci. Soal 1 dari `b-xii1-m1`, soal 2 dari `b-xi2-m13`, soal 3 dari `b-xi2-m8`.

1. Apa isi bagian di antara dua garis `---` pada berkas `.astro`, dan kapan kode itu dijalankan?
2. Mengapa fungsi pengolah data dipisah dari server dan diuji sendiri?
3. Mengapa ramalan jauh ke depan dari data yang sedikit tidak boleh dianggap pasti?

## Tujuan

Setelah modul ini kamu dapat:

- membuat tata letak bersama dengan `<slot />` dan `props` yang punya nilai bawaan;
- memisahkan konten ke berkas data dan memakainya di beberapa halaman;
- membuat banyak halaman dari satu berkas dengan `getStaticPaths`;
- memeriksa data konten dengan skrip kecil sebelum membangun situs (keluaran minggu ini: situs bertata letak, tiga halaman atau lebih).

## Prediksi dulu

Ini tugas baca-dan-prediksi, `AI: tanpa AI`. **Tebak dulu, tulis jawabanmu, baru jalankan.**

```astro
---
const { judul = "Tanpa judul" } = Astro.props;
---
<head><title>{judul} | Sekolah Contoh</title></head>
<main>
  <slot />
</main>
```

Berkas di atas adalah tata letak `Dasar.astro`. Sebuah halaman memakainya begini: `<Dasar><h1>Halaman tanpa judul</h1><p>Isi halaman.</p></Dasar>`, tanpa mengirim `judul`.

1. Apa isi `<title>` yang dihasilkan?
2. Di mana `<h1>` dan `<p>` itu muncul di HTML hasil?

## Contoh terselesaikan

**Tata letak** adalah komponen yang membungkus halaman: kerangka `<html>`, menu, dan kaki halaman ditulis sekali. Isi tiap halaman masuk lewat `<slot />`; data kecil seperti judul masuk lewat `props`. Penyusun membuat proyek Astro minimal seperti di modul sebelumnya lalu menulis `src/layouts/Dasar.astro`:

```astro
---
const { judul = "Tanpa judul" } = Astro.props;
---
<html lang="id">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <title>{judul} | Sekolah Contoh</title>
  </head>
  <body>
    <nav>
      <a href="/">Beranda</a>
      <a href="/program/">Program</a>
      <a href="/kontak/">Kontak</a>
    </nav>
    <main>
      <slot />
    </main>
    <footer>Sekolah Contoh (fiktif)</footer>
  </body>
</html>
```

Halaman memakainya, misalnya `src/pages/kontak.astro`:

```astro
---
import Dasar from "../layouts/Dasar.astro";
---
<Dasar judul="Kontak">
  <h1>Kontak</h1>
  <p>Surel: <a href="mailto:info@sekolah-contoh.example">info@sekolah-contoh.example</a></p>
</Dasar>
```

**Konten dipisah dari tampilan.** Daftar klub disimpan di satu berkas data, sehingga halaman daftar dan halaman rinci memakai sumber yang sama:

```ts
export type Info = { slug: string; judul: string; isi: string };

export const daftarInfo: Info[] = [
  { slug: "klub-robot", judul: "Klub Robot", isi: "Merakit robot sederhana tiap Rabu." },
  { slug: "klub-menulis", judul: "Klub Menulis", isi: "Menulis berita sekolah tiap Kamis." },
];
```

Satu berkas `src/pages/info/[slug].astro` menghasilkan satu halaman per entri. Pada situs statis semua rute harus diketahui saat build, jadi berkas dinamis wajib mengekspor `getStaticPaths()` (dokumentasi Astro tentang perutean):

```astro
---
import Dasar from "../../layouts/Dasar.astro";
import { daftarInfo } from "../../data/info";

export function getStaticPaths() {
  return daftarInfo.map((info) => ({ params: { slug: info.slug }, props: { info } }));
}
const { info } = Astro.props;
---
<Dasar judul={info.judul}>
  <h1>{info.judul}</h1>
  <p>{info.isi}</p>
</Dasar>
```

Dengan `program.astro` (daftar tautan dari `daftarInfo`), `kontak.astro`, `index.astro`, dan halaman `tanpa.astro` dari soal prediksi, penyusun membangun:

```text
generating static routes 
  ├─ /info/klub-robot/index.html (+10ms) 
  ├─ /info/klub-menulis/index.html (+1ms) 
  ├─ /kontak/index.html (+1ms) 
  ├─ /program/index.html (+1ms) 
  ├─ /tanpa/index.html (+1ms) 
  ├─ /index.html (+1ms) 
✓ Completed in 46ms.

[build] 6 page(s) built in 489ms
```

Awalan jam dibuang; milidetik berbeda di komputermu. Isi `dist/tanpa/index.html` memuat `<title>Tanpa judul | Sekolah Contoh</title>` dan `<main><h1>Halaman tanpa judul</h1><p>Isi halaman.</p></main>`: nilai bawaan terpakai dan isi anak masuk ke tempat `<slot />`. Bila sebuah halaman memakai tata letak tanpa isi anak (`<Dasar judul="Kosong" />`), penyusun mendapati `<main></main>`: slot kosong tidak menghasilkan apa-apa.

**Periksa data sebelum membangun.** Slug dipakai sebagai alamat, jadi bentuknya dijaga. Skrip ini dijalankan dengan `bun run periksa-data.ts` dari akar proyek:

```ts
import { daftarInfo } from "./src/data/info";

const slugDipakai = new Set<string>();
for (const info of daftarInfo) {
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(info.slug)) console.log("slug tidak valid:", info.slug);
  if (slugDipakai.has(info.slug)) console.log("slug ganda:", info.slug);
  slugDipakai.add(info.slug);
}
console.log("entri data:", daftarInfo.length, "slug unik:", slugDipakai.size);
```

```text
entri data: 2 slug unik: 2
```

Pada data yang sengaja dirusak penyusun (slug `Klub Musik` dan slug `klub-robot` dua kali), skrip mencetak `slug tidak valid: Klub Musik`, `slug ganda: klub-robot`, dan `entri data: 4 slug unik: 3`. Skrip ini hanya memeriksa bentuk; ia tidak tahu apakah isinya benar.

## Contoh setengah jadi

Lengkapi `getStaticPaths` agar halaman dibuat dari `daftarInfo` (kunci di bawah):

```ts setengah-jadi
export function getStaticPaths() {
  return daftarInfo.____((info) => ({ params: { ____: info.slug }, props: { info } }));
}
```

Mengapa nama kunci di `params` harus sama dengan nama di dalam kurung siku pada nama berkas?

## Soal Parsons

Susun baris berikut menjadi tata letak `Dasar.astro` yang benar (kunci di bawah). Satu baris tidak terpakai.

```text
---
const { judul = "Tanpa judul" } = Astro.props;
---
<html lang="id">
<head><title>{judul}</title></head>
<body>
<slot />
</body>
</html>
<slot judul />
```

## Latihan

1. `AI: tanpa AI` Tebak `<title>` halaman `/info/klub-robot/` pada situs contoh, lalu bangun dan cocokkan.
2. `AI: boleh` Tambahkan entri ketiga (`klub-musik`) pada data. Berapa halaman yang dibangun, dan halaman mana yang bertambah?
3. `AI: boleh` Tulis dulu peta situsmu di kertas: tiga halaman sekolah fiktif, isi menu, dan data apa yang dipakai bersama. Lalu buat tata letak dan ketiga halaman itu.
4. `AI: tanpa AI` Mengapa tautan menu di tata letak ditulis sekali, dan apa yang rusak bila kamu mengganti nama berkas `kontak.astro` menjadi `hubungi.astro` tanpa mengubah tata letak?
5. `AI: boleh` (opsional) Catatan pemakaian AI: alat, tujuan, garis besar perintah, bagian yang dipakai, dan cara memeriksanya.

## Latihan bercampur

1. `AI: boleh` (dari `b-xii1-m1`) Di mana skrip tata letak berjalan, dan lewat apa halaman mengirim `judul` ke tata letak?
2. `AI: boleh` (dari `b-xi2-m13`) Data klub dipakai tiga halaman, dan skrip `periksa-data.ts` memeriksanya sendiri. Apa manfaat pemisahan itu ketika data bertambah menjadi dua puluh entri?

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `b-xii1-m3` (pertanyaan 1), sekitar tiga minggu lagi di `b-xii1-m5` (pertanyaan 2), dan sekitar delapan minggu lagi di `b-xii1-m10` (pertanyaan 3). Jawab sekarang lalu simpan.

1. Apa fungsi `<slot />` dalam tata letak, dan bagaimana tata letak memberi nilai bawaan untuk prop yang tidak dikirim?
2. Mengapa halaman dinamis `[slug].astro` pada situs statis wajib punya `getStaticPaths`?
3. Mengapa konten (daftar program) disimpan di berkas data terpisah dari tata letak?

## Kesalahan umum

- **Menyalin menu ke setiap halaman.** Mengubah satu tautan berarti mengubah banyak berkas; taruh di tata letak.
- **Lupa `<slot />`.** Tanpa slot, isi halaman tidak muncul di mana pun.
- **Tidak memberi nilai bawaan pada prop.** Halaman yang lupa mengirim `judul` mendapat `undefined` di `<title>`.
- **Slug dengan spasi, huruf besar, atau ganda.** Pada percobaan penyusun, skrip pemeriksa menolak `Klub Musik` dan menangkap `klub-robot` yang ganda; alamat seperti itu merepotkan dan bisa saling menimpa.
- **Mengira `getStaticPaths` berjalan saat pengunjung membuka halaman.** Ia berjalan saat build; halaman baru butuh build ulang.
- **Mengira tata letak memeriksa isi.** Tata letak hanya membungkus; kebenaran isi tetap tugasmu.

## Cek mandiri

- [ ] Saya dapat membuat tata letak dengan `<slot />` dan prop bernilai bawaan.
- [ ] Saya dapat memakai data bersama di beberapa halaman.
- [ ] Saya dapat membuat halaman dari data dengan `getStaticPaths`.
- [ ] Saya dapat memeriksa bentuk data dengan skrip sebelum build.

## Kunci dan petunjuk

**Ingat kembali.** 1: kode JavaScript atau TypeScript komponen; dijalankan saat build di komputer pembangun, bukan di peramban pengunjung. 2: fungsi murni dapat diuji cepat tanpa menjalankan server, sehingga cacat ditemukan lebih awal dan kode lebih mudah dipakai ulang. 3: dasarnya hanya pola yang lalu; makin jauh dan makin sedikit datanya, makin besar peluang pola itu berubah.

**Prediksi dulu.** 1: `Tanpa judul | Sekolah Contoh`, karena nilai bawaan terpakai. 2: di dalam `<main>`, tepat di tempat `<slot />`.

**Contoh setengah jadi.** Kunci: `map` dan `slug`. Astro mencocokkan `params` dengan nama parameter pada nama berkas (`[slug]`); bila beda, ia tidak tahu halaman mana yang dimaksud.

**Soal Parsons.** Urutan: `---`, `const { judul = "Tanpa judul" } = Astro.props;`, `---`, `<html lang="id">`, `<head><title>{judul}</title></head>`, `<body>`, `<slot />`, `</body>`, `</html>`. Baris `<slot judul />` tidak terpakai: slot tidak menerima prop begitu.

**Latihan.** 1: `Klub Robot | Sekolah Contoh`. 2: tujuh halaman (percobaan penyusun: `7 page(s) built`), dan yang bertambah `/info/klub-musik/`. Daftar di `program.astro` ikut bertambah karena membaca data yang sama. 3: tidak ada kunci tunggal; periksa bahwa menu ada di satu tempat dan data tidak disalin. 4: tautan ditulis sekali agar satu perubahan berlaku di semua halaman; bila berkas diganti nama, tautan `/kontak/` di menu menuju halaman yang tidak ada (404) sampai tata letak diperbaiki. 5: tidak ada kunci tunggal.

**Latihan bercampur.** 1: skrip tata letak berjalan saat build, sekali untuk tiap halaman yang memakainya; halaman mengirim `judul` sebagai atribut komponen (`<Dasar judul="Kontak">`) dan tata letak membacanya dari `Astro.props`. 2: pengolahan dan pemeriksaan bisa dijalankan tanpa membangun seluruh situs, sehingga cacat (slug ganda, bentuk salah) ditemukan lebih awal dan satu aturan berlaku untuk dua puluh entri sekaligus.

**Ulang berjarak.** 1: slot adalah tempat isi halaman ditempel; nilai bawaan lewat destrukturisasi, `const { judul = "Tanpa judul" } = Astro.props`. 2: semua rute harus diketahui saat build; fungsi itu mengembalikan daftar `params`, satu halaman per entri. 3: satu sumber: ubah sekali, halaman daftar, halaman rinci, dan tautan ikut berubah, dan datanya dapat diperiksa dengan skrip.

## Langkah berikutnya

Modul berikut: `b-xii1-m3` (menjelajahi `awcms-one`), tempat kamu membaca proyek nyata yang memakai Astro. Bacaan lanjut: dokumentasi Astro tentang tata letak (`https://docs.astro.build/en/basics/layouts/`) dan perutean (`https://docs.astro.build/en/guides/routing/`).
