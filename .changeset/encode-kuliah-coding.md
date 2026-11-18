---
"kurikulum-informatika": minor
---

Encode program `kuliah-coding` (#130): silabus coding perguruan tinggi v1.0 disetujui pemilik pada 2026-11-19 (`silabus-draf.md` menjadi `docs/programs/kuliah-coding/silabus.md`, pertanyaan terbuka diganti keputusan pemilik: tiga jalur U/I/K, C++ dahulu di jalur I, kebijakan AI tiga tingkat, CPL tetap kolom isian program studi pengadopsi). Program terdaftar di `data/programs.json` dan corpusnya ada di `data/kuliah-coding/` (enam berkas: jalur, 24 mata kuliah dengan SKS, semester, prasyarat, dan CPMK karangan, pemetaan ke 17 knowledge area CS2023, kolom CPL kosong, kebijakan AI, jembatan), dengan skema `src/schema/kul-*.ts`, audit murni `src/domain/kul-corpus-audit.ts` (total SKS per jalur, kode unik, prasyarat ada, lebih awal, dan tanpa siklus, KA valid, semester dalam batas, plafon SKS per semester jalur I), dan pemeriksa kesetiaan sel demi sel `bun run check:fidelity --program kuliah-coding`. `osn validate` kini memeriksa tiga program.
