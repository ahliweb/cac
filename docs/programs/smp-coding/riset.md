# Riset Pembelajaran Coding SMP (`smp-coding`)

- **Version:** v0.2.0
- **Last updated:** 2026-11-19
- **Status:** DRAF riset (issue #129) — belum keputusan pemilik. Tanggal akses penyusun: **2026-11-19**; berkas yang disediakan orchestrator: Panduan diunduh 2026-11-18, SK 046 salinan (tanggal unduh tidak tercatat).
- **Changeset:** Riset sumber resmi, CP Informatika dan CP Koding dan Kecerdasan Artifisial (KKA) Fase D dari teks resmi, kebijakan KKA, OSN jenjang SMP, dan kajian alat untuk draf silabus coding SMP.

> Dokumen ini adalah **catatan riset**, bukan silabus dan bukan dokumen
> pemerintah. Pola tanda mengikuti `docs/programs/sma-coding/silabus.md`:
> `[belum terverifikasi]` = tidak dapat dipastikan dari sumber yang benar-benar
> dibuka penyusun; `[asumsi]` = keputusan perancangan penyusun. Kutipan
> hanya yang persis dari berkas yang dibuka; kutipan diberi tanda `>`.

## 1. Temuan utama (baca ini dulu)

1. **Teks resmi CP tersedia dari dua dokumen** (bagian 2): (a) *Panduan Mata
   Pelajaran Informatika, Fase D-F* 2025 (URL resmi, diunduh orchestrator
   2026-11-18), yang memuat CP Informatika Fase D; (b) salinan SK Kepala BSKAP
   046/H/KR/2025 yang ditemukan orchestrator, yang memuat CP Informatika dan CP
   Koding dan KA (KKA) Fase D. URL asal salinan SK belum terverifikasi.
2. **CP Informatika Fase D (2025) hanya berelemen Berpikir Komputasional dan
   Literasi Digital**, tanpa elemen Algoritma dan Pemrograman maupun Analisis
   Data. Pemrograman disebut hanya sebagai menuliskan instruksi dalam
   pseudocode; materi esensial Panduan menambahkan "simbol (visual
   programming)". **CP KKA Fase D** berelemen BK, LD, Literasi dan Etika KA,
   serta Pemanfaatan dan Pengembangan KA, juga tanpa pemrograman teks.
   Akibatnya pemrograman teks (Python) di SMP **melampaui rumusan CP**; ini
   mengubah status Python di draf silabus menjadi pengayaan.
3. Dokumen ATP buatan guru yang dibuka lebih dulu (delapan elemen: BK, TIK, SK,
   JKI, AD, AP, DSI, PLB) mencerminkan CP versi lama (sebelum 046/H/KR/2025);
   kini hanya **pembanding** (bagian 2.4), tidak dipakai sebagai kutipan.
4. Koding dan KA adalah **mata pelajaran pilihan** di SMP (kelas 7, 8, 9)
   menurut pernyataan Menteri dan pejabat Kemendikdasmen yang dimuat media
   (bagian 3). SK 046 memuat CP KKA dan menyebut Permendikdasmen Nomor 13
   Tahun 2025 di konsiderans. Alokasi 2 JP per minggu berasal dari ringkasan
   naskah akademik di situs sekunder; angka dalam regulasi `[belum
   terverifikasi]`.
5. **OSN Informatika hanya untuk SMA/sederajat** (situs `osn.toki.id`, dibuka
   langsung). Tidak ada jembatan OSN SMP Informatika yang dapat dipastikan;
   jembatan OSN untuk lulusan SMP adalah lewat program `sma-coding` jalur A.
6. Alat: Scratch, micro:bit (MakeCode), dan Python semuanya tersedia gratis
   dan dapat dipakai tanpa memasukkan data murid; rincian dan hal yang belum
   terverifikasi di bagian 5.

## 2. Capaian Pembelajaran (CP) Fase D

### 2.1 Akses sumber resmi dan provenance

