---
"kurikulum-informatika": patch
---

Tiga pemeriksaan teknis (issue #178, rujuk #124). `osn validate` untuk `sma-coding` kini menolak modul jalur pengayaan (D dan E: id berawalan `d-` atau `e-`, atau kode minggu dari jalur ber-`cpStatus` `pengayaan` di `tracks.json`) yang `cpItems`-nya tidak kosong, sesuai `rancangan-modul-cde.md`. `bun run check:module-code` kini membuang indentasi pagar pembuka dari tiap baris isi blok kode yang menjorok di dalam item daftar (CommonMark), sehingga blok `python` dan `cpp` menjorok diperiksa sebagaimana dibaca pembaca. `bun run check:learner-assets` memberi peringatan (belum galat; konstanta `DUPLICATE_TITLE_IS_ERROR`) bila isi modul atau lembar diawali judul `# ` sendiri padahal `render modul` sudah mencetak judul dari indeks. Tidak mengubah `content/` maupun `data/`.
