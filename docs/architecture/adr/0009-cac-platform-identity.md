# ADR-0009: Identitas Platform Curriculum as Code (CaC)

## Metadata
- Version: v1.0.1
- Last updated: 2026-11-19
- Changeset: Mencatat keputusan nama platform dan target rename repo tanpa melaksanakan rename.

## Status
Accepted (keputusan pemilik, 2026-11-19). **Execution pending**: keputusan identitas bukan izin melompati gerbang kesiapan dan bukan bukti rename telah dilaksanakan.

## Context
Repositori saat ini bernama ahliweb/osn, package private bernama kurikulum-informatika, CLI bernama osn, sementara ADR-0006 memperluas domain menjadi multi-program (OSN, SMA coding dan rencana TK/SD/SMP/kuliah/dewasa). Nama OSN tepat untuk satu program namun salah untuk platform yang menyimpan beberapa program. ADR-0001 sudah menetapkan paradigma curriculum-as-code; ADR-0005 membedakan versi perangkat lunak dari versi silabus; ADR-0004 melarang penyimpanan data pribadi pembelajar.

Kebutuhan IDENTITY-CAC-001..010 dijabarkan pada docs/requirements/identity-cac.md. Rencana pelaksanaan: docs/migrations/2026-11-osn-to-cac.md.

## Options considered
| Opsi | Keunggulan | Penolakan atau trade-off |
| --- | --- | --- |
| Tetap ahliweb/osn | Tidak ada migrasi | Mengaburkan identitas sistem multi-program dan memungkinkan kesan afiliasi OSN |
| ahliweb/curriculum-as-code | Deskriptif, mudah ditemukan | URL lebih panjang, preferensi pemilik untuk repo singkat tidak terpenuhi |
| **ahliweb/cac** | Pendek, konsisten dengan Curriculum as Code (CaC), disetujui pemilik | Singkatan CAC mempunyai makna lain (misalnya customer acquisition cost); mitigasi: deskripsi eksplisit dan identitas merek |
| ahliweb/caac | Singkatan pendek | Frasa Curriculum as a Code kurang lazim dibanding pola Infrastructure as Code / Policy as Code |
| ahliweb/ahlikoding-curriculum | Identitas brand kuat | Lebih panjang; prinsip as-code kurang tampak |
| Membuat repo baru dan menyalin konten | Nama baru langsung tersedia | Memecah issue/PR, tag, histori, dan source-of-truth; tidak dipilih |

## Decision
1. **Nama GitHub target:** ahliweb/cac, dengan **rename in-place** dari ahliweb/osn bila dan hanya bila semua prasyarat terpenuhi. Tidak membuat repository paralel.
2. **Nama konsep:** Curriculum as Code (CaC). **Nama produk:** AhliKoding Curriculum. Judul dan deskripsi repo harus mengeja nama lengkap agar tidak rancu dengan akronim komersial CAC.
3. **Program OSN tidak diganti namanya**: ID program osn, data/osn/, silabus sumber, sumber referensi, versi dan penanda non-afiliasi tetap utuh. Program selain OSN tidak boleh diperlakukan seolah resmi OSN.
4. **CLI target:** cac; CLI osn dipertahankan sebagai alias untuk periode transisi, dengan keluaran dan exit code yang diuji. Implementasi alias dan jadwal deprecation harus dirinci sebelum pemutusan; jangan ubah perilaku data program default diam-diam.
5. **Nama private package target:** curriculum-as-code (tanpa perubahan publikasi paket; jangan menganggap sudah tersedia di registry). Versi software SemVer berbeda dari setiap syllabusVersion; penggantian nama paket/bin/CLI dinilai tersendiri untuk kompatibilitas.
6. **Dokumentasi, output, CI, release metadata dan integrasi eksternal** dimigrasikan berdasarkan inventaris yang terverifikasi. Tautan historis boleh dipertahankan bila secara semantik menunjuk konteks OSN/histori, tetapi URL integrasi aktif menggunakan alamat baru.
7. **Prioritas keutuhan:** tidak menulis ulang sejarah Git, tidak mengubah substansi kurikulum, tidak menghapus modul, tidak melonggarkan validasi, tidak memindahkan/mempublikasikan data peserta didik.
8. **Kontrol:** planning dan ADR lebih dulu; cross-spec Definition of Ready (gate 9) sebelum refactor; CI, uji kompatibilitas dan rehearsal rename; Go/No-Go (gate 15) sebelum rename; pemantauan dan rollback prosedural sesudah rename.

## Consequences
- Identitas platform netral terhadap program, sedangkan OSN tetap salah satu program.
- Ada biaya pemeliharaan alias dan rujukan historis; risikonya diatasi oleh contract tests dan inventaris dependensi.
- GitHub umumnya mengalihkan URL repository/issue lama sesudah rename, tetapi tidak semua integrasi aman: GitHub Actions yang menggunakan repository sebagai action tidak mengikuti redirect; URL GitHub Pages project site berbeda; remote lokal, webhook, badge, pinned links, package registry dan integrasi pihak ketiga wajib diperiksa sendiri.
- Saat gerbang Go/No-Go belum lulus, repo publik dan seluruh command utama **tetap bernama lama**.
- Rename adalah operasi administratif di GitHub, bukan operasi refactoring dan bukan rilis software secara otomatis.
- Referensi: ADR-0001, ADR-0004, ADR-0005, ADR-0006, ADR-0007, ADR-0008; docs/migrations/2026-11-osn-to-cac.md; https://docs.github.com/en/repositories/creating-and-managing-repositories/renaming-a-repository

## Changelog
### 2026-11-19 - v1.0.1
- Editorial (#156, X-03): rentang kebutuhan ditulis IDENTITY-CAC-001..010; keputusan tidak berubah.

### 2026-11-19 - v1.0.0
- Menetapkan singkatan CaC dan slug ahliweb/cac; rename ditahan sampai readiness gate.
