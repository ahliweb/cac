# AGENTS.md

Instructions for AI coding agents working in this repository. This
repository encodes the **Silabus Operasional Pembinaan OSN Informatika
2026** (v2.0, 4 September 2026) as code. It is an independent curriculum
document — not official Puspresnas / IA TOKI / IOI material. See
`README.md` for full context.

This file must stay accurate to the *current* state of the repository, not
aspiration. It is re-verified against the final implementation at the end
of the programme ([issue #26](https://github.com/ahliweb/osn/issues/26)).
Tables, not prose — drift should be visible at a glance.

## Repository layout

| Path | What belongs here |
| --- | --- |
| `src/schema/` | Zod schemas that validate curriculum data shapes. Per-programme module-index schemas (ADR-0007, ADR-0008): `module.ts` (OSN), `sma-module.ts`, `tk-module.ts`, `sd-module.ts`, `smp-module.ts`, `kul-module.ts`, `dw-learning-module.ts` (not `dw-module.ts`, which is `module-plan.json`); their shared ADR-0007 rules are in `program-module-common.ts`. |
| `src/domain/` | Business rules operating on parsed (schema-valid) curriculum data, including the module-index rules per programme (`modules.ts` dispatches to `sma-modules.ts`, `tk-modules.ts`, `sd-modules.ts`, `smp-modules.ts`, `kul-modules.ts`, `dw-modules.ts`; shared helpers in `program-modules-common.ts`) and `learner-sheet.ts` (a child's sheet carries no name or identity field). |
| `src/cli/` | CLI command handlers (`osn <command>`): `validate`, `plan`, `render` (also `render modul --program <id>` and, for `tk-coding` and `sd-coding`, `--lembar`), `report`, `privacy-check`, `checklist`. `program-registry.ts` is the programme table (id → data files + schemas, audit, module-index hooks, optional fidelity module) that `validate` and `check:fidelity` dispatch through; `fidelity/` holds the per-programme fidelity modules (ADR-0008). |
| `src/render/` | Generators that turn domain data into mentor-facing output and the student learner sheet (`osn render lembar-siswa`). |
| `src/index.ts` | Package entrypoint. |
| `data/programs.json` | Programme registry (ADR-0006), validated by `src/schema/program.ts`. |
| `content/` | Authored learning-module bodies, `content/<program>/modules/<id>.md` (ADR-0007). Indexed by `data/<program>/modules.json` (optional per programme; each programme has its own schema: OSN `src/schema/module.ts`, `sma-coding` `sma-module.ts`, `tk-coding` `tk-module.ts`, `sd-coding` `sd-module.ts`, `smp-coding` `smp-module.ts`, `kuliah-coding` `kul-module.ts`, `dewasa-coding` `dw-learning-module.ts`); one module per programme unit (week, course or syllabus module), its id the unit code in lower case. `tk-coding` and `sd-coding` modules are teacher guides with a separate learner sheet for the child in `content/<program>/lembar/<id>.md`, whose SVG illustrations live in `content/<program>/gambar/` (checked by `check:learner-assets`). Module bodies carry no `# ` title and no `## Rujukan` section (both come from the index). Counts as of 2026-11-19, all `draf`: `tk-coding` 48, `sd-coding` 168, `smp-coding` 84, `sma-coding` 239, `kuliah-coding` 24, `dewasa-coding` 36 modules (plus 48 and 168 learner sheets and SVG for TK and SD); `osn` 10, `disetujui`. Never transcribed syllabus content. Do not create an empty `content/<id>/` directory. |
| `data/osn/` | The OSN programme corpus (`data/osn/*.json`) and `data/osn/samples/` (synthetic learning records). One `data/<program>/` directory per registered programme. |
| `data/<id>/` (tujuh program) | Satu direktori per program terdaftar, masing-masing dengan skema khusus (`src/schema/<prefix>-*.ts`), audit korpus (`src/domain/<prefix>-corpus-audit.ts`), dan modul fidelity (`src/cli/fidelity/<id>.ts`), dikaitkan di tabel `src/cli/program-registry.ts` (ADR-0008). Berkas korpus (tanpa `modules.json`): `osn` 22, `sma-coding` 8 (silabus v1.4.1; plus `modules.json`), `tk-coding` 7 (v1.0.2), `kuliah-coding` 6 (v1.2.0), `dewasa-coding` 8 (v1.2.0), `sd-coding` 5 (v1.1.0), `smp-coding` 7 (v1.2.0). Awalan skema: `sma-`, `tk-`, `kul-`, `dw-`, `sd-`, `smp-`. |
| `tests/helpers/` | Support code shared by tests (never a `*.test.ts`): synthetic module-index entries and a temporary repository copy for the end-to-end tests of the module indexes. |
| `tests/unit/` | One module tested in isolation. Mirrors `src/` loosely. |
| `tests/integration/` | Cross-module tests (schema → domain → CLI/render). |
| `docs/architecture/` | System architecture overview, repository map, and ADRs. |
| `docs/requirements/` | Requirements register and traceability matrices. |
| `docs/cli/` | `osn` CLI command reference. |
| `docs/panduan/` | Panduan penggunaan berbahasa Indonesia per peran (mentor OSN, guru SMA, siswa, pemilik/peninjau, kontributor); setiap perintah di dalamnya sudah dijalankan. |
| `docs/development/` | Engineering process docs (testing, CI/CD, releasing). |
| `docs/governance/` | Privacy policy, security policy, incident-response procedure. |
| `docs/operations/` | Operational runbook, syllabus-check procedure, and `kebijakan-ai-osn.md` (kebijakan penggunaan AI untuk pembinaan OSN, #139). |
| `docs/silabus/` | Faithful Markdown transcription of the source syllabus PDF. |
| `docs/*.pdf` | The source syllabus document. |
| `docs/programs/` | Dokumen sumber program selain OSN, satu folder per id program (ADR-0006), plus peta jenjang `README.md` dan `catatan-tinjauan-modul.md` (butir yang perlu dicek peninjau manusia pada modul draf, issue #125). Keenam program berstatus **disetujui pemilik, terdaftar, dan ter-encode** (2026-11-19): `sma-coding` v1.4.1, `tk-coding` v1.0.3, `kuliah-coding` v1.2.0, `dewasa-coding` v1.2.0, `sd-coding` v1.1.0, `smp-coding` v1.2.0; `silabus.md` tiap folder adalah sumber `data/<id>/` (authored, ADR-0007); `rancangan-modul*.md` dan folder pilot `rancangan-modul*-contoh/` adalah rancangan dan riwayat penulisan modul yang kini ada di `content/<id>/`. |
| `docs/riset/` | Riset lintas program (authored content, ADR-0007, `DRAF`; tidak mengubah silabus atau corpus): `ilmu-belajar-kognitif.md` (ilmu belajar kognitif, rujukan pedagogi bersama, issue #133) dan `ai-rekayasa-perangkat-lunak.md` (AI dalam rekayasa perangkat lunak, dasar kebijakan AI per program, issue #139). |
| `.changeset/` | Pending changesets — one Markdown file per user-visible change. |
| `.github/workflows/` | CI pipeline. |
| `.github/ISSUE_TEMPLATE/` | Bug / feature / curriculum-change issue forms. |
| `.claude/agents/` | Claude Code executor subagents (`pelaksana-kompleks`, `pelaksana-sederhana`) used by the orchestrator — see "Pedoman Eksekusi Wajib" below. |

Do not create new top-level directories without a corresponding issue
scoping them. See `docs/architecture/repository-map.md` for the
exhaustive, directory-by-directory description.

## Command table

Matches `package.json` exactly — verify against it before trusting this
table.

| Command | Purpose |
| --- | --- |
| `bun install` | Install dependencies. |
| `bun run typecheck` | `tsc --noEmit`. |
| `bun run lint` | `biome lint .`. |
| `bun run assist:check` | `biome check` with formatter and linter off — enforces import organization, which `lint` and `format:check` do not. |
| `bun run lint:fix` | `biome lint --write .`. |
| `bun run format` | `biome format --write .`. |
| `bun run format:check` | `biome format .` (check-only). |
| `bun test` | Run the full test suite. |
| `bun run test:coverage` | `bun test --coverage`; enforces the 85% lines/functions gate in `bunfig.toml`. |
| `bun run build` | `bun build ./src/index.ts --outdir dist --target bun`. |
| `bun run validate` | `osn validate` — validates `data/programs.json` and every registered programme's `data/<program>/*.json` corpus (schema, structural invariants, referential integrity, registry version agreement); `--program <id>` selects one; exits 0 clean / 1 on any finding / 2 on usage error. See `docs/cli/README.md`. |
| `bun run privacy-check` | `osn privacy-check` — recursively scans `data/` for direct-identifier-shaped keys (GR-04); exits 0 clean / 1 on any finding. |
| `bun run check:requirements` | `bun run scripts/check-requirements.ts` — verifies the requirements register and traceability matrices are consistent and exhaustive. |
| `bun run check:checklist-fidelity` | `bun run scripts/check-checklist-fidelity.ts` — verifies §14.1/§14.2 data matches the source syllabus verbatim. |
| `bun run check:module-code` | `bun run scripts/check-module-code.ts` — checks the fenced code of `content/**/modules/*.md` without running it: ```` ```cpp ```` with `g++ -std=c++17 -fsyntax-only`; ```` ```arduino ```` the same way against the mock `scripts/fixtures/arduino-mock/Arduino.h` (syntax and types only, not board behaviour); ```` ```python ```` with `python3 -I` `ast.parse` (syntax only); ```` ```ts ````/```` ```typescript ```` and ```` ```js ````/```` ```javascript ```` with `Bun.Transpiler` (syntax only, no type check, nothing run). A fence indented inside a list item is dedented per CommonMark before checking. A block whose info string carries `setengah-jadi` (e.g. ```` ```cpp setengah-jadi ````) is skipped and counted. Fails if `g++` or `python3` is missing. |
| `bun run check:learner-assets` | `bun run scripts/check-learner-assets.ts` — checks `content/<program>/gambar/*.svg` (well-formed, `svg` root with `viewBox`, no script/image/foreignObject/`on*`/external `href`/`data:`/`@import`/external `url()`, at most 50 KB) and that every image link in `content/<program>/lembar/*.md` points to an existing file in that `gambar/`; an unreferenced SVG is a warning. Also fails (`DUPLICATE_TITLE_IS_ERROR` in the script is `true`) when a `content/*/modules/*.md` or `lembar/*.md` body starts with its own `# ` title, which `render modul` already prints. |
| `bun run check:fidelity` | `bun run scripts/check-fidelity.ts [--program <id>]` — menjalankan pemeriksaan fidelity setiap program terdaftar yang punya modul fidelity (`sma-coding`, `tk-coding`, `kuliah-coding`, `dewasa-coding`, `sd-coding`, `smp-coding`) lewat tabel `src/cli/program-registry.ts` (ADR-0008), membandingkan tabel `docs/programs/<id>/silabus.md` dengan `data/<id>/*.json` sel demi sel; exit 1 bila ada drift, 2 untuk salah pakai. |
| `bun run check:sma-fidelity` | `bun run scripts/check-sma-coding-fidelity.ts` — pemeriksaan fidelity khusus `sma-coding` (bagian 1.3, 1.4, 2, 3, 4, 5 `silabus.md`); exit 1 bila ada drift. |
| `bun run changeset` | Create a changeset (interactive). |
| `bun run version` | Consume changesets into `CHANGELOG.md` / bump version. |

## Atomic-issue workflow

Work one GitHub issue at a time, in this order:

1. Read the issue in full, including acceptance criteria and dependencies.
2. Implement the change, scoped to that issue only.
3. Add/update tests (`tests/unit/`, `tests/integration/` as appropriate).
4. Run lint, typecheck, and the full local quality suite.
5. Update docs (`docs/`, `README.md`, this file) if behavior, setup, or
   process changed.
6. Add a changeset if the change is user-visible (see
   `docs/development/releasing.md` — do not duplicate that policy here).
7. Commit, referencing the issue number (e.g. `feat: add topic-family
   schema (#9)`).
8. Verify CI passes on the branch/PR.
9. Close the issue (or let the PR merge close it via `Closes #N`).

Do not bundle multiple issues into one PR. Do not exceed an issue's stated
scope.

## Ordering rule for curriculum work

**Schema first, then data, then domain, then tests — never data without a
schema.**

1. `src/schema/` — define or extend the Zod schema for the shape being
   added.
2. `data/<program>/` — add data that the schema validates (register the programme in `data/programs.json`).
3. `src/domain/` — add business logic that consumes the validated data.
4. `tests/` — cover the schema, the data (via schema validation), and the
   domain logic.

Never commit a `data/<program>/` file for a shape that has no corresponding schema.

## Curriculum content fidelity

- Curriculum content is **transcribed faithfully** from the source
  syllabus, in Indonesian. It is never invented, translated, or
  "improved" in meaning.
- Any change to curriculum content requires a **syllabus check** against
  the official sources before it is made:
  - OSN: R1 (`osn.toki.id/silabus`), R2 (`osn.toki.id/silabus/kota`), R3
    (`osn.toki.id/silabus/provinsi`).
  - IOI: R7 (`ioinformatics.org/page/syllabus/12`), R8 (IOI Syllabus PDF).
- Use the **`curriculum-change`** issue form
  (`.github/ISSUE_TEMPLATE/curriculum-change.yml`) to propose or record
  such a change — it captures the source checked, the date checked, and
  the expected changelog impact (§14.2 rule 8).
- Any curriculum content change requires a **changeset**
  (`docs/development/releasing.md`).
- **Authored content** (learner modules, draft programme syllabi) is a
  separate class with its own rules — ADR-0007. It is never mixed into a
  transcribed corpus, stays visibly marked `DRAF` until approved, and an
  AI agent **never** sets a module or draft syllabus to `disetujui` or
  records an approval the owner did not give.
- **Multiple programmes** — ADR-0006. A programme whose source syllabus
  is still a draft gets no `data/<program>/` directory and no registry
  entry until the owner approves that syllabus.

## Privacy

- **Never commit real learner data.** This repository holds no learner
  personal data (see `README.md`, "What this repository is not").
- Any sample/fixture data representing a learner must be **obviously
  synthetic and pseudonymous** (e.g. clearly fake names, no real school,
  no real identifiers).

## What requires a changeset

See `docs/development/releasing.md`, "When a changeset is required" — do
not duplicate that policy here; that document is the source of truth.

## Verification checklist (run before claiming an issue done)

- [ ] `bun run format:check` passes.
- [ ] `bun run lint` passes.
- [ ] `bun run assist:check` passes.
- [ ] `bun run typecheck` passes.
- [ ] `bun test` (or `bun run test:coverage`) passes, coverage gate met.
- [ ] `bun run build` passes.
- [ ] `bun run validate` passes (corpus validation).
- [ ] `bun run privacy-check` passes (no direct-identifier-shaped key in `data/`).
- [ ] `bun run check:requirements` passes if `docs/requirements/` was touched.
- [ ] `bun run check:module-code` passes (C++, Arduino, Python, TypeScript and JavaScript examples in `content/` modules compile or parse).
- [ ] `bun run check:learner-assets` passes (SVG and image links of learner sheets).
- [ ] `bun run check:fidelity` passes if any `data/<program>/` or its source document changed (`check:sma-fidelity` is the same check for `sma-coding` alone; run `check:fidelity` on its own to see every registered programme pass).
- [ ] Every command and path mentioned in any doc you touched actually
      exists — verify, don't assume.
- [ ] Tests added/updated for the change (per `docs/development/testing.md`).
- [ ] Docs updated if behavior, setup, or process changed.
- [ ] Changeset added if the change is user-visible.
- [ ] For curriculum content changes: syllabus check done, source and date
      recorded.
- [ ] No real learner data, secrets, or credentials committed.
- [ ] Commit message references the issue number.

<!-- template-versi: v1.1.0 (2026-11-13; DL-034, DL-036, DL-039, DL-043). Template ini sengaja tanpa metadata Version/Changeset karena disalin ke AGENTS.md repo lain; penanda ini dasar cek drift. -->

## Pedoman Eksekusi Wajib (Orchestrator & Agent)

> Standar lintas-portofolio internal pemilik (standing instruction sejak 2026-11-01, DL-034); berlaku untuk **setiap** pekerjaan yang mengubah repo ini. Prosedur dan checklist lengkap: skill `eksekusi-terkelola` pada standar internal tersebut. Tabel peran di bawah hanya ringkasan; harga, tingkatan, dan angka model lengkap ada di standar internal tersebut — jangan disalin ke repo ini.

**Opus adalah manajer dan koordinator utama.** Opus menganalisis pekerjaan, menilai kompleksitas dan risiko, memecah serta memprioritaskan tugas, mendelegasikan, mengawasi progres, mengelola ketergantungan, lalu meninjau, mengintegrasikan, menguji, dan memverifikasi semua hasil.

| Peran | Claude Code | Codex / OpenAI | Dipakai untuk |
| --- | --- | --- | --- |
| Manajer / orchestrator | Opus 5.5, `high` (`xhigh` untuk pekerjaan kritis) | GPT-6.1 Sol, `high` | Seluruh koordinasi dan verifikasi akhir |
| Agent kompleks | Sonnet 5.5, `medium` (`high` bila risiko tinggi), subagent `pelaksana-kompleks` | GPT-6.1 Sol atau Terra, `medium` | Penalaran dalam, keputusan arsitektur atau lintas komponen, fungsi kritis, implementasi besar, risiko keamanan/performa/integrasi/regresi |
| Agent sederhana | Haiku 5.5, `low`, subagent `pelaksana-sederhana` | GPT-6 Luna atau Terra, `low` | Tugas sederhana, terdefinisi jelas, risiko rendah, berulang, mekanis |

**Fable tidak dipakai sebagai orchestrator** (keputusan pemilik, DL-034).

Aturan:

1. **Pilih agent per tugas** berdasarkan kompleksitas, ketergantungan, risiko, kedalaman penalaran, dan dampak. Tugas kecil yang lebih murah dikerjakan langsung tidak dipecah.
2. **Eskalasi, jangan menebak.** Tugas Haiku yang ternyata kompleks, ambigu, berisiko, atau menyentuh arsitektur dikembalikan ke Opus untuk dinilai ulang, lalu bila perlu dipindahkan ke Sonnet.
3. **Paralel hanya bila terisolasi.** Agent paralel tidak boleh:
   - tumpang-tindih scope atau mengerjakan hal yang sama;
   - mengubah file, modul, atau area yang saling bergantung secara bersamaan;
   - memicu race condition;
   - membuat ketergantungan tak perlu;
   - menimpa hasil agent lain;
   - membawa keputusan yang tidak kompatibel;
   - memicu konflik merge.

   Ketergantungan dipetakan **sebelum** eksekusi. Tugas yang bergantung dijalankan berurutan.
4. **Agent pelaksana tetap di scope-nya.** Agent tidak mendefinisikan ulang arsitektur, tidak memakai strategi yang bertentangan, tidak menyentuh area di luar tugas tanpa izin Opus, dan tidak mendelegasikan lagi.
5. **Verifikasi tetap di Opus.** Diff, uji, angka, dan check dicek sendiri; laporan agent bukan bukti.
6. **Setiap issue dan PR adalah unit kerja atomik** yang bisa diverifikasi sendiri sampai selesai diimplementasikan, diuji, di-review, dan diselesaikan.
7. **Laporan progres ringkas paling lama tiap 5 menit kerja aktif** sampai semua kebutuhan, issue, dan PR dalam scope selesai dan terverifikasi. Isinya: yang selesai, yang berjalan, berikutnya atau hambatan. Hasil yang belum datang tidak boleh dikarang.
8. **Keputusan arsitektur, pilihan implementasi, atau trade-off dinilai sebelum diimplementasikan.** Kriterianya: kelebihan dan kekurangan, keamanan, performa, kemudahan perawatan, skalabilitas, aksesibilitas, dampak SEO, UI/UX, kompatibilitas, kompleksitas operasional, dan implikasi jangka panjang. Sajikan rekomendasi lebih dulu.
9. **Dokumentasi harus sama dengan kondisi nyata repo setelah implementasi**, bukan rencana atau perilaku lama. Checklist bidangnya ada di skill eksekusi-terkelola §7.
10. **Gerbang merge ketat.** Merge hanya bila semua check wajib `SUCCESS`, diperiksa lewat status (bukan output yang disalurkan ke `tail`). Approval manusia yang diwajibkan (review branch protection, gerbang 15, rilis produksi) tidak dilewati.
11. **Pembersihan dan integrasi akhir.** Setelah implementasi dan PR yang ada selesai:
    - buat PR untuk branch relevan yang tersisa, review dengan proses yang sama, dan merge hanya bila check lolos;
    - hapus branch lokal/remote yang sudah di-merge, tetapi pertahankan branch yang dilindungi, permanen, rilis, atau sengaja disimpan;
    - perbarui versi dokumen serta metadata **Document Changeset** dan **Changelog** bila mengubah dokumen; untuk perubahan software, perbarui versi dan **Release Changeset hanya jika konvensi repo produk memintanya** — jangan samakan keduanya (lihat standar terminologi internal, DL-035);
    - commit dengan pesan jelas;
    - push commit, branch, tag, versi, dan changeset.

    **Perubahan sah tidak ditinggalkan hanya di working tree lokal.**
12. **Aturan repo ini tetap berlaku** untuk setiap agent: alur kerja, gerbang, guardrail keamanan, dan konvensi commit.
13. **Koordinasi dengan kontributor lain** (standar koordinasi kontributor internal, DL-036). Isolasi paralel (aturan 3) berlaku juga terhadap kontributor dan sesi lain. Bila repo ini punya papan koordinasi (issue hidup di luar git), baca sebelum bekerja. Sebelum meluncurkan agent yang akan **merge, release, atau promote**, Opus membaca papan dan Deployment terakhir, mencantumkan kunci rilis (atau "tidak ada kunci") di brief, dan tidak merge atau deploy bila kunci rilis dipegang orang lain. Agent yang menemukan bentrok berhenti dan melapor; ia tidak mengambil alih klaim atau kunci.
14. **Repo pedoman internal tidak disebut (DL-039).** Standar lintas-portofolio internal diterapkan di repo ini tanpa menyebut nama, path, atau tautan repo sumbernya: tidak di dokumen, kode, file agent, commit, branch, issue, PR, maupun artefak. Tunjuk asalnya dengan frasa "standar lintas-portofolio internal".
15. **Keputusan pemilik disajikan sebagai dialog pilihan baku (DL-043).** Keputusan yang menjadi hak pemilik (persetujuan atau sign-off, pilihan antar nilai, trade-off, merge/tunda/rilis) **tidak** ditanyakan dengan kalimat "apakah saya boleh…?" dalam prosa. Opus menyajikannya lewat **dialog pilihan interaktif baku**: di Claude Code alat `AskUserQuestion`; di agent lain UI pilihan terstruktur yang setara, atau daftar opsi bernomor bila tidak ada. Bentuknya: 2-4 opsi yang saling eksklusif, **opsi yang direkomendasikan di urutan pertama dan ditandai "(Disarankan)"**, setiap opsi menyebut konsekuensinya. Keputusan yang saling terkait dikelompokkan (paling banyak 4 pertanyaan per dialog) dan boleh dijawab sekaligus lintas beberapa issue (sign-off massal). Setelah pemilik menjawab, **agent mengerjakan sendiri seluruh tindak lanjut mekanisnya**: mencatat keputusan (tanggal dan opsi terpilih) di issue dan dokumen keputusan repo, memperbarui label dan status, dan menutup issue yang tipe penyelesaiannya mengizinkan. Pagar: agent **tidak pernah mencatat persetujuan yang tidak dipilih pemilik** (jawaban teks bebas atau "Lainnya" adalah instruksi baru, bukan persetujuan); pilihan **tidak menggantikan aktivitas manusia nyata** (UAT lapangan, pilot, restore drill, rapat Go/No-Go, mandat hukum), sehingga issue semacam itu tetap terbuka sampai ada bukti; hanya Opus yang bertanya ke pemilik, agent pelaksana menyerahkan opsi ke Opus; dan AI tetap tidak menyetujui PR-nya sendiri maupun rilis produksi (review wajib di GitHub dan gerbang 15 tetap tindakan pemilik sendiri). Prosedur: skill eksekusi-terkelola §4.1 pada standar internal.
