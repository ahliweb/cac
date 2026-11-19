# Rancangan Penyelarasan Jembatan Antarprogram

- **Version:** v0.2.0
- **Last updated:** 2026-11-19
- **Status:** **DITERAPKAN** (v0.2.0): pemilik menyetujui seluruh rekomendasi K1 sampai K8 pada 2026-11-19 lewat dialog pilihan (issue #177; bagian 9.1). Penerapannya lima PR atomik berurutan (K8 opsi 1); status tiap pasangan ada di tabel bagian 9.1 dan diperbarui oleh PR yang menerapkannya. Teks pengganti di bagian 4 sampai 8 menjadi isi silabus program masing-masing (konten karangan, ADR-0007) dan tunduk pada silabus itu setelah diterapkan; dokumen ini tetap sebagai catatan alasan dan analisisnya. Jembatan kuliah-coding ke dewasa-coding jalur `PRO` dirancang karena pemilik menginstruksikan perancangannya mulai 2026-11-19.
- **Changeset:** v0.2.0: status diterapkan, keputusan pemilik dicatat (bagian 9.1); `.changeset/jembatan-kuliah-dewasa.md` dan changeset PR berikutnya. v0.1.0: dokumen rancangan (konten karangan menurut [ADR-0007](../architecture/adr/0007-authored-learning-content.md)).

> Dokumen ini adalah **rancangan dan catatan alasan**, bukan transkripsi.
> Persetujuan pemilik atas delapan pertanyaan di bagian 9 dicatat di bagian
> 9.1 (semua opsi yang disarankan, 2026-11-19, issue #177); teks pengganti di
> bagian 4 sampai 8 dipindahkan ke silabus program masing-masing oleh PR
> penerapannya dan sesudah itu tetap menjadi konten karangan yang divalidasi
> lewat silabus programnya. Repositori ini tidak menyimpan data pembelajar
> ([ADR-0004](../architecture/adr/0004-no-learner-personal-data.md)); semua
> prosedur pengamatan dan pemeriksaan bukti di bawah dilakukan di sekolah,
> kampus, atau penyelenggara, bukan di repositori.

## 0. Cara membaca dokumen ini

- **Pasangan** adalah dua program yang berurutan pada alur jenjang
  ([`README.md`](README.md) bagian 1): `tk` dan `sd`, `sd` dan `smp`, `smp`
  dan `sma`, `sma` dan `kuliah`, `kuliah` dan `dewasa` (jalur `PRO`). Nama
  pendek merujuk `tk-coding`, `sd-coding`, `smp-coding`, `sma-coding`,
  `kuliah-coding`, `dewasa-coding`.
- **Status kecocokan** pada tabel analisis: **T** = asumsi atau tujuan program
  atas sudah dipenuhi keluaran program bawah; **C** = celah, asumsi program atas
  tidak dipenuhi (atau rujukan jembatan salah); **U** = pengulangan, program atas
  mengajarkan lagi apa yang sudah dihasilkan program bawah; **B** = baru di
  program atas, tidak ada padanan di program bawah (bukan celah dan bukan
  pengulangan).
- **Label bukti rekomendasi** mengikuti [`ilmu-belajar-kognitif.md`](../riset/ilmu-belajar-kognitif.md)
  bagian 8: **K** = prinsipnya didukung bukti kuat (`[A]` atau `[B]`);
  **M** = masuk akal tetapi bukti untuk pemrograman, untuk usia itu, atau untuk
  konteks Indonesia terbatas (`[inferensi]`). Rekomendasi yang prinsipnya
  kuat tetapi penerapannya ke coding belum diuji ditulis "K pada prinsipnya, M
  pada penerapan". Skala `[A]` sampai `[E]` dan kode verifikasi (`T-A`, `P`)
  sama dengan kedua dokumen riset.
- `[asumsi]` dan `[belum terverifikasi]` memakai arti yang sama dengan silabus
  program. Kode minggu, butir, mata kuliah, dan modul ditulis persis seperti di
  silabus dan `data/<id>/`.

## 1. Ringkasan

Enam silabus coding disusun paralel, dan bagian jembatan di sebagian besar
ditulis sebelum silabus pasangannya dapat dibaca. Pembacaan nyata kedua sisi
menghasilkan tiga temuan yang berlaku untuk semua pasangan.

1. **Tidak ada program yang mewajibkan program sebelumnya.** TK tidak wajib
   bagi murid SD; SD kelas 1-4 opsional dan kelas 5-6 pilihan; SMP ditulis
   netral terhadap bentuk programnya; SMA tidak menyebut SMP sebagai
   prasyarat; kuliah tidak punya prasyarat dari SMA. Maka jembatan yang tepat
   bukan rantai prasyarat tetapi **penempatan di dalam kelas**: murid dengan
   dan tanpa latar program bawah mengikuti program atas yang sama.
2. **Yang paling sering terjadi adalah pengulangan, bukan celah.** Hampir
   semua yang diasumsikan program atas sudah dihasilkan program bawah, dan
   sering dengan kegiatan yang sama (mis. `TK-B1-M5` dan `SD1-1-M8` sama-sama
   "ulangi dua kali"; `SD6-2-M4` dan `SMP9-2-M9` sama-sama "melatih mesin
   kartu"). Celah nyata hanya tiga: perulangan, percabangan, dan blok di
   antara SD dan SMP; Git, penunjuk, dan basis data di antara SMA dan kuliah;
   pemrograman berorientasi objek di antara kuliah dan dewasa.
3. **Tiga rujukan jembatan di silabus yang ada tidak tepat** dan terdeteksi
   hanya karena kode minggu dibaca satu per satu: `tk-coding` bagian 5 baris 2
   (`TK-B2-M1` bukan minggu pola), `smp-coding` bagian 5.2 baris 1 (blok kelas
   7 dipetakan ke blok fondasi `FND-X1-M1..M7` yang tidak memuat
   pemrograman), dan `kuliah-coding` bagian 5.1 baris 5 (blok fondasi
   dipetakan ke `KUL-U-101` dengan alasan "berpikir komputasional" padahal
   fondasi memuat sistem komputer, jaringan, dan keamanan).

| Pasangan | Celah | Pengulangan | Jembatan hari ini | Usulan inti |
| --- | --- | --- | --- | --- |
| `tk` dan `sd` | Tidak ada celah SD; kosakata dan simbol belum disamakan; satu rujukan minggu TK salah | Besar: `SD1-1-M1..M10` dan `SD1-2-M1..M3` banyak sama dengan TK B | Sepihak, asumsi lebih rendah daripada keluaran TK B | Pengamatan 2-3 minggu, jalur padat di kelas yang sama, pakai minggu cadangan; kode jembatan disamakan |
| `sd` dan `smp` | Perulangan, percabangan, variabel hanya di kelas 2-4 opsional; blok hanya opsi `SD6-1-M9..M10`, padahal `smp-coding` 5.1 mengasumsikan blok | Sedang: `SMP7-1-M1..M2`, KA kelas 9 | Sepihak, saling tidak dibaca | `smp-coding` tidak mengasumsikan blok; hanya minggu tanpa layar dipadatkan; `sd-coding` 7.2 menyatakan apa yang tidak dijamin |
| `smp` dan `sma` | `sma-coding` tidak menyebut SMP; pemetaan blok kelas 7 ke fondasi salah | Besar: `FND-X1-M1..M7` beririsan dengan minggu SMP non-pemrograman; `A-X1-M9..M12` dan `B-X1-M9..M12` dari nol | Sepihak dari SMP | Subbagian "kemampuan masuk dan penempatan" di SMA; fondasi tetap kelas bersama |
| `sma` dan `kuliah` | Jalur A tidak mengajarkan Git, penunjuk, tabel hash; jalur B tanpa basis data (prasyarat `KUL-I-205`); jembatan fondasi ke `KUL-U-101` salah | Besar bagi jalur A; kebijakan AI berbeda (SMA bebas, kuliah Kuning) | Sepihak dari kuliah | Pengakuan per CPMK dengan bukti portofolio dan ujian praktik tanpa AI |
| `kuliah` dan `dewasa` `PRO` | Kuliah tidak memuat pemrograman berorientasi objek (`DW-PRO-M6`); Python hanya di jalur U | Besar: 7 dari 13 modul `PRO` dapat dilewati bagi lulusan jalur I | Ditunda (keputusan 12.7) | Tiga status modul (lewati, padatkan, wajib) per profil; jam `PRO` turun perkiraan 81, 43, atau 20 dari 136 |

Penerapan semua usulan menyentuh enam silabus dan 39 berkas korpus (hampir
semuanya hanya `syllabusVersion`; yang berubah isi hanya berkas jembatan)
beserta `data/programs.json`; tidak satu pun parser berubah untuk bentuk teks
yang diusulkan; rincian di bagian 10. Delapan pertanyaan keputusan ada di
bagian 9.

## 2. Metode

1. **Keluaran nyata program bawah.** Untuk tiap pasangan dibaca minggu, mata
   kuliah, atau modul terakhir dan capaian yang tertulis di silabus: `TK-A1-M1`
   sampai `TK-B2-M12`, `SD1-1-M1` sampai `SD6-2-M14`, `SMP7-1-M1` sampai
   `SMP9-2-M14`, `FND-X1-M1..M7` dan semua minggu jalur A sampai E,
   `KUL-U-*`, `KUL-I-*`, `KUL-K-*`, dan `DW-PRO-M1..M13`.
2. **Asumsi kemampuan masuk program atas.** Dibaca dari bagian jembatan dan
   prasyarat: `sd-coding` 7.1, `smp-coding` 5.1, `sma-coding` (tidak ada;
   `smp-coding` 5.2 menulis sepihak), `kuliah-coding` (prasyarat tiap mata
   kuliah), `dewasa-coding` 5 (prasyarat `PRO`) dan 6.1.
3. **Pemetaan kecocokan** per butir: T, C, atau U (bagian 0), dengan kode
   minggu atau mata kuliah di kedua sisi. Kode diperiksa dengan membaca
   tabel silabus, bukan dari ingatan.
4. **Dasar ilmiah** hanya dari dua dokumen riset repositori
   ([`ilmu-belajar-kognitif.md`](../riset/ilmu-belajar-kognitif.md) bagian 3.1
   sampai 3.4, 6.2 sampai 6.4, 7, 8; [`ai-rekayasa-perangkat-lunak.md`](../riset/ai-rekayasa-perangkat-lunak.md)
   bagian 4.5 dan 6) yang rujukannya sudah diverifikasi metadatanya. Teks
   lengkap artikel tidak dibaca di kedua riset; klaim dibatasi pada abstrak.
5. **Uji bentuk teks usulan.** Setiap teks pengganti yang menyentuh tabel atau
   paragraf yang dicerminkan di `data/<id>/` ditempel ke **salinan lepas** repositori
   di luar pohon kerja (bukan ke berkas di repositori), data dibangkitkan ulang
   oleh parser fidelity program itu, lalu dijalankan `bun run check:fidelity` dan
   `bun run validate`: keenam program dan `osn` lolos. `bun test` pada salinan itu
   gagal pada uji yang mengunci versi lama atau status jembatan `ditunda`
   (bagian 10); gagalnya uji itu diharapkan dan bukan temuan kesalahan teks.
   Hasil ini hanya membuktikan bahwa bentuk teks dapat diparse dan lolos audit
   hitungan; isi akademisnya tetap tunduk pada keputusan pemilik.

## 3. Prinsip rancangan yang dipakai

| Prinsip | Dasar | Label |
| --- | --- | --- |
| Jangan menulis jembatan sebagai prasyarat bila program bawah tidak wajib; tulis sebagai penempatan | Keadaan nyata ketiga temuan di bagian 1 | (fakta repositori) |
| Pengamatan awal dan jalur padat di dalam kelas yang sama, bukan tes yang memisahkan murid | Efek keahlian terbalik: teknik yang membantu pemula dapat merugikan pelajar berpengalaman (Kalyuga dkk., 2003); contoh terselesaikan efektif bagi pemula dan perlu dipudarkan (Sweller dan Cooper, 1985; ilmu belajar 3.4) | M: bukti terkuat dari aljabar dan geometri, tidak ada studi penempatan untuk coding usia sekolah |
| Pengulangan yang disengaja diberi jarak, bukan dipadatkan: keamanan perangkat dan privasi, serta keterampilan yang dilupakan | Latihan berjarak (Cepeda dkk., 2006, 2008; ilmu belajar 3.2); latihan mengingat kembali (Roediger dan Karpicke, 2006; Agarwal dkk., 2021) | K pada prinsipnya (materi fakta), M pada penerapan ke coding |
| Anak kecil: pengamatan, bukan tes; contoh lebih dulu | `tk-coding` 6.1 (kutipan panduan resmi tentang risiko pelabelan); Sinha dan Kapur (2021): arah efek untuk kelas 2-5 menguntungkan instruksi lebih dulu | M untuk SD; TK: tidak ada bukti kebutuhan coding dini (ilmu belajar 7) |
| Transisi blok ke teks dengan tugas penerjemahan dan baca-prediksi sebelum menulis | Weintrop dan Wilensky (2017): ada pertukaran antara blok dan teks; Sentance dkk. (2019): PRIMM usia 11-14; Sorva (2013): mesin konseptual sebagai tujuan eksplisit; Lister dkk. (2004): kemampuan menelusuri kode | K untuk PRIMM usia 11-14 (menurut ilmu belajar 8.2: sedang, kuasi-eksperimen), M selebihnya |
| Bukti kemampuan masuk di jenjang dewasa: kinerja yang diperiksa langsung, bukan riwayat mata kuliah atau tugas rumah | Finnie-Ansley dkk. (2022): asisten kode mengungguli sebagian besar mahasiswa pada soal ujian pengantar; keahlian berlaku per topik (ilmu belajar 7) | M |
| Pemakaian AI sebagai pekerjaan setelah gerbang kesiapan (menelusuri, menulis uji, menjelaskan) | Bastani dkk. (2025) `[B]`, matematika; Prather dkk. (2024) `[C]`; Shen dan Tamkin (2026) dan Lehmann dkk. (2024) `[E]` (desain eksperimen; preprint); AI 6 | M |

## 4. Pasangan 1: `tk-coding` dan `sd-coding`

### 4.1 Keadaan sekarang

- `tk-coding` bagian 5 (v1.0.1): "Jembatan berikut disusun sebelum silabus itu
  dibaca, bersifat rancangan sepihak, dan **harus disesuaikan** dengannya
  `[belum terverifikasi]`." Lima baris keluaran TK B (`TK-B1-M2`, `TK-B2-M4`,
  `TK-B1-M4`, `TK-B2-M1`, `TK-B2-M3`, `TK-B1-M7`, `TK-B2-M9`) dipetakan ke
  "prasyarat untuk SD awal (Fase A)", semuanya `[asumsi]`; Q8 (bagian 9)
  menunggu silabus SD. Cermin data: `data/tk-coding/bridge.json`.
- `sd-coding` bagian 7.1 (v1.0.1): prasyarat kelas 1 dari TK adalah "mengikuti
  perintah satu atau dua langkah, mengurutkan tiga kartu gambar,
  mengelompokkan benda menurut satu sifat, dan bersikap baik pada teman";
  "kegiatan kelas 1 semester 1 mengulang dasar-dasar itu tanpa menganggapnya
  sudah dikuasai." Bagian 7 menyatakan disusun "sebelum keduanya dibaca".
  Cermin data: `data/sd-coding/bridges.json` (id `tk-ke-kelas-1`).
- Keluaran TK B yang nyata: `TK-B1-M1` sampai `TK-B2-M12` (kisi 4x4 dan 5x5,
  kartu panah dan ulang, program yang salah diperbaiki, pola, dua aturan,
  piktogram, perintah maju-belok-ulangi, simbol), diakhiri `TK-B2-M12`
  (ringkasan naratif per anak di sekolah, bukan di repositori).

### 4.2 Analisis kecocokan

| Butir | Keluaran `tk-coding` | Asumsi atau kegiatan `sd-coding` | Status |
| --- | --- | --- | --- |
| Perintah satu atau dua langkah | `TK-A1-M3`, `TK-A1-M11`, `TK-A2-M3`; tiga perintah di `TK-B1-M1` | Diasumsikan 7.1; diajarkan lagi `SD1-1-M1` | U |
| Urutan tiga kartu | `TK-A2-M1`, `TK-B1-M2`, `TK-B2-M4` | Diasumsikan tiga kartu 7.1; `SD1-1-M2` empat kartu, `SD1-1-M3` | U |
| Mengelompokkan menurut satu sifat | `TK-A1-M7`, `TK-A1-M8`; dua aturan di `TK-B1-M7` | Diasumsikan satu sifat 7.1; `SD1-2-M1` sampai `M3`; dua aturan baru di `SD1-2-M2`, `SD2-2-M8` | U (TK melampaui asumsi) |
| Bersikap baik pada teman | `FF-JD-c`: `TK-B1-M2`, `TK-B2-M4`, `TK-B1-M11` | `SD1-2-M7` | T |
| Mengulang ("ulang dua kali") | `TK-B1-M5`, `TK-B2-M1` | Tidak diasumsikan; `SD1-1-M8`, `SD2-1-M3` | U (kegiatan sama) |
| Mencari dan memperbaiki kesalahan | `TK-A2-M2`, `TK-B1-M3`, `TK-B2-M4` | `SD1-1-M3`, `SD1-1-M10`; `SD2-1-M6`, `SD2-1-M7` | U |
| Kisi, kartu arah, peta | `TK-B1-M1`, `TK-B1-M2`, `TK-B1-M11`, `TK-B2-M3` | `SD1-1-M4`, `SD1-1-M7`, `SD1-1-M13` (peta harta, sama dengan `TK-B1-M11`); `SD2-1-M1` | U |
| Pola | `TK-A1-M5`, `TK-A2-M5`, `TK-B1-M4` | `SD1-1-M5`, `SD1-1-M6`; `SD2-1-M4` | U |
| Memecah tugas besar | `TK-A2-M9`, `TK-B2-M5` | `SD1-1-M9`; `SD2-1-M5` | U |
| Gambar atau simbol mewakili perintah | `TK-B2-M7` | `SD2-1-M10`; simbol arah baru di `SD3-2-M1` | T (TK mendahului) |
| Aturan memakai perangkat, rahasia pribadi | `TK-A1-M10`, `TK-B2-M9` | `SD1-2-M4`, `SD1-2-M8`, `SD1-2-M9` | U yang disengaja (keamanan perlu diulang) |
| Kosakata dan simbol | Kartu panah, "belok", kartu "ulang x2", "robot" | "maju, kiri, kanan", "ulangi n kali", "robot manusia"; kesepakatan simbol bersama diputuskan pemilik (SD bagian 13, nomor 5) | C ringan (belum disamakan) |
| Rujukan jembatan TK | Baris 2 menulis `TK-B2-M1` sebagai minggu pola; minggu itu melatih arah dan ulang | Kolom "Fase A": SD kelas 1-4 di luar struktur KKA, tidak ada Fase A di SD | C (koreksi rujukan) |

Kesimpulan: semua asumsi `sd-coding` 7.1 terpenuhi oleh TK B (T atau
U); pekerjaan jembatan adalah mengatur pengulangan dan menyamakan
kosakata, bukan menutup celah. Sembilan dari tiga belas butir berstatus U,
dua T, dan dua C. Karena TK tidak wajib, sebagian murid kelas 1 tidak punya latar
itu, jadi `SD1-1-M1..M10` tidak boleh dihapus.

### 4.3 Rekomendasi

| Rekomendasi | Label | Dasar |
| --- | --- | --- |
| Dua sampai tiga minggu pertama kelas 1 sebagai pengamatan lewat permainan rute (bentuknya seperti `SD1-1-M12`), memakai ceklis "terlihat" dan "belum terlihat" yang sama dengan `tk-coding` 6.1; tanpa tes, tanpa nilai angka | M | `tk-coding` 6.1; efek keahlian terbalik (Kalyuga dkk., 2003) |
| Jalur padat di kelas yang sama: murid yang terlihat menguasai memimpin permainan dan mengerjakan tantangan `SD2-1-M1..M3`, murid lain mengikuti urutan penuh; minggu cadangan kelas 1 (8 dari 36 minggu) dipakai untuk penguatan | M | Sinha dan Kapur (2021): untuk kelas 2-5 instruksi lebih dulu; tantangan lanjutan tetap berbentuk contoh dan permainan |
| Keamanan perangkat dan rahasia pribadi (`SD1-2-M8`, `SD1-2-M9`) tidak dipadatkan | K pada prinsipnya | Latihan berjarak (Cepeda dkk., 2006) |
| Samakan kosakata dan simbol arah lewat satu lembar bersama (kartu panah, "ulang", "maju", "belok") yang boleh dipakai kedua program | M | Keputusan pemilik SD bagian 13, nomor 5 butir (b) |
| Pembawa informasi adalah ringkasan naratif `TK-B2-M12` yang tetap di sekolah dan keluarga, bukan berkas di repositori | (aturan repositori) | ADR-0004 |

### 4.4 Teks usulan pengganti

**`docs/programs/tk-coding/silabus.md`, bagian 5** (seluruh bagian, dari
`## 5. Jembatan ke program SD` sampai sebelum `## 6.`). Tabel tetap tiga
kolom dan lima baris; kode minggu SD ada di kolom kedua dan ketiga sehingga
parser dan skema tidak berubah.

````markdown
## 5. Jembatan ke program SD

- **Kebijakan.** Kepka 046/H/KR/2025 Diktum KEENAM: CP Fase A "disusun selaras dengan Capaian Pembelajaran pada fase fondasi untuk memastikan transisi pembelajaran yang berkesinambungan dari PAUD ke SD" (kutipan penuh enam kemampuan fondasi di riset 2.1). Mata pelajaran koding dan KA pilihan dimulai kelas V SD menurut halaman BBPMP yang dibuka (riset 2.5), bukan di PAUD.
- **Program `sd-coding`.** Silabus `sd-coding` (v1.0.1, disetujui pemilik pada 2026-11-19) sudah dibaca dan jembatan berikut dipetakan ke kode minggunya (`docs/programs/sd-coding/silabus.md` bagian 5 dan 7.1). Kelas 1-4 SD berada di luar struktur KKA dan berupa pengenalan opsional, sehingga keluaran TK B bukan prasyarat SD dan SD tidak memakai istilah "Fase A" untuk kelas 1; kolom kedua tabel menyebut butir pengenalan SD yang disentuh. Keluaran TK B sudah mencakup, dan di beberapa butir melampaui, kemampuan masuk kelas 1, sehingga yang perlu diatur adalah pengulangan, bukan celah `[asumsi]`.

| Keluaran akhir TK B | Butir pengenalan SD yang disentuh (kelas 1-2) | Catatan |
| --- | --- | --- |
| Menyusun dan membetulkan urutan 3-4 langkah (`TK-B1-M2`, `TK-B2-M4`) | Mengurutkan langkah penyelesaian tugas (`SD1-1-M2`, `SD1-1-M3`, `SD1-1-M10`; lanjutannya `SD2-1-M6`, `SD2-1-M7`) | `[asumsi]` Murid yang terlihat menguasainya tidak mengulang urutan penuh di kelas 1 (`sd-coding` bagian 7.1). |
| Membuat dan melanjutkan pola (`TK-B1-M4`, `TK-B1-M6`) | Pola warna, bentuk, gerak, dan bunyi (`SD1-1-M5`, `SD1-1-M6`, `SD2-1-M4`) | `[asumsi]` Rujukan minggu dikoreksi dari v1.0.1: `TK-B2-M1` melatih arah dan ulang, bukan pola. |
| Kartu arah, kartu ulang, dan "program" di kisi (`TK-B1-M5`, `TK-B2-M1`, `TK-B2-M3`) | Instruksi dan algoritma sederhana tanpa layar (`SD1-1-M4`, `SD1-1-M7`, `SD1-1-M8`, `SD2-1-M1`, `SD2-1-M3`) | `[asumsi]` Simbol arah dan kata "ulang" sama dengan TK bila murid mengenalnya; bila tidak, kelas 1 menyepakati simbol bersama di awal tahun (`sd-coding` bagian 13, nomor 5). |
| Mengelompokkan dengan dua aturan dan membaca gambar data (`TK-B1-M7`, `TK-B1-M8`) | Klasifikasi dan tabel data (`SD1-2-M1`, `SD1-2-M2`, `SD1-2-M3`; tabel baru di `SD3-2-M3`) | `[asumsi]` Piktogram TK mendahului tabel SD; kelas 1 tidak perlu mengulang pengelompokan satu sifat bagi murid yang terlihat menguasainya. |
| Aturan memakai perangkat digital (`TK-B2-M9`) | Literasi digital dasar dan keamanan (`SD1-2-M4`, `SD1-2-M8`, `SD1-2-M9`) | `[asumsi]` Diulang dengan jarak waktu, bukan dipadatkan: aturan keamanan perangkat tidak dilewati karena murid sudah pernah mendengarnya. |

Q8 (bagian 9) terpenuhi oleh revisi ini: kode jembatan kini menyebut kode minggu SD. Pembawa informasi dari TK ke SD adalah ringkasan naratif akhir TK B (`TK-B2-M12`) yang tetap di sekolah dan keluarga; repositori ini tidak memuat berkas anak (ADR-0004). SD mengamati murid kelas 1 dengan ceklis "terlihat" dan "belum terlihat" yang sama bentuknya dengan bagian 6.1, tanpa tes dan tanpa nilai angka.
````

**`docs/programs/sd-coding/silabus.md`, bagian 7** (seluruh bagian, dari
`## 7. Jembatan dari TK dan ke SMP` sampai sebelum `## 8.`; subbagian 7.3
tidak berubah, ditempel utuh agar bagian bisa diganti sekaligus). Id jembatan
`tk-ke-kelas-1`, `kelas-6-ke-smp`, `ke-sma` tetap; skema tidak berubah.

````markdown
## 7. Jembatan dari TK dan ke SMP

Program `tk-coding` (v1.0.1) dan `smp-coding` (v1.1.1) disetujui pemilik (2026-11-19) dan sudah dibaca untuk menyelaraskan bagian ini (keputusan pemilik 5, bagian 13). Hasil pembacaan: tidak satu pun dari ketiga program mewajibkan program tetangganya. TK tidak wajib bagi murid SD, kelas 1-4 SD berupa pengenalan opsional dan kelas 5-6 mata pelajaran pilihan, dan bentuk program SMP ditentukan sekolah (`smp-coding` bagian 2). Maka jembatan di bawah adalah penempatan di dalam kelas dan bukan rantai prasyarat `[asumsi]`.

### 7.1 Dari TK (`tk-coding`) ke kelas 1

Tidak ada prasyarat yang wajib; kelas 1 dirancang untuk murid dengan maupun tanpa latar TK B. Keluaran akhir TK B (`TK-B1-M1` sampai `TK-B2-M12`) mencakup dan melampaui kemampuan masuk yang semula diasumsikan di sini (perintah satu atau dua langkah, mengurutkan tiga kartu, mengelompokkan menurut satu sifat), dan kegiatan `SD1-1-M1` sampai `SD1-1-M10` serta `SD1-2-M1` sampai `SD1-2-M3` banyak yang sama dengan kegiatan TK B: `TK-B1-M5` dan `SD1-1-M8` sama-sama "ulangi dua kali", `TK-B1-M11` dan `SD1-1-M13` sama-sama peta harta, `TK-B1-M6` dan `SD1-2-M11` sama-sama bagian lagu yang berulang. Karena itu dua sampai tiga minggu pertama kelas 1 dipakai guru untuk mengamati lewat permainan rute (bentuknya seperti `SD1-1-M12`), dengan ceklis "terlihat" dan "belum terlihat" per kegiatan; tanpa tes, tanpa nilai angka, dan tanpa catatan di repositori ini (ADR-0004). Murid yang terlihat menguasai kegiatan suatu minggu tidak mengulangnya: ia memimpin permainan atau mengerjakan tantangan lanjutan setingkat `SD2-1-M1` sampai `SD2-1-M3`; murid yang belum terlihat mengikuti urutan penuh, dan minggu cadangan kelas 1 (delapan dari 36 minggu, bagian 2) boleh dipakai untuk penguatan. Kegiatan aturan keamanan perangkat dan rahasia pribadi (`SD1-2-M8`, `SD1-2-M9`) tidak dipadatkan bagi siapa pun. Bila TK memakai simbol arah dan kata "ulang" tertentu, kelas 1 memakainya; bila tidak, kelas 1 menyepakati simbol bersama di awal tahun (keputusan pemilik 5, butir (b)). Dasar `[asumsi]`: efek keahlian terbalik dan latihan berjarak (`docs/riset/ilmu-belajar-kognitif.md` bagian 3.2 dan 3.4); pengamatan, bukan tes, mengikuti `tk-coding` bagian 6.1.

### 7.2 Dari kelas 6 ke SMP (`smp-coding`)

Keluaran yang diharapkan di akhir kelas 6 (daftar "sudah bisa" di `SD6-2-M14`): menulis instruksi logis dengan simbol, menguji dan memperbaikinya, menjelaskan masukan-proses-keluaran, menjaga informasi pribadi, membedakan mesin cerdas dan non-cerdas, menjelaskan bahwa KA belajar dari data dan bisa keliru. Yang tidak dijamin oleh kelas 5-6 (inti Fase C): perulangan, percabangan, dan variabel hanya dibahas di kelas 2-4 yang opsional (`SD2-1-M3`, `SD2-1-M8`, `SD3-1-M3` sampai `SD3-1-M6`, `SD4-1-M6`, `SD4-1-M7`), dan blok visual hanya opsi di `SD6-1-M9` dan `SD6-1-M10`. Informatika baru menjadi mata pelajaran di SMP (riset bagian 4), dan panduan kodingka menyebut SMP mengenalkan pemrograman blok dan konsep KA sederhana (riset bagian 2.2). Karena itu `sd-coding` tidak mengajarkan sintaks pemrograman, dan murid yang masuk SMP hanya dengan kelas 5-6 belum mengenal perulangan, percabangan, ataupun blok, sedangkan murid yang mengikuti kelas 2-4 mengenal konsepnya tanpa layar tetapi belum mengenal Scratch. `smp-coding` bagian 5.1 menyesuaikan diri: tidak mengasumsikan blok, memadatkan hanya minggu tanpa layar, dan memakai `SMP7-1-M1` sebagai pengamatan awal dengan daftar "sudah bisa" ini sebagai bahan. Kegiatan KA kelas 5-6 (`SD5-2-M5` sampai `SD5-2-M8`, `SD6-2-M4`) diulang di `SMP9-2-M8` sampai `SMP9-2-M10` dengan tuntutan lebih tinggi (kualitas data, bias, halusinasi), bukan sebagai pengulangan yang sama.

### 7.3 Ke SMA

Jembatan tidak langsung: SD, SMP, lalu program `sma-coding` (jalur A dan seterusnya). Tidak ada jembatan SD ke SMA di silabus ini.
````

### 4.5 Dampak

| Hal | Perubahan |
| --- | --- |
| Versi | `tk-coding` 1.0.1 ke **1.0.2 (patch)**: hanya rujukan minggu dikoreksi dan kolom dilengkapi kode SD; isi kurikulum TK tidak berubah. `sd-coding` 1.0.1 ke **1.1.0 (minor)**: aturan baru bagi pelaksana (pengamatan awal, jalur padat) di bagian 7. |
| Data | `data/tk-coding/bridge.json` (isi baris, `sdProgram`) dan `syllabusVersion` di ketujuh berkas; `data/sd-coding/bridges.json` (teks `intro`, `tk-ke-kelas-1`, `kelas-6-ke-smp`) dan `syllabusVersion` di kelima berkas; `data/programs.json`. |
| Parser | `src/cli/fidelity/tk-coding.ts` dan `src/cli/fidelity/sd-coding.ts`: tidak berubah. |
| Skema dan audit | Tidak berubah (hitungan lima baris TK dan tiga paragraf SD dipertahankan). |

## 5. Pasangan 2: `sd-coding` dan `smp-coding`

### 5.1 Keadaan sekarang

- `sd-coding` bagian 7.2 (v1.0.1): keluaran kelas 6 `[asumsi]`;
  "`sd-coding` **tidak mengajarkan sintaks pemrograman**; blok visual hanya
  opsi di kelas 6." Penyelarasan diserahkan ke keputusan pemilik 5.
  Cermin: `data/sd-coding/bridges.json` (id `kelas-6-ke-smp`).
- `smp-coding` bagian 5.1 (v1.1.1): "Program `sd-coding` ... disusun paralel
  ... isinya tidak dibaca penyusun dokumen ini. Asumsi: murid kelas 6 yang
  masuk SMP mengenal blok, urutan, perulangan, dan percabangan dasar. Karena itu
  `SMP7-1-M1` sampai `M5` dirancang sebagai tinjauan yang dapat dipadatkan."
  Cermin: `data/smp-coding/bridge.json` (`fromSd.text`).
- Keluaran SD nyata: kelas 5-6 (inti Fase C) memenuhi 16 butir CP lewat
  instruksi berurutan dengan simbol (`SD5-1-M6`, `SD6-1-M1..M3`), keamanan,
  dan KA tanpa layar; diakhiri `SD6-2-M14` ("daftar 'sudah bisa' untuk SMP").
  Kelas 2-4 (opsional) memuat perulangan, percabangan, variabel, urut dan cari,
  diagram alir.

### 5.2 Analisis kecocokan

| Butir | Keluaran `sd-coding` | Asumsi atau rencana `smp-coding` | Status |
| --- | --- | --- | --- |
| Blok visual (Scratch) | Hanya opsi `SD6-1-M9`, `SD6-1-M10` (`[opsi layar]`) | Diasumsikan dikenal (5.1); `SMP7-1-M3` sampai `M14` memakai Scratch | C |
| Urutan instruksi | Inti: `SD5-1-M6`, `SD6-1-M1` sampai `M3` | `SMP7-1-M1`, `SMP7-1-M2` (tinjauan) | U |
| Perulangan | Hanya kelas 2-4 opsional: `SD2-1-M3`, `SD3-1-M5`, `SD4-1-M7` | Diasumsikan dikenal; `SMP7-1-M5` | C bagi murid kelas 5-6 saja; sebagian bagi murid kelas 2-4 |
| Percabangan | Hanya kelas 2-4 opsional: `SD2-1-M8`, `SD2-1-M9`, `SD3-1-M4`, `SD4-1-M6` | Diasumsikan dikenal; `SMP7-1-M8` | C (sama) |
| Variabel | Hanya `SD3-1-M3` (opsional) | `SMP7-1-M9` | C (sama) |
| Dekomposisi, pola, abstraksi | `SD4-1-M2` sampai `M4`, `SD5-1-M2` | `SMP7-1-M6`, `SMP7-1-M7`, `SMP8-1-M3` | U |
| Mencari dan memperbaiki kesalahan | `SD4-1-M9`, `SD6-1-M4` | `SMP7-1-M11` | U |
| Data, tabel, diagram | `SD3-2-M3`, `SD3-2-M4` | `SMP7-2-M1` | U |
| Biner dan piksel | `SD3-2-M2`, `SD4-2-M9` | `SMP7-2-M2`, `SMP7-2-M3` (pengayaan) | U |
| Mengurutkan dan mencari | `SD3-1-M7`, `SD3-1-M8` | `SMP7-2-M5` (tanpa layar) | U |
| Masukan, proses, keluaran | `SD2-2-M1`, `SD4-2-M2`, `SD5-1-M8` | `SMP7-2-M10` | U |
| Privasi dan kata sandi | `SD4-2-M3`, `SD4-2-M4`, `SD5-1-M9`, `SD6-2-M10` | `SMP7-1-M12`, `SMP8-2-M11`, `SMP8-2-M12` | U yang disengaja |
| "Melatih mesin kartu" | `SD4-2-M10`, `SD6-2-M4` | `SMP9-2-M9` ("melatih model kartu dan mengujinya") | U (kegiatan sama; tuntutan SMP perlu naik) |
| Etika KA | `SD6-2-M3`, `SD6-2-M7`, `SD6-2-M11` | `SMP9-2-M10` (menambah bias, halusinasi, tiruan palsu, ketergantungan) | U dan tambahan |
| Daftar "sudah bisa" | `SD6-2-M14` | Tidak dipakai; kode `SD6-2-...` ke `SMP7-1-...` belum disamakan | C ringan |
| Pseudocode, teks | Tidak ada di SD | `SMP8-1-M1`, `SMP8-2-M1` sampai `M9` | B (baru di SMP) |

Kesimpulan: satu celah yang menentukan dan tidak diakui kedua silabus.
`smp-coding` mengasumsikan murid mengenal blok, perulangan, dan percabangan;
`sd-coding` hanya menjamin urutan instruksi dengan simbol di jalur inti, dan
menyerahkan sisanya ke kelas 2-4 yang opsional. Maka murid yang hanya mengikuti
kelas 5-6 masuk SMP tanpa ketiganya, dan `SMP7-1-M5` bukan tinjauan baginya.
`SMP7-1-M1` dan `SMP7-1-M2` (tanpa layar) benar-benar dapat dipadatkan;
`SMP7-1-M3` sampai `M5` serta `SMP7-1-M8`, `M9` tidak dapat dipadatkan bagi siapa
pun karena Scratch tidak diajarkan di SD.

### 5.3 Rekomendasi

| Rekomendasi | Label | Dasar |
| --- | --- | --- |
| `smp-coding` tidak mengasumsikan blok; hanya minggu tanpa layar yang dipadatkan; `SMP7-1-M1` menjadi pengamatan awal; murid yang mengenal konsepnya tanpa layar mengerjakan `SMP7-1-M3..M5` sebagai penerjemahan ke blok | M | Efek keahlian terbalik (Kalyuga dkk., 2003); pertukaran blok dan teks (Weintrop dan Wilensky, 2017) |
| `sd-coding` 7.2 menyatakan apa yang tidak dijamin kelas 5-6 dan menunjuk minggu opsional tempat perulangan dan percabangan diajarkan | M | Keadaan nyata silabus |
| Tuntutan `SMP9-2-M9` dan `SMP9-2-M10` dinaikkan bagi murid yang sudah melatih "mesin kartu" di SD (tanpa mengubah rencana minggu), bukan mengulang yang sama | M | Latihan berjarak dengan peningkatan kesulitan (ilmu belajar 3.2 dan 3.9) |
| Pilihan lanjutan, bila pemilik ingin murid inti masuk SMP dengan konsep dasar: `sd-coding` menambah perulangan dan percabangan tanpa layar di kelas 6 (mengubah rencana minggu); diajukan sebagai opsi 2 pada pertanyaan K2, bukan sebagai rekomendasi | M | Sinha dan Kapur (2021) mendukung contoh lebih dulu untuk usia SD |

### 5.4 Teks usulan pengganti

**`docs/programs/sd-coding/silabus.md`, bagian 7.2**: sudah termasuk pada
blok bagian 7 di bagian 4.4 (satu blok untuk seluruh bagian 7).

**`docs/programs/smp-coding/silabus.md`, bagian 5.1 dan 5.2** (dari
`### 5.1 Dari SD` sampai sebelum `### 5.3 Ke OSN`). Bagian 5.1 tetap satu
paragraf (parser membaca paragraf pertama saja); tabel 5.2 tetap tiga kolom
dan enam baris, kode minggu SMP di kolom pertama dicatat sebagai `smpWeeks`.
Baris 1 tabel 5.2 menggantikan pemetaan lama (lihat bagian 6.2, butir terakhir).

````markdown
### 5.1 Dari SD (`sd-coding`)

Program `sd-coding` (v1.0.1, disetujui pemilik pada 2026-11-19) sudah dibaca. Asumsi `[asumsi]`: murid kelas 7 berasal dari SD dengan latar yang berbeda-beda; `sd-coding` kelas 1-4 opsional dan kelas 5-6 pilihan, dan tidak mengajarkan sintaks pemrograman, sehingga murid dapat belum mengenal blok, perulangan, ataupun percabangan (`sd-coding` bagian 7.2). Karena itu `SMP7-1-M1` dipakai guru sebagai pengamatan awal (tugas tanpa layar, ceklis "terlihat" dan "belum terlihat", tanpa tes dan tanpa nilai angka, daftar "sudah bisa" dari `SD6-2-M14` sebagai bahan bila ada); `SMP7-1-M1` dan `SMP7-1-M2` (tanpa layar) boleh dipadatkan bagi murid yang terlihat menguasainya, yang lalu mengerjakan tugas tambahan yang disiapkan guru; `SMP7-1-M3` sampai `SMP7-1-M5` (Scratch, termasuk perulangan) dan `SMP7-1-M8` sampai `SMP7-1-M9` (percabangan, variabel) tidak dipadatkan bagi siapa pun karena Scratch tidak diajarkan di SD; murid yang sudah mengenal konsepnya tanpa layar mengerjakannya sebagai penerjemahan ke blok. Kegiatan KA kelas 9 (`SMP9-2-M8` sampai `SMP9-2-M10`) beririsan dengan KA kelas 5-6 SD (`SD6-2-M4`) dan memakai tuntutan lebih tinggi untuk murid yang sudah mengikutinya, tanpa mengubah rencana minggu. Penyelarasan kode `SD6-2-...` ke `SMP7-1-...` dilakukan dengan revisi ini; dasar `[asumsi]`: efek keahlian terbalik (`docs/riset/ilmu-belajar-kognitif.md` bagian 3.4).

### 5.2 Ke SMA (`sma-coding`)

| Dari SMP | Ke sma-coding | Catatan |
| --- | --- | --- |
| Sistem komputer, jaringan, keamanan akun, dan dokumen: `SMP7-2-M2`, `SMP7-2-M3`, `SMP7-2-M10`, `SMP7-2-M12`, `SMP8-1-M6`, `SMP8-1-M7`, `SMP8-1-M12`, `SMP8-2-M11`, `SMP8-2-M12` | Blok fondasi kelas X (`FND-X1-M1..M7`), yang membuka tanpa mensyaratkan bahasa pemrograman | Tumpang tindih nyata (mis. `SMP7-2-M10` dan `FND-X1-M1`; `SMP8-2-M11` dan `FND-X1-M6`), tetapi fondasi tetap kelas bersama (`sma-coding` bagian 9.1); murid dengan latar ini diamati di awal fondasi dan diberi tugas pendalaman. Murid SMP tanpa mapel KKA tetap diterima di fondasi. Baris ini menggantikan pemetaan blok kelas 7 ke fondasi pada v1.1.1, yang tidak tepat karena fondasi tidak memuat pemrograman. |
| Python kelas 8-9 (pengayaan di luar CP Fase D): `SMP8-2-M2`, `SMP8-2-M9` | Jalur D (AI dan analisis data) memakai Orange lalu Python | Python menjadi bahasa pertama bagi murid yang masuk D; murid tanpa pengayaan Python tetap dapat masuk. `D-XI1-M2` dan `D-XI1-M3` mengajarkan Python dari awal, sehingga murid berlatar Python memadatkannya lewat soal setengah jadi. |
| Logika, percabangan, perulangan, fungsi, daftar: `SMP7-1-M5`, `SMP7-1-M8`, `SMP8-2-M4`, `SMP8-2-M5`, `SMP8-2-M9` | Jalur A (C++) dan jalur B (JS/TS) | Konsep yang sama; sintaks baru. Jalur A butuh tipe statis dan kompilasi yang tidak diajarkan di SMP. `A-X1-M9` sampai `A-X1-M12` dan `B-X1-M9` sampai `B-X1-M12` mengajar dari awal tanpa mengandaikan SMP; murid berlatar teks memakai tugas baca-dan-prediksi dan soal setengah jadi sebelum menulis dari halaman kosong. |
| Simulator MakeCode kelas 8: `SMP8-1-M9`, `SMP8-1-M10`, `SMP8-1-M11` | Jalur C (IoT dan robotika, C++ gaya Arduino, ESP32) | Konsep masukan dan keluaran perangkat sudah dikenal. |
| Literasi dan etika KA kelas 9 (`DK-EA-b`, `c`, `e`, `f`, `g`) | Jalur D | Fondasi sebelum alat AI. |
| `SMP9-2-M11` (membaca kode lain) | Jalur A, B | Pengantar, bukan prasyarat. |
````

### 5.5 Dampak

| Hal | Perubahan |
| --- | --- |
| Versi | `sd-coding` **1.1.0** (blok yang sama dengan pasangan 1); `smp-coding` 1.1.1 ke **1.2.0 (minor)**. |
| Data | `data/smp-coding/bridge.json` (`fromSd.text`, `toSma[0..4]`, `smpWeeks` baris baru) dan `syllabusVersion` di ketujuh berkas; `data/sd-coding/bridges.json`. |
| Parser, skema, audit | Tidak berubah. Audit `smp-corpus-audit.ts` memeriksa `smpWeeks` ada di `weeks.json`; hitungan enam baris dipertahankan. |

## 6. Pasangan 3: `smp-coding` dan `sma-coding`

### 6.1 Keadaan sekarang

- `smp-coding` bagian 5.2 (v1.1.1): enam baris dari SMP ke `sma-coding` (blok
  kelas 7 dan pemecahan masalah ke `FND-X1-M1..M7`; Python ke jalur D;
  logika, percabangan, perulangan, fungsi, daftar ke jalur A dan B; MakeCode
  ke jalur C; literasi KA kelas 9 ke jalur D; `SMP9-2-M11` ke jalur A dan B).
  Cermin: `data/smp-coding/bridge.json` (`toSma`).
- `sma-coding` (v1.3.0): **tidak punya bagian jembatan dari SMP**. Pencarian
  teks pada `silabus.md` tidak menemukan SMP sebagai prasyarat; satu-satunya
  bagian jembatan, bagian 5, menuju OSN. Blok fondasi `FND-X1-M1..M7` (bagian
  3.0) membuka kelas X "bersama lintas jalur" (keputusan pemilik bagian 9.1,
  nomor Q2) tanpa menyebut asumsi latar.
- Keluaran SMP nyata: tiga tahun (84 minggu) dari Scratch (kelas 7) lewat
  MakeCode dan Python pengayaan (kelas 8-9) ke proyek, literasi AI, dan
  `SMP9-2-M11` (membaca kode lain); diakhiri `SMP9-2-M13` (portofolio berkas
  milik murid) dan `SMP9-2-M14` (asesmen akhir).

### 6.2 Analisis kecocokan

| Butir | Keluaran `smp-coding` | Rencana `sma-coding` kelas X | Status |
| --- | --- | --- | --- |
| Masukan-proses-keluaran | `SMP7-2-M10` | `FND-X1-M1` | U |
| Biner, teks dan gambar sebagai data | `SMP7-2-M2`, `SMP7-2-M3` (pengayaan) | `FND-X1-M3` | U (di SMP hanya pengayaan) |
| Jaringan | `SMP8-1-M12` (konsep) | `FND-X1-M4`, `FND-X1-M5` (konsep dan diagnosis) | U untuk konsep; diagnosis baru |
| Perangkat keras, sistem operasi, berkas | Tidak ada minggu SMP | `FND-X1-M1` (komponen, spesifikasi), `FND-X1-M2` (sistem operasi, berkas) | B (baru bagi murid SMP) |
| Lisensi dan atribusi | `SMP7-1-M12`, `SMP9-1-M6` | `FND-X1-M2`, `FND-X1-M6` | U |
| Kata sandi, privasi, keamanan akun | `SMP8-2-M11`, `SMP8-2-M12` | `FND-X1-M6` | U yang disengaja (keamanan, kebijakan AI kelas) |
| Lembar kerja, grafik, laporan | `SMP8-1-M6`, `SMP8-1-M7`, `SMP7-2-M12` | `FND-X1-M7` | U |
| Variabel, percabangan, perulangan, fungsi, daftar | `SMP7-1-M5`, `SMP7-1-M8`, `SMP7-1-M9`, `SMP8-2-M2` sampai `M9` | `A-X1-M9` sampai `M12`, `B-X1-M9` sampai `M12` (dari nol, bahasa baru) | U; bahasa dan tipe statis baru |
| Python | `SMP8-2-M1` sampai `M9` (pengayaan) | Jalur D: `D-XI1-M2`, `D-XI1-M3` (Python I dan II dari awal) | U |
| Simulator perangkat | `SMP8-1-M9` sampai `M11` | Jalur C: `C-X1-M8` sampai `M12` (papan, bukan simulator) | T |
| Literasi dan etika KA | `SMP9-2-M8` sampai `M10` | Jalur D: `D-X1-M8` sampai `M10`, `D-X2-M2`, `D-X2-M3` | U dan pendalaman |
| Kebijakan AI | SMP: demonstrasi guru, tanpa akun murid (7.1) | SMA: bebas dengan etika (7.4) | C ringan: lompatan kebijakan tanpa gerbang kesiapan |
| Asumsi latar di SMA | Tidak ada | Tidak ada; SMP 5.2 menulis sepihak | C |
| Rujukan SMP 5.2 baris 1 | "Blok kelas 7 dan pemecahan masalah" ke `FND-X1-M1..M7` | Fondasi tidak memuat pemrograman: Scratch kelas 7 beririsan dengan `A-X1-M8..M12` dan `B-X1-M8..M12`, bukan dengan fondasi | C (rujukan salah) |

Kesimpulan: tidak ada celah kemampuan, karena SMA mengajar dari nol. Ada
pengulangan di setiap minggu fondasi yang punya padanan di SMP (yang tanpa
padanan: sistem operasi dan berkas, diagnosis jaringan, komponen perangkat
keras), dan pengulangan seluruh dasar pemrograman pada `A-X1-M9..M12` dan
`B-X1-M9..M12`. Keputusan pemilik 9.1 (kelas bersama) membatasi pilihan:
mengurangi jam fondasi bagi murid berpengalaman berarti membalik keputusan itu
(opsi 3 pada pertanyaan K3).

### 6.3 Rekomendasi

| Rekomendasi | Label | Dasar |
| --- | --- | --- |
| Subbagian baru di `sma-coding` yang menyatakan tidak ada prasyarat SMP, memetakan irisan minggu, dan mengatur pengamatan awal di `FND-X1-M1` dengan tugas pendalaman di kelas yang sama | M | Kalyuga dkk. (2003); keputusan pemilik 9.1 |
| Murid berlatar Python memakai tugas baca-dan-prediksi serta soal setengah jadi di `A-X1-M9..M12` dan `B-X1-M9..M12` sebelum menulis dari halaman kosong; tugas ditandai "tanpa AI" | K untuk usia 11-14 (PRIMM), M untuk kelas X | Sentance dkk. (2019); Ericson dkk. (2017) (efisiensi Parsons, belajar sama) |
| `SMP9-2-M11` (membaca kode C++ dan pseudocode) dipertahankan sebagai pengantar, bukan prasyarat; tidak dinaikkan jadi syarat | M | Sorva (2013); Lister dkk. (2004) |
| Portofolio `SMP9-2-M13` boleh dibawa murid ke guru SMA sebagai bahan; bukan syarat, tidak disimpan di repositori | M | ADR-0004 |
| Koreksi baris 1 `smp-coding` 5.2 | (koreksi rujukan) | Pembacaan minggu |

### 6.4 Teks usulan pengganti

**`docs/programs/smp-coding/silabus.md`, bagian 5.2**: ada pada blok di
bagian 5.4 (satu blok bersama bagian 5.1).

**`docs/programs/sma-coding/silabus.md`, subbagian baru** disisipkan di
bagian 3.0, setelah subbagian "Padanan nomor minggu kelas X: v1.0 ke v1.1" dan
sebelum `### 3.1 Jalur A`. Tabel di dalamnya sengaja **tidak** diawali kode
minggu atau `FND-` pada kolom pertama agar tidak terbaca sebagai baris minggu
oleh parser fidelity; hasil uji salinan: lolos dan tidak ada data berubah
(selain `syllabusVersion`).

````markdown
#### Kemampuan masuk dari SMP dan penempatan di blok fondasi (v1.4)

Silabus ini tidak mensyaratkan `smp-coding`, mata pelajaran Koding dan KA, ataupun Informatika SMP tertentu: murid kelas X berasal dari SMP dengan bentuk program yang berbeda-beda (`smp-coding` bagian 2) `[asumsi]`. Blok fondasi dan minggu jalur kelas X semester 1 mengajar dari awal, sehingga murid dengan latar SMP yang kuat mengulang sebagian isinya. Pengulangan itu diatur, bukan dibiarkan: fondasi tetap kelas bersama lintas jalur (keputusan pemilik, bagian 9.1), dan murid yang sudah menguasai suatu minggu mengerjakan tugas pendalaman di dalam kelas yang sama, bukan keluar dari kelas.

| Asal di SMP (`smp-coding`) | Minggu silabus ini yang beririsan | Perlakuan di dalam kelas bersama `[asumsi]` |
| --- | --- | --- |
| `SMP7-2-M10` (komputer sebagai sistem: masukan, proses, keluaran) | `FND-X1-M1` | Murid yang terlihat menguasainya menjelaskan siklus kepada teman dan membaca spesifikasi komputer lab yang lebih rinci. |
| `SMP7-2-M2`, `SMP7-2-M3` (biner, teks dan gambar sebagai data; keduanya pengayaan di SMP) | `FND-X1-M3` | Tugas pendalaman: heksadesimal dan kode karakter tanpa lembar bantu. |
| `SMP8-1-M12` (jaringan lokal, ponsel, dan internet) | `FND-X1-M4`, `FND-X1-M5` | Tugas pendalaman: diagnosis tiga skenario gangguan tanpa petunjuk urutan. |
| `SMP8-2-M11`, `SMP8-2-M12` (kata sandi, akun, informasi publik dan privat) | `FND-X1-M6` | Tidak dipadatkan: keamanan akun dan kebijakan AI kelas dilatih bagi semua murid. |
| `SMP8-1-M6`, `SMP8-1-M7`, `SMP7-2-M12` (lembar kerja, grafik, laporan) | `FND-X1-M7` | Tugas pendalaman: rumus kondisi dan grafik dari data sintetis yang lebih besar. |
| `SMP7-1-M12`, `SMP9-1-M6` (atribusi, izin, lisensi data terbuka) | `FND-X1-M2` | Murid memberi atribusi dan memilih lisensi pada karya sendiri. |
| `SMP8-2-M2` sampai `SMP8-2-M9` (Python: variabel, percabangan, perulangan, daftar, fungsi) | `A-X1-M9` sampai `A-X1-M12`, `B-X1-M9` sampai `B-X1-M12` | Murid berlatar teks memakai tugas baca-dan-prediksi dan soal setengah jadi, lalu menulis dari halaman kosong; sintaks C++ atau JavaScript tetap dipelajari. |

Pengamatan awal: `FND-X1-M1` memuat tugas awal singkat per topik fondasi (sekitar sepuluh menit `[asumsi]`, tanpa nilai angka dan tanpa catatan di repositori ini) dan ceklis "terlihat" dan "belum terlihat" milik guru, yang menentukan murid mana mengerjakan tugas pendalaman di minggu fondasi tertentu. Murid yang memiliki portofolio `SMP9-2-M13` boleh membawanya sebagai bahan bagi guru; portofolio itu milik murid, bukan syarat, dan tidak disimpan di repositori ini. Kebijakan AI bagian 7.4 berlaku sama bagi semua murid; tugas baca-dan-prediksi ditandai guru "tanpa AI" karena tujuannya melatih membaca dan menelusuri kode. Dasar `[asumsi]`: efek keahlian terbalik dan contoh yang dipudarkan (`docs/riset/ilmu-belajar-kognitif.md` bagian 3.4) serta urutan baca-prediksi-selidiki sebelum menulis (bagian 6.3 riset yang sama).
````

### 6.5 Dampak

| Hal | Perubahan |
| --- | --- |
| Versi | `smp-coding` **1.2.0** (blok yang sama dengan pasangan 2); `sma-coding` 1.3.0 ke **1.4.0 (minor)**. |
| Data | `data/smp-coding/bridge.json`; `syllabusVersion` di berkas korpus `sma-coding`. Subbagian SMA tidak dicerminkan di data (lihat pertanyaan K7 untuk berkas baru `data/sma-coding/smp-bridge.json`). |
| Parser, skema, audit | Tidak berubah untuk bentuk teks di atas. Bila K7 memilih pengodean: skema baru `src/schema/sma-smp-bridge.ts`, perluasan `src/cli/fidelity/sma-coding.ts` (`SMA_DATA_FILES`), `src/domain/sma-corpus-audit.ts`, daftar berkas di `src/cli/program-registry.ts`. |
| Uji | `tests/integration/cli-sma-plan.test.ts` mengunci versi 1.3.0 pada keluaran `osn plan` dan `osn render lembar-siswa`. |

## 7. Pasangan 4: `sma-coding` dan `kuliah-coding`

### 7.1 Keadaan sekarang

- `kuliah-coding` bagian 5.1 (v1.1.1): lima baris dari SMA ke mata kuliah
  `KUL-*`: jalur A ke `KUL-I-101`, `KUL-I-102`, `KUL-K-201`; jalur B ke
  `KUL-I-205`; jalur C, D, E ke `KUL-U-201`, `KUL-U-202` dan `KUL-I-303`,
  pengayaan; OSN ke `KUL-K-201`; blok fondasi ke `KUL-U-101` ("tumpang
  tindih berpikir komputasional"). Dasar: "pengakuan lewat rekognisi
  pembelajaran lampau (Pasal 14 ayat (3) huruf c); bukti berupa portofolio dan
  uji penempatan; tata cara ... `[belum terverifikasi]`." Cermin:
  `data/kuliah-coding/bridges.json` (`fromSma`).
- `sma-coding`: tidak merujuk kuliah. Peta jenjang (`README.md` bagian 3):
  "sepihak dari sisi kuliah; silabus SMA belum merujuknya."
- Keluaran SMA nyata: tiap jalur berakhir dengan proyek akhir dan portofolio
  (`A-XII2-M13`, `B-XII2-M13`, `C-XII2-M13`, `D-XII2-M13`, `E-XII2-M12`).
  Kebijakan AI SMA: bebas dengan etika (7.4), tanpa gerbang kesiapan.
- Asumsi masuk kuliah: tidak ada. `KUL-U-101` dan `KUL-I-101` berprasyarat
  "tidak ada"; hanya `KUL-K-201` menyebut jalur A SMA ("dengan seleksi").

### 7.2 Analisis kecocokan

| Butir | Keluaran `sma-coding` | Rencana `kuliah-coding` | Status |
| --- | --- | --- | --- |
| Dasar pemrograman C++ | Jalur A `A-X1-M9..M12`, `A-X2-M1..M3` | `KUL-I-101` C1 dan C2 (fungsi, larik) | U |
| Penunjuk, rujukan, memori | Tidak ada di jalur A (jalur C hanya `struct`, `C-XI1-M3`; penyangga) | `KUL-I-101` C2 | C |
| Debugging dengan alat | Menelusuri dengan mencetak nilai (`A-X2-M4`) | `KUL-I-101` C3 | C sebagian |
| Git | Hanya jalur B: `B-X2-M12`, `B-XI1-M12` | `KUL-I-101` C4, `KUL-U-101` C4 | C untuk jalur A, U untuk jalur B |
| Struktur data | `vector`, stack, queue, heap, DSU, graf (`A-X2-M6..M7`, `A-XI1-M10`, `A-XII1-M4`, `A-XI2-M5..M8`) | `KUL-I-102` C1 (list, stack, queue, pohon, heap, graf) | U |
| Daftar berantai, tabel hash | Tidak tercantum | `KUL-I-102` C1 | C |
| Greedy, DP, graf | `A-XI1-M5..M6`, `A-XI2-M1..M3`, `A-XII1-M1..M3` | `KUL-I-201` (prasyarat `KUL-I-102`, `KUL-I-103`) | U (tidak dipetakan di 5.1) |
| Pemrograman kompetitif | `A-XII2-M5..M8` (tanpa AI), rumpun OSN | `KUL-K-201` | U dan T |
| Web | Jalur B (HTTP, JSON, TypeScript, keamanan) | `KUL-I-205` (prasyarat `KUL-I-202`) | U sebagian; basis data tidak diajarkan di SMA: C |
| Python dan data | Jalur D `D-XI1-M2..M7`, `M10` | `KUL-U-101`, `KUL-U-102` C1 dan C2 | U (`KUL-U-102` tidak dipetakan di 5.1) |
| JSON dan HTTP, skrip | Jalur C `C-XI2` | `KUL-U-201` C2 | U |
| Sistem komputer, jaringan, keamanan dasar | `FND-X1-M1..M6` | `KUL-I-203`, `KUL-I-301`, `KUL-U-202` | U sebagian |
| Berpikir komputasional | `A-X1-M8` (algoritma dan pseudocode); bukan di fondasi | `KUL-U-101` C1 | U bagi jalur A dan B; baris 5 di 5.1 salah memakainya untuk fondasi |
| Kebijakan AI | SMA 7.4: bebas dengan etika | Kuliah 6.3 dan 6.4: Kuning pada mata kuliah dasar dengan gerbang kesiapan | C ringan: lulusan SMA perlu gerbang |
| Bahasa | Jalur A C++, B JS/TS, D Python | Jalur I C++ (`KUL-I-101`), jalur U Python | U sebagian, bahasa berbeda |

Kesimpulan: kuliah tidak mengasumsikan SMA, jadi tidak ada asumsi yang gagal;
yang ada adalah (1) pengulangan besar bagi lulusan jalur A, (2) tiga celah
yang membuat pengakuan **per mata kuliah utuh** tidak aman (Git, penunjuk atau
rujukan, daftar berantai dan tabel hash untuk jalur A; basis data untuk jalur
B), (3) dua pemetaan yang hilang (jalur A ke `KUL-I-201`; jalur D ke
`KUL-U-102`) dan satu yang salah (fondasi ke `KUL-U-101`), dan (4) lompatan
kebijakan AI.

### 7.3 Rekomendasi

| Rekomendasi | Label | Dasar |
| --- | --- | --- |
| Pengakuan per CPMK, bukan per mata kuliah; mata kuliah tetap diikuti untuk CPMK yang belum terbukti | M | Keahlian per topik (ilmu belajar 7); Kalyuga dkk. (2003) |
| Bukti: portofolio akhir jalur, riwayat Git, ujian praktik tanpa AI, wawancara kode singkat | M | Finnie-Ansley dkk. (2022): tugas rumah tidak cukup; Lister dkk. (2004): membaca dan menelusuri kode; AI 6 (asesmen tahan AI, `[belum terverifikasi]` apakah mengungkap pemakaian AI) |
| Gerbang kesiapan (menelusuri, menulis uji yang gagal, menjelaskan) lebih dulu bagi lulusan SMA yang mulai di tingkat Kuning | M | Bastani dkk. (2025); Prather dkk. (2024); AI 6 |
| Tambah `KUL-I-201` untuk jalur A dan `KUL-U-102` untuk jalur D; koreksi baris fondasi | (koreksi rujukan) | Pembacaan minggu |
| Bahasa: jalur A (C++) menyambung `KUL-I-101`; murid jalur A di jalur U atau B/D di jalur I menerima bahasa baru sebagai transisi, bukan dianggap pengulangan penuh | M | Pertukaran bahasa; tidak ada studi untuk transisi C++ ke Python |

### 7.4 Teks usulan pengganti

**`docs/programs/kuliah-coding/silabus.md`, bagian 5** (seluruh bagian, dari
`## 5. Jembatan` sampai sebelum `## 6.`; bagian 5.2 hanya mengubah baris
dewasa-coding). Tabel 5.1 tetap tiga kolom dan lima baris; kolom "Ke"
sengaja ditulis tanpa tanda kutip balik pada kode mata kuliah agar sama
dengan data yang ada (`toCourses` dibaca dari teks). Bagian 5.2 sengaja
menyebut jalur `PRO` dan bagian 6.2 silabus dewasa, yaitu hasil pasangan 5.

````markdown
## 5. Jembatan

### 5.1 Dari SMA

Pengakuan atas pembelajaran di SMA tidak otomatis dan tidak berlaku untuk mata kuliah utuh: bukti yang dibawa mahasiswa diperiksa per CPMK. Bukti yang tersedia di setiap jalur `sma-coding` adalah portofolio akhir (`A-XII2-M13`, `B-XII2-M13`, `C-XII2-M13`, `D-XII2-M13`, `E-XII2-M12`) dan riwayat Git; pemeriksaannya lewat uji penempatan berupa ujian praktik tanpa AI (Merah, bagian 6.3), wawancara kode singkat, dan gerbang kesiapan (bagian 6.4). Kebijakan AI SMA bebas dengan etika (`sma-coding` bagian 7.4) sedangkan mata kuliah dasar di sini Kuning, sehingga gerbang kesiapan dikerjakan lebih dulu pada mahasiswa berlatar SMA. Tata cara pengakuan ditetapkan perguruan tinggi `[belum terverifikasi]`; yang dirancang di sini hanya isi bukti dan peta CPMK `[asumsi]`.

| Dari | Ke | Dasar dan syarat |
| --- | --- | --- |
| sma-coding jalur A (C++ algoritmik) | KUL-I-101 (sebagian), KUL-I-102 (sebagian), KUL-I-201 (sebagian), KUL-K-201 | Pengakuan per CPMK, bukan per mata kuliah. `KUL-I-101`: C1 dan fungsi serta larik pada C2 dikenali (`A-X1-M9` sampai `A-X1-M12`, `A-X2-M1` sampai `A-X2-M3`); penunjuk atau rujukan, debugging dengan alat, dan Git tidak diajarkan di jalur A (Git hanya di `B-X2-M12` dan `B-XI1-M12`), sehingga C3 dan C4 serta bagian penunjuk pada C2 tetap dipelajari. `KUL-I-102`: struktur linear, antrian prioritas, graf, dan DSU dikenali (`A-X2-M6`, `A-X2-M7`, `A-XI1-M10`, `A-XI2-M5` sampai `A-XI2-M8`, `A-XII1-M4`); daftar berantai dan tabel hash tidak tercantum di jalur A. `KUL-I-201`: greedy, DP, dan graf dikenali (`A-XI1-M5`, `A-XI1-M6`, `A-XI2-M1` sampai `A-XI2-M3`) tetapi prasyaratnya `KUL-I-102` dan `KUL-I-103`. `KUL-K-201`: topik sama dengan rumpun OSN di `data/osn/topic-families.json` (mis. struktur data, graph-tree, search-sort, rekursi), dengan seleksi `[asumsi]`. C++ sama dengan `KUL-I-101`; berbeda dengan Python di jalur U. |
| sma-coding jalur B (web, JS/TS) | KUL-I-205 (sebagian) | Portofolio web; bahasa sama (TypeScript) `[asumsi]`. Server HTTP, API JSON, validasi, dan keamanan aplikasi (`B-XI2-M1` sampai `B-XI2-M3`, `B-XI2-M10`) dikenali; basis data tidak diajarkan di jalur B padahal prasyarat `KUL-I-205` adalah `KUL-I-202`, sehingga pengakuan hanya atas CPMK yang dapat berdiri sendiri. |
| sma-coding jalur C (IoT), D (AI), E (kuantum) | KUL-U-201 (C, sebagian), KUL-U-102 (D, sebagian), KUL-U-202 dan KUL-I-303 (D, sebagian), pengayaan (E) | Jalur D dan E di sma-coding adalah pengayaan di luar CP; pengakuan di kuliah tidak otomatis `[asumsi]`. Jalur C: JSON dan HTTP (`C-XI2`) beririsan dengan C2 `KUL-U-201`. Jalur D: Python, pembersihan data, statistik deskriptif, dan evaluasi (`D-XI1-M2` sampai `D-XI1-M7`, `D-XI1-M10`) beririsan dengan C1 sampai C2 `KUL-U-102`; D memakai Python sedangkan jalur I memakai C++. |
| Pembinaan OSN Informatika (korpus `data/osn/`) | KUL-K-201 | Selaras topik; peserta OSN tidak otomatis memenuhi prasyarat, ada uji penempatan `[asumsi]`. |
| Blok fondasi kelas X sma-coding (FND-X1-M1..M7) | KUL-I-203 (sebagian), KUL-I-301 (sebagian), KUL-U-202 (sebagian) | Fondasi memuat sistem komputer, jaringan, dan keamanan dasar, bukan berpikir komputasional: irisannya dengan `KUL-I-203` (representasi data, masukan-proses-keluaran, sistem operasi; `FND-X1-M1` sampai `FND-X1-M3`), `KUL-I-301` (konsep jaringan dan keamanan dasar; `FND-X1-M4` sampai `FND-X1-M6`), dan `KUL-U-202` (privasi dan kebijakan AI; `FND-X1-M6`). Tidak ada padanan di jalur U untuk fondasi selain `KUL-U-202`; prodi menentukan pengakuan. Baris ini menggantikan pemetaan ke `KUL-U-101` pada v1.1.1, yang tidak tepat. |

### 5.2 Ke dunia kerja

| Ke | Bagaimana | Catatan |
| --- | --- | --- |
| Magang | Pasal 16 ayat (1) memasukkan magang sebagai bentuk pemenuhan beban belajar; Pasal 18 ayat (4) dan (7) memberi dasar pemenuhan sebagian beban di luar program studi | Durasi dan beban ditetapkan perguruan tinggi (Pasal 18 ayat (6)). Magang bukan mata kuliah draf ini `[asumsi]`. |
| Program dewasa-coding (jalur `PRO`; silabus v1.2, issue #131) | Portofolio proyek `KUL-U-301` dan `KUL-I-401` menjadi bukti masuk; modul `DW-PRO-*` yang dapat dilewati atau dipadatkan ditentukan per profil (jalur U, I, K) di `dewasa-coding` bagian 6.2 | Bukan alih kredit dan bukan sertifikat: pengakuan terjadi di program dewasa-coding, atas dasar bukti yang diperiksa, bukan transkrip. Jalur `PKJ` dan `BIS` belum dirancang `[asumsi]`. |
| Sertifikasi profesi | Pasal 7 huruf c menyebut "sertifikat profesi" sebagai salah satu tujuan CPL | Skema sertifikasi tertentu (mis. SKKNI) `[belum terverifikasi]`; tidak dipetakan. |
| Pendidikan lanjutan | Pasal 21 mengatur percepatan pembelajaran bagi mahasiswa berkemampuan luar biasa (dibaca sebagian) | Tidak dikembangkan di draf ini. |
````

### 7.5 Dampak

| Hal | Perubahan |
| --- | --- |
| Versi | `kuliah-coding` 1.1.1 ke **1.2.0 (minor)**: aturan pengakuan per CPMK dan koreksi pemetaan. Dua penanda `[belum terverifikasi]` (tata cara perguruan tinggi) tidak berubah. |
| Data | `data/kuliah-coding/bridges.json` (`fromSma` lima baris dengan `toCourses` baru, `toWork[1]`) dan `syllabusVersion` di keenam berkas; `data/programs.json`. |
| Parser, skema, audit | Tidak berubah (`KUL_EXPECTED_COUNTS.fromSma` 5 dan `toWork` 4 dipertahankan). |

## 8. Pasangan 5: `kuliah-coding` ke `dewasa-coding` jalur `PRO`

### 8.1 Keadaan sekarang

- `kuliah-coding` bagian 5.2 (v1.1.1): "Portofolio proyek KUL-U-301 dan
  KUL-I-401 menjadi bahan masuk; tamatan jalur U dapat melanjutkan ke jalur
  kerja di dewasa-coding ... Rujukan silang ke silabus dewasa-coding belum
  dirancang; tidak diklaim sekarang." Cermin: `data/kuliah-coding/bridges.json`
  (`toWork[1]`).
- `dewasa-coding` bagian 6.1 (v1.1.1), baris kuliah-coding: "**Belum dapat
  dirancang** pada revisi ini: jembatan ditunda menurut keputusan 12.7";
  keputusan 12.7: "opsi A, ditunda sampai draf kuliah-coding (#130) ada (dipilih)";
  12.8: pengerjaan lanjutan (skema, data, registri, modul `content/`).
  Cermin: `data/dewasa-coding/bridges.json` (`bridge-4`, `status: ditunda`).
- Syarat penundaan terpenuhi: kuliah-coding v1.1.1 disetujui dan terdaftar
  (2026-11-19). Teks 12.8 sendiri sebagian basi: skema `src/schema/dw-*.ts`,
  `data/dewasa-coding/` (tujuh berkas), registri, dan pemeriksa fidelity sudah ada;
  yang belum ada hanya `content/dewasa-coding/`.
- Asumsi masuk `PRO` (bagian 5): `DW-FND-M1`, "logika dasar dan kemampuan
  membaca Bahasa Inggris teknis"; "peserta dari `PKJ` atau sma-coding jalur A/B
  dapat melewati sebagian modul". Jalur `PRO` 136 jam: `DW-FND-M1` 8 jam dan
  12 modul 10 jam ditambah `DW-PRO-M13` 8 jam (urutan belajar: M1 sampai M5,
  M13, lalu M6 sampai M12).

### 8.2 Siapa masuk ke modul mana

Tiga profil mewakili lulusan atau mahasiswa `kuliah-coding` yang beralih ke
`PRO` (alih karier, atau menjadi pengembang dari bidang lain). Jalur K hanya
membuka pengakuan pada `DW-PRO-M3` dan umumnya menyertai jalur I atau U
(prasyarat `KUL-K-201`).

| Profil | Selesai | Masuk ke | Alasan |
| --- | --- | --- | --- |
| `I-lengkap` | `KUL-I-101` sampai `KUL-I-205`, `KUL-I-301`, `KUL-I-302`, `KUL-I-401` | `DW-FND-M1`, transisi ke Python (`DW-PRO-M2`), lalu `DW-PRO-M6` | OOP tidak ada di kuliah-coding; Python adalah bahasa inti `PRO` |
| `I-awal` | `KUL-I-101`, `KUL-I-102`, `KUL-I-103` | `DW-FND-M1`, `DW-PRO-M4` dan seterusnya (rekayasa, web, basis data) | Dasar saja; belum ada RPL, web, basis data |
| `U-lengkap` | `KUL-U-101`, `KUL-U-102`, `KUL-U-201`, `KUL-U-202`, `KUL-U-301` | `DW-FND-M1`, `DW-PRO-M6` sampai `DW-PRO-M8`, `DW-PRO-M10` | Python sudah dikenal; objek, web, basis data, dan tinjau kode belum |

### 8.3 Pemetaan modul dan dampak pada jam

Status: **L** (lewati: bukti diperiksa singkat, perkiraan 1 jam), **P**
(padatkan: konsep dikenal tetapi bahasa atau alat berbeda, perkiraan
setengah jam modul), **W** (wajib: dikerjakan penuh). Semua angka jam adalah
perkiraan `[asumsi]` dan belum diuji. Aturan penetapan: **L** hanya bila
konsep **dan** alat tertulis di CPMK mata kuliah yang diselesaikan; **P**
bila konsep tertulis tetapi bahasa atau alat berbeda (C++ ke Python) atau akses
dari kode tidak dinyatakan; **W** bila tidak tertulis.

| Modul | Jam | Dasar di kuliah-coding | `I-lengkap` | `I-awal` | `U-lengkap` |
| --- | --- | --- | --- | --- | --- |
| `DW-PRO-M1` | 10 | `KUL-I-101` C4 dan `KUL-U-101` C4 (Git); baris perintah di `KUL-I-203` C3 | L | P | P |
| `DW-PRO-M2` | 10 | `KUL-U-101` C2 (Python); `KUL-I-101` C1 (konsep sama, C++) | P | P | L |
| `DW-PRO-M3` | 10 | `KUL-I-102`, `KUL-I-201`, `KUL-K-201`; `KUL-U-101` (list, dict, set) | L | P | P |
| `DW-PRO-M4` | 10 | `KUL-U-101` (modul, pustaka, pengujian dasar); `KUL-I-204` | P | W | P |
| `DW-PRO-M5` | 10 | `KUL-U-101` C3; `KUL-I-101` C3; `KUL-I-204` C2 | L | P | P |
| `DW-PRO-M13` | 8 | `KUL-I-204` C4, `KUL-I-401` C4, `KUL-I-301` C4; `KUL-U-202` C3 dan C5 | L | W | P |
| `DW-PRO-M6` | 10 | Tidak ada: kuliah-coding tidak memuat pemrograman berorientasi objek (celah paradigma bahasa, bagian 4.2 kuliah) | W | W | W |
| `DW-PRO-M7` | 10 | `KUL-I-202` C2 (SQL); akses dari kode tidak dinyatakan di CPMK | P | W | W |
| `DW-PRO-M8` | 10 | `KUL-I-205` C1 | L | W | W |
| `DW-PRO-M9` | 10 | `KUL-I-205` C2; `KUL-U-201` C2 (memakai API publik, bukan membuat) | L | W | P |
| `DW-PRO-M10` | 10 | `KUL-I-204` C2 dan C3; `KUL-I-401` | L | W | W |
| `DW-PRO-M11` | 10 | `KUL-I-203`, `KUL-I-302`; `KUL-U-201` C3 (penjadwalan dan log) | P | W | P |
| `DW-PRO-M12` | 10 | Tidak ada: proyek akhir dan bukti portofolio selalu dikerjakan | W | W | W |

| Profil | L | P | W | Jam modul `PRO` | Dengan `DW-FND-M1` (8) | Selisih terhadap 136 jam | Perkiraan minggu pada 5 jam per minggu |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Semua modul penuh (tanpa jembatan) | 0 | 0 | 13 | 128 | 136 | 0 | sekitar 27 |
| `I-lengkap` | 7 | 4 | 2 | 47 | 55 | 81 jam lebih sedikit (sekitar 60 persen) | sekitar 11 |
| `I-awal` | 0 | 4 | 9 | 108 | 116 | 20 jam lebih sedikit (sekitar 15 persen) | sekitar 23 |
| `U-lengkap` | 1 | 7 | 5 | 85 | 93 | 43 jam lebih sedikit (sekitar 32 persen) | sekitar 19 |

Catatan penghitungan: P = setengah jam modul (`DW-PRO-M13`: 4 jam),
L = 1 jam, W = jam penuh; jumlah dihitung dari kolom jam silabus (128 jam
modul dan 8 jam `DW-FND-M1`). `DW-FND-M1` dan `DW-PRO-M12` wajib bagi semua
profil, sehingga pengurangan jam tidak pernah menyentuh keduanya.

### 8.4 Analisis kecocokan dan celah

| Butir | Keluaran `kuliah-coding` | Rencana atau asumsi `PRO` | Status |
| --- | --- | --- | --- |
| Python dasar | `KUL-U-101` C2; jalur I memakai C++ | `DW-PRO-M2` (Python) | T untuk jalur U; U dan bahasa baru untuk jalur I |
| Struktur data dan algoritma | `KUL-I-102`, `KUL-I-201` | `DW-PRO-M3` | U |
| Git, uji, debugging | `KUL-I-101`, `KUL-I-204`, `KUL-U-101` | `DW-PRO-M1`, `DW-PRO-M5` | U |
| Rekayasa berbantuan AI | `KUL-I-204` C4 (3-4 minggu), `KUL-I-401` C4, `KUL-U-202` | `DW-PRO-M13` | U sebagian; gerbang kesiapan sama (kuliah 6.4; AI 6) |
| Pemrograman berorientasi objek | Tidak ada | `DW-PRO-M6` | C pada sisi kuliah |
| SQL dan basis data | `KUL-I-202` | `DW-PRO-M7` | U; akses dari kode tidak dinyatakan |
| Web dan API | `KUL-I-205` | `DW-PRO-M8`, `DW-PRO-M9` | U |
| Tinjau kode, integrasi, analisis statis | `KUL-I-204` C2 dan C3, `KUL-I-401` | `DW-PRO-M10` | U |
| Operasi dasar, log | `KUL-I-203`, `KUL-I-302`, `KUL-U-201` C3 | `DW-PRO-M11` | U sebagian |
| Keamanan, privasi, etika kerja | `KUL-U-202`, `KUL-I-305`; privasi di kuliah 8 | `DW-FND-M1` (kebijakan tempat kerja dan usaha) | U sebagian; kebijakan tempat kerja tidak ada di kuliah |
| Bukti | Portofolio `KUL-U-301`, `KUL-I-401`, riwayat Git; ujian praktik tanpa AI | Portofolio dan rubrik 8.1 | T |
| Dasar pengakuan | Dasar rekognisi yang dikutip `kuliah-coding` bagian 2.4 (Pasal 14 ayat (3) huruf c) berlaku di perguruan tinggi | Penyelenggara dewasa-coding tidak termasuk | C: wewenang penyelenggara `[belum terverifikasi]` |
| SKKNI | Tidak ada | Hanya judul unit; 34 dari 47 unit disentuh | Tidak berubah: melewati modul tidak menyatakan kompetensi unit |

### 8.5 Rekomendasi

| Rekomendasi | Label | Dasar |
| --- | --- | --- |
| Pengakuan per modul dengan tiga status, ditetapkan per topik (bukan per orang) | M | Efek keahlian terbalik; "pelajar dewasa pemula pada topik baru tetap pemula pada topik itu" (ilmu belajar 7; Kalyuga dkk., 2003) |
| Bukti = keluaran portofolio kuliah yang dinilai dengan rubrik 8.1 ditambah tugas praktik singkat tanpa AI; bukan nilai kuliah | M | Finnie-Ansley dkk. (2022); Lister dkk. (2004) |
| Gerbang kesiapan (menelusuri program pendek, menulis uji yang gagal bila kode salah, menjelaskan kode) sebelum `DW-PRO-M13` dilewati atau dipadatkan | M | AI 6; Shen dan Tamkin (2026) `[E]` (desain RCT, preprint); Bastani dkk. (2025) `[B]` (matematika) |
| `DW-FND-M1` dan `DW-PRO-M12` tetap wajib | M | Keputusan 12.1; keselamatan data dan kebijakan tempat kerja tidak ada di kuliah-coding |
| Ulasan berjarak atas keterampilan yang dilewati lewat proyek akhir `DW-PRO-M12`, bukan lewat kuis tambahan | K pada prinsipnya, M pada penerapan | Cepeda dkk. (2006); Roediger dan Karpicke (2006); Agarwal dkk. (2021) |
| Tidak menyimpan bukti, status, atau hasil pemeriksaan di repositori; peserta menyimpan sendiri daftar modul selesai | (aturan repositori) | ADR-0004; dewasa 8.1 |

### 8.6 Teks usulan pengganti

**`docs/programs/dewasa-coding/silabus.md`, bagian 6.1 dan 6.2 baru** (dari
`### 6.1 Jembatan dari program lain` sampai sebelum `## 7.`). Baris
kuliah-coding pada tabel 6.1 berubah, tabel tetap tiga kolom dan enam baris
(parser menetapkan `status` `dirancang` karena kalimat "Belum dapat
dirancang" hilang). Subbagian 6.2 baru berada di dalam bagian 6 (jalur
`PRS`) dan tidak dibaca parser; hasil uji salinan: lolos. Tabel 6.2 sengaja tidak
dicerminkan di data sampai pemilik memutuskan pengodean (pertanyaan K7).

````markdown
### 6.1 Jembatan dari program lain

| Asal | Tujuan | Catatan `[asumsi]` |
| --- | --- | --- |
| sma-coding jalur A (C++) | `PRO` | Dasar struktur data dan algoritma dari jalur A boleh menggantikan `DW-PRO-M3` setelah uji singkat; bahasa inti `PRO` tetap Python, sehingga M2 dan M4 diulang pada Python |
| sma-coding jalur B (Bun, TypeScript, `awcms-one`) | `PRO` modul M8, M9; `BIS` modul M4 | Lulusan jalur B boleh langsung memulai M8 setelah M1 |
| sma-coding jalur D (data, AI) | `PKJ` M3-M4, M6; `PRO` M3 | Pengolahan data dan etika AI sebagian sama |
| kuliah-coding (jalur U, I, K) | `PRO` (modul `DW-PRO-M1` sampai `DW-PRO-M13`) | Pengakuan per modul atas dasar bukti yang diperiksa, dengan tiga status (lewati, padatkan, wajib); `DW-FND-M1` dan `DW-PRO-M12` tetap wajib; rincian dan batas di bagian 6.2 |
| `PRS` | `PKJ`, `PRO`, `BIS` | Setelah `PRS-M6`, peserta memilih jalur lanjut |
| `PKJ` | `PRO` | `PKJ-M3` sampai M5 menggantikan sebagian `PRO-M2` |

### 6.2 Jembatan dari kuliah-coding ke `PRO` (rancangan v1.2)

Jembatan ini berlaku bagi mahasiswa atau lulusan `kuliah-coding` yang ingin beralih karier atau menjadi pengembang lewat jalur `PRO`. Ia **bukan alih kredit SKS dan bukan sertifikat**: pengakuan hanya berarti modul `PRO` tertentu tidak diulang penuh di program ini, atas dasar bukti yang diperiksa pada saat pendaftaran dan bukan transkrip. Dasar pengakuan di perguruan tinggi (Pasal 14 ayat (3) huruf c Permendiktisaintek 39/2025) mengatur mahasiswa di perguruan tinggi, bukan masuk ke program ini; wewenang penyelenggara mengakui modul `[belum terverifikasi]`. Pemetaan SKKNI tidak berubah: tetap hanya sampai judul unit, dan melewati modul tidak berarti peserta kompeten menurut unit itu (bagian 5.2).

Tiga profil masuk (cuplikan; profil lain dinilai per modul):

| Profil | Mata kuliah yang diselesaikan | Catatan |
| --- | --- | --- |
| `I-lengkap` | Jalur I inti: `KUL-I-101` sampai `KUL-I-205`, `KUL-I-301`, `KUL-I-302`, `KUL-I-401` | Paling banyak modul yang dapat dilewati; bahasa dasar C++, bukan Python |
| `I-awal` | `KUL-I-101`, `KUL-I-102`, `KUL-I-103` (semester 1-2) | Dasar saja; mulai dari modul rekayasa dan web |
| `U-lengkap` | Jalur U: `KUL-U-101`, `KUL-U-102`, `KUL-U-201`, `KUL-U-202`, `KUL-U-301` | Python sudah dikenal; web, basis data, objek, dan tinjau kode belum |

Jalur K tidak membuka pengakuan sendiri kecuali pada `DW-PRO-M3` (algoritma dan struktur data); mahasiswa jalur K umumnya mengambil jalur I atau U lebih dulu (prasyarat `KUL-K-201`).

Status modul: **L** (lewati: bukti diperiksa singkat, perkiraan 1 jam), **P** (padatkan: konsep dikenal tetapi bahasa atau alat berbeda, perkiraan setengah jam modul), **W** (wajib: dikerjakan penuh). Semua angka jam adalah perkiraan `[asumsi]`, bukan hasil uji coba.

| Modul | Jam | Dasar di kuliah-coding | `I-lengkap` | `I-awal` | `U-lengkap` |
| --- | --- | --- | --- | --- | --- |
| `DW-PRO-M1` | 10 | `KUL-I-101` C4 dan `KUL-U-101` C4 (Git); baris perintah di `KUL-I-203` C3 | L | P | P |
| `DW-PRO-M2` | 10 | `KUL-U-101` C2 (Python); `KUL-I-101` C1 (konsep sama, C++) | P | P | L |
| `DW-PRO-M3` | 10 | `KUL-I-102`, `KUL-I-201`, `KUL-K-201`; `KUL-U-101` (list, dict, set) | L | P | P |
| `DW-PRO-M4` | 10 | `KUL-U-101` (modul, pustaka, pengujian dasar); `KUL-I-204` | P | W | P |
| `DW-PRO-M5` | 10 | `KUL-U-101` C3; `KUL-I-101` C3; `KUL-I-204` C2 | L | P | P |
| `DW-PRO-M13` | 8 | `KUL-I-204` C4, `KUL-I-401` C4, `KUL-I-301` C4; `KUL-U-202` C3 dan C5 | L | W | P |
| `DW-PRO-M6` | 10 | Tidak ada: kuliah-coding tidak memuat pemrograman berorientasi objek (celah paradigma bahasa, bagian 4.2 kuliah) | W | W | W |
| `DW-PRO-M7` | 10 | `KUL-I-202` C2 (SQL); akses dari kode tidak dinyatakan di CPMK | P | W | W |
| `DW-PRO-M8` | 10 | `KUL-I-205` C1 | L | W | W |
| `DW-PRO-M9` | 10 | `KUL-I-205` C2; `KUL-U-201` C2 (memakai API publik, bukan membuat) | L | W | P |
| `DW-PRO-M10` | 10 | `KUL-I-204` C2 dan C3; `KUL-I-401` | L | W | W |
| `DW-PRO-M11` | 10 | `KUL-I-203`, `KUL-I-302`; `KUL-U-201` C3 (penjadwalan dan log) | P | W | P |
| `DW-PRO-M12` | 10 | Tidak ada: proyek akhir dan bukti portofolio selalu dikerjakan | W | W | W |

Dampak pada jam jalur `PRO` (136 jam bila semua modul dikerjakan penuh: `DW-FND-M1` 8 jam dan 128 jam modul; diperkirakan dengan L = 1 jam dan P = setengah jam modul):

| Profil | L | P | W | Jam modul `PRO` | Jam dengan `DW-FND-M1` | Selisih terhadap 136 jam |
| --- | --- | --- | --- | --- | --- | --- |
| `I-lengkap` | 7 | 4 | 2 | 47 | 55 | 81 jam lebih sedikit |
| `I-awal` | 0 | 4 | 9 | 108 | 116 | 20 jam lebih sedikit |
| `U-lengkap` | 1 | 7 | 5 | 85 | 93 | 43 jam lebih sedikit |

Bukti dan pemeriksaan:

- Bukti tiap modul adalah keluaran portofolio kuliah (`KUL-U-301`, `KUL-I-401`, repositori dengan riwayat Git) yang dinilai dengan rubrik bagian 8.1 (ketepatan, keterbacaan, pengujian, dokumentasi, keamanan data), ditambah tugas praktik singkat tanpa AI per kelompok modul. Bukti tidak berupa nilai kuliah.
- `DW-PRO-M13` (rekayasa perangkat lunak berbantuan AI) hanya dilewati atau dipadatkan setelah **gerbang kesiapan**: peserta dapat menelusuri program pendek, menulis satu uji yang gagal bila kode salah, dan menjelaskan kode dengan kata sendiri. Gerbang ini sama dengan `kuliah-coding` bagian 6.4 dan menjadi dasar `DW-PRO-M5` sebelum `DW-PRO-M13`.
- Keadaan keahlian berlaku per topik, bukan per orang: peserta yang ahli dalam algoritma tetap pemula dalam web atau basis data, sehingga status L, P, dan W ditetapkan per modul. Keahlian yang sudah lama tidak dipakai diperiksa lewat tugas praktik, bukan lewat riwayat mata kuliah.
- `DW-FND-M1` (8 jam, keamanan, privasi, dan etika kerja) dan `DW-PRO-M12` (proyek akhir) tetap wajib bagi semua peserta (bagian 12.1); jalur U sudah punya `KUL-U-202`, tetapi kebijakan tempat kerja dan data usaha tidak ada di kuliah-coding.
- Data peserta, hasil pemeriksaan, dan status modul tidak disimpan di repositori ini (ADR-0004); peserta menyimpan daftar modul selesai sendiri (bagian 8.1).
````

**`docs/programs/dewasa-coding/silabus.md`, bagian 12.7 dan 12.8** (dari
`### 12.7 Jembatan dari kuliah-coding` sampai sebelum `### 12.9`). Teks
keputusan sengaja bertanda "usulan; menunggu pemilik": kata "(dipilih)" ditulis
hanya setelah pemilik menjawab di bagian 9 (pertanyaan K5).

````markdown
### 12.7 Jembatan dari kuliah-coding

**Status (diperbarui):** syarat penundaan keputusan sebelumnya terpenuhi: silabus `kuliah-coding` v1.1.1 disetujui dan terdaftar (2026-11-19, issue #130). Pemilik menginstruksikan agar jembatan mulai dirancang (2026-11-19). Rancangannya ada di bagian 6.1 (baris kuliah-coding) dan 6.2.

**Keputusan:** opsi A (usulan; menunggu pemilik): pengakuan per modul `PRO` dengan tiga status (lewati, padatkan, wajib) atas dasar bukti yang diperiksa.

| Opsi | Konsekuensi |
| --- | --- |
| **A. Pengakuan per modul `PRO` dengan status lewati, padatkan, wajib; `DW-FND-M1` dan `DW-PRO-M12` tetap wajib (usulan)** | jam jalur `PRO` turun sesuai profil (perkiraan 81, 43, dan 20 jam dari 136 pada tiga profil bagian 6.2); butuh pemeriksaan bukti per modul; wewenang penyelenggara mengakui modul `[belum terverifikasi]` |
| B. Jalur khusus lulusan kuliah (modul `PRO` lanjutan yang baru) | isi lebih sesuai lulusan; modul baru, jam baru, dan korpus yang lebih besar; melanggar bentuk satu program (12.1) bila terpisah |
| C. Hanya rekomendasi urutan tanpa pengurangan jam | tanpa risiko pengakuan; lulusan kuliah mengulang bahan yang sudah dikuasai (efek keahlian terbalik) |

### 12.8 Pengerjaan lanjutan

**Keputusan:** skema khusus per program (ADR-0008): skema `src/schema/dw-*.ts` (berjam, bukan mingguan), `data/dewasa-coding/` (tujuh berkas), entri registri, dan pemeriksa fidelity sudah ada. Yang tersisa, mengikuti urutan AGENTS.md (skema, data, domain, uji): (1) jembatan kuliah-coding (12.7): skema dan berkas data baru untuk tabel bagian 6.2, lalu uji; (2) modul `content/dewasa-coding/`, jalur `PKJ` dan `BIS` dikerjakan lebih dulu karena paling sedikit bergantung pada SKKNI dan alat berat, jalur `PRO` setelahnya.
````

### 8.7 Dampak

| Hal | Perubahan |
| --- | --- |
| Versi | `dewasa-coding` 1.1.1 ke **1.2.0 (minor)**; `kuliah-coding` **1.2.0** (blok pasangan 4, baris dewasa). Jalur `PRO` tetap 136 jam secara nominal: jembatan hanya mengatur pengakuan, bukan mengubah modul atau jam modul; `DW_EXPECTED_COUNTS.hours.PRO` tidak berubah. |
| Data | `data/dewasa-coding/bridges.json` (`bridge-4`: `from`, `to`, `note`, `status` menjadi `dirancang`) dan `syllabusVersion` di ketujuh berkas; `data/programs.json`; bila K7 memilih pengodean: berkas baru `data/dewasa-coding/kuliah-bridge.json`. |
| Parser | `src/cli/fidelity/dewasa-coding.ts` (tidak berubah untuk bentuk teks di atas; berubah bila K7 memilih pengodean). |
| Skema dan audit | Bila K7 memilih pengodean: skema baru `src/schema/dw-kuliah-bridge.ts`; `src/domain/dw-corpus-audit.ts` (`DW_DATA_FILE_REGISTRY` dan hitungan 13 modul x 3 profil); `src/cli/program-registry.ts`. |
| Uji | `tests/integration/dewasa-coding-fidelity.test.ts` mengunci `bridge-4` berstatus `ditunda` dan versi 1.1.1. |

## 9. Pertanyaan keputusan untuk pemilik

Delapan pertanyaan, masing-masing dengan opsi yang direkomendasikan di urutan
pertama (ditandai **(Disarankan)**). Agent tidak menjawab pertanyaan ini dan
tidak mencatat persetujuan; hanya jawaban pilihan pemilik yang dicatat
(AGENTS.md, Pedoman Eksekusi Wajib butir 15). Label bukti mengikuti bagian 0.

### 9.1 Keputusan pemilik (2026-11-19, issue #177)

Pemilik menjawab kedelapan pertanyaan lewat dialog pilihan baku dan
**menyetujui semua rekomendasi (opsi 1, ditandai Disarankan)**. Pertanyaan di
bawah dipertahankan sebagai catatan opsi yang ditimbang.

| Pertanyaan | Opsi dipilih |
| --- | --- |
| K1 | Opsi 1: pengamatan singkat dan jalur padat di dalam kelas yang sama, tanpa tes, tanpa nilai, tanpa catatan di repositori |
| K2 | Opsi 1: `smp-coding` tidak mengasumsikan blok; `sd-coding` 7.2 menyatakan apa yang tidak dijamin |
| K3 | Opsi 1: subbagian baru di silabus SMA; fondasi tetap kelas bersama; koreksi baris 1 `smp-coding` 5.2 |
| K4 | Opsi 1: pengakuan per CPMK dengan bukti portofolio, riwayat Git, ujian praktik tanpa AI, wawancara kode |
| K5 | Opsi 1: pengakuan per modul `PRO` dengan status lewati, padatkan, wajib |
| K6 | Opsi 1: `DW-FND-M1` dan `DW-PRO-M12` wajib bagi semua |
| K7 | Opsi 1: berkas data baru dengan skema dan parser, ditambah pemeriksaan silang kode lintas program ([ADR-0010](../architecture/adr/0010-pemeriksaan-silang-kode-lintas-program.md)) |
| K8 | Opsi 1: lima isu dan PR atomik berurutan |

Status penerapan per pasangan (K8 opsi 1; diperbarui oleh PR masing-masing):

| Urutan | Pasangan | Versi | Status |
| --- | --- | --- | --- |
| 1 | `kuliah-coding` ke `dewasa-coding` jalur `PRO` | dewasa 1.2.0, kuliah 1.2.0 | Diterapkan |
| 2 | `sma-coding` dan `kuliah-coding` | kuliah 1.2.0 (sudah naik di urutan 1) | Diterapkan |
| 3 | `smp-coding` dan `sma-coding` | smp 1.2.0, sma 1.4.0 | Belum |
| 4 | `sd-coding` dan `smp-coding` | sd 1.1.0 | Belum |
| 5 | `tk-coding` dan `sd-coding` | tk 1.0.2 | Belum |

### K1. Cara menangani pengulangan di awal program atas (TK ke SD, SD ke SMP, SMP ke SMA)

Konteks: semua program atas mengajar dari awal dan tidak mewajibkan program
bawah; pengulangan besar bagi murid yang sudah mengikutinya.

| Opsi | Konsekuensi | Label bukti |
| --- | --- | --- |
| 1. **(Disarankan)** Pengamatan singkat di awal program atas dan jalur padat di dalam kelas yang sama; tanpa tes, tanpa nilai, tanpa catatan di repositori | pengulangan berkurang bagi murid berpengalaman; guru butuh ceklis amatan (belum ada; kelak modul `content/`); tidak menambah jam; efek belum diukur | M: Kalyuga dkk. (2003) tinjauan `[D]`; Sweller dan Cooper (1985) `[C]`; tidak ada studi penempatan untuk coding usia sekolah |
| 2. Hanya catatan "dapat dipadatkan" di silabus, tanpa prosedur pengamatan | perubahan paling kecil; pengulangan bergantung kebijaksanaan guru | tanpa dasar bukti tambahan |
| 3. Tes penempatan tertulis di awal program atas | objektif untuk jenjang atas, tetapi bertentangan dengan `tk-coding` 6.1 (risiko pelabelan) dan tidak cocok untuk TK dan SD; menambah beban | tidak ada bukti untuk usia itu |

### K2. Celah SD ke SMP: perulangan, percabangan, dan blok

Konteks: `smp-coding` 5.1 mengasumsikan murid mengenal blok, perulangan, dan
percabangan; `sd-coding` hanya menjamin urutan instruksi di kelas 5-6 dan
menyerahkan sisanya ke kelas 2-4 yang opsional.

| Opsi | Konsekuensi | Label bukti |
| --- | --- | --- |
| 1. **(Disarankan)** `smp-coding` tidak mengasumsikan blok dan hanya memadatkan minggu tanpa layar; `sd-coding` 7.2 menyatakan apa yang tidak dijamin | tanpa perubahan rencana minggu kedua program; murid hanya kelas 5-6 mulai dari nol di Scratch; `sd-coding` 1.1.0, `smp-coding` 1.2.0 | M |
| 2. `sd-coding` menambah perulangan dan percabangan tanpa layar di kelas 6 | murid inti masuk SMP dengan konsep dasar; mengubah rencana minggu dan `weeks.json` SD (butir `[penguatan]` tidak mengubah CP), menggeser keputusan pemilik; kelas 6 punya 4 minggu cadangan dari 32 | M: Sinha dan Kapur (2021) `[A]` mendukung contoh lebih dulu untuk SD, bukan tambahan konten tertentu |
| 3. Opsi 1 sekarang; opsi 2 setelah ada pilot di sekolah | tidak menambah beban kelas 6 lebih dulu; menunda penutupan celah | M |

### K3. Pengulangan blok fondasi di SMA bagi lulusan SMP berpengalaman

Konteks: `sma-coding` tidak menyebut SMP; tujuh minggu fondasi beririsan
dengan minggu SMP; keputusan pemilik 9.1 menetapkan fondasi sebagai kelas
bersama lintas jalur.

| Opsi | Konsekuensi | Label bukti |
| --- | --- | --- |
| 1. **(Disarankan)** Subbagian baru di silabus SMA (kemampuan masuk dan penempatan); fondasi tetap kelas bersama dengan tugas pendalaman di dalam kelas; koreksi baris 1 `smp-coding` 5.2 | menghormati keputusan 9.1; tidak mengurangi jam; murid berpengalaman tidak "bebas" tetapi tidak mengulang; `sma-coding` 1.4.0 | M |
| 2. Hanya koreksi baris 1 `smp-coding` 5.2; silabus SMA tidak diubah | perubahan minimal; pengulangan tidak diatur; SMA tetap diam tentang SMP | tanpa dasar bukti tambahan |
| 3. Murid yang lolos pengamatan dibebaskan dari minggu fondasi tertentu | membalik keputusan 9.1 sebagian; membebaskan 3 JP per minggu yang dibebaskan; guru dan lab harus melayani dua kelompok; perlu kriteria lulus | M: efek keahlian terbalik mendukung membedakan perlakuan, bukan pembebasan |

### K4. Granularitas pengakuan SMA ke kuliah

Konteks: pengakuan di `kuliah-coding` 5.1 ditulis per mata kuliah, tetapi
jalur A tidak mengajarkan Git, penunjuk, dan tabel hash (`KUL-I-101`,
`KUL-I-102`) dan jalur B tidak mengajarkan basis data (prasyarat `KUL-I-205`).

| Opsi | Konsekuensi | Label bukti |
| --- | --- | --- |
| 1. **(Disarankan)** Pengakuan per CPMK dengan bukti portofolio, riwayat Git, ujian praktik tanpa AI, dan wawancara kode; tata cara ditetapkan perguruan tinggi | jujur terhadap celah; beban pemeriksaan di kampus; `kuliah-coding` 1.2.0 | M: Finnie-Ansley dkk. (2022) `[C]`; Lister dkk. (2004) `[C]` |
| 2. Per mata kuliah utuh (teks v1.1.1) | sederhana; lulusan jalur A dapat melewati `KUL-I-101` tanpa Git atau penunjuk dan memasuki `KUL-I-102` tanpa dasar itu | tanpa dasar bukti tambahan |
| 3. Tanpa pengakuan; hanya seleksi `KUL-K-201` | aman, tetapi pengulangan besar tidak dikelola; menyalahi bagian 5.1 yang ada | tanpa dasar bukti tambahan |

### K5. Bentuk jembatan kuliah-coding ke `PRO`

Konteks: instruksi pemilik 2026-11-19; keputusan 12.7 sebelumnya menunda
sampai kuliah-coding ada; tiga profil bagian 8.2.

| Opsi | Konsekuensi | Label bukti |
| --- | --- | --- |
| 1. **(Disarankan)** Pengakuan per modul `PRO` dengan status lewati, padatkan, wajib, berbasis bukti | jam `PRO` turun perkiraan 81, 43, atau 20 dari 136 menurut profil (angka asumsi); butuh pemeriksaan bukti; wewenang penyelenggara `[belum terverifikasi]`; `dewasa-coding` 1.2.0 | M: Kalyuga dkk. (2003); keahlian per topik (ilmu belajar 7); Finnie-Ansley dkk. (2022) |
| 2. Jalur khusus lulusan kuliah (modul `PRO` lanjutan baru) | isi sesuai lulusan; modul, jam, dan korpus bertambah; melanggar bentuk satu program bila terpisah (12.1) | M |
| 3. Hanya rekomendasi urutan tanpa pengurangan jam | tanpa risiko pengakuan; lulusan kuliah mengulang yang sudah dikuasai (efek keahlian terbalik) | M |

### K6. Modul yang tidak boleh dilewati di `PRO`

| Opsi | Konsekuensi | Label bukti |
| --- | --- | --- |
| 1. **(Disarankan)** `DW-FND-M1` dan `DW-PRO-M12` wajib bagi semua | konsisten dengan 12.1; lulusan jalur U (yang punya `KUL-U-202`) tetap 8 jam; bukti akhir untuk uji LSP tetap ada | M: kebijakan tempat kerja dan data usaha tidak ada di kuliah-coding |
| 2. `DW-FND-M1` boleh dipadatkan bagi pemegang `KUL-U-202` dan `KUL-I-305`; `DW-PRO-M12` wajib | menghemat perkiraan 4 jam; membelah modul bersama yang bersifat keselamatan; menyimpang dari 12.1 | M |
| 3. Keduanya boleh dilewati dengan portofolio | jam paling hemat; jalur `PRO` tanpa bukti akhir dan tanpa dasar uji LSP; tidak disarankan | M |

### K7. Pengodean tabel baru dan pemeriksaan silang lintas program

Konteks: pola repositori adalah jembatan terkodekan di korpus tiap program
dan diperiksa mesin (`README.md` bagian 3); tabel baru SMA (dari SMP) dan
dewasa (6.2) belum punya berkas data; ketiga kesalahan rujukan di bagian 1
tertangkap hanya karena dibaca manual. ADR-0008 menetapkan korpus satu
program tidak merujuk korpus program lain; satu preseden pengecualian ada
(`data/sma-coding/osn-bridge.json` memeriksa rumpun OSN, FR-29).

| Opsi | Konsekuensi | Label bukti |
| --- | --- | --- |
| 1. **(Disarankan)** Berkas data baru untuk tabel baru (`data/sma-coding/smp-bridge.json`, `data/dewasa-coding/kuliah-bridge.json`) dengan skema dan parser, ditambah pemeriksaan silang kode minggu, mata kuliah, dan modul yang dirujuk terhadap korpus program lain | kesalahan rujukan tertangkap mesin; biaya implementasi paling besar; perlu catatan pengecualian ADR-0008 atau ADR baru | (rekayasa; bukan bukti belajar) |
| 2. Berkas data baru dengan skema dan parser, tanpa pemeriksaan silang | sesuai pola sekarang; kode lintas program tetap teks tak terperiksa | (rekayasa) |
| 3. Tabel baru berupa prosa dan tabel tak terkodekan | tanpa perubahan skema atau parser; jembatan baru tidak diperiksa mesin; menyimpang dari pola jembatan terkodekan | (rekayasa) |

### K8. Cakupan dan urutan penerapan

Konteks: AGENTS.md menetapkan satu isu per PR; instruksi pemilik hanya
menyebut jembatan kuliah ke `PRO`; versi minor atau patch di bagian 4.5 sampai 8.7.

| Opsi | Konsekuensi | Label bukti |
| --- | --- | --- |
| 1. **(Disarankan)** Lima isu dan PR atomik berurutan: kuliah ke `PRO`, lalu SMA ke kuliah, SMP ke SMA, SD ke SMP, TK ke SD; versi: `tk-coding` patch, lainnya minor | tiap PR dapat diverifikasi sendiri; enam silabus berubah versi; peta jenjang diperbarui bertahap | (proses) |
| 2. Hanya kuliah ke `PRO` sekarang; empat pasangan lain menunggu jawaban K1 sampai K4 | sesuai instruksi pemilik; pasangan lain tetap "belum selaras" di peta | (proses) |
| 3. Satu PR gabungan untuk semua pasangan | cepat; bertentangan dengan aturan satu isu per PR; sulit ditinjau | (proses) |

## 10. Dampak penerapan di repositori

Daftar ini berlaku bila pemilik menyetujui; tidak ada yang dikerjakan di
dokumen ini.

| Program | Silabus | Berkas data yang berubah | Parser (`src/cli/fidelity/`) | Versi |
| --- | --- | --- | --- | --- |
| `tk-coding` | bagian 5 | `bridge.json`; `syllabusVersion` di 7 berkas | `tk-coding.ts`: tidak berubah | 1.0.1 ke 1.0.2 (patch) |
| `sd-coding` | bagian 7 | `bridges.json`; `syllabusVersion` di 5 berkas | `sd-coding.ts`: tidak berubah | 1.0.1 ke 1.1.0 (minor) |
| `smp-coding` | bagian 5.1 dan 5.2 | `bridge.json`; `syllabusVersion` di 7 berkas | `smp-coding.ts`: tidak berubah | 1.1.1 ke 1.2.0 (minor) |
| `sma-coding` | subbagian baru di 3.0 | `syllabusVersion` di berkas korpus; `smp-bridge.json` baru bila K7 memilih opsi 1 atau 2 | `sma-coding.ts`: tidak berubah untuk prosa; berubah bila `smp-bridge.json` | 1.3.0 ke 1.4.0 (minor) |
| `kuliah-coding` | bagian 5.1 dan 5.2 | `bridges.json`; `syllabusVersion` di 6 berkas | `kuliah-coding.ts`: tidak berubah | 1.1.1 ke 1.2.0 (minor) |
| `dewasa-coding` | bagian 6.1, 6.2 baru, 12.7, 12.8 | `bridges.json` (`bridge-4`); `syllabusVersion` di 7 berkas; `kuliah-bridge.json` baru bila K7 memilih opsi 1 atau 2 | `dewasa-coding.ts`: tidak berubah untuk prosa; berubah bila `kuliah-bridge.json` | 1.1.1 ke 1.2.0 (minor) |

Lintas program: `data/programs.json` (enam `syllabusVersion`); peta jenjang
[`docs/programs/README.md`](README.md) (bagian 1, tabel versi, bagian 3
diganti status "diselaraskan" per pasangan, changelog), README tiap program
yang menyebut versi, `docs/requirements/` bila K7 menambah kebutuhan
(`bun run check:requirements`), dan changeset minor untuk paket
(`kurikulum-informatika`). Bila K7 memilih opsi 1 atau 2: skema baru,
`src/domain/sma-corpus-audit.ts`, `src/domain/dw-corpus-audit.ts`,
`src/cli/program-registry.ts`, dokumen `docs/cli/` bila ada keluaran baru,
dan `docs/architecture/repository-map.md`.

Uji yang mengunci teks atau versi lama (gagal pada salinan uji, bukan masalah
bentuk teks): `tests/integration/tk-coding-fidelity.test.ts`,
`sd-coding-fidelity.test.ts`, `smp-coding-fidelity.test.ts`,
`sma-coding-fidelity.test.ts`, `kuliah-coding-fidelity.test.ts`,
`dewasa-coding-fidelity.test.ts` (versi; hitungan; `bridge-4` `ditunda`;
satu uji revisi v1.1 kuliah; satu uji drift kuliah), dan
`tests/integration/cli-sma-plan.test.ts` (versi `sma-coding`).

Dokumen yang menjadi basi bila penerapan terjadi: `docs/programs/README.md`
bagian 3 (kolom "Dasar dan keselarasan", kalimat "Belum selaras" pada tiga
baris); `docs/riset/ilmu-belajar-kognitif.md` bagian 8.4 (catatan "belum
dicocokkan ulang"); `docs/programs/sma-coding/README.md`.

## 11. Batasan

- Rancangan ini belum diuji di kelas, kampus, atau penyelenggara mana pun;
  pengurangan jam di bagian 8 adalah perhitungan dari jam silabus dengan
  aturan L, P, W yang bersifat asumsi.
- Tidak ada bukti dari Indonesia dan hampir tidak ada bukti penempatan untuk
  coding; semua rekomendasi berlabel M kecuali yang disebut K pada prinsipnya.
  Dokumen riset sendiri menyatakan teks lengkap artikel tidak dibaca.
- Pembacaan CPMK kuliah didasarkan pada teks CPMK ringkas; cakupan nyata
  sebuah kelas tidak diukur. "Dikenali" berarti tertulis di rencana
  kedua program, bukan terbukti dikuasai murid.
- Peran pengakuan modul di `dewasa-coding` tidak punya dasar regulasi yang
  diverifikasi (wewenang penyelenggara); SKKNI tetap hanya sampai judul unit.
- Tabel tambahan di silabus SMA dan dewasa tidak dicerminkan di data sampai K7
  diputuskan (diperbarui v0.2.0: K7 opsi 1 dipilih, sehingga tabelnya
  dicerminkan di berkas data baru dan kodenya diperiksa silang; lihat 9.1).
- Temuan di luar scope: tabel 6 `docs/riset/ai-rekayasa-perangkat-lunak.md`
  masih menulis bahwa silabus SMA jalur A, B, C belum mengatur pemakaian AI,
  padahal `sma-coding` 7.4 (v1.3.0) sudah mengaturnya untuk semua jalur.

## 12. Daftar pustaka

Hanya rujukan yang tercantum dan sudah diverifikasi metadatanya di
[`ilmu-belajar-kognitif.md`](../riset/ilmu-belajar-kognitif.md) bagian 10 dan
[`ai-rekayasa-perangkat-lunak.md`](../riset/ai-rekayasa-perangkat-lunak.md) bagian 9
(dicek 2026-11-19). Kode: `T-A` = metadata cocok dan abstrak dibaca; `P` =
preprint tanpa keterangan tinjauan sejawat (klaim dibatasi pada abstrak);
`J-R` dan `J-T` mengikuti dokumen asalnya. Teks lengkap tidak dibaca.

Agarwal, P. K., Nunes, L. D., & Blunt, J. R. (2021). Retrieval Practice Consistently Benefits Student Learning: a Systematic Review of Applied Research in Schools and Classrooms. *Educational Psychology Review*, *33*(4), 1409-1453. https://doi.org/10.1007/s10648-021-09595-9 — `T-A`

Bastani, H., Bastani, O., Sungu, A., Ge, H., Kabakcı, Ö., & Mariman, R. (2025). Generative AI without guardrails can harm learning: Evidence from high school mathematics. *Proceedings of the National Academy of Sciences*, *122*(26), e2422633122. https://doi.org/10.1073/pnas.2422633122 — `T-A`

Cepeda, N. J., Pashler, H., Vul, E., Wixted, J. T., & Rohrer, D. (2006). Distributed practice in verbal recall tasks: A review and quantitative synthesis. *Psychological Bulletin*, *132*(3), 354-380. https://doi.org/10.1037/0033-2909.132.3.354 — `T-A`

Cepeda, N. J., Vul, E., Rohrer, D., Wixted, J. T., & Pashler, H. (2008). Spacing Effects in Learning. *Psychological Science*, *19*(11), 1095-1102. https://doi.org/10.1111/j.1467-9280.2008.02209.x — `T-A`

Dunlosky, J., Rawson, K. A., Marsh, E. J., Nathan, M. J., & Willingham, D. T. (2013). Improving Students’ Learning With Effective Learning Techniques. *Psychological Science in the Public Interest*, *14*(1), 4-58. https://doi.org/10.1177/1529100612453266 — `T-A`

Ericson, B. J., Margulieux, L. E., & Rick, J. (2017). Solving parsons problems versus fixing and writing code. *Proceedings of the 17th Koli Calling International Conference on Computing Education Research*, 20-29. https://doi.org/10.1145/3141880.3141895 — `T-A`

Finnie-Ansley, J., Denny, P., Becker, B. A., Luxton-Reilly, A., & Prather, J. (2022). The Robots Are Coming: Exploring the Implications of OpenAI Codex on Introductory Programming. *Proceedings of the 24th Australasian Computing Education Conference*, 10-19. https://doi.org/10.1145/3511861.3511863 — `T-A`, `J-R`

Hanks, B., Fitzgerald, S., McCauley, R., Murphy, L., & Zander, C. (2011). Pair programming in education: a literature review. *Computer Science Education*, *21*(2), 135-173. https://doi.org/10.1080/08993408.2011.579808 — `T-A`

Kalyuga, S., Ayres, P., Chandler, P., & Sweller, J. (2003). The Expertise Reversal Effect. *Educational Psychologist*, *38*(1), 23-31. https://doi.org/10.1207/s15326985ep3801_4 — `T-A`

Lehmann, M., Cornelius, P. B., & Sting, F. J. (2024). AI Meets the Classroom: When Do Large Language Models Harm Learning? (arXiv:2409.09047). arXiv. https://arxiv.org/abs/2409.09047 — `P`, `J-P` (v2, 8 Maret 2025)

Lister, R., Adams, E. S., Fitzgerald, S., Fone, W., Hamer, J., Lindholm, M., McCartney, R., Moström, J. E., Sanders, K., Seppälä, O., Simon, B., & Thomas, L. (2004). A multi-national study of reading and tracing skills in novice programmers. *ACM SIGCSE Bulletin*, *36*(4), 119-150. https://doi.org/10.1145/1041624.1041673 — `T-A`

Prather, J., Reeves, B. N., Leinonen, J., MacNeil, S., Randrianasolo, A. S., Becker, B. A., Kimmel, B., Wright, J., & Briggs, B. (2024). The Widening Gap: The Benefits and Harms of Generative AI for Novice Programmers. *Proceedings of the 2024 ACM Conference on International Computing Education Research - Volume 1*, 469-486. https://doi.org/10.1145/3632620.3671116 — `T-A`

Roediger, H. L., & Karpicke, J. D. (2006). Test-Enhanced Learning. *Psychological Science*, *17*(3), 249-255. https://doi.org/10.1111/j.1467-9280.2006.01693.x — `T-A`

Sentance, S., Waite, J., & Kallia, M. (2019). Teaching computer programming with PRIMM: a sociocultural perspective. *Computer Science Education*, *29*(2-3), 136-176. https://doi.org/10.1080/08993408.2019.1608781 — `T-A`

Shen, J. H., & Tamkin, A. (2026). How AI Impacts Skill Formation (arXiv:2601.20245). arXiv. https://arxiv.org/abs/2601.20245 — `P`, `J-P` (v2, 1 Februari 2026)

Sinha, T., & Kapur, M. (2021). When Problem Solving Followed by Instruction Works: Evidence for Productive Failure. *Review of Educational Research*, *91*(5), 761-798. https://doi.org/10.3102/00346543211019105 — `T-A`

Sorva, J. (2013). Notional machines and introductory programming education. *ACM Transactions on Computing Education*, *13*(2), 1-31. https://doi.org/10.1145/2483710.2483713 — `T-A`

Sweller, J., & Cooper, G. A. (1985). The Use of Worked Examples as a Substitute for Problem Solving in Learning Algebra. *Cognition and Instruction*, *2*(1), 59-89. https://doi.org/10.1207/s1532690xci0201_3 — `T-A`

Weintrop, D., & Wilensky, U. (2017). Comparing Block-Based and Text-Based Programming in High School Computer Science Classrooms. *ACM Transactions on Computing Education*, *18*(1), 1-25. https://doi.org/10.1145/3089799 — `T-A`

## Changelog

| Versi | Tanggal | Perubahan |
| --- | --- | --- |
| v0.1.0 | 2026-11-19 | Rancangan awal: lima pasangan jembatan, teks usulan pengganti, jembatan baru kuliah-coding ke dewasa-coding jalur PRO, delapan pertanyaan keputusan. Belum disetujui pemilik. |
| v0.2.0 | 2026-11-19 | Status diterapkan: pemilik menyetujui seluruh rekomendasi K1 sampai K8 (bagian 9.1, issue #177); penerapan bertahap dalam lima PR; pasangan 5 (kuliah-coding ke dewasa-coding `PRO`) diterapkan pertama. |
