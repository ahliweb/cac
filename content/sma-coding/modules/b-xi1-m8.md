## Untuk siapa modul ini

Modul ini untuk murid kelas XI jalur B (Web dengan JavaScript, TypeScript, dan Bun), minggu `B-XI1-M8` silabus v1.4.1: struktur data kompleks di TypeScript. Prasyarat: modul `b-xi1-m7` (pengujian dengan `bun test`) dan `b-x2-m7` (tumpukan dan antrian).

Modul ini berstatus DRAF: karangan penyusun, belum ditinjau pemilik. Butir `F-AP-b`, `F-AP-d`, dan `F-BK-c` dipetakan silabus sebagai dipenuhi jalur ini; modul draf ini belum dihitung sebagai pemenuhan butir-butir itu.

Contoh dijalankan penyusun dengan Bun 1.4.4 dan TypeScript 7.0.2 per 2026-11 (`bun run berkas.ts`; pemeriksaan tipe dengan `bunx tsc --noEmit`). Ingat: `bun run` hanya menjalankan, sedangkan yang memeriksa tipe adalah `tsc`. Tugas baca-dan-prediksi ditandai `AI: tanpa AI`; selain itu AI generatif boleh dipakai dengan etika dan dicatat, tanpa data pribadi, kata sandi, atau tugas bernilai pada permintaanmu. Semua nama di contoh karangan, bukan orang nyata.

## Ingat kembali

Jawab dari ingatan dulu, baru cek di bagian kunci. Soal 1 dari `b-xi1-m7`, soal 2 dari `b-xi1-m5`, soal 3 dari `b-x2-m7`.

1. Apa fungsi `test`, `describe`, dan `expect` pada berkas `*.test.ts`?
2. Sebutkan tiga hal yang kamu periksa tentang sebuah paket sebelum `bun add`.
3. Apa beda LIFO dan FIFO? Beri satu contoh sehari-hari untuk tiap-tiapnya.

## Tujuan

Setelah modul ini kamu dapat:

- memakai `Map` dan `Set` dengan tipe (`Map<string, number>`) dan menjelaskan kapan memilihnya dibanding objek atau array;
- membungkus struktur data dalam kelas bertipe;
- menyimpan graf sebagai daftar ketetanggaan dan menelusurinya dengan BFS;
- membaca jarak BFS pada graf pertemanan sintetis (keluaran minggu ini: modul struktur data).

## Prediksi dulu

Ini tugas baca-dan-prediksi, `AI: tanpa AI`. **Tebak dulu, tulis jawabanmu, baru jalankan.**

```ts
const hitung = new Map<string, number>();
for (const kata of ["a", "b", "a", "c", "a", "b"]) {
  hitung.set(kata, (hitung.get(kata) ?? 0) + 1);
}
console.log([...hitung]);
console.log(new Set(["a", "b", "a"]).size);
```

1. Apa isi `hitung` pada akhirnya, dan dalam urutan apa?
2. Berapa ukuran `Set` pada baris terakhir, dan mengapa?

## Contoh terselesaikan

Keluaran program tadi:

```text
[
  [ "a", 3 ], [ "b", 2 ], [ "c", 1 ]
]
2
```

Menurut MDN, `Map` menyimpan pasangan kunci dan nilai, mengingat urutan kunci dimasukkan, dan kuncinya boleh bertipe apa saja; `Set` menyimpan nilai yang tidak berulang. `hitung.get(kata)` mengembalikan `undefined` bila kunci belum ada, maka `?? 0` memberi nilai awal. Dengan tipe, kesalahan ketahuan sebelum jalan. Berkas berikut diperiksa dengan `bunx tsc --noEmit` (galat tipe tidak menghentikan `bun run`, karena Bun hanya membuang tipenya):

```ts
const nilai = new Map<string, number>();
nilai.set("Ani", 90);
nilai.set("Beni", "delapan puluh");
const x: number = nilai.get("Cici");
console.log(x);
```

```sh
bunx tsc --noEmit
```

