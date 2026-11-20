## Untuk siapa modul ini

Modul ini untuk murid kelas XII jalur B (Web dengan JavaScript, TypeScript, dan Bun), minggu `B-XII2-M5` silabus v1.4.1: sprint 2, fitur sesuai profil `landing`. Dikerjakan berkelompok dua sampai tiga orang. Prasyarat: modul `b-xii2-m4` (tampilan tahap 1).

Modul ini karangan penyusun dan disetujui pemilik program pada 2026-11-20 (keputusan lewat dialog; catatan tinjauan menjadi tindak lanjut revisi). Silabus memetakan butir `F-BK-a` dan `F-LD-f` pada minggu ini; pemenuhan butir mengikuti pemetaan silabus, bukan status modul. Keluaran minggu ini: fitur tahap 2.

**Batas modul ini.** Fitur di sini berarti fitur bawaan profil `landing` yang diisi lewat konten, ditambah satu yang kamu tulis sendiri: **formulir kontak di situsmu** (`apps/storefront/src/pages/kontak.astro`, repositori turunanmu). Backend tidak disentuh, dan formulir **tidak mengirim, menyimpan, atau mencatat data**: tidak ada `fetch`, `localStorage`, atau endpoint. Dijalankan penyusun 2026-11-20 dengan Bun 1.4.4 pada salinan `awcms-one` 0.20.0 hasil `template:init` (`b-xii1-m5`). Tugas prediksi `AI: tanpa AI`; selain itu AI boleh dipakai dengan etika dan dicatat, tanpa data pribadi atau rahasia.

**Cadangan tanpa Docker.** Modul ini bisa dikerjakan tanpa Docker, PostgreSQL, dan CMS memakai tiruan uji (perintah di `b-xii1-m4`). Batasnya: FAQ tidak bisa diisi lewat CMS dan teks halaman berasal dari data tiruan; pakai pratinjau `b-xii2-m3`. Formulir tidak butuh CMS.

## Ingat kembali

Jawab dari ingatan dulu, baru cek di bagian kunci. Soal 1 dari `b-xii2-m4`, soal 2 dari `b-xii2-m2`, soal 3 dari `b-xii1-m11`.

1. Dari mana warna tema berasal pada build tanpa CMS, dan perintah apa mengubahnya?
2. Mengapa rancangan mencatat halaman bawaan (`/` dan `/kontak`) yang isinya tidak kamu tulis sendiri?
3. Apa tiga hal yang harus ada pada atribusi konten berlisensi CC BY 4.0?

## Tujuan

Setelah modul ini kamu dapat:

- menyebut fitur halaman kontak `landing` dan sumber datanya;
- mengisi FAQ lewat konten dan memeriksanya di build;
- menambahkan formulir yang memvalidasi di peramban, aksesibel, dan tidak mengirim atau menyimpan;
- menjelaskan mengapa produk nyata butuh backend dan dasar hukum (keluaran: fitur tahap 2).

## Rencana sprint

Sprint ini menjawab K2 dan K3. Halaman kontak bawaan punya kartu alamat, telepon, dan surel, tombol "Kirim E-mail" dan "Chat WhatsApp" (hanya bila `whatsappNumber` terisi), peta, dan FAQ berbentuk `<details>`. **Bawaannya tidak ada formulir.** FAQ berasal dari pengaturan toko di CMS, bukan berkas seed, dan di CMS lab diisi guru (`[belum terverifikasi]`: penyusun tidak menjalankan CMS). Murid menulis FAQ di berkas latihan; `pratinjau.ts` (`b-xii2-m3`) menyalinnya ke uji tiruan.

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

Mudah terlewat: tanpa pratinjau, `/kontak` menampilkan FAQ **tiruan uji**; baca teks yang benar-benar tampil.

**Formulir kontak.** Ditambahkan ke halaman `/kontak` yang sudah ada. Aturannya fungsi murni sehingga bisa diuji tanpa peramban (`src/lib/formulir-kontak.ts`):

