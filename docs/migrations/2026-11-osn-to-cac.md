# Rencana Migrasi Repository: ahliweb/osn → ahliweb/cac

## Metadata
- Version: v1.0.0
- Last updated: 2026-11-19
- Changeset: Merumuskan tahapan, kontrak kompatibilitas, risiko, go/no-go, dan runbook rename in-place.
- Status: **Persiapan saja; rename repository belum dilakukan.**
- Decision: ADR-0009; identitas produk AhliKoding Curriculum, paradigma Curriculum as Code (CaC).
- Owner keputusan: pemilik repository; approval operasi rename dilakukan terpisah setelah seluruh gerbang dinyatakan lulus.

## 1. Batas dan target
**Tujuan:** nama repository GitHub ahliweb/cac; CLI target cac; label OSN menjadi identitas program bukan nama platform. **Bukan:** membuat repo baru, membuat LMS/judge, mengubah isi kurikulum, mengganti ID program osn, memperkenalkan data pribadi siswa, mengubah lisensi, melakukan deploy atau rename sekarang.

Source of truth tetap **repository yang sama (GitHub repo ID dipertahankan ketika rename in-place)**. Branch utama tetap main. Data program osn dan sma-coding tidak berubah karena rename identitas platform.

## 2. Dependensi keputusan
- ADR-0001: curriculum as code; ADR-0004: data peserta didik; ADR-0005: versi software vs silabus; ADR-0006: multi-program; ADR-0007: review konten; ADR-0008: skema per program; ADR-0009: identitas CaC.
- Kontrak migrasi: docs/requirements/identity-cac.md.
- Matriks dampak: docs/migrations/2026-11-cac-impact-matrix.md.
- Alur perubahan: Discovery/Spec (langkah 1–9), issue S/M (10), perubahan atomik per PR + CI (11–12), staging/rehearsal (13–14), gate Go/No-Go (15), rename (16), verifikasi (17) dan review (18).
- Perubahan ini tidak menambah UI, database, API service atau deployment baru; artefak UI/ERD/RBAC/OpenAPI hanya dinyatakan tidak berlaku bila verifikasi menunjukkan tidak ada dampak. Jangan menciptakan hasil review fiktif.

