## Untuk siapa modul ini

Modul ini untuk murid kelas XI jalur B (Web dengan JavaScript, TypeScript, dan Bun), minggu `B-XI2-M11` silabus v1.4.1: jaringan, yaitu HTTP dan pemecahan masalah. Prasyarat: modul `b-xi2-m10` dan fondasi `FND-X1-M4` dan `FND-X1-M5` (konsep jaringan dan diagnosis dasar).

Modul ini karangan penyusun dan disetujui pemilik program pada 2026-11-20 (keputusan lewat dialog; catatan tinjauan menjadi tindak lanjut revisi). Butir `F-BK-d` (jaringan) hanya didukung sebagian oleh jalur ini: modul ini hanya mendukung sebagian butir itu, yaitu pengiriman data HTTP, dan belum dihitung memenuhinya. Pendalaman model dan lapisan jaringan ada di `pendamping-model-jaringan-dan-troubleshooting`.

Contoh dijalankan penyusun dengan Bun 1.4.4 per 2026-11, `curl`, dan Chrome tanpa kepala, seluruhnya di `localhost`. Tangkapan layar DevTools tidak disertakan; langkahnya mengikuti dokumentasi resmi dan tampilannya bisa berbeda di versi peramban lain. Tugas baca-dan-prediksi `AI: tanpa AI`; selain itu AI boleh dipakai dengan etika dan dicatat, tanpa data pribadi atau rahasia pada permintaanmu.

## Ingat kembali

Jawab dari ingatan dulu, baru cek di bagian kunci. Soal 1 dari `b-xi2-m10`, soal 2 dari `b-xi2-m8`, soal 3 dari `b-xi2-m3`.

1. Apa itu XSS, dan apa dua cara mencegahnya?
2. Mengapa prediksi diuji pada data yang tidak dipakai menyusunnya?
3. Apa kode status yang tepat untuk badan permintaan yang tidak lolos skema, dan apa yang sebaiknya dimuat di badan balasan?

## Tujuan

Setelah modul ini kamu dapat:

- membaca permintaan dan respons HTTP: metode, jalur, parameter, kode status, dan header;
- mengelompokkan kode status dan menghubungkannya dengan penyebab yang mungkin;
- membedakan "tidak tersambung", "waktu habis", dan "tersambung tetapi ditolak";
- memakai `curl` dan DevTools peramban untuk mendiagnosis permintaan gagal (keluaran minggu ini: catatan jaringan).

## Prediksi dulu

Ini tugas baca-dan-prediksi, `AI: tanpa AI`. **Tebak dulu, tulis jawabanmu, baru jalankan.**

```ts
const r = new Request("http://localhost:3000/tugas?id=7", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: '{"judul":"belajar"}',
});
const u = new URL(r.url);
console.log(r.method, u.pathname, u.searchParams.get("id"), r.headers.get("content-type"));
```

1. Apa yang tercetak, dan bagian alamat mana yang menjadi jalur dan mana yang menjadi parameter?
2. Bagian mana dari permintaan itu yang berada di badan (body), bukan di alamat?

## Contoh terselesaikan

Keluaran program tadi:

```text
POST /tugas 7 application/json
```

Sebuah **permintaan HTTP** memuat metode (`GET` untuk meminta, `POST` untuk mengirim), jalur, parameter, header, dan kadang badan. Sebuah **respons** memuat kode status, header, dan badan. Kode status dikelompokkan (MDN): 2xx sukses, 3xx pengalihan, 4xx kesalahan di sisi permintaan, 5xx kesalahan di sisi server. Mendiagnosis berarti mengurutkan pertanyaan: apakah permintaan **sampai** ke server (tersambung?), apakah server **menjawab tepat waktu**, dan **apa isi jawabannya**.

Server latihan di bawah punya lima perilaku: sukses, pengalihan, tidak ada, bug (500), dan lambat. Bug dicatat di log server, tempat kamu membacanya.

```ts
Bun.serve({
  port: 3200,
  hostname: "localhost",
  async fetch(req) {
    const jalur = new URL(req.url).pathname;
    try {
      if (jalur === "/api/data") return Response.json([{ id: 1, judul: "contoh" }]);
      if (jalur === "/lama") return Response.redirect(new URL("/api/data", req.url), 301);
      if (jalur === "/rusak") throw new Error("bug di server");
      if (jalur === "/lambat") {
        await new Promise((selesai) => setTimeout(selesai, 1000));
        return Response.json([]);
      }
      return new Response("tidak ada", { status: 404 });
    } catch (galat) {
      console.error("galat server:", galat instanceof Error ? galat.message : galat);
      return new Response("galat server", { status: 500 });
    }
  },
});
console.log("server latihan di http://localhost:3200");
```

