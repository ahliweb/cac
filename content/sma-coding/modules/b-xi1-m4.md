## Untuk siapa modul ini

Modul ini untuk murid kelas XI jalur B (Web dengan JavaScript, TypeScript, dan Bun), minggu `B-XI1-M4` silabus v1.4.1: `tsconfig` dan mode ketat. Prasyarat: modul `b-xi1-m3` (TypeScript II). Kamu juga memakai pemeriksaan data dari `b-x2-m10` dan alur dari `b-xi1-m1`.

Modul ini karangan penyusun dan disetujui pemilik program pada 2026-11-20 (keputusan lewat dialog; catatan tinjauan menjadi tindak lanjut revisi). Butir `F-AP-c` (pengembangan, pemeliharaan, penyempurnaan algoritma standar, kualitas kode) dipetakan silabus sebagai dipenuhi jalur ini; pemenuhan butir mengikuti pemetaan silabus, bukan status modul.

Semua contoh dijalankan penyusun dengan Bun 1.4.4 dan TypeScript 7.0.2 (`bunx tsc`) per 2026-11. Pada versi lain pesan, nilai bawaan, dan isi `tsc --init` bisa berbeda. Tidak ada akun dan tidak ada data nyata. Tugas baca-dan-prediksi ditandai `AI: tanpa AI`; selain itu AI generatif boleh dipakai dengan etika dan dicatat, tanpa data pribadi, kata sandi, atau tugas bernilai pada permintaanmu.

## Ingat kembali

Jawab dari ingatan dulu, baru cek di bagian kunci. Soal 1 dari `b-xi1-m3`, soal 2 dari `b-xi1-m1`, soal 3 dari `b-x2-m10`.

1. Apa beda `interface` dan tipe literal seperti `"tersedia" | "dipinjam"`? Beri satu kegunaan masing-masing.
2. Tulis satu cerita pengguna dan satu kriteria penerimaan yang bisa diperiksa untuk fitur "menambah tugas".
3. Apa beda memvalidasi dan merapikan data, dan mana yang memerlukan keputusan manusia?

## Tujuan

Setelah modul ini kamu dapat:

- menulis `tsconfig.json` kecil dan menjelaskan fungsi tiap opsinya;
- menjelaskan apa yang berubah saat `strict` dinyalakan atau dimatikan;
- membaca dan memperbaiki galat `TS7006`, `TS2322`, dan `TS18048`;
- menjadikan pemeriksaan tipe bagian dari kebiasaan menjaga kualitas kode (keluaran minggu ini: `tsconfig.json`).

## Prediksi dulu

Ini tugas baca-dan-prediksi, `AI: tanpa AI`. **Tebak dulu, tulis jawabanmu, baru jalankan.** Berkas `kacau.ts` berisi tiga kelonggaran: parameter tanpa tipe, `null` pada `number`, dan indeks array.

```ts
function sapa(nama) {
  return "Halo, " + nama;
}

const tahun: number = null;
const daftar: number[] = [3, 1, 2];
const awal: number = daftar[0];

console.log(sapa("Dewi"), tahun, awal);
```

1. Apa yang tercetak bila dijalankan dengan `bun run kacau.ts`?
2. Dengan `"strict": false` pada `tsconfig.json`, berapa galat yang dilaporkan `tsc`? Bagaimana dengan `"strict": true`?

## Contoh terselesaikan

`tsconfig.json` memberi tahu `tsc` cara memeriksa proyek: berkas mana, aturan seketat apa. Berkas minimal untuk latihan ini (nilai dipilih penyusun; dokumentasi Bun menyarankan sekumpulan opsi lain untuk proyek Bun, yang dibahas di `b-xi1-m5`):

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "preserve",
    "moduleDetection": "force",
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noEmit": true
  },
  "include": ["*.ts"]
}
```

`strict` menyalakan keluarga pemeriksaan ketat sekaligus, antara lain tidak boleh `any` yang tersirat (`noImplicitAny`) dan `null` tidak boleh masuk ke tipe lain (`strictNullChecks`). `noUncheckedIndexedAccess` menambah `undefined` pada hasil indeks array. `noEmit` berarti hanya memeriksa. `moduleDetection: "force"` memperlakukan tiap berkas sebagai modul sendiri; tanpanya, dua berkas yang sama-sama menulis `const daftar` bisa dilaporkan bentrok (`TS2451`, dialami penyusun). `include` menyebut berkas yang diperiksa. `bunx tsc --init` membuat `tsconfig.json` awal; pada TypeScript 7.0.2 hasilnya sudah memuat `strict: true`. Dokumentasi TypeScript menyebut `true` sebagai nilai default yang disarankan untuk `strict`.

Jalankan `bunx tsc -p .` pada `kacau.ts`. Dengan konfigurasi di atas, hasil percobaan penyusun:

```text
kacau.ts(1,15): error TS7006: Parameter 'nama' implicitly has an 'any' type.
kacau.ts(5,7): error TS2322: Type 'null' is not assignable to type 'number'.
kacau.ts(7,7): error TS2322: Type 'number | undefined' is not assignable to type 'number'.
  Type 'undefined' is not assignable to type 'number'.
