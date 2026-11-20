## Untuk siapa modul ini

Modul ini untuk murid kelas XII jalur B (Web dengan JavaScript, TypeScript, dan Bun), minggu `B-XII1-M9` silabus v1.4.1: pengujian dan gerbang mutu. Prasyarat: modul `b-xii1-m8` (SEO dasar) dan `b-xi1-m7` (pengujian dengan `bun test`).

Modul ini karangan penyusun dan disetujui pemilik program pada 2026-11-20 (keputusan lewat dialog; catatan tinjauan menjadi tindak lanjut revisi). Butir `F-AP-c` (pemeliharaan dan kualitas kode) dipetakan silabus sebagai dipenuhi jalur ini; pemenuhan butir mengikuti pemetaan silabus, bukan status modul.

**Konteks semester ini.** Kelasmu mengkustomisasi profil `landing` dari `awcms-one` sebagai studi kasus: kamu hanya mengubah merek, konten, tema, SEO, dan dokumentasi, tanpa menyentuh backend. Fakta `awcms-one` dibaca dari repositori publiknya (`main`, 2026-11-20); yang tak bisa dicek ditandai `[belum terverifikasi]`.

Contoh dijalankan penyusun dengan Bun 1.4.4, Astro 7.4.13, dan TypeScript 6.0.3 per 2026-11 pada proyek karangan (warung kopi fiktif) dan salinan sementara repositori turunan `awcms-one`. Baca-dan-prediksi `AI: tanpa AI`; selain itu AI boleh dipakai dengan etika, tanpa data pribadi atau rahasia.

## Ingat kembali

Jawab dari ingatan dulu, baru cek di bagian kunci. Soal 1 dari `b-xii1-m8`, soal 2 dari `b-xii1-m6`, soal 3 dari `b-xii1-m1`.

1. Sebutkan empat hal yang diperiksa audit SEO dasar pada tiap halaman.
2. Berkas mana saja yang diubah untuk merek dan warna, dan di jalur mana konten contoh profil `landing` disimpan?
3. Apa beda `bun run build` dan `bun run dev` pada proyek Astro, dan folder mana yang diserahkan sebagai situs statis?

## Tujuan

Setelah modul ini kamu dapat:

- membedakan uji dan gerbang mutu, dan membaca kode keluar sebuah rangkaian pemeriksaan;
- menjalankan pemeriksaan tipe, uji unit, build, dan uji hasil build secara berurutan;
- membaca keluaran yang gagal, menemukan penyebabnya, dan memperbaiki sumbernya;
- menulis laporan pemeriksaan yang jujur (keluaran minggu ini).

## Prediksi dulu

Ini tugas baca-dan-prediksi, `AI: tanpa AI`. **Tebak dulu, tulis jawabanmu, baru jalankan.**

```ts
const langkah: [string, () => boolean][] = [
  ["tipe", () => true],
  ["uji unit", () => true],
  ["bangun", () => false],
  ["uji hasil build", () => true],
];

let kode = 0;
for (const [nama, jalan] of langkah) {
  const lolos = jalan();
  console.log(nama, lolos ? "lolos" : "GAGAL");
  if (!lolos) {
    kode = 1;
    break;
  }
}
console.log("kode keluar", kode);
```

1. Apa empat baris yang tercetak, dan langkah mana yang tidak pernah dijalankan?
2. Mengapa urutan langkah penting, dan mengapa rangkaian dihentikan pada kegagalan pertama?

## Contoh terselesaikan

Keluaran program tadi:

```text
tipe lolos
uji unit lolos
bangun GAGAL
kode keluar 1
```

Langkah "uji hasil build" tidak jalan: ia membaca hasil build yang gagal dibuat. Inilah **gerbang mutu**: rangkaian pemeriksaan otomatis berurutan yang harus lolos sebelum perubahan boleh digabung. Menurut dokumentasi Bun, `bun test` keluar dengan kode bukan 0 bila ada uji gagal; kode 0 berarti lolos, dan `&&` di shell hanya meneruskan bila langkah sebelumnya berkode 0.

