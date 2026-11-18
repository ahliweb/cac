# Rancangan Seri Modul Cloud Computing untuk Program Coding SMA

- **Version:** v0.2.0
- **Last updated:** 2026-11-19
- **Status:** Rancangan DISETUJUI pemilik 2026-11-19 beserta ketujuh rekomendasi (issue #89); modul belum ada di repositori (menunggu skema indeks #106); modul yang kelak ditulis berstatus draf sampai ditinjau pemilik
- **Changeset:** Mencatat persetujuan rancangan oleh pemilik (2026-11-19, tujuh rekomendasi); kode minggu diperbarui dari silabus v1.0 ke v1.1 memakai tabel padanan silabus bagian 3.0; pertanyaan terbuka ditandai terjawab.

> **Rancangan disetujui pemilik pada 2026-11-19** (dialog pilihan, dicatat
> di komentar issue #89) beserta **ketujuh rekomendasi** di bagian 7
> (opsi 1a, 2a, 3a, 4a, 5a, 6a, 7a). Yang disetujui adalah **rancangan**;
> **modulnya belum ditulis ke repositori** dan modul yang kelak ditulis
> berstatus `draf` sampai pemilik meninjau dan menyetujuinya per modul
> (ADR-0007). Dokumen ini adalah konten karangan menurut
> [ADR-0007](../../architecture/adr/0007-authored-learning-content.md),
> bukan transkripsi sumber resmi. Rujukan silabus kini [v1.1](silabus.md)
> (disetujui 2026-11-19). Pengindeksan modul menunggu skema indeks sma-coding
> (#106).

## 0. Cara membaca dokumen ini

- `[belum terverifikasi]` berarti klaim tidak dapat dipastikan dari sumber
  yang benar-benar dibuka penyusun pada 2026-11-18; jangan diperlakukan
  sebagai fakta.
- `[asumsi]` berarti keputusan perancangan penyusun, bukan data resmi.
- Kode minggu dan kode butir CP dipakai persis seperti di
  [silabus.md](silabus.md) v1.1 (bagian 0, 1.4, 3), termasuk blok fondasi
  `FND-X1-M1` sampai `M7`. Dokumen ini tidak membuat kode baru. Pada v0.2.0
  kode kelas X dipetakan ulang dari v1.0 ke v1.1 memakai tabel padanan di
  silabus bagian 3.0 dan diperiksa terhadap `data/sma-coding/weeks.json` dan
  `foundation.json` (2026-11-19); kode kelas XI dan XII tidak berubah.
  `FND-X1-M7` (E-LD-d, perangkat pengolah dokumen) tidak dipakai sebagai
  prasyarat di sini.

## 1. Latar dan keputusan pemilik

Pemeriksaan 2026-11-18: cloud computing belum ada sebagai materi ajar di
repositori. Yang ada hanya pemetaan standar ISO/IEC 27017 dan 27018 pada
dokumen tata kelola (`docs/silabus/11-pemetaan-iso.md`,
`docs/governance/security.md`), yaitu untuk pengelolaan platform, bukan untuk
siswa. Rumusan CP yang dikutip silabus (bagian 1.3) juga tidak menyebut kata
"cloud" atau "komputasi awan" sama sekali, sehingga seri ini **di luar
rumusan CP** dan hanya bersinggungan dengan butir CP tertentu.

**Keputusan pemilik (2026-11-18, dialog pilihan, issue #89):** seri modul
cloud **terpisah**, **lintas jalur**, sebagai **pengayaan**.

**Persetujuan rancangan (2026-11-19, dialog pilihan, issue #89):** pemilik
menyetujui rancangan seri beserta **ketujuh rekomendasi** di bagian 7. Modul
ditulis berstatus `draf`.

## 2. Tujuan

Setelah seri ini, siswa mampu:

1. menjelaskan apa itu cloud computing dan membedakannya dari "komputer
   orang lain yang disewa lewat internet" secara konseptual;
2. membedakan IaaS, PaaS, dan SaaS dengan contoh;
3. menjelaskan region dan zona ketersediaan serta dampaknya pada
   kecepatan, ketersediaan, dan lokasi data;
4. menjelaskan model tanggung jawab bersama (apa yang dijaga penyedia, apa
   yang dijaga pengguna);
5. membaca model tagihan dan mengenali jebakan biaya;
6. menjelaskan prinsip keamanan dan privasi di cloud, termasuk apa yang
   dibahas ISO/IEC 27017 dan 27018 secara konseptual;
7. (jalur B) memahami alur menerbitkan aplikasi sederhana ke lingkungan
   yang bukan komputer sendiri, tanpa mengelola kredensial dan tanpa biaya.

Bukan tujuan: mendidik siswa menjadi administrator cloud, menyiapkan
sertifikasi vendor, atau mewajibkan akun pada penyedia mana pun.

## 3. Daftar modul

Tujuh modul `[asumsi]`. Id memakai kebab-case dan awalan `cloud-`. Semua
kode minggu dan butir CP di tabel diambil dari silabus v1.1 (bagian 3 dan
1.4); kolom "Minggu terkait" berarti **titik pelekatan** (modul dibawakan
sebagai pengayaan di sekitar minggu itu), bukan penggantian minggu.

| Id modul | Judul | Isi | Prasyarat | Kelas sasaran | Minggu jalur v1.1 terkait | Butir CP terkait |
| --- | --- | --- | --- | --- | --- | --- |
| `cloud-konsep-dasar` | Apa Itu Cloud Computing | definisi dan ciri (layanan sesuai permintaan, akses lewat jaringan, bersama-sama dipakai, tarif sesuai pemakaian); contoh sehari-hari; kapan cloud cocok dan tidak cocok | `FND-X1-M4`, `FND-X1-M5` (klien, server, internet, paket) | X | A: tidak ada minggu coding yang cocok, dibawakan bebas; B: `B-X2-M6` | E-LD-e (landasan; bukan pemenuhan) |
| `cloud-iaas-paas-saas` | IaaS, PaaS, dan SaaS | tiga model layanan dengan analogi (menyewa lahan, gedung, atau kantor siap pakai); contoh layanan tanpa mewajibkan merek tertentu; memilih model untuk kebutuhan | `cloud-konsep-dasar`; `FND-X1-M2` (peran OS) | X atau XI | A: `A-XI1-M1`; B: `B-XI1-M1` | F-BK-a (proses rekayasa; landasan) |
| `cloud-layanan-dan-region` | Layanan, Region, dan Ketersediaan | jenis layanan umum (komputasi, penyimpanan, basis data, jaringan, kontainer); region dan zona; latensi, ketersediaan, redundansi, lokasi data dan implikasi hukum secara konseptual | `cloud-iaas-paas-saas`; `FND-X1-M4` (alamat IP, DNS, HTTP) | XI | A: `A-XI2-M9`; B: `B-XI2-M11` | F-BK-d (jaringan; landasan) |
| `cloud-tanggung-jawab-bersama` | Model Tanggung Jawab Bersama | batas tanggung jawab penyedia dan pengguna per model layanan; contoh insiden akibat salah konfigurasi pengguna; daftar periksa "apa bagian saya" | `cloud-iaas-paas-saas`; `FND-X1-M6` (keamanan dasar) | XI | B: `B-XI2-M10`; A: dibawakan bebas | F-LD-e (landasan); E-LD-l |
| `cloud-biaya-dan-tagihan` | Biaya dan Jebakan Tagihan | model tarif (per jam, per gigabita, per permintaan, keluar-masuk data); tingkat gratis dan batasnya; jebakan umum (sumber daya lupa dimatikan, kunci bocor dipakai penambang kripto, transfer data keluar, uji coba yang berubah berbayar); anggaran dan peringatan; estimasi biaya dengan lembar kerja berdata sintetis | `cloud-iaas-paas-saas`; `FND-X1-M6` | XI | B: `B-XI2-M10`, `B-XII1-M10` (rahasia); A: `A-XI2-M10` (rekap data, untuk latihan hitung tagihan sintetis) | F-LD-j (sebagian; hanya sisi keamanan biaya digital, bukan loka pasar); di luar rumusan CP untuk isi utama |
| `cloud-keamanan-dan-privasi` | Keamanan dan Privasi di Cloud | prinsip hak akses minimum, kata sandi, autentikasi dua langkah, enkripsi saat disimpan dan dikirim, pencatatan akses, pencadangan; data pribadi di cloud dan UU PDP secara pokok; pengantar konseptual ISO/IEC 27017 (kendali keamanan layanan cloud) dan ISO/IEC 27018 (perlindungan PII pada cloud publik) | `cloud-tanggung-jawab-bersama`; `FND-X1-M6` | XI atau XII | B: `B-XI2-M10`, `B-XII1-M10`, `B-XII2-M9`, `B-XII2-M10`; A: dibawakan bebas | E-LD-k, E-LD-l, F-LD-g, F-LD-i, F-LD-e (landasan) |
| `cloud-deploy-sederhana` | Menerbitkan Aplikasi Sederhana | alur kode lokal ke lingkungan lain (build, konfigurasi, variabel lingkungan, rahasia tidak di-commit, rilis); perbedaan lokal dan produksi; hubungan dengan template `awcms-one` (turunan memiliki backend, basis data, rahasia, dan domain sendiri; tidak memakai backend produksi `awcms-one`); dibawakan **lewat simulasi lokal atau demonstrasi guru** (bagian 5) | `cloud-biaya-dan-tagihan`; `cloud-keamanan-dan-privasi`; jalur B sampai `B-XI2-M1` dan `B-XI2-M12` | XII (jalur B) | `B-XI2-M1`, `B-XI2-M12`, `B-XII1-M3`, `B-XII1-M4`, `B-XII1-M5`, `B-XII1-M10`, `B-XII2-M9` | F-AP-d (library dan perangkat), F-BK-a, F-AP-c |

Catatan:

- **Butir CP:** kolom terakhir menandai butir yang disentuh, bukan yang
  dipenuhi. Karena rumusan CP tidak menyebut cloud, tidak ada butir yang
  dinyatakan tercakup oleh seri ini; "landasan" berarti memberi konteks pada
  butir tersebut. Isi inti seri (model layanan, region, biaya) berada
  **di luar rumusan CP**.
- **Lintas jalur:** modul 1 sampai 6 bersifat konseptual dan tidak
  memerlukan bahasa pemrograman tertentu; jalur A memakainya sebagai
  pengayaan bebas karena tidak ada minggu jalur A yang membahas jaringan
  atau layanan. Modul 7 hanya untuk jalur B karena bersandar pada Bun,
  `awcms-one`, dan Astro.
- **Waktu:** silabus tidak memiliki ruang kosong. Penyusun mengusulkan tiap
  modul sebagai pengayaan sekitar satu pertemuan (3 JP) `[asumsi]`; tempat
  memasukkannya (minggu cadangan, ekstrakurikuler, atau menukar proyek mini)
  adalah pertanyaan terbuka 2.
- **Urutan baca** menurut kolom prasyarat; modul 1 dan 2 bisa dibawakan di
  kelas X setelah blok fondasi, modul 3 sampai 6 di kelas XI, modul 7 di
  kelas XII.

### 3.1 Cakupan ISO/IEC 27017 dan 27018 (konseptual)

Seri hanya mengenalkan *apa fungsi* kedua standar, tanpa menguraikan pasal,
tanpa menyiratkan repositori ini atau penyedia mana pun tersertifikasi.

| Standar | Penjelasan untuk siswa | Status verifikasi |
| --- | --- | --- |
| ISO/IEC 27017 | Panduan kendali keamanan informasi untuk penyediaan dan penggunaan layanan cloud; menambah panduan pada kendali ISO/IEC 27002 dan memuat kendali khusus cloud; berlaku bagi penyedia maupun pelanggan layanan. | Definisi umum konsisten di beberapa situs sekunder (hasil pencarian 2026-11-18: cloudaware.com, bastion.tech, iso27001security.com). Halaman resmi iso.org untuk 27017 tidak dapat dibuka (HTTP 403 pada 2026-11-18). Edisi terbaru (repositori mencatat 27017:2026 di `docs/silabus/99-referensi.md`) `[belum terverifikasi]` dari sumber resmi. |
| ISO/IEC 27018 | Panduan perlindungan data pribadi (PII) pada cloud publik ketika penyedia bertindak sebagai pemroses data pribadi atas instruksi pelanggan. | Definisi dari situs sekunder (dataguard.com, iso27001security.com) dan halaman komite ISO yang memuat 27018:2025 edisi ketiga (hasil pencarian, 2026-11-18). Halaman resmi tidak dibuka penuh; isi pasal `[belum terverifikasi]`. |

Kaitan dengan program ini (ADR-0004): standar ini muncul sebagai contoh
**mengapa data siswa tidak dimasukkan ke cloud mana pun** tanpa dasar yang
jelas; latihan memakai data sintetis saja.

## 4. Praktik tanpa akun pribadi siswa dan tanpa biaya tak terduga

Syarat tetap (silabus bagian 7.2 dan 7.3, ADR-0004): **tidak ada siswa yang
wajib membuat akun pada penyedia cloud, tidak ada kartu kredit atau data
pembayaran, tidak ada data pribadi nyata, dan tidak ada kredensial di
repositori.** Setiap praktik harus tetap bisa dikerjakan jika semua opsi
berakun ditolak sekolah.

### 4.1 Opsi dan trade-off

| Opsi | Uraian | Kelebihan | Kekurangan |
| --- | --- | --- | --- |
| A. Simulasi dan permainan peran | Kartu peran penyedia, pengguna, region; lembar kerja tagihan sintetis; diagram tanggung jawab; studi kasus tertulis | Biaya nol; tanpa akun; tanpa perangkat; cocok semua sekolah | Tidak menyentuh konsol atau layanan nyata |
| B. Lokal: server dan kontainer di mesin lab | Jalur B: `Bun.serve` lokal sebagai "server"; membaca alur build dan variabel lingkungan; kontainer lokal memakai Docker hanya bila lab sudah menyiapkannya untuk `awcms-one` (silabus bagian 6.4, 7.2); emulator layanan cloud lokal (nama dan kebijakan lisensi `[belum terverifikasi]`; tidak dipasang atau dipilih oleh dokumen ini) | Tanpa akun dan tanpa biaya; latihan sebenarnya pada perintah dan konfigurasi | Docker dan emulator memberatkan mesin lab; emulator bukan layanan sungguhan sehingga perilaku dan batas berbeda |
| C. Akun sekolah atau guru, didemonstrasikan guru | Satu akun milik sekolah atau guru, dipakai guru untuk demonstrasi di layar; siswa mengamati, bertanya, dan mengisi lembar pengamatan | Pengalaman konsol nyata; siswa tanpa akun | Risiko tagihan dan kunci bocor jatuh ke sekolah atau guru; perlu batas anggaran, peringatan, dan penghapusan sumber daya setelah demonstrasi; sekolah harus mau menyimpan kartu pembayaran `[asumsi]` |
| D. Tier gratis atau program pendidikan penyedia, akun siswa sendiri | Siswa mendaftar sendiri pada program pendidikan atau tier gratis | Praktik langsung dan sertifikat pembelajaran | Bertentangan dengan "tanpa akun pribadi siswa wajib" bila diwajibkan; pendaftaran meminta data pribadi; ketentuan berubah-ubah; kartu pembayaran mungkin diminta; risiko tagihan pada keluarga siswa |

### 4.2 Fakta program pendidikan yang diperiksa (dicek 2026-11-18)

Fakta ini hanya untuk menilai opsi D; tidak ada yang menjadi dasar kewajiban.

| Program | Yang terverifikasi | Sumber dan batas |
| --- | --- | --- |
| AWS Educate | Halaman resmi menyebut program gratis, terbuka untuk pembelajar mulai usia 13 tahun yang mendaftar dengan surel, "No credit card needed", dengan lab praktik. Pendaftaran meminta antara lain nama, negara, bulan dan tahun lahir (dari panduan pihak ketiga; halaman resmi hanya menyebut surel). Ada akun "starter" tanpa kartu dengan batas kredit (sumber sekunder). | `https://aws.amazon.com/education/awseducate/` dibuka dan dibaca ringkas 2026-11-18; syarat pendaftaran, batas kredit akun starter, dan apakah lab memerlukan akun yang menyimpan data pribadi `[belum terverifikasi]`. |
| GitHub Student Developer Pack | Dokumentasi resmi: dapat dilamar oleh "a student or faculty member at an accredited educational institution"; batas usia tidak tercantum di halaman itu. Hasil pencarian: usia minimum 13 tahun; kredit Azure penuh untuk usia 18 tahun ke atas, dan ada entri terpisah Azure untuk usia 13-17 dengan akses terbatas. Klaim "tanpa kartu kredit" untuk Azure bertentangan antara halaman GitHub dan jawaban komunitas Microsoft (Maret 2026). | `https://docs.github.com/en/education/about-github-education/github-education-for-students/about-github-education-for-students` dibuka 2026-11-18; pencarian web (education.github.com, learn.microsoft.com) tidak dibuka langsung. Rincian usia, kartu, dan isi paket `[belum terverifikasi]`. Pendaftaran memerlukan bukti status pelajar, yaitu data pribadi. |
| Penyedia lain (kredit uji coba, tier gratis permanen) | Tidak diperiksa. | `[belum terverifikasi]`; tidak boleh diasumsikan. |

Kesimpulan penyusun dari fakta di atas: syarat dan angka program berubah
dan sebagian bertentangan antar sumber, jadi modul **tidak boleh bergantung
pada** satu program pun. Modul hanya boleh menyebutnya sebagai contoh dan
mengarahkan pembaca ke halaman resmi saat itu.

### 4.3 Rekomendasi penyusun

**Rekomendasi: A + B sebagai praktik wajib, C opsional, D hanya anjuran
sukarela tanpa penilaian.**

1. Seluruh latihan inti dikerjakan dengan opsi A (kertas, simulasi, lembar
   tagihan sintetis) dan, untuk jalur B, opsi B (server lokal, variabel
   lingkungan, alur build). Tidak ada yang memerlukan akun.
2. Guru yang sekolahnya sudah memiliki akun cloud boleh melakukan
   demonstrasi (opsi C) dengan aturan: anggaran dan peringatan dipasang
   sebelum kelas, sumber daya dihapus setelah demonstrasi, kunci tidak
   ditempel di layar atau berkas bersama, dan tidak ada data siswa.
3. Siswa yang ingin mencoba sendiri (opsi D) hanya diberi informasi dan
   peringatan biaya; ini tidak dinilai, tidak diwajibkan, dan tidak diminta
   dibuktikan. Orang tua atau wali memutuskan.

Penilaian 11 kriteria singkat (3 = kuat, 1 = lemah; penilaian penyusun):

| Kriteria | A | B | C | D |
| --- | --- | --- | --- | --- |
| Keamanan dan privasi | 3 | 3 | 2 | 1 |
| Biaya tak terduga | 3 | 3 | 2 | 1 |
| Aksesibilitas bagi sekolah beragam | 3 | 2 | 2 | 1 |
| Kedalaman pengalaman nyata | 1 | 2 | 3 | 3 |
| Pemeliharaan materi (ketahanan terhadap perubahan penyedia) | 3 | 2 | 1 | 1 |
| Kompleksitas operasional | 3 | 2 | 1 | 1 |
| Kompatibilitas dengan ADR-0004 dan silabus 7.3 | 3 | 3 | 2 | 1 |

Kriteria lain (skalabilitas, SEO, UI/UX, implikasi jangka panjang) tidak
membedakan opsi secara berarti.

### 4.4 Aturan konten modul

- Tidak ada kunci akses, token, kata sandi, ID akun, atau alamat surel nyata
  di modul maupun repositori; contoh memakai penanda jelas palsu
  (`<KUNCI-RAHASIA-CONTOH>`, `akun-contoh`).
- Angka harga di modul adalah contoh sintetis bersatuan jelas; harga nyata
  dirujuk ke halaman resmi penyedia dengan tanggal akses, bukan disalin.
- Setiap modul memuat kotak peringatan biaya sebelum latihan yang menyentuh
  layanan nyata.
- Modul tidak menyebut satu merek sebagai syarat; merek hanya sebagai contoh.

## 5. Bentuk modul

Mengikuti gaya
[`content/osn/modules/dasar-pemrograman.md`](../../../content/osn/modules/dasar-pemrograman.md)
`[asumsi]`: satu berkas Markdown per modul di
`content/sma-coding/modules/<id>.md`, berbahasa Indonesia, dengan bagian
"Untuk siapa modul ini" (sasaran, prasyarat, tujuan, cara memakai),
penjelasan konsep berjenjang, contoh, lalu latihan dan lembar periksa
kosong. Perintah (mis. menjalankan server lokal) ditulis sebagai **teks**
dalam blok kode tanpa penanda ` ```cpp `, sehingga `check:module-code`
tidak relevan. Latihan memakai data sintetis. Tiap modul berstatus `draf`
dan menampilkan spanduk "DRAF — belum ditinjau" sampai pemilik menyetujui
(ADR-0007). Daftar rujukan tiap modul mencantumkan sumber resmi bertanggal
akses. Modul praktik (7) memuat bagian terpisah "Jika sekolah tidak
mengizinkan akun" yang selalu bisa dikerjakan.

## 6. Kebutuhan skema indeks modul `sma-coding`

Hanya dicatat; analisis skema dikerjakan di seri matematika (#87) secara
paralel dan tidak diulang di sini. Skema saat ini (`src/schema/module.ts`,
dibaca 2026-11-18) menuntut:

| Bidang saat ini | Kebutuhan seri cloud |
| --- | --- |
| `topicFamilies` (min 1, id rumpun materi) | Seri cloud bukan rumpun OSN dan tidak punya `data/sma-coding/` rumpun; perlu bidang pengelompokan "seri" atau rumpun yang sah untuk `sma-coding`. |
| `weeks` (bilangan bulat 1 sampai batas) | Minggu `sma-coding` berkode `A-X1-M9`, `B-XII1-M4`, `FND-X1-M<n>`; perlu rujukan ke kode minggu, dan modul lintas jalur mungkin merujuk minggu beberapa jalur. |
| (tidak ada) | Bidang prasyarat antarmodul dan kelas sasaran. |
| (tidak ada) | Bidang butir CP terkait, dengan nilai kosong sah untuk "di luar rumusan CP". |
| `contentPath` | Sudah sesuai pola `content/<program>/modules/<id>.md`. |
| `references` (min 1) | Cukup (judul + URL https). |
| (belum ada) | `data/sma-coding/modules.json` belum ada; per ADR-0006 dan aturan repo urutannya skema lebih dulu, lalu data. |

## 7. Pertanyaan terbuka untuk pemilik

Keputusan ada pada pemilik; penyusun menyajikan opsi dan rekomendasi.

**Terjawab 2026-11-19 (komentar keputusan di issue #89):** pemilik
menyetujui rancangan beserta **ketujuh rekomendasi** di kolom
"Rekomendasi penyusun": opsi 1a, 2a, 3a, 4a, 5a, 6a, dan 7a. Seluruh
pertanyaan di bawah dengan demikian terjawab dengan opsi rekomendasi. Edisi
ISO/IEC 27017 tetap perlu dikonfirmasi dari sumber resmi sebelum modul
ditulis (pertanyaan 5), dan fakta program penyedia diperiksa ulang dengan
tanggal akses saat modul 5 dan 7 ditulis (pertanyaan 7).

| No. | Pertanyaan | Opsi | Rekomendasi penyusun (dipilih pemilik 2026-11-19) |
| --- | --- | --- | --- |
| 1 | Praktik | (a) Simulasi + lokal wajib, demonstrasi guru opsional, akun siswa hanya anjuran; (b) simulasi + lokal saja, tanpa demonstrasi dan tanpa anjuran akun; (c) mengizinkan akun siswa sebagai bagian penilaian | (a). Memberi pengalaman nyata bagi yang mampu tanpa mewajibkan siapa pun. Opsi (c) bertentangan dengan silabus 7.2 dan tidak disarankan. |
| 2 | Tempat dalam kalender | (a) pengayaan di luar jam wajib (ekstrakurikuler atau minggu cadangan); (b) menggantikan sebagian proyek mini; (c) menambah satu minggu di tiap semester | (a). Tidak mengubah silabus dan sesuai keputusan pemilik "pengayaan". |
| 3 | Jumlah modul | (a) tujuh modul seperti rancangan; (b) lima modul (menggabungkan 2 dengan 3, dan 5 dengan 6 `[asumsi]`); (c) tiga modul inti (1, 4, 6) | (a). Tiap modul tetap satu topik kecil; bila beban penulisan jadi masalah, mulai dari 1, 2, 4, 5, 6 dahulu. |
| 4 | Modul 7 (jalur B) | (a) tetap, hanya simulasi dan demonstrasi; (b) ditunda sampai jalur B XII diuji di kelas; (c) dihapus | (a). Relevansi dengan `awcms-one` adalah keputusan pemilik; modul tidak memuat langkah penerbitan sungguhan ke akun siswa. |
| 5 | Pengantar ISO/IEC 27017/27018 | (a) tetap konseptual satu bagian di modul 6; (b) dihapus dari materi siswa; (c) modul sendiri | (a). Sesuai permintaan pemilik; standar disebut sebagai gambaran, tanpa klaim sertifikasi. Edisi 27017 perlu dikonfirmasi dari sumber resmi sebelum ditulis. |
| 6 | Kaitan formal dengan CP | (a) tetap "di luar rumusan CP", tanpa menambah butir; (b) usulkan butir CP baru ke silabus v1.1 | (a). Rumusan CP tidak menyebut cloud; membuat butir baru berarti mengubah silabus. |
| 7 | Verifikasi fakta penyedia sebelum ditulis | (a) penyusun memeriksa ulang halaman resmi saat menulis modul 5 dan 7; (b) modul tidak menyebut program penyedia sama sekali | (a), dengan tanggal akses. |

## 8. Hubungan dengan issue lain

| Issue | Hubungan |
| --- | --- |
| #86 (fondasi kelas X) | Prasyarat konsep jaringan (`FND-X1-M4`, `M5`) dan keamanan (`FND-X1-M6`). Fondasi sudah diterapkan di silabus v1.1 (#92, disetujui 2026-11-19); bila nomor minggu fondasi berubah lagi, kolom prasyarat dirapikan. |
| #87 (seri matematika) | Skema indeks modul `sma-coding` dianalisis di sana; kebutuhan seri ini dicatat di bagian 6. Pekerjaan skemanya dicatat di #106. |
| #69 (modul pendamping literasi digital) | Beririsan pada keamanan dan literasi data; batasnya perlu dijaga agar tidak ganda. |
| #52 (silabus v1.0) dan #92 (silabus v1.1) | Rujukan kode minggu dan butir CP kini ke v1.1; silabus tidak diubah oleh seri ini. |

## 9. Sumber dan batasan

| Sumber | Dipakai untuk | Status |
| --- | --- | --- |
| [`silabus.md`](silabus.md) v1.1.0 | Kode minggu, kode butir CP, kutipan CP, perangkat lab, privasi, `awcms-one` | Dibaca 2026-11-18 (v1.0); kode minggu dipetakan ke v1.1 dan diperiksa terhadap `data/sma-coding/` pada 2026-11-19. |
| [`usulan-fondasi-kelas-x.md`](usulan-fondasi-kelas-x.md) v0.2.0 | Kode `FND-X1-M<n>` | Dibaca 2026-11-18. |
| ADR-0004, 0006, 0007 | Aturan privasi, multi-program, konten karangan | Dibaca. |
| `docs/silabus/11-pemetaan-iso.md`, `docs/silabus/99-referensi.md`, `docs/governance/security.md` | Posisi ISO/IEC 27017 dan 27018 di repositori | Dibaca; tidak diubah. |
| `https://aws.amazon.com/education/awseducate/` | Usia 13+, tanpa kartu kredit, lab praktik | Dibuka 2026-11-18 lewat pembaca halaman otomatis (ringkasan); rincian `[belum terverifikasi]`. |
| `https://docs.github.com/en/education/about-github-education/github-education-for-students/about-github-education-for-students` | Syarat pelamar GitHub Education | Dibuka 2026-11-18 (ringkasan). |
| Hasil pencarian web (education.github.com, learn.microsoft.com, aws.amazon.com/educate, situs sekunder tentang ISO) | Klaim usia, kartu, definisi 27017 dan 27018 | Tidak semuanya dibuka; ditandai `[belum terverifikasi]`. |
| `https://www.iso.org/standard/43757.html` | Edisi dan ruang lingkup ISO/IEC 27017 | Gagal dibuka (HTTP 403, 2026-11-18). |

Batasan:

- Dokumen ini tidak memverifikasi regulasi atau nomor SK baru.
- Syarat, kuota, dan harga program penyedia cloud berubah cepat; tanggal
  akses wajib dicantumkan ulang di modul.
- Rancangan belum diuji di kelas; kesiapan lab dan kemauan sekolah memegang
  akun cloud (opsi C) adalah asumsi.
- Tidak ada perangkat lunak yang dipasang dan tidak ada akun yang dibuat
  dalam menyusun rancangan ini.

## Changelog

| Versi | Tanggal | Perubahan |
| --- | --- | --- |
| v0.2.0 | 2026-11-19 | Rancangan disetujui pemilik beserta ketujuh rekomendasi (issue #89); status, kotak catatan, dan pertanyaan terbuka diperbarui; kode minggu dipetakan dari v1.0 ke v1.1 (tabel padanan silabus bagian 3.0): `B-X2-M3` (DOM) menjadi `B-X2-M6`, contoh kode di bagian 6 `A-X1-M3` menjadi `A-X1-M9`; kode kelas XI dan XII tidak berubah. |
| v0.1.0 | 2026-11-18 | Rancangan awal (issue #89): tujuan, tujuh modul dengan pemetaan minggu dan butir CP, opsi praktik tanpa akun siswa dengan rekomendasi, aturan konten, kebutuhan skema indeks, pertanyaan terbuka, sumber. Status DRAF. |
