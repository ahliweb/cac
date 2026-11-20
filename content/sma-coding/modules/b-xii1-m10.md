## Untuk siapa modul ini

Modul ini untuk murid kelas XII jalur B (Web dengan JavaScript, TypeScript, dan Bun), minggu `B-XII1-M10` silabus v1.4.1: rahasia dan konfigurasi. Prasyarat: modul `b-xii1-m9`, modul `b-xi2-m10` (keamanan aplikasi), dan fondasi `FND-X1-M6`.

Modul ini berstatus DRAF: karangan penyusun, belum ditinjau pemilik. Butir `F-LD-i` (kata sandi dan autentikasi) hanya didukung sebagian oleh modul ini menurut pemetaan silabus; modul draf ini belum dihitung memenuhinya.

**Aturan modul ini.** Semua "rahasia" di sini bernilai palsu (`KUNCI_PALSU_CONTOH`). Jangan menempelkan rahasia, kata sandi, atau data pribadi ke asisten AI, termasuk saat meminta bantuan memperbaiki galat. Berkas `.env` selalu masuk `.gitignore`. Rahasia lingkungan kelas dipegang gurumu; kamu tidak menyentuh backend.

**Konteks semester ini.** Kelasmu mengkustomisasi profil `landing` dari `awcms-one` sebagai studi kasus: kamu hanya mengubah merek, konten, tema, SEO, dan dokumentasi. Fakta `awcms-one` dibaca dari repositori publiknya (`main`, 2026-11-20). Contoh dijalankan dengan Bun 1.4.4, Astro 7.4.13, dan Git 2.43.0 per 2026-11 di direktori sementara. Baca-dan-prediksi `AI: tanpa AI`.

## Ingat kembali

Jawab dari ingatan dulu, baru cek di bagian kunci. Soal 1 dari `b-xii1-m9`, soal 2 dari `b-xii1-m7`, soal 3 dari `b-xii1-m2`.

1. Mengapa rangkaian pemeriksaan memakai `&&`, dan kode keluar berapa yang menandakan lolos?
2. Berapa rasio kontras minimum WCAG AA untuk teks biasa, dan untuk teks besar?
3. Mengapa konten (daftar program) disimpan di berkas data terpisah dari tata letak?

## Tujuan

Setelah modul ini kamu dapat:

- memisahkan konfigurasi dari kode dan menempatkan rahasia di `.env` yang tidak ikut repositori;
- menjelaskan mengapa variabel berawalan `PUBLIC_` pada Astro tidak boleh berisi rahasia;
- menangani rahasia yang terlanjur ter-commit, dan memeriksa contoh permintaan ke asisten AI dari rahasia sebelum mengirimnya;
- mengisi lembar periksa rahasia untuk sebuah repositori (keluaran minggu ini).

## Prediksi dulu

Ini tugas baca-dan-prediksi, `AI: tanpa AI`. **Tebak dulu, tulis jawabanmu, baru jalankan.** Menurut dokumentasi Astro, hanya variabel lingkungan berawalan `PUBLIC_` yang tersedia di kode sisi peramban.

```ts
const variabel = [
  "SITE_URL",
  "PUBLIC_SITE_URL",
  "AWCMS_API_TOKEN",
  "PUBLIC_AWCMS_API_TOKEN",
  "KUNCI_PALSU_CONTOH",
];

for (const nama of variabel) {
  console.log(nama, nama.startsWith("PUBLIC_") ? "tersedia di kode peramban" : "hanya di kode server");
}
```

1. Apa lima baris yang tercetak?
2. Jika nilai `AWCMS_API_TOKEN` rahasia, nama mana di atas yang berbahaya?

## Contoh terselesaikan

Keluaran program tadi:

```text
SITE_URL hanya di kode server
PUBLIC_SITE_URL tersedia di kode peramban
AWCMS_API_TOKEN hanya di kode server
PUBLIC_AWCMS_API_TOKEN tersedia di kode peramban
KUNCI_PALSU_CONTOH hanya di kode server
```

