## Untuk siapa modul ini

Mahasiswa semester 4 informatika atau ilmu komputer yang sudah menempuh
`KUL-I-202` (basis data: SQL, kueri berparameter). Satu mata kuliah, satu
semester (3 SKS): 14 pertemuan, ujian tengah sesudah pertemuan 7, ujian akhir
sesudah pertemuan 14 `[asumsi]` (silabus 2.3).

Bahasa contoh: **TypeScript 7.0.2 dijalankan dengan Bun 1.4.4** (Linux),
selaras dengan `sma-coding` jalur B (silabus 7.2). Untuk pembaca C++: tipe
ditulis sesudah nama (`x: number`), `const` adalah variabel tetap, dan `bun
berkas.ts` menjalankan berkas. Setiap blok `ts` dijalankan penulis dan
keluarannya cocok dengan yang tertulis. Blok `html`, `css`, dan `text` tidak
dijalankan oleh penulis; HTML diperiksa dengan pemeriksa kecil di bagian 1,
dan tampilan di peramban kamu coba di praktikum. Blok berinfo `setengah-jadi`
sengaja berlubang. Contoh terselesaikan penuh hanya untuk konsep **baru**,
makin ke akhir makin banyak spesifikasi.

## Peta semester

| Pertemuan | Bagian | Pokok bahasan | CPMK | Kuis pembuka (jarak) |
| --- | --- | --- | --- | --- |
| 1 | 1 | HTML: struktur dan semantik | C1 | `KUL-I-202`: kueri berparameter |
| 2 | 1 | CSS dasar | C1 | 1, lalu `KUL-I-203`: proses dan utas |
| 3 | 1 | Aksesibilitas dasar; **kuis kumulatif 1** | C1 | 2, lalu 1 |
| 4 | 2 | JavaScript: nilai, fungsi, objek | C1 | 3, lalu `KUL-I-102`: tabel hash |
| 5 | 2 | TypeScript: tipe, union, validasi | C1 | 4, lalu 2 |
| 6 | 2 | Asinkron: `Promise`, `async`, `fetch` | C1 | 5, lalu 3 |
| 7 | 3 | HTTP: metode, kode status; **kuis kumulatif 2** | C2 | 6, lalu 4 |
| ujian tengah | | Ujian praktik, tanpa AI | C1–C2 | |
| 8 | 3 | REST: sumber dan peladen kecil | C2 | 7, lalu 5 |
| 9 | 3 | Perancangan API; galat | C2 | 8, lalu 6 |
| 10 | 4 | Autentikasi: sandi, sesi, cookie | C3 | 9, lalu 7 |
| 11 | 4 | Pengamanan dasar: injeksi, XSS; **kuis kumulatif 3** | C3 | 10, lalu 8 |
| 12 | 5 | Proyek web (1): rancangan | C1–C3 | 11, lalu 9 |
| 13 | 5 | Proyek web (2): pembangunan | C1–C3 | 12, lalu 10 |
| 14 | 5 | Proyek web (3): uji dan demo; **kuis kumulatif akhir** | C1–C3 | 13, lalu 1 sampai 12 |
| ujian akhir | | Ujian praktik, tanpa AI | C1–C3 | |

## Ingat kembali

Tiap pertemuan dibuka kuis 5 menit **tanpa catatan**, 3 sampai 5 soal. Kolom
terakhir peta menunjukkan asal soalnya, dengan jarak bertambah. Contoh soal
pertemuan 1 sampai 4:

1. Mengapa kueri SQL tidak boleh disusun dengan menyambung masukan pengguna ke
   string, dan apa gantinya? (`KUL-I-202`)
2. Apa beda proses dan utas dalam hal ruang alamat? (`KUL-I-203`)
3. Mengapa tabel hash mencari dalam waktu rata-rata konstan, dan kapan
   menjadi lambat? (`KUL-I-102`)
4. Apa beda `INNER JOIN` dan `LEFT JOIN`? (`KUL-I-202`)

