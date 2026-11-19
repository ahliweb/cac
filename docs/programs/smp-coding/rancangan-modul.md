# Rancangan Modul Belajar `smp-coding` (84 modul)

- **Version:** v0.1.1
- **Last updated:** 2026-11-19
- **Status:** DRAF, menunggu persetujuan pemilik (status persetujuan rancangan tidak diubah). Modulnya **sudah ditulis** per 2026-11-19: 84 modul di `content/smp-coding/modules/`, terindeks di `data/smp-coding/modules.json`; semuanya berstatus `draf`.
- **Changeset:** v0.1.0: dokumen pertama (rancangan modul belajar `smp-coding`, satu modul per minggu, 84 modul), bersama pilot `smp7-1-m1`.

> **Catatan status (2026-11-19, sinkron dokumen #124).** Frasa "belum satu pun modul ditulis" dan "belum ada `modules.json`" di bawah adalah riwayat: 84 modul ada di `content/smp-coding/modules/` dan terindeks di `data/smp-coding/modules.json` (skema `src/schema/smp-module.ts`), semua `draf`, belum ditinjau. Pilot `rancangan-modul-contoh/` kini riwayat; modul nyatanya `content/smp-coding/modules/smp7-1-m1.md`. Pemeriksa Python sudah ada: `bun run check:module-code` memeriksa sintaks blok `python` (`ast.parse`, tidak menjalankannya) selain `cpp` dan `arduino`; pilihan Q3 di bawah dibiarkan sebagai catatan rancangan. Judul `#` dan bagian `## Rujukan` tidak lagi ada di tubuh modul (judul dan rujukan dirender dari indeks); judul ganda kini galat di `bun run check:learner-assets`.
> Keputusan dan kontrak yang disetujui pemilik di dokumen ini tidak berubah; yang diperbarui hanya klausa status yang basi.

> Isi dokumen ini adalah konten **karangan** (*authored*) menurut
> [ADR-0007](../../architecture/adr/0007-authored-learning-content.md), bukan
> transkripsi silabus. Agent tidak pernah mencatat persetujuan atas nama
> pemilik; semua keputusan di bagian 7 menunggu dialog pilihan pemilik. Modul
> yang kelak ditulis berstatus `draf` sampai pemilik atau peninjau yang
> ditunjuknya menyetujui, per modul.

## 0. Cara membaca dokumen ini

| Tanda | Arti |
| --- | --- |
| `K` | Unsur didukung bukti kuat untuk prinsipnya (riset ilmu belajar bagian 8: `[A]` atau `[B]`). Untuk **pemrograman** bukti langsungnya sering terbatas; batas itu ditulis di kolom rujukan. |
| `M` | Masuk akal tetapi bukti terbatas untuk pemrograman atau usia itu (`[inferensi]`). |
| `[asumsi]` | Keputusan perancangan penyusun, bukan data resmi. |
| `[belum terverifikasi]` | Tidak dapat dipastikan dari sumber yang dibuka penyusun pada 2026-11-19. |
| Rujukan `riset X.Y` | Bagian X.Y dari [`ilmu-belajar-kognitif.md`](../../riset/ilmu-belajar-kognitif.md); `AI X.Y` berarti [`ai-rekayasa-perangkat-lunak.md`](../../riset/ai-rekayasa-perangkat-lunak.md). |

## 1. Tujuan dan batas

Keputusan pemilik 2026-11-19: modul belajar `smp-coding` **lengkap**, satu modul
per minggu silabus (84 modul: 6 semester x 14 minggu), pembaca murid SMP/MTs
kelas 7 sampai 9. Dokumen ini merancang pemetaan, templat, aturan rujukan,
gelombang penulisan, dan gerbang mutu; **bukan** modulnya.

Batas:

- Tidak mengubah `content/`, `data/`, `src/`, `silabus.md`, `riset.md`, `README`
  program, atau `docs/panduan/`. Skema indeks khusus program (`modules.json`)
  dibuat pelaksana lain; dokumen ini hanya memegang kontraknya (bagian 2).
- Butir CP **tidak** diubah dan tidak "dipenuhi" oleh modul. Modul hanya
  mengutip kode butir yang oleh corpus (`data/smp-coding/weeks.json`) dipetakan
  ke minggu itu.
- 11 butir CP yang tidak dicakup minggu mana pun (`data/smp-coding/uncovered.json`:
  7 Literasi Digital, 2 `DK-EA`, 2 `DK-PA`) **bukan** cakupan 84 modul ini; itu
  pekerjaan modul pendamping tersendiri (silabus Q10).
- Klub pengayaan (`data/smp-coding/club.json`) tidak dihitung dalam 84 modul.

## 2. Kontrak indeks modul (dari pelaksana skema)

| Bidang | Aturan untuk 84 modul |
| --- | --- |
| `id` | Kode minggu dengan huruf kecil: `smp7-1-m1` sampai `smp9-2-m14`. Cocok dengan `weeks[].id` di `data/smp-coding/weeks.json` (`SMP7-1-M1`, dst.). |
| `cpCodes` | Hanya `cpCodes` minggu itu di corpus (kolom "CP diklaim" di bagian 3). Minggu pengayaan, Python, dan klub **tidak mengklaim CP**: 10 modul punya `cpCodes` kosong. Kode berbintang (`DK-BK-c*`, `irisanCodes` di corpus) adalah irisan terdekat, bukan pemenuhan CP, **tidak** dimasukkan ke `cpCodes`. |
| Berkas isi | `content/smp-coding/modules/<id>.md`, nama berkas sama dengan `id` (ADR-0007). |
| Status | `draf` untuk semua modul baru. Hanya manusia yang menetapkan `disetujui`. |
| Pembaca | Murid (kata ganti "kamu"); bagian "Catatan untuk guru" untuk guru. |
| Pemilik indeks | Satu orang (orchestrator) mengisi `modules.json` setelah modul ditinjau. Agent penulis **tidak** menyunting indeks (bagian 6). |

## 3. Pemetaan: 84 modul

Kolom "CP diklaim" disalin dari `data/smp-coding/weeks.json` (`cpCodes`);
"(pengayaan)" mengikuti tanda `enrichment` di corpus; "Alat" disalin dari
kolom alat silabus. **Prasyarat** adalah usulan penyusun `[asumsi]`: modul yang
sebaiknya sudah dipelajari; ia bukan syarat kaku (murid yang pindah sekolah
tetap dapat masuk lewat bagian "Ingat kembali" yang memuat penjelasan ringkas).
Dasar cara menyusunnya: bagian 3.2.

| id | Kode | Judul modul (topik minggu) | Alat | CP diklaim (`cpCodes`) | Prasyarat |
| --- | --- | --- | --- | --- | --- |
| `smp7-1-m1` | SMP7-1-M1 | Apa itu komputasi: instruksi sehari-hari dan ketepatan | - (unplugged) | `D-BK-a` | (tidak ada) |
| `smp7-1-m2` | SMP7-1-M2 | Algoritma: urutan langkah, urutan yang salah | - (unplugged) | `D-BK-a`, `D-BK-e` | `smp7-1-m1` |
| `smp7-1-m3` | SMP7-1-M3 | Mengenal Scratch: panggung, sprite, blok gerak | Scratch | `D-BK-e`, `DK-BK-c` | `smp7-1-m2` |
| `smp7-1-m4` | SMP7-1-M4 | Peristiwa dan urutan: menggambar bentuk | Scratch | `D-BK-e`, `DK-BK-c` | `smp7-1-m3` |
| `smp7-1-m5` | SMP7-1-M5 | Perulangan | Scratch | `D-BK-e`, `DK-BK-c`, `D-BK-a` | `smp7-1-m4` |
| `smp7-1-m6` | SMP7-1-M6 | Dekomposisi: memecah masalah, animasi cerita | Scratch | `D-BK-a`, `D-BK-e`, `DK-BK-c` | `smp7-1-m5` |
| `smp7-1-m7` | SMP7-1-M7 | Pola dan generalisasi | Scratch | `D-BK-a` | `smp7-1-m5` |
| `smp7-1-m8` | SMP7-1-M8 | Percabangan (kondisi) | Scratch | `D-BK-e`, `DK-BK-c` | `smp7-1-m5` |
| `smp7-1-m9` | SMP7-1-M9 | Variabel | Scratch | `D-BK-e`, `DK-BK-c` | `smp7-1-m4` |
| `smp7-1-m10` | SMP7-1-M10 | Masukan pengguna: kuis | Scratch | `D-BK-e`, `DK-BK-c` | `smp7-1-m8`, `smp7-1-m9` |
| `smp7-1-m11` | SMP7-1-M11 | Debugging: mencari dan memperbaiki kesalahan | Scratch | `D-BK-a`, `DK-BK-b` | `smp7-1-m10` |
| `smp7-1-m12` | SMP7-1-M12 | Berbagi karya: atribusi, izin, dan data diri | Scratch | `D-LD-p`, `D-LD-j`, `DK-LD-a` | `smp7-1-m3` |
| `smp7-1-m13` | SMP7-1-M13 | Proyek mini: animasi atau game satu layar | Scratch | `D-BK-e`, `DK-BK-c`, `DK-BK-b` | `smp7-1-m8`, `smp7-1-m9`, `smp7-1-m11` |
| `smp7-1-m14` | SMP7-1-M14 | Asesmen dan refleksi | Scratch | `D-BK-e`, `DK-BK-c`, `D-BK-a` | `smp7-1-m13` |
| `smp7-2-m1` | SMP7-2-M1 | Data dan informasi; data diskrit | - (unplugged) | `D-BK-b`, `D-BK-a`, `DK-BK-a` | `smp7-1-m2` |
| `smp7-2-m2` | SMP7-2-M2 | Kodifikasi: biner (pengayaan) | - (unplugged) | (tidak ada) | `smp7-2-m1` |
| `smp7-2-m3` | SMP7-2-M3 | Teks dan gambar sebagai data (pengayaan) | - atau Scratch | (tidak ada) | `smp7-2-m2` |
| `smp7-2-m4` | SMP7-2-M4 | Daftar (list) | Scratch | `D-BK-b`, `D-BK-e`, `D-BK-a` | `smp7-1-m9`, `smp7-2-m1` |
| `smp7-2-m5` | SMP7-2-M5 | Mencari dan mengurutkan | - (unplugged) | `D-BK-a` | `smp7-2-m1` |
| `smp7-2-m6` | SMP7-2-M6 | Mengurutkan dalam program | Scratch | `D-BK-e`, `DK-BK-c` | `smp7-2-m4`, `smp7-2-m5` |
| `smp7-2-m7` | SMP7-2-M7 | Game: koordinat, gerak, tabrakan | Scratch | `D-BK-e`, `DK-BK-c` | `smp7-1-m8`, `smp7-1-m9` |
| `smp7-2-m8` | SMP7-2-M8 | Game: skor, nyawa, level | Scratch | `D-BK-e`, `DK-BK-c` | `smp7-2-m7` |
| `smp7-2-m9` | SMP7-2-M9 | Pesan antar sprite dan klon | Scratch | `D-BK-e`, `DK-BK-c` | `smp7-2-m7` |
| `smp7-2-m10` | SMP7-2-M10 | Komputer sebagai sistem: masukan, proses, keluaran | - (unplugged) | `D-LD-f` | `smp7-2-m1` |
| `smp7-2-m11` | SMP7-2-M11 | Uji produk oleh teman | Scratch | `DK-BK-b` | `smp7-1-m11`, `smp7-2-m7` |
| `smp7-2-m12` | SMP7-2-M12 | Menjelaskan produk: laporan dan presentasi singkat | LK/dokumen | `DK-LD-a`, `D-LD-i`, `D-LD-e` | `smp7-2-m11` |
| `smp7-2-m13` | SMP7-2-M13 | Proyek mini: game | Scratch | `D-BK-e`, `DK-BK-c`, `DK-BK-b` | `smp7-2-m8`, `smp7-2-m11` |
| `smp7-2-m14` | SMP7-2-M14 | Asesmen dan refleksi (pengayaan) | Scratch | `D-BK-e`, `DK-BK-c` | `smp7-2-m13` |
| `smp8-1-m1` | SMP8-1-M1 | Dari soal ke algoritma: pseudocode dengan kosakata terbatas | - | `D-BK-a`, `D-BK-e` | `smp7-1-m2` |
| `smp8-1-m2` | SMP8-1-M2 | Blok buatan sendiri (fungsi) | Scratch | `D-BK-e`, `DK-BK-c` | `smp7-1-m6` |
| `smp8-1-m3` | SMP8-1-M3 | Abstraksi | Scratch | `D-BK-a` | `smp8-1-m2` |
| `smp8-1-m4` | SMP8-1-M4 | Simulasi sains sederhana | Scratch | `D-BK-a`, `D-BK-e`, `DK-BK-c` | `smp8-1-m3`, `smp7-1-m9` |
| `smp8-1-m5` | SMP8-1-M5 | Matematika dengan program: bilangan, faktor, pola | Scratch | `D-BK-a` | `smp8-1-m3` |
| `smp8-1-m6` | SMP8-1-M6 | Lembar kerja: pilah, urutkan, saring data | LK | `D-BK-c`, `D-BK-d`, `D-LD-e`, `DK-BK-a` | `smp7-2-m1` |
| `smp8-1-m7` | SMP8-1-M7 | Grafik dan interpretasi data | LK | `D-BK-d`, `DK-BK-a` | `smp8-1-m6` |
| `smp8-1-m8` | SMP8-1-M8 | Prediksi dari data | LK | `D-BK-d`, `DK-BK-a` | `smp8-1-m7` |
| `smp8-1-m9` | SMP8-1-M9 | Translasi konsep ke bahasa blok lain | MakeCode | `D-BK-e` | `smp7-1-m5`, `smp7-1-m8` |
| `smp8-1-m10` | SMP8-1-M10 | Masukan dan keluaran perangkat (simulator) | MakeCode | `D-LD-f`, `D-BK-e` | `smp8-1-m9` |
| `smp8-1-m11` | SMP8-1-M11 | Proyek perangkat: alarm atau penghitung langkah (simulator; papan fisik opsional) | MakeCode | `D-BK-e`, `DK-BK-c`, `DK-BK-b` | `smp8-1-m10`, `smp7-1-m11` |
| `smp8-1-m12` | SMP8-1-M12 | Jaringan lokal, ponsel, dan internet | - (unplugged) | `D-LD-g` | `smp7-2-m10` |
| `smp8-1-m13` | SMP8-1-M13 | Proyek mini: simulasi atau perangkat lintas bidang | Scratch/MakeCode | `D-BK-a`, `DK-BK-b` | `smp8-1-m4`, `smp8-1-m11` |
| `smp8-1-m14` | SMP8-1-M14 | Asesmen dan refleksi | - | `D-BK-a`, `D-BK-d`, `DK-BK-a` | `smp8-1-m13` |
| `smp8-2-m1` | SMP8-2-M1 | Dari blok ke teks: apa yang sama, apa yang beda | Scratch dan Python | `D-BK-e` | `smp8-1-m1`, `smp8-1-m9` |
| `smp8-2-m2` | SMP8-2-M2 | Keluaran, masukan, variabel | Python | (tidak ada) | `smp8-2-m1` |
| `smp8-2-m3` | SMP8-2-M3 | Ekspresi dan tipe data (pengayaan) | Python | (tidak ada) | `smp8-2-m2` |
| `smp8-2-m4` | SMP8-2-M4 | Percabangan `if` | Python | (tidak ada) | `smp8-2-m3` |
| `smp8-2-m5` | SMP8-2-M5 | Perulangan `for` dan `while` | Python | (tidak ada) | `smp8-2-m4` |
| `smp8-2-m6` | SMP8-2-M6 | Menerjemahkan program Scratch ke Python | Python | `D-BK-e` | `smp8-2-m5` |
| `smp8-2-m7` | SMP8-2-M7 | Menggambar dengan perulangan (grafik kura-kura) | Python | `D-BK-e`, `DK-BK-c` | `smp8-2-m5` |
| `smp8-2-m8` | SMP8-2-M8 | Daftar (list) | Python | (tidak ada) | `smp8-2-m5` |
| `smp8-2-m9` | SMP8-2-M9 | Fungsi | Python | (tidak ada) | `smp8-2-m8` |
| `smp8-2-m10` | SMP8-2-M10 | Membaca pesan galat dan debugging | Python | `D-BK-a` | `smp8-2-m5` |
| `smp8-2-m11` | SMP8-2-M11 | Kata sandi, akun, dan keamanan diri; data pribadi dan kata sandi tidak ditempel ke layanan AI | - (unplugged) | `D-LD-m`, `D-LD-p` | `smp7-1-m12` |
| `smp8-2-m12` | SMP8-2-M12 | Informasi publik dan privat di media sosial | - (unplugged) | `D-LD-d`, `D-LD-o` | `smp8-2-m11` |
| `smp8-2-m13` | SMP8-2-M13 | Proyek mini: kuis teks atau gambar | Python | `DK-BK-b` | `smp8-2-m9`, `smp8-2-m10` |
| `smp8-2-m14` | SMP8-2-M14 | Asesmen dan refleksi | Python | `D-BK-a` | `smp8-2-m13` |
| `smp9-1-m1` | SMP9-1-M1 | Pemecahan masalah: tinjau ulang dan pola | - | `D-BK-a` | `smp7-1-m7`, `smp8-1-m3` |
| `smp9-1-m2` | SMP9-1-M2 | Teks (string) | Python | (tidak ada) | `smp8-2-m3` |
| `smp9-1-m3` | SMP9-1-M3 | Pasangan kunci-nilai (dictionary), pengantar | Python | (tidak ada) | `smp8-2-m8`, `smp9-1-m2` |
| `smp9-1-m4` | SMP9-1-M4 | Membaca berkas teks | Python | `D-BK-d`, `DK-BK-a` | `smp9-1-m2`, `smp8-1-m6` |
| `smp9-1-m5` | SMP9-1-M5 | Data tabel kecil: jumlah, rata-rata, terbesar | Python atau LK | `D-BK-d`, `DK-BK-a` | `smp9-1-m4` |
| `smp9-1-m6` | SMP9-1-M6 | Sumber data terbuka dan legal | LK | `D-BK-d`, `D-LD-b`, `DK-BK-a` | `smp8-1-m6` |
| `smp9-1-m7` | SMP9-1-M7 | Visualisasi sederhana | LK atau Python | `D-BK-d`, `DK-BK-a`, `D-LD-e` | `smp8-1-m7`, `smp9-1-m5` |
| `smp9-1-m8` | SMP9-1-M8 | Lebih dari satu solusi untuk satu masalah | Python | `D-BK-a` | `smp9-1-m1` |
| `smp9-1-m9` | SMP9-1-M9 | Mencari dan mengurutkan dengan kode | Python | `D-BK-a` | `smp7-2-m5`, `smp8-2-m8` |
| `smp9-1-m10` | SMP9-1-M10 | Bilangan acak dan simulasi | Python | `D-BK-a` | `smp8-2-m5` |
| `smp9-1-m11` | SMP9-1-M11 | Informasi, hoaks, dan keterbukaan informasi | - (unplugged) | `D-LD-b`, `D-LD-d` | `smp8-2-m12` |
| `smp9-1-m12` | SMP9-1-M12 | Rencana proyek akhir | LK | `DK-BK-b` | `smp8-2-m13` |
| `smp9-1-m13` | SMP9-1-M13 | Proyek mini: pengolah data kecil | Python | `D-BK-d`, `DK-BK-a`, `DK-BK-b` | `smp9-1-m4`, `smp9-1-m5` |
| `smp9-1-m14` | SMP9-1-M14 | Asesmen dan refleksi | Python | `D-BK-a`, `D-BK-d`, `DK-BK-a` | `smp9-1-m13` |
| `smp9-2-m1` | SMP9-2-M1 | Mengidentifikasi persoalan masyarakat sekitar | - | `DK-BK-b` | `smp9-1-m12` |
| `smp9-2-m2` | SMP9-2-M2 | Merancang solusi | - | `DK-BK-b`, `D-BK-a` | `smp9-2-m1` |
| `smp9-2-m3` | SMP9-2-M3 | Implementasi, tahap 1 | Scratch atau Python | `DK-BK-b`, `D-BK-e`, `DK-BK-c` | `smp9-2-m2` |
| `smp9-2-m4` | SMP9-2-M4 | Implementasi, tahap 2 | Scratch atau Python | `DK-BK-b` | `smp9-2-m3` |
| `smp9-2-m5` | SMP9-2-M5 | Pengujian dengan pengguna | - | `DK-BK-b` | `smp9-2-m4` |
| `smp9-2-m6` | SMP9-2-M6 | Penyempurnaan | Scratch atau Python | `DK-BK-b` | `smp9-2-m5` |
| `smp9-2-m7` | SMP9-2-M7 | Laporan dan presentasi | Dokumen | `DK-LD-a`, `D-LD-i`, `D-LD-e` | `smp9-2-m6` |
| `smp9-2-m8` | SMP9-2-M8 | Pengantar kecerdasan artifisial: penginderaan dan sensor | - (unplugged) | `DK-EA-b` | `smp7-2-m10` |
| `smp9-2-m9` | SMP9-2-M9 | Mesin belajar dari contoh dan kualitas data | - (unplugged) | `DK-EA-c` | `smp9-2-m8`, `smp9-1-m6` |
| `smp9-2-m10` | SMP9-2-M10 | Etika AI: keliru, bias, halusinasi, tiruan palsu (deep fake), ketergantungan, mengalihkan pekerjaan berpikir ke AI | - (unplugged) | `DK-EA-e`, `DK-EA-f`, `DK-EA-g` | `smp9-2-m9`, `smp9-1-m11`, `smp8-2-m11` |
| `smp9-2-m11` | SMP9-2-M11 | Jembatan ke SMA: membaca kode bahasa lain | Python dan teks | `D-BK-e` | `smp9-1-m9` |
| `smp9-2-m12` | SMP9-2-M12 | Pameran produk | - | `DK-LD-a`, `D-LD-i` | `smp9-2-m7` |
| `smp9-2-m13` | SMP9-2-M13 | Portofolio dan refleksi | - | `DK-LD-a`, `D-LD-i` | `smp9-2-m12` |
| `smp9-2-m14` | SMP9-2-M14 | Asesmen akhir | Python atau Scratch | `DK-BK-b` | `smp9-2-m13` |

### 3.1 Ringkasan angka

| Butir | Nilai (diperiksa terhadap `weeks.json`) |
| --- | --- |
| Modul | 84 (6 semester x 14 minggu) |
| Modul tanpa CP diklaim | 10: `smp7-2-m2`, `smp7-2-m3`, `smp8-2-m2`, `smp8-2-m3`, `smp8-2-m4`, `smp8-2-m5`, `smp8-2-m8`, `smp8-2-m9`, `smp9-1-m2`, `smp9-1-m3` |
| Minggu bertanda pengayaan di corpus | 4: `smp7-2-m2`, `smp7-2-m3`, `smp7-2-m14`, `smp8-2-m3` (dua yang terakhir tetap punya `cpCodes`; aturan kontrak: `cpCodes` diambil dari corpus apa adanya) |
| Jenis kegiatan (kolom alat, tertulis persis) | Scratch 24, Python 19, tanpa alat atau *unplugged* 21 (`- (unplugged)` 13 dan `-` 8), lembar kerja `LK` 5, MakeCode 3, dan 12 minggu bertuliskan gabungan (mis. `Scratch atau Python`, `Python atau LK`, `Dokumen`) |
| Modul dengan contoh C++ | Paling banyak satu: `smp9-2-m11` (kode bahasa lain hanya **dibaca**). |

### 3.2 Cara menyusun prasyarat

1. Bawaan: minggu sebelumnya dalam semester yang sama.
2. Diganti dengan modul yang benar-benar menjadi dasar konsep (mis. `smp7-1-m8`
   percabangan bergantung pada `smp7-1-m5` perulangan, bukan pada `m7`).
3. Awal semester menaut ke modul semester sebelumnya yang menjadi dasarnya,
   bukan ke minggu asesmen.
4. Semua modul asesmen dan refleksi (`m14`) dan proyek mini (`m13`) bergantung
   pada modul yang dinilai, bukan pada seluruh semester.
5. Tidak ada daur: setiap prasyarat memiliki urutan lebih awal (diperiksa
   skrip saat tabel dibangkitkan).

## 4. Templat modul berbasis bukti

Setiap modul memakai bagian berikut **dengan judul persis begini dan urutan
ini**. Judul `## Untuk siapa modul ini`, `## Latihan`, `## Kesalahan umum`,
`## Cek mandiri`, `## Langkah berikutnya`, dan `## Catatan untuk guru` sudah
dipakai seri `sma-coding`; judul lainnya adalah standar baru yang diusulkan
bersama oleh ketiga program.

| # | Judul bagian | Isi | Label | Dasar dan batasnya |
| --- | --- | --- | --- | --- |
| 0 | Judul `# ...` dan spanduk | Judul = topik minggu di corpus; spanduk "DRAF — belum ditinjau" (ADR-0007). | (aturan) | ADR-0007. |
| 1 | `## Untuk siapa modul ini` | Kelas, minggu, alat, waktu, prasyarat dalam bahasa murid. | `M` | Orientasi; bukan temuan riset. |
| 2 | `## Ingat kembali` | Tiga sampai lima pertanyaan **tanpa melihat catatan**: satu dari minggu lalu, satu dari beberapa minggu lalu, satu dari semester lalu. Jarak bertambah sepanjang semester. Modul pertama: ingatan sehari-hari, bukan materi kelas. | `K` prinsip; `M` untuk pemrograman | Riset 3.1 (`[A]`; bukti langsung efek uji pada keterampilan pemrograman belum dibuka) dan 3.2 (`[A]`; jarak optimal terbukti pada materi fakta). |
| 3 | `## Tujuan` | Dua sampai empat kalimat "kamu dapat ..." yang dapat diuji. | `M` | Riset 3.9: kinerja saat latihan bukan ukuran belajar, jadi tujuan dibuat bisa dites di "Cek mandiri". |
| 4 | `## Prediksi dulu` | PRIMM *Predict, Run, Investigate*: murid menulis prediksi hasil program atau instruksi **sebelum** menjalankan, lalu menjalankan dan menyelidiki. Pada kode: tabel penelusuran (*trace*) variabel. | `K` (usia 11 sampai 14); penelusuran `K` | Sentance dkk. (2019) `[C]`, 493 murid usia 11 sampai 14, bukan RCT (riset 6.3); penelusuran dan mesin konseptual (Lister dkk., 2004; Sorva, 2013; riset 6.2). |
| 5 | `## Contoh terselesaikan` | Satu contoh lengkap dengan alasan tiap langkah; sertakan diagram atau tabel penelusuran di samping teks. | `K` | Contoh terselesaikan untuk pemula `[B]` (riset 3.4); dua kanal, gambar dan kata (*dual coding*; riset 3.7 `[D]`). Bukti contoh terkuat dari aljabar dan geometri. |
| 6 | `## Contoh setengah jadi` | Contoh serupa dengan satu sampai tiga bagian dikosongkan (*fading*); makin akhir semester, makin banyak yang dikosongkan. | `M` untuk pemrograman | Riset 3.4 (*fading*) dan 6.3 (Xie dkk., 2019, studi eksploratori). |
| 7 | `## Susun urutannya` | Soal Parsons: kartu atau baris acak yang disusun murid. Dipakai di modul berkode atau berurutan (blok, pseudocode, Python); dilewati (dengan satu kalimat alasan) bila tidak relevan. | `M` | Ericson dkk. (2017) `[C]`: lebih **efisien**, hasil belajar tidak berbeda nyata (riset 6.3). Jadi alasan memakainya adalah efisiensi, bukan keunggulan belajar. |
| 8 | `## Latihan` | Tiga sampai lima tugas bertingkat sesuai urutan PRIMM: **Ubah** (modifikasi) lalu **Buat**; satu tugas "Jelaskan dengan kata sendiri". Umpan balik berisi (apa langkah berikutnya), kunci petunjuk bertahap di bagian guru. | `K` bimbingan; `M` PRIMM *Modify/Make* | Bimbingan lebih baik daripada penemuan tanpa bantuan (Alfieri dkk., 2011, `[A]`; riset 3.5); umpan balik berisi (riset 3.8, `[A]`, sangat heterogen). Untuk usia muda, instruksi lebih dulu (Sinha dan Kapur, 2021; riset 3.5, 7). |
| 9 | `## Latihan bercampur` | Dua soal yang mencampur topik modul ini dengan modul sebelumnya (mis. perulangan dan percabangan). **Bukan** untuk perkenalan pertama sebuah konsep: modul pertama tiap konsep menuliskan satu kalimat bahwa latihan bercampur dimulai di modul berikutnya. | `K` prinsip (sedang, bergantung materi) | Brunmair dan Richter (2019) `[A]`: g = 0,42 secara umum, dan untuk matematika 0,34; interleaving paling tepat untuk membedakan jenis masalah (riset 3.3). |
| 10 | `## Ulang berjarak` | Jadwal pendek untuk **mengerjakan ulang tanpa melihat**: satu minggu, sekitar satu bulan, dan akhir semester; tiap butir menyebut modul tempat konsep itu dipakai lagi. | `K` | Cepeda dkk. (2006, 2008) `[A]`/`[C]` (riset 3.2); *re-solve* sebagai padanan uji mengingat untuk keterampilan (riset 3.1, `[inferensi]`). |
| 11 | `## Kesalahan umum` | Tiga sampai lima miskonsepsi yang diketahui, masing-masing dengan cara mengenalinya. | `M` | Kesulitan dan miskonsepsi pemula terdokumentasi (Qian dan Lehman, 2017, `[A]`; riset 6.1); isi daftar per modul adalah penilaian penulis. |
| 12 | `## Cek mandiri` | Pertanyaan **mengingat** yang dijawab sebelum melihat kunci, plus daftar periksa kosong. Formulir kosong; tidak dikumpulkan (ADR-0007, ADR-0004). | `K` (uji latihan) | Roediger dan Karpicke (2006) `[C]`; Adesope dkk. (2017) `[A]` (riset 3.1). Penilaian diri lancar bukan bukti menguasai (riset 3.9). |
| 13 | `## Langkah berikutnya` | Satu paragraf: modul berikutnya dan hubungannya. | `M` | Koherensi urutan; bukan temuan. |
| 14 | `## Catatan untuk guru` | Waktu, bahan, kunci, petunjuk bertahap, kebijakan AI dan privasi, butir CP yang dikaitkan, alat bantu penilaian. | `M` | Konvensi seri `sma-coding`. |
| 15 | `## Rujukan` | Daftar rujukan bagian 5. | (aturan) | ADR-0007: setiap modul memuat rujukan. |

### 4.1 Penyesuaian per jenjang (SMP)

| Hal | Aturan untuk `smp-coding` | Label dan dasar |
| --- | --- | --- |
| Kerangka kegiatan | **PRIMM** (*Predict, Run, Investigate, Modify, Make*) mengatur urutan "Prediksi dulu" sampai "Latihan". | `K` untuk usia 11 sampai 14 (Sentance dkk., 2019; riset 6.3, 7, 8.4), tetapi bukti tingkat sedang dan bukan RCT. |
| Urutan blok ke teks | Modul `smp8-2-m1` dan `smp8-2-m6` **menyebut pertukarannya** kepada murid: blok lebih besar kenaikan belajar dan minat, tetapi teks terasa lebih mirip pemrogram sungguhan (Weintrop dan Wilensky, 2017). Python di SMP adalah pengayaan di luar CP (silabus README), jadi murid yang tidak berminat tidak dirugikan. | `M` (riset 6.4, 8.4); bukti dari SMA, lima minggu, kuasi-eksperimen. |
| Usia dan urutan | Contoh lebih dulu, baru soal bagi murid yang pemula; kegagalan produktif hanya dengan bimbingan. | `M` untuk SMP (riset 3.5 dan 7: arah efek terbalik hanya dilaporkan untuk kelas 2 sampai 5). |
| Berpasangan | Boleh sebagai kegiatan kelas pada "Prediksi dulu" dan "Latihan"; **tidak** dijanjikan berefek. | `M` (bukti terkuat dari mahasiswa, Hanks dkk., 2011; riset 6.4). |
| Kebijakan AI | Mengikuti silabus bagian 7.1: **demonstrasi guru, tanpa akun murid**; murid tidak memakai AI generatif untuk tugas; asesmen tanpa AI; data pribadi dan kata sandi tidak ditempel ke layanan AI (`smp8-2-m11`); pembahasan keliru, bias, halusinasi, tiruan palsu, ketergantungan, dan mengalihkan pekerjaan berpikir tanpa perangkat (`smp9-2-m10`). Tidak ada petunjuk "tanyakan ke AI" di modul mana pun. | Keputusan pemilik 2026-11-19 (silabus 7.1); bukti pelajar SMP tidak ada dari Indonesia (AI 4.5, 6; `[inferensi]`). |
| Privasi | Semua contoh data sintetis dan jelas palsu ("Murid-01"); tanpa nama lengkap, sekolah nyata, foto, atau lokasi; berbagi karya mengikuti aturan silabus bagian 7. | ADR-0004. |
| Tidur dan beban | Tidak ada klaim kesehatan dalam modul; tidak ada "belajar semalaman". | Riset 3.11 hanya korelasional modest (`M`). |
| Motivasi | Tidak memakai ceramah *growth mindset* sebagai unsur inti. | Riset 3.10: bukti lemah dan diperdebatkan. |

### 4.2 Varian templat menurut jenis minggu

| Jenis minggu | Contoh | Penyesuaian |
| --- | --- | --- |
| *Unplugged* (tanpa alat) | `smp7-1-m1`, `smp7-2-m5`, `smp9-2-m8` | Prediksi dengan kartu atau permainan peran; tabel penelusuran di kertas; "Susun urutannya" dengan kartu fisik. Pilot memakai varian ini. |
| Scratch | `smp7-1-m3` sampai `m11` | Blok ditulis dengan **notasi blok teks** (bagian 7, Q1), bukan gambar; satu program per bagian; tabel penelusuran variabel dan posisi sprite. |
| MakeCode (simulator) | `smp8-1-m9` sampai `m11` | Sama dengan Scratch; papan fisik opsional hanya catatan guru. |
| Lembar kerja atau dokumen | `smp8-1-m6`, `m7`, `smp9-1-m6` | Contoh data sintetis; langkah ditulis bebas-alat (tanpa nama produk) dan dicek terhadap dokumentasi resmi bila memakai satu alat. |
| Python | minggu berjenis Python dari `smp8-2-m1` sampai `smp9-2-m14` (lihat kolom Alat) | Potongan kode ```` ```python ````, ditandai jelas sebagai Python; penulis **menjalankan** tiap contoh (bagian 4.3). Tanpa pustaka di luar pustaka standar kecuali silabus menyebut. |
| Literasi, etika, dan keamanan | `smp7-1-m12`, `smp8-2-m11`, `smp8-2-m12`, `smp9-1-m11`, `smp9-2-m10` | Kasus rekaan sintetis; murid menimbang pilihan; "Prediksi dulu" berbentuk "apa yang akan terjadi bila ...". Tanpa klaim hukum yang tidak dibuka sumbernya. |
| Proyek mini dan proyek akhir | `m13` setiap semester, `smp9-2-m1` sampai `m7` | Ringkas: ingat kembali dan ulang berjarak diperkuat, contoh terselesaikan diganti **contoh rencana kerja**, dan "Susun urutannya" dilewati. |
| Asesmen dan refleksi | `m14` setiap semester, `smp9-2-m14` | Lihat bagian 7, Q2: dirancang sebagai **kuis pengingat berjarak** tanpa AI, bukan ceramah; refleksi diisi murid sendiri. |

### 4.3 Aturan contoh kode

- **C++** (hanya bila modul memuatnya, praktis `smp9-2-m11`): setiap blok
  ```` ```cpp ```` harus lolos `bun run check:module-code` (g++ C++17,
  `-fsyntax-only`). Penulis juga **mengompilasi dan menjalankannya** di folder
  sementara dan mencatat keluarannya dalam laporan, karena pemeriksaan resmi
  hanya sintaks.
- **Python**: blok ```` ```python ```` dijalankan penulis dengan `python3` pada
  versi yang dicatat di laporan; keluaran yang ditulis di modul harus sama
  dengan keluaran sebenarnya. Pemeriksaan otomatis untuk Python **belum ada**
  di repositori (bagian 7, Q3).
- **Blok Scratch dan MakeCode**: ditulis sebagai notasi teks (` ```text `),
  bukan kode yang dijalankan mesin; satu baris satu blok, indentasi untuk blok
  di dalam blok. Penulis menelusuri tangan hasilnya.