**`PUBLIC_` menerbitkan nilai.** Dokumentasi Astro menyatakan variabel lingkungan diganti secara statis saat build, dan hanya yang berawalan `PUBLIC_` tersedia di kode peramban. Dicoba penyusun pada proyek Astro kecil dengan `.env` berisi `KUNCI_PALSU_CONTOH=KUNCI_PALSU_CONTOH_12345` dan `PUBLIC_KUNCI_PALSU_CONTOH=KUNCI_PALSU_CONTOH_67890`. Halaman memakai nilai pertama hanya untuk menulis "terbaca" dan mencetak nilai kedua dari skrip peramban. Setelah `astro build`, jumlah kemunculan tiap nilai di `dist/index.html`:

```text
12345: 0
67890: 1
```

Nilai berawalan `PUBLIC_` ikut terbit ke setiap pengunjung; yang tanpa awalan hanya dipakai di server. Ini bukan izin menulis rahasia ke halaman: apa pun yang kamu cetak ke HTML tetap terbit. Berkas `apps/storefront/.env.example` milik `awcms-one` memperingatkan hal yang sama untuk `AWCMS_API_TOKEN` (kredensial baca-saja saat build): jangan beri alias `PUBLIC_`. Isi `.env.example` hanya penunjuk seperti `awcmsm_replace-me`. `.gitignore`-nya memuat `.env`, `.env.*` (kecuali `.env.example`), dan `.secrets/`. Di salinan sementara repositori turunan, `git check-ignore -v apps/storefront/.env` menjawab `.gitignore:4:.env`, sedangkan `.env.example` tetap dilacak.

**Terlanjur ter-commit.** Di repositori latihan tanpa `.env` di `.gitignore`, `.env` berisi kunci palsu ikut ter-commit:

```sh
git ls-files
echo ".env" >> .gitignore
git rm --cached .env
git add .gitignore
git commit -m "Hapus .env dari pelacakan"
git log --oneline -S KUNCI_PALSU_CONTOH_12345 --all
git show HEAD~1:.env
```

```text
.env
.gitignore
app.ts
rm '.env'
[main 2d5ef3a] Hapus .env dari pelacakan
 2 files changed, 1 insertion(+), 1 deletion(-)
 delete mode 100644 .env
2d5ef3a Hapus .env dari pelacakan
e83f348 Awal
KUNCI_PALSU_CONTOH=KUNCI_PALSU_CONTOH_12345
```

Setelah commit perbaikan, `.env` tidak lagi dilacak, tetapi `git show HEAD~1:.env` masih menampilkan nilainya dan pencarian riwayat menemukannya di commit awal. Karena itu urutannya: **cabut dan ganti rahasia di penyedianya dulu**, baru bereskan repositori; menghapus berkas atau commit saja tidak cukup. Kode commit di komputermu berbeda.

**Contoh permintaan ke asisten AI.** Log dan berkas konfigurasi sering memuat rahasia, dan permintaan ke layanan AI meninggalkan komputermu. Periksa dulu permintaannya. Fungsi berikut mencari tiga pola (pasangan nama=nilai bernama `KUNCI`, `KEY`, `TOKEN`, `SECRET`, `SANDI`, atau `PASSWORD`; kata sandi di alamat sambungan; token `Bearer`), melewatkan nilai penunjuk seperti `replace-me`, dan memberi versi bersih. Pemeriksa sederhana ini tidak menangkap semua bentuk rahasia; ia alat bantu, bukan jaminan.

