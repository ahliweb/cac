## Untuk siapa modul ini

Modul ini untuk murid kelas 7 pada minggu kedua semester kedua. Ini modul **pengayaan**: isinya menambah wawasan dan tidak tercantum dalam rumusan capaian pembelajaran. Kamu memerlukan kertas, pensil, dan lima kartu bertanda 16, 8, 4, 2, 1 (boleh digambar di kertas). Waktunya satu pertemuan, 2 JP. Prasyaratnya `SMP7-2-M1` (data diskrit).

## Ingat kembali

Tutup modul ini dan jawab dari ingatan.

1. Apa beda data dan informasi? (`SMP7-2-M1`)
2. Apa yang tersimpan di `(answer)`, dan apa yang terjadi pada isinya saat `ask` kedua berjalan? (`SMP7-1-M10`)
3. Apa beda `repeat (n)` dan `forever`? (`SMP7-1-M5`)

Kunci: (1) data adalah fakta mentah, informasi adalah data yang diolah untuk menjawab pertanyaan; (2) jawaban terakhir yang diketik pemain; `ask` kedua menimpanya; (3) `repeat (n)` berhenti sesudah n kali, `forever` berjalan sampai dihentikan.

## Tujuan

Setelah modul ini kamu dapat:

1. menjelaskan **biner** sebagai cara menulis angka dengan hanya dua tanda, 0 dan 1;
2. mengubah deretan lima bit menjadi angka, dan sebaliknya, dengan kartu 16, 8, 4, 2, 1;
3. menyandikan dan membaca pesan huruf dengan aturan A = 1, B = 2, dan seterusnya;
4. menjelaskan bahwa sandi sederhana bukan pengaman rahasia.

## Prediksi dulu

Komputer menyimpan segala hal dengan dua keadaan. Satu tanda, 0 atau 1, disebut **bit**. Lima bit disusun di bawah kartu 16, 8, 4, 2, 1. Bit `1` berarti kartu itu dipasang; bit `0` berarti kartu tidak dipasang. Angkanya adalah jumlah kartu yang terpasang.

| Kartu | 16 | 8 | 4 | 2 | 1 |
| --- | --- | --- | --- | --- | --- |
| Bit | 0 | 1 | 1 | 0 | 1 |

**Prediksi.** Berapa angka dari deretan `01101`? Tulis dulu.

**Jalankan.** Pasang kartu 8, 4, dan 1 di meja, lalu jumlahkan.

**Selidiki.** Cocokkan dengan prediksimu. Mengapa bit paling kiri bernilai paling besar?

## Contoh terselesaikan

Menyandikan kata **BUKU** dengan aturan huruf ke nomor (A = 1, B = 2, ..., Z = 26), lalu nomor ke lima bit.

| Huruf | Nomor | Kartu terpasang | Lima bit |
| --- | --- | --- | --- |
| B | 2 | 2 | `00010` |
| U | 21 | 16 + 4 + 1 | `10101` |
| K | 11 | 8 + 2 + 1 | `01011` |
| U | 21 | 16 + 4 + 1 | `10101` |

Pesan jadi: `00010 10101 01011 10101`. Cara mengubah nomor menjadi bit: mulai dari kartu terbesar; bila kartu itu muat di sisa angka, pasang dan kurangi; bila tidak, kosongkan. Untuk 21: kartu 16 muat (sisa 5), 8 tidak, 4 muat (sisa 1), 2 tidak, 1 muat.

Tiga hal yang perlu diingat. Lima bit memberi 32 pola, yaitu angka 0 sampai 31, cukup untuk 26 huruf. Bit paling kiri bernilai paling besar. Aturan ini adalah **kodifikasi**: kesepakatan cara menulis; siapa pun yang tahu aturannya bisa membaca pesannya, jadi ini **bukan pengaman rahasia**.

## Contoh setengah jadi

Baca pesan `01011 01111 10100 00001` dengan aturan yang sama. Isi bagian kosong.

| Bit | Kartu terpasang | Nomor | Huruf |
| --- | --- | --- | --- |
| `01011` | 8 + 2 + 1 | 11 | K |
| `01111` | ____ | ____ | ____ |
| `10100` | ____ | ____ | ____ |
| `00001` | ____ | ____ | ____ |

## Susun urutannya

Lima langkah menyandikan pesan sudah diacak. Susun dalam urutan yang benar; satu langkah mengulang langkah lain.

- **A.** Ambil satu huruf dari pesan.
- **B.** Cari nomor huruf itu (A = 1).
- **C.** Pasang kartu 16, 8, 4, 2, 1 yang jumlahnya sama dengan nomor.
- **D.** Tulis lima bit dari kartu terpasang.
- **E.** Ulangi untuk huruf berikutnya sampai pesan habis.

Tulis urutan hurufnya. Jelaskan mengapa langkah E ada paling akhir.

## Latihan

1. **Ubah.** Ubah `01101` menjadi `01110`. Berapa angkanya sekarang, dan huruf apa?
2. **Buat.** Sandikan kata **ADA** menjadi tiga kelompok lima bit.
3. **Buat.** Ubah angka 18 menjadi lima bit dengan kartu, lalu cari hurufnya.
4. **Selidiki.** Apa angka terbesar yang bisa ditulis dengan lima bit? Apa yang terjadi bila kamu butuh angka lebih besar?
5. **Jelaskan.** Dengan dua kalimat, jelaskan mengapa sandi A = 1 bukan pengaman data.

