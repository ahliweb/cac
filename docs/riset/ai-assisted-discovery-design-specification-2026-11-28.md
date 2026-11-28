# Riset pembelajaran AI-assisted software engineering: discovery, desain dan spesifikasi

- **Version:** v0.2.0
- **Last updated:** 2026-11-28
- **Status:** **DRAF**, bahan riset untuk #302 dan #304; bukan perubahan silabus yang disetujui, bukan keputusan pemilik, dan bukan izin implementasi. Semua butir desain, latihan, rubrik, dan pemetaan di dokumen ini adalah **usulan** (proposed).
- **Changelog:**
  - v0.2.0 (2026-11-28): ambil alih draf sesi lain atas pilihan pemilik; rujukan diperiksa ulang dan dikoreksi, rujukan yang tidak dapat dibuka ditandai, pernyataan produk komersial dinetralkan, status usulan ditegaskan, bagian verifikasi ditambahkan.
  - v0.1.0 (2026-11-28): draf awal sesi riset (dibuat sebagai PR draft).

## Pertanyaan dan metode

Rapid evidence review sumber publik dan penelitian empiris, bukan systematic review. Pertanyaan: apakah AI membantu rekayasa perangkat lunak jika peserta memahami masalah, memvalidasi desain, menguji hasil, dan menjaga keamanan? Tidak ada eksperimen dengan peserta CaC dan tidak ada pengujian produk komersial berbayar. Riset ini dipicu oleh uraian publik produk komersial di bidang ini dan hanya memakai konsep fungsional umum serta standar terbuka. Tidak ada kode, aset, API, teks, aturan, atau hasil reverse engineering produk pihak ketiga yang dipakai.

Tanda: **[not verified at takeover]** berarti halaman sumber tidak dapat dibuka atau isinya tidak dapat dikonfirmasi saat ambil alih (2026-11-28); angka dan tahun edisi dari sumber itu sengaja tidak ditulis.

