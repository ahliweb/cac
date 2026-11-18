# Rancangan Modul Lengkap SD (`sd-coding`)

- **Version:** v0.1.0
- **Last updated:** 2026-11-19
- **Status:** **DRAF**, menunggu persetujuan pemilik. Rancangan untuk 168 modul (panduan guru dan lembar anak, 336 berkas) di `content/sd-coding/`; modulnya belum ditulis.
- **Changeset:** Rancangan modul SD: pemetaan 168 minggu, templat berbasis bukti, gelombang penulisan, gerbang mutu, pertanyaan keputusan, dan satu modul pilot.

> **DRAF, bukan keputusan pemilik.** Dokumen ini adalah konten **karangan**
> menurut [ADR-0007](../../architecture/adr/0007-authored-learning-content.md):
> rancangan yang harus disetujui pemilik **sebelum** modul ditulis (keputusan
> pemilik 2026-11-19). Ia tidak mengubah [`silabus.md`](silabus.md) (v1.0.1,
> disetujui) maupun `data/sd-coding/`. Agent tidak menyetujui rancangan ini
> atas nama pemilik. Repositori ini tidak memuat data murid
> ([ADR-0004](../../architecture/adr/0004-no-learner-personal-data.md)).

## 0. Cara membaca dokumen ini

| Tanda | Arti |
| --- | --- |
| `K` | Prinsipnya didukung bukti kuat (`[A]` atau `[B]` di [`riset kognitif`](../../riset/ilmu-belajar-kognitif.md) bagian 1.2 dan 8). |
| `M` | Masuk akal, tetapi bukti terbatas untuk pemrograman atau usia SD (`[inferensi]`). Riset 8.4 menandai rekomendasi SD sebagai `M`. |
| `T` | Transkripsi atau kewajiban dari silabus, regulasi, atau ADR; bukan klaim riset. Tanda ini tambahan rancangan ini supaya unsur yang bukan klaim riset tidak diberi label bukti palsu. |
| `[asumsi]` | Keputusan perancangan penyusun, bukan data resmi. |
| `[belum terverifikasi]` | Tidak dapat dipastikan dari sumber yang dibuka penyusun pada 2026-11-19. |

Rujukan bagian tanpa nama dokumen (mis. "riset 3.4") berarti
[`docs/riset/ilmu-belajar-kognitif.md`](../../riset/ilmu-belajar-kognitif.md).

## 1. Konteks, keputusan pemilik, dan batas

**Keputusan pemilik 2026-11-19:** program `sd-coding` (168 minggu: 6 kelas,
2 semester, 14 minggu) mendapat modul lengkap, satu per minggu; tiap modul
berupa **panduan guru** (`content/sd-coding/modules/<id>.md`) plus **lembar
anak** terpisah (`content/sd-coding/lembar/<id>.md`). Rancangan ini disetujui
pemilik lebih dulu, baru modul ditulis.

| Batas | Isi |
| --- | --- |
| Tidak menjanjikan manfaat luas | Modul tidak boleh mengklaim coding dini menaikkan kecerdasan atau memberi keunggulan jangka panjang (riset 5; Sala dan Gobet, 2017: transfer jauh jarang). Tujuan program adalah tujuan silabus bagian 3, bukan klaim kognitif. |
| Hanya CP yang sah | Kelas 5-6 menjadi pemenuhan CP Fase C hanya pada minggu yang tercatat di `data/sd-coding/cp-mapping.json` (32 minggu). Pengantar `P-` (kelas 1-4) **tidak pernah** dihitung pemenuhan; penguatan, proyek, dan asesmen tidak dicatat sebagai pemenuhan (silabus bagian 6). |
| Kebijakan AI SD | Tidak ada AI generatif untuk anak (silabus 10.2). Layanan KA percakapan hanya demonstrasi guru di depan kelas tanpa nama atau data murid. KA dipelajari lewat "mesin kotak" dan "mesin kartu" dari kardus dan kartu. |
| Privasi anak | Tanpa akun murid, tanpa kamera atau mikrofon yang merekam murid, tanpa foto, suara, atau tokoh nyata, tanpa kata sandi sungguhan, karya tidak diunggah (silabus 10.1; ADR-0004; UU 27/2022 diatur sekolah). |
| Tanpa sintaks | `sd-coding` tidak mengajarkan sintaks pemrograman teks (silabus 7.2). Silabus **tidak** memuat transisi blok ke teks, jadi modul tidak memuatnya; blok visual hanya opsi kelas 6 (`sd6-1-m9`, `sd6-1-m10`) dengan kegiatan kertas setara. |
| Scope dokumen ini | Rancangan dan satu pilot. Tidak mengubah `content/`, `data/`, `src/`, silabus, riset, README program, atau `docs/panduan/*`. |

## 2. Konvensi berkas dan kontrak indeks

| Hal | Aturan |
| --- | --- |
| Id modul | Kode minggu huruf kecil, mis. `sd1-1-m1` sampai `sd6-2-m14` (sama dengan `id` di `data/sd-coding/weeks.json`, dikecilkan). |
| Panduan guru | `content/sd-coding/modules/<id>.md`; tanpa frontmatter. |
| Lembar anak | `content/sd-coding/lembar/<id>.md`; satu lembar per modul. |
| Indeks | Skema khusus program dibuat agent lain (ADR-0008). Kontrak yang dipakai: id sama dengan kode minggu huruf kecil; `cpItems` ada **hanya** untuk 32 minggu pemenuhan menurut `cp-mapping.json` (kelas 5-6 non-penguatan; pengantar `P-` tidak pernah). Agent penulis **tidak mengedit indeks**; orchestrator yang memasukkannya per gelombang. |
| Banner | Banner `DRAF, belum ditinjau` ditambahkan renderer dari status indeks; badan modul tidak memuat banner sendiri. |
| Status | Semua modul berstatus `draf`; hanya manusia (pemilik atau peninjau yang ia tunjuk) menaikkan status (ADR-0007). |
| Sesi | Kelas 1-4: 1 JP (35 menit). Kelas 5-6: 2 JP (70 menit) atau dua pertemuan 1 JP. Semester: M1 sampai M12 materi dan penguatan, M13 proyek mini, M14 asesmen dan refleksi (silabus bagian 2, `[asumsi]` kecuali JP kelas 5-6). |

## 3. Pemetaan 168 modul

Judul modul = topik silabus (tanda `[penguatan]` ditulis "Penguatan:",
tanda `[opsi layar]` dipindah ke kolom jenis). Kolom "CP" berisi butir
pemenuhan menurut `cp-mapping.json`; tanda `—` berarti tidak ada pemenuhan
CP. Kolom "Jenis": `pengantar` (kelas 1-4, butir `P-`, bukan pemenuhan),
`inti` (kelas 5-6, pemenuhan CP), `penguatan`, `proyek`, `asesmen dan
refleksi`, dan `opsi layar` bila silabus menandainya. Kode bahan (legenda di
bawah tabel) diikuti kekhususannya. "Prasyarat" adalah minggu yang konsepnya
perlu sudah dikenal; `M#` pada semester yang sama ditulis lengkap.
Sebaran: 96 pengantar, 32 inti (pemenuhan CP), 16 penguatan, 12 proyek, 12
asesmen dan refleksi.

