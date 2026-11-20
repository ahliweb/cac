## Untuk siapa modul ini

Modul ini untuk murid kelas XII jalur B (Web dengan JavaScript, TypeScript, dan Bun), minggu `B-XII2-M11` silabus v1.4.1: ulasan sejawat, yaitu menilai proyek tim lain terhadap kebutuhan dan rancangannya. Dikerjakan berkelompok dua sampai tiga orang; tiap kelompok meninjau satu proyek dan ditinjau satu kelompok. Prasyarat: modul `b-xii2-m10` dan `b-xii1-m12` (ulasan sejawat semester lalu).

Modul ini karangan penyusun dan disetujui pemilik program pada 2026-11-20 (keputusan lewat dialog; catatan tinjauan menjadi tindak lanjut revisi). Butir `F-BK-a` (proses rekayasa) dipetakan silabus sebagai dipenuhi jalur ini; pemenuhan butir mengikuti pemetaan silabus, bukan status modul. Keluaran minggu ini: catatan ulasan.

**Konteks semester ini.** Kelasmu mengkustomisasi profil `landing` dari `awcms-one` sebagai studi kasus: hanya merek, konten, tema, SEO, dokumentasi, dan satu formulir kontak, tanpa menyentuh backend (`main`, 2026-11-20). Contoh dijalankan penyusun dengan Bun 1.4.4 dan Git 2.43.0 per 2026-11 di repositori sementara; tidak ada akun dan tidak ada layanan luar. Semua nama dan konten karangan. Menilai pekerjaan teman adalah menilai karya, bukan orangnya.

## Ingat kembali

Jawab dari ingatan dulu, baru cek di bagian kunci. Soal 1 dari `b-xii2-m10`, soal 2 dari `b-xii2-m8`, soal 3 dari `b-xii2-m3`.

1. Sebutkan tiga hal yang kamu cek sebelum memasang skrip pihak ketiga (penghitung pengunjung, peta, font) dari sisi privasi.
2. Mengapa panduan ditulis dari tujuan pembaca (misalnya "mengubah jam buka"), bukan dari daftar perintah alat?
3. Apa yang harus ada pada komentar ulasan untuk berkas konten teman?

## Tujuan

Setelah modul ini kamu dapat:

- meninjau proyek tim lain terhadap dokumen kebutuhan dan rancangan mereka, bukan terhadap seleramu;
- menjalankan gerbang di cabang mereka dan membaca hasilnya sebagai bahan, bukan putusan;
- menulis komentar berisi temuan, alasan, dan saran, dengan tingkat (menghentikan, pertanyaan, atau sudah baik);
- menerima ulasan atas proyekmu dan menanggapinya dengan bukti (keluaran minggu ini: catatan ulasan).

## Rencana sprint

Sprint ini menyambung `b-xii2-m10`: catatan kepatuhan sudah ada, sekarang orang lain menilai proyekmu. Tulis rencana ulasan **sebelum** membuka proyek mereka: dokumen apa yang kamu pegang (kebutuhan dan rancangan mereka), enam bidang yang kamu nilai, dan prediksimu tentang temuan terbanyak.

| Bidang | Pertanyaan peninjau |
| --- | --- |
| Kebutuhan | Apakah tiap kebutuhan tampil di situs dan dapat diperiksa selesai atau belum? |
| Konten dan merek | Apakah konten karangan sendiri atau berlisensi dan beratribusi? Merek konsisten? |
| Tampilan | Kontras dan label cukup? Tampil baik di layar sempit? |
| Fitur dan uji | Formulir berfungsi tanpa menyimpan data? Laporan uji ada? |
| Keamanan dan privasi | Laporan keamanan dan catatan kepatuhan ada dan masuk akal? |
| Dokumen | Panduan dapat diikuti, perintahnya ada, cermin terjemahan segar? |

**Memulai dari ukuran perubahan.** Seperti di `b-xi1-m12` dan `b-xii1-m12`, peninjau mulai dari daftar commit dan ringkasan perubahan di cabang teman, memakai tiga titik pada `git diff`. Di repositori sementara:

```text
$ git log --oneline main..proyek-tim-lain
a7fde1a tema hijau
1527c2f konten tahap 1
$ git diff --stat main...proyek-tim-lain
 README.md      | 1 +
 peta-situs.txt | 1 +
 src/site.ts    | 2 ++
 3 files changed, 4 insertions(+)
```

Perubahan kecil dan terbaca; peta situs ada, dan tidak ada berkas di luar lingkup. Gerbang dijalankan guru atau di mesin lab bila proyeknya diturunkan dari `awcms-one`; hasilnya bahan ulasan.

