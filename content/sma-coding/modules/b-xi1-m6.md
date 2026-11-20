## Untuk siapa modul ini

Modul ini untuk murid kelas XI jalur B (Web dengan JavaScript, TypeScript, dan Bun), minggu `B-XI1-M6` silabus v1.4.1: modul ESM dan paket. Prasyarat: modul `b-xi1-m5` (Bun: runtime dan pengelola paket). Kamu juga memakai tipe dari `b-xi1-m3` dan Git dari `b-x2-m12`.

Modul ini berstatus DRAF: karangan penyusun, belum ditinjau pemilik. Butir CP untuk minggu ini tidak dipetakan silabus; modul ini tidak dihitung memenuhi butir CP apa pun.

Semua contoh dijalankan penyusun dengan Bun 1.4.4 dan TypeScript 7.0.2 per 2026-11. Paket yang dibuat di sini **lokal**, di folder komputermu sendiri: tidak diunggah ke registri mana pun, tanpa akun, dan tanpa data nyata. Tugas baca-dan-prediksi ditandai `AI: tanpa AI`; selain itu AI generatif boleh dipakai dengan etika dan dicatat, tanpa data pribadi, kata sandi, atau tugas bernilai pada permintaanmu.

## Ingat kembali

Jawab dari ingatan dulu, baru cek di bagian kunci. Soal 1 dari `b-xi1-m5`, soal 2 dari `b-xi1-m3`, soal 3 dari `b-x2-m12`.

1. Apa beda `dependencies` dan `devDependencies`, dan berkas mana yang mencatat versi pasti yang terpasang?
2. Apa yang dimaksud penyempitan tipe, dan satu cara memicunya?
3. Apa beda `git fetch` dan `git pull`?

## Tujuan

Setelah modul ini kamu dapat:

- memecah kode menjadi beberapa berkas dengan `export` dan `import`;
- membedakan ekspor bernama dan ekspor bawaan (`default`), serta mengimpor tipe dengan `import type`;
- menjelaskan mengapa fungsi yang tidak diekspor bersifat tertutup;
- membuat paket lokal kecil dan memakainya dari proyek lain (keluaran minggu ini: proyek multi-modul).

## Prediksi dulu

Ini tugas baca-dan-prediksi, `AI: tanpa AI`. **Tebak dulu, tulis jawabanmu, baru jalankan.** Berkas `cetak.ts` mencetak sesuatu saat dimuat; berkas `dua.ts` mengimpornya dua kali.

```ts
console.log("modul dimuat");
export const x = 1;
```

```ts
import "./cetak.ts";
import { x } from "./cetak.ts";
console.log(x);
```

1. Apa yang tercetak bila `dua.ts` dijalankan dengan `bun run dua.ts`?
2. Berapa kali kata "modul dimuat" tercetak, dan mengapa?

## Contoh terselesaikan

Pada percobaan penyusun keluarannya:

```text
modul dimuat
1
```

Sebuah modul ES dimuat dan dijalankan **sekali**, walaupun diimpor dua kali; semua pengimpor memakai hasil yang sama. Itu sebabnya modul cocok untuk menyimpan fungsi dan nilai yang dipakai bersama.

Sekarang pustaka kecil bernama `statistik-kelas`. Susunan foldernya:

```text
app/
  main.ts
  package.json
  pustaka/
    package.json
    index.ts
    jumlah.ts
    rata.ts
```

Berkas pertama mengekspor satu fungsi **bernama**:

```ts
export function jumlah(nilai: number[]): number {
  let hasil = 0;
  for (const n of nilai) {
    hasil += n;
  }
  return hasil;
}
```

Berkas kedua mengimpornya, mengekspor satu tipe, satu fungsi bernama, dan satu fungsi `default`. Fungsi `bagiAman` **tidak diekspor**, jadi hanya terlihat di dalam berkas itu:

```ts
import { jumlah } from "./jumlah.ts";

export interface Ringkasan {
  banyak: number;
  rata: number;
}

function bagiAman(a: number, b: number): number {
  return b === 0 ? 0 : a / b;
}

export function rataRata(nilai: number[]): number {
  return bagiAman(jumlah(nilai), nilai.length);
}

export default function ringkas(nilai: number[]): Ringkasan {
  return { banyak: nilai.length, rata: rataRata(nilai) };
}
```

Ekspor bernama diimpor dengan kurung kurawal dan nama yang sama (`import { jumlah }`); ekspor bawaan diimpor tanpa kurung dan boleh diberi nama lokal apa saja (`import ringkas from ...`). Satu berkas paling banyak punya satu ekspor bawaan. Banyak tim memilih ekspor bernama karena namanya konsisten di seluruh proyek, tetapi itu kebiasaan, bukan aturan bahasa.