```text
salah.ts(3,19): error TS2345: Argument of type 'string' is not assignable to parameter of type 'number'.
salah.ts(4,7): error TS2322: Type 'number | undefined' is not assignable to type 'number'.
  Type 'undefined' is not assignable to type 'number'.
```

Galat pertama: nilai harus `number`. Galat kedua: `get` bisa mengembalikan `undefined`, dan TypeScript memaksamu menanganinya.

**Graf pertemanan.** Graf adalah simpul (orang) dan sisi (pertemanan). Cara menyimpannya yang praktis adalah **daftar ketetanggaan**: `Map` dari nama ke `Set` nama temannya. **BFS** (*breadth-first search*, penelusuran melebar) menelusuri lapis demi lapis dengan antrian: awal dulu, lalu teman-temannya, lalu teman dari teman. Karena yang terdekat diproses lebih dulu, jarak pertama yang tercatat untuk sebuah simpul adalah jarak terpendeknya.

```ts
class Graf {
  private tetangga = new Map<string, Set<string>>();

  tambahSisi(a: string, b: string): void {
    this.simpul(a).add(b);
    this.simpul(b).add(a);
  }

  private simpul(nama: string): Set<string> {
    let daftar = this.tetangga.get(nama);
    if (daftar === undefined) {
      daftar = new Set();
      this.tetangga.set(nama, daftar);
    }
    return daftar;
  }

  teman(nama: string): string[] {
    return [...(this.tetangga.get(nama) ?? [])];
  }

  jarakDari(awal: string): Map<string, number> {
    const jarak = new Map<string, number>([[awal, 0]]);
    const antrian: string[] = [awal];
    while (antrian.length > 0) {
      const sekarang = antrian.shift();
      if (sekarang === undefined) break;
      const jarakSekarang = jarak.get(sekarang) ?? 0;
      for (const t of this.teman(sekarang)) {
        if (!jarak.has(t)) {
          jarak.set(t, jarakSekarang + 1);
          antrian.push(t);
        }
      }
    }
    return jarak;
  }
}

const g = new Graf();
g.tambahSisi("Ani", "Beni");
g.tambahSisi("Ani", "Cici");
g.tambahSisi("Beni", "Dedi");
g.tambahSisi("Cici", "Dedi");
g.tambahSisi("Dedi", "Eka");
g.tambahSisi("Fani", "Gani");

console.log(g.teman("Dedi"));
const jarak = g.jarakDari("Ani");
for (const [nama, j] of jarak) {
  console.log(nama, j);
}
console.log(jarak.get("Fani") ?? "tidak terhubung");
```

```text
[ "Beni", "Cici", "Eka" ]
Ani 0
Beni 1
Cici 1
Dedi 2
Eka 3
tidak terhubung
```

`private` dan tipe `Set` melindungi daftar dari akses sembarangan, dan `Set` mencegah teman ganda. `jarak` sekaligus berfungsi sebagai catatan "sudah dikunjungi": tanpanya, graf berputar (Ani-Beni-Dedi-Cici-Ani) membuat antrian tak pernah habis. Fani dan Gani tidak pernah tercapai dari Ani karena berada di kelompok terpisah. Setiap simpul masuk antrian paling banyak sekali, jadi pekerjaan tumbuh sebanding dengan banyak simpul ditambah sisi; `shift()` menggeser isi array, yang untuk data kecil tidak masalah.

## Contoh setengah jadi

Lengkapi fungsi di bawah (peta ketetanggaan sebagai parameter) agar menghitung jumlah teman dan teman bersama dua orang.

```ts setengah-jadi
function jumlahTeman(peta: Map<string, Set<string>>, nama: string): ____ {
  return (peta.get(nama) ?? new Set()).____;
}

function temanBersama(
  peta: Map<string, Set<string>>,
  a: string,
  b: string,
): string[] {
  const milikB = peta.get(b) ?? new ____<string>();
  return [...(peta.get(a) ?? [])].filter((t) => milikB.____(t));
}
```

