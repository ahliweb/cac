## Untuk siapa modul ini

Modul ini untuk murid kelas XI jalur B (Web dengan JavaScript, TypeScript, dan Bun), minggu `B-XI1-M3` silabus v1.4.1: TypeScript II, yaitu `interface`, `type`, tipe gabungan, dan generik dasar. Prasyarat: modul `b-xi1-m2` (TypeScript I: tipe dasar). Kamu juga memakai objek dari `b-x2-m3` dan pengurutan dari `b-x2-m9`.

Modul ini berstatus DRAF: karangan penyusun, belum ditinjau pemilik. Butir CP untuk minggu ini tidak dipetakan silabus; modul ini tidak dihitung memenuhi butir CP apa pun.

Semua contoh dijalankan penyusun dengan Bun 1.4.4 dan diperiksa dengan TypeScript 7.0.2 (`bunx tsc --noEmit`) per 2026-11. Data berupa katalog buku karangan, tanpa data nyata dan tanpa akun. Tugas baca-dan-prediksi ditandai `AI: tanpa AI`; selain itu AI generatif boleh dipakai dengan etika dan dicatat, tanpa data pribadi, kata sandi, atau tugas bernilai pada permintaanmu.

## Ingat kembali

Jawab dari ingatan dulu, baru cek di bagian kunci. Soal 1 dari `b-xi1-m2`, soal 2 dari `b-x2-m6`, soal 3 dari `b-x2-m9`.

1. Tulis tanda tangan fungsi `jumlah` yang menerima dua `number` dan mengembalikan `number`.
2. Mengapa `document.querySelector` dapat mengembalikan `null`, dan bagaimana mencegahnya?
3. Mengapa `[10, 9, 1].sort()` tanpa pembanding memberi hasil yang mengejutkan, dan bagaimana memperbaikinya?

## Tujuan

Setelah modul ini kamu dapat:

- memodelkan data berbentuk objek dengan `interface` atau `type`, termasuk properti opsional;
- membatasi nilai dengan tipe gabungan dan tipe literal, lalu menyempitkannya dengan pemeriksaan;
- menulis fungsi generik sederhana dan membaca tipe seperti `T[]`;
- membaca galat tipe yang muncul saat bentuk data tidak sesuai (keluaran minggu ini: modul bertipe).

## Prediksi dulu

Ini tugas baca-dan-prediksi, `AI: tanpa AI`. **Tebak dulu, tulis jawabanmu, baru jalankan.** Tipe `Id` boleh angka atau teks.

```ts
type Id = number | string;

function tampil(id: Id): string {
  if (typeof id === "number") {
    return "No. " + id.toFixed(0);
  }
  return "Kode " + id.toUpperCase();
}

console.log(tampil(7));
console.log(tampil("ab-1"));
```

1. Apa dua baris yang tercetak?
2. Bila `id.toUpperCase()` ditulis di luar `if` dan di atas `return` pertama, apakah `tsc` menerimanya? Mengapa?

## Contoh terselesaikan

Keluaran pada percobaan penyusun:

```text
No. 7
Kode AB-1
```

Di dalam `if (typeof id === "number")` TypeScript tahu `id` adalah `number`; setelah `if` ia tahu sisanya `string`. Itu yang disebut **penyempitan** (*narrowing*). Tipe gabungan `number | string` berarti "salah satu dari keduanya".

Sekarang model data. `interface` menamai bentuk objek, `type` memberi nama pada tipe apa pun, termasuk gabungan dan literal. Tipe literal `"tersedia" | "dipinjam"` hanya menerima dua teks itu. Tanda `?` membuat properti opsional.

```ts
type Status = "tersedia" | "dipinjam";

interface Buku {
  judul: string;
  tahun: number;
  status: Status;
  penulis?: string;
}

const katalog: Buku[] = [
  { judul: "Belajar Array", tahun: 2024, status: "tersedia" },
  { judul: "Peta Sungai", tahun: 2019, status: "dipinjam", penulis: "Karangan A" },
  { judul: "Dasar Web", tahun: 2022, status: "tersedia" },
];

function judulTersedia(daftar: Buku[]): string[] {
  return daftar.filter((b) => b.status === "tersedia").map((b) => b.judul);
}

function deskripsi(b: Buku): string {
  const oleh = b.penulis ?? "penulis tidak dicatat";
  return `${b.judul} (${b.tahun}) oleh ${oleh}`;
}

console.log(judulTersedia(katalog));
console.log(deskripsi(katalog[1]));
console.log(deskripsi(katalog[0]));
```

```text
[ "Belajar Array", "Dasar Web" ]
Peta Sungai (2019) oleh Karangan A
Belajar Array (2024) oleh penulis tidak dicatat
```

`bunx tsc --noEmit` tidak melaporkan galat untuk berkas itu. Pada contoh berikut kita sengaja melanggar bentuknya (berkas `salah.ts`, tiga objek dengan satu kesalahan masing-masing); galat yang dilaporkan penyusun:

```text
salah.ts(9,7): error TS2741: Property 'status' is missing in type '{ judul: string; tahun: number; }' but required in type 'Buku'.
salah.ts(10,47): error TS2322: Type '"rusak"' is not assignable to type 'Status'.
salah.ts(11,35): error TS2322: Type 'string' is not assignable to type 'number'.
```

Tiga pesan itu menangkap tiga jenis masalah yang di JavaScript baru ketahuan saat program dipakai: properti hilang, nilai di luar pilihan, dan tipe salah.

**Gabungan terbeda.** Ketika dua bentuk berbeda dipisahkan oleh satu properti penanda, TypeScript bisa menyempitkan lewat penanda itu:

```ts
type Hasil =
  | { ok: true; nilai: number }
  | { ok: false; pesan: string };

function bagi(a: number, b: number): Hasil {
  if (b === 0) {
    return { ok: false, pesan: "pembagi nol" };
  }
  return { ok: true, nilai: a / b };
}

function lapor(h: Hasil): string {
  if (h.ok) {
    return "hasil " + h.nilai;
  }
  return "gagal: " + h.pesan;
}

console.log(lapor(bagi(10, 4)));
console.log(lapor(bagi(1, 0)));
```

```text
hasil 2.5
gagal: pembagi nol
```

Di cabang `h.ok` `nilai` ada; di luarnya `pesan` yang ada. Bentuk ini lebih jujur daripada mengembalikan `-1` atau `null` tanpa penjelasan.

**Generik dasar.** Fungsi yang bekerja untuk tipe apa pun, tetapi menjaga hubungan antara masukan dan keluaran, memakai parameter tipe `T`:

```ts
function pertama<T>(daftar: T[]): T | undefined {
  return daftar[0];
}

const angka = pertama([5, 6, 7]);
const kata = pertama(["a", "b"]);
const kosong = pertama<number>([]);
console.log(angka, kata, kosong);
console.log(angka.toFixed(1));
```

```text
5 a undefined
5.0
```

Program berjalan, tetapi `tsc` menolak baris terakhir: `generik.ts(9,13): error TS18048: 'angka' is possibly 'undefined'.` Pada array kosong `pertama` memang mengembalikan `undefined`, jadi tipenya `number | undefined`. Perbaikannya memeriksa dulu `if (angka !== undefined)`. Lihat bahwa `Array<T>` yang kamu pakai sejak `b-x2-m1` pun generik.

## Contoh setengah jadi

Modelkan satu pengguna karangan dengan `type` dan satu fungsi yang menyapanya.

```ts setengah-jadi
interface Siswa {
  nama: ____;
  kelas: ____ | ____;
}
function sapa(s: Siswa): string {
  return "Halo, " + s.nama + " (kelas " + s.kelas + ")";
}
console.log(sapa({ nama: "Dewi-contoh", kelas: 11 }));
```

## Soal Parsons

Susun baris berikut (sudah diacak) menjadi fungsi `terakhir` yang generik. `AI: tanpa AI`.

```text
(a) return daftar[daftar.length - 1];
(b) function terakhir<T>(daftar: T[]): T | undefined {
(c) }
```

## Latihan

1. `AI: tanpa AI` **Telusuri.** Dari `salah.ts`, tulis perbaikan tiap objek agar lolos `tsc`, tanpa mengubah tipenya.
2. `AI: boleh` **Model data fiktif.** Buat `interface Tugas` (judul, tenggat berupa teks, selesai `boolean`, catatan opsional) dan fungsi yang mengembalikan judul tugas yang belum selesai.
3. `AI: tanpa AI` **Rancangan dulu.** Tulis tipe `Pembayaran` yang bisa berupa `{ jenis: "tunai"; jumlah: number }` atau `{ jenis: "transfer"; jumlah: number; bank: string }` sebelum menulis fungsi `ringkas(p)`.
4. `AI: boleh` **Generik.** Tulis `ambilSemua<T>(daftar: T[], ukuran: number): T[]` yang mengembalikan `ukuran` elemen pertama, dan jalankan dengan angka dan dengan teks.
5. *Opsional:* **catatan pemakaian AI.** Kerjakan nomor 3 sendiri dulu, lalu minta AI menilai apakah tipe gabunganmu bisa dibedakan, bukan menulis ulang. Catat alat, tujuan, garis besar perintah, bagian yang kamu pakai, dan cara memeriksanya (`bunx tsc --noEmit`). Jangan menaruh data pribadi atau tugas bernilai pada perintah.

Berkas `salah.ts` untuk nomor 1 (sengaja salah, jadi tidak diperiksa otomatis):

```ts setengah-jadi
type Status = "tersedia" | "dipinjam";

interface Buku {
  judul: string;
  tahun: number;
  status: Status;
}

const a: Buku = { judul: "Dasar Web", tahun: 2022 };
const b: Buku = { judul: "Peta", tahun: 2019, status: "rusak" };
const c: Buku = { judul: "Array", tahun: "2024", status: "tersedia" };
console.log(a, b, c);
```

## Latihan bercampur