Berkas ketiga, `index.ts`, menjadi **pintu depan** paket: ia mengumpulkan yang boleh dipakai dari luar.

```ts
import { jumlah } from "./jumlah.ts";
import ringkas, { rataRata } from "./rata.ts";

export { jumlah, rataRata, ringkas };
export type { Ringkasan } from "./rata.ts";
```

`package.json` paket menamai paket dan menunjuk pintu depannya lewat `exports`:

```json
{
  "name": "statistik-kelas",
  "version": "0.1.0",
  "type": "module",
  "exports": "./index.ts"
}
```

`"type": "module"` menyatakan berkas di paket ini modul ES. Untuk memakainya dari proyek `app`, tambahkan paket lokal; dokumentasi `bun add` menyebut bahwa folder lokal dapat ditambahkan lewat jalurnya:

```sh
bun add ./pustaka
```

```text
bun add v1.4.4 (38afee6c8)
Saved lockfile

installed statistik-kelas@pustaka

1 package installed [2.00ms]
```

Di `package.json` proyek muncul `"statistik-kelas": "./pustaka"`. Lalu pemakainya:

```ts
import { rataRata, ringkas } from "statistik-kelas";
import type { Ringkasan } from "statistik-kelas";

const nilai: number[] = [80, 75, 90];
const r: Ringkasan = ringkas(nilai);
console.log(rataRata(nilai).toFixed(1));
console.log(r);
console.log(rataRata([]));
```

```text
81.7
{
  banyak: 3,
  rata: 81.66666666666667,
}
0
```

`import type` hanya membawa tipe dan lenyap saat dijalankan; `rataRata([])` memberi `0` karena `bagiAman` melindungi dari pembagian nol. Pemeriksaan `bun check` menyatakan `✓ No type errors in 8 files`. Percobaan memakai fungsi yang tidak diekspor, `import { bagiAman } from "statistik-kelas"`, ditolak di dua tempat: `tsc` melaporkan `error TS2305: Module '"statistik-kelas"' has no exported member 'bagiAman'.`, dan `bun run` berhenti dengan `SyntaxError: Export named 'bagiAman' not found in module ...`. Dengan begitu paket menjaga bagian dalamnya: pemakai hanya bergantung pada yang dijanjikan di pintu depan.

## Contoh setengah jadi

Lengkapi berkas yang mengekspor satu fungsi bernama dan satu nilai `default`.

```ts setengah-jadi
export ____ function kuadrat(n: number): number {
  return n * n;
}

____ ____ function kubik(n: number): number {
  return n * n * n;
}
```

## Soal Parsons

Susun baris berikut (sudah diacak) menjadi `main.ts` yang memakai paket dan mencetak jumlah. `AI: tanpa AI`.

```text
(a) const nilai = [1, 2, 3];
(b) import { jumlah } from "statistik-kelas";
(c) console.log(jumlah(nilai));
```

## Latihan

1. `AI: tanpa AI` **Telusuri.** Pada `index.ts` di atas, sebut apa yang bisa diimpor dari luar paket dan apa yang tidak, lalu tulis satu impor yang akan ditolak.
2. `AI: boleh` **Pustaka kecil.** Buat paket lokal `alat-teks` dengan dua fungsi bernama (misalnya `hurufBesarAwal` dan `hitungKata`), pintu depan `index.ts`, dan `package.json`. Pasang ke proyek lain dengan `bun add` dan jalankan.
3. `AI: tanpa AI` **Rancangan dulu.** Gambar di kertas folder paketmu dan tulis fungsi mana yang diekspor dan mana yang tertutup, sebelum menulis kode.
4. `AI: boleh` **Impor tipe.** Tambah `export interface` pada paketmu dan impor dengan `import type` di proyek pemakai; periksa dengan `bun check`.
5. *Opsional:* **catatan pemakaian AI.** Kerjakan nomor 3 sendiri dulu, lalu minta AI menilai apakah pembagian ekspor dan tertutupmu masuk akal, bukan menulis ulang paketnya. Catat alat, tujuan, garis besar perintah, bagian yang kamu pakai, dan cara memeriksanya. Jangan menaruh data pribadi atau tugas bernilai pada perintah.

## Latihan bercampur

1. `AI: boleh` Tulis pustaka kecil itu di cabang Git sendiri (`b-x2-m12`) dan tentukan berkas mana yang di-commit dan mana yang diabaikan (`b-xi1-m5`).
2. `AI: boleh` Fungsi mana dari paketmu yang perlu tipe kembalian berbentuk `number | null` (`b-xi1-m4`) supaya array kosong tidak menyamar sebagai hasil sah?

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `b-xi1-m7` (pertanyaan 1), sekitar tiga minggu lagi di `b-xi1-m9` (pertanyaan 2), dan sekitar delapan minggu lagi di `b-xi1-m14` (pertanyaan 1). Jawab sekarang lalu simpan.

