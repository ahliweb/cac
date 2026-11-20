## Untuk siapa modul ini

Modul ini untuk murid kelas XII jalur B (Web dengan JavaScript, TypeScript, dan Bun), minggu `B-XII1-M11` silabus v1.4.1: dokumentasi dan lisensi. Prasyarat: modul `b-xii1-m10` dan fondasi `FND-X1-M2` (perangkat lunak, berkas, dan lisensi).

Modul ini berstatus DRAF: karangan penyusun, belum ditinjau pemilik. Silabus tidak memetakan butir capaian pembelajaran pada minggu ini. Bagian lisensi **bukan nasihat hukum**; pertanyaan lisensi yang sebenarnya kamu bawa ke gurumu.

**Konteks semester ini.** Kelasmu mengkustomisasi profil `landing` dari `awcms-one` sebagai studi kasus: kamu hanya mengubah merek, konten, tema, SEO, dan dokumentasi, tanpa menyentuh backend. Fakta `awcms-one` dibaca dari repositori publiknya (`main`, 2026-11-20). Contoh dijalankan penyusun dengan Bun 1.4.4 per 2026-11 pada salinan sementara repositori turunan, tanpa akun. Baca-dan-prediksi `AI: tanpa AI`; selain itu AI boleh dipakai dengan etika, tanpa data pribadi atau rahasia.

## Ingat kembali

Jawab dari ingatan dulu, baru cek di bagian kunci. Soal 1 dari `b-xii1-m10`, soal 2 dari `b-xii1-m8`, soal 3 dari `b-xii1-m3`.

1. Mengapa variabel berawalan `PUBLIC_` pada Astro tidak boleh berisi rahasia?
2. Mengapa `Disallow` di `robots.txt` bukan cara menyembunyikan halaman dari hasil pencarian, dan apa gantinya?
3. Apa yang dimiliki `apps/storefront` dan `apps/cms` masing-masing, dan mana yang boleh diubah murid di kelas ini?

## Tujuan

Setelah modul ini kamu dapat:

- memperbarui README dan dokumen turunan sehingga setiap perintah dan jalur yang ditulis benar-benar ada;
- menjaga cermin terjemahan dokumen tetap mutakhir dengan alat repositori;
- menjelaskan apa yang diwajibkan lisensi MIT dan menjaga atribusinya pada repositori turunan;
- menyebut syarat atribusi untuk konten berlisensi Creative Commons (keluaran minggu ini: dokumen proyek).

## Prediksi dulu

Ini tugas baca-dan-prediksi, `AI: tanpa AI`. **Tebak dulu, tulis jawabanmu, baru jalankan.**

```ts
const SYARAT: [string, RegExp][] = [
  ["judul lisensi", /^MIT License/m],
  ["baris hak cipta", /^Copyright \(c\) \d{4} \S+/m],
  ["kewajiban menyertakan pemberitahuan", /copyright notice and this permission notice shall be included/],
];

function periksaLisensi(teks: string): string[] {
  return SYARAT.filter(([, pola]) => !pola.test(teks)).map(([nama]) => `kurang: ${nama}`);
}

const lengkap = [
  "MIT License",
  "",
  "Copyright (c) 2026 Pemegang-Contoh",
  "",
  "Permission is hereby granted, free of charge, ... (izin dipersingkat)",
  "",
  "The above copyright notice and this permission notice shall be included in all",
  "copies or substantial portions of the Software.",
].join("\n");

const tanpaBaris = lengkap.replace("Copyright (c) 2026 Pemegang-Contoh\n", "");
const hanyaNama = "Proyek ini berlisensi MIT.";

console.log(periksaLisensi(lengkap));
console.log(periksaLisensi(tanpaBaris));
console.log(periksaLisensi(hanyaNama));
```

1. Apa tiga baris yang tercetak?
2. Mengapa menulis "berlisensi MIT" saja tidak cukup menurut pemeriksa ini?

## Contoh terselesaikan

Keluaran program tadi:

```text
[]
[ "kurang: baris hak cipta" ]
[ "kurang: judul lisensi", "kurang: baris hak cipta", "kurang: kewajiban menyertakan pemberitahuan" ]
```

