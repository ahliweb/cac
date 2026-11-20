## Untuk siapa modul ini

Modul ini untuk murid kelas XI jalur B (Web dengan JavaScript, TypeScript, dan Bun), minggu `B-XI1-M1` silabus v1.4.1: proses rekayasa produk digital. Prasyarat: modul `b-x2-m12` (Git dan kolaborasi dasar). Kamu juga memakai larik dan fungsi dari `b-x1-m12` dan `b-x2-m1`.

Modul ini berstatus DRAF: karangan penyusun, belum ditinjau pemilik. Butir `F-BK-a` (alur proses pengembangan program atau produk digital) dipetakan silabus sebagai dipenuhi jalur ini; modul draf ini belum dihitung sebagai pemenuhan butir itu.

Semua contoh adalah kasus karangan: aplikasi "daftar tugas kelas" milik pengguna fiktif, tanpa data nyata, tanpa akun, dan tanpa layanan luar. Kode dijalankan penyusun dengan Bun 1.4.4 per 2026-11. Tugas baca-dan-prediksi ditandai `AI: tanpa AI`; selain itu AI generatif boleh dipakai dengan etika dan dicatat, tanpa data pribadi, kata sandi, atau tugas bernilai pada permintaanmu.

## Ingat kembali

Jawab dari ingatan dulu, baru cek di bagian kunci. Soal 1 dari `b-x2-m13`, soal 2 dari `b-x2-m12`, soal 3 dari `b-x2-m7`.

1. Mengapa fungsi penghasil langkah dipisah dari kode penggambaran?
2. Apa yang terjadi bila dua orang mengubah baris yang sama di cabang berbeda lalu digabung, dan langkah apa yang menyelesaikannya?
3. Mengapa pemeriksaan kurung seimbang cocok memakai tumpukan?

## Tujuan

Setelah modul ini kamu dapat:

- menguraikan alur kebutuhan, rancangan, implementasi, uji, dan rilis, serta pemeliharaan sesudahnya;
- menulis cerita pengguna dan kriteria penerimaan untuk aplikasi kecil;
- menjelaskan mengapa kesalahan paham kebutuhan makin mahal bila ditemukan makin lambat;
- menghubungkan tiap tahap dengan alat yang sudah kamu kenal: Git, pengujian, dan dokumentasi (keluaran minggu ini: dokumen rancangan satu halaman).

## Prediksi dulu

Ini tugas baca-dan-prediksi, `AI: tanpa AI`. **Tebak dulu, tulis jawabanmu, baru jalankan.** Kriteria penerimaan disimpan sebagai data, lalu dihitung.

```js
const kriteria = [
  { teks: "Tugas baru muncul di daftar", lulus: true },
  { teks: "Tugas selesai bisa dicoret", lulus: true },
  { teks: "Daftar tersimpan setelah halaman dimuat ulang", lulus: false },
];

const lulus = kriteria.filter((k) => k.lulus).length;
console.log(`${lulus} dari ${kriteria.length} kriteria terpenuhi`);
for (const k of kriteria) {
  if (!k.lulus) console.log("Belum: " + k.teks);
}
```

1. Apa dua baris yang tercetak?
2. Bila kriteria ketiga tidak pernah ditulis, apakah program tetap menyebut semuanya terpenuhi? Apa artinya bagi produknya?

## Contoh terselesaikan

Keluaran pada percobaan penyusun:

```text
2 dari 3 kriteria terpenuhi
Belum: Daftar tersimpan setelah halaman dimuat ulang
```

Program itu hanya menghitung, tetapi ia memperlihatkan inti minggu ini: **produk digital dibangun lewat alur, bukan lewat menulis kode sampai jadi.** Satu versi alur yang umum:

| Tahap | Pertanyaan yang dijawab | Keluaran |
| --- | --- | --- |
| Kebutuhan | Siapa pengguna dan apa yang ia butuhkan? | cerita pengguna |
| Rancangan | Bagaimana bentuk dan bagian-bagiannya? | dokumen rancangan satu halaman |
| Implementasi | Bagaimana dikodekan? | kode di cabang Git |
| Uji | Apakah memenuhi kriteria? | hasil uji |
| Rilis | Siapa yang menerima, kapan, versi berapa? | versi bertanda |
| Pemeliharaan | Apa yang rusak atau perlu diubah? | perbaikan dan versi baru |

Pemeliharaan sesudah rilis sering memakan waktu paling banyak. **Cerita pengguna** menulis kebutuhan dari sisi pengguna: "Sebagai ketua kelas, saya ingin menambah tugas beserta tenggatnya, agar teman-teman tidak lupa." **Kriteria penerimaan** mengubahnya menjadi sesuatu yang bisa diperiksa: "Diberikan daftar kosong, ketika tugas 'Laporan' ditambah, maka 'Laporan' muncul di daftar." Kriteria tanpa kata yang bisa diukur, seperti "mudah dipakai", belum bisa diuji.

