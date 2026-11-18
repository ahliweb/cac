# Program Pembelajaran Coding SD (`sd-coding`)

- **Version:** v0.1.0
- **Last updated:** 2026-11-19
- **Status:** DRAF (issue #128) — riset dan draf silabus; **belum disetujui pemilik**. Tidak ada `data/sd-coding/`, tidak ada entri di `data/programs.json`, dan tidak ada `content/sd-coding/` sampai pemilik menyetujui silabus ([ADR-0006](../../architecture/adr/0006-multiple-programmes.md), [ADR-0007](../../architecture/adr/0007-authored-learning-content.md)).

> Isi folder ini adalah konten **karangan** (*authored*) menurut
> [ADR-0007](../../architecture/adr/0007-authored-learning-content.md),
> bukan dokumen pemerintah dan bukan silabus resmi. Semua berstatus DRAF.
> Agent tidak pernah menyetujui atau mencatat persetujuan atas nama pemilik.
> Program ini tidak menyimpan data murid
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
  persis dari halaman UPT Ditjen GTK; PDF panduan dan SK **belum terbuka**.
- Tidak ada jembatan OSN untuk SD (tidak ada Informatika di SD; dokumen OSN
  SD tidak terbuka, `[belum terverifikasi]`).
- Rekomendasi alat: unplugged inti + blok visual opsional di kelas 6.

## Pertanyaan untuk pemilik

Tujuh pertanyaan terbuka dengan opsi dan rekomendasi ada di
[`silabus-draf.md`](silabus-draf.md) bagian 13: sumber CP resmi (1), cakupan
kelas (2), alat kelas 5-6 (3), cara kelas 1-4 diselenggarakan (4),
penyelarasan dengan `tk-coding` dan `smp-coding` (5), jembatan OSN dan
kompetisi (6), dukungan guru kelas (7). Hanya orchestrator yang
menyajikannya ke pemilik.

## Daftar berkas

| Berkas | Isi |
| --- | --- |
| `README.md` | Dokumen ini: status, tujuan, temuan, pertanyaan, berkas, changelog. |
| `riset.md` | Riset: sumber resmi yang benar-benar dibuka (URL dan tanggal akses 2026-11-19), kebijakan KKA di SD, CP Fase C, posisi Informatika, kajian alat, risiko privasi anak. Status DRAF. |
| `silabus-draf.md` | Draf silabus v0.1.0: sumber dan kutipan, struktur waktu, tujuan, pemetaan CP (kode butir buatan), rencana mingguan kelas 1-6, jembatan, asesmen, privasi dan etika AI, opsi alat dengan rekomendasi, kebutuhan lab, pertanyaan terbuka. Status DRAF. |

## Changelog

| Versi | Tanggal | Perubahan |
| --- | --- | --- |
| v0.1.0 | 2026-11-19 | Folder program dibuat: README, riset, dan draf silabus (issue #128). |
