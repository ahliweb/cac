## Untuk siapa modul ini

Modul ini untuk murid kelas XI jalur B (Web dengan JavaScript, TypeScript, dan Bun), minggu `B-XI2-M6` silabus v1.4.1: pengolahan data bervolume lebih besar. Prasyarat: modul `b-xi2-m5` (sumber data terbuka dan legal).

Modul ini berstatus DRAF: karangan penyusun, belum ditinjau pemilik. Butir `F-AD-a` dipetakan silabus sebagai dipenuhi jalur ini; modul draf ini belum dihitung sebagai pemenuhan butir itu.

Contoh dijalankan penyusun dengan Bun 1.4.4 dan TypeScript 7.0.2 per 2026-11 di Linux. Datanya **sintetis**: transaksi karangan yang dibangkitkan program, tanpa data orang. Angka memori dan waktu berbeda di setiap komputer dan setiap jalan; yang penting adalah perbandingannya. Tugas baca-dan-prediksi ditandai `AI: tanpa AI`; selain itu AI generatif boleh dipakai dengan etika dan dicatat, tanpa data pribadi, kata sandi, atau tugas bernilai pada permintaanmu.

## Ingat kembali

Jawab dari ingatan dulu, baru cek di bagian kunci. Soal 1 dari `b-xi2-m5`, soal 2 dari `b-xi2-m3`, soal 3 dari `b-xi1-m12`.

1. Apa tiga pertanyaan yang dijawab sebelum memakai data orang lain, dan mengapa data tanpa lisensi belum boleh dipakai?
2. Mengapa `trim()` ditulis sebelum `min(1)` pada skema judul?
3. Mengapa permintaan penggabungan sebaiknya kecil dan satu tujuan?

## Tujuan

Setelah modul ini kamu dapat:

- menjelaskan beda membaca seluruh berkas ke memori dan mengalirkannya (*stream*) sedikit demi sedikit;
- merekap data per kategori dengan `Map` sambil mengalirkan berkas besar;
- menangani baris yang terpotong di batas dua potongan;
- membandingkan dua cara secara adil dan jujur tentang apa yang diukur (keluaran minggu ini: skrip rekap).

## Prediksi dulu

Ini tugas baca-dan-prediksi, `AI: tanpa AI`. **Tebak dulu, tulis jawabanmu, baru jalankan.** Berkas `data/transaksi.csv` berisi satu baris judul (`id,kategori,jumlah`) dan 1.000.000 baris transaksi karangan, seluruhnya berukuran 21.704.304 bita (sekitar 20,7 MiB). Program `rekap-alir.ts`:

```ts
const berkas = Bun.file("data/transaksi.csv");
if (!(await berkas.exists())) throw new Error("jalankan bangun-data.ts dulu");

const rekap = new Map<string, { n: number; total: number }>();
let baris = 0;
let potongan = 0;

function proses(b: string): void {
  const [id, kategori, jumlah] = b.split(",");
  if (id === "id" || kategori === undefined || jumlah === undefined) return; // judul atau baris rusak
  baris++;
  const sekarang = rekap.get(kategori) ?? { n: 0, total: 0 };
  rekap.set(kategori, { n: sekarang.n + 1, total: sekarang.total + Number(jumlah) });
}

const pembaca = berkas.stream().pipeThrough(new TextDecoderStream());
let sisa = "";
for await (const bagian of pembaca) {
  potongan++;
  const teks = sisa + bagian;
  const garis = teks.split("\n");
  sisa = garis.pop() ?? ""; // baris terakhir mungkin terpotong; simpan untuk potongan berikutnya
  for (const b of garis) proses(b);
}
if (sisa !== "") proses(sisa);

console.log("potongan dibaca:", potongan);
console.log("baris data:", baris);
const urut = [...rekap].sort();
for (const [kategori, { n, total }] of urut) {
  console.log(`${kategori}: ${n} transaksi, total ${total}`);
}

const hasil = urut.map(([kategori, { n, total }]) => ({ kategori, transaksi: n, total }));
await Bun.write("data/rekap.json", JSON.stringify(hasil, null, 2) + "\n");
console.log("ditulis: data/rekap.json");
```