`curl -i` menampilkan baris status dan header. Baris `Date` dibuang dari tempelan di bawah karena berubah setiap saat:

```text
$ curl -s -i http://localhost:3200/api/data
HTTP/1.1 200 OK
Content-Type: application/json;charset=utf-8
Content-Length: 27

[{"id":1,"judul":"contoh"}]

$ curl -s -i http://localhost:3200/hilang
HTTP/1.1 404 Not Found
content-type: text/plain;charset=utf-8
Content-Length: 9

tidak ada

$ curl -s -i http://localhost:3200/lama
HTTP/1.1 301 Moved Permanently
Location: http://localhost:3200/api/data
Content-Length: 0
```

Sekarang diagnosis diotomatiskan: satu fungsi mengelompokkan status dan membedakan gagal tersambung dari waktu habis. Jalankan di terminal lain saat server latihan hidup:

```ts
function kelompok(status: number): string {
  if (status >= 200 && status < 300) return "sukses";
  if (status >= 300 && status < 400) return "pengalihan: periksa header Location";
  if (status >= 400 && status < 500) return "salah di sisi permintaan: periksa alamat dan isi permintaan";
  return "galat di server: baca log server";
}

async function diagnosa(url: string): Promise<string> {
  try {
    const respons = await fetch(url, { signal: AbortSignal.timeout(300), redirect: "manual" });
    const lokasi = respons.headers.get("location");
    return `${respons.status} ${kelompok(respons.status)}${lokasi ? ` -> ${lokasi}` : ""}`;
  } catch (galat) {
    if (galat instanceof Error && galat.name === "TimeoutError") {
      return "waktu habis: server lambat atau macet";
    }
    return "tidak tersambung: server mati, atau alamat atau port salah";
  }
}

const dasar = "http://localhost:3200";
for (const jalur of ["/api/data", "/lama", "/hilang", "/rusak", "/lambat"]) {
  console.log(jalur.padEnd(10), await diagnosa(dasar + jalur));
}
console.log("port 3299".padEnd(10), await diagnosa("http://localhost:3299/api/data"));
```

```text
/api/data  200 sukses
/lama      301 pengalihan: periksa header Location -> http://localhost:3200/api/data
/hilang    404 salah di sisi permintaan: periksa alamat dan isi permintaan
/rusak     500 galat di server: baca log server
/lambat    waktu habis: server lambat atau macet
port 3299  tidak tersambung: server mati, atau alamat atau port salah
```

Log server mencetak `galat server: bug di server` untuk jalur `/rusak`. Perhatikan urutan: "tidak tersambung" dan "waktu habis" adalah **galat jaringan** (tidak ada respons), sedangkan 404 dan 500 adalah **respons yang sah** dari server yang hidup.

**DevTools.** Di Chrome atau peramban sejenis, buka DevTools (F12), tab **Network**, muat ulang halaman, lalu klik satu baris permintaan. Kolom Status, Type, Initiator, Size, dan Time (dokumentasi Chrome DevTools) memperlihatkan tiap permintaan beserta kodenya; tab **Headers**, **Preview** atau **Response**, dan **Timing** menunjukkan header, isi, dan lamanya. Tab **Console** memuat galat skrip. Sebelum membagikan tangkapan layar atau berkas HAR kepada orang lain, **hapus header `Cookie` dan `Authorization`** karena memuat identitas dan token.

**Galat lintas asal (CORS).** Halaman dari `localhost:3201` memanggil API di `localhost:3202`: asal berbeda karena port berbeda. Penyusun membuka halamannya di Chrome tanpa kepala. Saat API tidak mengirim header izin, halaman menampilkan `Gagal: TypeError`, padahal log API menunjukkan permintaannya **sampai** (`API menerima GET /api/data`): peramban yang menahan pembacaan jawabannya. Setelah API mengirim `Access-Control-Allow-Origin: http://localhost:3201`, halaman menampilkan `Berhasil: 1 data`. `curl` tidak terkena aturan ini karena aturannya milik peramban. Jadi galat CORS dibaca di Console peramban, dan diperbaiki di sisi server (MDN).

## Contoh setengah jadi

Lengkapi fungsi pengelompok status (kunci di bawah):

