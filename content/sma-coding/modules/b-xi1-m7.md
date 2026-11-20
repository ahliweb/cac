## Untuk siapa modul ini

Modul ini untuk murid kelas XI jalur B (Web dengan JavaScript, TypeScript, dan Bun), minggu `B-XI1-M7` silabus v1.4.1: pengujian dengan `bun test`. Prasyarat: modul `b-xi1-m6` (modul ESM dan paket). Kamu juga memakai pengurutan dari `b-x2-m9` dan tipe dari `b-xi1-m4`.

Modul ini karangan penyusun dan disetujui pemilik program pada 2026-11-20 (keputusan lewat dialog; catatan tinjauan menjadi tindak lanjut revisi). Butir `F-AP-c` (pengembangan, pemeliharaan, penyempurnaan algoritma standar, kualitas kode) dipetakan silabus sebagai dipenuhi jalur ini; pemenuhan butir mengikuti pemetaan silabus, bukan status modul.

Semua contoh dijalankan penyusun dengan Bun 1.4.4 per 2026-11 dan diperiksa dengan `bun check` (TypeScript 7.0.2) di proyek hasil `bun init`. Waktu dalam keluaran (angka dalam kurung siku) berbeda di komputermu. Tidak ada akun dan tidak ada data nyata. Tugas baca-dan-prediksi ditandai `AI: tanpa AI`; selain itu AI generatif boleh dipakai dengan etika dan dicatat, tanpa data pribadi, kata sandi, atau tugas bernilai pada permintaanmu.

## Ingat kembali

Jawab dari ingatan dulu, baru cek di bagian kunci. Soal 1 dari `b-xi1-m6`, soal 2 dari `b-xi1-m4`, soal 3 dari `b-x2-m13`.

1. Apa beda ekspor bernama dan ekspor bawaan, dan bagaimana masing-masing diimpor?
2. Mengapa `daftar[0]` bertipe `number | undefined` bila `noUncheckedIndexedAccess` menyala?
3. Mengapa menguji dengan masukan kecil yang jawabannya sudah dihitung sebelum menjalankan program?

## Tujuan

Setelah modul ini kamu dapat:

- menulis uji unit dengan `test`, `describe`, dan `expect` dari `bun:test`;
- memilih kasus uji yang mencakup kasus biasa, kosong, kembar, dan batas;
- menjalankan `bun test` dan membaca keluaran lolos maupun gagal;
- menyatakan apa yang dibuktikan dan tidak dibuktikan oleh uji yang lolos (keluaran minggu ini: berkas `*.test.ts`).

## Prediksi dulu

Ini tugas baca-dan-prediksi, `AI: tanpa AI`. **Tebak dulu, tulis jawabanmu, baru jalankan.** Dua fungsi `urutNaik` di bawah dipasang secara bergantian pada berkas uji yang sama (lihat berkas ujinya di `Contoh terselesaikan`). Yang pertama memakai `sort()` bawaan tanpa pembanding:

```ts
export function urutNaik(data: number[]): number[] {
  return [...data].sort();
}
```

Yang kedua menyisipkan tiap angka ke tempatnya pada hasil yang sudah terurut:

```ts
export function urutNaik(data: number[]): number[] {
  const hasil: number[] = [];
  for (const n of data) {
    const posisi = hasil.findIndex((x) => x > n);
    hasil.splice(posisi === -1 ? hasil.length : posisi, 0, n);
  }
  return hasil;
}
```

1. Untuk masukan `[10, 9, 1]`, apa keluaran masing-masing fungsi?
2. Dari lima uji di berkas uji, mana yang menurutmu gagal pada fungsi pertama?

## Contoh terselesaikan

`bun test` mencari berkas bernama `*.test.ts` (dan beberapa pola lain, termasuk `*_test.ts` dan `*.spec.ts`, menurut dokumentasi Bun), menjalankan tiap `test`, dan melaporkannya. Berkas ujinya:

```ts
import { describe, expect, test } from "bun:test";
import { urutNaik } from "./urut.ts";

describe("urutNaik", () => {
  test("mengurutkan tiga angka acak", () => {
    expect(urutNaik([3, 1, 2])).toEqual([1, 2, 3]);
  });

  test("angka dua digit diurutkan sebagai angka, bukan teks", () => {
    expect(urutNaik([10, 9, 1])).toEqual([1, 9, 10]);
  });

  test("data kosong tetap kosong", () => {
    expect(urutNaik([])).toEqual([]);
  });

  test("angka kembar dipertahankan", () => {
    expect(urutNaik([2, 1, 2])).toEqual([1, 2, 2]);
  });

  test("masukan asli tidak diubah", () => {
    const asli = [3, 1, 2];
    urutNaik(asli);
    expect(asli).toEqual([3, 1, 2]);
  });
});
```

Perhatikan kebiasaannya: **jawaban dihitung dulu dengan tangan, baru program dijalankan.** `[3, 1, 2]` pasti `[1, 2, 3]`; angka dua digit `[10, 9, 1]` sengaja dipilih karena itulah yang membongkar urutan teks. Tanpa jawaban yang pasti, program yang salah bisa tampak benar. `describe` mengelompokkan uji, `test` satu skenario, `expect(hasil).toEqual(harapan)` membandingkan **isi**. `toBe` membandingkan identitas, jadi dua array berisi sama tetap tidak `toBe`. Dengan fungsi kedua (penyisipan) pada percobaan penyusun:

```text
bun test v1.4.4 (38afee6c8)

 5 pass
 0 fail
 5 expect() calls
Ran 5 tests across 1 file. [6.00ms]
```

Dengan fungsi pertama (`sort()` tanpa pembanding) satu uji gagal:

```text
bun test v1.4.4 (38afee6c8)

urut.test.ts:
 5 |   test("mengurutkan tiga angka acak", () => {
 6 |     expect(urutNaik([3, 1, 2])).toEqual([1, 2, 3]);
 7 |   });
 8 | 
 9 |   test("angka dua digit diurutkan sebagai angka, bukan teks", () => {
10 |     expect(urutNaik([10, 9, 1])).toEqual([1, 9, 10]);
                                      ^
error: expect(received).toEqual(expected)

@@ -2,4 +2,4 @@
    1,
-   9,
    10,
+   9,
  ]

- Expected  - 1
+ Received  + 1

      at <anonymous> (.../urut.test.ts:10:34)
(fail) urutNaik > angka dua digit diurutkan sebagai angka, bukan teks [0.79ms]

 4 pass
 1 fail
 5 expect() calls
Ran 5 tests across 1 file. [6.00ms]
```

(Jalur lengkap berkas di baris `at` diganti `...`.) Cara membaca: nama berkas, kutipan baris uji dengan penanda `^`, lalu selisih. Tanda `-` menandai yang diharapkan, `+` yang diterima: `sort()` bawaan mengurutkan sebagai teks sehingga `10` mendahului `9`. Pada contoh ini kamu menemukan galat itu dari satu uji yang dipilih dengan sengaja. Untuk galat, uji juga bisa menyatakan bahwa sesuatu **harus** gagal:

```ts
import { expect, test } from "bun:test";
import { rataRata } from "./rata.ts";

test("rata-rata 80, 75, 90 dihitung dulu: 245 / 3", () => {
  expect(rataRata([80, 75, 90])).toBeCloseTo(81.6667, 4);
});

test("array kosong melempar RangeError", () => {
  expect(() => rataRata([])).toThrow("data kosong");
});
```

`toBeCloseTo` dipakai untuk bilangan pecahan karena `245 / 3` tidak tepat di komputer. `toThrow` menerima fungsi (bukan hasil panggilannya). Keduanya lolos pada percobaan penyusun. Ingat batasnya: uji yang lolos berarti **lima skenario itu** benar, bukan berarti fungsinya benar untuk semua masukan, dan bukan berarti tipenya benar (itu tugas `bun check`). Uji dan pemeriksa tipe saling melengkapi.