Soal 1 kembali sebagai pengamanan di bagian 4. Mengingat dengan usaha, bukan
membaca ulang, yang membuat ingatan bertahan.

## Tujuan

Pada akhir semester kamu dapat (CPMK, silabus bagian 3.1):

- **C1** membangun aplikasi web klien dan peladen;
- **C2** merancang API;
- **C3** mengamankan aplikasi web dasar.

## Bagian 1: HTML, CSS, dan aksesibilitas (pertemuan 1 sampai 3)

HTML menyatakan **struktur dan makna**: judul, daftar, tautan, formulir.
CSS mengatur tampilan. Elemen semantik (`<main>`, `<nav>`, `<button>`)
memberi peramban dan teknologi bantu (pembaca layar) tahu peran bagian
halaman; `<div>` dengan klik buatan tidak. Aksesibilitas dasar yang bisa
diperiksa mesin: bahasa halaman (`lang`), teks pengganti gambar (`alt`), dan
label untuk setiap isian.

### Prediksi dulu

Pemeriksa kecil ini memakai `HTMLRewriter` bawaan Bun untuk membaca HTML.
Tanpa menjalankan, tulis masalah yang dilaporkan untuk halaman contoh.

```ts
const halaman = `<!doctype html>
<html>
<head><title>Toko Contoh</title></head>
<body>
  <img src="logo.png">
  <img src="promo.png" alt="Diskon akhir pekan">
  <label for="cari">Cari</label>
  <input id="cari" type="text">
  <input id="email" type="email">
</body>
</html>`;

async function periksa(html: string): Promise<string[]> {
  const masalah: string[] = [];
  const labelUntuk = new Set<string>();
  const inputTanpaNama: string[] = [];

  await new HTMLRewriter()
    .on("html", {
      element(e) {
        if (!e.getAttribute("lang")) masalah.push("html tanpa atribut lang");
      },
    })
    .on("img", {
      element(e) {
        if (e.getAttribute("alt") === null) {
          masalah.push(`img ${e.getAttribute("src")} tanpa alt`);
        }
      },
    })
    .on("label", {
      element(e) {
        const untuk = e.getAttribute("for");
        if (untuk) labelUntuk.add(untuk);
      },
    })
    .on("input", {
      element(e) {
        const id = e.getAttribute("id") ?? "";
        if (!e.getAttribute("aria-label")) inputTanpaNama.push(id);
      },
    })
    .transform(new Response(html))
    .text();

  for (const id of inputTanpaNama) {
    if (!labelUntuk.has(id)) masalah.push(`input #${id} tanpa label`);
  }
  return masalah;
}