1. Berapa nilai `baris`, dan mengapa baris judul tidak ikut dihitung?
2. Bila tiap potongan sekitar 512 KiB (angka ini ketentuan Bun, jangan diandalkan), kira-kira berapa potongan yang dibaca?
3. Apa yang salah bila baris `sisa = garis.pop() ?? ""` dihapus dan seluruh `garis` diproses?

## Contoh terselesaikan

Berkas tadi dibangun `bangun-data.ts`. Pembangkit acaknya deterministik (diberi benih tetap) agar hasilnya sama pada setiap jalan, dan penulisnya mengalirkan baris ke berkas satu per satu:

```ts
import { mkdir } from "node:fs/promises";

// Data sintetis: transaksi karangan, bukan data nyata.
const kategori = ["buku", "alat-tulis", "makanan", "transportasi", "hiburan"];
const jumlahBaris = 1_000_000;

// Pembangkit acak deterministik (mulberry32) agar hasilnya sama di setiap jalan.
function acak(benih: number): () => number {
  let a = benih;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

await mkdir("data", { recursive: true });
const rand = acak(2026);
const penulis = Bun.file("data/transaksi.csv").writer();
penulis.write("id,kategori,jumlah\n");
for (let id = 1; id <= jumlahBaris; id++) {
  const k = kategori[Math.floor(rand() * kategori.length)]!;
  const jumlah = 1000 + Math.floor(rand() * 99) * 500;
  penulis.write(`${id},${k},${jumlah}\n`);
}
await penulis.end();
console.log("selesai menulis", jumlahBaris, "baris");
```

```text
selesai menulis 1000000 baris
```

Pada percobaan penyusun, `rekap-alir.ts` dijalankan dengan `/usr/bin/time -f "memori puncak: %M KB, waktu: %e s" bun run rekap-alir.ts` (perintah `time` ini ada di Linux; di komputer lain pakai pemantau tugas):

```text
potongan dibaca: 42
baris data: 1000000
alat-tulis: 199877 transaksi, total 5104624000
buku: 200370 transaksi, total 5105300000
hiburan: 199813 transaksi, total 5090999500
makanan: 200346 transaksi, total 5113578500
transportasi: 199594 transaksi, total 5088395500
ditulis: data/rekap.json
memori puncak: 65760 KB, waktu: 0.28 s
```

**Mengalirkan** berarti membaca berkas sepotong demi sepotong dan membuang tiap potongan setelah diolah, sehingga memori yang dipakai kira-kira sebesar satu potongan ditambah hasil rekap (lima kategori), bukan sebesar berkas. Pembanding yang sederhana, `rekap-semua.ts`, membaca seluruh isi dengan `await berkas.text()` lalu memecahnya:

```ts
const berkas = Bun.file("data/transaksi.csv");
if (!(await berkas.exists())) throw new Error("jalankan bangun-data.ts dulu");

const garis = (await berkas.text()).trim().split("\n").slice(1);
const rekap = new Map<string, { n: number; total: number }>();
for (const b of garis) {
  const [, kategori, jumlah] = b.split(",");
  const sekarang = rekap.get(kategori!) ?? { n: 0, total: 0 };
  rekap.set(kategori!, { n: sekarang.n + 1, total: sekarang.total + Number(jumlah) });
}
console.log("baris data:", garis.length);
for (const [kategori, { n, total }] of [...rekap].sort()) {
  console.log(`${kategori}: ${n} transaksi, total ${total}`);
}
```

