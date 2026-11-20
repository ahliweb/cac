## Untuk siapa modul ini

Modul ini untuk murid kelas XII jalur B (Web dengan JavaScript, TypeScript, dan Bun), minggu `B-XII1-M4` silabus v1.4.1: menjalankan `awcms-one` secara lokal sebagai **demonstrasi guru**. Prasyarat: modul `b-xii1-m3`. Prasyarat di luar indeks: mesin lab yang disiapkan guru.

Modul ini berstatus DRAF: karangan penyusun, belum ditinjau pemilik. Silabus memetakan butir `F-AP-d` pada minggu ini; modul draf ini belum dihitung memenuhinya.

**Batas modul ini (keputusan pemilik silabus, 2026-11-18).** Lingkungan Docker, PostgreSQL, dan `apps/cms` disiapkan dan dijalankan **guru**, bukan murid. Kamu menonton, memprediksi, dan mencatat. Kamu tidak menyentuh backend dan tidak memakai backend produksi `awcms-one` (aturan template-only, ADR-0024). Penyusun **tidak** menjalankan Docker, PostgreSQL, maupun `apps/cms`; langkah yang bergantung pada itu diambil dari README dan `docs/template.md` pada 2026-11-20 dan ditandai `[belum terverifikasi]`.

**Catatan untuk guru.** Isi `.env` memakai kata sandi acak buatan sendiri; jangan pakai kata sandi nyata dan jangan masukkan `.env` ke Git. `compose.yaml` memetakan port `"${POSTGRES_PORT:-5433}:5432"` tanpa alamat pengikat; pada Docker bawaan itu biasanya berarti port basis data terbuka di semua antarmuka mesin. Pastikan mesin lab tidak terjangkau dari jaringan murid, atau ubah pemetaan menjadi `127.0.0.1` di salinan lab `[belum terverifikasi: tidak dijalankan]`. Tugas baca-dan-prediksi `AI: tanpa AI`; selain itu AI boleh dipakai dengan etika dan dicatat, tanpa data pribadi atau rahasia pada permintaan. Contoh dijalankan dengan Bun 1.4.4 per 2026-11.

## Ingat kembali

Jawab dari ingatan dulu, baru cek di bagian kunci. Soal 1 dari `b-xii1-m3`, soal 2 dari `b-xii1-m1`, soal 3 dari `b-xi2-m10`.

1. Apa beda `apps/storefront` dan `apps/cms`, dan mana yang berisi basis data?
2. Mengapa `{nama}` di templat Astro aman bila `nama` berisi tanda `<`, dan kapan `set:html` berbahaya?
3. Mengapa menguji keamanan hanya pada aplikasi milik sendiri atau yang diizinkan tertulis, dan pokok hukum mana yang menjadi alasannya?

## Tujuan

Setelah modul ini kamu dapat:

- menjelaskan bahwa storefront mengambil konten dari CMS **saat build** dan apa yang terjadi bila sumber itu tidak ada;
- menjelaskan fungsi `SITE_PROFILE` dan akibat nilai yang tidak dikenal;
- mencocokkan perintah `awcms-one` dengan efeknya dan menyebut mana yang butuh Docker atau basis data;
- menyebut siapa menjalankan apa di kelas ini dan mengapa (keluaran minggu ini: demonstrasi guru).

## Prediksi dulu

Ini tugas baca-dan-prediksi, `AI: tanpa AI`. **Tebak dulu, tulis jawabanmu, sebelum guru menjalankannya.**

Dua perintah dijalankan guru di folder `apps/storefront` sebuah repositori turunan, satu per satu:

```sh
env -u AWCMS_API_URL SITE_PROFILE=landing bun --bun astro build
env AWCMS_API_URL=http://localhost:PORT SITE_PROFILE=blog bun --bun astro build
```

(`PORT` ganti dengan port sumber konten milik guru.) Tiga profil yang dikenal storefront adalah `toko`, `berita`, dan `landing`.

1. Apakah perintah pertama berhasil? Bila gagal, apa sebabnya?
2. Apakah perintah kedua berhasil? Bila gagal, apa pesan yang kamu harapkan?

## Contoh terselesaikan

