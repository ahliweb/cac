## Untuk siapa modul ini

Modul ini untuk murid kelas XI jalur B (Web dengan JavaScript, TypeScript, dan Bun), minggu `B-XI2-M7` silabus v1.4.1: visualisasi data. Prasyarat: modul `b-xi2-m6` (pengolahan data bervolume lebih besar) dan `b-x2-m6` (DOM dan penanganan peristiwa).

Modul ini karangan penyusun dan disetujui pemilik program pada 2026-11-20 (keputusan lewat dialog; catatan tinjauan menjadi tindak lanjut revisi). Butir `F-AD-a` dipetakan silabus sebagai dipenuhi jalur ini; pemenuhan butir mengikuti pemetaan silabus, bukan status modul.

Contoh dijalankan penyusun dengan Bun 1.4.4 dan TypeScript 7.0.2 per 2026-11. Halaman hasilnya dibuka penyusun di Chrome 158 mode *headless* dan ditangkap sebagai gambar; yang dilaporkan di bawah adalah apa yang terlihat pada gambar itu. Datanya sintetis (rekap dari `b-xi2-m6`). Tugas baca-dan-prediksi ditandai `AI: tanpa AI`; selain itu AI generatif boleh dipakai dengan etika dan dicatat, tanpa data pribadi, kata sandi, atau tugas bernilai pada permintaanmu.

## Ingat kembali

Jawab dari ingatan dulu, baru cek di bagian kunci. Soal 1 dari `b-xi2-m6`, soal 2 dari `b-xi2-m4`, soal 3 dari `b-xi1-m13`.

1. Apa beda membaca seluruh berkas dengan `text()` dan mengalirkannya, dan apa yang berbeda pada pemakaian memorinya?
2. Mengapa `simpan` menulis ke berkas sementara lalu `rename`, dan mengapa penulisannya dijadikan antrean?
3. Sebutkan tiga pemeriksaan yang harus lulus sebelum pustaka diserahkan.

## Tujuan

Setelah modul ini kamu dapat:

- menyajikan data rekap sebagai tabel HTML dan grafik batang SVG yang dibangkitkan program;
- menghitung skala dari nilai data ke tinggi batang;
- menjelaskan mengapa sumbu yang dipotong menyesatkan dan memilih sumbu yang jujur;
- membuat grafik yang dapat dibaca teknologi bantu dan tidak bergantung hanya pada warna (keluaran minggu ini: halaman grafik).

## Prediksi dulu

Ini tugas baca-dan-prediksi, `AI: tanpa AI`. **Tebak dulu, tulis jawabanmu, baru jalankan.** Rekap dari `b-xi2-m6` (`data/rekap.json`) memuat banyak transaksi per kategori:

| Kategori | Transaksi |
| --- | --- |
| alat-tulis | 199877 |
| buku | 200370 |
| hiburan | 199813 |
| makanan | 200346 |
| transportasi | 199594 |

Tinggi sebuah batang dihitung `(nilai - nilaiMulai) / (nilaiMaks - nilaiMulai) × tinggiArea`, dengan `nilaiMaks` = 200370. Dua grafik dibuat dari data yang sama: grafik A dengan `nilaiMulai` = 0 dan grafik B dengan `nilaiMulai` = 199000.

1. Pada grafik A, berapa kali lebih tinggi batang `buku` dibanding `transportasi` (tiga angka di belakang koma)?
2. Pada grafik B, berapa kali?
3. Grafik mana yang lebih jujur untuk pembaca yang bertanya "apakah kategorinya berbeda jauh?", dan mengapa?

## Contoh terselesaikan

Program `grafik.ts` membaca `data/rekap.json`, membangun halaman HTML berisi dua grafik batang SVG (A dan B) beserta tabel datanya, lalu menulisnya ke `data/grafik.html`:

```ts
type Baris = { kategori: string; transaksi: number; total: number };

const berkas = Bun.file("data/rekap.json");
if (!(await berkas.exists())) throw new Error("buat data/rekap.json dulu (modul sebelumnya)");
const data = (await berkas.json()) as Baris[];

// Teks apa pun yang masuk ke HTML harus di-escape, termasuk nama kategori.
function esc(teks: string): string {
  return teks
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

const lebar = 480;
const tinggi = 260;
const kiri = 70;
const bawah = 40;
const atas = 20;

function grafikBatang(id: string, judul: string, nilaiMulai: number, nilaiMaks: number): string {
  const area = tinggi - bawah - atas;
  const skala = (v: number): number => ((v - nilaiMulai) / (nilaiMaks - nilaiMulai)) * area;
  const lebarBatang = (lebar - kiri - 10) / data.length;
  const batang = data
    .map((d, i) => {
      const h = skala(d.transaksi);
      const x = kiri + i * lebarBatang + 6;
      const y = tinggi - bawah - h;
      return (
        `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${(lebarBatang - 12).toFixed(1)}" height="${h.toFixed(1)}" fill="#1f5fa8"/>` +
        `<text x="${(x + (lebarBatang - 12) / 2).toFixed(1)}" y="${tinggi - bawah + 16}" text-anchor="middle" font-size="11">${esc(d.kategori)}</text>`
      );
    })
    .join("\n    ");
  const label =
    `<text x="${kiri - 6}" y="${tinggi - bawah}" text-anchor="end" font-size="11">${nilaiMulai}</text>` +
    `<text x="${kiri - 6}" y="${atas + 4}" text-anchor="end" font-size="11">${nilaiMaks}</text>`;
  return `<svg role="img" aria-labelledby="${id}" viewBox="0 0 ${lebar} ${tinggi}" width="${lebar}" height="${tinggi}" font-family="sans-serif">
    <title id="${id}">${esc(judul)}</title>
    <line x1="${kiri}" y1="${tinggi - bawah}" x2="${lebar - 10}" y2="${tinggi - bawah}" stroke="#333"/>
    <line x1="${kiri}" y1="${atas}" x2="${kiri}" y2="${tinggi - bawah}" stroke="#333"/>
    ${label}
    ${batang}
  </svg>`;
}

const maks = Math.max(...data.map((d) => d.transaksi));
const baris = data.map((d) => `<tr><td>${esc(d.kategori)}</td><td>${d.transaksi}</td></tr>`).join("\n      ");

const html = `<!doctype html>
<html lang="id">
<head><meta charset="utf-8"><title>Transaksi per kategori (data sintetis)</title></head>
<body>
  <h1>Transaksi per kategori (data sintetis)</h1>
  <figure>
    ${grafikBatang("g-nol", "Banyak transaksi per kategori, sumbu mulai dari 0", 0, maks)}
    <figcaption>Sumbu vertikal mulai dari 0.</figcaption>
  </figure>
  <figure>
    ${grafikBatang("g-potong", "Banyak transaksi per kategori, sumbu dipotong mulai 199000", 199000, maks)}
    <figcaption>Sumbu vertikal dipotong: mulai 199000. Bandingkan dengan grafik di atas.</figcaption>
  </figure>
  <table>
    <caption>Data di balik grafik</caption>
    <thead><tr><th>Kategori</th><th>Transaksi</th></tr></thead>
    <tbody>
      ${baris}
    </tbody>
  </table>
</body>
</html>
`;

