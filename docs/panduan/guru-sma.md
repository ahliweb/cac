# Panduan guru SMA (program `sma-coding`)

Untuk guru dan penyelenggara yang memakai silabus pembelajaran coding SMA
kelas X-XII. Prasyarat: [`mulai-cepat.md`](mulai-cepat.md). Di halaman ini
`osn <perintah>` berarti `bun run src/cli/index.ts <perintah>`.

## Status program, jujur apa adanya

| Bagian | Status |
| --- | --- |
| Silabus v1.1, jalur A (C++) dan jalur B (web JS/TS/Bun, template `awcms-one`), termasuk blok fondasi kelas X | **Disetujui** pemilik program, 2026-11-19 (v1.0: 2026-11-18). Menjadi sumber `data/sma-coding/`. |
| Jalur C (IoT/robotika) | Masih disusun, issue [#68](https://github.com/ahliweb/osn/issues/68). Belum ada berkasnya. |
| Jalur D (AI) | Masih disusun, issue [#84](https://github.com/ahliweb/osn/issues/84). |
| Jalur E (komputasi kuantum dan cloud quantum) | Masih disusun, issue [#88](https://github.com/ahliweb/osn/issues/88). |
| Blok fondasi informatika dasar kelas X (7 minggu, kelas bersama sebelum memilih jalur, kode `FND-X1-M1..M7`) | **Berlaku sejak silabus v1.1** (bagian 3.0). Rencana kelas X semester 1 dan 2 jalur A dan B disusun ulang; tabel padanan nomor minggu v1.0 ke v1.1 ada di bagian 3.0. Dokumen asal: [`usulan-fondasi-kelas-x.md`](../programs/sma-coding/usulan-fondasi-kelas-x.md). |
| Modul pendamping literasi digital | Masih disusun, issue [#69](https://github.com/ahliweb/osn/issues/69). |
| Seri modul matematika komputasi dan cloud | Belum ada, issue [#87](https://github.com/ahliweb/osn/issues/87), [#89](https://github.com/ahliweb/osn/issues/89). |
| Rencana mingguan | Belum diuji di kelas (silabus bagian 8). |

Jangan menganggap jalur C, D, atau E sudah berlaku. Daftar
issue terbuka terkini: `gh issue list -R ahliweb/osn --state open`.

## Membaca silabus

Silabus lengkap: [`docs/programs/sma-coding/silabus.md`](../programs/sma-coding/silabus.md)
(juga bisa dibaca langsung di GitHub, tanpa terminal). Bagian yang paling
berguna bagi guru:

| Bagian | Isi |
| --- | --- |
| 2 | Struktur program: dua semester per kelas, 14 minggu materi per semester, 3 JP x 45 menit per minggu per jalur, pola semester (minggu 1-12 materi, 13 proyek mini, 14 asesmen dan refleksi; pada kelas X semester 1 minggu 1-7 adalah blok fondasi dan minggu jalur mulai dari M8). |
| 3 | Blok fondasi kelas X bersama (3.0, tujuh minggu `FND-X1-M1..M7`, plus padanan nomor minggu v1.0 ke v1.1), lalu rencana mingguan jalur A (3.1) dan jalur B (3.2): tiap minggu punya topik, tujuan, keluaran, latihan. |
| 4 | Pemetaan butir Capaian Pembelajaran (CP) ke minggu. |
| 5 | Jembatan jalur A ke pembinaan OSN. |
| 7 | Asesmen, kebutuhan lab, privasi. |
| 9 | Keputusan pemilik atas pertanyaan terbuka. |

Cara membaca kode: kode minggu `A-X1-M10` = jalur A, kelas X, semester 1,
minggu 10. Pada v1.1 kelas X semester 1 dibuka dengan blok fondasi
`FND-X1-M1..M7` (bersama untuk semua jalur), sehingga minggu jalur kelas X
semester 1 dimulai dari `M8`; nomor `M<n>` di sana adalah nomor minggu
kalender semester, dan tidak sama maknanya dengan v1.0 (lihat padanan di
bagian 3.0). Kode butir CP `E-BK-a` = Fase E, elemen Berpikir Komputasional,
butir a. Tanda `[asumsi]` berarti keputusan perancangan penyusun;
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
26 pemetaan, enam semester per jalur (minggu 1-14; khusus kelas X semester 1
minggu jalur 8-14 sebanyak 154 minggu seluruh jalur), tujuh minggu fondasi
`FND-X1-M1..M7`, serta rujukan antar-kode. Exit 0 bersih, 1 ada temuan, 2 salah pakai.

Apakah data masih sama persis dengan tabel di `silabus.md`:

```sh
bun run check:sma-fidelity
```

```text
$ bun run scripts/check-sma-coding-fidelity.ts
check-sma-coding-fidelity: OK -- every cell of data/sma-coding/*.json matches docs/programs/sma-coding/silabus.md.
```

## Yang BELUM didukung alat

`plan`, `render` (kecuali `render modul`), `report`, dan `checklist` membaca
corpus OSN saja. Bila diberi `--program sma-coding`, semuanya menolak dengan
exit 2 supaya data OSN tidak tampil seolah-olah data program SMA. Dukungannya
dilacak di issue [#77](https://github.com/ahliweb/osn/issues/77). Contoh
(semua exit 2):

```sh
osn render weekly --week 1 --program sma-coding
```

```text
osn render weekly: belum didukung untuk program sma-coding: perintah ini membaca corpus OSN (program "osn") saja dan tidak akan menyajikannya sebagai data sma-coding. Gunakan "osn validate --program sma-coding" untuk memvalidasi corpus program ini.
```

Hal serupa berlaku untuk `osn plan --start 2027-01-11 --program sma-coding`,
`osn render sop`, `osn render checkpoint`, `osn render lembar-siswa`,
`osn report` dan `osn checklist` dengan `--program sma-coding`. Program ini
juga belum punya modul materi: `osn render modul --id <id> --program
sma-coding` exit 2 dengan pesan `this programme has no modules.json`.

Untuk sementara, bahan ajar SMA adalah `silabus.md` itu sendiri dan data
JSON di bawah ini.

## Memakai data `data/sma-coding/*.json`

| Berkas | Isi |
| --- | --- |
| `weeks.json` | 154 minggu jalur: id, jalur, kelas, semester, topik, tujuan, keluaran, latihan. |
| `foundation.json` | 7 minggu blok fondasi kelas X bersama (`FND-X1-M1..M7`), bentuk sama dengan `weeks.json` tanpa jalur. |
| `tracks.json` | Jalur dan status persetujuan. |
| `structure.json` | Struktur program dan beban (sesi per minggu, JP). |
| `cp-elements.json` | Kutipan CP dan 36 butir berkode. |
| `cp-mapping.json` | Butir CP ke minggu dan jalur. |
| `osn-bridge.json` | Jembatan jalur A ke rumpun materi OSN. |

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
| Umum | Akun uji sintetis; tanpa akun pribadi siswa wajib. |

Penyiapan: lingkungan jalur A dan B oleh guru dan sekolah; lingkungan
`awcms-one` (Docker/PostgreSQL) dan perangkat IoT jalur C dibantu mitra
penyelenggara (keputusan pemilik).

## Privasi

- Program ini tidak menyimpan data siswa, dan repositori ini tidak memuat
  data pribadi pembelajar (ADR-0004).
- Contoh data di silabus bersifat sintetis. Latihan kata sandi dan privasi
  memakai akun uji, bukan akun pribadi siswa.
- Proyek web siswa (formulir kontak dan sejenisnya) tidak boleh mengumpulkan
  data pribadi nyata; rahasia dan berkas `.env` tidak boleh di-commit.
- Hasil kerja dan nilai siswa Anda simpan di sistem sekolah, bukan di sini.
