## Untuk siapa modul ini

Modul ini untuk murid kelas XI jalur B (Web dengan JavaScript, TypeScript, dan Bun), minggu `B-XI2-M3` silabus v1.4.1: validasi masukan dengan skema. Prasyarat: modul `b-xi2-m2` (rute dan API JSON) dan `b-xi1-m3` (tipe `interface`, `type`, dan generik dasar).

Modul ini berstatus DRAF: karangan penyusun, belum ditinjau pemilik. Butir `F-AP-d` dipetakan silabus sebagai dipenuhi jalur ini; modul draf ini belum dihitung sebagai pemenuhan butir itu.

Contoh dijalankan penyusun dengan Bun 1.4.4, TypeScript 7.0.2, dan **Zod 4.6.7** per 2026-11 (versi yang terpasang oleh `bun add zod` saat penyusun menulis; versi di komputermu bisa berbeda dan Zod 4 berbeda dari Zod 3, jadi cek `package.json`). Server hanya di `localhost`, tanpa akun, dan semua datanya karangan. Tugas baca-dan-prediksi ditandai `AI: tanpa AI`; selain itu AI generatif boleh dipakai dengan etika dan dicatat, tanpa data pribadi, kata sandi, atau tugas bernilai pada permintaanmu.

## Ingat kembali

Jawab dari ingatan dulu, baru cek di bagian kunci. Soal 1 dari `b-xi2-m2`, soal 2 dari `b-xi1-m12`, soal 3 dari `b-xi1-m9`.

1. Apa arti status 201, 400, dan 404 pada API tugas, dan mana yang berarti kesalahan ada pada klien?
2. Apa beda `git diff main..fitur` dan `git diff main...fitur`, dan mana yang dipakai peninjau untuk melihat isi cabang?
3. Apa yang disimpan memoisasi, dan di mana catatannya harus dibuat agar bekerja?

## Tujuan

Setelah modul ini kamu dapat:

- menjelaskan mengapa tipe TypeScript tidak melindungi program dari data yang datang saat berjalan;
- menulis skema Zod dengan batas, nilai bawaan, dan pesan galat sendiri;
- memakai `safeParse` pada badan permintaan dan menjawab 400 berisi rincian per bidang;
- menurunkan tipe dari skema dengan `z.infer` (keluaran minggu ini: skema validasi yang menolak masukan salah).

## Prediksi dulu

Ini tugas baca-dan-prediksi, `AI: tanpa AI`. **Tebak dulu, tulis jawabanmu, baru jalankan.** Berkas `skema.ts`:

```ts
import { z } from "zod";

export const TugasBaru = z.object({
  judul: z.string().trim().min(1, "judul tidak boleh kosong").max(80, "judul terlalu panjang"),
  selesai: z.boolean().default(false),
});

export type TugasBaru = z.infer<typeof TugasBaru>;
```

Skema ini dipakai dengan `TugasBaru.safeParse(masukan)`. Untuk masukan berikut, apakah lolos, dan bila lolos, apa datanya?

1. `{ judul: "  Latihan Zod  " }`
2. `{ judul: "" }`
3. `{ judul: "Ada tambahan", warna: "merah" }`
4. `{ judul: 42, selesai: "ya" }`

## Contoh terselesaikan

Pemeriksa tipe tidak melihat data yang datang lewat jaringan: tipe hanya ada saat kode ditulis, dan `JSON.parse` mengembalikan `any`. Program berikut diperiksa `bunx tsc --noEmit` tanpa galat (pada percobaan penyusun), padahal isinya salah:

```ts
import { TugasBaru } from "./skema";

const mentah = '{"judul": 42, "selesai": "ya"}';

const dipercaya: TugasBaru = JSON.parse(mentah);
console.log("tipe menurut TS: string; isi sebenarnya:", typeof dipercaya.judul);

const diperiksa = TugasBaru.safeParse(JSON.parse(mentah));
console.log("diperiksa Zod, lolos?", diperiksa.success);
```

```text
tipe menurut TS: string; isi sebenarnya: number
diperiksa Zod, lolos? false
```