**Gerbang di `awcms-one`.** Menurut README-nya, repositori itu menjalankan `bun test` (uji bawaan), empat skrip `audit:*` (dokumen, rilis, terjemahan, graf), dan pemeriksaan tipe `bun run check`. CI tidak memakai GitHub Actions (ADR-0021): semuanya berupa langkah `local-ci/*` yang dijalankan di mesin kontributor atau server tepercaya, dan seluruh dua belas konteksnya wajib lolos di cabang `main`. Suite `apps/cms` (PostgreSQL) dan uji Playwright tidak dijalankan muridmu `[belum terverifikasi]`.

Dijalankan penyusun pada salinan sementara repositori turunan hasil `template:init --profil landing` (berasal dari `main` per 2026-11-20): `bun test` melaporkan 1820 lolos, 3 dilewati, 0 gagal pada 143 berkas dalam sekitar 98 detik; `bun run check` melaporkan 0 galat, 0 peringatan, 41 petunjuk; dan `bun run audit:dokumen`, `audit:rilis`, `audit:translation` lolos. Waktu di komputer labmu berbeda.

**Gerbang untuk proyek kecil.** Di proyek Astro karangan, rangkaiannya ditulis di `package.json`:

```json
{
  "scripts": {
    "periksa-tipe": "astro check",
    "uji": "bun test ./src",
    "bangun": "astro build",
    "uji-bangun": "bun test ./tests",
    "gerbang": "bun run periksa-tipe && bun run uji && bun run bangun && bun run uji-bangun"
  }
}
```

Uji unit (`src/lib/head.test.ts`) memeriksa fungsi judul, deskripsi, dan URL dari modul `b-xii1-m8` tanpa membangun situs. Uji hasil build (`tests/bangun.test.ts`) membaca `dist` dan memakai audit SEO minggu lalu. Pada percobaan pertama, `bun run gerbang` gagal di langkah terakhir (keluaran dipersingkat):

```text
$ bun test ./tests

tests/bangun.test.ts:
error: expect(received).toEqual(expected)

- []
+ [
+   "deskripsi sama di index.html, kontak/index.html: "Kopi dan roti buatan sendiri di kota fiktif Contohan."",
+ ]

 2 pass
 1 fail
error: script "uji-bangun" exited with code 1
error: script "gerbang" exited with code 1
```

Cara membacanya: berkas dan nama uji (`tests/bangun.test.ts`, "tidak ada dua halaman berdeskripsi sama"), nilai diharapkan (daftar kosong) dan diterima (satu deskripsi kembar), lalu penyebab: halaman Kontak tidak punya deskripsi sendiri. Perbaikannya ada di sumber (beri deskripsi pada halaman Kontak), bukan di ujinya. Setelah itu seluruh rangkaian berkode keluar 0: 0 galat tipe, 8 uji unit lolos, build selesai, 3 uji hasil build lolos.

Pada percobaan yang lebih awal, langkah pertama `astro check` gagal karena `Cannot find name 'Bun'` dan `Cannot find module 'bun:test'`: tipe Bun belum terpasang. Pemecahannya `bun add -d @types/bun` dan menambahkan `"types": ["bun"]` pada `compilerOptions` di `tsconfig.json`. Pada percobaan itu `astro check` juga menolak TypeScript 7.0 dan meminta TypeScript 6, sehingga proyek ini memakai 6.0.3 (`storefront` di `awcms-one` memakai `^6.0.3`).

**Laporan pemeriksaan.** Keluaran minggu ini adalah laporan pendek, satu baris per pemeriksaan:

| Perintah | Hasil | Temuan | Tindakan |
| --- | --- | --- | --- |
| `bun run periksa-tipe` | lolos | tidak ada | tidak ada |
| `bun run uji-bangun` | gagal | deskripsi Beranda dan Kontak kembar | menambah deskripsi halaman Kontak |

**Batas gerbang.** Gerbang hijau berarti semua pemeriksaan yang ditulis lolos, bukan bahwa situs benar untuk semua masukan; uji yang tidak pernah bisa gagal (misalnya `expect(true).toBe(true)`) membuat hijau tanpa arti.

## Contoh setengah jadi

Lengkapi uji ini (kunci di bawah):

```ts setengah-jadi
import { expect, test } from "bun:test";
import { urlMutlak } from "./head";

test("jalur tanpa garis miring awal tetap mutlak", () => {
  expect(urlMutlak("https://situs.example", "____")).toBe("https://situs.example/____");
});

test("situs di dalam folder", () => {
  expect(urlMutlak("https://situs.example/info/", "tentang")).____("https://situs.example/info/tentang");
});
```

