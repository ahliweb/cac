## Untuk siapa modul ini

Modul ini untuk murid kelas XII jalur B (Web dengan JavaScript, TypeScript, dan Bun), minggu `B-XII1-M13` silabus v1.4.1: proyek, yaitu menyiapkan kustomisasi untuk proyek akhir semester 2. Dikerjakan berkelompok dua sampai tiga orang. Prasyarat: modul `b-xii1-m12` (dan, melalui modul itu, materi minggu 8 sampai 12 semester ini).

Modul ini berstatus DRAF: karangan penyusun, belum ditinjau pemilik. Silabus tidak memetakan butir capaian pembelajaran pada minggu ini. Penilaian memakai rubrik gurumu. Keluaran minggu ini: rencana kerja, belum hasil jadi.

**Konteks semester ini.** Kelasmu mengkustomisasi profil `landing` dari `awcms-one` sebagai studi kasus: kamu hanya mengubah merek, konten, tema, SEO, dan dokumentasi; lingkungannya disiapkan gurumu dan kamu tidak menyentuh backend. Fakta `awcms-one` dibaca dari repositori publiknya (`main`, 2026-11-20). Contoh dijalankan penyusun dengan Bun 1.4.4 per 2026-11 pada salinan sementara repositori turunan. **Semua nama, kontak, dan konten karangan**; tidak ada data orang atau organisasi nyata. AI generatif boleh dipakai dengan etika dan dicatat, tanpa data pribadi atau rahasia pada permintaanmu.

## Ingat kembali

Jawab dari ingatan dulu, baru cek di bagian kunci. Soal 1 dari `b-xii1-m12`, soal 2 dari `b-xii1-m10`, soal 3 dari `b-xii1-m5`.

1. Sebutkan enam hal yang diperiksa saat meninjau kustomisasi teman.
2. Rahasia terlanjur ter-commit: sebutkan langkah yang benar berurutan, dan mengapa menghapus commit saja tidak cukup.
3. Apa fungsi `--dry-run`, dan kapan `--yes` diperlukan pada `template:init`?

## Tujuan

Setelah modul ini kamu dapat:

- menyatakan lingkup kustomisasi: apa yang dikerjakan dan apa yang tidak (backend tidak disentuh);
- memecah pekerjaan menjadi tugas kecil yang punya pemilik, perkiraan jam, dan kriteria selesai;
- mencatat garis dasar: gerbang yang hijau sebelum mulai;
- menulis rencana kerja satu halaman yang dapat dinilai teman (keluaran minggu ini: rencana proyek).

## Rencana sprint

Rencana ini menyambung minggu sebelumnya: catatan ulasan di `b-xii1-m12` menjadi masukan, dan rencana ini menjadi bahan `b-xii2-m1` (kebutuhan pengguna) dan seterusnya. Tulis rencana satu halaman **sebelum** mengubah apa pun: tujuan, pengguna fiktif, lingkup, tugas, kriteria selesai, risiko, dan prediksimu. Contoh terselesaikan untuk "Warung Kopi Contoh" (situs profil fiktif di atas profil `landing`):

| Bagian | Isi contoh |
| --- | --- |
| Tujuan | Situs profil tiga halaman (Beranda, Layanan, Kontak) yang jelas, aksesibel, dan mudah ditemukan. |
| Pengguna | Pengunjung fiktif yang mencari jam buka dan menu. |
| Lingkup | Dikerjakan: merek, konten, tema, SEO, dokumentasi. Tidak dikerjakan: `apps/cms`, basis data, formulir yang menyimpan data pribadi. |
| Konten | Teks karangan sendiri; foto hanya yang berlisensi jelas dan dicatat atribusinya (modul `b-xii1-m11`). |
| Merek | Nama, warna, dan kontak karangan (`.example`); warna diukur kontrasnya (modul `b-xii1-m12`). |
| Garis dasar | Gerbang di `main` hijau sebelum mulai. |
| Pembagian | Ani: SEO dan konten. Beni: tema dan kontras. Cici: dokumen dan cermin. Satu cabang per orang; ulasan silang. |
| Risiko | Cermin terjemahan basi; rahasia tak sengaja; warna kurang kontras. |
| Kriteria selesai | Audit SEO bersih; kontras teks minimal 4,5:1; gerbang dokumen lolos; tidak ada rahasia di diff; ulasan teman terjawab. |
| Prediksi | Kontras warna baru perlu satu kali diperbaiki; dokumen paling sering memicu gagal gerbang. Tulis tebakanmu. |