```ts
/**
 * Aturan formulir kontak latihan. Fungsi murni: tidak menyentuh DOM,
 * jaringan, atau penyimpanan, sehingga bisa diuji dengan `bun test`.
 */
export type PesanKontak = { nama?: unknown; surel?: unknown; pesan?: unknown; situs?: unknown };
export type Kolom = "nama" | "surel" | "pesan";
export type Galat = Partial<Record<Kolom, string>>;

const teks = (v: unknown): string => (typeof v === "string" ? v.trim() : "");

export function periksaPesan(data: PesanKontak): Galat {
  const galat: Galat = {};
  const nama = teks(data.nama);
  const pesan = teks(data.pesan);
  if (nama.length < 1 || nama.length > 60) galat.nama = "Nama diisi 1 sampai 60 karakter.";
  if (!/^[^@\s]+@[^@\s]+\.[a-z]{2,}$/i.test(teks(data.surel))) galat.surel = "Surel belum berbentuk nama@domain.tld.";
  if (pesan.length < 10 || pesan.length > 500) galat.pesan = "Pesan diisi 10 sampai 500 karakter.";
  return galat;
}

/** Kolom jebakan (honeypot): pengunjung manusia tidak melihatnya, robot sering mengisinya. */
export function terjebak(data: PesanKontak): boolean {
  return teks(data.situs) !== "";
}

console.log(periksaPesan({ nama: "Tamu Contoh", surel: "tamu@example.org", pesan: "Apakah hari Sabtu buka sampai sore?" }));
console.log(periksaPesan({ nama: "", surel: "bukan-surel", pesan: "pendek" }));
console.log(terjebak({ situs: "x" }));
```

Prediksi tiga baris keluarannya; hasil `bun run`:

```text
{}
{
  nama: "Nama diisi 1 sampai 60 karakter.",
  surel: "Surel belum berbentuk nama@domain.tld.",
  pesan: "Pesan diisi 10 sampai 500 karakter.",
}
true
```

Markup di `kontak.astro` sebelum peta; keputusan rancangannya:

| Keputusan | Alasan |
| --- | --- |
| `<label>` terhubung dan galat per kolom lewat `aria-describedby` | pembaca layar membaca galat bersama kolomnya |
| ringkasan `role="alert"`, konfirmasi `role="status"` | perubahan diumumkan tanpa mengambil fokus |
| `novalidate` | pesan galatmu yang tampil, bukan gelembung bawaan peramban |
| formulir `hidden`, dibuka JavaScript; `<noscript>` memberi tahu | tanpa JavaScript, kirim tanpa `action` memuat ulang halaman, dan `method="get"` memasukkan isian ke alamat |
| kolom jebakan, disingkirkan dengan `position: absolute; left: -10000px`, bukan `display: none` | robot sering mengisi semua kolom dan tetap menemukannya |
| gaya di berkas `src/styles/formulir-kontak.css`, skrip di berkas terpisah | CSP situs (`script-src 'self'`, `style-src 'self'`) memblokir yang sebaris |
| `textarea` diberi `height: auto` | bawaan situs menetapkan 42 piksel untuk semua kolom |
| uji membangun profil `landing` dan memeriksa berkas JavaScript formulir | membuktikan di hasil build bahwa tidak ada `fetch`, `XMLHttpRequest`, `sendBeacon`, `localStorage`, `sessionStorage`, atau `document.cookie` |

```html
<section class="formulir-kontak" aria-labelledby="judul-formulir">
  <h2 id="judul-formulir">Kirim pesan (latihan)</h2>
  <p>
    Formulir ini hanya latihan: isiannya diperiksa di peramban lalu dibuang. Tidak ada yang dikirim atau
    disimpan. Jangan isi data pribadi nyata.
  </p>
  <noscript><p>Formulir latihan membutuhkan JavaScript. Gunakan e-mail di atas.</p></noscript>
  <p class="formulir-ringkasan" data-formulir-ringkasan role="alert" hidden></p>
  <p class="formulir-konfirmasi" data-formulir-konfirmasi role="status" hidden></p>
  <form data-formulir-kontak novalidate hidden>
    <label class="field-label">Nama
      <input type="text" name="nama" autocomplete="off" aria-describedby="galat-nama" />
    </label>
    <p class="galat-kolom" id="galat-nama"></p>
    <label class="field-label">Surel
      <input type="email" name="surel" autocomplete="off" aria-describedby="galat-surel" />
    </label>
    <p class="galat-kolom" id="galat-surel"></p>
    <label class="field-label">Pesan
      <textarea name="pesan" rows="5" aria-describedby="galat-pesan"></textarea>
    </label>
    <p class="galat-kolom" id="galat-pesan"></p>
    <div class="kolom-jebakan" aria-hidden="true">
      <label>Jangan diisi <input type="text" name="situs" tabindex="-1" autocomplete="off" /></label>
    </div>
    <button class="button-primary" type="submit">Periksa pesan</button>
  </form>
</section>
```

Skrip `src/scripts/formulir-kontak.ts` dimuat dengan `<script>import "../scripts/formulir-kontak";</script>` di akhir `kontak.astro`.