## Soal Parsons

Susun baris berikut menjadi berkas uji yang benar (kunci di bawah). Satu baris tidak terpakai.

```text
});
import { ringkasDeskripsi } from "./head";
expect(ringkasDeskripsi(undefined, "cadangan")).toBe("tidak ada");
test("deskripsi kosong memakai cadangan", () => {
import { expect, test } from "bun:test";
  expect(ringkasDeskripsi(undefined, "cadangan")).toBe("cadangan");
```

## Latihan

1. `AI: boleh` Tulis dua uji `bun test` untuk `judulLengkap` (judul halaman biasa dan judul yang sama dengan nama situs) dan jalankan.
2. `AI: tanpa AI` Bacalah keluaran gagal di atas. Sebutkan berkas dan nama uji yang gagal, nilai yang diharapkan dan diterima, dan apakah yang harus diperbaiki kode atau ujinya, beserta alasannya.
3. `AI: boleh` **Perbaiki satu kegagalan.** Pada salinan proyek latihan yang disiapkan gurumu, jalankan gerbangnya, temukan kegagalan pertama, perbaiki sumbernya, dan jalankan ulang sampai kode keluar 0. Catat keluaran sebelum dan sesudah.
4. `AI: tanpa AI` Ubah sementara `BATAS_DESKRIPSI` dari 160 menjadi 60 di `head.ts` dan jalankan `bun test ./src`. Uji mana yang gagal? Apa artinya bila tidak ada uji yang gagal?
5. `AI: boleh` (opsional) Catatan pemakaian AI: alat, tujuan, garis besar perintah, bagian yang dipakai, cara memeriksa, dan konfirmasi tanpa data pribadi atau rahasia.

## Latihan bercampur

1. `AI: boleh` (dari `b-xii1-m8`) Mengapa audit SEO atas hasil build dijalankan setelah `astro build`, bukan sebelumnya? Apa yang terjadi bila rangkaian memanggilnya lebih dulu?
2. `AI: boleh` (dari `b-xi1-m7`) Semua uji lolos tetapi halaman Kontak masih salah menulis nama situs. Apa yang tidak dibuktikan uji yang lolos itu, dan uji apa yang kamu tambahkan?

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `b-xii1-m10` (pertanyaan 1), sekitar tiga minggu lagi di `b-xii1-m12` (pertanyaan 2), dan sekitar delapan minggu lagi di semester berikutnya, modul `b-xii2-m3` (pertanyaan 3). Jawab sekarang lalu simpan.

1. Mengapa rangkaian pemeriksaan memakai `&&`, dan kode keluar berapa yang menandakan lolos?
2. Apa beda uji unit pada sebuah fungsi dengan uji atas hasil build?
3. Apa yang dibuktikan dan tidak dibuktikan oleh gerbang yang hijau?

## Kesalahan umum

- **Mengubah uji agar lolos.** Bila hasil yang diharapkan benar, perbaiki sumbernya.
- **Menjalankan `bun test tests`.** Menurut dokumentasi `awcms-one`, argumen `bun test` adalah penyaring jalur, bukan folder; pakai `./tests` untuk folder.
- **Menguji hasil build tanpa build ulang.** Berkas `dist` yang basi menghasilkan hijau palsu.
- **Menganggap hijau berarti benar.** Gerbang hanya memeriksa yang ditulis.
- **Versi alat tidak cocok.** `astro check` menolak TypeScript 7.0; baca pesan galatnya sebelum menebak.

## Cek mandiri

- [ ] Saya dapat membedakan uji dan gerbang mutu.
- [ ] Saya dapat membaca kode keluar dan menjelaskan fungsi `&&`.
- [ ] Saya dapat menjalankan pemeriksaan tipe, uji, dan build secara berurutan.
- [ ] Saya dapat menemukan penyebab kegagalan dari keluaran dan memperbaiki sumbernya.
- [ ] Saya dapat menulis laporan pemeriksaan yang jujur.

## Kunci dan petunjuk

