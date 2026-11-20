## Untuk siapa modul ini

Modul ini untuk murid kelas XI jalur B (Web dengan JavaScript, TypeScript, dan Bun), minggu `B-XI2-M8` silabus v1.4.1: prediksi sederhana. Prasyarat: modul `b-xi2-m7` (visualisasi data).

Modul ini berstatus DRAF: karangan penyusun, belum ditinjau pemilik. Butir `F-AD-a` (data terbuka, keputusan, prediksi) dipetakan silabus sebagai dipenuhi jalur ini; modul draf ini belum dihitung sebagai pemenuhan butir itu.

Contoh dijalankan penyusun dengan Bun 1.4.4 dan TypeScript 7.0.2 per 2026-11, tanpa pustaka tambahan, tanpa akun, dan tanpa layanan luar. **Semua data di modul ini karangan** (pengunjung ruang baca sebuah sekolah fiktif), bukan data nyata. Tugas baca-dan-prediksi ditandai `AI: tanpa AI`; selain itu AI generatif boleh dipakai dengan etika dan dicatat, tanpa data pribadi, kata sandi, atau tugas bernilai pada permintaanmu, dan kode buatan AI harus kamu baca, jalankan, dan uji sendiri.

## Ingat kembali

Jawab dari ingatan dulu, baru cek di bagian kunci. Soal 1 dari `b-xi2-m7`, soal 2 dari `b-xi2-m5`, soal 3 dari `b-x2-m10`.

1. Mengapa grafik batang harus memakai sumbu yang mulai dari nol, dan apa yang terjadi bila sumbunya dipotong?
2. Apa arti `NA` pada berkas CSV tadi, dan apa yang terjadi bila ia diubah dengan `Number()` lalu dijumlahkan?
3. Apa hasil `Number("")` dan `Number("9o")`, dan bagaimana memeriksa bahwa hasilnya angka yang sah?

## Tujuan

Setelah modul ini kamu dapat:

- menghitung rata-rata bergerak dan memakainya sebagai tebakan nilai berikutnya;
- menghitung garis kecenderungan (kemiringan dan titik potong) dan memakainya untuk meramal;
- mengukur seberapa meleset sebuah prediksi dengan galat rata-rata mutlak, dihitung pada data yang tidak dipakai menyusun prediksi;
- menyatakan batas sebuah prediksi dengan jujur (keluaran minggu ini: skrip prediksi dan galatnya).

## Prediksi dulu

Ini tugas baca-dan-prediksi, `AI: tanpa AI`. **Tebak dulu, tulis jawabanmu, baru jalankan.**

```ts
function rataBergerak(data: number[], lebar: number): number[] {
  const hasil: number[] = [];
  for (let i = lebar; i <= data.length; i++) {
    const potongan = data.slice(i - lebar, i);
    const jumlah = potongan.reduce((a, b) => a + b, 0);
    hasil.push(jumlah / lebar);
  }
  return hasil;
}

console.log(rataBergerak([10, 20, 30, 40], 2));
console.log(rataBergerak([4, 4, 4, 10], 3));
```

1. Apa dua baris yang tercetak?
2. Data pertama naik teratur. Bila rata-rata dua terakhir dipakai untuk menebak nilai berikutnya, apakah tebakannya lebih rendah atau lebih tinggi dari nilai yang kamu harapkan, dan mengapa?

## Contoh terselesaikan

Keluaran program tadi:

```text
[ 15, 25, 35 ]
[ 4, 6 ]
```

Rata-rata bergerak (*moving average*) meratakan beberapa nilai terakhir, sehingga lonjakan tunggal ditekan: `[4, 4, 4, 10]` dengan lebar 3 memberi 4 lalu 6, bukan melonjak ke 10. Harganya: pada data yang naik teratur ia **tertinggal**, karena nilai lama ikut dirata-ratakan. Data `[10, 20, 30, 40]` memberi tebakan 35 padahal polanya mengarah ke 50.

