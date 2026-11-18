# Peta Jenjang Program Pembelajaran Coding

- **Version:** v1.0.0
- **Last updated:** 2026-11-19
- **Status:** Dokumen peta (navigasi), bukan silabus. Isinya merangkum keadaan nyata folder program di `docs/programs/`, pembinaan OSN di `docs/silabus/`, dan registri `data/programs.json`. Menyebut status; tidak mengubah isi dokumen program mana pun.

> Dokumen program yang berstatus DRAF adalah konten **karangan** menurut
> [ADR-0007](../architecture/adr/0007-authored-learning-content.md) dan belum
> disetujui pemilik. Menurut
> [ADR-0006](../architecture/adr/0006-multi-program-repository.md), program
> berstatus draf tidak mendapat `data/<program>/` maupun entri
> `data/programs.json`. Agent tidak pernah menyetujui draf atas nama pemilik.
> Repositori ini tidak menyimpan data pembelajar
> ([ADR-0004](../architecture/adr/0004-no-learner-personal-data.md)).

## 1. Alur jenjang

```text
TK/PAUD --> SD --> SMP --> SMA ------------> Kuliah --> Dewasa
tk-coding  sd-coding smp-coding sma-coding   kuliah-coding dewasa-coding
 (DRAF)    (DRAF)    (DRAF)     (v1.2)         (DRAF)       (DRAF)
                                  |
                                  +--> osn (pembinaan OSN, jalur A)
                                        (terdaftar, v2.0)
```

Panah adalah jembatan yang tertulis di draf masing-masing. Hampir semuanya
masih **asumsi sepihak** karena draf lain belum ada ketika ditulis; lihat
bagian 3.

## 2. Tabel program