- **Bahasa lain**: ditandai di baris pembuka blok (mis. "Pseudocode:"), tidak
  diklaim lolos pemeriksaan mesin.
- **Data**: sintetis, jelas palsu, dibangkitkan dengan benih tercatat bila
  berupa berkas; tanpa nama atau sekolah nyata (ADR-0004).

### 4.4 Panjang modul

Sasaran **700 sampai 1100 kata per modul** (hitung dengan `wc -w` pada tubuh
modul tanpa "Catatan untuk guru" dan "Rujukan"; tabel ikut dihitung). Pilot
`smp7-1-m1` bertubuh sekitar 1150 kata menurut hitungan itu karena tabel
penelusuran; artinya batas atas realistis untuk modul berkode atau bertabel
sekitar 1200 kata, dan penulis tidak boleh memangkas "Ingat kembali" atau
"Ulang berjarak" demi panjang. Modul proyek dan asesmen boleh lebih pendek
(sekitar 500 kata).

### 4.5 Istilah baku

Istilah mengikuti silabus: perulangan, percabangan (kondisi), variabel, daftar
(*list*), galat, fungsi (blok buatan sendiri), *pseudocode*, penelusuran
(*trace*). Kata ganti "kamu"; tanpa gurauan yang bergantung pada budaya populer
tertentu. Tidak memakai klaim "gaya belajar", "otak kiri atau kanan", atau
persentase retensi tetap (riset bagian 5).

