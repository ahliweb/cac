# Silabus Pembelajaran Coding SMP — v1.1

- **Version:** v1.1.1
- **Last updated:** 2026-11-19
- **Status:** DISETUJUI pemilik program, 2026-11-19 — beserta semua rekomendasi penyusun (bagian 10; keputusan lewat dialog pilihan, dicatat di issue #129). Modul pembelajaran di `content/smp-coding/` dan modul pendamping tidak termasuk persetujuan ini.
- **Changeset:** Silabus v1.1 disetujui pemilik (2026-11-19, keputusan di issue #139): bagian 7.1 "Kebijakan penggunaan AI" ditambah (pemakaian AI generatif oleh murid SMP tetap demonstrasi guru, tanpa akun murid; asesmen tanpa AI); butir "mengalihkan pekerjaan berpikir ke AI" ditambah di `SMP9-2-M10`, butir data pribadi dan kata sandi tidak ditempel ke layanan AI di `SMP8-2-M11`, energi dan biaya komputasi sebagai butir singkat dengan ketidakpastian; kode butir CP dan struktur 84 minggu tidak berubah. Sebelumnya: silabus v1.0 disetujui pemilik (2026-11-19) beserta rekomendasi penyusun: satu jalur inti blok ke pseudocode, Python hanya pengayaan di luar CP, CP KKA Fase D untuk materi AI kelas 9, klub OSN opsional, tanpa akun murid; butir Literasi Digital yang belum tercakup ditutup lewat modul pendamping (pekerjaan lanjutan); issue #129. Isi rencana sama dengan draf v0.2; yang berubah hanya status, bagian 10, changelog, dan satu koreksi hitungan di bagian 4 (`DK-BK-c`: 32 menjadi 31 minggu lain). Revisi patch v1.1.1 (#165): kalimat status yang basi; isi kurikulum tidak berubah.

> **Disetujui pemilik program pada 2026-11-19** (v1.0; keputusan lewat
> dialog pilihan, dicatat di issue #129, bagian 10). Dokumen ini konten
> **karangan** (*authored*) menurut
> [ADR-0007](../../architecture/adr/0007-authored-learning-content.md) dan
> bukan dokumen pemerintah; ia menjadi sumber corpus program `smp-coding`
> (ADR-0006, ADR-0008). Dasar riset dan semua status verifikasi ada di
> [`riset.md`](riset.md). Kutipan CP di bagian 1 adalah transkripsi sumber
> resmi; selebihnya rancangan penyusun yang kini disetujui. Butir bertanda
> `[belum terverifikasi]` tetap belum terverifikasi, dan butir `[asumsi]`
> tetap rancangan penyusun yang disetujui sebagai bagian dari v1.0. Draf asal
> (v0.2) tersimpan di riwayat git; modul pendamping tidak termasuk
> persetujuan ini.

## 0. Cara membaca dokumen ini

- `[belum terverifikasi]` = tidak dapat dipastikan dari sumber yang benar-benar
  dibuka penyusun; tidak boleh diperlakukan sebagai fakta.
- `[asumsi]` = keputusan perancangan penyusun, bukan data resmi.
- Kode minggu berbentuk `SMP<kelas>-<semester>-M<n>`: `SMP7-1-M3` = kelas 7,
  semester 1, minggu 3. Enam semester: `SMP7-1`, `SMP7-2`, `SMP8-1`, `SMP8-2`,
  `SMP9-1`, `SMP9-2`. Nomor `M<n>` adalah nomor minggu kalender semester.
- Ada **dua** rumusan CP resmi untuk SMP, sehingga ada dua keluarga kode butir:
  - `D-<ELEMEN>-<huruf>`: CP **Informatika** Fase D (elemen `BK` Berpikir
    Komputasional dan `LD` Literasi Digital), analog dengan kode `E-BK-a`
    pada silabus sma-coding. `D` = Fase D. Contoh: `D-BK-e` = "menuliskan
    sekumpulan instruksi ... dalam format pseudocode".
  - `DK-<ELEMEN>-<huruf>`: CP **Koding dan Kecerdasan Artifisial (KKA)** Fase D
    (elemen `BK`, `LD`, `EA` Literasi dan Etika Kecerdasan Artifisial, `PA`
    Pemanfaatan dan Pengembangan Kecerdasan Artifisial). Contoh: `DK-EA-g` =
    "menganalisis konten deep fake".
  - Huruf (a, b, c, ...) adalah pemenggalan **oleh penyusun** atas rumusan CP
    pada tanda titik koma dan koma antar kegiatan; kata-kata CP tidak diubah.
    Urutan huruf `D-BK-` dan `D-LD-` sama dengan urutan tujuan pembelajaran
    `1.1`-`1.5` dan `2.1`-`2.17` pada contoh ATP Fase D di Panduan (`D-LD-a` =
    2.1, dan seterusnya; untuk BK urutan CP berbeda dari urutan TP).
- Tanda `*` pada kode (mis. `DK-BK-c*`) berarti kegiatannya memakai
  pemrograman teks (Python), yang **melampaui** rumusan CP: kode itu hanya irisan
  terdekat, bukan pemenuhan (bagian 4). `pengayaan` berarti tidak ada butir CP
  resmi yang cocok.
- Awalan `D-` dan `DK-` hanya untuk butir CP; kode minggu selalu berawalan
  `SMP`, sehingga tidak bertabrakan dengan kode jalur program lain.

## 1. Sumber dan kutipan CP

**Tanggal sumber: Panduan diunduh orchestrator 2026-11-18; SK 046 salinan yang ditemukan orchestrator (tanggal unduh tidak tercatat); penyusun mencocokkan kutipan 2026-11-19.**

### 1.1 Status sumber

| Butir | Nilai | Status |
| --- | --- | --- |
| Panduan Mata Pelajaran Informatika, Fase D-F, BSKAP Kemendikdasmen, Pusat Kurikulum dan Pembelajaran 2025 | `https://repositori.kemendikdasmen.go.id/33634/1/32.%20Panduan%20Mata%20Pelajaran%20Informatika.pdf` (sumber yang sama dengan silabus sma-coding bagian 1) | **Terverifikasi**: teks lengkap tersedia (diunduh orchestrator, `pdftotext`); CP Fase D di bagian B.d halaman 11-12 cetak. Penyusun sendiri tidak dapat menjangkau URL itu (`riset.md` bagian 2). |
| SK Kepala BSKAP 046/H/KR/2025 tentang CP (ditetapkan 16 Juli 2025; mencabut 032/H/KR/2024) | Salinan PDF bertanda "SALINAN" yang ditemukan orchestrator | Teksnya dibuka dan dikutip. **URL asal belum terverifikasi.** Memuat CP Informatika (Lampiran II, bagian XI) dan CP Koding dan KA (Lampiran II, bagian XXVIII). |
| Pemetaan fase ke kelas | Fase D = kelas VII, VIII, dan IX SMP/MTs/Paket B | CP KKA: "Umumnya untuk Kelas VII, VIII dan IX SMP/MTs". Salinan SK menulis CP Informatika Fase D untuk "Kelas VII, VIII, dan XI" (tampak salah ketik; kelas IX); Panduan memakai tiga kelas VII, VIII, IX pada contoh ATP. |
| Regulasi mata pelajaran pilihan Koding dan KA | SK 046 menyebut Permendikdasmen Nomor 13 Tahun 2025 (perubahan Permendikbudristek 12 Tahun 2024) pada konsiderans | Nomor Permen terverifikasi dari konsiderans SK; **teks Permen tidak dibuka**; ketentuan "pilihan" dan JP `[belum terverifikasi]` dari teks regulasi (`riset.md` bagian 3). |

Perhatikan perbedaan dua CP. CP **Informatika** Fase D hanya berelemen
Berpikir Komputasional dan Literasi Digital; ia **tidak** memuat elemen
Algoritma dan Pemrograman, tidak memuat pemrograman teks, dan menyebut
pseudocode serta (dalam materi esensial Panduan) pemrograman visual sebagai
bagian "Dasar pemrograman". CP **KKA** Fase D berelemen BK, LD, Literasi dan
Etika KA, serta Pemanfaatan dan Pengembangan KA; juga tanpa elemen
Algoritma Pemrograman dan Analisis Data (elemen itu baru muncul di Fase E).

### 1.2 Kutipan CP Informatika Fase D (Panduan, bagian B.d.1)

Hanya spasi dan pemenggalan baris yang dinormalkan (juga penanda pergantian halaman di tengah kutipan Literasi Digital).

*1.1 Berpikir Komputasional*

> Pada akhir fase D, murid mampu menerapkan berpikir komputasional untuk problem dalam kehidupan sehari-hari maupun dalam menghadapi masalah komputasi; memahami konsep himpunan data terstruktur dalam kehidupan sehari-hari; memahami konsep lembar kerja pengolah data; menerapkan berpikir komputasional dalam menyelesaikan persoalan yang mengandung himpunan data berstruktur sederhana dengan volume kecil; serta menuliskan sekumpulan instruksi dengan menggunakan sekumpulan kosakata terbatas atau simbol dalam format pseudocode.

*1.2 Literasi Digital*

> Pada akhir fase D, murid mampu memahami cara kerja dan penggunaan mesin pencari di internet; mengetahui kualitas informasi dan kredibilitas sumber informasi digital; mengenal ekosistem media pers digital; membedakan fakta, opini, dan hoaks; memahami pemanfaatan perangkat teknologi pengolah dokumen, lembar kerja, dan presentasi; mampu mendeskripsikan komponen, fungsi, dan cara kerja komputer; memahami konsep dan penerapan konektivitas jaringan lokal dan internet baik kabel maupun nirkabel; mengetahui jenis ruang publik virtual; memahami pemanfaatan perangkat teknologi digital untuk produksi dan diseminasi konten; memahami pentingnya menjaga rekam jejak digital, mengamalkan toleransi dan empati di dunia digital, memahami dampak perundungan digital, membuat kata sandi yang aman; memahami pengamanan perangkat dari berbagai jenis malware, memilah informasi yang bersifat privat dan publik, melindungi data pribadi dan identitas digital serta memiliki kesadaran penuh (mindfulness) dalam dunia digital.

### 1.3 Kutipan CP Koding dan Kecerdasan Artifisial Fase D (SK 046/H/KR/2025, Lampiran II, bagian XXVIII.D.2)

Teks di bawah mengikuti salinan SK yang ditemukan orchestrator (URL asal
belum terverifikasi). Setiap kutipan didahului kalimat pembuka SK: "Pada akhir
Fase D, murid memiliki kemampuan sebagai berikut." Hanya spasi, pemenggalan
baris, dan karakter tak terlihat (spasi lebar nol) yang dinormalkan.

*2.1 Berpikir Komputasional*

> Menerapkan pengelolaan data, pemecahan masalah sederhana dalam kehidupan masyarakat secara sistematis, dan menuliskan instruksi.

*2.2 Literasi Digital*

> Memproduksi dan mendiseminasi konten digital berupa audio, video, slide, dan infografis.

*2.3 Literasi dan Etika Kecerdasan Artifisial*

> Memahami perbedaan cara manusia dan KA menggabungkan informasi dari beberapa perangkat penginderaan atau sensor, memahami bagaimana komputer memaknai informasi dari perangkat penginderaan atau sensor, memahami kualitas data, serta manfaat dan dampak KA pada kehidupan masyarakat. Memahami etika penggunaan KA dalam kehidupan sehari-hari seperti menjaga data pribadi dalam menggunakan KA, KA adalah sebagai alat bantu sehingga manusia tidak boleh tergantung dan percaya sepenuhnya pada KA karena KA masih sangat mungkin menghasilkan output yang salah, bias, atau melakukan halusinasi, serta menganalisis konten deep fake dalam bentuk gambar, audio, atau video.

*2.4 Pemanfaatan dan Pengembangan Kecerdasan Artifisial*

> Menggunakan perangkat KA sederhana dengan kritis dan mampu menuliskan input bermakna ke dalam sistem KA.

### 1.4 Kode butir CP (pemenggalan penyusun)

**CP Informatika Fase D**

| Kode | Butir (kata CP, dipersingkat untuk rujukan) |
| --- | --- |
| D-BK-a | berpikir komputasional untuk problem sehari-hari dan masalah komputasi |
| D-BK-b | konsep himpunan data terstruktur dalam kehidupan sehari-hari |
| D-BK-c | konsep lembar kerja pengolah data |
| D-BK-d | berpikir komputasional untuk persoalan dengan himpunan data berstruktur sederhana bervolume kecil |
| D-BK-e | menuliskan sekumpulan instruksi dengan kosakata terbatas atau simbol dalam format pseudocode |
| D-LD-a | cara kerja dan penggunaan mesin pencari |
| D-LD-b | kualitas informasi dan kredibilitas sumber informasi digital |
| D-LD-c | ekosistem media pers digital |
| D-LD-d | membedakan fakta, opini, dan hoaks |
| D-LD-e | perangkat teknologi pengolah dokumen, lembar kerja, dan presentasi |
| D-LD-f | mendeskripsikan komponen, fungsi, dan cara kerja komputer |
| D-LD-g | konektivitas jaringan lokal dan internet, kabel maupun nirkabel |
| D-LD-h | jenis ruang publik virtual |
| D-LD-i | perangkat teknologi digital untuk produksi dan diseminasi konten |
| D-LD-j | pentingnya menjaga rekam jejak digital |
| D-LD-k | mengamalkan toleransi dan empati di dunia digital |
| D-LD-l | dampak perundungan digital |
| D-LD-m | membuat kata sandi yang aman |
| D-LD-n | pengamanan perangkat dari berbagai jenis malware |
| D-LD-o | memilah informasi privat dan publik |
| D-LD-p | melindungi data pribadi dan identitas digital |
| D-LD-q | kesadaran penuh (mindfulness) dalam dunia digital |

**CP Koding dan KA Fase D**

| Kode | Butir (kata CP, dipersingkat untuk rujukan) |
| --- | --- |
| DK-BK-a | menerapkan pengelolaan data |
| DK-BK-b | pemecahan masalah sederhana dalam kehidupan masyarakat secara sistematis |
| DK-BK-c | menuliskan instruksi |
| DK-LD-a | memproduksi dan mendiseminasi konten digital: audio, video, slide, infografis |
| DK-EA-a | perbedaan cara manusia dan KA menggabungkan informasi dari beberapa penginderaan atau sensor |
| DK-EA-b | bagaimana komputer memaknai informasi dari perangkat penginderaan atau sensor |
| DK-EA-c | kualitas data |
| DK-EA-d | manfaat dan dampak KA pada kehidupan masyarakat |
| DK-EA-e | etika penggunaan KA sehari-hari: menjaga data pribadi |
| DK-EA-f | KA sebagai alat bantu: tidak bergantung dan tidak percaya sepenuhnya (output salah, bias, halusinasi) |
| DK-EA-g | menganalisis konten deep fake (gambar, audio, video) |
| DK-PA-a | menggunakan perangkat KA sederhana dengan kritis |
| DK-PA-b | menuliskan input bermakna ke dalam sistem KA |

## 2. Struktur program dan asumsi

| Butir | Nilai | Status |
| --- | --- | --- |
| Kelas dan fase | Kelas 7, 8, 9 SMP/MTs = Fase D | Terverifikasi (bagian 1.1). |
| Status mata pelajaran | Dirancang agar dapat dipakai sebagai mata pelajaran pilihan Koding dan KA, ekstrakurikuler, atau modul terintegrasi di Informatika | `[asumsi]`; KKA pilihan: pernyataan pejabat, teks regulasi `[belum terverifikasi]`. |
| Semester | Dua per kelas, enam semester (`SMP7-1` sampai `SMP9-2`) | `[asumsi]` |
| Alokasi JP | **2 JP per minggu** | Rekomendasi naskah akademik menurut situs sekunder; angka regulasi `[belum terverifikasi]`; di sini `[asumsi]`. SK 046 dan Panduan tidak menetapkan JP per minggu (Panduan: beban per elemen tidak harus sama). |
| Lama 1 JP | 40 menit (80 menit per pertemuan) | Contoh RPP Fase D kelas 7 di Panduan memakai "6 JP x 40 menit (2 pertemuan)"; itu contoh, bukan ketentuan: tetap `[asumsi]`. |
| Minggu per semester | 14 minggu materi + 2 minggu cadangan (libur, ujian sekolah, remedial) | `[asumsi]`, mengikuti sma-coding. |
| Pola tiap semester | Minggu 1-12 materi; minggu 13 proyek mini; minggu 14 asesmen dan refleksi | `[asumsi]`, mengikuti sma-coding. |
| Total | 6 semester x 14 minggu = 84 minggu x 2 JP = 168 JP materi | Hitungan dari asumsi di atas. |
| Jalur | **Satu jalur inti** (blok ke teks) untuk semua murid, ditambah **klub pengayaan opsional** (bagian 3.4) | Rekomendasi penyusun; keputusan pemilik pada pertanyaan Q4. |
| Bahasa teks | Python, mulai semester `SMP8-2`; **melampaui rumusan CP Fase D** (tidak ada elemen pemrograman di CP Informatika maupun KKA Fase D) | Rekomendasi penyusun; keputusan pemilik pada Q3. |

Prinsip rancangan: (1) berpikir komputasional dahulu, kode sesudahnya,
sejalan dengan penekanan pejabat Kemendikdasmen (`riset.md` bagian 3) dan
dengan materi esensial Panduan ("Dasar Pemrograman": kosakata terbatas, simbol
atau pemrograman visual, teks pseudocode) serta contoh proyek mini Panduan
(Scratch, Blockly, atau bahasa blok lain "jika tersedia"); (2) setiap minggu
punya pilihan kegiatan **tanpa perangkat** (*unplugged*), sesuai
karakteristik KKA ("internet-based, plugged, atau unplugged") agar sekolah
dengan sarana terbatas tetap bisa menjalankannya; (3) kelas 7 fokus blok,
kelas 8 memperluas ke data dan perangkat lalu transisi ke teks, kelas 9
memperdalam teks, data, dan proyek; (4) satu produk nyata per semester
(minggu 13); (5) etika, privasi, dan keamanan diri ada di setiap tahap, bukan
hanya satu minggu; (6) tidak ada akun murid pada layanan daring mana pun
(bagian 7).

## 3. Rencana per semester

Kolom "Keluaran" adalah hasil nyata murid (berkas, kartu, tabel, atau
demonstrasi). "Unplugged" berarti kegiatan tanpa komputer tersedia. Alat:
**Scratch** (blok), **MakeCode** (blok untuk perangkat atau simulator),
**Python** (teks), **LK** (lembar kerja), **-** (tanpa alat).

### 3.1 Kelas 7 (Fase D)

**`SMP7-1`: Berpikir komputasional dan pemrograman blok**

| Kode | Topik | Alat | Keluaran | Butir CP |
| --- | --- | --- | --- | --- |
| SMP7-1-M1 | Apa itu komputasi: instruksi sehari-hari dan ketepatan | - (unplugged) | Kartu instruksi membuat teh atau menyeberang jalan | D-BK-a |
| SMP7-1-M2 | Algoritma: urutan langkah, urutan yang salah | - (unplugged) | Permainan robot-dan-pemberi-instruksi, catatan temuan | D-BK-a, D-BK-e |
| SMP7-1-M3 | Mengenal Scratch: panggung, sprite, blok gerak | Scratch | Sprite berjalan mengikuti rute | D-BK-e, DK-BK-c |
| SMP7-1-M4 | Peristiwa dan urutan: menggambar bentuk | Scratch | Program menggambar persegi dan segitiga | D-BK-e, DK-BK-c |
| SMP7-1-M5 | Perulangan | Scratch | Bentuk yang sama ditulis ulang dengan perulangan | D-BK-e, DK-BK-c, D-BK-a |
| SMP7-1-M6 | Dekomposisi: memecah masalah, animasi cerita | Scratch | Cerita animasi 3 adegan oleh tim | D-BK-a, D-BK-e, DK-BK-c |
| SMP7-1-M7 | Pola dan generalisasi | Scratch | Program pola berulang; daftar pola yang ditemukan | D-BK-a |
| SMP7-1-M8 | Percabangan (kondisi) | Scratch | Sprite bereaksi pada kondisi (jika-maka) | D-BK-e, DK-BK-c |
| SMP7-1-M9 | Variabel | Scratch | Penghitung dan skor sederhana | D-BK-e, DK-BK-c |
| SMP7-1-M10 | Masukan pengguna: kuis | Scratch | Kuis 5 soal | D-BK-e, DK-BK-c |
| SMP7-1-M11 | Debugging: mencari dan memperbaiki kesalahan | Scratch | Tiga program bermasalah diperbaiki, catatan penyebab | D-BK-a, DK-BK-b |
| SMP7-1-M12 | Berbagi karya: atribusi, izin, dan data diri | Scratch | Kartu aturan berbagi (tanpa nama lengkap dan wajah) | D-LD-p, D-LD-j, DK-LD-a |
| SMP7-1-M13 | Proyek mini: animasi atau game satu layar | Scratch | Satu produk beserta penjelasan lisan | D-BK-e, DK-BK-c, DK-BK-b |
| SMP7-1-M14 | Asesmen dan refleksi | Scratch | Tugas praktik dan jurnal refleksi | D-BK-e, DK-BK-c, D-BK-a |

**`SMP7-2`: Data, representasi, dan game**

| Kode | Topik | Alat | Keluaran | Butir CP |
| --- | --- | --- | --- | --- |
| SMP7-2-M1 | Data dan informasi; data diskrit | - (unplugged) | Tabel data kelas (sintetis, tanpa nama) | D-BK-b, D-BK-a, DK-BK-a |
| SMP7-2-M2 | Kodifikasi: biner | - (unplugged) | Kartu biner, pesan sandi sederhana | pengayaan |
| SMP7-2-M3 | Teks dan gambar sebagai data | - atau Scratch | Gambar piksel dikodekan menjadi angka | pengayaan |
| SMP7-2-M4 | Daftar (list) | Scratch | Program menyimpan dan menampilkan daftar | D-BK-b, D-BK-e, D-BK-a |
| SMP7-2-M5 | Mencari dan mengurutkan | - (unplugged) | Strategi mengurutkan kartu, bandingkan langkah | D-BK-a |
| SMP7-2-M6 | Mengurutkan dalam program | Scratch | Program mengurutkan daftar kecil | D-BK-e, DK-BK-c |
| SMP7-2-M7 | Game: koordinat, gerak, tabrakan | Scratch | Karakter bergerak dan menghindar | D-BK-e, DK-BK-c |
| SMP7-2-M8 | Game: skor, nyawa, level | Scratch | Game dengan skor dan akhir permainan | D-BK-e, DK-BK-c |
| SMP7-2-M9 | Pesan antar sprite dan klon | Scratch | Game dengan beberapa objek berkomunikasi | D-BK-e, DK-BK-c |
| SMP7-2-M10 | Komputer sebagai sistem: masukan, proses, keluaran | - (unplugged) | Diagram komponen dan alirnya | D-LD-f |
| SMP7-2-M11 | Uji produk oleh teman | Scratch | Lembar umpan balik; perbaikan | DK-BK-b |
| SMP7-2-M12 | Menjelaskan produk: laporan dan presentasi singkat | LK/dokumen | Laporan satu halaman | DK-LD-a, D-LD-i, D-LD-e |
| SMP7-2-M13 | Proyek mini: game | Scratch | Game beserta laporan | D-BK-e, DK-BK-c, DK-BK-b |
| SMP7-2-M14 | Asesmen dan refleksi | Scratch | Tugas praktik dan jurnal | D-BK-e, DK-BK-c, pengayaan |

### 3.2 Kelas 8 (Fase D)

**`SMP8-1`: Abstraksi, lintas bidang, dan data**

| Kode | Topik | Alat | Keluaran | Butir CP |
| --- | --- | --- | --- | --- |
| SMP8-1-M1 | Dari soal ke algoritma: pseudocode dengan kosakata terbatas | - | Tiga soal cerita ditulis sebagai pseudocode | D-BK-a, D-BK-e |
| SMP8-1-M2 | Blok buatan sendiri (fungsi) | Scratch | Program memakai blok sendiri | D-BK-e, DK-BK-c |
| SMP8-1-M3 | Abstraksi | Scratch | Program lama dirapikan dengan blok sendiri | D-BK-a |
| SMP8-1-M4 | Simulasi sains sederhana | Scratch | Simulasi gerak atau siklus | D-BK-a, D-BK-e, DK-BK-c |
| SMP8-1-M5 | Matematika dengan program: bilangan, faktor, pola | Scratch | Program pola bilangan | D-BK-a |
| SMP8-1-M6 | Lembar kerja: pilah, urutkan, saring data | LK | Tabel data sintetis yang diolah | D-BK-c, D-BK-d, D-LD-e, DK-BK-a |
| SMP8-1-M7 | Grafik dan interpretasi data | LK | Grafik dengan satu kesimpulan tertulis | D-BK-d, DK-BK-a |
| SMP8-1-M8 | Prediksi dari data | LK | Prediksi sederhana beserta alasan | D-BK-d, DK-BK-a |
| SMP8-1-M9 | Translasi konsep ke bahasa blok lain | MakeCode | Program Scratch diterjemahkan ke blok perangkat | D-BK-e |
| SMP8-1-M10 | Masukan dan keluaran perangkat (simulator) | MakeCode | Program pada simulator tombol dan lampu | D-LD-f, D-BK-e |
| SMP8-1-M11 | Proyek perangkat: alarm atau penghitung langkah (simulator; papan fisik opsional) | MakeCode | Satu perangkat tersimulasi | D-BK-e, DK-BK-c, DK-BK-b |
| SMP8-1-M12 | Jaringan lokal, ponsel, dan internet | - (unplugged) | Peta jaringan rumah atau sekolah (gambar) | D-LD-g |
| SMP8-1-M13 | Proyek mini: simulasi atau perangkat lintas bidang | Scratch/MakeCode | Satu produk | D-BK-a, DK-BK-b |
| SMP8-1-M14 | Asesmen dan refleksi | - | Tugas praktik dan jurnal | D-BK-a, D-BK-d, DK-BK-a |

**`SMP8-2`: Transisi ke pemrograman teks (Python)**

| Kode | Topik | Alat | Keluaran | Butir CP |
| --- | --- | --- | --- | --- |
| SMP8-2-M1 | Dari blok ke teks: apa yang sama, apa yang beda | Scratch dan Python | Tabel pasangan blok dan baris kode | DK-BK-c*, D-BK-e |
| SMP8-2-M2 | Keluaran, masukan, variabel | Python | Program salam dan hitung sederhana | DK-BK-c* |
| SMP8-2-M3 | Ekspresi dan tipe data | Python | Kalkulator kecil | DK-BK-c*, pengayaan |
| SMP8-2-M4 | Percabangan `if` | Python | Penilai nilai sederhana | DK-BK-c* |
| SMP8-2-M5 | Perulangan `for` dan `while` | Python | Tabel perkalian | DK-BK-c* |
| SMP8-2-M6 | Menerjemahkan program Scratch ke Python | Python | Satu program Scratch dan versi Python | D-BK-e, DK-BK-c* |
| SMP8-2-M7 | Menggambar dengan perulangan (grafik kura-kura) | Python | Pola gambar | D-BK-e, DK-BK-c |
| SMP8-2-M8 | Daftar (list) | Python | Program daftar belanja | DK-BK-c* |
| SMP8-2-M9 | Fungsi | Python | Program dengan dua fungsi | DK-BK-c* |
| SMP8-2-M10 | Membaca pesan galat dan debugging | Python | Lima program bergalat diperbaiki | D-BK-a |
| SMP8-2-M11 | Kata sandi, akun, dan keamanan diri; data pribadi dan kata sandi tidak ditempel ke layanan AI | - (unplugged) | Kartu praktik aman; simulasi sandi kuat | D-LD-m, D-LD-p |
| SMP8-2-M12 | Informasi publik dan privat di media sosial | - (unplugged) | Sortir kartu: bagikan, jangan bagikan | D-LD-d, D-LD-o |
| SMP8-2-M13 | Proyek mini: kuis teks atau gambar | Python | Satu program | DK-BK-c*, DK-BK-b |
| SMP8-2-M14 | Asesmen dan refleksi | Python | Tugas praktik dan jurnal | DK-BK-c*, D-BK-a |

### 3.3 Kelas 9 (Fase D)

**`SMP9-1`: Python, data, dan strategi**

| Kode | Topik | Alat | Keluaran | Butir CP |
| --- | --- | --- | --- | --- |
| SMP9-1-M1 | Pemecahan masalah: tinjau ulang dan pola | - | Tiga soal diselesaikan dengan alasan | D-BK-a |
| SMP9-1-M2 | Teks (string) | Python | Program memproses kalimat | DK-BK-c* |
| SMP9-1-M3 | Pasangan kunci-nilai (dictionary), pengantar | Python | Program kamus kecil | DK-BK-c* |
| SMP9-1-M4 | Membaca berkas teks | Python | Program membaca data sintetis | D-BK-d, DK-BK-a |
| SMP9-1-M5 | Data tabel kecil: jumlah, rata-rata, terbesar | Python atau LK | Ringkasan data dengan dua cara | D-BK-d, DK-BK-a |
| SMP9-1-M6 | Sumber data terbuka dan legal | LK | Satu himpunan data terbuka (dipilih guru), tinjauan asal dan lisensinya | D-BK-d, D-LD-b, DK-BK-a |
| SMP9-1-M7 | Visualisasi sederhana | LK atau Python | Grafik dengan kesimpulan | D-BK-d, DK-BK-a, D-LD-e |
| SMP9-1-M8 | Lebih dari satu solusi untuk satu masalah | Python | Dua program untuk soal yang sama, dibandingkan | D-BK-a |
| SMP9-1-M9 | Mencari dan mengurutkan dengan kode | Python | Program pencarian dan pengurutan kecil | D-BK-a, DK-BK-c* |
| SMP9-1-M10 | Bilangan acak dan simulasi | Python | Simulasi lempar dadu | D-BK-a, DK-BK-c* |
| SMP9-1-M11 | Informasi, hoaks, dan keterbukaan informasi | - (unplugged) | Lembar periksa sumber untuk tiga contoh | D-LD-b, D-LD-d |
| SMP9-1-M12 | Rencana proyek akhir | LK | Dokumen rencana tim | DK-BK-b |
| SMP9-1-M13 | Proyek mini: pengolah data kecil | Python | Satu program data | D-BK-d, DK-BK-a, DK-BK-b |
| SMP9-1-M14 | Asesmen dan refleksi | Python | Tugas praktik dan jurnal | D-BK-a, D-BK-d, DK-BK-a |

**`SMP9-2`: Proyek akhir, literasi AI, dan jembatan ke SMA**

| Kode | Topik | Alat | Keluaran | Butir CP |
| --- | --- | --- | --- | --- |
| SMP9-2-M1 | Mengidentifikasi persoalan masyarakat sekitar | - | Daftar persoalan dan pilihan tim | DK-BK-b |
| SMP9-2-M2 | Merancang solusi | - | Rancangan: tujuan, masukan, proses, keluaran | DK-BK-b, D-BK-a |
| SMP9-2-M3 | Implementasi, tahap 1 | Scratch atau Python | Kerangka produk | DK-BK-b, D-BK-e, DK-BK-c |
| SMP9-2-M4 | Implementasi, tahap 2 | Scratch atau Python | Produk berjalan | DK-BK-b |
| SMP9-2-M5 | Pengujian dengan pengguna | - | Catatan uji dan daftar perbaikan | DK-BK-b |
| SMP9-2-M6 | Penyempurnaan | Scratch atau Python | Versi akhir | DK-BK-b |
| SMP9-2-M7 | Laporan dan presentasi | Dokumen | Laporan dan presentasi | DK-LD-a, D-LD-i, D-LD-e |
| SMP9-2-M8 | Pengantar kecerdasan artifisial: penginderaan dan sensor | - (unplugged) | Permainan klasifikasi dengan kartu | DK-EA-b |
| SMP9-2-M9 | Mesin belajar dari contoh dan kualitas data | - (unplugged) | "Melatih" model kartu dan mengujinya | DK-EA-c |
| SMP9-2-M10 | Etika AI: keliru, bias, halusinasi, tiruan palsu (deep fake), ketergantungan, mengalihkan pekerjaan berpikir ke AI | - (unplugged) | Debat terarah; aturan pakai AI kelas (bagian 7.1) | DK-EA-e, DK-EA-f, DK-EA-g |
| SMP9-2-M11 | Jembatan ke SMA: membaca kode bahasa lain | Python dan teks | Terjemahan satu program Python ke pseudocode dan C++ (hanya dibaca) | D-BK-e, DK-BK-c* |
| SMP9-2-M12 | Pameran produk | - | Pameran kelas | DK-LD-a, D-LD-i |
| SMP9-2-M13 | Portofolio dan refleksi | - | Portofolio berkas murid sendiri | DK-LD-a, D-LD-i |
| SMP9-2-M14 | Asesmen akhir | Python atau Scratch | Tugas praktik dan jurnal | DK-BK-c*, DK-BK-b |

### 3.4 Klub pengayaan opsional (OSN dan pemecahan masalah) `[asumsi]`

Bukan bagian dari 168 JP inti. Satu pertemuan per dua minggu di luar jam
pelajaran, untuk murid yang berminat; tidak dihitung sebagai pemenuhan butir
CP.

| Tahap | Isi | Alat | Catatan |
| --- | --- | --- | --- |
| Kelas 7 | Teka-teki logika, soal pemikiran komputasional bergaya "bebras" (tanpa kode) | - | Gaya soal; kompetisi tertentu `[belum terverifikasi]` |
| Kelas 8 | Soal pemecahan masalah dengan Python: simulasi, hitung, urutan | Python | Latihan sintetis |
| Kelas 9 | Pengantar pemecahan masalah gaya olimpiade: masukan dan keluaran, kasus uji; membaca soal OSN (R1) hanya untuk dibaca | Python; C++ hanya dibaca | Menyambung ke `sma-coding` jalur A dan korpus `osn` |


## 4. Pemetaan CP Fase D

Dua rumusan CP resmi dipetakan (bagian 1.4). Tabel disusun dari kolom "Butir
CP" rencana di bagian 3, sehingga keduanya selalu sama. Baris bertanda `*`
(pemrograman teks Python) **melampaui rumusan CP** dan tidak dihitung
pemenuhan; kode `pengayaan` berarti tidak ada butir CP resmi yang cocok
(kodifikasi biner dan pemrograman teks).

| Butir CP | Minggu | Cakupan |
| --- | --- | --- |
| D-BK-a | SMP7-1-M1, SMP7-1-M2, SMP7-1-M5, SMP7-1-M6, SMP7-1-M7, dan 19 minggu lain (kolom Butir CP di bagian 3) | Penuh |
| D-BK-b | SMP7-2-M1, SMP7-2-M4 | Sebagian: daftar (list) dan tabel; antrian, tumpukan, pohon, dan graf tidak |
| D-BK-c | SMP8-1-M6 | Sebagian: pilah, urut, saring; pengalamatan sel absolut dan relatif, ringkasan tidak |
| D-BK-d | SMP8-1-M6, SMP8-1-M7, SMP8-1-M8, SMP8-1-M14, SMP9-1-M4, SMP9-1-M5, SMP9-1-M6, SMP9-1-M7, SMP9-1-M13, SMP9-1-M14 | Penuh |
| D-BK-e | SMP7-1-M2, SMP7-1-M3, SMP7-1-M4, SMP7-1-M5, SMP7-1-M6, dan 23 minggu lain (kolom Butir CP di bagian 3) | Penuh (blok visual dan pseudocode) |
| D-LD-a | - | **Tidak dicakup** (di luar silabus coding; dicakup Informatika umum atau modul pendamping) |
| D-LD-b | SMP9-1-M6, SMP9-1-M11 | Sebagian |
| D-LD-c | - | **Tidak dicakup** (di luar silabus coding; dicakup Informatika umum atau modul pendamping) |
| D-LD-d | SMP8-2-M12, SMP9-1-M11 | Sebagian |
| D-LD-e | SMP7-2-M12, SMP8-1-M6, SMP9-1-M7, SMP9-2-M7 | Sebagian |
| D-LD-f | SMP7-2-M10, SMP8-1-M10 | Sebagian |
| D-LD-g | SMP8-1-M12 | Sebagian |
| D-LD-h | - | **Tidak dicakup** (di luar silabus coding; dicakup Informatika umum atau modul pendamping) |
| D-LD-i | SMP7-2-M12, SMP9-2-M7, SMP9-2-M12, SMP9-2-M13 | Sebagian |
| D-LD-j | SMP7-1-M12 | Sebagian |
| D-LD-k | - | **Tidak dicakup** (di luar silabus coding; dicakup Informatika umum atau modul pendamping) |
| D-LD-l | - | **Tidak dicakup** (di luar silabus coding; dicakup Informatika umum atau modul pendamping) |
| D-LD-m | SMP8-2-M11 | Sebagian |
| D-LD-n | - | **Tidak dicakup** (di luar silabus coding; dicakup Informatika umum atau modul pendamping) |
| D-LD-o | SMP8-2-M12 | Sebagian |
| D-LD-p | SMP7-1-M12, SMP8-2-M11 | Sebagian |
| D-LD-q | - | **Tidak dicakup** (di luar silabus coding; dicakup Informatika umum atau modul pendamping) |
| DK-BK-a | SMP7-2-M1, SMP8-1-M6, SMP8-1-M7, SMP8-1-M8, SMP8-1-M14, SMP9-1-M4, SMP9-1-M5, SMP9-1-M6, SMP9-1-M7, SMP9-1-M13, SMP9-1-M14 | Penuh |
| DK-BK-b | SMP7-1-M11, SMP7-1-M13, SMP7-2-M11, SMP7-2-M13, SMP8-1-M11, dan 11 minggu lain (kolom Butir CP di bagian 3) | Penuh |
| DK-BK-c | SMP7-1-M3, SMP7-1-M4, SMP7-1-M5, SMP7-1-M6, SMP7-1-M8, dan 31 minggu lain (kolom Butir CP di bagian 3) | Penuh untuk instruksi blok dan pseudocode; baris bertanda `*` (Python) melampaui rumusan CP |
| DK-LD-a | SMP7-1-M12, SMP7-2-M12, SMP9-2-M7, SMP9-2-M12, SMP9-2-M13 | Sebagian: slide, infografis, dan laporan; audio dan video tidak |
| DK-EA-a | - | **Tidak dicakup** (di luar silabus coding; dicakup Informatika umum atau modul pendamping) |
| DK-EA-b | SMP9-2-M8 | Sebagian: unplugged saja |
| DK-EA-c | SMP9-2-M9 | Sebagian: unplugged saja |
| DK-EA-d | - | **Tidak dicakup** (di luar silabus coding; dicakup Informatika umum atau modul pendamping) |
| DK-EA-e | SMP9-2-M10 | Sebagian |
| DK-EA-f | SMP9-2-M10 | Sebagian |
| DK-EA-g | SMP9-2-M10 | Sebagian: contoh tiruan palsu dibahas tanpa membuat tiruan |
| DK-PA-a | - | Tidak dicakup: tanpa perangkat KA di tangan murid (bagian 7) |
| DK-PA-b | - | Tidak dicakup: tanpa perangkat KA di tangan murid (bagian 7) |

**Butir di luar silabus coding ini:** sebagian besar butir Literasi Digital
(`D-LD-a`, `c`, `h`, `k`, `l`, `n`, `q`) dan `DK-PA-a`, `DK-PA-b` tidak
dicakup minggu mana pun; wajib dicakup pembelajaran Informatika sekolah di
luar silabus coding ini (mengikuti sma-coding bagian 4.3), idealnya lewat
modul pendamping seperti pada sma-coding. Keputusan pemilik: modul
pendamping SMP (Q10, bagian 10), pekerjaan lanjutan yang belum dikerjakan.
`DK-EA-a` dan `DK-EA-d` juga belum punya minggu khusus; kandidatnya
perluasan `SMP9-2-M8` sampai `M10`.

**Pengayaan di luar rumusan CP:** (a) seluruh pemrograman teks Python
(`SMP8-2` sampai `SMP9-2`), karena kedua CP Fase D tidak memuat elemen
Algoritma dan Pemrograman; (b) kodifikasi biner (`SMP7-2-M2`, `M3`), yang
tidak ada di CP Informatika Fase D 2025 (versi lama CP memuatnya); (c) klub
pengayaan (bagian 3.4). Ini sebabnya keputusan Q3 penting: tanpa Python,
silabus tetap memenuhi CP, dan 6 semester dapat diisi dengan blok,
pseudocode, data, KA, dan literasi digital.

## 5. Jembatan

### 5.1 Dari SD (`sd-coding`)

Program `sd-coding` (silabus disetujui pemilik pada 2026-11-19) disusun
**paralel** oleh pelaksana lain dan isinya tidak dibaca penyusun dokumen ini. Asumsi `[asumsi]`: murid
kelas 6 yang masuk SMP mengenal blok, urutan, perulangan, dan percabangan
dasar. Karena itu `SMP7-1-M1` sampai `M5` dirancang sebagai tinjauan yang
dapat dipadatkan; murid tanpa latar SD tetap dapat mengikutinya. Penyelarasan
kode (`SD6-2-...` ke `SMP7-1-...`) dilakukan setelah kedua silabus disetujui.

### 5.2 Ke SMA (`sma-coding` v1.2)

| Dari SMP | Ke sma-coding | Catatan |
| --- | --- | --- |
| Blok kelas 7 dan pemecahan masalah | Blok fondasi kelas X (`FND-X1-M1..M7`), yang membuka tanpa mensyaratkan bahasa pemrograman | Murid SMP tanpa mapel KKA tetap diterima di fondasi. |
| Python kelas 8-9 (pengayaan di luar CP Fase D) | Jalur D (AI dan analisis data) memakai Orange lalu Python | Python menjadi bahasa pertama bagi murid yang masuk D; murid tanpa pengayaan Python tetap dapat masuk. |
| Logika, percabangan, perulangan, fungsi, daftar | Jalur A (C++) dan jalur B (JS/TS) | Konsep yang sama; sintaks baru. Jalur A butuh tipe statis dan kompilasi yang tidak diajarkan di SMP. |
| Simulator MakeCode kelas 8 | Jalur C (IoT dan robotika, C++ gaya Arduino, ESP32) | Konsep masukan dan keluaran perangkat sudah dikenal. |
| Literasi dan etika KA kelas 9 (`DK-EA-b`, `c`, `e`, `f`, `g`) | Jalur D | Fondasi sebelum alat AI. |
| `SMP9-2-M11` (membaca kode lain) | Jalur A, B | Pengantar, bukan prasyarat. |

### 5.3 Ke OSN

OSN Informatika hanya untuk SMA/sederajat (`osn.toki.id`, `riset.md` bagian
4); tidak ada OSN SMP Informatika yang dapat dipastikan. Jembatannya adalah
klub pengayaan (bagian 3.4) dan jalur A program `sma-coding`, lalu program
`osn` (korpus di `data/osn/`). Silabus ini tidak membuat target kompetisi
SMP.

## 6. Asesmen `[asumsi]`

- Formatif di setiap minggu (pengamatan, kartu keluar, lembar umpan balik);
  sumatif pada minggu 14 berupa tugas praktik pendek ditambah jurnal
  refleksi; proyek mini minggu 13 dinilai dengan rubrik empat tingkat.
- Rubrik meniru dimensi PLB: mengidentifikasi persoalan, merancang,
  mengimplementasi, menguji, menyempurnakan, mengkomunikasikan.
- Asesmen tidak berbasis perangkat tertentu; semua tugas punya padanan
  tertulis atau lisan.
- Asesmen ditulis dan disimpan guru; **catatan nilai murid tidak ada di
  repositori ini** (ADR-0004).

## 7. Privasi, etika AI, dan keselamatan murid

- **ADR-0004:** repositori ini tidak berisi data pribadi murid: tidak ada nama,
  sekolah nyata, foto, atau identitas. Semua contoh data di modul harus
  sintetis dan jelas palsu (mis. "Murid-01"). Data terbuka pada
  `SMP9-1-M6` adalah himpunan data publik non-personal.
- **Tanpa akun murid**: kegiatan dirancang berjalan tanpa murid membuat akun
  pada layanan daring; proyek disimpan sebagai berkas lokal atau di akun guru.
  Layanan yang meminta akun murid tidak disarankan sampai syarat usia dan
  persetujuan orang tuanya diverifikasi (`riset.md` bagian 5).
- **Usia:** murid SMP berusia sekitar 12-15 tahun; semua kegiatan berbagi
  karya (`SMP7-1-M12`) memakai aturan: tanpa nama lengkap, tanpa wajah, tanpa
  lokasi. SKB tujuh menteri tentang teknologi digital dan AI (disebut di
  berita, 12 Maret 2026) mengatur kesiapan usia dan durasi pemakaian; teksnya
  belum dibuka `[belum terverifikasi]`.
- **Etika AI**: ketentuan lengkap ada di bagian 7.1. Ringkasnya, alat AI
  generatif **tidak dipakai langsung oleh murid**; pembahasan keluaran yang
  salah, bias, halusinasi, tiruan palsu (*deep fake*), dan ketergantungan
  dilakukan tanpa perangkat, selaras dengan CP KKA Fase D (bagian 1.3). Butir
  `DK-PA-a` dan `DK-PA-b` (menggunakan perangkat KA) tetap tidak dicakup
  dan hanya didemonstrasikan guru (Q11).
- **Kode yang dijalankan**: contoh kode yang kelak masuk modul hanya dijalankan
  di peramban atau mesin sekolah dan tidak mengirim data keluar.

### 7.1 Kebijakan penggunaan AI (v1.1, keputusan pemilik 2026-11-19, issue #139)

Kebijakan ini disusun **khusus untuk program `smp-coding`** (bukan kerangka
lintas program) dan melengkapi ketentuan privasi di atas. Landasan bukti ada di
`docs/riset/ai-rekayasa-perangkat-lunak.md`; bukti tentang pelajar SMP
`[inferensi]` karena tidak ada bukti dari Indonesia.

1. **Demonstrasi guru, tanpa akun murid.** Layanan AI generatif hanya
   didemonstrasikan guru di layar kelas, dengan akun guru atau sekolah dan
   masukan yang disiapkan guru. Murid tidak membuat akun dan tidak memakai
   layanan AI generatif langsung untuk mengerjakan tugas. Ini berbeda dari
   program `sma-coding`, tempat murid boleh memakai AI dengan etika.
2. **Alasan usia dan ketentuan layanan.** Murid SMP berusia sekitar 12-15
   tahun; ketentuan banyak layanan AI daring mensyaratkan usia minimum atau
   persetujuan orang tua `[belum terverifikasi]` per layanan, dan teks SKB
   tujuh menteri tentang teknologi digital dan AI belum dibuka (bagian 7).
   Karena itu pemakaian langsung oleh murid ditunda sampai syarat itu
   diverifikasi (Q11).
3. **Etika.** Selaras dengan CP KKA Fase D, KA adalah alat bantu: manusia
   tidak boleh tergantung dan percaya sepenuhnya pada KA (bagian 1.3).
   Dibahas tanpa perangkat di `SMP9-2-M10`: keluaran bisa keliru, bias, atau
   mengarang (halusinasi); tiruan palsu (*deep fake*); dan **mengalihkan
   pekerjaan berpikir ke AI** (*offloading*) versus belajar, dengan contoh dari
   bukti penelitian (mis. pelajar yang memakai AI tanpa pagar belajar kurang
   dari yang berlatih sendiri `[B]`) yang disajikan guru sebagai bukti awal,
   bukan fakta pasti. Hasil pembahasan menjadi aturan pakai AI kelas yang
   ditulis bersama.
4. **Privasi.** Data pribadi (nama lengkap, sekolah, alamat, foto, nomor
   telepon) dan kata sandi tidak pernah ditempel ke layanan AI, juga pada
   demonstrasi guru; dibahas di `SMP8-2-M11`. Data murid tetap tidak masuk
   repositori (ADR-0004).
5. **Asesmen tanpa AI.** Tugas praktik, kuis, dan asesmen akhir (bagian 6)
   dikerjakan murid sendiri tanpa layanan AI; karya sendiri dikerjakan sendiri.
6. **Energi dan biaya komputasi (butir singkat).** Pada `SMP9-2-M10` guru
   menyebut sekilas bahwa menjalankan model AI memakai listrik dan biaya
   komputasi; besarnya bergantung pada model dan layanan serta **tidak pasti**,
   sehingga tidak ada angka yang diajarkan sebagai fakta.

Kebijakan ini ditinjau ulang bersama dokumen riset (tiap 6 bulan) dan bila
syarat usia layanan diverifikasi.

## 8. Kebutuhan sarana `[asumsi]`

| Kelas | Minimal | Opsional |
| --- | --- | --- |
| 7 | Papan tulis, kartu, lembar kerja cetak; satu komputer per dua murid untuk Scratch | Proyektor |
| 8 | Komputer dengan peramban modern (Scratch, MakeCode, Python di peramban); lembar kerja | Papan micro:bit (satu per kelompok); harga dan ketersediaan `[belum terverifikasi]` |
| 9 | Komputer dengan peramban; berkas lokal | Editor Python luring (belum dikaji) |

Rencana cadangan tanpa komputer: setiap minggu `Unplugged` punya padanan
kartu atau kertas; minggu lain dapat didemonstrasikan guru di satu komputer.
Konektivitas internet tidak wajib bila editor luring tersedia (ketersediaan
`[belum terverifikasi]`).

## 9. Opsi alat, trade-off, dan rekomendasi

Penilaian 11 kriteria dirangkum dalam kolom "Catatan"; detail lisensi di
`riset.md` bagian 5.

### 9.1 Bahasa teks pertama (setelah blok)

| Opsi | Kelebihan | Kekurangan | Catatan |
| --- | --- | --- | --- |
| **Python (Disarankan, sebagai pengayaan di luar CP)** | Sintaks ringkas; hampir sama dengan blok; berjalan di peramban (Pyodide) tanpa instalasi; gratis (PSF, nirlaba); langsung dipakai jalur D `sma-coding` | Tidak persis sama dengan C++ (jalur A) atau JS (jalur B); tipe dinamis | Kompatibilitas dan aksesibilitas baik; biaya nol |
| Tanpa pemrograman teks (blok dan pseudocode saja) | Memenuhi CP Fase D persis; beban guru dan sarana lebih ringan; semester 8-2 sampai 9-1 dapat diisi data, KA, dan literasi digital | Tidak ada jembatan ke pemrograman teks SMA; murid berminat tidak punya jalan | Pilihan sah bila pemilik membatasi silabus pada CP |
| JavaScript | Berjalan di setiap peramban; menyambung ke jalur B | Sintaks dan keanehan tipe lebih membingungkan untuk pemula; tampilan lebih berat untuk mula | Jembatan ke B kuat, ke A lemah |
| C++ | Jembatan langsung ke OSN dan jalur A | Terlalu berat untuk kelas 8 (tipe statis, kompilasi, galat); butuh instalasi atau layanan khusus | Dibaca saja di `SMP9-2-M11` |

### 9.2 Alat blok

| Opsi | Kelebihan | Kekurangan | Catatan |
| --- | --- | --- | --- |
| **Scratch (Disarankan untuk kelas 7)** | Gratis; banyak dipakai; cocok untuk animasi dan game (D-BK-e, DK-BK-c) | Syarat akun belum terverifikasi; repositori `scratch-gui` diarsipkan 10 Juni 2026 sehingga ketersediaan editor luring dan pembaruan perlu dicek | Pakai tanpa akun murid; simpan berkas lokal |
| MakeCode (blok) | Simulator tanpa papan; kontinu ke Python micro:bit | Terikat ekosistem micro:bit | Dipakai kelas 8 |

### 9.3 Perangkat fisik

| Opsi | Kelebihan | Kekurangan | Catatan |
| --- | --- | --- | --- |
| **Simulator dahulu, papan fisik opsional (Disarankan)** | Tanpa biaya; semua murid dapat; tanpa risiko kehilangan | Kurang nyata | Papan fisik di kelas yang sanggup |
| Papan fisik wajib | Pengalaman nyata | Biaya; tidak adil bagi sekolah terbatas | Harga `[belum terverifikasi]` |

### 9.4 Rekomendasi gabungan

Scratch (kelas 7) lalu MakeCode (simulator, kelas 8) lalu Python (mulai
kelas 8 semester 2, ditandai pengayaan di luar CP), tanpa akun murid, satu jalur inti dengan klub pengayaan
opsional, 2 JP per minggu, dengan kegiatan *unplugged* di setiap tahap.

## 10. Keputusan pemilik (2026-11-19)

Pemilik menyetujui draf v0.2 beserta **opsi yang direkomendasikan** untuk
setiap pertanyaan (dialog pilihan, 2026-11-19; dicatat di issue #129).
Rumusan pertanyaan dan opsi lengkap ada di riwayat git (draf v0.2); tabel di
bawah memuat keputusan yang berlaku.

| # | Pertanyaan | Keputusan |
| --- | --- | --- |
| Q1 | Dasar CP Fase D | Teks resmi Panduan 2025 dan SK 046 yang dikutip di bagian 1. URL asal salinan SK 046 tetap **belum terverifikasi** (bagian 1.1, 11); tidak ada URL yang dicatat pemilik. |
| Q2 | Status program di sekolah | Netral: ditulis untuk semua bentuk, sekolah memilih. |
| Q3 | Pemrograman teks di SMP | Python sebagai pengayaan yang ditandai, di luar rumusan CP (bagian 4); bagian wajib CP tidak bergantung padanya. |
| Q4 | Jalur | Satu jalur inti ditambah klub pengayaan OSN opsional (bagian 3.4). |
| Q5 | Alat blok | Scratch (kelas 7) dan MakeCode (kelas 8); syarat akun dan editor luring perlu dicek sebelum modul ditulis. |
| Q6 | Perangkat fisik | Simulator, papan fisik opsional. |
| Q7 | Alokasi dan menit JP | Sesuai sekolah; rencana ditulis untuk 2 JP per minggu. |
| Q8 | Keselarasan dengan `sd-coding` | Disamakan setelah kedua silabus disetujui; belum dilakukan di v1.0. |
| Q9 | Materi KA di kelas 9 | CP KKA Fase D menjadi dasar materi KA kelas 9: tiga minggu unplugged (`SMP9-2-M8` sampai `M10`) tetap rencana v1.0. Perluasan untuk `DK-EA-a` dan `DK-EA-d` (kegiatan di minggu yang ada atau minggu cadangan) adalah pekerjaan lanjutan; rencana mingguan v1.0 tidak diubah dan kedua butir tetap tercatat belum dicakup. |
| Q10 | Butir Literasi Digital di luar coding (`D-LD-a`, `c`, `h`, `k`, `l`, `n`, `q`) | Ditutup lewat modul pendamping, seperti sma-coding. Modul itu **pekerjaan lanjutan dan belum dibuat**; sampai ada, butir-butir itu tercatat belum dicakup di `data/smp-coding/uncovered.json`. |
| Q11 | Butir `DK-PA-a` dan `DK-PA-b` | Tidak dicakup; hanya didemonstrasikan guru sampai kebijakan privasi alat KA dikaji. Ditegaskan 2026-11-19 (issue #139): pemakaian AI generatif oleh murid SMP tetap demonstrasi guru, tanpa akun murid (bagian 7.1). |

## 11. Sumber dan batasan

- Sumber dan status ada di [`riset.md`](riset.md); tidak diulang di sini.
- Batasan utama: URL asal salinan SK 046 belum terverifikasi; teks Permen 13
  Tahun 2025 tidak dibuka; JP per minggu, menit per JP, syarat akun, harga
  perangkat, dan ketentuan "pilihan" KKA `[belum terverifikasi]` dari teks
  regulasi; pemrograman teks, kodifikasi biner, dan klub pengayaan melampaui
  rumusan CP.
- Dokumen ini bukan materi resmi Puspresnas, IA TOKI, atau Kemendikdasmen.

## Changelog

| Versi | Tanggal | Perubahan |
| --- | --- | --- |
| v1.1.1 | 2026-11-19 | Revisi patch: kalimat status, keputusan pemilik #165; isi kurikulum tidak berubah. |
| v1.1.0 | 2026-11-19 | Disetujui pemilik lewat keputusan di issue #139 (usulan U-06 dengan opsi rekomendasi): bagian 7.1 "Kebijakan penggunaan AI" ditambah (demonstrasi guru tanpa akun murid, alasan usia dan ketentuan layanan, etika, privasi, asesmen tanpa AI, energi dan biaya komputasi sebagai butir singkat berketidakpastian); `SMP9-2-M10` ditambah butir mengalihkan pekerjaan berpikir ke AI; `SMP8-2-M11` ditambah butir data pribadi dan kata sandi tidak ditempel ke layanan AI; bullet etika AI bagian 7 dan Q11 diselaraskan. Kode butir CP, struktur, 84 minggu, pemetaan, dan jembatan tidak berubah. |
| v1.0.0 | 2026-11-19 | Disetujui pemilik beserta semua rekomendasi penyusun; bagian 10 menjadi catatan keputusan (opsi rekomendasi untuk Q1-Q11); status, banner, dan catatan modul pendamping diperbarui; rencana mingguan, pemetaan CP, dan jembatan tidak diubah dari v0.2 kecuali satu koreksi hitungan: pada bagian 4 baris `DK-BK-c`, "dan 32 minggu lain" menjadi "dan 31 minggu lain" (rencana bagian 3 memuat `DK-BK-c` di 36 minggu, 5 disebut dan 31 lainnya; selisih satu ditemukan audit corpus saat di-encode); pemilik perlu mengetahui koreksi ini (issue #129). |
| v0.2.0 | 2026-11-19 | Kutipan dan kode butir CP diganti dengan teks resmi: CP Informatika Fase D dari Panduan 2025 (elemen BK dan LD) dan CP Koding dan KA Fase D dari SK 046/H/KR/2025; pemetaan CP disusun ulang; pemrograman teks, kodifikasi biner, dan klub ditandai pengayaan di luar CP; pertanyaan Q1, Q3, Q7, Q9 diperbarui, Q10 dan Q11 ditambah (issue #129). |
| v0.1.0 | 2026-11-19 | Draf awal (issue #129), memakai CP dari dokumen ATP buatan guru. |
