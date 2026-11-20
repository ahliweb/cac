## Untuk siapa modul ini

Modul ini untuk murid kelas XII jalur B (Web dengan JavaScript, TypeScript, dan Bun), minggu `B-XII2-M5` silabus v1.4.1: sprint 2, fitur sesuai profil `landing`. Dikerjakan berkelompok dua sampai tiga orang. Prasyarat: modul `b-xii2-m4` (tampilan tahap 1).

Modul ini berstatus DRAF: karangan penyusun, belum ditinjau pemilik. Silabus memetakan butir `F-BK-a` dan `F-LD-f` pada minggu ini; modul draf ini belum dihitung memenuhi keduanya. Keluaran minggu ini: fitur tahap 2.

**Batas modul ini.** Fitur di sini berarti **fitur yang sudah disediakan profil `landing` dan diisi lewat konten**, ditambah satu prototipe terpisah yang berjalan di `localhost`. Kamu tidak menambah kode ke storefront dan tidak menyentuh backend. Formulir prototipe **tidak menyimpan dan tidak mengirim data pribadi nyata**: hanya data karangan. Contoh dijalankan dengan Bun 1.4.4 per 2026-11 pada salinan `awcms-one` 0.20.0. Tugas prediksi `AI: tanpa AI`; selain itu AI boleh dipakai dengan etika dan dicatat, tanpa data pribadi atau rahasia.

## Ingat kembali

Jawab dari ingatan dulu, baru cek di bagian kunci. Soal 1 dari `b-xii2-m4`, soal 2 dari `b-xii2-m2`, soal 3 dari `b-xii1-m11`.

1. Dari mana warna tema berasal pada build tanpa CMS, dan perintah apa mengubahnya?
2. Mengapa rancangan mencatat halaman bawaan (`/` dan `/kontak`) yang isinya tidak kamu tulis sendiri?
3. Apa tiga hal yang harus ada pada atribusi konten berlisensi CC BY 4.0?

## Tujuan

Setelah modul ini kamu dapat:

- menyebut fitur apa yang sudah dimiliki halaman kontak profil `landing` dan data siapa yang mengisinya;
- mengisi fitur lewat konten dan memeriksa hasilnya di build;
- membuat formulir kontak prototipe yang memvalidasi masukan dan tidak menyimpan apa pun;
- menjelaskan mengapa prototipe itu belum dipasang pada situs (keluaran minggu ini: fitur tahap 2).

## Rencana sprint

Sprint ini menjawab K2 dan K3 lebih jauh. Dari kode halaman kontak (`apps/storefront/src/pages/kontak.astro`) dan hasil build: kartu alamat, telepon (`tel:`), dan surel (`mailto:`) dari profil situs; tombol "Kirim E-mail" dan "Chat WhatsApp" (tombol kedua muncul hanya bila `whatsappNumber` terisi); peta (hanya untuk alamat peta Google yang sah; tidak dipakai di kelas ini); dan daftar pertanyaan (FAQ) berbentuk elemen `<details>`. **Tidak ada formulir.** FAQ berasal dari pengaturan toko di CMS, bukan dari berkas seed, jadi di CMS lab yang memasukkannya adalah guru (`[belum terverifikasi]`: penyusun tidak menjalankan CMS). Murid menulis isi FAQ di berkas latihan; untuk pratinjau, `pratinjau.ts` dari `b-xii2-m3` menyalinnya ke berkas uji tiruan.

Tulis prediksimu: dari tiga pertanyaan berikut, apa kebutuhan yang dilayani masing-masing, dan adakah yang melanggar lingkup?

```json
[
  { "question": "Berapa buku yang boleh dipinjam?", "answer": "Paling banyak tiga buku selama empat belas hari." },
  { "question": "Apakah perlu kartu anggota?", "answer": "Ya, bawa kartu anggota contoh milikmu saat meminjam." },
  { "question": "Apakah meminjam dipungut biaya?", "answer": "Tidak. Perpustakaan fiktif ini tidak memungut biaya." }
]
```

Setelah `bun pratinjau.ts` dan build, halaman `/kontak` memuat:

```text
<summary>Berapa buku yang boleh dipinjam?</summary>
<summary>Apakah perlu kartu anggota?</summary>
<summary>Apakah meminjam dipungut biaya?</summary>
```

