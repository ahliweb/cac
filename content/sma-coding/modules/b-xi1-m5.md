## Untuk siapa modul ini

Modul ini untuk murid kelas XI jalur B (Web dengan JavaScript, TypeScript, dan Bun), minggu `B-XI1-M5` silabus v1.4.1: Bun sebagai runtime dan pengelola paket. Prasyarat: modul `b-xi1-m4` (`tsconfig` dan mode ketat) dan `b-x1-m8` (lingkungan kerja: terminal, editor, Bun, Git).

Modul ini karangan penyusun dan disetujui pemilik program pada 2026-11-20 (keputusan lewat dialog; catatan tinjauan menjadi tindak lanjut revisi). Butir CP untuk minggu ini tidak dipetakan silabus; modul ini tidak dihitung memenuhi butir CP apa pun.

Semua contoh dijalankan penyusun dengan Bun 1.4.4 dan TypeScript 7.0.2 per 2026-11. Pemasangan paket butuh sambungan ke registri paket npm; bila jaringan labmu membatasinya, tanyakan gurumu. Paket yang dipasang hanya `nanoid` dan dua paket alat dari `bun init`; tidak ada akun, kunci API, atau data nyata. Angka versi dan waktu di bawah adalah hasil percobaan penyusun dan berubah dari waktu ke waktu. Tugas baca-dan-prediksi ditandai `AI: tanpa AI`; selain itu AI generatif boleh dipakai dengan etika dan dicatat, tanpa data pribadi, kata sandi, atau tugas bernilai pada permintaanmu.

## Ingat kembali

Jawab dari ingatan dulu, baru cek di bagian kunci. Soal 1 dari `b-xi1-m4`, soal 2 dari `b-xi1-m2`, soal 3 dari `b-x2-m11`.

1. Apa yang dikerjakan `"strict": true` pada `tsconfig.json`, dan satu galat yang muncul karenanya?
2. Apa beda `bun run berkas.ts` dan pemeriksaan tipe dengan `tsc`?
3. Mengapa jawaban yang meyakinkan, termasuk dari AI, tetap harus dijalankan dan diuji?

## Tujuan

Setelah modul ini kamu dapat:

- membuat proyek dengan `bun init`, menjalankan skrip, dan membaca `package.json`;
- memasang dependensi dengan `bun add` dan memulihkannya dengan `bun install`;
- menjelaskan fungsi `bun.lock` dan mengapa `node_modules` tidak dimasukkan ke Git;
- memeriksa keberadaan dan reputasi sebuah paket sebelum memasangnya, termasuk nama yang disarankan AI (keluaran minggu ini: proyek Bun).

## Prediksi dulu

Ini tugas baca-dan-prediksi, `AI: tanpa AI`. **Tebak dulu, tulis jawabanmu, baru jalankan.** Berkas `versi.ts` memakai objek `Bun` dan daftar argumen proses.

```ts
console.log("Bun", Bun.version);
console.log(process.argv.length);
```

1. Apa yang tercetak untuk `bun run versi.ts`, dan untuk `bun run versi.ts a b`?
2. Mengapa `tsc` bisa melaporkan `Cannot find name 'Bun'` bila paket `@types/bun` tidak terpasang?

## Contoh terselesaikan

Hasil percobaan penyusun (versi Bun di komputermu bisa lain):

```text
Bun 1.4.4
2
```

Dengan `bun run versi.ts a b` baris pertama sama dan baris kedua menjadi `4`. `process.argv` memuat jalur Bun dan jalur berkas, lalu argumen tambahan: dua elemen tanpa argumen, empat dengan `a b`. `tsc` mengenal objek `Bun` hanya bila deklarasi tipenya ada di paket `@types/bun`.

**Membuat proyek.** `bun init -y` membuat proyek di folder kosong. Pada Bun 1.4.4 ia membuat `package.json`, `tsconfig.json`, `index.ts`, `README.md`, `.gitignore`, `bun.lock`, folder `node_modules`, dan sebuah `CLAUDE.md` (berkas catatan untuk asisten AI; baca dulu, hapus bila tidak kamu perlukan), serta memasang `@types/bun` dan `typescript`. `package.json` hasilnya:

```json
{
  "name": "proyek",
  "module": "index.ts",
  "type": "module",
  "private": true,
  "scripts": {
    "typecheck": "bun check"
  },
  "devDependencies": {
    "@types/bun": "latest"
  },
  "peerDependencies": {
    "typescript": "^7"
  }
}
```

`scripts` menamai perintah: `bun run typecheck` menjalankan `bun check`, pemeriksa tipe yang menurut dokumentasi Bun membaca `tsconfig.json` dan melaporkan galat yang sama dengan `tsc` dari TypeScript 7. Pada proyek ini ia mencetak `✓ No type errors in 1 file`. `tsconfig.json` hasil `bun init` mengikuti opsi yang disarankan dokumentasi Bun, termasuk `strict` dan `types: ["bun"]`.

