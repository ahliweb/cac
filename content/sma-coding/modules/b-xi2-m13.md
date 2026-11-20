## Untuk siapa modul ini

Modul ini untuk murid kelas XI jalur B (Web dengan JavaScript, TypeScript, dan Bun), minggu `B-XI2-M13` silabus v1.4.1: proyek aplikasi data, dikerjakan berkelompok dua sampai tiga orang. Prasyarat: modul `b-xi2-m12` (dan, melalui modul itu, materi server, data, keamanan, dan jaringan semester ini).

Modul ini karangan penyusun dan disetujui pemilik program pada 2026-11-20 (keputusan lewat dialog; catatan tinjauan menjadi tindak lanjut revisi). Silabus tidak memetakan butir capaian pembelajaran pada minggu ini. Penilaian memakai rubrik gurumu.

Contoh dijalankan penyusun dengan Bun 1.4.4 dan TypeScript 7.0.2 per 2026-11, tanpa pustaka tambahan, tanpa akun, dan seluruhnya di `localhost`. **Data yang dipakai harus karangan atau terbuka dengan lisensi yang tercatat**; tidak ada data murid atau orang nyata. AI generatif boleh dipakai dengan etika dan dicatat, tanpa data pribadi atau rahasia pada permintaanmu; kode buatan AI harus kamu baca, jalankan, uji, dan jelaskan sendiri.

## Ingat kembali

Jawab dari ingatan dulu, baru cek di bagian kunci. Soal 1 dari `b-xi2-m12`, soal 2 dari `b-xi2-m10`, soal 3 dari `b-xi2-m5`.

1. Mengapa server berkas statis menyelesaikan jalur lalu memeriksa bahwa hasilnya masih di dalam folder situs?
2. Di mana rahasia disimpan agar tidak ikut ke repositori, dan apa yang dilakukan bila terlanjur ter-commit?
3. Mengapa berkas unduhan dicatat sidik jari SHA-256-nya?

## Tujuan

Setelah modul ini kamu dapat:

- merencanakan aplikasi data kecil: pengguna, sumber data, fitur, keamanan, pengujian, dan pembagian tugas;
- membangun server lokal yang membaca data, memeriksa bentuknya, merekap, dan meramal, lalu menyajikannya di halaman;
- menguji fungsi pengolah data dengan `bun test`, dan memeriksa aplikasimu dengan lembar periksa keamanan;
- menulis laporan yang mencatat sumber, cara kerja, hasil, dan batas ramalan (keluaran minggu ini: aplikasi dan laporan).

## Rencana proyek

Tulis rencana satu halaman **sebelum** mengetik kode: tujuan, pengguna, data, fitur, keamanan dan privasi, pengujian, pembagian tugas, kriteria selesai, dan prediksimu. Contoh terselesaikan untuk "Rekap kantin" (kantin sekolah fiktif):

| Bagian | Isi contoh |
| --- | --- |
| Tujuan | Menampilkan penjualan per kategori dan perkiraan penjualan minggu depan. |
| Pengguna | Pengurus kantin fiktif yang ingin melihat ringkasan sekilas. |
| Data | `data.json`: 12 catatan karangan (`minggu`, `kategori`, `jumlah`). Sumber: karangan penyusun, dicatat di README beserta tanggalnya. |
| Fitur | Rekap per kategori, total per minggu, ramalan garis kecenderungan (dari `b-xi2-m8`). |
| Keamanan dan privasi | Tanpa data pribadi; teks ke halaman lewat `textContent`; data diperiksa bentuknya; port dari `PORT` (bukan rahasia); server di `localhost`. |
| Pengujian | Uji validasi, rekap, dan ramalan pada deret lurus. |
| Pembagian | Ani: `ringkas.ts` dan uji. Beni: `server.ts`. Cici: halaman, README, dan lembar periksa. Satu cabang per orang (cara `b-xi1-m12`). |
| Kriteria selesai | `bun test` lolos; API menjawab; halaman memuat tanpa galat; README mencatat sumber dan batas ramalan; lembar periksa terisi. |
| Prediksi | Tiga uji lulus pada percobaan pertama? Ramalan minggu ke-7 berada di antara 90 dan 95? Tulis tebakanmu. |

Data karangannya (sebelum dipakai, `adalahCatatan` memeriksa tiap baris):

