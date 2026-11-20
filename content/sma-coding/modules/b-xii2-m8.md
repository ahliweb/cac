## Untuk siapa modul ini

Modul ini untuk murid kelas XII jalur B (Web dengan JavaScript, TypeScript, dan Bun), minggu `B-XII2-M8` silabus v1.4.1: Sprint 3, dokumentasi, yaitu menulis dokumentasi pengguna untuk situs kustomisasimu. Dikerjakan berkelompok dua sampai tiga orang. Prasyarat: modul `b-xii2-m7` (penyempurnaan dan rilis kandidat).

Modul ini karangan penyusun dan disetujui pemilik program pada 2026-11-20 (keputusan lewat dialog; catatan tinjauan menjadi tindak lanjut revisi). Butir `F-BK-a` (proses rekayasa) dan `F-LD-f` (mengkreasi konten digital) dipetakan silabus sebagai dipenuhi jalur ini; pemenuhan butir mengikuti pemetaan silabus, bukan status modul. Keluaran minggu ini: dokumen panduan pengguna.

**Konteks semester ini.** Kelasmu mengkustomisasi profil `landing` dari `awcms-one` sebagai studi kasus: hanya merek, konten, tema, SEO, dokumentasi, dan satu formulir kontak; lingkungannya disiapkan gurumu dan kamu tidak menyentuh backend. Fakta `awcms-one` dibaca dari repositori publiknya (`main`, 2026-11-20); profil `landing` dibangun penyusun tanpa `apps/cms` hidup, terhadap tiruan uji repositori (cadangan di `b-xii1-m4`); perilakunya dengan CMS sungguhan tidak dijalankan `[belum terverifikasi]`. Contoh dijalankan penyusun dengan Bun 1.4.4 per 2026-11. **Semua nama, kontak, dan konten karangan.** AI generatif boleh dipakai dengan etika dan dicatat, tanpa data pribadi atau rahasia pada permintaanmu.

## Ingat kembali

Jawab dari ingatan dulu, baru cek di bagian kunci. Soal 1 dari `b-xii2-m7`, soal 2 dari `b-xii2-m5`, soal 3 dari `b-xii1-m11`.

1. Mengapa favicon bawaan template menjadi temuan merek, dan di mana berkasnya?
2. Mengapa FAQ tidak ada di berkas seed, dan siapa yang mengisinya di CMS lab?
3. Apa yang diwajibkan lisensi MIT pada setiap salinan, dan apa akibatnya bagi berkas `LICENSE` pada repositori turunan?

## Tujuan

Setelah modul ini kamu dapat:

- menulis panduan pengguna yang berangkat dari tujuan pembacanya, bukan dari daftar perintah alat;
- menjaga agar setiap perintah dan jalur yang ditulis di panduan benar-benar ada;
- menulis bagian "Jika gagal" yang memberi langkah pertama, bukan hanya pesan galat;
- meminta teman mengikuti panduanmu tanpa bantuan, lalu memperbaikinya (keluaran minggu ini: dokumen).

## Rencana sprint

Sprint ini menyambung `b-xii2-m7`: rilis kandidat sudah ada, tetapi hanya kelompokmu yang tahu cara mengurusnya. Tulis rencana dokumentasi **sebelum** menulis, dengan pembaca nyata: pengguna fiktif kita Pak Dodi, pemilik Warung Kopi Contoh, yang ingin mengubah jam buka tanpa memahami kode. Diátaxis menyebut panduan "bagaimana" (how-to guide) berorientasi pada tujuan dan ditulis dari sudut pandang pembaca, bukan dari operasi yang bisa dilakukan alat.

| Bagian | Isi contoh |
| --- | --- |
| Pembaca | Pak Dodi (fiktif): pemilik, bukan pemrogram, memakai komputer lab. |
| Tujuan panduan | Mengubah jam buka, memeriksa hasilnya, dan tahu apa yang dilakukan bila gagal. |
| Isi | Tiga panduan pendek: ubah jam buka, ubah warna, jalankan pemeriksaan. |
| Bukan isi | Cara kerja Astro, backend, dan data pengunjung. |
| Bukti baik | Teman yang belum pernah melihat proyek berhasil mengikutinya sampai selesai. |
| Pembagian | Ani menulis, Beni mengikuti tanpa bantuan, Cici memeriksa perintah dan cermin `README.id.md`. |
| Prediksi | Langkah yang menurut kami jelas akan membuat Beni berhenti paling sedikit sekali. Tulis tebakanmu. |

