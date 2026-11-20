## Untuk siapa modul ini

Modul ini untuk murid kelas X jalur B (Web dengan JavaScript, TypeScript, dan Bun), minggu `B-X2-M6` silabus v1.4.1: DOM dan peristiwa. Prasyarat: modul `b-x2-m5` (CSS dasar dan responsif) dan `b-x1-m12` (fungsi); kamu memakai halaman HTML dan CSS dari minggu-minggu sebelumnya.

Modul ini karangan penyusun dan disetujui pemilik program pada 2026-11-20 (keputusan lewat dialog; catatan tinjauan menjadi tindak lanjut revisi). Butir `E-LD-f` (media digital untuk produksi dan diseminasi konten, partisipasi, kolaborasi) dipetakan silabus sebagai dipenuhi jalur ini; pemenuhan butir mengikuti pemetaan silabus, bukan status modul.

Skrip halaman web berjalan di peramban, bukan di Bun. Penyusun membukanya di Google Chrome 158 tanpa kepala (per 2026-11) lewat halaman uji yang memanggil `click()` pada tombol (klik buatan, bukan klik manusia) lalu membaca isi halaman; hasil di bawah adalah hasil bacaan itu. `check:module-code` hanya memeriksa sintaks blok skrip peramban. `Latihan bercampur` berupa skrip Bun biasa. Tugas baca-dan-prediksi ditandai `AI: tanpa AI`; selain itu AI generatif boleh dipakai dengan etika dan dicatat, tanpa data pribadi atau tugas bernilai pada permintaanmu. Semua isi contoh karangan.

## Ingat kembali

Jawab dari ingatan, baru cek di bagian kunci. Soal 1 dari `b-x2-m5`, soal 2 dari `b-x2-m3`, soal 3 dari `b-x1-m12`.

1. Sebutkan empat lapisan model kotak dari dalam ke luar, dan apa yang diubah `box-sizing: border-box`.
2. Apa yang dikerjakan `JSON.stringify` dan `JSON.parse`?
3. Apa beda parameter dan argumen?

## Tujuan

Setelah modul ini kamu dapat:

- menjelaskan DOM sebagai pohon objek yang mewakili halaman dan yang dapat diubah skrip;
- memilih elemen dengan `document.querySelector` dan mengubah isinya dengan `textContent`;
- memasang pendengar peristiwa dengan `addEventListener` untuk `click` dan `submit`;
- menambah elemen dengan `createElement` dan mengubah kelas dengan `classList.toggle`;
- membuat halaman interaktif sederhana (keluaran minggu ini: penghitung klik dan daftar tugas).

## Prediksi dulu

Baca halaman berikut dan **tebak dulu, tulis jawabanmu, baru jalankan**. Peramban menjalankan skrip setelah membaca elemen di atasnya.

```html
<p id="hasil">Belum ada klik</p>
<button id="b">Klik</button>
<script>
let n = 0;
document.querySelector("#b").addEventListener("click", () => {
  n = n + 2;
  document.querySelector("#hasil").textContent = "Nilai: " + n;
});
</script>
```

1. Apa isi paragraf `#hasil` sebelum ada klik?
2. Apa isinya setelah tombol diklik tiga kali?
3. Mengapa isi paragraf tidak berubah saat halaman selesai dimuat?

## Contoh terselesaikan

Pada percobaan penyusun, paragraf awalnya `Belum ada klik` dan setelah tiga klik buatan berisi `Nilai: 6`. Skrip hanya *mendaftarkan* fungsi; fungsi itu dijalankan setiap kali peristiwa `click` terjadi.

**DOM.** Menurut MDN, DOM (Document Object Model) mewakili dokumen sebagai pohon logis yang tiap cabangnya berakhir di sebuah simpul berisi objek, dan lewat metodenya skrip dapat mengubah struktur, gaya, atau isi halaman. DOM bukan bagian bahasa JavaScript, melainkan antarmuka peramban; itu sebabnya `document` tidak ada di skrip Bun biasa.

**Memilih dan mengubah.** `document.querySelector("#jumlah")` mengembalikan elemen pertama yang cocok dengan selektor CSS (selektor yang sama seperti di `b-x2-m5`), atau `null` bila tidak ada yang cocok, menurut MDN. `textContent` membaca atau mengisi teks elemen. **Peristiwa** (event) adalah kejadian seperti klik atau pengiriman formulir; menurut MDN, `addEventListener(jenis, fungsi)` memasang fungsi yang dipanggil setiap kali peristiwa berjenis itu terjadi pada elemen.

