# Riset Sumber: Pembelajaran Coding untuk Mahasiswa (`kuliah-coding`)

- **Version:** v0.1.0
- **Last updated:** 2026-11-19
- **Status:** DRAF (riset, bukan keputusan pemilik). Issue #130.

> Dokumen ini mencatat sumber yang **benar-benar dibuka** penyusun pada
> **2026-11-19**, apa yang terverifikasi dari tiap sumber, dan apa yang tidak.
> Kutipan ditulis persis dari sumber yang dibuka; parafrasa ditandai sebagai
> parafrasa. Butir `[belum terverifikasi]` tidak boleh diperlakukan sebagai
> fakta. Keputusan perancangan penyusun ditandai `[asumsi]`. Isi folder ini
> adalah konten karangan menurut
> [ADR-0007](../../architecture/adr/0007-authored-learning-content.md).

## 1. Ringkasan temuan

| Topik | Hasil | Status |
| --- | --- | --- |
| Regulasi yang berlaku untuk standar dan beban belajar pendidikan tinggi | Permendiktisaintek Nomor 39 Tahun 2025 tentang Penjaminan Mutu Pendidikan Tinggi, ditetapkan 28 Agustus 2025; mencabut Permendikbudristek 53 Tahun 2023 (Pasal 117). Teks lengkap dibuka dan dibaca. | Terverifikasi (salinan peraturan.go.id). |
| Konsep CPL dan SKS | Pasal 6 sampai 8 (CPL) dan Pasal 15 sampai 18 (SKS, beban sarjana) dibaca langsung. | Terverifikasi. |
| Kampus Merdeka / MBKM | Pernyataan Dirjen Dikti (April 2025) bahwa MBKM berlanjut di bawah gerakan Kampus Berdampak, dari satu artikel berita. Dasar hukum belajar di luar program studi ada di Permendiktisaintek 39/2025 Pasal 16 ayat (4) dan Pasal 18 ayat (4). | Sebagian: regulasi terverifikasi; status program MBKM hanya dari berita. |
| Kurikulum rujukan internasional | CS2023 (ACM/IEEE-CS/AAAI): 17 knowledge area (KA) terbaca dari situs resmi csed.acm.org. Rincian unit pengetahuan, jam, dan kerangka kompetensi **tidak** terbaca. | KA terverifikasi; sisanya `[belum terverifikasi]`. |
| Rujukan asosiasi Indonesia (APTIKOM) | Beranda aptikom.org dibuka; isinya tidak menautkan dokumen kurikulum acuan; halaman memuat tautan tak relevan (judi) yang mengisyaratkan situs bermasalah. Tidak dipakai sebagai sumber. | `[belum terverifikasi]`. |
| ICPC | Dua halaman aturan resmi regional (Europe Championship, North America) dibuka: tim tiga peserta, durasi biasanya lima jam. Halaman aturan global icpc.global tidak menampilkan isi (hanya judul). Aturan kelayakan berubah tiap tahun. | Sebagian terverifikasi. |
| Pelaksanaan ICPC di Indonesia (regional, penyelenggara) | Tidak dibuka. | `[belum terverifikasi]`. |

## 2. Sumber yang dibuka

