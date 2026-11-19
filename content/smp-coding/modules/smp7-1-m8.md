## Untuk siapa modul ini

Modul ini untuk murid kelas 7 pada minggu kedelapan. Kamu memakai Scratch tanpa akun; simpan berkas sesuai arahan gurumu. Kalau komputer terbatas, tabel penelusuran di kertas cukup untuk sebagian besar kegiatan. Waktunya satu pertemuan, 2 JP. Prasyaratnya `SMP7-1-M5` (perulangan).

## Ingat kembali

Tutup modul ini dan jawab dari ingatan.

1. Tulis aturan sudut putar untuk bentuk beraturan dengan n sisi, lalu hitung untuk n = 5. (`SMP7-1-M7`)
2. Sebutkan blok topi yang memulai program, dan jelaskan apa yang terjadi bila tidak ada blok topi. (`SMP7-1-M4`)
3. Apa beda `repeat (n)` dan `forever`? (`SMP7-1-M5`)
4. Beri contoh dua langkah yang kalau ditukar urutannya hasilnya berubah. (`SMP7-1-M2`)

Kunci: (1) 360 dibagi n; untuk n = 5 hasilnya 72 derajat; (2) contohnya `when green flag clicked`; tanpa blok topi, skrip tidak berjalan sendiri karena tidak ada peristiwa yang memulainya; (3) `repeat (n)` berhenti sesudah n kali, `forever` berjalan sampai dihentikan; (4) jawaban bebas, mis. "pakai sepatu" dan "pakai kaus kaki".

## Tujuan

Setelah modul ini kamu dapat:

1. menjelaskan **kondisi** sebagai pertanyaan yang jawabannya hanya benar atau salah;
2. menulis `if ... then` dan `if ... then ... else` untuk membuat sprite bereaksi;
3. menelusuri program yang memakai kondisi dan menyebut cabang yang dijalankan;
4. memakai kondisi dari sensor sederhana, yaitu tombol ditekan dan menyentuh tepi.

## Prediksi dulu

Sampai minggu lalu, program berjalan dari atas ke bawah tanpa memilih. Dengan **percabangan**, program memeriksa sebuah kondisi lalu menjalankan satu kelompok blok bila kondisinya **benar**. Blok `else` memuat kelompok yang dijalankan bila kondisinya **salah**. Kondisi ditulis di antara `<` dan `>`. Blok di dalam `if` dan `else` ditulis dengan indentasi.

Program P (arah awal sprite 90, menghadap kanan):

```text
when green flag clicked
go to x: (70) y: (0)
point in direction (90)
if <(x position) > (50)> then
  say [Terlalu kanan] for (1) seconds
else
  say [Aman] for (1) seconds
move (-30) steps
if <(x position) > (50)> then
  say [Terlalu kanan] for (1) seconds
else
  say [Aman] for (1) seconds
```

**Prediksi.** Apa yang diucapkan sprite pada pemeriksaan pertama, dan apa pada pemeriksaan kedua? Tulis dulu.

**Jalankan.** Susun P, klik bendera hijau, dan isi tabel penelusuran:

| Blok | x | Kondisi (benar atau salah) | Ucapan |
| --- | --- | --- | --- |
| `go to x: (70) y: (0)` | | | |
| `if <(x position) > (50)>` (pertama) | | | |
| `move (-30) steps` | | | |
| `if <(x position) > (50)>` (kedua) | | | |

**Selidiki.** Cocokkan dengan prediksimu. Kondisi yang sama memberi jawaban berbeda karena nilai `x position` sudah berubah di antara dua pemeriksaan.

## Contoh terselesaikan

Penelusuran program P:

| Blok | x | Kondisi | Ucapan | Alasan |
| --- | --- | --- | --- | --- |
| `go to x: (70) y: (0)` | 70 | belum diperiksa | tidak ada | Sprite loncat ke x = 70. |
| `if <(x position) > (50)>` (pertama) | 70 | benar (70 > 50) | "Terlalu kanan" | Kondisi benar, jadi cabang `then` berjalan; cabang `else` dilewati. |
| `move (-30) steps` | 40 | belum diperiksa | tidak ada | Maju -30 pada arah 90 menggeser ke kiri. |
| `if <(x position) > (50)>` (kedua) | 40 | salah (40 > 50 salah) | "Aman" | Kondisi salah, jadi cabang `else` berjalan. |

