## Untuk siapa modul ini

Modul ini untuk murid kelas XII jalur B (Web dengan JavaScript, TypeScript, dan Bun), minggu `B-XII1-M3` silabus v1.4.1: menjelajahi `awcms-one`. Prasyarat: modul `b-xii1-m2` dan `b-xi1-m12` (ulasan sejawat dan membaca kode orang lain). Prasyarat di luar indeks: tidak ada; modul ini hanya **membaca**.

Modul ini berstatus DRAF: karangan penyusun, belum ditinjau pemilik. Silabus memetakan butir `F-AP-d` pada minggu ini; modul draf ini belum dihitung memenuhinya.

**Batas modul ini.** `awcms-one` dipakai sebagai **studi kasus** di kelas XII (keputusan pemilik silabus, 2026-11-18). Kamu membaca repositori publiknya dan tidak menjalankan apa pun dari sana pada modul ini. Basis data, Docker, dan backend disiapkan guru pada modul berikutnya; kamu tidak menyentuhnya. Fakta di bawah dibaca penyusun dari repositori publik pada 2026-11-20 (versi paket `0.20.0`, commit `66b9985a`); repositori itu terus berubah, jadi cocokkan dengan keadaan terbaru. Contoh dijalankan dengan Bun 1.4.4 per 2026-11. Tugas baca-dan-prediksi `AI: tanpa AI`; selain itu AI boleh dipakai dengan etika dan dicatat, tanpa data pribadi atau rahasia pada permintaanmu.

## Ingat kembali

Jawab dari ingatan dulu, baru cek di bagian kunci. Soal 1 dari `b-xii1-m2`, soal 2 dari `b-xi2-m10`, soal 3 dari `b-xi2-m9`.

1. Apa fungsi `<slot />` dalam tata letak, dan bagaimana tata letak memberi nilai bawaan untuk prop yang tidak dikirim?
2. Di mana rahasia disimpan agar tidak ikut ke repositori, dan apa yang dilakukan bila terlanjur ter-commit?
3. Apa yang kamu periksa sebelum memakai sebuah API publik (kunci atau akun, syarat, batas, kelengkapan)?

## Tujuan

Setelah modul ini kamu dapat:

- membaca `README`, dokumen arsitektur, dan ADR sebuah repositori asing dengan urutan yang masuk akal;
- membedakan `apps/storefront` dan `apps/cms` serta menyebut apa yang dimiliki masing-masing;
- menelusuri sebuah pertanyaan ("di mana X diatur?") dengan `grep` dan `package.json`;
- menyusun peta komponen satu halaman dengan bukti berupa jalur berkas (keluaran minggu ini: catatan peta repositori).

## Prediksi dulu

Ini tugas baca-dan-prediksi, `AI: tanpa AI`. **Tebak dulu, tulis jawabanmu, baru cek di repositori.**

Pada akar repositori, `package.json` memuat `"build": "cd apps/storefront && bun run build"`. Pada `apps/storefront/package.json` tertulis `"build": "bun run check && bun --bun astro build && bun run build:build-id && bun run build:penyaji"` dan `"check": "bun --bun astro check"`.

1. Bila kamu menjalankan `bun run build` di akar, perintah apa yang berjalan pertama kali di dalam `apps/storefront`?
2. Bagian mana dari repositori yang **tidak** ikut terbangun oleh perintah itu: `apps/cms` atau `apps/storefront`?

## Contoh terselesaikan

Repositori asing dibaca dari luar ke dalam. Urutan yang dipakai penyusun: (1) `README.md`: tujuan, cara pakai, peta folder; (2) `LICENSE`: apa yang boleh kamu lakukan; (3) `docs/status.md`: apa yang benar-benar ada hari ini; (4) `docs/arsitektur.md`; (5) indeks ADR di `docs/adr/`: alasan keputusan. Penyusun mengambil salinan dangkal agar cepat (satu commit terakhir, tanpa riwayat penuh), hanya untuk dibaca:

```sh
git clone --depth 1 https://github.com/ahliweb/awcms-one.git awcms-one
cd awcms-one
git log -1 --format='%h %ad' --date=short
```

