## Untuk siapa modul ini

Modul ini untuk murid kelas XI jalur B (Web dengan JavaScript, TypeScript, dan Bun), minggu `B-XI2-M12` silabus v1.4.1: penyajian statis, **opsional**. Prasyarat: modul `b-xi2-m11` (jaringan: HTTP dan pemecahan masalah). Melewati modul ini tidak mengurangi apa pun pada minggu berikutnya.

Modul ini karangan penyusun dan disetujui pemilik program pada 2026-11-20 (keputusan lewat dialog; catatan tinjauan menjadi tindak lanjut revisi). Silabus tidak memetakan butir capaian pembelajaran pada minggu ini.

**Batas modul ini.** Situs disajikan hanya di `localhost` atau di jaringan lab sekolah atas izin dan arahan gurumu. Modul ini tidak memakai layanan hosting luar yang meminta akun, kunci, atau pembayaran, dan tidak menerbitkan apa pun ke internet. Contoh dijalankan penyusun dengan Bun 1.4.4 per 2026-11, `curl`, dan Chrome tanpa kepala. Tugas baca-dan-prediksi `AI: tanpa AI`; selain itu AI boleh dipakai dengan etika dan dicatat, tanpa data pribadi atau rahasia pada permintaanmu.

## Ingat kembali

Jawab dari ingatan dulu, baru cek di bagian kunci. Soal 1 dari `b-xi2-m11`, soal 2 dari `b-xi2-m9`, soal 3 dari `b-xi2-m4`.

1. Apa arti kelompok status 2xx, 3xx, 4xx, dan 5xx, dengan satu contoh tiap kelompok?
2. Mengapa bentuk data dari API luar diperiksa sebelum dipakai?
3. Apa yang terjadi pada tugas di memori saat server dimatikan, dan bagaimana tugas itu kembali saat server dinyalakan lagi?

## Tujuan

Setelah modul ini kamu dapat:

- mengubah kode TypeScript menjadi berkas yang bisa dimuat peramban dengan `bun build`;
- menyajikan folder situs statis dari server Bun dengan jenis isi yang benar dan 404 untuk berkas yang tidak ada;
- menolak permintaan yang mencoba keluar dari folder situs (penelusuran jalur);
- menjelaskan beda `localhost` dan jaringan lab, serta apa yang boleh ada di folder yang disajikan (keluaran minggu ini: situs statis).

## Prediksi dulu

Ini tugas baca-dan-prediksi, `AI: tanpa AI`. **Tebak dulu, tulis jawabanmu, baru jalankan.**

```ts
import { join, resolve } from "node:path";

const akar = resolve("situs");
for (const minta of ["/index.html", "/../rahasia.txt", "/css/../app.js"]) {
  const berkas = resolve(join(akar, minta));
  console.log(minta, "->", berkas.startsWith(akar + "/") ? "boleh" : "DITOLAK");
}
```

1. Apa tiga baris yang tercetak?
2. `resolve` menyelesaikan `..` pada jalur. Mengapa pemeriksaan `startsWith(akar + "/")` perlu dilakukan **sesudah** `resolve`?

## Contoh terselesaikan

Keluaran program tadi:

```text
/index.html -> boleh
/../rahasia.txt -> DITOLAK
/css/../app.js -> boleh
```

Situs **statis** adalah kumpulan berkas (HTML, CSS, JavaScript, gambar) yang dikirim apa adanya; tidak ada program yang jalan di server untuk tiap permintaan. Peramban tidak menjalankan TypeScript, jadi `bun build` mengubahnya menjadi JavaScript (dokumentasi Bun tentang *bundler*). Contoh kita: folder `situs` berisi `index.html` dan `gaya.css` yang kamu tulis, kode di `src/app.ts`, dan berkas rahasia-palsu `rahasia.txt` yang **sengaja diletakkan di luar** folder `situs`.

```ts
const salam: string = "Halo dari situs statis!";
const elemen = document.querySelector("#salam");
if (elemen) elemen.textContent = salam;
```

```sh
bun build ./src/app.ts --outdir situs
```

```text
Bundled 1 module in 8ms

  app.js  142 bytes  (entry point)

```

Halaman `index.html` memuat `gaya.css` dan `app.js` dari folder yang sama (`<script type="module" src="app.js">`). Server berikut menyajikan folder `situs` saja:

```ts
import { join, resolve } from "node:path";

const akar = resolve("situs");

Bun.serve({
  port: 3300,
  hostname: "localhost",
  async fetch(req) {
    let jalur = decodeURIComponent(new URL(req.url).pathname);
    if (jalur.endsWith("/")) jalur += "index.html";
    const berkas = resolve(join(akar, jalur));
    if (!berkas.startsWith(akar + "/")) return new Response("ditolak", { status: 403 });
    const isi = Bun.file(berkas);
    if (!(await isi.exists())) return new Response("tidak ada", { status: 404 });
    return new Response(isi);
  },
});
console.log("situs di http://localhost:3300");
```

Penyusun mencoba dengan `curl -i` (baris `Date` dibuang, hanya empat baris pertama): `/` memberi `200` dengan `content-type: text/html;charset=utf-8`, `/gaya.css` memberi `200` dengan `text/css;charset=utf-8`, `/app.js` memberi `200` dengan `text/javascript;charset=utf-8`, dan `/hilang.html` memberi `404`. `Bun.file` menentukan jenis isi dari ekstensi berkas. Di Chrome tanpa kepala, halamannya menampilkan `<p id="salam">Halo dari situs statis!</p>`; tampilan visual tidak diperiksa.

**Penelusuran jalur** (*path traversal*) adalah permintaan yang memakai `..` untuk keluar dari folder situs dan membaca berkas lain, mis. `rahasia.txt`. Penyusun mencobanya pada server latihannya sendiri dengan `curl --path-as-is`. Pada `/../rahasia.txt` dan `/%2e%2e/rahasia.txt`, `URL` sudah merapikan jalurnya menjadi `/rahasia.txt`, yang tidak ada di dalam `situs`, sehingga jawabannya `404`. Pada `/..%2Frahasia.txt`, garis miring tersandi baru terurai oleh `decodeURIComponent`, lalu `resolve` menghasilkan jalur di luar `situs`, dan penjaga `startsWith` menjawab `403`. Jadi **jangan mengandalkan perapian bawaan**: selalu selesaikan jalurnya, lalu periksa bahwa ia masih di dalam folder yang disajikan.

**`localhost` dan jaringan lab.** Dengan `hostname: "localhost"`, `ss -ltn` menampilkan pendengar di `127.0.0.1:3300`: hanya komputermu yang bisa menjangkaunya. Bila gurumu mengizinkan dan mengarahkan, mengganti menjadi `hostname: "0.0.0.0"` membuat pendengarnya `0.0.0.0:3300` (diperiksa penyusun): komputer lain di jaringan yang sama dapat membukanya. Lakukan itu **hanya di jaringan lab**, bukan di Wi-Fi umum, dan hanya bila folder `situs` berisi berkas yang memang boleh dilihat siapa saja: tidak ada `.env`, catatan pribadi, atau data murid. Kembalikan ke `localhost` setelah selesai. Menerbitkan situs ke internet butuh keputusan dan akun yang di luar modul ini; modul pengayaan `cloud-deploy-sederhana` membahasnya dengan arahan guru.

## Contoh setengah jadi

Lengkapi penjaga jalur pada server (kunci di bawah):

```ts setengah-jadi
const berkas = resolve(join(akar, jalur));
if (!berkas.startsWith(akar + "____")) {
  return new Response("ditolak", { status: ____ });
}
```

Apa yang terjadi bila pemeriksaan ditulis `startsWith(akar)` tanpa garis miring, dan ada folder bernama `situs-lama` di sebelah `situs`?

## Soal Parsons

Susun baris berikut menjadi penanganan permintaan yang benar di dalam `Bun.serve` (kunci di bawah). Satu baris tidak terpakai.

```text
    const isi = Bun.file(berkas);
  async fetch(req) {
    return new Response(isi);
    if (!(await isi.exists())) return new Response("tidak ada", { status: 404 });
    const jalur = decodeURIComponent(new URL(req.url).pathname);
    if (!berkas.startsWith(akar + "/")) return new Response("ditolak", { status: 403 });
    const berkas = resolve(join(akar, jalur));
  },
    return new Response("kosong");
```

## Latihan