```text
baris data: 1000000
alat-tulis: 199877 transaksi, total 5104624000
buku: 200370 transaksi, total 5105300000
hiburan: 199813 transaksi, total 5090999500
makanan: 200346 transaksi, total 5113578500
transportasi: 199594 transaksi, total 5088395500
memori puncak: 237372 KB, waktu: 0.30 s
```

Hasil rekapnya **sama**, waktunya hampir sama, tetapi memori puncaknya sekitar 3,6 kali lebih besar (237.372 KB dibanding 65.760 KB) pada percobaan penyusun, dan selisihnya diperkirakan makin lebar bila berkasnya makin besar (belum diukur penyusun). Yang diukur hanya satu jalan di satu komputer; itu petunjuk, bukan bukti umum (ingat `b-xi1-m10`: ukur berulang). Kebenaran hasil dicek dengan alat yang berbeda sama sekali, yaitu `awk` (`awk -F, 'NR>1{n[$2]++;t[$2]+=$3} END{for(k in n) print k": "n[k]" transaksi, total "t[k]}' data/transaksi.csv | sort`), dan pada percobaan penyusun menghasilkan lima baris yang sama persis dengan di atas. Pekerjaannya linear terhadap jumlah baris, karena tiap baris diproses satu kali.

Bagian paling licin ada pada batas potongan: potongan bisa berakhir di tengah baris (`...,14,buku,15` lalu potongan berikutnya `00\n...`). Program `rekap-salah.ts` memproses tiap potongan apa adanya dan hasilnya salah:

```ts
const berkas = Bun.file("data/transaksi.csv");
if (!(await berkas.exists())) throw new Error("jalankan bangun-data.ts dulu");

let baris = 0;
let rusak = 0;
const pembaca = berkas.stream().pipeThrough(new TextDecoderStream());
for await (const bagian of pembaca) {
  for (const b of bagian.split("\n")) {
    const kolom = b.split(",");
    if (kolom.length === 3 && kolom[0] !== "id") baris++;
    else if (b !== "") rusak++;
  }
}
console.log("baris dihitung:", baris, "| pecahan rusak:", rusak);
```

```text
baris dihitung: 999985 | pecahan rusak: 51
```

Seharusnya 1.000.000 baris; sebagian transaksi hilang atau terhitung dengan angka terpotong tanpa ada galat. Hasil yang kelihatan wajar dan tidak ada pesan galat inilah yang berbahaya. Perbaikan di `rekap-alir.ts`: simpan bagian terakhir yang belum selesai sebagai `sisa` dan sambungkan di depan potongan berikutnya. Angka `999985` dan `51` bisa berbeda di komputermu karena ukuran potongan bergantung pada Bun dan sistemmu.

## Contoh setengah jadi

Lengkapi pembaca baris yang menyambung potongan: ambil baris terakhir yang mungkin belum selesai, simpan untuk putaran berikutnya, proses baris sisanya, dan jangan lupa baris terakhir berkas.

```ts setengah-jadi
let sisa = "";
for await (const bagian of potongan) {
  const garis = (sisa + bagian).split("\n");
  sisa = garis.____() ?? "";
  for (const b of garis) proses(b);
}
if (sisa !== "____") proses(sisa);
```

## Soal Parsons

Susun baris berikut (sudah diacak) menjadi pembaca berkas yang mengalirkan dan tidak kehilangan baris. `AI: tanpa AI`.

```text
(a) let sisa = "";
(b) for await (const bagian of berkas.stream().pipeThrough(new TextDecoderStream())) {
(c)   const garis = (sisa + bagian).split("\n");
(d)   sisa = garis.pop() ?? "";
(e)   for (const b of garis) proses(b);
(f) }
(g) if (sisa !== "") proses(sisa);
```

## Latihan