| Sumber | Provenance | Hasil |
| --- | --- | --- |
| `https://repositori.kemendikdasmen.go.id/33634/1/32.%20Panduan%20Mata%20Pelajaran%20Informatika.pdf` (Panduan Mata Pelajaran Informatika, Fase D-F, Pusat Kurikulum dan Pembelajaran 2025; metadata PDF: dibuat 12 September 2025) | Diunduh **orchestrator pada 2026-11-18** dari URL resmi itu; teks diekstrak dengan `pdftotext -layout` (6.703 baris); berkas yang sama dengan sumber kutipan CP Fase E dan F di `docs/programs/sma-coding/silabus.md` | **Terverifikasi dan dikutip.** CP Fase D di bagian B.d (halaman cetak 11-12); materi esensial Fase D (bagian C); contoh alur tujuan pembelajaran Fase D. |
| Salinan SK Kepala BSKAP Nomor 046/H/KR/2025 tentang Capaian Pembelajaran pada PAUD, Jenjang Pendidikan Dasar, dan Jenjang Pendidikan Menengah | PDF 1.691 halaman bertanda "SALINAN" yang **ditemukan orchestrator**; **URL asal belum terverifikasi** (tidak tercatat, dan penyusun tidak menemukan URL resminya); teks diekstrak penyusun dari salinan itu | Dibuka dan dikutip. Ditetapkan di Jakarta, 16 Juli 2025; mulai berlaku sejak ditetapkan; mencabut Keputusan Kepala Badan 32/H/KR/2024 (Diktum KETUJUH dan KEDELAPAN). Konsiderans menyebut Permendikdasmen Nomor 13 Tahun 2025. CP Informatika: Lampiran II bagian XI; CP Koding dan KA: Lampiran II bagian XXVIII (Lampiran III, SMK, bagian IV memuat KKA terpisah). Kesesuaian salinan dengan aslinya `[belum terverifikasi]`. |
| Jalur akses penyusun sendiri | `curl` ke repositori Kemendikdasmen kehabisan waktu (30, 40, 60 detik) dan alat pengambil halaman menjawab `ECONNREFUSED`; portal kurikulum, buku guru Informatika VII, dan situs Puspresnas juga tidak terjangkau | Penyusun tidak membuka sumber resmi langsung; semua kutipan resmi dicocokkan ke berkas yang disediakan orchestrator (bagian 7). |

### 2.2 CP Informatika Fase D: kutipan persis dari Panduan 2025

