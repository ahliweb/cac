# Draf Silabus Pembelajaran Coding SMP — v0.1

- **Version:** v0.1.0
- **Last updated:** 2026-11-19
- **Status:** DRAF (ADR-0007) — belum disetujui pemilik program. Tidak ada `data/smp-coding/`, tidak ada entri `data/programs.json`, dan tidak ada modul di `content/` sampai pemilik menyetujui silabus ini (ADR-0006).
- **Changeset:** Draf awal silabus coding SMP kelas 7-9 (satu jalur inti blok ke teks, enam semester, 84 minggu), issue #129.

> **DRAF, bukan keputusan.** Dokumen ini konten **karangan** (*authored*)
> menurut [ADR-0007](../../architecture/adr/0007-authored-learning-content.md)
> dan bukan dokumen pemerintah. Agent tidak pernah mengubah status ini
> menjadi disetujui; hanya pemilik yang dapat menyetujui, dan persetujuan
> dicatat dengan tanggal. Dasar riset dan semua status verifikasi ada di
> [`riset.md`](riset.md).

## 0. Cara membaca dokumen ini

- `[belum terverifikasi]` = tidak dapat dipastikan dari sumber yang benar-benar
  dibuka penyusun; tidak boleh diperlakukan sebagai fakta.
- `[asumsi]` = keputusan perancangan penyusun, bukan data resmi.
- Kode minggu berbentuk `SMP<kelas>-<semester>-M<n>`: `SMP7-1-M3` = kelas 7,
  semester 1, minggu 3. Enam semester: `SMP7-1`, `SMP7-2`, `SMP8-1`, `SMP8-2`,
  `SMP9-1`, `SMP9-2`. Nomor `M<n>` adalah nomor minggu kalender semester.
- Kode butir CP berbentuk `D-<ELEMEN>-<huruf>`, analog dengan kode `E-BK-a`
  pada silabus sma-coding: `D` = Fase D (SMP/MTs), `<ELEMEN>` = singkatan
  elemen (BK, TIK, SK, JKI, AD, AP, DSI, PLB), dan huruf (a, b, c, ...) =
  pemenggalan **oleh penyusun** atas rumusan CP pada koma atau "dan" antar
  kegiatan; kata-kata CP tidak diubah. Contoh: `D-AP-d` = "mengenal
  pemrograman tekstual sederhana".
- **Peringatan penting:** kerangka delapan elemen di atas diambil dari satu
  dokumen yang benar-benar dibuka (dokumen ATP buatan guru, bukan resmi) dan
  **bukan** dari Panduan Informatika 2025 yang tidak berhasil dibuka
  (`riset.md` bagian 1 dan 2). Seluruh kode butir dan pemetaan CP di sini
  `[belum terverifikasi]`; kode dapat berubah begitu teks resmi Fase D 2025
  diperoleh. Awalan `D-` dipakai kode butir CP (selalu `D-` diikuti elemen
  huruf besar); kode minggu selalu berawalan `SMP`, jadi tidak bertabrakan
  dengan kode jalur program lain.

## 1. Sumber dan kutipan CP

**Tanggal dicek: 2026-11-19.**

### 1.1 Status sumber

| Butir | Nilai | Status |
| --- | --- | --- |
| Panduan Mata Pelajaran Informatika 2025 (memuat CP Fase D-F) | `repositori.kemendikdasmen.go.id`, sama dengan sumber silabus sma-coding | **Tidak berhasil dibuka** (timeout dan penolakan koneksi). Teks CP Fase D 2025 belum pernah dilihat. |
| Pemetaan fase ke kelas | Fase D = kelas VII-IX SMP/MTs/Paket B | Sumber sekunder (artikel BSKAP 2025); dokumen ATP yang dibuka mencantumkan "Fase D (SMP/MTS/ PAKET B)" dengan tabel kelas 7, 8, 9. |
| Teks CP yang dikutip | Dokumen ATP Fase D buatan guru di domain `belajar.id` | Dibuka dan dikutip persis di bawah; **bukan** teks resmi; kesamaan dengan SK yang berlaku `[belum terverifikasi]`. |
| Regulasi mata pelajaran pilihan Koding dan KA | Pernyataan Mendikdasmen (InfoPublik, 13 Maret 2026) bahwa Koding dan KA pilihan di SMP | Pernyataan pejabat di berita; teks regulasi `[belum terverifikasi]` (`riset.md` bagian 3). |

### 1.2 Kutipan CP (apa adanya dari dokumen ATP Fase D, bagian tabel elemen)

Hanya spasi, pemenggalan baris, dan spasi setelah tanda hubung akibat
pemenggalan baris PDF yang dinormalkan.

*BK, Berpikir Komputasional*

