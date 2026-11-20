## Untuk siapa modul ini

Modul ini untuk murid kelas XII jalur B (Web dengan JavaScript, TypeScript, dan Bun), minggu `B-XII1-M5` silabus v1.4.1: `template:init` dan profil `landing`. Prasyarat: modul `b-xii1-m4`. Prasyarat di luar indeks: repositori turunan lab yang disiapkan guru.

Modul ini karangan penyusun dan disetujui pemilik program pada 2026-11-20 (keputusan lewat dialog; catatan tinjauan menjadi tindak lanjut revisi). Silabus memetakan butir `F-AP-d` pada minggu ini; pemenuhan butir mengikuti pemetaan silabus, bukan status modul.

**Batas modul ini.** Kamu bekerja di **repositori turunan lab**, bukan di repositori `awcms-one` aslinya, dan hanya dengan merek **fiktif**. `template:init` tidak memakai basis data, Docker, atau CMS (penyusun menjalankannya tanpa itu), tetapi turunan yang kamu pegang tetap tidak boleh memakai backend produksi `awcms-one` (ADR-0024); backend lab dijalankan guru. Tidak ada data nyata dan tidak ada akun murid: guru menyiapkan turunan lewat tombol "Use this template" dengan akunnya sendiri, atau lewat salinan lokal tanpa riwayat seperti di bawah. Dijalankan penyusun pada 2026-11-20 dengan Bun 1.4.4 per 2026-11 terhadap `awcms-one` `0.20.0`. Tugas baca-dan-prediksi `AI: tanpa AI`; selain itu AI boleh dipakai dengan etika dan dicatat, tanpa data pribadi atau rahasia pada permintaanmu.

## Ingat kembali

Jawab dari ingatan dulu, baru cek di bagian kunci. Soal 1 dari `b-xii1-m4`, soal 2 dari `b-xii1-m2`, soal 3 dari `b-xi2-m11`.

1. Mengapa `bun run build` pada storefront gagal bila `AWCMS_API_URL` tidak diisi?
2. Mengapa halaman dinamis `[slug].astro` pada situs statis wajib punya `getStaticPaths`?
3. Mengapa tangkapan layar atau berkas HAR dari tab Network disaring dulu sebelum dibagikan?

## Tujuan

Setelah modul ini kamu dapat:

- membuat repositori turunan lokal tanpa riwayat dari template;
- menjalankan `template:init` dengan merek fiktif, lebih dulu dengan `--dry-run`;
- membaca daftar yang ditulis ulang dan dihapus, serta menafsirkan kode keluar 0, 2, dan 3;
- menyebut apa yang masih harus dikerjakan manual sesudahnya (keluaran minggu ini: repositori turunan lab).

## Prediksi dulu

Ini tugas baca-dan-prediksi, `AI: tanpa AI`. **Tebak dulu, tulis jawabanmu, baru jalankan.**

`template:init` punya flag wajib: `--nama`, `--slug`, `--domain`, `--profil`, `--warna-primer`, `--kontak-email`. Tiga situasi, semuanya di repositori turunan yang sudah bersih (tanpa perubahan belum di-commit) kecuali disebut lain:

- A: `bun run template:init --nama "Sekolah Contoh"` dijalankan tanpa terminal interaktif (`< /dev/null`).
- B: perintah lengkap yang sama dijalankan dua kali berturut-turut, tanpa mengubah flag.
- C: perintah lengkap dijalankan ketika ada berkas yang diubah dan belum di-commit, tanpa `--yes`.

1. Apa yang terjadi pada A, B (kali kedua), dan C?
2. Mengapa alat meminta pohon kerja bersih lebih dulu?

## Contoh terselesaikan

`awcms-one` adalah *template* GitHub: tombol "Use this template" membuat repositori baru **tanpa riwayat**, bukan *fork*. Guru yang tidak ingin memakai akun untuk murid menyiapkan salinan yang setara secara lokal:

```sh
git clone --depth 1 https://github.com/ahliweb/awcms-one.git sekolah-contoh
cd sekolah-contoh
rm -rf .git
git init -b main
git config user.name "Murid Contoh"
git config user.email "murid@sekolah-contoh.example"
git add -A
git commit -m "awal dari template"
git log --oneline
```

