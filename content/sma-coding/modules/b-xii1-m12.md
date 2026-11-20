## Untuk siapa modul ini

Modul ini untuk murid kelas XII jalur B (Web dengan JavaScript, TypeScript, dan Bun), minggu `B-XII1-M12` silabus v1.4.1: ulasan sejawat atas kustomisasi temanmu. Prasyarat: modul `b-xii1-m11` dan modul `b-xi1-m12` (cabang, permintaan penggabungan, dan ulasan kode).

Modul ini berstatus DRAF: karangan penyusun, belum ditinjau pemilik. Butir `F-AP-c` (pemeliharaan dan kualitas kode) dipetakan silabus sebagai dipenuhi jalur ini; modul draf ini belum dihitung sebagai pemenuhan butir itu.

**Konteks semester ini.** Kelasmu mengkustomisasi profil `landing` dari `awcms-one` sebagai studi kasus: kamu hanya mengubah merek, konten, tema, SEO, dan dokumentasi, tanpa menyentuh backend. Fakta `awcms-one` dibaca dari repositori publiknya (`main`, 2026-11-20). Contoh dijalankan penyusun dengan Bun 1.4.4 dan Git 2.43.0 per 2026-11 pada salinan sementara repositori turunan; tidak ada akun dan tidak ada layanan luar. Permintaan penggabungan adalah fitur situs hosting yang tidak dibuka penyusun `[belum terverifikasi]`; di sini ulasan dilakukan lewat cabang lokal, seperti di `b-xi1-m12`. Baca-dan-prediksi `AI: tanpa AI`.

## Ingat kembali

Jawab dari ingatan dulu, baru cek di bagian kunci. Soal 1 dari `b-xii1-m11`, soal 2 dari `b-xii1-m9`, soal 3 dari `b-xii1-m4`.

1. Mengapa `README.id.md` dinyatakan basi setelah `README.md` diubah, dan apa dua langkah memperbaikinya?
2. Apa beda uji unit pada sebuah fungsi dengan uji atas hasil build?
3. Siapa menjalankan Docker dan PostgreSQL di kelas ini, dan mengapa murid tidak menyentuh backend?

## Tujuan

Setelah modul ini kamu dapat:

- meninjau kustomisasi teman dengan daftar periksa: lingkup, merek, SEO, aksesibilitas, rahasia, dan dokumen;
- menjalankan gerbang pada cabang teman dan membaca hasilnya sebagai bahan ulasan;
- menulis komentar berisi temuan, alasan, dan saran yang ditujukan ke kode, bukan ke orangnya;
- menerima ulasan atas pekerjaanmu dan menanggapinya (keluaran minggu ini: catatan ulasan).

## Prediksi dulu

Ini tugas baca-dan-prediksi, `AI: tanpa AI`. **Tebak dulu, tulis jawabanmu, baru jalankan.**

```ts
const PENANDA = /\b[A-Z0-9_]*(?:KUNCI|KEY|TOKEN|SECRET|SANDI|PASSWORD)[A-Z0-9_]*\s*[=:]\s*["']?([^\s"']+)/i;

function pindaiTambahan(diff: string): string[] {
  const temuan: string[] = [];
  diff.split("\n").forEach((baris, i) => {
    if (baris.startsWith("+") && !baris.startsWith("+++") && PENANDA.test(baris)) {
      temuan.push(`baris diff ${i + 1}: kemungkinan rahasia ditambahkan`);
    }
  });
  return temuan;
}

const diff = [
  "--- a/config.ts",
  "+++ b/config.ts",
  '-const KEY_LAMA = "KUNCI_PALSU_CONTOH_111";',
  '+const KEY_BARU = "KUNCI_PALSU_CONTOH_222";',
  "+// token dibaca dari lingkungan",
  '+const nama = "Warung Kopi Contoh";',
].join("\n");

console.log(pindaiTambahan(diff));
```

1. Apa yang tercetak, dan baris mana yang menurutmu ditandai?
2. Baris yang dihapus (`-`) memuat nilai mirip rahasia. Apakah itu juga layak menjadi temuan, dan mengapa?

