## Untuk siapa modul ini

Modul ini untuk murid kelas X jalur B (Web dengan JavaScript, TypeScript, dan Bun), minggu `B-X1-M8` silabus v1.4.1: lingkungan kerja (peramban, editor, Bun, Git) serta algoritma dan pseudocode. Prasyarat: modul fondasi `fondasi-komputer-dan-hardware` (FND-X1-M1) dan `fondasi-software-dan-sistem-operasi` (FND-X1-M2). Kamu belum perlu pernah memprogram sebelum modul ini.

Modul ini karangan penyusun dan disetujui pemilik program pada 2026-11-20 (keputusan lewat dialog; catatan tinjauan menjadi tindak lanjut revisi). Butir `E-BK-d` (solusi program sederhana dalam format pseudocode) dipetakan silabus sebagai dipenuhi jalur ini; pemenuhan butir mengikuti pemetaan silabus, bukan status modul.

Alat yang dipakai: peramban, editor teks, Bun, dan Git, di komputer lab atau komputer sendiri. Guru yang memasangnya (caranya ada di dokumentasi resmi Bun); kamu tidak perlu membuat akun di layanan mana pun. Semua contoh dijalankan penyusun dengan Bun 1.4.4 dan Git 2.43.0 per 2026-11; versi di komputermu mungkin berbeda.

Aturan AI: AI generatif boleh dipakai dengan etika dan dicatat, tanpa data pribadi, kata sandi, atau tugas bernilai pada permintaanmu. Saran: jawab dulu sendiri, baru minta penjelasan atau petunjuk bertahap. Setiap soal `Latihan` bertanda `AI: boleh` atau `AI: tanpa AI`.

## Ingat kembali

Jawab dari ingatan, baru cek di bagian kunci. Semua soal dari modul fondasi minggu pertama dan kedua.

1. Apa yang disimpan memori komputer Von Neumann, selain data?
2. Sebutkan tiga bagian siklus I-P-O dan satu contoh perangkat untuk masing-masing.
3. Sebutkan dua dari lima peran sistem operasi.
4. Beri nama yang lebih baik untuk berkas `Tugas Pertama!!.JS`, tanpa spasi dan karakter khusus.

## Tujuan

Setelah modul ini kamu dapat:

- membuat folder kerja dan menjalankan skrip `halo.js` dengan `bun run`;
- menyimpan versi pertama skrip dengan Git (`init`, `add`, `commit`, `log`);
- menjelaskan apa itu algoritma dan menulis pseudocode yang dekat dengan bahasa komputer;
- menulis tiga pseudocode (keluaran minggu ini bersama `halo.js`): mencetak salam, menukar dua nilai, dan mencari nilai terbesar.

## Prediksi dulu

Satu skrip JavaScript adalah berkas teks berisi perintah yang dijalankan dari atas ke bawah. `console.log(...)` mencetak nilainya ke layar. Baca skrip ini dan **tebak dulu, tulis jawabanmu, baru jalankan**.

```js
// prediksi.js
console.log("Halo");
console.log(2 + 3);
console.log("2 + 3");
console.log("a", "b");
console.log("Jumlah:", 2 + 3);
```

1. Berapa baris yang tercetak?
2. Mengapa baris kedua dan ketiga bisa berbeda, padahal isinya mirip?
3. Apa yang tercetak antara `a` dan `b`?

## Contoh terselesaikan

**Menyiapkan tempat kerja.** Buat folder bernama jelas, tanpa spasi dan huruf besar (aturan nama berkas dari modul fondasi), misalnya `kelas-x/b-x1`. Di dalamnya buat berkas `halo.js` dengan editor teks. Berkas yang disimpan harus berekstensi `.js`; mengganti ekstensi saja tidak mengubah isi menjadi skrip yang benar. Periksa alatnya di terminal:

```sh
bun --version
```

Keluarannya di komputer penyusun:

```text
1.4.4
```

**Skrip pertama.** Isi `halo.js`:

```js
// halo.js
console.log("Halo, dunia!");
console.log("Namaku murid-contoh.");
```

Jalankan dari folder yang sama dengan berkas itu:

```sh
bun run halo.js
```

Keluarannya:

```text
Halo, dunia!
Namaku murid-contoh.
```

Baris yang diawali `//` adalah komentar: dibaca manusia, dilewati komputer. Dalam siklus I-P-O, teks di berkas adalah masukan, Bun adalah proses, dan layar adalah keluaran.

**Menyimpan versi dengan Git.** Git mencatat riwayat berkas di foldermu. Perintahnya dijalankan di dalam folder `b-x1`. Nama dan surel yang dipakai Git ikut tertulis di setiap catatan, jadi tanyakan gurumu nama apa yang dipakai di kelas; jangan memakai surel pribadi. Contoh di bawah memakai nama karangan.

```sh
git init -b main
git config user.name "murid-contoh"
git config user.email "murid-contoh@contoh.example"
git add halo.js
git commit -m "Skrip pertama: halo.js"
git log --oneline
```

Keluarannya (alamat folder pada baris pertama dan kode di depan pesan commit berbeda di komputermu):

```text
Initialized empty Git repository in .../kelas-x/b-x1/.git/
[main (root-commit) 0030c39] Skrip pertama: halo.js
 1 file changed, 3 insertions(+)
 create mode 100644 halo.js
0030c39 Skrip pertama: halo.js
```

`git add` menyiapkan berkas, `git commit` menyimpan satu versi, dan `git log --oneline` menampilkan riwayatnya. `git status --short` menunjukkan keadaan: `??` berkas belum dilacak, `A` sudah disiapkan, `M` berkas yang sudah dicatat telah berubah. Tanpa nama dan surel, Git bisa menolak commit dengan pesan `Author identity unknown`; bacalah pesannya dan tanyakan guru.

**Algoritma dan pseudocode.** Algoritma adalah urutan langkah yang jelas untuk menyelesaikan satu masalah. Pseudocode adalah cara menuliskan langkah itu dengan kata-kata yang dekat dengan kode, tetapi tanpa aturan tulis yang ketat. Di modul ini `=` berarti "beri nilai" dan kata `CETAK` mencetak sesuatu. Contoh: menukar dua nilai. Menukar isi dua gelas butuh gelas ketiga; menukar dua variabel juga butuh satu tempat sementara.

```text
A = 3
B = 8
SEMENTARA = A
A = B
B = SEMENTARA
CETAK A, B
```

Telusuri satu baris demi satu baris:

| Langkah | A | B | SEMENTARA |
| --- | --- | --- | --- |
| awal | 3 | 8 | - |
| `SEMENTARA = A` | 3 | 8 | 3 |
| `A = B` | 8 | 8 | 3 |
| `B = SEMENTARA` | 8 | 3 | 3 |

Terjemahan ke JavaScript. `let` membuat "kotak bernama" yang bisa diisi ulang; minggu depan dibahas lengkap.

```js
// tukar.js
let a = 3;
let b = 8;
let sementara = a;
a = b;
b = sementara;
console.log(a, b);
```

Keluarannya:

```text
8 3
```

Pseudocode untuk nilai terbesar dari tiga bilangan A, B, dan C:

```text
TERBESAR = A
JIKA B > TERBESAR MAKA TERBESAR = B
JIKA C > TERBESAR MAKA TERBESAR = C
CETAK TERBESAR
```

Untuk A = 4, B = 9, C = 6: `TERBESAR` mula-mula 4, menjadi 9 setelah dibandingkan dengan B, tetap 9 setelah dibandingkan dengan C, dan 9 yang dicetak. Kata `JIKA` baru diterjemahkan ke JavaScript pada minggu 10.

## Contoh setengah jadi

Sekarang sebagian diisi olehmu. Tujuannya sama: menukar dua nilai. Lengkapi bagian `____`.

```js setengah-jadi
// tukar-setengah.js
let x = 10;
let y = 25;
let sementara = ____;
x = ____;
y = ____;
console.log(x, y);
```