## Soal Parsons

Susun baris-baris berikut (sudah diacak) menjadi isi perulangan BFS yang benar. `AI: tanpa AI`.

```text
(a) const sekarang = antrian.shift();
(b) antrian.push(t);
(c) while (antrian.length > 0) {
(d) if (!jarak.has(t)) {
(e) jarak.set(t, jarakSekarang + 1);
(f) for (const t of this.teman(sekarang)) {
```

## Latihan

1. `AI: tanpa AI` **Telusuri.** Sisi: P-Q, P-R, Q-S, R-S, S-T, U-V. Telusuri BFS dari `P`: tulis isi antrian dan tabel `jarak` tiap langkah. Berapa jarak ke `T`, dan bagaimana dengan `U`?
2. `AI: boleh` **Frekuensi.** Tulis `frekuensi(teks: string): Map<string, number>` yang menghitung tiap huruf, lalu cetak hasilnya terurut dari yang terbanyak untuk `"mississippi"` (huruf sama banyak urut abjad).
3. `AI: boleh` **Populer.** Tulis `orangTerpopuler(peta)` yang mengembalikan nama dengan teman terbanyak (seri: nama pertama menurut abjad).
4. `AI: boleh` **Tulis pseudocode dulu**, lalu kode `banyakKelompok(peta)` yang menghitung berapa kelompok pertemanan yang saling terpisah.
5. *Opsional:* **catatan pemakaian AI.** Kerjakan nomor 4 sendiri dulu, lalu minta petunjuk bertahap, bukan jawaban jadi. Catat alatnya, tujuanmu, garis besar perintahmu, bagian yang kamu pakai, dan cara memeriksanya (jalankan dengan graf yang kamu gambar sendiri). Jangan menaruh data pribadi atau tugas bernilai pada perintah.

## Latihan bercampur

1. `AI: boleh` (dari `b-x2-m7`) Ganti array `antrian` di `jarakDari` dengan kelas `Antrian` buatanmu. Apa yang menjadi lebih jelas dibaca?
2. `AI: boleh` (dari `b-xi1-m7`) Pindahkan kelas `Graf` ke `graf-lib.ts` dengan `export`, lalu tulis dua uji `bun test`: sisi yang sama dua kali tidak menggandakan teman, dan jarak ke diri sendiri adalah 0.

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `b-xi1-m9` (pertanyaan 1), sekitar tiga minggu lagi di `b-xi1-m11` (pertanyaan 2), dan sekitar delapan minggu lagi di semester berikutnya, modul `b-xi2-m2` (pertanyaan 3). Jawab sekarang lalu simpan.

1. Apa fungsi `Set` pada daftar ketetanggaan, dan apa yang terjadi bila `tambahSisi` dipanggil dua kali untuk pasangan yang sama?
2. Mengapa BFS memerlukan catatan "sudah dikunjungi" pada graf yang berputar?
3. Apa kelebihan `Map` dibanding objek biasa untuk menyimpan pasangan kunci dan nilai?

## Kesalahan umum

- **Mengira `Set` membandingkan isi objek.** `new Set([{ id: 1 }, { id: 1 }]).size` bernilai 2 pada percobaan penyusun, sedangkan `new Set(["x", "x"]).size` bernilai 1: objek dibandingkan menurut identitasnya, bukan isinya.
- **Mencampur kunci angka dan teks pada objek.** Objek mengubah kunci menjadi teks, sehingga `objek[1]` dan `objek["1"]` sama (1 kunci pada percobaan penyusun); `Map` membedakannya (2 kunci).
- **Menambah sisi satu arah.** Pertemanan dua arah: lupa `add(a)` pada daftar `b` membuat BFS dari `b` tidak menemukan `a`.
- **Lupa menangani `undefined`.** `get` pada `Map` dan `shift` pada array kosong mengembalikan `undefined`; TypeScript mengingatkan, jangan dibungkam dengan `as`.
- **Menandai dikunjungi terlambat.** Bila simpul dicatat setelah keluar dari antrian, simpul yang sama bisa masuk antrian berkali-kali.