## 5. Aturan rujukan

Rujukan adalah **sumber resmi atau yang terverifikasi** dan dibuka penulis
sendiri; tiap modul mencantumkan judul, penerbit, tahun, alamat `https`, dan
tanggal dibuka (dalam laporan penulis, bukan di modul). Yang tidak terbuka
ditandai `[belum terverifikasi]` dan **tidak dipakai sebagai dasar klaim**.

| Keperluan | Sumber yang boleh | Catatan |
| --- | --- | --- |
| CP dan tujuan | *Panduan Mata Pelajaran Informatika, Fase D – F*, BSKAP, 2025: `https://repositori.kemendikdasmen.go.id/33634/1/32.%20Panduan%20Mata%20Pelajaran%20Informatika.pdf` (terverifikasi, README program) | CP Koding dan KA dari SK 046/H/KR/2025: dikutip dengan nomor dan judul **tanpa tautan**, karena alamat asli salinan itu belum terverifikasi (README program, `riset.md` bagian 2). |
| Python | Dokumentasi resmi: `https://docs.python.org/3/` (tutorial dan referensi pustaka standar) | Halaman yang dipakai dibuka dan dicatat. |
| Scratch dan MakeCode | Situs resmi: `https://scratch.mit.edu/about`, `https://makecode.microbit.org/about`, `https://microbit.org/get-started/user-guide/overview/` | Wiki komunitas tidak dipakai sebagai sumber klaim. |
| Lembar kerja dan dokumen | Dokumentasi resmi alat yang dipilih (mis. LibreOffice: `https://documentation.libreoffice.org/` dan `https://help.libreoffice.org/`) | Pilihan alat per modul mengikuti silabus bagian 9; langkah dicek terhadap dokumentasi. |
| C++ | `https://isocpp.org/` untuk rujukan umum; perilaku `g++` dicek dengan menjalankannya | Hanya `smp9-2-m11`. |
| AI dan etika | Rujukan terverifikasi di riset AI bagian 9.3 (mis. UNESCO *Guidance for generative AI in education and research*, SE Menteri Kominfo 9/2023 di JDIH Komdigi) | Teks yang tidak dibuka penuh tidak dikutip isinya. |
| Bukti belajar | [`ilmu-belajar-kognitif.md`](../../riset/ilmu-belajar-kognitif.md) dan [`ai-rekayasa-perangkat-lunak.md`](../../riset/ai-rekayasa-perangkat-lunak.md) | Tidak mengutip angka di modul murid; bukti berada di catatan guru. |