**Dokumen yang benar.** README dibaca orang yang belum mengenal proyekmu, termasuk dirimu tiga bulan lagi. Isi minimalnya: apa ini dan statusnya; cara menjalankan (hanya perintah yang ada); konfigurasi (nama variabel dan petunjuk ke `.env.example`, tanpa nilai rahasia); cara berkontribusi atau meninjau; lisensi. Setiap perintah dan jalur harus ada, seperti aturan di modul `b-xi2-m10`.

**Alat di `awcms-one`.** README repositori itu menyatakan `audit:dokumen` menangkap tautan relatif mati dan jalur berkas dalam backtick yang tidak ada, dan `audit:translation` menangkap cermin terjemahan yang basi. Berkas berbahasa Inggris di jalur biasa adalah sumber; `<nama>.id.md` adalah cermin yang mencatat hash sumbernya. Pada salinan sementara repositori turunan hasil `template:init`, judul `README.md` masih `awcms-one` (daftar periksa pascainisialisasi menyebutnya langkah manual). Setelah judul `README.md` saja diubah:

```sh
bun run audit:translation
```

```text
audit:translation FAILED — 1 finding(s):
  - README.id.md: stale mirror — README.md changed since this was translated (marker sha256:5a65..., source is now sha256:021c...). Re-translate, then update the marker.
```

Perbaikannya: ubah judul di `README.id.md`, lalu `bun run docs:i18n:stamp` memperbarui penanda ("updated 1 file(s)"), dan `audit:translation` kembali `OK`. Menambahkan baris `Lihat [panduan](docs/panduan-kopi.md)` yang tidak ada ke README membuat `audit:dokumen` gagal dengan `[dead-link] 1`: `README.md: points at docs/panduan-kopi.md, which does not exist`. Hash dipotong dan keluaran dipersingkat. Pemeriksa serupa untuk jalur berkas dalam backtick:

```ts
function jalurTakAda(teks: string, ada: string[]): string[] {
  const hasil: string[] = [];
  for (const m of teks.matchAll(/`([^`\s]+\/[^`\s]+)`/g)) {
    const jalur = m[1] ?? "";
    if (!ada.includes(jalur)) hasil.push(jalur);
  }
  return hasil;
}

const readme = "Lihat `docs/status.md` dan `docs/tidak-ada.md`. Jalankan `bun test`.";
console.log(jalurTakAda(readme, ["docs/status.md", "README.md"]));
```

```text
[ "docs/tidak-ada.md" ]
```

`docs/status.md` di `awcms-one` menyatakan keadaan `awcms-one` sendiri, bukan produkmu; daftar periksa pascainisialisasi memintamu menulis ulang `docs/status.md`.

**Lisensi MIT.** Dari halaman OSI (opensource.org/license/mit) dan choosealicense.com: MIT mengizinkan penggunaan, penyalinan, perubahan, penggabungan, penerbitan, penyebaran, sublisensi, dan penjualan tanpa biaya, dengan syarat satu kalimat: `The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.` Choosealicense meringkasnya sebagai lisensi permisif yang hanya mensyaratkan pelestarian pemberitahuan hak cipta dan lisensi. Perangkat lunaknya diberikan "apa adanya", tanpa jaminan dan tanpa tanggung jawab penulis atas kerugian. Repositori `awcms-one` berlisensi MIT, dan berkas `LICENSE` serta `apps/cms/LICENSE` di salinan turunan sama-sama berjudul MIT License; README-nya menyatakan `apps/cms` membawa lisensi dan pemberitahuan hak ciptanya sendiri. Karena itu `LICENSE` tidak dihapus dari repositori turunan, dan pemberitahuan hak cipta asli tetap ada. Menambah baris untuk karyamu sendiri dan ketentuan lain `[belum terverifikasi]`: tanyakan gurumu.

**Konten bukan kode.** Gambar atau teks dengan lisensi Creative Commons Atribusi 4.0 (halaman creativecommons.org) boleh dibagikan dan diadaptasi bila kamu memberi kredit yang pantas, menautkan lisensinya, dan menyatakan bila ada perubahan. Catat itu di dokumen proyek.

## Contoh setengah jadi

Lengkapi pemeriksa jalur (kunci di bawah):

