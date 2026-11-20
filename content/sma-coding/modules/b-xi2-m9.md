## Untuk siapa modul ini

Modul ini untuk murid kelas XI jalur B (Web dengan JavaScript, TypeScript, dan Bun), minggu `B-XI2-M9` silabus v1.4.1: mengonsumsi API publik dengan `fetch` dan `async/await`. Prasyarat: modul `b-xi2-m8` (prediksi sederhana) dan `b-xi2-m2` (rute dan API JSON).

Modul ini karangan penyusun dan disetujui pemilik program pada 2026-11-20 (keputusan lewat dialog; catatan tinjauan menjadi tindak lanjut revisi). Silabus tidak memetakan butir capaian pembelajaran pada minggu ini.

Contoh dijalankan penyusun dengan Bun 1.4.4 dan TypeScript 7.0.2 per 2026-11. Seluruh latihan memakai **server tiruan di komputermu sendiri** (`localhost`) dengan data karangan. Satu contoh memanggil layanan luar yang **terbuka tanpa kunci dan tanpa akun** (diakses penyusun 2026-11-20); tanpa internet, lewati contoh itu. Tugas baca-dan-prediksi ditandai `AI: tanpa AI`; selain itu AI generatif boleh dipakai dengan etika dan dicatat, tanpa data pribadi atau kata sandi pada permintaanmu.

## Ingat kembali

Jawab dari ingatan dulu, baru cek di bagian kunci. Soal 1 dari `b-xi2-m8`, soal 2 dari `b-xi2-m6`, soal 3 dari `b-xi2-m1`.

1. Apa beda rata-rata bergerak dan garis kecenderungan, dan pada data seperti apa rata-rata bergerak tertinggal?
2. Mengapa baris terakhir tiap potongan disimpan sebagai `sisa`, dan apa yang terjadi bila tidak?
3. Mengapa balasan "halaman tidak ada" memakai status 404, bukan status 200 dengan teks "tidak ada"?

## Tujuan

Setelah modul ini kamu dapat:

- menjelaskan urutan eksekusi kode `async` dan memakai `async/await` serta `fetch`;
- memeriksa respons: `ok`, kode status, `json()`, bentuk data, dan batas waktu;
- menilai sebuah API publik sebelum memakainya: kunci atau akun, syarat, batas, dan kelengkapan data;
- menampilkan data API di halaman dengan aman (keluaran minggu ini: halaman yang memuat data).

## Prediksi dulu

Ini tugas baca-dan-prediksi, `AI: tanpa AI`. **Tebak dulu, tulis jawabanmu, baru jalankan.**

```ts
async function ambil(): Promise<string> {
  return "data";
}

console.log("A");
ambil().then((nilai) => console.log("C", nilai));
console.log("B");
```

1. Dalam urutan apa tiga hal itu tercetak?
2. Mengapa kode setelah `ambil()` tidak menunggu hasilnya?

## Contoh terselesaikan

Keluaran program tadi:

```text
A
B
C data
```

Fungsi `async` selalu mengembalikan `Promise`: janji bahwa nilai akan tiba nanti. `.then` mendaftarkan apa yang dikerjakan saat nilainya siap, sedangkan baris berikutnya jalan lebih dulu. `await` membuat bacaan lebih lurus: fungsi berhenti di titik itu sampai janjinya selesai, tanpa memblokir program lain.

**API publik** adalah layanan milik pihak lain yang dapat dipanggil lewat alamat web dan menjawab dengan data (biasanya JSON). Sebelum memakainya, baca dokumentasi dan syaratnya. Pada modul ini kita hanya memakai yang **terbuka tanpa kunci dan tanpa akun**; layanan yang menyuruhmu mendaftar, memberi kunci rahasia, atau meminta kartu pembayaran tidak dipakai di kelas. Setiap permintaan memperlihatkan alamat internetmu dan isi alamat yang dipanggil kepada penyedia: jangan menaruh data pribadi di alamat atau parameter.

Fungsi di bawah memuat daftar libur dengan empat pemeriksaan: batas waktu, `respons.ok`, `json()`, dan bentuk data. Pemeriksaan bentuk perlu karena data dari luar bisa tidak seperti yang kamu kira. Sebagai lawan berlatih kita pasang server tiruan di `localhost` dengan beberapa jalur: yang baik, yang tidak ada (404), yang bentuknya aneh, dan yang lambat.

