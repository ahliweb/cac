## Untuk siapa modul ini

Modul ini untuk murid kelas XI jalur B (Web dengan JavaScript, TypeScript, dan Bun), minggu `B-XI2-M1` silabus v1.4.1: server HTTP dengan Bun. Prasyarat: modul `b-xi1-m12` (Git, cabang, dan ulasan) serta blok fondasi `FND-X1-M4` dan `FND-X1-M5` (konsep jaringan dan internet, pengiriman data, pemecahan masalah dasar); keduanya dapat dibaca ulang di `fondasi-jaringan-dan-internet`.

Modul ini berstatus DRAF: karangan penyusun, belum ditinjau pemilik. Butir `F-AP-d` dipetakan silabus sebagai dipenuhi jalur ini; modul draf ini belum dihitung sebagai pemenuhan butir itu.

Semua contoh dijalankan penyusun dengan Bun 1.4.4 dan TypeScript 7.0.2 per 2026-11 di Linux; tanggal pada keluaran dan alamat folder di komputermu berbeda. **Server di modul ini hanya berjalan di `localhost`, tidak memakai akun, kunci, atau layanan luar, dan semua datanya karangan.** Tugas baca-dan-prediksi ditandai `AI: tanpa AI`; selain itu AI generatif boleh dipakai dengan etika dan dicatat, tanpa data pribadi, kata sandi, atau tugas bernilai pada permintaanmu.

## Ingat kembali

Jawab dari ingatan dulu, baru cek di bagian kunci. Soal 1 dari `b-xi1-m2`, soal 2 dari `b-xi1-m12`, soal 3 dari `b-xi1-m7`.

1. Apa beda `bun run berkas.ts` dan pemeriksaan tipe dengan `tsc`?
2. Sebutkan tiga bagian satu komentar ulasan yang baik, dan satu hal yang wajib dicek bila kodenya buatan AI.
3. Apa yang dibuktikan dan tidak dibuktikan oleh uji yang lolos semua?

## Tujuan

Setelah modul ini kamu dapat:

- menjelaskan pasangan permintaan (*request*) dan balasan (*response*) HTTP serta bagian-bagiannya;
- membuat server dengan `Bun.serve` yang membalas sesuai jalur dengan status yang tepat;
- menjalankan server hanya di `localhost`, mengujinya dengan `curl`, lalu mematikannya;
- membaca pesan galat umum server (port sudah dipakai) dan memperbaikinya (keluaran minggu ini: server lokal dengan halaman "halo").

## Prediksi dulu

Ini tugas baca-dan-prediksi, `AI: tanpa AI`. **Tebak dulu, tulis jawabanmu, baru jalankan.** Berkas `server.ts`:

```ts
const server = Bun.serve({
  hostname: "localhost",
  port: 3000,
  fetch(req) {
    const url = new URL(req.url);
    console.log(req.method, url.pathname);
    if (url.pathname === "/") {
      return new Response("Halo dari server lokal!\n");
    }
    return new Response("Tidak ada halaman ini.\n", { status: 404 });
  },
});

console.log(`Server jalan di ${server.url}`);
```

Di terminal pertama kamu menjalankan `bun run server.ts`. Di terminal kedua kamu menjalankan `curl http://localhost:3000/` lalu `curl http://localhost:3000/tentang`.

1. Apa saja yang tercetak di terminal pertama, urut dari atas?
2. Apa kode status dan badan balasan untuk `/tentang`?
3. Bila baris `hostname: "localhost"` dihapus, menurutmu siapa saja yang bisa menyambung ke server ini?

## Contoh terselesaikan

Pada percobaan penyusun, terminal pertama menjalankan `bun run server.ts` dan terminal kedua menjalankan `curl -si` (huruf `s` menyembunyikan indikator kemajuan, `i` menampilkan kepala balasan):

```text
--- terminal 2
HTTP/1.1 200 OK
content-type: text/plain;charset=utf-8
Date: Thu, 19 Nov 2026 23:55:33 GMT
Content-Length: 24

Halo dari server lokal!

...
HTTP/1.1 404 Not Found
content-type: text/plain;charset=utf-8
Date: Thu, 19 Nov 2026 23:55:33 GMT
Content-Length: 23

Tidak ada halaman ini.

--- terminal 1
Server jalan di http://localhost:3000/
GET /
GET /tentang
```

