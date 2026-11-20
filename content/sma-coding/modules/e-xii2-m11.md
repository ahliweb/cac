## Untuk siapa modul ini

Modul ini untuk murid kelas XII jalur E (komputasi kuantum), minggu `E-XII2-M11` silabus v1.4: proyek akhir, presentasi, dengan keluaran presentasi dan latihan demo. Prasyarat: modul `e-xii2-m10`. Di luar indeks, ringkasan histogram di bawah memakai TypeScript dengan Bun (setara `B-X1-M9..M12`); presentasinya sendiri tidak memerlukan pemrograman. Alat: kertas, perangkat presentasi apa pun yang ada di sekolah, dan Bun bila ingin menjalankan contoh (tanpa akun). Kerja minggu ini satu sprint: menyiapkan dan berlatih.

Modul ini karangan penyusun dan disetujui pemilik program pada 2026-11-20 (keputusan lewat dialog; catatan tinjauan menjadi tindak lanjut revisi). Jalur E adalah pengayaan di luar rumusan CP; minggu ini tanpa irisan pengayaan, jadi modul ini tidak dihitung memenuhi butir CP mana pun.

Aturan AI jalur ini: AI generatif boleh dipakai dengan etika dan dicatat, tanpa data pribadi, kata sandi, atau tugas bernilai pada permintaanmu, dan tanpa akun wajib. Saran: susun isi presentasi sendiri; AI boleh dipakai untuk menguji pertanyaan yang mungkin muncul, bukan untuk menulis klaim. Catat pemakaian AI di log proyek.

Catatan untuk guru: contoh program dijalankan penyusun; angka `486` dan `514` berasal dari simulator `e-xii2-m7` (benih 7). Takaran klaim yang jujur mengikuti ringkasan makalah Preskill tentang era NISQ (arXiv:1801.00862, per tanggal akses 2026-11-19): derau gerbang membatasi ukuran sirkuit, dan mesin 100 qubit tidak akan segera mengubah dunia. Modul ini tidak menetapkan format atau rubrik resmi; rubrik di bawah adalah usulan.

## Ingat kembali

Jawab dari ingatan, baru cek di bagian kunci.

1. Mengapa energi estimasi bisa berbeda dari energi eksak walau parameter sudah hampir optimum? (dari `e-xii2-m3`)
2. Pada Grover `N = 8`, mengapa peluang `t = 3` lebih kecil daripada `t = 2`? (dari `e-xii2-m8`)
3. Sebutkan dua sifat yang dapat diuji tanpa jawaban hitung tangan per kasus. (dari `e-xii2-m10`)

## Tujuan

Setelah modul ini kamu dapat:

- menyusun presentasi lima menit dengan satu pertanyaan, satu hasil, dan satu batas klaim yang jelas;
- menampilkan hasil dengan keterangan wajib (sumber, shot, model derau, benih, tanggal) dan ukuran kewajaran;
- berlatih demo dengan rencana cadangan bila kode atau layar gagal;
- menjawab pertanyaan penonton dengan menyebut apa yang belum kamu ketahui.

Keluaran yang diminta silabus: presentasi.

## Rencana sprint

**Tujuan sprint satu kalimat:** "lima menit yang dapat diikuti orang yang belum pernah melihat proyekku, dengan satu klaim yang kubuktikan dan satu batas yang kusebut". Kerangka lima bagian, kira-kira satu menit masing-masing: (1) *pertanyaan*: apa yang ingin kamu ketahui; (2) *cara*: simulator atau analisis apa, dalam satu gambar; (3) *hasil*: satu histogram atau tabel dengan keterangan wajib; (4) *batas klaim*: apa yang tidak dibuktikan; (5) *langkah berikutnya* dan undangan bertanya. Satu slide satu pesan; hindari kalimat seperti "terbukti cepat" untuk simulasi.