**Merangkum ulasan.** Fungsi berikut merangkum catatan ulasan: tiap komentar yang bukan pujian harus punya alasan dan saran, komentar ditujukan ke kode (bukan "kamu"), dan harus ada yang sudah baik.

```ts
type Tingkat = "henti" | "tanya" | "baik";
type Komentar = { bagian: string; tingkat: Tingkat; temuan: string; alasan: string; saran: string };

function rangkumUlasan(ulasan: Komentar[]): string[] {
  const hasil: string[] = [];
  const hitung = { henti: 0, tanya: 0, baik: 0 };
  ulasan.forEach((k, i) => {
    hitung[k.tingkat]++;
    if (k.tingkat !== "baik" && (k.alasan.trim() === "" || k.saran.trim() === "")) {
      hasil.push(`komentar ${i + 1} (${k.bagian}): lengkapi alasan dan saran`);
    }
    if (/\b(kamu|kalian)\b/i.test(k.temuan)) {
      hasil.push(`komentar ${i + 1} (${k.bagian}): tujukan ke kode, bukan ke orangnya`);
    }
  });
  if (hitung.baik === 0) hasil.push("belum ada yang sudah baik disebut");
  hasil.push(`ringkas: ${hitung.henti} menghentikan, ${hitung.tanya} pertanyaan, ${hitung.baik} sudah baik`);
  hasil.push(hitung.henti > 0 ? "putusan: perbaiki dulu" : "putusan: dapat dilanjutkan");
  return hasil;
}

const ulasan: Komentar[] = [
  { bagian: "kontak.astro", tingkat: "henti", temuan: "Pesan pengunjung ditulis ke localStorage", alasan: "Itu menyimpan data pengunjung di peramban tanpa pemberitahuan", saran: "Tampilkan konfirmasi saja dan jangan simpan" },
  { bagian: "site.ts", tingkat: "tanya", temuan: "Kamu mengganti warna primer menjadi #f5e6c8", alasan: "", saran: "" },
  { bagian: "README.md", tingkat: "baik", temuan: "Langkah panduan bernomor dan tiap perintah ada", alasan: "Orang baru dapat mengikutinya", saran: "" },
];

for (const baris of rangkumUlasan(ulasan)) console.log(baris);
```

```text
komentar 2 (site.ts): lengkapi alasan dan saran
komentar 2 (site.ts): tujukan ke kode, bukan ke orangnya
ringkas: 1 menghentikan, 1 pertanyaan, 1 sudah baik
putusan: perbaiki dulu
```

Fungsi ini memeriksa bentuk catatan, bukan isi penilaian. Apakah warna itu kurang kontras harus diukur, seperti di `b-xii1-m12`; apakah menyimpan di `localStorage` masalah bergantung pada apa yang disimpan, dan catatan kepatuhan menjawabnya.

## Daftar periksa

- [ ] Rencana ulasan ada sebelum membuka proyek: dokumen yang dipegang, bidang, prediksi.
- [ ] Tiap bidang punya sedikitnya satu bukti (perintah, keluaran, atau tangkapan layar), bukan kesan.
- [ ] Setiap komentar bukan-pujian punya temuan, alasan, saran, dan tingkat.
- [ ] Ada sedikitnya satu hal yang sudah baik, disebut dengan alasannya.
- [ ] Tidak ada rahasia atau data pribadi di catatan; komentar ditujukan ke kode.
- [ ] Tanggapan atas ulasan untuk proyekmu: memperbaiki, atau bertanya dan menunjukkan bukti.
- [ ] Bila memakai AI: log pemakaian; kode atau saran AI diperlakukan seperti kode sejawat.

## Umpan balik sejawat

Tukar catatan ulasan dengan kelompok yang kamu tinjau dan bacakan. Format untuk catatan yang kamu terima: **satu yang sudah baik, satu yang perlu diperbaiki, satu langkah berikutnya**. Pemrograman berpasangan paling banyak dibuktikan pada mahasiswa; efeknya pada murid SMA `[belum terverifikasi]`, jadi bagikan tugas dengan adil.

## Latihan bercampur

1. `AI: boleh` (dari `b-xii2-m9`) Dalam ulasan, kamu menemukan `.env` ikut dilacak di proyek teman. Tulis komentarnya dengan temuan, alasan, saran, dan tingkat.
2. `AI: boleh` (dari `b-xii2-m10`) Proyek teman memasang penghitung pengunjung pihak ketiga tanpa menyebutnya di catatan kepatuhan. Tulis komentar yang berupa pertanyaan.

## Ulang berjarak

