## Untuk siapa modul ini

Modul ini untuk murid kelas XII jalur B (Web dengan JavaScript, TypeScript, dan Bun), minggu `B-XII2-M3` silabus v1.4.1: sprint 1, konten. Dikerjakan berkelompok dua sampai tiga orang. Prasyarat: modul `b-xii2-m2` (rancangan).

Modul ini karangan penyusun dan disetujui pemilik program pada 2026-11-20 (keputusan lewat dialog; catatan tinjauan menjadi tindak lanjut revisi). Silabus memetakan butir `F-BK-a` dan `F-LD-f` pada minggu ini; pemenuhan butir mengikuti pemetaan silabus, bukan status modul. Keluaran minggu ini: konten tahap 1 (halaman utama dan halaman pendukung).

**Batas modul ini.** Kamu mengubah **konten** pada berkas contoh di repositori turunan lab; backend tidak disentuh. Guru yang menyemai berkas ke CMS lab (`bun run db:seed:cms:profil landing`, `[belum terverifikasi]`: penyusun tidak menjalankan Docker, PostgreSQL, atau CMS). Tanpa CMS lab, pratinjau di bawah jadi cadangannya (`b-xii1-m4`). Dijalankan dengan Bun 1.4.4 pada `awcms-one` 0.20.0. Semua nama dan kontak karangan. AI boleh dipakai dengan etika dan dicatat, tanpa data pribadi atau rahasia.

## Ingat kembali

Jawab dari ingatan dulu, baru cek di bagian kunci. Soal 1 dari `b-xii2-m2`, soal 2 dari `b-xii1-m6`, soal 3 dari `b-xii1-m9`.

1. Sebutkan enam hal yang diperiksa pada peta situs.
2. Dari mana nama situs yang tampil di build diambil, berurutan dari yang diutamakan?
3. Apa yang dibuktikan dan tidak dibuktikan oleh gerbang yang hijau?

## Tujuan

Setelah modul ini kamu dapat:

- menulis halaman dan profil situs di berkas contoh sesuai rancangan;
- memeriksa konten dengan skrip, uji repositori, dan `--dry-run`, serta menyatakan batas masing-masing;
- melihat hasilnya lewat pratinjau lokal tanpa CMS (keluaran minggu ini: konten tahap 1).

## Rencana sprint

Sprint ini mengisi rancangan `b-xii2-m2`. Konten ada di dua berkas dalam `tools/seed-data/profil/landing/`: `pages.json` (halaman) dan `site-profile.json` (tagline, alamat, kontak). Satu halaman contoh:

```json
{
  "slug": "jam-layanan",
  "title": "Jam layanan",
  "pageType": "standard",
  "excerpt": "Jam buka tiap hari dan jadwal libur Perpustakaan Komunitas Contoh.",
  "bodyParagraphs": [
    "Senin sampai Jumat: 09.00 sampai 16.00. Sabtu: 09.00 sampai 12.00. Minggu dan hari libur nasional: tutup.",
    "Perubahan jam buka diumumkan di halaman ini paling lambat sehari sebelumnya."
  ]
}
```

`excerpt` menjadi ringkasan di halaman dan, bila tidak ada deskripsi lain, deskripsi untuk mesin pencari; panjangnya paling banyak 160 karakter. Tagline memuat jam buka, supaya K1 punya tempat. Tulis prediksimu dulu: apa saja yang akan ditandai skrip pemeriksa di bawah pada konten bawaan template?

```ts
import { readFileSync } from "node:fs";
// @ts-expect-error berkas .mjs milik repositori tanpa deklarasi tipe
import { scanForPii, validatePages } from "./tools/lib/seed-profil.mjs";

const folder = "tools/seed-data/profil/landing";
const halaman = JSON.parse(readFileSync(`${folder}/pages.json`, "utf8")) as {
  slug: string; title: string; excerpt: string; bodyParagraphs: string[];
}[];
const profil = JSON.parse(readFileSync(`${folder}/site-profile.json`, "utf8")).current;

const temuan: string[] = [];
for (const isu of validatePages(halaman)) temuan.push(`bentuk: ${JSON.stringify(isu)}`);

for (const h of halaman) {
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(h.slug)) temuan.push(`${h.slug}: slug harus huruf kecil, angka, tanda hubung`);
  if (h.title.length > 60) temuan.push(`${h.slug}: judul ${h.title.length} karakter (>60)`);
  if (h.excerpt.length > 160) temuan.push(`${h.slug}: ringkasan ${h.excerpt.length} karakter (>160)`);
}

const semua = JSON.stringify(halaman) + JSON.stringify(profil);
for (const sisa of ["PLACEHOLDER", "PT Contoh Karya", "example.com"]) {
  if (semua.includes(sisa)) temuan.push(`masih memuat "${sisa}"`);
}
const pii = scanForPii(semua);
for (const e of pii.emails) temuan.push(`surel ${e} di luar daftar yang diizinkan repositori`);
for (const t of pii.phones) temuan.push(`telepon ${t} bukan nomor contoh`);
if (!profil.contactEmail) temuan.push("contactEmail wajib diisi (uji repositori)");
if (!profil.contactPhone) temuan.push("contactPhone wajib diisi (uji repositori)");
if (halaman.length > 4) temuan.push(`${halaman.length} halaman (uji repositori: paling banyak 4)`);

console.log(`halaman: ${halaman.length}`);
for (const t of temuan) console.log(`TEMUAN: ${t}`);
console.log(temuan.length === 0 ? "bersih" : `${temuan.length} temuan`);
process.exit(temuan.length === 0 ? 0 : 1);
```

