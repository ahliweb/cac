## Untuk siapa modul ini

Modul ini untuk murid kelas XII jalur B (Web dengan JavaScript, TypeScript, dan Bun), minggu `B-XII1-M6` silabus v1.4.1: kustomisasi merek dan konten. Prasyarat: modul `b-xii1-m5`. Prasyarat di luar indeks: repositori turunan lab yang disiapkan guru.

Modul ini berstatus DRAF: karangan penyusun, belum ditinjau pemilik. Silabus memetakan butir `F-AP-d` dan `F-LD-f` pada minggu ini; modul draf ini belum dihitung memenuhi keduanya.

**Batas modul ini.** Kamu mengubah **merek, konten, dan tema** pada repositori turunan lab; kamu tidak menyentuh backend dan tidak memakai backend produksi `awcms-one`. CMS lab dijalankan guru; yang kamu ubah adalah berkas konten contoh dan pengaturan merek. Semua nama, alamat, dan surel **fiktif** (domain `.example`). Contoh dijalankan penyusun dengan Bun 1.4.4 per 2026-11 terhadap `awcms-one` `0.20.0`, di salinan lokal, tanpa Docker dan tanpa data nyata. Tugas baca-dan-prediksi `AI: tanpa AI`; selain itu AI boleh dipakai dengan etika dan dicatat, tanpa data pribadi atau rahasia pada permintaanmu.

## Ingat kembali

Jawab dari ingatan dulu, baru cek di bagian kunci. Soal 1 dari `b-xii1-m5`, soal 2 dari `b-xii1-m3`, soal 3 dari `b-xi2-m12`.

1. Mengapa `template:init` aman dijalankan dua kali dengan flag yang sama?
2. Mengapa turunan template tidak boleh memakai backend produksi `awcms-one`?
3. Apa yang dikerjakan `bun build ./src/app.ts --outdir situs`, dan mengapa peramban memerlukannya untuk TypeScript?

## Tujuan

Setelah modul ini kamu dapat:

- menyebut tiga lapisan merek (flag `template:init`, variabel build, konten CMS) dan mana yang menang bila bertabrakan;
- mengganti nama, warna, kontak, dan konten contoh profil `landing` dengan nilai fiktif;
- memeriksa konten dengan skrip kecil dan `--dry-run`, serta menyatakan batas pemeriksaan itu;
- membangun situs dan memeriksa hasilnya (keluaran minggu ini: situs bermerek).

## Prediksi dulu

Ini tugas baca-dan-prediksi, `AI: tanpa AI`. **Tebak dulu, tulis jawabanmu, baru cek.**

Di `apps/storefront/src/lib/awcms/profil.ts` ada baris yang memilih nama situs:

```text
name: readEnv("SITE_NAME") ?? payload.siteName ?? DEFAULT_IDENTITY.name,
```

`payload.siteName` adalah nama dari CMS; `DEFAULT_IDENTITY.name` ditulis `template:init`. Operator `??` memakai nilai kanan hanya bila nilai kiri `null` atau `undefined`.

1. `SITE_NAME` tidak diisi, CMS mengirim nama `X`. Nama apa yang dipakai?
2. `SITE_NAME` diisi `Y`, CMS mengirim `X`. Nama apa yang dipakai?
3. `SITE_NAME` tidak diisi dan CMS tidak mengirim nama. Nama apa yang dipakai?

## Contoh terselesaikan

**Tiga lapisan merek.** (1) Flag `template:init` menulis `DEFAULT_IDENTITY` dan `DEFAULT_THEME_COLORS` di `site.ts` serta bawaan `.env.example`. (2) Variabel build `SITE_NAME` dan `SITE_DESCRIPTION` menimpa nilai dari CMS. (3) Konten (halaman, slogan, kontak) berada di CMS; berkas contohnya di `tools/seed-data/profil/landing/pages.json` dan `site-profile.json`, yang disemai guru ke CMS lab dengan `bun run db:seed:cms:profil landing`. Warna datang dari `DEFAULT_THEME_COLORS` kecuali CMS punya nilai (komentar kode: tanpa `AWCMS_TENANT_CODE` ia memakai `DEFAULT_THEME_COLORS`).

