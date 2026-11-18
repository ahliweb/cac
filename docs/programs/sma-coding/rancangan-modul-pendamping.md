# Rancangan Modul Pendamping Literasi Digital (SMA Coding)

- **Version:** v0.2.0
- **Last updated:** 2026-11-19
- **Status:** Rancangan DISETUJUI pemilik 2026-11-19 beserta keenam rekomendasi (issue #69); modul belum ada di repositori (menunggu skema indeks #106); modul yang kelak ditulis berstatus draf sampai ditinjau pemilik
- **Changeset:** Mencatat persetujuan rancangan oleh pemilik (2026-11-19, enam rekomendasi); rujukan silabus diperbarui ke v1.1 yang sudah disetujui; pertanyaan terbuka ditandai terjawab; celah F-LD-d dan F-LD-e jalur A dicatat sebagai issue #105.

> **Rancangan disetujui pemilik pada 2026-11-19** (dialog pilihan, dicatat
> di komentar issue #69) beserta **keenam rekomendasi** di bagian 8. Yang
> disetujui adalah **rancangan**; **modulnya belum ditulis ke repositori**
> dan modul yang kelak ditulis berstatus `draf` sampai pemilik meninjau dan
> menyetujuinya per modul (ADR-0007). Dokumen ini adalah konten karangan
> menurut [ADR-0007](../../architecture/adr/0007-authored-learning-content.md),
> bukan transkripsi sumber resmi. Rujukan silabus kini [v1.1](silabus.md)
> (disetujui 2026-11-19). Pengindeksan modul menunggu skema indeks sma-coding
> (#106). Celah F-LD-d dan F-LD-e untuk jalur A dicatat sebagai issue
> terpisah (#105).

## 0. Cara membaca dokumen ini

- `[asumsi]` berarti keputusan perancangan penyusun, bukan data resmi.
- Kode butir CP (mis. `E-LD-b`) dipakai persis seperti di
  [silabus.md bagian 1.4](silabus.md); dokumen ini tidak membuat kode butir
  baru. Kutipan CP di bagian 3 disalin dari silabus bagian 1.3 (yang
  bersumber dari *Panduan Mata Pelajaran Informatika, Fase D – F*, BSKAP,
  2025, dicek 2026-11-18); hanya spasi dan pemenggalan baris yang
  dinormalkan.
- `FND-X1-M<n>` adalah kode minggu blok fondasi kelas X yang diusulkan di
  [usulan-fondasi-kelas-x.md](usulan-fondasi-kelas-x.md) dan kini diterapkan
  di silabus v1.1 bagian 3.0 serta `data/sma-coding/foundation.json`
  (issue #92, disetujui 2026-11-19).
- Satu pertemuan = 3 JP x 45 menit per minggu (silabus bagian 2, ditetapkan
  pemilik 2026-11-18). Durasi di dokumen ini dinyatakan dalam JP `[asumsi]`.

## 1. Tujuan

Silabus coding memuat butir CP yang tidak tercapai lewat coding. Keputusan
pemilik 2026-11-18 (#52, silabus bagian 4.3 dan 9 no. 3): butir itu dicakup
lewat **modul pendamping** literasi digital. Dokumen ini merancang daftar
modul, pemetaan butir CP ke modul, kelas, durasi, bentuk kegiatan, serta cara
pelaksanaannya tanpa menambah minggu wajib, agar pemilik dapat memutuskan
sebelum modul ditulis.

Keputusan pemilik (2026-11-18, dicatat di issue #86) yang menyempitkan
cakupan: blok fondasi tujuh minggu di kelas X mencakup E-LD-e (konektivitas),
E-LD-d (satu minggu pengolah dokumen, lembar kerja, dan presentasi), E-LD-k,
E-LD-l, dan E-LD-g. Modul pendamping karenanya tidak lagi memuat butir-butir
itu.

## 2. Daftar butir yang tersisa dan verifikasinya

Silabus bagian 4.3 mendaftar butir di luar coding: **E-LD-b, c, d, e, h, i, j;
F-LD-a, b, c, h, j; F-BK-d** (kecuali pengiriman data HTTP pada `B-XI2-M11`).
Daftar itu diperiksa terhadap [silabus.md bagian 4.3](silabus.md) dan
[usulan-fondasi-kelas-x.md bagian 3.1](usulan-fondasi-kelas-x.md):

| Butir 4.3 | Status setelah keputusan pemilik | Masuk modul pendamping? |
| --- | --- | --- |
| E-LD-b | Tidak tersentuh fondasi | Ya |
| E-LD-c | Tidak tersentuh fondasi | Ya |
| E-LD-d | Satu minggu di blok fondasi (keputusan pemilik) | Tidak |
| E-LD-e | Tercakup FND-X1-M4..M6 | Tidak |
| E-LD-h | Tidak tersentuh fondasi | Ya |
| E-LD-i | Tidak tersentuh fondasi | Ya |
| E-LD-j | Tidak tersentuh fondasi | Ya |
| F-LD-a | Tidak tersentuh fondasi | Ya |
| F-LD-b | Tidak tersentuh fondasi | Ya |
| F-LD-c | Tidak tersentuh fondasi | Ya |
| F-LD-h | Tidak tersentuh fondasi | Ya |
| F-LD-j | Tidak tersentuh fondasi | Ya |
| F-BK-d | Fondasi hanya pengantar (FND-X1-M4, M5); Fase F belum tercapai | Ya (kecuali pengiriman data HTTP di `B-XI2-M11` untuk jalur B) |

Hasil verifikasi: daftar yang diberikan untuk rancangan ini (E-LD-b, c, h, i,
j; F-LD-a, b, c, h, j; F-BK-d) **sama** dengan bagian 4.3 dikurangi E-LD-d dan
E-LD-e, sesuai bagian 3.1 usulan fondasi. Tidak ada selisih butir. Dua
catatan:

1. Silabus v1.0 bagian 4.3 mencantumkan E-LD-d dan E-LD-e; pada silabus v1.1
   (#92, disetujui 2026-11-19) keduanya sudah dikeluarkan dari daftar karena
   tercakup blok fondasi, sehingga daftar di bagian 4.3 v1.1 sama dengan
   daftar rancangan ini.
2. F-LD-d dan F-LD-e (usulan fondasi bagian 3) hanya mendapat pengantar dari
   fondasi dan **tidak** ada di bagian 4.3 (keduanya sudah dipetakan ke
   `B-XII2-M1..M2` dan `B-XI2-M10` untuk jalur B, parsial untuk F-LD-e), jadi
   tidak masuk rancangan ini. Jalur A tidak mencakup keduanya; itu celah
   di luar #69 dan kini dicatat sebagai issue #105 (lihat bagian 8, nomor 6).

## 3. Daftar modul pendamping

Tujuh modul `[asumsi]`. Id berbentuk kebab-case dan akan menjadi nama berkas
`content/sma-coding/modules/<id>.md` (ADR-0007) setelah rancangan disetujui.
Semua kegiatan memakai **kasus sintetis** (artikel, tangkapan layar, akun, dan
data buatan yang jelas palsu); tidak ada data pribadi siswa dan tidak ada
akun pribadi siswa (ADR-0004, silabus bagian 7.3).

| Id modul | Judul | Butir CP | Kelas / fase | Durasi `[asumsi]` | Prasyarat fondasi |
| --- | --- | --- | --- | --- | --- |
| `pendamping-periksa-fakta-dan-baca-lateral` | Memilah Fakta dan Membaca Lateral | E-LD-b, E-LD-c | X / Fase E | 3 JP | Tidak ada; E-LD-a (mesin pencari) dari `B-X2-M11` membantu tetapi tidak wajib. |
| `pendamping-profesi-informatika-dan-budaya-digital` | Profesi Informatika dan Digitalisasi Budaya Indonesia | E-LD-h, E-LD-i | X / Fase E | 3 JP | Tidak ada. |
| `pendamping-menyaring-konten-negatif` | Menyaring Konten Negatif | E-LD-j | X / Fase E | 2 JP | `fondasi-keamanan-dasar` (FND-X1-M6: privasi dan pengaturan akun uji). |
| `pendamping-riset-dan-verifikasi-konten` | Riset dengan Mesin Pencari dan Verifikasi Teks, Gambar, Video | F-LD-a, F-LD-b, F-LD-c | XI / Fase F | 6 JP (dua pertemuan) | `pendamping-periksa-fakta-dan-baca-lateral`. |
| `pendamping-teknologi-dan-demokrasi` | Teknologi Digital dalam Demokrasi | F-LD-h | XII / Fase F | 3 JP | `pendamping-riset-dan-verifikasi-konten`. |
| `pendamping-transaksi-digital-aman` | Loka Pasar, Perbankan Digital, dan Dompet Digital Secara Aman | F-LD-j | XII / Fase F | 3 JP | `fondasi-keamanan-dasar` (kata sandi, 2FA, pesan tipuan). |
| `pendamping-model-jaringan-dan-troubleshooting` | Model Jaringan, Pengiriman Data, dan Pemecahan Masalah | F-BK-d | XI / Fase F | 6 JP (dua pertemuan) | `fondasi-jaringan-dan-internet` (FND-X1-M4, M5) sebagai pengantar. |

Total sekitar 26 JP di tiga tahun, atau sekitar sembilan pertemuan.

### 3.1 Kutipan CP per butir

Kutipan disalin dari silabus bagian 1.3 (rumusan Fase E di bagian 2.2 Literasi
Digital; Fase F di bagian 3.2 Literasi Digital dan 3.1 Berpikir Komputasional)
dan dipenggal pada tanda titik koma seperti pemenggalan kode di bagian 1.4.

| Butir | Kutipan CP | Modul |
| --- | --- | --- |
| E-LD-b | "mengetahui ekosistem periksa fakta untuk memilah fakta dan bukan" | `pendamping-periksa-fakta-dan-baca-lateral` |
| E-LD-c | "menggunakan cara membaca lateral untuk mengevaluasi berbagai informasi digital" | `pendamping-periksa-fakta-dan-baca-lateral` |
| E-LD-h | "mengenal profesi bidang Informatika" | `pendamping-profesi-informatika-dan-budaya-digital` |
| E-LD-i | "memahami penerapan digitalisasi budaya Indonesia" | `pendamping-profesi-informatika-dan-budaya-digital` |
| E-LD-j | "menyaring konten negatif di dunia digital" | `pendamping-menyaring-konten-negatif` |
| F-LD-a | "memahami penggunaan mesin pencari untuk melakukan riset" | `pendamping-riset-dan-verifikasi-konten` |
| F-LD-b | "mengevaluasi kebenaran konten menggunakan verifikasi teks, gambar, dan video" | `pendamping-riset-dan-verifikasi-konten` |
| F-LD-c | "menggunakan cara membaca lateral untuk mengevaluasi informasi digital yang kompleks" | `pendamping-riset-dan-verifikasi-konten` |
| F-LD-h | "memahami pemanfaatan teknologi digital dalam demokrasi" | `pendamping-teknologi-dan-demokrasi` |
| F-LD-j | "memahami pemanfaatan platform loka pasar, perbankan digital, dompet digital beserta aspek keamanannya" | `pendamping-transaksi-digital-aman` |
| F-BK-d | "mengenali berbagai model jaringan komputer serta mampu melakukan pengiriman data antar perangkat dalam jaringan komputer dan troubleshooting permasalahan jaringan komputer" | `pendamping-model-jaringan-dan-troubleshooting` |

### 3.2 Bentuk kegiatan per modul `[asumsi]`

Setiap modul memadukan bacaan pendek, kasus, dan lembar kerja. Tidak ada
kegiatan yang meminta siswa menyerahkan data pribadi, memasang aplikasi di
ponsel pribadi, atau membuka konten berbahaya sungguhan.

| Modul | Kegiatan | Kasus sintetis |
| --- | --- | --- |
| `pendamping-periksa-fakta-dan-baca-lateral` | Mengenali ekosistem periksa fakta (jenis lembaga, cara kerja secara umum); latihan membuka sumber lain untuk menilai sebuah klaim (membaca lateral); lembar kerja menilai tiga klaim. | Artikel, unggahan, dan situs buatan penyusun dengan klaim dan sumber fiktif. |
| `pendamping-profesi-informatika-dan-budaya-digital` | Peta profesi bidang Informatika (peran, keterampilan, jalur belajar) dan wawancara peran dengan kartu profil; contoh digitalisasi budaya (pengarsipan, aksara, museum dan karya digital) lalu rancangan sederhana pelestarian satu unsur budaya. | Kartu profil profesi fiktif; unsur budaya diambil dari domain publik atau contoh umum tanpa klaim sejarah baru. |
| `pendamping-menyaring-konten-negatif` | Mengenali jenis konten negatif (kekerasan, perundungan siber, ujaran kebencian, judi dan penipuan daring, hoaks, konten tak pantas) secara umum; langkah menyaring, melaporkan, memblokir, dan mencari bantuan; diskusi kasus. | Percakapan dan unggahan buatan yang dikarang tanpa kata-kata kasar sungguhan; pengaturan pelaporan dicoba di akun uji dari fondasi. |
| `pendamping-riset-dan-verifikasi-konten` | Merumuskan pertanyaan riset, operator pencarian, menilai sumber; verifikasi teks (rekam jejak sumber), gambar (pencarian gambar balik), dan video (menelusuri asal rekaman); membaca lateral pada informasi yang kompleks. | Foto dan video sintetis buatan penyusun dengan asal yang diketahui; klaim fiktif dengan sumber campuran. |
| `pendamping-teknologi-dan-demokrasi` | Contoh pemanfaatan teknologi dalam demokrasi (akses informasi publik, partisipasi, layanan publik daring) dan risikonya (disinformasi, manipulasi, privasi); diskusi bersama. | Skenario layanan publik fiktif; tidak menyebut partai, calon, atau pemilu tertentu. |
| `pendamping-transaksi-digital-aman` | Cara kerja loka pasar, perbankan digital, dan dompet digital; tanda toko dan tautan palsu; kata sandi, 2FA, batas transaksi, dan langkah bila terjadi penipuan. | Halaman toko, notifikasi, dan pesan tipuan tiruan buatan penyusun; tidak ada uang, rekening, atau akun nyata. |
| `pendamping-model-jaringan-dan-troubleshooting` | Model jaringan (klien-server, rekan sebaya, topologi, lapisan secara ringkas); pengiriman data antar perangkat di jaringan lab (kecuali jalur B yang sudah memakai `B-XI2-M11` untuk HTTP: modul dibaca sebagai pendalaman); diagnosis bertahap dari fisik sampai layanan. | Kartu skenario gangguan sintetis; jaringan lab terisolasi atau simulasi peran bila lab tidak mendukung. |

## 4. Cara pelaksanaan

Pemilik memutuskan; **rancangan tidak menambah minggu wajib** (silabus bagian
2 tetap 14 minggu materi per semester). Opsi:

| Opsi | Cara | Kelebihan | Kekurangan |
| --- | --- | --- | --- |
| (a) Minggu cadangan | Modul disisipkan di 2 minggu cadangan tiap semester | Tidak mengubah minggu materi; waktu tatap muka terjamin | Cadangan dipakai libur, ujian sekolah, dan remedial; tidak andal; hasil tidak seragam antar sekolah |
| (b) Tugas mandiri terbimbing | Siswa membaca modul dan mengerjakan lembar kerja di luar JP; guru memberi satu sesi pendek (sekitar 1 JP) bila waktu ada | Tidak menyentuh rencana mingguan; modul dapat dipakai siswa jalur A, B, dan C sekaligus; murah dijalankan | Ketercapaian bergantung kedisiplinan siswa; asesmen lebih sulit; beban tambahan di luar jam |
| (c) Kegiatan lintas mapel | Dikerjakan bersama guru mata pelajaran lain (mis. Bahasa Indonesia untuk periksa fakta, PPKn untuk demokrasi, Seni Budaya untuk digitalisasi budaya, Ekonomi untuk transaksi digital) | Konteks nyata; tidak memakai jam Informatika; mencerminkan sifat lintas bidang CP literasi digital | Perlu koordinasi antar guru di luar kendali repositori ini; tidak semua sekolah mampu; kesesuaian dengan CP mapel lain tidak dicek |
| (d) Tambahan minggu wajib | Modul menjadi minggu materi tersendiri | Ketercapaian paling terjamin | Mengubah silabus dan kalender; menekan materi coding; **di luar mandat rancangan ini** |

Penilaian 11 kriteria singkat untuk opsi yang layak (a, b, c; opsi d hanya
dicatat):

| Kriteria | (a) Cadangan | (b) Mandiri terbimbing | (c) Lintas mapel |
| --- | --- | --- | --- |
| Keamanan (privasi, ADR-0004) | Setara; data sintetis | Setara; risiko siswa memakai akun pribadi di rumah, mitigasi: lembar kerja memakai akun uji dan contoh buatan | Setara; guru mapel lain perlu pedoman data sintetis |
| Performa (beban belajar) | Beban tambahan nol di jam wajib | Tambahan beban di luar jam, sekitar 26 JP dalam tiga tahun | Tersebar di mapel lain |
| Kemudahan perawatan | Sedang: bergantung kalender | Mudah: modul berdiri sendiri | Sulit: bergantung banyak guru |
| Skalabilitas (jalur C dan D) | Cukup | Paling baik: sama untuk semua jalur | Cukup |
| Aksesibilitas | Sekolah dengan banyak libur terdampak | Sekolah dengan perangkat terbatas perlu versi cetak | Bergantung sekolah |
| Dampak SEO | Tidak relevan | Tidak relevan | Tidak relevan |
| UI/UX (pengalaman siswa) | Tatap muka, bimbingan langsung | Fleksibel, kurang interaksi | Kaya konteks |
| Kompatibilitas dengan v1.0 | Tinggi | Tinggi | Tinggi |
| Kompleksitas operasional | Sedang | Rendah | Tinggi |
| Kelebihan | Waktu terjamin | Tanpa perubahan jadwal | Konteks nyata |
| Kekurangan dan jangka panjang | Rapuh bila kalender berubah | Ketercapaian tidak terjamin | Koordinasi sulit dijaga |

**Rekomendasi penyusun: gabungan, dengan (b) sebagai dasar.** Modul ditulis
agar dapat dikerjakan mandiri dengan lembar kerja, guru memakai (a) bila
cadangan tersisa dan (c) bila ada kerja sama antar guru. Alasannya: (b) satu-satunya
yang tidak mengubah rencana mingguan, tidak bergantung pihak lain,
dan seragam untuk semua jalur. Harganya adalah ketercapaian CP tidak
terjamin sehingga perlu asesmen formatif sederhana (daftar periksa
mandiri; tanpa penilaian yang memuat data siswa di repositori ini).
Keputusan ada pada pemilik.

## 5. Pemetaan lengkap butir ke modul

Tabel kebalikan: setiap butir bagian 4.3 yang tersisa tercakup oleh minimal
satu modul. Butir yang sudah keluar dari #69 dicantumkan agar daftarnya
lengkap.

| Butir 4.3 | Modul | Keterangan |
| --- | --- | --- |
| E-LD-b | `pendamping-periksa-fakta-dan-baca-lateral` | Tercakup |
| E-LD-c | `pendamping-periksa-fakta-dan-baca-lateral` | Tercakup |
| E-LD-d | (tidak ada) | Satu minggu blok fondasi `FND-X1-M7` (keputusan pemilik 2026-11-18; diterapkan di silabus v1.1, #92) |
| E-LD-e | (tidak ada) | Tercakup FND-X1-M4..M6 |
| E-LD-h | `pendamping-profesi-informatika-dan-budaya-digital` | Tercakup |
| E-LD-i | `pendamping-profesi-informatika-dan-budaya-digital` | Tercakup |
| E-LD-j | `pendamping-menyaring-konten-negatif` | Tercakup |
| F-LD-a | `pendamping-riset-dan-verifikasi-konten` | Tercakup |
| F-LD-b | `pendamping-riset-dan-verifikasi-konten` | Tercakup |
| F-LD-c | `pendamping-riset-dan-verifikasi-konten` | Tercakup |
| F-LD-h | `pendamping-teknologi-dan-demokrasi` | Tercakup |
| F-LD-j | `pendamping-transaksi-digital-aman` | Tercakup |
| F-BK-d | `pendamping-model-jaringan-dan-troubleshooting` | Tercakup; pengiriman data HTTP jalur B tetap di `B-XI2-M11` |

Hasil: sebelas butir tersisa semuanya tercakup (dua butir lain sudah dialihkan
ke fondasi). Pemetaan ini adalah rancangan; ia belum menjadi corpus.

## 6. Bentuk modul

Satu modul per berkas `content/sma-coding/modules/<id>.md` dengan status
`draf` (ADR-0007), mengikuti gaya
[`content/osn/modules/dasar-pemrograman.md`](../../../content/osn/modules/dasar-pemrograman.md):

1. Bagian "Untuk siapa modul ini": kelas, prasyarat, tujuan (murid mampu ...),
   cara memakai.
2. Penjelasan konsep per bagian bahasan, dengan tabel ringkas bila perlu.
3. Contoh dan kasus sintetis (teks atau tabel; tanpa blok kode, sehingga
   `check:module-code` tidak relevan).
4. Latihan dan lembar kerja berupa formulir kosong (daftar periksa mandiri),
   tidak ada data siswa disimpan (ADR-0007 batas).
5. Rujukan: dokumen resmi atau sumber yang mapan. Soal atau materi pihak
   lain ditautkan, bukan disalin (ADR-0007 hak cipta).
6. Catatan: pengamanan konten sensitif (modul E-LD-j dan F-LD-j menjelaskan
   jenis dan cara menyikapi, bukan contoh konten berbahaya).

Tiap modul `[asumsi]` pendek: 1.000 sampai 2.000 kata per pertemuan 3 JP.
Penulisan draf (tahap 2) dilakukan per modul, satu issue atau PR per modul
bila pemilik memilih.

## 7. Kebutuhan skema indeks modul sma-coding

Hanya dicatat; analisis dan perubahan skema tidak dikerjakan di sini (seri
matematika #87 menganalisisnya paralel). Aturan repo: skema dulu, lalu data,
lalu domain, lalu uji. Temuan dari `src/schema/module.ts`:

| Bidang indeks saat ini | Kebutuhan modul pendamping |
| --- | --- |
| `topicFamilies` (wajib, minimal satu, diperiksa terhadap `topic-families.json` OSN) | `sma-coding` tidak punya rumpun materi OSN; modul perlu rujukan ke **butir CP** (`cp-elements.json`) dan/atau jalur. Bidang ini perlu menjadi opsional atau diganti sesuai program. |
| `weeks` (nomor 1..MAX_WEEK, minggu OSN) | Modul pendamping tidak terikat satu minggu; perlu rujukan ke kode minggu `sma-coding` (`A-X1-M9`, `FND-X1-M<n>`) opsional, bukan nomor OSN. |
| Tidak ada bidang kelas atau fase | Perlu `grade` (X, XI, XII) atau `phase` (E, F) untuk pemetaan kelas. |
| Tidak ada bidang butir CP | Perlu `cpItems` (kode butir) agar pemeriksaan keterpenuhan (butir 4.3 tersisa tercakup) dapat diotomatisasi seperti `sma-corpus-audit`. |
| Tidak ada bidang prasyarat | Perlu `prerequisites` (id modul lain atau kode minggu fondasi). |
| Tidak ada durasi | Perlu `durationJp` opsional. |
| `audience` literal `siswa`, `language` literal `id` | Cukup. |
| `status`, `review`, `references`, `contentPath` | Cukup dan dipakai ulang. |
| Registri program (`data/programs.json`) | Program `sma-coding` perlu mendeklarasikan `modules.json` bila belum; pembaruan ada di pekerjaan corpus, bukan di dokumen ini. |

Keputusan arsitektur (skema bersama atau skema per program) ada pada
orchestrator dan pemilik; tidak diambil di dokumen ini.

## 8. Pertanyaan terbuka untuk pemilik

**Terjawab 2026-11-19 (komentar keputusan di issue #69):** pemilik
menyetujui rancangan beserta **keenam rekomendasi** (opsi bertanda
**rekomendasi** di bawah): (1) mandiri terbimbing sebagai dasar dengan
cadangan dan lintas mapel opsional; (2) satu modul digabung untuk E-LD-h dan
i; (3) modul F-BK-d dibaca semua jalur; (4) daftar periksa mandiri tanpa
nilai; (5) rujukan hanya dokumen resmi dan sumber mapan yang dicek saat
penulisan; (6) celah F-LD-d dan F-LD-e jalur A tidak dimasukkan ke #69 dan
dicatat sebagai issue terpisah (#105). Modul ditulis berstatus `draf`.

1. **Cara pelaksanaan:** (b) mandiri terbimbing sebagai dasar
   dengan (a) dan (c) opsional (**rekomendasi**), hanya (a), hanya (c), atau
   (d) tambah minggu wajib (mengubah silabus; lihat bagian 4).
2. **Satu modul atau dua untuk E-LD-h dan i:** digabung
   (**rekomendasi**, 3 JP, cakupan ringan) atau dipisah (profesi dan budaya,
   masing-masing 2 JP; lebih dalam tetapi menambah beban).
3. **Posisi F-BK-d untuk jalur B:** modul tetap dibaca semua jalur
   (**rekomendasi**; jalur B memakainya sebagai pendalaman di luar HTTP) atau
   khusus jalur A.
4. **Asesmen modul pendamping:** daftar periksa mandiri tanpa nilai
   (**rekomendasi**; selaras ADR-0004) atau dilebur ke asesmen `M14` jalur;
   keduanya tidak menyimpan data siswa di repositori.
5. **Sumber rujukan:** hanya dokumen resmi dan sumber mapan yang dicek saat
   penulisan (**rekomendasi**; kutipan butir tetap dari panduan 2025) atau
   juga materi lembaga periksa fakta tertentu; yang kedua memerlukan
   penyebutan lembaga dan tidak diputuskan penyusun.
6. **Celah jalur A untuk F-LD-d dan F-LD-e:** jalur A tidak mencakup keduanya
   (bagian 2, catatan 2); apakah ditangani sebagai modul pendamping tambahan
   (di luar #69) atau cukup lewat pengantar fondasi? **Rekomendasi:** tidak
   dimasukkan sekarang; catat sebagai isu terpisah.

## 9. Sumber dan batasan

- Satu-satunya kutipan CP berasal dari silabus bagian 1.3 (disusun saat v1.0; isinya tidak berubah di v1.1) (bersumber
  dari panduan resmi 2025 yang dibuka dan diekstrak 2026-11-18). Dokumen ini
  tidak memverifikasi ulang sumber luar.
- Pengelompokan butir ke modul, kelas, durasi, bentuk kegiatan, dan semua opsi
  adalah rancangan penyusun `[asumsi]`.
- Dokumen ini tidak merujuk regulasi atau nomor SK baru; UU ITE dan UU PDP
  disebut di silabus bagian 3 dan 7.3, bukan dikutip ulang di sini.
- Nilai JP dan struktur semester mengikuti silabus bagian 2 dan tetap
  `[belum terverifikasi]` sebagai angka resmi kurikulum.
- Rancangan belum diuji di kelas.
- Kode `FND-X1-M<n>` (termasuk `FND-X1-M7` untuk E-LD-d) sudah ada di `data/sma-coding/foundation.json` sejak silabus v1.1 (#92).
- Dokumen yang perlu diperbarui saat modul pertama masuk repositori: `README.md`
  program ini, `AGENTS.md` (deskripsi `content/`), dan panduan; silabus bagian
  4.3 dan 9 sudah diperbarui di v1.1 (#92).

## Changelog

| Versi | Tanggal | Perubahan |
| --- | --- | --- |
| v0.2.0 | 2026-11-19 | Rancangan disetujui pemilik beserta keenam rekomendasi (issue #69); status, kotak catatan, dan pertanyaan terbuka diperbarui; rujukan silabus ke v1.1; celah F-LD-d dan F-LD-e jalur A dicatat sebagai #105; contoh kode minggu `A-X1-M3` menjadi `A-X1-M9` (padanan v1.0 ke v1.1). |
| v0.1.0 | 2026-11-18 | Rancangan awal (issue #69, tahap 1): verifikasi daftar butir terhadap silabus bagian 4.3 dan usulan fondasi bagian 3.1; tujuh modul pendamping dengan butir, kelas, durasi, kegiatan, dan prasyarat; opsi pelaksanaan dengan penilaian dan rekomendasi; pemetaan butir ke modul; bentuk modul; kebutuhan skema indeks; pertanyaan terbuka. Status DRAF. |
