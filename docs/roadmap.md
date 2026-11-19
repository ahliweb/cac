# Roadmap: Identitas Curriculum as Code (CaC) dan Rename Repository

## Metadata
- Version: v1.0.0
- Last updated: 2026-11-19
- Changeset: Menambahkan roadmap migrasi identitas dari ahliweb/osn menuju ahliweb/cac.
- Decision: ADR-0009
- Status: tahap persiapan F1; repository **belum** diganti nama.

## Visi
Satu repository primer untuk paradigma Curriculum as Code, yang mengelola banyak program pendidikan terstruktur, tervalidasi, versioned, dengan ID OSN dipertahankan sebagai program. Produk dikenal sebagai AhliKoding Curriculum; URL target pendek ahliweb/cac.

## Prinsip
Roadmap **bukan janji tanggal**. Status fase: rencana, berjalan, selesai, ditunda, dibatalkan. Status issue hidup ada pada GitHub; angka kemajuan tidak disalin manual. Setiap implementasi memakai issue atomik ukuran S/M, satu PR per issue, perubahan teruji. Gate 9 harus dinyatakan lulus sebelum membuat issue implementasi kode/menjalankannya. Gate 15 harus lulus sebelum rename administratif.

## Fase
| Fase | Milestone tujuan | Tujuan | Kriteria keluar | Status | Referensi |
| --- | --- | --- | --- | --- | --- |
| F1 | F1 Kesiapan dan identitas CaC | ADR, baseline, requirements, impact inventory, rencana kompatibilitas, rollback dan cross-spec | ADR di-review; seluruh risiko & consumer tinggi punya owner; DoR Gate 9 punya evidence | berjalan | ADR-0009; docs/migrations/2026-11-osn-to-cac.md |
| F2 | F2 Implementasi kompatibilitas | Menambah cac CLI dan alias osn, metadata platform, docs, tests & CI tanpa perubahan data | Semua tests dan CI hijau pada main, dokumen & changeset aktual | rencana | IDENTITY-CAC-002..006, 008..009 |
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

## Ditunda dan dibatalkan
- Tidak ada implementasi CLI, rename GitHub, deployment atau pengubahan kurikulum yang dilakukan pada fase dokumentasi ini.
- Nama panjang ahliweb/curriculum-as-code tidak dipilih sebagai URL GitHub; tetap menjadi nama konsep Curriculum as Code, tidak perlu membuat repository terpisah.
- Penghapusan alias osn ditunda tanpa tanggal sampai consumer terverifikasi dan ada keputusan kompatibilitas/MAJOR.

## Changelog
### 2026-11-19 - v1.0.0
- Roadmap empat fase, gates dan backlog awal disusun; fase setelah F1 belum dijalankan.
