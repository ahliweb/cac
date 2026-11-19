## Untuk siapa modul ini

Modul ini untuk jalur **profesional** (`PRO`), 10 jam, sesudah `DW-PRO-M7`. Alatnya Bun (penulis memakai 1.4.4; silabus 10.2 memilih Bun dan TypeScript untuk modul web, selaras sma-coding jalur B), penyunting teks, dan satu peramban modern; halaman dibuka dari berkas lokal tanpa server. Estimasi lima sesi dua jam `[asumsi]`. Data berupa barang rekaan dari modul sebelumnya.

Jembatan kuliah-coding (silabus 6.2), per profil masuk: `I-lengkap` **lewati**, `I-awal` **wajib**, `U-lengkap` **wajib**. Dasarnya `KUL-I-205` C1 (pengembangan web dasar). Jembatan bukan alih kredit dan bukan sertifikat; keahlian berlaku per topik.

## Cek awal pengalaman

Jawab tanpa melihat apa pun. Skor tidak dicatat.

1. Apa beda HTML, CSS, dan JavaScript dalam satu halaman?
2. Mengapa `<meta name="viewport" ...>` dan `@media (min-width: ...)` dibutuhkan agar halaman cocok di layar ponsel?
3. Mengapa teks dari pengguna tidak boleh langsung dimasukkan ke `innerHTML`?
4. Apa guna `<label for="...">` dan atribut `lang`?
5. Apa yang ditambahkan TypeScript pada JavaScript, dan kapan tambahan itu bekerja?

Bila kelimanya benar, Anda boleh melewati "Contoh terselesaikan" dan "Contoh setengah jadi".

## Ingat kembali

1. (`DW-PRO-M7`) Mengapa nilai dititipkan ke kueri lewat `?`, dan apa yang terjadi bila disambung ke teks SQL?
2. (`DW-PRO-M5`) Apa beda uji yang gagal dan uji yang *error*, dan dari mana Anda mulai membaca *traceback*?
3. (`DW-PRO-M1`) Apa yang dilakukan `.gitignore` terhadap berkas yang sudah pernah di-commit?

Cocokkan: (1) agar nilai dianggap data, bukan perintah; penyambungan membuka injeksi; (2) gagal adalah `AssertionError` pada pernyataan uji, *error* adalah galat lain; baca dari baris terakhir ke atas sampai baris kode Anda; (3) tidak menghentikan pelacakan berkas yang sudah dilacak.

## Tujuan

Setelah modul ini Anda dapat membuat halaman web yang responsif dan menambahkan interaksi di sisi peramban dengan JavaScript atau TypeScript.

## Prediksi dulu

Dengan fungsi `saring` dan `barisTabel` di bawah, tuliskan dua prediksi sebelum membaca jawaban. Pertama, kode barang yang dikembalikan `saring(DATA, "  LAMPU ")` pada daftar `B02` (Baterai contoh) dan `B05` (Lampu contoh). Kedua, bila nama sebuah barang berisi teks `<img src=x>` dan dipasang lewat `barisTabel`, apakah sebuah gambar muncul di halaman?

## Contoh terselesaikan

Spesifikasi (Anda tulis lebih dulu): `saring(daftar, kata)` mengembalikan semua barang bila kata kosong atau hanya spasi, mengabaikan huruf besar dan spasi tepi, cocok bila nama memuat kata atau kode sama persis; `barisTabel(barang)` menghasilkan satu baris tabel, dengan kelas `menipis` bila stok kurang dari 5, dan tanda HTML di data dinetralkan. Logika yang tidak menyentuh halaman dipisah supaya dapat diuji tanpa peramban.

Ujinya (`logika.test.ts`):

