## Untuk siapa modul ini

Modul ini untuk murid kelas XII jalur B (Web dengan JavaScript, TypeScript, dan Bun), minggu `B-XII2-M4` silabus v1.4.1: sprint 1, tampilan (merek dan tema). Dikerjakan berkelompok dua sampai tiga orang. Prasyarat: modul `b-xii2-m3` (konten tahap 1).

Modul ini karangan penyusun dan disetujui pemilik program pada 2026-11-20 (keputusan lewat dialog; catatan tinjauan menjadi tindak lanjut revisi). Silabus memetakan butir `F-BK-a` dan `F-LD-f` pada minggu ini; pemenuhan butir mengikuti pemetaan silabus, bukan status modul. Keluaran minggu ini: tampilan tahap 1.

**Batas modul ini.** Kamu mengubah **merek dan tema** pada repositori turunan lab; backend tidak disentuh. Contoh dijalankan dengan Bun 1.4.4 per 2026-11 pada salinan `awcms-one` 0.20.0 (Astro 7.4.12), tanpa Docker dan CMS. Semua nama dan kontak karangan. Tugas baca-dan-prediksi `AI: tanpa AI`; selain itu AI generatif boleh dipakai dengan etika dan dicatat, tanpa data pribadi atau rahasia.

## Ingat kembali

Jawab dari ingatan dulu, baru cek di bagian kunci. Soal 1 dari `b-xii2-m3`, soal 2 dari `b-xii2-m1`, soal 3 dari `b-xii1-m10`.

1. Pemeriksaan apa yang dijalankan pada konten sebelum build, dan berapa halaman paling banyak menurut uji repositori?
2. Mengapa kebutuhan "harus" yang di luar lingkup menjadi temuan, dan apa pilihanmu terhadapnya?
3. Apa yang kamu periksa pada sebuah permintaan ke asisten AI sebelum mengirimnya?

## Tujuan

Setelah modul ini kamu dapat:

- menerapkan nama dan warna merek dengan `template:init` dan membaca hasilnya di berkas build;
- memeriksa pasangan warna dengan angka dan menyebut yang tidak diperiksa angka itu;
- membuka hasil build di dua lebar layar dan mencatat pengamatan;
- membedakan pengamatan dari bukti.

## Rencana sprint

Sprint ini menerapkan palet dari `b-xii2-m2`. Warna berasal dari `DEFAULT_THEME_COLORS` di `site.ts`, ditulis `template:init`, kecuali CMS punya tema. Jalankan selalu `--dry-run` lebih dulu. Misalkan kelompok lain mencoba primer muda `#2dd4bf`:

```text
Rewrite:
  - package.json — unchanged
  - apps/storefront/src/config/site.ts

Remove:
  (nothing left to remove)

Reset (one-time):
  (already run once — CHANGELOG.md, .changesets/, and package.json's version are left as this repo's own history)
```

Hanya `site.ts` berubah. Pada putaran sungguhan, `template:init` menjalankan seluruh `bun test` (sekitar satu menit) dan berhenti dengan `template:init: bun test failed` bila ada uji gagal; begitulah penyusun pertama kali mengetahui kontrak kontak di `b-xii2-m3`.

Tulis prediksimu: bila primer menjadi `#2dd4bf`, apakah teks pada tombol tetap terbaca? Fungsi `contrastingForeground` memilih putih atau hitam, mana yang kontrasnya lebih tinggi (dijalankan penyusun: hitam untuk `#2dd4bf`, putih untuk `#0f766e`), sehingga teks tombol hampir selalu lolos 4,5:1; kontras tertinggi dari keduanya tidak pernah di bawah sekitar 4,58. Yang tidak dijamin adalah **warna itu sendiri di atas latar halaman**.

Setelah build terhadap tiruan uji (cara pada `b-xii2-m3`), `apps/storefront/dist/client/theme-tokens.css` berisi:

```text
:root {
  --color-primary: #0f766e;
  --color-primary-foreground: #ffffff;
  --color-secondary: #052522;
  --color-secondary-foreground: #ffffff;
  --color-accent: #f59e0b;
  --color-accent-foreground: #000000;
}
```

Skrip berikut membaca berkas itu dengan `contrastRatio` milik repositori (`apps/storefront/src/lib/warna.ts`). Ia menolak pasangan teks di bawah 4,5:1 dan primer di atas putih di bawah 3:1, ambang komponen antarmuka (WCAG 2.2, 1.4.11).

