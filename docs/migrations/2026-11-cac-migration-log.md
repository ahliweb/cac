# Migration Log MIGRASI-001: Rename ahliweb/osn ke ahliweb/cac

## Metadata
- Version: v1.2.0
- Last updated: 2026-11-20
- Status: **Selesai dan ditutup 2026-11-20.** Rename selesai; pemeriksaan penutup 08:10Z lulus; pemantauan 24 jam dan 7 hari dihapus atas instruksi langsung pemilik 2026-11-20 ("hapus syarat alasan pemantauan pada semua isu, selesaikan sekarang"). Rename in-place `ahliweb/osn` menjadi `ahliweb/cac` dilaksanakan 07:42:51Z sampai 07:42:53Z (ID repo sama). Gate 15 dicatat lulus 2026-11-20 atas keputusan pemilik (bagian 8). Verifikasi V-01..V-18 terisi sejauh dapat dibuktikan hari ini; butir 1 jam, 24 jam, dan 7 hari menunggu.
- Issue: #272 (F3/01), #273 (F3/02), #274 (F4/01); turunan epik #150. Memenuhi IDENTITY-CAC-010 dan X-12.
- Changeset: Penutupan log MIGRASI-001 (issue #274, epik #150): V-09, repo uji terhapus, langkah 6 dan 7 lulus, pemeriksaan penutup 08:10:59Z, definisi sukses F4; pemantauan 24 jam dan 7 hari dihapus atas instruksi langsung pemilik 2026-11-20.
- Konteks: [runbook](2026-11-osn-to-cac.md) (urutan beku F3, bagian 4), [keamanan dan recovery](2026-11-cac-security-recovery.md) (checklist G-01..G-14, hasil rehearsal 4.4), [invariants](2026-11-cac-invariants.md) (metode hash), [inventaris consumer](2026-11-cac-consumer-inventory.md)

## Cara memakai
Mengikuti "Cara memakai" di [templat](2026-11-cac-migration-log-template.md): isi hanya hasil perintah nyata yang bertanggal; kolom yang belum berlaku diisi `diisi saat langkah N` atau `N/A` beserta alasan; tidak ada secret, token, nilai variabel Actions, email, atau nama orang; pelaksana ditulis sebagai peran; waktu ISO 8601 atau UTC; status `belum`, `berjalan`, `lulus`, `gagal`, `dihentikan`, `N/A`, dan "lulus" hanya bila bukti terlampir. Pernyataan Gate 15 lulus hanya dicatat di bagian 8 setelah langkah 2, berdasarkan keputusan pemilik.

## 1. Identitas eksekusi
| Kolom | Isi |
| --- | --- |
| ID eksekusi | `MIGRASI-001` |
| Repo ID (angka GitHub) sebelum rename | `1357521130` (snapshot 2026-11-20T07:06:14Z) |
| Repo ID sesudah rename | `1357521130` (snapshot 2026-11-20T07:43:02Z; sama) |
| Nama repo sebelum / sesudah | `ahliweb/osn` / `ahliweb/cac` |
| URL sebelum / sesudah | `https://github.com/ahliweb/osn` / `https://github.com/ahliweb/cac` |
| Visibilitas dan status arsip | publik, tidak diarsipkan (sebelum dan sesudah) |
| Versi software (`package.json`) sebelum / sesudah | `2.6.0` / `2.6.0` (rename tidak mengubah versi paket; `cac --version` dan `osn --version` = 2.6.0 pada 07:43Z) |
| Versi runbook dan dokumen kontrak yang dipakai | runbook v1.2.0 (v1.3.0 sesudah PR F4); keamanan dan recovery v1.1.0; kontrak CLI v1.0.0; invariants v1.0.0; inventaris consumer v1.1.0 |
| Tanggal dan jendela rename (mulai, selesai) | 2026-11-20; mulai 07:42:51Z, selesai 07:42:53Z (UTC); freeze mulai 07:06:01Z |
| Kunci rilis | tidak ada (dibaca saat freeze; PR terbuka 0) |
| Pelaksana rename (peran) | agent (orchestrator) atas izin pemilik 2026-11-20; perintah `gh api -X PATCH repos/ahliweb/osn -f name=cac` |
| Pemverifikasi (peran) | orchestrator |
| Pemberi izin eksekusi (peran) | pemilik repo |

## 2. Snapshot sebelum rename (langkah 1)
Diukur saat freeze (mulai 2026-11-20T07:06:01Z; snapshot 07:06:14Z sampai 07:07:42Z) dan diulang sesudah rename (07:43:02Z sampai 07:43:30Z). Kolom "Sesudah" identik dengan "Sebelum" kecuali nama. Berkas bukti ada di luar repo publik (folder kerja orchestrator; tanpa secret): `snap-sebelum.txt`, `snap-sesudah.txt`, `smoke.txt`.

| Kolom | Nilai sebelum | Nilai sesudah (07:43Z) | Perintah (read-only) |
| --- | --- | --- | --- |
| SHA `main` | `3c22ea2e28059a96c69452141defd1d6ec66cd52` | sama | `git ls-remote origin refs/heads/main` |
| SHA root riwayat | `132c295aa7a514d95886a99752417cdb24154539` | sama | `git rev-list --max-parents=0 origin/main` |
| Tag (nama dan SHA) | v1.0.0 `c941beb`, v1.1.0 `28157e7`, v2.0.0 `2a5d730`, v2.1.0 `06754c3`, v2.2.0 `ceb1916`, v2.3.0 `5a46575`, v2.4.0 `f5d5ab3`, v2.5.0 `2cf4ad7`, v2.6.0 `5fc6660` (SHA objek tag) | sama | `git ls-remote --tags origin` |
| Jumlah tag | 9 | 9 | idem |
| Rilis | 2 (`v2.6.0`, `v2.5.0`) | 2 | `gh api repos/ahliweb/osn/releases` |
| Jumlah issue (semua status; terbuka) | 89 (5 terbuka) | 89 | `gh issue list --state all` |
| Jumlah PR (semua status; terbuka) | 188 (0 terbuka) | 188 | `gh pr list --state all` |
| Cabang | `main` | `main` | `gh api "repos/ahliweb/osn/branches?per_page=100"` |
| Workflow | `CI` aktif; "Dependabot Updates" aktif | sama | `gh api repos/ahliweb/osn/actions/workflows` |
| Setelan Actions | `enabled=true`, `allowed_actions=all` | sama | `gh api repos/ahliweb/osn/actions/permissions` |
| Ruleset dan proteksi `main` | ruleset `main` aktif (ID 27707932, dibuat 2026-11-20 di #272): `deletion`, `non_fast_forward`, `required_status_checks` (`Quality`) | sama | `gh api repos/ahliweb/osn/rules/branches/main` |
| Webhook, Pages, deploy key, environment | 0; Pages tidak ada (404); 0; 0 | sama | `gh api` masing-masing |
| Nama secret dan variabel Actions (hanya nama) | kosong; kosong | kosong; kosong | `gh secret list`; `gh variable list` |
| Kolaborator dan peran (jumlah dan peran) | 1, `admin` | sama | `gh api repos/ahliweb/osn/collaborators` |
| Hash agregat `data/**/*.json` (71 berkas; metode #154) | `b263741609fdb280c4729941e2e74aa905cf3a3b95a2bb2969a9400232e6d662` | sama (diukur ulang 07:46Z dari `git archive origin/main data`) | `find data -type f -name '*.json' \| LC_ALL=C sort \| xargs sha256sum \| sha256sum` |
| Hash per berkas | disimpan di berkas bukti snapshot (di luar repo) | | `... xargs sha256sum` |
| Ketersediaan `ahliweb/cac` | HTTP 404 (07:06Z, sebelum rename) | `ahliweb/cac` = repo yang di-rename | `gh api repos/ahliweb/cac` |
| Berkas bukti snapshot (di luar repo publik, tanpa secret) | `snap-sebelum.txt` | `snap-sesudah.txt` | |

## 3. Daftar issue, tag, dan rilis terkait
Tautan memakai `ahliweb/cac` (URL `ahliweb/osn` dialihkan).

| Jenis | Nomor atau nama | SHA atau URL | Status |
| --- | --- | --- | --- |
| Issue epik | #150 | https://github.com/ahliweb/cac/issues/150 | ditutup bersama penutupan F4 (2026-11-20) |
| Issue F1 | #152, #153, #154, #155, #156, #157 | https://github.com/ahliweb/cac/issues/152 dst. | dokumen F1 selesai |
| Issue F2/01..06 | #251, #252, #253, #254, #255, #256 | https://github.com/ahliweb/cac/issues/251 dst. | implementasi digabung (PR di bawah) |
| Issue F3/01 | #272 (rehearsal dan readiness) | https://github.com/ahliweb/cac/issues/272 | tertutup |
| Issue F3/02 | #273 (rename in-place; keputusan, Gate 15, bukti langkah 1..4) | https://github.com/ahliweb/cac/issues/273 | rename dilaksanakan 2026-11-20; ditutup oleh PR penutupan F4 |
| Issue F4/01 | #274 (sinkronisasi tautan aktif dan log ini) | https://github.com/ahliweb/cac/issues/274 | ditutup oleh PR penutupan F4 |
| Issue pengumuman G-11 | #277 | https://github.com/ahliweb/cac/issues/277 | dipasang 2026-11-20; dilepas dan ditutup saat penutupan F4 |
| PR yang digabung sebelum freeze | #258 sampai #276 (termasuk identitas F2 #258, #259, #262, #260, #263, #264; rilis #271; persetujuan modul #275; dokumen Gate 15 #276) | `main` = `3c22ea2` pada freeze | PR terbuka 0 saat freeze |
| Tag rilis kompatibilitas | `v2.6.0` (tag beranotasi) | `e85a9cbe` (merge commit PR #271) | terbit 2026-11-20 |
| Rilis | `v2.6.0` (GitHub Release "Latest") dan `v2.5.0`; CLI `cac` dan alias `osn`, paket `curriculum-as-code` | https://github.com/ahliweb/cac/releases/tag/v2.6.0 | terbit 2026-11-20; 2 rilis sebelum dan sesudah rename |
| Bukti G-08 | `git diff --name-only <merge>^1 <merge> -- data src/schema src/domain` = 0 berkas untuk PR #258, #259, #262, #260, #263 | diverifikasi orchestrator | lulus |
| PR dokumen pascarename | #278 (tautan aktif dan log langkah 1..5) dan PR penutupan F4 (log ini v1.2.0) | `3b534ca` (merge #278) | #278 digabung 2026-11-20 |

## 4. Bukti CI
| Titik | Run (URL) | SHA | Job `Quality` | Waktu |
| --- | --- | --- | --- | --- |
| `main` pada snapshot | https://github.com/ahliweb/cac/actions/runs/44692226860 (dibuat saat repo bernama `osn`; tautan lama dialihkan) | `3c22ea2e28059a96c69452141defd1d6ec66cd52` | `SUCCESS` | 2026-11-20 (sebelum freeze) |
| Preflight (langkah 2) | lokal pada `3c22ea2`: format, lint, assist, typecheck, build, `cac validate`, `osn validate`, privacy-check, check:requirements, check:module-code, check:learner-assets, check:fidelity, check:checklist-fidelity semuanya exit 0; CLI contract 77 pass 0 fail; `bun test` 2250 pass 0 fail; `bun audit` bersih; gitleaks 9 temuan, semuanya contoh palsu di modul (`KUNCI_PALSU_CONTOH_*`, `tok-palsu-12345`, `abcd1234efgh`) = positif palsu | `3c22ea2` | sama dengan baris di atas | 2026-11-20T07:08Z |
| CI pertama setelah rename | https://github.com/ahliweb/cac/actions/runs/44698612080 (PR #278) | `fdc6c69e5e19d53c54a37bf6f24460b0f7ab6d29` | `SUCCESS` | 2026-11-20T07:56:07Z |
| CI `main` pertama setelah rename | https://github.com/ahliweb/cac/actions/runs/44699323588 (merge PR #278) | `3b534ca6dc31c9e2c5fac7479d7b6f1551a85df5` | `SUCCESS` | 2026-11-20T08:01:51Z |
| Pemeriksaan penutup (menggantikan titik 24 jam) | 0 run gagal sejak rename (`gh run list`) | `3b534ca` | `SUCCESS` | 2026-11-20T08:10:59Z |

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
| Repo uji dihapus pemilik pada | 2026-11-20, terverifikasi terhapus 08:01Z dan 08:10Z (`ahliweb/cac-gladi-a2`, `ahliweb/cac-gladi-a`, `ahliweb/cac-gladi-b` HTTP 404) | | | | `lulus` |

Tidak teruji (ringkas): reusable workflow, GHCR, batas waktu redirect, rename-balik setelah 24 jam, ruleset dengan bypass atau review wajib, pengiriman webhook ke penerima nyata, perilaku redirect setelah repo lama dihapus, setelan khusus osn (jumlah issue, tag, rilis, Environments, Secrets). Ringkasan hasil dan implikasi: [keamanan dan recovery](2026-11-cac-security-recovery.md) 4.4; issue #272.

## 6. Status per langkah (urutan beku F3)
Waktu dalam UTC, 2026-11-20.

| # | Langkah | Pelaksana (peran) | Mulai | Selesai | Status | Bukti (bagian log, URL, atau berkas) | Catatan |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | Prasyarat | pemilik repo (keputusan); orchestrator (verifikasi) | 2026-11-20 | 2026-11-20 (sebelum 07:06) | `lulus` | bagian 3 (F2, v2.6.0), 5 (rehearsal), 8 (keputusan); ruleset `main` aktif (ID 27707932) | F2 selesai dan v2.6.0 terbit; rehearsal selesai; U-01..U-07 risiko diterima; repo uji dihapus pemilik (bagian 5) |
| 1 | Freeze dan snapshot | pemilik repo (freeze); orchestrator (snapshot) | 07:06:01 | 07:07:42 | `lulus` | bagian 2 (`snap-sebelum.txt`) | kunci rilis: tidak ada; PR terbuka 0 |
| 2 | Preflight | orchestrator; pemilik (periksa) | 07:08 | sebelum langkah 3 | `lulus` | bagian 4 (CI `Quality` SUCCESS, uji lokal, `bun audit`, gitleaks, pindai consumer: tidak ada `uses: ahliweb/osn`); pengumuman G-11 = #277 | G-02, G-06, G-10, G-11, G-13 terbukti |
| 3 | Pencatatan Gate 15 dan izin eksekusi | orchestrator mencatat atas keputusan pemilik | sebelum 07:42 | 2026-11-20 | `lulus` | bagian 8; komentar #273 | Gate 15 lulus, izin "Lulus lalu agent rename" dipakai |
| 4 | Aksi admin: rename | agent (orchestrator) atas izin pemilik 2026-11-20 | 07:42:51 | 07:42:53 | `lulus` | `gh api -X PATCH repos/ahliweb/osn -f name=cac`; ID 1357521130 sebelum dan sesudah | rename in-place |
| 5 | Smoke test | orchestrator; pemilik (periksa) | 07:43 | 07:43:30 | `lulus` | bagian 7; `smoke.txt`, `snap-sesudah.txt` | SHA `main` dan ID repo sama; catatan URL issue lama di bagian 7 (V-03) |
| 6 | Update consumer | pemilik repo; agent (PR docs) | 2026-11-20 | 2026-11-20T08:05Z | `lulus` | bagian 9; PR #278 | tautan aktif diperbarui (PR #278); berkas inventaris repositori dokumentasi internal pemilik diperbarui dan digabung 2026-11-20 |
| 7 | Monitoring | pemilik repo; orchestrator | 2026-11-20 07:43 | 2026-11-20T08:10:59Z | `lulus` | bagian 10 | pemeriksaan penutup 28 menit setelah rename; titik 24 jam dan 7 hari dihapus atas instruksi langsung pemilik 2026-11-20 ("hapus syarat alasan pemantauan pada semua isu, selesaikan sekarang") |
| 8 | Recovery atau rename-balik | pemilik repo memutuskan | | | `N/A` | bagian 11 | tidak dipakai; tidak ada stop condition terpicu |

## 7. Verifikasi pascarename (V-01..V-18)
Daftar butir ada di [runbook](2026-11-osn-to-cac.md) bagian 8.2. Pemeriksaan hari rename dijalankan 07:43Z (smoke) dan diulang read-only pada 2026-11-20T07:46Z; pelaksana semuanya orchestrator kecuali dicatat. Butir yang butuh waktu atau tindakan pemilik tertulis `menunggu`. Perintah URL memakai `ahliweb/cac` kecuali memang menguji nama lama.

| Butir | Perintah atau pemeriksaan | Hasil | Lulus? | Waktu | Pelaksana (peran) |
| --- | --- | --- | --- | --- | --- |
| V-01 | `gh api repos/ahliweb/cac --jq .id`; `gh api repos/ahliweb/osn --jq '[.id,.full_name]'` | keduanya `1357521130`; nama lama mengembalikan `ahliweb/cac` (repo yang sama, bukan repo lain) | lulus | 07:43Z dan 07:46Z | orchestrator |
| V-02 | `git ls-remote` (main, tag), `gh api .../releases`, `gh issue list`, `gh pr list`, `gh api .../branches`; SHA root | SHA `main` `3c22ea2e2805...` sama; 9 tag; 2 rilis; 89 issue; 188 PR (0 terbuka); cabang `main`; semua sama dengan bagian 2 | lulus | 07:43Z dan 07:46Z | orchestrator |
| V-03 | `curl -sI` web lama; URL lama PR, blob, tree; URL lama issue; `curl -L` | web lama 301 ke `https://github.com/ahliweb/cac`, web baru 200; PR, blob, tree lama 301 ke `cac`; **URL issue lama `.../osn/issues/150`: respons pertama 404 tanpa header Location, tetapi bila diikuti (`curl -L`) berakhir 200 di `.../cac/issues/150`** (perilaku GitHub; tautan issue lama tetap sampai bagi peramban dan klien yang mengikuti pengalihan) | lulus dengan catatan | 07:43Z | orchestrator |
| V-04 | `git ls-remote` HTTPS dan SSH ke URL lama dan baru | semuanya `3c22ea2e2805` exit 0; klon orchestrator memakai `git remote set-url origin https://github.com/ahliweb/cac.git` | lulus | 07:43Z | orchestrator |
| V-05 | `osn validate`, `osn privacy-check`, `osn --version`, `osn nope` | exit 0, 0, 0, 2; `--version` 2.6.0; kontrak CLI: 77 pass pada preflight | lulus | 07:46Z | orchestrator |
| V-06 | idem dengan `cac`; `validate --json` kedua CLI | exit 0, 0, 0, 2; hash SHA-256 JSON `cac` dan `osn` identik (`f18f45ac...5336`) | lulus | 07:46Z | orchestrator |
| V-07 | `cac validate --program <id>` dan `osn validate --program <id>` untuk tujuh ID; `bun run check:fidelity` | semua exit 0 (14 pemanggilan); `check:fidelity` exit 0; `privacy-check` exit 0 | lulus | 07:46Z | orchestrator |
| V-08 | hash agregat dari `git archive origin/main data`; `git diff --stat -- data src/schema src/domain` | `b263741609fdb280c4729941e2e74aa905cf3a3b95a2bb2969a9400232e6d662` sama dengan bagian 2; diff kosong | lulus | 07:46Z | orchestrator |
| V-09 | CI pertama pada `cac` (job `Quality`) lewat status | run 44698612080 (PR #278) dan 44699323588 (`main` `3b534ca`): `SUCCESS` | lulus | 2026-11-20T08:01Z | orchestrator |
| V-10 | `gh api repos/ahliweb/cac/rules/branches/main`; ruleset | memuat `deletion`, `non_fast_forward`, `required_status_checks` (`Quality`); ruleset aktif ID 27707932 bertahan; sama dengan sebelum rename | lulus | 07:43Z dan 07:46Z | pemilik repo, orchestrator |
| V-11 | `gh api .../actions/workflows`; `grep -rn -E 'uses:[[:space:]]*ahliweb/' .github` | `CI` dan "Dependabot Updates" aktif; pindai kosong (0); tidak ada consumer Action eksternal | lulus | 07:46Z | orchestrator, pemilik repo |
| V-12 | `gh api repos/ahliweb/cac/pages` | HTTP 404 (Pages tidak aktif) | lulus | 07:46Z | orchestrator |
| V-13 | webhook, deploy key, environment, secret, variabel (jumlah/nama saja) | webhook 0; deploy key 0; environment 0; secret dan variabel kosong. Wiki dan Projects (U-05): ditutup oleh risiko diterima tertulis (V-14); tidak diperiksa isinya | lulus (wiki/Projects: risiko diterima) | 07:46Z | orchestrator, pemilik repo |
| V-14 | U-01..U-07 | ditutup oleh keputusan G-03 pemilik 2026-11-20 ("Terima risiko tertulis"; bagian 8); jawaban yang masuk kemudian dicatat di sini | lulus (risiko diterima) | 2026-11-20 | pemilik repo |
| V-15 | tautan aktif dan dokumen; `bun run check:requirements` | tautan aktif di README, AGENTS, SECURITY, docs terkait diperbarui ke `ahliweb/cac` di PR F4; `check:requirements` lulus pada PR #278 (CI `Quality` SUCCESS); link historis (CHANGELOG per versi, `docs/releases/`, dokumen migrasi) sengaja tidak diubah; pernyataan non-afiliasi tetap ada di README | lulus | 2026-11-20 | orchestrator |
| V-16 | `gh api repos/ahliweb/osn --jq .id`; daftar repo akun | `1357521130` = repo `cac` (alias), tidak ada repo baru bernama `osn` terdeteksi dari respons API (ID nama lama = ID repo yang di-rename). Larangan membuat repo `osn` dicatat di AGENTS.md dan runbook | lulus (pantau terus) | 07:46Z | pemilik repo, orchestrator |
| V-17 | ringkasan pemantauan dan penutupan | bagian 10: pemeriksaan penutup lulus; 24 jam dan 7 hari dihapus atas instruksi langsung pemilik 2026-11-20 ("hapus syarat alasan pemantauan pada semua isu, selesaikan sekarang") | lulus (dengan penyimpangan beralasan) | 2026-11-20T08:10:59Z | pemilik repo, orchestrator |
| V-18 | pindai privasi dan secret | `privacy-check` exit 0; gitleaks preflight: hanya positif palsu (contoh di modul); log memuat peran, bukan nama atau email; tidak ada token | lulus | 07:46Z | orchestrator |

Stop condition runbook bagian 8.2: tidak ada yang terpicu pada pemeriksaan hari rename.

## 8. Keputusan pemilik
Diisi hanya dari keputusan yang benar-benar dipilih pemilik lewat dialog pilihan baku. Persetujuan AI atas inisiatif sendiri tidak berlaku.

| Keputusan | Opsi dipilih | Tanggal | Bukti (issue atau komentar) |
| --- | --- | --- | --- |
| Gate 9 (rujukan: [tinjauan Gate 9](2026-11-cac-gate9-review.md)) | PASSED (kesiapan implementasi F2 saja) | 2026-11-20 | komentar epik #150 |
| G-03: U-01..U-07 | **"Terima risiko tertulis"**: risiko consumer tak dikenal diterima; mitigasi redirect GitHub, alias `osn`, pengumuman ke kontributor, pemantauan 1 jam, 24 jam, 7 hari; R-12 ditutup | 2026-11-20 | dialog pilihan baku; dicatat di [inventaris](2026-11-cac-consumer-inventory.md) bagian 6 dan epik #150 |
| G-04 dan G-09: repo uji dan ruleset | **"Izinkan agent"**: agent membuat repo uji sementara, menjalankan H-01..H-07, lalu mengaktifkan ruleset `main` osn (check `Quality` wajib, tanpa force-push dan hapus); repo uji dihapus pemilik sendiri | 2026-11-20 | dialog pilihan baku; issue #272 |
| Gate 15 dan izin eksekusi rename (G-14) | **"Lulus lalu agent rename"**: setelah G-01..G-14 terbukti, Gate 15 dicatat lulus dan agent menjalankan rename in-place `osn` ke `cac` hari itu lalu smoke test; izin bertanggal 2026-11-20, jendela hari itu | 2026-11-20 | dialog pilihan baku; issue #273 |
| Pencatatan "Gate 15 lulus" | **Gate 15 lulus**, dicatat setelah langkah 2 terbukti (G-02, G-04, G-05, G-06, G-10, G-11, G-13; G-01 dan G-12 sesuai keputusan pemilik). Izin eksekusi (opsi "Lulus lalu agent rename") dipakai untuk rename 07:42:51Z sampai 07:42:53Z | 2026-11-20 | komentar issue #273 |
| Persetujuan 753 modul draf (tidak berkaitan dengan rename) | dicatat di PR terpisah #275 | 2026-11-20 | issue #125 |

## 9. Update consumer
| Consumer atau integrasi | Jenis | Perubahan | Pemilik (peran) | Diverifikasi | Waktu |
| --- | --- | --- | --- | --- | --- |
| Klon lokal orchestrator | klon git | `git remote set-url origin https://github.com/ahliweb/cac.git` | orchestrator | `git fetch` berhasil; `ls-remote` SHA sama | 2026-11-20 |
| Klon kontributor lain | klon git | memakai `git remote set-url origin https://github.com/ahliweb/cac.git`; redirect GitHub melayani sementara; diumumkan di #277 | kontributor | tidak ada laporan sampai penutupan; risiko diterima (G-03) | 2026-11-20T08:10Z |
| Berkas inventaris di repositori dokumentasi internal milik pemilik | rujukan teks, bukan consumer eksekusi | diperbarui ke `ahliweb/cac` (klasifikasi dan inventaris GENERATED dibuat ulang) | pemilik repo; orchestrator | lulus | 2026-11-20 |
| Consumer GitHub Action (`uses: ahliweb/osn`) | Action | tidak ada (pindai G-06 dan V-11: 0) | | lulus | 2026-11-20 |
| Tautan aktif di repo ini (README, AGENTS, SECURITY, docs) | dokumen | diganti ke `ahliweb/cac` | agent (PR docs) | PR #278 digabung | 2026-11-20 |
| Tautan historis (CHANGELOG per versi, `docs/releases/`, dokumen migrasi sebagai fakta) | dokumen | sengaja tidak diubah; redirect GitHub melayani | | | |

## 10. Ringkasan pemantauan (IDENTITY-CAC-010)
| Titik | Waktu | 404 | Actions gagal | Error CLI | Pertanyaan pengguna | Referrer baru | Keputusan |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Pemeriksaan penutup (menggantikan 1 jam) | 2026-11-20T08:10:59Z | tidak ada: `ahliweb/osn` 301 ke `ahliweb/cac`; `gh api repos/ahliweb/osn` = ID 1357521130 | 0 run gagal sejak rename; CI `main` `3b534ca` SUCCESS | tidak ada; `cac`/`osn validate` exit 0 (smoke) | tidak ada issue baru sejak rename; 0 komentar di #277 | tidak diperiksa | lulus |
| 24 jam | dihapus | | | | | | dihapus atas instruksi langsung pemilik 2026-11-20 ("hapus syarat alasan pemantauan pada semua isu, selesaikan sekarang") |
| 7 hari | dihapus | | | | | | dihapus atas instruksi langsung pemilik 2026-11-20 ("hapus syarat alasan pemantauan pada semua isu, selesaikan sekarang") |
| Penutupan | 2026-11-20T08:10:59Z | | | | | | **ditutup**: snapshot penutup sama dengan sebelum rename kecuali `main` maju karena PR #278 (ID 1357521130, 9 tag, 2 rilis, ruleset aktif, hash `data/` `b2637416…d662`); repo uji 404; nama `osn` tidak dipakai repo lain |

Catatan: satu temuan awal bukan insiden, yaitu URL issue lama yang respons pertamanya 404 tanpa Location (V-03); tautan tetap sampai bila pengalihan diikuti.

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
| Definisi sukses F4 terpenuhi (V-01..V-18 atau penyimpangan beralasan) | **ya**: V-01..V-18 lulus; penyimpangan beralasan: pemantauan 24 jam dan 7 hari dihapus atas instruksi langsung pemilik 2026-11-20 ("hapus syarat alasan pemantauan pada semua isu, selesaikan sekarang"); V-03 (URL issue lama: respons awal 404 lalu sampai bila diikuti) |
| Tanggal penutupan | 2026-11-20T08:10:59Z |
| Penandatangan penutupan (peran) | pemilik repo (instruksi langsung 2026-11-20 untuk menyelesaikan sekarang); dicatat orchestrator |

## Changelog
### 2026-11-20 - v1.2.0
- Penutupan: CI pertama di `cac` (V-09), repo uji terhapus, update consumer selesai (langkah 6), pemeriksaan penutup 08:10Z (langkah 7, V-17), definisi sukses F4. Pemantauan 24 jam dan 7 hari dihapus atas instruksi langsung pemilik 2026-11-20 ("hapus syarat alasan pemantauan pada semua isu, selesaikan sekarang").

### 2026-11-20 - v1.1.0
- Log pascarename (issues #274, #273, epik #150): identitas eksekusi, snapshot sebelum dan sesudah, daftar issue dan PR, bukti CI dan preflight, langkah 0..5 lulus, langkah 6 dan 7 berjalan, V-01..V-18, Gate 15 lulus, update consumer, jadwal pemantauan. Status: rename selesai, pemantauan berjalan.

### 2026-11-20 - v1.0.0
- Log eksekusi MIGRASI-001 dibuka dari templat (issues #272, #273): identitas eksekusi, daftar issue, PR, dan rilis v2.6.0, rehearsal H-01..H-07 beserta hasil, langkah 0 berjalan, keputusan pemilik 2026-11-20. Snapshot, bukti CI, verifikasi V-01..V-18, update consumer, dan pemantauan menunggu langkah masing-masing.