## Latihan bercampur

Biner baru dikenalkan, jadi latihan bercampur yang memuat biner dimulai di modul berikutnya; dua soal ini mengulang topik sebelumnya.

1. Dari tabel survei `SMP7-2-M1`: ada berapa murid dengan tepat 2 saudara bila daftar jumlah saudara adalah 1, 2, 0, 3, 1, 2, 1, 0? (`SMP7-2-M1`)
2. Tulis `repeat` yang mengulang `turn right (90) degrees` empat kali, dan sebut arah akhir sprite. (`SMP7-1-M5`)

## Ulang berjarak

Kerjakan ulang tanpa melihat modul ini, lalu cocokkan:

- **Minggu depan** (`SMP7-2-M3`): ubah `10010` menjadi angka dan huruf.
- **Sekitar sebulan lagi** (`SMP7-2-M10`): jelaskan mengapa komputer menyimpan data dengan dua nilai, 0 dan 1.
- **Akhir semester** (`SMP7-2-M14`): sandikan satu kata tiga huruf dengan lima bit per huruf, tanpa melihat contoh.

## Kesalahan umum

- **Membaca bit dari kanan sebagai yang terbesar.** Kenali: `00001` terbaca 16.
- **Lupa lima bit.** Menulis `101` untuk 5 membuat sambungan antarhuruf membingungkan. Kenali: kelompok panjangnya berbeda-beda.
- **Mengira sandi biner itu rahasia.** Kenali: kamu menyebutnya "enkripsi"; ini hanya kodifikasi.
- **Menjumlahkan semua kartu.** Hanya kartu dengan bit 1 yang dihitung.

## Cek mandiri

Tutup modul, jawab tanpa melihat, lalu periksa.

1. Berapa angka dari `10010`, dan huruf apa?
2. Mengapa lima bit cukup untuk 26 huruf?
3. Mengapa sandi A = 1 bukan pengaman?

Daftar periksa (kosong; kamu isi sendiri, tidak dikumpulkan):

- [ ] Aku bisa mengubah lima bit menjadi angka.
- [ ] Aku bisa menyandikan satu kata.
- [ ] Aku bisa menjelaskan arti kodifikasi.

Kunci: (1) 18, huruf R; (2) lima bit memberi 32 pola, lebih dari 26; (3) siapa pun yang tahu aturannya bisa membacanya.

## Langkah berikutnya

`SMP7-2-M3`, "Teks dan gambar sebagai data". Kamu akan memakai ide yang sama untuk menyimpan gambar kecil sebagai angka.

## Catatan untuk guru

- **Waktu:** 2 JP x 40 menit `[asumsi]` (silabus bagian 2). Berpasangan boleh untuk "Prediksi dulu" dan "Latihan"; bukan jaminan efek belajar.
- **Alat:** kertas, pensil, kartu 16, 8, 4, 2, 1. Boleh digambar tangan; tidak perlu komputer.
- **Butir CP:** minggu ini pengayaan dan **tidak mengklaim butir CP** (silabus bagian 4: kodifikasi biner di luar rumusan CP Fase D 2025). Tidak ada pernyataan CP "terpenuhi".
- **Kunci "Prediksi dulu":** 8 + 4 + 1 = 13.
- **Kunci "Contoh setengah jadi":** `01111`: 8 + 4 + 2 + 1, 15, O; `10100`: 16 + 4, 20, T; `00001`: 1, 1, A. Pesan: KOTA.
- **Kunci "Susun urutannya":** A, B, C, D, E. E mengulang A sampai D sehingga harus sesudahnya.
- **Kunci latihan:** (1) 14, huruf N. (2) `00001 00100 00001`. (3) 18 = 16 + 2: `10010`, huruf R. (4) 31 (`11111`); butuh angka lebih besar berarti butuh lebih banyak bit. (5) aturannya diketahui umum dan tidak ada kunci rahasia.
- **Kunci "Latihan bercampur":** (1) 2 murid (nilai 2 muncul dua kali). (2) `repeat (4)` berisi `turn right (90) degrees`; empat kali 90 derajat penuh, arah kembali ke arah awal.
- **Petunjuk bertahap:** (a) tulis kartu 16, 8, 4, 2, 1 di atas kolom; (b) bit 1 berarti kartu dipasang; (c) jumlahkan.
- **AI:** tanpa AI. Kebijakan `smp-coding` (silabus bagian 7.1): AI generatif hanya demonstrasi guru, tanpa akun murid; asesmen tanpa AI.
- **Privasi:** pesan sandi hanya kata rekaan; jangan memakai nama atau alamat sebenarnya.
- **Unsur pembelajaran:** ingat kembali dan jarak (`K`), PRIMM (`K` usia 11 sampai 14), contoh lengkap lalu setengah jadi (`K`), Parsons (`M`), latihan bercampur (`K`).

## Rujukan

- *Panduan Mata Pelajaran Informatika, Fase D – F*, BSKAP, 2025:
  <https://repositori.kemendikdasmen.go.id/33634/1/32.%20Panduan%20Mata%20Pelajaran%20Informatika.pdf>
- CS Unplugged, "Binary numbers" (hanya tautan; idenya ditulis ulang di modul ini): <https://www.csunplugged.org/en/topics/binary-numbers/>
