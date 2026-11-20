# Program Pembelajaran Coding SD (`sd-coding`)

- **Version:** v1.3.0
- **Last updated:** 2026-11-20
- **Status:** Silabus v1.0 DISETUJUI pemilik program (2026-11-19) untuk kelas 1-6 beserta rekomendasi penyusun (issue #128); sudah dikodekan ke `data/sd-coding/` (lima berkas) dan terdaftar di `data/programs.json` ([ADR-0006](../../architecture/adr/0006-multi-program-repository.md), [ADR-0008](../../architecture/adr/0008-skema-khusus-per-program.md)). Modul belajar (tidak termasuk persetujuan silabus; [ADR-0007](../../architecture/adr/0007-authored-learning-content.md)): 168 modul draf (panduan guru) di `content/sd-coding/modules/`, 168 lembar anak di `content/sd-coding/lembar/`, dan 168 gambar SVG di `content/sd-coding/gambar/`, terindeks di `data/sd-coding/modules.json`; semuanya berstatus `draf` dan belum ditinjau pemilik (per 2026-11-19). Revisi v1.1.0 (jembatan dari TK dan ke SMP, bagian 7) disetujui lewat keputusan pemilik 2026-11-19 (issue #177).
- **Changeset:** Silabus disetujui dan dikodekan: `silabus-draf.md` menjadi `silabus.md` v1.0.0 dengan keputusan pemilik menggantikan pertanyaan terbuka, kutipan CP Fase C dikoreksi dengan teks SK 046/H/KR/2025, corpus `data/sd-coding/` dan pendaftaran program (issue #128).

> Isi folder ini adalah konten **karangan** (*authored*) menurut
> [ADR-0007](../../architecture/adr/0007-authored-learning-content.md),
> bukan dokumen pemerintah dan bukan silabus resmi. Silabus disetujui
> pemilik pada 2026-11-19; agent tidak pernah menyetujui atau mencatat
> persetujuan atas nama pemilik. Program ini tidak menyimpan data murid
> ([ADR-0004](../../architecture/adr/0004-no-learner-personal-data.md)).

## Tujuan program

Menyediakan rancangan pembelajaran coding untuk SD kelas 1-6 yang berpijak
pada capaian pembelajaran (CP) mata pelajaran pilihan Koding dan Kecerdasan
Artifisial (KKA) Fase C (kelas V dan VI SD/MI), dengan kelas 1-4 sebagai
pengantar opsional di luar CP. Pendekatan: **tanpa layar** sebagai inti
(sesuai panduan resmi: "unplugged dan berbasis permainan"), perangkat
sebagai opsi, tanpa akun pribadi murid.

| Tahap | Kelas | Status resmi | Jam per minggu |
| --- | --- | --- | --- |
| 1. Pengenalan | 1-3 | Di luar struktur KKA; opsional | 1 JP `[asumsi]` |
| 2. Pengantar lanjutan | 4 | Di luar struktur KKA; opsional | 1 JP `[asumsi]` |
| 3. Inti KKA | 5-6 | Fase C; mapel pilihan (Permendikdasmen 13/2025) | 2 JP (terverifikasi) |

## Temuan utama

- KKA di SD adalah mata pelajaran **pilihan**, hanya **kelas V dan VI**,
  2 JP per minggu, mulai tahun ajaran 2025-2026 secara bertahap
  (terverifikasi dari teks Permendikdasmen 13/2025).
- Kelas I-IV tidak punya mapel KKA; Informatika bukan mapel SD.
- CP Fase C terdiri dari empat elemen (Berpikir Komputasional, Literasi
  Digital, Literasi dan Etika KA, Pemanfaatan dan Pengembangan KA) dan dikutip
  persis dari teks SK Kepala BSKAP 046/H/KR/2025 (dicocokkan 2026-11-19;
  alamat asal salinan SK `[terverifikasi 2026-11-19]`, subdomain resmi `kemendikdasmen.go.id`); PDF panduan **belum terbuka**.
- Tidak ada jembatan OSN untuk SD (tidak ada Informatika di SD; dokumen OSN
  SD tidak terbuka, `[belum terverifikasi]`).
- Rekomendasi alat: unplugged inti + blok visual opsional di kelas 6.

## Keputusan pemilik

Pada 2026-11-19 pemilik menyetujui draf beserta rekomendasi penyusun untuk
ketujuh pertanyaan terbuka (`silabus.md` bagian 13): sumber CP resmi (1,
dipenuhi dengan SK 046/H/KR/2025), cakupan kelas 1-6 (2), alat kelas 5-6:
unplugged inti dengan blok visual opsional di kelas 6 (3), cara kelas 1-4
diselenggarakan: netral, keputusan sekolah (4), penyelarasan dengan
`tk-coding` dan `smp-coding` setelah keduanya tersedia (5), tanpa jembatan
OSN (6), modul pendamping guru kelak sebagai draf (7).

## Corpus

Silabus dikodekan ke `data/sd-coding/` (skema `src/schema/sd-*.ts`, audit
`src/domain/sd-corpus-audit.ts`, fidelity `src/cli/fidelity/sd-coding.ts`):

| Berkas | Isi | Bagian silabus |
| --- | --- | --- |
| `cp-elements.json` | 4 kutipan CP Fase C dan 16 butir `C-<elemen>-<huruf>` | 1.3, 4 |
| `structure.json` | 3 tahap, struktur waktu dan beban JP | 2 |
| `weeks.json` | 168 minggu `SD<kelas>-<semester>-M<n>` (kelas 1-6, 2 semester, 14 minggu) | 5 |
| `cp-mapping.json` | 16 pemetaan butir CP ke minggu pemenuhan (hanya kelas 5-6; butir `P-` pengantar tidak dihitung) | 6 |
| `bridges.json` | jembatan TK ke kelas 1, kelas 6 ke SMP, ke SMA, dan penyataan tanpa jembatan OSN | 7, 8 |

## Daftar berkas

| Berkas | Isi |
| --- | --- |
| `README.md` | Dokumen ini: status, tujuan, temuan, keputusan pemilik, corpus, berkas, changelog. |
| `riset.md` | Riset v0.2.0: sumber resmi yang benar-benar dibuka (URL dan tanggal akses 2026-11-19), kebijakan KKA di SD, CP Fase C beserta pencocokan dengan SK 046/H/KR/2025 (bagian 3.5), posisi Informatika, kajian alat, risiko privasi anak. |
| `rancangan-modul.md` | Rancangan modul belajar (DRAF, v0.1.0): pemetaan 168 minggu, templat panduan guru dan lembar anak, gelombang penulisan, gerbang mutu. Rancangan dipakai untuk menulis modul yang kini ada di `content/sd-coding/`. |
| `rancangan-modul-contoh/` | Riwayat: modul pilot (`panduan-sd1-1-m1.md`, `lembar-sd1-1-m1.md`) sebelum modul sebenarnya ditulis; modul nyatanya `content/sd-coding/modules/sd1-1-m1.md` dan `content/sd-coding/lembar/sd1-1-m1.md`. |
| `silabus.md` | Silabus v1.1.0 (disetujui pemilik 2026-11-19): sumber dan kutipan CP dari SK, struktur waktu, tujuan, pemetaan CP (kode butir buatan), rencana mingguan kelas 1-6, jembatan, asesmen, privasi dan etika AI, opsi alat, kebutuhan lab, keputusan pemilik. Sumber corpus `data/sd-coding/`. |

## Modul belajar

Status per 2026-11-19, dihitung dari repositori:

| Bagian | Jumlah | Lokasi |
| --- | --- | --- |
| Modul panduan guru | 168 (`sd1-1-m1` sampai `sd6-2-m14`; 6 kelas x 2 semester x 14 minggu) | `content/sd-coding/modules/<id>.md` |
| Lembar anak | 168 | `content/sd-coding/lembar/<id>.md` |
| Gambar SVG lembar | 168 | `content/sd-coding/gambar/` |
| Indeks | 168 entri, semuanya `disetujui` | `data/sd-coding/modules.json` (skema `src/schema/sd-module.ts`) |

Semua modul berstatus `disetujui` sejak 2026-11-20 atas keputusan pemilik program lewat dialog pilihan baku (#125), bukan hasil tinjauan isi per modul; butir yang perlu dicek dikumpulkan sebagai tindak lanjut revisi di
[`../catatan-tinjauan-modul.md`](../catatan-tinjauan-modul.md). Modul
mengikuti [`rancangan-modul.md`](rancangan-modul.md). Perintah:
`bun run check:learner-assets` (SVG dan tautan gambar lembar) dan
`osn render modul --program sd-coding --id <id> --lembar` (lembar anak).

## Changelog

| Versi | Tanggal | Perubahan |
| --- | --- | --- |
| v1.0.1 | 2026-11-19 | Silabus direvisi patch ke v1.0.1 (issue #165): kalimat status yang basi tentang program pasangannya diperbaiki; isi kurikulum dan corpus tidak berubah. |
| v1.0.2 | 2026-11-19 | Silabus direvisi patch ke v1.0.2: alamat asal salinan SK 046 terverifikasi (`riset.md` v0.2.2); isi kurikulum dan corpus tidak berubah. |
| v1.1.0 | 2026-11-19 | Revisi minor atas keputusan pemilik #177: bagian 7 (jembatan dari TK dan ke SMP) diganti: penempatan di dalam kelas (pengamatan awal tanpa tes, jalur padat, aturan keamanan tidak dipadatkan), 7.2 menyatakan yang tidak dijamin kelas 5-6; rencana minggu, CP, dan jam tidak berubah. |
| v1.2.0 | 2026-11-19 | Sinkron dokumen (#124): status modul belajar (168 modul draf, 168 lembar, 168 gambar SVG, indeks `modules.json`), `rancangan-modul.md` dan pilot masuk daftar berkas; isi silabus dan corpus tidak berubah. |
| v1.0.0 | 2026-11-19 | Silabus disetujui pemilik dan dikodekan ke `data/sd-coding/`; `silabus-draf.md` menjadi `silabus.md`; keputusan pemilik dicatat; CP dicocokkan dengan SK 046/H/KR/2025 (issue #128). |
| v0.1.0 | 2026-11-19 | Folder program dibuat: README, riset, dan draf silabus (issue #128). |
| v1.3.0 | 2026-11-20 | Pemilik menyetujui 168 modul belajar lewat dialog pilihan baku ("Setujui semua, catatan jadi tindak lanjut", #125): indeks `modules.json` berstatus `disetujui`; butir catatan tinjauan jadi tindak lanjut revisi; isi silabus dan corpus tidak berubah. |
