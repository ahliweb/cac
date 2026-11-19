# Panduan pemilik program dan peninjau

Untuk pemilik program dan peninjau yang ditunjuknya: meninjau konten
karangan, memutuskan, dan merilis. Dasar aturannya:
[ADR-0007](../architecture/adr/0007-authored-learning-content.md) (konten
karangan dan siklus ulasnya) serta ADR-0006 (banyak program). Di halaman ini
`osn <perintah>` berarti `bun run src/cli/index.ts <perintah>`.

## Dua jenis konten, dua aturan

| Jenis | Contoh | Aturan |
| --- | --- | --- |
| Transkripsi | `data/osn/*.json` (dari PDF silabus OSN), `data/<program>/*.json` (disalin setia dari `silabus.md` program yang sudah Anda setujui), lembar belajar yang diturunkan dari corpus | Disalin setia dari sumber. Berubah hanya lewat syllabus check dan form `curriculum-change` (OSN) atau revisi silabus yang Anda setujui (program coding); `bun run check:fidelity` memeriksa data terhadap silabusnya. |
| Karangan | Modul di `content/<program>/modules/`, silabus program coding di `docs/programs/<id>/silabus.md`, kebijakan AI per program | Ditulis tim, termasuk draf agent AI. Berstatus `draf` sampai **manusia** menyetujuinya; silabus program berlaku setelah Anda menyetujuinya. |

Agent AI boleh membuat dan menyunting draf, tetapi **tidak pernah**
menetapkan `disetujui` atas inisiatif sendiri dan tidak pernah mencatat
persetujuan yang tidak Anda pilih.

## Meninjau modul draf

### 1. Baca modulnya

```sh
osn render modul --id rekursi
```

Atau buka berkasnya langsung di GitHub:
`content/osn/modules/<id>.md`. Daftar sepuluh modul dan statusnya ada di
[`mentor-osn.md`](mentor-osn.md); sumber kebenarannya `data/osn/modules.json`.
Per 2026-11-18 kesepuluh modul OSN sudah `disetujui`: `dasar-pemrograman`
lebih dulu, sembilan lainnya menyusul pada hari yang sama. Langkah di bawah
berlaku untuk setiap modul baru, termasuk modul program `sma-coding`.

### 2. Daftar periksa review

| Aspek | Pertanyaan |
| --- | --- |
| Ketepatan teknis | Apakah setiap pernyataan benar? Apakah batas kasus (overflow, input kosong, indeks) diakui, bukan diabaikan? |
| Contoh kode | Apakah contoh benar untuk masukan wajar, bukan sekadar bisa dikompilasi? (`bun run check:module-code` hanya memastikan blok C++ lolos kompilasi `g++ -std=c++17 -fsyntax-only`, blok Arduino lolos kompilasi terhadap `Arduino.h` tiruan, dan blok Python lolos pemeriksaan sintaks; contoh tidak dijalankan dan bukan bukti perilaku di papan.) |
| Latihan | Apakah latihan asli (karangan), tingkatannya wajar, dan tidak menyalin soal juri atau kontes? Soal dari sumber luar harus ditautkan. |
| Rujukan | Apakah rujukan resmi dan benar-benar menopang isi? Apakah `refId` di indeks sesuai isinya? |
| Bahasa | Apakah bahasa Indonesia jelas untuk siswa SMA, istilah konsisten, tidak menggurui? |
| Kesesuaian silabus | Apakah rumpun materi dan minggu yang dirujuk modul sesuai silabus (indeks `topicFamilies` dan `weeks`)? Modul tidak boleh menambah klaim yang seolah-olah isi silabus. |
| Privasi dan etika | Tidak ada data pribadi nyata; contoh bernama palsu atau tanpa nama. |

Pemeriksaan otomatis yang bisa dijalankan sebelum menilai isi:

```sh
bun run validate
bun run check:module-code
```