Larangan: **tidak menyalin soal** dari kompetisi, buku, atau situs mana pun
(ADR-0007, bagian "Copyright"). Soal latihan ditulis sendiri dan disintesis
dari konsep minggu itu; soal Bebras, OSN, atau lomba lain hanya **ditautkan**
bila alamat resminya dibuka (OSN: `https://osn.toki.id/`; kompetisi lain
`[belum terverifikasi]`). Tidak menyalin teks dari situs berita atau blog.
Tidak ada gambar dengan lisensi yang belum diperiksa; modul tidak membawa
gambar (bagian 7, Q1).

## 6. Gelombang penulisan dan gerbang mutu

### 6.1 Pembagian

Satu agen pelaksana (`pelaksana-kompleks`, model menengah) menulis sekitar
**tujuh modul** berurutan; 84 modul menjadi **12 paket**. Paket dikelompokkan
menjadi **empat gelombang** menurut ketergantungan konsep:

| Gelombang | Paket (modul) | Agen paralel | Alasan |
| --- | --- | --- | --- |
| 0 (orchestrator, bukan agen penulis) | Skema indeks selesai dan digabung; glosarium istilah (bagian 4.5); pilot disetujui | 0 | Tanpa skema, indeks tidak bisa diisi; pilot menjadi acuan gaya. |
| 1 | S01 `smp7-1-m1`..`m7`; S02 `smp7-1-m8`..`m14` | 2 | Fondasi: unplugged dan Scratch awal; hasilnya mengkalibrasi gaya. |
| 2 | S03 `smp7-2-m1`..`m7`; S04 `smp7-2-m8`..`m14`; S05 `smp8-1-m1`..`m7`; S06 `smp8-1-m8`..`m14` | 4 | Data, game, abstraksi, MakeCode. |
| 3 | S07 `smp8-2-m1`..`m7`; S08 `smp8-2-m8`..`m14`; S09 `smp9-1-m1`..`m7`; S10 `smp9-1-m8`..`m14` | 4 | Python: perlu aturan verifikasi kode (Q3) sebelum gelombang ini. |
| 4 | S11 `smp9-2-m1`..`m7`; S12 `smp9-2-m8`..`m14` | 2 | Proyek akhir, literasi AI (termasuk `smp9-2-m10`, `m11`). |

