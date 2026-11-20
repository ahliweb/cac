## Untuk siapa modul ini

Modul ini untuk murid kelas XII jalur E (komputasi kuantum), minggu `E-XII2-M12` silabus v1.4: proyek akhir, portofolio, yaitu mengarsipkan tanpa data pribadi, dengan keluaran portofolio. Prasyarat: modul `e-xii2-m11`. Di luar indeks, pemeriksa kecil di bawah memakai TypeScript dengan Bun (setara `B-X1-M9..M12`); menyusun portofolionya sendiri tidak memerlukan pemrograman. Alat: penyunting teks, folder kerja, dan Bun bila ingin menjalankan pemeriksa (tanpa akun). Kerja minggu ini satu sprint.

Modul ini karangan penyusun dan disetujui pemilik program pada 2026-11-20 (keputusan lewat dialog; catatan tinjauan menjadi tindak lanjut revisi). Jalur E adalah pengayaan di luar rumusan CP; minggu ini tanpa irisan pengayaan, jadi modul ini tidak dihitung memenuhi butir CP mana pun.

Aturan AI jalur ini: AI generatif boleh dipakai dengan etika dan dicatat, tanpa data pribadi, kata sandi, atau tugas bernilai pada permintaanmu, dan tanpa akun wajib. Saran: jangan menempelkan isi berkas portofolio yang belum dibersihkan ke alat AI. Catat pemakaian AI di log proyek.

Catatan untuk guru: aturan penyimpanan (di mana arsip disimpan, berapa lama, siapa yang boleh melihat) mengikuti kebijakan sekolah `[belum terverifikasi]`; modul ini tidak menetapkannya. Program contoh dijalankan penyusun dengan `bun`, berkasnya disimulasikan dalam memori, dan ia mencari pola, bukan nama. Rujukan NIST pada `Ingat kembali` nomor 1 dibaca dari halaman FAQ NIST tentang kriptografi pasca-kuantum, per tanggal akses 2026-11-19.

## Ingat kembali

Jawab dari ingatan, baru cek di bagian kunci.

1. Apa beda dampak komputer kuantum pada kunci publik (Shor) dan kunci simetris (Grover) menurut sumbermu? (dari `e-xii2-m4`)
2. Mengapa lolos dari pemeriksa pola belum berarti dokumentasi bebas data pribadi? (dari `e-xii2-m9`)
3. Apa yang boleh dan tidak boleh ditampilkan pada slide demo? (dari `e-xii2-m11`)

## Tujuan

Setelah modul ini kamu dapat:

- menyusun portofolio proyek dengan berkas wajib dan struktur folder yang jelas;
- membedakan yang boleh diarsipkan dari yang tidak (data pribadi, token, tangkapan layar akun, nama pekerjaan cloud asli);
- memeriksa portofolio dengan pemeriksa sederhana lalu menambah pembacaan manusia;
- menyatakan batas klaim dan status proyek dengan jujur.

Keluaran yang diminta silabus: portofolio.

## Rencana sprint

**Tujuan sprint satu kalimat:** "portofolio yang dapat dibuka orang lain tanpa penjelasanku dan tanpa data pribadi apa pun". Isi minimal: `README.md` (lima bagian dari `e-xii2-m9`), `log-sprint.md`, `log-ai.md`, folder `uji/` berisi `hasil-uji.txt`, folder `kode/`, dan bila ada, slide atau ringkasan presentasi. Refleksi pribadimu tidak masuk portofolio kecuali kamu sendiri memilih.

**Yang tidak diarsipkan:** nama murid atau guru pada berkas bersama, nama sekolah, kontak, token atau kunci, berkas `.env`, tangkapan layar yang memuat akun, dan nama atau nomor pekerjaan cloud asli (pakai label seperti `kelas-demo-01`). Bila rahasia pernah masuk ke riwayat versi (mis. git), menghapus berkasnya belum menghapus riwayatnya; ganti rahasianya dan minta guru memandu pembersihan.

**Langkahnya.** (1) Salin hanya yang akan diarsipkan ke folder baru. (2) Tulis README dan manifes berkas. (3) Jalankan pemeriksa. (4) Baca semua berkas dengan mata, termasuk gambar dan nama berkas. (5) Minta satu teman membuka folder dan menyebut apa yang tidak ia pahami.

Pemeriksa di bawah (`bun m12.ts`) memeriksa berkas wajib, berkas terlarang menurut nama, dan empat pola teks. Dua portofolio contoh (fiktif) ada di dalam programnya.