```ts
const PENANDA = /\b[A-Z0-9_]*(?:KUNCI|KEY|TOKEN|SECRET|SANDI|PASSWORD)[A-Z0-9_]*\s*[=:]\s*["']?([^\s"']+)/gi;
const SANDI_URL = /\b[a-z][a-z0-9+.-]*:\/\/[^\s:@/]+:([^\s@/]+)@/gi;
const BEARER = /\bBearer\s+([A-Za-z0-9._-]{8,})/g;
const PENGGANTI = /^(?:<.*>|GANTI|ISI|replace-me|changeme)/i;

type Hasil = { aman: boolean; temuan: string[]; bersih: string };

function periksaPermintaan(teks: string): Hasil {
  const temuan: string[] = [];
  let bersih = teks;
  const aturan: [string, RegExp][] = [
    ["nilai rahasia pada pasangan nama=nilai", PENANDA],
    ["kata sandi di dalam alamat sambungan", SANDI_URL],
    ["token Bearer", BEARER],
  ];
  for (const [nama, pola] of aturan) {
    for (const m of teks.matchAll(pola)) {
      const nilai = m[1] ?? "";
      if (PENGGANTI.test(nilai)) continue;
      temuan.push(nama);
      bersih = bersih.replaceAll(nilai, "<RAHASIA>");
    }
  }
  return { aman: temuan.length === 0, temuan, bersih };
}

const contoh = [
  "Build gagal. Ini .env saya: AWCMS_API_TOKEN=KUNCI_PALSU_CONTOH_12345 dan SITE_URL=https://kopi-contoh.example",
  "Apa arti galat ini: TypeError: Cannot read properties of undefined (reading 'name') di BaseLayout.astro:42?",
  "Mengapa ditolak: postgres://pengguna:SANDI_PALSU_CONTOH@localhost:5432/kopi",
  "Contoh .env.example saya: AWCMS_API_TOKEN=replace-me, apakah sudah benar?",
];

for (const teks of contoh) {
  const h = periksaPermintaan(teks);
  console.log(h.aman ? "AMAN" : `TAHAN (${h.temuan.length})`, "|", h.bersih);
}
```

```text
TAHAN (1) | Build gagal. Ini .env saya: AWCMS_API_TOKEN=<RAHASIA> dan SITE_URL=https://kopi-contoh.example
AMAN | Apa arti galat ini: TypeError: Cannot read properties of undefined (reading 'name') di BaseLayout.astro:42?
TAHAN (1) | Mengapa ditolak: postgres://pengguna:<RAHASIA>@localhost:5432/kopi
AMAN | Contoh .env.example saya: AWCMS_API_TOKEN=replace-me, apakah sudah benar?
```

Permintaan pertama dan ketiga ditahan: kirim versi bersihnya, dan hanya pesan galat tanpa nilai. `SITE_URL` bukan rahasia (ia memang terbit sebagai alamat kanonik), sehingga boleh ada di `.env.example`. Menurut README `awcms-one`, rangkaian CI-nya juga memindai rahasia dengan `gitleaks` `[belum terverifikasi]`: penyusun tidak menjalankannya.

## Contoh setengah jadi

Lengkapi fungsi pembersih nilai rahasia (kunci di bawah):

```ts setengah-jadi
function bersihkan(teks: string, nilai: string[]): string {
  let hasil = teks;
  for (const n of nilai) hasil = hasil.____(n, "<RAHASIA>");
  return hasil;
}
```

## Soal Parsons

Susun langkah berikut menjadi urutan menangani `.env` yang terlanjur ter-commit (kunci di bawah). Satu baris tidak terpakai.

```text
git commit -m "Hapus .env dari pelacakan"
git rm --cached .env
Cabut dan ganti kunci di penyedianya
echo ".env" >> .gitignore
Anggap aman karena commit sudah dihapus
```

## Latihan

