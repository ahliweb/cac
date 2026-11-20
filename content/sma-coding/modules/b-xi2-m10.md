## Untuk siapa modul ini

Modul ini untuk murid kelas XI jalur B (Web dengan JavaScript, TypeScript, dan Bun), minggu `B-XI2-M10` silabus v1.4.1: keamanan aplikasi dan UU. Prasyarat: modul `b-xi2-m9` dan fondasi `FND-X1-M6`.

Modul ini karangan penyusun dan disetujui pemilik program pada 2026-11-20 (keputusan lewat dialog; catatan tinjauan menjadi tindak lanjut revisi). Butir `F-LD-g` (hukum) dipetakan silabus sebagai dipenuhi jalur ini dan `F-LD-e` (keamanan jaringan lanjut) hanya didukung sebagian; pemenuhan butir mengikuti pemetaan silabus, bukan status modul.

**Aturan keselamatan modul ini.** Kerentanan hanya diperlihatkan pada aplikasi latihan kecil di komputermu sendiri (`localhost`) dengan masukan sintetis. Jangan mencoba apa pun dari modul ini pada situs, aplikasi, atau jaringan milik orang lain, termasuk sekolah, tanpa izin tertulis pemiliknya. Semua "rahasia" di sini bernilai palsu (`KUNCI_PALSU_CONTOH`). Bagian hukum **bukan nasihat hukum**.

Contoh dijalankan penyusun dengan Bun 1.4.4 per 2026-11 dan Chrome tanpa kepala. Baca-dan-prediksi `AI: tanpa AI`; selain itu AI boleh dipakai dengan etika. **Jangan menempelkan rahasia atau data pribadi ke asisten AI.**

## Ingat kembali

Jawab dari ingatan dulu, baru cek di bagian kunci. Soal 1 dari `b-xi2-m9`, soal 2 dari `b-xi2-m7`, soal 3 dari `b-xi2-m2`.

1. Mengapa `await fetch(...)` yang berhasil belum berarti permintaan berhasil, dan apa yang harus diperiksa?
2. Mengapa teks dari data dilewatkan `esc` sebelum dimasukkan ke HTML?
3. Mengapa badan permintaan dari klien diperlakukan sebagai masukan yang belum dipercaya?

## Tujuan

Setelah modul ini kamu dapat:

- menjelaskan XSS dan mencegahnya dengan meng-escape keluaran atau memakai `textContent`;
- menyimpan rahasia di variabel lingkungan, menjaganya di luar repositori, dan menanganinya bila terlanjur bocor;
- menyebut pokok UU ITE (beserta perubahannya), ketentuan pidana siber dalam KUHP (UU 1/2023), dan UU PDP bagi pembuat aplikasi, beserta sumber resminya;
- memeriksa aplikasimu sendiri dengan lembar periksa (keluaran minggu ini).

## Prediksi dulu

Ini tugas baca-dan-prediksi, `AI: tanpa AI`. **Tebak dulu, tulis jawabanmu, baru jalankan.**

```ts
function escapeHtml(teks: string): string {
  return teks
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function rentan(nama: string): string {
  return `<h1>Halo, ${nama}</h1>`;
}

function aman(nama: string): string {
  return `<h1>Halo, ${escapeHtml(nama)}</h1>`;
}

console.log(rentan("<b>tebal</b>"));
console.log(aman("<b>tebal</b>"));
console.log(aman("Ani & Beni"));
```

1. Apa tiga baris yang tercetak?
2. Bila `nama` berasal dari kotak isian pengunjung, mana yang membiarkan HTML tersisip?

## Contoh terselesaikan

Keluaran program tadi:

```text
<h1>Halo, <b>tebal</b></h1>
<h1>Halo, &lt;b&gt;tebal&lt;/b&gt;</h1>
<h1>Halo, Ani &amp; Beni</h1>
```

**XSS** (*cross-site scripting*) terjadi bila teks dari luar dimasukkan ke halaman tanpa di-escape atau divalidasi, sehingga peramban menganggapnya bagian halaman dan menjalankannya (OWASP). Di `rentan`, `<b>tebal</b>` menjadi tebal; bila yang disisipkan skrip, skripnya jalan di peramban pengunjung. Penangkalnya: **perlakukan masukan sebagai teks**. Di server, escape keluaran seperti `aman`; di peramban, isi dengan `textContent` (bukan `innerHTML`), seperti di `b-xi2-m9`.

