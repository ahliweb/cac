## Untuk siapa modul ini

Modul ini untuk murid kelas XI jalur B (Web dengan JavaScript, TypeScript, dan Bun), minggu `B-XI2-M4` silabus v1.4.1: berkas dan data JSON. Prasyarat: modul `b-xi2-m3` (validasi dengan skema) dan `b-x2-m3` (objek dan JSON).

Modul ini berstatus DRAF: karangan penyusun, belum ditinjau pemilik. Butir `F-AD-a` dipetakan silabus sebagai dipenuhi jalur ini (bersama dua modul berikutnya); modul draf ini belum dihitung sebagai pemenuhan butir itu.

Contoh dijalankan penyusun dengan Bun 1.4.4, TypeScript 7.0.2, dan Zod 4.6.7 per 2026-11. Berkas data modul ini berisi data karangan; berkas yang bisa memuat data orang tidak dimasukkan ke Git (`data/` ditulis di `.gitignore`). Server hanya di `localhost`. Tugas baca-dan-prediksi ditandai `AI: tanpa AI`; selain itu AI generatif boleh dipakai dengan etika dan dicatat, tanpa data pribadi, kata sandi, atau tugas bernilai pada permintaanmu.

## Ingat kembali

Jawab dari ingatan dulu, baru cek di bagian kunci. Soal 1 dari `b-xi2-m3`, soal 2 dari `b-xi2-m1`, soal 3 dari `b-xi1-m10`.

1. Mengapa tipe TypeScript tidak cukup untuk memeriksa badan permintaan, dan apa yang dikerjakan `safeParse`?
2. Mengapa server latihan memakai `hostname: "localhost"`, dan apa yang berubah bila baris itu dihapus?
3. Apa imbalan yang dibayar solusi `Set` untuk mengurangi langkah?

## Tujuan

Setelah modul ini kamu dapat:

- membaca dan menulis berkas dengan `Bun.file` dan `Bun.write`;
- mengubah data menjadi JSON dengan `JSON.stringify` dan sebaliknya dengan `JSON.parse`;
- memeriksa isi berkas dengan skema saat dimuat dan menangani berkas yang hilang atau rusak;
- menulis berkas dengan aman agar tidak setengah jadi, dan menjaga penulisan tidak berebut (keluaran minggu ini: skrip data untuk simpan dan muat).

## Prediksi dulu

Ini tugas baca-dan-prediksi, `AI: tanpa AI`. **Tebak dulu, tulis jawabanmu, baru jalankan.** Berkas `penyimpanan.ts` memakai `skema.ts` dari modul sebelumnya (`TugasBaru`):

```ts
import { rename } from "node:fs/promises";
import { z } from "zod";
import { TugasBaru } from "./skema";

export const Tugas = z.object({ id: z.number().int().positive(), ...TugasBaru.shape });
export type Tugas = z.infer<typeof Tugas>;

const Berkas = z.array(Tugas);

export async function muat(jalur: string): Promise<Tugas[]> {
  const berkas = Bun.file(jalur);
  if (!(await berkas.exists())) return [];
  const mentah = await berkas.text();
  let data: unknown;
  try {
    data = JSON.parse(mentah);
  } catch {
    throw new Error(`${jalur}: bukan JSON yang sah`);
  }
  const hasil = Berkas.safeParse(data);
  if (!hasil.success) {
    throw new Error(`${jalur}: isi tidak sesuai skema (${hasil.error.issues.length} masalah)`);
  }
  return hasil.data;
}

// Penulisan dijadikan antrean: satu per satu, agar dua permintaan tidak berebut berkas sementara.
let antre: Promise<void> = Promise.resolve();

export function simpan(jalur: string, daftar: Tugas[]): Promise<void> {
  const isi = JSON.stringify(daftar, null, 2) + "\n";
  const giliran = antre.then(async () => {
    const sementara = `${jalur}.tmp`;
    await Bun.write(sementara, isi);
    await rename(sementara, jalur);
  });
  antre = giliran.catch(() => {});
  return giliran;
}
```

Berkas `coba.ts` dijalankan pada folder yang belum punya `data/`:

```ts
import { muat, simpan } from "./penyimpanan";

const jalur = "data/tugas.json";

console.log("sebelum ada berkas:", JSON.stringify(await muat(jalur)));

await simpan(jalur, [
  { id: 1, judul: "Baca bab contoh", selesai: true },
  { id: 2, judul: "Tulis ringkasan contoh", selesai: false },
]);
console.log("setelah simpan:", JSON.stringify(await muat(jalur)));
console.log(await Bun.file(jalur).text());

await Bun.write(jalur, '[{"id": 1, "judul": "Rusak"');
try {
  await muat(jalur);
} catch (galat) {
  console.log("berkas rusak:", (galat as Error).message);
}

await Bun.write(jalur, '[{"id": "satu", "judul": "", "selesai": false}]');
try {
  await muat(jalur);
} catch (galat) {
  console.log("isi salah:", (galat as Error).message);
}
```

1. Apa yang tercetak pada baris pertama, dan mengapa tidak ada galat walaupun berkasnya belum ada?
2. Berapa masalah yang dilaporkan pada `isi salah`?
3. Mengapa `simpan` tidak menulis langsung ke `data/tugas.json`?

## Contoh terselesaikan

Pada percobaan penyusun, keluaran `bun run coba.ts` adalah:

```text
sebelum ada berkas: []
setelah simpan: [{"id":1,"judul":"Baca bab contoh","selesai":true},{"id":2,"judul":"Tulis ringkasan contoh","selesai":false}]
[
  {
    "id": 1,
    "judul": "Baca bab contoh",
    "selesai": true
  },
  {
    "id": 2,
    "judul": "Tulis ringkasan contoh",
    "selesai": false
  }
]

berkas rusak: data/tugas.json: bukan JSON yang sah
isi salah: data/tugas.json: isi tidak sesuai skema (2 masalah)
```

`Bun.file(jalur)` membuat rujukan ke berkas (belum membacanya); `exists()`, `text()`, dan `json()` adalah cara membacanya, dan `Bun.write(jalur, isi)` menulis (pada percobaan penyusun folder `data/` ikut dibuat). Ada **tiga hal yang bisa salah** saat memuat, dan `muat` menanganinya satu per satu: berkas belum ada (kembalikan daftar kosong, karena belum ada tugas), isinya bukan JSON (lempar galat berpesan jelas), dan isinya JSON tetapi bentuknya salah (skema menolaknya). Skema tetap berguna untuk berkas buatan sendiri: berkas bisa diubah tangan, rusak, atau berasal dari versi program lain.

Menulis langsung ke berkas tujuan berisiko: bila proses mati di tengah penulisan, berkasnya setengah jadi. Karena itu `simpan` menulis ke `tugas.json.tmp` dulu, lalu `rename` mengganti berkas lama sekaligus. Ada satu jebakan lagi: dua penulisan yang berjalan bersamaan memakai berkas sementara yang sama dan saling mengganggu. Program `balapan.ts` memanggil `simpan` 20 kali tanpa menunggu. `penyimpanan-rawan.ts` adalah versi `simpan` tanpa antrean:

```ts
import { rename } from "node:fs/promises";

export async function simpan(jalur: string, daftar: unknown[]): Promise<void> {
  const sementara = `${jalur}.tmp`;
  await Bun.write(sementara, JSON.stringify(daftar, null, 2) + "\n");
  await rename(sementara, jalur);
}
```

```ts
import { simpan } from "./penyimpanan";
import { simpan as simpanRawan } from "./penyimpanan-rawan";

const daftar = [{ id: 1, judul: "Contoh", selesai: false }];

for (const [nama, fungsi] of [["tanpa antrean", simpanRawan], ["dengan antrean", simpan]] as const) {
  const hasil = await Promise.allSettled(
    Array.from({ length: 20 }, () => fungsi("data/balapan.json", daftar)),
  );
  const gagal = hasil.filter((h) => h.status === "rejected").length;
  console.log(`${nama}: ${20 - gagal} berhasil, ${gagal} gagal`);
}
```

```text
tanpa antrean: 1 berhasil, 19 gagal
dengan antrean: 20 berhasil, 0 gagal
```

