## Untuk siapa modul ini

Modul ini untuk murid kelas XII jalur B (Web dengan JavaScript, TypeScript, dan Bun), minggu `B-XII2-M12` silabus v1.4.1: presentasi, yaitu mendemonstrasikan proyek kustomisasimu kepada kelas. Dikerjakan berkelompok dua sampai tiga orang. Prasyarat: modul `b-xii2-m11` (ulasan sejawat).

Modul ini berstatus DRAF: karangan penyusun, belum ditinjau pemilik. Butir `F-BK-a` (proses rekayasa) dipetakan silabus sebagai dipenuhi jalur ini; modul draf ini belum dihitung memenuhinya. Keluaran minggu ini: demo. Penilaian memakai rubrik gurumu; bobot dan predikat mengikuti kebijakan sekolah `[belum terverifikasi]`.

**Konteks semester ini.** Kelasmu mengkustomisasi profil `landing` dari `awcms-one` sebagai studi kasus: hanya merek, konten, tema, SEO, dan dokumentasi, tanpa menyentuh backend (`main`, 2026-11-20). Demo dijalankan di `localhost` pada komputer lab. Contoh dijalankan penyusun dengan Bun 1.4.4 per 2026-11. Perintah `bun run build` dan `bun run serve` ada di `package.json` `awcms-one` (dibaca 2026-11-20); penyusun tidak menjalankannya pada repositori turunan `[belum terverifikasi]`, jadi gurumu yang memastikan lingkungannya. Semua nama dan konten karangan.

## Ingat kembali

Jawab dari ingatan dulu, baru cek di bagian kunci. Soal 1 dari `b-xii2-m11`, soal 2 dari `b-xii2-m9`, soal 3 dari `b-xii2-m4`.

1. Apa beda temuan yang menghentikan penggabungan dengan pertanyaan, dan mengapa ulasan juga menyebut yang sudah baik?
2. Apa yang dikirim `bun audit` ke luar komputer, dan apa arti kode keluar 1?
3. Bukti apa yang kamu tunjukkan saat mempresentasikan tampilan, selain tangkapan layar?

## Tujuan

Setelah modul ini kamu dapat:

- menyusun demo singkat yang berangkat dari tujuan pengguna, bukan dari daftar fitur;
- membagi waktu per langkah dan menyediakan cadangan untuk tiap langkah yang bergantung pada server atau jaringan;
- menyiapkan layar dan data agar tidak ada rahasia, notifikasi, atau data pribadi yang tampil;
- menyampaikan temuan ulasan dan keterbatasan proyek dengan jujur (keluaran minggu ini: demo).

## Rencana sprint

Sprint ini menyambung `b-xii2-m11`: ulasan sejawat sudah masuk dan sebagian besar sudah kamu perbaiki. Tulis rencana demo **sebelum** berlatih: apa yang ingin dilihat penonton, urutan langkah, waktu, dan apa yang kamu lakukan bila langkah gagal. Tambahkan prediksimu: langkah mana yang paling mungkin gagal?

| Bagian | Isi contoh |
| --- | --- |
| Penonton | Teman sekelas dan guru; tidak mengenal proyekmu. |
| Pesan utama | Pengunjung fiktif menemukan jam buka dan bertanya tanpa memberi data pribadi. |
| Urutan | Tujuan, beranda dan tema, formulir kontak, gerbang hijau, pelajaran. |
| Waktu | Sembilan menit tampil, satu sisa untuk transisi; tanya jawab terpisah. |
| Cadangan | Tangkapan layar atau keluaran gerbang yang disimpan, tidak bergantung pada server hidup. |
| Persiapan layar | Tutup tab lain, matikan notifikasi, jangan tampilkan `.env` atau terminal berisi rahasia. |
| Keterbatasan | Sebutkan satu hal yang belum beres dan temuan ulasan yang belum dikerjakan. |

**Rencana yang bisa diperiksa.** Fungsi berikut memeriksa rencana demo: total waktu jangan melebihi batas dan jangan nyaris tanpa sisa, tiap langkah punya hal yang ditunjukkan, dan tiap langkah punya cadangan.