> Pada akhir fase D, peserta didik mampu menerapkan berpikir komputasional untuk menghasilkan beberapa solusi dalam menyelesaikan persoalan dengan data diskrit bervolume kecil dan mendisposisikan berpikir komputasional dalam bidang lain terutama dalam literasi, numerasi, dan literasi sains (computationally literate).

*TIK, Teknologi Informasi dan Komunikasi*

> Pada akhir fase D, peserta didik mampu menerapkan praktik baik dalam memanfaatkan aplikasi surel untuk berkomunikasi, aplikasi peramban untuk pencarian informasi di internet, content management system (CMS) untuk pengelolaan konten digital, dan memanfaatkan perkakas TIK untuk mendukung pembuatan laporan, presentasi serta analisis dan interpretasi data.

*SK, Sistem Komputer*

> Pada akhir fase D, peserta didik mampu mendeskripsikan komponen, fungsi, dan cara kerja komputer yang membentuk sebuah sistem komputasi, serta menjelaskan proses dan penggunaan kodifikasi untuk penyimpanan data dalam memori komputer.

*JKI, Jaringan Komputer dan Internet*

> Pada akhir fase D, peserta didik mampu memahami konektivitas jaringan lokal, komunikasi data via ponsel, konektivitas internet melalui jaringan kabel dan nirkabel (bluetooth, wifi, internet).

*AD, Analisis Data*

> Pada akhir fase D, peserta didik mampu mengakses, mengolah, mengelola, dan menganalisis data secara efisien, terstruktur, dan sistematis untuk menginterpretasi dan memprediksi sekumpulan data dari situasi konkret sehari-hari yang berasal dari suatu sumber data dengan menggunakan perkakas TIK atau manual.

*AP, Algoritma dan Pemrograman*

> Pada akhir fase D, peserta didik mampu memahami objek-objek dan instruksi dalam sebuah lingkungan pemrograman blok (visual) untuk mengembangkan program visual sederhana berdasarkan contoh-contoh yang diberikan, mengembangkan karya digital kreatif (game, animasi, atau presentasi), menerapkan aturan translasi konsep dari satu bahasa visual ke bahasa visual lainnya, dan mengenal pemrograman tekstual sederhana.

*DSI, Dampak Sosial Informatika*

> Pada akhir fase D, peserta didik mampu memahami ketersediaan data dan informasi lewat aplikasi media sosial, memahami keterbukaan informasi, memilih informasi yang bersifat publik atau privat, menerapkan etika dan menjaga keamanan dirinya dalam masyarakat digital.

*PLB, Praktik Lintas Bidang*

> Pada akhir fase D, peserta didik mampu bergotong royong untuk mengidentifikasi persoalan, merancang, mengimplementasi, menguji, dan menyempurnakan artefak komputasional sebagai solusi persoalan masyarakat serta mengkomunikasikan secara lisan maupun tertulis produk dan proses pengembangan solusinya dalam bentuk karya kreatif yang menyenangkan secara lisan maupun tertulis.

### 1.3 Kode butir CP (pemenggalan penyusun) `[belum terverifikasi]`

| Kode | Butir (kata CP, dipersingkat untuk rujukan) |
| --- | --- |
| D-BK-a | berpikir komputasional untuk beberapa solusi, data diskrit bervolume kecil |
| D-BK-b | mendisposisikan berpikir komputasional dalam bidang lain (literasi, numerasi, literasi sains) |
| D-TIK-a | aplikasi surel untuk berkomunikasi |
| D-TIK-b | aplikasi peramban untuk pencarian informasi |
| D-TIK-c | content management system (CMS) untuk konten digital |
| D-TIK-d | perkakas TIK untuk laporan, presentasi, analisis dan interpretasi data |
| D-SK-a | komponen, fungsi, cara kerja komputer sebagai sistem komputasi |
| D-SK-b | kodifikasi untuk penyimpanan data dalam memori |
| D-JKI-a | konektivitas jaringan lokal, komunikasi data via ponsel, konektivitas internet |
| D-AD-a | mengakses, mengolah, mengelola, menganalisis data; menginterpretasi dan memprediksi |
| D-AP-a | objek dan instruksi dalam pemrograman blok; program visual sederhana dari contoh |
| D-AP-b | karya digital kreatif (game, animasi, presentasi) |
| D-AP-c | translasi konsep dari satu bahasa visual ke bahasa visual lain |
| D-AP-d | mengenal pemrograman tekstual sederhana |
| D-DSI-a | ketersediaan data dan informasi lewat media sosial; keterbukaan informasi |
| D-DSI-b | memilih informasi publik atau privat |
| D-DSI-c | menerapkan etika dan menjaga keamanan diri dalam masyarakat digital |
| D-PLB-a | gotong royong: mengidentifikasi, merancang, mengimplementasi, menguji, menyempurnakan artefak komputasional |
| D-PLB-b | mengkomunikasikan produk dan proses secara lisan maupun tertulis |

