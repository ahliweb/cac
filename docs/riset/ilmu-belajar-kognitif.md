# Riset Ilmu Kognitif tentang Cara Belajar Efektif

- **Version:** v0.2.0
- **Last updated:** 2026-11-19
- **Status:** **DRAF** (riset, bukan keputusan pemilik). Issue #133. Konten karangan menurut [ADR-0007](../architecture/adr/0007-authored-learning-content.md).
- **Changelog:**
  - v0.2.0 (2026-11-19): status program disesuaikan dengan keadaan repositori (bagian 8): lima program coding tk, sd, smp, kuliah, dewasa kini disetujui pemilik, terdaftar, dan ter-encode; sma-coding silabus v1.3.0; celah kebijakan AI OSN ditangani (PR #159). Isi riset, rekomendasi, dan daftar pustaka tidak diubah; rekomendasi pada 8.3 dan 8.4 ditulis dari dokumen yang dibaca saat riset dan belum diperiksa ulang terhadap silabus yang disetujui.
  - v0.1.0 (2026-11-19): draf awal. Metode dan skala bukti; sembilan kelompok prinsip belajar; verifikasi Prof. Stella Christie; delapan mitos; riset pendidikan komputasi; perkembangan usia; rekomendasi dan celah per program; daftar pustaka dengan status verifikasi.

> **DRAF, bukan keputusan pemilik dan bukan materi resmi lembaga mana pun.**
> Dokumen ini merangkum literatur ilmiah untuk dijadikan rujukan pedagogi
> semua program. Ia **tidak mengubah** silabus, corpus, atau dokumen program
> mana pun; perubahan dokumen program dikerjakan terpisah setelah pemilik
> menyetujui (kriteria penerimaan issue #133). Agent tidak mengubah status
> ini; hanya pemilik yang dapat menyetujui.

## 0. Cara membaca dokumen ini

| Tanda | Arti |
| --- | --- |
| `[belum terverifikasi]` | Tidak dapat dipastikan dari sumber yang dibuka penyusun pada 2026-11-19. Bukan fakta. |
| `[parafrasa]` | Isi diringkas penyusun dari abstrak atau halaman yang terbaca; bukan kutipan. |
| `[inferensi]` | Penalaran penyusun yang menghubungkan temuan riset dengan pembelajaran coding atau dengan repositori ini; **bukan temuan riset**. |
| `[A]` sampai `[E]` | Kekuatan bukti (bagian 1.2). |
| `T-A`, `T-M`, `T-W`, `P` | Status verifikasi rujukan (bagian 1.3). |

Kutipan dalam tanda petik berbahasa Inggris ditulis persis dari abstrak atau
halaman yang terbaca; glosnya dalam bahasa Indonesia adalah parafrasa.

## 1. Metode

### 1.1 Memilih dan menilai sumber

1. **Utamakan sumber primer dan tinjauan:** artikel jurnal bersejawat
   (*peer-reviewed*), meta-analisis, tinjauan sistematis, laporan kelompok
   kerja konferensi pendidikan komputasi. Blog, ringkasan vendor, dan
   berita hanya dipakai bila diberi label sebagai sumber sekunder atau
   pernyataan publik.
2. **Dinilai per klaim, bukan per jurnal.** Satu rujukan dapat kuat untuk
   satu klaim (mis. efek uji mengingat pada materi verbal) dan lemah untuk
   klaim lain (mis. transfer ke pemrograman).
3. **Tanda bahaya yang dicari:** hasil hanya pada materi jangka pendek;
   kelompok kontrol pasif; ukuran sampel kecil; efek menyusut pada studi
   berkualitas tinggi; satu laboratorium saja; klaim yang diperluas jauh
   dari populasi studi (mis. dari mahasiswa Amerika ke siswa SD Indonesia).
4. **Ketidaksepakatan dicatat, tidak disembunyikan** (mis. growth mindset,
   bagian 3.9; transfer dari pemrograman, bagian 6.4).

### 1.2 Skala kekuatan bukti

| Tingkat | Jenis bukti |
| --- | --- |
| `[A]` | Meta-analisis atau tinjauan sistematis. |
| `[B]` | Eksperimen terkontrol acak di lapangan (RCT) atau tinjauan naratif terstruktur oleh pakar yang menilai banyak studi. |
| `[C]` | Eksperimen laboratorium atau kuasi-eksperimen. |
| `[D]` | Studi korelasional, survei, atau kajian konseptual dan teoretis. |
| `[E]` | Opini, laporan berita, pernyataan publik, preprint tanpa tinjauan sejawat. |

Tingkat tinggi **tidak otomatis berarti berlaku untuk konteks kita**: bagian
"batas dan kondisi" tiap prinsip menjelaskan jarak antara bukti dan konteks
pembelajaran coding di Indonesia.

### 1.3 Verifikasi rujukan

Setiap rujukan diperiksa pada **2026-11-19** sebelum dicantumkan. Jalur
verifikasi yang benar-benar dipakai:

| Jalur | Dipakai untuk |
| --- | --- |
| API REST Crossref (`api.crossref.org/works/<DOI>`), metadata yang didaftarkan penerbit: judul, penulis, tahun, jurnal, volume, halaman | Semua rujukan ber-DOI. Judul, tahun, jurnal, volume, dan halaman di daftar pustaka disalin dari sini. |
| PubMed (E-utilities `esearch` dan `efetch`), abstrak dan afiliasi | Rujukan yang terindeks PubMed. |
| OpenAlex (`api.openalex.org`), abstrak | Rujukan yang abstraknya tidak tersedia di Crossref atau PubMed. |
| Halaman web dibuka langsung | Profil Universitas Tsinghua, halaman Kemdiktisaintek, arXiv, Scientific American, ERIC, GovInsider. |

**Keterbatasan yang harus diketahui pembaca:** halaman penerbit untuk banyak
artikel berbayar tidak terbuka (Taylor & Francis menjawab HTTP 403; Springer
mengalihkan ke otorisasi). Maka "terverifikasi ada" di sini berarti **DOI
terdaftar dan metadata cocok dengan yang dikutip**, bukan "teks lengkap
dibaca". Teks lengkap artikel **tidak** dibaca untuk rujukan mana pun di
dokumen ini; yang dibaca adalah abstrak (bila tersedia) dan metadata.
Implikasinya: klaim tentang isi artikel dibatasi pada apa yang tertulis di
abstrak. Klaim di luar itu ditandai `[inferensi]`.

| Kode | Arti |
| --- | --- |
| `T-A` | Metadata cocok (Crossref) **dan** abstrak dibaca. Klaim dibatasi pada abstrak. |
| `T-M` | Metadata cocok (Crossref), **abstrak tidak terbaca**. Klaim dibatasi pada apa yang dinyatakan judul; tidak ada klaim temuan. |
| `T-W` | Halaman web dibuka dan dibaca (bagian yang dikutip). |
| `P` | Preprint; tidak ada keterangan tinjauan sejawat pada halaman yang dibuka. |

Jumlah rujukan per status ada di bagian 10.

## 2. Ringkasan untuk pembaca yang tergesa

| Prinsip | Kekuatan bukti | Kesimpulan satu kalimat | Bagian |
| --- | --- | --- | --- |
| Latihan mengingat kembali (uji diri tanpa melihat) | `[A]` kuat | Mengingat kembali materi lebih menguatkan ingatan jangka panjang daripada membaca ulang. | 3.1 |
| Latihan berjarak | `[A]` kuat | Beberapa sesi yang berjarak mengalahkan satu sesi menumpuk; jarak optimal bergantung pada kapan materi perlu diingat. | 3.2 |
| Interleaving (soal bercampur) | `[A]` sedang, bergantung materi | Membantu untuk membedakan jenis masalah; tidak seragam untuk semua materi. | 3.3 |
| Contoh terselesaikan dan beban kognitif | `[B]`/`[C]` kuat untuk pemula pada domain terstruktur | Pemula belajar lebih efisien dari contoh terselesaikan; manfaat menyusut seiring keahlian naik. | 3.4 |
| Bimbingan versus penemuan bebas | `[A]` | Penemuan tanpa bantuan kalah dari instruksi eksplisit; penemuan dengan bimbingan bisa menang. | 3.5 |
| Elaborasi dan penjelasan diri | `[B]` sedang | Menjelaskan "mengapa" membantu, tetapi bukti di kelas nyata belum sekuat uji mengingat. | 3.6 |
| Dual coding / multimedia | `[D]`/`[B]` | Gabungan kata dan gambar yang dirancang baik masuk akal dan didukung tinjauan; rincian per desain bervariasi. | 3.7 |
| Umpan balik | `[A]` sedang, sangat heterogen | Isi umpan balik lebih penting daripada ada tidaknya. | 3.8 |
| Kesulitan yang diinginkan, metakognisi | `[B]`/`[A]` | Kinerja saat latihan bukan ukuran belajar; pelajar sering salah menilai dirinya. | 3.9 |
| Growth mindset | `[A]` lemah, diperdebatkan | Efek rata-rata kecil sampai nol; mungkin berguna untuk kelompok tertentu. | 3.10 |
| Tidur | `[A]`/`[D]` | Tidur mendukung konsolidasi memori; hubungan dengan nilai sekolah ada tetapi modest. | 3.11 |
| Membandingkan contoh (Christie, Gentner) | `[A]` sedang | Membandingkan dua contoh dengan petunjuk membandingkan membantu menemukan pola; bukti langsung untuk pemrograman terbatas. | 4 |

## 3. Prinsip belajar berbasis bukti

### 3.1 Latihan mengingat kembali (*retrieval practice*, efek uji)

**Temuan.**
- Roediger dan Karpicke (2006) `[C]`: siswa yang mengingat bacaan
  (tanpa umpan balik) mengungguli siswa yang membaca ulang pada tes
  tertunda, padahal membaca ulang membuat mereka lebih yakin. Kutipan
  abstrak: "prior testing produced substantially greater retention than studying, even though repeated studying increased students' confidence in their ability to remember the material" (hasil pada tes 2 hari dan 1 minggu; pada tes 5 menit, membaca ulang lebih baik).
- Karpicke dan Roediger (2008) `[C]`: dalam kosakata bahasa asing,
  belajar ulang setelah berhasil mengingat tidak berpengaruh pada ingatan
  tertunda, sedangkan menguji ulang berpengaruh besar; "students' predictions of their performance were uncorrelated with actual performance".
- Adesope dkk. (2017) `[A]`: meta-analisis uji latihan; abstrak menyatakan
  "practice tests are more beneficial for learning than restudying and all other comparison conditions", dengan ukuran efek yang dimoderasi oleh
  fitur tes, peserta, dan hasil yang diukur.
- Rowland (2014) `[A]`: meta-analisis uji versus belajar ulang;
  `[parafrasa]` tes dengan pemanggilan bebas (*recall*) memberi manfaat
  lebih besar daripada tes pengenalan, mendukung peran pemrosesan yang
  menuntut usaha.
- Agarwal dkk. (2021) `[A]`: tinjauan sistematis 50 eksperimen di sekolah
  dan kelas nyata; "the majority of which (57%) revealed medium or large benefits"; "only 6% of experiments were conducted in non-WEIRD countries".
  Artinya bukti dari negara non-Barat sangat sedikit.

**Kekuatan bukti:** `[A]` kuat. Konsisten pada banyak desain.

**Batas dan kondisi.**
- Ukuran efek bergantung pada jenis tes, jeda, dan umpan balik; bukti
  terkuat untuk materi verbal dan fakta.
- Hasil dalam kelas hampir semuanya dari konteks WEIRD (Agarwal dkk., 2021).
- Donoghue dan Hattie (2021) mencatat mayoritas studi mengukur hasil
  permukaan atau faktual, sehingga perlu hati-hati menerapkannya pada
  pemahaman mendalam dan relasional (bagian 3.12).

**Implikasi untuk coding.** `[inferensi]` Untuk fakta dan sintaks, tes
singkat tanpa melihat catatan ("tulis tanpa menyalin"). Untuk keterampilan
penyelesaian masalah, bentuk padanannya adalah menyelesaikan ulang soal
tanpa bantuan (*re-solve*), bukan sekadar membaca ulang solusi. Bukti
langsung efek uji mengingat pada keterampilan pemrograman **tidak** dibuka
dalam penelusuran ini `[belum terverifikasi]`.

### 3.2 Latihan berjarak (*spacing*, *distributed practice*)

**Temuan.**
- Cepeda dkk. (2006) `[A]`: meta-analisis 839 penilaian dalam 317
  eksperimen; menurut abstrak, "ISI and retention interval operate jointly to affect final-test retention", yaitu jarak antar sesi yang optimal
  bertambah bila tes dilakukan lebih lama kemudian.
- Cepeda dkk. (2008) `[C]`: lebih dari 1.350 orang diajar fakta lalu
  diberi ulasan setelah jeda hingga 3,5 bulan, dites hingga satu tahun
  kemudian. Abstrak: "the optimal gap declined from about 20 to 40% of a 1-week test delay to about 5 to 10% of a 1-year test delay".
- Dunlosky dkk. (2013) menilai latihan berjarak berutilitas **tinggi**
  (bagian 3.12).

**Kekuatan bukti:** `[A]` kuat.

**Batas dan kondisi.** Data jarak optimal berasal dari materi fakta;
generalisasi ke keterampilan kompleks perlu kehati-hatian. Carpenter dkk.
(2012) menyoroti spacing untuk bentuk belajar yang beragam; abstraknya tidak
terbaca (`T-M`), sehingga tidak dipakai untuk klaim isi.

**Implikasi untuk coding.** `[inferensi]` Susun ulang topik lama dalam sesi
berikutnya dengan jeda yang makin panjang, alih-alih satu minggu penuh pada
satu topik lalu tidak pernah kembali. Aturan praktis dari Cepeda dkk.
(2008): semakin lama materi perlu diingat, semakin panjang jeda ulasan yang
optimal, tetapi sebagai **proporsi** dari waktu target, jeda yang optimal
makin kecil.

### 3.3 Interleaving (latihan bercampur)

**Temuan.** Brunmair dan Richter (2019) `[A]`: 59 studi, 238 ukuran efek;
efek keseluruhan sedang ("Hedges' g = 0.42"); untuk tugas matematika efek
kecil ("g = 0.34"); untuk kata-kata, balok (*blocked*) justru lebih baik
("g = -0.39"); teks ekspositori tidak jelas. Efek lebih kuat bila materi
antarkategori mirip dan di dalam kategori kurang mirip. Dunlosky dkk. (2013)
menilainya sedang karena bukti di kelas masih awal.

**Kekuatan bukti:** `[A]` sedang dan **bergantung materi**.

**Batas dan kondisi.** Terbaik untuk membedakan jenis masalah yang mirip di
permukaan; bukan jaminan untuk semua materi. Abstrak menyarankan hati-hati
untuk teks dan kata.

**Implikasi untuk coding.** `[inferensi]` Memilih strategi yang tepat
(greedy, DP, graf, pencarian biner) adalah keterampilan membedakan jenis
masalah, tepat sasaran untuk soal bercampur setelah tiap topik dikuasai
dasarnya. Bukan untuk pengenalan pertama sebuah konsep, saat pemula
membutuhkan blok yang koheren.

### 3.4 Contoh terselesaikan, beban kognitif, dan efek keahlian terbalik

**Temuan.**
- Sweller (1988) `[D]`/teoretis dengan data eksperimen: pemecahan masalah
  konvensional (analisis sarana-tujuan) memakai kapasitas pemrosesan besar
  sehingga kurang tersedia untuk memperoleh skema.
- Sweller dan Cooper (1985) `[C]`: lima eksperimen aljabar; contoh
  terselesaikan "require considerably less time to process than conventional problems" dan soal serupa berikutnya diselesaikan lebih cepat dan
  dengan lebih sedikit kesalahan; efeknya spesifik untuk soal berstruktur
  identik.
- Barbieri dkk. (2023): meta-analisis efek contoh terselesaikan pada
  kinerja matematika; abstrak tidak terbaca (`T-M`), jadi besar efek tidak
  dikutip.
- Kalyuga dkk. (2003) `[D]`/tinjauan: teknik yang efektif bagi pemula "can lose their effectiveness and even have negative consequences when used with more experienced learners" (efek keahlian terbalik).

**Kekuatan bukti:** `[B]` kuat untuk pemula pada domain terstruktur.

**Batas dan kondisi.** Bukti terkuat dari aljabar dan geometri; efek menyusut
dan dapat berbalik saat pelajar sudah ahli, sehingga contoh perlu "dipudarkan"
(*fading*) menjadi soal sendiri.

**Implikasi untuk coding.** `[inferensi]` Pemula sebaiknya melihat dan
membaca contoh lengkap sebelum diminta menulis dari halaman kosong; ketika
keterampilan naik, pindah ke soal setengah jadi lalu ke soal utuh. Untuk
pemrograman, Morrison dkk. (2015) `[C]` mencoba label sub-tujuan pada contoh
dan melaporkan bahwa "student performance gains did not replicate as expected in the introductory CS task for those who were given subgoal labels"; jadi tidak semua alat beban kognitif
bekerja otomatis di pemrograman (bagian 6).

### 3.5 Bimbingan versus penemuan bebas; kegagalan produktif

**Temuan.**
- Kirschner, Sweller, dan Clark (2006) `[D]`: argumen berbasis arsitektur
  kognitif bahwa instruksi dengan bimbingan minimal "less effective and less efficient"; keunggulan bimbingan "begins to recede only when learners have sufficiently high prior knowledge".
- Alfieri dkk. (2011) `[A]`: dua meta-analisis; penemuan tanpa bantuan
  versus instruksi eksplisit "d = -.38", penemuan yang diperkaya atau dibantu versus bentuk lain "d = .30"; "unassisted discovery does not benefit learners, whereas feedback, worked examples, scaffolding, and elicited explanations do".
- Sinha dan Kapur (2021) `[A]`: 53 studi, 166 perbandingan; pemecahan
  masalah lalu instruksi (PS-I) mengungguli instruksi lalu masalah
  (I-PS), "Hedge's g 0.36". Tetapi "contrasting trends were observed for younger age learners (second to fifth graders) and for the learning of domain-general skills, for which effect sizes favored I-PS".

**Kekuatan bukti:** `[A]`.

**Batas dan kondisi.** Kata kunci adalah **bimbingan**: kegagalan produktif
bukan "biarkan siswa sendirian". Untuk anak usia SD kelas 2 sampai 5, abstrak
Sinha dan Kapur melaporkan arah sebaliknya.

**Implikasi untuk coding.** `[inferensi]` Perilaku "coba dulu sendiri, lalu
ajarkan" cocok untuk remaja dan dewasa dengan fondasi, asalkan diikuti
instruksi yang menghubungkan upaya siswa dengan konsep. Untuk pemula dan
anak SD, urutan "contoh dahulu, baru soal" lebih aman.

### 3.6 Elaborasi dan penjelasan diri (pertanyaan "mengapa")

**Temuan.** Chi dkk. (1994) `[C]`: 14 siswa kelas 8 yang diminta menjelaskan
setiap baris bacaan memperoleh peningkatan lebih besar daripada kelompok yang
membaca dua kali (sampel kecil). Dunlosky dkk. (2013) menilai *elaborative
interrogation* dan *self-explanation* berutilitas sedang karena "have not been adequately evaluated in educational contexts".

**Kekuatan bukti:** `[B]` sedang, studi dasar kecil.

**Implikasi untuk coding.** `[inferensi]` Meminta siswa menjelaskan
invarian dan alasan langkah ("mengapa loop ini benar?") konsisten dengan
bukti, tetapi besar efeknya pada pemrograman tidak diukur oleh rujukan di
bagian ini.

### 3.7 *Dual coding* dan desain multimedia

**Temuan.** Weinstein dkk. (2018) `[D]`/tinjauan tutorial: memasukkan
*dual coding* dalam enam strategi kognitif yang "have received robust support from decades of research" (spaced practice, interleaving, retrieval practice, elaboration, concrete
examples, dual coding). Mayer dan Moreno (2003) `[D]`: teori dengan asumsi
dua kanal (gambar dan verbal), kapasitas terbatas, dan pemrosesan aktif;
mereka menyajikan cara mengurangi beban kognitif pada multimedia.

**Kekuatan bukti:** `[D]`/`[B]` untuk prinsip umum; rincian per desain
tidak diverifikasi di sini.

**Batas dan kondisi.** Abstrak tidak merinci ukuran efek; prinsip desain
(mis. jangan membebani kanal visual dengan teks dan animasi yang sama)
tidak diuji ulang di sini `[belum terverifikasi]` untuk rincian.

**Implikasi untuk coding.** `[inferensi]` Diagram alur, jejak variabel
(*trace table*), dan visualisasi struktur data, berdampingan dengan kode,
memanfaatkan dua kanal. Visualisasi dan fisikalitas dilaporkan efektif
dalam meta-analisis pemrograman (Scherer dkk., 2020, bagian 6.4).

### 3.8 Umpan balik

**Temuan.** Hattie dan Timperley (2007) `[D]`: umpan balik "among the major influences", tetapi jenis dan cara pemberiannya membuat efeknya berbeda; ada yang positif dan ada yang negatif. Wisniewski, Zierer, dan Hattie (2020) `[A]`: 435 studi, "medium effect (d = 0.48)", dengan heterogenitas signifikan; dampaknya "substantially influenced by the information content conveyed"; lebih besar pada hasil kognitif dan keterampilan motorik daripada
motivasi dan perilaku. Alfieri dkk. (2011) memasukkan umpan balik di antara
yang bermanfaat dalam penemuan terbimbing.

**Kekuatan bukti:** `[A]` sedang, **sangat heterogen**.

**Implikasi untuk coding.** `[inferensi]` Umpan balik berisi (bagian mana
yang salah, apa langkah berikutnya) lebih penting daripada sekadar "benar atau
salah". Tinjauan umpan balik otomatis untuk pemrograman (Keuning dkk., 2018)
melaporkan umpan balik "mostly focuses on identifying mistakes and less on fixing problems and taking a next step"; itu gap yang nyata di perkakas.

### 3.9 Kesulitan yang diinginkan, kinerja versus belajar, metakognisi

**Temuan.**
- Soderstrom dan Bjork (2015) `[A]`/tinjauan: tujuan instruksi adalah
  belajar jangka panjang, tetapi apa yang dapat diamati saat latihan adalah
  kinerja, "often an unreliable index of whether the relatively long-term changes that constitute learning have taken place"; orang "often mistakenly interpret their performance during acquisition as a reliable guide to long-term learning".
  Ini inti gagasan *desirable difficulties* (Bjork); sumber primer Bjork
  1994 tidak dibuka, dan istilahnya di sini hanya mengacu ke tinjauan di atas.
- Kornell dan Bjork (2007) `[C]`: abstrak menyatakan keputusan belajar
  mandiri yang baik bertumpu pada "accurate monitoring of ongoing learning, a realistic mental model of how learning happens, and appropriate use of study strategies". Abstrak tidak merinci seberapa sering penilaian diri keliru.
- Dignath dan Büttner (2008): meta-analisis intervensi pembelajaran
  regulasi diri di SD dan menengah; abstrak tidak terbaca (`T-M`), jadi
  tidak ada klaim temuan.
- Roediger dan Karpicke (2006) dan Karpicke dan Roediger (2008) menunjukkan
  kesenjangan keyakinan versus kinerja (bagian 3.1).

**Kekuatan bukti:** `[A]`/`[B]`.

**Batas dan kondisi.** "Sulit lebih baik" **bukan** aturan umum: kesulitan
yang diinginkan adalah kesulitan yang bisa diatasi pelajar. Kesulitan yang
berlebihan adalah beban kognitif (bagian 3.4), terutama bagi pemula.

**Implikasi untuk coding.** `[inferensi]` Rasa lancar saat membaca solusi
bukan bukti telah menguasai; uji dengan menyelesaikan ulang tanpa melihat.
Rutinitas refleksi (jurnal, *exit ticket*) melatih pemantauan diri, tetapi
bukti efeknya pada pemrograman tidak diverifikasi di sini.

### 3.10 Motivasi dan *growth mindset*

**Temuan (diperdebatkan secara terbuka).**
- Sisk dkk. (2018) `[A]`: dua meta-analisis (k = 273, N = 365.915; dan k = 43,
  N = 57.155); "Overall effects were weak for both meta-analyses"; sebagian hasil mendukung bahwa siswa berstatus sosial-ekonomi rendah atau berisiko akademik "might benefit".
- Yeager dkk. (2019) `[B]`: eksperimen nasional di Amerika Serikat dengan
  sampel representatif; intervensi daring kurang dari satu jam
  meningkatkan nilai siswa berprestasi lebih rendah dan pendaftaran ke
  matematika lanjutan; efek bertahan di sekolah dengan norma teman sebaya
  yang selaras dengan pesan intervensi.
- Macnamara dan Burgoyne (2023) `[A]`: 63 studi (N = 97.672); efek keseluruhan
  kecil ("d¯ = 0.05") dan tidak signifikan setelah koreksi bias publikasi;
  untuk bukti berkualitas tertinggi (6 studi) tidak signifikan; penulis
  dengan insentif finansial melaporkan efek lebih besar.

**Kekuatan bukti:** `[A]` **lemah dan diperdebatkan**. Dua tinjauan
independen menemukan efek kecil sampai nol; satu RCT nasional menemukan efek
bersyarat. Kedua sisi harus disampaikan.

**Batas dan kondisi.** Semua studi ini dari konteks Amerika Serikat dan
sejenisnya; tidak ada rujukan terverifikasi dari Indonesia di sini.

**Implikasi untuk coding.** `[inferensi]` Jangan menjadikan ceramah
"kamu bisa kalau berusaha" sebagai strategi inti. Lingkungan kelas yang
membuat kegagalan wajar dan mengubahnya menjadi langkah berikutnya
(mis. kebijakan petunjuk bertahap) masuk akal, tetapi manfaatnya tidak
dibuktikan oleh rujukan ini.

### 3.11 Tidur dan belajar

**Temuan.** Diekelmann dan Born (2010) `[D]`/tinjauan: tidur adalah keadaan
yang mengoptimalkan konsolidasi informasi baru, bergantung pada kondisi
belajar dan waktu tidur. Dewald dkk. (2010) `[A]`: tiga meta-analisis; kualitas tidur, durasi, dan kantuk
berhubungan "significantly but modestly" dengan prestasi sekolah (kantuk
r = -0,133; kualitas r = 0,096; durasi r = 0,069), dengan efek lebih besar
pada peserta yang lebih muda; penulis menyarankan studi longitudinal dan
eksperimen.

**Kekuatan bukti:** `[A]` untuk hubungan modest (korelasional); mekanisme
konsolidasi `[D]`.

**Implikasi untuk coding.** `[inferensi]` Hubungan bersifat korelasional dan
modest. Jadwal latihan intensif menjelang lomba sebaiknya tidak mengorbankan
tidur dengan alasan "belajar lebih lama", tetapi besar manfaatnya tidak dapat
dikuantifikasi dari rujukan ini.

### 3.12 Tinjauan lintas teknik: Dunlosky dkk. (2013) dan Donoghue dan Hattie (2021)

Dunlosky dkk. (2013) `[B]`, tinjauan naratif terstruktur atas sepuluh teknik
(abstrak dibaca): "Practice testing and distributed practice received high utility assessments because they benefit learners of different ages and abilities"; "Elaborative interrogation, self-explanation, and interleaved practice received moderate utility assessments"; teknik berutilitas rendah adalah ringkasan, penyorotan, mnemonik kata kunci, citraan untuk teks, dan membaca ulang, sehingga "practice testing instead of rereading" dianjurkan.

Donoghue dan Hattie (2021) `[A]`: meta-analisis 242 studi, 1.619 efek; rerata
0,56; teknik paling efektif latihan berjarak dan uji latihan; paling kurang
efektif (tetapi masih berefek relatif tinggi) menggarisbawahi dan merangkum;
keterbatasan utama: "the majority of studies in the meta-analysis were based on surface or factual outcomes"; efek lebih besar untuk pelajar berkemampuan lebih rendah, dan umpan balik serta jarak transfer memoderasi.
Tinjauan tutorial Weinstein dkk. (2018) menyajikan enam strategi bagi
pengajar.

**Catatan jujur.** Dua rujukan ini sebagian besar bertumpu pada hasil
faktual dan materi akademik umum. Penerapan pada penyelesaian masalah
algoritmik adalah `[inferensi]`.

## 4. Prof. Stella Christie

### 4.1 Identitas dan bidang (terverifikasi)

| Butir | Isi | Sumber | Status |
| --- | --- | --- | --- |
| Jabatan akademik | Profesor dengan masa jabatan tetap (*tenured*), Departemen Psikologi dan Ilmu Kognitif (*Department of Psychological and Cognitive Sciences*), Universitas Tsinghua; promosi 2022; sebelumnya associate professor bertenure sejak 2018. | Profil resmi departemen, `https://www.pcs.tsinghua.edu.cn/info/1008/1347.htm` (dibuka 2026-11-19). Daftar fakultas berbahasa Inggris, `https://www.pcs.tsinghua.edu.cn/xlxen/Faculty/Current_Faculty/Professors.htm` (dibuka 2026-11-19), mencantumkan "Professor" dan bidang "The Formation and Development of Analogical Reasoning". | `T-W` |
| Peran lain | Kepala peneliti Laboratorium Otak dan Kecerdasan (*Brain and Intelligence Lab*); pendiri Pusat Riset Kognisi Anak THBI; Anggota Dewan *Cognitive Science Society* 2024 sampai Agustus 2030; anggota dewan editorial *Cognitive Psychology* dan jurnal lain. | Profil yang sama. | `T-W` |
| Pendidikan | Ph.D. psikologi kognitif, Northwestern University (2004 sampai 2010), pembimbing Dedre Gentner; B.A. psikologi, Harvard University (1999 sampai 2004), pembimbing Elizabeth Spelke. Sebelumnya Swarthmore College (asisten profesor 2012 sampai 2018, lalu associate professor bertenure), peneliti tamu Stanford, pascadoktor University of British Columbia. | Profil yang sama. | `T-W` |
| Afiliasi pada artikel | Artikel Christie dkk. (2016) mencantumkan afiliasi penulis korespondensi pada Departemen Psikologi, Swarthmore College. | PubMed PMID 26853364, dibaca 2026-11-19. | `T-A` |
| Jabatan di pemerintahan | Halaman resmi Kemdiktisaintek mencantumkan "Prof. Stella Christie, Ph.D." di bagian Wakil Menteri dengan jabatan "Wakil Menteri Pendidikan Tinggi, Sains, dan Teknologi". Halaman yang sama memuat satu entri Wakil Menteri lain ("Prof. Dr. Fauzan, M.Pd."). | `https://kemdiktisaintek.go.id/tentang-kami` (dibuka 2026-11-19). | `T-W` |

Tanggal pelantikan (21 Oktober 2024) hanya muncul pada ringkasan hasil
pencarian web dan tidak dibuka dari sumber primer: `[belum terverifikasi]`.
Satu berita Antara bertanggal 21 Oktober 2024 (dibuka 2026-11-19, `[E]`)
membahas penunjukannya. Status jabatan per hari ini tidak dapat dipastikan
lebih jauh dari halaman Kemdiktisaintek di atas; catatan terbaru dari
pencarian web (Juli 2026) tidak dibuka dan tidak dipakai. Isi halaman
Tsinghua di atas diperoleh lewat perangkat pembaca halaman yang meringkas
teks; butir kunci (jabatan, pendidikan, peran) tidak dibandingkan dengan
sumber kedua.

**Ketidakcocokan kecil yang ditemukan.** Profil Tsinghua menulis nama jurnal
sebuah makalah 2008 sebagai "Brain and Behavioral Science"; Crossref
mendaftarkannya sebagai *Behavioral and Brain Sciences*. Daftar pustaka di
sini memakai Crossref.

### 4.2 Publikasi relevan yang terverifikasi

| Publikasi | Isi terbaca | Status |
| --- | --- | --- |
| Christie dan Gentner (2010), *Journal of Cognition and Development*, 11(3), 356-373, doi 10.1080/15248371003700015 | Abstrak: "We test whether comparison can promote learning of new relational abstractions." Anak prasekolah yang mendengar label untuk pola spasial baru lebih memilih kecocokan objek bila hanya melihat satu contoh, tetapi lebih sering memilih kecocokan relasional bila membandingkan dua contoh; percobaan 2 menunjukkan proses perbandingan, bukan sekadar melihat dua contoh, yang diperlukan (contoh dilihat berurutan tanpa petunjuk membandingkan tidak menolong). "We suggest that structural alignment processes are crucial to developing new relational abstractions." | `T-A` |
| Gentner dan Christie (2010), *Language and Cognition*, 2(2), 261-283, doi 10.1515/langcog.2010.011 | Argumen teoretis `[D]`: kecerdasan manusia ditopang oleh sistem saling-menguatkan antara kapasitas kognisi relasional (penyelarasan dan inferensi struktural) dan sistem simbolik seperti bahasa; kutipan: "language—especially relational language—supports structural alignment and reasoning". Abstrak mereview tiga jenis bukti, termasuk bukti bahwa proses analogis mendukung belajar anak di berbagai ranah. | `T-A` |
| Christie dan Gentner (2014; terbit daring 2013), *Cognitive Science*, 38(2), 383-397, doi 10.1111/cogs.12099 | Abstrak: anak di bawah 4 tahun gagal pada tugas pencocokan relasi identitas (AA cocok dengan BB, bukan CD) dan tidak membaik dengan umpan balik awal; dua jenis pengalaman simbolik-linguistik memfasilitasi penalaran relasional; "children learn to become adept analogical thinkers". | `T-A` |
| Christie, Gentner, Call, dan Haun (2016), *Current Biology*, 26(4), 531-535, doi 10.1016/j.cub.2015.12.054 | Abstrak: anak 3 tahun dan kera besar diperbandingkan pada tugas pemetaan spasial dengan dan tanpa pengecoh kecocokan objek; "young humans show greater object focus than nonhuman apes". Topik: penalaran relasional lintas spesies. | `T-A` |
| Gentner dan Christie (2008), *Behavioral and Brain Sciences*, 31(2), 136-137, doi 10.1017/s0140525x08003622 | Komentar singkat: sistem simbol seperti bahasa dianggap perlu untuk membuat kapasitas relasional operasional. | `T-A` |

Karya terkait yang **bukan** karya Christie (laboratorium Gentner dan
meta-analisis independen):
- Gentner, Anggoro, dan Klibanoff (2011), *Child Development*: kategori
  relasional dipelajari lebih baik bila ada bahasa relasional dan
  perbandingan anggota kategori; anak 3 tahun hanya belajar bila ada kombinasi
  bahasa relasional dan deretan perbandingan dengan penyelarasan bertahap
  (`T-A`; Christie tidak tercantum sebagai penulis dalam metadata Crossref).
- Gentner, Loewenstein, dan Thompson (2003), *Journal of Educational
  Psychology*: *analogical encoding* (belajar dengan membandingkan dua kasus)
  pada negosiasi dewasa; membandingkan dua kasus lebih baik daripada
  mempelajarinya terpisah (`T-A`; Christie bukan penulis).
- Alfieri, Nokes-Malach, dan Schunn (2013), *Educational Psychologist* `[A]`:
  meta-analisis 57 eksperimen (336 uji): perbandingan kasus mengungguli
  bentuk studi kasus lain dan instruksi tradisional ("d = .50"); manfaat lebih
  besar bila pelajar diminta mencari kemiripan, prinsip disajikan **setelah**
  perbandingan, memakai konten perseptual, dan tes dilakukan segera (`T-A`).
- Rittle-Johnson dan Star (2007), *Journal of Educational Psychology* `[B]`:
  70 siswa kelas 7 secara acak membandingkan dua metode penyelesaian aljabar
  versus merefleksikan satu per satu; kelompok membandingkan meraih
  peningkatan lebih besar pada pengetahuan prosedural dan fleksibilitas
  (`T-A`).

### 4.3 Menempatkan temuan secara jujur

- Temuan Christie dan Gentner (2010) berasal dari **anak prasekolah** dan
  **pola spasial**; manfaat membandingkan dua contoh diperluas oleh
  meta-analisis Alfieri dkk. (2013) ke berbagai usia dan materi, termasuk
  aljabar (Rittle-Johnson dan Star, 2007).
- **Tidak ada studi terverifikasi** dalam penelusuran ini yang menguji
  perbandingan kasus pada pembelajaran algoritma atau pemrograman. Maka
  "membandingkan solusi brute force dengan solusi cepat" atau "membandingkan
  dua soal yang berbagi pola" adalah **penerapan yang masuk akal**
  (`[inferensi]`), bukan klaim bukti langsung.
- Pola yang dianjurkan oleh bukti yang ada `[parafrasa]`: tampilkan dua
  contoh berdampingan; beri petunjuk eksplisit untuk mencari kesamaan
  struktur; beri nama relasi yang ditemukan (bahasa relasional); sajikan
  prinsip setelah siswa membandingkan.

### 4.4 Pernyataan publik tentang pendidikan (dibedakan dari riset)

Satu sumber dibuka: GovInsider Asia, "Wamen Stella Christie: Kita harus fokus
pada masalah yang ingin diselesaikan AI"
(`https://govinsider.asia/intl-en/article/wamen-stella-christie-kita-harus-fokus-pada-masalah-yang-ingin-diselesaikan-ai`,
dibuka 2026-11-19). Teks menyebut acara "AI Governance for the Greater Good:
Balancing Innovation and Ethics" yang diselenggarakan CSIS di Jakarta pada
22 April; **tahun tidak tertulis pada teks** (`[belum terverifikasi]`).
Kutipan pendek yang terbaca (`[E]`, pernyataan publik):
- "Yang terpenting adalah proses berpikirnya, yaitu bagaimana kita
  mengevaluasi output dari AI,"
- "manusia bisa belajar dari jumlah data yang sangat kecil,"
- "Kemampuan manusia untuk memahami konsep, membentuk abstraksi, dan menarik
  kesimpulan" (potongan kalimat).

Artikel juga memparafrasa bahwa ia mengutip penelitian MIT yang
membandingkan pengguna ChatGPT, mesin pencari, dan hanya berpikir sendiri.
Kutipan langsung tentang studi itu **tidak** tertulis di artikel. Studi MIT
yang dimaksud kemungkinan adalah Kosmyna dkk. (2025), preprint arXiv
2506.08872, yang halamannya dibuka: 54 peserta menyelesaikan tiga sesi (18
menyelesaikan sesi keempat), tugas menulis esai, pengukuran EEG; "LLM users consistently underperformed at neural, linguistic, and behavioral levels". Halaman arXiv **tidak** menyebut tinjauan sejawat dan tugasnya
menulis esai, bukan pemrograman; kesesuaian dengan studi yang ia maksud adalah
`[inferensi]`, `[belum terverifikasi]`. Dipakai di sini hanya sebagai bukti awal
(`[E]`).

Artikel Antara 21 Oktober 2024 menyatakan penelitiannya berfokus pada
"bagaimana manusia belajar dan berpikir" dan pertanyaan pemandu "Mengapa Kita
Pintar?"; kata-kata itu adalah **kata wartawan**, bukan kutipan Prof. Christie.

**Selaras dengan riset yang diverifikasi.** Penekanan pada abstraksi dan
relasi (4.2) cocok dengan prinsip "tanpa hafalan" pada silabus OSN
(bagian 8.1). Penekanan pada proses berpikir dan evaluasi keluaran AI cocok
dengan bukti awal tentang risiko pemakaian AI tanpa pagar pengaman (bagian
6.6).

## 5. Mitos belajar dan bukti yang membantahnya

| Mitos | Klaim | Bukti | Rujukan |
| --- | --- | --- | --- |
| Gaya belajar (visual, auditori, kinestetik) | Pembelajaran paling efektif bila materi disesuaikan dengan gaya belajar pilihan siswa (hipotesis *meshing*). | Pashler dkk. (2008) `[B]`: tinjauan kritis atas hipotesis *meshing* (instruksi paling baik bila sesuai preferensi pelajar). Abstrak Pashler yang dibaca hanya mendefinisikan hipotesis; kesimpulannya dikutip dari abstrak Rogowsky dkk.: Pashler dkk. "concluded that this hypothesis lacks empirical evidence and subsequently described the experimental design needed to evaluate the meshing hypothesis". Rogowsky dkk. (2015) `[C]`: mengikuti desain itu pada orang dewasa berpendidikan perguruan tinggi, "failed to statistically support the meshing hypothesis" untuk pemahaman bacaan versus audio. Willingham dkk. (2015) `[D]`: "scientific support for these theories is lacking". Preferensi itu nyata, tetapi menyesuaikan instruksi dengan preferensi tidak terbukti membantu. | Pashler dkk., 2008 (`T-A`); Rogowsky dkk., 2015 (`T-A`); Willingham dkk., 2015 (`T-A`) |
| Otak kiri / otak kanan | Orang dominan otak kiri (logis) atau otak kanan (kreatif). | Nielsen dkk. (2013) `[C]`: 1.011 individu usia 7 sampai 29; lateralisasi adalah "local rather than global property of brain networks"; data "not consistent with a whole-brain phenotype of greater 'left-brained' or greater 'right-brained' network strength". | Nielsen dkk., 2013 (`T-A`) |
| Manusia hanya memakai 10% otak | 90% otak tidak terpakai. | Boyd (Scientific American, 7 Februari 2008) `[E]`, sumber populer yang menyadur ahli saraf: pencitraan menunjukkan sebagian besar area aktif sepanjang 24 jam; "Evidence would show over a day you use 100 percent of the brain" (John Henley), "so wrong it is almost laughable" (Barry Gordon). Mitos ini termasuk "classic neuromyths" yang diteliti Macdonald dkk. (2017). Tidak ada rujukan jurnal primer yang dibuka khusus untuk klaim 10% ini. | Boyd, 2008 (`T-W`); Macdonald dkk., 2017 (`T-A`) |
| Piramida belajar / kerucut Dale dengan persentase ("kita ingat 10% dari yang dibaca, 90% dari yang dikerjakan") | Angka retensi tetap per metode belajar. | Subramony dkk. (2014), ERIC EJ1057220 `[D]`/`[E]` (halaman ERIC; `[parafrasa]`): abstrak menyatakan kritikus telah mencoba membongkar bagan retensi sejak 1971, dan sejak sekitar 2002 menargetkan penggabungan bagan itu dengan Kerucut Pengalaman Edgar Dale yang disebut "kerucut yang dirusak". Halaman ERIC ini hanya mencatat sejarah kritik; abstrak tidak terbaca utuh karena batas kutipan, dan teks artikel tidak dibaca. Apa pun hasil analisisnya, `[inferensi]`: persentase seragam itu tidak punya sumber primer yang kami temukan, dan literatur bagian 3 (efek uji, jarak, bimbingan) menunjukkan efektivitas bergantung pada kondisi, bukan pada satu persentase tetap. | Subramony dkk., 2014 (`T-W`, hanya halaman ERIC) |
| *Digital native* | Generasi yang tumbuh dengan teknologi otomatis mahir dan punya cara belajar baru yang menuntut reformasi pendidikan. | Bennett dkk. (2008) `[D]`: tinjauan kritis; "the debate can be likened to an academic form of a 'moral panic'"; situasi sebenarnya "far from clear". Kirschner dan De Bruyckere (2017), judul "The myths of the digital native and the multitasker": abstrak tidak terbaca (`T-M`). | Bennett dkk., 2008 (`T-A`); Kirschner dan De Bruyckere, 2017 (`T-M`) |
| Multitasking | Orang bisa belajar efektif sambil mengerjakan hal lain. | Ophir dkk. (2009) `[C]`: pengguna multimedia berat lebih rentan interferensi dan lebih buruk dalam pergantian tugas. Sana dkk. (2013) `[C]`: peserta yang bermultitasking di laptop saat kuliah mendapat skor lebih rendah, "and participants who were in direct view of a multitasking peer scored lower". | Ophir dkk., 2009 (`T-A`); Sana dkk., 2013 (`T-A`) |
| Membaca ulang dan menyorot sebagai strategi utama | Belajar efektif = membaca ulang dan menyorot. | Dunlosky dkk. (2013): keduanya berutilitas rendah; "practice testing instead of rereading". Roediger dan Karpicke (2006): membaca ulang menaikkan keyakinan tanpa menaikkan retensi tertunda. Donoghue dan Hattie (2021): menggarisbawahi dan merangkum paling kurang efektif di antara sepuluh teknik (tetapi masih berefek relatif tinggi menurut skala meta-analisis tersebut). | Dunlosky dkk. (`T-A`); Roediger dan Karpicke (`T-A`); Donoghue dan Hattie (`T-A`) |
| "Anak harus mulai coding sedini mungkin agar unggul" | Awal yang dini memberi keunggulan jangka panjang atau meningkatkan kecerdasan. | Tidak ditemukan dan tidak diverifikasi satu pun studi yang menunjukkan jendela kritis untuk memulai pemrograman; penelusuran ini terbatas, jadi ketiadaan temuan **bukan** bukti ketiadaan. Klaim transfer kognitif: Scherer dkk. (2019) `[A]` menemukan transfer sedang ("g = 0.49"; dekat "g = 0.75"; jauh "g = 0.47") tetapi "significantly larger transfer effects for studies with untreated control groups than those with treated (active) control groups", dan studi terbit lebih besar efeknya daripada literatur abu-abu. Sala dan Gobet (2017) `[A]` (catur, musik, pelatihan memori kerja, **bukan** pemrograman): "far transfer of learning rarely occurs" dan efek berbanding terbalik dengan kualitas desain. Jadi: klaim "wajib sedini mungkin" tidak didukung bukti yang kami buka; manfaat belajar pemrograman pada keterampilan pemrograman sendiri jauh lebih terdokumentasi daripada pada kecerdasan umum. | Scherer dkk., 2019 (`T-A`); Sala dan Gobet, 2017 (`T-A`) |
| (Tambahan) "Guru dan masyarakat umum paham ilmu otak" | Pengetahuan umum cukup melindungi dari mitos. | Dekker dkk. (2012) `[D]`: guru yang antusias terhadap ilmu saraf percaya rata-rata 49% neuromitos, "particularly myths related to commercialized educational programs"; pengetahuan umum yang lebih banyak meramalkan kepercayaan lebih besar pada neuromitos. Macdonald dkk. (2017) `[D]`: pelatihan "decreases but does not eliminate beliefs in neuromyths". | Dekker dkk., 2012 (`T-A`); Macdonald dkk., 2017 (`T-A`) |

Pelajaran praktis `[inferensi]`: mitos populer sering menempel pada produk
komersial dan terasa masuk akal, sehingga dokumen kurikulum perlu memeriksa
kata kunci mitos (gaya belajar, otak kiri/kanan, persentase retensi) sebelum
disetujui.

## 6. Riset pendidikan komputasi

### 6.1 Peta literatur

Luxton-Reilly dkk. (2018) menyajikan tinjauan sistematis luas atas
pemrograman pengantar (`T-A`; abstrak singkat). Qian dan Lehman (2017) `[A]`
menemukan siswa menunjukkan "various misconceptions and other difficulties in syntactic knowledge, conceptual knowledge, and strategic knowledge", dan
menyarankan pengembangan pengetahuan konten pedagogis guru, termasuk
pengetahuan tentang miskonsepsi siswa.

### 6.2 Membaca, menelusuri (*tracing*), dan mesin konseptual (*notional machine*)

- Lister dkk. (2004) `[C]`: studi lintas tujuh negara tentang kemampuan
  memprediksi hasil kode pendek dan melengkapi kode; menawarkan penjelasan
  alternatif bahwa banyak siswa memiliki "fragile grasp" prinsip dasar dan
  kemampuan menjalankan tugas rutin seperti menelusuri kode (abstrak
  dibaca sebagian; frasa persis "fragile grasp of both basic programming principles and the ability to systematically carry out routine programming tasks, such as tracing" tertulis di abstrak).
- Sorva (2013) `[A]`/tinjauan: literatur "points to notional machines as a major challenge in introductory programming education"; instruktur
  sebaiknya menjadikan *notional machine* tujuan belajar eksplisit.
- Fincher dkk. (2020): laporan kelompok kerja yang mendefinisikan dan
  menelusuri penggunaan *notional machine*, termasuk contoh dari guru
  berpengalaman (`T-A`; efek pada belajar bukan klaim laporan ini).
- Du Boulay (1986): artikel pengantar tentang kesulitan belajar
  pemrograman dan peran mesin konseptual (`T-A`, `[D]`).

### 6.3 Urutan aktivitas: PRIMM, Parsons, contoh bertahap

- **PRIMM** (Sentance dkk., 2019) `[C]`: dievaluasi pada 13 sekolah dengan
  493 siswa usia 11 sampai 14 bersama kelompok kontrol, 8 sampai 12 minggu;
  "Learners performed better in the post test than the control group"; guru melaporkan manfaat untuk kelas berkemampuan campuran. Desain
  campuran (kuantitatif dan wawancara); bukan RCT, sehingga bukti sedang.
- **Soal Parsons** (potongan kode diacak, siswa menyusun urutannya):
  Ericson dkk. (2017) `[C]`: mengerjakannya "took significantly less time" daripada memperbaiki kode salah atau menulis kode setara, dan "no statistically significant difference in the learning performance, or in student retention of the knowledge one week later". Jadi bukti mendukung **efisiensi**, bukan keunggulan belajar. Ericson dkk. (2022) menyajikan tinjauan
  literatur dan rancangan studi lanjutan.
- **Keterampilan bertahap** (Xie dkk., 2019) `[C]`: studi eksploratori campuran;
  mengajarkan tracing, sintaks, memahami templat, lalu menulis dengan templat
  secara bertahap menghasilkan "improved completion rate on practice exercises, and decreased error rate and improved understanding of the post-test". Studi eksploratori; tidak setara RCT.
- **Sub-tujuan** (Morrison dkk., 2015): hasil campuran (bagian 3.4).

### 6.4 Blok ke teks, berpasangan, dan transfer

- Weintrop dan Wilensky (2017) `[C]`: kuasi-eksperimen lima minggu, SMA;
  kelompok blok "showed greater learning gains and a higher level of interest in future computing courses", sedangkan kelompok teks menganggap pengalamannya lebih mirip pemrogram profesional. Jadi ada pertukaran.
- Hanks dkk. (2011) `[A]`/tinjauan literatur, program sarjana: pemrograman
  berpasangan dikaitkan dengan peningkatan keberhasilan di mata kuliah
  pengantar, retensi jurusan, dan hasil belajar; tantangan terbesar adalah
  penjadwalan dan kecocokan pasangan. Bukti terkuat dari mahasiswa.
- Scherer dkk. (2020) `[A]`: meta-analisis 139 intervensi, 375 ukuran efek:
  belajar pemrograman per se "g = 0.81"; visualisasi dan fisikalitas efektif;
  kolaborasi dalam instruksi metakognisi, dan visualisasi lewat Scratch
  tercatat sangat efektif. **Perbedaan antarpendekatan hanya "marginally"**
  (abstrak).
- Scherer dkk. (2019) dan Sala dan Gobet (2017) saling berhadapan soal
  transfer jauh (bagian 5, baris "mulai coding sedini mungkin"): hasilnya
  moderat tetapi lebih besar pada kontrol pasif.

### 6.5 Umpan balik otomatis dan miskonsepsi

Keuning dkk. (2018) `[A]`: tinjauan sistematis 101 perkakas; umpan balik
terutama mengidentifikasi kesalahan dan jarang membantu memperbaiki atau
menentukan langkah berikutnya; guru sulit menyesuaikan perkakas. Ini
berhubungan langsung dengan prinsip umpan balik (3.8): isi umpan balik, bukan
sekadar ada.

### 6.6 AI generatif dalam belajar pemrograman (bukti awal dan risiko)

| Studi | Temuan terbaca | Jenis dan batas |
| --- | --- | --- |
| Kazemitabaar dkk. (2023) | 69 pemula usia 10 sampai 17, 45 tugas Python; akses Codex meningkatkan kinerja penulisan kode (1,15 kali laju penyelesaian, skor 1,8 kali lebih tinggi) tanpa menurunkan kinerja tugas modifikasi manual; tes pasca satu minggu: akses Codex "slightly better" tetapi tidak signifikan. | `[C]`, eksperimen terkontrol, satu minggu. |
| Prather dkk. (2024) | 21 sesi laboratorium; terjadi "unfortunate divide": siswa yang tidak kesulitan memakai GenAI untuk mempercepat; siswa yang kesulitan mengalami kesulitan metakognitif yang diperparah dan memiliki "illusion of competence". | `[C]`/kualitatif, sampel kecil. |
| Bastani dkk. (2025) | Eksperimen lapangan hampir seribu siswa SMA, **matematika**, bukan pemrograman; akses GPT-4 meningkatkan nilai latihan (48% untuk GPT Base, 127% untuk GPT Tutor) tetapi setelah akses dicabut siswa GPT Base "perform worse than those who never had access" (penurunan nilai 17%); pagar pengaman pada GPT Tutor "largely mitigated" dampak negatif. | `[B]`, lapangan, domain matematika; ekstrapolasi ke coding `[inferensi]`. |
| Prather dkk. (2023); Denny dkk. (2024) | Laporan kelompok kerja dan artikel sudut pandang tentang peluang dan tantangan; sintesis 71 artikel primer (kelompok kerja). | `[A]`/`[D]`, tinjauan; bidang bergerak cepat. |
| Kosmyna dkk. (2025) | Lihat bagian 4.4: preprint, penulisan esai, 54 peserta. | `[E]`, tanpa keterangan tinjauan sejawat. |

Kesimpulan hati-hati `[inferensi]`: AI membantu kinerja saat dipakai, tetapi
bukti awal menunjukkan risiko pada belajar bila akses tanpa pagar pengaman
dan bila siswa belum punya metakognisi; efek jangka panjang pada keterampilan
pemrograman belum dipastikan.

## 7. Perkembangan usia

| Kelompok | Apa yang didukung bukti terbaca | Yang tidak didukung / tidak diverifikasi |
| --- | --- | --- |
| Usia dini (TK) | Anak di bawah 4 tahun belum andal pada pencocokan relasi identitas dan perlu pengalaman simbolik-linguistik (Christie dan Gentner, 2014); anak prasekolah dapat belajar relasi baru dengan membandingkan dua contoh (Christie dan Gentner, 2010) dan dengan bahasa relasional (Gentner dkk., 2011). Bers dkk. (2014) menulis eksplorasi kurikulum robotika anak usia dini (`T-M`, abstrak tidak terbaca): tidak dipakai untuk klaim temuan. | Kurikulum "coding" TK sebagai kebutuhan: tidak ada bukti terbaca. Bukti Sinha dan Kapur (2021) menyarankan urutan instruksi dahulu untuk usia muda, tetapi populasi studinya kelas 2 sampai 5, bukan TK. |
| SD | Abstrak Sinha dan Kapur (2021): untuk kelas 2 sampai 5, arah efek menguntungkan instruksi lalu masalah (I-PS), berlawanan dengan arah keseluruhan; ini mendukung contoh dan instruksi lebih dulu. Dewald dkk. (2010): efek hubungan tidur dengan prestasi lebih besar pada peserta yang lebih muda. | Tidak ada rujukan terbaca yang menguji pemrograman khusus SD secara terkontrol selain tinjauan umum. |
| Remaja (SMP, SMA) | PRIMM diuji pada usia 11 sampai 14 (Sentance dkk., 2019); blok versus teks pada SMA (Weintrop dan Wilensky, 2017); eksperimen AI pada usia 10 sampai 17 (Kazemitabaar dkk., 2023); growth mindset: Yeager dkk. (2019) pada siswa menengah AS. Dewald dkk. (2010) tentang tidur pada anak dan remaja. | Sumber terbaca tidak membandingkan pendekatan untuk remaja Indonesia secara khusus. |
| Mahasiswa dan dewasa | Pemrograman berpasangan paling banyak dibuktikan pada mahasiswa (Hanks dkk., 2011). Efek keahlian terbalik (Kalyuga dkk., 2003): pelajar yang sudah berpengalaman dapat dirugikan oleh dukungan yang membantu pemula; pelajar dewasa pemula pada topik baru tetap pemula pada topik itu. | **Andragogi:** teori Knowles tidak diuji di dokumen ini; hanya satu rujukan kritik yang diverifikasi metadatanya (Hartree, 1984, "Malcolm Knowles' Theory of Andragogy: A Critique", `T-M`, abstrak tidak terbaca). Maka klaim "orang dewasa belajar dengan cara yang berbeda" diperlakukan sebagai teori, `[belum terverifikasi]` sebagai temuan empiris. Bukti yang lebih kokoh untuk dewasa adalah prinsip umum (bagian 3) dan efek keahlian terbalik. |

Peringatan umum: studi dasar prinsip belajar umumnya dilakukan pada
mahasiswa universitas di negara WEIRD (Agarwal dkk., 2021 mencatat hanya 6%
eksperimen kelas dari negara non-WEIRD). Penerapan ke anak Indonesia pada
semua jenjang adalah `[inferensi]` sampai ada studi lokal.

## 8. Rekomendasi per program dan celah terhadap repositori

Pembedaan: **K** = didukung bukti kuat (`[A]` atau `[B]` untuk prinsipnya);
**M** = masuk akal tetapi bukti terbatas untuk pemrograman atau untuk usia itu
(`[inferensi]`).

**Catatan status (v0.2.0, 2026-11-19).** Bagian 8 ditulis ketika hanya `osn`
dan `sma-coding` ada di `main`. Sekarang tujuh program terdaftar
(`data/programs.json`): `osn`, `sma-coding` v1.3.0, `tk-coding` v1.0.0,
`sd-coding` v1.0.0, `smp-coding` v1.1.0, `kuliah-coding` v1.1.0, dan
`dewasa-coding` v1.1.0; peta jenjang di
[`docs/programs/README.md`](../programs/README.md). Rekomendasi di bawah
tetap seperti ditulis dan **belum dicocokkan ulang** dengan silabus yang
disetujui, kecuali yang dicatat tersendiri.

### 8.1 OSN (`data/osn/`, `docs/silabus/`)

Dokumen dibaca pada 2026-11-19. Isi transkripsi **tidak diubah**; yang
dicatat hanya kesesuaian dan celah.

**Yang sudah sejalan dengan bukti.**

| Fitur repositori | Prinsip bukti |
| --- | --- |
| Prinsip utama silabus: pembinaan "tidak berorientasi menghafal algoritma", siklus pahami, modelkan, baca constraint, estimasi kompleksitas, pilih (`docs/silabus/README.md`; DP "tanpa hafalan" pada `04-silabus-28-minggu.md`) | Mengutamakan pemahaman dan transfer (3.4, 4.3); sejalan dengan Dunlosky dkk. yang merendahkan hafalan pasif (3.12). |
| Kuis mengingat kembali topik lama 15 menit di awal sesi 1 (`data/osn/session-template.json`) | Latihan mengingat kembali (3.1) `K`. |
| Konsep inti dengan *worked example* lalu soal bertingkat dari contoh ke transfer, diakhiri soal mandiri (session-template) | Contoh terselesaikan dan *fading* (3.4) `K`. |
| Kebijakan petunjuk bertahap lima tingkat (`data/osn/hint-policy.json`); soal yang sampai editorial wajib di-*re-solve* | Bimbingan terukur, bukan penemuan bebas (3.5) `K`; *re-solve* ~ uji mengingat kembali pada keterampilan (3.1) `M`. |
| *Re-solve* 3 sampai 7 hari tanpa hint untuk soal bertingkat B; *re-solve* terjadwal untuk C (`06-evaluasi-rubrik-kpi.md`, `kpi-definitions.json`) | Spasi (3.2) `K` pada prinsipnya, tetapi lihat celah 1. |
| *Exit ticket* 3 poin dipahami + 1 gap; review error minggu lalu; *error log*; penjelasan solusi tanpa editorial | Metakognisi dan penjelasan diri (3.6, 3.9) `M`. |
| Minggu integrasi dan *mixed-topic contest* (mis. minggu 8, 16, 20, 24, 27 pada `04-silabus-28-minggu.md`) | Interleaving (3.3) `K` untuk membedakan jenis soal. |
| *Dry-run*, tracing C++ (minggu 1, 25), bandingkan solusi cepat dengan *brute-force oracle* (`playbooks.json`) | Tracing/mesin konseptual (6.2) `K`; membandingkan solusi (4.3) `M`. |

**Celah (usulan, tidak mengubah transkripsi).**

1. Jarak *re-solve* hanya satu rentang ("3-7 hari"). Bukti spasi menunjukkan
   jarak optimal bertambah bila materi harus diingat lebih lama (Cepeda dkk.,
   2008); belum ada jadwal ulang berjenjang (mis. ulang kedua lebih jauh).
   Rekomendasi `M`: catat sebagai usulan perubahan di luar transkripsi
   (lapisan prosedur operasional), bukan di data transkripsi.
2. Tidak ada langkah eksplisit "membandingkan dua contoh dan menamai
   pola"; ada pembandingan solusi cepat dan brute force, tetapi bukan
   pembandingan kasus yang berbagi struktur (4.3). `M`.
3. Tidak ada kebijakan pemakaian AI generatif oleh siswa dan mentor
   dalam dokumen OSN yang dibaca (`grep` istilah terkait di
   `docs/silabus/04` dan `07` tidak menemukan kebijakan); bukti awal 6.6
   menunjukkan risiko. `M`; keputusan pemilik. **Status v0.2.0:** ditangani
   oleh [`docs/operations/kebijakan-ai-osn.md`](../operations/kebijakan-ai-osn.md)
   (PR #159, issue #139), di lapisan prosedur operasional.
4. Tidak ada panduan tidur dan beban istirahat pada fase intensif
   (`learning-load.json` memuat 2 sesi 120 menit dan 4 sampai 8 jam latihan
   mandiri per minggu, tanpa catatan istirahat). Bukti hanya korelasional
   modest (3.11). `M`.
5. Motivasi dan lingkungan kegagalan tidak dinyatakan; bukti growth mindset
   lemah (3.10), jadi **tidak** direkomendasikan menambah intervensi khusus.

### 8.2 `sma-coding` (`docs/programs/sma-coding/silabus.md`, `data/sma-coding/`)

Dibaca sebagian (README, pencarian kata kunci, dan baris terkait pada silabus; tidak dibaca utuh): silabus v1.2 (disetujui pemilik 2026-11-19; sejak itu direvisi ke v1.3.0, #139); pola tiap semester
(minggu 1 sampai 12 materi, 13 proyek mini, 14 asesmen dan refleksi);
asesmen formatif fondasi; jurnal; kerja berpasangan (mis. M12 Git dan
kolaborasi dasar); modul M11 AI generatif dan verifikasi pada silabus.

| Rekomendasi | Jenis | Dasar |
| --- | --- | --- |
| Pakai urutan PRIMM (prediksi, jalankan, selidiki, modifikasi, buat) atau minimal "baca dan prediksi sebelum menulis" pada blok fondasi kelas X | `K` untuk remaja usia 11 sampai 14 (sedang, kuasi), `M` untuk kelas X | Sentance dkk. (2019) |
| Tambahkan kuis mengingat kembali berjarak lintas minggu dan lintas semester pada asesmen formatif (saat ini formatif dilebur ke minggu 14) | `K` pada prinsipnya, `M` untuk pemrograman | 3.1, 3.2 |
| Soal Parsons dan soal setengah jadi sebagai jembatan menuju menulis dari halaman kosong | `M` (efisiensi terbukti, belajar sama) | Ericson dkk. (2017) |
| Aktivitas tracing dan *notional machine* eksplisit di fondasi | `K` | Lister dkk. (2004); Sorva (2013) |
| Pemrograman berpasangan terstruktur untuk proyek mini | `K` untuk mahasiswa, `M` untuk SMA | Hanks dkk. (2011) |
| Modul AI generatif: pertahankan tujuan "memverifikasi keluaran", tambah pagar pengaman bila siswa memakai AI selama latihan | `M` | Bastani dkk. (2025); Prather dkk. (2024) |
| Beri tahu bahwa penggunaan blok dulu lalu teks memiliki pertukaran, bila jalur memakai blok | `M` | Weintrop dan Wilensky (2017) |

Celah: asesmen formatif belum dinyatakan sebagai uji mengingat kembali
berjarak; proyek mini dan refleksi tidak menyebut mekanisme umpan balik yang
berisi langkah berikutnya (3.8).

### 8.3 `kuliah-coding` (`docs/programs/kuliah-coding/`, silabus v1.1.0 disetujui dan terdaftar)

Draf tiga jalur (U, I, K) dalam SKS, yang kini menjadi silabus v1.1.0 disetujui; hanya bagian awal draf dan riset yang dibaca pada 2026-11-19. Rekomendasi:

- Pemrograman berpasangan (`K`, bukti terkuat pada mahasiswa; Hanks dkk., 2011).
- Soal bercampur dan kuis kumulatif untuk jalur kompetitif (K), dengan
  latihan berjarak (`K` pada prinsipnya).
- Umpan balik otomatis yang berisi langkah perbaikan (3.8, 6.5) `M`.
- Pagar pengaman pemakaian AI di mata kuliah dasar (`M`, 6.6).
- Efek keahlian terbalik: pada tahun lanjut kurangi contoh terselesaikan
  (3.4).

Celah: draf belum memuat rancangan asesmen berjarak atau kebijakan AI
`[belum terverifikasi]` (draf besar, hanya dibaca bagian awal). Status v0.2.0:
silabus v1.1.0 memuat penguatan kebijakan AI (bagian 6.3-6.5); asesmen
berjarak belum dicek ulang.

### 8.4 `tk`, `sd`, `smp`, `dewasa`-coding (kini disetujui dan terdaftar)

Dokumen belum ada di `main` saat riset ini disusun, sehingga semua rekomendasi
berikut ditulis sebagai rencana. Sejak itu keempatnya disetujui pemilik,
terdaftar, dan ter-encode (`tk-coding` v1.0.0, `sd-coding` v1.0.0,
`smp-coding` v1.1.0, `dewasa-coding` v1.1.0); rekomendasi belum dicocokkan
ulang dengan silabus yang disetujui.

| Program | Rekomendasi | Jenis |
| --- | --- | --- |
| tk | Mulai dari bermain dan bahasa relasional (nama relasi: "lebih besar dari", "di atas"); jangan menjanjikan manfaat kognitif luas dari coding dini. | `M` (Christie dan Gentner, 2010, 2014; Scherer dkk., 2019; Sala dan Gobet, 2017) |
| sd | Contoh lebih dahulu, baru soal; aktivitas membandingkan dua contoh dengan petunjuk; bahan fisik/visual. | `M` untuk SD (Sinha dan Kapur, 2021; Alfieri dkk., 2013; Scherer dkk., 2020) |
| smp | PRIMM; soal Parsons; pemrograman blok lalu teks dengan sadar akan pertukaran. | `K` untuk PRIMM usia 11 sampai 14, `M` lainnya |
| dewasa | Perhatikan efek keahlian terbalik (pelajar dewasa dengan pengalaman); tes mengingat kembali berjarak; pemrograman berpasangan opsional; kebijakan AI. Hindari mengandalkan andragogi sebagai bukti. | `M` |

## 9. Batasan dokumen dan pertanyaan terbuka untuk pemilik

**Batasan.**
- Teks lengkap artikel tidak dibaca; hanya abstrak dan metadata (bagian 1.3).
- Enam rujukan berstatus `T-M` (abstrak tidak terbaca): tidak ada klaim
  temuan dari rujukan tersebut.
- Bukti dari Indonesia hampir tidak ada; semua penerapan ke Indonesia adalah
  `[inferensi]`.
- Penelusuran bukti pemrograman spesifik untuk uji mengingat kembali, spasi,
  dan interleaving tidak menemukan rujukan yang dibuka; bukan bukti
  ketiadaan.
- Kutipan dari halaman web diambil lewat perangkat pembaca halaman; kutipan
  singkat itu disalin sebagaimana dikembalikan perangkat, bukan dari
  tangkapan layar.

**Pertanyaan terbuka** (keputusan pemilik, bukan agent):

| Pertanyaan | Opsi |
| --- | --- |
| Apakah dokumen ini ditautkan dari `README.md`, `AGENTS.md`, dan `docs/architecture/repository-map.md` sebagai rujukan pedagogi lintas program? | Tautkan (Disarankan) / tunda sampai disetujui. |
| Apakah ada proses penyusunan pedoman pedagogi turunan (mis. standar "tanpa mitos" untuk modul `content/`)? | Ya, issue baru / tidak. |
| Apakah kebijakan penggunaan AI generatif dirumuskan per program? | Ya, per program (Disarankan) / tidak. |

## 10. Daftar pustaka

Format APA. Status verifikasi di kolom akhir (kode di bagian 1.3). Semua
dicek 2026-11-19. Entri tanpa DOI memakai URL halaman yang dibuka.

### 10.1 Artikel dan prosiding

Judul dan penulis disalin dari metadata Crossref (kapitalisasi judul mengikuti penerbit, bukan kaidah APA kalimat). Christie dan Gentner "2014": terbit daring 2013-11-12, volume 38(2) tahun 2014.

Adesope, O. O., Trevisan, D. A., & Sundararajan, N. (2017). Rethinking the Use of Tests: A Meta-Analysis of Practice Testing. *Review of Educational Research*, *87*(3), 659-701. https://doi.org/10.3102/0034654316689306 — `T-A`

Agarwal, P. K., Nunes, L. D., & Blunt, J. R. (2021). Retrieval Practice Consistently Benefits Student Learning: a Systematic Review of Applied Research in Schools and Classrooms. *Educational Psychology Review*, *33*(4), 1409-1453. https://doi.org/10.1007/s10648-021-09595-9 — `T-A`

Alfieri, L., Brooks, P. J., Aldrich, N. J., & Tenenbaum, H. R. (2011). Does discovery-based instruction enhance learning?. *Journal of Educational Psychology*, *103*(1), 1-18. https://doi.org/10.1037/a0021017 — `T-A`

Alfieri, L., Nokes-Malach, T. J., & Schunn, C. D. (2013). Learning Through Case Comparisons: A Meta-Analytic Review. *Educational Psychologist*, *48*(2), 87-113. https://doi.org/10.1080/00461520.2013.775712 — `T-A`

Barbieri, C. A., Miller-Cotto, D., Clerjuste, S. N., & Chawla, K. (2023). A Meta-analysis of the Worked Examples Effect on Mathematics Performance. *Educational Psychology Review*, *35*(1), 11. https://doi.org/10.1007/s10648-023-09745-1 — `T-M`

Bastani, H., Bastani, O., Sungu, A., Ge, H., Kabakcı, Ö., & Mariman, R. (2025). Generative AI without guardrails can harm learning: Evidence from high school mathematics. *Proceedings of the National Academy of Sciences*, *122*(26), e2422633122. https://doi.org/10.1073/pnas.2422633122 — `T-A`

Bennett, S., Maton, K., & Kervin, L. (2008). The ‘digital natives’ debate: A critical review of the evidence. *British Journal of Educational Technology*, *39*(5), 775-786. https://doi.org/10.1111/j.1467-8535.2007.00793.x — `T-A`

Bers, M. U., Flannery, L., Kazakoff, E. R., & Sullivan, A. (2014). Computational thinking and tinkering: Exploration of an early childhood robotics curriculum. *Computers & Education*, *72*, 145-157. https://doi.org/10.1016/j.compedu.2013.10.020 — `T-M`

Brunmair, M., & Richter, T. (2019). Similarity matters: A meta-analysis of interleaved learning and its moderators. *Psychological Bulletin*, *145*(11), 1029-1052. https://doi.org/10.1037/bul0000209 — `T-A`

Carpenter, S. K., Cepeda, N. J., Rohrer, D., Kang, S. H. K., & Pashler, H. (2012). Using Spacing to Enhance Diverse Forms of Learning: Review of Recent Research and Implications for Instruction. *Educational Psychology Review*, *24*(3), 369-378. https://doi.org/10.1007/s10648-012-9205-z — `T-M`

Cepeda, N. J., Pashler, H., Vul, E., Wixted, J. T., & Rohrer, D. (2006). Distributed practice in verbal recall tasks: A review and quantitative synthesis. *Psychological Bulletin*, *132*(3), 354-380. https://doi.org/10.1037/0033-2909.132.3.354 — `T-A`

Cepeda, N. J., Vul, E., Rohrer, D., Wixted, J. T., & Pashler, H. (2008). Spacing Effects in Learning. *Psychological Science*, *19*(11), 1095-1102. https://doi.org/10.1111/j.1467-9280.2008.02209.x — `T-A`

Chi, M. [daftar penulis tidak lengkap pada metadata Crossref] (1994). Eliciting self-explanations improves understanding. *Cognitive Science*, *18*(3), 439-477. https://doi.org/10.1016/0364-0213(94)90016-7 — `T-A`

Christie, S., & Gentner, D. (2010). Where Hypotheses Come From: Learning New Relations by Structural Alignment. *Journal of Cognition and Development*, *11*(3), 356-373. https://doi.org/10.1080/15248371003700015 — `T-A`

Christie, S., & Gentner, D. (2014). Language Helps Children Succeed on a Classic Analogy Task. *Cognitive Science*, *38*(2), 383-397. https://doi.org/10.1111/cogs.12099 — `T-A`

Christie, S., Gentner, D., Call, J., & Haun, D. B. M. (2016). Sensitivity to Relational Similarity and Object Similarity in Apes and Children. *Current Biology*, *26*(4), 531-535. https://doi.org/10.1016/j.cub.2015.12.054 — `T-A`

Dekker, S., Lee, N. C., Howard-Jones, P., & Jolles, J. (2012). Neuromyths in Education: Prevalence and Predictors of Misconceptions among Teachers. *Frontiers in Psychology*, *3*. https://doi.org/10.3389/fpsyg.2012.00429 — `T-A`

Denny, P., Prather, J., Becker, B. A., Finnie-Ansley, J., Hellas, A., Leinonen, J., Luxton-Reilly, A., Reeves, B. N., Santos, E. A., & Sarsa, S. (2024). Computing Education in the Era of Generative AI. *Communications of the ACM*, *67*(2), 56-67. https://doi.org/10.1145/3624720 — `T-A`

Dewald, J. F., Meijer, A. M., Oort, F. J., Kerkhof, G. A., & Bögels, S. M. (2010). The influence of sleep quality, sleep duration and sleepiness on school performance in children and adolescents: A meta-analytic review. *Sleep Medicine Reviews*, *14*(3), 179-189. https://doi.org/10.1016/j.smrv.2009.10.004 — `T-A`

Diekelmann, S., & Born, J. (2010). The memory function of sleep. *Nature Reviews Neuroscience*, *11*(2), 114-126. https://doi.org/10.1038/nrn2762 — `T-A`

Dignath, C., & Büttner, G. (2008). Components of fostering self-regulated learning among students. A meta-analysis on intervention studies at primary and secondary school level. *Metacognition and Learning*, *3*(3), 231-264. https://doi.org/10.1007/s11409-008-9029-x — `T-M`

Donoghue, G. M., & Hattie, J. A. C. (2021). A Meta-Analysis of Ten Learning Techniques. *Frontiers in Education*, *6*, 581216. https://doi.org/10.3389/feduc.2021.581216 — `T-A`

Du Boulay, B. (1986). Some Difficulties of Learning to Program. *Journal of Educational Computing Research*, *2*(1), 57-73. https://doi.org/10.2190/3lfx-9rrf-67t8-uvk9 — `T-A`

Dunlosky, J., Rawson, K. A., Marsh, E. J., Nathan, M. J., & Willingham, D. T. (2013). Improving Students’ Learning With Effective Learning Techniques. *Psychological Science in the Public Interest*, *14*(1), 4-58. https://doi.org/10.1177/1529100612453266 — `T-A`

Ericson, B. J., Denny, P., Prather, J., Duran, R., Hellas, A., Leinonen, J., Miller, C. S., Morrison, B. B., Pearce, J. L., & Rodger, S. H. (2022). Parsons Problems and Beyond. *Proceedings of the 2022 Working Group Reports on Innovation and Technology in Computer Science Education*, 191-234. https://doi.org/10.1145/3571785.3574127 — `T-A`

Ericson, B. J., Margulieux, L. E., & Rick, J. (2017). Solving parsons problems versus fixing and writing code. *Proceedings of the 17th Koli Calling International Conference on Computing Education Research*, 20-29. https://doi.org/10.1145/3141880.3141895 — `T-A`

Fincher, S., Jeuring, J., Miller, C. S., Donaldson, P., du Boulay, B., Hauswirth, M., Hellas, A., Hermans, F., Lewis, C., Mühling, A., Pearce, J. L., & Petersen, A. (2020). Notional Machines in Computing Education. *Proceedings of the Working Group Reports on Innovation and Technology in Computer Science Education*, 21-50. https://doi.org/10.1145/3437800.3439202 — `T-A`

Gentner, D., Anggoro, F. K., & Klibanoff, R. S. (2011). Structure Mapping and Relational Language Support Children’s Learning of Relational Categories. *Child Development*, *82*(4), 1173-1188. https://doi.org/10.1111/j.1467-8624.2011.01599.x — `T-A`

Gentner, D., & Christie, S. (2008). Relational language supports relational cognition in humans and apes. *Behavioral and Brain Sciences*, *31*(2), 136-137. https://doi.org/10.1017/s0140525x08003622 — `T-A`

Gentner, D., & Christie, S. (2010). Mutual bootstrapping between language and analogical processing. *Language and Cognition*, *2*(2), 261-283. https://doi.org/10.1515/langcog.2010.011 — `T-A`

Gentner, D., Loewenstein, J., & Thompson, L. (2003). Learning and transfer: A general role for analogical encoding. *Journal of Educational Psychology*, *95*(2), 393-408. https://doi.org/10.1037/0022-0663.95.2.393 — `T-A`

Hanks, B., Fitzgerald, S., McCauley, R., Murphy, L., & Zander, C. (2011). Pair programming in education: a literature review. *Computer Science Education*, *21*(2), 135-173. https://doi.org/10.1080/08993408.2011.579808 — `T-A`

Hartree, A. (1984). Malcolm Knowles’ Theory of Andragogy: A Critique. *International Journal of Lifelong Education*, *3*(3), 203-210. https://doi.org/10.1080/0260137840030304 — `T-M`

Hattie, J., & Timperley, H. (2007). The Power of Feedback. *Review of Educational Research*, *77*(1), 81-112. https://doi.org/10.3102/003465430298487 — `T-A`

Kalyuga, S., Ayres, P., Chandler, P., & Sweller, J. (2003). The Expertise Reversal Effect. *Educational Psychologist*, *38*(1), 23-31. https://doi.org/10.1207/s15326985ep3801_4 — `T-A`

Karpicke, J. D., & Roediger, H. L. (2008). The Critical Importance of Retrieval for Learning. *Science*, *319*(5865), 966-968. https://doi.org/10.1126/science.1152408 — `T-A`

Kazemitabaar, M., Chow, J., Ma, C. K. T., Ericson, B. J., Weintrop, D., & Grossman, T. (2023). Studying the effect of AI Code Generators on Supporting Novice Learners in Introductory Programming. *Proceedings of the 2023 CHI Conference on Human Factors in Computing Systems*, 1-23. https://doi.org/10.1145/3544548.3580919 — `T-A`

Keuning, H., Jeuring, J., & Heeren, B. (2018). A Systematic Literature Review of Automated Feedback Generation for Programming Exercises. *ACM Transactions on Computing Education*, *19*(1), 1-43. https://doi.org/10.1145/3231711 — `T-A`

Kirschner, P. A., & De Bruyckere, P. (2017). The myths of the digital native and the multitasker. *Teaching and Teacher Education*, *67*, 135-142. https://doi.org/10.1016/j.tate.2017.06.001 — `T-M`

Kirschner, P. A., Sweller, J., & Clark, R. E. (2006). Why Minimal Guidance During Instruction Does Not Work: An Analysis of the Failure of Constructivist, Discovery, Problem-Based, Experiential, and Inquiry-Based Teaching. *Educational Psychologist*, *41*(2), 75-86. https://doi.org/10.1207/s15326985ep4102_1 — `T-A`

Kornell, N., & Bjork, R. A. (2007). The promise and perils of self-regulated study. *Psychonomic Bulletin & Review*, *14*(2), 219-224. https://doi.org/10.3758/bf03194055 — `T-A`

Lister, R., Adams, E. S., Fitzgerald, S., Fone, W., Hamer, J., Lindholm, M., McCartney, R., Moström, J. E., Sanders, K., Seppälä, O., Simon, B., & Thomas, L. (2004). A multi-national study of reading and tracing skills in novice programmers. *ACM SIGCSE Bulletin*, *36*(4), 119-150. https://doi.org/10.1145/1041624.1041673 — `T-A`

Luxton-Reilly, A., Simon, Albluwi, I., Becker, B. A., Giannakos, M., Kumar, A. N., Ott, L., Paterson, J., Scott, M. J., Sheard, J., & Szabo, C. (2018). Introductory programming: a systematic literature review. *Proceedings Companion of the 23rd Annual ACM Conference on Innovation and Technology in Computer Science Education*, 55-106. https://doi.org/10.1145/3293881.3295779 — `T-A`

Macdonald, K., Germine, L., Anderson, A., Christodoulou, J., & McGrath, L. M. (2017). Dispelling the Myth: Training in Education or Neuroscience Decreases but Does Not Eliminate Beliefs in Neuromyths. *Frontiers in Psychology*, *8*, 1314. https://doi.org/10.3389/fpsyg.2017.01314 — `T-A`

Macnamara, B. N., & Burgoyne, A. P. (2023). Do growth mindset interventions impact students’ academic achievement? A systematic review and meta-analysis with recommendations for best practices. *Psychological Bulletin*, *149*(3-4), 133-173. https://doi.org/10.1037/bul0000352 — `T-A`

Mayer, R. E., & Moreno, R. (2003). Nine Ways to Reduce Cognitive Load in Multimedia Learning. *Educational Psychologist*, *38*(1), 43-52. https://doi.org/10.1207/s15326985ep3801_6 — `T-A`

Morrison, B. B., Margulieux, L. E., & Guzdial, M. (2015). Subgoals, Context, and Worked Examples in Learning Computing Problem Solving. *Proceedings of the eleventh annual International Conference on International Computing Education Research*, 21-29. https://doi.org/10.1145/2787622.2787733 — `T-A`

Nielsen, J. A., Zielinski, B. A., Ferguson, M. A., Lainhart, J. E., & Anderson, J. S. (2013). An Evaluation of the Left-Brain vs. Right-Brain Hypothesis with Resting State Functional Connectivity Magnetic Resonance Imaging. *PLoS ONE*, *8*(8), e71275. https://doi.org/10.1371/journal.pone.0071275 — `T-A`

Ophir, E., Nass, C., & Wagner, A. D. (2009). Cognitive control in media multitaskers. *Proceedings of the National Academy of Sciences*, *106*(37), 15583-15587. https://doi.org/10.1073/pnas.0903620106 — `T-A`

Pashler, H., McDaniel, M., Rohrer, D., & Bjork, R. (2008). Learning Styles. *Psychological Science in the Public Interest*, *9*(3), 105-119. https://doi.org/10.1111/j.1539-6053.2009.01038.x — `T-A`

Prather, J., Denny, P., Leinonen, J., Becker, B. A., Albluwi, I., Craig, M., Keuning, H., Kiesler, N., Kohn, T., Luxton-Reilly, A., MacNeil, S., Petersen, A., Pettit, R., Reeves, B. N., & Savelka, J. (2023). The Robots Are Here: Navigating the Generative AI Revolution in Computing Education. *Proceedings of the 2023 Working Group Reports on Innovation and Technology in Computer Science Education*, 108-159. https://doi.org/10.1145/3623762.3633499 — `T-A`

Prather, J., Reeves, B. N., Leinonen, J., MacNeil, S., Randrianasolo, A. S., Becker, B. A., Kimmel, B., Wright, J., & Briggs, B. (2024). The Widening Gap: The Benefits and Harms of Generative AI for Novice Programmers. *Proceedings of the 2024 ACM Conference on International Computing Education Research - Volume 1*, 469-486. https://doi.org/10.1145/3632620.3671116 — `T-A`

Qian, Y., & Lehman, J. (2017). Students’ Misconceptions and Other Difficulties in Introductory Programming. *ACM Transactions on Computing Education*, *18*(1), 1-24. https://doi.org/10.1145/3077618 — `T-A`

Rittle-Johnson, B., & Star, J. R. (2007). Does comparing solution methods facilitate conceptual and procedural knowledge? An experimental study on learning to solve equations. *Journal of Educational Psychology*, *99*(3), 561-574. https://doi.org/10.1037/0022-0663.99.3.561 — `T-A`

Roediger, H. L., & Karpicke, J. D. (2006). Test-Enhanced Learning. *Psychological Science*, *17*(3), 249-255. https://doi.org/10.1111/j.1467-9280.2006.01693.x — `T-A`

Rogowsky, B. A., Calhoun, B. M., & Tallal, P. (2015). Matching learning style to instructional method: Effects on comprehension. *Journal of Educational Psychology*, *107*(1), 64-78. https://doi.org/10.1037/a0037478 — `T-A`

Rowland, C. A. (2014). The effect of testing versus restudy on retention: A meta-analytic review of the testing effect. *Psychological Bulletin*, *140*(6), 1432-1463. https://doi.org/10.1037/a0037559 — `T-A`

Sala, G., & Gobet, F. (2017). Does Far Transfer Exist? Negative Evidence From Chess, Music, and Working Memory Training. *Current Directions in Psychological Science*, *26*(6), 515-520. https://doi.org/10.1177/0963721417712760 — `T-A`

Sana, F., Weston, T., & Cepeda, N. J. (2013). Laptop multitasking hinders classroom learning for both users and nearby peers. *Computers & Education*, *62*, 24-31. https://doi.org/10.1016/j.compedu.2012.10.003 — `T-A`

Scherer, R., Siddiq, F., & Sánchez Viveros, B. (2019). The cognitive benefits of learning computer programming: A meta-analysis of transfer effects. *Journal of Educational Psychology*, *111*(5), 764-792. https://doi.org/10.1037/edu0000314 — `T-A`

Scherer, R., Siddiq, F., & Sánchez Viveros, B. (2020). A meta-analysis of teaching and learning computer programming: Effective instructional approaches and conditions. *Computers in Human Behavior*, *109*, 106349. https://doi.org/10.1016/j.chb.2020.106349 — `T-A`

Sentance, S., Waite, J., & Kallia, M. (2019). Teaching computer programming with PRIMM: a sociocultural perspective. *Computer Science Education*, *29*(2-3), 136-176. https://doi.org/10.1080/08993408.2019.1608781 — `T-A`

Sinha, T., & Kapur, M. (2021). When Problem Solving Followed by Instruction Works: Evidence for Productive Failure. *Review of Educational Research*, *91*(5), 761-798. https://doi.org/10.3102/00346543211019105 — `T-A`

Sisk, V. F., Burgoyne, A. P., Sun, J., Butler, J. L., & Macnamara, B. N. (2018). To What Extent and Under Which Circumstances Are Growth Mind-Sets Important to Academic Achievement? Two Meta-Analyses. *Psychological Science*, *29*(4), 549-571. https://doi.org/10.1177/0956797617739704 — `T-A`

Soderstrom, N. C., & Bjork, R. A. (2015). Learning Versus Performance. *Perspectives on Psychological Science*, *10*(2), 176-199. https://doi.org/10.1177/1745691615569000 — `T-A`

Sorva, J. (2013). Notional machines and introductory programming education. *ACM Transactions on Computing Education*, *13*(2), 1-31. https://doi.org/10.1145/2483710.2483713 — `T-A`

Sweller, J. (1988). Cognitive Load During Problem Solving: Effects on Learning. *Cognitive Science*, *12*(2), 257-285. https://doi.org/10.1207/s15516709cog1202_4 — `T-A`

Sweller, J., & Cooper, G. A. (1985). The Use of Worked Examples as a Substitute for Problem Solving in Learning Algebra. *Cognition and Instruction*, *2*(1), 59-89. https://doi.org/10.1207/s1532690xci0201_3 — `T-A`

Weinstein, Y., Madan, C. R., & Sumeracki, M. A. (2018). Teaching the science of learning. *Cognitive Research: Principles and Implications*, *3*(1), 2. https://doi.org/10.1186/s41235-017-0087-y — `T-A`

Weintrop, D., & Wilensky, U. (2017). Comparing Block-Based and Text-Based Programming in High School Computer Science Classrooms. *ACM Transactions on Computing Education*, *18*(1), 1-25. https://doi.org/10.1145/3089799 — `T-A`

Willingham, D. T., Hughes, E. M., & Dobolyi, D. G. (2015). The Scientific Status of Learning Styles Theories. *Teaching of Psychology*, *42*(3), 266-271. https://doi.org/10.1177/0098628315589505 — `T-A`

Wisniewski, B., Zierer, K., & Hattie, J. (2020). The Power of Feedback Revisited: A Meta-Analysis of Educational Feedback Research. *Frontiers in Psychology*, *10*, 3087. https://doi.org/10.3389/fpsyg.2019.03087 — `T-A`

Xie, B., Loksa, D., Nelson, G. L., Davidson, M. J., Dong, D., Kwik, H., Tan, A. H., Hwa, L., Li, M., & Ko, A. J. (2019). A theory of instruction for introductory programming skills. *Computer Science Education*, *29*(2-3), 205-253. https://doi.org/10.1080/08993408.2019.1565235 — `T-A`

Yeager, D. S., Hanselman, P., Walton, G. M., Murray, J. S., Crosnoe, R., Muller, C., Tipton, E., Schneider, B., Hulleman, C. S., Hinojosa, C. P., Paunesku, D., Romero, C., Flint, K., Roberts, A., Trott, J., Iachan, R., Buontempo, J., Yang, S. M., Carvalho, C. M., ... Dweck, C. S. (2019). A national experiment reveals where a growth mindset improves achievement. *Nature*, *573*(7774), 364-369. https://doi.org/10.1038/s41586-019-1466-y — `T-A`

### 10.2 Halaman web dan sumber sekunder

Kosmyna, N., Hauptmann, E., Yuan, Y. T., Situ, J., Liao, X.-H., Beresnitzky, A. V., Braunstein, I., & Maes, P. (2025). *Your brain on ChatGPT: Accumulation of cognitive debt when using an AI assistant for essay writing task* (arXiv:2506.08872). arXiv. https://arxiv.org/abs/2506.08872 — `P` (halaman dibuka 2026-11-19; v1 10 Juni 2025, v2 31 Desember 2025; tanpa keterangan tinjauan sejawat pada halaman)

Subramony, D. P., Molenda, M., Betrus, A. K., & Thalheimer, W. (2014). Previous attempts to debunk the mythical retention chart and corrupted Dale's cone. *Educational Technology*, *54*(6), 17-21. ERIC EJ1057220. https://eric.ed.gov/?id=EJ1057220 — `T-W` (halaman ERIC dibuka 2026-11-19; tanpa DOI; teks artikel tidak dibaca)

Boyd, R. (2008, 7 Februari). Do people only use 10 percent of their brains? *Scientific American*. https://www.scientificamerican.com/article/do-people-only-use-10-percent-of-their-brains/ — `T-W` (dibuka 2026-11-19; sumber populer)

GovInsider. (t.t.). Wamen Stella Christie: Kita harus fokus pada masalah yang ingin diselesaikan AI. https://govinsider.asia/intl-en/article/wamen-stella-christie-kita-harus-fokus-pada-masalah-yang-ingin-diselesaikan-ai — `T-W` (dibuka 2026-11-19; tahun tidak tertulis pada teks)

Kementerian Pendidikan Tinggi, Sains, dan Teknologi. (t.t.). *Tentang kami*. https://kemdiktisaintek.go.id/tentang-kami — `T-W` (dibuka 2026-11-19)

Antara Bengkulu. (2024, 21 Oktober). Stella Christie diharapkan mampu optimalkan cara belajar mahasiswa RI. https://bengkulu.antaranews.com/berita/374189/stella-christie-diharapkan-mampu-optimalkan-cara-belajar-mahasiswa-ri — `T-W` (dibuka 2026-11-19; berita, wartawan Sean Filo Muhamad)

Universitas Tsinghua, Departemen Psikologi dan Ilmu Kognitif. (t.t.). Stella Christie (profil fakultas). https://www.pcs.tsinghua.edu.cn/info/1008/1347.htm — `T-W` (dibuka 2026-11-19); daftar profesor: https://www.pcs.tsinghua.edu.cn/xlxen/Faculty/Current_Faculty/Professors.htm — `T-W`.

### 10.3 Rekap status verifikasi

| Status | Jumlah |
| --- | --- |
| `T-A` (metadata + abstrak) | 68 |
| `T-M` (metadata saja) | 6 |
| `T-W` (halaman web) | 6 |
| `P` (preprint) | 1 |
| `[belum terverifikasi]` yang **tidak** dicantumkan sebagai rujukan | Bjork (1994), Knowles (teori andragogi, sumber asli), Beyerstein (mitos 10%), Letrud, Dale (1946/1969, sumber asli), Piaget, rujukan studi coding awal |

> Rekap di atas dihitung dari daftar bagian 10.1 (74 entri ber-DOI: 68
> `T-A`, termasuk satu dengan daftar penulis tidak lengkap pada metadata, dan
> 6 `T-M`) dan bagian 10.2 (6 `T-W`: Subramony, Boyd, GovInsider,
> Kemdiktisaintek, Antara, Tsinghua; 1 `P`: Kosmyna). Total 81 entri. Bila
> daftar berubah, hitung ulang.
