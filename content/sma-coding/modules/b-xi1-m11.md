## Untuk siapa modul ini

Modul ini untuk murid kelas XI jalur B (Web dengan JavaScript, TypeScript, dan Bun), minggu `B-XI1-M11` silabus v1.4.1: kualitas kode. Prasyarat: modul `b-xi1-m10` (efisiensi) dan `b-xi1-m7` (pengujian dengan `bun test`).

Modul ini karangan penyusun dan disetujui pemilik program pada 2026-11-20 (keputusan lewat dialog; catatan tinjauan menjadi tindak lanjut revisi). Butir `F-AP-c` (pemeliharaan dan kualitas kode) dipetakan silabus sebagai dipenuhi jalur ini; pemenuhan butir mengikuti pemetaan silabus, bukan status modul.

Contoh dijalankan penyusun dengan Bun 1.4.4, TypeScript 7.0.2, dan Biome 2.6.8 per 2026-11. Biome dipasang dari registri paket publik dengan `bun add -d @biomejs/biome`: tidak ada akun, tetapi perlu jaringan sekali; gurumu dapat menyiapkan paketnya lebih dulu. Pesan Biome dan nomor versi di komputermu bisa sedikit berbeda. Tugas baca-dan-prediksi ditandai `AI: tanpa AI`; selain itu AI generatif boleh dipakai dengan etika dan dicatat, tanpa data pribadi, kata sandi, atau tugas bernilai pada permintaanmu.

## Ingat kembali

Jawab dari ingatan dulu, baru cek di bagian kunci. Soal 1 dari `b-xi1-m10`, soal 2 dari `b-xi1-m8`, soal 3 dari `b-xi1-m3`.

1. Mengapa mengukur waktu satu kali saja tidak cukup untuk membandingkan dua solusi?
2. Mengapa BFS memerlukan catatan "sudah dikunjungi" pada graf yang berputar?
3. Mengapa `pertama<T>(daftar: T[])` mengembalikan `T | undefined`, bukan `T`?

## Tujuan

Setelah modul ini kamu dapat:

- memasang dan mengatur linter dan pemformat di proyek Bun;
- membedakan tugas linter (menemukan kode yang mencurigakan) dan pemformat (merapikan tata letak);
- memperbaiki temuan linter dengan memahami alasannya, bukan menurut saja;
- menulis kode terbaca: nama jelas, fungsi pendek, komentar yang menjelaskan alasan (keluaran minggu ini: konfigurasi lint).

## Prediksi dulu

Ini tugas baca-dan-prediksi, `AI: tanpa AI`. **Tebak dulu, tulis jawabanmu, baru jalankan.**

```ts
function jumlah(a:number,b:number){ return a+b }
const sisa = 10
let total = 0
for (let i=0;i<3;i++) { total = jumlah(total, i) }
if (total == 3) console.log("tiga")
```

1. Apa yang tercetak bila program dijalankan?
2. Tulis dua hal yang menurutmu akan diprotes pemeriksa kode karena mencurigakan (bukan sekadar rapi), dan satu hal yang akan diubah pemformat.

## Contoh terselesaikan

Program tadi mencetak `tiga`: jalan, tetapi tidak sehat. **Linter** membaca kode tanpa menjalankannya dan menandai yang mencurigakan; **pemformat** hanya mengatur tata letak (spasi, titik koma, baris baru) tanpa mengubah arti. Pasang Biome sebagai dependensi pengembangan, buat konfigurasi, dan jalankan linter:

```sh
bun add -d @biomejs/biome
bunx biome init
bunx biome lint src
```

`biome init` membuat `biome.json`; untuk modul ini isinya disederhanakan menjadi:

```json
{
  "$schema": "https://biomejs.dev/schemas/2.6.8/schema.json",
  "formatter": { "indentStyle": "space", "indentWidth": 2 },
  "linter": { "rules": { "preset": "recommended" } }
}
```

Keluaran `bunx biome lint src` pada berkas `src/berantakan.ts` berisi program tadi (garis hiasnya dipertahankan apa adanya):