| No | Id modul | Kode minggu | Judul modul | Jenis | CP (hanya yang sah) | Alat dan bahan | Prasyarat |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | `sd1-1-m1` | `SD1-1-M1` | Perintah satu langkah | pengantar | — (pengantar `P-BK`) | ruang lapang atau LK; KP kartu "jalan" dan "berhenti" | — (bila murid dari `tk-coding`, jembatan di silabus SD 7.1) |
| 2 | `sd1-1-m2` | `SD1-1-M2` | Urutan kegiatan sehari-hari | pengantar | — (pengantar `P-BK`) | KG empat kartu kegiatan pagi per kelompok | — |
| 3 | `sd1-1-m3` | `SD1-1-M3` | Urutan benar dan salah | pengantar | — (pengantar `P-BK`) | KG set kartu urutan dengan satu pasangan tertukar | `SD1-1-M2` |
| 4 | `sd1-1-m4` | `SD1-1-M4` | Maju, kiri, kanan | pengantar | — (pengantar `P-BK`) | LK 3x3 atau lebih; KP kartu maju, kiri, kanan | `SD1-1-M1` |
| 5 | `sd1-1-m5` | `SD1-1-M5` | Pola warna dan bentuk | pengantar | — (pengantar `P-BK`) | BB manik besar atau kartu warna dan bentuk | — |
| 6 | `sd1-1-m6` | `SD1-1-M6` | Pola gerak dan bunyi | pengantar | — (pengantar `P-BK`) | suara tubuh (tepuk, hentak); tanpa bahan lain | `SD1-1-M5` |
| 7 | `sd1-1-m7` | `SD1-1-M7` | Perintah dengan gambar panah | pengantar | — (pengantar `P-BK`) | KT kertas kisi 3x3 dan spidol; KP kartu panah | `SD1-1-M4` |
| 8 | `sd1-1-m8` | `SD1-1-M8` | Mengulang | pengantar | — (pengantar `P-BK`) | LK; KP kartu "ulangi dua kali" | `SD1-1-M4`, `SD1-1-M6` |
| 9 | `sd1-1-m9` | `SD1-1-M9` | Memecah tugas menjadi langkah | pengantar | — (pengantar `P-BK`) | KG kartu langkah mencuci tangan | `SD1-1-M2` |
| 10 | `sd1-1-m10` | `SD1-1-M10` | Mencari kesalahan | pengantar | — (pengantar `P-BK`) | LP petunjuk bergambar dengan satu langkah salah | `SD1-1-M3`, `SD1-1-M9` |
| 11 | `sd1-1-m11` | `SD1-1-M11` | Benda di sekitar yang memakai listrik | pengantar | — (pengantar `P-LD`) | KG gambar alat; KD dua kotak sortir (tanpa benda listrik asli) | — |
| 12 | `sd1-1-m12` | `SD1-1-M12` | Penguatan: permainan rute | pengantar | — (pengantar `P-BK`) | LK; KP kartu arah | `SD1-1-M4`, `SD1-1-M7`, `SD1-1-M8` |
| 13 | `sd1-1-m13` | `SD1-1-M13` | Proyek mini: peta harta karun kelas | proyek | — (pengantar `P-BK`) | KT kertas besar dan spidol; KP kartu panah | `SD1-1-M7`, `SD1-1-M12` |
| 14 | `sd1-1-m14` | `SD1-1-M14` | Asesmen dan refleksi | asesmen dan refleksi | — (pengantar `P-BK`) | LP dan KT; catatan observasi guru milik sekolah | `SD1-1-M1 sampai M13` |
| 15 | `sd1-2-m1` | `SD1-2-M1` | Mengelompokkan menurut warna | pengantar | — (pengantar `P-PP`) | BB benda atau kartu beberapa warna | — |
| 16 | `sd1-2-m2` | `SD1-2-M2` | Mengelompokkan menurut dua sifat | pengantar | — (pengantar `P-PP`) | BB benda; dua lingkaran sortir (tali atau gambar) | `SD1-2-M1` |
| 17 | `sd1-2-m3` | `SD1-2-M3` | Menamai kelompok | pengantar | — (pengantar `P-PP`) | BB kelompok buatan murid | `SD1-2-M2` |
| 18 | `sd1-2-m4` | `SD1-2-M4` | Alat digital di rumah | pengantar | — (pengantar `P-LD`) | KG gambar alat digital di rumah (tanpa perangkat asli) | `SD1-1-M11` |
| 19 | `sd1-2-m5` | `SD1-2-M5` | Bagian alat digital | pengantar | — (pengantar `P-LD`) | LP gambar tablet atau telepon dengan bagian bernomor | `SD1-2-M4` |
| 20 | `sd1-2-m6` | `SD1-2-M6` | Panca indera manusia | pengantar | — (pengantar `P-LE`) | BB benda aman; penutup mata atau mata dipejamkan (diawasi) | — |
| 21 | `sd1-2-m7` | `SD1-2-M7` | Teman dan perasaan | pengantar | — (pengantar `P-LE`) | cerita pendek guru (tokoh fiktif); KG kartu gambar | — |
| 22 | `sd1-2-m8` | `SD1-2-M8` | Rahasia pribadi | pengantar | — (pengantar `P-LD`) | KG kartu cerita (tokoh fiktif; tanpa data nyata) | `SD1-2-M4` |
| 23 | `sd1-2-m9` | `SD1-2-M9` | Minta izin orang dewasa | pengantar | — (pengantar `P-LD`) | KG kartu situasi untuk bermain peran | `SD1-2-M4`, `SD1-2-M8` |
| 24 | `sd1-2-m10` | `SD1-2-M10` | Awal-tengah-akhir | pengantar | — (pengantar `P-BK`) | KG tiga kartu gambar cerita | `SD1-1-M2` |
| 25 | `sd1-2-m11` | `SD1-2-M11` | Pengulangan dalam lagu | pengantar | — (pengantar `P-BK`) | lagu (dinyanyikan, tanpa perangkat); kartu penanda | `SD1-1-M8` |
| 26 | `sd1-2-m12` | `SD1-2-M12` | Penguatan: kartu sortir | pengantar | — (pengantar `P-PP`) | BB kartu sortir | `SD1-2-M1`, `SD1-2-M2`, `SD1-2-M3` |
| 27 | `sd1-2-m13` | `SD1-2-M13` | Proyek mini: buku gambar hari-hariku | proyek | — (pengantar `P-BK`) | KT kertas gambar dan krayon | `SD1-1-M2`, `SD1-2-M10` |
| 28 | `sd1-2-m14` | `SD1-2-M14` | Asesmen dan refleksi | asesmen dan refleksi | — (pengantar `P-BK`) | LP dan KT | `SD1-2-M1 sampai M13` |
| 29 | `sd2-1-m1` | `SD2-1-M1` | Panah pada kisi 4x4 | pengantar | — (pengantar `P-BK`) | KT kertas kisi 4x4 | `SD1-1-M7` |
| 30 | `sd2-1-m2` | `SD2-1-M2` | Program kertas dua langkah | pengantar | — (pengantar `P-BK`) | KT kertas kisi; KP kartu panah | `SD2-1-M1` |
| 31 | `sd2-1-m3` | `SD2-1-M3` | Pengulangan "ulangi n kali" | pengantar | — (pengantar `P-BK`) | KT kertas kisi; KP kartu tanda ulang | `SD2-1-M2`, `SD1-1-M8` |
| 32 | `sd2-1-m4` | `SD2-1-M4` | Pola berulang | pengantar | — (pengantar `P-BK`) | BB manik atau kartu pola | `SD1-1-M5`, `SD1-1-M6` |
| 33 | `sd2-1-m5` | `SD2-1-M5` | Memecah tugas besar | pengantar | — (pengantar `P-BK`) | KG kartu langkah membuat kue gambar | `SD1-1-M9` |
| 34 | `sd2-1-m6` | `SD2-1-M6` | Menguji instruksi teman | pengantar | — (pengantar `P-BK`) | KT kisi dan instruksi tertulis teman | `SD2-1-M2` |
| 35 | `sd2-1-m7` | `SD2-1-M7` | Memperbaiki instruksi | pengantar | — (pengantar `P-BK`) | LP kisi dengan instruksi yang salah | `SD2-1-M6`, `SD1-1-M10` |
| 36 | `sd2-1-m8` | `SD2-1-M8` | Kartu "jika ... maka ..." | pengantar | — (pengantar `P-BK`) | KG kartu "jika ... maka ..." bergambar | — |
| 37 | `sd2-1-m9` | `SD2-1-M9` | Dua pilihan dalam permainan jalur | pengantar | — (pengantar `P-BK`) | LK atau kertas jalur bercabang; KP kartu pilihan | `SD2-1-M8` |
| 38 | `sd2-1-m10` | `SD2-1-M10` | Kode warna | pengantar | — (pengantar `P-BK`) | KP dan BB kartu warna sebagai sandi arah | `SD2-1-M1` |
| 39 | `sd2-1-m11` | `SD2-1-M11` | Sandi huruf ke angka | pengantar | — (pengantar `P-BK`) | LP tabel sandi huruf ke angka; nama tokoh fiktif | `SD2-1-M10` |
| 40 | `sd2-1-m12` | `SD2-1-M12` | Penguatan: labirin kelas | pengantar | — (pengantar `P-BK`) | KT kertas atau kardus untuk labirin; spidol | `SD2-1-M1`, `SD2-1-M3` |
| 41 | `sd2-1-m13` | `SD2-1-M13` | Proyek mini: labirin dan sandi | proyek | — (pengantar `P-BK`) | KT labirin; BB kartu sandi warna | `SD2-1-M10`, `SD2-1-M12` |
| 42 | `sd2-1-m14` | `SD2-1-M14` | Asesmen dan refleksi | asesmen dan refleksi | — (pengantar `P-BK`) | LP dan KT | `SD2-1-M1 sampai M13` |
| 43 | `sd2-2-m1` | `SD2-2-M1` | Mesin kotak: masukan, proses, keluaran | pengantar | — (pengantar `P-LD`) | KD kardus "mesin"; KG kartu masukan dan keluaran | — |
| 44 | `sd2-2-m2` | `SD2-2-M2` | Perangkat masukan dan keluaran | pengantar | — (pengantar `P-LD`) | KG gambar papan ketik, layar, pengeras suara; KD dua kotak sortir | `SD2-2-M1`, `SD1-2-M5` |
| 45 | `sd2-2-m3` | `SD2-2-M3` | Siapa yang mengindra? | pengantar | — (pengantar `P-LE`) | KG gambar mata manusia dan kamera | `SD1-2-M6` |
| 46 | `sd2-2-m4` | `SD2-2-M4` | Mesin cerdas atau biasa | pengantar | — (pengantar `P-LE`) | KG kartu gambar setrika, kipas, robot penyapu | `SD2-2-M3` |
| 47 | `sd2-2-m5` | `SD2-2-M5` | Kata sandi itu rahasia | pengantar | — (pengantar `P-LD`) | cerita guru; tanpa kata sandi sungguhan | `SD1-2-M8` |
| 48 | `sd2-2-m6` | `SD2-2-M6` | Boleh dan tidak dibagikan | pengantar | — (pengantar `P-LD`) | KG kartu informasi; KD dua kotak sortir | `SD2-2-M5`, `SD1-2-M8` |
| 49 | `sd2-2-m7` | `SD2-2-M7` | Mengurutkan menurut ukuran | pengantar | — (pengantar `P-PP`) | BB benda berbagai ukuran | `SD1-2-M2` |
| 50 | `sd2-2-m8` | `SD2-2-M8` | Mengelompokkan dengan dua aturan | pengantar | — (pengantar `P-PP`) | BB kartu sortir | `SD2-2-M7`, `SD1-2-M2` |
| 51 | `sd2-2-m9` | `SD2-2-M9` | Menebak kelompok kartu rahasia | pengantar | — (pengantar `P-PP`) | BB kartu tersembunyi dengan petunjuk | `SD2-2-M8` |
| 52 | `sd2-2-m10` | `SD2-2-M10` | Bersikap baik di dunia maya | pengantar | — (pengantar `P-LE`) | cerita guru; KG kartu peran | `SD1-2-M7` |
| 53 | `sd2-2-m11` | `SD2-2-M11` | Teknologi membantu manusia | pengantar | — (pengantar `P-LE`) | KT kertas gambar | `SD2-2-M4` |
| 54 | `sd2-2-m12` | `SD2-2-M12` | Penguatan: sortir cerdas dan biasa | pengantar | — (pengantar `P-LE`) | KG kartu gambar; KD kotak sortir | `SD2-2-M4` |
| 55 | `sd2-2-m13` | `SD2-2-M13` | Proyek mini: pameran alat cerdas dan biasa | proyek | — (pengantar `P-LE`) | KT kertas poster dan spidol | `SD2-2-M4`, `SD2-2-M12` |
| 56 | `sd2-2-m14` | `SD2-2-M14` | Asesmen dan refleksi | asesmen dan refleksi | — (pengantar `P-LE`) | LP dan KT | `SD2-2-M1 sampai M13` |
| 57 | `sd3-1-m1` | `SD3-1-M1` | Algoritma sebagai resep atau rute | pengantar | — (pengantar `P-BK`) | KT gambar langkah roti isi | `SD2-1-M5` |
| 58 | `sd3-1-m2` | `SD3-1-M2` | Algoritma tertulis dengan kosakata terbatas | pengantar | — (pengantar `P-BK`) | KT kertas kisi; KP kata maju, kiri, kanan | `SD2-1-M1`, `SD2-1-M2` |
| 59 | `sd3-1-m3` | `SD3-1-M3` | Variabel: kotak berlabel | pengantar | — (pengantar `P-BK`) | KD kotak berlabel; kartu bilangan | — |
| 60 | `sd3-1-m4` | `SD3-1-M4` | Percabangan jika-maka-jika tidak | pengantar | — (pengantar `P-BK`) | LK atau KD dua "pintu"; KP kartu syarat | `SD2-1-M8`, `SD2-1-M9` |
| 61 | `sd3-1-m5` | `SD3-1-M5` | Pengulangan dengan syarat | pengantar | — (pengantar `P-BK`) | LK; KP kartu "ulangi sampai ..." | `SD2-1-M3`, `SD2-1-M4` |
| 62 | `sd3-1-m6` | `SD3-1-M6` | Menggabungkan pengulangan dan percabangan | pengantar | — (pengantar `P-BK`) | KT kertas; KP kartu pengulangan dan percabangan | `SD3-1-M4`, `SD3-1-M5` |
| 63 | `sd3-1-m7` | `SD3-1-M7` | Mengurutkan kartu bilangan | pengantar | — (pengantar `P-BK`) | BB enam kartu bilangan | — |
| 64 | `sd3-1-m8` | `SD3-1-M8` | Mencari kartu tersembunyi | pengantar | — (pengantar `P-BK`) | BB kartu bilangan tersembunyi dan terurut | `SD3-1-M7` |
| 65 | `sd3-1-m9` | `SD3-1-M9` | Menguji dan memperbaiki | pengantar | — (pengantar `P-BK`) | KT algoritma tertulis milik teman | `SD3-1-M2`, `SD2-1-M6`, `SD2-1-M7` |
| 66 | `sd3-1-m10` | `SD3-1-M10` | Membandingkan dua algoritma | pengantar | — (pengantar `P-BK`) | KT dua algoritma tertulis untuk tugas yang sama | `SD3-1-M9` |
| 67 | `sd3-1-m11` | `SD3-1-M11` | Algoritma untuk "robot" teman | pengantar | — (pengantar `P-BK`) | BB kartu menara; KT instruksi teman | `SD3-1-M2`, `SD3-1-M9` |
| 68 | `sd3-1-m12` | `SD3-1-M12` | Penguatan: lomba rute robot manusia | pengantar | — (pengantar `P-BK`) | LK; KT kertas catatan | `SD3-1-M2`, `SD3-1-M5` |
| 69 | `sd3-1-m13` | `SD3-1-M13` | Proyek mini: permainan jalur sendiri | proyek | — (pengantar `P-BK`) | KT papan jalur kertas dan aturan tertulis | `SD3-1-M6` |
| 70 | `sd3-1-m14` | `SD3-1-M14` | Asesmen dan refleksi | asesmen dan refleksi | — (pengantar `P-BK`) | LP dan KT | `SD3-1-M1 sampai M13` |
| 71 | `sd3-2-m1` | `SD3-2-M1` | Simbol pengganti kata | pengantar | — (pengantar `P-BK`) | KP kartu simbol arah | `SD3-1-M2` |
| 72 | `sd3-2-m2` | `SD3-2-M2` | Dua keadaan: nyala dan padam | pengantar | — (pengantar `P-BK`) | BB kartu dua sisi | `SD3-2-M1` |
| 73 | `sd3-2-m3` | `SD3-2-M3` | Data: tabel sederhana | pengantar | — (pengantar `P-PP`) | TB tabel kosong; data fiktif | — |
| 74 | `sd3-2-m4` | `SD3-2-M4` | Diagram gambar | pengantar | — (pengantar `P-PP`) | KT kertas dan krayon | `SD3-2-M3` |
| 75 | `sd3-2-m5` | `SD3-2-M5` | Perangkat dan fungsinya | pengantar | — (pengantar `P-LD`) | KG kartu perangkat dan fungsi | `SD2-2-M2` |
| 76 | `sd3-2-m6` | `SD3-2-M6` | Pesan lewat kurir | pengantar | — (pengantar `P-LD`) | LK atau barisan murid; KG kartu pesan | `SD3-2-M5` |
| 77 | `sd3-2-m7` | `SD3-2-M7` | Mencari informasi, didampingi guru | pengantar | — (pengantar `P-LD`) | DG demonstrasi guru tanpa data murid; KT kertas | `SD3-2-M5`, `SD3-2-M6` |
| 78 | `sd3-2-m8` | `SD3-2-M8` | Kata sandi dan privasi | pengantar | — (pengantar `P-LD`) | KG kartu cerita pesan aman dan tidak aman | `SD2-2-M5`, `SD2-2-M6` |
| 79 | `sd3-2-m9` | `SD3-2-M9` | Ciri mesin cerdas | pengantar | — (pengantar `P-LE`) | KT daftar ciri; KG kartu contoh | `SD2-2-M4` |
| 80 | `sd3-2-m10` | `SD3-2-M10` | Mesin mengenali pola | pengantar | — (pengantar `P-PP`) | KD kotak "mesin"; KG kartu pola | `SD3-2-M9`, `SD2-2-M9` |
| 81 | `sd3-2-m11` | `SD3-2-M11` | Sopan dan empati di ruang digital | pengantar | — (pengantar `P-LE`) | KG kartu pesan; peran bermain | `SD2-2-M10` |
| 82 | `sd3-2-m12` | `SD3-2-M12` | Penguatan: mesin kotak | pengantar | — (pengantar `P-PP`) | KD kotak "mesin"; KG kartu | `SD3-2-M10` |
| 83 | `sd3-2-m13` | `SD3-2-M13` | Proyek mini: poster aturan aman digital | proyek | — (pengantar `P-LD`) | KT kertas poster | `SD3-2-M8`, `SD2-2-M6` |
| 84 | `sd3-2-m14` | `SD3-2-M14` | Asesmen dan refleksi | asesmen dan refleksi | — (pengantar `P-LD`) | LP dan KT | `SD3-2-M1 sampai M13` |
| 85 | `sd4-1-m1` | `SD4-1-M1` | Apa itu berpikir komputasional | pengantar | — (pengantar `P-BK` (menuju C-BK-a)) | PT papan tulis; contoh masalah sehari-hari | `SD3-1-M1` |
| 86 | `sd4-1-m2` | `SD4-1-M2` | Dekomposisi | pengantar | — (pengantar `P-BK` (menuju C-BK-b)) | KT kertas; contoh "menyiapkan acara kelas" | `SD4-1-M1`, `SD2-1-M5` |
| 87 | `sd4-1-m3` | `SD4-1-M3` | Mengenali pola dalam masalah | pengantar | — (pengantar `P-BK`) | KT dua masalah tertulis | `SD4-1-M2`, `SD2-1-M4` |
| 88 | `sd4-1-m4` | `SD4-1-M4` | Abstraksi | pengantar | — (pengantar `P-BK`) | KT denah sekolah buatan guru | `SD4-1-M3` |
| 89 | `sd4-1-m5` | `SD4-1-M5` | Algoritma dengan diagram alir | pengantar | — (pengantar `P-BK` (menuju C-BK-c)) | KT kertas; simbol diagram alir yang disepakati kelas | `SD3-1-M1`, `SD3-1-M2` |
| 90 | `sd4-1-m6` | `SD4-1-M6` | Percabangan dalam diagram alir | pengantar | — (pengantar `P-BK`) | KT simbol keputusan | `SD4-1-M5`, `SD3-1-M4` |
| 91 | `sd4-1-m7` | `SD4-1-M7` | Pengulangan dalam diagram alir | pengantar | — (pengantar `P-BK`) | KT simbol ulang | `SD4-1-M5`, `SD3-1-M5` |
| 92 | `sd4-1-m8` | `SD4-1-M8` | Menguji di atas kertas | pengantar | — (pengantar `P-BK`) | KT diagram alir; beberapa masukan | `SD4-1-M6`, `SD4-1-M7` |
| 93 | `sd4-1-m9` | `SD4-1-M9` | Memperbaiki kesalahan | pengantar | — (pengantar `P-BK`) | LP diagram alir yang salah | `SD4-1-M8` |
| 94 | `sd4-1-m10` | `SD4-1-M10` | Instruksi untuk mesin dengan kosakata terbatas | pengantar | — (pengantar `P-BK` (menuju C-BK-c)) | KT kertas; enam kata kosakata terbatas | `SD3-1-M2`, `SD3-1-M5` |
| 95 | `sd4-1-m11` | `SD4-1-M11` | Sifat benda dan tabel sifat | pengantar | — (pengantar `P-PP` (menuju C-PP-b)) | TB tabel sifat; BB benda | `SD3-2-M3`, `SD2-2-M8` |
| 96 | `sd4-1-m12` | `SD4-1-M12` | Penguatan: memecahkan masalah sekolah | pengantar | — (pengantar `P-BK`) | KT contoh antrean kantin | `SD4-1-M5`, `SD4-1-M9` |
| 97 | `sd4-1-m13` | `SD4-1-M13` | Proyek mini: panduan memecahkan masalah | proyek | — (pengantar `P-BK`) | KT kertas panduan satu halaman | `SD4-1-M5`, `SD4-1-M12` |
| 98 | `sd4-1-m14` | `SD4-1-M14` | Asesmen dan refleksi | asesmen dan refleksi | — (pengantar `P-BK`) | LP dan KT | `SD4-1-M1 sampai M13` |
| 99 | `sd4-2-m1` | `SD4-2-M1` | Perangkat keras dan perangkat lunak | pengantar | — (pengantar `P-LD` (menuju C-LD-b)) | KG kartu contoh perangkat keras dan lunak | `SD3-2-M5` |
| 100 | `sd4-2-m2` | `SD4-2-M2` | Masukan-proses-keluaran dalam keseharian | pengantar | — (pengantar `P-LD`) | KT gambar mesin cuci atau lampu sensor | `SD2-2-M1`, `SD4-2-M1` |
| 101 | `sd4-2-m3` | `SD4-2-M3` | Informasi pribadi dan alasan melindunginya | pengantar | — (pengantar `P-LD` (menuju C-LD-c)) | KG kartu sortir tingkat rahasia | `SD3-2-M8` |
| 102 | `sd4-2-m4` | `SD4-2-M4` | Kata sandi kuat | pengantar | — (pengantar `P-LD`) | cerita guru; tanpa menulis kata sandi | `SD4-2-M3`, `SD3-2-M8` |
| 103 | `sd4-2-m5` | `SD4-2-M5` | Mencari informasi dengan kata kunci | pengantar | — (pengantar `P-LD` (menuju C-LD-d)) | DG demonstrasi guru; KT kertas | `SD3-2-M7` |
| 104 | `sd4-2-m6` | `SD4-2-M6` | Informasi benar atau keliru | pengantar | — (pengantar `P-LD`) | KT contoh sederhana tanpa tokoh nyata; tiga pertanyaan cek | `SD4-2-M5` |
| 105 | `sd4-2-m7` | `SD4-2-M7` | Dampak teknologi: baik dan buruk | pengantar | — (pengantar `P-LD` (menuju C-LD-a)) | TB tabel dua kolom | `SD4-2-M1`, `SD3-2-M5` |
| 106 | `sd4-2-m8` | `SD4-2-M8` | Mesin cerdas dan non-cerdas | pengantar | — (pengantar `P-LE` (menuju C-LE-d)) | KG kartu sortir perangkat | `SD3-2-M9` |
| 107 | `sd4-2-m9` | `SD4-2-M9` | Bagaimana mesin "melihat" | pengantar | — (pengantar `P-LE` (menuju C-LE-c)) | KT kertas kotak untuk gambar piksel | `SD2-2-M3` |
| 108 | `sd4-2-m10` | `SD4-2-M10` | Mengenali pola dengan kartu | pengantar | — (pengantar `P-PP` (menuju C-PP-a)) | KG kartu contoh "mesin kartu" | `SD3-2-M10`, `SD4-2-M8` |
| 109 | `sd4-2-m11` | `SD4-2-M11` | Empati dan tidak menyakiti | pengantar | — (pengantar `P-LE` (menuju C-LE-e)) | cerita kasus pesan yang menyakiti | `SD3-2-M11` |
| 110 | `sd4-2-m12` | `SD4-2-M12` | Penguatan: panduan aman untuk adik kelas | pengantar | — (pengantar `P-LD`) | KT kertas panduan bergambar | `SD4-2-M3`, `SD4-2-M4`, `SD4-2-M6` |
| 111 | `sd4-2-m13` | `SD4-2-M13` | Proyek mini: poster panduan | proyek | — (pengantar `P-LD`) | KT poster | `SD4-2-M12` |
| 112 | `sd4-2-m14` | `SD4-2-M14` | Asesmen dan refleksi, penyambung ke kelas 5 | asesmen dan refleksi | — (pengantar `P-BK`, `P-LD`) | LP dan KT | `SD4-2-M1 sampai M13` |
| 113 | `sd5-1-m1` | `SD5-1-M1` | Pengenalan Berpikir Komputasional | inti | `C-BK-a` | LP lembar kerja masalah sehari-hari | `SD4-1-M1` |
| 114 | `sd5-1-m2` | `SD5-1-M2` | Konsep Dasar Berpikir Komputasional | inti | `C-BK-a`, `C-BK-b` | KG kartu teka-teki | `SD5-1-M1` |
| 115 | `sd5-1-m3` | `SD5-1-M3` | Pemecahan Masalah dalam Kehidupan Sehari-hari | inti | `C-BK-a`, `C-BK-b` | PT papan tulis; KG kartu piket | `SD5-1-M1`, `SD5-1-M2` |
| 116 | `sd5-1-m4` | `SD5-1-M4` | Pemecahan Masalah Multi-langkah | inti | `C-BK-b` | KT kertas diagram langkah; masalah menyiapkan pameran | `SD5-1-M3` |
| 117 | `sd5-1-m5` | `SD5-1-M5` | Proyek Pemecahan Masalah Multi-langkah | inti | `C-BK-b` | KT kertas poster; kerja kelompok | `SD5-1-M2`, `SD5-1-M4` |
| 118 | `sd5-1-m6` | `SD5-1-M6` | Menuliskan Urutan Instruksi secara Logis | inti | `C-BK-c` | KT kertas; kosakata terbatas; murid berperan "mesin" | `SD5-1-M2`, `SD4-1-M10` |
| 119 | `sd5-1-m7` | `SD5-1-M7` | Konsep Dasar Teknologi Digital | inti | `C-LD-a` | TB tabel; KG gambar teknologi digital | `SD4-2-M7` |
| 120 | `sd5-1-m8` | `SD5-1-M8` | Sistem Komputer Tingkat Pra Dasar | inti | `C-LD-b` | KG kartu masukan, proses, keluaran, penyimpanan | `SD4-2-M1`, `SD4-2-M2` |
| 121 | `sd5-1-m9` | `SD5-1-M9` | Keamanan Informasi Pribadi | inti | `C-LD-c` | KG kartu sortir informasi pribadi dan umum | `SD4-2-M3`, `SD4-2-M4` |
| 122 | `sd5-1-m10` | `SD5-1-M10` | Interaksi Aman dan Efektif di Beranda Digital | inti | `C-LD-c`, `C-LD-d` | KT teks kasus pesan daring (fiktif) | `SD5-1-M9`, `SD4-2-M6` |
| 123 | `sd5-1-m11` | `SD5-1-M11` | Penguatan: Instruksi logis dengan simbol | penguatan | — | LK; KP kartu simbol | `SD5-1-M6` |
| 124 | `sd5-1-m12` | `SD5-1-M12` | Penguatan: Aman di dunia digital: studi kasus | penguatan | — | KT tiga studi kasus fiktif | `SD5-1-M9`, `SD5-1-M10` |
| 125 | `sd5-1-m13` | `SD5-1-M13` | Proyek mini: panduan "langkah aman memakai internet" | proyek | — | KT panduan bergambar | `SD5-1-M6`, `SD5-1-M9` |
| 126 | `sd5-1-m14` | `SD5-1-M14` | Asesmen dan refleksi | asesmen dan refleksi | — | LP kuis dan lembar kerja | `SD5-1-M1 sampai M13` |
| 127 | `sd5-2-m1` | `SD5-2-M1` | Pengenalan KA | inti | `C-LE-a` | KG kartu "KA atau bukan?" | `SD4-2-M8` |
| 128 | `sd5-2-m2` | `SD5-2-M2` | Perbedaan Manusia dan Komputer dalam Penginderaan | inti | `C-LE-c` | TB tabel indera manusia dan sensor perangkat | `SD4-2-M9` |
| 129 | `sd5-2-m3` | `SD5-2-M3` | Mesin Cerdas versus Mesin Non-Cerdas | inti | `C-LE-d` | KG kartu perangkat (setrika, kipas, dispenser; asisten suara, robot penyapu) | `SD5-2-M1`, `SD4-2-M8` |
| 130 | `sd5-2-m4` | `SD5-2-M4` | Manfaat KA dalam Kehidupan Sehari-hari | inti | `C-LE-a`, `C-LE-b` | TB tabel manfaat dan batas | `SD5-2-M1`, `SD5-2-M3` |
| 131 | `sd5-2-m5` | `SD5-2-M5` | Konsep Mengenali Pola dan Klasifikasi dalam Situasi Kehidupan | inti | `C-PP-a`, `C-PP-b` | BB benda konkret (bentuk, warna, bunyi) | `SD4-1-M11`, `SD4-2-M10` |
| 132 | `sd5-2-m6` | `SD5-2-M6` | Mengenali Pola dan Klasifikasi oleh KA | inti | `C-PP-a`, `C-PP-b` | KD "mesin kotak"; KT aturan pengklasifikasi tertulis | `SD5-2-M5` |
| 133 | `sd5-2-m7` | `SD5-2-M7` | Simulasi Prediksi Pola dan Klasifikasi Sistem KA | inti | `C-PP-a`, `C-PP-c` | KG kartu contoh dan kartu baru | `SD5-2-M5`, `SD5-2-M6` |
| 134 | `sd5-2-m8` | `SD5-2-M8` | Pengaruh Data Input terhadap Hasil Mengenali Pola dan Klasifikasi KA | inti | `C-PP-c` | KG kartu masukan yang diubah | `SD5-2-M7` |
| 135 | `sd5-2-m9` | `SD5-2-M9` | Penguatan: Survei mesin di rumah | penguatan | — | TB tabel survei; bertanya pada keluarga | `SD5-2-M3` |
| 136 | `sd5-2-m10` | `SD5-2-M10` | Penguatan: Pengklasifikasi kartu | penguatan | — | KG kartu; KT aturan klasifikasi sendiri | `SD5-2-M5`, `SD5-2-M6` |
| 137 | `sd5-2-m11` | `SD5-2-M11` | Penguatan: Instruksi untuk mesin yang belajar | penguatan | — | KG kartu contoh pelatihan | `SD5-1-M6`, `SD5-2-M7` |
| 138 | `sd5-2-m12` | `SD5-2-M12` | Penguatan: KA untuk kesejahteraan | penguatan | — | kasus untuk diskusi kelas | `SD5-2-M4` |
| 139 | `sd5-2-m13` | `SD5-2-M13` | Proyek mini: pameran "mesin kotak" | proyek | — | KD "mesin kotak" kelompok; KG kartu | `SD5-2-M6`, `SD5-2-M7`, `SD5-2-M8` |
| 140 | `sd5-2-m14` | `SD5-2-M14` | Asesmen dan refleksi | asesmen dan refleksi | — | LP kuis dan lembar kerja | `SD5-2-M1 sampai M13` |
| 141 | `sd6-1-m1` | `SD6-1-M1` | Pemanfaatan Algoritma Sederhana | inti | `C-BK-b`, `C-BK-c` | KT kertas; jadwal piket | `SD5-1-M3`, `SD5-1-M6` |
| 142 | `sd6-1-m2` | `SD6-1-M2` | Pengenalan Representasi Simbol dalam Instruksi | inti | `C-BK-c` | KP simbol kesepakatan kelas; KT kertas | `SD6-1-M1`, `SD5-1-M6` |
| 143 | `sd6-1-m3` | `SD6-1-M3` | Eksperimen dengan Instruksi Logis | inti | `C-BK-c` | KT instruksi dan tabel catatan | `SD6-1-M2` |
| 144 | `sd6-1-m4` | `SD6-1-M4` | Penguatan: Menguji dan memperbaiki instruksi | penguatan | — | KT instruksi yang ditukar antar kelompok; catatan | `SD6-1-M3` |
| 145 | `sd6-1-m5` | `SD6-1-M5` | Pemanfaatan Internet Secara Aman dan Produktif | inti | `C-LD-c`, `C-LD-d` | DG guru memandu pencarian (tanpa data murid); KT kertas | `SD5-1-M9`, `SD5-1-M10` |
| 146 | `sd6-1-m6` | `SD6-1-M6` | Dampak Teknologi Digital | inti | `C-LD-a` | TB tabel dampak | `SD5-1-M7` |
| 147 | `sd6-1-m7` | `SD6-1-M7` | Produksi dan Diseminasi Konten Digital Sederhana | inti, opsi layar | `C-LD-e` | KT kertas teks dan gambar; opsi layar: pengolah dokumen di perangkat sekolah, tanpa akun murid | `SD6-1-M5`, `SD5-1-M9` |
| 148 | `sd6-1-m8` | `SD6-1-M8` | Konten Digital Positif | inti | `C-LD-c`, `C-LD-e` | KT karya M7; daftar periksa | `SD6-1-M7`, `SD5-1-M9` |
| 149 | `sd6-1-m9` | `SD6-1-M9` | Penguatan: Instruksi di layar dengan blok | penguatan, opsi layar | — | opsi layar: perangkat sekolah dengan pemrograman blok luring atau akun guru; alternatif: KP kartu blok dari kertas | `SD6-1-M3` |
| 150 | `sd6-1-m10` | `SD6-1-M10` | Penguatan: Lanjutan M9 atau alternatif kertas | penguatan | — | KT tantangan instruksi; perangkat atau kertas | `SD6-1-M9` |
| 151 | `sd6-1-m11` | `SD6-1-M11` | Penguatan: Tanda hati-hati di internet | penguatan | — | LP kuis kasus | `SD6-1-M5`, `SD5-1-M10` |
| 152 | `sd6-1-m12` | `SD6-1-M12` | Penguatan: Panduan konten positif | penguatan | — | KT kertas panduan | `SD6-1-M8` |
| 153 | `sd6-1-m13` | `SD6-1-M13` | Proyek mini: media kelas (poster atau lembar buletin) | proyek | — | KT poster atau lembar buletin | `SD6-1-M7`, `SD6-1-M8` |
| 154 | `sd6-1-m14` | `SD6-1-M14` | Asesmen dan refleksi | asesmen dan refleksi | — | LP kuis dan lembar kerja | `SD6-1-M1 sampai M13` |
| 155 | `sd6-2-m1` | `SD6-2-M1` | Cara kerja KA secara sederhana | inti | `C-LE-a` | KG kartu bagan masukan, contoh, aturan, keluaran | `SD5-2-M1`, `SD5-2-M6` |
| 156 | `sd6-2-m2` | `SD6-2-M2` | Dampak Kecerdasan Artifisial | inti | `C-LE-a`, `C-LE-b` | TB tabel dampak | `SD6-2-M1`, `SD5-2-M4` |
| 157 | `sd6-2-m3` | `SD6-2-M3` | Etika Dasar Penggunaan KA | inti | `C-LE-b`, `C-LE-e` | kasus cerita; KT aturan kelas | `SD6-2-M2`, `SD4-2-M11` |
| 158 | `sd6-2-m4` | `SD6-2-M4` | Cara KA Belajar dari Data | inti | `C-PP-a` | KG kartu contoh latihan "mesin kartu" | `SD5-2-M6`, `SD5-2-M7` |
| 159 | `sd6-2-m5` | `SD6-2-M5` | Model Pola dan Klasifikasi Sederhana | inti | `C-PP-a`, `C-PP-b` | KT aturan klasifikasi | `SD6-2-M4`, `SD5-2-M6` |
| 160 | `sd6-2-m6` | `SD6-2-M6` | Faktor yang Mempengaruhi Prediksi KA | inti | `C-PP-c` | KG contoh pelatihan yang timpang | `SD6-2-M4`, `SD5-2-M8` |
| 161 | `sd6-2-m7` | `SD6-2-M7` | Batasan Sederhana KA | inti | `C-PP-c` | KG kasus saat "mesin kartu" keliru | `SD6-2-M6` |
| 162 | `sd6-2-m8` | `SD6-2-M8` | Penguatan: Data yang timpang | penguatan | — | KG kartu contoh tidak adil (disengaja) | `SD6-2-M6` |
| 163 | `sd6-2-m9` | `SD6-2-M9` | Penguatan: Mesin cerdas atau bukan: ujian ciri | penguatan | — | KG kasus baru | `SD5-2-M3` |
| 164 | `sd6-2-m10` | `SD6-2-M10` | Penguatan: KA dan keselamatan data | penguatan | — | kasus diskusi; tanpa foto dan suara murid | `SD5-1-M9`, `SD6-2-M3` |
| 165 | `sd6-2-m11` | `SD6-2-M11` | Penguatan: Merancang aturan KA kelas | penguatan | — | KT kertas lima aturan | `SD6-2-M3` |
| 166 | `sd6-2-m12` | `SD6-2-M12` | Penguatan: Persiapan proyek akhir | penguatan | — | KT rancangan proyek | `SD6-2-M4`, `SD6-2-M5` |
| 167 | `sd6-2-m13` | `SD6-2-M13` | Proyek akhir: "mesin kartu" dan aturan KA | proyek | — | KD "mesin kartu" kelompok; KG kartu | `SD6-2-M3`, `SD6-2-M4`, `SD6-2-M6`, `SD6-2-M7` |
| 168 | `sd6-2-m14` | `SD6-2-M14` | Asesmen akhir, refleksi, penyambung ke SMP | asesmen dan refleksi | — | LP kuis dan lembar kerja | `SD6-2-M1 sampai M13` |