Bagian B.d.1 Panduan: elemen **Berpikir Komputasional** (1.1) dan **Literasi
Digital** (1.2). Teks SK 046 (Lampiran II bagian XI.D.1) memuat rumusan yang
sama tanpa kata pembuka "murid mampu" (kalimat pembukanya: "Pada akhir Fase D,
murid memiliki kemampuan sebagai berikut"). Hanya spasi dan pemenggalan baris
yang dinormalkan (di Panduan juga penanda pergantian halaman di tengah kutipan Literasi Digital).

*1.1 Berpikir Komputasional*

> Pada akhir fase D, murid mampu menerapkan berpikir komputasional untuk problem dalam kehidupan sehari-hari maupun dalam menghadapi masalah komputasi; memahami konsep himpunan data terstruktur dalam kehidupan sehari-hari; memahami konsep lembar kerja pengolah data; menerapkan berpikir komputasional dalam menyelesaikan persoalan yang mengandung himpunan data berstruktur sederhana dengan volume kecil; serta menuliskan sekumpulan instruksi dengan menggunakan sekumpulan kosakata terbatas atau simbol dalam format pseudocode.

*1.2 Literasi Digital*

> Pada akhir fase D, murid mampu memahami cara kerja dan penggunaan mesin pencari di internet; mengetahui kualitas informasi dan kredibilitas sumber informasi digital; mengenal ekosistem media pers digital; membedakan fakta, opini, dan hoaks; memahami pemanfaatan perangkat teknologi pengolah dokumen, lembar kerja, dan presentasi; mampu mendeskripsikan komponen, fungsi, dan cara kerja komputer; memahami konsep dan penerapan konektivitas jaringan lokal dan internet baik kabel maupun nirkabel; mengetahui jenis ruang publik virtual; memahami pemanfaatan perangkat teknologi digital untuk produksi dan diseminasi konten; memahami pentingnya menjaga rekam jejak digital, mengamalkan toleransi dan empati di dunia digital, memahami dampak perundungan digital, membuat kata sandi yang aman; memahami pengamanan perangkat dari berbagai jenis malware, memilah informasi yang bersifat privat dan publik, melindungi data pribadi dan identitas digital serta memiliki kesadaran penuh (mindfulness) dalam dunia digital.

Catatan dari Panduan yang relevan:

| Butir | Isi | Lokasi |
| --- | --- | --- |
| Elemen Informatika | Empat elemen mata pelajaran (BK, LD, Analisis Data, Algoritma dan Pemrograman); Fase D memuat dua elemen pertama | Bagian B (deskripsi elemen) dan B.d |
| Pemrograman di Fase D | Materi esensial "(4) Dasar pemrograman": "Kreasi Solusi Tertulis", "Instruksi prosedural" dengan "Kosa kata terbatas", "simbol (visual programming)", "teks (pseudocode)" | Bagian C, Fase D |
| Proyek mini Fase D | Murid merancang solusi berbasis teknologi sederhana "melalui kegiatan secara unplugged (menyusun kartu) atau dengan memanfaatkan software pembuat aplikasi (scratch, blocky atau bahasa pemrograman berbasis blok lainnya) jika tersedia" | Bagian C, penjelasan materi 1 |
| Materi data | Himpunan data terstruktur: bervolume kecil, daftar, antrian, tumpukan, pohon, graf; lembar kerja: baris, kolom, sel, pengalamatan absolut dan relatif, pengurutan, penyaringan, peringkasan | Bagian C, Fase D |
| Beban per elemen | "beban belajar yang dialokasi pada setiap elemen ... tidak harus sama" | Bagian B.c |
| Alur tujuan (contoh) | Tujuan pembelajaran 1.1-1.5 (BK) dan 2.1-2.17 (LD) dibagi ke kelas VII, VIII, dan IX | Bagian D.2 (halaman cetak 85-87) |
| Menit per JP (contoh) | Contoh RPP Fase D kelas 7: "Alokasi Waktu: 6 JP x 40 menit (2 pertemuan)" | Contoh Rencana Pelaksanaan Pembelajaran Fase D (bagian Perencanaan Pembelajaran Mendalam) |

### 2.3 CP Koding dan Kecerdasan Artifisial (KKA) Fase D: kutipan persis dari SK 046

Sumber: salinan SK 046/H/KR/2025 (provenance di bagian 2.1; **URL asal belum
terverifikasi**), Lampiran II, bagian XXVIII.D.2 ("Fase D (Umumnya untuk Kelas
VII, VIII dan IX SMP/MTs)"). Kalimat pembuka SK: "Pada akhir Fase D, murid
memiliki kemampuan sebagai berikut." Hanya spasi, pemenggalan baris, dan
karakter tak terlihat (spasi lebar nol) yang dinormalkan.

*2.1 Berpikir Komputasional*

> Menerapkan pengelolaan data, pemecahan masalah sederhana dalam kehidupan masyarakat secara sistematis, dan menuliskan instruksi.

*2.2 Literasi Digital*

> Memproduksi dan mendiseminasi konten digital berupa audio, video, slide, dan infografis.

*2.3 Literasi dan Etika Kecerdasan Artifisial*

> Memahami perbedaan cara manusia dan KA menggabungkan informasi dari beberapa perangkat penginderaan atau sensor, memahami bagaimana komputer memaknai informasi dari perangkat penginderaan atau sensor, memahami kualitas data, serta manfaat dan dampak KA pada kehidupan masyarakat. Memahami etika penggunaan KA dalam kehidupan sehari-hari seperti menjaga data pribadi dalam menggunakan KA, KA adalah sebagai alat bantu sehingga manusia tidak boleh tergantung dan percaya sepenuhnya pada KA karena KA masih sangat mungkin menghasilkan output yang salah, bias, atau melakukan halusinasi, serta menganalisis konten deep fake dalam bentuk gambar, audio, atau video.

*2.4 Pemanfaatan dan Pengembangan Kecerdasan Artifisial*

> Menggunakan perangkat KA sederhana dengan kritis dan mampu menuliskan input bermakna ke dalam sistem KA.

Catatan dari SK tentang KKA (parafrasa, bukan kutipan): KKA "merupakan
pendalaman computer science" dengan fokus berpikir komputasional, literasi
digital, algoritma pemrograman, analisis data, dan etika KA; praktik mendalam
berpikir komputasional dan literasi digital **tingkat dasar** pada jenjang SMP;
pembelajaran dapat internet-based, plugged, atau unplugged; pendekatan
*human-centered*. Elemen SMP hanya empat (BK, LD, Literasi dan Etika KA,
Pemanfaatan dan Pengembangan KA); elemen Algoritma Pemrograman dan Analisis
Data baru muncul di Fase E. Catatan salinan: CP Informatika Fase D pada SK
ditulis "Umumnya untuk Kelas VII, VIII, dan XI" (tampak salah ketik untuk IX).

### 2.4 Pembanding: dokumen ATP buatan guru dan CP versi lain (bukan kutipan)

| Sumber | Status | Catatan |
| --- | --- | --- |
| `https://static.perangkat-ajar.belajar.id/SMP.D.INF.IPS.1.pdf` (dibuka 2026-11-19, PDF 24 halaman, dokumen ATP Fase D buatan seorang guru di domain `belajar.id`) | **Pembanding saja.** Dokumen guru, bukan resmi; tanpa nomor SK sumber. | Memuat CP berstruktur **delapan elemen** (BK, TIK, SK, JKI, AD, AP, DSI, PLB) dengan elemen Algoritma dan Pemrograman ("pemrograman blok (visual)", "mengenal pemrograman tekstual sederhana") dan Analisis Data. Rumusan itu **tidak ada** di CP 2025 (Panduan dan SK 046), jadi tampaknya CP versi lama yang telah dicabut. Kutipan darinya dari draf v0.1 sudah dihapus. |
| SK Kepala BSKAP 032/H/KR/2024 | Dicabut oleh 046/H/KR/2025 (Diktum KETUJUH SK 046) | Hanya disebut situs sekunder `https://kurikulummerdeka.com/capaian-pembelajaran-cp-informatika-fase-d-e-dan-f-di-kurikulum-merdeka-2024/` (dibuka; tidak dikutip). |
| `https://guruinovatif.id/artikel/bskap-terbitkan-cp-terbaru-2025-struktur-pembelajaran-mata-pelajaran-koding-ai-di-kurikulum-merdeka` | Sekunder | Menyatakan Fase D = kelas VII-IX dan CP 2025 menambah mata pelajaran Koding dan KA; sesuai dengan SK 046. |

## 3. Kebijakan mata pelajaran pilihan Koding dan Kecerdasan Artifisial (KKA)

Butir di bawah berasal dari **berita dan situs sekunder**, kecuali baris
yang menyebut SK 046; teks Permendikdasmen dan lampiran struktur kurikulum
tidak dibuka. CP KKA sendiri ada di bagian 2.3.

| Butir | Temuan | Sumber dibuka | Status |
| --- | --- | --- | --- |
| Status | Koding dan KA adalah mata pelajaran **pilihan** (bukan wajib) di SD kelas 5, SMP, dan SMA. Mendikdasmen (dikutip InfoPublik, 13 Maret 2026): "Mulai tahun pelajaran 2025–2026, coding dan Artificial Intelligence telah menjadi mata pelajaran pilihan mulai dari jenjang SD kelas 5, SMP, hingga SMA." | `https://infopublik.id/kategori/pp-tunas/962486/kemendikdasmen-mulai-terapkan-mata-pelajaran-coding-dan-ai-pada-tahun-ajaran-2025-2026` (situs berita publik pemerintah) | Pernyataan pejabat, tertulis di berita resmi pemerintah. Teks regulasi `[belum terverifikasi]`. |
| Kemungkinan menjadi wajib | Pernyataan yang sama: "Jika jumlah guru yang terlatih sudah memadai, tidak menutup kemungkinan coding dan AI akan dikembangkan menjadi mata pelajaran wajib di masa mendatang." | InfoPublik (di atas) | Pernyataan pejabat; bukan keputusan. |
| Metode | Tiga klasifikasi metode disebut: coding tanpa perangkat (*unplugged*), coding berbasis internet, dan coding berbasis permainan tanpa komputer, agar sekolah dengan infrastruktur terbatas tetap dapat mengajar. | InfoPublik (di atas) | Pernyataan pejabat. |
| Pelatihan guru | Sekitar 55 ribu guru dilatih, cakupan sekitar 38 persen satuan pendidikan (per Maret 2026). | InfoPublik (di atas) | Pernyataan pejabat. |
| Alokasi JP | Naskah akademik (ringkasan) menyarankan Koding dan KA pilihan di SD kelas 5-6, **SMP kelas 7, 8, dan 9**, serta SMA/SMK kelas 10 dengan **2 JP per minggu**; SMA kelas 11-12 dapat hingga 5 JP, SMK kelas 11-12 hingga 4 JP; sekolah boleh mengembangkannya sebagai ekstrakurikuler atau mengintegrasikannya ke mata pelajaran lain. | `https://kurikulummerdeka.com/langkah-strategis-pembelajaran-koding/` (situs sekunder, 25 Oktober 2025, meringkas "Naskah Akademik") | Ini **rekomendasi naskah akademik** menurut situs sekunder, bukan ketentuan struktur kurikulum. `[belum terverifikasi]`. Hasil pencarian menyebut angka lain (64 JP per tahun) dalam dokumen lain; tidak dibuka. |
| Dasar regulasi | SK 046/H/KR/2025 (ditetapkan 16 Juli 2025) memuat CP Koding dan KA untuk Fase C, D, E, F (Lampiran II bagian XXVIII dan Lampiran III bagian IV). Konsiderans SK menyebut pelaksanaan Pasal 11 ayat (1) Permendikbudristek Nomor 12 Tahun 2024 sebagaimana diubah dengan Peraturan Menteri Pendidikan Dasar dan Menengah Nomor 13 Tahun 2025. | Salinan SK 046 dari orchestrator (URL asal belum terverifikasi). | Nomor Permen **terverifikasi dari konsiderans SK**; teks Permen dan ketentuan "pilihan" serta struktur JP di dalamnya `[belum terverifikasi]`. |
| Tahun mulai | Dua pernyataan berbeda beredar: "mulai tahun pelajaran 2025-2026" (Mendikdasmen, 2026) dan, dalam hasil pencarian lain, tahun ajaran 2026/2027 untuk pelaksanaan lebih luas. | InfoPublik (dibuka); sumber 2026/2027 hanya hasil pencarian, tidak dibuka. | Tahun mulai efektif per sekolah `[belum terverifikasi]`. |
| Sasaran isi | Wakil Kemendikdasmen (Republika, 26 Juni 2025): koding di SD sampai SMA lebih ditekankan pada melatih *computational thinking*, bukan membuat murid menulis kode seperti jurusan ilmu komputer: "Coding di sini bukan membuat modul program, tetapi pendekatan untuk melatih computational thinking anak-anak kita." Murid juga perlu diajar bahwa AI adalah alat, dengan pendampingan guru dan orang tua serta etika penggunaan AI. | `https://news.republika.co.id/berita/sygtsq458/siapsiap-coding-dan-ai-diajarkan-untuk-sdsmpsma-mulai-tahun-ajaran-depan` | Pernyataan tenaga ahli Kemendikdasmen di media. |
| SKB tujuh menteri | Pedoman pemanfaatan teknologi digital dan AI pada jalur pendidikan ditandatangani 12 Maret 2026; mempertimbangkan kesiapan usia, termasuk durasi penggunaan dan jenis konten. | InfoPublik (di atas) | Berita; teks SKB tidak dibuka. Relevan untuk bagian etika dan privasi draf silabus. |
| Kemitraan swasta | Inisiatif swasta (disebut di berita) mengarahkan SMP ke "pengembangan aplikasi mobile" dan SMA ke Python. | `https://www.gebrak.id/?p=40307` (20 Agustus 2025; kutipan pihak swasta) | Bukan kebijakan pemerintah; **tidak dijadikan dasar** rancangan. |

**Implikasi untuk rancangan:** KKA bersifat pilihan dan menekankan berpikir
komputasional, sehingga silabus dirancang (a) cukup untuk 2 JP per minggu,
(b) dapat dipakai sebagai mata pelajaran pilihan, ekstrakurikuler, atau
modul terintegrasi, dan (c) tidak mensyaratkan perangkat pada setiap
pertemuan (opsi *unplugged* tercantum di setiap minggu).

## 4. OSN Informatika dan jenjang SMP

| Butir | Temuan | Status |
| --- | --- | --- |
| OSN Informatika | Situs `https://osn.toki.id/` (dibuka 2026-11-19): "OSN (Olimpiade Sains Nasional) merupakan olimpiade tahunan tingkat SMA/sederajat yang diadakan oleh: Pusat Prestasi Nasional, Kemendikdasmen, dan didukung oleh Ikatan Alumni TOKI (Tim Olimpiade Komputer Indonesia)." Tahap: OSN-K, OSN-P, OSN; medalis diseleksi untuk IOI. | **Terverifikasi** dari halaman yang dibuka. Situs itu **hanya untuk SMA/sederajat**; tidak ada silabus SMP di situ. |
| OSN jenjang SMP | Hasil pencarian menyebut cabang OSN SMP adalah Matematika, IPA, dan IPS, **tanpa Informatika** (sumber sekunder: situs berita dan bimbingan belajar). | `[belum terverifikasi]`: halaman Puspresnas (`pusatprestasinasional.kemdikbud.go.id`, termasuk Pedoman OSN SMP/MTs 2024) **tidak dapat dibuka** (DNS tidak terpecahkan). Hanya hasil pencarian. |
| Silabus OSN Informatika | Ada di `osn.toki.id/silabus` (R1) dan korpus program `osn` repositori ini (rumpun materi `data/osn/topic-families.json`). | Sudah dikerjakan program `osn`; tidak diulang di sini. |
| Kompetisi lain untuk SMP | Tidak diverifikasi (halaman biro Bebras Indonesia dibuka tetapi kosong tanpa JavaScript). | `[belum terverifikasi]`; tidak dijadikan dasar. |

**Implikasi:** tidak ada kompetisi OSN Informatika SMP yang dapat dirujuk
sebagai tujuan. "Jembatan OSN" di draf silabus berarti persiapan fondasi
untuk jalur A program `sma-coding` (C++ dan rumpun materi OSN SMA), dan
pengayaan pemecahan masalah opsional di SMP.

## 5. Kajian alat

Semua status di bawah berasal dari halaman yang dibuka 2026-11-19. Harga
perangkat keras tidak dicari (tidak ada angka yang diklaim).

| Alat | Fungsi di SMP | Lisensi, biaya, akun (terverifikasi) | Belum terverifikasi |
| --- | --- | --- | --- |
| Scratch (`scratch.mit.edu`) | Pemrograman blok: animasi, game, cerita (D-BK-e, DK-BK-c) | Halaman "about" Scratch Foundation: "Scratch is free for everyone"; nirlaba pengembang editor dan komunitas daring. Kode editor `scratch-gui` (berkas `LICENSE` cabang `develop`, halaman GitHub dibuka) berteks **GNU Affero General Public License**; halaman itu menyatakan repositori **diarsipkan pemilik pada 10 Juni 2026 (hanya-baca)**. | Syarat penggunaan dan kebijakan privasi (halaman `terms_of_use`/`privacy_policy` tidak terbuka tanpa JavaScript): batas usia akun, kewajiban izin orang tua. Ketersediaan editor luring dan statusnya setelah repositori diarsipkan. |
| micro:bit dan MakeCode (`microbit.org`, `makecode.microbit.org`) | Blok untuk perangkat dan simulator (D-LD-f, D-BK-e); Python opsional | Panduan resmi menyebut editor resmi: Microsoft MakeCode, micro:bit Python Editor, micro:bit classroom, aplikasi seluler; sumber ajar "free resources"; blok, Python, dan Scratch disebut didukung. MakeCode memiliki simulator di peramban (halaman MakeCode mencantumkan simulasi perangkat). | Harga papan, ketersediaan di Indonesia, lisensi editor, dan kebutuhan akun penyimpanan proyek. |
| Python | Bahasa teks pertama yang disarankan (pengayaan di luar rumusan CP Fase D) | Python Software Foundation = organisasi nirlaba di balik Python; halaman *History and License* dokumentasi resmi dibuka (lisensi PSF; teks lisensi tidak dikutip di sini). Python dijalankan di peramban melalui **Pyodide** (distribusi Python berbasis WebAssembly yang berjalan di peramban dan Node.js, halaman proyek dibuka), tanpa instalasi. | Lisensi Pyodide, lingkungan menulis yang cocok untuk anak SMP (editor ringan yang tidak memakai akun) tidak dikaji; belum ada alat editor tertentu yang diperiksa. |
| Python Tutor (`pythontutor.com`) | Visualisasi eksekusi kode | Halaman menyatakan dapat memvisualisasi dan men-*debug* Python, Java, C, C++, dan JavaScript, serta menyediakan "AI help". | Kebijakan data dan privasi layanan; fitur "AI help" mengirim kode ke layanan luar, **tidak disarankan** untuk murid sebelum kebijakannya dikaji. |
| PythonAnywhere | Python di server daring | Halaman menyatakan paket dasar gratis; paket berbayar mulai $10 per bulan. Memerlukan akun. | Batas usia dan privasi akun; tidak disarankan karena butuh akun murid. |
| JavaScript | Bahasa teks alternatif | Dokumentasi bahasa tersedia gratis (MDN, halaman dibuka); berjalan di setiap peramban tanpa instalasi. | Lingkungan belajar anak SMP dan jembatan ke `sma-coding` jalur B tidak dikaji mendalam. |
| C++ | Bahasa teks alternatif (jembatan langsung ke OSN dan jalur A) | Tidak ada halaman baru yang dibuka; kompilasi memakai `g++` seperti modul sma-coding. | Kelayakan untuk kelas 8 (sintaks dan tipe statis); tidak diuji. |


## 6. Hal yang tetap belum terverifikasi

| Butir | Tindakan yang diminta |
| --- | --- |
| URL resmi SK 046/H/KR/2025 dan kesesuaian salinan dengan aslinya | Pemilik atau tim memberi URL resmi (atau mengonfirmasi asal salinan). |
| Teks Permendikdasmen Nomor 13 Tahun 2025 (ketentuan "pilihan", struktur, JP KKA) | Pemilik atau tim menyediakan tautan resmi. |
| Alokasi JP KKA per minggu (2 JP hanya dari ringkasan naskah akademik di situs sekunder) | Dicek ke teks regulasi atau lampiran struktur. |
| Menit per JP di SMP (contoh RPP Panduan memakai 40 menit; itu contoh, bukan ketentuan) | Dicek ke standar proses yang berlaku. |
| Syarat akun Scratch dan micro:bit, harga papan micro:bit | Dicek dari lingkungan yang menjangkau halaman itu. |
| Cabang OSN SMP | Dicek ke Pedoman OSN SMP/MTs di situs Puspresnas. |

## 7. Pencocokan kutipan

Pencocokan dilakukan dengan skrip sementara (tidak disimpan di repositori;
di luar scope) yang membaca setiap baris kutipan (`> ...`) di `riset.md` dan
`silabus-draf.md`, menormalkan spasi, spasi setelah tanda hubung, dan
karakter spasi lebar nol, lalu mencari kecocokan persis di salah satu dari:
teks `pdftotext -layout` Panduan (untuk blok 1.1 dan 1.2) atau teks
`pdftotext -layout` salinan SK 046 (untuk blok KKA). Hasilnya dicatat dalam
laporan pelaksana pada issue #129.

## 8. Daftar rujukan yang dibuka

| Sumber | Peran |
| --- | --- |
| Panduan Mata Pelajaran Informatika, Fase D-F (`repositori.kemendikdasmen.go.id/33634/...`), salinan teks dari orchestrator, diunduh 2026-11-18 | CP Informatika Fase D (kutipan persis); materi esensial; alur tujuan; contoh RPP. |
| Salinan SK 046/H/KR/2025 dari orchestrator (URL asal belum terverifikasi) | CP Informatika dan KKA Fase D (kutipan persis); tanggal berlaku; konsiderans. |
| `https://static.perangkat-ajar.belajar.id/SMP.D.INF.IPS.1.pdf` (2026-11-19) | Pembanding: CP versi lama (dokumen guru). |
| `https://infopublik.id/kategori/pp-tunas/962486/kemendikdasmen-mulai-terapkan-mata-pelajaran-coding-dan-ai-pada-tahun-ajaran-2025-2026` (2026-11-19) | Status KKA pilihan; metode; SKB tujuh menteri (13 Maret 2026). |
| `https://news.republika.co.id/berita/sygtsq458/siapsiap-coding-dan-ai-diajarkan-untuk-sdsmpsma-mulai-tahun-ajaran-depan` (2026-11-19) | Penekanan berpikir komputasional dan etika AI (26 Juni 2025). |
| `https://kurikulummerdeka.com/langkah-strategis-pembelajaran-koding/` (2026-11-19) | Ringkasan naskah akademik: 2 JP per minggu (sekunder). |
| `https://guruinovatif.id/artikel/bskap-terbitkan-cp-terbaru-2025-struktur-pembelajaran-mata-pelajaran-koding-ai-di-kurikulum-merdeka`, `https://kurikulummerdeka.com/capaian-pembelajaran-cp-informatika-fase-d-e-dan-f-di-kurikulum-merdeka-2024/` (2026-11-19) | Sekunder; tidak dikutip. |
| `https://www.gebrak.id/?p=40307` (2026-11-19) | Kemitraan swasta (tidak menjadi dasar). |
| `https://osn.toki.id/` (2026-11-19) | OSN Informatika tingkat SMA/sederajat. |
| `https://scratch.mit.edu/about`, `https://github.com/scratchfoundation/scratch-gui/blob/develop/LICENSE` (2026-11-19) | Scratch: gratis; lisensi editor; repositori diarsipkan. |
| `https://microbit.org/get-started/user-guide/overview/`, `https://makecode.microbit.org/about` (2026-11-19) | micro:bit dan MakeCode. |
| `https://www.python.org/psf-landing/`, `https://docs.python.org/3/license.html`, `https://pyodide.org/en/stable/` (2026-11-19) | Python, lisensi, Pyodide. |
| `https://pythontutor.com/`, `https://www.pythonanywhere.com/`, `https://developer.mozilla.org/en-US/docs/Web/JavaScript` (2026-11-19) | Alat pembanding. |

**Tidak dibuka penyusun (gagal atau hanya hasil pencarian):** repositori
Kemendikdasmen secara langsung (isinya dipakai lewat salinan orchestrator),
portal kurikulum, buku guru Informatika VII, situs Puspresnas (Pedoman dan
Silabus OSN SMP), situs biro Bebras, teks Permendikdasmen KKA.

## Changelog

| Versi | Tanggal | Perubahan |
| --- | --- | --- |
| v0.2.0 | 2026-11-19 | Teks resmi CP Fase D (Panduan 2025 dan SK 046) menggantikan kutipan dokumen guru; dokumen guru menjadi pembanding; CP KKA Fase D ditambahkan; provenance dicatat; bagian 3 dan 6 diperbarui (issue #129). |
| v0.1.0 | 2026-11-19 | Riset awal (issue #129). |