## Contoh terselesaikan

Keluaran program tadi:

```text
[ "baris diff 4: kemungkinan rahasia ditambahkan" ]
```

Hanya baris keempat yang ditandai: baris tambahan dengan nama dan nilai. Komentar tentang "token" tidak berpasangan nama dan nilai, dan baris `-` bukan tambahan. Namun baris yang dihapus tetap penting bagi peninjau: nilai itu pernah ada di riwayat, sehingga harus dicabut dan diganti (modul `b-xii1-m10`).

**Satu kustomisasi, ditinjau.** Budi membuat cabang `kustomisasi-budi` pada salinan sementara repositori turunan (Warung Kopi Contoh, fiktif). Dewi, sebagai peninjau, mulai dari ukuran dan isi perubahan, memakai tiga titik seperti di `b-xi1-m12`:

```sh
git log --oneline main..kustomisasi-budi
git diff --stat main...kustomisasi-budi
```

```text
937f6f03 Kustomisasi merek: deskripsi, warna, dan README
 README.md                          | 4 ++++
 apps/storefront/src/config/site.ts | 6 ++++--
 2 files changed, 8 insertions(+), 2 deletions(-)
```

Perubahan kecil dan masuk lingkup (merek, tema, dokumen); tidak ada berkas di `apps/cms`. Lalu Dewi menjalankan gerbang di cabang itu dan memindai baris tambahan:

```sh
bun run audit:translation
bun run audit:dokumen
git diff main...kustomisasi-budi | bun pindai.ts
```

```text
audit:translation FAILED — 1 finding(s):
  - README.id.md: stale mirror — README.md changed since this was translated ...
[named-path] 1
    README.md: names `docs/panduan-kopi.md`, which does not exist in this repo
apps/storefront/src/config/site.ts: kemungkinan rahasia ditambahkan
pindai: 1 temuan
```

(Keluaran dipersingkat; `pindai.ts` memakai pola yang sama dengan fungsi di atas dan membaca diff dari masukan baku.) Temuan keempat berasal dari mata manusia: warna primer berubah dari `#6b4226` menjadi `#f5e6c8`. Dewi mengukurnya dengan rumus rasio kontras WCAG 2.2 (halaman W3C, dibuka penyusun): `(L1 + 0,05) / (L2 + 0,05)`, dengan kriteria 1.4.3 (tingkat AA) minimal 4,5:1 untuk teks biasa.

```ts
function terang(hex: string): number {
  const nilai = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
  const [r, g, b] = nilai.map((c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * (r ?? 0) + 0.7152 * (g ?? 0) + 0.0722 * (b ?? 0);
}

function rasioKontras(a: string, b: string): number {
  const [tinggi, rendah] = [terang(a), terang(b)].sort((x, y) => y - x);
  return ((tinggi ?? 0) + 0.05) / ((rendah ?? 0) + 0.05);
}

console.log(rasioKontras("#6b4226", "#ffffff").toFixed(2), rasioKontras("#f5e6c8", "#ffffff").toFixed(2));
```

```text
8.63 1.23
```

Warna lama 8,63:1; warna baru 1,23:1 terhadap putih, jauh di bawah 4,5:1 bila dipakai sebagai teks di atas putih. Di mana persisnya warna itu dipakai di tema tidak diperiksa penyusun `[belum terverifikasi]`, jadi komentar Dewi berupa pertanyaan yang disertai angka. Komentar yang baik berisi temuan, alasan, dan saran, ditujukan ke kode, dan menyebut yang sudah baik:

```text
site.ts, TOKEN_ANALITIK
Temuan: nilai mirip token ditulis langsung di kode.
Alasan: nilai yang ter-commit tinggal di riwayat dan ikut ke semua salinan.
Saran: hapus bila tidak dipakai; bila dipakai, baca dari variabel lingkungan dan ganti nilai yang sudah ter-commit.

site.ts, description
Sudah baik: deskripsi baru spesifik dan menggantikan kalimat umum bawaan template.
```

