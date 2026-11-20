## Untuk siapa modul ini

Modul ini untuk murid kelas XII jalur B (Web dengan JavaScript, TypeScript, dan Bun), minggu `B-XII2-M6` silabus v1.4.1: sprint 2, pengujian. Dikerjakan berkelompok dua sampai tiga orang. Prasyarat: modul `b-xii2-m5` (fitur tahap 2).

Modul ini karangan penyusun dan disetujui pemilik program pada 2026-11-20 (keputusan lewat dialog; catatan tinjauan menjadi tindak lanjut revisi). Silabus memetakan butir `F-BK-a` dan `F-LD-f` pada minggu ini; pemenuhan butir mengikuti pemetaan silabus, bukan status modul. Keluaran minggu ini: laporan uji.

**Batas modul ini.** Kamu menguji hasil kustomisasi (merek, konten, tema, SEO, dokumentasi) pada repositori turunan lab; backend tidak disentuh dan tidak diuji. Dijalankan dengan Bun 1.4.4 per 2026-11 pada `awcms-one` 0.20.0, dibangun terhadap tiruan uji tanpa CMS. Semua nama dan kontak karangan. AI boleh dipakai dengan etika dan dicatat, tanpa data pribadi atau rahasia.

## Ingat kembali

Jawab dari ingatan dulu, baru cek di bagian kunci. Soal 1 dari `b-xii2-m5`, soal 2 dari `b-xii2-m3`, soal 3 dari `b-xii1-m12`.

1. Mengapa formulir kontak di situsmu tidak mengirim atau menyimpan isian, dan apa yang dibutuhkan produk nyata sebelum menerima pesan?
2. Mengapa surel contoh di berkas seed memakai `example.org`, bukan domain karanganmu?
3. Bagaimana kamu menanggapi komentar ulasan yang tidak kamu setujui?

## Tujuan

Setelah modul ini kamu dapat:

- menulis uji manual yang menunjuk kebutuhan, memuat langkah, harapan, hasil, dan bukti;
- menjalankan pemeriksa hasil build dan membaca temuannya;
- menulis laporan temuan yang bisa direproduksi orang lain;
- menyatakan apa yang dibuktikan dan tidak dibuktikan oleh uji otomatis dan uji manual (keluaran minggu ini: laporan uji).

## Rencana sprint

Sprint ini menguji hasil sprint 1 dan 2 terhadap dokumen kebutuhan `b-xii2-m1`. Tulis **sebelum** menguji: berapa uji yang kamu kira gagal? Uji manual terdiri dari langkah, harapan, hasil, dan bukti; "OK" tanpa bukti bukan hasil.

Uji otomatis repositori sudah ada: `bun test` di akar (1820 lolos, 3 dilewati, 0 gagal pada salinan lab, sekitar 70 detik). Satu hal yang penyusun alami: uji pembangunan di dalamnya **menghapus dan membangun ulang `dist/` memakai data tiruan uji**. Bila kamu menjalankan `bun test` sesudah membangun situs latihanmu, hasil build-mu hilang, dan pemeriksa di bawah akan menilai data tiruan itu. Bangun ulang situsmu sesudah `bun test`.

Uji otomatis tidak tahu kebutuhanmu, jadi kelompok menulis pemeriksa untuk yang ia janjikan: judul, deskripsi, satu `h1`, `lang`, kanonik, `alt`, tautan internal yang hidup, dan sisa merek template. Lima aturan pertama (judul, deskripsi, kanonik, satu `h1`, `alt`) dikenal dari `b-xii1-m8`; yang baru adalah tautan internal dan sisa merek.

