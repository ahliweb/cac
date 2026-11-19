## Untuk siapa modul ini

Modul ini untuk jalur **pekerja** (`PKJ`), 5 jam, sesudah `DW-PKJ-M1`. Alatnya LibreOffice Calc (lembar kerja bebas, lisensi MPL 2.0). Rumus ditulis dengan **titik koma** sebagai pemisah argumen, yang diterima LibreOffice apa pun bahasa antarmukanya. Semua rumus di modul ini dicoba di LibreOffice 24.2.7.2 dengan pengaturan bawaan; di versi atau pengaturan lain hasilnya dapat berbeda, jadi cocokkan dengan hasil yang tertulis. Estimasi dua sesi `[asumsi]`.

Data pada modul ini **sintetis**, ditulis tangan sebagai tabel tetap (tanpa benih acak). Jangan memakai berkas kerja nyata; pindahkan keterampilannya ke kantor Anda sesuai kebijakan kantor.

## Cek awal pengalaman

Jawab tanpa melihat apa pun, lalu cocokkan dengan kunci. Skor tidak dicatat.

1. Apa fungsi `TRIM`?
2. Apa arti tanda `$` pada `$A$2`?
3. Apa yang ditampilkan `VLOOKUP` bila nilai yang dicari tidak ada, dan fungsi apa yang dapat membungkusnya?
4. Mengapa tanggal yang berupa teks `05/03/2026` bermasalah bila diurutkan atau dihitung?
5. Tulis rumus yang menghasilkan "besar" bila `A2` bernilai 100 atau lebih, dan "kecil" bila tidak.

Bila kelimanya benar, Anda boleh melewati "Contoh terselesaikan" dan "Contoh setengah jadi" dan langsung ke "Latihan".

## Ingat kembali

Tanpa melihat modul sebelumnya, tulis jawaban singkat.

1. (`DW-PKJ-M1`) Sebutkan tiga ciri tugas yang layak diotomasi.
2. (`DW-FND-M1`) Apa beda data nyata dan data sintetis, dan mengapa latihan hanya memakai yang kedua?
3. (`DW-FND-M1`) Sebutkan satu hal yang tidak boleh ada di berkas kode.

Cocokkan: (1) berulang, aturan tegas, volume cukup; (2) data sintetis jelas palsu sehingga tidak membawa data pribadi atau rahasia usaha; (3) kata sandi, kunci, atau token.

## Tujuan

Setelah modul ini Anda dapat memakai rumus pencarian, kondisi, teks, dan tanggal, serta membersihkan data kotor sintetis.

## Prediksi dulu

Pada tabel di bagian berikut, sel `B2` berisi "alat-tulis" dengan spasi di depan dan di belakang. Sebelum membaca, tulis prediksi Anda:

1. Hasil `=LOWER(TRIM(B2))`.
2. Hasil `VLOOKUP` untuk "makanan" pada tabel acuan yang hanya memuat "alat-tulis" dan "minuman".
3. Berapa baris yang akan tertandai "duplikat" bila `F-002` muncul dua kali?

## Contoh terselesaikan

### Data kotor dan tabel acuan

Letakkan data di `A1:D7` (semua sel berformat **Teks**, supaya LibreOffice tidak mengubahnya menjadi tanggal) dan tabel acuan di `L1:M3`. Kolom `E` sampai `J` akan diisi rumus.

| id | kategori | tanggal | nilai |
| --- | --- | --- | --- |
| F-001 | alat-tulis (spasi di awal dan akhir) | 05/03/2026 | Rp 125.000 |
| F-002 | MINUMAN | 12/03/2026 | Rp 80.500 |
| F-003 | Alat-Tulis | 19/03/2026 | Rp 42.000 |
| F-004 | minuman (spasi di akhir) | 26/03/2026 | Rp 215.000 |
| F-005 | makanan | 02/04/2026 | Rp 60.000 |
| F-002 | MINUMAN | 12/03/2026 | Rp 80.500 |