await Bun.write("data/grafik.html", html);
console.log("ditulis: data/grafik.html,", html.length, "karakter");
const buku = data.find((d) => d.kategori === "buku")!;
const transportasi = data.find((d) => d.kategori === "transportasi")!;
console.log("rasio tinggi buku/transportasi, sumbu dari 0:", ((buku.transaksi - 0) / (transportasi.transaksi - 0)).toFixed(3));
console.log("rasio tinggi buku/transportasi, sumbu dipotong:", ((buku.transaksi - 199000) / (transportasi.transaksi - 199000)).toFixed(3));
```

```text
ditulis: data/grafik.html, 3222 karakter
rasio tinggi buku/transportasi, sumbu dari 0: 1.004
rasio tinggi buku/transportasi, sumbu dipotong: 2.306
```

Pada gambar halaman yang dibuka di Chrome *headless* penyusun melihat: grafik pertama berisi lima batang yang tingginya hampir sama sampai tidak bisa dibedakan dengan mata; grafik kedua dari data yang sama berisi batang `buku` dan `makanan` tertinggi dan `transportasi` paling pendek, tampak kurang dari separuh tinggi `buku`; di bawahnya tabel lima baris. Datanya tidak berubah: selisih terbesar antarkategori hanya 776 dari sekitar 200.000 (kurang dari 0,4 persen). Grafik kedua tidak berbohong tentang angkanya, tetapi menyesatkan tentang **besarnya** selisih. Batang menyandikan nilai lewat **tingginya**, jadi sumbunya harus mulai dari nol; titik dan garis boleh memakai sumbu terpotong asal dinyatakan jelas.

**Skala** adalah fungsi linear dari nilai data ke piksel: `(v - nilaiMulai) / (nilaiMaks - nilaiMulai)` memberi bilangan 0 sampai 1 yang dikalikan tinggi area. Sumbu SVG terbalik (y membesar ke bawah), jadi bagian atas batang adalah `tinggi - bawah - h`. Beberapa hal membuat grafik layak dibaca orang lain:

- **Teks pengganti.** `role="img"` dengan `<title>` yang ditunjuk `aria-labelledby` memberi nama pada grafik bagi pembaca layar, dan tabel data di bawahnya memuat angka lengkapnya.
- **Tidak hanya warna.** Tiap batang diberi nama kategori sebagai teks (kriteria "Use of Color" WCAG 1.4.1 meminta informasi tidak disampaikan dengan warna saja).
- **Kontras.** Warna batang `#1f5fa8` di atas putih berkontras sekitar 6,44:1 menurut penyusun yang menghitungnya dengan rumus WCAG (kriteria "Non-text Contrast" 1.4.11 meminta sedikitnya 3:1 untuk elemen grafis penting).
- **Escape teks.** Nama kategori berasal dari data; teks apa pun yang masuk ke HTML dilewatkan `esc` agar `<` dan `&` tidak dibaca sebagai markah (ingat `innerHTML` di `b-x2-m6`).

## Contoh setengah jadi

Lengkapi fungsi skala agar batang dengan `nilaiMulai` = 0 setinggi area penuh saat nilainya sama dengan `nilaiMaks`, dan fungsi `esc` untuk tanda lebih kecil.

```ts setengah-jadi
const skala = (v: number): number => ((v - ____) / (nilaiMaks - nilaiMulai)) * ____;

function esc(teks: string): string {
  return teks.replaceAll("&", "&amp;").replaceAll("____", "&lt;");
}
```

## Soal Parsons

Susun baris berikut (sudah diacak) menjadi pembuatan satu batang SVG dari satu nilai. `AI: tanpa AI`.

```text
(a) const h = ((nilai - mulai) / (maks - mulai)) * area;
(b) const y = tinggi - bawah - h;
(c) return `<rect x="${x}" y="${y}" width="40" height="${h}" fill="#1f5fa8"/>`;
(d) function batang(nilai: number, x: number): string {
(e) }
```

## Latihan

1. `AI: boleh` **Grafik total.** Tambahkan grafik ketiga untuk `total` per kategori dengan sumbu dari nol, dan tampilkan angka di tabel dengan `Intl.NumberFormat("id-ID")`. Apa yang kamu lihat, dan apakah kesimpulannya berbeda dari grafik transaksi?
2. `AI: tanpa AI` **Nama kategori berbahaya.** Bila nama kategori adalah `<b>buku</b> & "alat"` dan `esc` dihapus, apa yang tampil di tabel? Dengan `esc`, apa yang tampil? Perkirakan, lalu jalankan `esc` pada teks itu.
3. `AI: boleh` **Data terbuka.** Dari `data/penguins.csv` (modul `b-xi2-m5`) buat grafik batang rata-rata massa per spesies dengan sumbu dari nol. Cantumkan sumber, lisensi (CC0, menurut halaman resminya), dan tanggal akses di bawah grafik.
4. `AI: tanpa AI` **Periksa grafik.** Untuk halaman `grafik.html`, tuliskan tiga hal yang membantu pembaca layar atau pembaca yang sulit membedakan warna, dan satu hal yang masih kurang.
5. *Opsional:* **catatan pemakaian AI.** Minta asisten AI menyarankan jenis grafik untuk datamu, lalu cek: apakah sumbu batangnya dari nol, apakah ada label dan teks pengganti, dan apakah angkanya cocok dengan tabel. Catat alatnya, tujuanmu, garis besar perintahmu, bagian yang kamu pakai, dan cara memeriksanya. Jangan menaruh data pribadi atau tugas bernilai pada perintah.

