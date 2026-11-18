# Riset Pembelajaran Coding SD — Kebijakan, Capaian Resmi, Alat, dan Privasi

- **Version:** v0.2.0
- **Last updated:** 2026-11-19
- **Status:** Riset pendukung silabus `sd-coding` v1.0 yang disetujui pemilik 2026-11-19 (issue #128); CP Fase C dicocokkan dengan SK 046/H/KR/2025 (bagian 3.5). Bagian lain tetap catatan riset penyusun, bukan keputusan.
- **Changeset:** Bagian 3.5 baru: kutipan CP Fase C dicocokkan huruf demi huruf dengan teks SK Kepala BSKAP 046/H/KR/2025 (empat perbedaan, teks SK dipakai); bagian 1, 2.4, 3.1, dan 7 diperbarui. Riset awal untuk program `sd-coding`: kebijakan mata pelajaran pilihan Koding dan Kecerdasan Artifisial (KKA) di SD, capaian Fase C, posisi Informatika, kajian alat, dan risiko privasi anak.

> Dokumen ini adalah konten karangan menurut
> [ADR-0007](../../architecture/adr/0007-authored-learning-content.md):
> catatan riset dan penilaian penyusun, bukan transkripsi silabus resmi dan
> bukan keputusan. Kutipan dalam tanda petik hanya berasal dari sumber yang
> **benar-benar dibuka** penyusun pada **2026-11-19**; selebihnya ditandai
> `[belum terverifikasi]` (tidak boleh diperlakukan sebagai fakta) atau
> `[asumsi]` (rancangan penyusun). Silabus program ini disetujui pemilik
> pada 2026-11-19 dan terdaftar di `data/programs.json` dengan corpus
> `data/sd-coding/`
> ([ADR-0006](../../architecture/adr/0006-multi-program-repository.md)).

## 1. Cara riset dan keterbatasan akses

Semua unduhan masuk direktori baru yang kosong di `/tmp`; tidak ada yang
dijalankan. PDF diekstrak teksnya dengan `pdftotext`.

| Sumber | Hasil akses 2026-11-19 |
| --- | --- |
| `peraturan.bpk.go.id` (PDF Permendikdasmen 13/2025) | **Dibuka penuh**, 76 halaman, teks diekstrak. Sumber primer kebijakan. |
| `bgtkntb.kemendikdasmen.go.id` (PDF Keputusan Dirjen GTK 5/B/HK.03.01/2025) | **Dibuka penuh**, 104 halaman, teks diekstrak. |
| `bgtkkaltim.kemendikdasmen.go.id` (halaman "Pelajaran Koding dan Kecerdasan Artifisial (KA) Fase C (Kelas V dan VI SD/MI)") | **Dibuka** (HTML diunduh dan teksnya diekstrak sendiri). Situs resmi UPT Ditjen GTK; memuat tabel "Pemetaan Materi Esensial Fase C". Ini **salinan/ringkasan** panduan di situs UPT, bukan PDF panduan itu sendiri. |
| `kodingka.kemendikdasmen.go.id` (halaman Pembelajaran dan Soal Sering Ditanya) | **Dibuka**. |
| `peraturan.bpk.go.id` (UU 27/2022, PDF) | **Dibuka**; Pasal 4 dan Pasal 25 dibaca. |
| PDF *Panduan Mata Pelajaran Koding dan Kecerdasan Artifisial* di `kurikulum.kemdikbud.go.id` (dan padanan di `kurikulum.kemendikdasmen.go.id`) | **Tidak terbuka**: DNS `kemdikbud.go.id` tidak terjangkau dari lingkungan penyusun; `kurikulum.kemendikdasmen.go.id` kehabisan waktu (60 detik). URL hanya diketahui dari hasil pencarian. |
| Keputusan Kepala BSKAP Nomor 046/H/KR/2025 (SK induk CP) | Saat riset awal **tidak terbuka**. Pada 2026-11-19 orchestrator menemukan salinan PDF-nya (1691 halaman, SHA-256 `45809d2c88a612f90ee5adbd60d71a8952527d6924c626d126ea6926ae3d3394`, teks diekstrak dengan `pdftotext`); **alamat asal salinan belum terverifikasi**. Kutipan CP Fase C dicocokkan dengan salinan itu (bagian 3.5). |
| `pusatprestasinasional.kemdikbud.go.id` (dokumen OSN SD) | **Tidak terbuka** (DNS tidak terjangkau). |
| `repositori.kemendikdasmen.go.id/35941/` | **Tidak terbuka** (kehabisan waktu). |
| Berita (antaranews.com dan lain-lain) | Satu artikel dibuka; tidak memuat fakta regulasi, **tidak dipakai** sebagai bukti. |

Akibatnya: kebijakan (bagian 2) terverifikasi dari teks peraturan; rumusan
CP Fase C pada riset awal berasal dari halaman resmi UPT Ditjen GTK dan
belum dibandingkan dengan SK. Pada 2026-11-19, atas syarat pemilik,
rumusan itu dicocokkan dengan teks SK 046/H/KR/2025 dan **dikoreksi**
(bagian 3.5); PDF panduan tetap tidak terbuka.

## 2. Kebijakan mata pelajaran pilihan KKA di SD

### 2.1 Yang terverifikasi (teks Permendikdasmen 13/2025)

Dokumen: *Peraturan Menteri Pendidikan Dasar dan Menengah Republik Indonesia
Nomor 13 Tahun 2025 tentang Perubahan atas Peraturan Menteri Pendidikan,
Kebudayaan, Riset, dan Teknologi Nomor 12 Tahun 2024 tentang Kurikulum pada
Pendidikan Anak Usia Dini, Jenjang Pendidikan Dasar, dan Jenjang Pendidikan
Menengah*. Ditetapkan di Jakarta pada 11 Juli 2025 (Menteri Abdul Mu'ti);
berlaku pada tanggal diundangkan (Pasal II). Tanggal pengundangan dan nomor
Berita Negara tidak terbaca pada salinan yang dibuka.

| Butir | Nilai | Bukti |
| --- | --- | --- |
| Status | Mata pelajaran **pilihan**, bukan wajib: "Mata pelajaran pilihan Koding dan Kecerdasan Artifisial dapat disediakan oleh Satuan Pendidikan sesuai sumber daya yang dimiliki dan dapat dipilih oleh Peserta Didik sesuai minatnya." | Lampiran I, bagian B (struktur kurikulum SD), butir 7. |
| Mulai | "Pada saat Peraturan Menteri ini mulai berlaku, mata pelajaran pilihan Koding dan Kecerdasan Artifisial diselenggarakan Satuan Pendidikan pada jenjang pendidikan dasar dan jenjang pendidikan menengah mulai tahun ajaran 2025-2026 secara bertahap." | Pasal 32A (disisipkan oleh angka 9). |
| Kelas V | Baris "Koding dan Kecerdasan Artifisial" di Tabel 4: **72 JP per tahun** (intrakurikuler; kokurikuler `-`). Asumsi tabel: 1 tahun = 36 minggu, 1 JP = 35 menit. Keterangan: "Dialokasikan 2 (dua) JP per minggu atau 72 (tujuh puluh dua) JP per tahun sebagai mata pelajaran pilihan." | Lampiran I, Tabel 4 dan keterangan c. |
| Kelas VI | Tabel 5: **64 JP per tahun**. Asumsi tabel: 1 tahun = 32 minggu, 1 JP = 35 menit. "Dialokasikan 2 (dua) JP per minggu atau 64 (enam puluh empat) JP per tahun sebagai mata pelajaran pilihan." | Lampiran I, Tabel 5 dan keterangan c. |
| Kelas I-IV | Tabel 1 (kelas I), 2 (kelas II), dan 3 (kelas III-IV) **tidak memuat** baris KKA. Satu-satunya JP tambahan di tabel itu adalah Muatan Lokal, "Paling banyak 2 (dua) JP per minggu". | Lampiran I, Tabel 1-3. |
| Muatan lokal | Berbentuk seni budaya, prakarya, pendidikan jasmani, olahraga, dan kesehatan, bahasa, dan/atau **teknologi**; dapat dilaksanakan lewat integrasi ke mata pelajaran lain, integrasi ke kokurikuler, dan/atau mata pelajaran berdiri sendiri. | Lampiran I, bagian B, butir 3-4. |
| Informatika di SD | Tabel 1-5 (SD) **tidak memuat** Informatika; baris Informatika baru muncul di tabel SMP (Tabel 6). | Lampiran I. |
| Percepatan/pengayaan | Peserta didik berpotensi kecerdasan istimewa dapat diberi "percepatan ... dan/atau pendalaman dan pengayaan Capaian Pembelajaran" sebagai layanan individual. | Lampiran I, bagian B, butir 6. |

Ringkas: KKA SD adalah pilihan, hanya di **kelas V dan VI**, 2 JP/minggu,
tahun ajaran 2025-2026 secara bertahap. Kelas I-IV tidak punya mata
pelajaran KKA; pengenalan di sana hanya mungkin lewat muatan lokal
(teknologi), kokurikuler, atau ekstrakurikuler `[asumsi]` (ekstrakurikuler
di SD tidak diperiksa dalam teks yang dibuka).

### 2.2 Dari situs program Koding dan KA (kodingka.kemendikdasmen.go.id)

Dibuka 2026-11-19. Halaman Pembelajaran: "Di SD, fokus pada berpikir
komputasional dan literasi digital dasar melalui metode unplugged dan
berbasis permainan." Pada halaman yang sama: "Menggunakan pendekatan
problem-based learning, project-based learning, inkuiri, dan gamifikasi,
dengan media seperti perangkat digital, platform online, modul interaktif,
serta alat nondigital seperti kartu dan papan." Halaman itu menyebut
rujukannya "Naskah Akademik Februari 2025" (naskah itu sendiri tidak
dibuka).

Halaman Soal Sering Ditanya memuat jawaban yang **sudah usang** terhadap
peraturan di atas: ia menulis bahwa kementerian "sedang melakukan revisi
regulasi" dan "sedang menyusun dan menyesuaikan capaian pembelajaran".
Penyusun menganggap jawaban itu mendahului Permendikdasmen 13/2025 dan
tidak memakainya sebagai bukti kebijakan. Dua hal darinya tidak
bertentangan dengan peraturan dan dicatat: (a) sasaran pelatihan guru SD
adalah "guru kelas ataupun guru informatika"; (b) satuan pendidikan boleh
mengembangkan KKA dalam bentuk ekstrakurikuler atau mengintegrasikannya
ke mata pelajaran lain. Butir (b) hanya dari FAQ itu sendiri
`[belum terverifikasi]` terhadap peraturan.

### 2.3 Dari petunjuk teknis pelatihan guru (Keputusan Dirjen GTK 5/B/HK.03.01/2025)

Ditetapkan di Jakarta, 14 Mei 2025. Relevan untuk silabus ini: persyaratan
peserta pelatihan mencakup "berstatus sebagai Guru kelas atau Guru informatika
pada sekolah dasar"; Tabel 3.4 memuat struktur program pelatihan jenjang SD
(Fase C) dengan topik "Berpikir Komputasional sebagai Dasar Koding dan
Kecerdasan Artifisial", "Konsep Dasar Kecerdasan Artifisial", "Pemanfaatan
Kecerdasan Artifisial", dan "Pedagogik Koding dan Kecerdasan Artifisial"; dan
tujuan pembelajaran pelatihan menyebut perancangan pembelajaran "dengan metode
plugged dan unplugged". Dokumen ini tentang pelatihan guru, bukan capaian
murid; ia tidak dipakai sebagai sumber CP.

### 2.4 Yang belum terverifikasi

| Butir | Status |
| --- | --- |
| SK induk CP KKA | Keputusan Kepala BSKAP Nomor 046/H/KR/2025 (berlaku 16 Juli 2025 menurut hasil pencarian `[belum terverifikasi]`). Pada riset awal tidak terbuka; teksnya kemudian dicocokkan dari salinan PDF yang ditemukan orchestrator (bagian 3.5), alamat asal salinan `[belum terverifikasi]`. |
| URL resmi panduan KKA | Dari hasil pencarian: `https://kurikulum.kemdikbud.go.id/file/panduan/dokumen/33.%20Final%20Panduan%20Mata%20Pelajaran%20Panduan%20Mata%20Pelajaran%20Koding%20dan%20Kecerdasan%20Artifisial_12_Sep_2025_revisi%203.pdf` `[belum terverifikasi]`: tidak dibuka. |
| Pelaksanaan nyata (jumlah sekolah, jadwal gelombang) | Tidak diperiksa. Pasal 32A hanya berkata "secara bertahap". |
| Apakah ekstrakurikuler SD diatur terpisah | Tidak diperiksa. |

## 3. Capaian Pembelajaran Fase C (kelas V dan VI SD/MI)

### 3.1 Sumber dan status

Sumber yang dibuka: halaman "PELAJARAN KODING DAN KECERDASAN ARTIFISIAL (KA)
FASE C (KELAS V DAN VI SD/MI)" di situs BGTK Kalimantan Timur
(`bgtkkaltim.kemendikdasmen.go.id`, URL hasil `.../2026/02/13/pelajaran-koding-dan-kecerdasan-artifisial-ka-fase-c-kelas-v-dan-vi-sd-mi/`),
dibuka 2026-11-19. Situs itu menyebut dirinya "Situs Resmi Unit Pelaksana
Teknis (UPT) di bawah Direktorat Jenderal Guru, Tenaga Kependidikan (Ditjen
GTK), Kementerian Pendidikan Dasar dan Menengah". Halaman tidak menyebut
nomor SK maupun tanggal terbit. Teks di bawah disalin dari HTML yang
diekstrak penyusun sendiri; hanya spasi dan pemenggalan baris yang
dinormalkan (di sumber, "manusia,mengetahui" tanpa spasi diberi spasi).

Status: **sumber sekunder pemerintah** (halaman UPT yang mereproduksi
panduan), bukan PDF panduan atau SK. Setelah dibandingkan dengan SK
(bagian 3.5) ternyata **tidak sama huruf demi huruf**: rumusan CP yang
berlaku adalah teks SK. Kutipan di bagian 3.3 di bawah adalah isi halaman
BGTK saat riset awal, dipertahankan sebagai catatan; yang dikodekan adalah
teks SK.

### 3.2 Elemen (deskripsi, dikutip persis)

Halaman memuat daftar elemen pada tingkat SMA-SMK juga; untuk Fase C yang
diturunkan hanyalah empat elemen berikut (keempatnya muncul di bawah
"Capaian Pembelajaran Pelajaran Fase C (Kelas V dan VI SD/MI)"). Deskripsi
elemen yang terbaca di halaman:

- *Literasi Digital*: "Kecakapan bermedia digital yang berfokus pada produksi dan diseminasi konten digital dengan memahami etika dan keamanan digital."
- *Literasi dan Etika KA*: "Mengetahui konsep dasar KA, bagaimana KA bekerja, manfaat dan dampak KA, serta sikap kritis dan etika dalam pemanfaatan KA."
- *Pemanfaatan & Pengembangan KA*: "Kemampuan memanfaatkan KA untuk penyelesaian masalah dan peningkatan efisiensi pada kehidupan nyata, serta menciptakan dan memperbaiki sistem KA."
- Catatan beban: "Semua elemen harus dicakup dalam pembelajaran sesuai Capaian Pembelajaran (CP), namun beban belajar (JP) yang dialokasi pada setiap elemen pada mata pelajaran Koding dan KA tidak harus sama. CP dapat dilakukan dengan mengambil kasus tematik yang dipetakan ke dalam konsep dan praktik setiap elemen sesuai konteks."

Deskripsi elemen *Berpikir Komputasional* terpotong pada halaman yang
terbaca (yang tampak: "...berdasarkan data, dan analisis sebagai tindakan
komputasional untuk memecahkan permasalahan lintas bidang secara efektif baik
mandiri maupun kolaboratif."); tidak dikutip utuh.

### 3.3 CP Fase C (dikutip persis) dan materi esensial

Pada pemetaan, halaman menyebut "Elemen / Capaian Pembelajaran / Materi".

**Berpikir Komputasional.** "Pada akhir Fase C, murid mampu memahami permasalahan sederhana dalam kehidupan sehari-hari, menerapkan pemecahan masalah secara sistematis, serta menuliskan instruksi logis dan terstruktur menggunakan sekumpulan kosakata atau simbol."

- Kelas 5: Pengenalan Berpikir Komputasional; Konsep Dasar Berpikir Komputasional; Pemecahan Masalah dalam Kehidupan Sehari-hari; Pemecahan Masalah Multi-langkah; Proyek Pemecahan Masalah Multi-langkah; Menuliskan Urutan Instruksi secara Logis.
- Kelas 6: Pemanfaatan Algoritma Sederhana; Pengenalan Representasi Simbol dalam Instruksi; Eksperimen dengan Instruksi Logis.

**Literasi Digital.** "Pada akhir Fase C, murid mampu memahami konsep dasar, manfaat dan dampak teknologi digital, memahami sistem komputer tingkat pra dasar, menerapkan pengamanan informasi pribadi dalam komunikasi daring, memanfaatkan internet, dan memproduksi serta mendiseminasi konten digital dalam bentuk teks dan gambar."

- Kelas 5: Konsep Dasar Teknologi Digital; Sistem Komputer Tingkat Pra Dasar; Keamanan Informasi Pribadi; Interaksi Aman dan Efektif di Beranda Digital.
- Kelas 6: Pemanfaatan Internet Secara Aman dan Produktif; Dampak Teknologi Digital; Produksi dan Diseminasi Konten Digital Sederhana; Konten Digital Positif.

**Literasi dan Etika Kecerdasan Artifisial.** "Pada akhir Fase C, murid mampu memahami konsep KA sederhana, manfaat dan dampak KA pada kehidupan sehari-hari, prinsip bahwa KA dikembangkan untuk meningkatkan kesejahteraan manusia dan tidak boleh merugikan manusia, mengetahui perbedaan manusia dan komputer dalam melakukan penginderaan, dan mengetahui perbedaan antara mesin cerdas dan mesin non-cerdas. Memahami etika dasar penggunaan KA seperti empati dan tidak menyakiti orang lain."

- Kelas 5: Pengenalan KA; Perbedaan Manusia dan Komputer dalam Penginderaan; Mesin Cerdas versus Mesin Non-Cerdas; Manfaat KA dalam Kehidupan Sehari-hari.
- Kelas 6: Cara kerja KA secara sederhana; Dampak Kecerdasan Artifisial; Etika Dasar Penggunaan KA.

**Pemanfaatan dan Pengembangan Kecerdasan Artifisial.** "Pada akhir Fase C, murid mampu mensimulasikan secara sederhana kerja KA saat mengenali pola, mengklasifikasi benda konkret berdasarkan sifatnya, dan mengetahui bagaimana prediksi sistem KA dipengaruhi input benda konkret."

- Kelas 5: Konsep Mengenali Pola dan Klasifikasi dalam Situasi Kehidupan; Mengenali Pola dan Klasifikasi oleh KA; Simulasi Prediksi Pola dan Klasifikasi Sistem KA; Pengaruh Data Input terhadap Hasil Mengenali Pola dan Klasifikasi KA.
- Kelas 6: Cara KA Belajar dari Data; Model Pola dan Klasifikasi Sederhana; Faktor yang Mempengaruhi Prediksi KA; Batasan Sederhana KA.

### 3.5 Pencocokan dengan SK Kepala BSKAP 046/H/KR/2025 (2026-11-19)

Syarat dari dialog pilihan pemilik (2026-11-19): kutipan CP Fase C
dicocokkan ulang dengan SK sebelum dikodekan.

**Sumber dan provenance.** Salinan PDF SK (bertanda "SALINAN", judul
"Keputusan Kepala Badan Standar, Kurikulum, dan Asesmen Pendidikan
Kementerian Pendidikan Dasar dan Menengah Nomor 046/H/KR/2025 tentang
Capaian Pembelajaran pada Pendidikan Anak Usia Dini, Jenjang Pendidikan
Dasar, dan Jenjang Pendidikan Menengah"), 1691 halaman, SHA-256
`45809d2c88a612f90ee5adbd60d71a8952527d6924c626d126ea6926ae3d3394`, ditemukan
orchestrator; **URL asal belum terverifikasi**. Teks diekstrak dengan
`pdftotext -layout`; tidak ada yang dijalankan dari berkas itu. CP Fase C KKA
ada di Lampiran II (jenjang SD), bagian XXVIII, butir D.1 (halaman PDF 343).
Kalimat pembuka SK: "Pada akhir Fase C, murid memiliki kemampuan sebagai
berikut." Elemen bernomor 1.1 Berpikir Komputasional, 1.2 Literasi Digital,
1.3 Literasi dan Etika Kecerdasan Artifisial, 1.4 Pemanfaatan dan
Pengembangan Kecerdasan Artifisial. Catatan "Semua elemen harus dicakup ..."
dan deskripsi tiga elemen (Literasi Digital, Literasi dan Etika KA,
Pemanfaatan dan Pengembangan KA) di bagian 3.2 cocok dengan bagian C SK.

**Hasil pencocokan.** Elemen 1.1 (Berpikir Komputasional) cocok persis
selain kata pembuka: SK membuka dengan "Memahami ...", bukan "Pada akhir
Fase C, murid mampu memahami ...". Tiga elemen lain berbeda:

| Elemen | Halaman BGTK (riset awal) | SK 046/H/KR/2025 (dipakai) |
| --- | --- | --- |
| Semua | "Pada akhir Fase C, murid mampu memahami ..." | rumusan tanpa "murid mampu"; kalimat pembuka tersendiri (di atas) |
| 1.2 Literasi Digital | "manfaat dan dampak teknologi digital" | "manfaat, dan dampak teknologi digital" |
| 1.2 Literasi Digital | "sistem komputer tingkat pra dasar" | "sistem komputer tingkat pradasar" |
| 1.4 Pemanfaatan dan Pengembangan KA | "mensimulasikan secara sederhana kerja KA" | "Menyimulasikan secara sederhana kerja KA" |

Elemen 1.3 (Literasi dan Etika KA) cocok persis selain kata pembuka.
Pemenggalan butir `C-xx-a` dst. di silabus bagian 4 sudah memakai ejaan SK
(tiga butir dikoreksi: `C-LD-a`, `C-LD-b`, `C-PP-a`). Nama topik materi
esensial kelas 5-6 berasal dari tabel pemetaan di halaman BGTK, bukan dari SK
(SK hanya memuat CP), sehingga tetap dipertahankan seperti di halaman itu.

### 3.4 Hal yang dapat ditarik (terverifikasi dari halaman yang sama)

- Fase C hanya mencakup **empat elemen**: Berpikir Komputasional, Literasi
  Digital, Literasi dan Etika KA, serta Pemanfaatan dan Pengembangan KA.
  Elemen "Algoritma dan Pemrograman" dan "Analisis Data" tidak diturunkan
  ke Fase C pada halaman ini; di SD "menulis instruksi" lebih dekat ke
  instruksi dengan simbol daripada ke bahasa pemrograman.
- Contoh strategi pada halaman: mengklasifikasi perangkat digital
  (mesin non-cerdas: setrika, kipas angin, dispenser; mesin cerdas: Google
  Assistant, robot penyapu otomatis, aplikasi Siri) lewat diskusi dan
  tayangan video; asesmen "lembar kerja, kuis, dan penilaian sikap".
- Tidak ada pernyataan bahwa murid SD wajib memakai bahasa pemrograman
  teks atau perangkat tertentu.

## 4. Posisi Informatika di SD

Dari teks Permendikdasmen 13/2025 (bagian 2.1): **Informatika bukan mata
pelajaran di tabel struktur SD** (kelas I sampai VI); Informatika mulai pada
tabel SMP. Pengenalan komputasi di SD terjadi lewat (a) mata pelajaran
pilihan KKA kelas V-VI, (b) muatan lokal teknologi, (c) integrasi ke mata
pelajaran lain. Program `sd-coding` karenanya memosisikan diri sebagai
pengantar yang berpijak pada Fase C KKA, bukan sebagai Informatika SD.

CP Informatika Fase D-F (dipakai program `sma-coding`) tidak berlaku untuk
SD. Jembatan ke Informatika berada di program SMP (`smp-coding`,
disusun paralel, belum ada di repositori ini).

## 5. Kajian alat

Prinsip penyusun `[asumsi]`: alat yang dipilih harus (1) tidak mensyaratkan
akun pribadi murid ([ADR-0004](../../architecture/adr/0004-no-learner-personal-data.md)),
(2) bisa dipakai luring atau di jaringan sekolah yang lemah, (3) tidak memaksa
sekolah membeli perangkat sebelum ada kesiapan, dan (4) bisa diajarkan guru
kelas tanpa latar informatika. Panduan resmi sendiri menempatkan metode
unplugged dan permainan sebagai fokus SD (bagian 2.2).

Hanya fakta yang benar-benar terbaca yang dicatat; sisanya
`[belum terverifikasi]`. Biaya perangkat tidak dicatat karena tidak ada harga
yang diperiksa.

| Alat | Terverifikasi (dibuka 2026-11-19) | Belum terverifikasi |
| --- | --- | --- |
| Unplugged (kartu, kertas kisi, tali, peran) | Materi CS Unplugged: situs menyebutnya "free teaching material" dan "Computer Science without a computer", konten berlisensi "Creative Commons Attribution-ShareAlike 4.0 International"; bahasa yang tertera: English, Deutsch, Español, Français, Te Reo Māori, 简体中文 (bahasa Indonesia **tidak tercantum**). Aktivitas memakai kartu, tali, krayon. | Kualitas dan kesesuaian tiap aktivitas untuk kelas V-VI; kemungkinan terjemahan Indonesia dari pihak lain. |
| Pemrograman blok (Scratch) | Halaman Scratch Foundation untuk guru menyebut "Teacher Accounts make it easy for educators to create accounts for their students and to manage their projects and participation in Scratch"; halaman repositori `scratch-gui` menampilkan label lisensi "AGPL-3.0"; ada halaman "Scratch Offline Editor" (hanya judul halaman yang terbaca). | Ketentuan penggunaan dan kebijakan privasi (URL yang dicoba 404, tidak terbaca); batas usia akun; lisensi proyek buatan murid; apakah editor luring lengkap tanpa akun; spesifikasi minimum. |
| MakeCode untuk micro:bit | Repositori `pxt` berlisensi "MIT License"; aplikasi luring (MakeCode Offline App) tersedia dengan "Microsoft Software License Terms" yang mengizinkan memasang "any number of copies of the software to develop and test your software applications for use with micro:bit hardware"; syarat itu juga menyebut layanan daring mengirim informasi "as described in Section 4, DATA" (bagian 4 tidak dibaca). | Harga perangkat micro:bit dan ketersediaan di Indonesia; apakah editor daring butuh akun; isi Section 4 (data); kebutuhan peramban/komputer sekolah. |
| Robot edukasi generik (lantai/kartu, tanpa layar) | Tidak ada sumber yang dibuka. | Seluruhnya: harga, lisensi, ketersediaan, daya tahan. Tidak direkomendasikan untuk dibeli sebelum pilot. |

Catatan: sumber di atas semuanya bahasa Inggris atau halaman produk;
penyusun tidak menilai mutu pedagogis dari pemakaian di kelas Indonesia.
Tidak ada alat yang dinilai "terbaik"; penilaian 11 kriteria dan
rekomendasi ada di [`silabus.md`](silabus.md) bagian 11.

## 6. Risiko privasi anak

### 6.1 Dasar hukum (terverifikasi dari PDF UU 27/2022)

- Pasal 4 ayat (2): Data Pribadi yang bersifat spesifik meliputi "data dan
  informasi kesehatan; data biometrik; data genetika; catatan kejahatan;
  data anak; data keuangan pribadi; dan/atau data lainnya sesuai dengan
  ketentuan peraturan perundang-undangan." (butir "data keuangan pribadi"
  kabur di hasil OCR PDF; hanya "data anak" yang dipakai di sini).
- Pasal 25 ayat (2): "Pemrosesan Data Pribadi anak sebagaimana dimaksud pada
  ayat (1) wajib mendapat persetujuan dari orang tua anak dan/atau wali anak
  sesuai dengan ketentuan peraturan perundang-undangan." (Ayat (1) terbaca
  rusak pada hasil ekstraksi, sehingga tidak dikutip.)
- Penetapan: 17 Oktober 2022 (dari halaman peraturan.bpk.go.id).

### 6.2 Risiko khusus pembelajaran coding/KA di SD `[asumsi]`

| Risiko | Contoh | Mitigasi dalam silabus |
| --- | --- | --- |
| Akun pribadi murid di platform daring | Mendaftar akun dengan nama, surel, tanggal lahir. | Tanpa akun murid; bila akun dipakai, hanya akun guru atau akun kelas bernama sintetis; keputusan sekolah. |
| Foto, suara, atau video murid sebagai data | Latihan "mesin mengenali wajah" dengan kamera kelas. | Tanpa kamera atau mikrofon yang merekam murid; "penginderaan" disimulasikan dengan kartu dan benda. |
| Data latih berisi anak | Murid mengunggah foto sendiri ke layanan KA. | Tidak ada unggahan; data latih berupa kartu, benda, atau gambar bebas hak. |
| Layanan KA percakapan | Murid mengobrol dengan asisten KA. | Hanya demonstrasi guru; batas usia layanan `[belum terverifikasi]` tidak diandalkan. |
| Berbagi karya daring | Mengunggah proyek ke komunitas publik. | Karya dibagikan di kelas (cetak/proyektor); komunitas daring tidak wajib. |
| Catatan hasil belajar | Nilai dan identitas murid disimpan di repositori ini. | Tidak ada data murid di repositori (ADR-0004); contoh selalu sintetis. |

## 7. Kesimpulan riset

1. KKA di SD resmi **pilihan**, **kelas V dan VI**, **2 JP/minggu**, mulai
   tahun ajaran 2025-2026 secara bertahap (terverifikasi dari teks
   peraturan).
2. Kelas I-IV tidak punya mapel KKA; program untuk kelas itu adalah
   rancangan penyusun di luar struktur resmi.
3. CP Fase C empat elemen, terverifikasi dari teks SK 046/H/KR/2025
   (bagian 3.5; alamat asal salinan belum terverifikasi); PDF panduan
   **belum terbuka**.
4. Informatika bukan mapel SD; OSN Informatika bukan sasaran SD (lihat
   [`silabus.md`](silabus.md) bagian 8).
5. Alat resmi SD berfokus unplugged dan permainan; alat berlayar adalah
   opsi, bukan tuntutan.

## 8. Rujukan (dibuka 2026-11-19)

1. Permendikdasmen Nomor 13 Tahun 2025, PDF: `https://peraturan.bpk.go.id/Download/384307/Permendikdasmen-no-13-tahun-2025.pdf`.
2. Keputusan Dirjen GTK Nomor 5/B/HK.03.01/2025, PDF: `https://bgtkntb.kemendikdasmen.go.id/pages/kka/Kepdirjen_koding_ttd.pdf`.
3. BGTK Kaltim, halaman Fase C: `https://bgtkkaltim.kemendikdasmen.go.id/2026/02/13/pelajaran-koding-dan-kecerdasan-artifisial-ka-fase-c-kelas-v-dan-vi-sd-mi/`.
4. Program Koding dan KA: `https://kodingka.kemendikdasmen.go.id/pembelajaran/` dan `https://kodingka.kemendikdasmen.go.id/soal-sering-ditanya/`.
5. UU 27/2022: `https://peraturan.bpk.go.id/Details/229798/uu-no-27-tahun-2022` (PDF: `https://peraturan.bpk.go.id/Download/224884/UU%20Nomor%2027%20Tahun%202022.pdf`).
6. CS Unplugged: `https://www.csunplugged.org/en/`.
7. Scratch Foundation untuk guru: `https://scratch.mit.edu/educators`; repositori `scratch-gui` (halaman GitHub, label lisensi).
8. MakeCode: `https://makecode.microbit.org/offline-app` (syarat lisensi aplikasi luring) dan repositori `microsoft/pxt` (halaman GitHub, lisensi MIT).

## Changelog

| Versi | Tanggal | Perubahan |
| --- | --- | --- |
| v0.2.0 | 2026-11-19 | Kutipan CP Fase C dicocokkan dengan SK 046/H/KR/2025 (bagian 3.5, provenance salinan); status dan rujukan ke `silabus.md` diperbarui (issue #128). |
| v0.1.0 | 2026-11-19 | Riset awal (issue #128). |