**Warna.** Penyusun mengulang `template:init` dengan `--warna-primer "#b91c1c"` (lebih dulu `--dry-run`):

```text
Rewrite:
  - package.json — unchanged
  - apps/storefront/src/config/site.ts

Remove:
  (nothing left to remove)

Reset (one-time):
  (already run once — CHANGELOG.md, .changesets/, and package.json's version are left as this repo's own history)
```

Hanya `site.ts` yang berubah. Setelah dibangun terhadap stub uji milik repositori (bukan CMS; token palsu `TOKEN_PALSU_CONTOH`), `theme-tokens.css` berisi:

```text
:root {
  --color-primary: #b91c1c;
  --color-primary-foreground: #ffffff;
  --color-secondary: #691010;
  --color-secondary-foreground: #ffffff;
  --color-accent: #f59e0b;
  --color-accent-foreground: #000000;
}
```

**Nama.** Dibangun tanpa `SITE_NAME`, `<title>` dan `<h1>` halaman depan berisi `BjekMart (Stub)`: nama dari stub menang atas `DEFAULT_IDENTITY`. Dengan `SITE_NAME="Sekolah Contoh"` dan `SITE_DESCRIPTION="Sekolah fiktif untuk latihan."`, keduanya berisi `Sekolah Contoh` dan `<meta name="description">` berisi deskripsi itu. Itu sesuai urutan di baris tadi.

**Konten.** Berkas contoh memuat teks bertanda `PLACEHOLDER` dan nama perusahaan contoh. Penyusun menulis pemeriksa kecil, dijalankan dari akar repositori turunan (`bun run periksa-konten.ts`):

```ts
import { readFileSync } from "node:fs";

const folder = "tools/seed-data/profil/landing";
const halaman = JSON.parse(readFileSync(`${folder}/pages.json`, "utf8")) as {
  slug: string;
  title: string;
  excerpt: string;
  bodyParagraphs: string[];
}[];
const profil = readFileSync(`${folder}/site-profile.json`, "utf8");

const temuan: string[] = [];
const semuaTeks = JSON.stringify(halaman) + profil;

for (const sisa of ["PLACEHOLDER", "PT Contoh Karya", "example.com"]) {
  if (semuaTeks.includes(sisa)) temuan.push(`masih memuat "${sisa}"`);
}

const slug = new Set<string>();
for (const h of halaman) {
  if (slug.has(h.slug)) temuan.push(`slug ganda: ${h.slug}`);
  slug.add(h.slug);
  if (h.title.trim() === "") temuan.push(`judul kosong pada ${h.slug}`);
  if (h.bodyParagraphs.length === 0) temuan.push(`${h.slug} tanpa paragraf`);
}

console.log(`halaman: ${halaman.length}`);
for (const t of temuan) console.log(`TEMUAN: ${t}`);
console.log(temuan.length === 0 ? "bersih" : `${temuan.length} temuan`);
process.exit(temuan.length === 0 ? 0 : 1);
```

Pada berkas asli, hasilnya:

```text
halaman: 4
TEMUAN: masih memuat "PLACEHOLDER"
TEMUAN: masih memuat "PT Contoh Karya"
TEMUAN: masih memuat "example.com"
3 temuan
```

Penyusun lalu mengganti empat halaman dan profil dengan "Sekolah Contoh" (judul, ringkasan, dua paragraf tiap halaman, surel `info@sekolah-contoh.example`, telepon dan WhatsApp `null`, tanpa tautan sosial). Pemeriksa kini mencetak `halaman: 4` dan `bersih`, dan `bun tools/seed-cms.ts --profil landing --dry-run` mencetak `pages: 4` dan `site profile: 1 (full replace)` serta `No network calls made (dry-run)`. Batasnya: ketika penyusun sengaja mengubah `slug` menjadi `Layanan Kami!`, `--dry-run` **tetap lolos** dengan angka yang sama. Jadi dry-run menghitung dan memeriksa bentuk dasar; ia tidak membuktikan bahwa isinya benar. Kebenaran akhir terlihat setelah guru menyemai CMS lab dan situs dibangun.

## Contoh setengah jadi