**Demo.** Demo langsung bisa gagal. Siapkan keluaran program sebagai teks yang sudah dijalankan (cadangan), dan hanya tampilkan data sintetis: tanpa akun, tanpa tangkapan layar yang memuat nama, token, atau kunci. Berlatihlah dengan pengatur waktu minimal dua kali, sekali di depan teman.

Program kecil di bawah (`bun m11.ts`) mengubah hitungan histogram menjadi batang teks lengkap dengan keterangan wajib dan `z` terhadap harapan; hasilnya bisa disalin ke slide sebagai teks.

```ts
// Ringkasan histogram untuk slide hasil: batang teks, simpangan wajar, dan keterangan wajib.
// Jalankan: bun m11.ts
type Hasil = { label: string; hitung: number; harap: number };

function ringkas(judul: string, ket: string[], shot: number, data: Hasil[]): void {
  console.log(judul);
  for (const k of ket) console.log(`  ${k}`);
  for (const d of data) {
    const sd = Math.sqrt(shot * d.harap * (1 - d.harap));
    const z = (d.hitung - shot * d.harap) / sd;
    const batang = "#".repeat(Math.round(d.hitung / 20));
    const status = Math.abs(z) <= 3 ? "wajar" : "perlu dicek";
    console.log(`  ${d.label} ${String(d.hitung).padStart(4)} ${batang.padEnd(26)} z=${z.toFixed(2)} ${status}`);
  }
}

ringkas(
  "GHZ tiga qubit (simulator ideal buatan sendiri)",
  ["sumber: simulator sendiri, benih 7", "shot: 1000", "model derau: tidak ada", "tanggal: diisi saat presentasi"],
  1000,
  [
    { label: "000", hitung: 486, harap: 0.5 },
    { label: "111", hitung: 514, harap: 0.5 },
  ],
);
```

Keluaran asli (dijalankan penyusun dengan `bun m11.ts`):

```text
GHZ tiga qubit (simulator ideal buatan sendiri)
  sumber: simulator sendiri, benih 7
  shot: 1000
  model derau: tidak ada
  tanggal: diisi saat presentasi
  000  486 ########################   z=-0.89 wajar
  111  514 ########################## z=0.89 wajar
```

Bacaan hasilnya. Satu batang sama dengan 20 shot; `z` kecil (-0,89 dan 0,89) berarti selisih dari 500 masih wajar untuk 1000 shot dari peluang 0,5 (simpangan wajar 15,81, `e-xii2-m1`). Keterangan di atas batang itulah yang membuat penonton dapat menilai: tanpa sumber, shot, dan model derau, batang yang sama tidak bermakna. Kolom tanggal sengaja diisi saat presentasi.

**Log sprint** (satu sampai tiga kalimat per hari kerja): bagian presentasi yang selesai, waktu latihan, pertanyaan teman yang tak terjawab, dan catatan pemakaian AI.

## Daftar periksa

- [ ] Tujuan sprint satu kalimat tertulis di log.
- [ ] Lima bagian: pertanyaan, cara, hasil, batas klaim, langkah berikutnya.
- [ ] Satu slide satu pesan; tidak ada klaim kecepatan atau keunggulan untuk simulasi.
- [ ] Histogram atau tabel punya keterangan wajib dan ukuran kewajaran.
- [ ] Keluaran cadangan (teks) tersedia bila demo gagal.
- [ ] Latihan dua kali dengan pengatur waktu; satu kali di depan teman.
- [ ] Tidak ada data pribadi, nama murid, token, kunci, atau tangkapan layar akun di slide.
- [ ] Daftar tiga pertanyaan yang mungkin muncul, dengan jawabannya.
- [ ] Log pemakaian AI terisi.

## Umpan balik sejawat

Berlatihlah di depan satu teman atau satu kelompok kecil. Pendengar memberi tiga hal, tertulis: **satu yang sudah baik**, **satu yang perlu diperbaiki**, dan **satu langkah berikutnya**. Periksa dua hal: apakah pendengar dapat menyebut pertanyaan dan batas klaimmu sesudah lima menit, dan apakah satu klaim jelas bersumber. Penyaji membalas dengan satu perubahan yang akan dibuat.

