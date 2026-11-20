## Untuk siapa modul ini

Modul ini untuk murid kelas XI jalur B (Web dengan JavaScript, TypeScript, dan Bun), minggu `B-XI1-M14` silabus v1.4.1: asesmen dan refleksi semester 1 kelas XI. Prasyarat: modul `b-xi1-m12` dan seluruh materi `b-xi1-m1` sampai `b-xi1-m13`; modul ini menilai semuanya.

Modul ini karangan penyusun dan disetujui pemilik program pada 2026-11-20 (keputusan lewat dialog; catatan tinjauan menjadi tindak lanjut revisi), dan tidak dihitung sebagai pemenuhan butir capaian pembelajaran. Asesmen ini **tanpa AI**: jangan memakai AI generatif saat mengerjakannya (silabus 7.4), karena tujuannya melihat apa yang bisa kamu selesaikan sendiri. Bobot nilai dan predikat mengikuti kebijakan sekolah `[belum terverifikasi]`; modul ini hanya memberi soal dan kunci latihan.

Bagian praktik dikerjakan di komputer dengan Bun (1.4.4 dipakai penyusun per 2026-11), TypeScript, dan Git, tanpa akun di layanan mana pun. Data di soal karangan.

## Ingat kembali

Ini inti asesmen: jawab dari ingatan, tanpa melihat catatan, lalu cocokkan dengan kunci. Soal 1 dari `b-xi1-m6`, soal 2 dari `b-xi1-m9`, soal 3 dari `b-xi1-m11`, soal 4 dari `b-xi1-m13`, soal 5 dari `b-xi1-m12`.

1. Apa kegunaan `index.ts` sebagai pintu depan paket, dan apa akibatnya pada fungsi yang tidak diekspor?
2. Apa yang disimpan memoisasi, dan di mana catatannya harus dibuat agar bekerja?
3. Mengapa `===` lebih aman daripada `==`? Beri satu contoh.
4. Mengapa pustaka memakai tipe generik seperti `Antrian<T>` dan bukan `any`?
5. Sebutkan tiga bagian satu komentar ulasan yang baik, dan satu hal yang wajib dicek bila kodenya buatan AI.

## Tujuan

Soal di modul ini menilai apakah kamu dapat:

- memakai `Map`, `Set`, dan kelas bertipe, serta menelusuri BFS;
- menerapkan dan menilai strategi greedy, rekursi, dan memoisasi;
- membandingkan dua solusi dengan menghitung langkah dan merancang pengukuran;
- meninjau kode dengan temuan, alasan, dan saran;
- menulis fungsi bertipe dengan uji `bun test` dan memakai Git dengan cabang dan penggabungan.

## Latihan bercampur

Kerjakan sendiri, `AI: tanpa AI`, dalam waktu yang ditetapkan gurumu.

1. **Tulis.** Tulis `hitungKata(teks: string): Map<string, number>` yang mengubah teks ke huruf kecil, memisahkannya pada spasi, mengabaikan kata kosong, dan menghitung tiap kata. Apa hasilnya untuk `"Aku suka kopi aku suka teh"`?
2. **Telusuri.** Sisi graf: K-L, K-M, L-N, M-N, N-O, P-Q. Telusuri BFS dari `K`: tulis isi antrian dan jarak tiap simpul, lalu jarak ke `Q`.
3. **Strategi.** Untuk koin 1, 4, 6 dan target 8: berapa koin hasil greedy, berapa yang optimal, dan apa kesimpulanmu tentang greedy untuk koin ini?
4. **Efisiensi.** Untuk mencari adakah dua angka sama di 2000 data: berapa banyak langkah solusi dua perulangan dan solusi `Set`? Tulis empat langkah rencana pengukuran waktu yang adil.
5. **Ulas.** Tulis tiga komentar ulasan (temuan, alasan, saran) untuk kode berikut:

   ```ts
   function persen(bagian: number, total: number): number {
     return (bagian / total) * 100;
   }

   function terbesar(daftar: number[]): number {
     daftar.sort();
     return daftar[daftar.length - 1];
   }
   ```

6. **Praktik.** Di folder baru: buat `kata.ts` (soal 1) dan `kata.test.ts` dengan tiga uji, catat di cabang `fitur-kata`, gabungkan ke `main` dengan `--no-ff`. Tunjukkan `git log --oneline --graph` dan keluaran `bun test`.

## Refleksi

