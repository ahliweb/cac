---
"kurikulum-informatika": minor
---

Menambahkan perintah `cac` (`bin.cac`, entri `src/cli/cac.ts`) sebagai nama CLI canonical, dengan `osn` tetap sebagai alias yang berperilaku identik (issue #251, bagian epik #150). Kedua entri tipis memanggil satu `runCli` yang kini menerima nama pemanggil: teks usage, help, dan prefiks pesan mengikuti nama itu (`cac validate: ...` untuk `cac`, `osn validate: ...` untuk `osn`). Keluaran `osn` tidak berubah (diverifikasi terhadap golden baseline #153), `--json` dan kode keluar identik, judul Markdown artefak tidak berubah, dan tidak ada peringatan deprecation. Tidak mengubah data, skema, domain, atau nama paket.
