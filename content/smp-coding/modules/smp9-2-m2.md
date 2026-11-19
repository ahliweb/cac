## Untuk siapa modul ini

Modul ini untuk murid kelas 9 pada minggu kedua semester kedua, tahap merancang proyek akhir. Kamu bekerja dalam tim kecil dengan kertas atau dokumen yang disediakan sekolah; belum ada program yang ditulis. Waktunya satu pertemuan, 2 JP, dan hasilnya satu rancangan: tujuan, masukan, proses, dan keluaran. Prasyaratnya `SMP9-2-M1` (memilih persoalan). Semua contoh di modul ini rekaan.

## Ingat kembali

Tutup modul ini dan jawab dari ingatan.

1. Tulis rancangan solusi untuk satu persoalan sekitar: tujuan, masukan, proses, dan keluaran. (`SMP9-1-M12`)
2. Sebut empat ciri persoalan sekitar yang cocok untuk proyek tim. (`SMP9-2-M1`)
3. Tulis dari ingatan kondisi JIKA ... MAKA ... LAINNYA dan telusuri dua masukan. (`SMP8-1-M14`)

Kunci: (1) tujuan satu kalimat; masukan: apa yang diberikan pengguna; proses: langkah mengolahnya; keluaran: apa yang dilihat pengguna; (2) ada pengguna, kecil, bisa diuji dengan data rekaan, tanpa data pribadi nyata; (3) contoh: `JIKA nilai >= 60 MAKA TAMPILKAN "lulus" LAINNYA TAMPILKAN "ulang"`; masukan 80 menghasilkan "lulus", masukan 40 menghasilkan "ulang".

## Tujuan

Setelah modul ini kamu dapat:

1. menulis tujuan satu kalimat untuk persoalan pilihan timmu;
2. menjabarkan rancangan menjadi masukan, proses, dan keluaran;
3. menuliskan proses sebagai pseudocode dan menelusurinya dengan dua masukan;
4. memecah rancangan menjadi bagian kecil yang bisa dikerjakan terpisah.

## Prediksi dulu

Tim yang memilih persoalan jadwal piket menulis proses ini sebagai pseudocode. Jadwal rekaannya: Senin dikerjakan Murid-01 dan Murid-02, Selasa Murid-03, Rabu Murid-04 dan Murid-05.

```text
BACA hari
JIKA hari ada di jadwal MAKA
    TAMPILKAN petugas hari itu
LAINNYA
    TAMPILKAN "Tidak ada jadwal untuk" dan hari
```

**Prediksi.** Apa yang tampil untuk masukan `Selasa`? Apa yang tampil untuk masukan `Kamis`? Tulis dulu, lalu telusuri satu baris demi satu baris.

## Contoh terselesaikan

Karena ini minggu merancang, contohnya berupa **contoh rancangan**. Penelusuran pseudocode di atas: `Selasa` ada di jadwal, jadi tampil `Murid-03`; `Kamis` tidak ada, jadi tampil `Tidak ada jadwal untuk Kamis`. Rancangan lengkapnya:

| Bagian rancangan | Isi contoh |
| --- | --- |
| Tujuan satu kalimat | Menampilkan siapa yang piket pada hari yang diketik pengguna. |
| Masukan | Satu nama hari. |
| Proses | Mencari hari itu di jadwal; bila ada, mengambil daftar petugasnya. |
| Keluaran | Nama petugas, atau pesan bahwa hari itu tidak punya jadwal. |
| Data rekaan | Jadwal tiga hari dengan nama samaran `Murid-01` sampai `Murid-05`. |
| Bagian kecil | (1) menyimpan jadwal; (2) mencari petugas; (3) mencetak hasil. |
| Kasus uji awal | Hari yang ada (`Selasa`); hari yang tidak ada (`Kamis`); masukan kosong. |

Bagian kecil nomor 1 sampai 3 menjadi tiga fungsi di `SMP9-2-M3`: satu membaca atau menyimpan data, satu memproses, satu mencetak. Memisahkannya membuat tiap bagian bisa diuji sendiri. Rancangan yang baik menjawab "apa yang masuk, apa yang terjadi, apa yang keluar" sebelum satu baris program ditulis.

## Contoh setengah jadi

Rancangan untuk persoalan pilihan timmu. Isi tabel.

| Bagian rancangan | Isi timmu |
| --- | --- |
| Tujuan satu kalimat | ____ |
| Masukan | ____ |
| Proses | ____ |
| Keluaran | ____ |
| Data rekaan | ____ |
| Bagian kecil (tiga) | ____ |
| Kasus uji awal (tiga) | ____ |

## Susun urutannya

Dilewati: minggu merancang memakai tabel rancangan, bukan satu program berurutan.

## Latihan

1. **Telusuri.** Telusuri pseudocode jadwal piket untuk masukan `Senin` dan `Jumat`; tulis hasil tiap baris.
2. **Perbaiki.** Rancangan "program yang membantu piket supaya semua senang" tidak punya masukan dan keluaran yang jelas. Tulis ulang menjadi rancangan dengan tujuan, masukan, proses, dan keluaran.
3. **Rancang.** Isi tabel rancangan untuk persoalan timmu dan tulis prosesnya sebagai pseudocode.
4. **Jelaskan.** Jelaskan rancanganmu lisan dalam satu menit, dari masukan sampai keluaran.

