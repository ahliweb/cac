## Untuk siapa modul ini

Modul ini untuk murid kelas XI jalur B (Web dengan JavaScript, TypeScript, dan Bun), minggu `B-XI1-M2` silabus v1.4.1: TypeScript I, tipe dasar. Prasyarat: modul `b-xi1-m1` (proses rekayasa produk digital) dan `b-x1-m12` (fungsi). Kamu juga memakai array dari `b-x2-m1`.

Modul ini berstatus DRAF: karangan penyusun, belum ditinjau pemilik. Butir CP untuk minggu ini tidak dipetakan silabus; modul ini tidak dihitung memenuhi butir CP apa pun.

Semua contoh dijalankan penyusun dengan Bun 1.4.4 dan TypeScript 7.0.2 (hasil `bunx tsc --version`) per 2026-11; pesan galat TypeScript berbahasa Inggris dan nomor kolomnya bisa berbeda di versi lain. Tidak ada akun dan tidak ada data nyata. Tugas baca-dan-prediksi ditandai `AI: tanpa AI`; selain itu AI generatif boleh dipakai dengan etika dan dicatat, tanpa data pribadi, kata sandi, atau tugas bernilai pada permintaanmu.

## Ingat kembali

Jawab dari ingatan dulu, baru cek di bagian kunci. Soal 1 dari `b-xi1-m1`, soal 2 dari `b-x2-m13`, soal 3 dari `b-x2-m8`.

1. Sebutkan lima tahap alur pengembangan produk digital sesuai urutannya.
2. Apa yang dikerjakan `setTimeout`, dan bagaimana membatalkan timer yang masih menunggu?
3. Kira-kira berapa langkah pencarian biner untuk 1000 data, dibanding pencarian sekuensial pada kasus terburuk?

## Tujuan

Setelah modul ini kamu dapat:

- memberi tipe `string`, `number`, `boolean`, dan array pada variabel;
- memberi tipe pada parameter dan nilai kembalian fungsi;
- menyatakan dengan tepat apa yang dikerjakan `bun run` dan apa yang dikerjakan `tsc`;
- mengubah skrip JavaScript menjadi berkas `.ts` yang lolos pemeriksaan (keluaran minggu ini: berkas `.ts`).

## Prediksi dulu

Ini tugas baca-dan-prediksi, `AI: tanpa AI`. **Tebak dulu, tulis jawabanmu, baru jalankan.** Perhatikan tipe `number` pada parameter, lalu argumen yang diberikan.

```ts
function luasPersegi(sisi: number): number {
  return sisi * sisi;
}

console.log(luasPersegi("5"));
```

1. Apa yang tercetak bila berkas ini dijalankan dengan `bun run luas.ts`?
2. Apakah menurutmu `tsc` akan melaporkan sesuatu pada berkas yang sama? Tulis alasannya.

## Contoh terselesaikan

Pada percobaan penyusun, `bun run luas.ts` mencetak:

```text
25
```

Program berjalan walaupun argumennya teks, karena `"5" * "5"` di JavaScript menjadi `25`. Menurut dokumentasi Bun, **Bun menjalankan berkas TypeScript tanpa memeriksa tipenya**; ia hanya membuang anotasi tipe. `bun build --no-bundle luas.ts` memperlihatkan hasilnya:

```text
function luasPersegi(sisi) {
  return sisi * sisi;
}
console.log(luasPersegi("5"));
```

Yang memeriksa tipe adalah pemeriksa terpisah. Dokumentasi Bun menyebut `bun check`; dokumentasi TypeScript memakai `tsc`. Di sini kita memakai `tsc` lewat `bunx`, yang menjalankan paket `typescript` (pertama kali perlu mengunduhnya; `b-xi1-m5` membahas pemasangan paket):

```sh
bunx tsc --noEmit luas.ts
```

```text
luas.ts(5,25): error TS2345: Argument of type 'string' is not assignable to parameter of type 'number'.
```

`--noEmit` berarti hanya memeriksa, tidak membuat berkas `.js`. Galat itu muncul **sebelum** program berjalan: pembacaan dari baris 5 kolom 25, argumen `"5"` bertipe `string`, parameter bertipe `number`. Ringkasnya: `bun run` menjalankan, `tsc` memeriksa; keduanya diperlukan.

**Mengubah skrip JS ke TS.** Ini skrip `rata.js` dari kelas X:

```js
function rataRata(nilai) {
  let jumlah = 0;
  for (const n of nilai) {
    jumlah += n;
  }
  return jumlah / nilai.length;
}

const nilaiKelas = [80, 75, 90];
console.log(rataRata(nilaiKelas));
console.log("Rata-rata: " + rataRata(nilaiKelas).toFixed(1));
```

Ubah dengan menambah tipe: array angka ditulis `number[]`, parameter diberi tipe setelah titik dua, nilai kembalian setelah tanda kurung.

```ts
function rataRata(nilai: number[]): number {
  let jumlah = 0;
  for (const n of nilai) {
    jumlah += n;
  }
  return jumlah / nilai.length;
}

const nilaiKelas: number[] = [80, 75, 90];
console.log(rataRata(nilaiKelas));
console.log("Rata-rata: " + rataRata(nilaiKelas).toFixed(1));
```

```text
81.66666666666667
Rata-rata: 81.7
```

Keluaran JavaScript dan TypeScript sama; `bunx tsc --noEmit rata.ts` tidak mencetak apa-apa (kode keluar 0), tanda tidak ada galat. Tipe bekerja seperti kontrak: bila ada pemakaian yang tidak sesuai, `tsc` melaporkannya. Pada `const nilaiKelas = [80, 75, 90]` kamu sebenarnya boleh tidak menulis `: number[]`, karena TypeScript **menyimpulkan** tipenya dari nilai awal. Begitu pula `let judul = "Buku"` bertipe `string`, sehingga `judul = 5` ditolak (`TS2322`). Tulis tipe eksplisit pada parameter dan kembalian fungsi, tempat kesimpulan paling sedikit membantu pembaca.

Tipe `any` mematikan pemeriksaan, jadi hindari; `b-xi1-m4` menunjukkan bagaimana mode ketat memaksanya.

## Contoh setengah jadi

Lengkapi tipe agar fungsi menerima nama dan jumlah, lalu mengembalikan teks.

```ts setengah-jadi
function salam(nama: ____, jumlah: ____): ____ {
  return nama + " punya " + jumlah + " buku";
}
console.log(salam("Dewi", 3));
```

## Soal Parsons

Susun baris berikut (sudah diacak) menjadi fungsi bertipe yang mengembalikan apakah `n` genap. `AI: tanpa AI`.

```text
(a) return n % 2 === 0;
(b) }
(c) function genap(n: number): boolean {
```

## Latihan

1. `AI: tanpa AI` **Telusuri.** Pada `salah.ts` di bawah, tebak dulu tiga galat yang akan dilaporkan `tsc`, baru jalankan. Tuliskan baris dan alasannya.
2. `AI: boleh` **Ubah JS ke TS.** Ambil satu skrip dari `b-x1-m12` atau `b-x2-m1`, beri tipe parameter dan kembaliannya, dan pastikan `bunx tsc --noEmit` tidak melaporkan galat.
3. `AI: tanpa AI` **Rancangan dulu.** Tulis tanda tangan fungsi `terbesar` (menerima array angka, mengembalikan angka) sebelum menulis badannya.
4. `AI: boleh` **Galat sengaja.** Buat satu galat tipe, jalankan dengan `bun run` dan dengan `tsc`, dan jelaskan mengapa hasilnya berbeda.
5. *Opsional:* **catatan pemakaian AI.** Kerjakan nomor 1 sendiri dulu, lalu minta AI menjelaskan satu pesan galat, bukan memperbaikinya. Catat alat, tujuan, garis besar perintah, bagian yang kamu pakai, dan cara memeriksanya (jalankan ulang `tsc`). Jangan menaruh data pribadi atau tugas bernilai pada perintah.

```ts setengah-jadi
function rataRata(nilai: number[]): number {
  let jumlah = 0;
  for (const n of nilai) {
    jumlah += n;
  }
  return jumlah / nilai.length;
}

const nilaiKelas: number[] = [80, 75, "90"];
const hasil: string = rataRata(nilaiKelas);
console.log(rataRata(80, 75));
```

## Latihan bercampur

