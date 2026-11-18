# Panduan pemilik program dan peninjau

Untuk pemilik program dan peninjau yang ditunjuknya: meninjau konten
karangan, memutuskan, dan merilis. Dasar aturannya:
[ADR-0007](../architecture/adr/0007-authored-learning-content.md) (konten
karangan dan siklus ulasnya) serta ADR-0006 (banyak program). Di halaman ini
`osn <perintah>` berarti `bun run src/cli/index.ts <perintah>`.

## Dua jenis konten, dua aturan

| Jenis | Contoh | Aturan |
| --- | --- | --- |
| Transkripsi | `data/osn/*.json`, `data/sma-coding/*.json`, lembar belajar yang diturunkan dari corpus | Disalin setia dari sumber. Berubah hanya lewat syllabus check dan form `curriculum-change`. |
| Karangan | Modul di `content/<program>/modules/`, draf silabus di `docs/programs/` | Ditulis tim, termasuk draf agent AI. Berstatus `draf` sampai **manusia** menyetujuinya. |

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
| Contoh kode | Apakah contoh benar untuk masukan wajar, bukan sekadar bisa dikompilasi? (`bun run check:module-code` hanya memastikan semua blok C++ lolos kompilasi `g++ -std=c++17 -fsyntax-only`; contoh tidak dijalankan.) |
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
check-module-code: OK -- 107 cpp block(s) in 10 module file(s) compile with g++ -std=c++17 -fsyntax-only.
```

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
menyetujuinya (ADR-0006): silabus `sma-coding` v1.0 disetujui 2026-11-18 dan
revisinya v1.1 (blok fondasi kelas X) disetujui 2026-11-19, keduanya untuk
jalur A dan B, dan baru sesudahnya dikodekan ke `data/sma-coding/`.
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

```text
105	OPEN	Celah butir CP F-LD-d dan F-LD-e untuk jalur A	type:docs, priority:P2, epic:sma-coding	2026-11-18T18:54:32Z
88	OPEN	Draf jalur E (komputasi kuantum dan cloud quantum) untuk silabus coding SMA	type:docs, priority:P2, epic:sma-coding	2026-11-18T11:07:30Z
84	OPEN	Draf jalur D (AI) untuk silabus coding SMA	type:docs, priority:P2, epic:sma-coding	2026-11-18T10:59:32Z
68	OPEN	Draf jalur C (IoT/robotika) untuk silabus coding SMA	type:docs, priority:P2, epic:sma-coding	2026-11-18T08:28:12Z
```

Daftar di atas adalah keadaan pada 2026-11-19; jalankan perintahnya untuk
keadaan terkini. Cara membacanya:

| Issue | Keadaan | Yang menunggu |
| --- | --- | --- |
| #68, #84, #88 | Draf jalur C (IoT/robotika), D (AI), E (kuantum) sudah ada di `docs/programs/sma-coding/` berstatus DRAF | Keputusan Anda atas pertanyaan terbuka di masing-masing draf; belum ada persetujuan |
| #105 | Celah butir CP F-LD-d dan F-LD-e untuk jalur A | Penilaian dan keputusan opsi |

Silabus v1.1 (#92) sudah Anda setujui 2026-11-19 dan issue-nya tertutup;
kandidat tinjauan Anda yang lain: draf jalur C, D, dan E di
`docs/programs/sma-coding/`, dan 27 modul draf `sma-coding` di
`content/sma-coding/modules/` (fondasi, matematika komputasi, cloud,
pendamping; baca dengan `osn render modul --program sma-coding --id <id>`,
daftar id di `data/sma-coding/modules.json`).