```text
66b9985a 2026-11-19
```

Salinan itu berukuran sekitar 230 MB di komputer penyusun (`du -sh`). Isi akarnya antara lain `README.md`, `LICENSE`, `package.json`, `apps/`, `packages/`, `tools/`, `docs/`, dan `compose.yaml`.

README menyebut tiga hal yang penting bagimu. **Pertama**, `awcms-one` adalah platform Bun, Astro, dan PostgreSQL sekaligus *template* GitHub. **Kedua**, ada aturan *template-only*: aplikasi turunan memiliki dan menjalankan **backend, basis data, migrasi, rahasia, domain, dan penerapannya sendiri**; repositori ini bukan backend produksi bersama (ADR-0024). **Ketiga**, lisensinya MIT, tertulis di `LICENSE`. Penyusun menelusuri struktur dengan skrip kecil, dijalankan dari folder yang berisi salinan tadi (`bun run peta-repo.ts awcms-one`):

```ts
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const akar = process.argv[2] ?? "awcms-one";
const paket = JSON.parse(readFileSync(join(akar, "package.json"), "utf8"));

console.log("nama:", paket.name, "versi:", paket.version);
console.log("lisensi:", paket.license);
console.log("workspace:", paket.workspaces.join(", "));
console.log("jumlah skrip:", Object.keys(paket.scripts).length);

for (const nama of ["dev", "build", "template:init", "db:up", "db:migrate:cms"]) {
  console.log(`  ${nama} -> ${paket.scripts[nama]}`);
}

for (const folder of ["apps", "packages"]) {
  const isi = readdirSync(join(akar, folder), { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .map((e) => e.name)
    .sort();
  console.log(`${folder}/: ${isi.join(", ")}`);
}

const adr = readdirSync(join(akar, "docs", "adr")).filter(
  (f) => /^\d{4}-.*\.md$/.test(f) && !f.endsWith(".id.md"),
);
console.log("ADR berbahasa Inggris:", adr.length);
console.log("ADR terakhir:", adr.sort().at(-1));
```

```text
nama: awcms-one versi: 0.20.0
lisensi: MIT
workspace: apps/*, packages/*
jumlah skrip: 42
  dev -> cd apps/storefront && bun run dev
  build -> cd apps/storefront && bun run build
  template:init -> bun tools/template-init.ts
  db:up -> docker compose up -d --wait
  db:migrate:cms -> cd apps/cms && bun run db:migrate
apps/: cms, storefront
packages/: config, gerbang, kontrak
ADR berbahasa Inggris: 53
ADR terakhir: 0057-the-public-reading-preferences-panel-is-a-native-same-origin-component-not-a-third-party-overlay.md
```

Dari keluaran dan dokumennya, peta komponen kasarnya: `apps/storefront` adalah situs publik Astro yang dibangun menjadi berkas statis (`astro.config.mjs` berisi `output: "static"`); `apps/cms` adalah backend dan sistem catatan dengan PostgreSQL (README: `ahliweb/awcms` yang disalin utuh lewat `git subtree`); `packages/kontrak` adalah kontrak tipe antara keduanya; `packages/gerbang` memuat pemeriksaan mutu; `tools/` memuat skrip lintas bagian, termasuk `template-init.ts`. Setiap ADR punya cermin `.id.md`, itu sebabnya skrip membuang yang berakhiran itu: 53 ADR Inggris. Bagian rahasia: `apps/storefront/.env.example` hanya berisi contoh nilai; jangan salin nilai sungguhan dari mana pun ke tugasmu.

## Contoh setengah jadi

Lengkapi penyaring ADR (kunci di bawah):

```ts setengah-jadi
const adr = readdirSync(join(akar, "docs", "adr")).filter(
  (f) => /^\d{4}-.*\.md$/.test(f) && !f.____(".id.md"),
);
```

Mengapa berkas yang berakhiran `.id.md` dibuang, dan apa yang terjadi pada hitungan bila tidak dibuang?

## Soal Parsons