```ts
type Libur = { date: string; name: string };

function adalahLibur(x: unknown): x is Libur {
  if (typeof x !== "object" || x === null) return false;
  const o = x as Record<string, unknown>;
  return typeof o.date === "string" && typeof o.name === "string";
}

async function muatLibur(alamat: string): Promise<Libur[]> {
  const respons = await fetch(alamat, { signal: AbortSignal.timeout(300) });
  if (!respons.ok) throw new Error(`HTTP ${respons.status}`);
  const badan: unknown = await respons.json();
  if (!Array.isArray(badan) || !badan.every(adalahLibur)) {
    throw new Error("bentuk data tidak dikenal");
  }
  return badan;
}

const server = Bun.serve({
  port: 0,
  hostname: "localhost",
  async fetch(req) {
    const jalur = new URL(req.url).pathname;
    if (jalur === "/api/libur") {
      return Response.json([
        { date: "2026-03-10", name: "Hari Contoh Satu" },
        { date: "2026-06-12", name: "Hari Contoh Dua" },
      ]);
    }
    if (jalur === "/api/aneh") return Response.json({ pesan: "bukan larik" });
    if (jalur === "/api/lambat") {
      await new Promise((selesai) => setTimeout(selesai, 1000));
      return Response.json([]);
    }
    return new Response("tidak ada", { status: 404 });
  },
});

const dasar = `http://localhost:${server.port}`;
for (const jalur of ["/api/libur", "/api/hilang", "/api/aneh", "/api/lambat"]) {
  try {
    const hasil = await muatLibur(dasar + jalur);
    console.log(jalur, "->", hasil.length, "hari libur, pertama:", hasil[0]?.name);
  } catch (galat) {
    const nama = galat instanceof Error ? galat.name : "?";
    const pesan = galat instanceof Error ? galat.message : String(galat);
    console.log(jalur, "-> gagal:", nama, "|", pesan);
  }
}

await server.stop(true);
try {
  await muatLibur(dasar + "/api/libur");
} catch (galat) {
  console.log("server mati -> gagal:", galat instanceof Error ? galat.name : "?");
}
```

```text
/api/libur -> 2 hari libur, pertama: Hari Contoh Satu
/api/hilang -> gagal: Error | HTTP 404
/api/aneh -> gagal: Error | bentuk data tidak dikenal
/api/lambat -> gagal: TimeoutError | The operation timed out.
server mati -> gagal: TypeError
```

Perhatikan: jalur yang tidak ada **tidak** membuat `fetch` gagal; ia selesai dengan status 404, sehingga `respons.ok` (bernilai `true` hanya untuk status 200 sampai 299) harus diperiksa sendiri. Yang membuat `fetch` menolak janjinya hanyalah kegagalan jaringan (server mati: `TypeError`) atau batas waktu (`TimeoutError`).

**Layanan luar sungguhan.** Nager.Holidays menyediakan daftar hari libur per negara. Halaman dokumentasinya (`https://nagerholidays.com/api`) menyebut titik akhir `GET /api/v4/Holidays/{CountryCode}/{Year}` tanpa menyebut kunci atau akun (penyusun memanggilnya tanpa keduanya dan berhasil), dan menyatakan CORS aktif; syaratnya (`https://nagerholidays.com/legal/termsofservice`) membolehkan proyek pribadi atau nirlaba, melarang memakai datanya untuk menjalankan portal hari libur sendiri, dan tidak menjamin ketersediaan atau ketepatan data. Fungsinya sama, dengan batas waktu 5000 milidetik untuk jaringan sungguhan:

```ts
type Libur = { date: string; name: string };

function adalahLibur(x: unknown): x is Libur {
  if (typeof x !== "object" || x === null) return false;
  const o = x as Record<string, unknown>;
  return typeof o.date === "string" && typeof o.name === "string";
}

async function muatLibur(alamat: string): Promise<Libur[]> {
  const respons = await fetch(alamat, { signal: AbortSignal.timeout(5000) });
  if (!respons.ok) throw new Error(`HTTP ${respons.status}`);
  const badan: unknown = await respons.json();
  if (!Array.isArray(badan) || !badan.every(adalahLibur)) {
    throw new Error("bentuk data tidak dikenal");
  }
  return badan;
}

try {
  const libur = await muatLibur("https://nagerholidays.com/api/v4/Holidays/ID/2026");
  console.log(libur.length, "hari libur");
  for (const h of libur.slice(0, 3)) console.log(h.date, h.name);
} catch (galat) {
  console.log("gagal:", galat instanceof Error ? galat.message : galat);
}
```

```text
8 hari libur
2026-01-01 New Year's Day
2026-04-03 Good Friday
2026-04-05 Easter Sunday
```

Keluaran ini hasil akses penyusun pada 2026-11-20 dan dapat berubah bila penyedia mengubah datanya. Perhatikan isinya: hanya delapan hari libur, dan tidak semua hari raya yang kamu kenal sebagai libur nasional ada. Data API bisa tidak lengkap; untuk keputusan sungguhan cocokkan dengan sumber resmi. Penyusun tidak membuka sumber resmi libur di modul ini, jadi tidak menyatakan daftar mana yang benar `[belum terverifikasi]`.

**Memuat data di halaman.** Halaman memanggil server kita sendiri, dan teksnya dimasukkan dengan `textContent` (alasannya di `b-xi2-m10`):

```html
<!doctype html>
<html lang="id">
  <head>
    <meta charset="utf-8" />
    <title>Hari libur contoh</title>
  </head>
  <body>
    <h1>Hari libur contoh</h1>
    <p id="status">Memuat...</p>
    <ul id="daftar"></ul>
    <script type="module">
      const status = document.querySelector("#status");
      const daftar = document.querySelector("#daftar");
      try {
        const respons = await fetch("/api/libur");
        if (!respons.ok) throw new Error("HTTP " + respons.status);
        const libur = await respons.json();
        for (const h of libur) {
          const butir = document.createElement("li");
          butir.textContent = h.date + ": " + h.name;
          daftar.append(butir);
        }
        status.textContent = libur.length + " hari libur dimuat.";
      } catch (galat) {
        status.textContent = "Gagal memuat: " + galat.message;
      }
    </script>
  </body>
</html>
```

```ts
const libur = [
  { date: "2026-03-10", name: "Hari Contoh Satu" },
  { date: "2026-06-12", name: "Hari Contoh Dua" },
];

Bun.serve({
  port: 3000,
  hostname: "localhost",
  fetch(req) {
    const jalur = new URL(req.url).pathname;
    if (jalur === "/") return new Response(Bun.file("index.html"));
    if (jalur === "/api/libur") return Response.json(libur);
    return new Response("tidak ada", { status: 404 });
  },
});
console.log("siap di http://localhost:3000");
```

Penyusun membuka halaman itu dengan Chrome tanpa kepala (`--dump-dom`): hasil DOM-nya memuat `<p id="status">2 hari libur dimuat.</p>` dan dua butir `<li>`: `2026-03-10: Hari Contoh Satu` dan `2026-06-12: Hari Contoh Dua`. Tampilan visual tidak diperiksa. Halaman dan API sama-sama dari `localhost:3000`; bila halamanmu kelak memanggil API milik orang lain, peramban hanya mengizinkannya jika server itu mengirim izin lintas asal (CORS, lihat MDN).

## Contoh setengah jadi

Lengkapi fungsi yang menghitung jumlah data dari sebuah alamat (kunci di bawah):

```ts setengah-jadi
async function jumlahLibur(alamat: string): Promise<number> {
  const respons = await fetch(alamat);
  if (!respons.____) throw new Error(`HTTP ${respons.status}`);
  const badan: unknown = await respons.____();
  return Array.isArray(badan) ? badan.length : 0;
}
```

Apa yang terjadi bila baris `if` dihapus dan alamatnya menghasilkan 404?

## Soal Parsons

Susun baris berikut menjadi fungsi yang benar (kunci di bawah). Satu baris tidak terpakai.

```text
  const badan: unknown = await respons.json();
  return Array.isArray(badan) ? badan.length : 0;
}
async function jumlahLibur(alamat: string): Promise<number> {
  const respons = await fetch(alamat);
  respons.stop();
  if (!respons.ok) throw new Error(`HTTP ${respons.status}`);
```