Penghitung klik lengkap. Skrip di akhir `body` supaya semua elemen sudah ada saat `querySelector` dipanggil.

```html
<!doctype html>
<html lang="id">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Penghitung klik</title>
  </head>
  <body>
    <h1>Penghitung klik</h1>
    <p>Jumlah klik: <span id="jumlah">0</span></p>
    <button id="tambah" type="button">Tambah</button>
    <button id="ulang" type="button">Ulang dari nol</button>
    <script src="hitung.js"></script>
  </body>
</html>
```

```js
// hitung.js
let jumlah = 0;
const tampilan = document.querySelector("#jumlah");
const tombolTambah = document.querySelector("#tambah");
const tombolUlang = document.querySelector("#ulang");

function perbarui() {
  tampilan.textContent = jumlah;
}

tombolTambah.addEventListener("click", () => {
  jumlah = jumlah + 1;
  perbarui();
});

tombolUlang.addEventListener("click", () => {
  jumlah = 0;
  perbarui();
});
```

Hasil bacaan penyusun: awal `0`; setelah tiga klik pada `Tambah` `3`; setelah satu klik pada `Ulang dari nol` `0`. Bila skrip yang sama dipindah ke `head` tanpa `defer`, elemen belum ada: pada percobaan penyusun terjadi galat `Cannot read properties of null (reading 'addEventListener')`. Dengan `<script src="hitung.js" defer></script>` di `head`, penghitung bekerja dan tidak ada galat.

Daftar tugas dengan formulir. Menurut MDN, `preventDefault()` mencegah tindakan bawaan suatu peristiwa. Tindakan bawaan `submit` adalah mengirim formulir; pada percobaan penyusun tanpa `preventDefault()` halaman dimuat ulang dan daftar kembali kosong, sehingga kita menghentikannya dan menangani sendiri. `createElement("li")` membuat elemen baru, `append` menaruhnya, dan `classList.toggle("selesai")` memasang kelas bila belum ada dan melepasnya bila sudah ada.

```html
<!doctype html>
<html lang="id">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Daftar tugas</title>
    <style>
      .selesai {
        text-decoration: line-through;
      }
    </style>
  </head>
  <body>
    <h1>Daftar tugas</h1>
    <form id="form">
      <label for="isi">Tugas baru</label>
      <input id="isi" type="text" required>
      <button type="submit">Tambah</button>
    </form>
    <ul id="daftar"></ul>
    <script src="tugas.js"></script>
  </body>
</html>
```

```js
// tugas.js
const form = document.querySelector("#form");
const isian = document.querySelector("#isi");
const daftar = document.querySelector("#daftar");

form.addEventListener("submit", (peristiwa) => {
  peristiwa.preventDefault();
  const teks = isian.value.trim();
  if (teks === "") {
    return;
  }
  const butir = document.createElement("li");
  butir.textContent = teks;
  daftar.append(butir);
  isian.value = "";
});

daftar.addEventListener("click", (peristiwa) => {
  if (peristiwa.target.tagName === "LI") {
    peristiwa.target.classList.toggle("selesai");
  }
});
```

Hasil bacaan penyusun: mengirim `Belajar CSS-contoh`, lalu isian berisi spasi saja, lalu `<b>tebal</b>` menghasilkan dua butir (isian spasi ditolak oleh `trim()`), dan kolom isian kosong kembali. Butir ketiga tampil sebagai teks apa adanya, `<b>tebal</b>`, tanpa elemen anak, karena diisi dengan `textContent`. MDN menyarankan tidak memakai `innerHTML` untuk teks karena ia memperlakukan isinya sebagai HTML mentah dan rentan serangan XSS; pembahasan keamanan menyusul di `b-xi2-m10`. Satu klik pada butir memberinya kelas `selesai`; klik kedua melepasnya. `peristiwa.target` adalah elemen yang diklik; pemeriksaan `tagName` mencegah klik pada ruang kosong daftar memasang kelas.

## Contoh setengah jadi

Halaman sapaan karangan: isian nama, tombol, dan paragraf `#salam`. Lengkapi bagian `____`: metode pemilih elemen, metode pemasang pendengar, properti isi isian, dan properti teks elemen.

```html
<input id="nama" type="text">
<button id="sapa" type="button">Sapa</button>
<p id="salam"></p>
<script>
const isian = document.querySelector("#nama");
const tombol = document.querySelector("#sapa");
const salam = document.____("#salam");

tombol.____("click", () => {
  const nama = isian.____.trim();
  salam.____ = `Halo, ${nama}!`;
});
</script>
```