| No. | Sumber | URL | Tanggal akses | Hasil |
| --- | --- | --- | --- | --- |
| S1 | Permendiktisaintek 39/2025, salinan Peraturan.go.id (47 halaman) | `https://peraturan.go.id/files/permendiktisaintek-no-39-tahun-2025.pdf` | 2026-11-19 | PDF diunduh ke direktori kosong di `/tmp`, teks diekstrak penuh dengan `pdftotext`, dibaca. Kutipan di bagian 3. |
| S2 | Materi sosialisasi LLDikti VI "SNDIKTI Permen 39 2025" | `https://lldikti6.id/wp-content/uploads/2025/11/01.-MATERI-1-SNDIKTI-Permen-39-2025.pdf` | 2026-11-19 | Dibuka tetapi isi tidak terbaca (PDF terkompresi, hanya citra). Tidak dipakai. |
| S3 | Hasil pencarian web tentang Permen 39/2025 dan 53/2023 | (hasil pencarian; sumber sekunder) | 2026-11-19 | Menunjuk ke JDIH `jdih.kemdiktisaintek.go.id` dan ke materi LLDikti; **tidak dibuka** halaman JDIH-nya. Ringkasan sekunder tentang 53/2023 (mis. SKS 45 jam) cocok dengan S1 untuk 39/2025. |
| S4 | Situs CS2023, beranda | `https://csed.acm.org/` | 2026-11-19 | Terbaca: nama "ACM/IEEE-CS/AAAI Computer Science Curricula"; tanggal pengesahan: ACM 18 Januari 2024, IEEE-CS 22 Januari 2024, AAAI 22 Februari 2024; laporan tersedia per bagian dan sebagai satu dokumen di ACM Digital Library. |
| S5 | Situs CS2023, halaman knowledge areas | `https://csed.acm.org/knowledge-areas/` | 2026-11-19 | Daftar 17 KA (bagian 4). Tanpa jam. |
| S6 | Situs CS2023, halaman laporan akhir | `https://csed.acm.org/final-report/` | 2026-11-19 | Hanya daftar tautan bab (mis. "Introduction to Competency Framework", "Body of Knowledge"); isi PDF tidak terbaca. |
| S7 | Berkas laporan CS2023 beta (tebakan URL) | `https://csed.acm.org/wp-content/uploads/2023/09/Version-Beta-v1.pdf` | 2026-11-19 | HTTP 404. Tidak dipakai. |
| S8 | APTIKOM, beranda | `https://aptikom.org/` | 2026-11-19 | Dibuka; lihat bagian 6. |
| S9 | ICPC Europe Championship 2026, aturan resmi | `https://euc.icpc.global/?p=2499` | 2026-11-19 | Dibuka; kutipan di bagian 5. |
| S10 | ICPC North America, aturan | `https://nc.na.icpc.global/rules/` | 2026-11-19 | Dibuka; kutipan di bagian 5. |
| S11 | ICPC, halaman aturan global | `https://icpc.global/regionals/rules` dan `https://icpc.global/worldfinals/rules` | 2026-11-19 | Dibuka; hanya judul halaman terbaca ("The ICPC International Collegiate Programming Contest"); isi aturan **tidak** terverifikasi dari sini. |
| S12 | JPNN, "Kemdiksainstek: Gerakan #KampusBerdampak Bukti MBKM Berlanjut" | `https://www.jpnn.com/news/kemdiksainstek-gerakan-kampusberdampak-bukti-mbkm-berlanjut` | 2026-11-19 | Dibuka; artikel berita (sumber sekunder) 30 April 2025. |

Hasil pencarian lain (artikel kampus, vendor, berita) tidak dibuka dan tidak
dipakai sebagai fakta.

## 3. Regulasi: Permendiktisaintek 39/2025 (S1)

Judul pada halaman pertama: "PERATURAN MENTERI PENDIDIKAN TINGGI, SAINS, DAN
TEKNOLOGI REPUBLIK INDONESIA NOMOR 39 TAHUN 2025 TENTANG PENJAMINAN MUTU
PENDIDIKAN TINGGI". Ditetapkan di Jakarta pada 28 Agustus 2025.

### 3.1 Status dan pencabutan

Pasal 117: "Pada saat Peraturan Menteri ini mulai berlaku, Peraturan Menteri
Pendidikan, Kebudayaan, Riset, dan Teknologi Nomor 53 Tahun 2023 tentang
Penjaminan Mutu Pendidikan Tinggi (Berita Negara Republik Indonesia Tahun
2023 Nomor 638), dicabut dan dinyatakan tidak berlaku." Pasal 118: berlaku
pada tanggal diundangkan. Tanggal pengundangan dan nomor Berita Negara pada
salinan yang dibuka tidak terbaca (kolom tanda tangan elektronik)
`[belum terverifikasi]`.

Bila ada peraturan yang lebih baru dari 39/2025 pada 2026-11-19, penyusun
tidak memeriksanya `[belum terverifikasi]`.

### 3.2 Struktur standar (Pasal 5)

Standar nasional pendidikan terdiri atas standar luaran pendidikan (standar
kompetensi lulusan), standar proses pendidikan (proses pembelajaran,
penilaian, pengelolaan), dan standar masukan pendidikan (isi, dosen dan tenaga
kependidikan, sarana dan prasarana, pembiayaan). Pasal 5 ayat (5): standar
itu "menjadi acuan dalam menyusun, menyelenggarakan, dan mengevaluasi
kurikulum." (parafrasa untuk daftar; kutipan hanya pada ayat (5)).

