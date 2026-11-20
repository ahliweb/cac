## Untuk siapa modul ini

Modul ini untuk murid kelas XII jalur B (Web dengan JavaScript, TypeScript, dan Bun), minggu `B-XII2-M1` silabus v1.4.1: kebutuhan pengguna, sprint pertama dari proyek akhir semester 2. Dikerjakan berkelompok dua sampai tiga orang. Prasyarat: modul `b-xii1-m13` (rencana kustomisasi).

Modul ini karangan penyusun dan disetujui pemilik program pada 2026-11-20 (keputusan lewat dialog; catatan tinjauan menjadi tindak lanjut revisi). Silabus memetakan butir `F-BK-a` dan `F-LD-d` pada minggu ini; pemenuhan butir mengikuti pemetaan silabus, bukan status modul. Keluaran minggu ini: dokumen kebutuhan.

**Konteks proyek akhir.** Kelasmu mengkustomisasi profil `landing` dari `awcms-one` sebagai studi kasus: kamu hanya mengubah merek, konten, tema, SEO, dan dokumentasi. Lingkungannya disiapkan gurumu dan kamu tidak menyentuh backend. Fakta `awcms-one` (versi 0.20.0, cabang `main` per 2026-11-19) dibaca dari repositori publiknya. Contoh dijalankan penyusun dengan Bun 1.4.4 per 2026-11. **Wawancara di modul ini hanya dengan tokoh karangan.** Semua nama, kutipan, dan organisasi ("Perpustakaan Komunitas Contoh") adalah karangan penyusun; jangan mewawancarai atau mencatat orang nyata. AI generatif boleh dipakai dengan etika dan dicatat, tanpa data pribadi atau rahasia pada permintaanmu.

## Ingat kembali

Jawab dari ingatan dulu, baru cek di bagian kunci. Soal 1 dari `b-xii1-m13`, soal 2 dari `b-xii1-m12`, soal 3 dari `b-xii1-m7`.

1. Sebutkan empat hal yang membuat sebuah tugas dalam rencana dapat diperiksa orang lain.
2. Mengapa baris yang dihapus pada diff yang memuat rahasia tetap menjadi temuan?
3. Sebutkan tiga hal yang diperiksa pada audit aksesibilitas cepat.

## Tujuan

Setelah modul ini kamu dapat:

- membedakan kebutuhan pengguna dari solusi yang sudah kamu bayangkan;
- mewawancarai tokoh karangan dengan pertanyaan terbuka dan mencatat kutipan dengan tema;
- menulis kebutuhan sebagai kalimat "ingin, agar" lengkap dengan kriteria penerimaan yang bisa diuji;
- menandai prioritas dan batas lingkup, termasuk kebutuhan yang tidak bisa dipenuhi di proyek ini (keluaran minggu ini: dokumen kebutuhan).

## Rencana sprint

Sprint ini menyambung `b-xii1-m13`: rencana satu halamanmu sudah menyebut tujuan, lingkup, dan pengguna fiktif. Sekarang pengguna fiktif itu diberi suara. Tulis **sebelum** mewawancarai: apa tiga hal yang kamu kira akan mereka minta, dan apa yang kamu kira tidak akan mereka minta. Bandingkan setelah wawancara; selisihnya adalah pelajaran.

Kebutuhan adalah hal yang ingin dicapai pengguna ("tahu kapan perpustakaan buka"), bukan fitur yang kamu pilih ("tambah widget jam"). Panduan layanan pemerintah Inggris menyarankan bentuk "sebagai ..., saya ingin ..., agar ..."; modul ini memakai bentuk ringkasnya: *ingin* dan *agar*. Tokoh karangan untuk contoh:

| Tokoh | Peran | Yang dibawa ke wawancara |
| --- | --- | --- |
| Sari Contoh | orang tua pengunjung | mencari kegiatan anak, sering datang saat tutup |
| Dimas Contoh | pelajar SMA | mencari bahan belajar lewat ponsel |
| Hadi Contoh | relawan pengurus | mengganti informasi tanpa keahlian server |

Pertanyaan wawancara dibuat terbuka ("ceritakan kunjungan terakhirmu"), tidak mengarah. Catat kutipan apa adanya, lalu beri tema. Skrip berikut menghitung tema menurut **jumlah narasumber yang berbeda**, bukan jumlah ucapan, karena satu orang yang berkali-kali mengulang hal yang sama bukan tiga orang yang sepakat.

