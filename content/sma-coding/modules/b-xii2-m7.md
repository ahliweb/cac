## Untuk siapa modul ini

Modul ini untuk murid kelas XII jalur B (Web dengan JavaScript, TypeScript, dan Bun), minggu `B-XII2-M7` silabus v1.4.1: sprint 3, penyempurnaan kualitas dan aksesibilitas. Dikerjakan berkelompok dua sampai tiga orang. Prasyarat: modul `b-xii2-m6` (laporan uji).

Modul ini berstatus DRAF: karangan penyusun, belum ditinjau pemilik. Silabus memetakan butir `F-BK-a` dan `F-LD-f` pada minggu ini; modul draf ini belum dihitung memenuhi keduanya. Keluaran minggu ini: rilis kandidat.

**Batas modul ini.** Kamu memperbaiki **merek, konten, tema, SEO, dan dokumentasi**; kode situs dan backend tidak diubah. Temuan yang ada di kode template dicatat sebagai usulan, bukan diperbaiki. Contoh dijalankan dengan Bun 1.4.4 per 2026-11 pada salinan `awcms-one` 0.20.0, tanpa CMS. Semua nama dan kontak karangan. Tugas prediksi `AI: tanpa AI`; selain itu AI boleh dipakai dengan etika dan dicatat, tanpa data pribadi atau rahasia.

## Ingat kembali

Jawab dari ingatan dulu, baru cek di bagian kunci. Soal 1 dari `b-xii2-m6`, soal 2 dari `b-xii2-m4`, soal 3 dari `b-xii1-m13`.

1. Mengapa hasil uji manual harus mencatat langkah dan bukti nyata, bukan hanya "OK"?
2. Mengapa teks di atas tombol berwarna primer dipilih otomatis, dan pemeriksaan apa yang tetap perlu?
3. Mengapa gerbang hijau di `main` dicatat sebagai garis dasar sebelum mulai?

## Tujuan

Setelah modul ini kamu dapat:

- memilah temuan menjadi yang boleh diperbaiki kelompokmu dan yang harus diusulkan;
- memperbaiki temuan dan membuktikan perbaikannya dengan uji yang sama;
- menjalankan alat aksesibilitas otomatis dan menindaklanjuti hasil "perlu cek manual";
- menyatakan apa itu rilis kandidat dan apa yang tidak dibuktikannya.

## Rencana sprint

Sprint ini menutup temuan `b-xii2-m6`. Aturan sprint terakhir: **fitur dibekukan**. Hanya perbaikan yang masuk, dan tiap perbaikan menunjuk temuan. Tulis prediksimu: bila `favicon.svg` diganti, apakah semua langkah gerbang lolos, dan berapa pelanggaran yang akan dilaporkan alat aksesibilitas?

Perbaikan T1 ada dalam lingkup (merek): ganti `apps/storefront/public/favicon.svg` dengan ikon sendiri, warnanya dari palet.

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" role="img" aria-label="Perpustakaan Komunitas Contoh">
  <rect width="32" height="32" rx="7" fill="#0f766e"/>
  <text x="16" y="22" text-anchor="middle" font-family="system-ui, sans-serif" font-size="18" font-weight="700" fill="#ffffff">P</text>
</svg>
```

Rilis kandidat adalah keadaan ketika semua pemeriksaan yang kamu tulis lolos dan tidak ada temuan terbuka yang kamu tahu. Skrip berikut menjalankan gerbang kelompok satu per satu dan melaporkan semuanya, tidak berhenti di yang pertama gagal. Ia **tidak membangun situs**: bangun dulu, dan ingat urutan dari `b-xii2-m6` (`bun test` menimpa `dist/`).

```ts
import { existsSync } from "node:fs";

const langkah: { nama: string; perintah: string[] }[] = [
  { nama: "konten", perintah: ["bun", "run", "periksa-konten.ts"] },
  { nama: "seed (kering)", perintah: ["bun", "tools/seed-cms.ts", "--profil", "landing", "--dry-run"] },
  { nama: "uji seed", perintah: ["bun", "test", "tests/seed-profil.test.mjs"] },
  { nama: "hasil build", perintah: ["bun", "run", "periksa-dist.ts"] },
  { nama: "tema", perintah: ["bun", "run", "periksa-tema.ts"] },
];

if (!existsSync("apps/storefront/dist/client/index.html")) {
  console.log("belum ada hasil build: bangun situs lebih dulu");
  process.exit(2);
}