Pertanyaan 1 muncul lagi di `Ingat kembali` modul `b-xii2-m12` (pertanyaan 1), dan pertanyaan 2 sekitar tiga minggu lagi di `b-xii2-m14` (pertanyaan 2). Pertanyaan 3 tidak punya modul tujuan lagi karena jalur B berakhir di `b-xii2-m14`; ulangi sendiri sekitar delapan minggu lagi. Jawab sekarang lalu simpan.

1. Apa beda temuan yang menghentikan penggabungan dengan pertanyaan, dan mengapa ulasan juga menyebut yang sudah baik?
2. Bagaimana kamu menanggapi komentar ulasan yang tidak kamu setujui?
3. Mengapa gerbang yang hijau tidak menggantikan peninjau manusia?

## Kesalahan umum

- **Menilai orangnya.** Tujukan komentar ke kode dengan alasan dan saran.
- **Menilai dengan selera.** Rujuk kebutuhan dan rancangan tim itu, bukan kesukaanmu.
- **Hanya mencari kesalahan.** Sebut juga yang sudah baik.
- **Komentar tanpa bukti.** "Kurang kontras" tanpa angka sulit ditanggapi.
- **Menganggap gerbang hijau berarti layak.** Gerbang hanya memeriksa yang ditulis.
- **Mengabaikan komentar yang tidak kamu terima.** Tanyakan alasan dan tunjukkan bukti.

## Cek mandiri

- [ ] Saya dapat meninjau proyek tim lain terhadap kebutuhan dan rancangannya.
- [ ] Saya dapat memulai ulasan dari ukuran perubahan dan menjalankan gerbang.
- [ ] Saya dapat menulis komentar dengan temuan, alasan, saran, dan tingkat.
- [ ] Saya dapat menanggapi ulasan atas proyekku dengan tenang dan berbukti.
- [ ] Saya dapat meninjau saran AI seperti kode sejawat.

## Kunci dan petunjuk

**Ingat kembali.** 1: siapa penyedianya dan ketentuannya, data pengunjung apa yang dikirim ke sana, serta apakah ada alternatif tanpa skrip. 2: pembaca punya tujuan nyata dan tidak peduli alatnya; daftar perintah tidak memberi tahu urutan dan alasannya. 3: lokasi (berkas dan halaman), temuan yang jelas, alasan, dan saran perbaikan; bukan sekadar "kurang bagus".

**Rencana sprint.** Tabel di atas contoh; rencana dan prediksimu boleh berbeda. Keluaran program: dua catatan perlu diperbaiki (komentar 2 tanpa alasan dan saran, serta memakai "Kamu"), ringkasan 1 menghentikan, 1 pertanyaan, 1 sudah baik, dan putusan "perbaiki dulu" karena ada satu temuan yang menghentikan. Komentar 2 diperbaiki, misalnya: "`site.ts`: warna primer `#f5e6c8` pada teks di atas putih. Alasan: rasio kontras perlu dihitung; WCAG 2.2 tingkat AA meminta minimal 4,5:1 untuk teks biasa. Saran: ukur dengan alat kontras dan ganti warna bila di bawah itu."

**Latihan bercampur.** 1: contoh: "Berkas `.env` ikut dilacak (tingkat: menghentikan). Alasan: nilainya tinggal di riwayat dan ikut ke semua salinan. Saran: hentikan pelacakan, masukkan ke `.gitignore`, ganti nilainya, dan jalankan pemindai pada riwayat." 2: contoh: "Penghitung pengunjung pihak ketiga tidak ada di catatan kepatuhan (tingkat: pertanyaan). Apa yang dikirim ke penyedianya dan sudahkah ketentuannya dibaca? Saran: catat keputusannya, atau lepas skrip itu."

**Ulang berjarak.** 1: temuan yang menghentikan berarti masalahnya harus selesai sebelum digabung; pertanyaan meminta penjelasan atau bukti. Menyebut yang baik menunjukkan mana yang dipertahankan dan membuat ulasan lebih mudah diterima. 2: tanyakan alasan, tunjukkan bukti (keluaran perintah atau rujukan ke kebutuhan), dan bila tetap berbeda, putuskan bersama guru. 3: gerbang hanya memeriksa yang diprogramkan; kebutuhan, kejelasan, dan penilaian risiko memerlukan manusia.

## Langkah berikutnya

Modul berikut: `b-xii2-m12` (presentasi), tempat kamu menunjukkan proyek yang sudah diperbaiki berdasarkan ulasan. Bacaan lanjut: panduan "How to do a code review" dari Google engineering practices dan README `awcms-one` bagian gerbang.