```text
src/berantakan.ts:2:7 lint/correctness/noUnusedVariables  FIXABLE  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  ! This variable sisa is unused.
  
    1 │ function jumlah(a:number,b:number){ return a+b }
  > 2 │ const sisa = 10
      │       ^^^^
    3 │ let total = 0
    4 │ for (let i=0;i<3;i++) { total = jumlah(total, i) }
  
  i Unused variables are often the result of typos, incomplete refactors, or other sources of bugs.
  
  i Unsafe fix: If this is intentional, prepend sisa with an underscore.
  
    1 1 │   function jumlah(a:number,b:number){ return a+b }
    2   │ - const·sisa·=·10
      2 │ + const·_sisa·=·10
    3 3 │   let total = 0
    4 4 │   for (let i=0;i<3;i++) { total = jumlah(total, i) }
  

src/berantakan.ts:5:11 lint/suspicious/noDoubleEquals  FIXABLE  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  × Using == may be unsafe if you are relying on type coercion.
  
    3 │ let total = 0
    4 │ for (let i=0;i<3;i++) { total = jumlah(total, i) }
  > 5 │ if (total == 3) console.log("tiga")
      │           ^^
    6 │ 
  
  i == is only allowed when comparing against null.
  
  i Unsafe fix: Use === instead.
  
    5 │ if·(total·===·3)·console.log("tiga")
      │             +                       

Checked 1 file in 3ms. No fixes applied.
Found 1 error.
Found 1 warning.
lint ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  × Some errors were emitted while running checks.
  
```

Dua temuan: `const sisa` tidak pernah dipakai (peringatan; mungkin sisa ketikan atau perubahan yang belum selesai) dan `==` bisa memaksa konversi tipe (galat). Ulasan Biome menjelaskan alasannya dan menawarkan perbaikan; **baca alasannya dulu**, jangan menerima perbaikan otomatis tanpa paham. Setelah `sisa` dihapus dan `==` menjadi `===`, jalankan pemformat:

```sh
bunx biome format --write src
```

```text
Formatted 1 file in 1603µs. Fixed 1 file.
```

Berkas menjadi:

```ts
function jumlah(a: number, b: number) {
  return a + b;
}
let total = 0;
for (let i = 0; i < 3; i++) {
  total = jumlah(total, i);
}
if (total === 3) console.log("tiga");
```

Agar mudah diulang, taruh perintah di `package.json` dan gabungkan dengan pemeriksaan tipe (ingat: `bun run` tidak memeriksa tipe, `tsc` yang memeriksa):

```json
"scripts": {
  "typecheck": "tsc --noEmit",
  "lint": "biome lint src",
  "format": "biome format --write src",
  "cek": "bun run typecheck && bun run lint"
}
```

`bun run cek` pada percobaan penyusun menjalankan `tsc --noEmit` lalu `biome lint src` dan berakhir dengan `Checked 1 file in 3ms. No fixes applied.` tanpa temuan.

**Kode terbaca.** Alat tidak menggantikan penilaian. Dua fungsi berikut menghasilkan hasil yang sama; yang kedua menyatakan maksudnya lewat nama dan bentuknya:

```ts
function f(x: number[]) {
  let r = 0;
  for (let i = 0; i < x.length; i++) {
    if ((x[i] ?? 0) % 2 === 0) r += x[i] ?? 0;
  }
  return r;
}

function jumlahGenap(angka: number[]): number {
  return angka.filter((n) => n % 2 === 0).reduce((total, n) => total + n, 0);
}

const contoh = [1, 2, 3, 4, 5, 6];
console.log(f(contoh), jumlahGenap(contoh));
```

```text
12 12
```

Pedoman ringkas: nama menjelaskan isi (`jumlahGenap`, bukan `f`), satu fungsi satu tugas, angka ajaib diberi nama, dan komentar menjelaskan **mengapa**, bukan mengulang **apa** yang sudah jelas dari kodenya.

## Contoh setengah jadi

Lengkapi skrip dan konfigurasi agar `bun run cek` memeriksa tipe, linter, dan uji sekaligus.

```json setengah-jadi
"scripts": {
  "typecheck": "____ --noEmit",
  "lint": "biome ____ src",
  "test": "bun ____",
  "cek": "bun run typecheck && bun run lint && bun run ____"
}
```