Hal yang mudah terlewat: tanpa mengganti pengaturan toko tiruan, `/kontak` menampilkan FAQ milik **tiruan uji** (tentang pemesanan produk). Penyusun menemukannya saat membuka hasil build pertama dan menyesuaikan berkas pratinjau; di CMS lab pemeriksaannya sama: buka `/kontak` dan baca teks yang benar-benar tampil.

**Formulir kontak (prototipe).** Silabus meminta latihan formulir kontak tanpa menyimpan data pribadi nyata. Storefront `landing` tidak punya formulir dan membuatnya berarti menambah kode di luar lingkup, jadi prototipe ini berdiri sendiri: peladen `localhost` yang memeriksa masukan lalu membuangnya. Aturannya: batas panjang, bentuk surel sederhana, kolom jebakan (*honeypot*) yang harus kosong, tidak ada penyimpanan, dan log tidak memuat isi pesan.

```ts
type Pesan = { nama?: unknown; surel?: unknown; pesan?: unknown; situs?: unknown };

export function periksaPesan(data: Pesan): string[] {
  const galat: string[] = [];
  const teks = (v: unknown) => (typeof v === "string" ? v.trim() : "");
  if (teks(data.nama).length < 1 || teks(data.nama).length > 60) galat.push("nama: 1 sampai 60 karakter");
  if (!/^[^@\s]+@[^@\s]+\.[a-z]{2,}$/i.test(teks(data.surel))) galat.push("surel: bentuk tidak sah");
  if (teks(data.pesan).length < 10 || teks(data.pesan).length > 500) galat.push("pesan: 10 sampai 500 karakter");
  if (teks(data.situs) !== "") galat.push("kolom jebakan terisi");
  return galat;
}

const server = Bun.serve({
  hostname: "localhost",
  port: 0,
  async fetch(req) {
    const url = new URL(req.url);
    if (req.method !== "POST" || url.pathname !== "/kirim") return new Response("tidak ditemukan", { status: 404 });
    let data: Pesan;
    try {
      data = (await req.json()) as Pesan;
    } catch {
      return Response.json({ galat: ["isi bukan JSON"] }, { status: 400 });
    }
    const galat = periksaPesan(data);
    console.log(`permintaan: ${galat.length === 0 ? "diterima" : `ditolak (${galat.length} galat)`}`);
    if (galat.length > 0) return Response.json({ galat }, { status: 422 });
    return Response.json({ pesan: "diterima, tidak disimpan" }, { status: 200 });
  },
});

const alamat = `http://localhost:${server.port}/kirim`;
const kirim = (isi: object) =>
  fetch(alamat, { method: "POST", body: JSON.stringify(isi) }).then(async (r) => `${r.status} ${JSON.stringify(await r.json())}`);