Tabel acuan: `L2` "alat-tulis", `M2` "Gudang A"; `L3` "minuman", `M3` "Gudang B". Masalahnya: spasi berlebih, huruf besar-kecil campur, tanggal sebagai teks urutan hari-bulan-tahun, nilai sebagai teks berawalan "Rp" dan titik ribuan, satu kode ganda, dan satu kategori yang tidak punya acuan.

### Rumus pembersihan (dicoba di LibreOffice 24.2.7.2)

Tulis rumus di baris 2, lalu salin ke baris 3 sampai 7.

| Kolom | Rumus pada baris 2 | Tujuan | Hasil baris 2 |
| --- | --- | --- | --- |
| `E` | `=LOWER(TRIM(B2))` | teks: buang spasi, seragamkan huruf | `alat-tulis` |
| `F` | `=DATE(VALUE(RIGHT(C2;4));VALUE(MID(C2;4;2));VALUE(LEFT(C2;2)))` | tanggal: susun dari tahun, bulan, hari | tanggal 5 Maret 2026 |
| `G` | `=VALUE(SUBSTITUTE(SUBSTITUTE(D2;"Rp ";"");".";""))` | buang "Rp " dan titik, ubah jadi angka | `125000` |
| `H` | `=IFERROR(VLOOKUP(E2;$L$2:$M$3;2;0);"tidak ditemukan")` | pencarian: ambil gudang dari tabel acuan | `Gudang A` |
| `I` | `=IF(G2>=100000;"besar";"kecil")` | kondisi | `besar` |
| `J` | `=IF(COUNTIF($A$2:A2;A2)>1;"duplikat";"ok")` | tandai kemunculan kedua dan seterusnya | `ok` |

Cara membacanya. `TRIM` membuang spasi di awal dan akhir dan menyatukan spasi ganda. Pada `F`, teks `05/03/2026` dipotong menjadi hari, bulan, tahun, diubah ke angka, lalu `DATE` menyusun tanggal sungguhan; Anda dapat memeriksa dengan `=MONTH(F2)` (hasil 3) dan `=DAY(F2)` (hasil 5), lalu mengatur tampilan sel ke `YYYY-MM-DD`. Angka `0` pada `VLOOKUP` berarti pencocokan tepat; tanpanya hasilnya bisa menyesatkan pada data yang tidak berurutan. Bila tidak ada kecocokan, `VLOOKUP` menghasilkan `#N/A`, dan `IFERROR` menggantinya dengan teks Anda (baris `F-005` menjadi `tidak ditemukan`). Rentang `$A$2:A2` pada `J` **memanjang** saat disalin, sehingga hanya baris yang sudah pernah muncul di atasnya yang dihitung: hanya `F-002` yang kedua bertanda `duplikat`. Bila `$A$7` dipakai alih-alih `A2` di ujung rentang, kedua baris `F-002` sama-sama bertanda duplikat dan tidak ada yang tersisa saat Anda menyaring `ok`.

Ringkasan di sel bebas (hasil dicoba): `=SUMIF($E$2:$E$7;"minuman";$G$2:$G$7)` menghasilkan `376000`; `=SUM($G$2:$G$7)` menghasilkan `603000`; `=SUMIFS($G$2:$G$7;$E$2:$E$7;"minuman";$J$2:$J$7;"ok")` menghasilkan `295500`, yaitu minuman tanpa baris ganda; `=COUNTIF($J$2:$J$7;"duplikat")` menghasilkan `1`. Selisih `376000` dan `295500` adalah nilai baris ganda, `80500`.

