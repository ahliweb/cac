# Templat Migration Log: Rename ahliweb/osn ke ahliweb/cac

## Metadata
- Version: v1.0.0
- Last updated: 2026-11-20
- Status: **Templat kosong. Belum ada rename dan belum ada log yang diisi.** Dokumen ini bukan catatan eksekusi.
- Issue: #157 (turunan epik #150, fase F1); memenuhi IDENTITY-CAC-010 (observabilitas dan bukti rollout) dan X-12 di [tinjauan Gate 9](2026-11-cac-gate9-review.md)
- Changeset: Menyediakan templat migration log dan ringkasan pemantauan untuk F3 dan F4; semua kolom kosong atau placeholder.
- Konteks: [runbook](2026-11-osn-to-cac.md) (urutan beku F3, bagian 4), [keamanan dan recovery](2026-11-cac-security-recovery.md) (checklist G-01..G-14), [invariants](2026-11-cac-invariants.md) (metode hash)

## Cara memakai
1. Saat F3 dimulai, **salin** templat ini menjadi satu log per eksekusi (mis. `docs/migrations/2026-MM-cac-migration-log.md`) di PR terpisah; templat ini tetap kosong.
2. Isi hanya dengan **hasil perintah nyata** yang bertanggal. Kolom yang tidak berlaku diisi `N/A` beserta alasannya; tidak ada kolom dibiarkan kosong tanpa alasan.
3. **Dilarang** mengisi secret, token, kata sandi, nilai variabel Actions, alamat email, atau nama orang. Pelaksana ditulis sebagai **peran** (pemilik repo, admin repo, orchestrator, agent pelaksana, kontributor), bukan nama.
4. Waktu ditulis ISO 8601 beserta zona (mis. `2026-MM-DDThh:mm+07:00`).
5. Status per langkah: `belum`, `berjalan`, `lulus`, `gagal`, `dihentikan`, `N/A`. "Lulus" hanya bila bukti terlampir.
6. Log ini tidak menyatakan Gate 15 lulus; pernyataan itu hanya milik pemilik di bagian 8.

## 1. Identitas eksekusi
| Kolom | Isi |
| --- | --- |
| ID eksekusi | `<MIGRASI-NNN>` |
| Repo ID (angka GitHub) sebelum rename | `<ID>` |
| Repo ID sesudah rename | `<ID>` (harus sama) |
| Nama repo sebelum / sesudah | `ahliweb/osn` / `ahliweb/cac` |
| URL sebelum / sesudah | `<URL>` / `<URL>` |
| Visibilitas dan status arsip | `<publik/privat; diarsipkan ya/tidak>` |
| Versi software (`package.json`) sebelum / sesudah | `<x.y.z>` / `<x.y.z>` |
| Versi runbook dan dokumen kontrak yang dipakai | `<runbook vX.Y.Z; keamanan vX.Y.Z; kontrak CLI vX.Y.Z; invariants vX.Y.Z>` |
| Tanggal dan jendela rename (mulai, selesai) | `<waktu>`, `<waktu>` |
| Kunci rilis | `<tidak ada / dipegang oleh peran>` |
| Pelaksana rename (peran) | `<admin repo>` |
| Pemverifikasi (peran) | `<orchestrator>` |
| Pemberi izin eksekusi (peran) | `<pemilik repo>` |

## 2. Snapshot sebelum rename (langkah 1)
Setiap nilai diukur pada saat freeze dengan perintah yang dicatat; angka tidak disalin dari dokumen lama.