**Legenda kode bahan.**

| Kode | Isi |
| --- | --- |
| LK | Lantai berpetak (kapur, selotip) atau kertas kisi |
| KP | Kartu perintah dan arah (karton) |
| KG | Kartu gambar (buatan guru atau bebas hak; tanpa wajah atau foto anak) |
| KT | Kertas, pensil, spidol, krayon |
| BB | Benda konkret (manik, kartu warna, bahan bekas aman) |
| KD | Kardus atau kotak untuk sortir dan "mesin" |
| LP | Lembar kerja cetak |
| TB | Tabel kosong |
| PT | Papan tulis |
| DG | Demonstrasi guru (komputer atau proyektor milik guru, opsional, tanpa data murid) |

Semua bahan murah dan **tanpa perangkat murid**, kecuali dua kegiatan yang
silabus tandai `[opsi layar]` (`sd6-1-m7` pengolah dokumen, `sd6-1-m9`
blok), yang selalu punya padanan kertas.

## 4. Templat panduan guru

Panjang sasaran **400 sampai 800 kata**. Judul bagian dipakai **persis
sama** di semua 168 panduan, dalam urutan ini. Bagian 1 sampai 8 wajib;
`## Catatan untuk orang tua` dan `## Rujukan` opsional (`## Rujukan` wajib
bila panduan mengutip sumber luar). Pembaca utama adalah **guru kelas**,
bukan hanya guru informatika (silabus bagian 3, tujuan 6), jadi panduan
menjelaskan langkah dengan lengkap.

