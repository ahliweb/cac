## Untuk siapa modul ini

Modul ini untuk murid kelas XI jalur B (Web dengan JavaScript, TypeScript, dan Bun), minggu `B-XI1-M10` silabus v1.4.1: efisiensi dan alternatif solusi. Prasyarat: modul `b-xi1-m9` (strategi algoritmik).

Modul ini berstatus DRAF: karangan penyusun, belum ditinjau pemilik. Butir `F-BK-b` (beberapa strategi dan justifikasi efisiensi) dipetakan silabus sebagai dipenuhi jalur ini; modul draf ini belum dihitung sebagai pemenuhan butir itu.

Contoh dijalankan penyusun dengan Bun 1.4.4 dan TypeScript 7.0.2 per 2026-11. **Angka waktu bergantung pada komputer, beban, dan saat dijalankan**, jadi angkamu akan berbeda; yang tetap adalah pola dan hitungan langkah. Tugas baca-dan-prediksi ditandai `AI: tanpa AI`; selain itu AI generatif boleh dipakai dengan etika dan dicatat, tanpa data pribadi, kata sandi, atau tugas bernilai pada permintaanmu.

## Ingat kembali

Jawab dari ingatan dulu, baru cek di bagian kunci. Soal 1 dari `b-xi1-m9`, soal 2 dari `b-xi1-m7`, soal 3 dari `b-xi1-m2`.

1. Beri contoh data yang membuat strategi greedy untuk menukar uang tidak optimal, dan jelaskan mengapa satu contoh tandingan cukup membantah strategi itu.
2. Mengapa `toEqual` dipakai untuk membandingkan array, bukan `toBe`?
3. Apa yang dikerjakan `tsc --noEmit`?

## Tujuan

Setelah modul ini kamu dapat:

- menghitung langkah sebuah solusi dan melihat polanya saat data membesar;
- mengukur waktu dengan `performance.now` secara adil, dengan beberapa pengulangan;
- membandingkan dua solusi untuk soal yang sama dan memilih dengan alasan;
- menulis laporan perbandingan yang memuat data, bukan hanya kesan (keluaran minggu ini).

## Prediksi dulu

Ini tugas baca-dan-prediksi, `AI: tanpa AI`. **Tebak dulu, tulis jawabanmu, baru jalankan.**

```ts
function banyakPasangan(n: number): number {
  let hitung = 0;
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      hitung++;
    }
  }
  return hitung;
}

console.log(banyakPasangan(10), banyakPasangan(20), banyakPasangan(40));
```

1. Berapa tiga angka yang tercetak?
2. Setiap `n` berlipat dua, hitungannya berlipat berapa kali, kira-kira?

## Contoh terselesaikan

Keluaran program tadi:

```text
45 190 780
```

Tiap `n` berlipat dua, hitungannya naik sekitar empat kali (45, 190, 780). Itu pola **kuadrat**: banyak langkah mendekati `n × n / 2`. Pola seperti ini punya nama: `O(n²)` untuk kuadrat, `O(n)` untuk linear (berlipat dua kalau `n` berlipat dua), dan `O(log n)` untuk yang hanya bertambah sedikit setiap `n` berlipat (pencarian biner). Notasi ini hanya menyatakan *pola pertumbuhan*, bukan detik.

**Dua solusi untuk soal yang sama: adakah angka ganda?** Solusi pertama membandingkan setiap pasangan; solusi kedua mengingat angka yang sudah dilihat dalam `Set` (dari `b-xi1-m8`). Keduanya dihitung langkahnya untuk 1000 angka berbeda:

```ts
function duplikatKuadrat(data: number[]): { ada: boolean; langkah: number } {
  let langkah = 0;
  for (let i = 0; i < data.length; i++) {
    for (let j = i + 1; j < data.length; j++) {
      langkah++;
      if (data[i] === data[j]) return { ada: true, langkah };
    }
  }
  return { ada: false, langkah };
}

function duplikatSet(data: number[]): { ada: boolean; langkah: number } {
  const lihat = new Set<number>();
  let langkah = 0;
  for (const nilai of data) {
    langkah++;
    if (lihat.has(nilai)) return { ada: true, langkah };
    lihat.add(nilai);
  }
  return { ada: false, langkah };
}

const tanpaDuplikat = Array.from({ length: 1000 }, (_, i) => i);
console.log(duplikatKuadrat(tanpaDuplikat));
console.log(duplikatSet(tanpaDuplikat));
```