Struktur kerjanya (dari README dan `docs/template.md`): `apps/storefront` adalah situs statis Astro yang **mengambil kontennya dari `apps/cms` saat `astro build`** lalu menulis berkas ke `dist/`. `apps/cms` butuh PostgreSQL; PostgreSQL lokal dijalankan lewat `docker compose`. Urutan yang dijalankan guru pada repositori turunan, dengan efeknya:

| Langkah | Efek menurut dokumentasi |
| --- | --- |
| `cp .env.example .env` (akar dan `apps/cms`) | menyalin contoh pengaturan; nilai rahasia diisi guru sendiri |
| `bun run db:up` | `docker compose up -d --wait`: menyalakan PostgreSQL lokal dan menunggunya siap |
| `bun run db:migrate:cms` | menjalankan migrasi basis data milik `apps/cms` |
| `bun run db:seed:cms:profil landing` | mengisi basis data dengan konten contoh profil `landing` lewat API `apps/cms` |
| `bun run dev` | skrip akar menjalankan `cd apps/storefront && bun run dev`, yaitu `bun --bun astro dev` |

Semuanya `[belum terverifikasi]` oleh penyusun. Catatan: README langkah 7 menyebut `bun run dev` memulai `apps/cms` dan `apps/storefront`, sedangkan skrip `dev` di `package.json` akar hanya masuk ke `apps/storefront`; guru memeriksa mana yang berlaku pada versi yang dipakai.

Yang **dijalankan penyusun** adalah hal-hal yang tidak butuh basis data. Pada salinan turunan di folder sementara, tanpa `AWCMS_API_URL` dan dengan `SITE_PROFILE=landing`, build berhenti:

```text
AWCMS_API_URL is not set — this storefront has no content source. Point it at the awcms instance's origin, e.g. https://cms.example.com.
error: "astro" exited with code 1
```

Dengan sumber konten ada tetapi `SITE_PROFILE=blog`, build berhenti sebelum membangun apa pun:

```text
[astro] Unable to load your Astro config

SITE_PROFILE="blog" is not a build profile this storefront knows. Use one of: toko, berita, landing (unset means "toko").
error: "astro" exited with code 1
```

Jadi kedua perintah di soal prediksi gagal, dengan dua sebab berbeda. Nilai yang salah **gagal keras** (bukan diam-diam memakai `toko`) agar situs toko tidak terbit untuk yang meminta situs lain. Penyusun juga membangun profil `landing` terhadap **stub uji** milik repositori itu (`apps/storefront/scripts/stub-awcms.mjs`, token palsu `TOKEN_PALSU_CONTOH`): berhasil dan menghasilkan enam halaman HTML. Stub itu hanya tiruan untuk uji, bukan `apps/cms`; ia tidak membuktikan apa pun tentang CMS sungguhan.

Skrip kecil berikut mengelompokkan skrip `package.json` menurut perintahnya (dijalankan dari folder yang berisi salinan baca-saja dari modul `b-xii1-m3`, `bun run golongkan-skrip.ts`):

```ts
import { readFileSync } from "node:fs";

const paket = JSON.parse(readFileSync("awcms-one/package.json", "utf8"));
const skrip: Record<string, string> = paket.scripts;

function golongan(perintah: string): string {
  if (perintah.includes("docker compose")) return "docker";
  if (perintah.includes("apps/cms")) return "cms";
  if (perintah.includes("apps/storefront")) return "storefront";
  return "lain";
}

const kelompok = new Map<string, string[]>();
for (const [nama, perintah] of Object.entries(skrip)) {
  const g = golongan(perintah);
  kelompok.set(g, [...(kelompok.get(g) ?? []), nama]);
}

for (const g of ["docker", "cms", "storefront", "lain"]) {
  const isi = kelompok.get(g) ?? [];
  console.log(`${g} (${isi.length}): ${isi.slice(0, 6).join(", ")}${isi.length > 6 ? ", ..." : ""}`);
}
```

```text
docker (3): db:up, db:down, db:reset
cms (2): check:cms, db:migrate:cms
storefront (4): dev, build, check, serve
lain (33): check:lockfile, deps:freshness, deploy:preflight, deploy:production, deploy:remote, deploy:health, ...
```