## Cek mandiri

- [ ] Saya dapat memilih `Map`, `Set`, objek, atau array untuk suatu data dan menjelaskan alasannya.
- [ ] Saya dapat menulis kelas bertipe yang membungkus struktur data.
- [ ] Saya dapat menyimpan graf sebagai daftar ketetanggaan.
- [ ] Saya dapat menelusuri BFS dan membaca jaraknya.
- [ ] Saya hanya memakai data karangan, bukan data orang nyata.

## Kunci dan petunjuk

**Ingat kembali.** 1: `test` menulis satu skenario, `describe` mengelompokkan uji, `expect(...)` membandingkan hasil dengan harapan. 2: contoh: nama ada di registri, lisensi jelas, pengelola atau halaman proyek, usia atau jumlah versi, dependensi sedikit. 3: LIFO: yang terakhir masuk keluar lebih dulu (tumpukan piring, tombol urung), diwujudkan dengan `push` dan `pop`; FIFO: yang pertama masuk keluar lebih dulu (antrean loket), diwujudkan dengan `push` dan `shift`.

**Prediksi dulu.** 1: `[["a", 3], ["b", 2], ["c", 1]]`, urut menurut kunci pertama kali dimasukkan. 2: 2, karena `Set` tidak menyimpan nilai ganda.

**Contoh setengah jadi.** Isi berurutan: `number`, `size`, `Set`, `has`. Kuncinya dijalankan penyusun:

```ts
function jumlahTeman(peta: Map<string, Set<string>>, nama: string): number {
  return (peta.get(nama) ?? new Set()).size;
}

function temanBersama(
  peta: Map<string, Set<string>>,
  a: string,
  b: string,
): string[] {
  const milikB = peta.get(b) ?? new Set<string>();
  return [...(peta.get(a) ?? [])].filter((t) => milikB.has(t));
}

const peta = new Map<string, Set<string>>([
  ["Ani", new Set(["Beni", "Cici"])],
  ["Beni", new Set(["Ani", "Dedi"])],
  ["Cici", new Set(["Ani", "Dedi"])],
  ["Dedi", new Set(["Beni", "Cici"])],
]);
console.log(jumlahTeman(peta, "Ani"), jumlahTeman(peta, "Zara"));
console.log(temanBersama(peta, "Ani", "Dedi"));
```

```text
2 0
[ "Beni", "Cici" ]
```

**Soal Parsons.** Urutan benar: c, a, f, d, e, b. `while` membungkus semuanya; ambil simpul (a), telusuri temannya (f), hanya yang belum punya jarak (d), catat jaraknya (e), baru masukkan ke antrian (b). Baris `jarakSekarang` dan penutup kurung ada di antaranya.

**Latihan.** 1: antrian `[P]`; ambil P: Q=1, R=1, antrian `[Q, R]`; ambil Q: S=2; ambil R: S sudah ada; ambil S: T=3. Jarak ke `T` adalah 3; `U` tidak terhubung dengan `P`, jadi tidak punya jarak. 2: contoh jawaban dijalankan penyusun:

```ts
function frekuensi(teks: string): Map<string, number> {
  const hasil = new Map<string, number>();
  for (const huruf of teks) {
    hasil.set(huruf, (hasil.get(huruf) ?? 0) + 1);
  }
  return hasil;
}

const urut = [...frekuensi("mississippi")].sort(
  (a, b) => b[1] - a[1] || a[0].localeCompare(b[0]),
);
console.log(urut);
```

```text
[
  [ "i", 4 ], [ "s", 4 ], [ "p", 2 ], [ "m", 1 ]
]
```

3: contoh jawaban (`Beni` dan `Dedi` sama-sama 3 teman; `Beni` lebih dulu menurut abjad dan hanya diganti bila *lebih banyak*):

