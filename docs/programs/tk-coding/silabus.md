# Silabus Pembelajaran Coding TK/PAUD (Berpikir Komputasional) — v1.0

- **Version:** v1.0.1
- **Last updated:** 2026-11-19
- **Status:** DISETUJUI pemilik program, 2026-11-19, beserta rekomendasi penyusun untuk setiap pertanyaan terbuka (keputusan lewat dialog pilihan, dicatat di issue #127; bagian 9). Rencana 48 minggu tanpa layar sebagai bawaan.
- **Changeset:** Silabus v1.0 disetujui pemilik: draf v0.1.0-draf dipertahankan isinya; pertanyaan terbuka (bagian 9) diganti keputusan pemilik (opsi rekomendasi tiap pertanyaan); `silabus-draf.md` menjadi `silabus.md`, sumber corpus `data/tk-coding/` (issue #127, ADR-0006, ADR-0008). Revisi patch v1.0.1 (#165): kalimat status yang basi; isi kurikulum tidak berubah.

> **Disetujui pemilik program pada 2026-11-19** (keputusan lewat dialog
> dengan opsi rekomendasi penyusun untuk setiap pertanyaan; bagian 9, issue
> #127). Dokumen ini konten **karangan** (*authored*) menurut
> [ADR-0007](../../architecture/adr/0007-authored-learning-content.md) yang
> menjadi sumber corpus program `tk-coding` (ADR-0006). Ia bukan dokumen
> pemerintah. Kutipan resmi di bagian 1 adalah transkripsi persis dari berkas
> yang dibuka pada 2026-11-19 (rinci dan dengan tautan di
> [`riset.md`](riset.md)); selebihnya rancangan penyusun yang disetujui.
> Butir bertanda `[belum terverifikasi]` tetap belum terverifikasi, dan butir
> `[asumsi]` tetap rancangan penyusun yang kini disetujui sebagai bagian dari
> v1.0. Pemetaan ke CP (bagian 4) adalah **irisan penafsiran** penyusun, bukan
> pemenuhan CP. Konten sampel bersifat umum dan **tanpa data anak sungguhan**
> ([ADR-0004](../../architecture/adr/0004-no-learner-personal-data.md)).

## 0. Cara membaca dokumen ini

- `[belum terverifikasi]`: tidak dapat dipastikan dari sumber resmi yang benar-benar dibuka. Jangan diperlakukan sebagai fakta.
- `[asumsi]`: keputusan perancangan penyusun, bukan data resmi.
- Kode minggu: `TK-<kelompok><semester>-M<n>`, misalnya `TK-A1-M3` (TK A, semester 1, minggu 3), `TK-B2-M10` (TK B, semester 2, minggu 10). `A` = TK A (usia sekitar 4-5 tahun) dan `B` = TK B (usia sekitar 5-6 tahun) `[asumsi]`.
- Kode butir CP: `FF-<elemen>-<huruf>`. `FF` = Fase Fondasi; elemen `DL` = Dasar-dasar Literasi, Matematika, Sains, Teknologi, Rekayasa, dan Seni; `JD` = Jati Diri. Huruf (a, b, c, ...) memberi urutan butir (subelemen) pada daftar resmi; pemberian huruf adalah pemenggalan penyusun, kata-kata CP tidak diubah (bagian 4.1).
- Istilah resmi untuk PAUD adalah **berpikir komputasional**. Judul "coding" dipakai sesuai permintaan pemilik; lihat bagian 9, Q5.

## 1. Sumber resmi dan status verifikasi

**Tanggal dicek: 2026-11-19.**

### 1.1 Yang terverifikasi dari dokumen resmi yang dibuka

| Butir | Nilai | Bukti |
| --- | --- | --- |
| CP berlaku | Keputusan Kepala BSKAP Kementerian Pendidikan Dasar dan Menengah Nomor 046/H/KR/2025 tentang Capaian Pembelajaran pada PAUD, Jenjang Pendidikan Dasar, dan Jenjang Pendidikan Menengah, 16 Juli 2025; mencabut 32/H/KR/2024. Lampiran I: CP Fase Fondasi di akhir satuan PAUD (TK, TKLB, RA, KB, TPA, atau bentuk lain yang sederajat). | Salinan di `bpmpbabel.kemendikdasmen.go.id` (riset 2.1). |
| Fase Fondasi | Satu fase untuk PAUD dengan tiga elemen terpadu: Nilai Agama dan Budi Pekerti, Jati Diri, dan Dasar-dasar Literasi, Matematika, Sains, Teknologi, Rekayasa, dan Seni. | Lampiran I, bagian D. |
| Pedoman koding dan KA | Keputusan Menteri Pendidikan Dasar dan Menengah Nomor 127/P/2025, 4 September 2025. Ruang lingkup PAUD: "pembelajaran muatan pengembangan berpikir komputasional pada pendidikan anak usia dini". | Salinan di `bpmpbabel.kemendikdasmen.go.id` (riset 2.2). |
| Waktu layar | WHO (2019): usia 3-4 tahun "Sedentary screen time should be no more than 1 hour; less is better."; 1 tahun tidak dianjurkan; di bawah 1 tahun "Screen time is not recommended." | Siaran pers WHO (riset 3). |

### 1.2 Kutipan persis: elemen 3 Fase Fondasi (Lampiran I, bagian D)

**3. Dasar-dasar Literasi, Matematika, Sains, Teknologi, Rekayasa, dan Seni**

- "Murid mengenali dan memahami berbagai informasi, mengomunikasikan perasaan dan pikiran secara lisan, tulisan, atau menggunakan berbagai media serta membangun percakapan, menunjukkan minat, dan berpartisipasi dalam kegiatan pramembaca;"
- "Murid memiliki kepekaaan bilangan; mengidentifikasi pola; memiliki kesadaran tentang bentuk, posisi, dan ruang; menyadari adanya persamaan dan perbedaan karakteristik antar objek; mampu melakukan pengukuran dengan satuan tidak baku; dan memiliki kesadaran mengenai waktu;"
- "Murid mampu mengamati, menyebutkan alasan, pilihan atau keputusannya, mampu memecahkan masalah sederhana, serta mengetahui hubungan sebab akibat dari suatu kondisi atau situasi yang dipengaruhi oleh hukum alam dan kondisi sosial;"
- "Murid menunjukkan kemampuan awal menggunakan dan merekayasa teknologi serta untuk mencari informasi, gagasan, dan keterampilan secara aman dan bertanggung jawab; dan"
- "Murid mengeksplorasi berbagai proses seni, mengekspresikannya, serta mengapresiasi karya seni."

Dari elemen 2 (Jati Diri) yang dipakai silabus ini:

- "Murid mengenali, mengekspresikan, dan mengelola emosi diri, serta membangun hubungan sosial secara sehat;"
- "Murid memiliki fungsi gerak (motorik kasar, halus, dan taktil) untuk merawat dirinya, membangun kemandirian dan berkegiatan)."

Penjelasan lingkup (Lampiran I, bagian A):

- Matematika: "Matematika pada konteks PAUD meliputi kemampuan menyatakan hubungan antar bilangan dengan berbagai cara (kesadaran bilangan), mengidentifikasi pola, mengenali bentuk dan karakteristik benda di sekitar yang dapat dibandingkan dan diukur, analisis data, mengklasifikasi objek, dan kesadaran mengenai waktu."
- Teknologi: "Teknologi dalam konteks PAUD meliputi kemampuan awal untuk mengenali bentuk dan fungsi benda buatan manusia yang digunakan dalam kehidupan sehari-hari serta memahami penggunaannya secara aman dan bertanggung jawab."
- Rekayasa: "Rekayasa dalam konteks PAUD meliputi kemampuan merencanakan dan merancang sesuatu untuk menyelesaikan masalah dalam kehidupan sehari-hari."

### 1.3 Kutipan persis: kebijakan koding dan KA untuk PAUD (Kepmendikdasmen 127/P/2025)

- "Satuan PAUD dapat mengintegrasikan muatan pengembangan berpikir komputasional pada kegiatan intrakurikuler, kokurikuler, atau ekstrakurikuler." (Lampiran, BAB II B butir 5)
- "Tanpa perangkat digital (unplugged). Pembelajaran tanpa perangkat digital berbasis aktivitas melalui simulasi, permainan, dan aktivitas fisik lainnya." (BAB II B)
- "Menyediakan muatan pengembangan berpikir komputasional yang terintegrasi dalam kegiatan pembelajaran pada pendidikan anak usia dini ... sesuai ketersediaan sumber daya." (BAB VII C butir 1; pemenggalan "..." oleh penyusun)
- "Melibatkan orang tua dan komunitas dalam mengembangkan koding dan kecerdasan artifisial yang bermakna." (BAB VII C butir 5)

### 1.4 Belum terverifikasi

| Butir | Status |
| --- | --- |
| Alokasi waktu belajar harian/mingguan PAUD | `[belum terverifikasi]`: panduan yang dibuka tidak memuat angka; silabus memakai asumsi (bagian 3). |
| Panduan CP Fase Fondasi PAUD (repositori Kemendikdasmen) dan Panduan Mata Pelajaran Koding dan KA (12 September 2025) | `[belum terverifikasi]`: tidak terbuka dari lingkungan penyusun (riset 2.5). Apakah memuat contoh kegiatan PAUD tidak diketahui. |
| Perubahan CP setelah 046/H/KR/2025 yang menyentuh PAUD | `[belum terverifikasi]`: SK perubahan (BKPDM 020/2026) tidak dibuka. |
| Batas waktu layar IDAI | `[belum terverifikasi]` (riset 3); tidak dipakai. |
| Batas waktu layar untuk usia 5-6 tahun | Tidak ada angka dari WHO 2019 (cakupan di bawah 5 tahun); silabus memakai angka usia 3-4 tahun sebagai batas konservatif `[asumsi]`. |

## 2. Prinsip dan tujuan

### 2.1 Prinsip

1. **Bermain adalah belajar.** Seluruh kegiatan berbentuk permainan dengan anak sebagai pelaku aktif; tidak ada latihan nirkonteks (*drilling*), sesuai Lampiran I.
2. **Mayoritas tanpa layar.** Seluruh rencana inti 48 minggu tanpa perangkat digital (*unplugged*). Layar hanya opsi kecil, didampingi guru, dan keputusan pemilik (bagian 8 dan 9).
3. **Batas waktu layar.** Program tidak menambah beban layar anak: bawaan 0 menit; bila opsi layar dipilih, paling lama `[asumsi]` 10 menit per minggu, ditampilkan guru untuk kelompok, tanpa tugas rumah berlayar (bagian 3).
4. **Konkret sebelum simbol.** Urutan: tubuh dan benda nyata, kartu bergambar, panah, lalu (opsional) layar.
5. **Tanpa penilaian angka.** Hanya observasi naratif dan ceklis amatan; tidak ada nilai, peringkat, atau label (bagian 6).
6. **Tanpa data anak di repositori.** Tidak ada foto, nama, atau suara anak; aplikasi tanpa akun anak (bagian 7).
7. **Keluarga sebagai mitra.** Kegiatan rumah selalu tanpa layar dan bersifat ajakan (bagian 6.3).
8. **Laju berbeda.** Pembagian TK A dan TK B hanya pengaturan tingkat kesulitan; panduan resmi menyebut pembelajaran "tidak perlu dikunci menjadi capaian per usia".

### 2.2 Tujuan

Pada akhir TK B, anak dapat `[asumsi]`:

1. menyusun dan menceritakan urutan 3-4 langkah kegiatan sehari-hari dan memperbaiki urutan yang terbalik;
2. mengenali, melanjutkan, dan membuat pola sederhana (warna, gerak, bunyi);
3. mengelompokkan benda menurut satu aturan, lalu dua aturan, dan menyebutkan aturannya;
4. memberi dan mengikuti instruksi arah sederhana (maju, belok kiri, belok kanan, berhenti, ulangi) di kisi lantai, serta mengoreksi instruksi yang salah;
5. memecah tugas sederhana menjadi bagian-bagian dan menyebutkan alasan pilihannya;
6. merencanakan, membuat, mencoba, dan memperbaiki rancangan benda sederhana;
7. mengenali alat di sekitar dan memakainya dengan aman, serta menyebutkan aturan aman memakai perangkat digital (diperkenalkan oleh orang dewasa).

Seluruh tujuan adalah irisan dengan CP (bagian 4); tujuan ini bukan pemenuhan CP.

## 3. Struktur waktu dan rencana

### 3.1 Struktur waktu `[asumsi]`

| Butir | Nilai | Status |
| --- | --- | --- |
| Kelompok | TK A (usia sekitar 4-5 tahun) dan TK B (usia sekitar 5-6 tahun); contoh dokumen perencanaan resmi memakai "Kelompok Usia : 4-5 Tahun" | Pembagian usia `[asumsi]`; CP tidak per usia. |
| Tahun ajaran | Dua semester per kelompok: `A1`, `A2`, `B1`, `B2` | `[asumsi]` |
| Minggu per semester | 12 minggu materi (M1-M10 tema, M11 permainan besar, M12 refleksi); cadangan untuk libur dan hari besar di luar 12 minggu | `[asumsi]` |
| Sesi inti | 1 sesi per minggu: TK A 20 menit, TK B 30 menit, di kegiatan inti atau bermain `[asumsi]` | Alokasi resmi `[belum terverifikasi]`. |
| Integrasi harian | Opsional 5-10 menit pada kegiatan harian (kegiatan awal, cerita, merapikan) memakai konsep minggu itu | `[asumsi]` |
| Waktu layar program | Bawaan 0 menit. Opsi (hanya TK B semester 2, minggu `TK-B2-M9` dan `TK-B2-M10`): paling lama 10 menit per minggu, guru memegang perangkat | `[asumsi]`; bergantung Q1. |
| Kelompok anak | Seluruh kelas; kerja berpasangan atau kelompok kecil tiga sampai empat anak | `[asumsi]` |

Total: 4 semester x 12 minggu = 48 minggu (kode `TK-A1-M1` sampai `TK-B2-M12`).

### 3.2 Pola setiap sesi `[asumsi]`

1. **Pembuka (3-5 menit):** lagu atau cerita pendek yang memuat konsep minggu itu.
2. **Permainan inti (10-18 menit):** satu permainan tubuh atau meja yang dicontohkan guru dahulu.
3. **Mencoba dan memperbaiki (3-5 menit):** anak mencoba lagi atau saling membantu; kesalahan diperlakukan sebagai bagian bermain.
4. **Penutup (2-3 menit):** anak bercerita apa yang ia lakukan; guru mengajukan satu pertanyaan terbuka.

### 3.3 Rencana TK A semester 1 (`TK-A1`): mengenal urutan, pola, dan aturan

| Minggu | Tema | Tujuan (anak mampu ...) | Kegiatan | Diamati guru | CP |
| --- | --- | --- | --- | --- | --- |
| TK-A1-M1 | Kegiatan sehari-hariku | menyebut dua kegiatan yang terjadi berurutan dalam sehari (pagi ke siang) | kartu gambar dua langkah (cuci tangan lalu makan); anak menempel urutannya | menyebut mana yang lebih dulu; menunjuk kartu | FF-DL-b |
| TK-A1-M2 | Cerita tiga gambar | menceritakan tiga gambar dalam urutan awal-tengah-akhir | guru membacakan cerita pendek; anak menyusun tiga gambar dan menceritakan ulang | menceritakan dengan kata sendiri; menyusun gambar | FF-DL-a, FF-DL-c |
| TK-A1-M3 | Aku robot, kamu pemandu | mengikuti satu perintah gerak ("jalan", "berhenti") | permainan "robot" tubuh: guru memberi satu perintah, anak bergerak; lalu anak bergantian memberi perintah | berhenti dan jalan sesuai perintah; berani memberi perintah | FF-DL-d, FF-JD-e |
| TK-A1-M4 | Kiri dan kanan | menunjuk arah kiri dan kanan tubuhnya pada permainan | lagu gerak "kiri-kanan"; langkah di jalur selotip; stiker di tangan kiri | menunjuk dengan benar sebagian besar waktu; mau mencoba lagi bila keliru | FF-DL-b, FF-JD-e |
| TK-A1-M5 | Pola warna | melanjutkan pola dua unsur (AB) dari benda | manik besar, tutup botol, atau balok berwarna: guru memulai "merah-biru-merah-..." | melanjutkan; menyebut unsur berikutnya | FF-DL-b |
| TK-A1-M6 | Pola gerak dan bunyi | meniru pola gerak/bunyi AB lalu menyebutnya | tepuk-hentak-tepuk-hentak; anak memimpin satu pola | meniru; membuat pola sendiri walau sederhana | FF-DL-b, FF-DL-e |
| TK-A1-M7 | Kumpulan benda | mengelompokkan benda menurut satu sifat (warna atau bentuk) | wadah warna-warni berisi benda kelas (bahan bekas aman); anak membagi ke dua kotak | membagi dengan aturan; menyebut aturannya dengan kata sendiri | FF-DL-b |
| TK-A1-M8 | Tebak aturan | menebak aturan pengelompokan teman | guru atau teman mengelompokkan; anak menebak ("karena semuanya bulat") | menebak aturan; menjelaskan alasan | FF-DL-b, FF-DL-c |
| TK-A1-M9 | Alat di sekitar kita | menyebut nama dan fungsi satu alat buatan manusia di sekitar | "kotak alat" (sendok, sikat, gunting anak, sisir): anak menebak fungsi dari peragaan | mengenali bentuk dan fungsi; bercerita pemakaian | FF-DL-d |
| TK-A1-M10 | Memakai alat dengan aman | menyebut satu aturan aman memakai alat | peragaan guru (gunting anak, pegang ujung); anak memotong kertas berpola sambil menyebut aturan | menerapkan aturan aman; mengingatkan teman dengan sopan | FF-DL-d, FF-JD-e |
| TK-A1-M11 | Permainan besar: jalan robot | mengikuti urutan dua perintah dalam permainan kelas | jalur rintangan selotip; kartu "maju" dan "berhenti"; kelompok kecil bergantian | mengikuti perintah dua langkah; bekerja bergantian | FF-DL-d, FF-JD-c |
| TK-A1-M12 | Pameran kecil dan cerita | menceritakan satu permainan yang paling disukai | gelar karya (susunan pola, kartu urutan); anak bercerita; refleksi kelas | bercerita; menyebut apa yang dipelajari | FF-DL-a |

### 3.4 Rencana TK A semester 2 (`TK-A2`): urutan lebih panjang, arah, dan memperbaiki

| Minggu | Tema | Tujuan (anak mampu ...) | Kegiatan | Diamati guru | CP |
| --- | --- | --- | --- | --- | --- |
| TK-A2-M1 | Urutan empat langkah | menyusun empat gambar kegiatan (menanam biji) | kartu gambar; anak menyusun lalu memperagakan | menyusun dengan sedikit bantuan; memperagakan | FF-DL-b, FF-DL-c |
| TK-A2-M2 | Eh, ada yang terbalik! | menemukan satu langkah yang salah letak | guru sengaja menukar dua kartu; anak menemukan dan membetulkan | menemukan kesalahan; menyebut bagian yang salah | FF-DL-c |
| TK-A2-M3 | Maju dan belok | mengikuti dua perintah berbeda (maju, belok kiri) | permainan "robot" dengan kartu panah besar di lantai | mengikuti; menunjukkan kiri dan kanan | FF-DL-b, FF-DL-d |
| TK-A2-M4 | Peta kisi 3x3 | membawa boneka ke tujuan di peta selotip | kisi 3x3 di lantai; kartu panah; teman jadi boneka; teman memberi perintah | memberi perintah dengan kata atau kartu | FF-DL-b, FF-DL-d |
| TK-A2-M5 | Pola tiga unsur | melanjutkan pola AAB dan ABC | manik atau potongan kain; guru memulai pola | melanjutkan benar; memberi alasan | FF-DL-b |
| TK-A2-M6 | Pola di sekitar kita | menemukan dan menyebut satu pola (motif kain, anyaman, ubin) di lingkungan | jalan keliling lingkungan sekolah; menunjuk pola; menggambar satu | menemukan pola; membuat sendiri | FF-DL-b, FF-DL-e |
| TK-A2-M7 | Sebab dan akibat | menyebut akibat dari satu kejadian ("jika air dituang, ...") | kartu sebab-akibat bergambar; percobaan air dan spons | menyebutkan akibat; menjelaskan | FF-DL-c |
| TK-A2-M8 | Kenapa aku memilih ini? | menyebut satu alasan atas pilihannya | dua pilihan jalan di kisi; anak memilih dan berkata mengapa | menyebut alasan sederhana | FF-DL-c |
| TK-A2-M9 | Bagi-bagi tugas | menyebut dua bagian dari tugas kelas (merapikan mainan) | membagi merapikan: kotak biru dulu, lalu kotak merah; anak memilih bagian | membagi tugas; membantu teman | FF-DL-c, FF-JD-c |
| TK-A2-M10 | Merancang kipas | membuat kipas kertas sederhana dan mencoba | lipat kertas; coba; ubah rancangan | merancang; mencoba lagi; menjelaskan | FF-DL-d, FF-JD-e |
| TK-A2-M11 | Permainan besar: raja urutan | menyusun urutan kegiatan kelompok | kartu urutan besar; kelompok berlomba rapi, bukan cepat | bekerja sama; urutan masuk akal | FF-JD-c, FF-DL-b |
| TK-A2-M12 | Pameran dan cerita | menceritakan karya atau permainan favorit | gelar karya; anak bercerita; refleksi | bercerita; menunjukkan kebanggaan | FF-DL-a |

### 3.5 Rencana TK B semester 1 (`TK-B1`): program kartu, memperbaiki, dan mengulang

| Minggu | Tema | Tujuan (anak mampu ...) | Kegiatan | Diamati guru | CP |
| --- | --- | --- | --- | --- | --- |
| TK-B1-M1 | Tiga perintah arah | mengikuti tiga perintah beruntun di kisi lantai | kisi 4x4; kartu panah; "robot" mengikuti kartu | mengikuti; menunjuk arah | FF-DL-b, FF-DL-d |
| TK-B1-M2 | Menyusun program untuk teman | menyusun tiga sampai empat kartu panah ke tujuan | anak menyusun kartu; teman menjalankan sebagai robot | menyusun; menjelaskan | FF-DL-d, FF-JD-c |
| TK-B1-M3 | Program salah, perbaiki! | menemukan satu kartu keliru dan memperbaikinya | guru menyiapkan program yang salah; anak menjalankan, menemukan, memperbaiki | menemukan; mencoba tanpa putus asa | FF-DL-c |
| TK-B1-M4 | Pola kotak | melanjutkan pola dua dimensi sederhana | karpet kotak; potongan warna; guru memulai pola | melanjutkan; menyebut aturan | FF-DL-b |
| TK-B1-M5 | Ulangi dua kali | memahami "ulangi" pada kartu (ulang dua kali) | kartu "ulang x2"; tepuk pola diulang | menggunakan kartu ulang; menjelaskan | FF-DL-b, FF-DL-d |
| TK-B1-M6 | Lagu yang berulang | menyebut bagian lagu yang berulang | lagu dengan reff; anak menandai dengan gerak | menandai bagian berulang | FF-DL-b, FF-DL-e |
| TK-B1-M7 | Dua aturan | mengelompokkan benda menurut dua aturan | lingkaran hula dua buah berpotongan (warna dan bentuk); benda bahan bekas | mengelompokkan; menjelaskan alasan | FF-DL-b, FF-DL-c |
| TK-B1-M8 | Gambar data | membaca gambar kolom sederhana (piktogram) | tiap anak menaruh stiker cuaca hari ini; kelas membaca "mana paling banyak" | membaca; menyebut banyak atau sedikit | FF-DL-b |
| TK-B1-M9 | Alat dan mesin sederhana | menyebut cara kerja alat sederhana (pompa, roda, tuas) | peragaan pompa sepeda; gelindingan roda; mencoba | mengenali fungsi; menjelaskan aturan aman | FF-DL-d |
| TK-B1-M10 | Mencari informasi bersama | menyebut sumber tempat mencari informasi (buku, orang, gambar) | pojok buku; anak bertanya dan mencari jawaban satu pertanyaan bersama guru | mengajukan pertanyaan; mencari | FF-DL-a, FF-DL-d |
| TK-B1-M11 | Permainan besar: peta harta | menyusun program kartu untuk mencapai "harta" di peta | kisi 5x5; rintangan; kelompok menyusun program dan mengujinya | menyusun, menguji, memperbaiki | FF-DL-c, FF-JD-c |
| TK-B1-M12 | Pameran dan cerita | menceritakan program atau permainan favorit | gelar karya; bercerita; refleksi | bercerita; menjelaskan langkah | FF-DL-a |

### 3.6 Rencana TK B semester 2 (`TK-B2`): menuju SD

| Minggu | Tema | Tujuan (anak mampu ...) | Kegiatan | Diamati guru | CP |
| --- | --- | --- | --- | --- | --- |
| TK-B2-M1 | Maju, belok, ulangi | menggabungkan perintah maju, belok, dan ulangi | kisi 5x5; kartu panah dan kartu ulang | menggabungkan; menyebutkan langkah | FF-DL-b, FF-DL-d |
| TK-B2-M2 | Dua jalan, mana lebih pendek? | membandingkan dua program ke tujuan yang sama | dua program kartu; hitung kartu; pilih yang lebih sedikit | membandingkan; menyebut alasan | FF-DL-c |
| TK-B2-M3 | Hambatan di jalan | menyusun program yang menghindari hambatan | kisi dengan balok sebagai rintangan; robot manusia atau robot lantai bila ada | menyusun; memperbaiki | FF-DL-c, FF-DL-d |
| TK-B2-M4 | Cari kesalahan program teman | menemukan kesalahan pada program teman dan membetulkan dengan sopan | tukar program; saling memeriksa; kartu "tanya dulu" | menemukan kesalahan; berkata santun | FF-DL-c, FF-JD-c |
| TK-B2-M5 | Memecah pekerjaan besar | membagi pembuatan menara balok menjadi bagian | kelompok merencanakan lewat gambar; membagi bagian | membagi; bekerja sama | FF-DL-c, FF-JD-c |
| TK-B2-M6 | Rancang lalu bangun | membuat gambar rencana lalu membangun dari balok | gambar rencana; membangun; menyamakan; memperbaiki | merencanakan; menyamakan hasil; memperbaiki | FF-DL-d |
| TK-B2-M7 | Gambar jadi simbol | memakai gambar atau simbol untuk mewakili benda atau perintah | kartu simbol buatan kelas (panah, bintang, rumah); sandi gambar sederhana | memakai simbol; menjelaskan | FF-DL-a, FF-DL-d |
| TK-B2-M8 | Cerita berurutan | membuat buku cerita tiga sampai empat halaman | menggambar tiap halaman; urutan; bercerita | menyusun; bercerita | FF-DL-a, FF-DL-e |
| TK-B2-M9 | Alat digital dengan aman | menyebut dua aturan memakai perangkat digital | cerita boneka tentang minta izin dan waktu layar; guru menunjukkan perangkat tanpa menyalakan aplikasi anak; opsi bila Q1 memilih layar: 10 menit demonstrasi guru | menyebut aturan; bertanya | FF-DL-d |
| TK-B2-M10 | Blok bergambar | mengurutkan blok bergambar menjadi cerita kecil | bawaan: blok kartu kertas (gerak, bunyi, ulang); opsi (Q1): satu demonstrasi guru aplikasi blok bergambar, paling lama 10 menit | menyusun blok; menjelaskan | FF-DL-b, FF-DL-d |
| TK-B2-M11 | Permainan besar: pameran untuk keluarga | memamerkan satu permainan kepada tamu | pojok-pojok permainan; keluarga mencoba bersama | menjelaskan permainan | FF-DL-a, FF-JD-c |
| TK-B2-M12 | Refleksi dan bekal SD | menyebut satu hal baru yang dikuasai | refleksi kelas; ringkasan naratif di sekolah (bukan di repo) | bercerita; rasa percaya diri | FF-DL-a |

## 4. Pemetaan ke elemen CP

### 4.1 Daftar butir CP yang dipakai (kutipan persis dari bagian 1.2)

| Kode | Butir (kutipan persis) |
| --- | --- |
| FF-DL-a | "Murid mengenali dan memahami berbagai informasi, mengomunikasikan perasaan dan pikiran secara lisan, tulisan, atau menggunakan berbagai media serta membangun percakapan, menunjukkan minat, dan berpartisipasi dalam kegiatan pramembaca;" |
| FF-DL-b | "Murid memiliki kepekaaan bilangan; mengidentifikasi pola; memiliki kesadaran tentang bentuk, posisi, dan ruang; menyadari adanya persamaan dan perbedaan karakteristik antar objek; mampu melakukan pengukuran dengan satuan tidak baku; dan memiliki kesadaran mengenai waktu;" |
| FF-DL-c | "Murid mampu mengamati, menyebutkan alasan, pilihan atau keputusannya, mampu memecahkan masalah sederhana, serta mengetahui hubungan sebab akibat dari suatu kondisi atau situasi yang dipengaruhi oleh hukum alam dan kondisi sosial;" |
| FF-DL-d | "Murid menunjukkan kemampuan awal menggunakan dan merekayasa teknologi serta untuk mencari informasi, gagasan, dan keterampilan secara aman dan bertanggung jawab; dan" |
| FF-DL-e | "Murid mengeksplorasi berbagai proses seni, mengekspresikannya, serta mengapresiasi karya seni." |
| FF-JD-c | "Murid mengenali, mengekspresikan, dan mengelola emosi diri, serta membangun hubungan sosial secara sehat;" |
| FF-JD-e | "Murid memiliki fungsi gerak (motorik kasar, halus, dan taktil) untuk merawat dirinya, membangun kemandirian dan berkegiatan)." |

### 4.2 Irisan konsep berpikir komputasional dengan CP `[asumsi]`

CP tidak memakai istilah koding atau berpikir komputasional (riset 2.1).
Pemetaan berikut adalah **penafsiran penyusun** atas irisan, bukan
rumusan resmi.

| Konsep di silabus | Irisan terdekat pada CP | Tingkat kecocokan |
| --- | --- | --- |
| Urutan, langkah | FF-DL-b ("kesadaran mengenai waktu"), FF-DL-c | Sedang: CP tidak menyebut urutan langkah secara eksplisit. |
| Pola | FF-DL-b ("mengidentifikasi pola") | Langsung. |
| Pengelompokan (klasifikasi), data sederhana | FF-DL-b ("menyadari adanya persamaan dan perbedaan karakteristik antar objek"); lingkup Matematika ("analisis data, mengklasifikasi objek") | Langsung. |
| Arah dan ruang | FF-DL-b ("kesadaran tentang bentuk, posisi, dan ruang") | Langsung. |
| Instruksi dan "program" kartu, perintah, pengulangan | FF-DL-d ("merekayasa teknologi"), FF-DL-c ("memecahkan masalah sederhana") | Sedang: CP tidak menyebut instruksi atau algoritma. |
| Memperbaiki kesalahan (*debugging*) | FF-DL-c ("memecahkan masalah sederhana") | Sedang. |
| Memecah tugas, merencanakan dan merancang | Lingkup Rekayasa ("merencanakan dan merancang sesuatu untuk menyelesaikan masalah dalam kehidupan sehari-hari") | Langsung. |
| Pemakaian alat dan perangkat dengan aman | FF-DL-d; lingkup Teknologi ("memahami penggunaannya secara aman dan bertanggung jawab") | Langsung. |
| Bekerja sama, bergantian | FF-JD-c | Langsung. |

### 4.3 Butir CP yang tidak disentuh

Silabus ini tidak membahas elemen Nilai Agama dan Budi Pekerti, subelemen
Jati Diri selain FF-JD-c dan FF-JD-e, serta kegiatan literasi dan seni di luar
yang menunjang cerita dan pameran. Pembelajaran PAUD harus tetap
memenuhi CP secara utuh lewat kegiatan lain TK; program ini hanya
**tambahan muatan berpikir komputasional** `[asumsi]`.

## 5. Jembatan ke program SD

- **Kebijakan.** Kepka 046/H/KR/2025 Diktum KEENAM: CP Fase A "disusun selaras dengan Capaian Pembelajaran pada fase fondasi untuk memastikan transisi pembelajaran yang berkesinambungan dari PAUD ke SD" (kutipan penuh enam kemampuan fondasi di riset 2.1). Mata pelajaran koding dan KA pilihan dimulai kelas V SD menurut halaman BBPMP yang dibuka (riset 2.5), bukan di PAUD.
- **Program `sd-coding`.** Silabus `sd-coding` (issue #128) disetujui pemilik pada 2026-11-19 dan kini ada di `docs/programs/sd-coding/silabus.md`. Jembatan berikut disusun sebelum silabus itu dibaca, bersifat rancangan sepihak, dan **harus disesuaikan** dengannya `[belum terverifikasi]`.

| Keluaran akhir TK B | Prasyarat untuk SD awal (Fase A) | Catatan |
| --- | --- | --- |
| Menyusun dan membetulkan urutan 3-4 langkah (`TK-B1-M2`, `TK-B2-M4`) | Mengurutkan langkah penyelesaian tugas | `[asumsi]` |
| Membuat dan melanjutkan pola (`TK-B1-M4`, `TK-B2-M1`) | Pola bilangan dan bentuk | `[asumsi]` |
| Kartu arah dan "program" di kisi (`TK-B2-M3`) | Instruksi dan algoritma sederhana tanpa layar | `[asumsi]` |
| Mengelompokkan dengan dua aturan (`TK-B1-M7`) | Klasifikasi dan tabel data | `[asumsi]` |
| Aturan memakai perangkat digital (`TK-B2-M9`) | Literasi digital dasar dan keamanan | `[asumsi]` |

Setelah `sd-coding` disetujui, kode jembatan ke kode minggu SD dicatat di sini
dan di pertanyaan Q8 (bagian 9).

## 6. Asesmen, peran guru, dan peran orang tua

### 6.1 Asesmen

Panduan resmi: "kemampuan fondasi merupakan perilaku yang dapat diamati, bukan kemampuan yang tepat diukur melalui tes tertulis maupun lisan. Hasil tes yang cenderung hanya berupa angka berisiko memberi pelabelan pada murid dan berpotensi mempengaruhi persepsi diri mereka secara negatif." Maka:

- **Tanpa nilai angka, peringkat, atau lulus-tidak lulus.**
- **Observasi** selama permainan; kolom "Diamati guru" di bagian 3 adalah panduan amatan, bukan soal.
- **Catatan anekdot** (definisi resmi: "Catatan singkat hasil observasi yang difokuskan pada performa dan perilaku yang menonjol, disertai latar belakang kejadian dan hasil analisis atas observasi yang dilakukan."): tiga sampai lima kalimat per kejadian, di buku catatan sekolah.
- **Ceklis amatan** `[asumsi]`: dua kolom, "terlihat" dan "belum terlihat", per tujuan sesi; tanpa skor.
- **Hasil karya** (susunan pola, gambar rencana, buku cerita) disimpan di portofolio sekolah dan dikembalikan ke keluarga.
- **Laporan** ke orang tua berupa narasi pertumbuhan, mengikuti kebiasaan sekolah; repo tidak memuat templat laporan berisi nama.
- **Ringkasan akhir TK B** (`TK-B2-M12`): narasi satu paragraf per anak di sekolah, bukan di repo.

### 6.2 Peran guru

Pemandu dan pengamat: mencontohkan, bertanya terbuka ("bagaimana kalau ...?"), membiarkan anak mencoba lagi; tidak memberi jawaban pertama. Keselamatan alat dan bahan (gunting anak, manik atau benda kecil yang dapat tertelan) tetap tanggung jawab guru, yang mengawasi sepanjang kegiatan `[asumsi]`.

### 6.3 Peran orang tua

Kebijakan resmi: "Melibatkan orang tua dan komunitas dalam mengembangkan koding dan kecerdasan artifisial yang bermakna" dan, di CP, "Pencapaian tujuan pembelajaran dilakukan melalui kemitraan dengan keluarga". Rancangan `[asumsi]`:

- surat mingguan satu halaman: apa yang dimainkan dan satu ide permainan **tanpa layar** di rumah (misalnya "tebak aturan" saat merapikan mainan);
- kegiatan rumah tidak wajib dan tidak diperiksa;
- menjelaskan kepada orang tua bahwa program tidak menambah waktu layar anak dan bahwa orang tua tidak perlu membeli perangkat;
- pameran `TK-B2-M11` sebagai undangan, dengan izin tertulis bila ada dokumentasi (dokumentasi tidak masuk repo).

## 7. Privasi dan kebutuhan sarana

### 7.1 Privasi (ADR-0004)

- Repositori **tidak** memuat foto, video, suara, nama, atau data pribadi anak, keluarga, atau sekolah nyata; hanya templat kosong dan contoh umum.
- Catatan anekdot, ceklis terisi, dan portofolio tetap di sekolah.
- Tidak ada akun anak di aplikasi atau layanan daring mana pun; perangkat dipegang guru.
- Aplikasi apa pun yang dipakai diperiksa guru lebih dulu: tanpa akun, tanpa iklan, tanpa pembelian, dan tanpa pengumpulan data pribadi anak. Label privasi pihak toko aplikasi dilaporkan pengembang dan tidak diverifikasi (riset 4.1).
- Dokumentasi foto kegiatan oleh sekolah mengikuti kebijakan dan izin orang tua sekolah itu sendiri; di luar repo.
- Rujukan hukum perlindungan data pribadi anak `[belum terverifikasi]`: teks UU dan PP terkait tidak dibuka (riset 2.5).

### 7.2 Sarana `[asumsi]`

| Tingkat | Perangkat dan bahan |
| --- | --- |
| Minimum (cukup untuk seluruh 48 minggu) | selotip atau kapur untuk kisi lantai; kertas karton dipotong menjadi kartu panah dan kartu gambar; bahan bekas aman (tutup botol, kardus, kain perca, manik besar); balok bangunan; kertas gambar. Tanpa listrik dan tanpa perangkat. |
| Menengah | kartu bergambar dicetak; hula hoop atau tali dua lingkaran; set balok standar. |
| Opsional | robot lantai berpemrograman tombol (bagian 8, opsi 2); satu tablet milik guru untuk demonstrasi (bagian 8, opsi 3). |

## 8. Opsi alat, trade-off, dan rekomendasi

Penilaian memakai kriteria: kelebihan dan kekurangan, keamanan dan privasi,
biaya, kemudahan perawatan, aksesibilitas, kompatibilitas CP, kompleksitas
operasional, dan implikasi jangka panjang. Fakta tiap alat ada di
[`riset.md`](riset.md) bagian 4.

| Opsi | Kelebihan | Kekurangan dan risiko | Biaya | Cocok CP dan kebijakan | Layar |
| --- | --- | --- | --- | --- | --- |
| **1. Unplugged penuh** (kartu, kisi lantai, "robot" tubuh, permainan) | Murah; tanpa akun dan data; memenuhi batas waktu layar; sah menurut kebijakan resmi; bisa disusun lokal | Butuh persiapan bahan dan pelatihan guru; tidak mengenalkan antarmuka digital | Hampir nol | Sangat cocok (pola, klasifikasi, pemecahan masalah, rekayasa) | 0 menit |
| **2. Unplugged + robot lantai tombol** (tanpa layar) | Konkret; debugging nyata; menarik bagi anak | Harga per unit dan ketersediaan lokal `[belum terverifikasi]`; perawatan baterai; satu robot untuk satu kelas terlalu sedikit; risiko berubah jadi hiburan | Sedang sampai tinggi | Cocok sebagai tambahan | 0 menit |
| **3. Unplugged + demonstrasi aplikasi blok bergambar oleh guru** (contoh ScratchJr; hanya `TK-B2-M9/M10`) | Mengenalkan antarmuka blok; gratis di toko; kode BSD-3-Clause | Perlu tablet; bahasa Indonesia belum terbukti; kode diarsipkan 2022; label privasi mencatat data penggunaan dan lokasi kasar; menambah layar | Gratis, namun perlu tablet | Cocok untuk TK B akhir bila layar dipilih | Sampai 10 menit per minggu |
| **4. Aplikasi/permainan koding komersial untuk anak** | Mulus dan menarik | Akun anak, iklan atau langganan, data anak; ketergantungan vendor | Berlangganan | Tidak dikaji | Banyak |

**Rekomendasi penyusun: Opsi 1 sebagai bawaan seluruh 48 minggu.** Alasan:
sah menurut kebijakan resmi, biaya terendah, aksesibilitas tertinggi (tanpa
listrik dan perangkat), privasi terkuat, tidak menambah beban layar yang
sudah dibatasi WHO, dan paling mudah dirawat. Opsi 2 dan 3 hanya sebagai
tambahan yang dipilih sekolah atau pemilik; opsi 4 tidak direkomendasikan.
Keputusan ada di Q1 dan Q6 (bagian 9).

## 9. Keputusan pemilik

Pemilik memutuskan pada 2026-11-19 (dialog pilihan; issue #127) untuk
**menyetujui rekomendasi penyusun pada setiap pertanyaan**. Setiap baris
mencatat opsi terpilih (yang bertanda tebal pada draf v0.1.0-draf) dan
konsekuensinya.

| No. | Pertanyaan | Keputusan pemilik (opsi terpilih) | Konsekuensi |
| --- | --- | --- | --- |
| Q1 | Penggunaan layar | (a) Seluruh rencana tanpa layar; `TK-B2-M9/M10` hanya unplugged | Nol layar; paling aman dan murah. |
| Q2 | Durasi dan frekuensi | (a) 1 sesi per minggu: TK A 20 menit, TK B 30 menit, plus integrasi harian opsional | Dapat diterapkan tanpa menambah jam. |
| Q3 | Cakupan usia | (a) TK A dan TK B (48 minggu) | KB/TPA usia 3-4 tahun tidak termasuk. |
| Q4 | Pembagian semester | (a) 12 minggu per semester seperti rencana | Kode minggu stabil. |
| Q5 | Penamaan program | (a) Id `tk-coding`, tetapi isi dokumen memakai istilah resmi "berpikir komputasional" | Konsisten dengan kebijakan; id tetap sejajar `sma-coding`. |
| Q6 | Alat opsional | (a) Tidak memakai alat berbayar; robot lantai dan aplikasi hanya catatan opsional | Tidak butuh anggaran perangkat. |
| Q7 | Pemakaian bahan CS Unplugged (CC BY-SA 4.0) | (a) Hanya rujukan ide; semua kegiatan ditulis ulang oleh tim | Tidak ada kewajiban lisensi turunan. |
| Q8 | Jembatan ke `sd-coding` | (a) Menunggu silabus `sd-coding` terbit, lalu menyelaraskan kode jembatan (bagian 5) | Jembatan bagian 5 tetap rancangan sepihak sampai disesuaikan. |
| Q9 | Persetujuan dan registrasi | (a) Draf disetujui; skema, `data/tk-coding/`, dan entri `data/programs.json` dibuat sesuai urutan ADR-0006 | Program terdaftar dan divalidasi (issue #127). |

## 10. Sumber dan batasan

- Dokumen ini hanya mengutip persis butir yang terverifikasi dari berkas yang dibuka (bagian 1; rujukan lengkap di `riset.md` bagian 7). Selebihnya `[asumsi]` atau `[belum terverifikasi]`.
- Kutipan Kepmendikdasmen 127/P/2025 berasal dari salinan pindai dengan lapisan teks yang tidak sempurna; salah baca huruf dinormalkan.
- Teknik pembelajaran (kegiatan mingguan) adalah rancangan penyusun, **tidak divalidasi oleh guru TK atau ahli PAUD**; pelatihan dan uji coba lapangan di luar scope draf.
- Klaim kajian pustaka tentang berpikir komputasional anak usia dini tidak diverifikasi dari jurnal (riset 4).
- Kepatuhan dan kelayakan jadwal terhadap Standar Proses PAUD `[belum terverifikasi]`.

## Changelog

| Versi | Tanggal | Perubahan |
| --- | --- | --- |
| v0.1.0-draf | 2026-11-19 | Draf awal (issue #127): sumber resmi, prinsip, struktur TK A dan TK B, rencana 48 minggu, pemetaan irisan ke CP, jembatan SD, asesmen, privasi, opsi alat, pertanyaan terbuka. Belum disetujui pemilik. |
| v1.0.0 | 2026-11-19 | Disetujui pemilik beserta rekomendasi penyusun (issue #127): status DISETUJUI, `silabus-draf.md` menjadi `silabus.md`, pertanyaan terbuka diganti keputusan pemilik (bagian 9). Isi rencana tidak diubah. |
| v1.0.1 | 2026-11-19 | Revisi patch: kalimat status, keputusan pemilik #165; isi kurikulum tidak berubah. |