## Latihan bercampur

1. `AI: boleh` (dari `b-xi2-m6`) Bila `data/rekap.json` tidak ada, `grafik.ts` berhenti dengan pesan jelas. Ubah agar ia membuat rekap dari `data/transaksi.csv` secara mengalir bila `rekap.json` belum ada.
2. `AI: boleh` (dari `b-xi2-m2`) Sajikan `data/grafik.html` lewat server `Bun.serve` pada rute `/grafik` dengan `hostname: "localhost"`, dan uji balasannya (status dan `content-type`) dengan `fetch` ke port 0.

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `b-xi2-m8` (pertanyaan 1), sekitar tiga minggu lagi di `b-xi2-m10` (pertanyaan 2), dan sekitar delapan minggu lagi di `b-xii1-m1` (pertanyaan 3). Jawab sekarang lalu simpan.

1. Mengapa grafik batang harus memakai sumbu yang mulai dari nol, dan apa yang terjadi bila sumbunya dipotong?
2. Mengapa teks dari data dilewatkan `esc` sebelum dimasukkan ke HTML?
3. Sebutkan dua cara membuat grafik tetap dapat dipahami tanpa melihat warna atau gambarnya.

## Kesalahan umum

- **Memotong sumbu batang.** Pada percobaan penyusun selisih kurang dari 0,4 persen tampak sebagai batang yang tingginya 2,3 kali berbeda.
- **Mengira grafik yang cantik sudah jujur.** Periksa sumbu, satuan, dan sumber.
- **Memasukkan teks data ke HTML tanpa `esc`.** Nama kategori berisi `<` bisa dibaca sebagai markah.
- **Hanya warna sebagai pembeda.** Pembaca yang sulit membedakan warna kehilangan informasi; beri teks atau pola.
- **Grafik tanpa tabel atau teks pengganti.** Pembaca layar tidak mendapat apa pun.
- **Tanpa sumber dan tanggal.** Data terbuka tetap dicantumkan sumber, lisensi, dan tanggal aksesnya di bawah grafik.

## Cek mandiri

- [ ] Saya dapat menghitung skala dari nilai data ke tinggi batang.
- [ ] Saya dapat menjelaskan mengapa sumbu batang mulai dari nol.
- [ ] Saya melewatkan teks dari data melalui `esc` sebelum masuk ke HTML.
- [ ] Saya memberi grafik judul, teks pengganti, dan tabel data.
- [ ] Saya mencantumkan sumber dan lisensi data di bawah grafik.

## Kunci dan petunjuk

**Ingat kembali.** 1: `text()` membaca seluruh isi ke memori sekaligus (memori ikut sebesar berkas), sedangkan mengalirkan hanya menyimpan satu potongan dan hasil rekap. 2: agar berkas lama utuh sampai penggantian selesai (`rename` mengganti sekaligus); antrean agar dua penulisan tidak memakai berkas sementara yang sama. 3: pemeriksaan tipe (`bunx tsc --noEmit`), linter, dan uji (`bun test`).

**Prediksi dulu.** 1: 200370 / 199594 ≈ 1,004. 2: (200370 − 199000) / (199594 − 199000) = 1370 / 594 ≈ 2,306. 3: grafik A, karena tinggi batang sebanding dengan nilainya sehingga kesan visual cocok dengan kenyataan (selisih sangat kecil); grafik B melebih-lebihkan selisih. Jika selisih kecil itu memang yang ingin ditunjukkan, grafik B boleh dipakai asal sumbunya dinyatakan jelas (dan lebih baik titik atau garis, bukan batang).