```json
[
  { "minggu": 1, "kategori": "minuman", "jumlah": 40 },
  { "minggu": 1, "kategori": "makanan", "jumlah": 25 },
  { "minggu": 2, "kategori": "minuman", "jumlah": 44 },
  { "minggu": 2, "kategori": "makanan", "jumlah": 27 },
  { "minggu": 3, "kategori": "minuman", "jumlah": 43 },
  { "minggu": 3, "kategori": "makanan", "jumlah": 30 },
  { "minggu": 4, "kategori": "minuman", "jumlah": 49 },
  { "minggu": 4, "kategori": "makanan", "jumlah": 31 },
  { "minggu": 5, "kategori": "minuman", "jumlah": 52 },
  { "minggu": 5, "kategori": "makanan", "jumlah": 33 },
  { "minggu": 6, "kategori": "minuman", "jumlah": 51 },
  { "minggu": 6, "kategori": "makanan", "jumlah": 36 }
]
```

Fungsi pengolah dipisah dari server (berkas `ringkas.ts`) supaya bisa diuji tanpa menjalankan server:

```ts
export type Catatan = { minggu: number; kategori: string; jumlah: number };

export function adalahCatatan(x: unknown): x is Catatan {
  if (typeof x !== "object" || x === null) return false;
  const o = x as Record<string, unknown>;
  return (
    typeof o.minggu === "number" &&
    typeof o.kategori === "string" &&
    typeof o.jumlah === "number" &&
    Number.isFinite(o.jumlah) &&
    o.jumlah >= 0
  );
}

export function rekapKategori(data: Catatan[]): Map<string, number> {
  const hasil = new Map<string, number>();
  for (const c of data) hasil.set(c.kategori, (hasil.get(c.kategori) ?? 0) + c.jumlah);
  return hasil;
}

export function totalPerMinggu(data: Catatan[]): number[] {
  const hasil: number[] = [];
  for (const c of data) hasil[c.minggu - 1] = (hasil[c.minggu - 1] ?? 0) + c.jumlah;
  return hasil;
}

export function ramal(deret: number[]): number {
  const n = deret.length;
  const rataX = (n + 1) / 2;
  const rataY = deret.reduce((a, b) => a + b, 0) / n;
  let atas = 0;
  let bawah = 0;
  deret.forEach((y, i) => {
    atas += (i + 1 - rataX) * (y - rataY);
    bawah += (i + 1 - rataX) ** 2;
  });
  const m = atas / bawah;
  return rataY - m * rataX + m * (n + 1);
}
```

Ujinya (`ringkas.test.ts`):

```ts
import { expect, test } from "bun:test";
import { adalahCatatan, rekapKategori, totalPerMinggu, ramal } from "./ringkas";

test("catatan dengan jumlah negatif atau bukan angka ditolak", () => {
  expect(adalahCatatan({ minggu: 1, kategori: "minuman", jumlah: -1 })).toBe(false);
  expect(adalahCatatan({ minggu: 1, kategori: "minuman", jumlah: "9o" })).toBe(false);
  expect(adalahCatatan({ minggu: 1, kategori: "minuman", jumlah: 5 })).toBe(true);
});

test("rekap per kategori menjumlahkan", () => {
  const data = [
    { minggu: 1, kategori: "a", jumlah: 2 },
    { minggu: 2, kategori: "a", jumlah: 3 },
    { minggu: 2, kategori: "b", jumlah: 4 },
  ];
  expect([...rekapKategori(data)]).toEqual([["a", 5], ["b", 4]]);
  expect(totalPerMinggu(data)).toEqual([2, 7]);
});

test("ramal pada deret lurus meneruskan garisnya", () => {
  expect(ramal([2, 4, 6, 8])).toBeCloseTo(10);
});
```

```text
bun test v1.4.4 (38afee6c8)

 3 pass
 0 fail
 6 expect() calls
Ran 3 tests across 1 file. [5.00ms]
```

Server (`server.ts`) menolak berjalan bila datanya tidak sesuai bentuk, dan menyajikan API serta halaman:

```ts
import { adalahCatatan, ramal, rekapKategori, totalPerMinggu } from "./ringkas";

const mentah: unknown = await Bun.file("data.json").json();
if (!Array.isArray(mentah) || !mentah.every(adalahCatatan)) {
  throw new Error("data.json tidak sesuai bentuk yang diharapkan");
}
const data = mentah;

const port = Number(process.env.PORT ?? 3400);

Bun.serve({
  port,
  hostname: "localhost",
  fetch(req) {
    const jalur = new URL(req.url).pathname;
    if (jalur === "/api/ringkasan") {
      const deret = totalPerMinggu(data);
      return Response.json({
        sumber: "data karangan (kantin sekolah fiktif)",
        perKategori: Object.fromEntries(rekapKategori(data)),
        totalPerMinggu: deret,
        ramalanMingguDepan: Math.round(ramal(deret)),
      });
    }
    if (jalur === "/") return new Response(Bun.file("index.html"));
    return new Response("tidak ada", { status: 404 });
  },
});
console.log(`aplikasi di http://localhost:${port}`);
```

Halamannya (`index.html`) memasukkan teks hanya dengan `textContent`:

```html
<!doctype html>
<html lang="id">
  <head>
    <meta charset="utf-8" />
    <title>Rekap kantin contoh</title>
  </head>
  <body>
    <h1>Rekap kantin (data karangan)</h1>
    <p id="status">Memuat...</p>
    <ul id="kategori"></ul>
    <p id="ramalan"></p>
    <script type="module">
      const status = document.querySelector("#status");
      try {
        const respons = await fetch("/api/ringkasan");
        if (!respons.ok) throw new Error("HTTP " + respons.status);
        const d = await respons.json();
        for (const [nama, jumlah] of Object.entries(d.perKategori)) {
          const butir = document.createElement("li");
          butir.textContent = nama + ": " + jumlah;
          document.querySelector("#kategori").append(butir);
        }
        document.querySelector("#ramalan").textContent =
          "Perkiraan minggu depan: " + d.ramalanMingguDepan + " (bukan kepastian)";
        status.textContent = "Sumber: " + d.sumber;
      } catch (galat) {
        status.textContent = "Gagal memuat: " + galat.message;
      }
    </script>
  </body>
</html>
```

Hasil jalan penyusun: `curl http://localhost:3400/api/ringkasan` memberi

```text
{"sumber":"data karangan (kantin sekolah fiktif)","perKategori":{"minuman":279,"makanan":182},"totalPerMinggu":[65,71,73,80,85,87],"ramalanMingguDepan":93}
```

Di Chrome tanpa kepala, DOM halaman memuat `<li>minuman: 279</li>`, `<li>makanan: 182</li>`, dan `Perkiraan minggu depan: 93 (bukan kepastian)`; tampilan visual tidak diperiksa. `tsc` (TypeScript 7.0.2, mode `strict` dan `noUncheckedIndexedAccess`) bersih untuk ketiga berkas `.ts`.

Kelompokmu memilih topik sendiri: data pengunjung perpustakaan fiktif, hasil lomba karangan, suhu tiruan dari berkas JSON lokal, atau topik lain dengan persetujuan gurumu. Syarat minimal: server lokal, data karangan atau terbuka berlisensi yang tercatat, satu rekap, satu ramalan dengan batas yang ditulis, halaman yang memuat data, validasi, tiga uji, README, dan lembar periksa keamanan.

## Daftar periksa

- [ ] Rencana satu halaman ada sebelum kode pertama dan disepakati kelompok.
- [ ] Data karangan atau terbuka; sumber, lisensi, dan tanggal dicatat di README.
- [ ] Bentuk data diperiksa sebelum dipakai (cara `adalahCatatan`).
- [ ] Setiap teks yang masuk ke halaman lewat `textContent` atau di-escape.
- [ ] Tidak ada rahasia di kode atau repositori; `.env` (bila ada) di `.gitignore`.
- [ ] `bun test` lolos dan `bunx tsc --noEmit` bersih.
- [ ] Ramalan ditulis sebagai perkiraan bersyarat dengan batasnya.
- [ ] Server hanya di `localhost`; tidak ada data pribadi.
- [ ] Bila memakai AI: log pemakaian (alat, tujuan, garis besar perintah, bagian yang dipakai, cara memeriksa).

## Umpan balik sejawat

Tukar aplikasi dengan kelompok lain dan beri ulasan dengan format: **satu yang sudah baik, satu yang perlu diperbaiki, satu langkah berikutnya**. Jalankan aplikasi mereka hanya dari README, lalu coba tiga hal: data berisi satu baris rusak, nama kategori berisi `<b>`, dan server dimatikan saat halaman terbuka. Pemrograman berpasangan paling banyak dibuktikan pada mahasiswa; efeknya pada murid SMA `[belum terverifikasi]`, jadi bagikan tugas dengan adil.

## Latihan bercampur

1. `AI: boleh` (dari `b-xi2-m8`) Tambahkan uji mundur pada `ramal`: tebak minggu ke-6 dari lima minggu pertama dan bandingkan dengan nilai sebenarnya. Berapa selisihnya?
2. `AI: boleh` (dari `b-xi2-m11`) `data.json` hilang saat server dijalankan. Bagaimana gejalanya, dan bagaimana kamu memberi pesan galat yang jelas di log server tanpa membocorkan jalur berkas ke pengunjung?

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `b-xi2-m14` (pertanyaan 5), sekitar tiga minggu lagi di `b-xii1-m2` (pertanyaan 2), dan sekitar delapan minggu lagi di semester berikutnya, modul `b-xii1-m7` (pertanyaan 3). Jawab sekarang lalu simpan.

