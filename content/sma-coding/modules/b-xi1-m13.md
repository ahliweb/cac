## Untuk siapa modul ini

Modul ini untuk murid kelas XI jalur B (Web dengan JavaScript, TypeScript, dan Bun), minggu `B-XI1-M13` silabus v1.4.1: proyek mini, pustaka TypeScript teruji, dikerjakan berkelompok dua sampai tiga orang. Prasyarat: modul `b-xi1-m12` (alur kerja Git dan ulasan).

Modul ini karangan penyusun dan disetujui pemilik program pada 2026-11-20 (keputusan lewat dialog; catatan tinjauan menjadi tindak lanjut revisi). Butir `F-AP-b` (program terstruktur berdasarkan strategi) dipetakan silabus sebagai dipenuhi jalur ini; pemenuhan butir mengikuti pemetaan silabus, bukan status modul. Penilaian memakai rubrik gurumu; modul ini tidak menilai.

Contoh dijalankan penyusun dengan Bun 1.4.4, TypeScript 7.0.2, dan Biome 2.6.8 per 2026-11. Tanpa akun dan tanpa layanan luar: repositori pusat berupa folder seperti di `b-xi1-m12`. AI generatif boleh dipakai dengan etika dan dicatat, tanpa data pribadi, kata sandi, atau tugas bernilai pada permintaanmu; kode buatan AI harus kamu baca, jalankan, uji, dan jelaskan sendiri.

## Ingat kembali

Jawab dari ingatan dulu, baru cek di bagian kunci. Soal 1 dari `b-xi1-m12`, soal 2 dari `b-xi1-m10`, soal 3 dari `b-xi1-m5`.

1. Apa beda `git diff main..fitur` dan `git diff main...fitur`, dan mana yang dipakai peninjau untuk melihat isi cabang?
2. Apa yang dimaksud solusi "kuadrat", dan apa yang terjadi pada waktunya bila `n` berlipat dua?
3. Mengapa folder `node_modules` tidak dimasukkan ke Git, dan bagaimana temanmu mendapatkannya?

## Tujuan

Setelah modul ini kamu dapat:

- merencanakan pustaka kecil: pengguna, antarmuka publik, kasus uji, dan pembagian tugas;
- menulis pustaka TypeScript bertipe (tanpa `any`) yang dipecah menjadi modul dan diekspor lewat `index.ts`;
- menulis uji `bun test` yang menjaga perilaku, lalu menjalankan pemeriksaan tipe, linter, dan uji;
- bekerja berkelompok dengan cabang dan ulasan (keluaran minggu ini: pustaka dan uji).

## Rencana proyek

Tulis rencana satu halaman **sebelum** mengetik kode: tujuan, siapa penggunanya, antarmuka publik, kasus uji (termasuk kasus tepi), pembagian tugas, kriteria selesai, dan prediksimu. Contoh terselesaikan untuk pustaka kecil bernama `pustaka-antrian`:

| Bagian | Isi contoh |
| --- | --- |
| Tujuan | Pustaka dengan `Antrian<T>` dan `Tumpukan<T>` bertipe generik, mudah dipakai dan teruji. |
| Pengguna | Murid lain yang butuh antrian atau tumpukan tanpa menulis ulang. |
| Antarmuka publik | `masuk`, `keluar`, `depan` atau `puncak`, `kosong`, `ukuran`; hanya `Antrian` dan `Tumpukan` yang diekspor dari `index.ts`. |
| Kasus uji | baru dibuat kosong; urutan FIFO dan LIFO; `depan` tidak membuang; `keluar` dari kosong memberi `undefined`. |
| Pembagian | Ani: `antrian.ts` dan ujinya. Beni: `tumpukan.ts` dan ujinya. Cici: `index.ts`, README, dan ulasan. Satu cabang per orang. |
| Kriteria selesai | `bunx tsc --noEmit`, `bunx biome lint src`, dan `bun test` lolos; tiap cabang digabung setelah satu ulasan. |
| Prediksi | Enam uji lulus pada percobaan pertama? Tulis tebakanmu dan bandingkan. |

Kelas bertipe generik: `T` adalah tipe yang ditentukan pemakai, sehingga `Antrian<string>` menolak angka. Kembalian `T | undefined` memaksa pemakai menangani antrian kosong. Satu berkas, satu tanggung jawab:

```ts
export class Antrian<T> {
  private isi: T[] = [];

  masuk(nilai: T): void {
    this.isi.push(nilai);
  }

  keluar(): T | undefined {
    return this.isi.shift();
  }

  depan(): T | undefined {
    return this.isi[0];
  }

  kosong(): boolean {
    return this.isi.length === 0;
  }

  ukuran(): number {
    return this.isi.length;
  }
}
```

