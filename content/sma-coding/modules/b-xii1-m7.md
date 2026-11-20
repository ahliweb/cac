## Untuk siapa modul ini

Modul ini untuk murid kelas XII jalur B (Web dengan JavaScript, TypeScript, dan Bun), minggu `B-XII1-M7` silabus v1.4.1: tema, CSS, dan aksesibilitas. Prasyarat: modul `b-xii1-m6` dan `b-x2-m5`.

Modul ini berstatus DRAF: karangan penyusun, belum ditinjau pemilik. Silabus memetakan butir `F-LD-f` pada minggu ini; modul draf ini belum dihitung memenuhinya.

Kamu hanya mengubah **tema dan tampilan**; backend tidak disentuh. Contoh dijalankan penyusun dengan Bun 1.4.4, Astro 7.4.13, `@axe-core/playwright` 4.14.0 (`axe-core` 4.14.1), `playwright-core` 1.65.1, dan Google Chrome 158.0.8127.36, semua per 2026-11, di folder sementara tanpa akun. **Penyusun tidak menilai tampilan visual**: yang ditempel hanya keluaran alat. Alat otomatis hanya menemukan sebagian masalah (lihat bagian bawah). Tugas baca-dan-prediksi `AI: tanpa AI`; selain itu AI boleh dipakai dengan etika dan dicatat, tanpa data pribadi atau rahasia pada permintaanmu.

## Ingat kembali

Jawab dari ingatan dulu, baru cek di bagian kunci. Soal 1 dari `b-xii1-m6`, soal 2 dari `b-xii1-m4`, soal 3 dari `b-xi2-m13`.

1. Dari mana nama situs yang tampil di build diambil, berurutan dari yang diutamakan?
2. Apa yang terjadi bila `SITE_PROFILE` diisi nilai yang tidak dikenal, dan mengapa gagal lebih baik daripada diam-diam memakai bawaan?
3. Sebutkan tiga pemeriksaan keamanan sebelum aplikasi data diserahkan.

## Tujuan

Setelah modul ini kamu dapat:

- menghitung rasio kontras dua warna dengan rumus WCAG dan menyatakan lolos atau tidak untuk teks;
- memakai variabel CSS (`--nama`) sebagai token tema agar warna diubah di satu tempat;
- menjalankan audit aksesibilitas otomatis dengan axe di Chrome dan membaca hasilnya;
- memperbaiki label, teks pengganti gambar, urutan judul, dan landmark, serta menyebut batas alat (keluaran minggu ini: situs yang lebih aksesibel).

## Prediksi dulu

Ini tugas baca-dan-prediksi, `AI: tanpa AI`. **Tebak dulu, tulis jawabanmu, baru jalankan.**

```astro
<body>
  <h1>Pendaftaran klub</h1>
  <img src="/favicon.svg" width="40" height="40" />
  <p class="catatan">Isi formulir sebelum Jumat.</p>
  <input type="text" name="nama" />
  <h4>Syarat</h4>
</body>
```

Kelas `.catatan` berwarna `#9ca3af` di atas latar putih. Berkas ini memakai `<html lang="id">` dan `<title>`.

1. Sebutkan sebanyak mungkin masalah aksesibilitas pada potongan ini.
2. Menurutmu, berapa rasio kontras `#9ca3af` di atas putih, dan apakah lolos 4,5:1?

## Contoh terselesaikan

**Kontras** adalah perbandingan terang antara teks dan latarnya. WCAG 2.2, kriteria Contrast (Minimum) (AA), menuntut rasio minimal **4,5:1** untuk teks biasa dan 3:1 untuk teks besar. Rumusnya: `(L1 + 0,05) / (L2 + 0,05)`, dengan L1 luminans warna yang lebih terang dan L2 yang lebih gelap; luminans `0,2126 R + 0,7152 G + 0,0722 B` dari kanal yang dilinierkan (spesifikasi memuat rumus lengkapnya). Penyusun menuliskannya sebagai skrip, `bun run kontras.ts`:

```ts
function kanal(nilai8bit: number): number {
  const c = nilai8bit / 255;
  return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
}

function luminans(hex: string): number {
  const n = Number.parseInt(hex.slice(1), 16);
  const r = kanal((n >> 16) & 255);
  const g = kanal((n >> 8) & 255);
  const b = kanal(n & 255);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function kontras(a: string, b: string): number {
  const [terang, gelap] = [luminans(a), luminans(b)].sort((x, y) => y - x);
  return (terang + 0.05) / (gelap + 0.05);
}

const dariBaris = process.argv.length > 3 ? [[process.argv[2], process.argv[3]]] : [];
const pasangan = dariBaris.length > 0
  ? dariBaris
  : [
      ["#1f2937", "#ffffff"],
      ["#1d4ed8", "#ffffff"],
      ["#9ca3af", "#ffffff"],
      ["#4b5563", "#ffffff"],
    ];

for (const [depan, latar] of pasangan) {
  const rasio = kontras(depan, latar);
  const status = rasio >= 4.5 ? "lolos 4.5:1" : "GAGAL 4.5:1";
  console.log(`${depan} di atas ${latar} = ${rasio.toFixed(2)}:1 (${status})`);
}
```

```text
#1f2937 di atas #ffffff = 14.68:1 (lolos 4.5:1)
#1d4ed8 di atas #ffffff = 6.70:1 (lolos 4.5:1)
#9ca3af di atas #ffffff = 2.54:1 (GAGAL 4.5:1)
#4b5563 di atas #ffffff = 7.56:1 (lolos 4.5:1)
```

**Token tema** adalah variabel CSS di satu tempat. Template `awcms-one` menulis warna merek ke `theme-tokens.css` (`--color-primary` dan pasangan `-foreground`-nya). Pada percobaan penyusun, primer `#9ca3af` (abu-abu muda) mendapat teks depan hitam otomatis, dan primer `#b91c1c` teks depan putih; rasionya 8,27 dan 6,47. Tapi CSS yang kamu tulis sendiri tidak dipilihkan otomatis. Halaman latihan penyusun memakai token berikut (berkas `tema.css`):

```css
:root {
  --warna-latar: #ffffff;
  --warna-teks: #1f2937;
  --warna-tautan: #1d4ed8;
  --warna-redup: #9ca3af;
}

body {
  background: var(--warna-latar);
  color: var(--warna-teks);
  font-family: system-ui, sans-serif;
  line-height: 1.5;
}

a {
  color: var(--warna-tautan);
}

.catatan {
  color: var(--warna-redup);
}
```

**Audit otomatis.** axe adalah mesin aturan aksesibilitas; di sini dijalankan lewat Chrome. Pasang dengan `bun add -d @axe-core/playwright playwright-core`; skrip `audit.ts` menyajikan folder hasil build di `localhost` dan mengauditnya. `channel: "chrome"` memakai Google Chrome yang terpasang; bila tidak ada, Playwright dapat mengunduh peramban sendiri `[belum terverifikasi: tidak dijalankan penyusun]`.

```ts
import AxeBuilder from "@axe-core/playwright";
import { join } from "node:path";
import { chromium } from "playwright-core";

const [akar, ...daftarJalur] = process.argv.slice(2);

const server = Bun.serve({
  port: 0,
  hostname: "localhost",
  async fetch(req) {
    let jalur = new URL(req.url).pathname;
    if (jalur.endsWith("/")) jalur += "index.html";
    const berkas = Bun.file(join(akar, jalur));
    return (await berkas.exists()) ? new Response(berkas) : new Response("tidak ada", { status: 404 });
  },
});

const browser = await chromium.launch({ channel: "chrome" });
const konteks = await browser.newContext();
const halaman = await konteks.newPage();

for (const jalur of daftarJalur) {
  await halaman.goto(`http://localhost:${server.port}${jalur}`);
  const hasil = await new AxeBuilder({ page: halaman }).analyze();
  console.log(`${jalur} pelanggaran: ${hasil.violations.length}, perlu dicek manual: ${hasil.incomplete.length}`);
  for (const v of hasil.violations) {
    console.log(`  - ${v.id} (${v.impact}), ${v.nodes.length} elemen: ${v.help}`);
  }
}

await browser.close();
await server.stop(true);
```

Dua halaman latihan dibangun dengan `bun run build` (`salah.astro` berisi potongan soal prediksi dalam kerangka lengkap; `benar.astro` versi perbaikan dengan `<main>`, `alt`, dan `<label for>`). Hasil `bun run audit.ts dist /salah/ /benar/`:

```text
/salah/ pelanggaran: 6, perlu dicek manual: 0
  - color-contrast (serious), 1 elemen: Elements must meet minimum color contrast ratio thresholds
  - heading-order (moderate), 1 elemen: Heading levels should only increase by one
  - image-alt (critical), 1 elemen: Images must have alternative text
  - label (critical), 1 elemen: Form elements must have labels
  - landmark-one-main (moderate), 1 elemen: Document should have one main landmark
  - region (moderate), 6 elemen: All page content should be contained by landmarks
