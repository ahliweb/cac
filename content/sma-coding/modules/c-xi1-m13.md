## Untuk siapa modul ini

Modul ini untuk murid kelas XI jalur C (IoT dan robotika), minggu `C-XI1-M13` silabus v1.3: proyek mini kelas XI semester 1, yaitu membuat sistem dua papan teruji (F). Prasyarat: modul `c-xi1-m12` (pemecahan masalah sambungan). Kamu memakai hasil modul sebelumnya: kasus uji (`c-xi1-m2`), `struct` (`c-xi1-m3`), keputusan histeresis (`c-xi1-m5` dan `c-xi1-m6`), penyangga melingkar (`c-xi1-m9`), pesan antar papan (`c-xi1-m10` dan `c-xi1-m11`), dan diagnosis (`c-xi1-m12`).

Modul ini karangan penyusun dan disetujui pemilik program pada 2026-11-20 (keputusan lewat dialog; catatan tinjauan menjadi tindak lanjut revisi). Ia tidak dihitung memenuhi butir capaian pembelajaran mana pun; proyek ini menyatukan keterampilan modul sebelumnya. Keluaran minggu ini: perangkat, uji, dan laporan. Latihan silabusnya: proyek kelompok.

Ada dua cara mengerjakan. **Dengan dua papan (F):** kelompok merakit dua papan sesuai lembar guru. **Tanpa papan:** kelompok menjalankan "papan tiruan" di komputer untuk pengirim, saluran, dan penerima, memakai aliran karangan; semua bagian pokok tetap dikerjakan, tetapi perilaku kabel, derau, dan waktu tidak teruji. Nomor pin dan ambang pada contoh hanya contoh `[belum terverifikasi]` untuk rangkaianmu.

## Keselamatan perangkat

- Daya hanya dari kabel USB (tiap papan satu kabel). Tidak ada listrik jaringan (220 V) dan tidak ada baterai pada modul ini.
- Cabut kedua kabel USB sebelum memasang, memindahkan, atau mencabut kabel jumper. Sambungkan GND ke GND dan TX ke RX secara silang.
- Pemanas pada proyek ini **disimulasikan dengan LED**; jangan menyambung pemanas, kipas bermotor, atau beban lain. Pasang resistor LED sesuai lembar guru dan periksa polaritas.
- Jangan menyambung pin ke daya atau perangkat bertegangan lain; tegangan logika dicocokkan menurut lembar data papanmu `[belum terverifikasi]`.
- Tidak ada solder. Tidak ada kamera atau mikrofon, dan tidak ada sensor tubuh atau lokasi pribadi.
- Papan atau kabel yang terasa panas, berbau, atau berasap: cabut kabel USB dan panggil guru.

## Ingat kembali

Jawab dari ingatan dulu, baru cek di kunci. Soal 1 dari `c-xi1-m5`, soal 2 dari `c-xi1-m12`, soal 3 dari `c-xi1-m10`.

1. Bila lampu berkedip di sekitar batas, bagaimana membedakan galat sensor dari galat keputusan?
2. Urutkan empat lapis diagnosis dari yang diperiksa pertama.
3. Mengapa kedua papan harus berbagi GND dan memakai baud yang sama?

## Tujuan

Setelah modul ini kamu dapat:

- merencanakan sistem dua papan: tujuan, pembagian tugas papan, spesifikasi pesan, kriteria selesai, daftar uji, dan prediksi hasil;
- membangun papan pengirim (sensor, pesan berjumlah periksa) dan papan penerima (pemeriksaan, penyangga, keputusan);
- menguji sistem dengan kasus uji tertulis, termasuk pesan rusak, derau, dan tidak adanya pesan;
- mendiagnosis gangguan dengan urutan daya, kabel, kode, format pesan, dan mencatatnya;
- menulis laporan satu halaman dan memberi serta menerima umpan balik sejawat (keluaran minggu ini: perangkat, uji, laporan).

## Rencana proyek

Sebelum menyentuh papan, tulis rencanamu: apa arti "selesai", lalu tebakan hasilnya. Satu halaman cukup, dengan enam bagian: tujuan, pembagian tugas papan, spesifikasi pesan, kriteria selesai, daftar uji, dan prediksi hasil.

Contoh terselesaikan untuk **pemantau suhu dengan pemanas simulasi (LED)**:

| Bagian | Isi contoh |
| --- | --- |
| Tujuan | Papan A mengukur suhu dan mengirimnya; papan B menyalakan LED pemanas bila rata-rata suhu terlalu rendah, tanpa terganggu satu pesan rusak. |
| Papan A | Baca suhu tiap 1 detik, buat pesan `$S,<suhu10>,<cahaya>*HH` (`c-xi1-m11`), kirim lewat `Serial2` tanpa `delay`. |
| Papan B | Terima karakter, periksa pesan, masukkan suhu sah ke penyangga melingkar lima elemen (`c-xi1-m9`), hitung rata-rata, putuskan dengan histeresis (`c-xi1-m6`). |
| Keputusan | Pemanas menyala bila rata-rata `suhu10` di bawah 270 dan mati bila di atas 290; di antaranya tetap. |
| Keadaan aman | Bila tidak ada pesan sah selama 5 detik, pemanas dimatikan (`c-xi1-m6`). |
| Kriteria selesai | Lima uji pada tabel di bawah lolos; pesan rusak tidak mengubah keputusan; laporan satu halaman selesai. |
| Prediksi | Suhu10 260, 262, 264, 266, 268 menghasilkan rata-rata 264 sehingga pemanas menyala. |

