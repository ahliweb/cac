## Untuk siapa modul ini

Modul ini untuk murid kelas XII jalur B (Web dengan JavaScript, TypeScript, dan Bun), minggu `B-XII2-M9` silabus v1.4.1: ulasan keamanan, yaitu memeriksa rahasia, dependensi, dan masukan pada proyekmu sendiri. Prasyarat: modul `b-xii2-m8`, `b-xi2-m10` (XSS, rahasia, hukum), dan `b-xii1-m10` (rahasia dan konfigurasi).

Modul ini karangan penyusun dan disetujui pemilik program pada 2026-11-20 (keputusan lewat dialog; catatan tinjauan menjadi tindak lanjut revisi). Butir `F-BK-a` dipetakan silabus sebagai dipenuhi jalur ini; pemenuhan butir mengikuti pemetaan silabus, bukan status modul. Keluaran minggu ini: laporan keamanan.

**Aturan keselamatan.** Periksa **hanya proyek milikmu sendiri di komputermu** (`localhost`) atau repositori latihan yang disiapkan gurumu. Jangan memeriksa situs, server, atau jaringan orang lain, termasuk sekolah, tanpa izin tertulis pemiliknya. Semua "rahasia" di sini bernilai palsu (`KUNCI_PALSU_CONTOH`). Contoh dijalankan penyusun dengan Bun 1.4.4 dan Git 2.43.0 per 2026-11. Konteksnya profil `landing` dari `awcms-one` (`main`, 2026-11-20), tanpa backend; semua nama dan konten karangan. AI boleh dipakai dengan etika; **jangan menempelkan rahasia atau data pribadi ke asisten AI.**

## Ingat kembali

Jawab dari ingatan dulu, baru cek di bagian kunci. Soal 1 dari `b-xii2-m8`, soal 2 dari `b-xii2-m6`, soal 3 dari `b-xii2-m1`.

1. Mengapa satu langkah panduan hanya memuat satu perintah, dan bagaimana kamu memastikan tiap perintah yang ditulis benar-benar ada?
2. Apa yang ditemukan pemeriksa hasil build dan tidak ditemukan uji repositori?
3. Mengapa kriteria penerimaan ditulis sebelum halaman dibuat?

## Tujuan

Setelah modul ini kamu dapat:

- memeriksa rahasia di berkas yang dilacak Git dan di riwayat commit;
- memeriksa dependensi dengan `bun audit` dan menyebut apa yang dikirim keluar komputer;
- memeriksa penanganan masukan formulir;
- menulis laporan keamanan: temuan, tingkat, bukti, perbaikan (keluaran minggu ini).

## Rencana sprint

Sprint ini menyambung `b-xii2-m8`: dokumentasi sudah ada, sekarang kamu menilai proyekmu seperti orang luar. Tulis rencana ulasan dan prediksimu sebelum memeriksa.

| Bidang | Pertanyaan | Alat |
| --- | --- | --- |
| Rahasia | Adakah nilai rahasia di berkas atau riwayat? `.env` ikut dilacak? | pemindai tulisanmu, `git ls-files`, `git log -S` |
| Dependensi | Adakah paket dengan kerentanan yang diketahui? | `bun audit` |
| Masukan | Apa yang terjadi bila pengunjung mengirim teks aneh, kosong, atau sangat panjang? | pengujian formulir latihan |
| Lingkup | Apa yang tidak diperiksa dan mengapa? | catatan di laporan |

**Rahasia di berkas.** Pemindai berikut memeriksa daftar berkas yang dilacak Git.

```ts
type Berkas = Record<string, string>;

const PENANDA = /\b[A-Z0-9_]*(?:KUNCI|KEY|TOKEN|SECRET|SANDI|PASSWORD)[A-Z0-9_]*\s*[=:]\s*["']?([^\s"']+)/i;

function pindaiRahasia(berkas: Berkas): string[] {
  const temuan: string[] = [];
  for (const [nama, isi] of Object.entries(berkas)) {
    if (/^\.env(\..+)?$/.test(nama) && nama !== ".env.example") {
      temuan.push(`${nama}: berkas lingkungan ikut dilacak Git`);
      continue;
    }
    isi.split("\n").forEach((baris, i) => {
      const cocok = PENANDA.exec(baris);
      if (cocok && !/^(\.\.\.|isi-sendiri|GANTI)/.test(cocok[1] ?? "")) {
        temuan.push(`${nama}:${i + 1}: kemungkinan rahasia`);
      }
    });
  }
  return temuan;
}

const dilacak: Berkas = {
  "src/site.ts": 'export const nama = "Warung Kopi Contoh";\nconst KUNCI_ANALITIK = "KUNCI_PALSU_CONTOH_12345";',
  "README.md": "Salin .env.example menjadi .env lalu isi nilainya.",
  ".env.example": "KUNCI_ANALITIK=isi-sendiri",
  ".env": "KUNCI_ANALITIK=KUNCI_PALSU_CONTOH_12345",
};

const hasil = pindaiRahasia(dilacak);
console.log(hasil);
console.log(hasil.length, "temuan");
```