**Panduan yang bisa diperiksa.** Fungsi berikut memeriksa naskah panduan: tiap perintah `bun run` harus ada di daftar skrip, satu langkah paling banyak satu perintah, tidak ada nilai rahasia, dan harus ada bagian "Jika gagal". Daftar skrip diambil dari `package.json` akar `awcms-one` (sebagian, dibaca 2026-11-20).

```ts
const SKRIP = new Set(["dev", "build", "preview", "serve", "check", "test", "audit:dokumen", "audit:translation", "audit:rilis", "docs:i18n:stamp"]);

function periksaPanduan(markdown: string, skrip: Set<string>): string[] {
  const temuan: string[] = [];
  let adaJikaGagal = false;
  markdown.split("\n").forEach((baris, i) => {
    const no = i + 1;
    if (/^##\s+jika gagal/i.test(baris)) adaJikaGagal = true;
    const perintah = [...baris.matchAll(/`bun run ([\w:.-]+)[^`]*`/g)];
    for (const p of perintah) {
      if (!skrip.has(p[1] ?? "")) temuan.push(`baris ${no}: skrip "${p[1]}" tidak ada`);
    }
    if (/^\d+\./.test(baris) && perintah.length > 1) {
      temuan.push(`baris ${no}: satu langkah memuat ${perintah.length} perintah`);
    }
    if (/(KUNCI|SANDI|TOKEN)\w*\s*=\s*\S/.test(baris)) temuan.push(`baris ${no}: kemungkinan nilai rahasia`);
  });
  if (!adaJikaGagal) temuan.push('tidak ada bagian "Jika gagal"');
  return temuan;
}

const panduan = [
  "# Mengubah jam buka",
  "1. Buka `apps/storefront/src/config/site.ts` dan ubah jam buka.",
  "2. Jalankan `bun run check`.",
  "3. Jalankan `bun run audit:dokumen` lalu `bun run audit:translation`.",
  "4. Periksa tampilan dengan `bun run lint`.",
  "5. Isi KUNCI_ANALITIK=KUNCI_PALSU_CONTOH di berkas lokal.",
].join("\n");