Susun baris berikut menjadi pembaca `package.json` yang mencetak nama paket (kunci di bawah). Satu baris tidak terpakai.

```text
import { readFileSync } from "node:fs";
const paket = JSON.parse(readFileSync("awcms-one/package.json", "utf8"));
console.log("nama:", paket.name);
const paket = readFileSync("awcms-one/package.json");
```

## Latihan

1. `AI: tanpa AI` Baca bagian "Template-only runtime rule" pada README dan tulis dengan kata-katamu sendiri dalam dua kalimat apa artinya bagi turunan template.
2. `AI: boleh` Tulis dulu tiga pertanyaan tentang repositori itu, lalu cari jawabannya dengan `grep` dan membaca berkas. Contoh: berkas mana mendefinisikan `SITE_PROFILE`? (`grep -rn "SITE_PROFILE" apps/storefront/src/config` menunjuk ke `profil.ts` pada percobaan penyusun.)
3. `AI: boleh` Buat peta komponen satu halaman: `apps/cms`, `apps/storefront`, `packages/*`, dan `tools/`, masing-masing satu kalimat **dengan jalur berkas sebagai bukti**.
4. `AI: tanpa AI` README menyebut `bun test` di akar tidak menjalankan uji `apps/cms`. Apa dua alasannya menurut README?
5. `AI: boleh` (opsional) Catatan pemakaian AI: alat, tujuan, garis besar perintah, bagian yang dipakai, dan cara memeriksanya.

## Latihan bercampur

1. `AI: boleh` (dari `b-xii1-m2`) Buka `apps/storefront/src/layouts/BaseLayout.astro`. Apa perannya, dan mengapa setiap halaman tidak menulis `<html>` sendiri?
2. `AI: boleh` (dari `b-xi1-m12`) Mengapa salinan dangkal (`--depth 1`) cukup untuk membaca tetapi tidak cukup untuk meninjau riwayat perubahan sebuah berkas?

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `b-xii1-m4` (pertanyaan 1), sekitar tiga minggu lagi di `b-xii1-m6` (pertanyaan 2), dan sekitar delapan minggu lagi di `b-xii1-m11` (pertanyaan 3). Jawab sekarang lalu simpan.

1. Apa beda `apps/storefront` dan `apps/cms`, dan mana yang berisi basis data?
2. Mengapa turunan template tidak boleh memakai backend produksi `awcms-one`?
3. Apa yang dimiliki `apps/storefront` dan `apps/cms` masing-masing, dan mana yang boleh diubah murid di kelas ini?

## Kesalahan umum

- **Membaca README saja.** README menjelaskan tujuan; `docs/status.md` menyatakan apa yang benar-benar ada hari ini.
- **Mengira `apps/cms` bagian yang kamu ubah.** Di kelasmu ia kotak hitam yang dijalankan guru; kamu hanya mengubah merek, konten, tema, SEO, dan dokumentasi.
- **Menyalin data kontak dari repositori.** Template berasal dari penerapan nyata; kontak dan alamat di berkas contohnya bukan untuk dipakai ulang.
- **Menyimpulkan dari nama skrip.** `db:up` tampak jelas, tetapi baca isinya: `docker compose up -d --wait`, yang butuh Docker.
- **Menjalankan perintah sebelum membaca.** Skrip di `package.json` dapat menjalankan perintah apa pun; baca dulu.
- **Mengira jumlah ADR sama dengan jumlah berkas.** Setiap ADR punya cermin `.id.md`; penyusun menghitung 53 ADR Inggris dari 106 berkas.

## Cek mandiri

- [ ] Saya dapat menyebut urutan membaca repositori asing dan alasannya.
- [ ] Saya dapat membedakan `apps/storefront` dan `apps/cms`.
- [ ] Saya dapat menjelaskan aturan template-only dengan kata sendiri.
- [ ] Saya dapat menelusuri sebuah pertanyaan dengan `grep` dan membuktikannya dengan jalur berkas.

## Kunci dan petunjuk