1. `AI: boleh` **Rata-rata dan transaksi besar.** Perluas rekap agar mencetak rata-rata jumlah per kategori dan banyak transaksi berjumlah sedikitnya 40000, tetap dengan mengalirkan.
2. `AI: tanpa AI` **Telusuri batas potongan.** Potongan pertama `"id,kategori,jumlah\n1,buku,15"` dan potongan kedua `"00\n2,makanan,2000\n3,hi"` dan ketiga `"buran,500\n"`. Tuliskan isi `garis` dan `sisa` setelah tiap potongan pada program yang benar, dan transaksi apa yang diproses.
3. `AI: boleh` **Uji dengan data kecil.** Pindahkan logika rekap ke fungsi `rekapDari(potongan)` dan tulis uji `bun test` yang memotong teks contoh pada berbagai ukuran potongan, termasuk 1 karakter, dan memastikan hasilnya sama.
4. `AI: tanpa AI` **Apa yang diukur?** Seorang teman berkata "streaming dua kali lebih cepat" setelah menjalankan sekali. Tulis tiga hal yang kurang dari klaim itu dan cara memperbaiki pengukurannya.
5. *Opsional:* **catatan pemakaian AI.** Minta asisten AI menulis pembaca berkas besar, lalu cek: apakah baris yang terpotong ditangani, dan hasilnya sama dengan `awk`? Catat alatnya, tujuanmu, garis besar perintahmu, bagian yang kamu pakai, dan cara memeriksanya. Jangan menaruh data pribadi atau tugas bernilai pada perintah.

## Latihan bercampur

1. `AI: boleh` (dari `b-xi2-m5`) Data nyata punya sel `NA`. Ubah `proses` agar baris dengan jumlah `NA` dilewati dan dihitung terpisah, lalu cetak banyaknya.
2. `AI: boleh` (dari `b-xi2-m4`) Muat `data/rekap.json` kembali dengan skema Zod dan pastikan bentuknya benar sebelum dipakai.

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `b-xi2-m7` (pertanyaan 1), sekitar tiga minggu lagi di `b-xi2-m9` (pertanyaan 2), dan sekitar delapan minggu lagi di `b-xi2-m14` (pertanyaan 1). Jawab sekarang lalu simpan.

1. Apa beda membaca seluruh berkas dengan `text()` dan mengalirkannya, dan apa yang berbeda pada pemakaian memorinya?
2. Mengapa baris terakhir tiap potongan disimpan sebagai `sisa`, dan apa yang terjadi bila tidak?
3. Mengapa satu kali pengukuran tidak cukup untuk menyimpulkan satu cara lebih cepat?

## Kesalahan umum

- **Memproses potongan seolah berisi baris utuh.** Pada percobaan penyusun hasilnya 999.985 dari 1.000.000 baris tanpa pesan galat.
- **Lupa `sisa` terakhir.** Baris terakhir berkas tanpa baris baru di ujung ikut hilang.
- **Membaca semua ke memori "karena lebih mudah".** Untuk berkas kecil boleh; untuk berkas yang tumbuh, memori ikut tumbuh.
- **Menyimpulkan dari satu pengukuran.** Waktu dan memori bergantung pada komputer dan keadaan sesaat.
- **Menganggap hasil benar karena program tidak galat.** Cocokkan dengan cara lain (di sini `awk`) atau dengan data kecil yang jawabannya diketahui.
- **Mengira streaming selalu lebih cepat.** Pada percobaan penyusun waktunya hampir sama; yang jelas berbeda adalah memori.

## Cek mandiri

- [ ] Saya dapat menjelaskan beda membaca seluruh berkas dan mengalirkannya.
- [ ] Saya dapat merekap per kategori dengan `Map` sambil mengalirkan.
- [ ] Saya menangani baris yang terpotong di batas potongan.
- [ ] Saya mencocokkan hasil dengan cara lain atau data kecil.
- [ ] Saya tahu apa yang tidak dibuktikan oleh satu kali pengukuran.

## Kunci dan petunjuk