## Soal Parsons

Susun langkah berikut (sudah diacak) untuk memasang linter di proyek baru. `AI: tanpa AI`.

```text
(a) bunx biome lint src
(b) bun init
(c) bunx biome init
(d) bun add -d @biomejs/biome
(e) baca alasan tiap temuan sebelum memperbaiki
```

## Latihan

1. `AI: tanpa AI` **Nama dan komentar.** Ubah fungsi `function hitung(p: number)` yang menghitung ongkos kirim (tarif dasar 8000 ditambah 2500 per kilogram penuh di atas 1 kilogram) menjadi kode terbaca: nama jelas, konstanta bernama, dan satu komentar yang menjelaskan alasan.
2. `AI: boleh` **Rapikan proyek.** Pasang Biome di proyek strategi dari `b-xi1-m9`, jalankan linter dan pemformat, perbaiki semua temuan, dan catat jumlah temuan sebelum dan sesudah beserta alasan tiap perbaikan.
3. `AI: tanpa AI` **`==` dan `===`.** Tebak keluaran `console.log(0 == "", "1" == 1, null == undefined)` dan versi `===`, lalu jalankan.
4. `AI: boleh` **Aturan sendiri.** Pilih satu aturan Biome yang kamu temui, cari penjelasannya di dokumentasi, dan tulis contoh kode yang melanggar dan yang benar.
5. *Opsional:* **catatan pemakaian AI.** Kerjakan nomor 1 sendiri dulu, lalu minta petunjuk bertahap, bukan jawaban jadi. Catat alatnya, tujuanmu, garis besar perintahmu, bagian yang kamu pakai, dan cara memeriksanya (jalankan ulang dan jalankan `bun run cek`). Jangan menaruh data pribadi atau tugas bernilai pada perintah.

## Latihan bercampur

1. `AI: boleh` (dari `b-xi1-m8`) Jalankan linter dan pemformat pada kelas `Graf`. Berapa temuannya, dan mana yang kamu setujui?
2. `AI: boleh` (dari `b-xi1-m7`) Tambahkan `bun test` ke skrip `cek` dan tulis satu uji untuk `jumlahGenap`.

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `b-xi1-m12` (pertanyaan 1), sekitar tiga minggu lagi di `b-xi1-m14` (pertanyaan 3), dan sekitar delapan minggu lagi di semester berikutnya, modul `b-xi2-m5` (pertanyaan 3). Jawab sekarang lalu simpan.

1. Apa beda linter dan pemformat, dan beri satu contoh pekerjaan masing-masing?
2. Mengapa `===` lebih aman daripada `==`? Beri satu contoh.
3. Sebutkan dua ciri nama fungsi yang baik dan satu hal yang pantas ditulis di komentar.

## Kesalahan umum

- **Menerima perbaikan otomatis tanpa membaca.** Perbaikan bertanda "unsafe" bisa mengubah arti; baca dulu alasannya, lalu jalankan ulang uji.
- **Mengira linter menggantikan uji.** Linter tidak menjalankan programmu: kode yang lolos linter bisa tetap salah. Pada contoh di atas, kode berantakan dan kode rapi sama-sama benar; yang berbeda adalah kemudahan merawatnya.
- **Membungkam peringatan tanpa alasan.** Awalan `_` atau komentar pengecualian boleh dipakai bila sengaja, tetapi tulis alasannya.
- **Memperdebatkan gaya.** Tata letak diserahkan ke pemformat dan disepakati tim; waktu ulasan dipakai untuk logika.
- **Komentar yang mengulang kode.** `// tambah satu` di atas `i++` tidak membantu; komentar yang baik menjelaskan alasan (`// tarif gratis sampai 1 kg`).

## Cek mandiri

- [ ] Saya dapat memasang Biome dan menjalankan linter dan pemformat.
- [ ] Saya dapat menjelaskan beda linter dan pemformat.
- [ ] Saya membaca alasan temuan sebelum memperbaikinya.
- [ ] Saya dapat memberi nama dan komentar yang menjelaskan maksud.
- [ ] Saya menjalankan `bun run cek` sebelum menyerahkan kode.