Dokumentasi resmi fungsi: [fungsi teks](https://help.libreoffice.org/latest/en-US/text/scalc/01/04060110.html), [fungsi tanggal dan waktu](https://help.libreoffice.org/latest/en-US/text/scalc/01/04060102.html), [fungsi logika](https://help.libreoffice.org/latest/en-US/text/scalc/01/04060105.html), dan [fungsi lembar kerja (pencarian)](https://help.libreoffice.org/latest/en-US/text/scalc/01/04060109.html).

## Contoh setengah jadi

Lengkapi titik-titik pada tiga rumus berikut, lalu tulis hasilnya:

1. Nilai bersih: `=VALUE(SUBSTITUTE(SUBSTITUTE(D2;"Rp ";"");"___";""))`.
2. Penanda yang menandai **kedua** baris ganda: `=IF(COUNTIF($A$2:$A$7;A2)___1;"duplikat";"ok")`.
3. Jumlah semua nilai kategori minuman: `=SUMIF($E$2:$E$7;"minuman";$___$2:$___$7)`.

Setelah itu lengkapi: "Bila ada baris yang tampil `#N/A`, saya mulai mencari penyebabnya di ____."

## Latihan

1. **Ubah.** Ubah rumus `I` agar batas "besar" adalah 80000 dan tambahkan kategori "sedang" bagi nilai 50000 sampai 79999 (petunjuk: `IF` bersarang). Prediksi dulu: berapa baris yang "besar"?
2. **Buat.** Buat kolom `K` yang mengambil angka dari id, misalnya `F-001` menjadi `1`, memakai `VALUE` dan `MID`. Lalu buat rumus yang menghasilkan hari terakhir bulan dari tanggal di kolom `F`.
3. **Jelaskan.** Mengapa sebaiknya hasil pembersihan ditaruh di kolom baru, bukan menimpa data asli? Tuliskan dua alasan.
4. **Buat.** Tambahkan lembar "Catatan" yang memuat satu baris untuk tiap kolom rumus: tujuan, rumus, dan satu masukan yang bisa membuatnya salah. Inilah dokumentasi keluaran portofolio Anda.
5. **Berpasangan (opsional).** Tukar data kotor rekaan buatan Anda dengan rekan, lalu bersihkan data masing-masing. Peserta mandiri boleh melewati tugas ini.

## Latihan bercampur

1. (`DW-PKJ-M1`) Tulis "bersihkan data faktur bulanan" sebagai algoritma bernomor yang memakai kolom `E` sampai `J`, lengkap dengan satu keputusan dan penanganan baris yang tidak punya acuan.
2. (`DW-FND-M1`) Bila Anda ingin meminta asisten AI membuatkan rumus dari data kantor Anda, apa yang harus Anda ganti atau hapus sebelum menempel contoh?

## Keluaran portofolio

**Lembar kerja sintetis bersih dan terdokumentasi.** Berkas dengan data kotor asli, kolom hasil bersih, dan lembar "Catatan" berisi tujuan tiap rumus. Seluruhnya data sintetis.

## Ulang berjarak

Tanpa melihat modul ini, kerjakan ulang dan cocokkan. Pertanyaan ini akan muncul lagi di "Ingat kembali" modul berikutnya.

| Kapan | Pertanyaan |
| --- | --- |
| Satu minggu lagi (modul berikutnya) | Tulis rumus yang membuang spasi berlebih dan menyeragamkan huruf, lalu jelaskan satu alasan memakai kolom baru. |
| Tiga modul lagi | Mengapa hasil pembersihan ditaruh di kolom atau berkas baru, bukan menimpa data asli? |
| Akhir jalur | Pilih satu rumus pencarian dari proyek Anda dan jelaskan apa yang terjadi bila nilai yang dicari tidak ada. |

## Kebijakan AI

Modul ini tidak memakai asisten AI; kebijakan lengkap program ada di `DW-FND-M1` dan akan dipakai penuh pada `DW-PKJ-M6` (silabus bagian 9.1).

## Kesalahan umum

- **Menimpa data asli dengan hasil bersih.** Simpan asli dan bersih berdampingan supaya Anda bisa memeriksa dan mengulang.
- **Lupa argumen `0` pada `VLOOKUP`.** Pencocokan perkiraan memberi hasil keliru pada data tidak berurutan.
- **Mengira tanggal teks sudah tanggal.** Bila rata kiri dan tidak bisa diurutkan menurut waktu, itu teks.
- **Menyalin rumus tanpa memeriksa `$`.** Rentang yang bergeser diam-diam menghasilkan angka salah.
- **Menyaring "ok" tanpa tahu cara tanda duplikat bekerja.** Dua jenis rumus tanda duplikat menghasilkan jumlah berbeda.

## Cek mandiri

Tutup modul dan jawab:

1. Mengapa data asli dan data bersih dipisah kolom?
2. Apa fungsi `IFERROR` pada `VLOOKUP`, dan satu risikonya (galat nyata ikut tersembunyi)?
3. Bagaimana tanggal teks `19/03/2026` diubah menjadi tanggal sungguhan?

Daftar periksa (kosong; Anda isi sendiri, tidak dikumpulkan):

- [ ] Data asli tidak saya timpa.
- [ ] Setiap rumus punya tujuan yang tertulis di lembar "Catatan".
- [ ] Saya memeriksa hasil dengan hitungan tangan pada tiga baris.
- [ ] Tidak ada data nyata di berkas saya.

## Kunci dan petunjuk

- **Cek awal:** (1) membuang spasi di awal dan akhir serta menyatukan spasi ganda; (2) referensi absolut, tidak bergeser saat disalin; (3) `#N/A`, dibungkus `IFERROR`; (4) teks diurutkan seperti kata dan tidak bisa dihitung sebagai waktu; (5) `=IF(A2>=100;"besar";"kecil")`.
- **Prediksi:** (1) `alat-tulis`; (2) `#N/A` atau, dengan `IFERROR`, teks pengganti; (3) satu baris dengan rumus berentang memanjang, dua baris bila rentang penuh (dicoba: `=SUMPRODUCT(COUNTIF($A$2:$A$7;$A$2:$A$7)>1)` menghasilkan `2`).
- **Setengah jadi:** (1) `"."`; (2) `>`; (3) `G` dan `G`, hasil `376000`. Bila `#N/A`: periksa dulu spasi dan huruf besar-kecil pada nilai yang dicari.
- **Latihan 1:** `=IF(G2>=80000;"besar";IF(G2>=50000;"sedang";"kecil"))` (dicoba: baris 2 "besar", baris 4 "kecil", baris 6 "sedang"). Baris "besar" ada empat: 125000, 80500, 215000, dan 80500 lagi.
- **Latihan 2:** `=VALUE(MID(A2;3;3))` menghasilkan `1` untuk `F-001`; hari terakhir bulan: `=DAY(DATE(YEAR(F2);MONTH(F2)+1;1)-1)` menghasilkan `31` untuk Maret.
- **Petunjuk bila macet:** uji tiap potongan rumus di sel terpisah (`=RIGHT(C2;4)`) sebelum menggabungkannya.

## Langkah berikutnya

`DW-PKJ-M3`: lembar kerja cocok untuk data kecil dan sekali kerja; berikutnya Anda belajar Python agar tugas berulang atas berkas CSV dapat dijalankan ulang tanpa klik.

## Catatan untuk pendamping

- **Waktu:** 5 jam. **Bahan:** LibreOffice Calc dan tabel data kotor pada modul.
- **Verifikasi penulis:** semua rumus dicoba di LibreOffice 24.2.7.2 (bawaan), hasilnya sama dengan yang tertulis. Pada antarmuka berbahasa lain nama fungsi dapat diterjemahkan; cocokkan dengan daftar fungsi.
- **Tanda siap lanjut:** peserta menjelaskan beda dua rumus penanda duplikat dan mendokumentasikan tiap rumusnya.