1. Apa beda ekspor bernama dan ekspor bawaan, dan bagaimana masing-masing diimpor?
2. Mengapa sebuah modul ES yang diimpor di dua berkas hanya dijalankan sekali?
3. Apa kegunaan `index.ts` sebagai pintu depan paket, dan apa akibatnya pada fungsi yang tidak diekspor?

## Kesalahan umum

- **Mengimpor dengan kurung kurawal untuk ekspor bawaan, atau sebaliknya.** `import { ringkas } from ...` gagal bila `ringkas` bawaan.
- **Mengekspor semuanya.** Fungsi bantu yang ikut diekspor menjadi janji yang harus dijaga selamanya.
- **Lupa `import type` untuk tipe.** Pada proyek dengan `verbatimModuleSyntax` tipe yang diimpor sebagai nilai bisa menimbulkan galat.
- **Mengubah paket lokal lalu heran pemakai tidak berubah.** Pasang ulang dengan `bun install` atau `bun add` bila pemakai masih memakai salinan lama.
- **Menyalin berkas antar proyek, bukan menjadikannya paket.** Dua salinan segera berbeda.

## Cek mandiri

- [ ] Saya dapat memecah kode menjadi berkas dengan `export` dan `import`.
- [ ] Saya dapat membedakan ekspor bernama dan bawaan.
- [ ] Saya dapat membuat paket lokal dan memasangnya dengan `bun add`.
- [ ] Saya dapat menjelaskan fungsi `index.ts` dan fungsi yang tertutup.
- [ ] Saya memakai data karangan saja.

## Kunci dan petunjuk

**Ingat kembali.** 1: `dependencies` dipakai program saat berjalan; `devDependencies` hanya saat pengembangan (mis. tipe); versi pasti ada di `bun.lock`. 2: penyempitan membuat TypeScript tahu tipe yang lebih sempit di cabang tertentu; dipicu oleh `typeof`, perbandingan literal, atau properti penanda. 3: `fetch` hanya mengambil riwayat baru; `pull` menjalankan `fetch` lalu memasukkan hasilnya ke cabang saat ini.

**Prediksi dulu.** 1: `modul dimuat` lalu `1`. 2: sekali, karena modul dimuat dan dijalankan sekali lalu hasilnya dipakai bersama oleh semua pengimpor.

**Contoh setengah jadi.** Isi: `export` (untuk `kuadrat`), lalu `export default` untuk `kubik`. Kuncinya:

```ts
export function kuadrat(n: number): number {
  return n * n;
}

export default function kubik(n: number): number {
  return n * n * n;
}
```

**Soal Parsons.** Urutan benar: b, a, c.

**Latihan.** 1: dari luar bisa diimpor `jumlah`, `rataRata`, `ringkas`, dan tipe `Ringkasan`; `bagiAman` tidak; `import { bagiAman } from "statistik-kelas"` ditolak. 2: contoh: `export function hurufBesarAwal(s: string): string { return s.charAt(0).toUpperCase() + s.slice(1); }`; `hitungKata` memecah teks pada spasi; periksa dengan `bun run`. 3: diterima bila fungsi bantu tertutup dan hanya fungsi yang dijanjikan yang diekspor. 4: contoh: `export interface Kata { teks: string; panjang: number }` dan `import type { Kata } from "alat-teks"`.

**Latihan bercampur.** 1: di-commit: kode, `package.json`, `bun.lock`; diabaikan: `node_modules`. 2: fungsi seperti `rataRata` yang bisa menerima array kosong; kembalikan `null` untuk "tidak ada data" bila `0` bisa dikira rata-rata sungguhan.

**Ulang berjarak.** 1: ekspor bernama diimpor dengan kurung kurawal dan nama yang sama; ekspor bawaan diimpor tanpa kurung dengan nama lokal bebas. 2: karena modul dimuat dan dijalankan sekali lalu hasilnya dipakai bersama. 3: `index.ts` mengumpulkan yang dijanjikan untuk dipakai dari luar; yang tidak diekspor tidak bisa diimpor.

## Langkah berikutnya

Modul berikut: `b-xi1-m7` (pengujian dengan `bun test`), yang menulis uji untuk fungsi seperti `rataRata`. Bacaan lanjut: panduan Modul JavaScript di MDN, halaman `export` dan `import`, dan halaman Module Resolution di dokumentasi Bun.