```text
{
  ada: false,
  langkah: 499500,
}
{
  ada: false,
  langkah: 1000,
}
```

499.500 berbanding 1000. Solusi `Set` lebih sedikit langkah dengan imbalan memori tambahan untuk menyimpan `Set`: itu *trade-off*. Menghitung langkah tidak bergantung pada komputer, sehingga adil; tetapi tidak semua langkah sama mahal, jadi kita juga mengukur waktu.

**Mengukur waktu.** Menurut MDN, `performance.now()` mengembalikan waktu dalam milidetik sebagai bilangan pecahan. Ukuran yang adil: data sama untuk kedua solusi (di sini dibangkitkan dengan rumus tetap, bukan `Math.random`), beberapa pengulangan lalu ambil median, dan tidak mengukur `console.log`. Berikut bubble sort (dari `b-x2-m9`) melawan `sort` bawaan:

```ts
function dataAcak(n: number): number[] {
  let benih = 12345;
  const hasil: number[] = [];
  for (let i = 0; i < n; i++) {
    benih = (benih * 1103515245 + 12345) % 2147483648;
    hasil.push(benih % 100000);
  }
  return hasil;
}

function bubble(awal: number[]): number[] {
  const a = [...awal];
  for (let i = 0; i < a.length - 1; i++) {
    for (let j = 0; j < a.length - 1 - i; j++) {
      const kiri = a[j];
      const kanan = a[j + 1];
      if (kiri !== undefined && kanan !== undefined && kiri > kanan) {
        a[j] = kanan;
        a[j + 1] = kiri;
      }
    }
  }
  return a;
}

function ukur(fungsi: () => void, ulang = 5): number {
  const waktu: number[] = [];
  for (let i = 0; i < ulang; i++) {
    const mulai = performance.now();
    fungsi();
    waktu.push(performance.now() - mulai);
  }
  waktu.sort((a, b) => a - b);
  return waktu[Math.floor(ulang / 2)] ?? 0;
}

for (const n of [2000, 4000, 8000]) {
  const data = dataAcak(n);
  const tBubble = ukur(() => bubble(data));
  const tSort = ukur(() => [...data].sort((a, b) => a - b));
  console.log(`n=${n} bubble=${tBubble.toFixed(1)} ms sort=${tSort.toFixed(2)} ms`);
}
```

Keluaran satu kali jalan di komputer penyusun (bukan keluaran yang pasti sama di komputermu):

```console
n=2000 bubble=6.8 ms sort=0.23 ms
n=4000 bubble=31.4 ms sort=0.45 ms
n=8000 bubble=165.0 ms sort=1.24 ms
```

Bubble sort naik kira-kira empat sampai lima kali setiap `n` berlipat dua (pola kuadrat), sedangkan `sort` bawaan jauh lebih landai. Kalimat kesimpulan yang jujur: "pada data acak ini, untuk `n` sampai 8000, `sort` bawaan jauh lebih cepat; polanya sesuai dugaan kuadrat". Bukan "bubble sort selalu lambat".

## Contoh setengah jadi

Lengkapi fungsi pengukur yang mengulang pengukuran dan mengambil nilai tengah.

```ts setengah-jadi
function ukur(fungsi: () => void, ulang = 5): number {
  const waktu: number[] = [];
  for (let i = 0; i < ulang; i++) {
    const mulai = performance.____();
    fungsi();
    waktu.push(performance.now() ____ mulai);
  }
  waktu.sort((a, b) => ____);
  return waktu[Math.floor(ulang / 2)] ?? 0;
}
```

## Soal Parsons

Susun baris berikut (sudah diacak) menjadi `duplikatSet` yang benar. `AI: tanpa AI`.

```text
(a) lihat.add(nilai);
(b) for (const nilai of data) {
(c) const lihat = new Set<number>();
(d) if (lihat.has(nilai)) return true;
(e) return false;
(f) }
```

## Latihan

1. `AI: tanpa AI` **Hitung.** Berapa hasil `banyakPasangan(5)`? Tebak rumus umumnya, lalu uji untuk `n = 1000` dan cocokkan dengan 499.500 di atas.
2. `AI: boleh` **Laporan perbandingan.** Ukur bubble sort dan insertion sort milikmu untuk `n = 2000` dan `4000` dengan `ukur`. Tulis tabel dan tiga kalimat kesimpulan yang menyebut data, jumlah pengulangan, dan batasan ukurannya.
3. `AI: boleh` **Pencarian.** Hitung langkah pencarian linear dan biner untuk mencari `999` pada larik `0` sampai `999`.
4. `AI: boleh` **Dua solusi.** Tulis dua solusi untuk "adakah dua angka berbeda posisi yang jumlahnya sama dengan target": satu dengan dua perulangan, satu dengan `Map`. Bandingkan langkahnya.
5. *Opsional:* **catatan pemakaian AI.** Kerjakan nomor 4 sendiri dulu, lalu minta petunjuk bertahap, bukan jawaban jadi. Catat alatnya, tujuanmu, garis besar perintahmu, bagian yang kamu pakai, dan cara memeriksanya (bandingkan hitungan langkahmu). Jangan menaruh data pribadi atau tugas bernilai pada perintah.