## 2. Struktur program dan asumsi

| Butir | Nilai | Status |
| --- | --- | --- |
| Kelas dan fase | Kelas 7, 8, 9 SMP/MTs = Fase D | Sumber sekunder dan dokumen ATP (bagian 1.1). |
| Status mata pelajaran | Dirancang agar dapat dipakai sebagai mata pelajaran pilihan Koding dan KA, ekstrakurikuler, atau modul terintegrasi di Informatika | `[asumsi]`; KKA pilihan: pernyataan pejabat, regulasi `[belum terverifikasi]`. |
| Semester | Dua per kelas, enam semester (`SMP7-1` sampai `SMP9-2`) | `[asumsi]` |
| Alokasi JP | **2 JP per minggu** | Rekomendasi naskah akademik menurut situs sekunder; angka regulasi `[belum terverifikasi]`; di sini `[asumsi]`. |
| Lama 1 JP | 40 menit (80 menit per pertemuan) | `[asumsi]` dan `[belum terverifikasi]` (tidak ada dokumen terbuka yang menyebut menit per JP SMP). |
| Minggu per semester | 14 minggu materi + 2 minggu cadangan (libur, ujian sekolah, remedial) | `[asumsi]`, mengikuti sma-coding. |
| Pola tiap semester | Minggu 1-12 materi; minggu 13 proyek mini; minggu 14 asesmen dan refleksi | `[asumsi]`, mengikuti sma-coding. |
| Total | 6 semester x 14 minggu = 84 minggu x 2 JP = 168 JP materi | Hitungan dari asumsi di atas. |
| Jalur | **Satu jalur inti** (blok ke teks) untuk semua murid, ditambah **klub pengayaan opsional** (bagian 3.4) | Rekomendasi penyusun; keputusan pemilik pada pertanyaan Q4. |
| Bahasa teks | Python, mulai semester `SMP8-2` | Rekomendasi penyusun; keputusan pemilik pada Q3. |

Prinsip rancangan: (1) berpikir komputasional dahulu, kode sesudahnya,
sejalan dengan penekanan pejabat Kemendikdasmen (`riset.md` bagian 3);
(2) setiap minggu punya pilihan kegiatan **tanpa perangkat** (*unplugged*)
agar sekolah dengan sarana terbatas tetap bisa menjalankannya; (3) kelas 7
fokus blok, kelas 8 memperluas ke data dan perangkat lalu transisi ke teks,
kelas 9 memperdalam teks, data, dan proyek; (4) satu produk nyata per
semester (minggu 13); (5) etika, privasi, dan keamanan diri ada di setiap
tahap, bukan hanya satu minggu; (6) tidak ada akun murid pada layanan
daring mana pun (bagian 7).

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
| SMP7-1-M2 | Algoritma: urutan langkah, urutan yang salah | - (unplugged) | Permainan robot-dan-pemberi-instruksi, catatan temuan | D-BK-a, D-AP-a |
| SMP7-1-M3 | Mengenal Scratch: panggung, sprite, blok gerak | Scratch | Sprite berjalan mengikuti rute | D-AP-a |
| SMP7-1-M4 | Peristiwa dan urutan: menggambar bentuk | Scratch | Program menggambar persegi dan segitiga | D-AP-a |
| SMP7-1-M5 | Perulangan | Scratch | Bentuk yang sama ditulis ulang dengan perulangan | D-AP-a, D-BK-a |
| SMP7-1-M6 | Dekomposisi: memecah masalah, animasi cerita | Scratch | Cerita animasi 3 adegan oleh tim | D-BK-a, D-AP-b |
| SMP7-1-M7 | Pola dan generalisasi | Scratch | Program pola berulang; daftar pola yang ditemukan | D-BK-a, D-BK-b |
| SMP7-1-M8 | Percabangan (kondisi) | Scratch | Sprite bereaksi pada kondisi (jika-maka) | D-AP-a |
| SMP7-1-M9 | Variabel | Scratch | Penghitung dan skor sederhana | D-AP-a |
| SMP7-1-M10 | Masukan pengguna: kuis | Scratch | Kuis 5 soal | D-AP-a, D-AP-b |
| SMP7-1-M11 | Debugging: mencari dan memperbaiki kesalahan | Scratch | Tiga program bermasalah diperbaiki, catatan penyebab | D-BK-a, D-PLB-a |
| SMP7-1-M12 | Berbagi karya: atribusi, izin, dan data diri | Scratch | Kartu aturan berbagi (tanpa nama lengkap dan wajah) | D-DSI-c, D-PLB-b |
| SMP7-1-M13 | Proyek mini: animasi atau game satu layar | Scratch | Satu produk beserta penjelasan lisan | D-AP-b, D-PLB-a |
| SMP7-1-M14 | Asesmen dan refleksi | Scratch | Tugas praktik dan jurnal refleksi | D-AP-a, D-BK-a |