| Referensi | Temuan | Batas |
|---|---|---|
| [Peng dkk. 2023](https://arxiv.org/abs/2302.06590) | Abstrak melaporkan kelompok dengan AI menyelesaikan tugas 55,8% lebih cepat | Tugas tunggal yang terbatas |
| Cui dkk. ([DOI](https://doi.org/10.1287/mnsc.2025.00535)) **[not verified at takeover]** | Dirujuk sebagai studi lapangan atas produktivitas developer; jumlah peserta, tahun, dan besaran efek tidak diperiksa dan tidak dikutip | Halaman penerbit menolak akses |
| [METR 2025](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/) | 16 developer berpengalaman, 246 *issue*; developer dengan AI memakai waktu 19% lebih lama | Repo matang; halaman menandai hasilnya tidak lagi mutakhir |
| [METR, pembaruan 2026-02-24](https://metr.org/blog/2026-02-24-uplift-update/) | Menyebut perubahan desain studi dan efek seleksi | Simpulan "tidak dapat disimpulkan sebagai efek tetap" adalah penilaian penyusun, bukan kutipan |
| [Perry dkk.](https://arxiv.org/abs/2211.03622) | Peserta dengan asisten AI lebih cenderung percaya bahwa kodenya aman, padahal risiko kode tidak aman ada [parafrasa] | Model dan tugas tertentu |
| [DORA 2025](https://dora.dev/research/2025/dora-report/) | Ringkasan halaman: AI memperbesar kekuatan dan kelemahan organisasi | PDF lengkap tidak dibuka; sifat korelasional adalah penilaian penyusun [inferensi] |
| ISO 12207 (siklus hidup perangkat lunak), [halaman katalog](https://www.iso.org/standard/90219.html) **[not verified at takeover]** | Rujukan konsep siklus hidup | Nomor, judul, dan edisi tidak diperiksa; katalog, bukan sertifikasi |
| ISO 9241-210 (desain berpusat pada manusia), [halaman katalog](https://www.iso.org/standard/77520.html) **[not verified at takeover]** | Rujukan konsep desain berpusat pada manusia | Halaman katalog menolak akses; edisi tidak ditulis |
| ISO 29148 (rekayasa kebutuhan), [halaman katalog](https://www.iso.org/standard/72089.html) **[not verified at takeover]** | Rujukan konsep rekayasa kebutuhan | Halaman katalog menolak akses; edisi tidak ditulis |
| [Spec Kit](https://github.com/github/spec-kit) | Dokumen ada; tahap klarifikasi dan analisis lintas artefak bersifat baca-saja | Contoh praktik, tidak diwajibkan |
| [DTCG 2025.10](https://www.designtokens.org/tr/2025.10/format/) | Format design token; Final Community Group Report 28 Oktober 2025 | Bukan W3C Recommendation |
| [Format DESIGN.md (draf spesifikasi, 21 April 2026)](https://blog.google/innovation-and-ai/models-and-research/google-labs/stitch-design-md/) | Format berkas desain terbaca mesin | Yang dibaca adalah draf; tidak diwajibkan |
| [WCAG 2.2](https://www.w3.org/TR/WCAG22/) | W3C Recommendation, 12 Desember 2024 | Standar aksesibilitas; bukan klaim kepatuhan |
| [NIST SSDF](https://csrc.nist.gov/projects/ssdf/publications) | Versi 1.1 final (2022); versi 1.2 draf (rilis 17 Desember 2025) | Kerangka praktik, bukan kewajiban |

Catatan: dua studi industri di atas (Peng dkk., METR) berasal dari konteks yang berbeda dan memberi arah berlawanan; hasilnya tidak boleh dijumlahkan atau dianggap prediksi hasil peserta.

## Rekomendasi pembelajaran (usulan)

1. Pahami masalah dan pengguna; rumuskan kriteria keberhasilan tanpa AI.
2. Buat PRD ringkas, klarifikasi asumsi; AI dapat memberi kritik, bukan mengesahkan kebutuhan.
3. Gambar wireframe dan uji dengan pengguna; desain sebelum mengunci data dan kontrak; buat DESIGN.md dan token sederhana bila sesuai level.
4. Tetapkan model data, aturan akses, kontrak, dan contoh mock; review konsistensi dan keamanan sebelum implementasi.
5. Implementasikan satu slice, uji dengan kasus positif dan negatif, keyboard dan responsif. Jelaskan keputusan tanpa AI, review diff, catat keterbatasan.
6. Evaluasi hasil, dokumentasikan bukti, dan perbaiki sumber spesifikasi saat drift ditemukan.

## Lima latihan berjenjang (usulan)

- TK/SD: kartu alur tugas sehari-hari, tanpa akun AI anak.
- SMP: storyboard dan tes penerimaan aplikasi jadwal dengan data fiktif.
- SMA: PRD, prototipe, token, API mock, dan test fitur perpustakaan.
- Kuliah: threat model, akses, traceability, contract test, dan review PR.
- Dewasa: pilot perubahan codebase matang, audit drift, biaya dan rework, serta usability.

Rubrik (usulan): kemampuan menjelaskan logika tanpa AI, ketepatan requirement, task success, kualitas tes, keamanan, aksesibilitas, sumber dan lisensi. Jangan menilai jumlah kode. Terapkan kebijakan AI tiap program, larangan AI pada evaluasi yang mensyaratkan kerja mandiri, data sintetis, dan pendampingan anak. Rujukan hukum: [UU PDP](https://peraturan.bpk.go.id/Details/229798/uu-no-27-tahun-2022) (halaman peraturan; pasal tertentu tidak dikutip di sini) dan [UU Hak Cipta](https://peraturan.bpk.go.id/Details/38690/uu-no-28-tahun-2014). Jangan menyimpan identitas peserta, prompt sensitif, atau aset pihak ketiga tanpa izin. Materi harus independen dan netral terhadap vendor. Dokumen ini tidak mengubah silabus, schema, corpus, atau CLI; perubahan semacam itu hanya setelah persetujuan dan validasi sesuai tata kelola repo.

## Evaluasi (usulan)

Pilot tugas yang dipasangkan, baseline tanpa bantuan sesuai kebijakan, waktu manusia+AI termasuk review, skor pemahaman mandiri, cacat dan keamanan, serta task success; laporkan distribusi, bias, dan data hilang. Hasil studi industri tidak boleh dianggap prediksi hasil peserta. Issue #302 mengelola panduan publik; #304 menilai kesesuaian per program dan bukti fidelity (keduanya terbuka saat ambil alih).

## Koordinasi lewat GitHub Projects (usulan, 2026-11-28)

Arah umum yang dicatat sesi riset (tidak diverifikasi saat ambil alih): mengoordinasikan langkah AWSES yang berlaku lewat GitHub Projects (v2), terintegrasi dengan manajemen proyek yang sudah ada, bukan papan kedua dan bukan pengganti otoritas repo. Pekerjaan yang ada: #302 dan #304. Semua butir di bawah adalah usulan, bukan aturan yang berlaku.

- Langkah 1-8: lacak deliverable riset dan spesifikasi, ketergantungan, peninjau, kriteria penerimaan, dan URL bukti; tidak ada issue implementasi sebelum gerbang 9 yang berlaku. Langkah 9: pelacak gerbang merujuk keputusan tercatat, tidak pernah disimpulkan dari kolom papan.
- Langkah 10-12: satu issue kanonik per unit S/M, relasi induk/sub-issue dan blocked-by bila tersedia, milestone, prioritas, dan assignee dipertahankan; PR merujuk issue dan bukti CI. Langkah 13-15: staging/UAT hanya bila berlaku, bukti kesiapan rilis dan keputusan. Langkah 16-18: deployment, validasi, pemantauan, dan tindak lanjut dengan bukti rilis atau insiden.
- Usulan pemetaan status: Rencana = backlog, Siap = definition of ready berlaku, Berjalan = diklaim, Menunggu = dependensi/review/persetujuan, Selesai = hasil terverifikasi, Batal = dibatalkan dengan alasan. Langkah siklus hidup adalah kolom terpisah, tidak disimpulkan dari status. PR yang ditutup tanpa merge, issue duplikat atau not-planned, dan bukti yang hilang tidak otomatis menjadi Selesai. Penolakan gerbang tetap tercatat walau pelacak ditutup. Jangan mengarang tenggat.
- Perubahan keanggotaan proyek atau kolom: temukan pemilik dan nomor proyek hidup, akses, dan ID kolom; pakai URL atau node ID issue sebenarnya, penambahan idempoten, dry-run diff, baca ulang, dan rekonsiliasi; satu issue kanonik. Tanpa kartu draf bersama dan tanpa konteks rahasia; identitas peserta dan data penilaian tidak pernah masuk papan. Papan hanya untuk koordinasi, bukan otoritas merge atau deploy.
- Nama kolom dan proyek yang disebut sesi riset (mis. Tahap, Pelaksana, Prioritas) **[not verified at takeover]**: keberadaan proyek ber-kolom itu untuk repo ini tidak diperiksa, dan tidak ada keanggotaan proyek yang diperiksa atau diubah.

Rujukan (halaman dibuka saat ambil alih; hanya keberadaan dan judul yang dikonfirmasi, isi tidak dikaji): [Planning and tracking with Projects](https://docs.github.com/en/issues/planning-and-tracking-with-projects), [Using the API to manage Projects](https://docs.github.com/en/issues/planning-and-tracking-with-projects/automating-your-project/using-the-api-to-manage-projects), [Creating issue dependencies](https://docs.github.com/en/issues/tracking-your-work-with-issues/using-issues/creating-issue-dependencies), [About issue statuses](https://docs.github.com/en/issues/tracking-your-work-with-issues/learning-about-issues/about-issue-statuses).

## Reference verification at takeover (2026-11-28)

Dokumen ini ditulis sesi lain sebagai draf dan diambil alih atas pilihan pemilik 2026-11-28. Dari 20 rujukan yang tersisa (termasuk dua halaman METR dan empat halaman dokumentasi GitHub):

- **11 didukung** isinya: Peng dkk., METR 2025, METR pembaruan 2026, Perry dkk., DORA 2025, Spec Kit, DTCG, draf DESIGN.md, NIST SSDF, WCAG 2.2, UU Hak Cipta.
- **5 hanya keberadaan dan judul** terkonfirmasi: UU PDP (halaman peraturan; pasal tidak dipakai) dan empat halaman dokumentasi GitHub.
- **4 [not verified at takeover]**: Cui dkk. dan tiga standar ISO (12207, 9241-210, 29148), semuanya ditolak akses (HTTP 403). Angka dan tahun edisi dari sumber ini tidak ditulis.

Koreksi saat ambil alih: METR menyebut 246 *issue* (bukan task) dan hasilnya ditandai tidak mutakhir; "overconfidence" Perry dkk. diganti parafrasa yang sesuai; tahun edisi ISO dan angka studi Cui dkk. dihapus; dua rujukan yang menyebut produk komersial beserta klaimnya dihapus dan diganti kalimat netral; status "usulan" dipertegas; DORA dan METR diberi penanda penilaian penyusun. Rujukan baru tidak ditambahkan. Tidak ada pengujian yang dijalankan dalam riset ini.