| Bagian | Isi dan aturan | Label | Rujukan |
| --- | --- | --- | --- |
| Judul `#` | Judul modul = topik silabus; di bawahnya satu baris: kode minggu, kelas dan semester, lama sesi, jenis, CP (hanya yang sah) atau "pengantar `P-xx`, bukan pemenuhan CP". | `T` | `weeks.json`; `cp-mapping.json` |
| `## Tujuan` | Satu sampai tiga kalimat, diturunkan dari kolom keluaran silabus (`exercise`) dan, bila ada, potongan CP **dikutip persis** dari silabus bagian 4. Tidak menambah tujuan. | `T` | silabus 4, 5 |
| `## Alat dan bahan` | Daftar dari kolom bahan di pemetaan; tanpa perangkat murid; padanan kertas untuk `opsi layar`. | `M` untuk manfaat bahan fisik; `T` untuk "tanpa layar" | Scherer dkk. (2020), riset 6.4 (visualisasi dan fisikalitas efektif; beda antarpendekatan "marginal"); silabus 2 prinsip 3 |
| `## Ingat kembali` | 3 sampai 5 menit pembuka. **Mengingat tanpa melihat catatan** satu konsep minggu sebelumnya, ditambah satu konsep dari 2 sampai 4 minggu sebelumnya (berjarak). Bentuk: tulis atau gambar yang diingat dalam satu menit, lalu cek bersama; bukan membaca ulang. Boleh mencampur dua jenis soal (interleaving) bila konsepnya mirip, terutama pada minggu penguatan. Tanpa nilai. | `K` untuk prinsip (mengingat dan jarak), `M` untuk SD dan pemrograman; `M` untuk interleaving | riset 3.1, 3.2 (`[A]`), 3.3 (bergantung materi); riset 7 (tidak ada studi pemrograman khusus SD) |
| `## Kegiatan inti` | Urutan tetap: (1) **Contoh dulu**: guru atau satu murid memperagakan contoh lengkap; (2) **Bandingkan dua contoh** berdampingan dengan petunjuk eksplisit ("cari yang sama dan beda"), lalu guru memberi nama relasinya, dan prinsip dinyatakan **sesudah** membandingkan; (3) **Coba bersama** contoh setengah jadi; (4) **Coba sendiri** soal serupa, dukungan dipudarkan. Satu konsep per sesi; contoh kelas 5-6 memakai konteks sekolah. | `K` untuk contoh dulu pada pemula; `M` untuk usia SD; `M` untuk membandingkan pada pemrograman | riset 3.4 (`[B]`), 3.5 dan 7 (Sinha dan Kapur, 2021: untuk kelas 2 sampai 5 arah efek menguntungkan instruksi lebih dulu); riset 4.2 dan 4.3 (Alfieri dkk., 2013 `[A]`: membandingkan kasus, d = .50; belum ada studi pada pemrograman, jadi `[inferensi]`) |
| `## Pertanyaan pemandu` | Empat sampai enam pertanyaan dalam **bahasa relasional** ("sama seperti", "berbeda dari", "lebih ... dari", "sebab", "akibat", "bagian dari") dan satu atau dua pertanyaan "mengapa langkah ini?". | `M` | riset 4.2, 4.3; riset 3.6 (elaborasi, `[B]` sedang) |
| `## Tanda kemajuan` | Kelas 1-4: pengamatan dan lembar kerja pendek, **tanpa nilai angka**. Kelas 5-6: lembar kerja formatif; M13 rubrik proses dan produk (kerja sama, ketepatan, penyampaian); M14 kuis dan penilaian sikap. Kunci jawaban mengikuti keputusan Q3. Umpan balik berisi **apa yang perlu diperbaiki**, bukan hanya benar-salah. | `T`; `K` untuk umpan balik berisi (heterogen) | silabus 9 (asesmen `[asumsi]`); riset 3.8 (`[A]` sedang); riset 3.9 |
| `## Variasi dan dukungan` | Dukungan bertahap, tantangan, adaptasi (belum lancar membaca, keterbatasan motorik atau penglihatan), versi padanan kertas untuk `opsi layar`, dan pilihan bahan murah. Hindari lomba kecepatan. | `K` contoh lalu dipudarkan pada pemula; `M` | riset 3.4, 3.5, 3.9 |
| `## Keselamatan dan privasi` | Wajib: risiko bahan, tanpa data pribadi murid atau tokoh nyata, tanpa kata sandi sungguhan, tanpa layanan KA untuk murid, tanpa foto atau suara murid. | `T` | silabus 10.1 dan 10.2; ADR-0004 |
| `## Catatan untuk orang tua` (opsional) | Dua sampai tiga kalimat: satu ajakan tanpa layar; tidak wajib; tidak menjanjikan manfaat luas. | `T` untuk isi; `M` untuk manfaatnya | silabus 2; riset 5 |
| `## Rujukan` (opsional) | Hanya bila ada tautan luar; format di bagian 6. | `T` | bagian 6 |