## Latihan bercampur

1. `AI: boleh` (dari `b-xi1-m9`) Ukur `fibBiasa(30)` dan `fibMemo(30)` dengan `ukur`. Mana yang kamu duga lebih cepat dan mengapa, dan sesuaikah dengan hitungan panggilan?
2. `AI: boleh` (dari `b-xi1-m7`) Tulis uji `bun test` yang memastikan `duplikatSet` dan `duplikatKuadrat` memberi jawaban `ada` yang sama pada beberapa data, termasuk larik kosong.

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `b-xi1-m11` (pertanyaan 1), sekitar tiga minggu lagi di `b-xi1-m13` (pertanyaan 2), dan sekitar delapan minggu lagi di semester berikutnya, modul `b-xi2-m4` (pertanyaan 3). Jawab sekarang lalu simpan.

1. Mengapa mengukur waktu satu kali saja tidak cukup untuk membandingkan dua solusi?
2. Apa yang dimaksud solusi "kuadrat", dan apa yang terjadi pada waktunya bila `n` berlipat dua?
3. Apa imbalan yang dibayar solusi `Set` untuk mengurangi langkah?

## Kesalahan umum

- **Mengukur satu kali.** Hasil satu kali jalan dipengaruhi beban komputer; pada percobaan penyusun, angka bubble sort untuk `n = 8000` berbeda sekitar 15 persen antar jalan. Ulang dan ambil median.
- **Membandingkan data berbeda.** Dua solusi harus diberi data persis sama (gunakan rumus tetap, bukan acak setiap kali).
- **Mengukur `console.log`.** Mencetak jauh lebih lambat daripada hitungan; ukur hanya pekerjaan yang dibandingkan.
- **Menyimpulkan terlalu jauh.** "Lebih cepat untuk `n = 8000`" bukan "lebih cepat untuk semua `n`"; untuk data sangat kecil perbedaan bisa hilang atau terbalik.
- **Mengira dua jawaban berbeda berarti ada yang salah.** Pada soal dua angka berjumlah target, dua solusi yang benar bisa memberi pasangan berbeda (pada percobaan penyusun, posisi `[0, 498]` dan `[248, 250]` untuk target 996 sama-sama benar).

## Cek mandiri

- [ ] Saya dapat menghitung langkah sebuah solusi dan menyebut polanya (linear, kuadrat, logaritmik).
- [ ] Saya dapat mengukur waktu dengan `performance.now`, pengulangan, dan median.
- [ ] Saya dapat membandingkan dua solusi dan menyebut imbalannya.
- [ ] Saya dapat menulis kesimpulan yang menyebut batas datanya.
- [ ] Saya tidak menyimpulkan dari satu pengukuran.

## Kunci dan petunjuk

**Ingat kembali.** 1: koin 1, 3, 4 dengan target 6: greedy memberi 4+1+1 (tiga koin) padahal 3+3 (dua koin); cukup satu contoh karena klaim "selalu optimal" menjadi salah. 2: `toEqual` membandingkan isi, sedangkan `toBe` membandingkan identitas sehingga dua array berisi sama tetap berbeda. 3: memeriksa tipe tanpa membuat berkas keluaran.

**Prediksi dulu.** 1: `45 190 780`. 2: sekitar empat kali (190/45 kira-kira 4,2 dan 780/190 kira-kira 4,1).

**Contoh setengah jadi.** Isi berurutan: `now`, `-`, `a - b`. Kuncinya (`ukur`) sama dengan yang di atas.

**Soal Parsons.** Urutan benar: c, b, d, a, f, e. `Set` dibuat dulu (c), perulangan membuka (b), cek dulu (d) lalu catat (a), tutup perulangan (f), dan `false` hanya bila perulangan selesai (e).

