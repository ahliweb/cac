# Panduan mentor pembinaan OSN

Untuk mentor yang menjalankan kohort pembinaan OSN Informatika 28 minggu
(program `osn`). Prasyarat: [`mulai-cepat.md`](mulai-cepat.md) selesai dan
`bun run validate` exit 0. Di halaman ini `osn <perintah>` berarti
`bun run src/cli/index.ts <perintah>`.

Siklus kerja lengkap (awal kohort, mingguan, kontes-postmortem-upsolve,
tinjauan bulanan) ada di [`docs/operations/runbook.md`](../operations/runbook.md).
Panduan ini adalah versi "perintah apa untuk keperluan apa".

## Ringkasan: saya ingin ... jalankan ...

| Saya ingin | Perintah |
| --- | --- |
| Memastikan data kurikulum utuh sebelum kohort | `bun run validate` dan `bun run privacy-check` |
| Daftar periksa kesiapan kohort dan aturan operasional | `osn checklist` |
| Kalender 28 minggu bertanggal | `osn plan --start <YYYY-MM-DD> --exclude <tanggal,...>` |
| Rencana sesi satu minggu | `osn render weekly --week <1-28>` |
| Lembar checkpoint satu gerbang | `osn render checkpoint --number <1-7>` |
| Kartu SOP satu halaman | `osn render sop` |
| Lembar belajar untuk siswa | `osn render lembar-siswa --week <1-28>` |
| Modul materi untuk siswa | `osn render modul --id <id-modul>` |
| Laporan KPI dari catatan belajar | `osn report --records <berkas>` |
| Menyimpan hasil ke berkas | tambahkan `--out <berkas>` (dan `--force` untuk menimpa) |

## Sebelum kohort mulai

```sh
bun run validate
bun run privacy-check
osn checklist
```

`osn checklist` mencetak versi corpus, status pemeriksaan silabus terakhir,
delapan butir kesiapan (§14.1), delapan aturan operasional (§14.2), dan
penunjuk cepat mentor. Cuplikan nyata:

```text
# osn checklist: cohort readiness & operational rules

Corpus version: 2.0 (2026-09-04)

## Syllabus-check status (§14.2 rule 8)

Latest check: 2026-11-18 -- outcome: no-change.
Sources checked: R1, R2, R3, R7, R8.
Days since last check (as of 2026-11-18): 0.

## Cohort readiness checklist (§14.1)

1. **Verifikasi silabus resmi OSN dan halaman OSN-K/OSN-P terbaru.** (`verify-official-syllabus`)
...
```

Perhatikan baris "Days since last check": angka itu dihitung dari tanggal
hari ini (UTC), jadi akan bertambah seiring waktu. Entri 2026-09-05 di
repositori hanya mencatat asal transkripsi. Entri 2026-11-18 adalah
pemeriksaan langsung ke R1, R2, R3, R7, dan R8 yang dikerjakan agent AI atas
nama pemilik; isi catatannya (apa yang dibandingkan dan apa yang tidak) ada di
`data/osn/syllabus-check-log.json`. Sebelum kohort baru, ulangi pemeriksaan
silabus mengikuti
[`docs/operations/syllabus-check.md`](../operations/syllabus-check.md).
Jangan memulai Minggu 1 selagi ada butir §14.1 yang belum terpenuhi.

## Kalender kohort: `plan`

```sh
osn plan --start 2027-01-11 --exclude 2027-01-13,2027-03-10 --target-stage osn-k
```

```text
# osn plan: cohort calendar

Start date: 2027-01-11
Excluded dates (2): 2027-01-13, 2027-03-10
Target stage: osn-k
Projected end date: 2027-07-27 (un-excluded baseline: 2027-07-25)

Target stage "osn-k" (OSN-K): intensive preparation lands on week 25, 2027-06-30 to 2027-07-06. §4 places OSN-K intensive preparation at week 25.

| Week | Start | End | Focus | Sessions | Mini-contest | Checkpoint | Gate evidence |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 2027-01-11 | 2027-01-18 | Orientasi CP & C++ dasar | 2027-01-11, 2027-01-15 | no | - | - |
...
```