## Soal Parsons

Susun baris-baris di bawah (sudah diacak) menjadi skrip yang mencetak luas persegi panjang dengan panjang 6 dan lebar 4. `*` berarti kali.

```text
(a) console.log("Luas:", luas);
(b) let lebar = 4;
(c) let luas = panjang * lebar;
(d) let panjang = 6;
```

## Latihan

1. `AI: boleh` **Ubah `halo.js`.** Buat skrip yang mencetak tiga baris: salam, nama panggilan karangan, dan nama kelas karangan. Jalankan dan cocokkan dengan tebakanmu.
2. `AI: tanpa AI` **Telusuri.** Skrip berikut dijalankan. Buat tabel nilai `a`, `b`, `c`, dan `t` setelah tiap baris, lalu tulis apa yang tercetak.

   ```js
   let a = 5;
   let b = 9;
   let c = 1;
   let t = a;
   a = b;
   b = c;
   c = t;
   console.log(a, b, c);
   ```
3. `AI: boleh` **Pseudocode dulu.** Tulis pseudocode untuk mencari nilai terbesar dari empat bilangan A, B, C, dan D. Telusuri dengan A = 2, B = 7, C = 7, D = 5.
4. `AI: boleh` **Git.** Buat repositori di folder latihanmu, catat `halo.js` dengan satu commit, ubah satu baris, lalu catat commit kedua. `git log --oneline` harus menampilkan dua baris.
5. *Opsional:* **catatan pemakaian AI.** Bila memakai AI generatif, jawab nomor 3 sendiri dulu, lalu minta penjelasan atau petunjuk bertahap, bukan jawaban jadi. Catat alatnya, tujuanmu, garis besar perintahmu, bagian yang kamu pakai, dan cara memeriksanya (telusuri dengan tabel). Jangan menaruh data pribadi atau tugas bernilai pada perintah.

## Latihan bercampur

1. Pada skrip `halo.js`, tunjuk masukan, proses, dan keluarannya.
2. Perbaiki nama folder dan berkas `Latihan Pertama/Halo Dunia.JS` supaya sesuai aturan nama yang baik.
3. Di modul fondasi pertama kamu menulis langkah membuat teh manis. Tulis ulang sebagai pseudocode yang memakai satu baris `JIKA` (misalnya bila gula habis).

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `b-x1-m9` (pertanyaan 1), sekitar tiga minggu lagi di `b-x1-m11` (pertanyaan 2), dan sekitar delapan minggu lagi di semester berikutnya, modul `b-x2-m1` (pertanyaan 3). Jawab sekarang lalu simpan.

1. Tulis perintah terminal yang menjalankan berkas `halo.js` dengan Bun.
2. Apa beda `git add` dan `git commit`?
3. Apa itu algoritma? Tulis pseudocode untuk menukar dua nilai dari ingatan.

## Kesalahan umum

- **Menjalankan dari folder yang salah.** `bun run halo.js` di folder kosong gagal dengan pesan `Module not found "halo.js"`. Pindah dulu ke folder tempat berkas berada.
- **Salah huruf atau lupa tanda kutip.** `console.log(Halo)` tanpa tanda kutip membuat Bun mencari variabel bernama `Halo` dan berhenti dengan `ReferenceError: Halo is not defined`. Teks harus ada di dalam tanda kutip.
- **Menukar tanpa nilai sementara.** Urutan `a = b;` lalu `b = a;` membuat keduanya sama dengan nilai `b`; pada contoh di atas hasilnya `8 8`, nilai 3 hilang.
- **Mengira `git add` sudah menyimpan versi.** `git add` hanya menyiapkan; versi baru ada setelah `git commit`.
- **Mengira pseudocode harus sempurna.** Pseudocode tidak punya aturan tulis baku; yang penting langkahnya jelas, berurutan, dan bisa ditelusuri orang lain.

## Cek mandiri