Server adalah program yang menunggu permintaan. Satu permintaan HTTP membawa *metode* (`GET`), *jalur* (`/tentang`), kepala (*header*), dan kadang badan; satu balasan membawa *status*, kepala, dan badan. Fungsi `fetch(req)` dipanggil Bun setiap permintaan masuk dan harus mengembalikan `Response`. `Request` dan `Response` adalah standar web yang sama dengan yang ada di peramban, jadi yang kamu pelajari di sini berlaku juga di sisi klien. `new URL(req.url)` memecah alamat menjadi bagian-bagian (di antaranya `pathname` dan `searchParams`). Status 200 berarti berhasil, 404 berarti sumber yang diminta tidak ada; balasan "tidak ada" yang tetap memakai status 200 menipu klien.

Server mendengarkan pada sebuah **port** (di sini 3000) di sebuah **alamat** (di sini `localhost`, komputermu sendiri). Menurut dokumentasi Bun, tanpa `hostname` server memakai `"0.0.0.0"`, yaitu semua antarmuka jaringan, sehingga komputer lain di jaringan yang sama dapat menyambung. Penyusun membuktikannya dengan `ss -ltn` (daftar port yang didengarkan) pada dua versi server:

```text
LISTEN 0      512        127.0.0.1:3000       0.0.0.0:*          
LISTEN 0      512                *:3000             *:*          
```

Baris pertama untuk server dengan `hostname: "localhost"` (hanya `127.0.0.1`), baris kedua untuk server tanpa `hostname` (`*` berarti semua antarmuka). Karena itu **semua server di jalur ini memakai `hostname: "localhost"`**: kode latihan tidak boleh terlihat dari jaringan sekolah.

Untuk pengujian otomatis, server dapat meminta port kosong dengan `port: 0`, memanggil dirinya sendiri dengan `fetch`, lalu mati dengan `server.stop()`. Keluaran program di bawah dijalankan penyusun:

```ts
const html = `<!doctype html>
<html lang="id">
  <head><meta charset="utf-8"><title>Halo</title></head>
  <body><h1>Halo, dunia!</h1><p>Ini halaman dari server Bun.</p></body>
</html>
`;

const server = Bun.serve({
  hostname: "localhost",
  port: 0,
  fetch() {
    return new Response(html, { headers: { "content-type": "text/html; charset=utf-8" } });
  },
});

const res = await fetch(server.url);
console.log(res.status, res.headers.get("content-type"));
console.log((await res.text()).split("\n")[3]);
server.stop();
console.log("server dimatikan");
```

```text
200 text/html; charset=utf-8
  <body><h1>Halo, dunia!</h1><p>Ini halaman dari server Bun.</p></body>
server dimatikan
```

Perhatikan kepala `content-type`: tanpa itu peramban tidak tahu bahwa badan balasan adalah HTML. Server hidup sampai kamu menekan `Ctrl+C`; setelah kodenya diubah, matikan lalu jalankan ulang.

## Contoh setengah jadi

Lengkapi server agar berjalan hanya di komputermu, memakai port 3000, membalas HTML di `/`, dan membalas jalur lain dengan status 404.

```ts setengah-jadi
Bun.serve({
  ____: "localhost",
  port: 3000,
  fetch(req) {
    const url = new URL(req.url);
    if (url.pathname === "/") {
      return new Response("<h1>Halo</h1>", { headers: { "content-type": "____" } });
    }
    return new Response("Tidak ada.", { ____: 404 });
  },
});
```

## Soal Parsons

Susun baris berikut (sudah diacak) menjadi server yang membalas "pong" pada `/ping` dan 404 untuk jalur lain. `AI: tanpa AI`.

```text
(a)     return new Response("pong\n");
(b) const server = Bun.serve({
(c)   fetch(req) {
(d)     if (new URL(req.url).pathname === "/ping") {
(e)     return new Response("tidak ada\n", { status: 404 });
(f)   hostname: "localhost",
(g)     }
(h)   },
(i) });
```

## Latihan

1. `AI: boleh` **Halaman "halo".** Buat server di `localhost:3000` yang membalas HTML pada `/` (judul, satu paragraf) dan 404 untuk jalur lain. Uji dengan `curl -si` dan dengan peramban, lalu matikan servernya.
2. `AI: boleh` **Parameter pada alamat.** Tambahkan jalur `/salam` yang membalas `Halo, <nama>!` dengan nama dari `?nama=...` pada alamat, dan `Halo, teman!` bila tidak ada. Pakai nama karangan saat menguji. Petunjuk: `url.searchParams.get("nama")` bernilai `null` bila tidak ada.
3. `AI: tanpa AI` **Dua server, satu port.** Jalankan server latihan 1 di dua terminal. Apa yang terjadi di terminal kedua, dan bagaimana kamu memperbaikinya tanpa mematikan server pertama?
4. `AI: boleh` **Catat permintaan.** Ubah server agar mencetak metode, jalur, dan kode status balasan setiap permintaan, dalam satu baris. Uji dengan tiga jalur berbeda.
5. *Opsional:* **catatan pemakaian AI.** Minta asisten AI menjelaskan (bukan menulis) apa yang dilakukan `Bun.serve`, lalu bandingkan dengan dokumentasi Bun. Catat alatnya, tujuanmu, garis besar perintahmu, bagian yang kamu pakai, dan cara memeriksanya. Jangan menaruh data pribadi atau tugas bernilai pada perintah.

