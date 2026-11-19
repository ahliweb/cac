# Tinjauan Silang dan Usulan Gate 9 (Kesiapan Implementasi F2) Migrasi OSN ke CaC

## Metadata
- Version: v1.2.0
- Last updated: 2026-11-20
- Status: **Gate 9 PASSED, diputuskan pemilik 2026-11-20** lewat dialog pilihan (opsi "PASSED (Disarankan)"), hanya untuk kesiapan implementasi F2. Rename repository belum dilakukan dan tetap menunggu Gate 15 serta izin eksekusi terpisah.
- Issue: #156 (turunan epik #150, fase F1); mendukung seluruh IDENTITY-CAC-001..010
- Changeset: Mencatat tinjauan silang ADR-0009, kebutuhan, roadmap, matriks dampak, runbook, dan empat audit F1; applicability UX/ERD/RBAC/API; tabel bukti per kebutuhan; usulan verdict Gate 9; dan konsolidasi butir keputusan pemilik menjadi empat pertanyaan dialog. Tidak mengubah kode, paket, CLI, data, atau setelan GitHub.
- Konteks: [ADR-0009](../architecture/adr/0009-cac-platform-identity.md), [IDENTITY-CAC](../requirements/identity-cac.md), [roadmap](../roadmap.md), [matriks dampak](2026-11-cac-impact-matrix.md), [rencana migrasi](2026-11-osn-to-cac.md)
- Masukan audit: [inventaris consumer](2026-11-cac-consumer-inventory.md) (#152), [kontrak CLI](2026-11-cac-cli-contract.md) (#153), [invariants](2026-11-cac-invariants.md) (#154), [keamanan dan recovery](2026-11-cac-security-recovery.md) (#155)
- Keputusan pemilik yang berlaku (komentar epik #150, 2026-11-19): AI menyusun bukti dan usulan; **pemilik memutuskan** PASSED atau NOT PASSED lewat dialog. Rename tetap menunggu Gate 9, Gate 15, dan izin eksekusi terpisah.

| Catatan keputusan Gate 9 | Isi |
| --- | --- |
| Verdict yang diusulkan | PASSED (hanya untuk kesiapan implementasi F2), lihat bagian 5 |
| Pengusul | Agent pelaksana, tanggal usulan 2026-11-19 (diverifikasi orchestrator) |
| Keputusan pemilik | **PASSED** (dialog pilihan 2026-11-20, opsi disarankan) |
| Reviewer | Pemilik repositori (keputusan lewat dialog orchestrator); bukti diverifikasi orchestrator |
| Tanggal keputusan | 2026-11-20 |

Gate 9 di dokumen ini berarti **kesiapan implementasi F2** (Definition of Ready sebelum refactor kompatibilitas `cac`/`osn`), bukan izin rename. Gate 15 dan izin eksekusi rename tidak dibahas di sini selain sebagai prasyarat yang tetap tertahan.

## 1. Metode
1. Membaca utuh ADR-0009, `identity-cac.md`, `roadmap.md`, matriks dampak, rencana migrasi (runbook), dan keempat dokumen audit (#155 dibaca dari cabang kerjanya karena belum ada di `main`).
2. Membandingkan setiap pasangan dokumen pada lima sumbu: identitas (nama, slug, paket, CLI), urutan dan gerbang (Gate 9, Gate 15), kontrak CLI dan SemVer, rollback dan recovery, serta angka (versi, jumlah, SHA).
3. Mengukur ulang fakta yang bisa berubah sejak audit, pada `main` commit `d54c582` (worktree bersih), semuanya read-only:

| Pemeriksaan | Perintah | Hasil |
| --- | --- | --- |
| Versi software | `grep '"version"' package.json` | 2.5.0 |
| Hash agregat `data/**/*.json` terhadap baseline #154 | `find data -type f -name '*.json' \| LC_ALL=C sort \| xargs sha256sum \| sha256sum` | `0de993e24edb...b8d5`, **sama** dengan baseline (data tidak bergeser dari `3eb5d89` sampai `d54c582`) |
| Validasi korpus | `bun run validate` | exit 0 |
| Privasi | `bun run privacy-check` | exit 0, 72 berkas, 0 temuan |
| Fidelity | `bun run check:fidelity` | exit 0 |
| Register kebutuhan | `bun run check:requirements` | exit 0 (tidak memeriksa `IDENTITY-CAC-*`, lihat X-02) |
| Proteksi `main` | `gh api repos/ahliweb/osn/branches/main/protection` | HTTP 404 "Branch not protected" |

4. Perbaikan discrepancy non-blocking yang murni dokumentasi diterapkan langsung pada `docs/migrations/*` dan `docs/requirements/identity-cac.md` dan dicatat di bagian 2. ADR-0009, `register.md`, `traceability.md`, runbook, roadmap, kode, dan data **tidak diubah**; usulannya ada di bagian 2.
5. Tidak dijalankan: tes penuh, rehearsal di GitHub, perubahan setelan GitHub, pembuatan issue, PR, atau komentar.

## 2. Discrepancy lintas dokumen
Tingkat: **blocking** bila mencegah F2 dimulai dengan benar (Gate 9) atau membuat dua dokumen saling meniadakan; **non-blocking** bila hanya basi, ambigu, atau menjadi syarat tahap lebih akhir (ditandai "Gate 15" bila relevan di sana).

**Hasil: 0 discrepancy blocking untuk Gate 9; 13 non-blocking (2 diperbaiki, 2 sebagian, 6 diusulkan, 2 dicatat, 1 dilaporkan).**

| ID | Dokumen A berkata | Dokumen B berkata | Tingkat | Perbaikan | Status |
| --- | --- | --- | --- | --- | --- |
| X-01 | Matriks dampak (baseline): `version=2.3.0 pada snapshot audit` | `package.json` 2.5.0; inventaris C-06 dan kontrak CLI memakai 2.5.0 | Non-blocking | Mengganti dengan 2.5.0 dan menandai 2.3.0 basi di matriks (v1.0.1) | **Diperbaiki** |
| X-02 | AGENTS.md: `check:requirements` memverifikasi register dan traceability "consistent and exhaustive"; `identity-cac.md` memuat 10 kebutuhan | `register.md` dan `traceability.md` tidak merujuk `identity-cac.md`; pola ID di `scripts/check-requirements.ts` hanya `^(FR\|TR\|OR\|ER\|GR)-\d{2}$`, sehingga `IDENTITY-CAC-001` tidak bisa didaftarkan tanpa mengubah skrip | Non-blocking (bukti dilacak manual di bagian 4); risiko drift tak terdeteksi mesin | Sebagian: catatan verifikasi ditambahkan ke `identity-cac.md` (v1.0.1). Usulan: issue F2/05 memperluas skrip dengan pola kedua (`IDENTITY-CAC-\d{3}`) dan tes, atau memutuskan secara tertulis bahwa berkas ini tetap ditinjau manual. Perubahan skrip di luar scope #156 | **Sebagian**; usulan ke orchestrator |
| X-03 | ADR-0009, Context: "IDENTITY-CAC-001..009" | `identity-cac.md`, epik #150, #156: 001..010 (CAC-010 rollout dan rollback) | Non-blocking (salah ketik; keputusan ADR tidak terpengaruh) | Ubah teks ADR menjadi 001..010 beserta entri changelog ADR; ADR di luar daftar yang boleh diubah di issue ini | **Diperbaiki** orchestrator di PR #156 (ADR-0009 v1.0.1) |
| X-04 | Matriks dampak, open question: "Apakah branch main dilindungi?" (belum dijawab); AGENTS.md aturan 10 mengandalkan check `SUCCESS` sebelum merge | Inventaris N-13 dan keamanan R-01: HTTP 404, 0 ruleset, satu admin; gerbang hanya ditegakkan disiplin proses | Non-blocking untuk F2 (keadaan ini berlaku untuk semua PR sejak awal); tinggi untuk Gate 15 (G-04) | Matriks: pertanyaan dijawab dan dipetakan ke N-13, R-01, P-01 (v1.0.1). Keputusan aktivasi: pertanyaan dialog 3 | **Diperbaiki** (dokumen); keputusan menunggu pemilik |
| X-05 | Runbook F3: "Latih runbook pemulihan di lingkungan aman / simulasi dokumentasi" | Keamanan G-09 dan bagian 4.3: rehearsal H-01..H-07 di repo uji sungguhan, termasuk rename-balik; simulasi lokal tidak membuktikan perilaku GitHub | Non-blocking untuk Gate 9; **blocking untuk Gate 15** (G-09) | Runbook disetel di #157: rehearsal wajib di repo uji, simulasi dokumentasi tidak cukup | **Diusulkan** (#157) |
| X-06 | Runbook bagian 3 F1 dan 9 hanya merujuk #152 dan #153; kontrak CLI bagian 8 meminta matriks dampak dan runbook menautkan dokumennya | Matriks IMP-02, IMP-03, IMP-12 tanpa tautan bukti; runbook tanpa tautan ke #154, #155, #156 | Non-blocking | Tautan ke inventaris, kontrak CLI, dan keamanan ditambahkan di tabel open questions matriks (v1.0.1). Runbook ditautkan di #157 agar tidak bentrok dengan penulisan ulangnya | **Sebagian**; sisanya #157 |
| X-07 | Roadmap: Gate 9 lulus "sebelum membuat issue implementasi kode/menjalankannya"; epik #150 langkah 4: issue F2-F4 disusun "setelah DoR" | Runbook bagian 8: "Gate 9 dicatat lulus sebelum perubahan kode" (tidak menyebut pembuatan issue); runbook bagian 3 F2 sudah memerinci PR 1 sampai 4 | Non-blocking (tafsir) | Tafsir yang dipakai dokumen ini: issue F2 baru dibuat dan dikerjakan **sesudah** pemilik mencatat Gate 9. Usulan: roadmap menyatakan hal itu sebagai satu kalimat | **Diusulkan** |
| X-08 | Runbook F2: "PR 1..PR 4" | Roadmap: F2/01..F2/06; invariants: "PR F2-A, F2-B, F2-C"; kontrak CLI: 13 uji CLI-C-01..13 tanpa nomor PR | Non-blocking (tiga skema penomoran) | Pakai satu skema: roadmap F2/01..06 sebagai acuan. Pemetaan usulan: F2-A dan F2-B ke F2/04 (tes kontrak), F2-C ke F2/05 (CI), CLI-C-01..13 ke F2/04, runbook PR 4 (consumer eksternal) hanya bila U-03 menemukan consumer | **Diusulkan** (saat issue F2 dibuat) |
| X-09 | Inventaris dan invariants: baseline commit `3eb5d89`; keamanan: `e7e1e52` | `main` sekarang `d54c582`; jumlah issue 78, PR 166, terbuka 2 PR dan 9 issue, serta 859 clone bergantung waktu | Non-blocking | Hash agregat dan versi 2.5.0 diukur ulang hari ini dan **identik** (bagian 1). Angka dinamis wajib diukur ulang saat freeze (G-02, G-05); tidak disalin ke gerbang | **Dicatat** |
| X-10 | Inventaris C-01: 773 kemunculan `osn <perintah>` di 134 berkas (docs 435; src, tests, scripts 327) | Kontrak CLI 2.5: 446 kemunculan di 45 berkas dokumen | Non-blocking (lingkup dan pola hitung berbeda; keduanya mengakui hasil ulang perintah yang berlaku) | Tidak direkonsiliasi; F2/03 memakai hasil ulang `git grep` saat itu, bukan angka dokumen | **Dicatat** |
| X-11 | Matriks IMP-02: bukti "snapshot exit 0/1/2, stdout/stderr ... untuk kedua bin"; runbook: "fungsi setara" | Kontrak CLI K4: prefiks stderr/stdout teks memang berbeda (`cac:` vs `osn:`), JSON dan exit code identik; CLI-C-10: `osn` harus sama persis dengan baseline | Non-blocking (kesetaraan = semantik: exit code dan JSON; teks berawalan nama pemanggil) | Dinyatakan di tes F2/04: snapshot per bin, kesetaraan JSON byte-identik dan exit code, teks bermerek dibandingkan per nama | **Diusulkan** (F2/04) |
| X-12 | IDENTITY-CAC-010: rollout SHALL punya "observabilitas kegagalan"; evidence "monitoring summary" | Keamanan 5.5 hanya memuat stop condition; runbook F4 "Pantau kejadian ..." tanpa templat log atau ringkasan pemantauan | Non-blocking (bukti baru wajib pada F3/F4); Gate 15 | Templat migration log dan ringkasan pemantauan dikerjakan #157 | **Diusulkan** (#157) |
| X-13 | AGENTS.md baris `data/<id>`: `tk-coding` "v1.0.2" (baris lain di berkas yang sama: 1.0.3); `docs/programs/README.md`: `sma-coding` `syllabusVersion` 1.4.0 | `data/programs.json` dan invariants: `sma-coding` 1.4.1, `tk-coding` 1.0.3 | Non-blocking, **di luar scope** (bukan dokumen migrasi) dan tidak memengaruhi Gate 9 | Dilaporkan ke orchestrator untuk issue docs terpisah; tidak disentuh | **Diperbaiki** orchestrator: AGENTS.md di PR #156, `docs/programs/README.md` di PR #249 (#237) |

Konsistensi yang diperiksa dan **sesuai** (tidak ada discrepancy):
- ADR-0009 butir 1-8, runbook bagian 1-3, roadmap F1-F4, dan IDENTITY-CAC sepakat pada: slug `ahliweb/cac`, rename in-place, program `osn` tidak diganti, CLI `cac` canonical dengan alias `osn`, SemVer terpisah dari `syllabusVersion`, Gate 9 sebelum refactor dan Gate 15 sebelum rename.
- Kontrak CLI (alias dua entri tipis, tanpa peringatan runtime, alias hanya dihapus di MAJOR) konsisten dengan ADR-0009 butir 4 dan runbook bagian 5; tidak ada yang menyatakan perilaku default program berubah.
- Invariants INV-01..10 konsisten dengan non-goals `identity-cac.md` dan baris "Invariant" di runbook bagian 4.
- Rollback: keamanan 5.2 (recovery maju sebagai default, rename-balik bersyarat) konsisten dengan runbook F4 ("GitHub redirect tidak dijadikan satu-satunya rollback plan") dan ADR (rename adalah operasi administratif).
- Larangan memakai ulang nama lama (`osn`): ADR konsekuensi, runbook bagian 7, keamanan R-03.

## 3. Applicability UX, ERD, RBAC, dan API
Perubahan ini adalah identitas platform (nama repo, paket, CLI) tanpa UI, database, layanan, atau peran aplikasi baru ([non-goals](../requirements/identity-cac.md)). Tabel berikut menjelaskan satu per satu mengapa artefak baru tidak dibutuhkan; ini hasil pemeriksaan, bukan asumsi.

| Artefak | Perlu artefak baru? | Alasan dan bukti | Yang menjadi pengganti |
| --- | --- | --- | --- |
| UX / UI | Tidak | Tidak ada antarmuka grafis atau alur pengguna baru. Satu-satunya "UX" adalah teks CLI (help, galat, judul Markdown) dan dokumen panduan. Perubahan wording terukur dan dikunci di kontrak CLI bagian 4.2 dan 5.5 dan di uji CLI-C-02/03 | [Kontrak CLI](2026-11-cac-cli-contract.md); docs/cli dan docs/panduan di F2/03 |
| ERD / model data | Tidak | Tidak ada database. Data kurikulum adalah JSON yang dijaga skema Zod; rename tidak menyentuh `src/schema/`, `src/domain/`, `data/` (INV-10). Tidak ada skema, kolom, atau relasi baru | [Invariants](2026-11-cac-invariants.md) INV-01..10; hash baseline dan `git diff --stat -- data/ src/schema/ src/domain/` kosong sebagai syarat tiap PR F2 |
| RBAC / peran | Tidak ada model RBAC aplikasi | Repo tidak punya login atau peran aplikasi. Yang ada adalah izin GitHub: satu kolaborator berperan `admin` (R-13), `CODEOWNERS` `* @ahliweb` (C-09), `main` tanpa proteksi (R-01). Itu setelan platform, ditangani audit keamanan dan keputusan P-01 serta P-04, bukan artefak RBAC | [Keamanan dan recovery](2026-11-cac-security-recovery.md) bagian 2.1, 3; pertanyaan dialog 3 |
| API | **Ya, tetapi sudah ada**: CLI adalah antarmuka publik repo ini | Tidak ada HTTP, REST, GraphQL, atau OpenAPI. Antarmuka publik yang bisa dipakai skrip adalah nama perintah, flag, `--json`, exit code 0/1/2, dan `--version`. Kontrak legacy dipetakan dengan golden baseline 48 baris dan 13 uji kontrak usulan. Ekspor pustaka `packageInfo` di `src/index.ts` privat (`private: true`, tanpa registri, tanpa importer yang diketahui) | [Kontrak CLI](2026-11-cac-cli-contract.md) (#153) menggantikan OpenAPI; tidak membuat spesifikasi API terpisah |
| Dokumen keputusan | Sudah ada | ADR-0009 sudah mencatat keputusan identitas; kontrak CLI memuat butir keputusan teknis yang belum diputuskan | Pertanyaan dialog 2 |

Bila F2 ternyata menambah permukaan baru (mis. flag, perintah, atau ekspor pustaka baru), applicability di atas gugur untuk bagian itu dan kontrak CLI harus diperbarui lebih dulu.

## 4. Evidence per IDENTITY-CAC-001..010
Kriteria #156: setiap kebutuhan punya acceptance evidence **atau owner**. "Bukti" di bawah adalah bukti kesiapan (F1); bukti akhir yang hanya mungkin sesudah implementasi ditandai tahapnya. Tidak ada kebutuhan yang dinyatakan terverifikasi di sini.

| ID | Bukti yang sudah ada (F1) | Celah | Owner dan tahap | Kecukupan untuk Gate 9 |
| --- | --- | --- | --- | --- |
| IDENTITY-CAC-001 (identitas CaC, `ahliweb/cac`) | ADR-0009 (Accepted, 2026-11-19); inventaris N-16 (`ahliweb/cac` belum dipakai, HTTP 404) | Bukti akhir (metadata GitHub sesudah rename) hanya ada di F3 dan F4 | Pemilik repo; F3/02 (rename) dan F4/02 | Cukup (owner dan tahap jelas); bukti akhir F3 |
| IDENTITY-CAC-002 (`osn` tetap ID program) | Invariants INV-01..03, INV-10; baseline hash 71 berkas **diukur ulang 2026-11-19, identik**; fixture K0-K9 (bagian 4 invariants); tes `program-registry`, `programs`, `cli-validate-fixtures`, fidelity; `validate` dan `check:fidelity` exit 0 | Belum ada tes yang mengunci eksplisit tujuh id, `corpusDir`, dan urutan; fixture K7 menunjukkan `osn` lolos validate, fidelity, dan privacy sehingga hanya hash/diff yang menangkapnya | F2/04 (tes kontrak registry); F2/05 (langkah hash di CI) | Cukup |
| IDENTITY-CAC-003 (`cac` canonical, alias `osn`) | Kontrak CLI 2.1-2.5, 4.2, 5.1 (K1), 6 (CLI-C-12, CLI-C-13) | Belum ada kode dan tes; mekanisme alias menunggu K1 | F2/01 (bin dan satu core); F2/04 (tes) | Cukup bila K1 diputuskan (pertanyaan 2) |
| IDENTITY-CAC-004 (perilaku `osn` dipertahankan) | Golden baseline 48 baris dengan exit code dan hash (kontrak CLI bagian 3); invarian 4.1; uji CLI-C-01..11; analisis stabilitas stderr (5.2) | Baris yang tidak dijalankan (exit 1 `validate` dan privasi `report`, `--out`/`--force`) harus ditutup fixture di F2; path absolut perlu normalisasi | F2/04; CI F2/05 | Cukup |
| IDENTITY-CAC-005 (SemVer terpisah dari `syllabusVersion`) | Invariants INV-08 dan lapis 6; kontrak CLI 5.3 (minor untuk tambahan, major untuk penghapusan alias atau perubahan prefiks alias); `releasing.md`; versi software 2.5.0 vs `syllabusVersion` per program terukur | Tidak ada tes yang memisahkan `package.json` `version` dari `syllabusVersion` (usulan F2-B); jenis bump final menunggu K4 | F2/06 (changeset dan catatan kompatibilitas); F2/04 (tes) | Cukup bila K4 diputuskan |
| IDENTITY-CAC-006 (docs membedakan platform dari program OSN, non-afiliasi) | Inventaris C-02 (daftar baris instruksi dengan nama lama); AGENTS.md dan README sudah memuat penanda independen "bukan materi resmi Puspresnas / IA TOKI / IOI"; kontrak CLI 5.5 (usulan help `cac`) | Teks akhir README, AGENTS, docs/cli, docs/panduan baru ditulis di F2; wording help menunggu K7 | F2/03 (docs); tinjauan link dan full-text | Cukup (owner dan daftar baris ada) |
| IDENTITY-CAC-007 (rename in-place setelah Gate 9, tes, Gate 15) | Keamanan bagian 5-6 (prosedur, checklist G-01..G-14, kriteria rename-balik); runbook bagian 3 F3 dan 8; ADR-0009 butir 1 dan 8; larangan memakai ulang nama lama | Bukti akhir (repo ID sama, approval, URL CI) hanya sesudah rename; rehearsal H-01..H-07 belum dijalankan (aktivitas manusia nyata) | Pemilik repo; F3/01, F3/02; Gate 15 | Cukup (owner dan gerbang jelas); bukan syarat F2 |
| IDENTITY-CAC-008 (CI dan consumer diverifikasi, tanpa mengandalkan redirect Actions) | Inventaris: 14 observed, 16 not in use, 7 unknown; C-07 (CI hanya `actions/checkout`, `oven-sh/setup-bun`); N-14 (0 consumer `uses: ahliweb/osn`); keamanan R-02 dan G-06 (pindai); gladi G (pemindai terbukti menemukan fixture) | U-01, U-03..U-07 belum dijawab pemilik (repo privat/akun lain, integrasi non-GitHub, aplikasi terpasang); `gh search code` tidak menjamin repo privat | Pemilik repo (jawaban U-xx); F4/01 | Cukup untuk F2 (tidak ada consumer Action ditemukan); U-xx syarat G-03 pada Gate 15 |
| IDENTITY-CAC-009 (privasi, keamanan, reproducibility setara atau lebih baik) | `privacy-check` exit 0 (72 berkas, 0 temuan, diukur ulang); `validate` dan `fidelity` exit 0; INV-09; fixture K8 (kunci `email` tertangkap); keamanan: secret Actions, variabel, Dependabot tidak ada nama; R-09 (non-afiliasi); tes privasi yang ada | Tidak ada pemindaian secret otomatis dan tes reproducibility hash (audit F3); `sha_pinning_required=false` (RISK-05) tetap ada | F2/05 (langkah hash non-blocking); F3 (audit secret) | Cukup |
| IDENTITY-CAC-010 (rollout punya pemilik, rollback, observabilitas) | Keamanan: 19 risiko dengan owner dan kontrol (3 High, semuanya bermitigasi); gladi lokal 31 perintah (exit 0 dan kegagalan terdeteksi: 128, 127, `fetch` tetap 0 bila nama dipakai ulang); prosedur recovery maju vs rename-balik (bagian 5); 14 butir Go/No-Go | Observabilitas pasca-rename baru berupa stop condition (5.5) dan baris "Pantau" di runbook F4, belum templat migration log; perilaku GitHub (redirect, rename-balik) belum terbukti (H-01..H-07) | Pemilik repo; #157 (templat log); F3 (rehearsal); F4/02 | Cukup untuk Gate 9; X-05 dan X-12 wajib selesai sebelum Gate 15 |

Ringkasan: 10 dari 10 kebutuhan memiliki bukti kesiapan dan owner; 0 dinyatakan terverifikasi (memang belum ada implementasi).

## 5. Usulan Gate 9
**USULAN: PASSED, untuk kesiapan implementasi F2 saja.** Pemilik memutuskan **PASSED** pada 2026-11-20 (bagian 6, pertanyaan 1). Syarat S-1 terpenuhi oleh jawaban pertanyaan 2.

### 5.1 Alasan
1. **Tidak ada discrepancy blocking** antara ADR, baseline, kontrak CLI, dan rollback (bagian 2: 0 blocking, 13 non-blocking). Kriteria kedua #156 terpenuhi.
2. **Setiap IDENTITY-CAC-001..010 memiliki bukti kesiapan dan owner** (bagian 4). Kriteria pertama #156 terpenuhi.
3. **Baseline dapat direproduksi:** hash agregat data dan versi diukur ulang pada `main` terbaru dan identik dengan baseline #154; `validate`, `privacy-check`, `check:fidelity`, `check:requirements` exit 0.
4. **Perubahan F2 terbatas dan terjaga:** hanya entri bin, metadata paket, dokumen, tes, dan CI; `data/`, `src/schema/`, `src/domain/` tidak boleh berubah (INV-10), dengan deteksi enam lapis dan fixture sintetis yang membuktikan perubahan sekecil satu byte tertangkap (K7 hanya oleh hash).
5. **Rollback F2 sederhana:** revert PR biasa; tidak ada tindakan administratif GitHub pada F2. Risiko High yang tersisa (R-01, R-05, R-12) bermitigasi, dan dua di antaranya (R-01, R-12) baru mengikat pada Gate 15.
6. **Tidak ada keputusan teknis yang belum bisa dikerjakan** selain butir K1-K7 yang diusulkan beserta rekomendasi dan dibawa ke pemilik di pertanyaan 2.

### 5.2 Blocker
- **Blocker Gate 9: tidak ada.**
- Ketergantungan administratif (bukan blocker kualitas): dokumen #155 harus sudah di `main` dan dokumen ini ikut digabung sebelum pemilik mencatat Gate 9, supaya bukti yang dirujuk dapat diaudit di `main`.

### 5.3 Syarat untuk lulus dan syarat masuk F2
| # | Syarat | Pemeriksa |
| --- | --- | --- |
| S-1 | Pemilik mencatat keputusan K1, K2, K4, K5, K6 (pertanyaan 2) sebelum issue F2/01 dan F2/02 dibuat; tanpa itu lingkup F2 ambigu dan Gate 9 menjadi NOT PASSED | Pemilik; orchestrator mencatat |
| S-2 | Setiap PR F2 membuktikan invariants: `git diff --stat -- data/ src/schema/ src/domain/` kosong dan hash agregat tidak berubah; baseline diukur ulang pada `main` tepat sebelum PR dibuka (bukan memakai tabel #154 mentah) | Orchestrator |
| S-3 | Issue F2/04 memuat CLI-C-01..13 sebagai acceptance dan menutup baris golden yang belum diuji (exit 1, `--out`/`--force`, `render modul` `sma-coding`) | Orchestrator |
| S-4 | Issue F2 baru dibuat **sesudah** Gate 9 dicatat (X-07); satu issue satu PR atomik; versi dokumen dan changeset sesuai `releasing.md` | Orchestrator |
| S-5 | Tidak ada merge atau rilis oleh agen selama pemilik atau kontributor lain memegang kunci rilis; papan koordinasi dibaca sebelum merge | Orchestrator |

### 5.4 Bila NOT PASSED
Implementasi F2 tetap tertahan. Syarat untuk lulus ulang: (a) bila alasannya K-butir, pemilik memutuskan K-butir dan tinjauan diperbarui; (b) bila alasannya jawaban unknown, U-xx yang dimaksud dijawab dan dicatat; (c) bila alasannya revisi spesifikasi, ADR atau kontrak direvisi dan tinjauan silang diulang pada bagian yang berubah.

### 5.5 Yang BUKAN artinya PASSED
- Bukan Gate 15, bukan izin rename, dan bukan izin mengubah setelan GitHub; semuanya tetap tindakan pemilik terpisah.
- Bukan klaim bahwa U-01..U-07 sudah dijawab, bahwa rehearsal H-01..H-07 sudah dijalankan, atau bahwa `main` sudah dilindungi.
- Bukan verifikasi IDENTITY-CAC-001, 007, 008, 010 (bukti akhirnya di F3 dan F4).

## 6. Pertanyaan keputusan pemilik (dialog)
Konsolidasi seluruh butir keputusan menjadi empat pertanyaan; opsi pertama di tiap pertanyaan adalah rekomendasi. Teks ini bahan bagi orchestrator; tidak ada jawaban yang dicatat di sini sebagai keputusan. Jawaban teks bebas atau "Lainnya" diperlakukan sebagai instruksi baru, bukan persetujuan.

| Pertanyaan | Header | Butir yang dicakup |
| --- | --- | --- |
| 1. Verdict Gate 9 | Gate 9 | Keputusan utama #156 |
| 2. Paket kompatibilitas CLI untuk F2 | Paket F2 | K1-K7 (#153), U-02 (lama alias, importer nama paket) |
| 3. Proteksi `main` | Ruleset main | P-01 (#155), R-01, X-04 |
| 4. Aturan operasional rename | Aturan F3 | P-03, P-04, P-05, P-06 (#155) |

### Pertanyaan 1 (header: `Gate 9`)
**Gate 9 adalah kesiapan implementasi F2, bukan rename. Verdict mana yang Anda putuskan?**

| Opsi | Label | Deskripsi dan konsekuensi |
| --- | --- | --- |
| 1 | PASSED (Disarankan) | Tidak ada discrepancy blocking, 10 kebutuhan punya bukti atau owner, audit F1 lengkap dan baseline terukur ulang. Issue F2/01..06 dibuat dan dikerjakan sebagai PR atomik. Rename, Gate 15, dan izin eksekusi tetap terpisah dan tertahan |
| 2 | NOT PASSED, lengkapi dulu | F2 tertahan dan F1 diperpanjang, misalnya menunggu semua jawaban U-01..U-07 dan rehearsal repo uji. Biaya: menunda F2 tanpa blocker teknis; U-xx dan rehearsal sebenarnya syarat Gate 15 |
| 3 | NOT PASSED, revisi spek | Anda menolak sebagian ADR atau kontrak (misalnya strategi alias); spesifikasi direvisi dan tinjauan silang diulang. F2 tertahan sampai revisi selesai |

### Pertanyaan 2 (header: `Paket F2`)
**Strategi kompatibilitas CLI yang dibawa ke F2 (K1-K7 kontrak CLI, termasuk lama alias dan waktu ganti nama paket). Mana yang dipilih?**

| Opsi | Label | Deskripsi dan konsekuensi |
| --- | --- | --- |
| 1 | Terima semua rekomendasi (Disarankan) | K1 dua entri tipis `cac` dan `osn` ke satu `runCli`; K2 tanpa peringatan runtime selama transisi awal; K3 `osn` dihapus hanya di MAJOR, minimal 6 bulan setelah pengumuman dan tanpa consumer aktif; K4 prefiks teks tetap `osn:` bagi pemanggil `osn`; K5 judul Markdown artefak tak berubah; K6 nama paket menjadi `curriculum-as-code` di F2 dalam satu PR atomik dengan `packageInfo` dan lockfile; K7 wording help `cac` diajukan di PR F2. Rilis minor, F2 bisa mulai tanpa tanya ulang. Teks `osn` tetap berbunyi OSN sampai rilis major |
| 2 | Terima, tunda ganti paket | K1-K5 dan K7 seperti rekomendasi; K6 diubah: nama paket `kurikulum-informatika` dipertahankan sampai sesudah rename (F4). F2/02 mengecil dan lockfile tak berubah, tetapi nama paket dan nama repo tidak sinkron sementara |
| 3 | Alias ikut bermerek cac | K4 dan K5 diganti: pemanggil `osn` juga mencetak `cac:` dan judul artefak baru. Identitas konsisten, tetapi **MAJOR** (breaking bagi skrip yang mem-parse teks), dan risiko consumer tak dikenal (859 clone, 157 unik, U-01) lebih tinggi |
| 4 | Putuskan per butir nanti | F2/01 dan F2/02 diblokir sampai tiap butir K dijawab di issue masing-masing. Paling fleksibel, paling lambat, dan Gate 9 tidak bisa PASSED bersih sebelum S-1 terpenuhi |

### Pertanyaan 3 (header: `Ruleset main`)
**`main` tanpa proteksi dan ruleset (R-01); Anda satu-satunya admin. Kapan mengaktifkan ruleset? (Agen tidak mengubah setelan GitHub.)**

| Opsi | Label | Deskripsi dan konsekuensi |
| --- | --- | --- |
| 1 | Aktifkan setelah diuji (Disarankan) | Uji dulu di repo uji (H-04), lalu aktifkan sebelum freeze F3: check `Quality` wajib dan larangan force-push serta penghapusan cabang. Review wajib tidak praktis dengan satu admin dan admin tetap bisa bypass. R-01 turun sebelum rename; merge F2 sebelum itu tetap mengandalkan disiplin |
| 2 | Aktifkan sekarang | Kontrol langsung naik untuk PR F2. Risiko: perilaku ruleset sesudah rename belum terbukti (H-04) sehingga mungkin perlu disetel ulang, dan check wajib bisa menghalangi merge darurat |
| 3 | Tunda sampai sesudah rename | Paling sederhana. R-01 tetap High selama jendela rename dan G-04 hanya dijaga disiplin freeze |

### Pertanyaan 4 (header: `Aturan F3`)
**Aturan operasional untuk Gate 15 (bukan syarat Gate 9): jendela rename-balik, cadangan admin, repo uji, dan larangan repo `osn`. Mana yang dipilih?**

| Opsi | Label | Deskripsi dan konsekuensi |
| --- | --- | --- |
| 1 | Terima semua rekomendasi (Disarankan) | Jendela rename-balik aman 24 jam; rename hanya saat Anda tersedia penuh tanpa admin tambahan; Anda membuat dan menghapus sendiri repo uji untuk H-01..H-07; dilarang membuat repo `ahliweb/osn` selama masa alias. G-09 dan G-12 menjadi jelas; butuh waktu Anda di repo uji |
| 2 | Tanpa rename-balik | Hanya recovery maju; risiko R-11 hilang, tetapi tidak ada jalan mundur bila integrasi inti tak bisa dipindah. Rehearsal H-05 gugur; repo uji untuk H-01..H-04, H-06, H-07 dan butir P-04 sampai P-06 tetap seperti opsi 1 |
| 3 | Tunda ke F3 | Tidak diputuskan sekarang; dibawa saat issue F3/01 dibuat. Gate 9 tidak terpengaruh, tetapi lead time repo uji bertambah dan G-12 tetap terbuka |

**Jawaban pemilik (dialog pilihan, 2026-11-20).** Hanya opsi yang dipilih pemilik yang dicatat:

| Pertanyaan | Opsi dipilih | Akibat |
| --- | --- | --- |
| 1. Gate 9 | PASSED (Disarankan) | Issue F2/01..06 boleh dibuat dan dikerjakan sebagai PR atomik; rename, Gate 15, dan izin eksekusi tetap tertahan. |
| 2. Paket F2 | Terima rekomendasi (Disarankan) | K1 dua entri tipis `cac` dan `osn` ke satu `runCli`; K2 tanpa peringatan runtime; K3 `osn` dihapus hanya di rilis MAJOR, paling cepat 6 bulan setelah pengumuman dan tanpa consumer aktif; K4 prefiks `osn:` tetap bagi pemanggil `osn`; K5 judul Markdown artefak tidak berubah; K6 nama paket `curriculum-as-code` di F2 dalam satu PR atomik; K7 wording help `cac` diajukan di PR F2. Rilis minor. |
| 3. Ruleset `main` | Setelah diuji (Disarankan) | Ruleset diuji di repo uji lalu diaktifkan **oleh pemilik** sebelum freeze F3 (check `Quality` wajib, larang force-push dan hapus branch); agent tidak mengubah setelan GitHub. |
| 4. Aturan F3 | Terima rekomendasi (Disarankan) | Jendela rename-balik 24 jam; rename hanya saat pemilik tersedia penuh; pemilik sendiri membuat dan menghapus repo uji untuk rehearsal H-01..H-07; dilarang membuat repo `ahliweb/osn` selama masa alias. |

## 7. Butir ditunda
Tidak masuk dialog karena bukan keputusan pemilik saat ini, belum waktunya, atau bukan wewenang pemilik.

| Butir | Alasan ditunda | Ditunda ke |
| --- | --- | --- |
| U-01, U-03, U-04, U-05, U-06, U-07 | Permintaan informasi (siapa memegang klon, repo privat atau akun lain, integrasi non-GitHub, isi Wiki dan Projects, aplikasi terpasang, tautan pihak lain), bukan pilihan antar opsi; hanya mengikat pada G-03 Gate 15. U-02 sudah dilipat ke pertanyaan 2 | F3 (sebelum G-03); dijawab di issue #152 atau issue F3 |
| K7 (wording final help `cac`) | Teks final hanya bisa dinilai dalam PR F2; pertanyaan 2 hanya menyetujui prosesnya | **Diputuskan pemilik 2026-11-20** lewat dialog pilihan (opsi "Setujui apa adanya (Disarankan)"): wording help `cac` di PR #258 (#251) disetujui tanpa perubahan |
| Evaluasi peringatan runtime alias (K2 opsi C) dan jadwal penghapusan `osn` | Perlu hasil inventaris consumer dan data sesudah rename; tidak bisa diputuskan sekarang | F4, setelah inventaris consumer |
| H-01..H-07 (rehearsal repo uji) | Aktivitas manusia nyata; pilihan di dialog tidak menggantikannya | F3, oleh pemilik |
| X-02 (cakupan `check:requirements` untuk `IDENTITY-CAC-*`) | Keputusan teknis orchestrator, bukan hak pemilik; perubahan skrip di luar scope #156 | F2/05 (usulan issue chore) |
| X-03 (ADR 001..009 menjadi 001..010), X-07 (kalimat tafsir Gate 9 di roadmap), X-08 (satu skema penomoran PR) | Perbaikan editorial pada ADR, roadmap, dan issue F2 yang bukan keputusan pemilik; ADR dan roadmap di luar daftar yang boleh diubah di #156 | Orchestrator, PR docs terpisah atau saat issue F2 dibuat |
| X-05 dan X-12 (rehearsal wajib di runbook; templat migration log dan ringkasan pemantauan) | Isi dari #157 yang menjadikan Gate 9 sebagai masukan | #157 (F1/06) |
| X-13 (versi basi di AGENTS.md dan `docs/programs/README.md`) | Dokumen di luar migrasi | Orchestrator, issue docs terpisah |
| Pemindaian secret otomatis, pin SHA Actions (`sha_pinning_required=false`), tes reproducibility hash di CI | Bukan prasyarat F2; audit F3 dan chore terpisah | F2/05 dan F3 |

## 8. Rujukan
- ADR-0009; [IDENTITY-CAC](../requirements/identity-cac.md); [roadmap](../roadmap.md); [rencana migrasi](2026-11-osn-to-cac.md) bagian 3, 7, 8; [matriks dampak](2026-11-cac-impact-matrix.md).
- [Inventaris consumer](2026-11-cac-consumer-inventory.md); [kontrak CLI](2026-11-cac-cli-contract.md); [invariants](2026-11-cac-invariants.md); [keamanan dan recovery](2026-11-cac-security-recovery.md).
- [releasing.md](../development/releasing.md); [AGENTS.md](../../AGENTS.md) (verifikasi dan aturan koordinasi).

## Changelog
### 2026-11-20 - v1.2.0
- Mencatat keputusan pemilik atas K7: wording help `cac` di PR #258 (#251) disetujui apa adanya.

### 2026-11-20 - v1.1.0
- Mencatat keputusan pemilik lewat dialog pilihan: Gate 9 PASSED (kesiapan F2 saja), paket F2 sesuai rekomendasi, ruleset diaktifkan setelah diuji, aturan F3 sesuai rekomendasi. X-03 dan X-13 diperbaiki orchestrator.

### 2026-11-19 - v1.0.0
- Dokumen pertama (issue #156): metode dan pengukuran ulang baseline, 13 discrepancy (0 blocking), applicability UX/ERD/RBAC/API, tabel bukti IDENTITY-CAC-001..010, usulan Gate 9 PASSED (menunggu keputusan pemilik), empat pertanyaan dialog, dan butir yang ditunda.
