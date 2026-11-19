## Untuk siapa modul ini

Modul ini untuk murid kelas 7 pada minggu ketujuh. Kamu memakai Scratch tanpa akun; simpan berkas sesuai arahan gurumu. Bila komputer terbatas, tabel penelusuran di kertas cukup untuk sebagian besar kegiatan. Waktunya satu pertemuan, 2 JP. Prasyaratnya `SMP7-1-M5` (perulangan); pemecahan masalah dari `SMP7-1-M6` ikut dipakai.

## Ingat kembali

Tutup modul ini dan jawab dari ingatan.

1. Tulis arti **dekomposisi** dengan kalimatmu sendiri. (`SMP7-1-M6`)
2. Sprite di (0, 0) menghadap kanan menjalankan `move (40) steps`, `turn right (90) degrees`, `move (40) steps`. Di mana ia berhenti dan menghadap ke mana? (`SMP7-1-M3`)
3. Berapa derajat sprite diputar tiap sudut persegi dan segitiga sama sisi? (`SMP7-1-M4`)
4. Sebutkan tiga kebiasaan kartu instruksi yang tepat. (`SMP7-1-M1`)

Kunci: (1) memecah masalah besar menjadi bagian kecil; (2) (40, -40), menghadap bawah (arah 180); (3) 90 dan 120; (4) satu langkah satu tindakan, sebut benda dan jumlah, urutan dipikirkan.

## Tujuan

Setelah modul ini kamu dapat:

1. menemukan **pola** (bagian yang berulang) pada deretan atau gambar;
2. menuliskan **aturan umum** (generalisasi) yang berlaku untuk banyak kasus;
3. menelusuri perulangan di dalam perulangan;
4. memakai aturan umum untuk menggambar bentuk baru tanpa mencoba satu per satu.

## Prediksi dulu

Pola adalah susunan yang berulang. Perhatikan deretan kartu: A B B A B B A B B ... Kartu ke-10 adalah A, karena kelompok "A B B" berulang tiap tiga kartu. Itu pola. Menulis aturannya, "tiap kartu ke-3 mulai dari kartu ke-1 adalah A", disebut generalisasi: aturan yang berlaku untuk kartu mana pun.

Sekarang pola pada gambar. Program V menaruh perulangan di dalam perulangan. Blok di dalam `repeat` dalam ditulis dengan indentasi dua tingkat.

```text
when green flag clicked
erase all
go to x: (0) y: (0)
point in direction (90)
pen down
repeat (3)
  repeat (4)
    move (50) steps
    turn right (90) degrees
  turn right (30) degrees
pen up
```

**Prediksi.** Berapa persegi yang tergambar? Berapa arah sprite pada akhirnya? Tulis dulu.

**Jalankan.** Susun V dan klik bendera hijau. Isi tabel penelusuran per putaran luar:

| Putaran luar ke- | Arah sebelum | Posisi setelah persegi | Arah setelah persegi | Arah setelah `turn right (30)` |
| --- | --- | --- | --- | --- |
| 1 | | | | |
| 2 | | | | |
| 3 | | | | |

**Selidiki.** Cocokkan dengan prediksimu. Perhatikan bahwa posisi tidak berubah setelah persegi selesai: persegi yang tertutup mengembalikan sprite ke titik awalnya.

## Contoh terselesaikan

Penelusuran program V:

| Putaran luar ke- | Arah sebelum | Posisi setelah persegi | Arah setelah persegi | Arah setelah `turn right (30)` | Alasan |
| --- | --- | --- | --- | --- | --- |
| 1 | 90 | (0, 0) | 90 | 120 | Empat putaran dalam menutup persegi. |
| 2 | 120 | (0, 0) | 120 | 150 | Persegi kedua miring 30 derajat. |
| 3 | 150 | (0, 0) | 150 | 180 | Persegi ketiga miring 30 derajat lagi. |

Tiga persegi tergambar dan arah akhir sprite 180. Sekarang generalisasi: pada bentuk dengan n sisi sama panjang, sprite berputar sebesar 360 dibagi n tiap sisi, sehingga setelah n putaran total putarannya 360 derajat dan arah kembali ke awal.

| Jumlah sisi n | Sudut putar | n x sudut |
| --- | --- | --- |
| 3 | 120 | 360 |
| 4 | 90 | 360 |
| 5 | 72 | 360 |
| 6 | 60 | 360 |
| 8 | 45 | 360 |

Dengan aturan itu kamu menggambar segi enam tanpa mencoba-coba: `repeat (6)` berisi `move (50) steps` dan `turn right (60) degrees`. Penelusuran sisi demi sisi dari (0, 0) menghadap kanan: sesudah sisi 1, kira-kira (50, 0), arah 150; sisi 2 (75, -43), arah -150; sisi 3 (50, -87), arah -90; sisi 4 (0, -87), arah -30; sisi 5 (-25, -43), arah 30; sisi 6 (0, 0), arah 90. Sprite kembali ke titik dan arah awal.

## Contoh setengah jadi

Segi lima sisi 50. Isi bagian kosong memakai aturan 360 dibagi jumlah sisi.

```text
when green flag clicked
erase all
go to x: (0) y: (0)
point in direction (90)
pen down
repeat (____)
  move (50) steps
  turn right (____) degrees
pen up
```

Telusuri arah sprite sesudah tiap putaran. Bila arah kelima tidak 90, periksa lagi angka sudutmu.

## Susun urutannya

Enam baris berikut sudah diacak. Susun menjadi program V (tanpa pena), dengan indentasi yang benar. Arah awal 90.

