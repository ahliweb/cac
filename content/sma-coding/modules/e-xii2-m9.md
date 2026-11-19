## Untuk siapa modul ini

Modul ini untuk murid kelas XII jalur E (komputasi kuantum), minggu `E-XII2-M9` silabus v1.4: proyek akhir, pengujian dan dokumentasi, dengan keluaran dokumentasi dan latihan tinjau sejawat. Prasyarat: modul `e-xii2-m8`. Di luar indeks, pemeriksa kecil di bawah memakai TypeScript dengan Bun (setara `B-X1-M9..M12`); dokumentasinya sendiri tidak memerlukan pemrograman. Alat: kertas, penyunting teks, dan Bun bila ingin menjalankan pemeriksa (tanpa akun). Kerja minggu ini satu sprint.

Modul ini berstatus DRAF: karangan penyusun, belum ditinjau pemilik. Jalur E adalah pengayaan di luar rumusan CP; minggu ini tanpa irisan pengayaan, jadi modul ini tidak dihitung memenuhi butir CP mana pun.

Aturan AI jalur ini: AI generatif boleh dipakai dengan etika dan dicatat, tanpa data pribadi, kata sandi, atau tugas bernilai pada permintaanmu, dan tanpa akun wajib. Saran: tulis dokumentasimu sendiri dulu; bila meminta AI merapikan bahasa, jangan menempelkan data pribadi, token, atau isi log akun. Catat pemakaian AI di log proyek.

Catatan untuk guru: program contoh dijalankan penyusun dengan `bun`; ia hanya memeriksa judul bagian dan pola teks, bukan mutu isi, sehingga nama murid pun lolos darinya. Keterangan wajib di samping histogram (sumber, shot, model derau, benih, tanggal) mengikuti `e-xii2-m1`; dasar selang untuk proporsi (metode Wilson) dibaca dari e-Handbook NIST/SEMATECH, per tanggal akses 2026-11-19.

## Ingat kembali

Jawab dari ingatan, baru cek di bagian kunci.

1. Mengapa selisih di bawah toleransi pada satu kasus tidak membuktikan simulator benar untuk semua kasus? (dari `e-xii2-m8`)
2. Apa yang harus tertulis di samping sebuah histogram agar pembaca dapat menilainya? (dari `e-xii2-m1`)
3. Apa yang tidak boleh masuk ke dokumentasi atau portofolio? (dari `e-xii2-m6`)

## Tujuan

Setelah modul ini kamu dapat:

- menulis dokumentasi proyek dengan lima bagian tetap: pertanyaan, cara menjalankan, hasil, batas klaim, privasi dan AI;
- menuliskan keterangan wajib di samping setiap histogram atau angka hasil;
- memeriksa dokumentasi dengan pemeriksa otomatis sederhana dan menyebut apa yang tidak dapat ia periksa;
- memberi dan menerima tinjauan sejawat yang berisi.

Keluaran yang diminta silabus: dokumentasi.

## Rencana sprint

**Tujuan sprint satu kalimat:** "orang yang belum pernah melihat proyekku dapat menjalankannya dan menilai hasilnya tanpa bertanya". Urutan: (1) tulis lima bagian dokumentasi; (2) tambahkan keterangan wajib di tiap histogram: sumber (simulator buatan sendiri, arsip, atau demonstrasi guru), jumlah shot, model derau, benih acak, tanggal, dan simpangan wajar atau selang; (3) jalankan pemeriksa; (4) minta temanmu menjalankan proyekmu hanya dari "Cara menjalankan"; (5) perbaiki apa yang membuatnya bertanya.

**Batas klaim** adalah bagian yang paling sering hilang: tulis bahwa hasilmu simulasi (bukan perangkat nyata), apa yang diuji dan tidak, dan bahwa tabel uji lulus hanya untuk kasus yang diuji. Jangan menulis "lebih cepat dari komputer biasa" untuk simulasi yang berjalan di komputer biasa.

Pemeriksa di bawah (TypeScript, `bun m9.ts`) mencari judul bagian yang wajib dan tiga pola yang patut ditinjau: surel selain `.example`, nomor telepon, dan untaian panjang yang mirip token. Dua dokumen contoh (fiktif) ada di dalam programnya.