Satu gelombang baru dimulai setelah gelombang sebelumnya lolos gerbang mutu.
Paralelisme hanya dalam satu gelombang karena tiap agen menulis berkas berbeda
(`content/smp-coding/modules/<id>.md` untuk id miliknya) dan tidak menyentuh
berkas bersama.

### 6.2 Aturan isolasi

- Agen hanya membuat berkas `content/smp-coding/modules/<id>.md` untuk id
  paketnya. **Tidak** menyunting `data/smp-coding/modules.json`, corpus,
  silabus, atau modul agen lain.
- Perbedaan antar-modul (istilah, gaya) dicatat sebagai temuan dan diselesaikan
  orchestrator, bukan oleh agen yang menemukannya.
- Satu issue per gelombang (alur *atomic-issue* di `AGENTS.md`); satu commit per
  paket; tanpa `push` oleh agen.
- Pengisian indeks dan kode `weekCodes`/`cpCodes` hanya oleh orchestrator,
  bersama pemeriksaan `bun run validate --program smp-coding`.

### 6.3 Gerbang mutu (tiap modul dan tiap gelombang)

| Gerbang | Pemeriksaan | Cara |
| --- | --- | --- |
| G1 Struktur | Semua judul bagian bagian 4 ada dan berurutan; spanduk `DRAF`; panjang dalam rentang | Skrip pengecek judul dan `wc -w`; ditunjukkan di laporan |
| G2 CP | Hanya butir CP yang ada di kolom "CP diklaim"; tidak ada kata "terpenuhi" atau "tercapai" untuk CP; modul tanpa CP tidak menyebut CP | Pencarian teks dan pencocokan tabel bagian 3 |
| G3 Pedagogi | Ada prediksi sebelum menjalankan; "Ingat kembali" berisi 3 sampai 5 pertanyaan berjarak; ada contoh lengkap lalu setengah jadi; Parsons pada modul berurutan; latihan bercampur tidak di perkenalan konsep; ulang berjarak menyebut modul tujuan | Daftar periksa penulis dan peninjau |
| G4 Akurasi | C++ lolos `check:module-code` dan dijalankan; Python dijalankan dan keluarannya cocok; tiap angka dan klaim punya rujukan yang dibuka | Berkas log verifikasi pada laporan agen |
| G5 AI dan privasi | Tanpa petunjuk memakai AI; kebijakan AI dan privasi di catatan guru; data sintetis; `bun run privacy-check` bersih | Pencarian teks dan `privacy-check` |
| G6 Orisinalitas | Tidak ada soal atau teks salinan; semua tautan `https` resmi dan dibuka | Peninjau membuka sampel tautan |
| G7 Tinjauan independen | Agen tinjau lain (bukan penulis), berpegang pada daftar G1–G6 dan tidak melihat kesimpulan penulis; orchestrator memeriksa sampel (sekitar satu dari lima) | Laporan tinjau |
| G8 Status | Semua modul berstatus `draf`; tidak ada `disetujui` | Pemeriksaan indeks; persetujuan hanya oleh pemilik (ADR-0007) |