```

Tiga pesan itu dibaca sama seperti di `b-xi1-m2`: berkas, baris dan kolom, kode galat, lalu alasan. Dengan `"strict": false` dan `noUncheckedIndexedAccess` dimatikan, `tsc -p .` tidak mencetak apa-apa. Bila hanya `noUncheckedIndexedAccess` yang dimatikan, tinggal dua galat pertama. Sementara itu `bun run kacau.ts` mencetak:

```text
Halo, Dewi null 3
```

Program yang ditolak `tsc` tetap berjalan, karena Bun tidak memeriksa tipe. Itu alasan kenapa pemeriksaan tipe dijadikan langkah wajib sebelum menggabungkan kode, bukan hanya pemanis editor. Dalam pemeliharaan, galat yang ketahuan di sini jauh lebih murah daripada yang ketahuan pengguna.

Perbaiki `kacau.ts` menjadi `rapi.ts`. Perbaikannya bukan membungkam, melainkan membuat maksud eksplisit: beri tipe parameter, izinkan `null` secara terang-terangan, dan akui bahwa indeks bisa kosong.

```ts
function sapa(nama: string): string {
  return "Halo, " + nama;
}

const tahun: number | null = null;
const daftar: number[] = [3, 1, 2];
const awal: number | undefined = daftar[0];