**`SMP7-2`: Data, representasi, dan game**

| Kode | Topik | Alat | Keluaran | Butir CP |
| --- | --- | --- | --- | --- |
| SMP7-2-M1 | Data dan informasi; data diskrit | - (unplugged) | Tabel data kelas (sintetis, tanpa nama) | D-AD-a, D-BK-a |
| SMP7-2-M2 | Kodifikasi: biner | - (unplugged) | Kartu biner, pesan sandi sederhana | D-SK-b |
| SMP7-2-M3 | Teks dan gambar sebagai data | - atau Scratch | Gambar piksel dikodekan menjadi angka | D-SK-b |
| SMP7-2-M4 | Daftar (list) | Scratch | Program menyimpan dan menampilkan daftar | D-AP-a, D-BK-a |
| SMP7-2-M5 | Mencari dan mengurutkan | - (unplugged) | Strategi mengurutkan kartu, bandingkan langkah | D-BK-a |
| SMP7-2-M6 | Mengurutkan dalam program | Scratch | Program mengurutkan daftar kecil | D-AP-a |
| SMP7-2-M7 | Game: koordinat, gerak, tabrakan | Scratch | Karakter bergerak dan menghindar | D-AP-b |
| SMP7-2-M8 | Game: skor, nyawa, level | Scratch | Game dengan skor dan akhir permainan | D-AP-b, D-AP-a |
| SMP7-2-M9 | Pesan antar sprite dan klon | Scratch | Game dengan beberapa objek berkomunikasi | D-AP-a |
| SMP7-2-M10 | Komputer sebagai sistem: masukan, proses, keluaran | - (unplugged) | Diagram komponen dan alirnya | D-SK-a |
| SMP7-2-M11 | Uji produk oleh teman | Scratch | Lembar umpan balik; perbaikan | D-PLB-a |
| SMP7-2-M12 | Menjelaskan produk: laporan dan presentasi singkat | LK/dokumen | Laporan satu halaman | D-PLB-b, D-TIK-d |
| SMP7-2-M13 | Proyek mini: game | Scratch | Game beserta laporan | D-AP-b, D-PLB-a |
| SMP7-2-M14 | Asesmen dan refleksi | Scratch | Tugas praktik dan jurnal | D-AP-a, D-SK-b |

### 3.2 Kelas 8 (Fase D)

**`SMP8-1`: Abstraksi, lintas bidang, dan data**

| Kode | Topik | Alat | Keluaran | Butir CP |
| --- | --- | --- | --- | --- |
| SMP8-1-M1 | Dari soal ke algoritma: pengulangan strategi | - | Tiga soal cerita ditulis sebagai langkah | D-BK-a |
| SMP8-1-M2 | Blok buatan sendiri (fungsi) | Scratch | Program memakai blok sendiri | D-AP-a |
| SMP8-1-M3 | Abstraksi | Scratch | Program lama dirapikan dengan blok sendiri | D-BK-a |
| SMP8-1-M4 | Simulasi sains sederhana | Scratch | Simulasi gerak atau siklus | D-BK-b, D-AP-b |
| SMP8-1-M5 | Matematika dengan program: bilangan, faktor, pola | Scratch | Program pola bilangan | D-BK-b |
| SMP8-1-M6 | Lembar kerja: pilah, urutkan, saring data | LK | Tabel data sintetis yang diolah | D-AD-a, D-TIK-d |
| SMP8-1-M7 | Grafik dan interpretasi data | LK | Grafik dengan satu kesimpulan tertulis | D-AD-a |
| SMP8-1-M8 | Prediksi dari data | LK | Prediksi sederhana beserta alasan | D-AD-a |
| SMP8-1-M9 | Translasi konsep ke bahasa blok lain | MakeCode | Program Scratch diterjemahkan ke blok perangkat | D-AP-c |
| SMP8-1-M10 | Masukan dan keluaran perangkat (simulator) | MakeCode | Program pada simulator tombol dan lampu | D-SK-a, D-AP-c |
| SMP8-1-M11 | Proyek perangkat: alarm atau penghitung langkah (simulator; papan fisik opsional) | MakeCode | Satu perangkat tersimulasi | D-AP-b, D-PLB-a |
| SMP8-1-M12 | Jaringan lokal, ponsel, dan internet | - (unplugged) | Peta jaringan rumah atau sekolah (gambar) | D-JKI-a |
| SMP8-1-M13 | Proyek mini: simulasi atau perangkat lintas bidang | Scratch/MakeCode | Satu produk | D-BK-b, D-PLB-a |
| SMP8-1-M14 | Asesmen dan refleksi | - | Tugas praktik dan jurnal | D-BK-a, D-AD-a |

