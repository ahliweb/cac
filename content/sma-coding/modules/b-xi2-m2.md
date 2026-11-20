## Untuk siapa modul ini

Modul ini untuk murid kelas XI jalur B (Web dengan JavaScript, TypeScript, dan Bun), minggu `B-XI2-M2` silabus v1.4.1: rute dan API JSON. Prasyarat: modul `b-xi2-m1` (server HTTP dengan Bun).

Modul ini berstatus DRAF: karangan penyusun, belum ditinjau pemilik. Butir `F-AP-d` dipetakan silabus sebagai dipenuhi jalur ini; modul draf ini belum dihitung sebagai pemenuhan butir itu.

Contoh dijalankan penyusun dengan Bun 1.4.4 dan TypeScript 7.0.2 per 2026-11; tanggal pada keluaran berbeda di komputermu. **Server hanya di `localhost`, tanpa akun atau layanan luar, dan semua datanya (daftar tugas) karangan.** Tugas baca-dan-prediksi ditandai `AI: tanpa AI`; selain itu AI generatif boleh dipakai dengan etika dan dicatat, tanpa data pribadi, kata sandi, atau tugas bernilai pada permintaanmu.

## Ingat kembali

Jawab dari ingatan dulu, baru cek di bagian kunci. Soal 1 dari `b-xi2-m1`, soal 2 dari `b-xi1-m13`, soal 3 dari `b-xi1-m8`.

1. Sebutkan bagian-bagian utama sebuah permintaan HTTP dan sebuah balasan HTTP.
2. Apa isi `index.ts` sebuah pustaka dan mengapa berkas itu ada?
3. Apa kelebihan `Map` dibanding objek biasa untuk menyimpan pasangan kunci dan nilai?

## Tujuan

Setelah modul ini kamu dapat:

- memetakan metode dan jalur HTTP ke fungsi pengendali dengan `routes` pada `Bun.serve`;
- membaca parameter jalur (`:id`) dan badan JSON permintaan;
- membalas dengan `Response.json` dan status yang tepat (200, 201, 400, 404);
- menguji API dengan `curl` (keluaran minggu ini: API tugas kecil dengan data karangan).

## Prediksi dulu

Ini tugas baca-dan-prediksi, `AI: tanpa AI`. **Tebak dulu, tulis jawabanmu, baru jalankan.** Berkas `api.ts` (daftar tugas hidup di memori; semua isinya karangan):

```ts
type Tugas = { id: number; judul: string; selesai: boolean };

const daftar: Tugas[] = [
  { id: 1, judul: "Baca bab contoh", selesai: true },
  { id: 2, judul: "Tulis ringkasan contoh", selesai: false },
];
let idBerikut = 3;

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
        const judul = (badan as { judul?: unknown }).judul;
        if (typeof judul !== "string" || judul.trim() === "") {
          return Response.json({ galat: "judul wajib berupa teks tidak kosong" }, { status: 400 });
        }
        const baru: Tugas = { id: idBerikut++, judul: judul.trim(), selesai: false };
        daftar.push(baru);
        return Response.json(baru, { status: 201 });
      },
    },
    "/api/tugas/:id": (req) => {
      const id = Number(req.params.id);
      const tugas = daftar.find((t) => t.id === id);
      if (!tugas) return Response.json({ galat: "tugas tidak ditemukan" }, { status: 404 });
      return Response.json(tugas);
    },
  },
  fetch() {
    return Response.json({ galat: "rute tidak ada" }, { status: 404 });
  },
});

console.log(`API jalan di ${server.url}`);
```

Server baru dinyalakan. Tuliskan status dan badan untuk tiga permintaan ini:

1. `GET /api/tugas/2`
2. `POST /api/tugas` dengan badan `{"judul":""}`
3. `DELETE /api/tugas`

## Contoh terselesaikan

Pada percobaan penyusun, `bun run api.ts` dijalankan di satu terminal, dan di terminal lain dijalankan perintah di bawah (`-s` menyembunyikan indikator kemajuan, `-w` mencetak kode status di ujung):

```sh
curl -s -w ' [%{http_code}]\n' http://localhost:3000/api/tugas
curl -s -w ' [%{http_code}]\n' http://localhost:3000/api/tugas/2
curl -s -w ' [%{http_code}]\n' http://localhost:3000/api/tugas/99
curl -s -w ' [%{http_code}]\n' -X POST -H 'content-type: application/json' -d '{"judul":"Latihan API"}' http://localhost:3000/api/tugas
curl -s -w ' [%{http_code}]\n' -X POST -H 'content-type: application/json' -d '{"judul":""}' http://localhost:3000/api/tugas
curl -s -w ' [%{http_code}]\n' -X POST -H 'content-type: application/json' -d '{bukan json' http://localhost:3000/api/tugas
curl -s -w ' [%{http_code}]\n' -X DELETE http://localhost:3000/api/tugas
curl -s -w ' [%{http_code}]\n' http://localhost:3000/api/tugas
```

