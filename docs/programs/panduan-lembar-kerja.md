# Panduan Lembar Kerja Program Modul-Pelajar

- **Version:** v1.0.0
- **Last updated:** 2026-11-20
- **Status:** berlaku. Ini panduan proses penulisan, bukan konten karangan, dan bukan bukti tinjauan lembar apa pun. Dasarnya keputusan pemilik pada 2026-11-20 yang dicatat di [ADR-0011](../architecture/adr/0011-lembar-kerja-program-modul-pelajar.md) (epik [#283](https://github.com/ahliweb/cac/issues/283)).
- **Changeset:** `.changeset/lembar-kerja-infra-284.md` (minor): infrastruktur lembar kerja DRAF dan panduan ini (#284).

Panduan ini berlaku untuk lembar kerja `content/<program>/lembar/<id>.md` dan gambarnya `content/<program>/gambar/<id>-<n>.svg` pada lima program yang modulnya dibaca langsung oleh pelajar: `osn`, `smp-coding`, `sma-coding`, `kuliah-coding`, dan `dewasa-coding`. Lembar `tk-coding` dan `sd-coding` punya aturan sendiri, karena modulnya panduan guru. Bentuk lembar ini tetap meniru lembar TK/SD.

## 1. Apa itu lembar kerja

Lembar kerja adalah **satu sampai dua halaman A4 yang dicetak** dan dikerjakan pelajar dengan pensil. Satu lembar dibuat untuk tiap modul. Isinya **diambil dari modulnya sendiri**: soal ingat kembali, prediksi, contoh setengah jadi, soal susun, latihan, dan cek mandiri, lalu diringkas dan diberi ruang isian.

| Aturan | Alasan |
| --- | --- |
| Tidak ada materi, fakta, atau klaim baru. Setiap butir dapat ditunjuk asalnya di modul. | Modul sudah disetujui pemilik, sedangkan lembar masih DRAF. Lembar tidak boleh menyelundupkan isi yang belum disetujui. |
| Tidak ada kunci jawaban, petunjuk jawaban, atau keluaran yang ditanyakan. | Kunci sudah ada di modul (bagian "Kunci dan petunjuk" atau sesudah soal). Lembar dipakai untuk retrieval practice. |
| Tidak ada kolom nama, kelas, NIS, tanggal, nilai, atau identitas lain. | ADR-0004. `cac validate` menolak lembar seperti itu. |
| Tidak ada judul `# `, tidak ada bagian `## Rujukan`, dan tidak ada banner DRAF. | `cac render modul --lembar` sudah mencetak judul, banner status, dan rujukan dari indeks. |
| Sapaan sama dengan modulnya: "kamu" untuk SMP, SMA, kuliah, dan OSN, serta "Anda" untuk dewasa. | Konsistensi dengan modul. |
| Bahasa Indonesia, istilah teknis sama persis dengan modul. Kode ditulis dalam bahasa yang dipakai modul. | Konsistensi. |
| Data rekaan saja, misalnya "Toko Kue Contoh" di modul dewasa. | Privasi, ADR-0004. |

## 2. Struktur

Label ditulis tebal di awal paragraf (`**Ingat dulu:**`), seperti lembar TK/SD, **bukan** sebagai judul `##`. Urutan di bawah ini bersifat tetap. Bagian yang bahannya tidak ada di modul dilewati, dan tidak boleh dikarang.

1. **`**Ingat dulu:**`** berisi dua atau tiga soal dari "Ingat kembali" atau "Ulang berjarak", tanpa kunci.
2. **Gambar** berupa satu tautan, lalu satu baris deskripsi teks dalam backtick:

   ```markdown
   ![Teks alternatif satu kalimat yang menyebut isi gambar](../gambar/<id>-1.svg)

   `[Gambar: deskripsi lengkap untuk cetak tanpa gambar dan pembaca layar: apa di mana, apa yang ditanyakan.]`
   ```

   Gambar dipakai dalam soal, misalnya "lengkapi tabel penelusuran pada gambar" atau "beri nomor urutan langkah pada diagram". Gambar tidak boleh hanya hiasan.
3. **`**Prediksi:**`** berisi satu soal dari "Prediksi dulu", diikuti ruang isian.
4. **`**Lengkapi:**`** berisi contoh setengah jadi dari "Contoh setengah jadi", dengan bagian kosong `______`. Kode yang belum lengkap memakai info string `setengah-jadi`, misalnya ```` ```cpp setengah-jadi ````.
5. **`**Susun:**`** berisi soal Parsons dari "Soal Parsons" atau "Susun urutannya". Baris diberi label A, B, C, dan seterusnya, diikuti isian urutan.
6. **`**Latihan:**`** berisi tiga sampai lima butir dari "Latihan" atau "Latihan bercampur", dengan ruang jawab. Tanda `AI: boleh` atau `AI: tanpa AI` dari modul dipertahankan bila ada.
7. **`**Cek diri:**`** berisi dua atau tiga butir dari "Cek mandiri" sebagai daftar `- [ ] ...`.
8. **`**Catatan cetak (untuk guru, tidak dicetak):**`** menyebut berapa halaman A4, bahwa kunci ada di modul `<id>` bagian "…", dan bahwa lembar tidak memuat kolom identitas. Untuk kuliah, sebutannya "untuk dosen". Untuk dewasa, "untuk fasilitator".

Ruang isian ditulis sebagai `______` atau sebagai tabel kosong. Kode dalam lembar diperiksa `bun run check:module-code`: kode lengkap harus lolos kompilasi atau parse, sedangkan kode berlubang wajib memakai `setengah-jadi`.

## 3. Panjang per program

| Program | Panjang | Catatan |
| --- | --- | --- |
| `smp-coding` | 250-500 kata, 1-2 halaman | Blok Scratch ditulis seperti di modul, sebagai `` `ask ... and wait` ``. Tabel penelusuran di kertas diutamakan. |
| `sma-coding` | 300-600 kata, 1-2 halaman | Ikuti bahasa jalur: A C++, dan jalur lain sesuai modulnya. Modul fondasi, matkom, cloud, dan pendamping tetap mengikuti struktur yang sama. |
| `osn` | 400-800 kata, 2 halaman | Modulnya per rumpun topik dan panjang. Pilih butir dari beberapa subtopik, dengan kode C++17. |
| `kuliah-coding` | 350-900 kata, 2-3 halaman (blok kode dan tabel membuat halaman penuh lebih cepat) | Satu modul mencakup satu mata kuliah satu semester. Pilih butir yang menyebar di beberapa pertemuan atau bagian, dan sebut asal bagiannya, misalnya "(pertemuan 3)". |
| `dewasa-coding` | 300-600 kata, 1-2 halaman | Pakai sapaan "Anda" dan contoh usaha atau data rekaan dari modul. |

## 4. Gambar SVG

Berkas pertama dinamai `content/<program>/gambar/<id>-1.svg`, dan berkas berikutnya `-2`, `-3`, dan seterusnya. Setiap SVG wajib ditautkan dari lembarnya, dan `check:learner-assets` memberi peringatan bila ada SVG yatim.

| Aturan | Rincian |
| --- | --- |
| Kerangka | `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 W H" width="W" height="H" role="img" aria-labelledby="t d">`, lalu `<title id="t">`, lalu `<desc id="d">`, lalu `<rect width="W" height="H" fill="#ffffff"/>`. Lebar 480-720. |
| Isi | Sesuatu yang **ada di modul** dan dipakai soal, misalnya larik dengan indeks, tabel penelusuran, diagram alir, pohon, graf, tumpukan atau antrean, lapisan jaringan, diagram blok sistem, garis waktu, atau tata letak halaman. Gambar tidak memuat wajah, merek, logo, atau tangkapan layar. |
| Teks | `font-family="sans-serif"`, ukuran minimal 14. Istilahnya sama dengan modul. Bagian yang harus diisi pelajar dibiarkan kosong, misalnya kotak bergaris putus-putus. |
| Warna | Palet yang dipakai: `#222222` untuk garis dan teks, `#2a5d9f` biru, `#b3261e` merah, `#1b7a3d` hijau, dan `#f2f2f2` untuk isian. Makna tidak boleh hanya dibawa warna, karena lembar bisa dicetak hitam putih. Beri juga label atau pola. |
| Keamanan | Dilarang memakai `<script>`, `<image>`, `<foreignObject>`, atribut `on*`, `href` ke luar berkas, `data:`, `@import`, atau `url()` selain `#fragment`, dan dilarang memakai DOCTYPE. Ukuran maksimal 50 KB. |
| Gaya | Tulis dengan tangan, rapi, dan terbaca. Tidak ada keluaran editor grafis dan tidak ada metadata editor. |

## 5. Indeks dan status

Setiap entri `data/<program>/modules.json` mendapat dua kolom:

```json
"learnerSheetPath": "content/<program>/lembar/<id>.md",
"learnerSheetStatus": "draf"
```

Status modul (`status`, `review`) tidak diubah. AI **tidak pernah** mengubah `learnerSheetStatus` menjadi `disetujui` atau menambah `learnerSheetReview`. Persetujuan lembar adalah keputusan pemilik lewat dialog pilihan baku (ADR-0011).

## 6. Pemeriksaan sebelum PR

```bash
bun run validate
bun run check:learner-assets
bun run check:module-code
bun run privacy-check
bun test
```

Untuk satu lembar, pratinjau hasil cetaknya:

```bash
bun run src/cli/cac.ts render modul --program <program> --id <id> --lembar
```

## Changelog

| Versi | Tanggal | Perubahan |
| --- | --- | --- |
| v1.0.0 | 2026-11-20 | Dokumen baru: panduan lembar kerja dan gambar untuk lima program modul-pelajar (#284, epik #283). |