let gagal = 0;
for (const l of langkah) {
  const hasil = Bun.spawnSync(l.perintah, { stdout: "ignore", stderr: "ignore" });
  const lolos = hasil.exitCode === 0;
  if (!lolos) gagal++;
  console.log(`${lolos ? "LOLOS" : "GAGAL"}  ${l.nama} (kode keluar ${hasil.exitCode})`);
}
console.log(gagal === 0 ? "rilis kandidat: semua langkah lolos" : `rilis kandidat: ${gagal} langkah gagal`);
process.exit(gagal === 0 ? 0 : 1);
```

Sebelum perbaikan (hasil build dengan ikon lama):

```text
LOLOS  konten (kode keluar 0)
LOLOS  seed (kering) (kode keluar 0)
LOLOS  uji seed (kode keluar 0)
GAGAL  hasil build (kode keluar 1)
LOLOS  tema (kode keluar 0)
rilis kandidat: 1 langkah gagal
```

Sesudah mengganti ikon dan membangun ulang:

```text
LOLOS  konten (kode keluar 0)
LOLOS  seed (kering) (kode keluar 0)
LOLOS  uji seed (kode keluar 0)
LOLOS  hasil build (kode keluar 0)
LOLOS  tema (kode keluar 0)
rilis kandidat: semua langkah lolos
```

**Aksesibilitas.** Repositori sudah memuat `@axe-core/playwright`. Skrip berikut (letakkan di `apps/storefront/`; ia alat lab, bukan bagian situs) membuka hasil build di Chrome dan menjalankan axe pada tiga halaman. Dibuka lewat `browser.newContext()`, bukan `browser.newPage()`: dengan versi terpasang, jalur kedua ditolak axe.

```ts
import { chromium } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { join } from "node:path";

const akar = process.argv[2] ?? "dist/client";
const peladen = Bun.serve({
  hostname: "localhost",
  port: 0,
  async fetch(req) {
    let jalur = new URL(req.url).pathname;
    if (jalur.endsWith("/")) jalur += "index.html";
    else if (!jalur.includes(".")) jalur += ".html";
    const berkas = Bun.file(join(akar, jalur));
    return (await berkas.exists()) ? new Response(berkas) : new Response("tidak ada", { status: 404 });
  },
});

const peramban = await chromium.launch({ executablePath: "/usr/bin/google-chrome", args: ["--no-sandbox"] });
const konteks = await peramban.newContext();
const halaman = await konteks.newPage();
let pelanggaran = 0;
for (const jalur of ["/", "/kontak", "/halaman/jam-layanan"]) {
  await halaman.goto(`http://localhost:${peladen.port}${jalur}`);
  const hasil = await new AxeBuilder({ page: halaman }).analyze();
  pelanggaran += hasil.violations.length;
  console.log(`${jalur}: ${hasil.violations.length} pelanggaran, ${hasil.passes.length} lolos, ${hasil.incomplete.length} perlu cek manual`);
  for (const v of hasil.violations) console.log(`  - ${v.id} (${v.impact}) x${v.nodes.length}: ${v.help}`);
  for (const i of hasil.incomplete) console.log(`  ? ${i.id} x${i.nodes.length}: periksa dengan mata`);
}
await peramban.close();
await peladen.stop(true);
process.exit(pelanggaran === 0 ? 0 : 1);
```

```text
/: 0 pelanggaran, 37 lolos, 1 perlu cek manual
  ? color-contrast x3: periksa dengan mata
/kontak: 0 pelanggaran, 38 lolos, 1 perlu cek manual
  ? color-contrast x3: periksa dengan mata
/halaman/jam-layanan: 0 pelanggaran, 37 lolos, 1 perlu cek manual
  ? color-contrast x3: periksa dengan mata