```ts setengah-jadi
function kelompok(status: number): string {
  if (status >= 200 && status < ____) return "sukses";
  if (status >= 400 && status < ____) return "salah di sisi permintaan";
  return "galat di server";
}
console.log(kelompok(204), kelompok(404), kelompok(503));
```

Apa yang tercetak untuk `kelompok(302)`, dan mengapa itu menyesatkan?

## Soal Parsons

Susun baris berikut menjadi `diagnosa` versi ringkas yang benar (kunci di bawah). Satu baris tidak terpakai.

```text
    return "tidak tersambung";
  } catch {
  try {
async function diagnosa(url: string): Promise<string> {
    return respons.ok ? "sukses" : `gagal ${respons.status}`;
    const respons = await fetch(url, { signal: AbortSignal.timeout(300) });
  }
}
    respons.close();
```

## Latihan

1. `AI: tanpa AI` Tebak apa yang dicetak `new URL("http://localhost:3000/cari?kata=web&hal=2").searchParams.get("hal")`, lalu jalankan.
2. `AI: boleh` Tambahkan jalur `/dilarang` yang menjawab 403 pada server latihan dan jalur `/terlalu-sering` yang menjawab 429. Jalankan `diagnosa` untuk keduanya dan jelaskan kelompoknya.
3. `AI: boleh` Tulis lima langkah diagnosis untuk keluhan "daftar tugas tidak muncul di halaman", mulai dari tab Network: apa yang kamu cek, urutannya, dan apa arti tiap hasil yang mungkin (tidak ada permintaan, 404, 500, 200 tetapi kosong).
4. `AI: tanpa AI` Mengapa galat CORS tidak muncul saat memakai `curl`, dan di sisi mana perbaikannya dilakukan?
5. `AI: boleh` (opsional) Catatan pemakaian AI: alat, tujuan, garis besar perintah, bagian yang dipakai, dan cara memeriksanya.

## Latihan bercampur

1. `AI: boleh` (dari `b-xi2-m9`) Server yang lambat membuat `fetch` menolak dengan `TimeoutError`. Di sisi mana kamu memasang batas waktu, dan mengapa itu bukan tanda server "rusak"?
2. `AI: boleh` (dari `b-xi2-m10`) Header `Authorization` berisi token palsu `TOKEN_PALSU_CONTOH` terlihat di tab Network. Apa yang kamu lakukan sebelum membagikan tangkapan layar ke teman atau asisten AI?

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `b-xi2-m12` (pertanyaan 1), sekitar tiga minggu lagi di `b-xi2-m14` (pertanyaan 2), dan sekitar delapan minggu lagi di semester berikutnya, modul `b-xii1-m5` (pertanyaan 3). Jawab sekarang lalu simpan.

1. Apa arti kelompok status 2xx, 3xx, 4xx, dan 5xx, dengan satu contoh tiap kelompok?
2. Apa beda "tidak tersambung" dengan status 404 saat mendiagnosis, dan apa yang dicek pertama untuk masing-masing?
3. Mengapa tangkapan layar atau berkas HAR dari tab Network disaring dulu sebelum dibagikan?

## Kesalahan umum

- **Menganggap 404 berarti server mati.** Server yang menjawab 404 hidup; yang salah alamat atau jalurnya.
- **Mencari bug di kode klien padahal server menjawab 500.** Bacalah log server dulu.
- **Menganggap galat CORS sebagai server mati.** Permintaan sampai; peramban menahan jawabannya.
- **Hanya melihat tab Console.** Tab Network menunjukkan status, header, dan waktu permintaan.
- **Membagikan HAR atau tangkapan layar apa adanya.** Token dan cookie ikut bocor.
- **Mengubah banyak hal sekaligus saat memperbaiki.** Ubah satu hal, uji ulang, baru lanjut.

## Cek mandiri

- [ ] Saya dapat membaca metode, jalur, parameter, status, dan header dari sebuah permintaan.
- [ ] Saya dapat mengelompokkan status 2xx sampai 5xx dan menyebut penyebab khasnya.
- [ ] Saya dapat membedakan galat jaringan (tidak tersambung, waktu habis) dari respons 4xx dan 5xx.
- [ ] Saya dapat memakai `curl` dan tab Network untuk mencari penyebab permintaan gagal.
- [ ] Saya tahu menyaring token dan cookie sebelum membagikan tangkapan.

## Kunci dan petunjuk