Dijalankan dari akar repositori (`bun run periksa-konten.ts`) pada berkas bawaan template:

```text
halaman: 4
TEMUAN: masih memuat "PLACEHOLDER"
TEMUAN: masih memuat "PT Contoh Karya"
TEMUAN: masih memuat "example.com"
3 temuan
```

Tiga temuan itu sisa template. Skrip memakai `validatePages` dan `scanForPii` milik repositori (`tools/lib/seed-profil.mjs`), jadi aturannya sama dengan aturan uji. Setelah konten karanganmu ditulis:

```text
halaman: 4
bersih
```

**Dua kontrak yang tidak tampak.** Uji `tests/seed-profil.test.mjs` berjalan dalam sekitar sepersepuluh detik. Aturannya berbeda dari kebiasaan "surel contoh berdomain `.example`": uji hanya mengizinkan `example.com`, `example.id`, `example.net`, `example.org`, dan mewajibkan `contactPhone` terisi. Penyusun mencoba `info@perpus-contoh.example` dengan telepon `null`. Skrip pemeriksa menangkapnya:

```text
halaman: 4
TEMUAN: surel info@perpus-contoh.example di luar daftar yang diizinkan repositori
TEMUAN: contactPhone wajib diisi (uji repositori)
2 temuan
```

dan uji repositori gagal:

```text
(fail) tools/seed-data/profil/landing — schema > site-profile.json carries contact details (contract: 'site-profile/pages/contact') [8.86ms]
(fail) no-PII sweep — profile seeds only (contoh:borneojek-mart is real, documented reference content) > landing/site-profile.json has no e-mail/phone outside the placeholder allowlist [1.30ms]
 45 pass
 2 skip
 2 fail
Ran 49 tests across 1 file. [101.00ms]
```

Dengan `info@example.org` dan telepon `+62 800 0000 0000`:

```text
 47 pass
 2 skip
 0 fail
Ran 49 tests across 1 file. [109.00ms]
```

Lalu `--dry-run` seed, tanpa jaringan:

```text
Would apply (idempotent, upsert by slug):
  - pages: 4
  - site profile: 1 (full replace)
```

Dry-run membuktikan bentuk berkas, bukan kebenaran isinya.

**Pratinjau tanpa CMS.** Build mengambil konten dari CMS. Tanpa CMS, repositori punya tiruan uji (`apps/storefront/scripts/stub-awcms.mjs`) yang memakai berkas uji, bukan berkas contohmu. Skrip berikut menulis salinan berkas uji dari kontenmu ke folder lain; repositori tidak berubah, dan ini bukan cara kerja CMS sungguhan.