**`SMP8-2`: Transisi ke pemrograman teks (Python)**

| Kode | Topik | Alat | Keluaran | Butir CP |
| --- | --- | --- | --- | --- |
| SMP8-2-M1 | Dari blok ke teks: apa yang sama, apa yang beda | Scratch dan Python | Tabel pasangan blok dan baris kode | D-AP-d, D-AP-c |
| SMP8-2-M2 | Keluaran, masukan, variabel | Python | Program salam dan hitung sederhana | D-AP-d |
| SMP8-2-M3 | Ekspresi dan tipe data | Python | Kalkulator kecil | D-AP-d, D-SK-b |
| SMP8-2-M4 | Percabangan `if` | Python | Penilai nilai sederhana | D-AP-d |
| SMP8-2-M5 | Perulangan `for` dan `while` | Python | Tabel perkalian | D-AP-d |
| SMP8-2-M6 | Menerjemahkan program Scratch ke Python | Python | Satu program Scratch dan versi Python | D-AP-c, D-AP-d |
| SMP8-2-M7 | Menggambar dengan perulangan (grafik kura-kura) | Python | Pola gambar | D-AP-d, D-AP-b |
| SMP8-2-M8 | Daftar (list) | Python | Program daftar belanja | D-AP-d |
| SMP8-2-M9 | Fungsi | Python | Program dengan dua fungsi | D-AP-d |
| SMP8-2-M10 | Membaca pesan galat dan debugging | Python | Lima program bergalat diperbaiki | D-BK-a |
| SMP8-2-M11 | Kata sandi, akun, dan keamanan diri | - (unplugged) | Kartu praktik aman; simulasi sandi kuat | D-DSI-c |
| SMP8-2-M12 | Informasi publik dan privat di media sosial | - (unplugged) | Sortir kartu: bagikan, jangan bagikan | D-DSI-a, D-DSI-b |
| SMP8-2-M13 | Proyek mini: kuis teks atau gambar | Python | Satu program | D-AP-d, D-PLB-a |
| SMP8-2-M14 | Asesmen dan refleksi | Python | Tugas praktik dan jurnal | D-AP-d, D-BK-a |

### 3.3 Kelas 9 (Fase D)

**`SMP9-1`: Python, data, dan strategi**

| Kode | Topik | Alat | Keluaran | Butir CP |
| --- | --- | --- | --- | --- |
| SMP9-1-M1 | Pemecahan masalah: tinjau ulang dan pola | - | Tiga soal diselesaikan dengan alasan | D-BK-a |
| SMP9-1-M2 | Teks (string) | Python | Program memproses kalimat | D-AP-d |
| SMP9-1-M3 | Pasangan kunci-nilai (dictionary), pengantar | Python | Program kamus kecil | D-AP-d |
| SMP9-1-M4 | Membaca berkas teks | Python | Program membaca data sintetis | D-AD-a |
| SMP9-1-M5 | Data tabel kecil: jumlah, rata-rata, terbesar | Python atau LK | Ringkasan data dengan dua cara | D-AD-a |
| SMP9-1-M6 | Sumber data terbuka dan legal | LK | Satu himpunan data terbuka (dipilih guru), tinjauan asal dan lisensinya | D-AD-a, D-TIK-b |
| SMP9-1-M7 | Visualisasi sederhana | LK atau Python | Grafik dengan kesimpulan | D-AD-a, D-TIK-d |
| SMP9-1-M8 | Lebih dari satu solusi untuk satu masalah | Python | Dua program untuk soal yang sama, dibandingkan | D-BK-a |
| SMP9-1-M9 | Mencari dan mengurutkan dengan kode | Python | Program pencarian dan pengurutan kecil | D-BK-a, D-AP-d |
| SMP9-1-M10 | Bilangan acak dan simulasi | Python | Simulasi lempar dadu | D-BK-b, D-AP-d |
| SMP9-1-M11 | Informasi, hoaks, dan keterbukaan informasi | - (unplugged) | Lembar periksa sumber untuk tiga contoh | D-DSI-a, D-TIK-b |
| SMP9-1-M12 | Rencana proyek akhir | LK | Dokumen rencana tim | D-PLB-a |
| SMP9-1-M13 | Proyek mini: pengolah data kecil | Python | Satu program data | D-AD-a, D-PLB-a |
| SMP9-1-M14 | Asesmen dan refleksi | Python | Tugas praktik dan jurnal | D-BK-a, D-AD-a |

**`SMP9-2`: Proyek akhir, literasi AI, dan jembatan ke SMA**