```text
bf6a366 awal dari template
```

(Nilai hash berbeda di komputermu.) Penyusun lalu menjalankan `template:init` dengan merek fiktif, lebih dulu dengan `--dry-run` (hanya mencetak rencana):

```sh
bun run template:init --nama "Sekolah Contoh" --slug sekolah-contoh \
  --domain sekolah-contoh.example --profil landing --warna-primer "#1d4ed8" \
  --kontak-email info@sekolah-contoh.example --dry-run
```

```text
Rewrite:
  - package.json (name/description/homepage/repository)
  - apps/storefront/src/config/site.ts
  - compose.yaml
  - bun.lock
  - .env.example
  - apps/storefront/.env.example
  - README.md
  - README.id.md
  - SUPPORT.md
  - SUPPORT.id.md
  - tools/seed-cms.ts

Reset (one-time):
  - CHANGELOG.md -> single 0.1.0 entry
  - .changesets/*.md cleared (7 file(s), README kept)
  - package.json version -> 0.1.0, awcmsOne.templateVersion recorded
```

Daftar `Remove:` dipotong dari kutipan ini; baca utuh di keluaranmu. Tanpa `--dry-run`, alat menulis ulang berkas itu. Pada repositori yang `package.json`-nya masih bernama `awcms-one` (keadaan turunan sebelum inisialisasi pertama), alat menolak dengan kode 3 (`REFUSING: this looks like the upstream awcms-one template itself`) kecuali ada `--yes`; penjaga ini dibaca penyusun di `tools/template-init/run.mjs`, sedangkan `docs/template.md` menyebut `--yes` hanya untuk pohon kotor. Jadi run pertama memakai `--yes`; `--dry-run` melewati kedua penjaga. Lalu alat lalu menjalankan pemeriksaan penutup (`docs:i18n:stamp`, `bun install`, tiga audit dokumen, dan uji akar). Pada komputer penyusun seluruhnya memakan sekitar 14 detik dan berakhir dengan:

```text
 703 pass
 3 skip
 0 fail
Ran 706 tests across 45 files.

template:init — done. This repository's first commit is green.
```

Angka uji bergantung pada versi. Sesudah itu `apps/storefront/src/config/site.ts` memuat identitas barumu (nilai lama terhapus; yang tersisa nilai fiktifmu):

```ts
export const DEFAULT_IDENTITY: DefaultIdentity = {
  name: "Sekolah Contoh",
  description: "Solusi tepercaya dari Sekolah Contoh",
  contactEmail: "info@sekolah-contoh.example",
  contactPhone: null,
  address: null,
};

export const DEFAULT_THEME_COLORS = {
  primary: "#1d4ed8",
  secondary: "#123187",
  accent: "#f59e0b",
} as const;
```

Telepon dan alamat yang tidak diisi ditulis `null`, bukan dibiarkan berisi nilai milik orang lain; `--warna-sekunder` yang kosong dihitung dari `--warna-primer`. `apps/storefront/.env.example` kini berisi `SITE_PROFILE=landing`. Profil **`landing`** (README: "shared only") hanya memuat halaman bersama, halaman statis, dan kontak; tanpa toko dan berita.

**Aman diulang.** Perintah lengkap yang sama dijalankan lagi (pohon bersih) hanya mencetak `template:init — nothing to do.` dengan kode keluar 0. Tanpa flag wajib dan tanpa terminal interaktif: `Missing required flag(s): --slug, --domain, --profil, --warna-primer, --kontak-email`, kode keluar 2. Sesudah inisialisasi (nama paket sudah `sekolah-contoh`), dengan satu berkas diubah dan tanpa `--yes`: `REFUSING: the working tree is dirty. Commit or stash first, or pass --yes to proceed anyway`, kode keluar 3. Validasi juga ada: `--profil blog` menghasilkan `--profil must be one of toko|berita|landing, got "blog"` (kode 2) dan `--warna-primer biru` menghasilkan `is not a #rrggbb hex colour` (kode 2).

Setelah selesai, alat mencetak daftar periksa **manual** (ia hanya menulis daftar berkas tertutup): ganti `GANTI-ORG` pada `repository.url`, tulis ulang judul `README` dan `AGENTS.md`, periksa `compose.production.yaml` (tidak disentuh karena namanya bisa menunjuk sumber daya yang sudah ada), dan tulis ulang `docs/status.md`, yang masih menyatakan keadaan `awcms-one`.