1. `AI: tanpa AI` Tebak apa yang dicetak `new URL("/../rahasia.txt", "http://localhost:3300").pathname`, lalu jalankan. Mengapa penjaga `startsWith` tetap perlu?
2. `AI: boleh` Tambahkan berkas `situs/404.html` dan ubah server agar jawaban 404 memakai isinya, dengan status tetap 404. Uji dengan `curl -i`.
3. `AI: boleh` Jalankan server latihan di `localhost` lalu di `0.0.0.0` (hanya dengan izin gurumu, di jaringan lab). Bandingkan keluaran `ss -ltn` untuk keduanya, dan tulis dua hal yang kamu pastikan sebelum mengubahnya.
4. `AI: tanpa AI` Folder `situs` berisi `index.html`, `app.js`, `.env`, `catatan-guru.txt`, dan `app.js.map` (peta kode sumber). Berkas mana yang aman disajikan dan mana yang harus dikeluarkan, beserta alasannya?
5. `AI: boleh` (opsional) Catatan pemakaian AI: alat, tujuan, garis besar perintah, bagian yang dipakai, dan cara memeriksanya.

## Latihan bercampur

1. `AI: boleh` (dari `b-xi2-m11`) Jalur yang ditolak penjaga dijawab 403 atau 404? Jelaskan pilihanmu dan apa yang diketahui penyerang dari masing-masing jawaban.
2. `AI: boleh` (dari `b-xi2-m10`) `.env` terlanjur berada di folder `situs` dan server berjalan di `0.0.0.0` di jaringan lab. Apa yang harus dianggap telah terjadi, dan apa langkahmu?

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `b-xi2-m13` (pertanyaan 1), sekitar tiga minggu lagi di `b-xii1-m1` (pertanyaan 2), dan sekitar delapan minggu lagi di semester berikutnya, modul `b-xii1-m6` (pertanyaan 3). Jawab sekarang lalu simpan.

1. Mengapa server berkas statis menyelesaikan jalur lalu memeriksa bahwa hasilnya masih di dalam folder situs?
2. Apa yang boleh dan tidak boleh ada di folder yang disajikan ke orang lain?
3. Apa yang dikerjakan `bun build ./src/app.ts --outdir situs`, dan mengapa peramban memerlukannya untuk TypeScript?

## Kesalahan umum

- **Menyajikan seluruh folder proyek.** `.env`, `.git`, dan kode sumber ikut terkirim; sajikan hanya folder khusus.
- **Memeriksa jalur sebelum `resolve`.** `..` atau sandi `%2F` lolos dari pemeriksaan teks sederhana.
- **Memeriksa `startsWith(akar)` tanpa garis miring.** Folder tetangga `situs-lama` ikut lolos.
- **Memakai `0.0.0.0` di Wi-Fi umum.** Siapa pun di jaringan itu dapat membuka situsmu.
- **Mengira situs statis tidak perlu keamanan.** Isi berkasnya tetap publik; tidak ada yang rahasia di dalamnya.
- **Membuka `index.html` langsung dari berkas dan heran `fetch` gagal.** Pada percobaan penyusun di Chrome tanpa kepala, `fetch` ke berkas di sebelah halaman `file://` gagal dengan `TypeError`; sajikan lewat server.

## Cek mandiri

- [ ] Saya dapat mengubah TypeScript menjadi JavaScript untuk peramban dengan `bun build`.
- [ ] Saya dapat menulis server berkas statis dengan 404 dan jenis isi yang benar.
- [ ] Saya dapat menjelaskan dan menguji penelusuran jalur.
- [ ] Saya tahu kapan memakai `localhost` dan kapan jaringan lab, dan apa yang tidak boleh disajikan.

## Kunci dan petunjuk

**Ingat kembali.** 1: 2xx sukses (200), 3xx pengalihan (301), 4xx salah di sisi permintaan (404), 5xx galat di server (500). 2: data luar bisa tidak seperti dokumentasi atau berubah kapan saja; tanpa pemeriksaan, galat muncul jauh dari sumbernya. 3: data di memori hilang; saat dinyalakan, server memuat berkas dengan `muat` dan memeriksa isinya dengan skema.

**Prediksi dulu.** 1: tiga baris seperti di bagian contoh. 2: `join` hanya menempelkan teks; `..` baru dilipat oleh `resolve`, jadi baru setelah itu jalur sebenarnya diketahui dan dapat dibandingkan dengan akar.

