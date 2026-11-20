## Untuk siapa modul ini

Modul ini untuk murid kelas XII jalur B (Web dengan JavaScript, TypeScript, dan Bun), minggu `B-XII2-M10` silabus v1.4.1: privasi dan hukum, yaitu memeriksa proyekmu terhadap pokok UU ITE (beserta perubahannya), ketentuan pidana siber dalam KUHP (UU 1/2023), dan UU PDP. Dikerjakan berkelompok dua sampai tiga orang. Prasyarat: modul `b-xii2-m9`, `b-xi2-m10` (pengantar keamanan dan hukum), dan fondasi `FND-X1-M6`.

Modul ini karangan penyusun dan disetujui pemilik program pada 2026-11-20 (keputusan lewat dialog; catatan tinjauan menjadi tindak lanjut revisi). Butir `F-LD-g` (hukum) dipetakan silabus sebagai dipenuhi jalur ini, dan `F-BK-a` sebagai dipenuhi jalur ini; pemenuhan butir mengikuti pemetaan silabus, bukan status modul. Keluaran minggu ini: catatan kepatuhan.

**Bukan nasihat hukum.** Modul ini melatih mengenali pokok dan mencatat keputusan rancangan, bukan menafsirkan atau memutus perkara. Pasal hanya dikutip dari naskah resmi yang dibuka penyusun di JDIH BPK (peraturan.bpk.go.id) pada 2026-11-20; yang tidak dibuka ditandai `[belum terverifikasi]`. Peraturan dapat berubah atau diuji di pengadilan: periksa status terbaru sebelum mengutip. Semua nama dan konten karangan; formulir contoh tidak menyimpan atau mengirim data pribadi nyata. Konteksnya profil `landing` dari `awcms-one` (`main`, 2026-11-20), tanpa backend. Contoh dijalankan dengan Bun 1.4.4 per 2026-11. AI boleh dipakai dengan etika, tanpa data pribadi atau rahasia pada permintaanmu.

## Ingat kembali

Jawab dari ingatan dulu, baru cek di bagian kunci. Soal 1 dari `b-xii2-m9`, soal 2 dari `b-xii2-m7`, soal 3 dari `b-xii2-m2`.

1. Mengapa menghapus berkas rahasia dari commit terbaru tidak cukup, dan apa urutan langkah yang benar?
2. Apa itu rilis kandidat, dan apa yang tidak dibuktikannya?
3. Mengapa data wawancara dalam dokumen kebutuhan harus karangan, dan apa yang kamu lakukan bila menemukan data nyata di berkasmu?

## Tujuan

Setelah modul ini kamu dapat:

- menyebut pokok UU ITE, KUHP (UU 1/2023), dan UU PDP yang menyentuh pembuat situs, beserta sumber resminya;
- menentukan apakah proyekmu memproses data pribadi, dan mencatatnya sebagai keputusan rancangan;
- menulis catatan kepatuhan: fakta proyek, pokok yang relevan, keputusan, dan hal yang perlu ditanyakan pada guru atau ahli hukum;
- membedakan "mengenali pokok" dari "menafsirkan hukum" (keluaran minggu ini: catatan kepatuhan dan daftar periksa).

## Rencana sprint

Sprint ini menyambung `b-xii2-m9`: setelah memeriksa keamanan, kamu memeriksa data. Tulis rencana dan prediksimu lebih dulu: data apa yang menurutmu diproses situsmu? Lalu baca pokok hukum di tabel, dan jalankan daftar periksa pada fakta proyekmu.