/benar/ pelanggaran: 1, perlu dicek manual: 0
  - color-contrast (serious), 1 elemen: Elements must meet minimum color contrast ratio thresholds
```

Halaman "benar" tinggal satu temuan karena `--warna-redup` masih `#9ca3af`. Setelah diganti `#4b5563` dan dibangun ulang: `/salah/` 5 pelanggaran (kontras hilang karena berkas CSS dipakai bersama) dan `/benar/` **0 pelanggaran**.

**Batas alat.** Penyusun mengganti `alt` menjadi `"foto"`: axe tetap melaporkan 0 pelanggaran, padahal teks itu tidak membantu pembaca layar. Alat memeriksa **ada atau tidaknya** `alt`, bukan maknanya. Pada halaman depan profil `landing` hasil build terhadap stub uji milik template (primer `#9ca3af`), axe melaporkan 0 pelanggaran dan satu pemeriksaan "perlu dicek manual" (`color-contrast`, 4 elemen) pada dua halaman: alat tidak selalu bisa memutuskan, jadi manusia memeriksa sisanya. Uji juga dengan papan ketik (Tab) dan, bila ada, pembaca layar.

## Contoh setengah jadi

Perbaiki formulir berikut agar lolos aturan `label` dan `image-alt` (kunci di bawah):

```astro setengah-jadi
<img src="/favicon.svg" width="40" height="40" ____="Lambang sekolah fiktif" />
<____ for="nama">Nama panggilan</____>
<input ____="nama" type="text" name="nama" />
```

Mengapa `for` pada label harus sama dengan `id` pada kotak isian?

## Soal Parsons

Susun baris berikut menjadi fungsi `kontras` yang benar (kunci di bawah). Satu baris tidak terpakai.

```text
export function kontras(a: string, b: string): number {
  const [terang, gelap] = [luminans(a), luminans(b)].sort((x, y) => y - x);
  return (terang + 0.05) / (gelap + 0.05);
}
  return (gelap + 0.05) / (terang + 0.05);
```

## Latihan

1. `AI: tanpa AI` Tebak: apakah teks putih di atas `#6b7484` lolos 4,5:1? Hitung dengan `kontras.ts` (`bun run kontras.ts "#ffffff" "#6b7484"`).
2. `AI: boleh` Jalankan audit pada `/salah/`, perbaiki satu temuan, ulangi, dan catat jumlah pelanggaran tiap kali hingga bersih.
3. `AI: boleh` Tulis dulu daftar periksa audit cepat untuk situs fiktifmu (kontras, `alt`, label, urutan judul, landmark, papan ketik), tandai mana yang otomatis dan mana yang manual. Baru kerjakan.
4. `AI: tanpa AI` Mengapa `alt="foto"` lolos axe padahal tidak membantu, dan siapa yang harus menilainya?
5. `AI: boleh` (opsional) Catatan pemakaian AI: alat, tujuan, garis besar perintah, bagian yang dipakai, dan cara memeriksanya.

## Latihan bercampur

1. `AI: boleh` (dari `b-xii1-m6`) Kamu mengganti warna primer menjadi `#facc15` (kuning). Hitung kontras teks putih dan teks hitam di atasnya; mana yang kamu pilih?
2. `AI: boleh` (dari `b-xi2-m7`) Kartu program memakai warna merah untuk "penuh". Apa yang kamu tambahkan agar pembaca yang sulit membedakan warna tetap paham?

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `b-xii1-m8` (pertanyaan 1), sekitar tiga minggu lagi di `b-xii1-m10` (pertanyaan 2), dan sekitar delapan minggu lagi di semester berikutnya, modul `b-xii2-m1` (pertanyaan 3). Jawab sekarang lalu simpan.

1. Mengapa `alt="foto"` lolos axe padahal tidak membantu pembaca layar, dan siapa yang menilai `alt` gambar?
2. Berapa rasio kontras minimum WCAG AA untuk teks biasa, dan untuk teks besar?
3. Sebutkan tiga hal yang diperiksa pada audit aksesibilitas cepat.

## Kesalahan umum