```text
[ "src/site.ts:2: kemungkinan rahasia", ".env: berkas lingkungan ikut dilacak Git" ]
2 temuan
```

**Rahasia di riwayat.** Bersih di commit terbaru belum berarti bersih. Di repositori latihan sementara, rahasia palsu ter-commit lalu dihapus pada commit berikutnya:

```text
$ git ls-files
.gitignore
$ git log --oneline -S KUNCI_PALSU_CONTOH_12345
66a2f76 hapus rahasia
3cfda4b tambah konfigurasi
$ git show HEAD~1:.env
KUNCI_ANALITIK=KUNCI_PALSU_CONTOH_12345
```

Berkas sudah tidak dilacak, tetapi nilainya masih dapat dibaca dari commit lama. Rahasia nyata dalam keadaan ini dianggap bocor (modul `b-xii1-m10`).

**Dependensi.** `bun audit` membaca `bun.lock`, mengirim daftar paket ke titik akhir saran keamanan npm tanpa akun, dan mencetak laporan (dokumentasi Bun). Di folder latihan dengan paket `zod@3.23.8` yang sengaja lama, per 2026-11-20:

```text
$ bun audit
bun audit v1.4.4 (38afee6c8)

zod@3.23.8
  (direct dependency)
  high: Zod can exhaust memory while validating oversized constrained collections (<4.6.6) - https://github.com/advisories/GHSA-mrhx-c7xc-m3w5

1 vulnerability (1 high)

  bun audit fix           upgrade the vulnerable packages within their ranges
  bun audit fix --latest  also cross major versions
```

Kode keluar perintah ini 1 ketika ada kerentanan (dijalankan penyusun). Hasilnya bergantung tanggal dan koneksi. Di `awcms-one`, `ci:security` menjalankan CodeQL, gitleaks, dan `bun audit` (komentar `tools/ci/runners/security.ts`); itu dijalankan guru, bukan kamu, dan berkas `.astro` tidak terjangkau CodeQL.

**Masukan.** Penanganan pesan formulir latihan: ditolak bila tidak sah, di-escape bila ditampilkan, tidak ada yang disimpan atau dikirim.

```ts
function escapeHtml(teks: string): string {
  return teks
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

type Hasil = { status: number; badan: string };

function terimaKontak(data: unknown): Hasil {
  if (typeof data !== "object" || data === null) return { status: 400, badan: "bentuk tidak sah" };
  const { pesan } = data as { pesan?: unknown };
  if (typeof pesan !== "string" || pesan.trim() === "") return { status: 400, badan: "pesan kosong" };
  if (pesan.length > 200) return { status: 400, badan: "pesan terlalu panjang" };
  // Tidak ada penyimpanan atau pengiriman: hanya konfirmasi di layar.
  return { status: 200, badan: `<p>Terima kasih. Pesanmu: ${escapeHtml(pesan.trim())}</p>` };
}

{ const h = terimaKontak({ pesan: "Buka jam berapa?" }); console.log(h.status, h.badan); }
{ const h = terimaKontak({ pesan: '<img src=x onerror="alert(1)">' }); console.log(h.status, h.badan); }
{ const h = terimaKontak({ pesan: "   " }); console.log(h.status, h.badan); }
{ const h = terimaKontak({ pesan: "x".repeat(201) }); console.log(h.status, h.badan); }
{ const h = terimaKontak("bukan objek"); console.log(h.status, h.badan); }
```

```text
200 <p>Terima kasih. Pesanmu: Buka jam berapa?</p>
200 <p>Terima kasih. Pesanmu: &lt;img src=x onerror=&quot;alert(1)&quot;&gt;</p>
400 pesan kosong
400 pesan terlalu panjang
400 bentuk tidak sah
```

Laporanmu mencatat tiap temuan dengan tingkat, bukti, dan perbaikan, termasuk hal yang tidak diperiksa.

## Daftar periksa

- [ ] Rencana ulasan ada sebelum memeriksa; lingkup hanya proyek milik sendiri atau repositori latihan.
- [ ] `git ls-files` tidak memuat `.env`; `.env.example` hanya berisi penunjuk.
- [ ] Pemindai dijalankan pada berkas dan `git log -S` pada riwayat.
- [ ] `bun audit` dijalankan; tiap temuan punya tingkat dan keputusan (naikkan, tunda dengan alasan, atau tolak).
- [ ] Formulir diuji dengan masukan kosong, panjang, dan berisi tanda kurung sudut.
- [ ] Laporan memuat temuan, tingkat, bukti, perbaikan, dan hal yang tidak diperiksa.
- [ ] Tidak ada rahasia atau data pribadi di laporan atau permintaan ke AI.

## Umpan balik sejawat

Tukar laporan dengan kelompok lain: apakah tiap temuan punya bukti yang bisa dijalankan ulang dan perbaikannya diuji? Format: **satu yang sudah baik, satu yang perlu diperbaiki, satu langkah berikutnya**.