```ts
/**
 * Pemasangan formulir kontak latihan di `/kontak`. Sengaja TIDAK ada
 * `fetch`, `XMLHttpRequest`, `sendBeacon`, `localStorage`, `sessionStorage`,
 * atau `document.cookie`: isian hanya diperiksa lalu dibuang.
 */
import { periksaPesan, terjebak, type Kolom } from "../lib/formulir-kontak";

const KOLOM: Kolom[] = ["nama", "surel", "pesan"];

export function pasangFormulirKontak(doc: Document): void {
  const form = doc.querySelector<HTMLFormElement>("[data-formulir-kontak]");
  if (!form) return;
  const ringkasan = doc.querySelector<HTMLElement>("[data-formulir-ringkasan]");
  const konfirmasi = doc.querySelector<HTMLElement>("[data-formulir-konfirmasi]");
  form.hidden = false;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const nilai = Object.fromEntries(new FormData(form)) as Record<string, unknown>;
    const galat = terjebak(nilai) ? {} : periksaPesan(nilai);
    const pesanGalat: string[] = [];
    let pertama: HTMLElement | null = null;

    for (const nama of KOLOM) {
      const kolom = form.elements.namedItem(nama) as HTMLInputElement | HTMLTextAreaElement;
      const tempat = doc.getElementById(`galat-${nama}`);
      const teksGalat = (galat as Record<string, string | undefined>)[nama];
      if (teksGalat) kolom.setAttribute("aria-invalid", "true");
      else kolom.removeAttribute("aria-invalid");
      if (tempat) tempat.textContent = teksGalat ?? "";
      if (teksGalat) {
        pesanGalat.push(teksGalat);
        pertama ??= kolom;
      }
    }

    if (konfirmasi) konfirmasi.hidden = true;
    if (ringkasan) {
      ringkasan.hidden = pesanGalat.length === 0;
      ringkasan.textContent = pesanGalat.length === 0 ? "" : `Ada ${pesanGalat.length} isian yang perlu diperbaiki.`;
    }
    if (pertama) {
      pertama.focus();
      return;
    }
    form.reset();
    if (konfirmasi) {
      konfirmasi.textContent = "Terima kasih. Ini latihan: pesanmu tidak dikirim dan tidak disimpan.";
      konfirmasi.hidden = false;
    }
  });
}

if (typeof document !== "undefined") pasangFormulirKontak(document);
```

```css
/* src/styles/formulir-kontak.css. Diimpor di frontmatter kontak.astro: import "../styles/formulir-kontak.css"; */
.formulir-kontak {
  margin-block: 2rem;
  max-width: 36rem;
}

.formulir-kontak[hidden],
.formulir-kontak [hidden] {
  display: none;
}

.formulir-kontak .field-label {
  margin-bottom: 1rem;
}

.formulir-kontak textarea {
  height: auto;
  min-height: 8rem;
  padding: 0.5rem 0.75rem;
  font-weight: 400;
}

.formulir-kontak [aria-invalid="true"] {
  border-width: 2px;
}

.formulir-kontak .galat-kolom {
  min-height: 1.25rem;
  font-weight: 700;
}

.formulir-kontak .galat-kolom:not(:empty)::before {
  content: "Galat: ";
}

/* Kolom jebakan: keluar dari layar, tetap bukan display:none agar robot tetap melihatnya. */
.kolom-jebakan {
  position: absolute;
  left: -10000px;
  width: 1px;
  height: 1px;
  overflow: hidden;
}

.formulir-ringkasan,
.formulir-konfirmasi {
  border: 1px solid var(--border-color);
  border-left-width: 0.4rem;
  border-radius: var(--radius-md);
  padding: 0.75rem 1rem;
  margin-block: 1rem;
  font-weight: 700;
}
```

Uji `tests/formulir-kontak.test.ts`:

```ts
import { describe, expect, test } from "bun:test";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { periksaPesan, terjebak } from "../src/lib/formulir-kontak";
import { BUILD_TIMEOUT_MS, DIST_CLIENT, buildProfile, canSpawnBun } from "./profil-uji-bersama";

describe("periksaPesan", () => {
  test("masukan sah tidak menghasilkan galat", () => {
    expect(periksaPesan({ nama: "Tamu Contoh", surel: "tamu@example.org", pesan: "Apakah hari Sabtu buka sampai sore?" })).toEqual({});
  });
  test("masukan kosong atau pendek menghasilkan tiga galat", () => {
    expect(Object.keys(periksaPesan({ nama: "", surel: "bukan-surel", pesan: "pendek" }))).toEqual(["nama", "surel", "pesan"]);
  });
  test("bukan teks diperlakukan sebagai kosong", () => {
    expect(Object.keys(periksaPesan({ nama: 42, surel: null, pesan: {} }))).toEqual(["nama", "surel", "pesan"]);
  });
  test("pesan lebih dari 500 karakter ditolak", () => {
    const galat = periksaPesan({ nama: "A", surel: "a@example.org", pesan: "x".repeat(501) });
    expect(Object.keys(galat)).toEqual(["pesan"]);
  });
  test("kolom jebakan terisi dikenali", () => {
    expect(terjebak({ situs: "x" })).toBe(true);
    expect(terjebak({ situs: "  " })).toBe(false);
  });
});

describe("/kontak pada build landing", () => {
  if (!canSpawnBun()) {
    test.skip("SKIPPED: bun tidak bisa dijalankan di lingkungan ini", () => {});
    return;
  }
  test(
    "halaman memuat formulir, dan skrip browsernya tidak mengirim atau menyimpan apa pun",
    async () => {
      await buildProfile("landing");
      const html = readFileSync(join(DIST_CLIENT, "kontak.html"), "utf8");
      expect(html).toContain("data-formulir-kontak");
      expect(html).not.toMatch(/<form[^>]*\saction=/);
      const aset = join(DIST_CLIENT, "_astro");
      const skrip = existsSync(aset) ? readdirSync(aset).filter((f) => f.endsWith(".js")) : [];
      // Hanya berkas milik formulir ini; berkas lain (mis. panel aksesibilitas) boleh memakai localStorage.
      const milikFormulir = skrip.map((f) => readFileSync(join(aset, f), "utf8")).filter((isi) => isi.includes("data-formulir-kontak"));
      expect(milikFormulir).toHaveLength(1);
      const gabungan = milikFormulir[0] ?? "";
      for (const terlarang of ["fetch(", "XMLHttpRequest", "sendBeacon", "localStorage", "sessionStorage", "document.cookie"]) {
        expect(gabungan.includes(terlarang)).toBe(false);
      }
    },
    BUILD_TIMEOUT_MS
  );
});
```

Dari `apps/storefront`, `bun test tests/formulir-kontak.test.ts`:

```text
 6 pass
 0 fail
 15 expect() calls
Ran 6 tests across 1 file. [2.25s]
```

| Pemeriksaan penyusun | Hasil |
| --- | --- |
| `bun test` di akar salinan lab | 1827 lolos, 3 dilewati, 0 gagal, 123 detik (1820 lolos sebelum formulir; selisih tujuh, enam milik berkas ujimu, satu tidak ditelusuri) |
| `bun run check` (Astro) | 0 galat, 0 peringatan |
| Chromium via skrip Playwright sekali pakai (bukan bagian modul), situs disajikan penyaji repositori dengan CSP-nya; tekan "Periksa pesan" pada formulir kosong | "Ada 3 isian yang perlu diperbaiki.", tiga galat, tiga kolom `aria-invalid="true"`, fokus di kolom nama |
| isian sah | "Terima kasih. Ini latihan: pesanmu tidak dikirim dan tidak disimpan.", kolom dikosongkan, `localStorage.length` 0, `document.cookie` kosong, nol permintaan jaringan baru |
| axe (WCAG 2 A dan AA), keadaan awal dan keadaan galat | tanpa pelanggaran |

**Mengapa belum boleh menerima pesan sungguhan.** Validasi di peramban bisa dilewati siapa pun, dan situs statis tidak punya peladen untuk memeriksa ulang, membatasi laju, atau menyimpan dengan aman. Nama dan surel adalah data pribadi; produk nyata perlu dasar pemrosesan dan pemberitahuan menurut UU 27/2022 (Pasal 20 dan 21, `b-xii2-m10`; bukan nasihat hukum).

## Daftar periksa

- [ ] Prediksi kebutuhan per pertanyaan FAQ tertulis sebelum build.
- [ ] Setiap fitur menunjuk kebutuhan K.
- [ ] `/kontak` dibuka dan dibaca; tidak ada teks sisa tiruan uji.
- [ ] Formulir tanpa `fetch`, penyimpanan, atau `action`; uji lolos; tab Network kosong; dicoba dengan papan ketik.
- [ ] Fitur di luar lingkup dicatat sebagai usulan.
- [ ] Bila memakai AI: log pemakaian, tanpa data pribadi.

## Umpan balik sejawat

Tukar fitur dengan kelompok lain; ulasan: **satu yang sudah baik, satu yang perlu diperbaiki, satu langkah berikutnya**. Coba formulir temanmu dengan masukan sah, kosong, dan terlalu panjang; periksa apakah galat menjelaskan tanpa membocorkan isi.