**Ingat kembali.** 1: judul unik, deskripsi ada dan tidak kembar, kanonik mutlak `https`, satu `h1`, dan `alt` pada gambar (empat dari lima sudah cukup). 2: merek dan warna: `apps/storefront/src/config/site.ts` (ditulis `template:init`) dan bawaan `apps/storefront/.env.example`; konten contoh: `tools/seed-data/profil/landing/pages.json` dan `site-profile.json`. 3: `dev` menjalankan server pengembangan di `localhost` dengan skrip alat pengembang; `build` menulis berkas statis ke `dist/`, dan `dist/` itulah yang diserahkan.

**Prediksi dulu.** 1: empat baris seperti di bagian contoh; langkah "uji hasil build" tidak dijalankan. 2: langkah belakang bergantung pada langkah depan (uji hasil build butuh hasil build), dan melanjutkan setelah gagal hanya menumpuk galat yang menyesatkan.

**Contoh setengah jadi.** Kunci, dijalankan penyusun sebagai `bun test` pada berkas sementara di proyek contoh:

```ts
import { expect, test } from "bun:test";
import { urlMutlak } from "./head";

test("jalur tanpa garis miring awal tetap mutlak", () => {
  expect(urlMutlak("https://situs.example", "tentang")).toBe("https://situs.example/tentang");
});

test("situs di dalam folder", () => {
  expect(urlMutlak("https://situs.example/info/", "tentang")).toBe("https://situs.example/info/tentang");
});
```

```text
bun test v1.4.4 (38afee6c8)

 2 pass
 0 fail
 2 expect() calls
Ran 2 tests across 1 file. [5.00ms]
```

**Soal Parsons.** Urutan: `import { expect, test } from "bun:test";`, `import { ringkasDeskripsi } from "./head";`, `test("deskripsi kosong memakai cadangan", () => {`, `expect(...).toBe("cadangan");`, `});`. Baris `toBe("tidak ada")` tidak terpakai: ia menguji nilai yang salah.

**Latihan.** 1: contoh uji ada di `src/lib/head.test.ts` proyek contoh (dua uji pertamanya); keluaran `bun test` berisi jumlah lolos dan gagal. 2: berkas `tests/bangun.test.ts`, uji "tidak ada dua halaman berdeskripsi sama"; diharapkan `[]`, diterima satu deskripsi kembar; yang diperbaiki kodenya, yaitu halaman Kontak yang kehilangan deskripsi, karena uji menyatakan kebutuhan yang sah. 3: tidak ada kunci tunggal; tulis perintah, kegagalan pertama, perbaikan, dan keluaran sesudahnya. 4: dengan batas 60, uji "deskripsi panjang dipotong pada batas" gagal (diterima panjang 60, diharapkan 160), tujuh uji lain lolos, dijalankan penyusun. Bila tidak ada uji gagal, berarti tidak ada uji yang menjaga nilai itu: gerbang hijau tetapi batas bisa berubah tanpa ketahuan. 5: tidak ada kunci tunggal.

**Latihan bercampur.** 1: audit membaca `dist`, yang baru ada setelah build; dipanggil sebelumnya, ia membaca berkas lama atau gagal karena folder tidak ada, dan hasilnya menyesatkan. 2: uji yang lolos hanya membuktikan skenario yang ditulis; tambahkan uji yang memeriksa judul halaman Kontak pada hasil build (`Kontak — Warung Kopi Contoh`).

**Ulang berjarak.** 1: `&&` hanya melanjutkan bila langkah sebelumnya berkode keluar 0; kode 0 berarti lolos, selain 0 gagal. 2: uji unit memeriksa fungsi tanpa membangun situs dan cepat; uji hasil build memeriksa berkas yang benar-benar dihasilkan. 3: dibuktikan bahwa semua pemeriksaan yang ditulis lolos; tidak dibuktikan bahwa situs benar untuk semua masukan atau bahwa pemeriksaannya sendiri sudah cukup.

## Langkah berikutnya

Modul berikut: `b-xii1-m10` (rahasia dan konfigurasi), yang menambahkan pemeriksaan rahasia ke rangkaian ini. Modul terkait: `b-xi1-m11` (kualitas kode). Bacaan lanjut: dokumentasi Bun tentang `bun test` dan halaman Astro tentang `astro check`, serta bagian "Gates" di README `awcms-one`.
