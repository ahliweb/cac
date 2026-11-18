# Program Pembelajaran Coding TK/PAUD (`tk-coding`)

- **Version:** v0.1.0
- **Last updated:** 2026-11-19
- **Status:** DRAF. Belum disetujui pemilik program. Tidak ada `data/tk-coding/` dan tidak ada entri `data/programs.json` (ADR-0006).

> Isi folder ini adalah konten **karangan** (*authored*) menurut
> [ADR-0007](../../architecture/adr/0007-authored-learning-content.md):
> riset dan draf silabus pembelajaran coding untuk anak TK/PAUD (usia sekitar
> 4-6 tahun), disusun atas permintaan pemilik (issue #127). Ini bukan dokumen
> pemerintah. Program yang silabusnya masih draf tidak mendapat `data/` maupun
> entri registri sampai pemilik menyetujuinya
> ([ADR-0006](../../architecture/adr/0006-multi-program-repository.md)).
> Agent tidak pernah menyetujui draf atas nama pemilik. Repositori ini tidak
> memuat data anak ([ADR-0004](../../architecture/adr/0004-no-learner-personal-data.md)).

## Tujuan program

Merancang muatan **berpikir komputasional** untuk TK A dan TK B (istilah resmi
untuk PAUD) yang bermain, mayoritas tanpa layar, dan beririsan dengan Capaian
Pembelajaran Fase Fondasi (Kepka BSKAP 046/H/KR/2025). Dasar kebijakannya
Kepmendikdasmen 127/P/2025, yang menyebut "pembelajaran muatan pengembangan
berpikir komputasional pada pendidikan anak usia dini". Program ini menjadi
jembatan awal ke program SD (`sd-coding`, sedang disusun terpisah).

Temuan utama riset: CP Fase Fondasi tidak menyebut koding secara eksplisit;
irisannya adalah pola, klasifikasi, pemecahan masalah sederhana, rekayasa, dan
pemakaian teknologi secara aman. Rekomendasi draf: seluruh 48 minggu tanpa
perangkat, tanpa nilai angka, tanpa data anak di repositori.

## Daftar berkas

| Berkas | Isi |
| --- | --- |
| `README.md` | Dokumen ini: status, tujuan, daftar berkas, pertanyaan pemilik, changelog. |
| `riset.md` | Riset (v0.1.0): sumber resmi yang benar-benar dibuka beserta kutipan persis dan tanggal akses 2026-11-19, panduan waktu layar, pendekatan berpikir komputasional anak usia dini, risiko, dan sumber yang tidak dapat dibuka. |
| `silabus-draf.md` | Silabus draf v0.1.0-draf: sumber dan kutipan resmi, prinsip, struktur waktu, rencana 48 minggu (`TK-A1-M1` sampai `TK-B2-M12`), pemetaan irisan ke CP, jembatan ke SD, asesmen observasi, peran orang tua, privasi, sarana, opsi alat dengan rekomendasi, pertanyaan terbuka. |

## Pertanyaan untuk pemilik

Rincian opsi, konsekuensi, dan rekomendasi ada di
[`silabus-draf.md`](silabus-draf.md) bagian 9. Ringkasannya (rekomendasi
penyusun pertama):

| No. | Pertanyaan | Rekomendasi penyusun |
| --- | --- | --- |
| Q1 | Penggunaan layar | Seluruh rencana tanpa layar. |
| Q2 | Durasi dan frekuensi | Satu sesi per minggu: TK A 20 menit, TK B 30 menit, plus integrasi harian opsional. |
| Q3 | Cakupan usia | TK A dan TK B. |
| Q4 | Pembagian semester | 12 minggu per semester. |
| Q5 | Penamaan program | Id `tk-coding`, isi memakai istilah resmi "berpikir komputasional". |
| Q6 | Alat opsional | Tidak memakai alat berbayar. |
| Q7 | Bahan CS Unplugged (CC BY-SA 4.0) | Hanya rujukan ide. |
| Q8 | Jembatan ke `sd-coding` | Menunggu silabus `sd-coding` terbit. |
| Q9 | Persetujuan dan registrasi | Tinjau draf; registrasi menyusul sesuai ADR-0006 bila disetujui. |

## Cara mengusulkan perubahan

Usulan lewat issue, revisi berstatus draf, lalu persetujuan pemilik yang
dicatat dengan tanggal (ADR-0007). Setelah disetujui, urutan kerja mengikuti
ADR-0006: skema, `data/tk-coding/`, entri registri, domain, dan uji.

## Changelog

| Versi | Tanggal | Perubahan |
| --- | --- | --- |
| v0.1.0 | 2026-11-19 | Draf awal folder program (issue #127): README, riset, dan silabus draf. |