const temuan = periksaPanduan(panduan, SKRIP);
for (const t of temuan) console.log(t);
console.log(temuan.length, "temuan");
```

```text
baris 4: satu langkah memuat 2 perintah
baris 5: skrip "lint" tidak ada
baris 6: kemungkinan nilai rahasia
tidak ada bagian "Jika gagal"
4 temuan
```

Pemeriksa ini hanya membaca naskah; ia tidak tahu apakah langkahnya masuk akal bagi pembaca. Itu tugas Beni, yang mengikuti panduan tanpa bantuan dan mencatat di mana ia berhenti.

## Daftar periksa

- [ ] Rencana dokumentasi ada: pembaca, tujuan, isi, bukan isi, dan bukti baik.
- [ ] Tiap panduan berangkat dari tujuan pembaca dan hanya memuat langkah bernomor, satu perintah per langkah.
- [ ] Setiap perintah dan jalur yang ditulis dijalankan atau diperiksa keberadaannya; pemeriksa naskah bersih.
- [ ] Ada bagian "Jika gagal": gejala, penyebab yang paling mungkin, langkah pertama.
- [ ] Tidak ada nilai rahasia; nama variabel boleh, nilainya tidak (`.env.example`).
- [ ] Cermin `README.id.md` diperbarui dan `bun run docs:i18n:stamp` serta `audit:translation` lolos.
- [ ] Satu teman mengikuti panduan tanpa bantuan dan catatannya diperbaiki.
- [ ] Bila memakai AI: log pemakaian (alat, tujuan, garis besar perintah, bagian yang dipakai, cara memeriksa).

## Umpan balik sejawat

Tukar panduan dengan kelompok lain dan ikuti langkahnya tanpa bertanya. Beri ulasan: **satu yang sudah baik, satu yang perlu diperbaiki, satu langkah berikutnya**. Catat persis langkah tempat kamu ragu. Efek pemrograman berpasangan pada murid SMA `[belum terverifikasi]`; bagikan tugas dengan adil.

## Latihan bercampur

1. `AI: boleh` (dari `b-xii2-m5`) Panduan menyebut "isi formulir lalu data tersimpan". Apa yang salah dari sisi privasi, dan bagaimana kalimatnya diperbaiki?
2. `AI: boleh` (dari `b-xii1-m10`) Tulis bagian panduan tentang berkas `.env` untuk variabel `SITE_URL` tanpa memuat nilai rahasia, dan sebut berkas contoh yang boleh ikut repositori.

## Ulang berjarak

Pertanyaan 1 muncul lagi di `Ingat kembali` modul `b-xii2-m9` (pertanyaan 1), dan pertanyaan 2 sekitar tiga minggu lagi di `b-xii2-m11` (pertanyaan 2). Pertanyaan 3 tidak punya modul tujuan lagi karena jalur B berakhir di `b-xii2-m14`; ulangi sendiri sekitar delapan minggu lagi. Jawab sekarang lalu simpan.

1. Mengapa satu langkah panduan hanya memuat satu perintah, dan bagaimana kamu memastikan tiap perintah yang ditulis benar-benar ada?
2. Mengapa panduan ditulis dari tujuan pembaca (misalnya "mengubah jam buka"), bukan dari daftar perintah alat?
3. Mengapa panduan memuat bagian "Jika gagal", dan apa isi minimalnya?

## Kesalahan umum

- **Menulis dari sudut mesin.** Daftar semua perintah tidak menjawab tujuan pembaca.
- **Menyalin perintah dari ingatan.** Perintah yang tidak ada baru ketahuan setelah ada yang mengikutinya.
- **Panduan yang hanya diuji penulisnya.** Penulis sudah tahu langkah yang hilang.
- **Mengubah README tanpa cermin.** Gerbang terjemahan gagal.
- **Menyalin nilai rahasia ke contoh.** Tulis nama variabel dan arahkan ke `.env.example`.

## Cek mandiri

- [ ] Saya dapat menulis panduan dari tujuan pembaca dengan langkah bernomor.
- [ ] Saya dapat memastikan semua perintah dan jalur di panduan benar-benar ada.
- [ ] Saya dapat menulis bagian "Jika gagal" yang memberi langkah pertama.
- [ ] Saya dapat meminta teman mengikuti panduan tanpa bantuan dan memperbaikinya.
- [ ] Saya dapat memperbarui cermin terjemahan setelah mengubah dokumen.

## Kunci dan petunjuk

**Ingat kembali.** 1: `template:init` hanya menulis ulang daftar berkas tertentu; ikon ada di `apps/storefront/public/favicon.svg` dan tidak termasuk daftar itu, sehingga merek lama bertahan sampai kamu menggantinya. 2: karena yang disemai hanya halaman dan profil; FAQ ada pada pengaturan toko CMS yang dikelola guru di CMS lab. 3: pemberitahuan hak cipta dan izin MIT harus ikut pada semua salinan atau bagian penting; menghapus `LICENSE` dari repositori turunan membuang pemberitahuan itu, jadi berkas dipertahankan.

**Rencana sprint.** Tabel di atas contoh; rencanamu boleh berbeda selama punya semua barisnya. Keluaran pemeriksa: empat temuan. Perbaikannya: pecah langkah 3 menjadi dua langkah, ganti `bun run lint` dengan perintah yang ada atau hapus langkahnya, ganti langkah 5 dengan "salin `.env.example` menjadi `.env`", dan tambahkan bagian "Jika gagal". Contoh bagian itu:

```text
Jika gagal
- `bun run check` melaporkan galat: baca baris pertama galat, buka berkas yang disebut, perbaiki, jalankan lagi.
- Cermin terjemahan dinyatakan basi: ubah `README.id.md` mengikuti `README.md`, lalu jalankan `bun run docs:i18n:stamp`.
- Masih macet: catat perintah dan pesan galat persis, lalu tanya guru. Jangan menempelkan nilai rahasia.
```

**Latihan bercampur.** 1: kalimat itu menyiratkan data pengunjung disimpan, padahal latihan tidak menyimpan apa pun; tulis "Isi formulir; situs menampilkan konfirmasi, pesanmu tidak disimpan." 2: contoh: "Salin `.env.example` menjadi `.env` dan isi `SITE_URL` dengan alamat `https` lengkap situsmu. Jangan bagikan `.env`; berkas ini tidak ikut repositori." (`apps/storefront/.env.example` memuat `SITE_URL`, dibaca 2026-11-20.)

**Ulang berjarak.** 1: agar tiap langkah dapat dicoba dan diperiksa tersendiri; perintahnya dicocokkan dengan `package.json` atau dijalankan sungguh-sungguh. 2: karena pembaca punya tujuan nyata dan tidak peduli alatnya; daftar perintah tidak memberi tahu urutan dan alasannya. 3: karena semua orang pasti pernah macet; isi minimalnya gejala, penyebab yang paling mungkin, dan langkah pertama.

## Langkah berikutnya

Modul berikut: `b-xii2-m9` (ulasan keamanan), yang memeriksa rahasia, dependensi, dan masukan proyekmu yang sudah berdokumen. Bacaan lanjut: halaman Diátaxis tentang how-to guides, serta README dan `docs/template.md` di `awcms-one`.
