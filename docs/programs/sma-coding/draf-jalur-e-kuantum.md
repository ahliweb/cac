# Draf Jalur E: Komputasi Kuantum dan Cloud Quantum

- **Version:** v0.1.0
- **Last updated:** 2026-11-19
- **Status:** DRAF — belum disetujui pemilik program (issue #88); bukan bagian silabus v1.0 maupun v1.1; tidak ada data atau modul yang dibuat darinya
- **Changeset:** Draf awal jalur E (issue #88): tujuan, rekomendasi rentang kelas, rencana mingguan empat semester, prasyarat matematika, opsi stack dan akses cloud quantum dengan sumber bertanggal, kebijakan akun, posisi terhadap CP, pertanyaan terbuka.

> **DRAF — belum disetujui pemilik.** Dokumen ini adalah konten karangan
> menurut [ADR-0007](../../architecture/adr/0007-authored-learning-content.md):
> rancangan dan penilaian penyusun, bukan transkripsi sumber resmi dan bukan
> keputusan. Rekomendasi penyusun di bagian 4, 5, dan 9 tidak mengikat; semua
> keputusan di dalamnya adalah hak pemilik. Penyusun tidak mencatat
> persetujuan atas nama pemilik. Jalur E berada **di luar rumusan CP**
> (pengayaan, bagian 7) dan belum masuk corpus `data/sma-coding/`.

## 0. Cara membaca dokumen ini

- `[belum terverifikasi]` berarti klaim tidak dapat dipastikan dari sumber
  yang benar-benar dibuka penyusun; jangan diperlakukan sebagai fakta.
- `[asumsi]` berarti keputusan perancangan penyusun, bukan data resmi.
- **Tanggal akses sumber layanan: 2026-11-19** (bagian 6.4 dan 10). Tarif,
  kuota, dan ketentuan layanan cloud quantum berubah sewaktu-waktu; semua
  angka di sini harus dicek ulang sebelum dipakai merencanakan.
- Kode minggu mengikuti pola
  [silabus.md bagian 0](silabus.md): `jalur-kelas-semester-M<n>`. Awalan
  jalur E **belum diputuskan** (bagian 8, pertanyaan 2); tabel memakai
  `E-XI1-M1` sebagai penanda sementara.
- Kode butir CP (mis. `E-BK-e`) dipakai persis seperti di
  [silabus.md bagian 1.4](silabus.md). Dokumen ini tidak membuat kode butir
  baru. Kutipan CP di bagian 7 disalin persis dari silabus bagian 1.3.
- Kode minggu fondasi `FND-X1-M<n>` mengikuti
  [silabus-v1.1-draf.md](silabus-v1.1-draf.md) (blok fondasi tujuh minggu);
  id modul `matkom-*` mengikuti
  [rancangan-seri-matematika-komputasi.md](rancangan-seri-matematika-komputasi.md)
  (issue #87). Orchestrator menyampaikan bahwa silabus v1.1 dan rancangan
  seri matematika komputasi disetujui pemilik pada 2026-11-19; berkas yang
  dibaca penyusun masih memuat status DRAF, sehingga persetujuan itu
  `[belum terverifikasi]` dari berkasnya sendiri.
- Satu pertemuan = 3 JP x 45 menit per minggu; 14 minggu materi + 2 minggu
  cadangan per semester (silabus bagian 2).

## 1. Latar dan keputusan pemilik

Pemeriksaan 2026-11-18: komputasi kuantum dan cloud quantum belum ada di
repositori, dan tidak disebut rumusan CP Informatika Fase E/F maupun silabus
OSN. Keputusan pemilik 2026-11-18 (dialog pilihan, issue #88 dan terkait):

| Keputusan | Isi |
| --- | --- |
| Jalur terpisah | Komputasi kuantum menjadi **jalur E terpisah**. |
| Pemilihan jalur | Murid memilih **satu jalur, boleh lebih** (silabus bagian 9). |
| Blok fondasi | Tujuh minggu bersama di awal kelas X semester 1 (`FND-X1-M1..M7`). |
| Posisi terhadap CP | Di luar rumusan CP; **pengayaan**. |

Dokumen ini hanya menjawab apa yang dibutuhkan agar pemilik dapat memutuskan
bentuk jalur E; ia tidak mengubah silabus.

## 2. Tujuan jalur E

Setelah menyelesaikan jalur E, murid mampu `[asumsi]`:

1. menjelaskan qubit, superposisi, pengukuran, dan entanglement dengan
   bahasa dan matematika yang tepat pada tingkat SMA (vektor keadaan dan
   matriks gerbang), tanpa mitos populer;
2. menyusun dan menelusuri sirkuit kuantum kecil, serta memprediksi
   distribusi hasil pengukurannya;
3. menulis simulator vektor keadaan sederhana dan memakainya untuk memeriksa
   perhitungan tangan;
4. menjelaskan gagasan algoritma Deutsch-Jozsa, Bernstein-Vazirani, dan
   Grover sederhana, serta membandingkan jumlah pertanyaan (query) dengan
   pendekatan klasik;
5. menjelaskan peran dan keterbatasan cloud quantum (antrian pekerjaan,
   derau, kuota, biaya) dan membaca hasil pekerjaan pada perangkat nyata
   yang dijalankan guru;
6. menilai klaim populer tentang komputasi kuantum secara kritis.

Bukan tujuan: fisika kuantum formal, pembuktian kompleksitas, pengodean
koreksi galat kuantum, dan menjalankan algoritma Shor atau Grover berskala
bermakna (tidak mungkin di perangkat saat ini untuk ukuran masalah kelas;
catatan itu sendiri `[belum terverifikasi]` sampai modul ditulis dan
disumberkan).

## 3. Rekomendasi rentang kelas

| Opsi | Rentang | Semester | Kelebihan | Kekurangan |
| --- | --- | --- | --- | --- |
| 1 (Disarankan) | **XI–XII** (Fase F) | 4 (`XI1`, `XI2`, `XII1`, `XII2`) | Prasyarat matematika dan pemrograman sudah matang; kelas X penuh dipakai blok fondasi (tujuh minggu semester 1) dan dasar jalur lain; Fase F cocok dengan kerja proyek; inti dapat selesai dalam dua semester | Murid yang baru tertarik di kelas XII tidak dapat mengambil penuh; XII bersaing dengan persiapan ujian akhir dan OSN |
| 2 | X–XII | 6 | Paling panjang; murid dapat memulai lebih dini | Prasyarat matematika (matriks, kompleks) belum tentu tersedia di X; X1 sudah memuat tujuh minggu fondasi; terlalu panjang untuk materi pengayaan; risiko beban |
| 3 | Hanya XI | 2 | Ringkas; tidak menyentuh XII | Algoritma (Grover) dan cloud tidak tercapai; hanya konsep dasar |

Rekomendasi penyusun: **opsi 1**, dengan struktur: `XI1` dan `XI2` sebagai
**inti** (konsep, matematika, simulator, entanglement, Deutsch-Jozsa);
`XII1` dan `XII2` sebagai **lanjutan** (Grover, derau, cloud, proyek akhir).
Murid yang hanya sempat dua semester tetap menutup inti yang utuh.

Alasan utama `[asumsi]`: (a) kelas X semester 1 sudah terisi blok fondasi
dan keputusan pemilik menempatkan fondasi sebelum pemilihan jalur; (b)
seri matematika komputasi (#87) berjalan dari kelas X semester 2 sampai XI,
sehingga prasyarat logika, fungsi, dan pertumbuhan fungsi baru matang di XI;
(c) vektor, matriks, dan bilangan kompleks (bagian 5) tidak dicakup seri #87
dan perlu dibangun di dalam jalur.

## 4. Prasyarat dan ketergantungan

### 4.1 Prasyarat matematika

| Topik | Kebutuhan di jalur E | Sumber pemenuhan | Status |
| --- | --- | --- | --- |
| Probabilitas dasar (peluang, nilai harapan, distribusi diskret) | aturan Born; membaca histogram hasil | Matematika sekolah `[belum terverifikasi]`; dibangun ulang singkat di `E-XI1-M2` | Tidak ada di seri #87 |
| Vektor (penjumlahan, perkalian skalar, panjang, hasil kali dalam) | vektor keadaan | Matematika sekolah `[belum terverifikasi]`; `E-XI1-M2` | Tidak ada di seri #87 |
| Matriks (perkalian matriks-vektor, matriks-matriks, transpos) | gerbang sebagai matriks | Matematika sekolah `[belum terverifikasi]`; `E-XI1-M3` | Tidak ada di seri #87 |
| Bilangan kompleks dasar (a + bi, modulus, konjugat) | amplitudo dan fase | Matematika sekolah `[belum terverifikasi]`; `E-XI1-M4`; **amplitudo real dahulu**, kompleks hanya untuk fase | Tidak ada di seri #87 |
| Biner dan bit | kaitan qubit dengan bit | `FND-X1-M3`; `matkom-sistem-bilangan-basis` | Ada |
| Logika Boolean dan tabel kebenaran | gerbang klasik, oracle | `matkom-logika-proposisi` | Ada |
| Fungsi, satu-satu dan pada | reversibilitas; oracle `f` | `matkom-himpunan-relasi-fungsi` | Ada |
| Pertumbuhan fungsi dan logaritma basis 2 | √N lawan N; 2^n amplitudo | `matkom-pertumbuhan-fungsi` | Ada |
| Induksi dan rekursi | opsional (pola Grover berulang) | `matkom-induksi-dan-rekursi-matematis` | Ada (opsional) |

Apakah vektor, matriks, bilangan kompleks, dan probabilitas sudah diajarkan
pada Matematika SMA sebelum kelas XI **tidak diverifikasi** penyusun
(dokumen kurikulum Matematika tidak dibuka); rencana mengasumsikan **belum**
dan membangunnya dalam tiga minggu `E-XI1-M2..M4`. Temuan untuk #87: seri
matematika komputasi tidak memuat modul vektor, matriks, kompleks, atau
probabilitas; pilihan penanganannya ada di pertanyaan terbuka 5.

### 4.2 Ketergantungan pada blok fondasi dan program lain

| Ketergantungan | Alasan |
| --- | --- |
| `FND-X1-M1..M7` (blok fondasi) | bit, biner, perangkat, model I-P-O sebagai pembanding komputer klasik |
| Dasar pemrograman jalur A atau B (setidaknya setara `A-X1-M3..M9` atau `B-X1-M3..M9`) | simulator buatan sendiri (`E-XI1-M10..M12`) |
| Modul `matkom-*` (bagian 4.1) | prasyarat matematika |
| Seri cloud computing (`rancangan-seri-cloud.md`, issue #89) | **tidak bergantung**; cloud quantum berbeda dari cloud computing umum, tetapi kebijakan akun cloud (tanpa akun pribadi siswa) harus selaras |

Murid yang belum memprogram tetap dapat mengikuti bagian konsep memakai alat
visual (bagian 6.1, opsi 1); minggu simulator sendiri menjadi opsional
baginya `[asumsi]` (pertanyaan terbuka 7).

## 5. Rencana mingguan

Kolom: **Topik** | **Tujuan** (murid mampu ...) | **Keluaran** | **Latihan**.
Seluruh latihan memakai data sintetis dan simulasi; tidak ada data pribadi
siswa (bagian 8). Kode minggu sementara `E-<kelas><semester>-M<n>`.

### E-XI1 (kelas XI, semester 1; inti I — konsep dan matematika)

| Minggu | Topik | Tujuan | Keluaran | Latihan |
| --- | --- | --- | --- | --- |
| E-XI1-M1 | Mengapa komputasi kuantum; bit klasik dan acak | membedakan bit klasik dan qubit secara garis besar; menyebut apa yang dijanjikan dan bukan; membuka alat visual | catatan "fakta dan mitos" | membandingkan koin acak klasik dengan sirkuit satu qubit di alat visual |
| E-XI1-M2 | Probabilitas dan vektor | menghitung peluang diskret; memakai vektor dan hasil kali dalam | lembar vektor dan peluang | vektor dua dimensi; panjang dan normalisasi |
| E-XI1-M3 | Matriks | mengalikan matriks dengan vektor dan dengan matriks | lembar matriks | perkalian tangan; periksa dengan program kecil |
| E-XI1-M4 | Bilangan kompleks dasar | menghitung modulus dan konjugat; menjelaskan fase | lembar kompleks | modulus kuadrat; rotasi fase |
| E-XI1-M5 | Qubit dan keadaan | menuliskan `\|0>`, `\|1>` dan keadaan umum sebagai vektor; syarat normalisasi | lembar keadaan | memeriksa keadaan sah atau tidak |
| E-XI1-M6 | Superposisi dan aturan Born | menghitung peluang hasil dari amplitudo | tabel peluang | keadaan acak sintetis; hitung peluang |
| E-XI1-M7 | Pengukuran | menjelaskan hasil acak, runtuhnya keadaan, dan jumlah percobaan (shot) | histogram hasil | memprediksi lalu mengamati histogram di alat visual |
| E-XI1-M8 | Gerbang satu qubit | menerapkan X, Z, H sebagai matriks | tabel gerbang | tangan: H pada `\|0>`; X lalu H |
| E-XI1-M9 | Sirkuit satu qubit dan interferensi | menelusuri sirkuit satu qubit; menjelaskan interferensi (H lalu H) | sirkuit beranotasi | merancang sirkuit dengan hasil yang ditentukan |
| E-XI1-M10 | Simulator sendiri I | menyimpan vektor keadaan; menerapkan matriks gerbang | program simulator satu qubit | C++ (jalur A) atau TypeScript/Bun (jalur B) |
| E-XI1-M11 | Simulator sendiri II | menyimulasikan pengukuran dengan pembangkit acak; membandingkan dengan teori | program ukur dan histogram | seribu shot; bandingkan dengan peluang tangan |
| E-XI1-M12 | Dua qubit dan hasil kali tensor | menuliskan keadaan dua qubit sebagai vektor 4 dimensi | tabel dasar `\|00>..\|11>` | menyusun keadaan produk |
| E-XI1-M13 | Proyek mini | menyusun dan menjelaskan satu sirkuit satu qubit | laporan dan sirkuit | pembangkit bit simulasi dan uji frekuensi (catatan: simulasi, bukan keacakan sejati) |
| E-XI1-M14 | Asesmen dan refleksi | menunjukkan matematika dan sirkuit satu qubit | uji tulis dan praktik; jurnal | kuis |

### E-XI2 (kelas XI, semester 2; inti II — entanglement dan algoritma pertama)

| Minggu | Topik | Tujuan | Keluaran | Latihan |
| --- | --- | --- | --- | --- |
| E-XI2-M1 | Gerbang dua qubit: CNOT | menerapkan CNOT sebagai matriks 4x4 | tabel CNOT | tangan: CNOT pada keadaan dasar |
| E-XI2-M2 | Entanglement dan keadaan Bell | membangun keadaan Bell dari H dan CNOT; menjelaskan tidak dapat difaktorkan | sirkuit Bell | memeriksa apakah keadaan dapat difaktorkan |
| E-XI2-M3 | Mengukur qubit terjerat | menjelaskan korelasi hasil; menolak mitos komunikasi lebih cepat dari cahaya | catatan korelasi | simulasi Bell seribu shot; ukur korelasi |
| E-XI2-M4 | Simulator sendiri III: n qubit | memperluas simulator ke n qubit; menghitung memori 2^n | simulator n qubit | tabel memori; titik jenuh di mesin lab |
| E-XI2-M5 | Gerbang fase dan rotasi (pengayaan) | memakai Y, S, T dan rotasi; menjelaskan fase global dan relatif | tabel gerbang lanjutan | gerbang pengganti dengan urutan gerbang lain |
| E-XI2-M6 | Reversibilitas | menjelaskan mengapa gerbang kuantum reversibel; gerbang klasik reversibel (Toffoli) | tabel kebenaran Toffoli | membuat AND dari Toffoli |
| E-XI2-M7 | Tak dapat menggandakan dan teleportasi (konsep) | menjelaskan tidak dapat menggandakan keadaan; menelusuri sirkuit teleportasi | diagram teleportasi | menelusuri teleportasi pada simulator |
| E-XI2-M8 | Pengayaan: permainan CHSH | membandingkan strategi klasik dan kuantum secara simulasi | tabel kemenangan | menghitung kemenangan strategi klasik terbaik |
| E-XI2-M9 | Pengayaan: distribusi kunci (konsep) | menelusuri ide protokol BB84 pada simulasi; menyebut batasnya | catatan protokol | simulasi dengan data sintetis; bukan keamanan nyata |
| E-XI2-M10 | Oracle dan fungsi Boolean | memodelkan fungsi sebagai oracle; menghitung query | tabel oracle | konstan lawan seimbang |
| E-XI2-M11 | Algoritma Deutsch | menjelaskan dan menyimulasikan Deutsch satu qubit | sirkuit dan hasil | satu query lawan dua query klasik |
| E-XI2-M12 | Algoritma Deutsch-Jozsa | menjelaskan dan menyimulasikan Deutsch-Jozsa pada tiga qubit | sirkuit dan hasil | membuat oracle konstan dan seimbang |
| E-XI2-M13 | Proyek mini | menyajikan satu fenomena (Bell, teleportasi, atau Deutsch-Jozsa) | simulasi dan poster | pilihan kelompok |
| E-XI2-M14 | Asesmen dan refleksi | menunjukkan entanglement dan algoritma pertama | uji tulis dan praktik; jurnal | kuis |

### E-XII1 (kelas XII, semester 1; lanjutan I — algoritma dan alat nyata)

| Minggu | Topik | Tujuan | Keluaran | Latihan |
| --- | --- | --- | --- | --- |
| E-XII1-M1 | Bernstein-Vazirani | menjelaskan dan menyimulasikan algoritma | sirkuit dan hasil | menemukan string rahasia dengan satu query |
| E-XII1-M2 | Pembalikan fase | menjelaskan oracle fase dan tanda minus pada amplitudo | diagram amplitudo | menelusuri `\|x>` ke `-\|x>` |
| E-XII1-M3 | Grover I | menjelaskan gagasan pencarian tak terurut dan oracle | sketsa algoritma | dua qubit: satu item ditandai |
| E-XII1-M4 | Grover II | menjelaskan operator difusi dan amplifikasi amplitudo | diagram amplitudo per iterasi | menelusuri tiga dan empat item dengan tangan |
| E-XII1-M5 | Grover III: jumlah iterasi | menghubungkan jumlah iterasi dengan √N; membandingkan dengan pencarian linear | tabel perbandingan | simulator sendiri: N sampai batas mesin; hitung query |
| E-XII1-M6 | Gagasan Fourier kuantum dan Shor (konsep) | menyebut peran transformasi Fourier dan ide pemfaktoran; tidak mengimplementasikan | catatan konsep | membaca bagian tertentu sumber yang disumberkan |
| E-XII1-M7 | Batas komputasi kuantum | membedakan klaim "lebih cepat" yang benar dan keliru | tabel fakta dan mitos II | menilai tiga klaim berita secara kritis |
| E-XII1-M8 | Derau dan dekoherensi | menjelaskan sumber derau; menambahkan model derau sederhana di simulator | simulator dengan derau | membandingkan histogram ideal dan berderau |
| E-XII1-M9 | Pustaka Qiskit dan Python I (demonstrasi) | membaca sirkuit yang sama dalam Qiskit; menjalankan pada simulator lokal | sirkuit Qiskit | membandingkan hasil dengan simulator sendiri |
| E-XII1-M10 | Pustaka Qiskit dan Python II | membaca dan memodifikasi kode; menjalankan Bell dan Grover kecil secara lokal | catatan perbandingan | modifikasi jumlah shot dan gerbang |
| E-XII1-M11 | Peran cloud quantum | menjelaskan alur: sirkuit, kompilasi ke gerbang perangkat, antrian, eksekusi, hasil; menyebut kuota, biaya, dan batas usia akun | diagram alur cloud quantum | menelaah ketentuan layanan secara bersama; menghitung biaya contoh dari tarif bersumber (bagian 6.4) |
| E-XII1-M12 | Demonstrasi cloud quantum oleh guru | mengamati satu pekerjaan Bell kecil pada perangkat nyata lewat akun guru atau sekolah; membandingkan dengan simulator | histogram perangkat lawan simulator | menjelaskan selisih hasil; bila akses tidak tersedia, pakai hasil terarsip sintetis atau perekaman layar tanpa data pribadi |
| E-XII1-M13 | Proyek mini | membandingkan simulator dan hasil perangkat | laporan | pilihan kelompok |
| E-XII1-M14 | Asesmen dan refleksi | menunjukkan Grover, derau, dan alur cloud | uji tulis dan praktik; jurnal | kuis |

### E-XII2 (kelas XII, semester 2; lanjutan II — proyek akhir)

| Minggu | Topik | Tujuan | Keluaran | Latihan |
| --- | --- | --- | --- | --- |
| E-XII2-M1 | Membaca hasil nyata | membaca histogram, galat statistik, dan jumlah shot | catatan interpretasi | selang kepercayaan sederhana dari shot |
| E-XII2-M2 | Mitigasi derau (konsep) | menjelaskan gagasan mitigasi dan batasnya | catatan konsep | mengulang simulasi dengan model derau berbeda |
| E-XII2-M3 | Pengayaan: algoritma hibrida (konsep) | menjelaskan pola kuantum-klasik bergantian (mis. VQE, QAOA) secara garis besar | diagram hibrida | menelusuri satu iterasi pada simulator |
| E-XII2-M4 | Dampak ke keamanan informasi (konsep) | menjelaskan, dengan sumber, hubungan komputasi kuantum dengan kriptografi | catatan bersumber | menyusun kutipan sumber; tanpa klaim tak bersumber |
| E-XII2-M5 | Etika, ekspektasi, dan karier | membedakan harapan realistis dan hype | refleksi | analisis satu artikel populer |
| E-XII2-M6 | Proyek akhir: rancangan | merancang proyek (simulator, algoritma, atau studi banding) | dokumen rancangan | pilih topik |
| E-XII2-M7 | Proyek akhir: implementasi I | membangun inti proyek | kode dan catatan | sprint |
| E-XII2-M8 | Proyek akhir: implementasi II | menguji dan membandingkan dengan perhitungan tangan | uji dan catatan | sprint |
| E-XII2-M9 | Proyek akhir: pengujian dan dokumentasi | mendokumentasikan dengan jelas | dokumentasi | tinjau sejawat |
| E-XII2-M10 | Proyek akhir: pengujian lanjutan | memperbaiki dan mengoptimalkan | versi perbaikan | sprint |
| E-XII2-M11 | Proyek akhir: presentasi | mempresentasikan | presentasi | demo |
| E-XII2-M12 | Proyek akhir: portofolio | mengarsipkan tanpa data pribadi | portofolio | rapikan |
| E-XII2-M13 | Cadangan terstruktur: tinjauan | menutup celah materi | ringkasan | pilihan kelompok |
| E-XII2-M14 | Asesmen dan refleksi | menunjukkan seluruh jalur | uji tulis dan praktik; jurnal | kuis |

Catatan: seluruh daftar topik adalah rancangan penyusun `[asumsi]`; belum
diuji di kelas. Topik bertanda "(pengayaan)" dan "(konsep)" dapat dipotong
tanpa merusak inti.

## 6. Stack dan akses cloud quantum

### 6.1 Opsi stack

| Opsi | Uraian | Sumber |
| --- | --- | --- |
| 1. Alat visual tanpa coding | Quirk: simulator rangkaian kuantum di peramban; "toy quantum circuit simulator"; sampai 16 qubit; lisensi Apache-2.0; dapat dibuat menjadi satu berkas `out/quirk.html` | `https://github.com/Strilanc/Quirk` (akses 2026-11-19). Kemampuan dipakai luring dari berkas lokal adalah simpulan penyusun dari instruksi build, bukan fitur yang dinyatakan `[belum terverifikasi]`. |
| 2. Simulator buatan sendiri | Murid menulis simulator vektor keadaan (kompleks, matriks gerbang, sampling) dalam bahasa jalurnya: C++ (jalur A) atau TypeScript/Bun (jalur B) | Rancangan penyusun `[asumsi]`; tidak memerlukan pustaka luar |
| 3. Pustaka simulator JS/TS | `quantum-circuit` (npm): simulator JavaScript; README menyatakan 20+ qubit di peramban atau Node.js; lisensi MIT; dapat impor/ekspor OpenQASM, Quil, Qiskit | `https://github.com/quantastica/quantum-circuit` (akses 2026-11-19). Pemeliharaan terkini (tanggal commit terakhir) `[belum terverifikasi]`: halaman tidak menampilkannya. |
| 4. Python + Qiskit + simulator lokal | Qiskit SDK (Apache-2.0) dan Aer (Apache-2.0), dipasang dengan `pip install qiskit-aer`; Aer dapat menjalankan sirkuit dengan atau tanpa model derau. Dokumentasi IBM menyebut mode uji lokal dan mensimulasikan perangkat dengan "fake backends" | `https://github.com/Qiskit/qiskit`; `https://github.com/Qiskit/qiskit-aer`; `https://qiskit.qotlabs.org/docs/guides/local-simulators` (semua akses 2026-11-19). Domain `qotlabs.org` bukan domain IBM yang dikenal penyusun; keasliannya sebagai dokumentasi resmi `[belum terverifikasi]`. |

Python bukan bahasa jalur A (C++) maupun B (JavaScript/TypeScript) di
silabus; opsi 4 menambah bahasa ketiga dan dependensi `pip` (tidak dipasang
atau dijalankan penyusun). Karena itu opsi 4 dipakai paling jauh sebagai
**demonstrasi guru** (`E-XII1-M9..M12`), bukan prasyarat murid.

### 6.2 Penilaian opsi stack (1 = lemah, 3 = kuat; penilaian penyusun, bukan pengukuran)

| Kriteria | 1. Quirk | 2. Simulator sendiri | 3. Pustaka JS | 4. Qiskit + Aer |
| --- | --- | --- | --- | --- |
| Keamanan (tanpa akun, tanpa data siswa) | 3 | 3 | 3 | 3 (lokal); 1 bila langsung ke cloud |
| Performa di komputer lab | 3 (sampai 16 qubit) | 2 (memori 2^n; jenuh di sekitar 20-an qubit) | 2 | 3 |
| Kemudahan perawatan | 3 | 2 (kode milik sendiri) | 2 (kesehatan proyek tak terverifikasi) | 2 (rilis cepat, pip) |
| Skalabilitas ke banyak murid | 3 | 3 | 3 | 2 |
| Aksesibilitas bagi sekolah beragam | 3 (peramban) | 3 (alat jalur A/B) | 3 | 1 (butuh Python, pip, internet awal) |
| Kesesuaian stack program (A: C++, B: Bun) | 2 | 3 | 2 | 1 |
| UI/UX untuk pemula | 3 | 1 (tanpa visual) | 1 | 2 |
| Kompatibilitas dengan cloud nyata | 1 | 1 | 2 (ekspor OpenQASM) | 3 |
| Kompleksitas operasional | 3 | 3 | 2 | 1 |
| Implikasi jangka panjang (pembelajaran konsep sampai alat industri) | 2 | 3 | 1 | 3 |
| SEO | tidak relevan | tidak relevan | tidak relevan | tidak relevan |

**Rekomendasi penyusun:** pakai **opsi 1 + opsi 2** sebagai inti murid
(visual untuk membangun intuisi, simulator buatan sendiri untuk memahami
isinya), dan **opsi 4** hanya sebagai demonstrasi guru di `XII1` untuk
menjembatani ke alat industri dan cloud. Opsi 3 opsional sebagai cadangan
bila murid enggan menulis simulator sendiri. Keputusan milik pemilik.

### 6.3 Opsi akses cloud quantum

| Opsi | Uraian | Kelebihan | Kekurangan |
| --- | --- | --- | --- |
| A (Disarankan) | **Tanpa cloud untuk murid; demonstrasi guru** lewat satu akun guru atau sekolah, satu atau dua pekerjaan kecil per semester | Tidak ada akun atau data siswa; biaya nol bila memakai kuota gratis (bagian 6.4); selaras ADR-0004 | Murid tidak mengalami antrian dan pengiriman sendiri; akses bergantung layanan |
| B | Hanya simulator lokal; cloud dibahas konseptual dan memakai hasil terarsip | Tanpa risiko akun; selalu berjalan luring | Peran cloud tidak teramati langsung |
| C | Murid memakai akun masing-masing | Pengalaman langsung | Bertentangan dengan ketentuan batas usia di beberapa layanan (bagian 6.4); memunculkan akun dan data pribadi siswa; tidak disarankan |

### 6.4 Fakta layanan bersumber (akses 2026-11-19)

| Layanan | Klaim | Sumber | Catatan |
| --- | --- | --- | --- |
| IBM Quantum Platform, Open Plan | Gratis; kuota setara 10 menit per jendela 28 hari bergulir; instans Open Plan hanya dapat dibuat di wilayah us-east | `https://quantum.cloud.ibm.com/docs/en/guides/plans-overview` | Kuota itu per akun: satu akun kelas = 10 menit untuk seluruh kelas; cukup untuk demonstrasi, tidak untuk praktik murid. |
| IBM Quantum Platform, promosi | Per 16 Maret 2026, pengguna Open Plan aktif dapat mengikutsertakan diri untuk tambahan setara 180 menit selama 12 bulan | sama | Masa berlaku dan ketersediaan saat ini `[belum terverifikasi]`; kemungkinan sudah berakhir saat jalur E berjalan (sekitar 2027). |
| IBM, batas usia | Halaman Plans dan halaman tanggung jawab layanan **tidak memuat** pernyataan batas usia | `.../guides/plans-overview`, `https://quantum.cloud.ibm.com/docs/en/guides/responsibilities` | Teks perjanjian pengguna (`https://quantum.ibm.com/terms`) mengalihkan (301) ke beranda dan tidak terbuka. Ringkasan hasil pencarian menyebut orang tua atau wali mewakili pihak yang belum dewasa; itu **tidak dibuka dari sumbernya**: `[belum terverifikasi]`. |
| IBM, simulator awan | Dilaporkan telah dihentikan pada 15 Mei 2024 dan pengguna diarahkan ke simulator lokal | Ringkasan hasil pencarian (halaman rujukan tidak dibuka) | `[belum terverifikasi]`; konsisten dengan rekomendasi simulator lokal. |
| Amazon Braket | Bayar sesuai pemakaian; QPU dikenai biaya per tugas ditambah biaya per shot (tabel memuat USD 0,30 per tugas; contoh perangkat: Rigetti Cepheus USD 0,000425 per shot; contoh 1 tugas + 10.000 shot = USD 4,55); simulator sesuai permintaan USD 0,075 per menit contoh SV1; paket gratis AWS: satu jam simulasi sesuai permintaan per bulan selama 12 bulan pertama; simulator lokal SDK gratis; halaman tidak menyebut kuota QPU gratis | `https://aws.amazon.com/braket/pricing/` | Contoh dalam halaman yang sama memuat ketidakkonsistenan internal (harga per shot USD 0,00090 lawan 0,000425 pada hitungan); perlakukan angka sebagai indikatif. |
| AWS, batas usia | Perjanjian pelanggan: "You represent to us that you are lawfully able to enter into contracts (e.g., you are not a minor)." Tidak ada angka usia minimum | `https://aws.amazon.com/agreement/` | Implikasi: pihak belum dewasa tidak dapat memegang akun AWS; Braket tidak cocok untuk akun murid. Kebutuhan kartu pembayaran `[belum terverifikasi]`. |
| Azure Quantum | Memerlukan akun Azure dan ruang kerja (workspace); QDK gratis dan sumber terbuka, tidak memerlukan akun Azure; ada akun Azure gratis untuk pelajar; penyedia: IonQ, Pasqal, Quantinuum, Rigetti | `https://learn.microsoft.com/en-us/azure/quantum/overview-azure-quantum` | Syarat usia akun Azure dan akun pelajar `[belum terverifikasi]`. |
| Azure Quantum, harga | Penyedia menentukan harga; simulator IonQ gratis; Rigetti USD 0,02 per kenaikan 10 milidetik waktu eksekusi; IonQ minimum per eksekusi USD 97,50 (Aria 1, mitigasi aktif) | `https://learn.microsoft.com/en-us/azure/quantum/pricing` (metadata halaman: diperbarui 2026-11-03) | Halaman menyebut harga dapat berubah dan memeriksanya di ruang kerja. Kuota gratis untuk QPU tidak ditemukan di halaman itu `[belum terverifikasi]`. |

Ringkasan trade-off: **IBM Open Plan** gratis tetapi kuota kecil dan satu
akun; **Braket** paling transparan tarifnya tetapi berbayar per pakai dan
terikat perjanjian untuk yang cakap hukum; **Azure Quantum** butuh akun dan
workspace Azure dan harga QPU tinggi untuk beberapa penyedia. Untuk
demonstrasi guru, IBM Open Plan paling hemat; ketiganya tidak cocok untuk
akun murid.

### 6.5 Kebijakan akun tanpa data pribadi siswa

Selaras [ADR-0004](../../architecture/adr/0004-no-learner-personal-data.md)
dan silabus bagian 7.3 `[asumsi]`:

1. **Tidak ada akun cloud quantum atas nama murid.** Murid memakai simulator
   lokal dan alat visual tanpa akun.
2. Bila ada demonstrasi cloud, **satu akun guru atau sekolah (akun lembaga,
   bukan akun pribadi guru bila mungkin)**; guru yang mengoperasikannya.
3. Sirkuit, nama pekerjaan, tag, dan catatan yang dikirim ke layanan memakai
   label sintetis (mis. `kelas-demo-01`), tanpa nama murid, sekolah, atau
   penanda lain; hasil yang disimpan hanya histogram agregat.
4. Token API dan kunci akun adalah rahasia: tidak di-commit, tidak ditaruh
   di komputer murid, tidak ditayangkan di layar kelas.
5. Layanan yang pemrosesannya di luar negeri (IBM Open Plan: wilayah
   us-east) hanya menerima data sintetis; tidak ada data pribadi yang
   dikirim, sehingga pertanyaan transfer lintas batas tidak muncul.
6. Sebelum satu akun dibuat, guru atau sekolah membaca ketentuan layanan
   terkini dan memverifikasi batas usia serta syarat akun lembaga; temuan
   dicatat tanpa disalin ke repositori sebagai klaim.

## 7. Posisi terhadap CP

Jalur E berada **di luar rumusan CP Fase E/F**: ia tidak menggantikan,
mengurangi, atau dihitung sebagai pemenuhan butir CP mana pun, dan tidak
menggeser minggu jalur lain. Statusnya **pengayaan** (keputusan pemilik
2026-11-18). Kemiripan terdekat dengan butir CP, dicatat agar pemilik dapat
menilai tanpa menghitungnya:

| Butir | Kutipan CP (silabus bagian 1.3) | Hubungan |
| --- | --- | --- |
| F-BK-b | "menganalisis persoalan yang bisa menghasilkan lebih dari satu solusi dengan pemahamannya terhadap beberapa strategi algoritmik untuk menghasilkan beberapa alternatif solusi dari satu persoalan dengan memberikan justifikasi efisiensi, kelebihan, dan keterbatasan dari setiap alternatif solusi" | Membandingkan Grover dengan pencarian linear dan Deutsch-Jozsa dengan pendekatan klasik (`E-XII1-M5`, `E-XI2-M12`) adalah latihan serupa; **tidak dihitung**. |
| F-AP-d | "merancang dan mengimplementasikan sebuah program yang menggunakan struktur data kompleks dan tepat menggunakan library atau perangkat yang tersedia" | Simulator vektor keadaan dan penggunaan Qiskit menyentuh butir ini; **tidak dihitung**. |

Perhatian: kutipan di atas disalin dari silabus, yang bersumber dari
*Panduan Mata Pelajaran Informatika, Fase D – F* (BSKAP, 2025). Dokumen ini
tidak memverifikasi ulang sumber CP.

## 8. Kode minggu jalur E: analisis tabrakan

Silabus memakai dua keluarga kode:

| Keluarga | Pola | Contoh | Sumber |
| --- | --- | --- | --- |
| Kode minggu | `<jalur>-<kelas><semester>-M<n>` | `A-X1-M3`, `FND-X1-M3` | silabus bagian 0 |
| Kode butir CP | `<fase>-<elemen>-<huruf>` | `E-BK-e`, `E-LD-d` | silabus bagian 1.4 |

Awalan `E-` ada di keduanya jika jalur kelima diberi huruf E. Pemeriksaan
penyusun terhadap berkas skema (hanya dibaca, tidak diubah):

- Pola kode butir CP: `^[EF]-(BK|LD|AD|AP)-[a-z]$`
  (`src/schema/sma-common.ts`). Segmen kedua hanya `BK|LD|AD|AP`.
- Pola kode semester: `^(X|XI|XII)[12]$`; pola kode jalur-semester minggu:
  `^[A-Z]-(X|XI|XII)[12]$` (`src/schema/sma-common.ts`,
  `src/schema/sma-week.ts`). Id jalur: satu huruf kapital.
- Kesimpulan: **tidak ada tabrakan mesin**; `E-XI1-M1` tidak cocok dengan
  pola kode CP, dan `E-BK-e` tidak cocok dengan pola minggu. Tabrakan
  hanyalah **visual dan lisan** (mis. `E-X1-M1` terbaca "Fase E kelas X";
  pencarian teks `E-` mengembalikan keduanya; "butir E" ambigu antara
  jalur E dan Fase E).

| Opsi | Contoh | Kelebihan | Kekurangan | Cocok skema? |
| --- | --- | --- | --- | --- |
| 1. Tetap `E-` | `E-XI1-M1` | Selaras urutan jalur A, B, C, D, E dan nama jalur yang dipilih pemilik; tanpa ubah skema | Tabrakan visual dengan Fase E; perlu aturan "kelas mendahului nomor minggu" di dokumen | Ya (satu huruf) |
| 2. `Q-` (quantum) | `Q-XI1-M1` | Tidak bertabrakan dengan fase maupun jalur lain; mnemonik jelas | Menyimpang dari urutan huruf; nama jalur "E" dan kode "Q" berbeda | Ya (satu huruf) |
| 3. Awalan beberapa huruf | `KU-XI1-M1` atau `JE-XI1-M1` | Unik; ada preseden awalan beberapa huruf (`FND-`) | Perlu perubahan pola skema (huruf tunggal) pada `src/schema/sma-common.ts` dan `sma-week.ts`; menyimpang dari pola satu huruf | Tidak (butuh ubah skema) |

Jalur E hanya berjalan di kelas XI–XII menurut rekomendasi bagian 3, sehingga
segmen kelas selalu `XI` atau `XII` dan tidak pernah `X`; itu mengurangi
(tidak menghilangkan) kerancuan pada opsi 1.

Rekomendasi penyusun: **opsi 1 (`E-`)**, dengan satu aturan di silabus
("kode minggu selalu memuat segmen kelas dan diakhiri `M<n>`; kode butir CP
selalu `E-` atau `F-` diikuti elemen dua huruf") dan tanpa ubah skema; opsi
2 (`Q-`) adalah cadangan bila pemilik menilai kerancuan lisan lebih mahal
daripada penyimpangan urutan. Keputusan milik pemilik (pertanyaan terbuka 2).

## 9. Pertanyaan terbuka untuk pemilik

Setiap butir menyebut opsi dan rekomendasi penyusun; jawaban diminta lewat
orchestrator.

| No. | Pertanyaan | Opsi | Rekomendasi penyusun |
| --- | --- | --- | --- |
| 1 | Rentang kelas | (a) XI–XII (empat semester, inti dua semester); (b) X–XII; (c) hanya XI | (a) (bagian 3) |
| 2 | Awalan kode minggu | (a) `E-`; (b) `Q-`; (c) awalan beberapa huruf (ubah skema) | (a) dengan aturan penulisan (bagian 8) |
| 3 | Stack inti murid | (a) Quirk + simulator buatan sendiri; (b) Qiskit + Aer untuk murid; (c) pustaka JS | (a); Qiskit hanya demonstrasi guru (bagian 6.2) |
| 4 | Akses cloud quantum | (a) demonstrasi guru; (b) hanya simulator; (c) akun murid | (a); (c) tidak disarankan (bagian 6.3, 6.4) |
| 5 | Matematika yang belum ada di seri #87 (vektor, matriks, kompleks, probabilitas) | (a) dibangun tiga minggu di dalam jalur E (`E-XI1-M2..M4`); (b) ditambah modul `matkom-*` baru di seri #87; (c) mensyaratkan murid sudah mempelajarinya di Matematika | (a), dengan opsi mempromosikan menjadi modul `matkom-*` setelah dicoba |
| 6 | Python di jalur E | (a) hanya demonstrasi guru; (b) diajarkan murid | (a) |
| 7 | Prasyarat pemrograman | (a) wajib telah menyelesaikan dasar jalur A atau B; (b) mandiri dengan alat visual dan simulator buatan sendiri opsional | (a) untuk minggu simulator; bagian konsep terbuka untuk semua |
| 8 | Akun lembaga untuk demonstrasi | (a) akun sekolah atau lembaga; (b) akun guru; (c) tanpa demonstrasi nyata | (a); verifikasi syarat usia dan akun lembaga di ketentuan layanan terkini |
| 9 | Beban jam | (a) 3 JP per minggu seperti jalur lain; (b) 2 JP ditambah 1 JP mandiri | (a) |

## 10. Sumber dan batasan

| Sumber | Status (akses 2026-11-19) |
| --- | --- |
| `https://quantum.cloud.ibm.com/docs/en/guides/plans-overview` | Dibuka. Kuota Open Plan, promosi, wilayah. |
| `https://quantum.cloud.ibm.com/docs/en/guides/responsibilities` | Dibuka. Tidak ada pernyataan usia. |
| `https://quantum.ibm.com/terms` | Dialihkan (301) ke beranda; teks perjanjian **tidak dibuka**. |
| `https://aws.amazon.com/braket/pricing/` | Dibuka. Tarif dan paket gratis; ada ketidakkonsistenan contoh di halaman itu. |
| `https://aws.amazon.com/agreement/` | Dibuka. Pernyataan kecakapan hukum. |
| `https://learn.microsoft.com/en-us/azure/quantum/overview-azure-quantum` | Dibuka. Persyaratan akun dan penyedia. |
| `https://learn.microsoft.com/en-us/azure/quantum/pricing` | Dibuka. Harga penyedia. |
| `https://github.com/Strilanc/Quirk` | Dibuka. Lisensi Apache-2.0, 16 qubit, berbasis peramban. |
| `https://github.com/quantastica/quantum-circuit` | Dibuka. Lisensi MIT; tanggal commit terakhir tidak terlihat. |
| `https://github.com/Qiskit/qiskit`, `https://github.com/Qiskit/qiskit-aer` | Dibuka. Lisensi Apache-2.0; instruksi `pip install qiskit-aer`. Versi Python yang didukung tidak terbaca di halaman. |
| `https://qiskit.qotlabs.org/docs/guides/local-simulators` | Dibuka; keaslian domain `[belum terverifikasi]`. Batas "sekitar 50 qubit" simulator berasal dari halaman ini. |
| Ringkasan hasil pencarian (penghentian simulator awan IBM 15 Mei 2024; keterlibatan orang tua pada perjanjian IBM) | **Tidak dibuka dari sumbernya**; `[belum terverifikasi]`. |

Batasan:

- Tidak ada sumber CP baru; kutipan CP hanya dari silabus bagian 1.3.
- Penyusun tidak menjalankan atau memasang perangkat lunak apa pun
  (tidak ada `pip`, `npm`, `bunx`, `npx`) dan tidak membuat akun layanan;
  seluruh klaim layanan berasal dari halaman publik yang dibaca.
- Harga dan kuota cepat basi; seluruh tabel bagian 6.4 harus dicek ulang
  sebelum keputusan atau pelaksanaan.
- Isi pedagogis (urutan topik, kelayakan menjalankan Grover kecil di
  perangkat nyata, hasil pada derau) adalah rancangan penyusun dan belum
  diuji.
- Berkas yang dirujuk (`silabus-v1.1-draf.md`,
  `rancangan-seri-matematika-komputasi.md`, `rancangan-seri-cloud.md`) ada di
  branch utama pada saat penulisan; tautan relatif baru valid setelah
  penggabungan.
- Rencana belum diuji di kelas.

## Changelog

| Versi | Tanggal | Perubahan |
| --- | --- | --- |
| v0.1.0 | 2026-11-19 | Draf awal (issue #88): tujuan, rekomendasi rentang XI–XII, prasyarat dan ketergantungan, rencana mingguan empat semester, opsi stack dan akses cloud quantum dengan sumber bertanggal, kebijakan akun tanpa data siswa, posisi terhadap CP, analisis tabrakan kode minggu, sembilan pertanyaan terbuka. |