```ts
function orangTerpopuler(peta: Map<string, Set<string>>): string {
  let terbaik = "";
  let jumlahTerbaik = -1;
  for (const [nama, teman] of [...peta].sort((a, b) => a[0].localeCompare(b[0]))) {
    if (teman.size > jumlahTerbaik) {
      terbaik = nama;
      jumlahTerbaik = teman.size;
    }
  }
  return terbaik;
}

const peta = new Map<string, Set<string>>([
  ["Dedi", new Set(["Beni", "Cici", "Eka"])],
  ["Beni", new Set(["Dedi", "Cici", "Ani"])],
  ["Cici", new Set(["Dedi", "Beni"])],
  ["Ani", new Set(["Beni"])],
  ["Eka", new Set(["Dedi"])],
]);
console.log(orangTerpopuler(peta));
```

```text
Beni
```

4: pseudocode: `kelompok = 0`; untuk tiap simpul yang belum dikunjungi: `kelompok` bertambah, lakukan BFS dari simpul itu dan tandai semua yang tercapai. Contoh jawaban dijalankan penyusun (5 simpul, 3 kelompok: Ani-Beni, Cici-Dedi, Eka sendirian):

```ts
function banyakKelompok(peta: Map<string, Set<string>>): number {
  const dikunjungi = new Set<string>();
  let kelompok = 0;
  for (const awal of peta.keys()) {
    if (dikunjungi.has(awal)) continue;
    kelompok++;
    const antrian = [awal];
    dikunjungi.add(awal);
    while (antrian.length > 0) {
      const sekarang = antrian.shift();
      if (sekarang === undefined) break;
      for (const t of peta.get(sekarang) ?? []) {
        if (!dikunjungi.has(t)) {
          dikunjungi.add(t);
          antrian.push(t);
        }
      }
    }
  }
  return kelompok;
}

const peta = new Map<string, Set<string>>([
  ["Ani", new Set(["Beni"])],
  ["Beni", new Set(["Ani"])],
  ["Cici", new Set(["Dedi"])],
  ["Dedi", new Set(["Cici"])],
  ["Eka", new Set()],
]);
console.log(banyakKelompok(peta));
```

```text
3
```

**Latihan bercampur.** 1: pemanggilan `antrian.masuk(t)` dan `antrian.keluar()` menyatakan maksudnya (antrian) dibanding `push` dan `shift`, dan pemeriksaan `kosong()` menggantikan `length > 0`. 2: contoh berkas `graf.test.ts`, dijalankan penyusun dengan `bun test`:

```ts
import { expect, test } from "bun:test";
import { Graf } from "./graf-lib";

test("sisi yang sama dua kali tidak menggandakan teman", () => {
  const g = new Graf();
  g.tambahSisi("Ani", "Beni");
  g.tambahSisi("Beni", "Ani");
  expect(g.teman("Ani")).toEqual(["Beni"]);
});

test("jarak ke diri sendiri adalah 0", () => {
  const g = new Graf();
  g.tambahSisi("Ani", "Beni");
  expect(g.jarakDari("Ani").get("Ani")).toBe(0);
});
```

```text
bun test v1.4.4 (38afee6c8)

 2 pass
 0 fail
 2 expect() calls
Ran 2 tests across 1 file. [5.00ms]
```

**Ulang berjarak.** 1: `Set` menjaga tiap teman hanya sekali; pemanggilan kedua tidak mengubah apa pun. 2: tanpa catatan itu, simpul pada putaran dimasukkan ke antrian terus-menerus dan perulangan tidak berhenti. 3: kunci boleh bertipe apa saja tanpa diubah menjadi teks, urutan masuk terjaga, dan ukurannya langsung tersedia lewat `size`.

## Langkah berikutnya

Modul berikut: `b-xi1-m9` (strategi algoritmik di TypeScript: greedy, rekursi, memoisasi), yang memakai `Map` sebagai catatan hasil. Modul terkait: `matkom-himpunan-relasi-fungsi`. Bacaan lanjut: halaman MDN tentang `Map` dan `Set`, dan halaman TypeScript tentang generik.