```ts
// Pemeriksa dokumentasi proyek: bagian wajib dan pola data pribadi. Jalankan: bun m9.ts
const WAJIB = ["Pertanyaan", "Cara menjalankan", "Hasil", "Batas klaim", "Privasi dan AI"];

// Pola yang ditandai untuk ditinjau manusia (bukan jaminan bebas data pribadi).
const POLA: [string, RegExp][] = [
  ["email bukan .example", /[\w.+-]+@(?![\w.-]*\.example\b)[\w-]+\.[\w.-]+/],
  ["nomor telepon", /\b(?:\+62|0)8\d{8,11}\b/],
  ["token panjang", /\b[A-Za-z0-9_-]{32,}\b/],
];

function periksa(nama: string, teks: string): number {
  const judul = teks
    .split("\n")
    .filter((b) => b.startsWith("## "))
    .map((b) => b.slice(3).trim());
  const temuan: string[] = [];
  for (const w of WAJIB) if (!judul.includes(w)) temuan.push(`bagian "${w}" tidak ada`);
  for (const [label, re] of POLA) if (re.test(teks)) temuan.push(`pola ${label} ditemukan`);
  console.log(`${nama}: ${temuan.length === 0 ? "lolos" : "perlu perbaikan"}`);
  for (const t of temuan) console.log(`  - ${t}`);
  return temuan.length;
}

const lengkap = `## Pertanyaan
Berapa peluang item bertanda pada Grover N = 8?
## Cara menjalankan
g++ -std=c++17 simulasi.cpp -o simulasi && ./simulasi
## Hasil
Histogram 1000 shot, benih 7, simulator ideal, tabel uji lulus.
## Batas klaim
Ini simulasi vektor keadaan; bukan perangkat nyata dan bukan klaim keunggulan.
## Privasi dan AI
Tanpa data pribadi. Log AI di log.txt. Kontak contoh: tim@contoh.example
`;

const kurang = `## Pertanyaan
Berapa peluang item bertanda?
## Hasil
Hampir selalu benar.
## Batas klaim
Cepat.
Hubungi saya: rani@contoh.invalid, 0800000000000
kunci: abcdefghijklmnopqrstuvwxyz0123456789
`;

const a = periksa("dokumen A", lengkap);
const b = periksa("dokumen B", kurang);
console.log(a === 0 && b > 0 ? "pemeriksa bekerja" : "pemeriksa bermasalah");
```

Keluaran asli (dijalankan penyusun dengan `bun m9.ts`):

```text
dokumen A: lolos
dokumen B: perlu perbaikan
  - bagian "Cara menjalankan" tidak ada
  - bagian "Privasi dan AI" tidak ada
  - pola email bukan .example ditemukan
  - pola nomor telepon ditemukan
  - pola token panjang ditemukan
pemeriksa bekerja
```

Bacaan hasilnya. Dokumen A lolos; dokumen B kehilangan dua bagian dan memuat tiga pola. Pemeriksa tidak menangkap nama murid, sekolah, atau wajah pada gambar, dan pola surel hanya menangkap bentuk umum. Lolos dari pemeriksa bukan berarti bebas data pribadi: manusia tetap membaca dokumen sebelum diarsipkan (`e-xii2-m12`).

**Log sprint** (satu sampai tiga kalimat per hari kerja): bagian dokumentasi yang selesai, pertanyaan yang diajukan temanmu saat mencoba "Cara menjalankan", dan catatan pemakaian AI.

## Daftar periksa

- [ ] Tujuan sprint satu kalimat tertulis di log.
- [ ] Dokumentasi memuat lima bagian: Pertanyaan, Cara menjalankan, Hasil, Batas klaim, Privasi dan AI.
- [ ] Tiap histogram atau angka hasil punya keterangan: sumber, shot, model derau, benih, tanggal, simpangan atau selang.
- [ ] Batas klaim menyebut simulasi dan apa yang tidak diuji.
- [ ] Pemeriksa dijalankan dan temuannya diperbaiki atau dijelaskan.
- [ ] Satu teman berhasil menjalankan proyekmu hanya dari "Cara menjalankan".
- [ ] Tidak ada data pribadi, nama murid, token, atau kunci di dokumentasi dan log.
- [ ] Log pemakaian AI terisi.

## Umpan balik sejawat