`Tumpukan<T>` serupa dengan `pop` dan `puncak`. `index.ts` hanya mengumpulkan dan mengekspor antarmuka publik:

```ts
import { Antrian } from "./antrian";
import { Tumpukan } from "./tumpukan";

export { Antrian, Tumpukan };
```

Ujinya (`src/antrian.test.ts`; uji tumpukan serupa):

```ts
import { expect, test } from "bun:test";
import { Antrian } from "./index";

test("antrian baru kosong", () => {
  const a = new Antrian<number>();
  expect(a.kosong()).toBe(true);
  expect(a.ukuran()).toBe(0);
});

test("yang pertama masuk keluar lebih dulu", () => {
  const a = new Antrian<string>();
  a.masuk("satu");
  a.masuk("dua");
  expect(a.keluar()).toBe("satu");
  expect(a.keluar()).toBe("dua");
});

test("depan hanya melihat, tidak membuang", () => {
  const a = new Antrian<number>();
  a.masuk(7);
  expect(a.depan()).toBe(7);
  expect(a.ukuran()).toBe(1);
});

test("keluar dari antrian kosong memberi undefined", () => {
  expect(new Antrian<number>().keluar()).toBeUndefined();
});
```

```sh
bun test
bunx tsc --noEmit
bunx biome lint src
```

```text
bun test v1.4.4 (38afee6c8)

 6 pass
 0 fail
 10 expect() calls
Ran 6 tests across 2 files. [3.00ms]
Checked 5 files in 3ms. No fixes applied.
```

(`bunx tsc --noEmit` tidak mencetak apa pun bila bersih.) Pemakai pustaka cukup mengimpor dari `index`:

```ts
import { Antrian, Tumpukan } from "./src/index";

const loket = new Antrian<string>();
loket.masuk("Ani");
loket.masuk("Beni");
console.log(loket.keluar(), loket.ukuran());

const riwayat = new Tumpukan<number>();
riwayat.masuk(1);
riwayat.masuk(2);
console.log(riwayat.puncak(), riwayat.keluar(), riwayat.ukuran());
```

```text
Ani 1
2 2 1
```

Kelompokmu memilih topik sendiri: statistik (`rataRata`, `median`, `modus`), alat teks (hitung kata, balik teks, palindrom), graf dari `b-xi1-m8`, atau topik lain dengan persetujuan gurumu. Syarat minimal: tiga fungsi atau kelas publik, sedikitnya dua uji tiap satu, tanpa `any`, dan README berisi contoh pemakaian.

## Daftar periksa

- [ ] Rencana satu halaman ada sebelum kode pertama, dan disepakati kelompok.
- [ ] Tiap anggota mengerjakan satu cabang dan membuka satu permintaan penggabungan (cara `b-xi1-m12`).
- [ ] Setiap permintaan ditinjau minimal satu orang lain dengan temuan, alasan, dan saran.
- [ ] `bunx tsc --noEmit`, `bunx biome lint src`, dan `bun test` lolos pada `main` akhir.
- [ ] Ada uji untuk kasus tepi (kosong, satu elemen, masukan tak sah).
- [ ] Tidak ada rahasia, data pribadi, atau sisa debug di repositori.
- [ ] Bila memakai AI: log pemakaian (alat, tujuan, garis besar perintah, bagian yang dipakai, cara memeriksa).

## Umpan balik sejawat

Tukar pustaka dengan kelompok lain dan beri ulasan dengan format: **satu yang sudah baik, satu yang perlu diperbaiki, satu langkah berikutnya**. Coba pakai pustaka mereka hanya dari README: bila kamu butuh membaca kodenya untuk tahu cara memakainya, README-nya belum cukup. Pemrograman berpasangan paling banyak dibuktikan pada mahasiswa; efeknya pada murid SMA belum terbukti `[belum terverifikasi]`, jadi bagikan tugas dengan adil dan bergantian.

## Latihan bercampur

1. `AI: boleh` (dari `b-xi1-m10`) Buat versi `Antrian` yang tidak memakai `shift()` tetapi indeks `kepala`. Ukur keduanya dengan 100.000 `masuk` dan `keluar`, dan pastikan uji lama tetap lulus.
2. `AI: boleh` (dari `b-xi1-m11`) Sertakan keluaran `bun run cek` pada keterangan permintaan penggabungan. Apa yang diyakinkan peninjau dari keluaran itu, dan apa yang tidak?

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `b-xi1-m14` (pertanyaan 4), sekitar tiga minggu lagi di `b-xi2-m2` (pertanyaan 2), dan sekitar delapan minggu lagi di semester berikutnya, modul `b-xi2-m7` (pertanyaan 3). Jawab sekarang lalu simpan.

