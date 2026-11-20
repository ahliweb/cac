## Untuk siapa modul ini

Modul ini untuk murid kelas XII jalur B (Web dengan JavaScript, TypeScript, dan Bun), minggu `B-XII2-M2` silabus v1.4.1: rancangan halaman, konten, dan struktur. Dikerjakan berkelompok dua sampai tiga orang. Prasyarat: modul `b-xii2-m1` (dokumen kebutuhan).

Modul ini berstatus DRAF: karangan penyusun, belum ditinjau pemilik. Silabus memetakan butir `F-BK-a` dan `F-LD-d` pada minggu ini; modul draf ini belum dihitung memenuhi keduanya. Keluaran minggu ini: rancangan.

**Konteks proyek akhir.** Kamu mengkustomisasi profil `landing` dari `awcms-one` sebagai studi kasus: hanya merek, konten, tema, SEO, dokumentasi, dan satu formulir kontak; lingkungan disiapkan gurumu dan backend tidak disentuh. Fakta repositori dibaca dari salinan `awcms-one` 0.20.0 (cabang `main`, 2026-11-19) yang dibangun penyusun per 2026-11-20 dengan Bun 1.4.4 dan Astro 7.4.12, tanpa Docker dan tanpa CMS (terhadap tiruan uji milik repositori itu). Semua nama dan kontak karangan. AI generatif boleh dipakai dengan etika dan dicatat, tanpa data pribadi atau rahasia.

## Ingat kembali

Jawab dari ingatan dulu, baru cek di bagian kunci. Soal 1 dari `b-xii2-m1`, soal 2 dari `b-xii1-m13`, soal 3 dari `b-xii1-m8`.

1. Mengapa catatan wawancara dihitung menurut jumlah narasumber, bukan jumlah ucapan?
2. Mengapa rencana menyatakan apa yang tidak dikerjakan, dan apa batas proyek kustomisasi ini?
3. Apa yang terjadi bila `SITE_URL` salah, dan mengapa build tetap sukses?

## Tujuan

Setelah modul ini kamu dapat:

- membaca apa yang sudah ditentukan profil `landing` dan apa yang boleh kamu rancang;
- membuat peta situs yang tiap halamannya melayani kebutuhan, dengan judul dan deskripsi;
- memilih warna merek dan mengukur kontrasnya sebelum dipakai;
- menulis rancangan yang bisa ditinjau teman (keluaran minggu ini: rancangan).

## Rencana sprint

Sprint ini menyambung `b-xii2-m1`: K1 sampai K5 menjadi bahan. Rancangan hanya sah bila ia bisa dibangun dengan batas proyek. Karena itu, baca dulu apa yang **sudah ditentukan** repositori. Dari kode dan hasil build salinan lab: beranda `landing` berisi nama situs sebagai judul, satu kalimat (tagline) di bawahnya, tombol, kartu untuk setiap halaman CMS, dan kartu kontak; halaman CMS terbit di `/halaman/<slug>`; `/kontak` adalah halaman bawaan; judul tab berbentuk "judul — nama situs"; deskripsi dipotong pada 160 karakter; dan uji repositori membatasi berkas contoh pada paling banyak empat halaman. Akibatnya, **tagline adalah satu-satunya teks bebas di beranda**: K1 (jam buka terlihat di depan) hanya bisa dipenuhi lewat tagline.

Sketsa beranda yang dicocokkan dengan hasil build, dibuka di Chrome tanpa kepala pada lebar 1200 dan 390 piksel (pada 390 piksel menu navigasi menjadi tombol):

```text
[logo P] Perpustakaan Komunitas Contoh        Beranda  Tentang  Jam layanan  Peminjaman  Privasi  Kontak
H1  Perpustakaan Komunitas Contoh
    tagline: Buka Senin sampai Jumat 09.00-16.00, Sabtu 09.00-12.00
[Hubungi Kami] [Lihat Halaman]
H2  Halaman:  [Tentang] [Jam layanan] [Peminjaman buku] [Kebijakan privasi]
H2  Kontak:   [Alamat] [Telepon] [E-mail] [WhatsApp]
```

