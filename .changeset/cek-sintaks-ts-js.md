---
"kurikulum-informatika": patch
---

`bun run check:module-code` kini juga memeriksa sintaks blok kode berpagar `ts` (juga `typescript`) dan `js` (juga `javascript`) di `content/**/modules/*.md`, dengan `Bun.Transpiler` bawaan Bun tanpa dependensi baru. Ini cek sintaks saja, bukan cek tipe, dan kode tidak dijalankan; blok `ts setengah-jadi` dilewati dan dihitung seperti bahasa lain.
