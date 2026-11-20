## Untuk siapa modul ini

Modul ini untuk murid kelas XI jalur B (Web dengan JavaScript, TypeScript, dan Bun), minggu `B-XI1-M12` silabus v1.4.1: alur kerja Git dengan cabang, permintaan penggabungan (*pull request*), dan ulasan kode. Prasyarat: modul `b-xi1-m11` (kualitas kode) dan `b-x2-m12` (Git dan kolaborasi dasar).

Modul ini karangan penyusun dan disetujui pemilik program pada 2026-11-20 (keputusan lewat dialog; catatan tinjauan menjadi tindak lanjut revisi). Butir `F-AP-c` dan `F-BK-a` dipetakan silabus sebagai dipenuhi jalur ini; pemenuhan butir mengikuti pemetaan silabus, bukan status modul.

Semua perintah dijalankan penyusun dengan Git 2.43.0, Bun 1.4.4, dan TypeScript 7.0.2 per 2026-11; kode di depan pesan commit dan alamat folder di komputermu berbeda (di bawah alamat diringkas menjadi `...`). **Tidak ada akun dan tidak ada layanan luar.** Permintaan penggabungan adalah fitur situs hosting kode yang dokumentasinya tidak dibuka penyusun `[belum terverifikasi]`; di sini alurnya disimulasikan dengan repositori pusat berupa folder, seperti di `b-x2-m12`. Nama karangan (`@contoh.example`). Tugas baca-dan-prediksi ditandai `AI: tanpa AI`; selain itu AI generatif boleh dipakai dengan etika dan dicatat, tanpa data pribadi, kata sandi, atau tugas bernilai pada permintaanmu. Modul ini juga melatih meninjau kode buatan AI **seperti kode sejawat**.

## Ingat kembali

Jawab dari ingatan dulu, baru cek di bagian kunci. Soal 1 dari `b-xi1-m11`, soal 2 dari `b-xi1-m9`, soal 3 dari `b-xi1-m4`.

1. Apa beda linter dan pemformat, dan beri satu contoh pekerjaan masing-masing?
2. Apa dua bagian yang harus ada pada fungsi rekursif, dan apa yang terjadi bila salah satunya hilang?
3. Mengapa `bun run` tetap menjalankan program yang ditolak `tsc`, dan apa yang sebaiknya dilakukan sebelum menggabungkan kode ke `main`?

## Tujuan

Setelah modul ini kamu dapat:

- menjelaskan alur cabang, permintaan penggabungan, ulasan, dan penggabungan;
- melihat apa yang ditambahkan sebuah cabang dengan `git log main..` dan `git diff main...`;
- menulis komentar ulasan yang berisi temuan, alasan, dan saran;
- meninjau kode sejawat dan kode buatan AI dengan daftar periksa yang sama (keluaran minggu ini: permintaan penggabungan).

## Prediksi dulu

Ini tugas baca-dan-prediksi, `AI: tanpa AI`. **Tebak dulu, tulis jawabanmu, baru jalankan.** Di folder kosong:

```sh
git init -b main
echo 'console.log("a");' > a.js && git add a.js && git commit -m "Tambah a.js"
git switch -c fitur
echo 'console.log("b");' > b.js && git add b.js && git commit -m "Tambah b.js"
echo 'console.log("c");' > c.js && git add c.js && git commit -m "Tambah c.js"
git switch main
echo 'console.log("d");' > d.js && git add d.js && git commit -m "Tambah d.js"
git log --oneline main..fitur
git diff --stat main...fitur
git diff --stat main..fitur
```

1. Berapa baris dan commit apa yang dicetak `git log --oneline main..fitur`?
2. Apa beda keluaran dua perintah `git diff --stat` terakhir?

## Contoh terselesaikan

Pada percobaan penyusun (kode commit berbeda di komputermu):

```text
8f0410a Tambah c.js
0405c96 Tambah b.js
 b.js | 1 +
 c.js | 1 +
 2 files changed, 2 insertions(+)
 b.js | 1 +
 c.js | 1 +
 d.js | 1 -
 3 files changed, 2 insertions(+), 1 deletion(-)
```