## Latihan bercampur

1. `AI: boleh` (dari `b-xii1-m11`) Tambahkan satu pertanyaan FAQ yang mengutip sumber lisensi dan tulis atribusinya. Dokumen mana yang ikut berubah?
2. `AI: tanpa AI` (dari `b-xii2-m3`) Surel apa yang kamu pakai pada data uji formulir, dan mengapa `.example` saja tidak cukup bila datanya masuk berkas seed?

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `b-xii2-m6` (pertanyaan 1), sekitar tiga minggu lagi di `b-xii2-m8` (pertanyaan 2), dan sekitar delapan minggu lagi di `b-xii2-m13` (pertanyaan 3). Jawab sekarang lalu simpan.

1. Mengapa formulir kontak di situsmu tidak mengirim atau menyimpan isian, dan apa yang dibutuhkan produk nyata sebelum menerima pesan?
2. Mengapa FAQ tidak ada di berkas seed, dan siapa yang mengisinya di CMS lab?
3. Apa yang kamu catat tentang fitur yang tidak dikerjakan karena di luar lingkup?

## Kesalahan umum

- **Menganggap formulir bawaan profil `landing`.** Kamu yang menambahkannya.
- **Skrip atau gaya sebaris.** CSP memblokirnya.
- **Galat hanya dengan warna.** Awali dengan "Galat:".
- **Mengira validasi peramban sama dengan keamanan.**
- **Membiarkan data tiruan uji tampil.**

## Cek mandiri

- [ ] Saya dapat menyebut fitur halaman kontak dan sumber datanya.
- [ ] Saya dapat mengisi FAQ dan memeriksanya.
- [ ] Saya dapat menambahkan dan menguji formulir tanpa kirim atau simpan.
- [ ] Saya dapat menjelaskan mengapa produk nyata butuh backend dan dasar hukum.
- [ ] Saya meninjau fitur teman dengan temuan, alasan, dan saran.

## Kunci dan petunjuk

**Ingat kembali.** 1: dari `DEFAULT_THEME_COLORS` di `site.ts` (ditulis `template:init`); diubah dengan `--warna-primer` (dan `--warna-sekunder`, `--warna-aksen`). 2: karena batas dan tampilannya sudah ditentukan kode; rancanganmu hanya bisa mengisi yang boleh diisi (tagline, halaman CMS, kontak). 3: kredit yang pantas (pencipta dan sumber), tautan ke lisensinya, dan pernyataan bila ada perubahan.

**Rencana sprint.** Prediksi: contoh jawaban: pertanyaan 1 dan 2 melayani K2 (cara pinjam), pertanyaan 3 melayani pertanyaan umum; tidak ada yang melanggar lingkup karena hanya teks. Keluaran formulir dijalankan penyusun. Keluaran tiga baris: objek kosong untuk masukan sah, tiga galat untuk masukan kosong, dan `true` untuk kolom jebakan terisi. Kolom jebakan ditaruh di formulir tetapi disembunyikan dari pengguna; robot sering mengisi semua kolom, dan skrip menampilkan konfirmasi yang sama tanpa memberi tahu bahwa ia terjebak. Pemeriksaan Chromium dan axe dijalankan penyusun; skripnya tidak disertakan.

**Latihan bercampur.** 1: contoh: pertanyaan "Apakah gambar sampul boleh dipakai ulang?" dengan jawaban yang menyebut pencipta, sumber, lisensi, dan tautannya; yang ikut berubah: README atau halaman kredit, dan cerminnya bila ada. 2: `example.org` karena uji repositori hanya mengizinkan empat domain `example.*` pada berkas seed; `.example` cukup untuk teks latihan tetapi tidak lolos uji seed.

**Ulang berjarak.** 1: validasi di peramban bisa dilewati dan situs statis tidak punya peladen, jadi isian tidak boleh dikirim atau disimpan; produk nyata butuh backend yang memeriksa ulang masukan, membatasi laju, dan menyimpan dengan aman, serta dasar pemrosesan dan pemberitahuan menurut UU PDP (UU 27/2022, Pasal 20 dan 21; bukan nasihat hukum). 2: karena yang disemai hanya halaman dan profil; FAQ ada pada pengaturan toko CMS yang dikelola guru di CMS lab. 3: apa fiturnya, mengapa di luar lingkup, dan siapa atau apa yang diperlukan agar bisa dikerjakan (misalnya izin mengubah backend).

## Langkah berikutnya

Modul berikut: `b-xii2-m6` (sprint 2: pengujian). Bacaan lanjut: MDN, "Client-side form validation".
