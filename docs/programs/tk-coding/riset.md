# Riset Pembelajaran Coding (Berpikir Komputasional) untuk Anak TK/PAUD

- **Version:** v0.1.2
- **Last updated:** 2026-11-19
- **Status:** Riset pendukung (issue #127); silabus yang bersumber darinya disetujui pemilik 2026-11-19 ([`silabus.md`](silabus.md) v1.0.0). Dokumen ini bukan sumber corpus.
- **Changeset:** Riset awal sumber resmi, panduan waktu layar, pendekatan, dan risiko untuk program `tk-coding`.

> Dokumen ini adalah konten **karangan** menurut
> [ADR-0007](../../architecture/adr/0007-authored-learning-content.md):
> hasil riset dan penilaian penyusun. Kutipan resmi di bagian 2 dan 3
> disalin dari berkas yang benar-benar dibuka pada **2026-11-19**; butir yang
> tidak dapat dibuka atau dipastikan ditandai `[belum terverifikasi]`, dan
> keputusan perancangan ditandai `[asumsi]`. Pilihan atas temuan riset
> adalah hak pemilik; keputusannya (2026-11-19) ada di
> [`silabus.md`](silabus.md) bagian 9.

## 1. Tujuan, metode, dan keterbatasan

Pemilik meminta (2026-11-19) riset pembelajaran coding untuk anak TK/PAUD
(usia sekitar 4-6 tahun). Dokumen ini mencatat apa yang **benar-benar
terbaca**: kurikulum PAUD yang berlaku, kebijakan koding dan kecerdasan
artifisial yang menyentuh PAUD, panduan waktu layar, pendekatan
berpikir komputasional anak usia dini, serta risikonya.

| Langkah | Hasil |
| --- | --- |
| Pencarian web (Kurikulum Merdeka PAUD Fase Fondasi; Kepka BSKAP 046/H/KR/2025; Kepmendikdasmen 127/P/2025; panduan waktu layar WHO dan IDAI; ScratchJr; CS Unplugged; PP Tunas) | Mengarahkan ke salinan resmi di subdomain `kemendikdasmen.go.id`, `uploads.belajar.id`, halaman WHO, dan banyak situs sekunder (berita, blog, toko buku). Situs sekunder **tidak dipakai sebagai bukti**. |
| Unduhan PDF ke direktori kosong baru, teks diekstrak dengan `pdftotext` (tidak ada yang dijalankan) | Tiga dokumen resmi terbaca penuh (bagian 2.1, 2.2, 2.3); satu modul Kemenag terbaca (bagian 2.4). |
| Beberapa domain pemerintah | Tidak terjangkau dari lingkungan penyusun: `repositori.kemendikdasmen.go.id` (koneksi ditolak/habis waktu), `kurikulum.kemdikbud.go.id`, `static.buku.kemdikbud.go.id`, `banpaudpnf.kemdikbud.go.id`, `internal-portal.kemdikbud.go.id` (DNS tidak ditemukan). Dokumen yang hanya ada di sana **tidak dibuka**. |

Keterbatasan: teks PDF diekstrak otomatis; untuk Kepmendikdasmen 127/P/2025
berkasnya salinan hasil pindai dan lapisan teksnya memuat salah baca
(misalnya "t27lPl2o2s" untuk "127/P/2025"). Kutipan dari berkas itu
dinormalkan hanya pada salah baca huruf yang jelas; kata-kata tidak diubah.

## 2. Sumber resmi yang dibuka (tanggal akses 2026-11-19)

### 2.1 Kepka BSKAP 046/H/KR/2025 tentang Capaian Pembelajaran (Lampiran I: Fase Fondasi)

| Butir | Nilai |
| --- | --- |
| Berkas | Salinan Keputusan Kepala BSKAP Kementerian Pendidikan Dasar dan Menengah Nomor 046/H/KR/2025 tentang Capaian Pembelajaran pada Pendidikan Anak Usia Dini, Jenjang Pendidikan Dasar, dan Jenjang Pendidikan Menengah, ditetapkan di Jakarta 16 Juli 2025 (Kepala Badan Toni Toharudin). |
| URL yang dibuka | `https://bpmpbabel.kemendikdasmen.go.id/PPID/wp-content/uploads/2025/07/KepKaBSKAP-046_2025-ttg-CP.pdf` (subdomain `kemendikdasmen.go.id`; PDF 1691 halaman, dibuat 18 Juli 2025; teks halaman 1-30 diekstrak). Lampiran I memuat CP Fase Fondasi. |
| Hubungan ke SK sebelumnya | Diktum KETUJUH mencabut Kepka BSKAP 32/H/KR/2024. |
| Catatan | Salinan itu bertanda "Salinan sesuai dengan aslinya". Apakah ada perubahan setelahnya yang menyentuh PAUD `[belum terverifikasi]`: artikel sekunder menyebut Keputusan Kepala BKPDM Nomor 020 Tahun 2026 hanya mengubah Agama dan Budi Pekerti, tetapi teks SK perubahan itu **tidak dibuka**. |

Kutipan persis (Lampiran I, bagian D "Capaian Pembelajaran", elemen 3):

> "3. Dasar-dasar Literasi, Matematika, Sains, Teknologi, Rekayasa, dan Seni"
> Subelemen:
> - "Murid mengenali dan memahami berbagai informasi, mengomunikasikan perasaan dan pikiran secara lisan, tulisan, atau menggunakan berbagai media serta membangun percakapan, menunjukkan minat, dan berpartisipasi dalam kegiatan pramembaca;"
> - "Murid memiliki kepekaaan bilangan; mengidentifikasi pola; memiliki kesadaran tentang bentuk, posisi, dan ruang; menyadari adanya persamaan dan perbedaan karakteristik antar objek; mampu melakukan pengukuran dengan satuan tidak baku; dan memiliki kesadaran mengenai waktu;"
> - "Murid mampu mengamati, menyebutkan alasan, pilihan atau keputusannya, mampu memecahkan masalah sederhana, serta mengetahui hubungan sebab akibat dari suatu kondisi atau situasi yang dipengaruhi oleh hukum alam dan kondisi sosial;"
> - "Murid menunjukkan kemampuan awal menggunakan dan merekayasa teknologi serta untuk mencari informasi, gagasan, dan keterampilan secara aman dan bertanggung jawab; dan"
> - "Murid mengeksplorasi berbagai proses seni, mengekspresikannya, serta mengapresiasi karya seni."

(Tanda baca butir di atas mengikuti teks resmi, termasuk ejaan "kepekaaan".)

Kutipan persis penjelasan lingkup (Lampiran I, bagian A):

- Matematika: "Matematika pada konteks PAUD meliputi kemampuan menyatakan hubungan antar bilangan dengan berbagai cara (kesadaran bilangan), mengidentifikasi pola, mengenali bentuk dan karakteristik benda di sekitar yang dapat dibandingkan dan diukur, analisis data, mengklasifikasi objek, dan kesadaran mengenai waktu."
- Teknologi: "Teknologi dalam konteks PAUD meliputi kemampuan awal untuk mengenali bentuk dan fungsi benda buatan manusia yang digunakan dalam kehidupan sehari-hari serta memahami penggunaannya secara aman dan bertanggung jawab."
- Rekayasa: "Rekayasa dalam konteks PAUD meliputi kemampuan merencanakan dan merancang sesuatu untuk menyelesaikan masalah dalam kehidupan sehari-hari."
- Sains (potongan): "... pemahaman akan hubungan sebab akibat yang dipengaruhi oleh hukum alam dan pengenalan strategi pemecahan masalah sehari-hari."

Kutipan persis prinsip pembelajaran (Lampiran I, bagian C):

- "Hal yang utama, seluruh rancangan pembelajaran menempatkan murid sebagai pelaku aktif ("bermain adalah belajar")."
- "Pencapaian tujuan pembelajaran dilakukan melalui kemitraan dengan keluarga."
- "Pemanfaatan lingkungan dan teknologi sebagai sumber belajar."
- "Penerapan asesmen dilakukan dengan cara autentik (mengamati perilaku/kemampuan murid secara alami dan apa adanya yang ditampilkan murid) ..."
- Proses belajar literasi: "tidak melalui kegiatan yang nirkonteks (drilling)".

Kutipan persis hubungan PAUD ke SD (Diktum KEENAM): "Capaian Pembelajaran pada fase A disusun selaras dengan Capaian Pembelajaran pada fase fondasi untuk memastikan transisi pembelajaran yang berkesinambungan dari PAUD ke SD dengan memperhatikan 6 (enam) kemampuan fondasi sebagai berikut: a. mengenal nilai agama dan budi pekerti; b. kematangan emosi yang cukup untuk berkegiatan di lingkungan belajar; c. keterampilan sosial dan bahasa yang memadai untuk berinteraksi sehat dengan teman sebaya dan individu lainnya; d. pemaknaan terhadap belajar yang positif; e. pengembangan keterampilan motorik dan perawatan diri yang memadai untuk dapat berpartisipasi di lingkungan sekolah secara mandiri; dan f. kematangan kognitif untuk melakukan kegiatan belajar."

Temuan penting: CP Fase Fondasi **tidak menyebut "koding" atau "berpikir komputasional"** secara eksplisit. Irisan terdekatnya ada pada elemen 3: mengidentifikasi pola, mengklasifikasi objek, analisis data, memecahkan masalah sederhana, hubungan sebab akibat, merencanakan dan merancang (rekayasa), serta menggunakan teknologi secara aman. Pemetaan program ke CP karena itu bersifat **irisan**, bukan pemenuhan CP (silabus bagian 4).

### 2.2 Kepmendikdasmen 127/P/2025 tentang Pedoman Implementasi Koding dan Kecerdasan Artifisial

| Butir | Nilai |
| --- | --- |
| Berkas | Salinan Keputusan Menteri Pendidikan Dasar dan Menengah Nomor 127/P/2025 tentang Pedoman Implementasi Koding dan Kecerdasan Artifisial pada Pendidikan Anak Usia Dini, Jenjang Pendidikan Dasar, dan Jenjang Pendidikan Menengah, ditetapkan di Jakarta 4 September 2025 (Menteri Abdul Mu'ti). |
| URL yang dibuka | `https://bpmpbabel.kemendikdasmen.go.id/PPID/wp-content/uploads/2025/09/Salinan-Kepmendikdasmen-Nomor-127_P_2025-CAP.pdf` (PDF 28 halaman, salinan pindai). Halaman pengumuman di `https://www.kemendikdasmen.go.id/pengumuman/13654-kepmendikdasmen-tentang-pedoman-implementasi-koding-dan-kecerdasan-artifisial-pada-paud-dikdasmen` (16 September 2025) juga dibuka; tautan unduhan di halaman itu tidak diikuti. |

Kutipan persis (salah baca pindai dinormalkan):

- Diktum KEDUA: "Pedoman implementasi koding dan kecerdasan artifisial digunakan sebagai acuan bagi Kementerian Pendidikan Dasar dan Menengah, pemerintah daerah, satuan pendidikan, pendidik, dan tenaga kependidikan dalam melaksanakan pembelajaran koding dan kecerdasan artifisial mulai tahun ajaran 2025/2026."
- Lampiran, BAB I D (Ruang Lingkup): "1. pembelajaran muatan pengembangan berpikir komputasional pada pendidikan anak usia dini; dan 2. pembelajaran koding dan kecerdasan artifisial pada jenjang pendidikan dasar dan jenjang pendidikan menengah".
- Lampiran, BAB II B butir 5: "Pengembangan berpikir komputasional pada PAUD. Satuan PAUD dapat mengintegrasikan muatan pengembangan berpikir komputasional pada kegiatan intrakurikuler, kokurikuler, atau ekstrakurikuler."
- Lampiran, BAB II B (tiga cara pelaksanaan): "Tanpa perangkat digital (unplugged). Pembelajaran tanpa perangkat digital berbasis aktivitas melalui simulasi, permainan, dan aktivitas fisik lainnya." Dua cara lain: berbasis internet (*internet-based*) dan dengan perangkat digital (*plugged*).
- Lampiran, BAB VII C butir 1 (peran satuan pendidikan): "Menyediakan muatan pengembangan berpikir komputasional yang terintegrasi dalam kegiatan pembelajaran pada pendidikan anak usia dini, dan mata pelajaran koding dan kecerdasan artifisial pada jenjang pendidikan dasar dan pendidikan menengah sesuai ketersediaan sumber daya." Butir 5: "Melibatkan orang tua dan komunitas dalam mengembangkan koding dan kecerdasan artifisial yang bermakna."
- BAB VIII (penutup): "Ragam alternatif strategi pembelajaran seperti internet based, plugged, dan unplugged dapat diterapkan untuk menjembatani kesenjangan sarana dan prasarana serta kemampuan dasar peserta didik."

Temuan penting: kebijakan nasional untuk PAUD berbentuk **muatan pengembangan berpikir komputasional** yang *dapat* diintegrasikan satuan PAUD (bukan mata pelajaran koding dan bukan kewajiban). Istilah resmi untuk PAUD adalah "berpikir komputasional", bukan "koding". Nama program `tk-coding` mengikuti permintaan pemilik; isu penamaan dicatat sebagai pertanyaan terbuka (silabus bagian 9).

### 2.3 Panduan Pembelajaran dan Asesmen (Edisi Revisi 2025)

| Butir | Nilai |
| --- | --- |
| Berkas | *Panduan Pembelajaran dan Asesmen Pendidikan Anak Usia Dini, Jenjang Pendidikan Dasar, dan Jenjang Pendidikan Menengah*, Edisi Revisi Tahun 2025, BSKAP Kemendikdasmen (159 halaman). |
| URL yang dibuka | `https://uploads.belajar.id/document/files/Pembelajaran_dan_Asesmen_2025_01k17ee2v8pqwqybn0y9n8pcd1.pdf` (domain portal belajar milik Kemendikdasmen `[asumsi]`: kepemilikan domain tidak diperiksa lebih jauh). |

Kutipan persis:

- Tentang CP PAUD: "Karena CP untuk dicapai di akhir partisipasi anak di satuan PAUD sehingga pembelajarannya tidak perlu dikunci menjadi capaian per usia".
- Tentang asesmen fondasi: "kemampuan fondasi merupakan perilaku yang dapat diamati, bukan kemampuan yang tepat diukur melalui tes tertulis maupun lisan. Hasil tes yang cenderung hanya berupa angka berisiko memberi pelabelan pada murid dan berpotensi mempengaruhi persepsi diri mereka secara negatif."
- Bentuk asesmen: "Ragam bentuk asesmen yang dapat dilakukan untuk fase fondasi dan SD Fase A, antara lain: catatan anekdot, ceklis, hasil karya, portofolio, dokumentasi, dll."
- Glosarium: "Catatan Anekdotal: Catatan singkat hasil observasi yang difokuskan pada performa dan perilaku yang menonjol, disertai latar belakang kejadian dan hasil analisis atas observasi yang dilakukan."
- Contoh dokumen perencanaan PAUD (Lampiran 6) memakai "Kelompok Usia : 4-5 Tahun" sebagai contoh; panduan tidak memuat alokasi menit per hari atau per minggu untuk PAUD. Alokasi waktu belajar PAUD `[belum terverifikasi]`.

### 2.4 Modul PPG Kemenag untuk RA (konteks, bukan teks CP berlaku)

*Muatan Pembelajaran di PAUD/RA*, Modul PGRA, Direktorat Jenderal Pendidikan Islam, Kementerian Agama (cetakan III, April 2023), dibuka dari `https://cendikia.kemenag.go.id/storage/uploads/file_path/file_13-06-2023_648804063a5e0.pdf`. Modul ini mengutip CP versi **sebelum** 046/H/KR/2025 (Kepka BSKAP 033/H/KR/2022) dan CP Kemenag untuk RA, sehingga **tidak dipakai sebagai kutipan CP berlaku**. Nilainya hanya sebagai ilustrasi: contoh kemampuan teknologi pada versi lama adalah "Anak mampu merancang teknologi secara sederhana seperti membuat kipas untuk menghalau angin" dan "Anak mengenal teknologi yang ada di lingkungan sekitarnya, seperti gunting, pisau, pulpen dan peralatan lain" (indikator contoh, tidak mengikat). Rumusan elemen dan nama elemen pada versi 2025 sudah berbeda.

### 2.5 Yang tidak dapat dibuka

| Dokumen | Status |
| --- | --- |
| Panduan Capaian Pembelajaran Fase Fondasi PAUD (revisi 14 September 2025; `repositori.kemendikdasmen.go.id/33597/...`) | Muncul di hasil pencarian; domain tidak terjangkau. **Tidak dibuka** `[belum terverifikasi]`. |
| Panduan Mata Pelajaran Koding dan Kecerdasan Artifisial (BSKAP, 12 September 2025) | Muncul di hasil pencarian; domain tidak terjangkau. **Tidak dibuka**; apakah memuat contoh kegiatan PAUD `[belum terverifikasi]`. |
| Permendikdasmen 13/2025 (Pasal 32A) | Hanya terbaca lewat ringkasan sekunder; teks **tidak dibuka**. |
| Standar waktu belajar/jam layanan PAUD (Standar Proses, struktur kurikulum PAUD) | Tidak ditemukan pada dokumen yang dibuka `[belum terverifikasi]`. |
| UU 27/2022 (Pelindungan Data Pribadi) dan PP 17/2025 ("PP Tunas") | Hanya hasil pencarian sekunder; teks **tidak dibuka**. Dirujuk di bagian 5 hanya sebagai butir `[belum terverifikasi]`. |

Satu halaman BBPMP Jawa Tengah (`https://bbpmpjateng.kemendikdasmen.go.id/status-mata-pelajaran-koding-dan-kecerdasan-artifisial-serta-fleksibilitas-implementasinya/`, dibuka 2026-11-19) menyebut "Salah satu prinsip utama implementasi KKA adalah fleksibilitas" dan "pembelajaran tidak selalu harus menggunakan perangkat digital"; halaman itu **tidak membahas PAUD** (penerapan mata pelajaran dimulai kelas V SD, VII SMP, dan X SMA/SMK) dan tidak bertanggal pada isi artikel.

## 3. Panduan waktu layar

| Sumber | Kutipan persis | Status |
| --- | --- | --- |
| WHO, siaran pers "To grow up healthy, children need to sit less and play more", 24 April 2019 (`https://www.who.int/news/item/24-04-2019-to-grow-up-healthy-children-need-to-sit-less-and-play-more`, dibuka) | Usia di bawah 1 tahun: "Screen time is not recommended." Usia 1 tahun: "For 1-year-olds, sedentary screen time (such as watching TV or videos, playing computer games) is not recommended." Usia 2 tahun: "For those aged 2 years, sedentary screen time should be no more than 1 hour; less is better". Usia 3-4 tahun: "Sedentary screen time should be no more than 1 hour; less is better." | Terverifikasi dari siaran pers. Dokumen pedomannya (*Guidelines on physical activity, sedentary behaviour and sleep for children under 5 years of age*, 2019; halaman `https://www.who.int/publications/i/item/9789241550536` dibuka) tidak terunduh; WHO hanya mencakup anak **di bawah 5 tahun**, sehingga usia 5-6 tahun tidak punya angka dari sumber ini. |
| IDAI | -- | `[belum terverifikasi]`. Pencarian menemukan berita yang mengutip batas "maksimal 1 jam per hari" untuk usia 2-6 tahun dan "zero screen time" di bawah 2 tahun, tetapi tidak ada dokumen resmi IDAI yang berhasil dibuka (satu URL IDAI memberi HTTP 404; satu artikel IDAI lama dalam hasil pencarian menyebut anjuran para ahli "2 jam" untuk anak di atas 2 tahun, tidak dibuka penuh). Angka IDAI **tidak dipakai** sebagai dasar. |

Dampak ke rancangan: karena batas WHO adalah **total** waktu layar *sedentary*
sehari ("no more than 1 hour; less is better") dan keluarga juga memberi layar
di rumah, kegiatan berpemrograman program ini diusulkan **tanpa layar secara
bawaan**; layar hanya sebagai opsi kecil yang diputuskan pemilik
(silabus bagian 9, Q1).

## 4. Pendekatan berpikir komputasional anak usia dini

Bagian ini penilaian penyusun dari pengetahuan umum yang **tidak dibuka
ulang dari jurnal** pada sesi ini; semua klaim kajian pustaka ditandai
`[belum terverifikasi]` dan hanya memandu pilihan, bukan fakta.

| Pendekatan | Isi | Kecocokan dengan CP Fondasi dan kebijakan | Catatan |
| --- | --- | --- | --- |
| Unplugged (tanpa perangkat): permainan urutan, pola, pengelompokan, "robot" tubuh, kartu panah, kisi lantai | Anak bergerak dan bermain; konsep urutan, pola, klasifikasi, perintah, pengulangan, dan "memperbaiki kesalahan" dikenalkan tanpa layar. | Sangat cocok: kebijakan resmi menyebut unplugged sebagai cara pelaksanaan sah (bagian 2.2); CP memuat pola, klasifikasi, pemecahan masalah; prinsip "bermain adalah belajar". | Biaya hampir nol; bahan bisa dibuat guru. CS Unplugged (Universitas Canterbury, Selandia Baru) adalah kumpulan materi gratis berlisensi Creative Commons Attribution-ShareAlike 4.0 International (dibuka `https://www.csunplugged.org/en/` 2026-11-19; bahasa yang tertera: Inggris, Jerman, Spanyol, Prancis, Te Reo Māori, Tionghoa Sederhana; **bahasa Indonesia tidak tertera**). Dipakai sebagai **rujukan ide**, bukan disalin (lisensi *ShareAlike* mengikat turunan; lihat bagian 6). Kecocokan materi itu untuk usia 4-6 tahun `[belum terverifikasi]`. |
| Robot lantai berpemrograman tombol (tanpa layar; anak menekan tombol arah, robot bergerak di kisi) | Menyatukan perintah, urutan, dan debugging dengan benda konkret. | Cocok sebagai opsi (kebijakan menyebut perangkat digital *plugged* sah, tetapi robot ini tanpa layar). | Harga per unit dan ketersediaan di Indonesia `[belum terverifikasi]` (halaman produsen yang dicoba menolak akses, HTTP 403). Contoh kelas produk: robot lantai tombol arah seperti Bee-Bot dan sejenisnya, disebut netral tanpa rekomendasi merek. Alternatif murah: anak sendiri menjadi "robot". |
| Aplikasi blok bergambar tanpa baca, contoh ScratchJr | Anak menyusun blok bergambar di tablet untuk menganimasikan tokoh dan cerita. | Cocok untuk anak yang lebih besar (TK B akhir) **bila** ada layar; menyentuh urutan, pengulangan, dan cerita. | Lihat bagian 4.1. |
| Permainan/aplikasi koding komersial berlangganan | Beragam. | `[belum terverifikasi]` per produk. | Tidak dikaji satu per satu; risiko akun anak, iklan, dan pembayaran (bagian 5). Tidak direkomendasikan sebagai dasar. |

### 4.1 ScratchJr (contoh aplikasi blok bergambar; fakta yang dibuka)

| Butir | Nilai | Bukti |
| --- | --- | --- |
| Pengembang dan penerbit | Scratch Foundation, Inc. (kolaborasi MIT Media Lab, Universitas Tufts, dan Playful Invention Company menurut ringkasan pencarian; keterlibatan lembaga itu `[belum terverifikasi]` karena situs resmi scratchjr.org hanya tampil sebagai judul halaman saat dibuka) | Halaman App Store: "Scratch Foundation, Inc." |
| Usia | Deskripsi: "young children (ages 5-7)"; label peringkat halaman App Store: "4+" dan "Made For Ages 6-8" (label berbeda satu sama lain, tercatat apa adanya) | `https://apps.apple.com/gb/app/scratchjr/id895485086`, dibuka 2026-11-19 |
| Harga | "Free" di App Store; tidak ada pembelian dalam aplikasi yang disebut di halaman itu | idem; halaman Google Play **tidak terbaca** (hanya judul) |
| Akun | Tidak ada akun menurut ringkasan pihak ketiga; **belum terverifikasi** dari sumber resmi | pencarian web |
| Label privasi App Store | Data yang dilaporkan pengembang: Location (Coarse Location) dan Usage Data (Product Interaction), untuk Analytics, "not linked to your identity"; Apple belum memverifikasi laporan itu | halaman App Store |
| Lisensi kode | BSD-3-Clause | `gh api repos/scratchfoundation/scratchjr` (2026-11-19) |
| Status kode | Repositori **diarsipkan**; dorongan terakhir 2022-07-22 | idem |
| Platform | README repositori: iOS dan Android; versi web hanya "planned" | README repositori |
| Bahasa antarmuka | Halaman App Store menampilkan "English"; dukungan bahasa Indonesia `[belum terverifikasi]` | halaman App Store |

Penilaian: gratis dan tanpa iklan yang terlihat di halaman toko, tetapi (1)
dukungan bahasa Indonesia tidak terbukti, (2) kode diarsipkan sejak 2022
sehingga pemeliharaan jangka panjang tidak pasti, (3) ia memerlukan tablet
(sarana yang banyak TK tidak punya), dan (4) memakai layar. Karena itu hanya
dijadikan **opsi demonstrasi** (silabus bagian 8).

### 4.2 Kiri dan kanan pada anak usia TK (dibuka 2026-11-19, #239)

Dasar tujuan 4 silabus (instruksi arah) setelah `belok kanan` dikeluarkan. Ringkasan di bawah dibaca dari abstrak terindeks PubMed (teks lengkap tidak dibuka); angka dikutip dari abstrak.

| Rujukan | Temuan (abstrak) | Dampak pada rencana |
| --- | --- | --- |
| Dellatolas dkk. (1998), *Cortex* 34(5):659-76 | Penguasaan kiri-kanan umumnya sekitar usia 6-7 tahun; pada anak prasekolah 5-6,4 tahun yang diminta menunjuk tangan kiri, mata kanan, telinga kiri, tangan kanan, 30% membalik secara sistematis dan 14% membuat 1-3 kesalahan. | Kiri-kanan tubuh sendiri dilatih pelan (`TK-A1-M4`), tanpa menuntut ketepatan; menuntut `belok kanan` pada kisi di TK B tidak realistis. |
| Rigal (1994), *Percept Mot Skills* 79(3):1259-78 (406 anak) | Diskriminasi dan pengenalan dikuasai jauh lebih awal daripada identifikasi dengan kata kiri/kanan; kata dipakai benar lebih dulu pada tubuh sendiri (sekitar 7 tahun), lalu orang yang membelakangi, lalu yang menghadap (8-9 tahun). | Perintah arah berbasis kata kiri/kanan pada benda lain (robot yang menghadap anak) masih sulit; ditangani dengan anak menjadi robot dan kartu bergambar. |
| Clark dan Klonoff (1990), *J Clin Exp Neuropsychol* 12(4):459-66 (360 anak 5-13 tahun) | Skor multimodal, konsisten dengan tahap: belum paham, pemahaman egosentris pada tubuh sendiri, lalu generalisasi ke benda luar. | Pemahaman usia TK diperkirakan baru tahap egosentris `[asumsi]`; sebab itu `belok kiri` yang selalu dikaitkan dengan tangan kiri anak. |

Penilaian penyusun: abstrak ini mendukung pembatasan, bukan menetapkan ambang usia untuk rencana ini. Efek `belok kanan` pada belajar kartu panah di TK tidak diuji di sini `[belum terverifikasi]`.

## 5. Risiko

| Risiko | Penjelasan | Mitigasi dalam rancangan |
| --- | --- | --- |
| Waktu layar berlebih | WHO: maksimal 1 jam per hari sedentary screen time untuk usia 2-4 tahun, "less is better" (bagian 3). Program tidak boleh menambah beban layar anak. | Bawaan tanpa layar; opsi layar kecil, didampingi, tanpa tugas rumah berlayar. |
| Privasi anak | Aplikasi anak bisa mengumpulkan data penggunaan dan lokasi kasar (bagian 4.1). Foto, video, nama, dan suara anak adalah data pribadi anak. Repo ini tidak boleh memuat data pelajar ([ADR-0004](../../architecture/adr/0004-no-learner-personal-data.md)). | Tanpa akun anak; tidak ada foto, nama, atau suara anak di repo; catatan observasi tinggal di sekolah; hanya templat kosong. |
| Iklan dan pembelian dalam aplikasi | Banyak aplikasi anak berlangganan memuat iklan atau pembelian. Tidak dikaji per produk. | Hanya aplikasi tanpa akun, tanpa iklan, dan tanpa pembelian, diperiksa guru sebelum dipakai; bawaan tanpa aplikasi. |
| Perangkat anak di bawah usia platform | PP 17/2025 ("PP Tunas") menurut pemberitaan menunda akses anak ke platform berisiko; teksnya `[belum terverifikasi]`. | Tidak ada layanan daring untuk anak; perangkat dipegang guru. |
| Kejar-capaian dan label | Panduan resmi memperingatkan angka berisiko memberi label (bagian 2.3). | Tanpa nilai angka; hanya observasi naratif dan ceklis. |
| Kesenjangan sarana | Banyak TK tanpa tablet dan listrik stabil. | Seluruh rencana inti tanpa perangkat; kebijakan resmi mendukung unplugged. |
| Beban guru | Guru TK belum tentu berlatar informatika. | Kegiatan tertulis rinci dan memakai bahan murah; pelatihan guru di luar scope draf (silabus bagian 9). |
| Klaim berlebihan ("anak TK sudah coding") | Kebijakan resmi untuk PAUD hanya berpikir komputasional. | Penamaan dan bahasa dokumen mengikuti istilah resmi (silabus bagian 1). |

## 6. Catatan lisensi bahan

- Bahan berlisensi *ShareAlike* (CS Unplugged) hanya boleh menjadi rujukan ide. Kegiatan di draf silabus ditulis ulang dengan kata penyusun dan dengan bahan lokal; bila kelak bahan disalin atau diadaptasi dekat, atribusi dan lisensi turunan wajib mengikuti CC BY-SA 4.0 (belum dikerjakan; keputusan pemilik).
- Kode sumber ScratchJr berlisensi BSD-3-Clause, tetapi repo ini tidak memuat kode aplikasi mana pun.

## 7. Daftar rujukan yang dibuka

| No. | Rujukan | URL |
| --- | --- | --- |
| 1 | Kepka BSKAP 046/H/KR/2025 (salinan, Lampiran I Fase Fondasi) | `https://bpmpbabel.kemendikdasmen.go.id/PPID/wp-content/uploads/2025/07/KepKaBSKAP-046_2025-ttg-CP.pdf` |
| 2 | Kepmendikdasmen 127/P/2025 (salinan) | `https://bpmpbabel.kemendikdasmen.go.id/PPID/wp-content/uploads/2025/09/Salinan-Kepmendikdasmen-Nomor-127_P_2025-CAP.pdf` |
| 3 | Pengumuman Kepmendikdasmen 127/P/2025 | `https://www.kemendikdasmen.go.id/pengumuman/13654-kepmendikdasmen-tentang-pedoman-implementasi-koding-dan-kecerdasan-artifisial-pada-paud-dikdasmen` |
| 4 | Panduan Pembelajaran dan Asesmen, Edisi Revisi 2025 | `https://uploads.belajar.id/document/files/Pembelajaran_dan_Asesmen_2025_01k17ee2v8pqwqybn0y9n8pcd1.pdf` |
| 5 | Modul PGRA Kemenag: Muatan Pembelajaran di PAUD/RA | `https://cendikia.kemenag.go.id/storage/uploads/file_path/file_13-06-2023_648804063a5e0.pdf` |
| 6 | BBPMP Jawa Tengah, fleksibilitas implementasi KKA | `https://bbpmpjateng.kemendikdasmen.go.id/status-mata-pelajaran-koding-dan-kecerdasan-artifisial-serta-fleksibilitas-implementasinya/` |
| 7 | WHO, siaran pers 24 April 2019 | `https://www.who.int/news/item/24-04-2019-to-grow-up-healthy-children-need-to-sit-less-and-play-more` |
| 8 | WHO, halaman publikasi pedoman 2019 | `https://www.who.int/publications/i/item/9789241550536` |
| 9 | CS Unplugged | `https://www.csunplugged.org/en/` |
| 10 | ScratchJr di App Store (Britania Raya) | `https://apps.apple.com/gb/app/scratchjr/id895485086` |
| 11 | Repositori kode ScratchJr (metadata via API GitHub) | `https://github.com/scratchfoundation/scratchjr` |
| 12 | Dellatolas dkk. 1998 (abstrak PubMed) | `https://pubmed.ncbi.nlm.nih.gov/9872370/` |
| 13 | Rigal 1994 (abstrak PubMed) | `https://pubmed.ncbi.nlm.nih.gov/7899010/` |
| 14 | Clark dan Klonoff 1990 (abstrak PubMed) | `https://pubmed.ncbi.nlm.nih.gov/2211970/` |

## Changelog

| Versi | Tanggal | Perubahan |
| --- | --- | --- |
| v0.1.0 | 2026-11-19 | Riset awal (issue #127). |
| v0.1.1 | 2026-11-19 | Tautan dan status disesuaikan dengan silabus v1.0.0 yang disetujui (`silabus-draf.md` menjadi `silabus.md`; issue #127). |
| v0.1.2 | 2026-11-19 | Bagian 4.2: bukti perkembangan kiri-kanan anak usia TK untuk menyelaraskan tujuan 4 (#239). |
