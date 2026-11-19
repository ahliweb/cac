# Roadmap: Identitas Curriculum as Code (CaC) dan Rename Repository

## Metadata
- Version: v1.1.0
- Last updated: 2026-11-20
- Changeset: Menambahkan roadmap migrasi identitas dari ahliweb/osn menuju ahliweb/cac; memperbarui status F1 (dokumen lengkap dengan #157) dan Gate 9 PASSED (kesiapan F2), serta langkah berikutnya.
- Decision: ADR-0009
- Status: dokumen F1 lengkap dengan #157; **Gate 9 PASSED** (2026-11-20, kesiapan implementasi F2 saja); F2 dapat dimulai. Repository **belum** diganti nama; Gate 15 belum lulus dan izin eksekusi rename belum diberikan.

## Visi
Satu repository primer untuk paradigma Curriculum as Code, yang mengelola banyak program pendidikan terstruktur, tervalidasi, versioned, dengan ID OSN dipertahankan sebagai program. Produk dikenal sebagai AhliKoding Curriculum; URL target pendek ahliweb/cac.

## Prinsip
Roadmap **bukan janji tanggal**. Status fase: rencana, berjalan, selesai, ditunda, dibatalkan. Status issue hidup ada pada GitHub; angka kemajuan tidak disalin manual. Setiap implementasi memakai issue atomik ukuran S/M, satu PR per issue, perubahan teruji. Gate 9 harus dinyatakan lulus sebelum membuat issue implementasi kode/menjalankannya. Gate 15 harus lulus sebelum rename administratif.

## Fase
| Fase | Milestone tujuan | Tujuan | Kriteria keluar | Status | Referensi |
| --- | --- | --- | --- | --- | --- |
| F1 | F1 Kesiapan dan identitas CaC | ADR, baseline, requirements, impact inventory, rencana kompatibilitas, rollback dan cross-spec | ADR di-review; seluruh risiko & consumer tinggi punya owner; DoR Gate 9 punya evidence | dokumen lengkap (menunggu PR #156 dan #157 digabung); Gate 9 PASSED | ADR-0009; docs/migrations/2026-11-osn-to-cac.md |
| F2 | F2 Implementasi kompatibilitas | Menambah cac CLI dan alias osn, metadata platform, docs, tests & CI tanpa perubahan data | Semua tests dan CI hijau pada main, dokumen & changeset aktual | dibuka oleh Gate 9; belum diimplementasi | IDENTITY-CAC-002..006, 008..009 |
| F3 | F3 Readiness dan rename | Audit final, latihan rollback, Gate 15, rename in-place | Bukti Go/No-Go, nama repo baru, repo ID sama, issue/PR/tags/branch terpelihara | rencana | IDENTITY-CAC-001, 007, 010 |
| F4 | F4 Pascamigrasi | Validasi konsumen, updates URL, pemantauan dan closeout | Tidak ada consumer kritis putus, penerimaan fungsi dan audit sign-off | rencana | IDENTITY-CAC-008..010 |

Milestone GitHub (objek native) dibuat/ditautkan setelah scope dan rights diperiksa; tabel ini **belum mengklaim milestone native sudah dibuat**.

~~~mermaid
flowchart LR
    F1["F1 Spesifikasi + ADR"] --> G9{"Gate 9: Definition of Ready?"}
    G9 -->|Lulus| F2["F2 Compatibility PR + CI"]
    F2 --> G15{"Gate 15: Go/No-Go?"}
    G15 -->|Go| F3["F3 Rename ahliweb/osn ke ahliweb/cac"]
    F3 --> F4["F4 Validasi konsumen + closeout"]
    G9 -->|Tidak| F1
    G15 -->|No-Go| F2
~~~

## Backlog bertahap (belum disahkan sebagai issue kode)
| Tahap | Unit kerja atomik yang disiapkan | Gate sebelum dibuat/dikerjakan |
| --- | --- | --- |
| F1 | Inventaris consumer, studi kompatibilitas CLI, audit link/CI, security/rollback review, cross-spec readiness | Riset/dokumentasi boleh pada F1 |
| F2/01 | refactor: tambah bin cac + osn alias dalam satu core | Gate 9 |
| F2/02 | refactor: ubah identitas package dan packageInfo tanpa memutus consumer | Gate 9 |
| F2/03 | docs: sinkronisasi README, AGENTS, reference CLI, pengguna, governance | Gate 9 |
| F2/04 | test: contract tests dua CLI, seluruh program dan fidelity | Gate 9 |
| F2/05 | ci: uji quality gates, link/metadata scan, integrasi kompatibilitas | Gate 9 |
| F2/06 | chore: changeset dan release compatibility notes sesuai SemVer | Gate 9 |
| F3/01 | chore: snapshot/rehearsal/readiness dan final approval | Gate 15 untuk rename aktual |
| F3/02 | chore: rename in-place oleh admin GitHub | Gate 15 dan izin eksekusi eksplisit |
| F4/01 | fix: sinkronisasi consumer, remote, badges, integrasi | sesudah rename |
| F4/02 | test: verification, audit, final reports, monitoring | sesudah rename |

Rencana F2–F4 adalah **planned work**; bukan klaim implementasi atau kelulusan gerbang. Tiap issue baru harus memuat sembilan seksi standar, tepat satu label jenis/prioritas/ukuran serta dependensi, dan dapat diuji mandiri.

## Langkah berikutnya
1. Gabungkan PR dokumen F1 (#156 dan #157) ke `main`.
2. Buat dan kerjakan issue F2/01..06 sebagai PR atomik (Gate 9 PASSED, 2026-11-20); paket keputusan K1-K7 mengikuti keputusan pemilik di [tinjauan Gate 9](migrations/2026-11-cac-gate9-review.md).
3. Persiapan F3 oleh pemilik: jawab U-01..U-07, uji ruleset `main` di repo uji lalu aktifkan, jalankan rehearsal H-01..H-07 di repo uji. Urutan beku dan tinjauan kesiapan Gate 15 ada di [runbook](migrations/2026-11-osn-to-cac.md) bagian 4 dan 9; templat bukti: [migration log](migrations/2026-11-cac-migration-log-template.md).
4. Rename tetap menunggu Gate 15 dan izin eksekusi terpisah dari pemilik.

## Ditunda dan dibatalkan
- Tidak ada implementasi CLI, rename GitHub, deployment atau pengubahan kurikulum yang dilakukan pada fase dokumentasi ini.
- Nama panjang ahliweb/curriculum-as-code tidak dipilih sebagai URL GitHub; tetap menjadi nama konsep Curriculum as Code, tidak perlu membuat repository terpisah.
- Penghapusan alias osn ditunda tanpa tanggal sampai consumer terverifikasi dan ada keputusan kompatibilitas/MAJOR.

## Changelog
### 2026-11-20 - v1.1.0
- Status F1 (dokumen lengkap dengan #157) dan Gate 9 PASSED (kesiapan F2 saja); bagian langkah berikutnya. Rename belum dilakukan.

### 2026-11-19 - v1.0.0
- Roadmap empat fase, gates dan backlog awal disusun; fase setelah F1 belum dijalankan.