```ts setengah-jadi
function jalurTakAda(teks: string, ada: string[]): string[] {
  const hasil: string[] = [];
  for (const m of teks.matchAll(/`([^`\s]+\/[^`\s]+)`/g)) {
    const jalur = m[1] ?? "";
    if (!ada.____(jalur)) hasil.push(jalur);
  }
  return hasil;
}
```

## Soal Parsons

Susun langkah memperbarui README sampai gerbang dokumen lolos (kunci di bawah). Satu baris tidak terpakai.

```text
bun run audit:dokumen
Ubah penanda i18n-source-hash dengan tangan
bun run docs:i18n:stamp
Ubah README.id.md mengikuti perubahan
Ubah README.md
bun run audit:translation
```

## Latihan

1. `AI: boleh` **Perbarui README.** Pada repositori turunan latihan, tulis ulang judul dan paragraf pembuka README untuk organisasi fiktifmu, tambahkan bagian menjalankan, konfigurasi, dan lisensi dengan perintah yang benar-benar ada. Perbarui cermin `README.id.md`, jalankan `docs:i18n:stamp`, `audit:translation`, dan `audit:dokumen`, lalu tempel hasilnya.
2. `AI: tanpa AI` Seorang teman menghapus berkas `LICENSE` dari repositori turunan "karena ini proyek kami". Berdasarkan teks MIT di atas, apa yang keliru, dan apa yang kamu sarankan?
3. `AI: boleh` Tulis bagian atribusi untuk sebuah foto fiktif berlisensi CC BY 4.0: judul, pencipta (karangan), tautan lisensi, dan pernyataan perubahan (dipangkas).
4. `AI: tanpa AI` Dua keluaran: `audit:translation FAILED ... README.id.md: stale mirror` dan `audit:dokumen FAILED ... [dead-link] docs/panduan.md`. Untuk tiap keluaran, tulis penyebab dan perbaikannya.
5. `AI: boleh` (opsional) Catatan pemakaian AI: alat, tujuan, garis besar perintah, bagian yang dipakai, cara memeriksa, dan konfirmasi tanpa data pribadi atau rahasia.

## Latihan bercampur

1. `AI: boleh` (dari `b-xii1-m10`) README menjelaskan konfigurasi. Tulis bagian itu untuk `AWCMS_API_TOKEN` tanpa memuat nilai rahasia, dan sebut berkas mana yang memuat penunjuknya.
2. `AI: boleh` (dari `b-xii1-m8`) README menyebut `SITE_URL`. Mengapa dokumen sebaiknya menyatakan bahwa nilainya harus alamat `https` lengkap?

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `b-xii1-m12` (pertanyaan 1), sekitar tiga minggu lagi di `b-xii1-m14` (pertanyaan 2), dan sekitar delapan minggu lagi di semester berikutnya, modul `b-xii2-m5` (pertanyaan 3). Jawab sekarang lalu simpan.

1. Mengapa `README.id.md` dinyatakan basi setelah `README.md` diubah, dan apa dua langkah memperbaikinya?
2. Satu kalimat apa yang diwajibkan lisensi MIT, dan mengapa `LICENSE` tidak dihapus dari repositori turunan?
3. Apa tiga hal yang harus ada pada atribusi konten berlisensi CC BY 4.0?

## Kesalahan umum

- **Menulis perintah atau jalur dari ingatan.** Jalankan atau periksa dulu; gerbang dokumen menangkap jalur yang tidak ada.
- **Mengubah README Inggris tetapi lupa cerminnya.** Gerbang terjemahan gagal.
- **Mengubah penanda hash dengan tangan.** Penanda dicatat alat setelah cermin diperbarui.
- **Menghapus `LICENSE` atau baris hak cipta.** MIT mewajibkan pemberitahuan itu ikut pada salinan.
- **Menyebut "berlisensi MIT" tanpa berkas lisensi.** Pembaca tidak dapat memeriksanya.
- **Memakai gambar dari internet tanpa memeriksa lisensinya.** Tidak ada lisensi berarti belum boleh disalin.

## Cek mandiri

- [ ] Saya dapat menulis README dengan perintah dan jalur yang benar-benar ada.
- [ ] Saya dapat memperbarui cermin terjemahan dan lolos `audit:translation`.
- [ ] Saya dapat menjelaskan satu syarat utama MIT dan mengapa `LICENSE` dijaga.
- [ ] Saya dapat menulis atribusi untuk konten CC BY 4.0.
- [ ] Saya tahu pertanyaan lisensi yang rumit dibawa ke guru.