**Latihan.** 1: `banyakPasangan(5)` adalah 10; rumusnya `n × (n − 1) / 2`; untuk 1000 hasilnya 499.500. 2: tidak ada jawaban tunggal karena angka bergantung komputermu; harapannya, keduanya naik sekitar empat kali saat `n` berlipat dua; rubrik: ada tabel, jumlah pengulangan, median, dan kesimpulan yang menyebut batas. 3: contoh jawaban dijalankan penyusun (1000 langkah linear, 10 langkah biner):

```ts
function cariLinear(data: number[], target: number): number {
  let langkah = 0;
  for (const nilai of data) {
    langkah++;
    if (nilai === target) break;
  }
  return langkah;
}

function cariBiner(data: number[], target: number): number {
  let kiri = 0;
  let kanan = data.length - 1;
  let langkah = 0;
  while (kiri <= kanan) {
    langkah++;
    const tengah = Math.floor((kiri + kanan) / 2);
    const nilai = data[tengah];
    if (nilai === target) break;
    if (nilai !== undefined && nilai < target) kiri = tengah + 1;
    else kanan = tengah - 1;
  }
  return langkah;
}

const data = Array.from({ length: 1000 }, (_, i) => i);
console.log(cariLinear(data, 999), cariBiner(data, 999));
```

```text
1000 10
```

4: contoh jawaban dijalankan penyusun. Data 500 bilangan genap `0, 2, ..., 998`: target 1995 (ganjil) tidak mungkin, sehingga semua pasangan diperiksa; target 996 ada beberapa pasangan benar, dan kedua solusi menemukan pasangan yang berbeda. Hasil: `[posisi, posisi, langkah]`.

```ts
function duaAngkaBrute(data: number[], target: number): [number, number, number] {
  let langkah = 0;
  for (let i = 0; i < data.length; i++) {
    for (let j = i + 1; j < data.length; j++) {
      langkah++;
      if ((data[i] ?? 0) + (data[j] ?? 0) === target) return [i, j, langkah];
    }
  }
  return [-1, -1, langkah];
}

function duaAngkaMap(data: number[], target: number): [number, number, number] {
  const posisi = new Map<number, number>();
  let langkah = 0;
  for (let j = 0; j < data.length; j++) {
    langkah++;
    const nilai = data[j] ?? 0;
    const i = posisi.get(target - nilai);
    if (i !== undefined) return [i, j, langkah];
    posisi.set(nilai, j);
  }
  return [-1, -1, langkah];
}

const data = Array.from({ length: 500 }, (_, i) => i * 2);
console.log(duaAngkaBrute(data, 1995), duaAngkaMap(data, 1995));
console.log(duaAngkaBrute(data, 996), duaAngkaMap(data, 996));
```

```text
[ -1, -1, 124750 ] [ -1, -1, 500 ]
[ 0, 498, 498 ] [ 248, 250, 251 ]
```

**Latihan bercampur.** 1: `fibMemo(30)` jauh lebih cepat karena panggilannya hanya sekitar `n`, sedangkan `fibBiasa(30)` memanggil jutaan kali; angka milidetiknya bergantung komputermu. 2: contoh `duplikat.test.ts`, dijalankan penyusun dengan `bun test` (lima kasus):

```ts
import { expect, test } from "bun:test";
import { duplikatKuadrat, duplikatSet } from "./duplikat-lib";

const kasus: number[][] = [[], [5], [1, 2, 3], [1, 2, 1], [4, 4]];

for (const data of kasus) {
  test(`kedua solusi sepakat untuk [${data.join(", ")}]`, () => {
    expect(duplikatSet(data).ada).toBe(duplikatKuadrat(data).ada);
  });
}
```

```text
bun test v1.4.4 (38afee6c8)

 5 pass
 0 fail
 5 expect() calls
Ran 5 tests across 1 file. [4.00ms]
```

(`duplikat-lib.ts` berisi kedua fungsi dengan `export`.)

**Ulang berjarak.** 1: hasil satu kali dipengaruhi beban komputer dan keadaan sesaat; ulangi dan ambil median agar adil. 2: banyak langkahnya mendekati `n × n / 2`; saat `n` berlipat dua, waktu naik sekitar empat kali. 3: memori tambahan untuk menyimpan `Set` (waktu ditukar dengan ruang).

## Langkah berikutnya

Modul berikut: `b-xi1-m11` (kualitas kode), yang merapikan proyekmu dengan linter dan pemformat. Modul terkait: `matkom-pertumbuhan-fungsi`. Bacaan lanjut: halaman MDN tentang `performance.now()` dan `Array.prototype.sort`.