Heuristik ini kasar: `db:seed:cms` jatuh ke "lain" padahal ia membutuhkan CMS yang hidup (dokumentasi: ia menyemai lewat API `apps/cms`).

## Contoh setengah jadi

Lengkapi pengelompok agar perintah Docker terdeteksi (kunci di bawah):

```ts setengah-jadi
function golongan(perintah: string): string {
  if (perintah.includes("____")) return "docker";
  return "lain";
}
```

Skrip mana pada daftar guru yang akan salah digolongkan oleh fungsi yang hanya mencari `docker`?

## Soal Parsons

Susun baris berikut menjadi fungsi `golongan` yang benar (kunci di bawah). Satu baris tidak terpakai.

```text
function golongan(perintah: string): string {
  if (perintah.includes("docker compose")) return "docker";
  if (perintah.includes("apps/cms")) return "cms";
  return "lain";
}
  return perintah.length;
```

## Latihan

1. `AI: tanpa AI` Cocokkan perintah dengan efeknya: (a) `bun run db:up`, (b) `bun run db:migrate:cms`, (c) `bun run db:seed:cms:profil landing`, (d) `bun run dev`, (e) `bun run template:init`. Efek: (i) mengisi konten contoh lewat API CMS, (ii) menjalankan situs untuk pengembangan, (iii) menyalakan PostgreSQL lokal, (iv) menulis ulang identitas merek repositori, (v) membuat tabel basis data.
2. `AI: tanpa AI` Apa yang dipakai bila `SITE_PROFILE` dikosongkan, dan mengapa gagal lebih baik daripada diam-diam memakai bawaan untuk nilai yang salah?
3. `AI: boleh` Tulis dulu rancangan catatan demonstrasi: tiga kolom (perintah, prediksimu, yang terjadi). Isi kolom prediksi sebelum guru menjalankan tiap langkah.
4. `AI: tanpa AI` Sebutkan tiga hal yang tidak boleh ada di repositori turunan terkait berkas `.env`, dan satu hal yang dilakukan bila terlanjur.
5. `AI: boleh` (opsional) Catatan pemakaian AI: alat, tujuan, garis besar perintah, bagian yang dipakai, dan cara memeriksanya.

## Latihan bercampur

1. `AI: boleh` (dari `b-xii1-m3`) Mengapa `golongkan-skrip.ts` salah menggolongkan `db:seed:cms`, dan apa yang kamu lakukan untuk memastikan sebuah skrip butuh CMS atau tidak?
2. `AI: boleh` (dari `b-xi2-m11`) Pesan `AWCMS_API_URL is not set` adalah "tidak tersambung", status 404, atau jenis lain? Apa buktinya?

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `b-xii1-m5` (pertanyaan 1), sekitar tiga minggu lagi di `b-xii1-m7` (pertanyaan 2), dan sekitar delapan minggu lagi di `b-xii1-m12` (pertanyaan 3). Jawab sekarang lalu simpan.

1. Mengapa `bun run build` pada storefront gagal bila `AWCMS_API_URL` tidak diisi?
2. Apa yang terjadi bila `SITE_PROFILE` diisi nilai yang tidak dikenal, dan mengapa gagal lebih baik daripada diam-diam memakai bawaan?
3. Siapa menjalankan Docker dan PostgreSQL di kelas ini, dan mengapa murid tidak menyentuh backend?

## Kesalahan umum

- **Mengira storefront berdiri sendiri.** Ia butuh sumber konten saat build; tanpa itu build berhenti.
- **Menyalin `.env.example` ke `.env` lalu meng-commit-nya.** `.env` berisi rahasia dan masuk `.gitignore`.
- **Mengira tiruan uji sama dengan CMS.** Stub hanya menjawab data yang disiapkan untuk uji.
- **Menyimpulkan dari satu keluaran.** README dan `package.json` berbeda soal `bun run dev`; periksa keduanya dan versi yang kamu pakai.

## Cek mandiri