## Kunci dan petunjuk

**Ingat kembali.** 1: nilainya disisipkan ke kode peramban dan terbit ke setiap pengunjung. 2: perayap hanya diminta tidak menjelajahi; URL yang ditautkan dari tempat lain masih bisa diindeks tanpa deskripsi; gantinya `noindex` atau kata sandi. 3: `apps/storefront` memiliki halaman publik Astro dan tampilannya; `apps/cms` memiliki backend, basis data, dan migrasi. Murid hanya mengubah merek, konten, tema, SEO, dan dokumentasi di sisi storefront; backend dijalankan guru.

**Prediksi dulu.** 1: tiga baris seperti di bagian contoh: `[]`, lalu kurang baris hak cipta, lalu ketiganya kurang. 2: kalimat "berlisensi MIT" tidak memuat judul lisensi, baris hak cipta, maupun kewajiban menyertakan pemberitahuan; tanpa teks lisensi, pembaca tidak tahu syaratnya.

**Contoh setengah jadi.** Kunci: `includes`. Dijalankan penyusun dengan masukan lain:

```ts
function jalurTakAda(teks: string, ada: string[]): string[] {
  const hasil: string[] = [];
  for (const m of teks.matchAll(/`([^`\s]+\/[^`\s]+)`/g)) {
    const jalur = m[1] ?? "";
    if (!ada.includes(jalur)) hasil.push(jalur);
  }
  return hasil;
}

console.log(jalurTakAda("Baca `docs/a.md` dan `docs/b.md`.", ["docs/a.md"]));
```

```text
[ "docs/b.md" ]
```

**Soal Parsons.** Urutan: `Ubah README.md`, `Ubah README.id.md mengikuti perubahan`, `bun run docs:i18n:stamp`, `bun run audit:translation`, `bun run audit:dokumen`. Baris "Ubah penanda i18n-source-hash dengan tangan" tidak terpakai: alat yang mencatat penanda setelah cermin diperbarui.

**Latihan.** 1: tidak ada kunci tunggal; kriteria: judul dan pembuka baru, perintah yang benar-benar ada, cermin diperbarui, dua gerbang lolos. 2: MIT mewajibkan pemberitahuan hak cipta dan izin ikut pada semua salinan; menghapus `LICENSE` membuang pemberitahuan itu. Sarankan mengembalikannya dan menanyakan kepada guru bila ingin menambah pemberitahuan sendiri. 3: contoh: "Foto 'Cangkir kopi' oleh Pencipta-Contoh, lisensi CC BY 4.0 (https://creativecommons.org/licenses/by/4.0/); gambar dipangkas dan dikecilkan." 4: stale mirror: cermin belum mengikuti perubahan sumber; ubah cermin, jalankan `docs:i18n:stamp`, ulangi `audit:translation`. Dead link: tautan ke `docs/panduan.md` yang tidak ada; buat berkasnya atau perbaiki tautannya. 5: tidak ada kunci tunggal.

**Latihan bercampur.** 1: contoh: "`AWCMS_API_TOKEN` adalah kredensial baca-saja untuk saat build; isi di `.env` (tidak ikut repositori), lihat penunjuknya di `apps/storefront/.env.example`." 2: kanonik dan peta situs dibangun dari nilai itu; alamat yang salah atau bukan `https` mengarahkan perayap ke tempat lain, dan build tidak menolaknya.

**Ulang berjarak.** 1: cermin mencatat hash sumber saat diterjemahkan; setelah sumber berubah, hash tidak cocok. Perbaiki: ubah cermin, lalu `docs:i18n:stamp`. 2: "The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software"; tanpa `LICENSE`, pemberitahuan itu hilang dari salinanmu. 3: kredit yang pantas (pencipta dan sumber), tautan ke lisensinya, dan pernyataan bila ada perubahan.

## Langkah berikutnya

Modul berikut: `b-xii1-m12` (ulasan sejawat), tempat dokumen dan lisensi ikut diulas. Bacaan lanjut: halaman OSI dan choosealicense.com tentang MIT, halaman Creative Commons tentang CC BY 4.0, serta `docs/template.md` bagian daftar periksa pascainisialisasi di `awcms-one`.