Karena itu data dari luar program (badan permintaan, berkas, jawaban API orang lain) diperiksa **saat berjalan**. Zod melakukannya dengan skema: deskripsi bentuk data yang sah. `safeParse` tidak melempar galat; ia mengembalikan objek `success` (dengan `data` yang sudah dirapikan) atau (dengan `error`, yang `issues`-nya berisi jalur bidang dan pesan). Program berikut dijalankan penyusun dengan enam masukan:

```ts
import { TugasBaru } from "./skema";

const masukan: unknown[] = [
  { judul: "  Latihan Zod  " },
  { judul: "" },
  { judul: 42, selesai: "ya" },
  { selesai: true },
  "bukan objek",
  { judul: "Ada tambahan", warna: "merah" },
];

for (const m of masukan) {
  const hasil = TugasBaru.safeParse(m);
  if (hasil.success) {
    console.log("lolos :", JSON.stringify(hasil.data));
  } else {
    console.log("ditolak:", JSON.stringify(hasil.error.issues.map((i) => `${i.path.join(".") || "(akar)"}: ${i.message}`)));
  }
}
```

```text
lolos : {"judul":"Latihan Zod","selesai":false}
ditolak: ["judul: judul tidak boleh kosong"]
ditolak: ["judul: Invalid input: expected string, received number","selesai: Invalid input: expected boolean, received string"]
ditolak: ["judul: Invalid input: expected string, received undefined"]
ditolak: ["(akar): Invalid input: expected object, received string"]
lolos : {"judul":"Ada tambahan","selesai":false}
```

Baca hasilnya baris demi baris. Masukan pertama lolos dan **dirapikan**: `trim()` membuang spasi dan `default(false)` mengisi `selesai`. Masukan kedua ditolak dengan pesan buatan kita; masukan ketiga memperlihatkan **semua** masalah sekaligus, dengan pesan bawaan Zod yang berbahasa Inggris pada versi ini (pesan buatan sendiri adalah cara menjadikannya berbahasa Indonesia). Bidang tambahan `warna` pada masukan terakhir **dibuang diam-diam**: perilaku bawaan Zod untuk objek, dan hasilnya tidak memuat `warna`. Tipe `TugasBaru` pada `skema.ts` diturunkan dari skema dengan `z.infer`, jadi bentuk datanya ditulis satu kali saja dan tipe tidak bisa menyimpang dari pemeriksaan.

Skema ini dipasang pada rute `POST /api/tugas` dari modul sebelumnya, menggantikan pemeriksaan tulisan tangan. Bagian pentingnya (berkas lengkap ada di kunci):

```ts setengah-jadi
const hasil = TugasBaru.safeParse(badan);
if (!hasil.success) {
  const rincian = hasil.error.issues.map((i) => ({ bidang: i.path.join("."), pesan: i.message }));
  return Response.json({ galat: "masukan tidak valid", rincian }, { status: 400 });
}
```

Pada percobaan penyusun, perintah `curl -s -w ' [%{http_code}]\n' -X POST -H 'content-type: application/json' -d '...' http://localhost:3000/api/tugas` dengan badan yang berbeda memberi:

```text
{"id":2,"judul":"Latihan Zod","selesai":false} [201]
{"galat":"masukan tidak valid","rincian":[{"bidang":"judul","pesan":"judul tidak boleh kosong"}]} [400]
{"galat":"masukan tidak valid","rincian":[{"bidang":"judul","pesan":"Invalid input: expected string, received number"},{"bidang":"selesai","pesan":"Invalid input: expected boolean, received string"}]} [400]
{"galat":"masukan tidak valid","rincian":[{"bidang":"judul","pesan":"Invalid input: expected string, received undefined"}]} [400]
{"galat":"badan bukan JSON"} [400]
```

Badan pertama `{"judul":"  Latihan Zod  "}`, lalu `{"judul":""}`, `{"judul":42,"selesai":"ya"}`, `{"selesai":true}`, dan `{bukan json`. Perhatikan bahwa JSON rusak tetap perlu `try/catch` di luar skema, karena skema baru bekerja setelah teks berhasil dibaca menjadi data.

## Contoh setengah jadi

Lengkapi skema untuk `PUT` yang mengganti tugas: `id` bilangan bulat positif, `judul` teks 1 sampai 80 karakter setelah dirapikan, dan `selesai` benar atau salah tanpa nilai bawaan.