```text
[{"id":1,"judul":"Baca bab contoh","selesai":true},{"id":2,"judul":"Tulis ringkasan contoh","selesai":false}] [200]
{"id":2,"judul":"Tulis ringkasan contoh","selesai":false} [200]
{"galat":"tugas tidak ditemukan"} [404]
{"id":3,"judul":"Latihan API","selesai":false} [201]
{"galat":"judul wajib berupa teks tidak kosong"} [400]
{"galat":"badan bukan JSON"} [400]
{"galat":"rute tidak ada"} [404]
[{"id":1,"judul":"Baca bab contoh","selesai":true},{"id":2,"judul":"Tulis ringkasan contoh","selesai":false},{"id":3,"judul":"Latihan API","selesai":false}] [200]
```

Satu **rute** adalah pasangan jalur dan metode. Pada opsi `routes`, kunci `"/api/tugas"` dengan objek berisi `GET` dan `POST` memberi satu fungsi per metode, sedangkan `"/api/tugas/:id"` menangkap bagian jalur yang berubah sebagai `req.params.id`, yang **selalu teks**, sehingga diubah dengan `Number(...)`. Fungsi `fetch` di bagian bawah menangkap semua yang tidak cocok dengan rute mana pun. Permintaan `DELETE /api/tugas` tidak punya fungsi di rute itu dan jatuh ke `fetch`, sehingga balasannya 404 "rute tidak ada"; balasan yang lebih jujur adalah 405 (metode tidak diizinkan), dan itu salah satu latihan di bawah.

`Response.json(data, { status })` mengubah data menjadi teks JSON dan memasang kepala `content-type: application/json`. Pada percobaan penyusun kepala itu tampil sebagai `Content-Type: application/json;charset=utf-8`, jadi klien tahu cara membaca badannya. Pilih status menurut maknanya: **200** berhasil, **201** berhasil membuat sesuatu yang baru, **400** klien mengirim sesuatu yang salah, **404** yang diminta tidak ada. Metode `GET` hanya membaca dan tidak boleh mengubah data; `POST` membuat data baru. Perhatikan juga apa yang dilakukan server pada badan dari klien: ia **tidak mempercayainya**. Badan dibaca di dalam `try/catch` (JSON rusak menghasilkan 400), lalu `judul` diperiksa tipenya dan dirapikan dengan `trim()`. Tanpa `try/catch`, pada percobaan penyusun JSON rusak menghasilkan balasan `500 Internal Server Error` dan galat tercetak di terminal server, padahal kesalahannya ada pada klien. Modul `b-xi2-m3` menggantikan pemeriksaan tulisan tangan ini dengan skema.

Daftar tugas di sini hidup di memori: begitu server dimatikan, tugas 3 hilang. Penyimpanan ke berkas dibahas di `b-xi2-m4`.

## Contoh setengah jadi

Lengkapi rute yang menghapus tugas: 204 (berhasil, tanpa badan) bila ada, 404 bila tidak ada. Daftar disimpan sebagai `Map` dari id ke tugas.

```ts setengah-jadi
"/api/tugas/:id": {
  DELETE: (req) => {
    const ada = daftar.____(Number(req.params.id));
    return ada
      ? new Response(null, { status: ____ })
      : Response.json({ galat: "tugas tidak ditemukan" }, { status: ____ });
  },
},
```

## Soal Parsons

Susun baris berikut (sudah diacak) menjadi pengendali `POST` yang menolak JSON rusak dengan 400 dan menerima yang sah. `AI: tanpa AI`.

```text
(a)   return Response.json({ galat: "badan bukan JSON" }, { status: 400 });
(b) POST: async (req) => {
(c)   badan = await req.json();
(d) } catch {
(e)   let badan: unknown;
(f)   try {
(g)   return Response.json(badan, { status: 201 });
(h) },
(i)   }
```

## Latihan