## Contoh setengah jadi

Lengkapi penafsir kode keluar berikut (kunci di bawah):

```ts setengah-jadi
function tafsir(kode: number): string {
  switch (kode) {
    case 0:
      return "berhasil atau tidak ada yang perlu dikerjakan";
    case ____:
      return "flag wajib kurang pada mode tanpa terminal";
    case ____:
      return "ditolak: pohon kerja belum bersih";
    default:
      return "lihat dokumentasi";
  }
}
```

Mengapa `default` ada di akhir, dan kode berapa dalam dokumentasi yang berarti kegagalan internal?

## Soal Parsons

Susun baris berikut menjadi urutan membuat repositori turunan lokal (kunci di bawah). Satu baris tidak terpakai.

```text
git clone --depth 1 https://github.com/ahliweb/awcms-one.git sekolah-contoh
cd sekolah-contoh
rm -rf .git
git init -b main
git add -A
git commit -m "awal dari template"
git push --force origin main
```

## Latihan

1. `AI: tanpa AI` Kamu menjalankan `template:init` dengan `--warna-primer biru`. Tebak kode keluar dan pesannya, lalu coba dengan `--dry-run`.
2. `AI: boleh` Jalankan `--dry-run` dengan merek fiktifmu dan catat tiga berkas pertama pada `Rewrite:` beserta alasan masing-masing diubah.
3. `AI: boleh` Tulis dulu rancangan merekmu dalam tabel: nama sekolah atau klub fiktif, slug, domain `.example`, warna primer, surel `.example`. Baru jalankan alatnya.
4. `AI: tanpa AI` Mengapa guru meminta kamu men-commit pekerjaanmu sebelum menjalankan `template:init`, dan apa keuntungannya bagi kamu sesudahnya?
5. `AI: boleh` (opsional) Catatan pemakaian AI: alat, tujuan, garis besar perintah, bagian yang dipakai, dan cara memeriksanya.

## Latihan bercampur

1. `AI: boleh` (dari `b-xii1-m3`) Daftar `Remove:` memuat folder contoh konten penerapan referensi. Apa isi folder itu menurut bacaanmu, dan mengapa turunan tidak membutuhkannya?
2. `AI: boleh` (dari `b-xi2-m10`) Seorang teman mengisi `--kontak-email` dengan surel pribadinya lalu mengunggah repositori ke tempat publik. Apa risikonya dan apa gantinya untuk latihan?

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `b-xii1-m6` (pertanyaan 1), sekitar tiga minggu lagi di `b-xii1-m8` (pertanyaan 2), dan sekitar delapan minggu lagi di `b-xii1-m13` (pertanyaan 3). Jawab sekarang lalu simpan.

1. Mengapa `template:init` aman dijalankan dua kali dengan flag yang sama?
2. Apa arti kode keluar 2 dan 3 pada `template:init`?
3. Apa fungsi `--dry-run`, dan kapan `--yes` diperlukan pada `template:init`?

## Kesalahan umum

- **Menjalankan tanpa `--dry-run` lebih dulu.** Alat menghapus banyak berkas; lihat rencananya.
- **Memakai data nyata sebagai merek.** Pakai nama, domain `.example`, dan surel fiktif; judul `README` dan dokumen lain tetap menyebut nama lama sampai kamu menulis ulang.
- **Mengira warna yang lolos pasti baik.** Format `#rrggbb` diperiksa, kontras tidak (modul `b-xii1-m7`); nilai `biru` ditolak pada percobaan penyusun.

## Cek mandiri

- [ ] Saya dapat membuat repositori turunan lokal tanpa riwayat.
- [ ] Saya dapat menjalankan `template:init --dry-run` dan membaca daftarnya.
- [ ] Saya dapat menafsirkan kode keluar 0, 2, dan 3.
- [ ] Saya dapat menyebut langkah manual yang tersisa.

## Kunci dan petunjuk