for (const m of await periksa(halaman)) {
  console.log(m);
}
```

### Contoh terselesaikan

Keluarannya:

```text
html tanpa atribut lang
img logo.png tanpa alt
input #email tanpa label
```

Gambar kedua punya `alt`; isian `cari` punya label lewat `for`/`id`. Gambar
yang murni hiasan diberi `alt=""` (kosong dengan sengaja), dan pemeriksa ini
menerimanya karena atributnya ada. Perbaikan halaman:

```html
<html lang="id">
<img src="logo.png" alt="Logo Toko Contoh">
<label for="email">Email</label>
<input id="email" type="email">
```

CSS memilih elemen dan mengatur tampilannya. Jangan menyampaikan makna hanya
lewat warna, dan jangan menghapus indikator fokus papan ketik:

```css
body { font-family: system-ui, sans-serif; max-width: 40rem; margin: 0 auto; }
nav a { padding: 0.5rem 1rem; }
button:focus-visible, a:focus-visible { outline: 3px solid #1a56db; }
.galat { color: #8a1c1c; }
.galat::before { content: "Galat: "; }
```

Aturan `.galat` menambah kata "Galat: " sehingga pesan tidak bergantung pada
warna merah saja. Pemeriksa mesin hanya menangkap sebagian masalah; apakah `alt` itu berguna,
atau urutan fokus papan ketik masuk akal, harus dinilai manusia (bagian
aksesibilitas `KUL-I-304`).

### Contoh setengah jadi

```html setengah-jadi
<img src="grafik.png" ___="Grafik penjualan naik tiap bulan">
<label ___="nama">Nama</label>
<input ___="nama" type="text">
```

### Latihan

- **Ubah:** tambah aturan "tombol tanpa teks" ke pemeriksa (petunjuk: handler
  `text` pada `HTMLRewriter`).
- **Buat:** tulis halaman HTML semantik dengan `header`, `nav`, `main`, dan
  satu formulir berlabel; jalankan pemeriksa.
- **Jelaskan:** mengapa `<button>` lebih baik daripada `<div>` yang diberi
  `onclick`?
- **Berpasangan (praktikum pertemuan 3):** tukar halaman dengan pasangan dan
  telusuri memakai papan ketik saja (tanpa tetikus).

## Bagian 2: JavaScript dan TypeScript (pertemuan 4 sampai 6)

JavaScript berjalan dalam **satu utas** dengan *event loop*: pekerjaan lambat
(jaringan, berkas) tidak memblokir, melainkan dijadwalkan. TypeScript menambah
**tipe statis** yang diperiksa sebelum jalan, tetapi data dari luar (JSON,
formulir) tetap tak tepercaya dan harus divalidasi saat berjalan. Dibanding
utas pada `KUL-I-203`, pernyataan sinkron tidak disela fungsi lain, tetapi
urutan di antara `await` tetap perlu dipikirkan.

### Prediksi dulu

```ts
console.log("A");
setTimeout(() => console.log("B"), 0);
Promise.resolve().then(() => console.log("C"));
console.log("D");
```

Tulis urutan huruf yang tercetak dan alasannya.

### Contoh terselesaikan

Urutannya `A D C B`. Kode sinkron jalan sampai habis (`A`, `D`); *microtask*
`Promise` (`C`) dijalankan sebelum tugas terjadwal `setTimeout` (`B`), walau
waktunya 0. Berikutnya, tipe saja tidak cukup untuk data luar:

```ts
type Tugas = { id: number; judul: string; selesai: boolean };

function bacaTugas(x: unknown): Tugas | null {
  if (typeof x !== "object" || x === null) return null;
  const o = x as Record<string, unknown>;
  if (typeof o.id !== "number" || typeof o.judul !== "string") return null;
  if (o.judul.trim() === "") return null;
  return { id: o.id, judul: o.judul.trim(), selesai: o.selesai === true };
}

const masuk = ['{"id":1,"judul":"  Belajar TS ","selesai":true}', '{"id":"2","judul":"x"}', "[]", "bukan json"];
for (const teks of masuk) {
  try {
    console.log(JSON.stringify(bacaTugas(JSON.parse(teks))));
  } catch {
    console.log("JSON tidak sah");
  }
}
```

```text
{"id":1,"judul":"Belajar TS","selesai":true}
null
null
JSON tidak sah
```

`JSON.parse` mengembalikan data yang tipenya tidak dijamin; `unknown` memaksa
kita memeriksa dulu. Entri kedua ditolak karena `id` berupa teks.

Sisi klien memanggil peladen dengan `fetch`. Karena `fetch` hanya gagal pada
masalah jaringan, status 404 harus diperiksa sendiri (`r.ok`), dan
`AbortSignal.timeout` membatasi lamanya menunggu:

```ts
const server = Bun.serve({
  port: 0,
  async fetch(req) {
    const jalur = new URL(req.url).pathname;
    if (jalur === "/ok") return Response.json([{ id: 1, judul: "Belajar TS" }]);
    if (jalur === "/lambat") {
      await Bun.sleep(500);
      return Response.json([]);
    }
    return new Response("tidak ada", { status: 404 });
  },
});

async function ambil(jalur: string): Promise<unknown> {
  const r = await fetch(`http://localhost:${server.port}${jalur}`, {
    signal: AbortSignal.timeout(200),
  });
  if (!r.ok) throw new Error(`status ${r.status}`);
  return r.json();
}

for (const jalur of ["/ok", "/hilang", "/lambat"]) {
  try {
    console.log(jalur, JSON.stringify(await ambil(jalur)));
  } catch (e) {
    const err = e as Error;
    console.log(jalur, "gagal:", err.name === "TimeoutError" ? "batas waktu habis" : err.message);
  }
}
server.stop();
```

```text
/ok [{"id":1,"judul":"Belajar TS"}]
/hilang gagal: status 404
/lambat gagal: batas waktu habis
```

### Contoh setengah jadi

```ts setengah-jadi
function bacaNama(x: unknown): string | null {
  if (typeof x !== "___") return null;
  const nama = x.___();
  return nama === "" ? null : nama;
}
```

### Latihan

- **Ubah:** buat `bacaTugas` menolak `judul` lebih dari 80 karakter; tulis uji
  dulu.
- **Buat:** tulis `bacaPesan(x: unknown)` untuk `{ dari: string, isi: string }`
  dengan empat kasus uji.
- **Jelaskan:** mengapa `x as Tugas` tanpa pemeriksaan berbahaya?
- **Berpasangan (praktikum pertemuan 6):** satu orang menulis urutan `await`
  dari tiga pemanggilan `fetch`, satu orang memprediksi urutan cetaknya.

## Bagian 3: HTTP, REST, dan perancangan API (pertemuan 7 sampai 9)

HTTP adalah percakapan permintaan dan jawaban: **metode** (`GET`, `POST`),
**jalur**, **kepala**, **badan**, dan **kode status** pada jawaban. **REST**
memodelkan layanan sebagai **sumber** (`/api/tugas`) yang dimanipulasi dengan
metode standar. Kode status: 2xx berhasil (200, 201 dibuat), 4xx kesalahan
klien (400 permintaan salah, 404 tidak ada, 405 metode tak didukung, 429
terlalu banyak permintaan, lazim untuk pembatasan laju), 5xx kesalahan
peladen. Semantik metode dan status inti ditetapkan RFC 9110.

### Prediksi dulu

Peladen kecil di bawah dijalankan dan dipanggil enam kali. Tulis kode status
tiap baris sebelum membaca keluaran.

```ts
type Tugas = { id: number; judul: string; selesai: boolean };

const daftar: Tugas[] = [{ id: 1, judul: "Belajar HTTP", selesai: false }];
let nomor = 2;

const server = Bun.serve({
  port: 0,
  async fetch(req) {
    const url = new URL(req.url);
    const cocok = url.pathname.match(/^\/api\/tugas(?:\/(\d+))?$/);
    if (!cocok) return Response.json({ galat: "tidak ditemukan" }, { status: 404 });
    const id = cocok[1] === undefined ? null : Number(cocok[1]);

    if (id === null && req.method === "GET") return Response.json(daftar);
    if (id === null && req.method === "POST") {
      const badan = (await req.json().catch(() => null)) as { judul?: unknown } | null;
      if (typeof badan?.judul !== "string" || badan.judul.trim() === "") {
        return Response.json({ galat: "judul wajib berupa teks tak kosong" }, { status: 400 });
      }
      const baru = { id: nomor++, judul: badan.judul.trim(), selesai: false };
      daftar.push(baru);
      return Response.json(baru, { status: 201, headers: { Location: `/api/tugas/${baru.id}` } });
    }
    if (id !== null && req.method === "GET") {
      const t = daftar.find((x) => x.id === id);
      return t ? Response.json(t) : Response.json({ galat: "tugas tidak ada" }, { status: 404 });
    }
    return Response.json({ galat: "metode tidak didukung" }, { status: 405 });
  },
});

const dasar = `http://localhost:${server.port}`;

async function coba(metode: string, jalur: string, badan?: unknown) {
  const r = await fetch(dasar + jalur, {
    method: metode,
    body: badan === undefined ? undefined : JSON.stringify(badan),
  });
  const lokasi = r.headers.get("Location");
  console.log(`${metode} ${jalur} -> ${r.status}${lokasi ? ` Location: ${lokasi}` : ""}`);
}

await coba("GET", "/api/tugas");
await coba("POST", "/api/tugas", { judul: "Tulis uji" });
await coba("POST", "/api/tugas", { judul: "   " });
await coba("GET", "/api/tugas/2");
await coba("GET", "/api/tugas/99");
await coba("DELETE", "/api/tugas");
server.stop();
```

`port: 0` meminta nomor port bebas dari sistem, sehingga contoh tidak
bertabrakan dengan program lain.

### Contoh terselesaikan

```text
GET /api/tugas -> 200
POST /api/tugas -> 201 Location: /api/tugas/2
POST /api/tugas -> 400
GET /api/tugas/2 -> 200
GET /api/tugas/99 -> 404
DELETE /api/tugas -> 405
```

Perhatikan keputusan perancangan: pembuatan sukses memberi **201** dan
`Location` sumber baru; badan salah memberi **400** dengan pesan, bukan 200
berisi galat; sumber yang tidak ada memberi **404**; metode yang tidak
didukung memberi **405**. `fetch` yang sama dipakai klien peramban, jadi
bagian klien aplikasi web memanggil API ini dengan cara yang sama. Isi
`daftar` hidup di memori dan hilang saat peladen mati; aplikasi sungguhan
menyimpannya di basis data (`KUL-I-202`).

### Contoh setengah jadi

Tambahkan `GET /api/tugas/:id` untuk sumber yang sudah selesai:

```ts setengah-jadi
const t = daftar.find((x) => x.id === id);
if (t === undefined) {
  return Response.json({ galat: "tugas tidak ada" }, { status: ___ });
}
return Response.json(t, { status: ___ });
```

### Latihan

- **Ubah:** tambah `DELETE /api/tugas/:id` yang mengembalikan 204 bila ada dan
  404 bila tidak.
- **Buat:** rancang (tabel jalur, metode, status sukses, status galat) API
  "catatan" dengan lima operasi, **sebelum** menulis kode.
- **Jelaskan:** apa arti 429 dan kapan peladen memberikannya?
- **Berpasangan (praktikum pertemuan 8):** satu orang menulis klien `fetch`,
  satu orang peladen; sepakati dulu kontrak tabelnya.

## Bagian 4: Autentikasi dan pengamanan dasar (pertemuan 10 dan 11)

**Autentikasi** memastikan siapa pengguna; **otorisasi** menentukan apa yang
boleh ia lakukan. Sandi tidak pernah disimpan apa adanya: yang disimpan adalah
**hash** yang sengaja lambat dan bergaram (*salt*); panduan OWASP merinci
pilihan algoritma. Sesudah masuk, peladen memberi **token sesi** acak yang
dibawa lewat *cookie* dengan atribut `HttpOnly` (tidak terbaca skrip),
`Secure` (hanya lewat HTTPS), dan `SameSite` (mengurangi pemalsuan permintaan
lintas situs). Risiko aplikasi web terbesar terdaftar di OWASP Top 10;
contoh paling klasik adalah **injeksi** dan **XSS**.

### Prediksi dulu

Seorang pengguna mengetik `x' OR '1'='1` sebagai nama. Berapa baris yang
dikembalikan tiap versi kueri?

```ts
import { Database } from "bun:sqlite";

const db = new Database(":memory:");
db.run("CREATE TABLE pengguna (nama TEXT, peran TEXT)");
db.run("INSERT INTO pengguna VALUES ('ayu', 'siswa'), ('bima', 'admin')");

const masukan = "x' OR '1'='1";

const rentan = db.query(`SELECT nama FROM pengguna WHERE nama = '${masukan}'`).all();
const aman = db.query("SELECT nama FROM pengguna WHERE nama = ?").all(masukan);

console.log("disambung ke string:", rentan.length, "baris");
console.log("berparameter:", aman.length, "baris");
```

### Contoh terselesaikan

```text
disambung ke string: 2 baris
berparameter: 0 baris
```

Versi pertama menjadi `WHERE nama = 'x' OR '1'='1'`: `'1'='1'` selalu benar,
sehingga semua baris keluar. Versi berparameter memperlakukan seluruh masukan
sebagai **nilai**, bukan sebagai bagian perintah. Ini jawaban soal 1 kuis
pertemuan 1. Tiga pertahanan lain, masing-masing diperiksa:

```ts
const hash = await Bun.password.hash("sandi-contoh-123");

console.log(hash.startsWith("$argon2id$"));
console.log(await Bun.password.verify("sandi-contoh-123", hash));
console.log(await Bun.password.verify("sandi-salah", hash));

const hash2 = await Bun.password.hash("sandi-contoh-123");
console.log(hash === hash2);
```

```text
true
true
false
false
```

Pada Bun 1.4.4 hash bawaan berawalan `$argon2id$`; sandi benar lolos, sandi
salah ditolak, dan dua hash dari sandi yang sama **berbeda** karena garam
acak. Untuk XSS, masukan pengguna yang ditaruh ke HTML harus di-*escape*:

```ts
function escapeHtml(s: string): string {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

const komentar = '<img src=x onerror="alert(1)">';
console.log(`<p>${komentar}</p>`);
console.log(`<p>${escapeHtml(komentar)}</p>`);
```

```text
<p><img src=x onerror="alert(1)"></p>
<p>&lt;img src=x onerror=&quot;alert(1)&quot;&gt;</p>
```

Baris pertama bila dimuat peramban memicu skrip penyerang; baris kedua hanya
menampilkan teks. Pada kenyataannya pakai pustaka templat yang meng-*escape*
secara bawaan. Kepala jawaban untuk sesi, yang kamu periksa di alat
pengembang peramban saat praktikum:

```text
Set-Cookie: sesi=TOKEN-ACAK; HttpOnly; Secure; SameSite=Lax; Path=/
```

Peladen tidak boleh memercayai klien: validasi ulang di peladen (bagian 2),
batasi laju percobaan masuk, dan jangan menaruh kunci atau sandi di kode atau
repositori (`KUL-U-201`).

### Contoh setengah jadi

```ts setengah-jadi
const nama = "bima";
const baris = db.query("SELECT peran FROM pengguna WHERE nama = ___").all(___);
console.log(baris.length);
```

### Latihan

- **Ubah:** tambah `escapeHtml` pada keluaran daftar tugas; apa yang terjadi
  bila judul tugas berisi `<b>`?
- **Buat:** tulis fungsi `login(nama, sandi)` yang memeriksa hash dengan
  `Bun.password.verify` dan mengembalikan token acak (`crypto.randomUUID()`)
  atau `null`; uji sandi benar dan salah.
- **Jelaskan:** mengapa pesan galat login sebaiknya sama untuk "nama tidak
  ada" dan "sandi salah"?
- **Berpasangan (praktikum pertemuan 11):** satu orang menyerang tugas orang
  lain dengan masukan `' OR '1'='1` dan `<b>`; satu orang memperbaiki.
  Dilakukan hanya pada aplikasi latihan milikmu sendiri.

## Bagian 5: Proyek web (pertemuan 12 sampai 14)

Pada tahap ini contoh penuh diganti spesifikasi. Kamu membangun aplikasi web
kecil dengan klien dan peladen. Kerjakan dalam tiga langkah.

### Prediksi dulu

Sebelum menulis kode, prediksi tiga hal tentang aplikasimu: jalur API apa saja
yang diperlukan, masukan apa yang paling mungkin merusaknya, dan satu
kegagalan yang harus ditampilkan ramah kepada pengguna.

### Contoh terselesaikan

Spesifikasi (bukan solusi): aplikasi "catatan kelas" fiktif.

| Kode | Kriteria penerimaan |
| --- | --- |
| P1 | halaman HTML semantik lolos pemeriksa bagian 1 |
| P2 | API `GET` dan `POST /api/catatan` dengan status 200, 201, 400, 404 |
| P3 | masukan divalidasi di peladen, bukan hanya di klien |
| P4 | kueri berparameter; sandi di-hash; masukan di-*escape* |
| P5 | satu skrip yang menjalankan peladen dan memeriksa status tiap jalur |

### Contoh setengah jadi

```ts setengah-jadi
await coba("POST", "/api/catatan", { isi: ___ });
await coba("GET", "/api/catatan/___");
```

### Latihan

- **Ubah:** dari proyek temanmu, pilih satu kriteria P1 sampai P5 yang gagal
  dan perbaiki.
- **Buat:** bangun aplikasi sesuai P1 sampai P5 dan catat keputusan perancangan
  API dalam satu tabel.
- **Jelaskan:** apa yang terjadi di peramban dan peladen, langkah demi langkah,
  saat pengguna menekan tombol "Simpan"?

## Latihan bercampur

Setelah bagian 2, 3, dan 4, kerjakan soal yang **tidak menyebut** konsepnya.
Contoh: "Pengguna melaporkan bahwa judul tugas orang lain muncul sebagai kotak
bergaya aneh di halamannya, dan satu pengguna berhasil melihat semua tugas
tanpa masuk. Apa dua kemungkinan penyebabnya dan perbaikannya?" Kamu
memutuskan: escape yang hilang dan kueri yang disambung, atau otorisasi yang
tidak diperiksa? Kuis kumulatif (pertemuan 3, 7, 11, 14) berbentuk sama.

## Ulang berjarak

Kerjakan ulang tanpa melihat solusi lama:

- satu minggu setelah bagian: tulis ulang satu rute API dengan tiga status dari
  ingatan;
- awal tiap bagian baru: dua soal dari bagian sebelumnya;
- minggu sebelum ujian: tiga soal yang dahulu salah;
- semester berikutnya: jelaskan 404 dan 429 dan fungsi `timeout` pada
  permintaan; `KUL-I-301` membahas jaringan dan keamanan;
- tulis ulang pemeriksaan label dan `alt` tanpa melihat; `KUL-I-304` memakainya.

## Kebijakan AI dan log pemakaian

Silabus bagian 6.3 **belum menyatakan** tingkat AI mata kuliah ini. Modul
memakai usulan baku `[asumsi]`: **Kuning** untuk tugas dasar (bagian 1 sampai
4), **Hijau** untuk proyek web bagian 5, **Merah** untuk ujian praktik; dosen
menetapkan per tugas. Pada Kuning AI boleh menjelaskan konsep, **tidak** boleh
menghasilkan kode yang kamu serahkan, dan hanya setelah gerbang kesiapan:
kamu dapat (1) menelusuri program pendek, (2) menulis satu uji yang gagal
bila kode salah, (3) menjelaskan kode dengan kata sendiri. Pada Hijau kamu
mencatat log di repositorimu sendiri: alat dan versi, tujuan, perintah,
bagian keluaran yang dipakai. Kode web buatan AI sering terlihat benar tetapi
rentan; periksa dengan uji dan pemeriksa bagian 1 dan 4. **Jangan memasukkan
data pengguna nyata, kata sandi, atau kunci ke asisten AI**; pakai data
sintetis. Dosen dapat mewawancarai kamu tentang kodemu dan memintamu
mengubahnya langsung.

## Kesalahan umum

- **Memercayai data dari klien.** Validasi ulang di peladen.
- **Menyambung masukan ke kueri SQL atau HTML.** Pakai parameter dan escape.
- **Mengembalikan 200 untuk semua hal.** Pakai status yang sesuai.
- **Menyimpan sandi apa adanya atau dengan hash cepat.** Pakai hash sandi.
- **Gambar tanpa `alt`, isian tanpa label.** Aksesibilitas bukan tambahan.
- **Mengira `x as Tipe` memeriksa tipe.** Itu hanya klaim kepada kompiler.
- **`await` terlupa.** Fungsi mengembalikan `Promise`, bukan nilainya.

## Cek mandiri

Tutup modul, jawab, baru periksa.

1. Tulis urutan cetak kode prediksi bagian 2 dan alasannya.
2. Beri status untuk: sumber dibuat, badan tak sah, sumber tak ada, metode
   tak didukung.
3. Mengapa kueri berparameter menahan injeksi?
4. Mengapa dua hash dari sandi yang sama berbeda?
5. Apa arti `HttpOnly`, `Secure`, dan `SameSite`?
6. Sebut tiga hal yang harus bisa kamu lakukan sebelum memakai AI pada tugas
   Kuning.

Daftar periksa (kosong; kamu isi sendiri, tidak dikumpulkan):

- [ ] Aku dapat menulis HTML semantik yang aksesibel.
- [ ] Aku dapat menulis TypeScript dengan validasi data luar.
- [ ] Aku dapat merancang dan membangun API dengan status yang benar.
- [ ] Aku dapat menutup injeksi, XSS, dan menyimpan sandi dengan benar.

## Kunci dan petunjuk

- **Bagian 1:** tiga masalah seperti di contoh. Setengah jadi: `alt`, `for`,
  `id`. Latihan 3: `<button>` bisa difokus dan diaktifkan dengan papan ketik
  dan dikenali pembaca layar secara bawaan.
- **Bagian 2:** `A D C B`. Setengah jadi: `string` dan `trim`.
- **Bagian 3:** 200, 201, 400, 200, 404, 405. Setengah jadi: `404` lalu `200`.
  Latihan: 429 berarti klien terlalu banyak meminta; peladen memberikannya
  untuk membatasi laju.
- **Bagian 4:** `2 baris` dan `0 baris`. Setengah jadi: `?` dan `nama`.
  Latihan 3: pesan berbeda memberi tahu penyerang nama mana yang terdaftar.
- **Bagian 5:** isian sesuai proyekmu; setiap jalur diuji status sukses dan
  gagalnya.
- **Ingat kembali:** (1) parameter `?` memisahkan perintah dari nilai;
  (2) proses punya ruang alamat sendiri, utas satu proses berbagi ruang
  alamat; (3) tabel hash rata-rata konstan bila sebaran baik, lambat bila
  banyak tabrakan.
- **Petunjuk bertahap bila macet:** (1) tulis kontrak (jalur, metode, status)
  dalam tabel; (2) panggil satu jalur dengan `fetch` dan baca status serta
  badannya; (3) cari langkah tempat status berbeda dari dugaanmu.

## Langkah berikutnya

`KUL-I-304` (Interaksi Manusia-Komputer) memakai HTML dan aksesibilitas dari
sini. `KUL-I-301` (Jaringan Komputer dan Keamanan) memperdalam HTTP, kriptografi,
dan ancaman umum. `KUL-I-401` memakai API dan pengamanan ini dalam proyek tim.

## Catatan untuk dosen

Bobot dan bentuk asesmen berikut **usulan**; prodi menetapkan (silabus 6.1,
6.2): proyek web, ujian praktik tanpa AI, kuis kumulatif, wawancara kode
singkat. Variasi tugas per mahasiswa: ganti domain aplikasi (catatan, jadwal,
inventaris) dan aturan validasinya. Praktikum berpasangan memakai pasangan
acak per bagian; tugas yang dinilai tetap perorangan. Modul tidak mengajarkan
kerangka kerja; prodi dapat menambahkan satu kerangka klien atau peladen bila
waktu ada. Penulis tidak menjalankan kode DOM di peramban; praktikum perlu
peramban, dan HTML di modul hanya diperiksa lewat pemeriksa kecil. Panduan
sandi dan injeksi mengacu pada lembar contekan OWASP; bila prodi memakai
pustaka autentikasi, jelaskan apa yang dikerjakannya. Gunakan data sintetis
dan aplikasi latihan sendiri untuk praktik penyerangan; larang pengujian ke
sistem pihak lain.