```ts
type Langkah = { judul: string; menit: number; tunjukkan: string; cadangan: string };

function periksaDemo(langkah: Langkah[], batasMenit: number): string[] {
  const temuan: string[] = [];
  const total = langkah.reduce((jumlah, l) => jumlah + l.menit, 0);
  if (total > batasMenit) temuan.push(`total ${total} menit melebihi batas ${batasMenit}`);
  else if (total > batasMenit * 0.9) temuan.push(`total ${total} menit hampir tanpa sisa dari ${batasMenit}`);
  for (const l of langkah) {
    if (l.tunjukkan.trim() === "") temuan.push(`"${l.judul}": belum jelas apa yang ditunjukkan`);
    if (l.cadangan.trim() === "") temuan.push(`"${l.judul}": belum ada cadangan bila gagal`);
  }
  return temuan;
}

const demo: Langkah[] = [
  { judul: "Tujuan dan pengguna fiktif", menit: 1, tunjukkan: "satu kalimat tujuan", cadangan: "teks di slide" },
  { judul: "Beranda dan tema", menit: 2, tunjukkan: "beranda di localhost", cadangan: "tangkapan layar" },
  { judul: "Formulir kontak", menit: 2, tunjukkan: "konfirmasi tanpa penyimpanan", cadangan: "" },
  { judul: "Gerbang hijau", menit: 3, tunjukkan: "", cadangan: "keluaran yang disimpan" },
  { judul: "Pelajaran dan langkah berikutnya", menit: 1, tunjukkan: "tiga butir", cadangan: "teks di slide" },
];

const temuan = periksaDemo(demo, 9);
for (const t of temuan) console.log(t);
console.log(temuan.length, "temuan");
```

```text
total 9 menit hampir tanpa sisa dari 9
"Formulir kontak": belum ada cadangan bila gagal
"Gerbang hijau": belum jelas apa yang ditunjukkan
3 temuan
```

Perbaikan rencana contoh: tambahkan cadangan untuk formulir, isi apa yang ditunjukkan pada langkah gerbang, dan kurangi satu menit dari langkah gerbang agar ada sisa waktu. Pemeriksa ini tidak menilai isi demo; latihan di depan teman melakukannya.

## Daftar periksa

- [ ] Rencana demo ada: penonton, pesan utama, urutan, waktu, cadangan, persiapan layar, keterbatasan.
- [ ] Setiap langkah punya hal yang ditunjukkan dan cadangan yang tidak bergantung pada server atau jaringan.
- [ ] Latihan lengkap dilakukan dengan penghitung waktu dan satu teman sebagai penonton.
- [ ] Layar bersih: tab lain tertutup, notifikasi mati, tidak ada `.env`, rahasia, atau data pribadi tampil.
- [ ] Semua data di layar karangan (nama, kontak, pesan formulir).
- [ ] Temuan ulasan dan hal yang belum beres disebut jujur, termasuk yang tidak sempat dikerjakan.
- [ ] Pembagian bicara adil; tiap anggota kelompok menyampaikan sebagian.

## Umpan balik sejawat

Setelah tiap demo, penonton memberi umpan balik singkat: **satu yang sudah baik, satu yang perlu diperbaiki, satu langkah berikutnya**. Fokus pada apa yang terlihat dan terdengar, bukan pada orangnya. Catat satu pertanyaan penonton yang belum bisa kamu jawab; itu bahan portofolio dan refleksi.

## Latihan bercampur

1. `AI: boleh` (dari `b-xii2-m9`) Tulis dua kalimat yang kamu ucapkan tentang hasil ulasan keamananmu, termasuk satu hal yang tidak diperiksa.
2. `AI: boleh` (dari `b-xii2-m10`) Penonton bertanya, "Apakah situsmu menyimpan data pengunjung?" Tulis jawaban satu kalimat yang cocok dengan catatan kepatuhanmu dan tidak melebih-lebihkan.

