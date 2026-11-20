## Untuk siapa modul ini

Modul ini untuk murid kelas X jalur B (Web dengan JavaScript, TypeScript, dan Bun), minggu `B-X2-M2` silabus v1.4.1: string dan templat. Prasyarat: modul `b-x2-m1` (array), karena string diperlakukan mirip array karakter dan hasil `split` adalah array.

Modul ini karangan penyusun dan disetujui pemilik program pada 2026-11-20 (keputusan lewat dialog; catatan tinjauan menjadi tindak lanjut revisi). Butir `E-BK-d` (solusi program sederhana dalam format pseudocode) dipetakan silabus sebagai dipenuhi jalur ini; pemenuhan butir mengikuti pemetaan silabus, bukan status modul.

Contoh dijalankan penyusun dengan Bun 1.4.4 per 2026-11. Tugas baca-dan-prediksi ditandai `AI: tanpa AI`; selain itu AI generatif boleh dipakai dengan etika dan dicatat, tanpa data pribadi, kata sandi, atau tugas bernilai pada permintaanmu. Contoh teks di modul ini karangan; nama orang selalu nama palsu.

## Ingat kembali

Jawab dari ingatan, baru cek di bagian kunci. Soal 1 dari `b-x2-m1`, soal 2 dari `b-x1-m13`, soal 3 dari `b-x1-m9`.

1. Apa indeks elemen pertama sebuah array, dan ekspresi apa yang memberi elemen terakhir dari `daftar`?
2. `prompt()` selalu mengembalikan teks. Apa yang harus dilakukan sebelum teks itu dibandingkan dengan angka?
3. Apa hasil `typeof "5"`, dan apa yang tercetak oleh `console.log("5" + 3)`?

## Tujuan

Setelah modul ini kamu dapat:

- membuat string dan membaca panjang serta hurufnya lewat `length` dan indeks;
- menyusun teks dengan templat (tanda backtick dan `${...}`);
- memakai metode `toUpperCase`, `toLowerCase`, `trim`, `includes`, `slice`, `split`, dan `join`;
- menulis skrip teks (keluaran minggu ini), misalnya pengecek palindrom dan penghitung vokal.

## Prediksi dulu

