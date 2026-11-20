## Untuk siapa modul ini

Modul ini untuk murid kelas XI jalur B (Web dengan JavaScript, TypeScript, dan Bun), minggu `B-XI2-M5` silabus v1.4.1: sumber data terbuka dan legal. Prasyarat: modul `b-xi2-m4` (berkas dan data JSON) dan blok fondasi `FND-X1-M2` (perangkat lunak, berkas, dan lisensi); keduanya dapat dibaca ulang di `fondasi-software-dan-sistem-operasi`.

Modul ini karangan penyusun dan disetujui pemilik program pada 2026-11-20 (keputusan lewat dialog; catatan tinjauan menjadi tindak lanjut revisi). Butir `F-AD-a` dipetakan silabus sebagai dipenuhi jalur ini; pemenuhan butir mengikuti pemetaan silabus, bukan status modul.

Contoh dijalankan penyusun dengan Bun 1.4.4, TypeScript 7.0.2, dan Zod 4.6.7 per 2026-11, pada 2026-11-20. Isi halaman lisensi dibaca penyusun dari halaman resminya pada tanggal itu. Modul ini **bukan nasihat hukum** dan tidak membahas hukum hak cipta di Indonesia `[belum terverifikasi]`; ragu soal lisensi berarti bertanya kepada guru dan tidak memakai datanya. Pengunduhan butuh internet; di lab tanpa internet guru menyediakan salinan berkas yang sama. Tugas baca-dan-prediksi ditandai `AI: tanpa AI`; selain itu AI generatif boleh dipakai dengan etika dan dicatat, tanpa data pribadi, kata sandi, atau tugas bernilai pada permintaanmu.

## Ingat kembali

Jawab dari ingatan dulu, baru cek di bagian kunci. Soal 1 dari `b-xi2-m4`, soal 2 dari `b-xi2-m2`, soal 3 dari `b-xi1-m11`.

1. Mengapa isi berkas diperiksa dengan skema saat dimuat, padahal program kita sendiri yang menulisnya?
2. Mengapa `await req.json()` dibungkus `try/catch`?
3. Sebutkan dua ciri nama fungsi yang baik dan satu hal yang pantas ditulis di komentar.

## Tujuan

Setelah modul ini kamu dapat:

- menjelaskan bedanya data yang tersedia, data yang boleh dipakai, dan data yang layak dipercaya;
- membaca lisensi dari halaman resmi sumber dan mencatat apa yang boleh dan apa yang diwajibkan;
- mengunduh berkas CSV dengan `fetch`, membacanya, dan menangani nilai hilang (`NA`);
- menulis catatan sumber yang divalidasi dengan skema (keluaran minggu ini: catatan sumber).

## Prediksi dulu

Ini tugas baca-dan-prediksi, `AI: tanpa AI`. **Tebak dulu, tulis jawabanmu, baru jalankan.** Berkas `data/penguins.csv` punya 345 baris (satu baris judul) dan 8 kolom. Lima baris pertamanya:

```text
species,island,bill_length_mm,bill_depth_mm,flipper_length_mm,body_mass_g,sex,year
Adelie,Torgersen,39.1,18.7,181,3750,male,2007
Adelie,Torgersen,39.5,17.4,186,3800,female,2007
Adelie,Torgersen,40.3,18,195,3250,female,2007
Adelie,Torgersen,NA,NA,NA,NA,NA,2007
```

Program `baca.ts` membaca berkas itu:

```ts
const berkas = Bun.file("data/penguins.csv");
if (!(await berkas.exists())) throw new Error("jalankan unduh.ts dulu");

const [judul, ...isi] = (await berkas.text()).trim().split("\n");
const kolom = judul!.split(",");

// Berkas ini tidak memuat tanda kutip; untuk CSV yang memuatnya, split(",") tidak cukup.
const baris = isi.map((b) => b.split(","));
const salahLebar = baris.filter((b) => b.length !== kolom.length).length;
console.log("baris data:", baris.length, "| baris dengan jumlah kolom salah:", salahLebar);

// "NA" adalah penanda data hilang di berkas ini, bukan angka.
for (const [i, nama] of kolom.entries()) {
  const hilang = baris.filter((b) => b[i] === "NA").length;
  if (hilang > 0) console.log(`hilang di ${nama}: ${hilang}`);
}

const perSpesies = new Map<string, { n: number; total: number }>();
const iSpesies = kolom.indexOf("species");
const iMassa = kolom.indexOf("body_mass_g");
for (const b of baris) {
  const massa = Number(b[iMassa]);
  if (b[iMassa] === "NA" || Number.isNaN(massa)) continue;
  const spesies = b[iSpesies]!;
  const sekarang = perSpesies.get(spesies) ?? { n: 0, total: 0 };
  perSpesies.set(spesies, { n: sekarang.n + 1, total: sekarang.total + massa });
}
for (const [spesies, { n, total }] of perSpesies) {
  console.log(`${spesies}: ${n} ekor terukur, rata-rata massa ${(total / n).toFixed(1)} g`);
}
```