Kode buatan AI ditinjau dengan cara yang sama: dibaca, dijalankan, dan diuji, dan paket yang disarankannya diperiksa keberadaan dan reputasinya dulu. Gerbang hijau tidak menggantikan peninjau, dan gerbang merah tidak otomatis berarti pekerjaan buruk. Penerima ulasan menjawab tiap komentar: memperbaiki, atau bertanya dan menunjukkan bukti bila tidak setuju.

## Contoh setengah jadi

Lengkapi pemeriksa kontras teks biasa (kunci di bawah):

```ts setengah-jadi
function lolosTeksBiasa(rasio: number): boolean {
  return rasio ____ 4.5;
}
```

## Soal Parsons

Susun baris berikut menjadi fungsi penilai baris diff (kunci di bawah). Satu baris tidak terpakai.

```text
}
  return tambahan && PENANDA.test(baris);
function adalahTambahanRahasia(baris: string): boolean {
  return PENANDA.test(baris);
  const tambahan = baris.startsWith("+") && !baris.startsWith("+++");
```

## Latihan

1. `AI: boleh` **Catatan ulasan.** Tinjau cabang `kustomisasi-teman` yang disiapkan gurumu: jalankan `git diff --stat main...`, gerbang dokumen, dan pindai rahasia, lalu tulis tiga komentar (temuan, alasan, saran) dan satu hal yang sudah baik.
2. `AI: tanpa AI` Dari keluaran di bagian contoh, daftarkan semua temuan dan kelompokkan: lingkup, rahasia, dokumen, aksesibilitas. Mana yang menghentikan penggabungan dan mana yang pertanyaan?
3. `AI: boleh` Tulis ulang komentar "Kamu ceroboh, token kok ditaruh di kode" menjadi komentar yang ditujukan ke kode dan berisi temuan, alasan, dan saran.
4. `AI: tanpa AI` Sebuah perubahan buatan AI menambahkan paket `pemeriksa-kontras-super` ke `package.json` dan menyalin 200 baris kode. Apa tiga hal yang kamu periksa sebelum menyetujuinya?
5. `AI: boleh` (opsional) Catatan pemakaian AI: alat, tujuan, garis besar perintah, bagian yang dipakai, cara memeriksa, dan konfirmasi tanpa data pribadi atau rahasia.

## Latihan bercampur

1. `AI: boleh` (dari `b-xii1-m11`) Peninjau menemukan README Inggris diubah, cermin Indonesia belum. Tulis komentar ulasannya dan langkah perbaikan.
2. `AI: boleh` (dari `b-xii1-m9`) Cabang teman lolos semua gerbang. Apa yang tetap harus dinilai manusia, dan mengapa?

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `b-xii1-m13` (pertanyaan 1), sekitar tiga minggu lagi di `b-xii2-m1` (pertanyaan 2), dan sekitar delapan minggu lagi di semester berikutnya, modul `b-xii2-m6` (pertanyaan 3). Jawab sekarang lalu simpan.

1. Sebutkan enam hal yang diperiksa saat meninjau kustomisasi teman.
2. Mengapa baris yang dihapus pada diff yang memuat rahasia tetap menjadi temuan?
3. Bagaimana kamu menanggapi komentar ulasan yang tidak kamu setujui?

## Kesalahan umum

- **Menilai orangnya.** Komentar ditujukan ke kode, dengan alasan dan saran.
- **Hanya membaca diff.** Jalankan gerbang dan coba hasilnya.
- **Menganggap gerbang hijau berarti layak.** Gerbang hanya memeriksa yang ditulis.
- **Mencari hanya kesalahan.** Sebut juga yang sudah baik.
- **Menerima perubahan buatan AI karena terlihat rapi.** Baca, jalankan, uji, dan periksa paketnya.
- **Mengabaikan komentar yang tidak kamu setujui.** Tanyakan alasan, tunjukkan bukti, putuskan bersama guru.

## Cek mandiri