1. `AI: boleh` Beri tipe fungsi pencarian biner dari `b-x2-m8`: parameter array angka terurut dan angka yang dicari, kembalian indeks (angka). Apa yang ia kembalikan bila tidak ketemu?
2. `AI: boleh` Fungsi penghasil langkah dari `b-x2-m13` mengembalikan array pasangan angka. Bagaimana kamu menulis tipe kembaliannya?

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `b-xi1-m3` (pertanyaan 1), sekitar tiga minggu lagi di `b-xi1-m5` (pertanyaan 2), dan sekitar delapan minggu lagi di `b-xi1-m10` (pertanyaan 3). Jawab sekarang lalu simpan.

1. Tulis tanda tangan fungsi `jumlah` yang menerima dua `number` dan mengembalikan `number`.
2. Apa beda `bun run berkas.ts` dan pemeriksaan tipe dengan `tsc`?
3. Apa yang dikerjakan `tsc --noEmit`?

## Kesalahan umum

- **Mengira `bun run` memeriksa tipe.** Ia hanya membuang tipe; galat tipe baru terlihat lewat `tsc` atau `bun check`.
- **Memakai `any` agar galat hilang.** Galatnya hilang, masalahnya tidak.
- **Menulis `Number` atau `String` (huruf besar).** Itu objek pembungkus; tipe yang dimaksud adalah `number` dan `string`.
- **Mengira tipe ada saat program berjalan.** Tipe dihapus, jadi `typeof x` tetap memeriksa nilai sungguhan.
- **Menaruh data nyata di contoh.** Pakai nilai karangan.

## Cek mandiri

- [ ] Saya dapat menulis tipe dasar dan array pada variabel dan fungsi.
- [ ] Saya dapat menjelaskan apa yang diperiksa `tsc` dan apa yang dijalankan `bun run`.
- [ ] Saya dapat membaca satu pesan galat tipe: berkas, baris, kode, dan alasannya.
- [ ] Saya dapat mengubah skrip JS menjadi TS yang lolos pemeriksaan.
- [ ] Saya tidak memakai data pribadi dalam contoh.

## Kunci dan petunjuk

**Ingat kembali.** 1: kebutuhan, rancangan, implementasi, uji, rilis. 2: `setTimeout(fungsi, ms)` menjalankan fungsi sekali setelah `ms` milidetik dan mengembalikan nomor timer; `clearTimeout(nomor)` membatalkannya. 3: sekitar 10 langkah untuk biner (1000 data cukup dibagi dua sekitar 10 kali) dan paling banyak 1000 untuk sekuensial.

**Prediksi dulu.** 1: `25`. 2: ya; argumen `"5"` bertipe `string` sedangkan parameter bertipe `number`, sehingga `tsc` melaporkan `TS2345`.

**Contoh setengah jadi.** Isi: `string`, `number`, `string`. Kuncinya (dijalankan penyusun dengan `bun run`, mencetak `Dewi punya 3 buku`):

```ts
function salam(nama: string, jumlah: number): string {
  return nama + " punya " + jumlah + " buku";
}
console.log(salam("Dewi", 3));
```

```text
Dewi punya 3 buku
```

**Soal Parsons.** Urutan benar: c, a, b.

**Latihan.** 1: pada percobaan penyusun `bunx tsc --noEmit salah.ts` memberi tiga galat: baris 9 `TS2322` (`"90"` bukan `number`), baris 10 `TS2322` (`number` ke `string`), baris 11 `TS2554` (dua argumen, diharapkan satu). 2: contoh: `function dua(n: number): number`; periksa dengan `bunx tsc --noEmit`. 3: `function terbesar(nilai: number[]): number`. 4: `bun run` membuang tipe tanpa memeriksa; `tsc` memeriksa sebelum berjalan.

**Latihan bercampur.** 1: `function cariBiner(data: number[], dicari: number): number`; bila tidak ketemu, biasanya `-1` (tergantung versi di `b-x2-m8`). 2: contoh: `[number, number][]` atau `number[][]`.

**Ulang berjarak.** 1: `function jumlah(a: number, b: number): number`. 2: `bun run` menjalankan tanpa memeriksa tipe; `tsc` memeriksa tipe tanpa menjalankan. 3: memeriksa tipe tanpa membuat berkas keluaran.

## Langkah berikutnya

Modul berikut: `b-xi1-m3` (TypeScript II: `interface`, `type`, gabungan, generik dasar), yang memodelkan data berbentuk objek. Bacaan lanjut: halaman Everyday Types di dokumentasi TypeScript dan halaman TypeScript di dokumentasi Bun.
