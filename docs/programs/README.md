# Peta Jenjang Program Pembelajaran Coding

- **Version:** v2.6.6
- **Last updated:** 2026-11-20
- **Status:** Dokumen peta (navigasi), bukan silabus. Isinya merangkum keadaan nyata folder program di `docs/programs/`, pembinaan OSN di `docs/silabus/`, dan registri `data/programs.json`. Menyebut status; tidak mengubah isi dokumen program mana pun.

> Ketujuh program (OSN dan enam program coding) **disetujui pemilik dan
> terdaftar** di `data/programs.json` ([ADR-0006](../architecture/adr/0006-multi-program-repository.md)).
> Silabus enam program coding adalah konten **karangan** menurut
> [ADR-0007](../architecture/adr/0007-authored-learning-content.md); tiap
> `silabus.md` menjadi sumber korpus `data/<id>/`, divalidasi skema khusus
> program ([ADR-0008](../architecture/adr/0008-skema-khusus-per-program.md)).
> Agent tidak pernah menyetujui silabus atau modul atas nama pemilik.
> Repositori ini tidak menyimpan data pembelajar
> ([ADR-0004](../architecture/adr/0004-no-learner-personal-data.md)).

## 1. Alur jenjang

```text
TK/PAUD --> SD --> SMP --> SMA ------------> Kuliah --> Dewasa
tk-coding  sd-coding smp-coding sma-coding   kuliah-coding dewasa-coding
 (v1.0.3)  (v1.1.0)  (v1.2.0)    (v1.4.1)      (v1.2.0)     (v1.2.0)
                                  |
                                  +--> osn (pembinaan OSN, jalur A)
                                        (terdaftar, v2.0)
```

Panah adalah jembatan yang tertulis di silabus masing-masing dan terkodekan di
korpus tiap program; penyamaan kode antarprogram belum dilakukan untuk semua
pasangan, lihat bagian 3.

## 2. Tabel program

Semua versi dan tanggal di bawah sama dengan `data/programs.json`
(`syllabusVersion`, 2026-11-19 untuk enam program coding).

