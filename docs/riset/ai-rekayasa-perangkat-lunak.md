# Riset AI dalam Rekayasa Perangkat Lunak: Vibe Coding, AI-native Engineer, dan Pengembangan Berkelanjutan

- **Version:** v0.2.1
- **Last updated:** 2026-11-19
- **Status:** **DRAF** (riset; dokumen ini sendiri belum disetujui sebagai silabus atau korpus). Issue #139. Keputusan pemilik atas usulan U-01..U-17 dan pertanyaan Q1-Q7 dicatat pada 2026-11-19 (bagian 7.1 dan 8.1), dan usulannya sudah diterapkan di dokumen program masing-masing. Konten karangan menurut [ADR-0007](../architecture/adr/0007-authored-learning-content.md).
- **Changelog:**
  - v0.2.1 (2026-11-19): catatan status di bawah tabel bagian 6 (sinkron dokumen #124): baris SMA jalur A, B, C dan jalur D di tabel itu ditulis sebelum keputusan #139 diterapkan; isi riset, bukti, dan daftar pustaka tidak diubah.
  - v0.2.0 (2026-11-19): status penerapan tiap usulan U-01..U-17 (bagian 7.1) dan keputusan pemilik atas Q1-Q7 (bagian 8.1) dicatat sesuai keputusan pemilik pada issue #139; koreksi U-03 (minggu `A-XII2-M5..M8`, bukan minggu 6-8). Isi riset (bukti, kutipan, daftar pustaka) tidak diubah.
  - v0.1.0 (2026-11-19): draf awal. Metode dan skala bukti; istilah dan asal-usulnya (vibe coding, AI-native engineer, agentic coding, AI pair programming); bukti empiris produktivitas, mutu, keamanan, pemeliharaan, dan belajar pemula; praktik rekayasa perangkat lunak berkelanjutan dengan AI (termasuk energi dan tata kelola); kompetensi per jenjang; usulan pembaruan per program; pertanyaan terbuka; daftar pustaka dengan status verifikasi.

> **DRAF, bukan keputusan pemilik dan bukan materi resmi lembaga mana pun.**
> Dokumen ini merangkum literatur dan sumber resmi untuk dijadikan rujukan
> pembelajaran AI dalam rekayasa perangkat lunak di semua program. Ia
> **tidak mengubah** silabus, corpus, atau dokumen program mana pun; usulan
> pada bagian 7 dikerjakan terpisah setelah pemilik menyetujui (kriteria
> penerimaan issue #139). Agent tidak mengubah status ini; hanya pemilik yang
> dapat menyetujui. Dokumen ini adalah pasangan
> [`ilmu-belajar-kognitif.md`](ilmu-belajar-kognitif.md) (issue #133) dan
> memakai metode, skala bukti, dan kode verifikasi yang sama.

## 0. Cara membaca dokumen ini

| Tanda | Arti |
| --- | --- |
| `[belum terverifikasi]` | Tidak dapat dipastikan dari sumber yang dibuka penyusun pada 2026-11-19. Bukan fakta. |
| `[parafrasa]` | Isi diringkas penyusun dari abstrak atau halaman yang terbaca; bukan kutipan. |
| `[inferensi]` | Penalaran penyusun yang menghubungkan temuan riset dengan pembelajaran coding atau dengan repositori ini; **bukan temuan riset**. |
| `[A]` sampai `[E]` | Kekuatan bukti (bagian 1.2). |
| `T-A`, `T-M`, `T-W`, `T-S`, `P` | Status verifikasi rujukan (bagian 1.4). |
| `J-R`, `J-T`, `J-P`, `J-I`, `J-S`, `J-O` | Jenis sumber (bagian 1.3). |

Kutipan berbahasa Inggris dalam tanda petik ditulis persis dari abstrak atau
halaman yang terbaca; glosnya dalam bahasa Indonesia adalah parafrasa.
Bidang ini bergerak sangat cepat: sebagian besar bukti terbit sejak 2022 dan
banyak yang masih preprint. Semua angka adalah **angka pada studi dan masa
alat yang diteliti**, bukan sifat tetap "AI".

## 1. Metode

### 1.1 Memilih dan menilai sumber

1. **Utamakan sumber primer yang bersejawat:** artikel jurnal, prosiding
   konferensi bersejawat, tinjauan sistematis. Preprint dipakai bila
   topiknya belum punya studi bersejawat, selalu diberi label `P`.
2. **Tiga kelompok sumber dipisahkan tegas** (bagian 1.3): riset empiris;
   laporan industri dan survei; opini, blog, postingan, dan berita. Opini
   boleh dipakai untuk **asal istilah dan definisi yang beredar**, bukan
   sebagai bukti dampak.
3. **Dinilai per klaim, bukan per sumber.** Satu rujukan dapat kuat untuk
   satu klaim dan lemah untuk klaim lain.
4. **Tanda bahaya yang dicari:** sampel kecil (mis. 16 pengembang); tugas
   buatan (mis. membuat satu server HTTP); alat yang sudah usang pada saat
   dibaca; hasil yang hanya mengukur kecepatan tanpa mutu; pengukuran oleh
   pembuat alat sendiri; klaim yang diperluas dari populasi studi (pengembang
   berpengalaman di negara maju) ke siswa Indonesia.
5. **Temuan yang bertentangan dicatat, tidak disembunyikan** (bagian 4.1).
6. **Afiliasi dan konflik kepentingan.** Metadata yang dibuka (Crossref,
   arXiv) umumnya tidak memuat afiliasi penulis. Penyusun mengetahui bahwa
   sebagian studi alat tertentu ditulis oleh peneliti yang berafiliasi pada
   pembuat alat atau pada lembaga yang membuat model, tetapi itu
   `[belum terverifikasi]` dari halaman yang dibuka; pembaca perlu
   memeriksanya sendiri pada artikel.

### 1.2 Skala kekuatan bukti

Sama dengan `ilmu-belajar-kognitif.md` bagian 1.2:

| Tingkat | Jenis bukti |
| --- | --- |
| `[A]` | Meta-analisis atau tinjauan sistematis. |
| `[B]` | Eksperimen terkontrol acak di lapangan (RCT) atau tinjauan naratif terstruktur oleh pakar yang menilai banyak studi. |
| `[C]` | Eksperimen laboratorium, studi pengguna, atau kuasi-eksperimen. |
| `[D]` | Studi korelasional, survei, studi observasi atas repositori, atau kajian konseptual. |
| `[E]` | Opini, laporan berita, pernyataan publik, preprint tanpa tinjauan sejawat. |

**Aturan untuk preprint.** Preprint ber-`[E]` menurut skala. Agar pembaca tidak
mengira desain studinya lemah, desainnya ditulis dalam kurung, mis.
`[E] (desain RCT)`. Tingkat tinggi **tidak otomatis berlaku untuk konteks
kita**: bagian "batas" tiap temuan menjelaskan jaraknya.

### 1.3 Jenis sumber

| Kode | Jenis | Dipakai untuk |
| --- | --- | --- |
| `J-R` | Riset empiris bersejawat (jurnal, prosiding) | Bukti dampak. |
| `J-T` | Tinjauan, laporan kelompok kerja, atau makalah posisi bersejawat | Peta masalah; bukan bukti dampak. |
| `J-P` | Preprint (arXiv) tanpa keterangan tinjauan sejawat pada halaman yang dibuka | Bukti awal; dilabel `P`. |
| `J-I` | Laporan industri atau survei (termasuk laporan penyedia layanan) | Gambaran praktik dan persepsi; bukan bukti kausal. |
| `J-S` | Standar, kerangka, regulasi, atau halaman lembaga resmi | Norma dan kewajiban; bukan bukti dampak. |
| `J-O` | Opini, blog, postingan media sosial, berita | Asal istilah dan definisi beredar. |

### 1.4 Verifikasi rujukan

Setiap rujukan diperiksa pada **2026-11-19** sebelum dicantumkan. Jalur
verifikasi yang benar-benar dipakai:

| Jalur | Dipakai untuk |
| --- | --- |
| API REST Crossref (`api.crossref.org/works/<DOI>`) | Semua rujukan ber-DOI: judul, penulis, tahun, jurnal atau prosiding, volume, halaman. Daftar pustaka disalin dari sini. |
| OpenAlex (`api.openalex.org/works/doi:<DOI>`) | Abstrak rujukan ber-DOI yang tidak memuat abstrak di Crossref. |
| API arXiv (`export.arxiv.org/api/query`) | Rujukan preprint: judul, penulis, tanggal terbit dan revisi, abstrak, dan kolom komentar atau jurnal bila ada. |
| Halaman web dibuka langsung | Standar, kerangka, laporan lembaga, survei, blog, berita. Isi dibaca lewat perangkat pembaca halaman; kutipan singkat disalin sebagaimana dikembalikan perangkat. |
| Berkas PDF disimpan perangkat pembaca halaman ke direktori hasil alat, lalu dibaca (baca saja) dengan `pdftotext` | Laporan Kantor Hak Cipta AS Bagian 2 (halaman ringkas tidak memuat kesimpulan). |

**Keterbatasan yang harus diketahui pembaca:** teks lengkap artikel **tidak**
dibaca untuk rujukan mana pun; yang dibaca adalah abstrak dan metadata.
Klaim tentang isi dibatasi pada abstrak; klaim di luar itu ditandai
`[inferensi]`. Halaman ISO, Merriam-Webster, The New Stack, dan
postingan X asli menjawab HTTP 403 atau 402 sehingga **tidak terbuka**; yang
tidak terbuka tidak dikutip sebagai rujukan, atau (postingan asal
istilah) dikutip lewat sumber sekunder yang dibuka dan ditandai jelas.

| Kode | Arti |
| --- | --- |
| `T-A` | Metadata cocok (Crossref) **dan** abstrak substantif dibaca. Klaim dibatasi pada abstrak. |
| `T-M` | Metadata cocok (Crossref), abstrak hanya satu kalimat ringkasan atau tidak terbaca. Tidak ada klaim temuan selain yang dinyatakan judul dan ringkasan itu. |
| `T-W` | Halaman web dibuka dan dibaca (bagian yang dikutip). |
| `T-S` | Isi dikutip **lewat sumber sekunder** yang dibuka; sumber primer tidak terbuka. |
| `P` | Preprint; metadata dan abstrak arXiv dibaca; tidak ada keterangan tinjauan sejawat pada halaman yang dibuka. Bila kolom komentar arXiv menyebut penerimaan di sebuah venue, hal itu dicatat tetapi **tidak diverifikasi ke prosidingnya**. |

Jumlah rujukan per status ada di bagian 9.6.

## 2. Ringkasan untuk pembaca yang tergesa

| Topik | Kekuatan bukti | Kesimpulan satu kalimat | Bagian |
| --- | --- | --- | --- |
| Istilah "vibe coding" | `[E]` (asal istilah dari postingan; sumber primer tidak terbuka) | Dicetuskan Andrej Karpathy pada 2 Februari 2025 untuk gaya yang "melupakan bahwa kodenya ada"; kini dipakai longgar dan oleh Collins didefinisikan jauh lebih luas. | 3.1 |
| "AI-native engineer" | `[E]` | Tidak ada definisi baku; ada makalah visi (SE 3.0) dan esai blog yang memakainya untuk hal berbeda. | 3.2 |
| Produktivitas | `[B]` lapangan; `[C]`; `[E] (desain RCT)` | **Bertentangan**: dari 26% lebih banyak tugas selesai (lapangan, 4.867 pengembang) sampai 19% lebih lambat (16 pengembang ahli di proyek matang). Bergantung tugas, pengalaman, dan alat. | 4.1 |
| Mutu fungsional dan keterulangan | `[E] (desain eksperimen)` untuk uji tipis; `J-R` untuk non-determinisme; tidak ada tinjauan sistematis `[A]` | Uji bawaan benchmark meloloskan kode salah; keluaran untuk perintah sama berbeda-beda. | 4.2 |
| Keamanan kode hasil AI | `[C]`, `[D]`, `[E]` | Konsisten menunjukkan risiko (sekitar 40% program rentan pada skenario berisiko; pengguna lebih yakin padahal kurang aman), tetapi satu studi pengguna menemukan dampak kecil; alat berubah cepat. | 4.3 |
| Pemeliharaan jangka panjang | `[D]` | Satu studi kuasi-eksperimen atas repositori: kecepatan naik sementara, kompleksitas dan peringatan analisis statis naik menetap. Bukti jangka panjang sangat sedikit. | 4.4 |
| Dampak pada belajar pemula | `[B]` (matematika), `[C]`, `[E] (desain RCT)` | Akses tanpa pagar pengaman meningkatkan kinerja saat dipakai tetapi dapat menurunkan belajar; pola pemakaian yang melibatkan berpikir menjaga belajar. | 4.5 |
| Praktik berkelanjutan | campuran; banyak `[inferensi]` | Pengujian, tinjauan manusia, spesifikasi, kontrol versi, kewaspadaan rantai pasok, pencatatan keluaran. Dukungan langsung tiap praktik pada kode hasil AI masih tipis. | 5 |
| Energi dan biaya komputasi | `[C]`/`[D]`/`[E]`; angka tidak pasti | Per-permintaan kecil tetapi bervariasi puluhan kali lipat antarmodel; total pusat data tumbuh cepat; tidak ada angka terverifikasi per tugas pemrograman. | 5.6 |
| Tata kelola | `[S]` | Kerangka resmi ada (NIST SSDF, NIST AI RMF, SLSA, OWASP, SE Menkominfo 9/2023) tetapi bersifat sukarela atau panduan; ISO/IEC 42001 tidak terverifikasi. | 5.7 |

## 3. Istilah dan asal-usulnya

### 3.1 "Vibe coding"

**Asal istilah (sumber sekunder).** Postingan primer di X tidak terbuka
(HTTP 402) `[belum terverifikasi]` sebagai halaman primer. Kutipan teks
postingan diambil dari pesan di milis American Dialect Society (ADS-L) yang
dikirim Garson O'Toole pada 3 Maret 2025 dan menyebut postingan
@karpathy "6:17 PM, Feb 2, 2025" (`T-S`, `J-O`):

> "There's a new kind of coding I call "vibe coding", where you fully give in to the vibes, embrace exponentials, and forget that the code even exists." ... "I just see stuff, say stuff, run stuff, and copy paste stuff, and it mostly works."

Dengan demikian pencetusnya adalah **Andrej Karpathy** (pada berita CNN yang
dibuka: "formerly director of AI at Tesla and a founding engineer at
OpenAI"), **2 Februari 2025**, dan rumusan asalnya menggambarkan gaya
**menerima keluaran tanpa menelaah kodenya**.

**Pergeseran makna.** Simon Willison (blog, 19 Maret 2025, `J-O`) menyatakan
bahwa menulis kode dengan bantuan LLM **bukan** vibe coding bila pengembang
meninjau, menguji, dan dapat menjelaskan kodenya; ia memakai istilah itu untuk
"building software with an LLM without reviewing the code it writes"
`[parafrasa]` dan menyebut ia tidak mengomit kode yang tidak dapat ia jelaskan.
Collins Dictionary menjadikan "vibe coding" Kata Tahun 2025 dan menurut berita
CNN (6 November 2025) mendefinisikannya sebagai "the use of artificial
intelligence prompted by natural language to assist with the writing of
computer code" (`T-W`, `J-O`): definisi kamus ini **lebih luas** daripada
rumusan asal dan tidak memuat unsur "tanpa menelaah kode".

**Literatur ilmiah.**
- Sarkar dan Drosos (2025, `P`, `[E] (desain kualitatif)`): studi empiris
  pertama atas vibe coding, 8 jam lebih video sesi dengan think-aloud.
  Abstrak: vibe coding "does not eliminate the need for programming
  expertise but rather redistributes it toward context management, rapid code
  evaluation, and decisions about when to transition between AI-driven and
  manual manipulation of code"; kepercayaan "developed through iterative
  verification rather than blanket acceptance". Catatan arXiv menyebut makalah
  ini di prosiding PPIG 2025 (tidak diverifikasi ke prosiding). Perhatikan:
  yang diamati adalah praktisi yang **tetap** mengevaluasi, yaitu lebih dekat
  ke definisi Willison untuk "bukan vibe coding" daripada rumusan asal.
- Ge dkk. (2025, `P`): tinjauan atas lebih dari 1.000 makalah yang memakai
  rumusan "developers validate AI-generated implementations through outcome
  observation rather than line-by-line code comprehension"; mencatat
  "unexpected productivity losses" dan menyimpulkan bahwa keberhasilan
  bergantung pada "systematic context engineering, well-established
  development environments, and human-agent collaborative development
  models". Taksonomi lima model (otomasi tanpa batas, kolaborasi percakapan
  iteratif, berbasis perencanaan, berbasis uji, diperkaya konteks).

**Penilaian.** `[inferensi]` Satu istilah dipakai untuk tiga hal berbeda:
(a) rumusan asal (menerima tanpa menelaah), (b) definisi kamus (apa pun
pemrograman dengan perintah bahasa alami), dan (c) praktik nyata yang tetap
mengevaluasi. Dokumen kurikulum perlu memilih salah satu secara eksplisit
(bagian 3.5).

### 3.2 "AI-native engineer" dan "AI-native software engineering"

Tidak ditemukan definisi baku; dua pemakaian berbeda yang dibuka:

| Pemakaian | Sumber | Isi (`[parafrasa]` kecuali dikutip) | Jenis |
| --- | --- | --- | --- |
| **AI-native software engineering (SE 3.0)**: paradigma rekayasa | Hassan dkk. (2024; arXiv 2410.06107, submit 8 Oktober 2024, revisi 9 Januari 2026; halaman tidak mencantumkan venue) | SE 2.0 (pengembangan berbantuan AI) meningkatkan produktivitas tetapi menimbulkan beban kognitif dan inefisiensi; SE 3.0 berpusat pada kolaborasi berbasis maksud (*intent*) dan percakapan antara pengembang dan "rekan tim AI"; tumpukan teknologi usulan `Teammate.next`, `IDE.next`, `Compiler.next`, `Runtime.next`; plus peta jalan tantangan. Ini **makalah visi dan agenda riset**, bukan evaluasi empiris `[parafrasa dari abstrak]`. | `J-P`, `[E]` |
| **Agentic Software Engineering**: lanjutan visi | Hassan dkk. (2025; arXiv 2509.06216, v4 2 November 2026) | Agen tidak sekadar membuat kode tetapi mengejar tujuan rekayasa; dualitas "SE untuk manusia" dan "SE untuk agen"; dua lingkungan kerja usulan (ACE dan AEE); menyatakan sendiri tujuannya bukan solusi definitif melainkan "conceptual scaffold ... to catalyze a community-wide dialogue". | `J-P`, `[E]` |
| **AI-native software engineer**: profil individu | Osmani, esai blog "The AI-Native Software Engineer", 1 Juli 2025 | "An AI-native software engineer is one who deeply integrates AI into their daily workflow" (kutipan lewat perangkat pembaca). Praktik yang diuraikan: mulai dari AI, tulis perintah yang jelas, **verifikasi semuanya** (uji keluaran, tinjau seperti kode pengembang junior, waspadai halusinasi), naik bertahap ke mode agen, tetap pegang lingkup, jaga data sensitif, "take ownership of the code". Halaman terbaca sebagian (100.000 dari 108.659 karakter). | `J-O` |

**Kritik dan keterbatasan.**
- Pencarian web menampilkan banyak halaman (blog vendor, perekrutan) yang
  memakai istilah ini dengan arti berbeda; **tidak dibuka** dan tidak
  dikutip `[belum terverifikasi]`. Yang dapat dikatakan: istilah ini
  **bukan istilah teknis baku** dan lebih sering muncul pada konten
  pemasaran dan perekrutan `[inferensi dari hasil pencarian, tidak dibuka]`.
- Hassan dkk. sendiri menyebut beban kognitif sebagai masalah SE 2.0; bukti
  empiris di bagian 4 menunjukkan bahwa kemampuan **mengawasi** AI membutuhkan
  keterampilan yang dibentuk lebih dulu (Shen dan Tamkin, 2026, `P`).
  Konsekuensi `[inferensi]`: label "native" yang menyiratkan tidak perlu
  fondasi pra-AI tidak didukung bukti yang dibuka; arah yang didukung bukti
  adalah fondasi yang kuat **lalu** pemakaian AI yang diawasi.
- Kedua makalah SE 3.0 adalah visi; belum ada evaluasi bahwa paradigma itu
  menghasilkan perangkat lunak lebih baik `[parafrasa dari abstrak]`.

### 3.3 *Agentic coding* dan agen kode

Sapkota dkk. (2025, `P`, tinjauan, 35 halaman) membedakan: vibe coding
menekankan interaksi intuitif dengan manusia di dalam lingkar (*human-in-the-loop*)
lewat percakapan perintah; **agentic coding** memungkinkan pengembangan
otonom oleh agen berorientasi tujuan yang "planning, executing, testing, and
iterating tasks with minimal human intervention". Mereka menyimpulkan
`[parafrasa]` keberhasilan rekayasa AI akan datang dari menyelaraskan
keduanya dalam siklus hidup berpusat manusia. Contoh tolok ukur agen:
SWE-bench (Jimenez dkk., 2023; arXiv; catatan arXiv menyebut ICLR 2024),
2.294 masalah dari isu GitHub nyata pada 12 repositori Python, di mana model
harus mengedit basis kode untuk menyelesaikan isu. Hassan dkk. (2025)
menyebut keluaran agen yang diserahkan ke manusia sebagai "Merge-Readiness
Packs"; `[inferensi]` ini mencerminkan pandangan bahwa manusia tetap
pengambil keputusan akhir.
`[inferensi]` Kata kunci pembeda adalah **otonomi dan batas kewenangan agen**
(bagian 5.7: OWASP LLM06 *Excessive Agency*).

### 3.4 *AI pair programming*

Istilah "AI pair programmer" dipakai pembuat alat pelengkap kode untuk
produknya; Pearce dkk. (2022) menyebut GitHub Copilot sebagai "first
self-described 'AI pair programmer'" dan Peng dkk. (2023) memakai istilah
itu langsung. Pemrograman berpasangan manusia (Hanks dkk., 2011, dirujuk
`ilmu-belajar-kognitif.md` bagian 8) melibatkan **dua orang yang saling
menjelaskan dan mengoreksi**; `[inferensi]` pada asisten AI peran
"navigator yang mempertanyakan" tidak otomatis ada, sehingga bukti manfaat
pemrograman berpasangan manusia **tidak** otomatis berlaku untuk asisten
AI. Bukti Vaithilingam dkk. (2022) bahwa pengguna kesulitan memahami dan
men-debug keluaran asisten (bagian 4.1) mendukung kehati-hatian ini.

### 3.5 Definisi yang dipakai repositori ini (usulan, menunggu keputusan pemilik)

| Istilah di repositori | Definisi kerja `[inferensi]` | Status dalam kurikulum |
| --- | --- | --- |
| **Pemrograman berbantuan AI** | Pembelajar memakai asisten AI, **membaca, menguji, memahami, dan bertanggung jawab** atas setiap baris yang dipakai; padanan "bukan vibe coding" menurut Willison dan "verifikasi semuanya" menurut Osmani. | Kompetensi sasaran untuk jenjang yang memakai alat AI (bagian 6). |
| **Vibe coding** | Rumusan asal: menerima keluaran AI tanpa menelaah kodenya. Dalam kurikulum hanya dibahas sebagai **istilah dan risiko**, serta boleh untuk prototipe sekali pakai yang tidak dirilis atau dipelihara; **bukan praktik rekayasa yang diajarkan** dan bukan kompetensi. | Glosarium; tidak menjadi tujuan belajar. |
| **AI-native engineer / SE** | Istilah tidak baku (bagian 3.2). Dijelaskan sebagai istilah yang beredar; **tidak dipakai sebagai label profil lulusan atau capaian**. Padanan kompetensi yang didukung bukti: pemrograman berbantuan AI di atas fondasi yang kuat. | Glosarium; keputusan pemilik (Q1, bagian 8). |
| **Agentic coding / agen kode** | Agen yang merencanakan, menjalankan, dan menguji dengan intervensi manusia minimal. Hanya sebagai topik pengenalan jenjang kuliah jalur I dan dewasa jalur PRO, **dengan batas kewenangan dan tinjauan manusia**; tidak untuk TK sampai SMA. | Pengenalan terbatas. |
| **AI pair programming** | Pemakaian asisten AI di editor; **tidak disamakan** dengan pemrograman berpasangan manusia. | Glosarium. |

## 4. Bukti empiris dampak alat AI

### 4.1 Produktivitas

| Studi | Desain dan hasil terbaca | Tingkat dan batas |
| --- | --- | --- |
| Peng dkk. (2023) | Percobaan terkontrol: pengembang diminta mengimplementasi server HTTP di JavaScript secepat mungkin; kelompok dengan asisten selesai **55,8% lebih cepat**; efek heterogen. | `[E] (desain eksperimen terkontrol)`, `P`. Satu tugas buatan, proyek baru, alat era 2022-2023. |
| Vaithilingam dkk. (2022) | Studi pengguna dalam-subjek, 24 peserta: asisten "did not necessarily improve the task completion time or success rate"; mayoritas tetap menyukainya; peserta sulit memahami, mengedit, dan men-debug potongan yang dihasilkan. | `[C]`. Sampel kecil; alat awal. |
| Ziegler dkk. (2022) | Studi kasus pengguna Copilot: laju penerimaan saran, bukan metrik ketahanan kode, yang mendorong **persepsi** produktivitas. | `[D]`. Persepsi, bukan pengukuran independen; studi atas produk pembuatnya (afiliasi `[belum terverifikasi]`). |
| Cui dkk. (2026) | Tiga RCT lapangan (Microsoft, Accenture, satu perusahaan Fortune 100), 4.867 pengembang: gabungan **26,08%** (galat baku 10,3%) lebih banyak tugas selesai; hasil "noisy" dan bervariasi antar eksperimen; pengembang kurang berpengalaman lebih banyak mengadopsi dan lebih besar manfaatnya. | `[B]`. Alat berupa pelengkap kode; ukuran = tugas selesai, bukan mutu atau pemeliharaan. |
| Becker dkk. (2025) (METR) | RCT, 16 pengembang sumber terbuka berpengalaman rata-rata 5 tahun di proyek matang, 246 tugas; alat awal 2025: AI **menambah waktu penyelesaian 19%**, padahal pengembang memperkirakan sebelumnya mengurangi 24% dan sesudahnya merasa mengurangi 20%. Pengaruh artefak eksperimen "cannot be entirely ruled out". | `[E] (desain RCT)`, `P`. Sampel sangat kecil; satu konteks. |
| Stack Overflow (2025) | Survei: 84% responden memakai atau berencana memakai alat AI (n = 33.662); 66% mengeluh solusi "almost right, but not quite"; 45,2% menyebut debugging kode hasil AI lebih lama; kepercayaan pada akurasi sekitar 33%, ketidakpercayaan sekitar 46%. | `[D]`, `J-I`. Sampel swapilih; persepsi. |
| DORA (2025) | Laporan industri; halaman yang dibuka hanya menyatakan peran AI sebagai "amplifier, magnifying an organization's existing strengths and weaknesses"; tanpa angka dan tanpa metodologi pada halaman. | `[D]`/`[E]`, `J-I`. Tidak ada klaim angka dikutip. |

**Cara membaca pertentangan.** `[inferensi]` Perbedaan arah (+26% tugas selesai,
+55,8% lebih cepat, namun -19% pada METR) konsisten dengan perbedaan
(a) tugas: proyek baru berukuran kecil versus proyek matang dengan standar mutu
tinggi; (b) pengalaman: pemula diuntungkan lebih (Cui dkk.), ahli di
repositori yang dikenalnya sendiri tidak; (c) generasi alat; (d) ukuran hasil:
waktu, jumlah tugas, atau mutu. METR menguji 20 kemungkinan penyebab
(abstrak) dan menyimpulkan efek lambat tidak tampak berasal dari desain
studi. Hal yang paling kokoh adalah **jarak antara persepsi dan pengukuran**:
pengembang pada METR merasa lebih cepat padahal lebih lambat, dan pengguna
pada Perry dkk. (bagian 4.3) lebih yakin padahal kurang aman.

**Kekuatan bukti keseluruhan:** `[B]` untuk efek rata-rata positif pada
pelengkap kode di perusahaan besar; `[E] (desain RCT)` untuk efek negatif pada
ahli; **tidak ada** kesimpulan yang berlaku umum. Bukti dari Indonesia dan dari
pembelajar sekolah tidak ditemukan `[belum terverifikasi]`.

### 4.2 Mutu fungsional dan keterulangan

- Liu dkk. (2023, `P`, catatan arXiv: tanpa venue): EvalPlus memperbesar
  uji HumanEval 80 kali; pada 26 LLM, uji tambahan menangkap kode salah yang
  tak terdeteksi dan menurunkan pass@k "by up-to 19.3-28.9%", serta mengubah
  peringkat model. `[E] (desain eksperimen)`. Pesan untuk pengajaran
  `[inferensi]`: **uji yang tipis meloloskan kode yang salah**; menulis uji
  yang kuat adalah keterampilan inti ketika kode dibuat mesin.
- Ouyang dkk. (2025, `J-R`, TOSEM, `T-A`): pada 829 soal dari tiga benchmark,
  ChatGPT pada pengaturan bawaan menunjukkan non-determinisme tinggi: rasio
  tugas dengan nol keluaran uji yang sama antar permintaan 75,76%, 51,00%, dan
  47,56% pada CodeContests, APPS, dan HumanEval; menurut abstrak, suhu 0 "does
  not guarantee determinism" (kalimat abstrak terpotong pada tampilan yang
  dibaca; hanya bagian yang terbaca dikutip). Batas: satu model pada saat
  studi. Implikasi `[inferensi]`: perintah yang sama tidak menjamin kode yang
  sama; **kode adalah artefak yang harus disimpan dan diuji, bukan perintahnya**
  (bagian 5.5).

### 4.3 Keamanan kode hasil AI

| Studi | Temuan terbaca | Tingkat dan batas |
| --- | --- | --- |
| Pearce dkk. (2022) | 89 skenario berisiko (daftar CWE Top 25), 1.689 program dari Copilot: "approximately 40% to be vulnerable". | `[C]`. Model dan versi 2021; skenario sengaja berisiko. |
| Perry dkk. (2023) | Studi pengguna: peserta dengan asisten "wrote significantly less secure code" dan "more likely to believe they wrote secure code". | `[C]`. Tugas terkait keamanan; peserta bukan pengembang industri umum. |
| Sandoval dkk. (2022) | Studi pengguna N = 58 mahasiswa, C tingkat rendah (daftar tertaut): pengguna dengan asisten menghasilkan bug kritis "at a rate no greater than 10% more than the control". **Berlawanan** arah dengan Perry dkk. | `[E] (desain studi pengguna)`; catatan arXiv: USENIX Security 2023 (tidak diverifikasi). Satu tugas. |
| Fu dkk. (2025) | Analisis 733 potongan kode hasil Copilot, CodeWhisperer, Codeium di proyek GitHub: kelemahan keamanan pada 29,5% potongan Python dan 24,2% JavaScript, 43 kategori CWE; hingga 55,5% isu dapat diperbaiki asisten bila diberi peringatan analis statis. | `[D]` (observasional), `J-R`, TOSEM. Deteksi lewat alat analisis statis; bukan semua kelemahan eksploitabel `[inferensi]`. |
| Shukla dkk. (2025) | 400 sampel kode, 40 putaran "perbaikan" dengan empat strategi perintah: "37.6% increase in critical vulnerabilities after just five iterations". | `[E] (desain eksperimen)`, `P`. |
| Spracklen dkk. (2024) | 576.000 sampel kode, 16 LLM: rata-rata paket "halusinasi" (tidak ada) "at least 5.2% for commercial models and 21.7% for open-source models"; 205.474 nama unik; ancaman rantai pasok. | `[E] (desain eksperimen)`, `P`; catatan arXiv: USENIX Security 2025 (tidak diverifikasi). |

**Kekuatan bukti keseluruhan:** `[C]`/`[D]` konsisten menunjukkan risiko,
disertai **satu temuan yang berlawanan**. Hanya Perry dkk. melaporkan
efek **keyakinan berlebih**, yang paling relevan untuk pengajaran.
Laporan keamanan penyedia (mis. dari vendor keamanan) tidak dibuka dan tidak
dipakai `[belum terverifikasi]`.

### 4.4 Pemeliharaan dan *technical debt*

- He dkk. (2026, MSR '26, `J-R`, `T-A` dari abstrak arXiv): kuasi-eksperimen
  *difference-in-differences* pada proyek GitHub pengadopsi Cursor versus
  kontrol yang dicocokkan: adopsi menghasilkan "statistically significant,
  large, but transient increase in project-level development velocity",
  disertai "substantial and persistent increase in static analysis warnings
  and code complexity"; peningkatan itu menjadi faktor utama perlambatan
  kecepatan jangka panjang; penjaminan mutu menjadi hambatan utama. `[D]`.
  Batas: pengadopsi awal, proyek sumber terbuka, satu alat, penanda mutu
  berupa analisis statis (bukan cacat nyata).
- Fu dkk. (2025) menunjukkan kelemahan keamanan **masuk ke repositori nyata**
  (bagian 4.3), bukan hanya di laboratorium.
- Bukti jangka panjang (di atas dua tahun) dan di industri tidak ditemukan
  `[belum terverifikasi]`; laporan industri yang dibuka (DORA 2025) tidak memuat
  angka pada halaman. Klaim populer tentang "kode hasil AI cepat usang" tidak
  dipakai karena sumber yang dibuka tidak ada.

### 4.5 Dampak pada belajar pemula

Bagian ini **selaras dengan** `ilmu-belajar-kognitif.md` bagian 3.4 (contoh
terselesaikan dan efek keahlian terbalik), 3.5 (bimbingan), 3.9 (kinerja saat
latihan bukan ukuran belajar), 4.4 dan 6.6 (preprint Kosmyna dkk., AI generatif
dalam belajar pemrograman).

| Studi | Temuan terbaca | Tingkat dan batas |
| --- | --- | --- |
| Kazemitabaar dkk. (2023) | 69 pemula usia 10 sampai 17, 45 tugas Python: akses Codex meningkatkan kinerja menulis kode (1,15 kali laju selesai, skor 1,8 kali) tanpa menurunkan tugas modifikasi manual; tes satu minggu "slightly better" tetapi tidak signifikan; pemula dengan skor pra-tes lebih tinggi lebih diuntungkan. | `[C]`. Satu minggu; alat Codex; lingkungan terkelola. |
| Prather dkk. (2024) | 21 sesi lab: "unfortunate divide": siswa yang tidak kesulitan memakai AI untuk mempercepat; siswa yang kesulitan makin terhambat metakognisi (ilusi kompetensi, bagian 3.9 riset ilmu belajar). | `[C]` kualitatif, sampel kecil. |
| Lehmann dkk. (2024) | Dua eksperimen lab pra-terdaftar: tidak ada efek keseluruhan; **bergantung pola pemakaian**: siswa yang "substitute" (mis. membuat solusi latihan lewat LLM) menambah cakupan topik tetapi menurunkan pemahaman tiap topik; yang "complement" (mis. meminta penjelasan) tidak menambah cakupan tetapi menambah pemahaman; kesenjangan antara pengetahuan awal rendah dan tinggi melebar. | `[E] (desain eksperimen pra-terdaftar)`, `P`. Domain bukan pemrograman `[inferensi]`: abstrak tidak menyebut pemrograman. |
| Bastani dkk. (2025) | Eksperimen lapangan hampir seribu siswa SMA, **matematika**: akses GPT-4 meningkatkan nilai latihan (48% GPT Base, 127% GPT Tutor), tetapi setelah akses dicabut "GPT Base" turun 17% dibanding yang tidak pernah punya akses; pagar pengaman "GPT Tutor" "largely mitigated" dampak negatif; siswa memakai AI sebagai "crutch". | `[B]`. Matematika; ekstrapolasi ke coding `[inferensi]`. |
| Shen dan Tamkin (2026) | Eksperimen acak: pengembang mempelajari pustaka asinkron baru dengan dan tanpa AI; AI "impairs conceptual understanding, code reading, and debugging abilities, without delivering significant efficiency gains on average"; yang mendelegasikan penuh kadang lebih cepat "at the cost of learning"; enam pola interaksi, **tiga di antaranya melibatkan keterlibatan kognitif dan menjaga hasil belajar**. | `[E] (desain RCT)`, `P`. Pengembang dewasa belajar satu pustaka; afiliasi `[belum terverifikasi]`. |
| Finnie-Ansley dkk. (2022) | Codex mengerjakan soal ujian pemrograman pengantar dan "outscores most students". | `[C]`. Soal ujian era 2021; relevan untuk keabsahan **asesmen**, bukan belajar. |
| Lee dkk. (2025) | Survei 319 pekerja pengetahuan: keyakinan lebih tinggi pada AI berkaitan dengan **lebih sedikit** berpikir kritis; keyakinan diri berkaitan dengan lebih banyak; AI menggeser berpikir kritis ke verifikasi, integrasi, dan pengelolaan tugas. | `[D]`. Swalaporan; bukan pelajar. |
| Gerlich (2025) | Survei dan wawancara 666 peserta: korelasi negatif signifikan antara pemakaian AI sering dan kemampuan berpikir kritis, dimediasi *cognitive offloading*; peserta muda lebih bergantung. | `[D]` korelasional; arah sebab-akibat tidak dapat disimpulkan `[inferensi]`. |
| Kosmyna dkk. (2025) | Esai, bukan pemrograman, 54 peserta (per `ilmu-belajar-kognitif.md`). | `[E]`, `P`. Dicantumkan karena sering dikutip; **tidak dipakai** untuk klaim coding. |
| Becker dkk. (2023); Prather dkk. (2023); Denny dkk. (2024) | Makalah posisi dan laporan kelompok kerja: peluang dan tantangan AI generatif bagi pendidikan komputasi; sintesis 71 artikel primer (Prather dkk., 2023). | `J-T`, `[D]`. Peta masalah, bukan bukti dampak. |

**Kesimpulan yang didukung** (selaras `ilmu-belajar-kognitif.md` 6.6):
1. AI membantu **kinerja saat dipakai**; bukti belajar jangka panjang
   campuran dan, tanpa pagar pengaman, cenderung negatif pada materi yang
   sedang dipelajari (Bastani; Shen dan Tamkin; Lehmann).
2. Yang menentukan adalah **pola pemakaian**: meminta penjelasan atau
   petunjuk bertahap dan tetap mengerjakan sendiri melindungi belajar;
   menyerahkan pekerjaan penuh tidak (Lehmann; Shen dan Tamkin; pagar
   pengaman pada Bastani).
3. Pemula yang kesulitan dirugikan paling besar, pemula yang sudah
   mampu paling diuntungkan (Prather; Lehmann; Kazemitabaar), jadi
   **kesenjangan melebar**.
4. `[inferensi]` Ini konsisten dengan efek keahlian terbalik dan nilai contoh
   terselesaikan bagi pemula (riset ilmu belajar 3.4): AI yang memberi jawaban
   utuh berperan seperti contoh terselesaikan yang tidak pernah dipudarkan
   (*faded*), sehingga pembelajar tidak membangun skema sendiri. Hubungan ini
   adalah hipotesis penyusun, bukan temuan yang dibuka.

**Batas.** Tidak ada studi dari Indonesia, tidak ada studi pada anak di bawah 10
tahun, dan hampir semua studi berdurasi paling lama beberapa minggu.

### 4.6 Ringkasan lintas bukti

| Pertanyaan | Apa yang dapat dikatakan | Apa yang tidak dapat dikatakan |
| --- | --- | --- |
| Apakah AI mempercepat pemrograman? | Kadang, terutama pada tugas baru, kecil, dan pelaku kurang berpengalaman. | Bahwa ia selalu mempercepat; bahwa ia mempercepat ahli pada kode matang. |
| Apakah kode hasil AI benar? | Bisa salah dan lolos uji yang tipis; berbeda tiap permintaan. | Persentase kebenaran umum (bergantung model, tugas, dan uji). |
| Apakah aman? | Risiko kerentanan dan paket fiktif terdokumentasi; pengguna bisa terlalu yakin. | Bahwa AI "selalu menghasilkan kode tidak aman" (ada temuan berlawanan). |
| Apakah berkelanjutan? | Satu studi: kompleksitas menetap meski kecepatan transien. | Dampak lima tahun, atau di industri. |
| Apakah baik untuk pemula? | Dengan pagar pengaman dan pola yang melibatkan berpikir, tidak merugikan dan dapat membantu. | Bahwa akses bebas aman untuk belajar. |

## 5. Rekayasa perangkat lunak berkelanjutan dengan AI

"Berkelanjutan" dipakai dalam dua arti: **(a) keberlanjutan perangkat
lunak** (maintainability, keamanan, keterulangan dalam jangka panjang) dan
**(b) keberlanjutan sumber daya** (energi dan biaya komputasi). Bagian ini
menilai praktik menurut dukungan bukti yang benar-benar dibuka, dan
menandai sisanya `[inferensi]`.

### 5.1 Praktik dan dukungan bukti

| Praktik | Dukungan yang dibuka | Kekuatan bukti | Batas |
| --- | --- | --- | --- |
| **Pengujian otomatis yang kuat** | EvalPlus (uji tipis meloloskan kode salah); Vaithilingam (pengguna sulit men-debug keluaran); He dkk. (penjaminan mutu jadi hambatan); halaman NIST SSDF (praktik pengembangan aman dimasukkan ke siklus hidup apa pun). | `[E]`/`[C]`/`[D]` | Tidak ada studi yang dibuka yang mengukur seberapa jauh uji menangkap cacat khusus kode hasil AI di industri. |
| **Tinjauan kode oleh manusia** | Bacchelli dan Bird (2013): tinjauan modern tidak hanya mencari cacat, tetapi juga pemindahan pengetahuan dan kesadaran tim; "code and change understanding is the key aspect". Perry dkk.: pengguna AI lebih yakin padahal kurang aman. Goddard dkk. (2012, tinjauan sistematis 74 studi, konteks kesehatan): bias otomasi dan kelalaian memantau; pelatihan dan penekanan akuntabilitas pengguna termasuk pemitigasi. | `[D]`, `[C]`, `[A]` (konteks kesehatan) | Studi tinjauan kode tidak khusus kode AI; Goddard di sistem pendukung keputusan klinis. Penerapan ke kode `[inferensi]`. |
| **Spesifikasi dan konteks yang jelas** | Sarkar dan Drosos: perintah memadukan arahan kabur dan spesifikasi teknis; keahlian bergeser ke manajemen konteks. Ge dkk.: keberhasilan bergantung pada "systematic context engineering". Osmani: perintah dengan konteks, perilaku yang diinginkan, dan format keluaran. | `[E]`/`[E]`/`J-O` | Tidak ada eksperimen yang dibuka yang menguji bahwa spesifikasi tertulis memperbaiki mutu kode AI. |
| **Dokumentasi** | Bagian dari praktik SSDF dan tinjauan; Sarkar dan Drosos (konteks). | `[inferensi]` | Dukungan langsung tidak dibuka. |
| **Kontrol versi dan riwayat** | Tidak ada bukti eksperimental yang dibuka. Alasan praktik: keluaran AI berbeda tiap permintaan (Ouyang), sehingga yang harus diversi adalah **kode dan catatan asalnya**. Draf kuliah memakai riwayat Git sebagai bukti proses (`kuliah-coding/silabus-draf.md` bagian 6.1 dan 6.2). | `[inferensi]` | Praktik standar; bukan temuan. |
| **Keamanan rantai pasok** | Spracklen dkk.: paket fiktif 5,2% (komersial) sampai 21,7% (terbuka); halaman SLSA (pedoman bertingkat, track Build, dikelola kolaborasi industri di bawah Linux Foundation, v1.0 retired, v1.2 terkini); OWASP Top 10 LLM 2025: LLM03 *Supply Chain*, LLM05 *Improper Output Handling*, LLM06 *Excessive Agency*. | `[E]`, `J-S` | OWASP dan SLSA adalah panduan, bukan bukti dampak. |
| **Privasi data dalam perintah** | OWASP LLM02:2025 *Sensitive Information Disclosure*; SE Menkominfo 9/2023 (nilai "pelindungan data pribadi"); aturan repo (ADR-0004; silabus sma-coding jalur D: tanpa data pribadi pada permintaan); draf dewasa `DW-FND-M1`. | `J-S` | Bukan bukti dampak. |
| **Keterulangan (*reproducibility*)** | Ouyang dkk. (2025). Praktik: catat alat, versi model, perintah, dan simpan kode hasil; jangan menjadikan perintah sebagai satu-satunya sumber. | `J-R`, praktik `[inferensi]` | Satu model pada saat studi. |
| **Pembatasan kewenangan agen** | OWASP LLM06; Hassan dkk. (2025) (manusia menerima paket siap-gabung). | `J-S`, `[E]` | Visi dan panduan. |

### 5.2 Hak cipta dan lisensi kode hasil AI

- Laporan Kantor Hak Cipta AS, Bagian 2 (Januari 2025, `J-S`): hukum yang ada
  memadai; penggunaan AI sebagai alat **tidak** menghilangkan perlindungan;
  hak cipta melindungi ekspresi orisinal karya manusia walau ada bagian dari
  AI; tidak berlaku untuk material yang murni dihasilkan AI atau kontrol
  manusia atas unsur ekspresifnya tidak memadai; "Prompts alone, however, at
  this stage are unlikely to satisfy those requirements"; penilaian kasus per
  kasus. Ini **hukum AS** dan membahas karya cipta secara umum; apakah dan
  bagaimana berlaku untuk kode, serta posisi hukum Indonesia, **tidak
  terverifikasi** `[belum terverifikasi]`. Bagian tentang pelatihan model dan
  lisensi data latih belum terbit pada laporan itu (disebut sebagai bagian
  berikutnya).
- SE Menkominfo 9/2023 mencantumkan "kekayaan intelektual" sebagai salah satu
  sembilan nilai etika (bagian 5.7); itu pedoman etika, bukan penafsiran
  hukum atas kode hasil AI.
- `[inferensi]` Untuk pengajaran: ajarkan **kewajiban dasar yang tidak
  bergantung pada tafsir hukum**: baca lisensi paket dan data, catat bila
  keluaran AI dipakai, jangan menempel kode berlisensi yang tidak dipahami,
  dan bahwa status hukum kode hasil AI masih berkembang dan berbeda antar
  negara.

### 5.3 Privasi

Aturan paling sederhana yang konsisten dengan sumber yang dibuka dan dengan
repositori: **jangan menaruh data pribadi, kredensial, atau data pelanggan ke
layanan AI** (OWASP LLM02; ADR-0004; draf dewasa `DW-FND-M1(b)`; silabus
sma-coding jalur D). Syarat usia layanan AI tidak diverifikasi di repositori
(`[belum terverifikasi]` pada silabus sma-coding dan smp-coding); UNESCO
(2023, diperbarui 16 Januari 2026) menyebut "setting an age limit for the
independent conversations with GenAI platforms" sebagai langkah regulasi
tetapi **halaman yang dibuka tidak menyebut angka usianya**.

### 5.4 Keberlanjutan perangkat lunak (*maintainability*)

Bukti: He dkk. (2026) (kompleksitas dan peringatan analisis statis menetap
walau kecepatan transien). Praktik yang masuk akal `[inferensi]`:
batasi ukuran perubahan yang diminta dari AI; wajibkan analis statis dan
pemformat dalam alur CI; tulis uji sebelum atau bersama kode; tinjau; hapus
kode yang tidak dipahami alih-alih menyimpannya. Tidak ada eksperimen yang
dibuka yang menguji paket praktik ini sebagai kesatuan.

### 5.5 Keterulangan

Ouyang dkk. (2025) membuat "perintah yang sama" tidak menjamin "kode yang
sama". Implikasi `[inferensi]` untuk modul: **simpan kode hasil dan catat
asal** (alat, versi, perintah ringkas) dalam berkas pendamping atau pesan
commit; jangan mengandalkan menjalankan perintah ulang untuk memperoleh kode
yang sama; uji menjadi pembeda yang tetap. Untuk proyek data dan model,
pengaturan benih acak sudah ada pada silabus jalur D (`D-XII1-M10`).

### 5.6 Jejak energi dan biaya komputasi

**Yang terverifikasi (dan batasnya).**

| Sumber | Angka terbaca | Jenis dan batas |
| --- | --- | --- |
| Luccioni dkk. (2024), `J-R`, `T-A` | Mengukur energi dan karbon 1.000 inferensi; model generatif serba-guna "orders of magnitude more expensive" daripada model khusus-tugas untuk berbagai tugas, bahkan dengan jumlah parameter terkendali. | Benchmark umum; bukan tugas pemrograman; model dan perangkat keras saat studi. |
| Jegham dkk. (2025), `P` | 30 model: model paling boros melampaui 29 Wh per perintah panjang, lebih dari 65 kali sistem paling efisien; kueri pendek 0,42 Wh. | Estimasi lewat data API publik dan faktor lingkungan; preprint. |
| Elsworth dkk. (2025), `P` | Median satu perintah teks pada layanan asisten AI milik penyedia (penulis makalah): 0,24 Wh, turun 33 kali dalam setahun; "substantially lower than many public estimates". | **Pengukuran oleh penyedia layanan sendiri** (instrumentasi infrastruktur penulis); median perintah teks, bukan agen kode berkonteks panjang `[inferensi]`; preprint. |
| IEA (2025), `J-S` | Pusat data memakai 415 TWh listrik pada 2024 (sekitar 1,5% dunia); proyeksi sekitar 945 TWh pada 2030; skenario 2035 antara 700 dan 1.700 TWh (dasar sekitar 1.200 TWh); laporan menyebut "uncertainties in how quickly AI will be adopted". | Proyeksi dengan ketidakpastian; seluruh pusat data, bukan hanya AI. |
| Schwartz dkk. (2020); Strubell dkk. (2019) | Ajakan melaporkan biaya komputasi dan emisi pelatihan; Strubell dkk. mengukur biaya pelatihan model NLP. | Fokus pelatihan, bukan pemakaian harian asisten kode. |

**Kesimpulan jujur.** Energi per perintah **kecil tetapi bervariasi puluhan
kali lipat** antarmodel dan metode ukur, dan angka dari penyedia berbeda
dari estimasi luar. Tidak ada angka terverifikasi tentang energi per tugas
pemrograman, per sesi asisten kode, atau per eksekusi agen
`[belum terverifikasi]`; agen yang membaca banyak berkas dan mengulang
percobaan berpotensi jauh lebih boros daripada satu perintah median
`[inferensi, tidak diukur oleh sumber yang dibuka]`. Biaya uang (harga token,
langganan) berubah cepat dan tidak diverifikasi di sini.

**Praktik yang masuk akal** `[inferensi]`: pilih model dan ukuran konteks
sesuai tugas (Luccioni dkk.: model khusus lebih hemat); jangan menghasilkan
ulang berulang-ulang tanpa menjalankan uji; gunakan analisis statis dan uji
lokal lebih dahulu; catat bila biaya komputasi relevan pada kartu model
(jalur D); anggap "tidak memakai AI" sebagai opsi yang sah untuk tugas
kecil yang dapat dikerjakan langsung.

### 5.7 Tata kelola dan kebijakan penggunaan AI

| Sumber resmi (halaman dibuka 2026-11-19) | Isi terbaca | Catatan untuk repositori |
| --- | --- | --- |
| NIST SP 800-218, *Secure Software Development Framework* v1.1 (Februari 2022) | Kumpulan praktik tingkat tinggi yang dapat dimasukkan ke model siklus hidup apa pun; mengurangi kerentanan dan dampaknya; kosakata bersama produsen, pembeli, dan konsumen. | Acuan praktik pengembangan aman untuk jalur I dan PRO; **tidak khusus AI**. |
| NIST SP 800-218A (Juli 2024), *SSDF Community Profile* untuk AI generatif dan model fondasi dual-use | Memperluas SSDF dengan praktik untuk **pengembangan model AI**; sasaran: produsen model, produsen sistem AI, dan pembeli. | Relevan bagi **pengembang model** dan pembeli; bagi pemakai asisten kode, relevansinya `[inferensi]` pada sisi pembeli. |
| NIST AI Risk Management Framework 1.0 (26 Januari 2023) dan Generative AI Profile NIST-AI-600-1 (26 Juli 2024) | Kerangka **sukarela** ("intended for voluntary use") untuk mengelola risiko AI; halaman menyebut sedang direvisi. | Kerangka kebijakan organisasi, bukan kurikulum. |
| SLSA v1.0 (retired; v1.2 terkini) | Pedoman rantai pasok perangkat lunak bertingkat (track Build). | Pengantar rantai pasok untuk kuliah dan PRO. |
| OWASP Top 10 for LLM Applications 2025 | Sepuluh risiko (LLM01 *Prompt Injection* sampai LLM10 *Unbounded Consumption*). | Daftar risiko untuk aplikasi yang **membangun** sistem LLM; juga bahan diskusi risiko memakainya. |
| UNESCO, *Guidance for generative AI in education and research* (7 September 2023; diperbarui 16 Januari 2026) | Pendekatan berpusat manusia; validasi alat; batas usia untuk percakapan mandiri disebut tetapi tanpa angka. | Dasar kebijakan sekolah; **tanpa angka usia**. |
| Surat Edaran Menkominfo Nomor 9 Tahun 2023 tentang Etika Kecerdasan Artifisial (ditetapkan 19 Desember 2023; status BERLAKU pada halaman JDIH) | Pedoman etika, **bukan peraturan yang mengikat langsung**; sembilan nilai: inklusivitas, kemanusiaan, keamanan, aksesibilitas, transparansi, kredibilitas dan akuntabilitas, pelindungan data pribadi, pembangunan dan lingkungan berkelanjutan, kekayaan intelektual; sasaran: pelaku usaha pemrograman berbasis KA (KBLI 62015) dan penyelenggara sistem elektronik publik dan privat. | Satu-satunya rujukan **Indonesia** yang terbuka pada penelusuran ini; tidak mengatur sekolah. |
| ISO/IEC 42001:2023 | **Halaman resmi ISO tidak terbuka (HTTP 403)**: tidak dikutip. | `[belum terverifikasi]`; bila pemilik membutuhkannya, perlu pembukaan halaman resmi atau akses dokumen. |
| Kebijakan Kemendikdasmen/Kemdiktisaintek tentang AI di sekolah dan kampus | Tidak dibuka. Draf program menandainya `[belum terverifikasi]`. | Tetap celah. |

**Kerangka kebijakan penggunaan AI usulan** `[inferensi]`, memperluas tiga
tingkat pada `kuliah-coding/silabus-draf.md` bagian 6.3 agar dapat dipakai
lintas program:

| Tingkat | Aturan | Dipakai pada |
| --- | --- | --- |
| Hijau | AI boleh dipakai; **wajib dicatat** (alat, tujuan) dan keluaran **diuji dan dijelaskan** pemakai | Proyek, eksplorasi, dokumentasi (jenjang yang boleh memakai alat AI) |
| Kuning | AI boleh menjelaskan konsep atau memberi petunjuk bertahap; tidak boleh menghasilkan solusi yang diserahkan | Tugas dasar pemrograman |
| Merah | AI tidak boleh | Ujian praktik, kontes, seleksi, tugas penilaian kemampuan dasar |
| Demonstrasi | AI hanya didemonstrasikan guru; peserta tidak memakai langsung | SD, SMP, SMA (sesuai keputusan program) |

## 6. Kompetensi per jenjang

Kolom "kapan diperkenalkan" adalah **usulan** yang bertumpu pada bukti di bagian 4.5
(pagar pengaman, pola pemakaian yang melibatkan berpikir, pemula yang
kesulitan dirugikan paling besar). Keputusan program yang sudah ada dikutip dari
dokumen programnya.

**Gerbang kesiapan** `[inferensi]` sebelum pembelajar memakai asisten AI
untuk menulis kode: ia dapat (1) menelusuri (*trace*) program pendek,
(2) menulis satu uji yang gagal bila kode salah, dan (3) menjelaskan kode
dengan kata sendiri. Dasar: keterampilan membaca dan menelusuri (Lister
dkk., 2004; Sorva, 2013, dalam riset ilmu belajar 6.2), kemampuan mengawasi
AI membutuhkan keterampilan lebih dulu (Shen dan Tamkin, 2026), dan kesenjangan
yang melebar (Prather; Lehmann).

| Jenjang | Yang diajarkan terkait AI | Kapan alat AI diperkenalkan | Pagar pengaman | Asesmen tahan AI |
| --- | --- | --- | --- | --- |
| **TK/PAUD** (`tk-coding`, DRAF) | Tidak ada kompetensi alat AI; fokus bermain, bahasa relasional, tanpa layar (draf TK memakai bawaan 0 menit layar; opsi layar `TK-B2-M9`, `TK-B2-M10` maksimum 10 menit per minggu oleh guru). | **Tidak**. Alat AI generatif tidak dipakai anak. | Selaras draf: orang tua mitra, tanpa layar di rumah. | Tidak relevan (observasi bermain). |
| **SD** (`sd-coding`, DRAF) | Literasi KA sederhana: mesin cerdas versus tidak (`SD5-2-M3`), dampak KA (`SD6-2-M2`), etika KA SD (draf bagian 10.2): KA adalah alat, bisa keliru, tidak menyakiti, karya sendiri dikerjakan sendiri, **layanan KA percakapan hanya demonstrasi guru**. | **Tidak dipakai murid langsung**; demonstrasi guru saja, tanpa nama atau data murid. | Tanpa akun murid; tanpa kamera atau mikrofon yang merekam murid; batas usia layanan `[belum terverifikasi]`. | Pengerjaan di kelas dan penjelasan lisan; tidak ada penilaian kode yang dapat dikerjakan dari rumah. |
| **SMP** (`smp-coding`, DRAF v0.2.0) | Literasi dan etika KA sesuai CP KKA Fase D: penginderaan dan data (`SMP9-2-M8`, `M9`), etika AI: keliru, bias, halusinasi, tiruan palsu, ketergantungan (`SMP9-2-M10`), menggunakan perangkat KA sederhana secara kritis (`DK-PA-a`, `DK-PA-b`, saat ini hanya demonstrasi guru, Q11). | **Tidak dipakai murid untuk menulis tugas**; demonstrasi guru; keputusan perluasan menunggu kebijakan privasi alat (Q11). | Aturan pakai AI kelas bersama (`SMP9-2-M10`); tanpa akun murid; data pribadi dan kata sandi tidak ditempel (`SMP8-2-M11`). | Penjelasan lisan, *tracing*, modifikasi program kecil di kelas (PRIMM). |
| **SMA jalur A, B, C** (`sma-coding` v1.2) | Silabus belum mengatur pemakaian AI pada jalur A, B, C (hanya jalur D yang memuat aturan; pencarian kata kunci pada 2026-11-19). Kompetensi relevan yang sudah ada: pengujian (`B-XI1-M7`, `C-XI1-M2`), ulasan kode (`B-XI1-M12`), kualitas kode (`B-XI1-M11`), keamanan dan rahasia (`B-XI2-M10`, `B-XII1-M10`, `C-XI2-M2`). | Usulan: **demonstrasi guru** sampai ada keputusan; tanpa akun pribadi murid. | Kebijakan kelas seragam di blok fondasi (`FND-X1-M6`). | Ujian praktik langsung tanpa AI; penjelasan kode; riwayat Git. |
| **SMA jalur D** (AI dan analisis data) | AI sebagai **subjek**: verifikasi keluaran (`D-X2-M11`), HAKI dan lisensi (`D-X2-M12`), penyalahgunaan AI dan verifikasi konten (`D-XI2-M10`), layanan lewat API opsional (`D-XI2-M11`), kartu model (`D-XI2-M12`), kualitas kode dan keterulangan (`D-XII1-M10`). **Keputusan pemilik: layanan AI daring generatif hanya demonstrasi guru; murid tidak memakainya langsung.** | **Tidak dipakai murid langsung** (keputusan 2026-11-19). | Aturan etika dan privasi jalur D (tanpa data pribadi, tanpa wajah atau suara, tanpa akun wajib, pengungkapan). | Penilaian proses (jurnal), ulasan sejawat, penjelasan model. |
| **Kuliah jalur U** | Literasi, etika, dan keamanan AI (`KUL-U-202`, CPMK C1-C3: cara kerja, verifikasi keluaran, **memakai asisten AI secara bertanggung jawab dan mengungkapkan pemakaiannya**). | Setelah dasar pemrograman (`KUL-U-101`); tingkat Kuning pada mata kuliah dasar, Hijau pada proyek. | Tiga tingkat draf (bagian 6.3 draf); tanpa data pribadi ke layanan eksternal. | Ujian praktik langsung 20-30%, wawancara kode, riwayat Git (draf bagian 6.1, 6.2). |
| **Kuliah jalur I** | Rekayasa perangkat lunak (`KUL-I-204`), proyek tim (`KUL-I-401`), keamanan (`KUL-I-301`), profesi, etika, hak cipta (`KUL-I-305`), AI dan ML (`KUL-I-303`). | Diusulkan **setelah** `KUL-I-102` (struktur data) dan paralel `KUL-I-204`; Kuning pada `KUL-I-101`/`I-102`. | Tiga tingkat; log pemakaian; tinjau kode manusia wajib untuk kode yang digabung. | Ujian praktik tanpa AI; tanya-jawab tentang kode sendiri; variasi tugas per mahasiswa. |
| **Kuliah jalur K** | Pemrograman kompetitif (`KUL-K-201`, `KUL-K-301`, `KUL-K-401`). | Merah saat kontes; setelah kontes, penjelasan solusi boleh dengan pengungkapan `[usulan]`. | Selaras OSN: *re-solve* tanpa petunjuk. | Kontes terkendali. |
| **Dewasa PKJ** (pekerja) | AI sebagai alat produktivitas (`DW-PKJ-M6`: perintah jelas, draf rumus atau skrip, memeriksa dan menguji keluaran, mengenali halusinasi, menjaga data). | Setelah `DW-PKJ-M3` (Python untuk data lembar kerja) dan `M5` (otomasi laporan). | `DW-FND-M1` (keamanan, privasi, etika kerja dengan kode dan AI, 8 jam); data sintetis. | Portofolio dengan catatan perbandingan keluaran AI dengan hasil uji (sudah di `DW-PKJ-M6`). |
| **Dewasa PRO** (profesional, alih karier) | Pengujian unit (`DW-PRO-M5`), tinjau kode dan uji integrasi (`DW-PRO-M10`), konfigurasi dan log (`DW-PRO-M11`), proyek akhir (`DW-PRO-M12`). | Diusulkan **setelah** `DW-PRO-M5`, supaya pemelajar sudah dapat menguji sebelum mengawasi keluaran AI. | Kebijakan tempat kerja; data sintetis; rahasia tidak ditempel. | Proyek dengan riwayat commit; uji kompetensi (opsi LSP, draf dewasa). |
| **Dewasa BIS** (pebisnis, UMKM) | AI untuk usaha (`DW-BIS-M7`: draf teks promosi, ringkasan ulasan sintetis; verifikasi, hak cipta, privasi). | Sesuai draf (data sintetis, tidak ada data pelanggan). | Data pelanggan tidak diunggah; kredensial tidak ditempel. | Prototipe dengan data sintetis. |

**Catatan status (v0.2.1, 2026-11-19).** Tabel di atas ditulis sebelum keputusan pemilik #139 diterapkan dan tidak diubah. Keadaan sekarang, menurut silabus `sma-coding` v1.4.0 (bagian 7.4 dan 9.4): baris "SMA jalur A, B, C" yang menyebut silabus belum mengatur pemakaian AI sudah digantikan, karena butir AI kini ada di `FND-X1-M6`, `C-XI2-M2`, `A-XII2-M5..M8`, `B-XI1-M5`, `B-XI1-M12`, dan `B-XII1-M10`; dan baris "SMA jalur D" yang menyebut layanan AI generatif hanya demonstrasi guru sudah digantikan oleh keputusan bahwa murid SMA di semua jalur boleh memakai AI dengan etika. Penerapan tiap usulan ada di bagian 7.1. Modul belajar yang menuliskan kebijakan ini kini ada sebagai draf di `content/` (belum ditinjau pemilik).

**Asesmen tahan AI: dukungan bukti.** Finnie-Ansley dkk. (2022) menunjukkan
bahwa asisten kode era 2021 mengungguli sebagian besar mahasiswa pada soal
ujian pengantar, sehingga tugas yang dikerjakan di rumah **tidak lagi cukup**
sebagai satu-satunya bukti kemampuan `[inferensi dari temuan itu]`. Bentuk
yang disarankan literatur pendidikan (Becker dkk., 2023; Prather dkk., 2023;
Denny dkk., 2024 sebagai makalah posisi dan laporan kelompok kerja)
dan oleh draf program: ujian praktik langsung, wawancara tentang kode
sendiri, riwayat Git, tugas membaca, menelusuri, dan memodifikasi. **Bukti
bahwa bentuk-bentuk ini benar-benar mengungkap penggunaan AI tidak dibuka**
`[belum terverifikasi]`; pada repositori ini sudah ada pola yang sejalan:
*re-solve* tanpa petunjuk untuk OSN (`data/osn/hint-policy.json`, `kpi-definitions.json`).

## 7. Usulan pembaruan per program (hanya usulan; tidak mengubah dokumen program)

Kolom "bagian terkena" memuat kode nyata yang dibaca pada 2026-11-19. **Opsi
yang direkomendasikan di urutan pertama.** Pemilik memutuskan; dokumen
program diubah terpisah setelah itu.

| Id | Program | Bagian terkena | Usulan | Opsi dan REKOMENDASI | Kekuatan bukti |
| --- | --- | --- | --- | --- | --- |
| U-01 | `osn` | `docs/silabus/04` dan `07` (tidak ditemukan kebijakan AI, riset ilmu belajar 8.1 celah 3); `data/osn/hint-policy.json` | Kebijakan AI pada **lapisan prosedur operasional**, bukan transkripsi silabus: saat mengerjakan soal dan *re-solve*, tanpa AI; setelah penyelesaian mandiri atau editorial, AI hanya boleh menjelaskan dan pembinaan wajib *re-solve* tanpa AI. | **A (Disarankan):** tanpa AI saat kerja soal, AI penjelas setelahnya dengan *re-solve*. B: larangan total. C: bebas dengan pengungkapan. Aturan kontes resmi tentang AI `[belum terverifikasi]`. Kompleksitas rendah (satu dokumen prosedur); risiko A: pengawasan sulit. | `[B]` (Bastani), `[E] (desain RCT)` (Shen dan Tamkin), `[C]` (Prather 2024) |
| U-02 | `sma-coding` blok fondasi dan jalur C | `FND-X1-M6` (keamanan dasar dan etika digital), `FND-X1-M2` (lisensi), `C-XI2-M2` (keamanan konektivitas: kredensial di luar kode) | Tambahkan butir lintas jalur: kebijakan kelas pemakaian AI; **jangan menempelkan data pribadi, kata sandi, atau kunci ke layanan AI**; catat bila keluaran AI dipakai; lisensi keluaran AI sebagai catatan "masih berkembang". Tidak ada minggu baru. | **A (Disarankan):** tambahkan butir ke `FND-X1-M6` dan `C-XI2-M2`, tanpa minggu baru. B: seri pendamping (`rancangan-modul-pendamping.md`). C: biarkan hanya di jalur D. | `[D]` (OWASP LLM02; Lee 2025), `J-S` (SE 9/2023) |
| U-03 | `sma-coding` jalur A | `A-XII2-M5..M8` (latihan terpadu I-IV, kontes mini kelas; koreksi v0.2.0: v0.1.0 menulis "minggu 6-8", kode nyata di silabus adalah M5..M8) dan seluruh latihan inti | Pernyataan eksplisit: latihan terpadu dan kontes mini tanpa AI; berkaitan dengan *re-solve*. | **A (Disarankan):** satu kalimat kebijakan kelas. B: tanpa pernyataan. | `[B]`/`[E]` seperti U-01 |
| U-04 | `sma-coding` jalur B | `B-XI1-M12` (Git, PR, ulasan), `B-XI1-M5` (Bun: pengelola paket), `B-XI1-M7` (`bun test`), `B-XI2-M10` (keamanan aplikasi), `B-XII1-M10` (rahasia dan konfigurasi) | (a) Pada `B-XI1-M12`, murid **meninjau PR berisi kode "buatan AI" sintetis dengan cacat tertanam** yang disiapkan guru (murid tidak memakai layanan AI); (b) pada `B-XI1-M5`, periksa keberadaan dan reputasi paket sebelum `bun install` (paket fiktif); (c) pada `B-XII1-M10`, rahasia tidak ditempel ke asisten AI. | **A (Disarankan):** integrasikan ke minggu yang ada tanpa minggu baru. B: satu minggu baru "kode hasil AI". C: tidak ada. | `[C]` (Perry; Pearce), `[D]` (Fu; Bacchelli), `[E]` (Spracklen) |
| U-05 | `sma-coding` jalur D | `D-X2-M11` (AI generatif dan verifikasi), `D-XI2-M12` (kartu model), `D-XII1-M10` (kualitas kode dan keterulangan) | (a) `D-X2-M11`: demonstrasi guru bahwa perintah yang sama dapat memberi keluaran berbeda; bedakan "AI sebagai subjek" dan "AI sebagai alat menulis kode"; (b) `D-XI2-M12`: tambahkan baris perkiraan biaya komputasi dan energi pada kartu model; (c) `D-XII1-M10`: catat versi model dan perintah bila AI dipakai. | **A (Disarankan):** tambahan butir pada tiga minggu. B: minggu baru "jejak energi". C: tidak ada. | `J-R` (Ouyang), `J-R` (Luccioni), `J-S` (IEA) |
| U-06 | `smp-coding` | `SMP9-2-M10` (etika AI: keliru, bias, halusinasi, ketergantungan), `SMP8-2-M11` (kata sandi dan akun) | Di `SMP9-2-M10`, bahas tanpa perangkat "mengalihkan pekerjaan ke AI versus belajar" dengan contoh dari bukti (Bastani; Lehmann) pada aturan pakai AI kelas; di `SMP8-2-M11`, data pribadi dan kata sandi tidak ditempel ke layanan AI. | **A (Disarankan):** tetap tanpa pemakaian langsung oleh murid, tambah butir. B: demonstrasi guru terkendali. C: akun sekolah terbimbing, menunggu kebijakan privasi alat (Q11). | `[B]` (Bastani, matematika), `[E]` (Lehmann), `[inferensi]` untuk SMP |
| U-07 | `sd-coding` | `SD5-2-M3`, `SD6-2-M2`, bagian 10.2 | **Tidak ada usulan perubahan**: selaras dengan bukti dan keputusan (demonstrasi guru saja; karya sendiri dikerjakan sendiri). | **A (Disarankan):** tidak mengubah. B: tambahkan rujukan ke dokumen ini. | Selaras `ilmu-belajar-kognitif.md` bagian 7 |
| U-08 | `tk-coding` | `TK-B2-M9`, `TK-B2-M10` | **Tidak ada usulan perubahan.** | **A (Disarankan):** tidak mengubah. | Tidak ada bukti alat AI untuk usia TK |
| U-09 | `kuliah-coding` jalur U | `KUL-U-202` (CPMK C3 memakai asisten AI dan mengungkapkan; asesmen refleksi berkas pemakaian AI) | Tambahkan pokok bahasan: verifikasi dengan uji, non-determinisme, privasi dan data, hak cipta (dengan catatan hukum belum pasti), energi secara sekilas, dan gerbang kesiapan (bagian 6). | **A (Disarankan):** perluas pokok bahasan dalam 2 SKS yang ada. B: tambah SKS. C: tidak ada. | Campuran (bagian 4 dan 5) |
| U-10 | `kuliah-coding` jalur I | `KUL-I-204` (RPL), `KUL-I-401` (proyek tim); `KUL-I-301`, `KUL-I-305`, `KUL-I-303` | **Rekayasa perangkat lunak berbantuan AI**: menulis spesifikasi dan uji lebih dulu, meninjau kode hasil AI, CI dengan analis statis, pengantar SSDF dan SLSA, kebijakan AI tim dan log. | **A (Disarankan):** integrasikan 3-4 minggu pada `KUL-I-204`, plus kebijakan dan log di `KUL-I-401`; `KUL-I-301` (SSDF, paket fiktif), `KUL-I-305` (hak cipta, tata kelola, SE 9/2023), `KUL-I-303` (biaya komputasi). Beban S4 sudah 9 SKS. B: mata kuliah pilihan baru 2 SKS di S7 (46 menjadi 48 SKS; S7 6 menjadi 8, di bawah batas 10 pada draf). C: tidak ada. | `[B]`/`[C]`/`[D]`/`[E]` (bagian 4.1-4.4); `J-S` |
| U-11 | `kuliah-coding` (bagian 6.3 draf) | Kebijakan tiga tingkat; `KUL-U-101`, `KUL-I-101`, `KUL-I-102` (Kuning) | Tambahkan: log pemakaian wajib pada tingkat Hijau, wawancara kode singkat, ujian praktik tanpa AI, dan gerbang kesiapan. | **A (Disarankan):** perkuat tiga tingkat dengan log dan wawancara. B: larangan menyeluruh. C: bebas dengan pengungkapan (opsi 5C pada draf). | `[B]` (Bastani), `[C]` (Perry; Finnie-Ansley) |
| U-12 | `kuliah-coding` jalur K | `KUL-K-201`, `KUL-K-301`, `KUL-K-401` | Merah saat kontes; setelah kontes, AI untuk menjelaskan solusi dengan pengungkapan dan *re-solve* tanpa AI. | **A (Disarankan):** seperti usulan. B: Merah mutlak. | `[B]`/`[E]` seperti U-01 |
| U-13 | `dewasa-coding` fondasi | `DW-FND-M1` (hasil belajar (b), (d); topik "cara kerja asisten AI dan kemungkinan salah") | Tambahkan: hak cipta dan lisensi keluaran AI (catatan hukum belum pasti), kebijakan tempat kerja, dan pengenalan *prompt injection* (instruksi tersembunyi dalam dokumen yang diproses AI). Tanpa jam baru. | **A (Disarankan):** tambahan butir dalam 8 jam. B: modul fondasi kedua. | `J-S` (OWASP LLM01, LLM02; Kantor Hak Cipta AS) |
| U-14 | `dewasa-coding` jalur PKJ | `DW-PKJ-M6` | Tambahkan: catat alat, versi, dan perintah; hasil tidak identik antar permintaan; uji dengan data sintetis sebelum dipakai (sudah ada). | **A (Disarankan):** tambah butir. | `J-R` (Ouyang), `[D]` (Lee) |
| U-15 | `dewasa-coding` jalur PRO | `DW-PRO-M5`, `DW-PRO-M10`, `DW-PRO-M12`; usulan kode baru `DW-PRO-M13` | Modul **kerja dengan asisten AI dan agen kode** (spesifikasi, uji sebelum kode, tinjau kode hasil AI, keamanan rantai pasok, kebijakan, pencatatan) dengan prasyarat `DW-PRO-M5`. | **B (Disarankan):** modul baru sekitar 8 jam setelah `DW-PRO-M5` (PRO 128 menjadi 136 jam `[asumsi]`; pemetaan unit SKKNI `[belum terverifikasi]`). A: integrasi pada M5, M10, M12 tanpa jam baru. C: tidak ada. Dasar B: calon pekerja profesional akan menghadapi alat ini (survei Stack Overflow: 84% memakai atau berencana memakai, `[D]`), tetapi gerbang M5 menjaga pembentukan keterampilan (Shen dan Tamkin). | `[D]` (survei), `[E]` (Shen dan Tamkin), `[B]` (Cui, produktivitas) |
| U-16 | `dewasa-coding` jalur BIS dan PRS | `DW-BIS-M7` (sudah memuat verifikasi, hak cipta, privasi) | **Tidak ada usulan perubahan**; draf sudah selaras. | **A (Disarankan):** tidak mengubah. | Selaras bagian 5.3 |
| U-17 | `docs/programs/README.md` (peta jenjang) | Bagian 4 "Rujukan pedagogi bersama" | Tautkan dokumen ini di samping riset ilmu belajar, beserta glosarium istilah (bagian 3.5). | **A (Disarankan):** tautkan. B: tunda sampai disetujui. | Tidak berlaku |

Seluruh usulan bersifat **opsional dan saling terpisah**; masing-masing dapat
dipilih, diubah, atau ditolak tanpa memengaruhi yang lain, kecuali bahwa
U-02 (kebijakan kelas) adalah dasar bagi U-03 dan U-04.

### 7.1 Status penerapan (diperbarui 2026-11-19)

Pemilik memutuskan pada issue #139 (dialog pilihan, 2026-11-19) bahwa ke-17
usulan **diterapkan dengan opsi rekomendasi**, disesuaikan dengan keputusan
bahwa kebijakan AI disusun **per program** dan bahwa murid SMA bebas memakai
AI dengan etika sementara murid SMP tetap demonstrasi guru (bagian 8.1).
Setiap program direvisi lewat PR sendiri setelah encode selesai. Kolom
"Diterapkan di" memuat PR yang sudah merge ke `main`; nomor bagian merujuk
dokumen program.

| Id | Program | Status | Diterapkan di |
| --- | --- | --- | --- |
| U-01 | `osn` | Diterapkan | PR #159: [`docs/operations/kebijakan-ai-osn.md`](../operations/kebijakan-ai-osn.md) v1.0.0 (lapisan prosedur operasional; tidak mengubah `docs/silabus/` maupun `data/osn/`). |
| U-02 | `sma-coding` fondasi dan jalur C | Diterapkan | PR #161: silabus v1.3.0, butir pada `FND-X1-M6` dan `C-XI2-M2`, tanpa minggu baru. |
| U-03 | `sma-coding` jalur A | Diterapkan | PR #161: pernyataan tanpa AI pada latihan terpadu `A-XII2-M5..M8` (koreksi minggu, lihat catatan U-03 di tabel). |
| U-04 | `sma-coding` jalur B | Diterapkan | PR #161: meninjau kode buatan AI (`B-XI1-M12`), pemeriksaan paket (`B-XI1-M5`), rahasia (`B-XII1-M10`); murid boleh memakai AI langsung dengan etika. |
| U-05 | `sma-coding` jalur D | Diterapkan | PR #161: non-determinisme, biaya komputasi dan energi, pencatatan versi model dan perintah (`D-X2-M11`, `D-XI2-M12`, `D-XII1-M10`); aturan lama "layanan AI daring hanya didemonstrasikan guru" digantikan. Bagian 7.4 silabus memuat kebijakan AI program. |
| U-06 | `smp-coding` | Diterapkan | PR #160: silabus v1.1.0, bagian 7.1 (demonstrasi guru, tanpa akun murid, asesmen tanpa AI); butir pada `SMP9-2-M10` dan `SMP8-2-M11`. |
| U-07 | `sd-coding` | Tanpa perubahan | Memang tidak ada usulan perubahan (demonstrasi guru saja); silabus v1.0.0 tetap. |
| U-08 | `tk-coding` | Tanpa perubahan | Memang tidak ada usulan perubahan; silabus v1.0.0 tetap. |
| U-09 | `kuliah-coding` jalur U | Diterapkan | PR #162: silabus v1.1.0, pokok bahasan AI di `KUL-U-202`. |
| U-10 | `kuliah-coding` jalur I | Diterapkan | PR #162: rekayasa perangkat lunak berbantuan AI di `KUL-I-204`, `KUL-I-401`, `KUL-I-301`, `KUL-I-305`, `KUL-I-303`, tanpa menambah SKS. |
| U-11 | `kuliah-coding` kebijakan AI | Diterapkan | PR #162: kebijakan tiga tingkat diperkuat (bagian 6.3-6.5: log pemakaian, wawancara kode, ujian praktik tanpa AI). |
| U-12 | `kuliah-coding` jalur K | Diterapkan | PR #162: Merah saat kontes; sesudah kontes AI untuk menjelaskan solusi dengan pengungkapan dan *re-solve* tanpa AI (bagian 3.3). |
| U-13 | `dewasa-coding` fondasi | Diterapkan | PR #163: silabus v1.1.0, `DW-FND-M1` (hak cipta dan lisensi keluaran AI, kebijakan tempat kerja, *prompt injection*, energi dan biaya). |
| U-14 | `dewasa-coding` jalur PKJ | Diterapkan | PR #163: `DW-PKJ-M6` (catat alat, versi, perintah; hasil tidak identik; data sintetis). |
| U-15 | `dewasa-coding` jalur PRO | Diterapkan | PR #163: modul baru `DW-PRO-M13` setelah `DW-PRO-M5` (8 jam), kebijakan AI di bagian 9.1. |
| U-16 | `dewasa-coding` jalur BIS dan PRS | Tanpa perubahan | Memang tidak ada usulan perubahan; `DW-BIS-M7` dan jalur `PRS` tetap. |
| U-17 | `docs/programs/README.md` | Diterapkan | Peta jenjang v2.0.0 (bagian 4 "Rujukan riset bersama") menautkan dokumen ini beserta kolom kebijakan AI per program. |

Hasil bersihnya: dua belas usulan mengubah silabus program (U-02..U-06 dan
U-09..U-15, dengan U-02..U-05 dalam satu revisi `sma-coding`), satu menjadi
dokumen operasional (U-01), tiga memang tanpa perubahan (U-07, U-08, U-16),
dan satu tautan (U-17).

## 8. Batasan dokumen dan pertanyaan terbuka untuk pemilik

**Batasan.**
- Teks lengkap artikel tidak dibaca; hanya abstrak dan metadata (bagian 1.4).
- Tujuh belas rujukan berstatus preprint (`P`); klaim darinya adalah bukti
  awal. Bidang ini bergerak cepat; angka produktivitas dan keamanan dapat
  berubah dengan generasi alat berikutnya.
- Bukti dari Indonesia tidak ada. Semua penerapan ke siswa Indonesia dan ke
  sekolah adalah `[inferensi]`.
- Tidak ada angka terverifikasi untuk energi per tugas pemrograman maupun
  untuk biaya uang.
- Tidak terverifikasi: tafsir hukum Indonesia atas kode hasil AI;
  ISO/IEC 42001; postingan primer Karpathy; definisi "AI-native" pada konten
  vendor dan perekrutan; klaim bahwa Karpathy kemudian menamai gaya baru
  ("agentic engineering"), yang hanya muncul pada cuplikan hasil pencarian
  dan tidak dibuka; laporan keamanan penyedia keamanan (mis. Veracode) dan
  analisis GitClear tentang mutu kode, yang tidak dibuka.
- Penelusuran tidak sistematis (bukan tinjauan sistematis): sumber dipilih
  dari penelusuran web dan pengetahuan penyusun, lalu diverifikasi; studi
  relevan yang tidak ditemukan tidak tercantum.

**Pertanyaan terbuka** (keputusan pemilik; hanya orchestrator yang
menyajikan ke pemilik, DL-043):

| Id | Pertanyaan | Opsi dan rekomendasi |
| --- | --- | --- |
| Q1 | Bagaimana istilah "vibe coding" dan "AI-native engineer" diperlakukan dalam dokumen program? | **A (Disarankan):** dijelaskan sebagai istilah di glosarium dengan definisi bagian 3.5; tidak menjadi tujuan atau label profil lulusan. B: "AI-native engineer" sebagai profil lulusan jalur I dan PRO (tidak didukung bukti yang dibuka). C: tidak disebut sama sekali. |
| Q2 | Apakah ada satu kerangka kebijakan penggunaan AI lintas program? | **A (Disarankan):** satu kerangka (Hijau, Kuning, Merah, Demonstrasi; bagian 5.7) dengan penerapan per program. B: kebijakan terpisah per program. C: tunda. |
| Q3 | Apakah murid SMP dan SMA boleh memakai alat AI generatif langsung? | **A (Disarankan):** tidak; demonstrasi guru (selaras keputusan jalur D dan Q11 SMP) sampai ada bukti lokal dan kebijakan privasi alat. B: kelas XI-XII dengan akun sekolah dan gerbang kesiapan. C: bebas. |
| Q4 | Bentuk modul rekayasa perangkat lunak berbantuan AI untuk jalur I dan PRO? | **A (Disarankan) untuk jalur I:** integrasi di `KUL-I-204` dan `KUL-I-401`; **B (Disarankan) untuk PRO:** modul baru setelah `DW-PRO-M5`. Alternatif: lihat U-10 dan U-15. |
| Q5 | Apakah jejak energi dan biaya komputasi dimasukkan sebagai materi? | **A (Disarankan):** butir singkat pada jalur D, `KUL-I-303`, dan `KUL-U-202`, dengan angka ketidakpastian. B: praktikum pengukuran. C: tidak. |
| Q6 | Apakah dokumen ini ditautkan dari `README.md`, `AGENTS.md`, `docs/architecture/repository-map.md`, dan `docs/programs/README.md`? | **Tautkan (Disarankan)** seperti riset ilmu belajar; atau tunda sampai disetujui. |
| Q7 | Seberapa sering riset ini ditinjau ulang? | **Setiap 6 bulan (Disarankan)** karena bidang bergerak cepat; atau setiap kali ada studi besar baru. |

### 8.1 Keputusan pemilik atas Q1-Q7 (2026-11-19, issue #139)

Dicatat dari komentar keputusan pemilik pada issue #139 (dialog pilihan).
Kolom "Opsi riset" menyebut opsi yang ditulis pada tabel di atas; pada Q2 dan
Q3 pemilik **memilih berbeda dari rekomendasi riset**.

| Id | Keputusan pemilik | Opsi riset |
| --- | --- | --- |
| Q1 | Istilah dijelaskan sebagai istilah di glosarium (mis. silabus `sma-coding` 7.4, `dewasa-coding` 9.1 dan glosarium kuliah 6.5); bukan tujuan atau label profil lulusan. | A (Disarankan) |
| Q2 | Kebijakan AI disusun **per program**, bukan satu kerangka lintas program: OSN `docs/operations/kebijakan-ai-osn.md`, SMA 7.4, SMP 7.1, kuliah 6.3-6.5, dewasa 9.1; TK dan SD tanpa alat AI generatif untuk murid. | B (bukan rekomendasi) |
| Q3 | **SMA (semua jalur) bebas memakai AI generatif dengan etika; SMP tetap demonstrasi guru.** Aturan lama jalur D SMA digantikan. Data pribadi murid tetap tidak masuk repositori (ADR-0004). | Bukan A, B, maupun C persis; SMA mendekati C dengan etika, SMP mengikuti A |
| Q4 | Jalur I: integrasi di `KUL-I-204` dan `KUL-I-401` (PR #162); jalur PRO: modul baru `DW-PRO-M13` setelah `DW-PRO-M5` (PR #163). | A untuk jalur I, B untuk PRO (Disarankan) |
| Q5 | Energi dan biaya komputasi sebagai butir singkat dengan ketidakpastian dinyatakan. | A (Disarankan) |
| Q6 | Dokumen ini ditautkan dari `README.md`, `AGENTS.md`, `docs/architecture/repository-map.md`, dan `docs/programs/README.md`. | Tautkan (Disarankan) |
| Q7 | Tinjau ulang setiap 6 bulan; dijadwalkan Mei 2027 di issue [#151](https://github.com/ahliweb/cac/issues/151). | Setiap 6 bulan (Disarankan) |

## 9. Daftar pustaka

Format APA. Setiap entri diakhiri status verifikasi (bagian 1.4) dan jenis
sumber (bagian 1.3). Semua dicek **2026-11-19** (tanggal akses halaman web).
Entri ber-DOI disalin dari metadata Crossref (kapitalisasi judul mengikuti
penerbit). Entri arXiv memakai tahun submit pertama; versi yang dibaca
disebut bila berbeda.

### 9.1 Artikel dan prosiding bersejawat (ber-DOI)

Bacchelli, A., & Bird, C. (2013). Expectations, outcomes, and challenges of modern code review. *2013 35th International Conference on Software Engineering (ICSE)*, 712-721. https://doi.org/10.1109/ICSE.2013.6606617 — `T-A`, `J-R`

Bastani, H., Bastani, O., Sungu, A., Ge, H., Kabakcı, Ö., & Mariman, R. (2025). Generative AI without guardrails can harm learning: Evidence from high school mathematics. *Proceedings of the National Academy of Sciences*, *122*(26), e2422633122. https://doi.org/10.1073/pnas.2422633122 — `T-A`, `J-R`

Becker, B. A., Denny, P., Finnie-Ansley, J., Luxton-Reilly, A., Prather, J., & Santos, E. A. (2023). Programming Is Hard - Or at Least It Used to Be: Educational Opportunities and Challenges of AI Code Generation. *Proceedings of the 54th ACM Technical Symposium on Computer Science Education V. 1*, 500-506. https://doi.org/10.1145/3545945.3569759 — `T-A`, `J-T` (makalah posisi). Judul lengkap dari OpenAlex; Crossref memotong setelah "Used to Be".

Cui, K. Z., Demirer, M., Jaffe, S., Musolff, L., Peng, S., & Salz, T. (2026). The Effects of Generative AI on High-Skilled Work: Evidence from Three Field Experiments with Software Developers. *Management Science*, *72*(11), 9408-9420. https://doi.org/10.1287/mnsc.2025.00535 — `T-A`, `J-R`. Versi pra-cetak SSRN: https://doi.org/10.2139/ssrn.4945566.

Denny, P., Prather, J., Becker, B. A., Finnie-Ansley, J., Hellas, A., Leinonen, J., Luxton-Reilly, A., Reeves, B. N., Santos, E. A., & Sarsa, S. (2024). Computing Education in the Era of Generative AI. *Communications of the ACM*, *67*(2), 56-67. https://doi.org/10.1145/3624720 — `T-M` (abstrak hanya satu kalimat), `J-T`

Finnie-Ansley, J., Denny, P., Becker, B. A., Luxton-Reilly, A., & Prather, J. (2022). The Robots Are Coming: Exploring the Implications of OpenAI Codex on Introductory Programming. *Proceedings of the 24th Australasian Computing Education Conference*, 10-19. https://doi.org/10.1145/3511861.3511863 — `T-A`, `J-R`

Fu, Y., Liang, P., Tahir, A., Li, Z., Shahin, M., Yu, J., & Chen, J. (2025). Security Weaknesses of Copilot-Generated Code in GitHub Projects: An Empirical Study. *ACM Transactions on Software Engineering and Methodology*, *34*(8), 1-34. https://doi.org/10.1145/3716848 — `T-A` (abstrak dari Crossref dan arXiv:2310.02059), `J-R`

Gerlich, M. (2025). AI Tools in Society: Impacts on Cognitive Offloading and the Future of Critical Thinking. *Societies*, *15*(1), 6. https://doi.org/10.3390/soc15010006 — `T-A`, `J-R` (korelasional)

Goddard, K., Roudsari, A., & Wyatt, J. C. (2012). Automation bias: a systematic review of frequency, effect mediators, and mitigators. *Journal of the American Medical Informatics Association*, *19*(1), 121-127. https://doi.org/10.1136/amiajnl-2011-000089 — `T-A`, `J-T` (tinjauan sistematis, konteks kesehatan)

He, H., Miller, C., Agarwal, S., Kästner, C., & Vasilescu, B. (2026). Speed at the Cost of Quality: How Cursor AI Increases Short-Term Velocity and Long-Term Complexity in Open-Source Projects. *Proceedings of the 23rd International Conference on Mining Software Repositories*, 181-193. https://doi.org/10.1145/3793302.3793349 — `T-A` (abstrak dari arXiv:2511.04427v3; Crossref memberi judul pendek "Speed at the Cost of Quality"), `J-R`

Kazemitabaar, M., Chow, J., Ma, C. K. T., Ericson, B. J., Weintrop, D., & Grossman, T. (2023). Studying the effect of AI Code Generators on Supporting Novice Learners in Introductory Programming. *Proceedings of the 2023 CHI Conference on Human Factors in Computing Systems*, 1-23. https://doi.org/10.1145/3544548.3580919 — `T-A`, `J-R`

Lee, H.-P. (Hank), Sarkar, A., Tankelevitch, L., Drosos, I., Rintel, S., Banks, R., & Wilson, N. (2025). The Impact of Generative AI on Critical Thinking: Self-Reported Reductions in Cognitive Effort and Confidence Effects From a Survey of Knowledge Workers. *Proceedings of the 2025 CHI Conference on Human Factors in Computing Systems*, 1-22. https://doi.org/10.1145/3706598.3713778 — `T-A`, `J-R` (survei)

Luccioni, S., Jernite, Y., & Strubell, E. (2024). Power Hungry Processing: Watts Driving the Cost of AI Deployment? *The 2024 ACM Conference on Fairness, Accountability, and Transparency*, 85-99. https://doi.org/10.1145/3630106.3658542 — `T-A`, `J-R`

Ouyang, S., Zhang, J. M., Harman, M., & Wang, M. (2025). An Empirical Study of the Non-Determinism of ChatGPT in Code Generation. *ACM Transactions on Software Engineering and Methodology*, *34*(2), 1-28. https://doi.org/10.1145/3697010 — `T-A`, `J-R`

Pearce, H., Ahmad, B., Tan, B., Dolan-Gavitt, B., & Karri, R. (2022). Asleep at the Keyboard? Assessing the Security of GitHub Copilot's Code Contributions. *2022 IEEE Symposium on Security and Privacy (SP)*, 754-768. https://doi.org/10.1109/SP46214.2022.9833571 — `T-A`, `J-R`

Perry, N., Srivastava, M., Kumar, D., & Boneh, D. (2023). Do Users Write More Insecure Code with AI Assistants? *Proceedings of the 2023 ACM SIGSAC Conference on Computer and Communications Security*, 2785-2799. https://doi.org/10.1145/3576915.3623157 — `T-A`, `J-R`

Prather, J., Denny, P., Leinonen, J., Becker, B. A., Albluwi, I., Craig, M., Keuning, H., Kiesler, N., Kohn, T., Luxton-Reilly, A., MacNeil, S., Petersen, A., Pettit, R., Reeves, B. N., & Savelka, J. (2023). The Robots Are Here: Navigating the Generative AI Revolution in Computing Education. *Proceedings of the 2023 Working Group Reports on Innovation and Technology in Computer Science Education*, 108-159. https://doi.org/10.1145/3623762.3633499 — `T-A`, `J-T`

Prather, J., Reeves, B. N., Leinonen, J., MacNeil, S., Randrianasolo, A. S., Becker, B. A., Kimmel, B., Wright, J., & Briggs, B. (2024). The Widening Gap: The Benefits and Harms of Generative AI for Novice Programmers. *Proceedings of the 2024 ACM Conference on International Computing Education Research - Volume 1*, 469-486. https://doi.org/10.1145/3632620.3671116 — `T-A`, `J-R`

Schwartz, R., Dodge, J., Smith, N. A., & Etzioni, O. (2020). Green AI. *Communications of the ACM*, *63*(12), 54-63. https://doi.org/10.1145/3381831 — `T-M` (abstrak hanya satu kalimat), `J-T`

Strubell, E., Ganesh, A., & McCallum, A. (2019). Energy and Policy Considerations for Deep Learning in NLP. *Proceedings of the 57th Annual Meeting of the Association for Computational Linguistics*, 3645-3650. https://doi.org/10.18653/v1/P19-1355 — `T-A`, `J-R`

Vaithilingam, P., Zhang, T., & Glassman, E. L. (2022). Expectation vs. Experience: Evaluating the Usability of Code Generation Tools Powered by Large Language Models. *CHI Conference on Human Factors in Computing Systems Extended Abstracts*, 1-7. https://doi.org/10.1145/3491101.3519665 — `T-A`, `J-R`

Ziegler, A., Kalliamvakou, E., Li, X. A., Rice, A., Rifkin, D., Simister, S., Sittampalam, G., & Aftandilian, E. (2022). Productivity assessment of neural code completion. *Proceedings of the 6th ACM SIGPLAN International Symposium on Machine Programming*, 21-29. https://doi.org/10.1145/3520312.3534864 — `T-A`, `J-R` (studi kasus atas produk pembuatnya; afiliasi `[belum terverifikasi]`)

### 9.2 Preprint (arXiv; belum ditinjau sejawat menurut halaman yang dibuka)

Becker, J., Rush, N., Barnes, E., & Rein, D. (2025). Measuring the Impact of Early-2025 AI on Experienced Open-Source Developer Productivity (arXiv:2507.09089). arXiv. https://arxiv.org/abs/2507.09089 — `P`, `J-P` (v2, 25 Juli 2025; 51 halaman)

Elsworth, C., Huang, K., Patterson, D., Schneider, I., Sedivy, R., Goodman, S., Townsend, B., Ranganathan, P., Dean, J., Vahdat, A., Gomes, B., & Manyika, J. (2025). Measuring the environmental impact of delivering AI at Google Scale (arXiv:2508.15734). arXiv. https://arxiv.org/abs/2508.15734 — `P`, `J-P` (pengukuran oleh penyedia layanan sendiri menurut abstrak)

Ge, Y., Mei, L., Duan, Z., Li, T., Zheng, Y., Wang, Y., Wang, L., Yao, J., Liu, T., Cai, Y., Bi, B., Guo, F., Guo, J., Liu, S., & Cheng, X. (2025). A Survey of Vibe Coding with Large Language Models (arXiv:2510.12399). arXiv. https://arxiv.org/abs/2510.12399 — `P`, `J-P` (v2, 21 Desember 2025)

Hassan, A. E., Oliva, G. A., Lin, D., Chen, B., & Jiang, Z. M. (2024). Towards AI-Native Software Engineering (SE 3.0): A Vision and a Challenge Roadmap (arXiv:2410.06107). arXiv. https://arxiv.org/abs/2410.06107 — `P`, `J-P` (v1 8 Oktober 2024, v2 9 Januari 2026; halaman tidak mencantumkan venue; penulis dan tanggal dari halaman arXiv yang dibuka)

Hassan, A. E., Li, H., Lin, D., Adams, B., Chen, T.-H., Kashiwa, Y., & Qiu, D. (2025). Agentic Software Engineering: Foundational Pillars and a Research Roadmap (arXiv:2509.06216). arXiv. https://arxiv.org/abs/2509.06216 — `P`, `J-P` (v4, 2 November 2026)

Jimenez, C. E., Yang, J., Wettig, A., Yao, S., Pei, K., Press, O., & Narasimhan, K. (2023). SWE-bench: Can Language Models Resolve Real-World GitHub Issues? (arXiv:2310.06770). arXiv. https://arxiv.org/abs/2310.06770 — `P`, `J-P` (catatan arXiv: ICLR 2024, tidak diverifikasi ke prosiding)

Jegham, N., Abdelatti, M., Koh, C. Y., Elmoubarki, L., & Hendawi, A. (2025). How Hungry is AI? Benchmarking Energy, Water, and Carbon Footprint of LLM Inference (arXiv:2505.09598). arXiv. https://arxiv.org/abs/2505.09598 — `P`, `J-P` (v6, 24 November 2025)

Kosmyna, N., Hauptmann, E., Yuan, Y. T., Situ, J., Liao, X.-H., Beresnitzky, A. V., Braunstein, I., & Maes, P. (2025). Your Brain on ChatGPT: Accumulation of Cognitive Debt when Using an AI Assistant for Essay Writing Task (arXiv:2506.08872). arXiv. https://arxiv.org/abs/2506.08872 — `P`, `J-P` (v2, 31 Desember 2025; 216 halaman; esai, bukan pemrograman)

Lehmann, M., Cornelius, P. B., & Sting, F. J. (2024). AI Meets the Classroom: When Do Large Language Models Harm Learning? (arXiv:2409.09047). arXiv. https://arxiv.org/abs/2409.09047 — `P`, `J-P` (v2, 8 Maret 2025)

Liu, J., Xia, C. S., Wang, Y., & Zhang, L. (2023). Is Your Code Generated by ChatGPT Really Correct? Rigorous Evaluation of Large Language Models for Code Generation (arXiv:2305.01210). arXiv. https://arxiv.org/abs/2305.01210 — `P`, `J-P` (v3, 30 Oktober 2023; kolom komentar tanpa venue)

Peng, S., Kalliamvakou, E., Cihon, P., & Demirer, M. (2023). The Impact of AI on Developer Productivity: Evidence from GitHub Copilot (arXiv:2302.06590). arXiv. https://arxiv.org/abs/2302.06590 — `P`, `J-P`

Sandoval, G., Pearce, H., Nys, T., Karri, R., Garg, S., & Dolan-Gavitt, B. (2022). Lost at C: A User Study on the Security Implications of Large Language Model Code Assistants (arXiv:2208.09727). arXiv. https://arxiv.org/abs/2208.09727 — `P`, `J-P` (v4, 27 Februari 2023; komentar arXiv: "Accepted for publication in USENIX'23", tidak diverifikasi ke prosiding)

Sapkota, R., Roumeliotis, K. I., & Karkee, M. (2025). Vibe Coding vs. Agentic Coding: Fundamentals and Practical Implications of Agentic AI (arXiv:2505.19443). arXiv. https://arxiv.org/abs/2505.19443 — `P`, `J-P` (tinjauan)

Sarkar, A., & Drosos, I. (2025). Vibe coding: programming through conversation with artificial intelligence (arXiv:2506.23253). arXiv. https://arxiv.org/abs/2506.23253 — `P`, `J-P` (v2, 3 Oktober 2025; komentar arXiv menyebut PPIG 2025, tidak diverifikasi)

Shen, J. H., & Tamkin, A. (2026). How AI Impacts Skill Formation (arXiv:2601.20245). arXiv. https://arxiv.org/abs/2601.20245 — `P`, `J-P` (v2, 1 Februari 2026)

Shukla, S., Joshi, H., & Syed, R. (2025). Security Degradation in Iterative AI Code Generation -- A Systematic Analysis of the Paradox (arXiv:2506.11022). arXiv. https://arxiv.org/abs/2506.11022 — `P`, `J-P` (v2, 26 September 2025)

Spracklen, J., Wijewickrama, R., Sakib, A. H. M. N., Maiti, A., Viswanath, B., & Jadliwala, M. (2024). We Have a Package for You! A Comprehensive Analysis of Package Hallucinations by Code Generating LLMs (arXiv:2406.10279). arXiv. https://arxiv.org/abs/2406.10279 — `P`, `J-P` (v3, 2 Maret 2025; komentar arXiv: "To appear in the 2025 USENIX Security Symposium", tidak diverifikasi)

### 9.3 Standar, kerangka, regulasi, dan halaman lembaga resmi

International Energy Agency. (2025, 10 April). *Energy and AI*. https://www.iea.org/reports/energy-and-ai (dan https://www.iea.org/reports/energy-and-ai/executive-summary) — `T-W`, `J-S` (dibuka 2026-11-19; angka dari ringkasan eksekutif)

Kementerian Komunikasi dan Informatika. (2023). *Surat Edaran Menteri Komunikasi dan Informatika Nomor 9 Tahun 2023 tentang Etika Kecerdasan Artifisial*. JDIH Komdigi. https://jdih.komdigi.go.id/produk_hukum/view/id/883/t/surat+edaran+menteri+komunikasi+dan+informatika+nomor+9+tahun+2023 — `T-W`, `J-S` (dibuka 2026-11-19; ditetapkan 19 Desember 2023; status BERLAKU menurut halaman)

National Institute of Standards and Technology. (2022, Februari). *Secure Software Development Framework (SSDF) Version 1.1: Recommendations for Mitigating the Risk of Software Vulnerabilities* (NIST SP 800-218). https://csrc.nist.gov/pubs/sp/800/218/final — `T-W`, `J-S` (dibuka 2026-11-19)

National Institute of Standards and Technology. (2024, Juli). *Secure Software Development Practices for Generative AI and Dual-Use Foundation Models: An SSDF Community Profile* (NIST SP 800-218A). https://csrc.nist.gov/pubs/sp/800/218/a/final — `T-W`, `J-S` (dibuka 2026-11-19)

National Institute of Standards and Technology. (t.t.). *AI Risk Management Framework* (AI RMF 1.0, 26 Januari 2023; Generative AI Profile NIST-AI-600-1, 26 Juli 2024). https://www.nist.gov/itl/ai-risk-management-framework — `T-W`, `J-S` (dibuka 2026-11-19; teks kerangka tidak dibaca, hanya halaman ringkasan)

OWASP Gen AI Security Project. (2025). *OWASP Top 10 for LLM Applications 2025*. https://genai.owasp.org/llm-top-10/ — `T-W`, `J-S` (dibuka 2026-11-19; daftar sepuluh item; halaman tidak menyatakan apakah proyek berbasis komunitas)

SLSA. (t.t.). *SLSA specification v1.0: About*. https://slsa.dev/spec/v1.0/about — `T-W`, `J-S` (dibuka 2026-11-19; halaman menyatakan v1.0 retired dan v1.2 terkini; hak cipta Linux Foundation)

UNESCO. (2023, 7 September; diperbarui 2026, 16 Januari). *Guidance for generative AI in education and research*. https://www.unesco.org/en/articles/guidance-generative-ai-education-and-research — `T-W`, `J-S` (dibuka 2026-11-19; teks panduan penuh tidak dibaca)

U.S. Copyright Office. (2025, Januari). *Copyright and Artificial Intelligence, Part 2: Copyrightability*. https://www.copyright.gov/ai/Copyright-and-Artificial-Intelligence-Part-2-Copyrightability-Report.pdf — `T-W`, `J-S` (PDF diunduh ke direktori baru dan dibaca dengan `pdftotext`, 2026-11-19; ringkasan eksekutif dan Bab V dibaca; hukum AS; halaman indeks: https://www.copyright.gov/ai/)

### 9.4 Laporan industri dan survei

DORA. (2025). *State of AI-assisted Software Development 2025*. Google Cloud. https://dora.dev/research/2025/dora-report/ — `T-W`, `J-I` (dibuka 2026-11-19; halaman tidak menyebut tanggal rilis, angka, atau metodologi; hanya pernyataan "amplifier" dikutip)

Stack Overflow. (2025). *2025 Developer Survey: AI*. https://survey.stackoverflow.co/2025/ai — `T-W`, `J-I` (dibuka 2026-11-19; jumlah responden per pertanyaan, bukan total; angka persen berbeda tipis antara teks dan grafik pada halaman)

### 9.5 Opini, blog, postingan, dan berita

Kolirin, L. (2025, 6 November). 'Vibe coding' named Collins Dictionary's Word of the Year. CNN (diteruskan oleh KRDO). https://krdo.com/news/2025/11/06/vibe-coding-named-collins-dictionarys-word-of-the-year/ — `T-W`, `J-O` (dibuka 2026-11-19; definisi Collins dikutip lewat berita; halaman Collins dan Merriam-Webster tidak terbuka, HTTP 403)

O'Toole, G. (2025, 3 Maret). *Word: vibecoding, vibe coding* [Pesan milis]. American Dialect Society, ADS-L. https://listserv.linguistlist.org/pipermail/ads-l/2025-March/166588.html — `T-S`, `J-O` (dibuka 2026-11-19; mengutip postingan @karpathy 2 Februari 2025, 6:17 PM; postingan primer di X tidak terbuka, HTTP 402)

Osmani, A. (2025, 1 Juli). *The AI-Native Software Engineer*. https://addyo.substack.com/p/the-ai-native-software-engineer — `T-W`, `J-O` (dibuka 2026-11-19; terbaca 100.000 dari 108.659 karakter)

Willison, S. (2025, 19 Maret). *Not all AI-assisted programming is vibe coding (but vibe coding rocks)*. https://simonwillison.net/2025/Mar/19/vibe-coding/ — `T-W`, `J-O` (dibuka 2026-11-19)

### 9.6 Rekap status verifikasi

| Status | Jumlah | Keterangan |
| --- | --- | --- |
| `T-A` (metadata + abstrak) | 20 | Bagian 9.1 |
| `T-M` (metadata saja) | 2 | Denny dkk. (2024); Schwartz dkk. (2020): tidak ada klaim temuan selain judul dan ringkasan satu kalimat |
| `P` (preprint arXiv) | 17 | Bagian 9.2 |
| `T-W` (halaman web dibuka) | 14 | 9 pada bagian 9.3 (IEA, SE Menkominfo, NIST SP 800-218, NIST SP 800-218A, NIST AI RMF, OWASP, SLSA, UNESCO, Kantor Hak Cipta AS), 2 pada bagian 9.4 (DORA, Stack Overflow), 3 pada bagian 9.5 (CNN/KRDO, Osmani, Willison) |
| `T-S` (dikutip lewat sumber sekunder) | 1 | O'Toole (ADS-L) mengutip postingan Karpathy |
| **Total** | **54** | |
| Tidak terverifikasi dan **tidak** dicantumkan sebagai rujukan | | Postingan primer Karpathy (HTTP 402); halaman ISO/IEC 42001 (HTTP 403); Merriam-Webster dan halaman Collins (HTTP 403); The New Stack (HTTP 403); klaim "agentic engineering" oleh Karpathy; tafsir hukum Indonesia atas kode hasil AI; Veracode, GitClear, dan konten vendor atau perekrutan tentang "AI-native"; kebijakan Kemendikdasmen/Kemdiktisaintek tentang AI |

> Rekap dihitung dari daftar bagian 9.1 (22 entri ber-DOI: 20 `T-A`, 2
> `T-M`), 9.2 (17 `P`), 9.3 (9 `T-W`), 9.4 (2 `T-W`), dan 9.5 (3 `T-W`, 1
> `T-S`). Bila daftar berubah, hitung ulang. Rujukan yang juga dipakai riset
> ilmu belajar (#133, 81 entri) pada bagian 6.6 dan 4.4 dan diverifikasi ulang
> di sini: Bastani dkk. (2025), Denny dkk. (2024), Prather dkk. (2023; 2024),
> Kazemitabaar dkk. (2023), dan Kosmyna dkk. (2025).