## Kunci dan petunjuk

**Ingat kembali.** 1: hasil satu kali dipengaruhi beban komputer dan keadaan sesaat; ulangi dan ambil median agar adil. 2: tanpa catatan itu, simpul pada putaran dimasukkan ke antrian terus-menerus dan perulangan tidak berhenti. 3: karena pada array kosong tidak ada elemen pertama.

**Prediksi dulu.** 1: `tiga`. 2: contoh: `sisa` tidak dipakai, dan `==` yang sebaiknya `===`; pemformat menambah titik koma, spasi, dan baris baru serta menambah spasi setelah `a:` dan `b:`.

**Contoh setengah jadi.** Isi berurutan: `tsc`, `lint`, `test`, `test`. Skrip akhirnya: `"typecheck": "tsc --noEmit"`, `"lint": "biome lint src"`, `"test": "bun test"`, `"cek": "bun run typecheck && bun run lint && bun run test"`.

**Soal Parsons.** Urutan benar: b, d, c, a, e. Proyek dibuat (b), Biome dipasang (d), konfigurasi dibuat (c), linter dijalankan (a), lalu temuan dibaca sebelum diperbaiki (e).

**Latihan.** 1: contoh jawaban dijalankan penyusun (0,5 kg menghasilkan tarif dasar; 3 kg memakai 2 kilogram penuh di atas batas gratis):

```ts
// Menghitung ongkos kirim: tarif dasar ditambah biaya tiap kilogram di atas batas gratis.
const TARIF_DASAR = 8000;
const BATAS_GRATIS_KG = 1;
const BIAYA_PER_KG = 2500;

function hitungOngkos(beratKg: number): number {
  const kelebihan = Math.max(0, beratKg - BATAS_GRATIS_KG);
  return TARIF_DASAR + Math.ceil(kelebihan) * BIAYA_PER_KG;
}

console.log(hitungOngkos(0.5), hitungOngkos(3));
```

```text
8000 13000
```

2: tidak ada jawaban tunggal; rubrik: jumlah temuan sebelum dan sesudah tercatat, tiap perbaikan punya alasan, dan `bun run cek` lolos. 3: keluaran yang dijalankan penyusun:

```ts
console.log(0 == "", "1" == 1, null == undefined);
console.log(0 === "", "1" === 1, null === undefined);
```

```text
true true true
false false false
```

`==` mengubah tipe lebih dulu sehingga `0` dan teks kosong dianggap sama; `===` tidak. Pada percobaan penyusun, `bunx tsc --noEmit` juga menandai baris itu dengan `This comparison appears to be unintentional because the types 'number' and 'string' have no overlap.`, jadi tipe dan linter saling melengkapi. 4: contoh: aturan `noDoubleEquals`; yang melanggar `if (x == 1)`, yang benar `if (x === 1)`; dokumentasi aturan Biome di situs resminya.

**Latihan bercampur.** 1: jumlah temuan bergantung pada bagaimana kamu menulis kelasnya; setiap temuan dijawab dengan alasan setuju atau tidak. 2: tambahkan `"test": "bun test"` dan ubah `cek` menjadi `bun run typecheck && bun run lint && bun run test`; ujinya misalnya `expect(jumlahGenap([1, 2, 3, 4])).toBe(6)`.

**Ulang berjarak.** 1: linter menandai kode yang mencurigakan tanpa menjalankannya (mis. variabel tak terpakai, `==`); pemformat hanya merapikan tata letak (spasi, titik koma). 2: `==` mengubah tipe sebelum membandingkan, mis. `0 == ""` bernilai `true`; `===` tidak. 3: nama yang menjelaskan isi dan fungsi yang mengerjakan satu hal; komentar menjelaskan alasan, bukan mengulang kode.

## Langkah berikutnya

Modul berikut: `b-xi1-m12` (alur kerja Git: cabang, permintaan penggabungan, ulasan), yang meninjau kode sejawat dan kode buatan AI dengan daftar periksa. Bacaan lanjut: panduan memulai di situs resmi Biome dan halaman TypeScript tentang `tsconfig`.