```ts setengah-jadi
const Tugas = z.object({
  id: z.number().____().positive(),
  judul: z.string().____().min(1).max(____),
  selesai: z.____(),
});
```

## Soal Parsons

Susun baris berikut (sudah diacak) menjadi pemakaian `safeParse` pada badan yang sudah dibaca, yang mengembalikan 400 bila salah dan 201 bila benar. `AI: tanpa AI`.

```text
(a) const hasil = TugasBaru.safeParse(badan);
(b)   return Response.json({ galat: "masukan tidak valid" }, { status: 400 });
(c) if (!hasil.success) {
(d) }
(e) return Response.json(hasil.data, { status: 201 });
```

## Latihan

1. `AI: boleh` **Bidang baru.** Tambahkan `prioritas` yang hanya boleh `"rendah"`, `"sedang"`, atau `"tinggi"` dan bernilai bawaan `"sedang"` (`z.enum`). Uji dengan lima masukan, termasuk `"mendesak"`.
2. `AI: tanpa AI` **Urutan itu penting.** Skema A: `z.string().trim().min(1)`. Skema B: `z.string().min(1).trim()`. Perkirakan hasil keduanya untuk `"   "` (tiga spasi), jalankan, dan jelaskan mengapa berbeda.
3. `AI: boleh` **Kueri adalah teks.** Tulis skema untuk `?batas=5&selesai=true` dengan `batas` bilangan bulat 1 sampai 50 (bawaan 10) dan `selesai` boleh tidak ada. Bagaimana kamu mengubah teks menjadi angka dan benar atau salah?
4. `AI: boleh` **Uji `bun test`.** Tulis uji untuk skema `TugasBaru`: lima masukan salah harus ditolak dan satu masukan sah harus dirapikan.
5. *Opsional:* **catatan pemakaian AI.** Minta asisten AI menulis skema Zod untuk bentuk data karanganmu, lalu cek: apakah memakai API Zod yang benar untuk versimu (periksa dokumentasi, karena Zod 3 dan 4 berbeda), dan apakah menolak masukan yang salah. Catat alatnya, tujuanmu, garis besar perintahmu, bagian yang kamu pakai, dan cara memeriksanya. Jangan menaruh data pribadi atau tugas bernilai pada perintah.

## Latihan bercampur

1. `AI: boleh` (dari `b-xi2-m2`) Rute `GET /api/tugas/:id` memakai `Number(req.params.id)`. Tulis skema untuk parameter itu (bilangan bulat positif) dan jawab 400, bukan 404, untuk `abc`. Mana yang lebih tepat, dan mengapa?
2. `AI: boleh` (dari `b-xi1-m8`) Simpan tugas dalam `Map<number, Tugas>` dan pakai `z.infer` agar tipe `Tugas` diturunkan dari skema, bukan ditulis dua kali.

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `b-xi2-m4` (pertanyaan 1), sekitar tiga minggu lagi di `b-xi2-m6` (pertanyaan 2), dan sekitar delapan minggu lagi di `b-xi2-m11` (pertanyaan 3). Jawab sekarang lalu simpan.

1. Mengapa tipe TypeScript tidak cukup untuk memeriksa badan permintaan, dan apa yang dikerjakan `safeParse`?
2. Mengapa `trim()` ditulis sebelum `min(1)` pada skema judul?
3. Apa kode status yang tepat untuk badan permintaan yang tidak lolos skema, dan apa yang sebaiknya dimuat di badan balasan?

## Kesalahan umum

- **Mengira tipe TypeScript memeriksa data masuk.** Tipe hilang saat program berjalan; `JSON.parse` memberi `any`.
- **Urutan `min` dan `trim` terbalik.** Pada percobaan penyusun `z.string().min(1).trim()` meloloskan `"   "` dan hasilnya string kosong, sedangkan `z.string().trim().min(1)` menolaknya.
- **`z.coerce.boolean()` untuk teks.** Pada percobaan penyusun `"false"` menjadi `true` karena semua teks tak kosong dianggap benar; pakai `z.stringbool()`.
- **Mempercayai pesan bawaan.** Pesan bawaan berbahasa Inggris dan menyebut isi masukan; tulis pesan sendiri untuk pengguna.
- **Menganggap bidang tambahan ditolak.** Perilaku bawaan: dibuang diam-diam. Itu bisa baik, bisa menyembunyikan salah ketik.
- **Skema tanpa batas atas.** Teks tanpa `max` menerima judul sepanjang yang dikirim.