`main..fitur` berarti "commit di `fitur` yang belum ada di `main`": dua commit. Menurut dokumentasi `git diff`, `git diff A...B` setara dengan `git diff $(git merge-base A B) B`: perubahan di cabang `B` sejak bercabang dari `A`. Itu yang ingin dilihat peninjau. Dengan dua titik, `d.js` (pekerjaan baru di `main`) ikut tampil sebagai "dihapus", padahal bukan ulah cabang `fitur`.

**Alur permintaan penggabungan.** Seorang penulis membuka cabang dan mengirimnya ke pusat; peninjau mengambilnya dan membaca perubahannya; penulis memperbaiki sesuai ulasan; baru cabang digabung. Git sendiri hanya punya `git request-pull`, yang menurut dokumentasinya mencetak ringkasan perubahan beserta tempat mengambilnya; halaman permintaan penggabungan lengkap dengan komentar adalah fitur situs hosting. Di bawah, Dewi dan Budi berbagi `pusat.git` dan `main` sudah berisi `statistik.ts` dengan `rataRata`, `tsconfig.json`, dan `.gitignore`. Budi menulis `median` di `statistik.ts` pada cabang `fitur-median` lalu mengirimnya:

```sh
git switch -c fitur-median
git commit -am "Tambah median"
git push -u origin fitur-median
```

```text
Switched to a new branch 'fitur-median'
[fitur-median 308834a] Tambah median
 1 file changed, 6 insertions(+)
To .../pusat.git
 * [new branch]      fitur-median -> fitur-median
branch 'fitur-median' set up to track 'origin/fitur-median'.
```

Dewi mengambil dan membaca perubahannya:

```sh
git fetch
git log --oneline main..origin/fitur-median
git diff main...origin/fitur-median
```

```text
From .../pusat
 * [new branch]      fitur-median -> origin/fitur-median
308834a Tambah median
diff --git a/statistik.ts b/statistik.ts
index cb521ad..c2956dd 100644
--- a/statistik.ts
+++ b/statistik.ts
@@ -2,3 +2,9 @@ export function rataRata(angka: number[]): number {
   const total = angka.reduce((jumlah, n) => jumlah + n, 0);
   return total / angka.length;
 }
+
+export function median(angka: number[]): number {
+  const urut = angka.sort((a, b) => a - b);
+  const tengah = Math.floor(urut.length / 2);
+  return urut.length % 2 === 0 ? (urut[tengah - 1] + urut[tengah]) / 2 : urut[tengah];
+}
```

Membaca saja belum cukup: Dewi menjalankannya di cabang `tinjau` (`git switch -c tinjau origin/fitur-median`) dengan `coba.ts`, lalu memeriksa tipe:

```ts
import { median, rataRata } from "./statistik";

const data = [3, 1, 2];
console.log(median(data), data);
console.log(rataRata([]));
```

```sh
bun run coba.ts
bunx tsc --noEmit
```

```text
2 [ 1, 2, 3 ]
NaN
statistik.ts(9,35): error TS2532: Object is possibly 'undefined'.
statistik.ts(9,54): error TS2532: Object is possibly 'undefined'.
statistik.ts(9,74): error TS2322: Type 'number | undefined' is not assignable to type 'number'.
  Type 'undefined' is not assignable to type 'number'.
```

Temuan: `median(data)` mengubah `data` milik pemanggil (jadi `[1, 2, 3]`), `tsc` menolak indeks yang bisa `undefined`, dan tidak ada uji. Komentar ulasan yang baik berisi **temuan, alasan, saran**, ditujukan ke kode bukan orangnya, dan menyebut juga yang sudah baik:

```text
1. median: `angka.sort` mengubah larik pemanggil. Alasan: pada percobaanku `data` berubah dari [3, 1, 2] menjadi [1, 2, 3]. Saran: urutkan salinan, `[...angka].sort(...)`.
2. Baris return: `tsc` menolak `urut[tengah - 1] + urut[tengah]` (mungkin undefined), dan larik kosong tidak punya median. Saran: tangani kosong (lempar RangeError) dan nilai undefined.
3. Belum ada uji. Saran: uji ganjil, genap, kosong, dan "tidak mengubah larik asli".
Sudah baik: nama fungsi jelas dan perubahan terbatas pada median.
```

Budi memperbaiki di cabang yang sama (`bun test` dan `bunx tsc --noEmit` bersih), mengirim, lalu Dewi menggabungkan dengan `--no-ff` agar riwayat mencatat penggabungannya:

```ts
export function rataRata(angka: number[]): number {
  const total = angka.reduce((jumlah, n) => jumlah + n, 0);
  return total / angka.length;
}

export function median(angka: number[]): number {
  if (angka.length === 0) throw new RangeError("angka kosong");
  const urut = [...angka].sort((a, b) => a - b);
  const tengah = Math.floor(urut.length / 2);
  const kanan = urut[tengah] ?? 0;
  const kiri = urut[tengah - 1] ?? kanan;
  return urut.length % 2 === 0 ? (kiri + kanan) / 2 : kanan;
}
```

```sh
git switch main
git merge --no-ff origin/fitur-median -m "Gabung fitur-median"
git log --oneline --graph
```

```text
Merge made by the 'ort' strategy.
 statistik.test.ts | 16 ++++++++++++++++
 statistik.ts      |  9 +++++++++
 2 files changed, 25 insertions(+)
 create mode 100644 statistik.test.ts
*   7200995 Gabung fitur-median
|\  
| * df5606d Perbaiki median: salin larik, tangani kosong, tambah uji
| * 308834a Tambah median
|/  
* 3fd4f7b Tambah rataRata
```

**Kode buatan AI = kode sejawat.** Asisten AI menulis kode yang fasih dan rapi, tetapi tidak bertanggung jawab atas kebenarannya. Kamu yang menggabungkannya, jadi kamu yang meninjaunya: baca, jalankan, uji, periksa tipe, dan cari rahasia.

## Contoh setengah jadi

Lengkapi perintah agar peninjau melihat daftar commit dan perubahan cabang `fitur-x` sejak bercabang dari `main`, lalu menggabungkannya dengan commit gabungan.

```text
git ____ --oneline main..origin/fitur-x
git diff main____origin/fitur-x
git merge ____ origin/fitur-x -m "Gabung fitur-x"
```

## Soal Parsons

Susun langkah berikut (sudah diacak) menjadi alur satu fitur dari penulis sampai gabung. `AI: tanpa AI`.

```text
(a) git push -u origin fitur-x
(b) git switch -c fitur-x
(c) git commit -am "Tambah fitur x"
(d) git fetch lalu git diff main...origin/fitur-x
(e) perbaiki sesuai ulasan, commit, push
(f) git switch main lalu git merge --no-ff origin/fitur-x
```

## Latihan

1. `AI: tanpa AI` **Tinjau PR sintetis "buatan AI".** Berkas di bawah adalah isi sebuah permintaan penggabungan fiktif dengan keterangan "semua kasus sudah diuji". Tulis ulasan (temuan, alasan, saran) untuk sedikitnya empat masalah. Gurumu boleh menggantinya dengan permintaan buatannya.

   ```ts
   const KUNCI_API = "KUNCI_PALSU_CONTOH";

   export function rataRata(data: number[]): number {
     let total = 0;
     for (const n of data) total += n;
     return total / data.length;
   }

   export function nilaiTertinggi(data: number[]): number {
     let tertinggi = 0;
     for (let i = 0; i <= data.length; i++) {
       if (data[i] > tertinggi) tertinggi = data[i];
     }
     return tertinggi;
   }

   export function urutkanNilai(data: number[]): number[] {
     return data.sort();
   }

   export function laporan(data: number[]): string {
     console.log("debug", KUNCI_API);
     return `rata-rata ${rataRata(data)}, tertinggi ${nilaiTertinggi(data)}`;
   }
   ```

2. `AI: boleh` **Perbaiki.** Perbaiki berkas itu sesuai ulasanmu dan tulis uji `bun test` yang menangkap tiap cacat.
3. `AI: boleh` **Kerja berpasangan.** Berdua, buat `pusat.git` dan dua klon. Satu orang membuka cabang dengan fungsi kecil dan mengirimnya; yang lain meninjau dengan `git diff main...origin/cabang`, menulis tiga komentar, lalu menggabungkan dengan `--no-ff`.
4. `AI: tanpa AI` **Dua titik dan tiga titik.** Jelaskan dengan kata-katamu beda `main..fitur` dan `main...fitur` untuk `git diff`, memakai hasil `Prediksi dulu`.
5. *Opsional:* **catatan pemakaian AI.** Minta asisten AI menulis satu fungsi kecil, lalu tinjau hasilnya seperti nomor 1 sebelum memakainya. Catat alatnya, tujuanmu, garis besar perintahmu, bagian yang kamu pakai, dan cara memeriksanya. Jangan menaruh data pribadi atau tugas bernilai pada perintah.