```

Nol pelanggaran, tetapi satu aturan tidak bisa diputuskan mesin: `color-contrast` untuk tiga elemen. Itu bukan lampu hijau; axe sendiri menyerahkannya ke mata manusia. Penyusun membuka halaman depan di Chrome tanpa kepala (lebar 1200): judul kolom pada kaki halaman (`Perpustakaan Komunitas Contoh`, `Informasi`, `Bantuan`) **tidak terlihat**, karena teks gelap di atas latar gelap (axe menyebut rasio 1:1). Penyebabnya terbaca di `global.css`: `.site-footer-column h2` memakai warna teks utama, sementara kaki halaman memakai latar kebalikan. Itu kode template, di luar lingkup kelompokmu, jadi dicatat sebagai T2 dan diusulkan ke guru atau pemilik template; tidak diperbaiki. Pemilik template sudah menerima laporannya (`awcms-one` #551, PR perbaikan #552, 2026-11-20); salinan sesudahnya tidak memuat T2.

Rilis kandidat dengan satu temuan terbuka tetap sah bila temuan itu **tertulis**, bisa direproduksi, dan jelas siapa yang memperbaikinya.

## Daftar periksa

- [ ] Prediksi (hasil gerbang dan pelanggaran) tertulis sebelum menjalankan.
- [ ] Fitur dibekukan: tiap perubahan menunjuk temuan.
- [ ] Temuan dalam lingkup diperbaiki dan diuji ulang dengan uji yang sama.
- [ ] Temuan di kode template dicatat sebagai usulan dengan langkah mereproduksi.
- [ ] Build dibuat setelah `bun test`; `kandidat.ts` dan axe dijalankan pada build itu.
- [ ] Hasil "perlu cek manual" dinilai dengan mata dan dicatat.
- [ ] Bila memakai AI: log pemakaian, tanpa data pribadi.

## Umpan balik sejawat

Tukar daftar temuan dengan kelompok lain; ulasan: **satu yang sudah baik, satu yang perlu diperbaiki, satu langkah berikutnya**. Ulangi satu perbaikan temanmu dan lihat apakah hasilnya sama; periksa apakah ada perubahan tanpa temuan.

## Latihan bercampur

1. `AI: boleh` (dari `b-xii1-m7`) Buat daftar tiga hal yang tidak ditangkap axe di situs ini dan cara memeriksanya dengan mata atau papan ketik.
2. `AI: tanpa AI` (dari `b-xii2-m2`) Peta situsmu berisi halaman yang kini tidak ada di build. Tulis satu pemeriksaan yang membandingkan peta dengan `sitemap-1.xml` hasil build.

## Ulang berjarak

Muncul lagi di `Ingat kembali` `b-xii2-m8` (pertanyaan 1) dan `b-xii2-m10` (pertanyaan 2). Pertanyaan 3: jalur B berakhir di `b-xii2-m14`, jadi ulangi sendiri delapan minggu lagi.

1. Mengapa favicon bawaan template menjadi temuan merek, dan di mana berkasnya?
2. Apa itu rilis kandidat, dan apa yang tidak dibuktikannya?
3. Sebutkan tiga alasan sebuah perbaikan di sprint terakhir dibatasi (fitur dibekukan).

## Kesalahan umum

- **Menganggap nol pelanggaran berarti aksesibel.** Axe juga memberi daftar "perlu cek manual".
- **Memperbaiki kode template di repositori turunan.** Di luar lingkup; catat sebagai usulan.
- **Menambah fitur di sprint terakhir.** Setiap tambahan perlu uji, dokumen, dan ulasan baru.
- **Menjalankan gerbang pada build lama.** Bangun ulang sesudah `bun test`.

## Cek mandiri

- [ ] Saya dapat memilah temuan menurut lingkup dan siapa yang memperbaiki.
- [ ] Saya dapat memperbaiki temuan dan menguji ulang.
- [ ] Saya dapat menjalankan axe dan menindaklanjuti "perlu cek manual".
- [ ] Saya dapat menyebut yang dibuktikan dan tidak dibuktikan rilis kandidat.
- [ ] Saya meninjau daftar temuan teman dengan temuan, alasan, dan saran.

## Kunci dan petunjuk

**Ingat kembali.** 1: agar orang lain dapat mengulang uji dan melihat hasil yang sama, dan agar klaim lolos punya dasar. 2: kode memilih putih atau hitam yang kontrasnya lebih tinggi, sehingga hampir selalu lolos 4,5:1; yang tetap perlu: warna itu terhadap latar halaman dan keterbacaan di semua lebar. 3: agar kegagalan yang muncul kemudian jelas berasal dari perubahanmu.

**Rencana sprint.** Prediksi: semua gerbang lolos dan nol pelanggaran, tetapi satu aturan "perlu cek manual" (hasil dijalankan penyusun; jangan terkejut bila jawabanmu hanya separuh benar). Perbaikan T1 hanya mengganti berkas ikon; tidak ada uji repositori yang menjaga isinya. Hasil gerbang dan axe dijalankan penyusun pada salinan lab per 2026-11-20.

**Latihan bercampur.** 1: contoh: makna `alt` (axe hanya memeriksa ada atau tidaknya), urutan fokus papan ketik, dan keterbacaan teks pada perbesaran 200 persen; tiap hal diperiksa dengan membuka halaman dan mengoperasikannya. 2: contoh: baca `sitemap-1.xml`, ambil tiap `<loc>`, ubah menjadi jalur, dan bandingkan dengan daftar `jalur` di peta; selisihnya adalah halaman yang hilang atau berlebih.

**Ulang berjarak.** 1: `template:init` hanya menulis ulang daftar berkas tertentu; ikon ada di `apps/storefront/public/favicon.svg` dan tidak termasuk daftar itu, sehingga merek lama bertahan sampai kamu menggantinya. 2: keadaan ketika semua pemeriksaan yang ditulis lolos dan tidak ada temuan terbuka yang diketahui; tidak dibuktikan bahwa situs benar untuk semua pengguna atau bahwa pemeriksaannya sudah cukup. 3: contoh: setiap tambahan menuntut uji ulang, perubahan dokumen dan cermin, dan ulasan; waktu sprint tinggal sedikit; dan kegagalan baru menyulitkan pencarian penyebab.

## Langkah berikutnya

Modul berikut: `b-xii2-m8` (sprint 3: dokumentasi, yaitu README, cermin terjemahan, dan catatan perubahan). Bacaan lanjut: Easy Checks di situs W3C WAI dan penjelasan WCAG 2.2 butir 1.4.3.