- [ ] Saya dapat membuat berkas `.js` dan menjalankannya dengan `bun run`.
- [ ] Saya dapat mencatat satu versi dengan `git add` dan `git commit`, dengan nama yang ditentukan guru.
- [ ] Saya dapat menjelaskan apa itu algoritma dan pseudocode.
- [ ] Saya dapat menukar dua nilai memakai satu nilai sementara dan menelusurinya dengan tabel.
- [ ] Saya menulis pseudocode sebelum kodenya.

## Kunci dan petunjuk

**Ingat kembali.** 1: instruksi program. 2: masukan (misalnya papan ketik), proses (CPU), keluaran (layar). 3: contoh: mengelola proses, memori, berkas, perangkat, atau antarmuka (dua dari lima). 4: contoh `tugas-pertama.js`; jawaban lain diterima bila tanpa spasi dan karakter khusus, menjelaskan isi, dan berekstensi `.js`.

**Prediksi dulu.** 1: lima baris. 2: `2 + 3` tanpa tanda kutip adalah hitungan dan menghasilkan `5`; `"2 + 3"` dengan tanda kutip adalah teks dan dicetak apa adanya. 3: satu spasi.

Keluaran sebenarnya:

```sh
bun run prediksi.js
```

```text
Halo
5
2 + 3
a b
Jumlah: 5
```

**Contoh setengah jadi.** Isian berurutan: `x`, `y`, `sementara`. Kuncinya:

```js
// tukar-kunci.js
let x = 10;
let y = 25;
let sementara = x;
x = y;
y = sementara;
console.log(x, y);
```

Keluarannya:

```text
25 10
```

**Soal Parsons.** Urutan benar: d, b, c, a (b dan d boleh bertukar, tetapi keduanya harus sebelum c). Kuncinya dijalankan:

```js
// luas.js
let panjang = 6;
let lebar = 4;
let luas = panjang * lebar;
console.log("Luas:", luas);
```

Keluarannya:

```text
Luas: 24
```

**Latihan.** 1: contoh: `console.log("Halo!");`, `console.log("Panggil aku Dewi-contoh.");`, `console.log("Kelas X-contoh");`. 2: awal a=5, b=9, c=1, t belum ada; `t = a` membuat t=5; `a = b` membuat a=9; `b = c` membuat b=1; `c = t` membuat c=5. Tercetak `9 1 5`. 3: contoh pseudocode: `TERBESAR = A`; `JIKA B > TERBESAR MAKA TERBESAR = B`; `JIKA C > TERBESAR MAKA TERBESAR = C`; `JIKA D > TERBESAR MAKA TERBESAR = D`; `CETAK TERBESAR`. Telusuri: 2, lalu 7, tetap 7 (C tidak lebih besar), tetap 7; tercetak 7. 4: `git log --oneline` menampilkan dua baris dengan kode berbeda di depan masing-masing; bila commit ditolak, baca pesannya dan periksa `git config user.name`.

**Latihan bercampur.** 1: masukan teks di dalam berkas, proses Bun menjalankannya, keluaran dua baris di layar. 2: contoh `latihan-pertama/halo-dunia.js`. 3: contoh: "ambil gelas; JIKA gula habis MAKA minta gula; tuang gula; tuang teh; aduk; CETAK 'teh siap'". Jawaban lain diterima bila langkahnya urut dan jelas.

**Ulang berjarak.** 1: `bun run halo.js`. 2: `git add` menyiapkan berkas, `git commit` menyimpan satu versi. 3: urutan langkah untuk menyelesaikan masalah; pseudocode tukar seperti di contoh (dengan nilai sementara).

## Langkah berikutnya

Modul berikut: `b-x1-m9` (variabel, tipe, dan ekspresi di JavaScript, serta masukan dan keluaran), yang mengisi `let` dan `const` dengan benar. Modul terkait: `fondasi-software-dan-sistem-operasi` untuk mengulang nama berkas dan lisensi. Bacaan lanjut: dokumentasi Bun (`bun run`), dokumentasi Git (tutorial dan `git status`), dan pustaka JavaScript di MDN.
