## Untuk siapa modul ini

Modul ini untuk murid kelas X jalur B (Web dengan JavaScript, TypeScript, dan Bun), minggu `B-X1-M9` silabus v1.4.1: variabel, tipe, dan ekspresi di JavaScript, serta masukan dan keluaran. Prasyarat: modul `b-x1-m8` (menjalankan skrip dengan Bun, `console.log`, dan menukar dua nilai). Modul ini mengajar dari awal dan tidak mengandaikan kamu pernah memprogram, termasuk di SMP. Bila kamu sudah pernah memakai bahasa lain, urutannya tetap sama: tebak dulu, lengkapi contoh, susun baris, baru menulis dari halaman kosong.

Modul ini berstatus DRAF: karangan penyusun, belum ditinjau pemilik. Butir `E-BK-d` (solusi program sederhana dalam format pseudocode) dipetakan silabus sebagai dipenuhi jalur ini; modul draf ini belum dihitung sebagai pemenuhan butir itu.

Contoh dijalankan penyusun dengan Bun 1.4.4 per 2026-11. Tugas baca-dan-prediksi ditandai `AI: tanpa AI` karena tujuannya melatih membaca dan menelusuri kode sendiri. Selain itu AI generatif boleh dipakai dengan etika dan dicatat, tanpa data pribadi, kata sandi, atau tugas bernilai pada permintaanmu. Saran: jawab dulu sendiri, baru minta penjelasan atau petunjuk bertahap.

## Ingat kembali

Jawab dari ingatan, baru cek di bagian kunci. Soal 1 dan 2 dari `b-x1-m8`, soal 3 dari modul fondasi `fondasi-representasi-data`, soal 4 dari `fondasi-keamanan-dasar`.

1. Tulis perintah terminal yang menjalankan berkas `halo.js` dengan Bun.
2. Mengapa menukar dua nilai membutuhkan satu nilai sementara?
3. Berapa nilai desimal bilangan biner 1101?
4. Mengapa data pribadi, kata sandi, dan kunci tidak boleh ditempel ke layanan AI?

## Tujuan

Setelah modul ini kamu dapat:

- menyimpan nilai dalam variabel dengan `let` dan `const` dan menjelaskan bedanya;
- membedakan tipe `number`, `string`, dan `boolean` dan memeriksanya dengan `typeof`;
- menghitung ekspresi dengan `+`, `-`, `*`, `/`, `%`, dan `**` sesuai urutan operasi;
- membaca masukan dari argumen perintah dan dari `prompt()`, lalu menulis keluaran dengan `console.log` (keluaran minggu ini: skrip hitung yang berinteraksi).

## Prediksi dulu

Baca skrip ini dan **tebak dulu, tulis jawabanmu per baris, baru jalankan**. `typeof` memberi tahu tipe sebuah nilai. `%` adalah sisa bagi.

```js
// prediksi-tipe.js
let panjang = 7;
let lebar = 2;
console.log(panjang / lebar);
console.log(panjang % lebar);
console.log("7" + 2);
console.log("7" * 2);
console.log(typeof panjang);
console.log(typeof "7");
console.log(0.1 + 0.2);
```

1. Apa yang tercetak pada tiap baris `console.log`?
2. Apa beda `7` dan `"7"` bagi komputer?
3. Mengapa `"7" + 2` dan `"7" * 2` berperilaku berbeda?

## Contoh terselesaikan

**Variabel dan tipe.** Variabel adalah kotak bernama yang menyimpan satu nilai. `let` untuk nilai yang akan berubah, `const` untuk nilai yang tidak boleh diisi ulang. Tiga tipe dasar: `number` (bilangan, bulat atau pecahan, ditulis dengan titik desimal seperti `3.5`), `string` (teks di dalam tanda kutip), dan `boolean` (`true` atau `false`). Keluaran skrip prediksi di atas:

```text
3.5
1
72
14
number
string
0.30000000000000004
```

Perhatikan: `7 / 2` memberi `3.5`, tidak dibulatkan. `"7" + 2` menyambung teks menjadi `"72"`, sedangkan `"7" * 2` mengubah teks menjadi angka dulu dan memberi `14`. Kejutan ini sering menjebak, jadi ubah masukan menjadi angka dengan `Number(...)` sebelum menghitung. Bilangan pecahan disimpan dengan galat pembulatan kecil, sehingga `0.1 + 0.2` bukan tepat `0.3`.

**Urutan operasi.** `*`, `/`, `%`, dan `**` dihitung sebelum `+` dan `-`; tanda kurung mengubah urutannya. Latihan di bawah menguji ini.

**Masukan dari argumen.** Kata-kata yang kamu ketik setelah nama berkas dibaca lewat `Bun.argv`. Dua isi pertamanya adalah alamat Bun dan alamat skrip, jadi argumenmu mulai dari `Bun.argv[2]`. Semua argumen berupa teks, maka dibungkus `Number(...)`.