## Soal Parsons

Susun baris-baris di bawah (sudah diacak) menjadi `hitung.js` yang bekerja. Baris (e), (f), dan (g) boleh bertukar tempat asal semuanya mendahului (b).

```text
(a)   jumlah = jumlah + 1;
(b) tombol.addEventListener("click", () => {
(c)   tampilan.textContent = jumlah;
(d) });
(e) const tombol = document.querySelector("#tambah");
(f) let jumlah = 0;
(g) const tampilan = document.querySelector("#jumlah");
```

## Latihan

1. `AI: tanpa AI` **Baca dan prediksi.** Tanpa menjalankan, tulis isi atribut `class` paragraf setelah tombol diklik 1, 2, dan 3 kali:

   ```html
   <p id="p" class="a">Teks</p>
   <button id="b">Ganti</button>
   <script>
   document.querySelector("#b").addEventListener("click", () => {
     document.querySelector("#p").classList.toggle("b");
   });
   </script>
   ```
2. `AI: boleh` **Kurangi tanpa minus.** Tambahkan tombol `Kurang` pada penghitung klik; nilai tidak boleh di bawah 0. Tulis dulu tiga langkah rencanamu (pilih elemen, pasang pendengar, ubah isi).
3. `AI: boleh` **Hitung tugas selesai.** Pada daftar tugas, tampilkan banyak butir berkelas `selesai` di sebuah `p`. Perbarui setiap kali butir ditambah atau diklik.
4. `AI: boleh` **Perbaiki galat.** Letakkan `<script src="hitung.js"></script>` di `head` tanpa `defer`, buka konsol peramban (biasanya tombol F12), dan catat pesan galat. Perbaiki dengan dua cara berbeda.
5. *Opsional:* **catatan pemakaian AI.** Kerjakan nomor 2 sendiri dulu, lalu minta penjelasan atau petunjuk bertahap, bukan skrip jadi. Catat alatnya, tujuanmu, garis besar perintahmu, bagian yang kamu pakai, dan cara memeriksanya. Jangan menaruh data pribadi atau tugas bernilai pada perintah.

## Latihan bercampur

Keduanya skrip Bun biasa (tanpa `document`), dari `b-x1-m12`, `b-x2-m1`, `b-x2-m2`, dan `b-x2-m3`.

1. Tulis fungsi `tambahTugas(daftar, teks)` yang mengembalikan array baru berisi tugas lama dan objek `{ teks, selesai: false }`, serta `hitungSelesai(daftar)`. Tandai tugas pertama selesai, lalu cetak `JSON.stringify(daftar)` dan banyak yang selesai.
2. Dari teks JSON daftar dua tugas, hasilkan teks `<li>` untuk tiap tugas dengan `JSON.parse`, `map`, templat, dan `join`; tugas selesai diberi `class="selesai"`. Skrip ini hanya mencetak teks; memasang ke halaman memakai `textContent`.

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `b-x2-m7` (pertanyaan 1), sekitar tiga minggu lagi di `b-x2-m9` (pertanyaan 2), dan sekitar delapan minggu lagi, modul `b-x2-m14` (pertanyaan 3). Jawab sekarang lalu simpan.

1. Apa yang dilakukan `addEventListener("click", fungsi)`, dan kapan `fungsi` dijalankan?
2. Mengapa `document.querySelector` dapat mengembalikan `null`, dan bagaimana mencegahnya?
3. Mengapa teks dari pengguna dipasang dengan `textContent`, bukan `innerHTML`?

## Kesalahan umum

- **Skrip dijalankan sebelum elemennya ada.** `querySelector` mengembalikan `null` dan `null.addEventListener` menimbulkan galat. Taruh skrip di akhir `body` atau beri `defer`.
- **Menjalankan fungsi, bukan mendaftarkannya.** `addEventListener("click", perbarui())` memanggil `perbarui` saat itu juga dan mendaftarkan hasilnya. Tulis `perbarui`, atau fungsi panah `() => perbarui()`.
- **Memakai `innerHTML` untuk teks pengguna.** Tag di dalam teks menjadi HTML yang dijalankan peramban. Pakai `textContent`.
- **Lupa `preventDefault()` pada `submit`.** Pada percobaan penyusun halaman dimuat ulang dan butir yang baru ditambah hilang.

## Cek mandiri

- [ ] Saya dapat memilih elemen dan mengubah teksnya dengan `querySelector` dan `textContent`.
- [ ] Saya dapat memasang pendengar `click` dan `submit`.
- [ ] Saya dapat menambah elemen dan mengganti kelas dengan `createElement` dan `classList.toggle`.
- [ ] Saya dapat menjelaskan galat `null` dan memperbaikinya.

