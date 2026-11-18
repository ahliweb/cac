# Riset Buku AI Karya Onno W. Purbo — Rujukan untuk Program Coding SMA

- **Version:** v0.2.0
- **Last updated:** 2026-11-18
- **Status:** Riset selesai; keputusan pemilik 2026-11-18: jalur AI terpisah (jalur D, issue #84)
- **Changeset:** Keputusan pemilik atas opsi pemanfaatan dicatat: jalur AI terpisah (jalur D, #84).

> **Keputusan pemilik (2026-11-18, dialog pilihan):** hasil riset ini
> dimanfaatkan sebagai **jalur AI terpisah** (jalur D), ditindaklanjuti di
> issue #84. Isi riset di bawah tetap catatan riset, bukan silabus.
>
> Dokumen ini adalah konten karangan
> menurut [ADR-0007](../../architecture/adr/0007-authored-learning-content.md):
> hasil riset dan penilaian penyusun, bukan transkripsi sumber resmi dan
> bukan keputusan. Satu-satunya hal yang dikutip dari sumber luar adalah
> data bibliografis (judul, penulis, tahun, jumlah halaman) dan judul bab
> pendek; ringkasan isi ditulis ulang dengan kata penyusun. Pilihan
> pemanfaatan (bagian 6) adalah hak pemilik.

## 1. Tujuan dan ruang lingkup

Pemilik meminta (2026-11-18) pemetaan buku AI / machine learning / data
science karya Onno W. Purbo (tokoh TI Indonesia) sebagai kemungkinan rujukan
program coding SMA ([`silabus.md`](silabus.md)) dan/atau
pembinaan OSN. Dokumen ini mencatat apa yang **benar-benar terbaca** dari
sumber primer, menilai kecocokannya dengan butir CP dan jalur A/B, dan
menyajikan opsi pemanfaatan. Isi buku tidak disalin.

Tanggal cek semua sumber: **2026-11-18**.

## 2. Metode pencarian

| Langkah | Hasil |
| --- | --- |
| Pencarian web (kata kunci: "Onno W. Purbo buku kecerdasan buatan / AI / machine learning / deep learning / data science", "Onno Center AI buku gratis", "AI dan Kamu ... ISBN") | Mengarahkan ke situs penerbit InTech Press ITTS dan beberapa berita/blog sekunder. Mesin pencari tidak memunculkan judul buku ML/deep learning klasik atas nama Onno. |
| Google Books API / feed (`inauthor:"Onno W. Purbo"`) | Satu permintaan terjawab tetapi hasilnya tidak relevan (buku jaringan dengan kata pengantar Onno); satu lagi HTTP 429. **Tidak dipakai sebagai bukti.** |
| Situs penerbit `intechpress.itts.ac.id` (halaman Buku Gratis, halaman tiap judul, peta situs, Tentang Kami, Penerbitan) | **Sumber primer utama.** Dibuka dan dibaca. |
| Halaman baca `online.fliphtml5.com/intech-press/...` (enam buku SMA) | Dibuka untuk metadata judul/deskripsi. Isi buku tidak dibaca. |
| Katalog Perpustakaan Telkom University (`openlibrary.telkomuniversity.ac.id`) | Dibuka untuk satu judul (ISBN tercatat di katalog). |
| `onnocenter.or.id` | Dapat diakses hanya dengan mengabaikan pemeriksaan sertifikat TLS (sertifikat kedaluwarsa); beranda tidak memuat daftar buku. Tidak dipakai sebagai sumber. |
| Berkas Google Drive / unduhan PDF buku | **Tidak dibuka** (hanya tautannya dicatat). |
| `nurfachmi.com`, `news.ambisius.com`, `rmol.id` | Tidak terbaca (403, halaman pemeliharaan, isi tidak memuat konten relevan). Hanya muncul sebagai cuplikan hasil pencarian. |
| Perpusnas (`isbn.perpusnas.go.id`), Gramedia, katalog universitas lain | **Tidak dicoba langsung**; belum ada ISBN untuk seri SMA yang dapat dikonfirmasi. |

Keterbatasan: penyusun tidak membaca isi PDF buku mana pun. Cakupan buku
diambil dari deskripsi penerbit dan metadata halaman baca; keduanya bisa
berbeda dari isi sebenarnya (lihat catatan di bagian 3.1).

## 3. Buku terverifikasi

"Terverifikasi" berarti judul, penulis, tahun, dan jumlah halaman terbaca
pada halaman penerbit yang dibuka. Lisensi tidak dinyatakan di halaman mana
pun yang dibuka kecuali disebut lain.

### 3.1 Seri "Buku AI SMA" (InTech Press, 2025) — enam jilid

Sumber: halaman daftar
[Buku Gratis](https://intechpress.itts.ac.id/buku-gratis/) (dibuka
2026-11-18) dan halaman tiap judul pada situs yang sama (URL di kolom
terakhir). Penerbit: InTechPress (Institut Teknologi Tangerang Selatan,
ITTS). Bahasa: Indonesia. Format: PDF, tersedia "Baca" (flipbook) dan
"Unduh" (tautan Google Drive / FlipHTML5). Ketersediaan: **dibagikan
gratis** di halaman "BUKU AI SMP, SMA & SMK GRATIS". **Lisensi: tidak
dinyatakan** di halaman yang dibuka `[belum terverifikasi]`. ISBN: tidak
tertera di halaman yang dibuka `[belum terverifikasi]`.

| Jilid | Judul persis (halaman penerbit) | Penulis | Hlm. | Sumber |
| --- | --- | --- | --- | --- |
| Kelas X smt 1 | Artificial Intelligence : AI dan Kamu : Langkah Awal Jadi Generasi Siap Teknologi | Aolia Ikhwanudin, Onno W purbo | 127 | [halaman judul](https://intechpress.itts.ac.id/2025/08/25/artificial-intelligence-ai-dan-kamu-langkah-awal-jadi-generasi-siap-teknologi/); [baca](https://online.fliphtml5.com/intech-press/drbf/) |
| Kelas X smt 2 | Artificial Intelligence : AI di Tanganmu : Dari Teori ke Proyek Nyata dan Masa Depan Teknologi | Aolia Ikhwanudin, Onno W purbo | 127 | [halaman judul](https://intechpress.itts.ac.id/2025/08/25/artificial-intelligence-ai-di-tanganmu-dari-teori-ke-proyek-nyata-dan-masa-depan-teknologi/); [baca](https://online.fliphtml5.com/intech-press/qtft/) |
| Kelas XI smt 1 | Artificial Intelligence : Langkah Awal Jadi Data Scientist: AI, Visualisasi, dan Analisis Emosi | Junaidi, Onno W purbo | 127 | [halaman judul](https://intechpress.itts.ac.id/2025/08/25/artificial-intelligence-langkah-awal-jadi-data-scientist-ai-visualisasi-dan-analisis-emosi/); [baca](https://online.fliphtml5.com/intech-press/sxlm/) |
| Kelas XI smt 2 | Artificial Intelligence : Penerapan AI Nyata: Dari ChatGPT, Orange, hingga Google TM | Irwan Siswanto, Onno W purbo | 127 | [halaman judul](https://intechpress.itts.ac.id/2025/08/25/artificial-intelligence-penerapan-ai-nyata-dari-chatgpt-orange-hingga-google-tm/); [baca](https://online.fliphtml5.com/intech-press/fafe/) |
| Kelas XII smt 1 | Artificial Intelligence : Belajar dari Dunia Nyata : Studi Kasus & Riset AI yang Bikin Penasaran | Anita Triana, Onno W purbo | 149 | [halaman judul](https://intechpress.itts.ac.id/2025/08/26/artificial-intelligence-belajar-dari-dunia-nyata-studi-kasus-riset-ai-yang-bikin-penasaran/); [baca](https://online.fliphtml5.com/intech-press/hkpf/) |
| Kelas XII smt 2 | Artificial Intelligence :  AI untuk Masa Depanmu : Bangun proyek, Kerja Tim, dan Simulasi Dunia Kerja | Taufiq Iqbal Ramdhani, Onno W purbo | 152 | [halaman judul](https://intechpress.itts.ac.id/2025/08/26/artificial-intelligence-ai-untuk-masa-depanmu-bangun-proyek-kerja-tim-dan-simulasi-dunia-kerja/); [baca](https://online.fliphtml5.com/intech-press/vakq/) |

Tahun terbit pada keenam halaman: 2025. Onno W. Purbo tercantum sebagai
penulis (urutan kedua, bersama satu penulis pendamping per jilid).

Ringkasan cakupan per jilid (kata penyusun, dari deskripsi penerbit dan
metadata halaman baca):

| Jilid | Cakupan menurut deskripsi | Alat | Prasyarat | Catatan |
| --- | --- | --- | --- | --- |
| X-1 | Dasar AI dalam 16 pertemuan: apa itu AI, penerapannya sehari-hari, cara komputer "berpikir", etika. Metadata flipbook menyebut bab seperti "Evolusi AI: Dari Mesin Hitung ke Chatbot", "Pengenalan Dataset & Labeling". | Asisten AI percakapan (ChatGPT, Gemini, Grok disebut di flipbook) | Tidak dinyatakan `[belum terverifikasi]` | Tanpa pemrograman. |
| X-2 | Deskripsi penerbit: big data, AI generatif, membangun model sederhana dengan Orange Data Mining, etika dan tantangan hukum. Metadata flipbook: "Penerapan AI Dasar dengan Google TM" (Teachable Machine untuk gambar dan suara, pelabelan data, uji akurasi). | Orange Data Mining dan/atau Google Teachable Machine | Tidak dinyatakan | **Deskripsi penerbit dan metadata flipbook tidak sepenuhnya sama**; isi sebenarnya perlu dibuka sebelum dipakai. |
| XI-1 | NLP, computer vision, chatbot sederhana, etika dan dampak sosial (deskripsi penerbit). Flipbook menyebut "Pengenalan KA & Data Mining Dasar dengan Orange". | Orange (menurut flipbook) | Tidak dinyatakan | Judul menyebut visualisasi dan analisis emosi; sekali lagi dua deskripsi tidak persis sama. |
| XI-2 | Chatbot dengan ChatGPT, rancangan alur percakapan, analisis sentimen dengan Orange, Grok, kombinasi Google TM + ChatGPT + Orange, dokumentasi proyek dengan bantuan AI, mesin pencari tingkat lanjut. | ChatGPT, Orange, Grok, Google TM | Tidak dinyatakan | Tanpa pemrograman. |
| XII-1 | Machine learning dalam tujuh bab: pengenalan data, supervised dan unsupervised learning, regresi linear, decision tree, clustering, praktik dengan Orange; latihan dan proyek. | Orange Data Mining | Tidak dinyatakan | Yang paling dekat dengan "analisis data" dan "prediksi". |
| XII-2 | Penerapan AI di kesehatan, pendidikan, transportasi, bisnis, seni dan budaya, keamanan siber; etika dan dampak sosial; proyek kolaboratif. Flipbook: "Implementasi Proyek Nyata & Portofolio". | Tidak dinyatakan | Tidak dinyatakan | Bersifat wawasan dan proyek, bukan teknik. |

Penilaian tingkat (penyusun, dari deskripsi; isi belum dibaca): seluruh
seri dirancang penerbit untuk SMA kelas X sampai XII (judul halaman
penerbit memuat kelas dan semester) dan memakai alat tanpa kode, sehingga
**tidak terlalu lanjut** untuk SMA. Kecocokan dengan jalur C++/JS+TS perlu
dibaca di bagian 5.

Konteks: halaman Buku Gratis yang sama juga memuat seri AI untuk SD/MI
(kelas V–VI), SMP (VII–IX), SMK (X–XII), dan satu "Buku Pegangan AI untuk
Guru". Seri tersebut di luar cakupan program SMA ini dan tidak diperiksa
rinci.

### 3.2 Buku AI karya Onno W. Purbo di luar seri SMA (2026)

Sumber: halaman judul pada `intechpress.itts.ac.id` (URL pada kolom judul).
Penerbit: InTechPress. Bahasa: Indonesia. Format: PDF. Ketersediaan:
halaman memuat tombol "Unduh"/"Baca"; **status gratis atau berbayar tidak
dinyatakan pada halaman judul** (beberapa tombol mengarah ke Google Play
Books, yang menandakan edisi di toko tersebut) `[belum terverifikasi]`.
Lisensi tidak dinyatakan. ISBN tidak tertera di halaman penerbit.

| Judul | Penulis | Tahun | Hlm. | Cakupan (kata penyusun) | Alat | Tingkat |
| --- | --- | --- | --- | --- | --- | --- |
| [Membangun AI Chatbot WhatsApp dengan n8n, WAHA, dan Ollama](https://intechpress.itts.ac.id/2026/01/08/membangun-ai-chatbot-whatsapp-dengan-n8n-waha-dan-ollama/) | Onno W. Purbo, Muhamad Yusuf, Aolia Ikhwanudin | 2026 | 307 | Merakit chatbot WhatsApp yang berjalan lokal: alur otomasi (n8n), jembatan WhatsApp (WAHA), model bahasa lokal (Ollama), instalasi Docker, teknik prompt. | Docker, n8n, WAHA, Ollama | Terlalu lanjut sebagai bacaan wajib SMA; layak sebagai proyek akhir XII atau pengayaan guru. |
| [AI dalam Digital Marketing & Media Sosial](https://intechpress.itts.ac.id/2026/05/12/ai-dalam-digital-marketing-dan-media-sosial/) | Anas Nasrulloh, Onno W. Purbo | 2026 | xiv, 268 | AI untuk pemasaran digital: konten, chatbot, iklan terprogram, analisis pelanggan. | Tidak dinyatakan | Di luar fokus coding; sasaran pemasar dan mahasiswa. |
| [Buku Pegangan AI Untuk Manajemen](https://intechpress.itts.ac.id/2026/05/21/buku-pegangan-ai-untuk-manajemen/) | Kenya Damayanti Priyatna, Onno W. Purbo | 2026 | xvii, 216 | AI untuk keputusan dan operasional organisasi. | Tidak dinyatakan | Di luar fokus coding; sasaran manajer. |
| [The Agentic Economy](https://intechpress.itts.ac.id/2026/08/13/the-agentic-economy/) | Muhammad Farid Zaki, Onno W. Purbo, Anas Nasrulloh | 2026 | viii, 137 | Agen AI yang bertransaksi sendiri lewat HTTP 402, MCP, dan protokol pembayaran mesin. | Tidak dinyatakan | Topik lanjut; deskripsi menyebut "siswa tingkat akhir" sebagai salah satu sasaran. |

### 3.3 Karya Onno W. Purbo tentang AI di katalog perpustakaan

| Judul | Penulis | Tahun | ISBN | Sumber | Catatan |
| --- | --- | --- | --- | --- | --- |
| Panduan Menulis Cepat dengan AI (subjudul menurut abstrak katalog: "Strategi Produktif dan Anti-Plagiarisme") | Onno W. Purbo | 2025 (kolom tahun katalog); katalog dicatat 2026-01-12 | 9786347327482 (menurut katalog) | [Open Library Tel-U](https://openlibrary.telkomuniversity.ac.id/home/catalog/id/244193/slug/panduan-menulis-cepat-dengan-ai.html) | Tentang memakai AI sebagai asisten menulis buku dan jurnal serta etika dan plagiarisme. Penerbit tidak terbaca pada bagian halaman yang diambil `[belum terverifikasi]`. Tidak berisi coding; relevan hanya untuk literasi digital dan integritas akademik. |

### 3.4 Dicatat agar tidak tertukar: bukan karya Onno W. Purbo

Halaman InTech Press yang sama memuat judul AI/ML lain dengan penulis lain
(tidak tercantum nama Onno pada halaman yang dibuka), mis. *Belajar AI dari
Nol dengan PyTorch* (Anas Nasrulloh, 2026), *Machine Learning Engineering
Praktis* (Aolia Ikhwanudin, 2026), *Belajar Membuat AI Lokal dengan Open
Source...* (Dzaq Rayhan Purbo, 2026), dan *Multi AI Agent System* (Lintang
Arif Setianda, Anas Nasrulloh, 2026). Judul-judul ini **tidak** dinilai di
sini karena di luar permintaan.

## 4. Disebut tetapi belum terverifikasi

| Butir | Dari mana muncul | Yang belum bisa dipastikan |
| --- | --- | --- |
| Buku Pegangan AI untuk Guru: TK SD SMP SMA SMK | Terkonfirmasi ada di halaman Buku Gratis (tombol Baca/Unduh). | Penulis, tahun, halaman, isi `[belum terverifikasi]`. Cuplikan pencarian menyebut sekitar 317 halaman dan berbagi lewat media sosial; tidak dibuka. |
| AI dalam Cyber Security (Agustus 2025) | Cuplikan hasil pencarian (`nurfachmi.com`, tidak terbaca: 403). | Judul persis, penerbit, ISBN, ketersediaan `[belum terverifikasi]`. |
| "23 Buku AI Gratis" | Cuplikan pencarian (`news.ambisius.com`; halaman yang terbuka hanya pemberitahuan pemeliharaan). | Daftar judul dan bentuknya `[belum terverifikasi]`. Kemungkinan merujuk ke koleksi pada bagian 3.1; belum dipastikan. |
| Buku elektronik "Panduan Praktis AI (Kecerdasan Artifisial) & Coding untuk Pemula" | Cuplikan pencarian (`rmol.id`; isi halaman tidak terambil). | Hubungan dengan seri bagian 3.1 `[belum terverifikasi]`. |
| *Data Science untuk Pemula* (Tutik Lestari; Onno W. Purbo disebut sebagai salah satu penulis menurut ringkasan pencarian) | Berkas PDF draf di repositori `repository.darunnajah.ac.id`. | Berkas melebihi batas unduh alat sehingga tidak terbaca; peran Onno, penerbit, ISBN, tahun `[belum terverifikasi]`. Berkas itu berlabel draf. |
| ISBN dan lisensi seri bagian 3.1 dan 3.2 | Penerbit menyatakan di halaman Tentang Kami bahwa terbitannya ber-ISBN Perpusnas, tetapi nomor per judul tidak tertera. | Nomor ISBN per jilid dan syarat penggunaan ulang `[belum terverifikasi]`. |
| Buku AI/ML lain karya Onno W. Purbo di luar InTech Press | Tidak ditemukan pada pencarian yang dilakukan. | Tidak ada bukti ada atau tidaknya; jangan disimpulkan "tidak ada". Sumber primer pribadi (Onno Center) tidak terjangkau. |

## 5. Penilaian kecocokan

### 5.1 Catatan dasar: AI tidak disebut di rumusan CP

Rumusan CP yang dikutip di `silabus.md` bagian 1.3 (Fase E dan F)
**tidak memuat kata "kecerdasan buatan", "AI", atau "machine learning"**,
dan silabus tidak menyebutnya di mana pun. Karena itu pemetaan di
bawah adalah **tafsir penyusun** atas butir yang bersinggungan, bukan
klaim bahwa CP mewajibkan AI. Kemungkinan CP versi lain (mis. adanya
peraturan terpisah tentang AI) belum diperiksa di sini; silabus sendiri
menandai SK CP yang berlaku sebagai `[belum terverifikasi]` (bagian 1.2).

### 5.2 Pemetaan ke butir CP (kode dari `silabus.md` bagian 1.4)

Pemetaan didasarkan pada deskripsi penerbit, bukan isi buku.

| Butir CP | Jilid yang bersinggungan | Kekuatan | Catatan |
| --- | --- | --- | --- |
| F-AD-a (sumber data terbuka, terpercaya, legal untuk keputusan dan prediksi) | XI-1, XII-1 (Orange, regresi, decision tree, clustering) | Sedang | Satu-satunya butir yang menyebut "prediksi". Buku memberi latihan analisis data tanpa kode. Apakah sumber datanya "terbuka, terpercaya, legal" belum diperiksa. |
| E-LD-a, F-LD-a (mesin pencari, mesin pencari untuk riset) | XI-2 (mesin pencari tingkat lanjut, asisten AI untuk ringkasan), X-1 | Rendah–sedang | Hanya tumpang tindih sebagian; praktik menanyakan ke AI tidak sama dengan literasi mesin pencari. |
| E-LD-b, F-LD-b (periksa fakta, verifikasi kebenaran konten) | X-1 (diskusi deepfake, bias, privasi, per metadata flipbook) | Rendah–sedang | Bisa menjadi konteks verifikasi konten buatan AI. |
| E-LD-g, F-LD-g (kekayaan intelektual; hukum isu digital) | X-2 ("tantangan hukum" per deskripsi), XII-2 (etika dan dampak sosial) | Rendah | Tingkat kedalaman hukum belum diketahui. |
| E-LD-j, E-LD-l (privasi dan keamanan akun) | X-1 (privasi) | Rendah | Sebatas diskusi etika. |
| F-LD-f (mengkreasi konten digital) | XI-2 (chatbot, dokumentasi proyek dengan AI), XII-2 (proyek) | Rendah | |
| F-BK-a (alur pengembangan produk digital) | XII-2 (proyek kolaboratif dan portofolio) | Rendah | Bukan pengembangan perangkat lunak berkode. |
| E-BK-*, F-BK-b/c/d, F-AP-a..d | Tidak ada jilid SMA yang bersinggungan menurut deskripsi | Tidak ada | Seri SMA memakai alat tanpa kode; tidak melatih struktur data, strategi algoritmik, atau pemrograman. |

### 5.3 Pemetaan ke jalur A dan B

| Jalur | Hubungan dengan buku | Penilaian |
| --- | --- | --- |
| A (C++, jembatan OSN) | Tidak ada. Rumpun materi OSN (`data/osn/topic-families.json`; `silabus.md` bagian 5) bersifat algoritmik; seri SMA tidak melatih pemrograman, dan tidak ada tanda buku membahas topik rumpun OSN. | Tidak relevan untuk pembinaan OSN. Tidak ada klaim bahwa buku menyiapkan OSN. |
| B (JS/TS, Bun, `awcms-one`) | Seri SMA: tidak ada (tanpa kode). *Membangun AI Chatbot WhatsApp dengan n8n, WAHA, dan Ollama* (bagian 3.2) memakai Docker dan alat otomasi; ia menyentuh gagasan webhook dan integrasi layanan, tetapi bukan JS/TS. | Kemungkinan bahan proyek pengayaan di akhir jalur B, **belum dicocokkan dengan minggu tertentu di rencana B** dan terlalu berat sebagai bacaan wajib. |
| Di luar kedua jalur | Seluruh seri SMA lebih cocok sebagai bahan literasi AI dan analisis data untuk Informatika umum (lingkup bagian 4.3 draf yang pertanyaannya masih terbuka, nomor 3). | Kecocokan terbaik. |

### 5.4 Kekuatan dan kelemahan sebagai rujukan

| Aspek | Penilaian |
| --- | --- |
| Kesesuaian jenjang | Tinggi: dirancang per kelas dan semester untuk SMA, bahasa Indonesia, alat gratis tanpa kode. |
| Kesesuaian CP | Terbatas dan tafsiran (bagian 5.2). |
| Kedalaman teknis | Rendah menurut deskripsi; bukan pemrograman. Tidak mengganti jalur A/B. |
| Lisensi | **Tidak jelas** (tidak dinyatakan). Menautkan aman; menyalin, mengadaptasi, atau menaruh PDF di repo tidak boleh tanpa izin tertulis. |
| Stabilitas tautan | Rentan: unduhan lewat Google Drive/FlipHTML5 dan situs yang mengganti tata letak katalog; penulis berbeda per jilid. |
| Verifikasi mutu | Belum ada: isi tidak dibaca; deskripsi penerbit dan metadata flipbook ada yang tidak sama (X-2, XI-1). |

## 6. Opsi pemanfaatan

Keputusan menjadi hak pemilik; berikut opsi dan penilaian penyusun.

| Opsi | Isi | Kelebihan | Kekurangan | Risiko/kompleksitas |
| --- | --- | --- | --- | --- |
| 1 (Disarankan): rujukan bacaan pengayaan | Mencantumkan tautan halaman penerbit (bukan salinan) sebagai bacaan pengayaan opsional untuk guru/siswa di draf, setelah guru atau pemilik membaca isinya. | Biaya rendah; tidak melanggar hak cipta; tidak mengubah struktur program; sejalan dengan prinsip "pengayaan opsional" yang sudah diputuskan untuk topik di luar CP. | Mutu isi belum diverifikasi; tautan bisa mati; tidak ada kontrol versi. | Rendah. Perlu langkah baca-isi sebelum dicantumkan. |
| 2: modul AI pengayaan di kelas XI–XII | Menulis modul karangan sendiri (ADR-0007) tentang analisis data/AI dasar dengan alat tanpa kode, terpetakan ke F-AD-a, berstatus DRAF, **terinspirasi** buku tanpa menyalin. | Selaras CP analisis data; milik sendiri sehingga bebas masalah lisensi dan dapat versi. | Biaya penulisan dan review; menambah beban jam di jadwal yang sudah padat; AI tidak ada di CP yang dikutip. | Sedang. Perlu menentukan jam dan status pengayaan; hindari kemiripan dengan buku. |
| 3: jalur AI terpisah (kini jalur D; jalur C dipakai untuk IoT, #68) | Program/jalur baru (AI dan analisis data) di samping A dan B. | Memberi tempat tersendiri bagi minat AI; bisa memakai seri ini sebagai bacaan inti. | Memperluas scope program jauh dari rancangan awal; perlu ADR/issue baru; berisiko lisensi bila buku dijadikan inti; AI tidak ada di CP. | Tinggi. |
| 4: tidak dipakai | Tidak memasukkan rujukan ini. | Tidak ada pekerjaan tambahan; fokus pada CP dan OSN. | Kehilangan sumber Indonesia gratis yang sesuai jenjang; guru mungkin tetap mencari sendiri. | Rendah. |

**Keputusan pemilik (2026-11-18): opsi 3 — jalur AI terpisah** (jalur D,
issue #84), bukan rekomendasi penyusun.

**Rekomendasi penyusun (tidak dipilih): opsi 1.** Alasan: sumber Indonesia bagi
siswa SMA yang tidak menuntut kemampuan pemrograman, biaya dan risiko
terendah, dan tidak memaksa keputusan tentang CP atau struktur. Untuk
meningkatkannya ke opsi 2 sebaiknya terlebih dulu (a) dibaca isi enam
jilid oleh manusia, dan (b) diminta kejelasan lisensi dari penerbit. Opsi 3
tidak disarankan sekarang karena AI tidak muncul di CP yang dikutip draf
dan jalur A/B sudah penuh.

## 7. Catatan hak cipta dan penggunaan

- Dokumen ini **hanya menautkan** dan mencatat data bibliografis serta judul
  bab pendek. Tidak ada isi buku yang disalin atau diparafrasekan panjang.
- Penerbit tidak menyatakan lisensi terbuka (mis. Creative Commons) pada
  halaman yang dibuka; "gratis diunduh" tidak sama dengan "boleh disalin
  atau diadaptasi". Penerbit menyebut "Hak Cipta Aman" pada halaman Tentang
  Kami tanpa merinci.
- Jangan menaruh PDF buku, gambar, atau kutipan panjang di repositori ini
  tanpa izin tertulis dari penerbit dan penulis.
- Nama penulis hanya dicatat sebagai data bibliografis tokoh publik
  dan pengarang buku; tidak ada data pribadi lain yang dikumpulkan.

## 8. Pertanyaan terbuka untuk pemilik

1. ~~Opsi pemanfaatan mana (bagian 6)?~~ **Terjawab 2026-11-18:** jalur AI
   terpisah (jalur D, #84).
2. Apakah pemilik atau guru akan membaca isi enam jilid sebelum dicantumkan
   sebagai rujukan, mengingat isi belum diverifikasi dan ada selisih antara
   deskripsi penerbit dan metadata flipbook (X-2, XI-1)?
3. Apakah pemilik ingin meminta kejelasan lisensi dan ISBN kepada InTech
   Press ITTS sebelum rujukan dipakai lebih jauh?
4. Apakah AI/literasi AI dianggap bagian lingkup program ini? Catatan:
   pertanyaan 3 silabus sudah dijawab pemilik (2026-11-18) — butir CP di luar
   coding dicakup lewat modul pendamping (issue #69), yang bisa menjadi
   tempat literasi AI bila opsi 1 atau 2 dipilih.
5. Bila opsi 2 dipilih, di kelas dan semester mana modul diselipkan, dan
   status pengayaannya wajib atau opsional?
6. Apakah buku non-AI Onno W. Purbo (mis. jaringan, sistem operasi) perlu
   diriset terpisah untuk butir jaringan F-BK-d dan F-LD-e? Belum diriset di
   sini.

## 9. Daftar sumber yang dibuka (2026-11-18)

| Sumber | URL |
| --- | --- |
| InTech Press, Buku Gratis | `https://intechpress.itts.ac.id/buku-gratis/` |
| InTech Press, Tentang Kami, Penerbitan, peta situs | `https://intechpress.itts.ac.id/964-2/`, `.../mekanisme-penerbitan/`, `.../wp-sitemap-posts-post-1.xml` |
| InTech Press, halaman judul | URL pada tabel 3.1 dan 3.2 |
| FlipHTML5 (halaman baca, metadata saja) | `https://online.fliphtml5.com/intech-press/{drbf,qtft,sxlm,fafe,hkpf,vakq}/` |
| Open Library Telkom University | `https://openlibrary.telkomuniversity.ac.id/home/catalog/id/244193/slug/panduan-menulis-cepat-dengan-ai.html` |

## Changelog

| Versi | Tanggal | Perubahan |
| --- | --- | --- |
| v0.2.0 | 2026-11-18 | Mencatat keputusan pemilik: jalur AI terpisah (jalur D, issue #84). |
| v0.1.0 | 2026-11-18 | Draf awal riset (issue #66): seri Buku AI SMA (enam jilid) dan buku AI Onno W. Purbo lain terverifikasi dari halaman penerbit; butir belum terverifikasi; pemetaan CP dan jalur; opsi dan rekomendasi. |