### 3.3 Capaian Pembelajaran Lulusan (CPL), Pasal 6 sampai 8

- Pasal 6 ayat (3): "Standar kompetensi lulusan sebagaimana dimaksud pada
  ayat (1) dirumuskan dalam capaian pembelajaran lulusan."
- Pasal 7: CPL setiap program studi mencakup kompetensi yang meliputi:
  "penguasaan ilmu pengetahuan dan teknologi, kecakapan/keterampilan spesifik
  dan aplikasinya untuk 1 (satu) atau sekumpulan bidang keilmuan tertentu";
  "kecakapan umum yang dibutuhkan sebagai dasar untuk penguasaan ilmu
  pengetahuan dan teknologi serta bidang kerja yang relevan"; "pengetahuan dan
  keterampilan yang dibutuhkan untuk dunia kerja dan/atau melanjutkan studi
  pada jenjang yang lebih tinggi ataupun untuk mendapatkan sertifikat
  profesi"; dan "kemampuan intelektual untuk berpikir secara mandiri dan
  kritis sebagai pembelajar sepanjang hayat."
- Pasal 8 ayat (1): CPL "disusun oleh unit pengelola program studi dengan
  melibatkan: a. pemangku kepentingan; dan/atau b. dunia usaha, dunia
  industri, dan dunia kerja."
- Pasal 8 ayat (2): CPL memperhatikan, antara lain, "kerangka kualifikasi
  nasional Indonesia", "perkembangan ilmu pengetahuan dan teknologi", dan
  "kurikulum program studi sejenis."
- Pasal 8 ayat (4) dan (5): CPL "disusun ke dalam mata kuliah pada setiap
  program studi"; mata kuliah "memiliki capaian pembelajaran mata kuliah yang
  berkontribusi pada capaian pembelajaran lulusan."

**Implikasi (penyusun):** CPL dirumuskan oleh **setiap program studi**; tidak
ada rumusan CPL nasional tunggal untuk "coding" pada sumber yang dibuka.
Karena itu pemetaan draf ini ke CPL hanya dapat berupa **kolom isian** yang
diisi program studi pengadopsi, bukan pemetaan ke butir resmi.

### 3.4 Satuan kredit semester (SKS), Pasal 15 sampai 18

- Pasal 15 ayat (1): "Pelaksanaan proses pembelajaran dilaksanakan dengan
  sistem kredit semester."
- Pasal 15 ayat (2): Masa Tempuh Kurikulum "2 (dua) semester untuk 1 (satu)
  tahun akademik"; ayat (3): perguruan tinggi dapat menyelenggarakan "1 (satu)
  semester antara".
- Pasal 15 ayat (6): "Beban belajar 1 (satu) satuan kredit semester setara
  dengan 45 (empat puluh lima) jam per semester."
- Pasal 16 ayat (1): beban belajar dipenuhi dalam bentuk "kuliah, responsi,
  tutorial, seminar, praktikum, praktik, studio, penelitian, perancangan,
  pengembangan, tugas akhir, ..., magang, wirausaha, pengabdian kepada
  masyarakat, dan/atau bentuk pembelajaran lain" (elipsis oleh penyusun).
- Pasal 16 ayat (2): bentuk pembelajaran dilakukan melalui "belajar
  terbimbing", "penugasan terstruktur", dan/atau "mandiri".
- Pasal 16 ayat (4): "Pemenuhan beban belajar dapat dilakukan di luar program
  studi" dalam program studi lain di perguruan tinggi yang sama, program studi
  di perguruan tinggi lain, dan lembaga di luar perguruan tinggi (parafrasa).
- Pasal 18 ayat (1): program sarjana atau sarjana terapan "paling sedikit 144
  (seratus empat puluh empat) satuan kredit semester yang dirancang selama 8
  (delapan) semester."
- Pasal 18 ayat (2): semester satu dan dua "paling banyak 20 (dua puluh)
  satuan kredit semester"; semester tiga dan seterusnya "paling banyak 24 (dua
  puluh empat)"; ayat (3): semester antara paling banyak 9 SKS.
- Pasal 18 ayat (9): ketercapaian kompetensi lulusan dipastikan melalui tugas
  akhir "yang dapat berbentuk skripsi, prototipe, proyek, atau bentuk tugas
  akhir lainnya" atau "penerapan kurikulum berbasis proyek".