**Varian menurut jenis modul** (judul bagian tetap sama; isinya
menyesuaikan):

| Jenis | Penyesuaian |
| --- | --- |
| `pengantar` (kelas 1-4) | Bermain, contoh dulu, bahasa sederhana; butir `P-` ditulis sebagai persiapan, tidak sebagai pemenuhan CP. Kelas 1-2: instruksi lisan guru, lembar sebagian besar gambar. |
| `inti` (kelas 5-6) | Mengutip butir CP yang sah; lembar kerja formatif; istilah "dekomposisi", "pola", "abstraksi", "algoritma" disebut penjabaran penyusun `[asumsi]`, bukan kutipan sumber. |
| `penguatan` | Memperdalam butir yang sudah dipenuhi minggu sebelumnya; bukan pemenuhan CP baru; `## Ingat kembali` lebih panjang dan boleh mencampur dua jenis soal. |
| `proyek` | Kerja kelompok; tiap peran dijelaskan; rubrik proses dan produk; karya dipamerkan di kelas, tidak diunggah. |
| `asesmen dan refleksi` | Ingat kembali berjarak lintas minggu; kelas 1-4 observasi dan refleksi tanpa angka; kelas 5-6 kuis, lembar kerja, penilaian sikap (bobot dan predikat mengikuti sekolah, `[belum terverifikasi]`). |
| `opsi layar` | Selalu memuat padanan kertas penuh; tanpa akun murid; PRIMM sederhana (di bawah). |