1. Berapa "baris data" yang dicetak baris pertama?
2. Apa yang terjadi pada rata-rata bila `if (b[iMassa] === "NA" ...) continue;` dihapus, dan mengapa?
3. Apa yang akan salah bila sebuah sel berisi koma di dalam tanda kutip, misalnya `"Bandung, Jawa Barat"`?

## Contoh terselesaikan

**Tiga pertanyaan tentang sumber.** Sebelum memakai data orang lain, jawab: (1) *Boleh dipakai?* Itu urusan lisensi, dibaca dari halaman resmi sumbernya. (2) *Layak dipercaya?* Siapa yang mengumpulkan, bagaimana, kapan, ada dokumentasi dan rujukan ilmiah atau tidak, dan bisa dicek silang. (3) *Aman?* Dataset berisi data pribadi orang tidak dipakai di kelas. Dataset contoh kita adalah ukuran penguin di Antartika (paket `palmerpenguins`), tidak memuat data orang. Pada halaman resminya (`https://allisonhorst.github.io/palmerpenguins/`, dibaca 2026-11-20) bagian *About the data* menyebut pengumpulnya, Dr. Kristen Gorman dan Palmer Station Antarctica LTER, bagian *License* menyatakan data tersedia dengan lisensi CC-0, dan bagian rujukan memuat artikel ilmiah asalnya serta cara mengutip. Halaman itu juga mengutip harapan agar pemakai mengikuti kebijakan akses data jaringan LTER; itu perlu dibaca guru, dan penyusun tidak menafsirkannya secara hukum.

Isi tiga keadaan lisensi, menurut halaman resmi masing-masing (dibaca penyusun 2026-11-20):

| Keadaan | Menurut halaman resmi | Yang kamu lakukan |
| --- | --- | --- |
| CC0 1.0 | boleh menyalin, mengubah, dan menyebarkan, juga untuk tujuan komersial, tanpa meminta izin (deed CC0) | tetap catat sumber agar bisa dicek |
| CC BY 4.0 | boleh berbagi dan mengadaptasi, juga komersial, dengan syarat memberi atribusi (kredit yang pantas, tautan lisensi, keterangan bila ada perubahan) | penuhi atribusi |
| Tanpa lisensi | karya pada dasarnya berada di bawah hak cipta eksklusif pembuatnya (halaman "No License" di choosealicense.com) | jangan pakai tanpa izin; cari data lain |

**Mengunduh dan membaca.** `unduh.ts` mengambil berkas lewat `fetch`, memeriksa `res.ok`, menyimpannya, dan menghitung sidik jari SHA-256, supaya perubahan isi di kemudian hari bisa terdeteksi (alamatnya menunjuk ke cabang `main` repositori sumber, yang bisa berubah). Pada percobaan penyusun:

```ts
const alamat = "https://raw.githubusercontent.com/allisonhorst/palmerpenguins/main/inst/extdata/penguins.csv";

const res = await fetch(alamat);
if (!res.ok) throw new Error(`unduhan gagal: HTTP ${res.status}`);

const isi = await res.text();
await Bun.write("data/penguins.csv", isi);

const baris = isi.trim().split("\n");
const sidikJari = new Bun.CryptoHasher("sha256").update(isi).digest("hex");
console.log("status:", res.status);
console.log("ukuran:", isi.length, "karakter,", baris.length, "baris (termasuk judul kolom)");
console.log("judul kolom:", baris[0]);
console.log("sha256:", sidikJari);
```

```text
status: 200
ukuran: 15241 karakter, 345 baris (termasuk judul kolom)
judul kolom: species,island,bill_length_mm,bill_depth_mm,flipper_length_mm,body_mass_g,sex,year
sha256: f204db2c753b0937caac3cb35258562c14f073e4bbc76be24b4c51ce22767a93
```

Keluaran `bun run baca.ts` pada berkas itu:

```text
baris data: 344 | baris dengan jumlah kolom salah: 0
hilang di bill_length_mm: 2
hilang di bill_depth_mm: 2
hilang di flipper_length_mm: 2
hilang di body_mass_g: 2
hilang di sex: 11
Adelie: 151 ekor terukur, rata-rata massa 3700.7 g
Gentoo: 123 ekor terukur, rata-rata massa 5076.0 g
Chinstrap: 68 ekor terukur, rata-rata massa 3733.1 g
```

`NA` bukan angka: `Number("NA")` adalah `NaN`, dan satu `NaN` merusak seluruh jumlah, sehingga baris `NA` dilewati dan jumlah yang terukur dicatat. Berkas ini aman dipotong dengan `split(",")` karena tidak ada sel berkutip (diperiksa dengan menghitung jumlah kolom tiap baris). Untuk CSV yang sel-selnya bisa berisi koma, pakai pengurai CSV yang menangani kutip.

**Catatan sumber** menyimpan semua jawaban di atas dan menolak catatan yang kurang. Skema Zod dari `b-xi2-m3` dipakai ulang; `z.literal(false)` membuat dataset berisi data pribadi tidak lolos:

```ts
import { z } from "zod";

const CatatanSumber = z.object({
  nama: z.string().min(1),
  halamanResmi: z.url(),
  berkas: z.url(),
  lisensi: z.string().min(1, "lisensi wajib dicatat; kosong berarti belum boleh dipakai"),
  buktiLisensi: z.string().min(1),
  tanggalAkses: z.iso.date(),
  sha256: z.string().length(64),
  pemilik: z.string().min(1),
  mengandungDataPribadi: z.literal(false, { error: "dataset berisi data pribadi tidak dipakai di kelas" }),
  penilaianKeterpercayaan: z.string().min(1),
});

const catatan = {
  nama: "Palmer Archipelago (Antarctica) penguin data (paket palmerpenguins)",
  halamanResmi: "https://allisonhorst.github.io/palmerpenguins/",
  berkas: "https://raw.githubusercontent.com/allisonhorst/palmerpenguins/main/inst/extdata/penguins.csv",
  lisensi: "CC0 1.0",
  buktiLisensi: "Bagian 'License' pada halaman resmi paket: data tersedia dengan lisensi CC0",
  tanggalAkses: "2026-11-20",
  sha256: "f204db2c753b0937caac3cb35258562c14f073e4bbc76be24b4c51ce22767a93",
  pemilik: "dikumpulkan dan disediakan oleh Dr. Kristen Gorman dan Palmer Station Antarctica LTER (menurut halaman resmi)",
  mengandungDataPribadi: false,
  penilaianKeterpercayaan:
    "pengumpul dan lembaganya disebut; ada rujukan artikel ilmiah dan kutipan; ada nilai NA yang harus ditangani",
};

const hasil = CatatanSumber.safeParse(catatan);
console.log("catatan lengkap?", hasil.success);
if (hasil.success) await Bun.write("data/catatan-sumber.json", JSON.stringify(hasil.data, null, 2) + "\n");

const kurang = CatatanSumber.safeParse({ ...catatan, lisensi: "" });
console.log("tanpa lisensi lengkap?", kurang.success);
if (!kurang.success) console.log(kurang.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`));
```

```text
catatan lengkap? true
tanpa lisensi lengkap? false
[ "lisensi: lisensi wajib dicatat; kosong berarti belum boleh dipakai" ]
```

## Contoh setengah jadi

Lengkapi pemeriksaan bahwa sebuah catatan sumber memuat lisensi dan tanggal akses berbentuk `AAAA-BB-HH`.

```ts setengah-jadi
const Catatan = z.object({
  lisensi: z.string().____(1),
  tanggalAkses: z.iso.____(),
  mengandungDataPribadi: z.literal(____),
});
```

## Soal Parsons

Susun baris berikut (sudah diacak) menjadi pengunduhan yang berhenti dengan pesan jelas bila gagal. `AI: tanpa AI`.

```text
(a) const res = await fetch(alamat);
(b) await Bun.write("data/berkas.csv", await res.text());
(c) if (!res.ok) throw new Error(`unduhan gagal: HTTP ${res.status}`);
(d) console.log("tersimpan");
```

## Latihan

1. `AI: boleh` **Pilih sumber lain bersama guru.** Cari satu dataset terbuka lain (mis. dari portal data pemerintah atau lembaga riset). Buka halaman resminya, kutip kalimat lisensinya, dan isi catatan sumber. Bila lisensinya tidak ditemukan atau tidak jelas, jangan pakai dan catat alasannya.
2. `AI: tanpa AI` **Boleh atau tidak?** Untuk tiga keadaan pada tabel di atas, tentukan apa yang boleh kamu lakukan dan apa yang wajib kamu lakukan, tanpa melihat tabel.
3. `AI: boleh` **Panjang paruh per pulau.** Hitung rata-rata `bill_length_mm` per `island` dari `penguins.csv`, lewati `NA`, dan cetak jumlah pengukuran tiap pulau.
4. `AI: tanpa AI` **Koma dalam kutip.** Perkirakan hasil `'1,"Bandung, Jawa Barat",3'.split(",")` dan banyak elemennya, lalu jalankan.
5. *Opsional:* **catatan pemakaian AI.** Tanya asisten AI apakah suatu dataset boleh dipakai bebas, lalu cek jawabannya ke halaman resmi sumbernya: asisten bisa keliru atau mengarang lisensi. Catat alatnya, tujuanmu, garis besar perintahmu, bagian yang kamu pakai, dan cara memeriksanya. Jangan menaruh data pribadi atau tugas bernilai pada perintah.

## Latihan bercampur

1. `AI: boleh` (dari `b-xi2-m3`) Tulis skema Zod untuk satu baris penguin (`species` teks, `body_mass_g` bilangan atau `NA`) dan hitung berapa baris yang lolos.
2. `AI: boleh` (dari `b-xi2-m4`) Simpan rata-rata massa per spesies ke `data/rekap-penguin.json` dengan `simpan` dari modul sebelumnya dan muat kembali dengan skema.

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `b-xi2-m6` (pertanyaan 1), sekitar tiga minggu lagi di `b-xi2-m8` (pertanyaan 2), dan sekitar delapan minggu lagi di `b-xi2-m13` (pertanyaan 3). Jawab sekarang lalu simpan.

1. Apa tiga pertanyaan yang dijawab sebelum memakai data orang lain, dan mengapa data tanpa lisensi belum boleh dipakai?
2. Apa arti `NA` pada berkas CSV tadi, dan apa yang terjadi bila ia diubah dengan `Number()` lalu dijumlahkan?
3. Mengapa berkas unduhan dicatat sidik jari SHA-256-nya?

## Kesalahan umum

- **"Ada di internet berarti boleh dipakai."** Tanpa lisensi, karya berada di bawah hak cipta pembuatnya (halaman "No License" di choosealicense.com).
- **Menyamakan CC0 dengan CC BY.** CC BY mewajibkan atribusi (kredit, tautan lisensi, keterangan perubahan).
- **Percaya karena berkasnya ada di GitHub.** Tempat penyimpanan tidak menjamin mutu; cek siapa pengumpul, metode, dan rujukannya.
- **`Number("NA")`.** Hasilnya `NaN` dan merusak semua jumlah yang melibatkannya.
- **Memotong CSV dengan `split(",")` tanpa memeriksa kutip.** Sel berkutip yang berisi koma terbelah menjadi dua kolom.
- **Tidak mencatat tanggal dan sidik jari.** Berkas di cabang `main` bisa berubah, dan hasil hitunganmu tidak bisa dicocokkan lagi.
- **Memakai dataset berisi data orang.** Di kelas ini tidak dipakai, sekalipun lisensinya terbuka.

## Cek mandiri

- [ ] Saya dapat membedakan "tersedia", "boleh dipakai", dan "layak dipercaya".
- [ ] Saya membaca lisensi dari halaman resmi dan mencatat syaratnya.
- [ ] Saya dapat mengunduh dan membaca CSV serta menangani `NA`.
- [ ] Saya mencatat sumber, tanggal akses, dan sidik jari berkas.
- [ ] Saya tidak memakai dataset berisi data pribadi orang.

## Kunci dan petunjuk

**Ingat kembali.** 1: berkas bisa rusak, terpotong, atau diubah tangan, dan bisa berasal dari versi program lain; skema menolak bentuk yang salah sebelum masuk ke program. 2: karena `req.json()` melempar galat bila badan bukan JSON; tanpa `try/catch` balasannya 500 (kesalahan server) padahal kesalahan klien. 3: nama yang menjelaskan isi dan fungsi yang mengerjakan satu hal; komentar menjelaskan alasan, bukan mengulang kode.

**Prediksi dulu.** 1: 344 (345 baris dikurangi baris judul); baris rusak 0. 2: rata-rata menjadi `NaN` untuk spesies yang punya baris `NA` (Adelie dan Gentoo), karena `Number("NA")` adalah `NaN` dan jumlah dengan `NaN` tetap `NaN`. 3: `split(",")` memecah sel itu menjadi dua kolom sehingga jumlah kolom baris itu lebih banyak dan kolom setelahnya bergeser.

**Contoh setengah jadi.** Isi berurutan: `min`, `date`, `false`.

**Soal Parsons.** Urutan benar: a, c, b, d. Ambil dulu (a), berhenti bila tidak berhasil (c), simpan isinya (b), baru beri tahu (d); menyimpan sebelum memeriksa menulis halaman galat sebagai data.

**Latihan.** 1: rubrik: ada URL halaman resmi, kutipan kalimat lisensi, tanggal akses, siapa pengumpul, dan alasan bila ditolak; tanpa lisensi yang jelas: tidak dipakai. 2: CC0: boleh menyalin, mengubah, menyebarkan (termasuk komersial) tanpa izin, tidak ada syarat atribusi pada deed, tetap catat sumber; CC BY 4.0: boleh sama, tetapi wajib memberi kredit yang pantas, menautkan lisensi, dan menyebut perubahan; tanpa lisensi: tidak boleh menyalin, menyebarkan, atau mengubah tanpa izin pembuatnya. 3: contoh yang dijalankan penyusun:

```ts
const berkas = Bun.file("data/penguins.csv");
if (!(await berkas.exists())) throw new Error("jalankan unduh.ts dulu");

