# Kebutuhan Identitas CaC dan Traceability Migrasi

## Metadata
- Version: v1.0.0
- Last updated: 2026-11-19
- Changeset: Menambahkan kontrak identitas dan migrasi terukur yang tidak mengubah requirement kurikulum.
- Status: disiapkan untuk Gate 9; implementasi belum dimulai.

| ID | Kebutuhan (shall) | Artefak | Acceptance evidence |
| --- | --- | --- | --- |
| IDENTITY-CAC-001 | Platform SHALL beridentitas Curriculum as Code (CaC), produk AhliKoding Curriculum, URL target ahliweb/cac | ADR-0009; docs/migrations/** | metadata GitHub target sesudah rename (hanya F3) |
| IDENTITY-CAC-002 | Identifier osn SHALL tetap ID program, bukan nama platform | data/programs.json; data/osn; src/domain | structural diff corpus; fidelity and registry audit |
| IDENTITY-CAC-003 | CLI canonical cac SHALL tersedia dengan alias osn dalam periode transisi | package.json bin; src/cli/** | contract tests CLI ganda pada CI |
| IDENTITY-CAC-004 | Existing CLI osn SHALL mempertahankan dukungan command/flag/exit behavior | src/cli/run-cli.ts; tests/** | exit 0/1/2, --json/--version, help/errors reviewed |
| IDENTITY-CAC-005 | Software SemVer SHALL independen dari syllabusVersion | package.json, .changeset, ADR-0005 | versions compared before/after |
| IDENTITY-CAC-006 | Docs SHALL membedakan paradigma/platform dari program OSN, termasuk non-afiliasi lembaga | README, AGENTS, docs/cli, docs/panduan | review link dan full-text terms |
| IDENTITY-CAC-007 | Rename SHALL dilakukan in-place setelah Gate 9, tests dan Gate 15 | GitHub Settings, runbook | repo ID sama; approval dan CI URLs |
| IDENTITY-CAC-008 | CI dan external consumers SHALL diverifikasi terhadap path baru, tidak mengandalkan redirect GitHub Actions | .github/workflows, integration inventory | consumer checklist bertanda hasil nyata |
| IDENTITY-CAC-009 | Privasi, keamanan, dan reproducibility SHALL setara atau lebih baik dari baseline | privacy-check; checks; security docs | no PII, no secret, tests green, rollback rehearsal |
| IDENTITY-CAC-010 | Rollout SHALL memiliki pemilik, jalur rollback dan observabilitas kegagalan | runbook; migration log | rehearsal log, issue references, monitoring summary |

## Non-goals
- Tidak membuat LMS, online judge, portal, API service, penyimpanan data siswa atau database baru.
- Tidak menambah skema dan mengubah isi silabus tanpa issue kurikulum terpisah.
- Tidak mengganti file/folder osn menjadi cac; makna OSN sebagai program historis tetap benar.
- Tidak mengubah repository sampai verifikasi readiness lengkap.

## Traceability
- Keputusan: ADR-0009.
- Rencana: docs/migrations/2026-11-osn-to-cac.md.
- Matriks dampak: docs/migrations/2026-11-cac-impact-matrix.md.
- Invariants dan baseline data (IDENTITY-CAC-002, 005, 009): [2026-11-cac-invariants.md](../migrations/2026-11-cac-invariants.md) (#154).
- Eksekusi: issue per area setelah Definition of Ready (Gate 9), setiap PR menutup issue atomik.
- Validasi: tests/**, CI, checklist Go/No-Go, migration log post-rename.

## Changelog
### 2026-11-19 - v1.0.0
- Memformalkan 10 kebutuhan dan kriteria buktinya.