### 4.1 PRIMM sederhana untuk `sd6-1-m9` dan `sd6-1-m10`

Hanya dua modul ini yang berhubungan dengan blok visual, dan hanya bila
sekolah menyediakan perangkat (silabus 11, opsi B). Kegiatan tetap
**tanpa sintaks teks**.

| Tahap | Kegiatan | Padanan kertas |
| --- | --- | --- |
| Prediksi (*Predict*) | Murid menulis prediksi: apa yang terjadi bila susunan blok ini dijalankan? | Susunan kartu blok di meja. |
| Jalankan (*Run*) | Guru atau kelompok menjalankan; murid mencocokkan dengan prediksi. | Satu murid menjadi "mesin" yang menjalankan kartu di kisi. |
| Selidiki (*Investigate*) | Murid menunjuk blok mana yang menyebabkan hasil dan menjelaskannya dengan kata relasional. | Menunjuk kartu dan menjelaskan. |
| Modifikasi (*Modify*) | Mengubah satu blok, memprediksi, lalu mencoba. | Menukar satu kartu. |
| Buat (*Make*), `sd6-1-m10` | Membuat tantangan instruksi sendiri untuk teman. | Membuat susunan kartu sendiri. |

Label: `M`. Riset 6.3 mencatat PRIMM diuji pada usia 11 sampai 14 di 13 sekolah
(Sentance dkk., 2019, `[C]`, kuasi, bukan RCT) dan riset 8.4 menandai `K`
untuk usia itu di SMP; SD kelas 6 berada di rentang usianya, tetapi studinya di
sekolah menengah dan bukan pemrograman blok tanpa sintaks, sehingga di sini `M`.
Parsons (kartu diacak, Ericson dkk., 2017) hanya terbukti **efisien**, bukan
lebih unggul (riset 6.3). Transisi blok ke teks tidak dimuat silabus.