- **A.** `when green flag clicked`
- **B.** `repeat (3)`
- **C.** `  repeat (4)` (di dalam `repeat (3)`)
- **D.** `    move (50) steps` (di dalam `repeat (4)`)
- **E.** `    turn right (90) degrees` (di dalam `repeat (4)`)
- **F.** `  turn right (30) degrees` (di dalam `repeat (3)`, setelah `repeat (4)`)

Tulis urutan hurufnya. Jelaskan mengapa F harus berada di luar `repeat (4)` tetapi di dalam `repeat (3)`.

## Latihan

1. **Ubah.** Ubah V menjadi `repeat (12)` luar dan `turn right (30)`. Prediksi arah akhir sprite, lalu telusuri.
2. **Buat.** Tulis program segi delapan sisi 40 memakai aturan umum. Sebutkan sudutnya sebelum menulis.
3. **Temukan.** Lengkapi tabel generalisasi untuk n = 10 dan n = 12. Apakah aturan 360 dibagi n tetap berlaku?
4. **Pola.** Tulis deretan 3, 6, 9, 12, ... Tulis aturannya dan angka ke-10.
5. **Jelaskan.** Dengan dua kalimat, jelaskan beda pola dan generalisasi.

## Latihan bercampur

1. Program: `repeat (3)`, `move (20) steps`, `say [Hei] for (1) seconds`. Berapa detik totalnya, dan di mana sprite berhenti dari x = 0? (`SMP7-1-M6`, `SMP7-1-M5`)
2. Segi enam bisa ditulis dengan enam pasang `move` dan `turn`, atau dengan `repeat`. Berapa blok yang dihemat? (`SMP7-1-M5`)

## Ulang berjarak

Kerjakan ulang tanpa melihat modul ini, lalu cocokkan:

- **Minggu depan** (`SMP7-1-M8`): tulis aturan sudut putar untuk bentuk n sisi.
- **Sekitar sebulan lagi** (`SMP7-1-M11`): temukan pola pada program yang salah dan perbaiki dengan aturan umum.
- **Akhir semester** (`SMP7-1-M14`): tulis `repeat` di dalam `repeat` yang menggambar tiga persegi miring.

## Kesalahan umum

- **Menyamakan pola dengan aturan.** Pola adalah yang kamu lihat; aturan adalah kalimat umum yang kamu tulis.
- **Menaruh `turn right (30)` di dalam `repeat (4)`.** Persegi tidak lagi tertutup.
- **Memakai sudut dalam.** Segi enam memakai 60 untuk sudut putar, bukan 120 sudut dalamnya.
- **Mengira aturan 360 dibagi n berlaku tanpa syarat.** Ia berlaku untuk bentuk beraturan, sisi sama panjang dan sudut sama besar.
- **Lupa menelusuri.** Tebakan jumlah ulang sering meleset satu.

## Cek mandiri

Tutup modul, jawab tanpa melihat, lalu periksa.

1. Berapa sudut putar untuk segi lima beraturan?
2. Apa yang terjadi pada posisi sprite setelah persegi tertutup di dalam program V?
3. Apa beda pola dan generalisasi?

Daftar periksa (kosong; kamu isi sendiri, tidak dikumpulkan):

- [ ] Aku bisa menemukan pola berulang.
- [ ] Aku bisa menulis aturan umum untuk bentuk n sisi.
- [ ] Aku bisa menelusuri perulangan di dalam perulangan.

Kunci: (1) 72; (2) tetap di titik awal; (3) pola adalah susunan berulang yang kamu amati; generalisasi adalah aturan umum yang berlaku untuk banyak kasus.

## Langkah berikutnya

`SMP7-1-M8`, "Percabangan (kondisi)". Kamu akan membuat sprite memilih tindakan menurut keadaan, bukan hanya mengikuti urutan tetap.

## Catatan untuk guru

- **Waktu:** 2 JP x 40 menit `[asumsi]` (silabus bagian 2). Pasangan untuk "Prediksi dulu" dan "Latihan"; tidak dijanjikan berefek.
- **Alat:** Scratch tanpa akun murid; nama blok bisa berbeda menurut bahasa antarmuka.
- **Butir CP:** corpus memetakan minggu ini ke `D-BK-a` saja. Modul ini tidak mengklaim butir lain dan tidak menyatakan CP "terpenuhi".
- **Kunci "Prediksi dulu":** tiga persegi; arah akhir 180. Penelusuran pada contoh terselesaikan.
- **Kunci "Contoh setengah jadi":** `repeat (5)` dan `turn right (72) degrees`; arah sesudah tiap putaran: 162, -126, -54, 18, 90.
- **Kunci "Susun urutannya":** A, B, C, D, E, F.
- **Kunci latihan:** (1) dua belas persegi miring 30 derajat; arah akhir 90 (total putaran luar 360). (2) `repeat (8)`, `move (40)`, `turn right (45)`. (3) n = 10: 36; n = 12: 30; aturan tetap berlaku. (4) aturan "tambah 3"; angka ke-10 adalah 30. (5) pola diamati, generalisasi dirumuskan.
- **Kunci "Latihan bercampur":** (1) 3 detik; x = 60 (tiga kali `move (20)`). (2) enam pasang = 12 blok, dengan `repeat` 3 blok; hemat 9.
- **Petunjuk bertahap:** (a) tulis tabel n dan sudut; (b) hitung 360 dibagi n; (c) telusuri arah akhir.
- **AI:** tanpa AI. Kebijakan `smp-coding` (silabus bagian 7.1): AI generatif hanya demonstrasi guru, tanpa akun murid; asesmen tanpa AI.
- **Privasi:** tanpa nama murid pada berkas proyek.
- **Unsur pembelajaran:** ingat kembali dan jarak (`K`), PRIMM (`K` usia 11 sampai 14), tabel penelusuran (`K`), contoh lengkap lalu setengah jadi (`K`), Parsons (`M`), latihan bercampur (`K`).