Angka pada keluaran itu adalah satu kali jalan; pada sembilan kali jalan penyusun, tanpa antrean berhasil 1 sampai 8 dari 20 (selalu ada yang gagal) dan dengan antrean selalu 20, dan di komputermu angkanya bisa berbeda. Yang gagal adalah `rename` (`ENOENT`), karena berkas sementara sudah dipindahkan oleh penulisan lain. Antrean (`antre.then(...)`) membuat penulisan berjalan satu per satu.

Terakhir, penyimpanan dipasang pada API dari modul sebelumnya. Pada percobaan penyusun, dua tugas ditambahkan, server dimatikan, lalu dinyalakan lagi, dan tugasnya masih ada:

```text
API jalan di http://localhost:3000/, 0 tugas dimuat
{"id":1,"judul":"Simpan ke berkas","selesai":false} [201]
{"id":2,"judul":"Muat kembali","selesai":false} [201]
--- server dimatikan, lalu dinyalakan lagi ---
API jalan di http://localhost:3000/, 2 tugas dimuat
[{"id":1,"judul":"Simpan ke berkas","selesai":false},{"id":2,"judul":"Muat kembali","selesai":false}] [200]
```

Server memuat berkas satu kali saat mulai (`await muat(...)`) dan memanggil `simpan` setelah setiap `POST`; sisanya sama dengan API di `b-xi2-m3`. Ini cocok untuk data kecil dan satu server; banyak data atau banyak pemakai memakai basis data, di luar cakupan minggu ini.

## Contoh setengah jadi

Lengkapi skrip yang menambah satu catatan setiap dijalankan: baca berkas bila ada, tambahkan, tulis kembali.

```ts setengah-jadi
const berkas = Bun.file("data/catatan.json");
const lama = (await berkas.____()) ? Catatan.parse(JSON.parse(await berkas.____())) : [];

lama.push({ nomor: lama.length + 1, isi: `catatan karangan ke-${lama.length + 1}` });
await Bun.____("data/catatan.json", JSON.stringify(lama, null, 2) + "\n");
```

## Soal Parsons

Susun baris berikut (sudah diacak) menjadi `muat` yang aman terhadap berkas hilang dan berkas rusak. `AI: tanpa AI`.

```text
(a) if (!(await berkas.exists())) return [];
(b) export async function muat(jalur: string): Promise<unknown> {
(c)   return JSON.parse(await berkas.text());
(d)   const berkas = Bun.file(jalur);
(e)   throw new Error(`${jalur}: bukan JSON yang sah`);
(f) } catch {
(g) }
(h)   try {
(i) }
```

## Latihan

1. `AI: boleh` **Catatan bertambah.** Tulis `tambah-catatan.ts` yang menambah satu catatan karangan ke `data/catatan.json` setiap dijalankan, memvalidasinya dengan Zod saat dimuat, dan mencetak jumlah catatan. Jalankan tiga kali.
2. `AI: tanpa AI` **Mati di tengah jalan.** Jelaskan apa yang terjadi pada `data/tugas.json` bila proses mati tepat saat `simpan` menulis, untuk versi yang menulis langsung dan versi yang memakai berkas sementara.
3. `AI: boleh` **Berkas rusak.** Rusakkan `data/tugas.json` dengan tangan (hapus tanda kurung di akhir), lalu jalankan server. Apa yang terjadi, dan mengapa lebih baik server berhenti daripada diam-diam memakai daftar kosong?
4. `AI: boleh` **Uji dengan folder sementara.** Tulis uji `bun test` untuk `muat` dan `simpan` memakai folder sementara (`mkdtemp`) agar uji tidak menyentuh `data/` asli.
5. *Opsional:* **catatan pemakaian AI.** Minta asisten AI menulis fungsi simpan dan muat, lalu tinjau: apakah menulis ke berkas sementara, apakah memeriksa isi saat dimuat, dan apa yang terjadi untuk berkas hilang atau rusak. Catat alatnya, tujuanmu, garis besar perintahmu, bagian yang kamu pakai, dan cara memeriksanya. Jangan menaruh data pribadi atau tugas bernilai pada perintah.

