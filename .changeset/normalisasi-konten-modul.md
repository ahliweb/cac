---
"kurikulum-informatika": patch
---

Normalisasi konten dan indeks modul (issue #124). Isi modul dan lembar tidak lagi memuat judul `# ` sendiri atau banner DRAF (155 berkas; renderer mencetaknya dari indeks), dan `bun run check:learner-assets` kini menolak (galat, bukan peringatan) isi yang diawali judul sendiri. Bagian `## Rujukan` di isi 136 modul dihapus karena renderer menambahkannya dari `references` indeks; 18 rujukan yang belum ada ditambahkan ke indeks `kuliah-coding`. Prasyarat 31 entri jalur C/D/E `sma-coding` dipulihkan sesuai `rancangan-modul-cde.md`, dan prasyarat `smp-coding`, `kuliah-coding`, `dewasa-coding` diseragamkan ke id modul. Entri `data/<program>/modules.json` diurutkan menurut urutan satuan korpus. `Arduino.h` tiruan kini mengenal `Serial2`. Tidak mengubah silabus, korpus, maupun status modul (tetap `draf`).