```ts
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const akar = process.argv[2] ?? "apps/storefront/dist/client";

function berkasDi(dir: string, akhiran: string[]): string[] {
  return readdirSync(dir).flatMap((nama) => {
    const p = join(dir, nama);
    return statSync(p).isDirectory() ? berkasDi(p, akhiran) : akhiran.some((a) => p.endsWith(a)) ? [p] : [];
  });
}

const ambil = (html: string, pola: RegExp) => html.match(pola)?.[1];
const temuan: string[] = [];
const berkas = berkasDi(akar, [".html"]).sort();

for (const f of berkas) {
  const html = readFileSync(f, "utf8");
  const nama = f.slice(akar.length);
  if (nama === "/404.html") continue;
  const judul = ambil(html, /<title>([^<]*)<\/title>/);
  const deskripsi = ambil(html, /<meta name="description" content="([^"]*)"/);
  if (!judul) temuan.push(`${nama}: tanpa <title>`);
  else if (judul.length > 60) temuan.push(`${nama}: judul ${judul.length} karakter`);
  if (!deskripsi) temuan.push(`${nama}: tanpa meta description`);
  const h1 = (html.match(/<h1[\s>]/g) ?? []).length;
  if (h1 !== 1) temuan.push(`${nama}: ${h1} elemen h1 (harus 1)`);
  if (!/<html[^>]*\slang="/.test(html)) temuan.push(`${nama}: <html> tanpa lang`);
  if (!/<link rel="canonical"/.test(html)) temuan.push(`${nama}: tanpa canonical`);
  for (const img of html.match(/<img\b[^>]*>/g) ?? []) {
    if (!/\salt=/.test(img)) temuan.push(`${nama}: gambar tanpa alt`);
  }
  for (const [, href] of html.matchAll(/<a [^>]*href="(\/[^"#?]*)"/g)) {
    const tujuan = href === "/" ? "/index.html" : existsSync(join(akar, href + ".html")) ? href + ".html" : href;
    if (!existsSync(join(akar, tujuan))) temuan.push(`${nama}: tautan ke ${href} tidak ada di hasil build`);
  }
}

const sisaMerek = ["BjekMart", "Sekolah Contoh", "PT Contoh Karya"];
for (const f of berkasDi(akar, [".html", ".svg", ".css", ".json", ".webmanifest", ".txt", ".xml"])) {
  const isi = readFileSync(f, "utf8");
  for (const sisa of sisaMerek) {
    if (isi.includes(sisa)) temuan.push(`${f.slice(akar.length)}: masih memuat "${sisa}"`);
  }
}

console.log(`${berkas.length} berkas html diperiksa`);
for (const t of temuan) console.log("TEMUAN " + t);
console.log(temuan.length === 0 ? "bersih" : `${temuan.length} temuan`);
process.exit(temuan.length === 0 ? 0 : 1);
```

Prediksimu: berapa temuan pada hasil build kelompok kita? Dijalankan dari akar repositori (`bun run periksa-dist.ts`):

```text
7 berkas html diperiksa
TEMUAN /favicon.svg: masih memuat "BjekMart"
1 temuan
```

Satu temuan: `favicon.svg` masih berlabel merek template. Penyebabnya: `template:init` hanya menulis ulang daftar berkas tertentu; dokumentasinya menyebut isi `apps/storefront/**` lainnya diwarisi apa adanya. Uji repositori tidak menangkapnya karena tidak tahu merekmu.

Uji manual direkam dalam data. Skrip berikut merangkum tabel uji dan menandai baris cacat: hasil tanpa bukti, dan gagal tanpa temuan.