Pembagian jam kuliah, praktikum, dan mandiri per SKS serta jumlah minggu per
semester **tidak** ada pada pasal yang dibaca penyusun; keduanya dalam draf
adalah `[asumsi]`.

### 3.5 Fleksibilitas dan pengakuan pembelajaran lampau

Pasal 14 ayat (3): fleksibilitas proses pendidikan diberikan dalam bentuk,
antara lain, pembelajaran "secara tatap muka, jarak jauh termasuk daring, atau
kombinasi" dan "keleluasaan kepada mahasiswa untuk menyelesaikan pendidikan
melalui rekognisi pembelajaran lampau sesuai dengan ketentuan peraturan
perundang-undangan." Rekognisi ini menjadi dasar jembatan dari sma-coding dan
dari pengalaman kerja (dewasa-coding) pada draf, dengan syarat tata cara
rekognisi ditetapkan perguruan tinggi `[belum terverifikasi]` (peraturan
turunannya tidak dibuka).

### 3.6 Integritas akademik (Pasal 33, 34, 37)

- Pasal 33 ayat (1): kegiatan pendidikan dilakukan "dengan menjunjung tinggi
  integritas dan etika akademik".
- Pasal 34 ayat (2) huruf d: pengawasan minimal meliputi penerimaan dan
  penyelesaian "keluhan, laporan atau pengaduan terhadap dugaan pelanggaran
  etika akademik".
- Pasal 37 ayat (2) huruf b: penyiapan mahasiswa baru minimal meliputi "cara
  belajar yang menjunjung prinsip integritas akademik".

Tidak ada ketentuan tentang kecerdasan artifisial generatif pada pasal-pasal
yang dibaca. Kebijakan penggunaan AI pada draf adalah rancangan penyusun
`[asumsi]`.

### 3.7 Yang tidak dibuka dari regulasi

Lampiran atau peraturan turunan (pedoman CPL, kerangka kualifikasi nasional
Indonesia, SKKNI), standar isi tingkat rinci, dan tata cara rekognisi
pembelajaran lampau `[belum terverifikasi]`. Penyusun juga tidak membuka
regulasi lama (mis. standar nasional pendidikan tinggi sebelum 2023) sehingga
tidak menyatakan isinya.

## 4. Rujukan internasional: CS2023 (S4, S5)

Terbaca dari situs resmi: kurikulum bernama "ACM/IEEE-CS/AAAI Computer Science
Curricula" (CS2023), dengan laporan akhir, komite pengarah, gugus tugas, dan
pernyataan visi; disahkan ACM (18 Januari 2024), IEEE-CS (22 Januari 2024), dan
AAAI (22 Februari 2024).

**17 knowledge area (KA)** persis seperti daftar di halaman knowledge areas
(kode singkatan dari halaman yang sama):

| No. | Knowledge area | Singkatan |
| --- | --- | --- |
| 1 | Algorithmic Foundations | AL |
| 2 | Architecture and Organization | AR |
| 3 | Artificial Intelligence | AI |
| 4 | Data Management | DM |
| 5 | Foundations of Programming Languages | FPL |
| 6 | Graphics and Interactive Techniques | GIT |
| 7 | Human-Computer Interaction | HCI |
| 8 | Mathematical and Statistical Foundations | MSF |
| 9 | Networking and Communication | NC |
| 10 | Operating Systems | OS |
| 11 | Parallel and Distributed Computing | PDC |
| 12 | Security | SEC |
| 13 | Society, Ethics, and the Profession | SEP |
| 14 | Software Development Fundamentals | SDF |
| 15 | Software Engineering | SE |
| 16 | Specialized Platform Development | SPD |
| 17 | Systems Fundamentals | SF |

**Tidak terverifikasi:** unit pengetahuan di dalam tiap KA, jam inti (KA core
hours), kerangka kompetensi ("Competency Framework") beserta contohnya,
pernyataan keberlakuan untuk program non-informatika. Karena itu draf hanya
memetakan mata kuliah ke **tingkat KA**, bukan ke unit pengetahuan, dan
**tidak** mengutip kalimat dari laporan CS2023. CS2023 adalah rujukan
internasional, bukan regulasi Indonesia; rumusan CPL tetap hak program studi
(bagian 3.3).