| Jenjang | Id program | Sasaran | Status nyata | Berkas utama | Issue |
| --- | --- | --- | --- | --- | --- |
| TK/PAUD | `tk-coding` | TK A dan TK B (usia sekitar 4-6 tahun); berpikir komputasional, tanpa layar | DRAF v0.1.0. Tidak ada `data/tk-coding/`, tidak ada entri registri. | [`tk-coding/README.md`](tk-coding/README.md), [`riset.md`](tk-coding/riset.md), [`silabus-draf.md`](tk-coding/silabus-draf.md) | [#127](https://github.com/ahliweb/osn/issues/127) (terbuka) |
| SD | `sd-coding` | Kelas 1-6; inti pada kelas 5-6 (KKA Fase C), kelas 1-4 pengantar opsional | DRAF v0.1.0. Tidak ada `data/sd-coding/`, entri registri, maupun `content/sd-coding/`. | [`sd-coding/README.md`](sd-coding/README.md), [`riset.md`](sd-coding/riset.md), [`silabus-draf.md`](sd-coding/silabus-draf.md) | [#128](https://github.com/ahliweb/osn/issues/128) (terbuka) |
| SMP | `smp-coding` | Kelas 7-9 (Fase D); blok ke pseudocode, data, proyek, literasi AI, Python sebagai pengayaan | DRAF v0.2.0. Tidak ada `data/smp-coding/`, entri registri, maupun modul `content/`. | [`smp-coding/README.md`](smp-coding/README.md), [`riset.md`](smp-coding/riset.md), [`silabus-draf.md`](smp-coding/silabus-draf.md) | [#129](https://github.com/ahliweb/osn/issues/129) (terbuka) |
| SMA | `sma-coding` | Kelas X-XII; jalur A (C++), B (web), C (IoT dan robotika), D (AI dan data, pengayaan), E (kuantum, kelas XI-XII, pengayaan) | **Disetujui** pemilik: silabus v1.2 (2026-11-19). **Terdaftar** di `data/programs.json` (`syllabusVersion` 1.2.0) dan dikodekan ke `data/sma-coding/`. 29 modul draf di `content/sma-coding/modules/` menunggu tinjauan pemilik. | [`sma-coding/README.md`](sma-coding/README.md), [`silabus.md`](sma-coding/silabus.md) | [#125](https://github.com/ahliweb/osn/issues/125) (tinjauan modul, terbuka), [#124](https://github.com/ahliweb/osn/issues/124) (modul jalur C, D, E, terbuka); keputusan silabus: #52, #92, #68, #84, #88 |
| SMA (kompetisi) | `osn` | Pembinaan OSN Informatika 2026 jenjang SMA/sederajat, 28 minggu, 10 rumpun, 7 gerbang | **Disetujui dan terdaftar** (`syllabusVersion` 2.0, 4 September 2026). Transkripsi setia silabus; sepuluh modul disetujui. | [`docs/silabus/README.md`](../silabus/README.md), `data/osn/` | Selesai (M1-M8) |
| Kuliah | `kuliah-coding` | Mahasiswa; jalur U (semua prodi), I (informatika), K (pemrograman kompetitif) dalam SKS | DRAF v0.1.0. Tidak ada `data/kuliah-coding/`, entri registri, maupun `content/kuliah-coding/`. | [`kuliah-coding/README.md`](kuliah-coding/README.md), [`riset.md`](kuliah-coding/riset.md), [`silabus-draf.md`](kuliah-coding/silabus-draf.md) | [#130](https://github.com/ahliweb/osn/issues/130) (terbuka) |
| Dewasa | `dewasa-coding` | Orang dewasa; jalur Pekerja, Profesional, Personal, Pebisnis/UMKM; berbasis modul dan jam | DRAF v0.1.0. Tidak ada `data/dewasa-coding/`, entri registri, maupun `content/dewasa-coding/`. | [`dewasa-coding/README.md`](dewasa-coding/README.md), [`riset.md`](dewasa-coding/riset.md), [`silabus-draf.md`](dewasa-coding/silabus-draf.md) | [#131](https://github.com/ahliweb/osn/issues/131) (terbuka) |

Program yang terdaftar hanya dua (`osn` dan `sma-coding`); lima lainnya
draf. Pertanyaan terbuka bagi pemilik tiap draf ada di README program yang
bersangkutan.

## 3. Jembatan antarjenjang

Kolom "Dasar" memuat apa yang tertulis di draf, tanpa tambahan dari peta ini.

| Dari | Ke | Dasar dan keselarasan |
| --- | --- | --- |
| `tk-coding` | `sd-coding` | Draf TK (silabus bagian 5) menulis lima keluaran TK B sebagai prasyarat SD awal, semuanya `[asumsi]`; menyatakan `sd-coding` belum ada saat ditulis dan kode jembatan harus disesuaikan (Q8: menunggu silabus SD). Draf SD (bagian 7.1) menulis prasyarat kelas 1 dari TK juga sebagai `[asumsi]`. **Belum selaras**: kedua sisi belum saling dibaca. |
| `sd-coding` | `smp-coding` | Draf SD (bagian 7.2) menyatakan keluaran kelas 6 sebagai `[asumsi]` dan tidak mengajarkan sintaks pemrograman. Draf SMP (bagian 5.1) mengasumsikan murid kelas 6 mengenal blok, urutan, perulangan, dan percabangan dasar, dan menyatakan isi `sd-coding` tidak dibacanya. **Belum selaras**; penyamaan kode setelah keduanya disetujui. |
| `smp-coding` | `sma-coding` v1.2 | Draf SMP (bagian 5.2) memetakan blok kelas 7 ke blok fondasi kelas X (`FND-X1-M1..M7`), Python pengayaan ke jalur D, logika dan fungsi ke jalur A dan B, simulator MakeCode ke jalur C, dan literasi KA kelas 9 ke jalur D. Pemetaan ini ditulis sepihak oleh draf SMP; silabus `sma-coding` v1.2 belum mencatat murid SMP sebagai prasyarat. |
| `sma-coding` jalur A | `osn` | Jembatan disetujui dan terkodekan di `data/sma-coding/osn-bridge.json` (jalur A selaras rumpun `data/osn/topic-families.json`; jalur C sebagian lewat `trackBridges`). |
| `smp-coding` | `osn` | Draf SMP (bagian 5.3): tidak ada OSN SMP yang dapat dipastikan; jembatannya klub pengayaan lalu jalur A `sma-coding`. Draf SD (bagian 8) menyatakan tidak ada jembatan OSN untuk SD. |
| `sma-coding` jalur A, B, C, D, E; `osn` | `kuliah-coding` | Draf kuliah (bagian 5.1) menulis jembatan per jalur ke mata kuliah `KUL-*` dengan pengakuan lewat rekognisi pembelajaran lampau; sebagian `[asumsi]` atau `[belum terverifikasi]`. Sepihak dari sisi kuliah; silabus SMA belum merujuknya. |
| `kuliah-coding` | `dewasa-coding` | Draf kuliah (bagian 5.2) menulis portofolio sebagai bahan masuk dan menyatakan rujukan silang dilengkapi setelah program dewasa ada. Draf dewasa (12.7) belum merancang jembatan dari kuliah dan menjadikannya pertanyaan terbuka. **Belum selaras**. |
| `sma-coding` jalur A, B, D | `dewasa-coding` | Draf dewasa (bagian 6.1) memetakan jalur A ke `PRO`, jalur B ke `PRO` dan `BIS`, jalur D ke `PKJ` dan `PRO`, semua `[asumsi]`; juga menyebut pendamping anak ke jalur A atau B. |

Ringkas: satu-satunya jembatan yang sudah terkodekan dan diperiksa mesin
adalah `sma-coding` jalur A ke OSN. Jembatan lain berupa asumsi yang menunggu
keputusan pemilik dan penyamaan antardraf.

## 4. Rujukan pedagogi bersama

[`docs/riset/ilmu-belajar-kognitif.md`](../riset/ilmu-belajar-kognitif.md)
(DRAF v0.1.0, issue [#133](https://github.com/ahliweb/osn/issues/133)) adalah
riset ilmu kognitif tentang cara belajar efektif yang menjadi rujukan semua
program di atas: prinsip berbasis bukti (latihan mengingat kembali, latihan
berjarak, contoh terselesaikan, umpan balik), mitos belajar, riset pendidikan
komputasi, perkembangan usia, dan rekomendasi serta celah per program
(bagian 8). Dokumen itu berstatus DRAF, tidak mengubah silabus atau corpus
mana pun, dan perubahan dokumen program dikerjakan terpisah setelah pemilik
menyetujui.

## 5. Cara memperbarui peta ini

Perbarui bila: sebuah draf disetujui atau didaftarkan (`data/programs.json`
berubah), versi atau berkas utama program berubah, atau jembatan antardraf
diselaraskan. Setiap baris harus bisa diperiksa terhadap folder program dan
`data/programs.json`; jangan menambah klaim yang tidak ada di dokumen
sumbernya.

## Changelog

| Versi | Tanggal | Perubahan |
| --- | --- | --- |
| v1.0.0 | 2026-11-19 | Peta awal: alur jenjang TK sampai dewasa, tabel program dan status nyata, jembatan, dan rujukan riset ilmu kognitif (issue #127, #128, #129, #130, #131, #133). |
