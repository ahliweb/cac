# Tinjauan Ilmiah 16 Modul Draf `sma-coding`: Seri Cloud dan Modul Pendamping

- **Version:** v0.1.0
- **Last updated:** 2026-11-19
- **Status:** **DRAF** (tinjauan penyusun untuk pemilik, issue #125). Bukan persetujuan. Semua modul yang ditinjau tetap berstatus `draf` di `data/sma-coding/modules.json`; hanya pemilik yang dapat menetapkan `disetujui` ([ADR-0007](../../../architecture/adr/0007-authored-learning-content.md)).
- **Changelog:**
  - v0.1.0 (2026-11-19): tinjauan awal atas keadaan modul di `main` 8cdd753 (sebelum revisi). Metode, tabel ringkas, temuan rinci per modul, dan keputusan yang tetap milik pemilik.

> **DRAF, bukan keputusan pemilik.** Rekomendasi status di bawah adalah
> pendapat penyusun yang membantu pemilik memutuskan. Penyusun tidak
> menulis `review`, `approvedOn`, atau `disetujui` di mana pun.

## 1. Lingkup

Enam belas modul di `content/sma-coding/modules/` beserta entri indeksnya di `data/sma-coding/modules.json`:

| Kelompok | Modul |
| --- | --- |
| Seri cloud (7) | `cloud-konsep-dasar`, `cloud-iaas-paas-saas`, `cloud-layanan-dan-region`, `cloud-tanggung-jawab-bersama`, `cloud-biaya-dan-tagihan`, `cloud-keamanan-dan-privasi`, `cloud-deploy-sederhana` |
| Modul pendamping literasi digital (9) | `pendamping-periksa-fakta-dan-baca-lateral`, `pendamping-menyaring-konten-negatif`, `pendamping-riset-dan-verifikasi-konten`, `pendamping-profesi-informatika-dan-budaya-digital`, `pendamping-teknologi-dan-demokrasi`, `pendamping-transaksi-digital-aman`, `pendamping-merancang-kebutuhan-sistem`, `pendamping-model-jaringan-dan-troubleshooting`, `pendamping-keamanan-lanjut-konektivitas` |

Modul `fondasi-*` dan `matkom-*` ditinjau terpisah dan tidak dibahas di sini.

## 2. Metode singkat

Semua pemeriksaan dilakukan 2026-11-19.

| Aspek | Cara |
| --- | --- |
| Daftar periksa pemilik | Tujuh aspek di [`docs/panduan/pemilik-peninjau.md`](../../../panduan/pemilik-peninjau.md), bagian "Daftar periksa review". |
| Kode | Tidak ada blok `cpp` di keenam belas modul (`grep` menghitung nol). Satu-satunya kode yang bisa dijalankan, `server.ts` di `cloud-deploy-sederhana`, dijalankan dengan Bun 1.4.4 tanpa variabel, dengan `PESAN_SAMBUTAN`, dan dengan berkas `.env`; keluarannya dicocokkan dengan klaim modul. Perintah jaringan (`ping`, `nslookup`) di `pendamping-model-jaringan-dan-troubleshooting`: `nslookup contoh.test` dijalankan (hasil `NXDOMAIN`); `ping` tidak bisa dijalankan di lingkungan peninjau (tanpa izin soket mentah), jadi tidak diverifikasi dengan eksekusi. |
| Kunci latihan | Setiap hitungan dihitung ulang; setiap kunci dicocokkan dengan isi modul. Modul tanpa kunci dicatat. |
| Rujukan | `curl` dengan User-Agent `curriculum-reference-check/1.0` untuk setiap URL; isi halaman dibaca untuk memeriksa klaim yang dikaitkan padanya. DOI diperiksa lewat Crossref (`api.crossref.org/works/<doi>`) dengan User-Agent yang sama. Regulasi diperiksa pada JDIH BPK (`peraturan.bpk.go.id`). |
| Kesesuaian silabus | `cpItems` dan `weekCodes` dicocokkan dengan `data/sma-coding/cp-elements.json` dan `weeks.json` (skrip sekali pakai); kutipan CP di tiap modul pendamping dicocokkan karakter demi karakter dengan `quotes` di `cp-elements.json`; butir AI dicocokkan dengan silabus v1.3 bagian 7.3 dan 7.4. |
| Dasar ilmiah | [`docs/riset/ilmu-belajar-kognitif.md`](../../../riset/ilmu-belajar-kognitif.md) bagian 3, 4.3, 5, 6.3, dan 8.2. Label rekomendasi mengikuti bagian 8: **K** = didukung bukti kuat (`[A]` atau `[B]` untuk prinsipnya); **M** = masuk akal tetapi bukti terbatas untuk pemrograman atau usia itu (`[inferensi]`). |

Batas pemeriksaan:

- `repositori.kemendikdasmen.go.id` (Panduan Mata Pelajaran Informatika, Fase D - F, 2025; satu-satunya rujukan di indeks sembilan modul `pendamping-*` dan tiga modul `cloud-*`) **tidak dapat dibuka dari lingkungan peninjau**: koneksi ke seluruh host kehabisan waktu (timeout 30 sampai 120 detik, tiga percobaan). Kutipan CP di modul cocok dengan transkripsi silabus (`cp-elements.json`), tetapi keberadaan URL itu **belum diverifikasi**; pemilik perlu membukanya dari jaringan lain.
- Halaman standar ISO (`iso.org/standard/43757.html`, `iso.org/standard/76559.html`) mengembalikan HTTP 403. Isi ISO/IEC 27018 tidak dapat diverifikasi dari sumber resmi ISO; ISO/IEC 27017 hanya dapat diperiksa lewat halaman ITU-T X.1631 (judul dan edisi, bukan isi pasal).
- Tidak ada ujicoba dengan siswa. Kesesuaian tingkat bahasa dan beban waktu dinilai dari teks, bukan dari pemakaian (itu aktivitas manusia nyata, tidak digantikan tinjauan ini).

Legenda unsur ilmiah (bagian 3 dan 4.3 riset): **IK** ingat kembali (3.1), **EB** ulang berjarak (3.2), **CT** contoh terselesaikan lalu *fading* (3.4), **PR** baca dan prediksi sebelum menulis (6.3), **LB** latihan bercampur (3.3), **UB** umpan balik berisi langkah berikutnya (3.8), **PD** penjelasan diri (3.6), **BD** membandingkan dua contoh (4.3).

## 3. Temuan lintas modul

1. **Tidak ada klaim pedagogi yang termasuk mitos** (bagian 5 riset: gaya belajar, otak kiri/kanan, 10% otak, piramida belajar, *digital native*, multitasking). Dicari dengan kata kunci dan dibaca; tidak ditemukan di keenam belas modul. Satu kebiasaan desain yang berdekatan dengan mitos "membaca ulang dan menyorot": **ketercapaian dinilai hanya lewat daftar periksa mandiri** (tertulis di "Catatan untuk guru" pada tujuh dari sembilan modul pendamping; kesembilannya memakai daftar periksa "Saya dapat ..." sebagai satu-satunya penutup). Daftar periksa "Saya dapat ..." adalah penilaian diri; riset 3.9 dan 3.1 menunjukkan penilaian diri sering tidak sejalan dengan kinerja sebenarnya (Roediger dan Karpicke, 2006; Karpicke dan Roediger, 2008; Soderstrom dan Bjork, 2015). Rekomendasi (`K`, bagian 3.1 dan 3.9): pertahankan daftar periksa, tetapi tambahkan pertanyaan uji tanpa melihat modul yang kuncinya bisa dicocokkan.
2. **Tidak satu pun dari enam belas modul memiliki bagian ingat kembali, ulang berjarak, atau latihan bercampur.** Hanya `pendamping-merancang-kebutuhan-sistem` (contoh terpandu lalu kasus) dan `pendamping-profesi-informatika-dan-budaya-digital` (kartu profil contoh lalu kartu sendiri) memiliki contoh terselesaikan yang memudar menjadi soal sendiri (`K`, 3.4).
3. **Sembilan modul pendamping tidak punya kunci atau petunjuk jawaban sama sekali.** Modul cloud punya "Petunjuk jawaban" tetapi umumnya hanya berupa jawaban, tanpa langkah berikutnya bila jawaban siswa meleset (`K`, 3.8: isi umpan balik lebih penting daripada ada tidaknya).
4. **Butir AI silabus v1.3 (bagian 7.3 dan 7.4) hampir tidak tercermin.** Aturan privasi AI ("tidak menaruh data pribadi, kata sandi, kunci, rahasia ... pada permintaan ke layanan AI") dan "verifikasi keluaran AI" tidak muncul di modul rahasia/kunci (`cloud-keamanan-dan-privasi`, `cloud-deploy-sederhana`, `cloud-biaya-dan-tagihan`), modul verifikasi (`pendamping-periksa-fakta-dan-baca-lateral`, `pendamping-riset-dan-verifikasi-konten`), maupun `pendamping-transaksi-digital-aman` dan `pendamping-keamanan-lanjut-konektivitas`. Modul tidak bertentangan dengan kebijakan AI (tidak ada yang menyuruh memakai AI atau menempelkan rahasia); celahnya adalah **ketiadaan**.
5. **Regulasi:** UU PDP (UU 27/2022 tentang Pelindungan Data Pribadi, ditetapkan 17 Oktober 2022, status "Berlaku") sesuai di JDIH BPK. **UU ITE disebut basi** di `pendamping-keamanan-lanjut-konektivitas` (lihat temuan KL-2): menurut JDIH BPK, Pasal 30 UU 11/2008 (akses ilegal) termasuk ketentuan yang dicabut oleh UU 1/2023 (KUHP), yang berlaku sejak 2 Januari 2026.
6. **Penyedia cloud:** semua fakta penyedia yang dikutip modul (AWS Free Tier, AWS Shared Responsibility Model, GitHub Education) dibuka dan cocok pada 2026-11-19. Tidak ada harga nyata di modul (semua angka ilustrasi). Penanda `[belum terverifikasi]` yang tersebar di teks siswa pada beberapa modul ditulis sebelum halaman sumber dibuka penuh; kini sebagian besar bisa diganti pernyataan terverifikasi bertanggal.
7. **`cpItems` pada modul seri cloud** mengikuti rancangan seri cloud yang sudah disetujui (kolom "Butir CP terkait" berarti butir yang *disentuh*, bukan yang dipenuhi). Dua entri sulit ditopang isi modul (lihat BT-3 dan DS-3); modul seri cloud selain `cloud-konsep-dasar` tidak menyebut sendiri bahwa butir itu hanya konteks.

## 4. Tabel ringkas per modul (sebelum revisi)

Kolom "Ketepatan", "Kode", "Kunci", "Rujukan", dan "Silabus": **OK** = tidak ada masalah; **Catatan** = masalah kecil; **Masalah** = salah atau menyesatkan (rinci di bagian 5). "Ilmiah ada / kurang" memakai legenda bagian 2.

| Id | Ketepatan | Kode | Kunci | Rujukan | Silabus | Ilmiah ada / kurang | Rekomendasi sebelum revisi |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `cloud-konsep-dasar` | Catatan (KD-1) | tak ada kode | OK (jawaban tanpa langkah berikutnya) | NIST SP 800-145 terbuka dan cocok; ditandai belum terverifikasi padahal bisa diverifikasi | OK (`B-X2-M6` titik pelekatan) | Ada: PD sebagian. Kurang: IK, EB, LB | **perlu revisi**: ganti penanda dengan fakta terverifikasi; tambah unsur ilmiah. |
| `cloud-iaas-paas-saas` | OK | tak ada kode | OK (ringkas) | NIST cocok | Catatan (IPS-1: F-BK-a tidak ditopang isi) | Ada: CT sebagian (analogi), PD sebagian (debat). Kurang: IK, EB, LB, contoh terselesaikan | **perlu revisi**: unsur ilmiah dan catatan CP. |
| `cloud-layanan-dan-region` | Masalah (LR-1: definisi zona kabur, penanda keliru) | tak ada kode | OK (hitungan benar) | AWS cocok; ditandai belum terverifikasi | OK | Ada: UB sebagian. Kurang: IK, EB, PR, LB, CT | **perlu revisi**: definisi zona dan unsur ilmiah. |
| `cloud-tanggung-jawab-bersama` | OK (kutipan AWS cocok) | tak ada kode | OK | AWS cocok | Catatan (butir hanya konteks) | Ada: IK sebagian (Latihan 1 menulis ulang tabel dari ingatan). Kurang: EB, LB, PD eksplisit | **perlu revisi**: unsur ilmiah; kasus insiden tanpa sumber. |
| `cloud-biaya-dan-tagihan` | Catatan (BT-1) | tak ada kode | Masalah (BT-2: Latihan 5 meminta lima langkah, kunci memuat tujuh) | AWS dan GitHub cocok | Masalah (BT-3: F-LD-j tidak ditopang isi) | Ada: UB. Kurang: CT, PR, IK, EB, LB | **perlu revisi**. |
| `cloud-keamanan-dan-privasi` | Catatan (KP-1: ISO) | tak ada kode | OK | UU PDP cocok; ISO tidak terbuka | Catatan (AI) | Ada: UB. Kurang: IK, EB, LB, CT | **perlu revisi**: fakta regulasi bertanggal, privasi AI, unsur ilmiah. |
| `cloud-deploy-sederhana` | Catatan (DS-1) | `server.ts` dijalankan: benar; modul mengaku "tidak dijalankan" | OK (kurang langkah bila rahasia sudah ter-commit) | Hanya panduan CP (tidak terbuka) | Masalah (DS-3: F-AP-d dan F-AP-c tidak ditopang isi) | Ada: kode lengkap untuk dibaca. Kurang: PR, IK, EB, LB | **perlu revisi**. |
| `pendamping-periksa-fakta-dan-baca-lateral` | Catatan (PF-1, PF-2) | tak ada kode | Masalah (tidak ada kunci) | Hanya panduan CP; tanpa bukti ilmiah untuk membaca lateral | OK | Ada: CT sebagian (Kasus 2). Kurang: PR, BD, UB, EB | **perlu revisi**. |
| `pendamping-menyaring-konten-negatif` | OK (satu celah keselamatan, MK-1) | tak ada kode | Masalah (tidak ada kunci) | Hanya panduan CP | OK | Kurang: IK, LB, BD, UB, EB | **perlu revisi**. |
| `pendamping-riset-dan-verifikasi-konten` | OK | tak ada kode | Masalah (tidak ada kunci) | Hanya panduan CP | OK (AI: RV-1) | Ada: PD sebagian. Kurang: IK, BD, LB, UB, EB | **perlu revisi**. |
| `pendamping-profesi-informatika-dan-budaya-digital` | Catatan (PB-1: tak ada peran AI) | tak ada kode | Masalah (tidak ada kunci) | Hanya panduan CP | OK | Ada: CT (kartu contoh lalu kartu sendiri). Kurang: BD, UB, EB | **perlu revisi**. |
| `pendamping-teknologi-dan-demokrasi` | Masalah (TD-1: gelembung informasi dinyatakan sebagai fakta) | tak ada kode | Masalah (tidak ada kunci) | Hanya panduan CP | OK | Kurang: IK, BD, LB, UB, EB | **perlu revisi**. |
| `pendamping-transaksi-digital-aman` | Catatan (TR-1: saran Wi-Fi umum) | tak ada kode | Masalah (tidak ada kunci) | Hanya panduan CP | OK (AI: lihat temuan lintas) | Kurang: IK, BD, LB, UB, EB | **perlu revisi**. |
| `pendamping-merancang-kebutuhan-sistem` | OK | tak ada kode | Masalah (tidak ada kunci) | Hanya panduan CP | OK | Ada: CT (contoh terpandu), BD sebagian (tabel opsi). Kurang: IK, PR, UB, EB | **perlu revisi** (ringan). |
| `pendamping-model-jaringan-dan-troubleshooting` | Masalah (MJ-1, MJ-2, MJ-3) | perintah `ping -c` hanya Linux/macOS; `nslookup contoh.test` selalu gagal di luar DNS lab | Masalah (kartu A sampai E tanpa kunci) | Hanya panduan CP | OK | Ada: CT sebagian (urutan diagnosis). Kurang: IK, PR, LB, UB, EB | **perlu revisi**. |
| `pendamping-keamanan-lanjut-konektivitas` | Masalah (KL-1: rencana alamat kurang satu segmen; KL-2: UU ITE basi) | tak ada kode | Masalah (tidak ada kunci) | Hanya panduan CP | OK | Ada: CT sebagian (daftar konfigurasi contoh). Kurang: IK, PR, BD, LB, UB, EB | **perlu revisi**. |

Ringkasan rekomendasi sebelum revisi: **16 modul `perlu revisi`, 0 `siap disetujui`, 0 `tarik`.** Tidak ada modul yang layak ditarik: isinya aman, selaras dengan rancangan yang disetujui, dan tidak berisi data pribadi atau klaim silabus palsu. Tidak ada yang siap disetujui karena semuanya kekurangan unsur ilmiah yang diminta, dan sembilan di antaranya tidak punya kunci jawaban.

## 5. Temuan rinci per modul

Format: **ID (lokasi di berkas sebelum revisi): masalah. Perbaikan.** Nomor baris merujuk berkas di `main` 8cdd753.

### 5.1 Seri cloud

#### `cloud-konsep-dasar`

- **KD-1 (baris 17, bagian "Lima ciri cloud"):** teks siswa memuat "`[belum terverifikasi]` ... ditulis dari pengetahuan penyusun". Dokumen NIST SP 800-145 (PDF `nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-145.pdf`, September 2011) dapat dibuka: lima ciri (*on-demand self-service*, *broad network access*, *resource pooling*, *rapid elasticity*, *measured service*), tiga model layanan, dan empat model penerapan (privat, komunitas, publik, hibrida) cocok dengan tabel modul. Perbaikan: hapus penanda, sebut bahwa lima ciri dicocokkan dengan dokumen NIST tanggal 2026-11-19, tambah catatan bahwa dokumen terbit 2011, dan daftarkan empat model penerapan (modul menyebut "empat model penerapan" tanpa menamainya).
- **KD-2 (kunci Latihan 1 sampai 4):** benar (urutan latihan 3 cocok dengan tabel). Hanya berupa jawaban; tidak ada langkah berikutnya bila siswa keliru. Perbaikan: tambah rujukan bagian ("bila keliru, baca ulang tabel lima ciri") pada petunjuk.
- **KD-3 (ilmiah):** tidak ada IK, EB, LB. Perbaikan: "Ingat kembali" (klien, server, DNS, paket dari `FND-X1-M4` dan `FND-X1-M5`) dan "Ulang berjarak".
- Silabus: `cpItems` E-LD-e ("keamanan dasar konektivitas jaringan") dinyatakan modul sendiri sebagai konteks, bukan pemenuhan: sudah benar. `weekCodes` `B-X2-M6` (DOM dan peristiwa) adalah titik pelekatan menurut rancangan seri cloud; kecocokan topik tidak ada, dan itu disengaja.

#### `cloud-iaas-paas-saas`

- **IPS-1 (indeks `cpItems`: F-BK-a):** F-BK-a ("alur proses pengembangan program atau produk digital") tidak disentuh isi modul (tidak ada pembahasan alur pengembangan). Menurut rancangan seri cloud butir ini hanya "landasan". Perbaikan: kalimat di bagian pembuka bahwa seri ini di luar rumusan CP dan butir itu hanya konteks. Entri `cpItems` dibiarkan (mengikuti rancangan yang disetujui); pemilik dapat memutuskan mengosongkannya (bagian 6).
- **IPS-2 (baris 9 sampai 27):** definisi tiga model cocok dengan NIST (IaaS: sistem operasi, penyimpanan, aplikasi; PaaS: aplikasi dan pengaturan lingkungan; SaaS: memakai aplikasi penyedia). Tidak ada kesalahan. Analogi warung (lahan, gedung, kios) diberi batas: tambahkan kalimat bahwa analogi hanya alat bantu.
- **IPS-3 (ilmiah):** tidak ada contoh terselesaikan sebelum Latihan 2; tidak ada IK, EB, LB. Perbaikan: contoh terselesaikan memilih model, lalu latihan memudar; "Latihan bercampur" yang mencampur ciri cloud dan model layanan.

#### `cloud-layanan-dan-region`

- **LR-1 (baris 21 sampai 22):** "zona ketersediaan ... listrik dan jaringan yang dibuat agak terpisah" kabur, dan penanda `[belum terverifikasi]` keliru: halaman AWS `regions_az` dapat dibuka dan menyatakan (per 2026-11-19) bahwa tiap Region AWS terdiri atas minimal tiga zona ketersediaan yang terpisah fisik, tiap zona punya daya, pendinginan, dan keamanan fisik yang independen dan dihubungkan jaringan berlatensi rendah yang redundan; halaman itu juga menyebut 124 zona di 39 region (angka ini mudah basi). Halaman yang sama menyebut penyedia lain sering mendefinisikan region sebagai satu pusat data. Perbaikan: definisi umum, contoh AWS bertanggal, dan peringatan bahwa istilah berbeda antarpenyedia.
- **LR-2 (baris 26):** latensi dijelaskan hanya oleh jarak. Jumlah perangkat yang dilalui paket (*hop*) dan kepadatan jaringan juga berpengaruh. Perbaikan: satu kalimat tambahan, tanpa angka.
- **LR-3 (Latihan 2):** hitungan benar (10 x 20 = 200 ms; 10 x 200 = 2000 ms). Tidak ada prediksi sebelum menghitung. Perbaikan: "Prediksi dulu" (tebak rasio lebih dulu).
- **LR-4:** tidak ada IK, EB, LB, contoh terselesaikan. Perbaikan sesuai pola.

#### `cloud-tanggung-jawab-bersama`

- **TJ-1 (baris 11):** kutipan "of the cloud" dan "in the cloud" dan contoh EC2 (sistem operasi tamu, pembaruan, aplikasi, pengaturan firewall) serta S3 (data, pilihan enkripsi, izin akses) cocok dengan halaman AWS pada 2026-11-19. Benar.
- **TJ-2 (baris 29):** "Pola yang sering terjadi di dunia nyata" tidak diberi sumber. Perbaikan: nyatakan bahwa kasus nyata tidak disebut karena tidak diperiksa sumbernya; guru menyiapkan sumber bertanggal bila memakai kasus nyata.
- **TJ-3 (ilmiah):** Latihan 1 sudah memuat pengambilan dari ingatan. Kurang: EB, LB, penjelasan diri eksplisit ("mengapa data dan akun selalu milik pengguna?"). Perbaikan sesuai pola.
- Silabus: butir F-LD-e dan E-LD-l hanya konteks (rancangan); tambahkan kalimat penegas.

#### `cloud-biaya-dan-tagihan`

- **BT-1 (baris 24 dan 38):** pernyataan AWS Free Tier cocok dengan halaman (per 2026-11-19: $100 saat membuat akun ditambah sampai $100 lagi dari menjelajah layanan, sampai $200 selama 6 bulan; akun ditutup setelah 6 bulan atau kredit habis; tidak ditagih kecuali beralih ke rencana berbayar). Teks modul menyingkat ini menjadi "kredit hingga sekitar 200 dolar" (benar tetapi tidak menyebut dua tahap) dan memuat penanda `[belum terverifikasi]` untuk hal yang memang tidak disebut halaman (kartu kredit) dan untuk fitur anggaran. Perbaikan: sebut dua tahap kredit, ganti penanda dengan "halaman itu tidak menyebutnya", dan tulis fitur anggaran sebagai pernyataan umum tanpa klaim penyedia tertentu.
- **BT-2 (Latihan 5, baris 60 sampai 62):** soal meminta "lima langkah", kuncinya memuat tujuh butir. Selain itu menghapus kunci dari riwayat repositori **tidak** memulihkan kunci yang sudah bocor; yang menutup risiko adalah mencabut atau memutar kunci. Perbaikan: kunci lima langkah berurutan, dengan catatan bahwa riwayat bukan pengaman.
- **BT-3 (indeks `cpItems`: F-LD-j):** F-LD-j adalah "loka pasar, perbankan digital, dompet digital dan keamanannya"; modul tidak membahasnya (rancangan menyebut "sebagian; hanya sisi keamanan biaya digital"). Perbaikan: kalimat penegas di modul; keputusan mengosongkan `cpItems` ada pada pemilik.
- **BT-4 (hitungan Latihan 1 sampai 3):** benar (720 jam, 36 dolar, 0,15 dolar; 10 dolar per bulan dan 120 per tahun; 600 GB dan 54 dolar).
- **BT-5 (ilmiah):** tidak ada contoh terselesaikan sebelum hitungan, tidak ada prediksi, IK, EB, LB. Perbaikan: contoh terselesaikan, "Prediksi dulu" sebelum Latihan 1, "Latihan bercampur" (satuan per jam atau per bulan dicampur dengan jebakan).
- **BT-6 (AI, silabus 7.4):** modul membahas kunci bocor tetapi tidak menyebut larangan menempelkan kunci ke asisten AI. Perbaikan: satu butir.

#### `cloud-keamanan-dan-privasi`

- **KP-1 (baris 23 dan 31 sampai 32):** UU PDP: "Nomor 27 Tahun 2022" benar; JDIH BPK memuat judul "Pelindungan Data Pribadi", penetapan 17 Oktober 2022, status "Berlaku". Penanda "belum terverifikasi" untuk nomor dan judul tidak perlu. ISO/IEC 27017: halaman ITU-T X.1631 (teks kembaran yang dibuat bersama ISO dan IEC) memuat edisi 12/2025 berstatus "In force (prepublished)" yang menggantikan edisi 07/2015, berjudul "Information security controls based on ISO/IEC 27002 for cloud services"; deskripsi modul ("menambah panduan di atas standar yang lebih umum") sesuai judul. ISO/IEC 27018: tidak dapat diverifikasi (HTTP 403). Perbaikan: pernyataan bertanggal dengan sumber; isi 27018 tetap ditandai belum terverifikasi dan tidak diperluas.
- **KP-2 (baris 17, "Rahasia tidak di berkas bersama"):** tidak menyebut layanan AI. Silabus 7.4 (baris "Privasi") melarang menaruh data pribadi, kata sandi, kunci, dan rahasia pada permintaan ke layanan AI. Perbaikan: tambahkan ke baris itu dan ke Latihan 3.
- **KP-3 (Latihan 2):** string "k7#Rp9!vQ2mLw4" adalah contoh sintetis; tidak ada masalah privasi. Kunci benar. Tambahan: kekuatan sandi bergantung juga pada tidak pernah dipakai ulang atau bocor.
- **KP-4 (ilmiah):** kurang IK, EB, LB. Perbaikan sesuai pola.

#### `cloud-deploy-sederhana`

- **DS-1 (baris 61):** "tidak dijalankan saat modul ini ditulis". Kini dijalankan: `server.ts` pada Bun 1.4.4 menjawab "pesan bawaan" tanpa variabel dan "Halo dari lingkungan contoh" dengan `PESAN_SAMBUTAN`, sesuai klaim. **Perilaku penting yang tidak disebut modul:** Bun memuat berkas `.env` di direktori kerja secara otomatis (diuji: `PESAN_SAMBUTAN=Halo dari berkas env` di `.env` menghasilkan jawaban itu). Ini relevan karena modul mengajarkan `.env`/`.gitignore`. Juga tidak disebut: sintaks variabel `VAR=nilai perintah` hanya untuk shell POSIX (PowerShell berbeda); kesalahan "port sudah dipakai" bila port 3000 terpakai. Perbaikan: hasil uji tertulis bertanggal, catatan `.env`, catatan PowerShell, dan catatan port.
- **DS-2 (Latihan 3):** kunci tidak menyebut bahwa rahasia yang sudah ter-commit harus diputar (bukan sekadar dipindahkan). Perbaikan.
- **DS-3 (indeks `cpItems`: F-AP-d, F-BK-a, F-AP-c):** F-AP-d (library/perangkat) dan F-AP-c (kualitas kode) tidak ditopang isi modul. Modul tidak menyatakan bahwa butir itu hanya disentuh. Perbaikan: kalimat penegas; keputusan pada pemilik.
- **DS-4 (AI, silabus 7.4 dan `B-XII1-M10`):** tidak menyebut larangan menempelkan `.env` atau kunci ke asisten AI. Perbaikan.
- **DS-5 (ilmiah):** kode diberikan lengkap (baca sebelum tulis: ada) tetapi tidak ada prediksi keluaran sebelum menjalankan; kurang IK, EB, LB. Perbaikan.
- `weekCodes` semuanya ada di `weeks.json`; prasyarat `B-XI2-M1` dan `B-XI2-M12` cocok.

### 5.2 Modul pendamping

Kutipan CP di sembilan modul cocok dengan `quotes` di `cp-elements.json` (13 kutipan diperiksa otomatis, nol selisih). `cpItems` semuanya ada di `cp-elements.json`. `weekCodes` kosong untuk sembilan modul (modul pendamping tidak melekat ke minggu), kecuali rujukan teks ke minggu jalur B yang semuanya ada.

#### `pendamping-periksa-fakta-dan-baca-lateral`

- **PF-1 (baris 33):** "Informasi yang menggugah emosi justru perlu dicek lebih hati-hati karena paling cepat dibagikan" tanpa sumber. Bukti yang terverifikasi lewat Crossref: Vosoughi, Roy, dan Aral (2018), Science, DOI 10.1126/science.aap9559: data rumor Twitter 2006 sampai 2017, berita palsu menjangkau lebih banyak orang dan lebih cepat daripada yang benar, dan penulis menyebut kebaruan dan reaksi emosional sebagai kemungkinan penyebab; Brady dkk. (2017), PNAS, DOI 10.1073/pnas.1618923114: bahasa moral-emosional meningkatkan penyebaran pesan politik dalam kelompok ideologis yang sama (data AS). Perbaikan: lunakkan menjadi "sering" dan beri rujukan dan batasnya (bukti dari Twitter, konteks AS).
- **PF-2 (baris 53):** kontras membaca vertikal dan lateral tidak memuat bukti. Terverifikasi: Wineburg dan McGrew (2019), Teachers College Record 121(11), DOI 10.1177/016146811912101102 (45 peserta: sejarawan, pemeriksa fakta profesional, mahasiswa; sejarawan dan mahasiswa membaca vertikal dan terkecoh tanda "resmi" seperti logo dan nama domain, pemeriksa fakta membaca lateral); Breakstone dkk. (2021), Harvard Kennedy School Misinformation Review, DOI 10.37016/mr-2020-56 (pretes dan postes pada mata kuliah daring: mahasiswa meningkat dan lebih sering membaca lateral); Wineburg dkk. (2022), Journal of Educational Psychology 114(5), DOI 10.1037/edu0000740 (studi lapangan di kelas pemerintahan SMA; hanya judulnya yang diverifikasi, hasilnya tidak dibaca). Batas jujur (`[inferensi]` riset bagian 7): semua dari konteks AS; belum ada studi di SMA Indonesia. Perbaikan: ringkasan temuan di modul dan catatan guru, serta tambahan di `references`.
- **PF-3 (kunci):** tidak ada kunci untuk Kasus 1 sampai 3. Perbaikan: "Petunjuk jawaban" dengan langkah berikutnya.
- **PF-4 (AI, silabus 7.4):** tidak menyebut jawaban asisten AI sebagai klaim yang perlu diperiksa; periksa seperti sumber lain. Perbaikan: butir ringkas.
- **PF-5 (ilmiah):** kurang PR, BD, UB, EB. Kasus 2 (hasil pencarian khayalan) sebenarnya contoh terselesaikan tersamar. Perbaikan: "Prediksi dulu" (menilai situs fiktif dari tampilan lebih dulu), studi kasus pembanding dua pembaca (vertikal dan lateral) dengan pertanyaan relasional, "Ulang berjarak".

#### `pendamping-menyaring-konten-negatif`

- **MK-1 (baris 47 sampai 53):** panduan simpan bukti ("tangkapan layar ... bila perlu") tidak membedakan foto atau video intim, terutama yang melibatkan anak: menyimpan atau meneruskan walau untuk bukti dapat berbahaya dan melanggar hukum. Perbaikan: butir tegas: jangan simpan atau teruskan, langsung beri tahu orang dewasa atau guru. Tidak menyebut pasal hukum.
- **MK-2 (kunci):** tidak ada kunci. Perbaikan.
- **MK-3 (ilmiah):** kasus 1 sampai 3 masing-masing satu jenis (blok), tidak ada latihan membedakan jenis secara bercampur (`M`, 3.3: manfaat interleaving untuk membedakan masalah yang mirip di permukaan). Tidak ada perbandingan dua contoh. Perbaikan: "Latihan bercampur" (empat pesan fiktif), studi kasus pembanding dua respons terhadap komentar yang sama, "Ingat kembali" dari `FND-X1-M6`, "Ulang berjarak".

#### `pendamping-riset-dan-verifikasi-konten`

- **RV-1 (AI, silabus 7.4):** modul menyebut gambar dan video buatan AI dan menjelaskan alat pendeteksi tidak pasti (benar), tetapi tidak menyebut asisten AI sebagai alat riset: boleh membantu mencari kata kunci, tetapi jawabannya bukan sumber dan harus diverifikasi, dan data pribadi tidak ditempel. Perbaikan: bagian singkat.
- **RV-2 (Kasus 2):** aritmetika pada teks benar (1 menjadi 4 kejadian = naik 300 persen). Tidak ada kunci. Perbaikan: kunci.
- **RV-3 (ilmiah):** kurang IK (prasyarat `pendamping-periksa-fakta-dan-baca-lateral`), BD, LB (siswa memilih teknik verifikasi untuk bahan campuran), UB, EB. Perbaikan sesuai pola, termasuk studi kasus pembanding dua pencarian (luas dan sempit) untuk pertanyaan yang sama.
- Catatan operator pencarian: modul sudah menyatakan bergantung pada mesin pencari; tidak ada klaim salah.

#### `pendamping-profesi-informatika-dan-budaya-digital`

- **PB-1 (baris 25 sampai 38):** tabel peran tidak memuat peran yang bekerja dengan data dan AI (analis data ada, tetapi tidak ada peran pembelajaran mesin) dan tidak menyebut bahwa alat AI mengubah cara banyak peran bekerja. Silabus v1.3 menjadikan AI bagian dari program. Perbaikan: satu baris peran dan satu kalimat berhati-hati (seberapa jauh perubahan tidak pasti; tanggung jawab verifikasi tetap pada manusia). Tidak ada angka gaji atau prospek (sudah benar).
- **PB-2 (Bagian 2):** konten budaya aman dan berhati-hati. Tidak ada rujukan hukum; modul berkata izin dan atribusi perlu diperhatikan. Perbaikan: satu kalimat bahwa hak cipta dan hak komunitas diatur hukum dan tidak dirinci modul.
- **PB-3 (kunci):** tidak ada kunci. Perbaikan.
- **PB-4 (ilmiah):** kartu profil sebagai contoh terselesaikan yang memudar adalah praktik baik (`K`, 3.4). Kurang: BD (dua proyek digitalisasi: satu menghargai izin dan atribusi, satu tidak), UB, EB.

#### `pendamping-teknologi-dan-demokrasi`

- **TD-1 (baris 37):** "Algoritma cenderung menampilkan yang mirip dengan yang sudah kamu sukai, sehingga pandangan lain jarang terlihat" dinyatakan sebagai fakta. Bukti diperdebatkan: Zuiderveen Borgesius dkk. (2016), Internet Policy Review, DOI 10.14763/2016.1.401, menyimpulkan saat itu "little empirical evidence that warrants any worries about filter bubbles" (tinjauan; pilihan pengguna sendiri dan personalisasi algoritma dibedakan); Nyhan dkk. (2023), Nature, DOI 10.1038/s41586-023-06297-w, melaporkan pada data Facebook AS 2020 bahwa konten dari sumber "sepandangan" adalah sebagian besar yang dilihat, tetapi berita dan informasi politik hanya sebagian kecil paparan. Perbaikan: ubah menjadi pernyataan hati-hati ("bisa", "buktinya beragam") dan rujuk. Ini bukan mitos bagian 5 riset, tetapi klaim empiris yang diperdebatkan.
- **TD-2 (Risiko):** tidak menyebut konten buatan AI (teks, gambar, suara) yang menurunkan biaya pemalsuan. Perbaikan: satu kalimat berhati-hati, rujuk modul riset untuk cara verifikasi.
- **TD-3 (kunci):** tidak ada kunci; Skenario 1 (NIK dan foto kartu identitas pada aduan jalan rusak) layak punya kunci tegas (data seperlunya). Perbaikan.
- **TD-4 (ilmiah):** kurang IK, BD (dua layanan aduan fiktif), LB, UB, EB. Netralitas politik terjaga; tidak ada contoh partai atau calon.

#### `pendamping-transaksi-digital-aman`

- **TR-1 (baris 42, "Hindari jaringan Wi-Fi umum untuk transaksi"):** nasihat berguna tetapi disederhanakan: pada sambungan HTTPS isi komunikasi terenkripsi; risiko Wi-Fi umum terutama jaringan tiruan dan situs atau aplikasi tiruan. Perbaikan: pilih data seluler sendiri bila memungkinkan, jaga sistem operasi dan aplikasi mutakhir, dan ingat HTTPS tidak menjamin situs jujur (sudah disebut di butir 5).
- **TR-2 (privasi AI):** tidak menyebut larangan menempelkan OTP, PIN, atau data akun ke asisten AI, atau meminta AI "memeriksa" pesan yang memuat data akun. Perbaikan: satu butir.
- **TR-3 (kunci):** tidak ada kunci. Perbaikan.
- **TR-4 (ilmiah):** semua contoh pesan adalah tipuan; tidak ada contoh sah, sehingga siswa tidak berlatih membedakan (risiko curiga berlebihan). Kurang IK (`FND-X1-M6`), BD (notifikasi sah dan tiruan berdampingan), LB (pesan campuran sah dan tipuan), UB, EB. Perbaikan sesuai pola.
- Regulator: modul sengaja tidak menyebut nama lembaga; OJK dan Bank Indonesia dapat dibuka, tetapi pembagian wewenangnya tidak diverifikasi di sini, jadi nama lembaga tidak ditambahkan (opsi untuk pemilik).

#### `pendamping-merancang-kebutuhan-sistem`

- **MR-1:** tidak ada kesalahan faktual; tidak ada angka dan merek (sengaja). Contoh terpandu ("Kios Contoh") dan kasus memudar sesuai `K` (3.4).
- **MR-2 (kunci):** tidak ada kunci untuk Kasus 1 sampai 5. Perbaikan: butir kunci per kasus (kriteria, bukan jawaban tunggal).
- **MR-3 (ilmiah):** kurang IK (`FND-X1-M1`), PR (tulis dulu rancangan sebelum melihat contoh terpandu), UB, EB. Perbaikan.
- **MR-4 (AI):** tidak ada mention; satu catatan: asisten AI boleh membantu menyusun pertanyaan, spesifikasi harus dicek ke sumber bertanggal, tanpa data pribadi pengguna.

#### `pendamping-model-jaringan-dan-troubleshooting`

- **MJ-1 (baris 72 sampai 86):** `ping -c 3` berlaku di Linux dan macOS; di Windows opsinya `-n`. Modul hanya menyebut perbedaan untuk `ip addr` (Windows: `ipconfig`). Perbaikan: sebut `ping -n 3` untuk Windows.
- **MJ-2 (baris 84 sampai 86):** `nslookup contoh.test` selalu gagal (`NXDOMAIN`, diuji) di jaringan yang tidak punya server DNS lab untuk nama itu; `.test` dicadangkan RFC 2606 dan tidak ada di DNS publik. Modul tidak menjelaskan bahwa guru harus menyiapkan DNS lab. Alamat `192.0.2.x` (RFC 5737, "SHOULD NOT appear on the public Internet") juga tidak bisa dijangkau di jaringan nyata tanpa konfigurasi. Perbaikan: jelaskan bahwa contoh di kertas memakai rentang dokumentasi, dan praktik nyata memakai alamat privat jaringan lab terisolasi yang disiapkan guru; DNS lab disiapkan guru atau langkah 5 disimulasikan.
- **MJ-3 (Kegiatan 3):** kartu A sampai E tanpa kunci. Kartu D ("Situs lab lambat; server menerima banyak permintaan sekaligus") tidak cocok dengan enam langkah diagnosis secara langsung (masalahnya kapasitas layanan, langkah 6). Perbaikan: kunci tiap kartu dengan langkah berikutnya.
- **MJ-4:** model empat lapis TCP/IP dipakai tanpa menyebut model tujuh lapis OSI yang sering ditemui siswa. Perbaikan: satu kalimat. Lapisan "Akses jaringan" tepat untuk model empat lapis.
- **MJ-5 (ilmiah):** blok perintah adalah kandidat baca-dan-prediksi (`M`, 6.3, PRIMM): kurang PR, IK (`FND-X1-M4`, `FND-X1-M5`), LB, UB, EB. Perbaikan sesuai pola.

#### `pendamping-keamanan-lanjut-konektivitas`

- **KL-1 (baris 65 sampai 79):** tabel segmen menyebut empat segmen (administrasi, siswa, tamu, perangkat pintar), tetapi rencana alamat hanya memuat tiga. Hitungan CIDR yang ada benar (`/26` = 64 alamat, 62 host; .1 sampai .62; .65 sampai .126; .129 sampai .190). Perbaikan: tambahkan `192.0.2.192/26` (host .193 sampai .254) untuk perangkat pintar.
- **KL-2 (baris 142):** "hal itu melanggar hukum (UU ITE)" basi. JDIH BPK untuk UU 11/2008 memuat "Dicabut sebagian dengan UU 1/2023 tentang KUHP: Pasal 27 ayat (1), 27 ayat (3), 28 ayat (2), 30, 31 ayat (1), 31 ayat (2), 36, 45 ayat (1), 45 ayat (3), 45A ayat (2), 46, 47, dan 51 ayat (2)"; JDIH BPK untuk UU 1/2023 mencatat berlaku 2 Januari 2026. Akses ilegal (Pasal 30) kini diatur di KUHP. Perbaikan: ganti dengan rumusan yang benar tanpa menyebut pasal pengganti yang tidak diperiksa ("diatur UU ITE dan KUHP"), tanggal dan sumber. Silabus bagian 1.2 dan jalur B (`B-XI2-M10`) menyebut UU ITE; kecocokannya dengan KUHP di luar lingkup tinjauan ini (temuan di luar scope, bagian 7).
- **KL-3 (baris 41):** "Pakai WPA3 bila perangkat mendukung, WPA2-AES bila tidak; hindari ... protokol lama yang sudah dinyatakan lemah" benar; tidak menyebut contohnya. Perbaikan: sebut WEP dan WPA dengan TKIP sebagai contoh protokol lama (pengetahuan umum yang mapan; tidak diberi sumber URL).
- **KL-4 (AI):** tidak menyebut larangan menempelkan konfigurasi perute, kata sandi, atau alamat jaringan nyata ke asisten AI. Perbaikan.
- **KL-5 (kunci):** tidak ada kunci. Perbaikan.
- **KL-6 (ilmiah):** daftar konfigurasi contoh adalah contoh terselesaikan (`K`); kurang IK, PR (tebak risiko sebelum membaca tabel), BD (dua jaringan fiktif), LB, UB, EB. Perbaikan.

## 6. Keputusan yang tetap milik pemilik

Tinjauan ini tidak menyetujui modul dan tidak menjawab keputusan berikut. Hanya orchestrator yang menyajikannya ke pemilik lewat dialog pilihan baku.

1. **Persetujuan per modul** (`draf` ke `disetujui`, blok `review` dengan `approvedOn` dan `reviewerRole`): enam belas keputusan, dapat dijawab sekaligus. Rekomendasi penyusun ada di tabel bagian 4 (sebelum revisi) dan di kolom "Status setelah revisi" pada bagian 8 setelah revisi.
2. **`cpItems` yang disentuh tetapi tidak dipenuhi** pada modul seri cloud: kosongkan atau pertahankan? Terutama `cloud-biaya-dan-tagihan` (F-LD-j), `cloud-deploy-sederhana` (F-AP-d, F-AP-c), dan `cloud-iaas-paas-saas` (F-BK-a). Mengubahnya mengubah indeks dan perlu disinkronkan dengan rancangan seri cloud yang sudah disetujui; revisi modul hanya menambah kalimat penegas di teks.
3. **Menyebut nama lembaga pengawas keuangan** (OJK, Bank Indonesia) di `pendamping-transaksi-digital-aman` atau tetap generik. Tinjauan ini membiarkannya generik karena pembagian wewenang tidak diverifikasi.
4. **Penambahan tiga kutipan ilmiah ke `references` indeks** untuk modul literasi digital (Wineburg dan McGrew 2019; Breakstone dkk. 2021; Vosoughi dkk. 2018 atau Brady dkk. 2017, Zuiderveen Borgesius dkk. 2016, Nyhan dkk. 2023): dilakukan di revisi agar rujukan di teks sesuai indeks; pemilik dapat menolaknya.
5. **Pembukaan URL panduan Kemendikdasmen** dari jaringan yang bisa menjangkaunya (belum terverifikasi di sini).
6. **Waktu dan lokasi pelaksanaan** (minggu cadangan, ekstrakurikuler, atau menukar proyek mini): pertanyaan terbuka rancangan, bukan tugas tinjauan. Bagian tambahan (ingat kembali, ulang berjarak) menambah sekitar 10 sampai 15 menit per modul; guru dapat melewatinya bila waktu pendek.
7. **Uji coba dengan siswa dan guru** (pilot) dan pemeriksaan perintah jaringan di lab sungguhan: aktivitas manusia nyata yang tidak digantikan pilihan atau tinjauan ini.

## 7. Temuan di luar scope (tidak diubah)

- `docs/programs/sma-coding/README.md` (tabel berkas) belum memuat folder `tinjauan-modul/`.
- Silabus `docs/programs/sma-coding/silabus.md` bagian 1.2 dan `B-XI2-M10` ("pokok UU ITE dan UU PDP") menyebut UU ITE; periksa apakah perlu menyebut perubahan oleh KUHP (UU 1/2023, berlaku 2 Januari 2026) dan UU 1/2024.
- Daftar periksa pemilik (`docs/panduan/pemilik-peninjau.md`) tidak memuat butir "fakta layanan cloud bertanggal", "regulasi terhadap sumber resmi", dan "unsur ilmiah"; pemilik dapat menimbang menambahkannya (tidak diubah di sini, di luar scope).
- Berkas `docs/riset/ilmu-belajar-kognitif.md` belum memuat bukti membaca lateral; tinjauan ini memverifikasi tiga DOI (bagian 5.2) yang dapat dipertimbangkan untuk ditambahkan ke daftar pustaka riset.

## 8. Status setelah revisi

Diisi pada commit revisi modul.