**Garis dasar.** Pada salinan sementara repositori turunan hasil `template:init --profil landing` (dari `main` per 2026-11-20), penyusun mencatat sebelum mengubah apa pun: `bun run check` melaporkan 0 galat, 0 peringatan, 41 petunjuk; `bun test` melaporkan 1820 lolos, 3 dilewati, 0 gagal; `audit:dokumen`, `audit:rilis`, dan `audit:translation` lolos. Dengan garis dasar ini, kegagalan yang muncul kemudian jelas berasal dari perubahanmu.

**Tugas yang bisa diperiksa.** Fungsi berikut memeriksa daftar tugas: tiap tugas punya kriteria selesai, tidak lebih dari 4 jam, dan beban satu orang tidak melebihi kapasitas.

```ts
type Tugas = { nama: string; pemilik: string; jam: number; selesaiBila: string };

function periksaRencana(tugas: Tugas[], kapasitasJam: number): string[] {
  const temuan: string[] = [];
  const beban = new Map<string, number>();
  for (const t of tugas) {
    if (t.selesaiBila.trim() === "") temuan.push(`"${t.nama}": belum ada kriteria selesai`);
    if (t.jam > 4) temuan.push(`"${t.nama}": ${t.jam} jam, pecah menjadi tugas paling lama 4 jam`);
    beban.set(t.pemilik, (beban.get(t.pemilik) ?? 0) + t.jam);
  }
  for (const [pemilik, jam] of beban) {
    if (jam > kapasitasJam) temuan.push(`${pemilik}: beban ${jam} jam melebihi kapasitas ${kapasitasJam}`);
  }
  return temuan;
}

const rencana: Tugas[] = [
  { nama: "Tulis judul dan deskripsi tiap halaman", pemilik: "Ani", jam: 2, selesaiBila: "audit SEO bersih" },
  { nama: "Ganti warna dan periksa kontras", pemilik: "Beni", jam: 3, selesaiBila: "rasio teks minimal 4,5:1" },
  { nama: "Perbarui README dan cermin", pemilik: "Cici", jam: 2, selesaiBila: "" },
  { nama: "Susun seluruh konten halaman Layanan", pemilik: "Ani", jam: 6, selesaiBila: "teks bersumber dan dibaca teman" },
  { nama: "Pindai rahasia pada diff", pemilik: "Ani", jam: 1, selesaiBila: "pindai bersih" },
];

for (const t of periksaRencana(rencana, 8)) console.log(t);
```

```text
"Perbarui README dan cermin": belum ada kriteria selesai
"Susun seluruh konten halaman Layanan": 6 jam, pecah menjadi tugas paling lama 4 jam
Ani: beban 9 jam melebihi kapasitas 8
```

Tiga temuan itu perbaikan untuk rencana: beri Cici kriteria selesai, pecah tugas konten, dan geser sebagian beban Ani. Angka kapasitas dan jam hanyalah perkiraan.

## Daftar periksa

- [ ] Rencana satu halaman ada sebelum perubahan pertama dan disepakati kelompok.
- [ ] Lingkup menyebut apa yang tidak dikerjakan (backend tidak disentuh).
- [ ] Nama, kontak, dan konten karangan; foto dan teks pinjaman punya lisensi dan atribusi.
- [ ] Garis dasar dicatat: perintah gerbang dan hasilnya sebelum mulai.
- [ ] Tiap tugas punya pemilik, perkiraan jam paling lama 4, dan kriteria selesai.
- [ ] Rencana memuat langkah SEO, kontras, rahasia, dokumen, dan ulasan silang.
- [ ] Tidak ada rahasia di rencana atau di repositori; `.env` di `.gitignore`.
- [ ] Bila memakai AI: log pemakaian (alat, tujuan, garis besar perintah, bagian yang dipakai, cara memeriksa).

## Umpan balik sejawat

Tukar rencana dengan kelompok lain dan beri ulasan dengan format: **satu yang sudah baik, satu yang perlu diperbaiki, satu langkah berikutnya**. Periksa: apakah lingkup jelas, apakah tiap tugas bisa dinilai selesai atau belum, apakah beban merata, dan apa risiko yang terlewat. Pemrograman berpasangan paling banyak dibuktikan pada mahasiswa; efeknya pada murid SMA `[belum terverifikasi]`, jadi bagikan tugas dengan adil.

## Latihan bercampur