## Kunci dan petunjuk

**Ingat kembali.** 1: isi, padding, border, margin; `border-box` membuat `width` mencakup isi, padding, dan border. 2: `JSON.stringify` mengubah nilai JavaScript menjadi teks JSON; `JSON.parse` mengubah teks JSON menjadi nilai. 3: parameter adalah nama di definisi fungsi; argumen adalah nilai yang diberikan saat fungsi dipanggil.

**Prediksi dulu.** 1: `Belum ada klik`. 2: `Nilai: 6` (tiga kali menambah 2; hasil bacaan penyusun). 3: skrip hanya mendaftarkan fungsi; isi paragraf baru diubah saat peristiwa `click` terjadi.

**Contoh setengah jadi.** Isian berurutan: `querySelector`, `addEventListener`, `value`, `textContent`. Hasil bacaan penyusun untuk isian `  Dewi-contoh ` lalu klik: `Halo, Dewi-contoh!`. Kunci lengkap:

```html
<input id="nama" type="text">
<button id="sapa" type="button">Sapa</button>
<p id="salam"></p>
<script>
const isian = document.querySelector("#nama");
const tombol = document.querySelector("#sapa");
const salam = document.querySelector("#salam");

tombol.addEventListener("click", () => {
  const nama = isian.value.trim();
  salam.textContent = `Halo, ${nama}!`;
});
</script>
```

**Soal Parsons.** Urutan benar: f, g, e, b, a, c, d (dengan f, g, e boleh bertukar tempat). Variabel dan elemen disiapkan lebih dulu; pendengar dipasang; di dalamnya jumlah ditambah lalu ditampilkan; terakhir kurung penutup.

**Latihan.** 1: setelah klik 1: `a b`; klik 2: `a`; klik 3: `a b` (`toggle` memasang atau melepas kelas `b`; hasil bacaan penyusun sama). 2: rencana: pilih `#kurang`; pasang pendengar `click`; di dalamnya `if (jumlah > 0) { jumlah = jumlah - 1; }` lalu `perbarui()`. 3: setelah tiap perubahan hitung `daftar.querySelectorAll(".selesai").length` dan isikan ke `p` dengan `textContent`. 4: pesan galat pada percobaan penyusun: `Cannot read properties of null (reading 'addEventListener')`. Dua perbaikan: pindahkan `<script>` ke akhir `body`, atau beri atribut `defer`.

**Latihan bercampur.** Kunci yang dijalankan:

```js
// tugas-murni.js
function tambahTugas(daftar, teks) {
  return daftar.concat([{ teks, selesai: false }]);
}

function hitungSelesai(daftar) {
  return daftar.filter((t) => t.selesai).length;
}

let daftar = [];
daftar = tambahTugas(daftar, "Belajar CSS-contoh");
daftar = tambahTugas(daftar, "Membaca-contoh");
daftar[0].selesai = true;
console.log(JSON.stringify(daftar));
console.log(hitungSelesai(daftar));

const json = '[{"teks":"Belajar CSS-contoh","selesai":true},{"teks":"Membaca-contoh","selesai":false}]';
const butir = JSON.parse(json)
  .map((t) => `<li${t.selesai ? ' class="selesai"' : ""}>${t.teks}</li>`)
  .join("\n");
console.log(butir);
```

```text
[{"teks":"Belajar CSS-contoh","selesai":true},{"teks":"Membaca-contoh","selesai":false}]
1
<li class="selesai">Belajar CSS-contoh</li>
<li>Membaca-contoh</li>
```

**Ulang berjarak.** 1: memasang `fungsi` agar dijalankan setiap kali peristiwa `click` terjadi pada elemen itu, bukan saat pemasangan. 2: karena tidak ada elemen yang cocok (selektor salah atau skrip berjalan sebelum elemen ada); periksa selektornya, taruh skrip di akhir `body` atau beri `defer`. 3: `textContent` memperlakukan isinya sebagai teks biasa; `innerHTML` memperlakukannya sebagai HTML sehingga rentan XSS.

## Langkah berikutnya

Modul berikut: `b-x2-m7` (struktur data: tumpukan dan antrian), yang kembali ke skrip Bun biasa; kamu dapat menghubungkannya ke halaman seperti ini nanti. Bacaan lanjut: halaman MDN tentang DOM, `querySelector`, `addEventListener`, dan `textContent`.