Gerbang gelombang: `bun run format:check`, `bun run lint`, `bun run assist:check`,
`bun run typecheck`, `bun test`, `bun run validate`, `bun run privacy-check`,
`bun run check:module-code`, dan `bun run check:fidelity` bila corpus tersentuh
(AGENTS.md). Perubahan isi modul adalah konten karangan, jadi tidak memerlukan
*syllabus check*; perubahan butir CP atau topik minggu **memerlukannya** dan
bukan wewenang modul.

## 7. Pertanyaan keputusan untuk pemilik

Hanya orchestrator yang menyajikan ini ke pemilik (dialog pilihan baku).
Rekomendasi di urutan pertama.

**Q1. Bagaimana modul menampilkan program Scratch dan MakeCode?**

| Opsi | Konsekuensi |
| --- | --- |
| **A. Notasi blok teks dan tabel penelusuran, tanpa gambar atau berkas biner (Disarankan)** | Aman dari soal lisensi gambar; mudah ditinjau dan diperiksa selisihnya; satu kanal verbal dan tabel, kurang visual dibanding gambar (riset 3.7, `[D]`) |
| B. Tangkapan layar blok | Lebih visual; **lisensi tangkapan dan status editor belum terverifikasi** (repositori `scratch-gui` diarsipkan 10 Juni 2026 menurut silabus 9.2); berkas biner sukar ditinjau |
| C. Berkas proyek `.sb3` dan MakeCode terlampir | Bisa dijalankan murid; format biner, tidak bisa diperiksa mesin repositori, ketergantungan pada ketersediaan alat |