**Ingat kembali.** 1: boleh dipakai (lisensi dari halaman resmi), layak dipercaya (pengumpul, metode, rujukan), dan aman (tidak memuat data pribadi); tanpa lisensi karya berada di bawah hak cipta eksklusif pembuatnya, jadi belum boleh disalin atau dipakai tanpa izin. 2: karena pemeriksaan dilakukan berurutan: spasi dibuang dulu, baru panjang diperiksa; kebalikannya meloloskan judul yang hanya spasi. 3: perubahan kecil lebih mudah dibaca dengan teliti, lebih cepat diulas, dan jika bermasalah mudah dibatalkan.

**Prediksi dulu.** 1: 1.000.000; baris judul dilewati oleh pemeriksaan `id === "id"`. 2: sekitar 21.704.304 / 524.288, yaitu sekitar 41 sampai 42 potongan (percobaan penyusun: 42). 3: potongan bisa berakhir di tengah baris, sehingga baris yang terbelah diproses sebagai dua pecahan yang salah dan transaksinya hilang atau salah hitung.

**Contoh setengah jadi.** Isi berurutan: `pop`, string kosong (`""`).

**Soal Parsons.** Urutan benar: a, b, c, d, e, f, g. Penutup `for await` (f) datang sebelum pemrosesan `sisa` terakhir (g).

**Latihan.** 1: contoh yang dijalankan penyusun (`rekap-lanjut.ts`):

```ts
const berkas = Bun.file("data/transaksi.csv");
if (!(await berkas.exists())) throw new Error("jalankan bangun-data.ts dulu");

type Ringkasan = { n: number; total: number; besar: number };
const rekap = new Map<string, Ringkasan>();

function proses(b: string): void {
  const [id, kategori, jumlah] = b.split(",");
  if (id === "id" || kategori === undefined || jumlah === undefined) return;
  const nilai = Number(jumlah);
  const r = rekap.get(kategori) ?? { n: 0, total: 0, besar: 0 };
  rekap.set(kategori, { n: r.n + 1, total: r.total + nilai, besar: r.besar + (nilai >= 40000 ? 1 : 0) });
}

let sisa = "";
for await (const bagian of berkas.stream().pipeThrough(new TextDecoderStream())) {
  const garis = (sisa + bagian).split("\n");
  sisa = garis.pop() ?? "";
  for (const b of garis) proses(b);
}
if (sisa !== "") proses(sisa);

for (const [kategori, r] of [...rekap].sort()) {
  console.log(`${kategori}: rata-rata ${(r.total / r.n).toFixed(1)}, transaksi >= 40000: ${r.besar}`);
}
```

```text
alat-tulis: rata-rata 25538.8, transaksi >= 40000: 42512
buku: rata-rata 25479.4, transaksi >= 40000: 42217
hiburan: rata-rata 25478.8, transaksi >= 40000: 42334
makanan: rata-rata 25523.7, transaksi >= 40000: 42503
transportasi: rata-rata 25493.7, transaksi >= 40000: 42161
```

Hitungan transaksi besar dicocokkan penyusun dengan `awk` (lima angka yang sama). 2: setelah `pop`, potongan 1: `garis` = `["id,kategori,jumlah"]` dan `sisa` = `"1,buku,15"`; hanya judul diproses (dilewati). Potongan 2: teks gabungan `"1,buku,1500\n2,makanan,2000\n3,hi"` memberi `garis` = `["1,buku,1500", "2,makanan,2000"]` dan `sisa` = `"3,hi"`; dua transaksi diproses (id 1 dan 2). Potongan 3: teks gabungan `"3,hiburan,500\n"` memberi `garis` = `["3,hiburan,500"]` dan `sisa` = `""`; transaksi 3 diproses, dan `sisa` kosong tidak diproses lagi di akhir. 3: berkas yang dijalankan penyusun (`rekap-fungsi.ts` dan `rekap-fungsi.test.ts`):