Tulis jawabanmu di jurnalmu sendiri. Jurnal ini tidak dikumpulkan ke repositori dan tidak ada jawaban benar atau salah; yang dinilai adalah kejujuran dan rencanamu.

1. Soal mana yang kamu jawab tanpa ragu? Apa yang membuatmu yakin?
2. Soal mana yang membuatmu ragu atau keliru, dan konsep apa di baliknya (struktur data, strategi, efisiensi, ulasan, pengujian, atau Git)?
3. Kapan kamu akan mengulang bagian yang lemah, dan bagaimana caramu mengujinya (menjawab dulu dari ingatan, bukan membaca ulang)?
4. Apa yang ingin kamu buat dengan server dan data di semester berikutnya?

Mencoba mengingat lebih dulu, lalu menjarakkan waktu mengulang, membantu ingatan jangka panjang lebih baik daripada membaca ulang catatan.

## Cek mandiri

- [ ] Saya dapat memilih dan memakai `Map`, `Set`, dan kelas bertipe.
- [ ] Saya dapat menelusuri BFS dan membaca jaraknya.
- [ ] Saya dapat menunjukkan kapan greedy gagal dan menyebut alternatifnya.
- [ ] Saya dapat membandingkan dua solusi dengan hitungan langkah dan pengukuran yang adil.
- [ ] Saya dapat menulis ulasan berisi temuan, alasan, dan saran.
- [ ] Saya dapat menulis uji `bun test` dan memakai cabang dan penggabungan di Git.

## Kunci dan petunjuk

**Ingat kembali.** 1: `index.ts` mengumpulkan yang dijanjikan untuk dipakai dari luar; yang tidak diekspor tidak bisa diimpor. 2: hasil yang sudah dihitung, dengan kunci masalahnya (mis. `n`); catatan dibuat sekali di luar rekursi atau dioper sebagai parameter. 3: `==` mengubah tipe sebelum membandingkan, mis. `0 == ""` bernilai `true`; `===` tidak. 4: `T` ditentukan pemakai sehingga pemeriksa tipe tetap bisa menolak jenis data yang salah; `any` mematikan pemeriksaan itu. 5: temuan, alasan, saran; untuk kode AI: jalankan dan uji sendiri (juga periksa tipe, rahasia, dan nama fungsi atau paket yang mungkin tidak ada).

**Latihan bercampur.** Rubrik singkat: tiap soal dinilai dari ketepatan, penelusuran langkah, dan alasan; jawaban benar tanpa langkah mendapat nilai sebagian.

1. Contoh jawaban dan uji, dijalankan penyusun (`bunx tsc --noEmit` bersih):

```ts
export function hitungKata(teks: string): Map<string, number> {
  const hasil = new Map<string, number>();
  for (const kata of teks.toLowerCase().split(" ")) {
    if (kata === "") continue;
    hasil.set(kata, (hasil.get(kata) ?? 0) + 1);
  }
  return hasil;
}
```

```ts
import { expect, test } from "bun:test";
import { hitungKata } from "./kata";

test("huruf besar dan kecil dihitung sama", () => {
  expect(hitungKata("Aku aku").get("aku")).toBe(2);
});

test("spasi ganda tidak membuat kata kosong", () => {
  expect(hitungKata("a  b").has("")).toBe(false);
});

test("teks kosong menghasilkan peta kosong", () => {
  expect(hitungKata("").size).toBe(0);
});
```

```ts
import { hitungKata } from "./kata";

console.log([...hitungKata("Aku suka kopi aku suka teh")]);
```

```text
[
  [ "aku", 2 ], [ "suka", 2 ], [ "kopi", 1 ], [ "teh", 1 ]
]
```

2. Antrian `[K]`; ambil K: L=1, M=1; ambil L: N=2; ambil M: N sudah ada; ambil N: O=3; ambil O. Jarak: K 0, L 1, M 1, N 2, O 3. `Q` tidak terhubung dengan `K` (kelompok `P` dan `Q` terpisah). Dijalankan penyusun:

```ts
const peta = new Map<string, string[]>([
  ["K", ["L", "M"]],
  ["L", ["K", "N"]],
  ["M", ["K", "N"]],
  ["N", ["L", "M", "O"]],
  ["O", ["N"]],
  ["P", ["Q"]],
  ["Q", ["P"]],
]);

const jarak = new Map<string, number>([["K", 0]]);
const antrian = ["K"];
while (antrian.length > 0) {
  const sekarang = antrian.shift();
  if (sekarang === undefined) break;
  for (const t of peta.get(sekarang) ?? []) {
    if (!jarak.has(t)) {
      jarak.set(t, (jarak.get(sekarang) ?? 0) + 1);
      antrian.push(t);
    }
  }
}
console.log([...jarak], jarak.get("Q") ?? "tidak terhubung");
```

