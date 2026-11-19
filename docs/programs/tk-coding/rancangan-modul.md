# Rancangan Modul Lengkap TK/PAUD (`tk-coding`)

- **Version:** v0.1.1
- **Last updated:** 2026-11-19
- **Status:** Rancangan **DISETUJUI pemilik 2026-11-19** lewat dialog keputusan (opsi "Setujui, tambah gambar SVG": semua rekomendasi disetujui, Q3 memakai opsi b, SVG buatan penyusun per lembar). Persetujuan ini untuk rancangan, bukan modul. Modulnya **sudah ditulis** per 2026-11-19: 48 panduan guru di `content/tk-coding/modules/`, 48 lembar anak di `content/tk-coding/lembar/`, 48 gambar SVG di `content/tk-coding/gambar/`, terindeks di `data/tk-coding/modules.json`; semuanya berstatus `draf`.
- **Changeset:** Rancangan modul TK: pemetaan 48 minggu, templat berbasis bukti, gelombang penulisan, gerbang mutu, pertanyaan keputusan, dan satu modul pilot.

> **Catatan status (2026-11-19, sinkron dokumen #124).** Frasa "modulnya belum ditulis" di bawah adalah riwayat: modul nyatanya ada di `content/tk-coding/` (48 modul, 48 lembar, 48 SVG, indeks `data/tk-coding/modules.json`, semua `draf`, belum ditinjau). Pilot `rancangan-modul-contoh/` kini riwayat; modul nyatanya `tk-a1-m1` (`content/tk-coding/modules/tk-a1-m1.md` dan `content/tk-coding/lembar/tk-a1-m1.md`). Gambar lembar kini berupa SVG di `content/tk-coding/gambar/`, diperiksa oleh `bun run check:learner-assets`; Q3 di bawah dibiarkan sebagai catatan rancangan. Skema indeks khusus program sudah ada (`src/schema/tk-module.ts`). Judul `#` dan bagian `## Rujukan` tidak lagi ada di tubuh modul (judul dan rujukan dirender dari indeks); judul ganda kini galat di `bun run check:learner-assets`.
> Keputusan dan kontrak yang disetujui pemilik di dokumen ini tidak berubah; yang diperbarui hanya klausa status yang basi.

> **DRAF, bukan keputusan pemilik.** Dokumen ini adalah konten **karangan**
> menurut [ADR-0007](../../architecture/adr/0007-authored-learning-content.md):
> rancangan yang harus disetujui pemilik **sebelum** modul ditulis (keputusan
> pemilik 2026-11-19). Ia tidak mengubah [`silabus.md`](silabus.md) (v1.0.1,
> disetujui) maupun `data/tk-coding/`. Agent tidak menyetujui rancangan ini
> atas nama pemilik. Repositori ini tidak memuat data anak
> ([ADR-0004](../../architecture/adr/0004-no-learner-personal-data.md)).

## 0. Cara membaca dokumen ini

| Tanda | Arti |
| --- | --- |
| `K` | Prinsipnya didukung bukti kuat (`[A]` atau `[B]` di [`riset kognitif`](../../riset/ilmu-belajar-kognitif.md) bagian 1.2 dan 8). |
| `M` | Masuk akal, tetapi bukti terbatas untuk usia atau materi ini (`[inferensi]`). Untuk TK hampir semuanya `M`, karena riset 7 mencatat tidak ada studi terbaca yang menguji pemrograman pada anak TK. |
| `T` | Transkripsi atau kewajiban dari silabus, regulasi, atau ADR; bukan klaim riset. Tanda ini tambahan rancangan ini supaya unsur yang bukan klaim riset tidak diberi label bukti palsu. |
| `[asumsi]` | Keputusan perancangan penyusun, bukan data resmi. |
| `[belum terverifikasi]` | Tidak dapat dipastikan dari sumber yang dibuka penyusun pada 2026-11-19. |

Rujukan bagian tanpa nama dokumen (mis. "riset 3.1") berarti
[`docs/riset/ilmu-belajar-kognitif.md`](../../riset/ilmu-belajar-kognitif.md).

## 1. Konteks, keputusan pemilik, dan batas

**Keputusan pemilik 2026-11-19:** program `tk-coding` (48 minggu) mendapat
modul lengkap, satu per minggu; tiap modul berupa **panduan guru**
(`content/tk-coding/modules/<id>.md`) plus **lembar anak** terpisah
(`content/tk-coding/lembar/<id>.md`). Rancangan ini disetujui pemilik lebih
dulu, baru modul ditulis.

| Batas | Isi |
| --- | --- |
| Tidak menjanjikan manfaat luas | Modul tidak boleh mengklaim coding dini menaikkan kecerdasan atau memberi keunggulan jangka panjang. Riset 5 (baris "Anak harus mulai coding sedini mungkin") tidak menemukan studi yang mendukung jendela kritis; transfer jauh jarang terjadi (Sala dan Gobet, 2017). Alasan program ini ada: kebijakan resmi (Kepmendikdasmen 127/P/2025) dan irisan dengan CP Fase Fondasi, bukan klaim kognitif. |
| Tanpa layar | Keputusan pemilik silabus bagian 9: seluruh 48 minggu tanpa perangkat. Modul `tk-b2-m9` dan `tk-b2-m10` ditulis versi bawaannya (tanpa layar). Opsi layar 10 menit yang disebut di kalimat kegiatan kedua minggu itu tidak dijabarkan, karena keputusan pemilik memilih tanpa layar. |
| CP adalah irisan | Kolom CP di bagian 3 adalah **irisan penafsiran**, bukan pemenuhan CP (`data/tk-coding/weeks.json`: `meetsCp` bernilai `false`). Modul memakai kata "irisan", tidak "memenuhi". |
| Tanpa penilaian angka | Hanya pengamatan (silabus 6.1). |
| Tanpa data anak | Tidak ada nama, foto, suara, atau tokoh nyata; contoh bersifat umum atau fiktif. |
| Scope dokumen ini | Rancangan dan satu pilot. Tidak mengubah `content/`, `data/`, `src/`, silabus, riset, README program, atau `docs/panduan/*`. |

## 2. Konvensi berkas dan kontrak indeks

| Hal | Aturan |
| --- | --- |
| Id modul | Kode minggu huruf kecil: `tk-a1-m1` sampai `tk-b2-m12` (sama dengan `id` di `data/tk-coding/weeks.json`, dikecilkan). |
| Panduan guru | `content/tk-coding/modules/<id>.md`. Tanpa frontmatter; badan Markdown saja. |
| Lembar anak | `content/tk-coding/lembar/<id>.md`. Satu lembar per modul. |
| Indeks | Skema khusus program dibuat agent lain (ADR-0008). Kontrak yang dipakai rancangan ini: id sama dengan kode minggu huruf kecil; TK punya `cpOverlap` berisi irisan CP, **bukan pemenuhan**; isinya sama dengan kolom `cp` pada `weeks.json`. Agent penulis **tidak mengedit indeks**; orchestrator yang memasukkannya per gelombang. |
| Banner | Banner `DRAF, belum ditinjau` ditambahkan oleh renderer berdasarkan status indeks (seperti modul `sma-coding`); badan modul tidak memuat banner sendiri. |
| Status | Semua modul berstatus `draf`. Hanya pemilik atau peninjau yang ia tunjuk yang menaikkan ke `ditinjau` atau `disetujui` (ADR-0007). |
| Sesi | TK A 20 menit, TK B 30 menit, satu sesi per minggu (silabus bagian 3.1); integrasi harian 5 sampai 10 menit opsional. |

## 3. Pemetaan 48 modul

Judul modul = tema minggu di silabus. Kolom "Alat dan bahan" memakai paket P1
sampai P10 (legenda di bawah tabel). "Prasyarat" adalah minggu yang konsepnya
perlu sudah dikenal; `M#` pada semester yang sama ditulis lengkap. Seluruh
bahan murah atau bahan bekas dan **tanpa perangkat digital**.

| No | Id modul | Kode minggu | Judul modul | Irisan CP (bukan pemenuhan) | Alat dan bahan | Prasyarat |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | `tk-a1-m1` | `TK-A1-M1` | Kegiatan sehari-hariku | `FF-DL-b` | P1 kartu gambar dua langkah (cuci tangan, makan); P5 kertas perekat atau lem | — |
| 2 | `tk-a1-m2` | `TK-A1-M2` | Cerita tiga gambar | `FF-DL-a`, `FF-DL-c` | P10 cerita pendek milik guru; P1 tiga kartu gambar cerita | `TK-A1-M1` |
| 3 | `tk-a1-m3` | `TK-A1-M3` | Aku robot, kamu pemandu | `FF-DL-d`, `FF-JD-e` | ruang lapang; tanpa bahan lain | — |
| 4 | `tk-a1-m4` | `TK-A1-M4` | Kiri dan kanan | `FF-DL-b`, `FF-JD-e` | P2 jalur selotip di lantai; P5 stiker atau pita penanda di tangan kiri | `TK-A1-M3` |
| 5 | `tk-a1-m5` | `TK-A1-M5` | Pola warna | `FF-DL-b` | P4 manik besar, tutup botol, atau P6 balok berwarna | — |
| 6 | `tk-a1-m6` | `TK-A1-M6` | Pola gerak dan bunyi | `FF-DL-b`, `FF-DL-e` | P8 tepuk dan hentak (suara tubuh) | `TK-A1-M5` |
| 7 | `tk-a1-m7` | `TK-A1-M7` | Kumpulan benda | `FF-DL-b` | P4 dua wadah dan benda bahan bekas aman | — |
| 8 | `tk-a1-m8` | `TK-A1-M8` | Tebak aturan | `FF-DL-b`, `FF-DL-c` | P4 benda bahan bekas dan dua wadah | `TK-A1-M7` |
| 9 | `tk-a1-m9` | `TK-A1-M9` | Alat di sekitar kita | `FF-DL-d` | P9 "kotak alat" (sendok, sikat, gunting anak, sisir) | — |
| 10 | `tk-a1-m10` | `TK-A1-M10` | Memakai alat dengan aman | `FF-DL-d`, `FF-JD-e` | P9 gunting anak, kertas berpola; pengawasan penuh | `TK-A1-M9` |
| 11 | `tk-a1-m11` | `TK-A1-M11` | Permainan besar: jalan robot | `FF-DL-d`, `FF-JD-c` | P2 jalur rintangan selotip; P3 kartu "maju" dan "berhenti" | `TK-A1-M3`, `TK-A1-M4` |
| 12 | `tk-a1-m12` | `TK-A1-M12` | Pameran kecil dan cerita | `FF-DL-a` | P1 dan P5 karya semester ini (susunan pola, kartu urutan) | `TK-A1-M1 sampai M11` |
| 13 | `tk-a2-m1` | `TK-A2-M1` | Urutan empat langkah | `FF-DL-b`, `FF-DL-c` | P1 kartu gambar menanam biji, empat langkah | `TK-A1-M2` |
| 14 | `tk-a2-m2` | `TK-A2-M2` | Eh, ada yang terbalik! | `FF-DL-c` | P1 kartu urutan dengan dua kartu sengaja ditukar guru | `TK-A2-M1` |
| 15 | `tk-a2-m3` | `TK-A2-M3` | Maju dan belok | `FF-DL-b`, `FF-DL-d` | P3 kartu panah besar; P2 lantai | `TK-A1-M3`, `TK-A1-M4` |
| 16 | `tk-a2-m4` | `TK-A2-M4` | Peta kisi 3x3 | `FF-DL-b`, `FF-DL-d` | P2 kisi 3x3 selotip; P3 kartu panah; boneka atau teman sebagai "boneka" | `TK-A2-M3` |
| 17 | `tk-a2-m5` | `TK-A2-M5` | Pola tiga unsur | `FF-DL-b` | P4 manik besar atau potongan kain | `TK-A1-M5` |
| 18 | `tk-a2-m6` | `TK-A2-M6` | Pola di sekitar kita | `FF-DL-b`, `FF-DL-e` | jalan keliling lingkungan sekolah; P5 kertas dan krayon | `TK-A2-M5`, `TK-A1-M6` |
| 19 | `tk-a2-m7` | `TK-A2-M7` | Sebab dan akibat | `FF-DL-c` | P1 kartu sebab-akibat; air, spons, nampan (percobaan diawasi) | — |
| 20 | `tk-a2-m8` | `TK-A2-M8` | Kenapa aku memilih ini? | `FF-DL-c` | P2 kisi dengan dua jalur pilihan | `TK-A2-M4` |
| 21 | `tk-a2-m9` | `TK-A2-M9` | Bagi-bagi tugas | `FF-DL-c`, `FF-JD-c` | P4 mainan kelas dan dua kotak (biru, merah) | `TK-A1-M7` |
| 22 | `tk-a2-m10` | `TK-A2-M10` | Merancang kipas | `FF-DL-d`, `FF-JD-e` | P5 kertas lipat atau karton | `TK-A1-M10` |
| 23 | `tk-a2-m11` | `TK-A2-M11` | Permainan besar: raja urutan | `FF-JD-c`, `FF-DL-b` | P1 kartu urutan besar | `TK-A2-M1`, `TK-A2-M2` |
| 24 | `tk-a2-m12` | `TK-A2-M12` | Pameran dan cerita | `FF-DL-a` | P1 dan P5 karya semester ini | `TK-A2-M1 sampai M11` |
| 25 | `tk-b1-m1` | `TK-B1-M1` | Tiga perintah arah | `FF-DL-b`, `FF-DL-d` | P2 kisi 4x4; P3 kartu panah | `TK-A2-M3`, `TK-A2-M4` |
| 26 | `tk-b1-m2` | `TK-B1-M2` | Menyusun program untuk teman | `FF-DL-d`, `FF-JD-c` | P3 kartu panah; P2 kisi | `TK-B1-M1` |
| 27 | `tk-b1-m3` | `TK-B1-M3` | Program salah, perbaiki! | `FF-DL-c` | P3 program kartu yang disiapkan guru dengan satu kartu keliru | `TK-B1-M2`, `TK-A2-M2` |
| 28 | `tk-b1-m4` | `TK-B1-M4` | Pola kotak | `FF-DL-b` | P2 karpet kotak atau kisi lantai; P4 potongan warna | `TK-A2-M5` |
| 29 | `tk-b1-m5` | `TK-B1-M5` | Ulangi dua kali | `FF-DL-b`, `FF-DL-d` | P3 kartu "ulang x2"; tepuk | `TK-B1-M2`, `TK-A1-M6` |
| 30 | `tk-b1-m6` | `TK-B1-M6` | Lagu yang berulang | `FF-DL-b`, `FF-DL-e` | P8 lagu dengan bagian yang berulang (dinyanyikan, tanpa perangkat) | `TK-B1-M5` |
| 31 | `tk-b1-m7` | `TK-B1-M7` | Dua aturan | `FF-DL-b`, `FF-DL-c` | P7 dua hula hoop yang berpotongan; P4 benda bahan bekas | `TK-A1-M7`, `TK-A1-M8` |
| 32 | `tk-b1-m8` | `TK-B1-M8` | Gambar data | `FF-DL-b` | P5 stiker cuaca atau tanda gambar; kertas besar | `TK-A1-M7` |
| 33 | `tk-b1-m9` | `TK-B1-M9` | Alat dan mesin sederhana | `FF-DL-d` | P9 pompa sepeda, roda, tuas sederhana (diawasi guru) | `TK-A1-M9` |
| 34 | `tk-b1-m10` | `TK-B1-M10` | Mencari informasi bersama | `FF-DL-a`, `FF-DL-d` | P10 pojok buku dan gambar | — |
| 35 | `tk-b1-m11` | `TK-B1-M11` | Permainan besar: peta harta | `FF-DL-c`, `FF-JD-c` | P2 kisi 5x5; P6 rintangan; P3 kartu | `TK-B1-M2`, `TK-B1-M3`, `TK-B1-M5` |
| 36 | `tk-b1-m12` | `TK-B1-M12` | Pameran dan cerita | `FF-DL-a` | P1 dan P5 karya semester ini | `TK-B1-M1 sampai M11` |
| 37 | `tk-b2-m1` | `TK-B2-M1` | Maju, belok, ulangi | `FF-DL-b`, `FF-DL-d` | P2 kisi 5x5; P3 kartu panah dan kartu ulang | `TK-B1-M2`, `TK-B1-M5` |
| 38 | `tk-b2-m2` | `TK-B2-M2` | Dua jalan, mana lebih pendek? | `FF-DL-c` | P3 dua program kartu untuk tujuan yang sama | `TK-B2-M1`, `TK-B1-M3` |
| 39 | `tk-b2-m3` | `TK-B2-M3` | Hambatan di jalan | `FF-DL-c`, `FF-DL-d` | P2 kisi; P6 balok sebagai rintangan | `TK-B2-M1` |
| 40 | `tk-b2-m4` | `TK-B2-M4` | Cari kesalahan program teman | `FF-DL-c`, `FF-JD-c` | P3 program kartu teman; kartu "tanya dulu" | `TK-B2-M2`, `TK-B1-M3` |
| 41 | `tk-b2-m5` | `TK-B2-M5` | Memecah pekerjaan besar | `FF-DL-c`, `FF-JD-c` | P6 balok; P5 kertas rencana | `TK-A2-M9` |
| 42 | `tk-b2-m6` | `TK-B2-M6` | Rancang lalu bangun | `FF-DL-d` | P5 gambar rencana; P6 balok | `TK-B2-M5` |
| 43 | `tk-b2-m7` | `TK-B2-M7` | Gambar jadi simbol | `FF-DL-a`, `FF-DL-d` | P3 kartu simbol buatan kelas (panah, bintang, rumah); P5 krayon | `TK-B1-M2` |
| 44 | `tk-b2-m8` | `TK-B2-M8` | Cerita berurutan | `FF-DL-a`, `FF-DL-e` | P5 kertas dan krayon; guru menjilid halaman | `TK-A1-M2`, `TK-A2-M1` |
| 45 | `tk-b2-m9` | `TK-B2-M9` | Alat digital dengan aman | `FF-DL-d` | boneka untuk cerita; perangkat milik guru dipegang guru dan tidak dinyalakan | — |
| 46 | `tk-b2-m10` | `TK-B2-M10` | Blok bergambar | `FF-DL-b`, `FF-DL-d` | P3 blok kartu kertas (gerak, bunyi, ulang) | `TK-B2-M7`, `TK-B1-M5` |
| 47 | `tk-b2-m11` | `TK-B2-M11` | Permainan besar: pameran untuk keluarga | `FF-DL-a`, `FF-JD-c` | pojok-pojok permainan dari minggu-minggu sebelumnya; undangan untuk keluarga | `TK-B2-M1 sampai M10` |
| 48 | `tk-b2-m12` | `TK-B2-M12` | Refleksi dan bekal SD | `FF-DL-a` | P5 kertas gambar; ruang melingkar untuk refleksi | `TK-B2-M1 sampai M11` |

**Paket bahan.**

| Kode | Isi | Catatan keselamatan |
| --- | --- | --- |
| P1 | Kartu gambar (karton, gambar buatan guru atau bebas hak) | Tanpa wajah atau foto anak nyata. |
| P2 | Kisi lantai (selotip kertas atau kapur; 3x3 sampai 5x5) | Selotip dilepas dari lantai licin; jalur tidak menghalangi pintu. |
| P3 | Kartu panah dan perintah (maju, belok kiri, belok kanan, berhenti, ulang) | Tepi karton ditumpulkan. |
| P4 | Benda bahan bekas aman (tutup botol, kardus, kain perca, manik besar) | Guru menilai ukuran: tidak ada yang bisa tertelan; diawasi terus. |
| P5 | Alat gambar dan tempel (kertas, krayon, lem, stiker, pita) | Lem dan krayon tidak beracun. |
| P6 | Balok bangunan | Tumpukan rendah. |
| P7 | Hula hoop atau tali untuk lingkaran sortir | Simpul longgar, tanpa tali panjang di leher. |
| P8 | Tepuk, hentak, nyanyi (tanpa perangkat) | Volume wajar. |
| P9 | Alat sederhana (sendok, sikat, gunting anak, kertas lipat, pompa sepeda) | Gunting anak dan pompa hanya dengan pengawasan penuh. |
| P10 | Buku dan cerita (buku bergambar, cerita buatan guru) | Tokoh fiktif. |

## 4. Templat panduan guru

Panjang sasaran **400 sampai 800 kata**. Judul bagian dipakai **persis
sama** di semua 48 panduan, dalam urutan ini. Bagian 1 sampai 8 wajib;
`## Catatan untuk orang tua` dan `## Rujukan` opsional (`## Rujukan` wajib
bila panduan mengutip sumber luar).

| Bagian | Isi dan aturan | Label | Rujukan |
| --- | --- | --- | --- |
| Judul `#` | Judul modul = tema silabus; di bawahnya satu baris: kode minggu, kelompok (TK A atau TK B), lama sesi (20 atau 30 menit), irisan CP. | `T` | `weeks.json`; silabus 3.1 |
| `## Tujuan` | Satu kalimat: "Anak dapat" + kolom `objective` silabus apa adanya. Tidak menambah tujuan lain. Satu konsep per sesi. | `T` | silabus 3.3; riset 5 (tanpa klaim manfaat luas) |
| `## Alat dan bahan` | Daftar dari kolom `activity`; bahan konkret dan murah; peringatan benda kecil; tanpa perangkat. | `M` untuk manfaat bahan fisik; `T` untuk "konkret sebelum simbol" | Scherer dkk. (2020) di riset 6.4 (fisikalitas dan visualisasi efektif, beda antarpendekatan "marginal"); silabus 2.1 butir 4 |
| `## Ingat kembali` | 2 sampai 4 menit pembuka. Guru mengajak anak **mengingat tanpa melihat kartu** satu hal dari minggu sebelumnya lewat gerak, tebakan, atau satu pertanyaan terbuka; bila ada, tambah satu hal dari 2 sampai 4 minggu sebelumnya (berjarak). Pada minggu pertama semester: ingat pengalaman sehari-hari yang terkait. Guru menjawab dengan mengulang kalimat yang benar dengan lembut; tidak ada benar-salah atau nilai. | `K` untuk prinsip, `M` untuk usia 4 sampai 6 | riset 3.1, 3.2 (`[A]`); batas: bukti terkuat untuk materi verbal dan fakta, studi kelas hampir semuanya di negara WEIRD; riset 7: tidak ada studi TK |
| `## Kegiatan inti` | Langkah bermain bertempo menit sesuai sesi. Pola tetap: (1) guru **mencontohkan** dengan tubuh atau benda; (2) anak melakukan **bersama**; (3) anak **bergantian memimpin**. Urutan konkret, lalu gambar, lalu simbol. Petunjuk bertahap, bukan penemuan tanpa bantuan. Satu momen **membandingkan dua contoh** berdampingan ("apa yang sama? apa yang beda?"), lalu guru memberi nama relasinya. | `K` untuk bimbingan; `M` untuk membandingkan dua contoh | riset 3.5 (Alfieri dkk., 2011 `[A]`: penemuan tanpa bantuan kalah, dengan bantuan menang); riset 4.2 (Christie dan Gentner, 2010: prasekolah belajar relasi baru dengan membandingkan dua contoh, pola spasial) dan 4.3 (belum ada studi pada pemrograman, jadi penerapannya `[inferensi]`) |
| `## Pertanyaan pemandu` | Tiga sampai lima pertanyaan terbuka dalam **bahasa relasional**: guru memakai nama relasi secara konsisten ("lebih dulu dari", "sesudah", "sama seperti", "berbeda dari", "lebih banyak dari", "di antara"). Pertanyaan "mengapa" secukupnya. | `M` | riset 4.2 dan 7 (Gentner dkk., 2011; Christie dan Gentner, 2014); riset 3.6 (elaborasi, `[B]` sedang); riset 8.4 baris tk |
| `## Tanda kemajuan` | Salin kolom `observation` silabus; ditulis sebagai ceklis "terlihat" dan "belum terlihat", **tanpa skor** dan tanpa label untuk anak. Catatan anekdot tiga sampai lima kalimat disimpan di sekolah, bukan di repositori. | `T`; `K` untuk "kinerja saat latihan bukan ukuran belajar" | silabus 6.1 (kutipan panduan resmi); riset 3.9 |
| `## Variasi dan dukungan` | Dukungan bertahap (tunjuk, contohkan, minta anak mencoba), tantangan tambahan, adaptasi untuk anak yang belum berbicara (menunjuk), motorik, bahasa daerah. Hindari lomba; "rapi, bukan cepat". Dukungan dipudarkan sesuai kemajuan. | `K` untuk contoh lalu dipudarkan pada pemula; `M` untuk usia ini | riset 3.4 (`[B]` pemula), 3.5; riset 3.9 (kesulitan yang diinginkan, `[B]`/`[A]`) |
| `## Keselamatan dan privasi` | Wajib: benda kecil, gunting anak, air dan lantai; tanpa foto, video, atau suara anak; tanpa nama anak; tanpa layar. | `T` | silabus 6.2 dan 7.1; ADR-0004 |
| `## Catatan untuk orang tua` (opsional) | Dua sampai tiga kalimat: satu ajakan permainan **tanpa layar** di rumah; tidak wajib dan tidak diperiksa; tidak menjanjikan manfaat luas. | `T` untuk isi; `M` untuk manfaatnya | silabus 6.3; Kepmendikdasmen 127/P/2025 butir 5 (melibatkan orang tua); WHO 2019 (waktu layar) |
| `## Rujukan` (opsional) | Hanya bila ada tautan luar; format di bagian 6. | `T` | bagian 6 dokumen ini |

**Aturan penulisan.** Bahasa Indonesia sederhana; kalimat guru singkat;
contoh kalimat guru boleh ditulis dalam tanda petik. Tidak memakai istilah
"koding" untuk anak; gunakan "permainan robot", "kartu perintah".
Kata terlarang diperiksa di gerbang G6 (bagian 8).

## 5. Templat lembar anak

Panjang sasaran **100 sampai 250 kata**. Anak TK belum membaca lancar: lembar
dibaca guru dengan suara; kata di lembar hanya penanda. Karena repositori
berisi Markdown, gambar **dideskripsikan dengan teks** dengan format
`[Gambar: ...]` (lihat pertanyaan keputusan Q1).

| Unsur | Aturan | Label | Rujukan |
| --- | --- | --- | --- |
| Judul `#` | Judul modul, tanpa nomor ujian atau peringkat. | `T` | |
| `[Gambar: ...]` | Deskripsi gambar yang cukup rinci agar guru dapat menggambar atau memilih gambar bebas hak; gambar dan kata berdampingan. | `M` | riset 3.7 (dual coding, `[D]`/`[B]`; rincian per desain `[belum terverifikasi]`) |
| Satu tugas | Satu tugas inti per lembar, satu kegiatan tindakan (tempel, lingkari, tunjuk, gambar). | `M` | riset 3.4 (beban kognitif, `[B]` untuk pemula pada domain terstruktur) |
| `Kata guru:` | Satu sampai tiga kalimat pendek yang dibacakan guru, kata kerja pertama. | `T` | silabus 2.1 butir 1 (bermain, tanpa latihan nirkonteks) |
| `Kotak jawab` | Petak tempel, lingkaran, atau jalur; tidak ada garis tulis. | `M` | |
| `Ceritakan` | Satu kotak kosong untuk menggambar atau bercerita ke teman atau guru; bahasa relasional. | `M` | riset 4.2 |
| Larangan | **Tanpa kolom nama, tanggal, kelas, atau identitas anak**; tanpa foto; tanpa skor, bintang peringkat, atau kata "benar" dan "salah". Penanda kertas milik anak diurus guru di sekolah, di luar repositori. | `T` | ADR-0004; silabus 6.1 dan 7.1 |
| `Catatan cetak` | Satu baris untuk guru (tidak dicetak): ukuran, bahan, bagian yang digunting. | `T` | |

## 6. Aturan rujukan

1. **Hanya sumber resmi atau terverifikasi, dan hanya `https://`.** Tautan
   `http://`, pemendek tautan, dan media sosial tidak dipakai.
2. **Tiap tautan dibuka pada hari penulisan** dan tanggalnya dicatat di
   `## Rujukan` (`dibuka 2026-MM-DD`). Tautan yang tidak terbuka ditulis
   `[belum terverifikasi]` atau dibuang.
3. **Lisensi dicatat.** Cantumkan lisensi atau ketentuan pada baris rujukan
   dan hanya memakai sesuai ketentuan itu.
4. **Dokumen pemerintah** dikutip pendek dengan sumber; tidak disalin utuh.
5. **CS Unplugged hanya ditautkan dan diadaptasi ide-nya; teks, gambar, atau
   lembar kerjanya tidak disalin.** Kegiatan ditulis ulang dengan kata
   penyusun dan bahan lokal, sesuai keputusan Q7 silabus.
6. Tidak ada merek, aplikasi, atau produk berbayar yang dipromosikan; program
   ini tanpa layar.
7. Klaim riset merujuk ke bagian riset kognitif repositori, bukan ke ringkasan
   populer. Rujukan jurnal memakai DOI `https://doi.org/...` dari daftar
   pustaka riset kognitif (status `T-A` atau `T-M` mengikuti dokumen itu).

**Sumber yang boleh dipakai dan cek lisensinya (dibuka 2026-11-19).**

| Sumber | Dipakai untuk | Status dan lisensi |
| --- | --- | --- |
| Kepka BSKAP 046/H/KR/2025, Lampiran I Fase Fondasi: https://bpmpbabel.kemendikdasmen.go.id/PPID/wp-content/uploads/2025/07/KepKaBSKAP-046_2025-ttg-CP.pdf | Kutipan CP | Terbuka (HTTP 200 dicek 2026-11-19); dokumen peraturan pemerintah, kutip pendek. |
| Kepmendikdasmen 127/P/2025: https://www.kemendikdasmen.go.id/pengumuman/13654-kepmendikdasmen-tentang-pedoman-implementasi-koding-dan-kecerdasan-artifisial-pada-paud-dikdasmen | Dasar kebijakan koding dan KA di PAUD, cara pelaksanaan unplugged | Halaman pengumuman resmi; salinan PDF ada di `riset.md` bagian 2.2. |
| WHO, siaran pers 24 April 2019: https://www.who.int/news/item/24-04-2019-to-grow-up-healthy-children-need-to-sit-less-and-play-more | Catatan orang tua tentang waktu layar | Terbuka (HTTP 200 dicek 2026-11-19); ketentuan penggunaan situs WHO berlaku, hanya ditautkan. |
| CS Unplugged: https://www.csunplugged.org/en/ | Rujukan ide kegiatan | Halaman menyatakan konten situs dibagikan di bawah **Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)**, dibaca langsung 2026-11-19. Hanya ditautkan dan diadaptasi ide-nya (lihat Q2). |
| Christie dan Gentner (2010), doi 10.1080/15248371003700015 | Dasar membandingkan dua contoh | `T-A` di riset kognitif 4.2; hanya ditautkan lewat DOI. |
| `docs/programs/tk-coding/riset.md` | Konteks regulasi dan alat | Dokumen internal repositori. |

**Koreksi lisensi CS Unplugged.** Pesan penugasan menyebut CC BY-NC-SA;
halaman resmi CS Unplugged yang dibuka 2026-11-19 menyebut **CC BY-SA 4.0**
(tanpa klausul NonCommercial), sesuai catatan `riset.md` TK bagian 6.
Rancangan ini mengikuti halaman resmi. Pemilik diminta memeriksa ulang bila
punya informasi lain; hasilnya memengaruhi Q2.

Panduan Mata Pelajaran Koding dan KA (12 September 2025) **tidak** dipakai
sebagai sumber karena tidak terbuka dari lingkungan penyusun
(`riset.md` bagian 2.5, `[belum terverifikasi]`). ScratchJr dan alat berlayar
lain tidak dirujuk karena program tanpa layar.

## 7. Gelombang penulisan

Satu agent mengerjakan **sekitar 6 minggu** (12 berkas: 6 panduan dan 6
lembar). Agent penulis memakai `pelaksana-kompleks` (Sonnet, `medium`)
karena unsurnya bergantung pada bukti dan keselamatan anak; pemeriksaan
mekanis (hitung kata, cek judul, cek tautan) cocok untuk `pelaksana-sederhana`.
Dua agent dalam satu gelombang mengerjakan berkas yang **tidak
bertumpang-tindih**; indeks dan semua dokumen turunan hanya disentuh
orchestrator, sesudah gelombang selesai.

| Gelombang | Isi | Tugas (agent) | Berkas | Ketergantungan |
| --- | --- | --- | --- | --- |
| 0 | Persetujuan rancangan, pilot dipindah ke `content/` | orchestrator | 2 | Jawaban pemilik atas Q1 sampai Q3. |
| 1 | Semester A1 (TK A) | T1: `tk-a1-m1` sampai `m6`; T2: `tk-a1-m7` sampai `m12` | 24 | Gelombang 0 dan skema indeks. |
| 2 | Semester A2 (TK A) | T3: `tk-a2-m1` sampai `m6`; T4: `tk-a2-m7` sampai `m12` | 24 | Gelombang 1 lolos gerbang (kosakata relasional dan simbol arah dipakai ulang). |
| 3 | Semester B1 (TK B) | T5: `tk-b1-m1` sampai `m6`; T6: `tk-b1-m7` sampai `m12` | 24 | Gelombang 2. |
| 4 | Semester B2 (TK B) | T7: `tk-b2-m1` sampai `m6`; T8: `tk-b2-m7` sampai `m12` | 24 | Gelombang 3. |
| 5 | Pembersihan | orchestrator | | Semua gelombang; indeks, validasi, dokumen. |

Urutan kronologis dipilih karena "Ingat kembali" menunjuk minggu sebelumnya
dan kosakata (maju, belok, ulang) berkembang bertahap. Tiap gelombang
menjadi satu PR sendiri (unit kerja atomik); apakah gelombang berikutnya
menunggu tinjauan manusia adalah Q1.

## 8. Gerbang mutu

Gerbang berlaku **per modul** dan dijalankan orchestrator sebelum
gelombang digabung. Laporan agent bukan bukti; orchestrator menjalankannya
sendiri.

| Gerbang | Pemeriksaan | Cara | Gagal bila |
| --- | --- | --- | --- |
| G1 Struktur | Panduan memuat judul `##` wajib dengan nama dan urutan templat; lembar memuat unsur wajib | Perintah `grep` terdokumentasi di PR gelombang (belum ada skrip; usulan terpisah: `scripts/check-module-structure.ts`, di luar rancangan ini) | Judul hilang, salah nama, atau urutan berbeda |
| G2 Panjang | Panduan 400 sampai 800 kata; lembar 100 sampai 250 kata | `wc -w` | Di luar rentang lebih dari 10 persen |
| G3 Kesetiaan silabus | Judul, tujuan, dan tanda kemajuan sesuai `weeks.json`; id dan kode minggu cocok; `cpOverlap` sama dengan `cp` di `weeks.json`; kata "irisan", bukan "memenuhi" CP | Skrip pembanding sementara dan `bun run validate`; `bun run check:fidelity --program tk-coding` | Ada selisih |
| G4 Privasi | Tanpa kolom nama, tanggal, kelas; tanpa foto; tokoh fiktif; tanpa data nyata | `grep` pola `Nama`, `Tanggal`, `Kelas:`, `foto`; `bun run privacy-check` (khusus `data/`) | Ada temuan |
| G5 Tanpa layar | Tidak ada langkah yang memakai perangkat murid; perangkat guru tidak dinyalakan pada bawaan | Baca; `grep` kata layar, tablet, aplikasi | Ada langkah berlayar |
| G6 Klaim | Tidak ada frasa manfaat luas atau mitos riset 5: "meningkatkan kecerdasan", "IQ", "otak kiri", "otak kanan", "gaya belajar", persentase retensi, "sedini mungkin" | `grep` daftar kata | Ada temuan |
| G7 Rujukan | Hanya `https://`; tiap tautan terbuka (HTTP 200) pada tanggal tulis; lisensi tercatat; tidak ada salinan CS Unplugged | `curl -I` dan pembacaan | Tautan mati, tanpa tanggal, atau teks tersalin |
| G8 Keselamatan | `## Keselamatan dan privasi` menyebut risiko bahan kegiatan itu | Baca | Risiko jelas tidak disebut |
| G9 Format dan uji | `bun run format:check`, `lint`, `assist:check`, `typecheck`, `bun test`, `bun run build`, `check:module-code` (tanpa blok `cpp`, lolos sendirinya) | Perintah | Ada yang gagal |
| G10 Konsistensi | Kata arah dan perintah seragam (maju, belok kiri, belok kanan, berhenti, ulang) dan selaras dengan SD (simbol bersama, keputusan 5 silabus SD) | Baca silang | Istilah berbeda tanpa alasan |
| G11 Peninjauan manusia | Pemilik atau peninjau yang ia tunjuk memeriksa; checklist: keselamatan, usia, bahasa, akurasi, klaim. Status naik hanya oleh manusia (ADR-0007) | Review PR | Tidak ada tinjauan |

Setelah indeks ada, `bun run validate` dan `bun run check:fidelity
--program tk-coding` ikut dijalankan; mereka memeriksa rujukan silang modul ke
minggu.

## 9. Pilot

Satu modul contoh lengkap untuk minggu pertama, `tk-a1-m1` (Kegiatan
sehari-hariku), ada di
[`rancangan-modul-contoh/`](rancangan-modul-contoh/):

- [`panduan-tk-a1-m1.md`](rancangan-modul-contoh/panduan-tk-a1-m1.md)
- [`lembar-tk-a1-m1.md`](rancangan-modul-contoh/lembar-tk-a1-m1.md)

Pilot dipakai untuk menguji templat (panjang, judul, label, bahasa). Setelah
rancangan disetujui, pilot dipindah ke `content/tk-coding/` sebagai bagian
gelombang 1; sebelum itu ia berada di `docs/` dan **bukan** modul.

## 10. Pertanyaan keputusan untuk pemilik

Disajikan oleh orchestrator sebagai dialog pilihan baku; opsi pertama adalah
rekomendasi.

**Q1. Apakah penulisan menunggu tinjauan manusia di tengah jalan?**

| Opsi | Konsekuensi |
| --- | --- |
| a. **(Disarankan)** Satu PR per gelombang, penulisan lanjut berurutan; tinjauan pemilik atau peninjau berjalan paralel per PR | Tidak ada jeda; temuan tinjauan gelombang 1 diterapkan ke gelombang berikutnya dan diperbaiki mundur bila perlu; risiko pengerjaan ulang terbatas karena templat sudah diuji pilot. |
| b. Berhenti setelah gelombang 1 (semester A1) sampai ditinjau | Mutu terbaik di awal dan biaya ulang kecil; menunda ketiga gelombang lain sampai ada peninjau. |
| c. Tulis semua 48 modul, tinjau sekali di akhir | Tercepat; bila templat ternyata bermasalah, 96 berkas harus diperbaiki sekaligus. |

**Q2. Seberapa dekat adaptasi dari CS Unplugged?**

| Opsi | Konsekuensi |
| --- | --- |
| a. **(Disarankan)** Hanya tautan dan ide; semua kegiatan ditulis ulang dengan kata dan bahan lokal | Konsisten dengan keputusan Q7 silabus TK; tanpa kewajiban lisensi turunan; kegiatan kurang "siap pakai" dibanding sumber aslinya. |
| b. Adaptasi dekat dengan atribusi | Lebih kaya, tetapi CC BY-SA 4.0 mewajibkan atribusi dan lisensi sama pada berkas turunan; repositori ini MIT (software), jadi berkas itu perlu penandaan lisensi tersendiri dan keputusan pemilik per berkas. |

**Q3. Bagaimana lembar anak dilengkapi gambar?**

| Opsi | Konsekuensi |
| --- | --- |
| a. **(Disarankan)** Lembar hanya berisi deskripsi gambar `[Gambar: ...]`; guru menggambar atau memilih gambar bebas hak sendiri | Tanpa risiko lisensi atau privasi dan tanpa aset biner; guru perlu menyiapkan gambar, jadi lembar belum siap cetak. |
| b. Tambah gambar vektor (SVG) buatan penyusun di folder aset di bawah `content/tk-coding/` | Siap cetak; perlu issue pelingkup folder baru, tinjauan visual dan lisensi gambar, dan kebijakan bahwa gambar tidak dibuat dari data anak. |
| c. Tautkan gambar bebas hak pihak ketiga | Cepat; tautan bisa mati dan lisensinya harus dicek per gambar. |

## 11. Temuan dan batas

- `docs/programs/tk-coding/README.md` ("Daftar berkas") dan
  `docs/programs/README.md` (tabel program, "Belum ada `content/`") belum
  menyebut dokumen ini; diperbarui orchestrator, di luar scope rancangan.
- Pada `TK-B2-M9` dan `TK-B2-M10`, kolom kegiatan memuat opsi layar yang
  bertentangan dengan keputusan "seluruh rencana tanpa layar" (README bagian
  keputusan pemilik, Q1). Rancangan ini menulis versi bawaan tanpa layar.
- Riset kognitif 8.4 ditulis sebelum silabus disetujui dan belum dicocokkan
  ulang; rancangan ini memakainya hanya sebagai penuntun `M`.
- Angka 20 dan 30 menit adalah `[asumsi]` silabus; panjang kegiatan inti di
  modul mengikutinya.

## Changelog

| Versi | Tanggal | Perubahan |
| --- | --- | --- |
| v0.1.0 | 2026-11-19 | Draf awal rancangan modul TK: pemetaan 48 minggu, templat panduan dan lembar, aturan rujukan, gelombang, gerbang mutu, tiga pertanyaan keputusan, dan pilot `tk-a1-m1`. |
| v0.1.1 | 2026-11-19 | Sinkron dokumen (#124): catatan status; modul, lembar, dan gambar SVG kini ada di `content/tk-coding/`; pilot menjadi riwayat. Isi rancangan tidak berubah. |