```ts
import { cpSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";

const keluar = process.argv[2] ?? "/tmp/pratinjau-perpus";
const seed = "tools/seed-data/profil/landing";
const stub = "apps/storefront";

mkdirSync(`${keluar}/scripts`, { recursive: true });
cpSync(`${stub}/tests/fixtures`, `${keluar}/tests/fixtures`, { recursive: true });
for (const f of ["stub-awcms.mjs", "stub-booking.mjs", "stub-push.mjs"]) {
  cpSync(`${stub}/scripts/${f}`, `${keluar}/scripts/${f}`);
}

type Seed = { slug: string; title: string; excerpt: string; pageType: string; bodyParagraphs: string[] };
const halaman: Seed[] = JSON.parse(readFileSync(`${seed}/pages.json`, "utf8"));
const profil = JSON.parse(readFileSync(`${seed}/site-profile.json`, "utf8")).current;
const waktu = "2026-11-20T00:00:00.000Z";
const fx = `${keluar}/tests/fixtures/awcms`;

writeFileSync(`${fx}/blog-pages-public.json`, JSON.stringify({
  pages: halaman.map((h) => ({ title: h.title, slug: h.slug, locale: "id", updatedAt: waktu })),
}));
writeFileSync(`${fx}/blog-pages-public-detail.json`, JSON.stringify(Object.fromEntries(
  halaman.map((h, i) => [h.slug, {
    id: `00000000-0000-4000-8000-${String(i).padStart(12, "0")}`,
    title: h.title, slug: h.slug, excerpt: h.excerpt,
    seoTitle: null, metaDescription: null, canonicalUrl: null, locale: "id",
    publishedAt: waktu, updatedAt: waktu, visibility: "public", pageType: h.pageType,
    bodyPortableText: h.bodyParagraphs.map((teks, j) => ({
      _type: "block", _key: `b${j}`, style: "normal", markDefs: [],
      children: [{ _type: "span", _key: `s${j}`, text: teks, marks: [] }],
    })),
  }]),
)));
writeFileSync(`${fx}/site-profile-composed.json`, JSON.stringify({
  ...profil, siteName: "Perpustakaan Komunitas Contoh", organizationName: "Perpustakaan Komunitas Contoh",
  organizationLogoMediaId: null, defaultSocialMediaId: null,
}));
const faqs = existsSync("faq-latihan.json") ? JSON.parse(readFileSync("faq-latihan.json", "utf8")) : [];
const toko = JSON.parse(readFileSync(`${fx}/store-settings-public.json`, "utf8"));
writeFileSync(`${fx}/store-settings-public.json`, JSON.stringify({
  ...toko,
  storeName: "Perpustakaan Komunitas Contoh", tagline: profil.tagline, logo: null, favicon: null,
  address: profil.editorialAddress, phone: profil.contactPhone, whatsapp: profil.whatsappNumber,
  email: profil.contactEmail, mapsEmbedUrl: null, faqs,
  social: {}, promoSection: null, meta: null,
}));
console.log(`pratinjau ditulis ke ${keluar}: ${halaman.length} halaman`);
```

Jalankan `bun pratinjau.ts /tmp/pratinjau-perpus`, nyalakan tiruan dari folder itu (`STUB_PORT=34710 bun scripts/stub-awcms.mjs`), lalu dari `apps/storefront` jalankan `bun --bun astro build` dengan `AWCMS_API_URL` dan `PUBLIC_AWCMS_ORIGIN` menunjuk tiruan itu, `AWCMS_API_TOKEN=TOKEN_PALSU_CONTOH`, dan `SITE_PROFILE=landing`. Tanpa `PUBLIC_AWCMS_ORIGIN`, build gagal. Hasilnya:

```text
index.html
<title>Perpustakaan Komunitas Contoh</title>
<meta name="description" content="Perpustakaan komunitas fiktif. Buka Senin sampai Jumat 09.00-16.00, Sabtu 09.00-12.00."
halaman/jam-layanan.html
<title>Jam layanan — Perpustakaan Komunitas Contoh</title>
<meta name="description" content="Jam buka tiap hari dan jadwal libur Perpustakaan Komunitas Contoh."
halaman/peminjaman-buku.html
<title>Peminjaman buku — Perpustakaan Komunitas Contoh</title>
<meta name="description" content="Syarat dan langkah meminjam buku di Perpustakaan Komunitas Contoh."
```

## Daftar periksa

- [ ] Prediksi sisa template tertulis sebelum skrip dijalankan.
- [ ] Empat halaman atau kurang; slug huruf kecil dengan tanda hubung; `pageType` sah.
- [ ] Tagline memuat jam buka (K1); surel `example.org`; telepon placeholder.
- [ ] Skrip pemeriksa, `bun test tests/seed-profil.test.mjs`, dan `--dry-run` lolos.
- [ ] Tidak ada data orang atau organisasi nyata.
- [ ] Bila memakai AI: log pemakaian, tanpa data pribadi.

## Umpan balik sejawat

Tukar berkas konten dengan kelompok lain dan beri ulasan dengan format: **satu yang sudah baik, satu yang perlu diperbaiki, satu langkah berikutnya**. Tulis komentar pada halaman tertentu, sebutkan temuan dan saran. Periksa: apakah isi menjawab kebutuhan, apakah ada klaim tanpa bukti, dan apakah ada data nyata.

## Latihan bercampur