Tulis prediksimu sebelum menjalankan skrip: berapa temuan yang akan muncul pada peta di bawah? Peta ini memuat satu halaman sengaja salah (`arsip-lama`).

```ts
type Halaman = {
  jalur: string;
  judul: string;
  deskripsi: string;
  kebutuhan: string[];
  tertautDari: string[];
};

const NAMA = "Perpustakaan Komunitas Contoh";
const tagline = "Perpustakaan komunitas fiktif. Buka Senin sampai Jumat 09.00-16.00, Sabtu 09.00-12.00.";

const peta: Halaman[] = [
  { jalur: "/", judul: NAMA, deskripsi: tagline, kebutuhan: ["K1"], tertautDari: [] },
  { jalur: "/halaman/tentang", judul: "Tentang Perpustakaan Contoh", deskripsi: "Perpustakaan Komunitas Contoh adalah perpustakaan fiktif untuk latihan.", kebutuhan: ["K3"], tertautDari: ["/"] },
  { jalur: "/halaman/jam-layanan", judul: "Jam layanan", deskripsi: "Jam buka tiap hari dan jadwal libur Perpustakaan Komunitas Contoh.", kebutuhan: ["K1", "K5"], tertautDari: ["/"] },
  { jalur: "/halaman/peminjaman-buku", judul: "Peminjaman buku", deskripsi: "Syarat dan langkah meminjam buku di Perpustakaan Komunitas Contoh.", kebutuhan: ["K2"], tertautDari: ["/"] },
  { jalur: "/halaman/kebijakan-privasi", judul: "Kebijakan privasi", deskripsi: "Situs ini tidak mengumpulkan data pengunjung.", kebutuhan: ["K3"], tertautDari: ["/"] },
  { jalur: "/kontak", judul: "Kontak", deskripsi: `Hubungi ${NAMA} melalui e-mail, telepon, atau WhatsApp.`, kebutuhan: ["K3"], tertautDari: ["/"] },
  { jalur: "/halaman/arsip-lama", judul: "Jam layanan", deskripsi: "Arsip.", kebutuhan: [], tertautDari: [] },
];

const temuan: string[] = [];
const jalur = new Set(peta.map((h) => h.jalur));
const judulDipakai = new Map<string, string>();

for (const h of peta) {
  const judulTampil = h.jalur === "/" ? h.judul : `${h.judul} — ${NAMA}`;
  if (judulTampil.length > 60) temuan.push(`${h.jalur}: judul tampil ${judulTampil.length} karakter (>60)`);
  if (h.deskripsi.trim() === "") temuan.push(`${h.jalur}: deskripsi kosong`);
  if (h.deskripsi.length > 160) temuan.push(`${h.jalur}: deskripsi ${h.deskripsi.length} karakter (>160)`);
  const sama = judulDipakai.get(h.judul);
  if (sama) temuan.push(`${h.jalur}: judul sama dengan ${sama}`);
  judulDipakai.set(h.judul, h.jalur);
  if (h.jalur !== "/" && h.tertautDari.length === 0) temuan.push(`${h.jalur}: tidak tertaut dari halaman mana pun`);
  for (const asal of h.tertautDari) if (!jalur.has(asal)) temuan.push(`${h.jalur}: tertaut dari ${asal} yang tidak ada di peta`);
  if (h.kebutuhan.length === 0) temuan.push(`${h.jalur}: tidak melayani kebutuhan mana pun`);
}

const dariCms = peta.filter((h) => h.jalur.startsWith("/halaman/")).length;
if (dariCms > 4) temuan.push(`${dariCms} halaman dari CMS (uji repositori: paling banyak 4)`);

console.log(`${peta.length} halaman`);
for (const t of temuan) console.log("TEMUAN " + t);
console.log(temuan.length === 0 ? "peta bersih" : `${temuan.length} temuan`);
```