| Kode | Topik | Alat | Keluaran | Butir CP |
| --- | --- | --- | --- | --- |
| SMP9-2-M1 | Mengidentifikasi persoalan masyarakat sekitar | - | Daftar persoalan dan pilihan tim | D-PLB-a |
| SMP9-2-M2 | Merancang solusi | - | Rancangan: tujuan, masukan, proses, keluaran | D-PLB-a, D-BK-a |
| SMP9-2-M3 | Implementasi, tahap 1 | Scratch atau Python | Kerangka produk | D-PLB-a, D-AP-b |
| SMP9-2-M4 | Implementasi, tahap 2 | Scratch atau Python | Produk berjalan | D-PLB-a |
| SMP9-2-M5 | Pengujian dengan pengguna | - | Catatan uji dan daftar perbaikan | D-PLB-a |
| SMP9-2-M6 | Penyempurnaan | Scratch atau Python | Versi akhir | D-PLB-a |
| SMP9-2-M7 | Laporan dan presentasi | Dokumen | Laporan dan presentasi | D-PLB-b, D-TIK-d |
| SMP9-2-M8 | Pengantar kecerdasan artifisial (pengayaan) | - (unplugged) | Permainan klasifikasi dengan kartu | D-DSI-c |
| SMP9-2-M9 | Mesin belajar dari contoh (pengayaan) | - (unplugged) | "Melatih" model kartu dan mengujinya | D-BK-b |
| SMP9-2-M10 | Etika AI: bias, tiruan palsu, ketergantungan | - (unplugged) | Debat terarah; aturan pakai AI kelas | D-DSI-c |
| SMP9-2-M11 | Jembatan ke SMA: membaca kode bahasa lain | Python dan teks | Terjemahan satu program Python ke pseudocode dan C++ (hanya dibaca) | D-AP-c, D-AP-d |
| SMP9-2-M12 | Pameran produk | - | Pameran kelas | D-PLB-b |
| SMP9-2-M13 | Portofolio dan refleksi | - | Portofolio berkas murid sendiri | D-PLB-b |
| SMP9-2-M14 | Asesmen akhir | Python atau Scratch | Tugas praktik dan jurnal | D-AP-d, D-PLB-a |

### 3.4 Klub pengayaan opsional (OSN dan pemecahan masalah) `[asumsi]`

Bukan bagian dari 168 JP inti. Satu pertemuan per dua minggu di luar jam
pelajaran, untuk murid yang berminat; tidak dihitung sebagai pemenuhan butir
CP.

| Tahap | Isi | Alat | Catatan |
| --- | --- | --- | --- |
| Kelas 7 | Teka-teki logika, soal pemikiran komputasional bergaya "bebras" (tanpa kode) | - | Gaya soal; kompetisi tertentu `[belum terverifikasi]` |
| Kelas 8 | Soal pemecahan masalah dengan Python: simulasi, hitung, urutan | Python | Latihan sintetis |
| Kelas 9 | Pengantar pemecahan masalah gaya olimpiade: masukan dan keluaran, kasus uji; membaca soal OSN (R1) hanya untuk dibaca | Python; C++ hanya dibaca | Menyambung ke `sma-coding` jalur A dan korpus `osn` |

## 4. Pemetaan CP Fase D `[belum terverifikasi]`

| Butir CP | Minggu utama | Cakupan |
| --- | --- | --- |
| D-BK-a | SMP7-1-M1, M2, M5, M6, M7, M11; SMP7-2-M1, M4, M5; SMP8-1-M1, M3; SMP8-2-M10; SMP9-1-M1, M8, M9; SMP9-2-M2 | Penuh |
| D-BK-b | SMP7-1-M7; SMP8-1-M4, M5, M13; SMP9-1-M10; SMP9-2-M9 | Penuh (literasi sains dan numerasi lewat simulasi dan matematika) |
| D-TIK-a | - | **Tidak dicakup**: surel bukan coding; cukup dicakup Informatika umum atau modul pendamping |
| D-TIK-b | SMP9-1-M6, M11 | Sebagian (peramban dan evaluasi sumber) |
| D-TIK-c | - | **Tidak dicakup**: CMS di luar coding SMP; rujukan: modul pendamping |
| D-TIK-d | SMP7-2-M12; SMP8-1-M6; SMP9-1-M7; SMP9-2-M7 | Sebagian |
| D-SK-a | SMP7-2-M10; SMP8-1-M10 | Sebagian (masukan-proses-keluaran) |
| D-SK-b | SMP7-2-M2, M3, M14; SMP8-2-M3 | Penuh |
| D-JKI-a | SMP8-1-M12 | Pengenalan saja (konektivitas lokal, ponsel, internet) |
| D-AD-a | SMP7-2-M1; SMP8-1-M6, M7, M8, M14; SMP9-1-M4, M5, M6, M7, M13, M14 | Penuh |
| D-AP-a | SMP7-1-M2 sampai M5, M8 sampai M10, M14; SMP7-2-M4, M6, M8, M9; SMP8-1-M2 | Penuh |
| D-AP-b | SMP7-1-M6, M10, M13; SMP7-2-M7, M8, M13; SMP8-1-M4, M11; SMP8-2-M7; SMP9-2-M3 | Penuh (game, animasi; presentasi lewat bagian PLB-b) |
| D-AP-c | SMP8-1-M9, M10; SMP8-2-M1, M6; SMP9-2-M11 | Penuh |
| D-AP-d | SMP8-2-M1 sampai M9, M13, M14; SMP9-1-M2, M3, M9, M10; SMP9-2-M11, M14 | Penuh |
| D-DSI-a | SMP8-2-M12; SMP9-1-M11 | Sebagian |
| D-DSI-b | SMP8-2-M12 | Sebagian |
| D-DSI-c | SMP7-1-M12; SMP8-2-M11; SMP9-2-M8, M10 | Penuh (etika dan keamanan diri) |
| D-PLB-a | SMP7-1-M11, M13; SMP7-2-M11, M13; SMP8-1-M11, M13; SMP8-2-M13; SMP9-1-M12, M13; SMP9-2-M1 sampai M6, M14 | Penuh |
| D-PLB-b | SMP7-1-M12; SMP7-2-M12; SMP9-2-M7, M12, M13 | Penuh |