const [judul, ...isi] = (await berkas.text()).trim().split("\n");
const kolom = judul!.split(",");
const iPulau = kolom.indexOf("island");
const iParuh = kolom.indexOf("bill_length_mm");

const perPulau = new Map<string, number[]>();
for (const b of isi) {
  const sel = b.split(",");
  if (sel[iParuh] === "NA") continue;
  const daftar = perPulau.get(sel[iPulau]!) ?? [];
  daftar.push(Number(sel[iParuh]));
  perPulau.set(sel[iPulau]!, daftar);
}
for (const [pulau, nilai] of [...perPulau].sort()) {
  const rata = nilai.reduce((a, b) => a + b, 0) / nilai.length;
  console.log(`${pulau}: ${nilai.length} pengukuran, rata-rata panjang paruh ${rata.toFixed(1)} mm`);
}
```

```text
Biscoe: 167 pengukuran, rata-rata panjang paruh 45.3 mm
Dream: 124 pengukuran, rata-rata panjang paruh 44.2 mm
Torgersen: 51 pengukuran, rata-rata panjang paruh 39.0 mm
```

4: perkiraan: empat elemen (`"1"`, `"\"Bandung"`, `" Jawa Barat\""`, `"3"`) padahal barisnya tiga kolom. Penyusun menjalankannya:

```ts
const baris = '1,"Bandung, Jawa Barat",3';
console.log(baris.split(","));
console.log(baris.split(",").length);
```

```text
[ "1", "\"Bandung", " Jawa Barat\"", "3" ]
4
```

**Latihan bercampur.** 1: contoh: `z.object({ species: z.string(), body_mass_g: z.union([z.coerce.number(), z.literal("NA")]) })`; hati-hati, `z.coerce.number()` mengubah teks apa pun menjadi angka (atau `NaN`, yang ditolak); hitungan lolos dibandingkan dengan 344 untuk memastikan tidak ada baris yang diam-diam hilang. 2: panggil `simpan(...)` lalu `muat(...)` seperti di `b-xi2-m4`; sesuaikan skema Zod untuk bentuk rekap (spesies dan rata-rata).

**Ulang berjarak.** 1: boleh dipakai (lisensi dari halaman resmi), layak dipercaya (pengumpul, metode, rujukan), dan aman (tidak memuat data pribadi); tanpa lisensi karya berada di bawah hak cipta eksklusif pembuatnya, jadi belum boleh disalin atau dipakai tanpa izin. 2: `NA` adalah penanda data hilang; `Number("NA")` adalah `NaN` dan jumlah yang melibatkannya menjadi `NaN`. 3: untuk mendeteksi perubahan isi berkas (alamatnya menunjuk ke cabang yang bisa berubah) dan mencocokkan hitungan dengan berkas yang sama.

## Langkah berikutnya

Modul berikut: `b-xi2-m6` (pengolahan data bervolume lebih besar), yang membaca berkas besar sedikit demi sedikit. Modul terkait: `pendamping-riset-dan-verifikasi-konten` dan `pendamping-periksa-fakta-dan-baca-lateral` untuk menilai sumber. Bacaan lanjut: halaman lisensi Creative Commons (CC0 dan CC BY 4.0) dan halaman "No License" di choosealicense.com.