1. `AI: boleh` **Lembar periksa rahasia.** Untuk repositori latihanmu (atau salinan repositori turunan dari guru), isi: `.env` di `.gitignore`? `.env.example` hanya penunjuk? Ada rahasia di berkas yang dilacak (`git ls-files`)? Variabel `PUBLIC_` berisi rahasia? Ada rahasia di riwayat (`git log -S`)? Catat temuan dan tindakannya.
2. `AI: tanpa AI` **Cari rahasia tak sengaja.** Ada tiga potongan berkas karangan. (a) `const api = "https://layanan.example/v1"`; (b) `const TOKEN = "KUNCI_PALSU_CONTOH_777"`; (c) `PUBLIC_SANDI_ADMIN=SANDI_PALSU_CONTOH` di `.env.production`. Mana yang rahasia tak sengaja, dan apa perbaikannya?
3. `AI: tanpa AI` **Periksa permintaan ke asisten AI.** Untuk tiga permintaan karangan: (a) "Kenapa `fetch` ini 401? `Authorization: Bearer KUNCI_PALSU_CONTOH_999`"; (b) "Apa beda `toBe` dan `toEqual`?"; (c) "Tolong periksa konfigurasi ini: `SECRET_KEY=KUNCI_PALSU_CONTOH_555`". Putuskan mana yang aman dikirim, dan tulis ulang yang tidak aman tanpa kehilangan pertanyaannya. Jangan mengirim contoh ini ke asisten AI sungguhan, walau nilainya palsu.
4. `AI: boleh` Tambahkan pola keempat ke `periksaPermintaan`: alamat surel yang bukan berakhiran `.example`, dengan temuan "alamat surel (data pribadi?)". Jalankan pada tiga kalimat karangan.
5. `AI: boleh` (opsional) Catatan pemakaian AI: alat, tujuan, garis besar perintah, bagian yang dipakai, cara memeriksa, dan konfirmasi tanpa rahasia atau data pribadi.

## Latihan bercampur

1. `AI: boleh` (dari `b-xii1-m9`) Di mana dalam rangkaian `periksa-tipe`, `uji`, `bangun`, `uji-bangun` kamu menaruh pemeriksaan rahasia, dan mengapa? Apa kode keluarnya bila ada temuan?
2. `AI: boleh` (dari `b-xii1-m8`) `SITE_URL` ada di `.env.example` dan terbit sebagai alamat kanonik. Mengapa ini bukan pelanggaran, padahal ia variabel lingkungan?

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `b-xii1-m11` (pertanyaan 1), sekitar tiga minggu lagi di `b-xii1-m13` (pertanyaan 2), dan sekitar delapan minggu lagi di semester berikutnya, modul `b-xii2-m4` (pertanyaan 3). Jawab sekarang lalu simpan.

1. Mengapa variabel berawalan `PUBLIC_` pada Astro tidak boleh berisi rahasia?
2. Rahasia terlanjur ter-commit: sebutkan langkah yang benar berurutan, dan mengapa menghapus commit saja tidak cukup.
3. Apa yang kamu periksa pada sebuah permintaan ke asisten AI sebelum mengirimnya?

## Kesalahan umum

- **Menganggap `git rm --cached` membereskan kebocoran.** Nilainya tetap di riwayat; cabut dan ganti rahasianya.
- **Memberi awalan `PUBLIC_` agar "gampang dibaca".** Nilainya terbit ke setiap pengunjung.
- **Mencetak nilai rahasia ke halaman atau log.** Cukup cetak status "terbaca".
- **Mengisi `.env.example` dengan nilai asli.** Berkas itu ikut repositori; isi penunjuk.
- **Menempelkan log atau konfigurasi utuh ke asisten AI.** Log bisa memuat token atau kata sandi; periksa dan ganti dulu.
- **Mengira repositori pribadi aman.** Akses bisa berubah dan salinan menyebar; rahasia tetap di luar repositori.

## Cek mandiri

- [ ] Saya dapat menyimpan rahasia di `.env` yang masuk `.gitignore`.
- [ ] Saya dapat menjelaskan mengapa `PUBLIC_` tidak boleh berisi rahasia.
- [ ] Saya tahu urutan menangani rahasia yang terlanjur ter-commit.
- [ ] Saya dapat memeriksa permintaan ke asisten AI dari rahasia sebelum mengirim.
- [ ] Saya dapat mengisi lembar periksa rahasia untuk sebuah repositori.

## Kunci dan petunjuk

**Ingat kembali.** 1: `&&` hanya melanjutkan bila langkah sebelumnya berkode keluar 0; 0 berarti lolos. 2: 4,5:1 untuk teks biasa dan 3:1 untuk teks besar (WCAG 2.2, Contrast (Minimum)). 3: satu sumber: ubah sekali, halaman daftar, halaman rinci, dan tautan ikut berubah, dan datanya dapat diperiksa dengan skrip.