```ts
// Pemeriksa portofolio: berkas wajib, berkas terlarang, dan pola data pribadi.
// Berkas disimulasikan dalam peta nama -> isi agar contoh tidak menyentuh disk. Jalankan: bun m12.ts
const WAJIB = ["README.md", "log-sprint.md", "log-ai.md", "uji/hasil-uji.txt"];
const TERLARANG = [/\.env$/, /\.pem$/, /\.key$/, /tangkapan-layar/, /\.(png|jpg|jpeg)$/];
const POLA: [string, RegExp][] = [
  ["email bukan .example", /[\w.+-]+@(?![\w.-]*\.example\b)[\w-]+\.[\w.-]+/],
  ["nomor telepon", /\b(?:\+62|0)8\d{8,11}\b/],
  ["token panjang", /\b[A-Za-z0-9_-]{32,}\b/],
  ["nama pekerjaan cloud asli", /\bjob[-_][a-z0-9]{8,}\b/i],
];

function periksa(nama: string, berkas: Record<string, string>): number {
  const temuan: string[] = [];
  for (const w of WAJIB) if (!(w in berkas)) temuan.push(`berkas wajib tidak ada: ${w}`);
  for (const [path, isi] of Object.entries(berkas)) {
    if (TERLARANG.some((re) => re.test(path))) temuan.push(`berkas terlarang: ${path}`);
    for (const [label, re] of POLA) if (re.test(isi)) temuan.push(`${path}: pola ${label}`);
  }
  console.log(`${nama}: ${temuan.length === 0 ? "siap diarsipkan" : `${temuan.length} temuan`}`);
  for (const t of temuan) console.log(`  - ${t}`);
  return temuan.length;
}

const bersih = {
  "README.md": "## Pertanyaan\nGrover N = 8.\nKontak kelas: kelas@contoh.example",
  "log-sprint.md": "M7: inti jalan. M8: tabel uji lulus.",
  "log-ai.md": "Alat: asisten umum. Tujuan: ide uji. Dipakai: ya, setelah dibaca dan diuji.",
  "uji/hasil-uji.txt": "semua uji lulus",
  "kode/simulasi.cpp": "// simulator buatan sendiri",
};

const kotor = {
  "README.md": "Dibuat oleh Rani Contoh, hubungi 0800000000000",
  "log-sprint.md": "label pekerjaan: job-abcdefgh12345",
  "uji/hasil-uji.txt": "semua uji lulus",
  "tangkapan-layar-akun.png": "(biner)",
  ".env": "TOKEN=abcdefghijklmnopqrstuvwxyz0123456789",
};

const a = periksa("portofolio A", bersih);
const b = periksa("portofolio B", kotor);
console.log(a === 0 && b > 0 ? "pemeriksa bekerja" : "pemeriksa bermasalah");
console.log("catatan: nama murid di README B tidak terdeteksi pola; tinjau dengan mata");
```

Keluaran asli (dijalankan penyusun dengan `bun m12.ts`):

```text
portofolio A: siap diarsipkan
portofolio B: 6 temuan
  - berkas wajib tidak ada: log-ai.md
  - README.md: pola nomor telepon
  - log-sprint.md: pola nama pekerjaan cloud asli
  - berkas terlarang: tangkapan-layar-akun.png
  - berkas terlarang: .env
  - .env: pola token panjang
pemeriksa bekerja
catatan: nama murid di README B tidak terdeteksi pola; tinjau dengan mata
```

Bacaan hasilnya. Portofolio A siap; B punya enam temuan. Perhatikan catatan terakhir: nama murid pada README B tidak terdeteksi, karena nama tidak berpola. Pemeriksa hanya menyaring yang berbentuk teratur; keputusan akhir ada pada pembacaan manusia, dan pada bentuk yang tidak dibaca program (gambar, biner) harus dilihat sendiri.

**Log sprint** (satu sampai tiga kalimat per hari kerja): berkas yang dibersihkan, temuan pemeriksa dan tindak lanjutnya, dan catatan pemakaian AI.

## Daftar periksa

- [ ] Tujuan sprint satu kalimat tertulis di log.
- [ ] Berkas wajib ada: `README.md`, `log-sprint.md`, `log-ai.md`, `uji/hasil-uji.txt`, `kode/`.
- [ ] Hanya berkas yang memang akan diarsipkan yang disalin ke folder portofolio.
- [ ] Tidak ada `.env`, token, kunci, tangkapan layar akun, atau nama pekerjaan cloud asli.
- [ ] Pemeriksa dijalankan dan semua temuan diperbaiki atau dijelaskan.
- [ ] Semua berkas, gambar, dan nama berkas dibaca dengan mata.
- [ ] Batas klaim dan status proyek (selesai, sebagian, atau gagal) tertulis jujur.
- [ ] Satu teman membuka portofolio dan menyebut bagian yang tidak jelas.
- [ ] Log pemakaian AI terisi.

