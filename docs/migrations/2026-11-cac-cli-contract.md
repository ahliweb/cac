# Kontrak CLI osn dan Strategi Kompatibilitas cac

## Metadata
- Version: v1.0.0
- Last updated: 2026-11-19
- Status: **Riset dan usulan (DRAF); belum ada keputusan pemilik, belum ada perubahan kode.** Butir bertanda **[KEPUTUSAN PEMILIK]** belum diputuskan.
- Catatan status 2026-11-20 (pascarename, #274): rename in-place `ahliweb/osn` menjadi `ahliweb/cac` selesai 2026-11-20 (ID repo sama); kalimat "rename belum dilakukan" di dokumen ini adalah keadaan sebelum rename. Bukti: [migration log](2026-11-cac-migration-log.md).
- Issue: [#153](https://github.com/ahliweb/osn/issues/153) (bagian epik [#150](https://github.com/ahliweb/osn/issues/150)); mengisi IMP-02 dan IMP-03 pada [matriks dampak](2026-11-cac-impact-matrix.md) dan IDENTITY-CAC-002..005 pada [kontrak kebutuhan](../requirements/identity-cac.md).
- Changeset: Memetakan permukaan CLI saat ini, golden baseline, matriks legacy vs target, dan mengusulkan strategi alias, SemVer, serta uji kontrak F2. Tidak mengubah kode, paket, atau data.
- Basis: commit `3eb5d89` (main), `package.json` versi 2.5.0, Bun 1.4.4.

## 1. Metode
1. Membaca `src/cli/run-cli.ts`, `src/cli/index.ts`, `src/cli/command.ts`, `src/cli/commands/*.ts`, `src/index.ts`, `package.json`, `.github/workflows/ci.yml`, dan tes yang memanggil CLI.
2. Menjalankan CLI sungguhan dari akar repositori dengan `bun run src/cli/index.ts <argumen>` (jalur yang sama dengan skrip `validate` dan `privacy-check` di `package.json`), mencatat exit code, jumlah baris stdout/stderr, dan baris pertama. Hash sha256 (10 karakter pertama) dicatat agar baseline bisa dibandingkan ulang.
3. Menghitung pemakai lewat `grep` pada `docs/`, `README.md`, `AGENTS.md`, `CONTRIBUTING.md`, `tests/`, `scripts/`, dan `.github/`.
4. Batas bukti: tidak ada akses ke consumer di luar repositori (clone lokal, fork, skrip pihak ketiga, GitHub Actions eksternal). Itu dicatat sebagai **tidak diketahui** dan menjadi tugas issue F1/01 (inventaris consumer), bukan dikarang di sini.

## 2. Inventaris permukaan CLI saat ini

### 2.1 Titik masuk dan nama
| Butir | Nilai (bukti) |
| --- | --- |
| `package.json` `name` | `kurikulum-informatika`, `private: true`, `version` 2.5.0 |
| `package.json` `bin` | satu entri: `osn` → `src/cli/index.ts` (berkas `#!/usr/bin/env bun`, mode `-rw-rw-r--`, tidak executable; bin dijalankan lewat Bun) |
| Skrip yang memanggil CLI | `validate` = `bun run src/cli/index.ts validate`; `privacy-check` = `bun run src/cli/index.ts privacy-check`. Tidak ada skrip `osn`. |
| Dispatcher | `runCli(argv, io)` di `src/cli/run-cli.ts`; tidak memanggil `process.exit`; `src/cli/index.ts` hanya membungkusnya (blok `import.meta.main`) |
| Registri perintah | `src/cli/commands/index.ts`: `validate`, `plan`, `render`, `report`, `privacy-check`, `checklist` (urutan ini juga urutan di help) |
| Program default | Semua perintah berprogram memakai `osn` bila `--program` tidak diberikan, **kecuali `validate` tanpa `--program` yang memvalidasi semua program terdaftar** (dan `validate --data-dir` yang mengimplikasikan `osn`) |
| Program terdaftar | `osn, sma-coding, tk-coding, kuliah-coding, dewasa-coding, sd-coding, smp-coding` (pesan galat `unknown programme`) |
| API publik pustaka | `src/index.ts` mengekspor `CURRICULUM_SOURCE` dan `packageInfo = { name: "kurikulum-informatika", source }`; `tests/unit/smoke.test.ts` menegaskan `packageInfo.name === package.json name`. `bun run build` hanya membundel `src/index.ts` (CLI tidak ikut `dist/`). |

### 2.2 Aturan dispatcher (`run-cli.ts`)
| Aturan | Perilaku |
| --- | --- |
| `--version` / `-V` di posisi mana pun | cetak `package.json` version + newline ke stdout, exit 0; berprioritas atas semua (bahkan `--version bogus`) |
| Tanpa token non-flag | `--help`/`-h` → usage global ke stdout, exit 0; selain itu usage global ke **stderr**, exit 2 |
| Subperintah = token non-flag **pertama** di argv | akibat: flag bernilai sebelum subperintah (`--program osn validate`) membuat `osn` dianggap subperintah, exit 2 (diamati) |
| Subperintah tak dikenal | stderr `osn: unknown command "<x>". Valid commands: ... Run "osn --help" for usage.`, exit 2 |
| `--help`/`-h` bersama subperintah | help perintah ke stdout, exit 0 |
| `--json` | dikenali global (sebelum atau sesudah subperintah), dibuang dari argumen perintah, diteruskan sebagai `ctx.json` |
| Pengecualian tak tertangkap | stderr `osn <command>: unexpected error: <pesan>`, exit **1** |
| Flag tak dikenal | **tidak seragam**: `privacy-check` exit 2 (`unrecognised argument`), `validate --bogus` diabaikan diam-diam (exit 0, diamati) |

### 2.3 Perintah, flag, dan dukungan `--json`
| Perintah | Flag/argumen (dari teks help) | `--json` / `--format` | Exit 0 / 1 / 2 |
| --- | --- | --- | --- |
| `validate` | `--program <id>`, `--data-dir <path>`, `--json` | `--json`: tanpa `--program` → `{ok, programs}`; dengan `--program` → `{program, ok, findings, summary}` | 0 bersih; 1 ada temuan audit; 2 program tak dikenal / `--program` tanpa nilai / direktori tak terbaca |
| `plan` | `--start <YYYY-MM-DD>` (osn), `--exclude`, `--target-stage`, `--track/--kelas/--semester` (sma-coding), `--format md\|json`, `--program` (tanpa `--out`) | `--json` setara `--format json` | 0; 2 untuk argumen salah atau program yang belum didukung; 1 galat tak terduga |
| `render` | `weekly --week`, `checkpoint --number`, `sop`, `lembar-siswa --week`, `modul --id [--program] [--lembar]`, `--out`, `--force`, `--program` | tidak ada format JSON; `--json` dibuang tanpa efek (diamati: `render weekly --week 1 --json` tetap Markdown, exit 0) | 0; 1 bila korpus sma-coding gagal validasi atau lembar `--lembar` memuat nama/identitas; 2 salah pakai, `--out` ada tanpa `--force` |
| `report` | `--records <path>` (wajib), `--by none\|topic\|week`, `--format md\|json`, `--out`, `--force`, `--program` | `--json`/`--format json` | 0; 1 pelanggaran privasi / catatan tak valid skema; 2 `--records` hilang/tak terbaca, `--by topic\|week` (tidak didukung CLI) |
| `privacy-check` | `--json`, `--data-dir <path>` | `{ok, findings, parseIssues, summary}` | 0 bersih; 1 temuan; 2 argumen tak dikenal |
| `checklist` | `--format md\|json`, `--out`, `--force`, `--program` | `--json` setara `--format json` | 0; 2 `--format` salah / `--out` ada tanpa `--force` |

Catatan: kolom flag diringkas dari `HELP_TEXT` tiap berkas `src/cli/commands/*.ts`. Untuk daftar lengkap rujuk `docs/cli/README.md`; di sini hanya yang relevan bagi kontrak.

### 2.4 Teks yang menyebut "osn"
| Lokasi | Contoh | Catatan |
| --- | --- | --- |
| Help global | baris pertama `osn -- OSN Informatika 2026 curriculum CLI`; `Usage: osn <command> [options]`; ``osn <command> --help`` | dibangun di `buildGlobalUsage()` |
| Help per perintah | `osn validate -- ...`, `Usage: osn plan --start ...` | `HELP_TEXT` di tiap perintah |
| Galat stderr | prefiks `osn: ...`, `osn <perintah>: ...` (sekitar 139 literal di `src/cli/`) | di-assert oleh sekitar 20 berkas tes (28 baris `toContain`/`toBe`/`toMatch` dengan `osn `) |
| Stdout teks | `osn validate: programme "osn", corpus at <path>`; `osn privacy-check: scanning <path>` | sama dengan format-audit/format-privacy-check |
| Judul Markdown | `# osn checklist: ...`, `# osn plan: cohort calendar`, `# osn report: mentor KPI dashboard` | masuk **artefak yang disimpan** lewat `--out`, bukan hanya UI terminal |
| Keluaran mengandung path absolut | `validate` dan `privacy-check` teks mencetak `corpus at <abs path>` / `scanning <abs path>` | tidak deterministik antarcheckout; harus dinormalkan di uji kontrak |

### 2.5 Siapa yang memanggil (di dalam repositori)
| Pemanggil | Bukti |
| --- | --- |
| `package.json` scripts | `validate`, `privacy-check` (jalur `src/cli/index.ts`, bukan nama bin) |
| CI | `.github/workflows/ci.yml` hanya `bun run validate` dan `bun run privacy-check` (tidak memanggil `osn` langsung) |
| `scripts/` | tidak ada yang memanggil CLI; hanya komentar di `check-learner-assets.ts` yang menyebut `osn render modul` |
| Tes | 19 berkas tes memakai `Bun.spawn` pada `src/cli/index.ts` (konstanta `CLI_ENTRYPOINT`); `tests/unit/run-cli.test.ts` memanggil `runCli` in-process; 20 berkas meng-assert teks berbunyi `osn ...` |
| Dokumen | 45 berkas (README, AGENTS, CONTRIBUTING, `docs/**`) memuat 446 kemunculan `osn <perintah>`; 24 kemunculan `src/cli/index`; 9 berkas riwayat (`docs/releases/*`, `CHANGELOG.md`) mengutip `osn <perintah>` sebagai sejarah rilis |
| Consumer di luar repositori | **tidak diketahui** (lihat bagian 1) |

## 3. Golden baseline

Semua baris di bawah dijalankan 2026-11-19 pada commit `3eb5d89`, dari akar worktree, dengan `bun run src/cli/index.ts <argumen>`. Kolom hash membantu mengulang. Ringkasan keluaran, bukan dump penuh. `<abs>` menggantikan path absolut worktree.

| # | Argumen | Exit | Ringkasan keluaran | sha256 stdout / stderr (10 hex) |
| --- | --- | --- | --- | --- |
| 1 | `--version` | 0 | stdout `2.5.0` | 732f64d874 / kosong |
| 2 | `-V` | 0 | sama dengan #1 | 732f64d874 / kosong |
| 3 | `--version bogus` | 0 | stdout `2.5.0` (versi berprioritas) | 732f64d874 / kosong |
| 4 | (tanpa argumen) | 2 | stderr 21 baris: usage global (`osn -- OSN Informatika 2026 curriculum CLI`) | kosong / d72b6ef60a |
| 5 | `--help` | 0 | stdout 21 baris, usage global (isi sama dengan #4) | d72b6ef60a / kosong |
| 6 | `-h` | 0 | stdout usage global (baris pertama sama) | tidak dihash |
| 7 | `bogus` | 2 | stderr `osn: unknown command "bogus". Valid commands: validate, plan, render, report, privacy-check, checklist. Run "osn --help" for usage.` | kosong / 0d23ab8cab |
| 8 | `--program osn validate` | 2 | stderr `osn: unknown command "osn". ...` (flag bernilai sebelum perintah) | tidak dihash |
| 9 | `validate --help` | 0 | stdout 55 baris, `osn validate -- validate the curriculum corpus ...` | 51f1814d0f / kosong |
| 10 | `validate` | 0 | 20 baris; semua program; baris 1 `osn validate: programme "osn", corpus at <abs>/data/osn`; `OK -- 22 data file(s) validated, 0 problem(s) found.` | 91104f07f0 / kosong (mengandung path absolut) |
| 11 | `validate --json` | 0 | 96 baris; kunci teratas `ok,programs`; `ok: true` | f18f45ac1a / kosong |
| 12 | `--json validate` | 0 | JSON `{ "ok": true, "programs": [...` (posisi `--json` bebas) | tidak dihash |
| 13 | `validate --program osn` | 0 | 2 baris; 22 berkas, 0 masalah | 5f9c863989 / kosong (path absolut) |
| 14 | `validate --program osn --json` | 0 | 13 baris; kunci `program,ok,findings,summary` | caf7282099 / kosong |
| 15 | `validate --program sma-coding --json` | 0 | 13 baris; `"program": "sma-coding"` | 573dfd4ae6 / kosong |
| 16 | `validate --program nope` | 2 | stderr `osn validate: unknown programme "nope". Registered programmes: osn, sma-coding, tk-coding, kuliah-coding, dewasa-coding, sd-coding, smp-coding.` | kosong / 2ce402c9b6 |
| 17 | `validate --program` | 2 | stderr `osn validate: --program requires a programme id argument.` | kosong / f516064408 |
| 18 | `validate --bogus` | 0 | flag tak dikenal diabaikan; keluaran sama dengan #10 | 91104f07f0 / kosong |
| 19 | `privacy-check` | 0 | `OK -- 72 file(s) scanned, 0 direct-identifier-shaped key(s) found.` | 34fcf2deca / kosong (path absolut) |
| 20 | `privacy-check --json` | 0 | 9 baris; kunci `ok,findings,parseIssues,summary` | 0df5b635ec / kosong |
| 21 | `privacy-check --bogus` | 2 | stderr `osn privacy-check: unrecognised argument "--bogus". Run "osn privacy-check --help" for usage.` | kosong / e6ba56b694 |
| 22 | `checklist` | 0 | 53 baris Markdown, judul `# osn checklist: cohort readiness & operational rules` | 71193ddb5e / kosong |
| 23 | `checklist --json` | 0 | 150 baris; kunci `corpusVersion,asOf,syllabusCheck,readinessItems,operationalRules,quickPointer` | f075d19766 / kosong |
| 24 | `checklist --format xml` | 2 | stderr `osn checklist: --format must be "md" or "json"; received "xml".` | kosong / ba90f5fb57 |
| 25 | `plan` | 2 | stderr `osn plan: --start <YYYY-MM-DD> is required. Run "osn plan --help" for usage.` | kosong / 7a45ac0929 |
| 26 | `plan --start 2027-01-04` | 0 | 37 baris Markdown, judul `# osn plan: cohort calendar` | 43c24efb89 / kosong |
| 27 | `plan --start 2027-01-04 --json` | 0 | 393 baris; kunci `startDate,excludedDates,targetStage,weeks,projectedEndDate,baselineEndDate,targetStageInfo,warnings` | 5fe3e54c8b / kosong |
| 28 | `plan --start 2027-13-40` | 2 | stderr `osn plan: buildCohortPlan: startDate "2027-13-40" is not a valid calendar date ...` (nama fungsi internal bocor ke pesan) | kosong / 8502fe57b3 |
| 29 | `plan --program sma-coding --track A` | 0 | 687 baris, `# Rencana Pembelajaran -- Jalur A: Algoritmik dengan C++` | 63ef02098a / kosong |
| 30 | `plan --program sma-coding --track A --format json` | 0 | 2883 baris JSON, kunci awal `"program": "Silabus Pembelajaran Coding SMA"` | 9e874f6952 / kosong |
| 31 | `plan --program sma-coding --track A --start 2027-01-04` | 2 | stderr: `--start` hanya untuk OSN | kosong / b0ef55399c |
| 32 | `plan --program tk-coding --start 2027-01-04` | 2 | stderr: `plan` belum didukung untuk `tk-coding` | kosong / af6f576795 |
| 33 | `render` | 2 | stderr `osn render: a subcommand is required. Valid subcommands: weekly, checkpoint, sop, lembar-siswa, modul. ...` | kosong / 2a01273560 |
| 34 | `render weekly --week 1` | 0 | 60 baris, `# Week 1: Orientasi CP & C++ dasar` | d07d535702 / kosong |
| 35 | `render weekly --week 1 --json` | 0 | `--json` tidak berefek; tetap Markdown (`# Week 1: ...`) | tidak dihash |
| 36 | `render weekly --week 99` | 2 | stderr `osn render weekly: renderWeeklyPlan: week 99 is out of range. Valid range: 1-28.` | kosong / 94cf01b63f |
| 37 | `render checkpoint --number 1` | 0 | 35 baris, `# Checkpoint 1 (after week 4: ...)` | 83ca7088c7 / kosong |
| 38 | `render sop` | 0 | 36 baris, `# Mentor SOP card` | 2be8e409e8 / kosong |
| 39 | `render lembar-siswa --week 1` | 0 | 50 baris, `# Lembar Belajar Siswa -- Minggu 1` | 9dce21adde / kosong |
| 40 | `render modul --id aritmetika` | 0 | 495 baris, `# Aritmetika dan Teori Bilangan Dasar` | a7173967b4 / kosong |
| 41 | `render modul --id modul-bogus` | 2 | stderr `osn render modul: unknown module "modul-bogus". Known modules: ...` | kosong / 0a05895f4f |
| 42 | `render modul --program tk-coding --id tk-a1-m10 --lembar` | 0 | 25 baris, `# Memakai alat dengan aman` | df9e351bc4 / kosong |
| 43 | `render weekly --week 1 --program nope` | 2 | stderr `osn render: unknown programme "nope". Registered programmes: ...` | kosong / cc35b2ef30 |
| 44 | `report` | 2 | stderr `osn report: --records <path> is required. Run "osn report --help" for usage.` | kosong / 440cce5df5 |
| 45 | `report --records data/osn/samples/learning-records.sample.jsonl` | 0 | 94 baris, `# osn report: mentor KPI dashboard` | 0a32a0f7d8 / kosong |
| 46 | `report --records data/osn/samples/learning-records.sample.jsonl --json` | 0 | 416 baris; kunci `groupBy,recordCount,overall,groups,postmortem,scheduledResolves` | 187d3113c3 / kosong |
| 47 | `report --records tests/nofile.jsonl` | 2 | stderr `osn report: failed to read --records ...: ENOENT ...` (memuat path absolut) | kosong / 5965c3fff3 |
| 48 | `report --records data/osn/samples/learning-records.sample.jsonl --by topic` | 2 | stderr `osn report: --by topic is not supported by the CLI: ...` | kosong / 6185c681e6 |

Tidak diuji sungguhan (tidak ada baris golden, jangan dianggap baseline): exit 1 dari `validate` (butuh korpus rusak; sudah tercakup `tests/integration/cli-validate-fixtures.test.ts`), exit 1 privasi `report`, `--out`/`--force`, `render modul` pada program `sma-coding` (id yang saya coba, `a-x1-m8`, ternyata bukan id modul; daftar id ada di galat). Uji kontrak F2 harus menutupnya dengan fixture.

Cara mengulang: salin daftar argumen di tabel, jalankan `bun run src/cli/index.ts <argumen>`, bandingkan exit dan hash (untuk baris bertanda path absolut, normalkan path ke `<REPO>` dulu).

## 4. Matriks legacy (`osn`) vs target (`cac` canonical, `osn` alias)

### 4.1 Yang tidak boleh berubah (invarian)
| Invarian | Alasan / sumber |
| --- | --- |
| ID program `osn` dan seluruh ID program terdaftar; path `data/osn/`, `data/<id>/`, `content/<id>/` | IDENTITY-CAC-002; IMP-04 |
| Program default semua perintah berprogram tetap `osn`; `validate` tanpa `--program` tetap memvalidasi semua program | tidak boleh ada perubahan default diam-diam (acceptance #153) |
| Kode keluar 0 sukses / 1 kegagalan validasi atau galat tak terduga / 2 salah pakai, untuk **kedua** nama | IDENTITY-CAC-004; runbook bagian 5 |
| Nama perintah dan nama flag (`validate`, `plan`, `render`, `report`, `privacy-check`, `checklist`; `--program`, `--json`, `--format`, `--out`, `--force`, dst.) | kompatibilitas skrip |
| Struktur dan urutan kunci keluaran `--json` / `--format json` semua perintah | consumer pembaca mesin; hanya berubah lewat versi kontrak tersendiri |
| `--version` mencetak versi `package.json` apa adanya (SemVer perangkat lunak, bukan `syllabusVersion`) | ADR-0005; IDENTITY-CAC-005 |
| Isi data kurikulum dan keluaran render yang bersumber dari data (kecuali judul/branding perintah, lihat 4.2) | IMP-04 |
| Skrip `bun run validate` dan `bun run privacy-check` tetap ada dan semantiknya sama | CI bergantung padanya |

### 4.2 Yang berubah atau perlu diputuskan
| Aspek | Legacy `osn` | Target `cac` | Alias `osn` (masa transisi) | Dampak |
| --- | --- | --- | --- | --- |
| Entri `bin` | `osn` | `cac` (canonical) | `osn` tetap, titik masuk sama | aditif |
| Baris pertama help global | `osn -- OSN Informatika 2026 curriculum CLI` | branding platform (AhliKoding Curriculum / Curriculum as Code), tanpa menyiratkan CLI hanya untuk OSN | usulan: help `osn` sama isinya, hanya nama pemanggil yang berbeda, plus satu baris catatan alias | teks; perubahan wording bukan kontrak mesin |
| `Usage:` dan nama di help per perintah | `osn <perintah>` | `cac <perintah>` | mengikuti nama pemanggil | teks |
| Prefiks galat stderr | `osn: ...`, `osn <perintah>: ...` | `cac: ...`, `cac <perintah>: ...` | mengikuti nama pemanggil | **breaking bagi skrip yang mem-parse stderr** |
| Prefiks stdout teks | `osn validate: programme ...`, `osn privacy-check: scanning ...` | `cac validate: ...` | mengikuti nama pemanggil | sama seperti di atas; hanya terlihat di mode teks |
| Judul Markdown artefak | `# osn checklist: ...`, `# osn plan: ...`, `# osn report: ...` | **[KEPUTUSAN PEMILIK]** (lihat 5.5) | tetap | masuk berkas yang disimpan dengan `--out`; bisa memengaruhi diff dokumen turunan |
| Keluaran `--json` | lihat 2.3 | identik | identik | tidak ada perubahan |
| `--version` | `2.5.0` | nomor SemVer bump (lihat 5.3) | sama | nilai berubah wajar karena rilis |
| Nama paket privat | `kurikulum-informatika` | `curriculum-as-code` (ADR-0009 butir 5) | n/a | lihat 5.4 |
| `packageInfo.name` (`src/index.ts`) | `kurikulum-informatika` | mengikuti nama paket | n/a | diwajibkan sama oleh `smoke.test.ts` |
| `bun.lock` (`workspaces."".name`) | `kurikulum-informatika` | mengikuti nama paket | n/a | regenerasi lockfile; `--frozen-lockfile` di CI perlu lockfile terbarui dalam PR yang sama |
| Skrip `package.json` | `bun run src/cli/index.ts ...` | tetap lewat core yang sama | n/a | tidak ada perubahan wajib |

## 5. Keputusan teknis yang diusulkan

Penilaian memakai kriteria standar (kelebihan/kekurangan, keamanan, performa, perawatan, skalabilitas, aksesibilitas, SEO, UI/UX, kompatibilitas, kompleksitas operasional, dampak jangka panjang). Kriteria yang tidak relevan untuk CLI lokal (SEO, performa runtime, skalabilitas, aksesibilitas UI) dinyatakan netral. Rekomendasi di urutan pertama.

### 5.1 Mekanisme alias
| Opsi | Penilaian ringkas |
| --- | --- |
| **A. Dua berkas entri tipis (`cac.ts`, `osn.ts`) yang memanggil satu `runCli` dengan parameter nama pemanggil; `bin` memuat keduanya (Disarankan)** | + Satu core dispatch (sesuai runbook PR 1), nama pemanggil eksplisit dan deterministik, mudah diuji in-process. + Tidak bergantung pada perilaku `argv[1]` tiap pemasang bin. - Perlu mengganti ratusan literal `osn` pada help/galat menjadi `${name}` (sekitar 139 literal di `src/cli`, sekitar 20 berkas tes). Kompleksitas operasional rendah; perawatan baik. |
| B. Satu entri, deteksi nama dari `process.argv[1]` / `argv0` | + Perubahan kode lebih kecil. - Perilaku `argv[1]` bergantung pemasang (symlink bin, `bun run`, `bunx`) dan belum diverifikasi di sini; rapuh; sulit diuji. |
| C. `osn` hanya skrip pembungkus yang memanggil `cac` | + Pemisahan jelas. - Proses ganda dan masalah penerusan exit code/stdin; tidak ada keuntungan dibanding A. |

### 5.2 Peringatan deprecation pada alias `osn`
Bukti: consumer di luar repositori tidak diketahui; CI dan skrip internal tidak memakai nama bin `osn` (hanya `src/cli/index.ts`). Banyak dokumen dan tes memakai `osn <perintah>`.

| Opsi | Penilaian |
| --- | --- |
| **A. Tanpa peringatan di stderr selama masa transisi awal; deprecation hanya di dokumentasi, `--help`, dan changelog; peringatan runtime baru diputuskan pada rilis berikutnya setelah inventaris consumer (Disarankan)** | + Tidak mengubah stderr yang mungkin di-parse atau di-assert (`stderr` kosong pada sukses saat ini; baseline #1-#3, #10-#27). + Aman untuk `--json` parser yang menggabungkan stdout dan stderr (`2>&1`). - Pengguna alias tidak sadar sampai membaca docs. |
| B. Peringatan satu baris di stderr setiap eksekusi `osn` | + Pengguna segera tahu. - Mengubah stderr pada jalur sukses; merusak skrip yang menegaskan stderr kosong atau `2>&1 \| jq`; mengganggu CI pemakai. |
| C. Peringatan hanya bila stderr adalah TTY, dapat dimatikan `CAC_NO_DEPRECATION=1` | + Aman untuk skrip non-interaktif. - Mekanisme tambahan (deteksi TTY, variabel lingkungan) yang harus didokumentasikan dan diuji; baru bermakna setelah ada keputusan jadwal penghapusan. |

Rekomendasi: A pada rilis minor penambahan `cac`; evaluasi C satu rilis minor kemudian bila inventaris consumer menunjukkan pemakai eksternal. Peringatan tidak pernah ditulis ke stdout. **[KEPUTUSAN PEMILIK]**

### 5.3 SemVer dan jadwal deprecation
| Peristiwa | Usulan | Dasar |
| --- | --- | --- |
| Menambah `cac` (bin baru) dan alias `osn` dengan branding galat/help mengikuti pemanggil, `--json` identik | **minor** | `docs/development/releasing.md`: "new tooling or CLI capability" = minor; ADR-0005 |
| Mengubah prefiks `osn:` → `cac:` pada stderr/stdout teks untuk pemanggil `cac` saja; `osn` tetap `osn:` | tetap **minor** | stdout/stderr `osn` tidak berubah sama sekali; hanya nama baru yang berkeluaran baru |
| Mengubah prefiks teks pada pemanggil `osn` menjadi `cac:` (alias ikut bermerek baru) | **major** (breaking bagi pem-parse teks) | aturan changeset repo + catatan runbook bagian 5 |
| Mengganti nama paket privat `kurikulum-informatika` → `curriculum-as-code` | **minor** dengan catatan migrasi (paket `private: true`, tanpa registri); naikkan ke major hanya bila inventaris menemukan importer nama lama | `packageInfo.name` dan lockfile ikut berubah di PR yang sama |
| Menghapus bin `osn` | **major**, tidak lebih awal dari satu siklus rilis sesudah pemberitahuan di changelog dan rilis | runbook bagian 5: hanya di MAJOR |
| Mengubah judul Markdown artefak (`# osn checklist: ...`) | patokan sama dengan prefiks: **major** bila diubah untuk pemanggil lama | artefak turunan tersimpan |

Jadwal (usulan, perlu persetujuan): (1) rilis minor X: `cac` + alias `osn`, deprecation hanya dokumentasi; (2) setelah rename repositori (F4) dan inventaris consumer selesai: evaluasi peringatan runtime (5.2 C); (3) paling cepat satu rilis major berikutnya sekurang-kurangnya 6 bulan kemudian: boleh menghapus `osn`, **bila** tidak ada consumer aktif terdata. Angka 6 bulan adalah usulan, bukan bukti. **[KEPUTUSAN PEMILIK]**

### 5.4 Nama paket privat
Usulan: ikuti ADR-0009 butir 5 (`curriculum-as-code`), dilakukan di PR F2 yang sama dengan `packageInfo`, `bun.lock`, dan `smoke.test.ts` (satu perubahan atomik; `bun install --frozen-lockfile` harus lulus). Bukti dampak di repositori: `kurikulum-informatika` muncul di `src/index.ts`, `package.json`, `bun.lock`, dan dokumen (ADR, README, panduan kontributor, changeset, changelog rilis historis; rilis historis tidak diubah). Tidak ada impor paket oleh nama di `src/` atau `tests/` (grep hanya menemukan `packageInfo` dan impor `package.json` relatif). Importer luar: tidak diketahui. **[KEPUTUSAN PEMILIK]** untuk waktu penggantian (F2 vs menunggu rename repositori).

### 5.5 Judul Markdown artefak dan branding help
- Judul `# osn checklist:` / `# osn plan:` / `# osn report:` tertulis di berkas yang disimpan lewat `--out`, jadi dapat memengaruhi diff dokumen turunan. Usulan: **tidak diubah** pada F2 (tetap `osn`, karena "osn" di sini adalah program/riwayat kontrak keluaran dan judul tidak dipakai mesin), lalu ditinjau pada rilis major berikutnya. Alternatif: mengikuti nama pemanggil (breaking untuk pemanggil `osn`). **[KEPUTUSAN PEMILIK]**
- Baris pertama help global `osn -- OSN Informatika 2026 curriculum CLI` salah secara makna untuk platform multi-program. Usulan: untuk `cac`, `cac -- AhliKoding Curriculum CLI (Curriculum as Code)` ditambah baris penjelas alias dan non-afiliasi OSN; untuk `osn`, baris yang sama dengan catatan "alias lama dari `cac`". Wording final **[KEPUTUSAN PEMILIK]**.

### 5.6 Temuan teknis yang perlu masuk F2 atau issue terpisah
1. Subperintah = token non-flag pertama membuat `cac --program osn validate` gagal exit 2 (perilaku legacy dipertahankan; jangan "memperbaiki" diam-diam).
2. `validate --bogus` diabaikan (exit 0) sedangkan `privacy-check --bogus` exit 2: tidak seragam; jangan diubah dalam migrasi identitas (perilaku, bukan nama), catat sebagai issue terpisah bila ingin diperketat.
3. `plan --start 2027-13-40` membocorkan nama fungsi internal (`buildCohortPlan:`) di pesan; sama untuk `renderWeeklyPlan:`. Baseline hash menangkapnya; jangan diubah bersamaan dengan branding agar diff tes tidak ambigu.
4. Keluaran teks `validate`/`privacy-check` memuat path absolut; uji kontrak harus menormalkannya.
5. `--json` ditelan tanpa efek pada `render` (tetap Markdown, exit 0); pertahankan.

## 6. Uji kontrak F2 yang harus ditulis (usulan)
Semua berjalan terhadap **kedua** nama (parameter `name` ∈ {`cac`, `osn`}) lewat `Bun.spawn` pada berkas entri masing-masing, kecuali yang in-process.

| ID usulan | Uji | Hasil yang ditegaskan |
| --- | --- | --- |
| CLI-C-01 | `--version`, `-V`, `--version bogus` | stdout = versi `package.json`, exit 0, stderr kosong; sama untuk dua nama |
| CLI-C-02 | tanpa argumen; `--help`; `-h` | exit 2 (stderr) / 0 (stdout); baris pertama dan `Usage:` memuat nama pemanggil; daftar perintah identik |
| CLI-C-03 | perintah tak dikenal; token flag-bernilai sebelum perintah | exit 2; stderr berawalan nama pemanggil; daftar perintah valid sama |
| CLI-C-04 | `validate`, `validate --program <id>` untuk ketujuh ID program, `--json` | exit 0; JSON **byte-identik** antara `cac` dan `osn` (JSON tidak memuat nama bin); kunci teratas sama dengan golden 2.3 |
| CLI-C-05 | `privacy-check`, `--json`, argumen tak dikenal | exit 0/0/2; JSON identik |
| CLI-C-06 | `plan` (osn dan sma-coding), `checklist`, `render` (weekly, checkpoint, sop, lembar-siswa, modul, modul --lembar), `report` | keluaran Markdown/JSON setara semantik; dua nama menghasilkan isi identik kecuali baris bermerek yang sudah dinyatakan |
| CLI-C-07 | galat 2 untuk setiap perintah (flag wajib hilang, program/format tak dikenal, `--out` ada tanpa `--force`) | exit 2; pesan berawalan nama pemanggil; isi sisanya sama |
| CLI-C-08 | exit 1 | `validate` pada fixture korpus rusak (`--data-dir`) dan `report` dengan catatan berisi pengenal langsung: exit 1 untuk dua nama |
| CLI-C-09 | invarian default | tanpa `--program`: `plan`, `render`, `report`, `checklist` memakai program `osn`; `validate` memvalidasi semua program; hash korpus/registry sebelum dan sesudah tidak berubah |
| CLI-C-10 | snapshot golden | seluruh baris tabel 3 sebagai fixture dengan normalisasi `<REPO>`; untuk nama `osn` hasil harus **sama persis** dengan baseline hari ini (kecuali bagian yang diputuskan pemilik pada 5.5) |
| CLI-C-11 | stderr tenang pada sukses | untuk nama `osn`, stderr kosong pada semua perintah sukses di CLI-C-04..06 (menjaga keputusan 5.2 A) |
| CLI-C-12 | `package.json` | `bin` memuat `cac` dan `osn` menunjuk berkas entri yang ada; `packageInfo.name === package.json name` (tes smoke yang ada) |
| CLI-C-13 | skrip | `bun run validate` dan `bun run privacy-check` tetap lulus dan memakai core yang sama |

CI F2 menjalankan CLI-C-* di job Quality yang sudah ada (tidak butuh job baru); `bun run test:coverage` tetap menjaga ambang 85%.

## 7. Butir keputusan pemilik (ringkasan)
| # | Keputusan | Rekomendasi |
| --- | --- | --- |
| K1 | Mekanisme alias (5.1) | A: dua entri tipis, satu `runCli` berparameter nama |
| K2 | Peringatan deprecation runtime `osn` (5.2) | A sekarang: tanpa peringatan runtime; tinjau C setelah inventaris |
| K3 | Jadwal penghapusan `osn` dan ambang waktu (5.3) | Hanya di major, minimal 6 bulan setelah pengumuman, dan hanya bila tak ada consumer aktif terdata |
| K4 | Prefiks stdout/stderr untuk pemanggil `osn` (5.3) | Tetap `osn:` (minor); `cac:` hanya untuk pemanggil `cac` |
| K5 | Judul Markdown artefak (5.5) | Tidak diubah di F2 |
| K6 | Waktu penggantian nama paket privat (5.4) | Di F2, satu PR atomik dengan `packageInfo` dan lockfile |
| K7 | Wording help global `cac` (5.5) | Diajukan di PR F2 untuk disetujui |

Tidak ada butir di atas yang dianggap disetujui. Keputusan pemilik dicatat oleh orchestrator di issue dan dokumen keputusan.

## 8. Dokumen yang akan basi / perlu ditautkan (di luar berkas ini)
- `docs/migrations/2026-11-osn-to-cac.md` bagian 5 dan `docs/migrations/2026-11-cac-impact-matrix.md` (IMP-02, IMP-03): tautkan dokumen ini sebagai bukti.
- `docs/cli/README.md`, `docs/panduan/**`, `AGENTS.md`, `README.md`: berubah di F2 PR 2, bukan sekarang.
- `docs/requirements/identity-cac.md` / traceability: tambahkan CLI-C-* bila diterima.

## Changelog
### 2026-11-19 - v1.0.0
- Inventaris permukaan CLI, golden baseline 48 baris yang dijalankan sungguhan, matriks legacy vs target, usulan keputusan teknis dan uji kontrak F2 (issue #153).