1. Mengapa pustaka memakai tipe generik seperti `Antrian<T>` dan bukan `any`?
2. Apa isi `index.ts` sebuah pustaka dan mengapa berkas itu ada?
3. Sebutkan tiga pemeriksaan yang harus lulus sebelum pustaka diserahkan.

## Kesalahan umum

- **Langsung mengetik kode.** Tanpa rencana, antarmuka berubah-ubah dan uji ditulis belakangan atau tidak sama sekali.
- **Mengekspor semuanya.** Yang diekspor menjadi janji kepada pemakai; ekspor secukupnya dan sembunyikan sisanya (`private`).
- **Memakai `any` agar galat tipe hilang.** Itu menyembunyikan masalah, bukan memperbaikinya.
- **Uji hanya kasus mulus.** Kasus kosong dan masukan aneh justru tempat cacat bersembunyi.
- **Pembagian tidak merata.** Satu orang mengerjakan semua; rencana menuliskan siapa mengerjakan apa dan ulasan dibagi silang.
- **Menyalin pustaka orang lain tanpa mengerti.** Bila mengambil kode (dari AI atau sumber lain), baca, uji, dan catat asalnya.

## Cek mandiri

- [ ] Saya dapat menulis rencana pustaka: pengguna, antarmuka, kasus uji, pembagian tugas.
- [ ] Saya dapat menulis kelas generik bertipe dan menjelaskan manfaatnya.
- [ ] Saya dapat menulis uji `bun test` termasuk kasus tepi.
- [ ] Saya menjalankan tipe, linter, dan uji sebelum menyerahkan.
- [ ] Saya meninjau pekerjaan teman dengan temuan, alasan, dan saran.

## Kunci dan petunjuk

**Ingat kembali.** 1: tiga titik menampilkan perubahan cabang sejak bercabang dan dipakai peninjau; dua titik membandingkan ujung kedua cabang dan memunculkan pekerjaan baru `main` sebagai terhapus. 2: banyak langkahnya mendekati `n × n / 2`; waktu naik sekitar empat kali saat `n` berlipat dua. 3: karena besar dan dapat dibangun ulang; temanmu menjalankan `bun install` setelah `git clone`.

**Rencana proyek.** Tabel di atas contoh jawaban; rencanamu boleh berbeda selama punya semua barisnya. Contoh rencana dijalankan penyusun: enam uji lulus pada percobaan pertama, `tsc` bersih, Biome tanpa temuan.

**Latihan bercampur.** 1: contoh `AntrianKepala` dijalankan penyusun:

```ts
class AntrianKepala<T> {
  private isi: T[] = [];
  private kepala = 0;

  masuk(nilai: T): void {
    this.isi.push(nilai);
  }

  keluar(): T | undefined {
    if (this.kosong()) return undefined;
    const nilai = this.isi[this.kepala];
    this.kepala++;
    return nilai;
  }

  kosong(): boolean {
    return this.kepala >= this.isi.length;
  }

  ukuran(): number {
    return this.isi.length - this.kepala;
  }
}

const a = new AntrianKepala<string>();
a.masuk("satu");
a.masuk("dua");
console.log(a.keluar(), a.ukuran(), a.keluar(), a.keluar(), a.kosong());
```

```text
satu 1 dua undefined true
```

Pada percobaan penyusun (100.000 `masuk` dan `keluar`, dua kali jalan) versi `shift` memakan 7,2 dan 8,8 ms, versi `kepala` 2,8 dan 3,7 ms: selisihnya ada tetapi kecil pada `n` ini. Imbalannya: isi yang sudah keluar tidak dibuang dari memori. Kesimpulan yang jujur menyebut `n`, jumlah jalan, dan batas itu; uji lama yang lulus menjaga perilaku saat implementasi diganti. 2: keluaran menunjukkan pemeriksaan sudah dijalankan dan lolos pada komputer penulis; ia tidak membuktikan logika benar untuk kasus yang tidak diuji, jadi peninjau tetap membaca kodenya.

**Ulang berjarak.** 1: `T` ditentukan pemakai sehingga pemeriksa tipe tetap bisa menolak jenis data yang salah; `any` mematikan pemeriksaan itu. 2: `index.ts` mengumpulkan dan mengekspor antarmuka publik dengan `export { ... }`, sehingga pemakai tidak perlu tahu susunan berkas di dalam. 3: pemeriksaan tipe (`bunx tsc --noEmit`), linter, dan uji (`bun test`).

## Langkah berikutnya

Modul berikut: `b-xi1-m14` (asesmen dan refleksi semester 1 kelas XI), yang menilai materi `b-xi1-m1` sampai `b-xi1-m13` tanpa AI. Bacaan lanjut: halaman Bun tentang `bun test` dan halaman TypeScript tentang modul dan generik.