**Contoh setengah jadi.** Kunci: `"/"` dan `403`. Tanpa garis miring, jalur `/situs-lama/x.txt` menghasilkan berkas `.../situs-lama/x.txt` yang diawali teks `.../situs`, sehingga `startsWith(akar)` bernilai benar dan folder tetangga ikut bisa dibaca; dengan `akar + "/"` ia ditolak.

**Soal Parsons.** Urutan: `async fetch(req) {`, `const jalur = ...;`, `const berkas = ...;`, `if (!berkas.startsWith(...)) ... 403`, `const isi = Bun.file(berkas);`, `if (!(await isi.exists())) ... 404`, `return new Response(isi);`, `},`. Baris `return new Response("kosong");` tidak terpakai. Kunci dijalankan penyusun dari folder yang berisi `situs/index.html`:

```ts
import { join, resolve } from "node:path";

const akar = resolve("situs");

const server = Bun.serve({
  port: 0,
  hostname: "localhost",
  async fetch(req) {
    const jalur = decodeURIComponent(new URL(req.url).pathname);
    const berkas = resolve(join(akar, jalur));
    if (!berkas.startsWith(akar + "/")) return new Response("ditolak", { status: 403 });
    const isi = Bun.file(berkas);
    if (!(await isi.exists())) return new Response("tidak ada", { status: 404 });
    return new Response(isi);
  },
});

for (const jalur of ["/index.html", "/hilang.html", "/..%2Frahasia.txt"]) {
  const respons = await fetch(`http://localhost:${server.port}${jalur}`);
  console.log(jalur, respons.status);
}
await server.stop(true);
```

```text
/index.html 200
/hilang.html 404
/..%2Frahasia.txt 403
```

**Latihan.** 1: `/rahasia.txt`: `URL` melipat `..` sendiri, tetapi sandi `%2F` baru terurai setelah `decodeURIComponent`, jadi penjaga tetap diperlukan (dijalankan penyusun). 2: contoh: baca `Bun.file("situs/404.html")` dan kembalikan `new Response(halaman404, { status: 404, headers: { "Content-Type": "text/html; charset=utf-8" } })`; `curl -i` harus menampilkan `404 Not Found` dengan isi `404.html`. 3: `localhost` memberi pendengar `127.0.0.1:3300`, `0.0.0.0` memberi `0.0.0.0:3300` (dijalankan penyusun); dua hal yang dipastikan: izin guru dan jaringan lab (bukan umum), serta folder tidak berisi berkas pribadi atau rahasia. 4: aman: `index.html` dan `app.js`. Keluarkan `.env` (rahasia), `catatan-guru.txt` (bukan untuk publik), dan `app.js.map` bila memuat kode sumber yang tidak ingin kamu bagikan. 5: tidak ada kunci tunggal.

**Latihan bercampur.** 1: kedua pilihan dapat dibenarkan; 403 memberi tahu bahwa jalurnya terlarang, sedangkan 404 menyembunyikan apakah sesuatu ada di sana. Kuncinya konsisten dan jangan membocorkan detail di pesan galat. 2: anggap `.env` sudah terbaca orang di jaringan lab: hentikan server, keluarkan `.env`, cabut dan ganti rahasianya, lalu beri tahu gurumu.

**Ulang berjarak.** 1: `..` dan sandi seperti `%2F` bisa membawa jalur keluar dari folder; setelah jalur diselesaikan, pemeriksaan membuktikan ia masih di dalam folder situs. 2: boleh: berkas yang memang publik (HTML, CSS, JavaScript, gambar); tidak boleh: `.env`, kunci, data pribadi, folder `.git`, dan catatan internal. 3: `bun build` menggabungkan dan mengubah `src/app.ts` menjadi JavaScript biasa di folder `situs`; peramban tidak menjalankan TypeScript.

## Langkah berikutnya

Modul berikut: `b-xi2-m13` (proyek aplikasi data), tempat server, data, dan keamanan dipakai bersama. Modul terkait: `cloud-konsep-dasar` dan `cloud-deploy-sederhana` bila ingin tahu penerbitan sungguhan (pengayaan, dengan arahan guru). Bacaan lanjut: dokumentasi Bun tentang *bundler* dan `Bun.file`, serta dokumentasi Node.js tentang modul `path`.