## Cek mandiri

- [ ] Saya dapat menjelaskan mengapa data dari luar perlu diperiksa saat berjalan.
- [ ] Saya dapat menulis skema Zod dengan batas, nilai bawaan, dan pesan sendiri.
- [ ] Saya memakai `safeParse` dan menjawab 400 berisi rincian per bidang.
- [ ] Saya menurunkan tipe dari skema dengan `z.infer`.
- [ ] Saya tahu versi Zod yang terpasang dan membaca dokumentasi versi itu.

## Kunci dan petunjuk

**Ingat kembali.** 1: 201 berarti berhasil membuat data baru; 400 badan salah; 404 yang diminta tidak ada; 400 dan 404 adalah kesalahan klien. 2: tiga titik menampilkan perubahan cabang sejak bercabang (yang dipakai peninjau); dua titik membandingkan ujung kedua cabang dan memunculkan pekerjaan baru `main` sebagai terhapus. 3: hasil yang sudah dihitung, dengan kunci masalahnya (mis. `n`); catatan dibuat sekali di luar rekursi atau dioper sebagai parameter, bukan dibuat ulang tiap panggilan.

**Prediksi dulu.** 1: lolos, `{"judul":"Latihan Zod","selesai":false}` (`trim` dan `default`). 2: ditolak, `judul tidak boleh kosong`. 3: lolos, `{"judul":"Ada tambahan","selesai":false}`, `warna` dibuang. 4: ditolak, dua masalah (judul bukan teks, `selesai` bukan benar-salah).

**Contoh terselesaikan.** Berkas API lengkap yang dijalankan penyusun (`api.ts`):

```ts
import { TugasBaru } from "./skema";

type Tugas = TugasBaru & { id: number };

const daftar: Tugas[] = [{ id: 1, judul: "Baca bab contoh", selesai: true }];
let idBerikut = 2;

const server = Bun.serve({
  hostname: "localhost",
  port: 3000,
  routes: {
    "/api/tugas": {
      GET: () => Response.json(daftar),
      POST: async (req) => {
        let badan: unknown;
        try {
          badan = await req.json();
        } catch {
          return Response.json({ galat: "badan bukan JSON" }, { status: 400 });
        }
        const hasil = TugasBaru.safeParse(badan);
        if (!hasil.success) {
          const rincian = hasil.error.issues.map((i) => ({
            bidang: i.path.join("."),
            pesan: i.message,
          }));
          return Response.json({ galat: "masukan tidak valid", rincian }, { status: 400 });
        }
        const baru: Tugas = { id: idBerikut++, ...hasil.data };
        daftar.push(baru);
        return Response.json(baru, { status: 201 });
      },
    },
  },
  fetch() {
    return Response.json({ galat: "rute tidak ada" }, { status: 404 });
  },
});

console.log(`API jalan di ${server.url}`);
```

Jalankan `bunx tsc --noEmit` pada folder yang sama untuk pemeriksaan tipe; pada percobaan penyusun tidak ada galat.

**Contoh setengah jadi.** Isi berurutan: `int`, `trim`, `80`, `boolean`.

**Soal Parsons.** Urutan benar: a, c, b, d, e. Parse dulu (a), cek gagal (c), balas 400 (b), tutup `if` (d), baru balas 201 dengan `hasil.data` (e).

**Latihan.** 1: `prioritas: z.enum(["rendah", "sedang", "tinggi"]).default("sedang")`; `"mendesak"` ditolak karena bukan salah satu pilihan. 2: skema A menolak `"   "` (setelah dirapikan menjadi kosong, lalu `min(1)` gagal); skema B meloloskannya dan hasilnya `""`, karena `min(1)` diperiksa sebelum dirapikan. Contoh yang dijalankan penyusun:

```ts
import { z } from "zod";

const trimDulu = z.string().trim().min(1, "kosong");
const trimBelakangan = z.string().min(1, "kosong").trim();

for (const masukan of ["   ", " a "]) {
  const a = trimDulu.safeParse(masukan);
  const b = trimBelakangan.safeParse(masukan);
  console.log(JSON.stringify(masukan), "| trim lalu min:", a.success ? JSON.stringify(a.data) : "ditolak", "| min lalu trim:", b.success ? JSON.stringify(b.data) : "ditolak");
}
```

```text
"   " | trim lalu min: ditolak | min lalu trim: ""
" a " | trim lalu min: "a" | min lalu trim: "a"
```

3: kueri berupa teks; `z.coerce.number()` mengubah teks menjadi angka, dan `z.stringbool()` mengubah `"true"` dan `"false"` menjadi benar atau salah. Contoh yang dijalankan penyusun:

```ts
import { z } from "zod";

const Pencarian = z.object({
  batas: z.coerce.number().int().min(1).max(50).default(10),
  selesai: z.stringbool().optional(),
});

const salah = z.object({ selesai: z.coerce.boolean() });

for (const kueri of ["batas=5&selesai=true", "selesai=false", "batas=500", "batas=abc"]) {
  const mentah = Object.fromEntries(new URLSearchParams(kueri));
  const hasil = Pencarian.safeParse(mentah);
  console.log(kueri.padEnd(22), hasil.success ? JSON.stringify(hasil.data) : "ditolak: " + hasil.error.issues[0]!.path.join("."));
}
console.log("coerce.boolean untuk 'false':", salah.parse({ selesai: "false" }).selesai);
```

```text
batas=5&selesai=true   {"batas":5,"selesai":true}
selesai=false          {"batas":10,"selesai":false}
batas=500              ditolak: batas
batas=abc              ditolak: batas
coerce.boolean untuk 'false': true
```

4: berkas uji yang dijalankan penyusun (`skema.test.ts`, 6 lulus):

```ts
import { expect, test } from "bun:test";
import { TugasBaru } from "./skema";

const salah: [string, unknown][] = [
  ["judul kosong", { judul: "" }],
  ["judul hanya spasi", { judul: "   " }],
  ["judul angka", { judul: 42 }],
  ["tanpa judul", { selesai: true }],
  ["bukan objek", "teks"],
];

for (const [nama, masukan] of salah) {
  test(`menolak ${nama}`, () => {
    expect(TugasBaru.safeParse(masukan).success).toBe(false);
  });
}

test("merapikan judul dan mengisi selesai", () => {
  expect(TugasBaru.parse({ judul: "  Latihan  " })).toEqual({ judul: "Latihan", selesai: false });
});
```

```text
bun test v1.4.4 (38afee6c8)

 6 pass
 0 fail
 6 expect() calls
Ran 6 tests across 1 file. [28.00ms]
```

**Latihan bercampur.** 1: contoh skema `z.coerce.number().int().positive()`; 400 lebih tepat untuk `abc` karena permintaannya salah bentuk (bukan "tugas tidak ada"); 404 tetap untuk id bagus yang tidak punya tugas. Boleh juga 404 asal konsisten dan terdokumentasi; yang penting alasannya jelas. 2: `type Tugas = z.infer<typeof Tugas>` pada skema lengkap, lalu `new Map<number, Tugas>()`; bentuk data cukup ditulis di satu tempat.

**Ulang berjarak.** 1: tipe hanya ada saat kode ditulis, sedangkan badan datang saat berjalan sebagai data apa saja; `safeParse` memeriksa data terhadap skema dan mengembalikan `success` dengan data yang dirapikan atau galat dengan daftar masalah. 2: karena pemeriksaan dilakukan berurutan: spasi dibuang dulu, baru panjang diperiksa; kebalikannya meloloskan judul yang hanya spasi. 3: 400 (kesalahan klien), dengan badan yang menyebut bidang dan pesannya agar klien bisa memperbaiki, tanpa membocorkan rincian internal server.

## Langkah berikutnya

Modul berikut: `b-xi2-m4` (berkas dan data JSON), yang menyimpan tugas ke berkas dan memuatnya kembali dengan skema yang sama. Bacaan lanjut: dokumentasi Zod untuk skema dasar dan galat.