## Latihan bercampur

1. `AI: boleh` (dari `b-xi1-m11`) Jalankan `bun run cek` pada cabang sebelum meminta ulasan. Mengapa urutannya begitu?
2. `AI: boleh` (dari `b-xi1-m9`) Anggap `fibKeliru` (catatan dibuat di dalam fungsi) sebagai isi sebuah permintaan penggabungan. Tulis satu komentar ulasan yang berisi temuan, alasan, dan saran.

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `b-xi1-m13` (pertanyaan 1), sekitar tiga minggu lagi di `b-xi2-m1` (pertanyaan 2), dan sekitar delapan minggu lagi di semester berikutnya, modul `b-xi2-m6` (pertanyaan 3). Jawab sekarang lalu simpan.

1. Apa beda `git diff main..fitur` dan `git diff main...fitur`, dan mana yang dipakai peninjau untuk melihat isi cabang?
2. Sebutkan tiga bagian satu komentar ulasan yang baik, dan satu hal yang wajib dicek bila kodenya buatan AI.
3. Mengapa permintaan penggabungan sebaiknya kecil dan satu tujuan?

## Kesalahan umum

- **Percaya kode karena rapi.** Berkas di nomor 1 rapi dan fasih tetapi cacat (pada percobaan penyusun: `rataRata([])` memberi `NaN`, `nilaiTertinggi([-5, -2, -9])` memberi `0`, `urutkanNilai([10, 9, 1])` memberi `[1, 10, 9]` dan mengubah masukan). Asisten AI juga diketahui bisa menyebut fungsi atau paket yang tidak ada.
- **Meninjau dengan data lama.** Lupa `git fetch` membuat `origin/fitur-x` belum terbaru; ulasanmu bisa tentang kode yang sudah berubah.
- **Meninjau gaya, bukan isi.** Spasi dan titik koma urusan pemformat; waktu ulasan untuk logika, uji, keamanan, dan keterbacaan.
- **Komentar yang menyerang orang.** "Kamu ceroboh" tidak membantu; sebut kodenya dan sarannya.
- **Menggabungkan tanpa menjalankan.** Klaim "sudah diuji" bukan bukti; jalankan `bun test` dan `tsc`.
- **Menaruh rahasia atau sisa debug.** Riwayat Git menyimpan semuanya, termasuk kunci yang kemudian dihapus; contoh memakai nilai palsu.

## Cek mandiri

- [ ] Saya dapat menjelaskan alur cabang, permintaan penggabungan, ulasan, dan gabung.
- [ ] Saya dapat memakai `git log main..` dan `git diff main...` untuk melihat isi cabang.
- [ ] Saya menulis komentar berisi temuan, alasan, dan saran.
- [ ] Saya menjalankan dan menguji kode sebelum menyetujuinya, termasuk kode buatan AI.
- [ ] Saya tidak menaruh rahasia atau data pribadi di repositori maupun permintaan ke AI.

## Kunci dan petunjuk

**Ingat kembali.** 1: linter menandai kode yang mencurigakan tanpa menjalankannya (mis. variabel tak terpakai, `==`); pemformat hanya merapikan tata letak (spasi, titik koma). 2: kasus dasar yang menghentikan dan kasus rekursif yang memperkecil masalah; tanpa kasus dasar terjadi `RangeError` (atau tidak berhenti). 3: karena Bun hanya menghapus tipe dan tidak memeriksanya; jalankan `tsc` dan perbaiki galat sebelum menggabungkan.

**Prediksi dulu.** 1: dua baris: `Tambah c.js` dan `Tambah b.js` (urutan terbaru dulu). 2: tiga titik hanya menampilkan `b.js` dan `c.js` (isi cabang); dua titik juga menampilkan `d.js` sebagai dihapus karena membandingkan ujung `main` dengan ujung `fitur`.

**Contoh setengah jadi.** Isi berurutan: `log`, `...`, `--no-ff`.

**Soal Parsons.** Urutan benar: b, c, a, d, e, f. Cabang dibuat (b), commit (c), dikirim (a), ditinjau (d), diperbaiki (e), digabung (f).