Tukar dokumentasi dengan satu teman, lalu coba jalankan proyeknya hanya dari tulisannya. Beri tiga hal, tertulis: **satu yang sudah baik**, **satu yang perlu diperbaiki**, dan **satu langkah berikutnya**. Periksa dua hal: apakah kamu bisa menjalankannya tanpa bertanya, dan apakah batas klaimnya jujur. Nilai dokumennya, bukan orangnya. Penerima membalas dengan satu perubahan yang akan dibuat.

## Latihan bercampur

1. Sebuah histogram 1000 shot dari simulator ideal ditulis tanpa keterangan apa pun. Sebutkan lima keterangan yang harus ditambahkan. (`e-xii2-m1`)
2. Tulis dua kalimat batas klaim untuk proyek Grover pada `N = 8` yang hanya simulasi. (`e-xii2-m8`)

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `e-xii2-m10` (satu minggu lagi), `e-xii2-m12` (sekitar tiga minggu lagi), dan `e-xii2-m14` (lima minggu lagi). Jawab sekarang lalu simpan.

1. Sebutkan lima bagian dokumentasi proyek yang kamu tulis.
2. Mengapa lolos dari pemeriksa pola belum berarti dokumentasi bebas data pribadi?
3. Mengapa batas klaim harus tertulis pada proyek yang hanya simulasi?

## Kesalahan umum

- **"Dokumentasi ditulis setelah semuanya selesai."** Menulis sambil jalan menangkap langkah yang terlupa, dan log sprint membantu.
- **"Histogram cukup berupa gambar."** Tanpa sumber, shot, model derau, benih, dan tanggal, pembaca tidak dapat menilainya.
- **"Cara menjalankan jelas bagiku, jadi jelas bagi semua."** Hanya orang baru yang bisa menguji itu.
- **"Pemeriksa otomatis menjamin privasi."** Ia hanya mencari pola; nama dan wajah lolos.
- **"Batas klaim melemahkan proyek."** Ia justru membuat hasilmu dapat dipercaya.

## Cek mandiri

- [ ] Saya dapat menyebut lima bagian dokumentasi proyek.
- [ ] Saya dapat menyebut keterangan wajib di samping histogram.
- [ ] Saya dapat menjelaskan apa yang tidak dapat diperiksa oleh pemeriksa otomatis.
- [ ] Saya dapat menulis batas klaim yang jujur.
- [ ] Saya mencatat log sprint dan pemakaian AI.

## Kunci dan petunjuk

**Ingat kembali.** 1: uji hanya memeriksa kasus yang diuji; bagian atau ukuran lain bisa salah, dan jawaban tangan pun bisa keliru. 2: sumber (simulator, arsip, atau demonstrasi), jumlah shot, model derau, benih atau tanggal, dan simpangan wajar atau selang. 3: nama murid atau guru, nama sekolah, kontak, token atau kunci, tangkapan layar yang memuat akun, dan data pekerjaan cloud yang bukan agregat.

**Rencana sprint.** Contoh keluaran ada pada blok di atas; dokumen A memuat kelima bagian, dokumen B tidak.

**Daftar periksa.** Tidak ada jawaban tunggal; pemeriksa memastikan tiap butir bisa dicek orang lain.

**Umpan balik sejawat.** Penilaian berupa tiga kalimat tertulis; tidak ada nilai angka.

**Latihan bercampur.** 1: sumber, jumlah shot, model derau, benih acak, tanggal (dan simpangan wajar atau selang sebagai keterangan keenam bila memungkinkan). 2: contoh: "Hasil ini berasal dari simulator vektor keadaan buatan sendiri, bukan perangkat kuantum nyata. Tabel uji lulus untuk empat kasus `t = 0` sampai `3` pada `N = 8`, tidak untuk `N` lain, dan tidak menyatakan keunggulan kecepatan."

**Ulang berjarak.** 1: Pertanyaan, Cara menjalankan, Hasil, Batas klaim, Privasi dan AI. 2: pemeriksa hanya mencari pola teks; nama, sekolah, dan wajah tidak berpola, sehingga manusia harus membaca. 3: tanpa batas klaim pembaca mengira hasil simulasi sama dengan hasil perangkat atau keunggulan kuantum.

## Langkah berikutnya

Modul berikut: `e-xii2-m10` (proyek akhir: pengujian lanjutan). Bacaan pendamping: `e-xii2-m1` dan `e-xii2-m6`.