Lengkapi fungsi pemilih nama (kunci di bawah):

```ts setengah-jadi
function pilihNama(env: string | undefined, cms: string | undefined, bawaan: string): string {
  return env ____ cms ____ bawaan;
}
```

Apa bedanya bila ditulis dengan `||` dan `env` berisi teks kosong `""`?

## Soal Parsons

Susun baris berikut menjadi urutan mengubah warna merek (kunci di bawah). Satu baris tidak terpakai.

```text
bun run template:init ... --warna-primer "#b91c1c" --dry-run
bun run template:init ... --warna-primer "#b91c1c"
git diff apps/storefront/src/config/site.ts
git commit -am "ganti warna primer"
bun run template:init ... --nama "Nama Asli Orang Lain"
```

## Latihan

1. `AI: tanpa AI` Berapa temuan yang dicetak `periksa-konten.ts` pada berkas contoh asli, dan apa saja? Jalankan untuk mencocokkan.
2. `AI: boleh` Ubah warna primer merekmu dengan `template:init` (mulai dari `--dry-run`), lalu baca `site.ts` dengan `git diff`. Berkas apa saja yang berubah?
3. `AI: boleh` Tulis dulu profil organisasi fiktifmu: nama, slogan, empat halaman beserta isi singkat, dan kontak `.example`. Baru ubah `pages.json` dan `site-profile.json`, lalu jalankan pemeriksa dan `--dry-run`.
4. `AI: tanpa AI` Mengapa halaman kebijakan privasi tidak boleh sekadar menulis "situs ini tidak mengumpulkan data" bila kelak ada formulir kontak?
5. `AI: boleh` (opsional) Catatan pemakaian AI: alat, tujuan, garis besar perintah, bagian yang dipakai, dan cara memeriksanya.

## Latihan bercampur

1. `AI: boleh` (dari `b-xii1-m3`) Di jalur mana pada repositori turunan konten contoh profil `landing` tersimpan, dan siapa yang memasukkannya ke CMS di kelas ini?
2. `AI: boleh` (dari `b-xi2-m12`) Hasil build disajikan di jaringan lab. Dokumentasi klien menyebut token build `AWCMS_API_TOKEN` hanya dipakai saat build dan tidak diberi awalan `PUBLIC_`. Mengapa itu penting bagi isi `dist/`?

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `b-xii1-m7` (pertanyaan 1), sekitar tiga minggu lagi di `b-xii1-m9` (pertanyaan 2), dan sekitar delapan minggu lagi di `b-xii1-m14` (pertanyaan 3). Jawab sekarang lalu simpan.

1. Dari mana nama situs yang tampil di build diambil, berurutan dari yang diutamakan?
2. Berkas mana saja yang diubah untuk merek dan warna, dan di jalur mana konten contoh profil `landing` disimpan?
3. Mengapa isi situs latihan memakai nama, alamat, dan surel fiktif berdomain `.example`?

## Kesalahan umum

- **Mengubah nama di `site.ts` lalu heran tampilannya tetap berbeda.** `SITE_NAME` dan nilai dari CMS lebih diutamakan; pada percobaan penyusun nama dari stub tampil sampai `SITE_NAME` diisi.
- **Menganggap `--dry-run` lolos berarti benar.** Slug `Layanan Kami!` lolos pada percobaan penyusun.
- **Menyisakan `PLACEHOLDER` atau nama contoh di halaman.** Pemeriksa kecil menangkapnya; jalankan sebelum diserahkan.
- **Memakai data nyata.** Nama, alamat, telepon, dan surel nyata tidak masuk berkas konten; pakai karangan dan `.example`.
- **Mengubah konten di `dist/`.** Itu hasil build; ubah sumbernya lalu bangun ulang.
- **Menuliskan kebijakan privasi sembarang.** Isi kebijakan harus sesuai keadaan situs dan ditinjau guru sebelum situs dipublikasikan.

## Cek mandiri

- [ ] Saya dapat menyebut tiga lapisan merek dan urutan prioritasnya.
- [ ] Saya dapat mengganti warna, nama, kontak, dan konten dengan nilai fiktif.
- [ ] Saya dapat memeriksa konten dengan skrip dan `--dry-run`, dan menyatakan batasnya.
- [ ] Saya dapat membangun situs dan membaca `<title>` serta `theme-tokens.css` hasilnya.