| Peraturan (naskah dibuka 2026-11-20) | Pokok yang menyentuh pembuat situs |
| --- | --- |
| UU 11/2008 tentang ITE (diubah UU 19/2016 dan UU 1/2024) | Pasal 26 ayat (1) pada naskah asli 2008: penggunaan informasi melalui media elektronik yang menyangkut data pribadi seseorang harus atas persetujuan orang itu, kecuali ditentukan lain oleh peraturan. Pasal 26 ayat (2): yang dilanggar haknya dapat menggugat kerugian. Pasal 27 ayat (1) dan (3), 28 ayat (2), 30, 31 ayat (1) dan (2), 36, 45 ayat (1) dan (3), 45A ayat (2), 46, 47, dan 51 ayat (2) dinyatakan tidak berlaku oleh UU 1/2023 Pasal 622 ayat (1) huruf r. Bunyi Pasal 26 setelah perubahan UU 19/2016 dan UU 1/2024 tidak dibuka penyusun `[belum terverifikasi]`. |
| UU 1/2023 tentang KUHP | Naskah menyatakan berlaku setelah tiga tahun sejak diundangkan pada 2 Januari 2023 (Pasal 624), sesuai catatan silabus 2 Januari 2026. Pasal 332 ayat (1): dengan sengaja dan tanpa hak atau melawan hukum mengakses komputer dan/atau sistem elektronik milik orang lain dengan cara apa pun. Pasal 258 ayat (1): secara melawan hukum mendengarkan, merekam, atau mencatat transmisi informasi elektronik yang tidak bersifat publik. Ancaman pidananya tidak dikutip di sini. |
| UU 27/2022 tentang Pelindungan Data Pribadi | Pasal 1 butir 1: data tentang orang perseorangan yang teridentifikasi atau dapat diidentifikasi, sendiri atau dikombinasikan dengan informasi lain. Pasal 2 ayat (2): tidak berlaku bagi pemrosesan oleh perseorangan dalam kegiatan pribadi atau rumah tangga. Pasal 4: data spesifik (antara lain data anak) dan data umum (antara lain nama lengkap). Pasal 16 ayat (2): prinsip, antara lain terbatas dan spesifik, aman, serta dimusnahkan setelah masa retensi. Pasal 20 ayat (2) huruf a: persetujuan yang sah secara eksplisit sebagai salah satu dasar pemrosesan. Pasal 21 ayat (1): informasi yang disampaikan saat meminta persetujuan (tujuan, jenis data, retensi, hak subjek). Pasal 25 ayat (2): pemrosesan data anak memerlukan persetujuan orang tua atau wali. Pasal 65 ayat (1) dan (2): larangan memperoleh, mengumpulkan, atau mengungkapkan data pribadi yang bukan miliknya secara melawan hukum. Batas usia "anak" dan ketentuan peralihan tidak dibaca penyusun `[belum terverifikasi]`. |

Daftar periksa berikut mengubah fakta proyek menjadi catatan. Ia hanya penunjuk ke pasal yang sudah kamu baca, bukan pemutus.

```ts
type Profil = {
  nama: string;
  menyimpanDataPribadi: boolean;
  jenisData: string[];
  adaPersetujuanEksplisit: boolean;
  adaInformasiTujuan: boolean;
  fotoOrangYangDapatDikenali: boolean;
  skripPihakKetiga: string[];
};

function catatanKepatuhan(p: Profil): string[] {
  const catatan: string[] = [];
  if (p.menyimpanDataPribadi) {
    catatan.push(`Data ${p.jenisData.join(", ")} dikumpulkan: pastikan dasar pemrosesan (UU PDP Pasal 20 ayat (2)).`);
    if (!p.adaPersetujuanEksplisit) catatan.push("Belum ada persetujuan yang sah secara eksplisit (Pasal 20 ayat (2) huruf a).");
    if (!p.adaInformasiTujuan) catatan.push("Belum ada informasi tujuan, jenis data, dan jangka waktu (Pasal 21 ayat (1)).");
    catatan.push("Kumpulkan seperlunya dan hapus bila masa retensi habis (Pasal 16 ayat (2) huruf a dan g).");
  } else {
    catatan.push("Situs tidak menyimpan data pribadi: catat itu sebagai keputusan rancangan.");
  }
  if (p.fotoOrangYangDapatDikenali) {
    catatan.push("Foto orang yang dapat dikenali dapat termasuk data pribadi (Pasal 1 butir 1): minta izin atau ganti dengan ilustrasi.");
  }
  for (const s of p.skripPihakKetiga) {
    catatan.push(`Skrip pihak ketiga "${s}" dapat memproses data pengunjung: baca ketentuannya, atau jangan pasang.`);
  }
  return catatan;
}

const rancangan: Profil = {
  nama: "Warung Kopi Contoh (rancangan awal)",
  menyimpanDataPribadi: false,
  jenisData: [],
  adaPersetujuanEksplisit: false,
  adaInformasiTujuan: false,
  fotoOrangYangDapatDikenali: false,
  skripPihakKetiga: [],
};

const berubah: Profil = {
  ...rancangan,
  nama: "Warung Kopi Contoh (jika formulir menyimpan)",
  menyimpanDataPribadi: true,
  jenisData: ["nama", "nomor telepon"],
  fotoOrangYangDapatDikenali: true,
  skripPihakKetiga: ["penghitung-pengunjung.example"],
};

for (const p of [rancangan, berubah]) {
  console.log(p.nama);
  for (const c of catatanKepatuhan(p)) console.log("-", c);
}
```