```ts
type Hasil = "lulus" | "gagal" | "belum";
type Uji = { id: string; kebutuhan: string; langkah: string; harapan: string; hasil: Hasil; bukti: string; temuan?: string };

const uji: Uji[] = [
  { id: "U1", kebutuhan: "K1", langkah: "buka /, baca bawah judul", harapan: "jam buka terbaca", hasil: "lulus", bukti: "tagline memuat Senin-Jumat 09.00-16.00" },
  { id: "U2", kebutuhan: "K2", langkah: "klik Peminjaman buku", harapan: "syarat dan langkah tampil", hasil: "lulus", bukti: "halaman /halaman/peminjaman-buku" },
  { id: "U3", kebutuhan: "K3", langkah: "buka /kontak di lebar 390 px", harapan: "alamat, telepon, surel terbaca", hasil: "lulus", bukti: "tangkapan layar" },
  { id: "U4", kebutuhan: "K5", langkah: "ubah jam di pages.json, bangun ulang", harapan: "jam baru tampil", hasil: "belum", bukti: "" },
  { id: "U5", kebutuhan: "-", langkah: "periksa-dist.ts", harapan: "tanpa temuan", hasil: "gagal", bukti: "favicon.svg memuat BjekMart", temuan: "T1" },
  { id: "U6", kebutuhan: "-", langkah: "gagal tanpa bukti contoh", harapan: "-", hasil: "gagal", bukti: "" },
];

const hitung = { lulus: 0, gagal: 0, belum: 0 };
const masalah: string[] = [];
for (const u of uji) {
  hitung[u.hasil]++;
  if (u.hasil !== "belum" && u.bukti.trim() === "") masalah.push(`${u.id}: hasil ${u.hasil} tanpa bukti`);
  if (u.hasil === "gagal" && !u.temuan) masalah.push(`${u.id}: gagal tetapi belum ada temuan`);
}
console.log(`lulus ${hitung.lulus}, gagal ${hitung.gagal}, belum ${hitung.belum}`);
for (const m of masalah) console.log("CATATAN " + m);
```

```text
lulus 3, gagal 2, belum 1
CATATAN U6: hasil gagal tanpa bukti
CATATAN U6: gagal tetapi belum ada temuan
```

Baris `U6` sengaja salah: gagal tanpa bukti dan tanpa temuan, jadi tak ada yang bisa memperbaikinya. Laporan temuan memuat judul, langkah mereproduksi, harapan, kenyataan, dampak, dan dugaan penyebab. Contoh T1: "Ikon situs masih berlabel BjekMart. Langkah: buka `/favicon.svg`. Harapan: logo perpustakaan. Kenyataan: huruf B berlatar hijau dengan label merek template. Dampak: merek ganda pada tab peramban. Dugaan penyebab: berkas inheritan di `apps/storefront/public/`."

## Daftar periksa

- [ ] Perkiraan jumlah uji gagal tertulis sebelum menguji.
- [ ] Tiap uji menunjuk kebutuhan K (atau diberi `-` dengan alasan), punya langkah, harapan, hasil, dan bukti.
- [ ] `bun test` dijalankan, lalu situs dibangun ulang sebelum `periksa-dist.ts`.
- [ ] Hasil build dibuka dengan papan ketik; `Tab` pertama menuju "Lewati ke konten utama".
- [ ] Setiap uji gagal punya temuan yang bisa direproduksi.
- [ ] Bila memakai AI: log pemakaian, tanpa data pribadi.

## Umpan balik sejawat

Tukar laporan uji dengan kelompok lain dan ulangi dua uji mereka sesuai langkah tertulis. Beri ulasan dengan format: **satu yang sudah baik, satu yang perlu diperbaiki, satu langkah berikutnya**. Periksa: apakah langkahnya cukup agar orang lain mendapat hasil yang sama. Bila tidak setuju pada sebuah temuan, tanyakan alasannya dan tunjukkan buktimu.

## Latihan bercampur

1. `AI: boleh` (dari `b-xii1-m9`) Tulis rangkaian perintah yang menjalankan pemeriksa konten, uji seed, build, dan `periksa-dist.ts` dengan `&&`. Mengapa urutannya begitu?
2. `AI: tanpa AI` (dari `b-xii2-m5`) Tulis tiga uji manual untuk halaman kontak (satu untuk telepon, satu untuk FAQ, satu untuk tombol surel) dengan langkah dan harapan, tanpa menjalankannya dulu.

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `b-xii2-m7` (pertanyaan 1), sekitar tiga minggu lagi di `b-xii2-m9` (pertanyaan 2), dan sekitar delapan minggu lagi di `b-xii2-m14` (pertanyaan 3). Jawab sekarang lalu simpan.