Tiga hal yang perlu diingat. Pertama, `if ... else` menjalankan **tepat satu** dari dua cabang. Kedua, kondisi diperiksa **saat blok itu dijangkau**, satu kali, bukan terus-menerus. Ketiga, `if` tanpa `else` hanya melakukan sesuatu bila benar; bila salah, program langsung lanjut ke blok berikutnya.

Kondisi juga bisa datang dari sensor: `<key [space] pressed?>` benar selama tombol spasi ditekan, dan `<touching [edge]?>` benar bila sprite menyentuh tepi panggung. Karena diperiksa sekali saat dijangkau, kondisi sensor biasanya dibungkus `forever` supaya diperiksa terus-menerus.

## Contoh setengah jadi

Sprite di x = -20 harus mengucapkan "Di kiri tengah" bila berada di kiri titik tengah panggung. Isi bagian kosong, lalu telusuri.

```text
when green flag clicked
go to x: (-20) y: (0)
if <(x position) < (____)> then
  say [Di kiri tengah] for (1) seconds
else
  say [Di kanan tengah] for (1) seconds
```

Sebut ucapan yang muncul. Lalu ubah posisi awal menjadi x = 30 dan sebut ucapan yang baru.

## Susun urutannya

Enam baris berikut sudah diacak. Susun menjadi program yang mengucapkan "Kanan" bila x lebih besar dari 0 dan "Kiri" bila tidak, dengan sprite mulai di x = 30.

- **A.** `when green flag clicked`
- **B.** `if <(x position) > (0)> then`
- **C.** `  say [Kanan] for (1) seconds` (di dalam `then`)
- **D.** `else`
- **E.** `go to x: (30) y: (0)`
- **F.** `  say [Kiri] for (1) seconds` (di dalam `else`)

Tulis urutan hurufnya. Jelaskan mengapa `go to` harus sebelum `if`.

## Latihan

1. **Ubah.** Pada program P, ganti angka 50 menjadi 30 pada kondisi kedua saja. Prediksi ucapan kedua, lalu telusuri.
2. **Buat.** Tulis program yang menaruh sprite di x = -100 dan mengucapkan "Jauh" bila x lebih kecil dari -50, kalau tidak "Dekat". Telusuri.
3. **Buat.** Tulis program dengan `forever` dan `if <key [right arrow] pressed?> then` yang menggeser sprite 10 langkah ke kanan. Kapan kondisi diperiksa?
4. **Pseudocode.** Tulis kartu instruksi "membawa payung" dengan satu kondisi: bila hujan, bawa payung; kalau tidak, tidak.
5. **Jelaskan.** Dengan dua kalimat, jelaskan beda `if` dan `if ... else`.

## Latihan bercampur

Percabangan baru dikenalkan minggu ini, jadi dua soal ini mencampur topik lama; latihan bercampur yang memuat percabangan dimulai di modul berikutnya.

1. Sprite mulai di (0, 0) menghadap kanan. Program: `repeat (4)`, lalu di dalamnya `move (30) steps` dan `if <(x position) > (50)> then turn right (90) degrees`. Di mana sprite berhenti dan menghadap ke mana? (`SMP7-1-M3`, `SMP7-1-M5`)
2. Sprite di (0, 0) menghadap kanan menjalankan `move (30) steps`, `turn left (90) degrees`, `move (50) steps`. Di mana ia berhenti dan menghadap ke mana? (`SMP7-1-M3`)

Soal 1 sudah memakai `if`; kamu menelusurinya dengan tabel putaran seperti di `SMP7-1-M5`.

## Ulang berjarak

Kerjakan ulang tanpa melihat modul ini, lalu cocokkan:

- **Minggu depan** (`SMP7-1-M9`): tulis satu kondisi yang benar dan satu yang salah untuk sprite di x = 20.
- **Sekitar sebulan lagi** (`SMP7-1-M13`): tulis `if ... else` yang membuat sprite mengucap dua hal berbeda untuk dua keadaan.
- **Akhir semester** (`SMP7-1-M14`): jelaskan kapan kondisi diperiksa dan kapan perlu `forever`.

## Kesalahan umum