**Ingat kembali.** 1: storefront mengambil konten dari CMS saat build; tanpa sumber konten tidak ada yang dibangun, dan pesannya `AWCMS_API_URL is not set`. 2: semua rute harus diketahui saat build; fungsi itu mengembalikan daftar `params`, satu halaman per entri. 3: header `Authorization` dan `Cookie` memuat token dan identitas yang bisa dipakai orang lain untuk menyamar sebagai kamu.

**Prediksi dulu.** 1: A: berhenti dengan kode 2 dan daftar flag yang kurang. B: kali kedua mencetak `template:init — nothing to do.` dengan kode 0. C: ditolak dengan kode 3 (`REFUSING: the working tree is dirty`). 2: agar perubahan yang ditulis alat terpisah dari perubahanmu sendiri dan mudah ditinjau dengan `git diff`, atau dibatalkan.

**Contoh setengah jadi.** Kunci: `2` dan `3`. Dokumentasi: kode 1 berarti kegagalan internal (berkas yang diharapkan hilang atau pemeriksaan penutup gagal). `default` di akhir menangkap kode yang tidak dikenal. Kunci dijalankan penyusun:

```ts
function tafsir(kode: number): string {
  switch (kode) {
    case 0:
      return "berhasil atau tidak ada yang perlu dikerjakan";
    case 2:
      return "flag wajib kurang pada mode tanpa terminal";
    case 3:
      return "ditolak: pohon kerja belum bersih";
    default:
      return "lihat dokumentasi";
  }
}

for (const kode of [0, 1, 2, 3]) {
  console.log(kode, "->", tafsir(kode));
}
```

```text
0 -> berhasil atau tidak ada yang perlu dikerjakan
1 -> lihat dokumentasi
2 -> flag wajib kurang pada mode tanpa terminal
3 -> ditolak: pohon kerja belum bersih
```

**Soal Parsons.** Urutan: `git clone ...`, `cd sekolah-contoh`, `rm -rf .git`, `git init -b main`, `git add -A`, `git commit -m "awal dari template"`. Baris `git push --force origin main` tidak terpakai: tidak ada tujuan jauh, dan `--force` menimpa riwayat orang lain.

**Latihan.** 1: kode 2 dengan pesan `--warna-primer "biru" is not a #rrggbb hex colour` (dijalankan penyusun). 2: tidak ada kunci tunggal; `package.json` diubah karena nama, deskripsi, dan alamat repositori; `site.ts` karena identitas dan warna. 3: tidak ada kunci tunggal; periksa bahwa domain dan surel berakhiran `.example` dan tidak ada data pribadi. 4: agar perubahan alat terpisah dari pekerjaanmu; sesudahnya `git diff` memperlihatkan persis apa yang ditulis alat dan kamu bisa membatalkannya. 5: tidak ada kunci tunggal.

**Latihan bercampur.** 1: isinya konten contoh penerapan referensi (BjekMart); turunan memiliki konten sendiri sehingga alat menghapusnya agar tidak membawa contoh yang menyesatkan. 2: surel pribadi menjadi publik dan mudah dikumpulkan pengirim pesan massal; ganti dengan surel `.example` yang tidak aktif.

**Ulang berjarak.** 1: ia idempoten: dengan flag yang sama alat mencetak `nothing to do` dan keluar 0; hanya yang berubah ditulis ulang. 2: 2 berarti flag wajib kurang pada mode tanpa terminal (atau nilai tidak sah); 3 berarti ditolak tanpa `--yes`, karena pohon kerja kotor atau karena `package.json` masih bernama `awcms-one`. 3: `--dry-run` hanya mencetak rencana tanpa mengubah apa pun dan melewati penjaga; `--yes` diperlukan pada run pertama (nama paket masih `awcms-one`) dan bila pohon kerja kotor. Langkah manual sesudahnya (ganti `GANTI-ORG`, tulis ulang judul `README` dan `AGENTS.md`, periksa `compose.production.yaml`) tetap dikerjakan sendiri karena alat hanya menulis daftar tertutup.

## Langkah berikutnya

Modul berikut: `b-xii1-m6` (kustomisasi merek dan konten). Bacaan lanjut: bagian "`template:init` — CLI reference" pada `docs/template.md` di `https://github.com/ahliweb/awcms-one`, dan dokumentasi GitHub tentang membuat repositori dari template.
