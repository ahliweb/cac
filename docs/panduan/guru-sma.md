# Panduan guru SMA (program `sma-coding`)

Untuk guru dan penyelenggara yang memakai silabus pembelajaran coding SMA
kelas X-XII. Prasyarat: [`mulai-cepat.md`](mulai-cepat.md). Di halaman ini
`osn <perintah>` berarti `bun run src/cli/index.ts <perintah>`.

## Status program, jujur apa adanya

| Bagian | Status |
| --- | --- |
| Silabus v1.3: jalur A (C++), jalur B (web JS/TS/Bun, template `awcms-one`), jalur C (IoT dan robotika), jalur D (kecerdasan buatan dan analisis data), jalur E (komputasi kuantum), termasuk blok fondasi kelas X | **Disetujui** pemilik program, 2026-11-19 untuk kelima jalur (v1.3 menambah butir dan kebijakan AI, issue [#139](https://github.com/ahliweb/osn/issues/139); jalur A dan B: v1.1, 2026-11-19; v1.0: 2026-11-18). Menjadi sumber `data/sma-coding/`. |
| Jalur C (IoT dan robotika, C++ gaya Arduino pada ESP32, kelas X-XII) | **Disetujui** v1.2 (issue [#68](https://github.com/ahliweb/osn/issues/68)); dipetakan ke CP lewat prinsip komputasinya. Perangkat dan keselamatan kerja: silabus bagian 3.3. |
| Jalur D (kecerdasan buatan dan analisis data, kelas X-XII) | **Disetujui** v1.2 (issue [#84](https://github.com/ahliweb/osn/issues/84)) sebagai **pengayaan di luar rumusan CP**: tidak dihitung sebagai pemenuhan CP. |
| Jalur E (komputasi kuantum dan cloud quantum, **kelas XI-XII saja**, kode minggu `E-XI1-M1`) | **Disetujui** v1.2 (issue [#88](https://github.com/ahliweb/osn/issues/88)) sebagai **pengayaan di luar rumusan CP**. Tidak ada semester kelas X dan tidak ada blok fondasi. |
| Blok fondasi informatika dasar kelas X (7 minggu, kelas bersama sebelum memilih jalur, kode `FND-X1-M1..M7`) | **Berlaku sejak silabus v1.1** (bagian 3.0). Rencana kelas X semester 1 dan 2 jalur A dan B disusun ulang; tabel padanan nomor minggu v1.0 ke v1.1 ada di bagian 3.0. Dokumen asal: [`usulan-fondasi-kelas-x.md`](../programs/sma-coding/usulan-fondasi-kelas-x.md). |
| Modul materi `sma-coding` (29 modul: fondasi kelas X 6, matematika komputasi 7, cloud 7, pendamping literasi digital 9) | **Tersedia sebagai draf** di `content/sma-coding/modules/`, terindeks di `data/sma-coding/modules.json` (issue [#107](https://github.com/ahliweb/osn/issues/107), [#87](https://github.com/ahliweb/osn/issues/87), [#89](https://github.com/ahliweb/osn/issues/89), [#69](https://github.com/ahliweb/osn/issues/69), [#105](https://github.com/ahliweb/osn/issues/105)). Semuanya berspanduk DRAF sampai pemilik menyetujuinya; baca dengan `osn render modul --program sma-coding --id <id>`. |
| Rencana mingguan | Belum diuji di kelas (silabus bagian 8). Rencana jalur C, D, dan E belum ditinjau guru atau mitra; harga, spesifikasi perangkat, dan ketentuan layanan cloud quantum banyak yang `[belum terverifikasi]`. |

Modul materi untuk jalur C, D, dan E belum ada. Daftar issue terbuka terkini:
`gh issue list -R ahliweb/osn --state open`.

## Membaca silabus

Silabus lengkap: [`docs/programs/sma-coding/silabus.md`](../programs/sma-coding/silabus.md)
(juga bisa dibaca langsung di GitHub, tanpa terminal). Bagian yang paling
berguna bagi guru:

| Bagian | Isi |
| --- | --- |
| 2 | Struktur program: dua semester per kelas, 14 minggu materi per semester, 3 JP x 45 menit per minggu per jalur, pola semester (minggu 1-12 materi, 13 proyek mini, 14 asesmen dan refleksi; pada kelas X semester 1 minggu 1-7 adalah blok fondasi dan minggu jalur mulai dari M8). |
| 3 | Blok fondasi kelas X bersama (3.0, tujuh minggu `FND-X1-M1..M7`, plus padanan nomor minggu v1.0 ke v1.1), lalu rencana mingguan jalur A (3.1), B (3.2), C (3.3), D (3.4), dan E (3.5), serta ringkasan kelima jalur (3.6): tiap minggu punya topik, tujuan, keluaran, latihan. |
| 4 | Pemetaan butir Capaian Pembelajaran (CP) ke minggu (jalur A, B, C); irisan jalur D dan E yang berada di luar CP dan tidak dihitung (4.5). |
| 5 | Jembatan jalur A (5.1) dan jalur C (5.2) ke pembinaan OSN; jalur D dan E tidak punya jembatan (5.3). |
| 7 | Asesmen, kebutuhan lab, privasi. |
| 9 | Keputusan pemilik atas pertanyaan terbuka. |

Cara membaca kode: kode minggu `A-X1-M10` = jalur A, kelas X, semester 1,
minggu 10. Pada v1.1 kelas X semester 1 dibuka dengan blok fondasi
`FND-X1-M1..M7` (bersama untuk semua jalur), sehingga minggu jalur kelas X
semester 1 dimulai dari `M8`; nomor `M<n>` di sana adalah nomor minggu
kalender semester, dan tidak sama maknanya dengan v1.0 (lihat padanan di
bagian 3.0). Kode butir CP `E-BK-a` = Fase E, elemen Berpikir Komputasional,
butir a. Awalan `E-` dipakai dua hal yang berbeda: kode minggu jalur E
(`E-XI1-M3`, selalu memuat kelas dan diakhiri `M<n>`) dan kode butir CP Fase E
(`E-BK-a`, elemen dua huruf). Jalur E hanya kelas XI dan XII. Tanda `[asumsi]` berarti keputusan perancangan penyusun;
`[belum terverifikasi]` berarti belum dipastikan dari sumber resmi dan tidak
boleh diperlakukan sebagai fakta.

Murid memilih satu jalur dan boleh mengambil jalur lain bila waktu sekolah
mengizinkan (keputusan pemilik, bagian 9).

## Memvalidasi data program

```sh
osn validate --program sma-coding
```

```text
osn validate: programme "sma-coding", corpus at /.../data/sma-coding
OK -- 7 data file(s) validated, 0 problem(s) found.
```

Memeriksa tujuh berkas di `data/sma-coding/`: 6 kutipan CP, 36 butir CP,
26 pemetaan dan 9 irisan jalur pengayaan (D dan E), lima jalur (A-D: enam
semester; E: empat semester kelas XI-XII; minggu 1-14, khusus kelas X semester 1
minggu jalur 8-14; 364 minggu seluruh jalur), tujuh minggu fondasi
`FND-X1-M1..M7`, serta rujukan antar-kode. Exit 0 bersih, 1 ada temuan, 2 salah pakai.

Apakah data masih sama persis dengan tabel di `silabus.md`:

```sh
bun run check:sma-fidelity
```

```text
$ bun run scripts/check-sma-coding-fidelity.ts
check-sma-coding-fidelity: OK -- every cell of data/sma-coding/*.json matches docs/programs/sma-coding/silabus.md.
```

## Rencana per semester dan lembar siswa

Dua perintah menurunkan keluaran **hanya** dari corpus `data/sma-coding/`
yang lolos validasi (keputusan pemilik 2026-11-18, issue
[#77](https://github.com/ahliweb/osn/issues/77)).

**Rencana per semester satu jalur:**

```sh
osn plan --program sma-coding --track A --semester X1
```

`--track` wajib (`A`, `B`, `C`, `D`, atau `E`). `--kelas X|XI|XII` memilih dua
semester satu kelas, `--semester` memilih satu semester (`X1`, `X2`, `XI1`,
`XI2`, `XII1`, `XII2`), tanpa keduanya keluar semua semester jalur itu (enam;
jalur E empat). Jalur E tidak punya semester kelas X, sehingga `--track E
--kelas X` ditolak dengan exit 2. Untuk jalur D dan E keluaran memuat catatan
pengayaan di luar CP dan, per minggu, irisan dengan butir CP yang tidak dihitung
sebagai pemenuhan. `--json` memberi data
yang sama untuk diolah program. Kelas X semester 1 diawali blok fondasi
bersama `FND-X1-M1..M7` (sama untuk semua jalur), baru minggu jalur M8-M14.
Tiap minggu memuat kode, topik, tujuan, keluaran, latihan, butir CP yang
dipetakan, dan jembatan OSN (jalur A dan C) bila ada. Bagian awal keluaran nyata:

```text
# Rencana Pembelajaran -- Jalur A: Algoritmik dengan C++

Program: Silabus Pembelajaran Coding SMA
Cakupan: semester X1
Sumber: silabus versi 1.3.1, tanggal 2026-11-19.

## Semester X1 (kelas X, fase E)

### Blok fondasi bersama (FND-X1-M1..FND-X1-M7): untuk semua murid sebelum memilih jalur

#### FND-X1-M1 -- Komputer dan perangkat keras; model Input-Proses-Output Von Neumann

- **Tujuan:** menyebut fungsi komponen (CPU, memori, penyimpanan, perangkat masukan dan keluaran, papan induk, catu daya); menjelaskan dan menyimulasikan siklus I-P-O komputer Von Neumann; membaca spesifikasi perangkat
- **Keluaran:** diagram I-P-O beranotasi; lembar spesifikasi komputer lab
- **Latihan:** kegiatan utama: simulasi I-P-O tanpa komputer (murid berperan CPU, memori, dan perangkat masukan/keluaran menjalankan kartu instruksi sederhana); membaca spesifikasi komputer lab lewat informasi sistem; mengenali komponen dari foto; opsional bila lab menyediakan komponen bekas: mengenali komponen dari komponen bekas (perangkat yang masih dipakai tidak dibongkar)
- **Butir CP:** E-BK-e (model Input-Process-Output Von Neumann dan peran sistem operasi)

...

### Minggu jalur A

#### A-X1-M8 -- Lingkungan g++, algoritma, pseudocode, diagram alir

- **Tujuan:** mengompilasi program pertama; menulis solusi sederhana dalam pseudocode
- **Keluaran:** `hello.cpp`; 3 pseudocode
- **Latihan:** cetak teks; tukar dua nilai; cari nilai terbesar dari tiga
- **Butir CP:** E-BK-d (solusi program sederhana dalam format pseudocode)

#### A-X1-M9 -- Variabel, tipe data, ekspresi; masukan dan keluaran

- **Tujuan:** memilih tipe (`int`, `long long`, `double`, `char`, `bool`) dan menulis ekspresi; membaca dan menulis data dengan `cin`/`cout`
- **Keluaran:** program hitung berformat
- **Latihan:** luas dan keliling; pembagian bulat dan sisa; konversi suhu; rata-rata dua bilangan
- **Butir CP:** E-BK-d (solusi program sederhana dalam format pseudocode)
- **Jembatan OSN:** dasar-pemrograman -- sintaks C++, variabel, I/O, percabangan, perulangan, fungsi. Catatan: Sesuai CP.

...
```

**Lembar siswa satu minggu**, untuk dibagikan atau dicetak:

```sh
osn render lembar-siswa --program sma-coding --week A-X1-M9 --out lembar-A-X1-M9.md
```

`--week` berisi kode minggu: minggu jalur (`A-X1-M9`, `C-X1-M8`, `D-XI1-M5`,
`E-XI2-M12`) atau minggu fondasi (`FND-X1-M3`). Kode yang tidak dikenal ditolak dengan exit 2 dan daftar
contoh kode yang sah. Lembar tidak memuat kolom nama atau sekolah. Bila ada
modul di `data/sma-coding/modules.json` yang mencantumkan minggu itu, id,
judul, dan statusnya ikut disebut; modul yang belum disetujui diberi tanda
**DRAF**. Keluaran nyata untuk `A-X1-M9`:

```text
# Lembar Belajar Siswa -- Minggu A-X1-M9

**Kode minggu:** A-X1-M9

**Posisi:** Jalur A -- Algoritmik dengan C++ (kelas X, semester X1, minggu 9)

**Topik:** Variabel, tipe data, ekspresi; masukan dan keluaran

## Tujuan
memilih tipe (`int`, `long long`, `double`, `char`, `bool`) dan menulis ekspresi; membaca dan menulis data dengan `cin`/`cout`

## Keluaran
program hitung berformat

## Latihan dan kegiatan
luas dan keliling; pembagian bulat dan sisa; konversi suhu; rata-rata dua bilangan

## Butir CP terkait
- E-BK-d: solusi program sederhana dalam format pseudocode

**Kutipan CP, Berpikir Komputasional (Fase E):**

> Pada akhir fase E, murid mampu memahami konsep struktur data dan algoritma standar; menerapkan proses komputasi yang dilakukan manusia secara mandiri atau berkelompok untuk mendapatkan data yang berkualitas; menerapkan algoritma dan struktur data standar untuk menghasilkan berbagai solusi dalam menyelesaikan persoalan; menuliskan solusi rancangan program sederhana dalam format pseudocode yang dekat dengan bahasa komputer; memahami model dan menyimulasikan dinamika Input-Process-Output dalam sebuah komputer Von Neumann, serta memahami peran sistem operasi.

## Jembatan ke OSN
- dasar-pemrograman: sintaks C++, variabel, I/O, percabangan, perulangan, fungsi. Catatan: Sesuai CP.

## Daftar periksa mandiri
- [ ] memilih tipe (`int`, `long long`, `double`, `char`, `bool`) dan menulis ekspresi
- [ ] membaca dan menulis data dengan `cin`/`cout`
- [ ] Keluaran selesai: program hitung berformat

---
Sumber: Silabus Pembelajaran Coding SMA, versi 1.3.1, tanggal 2026-11-19.
```

Untuk minggu jalur pengayaan (D atau E) lembar menyatakan bahwa jalur itu di
luar rumusan CP dan memuat bagian **Irisan dengan CP (pengayaan, tidak dihitung
pemenuhan CP)** sebagai ganti pemetaan, tanpa kutipan CP. Bagian tengah keluaran
nyata untuk `D-XI1-M5`:

```text
## Butir CP terkait
Jalur D adalah pengayaan di luar rumusan CP; minggu jalur ini tidak dihitung sebagai pemenuhan butir CP mana pun.

## Irisan dengan CP (pengayaan, tidak dihitung pemenuhan CP)
- F-AD-a: sumber data terbuka, terpercaya, legal untuk keputusan dan prediksi. Tingkat irisan: **Irisan terdekat.** Sedang: rumusan menyebut "prediksi" dan "tanpa atau dengan komputer", tetapi tidak menyebut AI atau pembelajaran mesin.
```

Contoh penolakan (exit 2) untuk jalur E di kelas X:

```sh
osn plan --program sma-coding --track E --kelas X
```

```text
osn plan: jalur E tidak memiliki semester X1: jalur ini dimulai di kelas XI.
```

## Yang BELUM didukung alat

`render weekly`, `render checkpoint`, `render sop`, `report`, dan `checklist`
membaca corpus OSN saja. Bila diberi `--program sma-coding`, semuanya menolak
dengan exit 2 supaya data OSN tidak tampil seolah-olah data program SMA
(keputusan pemilik 2026-11-18: perintah-perintah ini memang tidak didukung
untuk program ini). Contoh (exit 2):

```sh
osn render weekly --week 1 --program sma-coding
```

```text
osn render weekly: belum didukung untuk program sma-coding: perintah ini membaca corpus OSN (program "osn") saja dan tidak akan menyajikannya sebagai data sma-coding. Untuk program sma-coding tersedia "osn plan --program sma-coding --track <jalur>", "osn render lembar-siswa --program sma-coding --week <kode-minggu>", "osn render modul --program sma-coding --id <id>", "osn validate --program sma-coding" dan "bun run check:fidelity --program sma-coding".
```

Program ini punya perintah baca modul, tetapi selama
`data/sma-coding/modules.json` belum ada, `osn render modul --id <id> --program
sma-coding` exit 2 dengan pesan `this programme has no modules.json`.

Setelah sebuah modul diindeks, bacalah dengan:

```sh
osn render modul --id <id-modul> --program sma-coding
```

Keluarannya memuat judul, spanduk status (modul yang belum `disetujui`
diawali spanduk DRAF atau DITARIK), isi modul, bagian Rujukan, dan catatan
status serta program di bagian bawah. `osn validate --program sma-coding`
ikut memeriksa indeks modul itu: butir CP, kode minggu (termasuk blok
fondasi `FND-...`), rumpun OSN yang dijembatani, prasyarat (tanpa siklus),
dan keberadaan berkas isi.

Untuk sementara, bahan ajar SMA adalah `silabus.md` itu sendiri dan data
JSON di bawah ini.

## Memakai data `data/sma-coding/*.json`

| Berkas | Isi |
| --- | --- |
| `weeks.json` | 364 minggu jalur (A-D: 77 masing-masing; E: 56): id, jalur, kelas, semester, topik, tujuan, keluaran, latihan. |
| `foundation.json` | 7 minggu blok fondasi kelas X bersama (`FND-X1-M1..M7`), bentuk sama dengan `weeks.json` tanpa jalur. |
| `tracks.json` | Lima jalur: nama, bahasa/alat, kelas mulai (`startClass`), hubungan dengan CP (`cpStatus`: `dalam-cp` atau `pengayaan`), status persetujuan. |
| `structure.json` | Struktur program dan beban (sesi per minggu, JP). |
| `cp-elements.json` | Kutipan CP dan 36 butir berkode. |
| `cp-mapping.json` | Butir CP ke minggu dan jalur (`partialTracks`: jalur yang berstatus parsial); `enrichmentLinks`: irisan jalur D dan E dengan CP, tidak dihitung. |
| `osn-bridge.json` | Jembatan jalur A ke rumpun materi OSN; `trackBridges`: jembatan sebagian untuk jalur C. |

Contoh dengan `jq` (opsional; alternatif `bun` di bawah).

Satu minggu tertentu (jalur A, kelas X, semester 1, minggu 10):

```sh
jq '.weeks[] | select(.id=="A-X1-M10")' data/sma-coding/weeks.json
```

```json
{
  "id": "A-X1-M10",
  "track": "A",
  "kelas": "X",
  "semester": "X1",
  "semesterCode": "A-X1",
  "phase": "E",
  "week": 10,
  "topic": "Percabangan dan logika Boolean",
  "objective": "memakai `if`/`else`, `switch`; menyusun tabel kebenaran; memakai `&&`, `||`, `!`, XOR",
  "output": "program bercabang; tabel kebenaran",
  "exercise": "genap/ganjil; kategori nilai (data sintetis); sederhanakan kondisi; implikasi sebagai kondisi"
}
```

Seluruh semester jalur B kelas X semester 1 (minggu jalur 8-14; minggu 1-7 adalah blok fondasi):

```sh
jq -r '.weeks[] | select(.track=="B" and .semesterCode=="B-X1") | "\(.id)\t\(.topic)"' data/sma-coding/weeks.json
```

```text
B-X1-M8	Lingkungan kerja: peramban, editor, Bun, Git; algoritma dan pseudocode
B-X1-M9	Variabel, tipe, ekspresi (JS); masukan dan keluaran
B-X1-M10	Percabangan dan logika Boolean
...
B-X1-M14	Asesmen dan refleksi
```

Tanpa `jq`, dengan Bun saja (keluaran sama):

```sh
bun -e 'const d=await Bun.file("data/sma-coding/weeks.json").json(); console.log(d.weeks.filter(w=>w.track==="B"&&w.semesterCode==="B-X1").map(w=>w.id+"  "+w.topic).join("\n"))'
```

Minggu mana yang menyentuh butir CP `E-BK-a`:

```sh
jq -r '.mappings[] | select(.cpCode=="E-BK-a") | .weeksText' data/sma-coding/cp-mapping.json
```

```text
A-X2-M6..M10; B-X2-M7..M9
```

Rumpun materi OSN yang berpadanan dengan minggu jalur A:

```sh
jq -r '.bridges[] | "\(.familyId)\t\(.weeksText)"' data/sma-coding/osn-bridge.json
```

```text
dasar-pemrograman	A-X1-M9..M12
logika-bitwise	A-X1-M10; A-XI1-M3
aritmetika	A-X2-M4..M5; A-XII1-M8
...
```

Tujuh minggu blok fondasi kelas X (bersama untuk semua jalur):

```sh
jq -r '.weeks[] | "\(.id)\t\(.topic)"' data/sma-coding/foundation.json
```

```text
FND-X1-M1	Komputer dan perangkat keras; model Input-Proses-Output Von Neumann
FND-X1-M2	Perangkat lunak, sistem operasi, berkas, dan lisensi
FND-X1-M3	Representasi data: biner, heksadesimal, teks, gambar sederhana
...
FND-X1-M7	Perangkat pengolah dokumen, lembar kerja, dan presentasi `[asumsi]`
```

Beban jam dan status jalur:

```sh
jq '.load' data/sma-coding/structure.json
jq -r '.tracks[] | "\(.id)\t\(.name)\t\(.approvalStatus)"' data/sma-coding/tracks.json
```

```text
{
  "sessionsPerWeek": 1,
  "jpPerSession": 3,
  "minutesPerJp": 45
}
A	Algoritmik dengan C++	disetujui
B	Web dengan JavaScript, TypeScript, dan Bun	disetujui
```

Jangan menyunting berkas `data/` untuk mengubah isi silabus. Perubahan
silabus mengikuti alur di [`pemilik-peninjau.md`](pemilik-peninjau.md).

## Kebutuhan lab (silabus bagian 7.2, berstatus `[asumsi]`)

| Jalur | Perangkat |
| --- | --- |
| A | Komputer dengan g++ (C++17 atau lebih baru), editor, terminal; tanpa internet pun memadai. |
| B | Komputer dengan Bun (versi mengikuti `awcms-one`, saat ini 1.4.4), Node tidak wajib, peramban modern, Git, editor; akses internet untuk paket. |
| B (opsi 1 kelas XII) | Satu atau beberapa mesin lab yang mampu menjalankan Docker dan PostgreSQL; spesifikasi minimum belum terverifikasi. |
| C | ESP32 DevKit (satu per kelompok tiga murid), komputer lab dengan kompiler C++ dan alat unggah, komponen elektronik dasar, daya USB atau baterai bertegangan rendah (tanpa listrik jaringan); jaringan lab terpisah dan penengah pesan lokal di komputer guru untuk kelas XI semester 2. Sekolah tanpa perangkat: set dipinjamkan mitra bergilir. |
| D | Komputer lab dengan Orange Data Mining (kelas X); Python dengan `pandas` dan `scikit-learn` mulai kelas XI; spesifikasi minimum menunggu survei lab. Pemakaian AI generatif oleh murid bebas dengan etika (silabus bagian 7.4); murid tidak wajib punya akun pribadi. |
| E | Peramban untuk Quirk; C++ (jalur A) atau Bun (jalur B) untuk simulator buatan sendiri; demonstrasi guru dengan Python dan Qiskit serta, bila ada, satu akun sekolah atau lembaga untuk cloud quantum. |
| Umum | Akun uji sintetis; tanpa akun pribadi siswa wajib. |

Penyiapan: lingkungan jalur A dan B oleh guru dan sekolah; lingkungan
`awcms-one` (Docker/PostgreSQL) dan perangkat IoT jalur C dibantu mitra
penyelenggara (keputusan pemilik). Aturan keselamatan kerja jalur C disusun dan
diaudit mitra, ditinjau pemilik (silabus bagian 3.3 dan 9.3).

## Privasi

- Program ini tidak menyimpan data siswa, dan repositori ini tidak memuat
  data pribadi pembelajar (ADR-0004).
- Contoh data di silabus bersifat sintetis. Latihan kata sandi dan privasi
  memakai akun uji, bukan akun pribadi siswa.
- Proyek web siswa (formulir kontak dan sejenisnya) tidak boleh mengumpulkan
  data pribadi nyata; rahasia dan berkas `.env` tidak boleh di-commit.
- Hasil kerja dan nilai siswa Anda simpan di sistem sekolah, bukan di sini.

## Kebijakan penggunaan AI (silabus v1.3)

Murid SMA di semua jalur boleh memakai AI generatif **dengan etika** (keputusan
pemilik 2026-11-19, issue #139); ini menggantikan aturan lama jalur D bahwa
layanan AI hanya didemonstrasikan guru. Aturan lengkapnya ada di silabus
bagian 7.4. Ringkasnya untuk guru:

- Murid mencatat pemakaian AI (alat, tujuan, garis besar perintah, bagian yang
  dipakai, cara memverifikasi); log bersifat sintetis dan tidak disimpan di
  repositori ini.
- Tanpa AI: asesmen sumatif, kuis kode, latihan terpadu dan kontes mini jalur
  A (`A-XII2-M5..M8`), dan tugas yang Anda tandai "tanpa AI" di awal tugas.
- Tidak menaruh data pribadi, kata sandi, kunci, atau rahasia pada permintaan
  ke layanan AI.
- Kode buatan AI dibaca, dijalankan, dan diuji; murid harus dapat menjelaskan
  kode yang ia serahkan.
- Pemakaian tunduk pada usia minimum dan ketentuan tiap layanan serta izin
  sekolah dan orang tua; Anda memeriksanya lebih dulu (belum diverifikasi
  penyusun). Murid tidak wajib punya akun pribadi.