Pseudocode papan B:

```text
ULANG TERUS:
  UNTUK setiap karakter yang tersedia (tanpa menunggu):
    kumpulkan karakter menjadi baris; mulai ulang pada '$'
    BILA baris utuh:
      BILA jumlah periksa dan format sah:
        masukkan suhu10 ke penyangga; catat waktu pesan sah terakhir
        hitung rata-rata; putuskan pemanas dengan histeresis
      SELAIN ITU: tambahkan hitungan baris ditolak
  BILA sudah 5 detik tanpa pesan sah:
    matikan pemanas
```

Daftar uji contoh (nilai dihitung penulis; jumlah periksa memakai aturan `c-xi1-m11`):

| No | Masukan | Hasil yang diharapkan |
| --- | --- | --- |
| 1 | `$S,281,2100*09` | diterima; suhu10 281 masuk penyangga |
| 2 | `$S,285,2160*12` | ditolak (isi berjumlah `13`, pesan menyatakan `12`); penyangga tidak berubah |
| 3 | `xx#$S,290,2200*0A` | derau sebelum `$` diabaikan; pesan diterima |
| 4 | `$S,28` lalu pesan utuh | pesan terputus dibuang; pesan utuh diterima |
| 5 | rata-rata tepat 290 (suhu10 280, 285, 290, 295, 300; jumlah 1450) | keputusan tidak berubah (batas mati adalah **di atas** 290) |

## Daftar periksa

Kerjakan berurutan dan centang bila selesai.

- [ ] Rencana satu halaman ditulis lebih dulu, termasuk prediksi hasil dan keadaan aman.
- [ ] Spesifikasi pesan ditulis (tabel bagian pesan seperti `c-xi1-m11`) dan disetujui kedua penulis papan.
- [ ] Pembagian tugas jelas: siapa papan A, siapa papan B, siapa pengujian dan laporan; bertukar peran pada sesi berikutnya.
- [ ] Fungsi dibagi menurut tanggung jawab (buat pesan, periksa pesan, rata-rata, keputusan) dan yang tidak menyentuh pin diuji lebih dulu di komputer.
- [ ] Minimal lima uji tertulis seperti tabel contoh, termasuk pesan rusak, derau, pesan terputus, nilai tepat di batas, dan tanpa pesan; hasilnya dicatat.
- [ ] Penerima tidak memakai `delay`, dan penyangga serta baris berukuran tetap dengan penjagaan batas (`c-xi1-m8`).
- [ ] Gangguan yang muncul didiagnosis berurutan, satu perubahan pada satu waktu, dan dicatat di jurnal.
- [ ] Keselamatan: kabel USB dicabut sebelum mengubah rangkaian; polaritas LED dan GND bersama diperiksa.
- [ ] Privasi: tidak ada kamera atau mikrofon; tidak ada nama, sekolah, atau identitas di program, berkas, atau laporan; tidak ada kata sandi atau kunci.
- [ ] Bila memakai AI generatif: catatan pemakaian AI (alat, tujuan, garis besar perintah, bagian yang dipakai, cara memeriksa); kode buatan AI kamu baca, jalankan, dan uji.
- [ ] Laporan satu halaman: tujuan, rancangan, hasil uji, satu hal yang berbeda dari prediksi, dan satu perbaikan berikutnya.

## Umpan balik sejawat

Tukar rencana, spesifikasi pesan, dan program dengan satu kelompok lain. Beri umpan balik tentang pekerjaan, bukan tentang orangnya, dalam tiga kalimat:

1. **Satu yang sudah baik**, dengan bagian yang kamu tunjuk.
2. **Satu yang perlu diperbaiki**, dengan alasan.
3. **Satu langkah berikutnya** yang bisa dikerjakan minggu depan.

Contoh: "Daftar ujimu memuat pesan rusak dan pesan terputus. Spesifikasi pesan belum menyebut apakah huruf kecil pada jumlah periksa diterima; tuliskan aturannya. Langkah berikutnya: uji rata-rata tepat di batas 290 dan 270." Terima umpan balik dengan mencatat, bukan membela.

## Latihan bercampur

1. Pemanas sedang menyala. Lima pesan sah terakhir bersuhu10 275, 280, 285, 291, 296. Berapa rata-rata (bilangan bulat, dipotong), dan apakah pemanas mati? Apa harga memakai rata-rata untuk keputusan?
2. Hitung jumlah periksa isi `S,290,2000` dan tulis pesan lengkapnya.

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `c-xi1-m14` (sekitar satu minggu lagi), `c-xi2-m2` (sekitar tiga minggu lagi), dan `c-xi2-m7` (sekitar delapan minggu lagi). Jawab sekarang lalu simpan.