## 5. Templat lembar anak

Panjang sasaran **100 sampai 250 kata**. Tingkat bahasa menurut kelas:
kelas 1-2 gambar dengan kata penanda (paling banyak 8 kata per kalimat),
kelas 3-4 kalimat pendek, kelas 5-6 lembar kerja teks sederhana dengan
tabel kosong. Gambar **dideskripsikan dengan teks** `[Gambar: ...]`
tanpa aset gambar di repositori. Cara melengkapi gambar mengikuti keputusan
pemilik untuk `tk-coding` (rancangan TK, Q3), supaya kedua program seragam;
rancangan SD tidak mengajukan pertanyaan gambar tersendiri.

| Unsur | Aturan | Label | Rujukan |
| --- | --- | --- | --- |
| Judul `#` | Judul modul; tanpa peringkat atau nilai. | `T` | |
| `Ingat dulu` | Satu atau dua butir yang dijawab **tanpa melihat** lembar minggu lalu (gambar atau tulis satu kalimat). | `K` prinsip, `M` untuk SD | riset 3.1, 3.2 |
| `Contoh` | Satu contoh sudah terisi lengkap. | `K` pemula; `M` SD | riset 3.4, 3.5, 7 |
| `Bandingkan` | Dua contoh berdampingan dan pertanyaan "apa yang sama? apa yang beda?"; satu baris untuk menamai hubungannya. | `M` | riset 4.2, 4.3 |
| `Coba` | Satu soal setengah jadi, lalu satu soal utuh (dukungan dipudarkan). | `K` pemula; `M` SD | riset 3.4 |
| `[Gambar: ...]` | Deskripsi gambar berdampingan dengan kata. | `M` | riset 3.7 (rincian per desain `[belum terverifikasi]`) |
| Larangan | **Tanpa kolom nama, kelompok, tanggal, kelas, atau identitas murid**; tanpa foto atau suara; tanpa skor; nama tokoh cerita fiktif; tanpa kata sandi atau alamat sungguhan. Penandaan kertas diurus guru di sekolah. | `T` | ADR-0004; silabus 10.1 |
| `Catatan cetak` | Satu baris untuk guru (tidak dicetak). | `T` | |
| Hindari | Murid menilai diri dengan skala "aku sudah paham". Pelajar sering salah menilai dirinya; yang dipakai adalah meminta murid **menjelaskan ke teman**. | `K` | riset 3.9 |

## 6. Aturan rujukan

1. **Hanya sumber resmi atau terverifikasi, dan hanya `https://`.**
   Tautan `http://`, pemendek tautan, dan media sosial tidak dipakai.
2. **Tiap tautan dibuka pada hari penulisan**; tanggalnya dicatat di
   `## Rujukan`. Tautan yang tidak terbuka ditulis `[belum terverifikasi]`
   atau dibuang.
3. **Lisensi dicatat** pada baris rujukan dan dipatuhi.
4. **Dokumen pemerintah** dikutip pendek dengan sumber; tidak disalin utuh.
5. **CS Unplugged hanya ditautkan dan diadaptasi ide-nya; teks, gambar, atau
   lembar kerjanya tidak disalin.**
6. Tidak ada merek atau produk yang dipromosikan; alat blok disebut sebagai
   kategori kecuali pemilik memutuskan lain (Q2).
7. Klaim riset merujuk ke bagian riset kognitif repositori; jurnal memakai DOI
   `https://doi.org/...` dari daftar pustaka riset itu.

**Sumber yang boleh dipakai dan cek lisensinya (dibuka 2026-11-19).**

| Sumber | Dipakai untuk | Status dan lisensi |
| --- | --- | --- |
| Permendikdasmen 13/2025 (PDF): https://peraturan.bpk.go.id/Download/384307/Permendikdasmen-no-13-tahun-2025.pdf | JP dan struktur kelas 5-6 | Terbuka (HTTP 200); peraturan, kutip pendek. |
| Kepka BSKAP 046/H/KR/2025: https://bpmpbabel.kemendikdasmen.go.id/PPID/wp-content/uploads/2025/07/KepKaBSKAP-046_2025-ttg-CP.pdf | Teks CP Fase C | Terbuka (HTTP 200); peraturan, kutip pendek. |
| BGTK Kaltim, Fase C: https://bgtkkaltim.kemendikdasmen.go.id/2026/02/13/pelajaran-koding-dan-kecerdasan-artifisial-ka-fase-c-kelas-v-dan-vi-sd-mi/ | Nama topik materi esensial kelas 5-6 | Terbuka (HTTP 200); halaman UPT resmi, bukan bagian SK (silabus bagian 14). |
| Program Koding dan KA: https://kodingka.kemendikdasmen.go.id/pembelajaran/ | Pendekatan unplugged dan permainan | Terbuka (HTTP 200). |
| UU 27/2022: https://peraturan.bpk.go.id/Details/229798/uu-no-27-tahun-2022 | Data anak sebagai data pribadi spesifik | Terbuka (HTTP 200); undang-undang. |
| CS Unplugged: https://www.csunplugged.org/en/ | Rujukan ide kegiatan | Halaman menyatakan konten dibagikan di bawah **CC BY-SA 4.0**, dibaca langsung 2026-11-19. Hanya ditautkan dan diadaptasi ide-nya. |
| Scratch untuk pendidik: https://scratch.mit.edu/educators | Hanya bila Q2 memilih menyebut Scratch | Terbuka (HTTP 200). Halaman syarat penggunaan di `https://scratch.mit.edu/terms_of_use` memberi HTTP 404 pada 2026-11-19, jadi lisensi dan syarat usia `[belum terverifikasi]`; harus dicek ulang sebelum dipakai. |
| MakeCode aplikasi luring: https://makecode.microbit.org/offline-app | Contoh alat blok luring (silabus riset 5) | Terbuka (HTTP 200); lisensi aplikasi luring dibaca ulang saat dipakai. |
| Christie dan Gentner (2010), doi 10.1080/15248371003700015; Alfieri dkk. (2013); Sinha dan Kapur (2021); Sentance dkk. (2019) | Dasar bukti | Status verifikasi mengikuti daftar pustaka riset kognitif 10; hanya ditautkan lewat DOI. |

**Koreksi lisensi CS Unplugged.** Pesan penugasan menyebut CC BY-NC-SA;
halaman resmi yang dibuka 2026-11-19 menyebut **CC BY-SA 4.0** (tanpa klausul
NonCommercial), sesuai `riset.md` SD bagian 5. Rancangan ini mengikuti halaman
resmi; pemilik diminta memeriksa ulang bila punya informasi lain.

Panduan Mata Pelajaran Koding dan KA (12 September 2025) tidak dibuka
(`riset.md` bagian 2.4, `[belum terverifikasi]`) dan tidak dipakai sebagai
sumber.

## 7. Gelombang penulisan

Satu agent mengerjakan **sekitar 7 minggu** (14 berkas: 7 panduan dan 7
lembar): semester dibagi dua, M1 sampai M7 dan M8 sampai M14, sehingga
**24 tugas**. Agent penulis memakai `pelaksana-kompleks` (Sonnet, `medium`);
pemeriksaan mekanis (hitung kata, cek judul, cek tautan) cocok untuk
`pelaksana-sederhana`. Tugas dalam satu gelombang mengerjakan berkas yang
**tidak bertumpang-tindih**; indeks dan dokumen turunan hanya disentuh
orchestrator sesudah gelombang selesai. "Ingat kembali" diturunkan dari
**topik silabus** minggu terdahulu (bukan dari teks modul yang mungkin belum
ditulis), sehingga urutan kelas tidak menimbulkan ketergantungan antargelombang.

Urutan di bawah mengikuti rekomendasi Q1 (kelas 5-6 lebih dulu); opsi lain
mengubah urutan gelombang, bukan isinya.

| Gelombang | Kelas | Tugas (agent) | Berkas | Catatan |
| --- | --- | --- | --- | --- |
| 0 | Persetujuan rancangan; pilot dipindah | orchestrator | 2 | Jawaban atas Q1 sampai Q3. |
| 1 | Kelas 5 (inti, 2 JP) | S1: `sd5-1-m1` sampai `m7`; S2: `sd5-1-m8` sampai `m14`; S3: `sd5-2-m1` sampai `m7`; S4: `sd5-2-m8` sampai `m14` | 56 | Pemenuhan CP; paling sensitif pada kutipan CP dan kebijakan AI; uji templat `inti`. |
| 2 | Kelas 6 | S5 sampai S8 (pola yang sama untuk `sd6-1` dan `sd6-2`) | 56 | Memuat `sd6-1-m7` dan `sd6-1-m9` (opsi layar, PRIMM). |
| 3 | Kelas 4 | S9 sampai S12 | 56 | Pengantar menuju Fase C (kolom "menuju"). |
| 4 | Kelas 3 | S13 sampai S16 | 56 | Pengantar. |
| 5 | Kelas 2 | S17 sampai S20 | 56 | Pengantar; bahasa gambar. |
| 6 | Kelas 1 | S21 sampai S24 | 56 | Pengantar; lembar sebagian besar gambar; berisi modul pilot. |
| 7 | Pembersihan | orchestrator | | Indeks, validasi, dokumen. |

Tiap gelombang menjadi satu PR sendiri. Apakah gelombang berikutnya menunggu
tinjauan manusia ikut diputuskan lewat Q1.

