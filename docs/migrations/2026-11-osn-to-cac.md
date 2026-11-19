# Rencana Migrasi Repository: ahliweb/osn → ahliweb/cac

## Metadata
- Version: v1.1.0
- Last updated: 2026-11-20
- Changeset: Memfinalkan runbook (issue #157): urutan beku F3, rehearsal repo uji menjadi wajib (X-05), status Gate 9 PASSED beserta tautan bukti #152 s.d. #156 (X-06), aturan F3 keputusan pemilik, templat migration log (X-12), checklist verifikasi pascarename F4, dan tinjauan kesiapan Gate 15. Tidak mengubah kode, paket, CLI, data, atau setelan GitHub.
- Status: **RENAME BELUM DILAKUKAN.** Repository tetap `ahliweb/osn`. Gate 9 PASSED (kesiapan implementasi F2 saja, keputusan pemilik 2026-11-20). Gate 15 **belum** lulus dan izin eksekusi rename **belum** diberikan.
- Decision: ADR-0009; identitas produk AhliKoding Curriculum, paradigma Curriculum as Code (CaC).
- Owner keputusan: pemilik repository; approval operasi rename dilakukan terpisah setelah seluruh gerbang dinyatakan lulus. Dokumen ini tidak memberi izin untuk rename, tidak meminta, dan tidak menyimpan secret, token, atau data pribadi.

## 1. Batas dan target
**Tujuan:** nama repository GitHub ahliweb/cac; CLI target cac; label OSN menjadi identitas program bukan nama platform. **Bukan:** membuat repo baru, membuat LMS/judge, mengubah isi kurikulum, mengganti ID program osn, memperkenalkan data pribadi siswa, mengubah lisensi, melakukan deploy atau rename sekarang.

Source of truth tetap **repository yang sama (GitHub repo ID dipertahankan ketika rename in-place)**. Branch utama tetap main. Data program osn dan sma-coding tidak berubah karena rename identitas platform.

## 2. Dependensi keputusan dan bukti
### 2.1 Keputusan
- ADR-0001: curriculum as code; ADR-0004: data peserta didik; ADR-0005: versi software vs silabus; ADR-0006: multi-program; ADR-0007: review konten; ADR-0008: skema per program; ADR-0009: identitas CaC.
- Kontrak migrasi: docs/requirements/identity-cac.md (IDENTITY-CAC-001..010).
- Matriks dampak: docs/migrations/2026-11-cac-impact-matrix.md.
- Alur perubahan: Discovery/Spec (langkah 1–9), issue S/M (10), perubahan atomik per PR + CI (11–12), staging/rehearsal (13–14), gate Go/No-Go (15), rename (16), verifikasi (17) dan review (18).
- Perubahan ini tidak menambah UI, database, API service atau deployment baru; artefak UI/ERD/RBAC/OpenAPI dinyatakan tidak berlaku berdasarkan pemeriksaan di [tinjauan Gate 9](2026-11-cac-gate9-review.md) bagian 3. Jangan menciptakan hasil review fiktif.

### 2.2 Bukti F1 (tautan wajib, X-06)
| Issue | Bukti | Dokumen |
| --- | --- | --- |
| #152 (F1/01) | Inventaris consumer dan integrasi: 14 observed, 16 not in use, 7 unknown (U-01..U-07) | [2026-11-cac-consumer-inventory.md](2026-11-cac-consumer-inventory.md) |
| #153 (F1/02) | Permukaan CLI, golden baseline, kontrak legacy vs target, uji kontrak CLI-C-01..13, butir K1..K7 | [2026-11-cac-cli-contract.md](2026-11-cac-cli-contract.md) |
| #154 (F1/03) | Invariants INV-01..10, baseline hash `data/**/*.json`, deteksi enam lapis | [2026-11-cac-invariants.md](2026-11-cac-invariants.md) |
| #155 (F1/04) | Audit keamanan dan perubahan GitHub, 19 risiko, gladi lokal, recovery vs rename-balik, checklist Go/No-Go G-01..G-14, rehearsal H-01..H-07 | [2026-11-cac-security-recovery.md](2026-11-cac-security-recovery.md) |
| #156 (F1/05) | Tinjauan silang, applicability UX/ERD/RBAC/API, evidence IDENTITY-CAC-001..010, usulan dan keputusan Gate 9 | [2026-11-cac-gate9-review.md](2026-11-cac-gate9-review.md) |
| #157 (F1/06) | Dokumen ini, [templat migration log](2026-11-cac-migration-log-template.md) | dokumen ini |

### 2.3 Status gerbang
| Gerbang | Status | Dasar |
| --- | --- | --- |
| Gate 9 (Definition of Ready F2) | **PASSED, 2026-11-20** | Keputusan pemilik lewat dialog pilihan; **hanya kesiapan implementasi F2**. Tinjauan: [2026-11-cac-gate9-review.md](2026-11-cac-gate9-review.md). Bukan izin rename |
| Gate 15 (Go/No-Go rename) | **Belum lulus** | Syarat dan status per butir: bagian 9 |
| Izin eksekusi rename | **Belum diberikan** | Tindakan pemilik terpisah, sesudah Gate 15 (G-14) |

### 2.4 Keputusan pemilik yang berlaku
- 2026-11-19 (komentar epik #150): AI menyusun bukti dan usulan; **pemilik memutuskan** Gate 9 lewat dialog. Rename tetap menunggu Gate 9, Gate 15, dan izin eksekusi terpisah.
- 2026-11-20 (komentar epik #150, atas usulan #156): Gate 9 PASSED; paket F2 K1–K7 sesuai rekomendasi (bagian 3, F2); ruleset `main` diuji lalu **diaktifkan pemilik** sebelum freeze F3; aturan F3 pada bagian 5.

## 3. Fase dan kriteria keluar (urutan mutlak)
### F1 — Baseline / specification — dokumen lengkap setelah PR #157 digabung
- Persetujuan nama ahliweb/cac, keputusan brand dan anti-ambiguity notice dicatat di ADR-0009.
- Audit inventaris, kontrak CLI, invariants, keamanan dan recovery, tinjauan silang: bagian 2.2. Hasil audit yang "tidak diketahui" (U-01..U-07) tetap tidak diketahui sampai pemilik menjawab; itu syarat Gate 15 (G-03), bukan syarat Gate 9.
- Output: ADR-0009, runbook ini, requirements, impact matrix, roadmap, tinjauan Gate 9, templat migration log.

### F2 — Compatibility implementation — **dibuka oleh Gate 9 PASSED (2026-11-20); belum diimplementasi**
Penomoran PR memakai satu skema: roadmap F2/01..F2/06 (X-08); "PR 1..PR 4" lama dipetakan di bawah.
- F2/01 (dulu PR 1): entrypoint `cac` dan alias `osn` ke satu `runCli`, exit code 0 sukses / 1 validasi / 2 usage. Jangan mengubah default pemilihan program diam-diam.
- F2/02 dan F2/03 (dulu PR 2): metadata package, `packageInfo`, README, panduan CLI, AGENTS, contoh skrip dan help; nama paket menjadi `curriculum-as-code` dalam satu PR atomik dengan `packageInfo` dan lockfile (K6).
- F2/04 dan F2/05 (dulu PR 3): uji kontrak CLI-C-01..13 untuk kedua nama dan semua program, build, coverage, fidelity, privasi, link, langkah hash non-blocking di CI.
- Consumer eksternal (dulu PR 4): hanya bila U-03 menemukan consumer; diperbarui **sebelum** rename.
- F2/06: changeset dan catatan kompatibilitas; jenis bump rilis kompatibilitas **minor** (alias aditif).

Paket keputusan F2 (diterima pemilik 2026-11-20): K1 dua entri tipis `cac` dan `osn` ke satu `runCli`; K2 tanpa peringatan runtime; K3 `osn` dihapus hanya di rilis MAJOR, paling cepat 6 bulan setelah pengumuman dan tanpa consumer aktif; K4 prefiks `osn:` tetap bagi pemanggil `osn`; K5 judul Markdown artefak tidak berubah; K6 nama paket `curriculum-as-code`; K7 wording help `cac` diajukan di PR F2. Teks asli di [kontrak CLI](2026-11-cac-cli-contract.md) bagian 7.

Syarat tiap PR F2 (S-2, S-3 di tinjauan Gate 9): `git diff --stat -- data/ src/schema/ src/domain/` kosong; hash agregat diukur ulang pada `main` tepat sebelum PR dibuka (bagian 7.2), bukan memakai tabel #154 mentah.

### F3 — Pre-rename readiness, gate dan rename administratif — **belum diizinkan**
Urutan beku ada di bagian 4. Rehearsal di repo uji **wajib** (bagian 6). Go/No-Go hanya setelah checklist Gate 15 ([keamanan dan recovery](2026-11-cac-security-recovery.md) bagian 6, G-01..G-14) lulus dan pemilik menyatakan siap. Jika No-Go, tidak rename.

### F4 — Post-rename verification dan closeout — **belum diizinkan**
Checklist verifikasi ada di bagian 8. Regenerasi inventaris portofolio pada pusat tata kelola internal tanpa mengekspos lokasi atau namanya ke repo publik; tandai alias historis. Tutup issue setelah kriteria diverifikasi.

## 4. Urutan beku F3
Urutan ini **dibekukan**: tidak ditukar, tidak dilewati, tidak digabung. Pemilik langkah adalah **peran**. Aksi administratif GitHub (setelan repo, rename, ruleset, repo uji) hanya dilakukan **pemilik repo sebagai admin**; agent AI dan orchestrator tidak mengubah setelan GitHub dan tidak melakukan rename. "Stop" berarti berhenti dan menilai ulang bersama pemilik; tidak ada langkah berikutnya sebelum itu. Prosedur, bukti, dan stop condition rinci ada di [keamanan dan recovery](2026-11-cac-security-recovery.md) (bagian 5 dan 6); tabel ini tidak menyalin ulang angka dinamis (SHA, jumlah issue, PR, tag), yang **wajib diukur ulang saat freeze** dan dicatat di [templat migration log](2026-11-cac-migration-log-template.md).

| # | Langkah | Pemilik langkah | Isi | Bukti (di migration log) | Stop condition | Rujukan checklist |
| --- | --- | --- | --- | --- | --- | --- |
| 0 | Prasyarat | Pemilik repo; Opus memverifikasi | F2 selesai dan digabung di `main`, CI hijau di `main`; rehearsal H-01..H-07 selesai (bagian 6); ruleset `main` aktif; U-01..U-07 dijawab atau risiko diterima tertulis; jadwal dan pengumuman | URL run CI, catatan rehearsal, keputusan U-xx | Ada prasyarat yang belum terbukti | G-01, G-03, G-07, G-08, G-09, G-11 |
| 1 | Freeze dan snapshot | Pemilik repo (freeze); Opus (snapshot read-only) | Freeze perubahan besar; tidak ada PR, merge, atau rilis berjalan; kunci rilis dicatat. Snapshot: repo ID, default branch, SHA `main`, tag dan SHA, rilis, jumlah issue dan PR, daftar cabang dan workflow, setelan Actions, webhook, Pages, ruleset, hash agregat `data/` (bagian 7.2) | Isi kolom 1 dan 2 migration log | Ada merge selama jendela; kunci dipegang pihak lain; snapshot tidak lengkap | G-02, G-04, G-05 |
| 2 | Preflight | Opus (jalankan); pemilik (periksa hasil) | Gerbang kualitas bagian 8 pada SHA snapshot; `cac` dan `osn` lulus CLI-C-01..13; audit ulang consumer (G-06); nama `ahliweb/cac` tersedia (HTTP 404) dan peran admin diverifikasi; audit dependensi dan secret; `main` ruleset terbaca ulang | Keluaran perintah bertanggal, URL CI | Ada yang gagal, nama sudah dipakai, atau ada consumer baru | G-02, G-06, G-08, G-10, G-13 |
| 3 | Approval Gate 15 dan izin eksekusi | **Pemilik repo saja** | Pemilik meninjau migration log langkah 0..2, menyatakan Gate 15 lulus atau No-Go; izin eksekusi rename diberikan **terpisah** dan eksplisit, dengan tanggal dan jendela. Persetujuan AI tidak berlaku, dan persetujuan nama (ADR-0009) bukan Go operasional | Catatan keputusan pemilik (tanggal, opsi) | No-Go; pemilik tidak tersedia penuh; tidak ada izin eksplisit | G-12, G-13, G-14 |
| 4 | Aksi admin: rename | **Pemilik repo (admin)** | Settings, General, Repository name: `osn` menjadi `cac` (rename in-place; bukan repo baru, bukan arsip). Catat waktu mulai dan selesai, repo ID, URL sebelum dan sesudah. Jangan membuat repo `ahliweb/osn` dalam keadaan apa pun | Waktu, repo ID, URL | Rename gagal atau ID repo berubah | G-10, G-14 |
| 5 | Smoke test | Opus (jalankan); pemilik (periksa) | Subset kritis bagian 8: `gh api` repo ID sama, `git ls-remote` ke URL baru dan lama, SHA `main` sama dengan snapshot, CI pertama di `cac` hijau, `cac validate` dan `osn validate` exit 0, tautan lama terbuka | Keluaran perintah | `git fetch` URL baru bukan exit 0; SHA `main` berbeda; ID repo berubah; jumlah issue, PR, tag, rilis berbeda; CI merah; alias `osn` berbeda dari baseline | bagian 8, [keamanan](2026-11-cac-security-recovery.md) 5.5 |
| 6 | Update consumer | Pemilik repo (aksi administratif dan komunikasi); agent (PR docs) | `git remote set-url origin https://github.com/ahliweb/cac.git` pada klon; perbarui tautan aktif, badge, wiki, webhook, integrasi, consumer Action; PR docs tautan; pengumuman ke kontributor. Tautan historis (sitasi) dibiarkan | Daftar consumer diperbarui | Consumer Action gagal `repository not found` (recovery maju, jangan rename-balik dulu) | bagian 8, G-11 |
| 7 | Monitoring | Pemilik repo; Opus (ringkasan) | Pantau 404, Actions gagal, error CLI, pertanyaan pengguna; ulangi G-06; ringkasan pemantauan di migration log pada titik 1 jam, 24 jam, 7 hari, dan penutupan | Ringkasan pemantauan | Kejadian kritikal (bagian 8, butir stop) | IDENTITY-CAC-010 |
| 8 | Recovery atau rename-balik | **Pemilik repo** memutuskan; admin melaksanakan | Default **recovery maju** (perbaiki sumber, consumer, `origin`). Rename-balik **hanya** bila kriteria aman terpenuhi: dalam **24 jam** sejak rename, pemilik tersedia penuh, rename-balik sudah diuji di repo uji (H-05), tidak ada repo baru bernama `osn` atau `cac`, tidak ada consumer permanen yang sudah pindah, tidak ada rilis atau tag baru atas nama `cac`. Selain itu hanya recovery maju | Keputusan rename-balik di migration log, bukti sesudahnya | Salah satu kriteria "tidak aman" ([keamanan](2026-11-cac-security-recovery.md) 5.2) | G-12, [keamanan](2026-11-cac-security-recovery.md) 5.2 dan 5.4 |

GitHub redirect tidak dijadikan satu-satunya rollback plan. Rename-balik juga memutus klon yang sudah dipindah ke nama baru, sehingga memerlukan komunikasi ulang ke kontributor.

## 5. Aturan F3 (keputusan pemilik 2026-11-20)
| Aturan | Isi |
| --- | --- |
| Jendela rename-balik | Aman hanya dalam **24 jam** sejak rename; lewat itu hanya recovery maju |
| Waktu rename | Hanya saat pemilik **tersedia penuh**, tanpa admin tambahan; tidak ada jendela di luar ketersediaan itu |
| Repo uji | **Pemilik sendiri** membuat dan menghapus repo uji sementara untuk rehearsal H-01..H-07; agent tidak membuat repo apa pun |
| Larangan nama lama | Dilarang membuat repo `ahliweb/osn` (dan repo lain bernama `osn` di akun) selama masa alias |
| Ruleset `main` | Diuji lebih dulu di repo uji (H-04), lalu **diaktifkan pemilik** sebelum freeze F3: check `Quality` wajib, larangan force-push dan penghapusan cabang; agent tidak mengubah setelan GitHub |
| Kunci rilis | Dicatat di freeze; agent tidak merge atau rilis bila kunci dipegang orang lain |

## 6. Rehearsal wajib di repo uji (X-05)
Rehearsal H-01..H-07 ([keamanan dan recovery](2026-11-cac-security-recovery.md) bagian 4.3) di **repo uji GitHub sungguhan milik pemilik** adalah **wajib** sebelum Gate 15 (G-09). **Simulasi dokumentasi atau gladi lokal tanpa GitHub tidak cukup**: gladi lokal (31 perintah, #155) hanya membuktikan perilaku git dan prosedur kita, bukan perilaku GitHub.

| # | Yang diuji | Hasil yang membuat rename-balik tidak aman |
| --- | --- | --- |
| H-01 | Redirect web, git HTTPS, git SSH, `gh api` setelah rename | Redirect tidak berfungsi pada jalur yang dipakai |
| H-02 | Actions `uses:` ke repo yang di-rename gagal `repository not found` | (menentukan perlunya langkah consumer Action) |
| H-03 | Webhook dan PR setelah rename | Webhook putus tanpa deteksi |
| H-04 | Ruleset dan nama check `Quality` bertahan melewati rename | Ruleset hilang atau check wajib berubah |
| H-05 | Rename-balik: redirect, ID repo, klon | Hasil membuat rename-balik tidak aman atau tidak dapat dipulihkan |
| H-06 | Repo baru dengan nama lama (R-03) | (menegaskan larangan nama lama) |
| H-07 | Pages (URL project) setelah rename | (Pages kosong per #152; konfirmasi perilaku) |

Aturan: dikerjakan pemilik; repo uji dihapus pemilik sesudahnya; hasil dan sisa risiko dicatat di migration log (bagian "Rehearsal") dan issue F3/01. Rehearsal belum dijalankan; belum ada repo uji. Hasil H-05 dan H-06 dapat menjadikan jalur rename-balik tidak tersedia, dan itu mengubah langkah 8 menjadi recovery maju saja.

## 7. Matriks kontrak CLI dan deprecation
### 7.1 Matriks
| Kasus | Sebelum | Saat coexistence | Setelah (opsional; belum diputuskan) |
| --- | --- | --- | --- |
| Executable utama | osn | **cac** | cac |
| Executable lama | osn | **osn** alias diuji otomatis | tetap atau hapus hanya di MAJOR (K3) |
| osn validate --program osn | berfungsi | harus berfungsi sama | kebijakan deprecation terpisah |
| osn validate --program sma-coding | berfungsi | harus berfungsi sama | kebijakan deprecation terpisah |
| cac validate [--program ID] | belum ada | fungsi setara dengan osn (exit code dan JSON identik) | canonical |
| status exit | 0 / 1 / 2 | invariant untuk dua alias | invariant |
| --help | osn branding | cac branding pada cac; osn tetap dokumentasikan alias dan kompatibilitas | migrasi docs |
| --version | package.json versi | satu versi software | tidak terikat ke syllabusVersion |
| --json | format output saat ini | jangan mengubah kontrak mesin-baca/urutan yang dijanjikan | perubahan khusus versioned |
| scripts bun run validate/privacy-check | berbasis src/cli/index.ts | tetap lewat core sama; migration mengikuti PR terpisah | canonical setelah tes |

**Catatan:** perubahan text branding pada stdout/stderr yang dikonsumsi sistem luar dapat menjadi breaking change. Dengan K4, pemanggil `osn` tetap mendapat prefiks `osn:`; kesetaraan "fungsi setara" berarti semantik (exit code dan JSON), bukan teks bermerek (X-11). Jangan berjanji 100% bitwise-identical output ketika branding sengaja berubah.

### 7.2 Hash agregat korpus (metode #154)
```bash
find data -type f -name '*.json' | LC_ALL=C sort | xargs sha256sum | sha256sum
```
Baseline [invariants](2026-11-cac-invariants.md) (bagian 2): `0de993e24edb162a9b1fce3cd7d391075930adc059f673eea4bccd5a1813b8d5`, diukur ulang pada `main` 2026-11-20 dan identik. Baseline hanya titik awal: **ukur ulang pada SHA snapshot** dan catat nilainya di migration log; bandingkan sebelum dan sesudah rename. Hash yang berbeda tanpa PR data yang sah berarti stop.

## 8. Quality gates, evidence, dan checklist verifikasi pascarename (F4)
### 8.1 Quality gates dan evidence
- Baseline: catat package version, main SHA, env Bun, seluruh checks yang berjalan sebelum PR.
- Minimal: bun install --frozen-lockfile; bun run format:check; bun run lint; bun run assist:check; bun run typecheck; bun run test:coverage; bun run build; bun run validate; bun run privacy-check; bun run check:requirements; bun run check:fidelity; bun run check:module-code; bun run check:learner-assets; khususnya osn validate --program osn dan cac validate --program osn (setelah F2).
- Test CLI langsung: help/no arg/unknown/--version/--json, validasi osn dan sma, render/plan/report/checklist sesuai dukungan tiap program. Tetap periksa exit code.
- Pastikan hash atau perbandingan struktural corpus/registry sebelum dan sesudah tanpa diffs tak disengaja (bagian 7.2). Gunakan synthetic fixtures saja.
- Lakukan audit secret scanning dan izin token, branch protection, CI output, links. **Hanya nama** secret yang boleh dicatat; nilai tidak pernah dibaca, diminta, atau ditulis.
- Wajib evidence berupa commit SHA, CI run URL, hasil test, daftar consumer diverifikasi dan keputusan gate; jangan menandai lulus berdasarkan dokumen saja.

### 8.2 Checklist verifikasi pascarename (F4)
Semua butir diisi bukti di migration log; satu butir yang gagal menjalankan aturan pemulihan (bagian 4, langkah 8), bukan perbaikan diam-diam. `<SNAPSHOT>` adalah nilai di migration log. Angka dinamis diukur ulang, tidak disalin dari dokumen lama.

| # | Area | Pemeriksaan | Bukti lulus | Dijalankan oleh |
| --- | --- | --- | --- | --- |
| V-01 | Identitas repo | `gh api repos/ahliweb/cac --jq .id` sama dengan repo ID `<SNAPSHOT>`; `gh api repos/ahliweb/osn --jq .id` memberi ID yang **sama** (alias), bukan repo lain | ID sama | Opus |
| V-02 | Riwayat | SHA `main`, jumlah dan SHA tag, jumlah rilis, jumlah issue dan PR, daftar cabang sama dengan snapshot; `git rev-list --max-parents=0 origin/main` sama dengan SHA root snapshot | Semua sama | Opus |
| V-03 | Redirect web | Sampel tautan lama (README, issue, PR, commit, rilis) terbuka dan mengalihkan ke `ahliweb/cac` | HTTP 200 setelah alih | Opus |
| V-04 | Redirect git | `git ls-remote https://github.com/ahliweb/osn.git refs/heads/main` dan URL `cac` memberi SHA `<SNAPSHOT>`; klon baru dari URL `cac` dan `git fetch` klon lama exit 0; `git remote set-url origin` terdokumentasi | Exit 0, SHA sama | Opus, kontributor |
| V-05 | CLI `osn` | `osn validate`, `osn privacy-check`, `osn --version`, `osn nope` (exit 0, 0, 0, 2); keluaran sama dengan golden baseline [kontrak CLI](2026-11-cac-cli-contract.md) (CLI-C-10, CLI-C-11) | Exit code dan hash cocok | Opus |
| V-06 | CLI `cac` | Hal yang sama dengan `cac`; JSON `--json` **byte-identik** antara `cac` dan `osn` (CLI-C-04, CLI-C-05); help `cac` memuat nama `cac` | Exit code dan JSON identik | Opus |
| V-07 | Semua program | `cac validate --program <id>` dan `osn validate --program <id>` untuk ketujuh ID (`osn`, `sma-coding`, `tk-coding`, `kuliah-coding`, `dewasa-coding`, `sd-coding`, `smp-coding`) exit 0; `bun run check:fidelity` exit 0; `bun run privacy-check` exit 0; tanpa `--program` default tetap `osn` (CLI-C-09) | Exit 0 semuanya | Opus |
| V-08 | Hash korpus | Hash agregat (bagian 7.2) sama dengan `<SNAPSHOT>`; `git diff --stat -- data/ src/schema/ src/domain/` terhadap SHA snapshot kosong | Sama, kosong | Opus |
| V-09 | CI | CI pertama pada `cac` (job `Quality`) `SUCCESS` diperiksa lewat status, bukan output yang disalurkan; nama check `Quality` tidak berubah | Status SUCCESS, URL run | Opus |
| V-10 | Ruleset dan proteksi | `gh api repos/ahliweb/cac/rules/branches/main` memuat check `Quality` wajib dan larangan force-push dan hapus; sama dengan sebelum rename (H-04) | Aturan sama | Pemilik, Opus |
| V-11 | Actions | Workflow `CI` dan "Dependabot Updates" aktif; tidak ada `uses: ahliweb/osn`; pindai `grep -rn -E 'uses:[[:space:]]*ahliweb/' .github` kosong; consumer di repo lain (U-03) memakai `ahliweb/cac` | Kosong, consumer diperbarui | Opus, pemilik |
| V-12 | Pages | Pages tetap tidak aktif (kosong per #152): `gh api repos/ahliweb/cac/pages` HTTP 404 | 404 | Opus |
| V-13 | Integrasi eksternal | Webhook 0, deploy key 0, environment 0, secret dan variabel Actions kosong (nama saja); badge dan tautan integrasi diperbarui; wiki dan Projects (U-05) diperiksa | Daftar sesuai | Opus, pemilik |
| V-14 | Consumer tak dikenal | U-01..U-07 ([inventaris](2026-11-cac-consumer-inventory.md)) masing-masing ditutup: jawaban dan tindak lanjut tercatat, atau risiko diterima tertulis | Satu baris per U-xx | Pemilik |
| V-15 | Tautan dan dokumen | Link checker dan `bun run check:requirements` lulus; PR docs tautan aktif digabung; tautan historis dibiarkan; deskripsi repo dan README memuat pernyataan independen, bukan materi resmi Puspresnas / IA TOKI / IOI | Lulus | Opus |
| V-16 | Nama lama | Tidak ada repo baru bernama `osn` di akun; `gh api repos/ahliweb/osn --jq .id` tetap ID repo `<SNAPSHOT>` | ID sama | Pemilik, Opus |
| V-17 | Observability | Ringkasan pemantauan terisi pada 1 jam, 24 jam, 7 hari, dan penutupan: 404, Actions gagal, error CLI, pertanyaan pengguna, referrer (`gh api repos/ahliweb/cac/traffic/popular/referrers`) | Ringkasan tercatat | Pemilik, Opus |
| V-18 | Privasi dan secret | Tidak ada data pribadi atau secret ditambahkan; log migrasi memuat peran, bukan nama atau email | Pemindaian bersih | Opus |

**Definisi sukses F4:** V-01..V-18 lulus atau penyimpangannya dicatat dengan keputusan pemilik; tidak ada consumer kritis putus; migration log lengkap tanpa kolom kosong tak beralasan; monitoring penutupan tercatat; issue F4 ditutup setelah bukti ada.

**Stop condition (hentikan rollout):** `git fetch` ke URL baru bukan exit 0; SHA `main` berbeda tanpa penjelasan; ID repo berubah; jumlah issue, PR, tag, atau rilis berbeda; CI pertama di `cac` merah; consumer Action gagal; alias `osn` berbeda dari baseline; ada indikasi data pribadi atau secret. Respons mengikuti langkah 8 (recovery maju dahulu).

## 9. Tinjauan kesiapan Gate 15
**Gate 15 belum lulus. Tabel ini bukan klaim kelulusan.** Status diukur pada penerbitan dokumen ini (2026-11-20). Butir G-xx berasal dari [checklist Go/No-Go](2026-11-cac-security-recovery.md) bagian 6; "belum" berarti belum ada bukti.

| Butir | Syarat | Status saat ini |
| --- | --- | --- |
| G-01 | ADR-0009 dan dokumen F1 ditinjau; Gate 9 tercatat | **Sebagian**: Gate 9 PASSED tercatat 2026-11-20 ([tinjauan](2026-11-cac-gate9-review.md)); dokumen F1 ada; tinjauan menyeluruh pemilik atas runbook final belum |
| G-02 | Audit ulang read-only pada hari freeze | **Belum** (dijalankan saat freeze) |
| G-03 | U-01..U-07 dijawab atau risiko diterima tertulis; R-12 ditutup | **Belum** (ketujuhnya masih unknown) |
| G-04 | Freeze, kunci rilis tercatat, ruleset `main` | **Belum**; `main` belum punya ruleset (diaktifkan pemilik setelah uji H-04) |
| G-05 | Snapshot recovery tersimpan | **Belum** (templat migration log siap, belum diisi) |
| G-06 | Pindai consumer Action kosong | **Sebagian**: audit F1 menemukan 0; harus diulang saat freeze dan untuk repo privat/akun lain (U-03) |
| G-07 | Alias legacy dan canonical lulus tes dan CI di `main` | **Belum**: F2/01..06 belum diimplementasi |
| G-08 | Invariants lulus pada PR identitas | **Belum**: hash baseline identik pada 2026-11-20, tetapi belum ada PR F2 yang membuktikannya |
| G-09 | Rehearsal repo uji H-01..H-07 termasuk rename-balik | **Belum**: wajib; repo uji belum dibuat pemilik |
| G-10 | `ahliweb/cac` tersedia dan admin diverifikasi saat eksekusi | **Belum** (404 pada 2026-11-19; diulang saat eksekusi) |
| G-11 | Komunikasi ke kontributor dan penerima tautan | **Belum** |
| G-12 | Keputusan recovery vs rename-balik dan jendela | **Sebagian**: aturan 24 jam dan lainnya diputuskan 2026-11-20 (bagian 5); ketersediaan pemilik dan jadwal belum |
| G-13 | Check wajib `SUCCESS`, tanpa blocker P0/P1, Gate 15 dinyatakan pemilik | **Belum** |
| G-14 | Izin eksekusi rename eksplisit dan terpisah | **Belum** |
| Tambahan | Migration log terisi lengkap sampai langkah 2 | **Belum** |
| Tambahan | Nama paket `curriculum-as-code` dan alias terbit di rilis minor | **Belum** (F2/02 dan F2/06) |

Ringkasan: 14 butir G-xx dan 2 butir tambahan; tidak ada yang lulus penuh, 3 sebagian, sisanya belum. Rename tidak boleh dijalankan selama ada butir yang tidak terbukti.

## 10. Daftar file dan perubahan (target, belum dilaksanakan)
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

## 11. Risiko eksternal dan rollback
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
| Rename-balik memutus klon yang sudah dipindah | jendela 24 jam, komunikasi, rehearsal H-05 | `git remote set-url` ke URL yang berlaku |

## 12. Go/No-Go objektif
**Go** hanya jika seluruh butir berikut **terbukti** (bukti di migration log):
- [ ] ADR-0009 dan dokumen spec sudah di-review, README/agent docs tersinkron pada rencana.
- [x] Gate 9 dicatat lulus sebelum perubahan kode (PASSED, 2026-11-20; kesiapan F2 saja).
- [ ] Alias legacy+canonical lolos tes dan CI di main (bukan hanya branch).
- [ ] Tidak ada perubahan tak direncanakan pada program IDs/syllabus versions/corpus (hash, bagian 7.2).
- [ ] Semua consumer eksternal berisiko tinggi diinventaris dan ada owner/mitigasi; U-01..U-07 dijawab atau risiko diterima tertulis.
- [ ] Alias GitHub Action/Pages telah diverifikasi jika dipakai; bukan asumsi redirect.
- [ ] Repo target cac tersedia; admin permission diverifikasi.
- [ ] **Rehearsal H-01..H-07 di repo uji selesai** (bagian 6), recovery dan langkah komunikasinya dicatat.
- [ ] Ruleset `main` aktif dan terbukti bertahan melewati rename di repo uji (H-04).
- [ ] Gate 15 dicatat lulus oleh pemilik, tidak ada blocker P0/P1.
- [ ] Izin operasi rename dari pemilik diberikan pada tahap eksekusi setelah persiapan.

**No-Go** bila ada butir yang tidak terbukti. Persetujuan nama sekarang hanya mencakup identitas target, bukan Go operasional. **Rename belum dilakukan.**

## 13. Referensi
- ADR-0009; docs/requirements/identity-cac.md; docs/migrations/2026-11-cac-impact-matrix.md; docs/roadmap.md.
- Bukti F1: [inventaris consumer](2026-11-cac-consumer-inventory.md) (#152); [kontrak CLI](2026-11-cac-cli-contract.md) (#153); [invariants](2026-11-cac-invariants.md) (#154); [keamanan dan recovery](2026-11-cac-security-recovery.md) (#155); [tinjauan Gate 9](2026-11-cac-gate9-review.md) (#156).
- [Templat migration log](2026-11-cac-migration-log-template.md) (#157).
- docs/development/releasing.md (changeset dan SemVer).
- GitHub, Renaming a repository: https://docs.github.com/en/repositories/creating-and-managing-repositories/renaming-a-repository
- SemVer 2.0.0: https://semver.org/
- NIST SP 800-218 SSDF: https://csrc.nist.gov/pubs/sp/800/218/final
- ISO/IEC 27001, 27002, 27005, ISO/IEC 20000-1, ISO 22301 dan prinsip change management sebagai rujukan praktik, bukan klaim sertifikasi.

## Changelog
### 2026-11-20 - v1.1.0
- Finalisasi runbook (issue #157): urutan beku F3 sembilan langkah dengan pemilik, stop condition, dan rujukan G-01..G-14; rehearsal repo uji menjadi wajib (X-05); status Gate 9 PASSED dan tautan bukti #152 s.d. #156 (X-06); aturan F3 keputusan pemilik; checklist verifikasi pascarename V-01..V-18 dan definisi sukses F4; tinjauan kesiapan Gate 15 (belum lulus); penomoran PR F2 mengikuti roadmap (X-08); templat migration log (X-12). Rename belum dilakukan.

### 2026-11-19 - v1.0.0
- Rencana migrasi, compatibility contract, stage gates, verification dan rollback disiapkan; belum dieksekusi.
