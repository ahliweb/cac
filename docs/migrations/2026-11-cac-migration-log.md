# Migration Log MIGRASI-001: Rename ahliweb/osn ke ahliweb/cac

## Metadata
- Version: v1.0.0
- Last updated: 2026-11-20
- Status: **Log eksekusi MIGRASI-001 dibuka 2026-11-20. Langkah 0 (prasyarat) berjalan; rename BELUM dilakukan.** Bagian yang diukur saat freeze atau sesudah rename berisi `diisi saat langkah N` sampai langkah itu dijalankan. Log ini tidak menyatakan Gate 15 lulus.
- Issue: #272 (F3/01), #273 (F3/02), #274 (F4/01); turunan epik #150. Memenuhi IDENTITY-CAC-010 dan X-12.
- Changeset: Membuka log eksekusi dari [templat](2026-11-cac-migration-log-template.md) (templat tetap kosong): identitas eksekusi, daftar issue dan rilis, tabel rehearsal H-01..H-07 beserta hasil, status langkah 0, dan keputusan pemilik 2026-11-20.
- Konteks: [runbook](2026-11-osn-to-cac.md) (urutan beku F3, bagian 4), [keamanan dan recovery](2026-11-cac-security-recovery.md) (checklist G-01..G-14, hasil rehearsal 4.4), [invariants](2026-11-cac-invariants.md) (metode hash), [inventaris consumer](2026-11-cac-consumer-inventory.md)

## Cara memakai
Mengikuti "Cara memakai" di [templat](2026-11-cac-migration-log-template.md): isi hanya hasil perintah nyata yang bertanggal; kolom yang belum berlaku diisi `diisi saat langkah N` atau `N/A` beserta alasan; tidak ada secret, token, nilai variabel Actions, email, atau nama orang; pelaksana ditulis sebagai peran; waktu ISO 8601 atau UTC; status `belum`, `berjalan`, `lulus`, `gagal`, `dihentikan`, `N/A`, dan "lulus" hanya bila bukti terlampir. Pernyataan Gate 15 lulus hanya dicatat di bagian 8 setelah langkah 2, berdasarkan keputusan pemilik.

## 1. Identitas eksekusi
| Kolom | Isi |
| --- | --- |
| ID eksekusi | `MIGRASI-001` |
| Repo ID (angka GitHub) sebelum rename | `diisi saat langkah 1` |
| Repo ID sesudah rename | `diisi saat langkah 4` (harus sama) |
| Nama repo sebelum / sesudah | `ahliweb/osn` / `ahliweb/cac` |
| URL sebelum / sesudah | `https://github.com/ahliweb/osn` / `https://github.com/ahliweb/cac` |
| Visibilitas dan status arsip | `diisi saat langkah 1` |
| Versi software (`package.json`) sebelum / sesudah | `2.6.0` / `diisi saat langkah 5` (rename tidak mengubah versi paket) |
| Versi runbook dan dokumen kontrak yang dipakai | runbook v1.2.0; keamanan dan recovery v1.1.0; kontrak CLI v1.0.0; invariants v1.0.0; inventaris consumer v1.1.0 |
| Tanggal dan jendela rename (mulai, selesai) | tanggal izin 2026-11-20 (jendela hari itu); waktu mulai dan selesai: `diisi saat langkah 4` |
| Kunci rilis | tidak ada |
| Pelaksana rename (peran) | agent (orchestrator) atas izin pemilik 2026-11-20 |
| Pemverifikasi (peran) | orchestrator |
| Pemberi izin eksekusi (peran) | pemilik repo |

## 2. Snapshot sebelum rename (langkah 1)
Setiap nilai diukur pada saat freeze; angka tidak disalin dari dokumen lama. Seluruh bagian ini: `diisi saat langkah 1`.