1. Apa yang membuat sebuah kriteria selesai dapat diuji, bukan sekadar niat?
2. Sebut dua hal yang tidak boleh ada di berkas proyek yang dibagikan, seperti laporan atau kode.
3. Apa kelebihan pesan berbentuk teks yang bisa dibaca manusia dibanding biner saat memecahkan masalah?

## Kesalahan umum

- **Langsung merakit tanpa rencana.** Tanpa kriteria selesai dan spesifikasi pesan bersama, dua papan dibuat dengan dua tafsir.
- **Hanya menguji pesan yang rapi.** Galat muncul pada pesan rusak, terputus, derau, dan nilai tepat di batas.
- **Mengubah beberapa hal sekaligus saat gangguan.** Ikuti urutan diagnosis dan ubah satu hal pada satu waktu.
- **Mengambil keputusan dari satu pesan.** Pesan yang rusak atau satu lonjakan tidak boleh mengubah keputusan.
- **Mengira papan tiruan menggantikan papan.** Papan tiruan hanya memeriksa logika; kabel, derau, dan waktu sungguhan tidak diuji.
- **Lupa keadaan aman.** Bila pesan berhenti datang, sistem harus menuju keadaan yang tidak berbahaya, bukan bertahan pada keputusan terakhir.

## Cek mandiri

- [ ] Saya menulis rencana, spesifikasi pesan, dan kriteria selesai sebelum merakit.
- [ ] Saya membangun dan menguji sistem dua papan atau papan tiruannya.
- [ ] Saya menguji pesan rusak, derau, terputus, tepat di batas, dan tanpa pesan.
- [ ] Saya mendiagnosis gangguan berurutan dan mencatatnya.
- [ ] Saya menulis laporan satu halaman dan memberi umpan balik dalam tiga kalimat.

## Kunci dan petunjuk

**Ingat kembali.** 1: lihat pembacaan mentahnya: bila pembacaan sendiri berayun di sekitar batas, itu derau sensor yang butuh penyaringan atau histeresis; bila pembacaan tenang tetapi keputusan berganti, kesalahan ada di logika keputusan. 2: daya, kabel, kode, format pesan. 3: karena tegangan hanya bermakna terhadap acuan yang sama, dan baud menentukan lama satu bit; tanpa keduanya penerima tidak dapat membaca isi dengan benar.

**Rencana proyek.** Tidak ada kunci tunggal untuk rencana kelompokmu. Rencana yang baik memuat enam bagian, spesifikasi pesan yang sama di kedua papan, kriteria selesai yang bisa diuji, dan keadaan aman. Pada contoh, `$S,285,2160*12` ditolak karena jumlah periksa isinya `13`, bukan `12` (`c-xi1-m11`); rata-rata 290 persis berada di batas, dan karena pemanas mati hanya bila rata-rata **di atas** 290, keputusannya tetap. Ketiga ketentuan itu dihitung penulis.

**Daftar periksa.** Tidak ada kunci. Periksa dengan rubrik: kelengkapan rencana, ketepatan uji dan hasil yang dicatat, keselamatan dan privasi, dan kejujuran laporan (menyebut yang berbeda dari prediksi).

**Umpan balik sejawat.** Tidak ada kunci. Umpan balik yang baik menunjuk bagian yang konkret.

**Latihan bercampur.** 1: jumlah 275 + 280 + 285 + 291 + 296 = 1427; dibagi 5 dipotong menjadi 285. Batas mati adalah di atas 290, sehingga pemanas **tetap menyala**. Harganya: rata-rata menahan lonjakan, tetapi tanggapannya tertinggal; suhu sudah naik lebih jauh daripada yang tampak pada rata-rata. 2: S = 83, `,` = 44, `2` = 50, `9` = 57, `0` = 48, `,` = 44, `2` = 50, `0` = 48, `0` = 48, `0` = 48; jumlah 520, dan 520 modulo 256 adalah 8, heksadesimal `08`; pesan lengkap `$S,290,2000*08`.

**Ulang berjarak.** 1: kriteria berisi nilai, kondisi, atau perilaku yang dapat diamati sehingga hasilnya jelas lulus atau gagal; "bekerja dengan baik" tidak punya ukuran. 2: contoh: kata sandi, kunci, atau token; data pribadi seperti nama atau nama sekolah. 3: manusia dapat membacanya langsung di monitor serial dan menemukan kesalahan format dengan mata, tanpa alat penerjemah.

## Langkah berikutnya

Modul berikut: `c-xi1-m14` (asesmen dan refleksi semester ini), yang menilai rekayasa, kendali, dan pengiriman data. Semester berikutnya (`c-xi2-m1`) menghubungkan papan ke jaringan lab. Jadikan laporan proyek ini bahan refleksimu. Modul terkait: `c-xi1-m1` (dokumen rancangan) dan `c-xi1-m12` (diagnosis). Pembacaan lanjut: panduan mata pelajaran Informatika Fase D sampai F.