1. `AI: boleh` (dari `b-xii1-m9`) Dari gerbang yang kamu catat, tentukan mana yang dijalankan setelah tiap tugas dan mana hanya di akhir sprint, beserta alasannya.
2. `AI: boleh` (dari `b-xii1-m11`) Untuk tiap tugas di rencanamu, tulis dokumen apa yang ikut diperbarui, dan siapa yang memeriksa cerminnya.

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `b-xii1-m14` (pertanyaan 5), sekitar tiga minggu lagi di `b-xii2-m2` (pertanyaan 2), dan sekitar delapan minggu lagi di semester berikutnya, modul `b-xii2-m7` (pertanyaan 3). Jawab sekarang lalu simpan.

1. Sebutkan empat hal yang membuat sebuah tugas dalam rencana dapat diperiksa orang lain.
2. Mengapa rencana menyatakan apa yang tidak dikerjakan, dan apa batas proyek kustomisasi ini?
3. Mengapa gerbang hijau di `main` dicatat sebagai garis dasar sebelum mulai?

## Kesalahan umum

- **Langsung mengubah file.** Tanpa rencana, lingkup melebar dan ulasan sulit.
- **Tugas besar tanpa kriteria selesai.** Tidak ada yang tahu kapan selesai.
- **Menyentuh backend.** Di luar lingkup dan lingkungan kelas; catat sebagai usulan.
- **Konten pinjaman tanpa sumber dan lisensi.** Belum boleh disalin.
- **Tidak mencatat garis dasar.** Kegagalan lama dan baru tercampur.
- **Beban tidak merata.** Satu orang mengerjakan semuanya; tulis siapa mengerjakan apa.

## Cek mandiri

- [ ] Saya dapat menyatakan lingkup dan batas kustomisasi.
- [ ] Saya dapat memecah pekerjaan menjadi tugas dengan pemilik, jam, dan kriteria selesai.
- [ ] Saya dapat mencatat garis dasar gerbang sebelum mulai.
- [ ] Saya dapat menulis rencana satu halaman yang dapat dinilai teman.
- [ ] Saya meninjau rencana teman dengan temuan, alasan, dan saran.

## Kunci dan petunjuk

**Ingat kembali.** 1: lingkup (hanya merek, konten, tema, SEO, dokumen), merek konsisten, SEO, aksesibilitas, rahasia, dan dokumen; gerbang dijalankan juga. 2: cabut dan ganti rahasia di penyedia, lalu hentikan pelacakan (`.gitignore`, `git rm --cached`) dan commit; commit yang menghapus berkas tidak menghapus nilainya dari riwayat. 3: `--dry-run` mencetak rencana perubahan dan tidak mengubah apa pun; `--yes` diperlukan untuk melanjutkan pada pohon kerja yang belum bersih, dan pada kode yang dibaca penyusun juga untuk menjalankan `template:init` di repositori yang `package.json`-nya masih bernama `awcms-one` (keadaan repositori turunan sebelum inisialisasi pertama). (Jawaban ini dari kode `tools/template-init/run.mjs`, per 2026-11-20.)

**Rencana sprint.** Tabel di atas contoh jawaban; rencanamu boleh berbeda selama punya semua barisnya. Contoh dijalankan penyusun: fungsi memberi tiga temuan pada rencana contoh. Perbaikannya: isi kriteria selesai Cici ("`audit:translation` dan `audit:dokumen` lolos"), pecah tugas konten menjadi dua tugas 3 jam, dan pindahkan tugas pindai ke Beni.

**Latihan bercampur.** 1: contoh: audit SEO dan uji unit cepat setelah tiap tugas; `bun test` penuh (sekitar dua menit pada mesin penyusun) dan `bun run check` di akhir sprint; gerbang dokumen setelah tiap perubahan README. 2: contoh: tugas SEO: tidak ada dokumen; tugas warna: bagian tema di README; tugas README: cermin `README.id.md` oleh Cici dan ditinjau Ani.

**Ulang berjarak.** 1: pemilik, perkiraan jam kecil (paling lama 4), kriteria selesai yang terukur, dan urutan atau ketergantungannya. 2: agar semua sepakat sebelum bekerja dan agar ulasan menilai yang direncanakan; batas kustomisasi ini: merek, konten, tema, SEO, dokumentasi, bukan backend. 3: agar kegagalan yang muncul kemudian jelas berasal dari perubahanmu.

## Langkah berikutnya

Modul berikut: `b-xii1-m14` (asesmen dan refleksi semester 1 kelas XII), yang menilai materi minggu 8 sampai 13 tanpa AI. Semester berikutnya dimulai dengan `b-xii2-m1` (kebutuhan pengguna). Bacaan lanjut: bagian "Gates" di README `awcms-one` dan `docs/template.md` bagian "Post-init checklist".