```text
Warung Kopi Contoh (rancangan awal)
- Situs tidak menyimpan data pribadi: catat itu sebagai keputusan rancangan.
Warung Kopi Contoh (jika formulir menyimpan)
- Data nama, nomor telepon dikumpulkan: pastikan dasar pemrosesan (UU PDP Pasal 20 ayat (2)).
- Belum ada persetujuan yang sah secara eksplisit (Pasal 20 ayat (2) huruf a).
- Belum ada informasi tujuan, jenis data, dan jangka waktu (Pasal 21 ayat (1)).
- Kumpulkan seperlunya dan hapus bila masa retensi habis (Pasal 16 ayat (2) huruf a dan g).
- Foto orang yang dapat dikenali dapat termasuk data pribadi (Pasal 1 butir 1): minta izin atau ganti dengan ilustrasi.
- Skrip pihak ketiga "penghitung-pengunjung.example" dapat memproses data pengunjung: baca ketentuannya, atau jangan pasang.
```

Catatan itu tidak menyatakan situs "legal" atau "ilegal"; ia menyatakan apa yang perlu diputuskan. Keputusan terbaik untuk proyek latihan biasanya yang paling sederhana: tidak menyimpan data pribadi, memakai ilustrasi alih-alih foto orang, dan tidak memasang skrip pihak ketiga.

## Daftar periksa

- [ ] Rencana ada: data apa yang kuduga diproses, sebelum membaca pasal.
- [ ] Pasal dibaca dari naskah resmi (JDIH BPK) dan tanggal akses dicatat; yang tidak dibaca ditandai `[belum terverifikasi]`.
- [ ] Fakta proyek tercatat: formulir, foto, skrip pihak ketiga, tempat data mengalir.
- [ ] Keputusan tertulis untuk tiap fakta (tidak menyimpan, minta persetujuan, ganti, atau buang), dengan alasannya.
- [ ] Halaman kebijakan privasi, bila ada, hanya menyatakan apa yang benar-benar dilakukan situs.
- [ ] Pertanyaan yang tak terjawab dicatat untuk guru atau ahli hukum, bukan ditebak.
- [ ] Tidak ada data pribadi nyata di catatan, contoh, atau permintaan ke AI.

## Umpan balik sejawat

Tukar catatan kepatuhan dengan kelompok lain: apakah tiap keputusan punya fakta dan pokok yang tepat, apakah ada klaim hukum tanpa sumber, dan apakah catatan menyatakan keterbatasannya. Format: **satu yang sudah baik, satu yang perlu diperbaiki, satu langkah berikutnya**.

## Latihan bercampur

1. `AI: boleh` (dari `b-xii2-m9`) Pindaian rahasia menemukan `.env` yang ikut dilacak. Selain pokok keamanan, hukum apa yang relevan bila isinya data pribadi pengunjung?
2. `AI: boleh` (dari `b-xii2-m5`) Formulir latihan hanya menampilkan konfirmasi. Tulis satu kalimat keputusan rancangan tentang data di catatan kepatuhan.

## Ulang berjarak

Pertanyaan 1 muncul lagi di `Ingat kembali` modul `b-xii2-m11` (pertanyaan 1), dan pertanyaan 2 sekitar tiga minggu lagi di `b-xii2-m13` (pertanyaan 2). Pertanyaan 3 tidak punya modul tujuan lagi karena jalur B berakhir di `b-xii2-m14`; ulangi sendiri sekitar delapan minggu lagi. Jawab sekarang lalu simpan.

1. Sebutkan tiga hal yang kamu cek sebelum memasang skrip pihak ketiga (penghitung pengunjung, peta, font) dari sisi privasi.
2. Mengapa "tidak menyimpan data pribadi" dicatat sebagai keputusan rancangan, dan apa yang dicek ulang bila fitur berubah menjadi menyimpan?
3. Mengapa pasal dikutip hanya dari naskah resmi yang dibuka, dan mengapa catatanmu bukan nasihat hukum?