Butir di luar silabus coding ini (D-TIK-a, D-TIK-c): tidak dihitung
sebagai pemenuhan; wajib dicakup pembelajaran Informatika sekolah di luar
silabus ini (mengikuti sma-coding bagian 4.3). Materi AI (SMP9-2-M8, M9) dan
klub pengayaan (3.4) adalah **pengayaan di luar rumusan CP yang
dibuka**; pemetaan butir di tabel hanya irisan terdekat dan tidak dihitung
pemenuhan CP.

## 5. Jembatan

### 5.1 Dari SD (`sd-coding`)

Draf program `sd-coding` disusun **paralel** oleh pelaksana lain; isinya belum
disepakati dan tidak dibaca penyusun dokumen ini. Asumsi `[asumsi]`: murid
kelas 6 yang masuk SMP mengenal blok, urutan, perulangan, dan percabangan
dasar. Karena itu `SMP7-1-M1` sampai `M5` dirancang sebagai tinjauan yang
dapat dipadatkan; murid tanpa latar SD tetap dapat mengikutinya. Penyelarasan
kode (`SD6-2-...` ke `SMP7-1-...`) dilakukan setelah kedua silabus disetujui.

### 5.2 Ke SMA (`sma-coding` v1.2)

| Dari SMP | Ke sma-coding | Catatan |
| --- | --- | --- |
| Blok kelas 7 dan pemecahan masalah | Blok fondasi kelas X (`FND-X1-M1..M7`), yang membuka tanpa mensyaratkan bahasa pemrograman | Murid SMP tanpa mapel KKA tetap diterima di fondasi. |
| Python kelas 8-9 | Jalur D (AI dan analisis data) memakai Orange lalu Python | Python menjadi bahasa pertama bagi murid yang masuk D. |
| Logika, percabangan, perulangan, fungsi, daftar | Jalur A (C++) dan jalur B (JS/TS) | Konsep yang sama; sintaks baru. Jalur A butuh tipe statis dan kompilasi yang tidak diajarkan di SMP. |
| Simulator MakeCode kelas 8 | Jalur C (IoT dan robotika, C++ gaya Arduino, ESP32) | Konsep masukan dan keluaran perangkat sudah dikenal. |
| Etika AI kelas 9 | Jalur D | Fondasi sebelum alat AI. |
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
- **Etika AI** (mengikuti pernyataan pejabat bahwa AI adalah alat dan murid
  tetap menyelesaikan tugas sendiri, `riset.md` bagian 3): alat AI generatif
  **tidak dipakai murid** untuk menulis tugas; aturan pakai AI kelas ditulis
  bersama pada `SMP9-2-M10`; pembahasan bias, tiruan palsu, dan
  ketergantungan dilakukan tanpa perangkat.
- **Kode yang dijalankan**: contoh kode yang kelak masuk modul hanya dijalankan
  di peramban atau mesin sekolah dan tidak mengirim data keluar.

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
| **Python (Disarankan)** | Sintaks ringkas; hampir sama dengan blok; berjalan di peramban (Pyodide) tanpa instalasi; gratis (PSF, nirlaba); langsung dipakai jalur D `sma-coding` | Tidak persis sama dengan C++ (jalur A) atau JS (jalur B); tipe dinamis | Kompatibilitas dan aksesibilitas baik; biaya nol |
| JavaScript | Berjalan di setiap peramban; menyambung ke jalur B | Sintaks dan keanehan tipe lebih membingungkan untuk pemula; tampilan lebih berat untuk mula | Jembatan ke B kuat, ke A lemah |
| C++ | Jembatan langsung ke OSN dan jalur A | Terlalu berat untuk kelas 8 (tipe statis, kompilasi, galat); butuh instalasi atau layanan khusus | Dibaca saja di `SMP9-2-M11` |

