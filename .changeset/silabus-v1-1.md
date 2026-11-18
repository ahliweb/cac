---
"kurikulum-informatika": minor
---

Terapkan silabus SMA coding v1.1 yang disetujui pemilik pada 2026-11-19 (issue #92 tahap 2): `docs/programs/sma-coding/silabus.md` kini v1.1.0 (berkas draf `silabus-v1.1-draf.md` dihapus) dan `data/sma-coding/` dikodekan ulang darinya. Blok fondasi kelas X bersama lintas jalur (`FND-X1-M1..M7`) mendapat berkas data baru `foundation.json` dengan skema `src/schema/sma-foundation.ts`; kode minggu menerima awalan `FND`; audit `osn validate --program sma-coding` mewajibkan minggu jalur kelas X semester 1 tepat 8..14, semester lain 1..14, dan `FND-X1` tepat 1..7 (kini tujuh berkas data, 154 minggu jalur, 26 pemetaan CP). Pemeriksa kesetiaan `bun run check:sma-fidelity` membaca tabel fondasi. Registri `sma-coding` naik ke versi 1.1.0 (2026-11-19).