## Kunci dan petunjuk

**Ingat kembali.** 1: ia idempoten: dengan flag yang sama alat mencetak `nothing to do` dan keluar 0; hanya yang berubah ditulis ulang. 2: aturan template-only (ADR-0024): turunan memiliki backend, basis data, migrasi, rahasia, dan domain sendiri; backend bersama menimbulkan risiko rahasia, data, dan operasional. 3: `bun build` menggabungkan dan mengubah `src/app.ts` menjadi JavaScript biasa di folder `situs`; peramban tidak menjalankan TypeScript.

**Prediksi dulu.** 1: `X`, karena `SITE_NAME` kosong sehingga jatuh ke nilai CMS. 2: `Y`: variabel build menang. 3: `DEFAULT_IDENTITY.name`, yaitu nama hasil `template:init`.

**Contoh setengah jadi.** Kunci: `??` dan `??`. Dengan `||`, teks kosong `""` dianggap salah sehingga `env` yang sengaja dikosongkan ikut dilewati; `??` hanya melewati `null` dan `undefined`. Kunci dijalankan penyusun:

```ts
function pilihNama(env: string | undefined, cms: string | undefined, bawaan: string): string {
  return env ?? cms ?? bawaan;
}

console.log(pilihNama(undefined, "X", "Bawaan"));
console.log(pilihNama("Y", "X", "Bawaan"));
console.log(pilihNama(undefined, undefined, "Bawaan"));
console.log(JSON.stringify(pilihNama("", "X", "Bawaan")));
```

```text
X
Y
Bawaan
""
```

**Soal Parsons.** Urutan: `... --warna-primer "#b91c1c" --dry-run`, `... --warna-primer "#b91c1c"`, `git diff apps/storefront/src/config/site.ts`, `git commit -am "ganti warna primer"`. Baris dengan `--nama "Nama Asli Orang Lain"` tidak terpakai: merek memakai nama fiktif, bukan nama orang.

**Latihan.** 1: tiga temuan: `PLACEHOLDER`, `PT Contoh Karya`, dan `example.com` (dijalankan penyusun). 2: `site.ts` saja yang berubah pada percobaan penyusun (dry-run: `package.json — unchanged`). 3: tidak ada kunci tunggal; periksa bahwa pemeriksa mencetak `bersih` dan tidak ada data nyata. 4: kebijakan harus mencerminkan kenyataan; begitu ada formulir, situs mengumpulkan data dan kebijakan lama menyesatkan. Minta guru meninjaunya. 5: tidak ada kunci tunggal.

**Latihan bercampur.** 1: `tools/seed-data/profil/landing/` (`pages.json` dan `site-profile.json`); guru menyemainya dengan `bun run db:seed:cms:profil landing`. 2: token itu memberi akses baca ke CMS; bila masuk ke `dist/` yang tersaji, siapa pun dapat mengambilnya. Memeriksa isi `dist/` tetap perlu.

**Ulang berjarak.** 1: variabel `SITE_NAME` bila ada, lalu `siteName` dari CMS, lalu `DEFAULT_IDENTITY.name` hasil `template:init`. 2: merek dan warna: `apps/storefront/src/config/site.ts` (ditulis `template:init`) dan bawaan `apps/storefront/.env.example`; konten contoh: `tools/seed-data/profil/landing/pages.json` dan `site-profile.json`. 3: agar tidak ada data nyata atau orang yang dapat dikenali di repositori, dan domain `.example` termasuk nama domain yang dicadangkan untuk contoh (RFC 2606) sehingga tidak menuju pihak nyata.

## Langkah berikutnya

Modul berikut: `b-xii1-m7` (tema, CSS, dan aksesibilitas), tempat warna yang kamu pilih diperiksa kontrasnya. Bacaan lanjut: `docs/template.md` di `https://github.com/ahliweb/awcms-one` (bagian "Sample seeds"), dan RFC 2606 (`https://www.rfc-editor.org/rfc/rfc2606`).