Peragaan di aplikasi latihan lokal; masukannya sintetis dan hanya mengganti judul tab.

```ts
function escapeHtml(teks: string): string {
  return teks
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function halaman(judul: string, isi: string): Response {
  const html = `<!doctype html><html lang="id"><head><meta charset="utf-8"><title>${judul}</title></head><body>${isi}</body></html>`;
  return new Response(html, { headers: { "Content-Type": "text/html; charset=utf-8" } });
}

Bun.serve({
  port: 3100,
  hostname: "localhost",
  fetch(req) {
    const url = new URL(req.url);
    const nama = url.searchParams.get("nama") ?? "tamu";
    if (url.pathname === "/rentan") return halaman("Sapa", `<h1>Halo, ${nama}</h1>`);
    if (url.pathname === "/aman") return halaman("Sapa", `<h1>Halo, ${escapeHtml(nama)}</h1>`);
    return new Response("tidak ada", { status: 404 });
  },
});
console.log("aplikasi latihan di http://localhost:3100");
```

Jalankan server di satu terminal dan program ini di terminal lain:

```ts
// Masukan sintetis: penanda tak berbahaya yang hanya mengganti judul tab.
const masukan = `<img src="x" onerror="document.title='XSS-LATIHAN'">`;
const q = encodeURIComponent(masukan);

for (const jalur of ["/rentan", "/aman"]) {
  const respons = await fetch(`http://localhost:3100${jalur}?nama=${q}`);
  const teks = await respons.text();
  console.log(jalur, "->", teks.slice(teks.indexOf("<h1>")));
}
```

```text
/rentan -> <h1>Halo, <img src="x" onerror="document.title='XSS-LATIHAN'"></h1></body></html>
/aman -> <h1>Halo, &lt;img src=&quot;x&quot; onerror=&quot;document.title=&#39;XSS-LATIHAN&#39;&quot;&gt;</h1></body></html>
```

Di Chrome tanpa kepala (`--dump-dom`), `/rentan` mengubah judul dokumen menjadi `XSS-LATIHAN` (skrip dari masukan berjalan), sedangkan `/aman` tetap berjudul `Sapa` dan menampilkan masukan sebagai teks.

**Rahasia di variabel lingkungan.** Kunci, kata sandi, dan token tidak ditulis di kode. Bun membaca berkas `.env` otomatis (dokumentasi Bun), dan kode membacanya lewat `process.env`. Di direktori latihan penyusun, `.env` berisi `KUNCI_PALSU_CONTOH=KUNCI_PALSU_CONTOH_12345`, dan `.env.example` (boleh ikut repositori) hanya berisi nilai penunjuk. Kodenya tidak mencetak rahasia, hanya membuktikannya terbaca:

```ts
const kunci = process.env.KUNCI_PALSU_CONTOH;
if (kunci === undefined) {
  console.log("kunci belum diisi: salin .env.example menjadi .env");
} else {
  console.log("kunci terbaca, panjang", kunci.length);
}
```

```text
kunci terbaca, panjang 24
```

Di repositori Git baru, tanpa `.gitignore` `git status --short` menampilkan `?? .env` (siap di-commit); setelah `echo ".env" > .gitignore`, `.env` tidak muncul lagi, dan `git check-ignore -v .env` menjawab `.gitignore:1:.env` diikuti `.env`. Setelah commit, `git ls-files` hanya memuat `.env.example`, `.gitignore`, dan `baca.ts`. Tanpa berkas `.env`, program mencetak pesan `kunci belum diisi: ...`. Bila rahasia nyata terlanjur ter-commit atau terunggah, anggap **sudah bocor**: cabut dan ganti rahasianya di penyedia, baru bereskan repositori karena menghapus commit saja tidak cukup.

**Pokok hukum.** Dibaca penyusun dari JDIH BPK (peraturan.bpk.go.id) pada 2026-11-20. Aturan bisa berubah dan diuji di pengadilan; periksa status terbaru sebelum mengutip.

| Peraturan | Pokok yang menyentuh pembuat aplikasi |
| --- | --- |
| UU 11/2008 tentang Informasi dan Transaksi Elektronik (diubah UU 19/2016 dan UU 1/2024) | Dasar hukum informasi dan transaksi elektronik. Halaman JDIH mencatat statusnya "dicabut sebagian" oleh UU 1/2023: Pasal 27 ayat (1) dan (3), 28 ayat (2), 30, 31 ayat (1) dan (2), 36, 45 ayat (1) dan (3), 45A ayat (2), 46, 47, dan 51 ayat (2). Pasal-pasal itu tidak lagi dikutip sebagai hukum yang berlaku. Penjelasan umum UU 1/2024 menyebut perubahan atas, antara lain, alat bukti elektronik, sertifikasi elektronik, perbuatan yang dilarang, dan peran Pemerintah; isinya tidak dibahas di sini. |
| UU 1/2023 tentang KUHP (berlaku 2 Januari 2026 menurut halaman JDIH) | Bagian "Tindak Pidana terhadap Informatika dan Elektronika". Pasal 332 ayat (1): dengan sengaja dan tanpa hak atau melawan hukum mengakses komputer dan/atau sistem elektronik milik orang lain dengan cara apa pun. Pasal 258 ayat (1): secara melawan hukum mendengarkan, merekam, atau mencatat transmisi informasi elektronik dan/atau dokumen elektronik yang tidak bersifat publik. |
| UU 27/2022 tentang Pelindungan Data Pribadi | Pasal 1 butir 1: data pribadi adalah data tentang orang perseorangan yang teridentifikasi atau dapat diidentifikasi. Pasal 4: data spesifik (antara lain kesehatan, biometrik, data anak) dan data umum (antara lain nama lengkap). Pasal 6 sampai 9: hak subjek data memperbaiki, mengakses salinan, mengakhiri atau menghapus, dan menarik persetujuan. Pasal 20 ayat (2): dasar pemrosesan, antara lain persetujuan yang sah secara eksplisit. Pasal 65 ayat (1) dan (2): larangan memperoleh, mengumpulkan, atau mengungkapkan data pribadi yang bukan miliknya secara melawan hukum. Pasal 2 ayat (2): tidak berlaku bagi pemrosesan oleh perseorangan dalam kegiatan pribadi atau rumah tangga. |

Artinya untuk pembuat aplikasi: **uji keamanan hanya pada milikmu sendiri atau dengan izin tertulis**; kumpulkan data pribadi sesedikit mungkin, dengan persetujuan jelas; jangan membuka atau menyebarkan data milik orang lain. Pasal lain, ancaman pidana, dan tafsirnya `[belum terverifikasi]`; tanyakan guru atau ahli hukum.

## Contoh setengah jadi

Lengkapi fungsi `escapeHtml` (kunci di bawah). Urutan penting: `&` diganti **lebih dulu**.

```ts setengah-jadi
function escapeHtml(teks: string): string {
  return teks
    .replaceAll("&", "____")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "____")
    .replaceAll('"', "&quot;");
}
console.log(escapeHtml("a < b & c"));
```

Mengapa `&` harus diganti paling awal?

## Soal Parsons

Susun baris berikut menjadi program pembaca rahasia yang benar (kunci di bawah). Satu baris tidak terpakai.

```text
console.log("kunci terbaca, panjang", kunci.length);
console.log(kunci);
} else {
const kunci = process.env.KUNCI_PALSU_CONTOH;
}
if (kunci === undefined) {
  console.log("kunci belum diisi: salin .env.example menjadi .env");
```

## Latihan

1. `AI: boleh` Tulis uji `bun test` untuk `escapeHtml` dengan tiga kasus: teks biasa tetap sama, `<` dan `>` diganti, dan `&` diganti sebelum yang lain (`"&lt;"` menjadi `"&amp;lt;"`).
2. `AI: boleh` Buat folder baru dengan Git, `.env` berisi `KUNCI_PALSU_CONTOH=...`, `.gitignore`, dan `.env.example`. Tunjukkan `git status --short` dan `git ls-files`. Jangan memakai kunci sungguhan dan jangan menempelkan `.env` ke AI.
3. `AI: tanpa AI` Tiga kasus karangan: (a) seseorang mencoba masuk ke server sekolah tanpa izin; (b) seorang murid mengumpulkan nama dan nomor telepon temannya untuk aplikasi tanpa memberi tahu mereka; (c) kamu menguji aplikasi latihanmu sendiri di `localhost`. Untuk tiap kasus, tuliskan pokok mana pada tabel yang menyentuhnya, atau tidak ada.
4. `AI: boleh` **Audit aplikasi sendiri.** Pilih satu aplikasi latihanmu dan isi lembar periksa: ada tempat teks luar masuk ke halaman? di-escape atau `textContent`? ada rahasia di kode atau repositori? `.env` di `.gitignore`? data pribadi apa yang dikumpulkan dan perlukah? Catat tiga temuan dan perbaikannya.
5. `AI: boleh` (opsional) Catatan pemakaian AI: alat, tujuan, garis besar perintah, bagian yang dipakai, cara memeriksanya, dan konfirmasi bahwa tidak ada rahasia di permintaanmu.

## Latihan bercampur

1. `AI: boleh` (dari `b-xi2-m9`) Halaman memuat daftar dari API luar dengan `li.innerHTML = h.name`. Apa risikonya bila penyedia API (atau pihak yang menyusup ke sana) mengirim nama berisi HTML, dan apa perbaikannya?
2. `AI: boleh` (dari `b-xi2-m8`) Dataset prediksi berisi kolom "nama murid". Apakah kolom itu perlu untuk meramal jumlah pengunjung? Kaitkan dengan pengumpulan data sesedikit mungkin.

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `b-xi2-m11` (pertanyaan 1), sekitar tiga minggu lagi di `b-xi2-m13` (pertanyaan 2), dan sekitar delapan minggu lagi di semester berikutnya, modul `b-xii1-m4` (pertanyaan 3). Jawab sekarang lalu simpan.

1. Apa itu XSS, dan apa dua cara mencegahnya?
2. Di mana rahasia disimpan agar tidak ikut ke repositori, dan apa yang dilakukan bila terlanjur ter-commit?
3. Mengapa menguji keamanan hanya pada aplikasi milik sendiri atau yang diizinkan tertulis, dan pokok hukum mana yang menjadi alasannya?

## Kesalahan umum

- **Menganggap kotak isian aman karena hanya teman yang memakainya.** Semua masukan diperlakukan sebagai teks.
- **Memakai `innerHTML` untuk teks biasa.** Pakai `textContent`.
- **Meng-escape di tempat yang salah.** Escape dilakukan saat menulis ke HTML, sesuai konteksnya (isi elemen, atribut, dan skrip berbeda); baca panduan OWASP.
- **Meng-commit `.env`, lalu "menghapusnya" di commit berikutnya.** Isinya tetap ada di riwayat: anggap bocor.
- **Mencetak rahasia ke `console.log` atau menempelkannya ke AI.** Cukup cetak status "terbaca".
- **Menyebut pasal dari ingatan.** Pasal bisa dicabut atau diubah; kutip dari sumber resmi yang dibuka.

## Cek mandiri

- [ ] Saya dapat menjelaskan XSS dan menunjukkan dua cara mencegahnya.
- [ ] Saya dapat menyimpan rahasia di `.env`, memasukkan `.env` ke `.gitignore`, dan memeriksanya dengan Git.
- [ ] Saya tahu langkah pertama bila rahasia terlanjur bocor.
- [ ] Saya dapat menyebut pokok UU ITE (beserta perubahannya), KUHP (UU 1/2023), dan UU PDP yang relevan, dan tahu bahwa tafsirnya bukan wewenang saya.
- [ ] Saya hanya menguji keamanan pada milik sendiri atau dengan izin tertulis.

## Kunci dan petunjuk

**Ingat kembali.** 1: `fetch` hanya menolak janji pada kegagalan jaringan atau batas waktu; status 404 atau 500 tetap selesai, jadi periksa `respons.ok`. 2: teks dari data bisa memuat `<` atau `&` yang dibaca peramban sebagai markah; `esc` mengubahnya menjadi teks biasa. 3: klien bisa mengirim apa saja (teks, tipe salah, ukuran besar), jadi server memeriksa tipe dan isinya sebelum memakainya.

**Prediksi dulu.** 1: tiga baris seperti di bagian contoh: `<h1>Halo, <b>tebal</b></h1>`, `<h1>Halo, &lt;b&gt;tebal&lt;/b&gt;</h1>`, dan `<h1>Halo, Ani &amp; Beni</h1>`. 2: `rentan`: masukan masuk apa adanya sebagai HTML.

**Contoh setengah jadi.** Kunci, dijalankan penyusun:

```ts
function escapeHtml(teks: string): string {
  return teks
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}
console.log(escapeHtml("a < b & c"));
```

```text
a &lt; b &amp; c
```

Bila `&` diganti belakangan, `&lt;` hasil penggantian `<` ikut diubah menjadi `&amp;lt;`, sehingga peramban menampilkan `&lt;` alih-alih `<`.

**Soal Parsons.** Urutan: `const kunci = ...;`, `if (kunci === undefined) {`, `console.log("kunci belum diisi ...");`, `} else {`, `console.log("kunci terbaca, panjang", kunci.length);`, `}`. Baris `console.log(kunci);` tidak terpakai dan **berbahaya** karena mencetak rahasia. Urutan ini sama dengan program di bagian contoh.

**Latihan.** 1: contoh uji, dijalankan penyusun dengan `bun test`:

```ts
import { expect, test } from "bun:test";

function escapeHtml(teks: string): string {
  return teks
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

test("teks biasa tetap sama", () => {
  expect(escapeHtml("halo dunia")).toBe("halo dunia");
});

test("kurung sudut diganti", () => {
  expect(escapeHtml("<b>")).toBe("&lt;b&gt;");
});

test("ampersand diganti lebih dulu", () => {
  expect(escapeHtml("&lt;")).toBe("&amp;lt;");
});
```

```text
bun test v1.4.4 (38afee6c8)

 3 pass
 0 fail
 3 expect() calls
Ran 3 tests across 1 file. [3.00ms]
```

2: urutan ada di contoh terselesaikan; `git status --short` tidak boleh menampilkan `.env`, dan `git ls-files` tidak boleh memuatnya. 3: (a) KUHP Pasal 332 ayat (1) menyentuh akses tanpa hak ke sistem elektronik milik orang lain; (b) UU PDP: mengumpulkan data pribadi (nama dan nomor telepon) memerlukan dasar yang sah seperti persetujuan (Pasal 20 ayat (2)); pengecualian untuk kegiatan pribadi atau rumah tangga (Pasal 2 ayat (2)) sempit dan tafsirnya `[belum terverifikasi]`, jadi minta persetujuan dan kumpulkan seperlunya; (c) tidak ada: sistemnya milikmu. Ini latihan mengenali pokok, bukan putusan hukum. 4: tidak ada kunci tunggal; temuan umum: `innerHTML` dengan data luar, `.env` belum di `.gitignore`, kolom data pribadi yang tidak dipakai. 5: tidak ada kunci tunggal.

**Latihan bercampur.** 1: HTML dari luar akan diurai dan dijalankan oleh peramban (XSS); ganti dengan `li.textContent = h.name`. Data dari layanan luar tidak lebih tepercaya daripada masukan pengunjung. 2: tidak perlu; ramalan hanya memakai jumlah per minggu. Hapus kolom nama sebelum data diproses atau disimpan; yang tidak dikumpulkan tidak bisa bocor.

**Ulang berjarak.** 1: XSS adalah menyisipkan skrip lewat teks yang tidak di-escape; cegah dengan meng-escape keluaran dan memakai `textContent`. 2: di `.env` yang masuk `.gitignore`; bila terlanjur ter-commit, anggap bocor, cabut dan ganti rahasianya, baru bereskan repositori. 3: Pasal 332 ayat (1) KUHP melarang mengakses sistem elektronik milik orang lain dengan sengaja tanpa hak atau melawan hukum; izin tertulis pemilik membuat pengujian sah, dan pasal hukum selalu dicek di sumber resmi.

## Langkah berikutnya

Modul berikut: `b-xi2-m11` (jaringan: HTTP dan pemecahan masalah). Modul terkait: `fondasi-keamanan-dasar` dan `pendamping-keamanan-lanjut-konektivitas` untuk mendalami keamanan jaringan. Bacaan lanjut: halaman OWASP tentang XSS, halaman MDN tentang `Element.innerHTML` dan `Node.textContent`, serta dokumentasi Bun tentang variabel lingkungan dan Git tentang `gitignore`.