Mengapa tahap awal penting? Salah paham yang ditemukan di kebutuhan cukup dibetulkan dengan menghapus satu kalimat. Bila ditemukan setelah rilis, kamu mengubah kode, ujian, dokumen, dan pengguna harus memperbarui. Itu sebabnya banyak tim bekerja dalam **iterasi** pendek: satu putaran kecil melewati semua tahap, lalu belajar dari hasilnya (gagasan ini yang dirumuskan Agile Manifesto; bacaannya ada di rujukan). Iterasi bukan berarti tanpa rencana. Tahap tetap ada, hanya putarannya kecil.

Hubungkan dengan yang sudah kamu pelajari. Cabang Git (`b-x2-m12`) memisahkan satu cerita dari yang lain. Pengujian dengan data kecil yang jawabannya sudah dihitung (`b-x2-m13`) memeriksa kriteria. Dua minggu ini mengulang alur itu dengan kesadaran penuh. Berikut pemeriksa rilis yang lebih ketat, dijalankan penyusun:

```js
function siapRilis(kriteria) {
  return kriteria.every((k) => k.lulus);
}

const hasilUji = [
  { teks: "Tugas baru muncul di daftar", lulus: true },
  { teks: "Tugas selesai bisa dicoret", lulus: true },
  { teks: "Daftar tersimpan setelah halaman dimuat ulang", lulus: false },
];

console.log(siapRilis(hasilUji));
hasilUji[2].lulus = true;
console.log(siapRilis(hasilUji));
```

```text
false
true
```

Perhatikan bahwa pemeriksa ini hanya sebaik daftar kriterianya. Ia menyatakan "siap" bila semua kriteria yang **kamu tulis** lulus, bukan semua yang pengguna butuhkan. Karena itu kebutuhan ditulis bersama pengguna, bukan ditebak sendirian. Pengecekan itu "bisa dijalankan", bukan bukti bahwa aplikasinya benar untuk semua orang.

## Contoh setengah jadi

Lengkapi cerita pengguna dan satu kriteria penerimaan untuk fitur "mencoret tugas selesai".

```text
Sebagai ____, saya ingin mencoret tugas yang sudah selesai, agar ____.
Diberikan daftar berisi tugas "Laporan", ketika ____, maka "Laporan" tampil dengan coretan.
```

## Soal Parsons

Susun baris berikut (sudah diacak) menjadi fungsi `persenTerpenuhi` yang mengembalikan bilangan 0 sampai 100. `AI: tanpa AI`.

```text
(a) }
(b) return (lulus / kriteria.length) * 100;
(c) function persenTerpenuhi(kriteria) {
(d) const lulus = kriteria.filter((k) => k.lulus).length;
```

## Latihan

1. `AI: boleh` **Cerita pengguna.** Pilih aplikasi kecil karangan, misalnya peminjaman buku kelas. Tulis tiga cerita pengguna dengan satu pengguna fiktif tiap cerita.
2. `AI: boleh` **Kriteria.** Untuk satu cerita nomor 1, tulis tiga kriteria penerimaan berbentuk "diberikan, ketika, maka" dan sebut mana yang bisa diperiksa dengan program.
3. `AI: tanpa AI` **Rancangan dulu.** Tulis pseudocode `persenTerpenuhi` di kertas, lalu kodekan, lalu uji pada data kecil yang jawabannya sudah kamu hitung.
4. `AI: tanpa AI` **Susun urutan.** Urutkan: rilis versi 1.0, tulis kriteria penerimaan, jalankan uji, tulis cerita pengguna, implementasi di cabang. Tahap mana yang boleh kembali ke tahap sebelumnya, dan mengapa?
5. *Opsional:* **catatan pemakaian AI.** Kerjakan nomor 2 sendiri dulu, lalu minta AI menilai apakah kriteriamu bisa diperiksa, bukan menulis ulang semuanya. Catat alat, tujuan, garis besar perintah, bagian yang kamu pakai, dan cara memeriksanya. Jangan menaruh data pribadi atau tugas bernilai pada perintah.

## Latihan bercampur

1. `AI: boleh` Aplikasi daftar tugas punya tombol "urungkan" yang membatalkan aksi terakhir. Struktur data dari `b-x2-m7` mana yang cocok, dan mengapa?
2. `AI: boleh` Dua temanmu mengerjakan dua cerita berbeda yang sama-sama mengubah `index.html`. Bagaimana cabang Git (`b-x2-m12`) dipakai agar pekerjaan terpisah, dan apa yang terjadi saat digabung bila baris yang sama berubah?

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `b-xi1-m2` (pertanyaan 1), sekitar tiga minggu lagi di `b-xi1-m4` (pertanyaan 2), dan sekitar delapan minggu lagi di `b-xi1-m9` (pertanyaan 3). Jawab sekarang lalu simpan.

