# Kebijakan penggunaan AI untuk pembinaan OSN

Versi: v1.0.0. Tanggal: 2026-11-19. Status: prosedur operasional yang
disetujui pemilik lewat keputusan pada issue
[#139](https://github.com/ahliweb/cac/issues/139) (2026-11-19: kebijakan AI
diterapkan dengan opsi rekomendasi U-01, disusun per program).

## Sifat dokumen ini

- Ini konten **karangan** (ADR-0007), bukan transkripsi silabus. Ia berada di
  **lapisan prosedur operasional** (bersama [`runbook.md`](runbook.md)); tidak
  mengubah `docs/silabus/` maupun `data/osn/`, dan tidak menambah atau
  mengubah makna konten kurikulum OSN (aturan fidelity pada `AGENTS.md`).
- Berlaku hanya untuk program `osn`. Program lain memiliki kebijakan AI
  sendiri (keputusan #139: per program, bukan satu kerangka lintas program).
- Dasar: [`docs/riset/ai-rekayasa-perangkat-lunak.md`](../riset/ai-rekayasa-perangkat-lunak.md)
  (bagian 4.5, 5.7, 7 usulan U-01) dan
  [`docs/riset/ilmu-belajar-kognitif.md`](../riset/ilmu-belajar-kognitif.md)
  (bagian 3.1, 3.4, 3.9, 6.6, 8.1). Kedua dokumen riset menandai buktinya:
  tidak ada studi dari Indonesia, dan hampir semua studi berdurasi paling lama
  beberapa minggu. Kebijakan ini adalah penerapan hati-hati atas bukti itu,
  bukan klaim bahwa AI pasti merugikan.

## Prinsip

AI membantu **kinerja saat dipakai**, tetapi bukti belajar jangka panjang
campuran dan, tanpa pagar pengaman, cenderung negatif pada materi yang sedang
dipelajari (riset AI 4.5, kesimpulan 1; riset ilmu belajar 6.6; Bastani dkk.,
Shen dan Tamkin). Yang menentukan adalah **pola pemakaian**: meminta penjelasan
setelah mengerjakan sendiri melindungi belajar, menyerahkan pekerjaan penuh
tidak (Lehmann dkk.; Shen dan Tamkin). Tujuan pembinaan OSN adalah kemampuan
peserta menyelesaikan soal sendiri di bawah kontes tanpa bantuan, jadi
bagian kerja soal harus tetap dikerjakan sendiri.

## 1. Kapan tanpa AI (tingkat Merah)

AI tidak boleh dipakai peserta pada kegiatan berikut:

| Kegiatan | Alasan |
| --- | --- |
| Kerja soal latihan (sesi mingguan, latihan mandiri) sampai peserta menyelesaikan sendiri atau menyerah | Kinerja saat latihan bukan ukuran belajar; AI yang memberi jawaban utuh seperti contoh terselesaikan yang tidak pernah dipudarkan, dan pemula yang kesulitan dirugikan paling besar (riset AI 4.5 kesimpulan 3 dan 4, yang butir 4 itu sendiri berstatus `[inferensi]`; riset ilmu belajar 3.4 dan 3.9) |
| *Re-solve* tanpa hint (jendela 3-7 hari untuk status B; terjadwal untuk C, sesuai [`runbook.md`](runbook.md) bagian 3) | *Re-solve* hanya berfungsi sebagai uji mengingat kembali pada keterampilan bila dikerjakan sendiri (riset ilmu belajar 3.1, 8.1); setelah akses dicabut, pengguna AI tanpa pagar pengaman berkinerja lebih rendah (Bastani dkk., riset AI 4.5) |
| Simulasi kontes (mini-contest, mixed-topic contest, simulasi OSN-K/OSN-P/Nasional) | Simulasi harus mewakili kondisi kontes; juga keabsahan penilaian, karena model bahasa sudah mampu mengerjakan soal ujian pemrograman pengantar (Finnie-Ansley dkk., riset AI 4.5) |
| Checkpoint dan penilaian kemampuan (gerbang kesiapan, rekaman A/B/C/D) | Hasil penilaian harus mencerminkan kemampuan peserta, bukan alat |
| Kuis mengingat kembali dan *exit ticket* | Nilainya terletak pada upaya mengingat sendiri (riset ilmu belajar 3.1) |

Aturan ini sejalan dengan tingkat "Merah" pada kerangka usulan riset AI 5.7
dan dengan usulan U-01 (riset AI bagian 7).

## 2. Kapan boleh dan bagaimana (tingkat Kuning)

AI **hanya boleh** dipakai setelah peserta menyelesaikan soal secara mandiri,
atau setelah editorial dibuka, dan hanya sebagai **penjelas**, tidak sebagai
penghasil solusi yang diserahkan:

| Pemakaian yang diizinkan | Syarat |
| --- | --- |
| Menjelaskan konsep atau editorial yang belum dimengerti | Setelah tenggat kerja soal berlalu atau setelah peserta mencoba sendiri; peserta menuliskan dahulu bagian yang ia belum paham |
| Refleksi dan postmortem: menjelaskan mengapa pendekatan sendiri salah | Setelah kontes selesai dan skor tercatat; peserta tetap mengklasifikasikan galatnya sendiri ke taksonomi galat |
| Membandingkan solusi sendiri dengan solusi lain atau editorial | Peserta menyebut dulu perbedaannya; AI memeriksa dan memperkaya, bukan menggantikan |
| Mencari petunjuk bertahap (tidak melompat ke solusi) | Mengikuti tangga hint (`data/osn/hint-policy.json`): tingkat 4 dan 5 tetap mewajibkan *re-solve* tanpa hint pada interval berikutnya |

Alasan dari riset: pola "melengkapi" (meminta penjelasan) menambah pemahaman,
sedangkan pola "menggantikan" (membuat solusi latihan lewat AI) menurunkan
pemahaman tiap topik (Lehmann dkk., riset AI 4.5); dari pola interaksi yang
diteliti, yang melibatkan keterlibatan kognitif menjaga hasil belajar (Shen
dan Tamkin, riset AI 4.5); pagar pengaman bergaya tutor mengurangi dampak
negatif pada Bastani dkk. (matematika; ekstrapolasi ke coding `[inferensi]`).

**Pagar yang berlaku pada pemakaian di atas.**

1. Setelah soal dijelaskan lewat AI atau editorial, peserta **wajib melakukan
   *re-solve* tanpa AI dan tanpa hint** pada jadwal biasa. Penjelasan dari AI
   tidak menggantikan *re-solve*.
2. Keluaran AI diperlakukan sebagai klaim yang harus diperiksa: peserta
   menguji dengan kasus kecil atau pembanding *brute force*, tidak menerima
   begitu saja (AI dapat keliru dan keluarannya tidak selalu identik antar
   permintaan; riset AI bagian 4.2).
3. Peserta mencatat singkat pada *error log* bahwa AI dipakai untuk soal itu
   (tujuan saja, tanpa menempel identitas atau data pribadi).
4. Pemakaian AI tidak mengubah status A/B/C/D: status mengikuti penyelesaian
   mandiri tanpa AI.

## 3. Aturan kontes resmi

Kontes resmi (OSN dan seleksinya, IOI) memiliki aturan sendiri, termasuk
mengenai alat bantu. **Aturan kontes resmi berlaku dan harus dicek dari
sumber resmi** (R1-R3 untuk OSN, R7-R8 untuk IOI, lihat
[`syllabus-check.md`](syllabus-check.md)) sebelum setiap siklus; dokumen ini
**tidak memuat dan tidak menyimpulkan** aturan tersebut. Riset AI bagian 7
(U-01) menandai aturan kontes resmi tentang AI sebagai `[belum terverifikasi]`.
Bila aturan resmi lebih ketat daripada dokumen ini, aturan resmi menang;
bila ia berubah, perbarui dokumen ini lewat langkah syllabus-check.

## 4. Privasi

Sejalan dengan ADR-0004 (tidak ada data pribadi peserta di repositori) dan
GR-01 sampai GR-05:

- Peserta berusia di bawah umur. **Jangan menempelkan data pribadi** (nama,
  sekolah, kontak, NIK, tanggal lahir), kata sandi, atau kunci akses ke
  layanan AI mana pun (riset AI bagian 7, U-02; riset AI 5.3 tentang privasi).
- Rekaman belajar memakai rujukan pseudonim (`learnerRef`). Percakapan AI
  peserta bukan bagian dari rekaman belajar dan tidak dimasukkan ke repositori.
- Pemilihan layanan AI untuk dipakai peserta (akun, batas usia, kebijakan
  privasi penyedia) adalah keputusan penyelenggara di luar repositori ini;
  dokumen ini tidak merekomendasikan produk tertentu.

## 5. Peran mentor

| Peran | Tugas |
| --- | --- |
| Mentor lead | Menjelaskan kebijakan ini pada awal kohort (langkah cohort start pada [`runbook.md`](runbook.md)), memastikan syllabus-check atas aturan kontes resmi dilakukan sebelum siklus, dan memutuskan penanganan pelanggaran |
| Mentor | Menyatakan tingkat AI (Merah atau Kuning) pada setiap kegiatan; menjalankan simulasi kontes dan checkpoint tanpa AI; memastikan *re-solve* tanpa AI dilakukan setelah penjelasan; menanggapi pelanggaran sebagai bahan belajar dahulu, bukan hukuman |
| Peserta | Mengerjakan soal sendiri lebih dahulu; memakai AI hanya sebagai penjelas setelahnya; mencatat pemakaian pada *error log* |

Pengawasan sulit dilakukan di luar sesi (risiko pilihan U-01 A pada riset AI
bagian 7), sehingga kebijakan ini bertumpu pada penjelasan alasan kepada
peserta dan pada *re-solve* tanpa AI sebagai pemeriksaan nyata: bila peserta
tidak mampu menyelesaikan ulang, hal itu terlihat pada status B/C dan laporan
`osn report`.

## 6. Catatan yang belum diputuskan (tidak diterapkan)

Riset ilmu belajar 8.1 mencatat beberapa usulan di lapisan prosedur yang
**belum diputuskan pemilik** dan karenanya **tidak** menjadi bagian kebijakan
ini: jadwal *re-solve* berjenjang (ulang kedua lebih jauh), langkah
"membandingkan dua contoh dan menamai pola", serta catatan istirahat pada fase
intensif. Bila pemilik memutuskan, tambahkan lewat revisi dokumen ini.
Tinjau ulang kebijakan ini bersama dokumen riset (siklus enam bulan, keputusan
#139).

## Changelog

| Versi | Tanggal | Perubahan |
| --- | --- | --- |
| v1.0.0 | 2026-11-19 | Versi awal. Menerapkan U-01 sesuai keputusan pemilik pada #139: tanpa AI saat kerja soal, *re-solve*, simulasi kontes, dan checkpoint; AI penjelas setelah penyelesaian mandiri dengan *re-solve* tanpa AI; aturan kontes resmi dicek dari sumber resmi; privasi; peran mentor. |