**Memasang dependensi.** `bun add nanoid` menambah paket pembangkit ID. Keluarannya:

```text
bun add v1.4.4 (38afee6c8)
Resolving dependencies
Resolved, downloaded and extracted [3]
Saved lockfile

installed nanoid@6.0.2 with binaries:
 - nanoid

1 package installed [393.00ms]
```

`package.json` bertambah `"dependencies": { "nanoid": "^6.0.2" }`: `^6.0.2` berarti versi 6.0.2 atau yang lebih baru dalam seri 6. Paket yang hanya perlu saat pengembangan (seperti `@types/bun`) ditaruh di `devDependencies`. Versi **pasti** yang terpasang dicatat di `bun.lock`; dokumentasi Bun menyatakan berkas ini sebaiknya di-commit ke Git. Pakai di kode:

```ts
import { nanoid } from "nanoid";

const kode = nanoid(8);
console.log(kode.length);
console.log(typeof kode);
```

```text
8
string
```

Yang dicetak panjang dan tipe, bukan ID-nya, karena ID acak berubah.
**Mengapa `node_modules` tidak di Git.** Folder itu berisi hasil unduhan yang bisa dibangun ulang dari `package.json` dan `bun.lock`. Penyusun menghapusnya lalu menjalankan `bun install`; hasilnya tujuh paket terpasang kembali (`@types/bun@1.4.4`, `nanoid@6.0.2`, `typescript@7.0.2`, beserta turunannya). `.gitignore` dari `bun init` sudah memuat `node_modules`.

**Memeriksa paket sebelum memasang.** Setiap paket adalah kode orang lain di komputermu. Asisten AI dapat menyarankan nama paket yang **tidak ada**, atau yang mirip nama paket populer tetapi milik orang lain. Karena itu periksa dulu dengan `bun info`:

```sh
bun info nanoid
```

```text
nanoid@6.0.2 | MIT | deps: 0 | versions: 135
A tiny (117 bytes), secure URL-friendly unique string ID generator
https://github.com/ai/nanoid#readme
keywords: id, random, url, uuid
bin: nanoid

dist
 .tarball: https://registry.npmjs.org/nanoid/-/nanoid-6.0.2.tgz
 .shasum: 21f04be37e204d616b694de1564a9d89d123d788
 .integrity: sha512-hIvVOb9Qr1p/9CNNLOe0OlWvgx/ziTsVwKN/GDSsuArN2K0wDiafP3s0SWmsm7o2BdnyS8Z9Z64NFBUbn6ziBg==
 .unpackedSize: 14.73 KB

dist-tags:
latest: 6.0.2
legacy: 3.3.20

Published: 2026-10-05T21:23:00.134Z
```

(Baris daftar pengelola dihilangkan dari kutipan ini karena memuat alamat surel orang.) Baca: ada di registri, berlisensi MIT, tanpa dependensi, 135 versi, punya halaman proyek. Sebaliknya, nama karangan yang tidak ada:

```text
404 Not Found: https://registry.npmjs.org/zod-ajaib-validasi-cepat

 - 'zod-ajaib-validasi-cepat@latest' does not exist in this registry
```

Periksa: nama persis sama dengan yang dimaksud, ada di registri, lisensi jelas, ada halaman proyek, usia dan jumlah versi masuk akal, dependensi sedikit. Ada di registri bukan jaminan aman, tetapi nama yang tidak ada langsung berhenti di sini.

## Contoh setengah jadi

Lengkapi perintah agar proyek baru dibuat tanpa pertanyaan, paket `nanoid` ditambahkan, lalu skrip pemeriksa tipe dijalankan.

```text
bun ____ -y
bun ____ nanoid
bun run ____
```

## Soal Parsons

Susun langkah berikut (sudah diacak) untuk temanmu yang baru meng-clone repositori proyek. `AI: tanpa AI`.

```text
(a) bun run index.ts
(b) git clone <alamat repositori>
(c) bun install
(d) cd proyek
```

## Latihan

1. `AI: tanpa AI` **Telusuri.** Pada `package.json` di atas, sebut paket mana yang `dependencies` dan mana yang `devDependencies`, dan berkas apa yang mencatat versi pastinya.
2. `AI: boleh` **Skrip dan dependensi.** Buat proyek dengan `bun init -y`, tambah `nanoid`, tulis skrip yang membuat tiga ID dan mencetak panjangnya, lalu jalankan `bun run typecheck`.
3. `AI: boleh` **Periksa tiga nama.** Gurumu menyiapkan tiga nama paket. Untuk tiap nama jalankan `bun info <nama>` dan isi tabel: ada atau tidak, lisensi, jumlah versi, tanggal terbit, pengelola atau halaman proyek, dan keputusanmu memasang atau tidak. Jangan memasang sebelum tabel terisi.
4. `AI: tanpa AI` **Rancangan dulu.** Tulis dengan kata-katamu empat langkah menerima nama paket dari asisten AI sampai memasangnya.
5. *Opsional:* **catatan pemakaian AI.** Minta AI menyarankan paket pembuat ID acak, lalu periksa tiap nama dengan `bun info`. Catat alat, tujuan, garis besar perintah, bagian yang kamu pakai, dan cara memeriksanya. Jangan menaruh data pribadi atau tugas bernilai pada perintah.