console.log(sapa("Dewi"), tahun, awal);
```

```text
Halo, Dewi null 3
```

Untuk memakai elemen yang mungkin `undefined`, periksa dulu (penyempitan dari `b-xi1-m3`):

```ts
const daftar: number[] = [3, 1, 2];
const akhir = daftar[daftar.length - 1];
if (akhir !== undefined) {
  console.log(akhir.toFixed(1));
}
```

```text
2.0
```

Tanpa `if`, misalnya `const awal = daftar[0]; console.log(awal.toFixed(1));`, `tsc` menolaknya dengan `error TS18048: 'awal' is possibly 'undefined'.` (hasil percobaan penyusun). Pemeriksaan ketat tidak menjamin program benar, hanya menutup satu jenis kesalahan. Jangan menyimpulkan "lolos `tsc` berarti benar".

## Contoh setengah jadi

Lengkapi `tsconfig.json` agar `tsc` hanya memeriksa, tidak menulis berkas, dan memakai mode ketat.

```text
{
  "compilerOptions": {
    "strict": ____,
    "noEmit": ____
  },
  "include": ["____"]
}
```

## Soal Parsons

Susun baris berikut (sudah diacak) menjadi fungsi yang mengembalikan elemen pertama atau teks cadangan bila array kosong. `AI: tanpa AI`.

```text
(a) return awal ?? "kosong";
(b) const awal = daftar[0];
(c) function elemenPertama(daftar: string[]): string {
(d) }
```

## Latihan

1. `AI: tanpa AI` **Telusuri.** Pada `kacau.ts`, tebak galat tiap baris sebelum menjalankan `tsc`, lalu cocokkan.
2. `AI: boleh` **Perbaiki galat tipe.** Ambil skrip dari `b-xi1-m2` atau `b-xi1-m3`, nyalakan `strict` dan `noUncheckedIndexedAccess`, dan perbaiki semua galat tanpa memakai `any` atau `as`.
3. `AI: tanpa AI` **Rancangan dulu.** Tulis tanda tangan fungsi `rataRataAman` yang mengembalikan `number | null` bila array kosong, sebelum menulis badannya.
4. `AI: boleh` **Bandingkan.** Matikan `strict`, jalankan `tsc`, lalu nyalakan lagi; tulis tiga hal yang berubah dan satu risiko mematikannya.
5. *Opsional:* **catatan pemakaian AI.** Kerjakan nomor 2 sendiri dulu, lalu minta AI menjelaskan satu pesan galat, bukan menulis ulang kodenya. Catat alat, tujuan, garis besar perintah, bagian yang kamu pakai, dan cara memeriksanya (jalankan ulang `bunx tsc -p .`). Jangan menaruh data pribadi atau tugas bernilai pada perintah.

## Latihan bercampur

1. `AI: boleh` Pada fungsi pembersih data dari `b-x2-m10`, mana yang termasuk memvalidasi dan mana merapikan? Tulis tipe kembaliannya agar baris yang meragukan tidak hilang diam-diam.
2. `AI: boleh` Tulis kriteria penerimaan (`b-xi1-m1`) untuk keputusan tim "kode tidak digabung bila `tsc` melaporkan galat".

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `b-xi1-m5` (pertanyaan 1), sekitar tiga minggu lagi di `b-xi1-m7` (pertanyaan 2), dan sekitar delapan minggu lagi di `b-xi1-m12` (pertanyaan 3). Jawab sekarang lalu simpan.

1. Apa yang dikerjakan `"strict": true` pada `tsconfig.json`, dan satu galat yang muncul karenanya?
2. Mengapa `daftar[0]` bertipe `number | undefined` bila `noUncheckedIndexedAccess` menyala?
3. Mengapa `bun run` tetap menjalankan program yang ditolak `tsc`, dan apa yang sebaiknya dilakukan sebelum menggabungkan kode ke `main`?

## Kesalahan umum

- **Mematikan `strict` agar galat hilang.** Galat itu peringatan yang berguna; matikan hanya dengan alasan tertulis.
- **Mengira `tsconfig.json` mengubah cara `bun run` menjalankan program.** Ia mengatur pemeriksaan `tsc`; Bun tidak menolak program karena galat tipe.
- **Memakai `as` atau `!` untuk membungkam galat.** Itu menjanjikan sesuatu yang tidak diperiksa.
- **Lupa `include`.** Berkas di luar `include` tidak diperiksa dan tidak ada pesan apa-apa.
- **Menyalin `tsconfig` tanpa membaca.** Pahami tiap opsi; opsi yang tidak kamu mengerti belum tentu cocok.

## Cek mandiri

- [ ] Saya dapat menulis `tsconfig.json` kecil dan menjelaskan `strict`, `noEmit`, dan `include`.
- [ ] Saya dapat membaca galat `TS7006`, `TS2322`, dan `TS18048` dan memperbaikinya tanpa `any`.
- [ ] Saya dapat menjelaskan mengapa `bun run` tidak menggantikan `tsc`.
- [ ] Saya menjalankan `tsc` sebelum menggabungkan kode.
- [ ] Saya memakai data karangan saja.

## Kunci dan petunjuk

**Ingat kembali.** 1: `interface` menamai bentuk objek (mis. buku); tipe literal membatasi nilai pada pilihan tertentu (mis. status). 2: contoh: "Sebagai ketua kelas, saya ingin menambah tugas beserta tenggat, agar teman tidak lupa"; "diberikan daftar kosong, ketika 'Laporan' ditambah, maka 'Laporan' muncul". 3: memvalidasi menemukan baris bermasalah; merapikan memperbaiki yang pasti; yang tidak pasti (nilai di luar rentang, isi ganda berbeda) memerlukan keputusan manusia dengan sumber asli.

**Prediksi dulu.** 1: `Halo, Dewi null 3`. 2: dengan `strict: false` dan `noUncheckedIndexedAccess` mati: tidak ada galat; dengan `strict: true` (dan `noUncheckedIndexedAccess` menyala): tiga galat (`TS7006`, `TS2322`, `TS2322`).

**Contoh setengah jadi.** Isi: `true`, `true`, `*.ts`.

**Soal Parsons.** Urutan benar: c, b, a, d.

**Latihan.** 1: baris 1: parameter `nama` tanpa tipe; baris 5: `null` tidak boleh ke `number`; baris 7: `daftar[0]` bisa `undefined`. 2: contoh: beri tipe parameter, ganti `number` menjadi `number | undefined` atau periksa dengan `if` dan `??`. 3: `function rataRataAman(nilai: number[]): number | null`; bila `nilai.length === 0` kembalikan `null`. 4: contoh yang berubah: parameter tanpa tipe diterima, `null` ke `number` diterima, indeks array tidak lagi `undefined`; risikonya galat nyata lolos ke pengguna.

**Latihan bercampur.** 1: memvalidasi memeriksa angka sah dan rentang; merapikan membuang spasi dan menyamakan huruf; tipe kembalian berbentuk gabungan terbeda `{ ok: true; ... } | { ok: false; pesan: string }` (`b-xi1-m3`). 2: contoh: "diberikan perubahan kode, ketika `bunx tsc -p .` mencetak galat, maka perubahan tidak digabung".

**Ulang berjarak.** 1: menyalakan sekelompok pemeriksaan ketat sekaligus, misalnya `noImplicitAny` yang menolak parameter tanpa tipe (`TS7006`) dan `strictNullChecks` yang menolak `null` pada `number` (`TS2322`). 2: karena indeks bisa melewati ujung array sehingga elemen yang ada bisa tidak ada. 3: karena Bun hanya menghapus tipe dan tidak memeriksanya; jalankan `tsc` dan perbaiki galat sebelum menggabungkan.

## Langkah berikutnya

Modul berikut: `b-xi1-m5` (Bun: runtime dan pengelola paket), yang memasang `typescript` dan `@types/bun` sebagai paket proyek. Bacaan lanjut: halaman TSConfig Reference (`strict`, `noUncheckedIndexedAccess`) di dokumentasi TypeScript dan halaman TypeScript di dokumentasi Bun.