1. `AI: boleh` (dari `b-xii1-m6`) Ubah tagline agar memuat satu hal selain jam buka, lalu hitung panjangnya. Mana yang menang bila `SITE_DESCRIPTION` dan CMS sama-sama terisi?
2. `AI: tanpa AI` (dari `b-xii1-m9`) Dari tiga pemeriksaan modul ini, mana yang berupa gerbang lolos atau gagal, dan apa yang tetap hanya bisa dinilai manusia?

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `b-xii2-m4` (pertanyaan 1), sekitar tiga minggu lagi di `b-xii2-m6` (pertanyaan 2), dan sekitar delapan minggu lagi di `b-xii2-m11` (pertanyaan 3). Jawab sekarang lalu simpan.

1. Pemeriksaan apa yang dijalankan pada konten sebelum build, dan berapa halaman paling banyak menurut uji repositori?
2. Mengapa surel contoh di berkas seed memakai `example.org`, bukan domain karanganmu?
3. Apa yang harus ada pada komentar ulasan untuk berkas konten teman?

## Kesalahan umum

- **Mengira `--dry-run` membuktikan isi.**
- **Memakai `.example` di berkas seed.** Uji repositori menolaknya; periksa dengan skrip dan uji sebelum menyerahkan.
- **Telepon `null`.** Uji mewajibkan telepon terisi; pakai placeholder.
- **Menambah halaman kelima.** Uji membatasi empat halaman contoh.
- **Mengira pratinjau sama dengan CMS.** Ia tidak membuktikan apa pun tentang CMS lab.

## Cek mandiri

- [ ] Saya dapat mengisi `pages.json` dan `site-profile.json` sesuai rancangan.
- [ ] Saya dapat menjalankan skrip pemeriksa dan uji repositori serta membaca hasilnya.
- [ ] Saya dapat menyebut yang dibuktikan dan tidak dibuktikan `--dry-run`.
- [ ] Saya meninjau konten teman dengan temuan, alasan, dan saran.

## Kunci dan petunjuk

**Ingat kembali.** 1: judul tampil di bawah 60 karakter, deskripsi ada, deskripsi di bawah 160, judul unik, tertaut dari halaman lain, dan melayani kebutuhan. 2: `SITE_NAME` (variabel build) diutamakan; bila tidak ada, nama dari CMS (`siteName`); bila itu pun kosong, `DEFAULT_IDENTITY.name` yang ditulis `template:init`. 3: dibuktikan bahwa semua pemeriksaan yang ditulis lolos; tidak dibuktikan bahwa situs benar untuk semua masukan atau bahwa pemeriksaannya sendiri sudah cukup.

**Rencana sprint.** Prediksi: contoh jawaban "PLACEHOLDER, nama perusahaan contoh, dan surel `example.com`"; penilaian pada alasan. Semua keluaran di atas dijalankan penyusun pada salinan lab; nilai waktu uji berbeda tiap mesin. Pratinjau memakai tiruan uji milik repositori yang dibaca dari berkas yang ditulis `pratinjau.ts`; nama situs di build berasal dari `siteName` pada berkas profil tiruan.

**Latihan bercampur.** 1: contoh: "Buka Senin sampai Jumat 09.00-16.00, Sabtu 09.00-12.00. Pinjam buku gratis." Urutan: `SITE_NAME` dan `SITE_DESCRIPTION` (variabel build) menang atas nilai CMS, karena kode menulis `readEnv(...) ?? CMS ?? bawaan` (dari modul `b-xii1-m6`, dibaca dari `profil.ts`). 2: skrip pemeriksa dan uji seed berkode keluar (lolos atau gagal), dry-run mencetak hitungan (dan memeriksa bentuk); yang hanya bisa dinilai manusia: apakah isi benar dan berguna bagi pengunjung.

**Ulang berjarak.** 1: skrip pemeriksa konten (bentuk, panjang, sisa template, surel, telepon), uji `tests/seed-profil.test.mjs`, dan `--dry-run`; paling banyak empat halaman. 2: uji repositori hanya mengizinkan domain `example.com`, `example.id`, `example.net`, `example.org` pada berkas seed. 3: lokasi (berkas dan halaman), temuan yang jelas, alasan, dan saran perbaikan; bukan sekadar "kurang bagus".

## Langkah berikutnya

Modul berikut: `b-xii2-m4` (sprint 1: tampilan, yaitu merek dan tema). Bacaan lanjut: `docs/template.md` bagian "Starting from the template" pada `https://github.com/ahliweb/awcms-one`.