## Latihan

1. `AI: tanpa AI` Tebak urutan cetak tiga angka dari fungsi `a` berikut, lalu jalankan: `async function a() { console.log(1); await null; console.log(2); }` dipanggil sebagai `a(); console.log(3);`.
2. `AI: boleh` Tulis `hitungPerBulan(libur)` yang mengembalikan `Map` dari bulan (dua digit, mis. `"05"`) ke jumlah hari libur pada bulan itu, lalu coba pada data tiruan tiga entri.
3. `AI: boleh` Tambahkan jalur `/api/rusak` pada server tiruan yang menjawab status 500. Apa yang tercetak oleh `muatLibur` untuk jalur itu?
4. `AI: tanpa AI` Mengapa `await fetch(...)` yang selesai tanpa galat belum berarti permintaan berhasil?
5. `AI: boleh` (opsional) Catatan pemakaian AI: alat, tujuan, garis besar perintah, bagian yang dipakai, dan cara kamu memeriksanya.

## Latihan bercampur

1. `AI: boleh` (dari `b-xi2-m8`) Hari libur per bulan dari soal 2 dapat menjadi deret `[bulan 1, ..., bulan 12]`. Mengapa deret itu tidak cocok diprediksi dengan garis kecenderungan, dan data apa yang lebih cocok?
2. `AI: boleh` (dari `b-x2-m3`) Apa yang terjadi bila `JSON.parse('{"a": 1,}')` dijalankan, dan bagaimana kode menangani teks JSON yang rusak?

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `b-xi2-m10` (pertanyaan 1), sekitar tiga minggu lagi di `b-xi2-m12` (pertanyaan 2), dan sekitar delapan minggu lagi di semester berikutnya, modul `b-xii1-m3` (pertanyaan 3). Jawab sekarang lalu simpan.

1. Mengapa `await fetch(...)` yang berhasil belum berarti permintaan berhasil, dan apa yang harus diperiksa?
2. Mengapa bentuk data dari API luar diperiksa sebelum dipakai?
3. Apa yang kamu periksa sebelum memakai sebuah API publik (kunci atau akun, syarat, batas, kelengkapan)?

## Kesalahan umum

- **Mengira `fetch` menolak janji pada status 404 atau 500.** Ia hanya menolak pada kegagalan jaringan; periksa `respons.ok`.
- **Lupa `await`.** `const data = respons.json()` menghasilkan `Promise`, bukan datanya.
- **Memercayai bentuk data luar.** Bidang bisa hilang atau berubah tipe; periksa sebelum dipakai.
- **Tanpa batas waktu.** Layanan yang lambat membuat programmu menggantung; pasang `AbortSignal.timeout`.
- **Memakai API yang menuntut akun atau kunci.** Di kelas ini hanya yang terbuka tanpa itu.
- **Mengira data API selalu lengkap dan benar.** Penyedia tidak menjaminnya; catat sumber dan tanggal aksesmu.

## Cek mandiri

- [ ] Saya dapat menebak urutan cetak kode yang memakai `async/await`.
- [ ] Saya dapat menulis fungsi pemanggil API dengan pemeriksaan `ok`, bentuk data, dan batas waktu.
- [ ] Saya dapat menjelaskan perbedaan jaringan gagal dan status 404 atau 500.
- [ ] Saya dapat menilai sebuah API publik dari dokumentasi dan syaratnya.

## Kunci dan petunjuk

**Ingat kembali.** 1: rata-rata bergerak meratakan beberapa nilai terakhir; garis kecenderungan menarik garis lurus lewat seluruh data; rata-rata bergerak tertinggal pada data yang naik atau turun teratur. 2: potongan bisa berakhir di tengah baris; `sisa` menyambungnya dengan potongan berikutnya; tanpa itu baris terbelah menjadi dua pecahan salah dan hasil rekap keliru tanpa galat. 3: status adalah cara standar memberi tahu klien bahwa sumber tidak ada; teks "tidak ada" dengan status 200 membuat program klien mengira berhasil.

**Prediksi dulu.** 1: `A`, `B`, lalu `C data`. 2: `.then` hanya mendaftarkan pekerjaan untuk nanti; kode berikutnya langsung jalan.