```text
$ bun run scripts/check-module-code.ts
check-module-code: OK -- 116 cpp, 0 arduino (mock Arduino.h) and 0 python block(s) in 39 module file(s) pass (g++ -std=c++17 -fsyntax-only; python3 ast.parse); 0 block(s) marked setengah-jadi skipped.
```

Blok soal setengah jadi yang sengaja tidak lengkap diberi kata `setengah-jadi` setelah bahasa pada pagar pembuka (misalnya ```` ```cpp setengah-jadi ````); blok itu dilewati dan dihitung di keluaran. Untuk lembar anak bergambar, `bun run check:learner-assets` memeriksa berkas SVG di `content/<program>/gambar/` dan tautan gambar di `content/<program>/lembar/`.

## Mencatat keputusan

Keputusan persetujuan adalah hak Anda. Alurnya:

1. Orchestrator (Opus) menyajikan keputusan sebagai **dialog pilihan baku**
   (2-4 opsi, rekomendasi di urutan pertama bertanda "(Disarankan)", tiap
   opsi menyebut konsekuensinya). Keputusan yang saling terkait dikelompokkan,
   dan boleh dijawab sekaligus untuk beberapa issue. Alternatif tanpa
   dialog: komentar Anda di issue terkait yang menyebut jelas modul dan
   pilihannya.
2. Setelah Anda memilih, agent mengerjakan tindak lanjut mekanisnya:
   mencatat keputusan (tanggal dan opsi terpilih) di issue dan dokumen
   keputusan, mengubah status, dan menutup issue bila jenisnya mengizinkan.
3. Untuk modul, tindak lanjutnya ialah menetapkan `status` ke `disetujui`
   di `data/osn/modules.json` dengan blok `review`, seperti pada modul
   yang sudah disetujui:

   ```json
   "status": "disetujui",
   ...
   "review": {
     "approvedOn": "2026-11-18",
     "reviewerRole": "pemilik program"
   }
   ```

   `reviewerRole` adalah **peran**, bukan nama orang (minimisasi data).
   Skema menuntut `review` bila status `disetujui` dan melarangnya bila
   bukan. Bukti dari alat (pada salinan sementara `salinan-uji/` dari
   `data/osn/` yang statusnya diubah tanpa `review`):

   ```sh
   osn validate --program osn --data-dir salinan-uji
   ```

   ```text
   FAILED -- 1 problem(s) found (1 error(s), 0 warning(s)):

   modules.json:
     - [error] modules.4.review: `review` (approvedOn + reviewerRole) is required when status is `disetujui` and forbidden otherwise (ADR-0007)
   ```

   (exit 1.) Setelah blok `review` ditambahkan pada salinan yang sama,
   hasilnya `OK -- 22 data file(s) validated, 0 problem(s) found.` (exit 0).
   Perubahan ke `disetujui` merujuk issue tempat keputusan Anda tercatat dan
   diperiksa pada review PR.

Pagar yang tetap berlaku (AGENTS.md, aturan 15): jawaban teks bebas atau
"Lainnya" dianggap instruksi baru, bukan persetujuan; pilihan tidak
menggantikan aktivitas manusia nyata (uji coba lapangan, pilot, rapat
Go/No-Go, mandat hukum), sehingga issue semacam itu tetap terbuka sampai ada
bukti; AI tidak menyetujui PR-nya sendiri maupun rilis produksi.

## Persetujuan silabus program

Draf silabus program (mis. `docs/programs/sma-coding/`) adalah konten
karangan. Ia menjadi sumber corpus `data/<program>/` hanya setelah Anda
menyetujuinya (ADR-0006). Keadaan 2026-11-19: keenam program coding sudah
Anda setujui, dikodekan ke `data/<id>/`, dan terdaftar di
`data/programs.json` (ADR-0008): `sma-coding` v1.4.0 (v1.0 disetujui
2026-11-18; v1.1, v1.2, v1.3, dan v1.4 pada 2026-11-19), `tk-coding` v1.0.2 (revisi patch jembatan ke SD, #177),
`sd-coding` v1.1.0, `smp-coding` v1.2.0 (revisi minor jembatan dari SD dan ke SMA, #177), `kuliah-coding` v1.2.0, dan
`dewasa-coding` v1.2.0 (revisi patch kalimat status, #165; revisi patch status verifikasi sumber SK 046 dan SKKNI 282/2016; revisi minor jembatan kuliah-coding ke jalur `PRO`, #177). Revisi v1.1/v1.3 memuat butir dan kebijakan AI sesuai
keputusan Anda pada issue [#139](https://github.com/ahliweb/osn/issues/139)
(kebijakan disusun per program). Peta statusnya ada di
[`docs/programs/README.md`](../programs/README.md).

Perubahan atas silabus yang sudah disetujui: usulan lewat issue, revisi
berstatus draf, lalu persetujuan Anda yang dicatat dengan tanggal. Contoh
yang sudah selesai: blok fondasi kelas X, usulannya
([`usulan-fondasi-kelas-x.md`](../programs/sma-coding/usulan-fondasi-kelas-x.md))
diputuskan 2026-11-18 dan diterapkan di silabus v1.1 yang Anda setujui
2026-11-19 ([#92](https://github.com/ahliweb/osn/issues/92)).

## Perubahan konten kurikulum (transkripsi)

Mengubah data yang bersumber dari silabus resmi tidak dilakukan sambil lalu:

1. Buka issue dengan form **Curriculum change**
   (`.github/ISSUE_TEMPLATE/curriculum-change.yml`). Isinya: sumber resmi yang
   dicek, rincian sumber (URL, dokumen, versi), tanggal pengecekan, apa yang
   berubah, dan dampak changelog/versi yang diharapkan.
2. **Syllabus check** terhadap sumber resmi (OSN: `osn.toki.id/silabus` dan
   halaman OSN-K, OSN-P; IOI: `ioinformatics.org/page/syllabus/12`).
   Prosedurnya di [`docs/operations/syllabus-check.md`](../operations/syllabus-check.md).
3. Implementasi dengan urutan skema, data, domain, tes. Sertakan changeset.
4. Pemeriksaan kesiapan kohort (`osn checklist`) menampilkan jumlah hari sejak
   syllabus check terakhir, jadi tanggal tertinggal terlihat.

## Rilis

Rilis mengikuti [`docs/development/releasing.md`](../development/releasing.md);
paket ini privat dan tidak diterbitkan ke registri. Pemilik yang memutuskan
kapan rilis dilakukan, dan AI tidak menyetujui rilis produksi.

| Langkah | Perintah atau tindakan |
| --- | --- |
| 1 | Pastikan setiap PR yang sudah merge memuat changeset yang dibutuhkan (`.changeset/*.md`). |
| 2 | Di `main`: `bun run version`. Membaca semua changeset, menaikkan `package.json`, menulis `CHANGELOG.md`, menghapus changeset yang terpakai. Dicoba pada salinan sementara tanpa riwayat git: dengan satu changeset `minor`, versi bergeser dari 2.1.0 ke 2.2.0 dan perintah exit 0. |
| 3 | Baca `CHANGELOG.md` hasilnya; jalankan seluruh daftar periksa kualitas (lihat [`kontributor.md`](kontributor.md)). |
| 4 | Commit `package.json` dan `CHANGELOG.md`: `chore: release vX.Y.Z`. |
| 5 | Beri tag beranotasi: `git tag -a vX.Y.Z -m "vX.Y.Z"`. |
| 6 | Dorong commit dan tag. |

Langkah 4-6 disalin dari `releasing.md` dan **tidak dijalankan** saat
menyusun panduan ini karena mengubah riwayat.

Tingkat kenaikan versi ditentukan oleh perubahan paling signifikan: `patch`
(perbaikan editorial), `minor` (konten, perintah, atau bagian dokumen baru),
`major` (skema atau struktur 28 minggu/rumpun/gerbang/bobot yang berubah
tidak kompatibel). Dua nomor versi berbeda: `package.json` (perangkat lunak)
dan `syllabusVersion` (sumber silabus).

## Keputusan yang sedang menunggu

Daftar issue terbuka, yang paling mudah dibaca sebagai antrean keputusan dan
pekerjaan:

```sh
gh issue list -R ahliweb/osn --state open
```

Keluaran nyata perintah itu pada 2026-11-19 (kolom dipisah tab; label dan
tanggal pembuatan dipotong di sini):

```text
157	OPEN	[F1/06] docs: finalisasi runbook rename dan kriteria penerimaan pascamigrasi
156	OPEN	[F1/05] docs: cross-spec review dan catat hasil Gate 9 CaC
155	OPEN	[F1/04] riset: audit keamanan, perubahan GitHub dan strategi recovery
154	OPEN	[F1/03] docs: verifikasi invariants data kurikulum dan traceability rename
153	OPEN	[F1/02] riset: petakan kontrak CLI osn dan strategi kompatibilitas cac
152	OPEN	[F1/01] riset: audit seluruh consumer, integrasi, dan URL aktif repo OSN
151	OPEN	Tinjau ulang riset AI dalam rekayasa perangkat lunak (Mei 2027)
150	OPEN	[F1/00] epik: persiapkan migrasi identitas CaC ke ahliweb/cac
139	OPEN	Riset AI dalam rekayasa perangkat lunak: vibe coding, AI-native engineer, pengembangan berkelanjutan
125	OPEN	Tinjauan pemilik atas 29 modul draf sma-coding
124	OPEN	Seri modul materi untuk jalur C, D, dan E
```

Cara membacanya, per issue:

| Issue | Jenis | Yang menunggu Anda | Dokumen untuk dibaca |
| --- | --- | --- | --- |
| #125 | Tinjauan konten | Meninjau 29 modul draf `sma-coding` | bagian "Meninjau modul draf" di atas |
| #124 | Pekerjaan lanjutan | Modul jalur C, D, E belum ada; belum menunggu keputusan Anda | [`sma-coding/README.md`](../programs/sma-coding/README.md) |
| #139 | Riset dan keputusan | Keputusan kebijakan AI per program sudah Anda ambil dan diterapkan (OSN #159, SMP #160, SMA #161, kuliah #162, dewasa #163); issue masih terbuka (tinjau ulang terjadwal di #151) | [`riset/ai-rekayasa-perangkat-lunak.md`](../riset/ai-rekayasa-perangkat-lunak.md) |
| #151 | Tinjau ulang terjadwal | Meninjau ulang riset AI pada Mei 2027; belum jatuh tempo | [`riset/ai-rekayasa-perangkat-lunak.md`](../riset/ai-rekayasa-perangkat-lunak.md) |
| #150 sampai #157 | Persiapan migrasi identitas (epik dan turunannya) | Dikerjakan di jalur terpisah (PR draf #158); tidak dibahas panduan ini | lihat issue #150 |

Issue #127 sampai #131 (draf lima program coding), #133 (riset ilmu
kognitif) dan #140 (titik sambung audit dan fidelity) sudah selesai dan
tertutup. Persetujuan silabus tidak otomatis menyiapkan materi: kelima
program itu belum punya modul di `content/` dan belum didukung `plan` dan
`render`.

Kandidat tinjauan Anda berikutnya:

- 29 modul draf `sma-coding` di `content/sma-coding/modules/` (fondasi,
  matematika komputasi, cloud, pendamping; baca dengan
  `osn render modul --program sma-coding --id <id>`, daftar id di
  `data/sma-coding/modules.json`), issue #125.
- Silabus v1.1 (#92), v1.2 (#68, #84, #88), dan v1.3 (#139) sudah Anda
  setujui; yang belum ada adalah modul materi untuk jalur C, D, dan E (#124)
  dan untuk lima program coding lainnya.