## 8. Gerbang mutu

Gerbang berlaku **per modul** dan dijalankan orchestrator sebelum gelombang
digabung. Laporan agent bukan bukti.

| Gerbang | Pemeriksaan | Cara | Gagal bila |
| --- | --- | --- | --- |
| G1 Struktur | Judul `##` wajib dengan nama dan urutan templat; lembar memuat unsur wajib | `grep` terdokumentasi di PR gelombang (belum ada skrip; usulan terpisah `scripts/check-module-structure.ts`, di luar rancangan ini) | Judul hilang, salah nama, atau urutan berbeda |
| G2 Panjang | Panduan 400 sampai 800 kata; lembar 100 sampai 250 kata | `wc -w` | Di luar rentang lebih dari 10 persen |
| G3 Kesetiaan silabus dan CP | Judul, kode, jenis, dan butir sesuai `weeks.json`; `cpItems` hanya pada 32 minggu pemenuhan menurut `cp-mapping.json`, tidak pernah pada `P-`, penguatan, proyek, atau asesmen; potongan CP dikutip persis dari silabus bagian 4 | Skrip pembanding sementara, `bun run validate`, `bun run check:fidelity --program sd-coding` | Ada selisih |
| G4 Privasi | Tanpa kolom nama, kelompok, tanggal, kelas; tanpa foto; tokoh fiktif; tanpa kata sandi atau alamat sungguhan | `grep` pola; `bun run privacy-check` (khusus `data/`) | Ada temuan |
| G5 Kebijakan AI | Tidak ada langkah yang meminta murid memakai layanan AI generatif; demonstrasi hanya oleh guru tanpa data murid; KA dipelajari lewat "mesin kotak" dan "mesin kartu" | Baca; `grep` kata chatbot, ChatGPT, prompt | Ada langkah yang melanggar |
| G6 Klaim | Tidak ada frasa manfaat luas atau mitos riset 5: "meningkatkan kecerdasan", "IQ", "otak kiri", "otak kanan", "gaya belajar", persentase retensi, "sedini mungkin" | `grep` daftar kata | Ada temuan |
| G7 Rujukan | Hanya `https://`; tautan terbuka pada tanggal tulis; lisensi tercatat; tanpa salinan CS Unplugged | `curl -I` dan pembacaan | Tautan mati, tanpa tanggal, atau teks tersalin |
| G8 Opsi layar | `sd6-1-m7` dan `sd6-1-m9` memuat padanan kertas penuh dan tanpa akun murid; tidak ada transisi blok ke teks | Baca | Padanan kertas hilang |
| G9 Keselamatan | `## Keselamatan dan privasi` menyebut risiko kegiatan itu | Baca | Risiko jelas tidak disebut |
| G10 Format dan uji | `bun run format:check`, `lint`, `assist:check`, `typecheck`, `bun test`, `bun run build`, `check:module-code` | Perintah | Ada yang gagal |
| G11 Konsistensi | Kata arah dan perintah seragam dengan `tk-coding` (simbol bersama, keputusan 5 silabus SD) dan antar-kelas | Baca silang | Istilah berbeda tanpa alasan |
| G12 Peninjauan manusia | Pemilik atau peninjau yang ia tunjuk memeriksa: keselamatan, usia, bahasa, akurasi, klaim. Status naik hanya oleh manusia (ADR-0007) | Review PR | Tidak ada tinjauan |

## 9. Pilot

Satu modul contoh lengkap untuk minggu pertama, `sd1-1-m1` (Perintah satu
langkah), ada di [`rancangan-modul-contoh/`](rancangan-modul-contoh/):

- [`panduan-sd1-1-m1.md`](rancangan-modul-contoh/panduan-sd1-1-m1.md)
- [`lembar-sd1-1-m1.md`](rancangan-modul-contoh/lembar-sd1-1-m1.md)

Pilot menguji templat kelas 1. Templat `inti` kelas 5-6 dan PRIMM diuji pada
gelombang 1 dan 2; pilot kelas 5-6 dapat diminta bila pemilik ingin
melihatnya sebelum persetujuan (belum dikerjakan, di luar scope tugas ini).
Setelah rancangan disetujui, pilot dipindah ke `content/sd-coding/` pada
gelombang 6; sebelum itu ia berada di `docs/` dan **bukan** modul.

## 10. Pertanyaan keputusan untuk pemilik

Disajikan oleh orchestrator sebagai dialog pilihan baku; opsi pertama adalah
rekomendasi.

**Q1. Urutan penulisan 168 modul.**

| Opsi | Konsekuensi |
| --- | --- |
| a. **(Disarankan)** Kelas 5-6 lebih dulu, lalu 4, 3, 2, 1 | Modul yang memenuhi CP resmi dan paling dibutuhkan guru KKA terbit paling awal; templat `inti` dan kebijakan AI teruji sejak gelombang 1; kelas 1-4 (pengantar opsional) menunggu paling akhir dan templat kelas rendah teruji belakangan. |
| b. Kelas 1 sampai 6 berurutan | Kosakata dan simbol dibangun dari bawah dan selaras dengan jembatan TK; modul pemenuhan CP baru tersedia di akhir. |
| c. Satu semester dari tiap tahap lebih dulu (`sd1-1`, `sd3-1`, `sd5-1`, `sd6-1`), sisanya menyusul | Semua templat teruji dini dan umpan balik datang cepat; modul tiap kelas belum lengkap sehingga guru belum bisa menjalankan satu tahun penuh. |

**Q2. Cara menyebut alat blok pada `sd6-1-m9` dan `sd6-1-m10`.**

| Opsi | Konsekuensi |
| --- | --- |
| a. **(Disarankan)** Netral alat: "pemrograman blok luring atau lewat akun guru" sesuai silabus 11, dengan padanan kertas penuh dan tanpa merek | Tanpa pertanyaan lisensi atau syarat usia; selaras opsi B yang sudah disetujui; guru harus memilih alatnya sendiri. |
| b. Sebut Scratch dan tautkan dokumentasi pendidik resmi | Lebih mudah bagi guru; halaman syarat penggunaan tidak terbuka saat dicek (HTTP 404), jadi lisensi dan syarat usia harus diverifikasi ulang sebelum dipakai, dan modul bergantung pada satu vendor. |
| c. Hanya kegiatan kertas, tanpa langkah berlayar | Paling sederhana dan paling aman untuk privasi; menghapus opsi layar yang sudah disetujui sebagai opsi B (silabus bagian 11). |

**Q3. Kunci jawaban dan kuis di panduan guru (repositori publik).**

| Opsi | Konsekuensi |
| --- | --- |
| a. Kunci jawaban lengkap untuk semua lembar dan kuis | Guru kelas paling terbantu; kuis M14 kelas 5-6 (sumatif) menjadi terbuka untuk siapa pun. |
| b. **(Disarankan)** Kunci atau contoh jawaban untuk lembar formatif mingguan; M14 memuat rubrik kriteria dan contoh bentuk soal, tanpa kunci | Guru tetap terbantu pada kegiatan harian; soal sumatif disusun guru sendiri; kunci yang beredar tidak merusak sumatif. |
| c. Tanpa kunci apa pun | Paling aman; guru kelas non-informatika (tujuan 6 silabus) kehilangan pegangan, dan mutu penilaian bergantung pada guru. |

## 11. Temuan dan batas

- **Selisih data.** Untuk `SD6-2-M7` (Batasan Sederhana KA), kolom butir di
  `weeks.json` dan silabus bagian 5 memuat `C-PP-c` dan `C-LE-e`, tetapi
  `cp-mapping.json` dan tabel pemetaan silabus bagian 6 hanya mencatat
  `C-PP-c` sebagai pemenuhan (`C-LE-e` hanya pada `SD6-2-M3`). Rancangan ini
  mengikuti `cp-mapping.json` sesuai kontrak indeks; modul `sd6-2-m7`
  menyebut `C-LE-e` sebagai butir yang dibahas, bukan pemenuhan. Pemilik atau
  orchestrator dapat memutuskan apakah silabus perlu direvisi.
- Dua puluh minggu lain (16 penguatan dan 4 proyek mini kelas 5-6) memuat butir di kolom butir
  `weeks.json` tetapi tidak di `cp-mapping.json`; itu sesuai silabus bagian 6
  ("minggu penguatan memperdalam") dan bukan selisih.
- `docs/programs/sd-coding/README.md` ("Daftar berkas") dan
  `docs/programs/README.md` ("Belum ada `content/sd-coding/`") belum
  menyebut dokumen ini; diperbarui orchestrator, di luar scope rancangan.
- Silabus tidak memuat PRIMM maupun transisi blok ke teks; PRIMM dipakai
  hanya sebagai kerangka kegiatan blok opsional `sd6-1-m9` dan `m10`.
- Riset kognitif 8.4 ditulis sebelum silabus disetujui dan belum dicocokkan
  ulang; rancangan ini memakainya hanya sebagai penuntun `M`.
- Angka sesi (35 dan 70 menit, 14 minggu) adalah `[asumsi]` silabus kecuali JP
  kelas 5-6.

## Changelog

| Versi | Tanggal | Perubahan |
| --- | --- | --- |
| v0.1.0 | 2026-11-19 | Draf awal rancangan modul SD: pemetaan 168 minggu, templat panduan dan lembar, PRIMM sederhana, aturan rujukan, gelombang, gerbang mutu, tiga pertanyaan keputusan, dan pilot `sd1-1-m1`. |