- `--start` wajib (format `YYYY-MM-DD`). Tanpa itu: exit 2.
- `--exclude` berisi tanggal libur atau ujian sekolah, dipisah koma. Tanggal
  yang dikecualikan menggeser minggu-minggu berikutnya (hari itu tidak
  dihitung sebagai hari efektif). Aturan lengkap: `docs/cli/README.md`.
- `--target-stage` salah satu dari `osn-k`, `osn-p`, `osn-nasional`,
  `toki-ioi-extension`; menampilkan minggu persiapan intensif tahap itu.
- Keluaran sama untuk masukan sama, di mesin mana pun.
- Bentuk JSON: tambahkan `--json` (atau `--format json`).

Tinjau kalender terhadap kalender sekolah dan jadwal seleksi nyata sebelum
menganggapnya final.

## Rencana sesi mingguan: `render weekly`

```sh
osn render weekly --week 4
```

```text
# Week 4: Search/sort dasar & recursion

Topic families: search-sort, rekursi

## Content
- Linear/binary search
- bubble/insertion
- recursion
- call stack
- prefix sum support.

## Outcome
Memahami invariant sederhana, rekursi dasar, dan binary search.

## Practice / evaluation target
8-12 soal + Checkpoint 1.
...
## Session templates (§5.1)

### Session 1 -- konsep & guided practice

| Minutes | Activity |
| --- | --- |
| 0-15 | Retrieval quiz topik lama; 2-3 pertanyaan constraint/complexity. |
...
## SOP reminder (§5.2)
...
## Hint policy ladder (§5.3)
1. pertanyaan pemodelan
2. arah complexity
3. observasi kunci
4. pseudocode parsial -- requires a hint-free re-solve at the next interval
5. editorial -- requires a hint-free re-solve at the next interval

## Gate evidence (§4.1, checkpoint 1)
...
```

Isinya: fokus, materi, capaian, target latihan, dua templat sesi 120 menit,
tiket keluar, pengingat SOP tujuh langkah, tangga hint, dan (hanya pada
minggu gerbang) bukti gerbang. Minggu di luar 1-28 ditolak:

```text
$ osn render weekly --week 29
osn render weekly: renderWeeklyPlan: week 29 is out of range. Valid range: 1-28.
```

(exit 2.) Cetak atau bagikan rencana ini apa adanya: semua mentor memakai
rubrik dan kebijakan hint yang sama (runbook §2).

## Lembar checkpoint: `render checkpoint`

Pada minggu gerbang (4, 8, 12, 16, 20, 24, 28), selain rencana mingguan:

```sh
osn render checkpoint --number 1
```

Berisi bukti gerbang, bobot rubrik (§6.1), kisi pencatatan A/B/C/D (§6.2),
dan kolom KPI (§6.3). Nomor 1-7; `--number 8` exit 2.

```text
## A/B/C/D recording grid (§6.2)
| Code | Meaning | Follow-up action |
| --- | --- | --- |
| A | Solved independently | Review singkat; tandai pola transfer. |
| B | Solved after hint | Re-solve 3-7 hari tanpa hint. |
| C | Solved after editorial/solution | Wajib reimplement + jelaskan invariant/state + re-solve terjadwal. |
| D | Unsolved/blocked | Diagnosis gap: konsep, modeling, complexity, implementation, debugging. |
```

## Kartu SOP: `render sop`

```sh
osn render sop
```

Satu halaman: SOP tujuh langkah (§5.2), daftar uji minimal, empat
pertanyaan setelah Accepted, dan tangga hint. Tanpa opsi tambahan.

## Lembar belajar siswa: `render lembar-siswa`

```sh
osn render lembar-siswa --week 4
```