- [ ] Saya dapat meninjau kustomisasi teman dengan daftar periksa.
- [ ] Saya dapat menjalankan gerbang pada cabang teman dan membaca hasilnya.
- [ ] Saya dapat menulis komentar berisi temuan, alasan, dan saran.
- [ ] Saya dapat meninjau kode buatan AI seperti kode sejawat.
- [ ] Saya dapat menanggapi ulasan atas pekerjaanku dengan tenang dan berbukti.

## Kunci dan petunjuk

**Ingat kembali.** 1: cermin mencatat hash sumber saat diterjemahkan; setelah sumber berubah, hash tidak cocok. Perbaiki: ubah cermin, lalu `bun run docs:i18n:stamp`. 2: uji unit memeriksa fungsi tanpa membangun situs dan cepat; uji hasil build memeriksa berkas yang benar-benar dihasilkan. 3: guru; backend menyimpan rahasia dan basis data dan di luar capaian kelas, dan kelas hanya mengubah merek, konten, tema, SEO, dan dokumentasi.

**Prediksi dulu.** 1: satu baris, `baris diff 4`. 2: ya, sebagai pertanyaan: nilai itu pernah ter-commit dan masih ada di riwayat, sehingga harus dicabut dan diganti.

**Contoh setengah jadi.** Kunci: `>=`, dijalankan penyusun:

```ts
function lolosTeksBiasa(rasio: number): boolean {
  return rasio >= 4.5;
}

console.log(lolosTeksBiasa(1.23), lolosTeksBiasa(8.63), lolosTeksBiasa(4.5));
```

```text
false true true
```

**Soal Parsons.** Urutan: `function adalahTambahanRahasia(...) {`, `const tambahan = ...;`, `return tambahan && PENANDA.test(baris);`, `}`. Baris `return PENANDA.test(baris);` tidak terpakai: ia juga menandai baris yang dihapus dan baris konteks.

**Latihan.** 1: tidak ada kunci tunggal; tiap komentar punya tiga bagian dan menunjuk berkas atau baris. 2: rahasia (`TOKEN_ANALITIK`) menghentikan penggabungan; README (jalur `docs/panduan-kopi.md` tidak ada, perintah `bun run jalankan-situs` tidak ada di skrip, dan cermin basi) menghentikan penggabungan karena gerbang gagal; warna primer berupa pertanyaan bersama angka (1,23:1). Lingkup aman. 3: contoh: "Temuan: `TOKEN_ANALITIK` berisi nilai mirip token. Alasan: yang ter-commit tinggal di riwayat. Saran: baca dari `.env` dan ganti nilainya." 4: paketnya benar-benar ada, siapa pengelolanya dan seberapa dikenal, dan apakah perlu (200 baris yang disalin dibaca dan dijalankan, bukan dipercaya). 5: tidak ada kunci tunggal.

**Latihan bercampur.** 1: contoh: "Temuan: `README.md` diubah tetapi `README.id.md` belum. Alasan: `audit:translation` gagal karena cermin basi. Saran: ubah cermin, lalu `bun run docs:i18n:stamp`." 2: kelayakan isi dan keputusan: apakah deskripsi benar-benar sesuai halaman, apakah kontras terbaca, apakah perubahan masih dalam lingkup; gerbang hanya memeriksa yang sudah ditulis.

**Ulang berjarak.** 1: lingkup (hanya merek, konten, tema, SEO, dokumen), merek konsisten, SEO (judul dan deskripsi), aksesibilitas (kontras dan `alt`), rahasia, dan dokumen (cermin dan jalur); gerbang dijalankan juga. 2: nilai itu pernah ada di riwayat dan harus dicabut dan diganti, bukan hanya dihapus dari berkas. 3: tanyakan alasan komentar, tunjukkan bukti (uji, audit, angka), dan bila masih berbeda minta guru memutuskan; jangan mengabaikannya.

## Langkah berikutnya

Modul berikut: `b-xii1-m13` (proyek: menyiapkan kustomisasi untuk proyek akhir). Modul terkait: `b-xi1-m12` untuk mengulang alur cabang dan ulasan. Bacaan lanjut: halaman W3C tentang WCAG 2.2 kriteria 1.4.3, dokumentasi Git tentang `git diff`, dan bagian "Gates" di README `awcms-one`.