1. `AI: boleh` **Hapus tugas.** Tambahkan `DELETE /api/tugas/:id` pada API tugas (204 bila ada, 404 bila tidak). Uji dengan `curl -s -w ' [%{http_code}]\n' -X DELETE ...` lalu `GET` id yang sama.
2. `AI: tanpa AI` **Telusuri jalur.** Tanpa menjalankan, perkirakan status untuk `GET /api/tugas/abc`, `GET /api/tugas/` (garis miring di akhir), dan `GET /api/tugas?x=1`. Jalankan dan cocokkan, lalu jelaskan hasil yang mengejutkan.
3. `AI: boleh` **Uji dengan `bun test`.** Pindahkan pembuatan server ke fungsi `buatServer(port)` dan tulis tiga uji (tugas ada, tugas tidak ada, hapus lalu cek) yang memakai `port: 0` dan `fetch`.
4. `AI: boleh` **405 yang jujur.** Ubah server agar `DELETE /api/tugas` membalas 405 dengan kepala `Allow: GET, POST`. Cari arti kepala itu di halaman MDN tentang metode HTTP sebelum menulis.
5. *Opsional:* **catatan pemakaian AI.** Minta asisten AI menulis satu rute tambahan, lalu tinjau seperti kode sejawat: jalankan dengan `curl`, uji badan yang rusak, dan periksa status. Catat alatnya, tujuanmu, garis besar perintahmu, bagian yang kamu pakai, dan cara memeriksanya. Jangan menaruh data pribadi atau tugas bernilai pada perintah.

## Latihan bercampur

1. `AI: boleh` (dari `b-xi1-m8`) API ini mencari tugas dengan `daftar.find`. Ubah penyimpanannya menjadi `Map<number, Tugas>` (kunci id) dan jelaskan satu keuntungan dan satu hal yang berubah pada cara membuat balasan `GET /api/tugas`.
2. `AI: tanpa AI` (dari `b-xi1-m10`) Bila ada 100.000 tugas, berapa tugas yang diperiksa `find` paling banyak untuk satu `GET /api/tugas/:id`, dan berapa yang diperiksa `Map`? Pakai ungkapan "sekitar" untuk `Map`.

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `b-xi2-m3` (pertanyaan 1), sekitar tiga minggu lagi di `b-xi2-m5` (pertanyaan 2), dan sekitar delapan minggu lagi di `b-xi2-m10` (pertanyaan 3). Jawab sekarang lalu simpan.

1. Apa arti status 201, 400, dan 404 pada API tugas, dan mana yang berarti kesalahan ada pada klien?
2. Mengapa `await req.json()` dibungkus `try/catch`?
3. Mengapa badan permintaan dari klien diperlakukan sebagai masukan yang belum dipercaya?

## Kesalahan umum

- **Menganggap `req.params.id` angka.** Nilainya teks; `Number("abc")` adalah `NaN` dan tidak cocok dengan id mana pun (pada percobaan penyusun balasannya 404).
- **Lupa `try/catch` pada `req.json()`.** JSON rusak menjadi 500 pada percobaan penyusun, seolah server yang salah.
- **Status 200 untuk semuanya.** Klien dan penguji hanya bisa mengandalkan status.
- **Menganggap `/api/tugas/` sama dengan `/api/tugas`.** Pada percobaan penyusun alamat dengan garis miring di akhir jatuh ke `fetch` (404).
- **`GET` yang mengubah data.** `GET` dianggap aman; perubahan memakai `POST`, `DELETE`, dan kawan-kawannya.
- **Mengira data bertahan.** Daftar di memori hilang saat server mati.

## Cek mandiri

- [ ] Saya dapat memetakan metode dan jalur ke fungsi dengan `routes`.
- [ ] Saya dapat membaca `req.params` dan badan JSON dengan aman.
- [ ] Saya memilih status 200, 201, 400, atau 404 menurut maknanya.
- [ ] Saya dapat menguji API dengan `curl` dan dengan `bun test`.
- [ ] Saya hanya memakai data karangan dan server di `localhost`.

## Kunci dan petunjuk

**Ingat kembali.** 1: permintaan: metode, jalur, kepala (kadang badan); balasan: status, kepala, badan. 2: `index.ts` mengumpulkan dan mengekspor antarmuka publik dengan `export { ... }`, sehingga pemakai tidak perlu tahu susunan berkas di dalam. 3: kunci boleh bertipe apa saja tanpa diubah menjadi teks, urutan masuk terjaga, dan ukurannya langsung tersedia lewat `size`.

**Prediksi dulu.** 1: 200 dan `{"id":2,"judul":"Tulis ringkasan contoh","selesai":false}`. 2: 400 dan `{"galat":"judul wajib berupa teks tidak kosong"}`. 3: bukan 405: rute `/api/tugas` tidak punya `DELETE`, sehingga jatuh ke `fetch` dan balasannya 404 `{"galat":"rute tidak ada"}`.

**Contoh setengah jadi.** Isi berurutan: `delete`, `204`, `404`. Contoh jadi, sekaligus server yang bisa diuji untuk Latihan 3 (berkas `api-uji.ts`):