Lembar berbahasa Indonesia yang diturunkan hanya dari corpus: cakupan
materi, capaian, rumpun materi, target latihan, bukti gerbang (bila ada),
kebijakan hint, **daftar periksa mandiri berisi kotak kosong**, rujukan, dan
sumber silabus. Tidak ada isian nama atau sekolah (ADR-0004). Panduan untuk
siswa ada di [`siswa.md`](siswa.md).

## Modul materi: `render modul`

Modul adalah bahan belajar karangan tim (bukan salinan silabus), satu per
rumpun materi. Ada 10 modul untuk program `osn`:

| `--id` | Judul | Minggu | Status |
| --- | --- | --- | --- |
| `dasar-pemrograman` | Dasar Pemrograman dengan C++ | 1, 2 | disetujui (2026-11-18) |
| `logika-bitwise` | Logika dan Bitwise | 3, 10, 16, 25 | disetujui (2026-11-18) |
| `aritmetika` | Aritmetika dan Teori Bilangan Dasar | 9, 10 | disetujui (2026-11-18) |
| `aturan-berhitung` | Aturan Berhitung | 11, 12 | disetujui (2026-11-18) |
| `rekursi` | Rekursi | 4, 5, 6 | disetujui (2026-11-18) |
| `search-sort` | Search dan Sort | 4, 5 | disetujui (2026-11-18) |
| `strategi-problem-solving` | Strategi Problem Solving | 3, 6, 7, 8, 13-16, 26-28 | disetujui (2026-11-18) |
| `struktur-data` | Struktur Data untuk OSN Informatika | 2, 8, 20-23, 27 | disetujui (2026-11-18) |
| `graph-tree` | Graph dan Tree untuk OSN Informatika | 17-20, 22, 27 | disetujui (2026-11-18) |
| `geometri-dasar` | Geometri Dasar untuk OSN Informatika | 24 | disetujui (2026-11-18) |

Daftar di atas dari `data/osn/modules.json`; status bisa berubah setelah
panduan ini ditulis, jadi periksa berkas itu atau jalankan `render modul`
dan lihat spanduknya.

```sh
osn render modul --id rekursi
```

```text
# Rekursi

## Untuk siapa modul ini
...
## Rujukan
- R1: Silabus OSN Informatika 2026 <https://osn.toki.id/silabus>

---
Status modul: disetujui.
Program: Silabus Operasional Pembinaan OSN Informatika 2026 (osn).
Disetujui pada 2026-11-18 oleh peninjau dengan peran: pemilik program.
```

**Arti spanduk.** Modul yang bukan `disetujui` selalu diawali spanduk:
`DRAF — belum ditinjau.` (belum ada manusia yang meninjau),
`DRAF — sedang ditinjau, belum disetujui.`, atau `DITARIK — jangan dipakai.`
Modul `disetujui` tidak berspanduk dan diakhiri tanggal serta peran
peninjau, seperti contoh di atas.

Sebagai mentor, jangan membagikan modul `draf` ke siswa tanpa menyebutkan
statusnya, dan periksa isinya lebih dulu. Id yang salah ditolak dengan daftar
id yang dikenal (exit 2):

```text
osn render modul: unknown module "tidak-ada". Known modules: dasar-pemrograman, logika-bitwise, aritmetika, ...
```

## Menyimpan ke berkas: `--out` dan `--force`

Semua `osn render ...` dan `osn checklist` serta `osn report` menerima
`--out <berkas>`. Tanpa itu, hasil dicetak ke layar.

```sh
osn render weekly --week 4 --out minggu-04.md
```

```text
osn render weekly: wrote minggu-04.md
```

Menjalankannya lagi tidak menimpa berkas (supaya lembar yang sudah Anda
edit tidak hilang):

```text
osn render weekly: --out "minggu-04.md" already exists. Use --force to overwrite it.
```

(exit 2.) Tambahkan `--force` bila memang ingin menimpa:
`osn render weekly --week 4 --out minggu-04.md --force`.

