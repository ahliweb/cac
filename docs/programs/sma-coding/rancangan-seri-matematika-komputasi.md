# Rancangan Seri Modul Matematika Komputasi Dasar (sma-coding)

- **Version:** v0.3.1
- **Last updated:** 2026-11-19
- **Status:** Rancangan DISETUJUI pemilik 2026-11-19 beserta keenam rekomendasi (issue #87); tujuh modul draf `matkom-*` ada di `content/sma-coding/modules/` (PR #116) dan terindeks di `data/sma-coding/modules.json`, berstatus draf sampai ditinjau pemilik
- **Changeset:** Status: tujuh modul draf `matkom-*` masuk repositori dan terindeks (PR #116).

> **Catatan status (2026-11-19, sinkron dokumen #124).** Kalimat "modulnya belum ditulis ke repositori" di blok kutipan bawah, "`data/sma-coding/modules.json` belum ada" (bagian 6), dan urutan pengerjaan bagian 8 yang menyebut skema dan indeks belum selesai adalah riwayat saat persetujuan: tujuh modul `matkom-*` kini ada di `content/sma-coding/modules/` dan di `data/sma-coding/modules.json` (skema `src/schema/sma-module.ts`, #106), semua `draf`, belum ditinjau.
> Keputusan dan kontrak yang disetujui pemilik di dokumen ini tidak berubah; yang diperbarui hanya klausa status yang basi.

> **Rancangan disetujui pemilik pada 2026-11-19** (dialog pilihan, dicatat
> di komentar issue #87) beserta **keenam rekomendasi** di bagian 7. Yang
> disetujui adalah **rancangan**; **modulnya belum ditulis ke repositori**
> dan modul yang kelak ditulis berstatus `draf` sampai pemilik meninjau dan
> menyetujuinya per modul (ADR-0007). Dokumen ini adalah konten karangan
> menurut [ADR-0007](../../architecture/adr/0007-authored-learning-content.md),
> bukan transkripsi sumber resmi. Rujukan silabus kini
> [v1.1](silabus.md) (disetujui 2026-11-19). Pengindeksan modul menunggu skema
> indeks sma-coding (#106); tidak ada modul, data, atau skema yang dibuat
> oleh dokumen ini.

## 0. Cara membaca dokumen ini

- `[asumsi]` berarti keputusan perancangan penyusun, bukan data resmi.
- Kode minggu berbentuk `jalur-kelas-semester-M<n>` dan kode butir CP
  berbentuk `E-BK-a`, persis seperti di
  [silabus.md](silabus.md) (bagian 0 dan 1.4). Dokumen ini tidak membuat kode
  baru, kecuali kode minggu fondasi `FND-X1-M<n>` yang berasal dari
  [usulan-fondasi-kelas-x.md](usulan-fondasi-kelas-x.md) dan belum ada di
  corpus.
- Kode minggu di dokumen ini mengikuti silabus **v1.1** (disetujui
  2026-11-19, issue #92). Pada v0.2.0 kode kelas X dipetakan ulang dari v1.0
  memakai tabel padanan di [silabus.md bagian 3.0](silabus.md) dan diperiksa
  terhadap `data/sma-coding/weeks.json` dan `foundation.json`. Kode kelas XI
  dan XII tidak berubah antara v1.0 dan v1.1. Minggu v1.0 yang digabung ke
  satu minggu v1.1 ditulis sekali (mis. v1.0 `A-X1-M5` dan `A-X1-M8` menjadi
  `A-X1-M10`).

## 1. Latar dan keputusan pemilik

Pemeriksaan 2026-11-18 (issue #87): matematika komputasi untuk siswa SMA
reguler belum ada. Modul OSN (`logika-bitwise`, `aritmetika`,
`aturan-berhitung`, `rekursi`) berada pada tingkat pembinaan OSN dan memakai
C++. Yang belum ada: sistem bilangan dan konversi basis, representasi data
(komplemen dua, karakter, gambar), relasi dan fungsi, serta induksi.

**Keputusan pemilik (2026-11-18, dialog pilihan, issue #87 dan #86):**

1. Seri modul matematika komputasi **terpisah**, **lintas jalur**, dan
   **tidak menambah minggu wajib**.
2. Blok fondasi kelas X berjumlah **7 minggu**. **Fondasi memperkenalkan,
   seri ini memperdalam.**
3. **Representasi data adalah prasyarat**, tidak dihitung sebagai pemenuhan
   butir CP.
4. **Operasi bit dipindah ke pengayaan kelas XI** (`A-X2-M12` pada v1.0, kini
   `A-XI1-M3` pada v1.1).

**Persetujuan rancangan (2026-11-19, dialog pilihan, issue #87):** pemilik
menyetujui rancangan seri beserta keenam rekomendasi di bagian 7. Modul
ditulis berstatus `draf`.

## 2. Tujuan seri

Tujuan `[asumsi]` (murid mampu ...):

- membaca, menulis, dan mengonversi bilangan dalam basis 2, 8, 10, dan 16,
  serta menjelaskan mengapa komputer memakai basis 2;
- menjelaskan bagaimana komputer menyimpan bilangan bulat bertanda
  (komplemen dua), teks (ASCII, Unicode, UTF-8), gambar, dan suara, beserta
  batas dan galat yang timbul (luapan, pembulatan);
- memakai logika proposisi, himpunan, relasi, dan fungsi sebagai bahasa untuk
  menyatakan kondisi, data, dan hubungan antardata;
- menalar kebenaran definisi rekursif dan algoritma sederhana dengan induksi;
- membandingkan laju pertumbuhan fungsi untuk menilai efisiensi algoritma
  secara intuitif.

Seri ini adalah **landasan matematis untuk coding**, bukan pengganti
pelajaran Matematika sekolah dan bukan pembinaan OSN. Siswa jalur A maupun B
membacanya; contoh kode mengikuti jalur (bagian 5).

## 3. Daftar modul

Id modul berbentuk kebab-case dengan awalan `matkom-` agar seri mudah
dikenali dan tidak bentrok dengan id modul fondasi (#86) atau modul OSN.
Penyesuaian dari usulan awal issue: **"representasi data lanjut" dipecah dua**
(bilangan bertanda; teks, gambar, dan suara) karena dua topik itu berbeda
prasyarat dan beban. Hasilnya tujuh modul. Alternatif satu modul gabungan
dibahas pada pertanyaan terbuka 3.

Penjelasan kolom:

- **Prasyarat**: minggu fondasi (`FND-X1-M<n>`, ada di `data/sma-coding/foundation.json`) atau
  modul seri yang harus dipahami lebih dulu.
- **Kelas sasaran**: kelas ketika modul paling bermanfaat dibaca; bukan
  jadwal wajib (bagian 7, pertanyaan 5).
- **Minggu memakai**: minggu jalur A/B v1.1 yang topiknya memakai modul ini
  sebagai bacaan pendamping atau pendalaman. Tidak ada minggu baru.
- **Butir CP**: kode dari silabus bagian 1.4. "Di luar rumusan CP" berarti
  tidak ada butir CP yang dikutip silabus yang menyebut topik itu. Kata
  "mendukung" berarti modul membantu mencapai butir itu tetapi **tidak
  dihitung sebagai pemenuhan** (prinsip bagian 4.3).
- **Jembatan OSN**: id rumpun dari `data/osn/topic-families.json` dan modul
  OSN yang menjadi kelanjutan.

| Id modul | Judul | Isi | Prasyarat | Kelas sasaran | Minggu memakai (v1.1) | Butir CP | Jembatan ke modul OSN |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `matkom-sistem-bilangan-basis` | Sistem Bilangan dan Konversi Basis | nilai tempat; basis 2, 8, 10, 16; konversi dua arah dan lewat biner; aritmetika biner (jumlah, kurang); pecahan biner secara singkat; mengapa heksadesimal ringkas; konversi dengan program | FND-X1-M3 | X | A: A-X1-M9. B: B-X1-M9. | Di luar rumusan CP (prasyarat). Mendukung E-BK-e. | Rumpun `logika-bitwise` (kelanjutan: `logika-bitwise`, bagian operasi bit). Rumpun `aritmetika` (nilai tempat dan sisa bagi; modul `aritmetika`). |
| `matkom-bilangan-bertanda-dan-luapan` | Bilangan Bertanda, Komplemen Dua, dan Luapan | bit tanda dan besar tanda; komplemen satu dan dua; rentang n-bit; luapan (overflow) dan melilit; bilangan pecahan mengambang dan galat pembulatan (mengapa `0.1 + 0.2` tidak persis); implikasi ke pemilihan tipe | `matkom-sistem-bilangan-basis` | X | A: A-X1-M9, A-X2-M4. B: B-X1-M9. | Di luar rumusan CP (prasyarat). Mendukung E-BK-e. | Rumpun `dasar-pemrograman` (bagian integer overflow; modul `dasar-pemrograman`). Rumpun `logika-bitwise` (pergeseran dan bit tanda; modul `logika-bitwise`). |
| `matkom-teks-gambar-suara` | Representasi Teks, Gambar, dan Suara | ASCII; Unicode dan titik kode; UTF-8 (banyak byte per karakter, mengapa panjang karakter tidak sama dengan panjang byte); gambar raster (piksel, kedalaman warna, RGB, heksadesimal warna, ukuran berkas); kompresi dasar (pengodean panjang-ulang); suara (cuplikan, laju cuplik, kuantisasi) | FND-X1-M3; `matkom-sistem-bilangan-basis` | X | A: A-X2-M2, A-X2-M3. B: B-X2-M2, B-X2-M5. | Di luar rumusan CP (prasyarat). Berdekatan dengan F-LD-f, tidak dihitung. | Rumpun `struktur-data` (string dan array dua dimensi sebagai kisi piksel; modul `struktur-data`). |
| `matkom-logika-proposisi` | Logika Proposisi untuk Pemrogram | proposisi; konektif (negasi, dan, atau, XOR, implikasi, biimplikasi); tabel kebenaran; ekuivalensi dan hukum De Morgan; menyederhanakan kondisi program; kuantor "untuk semua" dan "ada" secara intuitif; kebenaran dan kontrapositif | Tanpa prasyarat modul seri | X | A: A-X1-M10. B: B-X1-M10. | Di luar rumusan CP. Mendukung E-BK-d. | Rumpun `logika-bitwise` (kelanjutan tingkat OSN: modul `logika-bitwise`, bagian proposisi, implikasi, modus ponens). |
| `matkom-himpunan-relasi-fungsi` | Himpunan, Relasi, dan Fungsi | himpunan, anggota, bagian, gabungan, irisan, selisih, komplemen, diagram Venn; pasangan terurut dan hasil kali Kartesius; relasi dan sifatnya (refleksif, simetris, transitif); fungsi sebagai relasi khusus (domain, kodomain, satu-satu, pada); fungsi matematis versus fungsi pada program; relasi sebagai graf | `matkom-logika-proposisi` | X (semester 2) sampai XI | A: A-X1-M12, A-XI1-M9, A-XI2-M5. B: B-X1-M12, B-XI1-M8. | Di luar rumusan CP. Mendukung F-BK-c dan F-AP-d. | Rumpun `aritmetika` (bagian himpunan; modul `aritmetika`). Rumpun `struktur-data` (`set`, `map`). Rumpun `graph-tree` (relasi sebagai graf; modul `graph-tree`). |
| `matkom-induksi-dan-rekursi-matematis` | Induksi dan Rekursi Matematis | barisan dan deret; definisi rekursif (faktorial, Fibonacci, pangkat); induksi matematika (basis, langkah, hipotesis); membuktikan rumus jumlah dan ketepatan fungsi rekursif; hubungan rekurens sederhana dan banyak panggilan; ide invarian perulangan | `matkom-logika-proposisi`; `matkom-himpunan-relasi-fungsi` | X (semester 2) sampai XI | A: A-X2-M11, A-XI1-M7, A-XI2-M1, A-XI2-M2. B: B-XI1-M9. | Di luar rumusan CP. Mendukung F-AP-a dan F-BK-b. | Rumpun `rekursi` (modul `rekursi`). Rumpun `aturan-berhitung` (barisan, Fibonacci; modul `aturan-berhitung`). Rumpun `strategi-problem-solving` (divide-and-conquer, DP; modul `strategi-problem-solving`). |
| `matkom-pertumbuhan-fungsi` | Pertumbuhan Fungsi dan Efisiensi Intuitif | membandingkan fungsi (konstan, logaritma, linear, n log n, kuadrat, eksponen); menghitung langkah dari program; mengapa pencarian biner cepat; batas atas dengan notasi O secara intuitif (tanpa definisi formal limit); mengira waktu untuk batas masukan; logaritma sebagai "berapa kali dibagi dua" | `matkom-sistem-bilangan-basis` (logaritma basis 2); `matkom-induksi-dan-rekursi-matematis` (hubungan rekurens, opsional) | X (akhir semester 2) sampai XI | A: A-X2-M8, A-X2-M12, A-XI1-M8, A-XI1-M12. B: B-XI1-M10. | F-BK-b (justifikasi efisiensi) sebagai pendukung; juga di luar rumusan CP untuk bagian notasi O. Tidak dihitung. | Rumpun `search-sort` (modul `search-sort`). Rumpun `rekursi` (modul `rekursi`). Rumpun `strategi-problem-solving` (modul `strategi-problem-solving`). |

Catatan pemetaan:

- Seluruh kode minggu jalur di tabel ada di `data/sma-coding/weeks.json`
  (silabus v1.1 bagian 3) dan kode `FND-X1-M<n>` ada di
  `data/sma-coding/foundation.json`; kode diperiksa terhadap berkas itu pada
  2026-11-19, bukan menebak.
- Modul `matkom-sistem-bilangan-basis` adalah prasyarat bagi **pengayaan
  operasi bit kelas XI**. Pada v1.1 pengayaan itu berada di `A-XI1-M3`
  (pada v1.0 `A-X2-M12`); kode itu tidak dimasukkan ke kolom "Minggu memakai"
  karena rancangan awal tidak memetakannya, hanya mencatat prasyaratnya.
- Jalur C (#68) dan D (#84) bila kelak disetujui dapat memakai modul 1 sampai
  3 sebagai prasyarat data; belum dipetakan karena jalur itu masih draf dan
  belum punya kode minggu di corpus.

## 4. Batas dengan blok fondasi, modul OSN, dan CP

### 4.1 Batas dengan blok fondasi (tanpa duplikasi)

Prinsip: **fondasi memperkenalkan, seri ini memperdalam.** Seri mengasumsikan
isi fondasi sudah diajarkan dan tidak mengajarkannya ulang.

| Topik | Di fondasi (FND-X1-M3) | Di seri ini |
| --- | --- | --- |
| Bilangan | konversi desimal, biner, heksadesimal; bit dan byte | basis umum (2 sampai 16) dan oktal; konversi lewat biner; aritmetika biner; pecahan biner; **bilangan bertanda dan komplemen dua**; luapan; bilangan mengambang |
| Teks | teks disimpan sebagai kode karakter; menyandikan kata fiktif dengan tabel kode | ASCII sebagai sebagian dari Unicode; titik kode; **UTF-8** dan perbedaan panjang karakter dan byte |
| Gambar | gambar sebagai kisi piksel; gambar 8x8 hitam-putih sebagai deret bit; warna RGB dan kode heksadesimal | kedalaman warna dan ukuran berkas; **kompresi dasar**; hubungan dengan array dua dimensi |
| Suara | tidak ada | **cuplik, laju cuplik, kuantisasi** |
| Logika, himpunan, fungsi, induksi, pertumbuhan | tidak ada | seluruhnya |

Aturan teknis `[asumsi]`:

1. Setiap modul seri yang bergantung pada fondasi memuat satu bagian
   "Ulasan singkat" tidak lebih dari satu layar yang menyebut apa yang
   diasumsikan, tanpa latihan ulang yang sama dengan latihan fondasi.
2. Latihan seri tidak boleh sama dengan latihan di tabel fondasi (menyandikan
   kata fiktif, gambar 8x8); seri memakai soal yang menuntut tahap lanjutan.
3. Bila silabus kelak mengubah isi `FND-X1-M3` (v1.1 bagian 3.0), batas di tabel
   ini ditinjau ulang sebelum modul terkait ditulis atau direvisi.

### 4.2 Batas dengan modul OSN

Modul OSN yang sudah `disetujui` tidak diubah oleh seri ini. Modul seri
**tidak menyalin** materi modul OSN; ia menjadi pengantar konseptual tanpa
beban kompetisi dan menunjuk modul OSN sebagai kelanjutan:

| Topik | Modul OSN (tingkat pembinaan) | Modul seri (tingkat reguler) |
| --- | --- | --- |
| Logika | `logika-bitwise`: tabel kebenaran, implikasi, modus ponens, operasi bit, bitmask dalam C++ | `matkom-logika-proposisi`: konsep, hukum ekuivalensi, penyederhanaan kondisi; **tanpa operasi bit** (operasi bit adalah pengayaan kelas XI) |
| Aritmetika dan himpunan | `aritmetika`: paritas, FPB/KPK, modular, prima, pecahan, himpunan dengan `set` | `matkom-himpunan-relasi-fungsi`: himpunan secara matematis, relasi, fungsi; tidak mengulang `set` C++ |
| Rekursi | `rekursi`: call stack, divide-and-conquer, backtracking | `matkom-induksi-dan-rekursi-matematis`: definisi rekursif dan induksi untuk menalar; tidak mengulang call stack dan backtracking |
| Barisan dan Fibonacci | `aturan-berhitung`: barisan, Fibonacci, kombinatorika | `matkom-induksi-dan-rekursi-matematis`: barisan hanya sebagai objek induksi; kombinatorika tidak dimasukkan |

### 4.3 Hubungan dengan CP

- **Tidak ada modul seri yang dihitung sebagai pemenuhan butir CP.** Alasan:
  pemetaan butir CP ke minggu (`data/sma-coding/cp-mapping.json`) dihitung
  dari minggu wajib silabus, sedangkan seri tidak menambah minggu wajib
  (keputusan pemilik). Kolom "Butir CP" di bagian 3 hanya menandai butir yang
  didukung. Prinsip ini diperluas dari keputusan pemilik tentang representasi
  data ke seluruh modul seri `[asumsi]`; lihat pertanyaan terbuka 4.
- Rumusan CP yang dikutip silabus (bagian 1.3) tidak menyebut sistem bilangan,
  komplemen dua, logika proposisi, himpunan, relasi, fungsi, atau induksi.
  Dokumen ini tidak menambah rumusan CP.

## 5. Bentuk modul

Gaya mengikuti
[`content/osn/modules/dasar-pemrograman.md`](../../../content/osn/modules/dasar-pemrograman.md)
(ADR-0007): satu berkas Markdown per modul di
`content/sma-coding/modules/<id>.md`, berstatus `draf` sampai pemilik
menyetujui, dalam Bahasa Indonesia, tanpa data siswa (ADR-0004).

Kerangka tiap modul `[asumsi]`:

1. **Untuk siapa modul ini**: sasaran, prasyarat, tujuan, cara memakai, dan
   catatan bahwa contoh kode hanya diperiksa bisa dikompilasi.
2. **Ulasan singkat** (hanya bila bergantung pada fondasi; bagian 4.1).
3. **Penjelasan** bertahap dengan contoh bilangan kecil yang dapat dikerjakan
   di kertas.
4. **Contoh** terkerjakan dan **Kesalahan umum**.
5. **Contoh kode** (bila ada), diberi label jalur.
6. **Latihan** (soal kertas dahulu, lalu soal kode) dan **Cek mandiri**.
7. **Langkah berikutnya**: tautan ke modul seri berikutnya dan ke modul OSN
   (jembatan, bagian 3).

Contoh kode:

- **Jalur A (C++17):** blok ` ```cpp `. Blok ini ikut diperiksa oleh
  `bun run check:module-code` (`g++ -std=c++17 -fsyntax-only`).
- **Jalur B (TypeScript):** blok ` ```ts `. **Catatan:**
  `check:module-code` hanya mengompilasi blok ` ```cpp ` di
  `content/**/modules/*.md`. Blok TypeScript tidak diperiksa otomatis; penulis
  wajib menjalankannya sendiri (`bun`) sebelum modul diajukan, dan modul
  menyebut bahwa pemeriksaan itu manual. Menambah pemeriksaan TS otomatis
  adalah pekerjaan terpisah di luar issue ini (pertanyaan terbuka 2).
- Konsep dan latihan kertas **bebas bahasa**; kode adalah lapisan tambahan,
  sehingga modul tetap berguna bagi siswa yang belum atau tidak memakai satu
  bahasa tertentu.
- Modul 1 sampai 3 dipakai pada minggu-minggu awal kelas X sehingga seluruh
  bagian pokoknya harus dapat dikerjakan **tanpa menulis kode**; bagian kode
  ditandai opsional.
- Latihan memakai data sintetis dan jelas palsu; modul tidak meminta data
  pribadi.

## 6. Kebutuhan skema indeks (`src/schema/module.ts`)

Aturan repo: **skema dulu, lalu data** (AGENTS.md). Indeks
`data/sma-coding/modules.json` belum ada. Bagian ini menganalisis apa yang
harus diperluas agar modul sma-coding dapat diindeks. Pembacaan dilakukan
pada `src/schema/module.ts` dan `src/domain/modules.ts`.

### 6.1 Analisis keterbatasan skema sekarang

| Aspek | Perilaku sekarang | Dampak untuk sma-coding |
| --- | --- | --- |
| `topicFamilies` | wajib, minimal satu id slug; id dicek terhadap `topic-families.json` program itu | `data/sma-coding/` tidak punya `topic-families.json`, sehingga cek rumpun dilewati diam-diam. Modul seri tidak "mencakup rumpun materi OSN"; ia hanya **menjembatani** ke rumpun (bagian 3). Mengisinya dengan id rumpun OSN lolos skema tetapi bermakna keliru dan tidak diperiksa. |
| `weeks` | larik bilangan bulat 1 sampai `MAX_WEEK` (nomor minggu OSN); dicek terhadap `weeks.json` OSN | Kode minggu sma-coding berbentuk string (`A-X1-M9`) dan tidak dapat diungkapkan. `weeks.json` sma-coding gagal diurai oleh skema minggu OSN, sehingga cek minggu dilewati diam-diam. |
| Butir CP | tidak ada bidang | Pemetaan ke butir CP (kode `E-BK-a`) tidak dapat dicatat. |
| Kelas sasaran, prasyarat | tidak ada bidang | Tidak dapat dicatat; relasi prasyarat antarmodul seri berguna untuk urutan belajar. |
| `references` | minimal satu; `refId` dicek bila program punya `references.json` | `data/sma-coding/` tidak punya `references.json`; hanya bentuk `{title, url https}` yang berfungsi. Perlu rujukan https yang sah (pertanyaan terbuka 6). |
| `contentPath`, `status`, `review`, `audience`, `language` | siap pakai | Sudah cocok; `contentPath` diperiksa berada di bawah `content/<program>/modules/`. |

Ringkasnya: tanpa perubahan skema, modul seri hanya dapat diindeks dengan
mengisi `topicFamilies` dengan id rumpun OSN dan tanpa `weeks`. Itu
kehilangan pemetaan minggu dan butir CP, dan menyesatkan secara semantik.

### 6.2 Dua opsi

**Opsi 1: perluas skema bersama `moduleSchema`.** `topicFamilies` menjadi
opsional; ditambahkan bidang opsional `cpItems` (larik kode butir CP),
`weekCodes` (larik kode minggu string), `bridgeFamilies` (rumpun OSN yang
dijembatani), `gradeLevels`, dan `prerequisites` (id modul). Aturan silang
"minimal satu dari `topicFamilies` atau `weekCodes`" ditambahkan. Pemeriksaan
referensial per program dikerjakan di `moduleFindings` berdasarkan
`programId`.

**Opsi 2 (Disarankan): skema indeks khusus sma-coding yang berbagi dasar.**
Ekstrak bentuk dasar yang sama (`id`, `title`, `audience`, `language`,
`status`, `review`, `references`, `contentPath`, aturan `review` dan
`contentPath`) ke satu pembangun bersama di `src/schema/module.ts`, tanpa
mengubah perilaku `moduleSchema` OSN. Tambahkan `src/schema/sma-module.ts`
(sejalan dengan pola `src/schema/sma-*.ts`) yang memperluas dasar itu dengan
`cpItems`, `weekCodes`, `bridgeFamilies`, `gradeLevels`, `prerequisites`.
`moduleFindings` memilih skema menurut program, dan pemeriksaan sma-coding
mengacu pada berkas milik program itu sendiri.

Pemeriksaan referensial yang dibutuhkan untuk sma-coding (kedua opsi):

| Bidang | Diperiksa terhadap |
| --- | --- |
| `cpItems` | kode di `data/sma-coding/cp-elements.json` |
| `weekCodes` | kode minggu di `data/sma-coding/weeks.json` |
| `bridgeFamilies` | `familyId` di `data/sma-coding/osn-bridge.json` (sepuluh id; tanpa membaca corpus program lain) |
| `prerequisites` | id modul lain di indeks yang sama; tanpa siklus |
| `gradeLevels` | nilai `X`, `XI`, `XII` |

Penilaian 11 kriteria (1 = lemah, 3 = kuat; penilaian penyusun, bukan
pengukuran):

| Kriteria | Opsi 1: perluas skema bersama | Opsi 2: skema sma-coding berbagi dasar |
| --- | --- | --- |
| Kelebihan | Satu skema; satu jalur validasi; sedikit berkas baru | Skema OSN tidak berubah; bidang sma-coding eksplisit dan wajib bila perlu; selaras pola `sma-*.ts` |
| Kekurangan | `topicFamilies` menjadi opsional untuk OSN juga sehingga aturan OSN melemah; banyak bidang opsional yang hanya berlaku untuk satu program | Dua skema indeks; perlu refaktor kecil untuk dasar bersama |
| Keamanan (privasi, ADR-0004) | 3 (bidang bukan data pribadi) | 3 |
| Performa | 3 | 3 |
| Kemudahan perawatan | 2 (kondisi per program menumpuk di satu skema) | 3 (batas per program jelas) |
| Skalabilitas (jalur C, D) | 2 | 3 (program baru menambah skema sendiri) |
| Aksesibilitas | tidak relevan | tidak relevan |
| Dampak SEO | tidak relevan | tidak relevan |
| UI/UX (penulis dan peninjau konten) | 2 (pesan galat bercampur) | 3 (pesan galat khusus program) |
| Kompatibilitas | 2 (risiko regresi pada 10 modul OSN yang sudah disetujui dan konsumen `student-sheet`, `module-content`) | 3 (OSN tidak tersentuh; `module-content` memakai bentuk dasar) |
| Kompleksitas operasional | 3 | 2 (dua skema, satu refaktor) |
| Implikasi jangka panjang | 2 | 3 (cocok dengan ADR-0006: satu direktori dan skema per program) |

**Rekomendasi: opsi 2.** Alasan utama: modul OSN sudah disetujui sehingga
risiko regresi harus nol, dan pola skema per program sudah menjadi kebiasaan
repo (`sma-*.ts`). Biaya: satu refaktor kecil untuk dasar bersama dan dua
skema yang harus dijaga. Keputusan ada pada pemilik (pertanyaan terbuka 1).

Catatan teknis yang berlaku untuk kedua opsi `[asumsi]`:

- Pekerjaan skema adalah issue terpisah (bagian 8, langkah 2) karena menyentuh
  `src/`, `tests/`, dan kemungkinan dokumen arsitektur; dokumen rancangan ini
  tidak mengubahnya.
- Bila skema memeriksa `weekCodes` terhadap `weeks.json` sma-coding,
  `moduleFindings` sekarang yang mengurai `weeks.json` dengan skema OSN harus
  diperbaiki agar tidak lagi melewati cek itu diam-diam untuk program ini.
- Kode minggu bagian 3 sudah mengikuti v1.1 (diperbarui 2026-11-19);
  `weekCodes` di indeks dan pemetaan di bagian 3 harus dijaga bersama bila
  silabus berubah lagi.
- Pekerjaan skema indeks sma-coding kini dicatat sebagai issue #106.

## 7. Pertanyaan terbuka untuk pemilik

Setiap pertanyaan disajikan orchestrator lewat dialog pilihan baku; rekomendasi
berada di urutan pertama.

**Terjawab 2026-11-19 (komentar keputusan di issue #87):** pemilik
menyetujui rancangan beserta **keenam rekomendasi** (opsi bertanda
"(Disarankan)" di bawah): skema indeks terpisah `src/schema/sma-module.ts`;
contoh C++ diperiksa `g++`, contoh TypeScript diperiksa manual; tujuh modul;
tidak dihitung sebagai pemenuhan CP (hanya mendukung); bahan rujukan guru dan
bacaan mandiri; rujukan *Panduan Mata Pelajaran Informatika, Fase D – F*
(BSKAP, 2025).

1. **[Terjawab 2026-11-19: opsi 2, skema `sma-module` terpisah]** **Skema indeks (bagian 6).**
   - (Disarankan) Opsi 2: skema `sma-module` khusus program yang berbagi
     bentuk dasar; skema OSN tidak berubah.
   - Opsi 1: perluas `moduleSchema` bersama dengan bidang opsional; satu
     skema tetapi berisiko pada modul OSN yang disetujui.
2. **[Terjawab 2026-11-19: C++ diperiksa g++, TypeScript diperiksa manual]** **Bahasa contoh kode.**
   - (Disarankan) Konsep dan latihan bebas bahasa; contoh C++ (diperiksa
     `check:module-code`) dan contoh TypeScript (diperiksa manual, ditandai
     demikian); pemeriksaan TS otomatis diajukan sebagai issue terpisah.
   - Hanya C++ dan pseudocode; siswa jalur B tidak mendapat contoh TS di
     seri (kurang akrab bagi jalur B, tetapi seluruh blok kode terverifikasi).
   - Menambah pemeriksaan TS otomatis lebih dulu sebelum modul ditulis
     (kualitas lebih terjamin, tetapi menunda seri dan menambah cakupan
     issue).
3. **[Terjawab 2026-11-19: tujuh modul]** **Ukuran seri.**
   - (Disarankan) Tujuh modul; "representasi data lanjut" dipecah dua
     (bilangan bertanda; teks, gambar, suara).
   - Enam modul; representasi data lanjut satu modul besar (indeks lebih
     ringkas, modul lebih panjang dan campur topik).
4. **[Terjawab 2026-11-19: tidak dihitung sebagai pemenuhan CP]** **Penghitungan CP.**
   - (Disarankan) Tidak ada modul seri yang dihitung sebagai pemenuhan CP;
     kolom butir CP hanya "mendukung" (konsisten dengan keputusan pemilik
     tentang representasi data dan dengan "tidak menambah minggu wajib").
   - Sebagian modul (mis. pertumbuhan fungsi untuk F-BK-b) boleh dihitung
     sebagai pemenuhan; ini mengubah `cp-mapping.json` dan perlu syarat
     pemakaian di kelas.
5. **[Terjawab 2026-11-19: rujukan guru dan bacaan mandiri]** **Status pemakaian di kelas.**
   - (Disarankan) Bahan rujukan guru dan bacaan mandiri berlatih, tanpa
     jadwal wajib; guru memakainya di minggu yang tertera di bagian 3
     sebagai pendalaman atau pekerjaan rumah.
   - Pengayaan terjadwal di minggu cadangan semester (14 minggu materi + 2
     cadangan, silabus bagian 2); sekolah yang punya cadangan dapat memakainya,
     tetapi mengurangi penyangga kalender.
6. **[Terjawab 2026-11-19: Panduan Informatika 2025 sebagai rujukan dasar]** **Rujukan modul.** Indeks mewajibkan minimal satu rujukan `https`; program
   sma-coding belum punya daftar rujukan.
   - (Disarankan) Rujukan dasar berupa *Panduan Mata Pelajaran Informatika,
     Fase D – F* (BSKAP, 2025; sudah tercatat di silabus bagian 10) untuk
     kerangka; rujukan tambahan hanya yang benar-benar dibuka dan dicek
     penulis, dengan tanggal cek di modul.
   - Menambah `data/sma-coding/references.json` sendiri (dengan skema dan
     tanggal cek) agar rujukan dapat dipakai ulang dan diperiksa; lebih
     rapi tetapi menambah satu berkas corpus yang perlu skema lebih dulu.

## 8. Urutan pengerjaan

Setiap langkah adalah issue atau PR atomik; modul diajukan satu per satu.
Ketergantungan dipetakan sebelum eksekusi (aturan repo).

| Langkah | Isi | Tergantung pada |
| --- | --- | --- |
| 1 | Rancangan ini disetujui pemilik (jawaban pertanyaan 1 sampai 6) dan versinya dicatat | — (selesai 2026-11-19) |
| 2 | Skema dan domain indeks sma-coding (sesuai pertanyaan 1, opsi 2), pengujian, dan pembaruan dokumen arsitektur (`src/`, `tests/`, `docs/architecture/`); dikerjakan di issue #106, belum selesai | 1 |
| 3 | `data/sma-coding/modules.json` kosong atau dengan entri pertama, lolos `osn validate --program sma-coding`; pembaruan `docs/programs/sma-coding/README.md`, README, AGENTS.md, panduan | 2 |
| 4 | Modul `matkom-sistem-bilangan-basis` (draf) | 3 |
| 5 | Modul `matkom-bilangan-bertanda-dan-luapan`, lalu `matkom-teks-gambar-suara` | 4 |
| 6 | Modul `matkom-logika-proposisi` (dapat paralel dengan langkah 4 dan 5 karena tidak bergantung pada modul 1 sampai 3, bila berkasnya terpisah dan indeks diurus berurutan) | 3 |
| 7 | Modul `matkom-himpunan-relasi-fungsi`, lalu `matkom-induksi-dan-rekursi-matematis`, lalu `matkom-pertumbuhan-fungsi` | 6 (dan modul 1 untuk modul pertumbuhan) |
| 8 | Peninjauan ulang pemetaan minggu terhadap silabus v1.1 (#92) | #92 disetujui (selesai: kode minggu diperbarui 2026-11-19, dokumen v0.2.0) |
| 9 | Persetujuan modul oleh pemilik (status `disetujui`) per modul | masing-masing modul |

Aturan per modul: berstatus `draf`; contoh C++ lolos
`bun run check:module-code`; `bun run validate` dan `bun run privacy-check`
lolos; changeset ditambahkan; tidak ada data siswa. Modul berstatus
`disetujui` hanya setelah pemilik memutuskan (ADR-0007); agen tidak pernah
mencatat persetujuan itu.

## 9. Sumber dan batasan

- Kutipan CP, kode butir, kode minggu, dan jembatan OSN diambil dari
  [silabus.md](silabus.md) v1.1 (bagian 1.3, 1.4, 3, 4, 5) dan
  `data/sma-coding/`; dokumen ini tidak memverifikasi ulang sumber luar.
- Isi blok fondasi diambil dari
  [usulan-fondasi-kelas-x.md](usulan-fondasi-kelas-x.md) v0.2.0 (bagian 2 dan
  3), kini diterapkan di [silabus.md](silabus.md) v1.1 bagian 3.0 dan
  `data/sma-coding/foundation.json` (issue #92, disetujui 2026-11-19).
- Isi modul OSN dibaca dari `content/osn/modules/` (`logika-bitwise`,
  `aritmetika`, `aturan-berhitung`, `rekursi`, `dasar-pemrograman`) untuk
  menentukan batas dan jembatan.
- Keterbatasan skema dibaca dari `src/schema/module.ts` dan
  `src/domain/modules.ts` pada commit tahap rancangan ini.
- Pemetaan topik ke minggu, tujuan, isi modul, urutan, dan skor opsi adalah
  rancangan penyusun, bukan data resmi dan bukan pengukuran.
- Rencana belum diuji di kelas. Kode minggu kelas X sudah dipetakan dari v1.0
  ke v1.1 pada 2026-11-19; hasilnya mengikuti padanan `[asumsi]` di silabus
  bagian 3.0, yang disetujui pemilik bersama v1.1.
- Tidak ada materi yang disalin dari sumber luar; seri bersifat karangan
  (ADR-0007).

## Changelog

| Versi | Tanggal | Perubahan |
| --- | --- | --- |
| v0.3.1 | 2026-11-19 | Sinkron dokumen (#124): catatan status; klausa "belum ditulis", "indeks belum ada" dan langkah skema ditandai riwayat. Isi rancangan tidak berubah. |
| v0.3.0 | 2026-11-19 | Status: tujuh modul draf `matkom-*` masuk repositori dan terindeks (PR #116). |
| v0.2.0 | 2026-11-19 | Rancangan disetujui pemilik beserta keenam rekomendasi (issue #87); status, kotak catatan, dan pertanyaan terbuka diperbarui; kode minggu kelas X dipetakan dari v1.0 ke v1.1 (tabel padanan silabus bagian 3.0): `A-X1-M3`→`A-X1-M9`, `A-X2-M2`→`A-X2-M4`, `A-X1-M11`/`M12`→`A-X2-M2`/`M3`, `A-X1-M5`+`M8`→`A-X1-M10`, `A-X1-M9`→`A-X1-M12`, `A-X2-M10`→`A-X2-M11`, `A-X2-M7`→`A-X2-M8`, `A-X2-M11`→`A-X2-M12`, `B-X1-M3`→`B-X1-M9`, `B-X1-M5`+`M8`→`B-X1-M10`, `B-X1-M9`→`B-X1-M12`, `B-X1-M11`→`B-X2-M2`, `B-X2-M2`→`B-X2-M5`; kode kelas XI dan XII tidak berubah; urutan pengerjaan diselaraskan dengan #106. |
| v0.1.0 | 2026-11-18 | Rancangan awal (issue #87, tahap 1): tujuan, tujuh modul dengan pemetaan minggu v1.0 dan butir CP, batas dengan fondasi dan modul OSN, bentuk modul, kebutuhan skema (dua opsi, rekomendasi), urutan pengerjaan, enam pertanyaan terbuka. Status DRAF. |