console.log(await kirim({ nama: "Tamu Contoh", surel: "tamu@example.org", pesan: "Apakah hari Sabtu buka sampai sore?" }));
console.log(await kirim({ nama: "", surel: "bukan-surel", pesan: "pendek" }));
console.log(await kirim({ nama: "Robot Contoh", surel: "robot@example.org", pesan: "Pesan otomatis untuk uji.", situs: "x" }));
server.stop();
```

Prediksimu: status apa untuk permintaan kedua dan ketiga? Dijalankan dengan `bun run formulir-lokal.ts`:

```text
permintaan: diterima
200 {"pesan":"diterima, tidak disimpan"}
permintaan: ditolak (3 galat)
422 {"galat":["nama: 1 sampai 60 karakter","surel: bentuk tidak sah","pesan: 10 sampai 500 karakter"]}
permintaan: ditolak (1 galat)
422 {"galat":["kolom jebakan terisi"]}
```

Prototipe ini baru memeriksa bentuk; ia tidak membuktikan perlindungan dari penyalahgunaan (pembatasan laju, CSRF, pengiriman surel).

## Daftar periksa

- [ ] Prediksi kebutuhan per pertanyaan FAQ tertulis sebelum build.
- [ ] Setiap fitur menunjuk kebutuhan K di dokumen kebutuhan; tidak ada fitur tanpa alasan.
- [ ] `/kontak` dibuka dan dibaca; tidak ada teks sisa tiruan uji atau template.
- [ ] Formulir prototipe hanya jalan di `localhost`, tidak menyimpan, dan tidak mencatat isi pesan.
- [ ] Fitur di luar lingkup dicatat sebagai usulan, bukan dikerjakan.
- [ ] Bila memakai AI: log pemakaian, tanpa data pribadi.

## Umpan balik sejawat

Tukar fitur dengan kelompok lain; ulasan: **satu yang sudah baik, satu yang perlu diperbaiki, satu langkah berikutnya**. Coba tiga masukan pada prototipe temanmu: sah, kosong, dan terlalu panjang. Periksa: apakah galat menjelaskan yang salah tanpa membocorkan isi.

## Latihan bercampur

1. `AI: boleh` (dari `b-xii1-m11`) Tambahkan satu pertanyaan FAQ yang mengutip sumber lisensi dan tulis atribusinya. Dokumen mana yang ikut berubah?
2. `AI: tanpa AI` (dari `b-xii2-m3`) Surel apa yang kamu pakai pada data uji formulir, dan mengapa `.example` saja tidak cukup bila datanya masuk berkas seed?

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `b-xii2-m6` (pertanyaan 1), sekitar tiga minggu lagi di `b-xii2-m8` (pertanyaan 2), dan sekitar delapan minggu lagi di `b-xii2-m13` (pertanyaan 3). Jawab sekarang lalu simpan.

1. Mengapa prototipe formulir tidak mencatat isi pesan di log dan tidak menyimpannya?
2. Mengapa FAQ tidak ada di berkas seed, dan siapa yang mengisinya di CMS lab?
3. Apa yang kamu catat tentang fitur yang tidak dikerjakan karena di luar lingkup?

## Kesalahan umum

- **Menganggap formulir bagian dari profil `landing`.** Halaman kontaknya tidak punya formulir.
- **Mencatat isi pesan di log.** Log mudah bocor; catat jumlah dan hasilnya saja.
- **Membiarkan data tiruan uji tampil.** Baca `/kontak` setelah build.
- **Mengira validasi bentuk sama dengan keamanan.**
- **Memasang prototipe ke jaringan.** Hanya `localhost`.

## Cek mandiri

- [ ] Saya dapat menyebut fitur halaman kontak dan sumber datanya.
- [ ] Saya dapat mengisi FAQ dan memeriksa hasilnya.
- [ ] Saya dapat menjalankan dan menguji formulir prototipe.
- [ ] Saya dapat menjelaskan mengapa prototipe belum dipasang.
- [ ] Saya meninjau fitur teman dengan temuan, alasan, dan saran.

## Kunci dan petunjuk

**Ingat kembali.** 1: dari `DEFAULT_THEME_COLORS` di `site.ts` (ditulis `template:init`); diubah dengan `--warna-primer` (dan `--warna-sekunder`, `--warna-aksen`). 2: karena batas dan tampilannya sudah ditentukan kode; rancanganmu hanya bisa mengisi yang boleh diisi (tagline, halaman CMS, kontak). 3: kredit yang pantas (pencipta dan sumber), tautan ke lisensinya, dan pernyataan bila ada perubahan.

**Rencana sprint.** Prediksi: contoh jawaban: pertanyaan 1 dan 2 melayani K2 (cara pinjam), pertanyaan 3 melayani pertanyaan umum; tidak ada yang melanggar lingkup karena hanya teks. Keluaran dijalankan penyusun. Rincian formulir: permintaan kedua berstatus 422 dengan tiga galat (nama kosong, surel tidak sah, pesan pendek); permintaan ketiga 422 dengan satu galat (kolom jebakan terisi). Kolom jebakan ditaruh di formulir tetapi disembunyikan dari pengguna; robot sering mengisi semua kolom.

**Latihan bercampur.** 1: contoh: pertanyaan "Apakah gambar sampul boleh dipakai ulang?" dengan jawaban yang menyebut pencipta, sumber, lisensi, dan tautannya; yang ikut berubah: README atau halaman kredit, dan cerminnya bila ada. 2: `example.org` karena uji repositori hanya mengizinkan empat domain `example.*` pada berkas seed; `.example` cukup untuk teks latihan tetapi tidak lolos uji seed.

**Ulang berjarak.** 1: log mudah bocor atau dibaca orang lain, dan menyimpan data pribadi menambah kewajiban dan risiko; catat hanya jumlah dan hasil. 2: karena yang disemai hanya halaman dan profil; FAQ ada pada pengaturan toko CMS yang dikelola guru di CMS lab. 3: apa fiturnya, mengapa di luar lingkup, dan siapa atau apa yang diperlukan agar bisa dikerjakan (misalnya izin mengubah backend).

## Langkah berikutnya

Modul berikut: `b-xii2-m6` (sprint 2: pengujian). Bacaan lanjut: halaman MDN tentang `fetch` (Using Fetch) dan `Bun.serve` di dokumentasi Bun.