**Data dan uji mundur.** Sebuah prediksi baru berarti bila diuji pada data yang tidak dipakai menyusunnya. Kita pura-pura belum tahu minggu ke-4 dan seterusnya, menebaknya dari tiga minggu sebelumnya, lalu membandingkannya dengan nilai sebenarnya. Selisih rata-rata tanpa tanda disebut **galat rata-rata mutlak**: `jumlah |nyata − tebakan| / banyak data`. Data karangan: pengunjung ruang baca sekolah fiktif per minggu selama 10 minggu.

```ts
const pengunjung = [12, 15, 14, 18, 20, 19, 23, 25, 24, 28];

function rataBergerak(data: number[], lebar: number): number[] {
  const hasil: number[] = [];
  for (let i = lebar; i <= data.length; i++) {
    const potongan = data.slice(i - lebar, i);
    hasil.push(potongan.reduce((a, b) => a + b, 0) / lebar);
  }
  return hasil;
}

function galatRataMutlak(nyata: number[], tebakan: number[]): number {
  let total = 0;
  for (let i = 0; i < nyata.length; i++) {
    total += Math.abs((nyata[i] ?? 0) - (tebakan[i] ?? 0));
  }
  return total / nyata.length;
}

// Tebakan minggu ke-4 sampai ke-10 = rata-rata tiga minggu sebelumnya.
const rb = rataBergerak(pengunjung, 3);
const tebakan = rb.slice(0, -1);
const nyata = pengunjung.slice(3);
console.log("tebakan:", tebakan.map((x) => x.toFixed(1)).join(" "));
console.log("nyata:  ", nyata.join(" "));
console.log("galat rata-rata mutlak:", galatRataMutlak(nyata, tebakan).toFixed(2));
console.log("tebakan minggu ke-11:", rb[rb.length - 1]?.toFixed(1));
```

```text
tebakan: 13.7 15.7 17.3 19.0 20.7 22.3 24.0
nyata:   18 20 19 23 25 24 28
galat rata-rata mutlak: 3.48
tebakan minggu ke-11: 25.7
```

Tebakan selalu di bawah nilai nyata: itulah ketertinggalan tadi, dan galat rata-rata 3,48 pengunjung. Itu bukan kegagalan program; itu sifat metodenya pada data yang cenderung naik.

**Garis kecenderungan.** Bila data naik atau turun teratur, kita bisa menarik garis lurus `y = titikPotong + kemiringan × x` dengan `x` = nomor minggu. Cara paling umum memilih garisnya adalah kuadrat terkecil: `kemiringan = Σ(x − rataX)(y − rataY) / Σ(x − rataX)²`, lalu `titikPotong = rataY − kemiringan × rataX`. Hitung dulu di kertas untuk data kecil `[3, 5, 6, 10]` (x = 1 sampai 4): `rataX = 2,5`, `rataY = 6`, pembilang `4,5 + 0,5 + 0 + 6 = 11`, penyebut `5`, sehingga kemiringan 2,2 dan titik potong 0,5; untuk minggu ke-5 garis meramal `0,5 + 2,2 × 5 = 11,5`. Sekarang kedua cara diadu pada data pengunjung dengan uji mundur: tiap minggu mulai minggu ke-6 ditebak hanya dari minggu-minggu sebelumnya.

```ts
const pengunjung = [12, 15, 14, 18, 20, 19, 23, 25, 24, 28];

function rataTerakhir(data: number[], lebar: number): number {
  const potongan = data.slice(-lebar);
  return potongan.reduce((a, b) => a + b, 0) / lebar;
}

function garis(data: number[]): (x: number) => number {
  const n = data.length;
  const rataX = (n + 1) / 2;
  const rataY = data.reduce((a, b) => a + b, 0) / n;
  let atas = 0;
  let bawah = 0;
  data.forEach((y, i) => {
    atas += (i + 1 - rataX) * (y - rataY);
    bawah += (i + 1 - rataX) ** 2;
  });
  const m = atas / bawah;
  const c = rataY - m * rataX;
  return (x) => c + m * x;
}

let galatRB = 0;
let galatGaris = 0;
let banyak = 0;
console.log("minggu  nyata  rb3   garis");
for (let t = 5; t < pengunjung.length; t++) {
  const latih = pengunjung.slice(0, t);
  const nyata = pengunjung[t] ?? 0;
  const a = rataTerakhir(latih, 3);
  const b = garis(latih)(t + 1);
  galatRB += Math.abs(nyata - a);
  galatGaris += Math.abs(nyata - b);
  banyak++;
  console.log(`${t + 1}       ${nyata}     ${a.toFixed(1)}  ${b.toFixed(1)}`);
}
console.log("galat rb3  :", (galatRB / banyak).toFixed(2));
console.log("galat garis:", (galatGaris / banyak).toFixed(2));
console.log("minggu ke-11 (garis, semua data):", garis(pengunjung)(11).toFixed(1));
```