## Umpan balik sejawat

Tukar folder portofolio dengan satu teman. Beri tiga hal, tertulis: **satu yang sudah baik**, **satu yang perlu diperbaiki**, dan **satu langkah berikutnya**. Periksa dua hal: apakah ada data pribadi yang lolos dari pemeriksa, dan apakah portofolio dapat dipahami tanpa bertanya. Sampaikan temuan data pribadi hanya kepada pemiliknya, bukan ke kelas. Penerima membalas dengan satu perubahan yang akan dibuat.

## Latihan bercampur

1. Sebuah proyek ditutup dengan hasil negatif (tabel uji gagal pada `t = 3`). Haruskah masuk portofolio, dan apa yang ditulis di batas klaim? (`e-xii2-m8`)
2. Sebuah histogram di slide tanpa tanggal dan model derau. Apa yang ditambahkan sebelum diarsipkan? (`e-xii2-m9`)

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `e-xii2-m13` (satu minggu lagi). Jawab sekarang lalu simpan.

1. Berkas apa saja yang wajib ada di portofolio, dan jenis berkas apa yang tidak boleh?
2. Mengapa nama pekerjaan cloud asli dan tangkapan layar akun tidak boleh diarsipkan?

## Kesalahan umum

- **"Pemeriksa bersih berarti portofolio aman."** Nama, wajah pada gambar, dan konteks tidak berpola.
- **"Menghapus berkas rahasia sudah cukup."** Riwayat versi masih menyimpannya; ganti rahasianya.
- **"Hasil yang gagal tidak layak diarsipkan."** Hasil negatif yang jujur, lengkap dengan batas klaim, lebih berguna daripada yang dibersihkan.
- **"Portofolio berarti semua berkas kerja."** Arsipkan yang perlu dipahami orang lain; log kerja mentah dan refleksi pribadi tidak harus ikut.
- **"Label cloud asli boleh karena hanya angka."** Ia dapat mengaitkan pekerjaan dengan akun lembaga; pakai label sintetis.

## Cek mandiri

- [ ] Saya dapat menyebut berkas wajib portofolio.
- [ ] Saya dapat menyebut apa yang tidak boleh diarsipkan.
- [ ] Saya dapat menjelaskan apa yang tidak dapat diperiksa program.
- [ ] Saya menulis batas klaim dan status proyek dengan jujur.
- [ ] Saya mencatat log sprint dan pemakaian AI.

## Kunci dan petunjuk

**Ingat kembali.** 1: sumber NIST menyebut "banyak" sistem kunci publik terdampak (Shor), bukan semua; kunci simetris terdampak lebih kecil: Grover hanya memberi pengurangan kuadrat, dan NIST menyebut penilaian praktis kemungkinan tidak memberi keuntungan bagi penyerang dalam hitungan tahun atau dekade. 2: pemeriksa hanya mencari pola teks; nama, sekolah, dan wajah tidak berpola. 3: boleh: data sintetis, histogram agregat, keluaran teks, label seperti `kelas-demo-01`; tidak boleh: nama murid atau guru, nama sekolah, token atau kunci, tangkapan layar akun.

**Rencana sprint.** Contoh keluaran di atas: A tanpa temuan; B: satu berkas wajib hilang, satu pola telepon, satu pola nama pekerjaan cloud, dua berkas terlarang, satu pola token.

**Daftar periksa.** Tidak ada jawaban tunggal; pemeriksa memastikan tiap butir bisa dicek orang lain.

**Umpan balik sejawat.** Penilaian berupa tiga kalimat tertulis; tidak ada nilai angka.

**Latihan bercampur.** 1: ya, bila datanya agregat; tulis bahwa simulator tidak cocok dengan hitungan tangan pada `t = 3` dan status "sebagian" atau "gagal" dengan dugaan penyebab yang belum diuji. 2: sumber, jumlah shot, model derau, benih, dan tanggal.

**Ulang berjarak.** 1: wajib `README.md`, `log-sprint.md`, `log-ai.md`, `uji/hasil-uji.txt`, `kode/`; terlarang: `.env`, kunci, tangkapan layar akun, dan berkas biner yang memuat data pribadi. 2: label itu dapat mengaitkan pekerjaan dengan akun lembaga, dan tangkapan layar dapat memuat nama atau token.

## Langkah berikutnya

Modul berikut: `e-xii2-m13` (cadangan terstruktur: tinjauan). Bacaan pendamping: `e-xii2-m4` dan `e-xii2-m9`.