## Latihan bercampur

1. `AI: boleh` Pada proyek bertipe dari `b-xi1-m2`, apa akibatnya bila `types: ["bun"]` dihapus dari `tsconfig.json` dan kamu memakai `Bun.version`?
2. `AI: boleh` Tulis kriteria penerimaan (`b-xi1-m1`) untuk "setiap paket baru sudah diperiksa sebelum dipasang".

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `b-xi1-m6` (pertanyaan 1), sekitar tiga minggu lagi di `b-xi1-m8` (pertanyaan 2), dan sekitar delapan minggu lagi di `b-xi1-m13` (pertanyaan 3). Jawab sekarang lalu simpan.

1. Apa beda `dependencies` dan `devDependencies`, dan berkas mana yang mencatat versi pasti yang terpasang?
2. Sebutkan tiga hal yang kamu periksa tentang sebuah paket sebelum `bun add`.
3. Mengapa folder `node_modules` tidak dimasukkan ke Git, dan bagaimana temanmu mendapatkannya?

## Kesalahan umum

- **Memasang nama yang disarankan AI tanpa memeriksa.** Nama bisa fiktif atau mirip paket lain.
- **Mengira `bun add` aman karena paketnya ada.** Ada di registri tidak sama dengan tepercaya.
- **Tidak meng-commit `bun.lock`.** Teman bisa mendapat versi berbeda.

## Cek mandiri

- [ ] Saya dapat membuat proyek dengan `bun init` dan membaca `package.json`.
- [ ] Saya dapat memasang paket dengan `bun add` dan memulihkannya dengan `bun install`.
- [ ] Saya dapat menjelaskan peran `bun.lock` dan alasan `node_modules` di luar Git.
- [ ] Saya memeriksa keberadaan dan reputasi paket dengan `bun info` sebelum memasang.
- [ ] Saya tidak menaruh kunci, kata sandi, atau data nyata di proyek latihan.

## Kunci dan petunjuk

**Ingat kembali.** 1: menyalakan sekelompok pemeriksaan ketat sekaligus, misalnya `noImplicitAny` yang menolak parameter tanpa tipe (`TS7006`) dan `strictNullChecks` yang menolak `null` pada `number` (`TS2322`). 2: `bun run` menjalankan tanpa memeriksa tipe; `tsc` memeriksa tipe tanpa menjalankan. 3: karena yang meyakinkan belum tentu benar atau cocok dengan versi alatmu; hasil harus dijalankan dan diuji sendiri.

**Prediksi dulu.** 1: `Bun 1.4.4` dan `2`; lalu `Bun 1.4.4` dan `4` (versi sesuai komputermu). 2: karena `Bun` bukan bagian dari JavaScript standar; deklarasi tipenya datang dari `@types/bun`, dan harus terdaftar di `types`.

**Contoh setengah jadi.** Isi: `init`, `add`, `typecheck`.

**Soal Parsons.** Urutan benar: b, d, c, a.

**Latihan.** 1: `nanoid` ada di `dependencies`, `@types/bun` di `devDependencies`; versi pasti di `bun.lock`. 2: contoh: `import { nanoid } from "nanoid"; for (let i = 0; i < 3; i++) console.log(nanoid(8).length);` mencetak `8` tiga kali; `bun run typecheck` tidak melaporkan galat. 3: tabel diterima bila tiap baris diisi dari keluaran `bun info` yang kamu jalankan; nama yang menghasilkan `404 Not Found` tidak dipasang. 4: contoh: catat nama; jalankan `bun info`; baca lisensi, pengelola, usia, dan dependensi; baru putuskan memasang.

**Latihan bercampur.** 1: `tsc` atau `bun check` melaporkan `Cannot find name 'Bun'`, sedangkan `bun run` tetap berjalan. 2: contoh: "diberikan nama paket baru, ketika dipasang, maka `bun info` sudah dijalankan dan hasilnya dicatat".

**Ulang berjarak.** 1: `dependencies` dipakai program saat berjalan; `devDependencies` hanya saat pengembangan (mis. tipe); versi pasti ada di `bun.lock`. 2: contoh: nama ada di registri, lisensi jelas, pengelola atau halaman proyek, usia atau jumlah versi, dependensi sedikit. 3: karena besar dan dapat dibangun ulang; temanmu menjalankan `bun install` setelah `git clone`.

## Langkah berikutnya

Modul berikut: `b-xi1-m6` (modul ESM dan paket), yang memecah kode menjadi beberapa berkas dan paket lokal. Bacaan lanjut: halaman `bun add`, `bun install`, `bun info`, lockfile, dan `bun check` di dokumentasi Bun, yang ditautkan di rujukan.