**Contoh setengah jadi.** Kunci: `respons.ok` dan `respons.json()`. Dijalankan penyusun dengan server tiruan dua data:

```ts
async function jumlahLibur(alamat: string): Promise<number> {
  const respons = await fetch(alamat);
  if (!respons.ok) throw new Error(`HTTP ${respons.status}`);
  const badan: unknown = await respons.json();
  return Array.isArray(badan) ? badan.length : 0;
}

const server = Bun.serve({
  port: 0,
  hostname: "localhost",
  fetch: () => Response.json([{ date: "2026-03-10" }, { date: "2026-06-12" }]),
});
console.log(await jumlahLibur(`http://localhost:${server.port}/`));
await server.stop(true);
```

```text
2
```

Tanpa baris `if`, jawaban 404 tetap diteruskan: tubuhnya (teks "tidak ada") di-`json()` lalu gagal membaca, atau lebih buruk, diperlakukan seolah data. Pesan galatnya menyesatkan karena masalah sebenarnya (status 404) tidak disebut.

**Soal Parsons.** Urutan: baris `async function ...{`, `const respons = await fetch(alamat);`, `if (!respons.ok) ...`, `const badan ...`, `return ...`, `}`. Baris `respons.stop();` tidak terpakai karena `Response` tidak punya metode itu. Susunannya sama dengan kunci contoh setengah jadi di atas.

**Latihan.** 1: `1`, `3`, `2`: `await` menunda sisa fungsi `a`, sehingga `console.log(3)` jalan lebih dulu (dijalankan penyusun). 2: contoh, dijalankan penyusun:

```ts
function hitungPerBulan(libur: { date: string }[]): Map<string, number> {
  const hasil = new Map<string, number>();
  for (const h of libur) {
    const bulan = h.date.slice(5, 7);
    hasil.set(bulan, (hasil.get(bulan) ?? 0) + 1);
  }
  return hasil;
}
console.log(
  hitungPerBulan([{ date: "2026-05-01" }, { date: "2026-05-14" }, { date: "2026-06-01" }]),
);
```

```text
Map(2) {
  "05": 2,
  "06": 1,
}
```

3: `muatLibur` mencetak `-> gagal: Error | HTTP 500`, karena `respons.ok` bernilai `false` untuk 500. 4: `fetch` hanya gagal pada masalah jaringan; server yang menjawab 404 atau 500 tetap membuat janji selesai, sehingga `respons.ok` atau `respons.status` wajib diperiksa (dijalankan penyusun: `fetch` ke jalur yang menjawab 404 memberi `ok` bernilai `false` dan `status` 404 tanpa galat). 5: tidak ada kunci tunggal.

**Latihan bercampur.** 1: jumlah hari libur per bulan bukan deret yang naik atau turun teratur; hari libur tergantung kalender, jadi garis lurus tidak punya dasar. Data yang lebih cocok: yang punya arah, seperti pengunjung per minggu di `b-xi2-m8`. 2: `JSON.parse` melempar `SyntaxError` karena koma di akhir tidak sah dalam JSON (dijalankan penyusun); bungkus dengan `try/catch` dan beri pesan yang berguna, atau anggap datanya rusak dan jangan lanjutkan.

**Ulang berjarak.** 1: `fetch` hanya menolak janji pada kegagalan jaringan atau batas waktu; status 404 atau 500 tetap "berhasil", jadi periksa `respons.ok`. 2: data luar bisa tidak seperti dokumentasi atau berubah kapan saja; memakainya tanpa pemeriksaan membuat galat muncul jauh dari sumbernya. 3: apakah butuh kunci atau akun, syarat penggunaan (siapa boleh memakai untuk apa), batas pemakaian, dan kelengkapan serta kesegaran datanya.

## Langkah berikutnya

Modul berikut: `b-xi2-m10` (keamanan aplikasi dan UU), yang membahas bahaya memasukkan teks luar ke halaman dan menjaga rahasia. Modul terkait: `pendamping-model-jaringan-dan-troubleshooting`. Bacaan lanjut: halaman MDN tentang `fetch`, `async function`, dan CORS, serta dokumentasi Bun tentang `fetch`.