**Latihan.** 1: contoh ulasan; semua temuan dijalankan penyusun (`rataRata([])` memberi `NaN`; `nilaiTertinggi([-5, -2, -9])` memberi `0`; `urutkanNilai([10, 9, 1])` memberi `[1, 10, 9]` dan mengubah masukan; `laporan` mencetak `debug KUNCI_PALSU_CONTOH`):

```markdown
1. rataRata: larik kosong menghasilkan NaN (0 dibagi 0). Saran: lempar RangeError atau dokumentasikan.
2. nilaiTertinggi: mulai dari 0 membuat larik semua-negatif salah (hasil 0). Perulangan `i <= data.length` melewati batas; `tsc` menandai `data[i]` mungkin undefined. Saran: Math.max setelah memeriksa larik kosong.
3. urutkanNilai: `sort()` tanpa pembanding mengurutkan sebagai teks ([10, 9, 1] jadi [1, 10, 9]) dan mengubah masukan. Saran: `[...data].sort((a, b) => a - b)`.
4. laporan: mencetak kunci ke konsol dan menaruh kunci di kode. Saran: buang log debug; rahasia lewat variabel lingkungan.
5. Keterangan "semua kasus diuji" tanpa berkas uji. Saran: tambahkan uji yang bisa dijalankan.
```

`bunx tsc --noEmit` pada berkas itu memberi `ringkasan.ts(12,9): error TS2532: Object is possibly 'undefined'.` dan galat tipe kedua pada baris yang sama. 2: contoh perbaikan, dijalankan penyusun:

```ts
function rataRata(data: number[]): number {
  if (data.length === 0) throw new RangeError("data kosong");
  return data.reduce((total, n) => total + n, 0) / data.length;
}

function nilaiTertinggi(data: number[]): number {
  if (data.length === 0) throw new RangeError("data kosong");
  return Math.max(...data);
}

function urutkanNilai(data: number[]): number[] {
  return [...data].sort((a, b) => a - b);
}

const nilai = [10, 9, 1];
console.log(urutkanNilai(nilai), nilai);
console.log(nilaiTertinggi([-5, -2, -9]));
try {
  rataRata([]);
} catch (galat) {
  console.log((galat as Error).message);
}
```

```text
[ 1, 9, 10 ] [ 10, 9, 1 ]
-2
data kosong
```

Uji `bun test` yang baik memeriksa tepat tiga hal itu: larik kosong, semua-negatif, dan masukan tidak berubah. 3: contoh urutan ada di bagian contoh; tiga komentar berisi temuan, alasan, saran. 4: tiga titik membandingkan cabang dengan titik percabangannya, jadi hanya perubahan cabang itu yang tampil; dua titik membandingkan ujung kedua cabang, sehingga pekerjaan baru di `main` ikut tampil terbalik.

**Latihan bercampur.** 1: agar peninjau tidak menghabiskan waktu pada galat yang bisa ditemukan mesin (tipe, linter, uji); manusia membaca logika. 2: contoh: "`fibKeliru`: `new Map()` dibuat di dalam fungsi, jadi catatan hilang tiap panggilan. Alasan: panggilan tetap 242.785 untuk `n = 25`, sama seperti tanpa memoisasi. Saran: buat catatan di luar atau oper sebagai parameter."

**Ulang berjarak.** 1: tiga titik menampilkan perubahan cabang sejak bercabang (yang dipakai peninjau); dua titik membandingkan ujung kedua cabang dan memunculkan pekerjaan baru `main` sebagai terhapus. 2: temuan, alasan, saran; untuk kode AI: jalankan dan uji sendiri (juga periksa tipe, rahasia, dan nama fungsi atau paket yang mungkin tidak ada). 3: perubahan kecil lebih mudah dibaca dengan teliti, lebih cepat diulas, dan jika bermasalah mudah dibatalkan.

## Langkah berikutnya

Modul berikut: `b-xi1-m13` (proyek mini: pustaka TypeScript teruji), yang dikerjakan berkelompok dengan cabang dan ulasan seperti di sini. Bacaan lanjut: halaman dokumentasi Git untuk `git-diff`, `git-merge`, dan `git-request-pull`, dan bab percabangan di buku Pro Git.