```ts
type Catatan = { narasumber: string; peran: string; kutipan: string; tema: string };

const catatan: Catatan[] = [
  { narasumber: "Sari Contoh", peran: "orang tua pengunjung", kutipan: "Saya selalu bingung hari apa buka.", tema: "jam-buka" },
  { narasumber: "Sari Contoh", peran: "orang tua pengunjung", kutipan: "Ada buku cerita anak, tidak?", tema: "koleksi" },
  { narasumber: "Dimas Contoh", peran: "pelajar SMA", kutipan: "Saya cari jam buka lewat ponsel, sering tidak ketemu.", tema: "jam-buka" },
  { narasumber: "Dimas Contoh", peran: "pelajar SMA", kutipan: "Cara pinjam buku itu bagaimana?", tema: "cara-pinjam" },
  { narasumber: "Hadi Contoh", peran: "relawan pengurus", kutipan: "Saya tidak mau mengurus server.", tema: "perawatan" },
  { narasumber: "Hadi Contoh", peran: "relawan pengurus", kutipan: "Jam buka berubah kalau libur, harus gampang diganti.", tema: "jam-buka" },
  { narasumber: "Hadi Contoh", peran: "relawan pengurus", kutipan: "Alamat dan nomor kontak harus jelas.", tema: "kontak" },
];

const hitung = new Map<string, Set<string>>();
for (const c of catatan) {
  if (!hitung.has(c.tema)) hitung.set(c.tema, new Set());
  hitung.get(c.tema)!.add(c.narasumber);
}

const urut = [...hitung].sort((a, b) => b[1].size - a[1].size || a[0].localeCompare(b[0]));
for (const [tema, orang] of urut) {
  console.log(`${tema}: ${orang.size} narasumber (${[...orang].join(", ")})`);
}
```

```text
jam-buka: 3 narasumber (Sari Contoh, Dimas Contoh, Hadi Contoh)
cara-pinjam: 1 narasumber (Dimas Contoh)
koleksi: 1 narasumber (Sari Contoh)
kontak: 1 narasumber (Hadi Contoh)
perawatan: 1 narasumber (Hadi Contoh)
```

Tema `jam-buka` disebut empat kali tetapi oleh tiga orang; itu tetap tema terkuat.

Dari tema diturunkan dokumen kebutuhan. Setiap kebutuhan memuat *ingin*, *agar*, kriteria penerimaan (cara membuktikan bahwa kebutuhan terpenuhi), prioritas, dan penanda apakah ia masuk lingkup proyek. Skrip kedua memeriksa dokumen itu. K4 sengaja bermasalah: katalog yang bisa dicari butuh basis data dan pencarian, sedangkan proyek ini tidak menyentuh backend.

```ts
type Prioritas = "harus" | "sebaiknya" | "nanti";
type Kebutuhan = {
  id: string;
  ingin: string;
  agar: string;
  kriteria: string[];
  prioritas: Prioritas;
  dalamLingkup: boolean;
};

const dokumen: Kebutuhan[] = [
  { id: "K1", ingin: "melihat jam buka di halaman depan", agar: "tidak datang saat tutup", kriteria: ["jam buka terbaca tanpa membuka halaman lain"], prioritas: "harus", dalamLingkup: true },
  { id: "K2", ingin: "membaca cara meminjam buku", agar: "tahu syarat sebelum datang", kriteria: ["ada halaman Peminjaman", "ada langkah bernomor"], prioritas: "harus", dalamLingkup: true },
  { id: "K3", ingin: "alamat dan kontak yang jelas", agar: "bisa bertanya atau datang", kriteria: [], prioritas: "harus", dalamLingkup: true },
  { id: "K4", ingin: "mencari judul buku di situs", agar: "tahu buku tersedia", kriteria: ["hasil muncul dalam 2 detik"], prioritas: "harus", dalamLingkup: false },
  { id: "K5", ingin: "mengganti jam buka tanpa menyentuh server", agar: "relawan tidak perlu keahlian teknis", kriteria: ["perubahan cukup di berkas konten"], prioritas: "sebaiknya", dalamLingkup: true },
];

const temuan: string[] = [];
for (const k of dokumen) {
  if (k.kriteria.length === 0) temuan.push(`${k.id}: belum punya kriteria penerimaan`);
  if (k.prioritas === "harus" && !k.dalamLingkup) temuan.push(`${k.id}: wajib tetapi di luar lingkup (turunkan atau keluarkan)`);
}

const jumlah = (p: Prioritas) => dokumen.filter((k) => k.prioritas === p).length;
console.log(`harus ${jumlah("harus")}, sebaiknya ${jumlah("sebaiknya")}, nanti ${jumlah("nanti")}`);
for (const t of temuan) console.log("TEMUAN " + t);
```

```text
harus 4, sebaiknya 1, nanti 0
TEMUAN K3: belum punya kriteria penerimaan
TEMUAN K4: wajib tetapi di luar lingkup (turunkan atau keluarkan)
```

Perbaikannya: beri K3 kriteria ("alamat dan surel terbaca di halaman kontak"), dan pindahkan K4 ke `nanti` dengan catatan alasan (di luar lingkup kustomisasi).

## Daftar periksa

- [ ] Prediksi (tiga hal yang kamu kira diminta) tertulis sebelum wawancara.
- [ ] Wawancara hanya dengan tokoh karangan; tidak ada nama, kontak, atau data orang nyata.
- [ ] Pertanyaan terbuka dan tidak mengarah; kutipan dicatat apa adanya.
- [ ] Tema dihitung menurut jumlah narasumber, bukan jumlah ucapan.
- [ ] Tiap kebutuhan punya *ingin*, *agar*, minimal satu kriteria penerimaan, dan prioritas.
- [ ] Kebutuhan di luar lingkup (backend) ditandai, diturunkan, dan alasannya ditulis.
- [ ] Bila memakai AI: log pemakaian (alat, tujuan, garis besar perintah, bagian yang dipakai, cara memeriksa), tanpa data pribadi.