```ts
import { describe, expect, test } from "bun:test";
import { type Barang, barisTabel, esc, saring } from "./logika";

const DATA: Barang[] = [
  { kode: "B02", nama: "Baterai contoh", kategori: "Listrik", stok: 3 },
  { kode: "B05", nama: "Lampu contoh", kategori: "Listrik", stok: 7 },
];

describe("saring", () => {
  test("kata kosong mengembalikan semua", () => {
    expect(saring(DATA, "   ")).toHaveLength(2);
  });
  test("huruf besar dan spasi diabaikan", () => {
    expect(saring(DATA, "  LAMPU ").map((b) => b.kode)).toEqual(["B05"]);
  });
  test("kode cocok persis", () => {
    expect(saring(DATA, "b02").map((b) => b.kode)).toEqual(["B02"]);
  });
  test("tidak ada yang cocok", () => {
    expect(saring(DATA, "zzz")).toEqual([]);
  });
});

describe("tampilan", () => {
  test("esc menetralkan tanda HTML", () => {
    expect(esc('<b onclick="x">&')).toBe("&lt;b onclick=&quot;x&quot;&gt;&amp;");
  });
  test("stok di bawah 5 diberi kelas menipis", () => {
    expect(barisTabel(DATA[0])).toContain('class="menipis"');
    expect(barisTabel(DATA[1])).not.toContain("menipis");
  });
  test("nama berisi tag tidak menjadi elemen", () => {
    const b: Barang = { kode: "X1", nama: "<img src=x>", kategori: "K", stok: 9 };
    expect(barisTabel(b)).not.toContain("<img");
  });
});
```

Logikanya (`logika.ts`). Tipe `Barang` hanya bekerja saat penyuntingan dan kompilasi; ia dihapus di hasil JavaScript, jadi data dari luar tetap perlu diperiksa:

```ts
export type Barang = { kode: string; nama: string; kategori: string; stok: number };

export function saring(daftar: Barang[], kata: string): Barang[] {
  const k = kata.trim().toLowerCase();
  if (k === "") return daftar;
  return daftar.filter((b) => b.nama.toLowerCase().includes(k) || b.kode.toLowerCase() === k);
}

export function esc(teks: string): string {
  return teks
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function barisTabel(b: Barang): string {
  const kelas = b.stok < 5 ? ' class="menipis"' : "";
  return `<tr${kelas}><td>${esc(b.kode)}</td><td>${esc(b.nama)}</td><td>${esc(b.kategori)}</td><td class="angka">${b.stok}</td></tr>`;
}
```

Halamannya (`stok.html`) memakai elemen bermakna: `lang`, `viewport`, `label` yang terhubung ke kotak cari, `caption` dan `scope` pada tabel, serta `aria-live` agar pembaca layar mengumumkan jumlah hasil. Warna kuning tidak menjadi satu-satunya penanda: keterangannya tertulis di `caption`.

```html
<!doctype html>
<html lang="id">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Stok gudang contoh</title>
  <link rel="stylesheet" href="gaya.css">
</head>
<body>
  <main>
    <h1>Stok gudang contoh</h1>
    <label for="cari">Cari nama atau kode barang</label>
    <input id="cari" type="search" autocomplete="off">
    <p id="jumlah" aria-live="polite"></p>
    <div class="tabel">
      <table>
        <caption>Daftar barang rekaan; baris berlatar kuning berarti stok kurang dari 5</caption>
        <thead>
          <tr><th scope="col">Kode</th><th scope="col">Nama</th><th scope="col">Kategori</th><th scope="col">Stok</th></tr>
        </thead>
        <tbody id="isi"></tbody>
      </table>
    </div>
  </main>
  <script src="stok.js"></script>
</body>
</html>
```

CSS (`gaya.css`) ditulis untuk layar sempit lebih dulu; aturan `min-width` hanya menambah untuk layar lebar, dan pembungkus `.tabel` bergulir bila tabel melebihi layar:

```css
body { margin: 0; font-family: system-ui, sans-serif; color: #1b1b1b; background: #fff; }
main { padding: 1rem; }
input { display: block; width: 100%; box-sizing: border-box; margin-top: 0.25rem; padding: 0.5rem; font-size: 1rem; }
.tabel { overflow-x: auto; }
table { width: 100%; border-collapse: collapse; }
th, td { padding: 0.5rem; border-bottom: 1px solid #767676; text-align: left; }
.angka { text-align: right; }
.menipis { background: #fff3b0; }

@media (min-width: 40rem) {
  main { max-width: 40rem; margin: 0 auto; }
}
```

Penghubung ke halaman (`stok.ts`) dibuat tipis; ia hanya memanggil fungsi yang sudah diuji. Parameter `?q=` membaca kata cari awal dari alamat, sehingga halaman dapat diperiksa tanpa mengetik:

```ts
import { type Barang, barisTabel, saring } from "./logika";

const BARANG: Barang[] = [
  { kode: "B02", nama: "Baterai contoh", kategori: "Listrik", stok: 3 },
  { kode: "B05", nama: "Lampu contoh", kategori: "Listrik", stok: 7 },
  { kode: "B09", nama: "Saklar contoh", kategori: "Listrik", stok: 12 },
  { kode: "B11", nama: "Pensil contoh", kategori: "Alat tulis", stok: 40 },
];

function tampilkan(kata: string): void {
  const isi = document.querySelector<HTMLElement>("#isi");
  const jumlah = document.querySelector<HTMLElement>("#jumlah");
  if (!isi || !jumlah) return;
  const hasil = saring(BARANG, kata);
  isi.innerHTML = hasil.map(barisTabel).join("");
  jumlah.textContent = `${hasil.length} dari ${BARANG.length} barang`;
}

const kotak = document.querySelector<HTMLInputElement>("#cari");
if (kotak) {
  const awal = new URLSearchParams(location.search).get("q") ?? "";
  kotak.value = awal;
  kotak.addEventListener("input", () => tampilkan(kotak.value));
  tampilkan(awal);
}
```

Jalankan `bun test` (tujuh uji lolos), lalu `bun build stok.ts --outfile stok.js --target browser`, lalu buka `stok.html` dan `stok.html?q=lampu` di peramban. Pada yang kedua halaman menampilkan `1 dari 4 barang` dan hanya baris `B05`; pada yang pertama `4 dari 4 barang` dengan baris `B02` berlatar kuning.

## Contoh setengah jadi

Lengkapi fungsi `esc` agar tanda kutip tunggal juga dinetralkan (berguna bila nilai dipasang di dalam atribut berkutip tunggal), lalu tambahkan ujinya:

```ts setengah-jadi
export function esc(teks: string): string {
  return teks
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/___/g, "&#39;");
}
```

Prediksi dulu: mengapa `&` harus diganti paling awal?

## Latihan

1. **Ubah.** Ubah ambang `menipis` menjadi 8. Ubah ujinya lebih dulu, lihat gagal, baru ubah kode.
2. **Buat.** Tambahkan uji, lalu kotak pilih kategori (`<select>` dengan `label`) yang menyaring bersama kata cari.
3. **Buat.** Tambahkan aturan CSS agar pada layar lebar tabel memakai garis zebra, dan periksa halaman pada lebar 360 piksel dan 1000 piksel dengan jendela peramban yang diubah ukurannya.
4. **Jelaskan.** Mengapa `esc` dipakai, padahal datanya milik Anda sendiri? Apa yang berubah bila data kelak datang dari pengguna lain?
5. **Berpasangan (opsional).** Minta rekan mencoba halaman hanya dengan papan ketik; catat satu hal yang sulit dijangkau. Peserta mandiri boleh melakukannya sendiri dengan tombol Tab.

## Latihan bercampur

1. (`DW-PRO-M7`) Rancang tabel SQL untuk data halaman ini, lalu tulis kueri yang mengembalikan kode, nama, kategori, dan stok terurut menurut kode.
2. (`DW-PRO-M5`) Uji `kode cocok persis` gagal karena `saring(DATA, "b02")` mengembalikan daftar kosong. Tulis enam langkah penelusuran dan sebut baris yang Anda curigai.

## Ulang berjarak

Tanpa melihat modul ini, kerjakan ulang dan cocokkan.

| Kapan | Pertanyaan |
| --- | --- |
| Satu minggu lagi | Mengapa logika dipisah dari kode yang menyentuh halaman, dan mengapa teks dari data dinetralkan sebelum dipasang ke halaman? |
| Awal modul ke-4 berikutnya | Sebut empat hal yang membuat halaman dapat dipakai pembaca layar dan layar ponsel. |
| Akhir jalur | Tulis dari ingatan kerangka halaman HTML dengan `lang`, `viewport`, satu `label`, dan satu aturan `@media`. |

## Kebijakan AI

Mengikuti kebijakan program (silabus 9.1) yang dipraktikkan di `DW-PRO-M13`. Bila Anda meminta asisten AI membuat halaman, minta spesifikasi dan ujinya lebih dulu, hanya tempel data sintetis, dan periksa keluarannya: apakah teks dipasang lewat `innerHTML` tanpa dinetralkan, apakah ada skrip atau tautan luar yang tidak Anda minta. Catat alat, versi, dan perintah. Memakai AI tidak diwajibkan.

## Kesalahan umum