**Contoh setengah jadi.** Isi berurutan: `nilaiMulai`, `area`, `<`. Contoh jadi: `const skala = (v: number): number => ((v - nilaiMulai) / (nilaiMaks - nilaiMulai)) * area;` dan `.replaceAll("<", "&lt;")`.

**Soal Parsons.** Urutan benar: d, a, b, c, e. Fungsi dibuka (d), tinggi dihitung (a), posisi atas dihitung dari tinggi (b), elemen dikembalikan (c), penutup (e).

**Latihan.** 1: ganti `d.transaksi` dengan `d.total` pada `skala` dan batang, dan nilai maksimum dengan maksimum `total`; untuk tabel, `new Intl.NumberFormat("id-ID").format(angka)`. Totalnya juga hampir sama (sekitar 5,09 sampai 5,11 miliar), jadi kesimpulannya serupa: kategori tidak berbeda jauh. 2: tanpa `esc`, menurut aturan HTML `<b>` dibaca sebagai markah sehingga kata `buku` tampil tebal dan tag-nya tidak terlihat (penyusun tidak menjalankannya di peramban; markah yang lebih berbahaya bisa disusupkan dengan cara yang sama); dengan `esc`, teksnya tampil apa adanya. Penyusun menjalankan `esc`:

```ts
function esc(teks: string): string {
  return teks
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

console.log(esc('<b>buku</b> & "alat"'));
console.log(esc("&lt;"));
```

```text
&lt;b&gt;buku&lt;/b&gt; &amp; &quot;alat&quot;
&amp;lt;
```

Perhatikan bahwa `&` diganti paling dulu; bila urutannya terbalik, `&lt;` yang baru dibuat ikut rusak. Dan teks yang sudah ter-escape lalu di-escape lagi (baris kedua) menjadi `&amp;lt;`: di-escape satu kali, di tempat teks masuk ke HTML. 3: pakai `Map` rata-rata dari `b-xi2-m5`, tiga batang; di bawah grafik tulis nama sumber, "CC0 1.0", dan "diakses 2026-11-20" seperti di catatan sumbernya. 4: yang membantu: `role="img"` dan `<title>`, tabel data, label teks pada tiap batang, warna berkontras sekitar 6,44:1; yang kurang: tidak ada keterangan satuan pada sumbu, dan grafik tidak punya deskripsi panjang tentang temuannya ("selisih antarkategori kecil").

**Latihan bercampur.** 1: periksa `await berkas.exists()`; bila tidak ada, panggil logika rekap dari `b-xi2-m6` (fungsi `rekapDari` bila sudah dipisah) dan tulis `data/rekap.json` sebelum menggambar. 2: contoh yang dijalankan penyusun:

```ts
const server = Bun.serve({
  hostname: "localhost",
  port: 0,
  routes: {
    "/grafik": () => new Response(Bun.file("data/grafik.html")),
  },
  fetch() {
    return new Response("tidak ada\n", { status: 404 });
  },
});

const res = await fetch(new URL("/grafik", server.url));
console.log(res.status, res.headers.get("content-type"));
console.log((await res.text()).split("\n")[0]);
server.stop();
```

```text
200 text/html;charset=utf-8
<!doctype html>
```

**Ulang berjarak.** 1: tinggi batang menyandikan nilai; bila sumbu dipotong, perbandingan tinggi tidak lagi sebanding dengan perbandingan nilai dan selisih kecil tampak besar (pada percobaan penyusun 1,004 menjadi 2,306 kali). 2: teks dari data bisa memuat `<` atau `&` yang dibaca peramban sebagai markah; `esc` mengubahnya menjadi teks biasa. 3: teks pengganti (`<title>` dan tabel data) dan label teks pada elemen (bukan hanya warna).

## Langkah berikutnya

Modul berikut: `b-xi2-m8` (prediksi sederhana), yang memakai rekap seperti ini untuk memperkirakan nilai berikutnya. Modul terkait: `matkom-teks-gambar-suara` (cara komputer menyimpan gambar) dan `pendamping-periksa-fakta-dan-baca-lateral` (membaca grafik dengan kritis). Bacaan lanjut: halaman MDN untuk SVG dan halaman WCAG tentang kontras elemen grafis dan penggunaan warna.