## Latihan bercampur

1. Tulis pseudocode `ULANGI 5 KALI` yang menampilkan jumlah 1 + 2 + 3 + 4 + 5. Berapa hasilnya? (`SMP8-1-M5`)
2. `jadwal = {"Senin": 2}`. Apa hasil `jadwal.get("Selasa", 0)`? (`SMP9-1-M3`)

## Ulang berjarak

Kerjakan ulang tanpa melihat modul ini, lalu cocokkan:

- **Minggu depan** (`SMP9-2-M3`): tulis masukan, proses, dan keluaran untuk pencari petugas piket hari tertentu.
- **Beberapa minggu lagi** (`SMP9-2-M7`): tulis dari ingatan rancangan solusi: tujuan, masukan, proses, keluaran.
- **Akhir semester** (`SMP9-2-M13`): tulis rancangan solusi (tujuan, masukan, proses, keluaran) untuk satu persoalan sekitar yang belum kamu kerjakan.

## Kesalahan umum

- **Menulis tujuan berupa alat, bukan hasil.** Kenali: "membuat aplikasi" tanpa menyebut apa yang dilihat pengguna.
- **Melewatkan keluaran.** Kenali: tidak ada baris yang menyebut apa yang tampil.
- **Melewatkan masukan yang tidak terduga.** Kenali: tidak ada rencana untuk hari yang tidak ada atau masukan kosong.
- **Menulis proses terlalu umum.** Kenali: kata "mengolah data" tanpa langkah yang bisa ditelusuri.
- **Menunda kasus uji sampai program selesai.** Kenali: kolom kasus uji kosong.

## Cek mandiri

Tutup modul, jawab tanpa melihat, lalu periksa.

1. Sebut empat bagian rancangan.
2. Tulis rancangan piket untuk masukan `Rabu`: apa yang tampil?
3. Mengapa proses dipecah menjadi tiga bagian kecil?

Daftar periksa (kosong; kamu isi sendiri, tidak dikumpulkan):

- [ ] Rancangan timku punya tujuan, masukan, proses, dan keluaran.
- [ ] Prosesnya sudah kutelusuri dengan dua masukan.
- [ ] Rancangan timku punya tiga kasus uji awal.

Kunci: (1) tujuan, masukan, proses, keluaran; (2) tampil `Murid-04` dan `Murid-05`; (3) tiap bagian bisa dikerjakan dan diuji terpisah, dan pembagian kerja menjadi jelas.

## Langkah berikutnya

`SMP9-2-M3`, "Implementasi, tahap 1". Kamu menulis kerangka program dengan tiga fungsi dan menjalankannya sebelum semua bagian lengkap.

## Catatan untuk guru

- **Waktu:** 2 JP x 40 menit `[asumsi]` (silabus bagian 2). Kerja tim boleh; bukan jaminan efek belajar.
- **Alat:** kertas atau dokumen yang disediakan sekolah. Tidak ada kode yang dijalankan di modul ini; pseudocode ditelusuri dengan tangan. Penulis tidak menjalankan langkah di program dokumen mana pun; bila tim memakai dokumen bersama, guru memeriksa langkahnya sebelum kelas.
- **Butir CP:** corpus memetakan minggu ini ke `DK-BK-b` dan `D-BK-a`. Modul tidak menyatakan CP "terpenuhi"; rancangan dinilai guru dengan rubriknya sendiri.
- **Keluaran minggu:** rancangan: tujuan, masukan, proses, keluaran.
- **Kunci "Prediksi dulu":** `Selasa` menampilkan `Murid-03`; `Kamis` menampilkan `Tidak ada jadwal untuk Kamis`.
- **Kunci "Contoh setengah jadi":** jawaban bebas; periksa tujuan satu kalimat, masukan dan keluaran terpisah, proses bisa ditelusuri, tiga bagian kecil, tiga kasus uji awal, tanpa data pribadi nyata.
- **Kunci latihan:** (1) `Senin`: `Murid-01` dan `Murid-02`; `Jumat`: `Tidak ada jadwal untuk Jumat`. (2) contoh: tujuan "menampilkan petugas piket hari yang diketik"; masukan nama hari; proses mencari di jadwal; keluaran nama petugas atau pesan. (3) tabel lengkap dan pseudocode dengan JIKA ... LAINNYA bila perlu. (4) penjelasan berurutan masukan, proses, keluaran.
- **Kunci "Latihan bercampur":** (1) 15. (2) 0.
- **Petunjuk bertahap:** (a) tulis apa yang dilihat pengguna di akhir; (b) tulis apa yang diberikan pengguna di awal; (c) tulis langkah di antaranya; (d) telusuri dengan dua masukan.
- **AI:** tanpa AI oleh murid. Kebijakan `smp-coding` (silabus bagian 7.1): AI generatif hanya demonstrasi guru, tanpa akun murid; murid tidak meminta AI menyusun rancangan atau pseudocode; asesmen tanpa AI.
- **Privasi:** semua data dan persoalan rekaan; tim tidak mengumpulkan data pribadi, foto, atau suara teman, dan nama berkas memakai nama samaran.
- **Unsur pembelajaran:** ingat kembali dan jarak (`K`), rancangan menggantikan contoh terselesaikan (`M`), PRIMM (`K` usia 11 sampai 14), penelusuran (`K`), latihan bercampur (`K`).