## Ulang berjarak

Pertanyaan 1 muncul lagi di `Ingat kembali` modul `b-xii2-m13` (pertanyaan 1). Pertanyaan 2 dan 3 tidak punya modul tujuan lagi karena jalur B berakhir di `b-xii2-m14`; ulangi sendiri sekitar tiga dan delapan minggu lagi. Jawab sekarang lalu simpan.

1. Mengapa demo diberi cadangan yang tidak bergantung pada server hidup atau jaringan?
2. Mengapa layar dibersihkan dari tab, notifikasi, dan berkas rahasia sebelum presentasi?
3. Apa yang kamu lakukan bila sebuah langkah gagal di tengah demo?

## Kesalahan umum

- **Berlatih hanya di kepala.** Waktu dan kejanggalan baru terlihat saat latihan penuh.
- **Demo tanpa cadangan.** Satu galat jaringan atau server menghentikan semuanya.
- **Menampilkan semua fitur.** Pilih yang menjawab tujuan pengguna.
- **Layar tidak dibersihkan.** Notifikasi, tab pribadi, atau `.env` terlihat penonton.
- **Menyembunyikan yang belum beres.** Penonton lebih menghargai batas yang disebut jujur.
- **Satu orang yang bicara.** Bagikan peran dengan adil.

## Cek mandiri

- [ ] Saya dapat menyusun demo dari tujuan pengguna dengan waktu per langkah.
- [ ] Saya dapat menyediakan cadangan untuk setiap langkah yang bergantung pada server.
- [ ] Saya dapat membersihkan layar dan memastikan tidak ada rahasia atau data pribadi tampil.
- [ ] Saya dapat menyebut keterbatasan proyek dengan jujur.
- [ ] Saya dapat menerima pertanyaan penonton dan mencatat yang belum bisa kujawab.

## Kunci dan petunjuk

**Ingat kembali.** 1: temuan yang menghentikan harus selesai sebelum digabung; pertanyaan meminta penjelasan atau bukti; menyebut yang baik menunjukkan apa yang dipertahankan. 2: daftar paket dari `bun.lock` dikirim ke titik akhir saran keamanan npm (bukan isi kodemu); kode keluar 1 berarti ada kerentanan. 3: contoh: rasio kontras yang dihitung, hasil `periksa-tema`, dan tangkapan layar di dua lebar dengan catatan apa yang diperiksa.

**Rencana sprint.** Tabel di atas contoh; rencanamu boleh berbeda. Keluaran program: tiga temuan seperti di atas. Prediksi langkah yang paling mungkin gagal biasanya yang bergantung pada server atau jaringan, itulah alasan cadangan.

**Latihan bercampur.** 1: contoh: "Kami memeriksa rahasia, dependensi, dan masukan formulir, dan menemukan dua hal yang sudah kami perbaiki. Kami tidak memeriksa jaringan sekolah karena itu bukan milik kami." 2: contoh: "Tidak. Formulirnya hanya menampilkan konfirmasi di layar; keputusan ini tercatat di catatan kepatuhan kami dan kami tinjau ulang bila fiturnya berubah."

**Ulang berjarak.** 1: server bisa mati, jaringan putus, atau komputer lab berbeda; cadangan seperti tangkapan layar atau keluaran yang disimpan membuat pesan tetap tersampaikan. 2: notifikasi dan tab pribadi dapat membuka data pribadi, dan `.env` atau terminal berisi rahasia tidak boleh terlihat; membersihkan layar adalah bagian pengamanan. 3: umumkan singkat bahwa langkah gagal, pindah ke cadangan, dan lanjutkan; perbaiki sesudah demo, bukan di depan penonton.

## Langkah berikutnya

Modul berikut: `b-xii2-m13` (portofolio dan refleksi), tempat kamu mengarsipkan karya dan mencatat pelajaran dari demo. Bacaan lanjut: README dan `docs/template.md` di `awcms-one`, serta halaman WCAG 2.2 tentang kriteria 1.4.3.