String adalah teks, ditulis di antara tanda kutip. Seperti array, hurufnya punya indeks mulai dari 0. Templat ditulis dengan tanda backtick (`` ` ``) dan boleh memuat ekspresi dalam `${...}`. Baca skrip ini dan **tebak dulu, tulis jawabanmu per baris, baru jalankan**.

```js
// prediksi-string.js
const nama = "Dewi-contoh";
console.log(nama.length);
console.log(nama[0]);
console.log(nama[nama.length - 1]);
console.log(nama.toUpperCase());
console.log(nama);
const umur = 16;
console.log(`${nama} berumur ${umur + 1} tahun depan`);
console.log("a,b,c".split(","));
```

1. Apa yang tercetak pada tiap baris?
2. Setelah `nama.toUpperCase()`, apakah `nama` berubah? Apa buktinya dari keluaran?
3. Apa yang terjadi pada ekspresi `${umur + 1}` di dalam templat?

## Contoh terselesaikan

Keluaran skrip prediksi di atas:

```text
11
D
h
DEWI-CONTOH
Dewi-contoh
Dewi-contoh berumur 17 tahun depan
[ "a", "b", "c" ]
```

Menurut dokumentasi MDN, metode seperti `slice` dan `trim` tidak mengubah string asli, melainkan mengembalikan string baru. Karena itu `nama` tetap `Dewi-contoh` walaupun `toUpperCase` dipanggil. `split` memecah string menjadi array pada pola yang kamu beri, dan `join` pada array menggabungkannya kembali menjadi string.

**Palindrom** adalah teks yang sama bila dibaca dari depan maupun dari belakang. Algoritmanya: rapikan teks (huruf kecil, tanpa spasi), taruh satu penunjuk di ujung kiri dan satu di ujung kanan, bandingkan hurufnya, lalu geser keduanya ke tengah. Bila ada pasangan yang berbeda, jawabannya `false`.

```js
// teks.js
function bersihkan(teks) {
  return teks.toLowerCase().split(" ").join("");
}

function apakahPalindrom(teks) {
  const bersih = bersihkan(teks);
  let kiri = 0;
  let kanan = bersih.length - 1;
  while (kiri < kanan) {
    if (bersih[kiri] !== bersih[kanan]) {
      return false;
    }
    kiri++;
    kanan--;
  }
  return true;
}

function hitungVokal(teks) {
  let banyak = 0;
  for (const huruf of teks.toLowerCase()) {
    if ("aiueo".includes(huruf)) {
      banyak++;
    }
  }
  return banyak;
}

console.log(apakahPalindrom("katak"));
console.log(apakahPalindrom("Kasur ini rusak"));
console.log(apakahPalindrom("informatika"));
console.log(hitungVokal("Belajar Web"));
console.log(hitungVokal("rhythm"));
console.log(`"Belajar Web" punya ${hitungVokal("Belajar Web")} vokal`);
```

Keluarannya:

```text
true
true
false
4
0
"Belajar Web" punya 4 vokal
```

Penelusuran `apakahPalindrom("katak")`:

| Putaran | `kiri` | `kanan` | `bersih[kiri]` | `bersih[kanan]` |
| --- | --- | --- | --- | --- |
| 1 | 0 | 4 | k | k |
| 2 | 1 | 3 | a | a |
| berhenti | 2 | 2 | - | - |

Pada `kiri` sama dengan `kanan` syarat `kiri < kanan` salah, perulangan berhenti, dan hasilnya `true`. Huruf di tengah tidak perlu dibandingkan dengan dirinya sendiri.

## Contoh setengah jadi

Lengkapi nama metode pada `____` agar keluarannya `[belajar JavaScript]`, `true`, `2`, dan `belajar-JavaScript`.

```js setengah-jadi
// teks-setengah.js
const kalimat = "  belajar JavaScript  ";
const rapi = kalimat.____();
console.log(`[${rapi}]`);
console.log(rapi.____("JavaScript"));
const kata = rapi.____(" ");
console.log(kata.length);
console.log(kata.____("-"));
```

## Soal Parsons

Susun baris-baris di bawah (sudah diacak) menjadi fungsi `hitungVokal(teks)` yang mengembalikan banyaknya huruf vokal.

```text
(a)   return banyak;
(b)       banyak++;
(c)   let banyak = 0;
(d) function hitungVokal(teks) {
(e)     if ("aiueo".includes(huruf)) {
(f)   for (const huruf of teks.toLowerCase()) {
(g)     }
(h)   }
(i) }
```

## Latihan

1. `AI: tanpa AI` **Baca dan prediksi.** Tanpa menjalankan, tulis apa yang tercetak:

   ```js
   const s = "Bun-2026";
   console.log(s.length, s[3], s.slice(0, 3));
   console.log(s.toLowerCase() === "bun-2026");
   console.log("5" + 3, "5" - 3);
   console.log(s.split("-"));
   ```
2. `AI: boleh` **Palindrom.** Tulis pseudocode lalu fungsi `apakahPalindrom(teks)`. Uji dengan `"katak"`, `"Kasur ini rusak"`, dan `"informatika"`.
3. `AI: boleh` **Hitung vokal.** Hitung vokal pada `"Informatika Itu Seru"` dengan fungsi `hitungVokal`. Telusuri dulu dua kata pertama dengan tabel, lalu cocokkan dengan Bun.
4. `AI: boleh` **Hitung kata.** Tulis fungsi `hitungKata(kalimat)` yang benar walaupun kalimatnya diawali spasi atau memuat spasi ganda, misalnya `"  belajar  web  hari ini "`. Petunjuk: `trim`, `split`, dan `filter` dari modul sebelumnya.
5. *Opsional:* **catatan pemakaian AI.** Bila memakai AI generatif, jawab nomor 4 sendiri dulu, lalu minta penjelasan atau petunjuk bertahap, bukan skrip jadi. Catat alatnya, tujuanmu, garis besar perintahmu, bagian yang kamu pakai, dan cara memeriksanya (uji dengan kalimat yang hasilnya kamu tahu). Jangan menaruh data pribadi atau tugas bernilai pada perintah.

## Latihan bercampur

1. Ubah array `["dewi-contoh", "budi-contoh"]` menjadi huruf besar semua dengan `map` (dari `b-x2-m1`).
2. Tulis fungsi panah `sapa(n)` yang mengembalikan `Halo, <n>!` dengan templat (dari `b-x1-m12`).
3. Tulis skrip yang membaca kata dengan `prompt()` lalu mencetak `palindrom` atau `bukan palindrom` (dari `b-x1-m9`).

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `b-x2-m3` (pertanyaan 1), sekitar tiga minggu lagi di `b-x2-m5` (pertanyaan 2), dan sekitar delapan minggu lagi, modul `b-x2-m10` (pertanyaan 3). Jawab sekarang lalu simpan.

1. Tulis templat string yang mencetak `Halo, <nama>!` memakai variabel `nama`.
2. Tulis kode yang mengubah `teks` menjadi huruf besar, dan kode yang mengubah `"a-b-c"` menjadi array `["a", "b", "c"]`.
3. Mengapa teks dari pengguna sebaiknya dirapikan dengan `trim()` dan `toLowerCase()` sebelum dibandingkan?

## Kesalahan umum

- **Menjumlahkan teks dan angka.** `"5" + 3` menghasilkan `"53"`, karena `+` dengan teks berarti menggabung; `"5" - 3` menghasilkan 2 karena `-` memaksa teks menjadi angka. Ubah dulu dengan `Number(...)` bila kamu ingin menghitung.
- **Mengira huruf string bisa diganti lewat indeks.** Pada percobaan penyusun di Bun, `s[0] = "K"` melempar `TypeError` dan `s` tetap `kata`. Untuk mendapat versi baru, buat string baru dengan `slice` dan penggabungan.
- **Lupa menyimpan hasil.** `s.toUpperCase();` tanpa `const baru = ...` tidak mengubah `s` dan hasilnya hilang.
- **Membandingkan teks tanpa menyamakan huruf besar dan kecil.** `"Katak" === "katak"` adalah `false`, dan menurut MDN `includes` bersifat peka huruf besar dan kecil, sehingga `"Belajar".includes("belajar")` juga `false`.
- **Salah tanda kutip pada templat.** `"Halo ${nama}"` dengan tanda kutip biasa mencetak `${nama}` apa adanya; templat harus memakai backtick.
- **`split(" ")` pada spasi ganda.** `"a  b".split(" ")` menghasilkan `[ "a", "", "b" ]`, yaitu elemen kosong di tengah; saring dengan `filter`.

## Cek mandiri

- [ ] Saya dapat membaca panjang dan huruf string lewat `length` dan indeks.
- [ ] Saya dapat menulis templat dengan `${...}`.
- [ ] Saya dapat memakai `trim`, `toLowerCase`, `includes`, `slice`, `split`, dan `join`.
- [ ] Saya tahu metode string mengembalikan string baru dan tidak mengubah yang lama.
- [ ] Saya dapat menelusuri algoritma dua penunjuk dengan tabel.
- [ ] Saya menulis pseudocode sebelum fungsinya.

## Kunci dan petunjuk

**Ingat kembali.** 1: indeks 0; `daftar[daftar.length - 1]`. 2: ubah dengan `Number(...)`. 3: `string`; tercetak `53`.

**Prediksi dulu.** 1: `11`, `D`, `h`, `DEWI-CONTOH`, `Dewi-contoh`, `Dewi-contoh berumur 17 tahun depan`, `[ "a", "b", "c" ]`. 2: tidak berubah; baris kelima masih `Dewi-contoh`. 3: Bun menghitung `16 + 1` lebih dulu, lalu menyisipkan hasilnya (17) ke dalam teks.

**Contoh setengah jadi.** Isian berurutan: `trim`, `includes`, `split`, `join`. Kuncinya, yang dijalankan:

```js
// teks-kunci.js
const kalimat = "  belajar JavaScript  ";
const rapi = kalimat.trim();
console.log(`[${rapi}]`);
console.log(rapi.includes("JavaScript"));
const kata = rapi.split(" ");
console.log(kata.length);
console.log(kata.join("-"));
```

Keluarannya:

```text
[belajar JavaScript]
true
2
belajar-JavaScript
```

**Soal Parsons.** Urutan benar: d, c, f, e, b, g, h, a, i. Baris (g) menutup `if`, (h) menutup `for`, dan (i) menutup fungsi; `return` harus berada setelah perulangan selesai.

**Latihan.** 1: `8 - Bun` (panjang 8, `s[3]` adalah tanda hubung, `slice(0, 3)` adalah `Bun`), lalu `true`, lalu `53 2`, lalu `[ "Bun", "2026" ]`. 2: pseudocode: `BERSIH = huruf kecil tanpa spasi`; `KIRI = 0`, `KANAN = panjang - 1`; `SELAMA KIRI < KANAN: bila BERSIH[KIRI] beda BERSIH[KANAN] maka KEMBALIKAN false; geser KIRI dan KANAN`; `KEMBALIKAN true`. Hasil dengan `teks.js` di atas: `true`, `true`, `false`. 3: dua kata pertama: `Informatika` punya I, o, a, i, a (5 vokal) dan `Itu` punya I, u (2 vokal); total keseluruhan kalimat 9. Kunci yang dijalankan:

```js
// vokal.js
function hitungVokal(teks) {
  let banyak = 0;
  for (const huruf of teks.toLowerCase()) {
    if ("aiueo".includes(huruf)) {
      banyak++;
    }
  }
  return banyak;
}
console.log(hitungVokal("Informatika Itu Seru"));
```

```text
9
```

4: kunci yang dijalankan:

```js
// hitung-kata.js
function hitungKata(kalimat) {
  return kalimat
    .trim()
    .split(" ")
    .filter((k) => k !== "").length;
}
console.log(hitungKata("  belajar  web  hari ini "));
console.log("a  b".split(" "));
```

```text
4
[ "a", "", "b" ]
```

Baris kedua hanya menunjukkan mengapa `filter` perlu: spasi ganda menghasilkan elemen kosong.

**Latihan bercampur.** Kunci yang dijalankan:

```js
// campur-teks.js
const nama = ["dewi-contoh", "budi-contoh"];
console.log(nama.map((n) => n.toUpperCase()));

const sapa = (n) => `Halo, ${n}!`;
console.log(sapa("Dewi-contoh"));
```

```text
[ "DEWI-CONTOH", "BUDI-CONTOH" ]
Halo, Dewi-contoh!
```

Nomor 3: skrip `palindrom-tanya.js` memakai `apakahPalindrom` dari contoh dan baris `const kata = prompt("Kata atau kalimat?");` lalu `console.log(apakahPalindrom(kata) ? "palindrom" : "bukan palindrom");`. Dijalankan dengan jawaban `katak`, `Kasur ini rusak`, dan `web` lewat `printf '...\n' | bun run palindrom-tanya.js`, ketiganya mencetak `palindrom`, `palindrom`, dan `bukan palindrom`. Karena masukan dikirim lewat `printf`, jawabanmu tidak tampil di layar sebelum hasilnya; saat kamu mengetik langsung, jawabanmu tampil setelah pertanyaan.

**Ulang berjarak.** 1: `` `Halo, ${nama}!` ``. 2: `teks.toUpperCase()` dan `"a-b-c".split("-")`. 3: agar spasi di tepi dan perbedaan huruf besar dan kecil tidak membuat dua teks yang sebenarnya sama dianggap berbeda.

## Langkah berikutnya

Modul berikut: `b-x2-m3` (objek dan JSON), yang mengelompokkan beberapa nilai bernama dan menyimpannya sebagai teks. Modul terkait: `matkom-teks-gambar-suara` untuk gambaran bagaimana teks disimpan sebagai angka. Bacaan lanjut: halaman MDN tentang `String` dan templat literal.