**Q2. Bagaimana bentuk modul minggu `m14` (asesmen dan refleksi), dan `m13` (proyek mini)?**

| Opsi | Konsekuensi |
| --- | --- |
| **A. Templat sama dengan pengayaan: `m14` menjadi kuis pengingat berjarak lintas semester tanpa AI; `m13` memakai contoh rencana kerja (Disarankan)** | Sejalan dengan asesmen sebagai uji mengingat berjarak (riset 8.2, celah formatif); penulis harus menyusun soal bank yang baru; panjang sekitar 500 kata |
| B. Templat ringkas: hanya pengantar dan lembar refleksi kosong | Paling murah ditulis; kehilangan kesempatan ulang berjarak formal; asesmen bergantung guru |
| C. Dilewati (tidak dibuat modul untuk `m13` dan `m14`) | Tidak cocok dengan keputusan "84 modul"; modul jadi 56; perlu mengubah keputusan pemilik |

**Q3. Bagaimana memastikan contoh Python benar (19 minggu murni Python dan 8 minggu campuran Python)?**

| Opsi | Konsekuensi |
| --- | --- |
| **A. Penulis menjalankan tiap contoh dan mencatat versi dan keluaran di laporan; buka issue terpisah untuk skrip `check:module-python` (Disarankan)** | Tidak menunda gelombang 1 dan 2; kebenaran bergantung disiplin penulis sampai skrip ada; memerlukan satu issue tambahan |
| B. Skrip pemeriksa Python dibuat **sebelum** gelombang 3 | Pemeriksaan otomatis seperti C++; gelombang 3 tertunda dan perlu PR di luar scope dokumen ini |
| C. Tanpa pemeriksaan mesin, hanya tinjauan manusia | Tercepat; risiko contoh salah lolos ke murid |

