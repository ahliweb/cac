---
"kurikulum-informatika": minor
---

Menambahkan skema indeks modul untuk program `sma-coding` (#106): `src/schema/sma-module.ts` untuk `data/sma-coding/modules.json` dengan butir CP, kode minggu jalur atau blok fondasi (`FND-...`), rumpun OSN yang dijembatani, kelas, prasyarat, status, aturan review ADR-0007 yang sama dengan modul OSN, dan rujukan eksplisit (judul dan URL `https`). `osn validate --program sma-coding` kini memeriksa indeks itu (butir CP, kode minggu, rumpun OSN, prasyarat tanpa siklus, id unik, dan berkas isi ada serta tidak kosong), dan `osn render modul --id <id> --program sma-coding` merender modul dengan spanduk status yang sama seperti OSN. Pemeriksaan modul kini memakai skema tiap program sendiri; sebelumnya pemeriksaan minggu untuk `sma-coding` terlewat tanpa laporan karena `weeks.json` dibaca dengan skema OSN, dan pemeriksaan yang tidak bisa dijalankan karena berkas rujukan hilang kini dilaporkan sebagai temuan. Skema modul OSN tidak berubah.