```text
[
  [ "K", 0 ], [ "L", 1 ], [ "M", 1 ], [ "N", 2 ], [ "O", 3 ]
] tidak terhubung
```

3. Greedy: 6 + 1 + 1 (tiga koin); optimal: 4 + 4 (dua koin). Kesimpulan: untuk koin 1, 4, 6 greedy tidak optimal; satu contoh tandingan cukup membantah klaim "selalu optimal". Alternatif: rekursi dengan memoisasi (`koinMinimum`). Greedy dijalankan penyusun:

```ts
function greedy(nominal: number[], target: number): number[] {
  const hasil: number[] = [];
  let sisa = target;
  for (const koin of [...nominal].sort((a, b) => b - a)) {
    while (sisa >= koin) {
      hasil.push(koin);
      sisa -= koin;
    }
  }
  return hasil;
}
console.log(greedy([1, 4, 6], 8));
```

```text
[ 6, 1, 1 ]
```

4. Dua perulangan (tanpa angka ganda): `n × (n − 1) / 2 = 2000 × 1999 / 2 = 1.999.000` langkah; solusi `Set`: 2000 langkah (satu per data). Rencana pengukuran, contoh: (1) pakai data yang sama untuk kedua solusi, dibangkitkan dengan rumus tetap; (2) ukur dengan `performance.now` di sekitar pemanggilan saja, tanpa `console.log`; (3) ulangi beberapa kali dan ambil median; (4) tulis kesimpulan dengan menyebut `n`, jumlah pengulangan, dan batasnya. Imbalan solusi `Set`: memori tambahan.

5. Contoh ulasan, dijalankan penyusun (`persen(5, 0)` memberi `Infinity`; `terbesar([10, 9, 100])` memberi `9` dan mengubah masukan menjadi `[10, 100, 9]`; `terbesar([])` memberi `undefined`; `bunx tsc --noEmit` menolak `return` terakhir: `Type 'number | undefined' is not assignable to type 'number'`):

```markdown
1. persen: `total` 0 menghasilkan Infinity. Alasan: pembagian dengan nol diam-diam lolos. Saran: periksa `total === 0` dan lempar galat atau kembalikan nilai yang disepakati.
2. terbesar: `sort()` tanpa pembanding mengurutkan sebagai teks dan mengubah larik pemanggil. Alasan: [10, 9, 100] memberi 9. Saran: `Math.max(...daftar)` setelah memeriksa larik tidak kosong.
3. terbesar: larik kosong dan tipe. Alasan: hasilnya undefined dan tsc menolak. Saran: tangani larik kosong secara eksplisit.
Sudah baik: nama fungsi jelas dan keduanya pendek.
```

6. Contoh urutan: `git init -b main`; commit awal; `git switch -c fitur-kata`; commit `kata.ts` dan `kata.test.ts`; `git switch main`; `git merge --no-ff fitur-kata -m "Gabung fitur-kata"`. Keluaran riwayat dijalankan penyusun (kode berbeda di komputermu):

```text
*   0f14a67 Gabung fitur-kata
|\  
| * a772003 Tambah hitungKata dan uji
|/  
* dd65ac8 Awal
```

```text
bun test v1.4.4 (38afee6c8)

 3 pass
 0 fail
 3 expect() calls
Ran 3 tests across 1 file. [5.00ms]
```

**Refleksi.** Tidak ada kunci. Rencana yang baik menyebut bagian lemah yang spesifik, jadwal ulang yang jarak-jarak (mis. besok, tiga hari, seminggu), dan cara menguji diri dengan menjawab dari ingatan.

## Langkah berikutnya

Semester berikutnya jalur B dimulai dengan `b-xi2-m1` (server HTTP dengan Bun). Jadikan hasil refleksimu rencana belajar sebelum minggu pertama. Modul terkait: `b-xi1-m12` untuk mengulang ulasan dan Git, dan `b-xi1-m7` untuk mengulang pengujian. Bacaan lanjut: dokumentasi Bun di `https://bun.sh/docs` dan dokumentasi MDN tentang JavaScript.
