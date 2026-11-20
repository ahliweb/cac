# Inventaris Consumer dan Integrasi Repo OSN (Persiapan Migrasi ke CaC)

## Metadata
- Version: v1.1.0
- Last updated: 2026-11-20
- Status: **Audit selesai untuk bagian yang dapat diperiksa dari repo dan GitHub (read-only); butir unknown menunggu jawaban pemilik. Rename belum dilakukan.**
- Catatan status 2026-11-20 (pascarename, #274): rename in-place `ahliweb/osn` menjadi `ahliweb/cac` selesai 2026-11-20 (ID repo sama); kalimat "rename belum dilakukan" di dokumen ini adalah keadaan sebelum rename. Bukti: [migration log](2026-11-cac-migration-log.md).
- Issue: #152 (bagian epik #150); memenuhi IDENTITY-CAC-008 dan mendukung IMP-01, IMP-05, IMP-08, IMP-10
- Changeset: Mencatat keputusan pemilik 2026-11-20 atas butir unknown U-01..U-07: risiko diterima tertulis, beserta mitigasi (issues #272, #273, epik #150). Isi audit tidak diubah. Sebelumnya (v1.0.0): menambahkan inventaris consumer, integrasi, dan URL aktif repo `ahliweb/osn` beserta mitigasi dan butir unknown untuk pemilik.
- Konteks: [ADR-0009](../architecture/adr/0009-cac-platform-identity.md), [rencana migrasi](2026-11-osn-to-cac.md), [matriks dampak](2026-11-cac-impact-matrix.md), [IDENTITY-CAC](../requirements/identity-cac.md)
- Snapshot audit: cabang `main` pada commit `3eb5d89`, repo `ahliweb/osn` (publik, ID repo numerik `1357521130`), diperiksa 2026-11-19.

Dokumen ini hanya mencatat apa yang **benar-benar dicek**. Tiap baris memakai salah satu status:
- **observed**: ada bukti (perintah, URL, atau commit);
- **not in use**: dicek dan kosong;
- **unknown**: tidak dapat dicek dari repo/GitHub; butuh jawaban pemilik.

Tidak ada secret, token, email, atau nilai konfigurasi webhook di dokumen ini. Untuk webhook hanya jumlah, kejadian, dan host; untuk secret hanya nama.

## 1. Metode audit (dapat diulang, tanpa secret)
Semua perintah read-only. Jalankan dari akar repo dengan `gh` yang masuk sebagai pemilik repo (izin admin diperlukan untuk hooks, keys, dan secrets).

```bash
R=ahliweb/osn

# 1. Rujukan di repo sendiri
git grep -n -i "ahliweb/osn"                       # semua rujukan; jenis tautan dibedakan di bagian 2
git grep -n "uses:" .github/workflows               # consumer Action eksternal
git grep -n "github.com" -- src tests scripts data package.json
git grep -h -o -E "\bosn (validate|plan|render|report|privacy-check|checklist)" | wc -l
git grep -n -E "img.shields.io|badge" README.md      # badge

# 2. Setelan GitHub (hanya hitungan/nama)
gh repo view $R --json visibility,isFork,forkCount,stargazerCount,homepageUrl,hasWikiEnabled,hasProjectsEnabled,latestRelease
gh api repos/$R --jq '{id, has_pages, forks_count, network_count, subscribers_count}'
gh api repos/$R/pages                                # 404 = Pages tidak aktif
gh api repos/$R/hooks --jq 'length'                  # JANGAN cetak .config
gh api repos/$R/hooks --jq '.[] | {events, active, host: (.config.url|split("/")[2])}'
gh api repos/$R/keys --jq 'length'                   # deploy keys: hitungan saja
gh api repos/$R/environments --jq '{total_count, names: [.environments[].name]}'
gh api repos/$R/releases --jq '.[] | [.tag_name, (.assets|length)] | @tsv'
gh api repos/$R/tags --jq '.[].name'
gh api repos/$R/forks --jq 'length'
gh api repos/$R/branches/main/protection             # 404 = tidak dilindungi
gh api repos/$R/rulesets --jq 'length'
gh secret list -R $R ; gh variable list -R $R ; gh secret list -R $R --app dependabot   # nama saja
gh api repos/$R/actions/workflows --jq '.workflows[] | [.name,.path,.state] | @tsv'
gh api "users/ahliweb/packages?package_type=container" --jq '.[] | [.name, (.repository.full_name // "-")] | @tsv'
gh api repos/$R/traffic/clones --jq '{count, uniques}'
gh api repos/$R/traffic/popular/referrers --jq '[.[] | {referrer, count, uniques}]'
gh api repos/ahliweb/cac --jq .full_name             # 404 = nama target belum dipakai

# 3. Rujukan dari repo lain yang dapat diakses
gh search code "ahliweb/osn" --owner ahliweb --json repository,path,sha --limit 100
gh search code '"ahliweb/osn"' --json repository,path,sha --limit 100
gh search code "uses: ahliweb/osn" --owner ahliweb --json repository,path
gh search issues "ahliweb/osn" --owner ahliweb --json repository,number --limit 30
```

Batas metode: `gh search code` hanya mengindeks cabang bawaan dan tidak menjamin menemukan semua repo privat; lalu lintas clone hanya mencakup 14 hari terakhir; pencarian dijalankan sebagai satu akun GitHub (akun pemilik utama), sehingga repo akun lain tidak tercakup (lihat U-03).

## 2. Ringkasan hasil
| Status | Jumlah baris tabel | Catatan |
| --- | --- | --- |
| observed | 14 | C-01 s.d. C-14 |
| not in use | 16 | N-01 s.d. N-16 (dicek dan kosong) |
| unknown | 7 | U-01 s.d. U-07 (butuh pemilik) |

Baris **High**: C-01, C-02, C-03, U-01 (lihat bagian 5 untuk mitigasi).

## 3. Tabel consumer (observed)
Pemilik: "pemilik repo" bila lokasi ada di repo ini atau akun pemilik; "perlu konfirmasi pemilik" bila bukan.

| ID | Lokasi | Jenis | Criticality | Pemilik | Tindakan sebelum rename | Tindakan sesudah rename | Bukti | Status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| C-01 | Bin `osn` (`package.json` `bin.osn`); 773 kemunculan `osn <perintah>` di 134 berkas (docs 435; src/tests/scripts 327); 513 baris `osn` di `tests/` | Kode, tes, dokumentasi | High | pemilik repo | Tidak ada perubahan pada bin di fase rename; kontrak alias `osn` dipertahankan sesuai ADR-0009/IMP-02 | Verifikasi `osn` dan `cac` setara (lima kasus regresi di matriks dampak) | `git grep -h -o -E "\bosn (validate\|plan\|render\|report\|privacy-check\|checklist)" \| wc -l` = 773; `git grep -l ...` = 134 berkas; `package.json:7-8` | observed |
| C-02 | Rujukan `ahliweb/osn` di sumber (tautan/perintah operasional): `git clone https://github.com/ahliweb/osn.git` (`docs/panduan/mulai-cepat.md:25`); `gh issue list -R ahliweb/osn` (`docs/panduan/guru-sma.md:24`, `docs/panduan/pemilik-peninjau.md:224`, `README.md:139`); tautan `blob/main` untuk siswa (`docs/panduan/siswa.md:139-140`); tautan Issues (`README.md:140`) | Dokumentasi (instruksi pengguna) | High | pemilik repo | Daftar baris yang diubah disiapkan di issue F2 (docs); jangan ubah sebelum Go | Ganti ke `ahliweb/cac` di PR terpisah; jalankan ulang perintah yang tertulis | `git grep -n -i -E "ahliweb/osn(\.git\|/blob\|/issues$)\|-R ahliweb/osn"` | observed |
| C-03 | Klon lokal dan remote git pemilik dan kontributor (`origin` ke `ahliweb/osn`): lalu lintas clone 14 hari terakhir 859 clone, 157 unik | Clone aktif | High | perlu konfirmasi pemilik | Umumkan jadwal rename; siapkan satu baris `git remote set-url origin` untuk kontributor | Tiap kontributor jalankan `git remote -v` dan `git fetch`; redirect GitHub bukan jalur utama | `gh api repos/ahliweb/osn/traffic/clones` (2026-11-19): `{"count":859,"uniques":157}`; jumlah clone lain tidak dapat diatribusikan (CI, Dependabot, agen, pengguna) | observed (penghuni tidak teridentifikasi: lihat U-01) |
| C-04 | `CHANGELOG.md`: 33 baris rujukan, 9 di antaranya tautan `compare/` dan `releases/` per versi | Dokumentasi (riwayat) | Medium | pemilik repo | Tidak diubah; pertahankan sitasi historis (IMP-06) | Verifikasi tautan compare/release lama masih terbuka lewat redirect; baris baru memakai nama baru | `git grep -c "ahliweb/osn" -- CHANGELOG.md` = 33; `git grep -n -E "ahliweb/osn/(compare\|releases)" -- CHANGELOG.md` = 9 | observed |
| C-05 | Tautan issue dan PR `ahliweb/osn/issues/<n>` di dokumen: 103 kemunculan tautan pada 22 berkas (24 di `CHANGELOG.md`, 79 di berkas lain: docs, README, AGENTS.md, SECURITY.md); repo punya 78 issue dan 166 PR (semua status) | Tautan issue/PR | Medium | pemilik repo | Catat `gh issue list`/`gh pr list` jumlah sebelum rename sebagai baseline | Bandingkan jumlah dan buka sampel tautan lama (bukti IMP-01) | `git grep -h -o -i -E "ahliweb/osn[A-Za-z0-9_./#-]*" \| ...` (tautan `issues/<n>` = 103 di 22 berkas, tanpa berkas migrasi, ADR-0009, dan identity-cac); `gh issue list -R ahliweb/osn --state all --limit 500` = 78; `gh pr list ... --state all` = 166 | observed |
| C-06 | Releases dan tag: 1 rilis GitHub `v2.5.0` (0 aset) dan 8 tag `v1.0.0`, `v1.1.0`, `v2.0.0`, `v2.1.0`, `v2.2.0`, `v2.3.0`, `v2.4.0`, `v2.5.0` | Release/tag | Medium | pemilik repo | Catat SHA tag sebagai snapshot rollback (IMP-12) | Verifikasi tag dan rilis terbawa dengan SHA sama | `gh api repos/ahliweb/osn/releases`; `gh api repos/ahliweb/osn/tags` | observed |
| C-07 | CI `.github/workflows/ci.yml`: hanya Action pihak ketiga `actions/checkout@v7` dan `oven-sh/setup-bun@v2`; tidak ada `uses:` ke repo ini, tidak ada `github.repository` di workflow; skrip `package.json` memanggil `src/cli/index.ts` langsung, bukan bin | CI | Low | pemilik repo | Tidak ada; konfirmasi tidak ada rujukan nama repo | Pastikan run CI pertama pasca-rename hijau | `git grep -n "uses:" .github/workflows` (2 baris); `package.json:20-21` | observed |
| C-08 | Dependabot (`.github/dependabot.yml`: ekosistem `bun` dan `github-actions`, `directory: /`) dan workflow dinamis "Dependabot Updates" | CI/otomasi | Low | pemilik repo | Tidak ada | Konfirmasi PR Dependabot masih terbit setelah rename | `gh api repos/ahliweb/osn/actions/workflows` (CI dan Dependabot Updates, keduanya `active`) | observed |
| C-09 | `.github/CODEOWNERS` berisi `* @ahliweb` (akun pengguna, bukan path repo) | Tata kelola | Low | pemilik repo | Tidak ada | Tidak ada | `git grep -n -i ahliweb -- .github` | observed |
| C-10 | Metadata paket: `package.json` `name = kurikulum-informatika`, `bin.osn`; tidak ada bidang `repository`, `homepage`, atau `bugs`; `bun.lock` mengulang nama paket; `private: true` (tidak dipublikasi) | Package metadata | Medium | pemilik repo | Keputusan nama paket di fase F2 (IMP-03) | `bun install --frozen-lockfile`, `bun run build`, `bun test` setelah ganti nama | `git grep -n -E "\"name\"\|\"bin\"\|repository\|homepage\|bugs" package.json` | observed |
| C-11 | Kode, tes, skrip, dan data: tidak ada URL `github.com/ahliweb`; satu-satunya `github.com` di `data/` adalah URL pihak ketiga di `data/sma-coding/modules.json` | Kode/tes/data | Low | pemilik repo | Tidak ada | Tidak ada | `git grep -n "github.com" -- src tests scripts data package.json` (4 baris, semuanya pihak ketiga) | observed |
| C-12 | Rujukan dari repo privat milik pemilik (inventaris portofolio): 6 berkas: inventaris `.md` (commit terakhir berkas `2dc6edd`), ringkasan domain `.md`, klasifikasi `.json`, inventaris `.json` dan `.csv`, serta laporan graf (HEAD cabang bawaan repo itu `8403b35`). Nama repo sengaja tidak ditulis (IMP-11); tersedia dari pemilik | Rujukan lintas-repo | Medium | pemilik repo | Tidak ada | Perbarui indeks inventaris ke nama baru dalam satu sumber kebenaran (IMP-11) | `gh search code "ahliweb/osn" --owner ahliweb` (hasil: 6 berkas di repo privat itu; blob SHA `407ed21d`, `2b5201fc`, `4d073957`, `13dcc6e4`, `156e8853`, `b3cdd1c3`); baris terkonfirmasi lewat `gh api repos/<repo>/contents/<path>` | observed |
| C-13 | Pencarian rujukan tanpa batas pemilik dan untuk `uses: ahliweb/osn`: hanya berkas klasifikasi `.json` (C-12) yang muncul; tidak ada workflow lain yang memakai repo ini sebagai Action | Rujukan lintas-repo | Low | pemilik repo | Tidak ada | Ulangi pencarian setelah rename | `gh search code '"ahliweb/osn"'` (1 hasil), `gh search code "uses: ahliweb/osn" --owner ahliweb` (0 hasil) | observed |
| C-14 | Lalu lintas masuk 14 hari terakhir: perujuk `github.com` (4 tayang, 1 unik) dan `Bing` (3 tayang, 1 unik) menunjukkan tautan publik dan indeks mesin pencari ke URL lama | URL aktif | Low | pemilik repo | Tidak ada | Redirect GitHub menangani tautan lama; pantau indeks | `gh api repos/ahliweb/osn/traffic/popular/referrers` | observed |

Kolom jumlah di C-01 sampai C-05 adalah hasil `git grep` pada commit `3eb5d89` dan akan bergeser seiring commit; yang berlaku adalah hasil ulang perintah di bagian 1.

## 4. Dicek dan kosong (not in use)
Seluruh baris diperiksa 2026-11-19 pada `ahliweb/osn`.

| ID | Item | Hasil | Bukti | Status |
| --- | --- | --- | --- | --- |
| N-01 | GitHub Pages (IMP-10) | Tidak aktif: `has_pages=false`, `homepage` kosong | `gh api repos/ahliweb/osn/pages` -> HTTP 404; `gh api repos/ahliweb/osn --jq .has_pages` | not in use |
| N-02 | Webhook | 0 | `gh api repos/ahliweb/osn/hooks --jq 'length'` = 0 | not in use |
| N-03 | Deploy key | 0 | `gh api repos/ahliweb/osn/keys --jq 'length'` = 0 | not in use |
| N-04 | Environments | 0 | `gh api repos/ahliweb/osn/environments` -> `total_count: 0` | not in use |
| N-05 | Secrets Actions | Tidak ada nama | `gh secret list -R ahliweb/osn` kosong | not in use |
| N-06 | Variabel Actions | Tidak ada | `gh variable list -R ahliweb/osn` kosong | not in use |
| N-07 | Secrets Dependabot | Tidak ada nama | `gh secret list -R ahliweb/osn --app dependabot` kosong | not in use |
| N-08 | Fork dan jaringan fork | 0 fork, `network_count` 0, 0 bintang, 0 pengamat | `gh repo view`, `gh api repos/ahliweb/osn/forks` | not in use |
| N-09 | Paket GitHub Packages terkait repo | 0 dari 13 paket kontainer akun yang menautkan `ahliweb/osn`; 0 paket npm, maven, rubygems, nuget | `gh api "users/ahliweb/packages?package_type=container"` (kolom repo: tidak ada `ahliweb/osn`); jenis lain `length` = 0 | not in use |
| N-10 | Badge di README | Tidak ada | `git grep -n -E "img.shields.io\|badge" README.md` kosong | not in use |
| N-11 | Aset rilis | `v2.5.0` punya 0 aset | `gh api repos/ahliweb/osn/releases` | not in use |
| N-12 | Ruleset repositori | 0 | `gh api repos/ahliweb/osn/rulesets --jq 'length'` = 0 | not in use |
| N-13 | Proteksi cabang `main` | Tidak ada (HTTP 404 "Branch not protected"); jadi tidak ada nama status check wajib yang bergantung pada nama repo, tetapi juga tidak ada penegakan review/gerbang di sisi GitHub (temuan, bukan tindakan di issue ini) | `gh api repos/ahliweb/osn/branches/main/protection` | not in use |
| N-14 | Consumer Action eksternal (`uses: ahliweb/osn`) di repo akun pemilik yang terindeks | 0 | `gh search code "uses: ahliweb/osn" --owner ahliweb` = 0 | not in use |
| N-15 | Paket npm terpublikasi | Tidak ada (`private: true`; `bunx osn` memuat paket lain yang tidak terkait, lihat `docs/panduan/mulai-cepat.md`) | `package.json`; 0 paket npm di akun | not in use |
| N-16 | Nama target `ahliweb/cac` | Belum dipakai (HTTP 404), tidak ada tabrakan nama; GitHub akan menolak rename bila nama sudah ada | `gh api repos/ahliweb/cac` -> 404 | not in use |

Catatan: `gh repo view` menunjukkan `hasWikiEnabled=true` dan `hasProjectsEnabled=true` (setelan bawaan); isi Wiki dan Projects tidak diperiksa isinya di audit ini (lihat U-05).

## 5. Mitigasi untuk setiap risiko High (sebelum rename)
| ID | Risiko | Mitigasi sebelum rename | Penanggung jawab | Bukti penutupan |
| --- | --- | --- | --- | --- |
| C-01 | Perintah `osn` rusak atau berbeda hasil setelah `cac` diperkenalkan; 773 rujukan dan tes subproses bergantung pada nama | Pertahankan `bin.osn` sebagai alias kompatibel (ADR-0009); tes kontrak untuk kedua bin pada lima kasus regresi matriks dampak; rename GitHub tidak menyentuh bin | pemilik repo (implementasi di issue F2) | Tes kontrak hijau; `osn --help` dan `osn validate --program osn` identik dengan baseline |
| C-02 | Instruksi pengguna (`git clone`, `gh -R`, tautan siswa) memakai nama lama dan bergantung pada redirect | Siapkan daftar baris (bagian 3) sebagai PR docs terpisah yang digabung tepat setelah rename; jangan menulis `ahliweb/cac` sebagai instruksi aktif sebelum rename terjadi | pemilik repo | PR docs; setiap perintah dalam dokumen dijalankan ulang (aturan "setiap perintah ada") |
| C-03 | Klon lokal, remote, dan perkakas yang memakai `origin` lama putus atau bergantung pada redirect tanpa sepengetahuan | Umumkan jadwal rename ke kontributor yang dikenal; sediakan `git remote set-url origin <URL baru>` dan `git remote -v`; ambil snapshot `main`, tag, dan jumlah issue/PR sebelum rename (rollback IMP-12); jangan memakai redirect sebagai satu-satunya jalur | pemilik repo (siapa kontributor: lihat U-01) | Kontributor mengonfirmasi `git fetch` berhasil setelah rename; runbook rename mencatat hasil |
| U-01 | Consumer klon/aplikasi di luar repo tidak teridentifikasi (859 clone, 157 unik dalam 14 hari tidak terpetakan) | Pemilik menjawab U-01; rename tidak dijalankan sebelum jawaban dicatat atau pemilik menyatakan risiko diterima secara tertulis | pemilik repo | Jawaban tercatat di issue #152 |

Mitigasi non-High yang disarankan: C-04 dan C-05 (tautan lama dibiarkan sebagai sitasi historis, uji sampel tautan setelah rename); C-06 (catat SHA tag sebelum rename); C-12 (perbarui inventaris portofolio setelah rename).

## 6. Butir unknown yang perlu jawaban pemilik
**Keputusan 2026-11-20 (dialog pilihan baku):** U-01..U-07 **tidak dijawab satu per satu**. Pemilik memilih opsi **"Terima risiko tertulis"**: risiko consumer tak dikenal diterima. Mitigasi: redirect GitHub (terbukti di rehearsal H-01, H-03), alias `osn` (v2.6.0), pengumuman ke kontributor, dan pemantauan pada 1 jam, 24 jam, dan 7 hari setelah rename. Dampak: G-03 lulus dan R-12 ditutup ([keamanan dan recovery](2026-11-cac-security-recovery.md)); V-14 merujuk keputusan ini. Butir tetap berstatus *unknown* dalam arti faktual (tidak ada bukti); bila jawaban masuk kemudian, dicatat sebagai tambahan. Catatan hasil rehearsal: redirect berhenti bila nama lama diambil repo lain (H-06), sehingga larangan membuat repo `osn` dan `cac` menjadi mitigasi inti.

| ID | Pertanyaan | Mengapa tidak dapat dicek | Dampak bila tidak dijawab |
| --- | --- | --- | --- |
| U-01 | Siapa saja kontributor/mesin yang memiliki klon `ahliweb/osn` dan memakainya sebagai `origin`? Adakah pengguna eksternal yang mengunduh/menjalankan CLI `osn` dari repo ini? | Clone lokal orang lain tidak terlihat dari GitHub; lalu lintas clone tidak diatribusikan | High: C-03; menentukan siapa yang harus diberi tahu |
| U-02 | Berapa lama alias `osn` wajib tersedia, dan adakah aplikasi lain yang mengimpor nama paket `kurikulum-informatika`? | Keputusan pemilik; impor privat tidak terindeks | Mempengaruhi F2 (C-01, C-10) |
| U-03 | Adakah repo di akun GitHub lain milik pemilik (akun kedua yang masuk di perangkat yang sama) atau di organisasi yang merujuk `ahliweb/osn`, termasuk repo privat yang tidak terindeks pencarian kode? | Audit dijalankan sebagai satu akun; pencarian kode tidak menjamin repo privat | Rujukan tersembunyi baru terlihat setelah rename |
| U-04 | Adakah integrasi di luar GitHub (CI eksternal, bot, Telegram/chat, dasbor, agen) yang memanggil URL repo ini, atau DNS/domain khusus yang mengarah ke repo? | Di luar jangkauan `gh api`; tidak ada `homepage` di repo | Putus senyap setelah rename |
| U-05 | Apakah Wiki dan Projects (kedua fitur diaktifkan) berisi tautan ke `ahliweb/osn` atau isi yang harus dipindahkan? | Isi Wiki/Projects tidak diperiksa di audit ini | Tautan tertinggal di Wiki/Projects |
| U-06 | Aplikasi GitHub, token pribadi, atau Actions OIDC milik pihak lain yang diberi izin ke repo ini (daftar "installed apps" tidak dapat dibaca lewat izin token yang dipakai audit) | Izin token audit tidak mencakup daftar aplikasi terpasang | Izin bergantung nama repo bisa putus |
| U-07 | Pihak lain yang mengutip URL repo (tautan pada materi pembinaan, grup pesan, dokumen sekolah, situs lain)? Rujukan di luar GitHub hanya terlihat sebagian lewat perujuk lalu lintas (C-14) | Tidak dapat dicari dari GitHub | Tautan lama bergantung pada redirect |

## 7. Catatan untuk pengguna dokumen ini
- Inventaris ini membuktikan **keadaan 2026-11-19**. Ulangi bagian 1 sebelum Go/No-Go dan sesudah rename untuk IDENTITY-CAC-008.
- Ketiadaan hasil pada `not in use` hanya berlaku untuk repo `ahliweb/osn` dan sumber yang bisa dibaca akun audit.
- Tidak ada perubahan setelan GitHub, rename, issue, PR, atau komentar yang dilakukan oleh audit ini.

## Changelog
- v1.1.0 (2026-11-20): Mencatat keputusan pemilik atas U-01..U-07 (opsi "Terima risiko tertulis", mitigasi, R-12 ditutup); isi audit tidak berubah (issues #272, #273).
- v1.0.0 (2026-11-19): Dokumen pertama: metode audit, 14 consumer observed, 16 butir not in use, 7 butir unknown, mitigasi untuk setiap risiko High (issue #152).