**Ingat kembali.** 1: XSS menyisipkan skrip lewat teks yang tidak di-escape; cegah dengan meng-escape keluaran dan memakai `textContent`. 2: galat pada data penyusun terlalu optimistis; data yang disembunyikan menunjukkan seberapa meleset prediksi pada hal yang belum dilihat. 3: 400 (kesalahan klien), dengan badan yang menyebut bidang dan pesannya agar klien bisa memperbaiki, tanpa membocorkan rincian internal server.

**Prediksi dulu.** 1: `POST /tugas 7 application/json`; jalurnya `/tugas`, parameternya `id=7` (setelah tanda tanya). 2: `{"judul":"belajar"}` berada di badan.

**Contoh setengah jadi.** Kunci: `300` dan `500`. Dijalankan penyusun:

```ts
function kelompok(status: number): string {
  if (status >= 200 && status < 300) return "sukses";
  if (status >= 400 && status < 500) return "salah di sisi permintaan";
  return "galat di server";
}
console.log(kelompok(204), kelompok(404), kelompok(503));
```

```text
sukses salah di sisi permintaan galat di server
```

`kelompok(302)` mencetak `galat di server` karena versi ringkas ini tidak punya kelompok 3xx: status 302 (pengalihan) salah dikelompokkan. Itu sebabnya `kelompok` penuh di contoh punya kelompok 3xx sendiri.

**Soal Parsons.** Urutan: `async function diagnosa...{`, `try {`, `const respons = await fetch(...)`, `return respons.ok ? ...`, `} catch {`, `return "tidak tersambung";`, `}`, `}`. Baris `respons.close();` tidak terpakai karena `Response` tidak punya metode itu. Kunci dijalankan penyusun dengan server latihan hidup:

```ts
async function diagnosa(url: string): Promise<string> {
  try {
    const respons = await fetch(url, { signal: AbortSignal.timeout(300) });
    return respons.ok ? "sukses" : `gagal ${respons.status}`;
  } catch {
    return "tidak tersambung";
  }
}
console.log(await diagnosa("http://localhost:3200/api/data"));
console.log(await diagnosa("http://localhost:3200/hilang"));
console.log(await diagnosa("http://localhost:3299/"));
```

```text
sukses
gagal 404
tidak tersambung
```

**Latihan.** 1: `2` (teks, bukan angka; `searchParams.get` selalu memberi teks atau `null`). 2: `/dilarang` memberi `403` kelompok "salah di sisi permintaan" dan `/terlalu-sering` memberi `429` dengan kelompok yang sama: keduanya kesalahan di sisi permintaan (tidak berhak atau terlalu sering meminta), bukan bug server. 3: contoh langkah: (1) buka Network dan muat ulang; (2) tidak ada permintaan: kode klien tidak memanggil `fetch`, cek Console; (3) status 404: alamat atau jalur salah, bandingkan dengan rute server; (4) status 500: baca log server; (5) status 200 tetapi kosong: lihat tab Response, mungkin datanya memang kosong atau bentuknya tidak sesuai harapan klien. 4: `curl` bukan peramban dan tidak menerapkan aturan lintas asal; perbaikannya di server, yang mengirim `Access-Control-Allow-Origin` untuk asal yang diizinkan. 5: tidak ada kunci tunggal.

**Latihan bercampur.** 1: batas waktu dipasang di sisi klien (`AbortSignal.timeout`) agar programmu tidak menggantung; server yang lambat belum tentu rusak, bisa sibuk atau jaringannya padat, jadi bedakan dari status 500 yang berarti server menjawab dengan galat. 2: hapus atau tutupi header `Authorization` dan `Cookie`, atau bagikan hanya bagian yang perlu; token yang sempat terbagikan dianggap bocor dan diganti.

**Ulang berjarak.** 1: 2xx sukses (200), 3xx pengalihan (301), 4xx salah di sisi permintaan (404), 5xx galat di server (500). 2: "tidak tersambung" berarti tidak ada respons sama sekali: cek server hidup, alamat, dan port; 404 berarti server hidup tetapi jalur tidak dikenal: cek ejaan jalur dan rute. 3: header `Authorization` dan `Cookie` memuat token dan identitas yang bisa dipakai orang lain untuk menyamar sebagai kamu.

## Langkah berikutnya

Modul berikut: `b-xi2-m12` (penyajian statis, opsional), tempat server latihan melayani berkas situs. Modul terkait: `pendamping-model-jaringan-dan-troubleshooting` dan `pendamping-keamanan-lanjut-konektivitas`. Bacaan lanjut: halaman MDN tentang gambaran umum HTTP, kode status HTTP, dan CORS, serta dokumentasi Chrome DevTools tentang tab Network.