| Kolom | Nilai | Perintah (read-only) | Waktu |
| --- | --- | --- | --- |
| SHA `main` | `diisi saat langkah 1` | `git ls-remote origin refs/heads/main` | `diisi saat langkah 1` |
| SHA root riwayat | `diisi saat langkah 1` | `git rev-list --max-parents=0 origin/main` | `diisi saat langkah 1` |
| Tag (nama dan SHA) | `diisi saat langkah 1` | `git ls-remote --tags origin` | `diisi saat langkah 1` |
| Jumlah tag | `diisi saat langkah 1` | idem | `diisi saat langkah 1` |
| Rilis (tag dan jumlah) | `diisi saat langkah 1` | `gh api repos/ahliweb/osn/releases` | `diisi saat langkah 1` |
| Jumlah issue (semua status) | `diisi saat langkah 1` | `gh issue list --state all` | `diisi saat langkah 1` |
| Jumlah PR (semua status), PR terbuka | `diisi saat langkah 1` | `gh pr list --state all` | `diisi saat langkah 1` |
| Cabang | `diisi saat langkah 1` | `gh api "repos/ahliweb/osn/branches?per_page=100"` | `diisi saat langkah 1` |
| Workflow | `diisi saat langkah 1` | `gh api repos/ahliweb/osn/actions/workflows` | `diisi saat langkah 1` |
| Setelan Actions | `diisi saat langkah 1` | `gh api repos/ahliweb/osn/actions/permissions` | `diisi saat langkah 1` |
| Ruleset dan proteksi `main` | `diisi saat langkah 1` | `gh api repos/ahliweb/osn/rules/branches/main` | `diisi saat langkah 1` |
| Webhook, Pages, deploy key, environment | `diisi saat langkah 1` | `gh api` masing-masing | `diisi saat langkah 1` |
| Nama secret dan variabel Actions (hanya nama) | `diisi saat langkah 1` | `gh secret list`; `gh variable list` | `diisi saat langkah 1` |
| Kolaborator dan peran (hanya jumlah dan peran) | `diisi saat langkah 1` | `gh api repos/ahliweb/osn/collaborators` | `diisi saat langkah 1` |
| Hash agregat `data/**/*.json` (metode #154) | `diisi saat langkah 1` | `find data -type f -name '*.json' \| LC_ALL=C sort \| xargs sha256sum \| sha256sum` | `diisi saat langkah 1` |
| Hash per berkas | `diisi saat langkah 1` | `... xargs sha256sum` | `diisi saat langkah 1` |
| Ketersediaan `ahliweb/cac` | `diisi saat langkah 2` (HTTP 404 pada 2026-11-20 sebelum log ini dibuka) | `gh api repos/ahliweb/cac` | `diisi saat langkah 2` |
| Berkas bukti snapshot (di luar repo publik, tanpa secret) | `diisi saat langkah 1` | | |

## 3. Daftar issue, tag, dan rilis terkait
| Jenis | Nomor atau nama | SHA atau URL | Status |
| --- | --- | --- | --- |
| Issue epik | #150 | https://github.com/ahliweb/osn/issues/150 | terbuka sampai penutupan F4 |
| Issue F1 | #152, #153, #154, #155, #156, #157 | https://github.com/ahliweb/osn/issues/152 dst. | dokumen F1 selesai (runbook 2.2); status issue diverifikasi saat langkah 1 |
| Issue F2/01..06 | #251, #252, #253, #254, #255, #256 | https://github.com/ahliweb/osn/issues/251 dst. | implementasi digabung (PR di bawah); status issue diverifikasi saat langkah 1 |
| Issue F3/01, F3/02 | #272 (rehearsal dan readiness), #273 (rename in-place) | https://github.com/ahliweb/osn/issues/272, https://github.com/ahliweb/osn/issues/273 | terbuka; berjalan |
| Issue F4/01, F4/02 | #274 (F4/01); F4/02 menyusul | https://github.com/ahliweb/osn/issues/274 | belum |
| PR identitas F2 yang digabung | #258, #259, #262, #260, #263, #264 | merge `6dee4e55`, `b71aa887`, `bb30e618`, `dcba9afc`, `0d565372`, `67138502` | digabung 2026-11-20 |
| PR rilis | #271 | merge commit `e85a9cbe` | digabung 2026-11-20 |
| Tag rilis kompatibilitas | `v2.6.0` (tag beranotasi) | `e85a9cbe` (merge commit PR #271) | terbit 2026-11-20 |
| Rilis | `v2.6.0` (GitHub Release "Latest"); CLI `cac` dan alias `osn`, paket `curriculum-as-code` | https://github.com/ahliweb/osn/releases/tag/v2.6.0 | terbit 2026-11-20 |
| Bukti G-08 | `git diff --name-only <merge>^1 <merge> -- data src/schema src/domain` = 0 berkas untuk PR #258, #259, #262, #260, #263 | diverifikasi orchestrator | lulus |
| PR dokumen gate 15 (dokumen ini) | menyusul | `diisi saat PR dibuat` | `belum` |

## 4. Bukti CI
| Titik | Run (URL) | SHA | Job `Quality` | Waktu |
| --- | --- | --- | --- | --- |
| `main` pada snapshot | `diisi saat langkah 1` | `diisi saat langkah 1` | `diisi saat langkah 1` | `diisi saat langkah 1` |
| Preflight (langkah 2) | `diisi saat langkah 2` | `diisi saat langkah 2` | `diisi saat langkah 2` | `diisi saat langkah 2` |
| CI pertama setelah rename | `diisi saat langkah 5` | `diisi saat langkah 5` | `diisi saat langkah 5` | `diisi saat langkah 5` |
| Titik pemantauan 24 jam | `diisi saat langkah 7` | `diisi saat langkah 7` | `diisi saat langkah 7` | `diisi saat langkah 7` |

## 5. Rehearsal repo uji (X-05, G-09)
Dijalankan 2026-11-20, 06:36 s.d. 06:51 UTC, oleh agent pelaksana atas keputusan pemilik 2026-11-20 (opsi "Izinkan agent"). Repo uji publik sementara, bukan `ahliweb/osn`; tidak ada perubahan pada `ahliweb/osn`.

| Repo uji | Peran | ID |
| --- | --- | --- |
| `ahliweb/cac-gladi-a` (kemudian `ahliweb/cac-gladi-a2`) | repo yang di-rename; berisi ruleset, webhook, PR, Pages | 1465074607 |
| `ahliweb/cac-gladi-a` (repo baru) | pembuat konflik nama lama (H-06) | 1465084137 |
| `ahliweb/cac-gladi-b` | consumer Action | tidak dicatat |

| # | Yang diuji | Tanggal | Hasil (exit code atau HTTP status) | Sisa risiko | Status |
| --- | --- | --- | --- | --- | --- |
| H-01 | Redirect web, git HTTPS, git SSH, `gh api` | 2026-11-20 (06:40 UTC, rename 06:39:59) | `curl -sI` web: HTTP 301 ke nama baru, `-L` 200 satu hop; `/pull/1` lama 301; `git ls-remote` HTTPS dan SSH ke nama lama dan baru exit 0, SHA sama (`dd210cc`); klon dengan `origin` lama: `git fetch` exit 0, `git pull` up to date; `gh api repos/<lama>` 200, `full_name` nama baru, ID sama; REST `api.github.com/repos/<lama>` 301 ke `/repositories/<id>` | redirect hanya diuji dalam menit; batas waktu redirect tidak teruji; setelah repo lama dihapus tidak diuji | lulus |
| H-02 | Actions `uses:` ke repo yang di-rename | 2026-11-20 (06:39 s.d. 06:49 UTC) | **Tetap sukses**: run sebelum rename sukses (06:39:00); run sesudah rename sukses (06:41:55), log men-resolve SHA `dd210cc` dari repo yang sama (action root dan sub-path). Hipotesis dokumen "gagal `repository not found`" **tidak terbukti**. Setelah H-06, run gagal (06:49:01) `Can't find 'action.yml'` karena me-resolve repo baru | reusable workflow, GHCR, dan `github.repository` di workflow tidak diuji | lulus (hipotesis dikoreksi) |
| H-03 | Webhook dan PR | 2026-11-20 (06:37 s.d. 06:44 UTC) | Webhook tetap (ID sama, aktif, URL sama) dan terpicu: ping sebelum, push dan pull_request sesudah rename (HTTP 502 karena penerima palsu; payload `full_name` nama baru); PR #1 tetap OPEN; `/pull/1` URL lama 301; `gh pr view -R <lama>` berhasil | pengiriman ke penerima nyata tidak teruji; penerima yang mencocokkan nama repo di payload harus diperbarui | lulus |
| H-04 | Ruleset dan check `Quality` bertahan | 2026-11-20 (06:38 s.d. 06:44 UTC) | Ruleset (non_fast_forward, deletion, required_status_checks `Quality`) identik (`diff` kosong) sebelum dan sesudah rename dan setelah rename kedua; force-push ke `main` lewat nama lama dan baru ditolak (`push declined due to repository rule violations`); hapus `main` ditolak (422, oleh aturan default branch); nama check `Quality` tidak berubah | ruleset dengan bypass actor atau review wajib tidak teruji; satu admin | lulus |
| H-05 | Rename-balik | 2026-11-20 (06:45:44 UTC) | ID repo sama (1465074607); fetch dari kedua nama berhasil; klon lama dan baru `fetch` exit 0; ruleset, webhook, PR utuh | hanya rename-balik langsung (1 sampai 5 menit), bukan setelah jendela 24 jam; aman hanya selama nama lama tidak diambil | lulus |
| H-06 | Repo baru bernama lama | 2026-11-20 (06:47:35 s.d. 06:50 UTC) | Redirect nama lama berhenti; nama lama milik repo baru (ID 1465084137); `git ls-remote` HTTPS dan SSH exit 0 tetapi SHA repo baru (`6d43ea8`, bukan `dd210cc`); `git fetch` klon lama exit 0 dengan forced update diam-diam; `gh api` ID baru; consumer Action gagal; ruleset dan webhook tidak ikut ke repo baru | exit code tidak cukup sebagai gerbang: verifikasi wajib membandingkan SHA `main` dan ID repo; mitigasi inti: larangan membuat repo `osn` dan `cac` | lulus (mengonfirmasi R-03 dan R-11; rename-balik tidak aman bila terjadi) |
| H-07 | Pages | 2026-11-20 (06:44 s.d. 06:45 UTC) | URL lama langsung 404 setelah rename (tanpa redirect Pages), URL baru 200; setelah rename-balik: lama 200, nama baru 404; osn tidak memakai Pages | tautan `*.github.io` ke osn (bila ada) putus seketika | lulus |
| Repo uji dihapus pemilik pada | `belum` (`ahliweb/cac-gladi-a2`, `ahliweb/cac-gladi-a`, `ahliweb/cac-gladi-b`; token agent tanpa `delete_repo`, jadi pemilik yang menghapus) | | | | `belum` |

Tidak teruji (ringkas): reusable workflow, GHCR, batas waktu redirect, rename-balik setelah 24 jam, ruleset dengan bypass atau review wajib, pengiriman webhook ke penerima nyata, perilaku redirect setelah repo lama dihapus, setelan khusus osn (jumlah issue, tag, rilis, Environments, Secrets). Ringkasan hasil dan implikasi: [keamanan dan recovery](2026-11-cac-security-recovery.md) 4.4; issue #272.

## 6. Status per langkah (urutan beku F3)
| # | Langkah | Pelaksana (peran) | Mulai | Selesai | Status | Bukti (bagian log, URL, atau berkas) | Catatan |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | Prasyarat | pemilik repo (keputusan); orchestrator (verifikasi) | 2026-11-20 | | `berjalan` | bagian 3 (F2, v2.6.0), bagian 5 (rehearsal), bagian 8 (keputusan) | F2 selesai dan v2.6.0 terbit; rehearsal selesai; U-01..U-07 risiko diterima; sisa: PR dokumen ini digabung, ruleset `main` diaktifkan orchestrator, repo uji dihapus pemilik, jadwal dan pengumuman |
| 1 | Freeze dan snapshot | pemilik repo (freeze); orchestrator (snapshot) | | | `belum` | bagian 2 | kunci rilis dicatat saat freeze |
| 2 | Preflight | orchestrator; pemilik (periksa) | | | `belum` | bagian 4 | G-02, G-06, G-10, G-11, G-13 dijalankan di sini |
| 3 | Pencatatan Gate 15 dan izin eksekusi | orchestrator mencatat atas keputusan pemilik | | | `belum` | bagian 8 | dicatat lulus hanya setelah langkah 0..2 terbukti |
| 4 | Aksi admin: rename | agent (orchestrator) atas izin pemilik 2026-11-20 | | | `belum` | | rename in-place; jendela izin hari 2026-11-20 |
| 5 | Smoke test | orchestrator; pemilik (periksa) | | | `belum` | bagian 7 | bandingkan SHA `main` dan ID repo |
| 6 | Update consumer | pemilik repo; agent (PR docs) | | | `belum` | bagian 9 | |
| 7 | Monitoring | pemilik repo; orchestrator | | | `belum` | bagian 10 | |
| 8 | Recovery atau rename-balik | pemilik repo memutuskan | | | `N/A` bila tidak dipakai | bagian 11 | default recovery maju |

## 7. Verifikasi pascarename (V-01..V-18)
Daftar butir ada di [runbook](2026-11-osn-to-cac.md) bagian 8.2. Seluruh baris: `diisi saat langkah 5` (V-01..V-12, V-15..V-16, V-18) dan `diisi saat langkah 6` atau `7` (V-13, V-14, V-17).

| Butir | Perintah atau pemeriksaan | Hasil | Lulus? | Waktu | Pelaksana (peran) |
| --- | --- | --- | --- | --- | --- |
| V-01 | `diisi saat langkah 5` | `diisi saat langkah 5` | `diisi saat langkah 5` | `diisi saat langkah 5` | orchestrator |
| V-02 | `diisi saat langkah 5` | `diisi saat langkah 5` | `diisi saat langkah 5` | `diisi saat langkah 5` | orchestrator |
| V-03 | `diisi saat langkah 5` | `diisi saat langkah 5` | `diisi saat langkah 5` | `diisi saat langkah 5` | orchestrator |
| V-04 | `diisi saat langkah 5` | `diisi saat langkah 5` | `diisi saat langkah 5` | `diisi saat langkah 5` | orchestrator |
| V-05 | `diisi saat langkah 5` | `diisi saat langkah 5` | `diisi saat langkah 5` | `diisi saat langkah 5` | orchestrator |
| V-06 | `diisi saat langkah 5` | `diisi saat langkah 5` | `diisi saat langkah 5` | `diisi saat langkah 5` | orchestrator |
| V-07 | `diisi saat langkah 5` | `diisi saat langkah 5` | `diisi saat langkah 5` | `diisi saat langkah 5` | orchestrator |
| V-08 (hash agregat sesudah) | sama dengan bagian 2? `diisi saat langkah 5` | `diisi saat langkah 5` | `diisi saat langkah 5` | `diisi saat langkah 5` | orchestrator |
| V-09 | `diisi saat langkah 5` | `diisi saat langkah 5` | `diisi saat langkah 5` | `diisi saat langkah 5` | orchestrator |
| V-10 | `diisi saat langkah 5` | `diisi saat langkah 5` | `diisi saat langkah 5` | `diisi saat langkah 5` | pemilik repo, orchestrator |
| V-11 | `diisi saat langkah 5` | `diisi saat langkah 5` | `diisi saat langkah 5` | `diisi saat langkah 5` | orchestrator |
| V-12 | `diisi saat langkah 5` | `diisi saat langkah 5` | `diisi saat langkah 5` | `diisi saat langkah 5` | orchestrator |
| V-13 | `diisi saat langkah 6` | `diisi saat langkah 6` | `diisi saat langkah 6` | `diisi saat langkah 6` | orchestrator, pemilik repo |
| V-14 (U-01..U-07) | merujuk keputusan 2026-11-20 (bagian 8); `diisi saat langkah 6` | `diisi saat langkah 6` | `diisi saat langkah 6` | `diisi saat langkah 6` | pemilik repo |
| V-15 | `diisi saat langkah 6` | `diisi saat langkah 6` | `diisi saat langkah 6` | `diisi saat langkah 6` | orchestrator |
| V-16 | `diisi saat langkah 5` | `diisi saat langkah 5` | `diisi saat langkah 5` | `diisi saat langkah 5` | pemilik repo, orchestrator |
| V-17 | `diisi saat langkah 7` | `diisi saat langkah 7` | `diisi saat langkah 7` | `diisi saat langkah 7` | pemilik repo, orchestrator |
| V-18 | `diisi saat langkah 5` | `diisi saat langkah 5` | `diisi saat langkah 5` | `diisi saat langkah 5` | orchestrator |

## 8. Keputusan pemilik
Diisi hanya dari keputusan yang benar-benar dipilih pemilik lewat dialog pilihan baku. Persetujuan AI atas inisiatif sendiri tidak berlaku.

| Keputusan | Opsi dipilih | Tanggal | Bukti (issue atau komentar) |
| --- | --- | --- | --- |
| Gate 9 (rujukan: [tinjauan Gate 9](2026-11-cac-gate9-review.md)) | PASSED (kesiapan implementasi F2 saja) | 2026-11-20 | komentar epik #150 |
| G-03: U-01..U-07 | **"Terima risiko tertulis"**: risiko consumer tak dikenal diterima; mitigasi redirect GitHub, alias `osn`, pengumuman ke kontributor, pemantauan 1 jam, 24 jam, 7 hari; R-12 ditutup | 2026-11-20 | dialog pilihan baku; dicatat di [inventaris](2026-11-cac-consumer-inventory.md) bagian 6 dan epik #150 |
| G-04 dan G-09: repo uji dan ruleset | **"Izinkan agent"**: agent membuat repo uji sementara, menjalankan H-01..H-07, lalu mengaktifkan ruleset `main` osn (check `Quality` wajib, tanpa force-push dan hapus); repo uji dihapus pemilik sendiri | 2026-11-20 | dialog pilihan baku; issue #272 |
| Gate 15 dan izin eksekusi rename (G-14) | **"Lulus lalu agent rename"**: setelah G-01..G-14 terbukti, Gate 15 dicatat lulus dan agent menjalankan rename in-place `osn` ke `cac` hari itu lalu smoke test; izin bertanggal 2026-11-20, jendela hari itu | 2026-11-20 | dialog pilihan baku; issue #273 |
| Pencatatan "Gate 15 lulus" | **Belum dicatat.** Dilakukan setelah langkah 2 terbukti (G-02, G-04, G-05, G-06, G-10, G-11, G-13 dan butir sebagian G-01, G-12). Bila ada butir tidak terbukti: No-Go | `diisi saat langkah 3` | `diisi saat langkah 3` |
| Persetujuan 753 modul draf (tidak berkaitan dengan rename) | dicatat di PR terpisah #275 | 2026-11-20 | issue #125 |

## 9. Update consumer
Seluruh bagian: `diisi saat langkah 6`.

| Consumer atau integrasi | Jenis | Perubahan | Pemilik (peran) | Diverifikasi | Waktu |
| --- | --- | --- | --- | --- | --- |
| `diisi saat langkah 6` | | | | | |

## 10. Ringkasan pemantauan (IDENTITY-CAC-010)
Seluruh bagian: `diisi saat langkah 7`.

| Titik | Waktu | 404 | Actions gagal | Error CLI | Pertanyaan pengguna | Referrer baru | Keputusan |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 jam | `diisi saat langkah 7` | | | | | | |
| 24 jam | `diisi saat langkah 7` | | | | | | |
| 7 hari | `diisi saat langkah 7` | | | | | | |
| Penutupan | `diisi saat langkah 7` | | | | | | |

## 11. Recovery atau rename-balik
`N/A` sampai ada gejala. Diisi saat langkah 8 bila dipakai; default recovery maju ([runbook](2026-11-osn-to-cac.md) bagian 4, langkah 8).

| Kolom | Isi |
| --- | --- |
| Dipicu oleh (gejala dan stop condition) | `N/A`, belum ada rename |
| Keputusan | `tidak ada` |
| Dasar keputusan (kriteria "aman" terpenuhi? satu per satu) | `N/A` |
| Waktu sejak rename (harus dalam 24 jam bila rename-balik) | `N/A` |
| Pelaksana (peran) dan persetujuan pemilik | `N/A` |
| Bukti sesudahnya (repo ID, SHA `main`, jumlah issue, PR, tag, rilis) | `N/A` |
| Pelajaran dan catatan insiden | `N/A` (lihat [incident-response](../governance/incident-response.md)) |

## 12. Penutupan
| Kolom | Isi |
| --- | --- |
| Definisi sukses F4 terpenuhi (V-01..V-18 atau penyimpangan beralasan) | `belum` |
| Tanggal penutupan | `diisi saat penutupan` |
| Penandatangan penutupan (peran) | pemilik repo |

## Changelog
### 2026-11-20 - v1.0.0
- Log eksekusi MIGRASI-001 dibuka dari templat (issues #272, #273): identitas eksekusi, daftar issue, PR, dan rilis v2.6.0, rehearsal H-01..H-07 beserta hasil, langkah 0 berjalan, keputusan pemilik 2026-11-20. Snapshot, bukti CI, verifikasi V-01..V-18, update consumer, dan pemantauan menunggu langkah masing-masing.