```js
// luas.js
const panjang = Number(Bun.argv[2]);
const lebar = Number(Bun.argv[3]);
console.log("Luas:", panjang * lebar);
console.log("Keliling:", 2 * (panjang + lebar));
```

```sh
bun run luas.js 6 4
```

Keluarannya:

```text
Luas: 24
Keliling: 20
```

Bila argumen kurang atau bukan angka, `Number(...)` menghasilkan `NaN` ("bukan angka") dan semua hitungan ikut `NaN`.

**Masukan dari pertanyaan.** `prompt("Panjang?")` menampilkan pertanyaan, menunggu kamu mengetik, lalu mengembalikan jawabanmu sebagai teks (dokumentasi Bun menyebutnya untuk program terminal interaktif). Versi di bawah dijalankan dengan jawaban 6 dan 4 yang dikirim lewat `printf`; saat kamu mengetik langsung, jawabanmu tampil di layar setelah tiap pertanyaan.

```js
// tanya.js
const panjang = Number(prompt("Panjang?"));
const lebar = Number(prompt("Lebar?"));
console.log("Luas:", panjang * lebar);
```

```sh
printf '6\n4\n' | bun run tanya.js
```

Keluarannya (pertanyaan berderet karena jawabannya tidak diketik):

```text
Panjang? Lebar? Luas: 24
```

## Contoh setengah jadi

Rumus suhu: Fahrenheit sama dengan Celsius dikali 9, dibagi 5, ditambah 32. Lengkapi bagian `____`; skrip dijalankan dengan `bun run suhu-setengah.js 100`.

```js setengah-jadi
// suhu-setengah.js
const celsius = Number(Bun.argv[2]);
const fahrenheit = ____ * 9 / 5 + ____;
console.log(celsius, "derajat Celsius =", ____, "derajat Fahrenheit");
```

## Soal Parsons

Susun baris-baris di bawah (sudah diacak) menjadi skrip yang membaca panjang satu sisi persegi dari argumen, lalu mencetak luas dan kelilingnya. Luas dicetak lebih dulu.

```text
(a) console.log("Keliling:", 4 * sisi);
(b) const sisi = Number(Bun.argv[2]);
(c) console.log("Luas:", sisi * sisi);
```

## Latihan

1. `AI: tanpa AI` **Baca dan prediksi.** Tanpa menjalankan, tulis apa yang tercetak:

   ```js
   let x = 5;
   x = x + 2;
   x = x * 3;
   console.log(x);
   console.log("x" + 1);
   console.log(x + "1");
   ```
2. `AI: tanpa AI` **Urutan operasi.** Hitung dengan tangan lalu cocokkan dengan Bun: `2 + 3 * 4`, `(2 + 3) * 4`, `10 % 4`, `2 ** 3`, dan `10 / 4`.
3. `AI: boleh` **Pseudocode dulu.** Tulis pseudocode lalu skrip yang membaca panjang dan lebar dari argumen dan mencetak luas dan keliling persegi panjang.
4. `AI: boleh` **Konversi suhu.** Tulis skrip yang menanyakan suhu Celsius dengan `prompt()` lalu mencetak suhu Fahrenheit. Uji dengan 0, 37, dan 100.
5. *Opsional:* **catatan pemakaian AI.** Bila memakai AI generatif, jawab nomor 3 sendiri dulu, lalu minta penjelasan atau petunjuk bertahap, bukan skrip jadi. Catat alatnya, tujuanmu, garis besar perintahmu, bagian yang kamu pakai, dan cara memeriksanya (jalankan dengan tiga masukan berbeda). Jangan menaruh data pribadi atau tugas bernilai pada perintah.

## Latihan bercampur

1. Tulis skrip yang membaca dua bilangan dari argumen, menukar nilainya memakai satu variabel sementara (dari `b-x1-m8`), lalu mencetak keduanya.
2. Ubah bilangan biner 1011 menjadi desimal dengan tangan, lalu periksa dengan `console.log(parseInt("1011", 2))`.
3. Beri nama berkas yang baik untuk skrip konversi suhu, dan tulis perintah Git untuk mencatatnya sebagai satu commit.

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `b-x1-m10` (pertanyaan 1), sekitar tiga minggu lagi di `b-x1-m12` (pertanyaan 2), dan sekitar delapan minggu lagi di semester berikutnya, modul `b-x2-m2` (pertanyaan 3). Jawab sekarang lalu simpan.

1. Berapa hasil `7 % 3` dan `7 / 2` di JavaScript?
2. Apa beda `let` dan `const`?
3. Apa hasil `typeof "5"`, dan apa yang tercetak oleh `console.log("5" + 3)`?

## Kesalahan umum