- **Menilai kontras dengan mata.** Warna `#9ca3af` di atas putih terlihat sebagai abu-abu biasa, tetapi rasionya 2,54:1; hitung, jangan menebak.
- **Mengira alat bersih berarti beres.** `alt="foto"` lolos; urutan fokus dan kejelasan bahasa tidak dinilai alat.
- **Memakai warna sebagai satu-satunya penanda.** Tambahkan teks atau ikon.
- **`placeholder` sebagai pengganti label.** Pakai `<label for>`; ia tetap terbaca setelah kotak terisi.
- **Melompati tingkat judul.** `h1` langsung ke `h4` ditandai axe (`heading-order`).
- **Mengubah warna di banyak tempat.** Pakai variabel CSS agar satu perubahan berlaku di seluruh tema.

## Cek mandiri

- [ ] Saya dapat menghitung rasio kontras dan menyatakan lolos atau tidak.
- [ ] Saya dapat memakai variabel CSS sebagai token tema.
- [ ] Saya dapat menjalankan axe dan membaca hasilnya.
- [ ] Saya dapat menyebut yang tidak ditemukan alat otomatis.

## Kunci dan petunjuk

**Ingat kembali.** 1: variabel `SITE_NAME` bila ada, lalu `siteName` dari CMS, lalu `DEFAULT_IDENTITY.name` hasil `template:init`. 2: build gagal dengan pesan yang menyebut variabel dan nilai yang diterima; diam-diam memakai `toko` akan menerbitkan situs toko untuk yang meminta situs lain. 3: contoh: teks luar masuk lewat `textContent`, tidak ada rahasia atau `.env` di repositori, dan bentuk data diperiksa; juga server hanya di `localhost` dan data pribadi tidak dikumpulkan.

**Prediksi dulu.** 1: gambar tanpa `alt`, kotak isian tanpa label, teks redup berkontras rendah, loncatan `h1` ke `h4`, dan (pada potongan tanpa kerangka) tidak ada `<main>`; hasil axe di atas menyebut enam jenis. 2: 2,54:1; tidak lolos.

**Contoh setengah jadi.** Kunci: `alt`, `label`, `label`, dan `id`. `for` menautkan label ke kotak isian berdasarkan `id`; tanpa kecocokan, pembaca layar tidak tahu label itu milik kotak yang mana dan mengklik label tidak memfokuskan kotaknya.

**Soal Parsons.** Urutan: `export function kontras(a: string, b: string): number {`, `const [terang, gelap] = ...sort((x, y) => y - x);`, `return (terang + 0.05) / (gelap + 0.05);`, `}`. Baris terbalik `(gelap + 0.05) / (terang + 0.05)` tidak terpakai: hasilnya di bawah 1.

**Latihan.** 1: lolos, 4,71:1 (dijalankan penyusun). 2: urutan temuan boleh bebas; akhirnya `/salah/` menjadi bersih setelah `alt`, `label`, `h2`, `<main>`, dan warna diperbaiki. 3: tidak ada kunci tunggal; kontras, `alt`, label, urutan judul, dan landmark sebagian otomatis, sedangkan papan ketik dan kejelasan `alt` manual. 4: alat hanya memeriksa keberadaan `alt`; maknanya dinilai manusia (kamu, sejawat, atau pengguna). 5: tidak ada kunci tunggal.

**Latihan bercampur.** 1: putih di atas `#facc15` hanya 1,53:1 (gagal); hitam 13,71:1 (lolos), jadi pilih teks hitam (dijalankan penyusun). 2: teks "Penuh" atau ikon di samping warna, atau urutan yang menyebut statusnya.

**Ulang berjarak.** 1: axe hanya memeriksa ada atau tidaknya `alt`, bukan maknanya; manusia (kamu, sejawat, atau pengguna) yang menilai. 2: 4,5:1 untuk teks biasa dan 3:1 untuk teks besar (WCAG 2.2, Contrast (Minimum)). 3: contoh: kontras teks, teks pengganti gambar (`alt`), label kotak isian; juga urutan judul, landmark, dan operasi dengan papan ketik.

## Langkah berikutnya

Modul berikut: `b-xii1-m8` (SEO dasar). Bacaan lanjut: WCAG 2.2 (`https://www.w3.org/TR/WCAG22/`), penjelasan Contrast (Minimum) (`https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html`), tutorial label formulir W3C WAI (`https://www.w3.org/WAI/tutorials/forms/labels/`), dan `docs/aksesibilitas.md` pada `https://github.com/ahliweb/awcms-one`.