## Contoh setengah jadi

Lengkapi satu uji untuk fungsi `jumlah` yang menjumlahkan array angka: kasus kosong harus 0, dan `[2, 3]` harus 5.

```ts setengah-jadi
import { expect, test } from "bun:test";
import { jumlah } from "./jumlah.ts";

test("jumlah array kosong", () => {
  expect(jumlah([])).____(0);
});

test("jumlah dua angka", () => {
  expect(jumlah([2, 3])).____(____);
});
```

## Soal Parsons

Susun baris berikut (sudah diacak) menjadi satu uji yang lengkap. `AI: tanpa AI`.

```text
(a) });
(b) expect(urutNaik([2, 1])).toEqual([1, 2]);
(c) test("dua angka terbalik", () => {
(d) import { expect, test } from "bun:test";
```

## Latihan

1. `AI: tanpa AI` **Telusuri.** Tulis dulu di kertas keluaran `urutNaik` untuk `[5, 5, 1, 0]`, lalu tambahkan sebagai uji dan jalankan. Cocokkan.
2. `AI: boleh` **Uji fungsi pengurutan.** Ambil fungsi pengurutan dari `b-x2-m9` (bubble sort atau insertion sort), taruh di `urut.ts`, dan tulis lima uji: acak, kosong, satu elemen, kembar, dan sudah terurut.
3. `AI: tanpa AI` **Rancangan dulu.** Sebelum menulis fungsi `maksimum(nilai: number[])`, tulis daftar kasus uji dan hasil harapannya, termasuk array kosong. Putuskan apa yang seharusnya terjadi bila kosong.
4. `AI: boleh` **Bongkar sendiri.** Ubah fungsi pengurutanmu agar salah satu uji gagal (mis. hilangkan satu langkah), baca keluarannya, dan tulis tiga hal yang kamu pelajari dari pesan gagal.
5. *Opsional:* **catatan pemakaian AI.** Kerjakan nomor 3 sendiri dulu, lalu minta AI mengusulkan kasus uji tambahan yang terlewat, bukan menulis fungsinya. Hitung sendiri jawaban tiap kasus sebelum memasukkannya. Catat alat, tujuan, garis besar perintah, bagian yang kamu pakai, dan cara memeriksanya. Jangan menaruh data pribadi atau tugas bernilai pada perintah.

## Latihan bercampur

1. `AI: boleh` Pada fungsi `rataRata` di atas, mengapa tipe kembalian `number` kurang jujur bila array kosong mengembalikan `0`, dan apa pilihannya (`b-xi1-m4`)?
2. `AI: boleh` Letakkan `urut.ts` dan `urut.test.ts` di paket lokal (`b-xi1-m6`). Berkas mana yang diekspor lewat `index.ts` dan apakah berkas uji perlu diekspor?

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `b-xi1-m8` (pertanyaan 1), sekitar tiga minggu lagi di `b-xi1-m10` (pertanyaan 2), dan sekitar delapan minggu lagi di `b-xi2-m1` (pertanyaan 3). Jawab sekarang lalu simpan.

1. Apa fungsi `test`, `describe`, dan `expect` pada berkas `*.test.ts`?
2. Mengapa `toEqual` dipakai untuk membandingkan array, bukan `toBe`?
3. Apa yang dibuktikan dan tidak dibuktikan oleh uji yang lolos semua?

## Kesalahan umum

- **Menghitung jawaban harapan dari keluaran program.** Itu uji yang selalu lolos; hitung dulu dengan tangan.
- **Menguji hanya satu kasus.** Tambah kosong, satu elemen, kembar, dan batas.
- **Memakai `toBe` untuk array atau objek.** Bandingkan isi dengan `toEqual`.
- **Mengira uji lolos berarti program benar.** Ia hanya membuktikan skenario yang kamu tulis.
- **Menaruh nama berkas di luar pola.** `urut.tes.ts` tidak dikenali `bun test`; pakai `*.test.ts`.