1. Sebutkan lima tahap alur pengembangan produk digital sesuai urutannya.
2. Tulis satu cerita pengguna dan satu kriteria penerimaan yang bisa diperiksa untuk fitur "menambah tugas".
3. Mengapa kesalahan paham kebutuhan makin mahal bila ditemukan makin lambat?

## Kesalahan umum

- **Menulis kode dulu, bertanya kemudian.** Kode yang tidak menjawab kebutuhan tetap harus dibuang.
- **Kriteria yang tidak bisa diperiksa.** "Aplikasi cepat dan bagus" tidak bisa dinyatakan lulus atau gagal.
- **Mengira iterasi berarti tanpa rencana.** Setiap putaran tetap melewati kebutuhan sampai uji.
- **Menganggap rilis sebagai akhir.** Setelah rilis ada pemeliharaan: galat, permintaan baru, dan pembaruan.
- **Menaruh data pengguna sungguhan di contoh.** Di kelas pakai pengguna dan data karangan.

## Cek mandiri

- [ ] Saya dapat menyebut tahap alur dari kebutuhan sampai pemeliharaan.
- [ ] Saya dapat menulis cerita pengguna dan kriteria penerimaan yang bisa diperiksa.
- [ ] Saya dapat menjelaskan mengapa perubahan di tahap akhir lebih mahal.
- [ ] Saya menghubungkan cabang Git dan pengujian dengan tahap alur.
- [ ] Saya tidak memakai data atau pengguna nyata dalam contoh.

## Kunci dan petunjuk

**Ingat kembali.** 1: supaya penghitungan bisa diuji di Bun tanpa peramban, dipakai ulang untuk tampilan lain, dan mudah mundur. 2: terjadi konflik; sunting berkas, buang tanda, `git add`, lalu `git commit`. 3: kurung tutup harus berpasangan dengan kurung buka terakhir yang belum tertutup, yaitu elemen teratas tumpukan.

**Prediksi dulu.** 1: `2 dari 3 kriteria terpenuhi` dan `Belum: Daftar tersimpan setelah halaman dimuat ulang`. 2: ya, program mencetak `2 dari 2 kriteria terpenuhi` dan tidak ada baris `Belum`; kebutuhan yang tidak ditulis tidak pernah diuji, sehingga produknya bisa "lulus" padahal belum berguna.

**Contoh setengah jadi.** Contoh jawaban: "ketua kelas" dan "teman-teman tahu mana tugas yang sudah beres"; "ketika tugas 'Laporan' ditandai selesai".

**Soal Parsons.** Urutan benar: c, d, b, a.

**Latihan.** 1: periksa tiap cerita berbentuk "sebagai ..., saya ingin ..., agar ...". 2: contoh: "diberikan buku 'A' tersedia, ketika dipinjam, maka status 'dipinjam'" bisa diperiksa dengan fungsi. 3: pseudocode: hitung yang lulus, bagi dengan jumlah, kalikan 100; uji pada 2 dari 4 lulus yang harus 50. 4: urutan: tulis cerita pengguna, tulis kriteria penerimaan, implementasi di cabang, jalankan uji, rilis versi 1.0. Uji gagal membawa kita kembali ke implementasi; uji yang mengungkap kebutuhan salah membawa kembali ke cerita pengguna.

**Latihan bercampur.** 1: tumpukan (LIFO): aksi terakhir yang dibatalkan lebih dulu. 2: tiap orang membuat cabang sendiri dengan `git switch -c`; saat digabung dengan baris sama berubah, terjadi konflik yang diselesaikan dengan menyunting, `git add`, dan `git commit`.

**Ulang berjarak.** 1: kebutuhan, rancangan, implementasi, uji, rilis. 2: contoh: "Sebagai ketua kelas, saya ingin menambah tugas beserta tenggat, agar teman tidak lupa"; "diberikan daftar kosong, ketika 'Laporan' ditambah, maka 'Laporan' muncul". 3: kesalahan di kebutuhan memengaruhi rancangan, kode, uji, dan dokumen sekaligus.

## Langkah berikutnya

Modul berikut: `b-xi1-m2` (TypeScript I: tipe dasar), yang menambahkan pemeriksaan tipe pada fungsi seperti `persenTerpenuhi`. Modul terkait: `pendamping-merancang-kebutuhan-sistem` untuk menggali kebutuhan dari profil pengguna fiktif. Bacaan lanjut: Agile Manifesto dan Panduan Mata Pelajaran Informatika yang ditautkan di rujukan.