## Latihan bercampur

1. `AI: boleh` (dari `b-xi1-m12`) Berkas berikut adalah isi sebuah permintaan penggabungan fiktif yang mengaku "server untuk percobaan". Tulis ulasan (temuan, alasan, saran) untuk sedikitnya tiga masalah. Jangan jalankan di jaringan sekolah.

   ```ts
   const KUNCI_API = "KUNCI_PALSU_CONTOH";

   Bun.serve({
     hostname: "0.0.0.0",
     port: 3000,
     fetch(req) {
       console.log("masuk:", Object.fromEntries(req.headers), KUNCI_API);
       return new Response("ok");
     },
   });
   ```

2. `AI: boleh` (dari `b-xi1-m11`) Dalam `server.ts`, mengapa `url.pathname === "/"` lebih aman daripada `url.pathname == "/"`, dan apa nama yang lebih baik untuk variabel `url` bila kamu juga punya alamat tujuan lain?

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `b-xi2-m2` (pertanyaan 1), sekitar tiga minggu lagi di `b-xi2-m4` (pertanyaan 2), dan sekitar delapan minggu lagi di `b-xi2-m9` (pertanyaan 3). Jawab sekarang lalu simpan.

1. Sebutkan bagian-bagian utama sebuah permintaan HTTP dan sebuah balasan HTTP.
2. Mengapa server latihan memakai `hostname: "localhost"`, dan apa yang berubah bila baris itu dihapus?
3. Mengapa balasan "halaman tidak ada" memakai status 404, bukan status 200 dengan teks "tidak ada"?

## Kesalahan umum

- **Mengira server tanpa `hostname` aman.** Tanpa `hostname`, Bun memakai `0.0.0.0` (semua antarmuka); `ss -ltn` pada percobaan penyusun menunjukkan `*:3000`.
- **Port sudah dipakai.** Menjalankan server kedua di port yang sama pada percobaan penyusun memberi `error: Failed to start server. Is port 3000 in use?` dan `code: "EADDRINUSE"`. Pakai port lain atau matikan server lama.
- **Mengubah kode tanpa menjalankan ulang.** Server yang sedang berjalan tidak membaca ulang berkasnya, dan bila tidak dimatikan ia terus memakai port.
- **Status 200 untuk semuanya.** Klien lain (dan penguji) hanya bisa mengandalkan status untuk tahu berhasil atau tidak.
- **Menaruh rahasia dan kepala permintaan di log.** Kepala permintaan bisa memuat sandi atau token; log dibaca banyak orang.

## Cek mandiri

- [ ] Saya dapat menjelaskan bagian-bagian permintaan dan balasan HTTP.
- [ ] Saya dapat membuat server `Bun.serve` yang membalas sesuai jalur dengan status yang tepat.
- [ ] Saya selalu menulis `hostname: "localhost"` dan tahu alasannya.
- [ ] Saya dapat menguji server dengan `curl` lalu mematikannya.
- [ ] Saya dapat membaca galat "port sudah dipakai" dan memperbaikinya.

## Kunci dan petunjuk

**Ingat kembali.** 1: `bun run` hanya menjalankan (tipe diabaikan); `tsc --noEmit` yang memeriksa tipe dan melaporkan galat tanpa menghasilkan berkas. 2: temuan, alasan, saran; untuk kode AI: jalankan dan uji sendiri (juga periksa tipe, rahasia, dan nama fungsi atau paket yang mungkin tidak ada). 3: dibuktikan bahwa skenario yang ditulis berjalan sesuai harapan; tidak dibuktikan bahwa fungsi benar untuk semua masukan atau bahwa tipenya benar.

**Prediksi dulu.** 1: `Server jalan di http://localhost:3000/`, lalu `GET /`, lalu `GET /tentang` (log pembuka, lalu satu baris per permintaan). 2: status 404 dan badan `Tidak ada halaman ini.` 3: tanpa `hostname`, Bun memakai `0.0.0.0` menurut dokumentasinya, jadi komputer lain di jaringan yang sama juga bisa menyambung.