**Ingat kembali.** 1: slot adalah tempat isi halaman ditempel; nilai bawaan lewat destrukturisasi, `const { judul = "Tanpa judul" } = Astro.props`. 2: di `.env` yang masuk `.gitignore`; bila terlanjur ter-commit, anggap bocor, cabut dan ganti rahasianya, baru bereskan repositori. 3: apakah butuh kunci atau akun, syarat penggunaan (siapa boleh memakai untuk apa), batas pemakaian, dan kelengkapan serta kesegaran datanya.

**Prediksi dulu.** 1: `bun run check`, yaitu `bun --bun astro check`, karena rantai dengan `&&` berjalan dari kiri dan berhenti bila ada yang gagal. 2: `apps/cms`; skrip `build` di akar hanya masuk ke `apps/storefront`. (Catatan README: `bun run build` storefront mengambil konten dari `apps/cms` saat build, jadi storefront butuh sumber konten, tetapi `apps/cms` tidak dibangun olehnya.)

**Contoh setengah jadi.** Kunci: `endsWith`. Berkas `.id.md` adalah terjemahan Indonesia tiap ADR; bila tidak dibuang, hitungan memuat 106 berkas dan ADR terakhir bisa berupa cermin, bukan sumbernya.

**Soal Parsons.** Urutan: `import { readFileSync } from "node:fs";`, `const paket = JSON.parse(readFileSync("awcms-one/package.json", "utf8"));`, `console.log("nama:", paket.name);`. Baris `const paket = readFileSync("awcms-one/package.json");` tidak terpakai: hasilnya `Buffer`, bukan objek, sehingga `paket.name` tidak ada. Kunci dijalankan penyusun:

```ts
import { readFileSync } from "node:fs";
const paket = JSON.parse(readFileSync("awcms-one/package.json", "utf8"));
console.log("nama:", paket.name);
```

```text
nama: awcms-one
```

**Latihan.** 1: turunan template memiliki dan menjalankan backend, basis data, migrasi, rahasia, dan domainnya sendiri; ia tidak boleh memakai backend produksi `awcms-one` sebagai sistemnya. 2: tidak ada kunci tunggal; tiap jawaban harus punya jalur berkas. 3: contoh baris: `apps/storefront`: situs publik Astro (`apps/storefront/astro.config.mjs`); `apps/cms`: backend dan sistem catatan (`apps/cms/package.json`, nama `awcms`). 4: README: suite `apps/cms` sekitar 500 berkas uji, dan ia membutuhkan PostgreSQL yang hidup. 5: tidak ada kunci tunggal.

**Latihan bercampur.** 1: `BaseLayout.astro` adalah cangkang halaman (`<head>`, tautan lompat, header, `<main>`, footer); komentar awalnya menyebut halaman tidak menulis `<html>` sendiri sehingga semua halaman mendapat permukaan aksesibilitas dan SEO yang sama, persis tujuan tata letak di modul `b-xii1-m2`. 2: salinan dangkal hanya memuat commit terakhir; `git log` pada berkas hanya menampilkan satu entri, jadi riwayat perubahan sebelumnya tidak ada.

**Ulang berjarak.** 1: `apps/storefront` adalah situs publik Astro yang dibangun menjadi berkas statis; `apps/cms` adalah backend dan sistem catatan; basis data (PostgreSQL) milik `apps/cms`. 2: aturan template-only (ADR-0024): turunan memiliki backend, basis data, migrasi, rahasia, dan domain sendiri; backend bersama menimbulkan risiko rahasia, data, dan operasional. 3: `apps/storefront` memiliki halaman publik Astro dan tampilannya; `apps/cms` memiliki backend, basis data, dan migrasi. Murid hanya mengubah merek, konten, tema, SEO, dan dokumentasi di sisi storefront; backend dijalankan guru.

## Langkah berikutnya

Modul berikut: `b-xii1-m4` (demonstrasi guru: menjalankan `awcms-one` secara lokal). Bacaan lanjut: `README.md` dan `docs/template.md` di `https://github.com/ahliweb/awcms-one`, serta ADR-0018 dan ADR-0024 di folder `docs/adr/`.