1. Mengapa hasil uji manual harus mencatat langkah dan bukti nyata, bukan hanya "OK"?
2. Apa yang ditemukan pemeriksa hasil build dan tidak ditemukan uji repositori?
3. Apa beda temuan, penyebab, dan perbaikan pada laporan uji?

## Kesalahan umum

- **Menilai dengan data uji tiruan.** `bun test` menimpa `dist/`; bangun ulang dulu.
- **Hasil tanpa bukti.** Orang lain tidak bisa mengulanginya.
- **Menyamakan "bersih" dengan "benar".** Pemeriksa hanya menilai yang ia tahu.
- **Menguji hanya jalur sukses.**
- **Menutup temuan tanpa menguji ulang.**

## Cek mandiri

- [ ] Saya dapat menulis uji manual yang menunjuk kebutuhan dan memuat bukti.
- [ ] Saya dapat menjalankan pemeriksa hasil build dan membaca temuannya.
- [ ] Saya dapat menulis laporan temuan yang bisa direproduksi.
- [ ] Saya dapat menyebut yang dibuktikan dan tidak dibuktikan uji otomatis dan manual.
- [ ] Saya meninjau laporan teman dengan temuan, alasan, dan saran.

## Kunci dan petunjuk

**Ingat kembali.** 1: validasi di peramban bisa dilewati dan situs statis tidak punya peladen, jadi isian tidak boleh dikirim atau disimpan; produk nyata butuh backend yang memeriksa ulang masukan, membatasi laju, dan menyimpan dengan aman, serta dasar pemrosesan dan pemberitahuan menurut UU PDP (UU 27/2022, Pasal 20 dan 21; bukan nasihat hukum). 2: uji repositori hanya mengizinkan domain `example.com`, `example.id`, `example.net`, `example.org` pada berkas seed. 3: tanyakan alasan komentar, tunjukkan bukti (uji, audit, angka), dan bila masih berbeda minta guru memutuskan; jangan mengabaikannya.

**Rencana sprint.** Prediksi: tidak ada jawaban tunggal; periksa bahwa perkiraan ditulis sebelum menguji. Keluaran dijalankan penyusun. Angka uji repositori dari `bun test` pada salinan lab (waktu berbeda tiap mesin). Perilaku `bun test` yang menimpa `dist/` dibaca dari `apps/storefront/tests/build-smoke.test.ts`, yang menghapus `dist` lalu membangun ulang. Pada `ringkas-uji.ts`: `U6` menghasilkan dua catatan, dan hasil ringkasan `lulus 3, gagal 2, belum 1`.

**Latihan bercampur.** 1: contoh: `bun run periksa-konten.ts && bun test tests/seed-profil.test.mjs && bun --bun astro build ... && bun run periksa-dist.ts`; `&&` berhenti pada kode keluar bukan nol, jadi build tidak memeriksa konten yang sudah salah, dan pemeriksa hasil tidak menilai build yang gagal. 2: contoh: telepon: klik `+62 800 0000 0000` dan harapkan tautan `tel:`; FAQ: buka pertanyaan pertama dan harapkan jawaban tampil; surel: klik "Kirim E-mail" dan harapkan klien surel terbuka dengan `info@example.org`.

**Ulang berjarak.** 1: agar orang lain dapat mengulang uji dan melihat hasil yang sama, dan agar klaim lolos punya dasar. 2: sisa merek di berkas statis (`favicon.svg`), karena uji repositori tidak tahu merekmu. 3: temuan adalah apa yang terjadi; penyebab adalah dugaan mengapa; perbaikan adalah perubahan yang diuji ulang.

## Langkah berikutnya

Modul berikut: `b-xii2-m7` (sprint 3: penyempurnaan kualitas dan aksesibilitas, rilis kandidat). Bacaan lanjut: pemeriksaan mudah aksesibilitas di situs W3C WAI (Easy Checks).