**Contoh setengah jadi.** Isi berurutan: `hostname`, `text/html; charset=utf-8`, `status`. Contoh jadi yang dijalankan penyusun:

```ts
const server = Bun.serve({
  hostname: "localhost",
  port: 0,
  fetch(req) {
    const url = new URL(req.url);
    if (url.pathname === "/") {
      return new Response("<h1>Halo</h1>", { headers: { "content-type": "text/html; charset=utf-8" } });
    }
    return new Response("Tidak ada.", { status: 404 });
  },
});

for (const jalur of ["/", "/lain"]) {
  const res = await fetch(new URL(jalur, server.url));
  console.log(res.status, res.headers.get("content-type"));
}
server.stop();
```

```text
200 text/html; charset=utf-8
404 text/plain;charset=utf-8
```

**Soal Parsons.** Urutan benar: b, f, c, d, a, g, e, h, i. Objek opsi dibuka (b), `hostname` (f), fungsi `fetch` (c), pemeriksaan jalur (d), balasan `pong` (a), penutup `if` (g), balasan 404 (e), penutup fungsi (h), dan penutup `Bun.serve` (i).

**Latihan.** 1: lihat kunci contoh setengah jadi untuk bentuknya; uji dengan `curl -si http://localhost:3000/` dan `/lain`. 2: contoh yang dijalankan penyusun (`port: 0` agar tidak bentrok):

```ts
const server = Bun.serve({
  hostname: "localhost",
  port: 0,
  fetch(req) {
    const url = new URL(req.url);
    if (url.pathname === "/salam") {
      const nama = url.searchParams.get("nama") ?? "teman";
      return new Response(`Halo, ${nama}!\n`);
    }
    return new Response("Tidak ada halaman ini.\n", { status: 404 });
  },
});

for (const jalur of ["/salam?nama=Dewi", "/salam", "/lain"]) {
  const res = await fetch(new URL(jalur, server.url));
  console.log(res.status, JSON.stringify(await res.text()));
}
server.stop();
```

```text
200 "Halo, Dewi!\n"
200 "Halo, teman!\n"
404 "Tidak ada halaman ini.\n"
```

3: terminal kedua menolak dengan `Failed to start server. Is port 3000 in use?` (`EADDRINUSE`) karena satu port hanya bisa didengarkan satu proses; ubah `port` server kedua (mis. 3001). 4: panggil `console.log(req.method, url.pathname, res.status)` setelah membuat `Response` (simpan dulu ke variabel `res`), bukan sebelum. Seluruh soal ini diuji dengan melihat log dan `curl`.

**Latihan bercampur.** 1: contoh ulasan: "1. `hostname: "0.0.0.0"`: server terlihat oleh seluruh jaringan; kode percobaan tidak boleh begitu. Saran: `localhost`. 2. `console.log` mencetak semua kepala permintaan: bisa memuat token atau sandi tamu. Saran: cetak metode dan jalur saja. 3. `KUNCI_API` ikut dicetak: rahasia di log (di contoh ini nilainya palsu, tetapi kebiasaannya berbahaya). Saran: jangan mencetak rahasia; ambil dari variabel lingkungan. 4. Balasan selalu `ok` dengan status 200 untuk jalur apa pun. Saran: kembalikan 404 untuk jalur yang tidak dikenal." 2: `===` tidak mengubah tipe sebelum membandingkan, sehingga hasilnya dapat diprediksi; nama seperti `alamatMasuk` membedakan alamat permintaan dari alamat lain.

**Ulang berjarak.** 1: permintaan: metode, jalur, kepala (kadang badan); balasan: status, kepala, badan. 2: agar hanya komputer sendiri yang dapat menyambung; tanpa baris itu Bun memakai `0.0.0.0` (semua antarmuka) sehingga terlihat dari jaringan. 3: status adalah cara standar memberi tahu klien bahwa sumber tidak ada; teks "tidak ada" dengan status 200 membuat program klien mengira berhasil.

## Langkah berikutnya

Modul berikut: `b-xi2-m2` (rute dan API JSON), yang menambahkan banyak jalur, metode `POST`, dan balasan JSON. Modul terkait: `fondasi-jaringan-dan-internet` dan `pendamping-model-jaringan-dan-troubleshooting` (HTTP dan pemecahan masalah, dibahas lebih dalam di `b-xi2-m11`), dan `cloud-deploy-sederhana`. Bacaan lanjut: halaman dokumentasi Bun untuk server HTTP dan halaman MDN untuk `Request` dan `Response`.
