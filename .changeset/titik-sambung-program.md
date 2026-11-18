---
"kurikulum-informatika": minor
---

Titik sambung audit dan fidelity per program (#140, ADR-0008): pemilik memutuskan lima program coding baru di-encode dengan skema khusus per program seperti `sma-coding`. `osn validate` kini memilih audit, skema, dan pemeriksaan indeks modul dari satu tabel program (`PROGRAM_MODULES` di `src/cli/program-registry.ts`), bukan percabangan per id; program terdaftar di `data/programs.json` tanpa entri tabel menjadi temuan, bukan dilewati diam-diam. Perintah baru `bun run check:fidelity [--program <id>]` menjalankan modul fidelity tiap program dari tabel yang sama (logika `sma-coding` dipindah ke `src/cli/fidelity/sma-coding.ts`; `check:sma-fidelity` tetap ada dan memanggil modul yang sama). Perilaku validasi `osn` dan `sma-coding` tidak berubah. ADR-0008 mencatat keputusan dan pola menambah program; ID persyaratan baru TR-14.