- **Menempel teks langsung ke `innerHTML`.** Data berisi tag menjadi elemen sungguhan; netralkan atau pakai `textContent`.
- **Menguji halaman hanya di satu lebar layar.** Tabel melebar melewati layar sempit tanpa pembungkus yang bergulir.
- **Menandai dengan warna saja.** Pembaca layar dan orang buta warna kehilangan informasinya; beri teks.
- **Mengira tipe TypeScript memeriksa data saat dijalankan.** Tipe dihapus saat dikompilasi; data luar tetap diperiksa.
- **Menaruh semua logika di penghubung halaman.** Kode itu tidak dapat diuji tanpa peramban.

## Cek mandiri

Tutup modul dan jawab:

1. Apa yang dilakukan `esc`, dan mengapa `&` diganti pertama?
2. Apa yang membuat tabel tetap terpakai pada layar 360 piksel?
3. Mengapa `saring` diuji dengan kata berspasi dan huruf besar?

Daftar periksa (kosong; Anda isi sendiri, tidak dikumpulkan):

- [ ] Logika halaman punya uji dan terpisah dari penghubung halaman.
- [ ] Teks dari data tidak masuk `innerHTML` tanpa dinetralkan.
- [ ] Halaman saya periksa pada layar sempit dan lebar, dan hanya dengan papan ketik.
- [ ] Setiap kolom dan kotak isian punya label atau judul.

## Kunci dan petunjuk

- **Cek awal:** (1) HTML menyusun isi, CSS mengatur tampilan, JavaScript menambah perilaku; (2) `viewport` membuat lebar halaman mengikuti layar, `@media` mengubah aturan menurut lebar; (3) data dapat memuat tag atau skrip; (4) `label` menghubungkan teks dengan kotak isian untuk pembaca layar dan klik, `lang` menentukan bahasa ucapan dan ejaan; (5) tipe statis, bekerja saat penyuntingan dan kompilasi saja.
- **Prediksi:** `["B05"]`; pada tampilan, `<img src=x>` menjadi teks `&lt;img src=x&gt;` yang terlihat apa adanya, bukan gambar.
- **Setengah jadi:** isi lubang dengan `'` sehingga barisnya `.replace(/'/g, "&#39;")`. `&` harus pertama, bila tidak, `&lt;` yang baru dibuat akan menjadi `&amp;lt;`.
- **Latihan 1:** dengan ambang 8, uji lama untuk stok 7 gagal karena kini `menipis`; ubah ujinya ke ambang baru (stok 7 menipis, 12 tidak).
- **Latihan 4:** pelindung tetap dipakai karena asal data bisa berubah; kebiasaan ini mencegah halaman rusak atau disusupi skrip.
- **Latihan bercampur 2:** reproduksi, perkecil, hipotesis (`b.kode.toLowerCase() === k` membandingkan dengan `"B02"` kecil), buktikan dengan mencetak `k`, perbaiki satu hal, simpan uji.
- **Petunjuk bila macet:** buka konsol peramban (F12) dan lihat pesan galat; uji satu fungsi saja.

## Langkah berikutnya

`DW-PRO-M9`: layanan web dan API. Data barang yang kini ditulis langsung di `stok.ts` akan diambil dari layanan yang Anda buat sendiri.

## Catatan untuk pendamping

- **Waktu:** 10 jam, lima sesi dua jam. **Bahan:** Bun, peramban, penyunting teks. Semua dijalankan penulis (Bun 1.4.4): `bun test` tujuh uji lolos, `bun build` menghasilkan `stok.js`, dan `tsc --strict` pada `stok.ts` dan `logika.ts` tanpa galat. Halaman dibuka di Chrome tanpa kepala: `?q=lampu` menampilkan `1 dari 4 barang` dengan baris `B05`, tanpa kata cari `4 dari 4 barang` dengan kelas `menipis` pada `B02`, dan tangkapan layar lebar 360 piksel dilihat penulis. Pengetikan langsung di kotak tidak dicoba secara otomatis; pendamping mencobanya.
- **Jembatan kuliah:** `I-lengkap` L, `I-awal` W, `U-lengkap` W (dasar `KUL-I-205` C1, silabus 6.2).
- **Unit SKKNI yang disentuh (judul saja, tidak menjamin kompetensi):** Mengimplementasikan User Interface (`J.620100.005.02`); Merancang User Experience (`J.620100.006.01`). Salinan daftar unit belum terverifikasi terhadap berkas resmi.
- **Tanda siap lanjut:** peserta menjelaskan mengapa teks dinetralkan dan memeriksa halamannya pada dua lebar layar.
