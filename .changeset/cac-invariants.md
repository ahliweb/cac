---
"kurikulum-informatika": patch
---

Mendokumentasikan invariants data kurikulum untuk migrasi identitas CaC (issue #154): ID program `osn` dan direktori `data/osn/`, entri `data/programs.json`, `syllabusVersion` tiap program, jumlah berkas korpus, kode minggu dan id modul, serta garis pemisah versi software dan versi silabus (ADR-0005). Dokumen `docs/migrations/2026-11-cac-invariants.md` memuat baseline sha256 71 berkas `data/**/*.json` pada commit main `3eb5d89`, metode deteksi dengan perkakas yang sudah ada (bukti fixture sintetis di salinan sementara), dan traceability IDENTITY-CAC-002/005/009 ke tes. Tidak mengubah kode, data, atau silabus.
