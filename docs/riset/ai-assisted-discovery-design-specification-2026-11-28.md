# Riset pembelajaran AI-assisted software engineering: discovery, desain dan spesifikasi

- Versi: 0.1.0
- Tanggal: 2026-11-28
- Status: bahan riset untuk #302 dan #304; bukan perubahan silabus yang disetujui.

## Pertanyaan dan metode
Rapid evidence review sumber primer publik dan penelitian empiris, bukan systematic review. Apakah AI membantu rekayasa software jika peserta memahami masalah, memvalidasi desain, menguji hasil dan menjaga keamanan? Tidak ada eksperimen peserta CaC atau pengujian vendor berbayar.

| Referensi | Temuan | Batas |
|---|---|---|
| [NgodingPakeAI](https://ngodingpakeai.com/) | Perencanaan, desain, template dan sync codebase | Referensi produk, bukan bukti hasil belajar |
| [DesainPakeAI](https://desainpakeai.com/updates) | Canvas, preview dan feedback berkonteks | Klaim vendor; tidak menyalin aset |
| [Peng et al. 2023](https://arxiv.org/abs/2302.06590) | Tugas dengan AI 55,8% lebih cepat | Tugas terbatas |
| [Cui et al. 2026](https://doi.org/10.1287/mnsc.2025.00535) | 3 field experiments, 4.867 developer; 26,08% lebih banyak task selesai (SE 10,3%) | Tidak mengukur pembelajaran atau seluruh lifecycle |
| [METR 2025](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/) | 16 developer, 246 task; 19% tambahan waktu | Repo matang; [update 2026](https://metr.org/blog/2026-02-24-uplift-update/) memperbarui desain studi |
| [Perry et al.](https://arxiv.org/abs/2211.03622) | Risiko kode tidak aman dan overconfidence | Model/tugas tertentu |
| [DORA 2025](https://dora.dev/research/2025/dora-report/) | AI memperbesar kekuatan dan kelemahan organisasi | Korelasional |
| [ISO 12207:2026](https://www.iso.org/standard/90219.html), [ISO 9241-210:2019](https://www.iso.org/standard/77520.html), [ISO 29148:2018](https://www.iso.org/standard/72089.html) | Lifecycle, human-centred design, requirements | Katalog; bukan sertifikasi |
| [Spec Kit](https://github.com/github/spec-kit), [DTCG 2025.10](https://www.designtokens.org/tr/2025.10/format/), [Stitch DESIGN.md](https://blog.google/innovation-and-ai/models-and-research/google-labs/stitch-design-md/), [WCAG 2.2](https://www.w3.org/TR/WCAG22/), [NIST SSDF](https://csrc.nist.gov/projects/ssdf/publications) | Referensi praktis, format token, aksesibilitas dan keamanan | Tidak mewajibkan vendor; SSDF 1.1 final, 1.2 draft |

## Rekomendasi pembelajaran
1. Pahami masalah dan pengguna; rumuskan kriteria keberhasilan tanpa AI.
2. Buat PRD ringkas, klarifikasi asumsi; AI dapat memberi kritik, bukan mengesahkan kebutuhan.
3. Gambar wireframe dan uji dengan pengguna; desain sebelum mengunci data/kontrak; buat DESIGN.md dan token sederhana bila sesuai level.
4. Tetapkan model data, aturan akses, kontrak dan contoh mock; review konsistensi dan keamanan sebelum implementasi.
5. Implementasikan satu slice, uji dengan kasus positif/negatif, keyboard dan responsif. Jelaskan keputusan tanpa AI, review diff, catat keterbatasan.
6. Evaluasi hasil, dokumentasikan evidence dan perbaiki sumber spesifikasi saat drift ditemukan.

## Lima latihan berjenjang (usulan)
- TK/SD: kartu alur tugas sehari-hari, tanpa akun AI anak.
- SMP: storyboard dan tes penerimaan aplikasi jadwal dengan data fiktif.
- SMA: PRD, prototipe, token, API mock dan test fitur perpustakaan.
- Kuliah: threat model, akses, traceability, contract test dan review PR.
- Dewasa: pilot perubahan codebase matang, audit drift, biaya/rework dan usability.

Rubrik: kemampuan menjelaskan logika tanpa AI, ketepatan requirement, task success, kualitas tes, keamanan, aksesibilitas, sumber/lisensi. Jangan menilai jumlah kode. Terapkan kebijakan AI tiap program, larangan AI pada evaluasi yang mensyaratkan kerja mandiri, data sintetis, pendampingan anak. [UU PDP](https://peraturan.bpk.go.id/Details/229798/uu-no-27-tahun-2022) dan [Hak Cipta](https://peraturan.bpk.go.id/Details/38690/uu-no-28-tahun-2014). Jangan menyimpan identitas peserta, prompt sensitif atau aset vendor tanpa izin. Materi harus independen dan vendor-neutral. Tidak mengubah silabus, schema, corpus atau CLI sebelum persetujuan dan validasi sesuai governance.

## Evaluasi
Pilot matched tasks, baseline tanpa bantuan sesuai kebijakan, waktu manusia+AI termasuk review, skor pemahaman mandiri, defect/security dan task success; laporkan distribusi, bias dan missing data. Hasil studi industri tidak boleh dianggap prediksi hasil peserta. #302 mengelola panduan publik; #304 menilai kesesuaian per program dan bukti fidelity. 


## GitHub Projects — lifecycle coordination (2026-11-28)

Owner direction: coordinate all applicable AWSES steps through GitHub Projects (v2); integrate with existing project management, not a second board or replacement for repo authority. Existing work: 302, 304. Use a learning-oriented project view; learner identities and assessment data never enter the board; no change to syllabus governance.

- Steps 1–8: track research/specification deliverables, dependency, reviewer, acceptance criteria and evidence URL; no implementation issue before applicable Gate 9. Step 9: gate tracker references recorded decision, never inferred from board stage.
- Steps 10–12: canonical issue per S/M unit, native parent/sub-issue and blocked-by relations where supported, milestone/priority/assignee preserved; PR references issue and CI evidence. Steps 13–15: track staging/UAT only if applicable, release-readiness evidence and decision. Steps 16–18: deployment, validation, monitoring and follow-up with release/incident evidence.
- Reuse approved project and its existing fields (e.g. Tahap, Pelaksana, Prioritas, Mulai, Target); proposed mapping Rencana = backlog, Siap = applicable DoR, Berjalan = claimed, Menunggu = dependency/review/approval, Selesai = verified outcome, Batal = cancelled with reason. Lifecycle step is a separate field or existing issue metadata, never inferred from stage. Gate rejection remains recorded even if tracker closed. Do not mark closed-unmerged PR, duplicate/not-planned issue, or missing evidence as Selesai automatically. Preserve owner/assignee and target; do not invent deadlines.
- Project membership/field changes: discover live owner/number, access and field IDs; use actual issue URL/node ID, idempotent add, dry-run diff, readback and reconcile; keep one canonical issue and distinguish PR items from work counts. No shared draft cards or confidential context. Review permission, avoid broad seeding or status automation conflicts, never move item across visibility boundary automatically. Board is coordination only, not merge/deploy authority. Report verified vs pending; no membership checked in this research update.

References: https://docs.github.com/en/issues/planning-and-tracking-with-projects ; https://docs.github.com/en/issues/planning-and-tracking-with-projects/automating-your-project/using-the-api-to-manage-projects ; https://docs.github.com/en/issues/tracking-your-work-with-issues/using-issues/creating-issue-dependencies ; https://docs.github.com/en/issues/tracking-your-work-with-issues/learning-about-issues/about-issue-statuses .