```text
7 halaman
TEMUAN /halaman/arsip-lama: judul sama dengan /halaman/jam-layanan
TEMUAN /halaman/arsip-lama: tidak tertaut dari halaman mana pun
TEMUAN /halaman/arsip-lama: tidak melayani kebutuhan mana pun
TEMUAN 5 halaman dari CMS (uji repositori: paling banyak 4)
4 temuan
```

Empat temuan, semuanya berasal dari satu halaman yang tidak melayani kebutuhan: hapus halamannya. Peta yang bagus menolak halaman tanpa alasan.

Warna dipilih dengan angka, bukan selera. Skrip berikut menghitung rasio kontras (rumus WCAG 2.2) untuk tiga calon. Teks biasa butuh 4,5 banding 1; komponen antarmuka, seperti tepi tombol, 3 banding 1.

```ts
function kanal(c8: number): number {
  const c = c8 / 255;
  return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
}
function luminans(hex: string): number {
  const n = Number.parseInt(hex.slice(1), 16);
  return 0.2126 * kanal((n >> 16) & 255) + 0.7152 * kanal((n >> 8) & 255) + 0.0722 * kanal(n & 255);
}
export function kontras(a: string, b: string): number {
  const [terang, gelap] = [luminans(a), luminans(b)].sort((x, y) => y - x);
  return (terang + 0.05) / (gelap + 0.05);
}

const palet = [
  { nama: "primer", hex: "#0f766e" },
  { nama: "primer-muda", hex: "#2dd4bf" },
  { nama: "aksen", hex: "#b45309" },
];
for (const w of palet) {
  const diPutih = kontras(w.hex, "#ffffff");
  console.log(`${w.nama} ${w.hex} sebagai teks di latar putih: ${diPutih.toFixed(2)}:1 ${diPutih >= 4.5 ? "lolos" : "GAGAL"}`);
}
```

```text
primer #0f766e sebagai teks di latar putih: 5.47:1 lolos
primer-muda #2dd4bf sebagai teks di latar putih: 1.86:1 GAGAL
aksen #b45309 sebagai teks di latar putih: 5.02:1 lolos
```

Primer `#0f766e` lolos; versi muda `#2dd4bf` gagal. Rancangan mencatat warna yang dipilih beserta rasionya.

## Daftar periksa

- [ ] Prediksi jumlah temuan tertulis sebelum skrip dijalankan.
- [ ] Tiap halaman punya judul (di bawah 60 karakter dengan akhiran nama situs), deskripsi (di bawah 160), dan kebutuhan yang dilayani.
- [ ] Jumlah halaman CMS paling banyak empat; `/` dan `/kontak` dicatat sebagai halaman bawaan.
- [ ] K1 punya rencana lewat tagline; teks tagline sudah tertulis.
- [ ] Warna merek dan rasio kontrasnya tercatat; teks biasa minimal 4,5:1.
- [ ] Nama, alamat, dan kontak karangan; surel contoh memakai domain yang diizinkan repositori (`example.org`, lihat `b-xii2-m3`).
- [ ] Bila memakai AI: log pemakaian, tanpa data pribadi.

## Umpan balik sejawat

Tukar rancangan dengan kelompok lain dan beri ulasan dengan format: **satu yang sudah baik, satu yang perlu diperbaiki, satu langkah berikutnya**. Periksa: apakah tiap halaman melayani kebutuhan, apakah rancangan melampaui batas proyek (misalnya meminta formulir yang menyimpan data), dan apakah warnanya terukur. Bagi tugas dengan adil.

## Latihan bercampur

1. `AI: boleh` (dari `b-xii1-m8`) Dari peta, tulis judul dan deskripsi untuk halaman Peminjaman buku, lalu hitung panjangnya terhadap batas di atas.
2. `AI: tanpa AI` (dari `b-xii1-m7`) Dari tiga warna di atas, mana yang aman sebagai latar teks putih, dan mana yang hanya aman bila teksnya hitam? Hitung dengan `kontras()` untuk teks hitam.

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `b-xii2-m3` (pertanyaan 1), sekitar tiga minggu lagi di `b-xii2-m5` (pertanyaan 2), dan sekitar delapan minggu lagi di `b-xii2-m10` (pertanyaan 3). Jawab sekarang lalu simpan.