## Umpan balik sejawat

Tukar dokumen kebutuhan dengan kelompok lain dan beri ulasan dengan format: **satu yang sudah baik, satu yang perlu diperbaiki, satu langkah berikutnya**. Periksa: apakah kebutuhan benar-benar kebutuhan (bukan solusi), apakah kriterianya bisa diuji orang lain, dan apakah ada kebutuhan wajib yang mustahil dipenuhi. Bagi tugas dengan adil.

## Latihan bercampur

1. `AI: boleh` (dari `b-xii1-m13`) Ubah satu tugas dalam rencanamu menjadi tugas yang bisa diperiksa: tulis pemilik, jam (paling lama 4), dan kriteria selesai.
2. `AI: tanpa AI` (dari `b-xii1-m7`) Dari K1 sampai K5, mana yang menyentuh aksesibilitas, dan pemeriksaan cepat apa yang cocok untuknya?

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `b-xii2-m2` (pertanyaan 1), sekitar tiga minggu lagi di `b-xii2-m4` (pertanyaan 2), dan sekitar delapan minggu lagi di `b-xii2-m9` (pertanyaan 3). Jawab sekarang lalu simpan.

1. Mengapa catatan wawancara dihitung menurut jumlah narasumber, bukan jumlah ucapan?
2. Mengapa kebutuhan "harus" yang di luar lingkup menjadi temuan, dan apa pilihanmu terhadapnya?
3. Mengapa kriteria penerimaan ditulis sebelum halaman dibuat?

## Kesalahan umum

- **Menulis solusi sebagai kebutuhan.** "Ada kolom pencarian" adalah solusi; kebutuhannya "tahu buku tersedia".
- **Pertanyaan mengarah.** Narasumber hanya mengiyakan; jawabannya tidak berguna.
- **Mencampur tokoh karangan dengan orang nyata.** Dokumen bisa memuat data pribadi tanpa sengaja.
- **Kriteria yang tidak bisa diuji.** "Situs mudah dipakai" tidak punya cara membuktikannya.

## Cek mandiri

- [ ] Saya dapat membedakan kebutuhan dari solusi.
- [ ] Saya dapat menulis pertanyaan wawancara terbuka dan mencatat tema.
- [ ] Saya dapat menulis kebutuhan dengan kriteria penerimaan yang bisa diuji.
- [ ] Saya dapat menandai prioritas dan batas lingkup.
- [ ] Saya meninjau dokumen teman dengan temuan, alasan, dan saran.

## Kunci dan petunjuk

**Ingat kembali.** 1: pemilik, perkiraan jam kecil (paling lama 4), kriteria selesai yang terukur, dan urutan atau ketergantungannya. 2: nilai itu pernah ada di riwayat dan harus dicabut dan diganti, bukan hanya dihapus dari berkas. 3: contoh: kontras teks, teks pengganti gambar (`alt`), label kotak isian; juga urutan judul, landmark, dan operasi dengan papan ketik.

**Rencana sprint.** Tidak ada kunci tunggal untuk prediksi; periksa bahwa prediksi ditulis sebelum wawancara. Hasil kedua skrip dijalankan penyusun dengan `bun run` (Bun 1.4.4): tema `jam-buka` tiga narasumber, dan dua temuan pada dokumen. Perbaikan contoh: K3 diberi kriteria "alamat dan surel terbaca di halaman kontak"; K4 dipindah ke `nanti` karena butuh pencarian dan basis data, yang di luar lingkup.

**Latihan bercampur.** 1: contoh: "Cek tiap tautan di halaman kontak"; pemilik: anggota kelompok; 2 jam; selesai bila semua tautan terbuka. 2: K1 (teks jam buka perlu kontras cukup), K3 (tautan kontak perlu teks yang jelas), dan semua halaman perlu urutan judul yang benar; pemeriksaan cepat: kontras, `alt`, dan operasi dengan papan ketik.

**Ulang berjarak.** 1: satu orang yang mengulang hal yang sama bukan banyak orang yang sepakat; hitungan narasumber berbeda lebih jujur. 2: kebutuhan wajib yang mustahil dipenuhi membuat proyek gagal sejak awal; pilihanmu: turunkan prioritasnya atau keluarkan dari lingkup, dan tulis alasannya. 3: agar semua sepakat apa arti "selesai" sebelum bekerja dan agar pengujian menilai yang dijanjikan.

## Langkah berikutnya

Modul berikut: `b-xii2-m2` (rancangan: peta situs, judul, deskripsi, dan palet warna). Modul terkait: `pendamping-merancang-kebutuhan-sistem`. Bacaan lanjut: panduan penelitian pengguna dan penulisan *user story* pada Service Manual pemerintah Inggris, serta `docs/template.md` pada `https://github.com/ahliweb/awcms-one`.