## Latihan bercampur

1. Dari 1000 shot, hasil `000` muncul 530 kali pada GHZ ideal. Hitung `z` dan putuskan apakah kamu menampilkannya sebagai "sesuai" atau menyelidikinya. (`e-xii2-m1`)
2. Tulis satu kalimat batas klaim untuk presentasi tentang simulator Grover `N = 8`. (`e-xii2-m9`)

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `e-xii2-m12` (satu minggu lagi) dan `e-xii2-m13` (dua minggu lagi). Jawab sekarang lalu simpan.

1. Apa yang boleh dan tidak boleh ditampilkan pada slide demo?
2. Mengapa kalimat "sudah terbukti" perlu diganti pada slide hasil simulasi, dan dengan apa?

## Kesalahan umum

- **"Semakin banyak slide semakin meyakinkan."** Satu pesan per slide lebih mudah diikuti.
- **"Demo langsung selalu lebih baik."** Demo bisa gagal; siapkan keluaran teks cadangan.
- **"Hasil yang bagus tidak perlu keterangan."** Tanpa sumber, shot, dan model derau, penonton tidak dapat menilai.
- **"Batas klaim ditaruh di slide terakhir saja."** Sebut batas itu bersama hasilnya.
- **"Tidak tahu jawaban berarti gagal."** "Belum kuuji; begini caraku mengujinya" adalah jawaban yang jujur.

## Cek mandiri

- [ ] Saya dapat menyebut lima bagian presentasiku.
- [ ] Saya dapat menyebut keterangan wajib di samping hasil.
- [ ] Saya sudah berlatih dengan pengatur waktu.
- [ ] Saya punya rencana cadangan bila demo gagal.
- [ ] Saya mencatat log sprint dan pemakaian AI.

## Kunci dan petunjuk

**Ingat kembali.** 1: derau shot: energi estimasi dihitung dari jumlah shot terbatas, sehingga berupa rata-rata acak yang meleset dari nilai eksak walau `theta` hampir optimum (`e-xii2-m3`). 2: sudut `7 theta` melewati 90 derajat sehingga amplitudo item bertanda berputar melewati titik terbaik; `sin^2` turun ke 169/512. 3: norma tetap 1 dan pembalikan urutan mengembalikan keadaan awal.

**Rencana sprint.** Contoh keluaran di atas; `z = (486 - 500) / 15,81` = -0,89 dan `(514 - 500) / 15,81` = 0,89. Kerangka lima bagian adalah usulan penyusun, bukan aturan resmi.

**Daftar periksa.** Tidak ada jawaban tunggal; pemeriksa memastikan tiap butir bisa dicek orang lain.

**Umpan balik sejawat.** Penilaian berupa tiga kalimat tertulis; tidak ada nilai angka.

**Latihan bercampur.** 1: `z = (530 - 500) / 15,81` = 1,90; masih dalam tiga simpangan, jadi wajar, tetapi bila 530 muncul berulang pada beberapa jalankan, selidiki benih dan generator acak. 2: contoh: "Ini hasil simulasi vektor keadaan buatan sendiri pada `N = 8`; tidak menyatakan kecepatan atau keunggulan pada perangkat nyata."

**Ulang berjarak.** 1: boleh: data sintetis, histogram agregat, keluaran teks, label seperti `kelas-demo-01`; tidak boleh: nama murid atau guru, nama sekolah, token atau kunci, tangkapan layar yang memuat akun. 2: "sudah terbukti" berlebihan karena uji hanya mencakup kasus yang diuji; ganti dengan "cocok dengan hitungan tangan pada kasus ..., dalam batas ... ".

## Langkah berikutnya

Modul berikut: `e-xii2-m12` (proyek akhir: portofolio). Bacaan pendamping: `e-xii2-m1` dan `e-xii2-m9`.
