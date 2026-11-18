---
"kurikulum-informatika": patch
---

Daftarkan kebutuhan program sma-coding di register dan matriks keterlacakan (#76): `FR-27` (registri program), `FR-28` (encode dan validasi corpus), `FR-29` (rujukan lintas program ke rumpun OSN), `FR-30` (perintah khusus OSN menolak program lain dengan exit 2), `FR-31` (indeks dan renderer modul), `TR-12` (`check:sma-fidelity`), `TR-13` (`check:module-code`), dan `GR-13` (konten karangan tetap DRAF sampai pemilik menyetujui). Matriks keterlacakan kini punya matriks ketiga yang menautkan tiap ID baru ke berkas test, dan `check:requirements` memastikan berkas itu ada. `check:requirements` memisahkan issue yang sah dikutip (bilangan bulat positif, tanpa batas atas) dari issue yang wajib ada di matriks (#1-#26), dan kini melaporkan rujukan issue yang rusak (`#0`, `#abc`, `26`) alih-alih mengabaikannya. `docs/development/ci-cd.md` dan `testing.md` menyatakan mana skrip pemeriksa yang langkah CI dan mana yang hanya lokal.