| Jenjang | Id program | Sasaran | Status nyata dan versi | Kebijakan AI untuk murid | Berkas utama | Issue |
| --- | --- | --- | --- | --- | --- | --- |
| TK/PAUD | `tk-coding` | TK A dan TK B (usia sekitar 4-6 tahun); berpikir komputasional, tanpa layar | **Disetujui**, terdaftar, dienkode ke `data/tk-coding/` (7 berkas). Silabus v1.0.2. Modul belajar: 48 modul, 48 lembar anak, 48 gambar SVG di `content/tk-coding/`, semua `draf`, belum ditinjau. | Tanpa alat AI generatif untuk murid | [`tk-coding/README.md`](tk-coding/README.md), [`riset.md`](tk-coding/riset.md), [`silabus.md`](tk-coding/silabus.md) | [#127](https://github.com/ahliweb/osn/issues/127) (selesai) |
| SD | `sd-coding` | Kelas 1-6; inti pada kelas 5-6 (KKA Fase C), kelas 1-4 pengantar opsional | **Disetujui**, terdaftar, dienkode ke `data/sd-coding/` (5 berkas). Silabus v1.1.0. Modul belajar: 168 modul, 168 lembar anak, 168 gambar SVG di `content/sd-coding/`, semua `draf`, belum ditinjau. | Tanpa alat AI generatif untuk murid | [`sd-coding/README.md`](sd-coding/README.md), [`riset.md`](sd-coding/riset.md), [`silabus.md`](sd-coding/silabus.md) | [#128](https://github.com/ahliweb/osn/issues/128) (selesai) |
| SMP | `smp-coding` | Kelas 7-9 (Fase D); blok ke pseudocode, data, proyek, literasi AI, Python sebagai pengayaan | **Disetujui**, terdaftar, dienkode ke `data/smp-coding/` (7 berkas). Silabus v1.2.0. Modul belajar: 84 modul di `content/smp-coding/modules/`, semua `draf`, belum ditinjau. | Demonstrasi guru tanpa akun murid; asesmen tanpa AI (silabus 7.1) | [`smp-coding/README.md`](smp-coding/README.md), [`riset.md`](smp-coding/riset.md), [`silabus.md`](smp-coding/silabus.md) | [#129](https://github.com/ahliweb/osn/issues/129) (selesai) |
| SMA | `sma-coding` | Kelas X-XII; jalur A (C++), B (web), C (IoT dan robotika), D (AI dan data, pengayaan), E (kuantum, kelas XI-XII, pengayaan) | **Disetujui**, terdaftar (`syllabusVersion` 1.4.1), dienkode ke `data/sma-coding/` (8 berkas korpus plus `modules.json`). 393 modul draf di `content/sma-coding/modules/` (29 lintas jalur ditambah 364 modul jalur A 77, B 77, C 77, D 77, E 56) menunggu tinjauan pemilik. | Murid SMA boleh memakai AI dengan etika (silabus 7.4) | [`sma-coding/README.md`](sma-coding/README.md), [`silabus.md`](sma-coding/silabus.md) | [#125](https://github.com/ahliweb/osn/issues/125) (tinjauan modul, terbuka), [#124](https://github.com/ahliweb/osn/issues/124) (penulisan modul); keputusan silabus: #52, #92, #68, #84, #88, #139 |
| SMA (kompetisi) | `osn` | Pembinaan OSN Informatika 2026 jenjang SMA/sederajat, 28 minggu, 10 rumpun, 7 gerbang | **Disetujui dan terdaftar** (`syllabusVersion` 2.0, 4 September 2026). Transkripsi setia silabus; sepuluh modul disetujui. | [`kebijakan-ai-osn.md`](../operations/kebijakan-ai-osn.md) (prosedur operasional, bukan bagian transkripsi) | [`docs/silabus/README.md`](../silabus/README.md), `data/osn/` | Selesai (M1-M8) |
| Kuliah | `kuliah-coding` | Mahasiswa; jalur U (semua prodi), I (informatika), K (pemrograman kompetitif) dalam SKS | **Disetujui**, terdaftar, dienkode ke `data/kuliah-coding/` (6 berkas). Silabus v1.2.0. Modul belajar: 24 modul di `content/kuliah-coding/modules/`, semua `draf`, belum ditinjau. | Kebijakan AI tiga tingkat dengan log pemakaian (silabus 6.3-6.5) | [`kuliah-coding/README.md`](kuliah-coding/README.md), [`riset.md`](kuliah-coding/riset.md), [`silabus.md`](kuliah-coding/silabus.md) | [#130](https://github.com/ahliweb/osn/issues/130) (selesai) |
| Dewasa | `dewasa-coding` | Orang dewasa; jalur Pekerja, Profesional, Personal, Pebisnis/UMKM; berbasis modul dan jam | **Disetujui**, terdaftar, dienkode ke `data/dewasa-coding/` (8 berkas). Silabus v1.2.0. Modul belajar: 36 modul di `content/dewasa-coding/modules/`, semua `draf`, belum ditinjau. | Kebijakan penggunaan AI peserta dewasa (silabus 9.1) | [`dewasa-coding/README.md`](dewasa-coding/README.md), [`riset.md`](dewasa-coding/riset.md), [`silabus.md`](dewasa-coding/silabus.md) | [#131](https://github.com/ahliweb/osn/issues/131) (selesai) |

Modul belajar enam program coding (ADR-0007) per 2026-11-19, dihitung dari
`data/<id>/modules.json`: `tk-coding` 48, `sd-coding` 168, `smp-coding` 84,
`sma-coding` 393, `kuliah-coding` 24, `dewasa-coding` 36 (total 753), semuanya
berstatus `draf` dan belum ditinjau pemilik; hanya `tk-coding` dan `sd-coding`
punya lembar anak dan gambar SVG. Butir yang perlu dicek peninjau manusia
dikumpulkan di [`catatan-tinjauan-modul.md`](catatan-tinjauan-modul.md).

Program yang terdaftar tujuh (`osn` dan enam program coding); `osn validate`
memeriksa ketujuhnya dan `bun run check:fidelity` enam program coding.
Kebijakan AI per program adalah keputusan pemilik pada issue
[#139](https://github.com/ahliweb/osn/issues/139): disusun **per program**,
bukan satu kerangka lintas program, dengan dasar
[`riset/ai-rekayasa-perangkat-lunak.md`](../riset/ai-rekayasa-perangkat-lunak.md).

## 3. Jembatan antarjenjang

Kolom "Dasar dan keselarasan" memuat apa yang tertulis di silabus masing-masing, tanpa tambahan dari peta ini. Kelima pasangan jenjang berstatus **Selaras** sejak keputusan pemilik 2026-11-19 (#177). Beberapa silabus ditulis sebelum silabus pasangannya ada; kalimat status yang basi tentang keberadaan program pasangannya sudah diperbaiki lewat revisi patch (issue #165), tetapi keselarasan isi jembatan belum.

| Dari | Ke | Dasar dan keselarasan |
| --- | --- | --- |
| `tk-coding` | `sd-coding` | **Selaras** (keputusan pemilik 2026-11-19, #177; tk v1.0.2, sd v1.1.0). Kedua silabus saling dibaca. Silabus TK (bagian 5) memetakan lima keluaran TK B ke butir pengenalan SD kelas 1-2 dengan kode minggu SD (bukan "Fase A": kelas 1-4 SD di luar struktur KKA), mengoreksi rujukan `TK-B2-M1` (melatih arah dan ulang, bukan pola), dan menyamakan kosakata dan simbol arah. Silabus SD (bagian 7.1) menyatakan kelas 1 dirancang untuk murid dengan maupun tanpa latar TK B: pengamatan awal lewat permainan rute tanpa tes, jalur padat di kelas yang sama, aturan keamanan perangkat diulang dengan jarak waktu dan tidak dipadatkan. Terkodekan di `data/tk-coding/bridge.json` dan `data/sd-coding/bridges.json`; kode minggu TK dan SD yang disebut diperiksa silang oleh `osn validate` (ADR-0010). |
| `sd-coding` | `smp-coding` | **Selaras** (keputusan pemilik 2026-11-19, #177; sd v1.1.0, smp v1.2.0). Kedua silabus saling dibaca. Silabus SD (bagian 7.2) menyatakan apa yang **tidak dijamin** kelas 5-6 (perulangan, percabangan, dan variabel hanya di kelas 2-4 opsional; blok visual hanya opsi di `SD6-1-M9` dan `SD6-1-M10`) dan tetap tidak mengajarkan sintaks pemrograman. Silabus SMP (bagian 5.1) tidak lagi mengasumsikan murid mengenal blok, perulangan, atau percabangan: `SMP7-1-M1` menjadi pengamatan awal tanpa tes, hanya `SMP7-1-M1` dan `SMP7-1-M2` (tanpa layar) boleh dipadatkan, dan `SMP7-1-M3` sampai `SMP7-1-M5` serta `SMP7-1-M8` dan `SMP7-1-M9` tidak dipadatkan bagi siapa pun. Terkodekan di `data/sd-coding/bridges.json` dan `data/smp-coding/bridge.json`; kode minggu SD dan SMP yang disebut diperiksa silang oleh `osn validate` (ADR-0010). |
| `smp-coding` | `sma-coding` | **Selaras** (keputusan pemilik 2026-11-19, #177; smp v1.2.0, sma v1.4.0). Silabus SMP (bagian 5.2) memperinci pemetaan ke SMA per kode minggu dan **mengoreksi** pemetaan blok kelas 7 ke blok fondasi `FND-X1-M1..M7` (fondasi tidak memuat pemrograman; Scratch kelas 7 beririsan dengan `A-X1-M8..M12` dan `B-X1-M8..M12`). Silabus `sma-coding` (bagian 3.0, subbagian baru) menyatakan tidak mensyaratkan SMP, memetakan irisan minggu SMP dengan fondasi dan jalur A dan B, dan mengatur pengamatan awal dan tugas pendalaman di dalam kelas bersama (fondasi tetap kelas bersama, keputusan 9.1 SMA). Terkodekan di `data/smp-coding/bridge.json` dan `data/sma-coding/smp-bridge.json`; kode minggu SMP dan SMA yang disebut diperiksa silang oleh `osn validate` (ADR-0010). |
| `sma-coding` jalur A | `osn` | Jembatan disetujui dan terkodekan di `data/sma-coding/osn-bridge.json` (jalur A selaras rumpun `data/osn/topic-families.json`; jalur C sebagian lewat `trackBridges`). |
| `smp-coding` | `osn` | Silabus SMP (bagian 5.3): tidak ada OSN SMP yang dapat dipastikan; jembatannya klub pengayaan lalu jalur A `sma-coding`. Silabus SD (bagian 8) menyatakan tidak ada jembatan OSN untuk SD. |
| `sma-coding` jalur A, B, C, D, E; `osn` | `kuliah-coding` | **Selaras** (keputusan pemilik 2026-11-19, #177; kuliah v1.2.0). Silabus kuliah (bagian 5.1) menulis pengakuan **per CPMK**, bukan per mata kuliah utuh, dengan bukti portofolio akhir jalur, riwayat Git, ujian praktik tanpa AI, wawancara kode, dan gerbang kesiapan; jalur A juga ke `KUL-I-201`, jalur D ke `KUL-U-102`, dan rujukan blok fondasi ke `KUL-U-101` dikoreksi ke `KUL-I-203`, `KUL-I-301`, `KUL-U-202`. Sebagian `[asumsi]` atau `[belum terverifikasi]` (tata cara pengakuan ditetapkan perguruan tinggi). Kuliah tidak mensyaratkan SMA, jadi silabus SMA tidak perlu merujuk kuliah; kode minggu `sma-coding` yang disebut diperiksa silang oleh `osn validate` (ADR-0010). |
| `kuliah-coding` | `dewasa-coding` | **Selaras** (keputusan pemilik 2026-11-19, #177; kuliah v1.2.0, dewasa v1.2.0). Silabus kuliah (bagian 5.2) menyebut portofolio `KUL-U-301` dan `KUL-I-401` sebagai bukti masuk jalur `PRO`; silabus dewasa (bagian 6.1 dan 6.2, keputusan 12.7) merancang pengakuan per modul `PRO` dengan status lewati, padatkan, wajib untuk tiga profil masuk, `DW-FND-M1` dan `DW-PRO-M12` tetap wajib. Terkodekan di `data/dewasa-coding/kuliah-bridge.json`; kode `KUL-` dan `DW-` diperiksa silang oleh `osn validate` (ADR-0010). |
| `sma-coding` jalur A, B, D | `dewasa-coding` | Silabus dewasa (bagian 6.1) memetakan jalur A ke `PRO`, jalur B ke `PRO` dan `BIS`, jalur D ke `PKJ` dan `PRO`, semua `[asumsi]`; juga menyebut pendamping anak ke jalur A atau B. |

Rancangan penyelarasan kelima pasangan di atas (disetujui pemilik pada 2026-11-19, issue #177, seluruh rekomendasi K1 sampai K8; diterapkan bertahap dalam lima PR, pasangan yang sudah berstatus **Selaras** di tabel adalah yang sudah diterapkan): [`rancangan-jembatan-antarprogram.md`](rancangan-jembatan-antarprogram.md).

Ringkas: jembatan tiap program terkodekan di korpusnya sendiri
(`data/<id>/bridge*.json`, `osn-bridge.json`, `smp-bridge.json`, `kuliah-bridge.json`) dan diperiksa mesin terhadap
silabusnya oleh `bun run check:fidelity`; kode minggu, mata kuliah, dan modul program lain yang disebut di
tabel jembatan diperiksa silang oleh `osn validate` terhadap korpus program asalnya (ADR-0010). Penyamaan
antarprogram (kedua sisi saling membaca, kode jembatan disamakan) sudah dilakukan untuk kelima pasangan jenjang.

## 4. Rujukan riset bersama

Dua dokumen riset lintas program (konten karangan, ADR-0007) menjadi rujukan
semua program:

- [`docs/riset/ilmu-belajar-kognitif.md`](../riset/ilmu-belajar-kognitif.md)
  (issue [#133](https://github.com/ahliweb/osn/issues/133)): riset ilmu
  kognitif tentang cara belajar efektif (latihan mengingat kembali, latihan
  berjarak, contoh terselesaikan, umpan balik), mitos belajar, riset
  pendidikan komputasi, perkembangan usia, serta rekomendasi dan celah per
  program.
- [`docs/riset/ai-rekayasa-perangkat-lunak.md`](../riset/ai-rekayasa-perangkat-lunak.md)
  (issue [#139](https://github.com/ahliweb/osn/issues/139)): riset AI dalam
  rekayasa perangkat lunak (vibe coding, AI-native engineer, pengembangan
  berkelanjutan) yang menjadi dasar kebijakan AI tiap program (kolom
  "Kebijakan AI" di bagian 2). Tinjau ulang dijadwalkan Mei 2027
  ([#151](https://github.com/ahliweb/osn/issues/151)).

Kedua dokumen tidak mengubah silabus atau korpus; perubahan program dikerjakan
lewat silabus program yang bersangkutan setelah pemilik menyetujui.

## 5. Cara memperbarui peta ini

Perbarui bila: sebuah silabus disetujui, direvisi, atau didaftarkan (`data/programs.json`
berubah), versi atau berkas utama program berubah, atau jembatan antarprogram
diselaraskan. Setiap baris harus bisa diperiksa terhadap folder program dan
`data/programs.json`; jangan menambah klaim yang tidak ada di dokumen
sumbernya.

## Changelog

| Versi | Tanggal | Perubahan |
| --- | --- | --- |
| v1.0.0 | 2026-11-19 | Peta awal: alur jenjang TK sampai dewasa, tabel program dan status nyata, jembatan, dan rujukan riset ilmu kognitif (issue #127, #128, #129, #130, #131, #133). |
| v2.0.0 | 2026-11-19 | Keadaan nyata: enam program coding disetujui, terdaftar, dan dienkode (versi silabus sama dengan registri); kolom kebijakan AI per program (#139); tautan `silabus.md`; rujukan dua dokumen riset (#127, #128, #129, #130, #131, #133, #139, #140). |
| v2.0.1 | 2026-11-19 | Versi silabus tk, sd, smp, kuliah, dan dewasa ke revisi patch (issue #165); kalimat riwayat "belum ada" di bagian 3 disesuaikan dengan silabus yang sudah diperbaiki. |
| v2.0.2 | 2026-11-19 | Tautan ke `rancangan-jembatan-antarprogram.md` (rancangan penyelarasan jembatan, DRAF) di bagian 3; isi peta tidak berubah. |
| v2.1.0 | 2026-11-19 | Jembatan `kuliah-coding` ke `dewasa-coding` jalur `PRO` selaras (#177): kuliah dan dewasa v1.2.0, `data/dewasa-coding/` 8 berkas; rancangan jembatan disetujui pemilik dan diterapkan bertahap. |
| v2.2.0 | 2026-11-19 | Jembatan `sma-coding` dan `kuliah-coding` selaras (#177): pengakuan per CPMK (kuliah v1.2.0 bagian 5.1), koreksi rujukan fondasi. |
| v2.3.0 | 2026-11-19 | Jembatan `smp-coding` dan `sma-coding` selaras (#177): smp v1.2.0 dan sma v1.4.0, `data/sma-coding/` 8 berkas; koreksi pemetaan blok kelas 7 ke fondasi. |
| v2.4.0 | 2026-11-19 | Jembatan `sd-coding` dan `smp-coding` selaras (#177): sd v1.1.0 (bagian 7), smp v1.2.0 bagian 5.1. |
| v2.5.0 | 2026-11-19 | Jembatan `tk-coding` dan `sd-coding` selaras (#177): tk v1.0.2, sd v1.1.0 bagian 7.1; seluruh peta bagian 3 berstatus selaras; keadaan pemeriksaan silang kode (ADR-0010). |
| v2.6.1 | 2026-11-19 | Jumlah modul `sma-coding` mengikuti modul jalur A dan B yang ditulis (#237); rujukan `syllabusVersion` SMA 1.4.1. |
| v2.6.2 | 2026-11-20 | Jumlah modul `sma-coding` mengikuti putaran P2 jalur A dan B (#237): 281 modul, total 641. |
| v2.6.3 | 2026-11-20 | Jumlah modul `sma-coding` mengikuti putaran P3 jalur A dan B (#237): 309 modul, total 669. |
| v2.6.4 | 2026-11-20 | Jumlah modul `sma-coding` mengikuti putaran P4 jalur A dan B (#237): 337 modul, total 697. |
| v2.6.5 | 2026-11-20 | Jumlah modul `sma-coding` mengikuti putaran P5 jalur A dan B (#237): 365 modul, total 725. |
| v2.6.6 | 2026-11-20 | Jumlah modul `sma-coding` mengikuti putaran P6 jalur A dan B (#237): 393 modul, total 753; seri 154 modul jalur A dan B lengkap. |
| v2.6.0 | 2026-11-19 | Sinkron dokumen (#124): status modul belajar tiap program (599 modul draf di enam program, lembar dan gambar TK dan SD), tautan ke `catatan-tinjauan-modul.md`; isi jembatan tidak berubah. |