## Kesalahan umum

- **Mengutip pasal dari ingatan atau blog.** Pasal bisa dicabut atau diubah; buka naskah resmi.
- **Menyebut situs "aman secara hukum".** Catatan kepatuhan bukan putusan.
- **Menyalin kebijakan privasi dari situs lain.** Kebijakan harus menyatakan apa yang dilakukan situsmu.
- **Menganggap foto teman boleh dipasang karena "hanya latihan".** Pakai ilustrasi atau data karangan.
- **Menganggap UU ITE masih memuat semua pasal lama.** Sebagian pasalnya dinyatakan tidak berlaku.

## Cek mandiri

- [ ] Saya dapat menyebut pokok UU ITE, KUHP (UU 1/2023), dan UU PDP yang relevan dengan sumbernya.
- [ ] Saya dapat menentukan apakah proyekku memproses data pribadi.
- [ ] Saya dapat menulis catatan kepatuhan dengan fakta, pokok, dan keputusan.
- [ ] Saya tahu apa yang tidak boleh saya klaim: bahwa situs "legal" atau catatan ini nasihat hukum.
- [ ] Saya menandai yang belum diverifikasi.

## Kunci dan petunjuk

**Ingat kembali.** 1: cabut dan ganti rahasia di penyedia, hentikan pelacakan (`.gitignore`, `git rm --cached`), lalu bereskan repositori; commit baru tidak menghapus nilai dari riwayat. 2: keadaan ketika semua pemeriksaan yang ditulis lolos dan tidak ada temuan terbuka yang diketahui; tidak dibuktikan bahwa situs benar untuk semua pengguna atau bahwa pemeriksaannya sudah cukup. 3: agar tidak ada data orang nyata di repositori; bila ditemukan, hapus dari berkas dan riwayat sesuai langkah penanganan rahasia, lalu beri tahu guru.

**Rencana sprint.** Prediksimu boleh berbeda. Keluaran program: rancangan awal hanya satu catatan (tidak menyimpan), sedangkan versi yang menyimpan nama dan telepon menghasilkan enam catatan. Contoh keputusan: tidak menyimpan data pribadi; foto diganti ilustrasi; tanpa skrip pihak ketiga; halaman privasi menyatakan "situs ini tidak menyimpan data pribadi pengunjung". Cara memasang halaman privasi di profil `landing` bergantung pada pengaturan kelas dan ditanyakan pada guru (`halaman/[slug].astro` di `awcms-one` menyajikan halaman statis CMS; apakah tersedia tanpa `apps/cms` hidup `[belum terverifikasi]`).

**Latihan bercampur.** 1: UU PDP Pasal 16 ayat (2) huruf e (keamanan, termasuk dari pengaksesan tidak sah) dan Pasal 20 sampai 21 bila datanya dikumpulkan; Pasal 65 bila data orang lain diperoleh atau diungkapkan secara melawan hukum. Tafsirnya bukan wewenang murid. 2: contoh: "Formulir hanya menampilkan konfirmasi di layar dan tidak menyimpan atau mengirim data; keputusan ini ditinjau ulang bila ada fitur penyimpanan."

**Ulang berjarak.** 1: siapa penyedianya dan ketentuannya, data pengunjung apa yang dikirim ke sana, serta apakah ada alternatif tanpa skrip. 2: karena situs tanpa penyimpanan tidak memerlukan dasar pemrosesan, tetapi keputusan itu bisa batal; bila berubah, periksa lagi dasar pemrosesan (persetujuan), informasi tujuan dan retensi, dan keamanan. 3: pasal berubah dan dicabut, naskah resmi adalah sumbernya, dan tafsir pasal adalah wewenang ahli hukum dan pengadilan, bukan latihan siswa.

## Langkah berikutnya

Modul berikut: `b-xii2-m11` (ulasan sejawat atas proyek tim lain). Modul terkait: `cloud-keamanan-dan-privasi` dan `fondasi-keamanan-dasar`. Bacaan lanjut: halaman UU 27/2022, UU 1/2023, dan UU 11/2008 di JDIH BPK, serta pembahasan hukum bersama gurumu.