1. `AI: boleh` Urutkan katalog buku menurut `tahun` dari yang lama. Bagaimana kamu menulis pembanding, dan mengapa pembanding yang diketik mencegah kebingungan antara angka dan teks?
2. `AI: boleh` Fungsi `bersihkan` dari `b-x2-m10` menerima teks dari pengguna dan mengembalikan `Hasil` (`ok` atau `pesan`). Tulis tipe `Hasil` untuk itu.

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `b-xi1-m4` (pertanyaan 1), sekitar tiga minggu lagi di `b-xi1-m6` (pertanyaan 2), dan sekitar delapan minggu lagi di `b-xi1-m11` (pertanyaan 3). Jawab sekarang lalu simpan.

1. Apa beda `interface` dan tipe literal seperti `"tersedia" | "dipinjam"`? Beri satu kegunaan masing-masing.
2. Apa yang dimaksud penyempitan tipe, dan satu cara memicunya?
3. Mengapa `pertama<T>(daftar: T[])` mengembalikan `T | undefined`, bukan `T`?

## Kesalahan umum

- **Mengira `interface` memeriksa data saat program berjalan.** Tipe hilang saat dijalankan; data dari luar (JSON, formulir) tetap harus diperiksa sendiri (dibahas lagi di `b-xi2-m3`).
- **Memaksa tipe dengan `as`.** Itu membungkam `tsc`, bukan memperbaiki data.
- **Lupa properti opsional bisa `undefined`.** Pakai `??` atau periksa dulu, seperti `b.penulis ?? "..."`.
- **Menulis gabungan yang tidak bisa dibedakan.** Tanpa properti penanda, penyempitan sulit.
- **Memberi nama generik tanpa arti.** `T` baik untuk satu tipe; beri nama lebih jelas bila ada beberapa.

## Cek mandiri

- [ ] Saya dapat menulis `interface` dan `type` untuk data berbentuk objek.
- [ ] Saya dapat memakai tipe literal dan gabungan, termasuk penyempitannya.
- [ ] Saya dapat menjelaskan `T[]` dan fungsi generik sederhana.
- [ ] Saya dapat membaca galat `TS2741`, `TS2322`, dan `TS18048`.
- [ ] Saya memakai data karangan saja.

## Kunci dan petunjuk

**Ingat kembali.** 1: `function jumlah(a: number, b: number): number`. 2: bila tidak ada elemen yang cocok, hasilnya `null`; cegah dengan memeriksa `if (elemen !== null)` sebelum dipakai. 3: tanpa pembanding, elemen dibandingkan sebagai teks sehingga `"10"` lebih kecil dari `"9"`; perbaiki dengan `(a, b) => a - b`.

**Prediksi dulu.** 1: `No. 7` dan `Kode AB-1`. 2: tidak; di sana `id` masih `number | string`, dan `toUpperCase` tidak ada pada `number`.

**Contoh setengah jadi.** Isi: `string`, `number`, `string`; atau `kelas: number | string`. Kuncinya (dijalankan dengan `bun run`):

```ts
interface Siswa {
  nama: string;
  kelas: number | string;
}
function sapa(s: Siswa): string {
  return "Halo, " + s.nama + " (kelas " + s.kelas + ")";
}
console.log(sapa({ nama: "Dewi-contoh", kelas: 11 }));
```

```text
Halo, Dewi-contoh (kelas 11)
```

**Soal Parsons.** Urutan benar: b, a, c.

**Latihan.** 1: objek pertama tambah `status: "tersedia"`, kedua ganti `"rusak"` dengan `"dipinjam"`, ketiga ganti `"2024"` dengan `2024`. 2: contoh: `interface Tugas { judul: string; tenggat: string; selesai: boolean; catatan?: string }` dan `filter((t) => !t.selesai).map((t) => t.judul)`. 3: `type Pembayaran = { jenis: "tunai"; jumlah: number } | { jenis: "transfer"; jumlah: number; bank: string }`; di `ringkas`, `if (p.jenis === "transfer")` baru `p.bank` boleh dipakai. 4: contoh: `return daftar.slice(0, ukuran);`.

**Latihan bercampur.** 1: `katalog.toSorted((a, b) => a.tahun - b.tahun)`; pada percobaan penyusun judul terurut `Peta Sungai`, `Dasar Web`, `Belajar Array`; bila `tahun` tertulis teks, `tsc` menolak `a.tahun - b.tahun`. 2: contoh: `type Hasil = { ok: true; nilai: string } | { ok: false; pesan: string }`.

**Ulang berjarak.** 1: `interface` menamai bentuk objek (mis. buku); tipe literal membatasi nilai pada pilihan tertentu (mis. status). 2: penyempitan membuat TypeScript tahu tipe yang lebih sempit di cabang tertentu; dipicu oleh `typeof`, perbandingan literal, atau properti penanda. 3: karena pada array kosong tidak ada elemen pertama.

## Langkah berikutnya

Modul berikut: `b-xi1-m4` (`tsconfig` dan mode ketat), yang mengatur kompiler dan menjelaskan mengapa galat seperti `TS18048` muncul. Modul terkait: `matkom-himpunan-relasi-fungsi` untuk gagasan fungsi dari satu himpunan ke himpunan lain. Bacaan lanjut: halaman Object Types, Narrowing, dan Generics di dokumentasi TypeScript.