## Latihan bercampur

1. `AI: boleh` (dari `b-xi2-m2`) Tambahkan `DELETE /api/tugas/:id` yang juga menyimpan ke berkas. Dalam urutan apa kamu menghapus dari daftar, menyimpan, dan membalas, dan apa yang kamu balas bila `simpan` gagal?
2. `AI: tanpa AI` (dari `b-xi1-m10`) Server ini menulis ulang seluruh berkas setiap `POST`. Bila ada 1.000 tugas dan 1.000 `POST` berturut-turut dari daftar kosong, kira-kira berapa total tugas yang tertulis, dan solusi ini termasuk linear atau kuadrat terhadap banyak tugas?

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `b-xi2-m5` (pertanyaan 1), sekitar tiga minggu lagi di `b-xi2-m7` (pertanyaan 2), dan sekitar delapan minggu lagi di `b-xi2-m12` (pertanyaan 3). Jawab sekarang lalu simpan.

1. Mengapa isi berkas diperiksa dengan skema saat dimuat, padahal program kita sendiri yang menulisnya?
2. Mengapa `simpan` menulis ke berkas sementara lalu `rename`, dan mengapa penulisannya dijadikan antrean?
3. Apa yang terjadi pada tugas di memori saat server dimatikan, dan bagaimana tugas itu kembali saat server dinyalakan lagi?

## Kesalahan umum

- **Menganggap berkas pasti ada.** Tanpa `exists()`, membaca berkas yang belum ada melempar galat (pada percobaan penyusun `code` galatnya `ENOENT`).
- **Mempercayai isi berkas.** Berkas bisa rusak atau diubah tangan; tanpa skema, data salah masuk ke program.
- **Menulis langsung ke berkas tujuan.** Mati di tengah penulisan meninggalkan berkas setengah jadi.
- **Dua penulisan berebut.** Pada percobaan penyusun sebagian besar dari 20 penulisan bersamaan gagal tanpa antrean.
- **Diam-diam memakai daftar kosong bila berkas rusak.** Penyimpanan berikutnya menimpa data yang sebenarnya masih bisa diselamatkan.
- **Memasukkan berkas data berisi data orang ke Git.** Berkas data masuk `.gitignore`; di modul ini isinya hanya data karangan.

## Cek mandiri

- [ ] Saya dapat membaca dan menulis berkas dengan `Bun.file` dan `Bun.write`.
- [ ] Saya dapat memuat JSON dengan memeriksa tiga kemungkinan: hilang, bukan JSON, dan bentuk salah.
- [ ] Saya tahu mengapa menulis ke berkas sementara lalu `rename`.
- [ ] Saya tahu mengapa penulisan bersamaan perlu diatur.
- [ ] Saya tidak memasukkan berkas data berisi data orang ke Git.

## Kunci dan petunjuk

**Ingat kembali.** 1: tipe hanya ada saat kode ditulis, sedangkan badan datang saat berjalan sebagai data apa saja; `safeParse` memeriksa data terhadap skema dan mengembalikan `success` dengan data yang dirapikan atau galat dengan daftar masalah. 2: agar hanya komputer sendiri yang dapat menyambung; tanpa baris itu Bun memakai `0.0.0.0` (semua antarmuka) sehingga terlihat dari jaringan. 3: memori tambahan untuk menyimpan `Set` (waktu ditukar dengan ruang).

**Prediksi dulu.** 1: `sebelum ada berkas: []`; `muat` memeriksa `exists()` dan mengembalikan daftar kosong, bukan melempar galat. 2: dua masalah (`id` bukan bilangan, `judul` kosong); jumlahnya muncul di pesan. 3: bila proses mati di tengah menulis, berkas tujuan akan setengah jadi; berkas sementara menjaga berkas lama utuh sampai `rename`.

**Contoh setengah jadi.** Isi berurutan: `exists`, `text`, `write`. Contoh jadi yang dijalankan penyusun (`tambah-catatan.ts`; tiga kali dijalankan):

