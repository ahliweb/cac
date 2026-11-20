# Audit Keamanan, Perubahan GitHub, dan Strategi Recovery Rename (osn ke cac)

## Metadata
- Version: v1.1.0
- Last updated: 2026-11-20
- Status: **Hanya dokumentasi; rename repository belum dilakukan dan tidak dilakukan oleh dokumen ini.** Diperbarui 2026-11-20 dengan hasil rehearsal H-01..H-07 dan keputusan pemilik lanjutan (bagian 4.4 dan 7).
- Catatan status 2026-11-20 (pascarename, #274): rename in-place `ahliweb/osn` menjadi `ahliweb/cac` selesai 2026-11-20 (ID repo sama); kalimat "rename belum dilakukan" di dokumen ini adalah keadaan sebelum rename. Bukti: [migration log](2026-11-cac-migration-log.md).
- Issue: #155 (turunan epik #150, fase F1); mendukung IDENTITY-CAC-007, -008, -009, -010 dan IMP-05 s.d. IMP-12
- Changeset: Menambahkan hasil rehearsal H-01..H-07 (2026-11-20) dan koreksi H-02 (bagian 4.3 dan 4.4), implikasi untuk 5.2, keputusan P-05 (agent boleh membuat repo uji), penutupan R-12 dan catatan checklist bagian 6 (issues #272, #273, epik #150). Sebelumnya (v1.0.0): menambahkan inventaris kontrol repo (read-only), matriks risiko, hasil gladi recovery lokal, prosedur recovery vs rename-back, dan checklist Go/No-Go beserta butir keputusan pemilik. Tidak mengubah kode, paket, CLI, data, atau setelan GitHub.
- Konteks: [ADR-0009](../architecture/adr/0009-cac-platform-identity.md), [rencana migrasi](2026-11-osn-to-cac.md) (bagian 7 dan 8), [matriks dampak](2026-11-cac-impact-matrix.md), [IDENTITY-CAC](../requirements/identity-cac.md), [kontrak CLI](2026-11-cac-cli-contract.md), [inventaris consumer](2026-11-cac-consumer-inventory.md), [invariants](2026-11-cac-invariants.md), [keamanan](../governance/security.md), [insiden](../governance/incident-response.md).
- Snapshot: repo `ahliweb/osn`, cabang `main` pada commit `e7e1e52`, diperiksa 2026-11-19.

Status keyakinan memakai tiga label: **observed** (dijalankan dan dilihat hasilnya), **dokumen resmi** (dibaca di docs.github.com pada 2026-11-19), dan **[belum terverifikasi]** (dugaan atau perilaku yang tidak terbukti oleh dokumen yang dibuka). Tidak ada secret, token, email, atau data pribadi di dokumen ini; secret hanya dicek namanya (hasilnya kosong).

## 1. Metode
1. Inventaris kontrol repo lewat `gh api` **read-only** (bagian 2). Tidak ada nilai secret yang dibaca atau ditulis; tidak ada setelan GitHub yang diubah.
2. Baca dokumentasi resmi GitHub tentang rename (bagian 2.2). Hanya halaman "Renaming a repository" yang dibuka; perilaku yang tidak ada di halaman itu ditandai [belum terverifikasi].
3. Matriks risiko (bagian 3): likelihood x impact. Aturan tingkat: **High** bila impact Tinggi dan likelihood Sedang atau Tinggi, atau likelihood Tinggi dan impact Sedang atau lebih; **Low** bila keduanya Rendah, atau satu Rendah dan satu Sedang; sisanya **Medium**. Likelihood dan impact adalah penilaian penulis, bukan angka terukur.
4. Gladi recovery **lokal** di folder scratch, tanpa menyentuh GitHub (bagian 4). Hal yang hanya bisa diuji di GitHub sungguhan dicatat sebagai "perlu rehearsal pemilik di repo uji".
5. Prosedur dan checklist (bagian 5 dan 6).

Hasil F1/01 (consumer) dan F1/03 (invariants) dipakai sebagai masukan dan tidak diulang; lihat [inventaris consumer](2026-11-cac-consumer-inventory.md) untuk C-01 s.d. C-14, N-01 s.d. N-16, dan U-01 s.d. U-07.

## 2. Inventaris kontrol repo (observed, 2026-11-19)

### 2.1 Setelan dan kontrol
| Kontrol | Hasil | Perintah (read-only) | Catatan risiko |
| --- | --- | --- | --- |
| Repo | publik, ID numerik `1357521130`, tidak diarsipkan, 0 fork | `gh api repos/ahliweb/osn --jq '{id,visibility,archived,forks_count}'` | ID dipakai sebagai bukti rename in-place (bagian 5) |
| Cabang | 3: `main`, `docs/cac-consumer-inventory`, `docs/cac-invariants` (cabang kerja F1/01 dan F1/03; ketiganya `protected=false`) | `gh api "repos/ahliweb/osn/branches?per_page=100"` | Cabang kerja ikut terbawa rename |
| Proteksi `main` | **Tidak ada**: HTTP 404 "Branch not protected" | `gh api repos/ahliweb/osn/branches/main/protection` | R-01 |
| Ruleset | **0**; aturan efektif untuk `main`: 0 | `gh api repos/ahliweb/osn/rulesets --jq length`; `gh api repos/ahliweb/osn/rules/branches/main --jq length` | R-01 |
| Kolaborator | 1 orang, peran `admin` (hanya jumlah dan peran yang dibaca) | `gh api "repos/ahliweb/osn/collaborators?per_page=100" --jq '[.[]\|.role_name]\|group_by(.)\|map({role:.[0],n:length})'` | Satu admin: R-13 |
| Setelan merge | merge commit, squash, rebase semuanya diizinkan; `delete_branch_on_merge=false`; auto-merge mati | `gh api repos/ahliweb/osn --jq '{allow_merge_commit,allow_squash_merge,allow_rebase_merge,delete_branch_on_merge,allow_auto_merge}'` | Tidak menghalangi rename |
| Actions | aktif; `allowed_actions=all`; `sha_pinning_required=false`; token bawaan `default_workflow_permissions=read`; `can_approve_pull_request_reviews=false` | `gh api repos/ahliweb/osn/actions/permissions`; `.../actions/permissions/workflow` | Least-privilege sudah baik; pin SHA tidak diwajibkan (RISK-05 di [security.md](../governance/security.md)) |
| Workflow | `CI` (job `Quality`) dan "Dependabot Updates" (dinamis), keduanya aktif; tidak ada `uses:` ke `ahliweb/*` | `gh api repos/ahliweb/osn/actions/workflows`; `grep -rn -E 'uses:[[:space:]]*ahliweb/' .github` (exit 1, tidak ada) | Consumer Action internal: tidak ada |
| Check pada `main` | satu check-run bernama `Quality` (pada saat dibaca berstatus `in_progress`, belum ada `conclusion`) | `gh api repos/ahliweb/osn/commits/main/check-runs --jq '.check_runs[]\|[.name,.status,.conclusion]\|@tsv'` | Nama check tidak memuat nama repo (R-19); status akhir harus dibaca ulang saat freeze |
| Release dan tag | 1 rilis `v2.5.0` (bukan draft/prerelease), 8 tag | `gh api repos/ahliweb/osn/releases`; `gh api "repos/ahliweb/osn/tags?per_page=100" --jq length` | Snapshot SHA tag wajib sebelum rename (R-18) |
| Secret dan variabel Actions | **tidak ada nama** (secret Actions, variabel); secret Dependabot juga kosong menurut F1/01 | `gh secret list -R ahliweb/osn`; `gh variable list -R ahliweb/osn` | Tidak ada secret yang perlu dirotasi karena rename |
| Pages, webhook, deploy key, environment | semuanya 0 / tidak aktif (F1/01 N-01 s.d. N-04) | lihat F1/01 | R-07 (cek ulang saat freeze) |
| PR dan issue terbuka | 2 PR, 9 issue | `gh pr list -R ahliweb/osn --state open --json number --jq length`; `gh issue list ... --jq length` | Freeze (R-14) |
| Nama target | `ahliweb/cac` belum dipakai (HTTP 404) | `gh api repos/ahliweb/cac` | Cek ulang saat eksekusi |

**Temuan utama:** `main` tidak punya proteksi maupun ruleset, dan hanya ada satu admin. Gerbang kualitas saat ini ditegakkan oleh disiplin proses ([AGENTS.md](../../AGENTS.md)) dan CI yang tidak wajib, bukan oleh GitHub. Sebelum rename, `main` adalah satu-satunya jalur yang menentukan SHA snapshot recovery; push tak terkontrol ke `main` pada jendela rename mengaburkan titik pemulihan.

### 2.2 Dokumentasi resmi GitHub (dibuka 2026-11-19)
Sumber: "Renaming a repository", <https://docs.github.com/en/repositories/creating-and-managing-repositories/renaming-a-repository>. Isi di bawah adalah apa yang dibaca dari halaman itu (kutipan pendek); tidak ada klaim lain yang diambil dari halaman lain.

| Topik | Yang dinyatakan dokumen | Konsekuensi untuk migrasi |
| --- | --- | --- |
| Lalu lintas web | "is automatically redirected to the new name"; pengecualian: URL situs project (Pages) | Tautan issue/PR/dokumen lama tetap terbuka (diuji sampel saat F4) |
| Operasi git | perintah ke lokasi lama "will continue to function as if made on the new location" | `git fetch`/`push` klon lama tetap jalan; tetap ganti `origin` |
| GitHub Actions | "GitHub will not redirect calls to an action hosted by a renamed repository"; workflow pemakai gagal dengan `repository not found` | **Dikoreksi oleh H-02 (2026-11-20):** dalam rehearsal, `uses:` ke repo yang di-rename tetap sukses (Actions mengikuti redirect); kegagalan hanya muncul bila nama lama diambil repo lain (H-06). Tetap ubah `uses:` ke nama baru; per F1/01 tidak ditemukan consumer, repo privat tak terindeks (U-03, risiko diterima 2026-11-20) |
| GitHub Pages | terdampak kecuali memakai domain kustom | Pages tidak aktif (N-01) |
| Webhook | halaman **tidak menyebut** webhook | Perilaku redirect webhook **[belum terverifikasi]**; webhook 0 saat ini |
| Issue, wiki, bintang, pengikut | dinyatakan ikut dialihkan; PR **tidak disebut** | PR ikut atau tidak: **[belum terverifikasi]** dari halaman ini; F1/01 mencatat 166 PR untuk dibandingkan sebelum/sesudah |
| Memakai ulang nama lama | "do not reuse the original name of the renamed repository"; bila dipakai, "redirects to the renamed repository will no longer work" | R-03 |
| Klon lokal | "we strongly recommend updating any existing local clones to point to the new repository URL" | Prosedur bagian 5.3 |

Belum terbukti dari dokumen yang dibuka (semua **[belum terverifikasi]** pada 2026-11-19; sebagian besar kini terjawab oleh rehearsal 2026-11-20, bagian 4.4): redirect untuk API REST dan `gh`; redirect SSH; apakah ruleset/proteksi cabang bertahan melewati rename; perilaku redirect saat repo di-rename **balik**; batas waktu redirect; dampak ke `uses:` reusable workflow dan ke referensi `github.repository` di workflow (repo ini tidak memakainya). Semua itu dijadikan butir rehearsal di repo uji (bagian 4.3).

## 3. Matriks risiko
Skala: R = Rendah, S = Sedang, T = Tinggi. "Owner" adalah peran; di repo ini pemilik repository memegang semua peran operasional (satu admin), sehingga owner juga mencerminkan siapa yang harus bertindak.

| ID | Risiko | L | I | Tingkat | Owner | Control / mitigasi | Deteksi |
| --- | --- | --- | --- | --- | --- | --- | --- |
| R-01 | `main` tanpa proteksi/ruleset: push atau merge tak terkontrol sebelum, selama, atau sesudah rename mengubah SHA yang dipakai sebagai titik pemulihan; gerbang check tidak ditegakkan GitHub | T | T | **High** | Pemilik repo | Freeze perubahan (bagian 6, G-04); catat SHA `main` dan tag di snapshot; keputusan pemilik mengaktifkan ruleset sebelum freeze (butir P-01); proteksi dengan satu admin tidak mencegah admin sendiri, sehingga freeze tetap disiplin | `gh api repos/ahliweb/osn/branches/main/protection` (404 = belum); bandingkan `git ls-remote origin main` dengan SHA snapshot |
| R-02 | Consumer `uses: ahliweb/osn/...` putus (anggapan awal: `repository not found` karena Actions tidak diredirect; **H-02 membantah**: Actions mengikuti redirect, gagal hanya bila nama lama diambil repo lain) | R | T | Medium | Pemilik repo | `grep` di repo (0), `gh search code "uses: ahliweb/osn"` (0, F1/01 N-14); jawab U-03 untuk repo privat/akun lain; bila ada, ubah consumer **sebelum** rename (PR 4 F2) | Gerbang pindai G-06; CI consumer merah dengan `repository not found` |
| R-03 | Repo baru bernama `osn` dibuat (sengaja atau tidak) sehingga redirect `osn` ke `cac` putus; `git fetch` klon lama bisa tersambung ke repo yang berbeda | R | T | Medium | Pemilik repo | Larangan tertulis membuat repo `ahliweb/osn` selama masa alias (ADR-0009, runbook bagian 7); deteksi lewat uji ID repo dan SHA root (4.2 D) | `gh api repos/ahliweb/osn --jq .id` harus `1357521130` setelah rename; SHA `main` dan SHA root cocok dengan snapshot |
| R-04 | Klon lokal dan remote tidak tahu nama baru; mengandalkan redirect; 859 clone, 157 unik dalam 14 hari tidak teridentifikasi | T | R | Medium | Pemilik repo; kontributor | `git remote set-url origin <URL baru>` (diuji 4.2 B); umumkan jadwal; jangan jadikan redirect satu-satunya jalur (runbook bagian 3 F4) | `git fetch` gagal/peringatan; hasil konfirmasi kontributor; lalu lintas clone |
| R-05 | Alias `osn` hilang atau berbeda hasil/exit code setelah `cac` diperkenalkan (773 rujukan, tes subproses) | S | T | **High** | Pemilik repo (implementasi F2) | Satu core dispatch, dua entri; tes kontrak CLI-C-01..C-12 ([kontrak CLI](2026-11-cac-cli-contract.md)); alias dihapus hanya di MAJOR; gladi 4.2 F mendemonstrasikan exit 0/1/2 setara dan 127 bila alias hilang | Tes kontrak merah; `osn validate` exit 127 atau berbeda dari baseline |
| R-06 | Metadata paket (`name`, `bun.lock`, `packageInfo`) berubah dan memecah impor/tes; paket private, tanpa `repository`/`homepage` | R | S | Low | Pemilik repo | Keputusan nama paket di F2 (IMP-03); `bun install --frozen-lockfile`, `bun run build`, `bun test`; U-02 untuk pengimpor luar | CI merah; `bun install --frozen-lockfile` gagal |
| R-07 | Pages atau webhook baru muncul setelah audit dan putus karena rename (URL project Pages tidak diredirect; perilaku redirect webhook tidak terdokumentasi di halaman yang dibaca) | R | S | Low | Pemilik repo | Pages 0, webhook 0, deploy key 0 (F1/01); ulangi saat freeze (G-02); jangan menambah integrasi selama masa rencana | `gh api repos/ahliweb/osn/pages` (404), `.../hooks --jq length` (0) |
| R-08 | Tautan dokumen memakai nama lama: 103 tautan issue/PR di 22 berkas, instruksi `git clone`/`gh -R`, tautan siswa; bergantung pada redirect | T | R | Medium | Pemilik repo | PR docs terpisah yang digabung setelah rename (F1/01 C-02); sitasi historis dibiarkan (IMP-06); tidak menulis nama baru sebagai instruksi aktif sebelum rename | link checker; jalankan ulang perintah yang tertulis di dokumen; sampel tautan lama |
| R-09 | Privasi dan non-afiliasi: nama `cac` ambigu (singkatan lain), OSN tampak menjadi nama platform atau program seolah resmi; nama baru muncul di indeks mesin pencari | S | S | Medium | Pemilik repo | Deskripsi repo dan README tegas "independen, bukan materi resmi Puspresnas / IA TOKI / IOI"; ID program `osn` dipertahankan; `bun run privacy-check` tetap 0 temuan; tidak ada data pembelajar ditambahkan (ADR-0004) | `bun run privacy-check`; tinjau README/deskripsi repo sesudah rename |
| R-10 | Riwayat issue/PR/tag hilang atau terpecah (hanya bila membuat repo baru atau salah prosedur; rename in-place semestinya menjaga) | R | T | Medium | Pemilik repo | Rename **in-place**, bukan repo baru (ADR-0009, opsi ditolak); snapshot jumlah issue (78), PR (166), tag (8), rilis (1) sebelum dan sesudah; ID repo sama | Bandingkan jumlah dan ID repo sebelum/sesudah |
| R-11 | Rename-balik tidak bisa memulihkan keadaan semula (nama lama dipakai, redirect ambigu, perilaku rename-balik tak terdokumentasi di halaman yang dibaca) | S | S | Medium | Pemilik repo | Recovery maju sebagai default; rename-balik hanya bila kriteria 5.2 terpenuhi; rehearsal rename-balik di repo uji (4.3); jangan menjadikan redirect satu-satunya rollback (runbook bagian 3 F4) | Setelah rename-balik: `.id` sama, `git fetch` dari kedua URL, jumlah issue/PR sama |
| R-12 | Inventaris tidak lengkap: U-01 s.d. U-07 belum dijawab; rename berjalan dengan consumer tak dikenal. **DITUTUP 2026-11-20**: pemilik menerima risiko tertulis (opsi "Terima risiko tertulis"); risiko residual tetap ada dan dimitigasi redirect, alias `osn`, pengumuman, pemantauan | S | T | **High** (ditutup) | Pemilik repo | Rename tidak dijalankan sebelum jawaban dicatat atau pemilik menyatakan risiko diterima tertulis (G-03); ulangi bagian 1 F1/01 saat freeze | Jawaban U-xx tercatat di issue #152; hasil ulang perintah audit |
| R-13 | Satu admin tunggal: bila akun bermasalah atau tidak tersedia pada jendela rename, tidak ada orang lain yang dapat memulihkan atau mengizinkan | R | T | Medium | Pemilik repo | Jadwalkan rename saat pemilik tersedia penuh; tidak ada jendela rename di luar ketersediaan; catat pelaksana dan cadangan (butir P-04); persetujuan AI tidak menggantikan pemilik | Pemilik tidak merespons pada langkah G-xx: stop condition |
| R-14 | Perubahan berjalan saat rename: 2 PR dan 9 issue terbuka, cabang kerja, worktree agen; PR bisa merge ke `main` di tengah rename | S | S | Medium | Pemilik repo | Freeze besar sementara (runbook bagian 3 F3); tidak ada agen merge/release selama jendela; kunci rilis dicatat | `gh pr list --state open`; SHA `main` berubah |
| R-15 | Token pribadi, aplikasi GitHub, atau OIDC pihak lain yang terikat nama repo putus; daftar aplikasi terpasang tidak terbaca (U-06) | R | S | Low | Pemilik repo | Secret Actions/variabel kosong (tidak ada yang dirotasi); pemilik memeriksa aplikasi terpasang secara manual (U-06) | Kegagalan otentikasi pasca-rename |
| R-16 | Wiki/Projects (aktif) memuat tautan ke nama lama (U-05) | R | R | Low | Pemilik repo | Periksa isi sebelum rename; Wiki dinyatakan ikut dialihkan oleh dokumen resmi | tinjau manual |
| R-17 | Indeks mesin pencari dan perujuk lama (Bing, `github.com`; F1/01 C-14) masih menunjuk nama lama | T | R | Medium | Pemilik repo | Biarkan redirect; perbarui tautan aktif; pantau 404 (runbook F4) | `gh api repos/ahliweb/cac/traffic/popular/referrers` pasca-rename |
| R-18 | Titik pemulihan hilang: SHA tag dan `main` tidak dicatat sebelum rename | R | S | Low | Pemilik repo | Snapshot SHA `main`, 8 tag, rilis, jumlah issue/PR di G-05; salin ke berkas bukti | berkas snapshot ada dan cocok |
| R-19 | Nama check wajib berubah bila proteksi/ruleset diaktifkan: check `Quality` tidak memuat nama repo, tetapi perilaku proteksi setelah rename belum terbukti | R | S | Low | Pemilik repo | Aktifkan proteksi dengan nama check `Quality`; uji di repo uji (4.3); periksa ulang pasca-rename | `gh api repos/ahliweb/cac/branches/main/protection` |

**Ringkasan:** 19 risiko; **High 3** (R-01, R-05, R-12); **Medium 10** (R-02, R-03, R-04, R-08, R-09, R-10, R-11, R-13, R-14, R-17); **Low 6** (R-06, R-07, R-15, R-16, R-18, R-19). Semua High memiliki mitigasi dan jalur recovery tercatat; R-01 dan R-12 membutuhkan keputusan atau jawaban pemilik (bagian 7) sebelum Go.

Pemetaan ke IMP: IMP-05 (R-02), IMP-06 (R-08), IMP-07 (R-05), IMP-08 (R-04, R-12), IMP-09 (R-01, R-09, R-15), IMP-10 (R-07), IMP-11 (di luar lingkup dokumen ini; inventaris portofolio internal), IMP-12 (R-10, R-11, R-18).

## 4. Simulasi dan gladi lokal (tanpa GitHub)

### 4.1 Pengaturan
Semua dijalankan oleh skrip shell sementara di folder scratch (`.../scratchpad/f104/scripts/rehearsal.sh`, di luar repo; ringkasan perintah di bawah memakai `$W` sebagai folder kerja). "Remote" adalah repo bare lokal `$W/remote/ahliweb/osn.git`; rename disimulasikan dengan `mv`; redirect GitHub disimulasikan dengan symlink nama lama ke nama baru. **Simulasi ini hanya membuktikan perilaku git dan prosedur kita sendiri**, bukan perilaku GitHub. Konfigurasi git global dimatikan dan identitas commit sintetis (`drill@example.invalid`). Tidak ada repo GitHub dibuat, tidak ada jaringan dipakai. Eksekusi: 2026-11-19, 31 perintah bernomor, skrip selesai dengan exit 0.

### 4.2 Hasil (perintah dan exit code)
SHA berikut berasal dari satu eksekusi dan berubah tiap eksekusi (commit baru tiap kali); yang penting adalah relasinya.

| Skenario | Perintah (ringkas) | Exit | Kesimpulan |
| --- | --- | --- | --- |
| A. Basis | `git init -q --bare -b main $W/remote/ahliweb/osn.git`; push 2 commit dan 2 tag; `git clone` ke `clone1`; `git remote get-url origin` | 0 | `main` = `8937841...` (SHA snapshot) |
| B. Rename + redirect | `mv .../osn.git .../cac.git`; `ln -s cac.git .../osn.git` | 0, 0 | Rename simulasi |
| B | `git -C clone1 fetch origin` (URL lama, lewat redirect) | 0 | Klon lama tetap jalan selama redirect ada |
| B | `git -C clone1 ls-remote origin main` | 0 | SHA sama dengan snapshot |
| B | `git -C clone1 remote set-url origin $W/remote/ahliweb/cac.git`; `fetch`; `remote -v` | 0, 0 | Perbaikan klon satu baris berhasil |
| B | `diff snap-before.txt snap-after.txt` (daftar ref `main`+tag sebelum dan sesudah) | 0 | Ref dan SHA identik: pembanding bukti pasca-rename |
| C. Redirect hilang | `rm .../osn.git` (symlink); `git -C clone2 fetch origin` | **128** | `fatal: ... does not appear to be a git repository`: kegagalan terdeteksi dan jelas |
| C | `git -C clone2 remote set-url origin .../cac.git && git -C clone2 fetch origin` | 0 | Recovery klon berhasil tanpa mengandalkan redirect |
| D. Nama lama dipakai repo lain | buat repo bare lain di `.../osn.git` berisi 1 commit berbeda; `git -C clone3 fetch origin; git -C clone3 ls-remote origin main` | 0 | **`fetch` tidak gagal**: `+ 8937841...530bf2e main -> origin/main (forced update)`; berbahaya bila tidak diperiksa |
| D (deteksi 1) | `[ "$(git ls-remote origin refs/heads/main \| cut -f1)" = "<SHA snapshot>" ]` | 1 | SHA `main` berbeda = repo salah |
| D (deteksi 2) | `git merge-base --is-ancestor <SHA snapshot> origin/main` | 1 | Riwayat tidak memuat snapshot |
| D (deteksi 3) | bandingkan `git rev-list --max-parents=0 origin/main` dengan SHA root snapshot | 1 | SHA root berbeda |
| E. Rename-balik | `mv .../cac.git .../osn.git`; `git -C clone1 fetch origin` (masih URL `cac`) | 0, **128** | Klon yang sudah dipindah ke `cac` putus setelah rename-balik (tanpa redirect baru) |
| E | `git -C clone1 remote set-url origin .../osn.git && fetch && git rev-parse origin/main` | 0 | Pemulihan klon sukses; SHA kembali `8937841...` |
| F. Alias CLI tiruan | `cac validate`, `osn validate` | 0, 0 | Setara |
| F | `cac validate --fail`, `osn validate --fail` | 1, 1 | Exit validasi setara |
| F | `cac nope`, `osn nope` | 2, 2 | Exit usage setara |
| F | `diff <(cac validate) <(osn validate)` | 0 | Keluaran JSON identik (nama pemanggil hanya di stderr) |
| F | `rm $W/bin/osn`; `osn validate` | **127** | Alias hilang: `command not found`; kegagalan nyata bila alias dihapus terlalu cepat |
| G. Pindai consumer | `grep -rn -E 'uses:[[:space:]]*ahliweb/osn' $W/fx/.github` (fixture sintetis berisi `uses:`) | 0 | Pemindai menemukan consumer (positif palsu terbukti bekerja) |
| G | `grep -rn -E 'uses:[[:space:]]*ahliweb/osn' <repo>/.github`; `grep -rn -E 'uses:[[:space:]]*ahliweb/' <repo>/.github` | 1, 1 | Repo ini tidak memiliki consumer Action internal (1 = tidak ada kecocokan) |

Pelajaran (gladi lokal; **dikonfirmasi oleh H-06 di GitHub sungguhan, 2026-11-20**, lihat 4.4): (1) kegagalan redirect hilang terlihat jelas (exit 128); (2) **kegagalan terburuk adalah nama lama dipakai ulang, karena `fetch` tetap exit 0**, sehingga gerbang pasca-rename harus membandingkan SHA `main`, SHA root, dan ID repo, bukan hanya exit code; (3) rename-balik memutus klon yang sudah dipindah ke nama baru, sehingga setiap rename mewajibkan komunikasi ulang ke kontributor; (4) alias CLI setara hanya bila ada satu core; dihapus berarti exit 127.

### 4.3 Rencana rehearsal di repo uji (dijalankan 2026-11-20, hasil di 4.4)
Bagian berikut tidak bisa dibuktikan secara lokal. Rencana awal (2026-11-19): pemilik menguji di repo uji sementara miliknya sendiri. Keputusan pemilik 2026-11-20 (P-05): agent membuat repo uji dan menjalankan H-01..H-07, pemilik menghapusnya. Tabel di bawah adalah rencana pengujian; **kolom H-02 memuat hipotesis awal yang telah dikoreksi**:

| # | Hal yang diuji | Cara (di repo uji) | Bukti yang dicatat |
| --- | --- | --- | --- |
| H-01 | Redirect web, `git` HTTPS, `git` SSH, `gh api` setelah rename | rename repo uji lewat Settings; `git ls-remote`/`git fetch`/`gh api repos/<lama>` | exit code dan HTTP status masing-masing |
| H-02 | Hipotesis awal: Actions `uses:` ke repo yang di-rename gagal `repository not found`. **Dikoreksi:** tetap sukses; gagal hanya bila nama lama dipakai repo lain (4.4) | repo uji kedua memanggil action dari repo uji pertama sebelum dan sesudah rename | log run, tanggal |
| H-03 | Webhook tetap/putus; PR ikut dialihkan | webhook ke penerima tes sintetis; 1 PR terbuka | pengiriman terakhir; PR dapat dibuka dari URL lama |
| H-04 | Proteksi cabang/ruleset bertahan melewati rename; nama check wajib tetap | aktifkan ruleset dengan check `Quality`, rename, baca ulang | `gh api` sebelum/sesudah |
| H-05 | Rename-balik: redirect dan ID repo; apa yang terjadi pada klon dan pada nama yang tidak ada | rename balik repo uji | ID repo, hasil fetch dari kedua URL |
| H-06 | Apa yang terjadi bila repo baru dibuat dengan nama lama (R-03) | buat repo uji ketiga dengan nama lama | redirect putus atau tidak; hasil `gh api` |
| H-07 | Pages (URL project) setelah rename | Pages uji aktif | HTTP status URL lama dan baru |

### 4.4 Hasil rehearsal H-01..H-07 (2026-11-20, GitHub sungguhan)
Dijalankan agent 2026-11-20, 06:36 s.d. 06:51 UTC, atas keputusan pemilik (opsi "Izinkan agent"), pada repo uji publik sementara `ahliweb/cac-gladi-a` (di-rename ke `cac-gladi-a2`, ID 1465074607), consumer `ahliweb/cac-gladi-b`, dan repo baru bernama lama `ahliweb/cac-gladi-a` (ID 1465084137, untuk H-06). Tidak ada perubahan pada `ahliweb/osn`. Bukti lengkap dengan waktu UTC: [migration log](2026-11-cac-migration-log.md) bagian 5 dan issue #272.

| # | Hasil | Rename-balik tidak aman? |
| --- | --- | --- |
| H-01 | Redirect web dan API REST 301; `git ls-remote`/`fetch` HTTPS dan SSH dan `gh api` exit 0 ke nama lama dan baru | Tidak |
| H-02 | `uses:` (action root dan sub-path) tetap **sukses** setelah rename: log run me-resolve SHA yang sama. **Hipotesis "gagal `repository not found`" tidak terbukti.** Reusable workflow tidak diuji | Tidak |
| H-03 | Webhook bertahan (ID sama, aktif) dan terpicu (payload memuat nama baru); PR tetap terbuka; URL lama 301 | Tidak |
| H-04 | Ruleset (non_fast_forward, deletion, required_status_checks `Quality`) identik sebelum dan sesudah rename; force-push ke `main` ditolak lewat URL lama dan baru; hapus `main` ditolak | Tidak |
| H-05 | Rename-balik: ID repo sama, fetch dari kedua nama berhasil, klon tetap jalan, ruleset/webhook/PR utuh (hanya rename-balik langsung, bukan setelah 24 jam) | Tidak, selama nama lama tidak diambil |
| H-06 | Setelah nama lama dipakai repo baru: redirect **berhenti**; `git ls-remote`/`fetch` ke nama lama exit 0 tetapi mengembalikan SHA repo asing (forced update diam-diam); `gh api` mengembalikan ID baru; consumer Action gagal `Can't find 'action.yml'`; ruleset dan webhook tidak ikut | **Ya** |
| H-07 | Pages: URL lama 404 seketika (tanpa redirect Pages), URL baru 200; osn tidak memakai Pages | Tidak, tetapi tautan publik putus |

Tidak teruji: reusable workflow, GHCR/paket, batas waktu redirect (hanya menit), rename-balik setelah jendela 24 jam, pengiriman webhook ke penerima nyata, ruleset dengan bypass actor atau review wajib, redirect setelah repo lama dihapus, setelan khusus osn (jumlah issue, tag, rilis, Environments).

**Implikasi:**
1. **Bagian 5.2:** larangan membuat repo bernama `osn` atau `cac` (R-03, R-11) kini **terbukti kritis**, bukan lagi dugaan: H-06 menunjukkan `fetch` tetap exit 0 ke repo asing. Verifikasi pascarename dan setelahnya **wajib** membandingkan SHA `main`, SHA root, dan ID repo, bukan hanya exit code.
2. **Koreksi 5.2:** baris "Consumer Actions gagal `repository not found`" menjadi gejala yang hanya muncul bila nama lama sudah diambil (atau `uses:` memakai nama yang tidak ada); pada rename biasa consumer Action tetap jalan lewat redirect. Langkah mengubah `uses:` ke nama baru tetap dilakukan, bukan karena kegagalan pasti.
3. **Pelajaran 4.2:** pelajaran (2) dan (3) dikonfirmasi oleh H-06 dan H-05.
4. **Ruleset (H-04)** aman diaktifkan sebelum rename (P-01 opsi a).
5. Bila `osn` kelak memakai Pages atau tautan `*.github.io/osn`: tautan lama putus saat rename (H-07).

## 5. Prosedur recovery dan rename-back

### 5.1 Sebelum rename (prasyarat recovery)
1. Snapshot (G-05): `main` SHA, 8 tag (nama dan SHA), rilis, jumlah issue/PR, ID repo `1357521130`, daftar cabang, output audit bagian 2, di berkas bukti di luar repo publik tanpa secret.
2. Pembanding pasca-rename sudah siap: skrip yang membandingkan ref, jumlah, ID repo (dasar: 4.2 B dan D).
3. Komunikasi kontributor dan perintah `git remote set-url` siap.

### 5.2 Keputusan: recovery maju vs rename-balik
Default: **recovery maju** (perbaiki sumber, ubah consumer, ubah `origin`), karena rename-balik sendiri adalah rename kedua dengan risiko R-03/R-11 dan memutus semua yang sudah dipindah (4.2 E).

| Gejala setelah rename | Keputusan | Langkah |
| --- | --- | --- |
| Tautan lama 404 sebagian, link dokumen salah | Recovery maju | Perbaiki tautan di sumber; uji redirect |
| Consumer Actions gagal (H-02: pada rename biasa tidak gagal; gagal `Can't find 'action.yml'` atau `repository not found` bila nama lama diambil repo lain atau salah ketik) | Recovery maju | Periksa dahulu ID repo dan SHA `main` nama lama (H-06); ubah `uses:` ke `ahliweb/cac`; jalankan ulang |
| Klon/CI memakai `origin` lama gagal | Recovery maju | `git remote set-url origin <URL baru>`; `git fetch` |
| Alias `osn` gagal atau berbeda | Recovery maju (rilis hotfix kompatibilitas, runbook bagian 7) | Perbaiki entri, tes kontrak |
| Kegagalan kritikal yang tidak bisa diperbaiki maju (mis. integrasi inti tak bisa dipindah, CI tidak bisa hijau) dan semua kriteria "aman" di bawah terpenuhi | Rename-balik atas persetujuan pemilik | Rename `cac` ke `osn` di Settings; kemudian prosedur 5.4 |

**Rename-balik aman bila SEMUA terpenuhi** (usulan; angka waktu butuh keputusan pemilik P-03):
- ID repo masih `1357521130` dan tidak ada repo lain bernama `osn` atau `cac` di akun yang dibuat sejak rename;
- belum ada consumer eksternal yang dipindahkan permanen ke URL `cac` (mis. `uses: ahliweb/cac`, tautan di materi pembinaan) atau perpindahan itu bisa dikembalikan;
- jendela sejak rename masih pendek (usulan: dalam 24 jam) dan tidak ada rilis/tag baru atas nama `cac`;
- freeze masih berlaku, `main` SHA = snapshot atau perubahan sesudahnya sudah dicatat dan tidak bergantung pada nama;
- perilaku rename-balik sudah diuji di repo uji (H-05) dan hasilnya dapat diterima;
- pemilik (admin) hadir dan menyetujui; tidak ada insiden SEV-1/SEV-2 terbuka yang membutuhkan nama `cac`.

**Rename-balik TIDAK aman (stop; hanya recovery maju) bila SALAH SATU:**
- repo baru bernama `osn` atau `cac` sudah dibuat oleh siapa pun (R-03, R-11; terbukti H-06: redirect berhenti dan `fetch` diam-diam mengambil repo asing);
- ID repo tidak lagi `1357521130` (indikasi repo berbeda/dipindah);
- rename-balik belum pernah diuji di repo uji, sehingga akibat terhadap redirect tidak diketahui;
- consumer sudah dipindah ke `cac` dan tidak bisa dikembalikan, atau sudah ada rilis/tag baru;
- sudah lewat jendela aman dan kontributor sudah mengganti `origin` (rename-balik akan memutus mereka lagi; 4.2 E);
- pemilik tidak tersedia.

### 5.3 Recovery klon (diuji 4.2 B, C, E)
```bash
git remote -v                                   # lihat origin
git remote set-url origin https://github.com/ahliweb/cac.git
git fetch origin                                # harus exit 0
git ls-remote origin refs/heads/main            # bandingkan dengan SHA snapshot
```
Bila `fetch` exit 0 tetapi SHA `main` atau SHA root tidak cocok dengan snapshot: **berhenti**, jangan `pull`/`push`; kemungkinan nama dipakai repo lain (4.2 D).

### 5.4 Prosedur rename-balik dan pemulihan pasca-rename-balik
1. Pemilik menyetujui secara tertulis; ingat bahwa persetujuan AI tidak berlaku.
2. Admin merename `cac` kembali ke `osn` (Settings, General).
3. Verifikasi: `gh api repos/ahliweb/osn --jq .id` = `1357521130`; `git ls-remote` ke URL `osn` sama dengan SHA snapshot; jumlah issue/PR/tag/rilis sama.
4. Kontributor yang telah memindahkan `origin` menjalankan `git remote set-url origin <URL osn>` (4.2 E).
5. Kembalikan perubahan docs/consumer yang sudah memakai `cac` lewat PR; tag dan rilis dicek ulang.
6. Catat insiden dan pelajaran sesuai [incident-response.md](../governance/incident-response.md) (kelas SEV ditentukan oleh insiden; rename-balik sendiri bukan SEV).

### 5.5 Stop condition umum
Hentikan rollout (lanjut hanya setelah pemilik menilai ulang) bila: `git fetch` ke URL baru tidak exit 0; SHA `main` berbeda dari snapshot tanpa penjelasan; ID repo berubah; jumlah issue/PR/tag/rilis berbeda; CI pertama di `cac` merah; consumer Action gagal; alias `osn` berbeda dari baseline; muncul indikasi data pribadi/secret.

## 6. Checklist Go/No-Go
Semua butir harus **terbukti** (perintah/bukti dicatat); satu butir tidak terbukti berarti **No-Go** ([rencana migrasi](2026-11-osn-to-cac.md), bagian 8). Persetujuan nama (ADR-0009) bukan Go operasional. Rename tidak dilakukan oleh dokumen ini.

| # | Butir | Owner | Bukti | Stop condition |
| --- | --- | --- | --- | --- |
| G-01 | ADR-0009, spesifikasi, dan dokumen F1 (consumer, CLI, invariants, keamanan) sudah ditinjau; Gate 9 tercatat | Pemilik repo | catatan review; issue #150 | Ada dokumen F1 yang belum ditinjau |
| G-02 | Audit ulang read-only (bagian 2 dan F1/01 bagian 1) pada hari freeze: Pages/webhook/keys/environments/secrets tetap kosong; tidak ada consumer baru | Pemilik repo; verifikasi Opus | keluaran perintah bertanggal | Ada integrasi baru yang belum tercatat |
| G-03 | U-01 s.d. U-07 dijawab, atau pemilik menerima risikonya secara tertulis; R-12 ditutup | Pemilik repo | jawaban di issue #152 | Ada unknown tanpa keputusan |
| G-04 | Freeze: tidak ada PR/merge/rilis berjalan; PR terbuka dihitung; kunci rilis tercatat; keputusan P-01 (ruleset `main`) dicatat | Pemilik repo | `gh pr list`; catatan kunci rilis | Ada merge selama jendela; kunci dipegang pihak lain |
| G-05 | Snapshot recovery tersimpan: `main` SHA, 8 tag, rilis, jumlah issue (78)/PR (166), ID repo, daftar cabang | Pemilik repo; verifikasi Opus | berkas bukti (tanpa secret) | Snapshot tidak lengkap atau tidak cocok dengan keadaan saat ini |
| G-06 | Pindai consumer Action: `grep -rn -E 'uses:[[:space:]]*ahliweb/osn' .github` kosong, `gh search code "uses: ahliweb/osn" --owner ahliweb` 0, dan consumer di repo privat/akun lain dicek (U-03) | Pemilik repo | exit code dan hasil | Ada consumer yang belum diubah |
| G-07 | Alias legacy dan canonical lulus tes kontrak dan CI **di `main`** (CLI-C-01..C-12) | Pemilik repo (F2) | URL run CI, SHA | Tes kontrak merah atau belum ada |
| G-08 | Invariants F1/03 lulus: `git diff --stat -- data/ src/schema/ src/domain/` kosong untuk PR identitas; hash korpus dan ID program tak berubah | Pemilik repo; verifikasi Opus | keluaran perintah | Diff data tak terencana |
| G-09 | Rehearsal di repo uji (H-01 s.d. H-07) selesai, termasuk rename-balik; hasil dan sisa risiko dicatat | Pemilik repo | catatan hasil per butir | Rehearsal belum dijalankan, atau hasil H-05/H-06 membuat rename-balik tidak aman |
| G-10 | Nama `ahliweb/cac` tersedia (404) dan admin permission diverifikasi saat eksekusi | Admin repo | `gh api repos/ahliweb/cac` 404; peran `admin` | Nama sudah dipakai; izin admin tidak ada |
| G-11 | Komunikasi ke kontributor dan penerima tautan (U-01, U-07) terkirim; perintah `set-url` siap | Pemilik repo | catatan pengumuman | Pengumuman belum dikirim |
| G-12 | Keputusan recovery vs rename-balik dan kriteria "aman" (5.2) disetujui, termasuk jendela (P-03); pemilik admin dan cadangan tersedia selama jendela (P-04) | Pemilik repo | keputusan tercatat | Kriteria belum diputuskan; pemilik tidak tersedia |
| G-13 | Check wajib dalam keadaan `SUCCESS` (diperiksa lewat status, bukan output yang disalurkan) dan tidak ada blocker P0/P1; Gate 15 dinyatakan lulus | Pemilik repo (Gate 15 tindakan pemilik sendiri) | status check; catatan Gate 15 | Check tidak `SUCCESS`; ada blocker |
| G-14 | Izin eksekusi rename diberikan pemilik secara eksplisit dan terpisah dari persetujuan nama | Pemilik repo | catatan izin | Tidak ada izin eksplisit |

Catatan 2026-11-20: G-03 lulus (risiko diterima tertulis, R-12 ditutup), G-09 lulus (rehearsal 4.4, dengan sisa risiko tidak teruji), G-07 dan G-08 lulus (F2 terbit v2.6.0; diff data/schema/domain 0 berkas), G-14 diberikan (opsi "Lulus lalu agent rename"); butir lain dijalankan saat freeze dan preflight. Status per butir yang berlaku: [runbook](2026-11-osn-to-cac.md) bagian 9 dan [migration log](2026-11-cac-migration-log.md). Kolom "Owner" di atas adalah peran semula; pelaksana rename dan ruleset kini agent atas izin pemilik (bagian 7).

Setelah rename (F4), verifikasi minimal: `gh api repos/ahliweb/cac --jq .id` = `1357521130`; `git ls-remote` URL baru = SHA snapshot; jumlah issue/PR/tag/rilis sama; CI pertama hijau; `osn` dan `cac` lulus lima kasus regresi; ulangi G-06; periksa 4.2 D (SHA root) untuk URL lama.

## 7. Butir untuk pemilik
Keputusan berikut milik pemilik; agen tidak memutuskan atau mencatatnya sebagai disetujui. Orchestrator yang menyajikannya.

| ID | Pertanyaan | Opsi dan penilaian ringkas | Rekomendasi penulis |
| --- | --- | --- | --- |
| P-01 | Aktifkan ruleset/proteksi `main` (check wajib `Quality`) sebelum freeze? (R-01) | (a) Aktifkan sebelum rename: keamanan dan kendali naik; satu admin berarti review wajib sulit, jadi mulai dengan check wajib dan larangan force-push/hapus; perilaku setelah rename harus diuji (H-04). (b) Tunda sampai setelah rename: lebih sederhana, tetapi R-01 tetap High selama jendela. (c) Tidak aktifkan: tidak ada kontrol sama sekali. | (a), diuji di repo uji lebih dulu |
| P-02 | Jawab U-01 s.d. U-07 ([inventaris consumer](2026-11-cac-consumer-inventory.md), bagian 6), terutama repo privat/akun lain dan aplikasi terpasang | Jawab semua; atau terima risiko tertulis per butir | Jawab sebelum G-03 (rekomendasi awal). **Diputuskan 2026-11-20: opsi "Terima risiko tertulis"** untuk U-01..U-07; R-12 ditutup |
| P-03 | Jendela rename-balik aman (usulan 24 jam) dan siapa yang menyetujuinya | 24 jam; lebih lama (lebih banyak perpindahan yang harus dikembalikan); tanpa rename-balik (hanya maju) | 24 jam, dengan pengumuman bahwa rename-balik juga memutus klon |
| P-04 | Cadangan bila admin tunggal tidak tersedia (R-13) | Jadwalkan hanya saat pemilik tersedia; tambah admin cadangan (kontrol akses naik; permukaan serangan naik); tunda | Jadwalkan hanya saat tersedia; tidak menambah admin sebelum keputusan terpisah |
| P-05 | Repo uji sementara untuk rehearsal H-01 s.d. H-07 | Pemilik membuat dan menghapus sendiri; atau melewatkan rehearsal (maka butir bertanda [belum terverifikasi] tetap tidak terbukti dan G-09 gagal) | Buat dan jalankan; agen tidak membuat repo apa pun (rekomendasi awal 2026-11-19). **Diputuskan 2026-11-20: opsi "Izinkan agent"**: agent membuat repo uji dan menjalankan H-01..H-07, lalu mengaktifkan ruleset `main`; pemilik menghapus repo uji sendiri (token agent tanpa `delete_repo`). Rekomendasi awal digantikan oleh keputusan ini |
| P-06 | Larangan tertulis membuat repo `ahliweb/osn` selama masa alias | Setujui sebagai aturan operasional; atau tidak | Setujui |

## 8. Rujukan
- GitHub Docs, Renaming a repository (dibuka 2026-11-19): <https://docs.github.com/en/repositories/creating-and-managing-repositories/renaming-a-repository>
- [ADR-0009](../architecture/adr/0009-cac-platform-identity.md); [rencana migrasi](2026-11-osn-to-cac.md) bagian 7 dan 8; [matriks dampak](2026-11-cac-impact-matrix.md) IMP-05..12; [IDENTITY-CAC](../requirements/identity-cac.md) 007..010.
- [Kontrak CLI](2026-11-cac-cli-contract.md) (F1/02); [inventaris consumer](2026-11-cac-consumer-inventory.md) (F1/01); [invariants](2026-11-cac-invariants.md) (F1/03).
- [security.md](../governance/security.md), [incident-response.md](../governance/incident-response.md), [releasing.md](../development/releasing.md).

## Changelog
### 2026-11-20 - v1.1.0
- Hasil rehearsal H-01..H-07 di GitHub sungguhan (bagian 4.4, issues #272 dan #273): koreksi H-02 (Actions mengikuti redirect, hipotesis `repository not found` tidak terbukti) di 2.2, R-02, 4.3, dan 5.2; H-06 mengonfirmasi R-03 dan R-11 (larangan nama lama kini terbukti kritis; verifikasi wajib membandingkan SHA `main` dan ID repo); R-12 ditutup oleh risiko diterima tertulis; P-02 dan P-05 diputuskan pemilik 2026-11-20 (agent boleh membuat repo uji, mengaktifkan ruleset, dan menjalankan rename atas izin); catatan status checklist bagian 6.

### 2026-11-19 - v1.0.0
- Dokumen pertama (issue #155): inventaris kontrol repo read-only, 19 risiko (3 High, 10 Medium, 6 Low), gladi lokal 31 perintah, prosedur recovery vs rename-back, checklist Go/No-Go 14 butir, 6 butir keputusan pemilik.