- [ ] Saya dapat menjelaskan bahwa storefront mengambil konten dari CMS saat build.
- [ ] Saya dapat menjelaskan `SITE_PROFILE` dan akibat nilai yang salah.
- [ ] Saya dapat mencocokkan perintah dengan efeknya dan menyebut mana yang butuh Docker.
- [ ] Saya dapat menyebut peran guru dan peranku pada demonstrasi ini.

## Kunci dan petunjuk

**Ingat kembali.** 1: `apps/storefront` adalah situs publik Astro yang dibangun menjadi berkas statis; `apps/cms` adalah backend dan sistem catatan; basis data (PostgreSQL) milik `apps/cms`. 2: Astro meng-escape ekspresi `{...}` (diamati: `&lt;b&gt;`), jadi teks tampil apa adanya; `set:html` menyisipkan mentah, berbahaya bila teksnya dari luar. 3: kutipan kunci `b-xi2-m10` (cek ulang di sumber resmi): Pasal 332 ayat (1) KUHP melarang mengakses sistem elektronik milik orang lain dengan sengaja tanpa hak atau melawan hukum; izin tertulis pemilik membuat pengujian sah.

**Prediksi dulu.** 1: gagal: tanpa `AWCMS_API_URL` storefront tidak punya sumber konten. 2: gagal: `SITE_PROFILE="blog" is not a build profile this storefront knows` dan daftar `toko, berita, landing`.

**Contoh setengah jadi.** Kunci: `docker compose`. Fungsi yang hanya mencari `docker` bisa melewatkan perintah yang ditulis `docker compose`; dan skrip yang butuh basis data tetapi tidak menyebut `docker` (seperti `db:seed:cms`) tetap salah golongan.

**Soal Parsons.** Urutan: `function golongan(perintah: string): string {`, `if (perintah.includes("docker compose")) return "docker";`, `if (perintah.includes("apps/cms")) return "cms";`, `return "lain";`, `}`. Baris `return perintah.length;` tidak terpakai: tipenya angka, bukan teks.

**Latihan.** 1: (a) iii, (b) v, (c) i, (d) ii, (e) iv (efek dari README dan `docs/template.md`, `[belum terverifikasi]` bagian yang butuh Docker). 2: dipakai `toko`; nilai yang salah dibiarkan jatuh ke bawaan akan menerbitkan situs toko untuk yang meminta situs lain tanpa ada yang tahu, sehingga pesan galat yang menyebut variabel lebih baik. 3: tidak ada kunci tunggal; periksa bahwa prediksi ditulis sebelum langkah dijalankan. 4: contoh: `.env` tidak masuk Git (`.gitignore`), tidak berisi rahasia nyata di contoh, dan tidak ditempel ke AI; bila terlanjur ter-commit, anggap rahasia bocor, cabut dan ganti, baru bereskan repositori. 5: tidak ada kunci tunggal.

**Latihan bercampur.** 1: skripnya `bun tools/seed-cms.ts`, tidak menyebut `docker` atau `apps/cms`, padahal ia menyemai lewat API CMS; heuristik teks hanya melihat perintah. Pastikan dengan membaca dokumentasi dan isi skripnya. 2: bukan ketiganya: tidak ada permintaan jaringan sama sekali; galat dilempar dari konfigurasi sebelum ada yang dikirim. Buktinya pesan itu menyebut variabel yang tidak diisi, dan kodenya memeriksa variabel sebelum memanggil `fetch`.

**Ulang berjarak.** 1: storefront mengambil konten dari CMS saat build; tanpa sumber konten tidak ada yang dibangun, dan pesannya `AWCMS_API_URL is not set`. 2: build gagal dengan pesan yang menyebut variabel dan nilai yang diterima; diam-diam memakai `toko` akan menerbitkan situs toko untuk yang meminta situs lain. 3: guru; backend menyimpan rahasia dan basis data dan di luar capaian kelas, dan kelas hanya mengubah merek, konten, tema, SEO, dan dokumentasi.

## Langkah berikutnya

Modul berikut: `b-xii1-m5` (`template:init` dan profil `landing`). Bacaan lanjut: bagian "Build profiles" dan "Starting from the template" pada `docs/template.md` di `https://github.com/ahliweb/awcms-one`, dan ADR-0018 serta ADR-0024.