## Latihan bercampur

1. `AI: boleh` (dari `b-xii2-m6`) Tulis satu baris laporan uji manual untuk formulir kontak dengan pesan kosong: langkah, hasil yang diharapkan, hasil nyata.
2. `AI: boleh` (dari `b-xii2-m1`) Dari kebutuhan "pengunjung dapat bertanya tanpa memberi data pribadi", tulis dua pemeriksaan keamanan yang membuktikannya.

## Ulang berjarak

Pertanyaan 1 muncul lagi di `Ingat kembali` modul `b-xii2-m10` (pertanyaan 1), dan pertanyaan 2 sekitar tiga minggu lagi di `b-xii2-m12` (pertanyaan 2). Pertanyaan 3 tidak punya modul tujuan lagi karena jalur B berakhir di `b-xii2-m14`; ulangi sendiri sekitar delapan minggu lagi. Jawab sekarang lalu simpan.

1. Mengapa menghapus berkas rahasia dari commit terbaru tidak cukup, dan apa urutan langkah yang benar?
2. Apa yang dikirim `bun audit` ke luar komputer, dan apa arti kode keluar 1?
3. Mengapa ulasan keamanan hanya dilakukan pada proyek milik sendiri atau yang diizinkan tertulis?

## Kesalahan umum

- **Menganggap commit terbaru yang bersih berarti aman.** Riwayat menyimpan nilai lama.
- **Menaikkan semua versi paket sekaligus.** Baca perubahannya dan jalankan ulang gerbang.
- **Menganggap `bun audit` bersih berarti tanpa risiko.** Ia hanya menemukan kerentanan yang sudah diketahui.
- **Menguji pada sistem yang bukan milikmu.** Itu di luar lingkup dan dapat melanggar hukum (modul `b-xii2-m10`).

## Cek mandiri

- [ ] Saya dapat memeriksa rahasia di berkas dan riwayat Git.
- [ ] Saya dapat menjalankan `bun audit` dan menyebut apa yang dikirimnya.
- [ ] Saya dapat menguji penanganan masukan formulir.
- [ ] Saya dapat menulis laporan keamanan dengan temuan, tingkat, bukti, dan perbaikan.
- [ ] Saya tahu bahwa saya hanya memeriksa proyek milik sendiri.

## Kunci dan petunjuk

**Ingat kembali.** 1: agar tiap langkah dapat dicoba dan diperiksa tersendiri; perintahnya dicocokkan dengan `package.json` atau dijalankan sungguh-sungguh. 2: sisa merek di berkas statis (`favicon.svg`), karena uji repositori tidak tahu merekmu. 3: agar selesai atau belumnya dapat diuji tanpa berdebat dan tidak bergeser mengikuti hasil; contoh kriteria: "pengunjung menemukan jam buka dalam dua klik".

**Rencana sprint.** Tabel di atas contoh. Keluaran pemindai: dua temuan, `src/site.ts:2` (nilai rahasia di kode) dan `.env` (ikut dilacak Git). Perbaikan: baca nilainya dari `process.env` dan hentikan pelacakan `.env` (`git rm --cached .env` dan `.gitignore`). Pemindai tidak melaporkan `.env.example` karena nilainya penunjuk `isi-sendiri`. Riwayat: karena nilai itu pernah ter-commit, anggap bocor, ganti dulu di penyedia (di latihan palsu: ganti nilainya), baru bereskan repositori.

**Latihan bercampur.** 1: contoh: langkah "tekan Periksa pesan dengan semua kolom kosong", diharapkan "tiga galat tampil, tidak ada konfirmasi, tidak ada permintaan jaringan", nyata "tiga galat tampil, tab Network kosong", lulus. 2: contoh: (a) kirim pesan berisi nama dan nomor telepon lalu periksa bahwa tidak ada berkas, `localStorage`, atau permintaan jaringan baru yang menyimpannya; (b) `git ls-files` dan pemindai tidak menunjukkan formulir yang memuat bidang `telepon`.

**Ulang berjarak.** 1: commit baru tidak menghapus commit lama; langkahnya cabut dan ganti rahasia di penyedia, hentikan pelacakan (`.gitignore`, `git rm --cached`), baru bereskan repositori. 2: daftar paket dari `bun.lock` dikirim ke titik akhir saran keamanan npm (bukan isi kodemu); kode keluar 1 berarti ada kerentanan yang ditemukan. 3: menguji sistem orang lain tanpa izin dapat menjadi akses tanpa hak (KUHP Pasal 332 ayat (1), dibahas di `b-xii2-m10`); milik sendiri atau izin tertulis membuatnya sah.

## Langkah berikutnya

Modul berikut: `b-xii2-m10` (privasi dan hukum), yang memeriksa proyekmu terhadap pokok UU ITE, KUHP, dan UU PDP. Modul terkait: `fondasi-keamanan-dasar` dan `cloud-keamanan-dan-privasi`. Bacaan lanjut: dokumentasi `bun audit` dan halaman OWASP tentang XSS.