## 3. Fase dan kriteria keluar (urutan mutlak)
### F1 — Baseline / specification — sekarang
- Catat persetujuan nama ahliweb/cac, keputusan brand dan anti-ambiguity notice.
- Audit inventaris file dan tautan, GitHub Actions, releases, branches, dependents, clones, badge, webhooks, Pages, integrasi lain. Catat "tidak diketahui" hingga diverifikasi.
  Hasil F1/01 (#152): [2026-11-cac-consumer-inventory.md](2026-11-cac-consumer-inventory.md).
- Lengkapi traceability IDENTITY-CAC dan matriks risiko, identifikasi maintainer/owner integrasi.
- Cross-spec review/DoR: pastikan acceptance test jelas, tidak mengubah kontrak data/kurikulum, strategi rollback dan testing terdokumentasi, tidak ada PII/secret.
- Output: ADR-0009, runbook ini, requirements, impact matrix, roadmap, review DoR.

### F2 — Compatibility implementation — **tertahan sampai Gate 9**
- PR 1: menambah entrypoint cac dan alias bin osn, gunakan satu core dispatch, stabilkan exit code 0 sukses / 1 validasi / 2 usage. Jangan mengubah default pemilihan program diam-diam.
- PR 2: perbarui metadata package private, packageInfo, README, panduan CLI, AGENTS, contoh skrip dan help; test output/JSON semantik osn tetap kompatibel; bila ada text output lama yang dikonsumsi skrip, nyatakan breaking secara eksplisit.
- PR 3: tes dan CI kedua alias dan program, build, coverage, fidelity, privacy, link checker, dep-scanner.
- PR 4 (jika diperlukan): perbarui external consumers **terlebih dulu** agar siap pindah URL, terutama Actions uses: owner/repo@ref.
- Changeset jika ada perubahan user-visible, jenis bump diputuskan berdasar kontrak benar: alias aditif biasanya minor, penghapusan nama lama major; rename package/import dapat merupakan breaking untuk consumer tertentu walaupun private.

### F3 — Pre-rename readiness, gate dan rename administratif — **belum diizinkan**
- Freeze perubahan besar sementara. Simpan snapshot: remote, default branch, latest SHA, tags, PR/issue, workflow list, release, dependents, settings/permissions, branch protection, webhook.
- Jalankan tes kualitas dan smoke test CLI legacy/new; audit dependensi yang belum selesai. Verifikasi slug cac tersedia pada saat eksekusi.
- Latih runbook pemulihan di lingkungan aman / simulasi dokumentasi, bukan bereksperimen dengan repo produksi.
- Go/No-Go hanya setelah checklist gerbang 15 lulus dan pemilik menyatakan siap. Jika No-Go, tidak rename.
- **Sesudah** Go: admin repo melakukan rename in-place di GitHub Settings → General → Repository name (osn → cac); bukan membuat repo baru atau mengarsipkan osn.
- Catat tanggal, pelaksana, nama repo, repo ID, commit SHA, URL before/after. Hindari mengeksekusi rename melalui perintah tidak didukung konektor.

### F4 — Post-rename verification dan closeout
- Periksa repo id, branch main, commits/tags, issues/PR, permissions dan CI.
- Git remote: git remote set-url origin https://github.com/ahliweb/cac.git; clone baru dan fetch lama sebagai smoke test; dokumentasikan ke contributor.
- Ubah link aktif, GitHub Actions consumer, badge, wiki, webhook, integrations, halaman docs/Pages bila relevan; cek urutan prioritas.
- Regenerasi inventaris portofolio pada pusat tata kelola internal tanpa mengekspos lokasi/namanya ke repo publik; tandai alias historis.
- Pantau kejadian 404, failed Actions, error CLI dan pertanyaan pengguna; tutup issue setelah kriteria diverifikasi.
- Bila ada kegagalan kritikal, **hentikan rollout** dan pulihkan integrasi; rename-balik di GitHub hanya dilakukan berdasarkan persetujuan, setelah menilai akibat terhadap redirect dan koordinasi dependents. GitHub redirect tidak dijadikan satu-satunya rollback plan.

## 4. Daftar file dan perubahan (target, belum dilaksanakan)
| Berkas/pola | Jenis | Tindakan |
| --- | --- | --- |
| README.md, AGENTS.md, CONTRIBUTING.md | Docs | identitas platform dan konteks non-afiliasi OSN, perintah baru, migrasi links |
| package.json, bun.lock, src/index.ts | Code/metadata | package name private, bin cac + osn, exported packageInfo |
| src/cli/index.ts, src/cli/run-cli.ts | Code | command label/help/new name + alias, jangan ubah kontrak diam-diam |
| src/cli/commands/**, src/cli/sma-commands.ts | Code/docs | nama pada usage/error/perintah; audit per program |
| src/schema/**, src/domain/**, src/render/**, data/** | **Invariant** | hanya audit referensi identitas, jangan mengubah struktur atau substansi program |
| docs/cli/**, docs/panduan/**, docs/architecture/**, docs/requirements/** | Docs | canonical terminology; jaga tautan dan dokumen historis |
| docs/development/**, docs/operations/**, docs/governance/** | Docs | rilis, perintah dan penanggung jawab; privasi tetap |
| docs/programs/**, docs/silabus/**, content/** | Content | program osn tetap osn; pembaruan judul platform saja bila perlu |
| tests/unit/**, tests/integration/** | Test | alias, help, default, JSON, code, skema, regression |
| .github/workflows/**, .github/ISSUE_TEMPLATE/** | CI/governance | nomenklatur baru dan action/consumer audit |
| .changeset/**, CHANGELOG.md, docs/releases/** | Release | catat migration release secara tepat; versi syllabus independen |
| external clones, imports, links, workflows | External | consumer inventory + targeted updates |

## 5. Matriks kontrak CLI dan deprecation
| Kasus | Sebelum | Saat coexistence | Setelah (opsional; belum diputuskan) |
| --- | --- | --- | --- |
| Executable utama | osn | **cac** | cac |
| Executable lama | osn | **osn** alias diuji otomatis | tetap atau hapus hanya di MAJOR dan setelah pemberitahuan |
| osn validate --program osn | berfungsi | harus berfungsi sama | kebijakan deprecation terpisah |
| osn validate --program sma-coding | berfungsi | harus berfungsi sama | kebijakan deprecation terpisah |
| cac validate [--program ID] | belum ada | fungsi setara dengan osn | canonical |
| status exit | 0 / 1 / 2 | invariant untuk dua alias | invariant |
| --help | osn branding | cac branding pada cac; osn tetap dokumentasikan alias dan kompatibilitas | migrasi docs |
| --version | package.json versi | satu versi software | tidak terikat ke syllabusVersion |
| --json | format output saat ini | jangan mengubah kontrak mesin-baca/urutan yang dijanjikan | perubahan khusus versioned |
| scripts bun run validate/privacy-check | berbasis src/cli/index.ts | tetap lewat core sama; migration mengikuti PR terpisah | canonical setelah tes |

**Catatan:** perubahan text branding pada stdout/stderr yang dikonsumsi sistem luar dapat menjadi breaking change. Selidiki consumer nyata dan adopsi compatibility facade atau major SemVer bila perlu. Jangan berjanji 100% bitwise-identical output ketika branding sengaja berubah.

## 6. Quality gates dan evidence
- Baseline: catat package version, main SHA, env Bun, seluruh checks yang berjalan sebelum PR.
- Minimal: bun install --frozen-lockfile; bun run format:check; bun run lint; bun run assist:check; bun run typecheck; bun run test:coverage; bun run build; bun run validate; bun run privacy-check; bun run check:requirements; bun run check:fidelity; bun run check:module-code; khususnya osn validate --program osn dan cac validate --program osn.
- Test CLI langsung: help/no arg/unknown/--version/--json, validasi osn dan sma, render/plan/report/checklist sesuai dukungan tiap program. Tetap periksa exit code.
- Pastikan hash atau perbandingan struktural corpus/registry sebelum dan sesudah tanpa diffs tak disengaja. Gunakan synthetic fixtures saja.
- Lakukan audit secret scanning dan izin token, branch protection, CI output, links.
- Wajib evidence berupa commit SHA, CI run URL, hasil test, daftar consumer diverifikasi dan keputusan gate; jangan menandai lulus berdasarkan dokumen saja.

## 7. Risiko eksternal dan rollback

Matriks risiko lengkap (19 risiko), gladi lokal recovery dan rename-back, serta checklist Go/No-Go: [2026-11-cac-security-recovery.md](2026-11-cac-security-recovery.md) (F1/04, #155).

| Risiko | Pencegahan | Respons saat kejadian |
| --- | --- | --- |
| Link lama redirect tidak lengkap | audit URLs, update canonical | perbaiki link di sumber dan periksa redirect |
| GitHub Actions uses: ahliweb/osn@... gagal | cari consumer sebelum rename, update uses | perbaiki action consumer, rollback deployment jika perlu |
| GitHub Pages project URL berubah | audit Pages sebelum rename | sesuaikan URL/custom domain dan verifikasi |
| External workflows/webhook memakai repo_full_name | inventaris integrasi | perbarui hook/integrasi dan token/izin jika perlu |
| CLI osn terhapus terlalu cepat | alias tetap, contract tests | rilis hotfix kompatibilitas |
| Registry osn diubah keliru | proteksi fixtures dan review | revert kode lewat PR/hotfix; hindari restore dataset manual tanpa bukti |
| Release SemVer salah | review consumer API/CLI, changeset | rilis koreksi dan notice deprecation |
| Alias historis dibajak setelah nama lama dipakai ulang | jangan membuat repository lain dengan nama osn | lindungi redirect dan gunakan URL canonical |

## 8. Go/No-Go objektif
**Go** hanya jika:
- [ ] ADR-0009 dan dokumen spec sudah di-review, README/agent docs tersinkron pada rencana.
- [ ] Gate 9 dicatat lulus sebelum perubahan kode.
- [ ] Alias legacy+canonical lolos tes dan CI di main (bukan hanya branch).
- [ ] Tidak ada perubahan tak direncanakan pada program IDs/syllabus versions/corpus.
- [ ] Semua consumer eksternal berisiko tinggi diinventaris dan ada owner/mitigasi.
- [ ] Alias GitHub Action/Pages telah diverifikasi jika dipakai; bukan asumsi redirect.
- [ ] Repo target cac tersedia; admin permission diverifikasi.
- [ ] Rehearsal, recovery dan langkah komunikasinya dicatat.
- [ ] Gate 15 dicatat lulus, tidak ada blocker P0/P1.
- [ ] Izin operasi rename dari pemilik diberikan pada tahap eksekusi setelah persiapan.

**No-Go** bila ada butir yang tidak terbukti. Persetujuan nama sekarang hanya mencakup identitas target, bukan Go operasional.

## 9. Referensi
- ADR-0009; docs/requirements/identity-cac.md; docs/migrations/2026-11-cac-impact-matrix.md; docs/roadmap.md.
- Bukti F1/02 (#153), kontrak CLI dan golden baseline: [2026-11-cac-cli-contract.md](2026-11-cac-cli-contract.md).
- GitHub, Renaming a repository: https://docs.github.com/en/repositories/creating-and-managing-repositories/renaming-a-repository
- SemVer 2.0.0: https://semver.org/
- NIST SP 800-218 SSDF: https://csrc.nist.gov/pubs/sp/800/218/final
- ISO/IEC 27001, 27002, 27005, ISO/IEC 20000-1, ISO 22301 dan prinsip change management sebagai rujukan praktik, bukan klaim sertifikasi.

## Changelog
### 2026-11-19 - v1.0.0
- Rencana migrasi, compatibility contract, stage gates, verification dan rollback disiapkan; belum dieksekusi.
