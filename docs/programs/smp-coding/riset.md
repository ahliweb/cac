# Riset Pembelajaran Coding SMP (`smp-coding`)

- **Version:** v0.1.0
- **Last updated:** 2026-11-19
- **Status:** DRAF riset (issue #129) — belum keputusan pemilik. Tanggal akses semua sumber: **2026-11-19**.
- **Changeset:** Riset awal sumber resmi, kebijakan mata pelajaran pilihan Koding dan Kecerdasan Artifisial (KKA), OSN jenjang SMP, dan kajian alat untuk draf silabus coding SMP.

> Dokumen ini adalah **catatan riset**, bukan silabus dan bukan dokumen
> pemerintah. Pola tanda mengikuti `docs/programs/sma-coding/silabus.md`:
> `[belum terverifikasi]` = tidak dapat dipastikan dari sumber yang benar-benar
> dibuka penyusun; `[asumsi]` = keputusan perancangan penyusun. Kutipan
> hanya yang persis dari berkas yang dibuka; kutipan diberi tanda `>`.

## 1. Temuan utama (baca ini dulu)

1. **Dokumen resmi utama TIDAK berhasil dibuka.** *Panduan Mata Pelajaran
   Informatika* 2025 di `repositori.kemendikdasmen.go.id` (yang memuat CP
   Fase D dan dikutip silabus sma-coding bagian 1) tidak terjangkau dari
   lingkungan penyusun pada 2026-11-19: `curl` tiga kali kehabisan waktu (30,
   40, dan 60 detik) pada port 443 sementara situs lain terbuka normal, dan
   alat pengambil halaman menjawab `ECONNREFUSED 202.10.51.148:443`. Akibatnya
   **teks CP Informatika Fase D versi 2025 tidak pernah dilihat penyusun**,
   dan tidak ada kutipan yang diklaim berasal darinya.
2. Yang berhasil dibuka dan dikutip persis: dokumen **Alur dan Tujuan
   Pembelajaran Informatika Fase D buatan seorang guru**, yang dihosting di
   domain `belajar.id` (bagian 2.2). Dokumen itu memuat rumusan CP yang
   berstruktur **delapan elemen** (BK, TIK, SK, JKI, AD, AP, DSI, PLB). Itu
   tampaknya rumusan CP versi lama; versi 2025 untuk Fase E berstruktur dua
   elemen (silabus sma-coding bagian 1.1), sehingga Fase D 2025 kemungkinan
   berbeda. Statusnya: **bukan teks resmi, belum tentu berlaku**.
3. Koding dan KA adalah **mata pelajaran pilihan** di SMP (kelas 7, 8, 9)
   menurut pernyataan Menteri dan pejabat Kemendikdasmen yang dimuat media
   (bagian 3). Alokasi 2 JP per minggu berasal dari ringkasan naskah akademik
   di situs sekunder; angka resmi dalam regulasi `[belum terverifikasi]`.
4. **OSN Informatika hanya untuk SMA/sederajat** (situs `osn.toki.id`, dibuka
   langsung). Tidak ada jembatan OSN SMP Informatika yang dapat dipastikan;
   jembatan OSN untuk lulusan SMP adalah lewat program `sma-coding` jalur A.
5. Alat: Scratch, micro:bit (MakeCode), dan Python semuanya tersedia gratis
   dan dapat dipakai tanpa memasukkan data murid; rincian dan hal yang belum
   terverifikasi di bagian 5.

## 2. Capaian Pembelajaran (CP) Informatika Fase D

### 2.1 Sumber resmi yang dicoba dan hasilnya

| Sumber | Hasil akses 2026-11-19 |
| --- | --- |
| `https://repositori.kemendikdasmen.go.id/33634/1/32.%20Panduan%20Mata%20Pelajaran%20Informatika.pdf` (Panduan Mata Pelajaran Informatika 2025, Fase D-F) | **Gagal** (timeout dan `ECONNREFUSED`, lihat bagian 1). Tidak dibuka. |
| `https://kurikulum.kemdikbud.go.id/file/panduan/dokumen/32.%20Panduan%20Mata%20Pelajaran%20Informatika.pdf` dan padanan `kurikulum.kemendikdasmen.go.id` | **Gagal** (tidak terjangkau). Tidak dibuka. |
| `https://static.buku.kemdikbud.go.id/content/pdf/bukuteks/kurikulum21/BG_INFORMATIKA_VII.pdf` (buku guru Informatika kelas VII) | **Gagal** (tidak terjangkau). Tidak dibuka. |
| Teks SK Kepala BSKAP 046/H/KR/2025 | Tidak ditemukan salinan resmi yang terjangkau. Hanya ada situs sekunder (hasil pencarian: komunitasbelajar.id, kurikulummerdeka.com, dan lain-lain) `[belum terverifikasi]`. |

### 2.2 Sumber yang dibuka: dokumen ATP Fase D (bukan resmi)

| Butir | Nilai |
| --- | --- |
| Berkas | `https://static.perangkat-ajar.belajar.id/SMP.D.INF.IPS.1.pdf` (HTTP 200, PDF 24 halaman, 542.478 bita, teks diekstrak dengan `pdftotext`) |
| Judul | "Alur dan Tujuan Pembelajaran, Mata Pelajaran Informatika Fase D" (SMP/MTs/Paket B) |
| Penyusun | Dinyatakan di halaman identitas: seorang guru dari sebuah SMP Negeri di Jakarta (nama penyusun dan sekolah tidak disalin ke repositori ini). |
| Status | **Dokumen buatan guru** (perangkat ajar) di domain pemerintah. Bukan SK, bukan panduan resmi; tidak menyebut nomor SK sumber CP-nya. Apakah rumusan CP di dalamnya identik dengan lampiran SK yang berlaku `[belum terverifikasi]`. |

Kutipan di bawah disalin dari bagian "A. Capaian Pembelajaran Fase D" dan
tabel elemen dokumen itu. Hanya spasi, pemenggalan baris, dan spasi setelah
tanda hubung akibat pemenggalan baris PDF (mis. "sehari- hari") yang
dinormalkan; kata-katanya tidak diubah. Pencocokan otomatis ke teks
ekstraksi dilaporkan di bagian 7.

**Ringkasan CP Fase D (bagian A dokumen)**

> Pada akhir fase D, peserta didik mampu memahami dampak dan menerapkan etika sebagai warga digital, memahami komponen, fungsi, cara kerja, dan kodifikasi data sebuah komputer serta proses kodifikasi dan penyimpanan data dalam sistem komputer, jaringan komputer, dan internet, mengakses, mengolah, dan mengelola data secara efisien, terstruktur, dan sistematis, menganalisis, menginterpretasi, dan melakukan prediksi berdasarkan data dengan menggunakan perkakas atau secara manual, menerapkan berpikir komputasional secara mandiri untuk menyelesaikan persoalan dengan data diskrit bervolume kecil dan mendisposisikan berpikir komputasional dalam bidang lain, mengembangkan atau menyempurnakan program dalam bahasa blok (visual), menggunakan berbagai aplikasi untuk berkomunikasi, mencari, dan mengelola konten informasi, serta bergotong royong untuk menciptakan produk dan menjelaskan karakteristik serta fungsi produk dalam laporan dan presentasi yang menggunakan aplikasi.

**Per elemen (tabel dokumen)**

*BK, Berpikir Komputasional*

> Pada akhir fase D, peserta didik mampu menerapkan berpikir komputasional untuk menghasilkan beberapa solusi dalam menyelesaikan persoalan dengan data diskrit bervolume kecil dan mendisposisikan berpikir komputasional dalam bidang lain terutama dalam literasi, numerasi, dan literasi sains (computationally literate).

*TIK, Teknologi Informasi dan Komunikasi*

> Pada akhir fase D, peserta didik mampu menerapkan praktik baik dalam memanfaatkan aplikasi surel untuk berkomunikasi, aplikasi peramban untuk pencarian informasi di internet, content management system (CMS) untuk pengelolaan konten digital, dan memanfaatkan perkakas TIK untuk mendukung pembuatan laporan, presentasi serta analisis dan interpretasi data.

*SK, Sistem Komputer*

> Pada akhir fase D, peserta didik mampu mendeskripsikan komponen, fungsi, dan cara kerja komputer yang membentuk sebuah sistem komputasi, serta menjelaskan proses dan penggunaan kodifikasi untuk penyimpanan data dalam memori komputer.

*JKI, Jaringan Komputer dan Internet*

> Pada akhir fase D, peserta didik mampu memahami konektivitas jaringan lokal, komunikasi data via ponsel, konektivitas internet melalui jaringan kabel dan nirkabel (bluetooth, wifi, internet).

*AD, Analisis Data*

> Pada akhir fase D, peserta didik mampu mengakses, mengolah, mengelola, dan menganalisis data secara efisien, terstruktur, dan sistematis untuk menginterpretasi dan memprediksi sekumpulan data dari situasi konkret sehari-hari yang berasal dari suatu sumber data dengan menggunakan perkakas TIK atau manual.

*AP, Algoritma dan Pemrograman*

> Pada akhir fase D, peserta didik mampu memahami objek-objek dan instruksi dalam sebuah lingkungan pemrograman blok (visual) untuk mengembangkan program visual sederhana berdasarkan contoh-contoh yang diberikan, mengembangkan karya digital kreatif (game, animasi, atau presentasi), menerapkan aturan translasi konsep dari satu bahasa visual ke bahasa visual lainnya, dan mengenal pemrograman tekstual sederhana.

*DSI, Dampak Sosial Informatika*

> Pada akhir fase D, peserta didik mampu memahami ketersediaan data dan informasi lewat aplikasi media sosial, memahami keterbukaan informasi, memilih informasi yang bersifat publik atau privat, menerapkan etika dan menjaga keamanan dirinya dalam masyarakat digital.

*PLB, Praktik Lintas Bidang*

> Pada akhir fase D, peserta didik mampu bergotong royong untuk mengidentifikasi persoalan, merancang, mengimplementasi, menguji, dan menyempurnakan artefak komputasional sebagai solusi persoalan masyarakat serta mengkomunikasikan secara lisan maupun tertulis produk dan proses pengembangan solusinya dalam bentuk karya kreatif yang menyenangkan secara lisan maupun tertulis.

### 2.3 Versi CP lain yang disebut sumber sekunder (tidak dikutip)

| Versi | Sumber (dibuka, sekunder) | Catatan |
| --- | --- | --- |
| SK Kepala BSKAP 032/H/KR/2024 | `https://kurikulummerdeka.com/capaian-pembelajaran-cp-informatika-fase-d-e-dan-f-di-kurikulum-merdeka-2024/` | Situs sekunder menyatakan empat elemen dan rumusan Fase D yang berbeda dari dokumen ATP di atas. **Tidak dikutip** (bukan sumber resmi; versi ini dicabut oleh 046/H/KR/2025 menurut silabus sma-coding bagian 1.2 `[belum terverifikasi]`). |
| SK Kepala BSKAP 046/H/KR/2025 (berlaku sejak 16 Juli 2025) | `https://guruinovatif.id/artikel/bskap-terbitkan-cp-terbaru-2025-struktur-pembelajaran-mata-pelajaran-koding-ai-di-kurikulum-merdeka` | Artikel sekunder menyatakan Fase D = kelas VII-IX dan CP 2025 menambahkan mata pelajaran Koding dan KA. Teks CP Informatika Fase D tidak termuat. |

**Kesimpulan bagian 2:** tiga rumusan CP Fase D beredar (versi dokumen ATP
dengan delapan elemen, versi 2024, versi 2025). Penyusun hanya memiliki
teks yang pertama, dan itu bukan teks resmi. Draf silabus (berkas
`silabus-draf.md`) memakai struktur delapan elemen itu **sementara** sebagai
kerangka kode butir, dan seluruh pemetaan CP-nya ditandai `[belum
terverifikasi]` sampai pemilik memberikan teks resmi Fase D 2025.

## 3. Kebijakan mata pelajaran pilihan Koding dan Kecerdasan Artifisial (KKA)

Semua butir di bawah berasal dari **berita dan situs sekunder**, kecuali
bila dinyatakan; teks regulasi (Permendikdasmen atau lampiran struktur
kurikulum) tidak dibuka.

| Butir | Temuan | Sumber dibuka | Status |
| --- | --- | --- | --- |
| Status | Koding dan KA adalah mata pelajaran **pilihan** (bukan wajib) di SD kelas 5, SMP, dan SMA. Mendikdasmen (dikutip InfoPublik, 13 Maret 2026): "Mulai tahun pelajaran 2025–2026, coding dan Artificial Intelligence telah menjadi mata pelajaran pilihan mulai dari jenjang SD kelas 5, SMP, hingga SMA." | `https://infopublik.id/kategori/pp-tunas/962486/kemendikdasmen-mulai-terapkan-mata-pelajaran-coding-dan-ai-pada-tahun-ajaran-2025-2026` (situs berita publik pemerintah) | Pernyataan pejabat, tertulis di berita resmi pemerintah. Teks regulasi `[belum terverifikasi]`. |
| Kemungkinan menjadi wajib | Pernyataan yang sama: "Jika jumlah guru yang terlatih sudah memadai, tidak menutup kemungkinan coding dan AI akan dikembangkan menjadi mata pelajaran wajib di masa mendatang." | InfoPublik (di atas) | Pernyataan pejabat; bukan keputusan. |
| Metode | Tiga klasifikasi metode disebut: coding tanpa perangkat (*unplugged*), coding berbasis internet, dan coding berbasis permainan tanpa komputer, agar sekolah dengan infrastruktur terbatas tetap dapat mengajar. | InfoPublik (di atas) | Pernyataan pejabat. |
| Pelatihan guru | Sekitar 55 ribu guru dilatih, cakupan sekitar 38 persen satuan pendidikan (per Maret 2026). | InfoPublik (di atas) | Pernyataan pejabat. |
| Alokasi JP | Naskah akademik (ringkasan) menyarankan Koding dan KA pilihan di SD kelas 5-6, **SMP kelas 7, 8, dan 9**, serta SMA/SMK kelas 10 dengan **2 JP per minggu**; SMA kelas 11-12 dapat hingga 5 JP, SMK kelas 11-12 hingga 4 JP; sekolah boleh mengembangkannya sebagai ekstrakurikuler atau mengintegrasikannya ke mata pelajaran lain. | `https://kurikulummerdeka.com/langkah-strategis-pembelajaran-koding/` (situs sekunder, 25 Oktober 2025, meringkas "Naskah Akademik") | Ini **rekomendasi naskah akademik** menurut situs sekunder, bukan ketentuan struktur kurikulum. `[belum terverifikasi]`. Hasil pencarian menyebut angka lain (64 JP per tahun) dalam dokumen lain; tidak dibuka. |
| Dasar regulasi | Hasil pencarian menyebut Peraturan Menteri Pendidikan Dasar dan Menengah Nomor 13 Tahun 2025 sebagai dasar penetapan; artikel sekunder menyebut BSKAP menambahkan mata pelajaran Koding dan AI bersama CP 2025. | Hasil pencarian; artikel `guruinovatif.id` dibuka (tanpa menyebut nomor Permen). | `[belum terverifikasi]`; nomor Permen tidak ditemukan di halaman yang dibuka. |
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
| Scratch (`scratch.mit.edu`) | Pemrograman blok: animasi, game, cerita (AP-a, AP-b) | Halaman "about" Scratch Foundation: "Scratch is free for everyone"; nirlaba pengembang editor dan komunitas daring. Kode editor `scratch-gui` (berkas `LICENSE` cabang `develop`, halaman GitHub dibuka) berteks **GNU Affero General Public License**; halaman itu menyatakan repositori **diarsipkan pemilik pada 10 Juni 2026 (hanya-baca)**. | Syarat penggunaan dan kebijakan privasi (halaman `terms_of_use`/`privacy_policy` tidak terbuka tanpa JavaScript): batas usia akun, kewajiban izin orang tua. Ketersediaan editor luring dan statusnya setelah repositori diarsipkan. |
| micro:bit dan MakeCode (`microbit.org`, `makecode.microbit.org`) | Blok untuk perangkat dan simulator (SK-a, AP-c); Python opsional | Panduan resmi menyebut editor resmi: Microsoft MakeCode, micro:bit Python Editor, micro:bit classroom, aplikasi seluler; sumber ajar "free resources"; blok, Python, dan Scratch disebut didukung. MakeCode memiliki simulator di peramban (halaman MakeCode mencantumkan simulasi perangkat). | Harga papan, ketersediaan di Indonesia, lisensi editor, dan kebutuhan akun penyimpanan proyek. |
| Python | Bahasa teks pertama yang disarankan (AP-d) | Python Software Foundation = organisasi nirlaba di balik Python; halaman *History and License* dokumentasi resmi dibuka (lisensi PSF; teks lisensi tidak dikutip di sini). Python dijalankan di peramban melalui **Pyodide** (distribusi Python berbasis WebAssembly yang berjalan di peramban dan Node.js, halaman proyek dibuka), tanpa instalasi. | Lisensi Pyodide, lingkungan menulis yang cocok untuk anak SMP (editor ringan yang tidak memakai akun) tidak dikaji; belum ada alat editor tertentu yang diperiksa. |
| Python Tutor (`pythontutor.com`) | Visualisasi eksekusi kode | Halaman menyatakan dapat memvisualisasi dan men-*debug* Python, Java, C, C++, dan JavaScript, serta menyediakan "AI help". | Kebijakan data dan privasi layanan; fitur "AI help" mengirim kode ke layanan luar, **tidak disarankan** untuk murid sebelum kebijakannya dikaji. |
| PythonAnywhere | Python di server daring | Halaman menyatakan paket dasar gratis; paket berbayar mulai $10 per bulan. Memerlukan akun. | Batas usia dan privasi akun; tidak disarankan karena butuh akun murid. |
| JavaScript | Bahasa teks alternatif | Dokumentasi bahasa tersedia gratis (MDN, halaman dibuka); berjalan di setiap peramban tanpa instalasi. | Lingkungan belajar anak SMP dan jembatan ke `sma-coding` jalur B tidak dikaji mendalam. |
| C++ | Bahasa teks alternatif (jembatan langsung ke OSN dan jalur A) | Tidak ada halaman baru yang dibuka; kompilasi memakai `g++` seperti modul sma-coding. | Kelayakan untuk kelas 8 (sintaks dan tipe statis); tidak diuji. |

## 6. Hal yang tetap belum terverifikasi

| Butir | Tindakan yang diminta |
| --- | --- |
| Teks CP Informatika Fase D versi 2025 (resmi) | Pemilik menyediakan PDF Panduan Mata Pelajaran Informatika 2025 atau tautan yang dapat dibuka; penyusun akan menggantikan kerangka sementara dan mengutip persis. |
| Teks regulasi mata pelajaran pilihan KKA (nomor Permen, lampiran struktur, JP) | Pemilik atau tim menyediakan tautan resmi. |
| Syarat akun Scratch dan micro:bit, harga papan micro:bit | Dicek dari lingkungan yang menjangkau halaman itu. |
| Jumlah menit satu JP di SMP (disini diasumsikan 40 menit) | Dicek ke standar proses yang berlaku. |
| Cabang OSN SMP | Dicek ke Pedoman OSN SMP/MTs di situs Puspresnas. |

## 7. Pencocokan kutipan

Kutipan CP bagian 2.2 dicocokkan dengan teks hasil `pdftotext` dari berkas
`SMP.D.INF.IPS.1.pdf` memakai skrip yang membandingkan setiap blok kutipan
setelah menormalkan spasi dan spasi setelah tanda hubung. Hasil (kesembilan
blok kutipan: ringkasan dan delapan elemen): lihat laporan pelaksana pada
issue #129; skrip tidak disimpan di repositori (di luar scope).

## 8. Daftar rujukan yang dibuka (2026-11-19)

| Sumber | Peran |
| --- | --- |
| `https://static.perangkat-ajar.belajar.id/SMP.D.INF.IPS.1.pdf` | CP Fase D (kutipan persis; dokumen guru). |
| `https://infopublik.id/kategori/pp-tunas/962486/kemendikdasmen-mulai-terapkan-mata-pelajaran-coding-dan-ai-pada-tahun-ajaran-2025-2026` | Status KKA pilihan; metode; SKB tujuh menteri (13 Maret 2026). |
| `https://news.republika.co.id/berita/sygtsq458/siapsiap-coding-dan-ai-diajarkan-untuk-sdsmpsma-mulai-tahun-ajaran-depan` | Penekanan berpikir komputasional dan etika AI (26 Juni 2025). |
| `https://kurikulummerdeka.com/langkah-strategis-pembelajaran-koding/` | Ringkasan naskah akademik: 2 JP per minggu (sekunder). |
| `https://guruinovatif.id/artikel/bskap-terbitkan-cp-terbaru-2025-struktur-pembelajaran-mata-pelajaran-koding-ai-di-kurikulum-merdeka` | Fase D = VII-IX; CP 2025 menambah Koding dan KA (sekunder). |
| `https://kurikulummerdeka.com/capaian-pembelajaran-cp-informatika-fase-d-e-dan-f-di-kurikulum-merdeka-2024/` | Versi 2024 (sekunder, tidak dikutip). |
| `https://www.gebrak.id/?p=40307` | Kemitraan swasta (tidak menjadi dasar). |
| `https://osn.toki.id/` | OSN Informatika tingkat SMA/sederajat. |
| `https://scratch.mit.edu/about`, `https://github.com/scratchfoundation/scratch-gui/blob/develop/LICENSE` | Scratch: gratis; lisensi editor; repositori diarsipkan. |
| `https://microbit.org/get-started/user-guide/overview/`, `https://makecode.microbit.org/about` | micro:bit dan MakeCode. |
| `https://www.python.org/psf-landing/`, `https://docs.python.org/3/license.html`, `https://pyodide.org/en/stable/` | Python, lisensi, Pyodide. |
| `https://pythontutor.com/`, `https://www.pythonanywhere.com/`, `https://developer.mozilla.org/en-US/docs/Web/JavaScript` | Alat pembanding. |

**Tidak dibuka (gagal atau hanya hasil pencarian):** repositori Kemendikdasmen
(Panduan 2025), portal kurikulum, buku guru Informatika VII, situs Puspresnas
(Pedoman dan Silabus OSN SMP), situs biro Bebras, teks SK 046/H/KR/2025,
teks Permendikdasmen KKA.

## Changelog

| Versi | Tanggal | Perubahan |
| --- | --- | --- |
| v0.1.0 | 2026-11-19 | Riset awal (issue #129). |