### 9.2 Alat blok

| Opsi | Kelebihan | Kekurangan | Catatan |
| --- | --- | --- | --- |
| **Scratch (Disarankan untuk kelas 7)** | Gratis; banyak dipakai; cocok untuk animasi dan game (D-AP-a, D-AP-b) | Syarat akun belum terverifikasi; repositori `scratch-gui` diarsipkan 10 Juni 2026 sehingga ketersediaan editor luring dan pembaruan perlu dicek | Pakai tanpa akun murid; simpan berkas lokal |
| MakeCode (blok) | Simulator tanpa papan; kontinu ke Python micro:bit | Terikat ekosistem micro:bit | Dipakai kelas 8 |

### 9.3 Perangkat fisik

| Opsi | Kelebihan | Kekurangan | Catatan |
| --- | --- | --- | --- |
| **Simulator dahulu, papan fisik opsional (Disarankan)** | Tanpa biaya; semua murid dapat; tanpa risiko kehilangan | Kurang nyata | Papan fisik di kelas yang sanggup |
| Papan fisik wajib | Pengalaman nyata | Biaya; tidak adil bagi sekolah terbatas | Harga `[belum terverifikasi]` |

### 9.4 Rekomendasi gabungan

Scratch (kelas 7) lalu MakeCode (simulator, kelas 8) lalu Python (mulai
kelas 8 semester 2), tanpa akun murid, satu jalur inti dengan klub pengayaan
opsional, 2 JP per minggu, dengan kegiatan *unplugged* di setiap tahap.

## 10. Pertanyaan terbuka (keputusan pemilik)

| # | Pertanyaan | Opsi | Rekomendasi |
| --- | --- | --- | --- |
| Q1 | Dasar CP Fase D | (a) Pemilik menyediakan teks resmi Panduan Informatika 2025 atau SK 046/H/KR/2025 agar kerangka kode butir dan pemetaan diganti dan dikutip persis. (b) Lanjut dengan kerangka sementara delapan elemen (dokumen guru). (c) Tidak memetakan CP sama sekali. | **(a)** (Disarankan): satu-satunya jalan agar pemetaan terverifikasi. (b) hanya bila pemilik menerima risiko CP yang sudah diganti. |
| Q2 | Status program di sekolah | (a) Mata pelajaran pilihan Koding dan KA. (b) Ekstrakurikuler. (c) Modul terintegrasi dalam Informatika. (d) Netral: tulis untuk semua dan biarkan sekolah memilih. | **(d)** (Disarankan), karena regulasi belum terverifikasi dan sekolah berbeda. |
| Q3 | Bahasa teks pertama | Python / JavaScript / C++ | **Python** (bagian 9.1). |
| Q4 | Jalur | (a) Satu jalur inti ditambah klub pengayaan OSN opsional. (b) Satu jalur saja tanpa pengayaan. (c) Beberapa jalur seperti sma-coding. | **(a)** (Disarankan): SMP tidak punya OSN Informatika; pengayaan tidak membebani semua murid. |
| Q5 | Alat blok | Scratch / MakeCode saja / Snap atau lain (belum dikaji) | **Scratch kelas 7 dan MakeCode kelas 8**; verifikasi syarat akun dan editor luring dahulu. |
| Q6 | Perangkat fisik | Simulator saja / simulator + papan opsional / papan wajib | **Simulator + papan opsional**. |
| Q7 | Alokasi dan menit JP | 2 JP x 40 menit / 2 JP x 45 menit / sesuai sekolah | **Sesuai sekolah**, rencana ditulis untuk 2 JP; periksa angka resmi. |
| Q8 | Keselarasan dengan `sd-coding` (paralel) | Samakan kode dan jembatan setelah kedua silabus disetujui / setujui sendiri-sendiri | **Samakan setelah keduanya disetujui**. |
| Q9 | Materi AI di kelas 9 | Dua minggu unplugged (rancangan ini) / tambah / tidak ada | **Dua minggu unplugged**: etika dahulu, alat nanti di SMA jalur D. |

## 11. Sumber dan batasan

- Sumber dan status ada di [`riset.md`](riset.md); tidak diulang di sini.
- Batasan utama: teks CP Fase D 2025 tidak dibuka; kerangka kode butir
  sementara; JP, menit per JP, syarat akun, harga perangkat, dan regulasi KKA
  `[belum terverifikasi]`.
- Dokumen ini bukan materi resmi Puspresnas, IA TOKI, atau Kemendikdasmen.

## Changelog

| Versi | Tanggal | Perubahan |
| --- | --- | --- |
| v0.1.0 | 2026-11-19 | Draf awal (issue #129). |