```ts
export type Ringkasan = { n: number; total: number };

export async function rekapDari(
  potongan: AsyncIterable<string> | Iterable<string>,
): Promise<Map<string, Ringkasan>> {
  const rekap = new Map<string, Ringkasan>();
  const proses = (b: string): void => {
    const [id, kategori, jumlah] = b.split(",");
    if (id === "id" || kategori === undefined || jumlah === undefined) return;
    const r = rekap.get(kategori) ?? { n: 0, total: 0 };
    rekap.set(kategori, { n: r.n + 1, total: r.total + Number(jumlah) });
  };
  let sisa = "";
  for await (const bagian of potongan) {
    const garis = (sisa + bagian).split("\n");
    sisa = garis.pop() ?? "";
    for (const b of garis) proses(b);
  }
  if (sisa !== "") proses(sisa);
  return rekap;
}
```

```ts
import { expect, test } from "bun:test";
import { rekapDari } from "./rekap-fungsi";

const teks = "id,kategori,jumlah\n1,buku,1500\n2,makanan,2000\n3,buku,500\n4,hiburan,3000\n";

function potong(isi: string, ukuran: number): string[] {
  const hasil: string[] = [];
  for (let i = 0; i < isi.length; i += ukuran) hasil.push(isi.slice(i, i + ukuran));
  return hasil;
}

test("hasil sama untuk berbagai ukuran potongan", async () => {
  const acuan = await rekapDari([teks]);
  expect(acuan.get("buku")).toEqual({ n: 2, total: 2000 });
  for (const ukuran of [1, 2, 3, 5, 8, 13, 100]) {
    expect(await rekapDari(potong(teks, ukuran))).toEqual(acuan);
  }
});

test("baris terakhir tanpa baris baru tetap dihitung", async () => {
  const hasil = await rekapDari(["id,kategori,jumlah\n1,buku,1500"]);
  expect(hasil.get("buku")).toEqual({ n: 1, total: 1500 });
});
```

```text
bun test v1.4.4 (38afee6c8)

 2 pass
 0 fail
 9 expect() calls
Ran 2 tests across 1 file. [4.00ms]
```

4: kurang: hanya satu jalan (ulangi dan ambil median), hanya satu komputer dan satu ukuran data, dan tidak jelas yang diukur (waktu atau memori); perbaiki dengan beberapa kali jalan, beberapa ukuran data, dan menyebut ukurannya. Pada percobaan penyusun waktunya hampir sama dan memori yang berbeda jauh.

**Latihan bercampur.** 1: contoh: `if (jumlah === "NA") { hilang++; return; }` sebelum `Number(jumlah)`, dengan penghitung `hilang` di luar fungsi, dicetak di akhir. 2: `muat`-style: `JSON.parse` teks `rekap.json`, lalu `z.array(z.object({ kategori: z.string(), transaksi: z.number().int(), total: z.number() })).safeParse(...)`; bila gagal, hentikan dengan pesan jelas.

**Ulang berjarak.** 1: `text()` membaca seluruh isi ke memori sekaligus (memori ikut sebesar berkas), sedangkan mengalirkan hanya menyimpan satu potongan dan hasil rekap; pada percobaan penyusun puncaknya 65.760 KB lawan 237.372 KB. 2: potongan bisa berakhir di tengah baris; `sisa` menyambungnya dengan potongan berikutnya; tanpa itu baris terbelah menjadi dua pecahan salah dan hasil rekap keliru tanpa galat. 3: satu jalan dipengaruhi beban komputer dan keadaan sesaat; ulangi dan ambil median agar adil.

## Langkah berikutnya

Modul berikut: `b-xi2-m7` (visualisasi data), yang menyajikan `data/rekap.json` sebagai tabel dan grafik SVG. Modul terkait: `matkom-pertumbuhan-fungsi` (mengapa waktu naik linear atau lebih cepat). Bacaan lanjut: halaman dokumentasi Bun tentang berkas dan halaman MDN tentang Streams API.