- **Mengira kondisi diperiksa terus-menerus.** Tanpa `forever` atau perulangan, ia diperiksa sekali. Kenali: sprite tidak bereaksi saat tombol ditekan sesudah pemeriksaan lewat.
- **Menukar tanda `>` dan `<`.** Hasilnya terbalik. Kenali: cabang yang berjalan selalu kebalikan dari yang kamu mau.
- **Salah indentasi.** Blok di luar `if` berjalan setiap kali. Kenali: ucapan muncul padahal kondisinya salah.
- **Mengira `else` punya kondisi sendiri.** `else` hanya berarti "kalau kondisi di atas salah".
- **Mengira kondisi menghitung nilai.** Kondisi hanya bernilai benar atau salah, bukan angka.

## Cek mandiri

Tutup modul, jawab tanpa melihat, lalu periksa.

1. Apa arti kondisi, dan nilai apa saja yang mungkin?
2. Sprite di x = 10 menjalankan `if <(x position) > (50)> then say [A] else say [B]`. Apa yang diucapkan?
3. Mengapa kondisi sensor biasanya dibungkus `forever`?

Daftar periksa (kosong; kamu isi sendiri, tidak dikumpulkan):

- [ ] Aku bisa menulis `if` dan `if ... else`.
- [ ] Aku bisa menelusuri cabang yang berjalan.
- [ ] Aku bisa menyebut kapan kondisi diperiksa.

Kunci: (1) pertanyaan yang jawabannya benar atau salah; (2) "B", karena 10 > 50 salah; (3) agar diperiksa terus-menerus, bukan sekali.

## Langkah berikutnya

`SMP7-1-M9`, "Variabel". Kamu akan menyimpan angka bernama, misalnya skor, supaya kondisi bisa memeriksa sesuatu yang kamu hitung sendiri.

## Catatan untuk guru

- **Waktu:** 2 JP x 40 menit `[asumsi]` (silabus bagian 2). Berpasangan boleh untuk "Prediksi dulu" dan "Latihan"; bukan jaminan efek belajar.
- **Alat:** Scratch tanpa akun murid; nama blok bisa berbeda menurut bahasa antarmuka. Penulis menelusuri tangan semua program di modul ini dan tidak menjalankannya di editor Scratch.
- **Butir CP:** corpus memetakan minggu ini ke `D-BK-e` dan `DK-BK-c`. Modul ini tidak menyatakan CP "terpenuhi"; ia hanya melatih menuliskan instruksi berkondisi.
- **Kunci "Prediksi dulu":** pemeriksaan pertama "Terlalu kanan" (x = 70, benar); kedua "Aman" (x = 40, salah).
- **Kunci "Contoh setengah jadi":** angka 0; ucapan "Di kiri tengah" untuk x = -20; untuk x = 30 ucapan "Di kanan tengah".
- **Kunci "Susun urutannya":** A, E, B, C, D, F. `go to` harus sebelum `if` agar kondisi memeriksa posisi yang sudah ditetapkan.
- **Kunci latihan:** (1) sprite di x = 40, 40 > 30 benar: "Terlalu kanan". (2) `go to x: (-100) y: (0)`, `if <(x position) < (-50)> then say [Jauh] else say [Dekat]`; -100 < -50 benar: "Jauh". (3) kondisi diperiksa tiap putaran `forever`, jadi sprite bergerak selama tombol ditekan. (4) "Bila hujan, bawa payung; kalau tidak, tidak." (5) `if` hanya punya cabang benar; `if ... else` punya dua cabang dan menjalankan tepat satu.
- **Kunci "Latihan bercampur":** (1) x berturut-turut 30, 60, 60, 30; kondisi benar pada putaran 2 dan 3, jadi sprite berputar dua kali (arah 180 lalu 270, ditampilkan -90): berhenti di (30, -30) menghadap kiri (arah -90). (2) x = 30, lalu arah 0 (atas), y = 50: berhenti di (30, 50) menghadap atas.
- **Petunjuk bertahap:** (a) tulis nilai awal; (b) hitung perubahan tiap blok; (c) periksa kondisi dengan nilai saat itu.
- **AI:** tanpa AI. Kebijakan `smp-coding` (silabus bagian 7.1): AI generatif hanya demonstrasi guru, tanpa akun murid; asesmen tanpa AI.
- **Privasi:** tanpa nama murid pada berkas proyek.
- **Unsur pembelajaran:** ingat kembali dan jarak (`K`), PRIMM (`K` usia 11 sampai 14), tabel penelusuran (`K`), contoh lengkap lalu setengah jadi (`K`), Parsons (`M`), latihan bercampur (`K`).