```ts
type Tugas = { id: number; judul: string; selesai: boolean };

export function buatServer(port: number) {
  const daftar = new Map<number, Tugas>([
    [1, { id: 1, judul: "Baca bab contoh", selesai: true }],
    [2, { id: 2, judul: "Tulis ringkasan contoh", selesai: false }],
  ]);

  return Bun.serve({
    hostname: "localhost",
    port,
    routes: {
      "/api/tugas": { GET: () => Response.json([...daftar.values()]) },
      "/api/tugas/:id": {
        GET: (req) => {
          const tugas = daftar.get(Number(req.params.id));
          if (!tugas) return Response.json({ galat: "tugas tidak ditemukan" }, { status: 404 });
          return Response.json(tugas);
        },
        DELETE: (req) => {
          const ada = daftar.delete(Number(req.params.id));
          return ada ? new Response(null, { status: 204 }) : Response.json({ galat: "tugas tidak ditemukan" }, { status: 404 });
        },
      },
    },
    fetch() {
      return Response.json({ galat: "rute tidak ada" }, { status: 404 });
    },
  });
}
```

**Soal Parsons.** Urutan benar: b, e, f, c, d, a, i, g, h. Pengendali dibuka (b), `badan` dideklarasikan (e), `try` (f), baca JSON (c), `catch` (d), balas 400 (a), penutup `catch` (i), balas 201 (g), penutup pengendali (h).

**Latihan.** 1: lihat kunci contoh setengah jadi. Setelah `DELETE` pertama keluar `[204]`; `GET` id yang sama kemudian memberi 404. 2: perkiraan: `/api/tugas/abc` 404 (`Number("abc")` adalah `NaN`), `/api/tugas/` 404 dari `fetch` (rute dengan garis miring di akhir berbeda), `/api/tugas?x=1` 200 (parameter kueri tidak mengubah rute). Penyusun menjalankannya dan hasilnya sama: `{"galat":"tugas tidak ditemukan"} [404]`, `{"galat":"rute tidak ada"} [404]`, dan daftar tugas `[200]`. Yang mengejutkan bagi banyak murid ialah garis miring di akhir. 3: berkas uji, dijalankan penyusun:

```ts
import { afterAll, expect, test } from "bun:test";
import { buatServer } from "./api-uji";

const server = buatServer(0);
afterAll(() => server.stop());

test("GET tugas yang ada", async () => {
  const res = await fetch(new URL("/api/tugas/2", server.url));
  expect(res.status).toBe(200);
  expect(await res.json()).toEqual({ id: 2, judul: "Tulis ringkasan contoh", selesai: false });
});

test("GET tugas yang tidak ada memberi 404", async () => {
  const res = await fetch(new URL("/api/tugas/99", server.url));
  expect(res.status).toBe(404);
});

test("DELETE menghapus, lalu GET memberi 404", async () => {
  const hapus = await fetch(new URL("/api/tugas/1", server.url), { method: "DELETE" });
  expect(hapus.status).toBe(204);
  const lagi = await fetch(new URL("/api/tugas/1", server.url));
  expect(lagi.status).toBe(404);
});
```

```text
bun test v1.4.4 (38afee6c8)

 3 pass
 0 fail
 5 expect() calls
Ran 3 tests across 1 file. [6.00ms]
```

(Berkas server dan uji disimpan sebagai `api-uji.ts` dan `api-uji.test.ts`; waktu pada baris terakhir berbeda di komputermu.) 4: dalam objek rute `"/api/tugas"`, tambahkan `DELETE: () => new Response(null, { status: 405, headers: { Allow: "GET, POST" } })`, lalu uji dengan `curl -si -X DELETE`. Arti kepala `Allow` dibaca dari dokumentasi MDN untuk status 405, bukan dari ingatan.

**Latihan bercampur.** 1: keuntungan: pencarian id langsung dengan `get`, tanpa menelusuri seluruh larik; yang berubah: `Response.json` tidak bisa menerima `Map` sebagai larik, jadi harus `[...daftar.values()]` (kunci contoh setengah jadi memakainya). 2: `find` paling banyak memeriksa 100.000 tugas (sampai ketemu atau habis); `Map` memeriksa sekitar satu (waktu hampir tetap). Imbalannya: `Map` memakai memori tambahan untuk indeksnya.

**Ulang berjarak.** 1: 201 berarti berhasil membuat data baru; 400 kesalahan di klien (badan salah); 404 yang diminta tidak ada; 400 dan 404 adalah kesalahan klien. 2: karena `req.json()` melempar galat bila badan bukan JSON; tanpa `try/catch` balasannya 500 (kesalahan server) padahal kesalahan klien. 3: klien bisa mengirim apa saja (teks, tipe salah, ukuran besar), jadi server memeriksa tipe dan isinya sebelum memakainya.

## Langkah berikutnya

Modul berikut: `b-xi2-m3` (validasi masukan dengan skema Zod), yang menggantikan pemeriksaan tulisan tangan di `POST`. Bacaan lanjut: halaman dokumentasi Bun untuk server HTTP (bagian rute) dan halaman MDN untuk `Response` dan untuk metode HTTP.