```ts
import { readFileSync } from "node:fs";
import { contrastRatio } from "./apps/storefront/src/lib/warna";

const berkas = process.argv[2] ?? "apps/storefront/dist/client/theme-tokens.css";
const css = readFileSync(berkas, "utf8");
const nilai = (nama: string) => css.match(new RegExp(`--color-${nama}:\\s*(#[0-9a-fA-F]{6})`))?.[1];

const temuan: string[] = [];
for (const warna of ["primary", "secondary", "accent"]) {
  const latar = nilai(warna);
  const teks = nilai(`${warna}-foreground`);
  if (!latar || !teks) { temuan.push(`${warna}: token tidak lengkap`); continue; }
  const rasio = contrastRatio(latar, teks);
  console.log(`${warna} ${latar} dengan teks ${teks}: ${rasio.toFixed(2)}:1`);
  if (rasio < 4.5) temuan.push(`${warna}: teks di atas warna ${rasio.toFixed(2)}:1 (<4.5)`);
}
const primer = nilai("primary");
if (primer) {
  const tepi = contrastRatio(primer, "#ffffff");
  console.log(`primer terhadap putih: ${tepi.toFixed(2)}:1`);
  if (tepi < 3) temuan.push(`primer terhadap latar putih ${tepi.toFixed(2)}:1 (<3, tombol sulit dibedakan dari latar)`);
}
for (const t of temuan) console.log("TEMUAN " + t);
console.log(temuan.length === 0 ? "tema lolos" : `${temuan.length} temuan`);
process.exit(temuan.length === 0 ? 0 : 1);
```

Pada berkas build `#0f766e`:

```text
primary #0f766e dengan teks #ffffff: 5.47:1
secondary #052522 dengan teks #ffffff: 16.23:1
accent #f59e0b dengan teks #000000: 9.78:1
primer terhadap putih: 5.47:1
tema lolos
```

Pada salinan yang diubah tangan menjadi `#2dd4bf` dengan teks hitam:

```text
primary #2dd4bf dengan teks #000000: 11.28:1
secondary #052522 dengan teks #ffffff: 16.23:1
accent #f59e0b dengan teks #000000: 9.78:1
primer terhadap putih: 1.86:1
TEMUAN primer terhadap latar putih 1.86:1 (<3, tombol sulit dibedakan dari latar)
1 temuan
```

Teksnya terbaca (11,28:1), tetapi tombol hampir menyatu dengan latar putih (1,86:1): bukan galat build, melainkan keputusan desain yang baru diketahui karena diukur.

**Pemeriksaan dengan mata.** Penyusun membuka hasil build lewat peladen statis lokal di Chrome tanpa kepala (`google-chrome --headless=new --window-size=390,900 --screenshot=beranda.png URL`, lalu lebar 1200) dan melihat: pada 390 piksel menu menjadi tombol, judul dan tagline turun beberapa baris, dan tombol aksesibilitas bundar di kiri bawah menutupi sebagian kartu yang lewat di bawahnya; pada 1200 piksel navigasi sejajar. Itu pengamatan, bukan bukti: peladen statis bukan peladen produksi dan satu peramban bukan semua peramban.

## Daftar periksa

- [ ] Prediksi (teks tombol terbaca atau tidak) tertulis sebelum skrip dijalankan.
- [ ] `--dry-run` dijalankan lebih dulu.
- [ ] Warna merek tercatat beserta rasionya; pasangan teks minimal 4,5:1, primer terhadap putih minimal 3:1.
- [ ] Hasil build dibuka pada dua lebar (sekitar 390 dan 1200) dan pengamatan dicatat.
- [ ] Bila memakai AI: log pemakaian, tanpa data pribadi.

## Umpan balik sejawat

Tukar catatan tampilan dengan kelompok lain; ulasan: **satu yang sudah baik, satu yang perlu diperbaiki, satu langkah berikutnya**. Periksa: apakah kontras dihitung dari warna yang dipakai dan apakah pengamatan dibedakan dari bukti.

## Latihan bercampur

1. `AI: boleh` (dari `b-xii1-m6`) Tambahkan `--warna-aksen` pada perintah `template:init` dan jelaskan berkas apa yang berubah (`--dry-run` dulu).
2. `AI: tanpa AI` (dari `b-xii2-m2`) Skrip kontras di `b-xii2-m2` dan `periksa-tema.ts` menghitung rasio dengan dua kode berbeda. Apa risikonya, dan bagaimana kamu memastikan keduanya sepakat?

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `b-xii2-m5` (pertanyaan 1), sekitar tiga minggu lagi di `b-xii2-m7` (pertanyaan 2), dan sekitar delapan minggu lagi di `b-xii2-m12` (pertanyaan 3). Jawab sekarang lalu simpan.

1. Dari mana warna tema berasal pada build tanpa CMS, dan perintah apa mengubahnya?
2. Mengapa teks di atas tombol berwarna primer dipilih otomatis, dan pemeriksaan apa yang tetap perlu?
3. Bukti apa yang kamu tunjukkan saat mempresentasikan tampilan, selain tangkapan layar?

## Kesalahan umum

- **Menyimpulkan "kontras aman" dari teks tombol saja.** Warna primer terhadap latar juga perlu diukur.
- **Mengedit `theme-tokens.css` di `dist/`.** Ia ditulis ulang tiap build.
- **Menilai dari satu lebar saja.**
- **Melewati `--dry-run`.** Perintah yang menulis ulang banyak berkas perlu dilihat dulu.

## Cek mandiri

- [ ] Saya dapat menerapkan warna merek dan membaca `theme-tokens.css`.
- [ ] Saya dapat memeriksa pasangan warna dan menyebut apa yang tidak dijamin kode.
- [ ] Saya dapat membedakan pengamatan dari bukti.
- [ ] Saya meninjau catatan teman dengan temuan, alasan, dan saran.

## Kunci dan petunjuk

**Ingat kembali.** 1: skrip pemeriksa konten (bentuk, panjang, sisa template, surel, telepon), uji `tests/seed-profil.test.mjs`, dan `--dry-run`; paling banyak empat halaman. 2: kebutuhan wajib yang mustahil dipenuhi membuat proyek gagal sejak awal; pilihanmu: turunkan prioritasnya atau keluarkan dari lingkup, dan tulis alasannya. 3: apakah memuat nilai rahasia, kata sandi, token, atau data pribadi; bila ada, ganti dengan penunjuk dan kirim hanya pesan galatnya.

**Rencana sprint.** Prediksi: teks tombol tetap terbaca (hitam di atas `#2dd4bf`, 11,28:1); yang bermasalah adalah primer terhadap putih (1,86:1). Semua keluaran dijalankan penyusun; skenario `#2dd4bf` hanya disimulasikan dengan mengubah salinan `theme-tokens.css` (penyusun tidak menjalankan `template:init` sungguhan dengan warna itu). Ambang 3:1 dikutip dari penjelasan WCAG 2.2 butir 1.4.11 yang dibuka penyusun.

**Latihan bercampur.** 1: contoh: `--warna-aksen "#b45309"`; `--dry-run` menunjukkan `site.ts` berubah (nilai aksen) dan teks `accent-foreground` dihitung ulang saat build. 2: dua implementasi bisa berbeda pembulatan atau ambang; cara memastikan: jalankan keduanya pada pasangan yang sama (misalnya `#0f766e` dan putih) dan bandingkan sampai dua desimal, atau pakai fungsi repositori di keduanya.

**Ulang berjarak.** 1: dari `DEFAULT_THEME_COLORS` di `site.ts` (ditulis `template:init`); diubah dengan `--warna-primer` (dan `--warna-sekunder`, `--warna-aksen`). 2: kode memilih putih atau hitam yang kontrasnya lebih tinggi, sehingga hampir selalu lolos 4,5:1; yang tetap perlu: warna itu terhadap latar halaman dan keterbacaan di semua lebar. 3: contoh: rasio kontras yang dihitung, hasil `periksa-tema`, dan tangkapan layar di dua lebar dengan catatan apa yang diperiksa.

## Langkah berikutnya

Modul berikut: `b-xii2-m5` (sprint 2: fitur sesuai profil `landing`). Bacaan lanjut: penjelasan WCAG 2.2 butir 1.4.3 dan 1.4.11 di situs W3C, dan `docs/ui-ux.md` pada `https://github.com/ahliweb/awcms-one` (ada di repositori; isinya belum dibaca penyusun).
