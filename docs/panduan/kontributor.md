# Panduan kontributor

Ringkasan alur kerja untuk siapa pun (manusia atau agent AI) yang mengubah
repositori ini. Sumber aturan yang mengikat: [`AGENTS.md`](../../AGENTS.md)
dan [`CONTRIBUTING.md`](../../CONTRIBUTING.md); dokumen proses ada di
[`docs/development/`](../development/) (`testing.md`, `ci-cd.md`,
`releasing.md`). Halaman ini hanya ringkasan berbahasa Indonesia, bila ada
beda, dokumen-dokumen itulah yang benar. Prasyarat:
[`mulai-cepat.md`](mulai-cepat.md).

## Alur satu issue, satu PR

| Langkah | Yang dikerjakan |
| --- | --- |
| 1. Issue | Baca issue sampai tuntas, termasuk kriteria penerimaan dan ketergantungannya. Satu issue satu PR; jangan melebihi cakupannya. |
| 2. Branch | `<tipe>/<slug-singkat>` dengan tipe `feat/`, `fix/`, `docs/`, `chore/` (mis. `docs/panduan-penggunaan`). |
| 3. Perubahan | Kerjakan dalam cakupan issue. Untuk kurikulum: skema dulu, lalu data (lihat bawah). |
| 4. Tes | Tambah atau perbarui tes di `tests/unit/` dan `tests/integration/`. |
| 5. Verifikasi | Jalankan seluruh daftar periksa di bawah. |
| 6. Dokumen | Perbarui `docs/`, `README.md`, `AGENTS.md` bila perilaku, pemasangan, atau proses berubah. |
| 7. Changeset | Tambahkan bila perubahan terlihat pengguna (lihat bawah). |
| 8. Commit | Format Conventional Commits dan sebut nomor issue, mis. `docs: panduan penggunaan repo per peran (#94)`. |
| 9. PR | Pakai templat PR; tulis `Closes #n`. |
| 10. CI | Semua pemeriksaan wajib harus `SUCCESS` (periksa lewat status, bukan sekadar membaca keluaran). |
| 11. Merge | Hanya setelah CI hijau dan review. Approval manusia yang diwajibkan tidak dilewati. |

## Daftar periksa verifikasi

Semua perintah ini dijalankan dari akar repositori. Semuanya harus exit 0.

```sh
bun run format:check
bun run lint
bun run assist:check
bun run typecheck
bun test
bun run test:coverage
bun run build
bun run validate
bun run privacy-check
bun run check:requirements
bun run check:checklist-fidelity
bun run check:module-code
bun run check:sma-fidelity
bun run check:fidelity
```

| Perintah | Memeriksa | Wajib kapan |
| --- | --- | --- |
| `bun run format:check` | Format kode (Biome, hanya memeriksa). | Selalu. |
| `bun run lint` | Aturan lint Biome. | Selalu. |
| `bun run assist:check` | Urutan impor (tidak tercakup `lint`/`format:check`). | Selalu. |
| `bun run typecheck` | `tsc --noEmit`. | Selalu. |
| `bun test` | Seluruh tes (`2129 pass, 0 fail` per 2026-11-19). | Selalu. |
| `bun run test:coverage` | Tes dengan gerbang cakupan 85% baris/fungsi (`bunfig.toml`). | Selalu (CI menjalankannya). |
| `bun run build` | Membangun `src/index.ts` ke `dist/`. | Selalu. |
| `bun run validate` | Validasi corpus semua program. | Selalu. |
| `bun run privacy-check` | Tidak ada kunci berbentuk data pribadi di `data/`. | Selalu. |
| `bun run check:requirements` | Register kebutuhan dan matriks keterlacakan konsisten. | Bila `docs/requirements/` disentuh. |
| `bun run check:checklist-fidelity` | Data §14.1/§14.2 sama persis dengan silabus sumber. | Bila data atau dokumen itu disentuh. |
| `bun run check:module-code` | Blok `cpp` dan `arduino` di modul lolos `g++ -fsyntax-only` (`arduino` terhadap `Arduino.h` tiruan) dan blok `python` lolos `ast.parse`; hanya sintaks dan tipe, bukan perilaku (`g++` dan `python3` wajib ada). | Bila modul di `content/` berubah. |
| `bun run check:learner-assets` | SVG di `content/<program>/gambar/` dan tautan gambar di `content/<program>/lembar/` sah; judul `# ` ganda di `content/*/modules/*.md` atau `lembar/*.md` adalah galat. | Bila modul, lembar, atau gambar di `content/` berubah. |
| `bun run check:fidelity` | Fidelity semua program yang punya modul fidelity (atau `--program <id>`), lewat tabel program (ADR-0008). | Bila `data/<program>/` atau dokumen sumbernya berubah. |
| `bun run check:sma-fidelity` | `data/sma-coding/` sama sel demi sel dengan `silabus.md`. | Bila `data/sma-coding/` atau silabus itu berubah. |

Contoh keluaran pemeriksaan yang lolos:

```text
$ biome format .
Checked 178 files in 28ms. No fixes applied.

$ bun run scripts/check-requirements.ts
check-requirements: OK — register and traceability matrices are consistent.
```

Pastikan juga setiap perintah dan path yang Anda sebut di dokumen benar-benar
ada: verifikasi, jangan berasumsi. Dependensi: perubahan `package.json` harus
disertai `bun.lock` yang cocok (CI memakai `--frozen-lockfile`).

## Skema dulu, lalu data

Urutan untuk pekerjaan kurikulum, tanpa kecuali:

1. `src/schema/`: definisikan atau perluas skema Zod untuk bentuk data itu.
2. `data/<program>/`: tambahkan data yang lolos skema (program didaftarkan di
   `data/programs.json`).
3. `src/domain/`: logika yang memakai data tervalidasi.
4. `tests/`: tes skema, data, dan domain.

Jangan pernah meng-commit berkas `data/` untuk bentuk yang belum punya skema.

## Konten karangan vs transkripsi

| | Transkripsi | Karangan |
| --- | --- | --- |
| Contoh | `data/osn/*.json`, `data/sma-coding/*.json` | `content/<program>/modules/*.md`, draf silabus di `docs/programs/` |
| Aturan | Disalin setia dari sumber, dalam bahasa Indonesia; tidak dikarang, diterjemahkan, atau "diperbaiki" maknanya. | Boleh ditulis tim dan agent, tetapi selalu berstatus `draf` dan bertanda DRAF sampai manusia menyetujui. |
| Perubahan | Wajib syllabus check dan form `curriculum-change`, plus changeset. | Lewat issue dan review; persetujuan hanya oleh pemilik (lihat [`pemilik-peninjau.md`](pemilik-peninjau.md)). |

Agent AI **tidak pernah** menetapkan `disetujui` atau mencatat persetujuan
yang tidak diberikan pemilik. Draf silabus program tidak mendapat direktori
`data/<program>/` sebelum pemilik menyetujuinya.

## Changeset

Satu berkas Markdown per perubahan yang terlihat pengguna di `.changeset/`:

```sh
bun run changeset
```

Perintah itu interaktif (`changeset v3.0.3`). Anda juga bisa menulis berkasnya
langsung; formatnya seperti ini:

```md
---
"kurikulum-informatika": minor
---

Ringkasan perubahan dalam satu atau dua kalimat.
```

Yang butuh changeset: perubahan data kurikulum, skema, perilaku CLI, dan
dokumentasi yang mengubah makna (bukan salah ketik). Tidak perlu: refaktor
internal, perubahan tes saja, atau konfigurasi CI yang tidak mengubah apa pun
bagi pengguna. Ragu: tambahkan. Kebijakan lengkap dan tingkat kenaikan versi
ada di [`releasing.md`](../development/releasing.md); jangan menyalinnya ke
mana-mana.

## Privasi

- **Jangan pernah** meng-commit data pembelajar nyata (ADR-0004).
- Contoh atau fixture yang mewakili pembelajar harus jelas sintetis dan
  samaran: nama palsu, tanpa sekolah nyata, tanpa pengenal nyata
  (mis. `lr_demo0001`).
- `bun run privacy-check` menjaga `data/` dari kunci seperti `email`, `nisn`,
  `school`. Tidak ada rahasia atau kredensial di repositori.

## Pola orchestrator dan agent

Ringkasan dari bagian "Pedoman Eksekusi Wajib" di `AGENTS.md` (baca aslinya
untuk aturan lengkap dan tabel peran):

- Satu **orchestrator** menganalisis pekerjaan, memecah dan mendelegasikan ke
  agent pelaksana (`.claude/agents/pelaksana-kompleks.md` untuk tugas
  kompleks atau berisiko; `.claude/agents/pelaksana-sederhana.md` untuk tugas
  mekanis berisiko rendah), lalu **memverifikasi sendiri** hasilnya. Laporan
  agent bukan bukti.
- Agent pelaksana tetap dalam cakupannya, tidak mengubah arsitektur, tidak
  mendelegasikan lagi, dan melaporkan temuan di luar cakupan alih-alih
  memperbaikinya.
- Agent paralel hanya bila cakupannya terisolasi (tidak mengubah berkas atau
  modul yang sama).
- Keputusan arsitektur atau trade-off dinilai dulu (kelebihan, kekurangan,
  keamanan, performa, perawatan, dan seterusnya) dengan rekomendasi di depan.
- Keputusan milik pemilik disajikan sebagai dialog pilihan baku; agent tidak
  mengambil keputusan itu dan tidak mencatat persetujuan yang tidak dipilih
  pemilik.
- Dokumentasi harus sama dengan kondisi nyata repositori. Agent tidak
  menyebut repositori pedoman internal; asalnya disebut "standar
  lintas-portofolio internal".

Bila Anda agent: baca `AGENTS.md` sebelum menyunting, kerjakan hanya cakupan
yang diberikan, jalankan daftar periksa di atas, dan jangan commit, push,
atau membuat PR kecuali diminta orchestrator secara eksplisit.

## Mengusulkan perubahan kurikulum

Form **Curriculum change** (`.github/ISSUE_TEMPLATE/curriculum-change.yml`)
mencatat sumber resmi yang dicek, tanggalnya, apa yang berubah, dan dampak
changelog. Rinciannya di [`pemilik-peninjau.md`](pemilik-peninjau.md) dan
`CONTRIBUTING.md`.

## Bacaan lanjut

- [`CONTRIBUTING.md`](../../CONTRIBUTING.md): penamaan branch, konvensi commit, ekspektasi review.
- [`docs/development/testing.md`](../development/testing.md): strategi tes dan gerbang cakupan.
- [`docs/development/ci-cd.md`](../development/ci-cd.md): apa yang dijalankan CI.
- [`docs/development/releasing.md`](../development/releasing.md): changeset, versi, rilis.
- [`docs/cli/README.md`](../cli/README.md): referensi lengkap perintah `osn`.
- [`docs/governance/privacy.md`](../governance/privacy.md): kebijakan privasi.