## 8. Pilot

Modul contoh lengkap untuk satuan pertama:
[`rancangan-modul-contoh/smp7-1-m1.md`](rancangan-modul-contoh/smp7-1-m1.md)
(varian *unplugged*, `cpCodes` = `D-BK-a`). Karena minggu itu tanpa kode, tidak
ada contoh C++ untuk dikompilasi; verifikasi yang berlaku adalah panjang,
judul bagian, dan tidak adanya klaim CP berlebih. Keluaran verifikasi ada di
laporan penyusun (bukan di repositori).

## 9. Keputusan rancangan penyusun dan temuan

| Butir | Keputusan atau temuan | Status |
| --- | --- | --- |
| Prasyarat 84 modul | Disusun penyusun; murid boleh melompati asal lolos "Cek mandiri" | `[asumsi]` |
| Bagian "Contoh setengah jadi" dan "Susun urutannya" sebagai dua judul terpisah | Dibuat terpisah agar Parsons dapat dilewati tanpa merusak urutan judul | `[asumsi]` |
| Pengayaan Python tidak mengklaim CP | Mengikuti corpus dan silabus README | Sesuai keputusan pemilik |
| Dokumen basi bila rancangan disetujui | `README.md` program (bagian "Pekerjaan lanjutan" menyebut modul belum ada) dan `docs/programs/README.md` (bila memuat status modul) perlu diperbarui oleh orchestrator; AGENTS.md tabel `content/` perlu menyebut `smp-coding` setelah modul pertama masuk | Catatan untuk orchestrator |
| Temuan di luar scope | `check:module-code` hanya mengompilasi blok `cpp`; belum ada pemeriksaan Python, SQL, atau TypeScript | Lihat Q3 |
| Temuan di luar scope | Tabel pemetaan memakai `kode_minggu` huruf kecil sebagai `id`; bila skema indeks memilih format lain (mis. memisahkan semester dan minggu), kolom `id` perlu disesuaikan | Menunggu skema |

## Changelog

| Versi | Tanggal | Perubahan |
| --- | --- | --- |
| v0.1.0 | 2026-11-19 | Dokumen pertama: pemetaan 84 modul, templat berbasis bukti, aturan rujukan, gelombang penulisan dan gerbang mutu, tiga pertanyaan keputusan, dan pilot `smp7-1-m1`. |
| v0.1.1 | 2026-11-19 | Sinkron dokumen (#124): catatan status; 84 modul kini ada di `content/smp-coding/` dan terindeks; pemeriksa Python sudah ada; pilot menjadi riwayat. Isi rancangan tidak berubah. |