| Kolom | Nilai | Perintah (read-only) | Waktu |
| --- | --- | --- | --- |
| SHA `main` | `<SHA>` | `git ls-remote origin refs/heads/main` | `<waktu>` |
| SHA root riwayat | `<SHA>` | `git rev-list --max-parents=0 origin/main` | `<waktu>` |
| Tag (nama dan SHA) | `<daftar atau tautan berkas bukti>` | `git ls-remote --tags origin` | `<waktu>` |
| Jumlah tag | `<n>` | idem | `<waktu>` |
| Rilis (tag dan jumlah) | `<daftar>` | `gh api repos/ahliweb/osn/releases` | `<waktu>` |
| Jumlah issue (semua status) | `<n>` | `gh api` pencarian atau `gh issue list --state all` | `<waktu>` |
| Jumlah PR (semua status), PR terbuka | `<n>`, `<n>` | `gh pr list --state all` | `<waktu>` |
| Cabang | `<daftar>` | `gh api "repos/ahliweb/osn/branches?per_page=100"` | `<waktu>` |
| Workflow | `<daftar>` | `gh api repos/ahliweb/osn/actions/workflows` | `<waktu>` |
| Setelan Actions (izin, `allowed_actions`, SHA pinning) | `<ringkasan>` | `gh api repos/ahliweb/osn/actions/permissions` | `<waktu>` |
| Ruleset dan proteksi `main` | `<ringkasan; check wajib>` | `gh api repos/ahliweb/osn/rules/branches/main` | `<waktu>` |
| Webhook, Pages, deploy key, environment | `<jumlah masing-masing>` | `gh api` masing-masing | `<waktu>` |
| Nama secret dan variabel Actions (hanya nama; nilai tidak dibaca) | `<daftar nama atau kosong>` | `gh secret list`; `gh variable list` | `<waktu>` |
| Kolaborator dan peran (hanya jumlah dan peran) | `<ringkasan>` | `gh api repos/ahliweb/osn/collaborators` | `<waktu>` |
| Hash agregat `data/**/*.json` (metode #154) | `<sha256>` | `find data -type f -name '*.json' \| LC_ALL=C sort \| xargs sha256sum \| sha256sum` | `<waktu>` |
| Hash per berkas | `<tautan berkas bukti>` | `... xargs sha256sum` | `<waktu>` |
| Ketersediaan `ahliweb/cac` | `<HTTP 404 diharapkan>` | `gh api repos/ahliweb/cac` | `<waktu>` |
| Berkas bukti snapshot (di luar repo publik, tanpa secret) | `<lokasi nonpublik, bukan nama repo privat>` | | |

## 3. Daftar issue, tag, dan rilis terkait
| Jenis | Nomor atau nama | SHA atau URL | Status |
| --- | --- | --- | --- |
| Issue epik | `#150` | `<URL>` | `<status>` |
| Issue F1 (#152..#157) | `<daftar>` | `<URL>` | `<status>` |
| Issue F2/01..06 | `<daftar>` | `<URL>` | `<status>` |
| Issue F3/01, F3/02 | `<daftar>` | `<URL>` | `<status>` |
| Issue F4/01, F4/02 | `<daftar>` | `<URL>` | `<status>` |
| PR yang digabung sebelum freeze | `<daftar>` | `<SHA merge>` | |
| Tag rilis kompatibilitas | `<tag>` | `<SHA>` | |
| Rilis | `<tag>` | `<URL>` | |

## 4. Bukti CI
| Titik | Run (URL) | SHA | Job `Quality` | Waktu |
| --- | --- | --- | --- | --- |
| `main` pada snapshot | `<URL>` | `<SHA>` | `<SUCCESS/…>` (dari status) | `<waktu>` |
| Preflight (langkah 2) | `<URL>` | `<SHA>` | `<…>` | `<waktu>` |
| CI pertama setelah rename | `<URL>` | `<SHA>` | `<…>` | `<waktu>` |
| Titik pemantauan 24 jam | `<URL>` | `<SHA>` | `<…>` | `<waktu>` |

## 5. Rehearsal repo uji (X-05, G-09)
Repo uji milik pemilik, dibuat dan dihapus pemilik; tuliskan **bukan** nama repo privat, cukup `<repo uji>`.

| # | Yang diuji | Tanggal | Hasil (exit code atau HTTP status) | Sisa risiko | Status |
| --- | --- | --- | --- | --- | --- |
| H-01 | Redirect web, git HTTPS, git SSH, `gh api` | `<tanggal>` | `<hasil>` | `<…>` | `<…>` |
| H-02 | Actions `uses:` ke repo yang di-rename | | | | |
| H-03 | Webhook dan PR | | | | |
| H-04 | Ruleset dan check `Quality` bertahan | | | | |
| H-05 | Rename-balik | | | | |
| H-06 | Repo baru bernama lama | | | | |
| H-07 | Pages | | | | |
| Repo uji dihapus pemilik pada | `<tanggal>` | | | | |

## 6. Status per langkah (urutan beku F3)
| # | Langkah | Pelaksana (peran) | Mulai | Selesai | Status | Bukti (bagian log, URL, atau berkas) | Catatan |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | Prasyarat | `<peran>` | | | `belum` | | |
| 1 | Freeze dan snapshot | | | | `belum` | | |
| 2 | Preflight | | | | `belum` | | |
| 3 | Approval Gate 15 dan izin eksekusi | `pemilik repo` | | | `belum` | bagian 8 | |
| 4 | Aksi admin: rename | `admin repo` | | | `belum` | | |
| 5 | Smoke test | | | | `belum` | bagian 7 | |
| 6 | Update consumer | | | | `belum` | bagian 9 | |
| 7 | Monitoring | | | | `belum` | bagian 10 | |
| 8 | Recovery atau rename-balik | | | | `N/A` bila tidak dipakai | bagian 11 | |

## 7. Verifikasi pascarename (V-01..V-18)
Daftar butir ada di [runbook](2026-11-osn-to-cac.md) bagian 8.2.

| Butir | Perintah atau pemeriksaan | Hasil | Lulus? | Waktu | Pelaksana (peran) |
| --- | --- | --- | --- | --- | --- |
| V-01 | | | | | |
| V-02 | | | | | |
| V-03 | | | | | |
| V-04 | | | | | |
| V-05 | | | | | |
| V-06 | | | | | |
| V-07 | | | | | |
| V-08 (hash agregat sesudah) | `<sha256>` sama dengan bagian 2? | | | | |
| V-09 | | | | | |
| V-10 | | | | | |
| V-11 | | | | | |
| V-12 | | | | | |
| V-13 | | | | | |
| V-14 (U-01..U-07 satu per satu) | | | | | |
| V-15 | | | | | |
| V-16 | | | | | |
| V-17 | | | | | |
| V-18 | | | | | |

## 8. Keputusan pemilik
Diisi **hanya** dari keputusan yang benar-benar dipilih pemilik (dialog pilihan atau pernyataan pemilik sendiri). Jawaban teks bebas bukan persetujuan. Persetujuan AI tidak berlaku.

| Keputusan | Opsi dipilih | Tanggal | Bukti (issue atau komentar) |
| --- | --- | --- | --- |
| Gate 9 (rujukan: [tinjauan Gate 9](2026-11-cac-gate9-review.md)) | `<…>` | `<…>` | `<…>` |
| Gate 15 (Go atau No-Go) | `<…>` | `<…>` | `<…>` |
| Izin eksekusi rename (jendela) | `<…>` | `<…>` | `<…>` |
| Risiko U-xx yang diterima tertulis | `<daftar>` | `<…>` | `<…>` |

## 9. Update consumer
| Consumer atau integrasi | Jenis | Perubahan | Pemilik (peran) | Diverifikasi | Waktu |
| --- | --- | --- | --- | --- | --- |
| `<klon, remote, badge, wiki, webhook, Action, dokumen>` | | | | | |

## 10. Ringkasan pemantauan (IDENTITY-CAC-010)
| Titik | Waktu | 404 | Actions gagal | Error CLI | Pertanyaan pengguna | Referrer baru | Keputusan |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 jam | | | | | | | |
| 24 jam | | | | | | | |
| 7 hari | | | | | | | |
| Penutupan | | | | | | | |

## 11. Recovery atau rename-balik
| Kolom | Isi |
| --- | --- |
| Dipicu oleh (gejala dan stop condition) | `<…>` |
| Keputusan | `<recovery maju / rename-balik / tidak ada>` |
| Dasar keputusan (kriteria "aman" terpenuhi? satu per satu) | `<…>` |
| Waktu sejak rename (harus dalam 24 jam bila rename-balik) | `<…>` |
| Pelaksana (peran) dan persetujuan pemilik | `<…>` |
| Bukti sesudahnya (repo ID, SHA `main`, jumlah issue, PR, tag, rilis) | `<…>` |
| Pelajaran dan catatan insiden | `<…>` (lihat [incident-response](../governance/incident-response.md)) |

## 12. Penutupan
| Kolom | Isi |
| --- | --- |
| Definisi sukses F4 terpenuhi (V-01..V-18 atau penyimpangan beralasan) | `<ya/tidak>` |
| Tanggal penutupan | `<tanggal>` |
| Penandatangan penutupan (peran) | `<pemilik repo>` |

## Changelog
### 2026-11-20 - v1.0.0
- Templat pertama (issue #157): identitas eksekusi, snapshot dengan hash agregat, daftar issue, tag, rilis, bukti CI, rehearsal repo uji, status per langkah, verifikasi V-01..V-18, keputusan pemilik, update consumer, ringkasan pemantauan, recovery, dan penutupan. Semua kolom kosong atau placeholder.