```text
minggu  nyata  rb3   garis
6       19     17.3  21.5
7       23     19.0  21.7
8       25     20.7  24.0
9       24     22.3  26.2
10       28     24.0  27.0
galat rb3  : 3.13
galat garis: 1.59
minggu ke-11 (garis, semua data): 29.0
```

Pada data yang menanjak ini garis lebih dekat (galat 1,59 melawan 3,13). Kesimpulannya terbatas: lima titik uji, satu data karangan, dan satu jenis galat. Meramal minggu ke-11 dengan 29,0 berarti "bila pola naik sekitar 1,7 pengunjung per minggu berlanjut", bukan "akan terjadi". Makin jauh ke depan, makin lemah dasarnya; program tidak tahu ada libur, ujian, atau perubahan jadwal.

## Contoh setengah jadi

Lengkapi fungsi galat rata-rata mutlak di bawah, lalu cocokkan dengan kunci. Rumus: `jumlah |nyata − tebakan| / banyak data`.

```ts setengah-jadi
function galatRataMutlak(nyata: number[], tebakan: number[]): number {
  let total = 0;
  for (let i = 0; i < nyata.length; i++) {
    total += Math.abs((nyata[i] ?? 0) - (tebakan[i] ?? ____));
  }
  return total / ____;
}
console.log(galatRataMutlak([18, 20, 19], [17, 21, 19]));
```

Berapa yang tercetak, dan mengapa tanda selisih dibuang dengan `Math.abs`?

## Soal Parsons

Susun baris berikut menjadi fungsi `rataBergerak` yang benar (kunci di bawah). Ada satu baris yang tidak terpakai.

```text
  return hasil;
  hasil.reverse();
function rataBergerak(data: number[], lebar: number): number[] {
  for (let i = lebar; i <= data.length; i++) {
    const hasil: number[] = [];
    hasil.push(potongan.reduce((a, b) => a + b, 0) / lebar);
    const potongan = data.slice(i - lebar, i);
  }
}
}
```

## Latihan

1. `AI: boleh` Tulis `rataBergerak` sendiri (tanpa menyalin) dan hitung untuk `[2, 4, 6, 8, 10]` dengan lebar 2 dan lebar 4. Mana yang tertinggal lebih jauh dari nilai terakhir 10, dan mengapa?
2. `AI: tanpa AI` Hitung dengan tangan garis kecenderungan untuk `[3, 5, 6, 10]` dan ramal minggu ke-6. Lalu jalankan versi program dan bandingkan.
3. `AI: boleh` Ganti data contoh dengan `[20, 22, 21, 23, 22, 21, 23, 22, 21, 22]` dan jalankan uji mundur. Tebak dulu metode mana yang galatnya lebih kecil, lalu buktikan. Apa yang kamu simpulkan tentang "garis selalu lebih baik"?
4. `AI: boleh` Tulis tiga kalimat tentang batas prediksi pengunjung minggu ke-20 dari sepuluh minggu data: apa yang tidak diketahui program?
5. `AI: boleh` (opsional) Catatan pemakaian AI: alat, tujuan, garis besar perintah, bagian yang dipakai, dan cara kamu memeriksanya.

## Latihan bercampur