```ts
import { z } from "zod";

const Catatan = z.array(z.object({ nomor: z.number().int(), isi: z.string() }));
const jalur = "data/catatan.json";

const berkas = Bun.file(jalur);
const lama = (await berkas.exists()) ? Catatan.parse(JSON.parse(await berkas.text())) : [];

lama.push({ nomor: lama.length + 1, isi: `catatan karangan ke-${lama.length + 1}` });
await Bun.write(jalur, JSON.stringify(lama, null, 2) + "\n");
console.log("jumlah catatan:", lama.length);
```

```text
jumlah catatan: 1
jumlah catatan: 2
jumlah catatan: 3
```

(Keluaran di atas adalah hasil tiga kali menjalankan program, satu baris per jalan.)

**Soal Parsons.** Urutan benar: b, d, a, h, c, f, e, g, i. Fungsi dibuka (b), rujukan berkas (d), kembali kosong bila hilang (a), `try` (h), baca dan parse (c), `catch` (f), lempar galat berpesan (e), tutup `catch` (g), tutup fungsi (i).

**Latihan.** 1: lihat kunci contoh setengah jadi. 2: versi langsung: berkas bisa terpotong dan tidak lagi JSON yang sah, sehingga data lama ikut rusak; versi sementara: berkas lama utuh sampai `rename`, yang menggantikannya sekaligus; yang tersisa paling banyak berkas `.tmp` yang bisa dibuang. 3: server berhenti dengan `error: data/tugas.json: bukan JSON yang sah` (percobaan penyusun); lebih baik berhenti karena memakai daftar kosong lalu `simpan` akan menimpa berkas, dan data yang masih bisa diperbaiki hilang. 4: berkas uji yang dijalankan penyusun (3 lulus):

```ts
import { afterAll, expect, test } from "bun:test";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { muat, simpan } from "./penyimpanan";

const folder = await mkdtemp(join(tmpdir(), "uji-tugas-"));
afterAll(() => rm(folder, { recursive: true }));

test("berkas yang belum ada dimuat sebagai daftar kosong", async () => {
  expect(await muat(join(folder, "tidak-ada.json"))).toEqual([]);
});

test("simpan lalu muat mengembalikan data yang sama", async () => {
  const jalur = join(folder, "tugas.json");
  const data = [{ id: 1, judul: "Contoh", selesai: false }];
  await simpan(jalur, data);
  expect(await muat(jalur)).toEqual(data);
});

test("berkas rusak ditolak dengan pesan jelas", async () => {
  const jalur = join(folder, "rusak.json");
  await Bun.write(jalur, "[{");
  await expect(muat(jalur)).rejects.toThrow("bukan JSON yang sah");
});
```

```text
bun test v1.4.4 (38afee6c8)

 3 pass
 0 fail
 3 expect() calls
Ran 3 tests across 1 file. [29.00ms]
```

**Latihan bercampur.** 1: urutan yang aman: hapus dari daftar, `await simpan(...)`, lalu balas 204; bila `simpan` gagal, balas 500 (kesalahan server) dan idealnya kembalikan tugas ke daftar supaya memori dan berkas tidak berbeda. 2: sekitar 1 + 2 + ... + 1.000 = 500.500 tugas tertulis (n × (n + 1) / 2); total kerja naik kuadrat terhadap banyak tugas, karena tiap `POST` menulis ulang semuanya.

**Ulang berjarak.** 1: berkas bisa rusak, terpotong, atau diubah tangan, dan bisa berasal dari versi program lain; skema menolak bentuk yang salah sebelum masuk ke program. 2: agar berkas lama utuh sampai penggantian selesai (`rename` mengganti sekaligus); antrean agar dua penulisan tidak memakai berkas sementara yang sama (pada percobaan penyusun sebagian besar dari 20 penulisan bersamaan gagal tanpa antrean). 3: data di memori hilang; saat dinyalakan, server memuat berkas dengan `muat` dan memeriksa isinya dengan skema.

## Langkah berikutnya

Modul berikut: `b-xi2-m5` (sumber data terbuka dan legal), yang membaca data milik orang lain dengan memeriksa lisensinya. Bacaan lanjut: halaman dokumentasi Bun tentang berkas dan halaman MDN tentang JSON.