- **Argumen dianggap angka.** `Bun.argv[2]` selalu teks. Skrip yang mencetak `Bun.argv[2] + Bun.argv[3]` dengan masukan `6` dan `4` mencetak `64`, bukan `10`, dan `typeof` argumen itu adalah `string`. Bungkus dengan `Number(...)`.
- **Mengisi ulang `const`.** Menulis `pi = 3;` setelah `const pi = 3.14;` menghentikan skrip dengan pesan seperti `error: Cannot assign to "pi" because it is a constant`. Pakai `let` bila nilainya memang harus berubah.
- **Salah mulai indeks argumen.** Argumen pertamamu ada di `Bun.argv[2]`, bukan `[0]`. Lupa memberi argumen menghasilkan `NaN`.
- **Mengira `0.1 + 0.2` tepat 0,3.** Hasilnya `0.30000000000000004` karena pecahan disimpan dengan pembulatan; jangan membandingkan pecahan dengan tepat.
- **Mengira `=` berarti "sama dengan" pelajaran matematika.** `x = x + 2` bukan persamaan yang mustahil; artinya "hitung `x + 2`, lalu simpan ke `x`".

## Cek mandiri

- [ ] Saya dapat menjelaskan beda `let` dan `const`.
- [ ] Saya dapat menyebut tiga tipe dasar dan memeriksanya dengan `typeof`.
- [ ] Saya dapat menghitung ekspresi dengan urutan operasi yang benar.
- [ ] Saya dapat membaca masukan dari `Bun.argv` dan `prompt()` dan mengubahnya menjadi angka.
- [ ] Saya menulis pseudocode sebelum skripnya.

## Kunci dan petunjuk

**Ingat kembali.** 1: `bun run halo.js`. 2: karena `a = b` menimpa nilai `a` lebih dulu; nilai lamanya harus disimpan di tempat sementara. 3: 8 + 4 + 1 = 13. 4: layanan AI dapat menyimpan atau memakai yang kamu kirim, dan kunci atau kata sandi yang bocor bisa disalahgunakan (dari `fondasi-keamanan-dasar`).

**Prediksi dulu.** 1: `3.5`, `1`, `72`, `14`, `number`, `string`, `0.30000000000000004`. 2: `7` adalah angka yang bisa dihitung; `"7"` adalah teks berisi karakter 7. 3: `+` pada teks menyambung, `*` hanya bermakna untuk angka sehingga teks diubah menjadi angka dulu.

**Contoh setengah jadi.** Isian berurutan: `celsius`, `32`, `fahrenheit`. Kuncinya:

```js
// suhu.js
const celsius = Number(Bun.argv[2]);
const fahrenheit = celsius * 9 / 5 + 32;
console.log(celsius, "derajat Celsius =", fahrenheit, "derajat Fahrenheit");
```

```sh
bun run suhu.js 100
```

```text
100 derajat Celsius = 212 derajat Fahrenheit
```

**Soal Parsons.** Urutan benar: b, c, a. Baris (b) harus pertama karena `sisi` dipakai baris lain; luas dicetak sebelum keliling.

**Latihan.** 1: `x` menjadi 5, 7, 21; tercetak `21`, `x1`, `211` (21 digabung dengan teks "1"). 2: `14`, `20`, `2`, `8`, `2.5`. Bun mencetak `14 20 2 8 2.5` bila dijadikan satu `console.log`. 3: contoh pseudocode: `PANJANG = argumen 1 sebagai angka`; `LEBAR = argumen 2 sebagai angka`; `CETAK PANJANG * LEBAR`; `CETAK 2 * (PANJANG + LEBAR)`. Skrip seperti `luas.js` di atas. 4: 0 menjadi 32, 37 menjadi 98.6, 100 menjadi 212. Jawab pertanyaan `prompt()` dengan `Number(prompt("Celsius?"))`.

**Latihan bercampur.** 1: contoh: `let a = Number(Bun.argv[2]); let b = Number(Bun.argv[3]); let sementara = a; a = b; b = sementara; console.log(a, b);`. 2: 8 + 0 + 2 + 1 = 11; Bun mencetak `11`. 3: contoh `suhu-celsius.js`; perintah: `git add suhu-celsius.js` lalu `git commit -m "Konversi suhu"`.

**Ulang berjarak.** 1: `7 % 3` adalah 1 dan `7 / 2` adalah 3.5. 2: `let` boleh diisi ulang, `const` tidak. 3: `string`; tercetak `53`.

## Langkah berikutnya

Modul berikut: `b-x1-m10` (percabangan dan logika Boolean), yang membuat skripmu mengambil keputusan, termasuk memakai `%` untuk menguji genap dan ganjil. Modul terkait: `matkom-sistem-bilangan-basis` untuk bilangan biner lebih dalam dan `matkom-bilangan-bertanda-dan-luapan` untuk batas bilangan di komputer. Bacaan lanjut: MDN tentang `let`, `const`, dan `Number`; dokumentasi Bun tentang `Bun.argv`.