**Prediksi dulu.** 1: lima baris seperti di bagian contoh. 2: `PUBLIC_AWCMS_API_TOKEN`: awalan `PUBLIC_` menyediakan nilainya di kode peramban dan menerbitkannya. Catatan: nama tanpa awalan hanya melindungi nilai selama kamu tidak mencetaknya ke halaman.

**Contoh setengah jadi.** Kunci, dijalankan penyusun:

```ts
function bersihkan(teks: string, nilai: string[]): string {
  let hasil = teks;
  for (const n of nilai) hasil = hasil.replaceAll(n, "<RAHASIA>");
  return hasil;
}

console.log(bersihkan("token KUNCI_PALSU_CONTOH_12345 gagal; KUNCI_PALSU_CONTOH_12345 lagi", ["KUNCI_PALSU_CONTOH_12345"]));
```

```text
token <RAHASIA> gagal; <RAHASIA> lagi
```

`replaceAll` mengganti semua kemunculan, bukan hanya yang pertama.

**Soal Parsons.** Urutan: `Cabut dan ganti kunci di penyedianya`, `echo ".env" >> .gitignore`, `git rm --cached .env`, `git commit -m "Hapus .env dari pelacakan"`. Baris "Anggap aman karena commit sudah dihapus" tidak terpakai dan keliru: riwayat masih memuat nilainya.

**Latihan.** 1: tidak ada kunci tunggal; temuan umum: `.env` belum di `.gitignore`, `.env.example` berisi nilai asli, `PUBLIC_` berisi rahasia. 2: (a) bukan rahasia (alamat publik layanan karangan); (b) rahasia tak sengaja di kode: pindahkan ke `.env`, baca lewat `process.env` atau `import.meta.env`, dan ganti nilainya karena sudah ter-commit; (c) `PUBLIC_` menerbitkannya: ganti nama tanpa awalan, jangan pakai di kode peramban, dan ganti nilainya. 3: (a) tidak aman: tulis "kenapa `fetch` ini 401 bila memakai `Authorization: Bearer <RAHASIA>`"; (b) aman; (c) tidak aman: tulis "apa saja yang perlu kuperiksa pada konfigurasi yang memakai variabel `SECRET_KEY`?" tanpa nilainya. Sebutkan nama variabel dan pesan galat; nilainya tidak perlu. 4: contoh pola: `/\b[\w.+-]+@[\w-]+(?:\.[\w-]+)*\.(?!example\b)[a-z]{2,}\b/gi` dengan temuan "alamat surel (data pribadi?)"; uji pada tiga kalimat karangan (satu berakhiran `.example`, dua tidak). 5: tidak ada kunci tunggal.

**Latihan bercampur.** 1: contoh: sebelum `bangun`, karena yang dipindai berkas sumber dan `.env.example`; kode keluar bukan 0 bila ada temuan sehingga `&&` menghentikan rangkaian. 2: `SITE_URL` memang alamat publik situs (ia dipakai untuk kanonik dan dibaca semua orang); rahasia adalah nilai yang memberi akses, seperti token.

**Ulang berjarak.** 1: nilainya disisipkan ke kode peramban dan terbit ke setiap pengunjung. 2: cabut dan ganti rahasia di penyedia, lalu hentikan pelacakan (`.gitignore`, `git rm --cached`) dan commit; commit yang menghapus berkas tidak menghapus nilainya dari riwayat. 3: apakah memuat nilai rahasia, kata sandi, token, atau data pribadi; bila ada, ganti dengan penunjuk dan kirim hanya pesan galatnya.

## Langkah berikutnya

Modul berikut: `b-xii1-m11` (dokumentasi dan lisensi). Modul terkait: `fondasi-keamanan-dasar` dan `b-xi2-m10` untuk mengulang keamanan aplikasi. Bacaan lanjut: halaman Astro tentang variabel lingkungan, halaman Bun tentang `.env`, halaman Git tentang `gitignore`, dan `apps/storefront/.env.example` di `awcms-one`.
