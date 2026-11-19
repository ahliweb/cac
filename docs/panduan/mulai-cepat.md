# Mulai cepat

Halaman ini membawa Anda dari nol sampai bisa menjalankan `osn` dan
memastikan data kurikulum valid. Butuh sekitar lima menit.

## Prasyarat

| Kebutuhan | Untuk apa | Catatan |
| --- | --- | --- |
| [Bun](https://bun.sh) 1.4.4 | Menjalankan semua perintah. | Versi yang dipakai CI (`.github/workflows/ci.yml`). Cek dengan `bun --version`. |
| Git | Mengambil repositori. | Tidak perlu bila Anda hanya menerima berkas hasil cetak dari mentor. |
| `g++` | Hanya untuk `bun run check:module-code`, yang memeriksa contoh C++ di modul bisa dikompilasi. | Tidak perlu untuk `osn validate`, `plan`, `render`, `report`. Hanya perintah itu yang membutuhkannya. |
| `jq` (opsional) | Membaca berkas JSON di `data/` dari terminal (dipakai di [`guru-sma.md`](guru-sma.md)). | Alternatif tanpa `jq` juga ditunjukkan di sana. |

```text
$ bun --version
1.4.4
$ g++ --version | head -1
g++ (Ubuntu 13.3.0-6ubuntu2~24.04.1) 13.3.0
```

## 1. Ambil repositori dan pasang dependensi

```sh
git clone https://github.com/ahliweb/osn.git
cd osn
bun install --frozen-lockfile
```

Keluaran `bun install`:

```text
bun install v1.4.4 (38afee6c8)

+ @biomejs/biome@2.5.15
+ @changesets/cli@3.0.3
+ @types/bun@1.4.4
+ typescript@7.0.2
+ zod@4.6.7
```

(`--frozen-lockfile` sama dengan yang dipakai CI: gagal bila `bun.lock` tidak
cocok dengan `package.json`. `bun install` biasa juga bekerja.)

## 2. Pemeriksaan pertama

```sh
bun run validate
```

```text
$ bun run src/cli/index.ts validate
osn validate: programme "osn", corpus at /.../data/osn
OK -- 22 data file(s) validated, 0 problem(s) found.

osn validate: programme "sma-coding", corpus at /.../data/sma-coding
OK -- 8 data file(s) validated, 0 problem(s) found.

osn validate: programme "tk-coding", corpus at /.../data/tk-coding
OK -- 7 data file(s) validated, 0 problem(s) found.

osn validate: programme "kuliah-coding", corpus at /.../data/kuliah-coding
OK -- 6 data file(s) validated, 0 problem(s) found.

osn validate: programme "dewasa-coding", corpus at /.../data/dewasa-coding
OK -- 8 data file(s) validated, 0 problem(s) found.

osn validate: programme "sd-coding", corpus at /.../data/sd-coding
OK -- 5 data file(s) validated, 0 problem(s) found.

osn validate: programme "smp-coding", corpus at /.../data/smp-coding
OK -- 7 data file(s) validated, 0 problem(s) found.
```

Exit code 0 berarti ketujuh program lolos. Exit 1 berarti ada temuan (daftar
lengkap dicetak, dikelompokkan per berkas); exit 2 berarti salah pakai
(mis. nama program tidak dikenal).

Pemeriksaan kedua, memastikan tidak ada kunci berbentuk data pribadi di `data/`:

```sh
bun run privacy-check
```

```text
$ bun run src/cli/index.ts privacy-check
osn privacy-check: scanning /.../data
OK -- 65 file(s) scanned, 0 direct-identifier-shaped key(s) found.
```

## 3. Cara menjalankan `osn`

Cara yang terbukti bekerja:

```sh
bun run src/cli/index.ts <perintah> [opsi]
```

Contoh versi:

```text
$ bun run src/cli/index.ts --version
2.4.0
```

Bentuk pendek `bun src/cli/index.ts ...` juga bekerja (keluaran sama). Dua
cara yang **tidak** bekerja, supaya Anda tidak buang waktu:

| Perintah | Hasil |
| --- | --- |
| `./src/cli/index.ts --version` | `Permission denied`, exit 126 (berkas tidak executable). |
| `bunx osn --version` | Mengunduh paket npm lain bernama `osn` yang tidak ada hubungannya, lalu gagal (exit 1). Jangan dipakai. |

Pada panduan ini, `osn <perintah>` adalah singkatan dari
`bun run src/cli/index.ts <perintah>`. Beberapa perintah punya pintasan di
`package.json`: `bun run validate` dan `bun run privacy-check`.

## 4. Melihat bantuan

```sh
bun run src/cli/index.ts --help
```

```text
osn -- OSN Informatika 2026 curriculum CLI

Usage: osn <command> [options]

Commands:
  validate        Validate the corpus of one (--program) or every registered programme.
  plan            Generate the dated 28-week cohort calendar from a start date.
  render          Render Markdown artefacts (weekly plan, checkpoint sheet, SOP card, student learner sheet, learning module).
  report          Compute the §6.3 mentor KPI dashboard from a learning-record file.
  privacy-check   Scan data/ recursively for direct-identifier-shaped keys (GR-04 governance control).
  checklist       Render the §14.1 cohort readiness checklist and §14.2 operational rules.
...
```

Bantuan per perintah: `bun run src/cli/index.ts <perintah> --help`, misalnya
`bun run src/cli/index.ts plan --help`. Teks bantuan berbahasa Inggris.

Kode keluar yang berlaku di semua perintah:

| Kode | Arti |
| --- | --- |
| 0 | Berhasil. |
| 1 | Pemeriksaan menemukan masalah (mis. data tidak valid, berkas rekaman berisi data pribadi). |
| 2 | Salah pakai: perintah atau opsi tidak dikenal, argumen wajib hilang, nilai di luar rentang. |

## Berikutnya

Pilih halaman sesuai peran Anda di [`README.md`](README.md).