1. Apa yang dicatat sebuah laporan aplikasi data agar orang lain dapat memeriksa hasilnya?
2. Mengapa fungsi pengolah data dipisah dari server dan diuji sendiri?
3. Sebutkan tiga pemeriksaan keamanan sebelum aplikasi data diserahkan.

## Kesalahan umum

- **Langsung mengetik kode.** Tanpa rencana, bentuk data berubah-ubah dan uji ditulis belakangan.
- **Mencampur pengolahan data ke dalam penangan server.** Sulit diuji; pisahkan.
- **Memercayai berkas data.** Satu baris rusak merusak seluruh rekap bila bentuknya tidak diperiksa.
- **Menampilkan ramalan seperti fakta.** Tulis dasar dan batasnya.
- **Mengisi halaman dengan `innerHTML`.** Teks dari data dapat berisi HTML; pakai `textContent`.
- **Pembagian tidak merata.** Satu orang mengerjakan semuanya; tulis siapa mengerjakan apa dan bagi ulasan secara silang.

## Cek mandiri

- [ ] Saya dapat merencanakan aplikasi data: pengguna, data, fitur, keamanan, pengujian, tugas.
- [ ] Saya dapat membangun server yang memeriksa, merekap, dan meramal data, serta halaman yang menampilkannya dengan aman.
- [ ] Saya dapat menguji fungsi pengolah dengan `bun test` dan memeriksa tipe dengan `tsc`.
- [ ] Saya dapat menulis laporan dengan sumber, batas ramalan, dan temuan keamanan.
- [ ] Saya meninjau pekerjaan teman dengan temuan, alasan, dan saran.

## Kunci dan petunjuk

**Ingat kembali.** 1: `..` dan sandi seperti `%2F` bisa membawa jalur keluar dari folder; setelah jalur diselesaikan, pemeriksaan membuktikan ia masih di dalam folder situs. 2: di `.env` yang masuk `.gitignore`; bila terlanjur ter-commit, anggap bocor, cabut dan ganti rahasianya, baru bereskan repositori. 3: untuk mendeteksi perubahan isi berkas (alamatnya menunjuk ke cabang yang bisa berubah) dan mencocokkan hitungan dengan berkas yang sama.

**Rencana proyek.** Tabel di atas contoh jawaban; rencanamu boleh berbeda selama punya semua barisnya. Contoh rencana dijalankan penyusun: tiga uji lulus pada percobaan pertama, ramalan minggu ke-7 adalah 93 (memang di antara 90 dan 95), `tsc` bersih.

**Latihan bercampur.** 1: contoh dijalankan penyusun (minggu 1 sampai 5 untuk meramal minggu ke-6; nilai sebenarnya 87):

```ts
function ramal(deret: number[]): number {
  const n = deret.length;
  const rataX = (n + 1) / 2;
  const rataY = deret.reduce((a, b) => a + b, 0) / n;
  let atas = 0;
  let bawah = 0;
  deret.forEach((y, i) => {
    atas += (i + 1 - rataX) * (y - rataY);
    bawah += (i + 1 - rataX) ** 2;
  });
  const m = atas / bawah;
  return rataY - m * rataX + m * (n + 1);
}

const total = [65, 71, 73, 80, 85, 87];
const tebakan = ramal(total.slice(0, 5));
console.log(tebakan.toFixed(1), total[5], Math.abs((total[5] ?? 0) - tebakan).toFixed(1));
```

```text
89.5 87 2.5
```

Ramalan melesat 2,5 dari nilai nyata; satu titik uji tidak cukup untuk menilai mutu garis, jadi ulangi untuk beberapa minggu seperti di `b-xi2-m8`. 2: `Bun.file("data.json").json()` melempar galat (berkas tidak ada) sehingga server gagal mulai; bungkus pembacaan dengan `try/catch`, cetak pesan seperti "data.json tidak ditemukan" di log server (tempat guru atau kamu membacanya), dan jangan menaruh jalur berkas atau isi galat internal di jawaban ke pengunjung.

**Ulang berjarak.** 1: sumber data, lisensi atau syarat pemakaian, tanggal pengambilan, cara kerja singkat, hasil, batas ramalan, dan temuan keamanan. 2: fungsi murni dapat diuji cepat tanpa menjalankan server, sehingga cacat ditemukan lebih awal dan kode lebih mudah dipakai ulang. 3: contoh: teks luar masuk lewat `textContent`, tidak ada rahasia atau `.env` di repositori, dan bentuk data diperiksa; juga server hanya di `localhost` dan data pribadi tidak dikumpulkan.

## Langkah berikutnya

Modul berikut: `b-xi2-m14` (asesmen dan refleksi semester 2 kelas XI), yang menilai server, data, dan keamanan tanpa AI. Bacaan lanjut: halaman Bun tentang `bun test` dan `Bun.file`, serta halaman MDN tentang `fetch`.