## Cek mandiri

- [ ] Saya dapat menulis `test`, `describe`, dan `expect` dan menjalankannya dengan `bun test`.
- [ ] Saya menghitung jawaban harapan dengan tangan sebelum menjalankan.
- [ ] Saya dapat membaca keluaran uji yang gagal: berkas, baris, selisih `-` dan `+`.
- [ ] Saya memilih kasus kosong, kembar, dan batas.
- [ ] Saya dapat menyatakan batas pembuktian sebuah uji.

## Kunci dan petunjuk

**Ingat kembali.** 1: ekspor bernama diimpor dengan kurung kurawal dan nama yang sama; ekspor bawaan diimpor tanpa kurung dengan nama lokal bebas. 2: karena indeks bisa melewati ujung array sehingga elemen yang ada bisa tidak ada. 3: karena hasilnya bisa dibandingkan dengan jawaban yang sudah pasti; tanpa itu, program yang salah bisa tampak benar.

**Prediksi dulu.** 1: fungsi pertama `[1, 10, 9]` (urutan teks), fungsi kedua `[1, 9, 10]`. 2: uji kedua ("angka dua digit ...") gagal; pada uji lain `sort()` tanpa pembanding kebetulan memberi hasil yang benar karena angkanya satu digit.

**Contoh setengah jadi.** Isi: `toBe`, `toBe`, `5`. Kuncinya:

```ts
import { expect, test } from "bun:test";
import { jumlah } from "./jumlah.ts";

test("jumlah array kosong", () => {
  expect(jumlah([])).toBe(0);
});

test("jumlah dua angka", () => {
  expect(jumlah([2, 3])).toBe(5);
});
```

**Soal Parsons.** Urutan benar: d, c, b, a.

**Latihan.** 1: `[0, 1, 5, 5]`; tambahkan `test("kembar dan nol", () => { expect(urutNaik([5, 5, 1, 0])).toEqual([0, 1, 5, 5]); });`. 2: contoh kasus: `[4, 2, 7]` menjadi `[2, 4, 7]`, `[]` menjadi `[]`, `[9]` menjadi `[9]`, `[2, 2, 1]` menjadi `[1, 2, 2]`, `[1, 2, 3]` tetap. 3: contoh: `[1, 9, 3]` menghasilkan `9`; `[-5, -2]` menghasilkan `-2`; `[]`: lempar `RangeError` atau kembalikan `null`, asalkan diputuskan dan diuji. 4: contoh: pesan gagal menunjukkan baris uji, nilai `-` yang diharapkan dan `+` yang diterima, serta nama uji yang gagal.

**Latihan bercampur.** 1: `0` bisa dikira rata-rata sungguhan; pilihannya melempar galat (seperti contoh) atau mengembalikan `number | null`. 2: `index.ts` mengekspor fungsinya saja; berkas uji tidak diekspor karena bukan bagian yang dijanjikan ke pemakai.

**Ulang berjarak.** 1: `test` menulis satu skenario, `describe` mengelompokkan uji, `expect(...)` membandingkan hasil dengan harapan. 2: `toEqual` membandingkan isi, sedangkan `toBe` membandingkan identitas sehingga dua array berisi sama tetap berbeda. 3: dibuktikan bahwa skenario yang ditulis berjalan sesuai harapan; tidak dibuktikan bahwa fungsi benar untuk semua masukan atau bahwa tipenya benar.

## Langkah berikutnya

Modul berikut: `b-xi1-m8` (struktur data kompleks di TypeScript), yang memakai pengujian untuk `Map`, `Set`, dan graf. Bacaan lanjut: halaman Bun test dan Writing tests di dokumentasi Bun, yang ditautkan di rujukan.