1. `AI: boleh` (dari `b-x2-m10`) Data mentah `'[5, 7, "x", 9, null, 11]'` dibaca dari JSON. Saring hanya angka sah lalu hitung rata-rata bergerak lebar 2. Mengapa data mentah tidak langsung dimasukkan ke fungsi prediksi?
2. `AI: boleh` (dari `b-xi2-m7`) Ubah `[12, 15, 14]` menjadi tinggi batang 0 sampai 100 (nilai terbesar 15 menjadi 100). Mengapa batang yang memuat prediksi perlu diberi warna atau label berbeda dari data nyata?

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `b-xi2-m9` (pertanyaan 1), sekitar tiga minggu lagi di `b-xi2-m11` (pertanyaan 2), dan sekitar delapan minggu lagi di semester berikutnya, modul `b-xii1-m2` (pertanyaan 3). Jawab sekarang lalu simpan.

1. Apa beda rata-rata bergerak dan garis kecenderungan, dan pada data seperti apa rata-rata bergerak tertinggal?
2. Mengapa prediksi diuji pada data yang tidak dipakai menyusunnya?
3. Mengapa ramalan jauh ke depan dari data yang sedikit tidak boleh dianggap pasti?

## Kesalahan umum

- **Menyebut prediksi sebagai kepastian.** Prediksi adalah perkiraan bersyarat: "bila pola ini berlanjut".
- **Menguji pada data yang sama dengan data penyusun.** Galatnya tampak kecil karena program sudah "melihat jawabannya"; pakai uji mundur.
- **Memakai lebar jendela sembarang.** Jendela besar sangat halus tetapi tertinggal; jendela kecil mengikuti data tetapi ikut berguncang. Coba beberapa dan bandingkan galatnya.
- **Mengira garis selalu menang.** Pada data yang datar atau berguncang tanpa arah, rata-rata justru lebih dekat (soal Latihan 3).
- **Tertukar `x` dan indeks.** Indeks larik mulai dari 0, nomor minggu mulai dari 1; pilih satu dan konsisten.
- **Lupa data mentah belum bersih.** Nilai kosong atau teks yang lolos menghasilkan `NaN` diam-diam.

## Cek mandiri

- [ ] Saya dapat menghitung rata-rata bergerak dan menjelaskan mengapa ia tertinggal pada data menanjak.
- [ ] Saya dapat menghitung kemiringan dan titik potong garis kecenderungan untuk data kecil.
- [ ] Saya dapat menghitung galat rata-rata mutlak dan menjelaskan mengapa uji mundur diperlukan.
- [ ] Saya dapat menyebut batas sebuah prediksi dengan jujur.

## Kunci dan petunjuk

**Ingat kembali.** 1: tinggi batang menyandikan nilai; bila sumbu dipotong, perbandingan tinggi tidak lagi sebanding dengan perbandingan nilai dan selisih kecil tampak besar. 2: `NA` adalah penanda data hilang; `Number("NA")` adalah `NaN` dan jumlah yang melibatkannya menjadi `NaN`. 3: `Number("")` adalah 0 dan `Number("9o")` adalah `NaN`; periksa dengan `Number.isNaN(hasil)` setelah menangani nilai kosong.

**Prediksi dulu.** 1: `[ 15, 25, 35 ]` dan `[ 4, 6 ]`. 2: lebih rendah: tebakan 35 padahal pola naik 10 per langkah mengarah ke 50, karena nilai lama ikut dirata-ratakan.

**Contoh setengah jadi.** Kunci, dijalankan penyusun (selisihnya 1, 1, 0 sehingga 2 dibagi 3):

```ts
function galatRataMutlak(nyata: number[], tebakan: number[]): number {
  let total = 0;
  for (let i = 0; i < nyata.length; i++) {
    total += Math.abs((nyata[i] ?? 0) - (tebakan[i] ?? 0));
  }
  return total / nyata.length;
}
console.log(galatRataMutlak([18, 20, 19], [17, 21, 19]));
```

```text
0.6666666666666666
```

`Math.abs` membuang tanda agar selisih positif dan negatif tidak saling menghapus; tanpa itu galat bisa tampak nol padahal tebakan meleset ke dua arah.

**Soal Parsons.** Urutan yang benar: `function rataBergerak...{`, `const hasil: number[] = [];` (di luar perulangan, sebelum `for`), `for (...) {`, `const potongan = ...;`, `hasil.push(...);`, `}` penutup `for`, `return hasil;`, `}` penutup fungsi. Baris `hasil.reverse();` tidak terpakai (ia membalik urutan hasil). Kunci dijalankan penyusun:

```ts
function rataBergerak(data: number[], lebar: number): number[] {
  const hasil: number[] = [];
  for (let i = lebar; i <= data.length; i++) {
    const potongan = data.slice(i - lebar, i);
    hasil.push(potongan.reduce((a, b) => a + b, 0) / lebar);
  }
  return hasil;
}

console.log(rataBergerak([1, 2, 3, 4], 2));
```

```text
[ 1.5, 2.5, 3.5 ]
```

**Latihan.** 1: lebar 2 memberi `[3, 5, 7, 9]` dan lebar 4 memberi `[5, 7]` (dijalankan penyusun). Nilai terakhir 10: tebakan terakhir lebar 2 adalah 9 (selisih 1), lebar 4 adalah 7 (selisih 3). Jendela yang lebih lebar tertinggal lebih jauh pada data yang naik teratur, karena lebih banyak nilai lama ikut dirata-ratakan. 2: kemiringan 2,2, titik potong 0,5, minggu ke-6: `0,5 + 2,2 × 6 = 13,7`; versi program memberi `13.700000000000001` karena pembulatan bilangan pecahan, jadi bandingkan dengan `toFixed(1)`. 3: dijalankan penyusun: galat rata-rata tiga minggu 0,60 dan garis 1,13, jadi pada data datar rata-rata lebih dekat; garis tidak selalu lebih baik. 4: contoh jawaban: program tidak tahu jadwal ujian atau libur, tidak tahu apakah pola naik berhenti, dan hanya mengandalkan sepuluh titik; sepuluh minggu ke depan memperbesar semua ketidakpastian itu. 5: tidak ada kunci tunggal. Keluaran soal 3:

```text
minggu  nyata  rb3   garis
6       21     22.0  23.1
7       23     22.0  22.2
8       22     22.0  22.9
9       21     22.0  22.7
10       22     22.0  22.2
galat rb3  : 0.60
galat garis: 1.13
minggu ke-11 (garis, semua data): 22.2
```

**Latihan bercampur.** 1: dijalankan penyusun:

```ts
function rataBergerak(data: number[], lebar: number): number[] {
  const hasil: number[] = [];
  for (let i = lebar; i <= data.length; i++) {
    const potongan = data.slice(i - lebar, i);
    const jumlah = potongan.reduce((a, b) => a + b, 0);
    hasil.push(jumlah / lebar);
  }
  return hasil;
}
const mentah = '[5, 7, "x", 9, null, 11]';
const bersih = (JSON.parse(mentah) as unknown[]).filter(
  (v): v is number => typeof v === "number" && Number.isFinite(v),
);
console.log(bersih, rataBergerak(bersih, 2));
const tinggi = [12, 15, 14].map((v) => Math.round((v / 15) * 100));
console.log(tinggi);
```

```text
[ 5, 7, 9, 11 ] [ 6, 8, 10 ]
[ 80, 100, 93 ]
```

Data mentah belum tentu angka; satu `NaN` akan menular ke seluruh rata-rata. 2: tingginya `[80, 100, 93]` (keluaran di atas). Batang prediksi dibedakan agar pembaca tidak mengira itu data yang terukur.

**Ulang berjarak.** 1: rata-rata bergerak meratakan beberapa nilai terakhir; garis kecenderungan menarik garis lurus lewat seluruh data; rata-rata bergerak tertinggal pada data yang naik atau turun teratur. 2: galat yang dihitung pada data penyusun terlalu optimistis; data yang disembunyikan menunjukkan seberapa meleset prediksi pada hal yang belum dilihat. 3: dasarnya hanya pola yang lalu; makin jauh dan makin sedikit datanya, makin besar peluang pola itu berubah.

## Langkah berikutnya

Modul berikut: `b-xi2-m9` (mengonsumsi API publik), tempat data datang dari layanan lain lewat `fetch`. Modul terkait: `matkom-pertumbuhan-fungsi` untuk membaca pola naik. Bacaan lanjut: halaman MDN tentang `Array.prototype.slice` dan `Array.prototype.reduce`.