`--json` (keluaran JSON) bekerja untuk `validate`, `plan`, `report`,
`checklist`, dan `privacy-check`. Untuk `render` opsi itu tidak mengubah
apa pun: hasilnya tetap Markdown.

## Laporan KPI: `report`

`osn report` menghitung tujuh metrik KPI (§6.3), rincian taksonomi kesalahan
untuk postmortem, dan jadwal re-solve dari **berkas catatan belajar**
(`.jsonl`, satu catatan per baris, atau `.json` berupa larik).

> **Data siswa nyata tidak pernah masuk repositori ini.** Berkas catatan
> milik kohort Anda disimpan di luar repositori, di sistem milik
> penyelenggara. Repositori hanya menyertakan berkas **sampel sintetis**.
> Siswa di sampel hanya berupa kode samaran (`lr_demo0001` dst.) dan soal
> palsu (`demo-problem-001` dst.).

Contoh memakai sampel sintetis:

```sh
osn report --records data/osn/samples/learning-records.sample.jsonl
```

```text
# osn report: mentor KPI dashboard

Generated from 58 learning record(s), grouped by "none".
§6.3 caveat: every metric below must be read alongside "Jumlah soal bukan satu-satunya KPI; mastery dan transfer lebih penting."

## overall (58 record(s))

### A/B/C/D per topic
...
| Topic | Total | A | B | C | D |
| --- | --- | --- | --- | --- | --- |
| unresolved | 58 | 23 (39.7%) | 11 (19.0%) | 11 (19.0%) | 13 (22.4%) |
...
```

Satu catatan sampel (sintetis) terlihat seperti ini:

```json
{"learnerRef":"lr_demo0001","problemId":"demo-problem-001","attemptNo":1,"verdict":"WA","durationSeconds":400,"hintLevelUsed":1,"usedEditorial":false,"errorTaxonomy":"conceptual","status":"B","resolveStatus":"completed","recordedAt":"2026-01-01T10:00:00Z"}
```

Hal yang perlu diketahui:

- **Penjaga privasi.** Bila ada kunci berbentuk pengenal pribadi (`email`,
  `nisn`, `school`, dan sebagainya) di catatan mana pun, seluruh berkas
  ditolak (exit 1). Pesan hanya menyebut jalur kunci dan nomor catatan,
  tidak pernah nilainya:

  ```text
  osn report: privacy refusal: 1 field(s) shaped like a direct or indirect personal identifier were found (see ADR-0004). Refusing to process "rekaman-salah.jsonl". Values are never logged -- only field paths and record indices are shown below. Remove or rename these fields in the source data and re-run:
    - [index 0] (root): key "email"
  ```

- `--by topic` dan `--by week` adalah batas yang didokumentasikan: selalu
  berhenti dengan exit 2, karena catatan belajar tidak membawa rumpun materi
  maupun nomor minggu. Pesan galatnya menjelaskan alasannya dan alternatifnya:
  jalankan tanpa `--by` (sama dengan `--by none`) untuk laporan keseluruhan,
  atau keluarkan `--format json` lalu kelompokkan per rumpun atau minggu di
  luar CLI.
- `--format json` (atau `--json`) untuk keluaran mesin; `--out`/`--force` seperti di atas.
- Baca laporan sebagai sinyal penguasaan dan transfer, bukan papan skor jumlah
  soal (peringatan itu dicetak di setiap laporan).

Untuk siklus kontes, postmortem, dan upsolve yang memakai laporan ini, lihat
runbook bagian 3 dan 4.

## Bila Anda mengelola program SMA

Perintah di atas hanya untuk program `osn`, kecuali `plan` dan
`render lembar-siswa` (yang untuk `sma-coding` memakai `--track` dan kode
minggu) serta `render modul`. `render weekly`, `render checkpoint`,
`render sop`, `report`, dan `checklist` dengan `--program sma-coding` ditolak
(exit 2). Lihat [`guru-sma.md`](guru-sma.md).