## 5. ICPC (S9, S10, S11)

Kutipan persis dari halaman aturan yang berhasil dibuka:

- Europe Championship 2026 (S9): "Each team of three contestants will work on
  a single computer using the contest control system provided by the
  organizers." "Contest duration: 5 hours." "Contestants must also provide
  proof of enrollment at the university they represented in the regional
  contest." "Eligibility is defined by the ICPC Regional Rules."
- North America (S10): "Each team consists of three contestants who are
  eligible to compete in the ICPC World Finals" ; "A team may only have one
  registered coach, and that coach cannot also be a contestant." ; "A student
  who has competed in two ICPC World Finals is NOT eligible to compete in ICPC
  Regionals" (dengan pengecualian yang tercantum di halaman); durasi "typically
  five hours" (parafrasa halaman: panjang kontes biasanya lima jam dan dapat
  diubah direktur kontes). Petisi perpanjangan kelayakan umumnya disetujui
  bila mahasiswa memenuhi syarat dasar dan tidak lebih dari "the equivalent of
  eight semesters of full-time STEM study" (parafrasa).

**Catatan:** aturan regional di atas milik wilayah Eropa dan Amerika Utara;
aturan wilayah Indonesia/Asia, kriteria kelayakan tahun berjalan, bahasa
pemrograman yang diizinkan, dan jumlah soal tidak terverifikasi
`[belum terverifikasi]`. Halaman aturan global (S11) tidak menampilkan isi.
Karena itu draf jalur kompetitif memakai format "tim tiga orang, satu
komputer, sekitar lima jam" hanya sebagai **bentuk latihan** `[asumsi]` dan
meminta pemilik memberi tautan aturan ICPC wilayah yang dituju (pertanyaan
terbuka).

## 6. APTIKOM (S8)

Beranda aptikom.org menyebut APTIKOM sebagai asosiasi perguruan tinggi
berumpun ilmu komputer di Indonesia (kata persis halaman: "Asosiasi yang
mewadahi perguruan tinggi di indonesia yang memiliki rumpun ilmu komputer")
dengan tujuan antara lain mengembangkan standar kurikulum. Halaman tidak
menautkan atau menamai dokumen kurikulum acuan. Halaman juga memuat banyak
tautan tidak relevan (judi), sehingga situs diduga bermasalah; penyusun tidak
mengikuti tautan apa pun dari situs itu. Akibatnya **tidak ada** rujukan
kurikulum APTIKOM pada draf; pemilik diminta memberi tautan dokumen resmi
bila diinginkan (pertanyaan terbuka).

## 7. Kampus Merdeka / MBKM (S12 dan S1)

Artikel berita (S12; sumber sekunder) mengutip Dirjen Dikti pada 29 April 2025:
gerakan #KampusBerdampak "sekaligus mempertegas keberlanjutan program Merdeka
Belajar Kampus Merdeka (MBKM)." Dari S1, dasar hukum belajar di luar program
studi tetap ada (Pasal 16 ayat (4); Pasal 18 ayat (4) sampai (7): perguruan
tinggi "wajib memfasilitasi" pemenuhan beban belajar di luar program studi,
dengan pengecualian kedokteran, kebidanan, dan keperawatan). Nama program,
skema, dan pedoman teknis MBKM terkini tidak dibuka `[belum terverifikasi]`.

## 8. Batasan riset

1. Tidak ada rumusan CPL nasional untuk coding; draf tidak mengklaim pemetaan
   resmi.
2. Penyusun tidak membuka JDIH resmi, pedoman Kemdiktisaintek tentang
   kurikulum, atau dokumen kerangka kualifikasi nasional.
3. CS2023 hanya terbaca sampai daftar KA.
4. Aturan ICPC yang dibuka bersifat regional (Eropa, Amerika Utara).
5. Pelatihan, harga, dan lisensi alat (bagian 7 silabus draf) tidak diriset
   pada tahap ini; hanya lisensi dan sifat umum yang disebut, ditandai
   `[belum terverifikasi]` bila perlu.

## Changelog

| Versi | Tanggal | Perubahan |
| --- | --- | --- |
| v0.1.0 | 2026-11-19 | Riset awal (issue #130): regulasi (Permendiktisaintek 39/2025), CS2023 (17 KA), ICPC, APTIKOM, MBKM. |