1. Sebutkan enam hal yang diperiksa pada peta situs.
2. Mengapa rancangan mencatat halaman bawaan (`/` dan `/kontak`) yang isinya tidak kamu tulis sendiri?
3. Mengapa data wawancara dalam dokumen kebutuhan harus karangan, dan apa yang kamu lakukan bila menemukan data nyata di berkasmu?

## Kesalahan umum

- **Merancang halaman yang tidak bisa dibangun.** Beranda `landing` tidak punya ruang teks bebas selain tagline.
- **Memilih warna dari selera.** Tanpa rasio, kegagalan baru tampak setelah build.
- **Judul terlalu panjang.** Akhiran nama situs ikut dihitung.
- **Halaman tanpa kebutuhan.** Halaman "arsip" menambah beban ulasan tanpa manfaat.
- **Lupa halaman bawaan.** `/kontak` sudah ada; menambah halaman "kontak" lain membuat dua halaman serupa.

## Cek mandiri

- [ ] Saya dapat menyebut apa yang sudah ditentukan profil `landing`.
- [ ] Saya dapat membuat peta situs dengan judul, deskripsi, dan kebutuhan.
- [ ] Saya dapat memilih warna dan mengukur kontrasnya.
- [ ] Saya dapat menulis rancangan yang bisa ditinjau.
- [ ] Saya meninjau rancangan teman dengan temuan, alasan, dan saran.

## Kunci dan petunjuk

**Ingat kembali.** 1: satu orang yang mengulang hal yang sama bukan banyak orang yang sepakat; hitungan narasumber berbeda lebih jujur. 2: agar semua sepakat sebelum bekerja dan agar ulasan menilai yang direncanakan; batas kustomisasi ini: merek, konten, tema, SEO, dokumentasi, bukan backend. 3: kanonik dan Open Graph menunjuk alamat yang salah, padahal build hanya membaca nilainya dan tidak memeriksa apakah alamat itu benar; karena itu ada audit setelah build.

**Rencana sprint.** Prediksi: contoh jawaban empat, tetapi penilaiannya pada alasan. Hasil skrip dijalankan penyusun (Bun 1.4.4): empat temuan dan peta berisi tujuh halaman. Perbaikan: hapus `arsip-lama` dari peta; keempat temuan hilang karena semuanya berasal dari halaman itu.

**Latihan bercampur.** 1: contoh: judul "Peminjaman buku" (15 karakter, tampil "Peminjaman buku — Perpustakaan Komunitas Contoh" 47 karakter) dan deskripsi "Syarat dan langkah meminjam buku di Perpustakaan Komunitas Contoh." (66 karakter). 2: `#0f766e` dan `#b45309` aman sebagai teks di atas putih (5,47 dan 5,02); `#2dd4bf` hanya aman dengan teks hitam (rasio sekitar 11,28 terhadap hitam, hasil `bun run` penyusun pada alat yang sama).

**Ulang berjarak.** 1: judul tampil di bawah 60 karakter, deskripsi ada, deskripsi di bawah 160, judul unik, tertaut dari halaman lain, dan melayani kebutuhan. 2: karena batas dan tampilannya sudah ditentukan kode; rancanganmu hanya bisa mengisi yang boleh diisi (tagline, halaman CMS, kontak). 3: agar tidak ada data orang nyata di repositori; bila ditemukan, hapus dari berkas dan riwayat sesuai langkah penanganan rahasia, lalu beri tahu guru.

## Langkah berikutnya

Modul berikut: `b-xii2-m3` (sprint 1: konten, yaitu menulis halaman dan memeriksanya). Bacaan lanjut: `docs/template.md` bagian "Build profiles" pada `https://github.com/ahliweb/awcms-one`.
