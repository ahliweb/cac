# Matriks Dampak Migrasi OSN ke CaC

## Metadata
- Version: v1.0.0
- Last updated: 2026-11-19
- Changeset: Mendaftar kontrak terdampak, prioritas, pengujian, dan pekerjaan lintas-repo sebelum rename.

## Baseline terverifikasi (2026-11-19)
| Aspek | Nilai saat audit | Status target |
| --- | --- | --- |
| Repository | ahliweb/osn, branch utama main, publik | ahliweb/cac; main dipertahankan |
| Identitas | README: kurikulum-informatika | AhliKoding Curriculum / Curriculum as Code |
| Package | package.json name=kurikulum-informatika, private=true, version=2.3.0 pada snapshot audit | curriculum-as-code, private tetap true |
| CLI | package.json bin.osn = src/cli/index.ts; runCli/help/error menulis osn | bin.cac + bin.osn alias kompatibel |
| Sumber program | data/osn/, data/sma-coding/, data/programs.json | semua ID/path program dipertahankan |
| Konten | content/<program>/modules, docs/programs, docs/silabus | tidak menulis ulang atau merelabeli sejarah |
| Validasi | Zod, audit corpus, fidelity, privacy check, perintah validate | tetap lulus; tes kontrak CLI baru+lama |
| CI | .github/workflows/ci.yml Bun + typecheck/lint/test/build/validate/privacy | gate sama ditambah uji perintah baru dan referensi |
| Dokumentasi | README, AGENTS, docs/cli, docs/architecture, docs/development, docs/requirements, docs/panduan | konsisten identitas platform, sumber OSN historis tetap benar |
| Release | .changeset/, CHANGELOG, docs/releases | catat breaking/non-breaking berdasarkan kontrak; jangan ubah versi silabus |
| Eksternal | clone, forks, dependents, PR badges, webhook, Actions, Pages, packages, URLs | inventaris sebelum rename; validasi satu per satu pasca-rename |

## Klasifikasi dampak dan acceptance test
| ID | Target/area | Risiko | Perubahan | Bukti wajib |
| --- | --- | --- | --- | --- |
| IMP-01 | URL repo, issue, PR, clone | High | Rename in-place setelah approval | Link baru, redirect lama, git remote -v, issue/PR masih ada |
| IMP-02 | CLI dan scripts | High | cac canonical, osn compatibility alias; help konsisten | snapshot exit 0/1/2, stdout/stderr, JSON, plan/render/report/validate untuk kedua bin |
| IMP-03 | NPM private package / entrypoint | High | Name private package, metadata packageInfo dan imports yang relevan | bun install --frozen-lockfile, build, bun test, cek import/penggunaan internal |
| IMP-04 | Registry dan skema kurikulum | Critical | **Tidak mengganti** ID osn dan direktori data/osn | fixture & corpus hash/semantic diff, fidelity per program, no silent default change |
| IMP-05 | CI/CD, composite/reusable Actions | High | Ubah referensi remote setelah audit; jangan berasumsi redirect | green CI + uji action consumer bila ada |
| IMP-06 | Documentation and links | Medium | Rename referensi operasional; pertahankan sitasi historis yang valid | link checker dan review false-positive |
| IMP-07 | Release & SemVer | Medium | Compatibility plan, release changeset khusus bila user-facing | changelog unreleased, versi program unchanged |
| IMP-08 | Forks, local clones, external apps | High | Audit owner, Git remote, webhooks, CODEOWNERS, packages/pipelines | daftar consumer dengan pemilik, tindak lanjut, hasil verifikasi |
| IMP-09 | Privacy/security/governance | High | Non-affiliation OSN, tanpa PII, review permission/secret/approval | privacy-check, diff review, no tokens in docs |
| IMP-10 | GitHub Pages dan badges | Conditional | Verifikasi apakah aktif; update jika ada | bukti aktif/tidak aktif, smoke test URL |
| IMP-11 | Knowledge-base dan portfolio inventory | Medium | Index internal pasca-rename di satu sumber kebenaran | status inventaris akurat, tidak mengungkap lokasi pedoman internal di publik |
| IMP-12 | Rilis rollback | High | Snapshot tags/branch, change log, runbook pemulihan | rehearsal, penjagaan kesesuaian ID repo, bukti Go/No-Go |

## Lima kasus regresi wajib
1. **OSN legacy:** perintah osn validate --program osn harus mempertahankan exit code, format JSON dan hasil audit baseline.
2. **Multi-program:** perintah cac validate pada semua program terdaftar harus menemukan corpus yang sama; tidak boleh mengubah registry.
3. **SMA coding:** cac plan --program sma-coding dan osn plan --program sma-coding menghasilkan konten semantik setara; tes CLI terpisah dari rendering.
4. **Bantuan/error:** cac --help memakai branding baru; osn --help tetap dapat digunakan; unknown flag/command tetap exit 2.
5. **Integrasi sumber:** issue historis, clone git remote dan consumer GitHub Actions (jika ditemukan) diperiksa sebelum dan sesudah rename.

## Kontrol standar relevan (pemetaan praktik, bukan klaim sertifikasi)
- ISO/IEC 27001:2022 / 27002:2022: kontrol perubahan, akses, backup, keamanan informasi, supplier dan konfigurasi.
- ISO/IEC 27005:2022: penilaian risiko dari kemungkinan x dampak untuk dependensi/redirect.
- ISO/IEC 20000-1:2018: change enablement, service configuration, release/deployment.
- ISO 22301:2019: kesinambungan operasional dan latihan pemulihan.
- ISO/IEC 27034-1:2011: keamanan aplikasi sepanjang siklus pengembangan.
- ISO/IEC 27701 (edisi yang berlaku saat implementasi): pengendalian data pribadi; repo tidak berisi data siswa.
- ISO/IEC 15408: tidak mengklaim evaluasi Common Criteria karena rename repository tidak merupakan sertifikasi produk keamanan.
- Kepatuhan konteks Indonesia: UU 27/2022 PDP dan PP 71/2019 PSTE dievaluasi secara proporsional bila ada pengolahan data pribadi/integrasi layanan. Dokumen ini bukan penilaian hukum penuh.

## Open questions yang harus ditutup sebelum Go/No-Go
- Siapa consumer CLI di luar repo? Berapa lama alias osn wajib tersedia?
- Adakah aplikasi yang mengimpor package name lama?
- Adakah workflow eksternal yang menggunakan ahliweb/osn sebagai GitHub Action?
- Apakah GitHub Pages, releases assets, webhooks, integrations, badges, DNS dan deployment aktif terkait repo?
- Apakah branch main dilindungi; siapa reviewer/approver dan pemegang kunci rilis?
- Apakah alias CLI osn yang saat ini tersurat di skrip semua perlu diberi deprecation notice? Default perilaku osn dan cac apakah identik atau ada breaking change yang disetujui?

## Changelog
### 2026-11-19 - v1.0.0
- Baseline dan matriks risiko/acceptance test perubahan identitas.
