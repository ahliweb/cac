## Untuk siapa modul ini

Mahasiswa semester 5 informatika atau ilmu komputer yang sudah menempuh
`KUL-I-205` (pengembangan web: HTML, CSS, TypeScript). Satu mata kuliah, satu
semester (2 SKS): 14 pertemuan dengan beban per pertemuan lebih kecil,
ujian tengah sesudah pertemuan 7, ujian akhir sesudah pertemuan 14
`[asumsi]` (silabus 2.3). Interaksi manusia-komputer (HCI) bertanya: apakah
orang sungguhan dapat memakai antarmuka ini untuk tujuannya? Jawabannya
datang dari pengamatan, bukan dari selera perancang.

Bahasa contoh: **TypeScript 7.0.2 dengan Bun 1.4.4** (Linux), untuk
menghitung dan memeriksa. Setiap blok `ts` dijalankan penulis dan keluarannya
cocok dengan yang tertulis; blok `css`, `html`, dan `text` tidak dijalankan.
Blok berinfo `setengah-jadi` sengaja berlubang. Di semester 5 contoh penuh
dibatasi; lebih banyak kasus dan spesifikasi. **Semua data peserta di modul
ini sintetis** (P01 dan seterusnya); data nyata, nama, dan rekaman wajah atau
suara tidak masuk repositori mana pun (ADR-0004).

## Peta semester

| Pertemuan | Bagian | Pokok bahasan | CPMK | Kuis pembuka (jarak) |
| --- | --- | --- | --- | --- |
| 1 | 1 | Kebergunaan; rancangan berpusat pada pengguna | C1 | `KUL-I-205`: pemeriksaan aksesibilitas |
| 2 | 1 | Sepuluh heuristik kebergunaan | C1 | 1, lalu `KUL-I-204`: tinjau kode |
| 3 | 1 | Umpan balik dan pesan galat | C1 | 2, lalu 1 |
| 4 | 1 | Konsistensi, mengenali daripada mengingat; **kuis kumulatif 1** | C1 | 3, lalu `KUL-I-202`: normalisasi |
| 5 | 2 | Memilih metode evaluasi | C2 | 4, lalu 2 |
| 6 | 2 | Skenario tugas; etika menguji dengan orang | C2 | 5, lalu 3 |
| 7 | 2 | Menjalankan uji; catatan pengamatan | C2 | 6, lalu 4 |
| ujian tengah | | Ujian praktik, tanpa AI | C1–C2 | |
| 8 | 2 | Metrik: keberhasilan, waktu, SUS; **kuis kumulatif 2** | C2 | 7, lalu 5 |
| 9 | 2 | Analisis dan pelaporan | C2 | 8, lalu 6 |
| 10 | 3 | Aksesibilitas: persepsi dan kontras | C2 | 9, lalu 7 |
| 11 | 3 | Papan ketik, fokus, ukuran target | C2 | 10, lalu 8 |
| 12 | 3 | Teknologi bantu; tinjau aksesibilitas; **kuis kumulatif 3** | C2 | 11, lalu 9 |
| 13 | 4 | Proyek rancangan (1) | C1, C2 | 12, lalu 10 |
| 14 | 4 | Proyek rancangan (2); **kuis kumulatif akhir** | C1, C2 | 13, lalu 1 sampai 12 |
| ujian akhir | | Ujian praktik, tanpa AI | C1–C2 | |

## Ingat kembali

Tiap pertemuan dibuka kuis 5 menit **tanpa catatan**, 3 sampai 5 soal. Kolom
terakhir peta menunjukkan asal soalnya, dengan jarak bertambah. Contoh soal
pertemuan 1 sampai 4:

1. Sebut tiga pemeriksaan aksesibilitas dasar yang dapat dijalankan mesin pada
   HTML. (`KUL-I-205`)
2. Sebut empat pertanyaan penelaah dalam tinjau kode. (`KUL-I-204`)
3. Mengapa satu fakta sebaiknya disimpan di satu tempat saja? (`KUL-I-202`)
4. Apa arti status 400 dan 404? (`KUL-I-205`)

Jawaban soal 1 (`lang`, `alt`, label) langsung dipakai di bagian 3. Mengingat
dengan usaha, bukan membaca ulang, yang membuat ingatan bertahan.

## Tujuan

Pada akhir semester kamu dapat (CPMK, silabus bagian 3.1):

- **C1** merancang antarmuka berbasis pengguna;
- **C2** mengevaluasi kebergunaan dan aksesibilitas.

## Bagian 1: Prinsip rancangan (pertemuan 1 sampai 4)

**Kebergunaan** adalah seberapa baik pengguna tertentu mencapai tujuannya
dengan antarmuka itu: berhasil, cepat, tanpa banyak salah, dan tanpa frustrasi.
Rancangan berpusat pada pengguna berarti siklus kecil: pahami pengguna dan
tugasnya, rancang, buat prototipe, evaluasi dengan orang, perbaiki. Panduan
yang paling sering dipakai adalah sepuluh heuristik (aturan praktis, bukan
pedoman rinci) dari Nielsen Norman Group: (1) visibilitas status sistem,
(2) kesesuaian dengan dunia nyata, (3) kendali dan kebebasan pengguna,
(4) konsistensi dan standar, (5) pencegahan galat, (6) mengenali daripada
mengingat, (7) fleksibilitas dan efisiensi, (8) estetika dan desain
minimalis, (9) membantu pengguna mengenali, mendiagnosis, dan pulih dari
galat, (10) bantuan dan dokumentasi.

### Prediksi dulu

Dua cara memberi tahu pengguna bahwa isiannya salah. Tanpa menjalankan,
putuskan mana yang melanggar heuristik 9 dan kata apa yang hilang dari pesan
pertama.

```ts
type Isian = { email: string; umur: string };

function buruk(i: Isian): string | null {
  if (!/^[^@\s]+@[^@\s]+$/.test(i.email) || !/^\d+$/.test(i.umur)) return "Masukan tidak valid.";
  return null;
}

function baik(i: Isian): string[] {
  const pesan: string[] = [];
  if (!/^[^@\s]+@[^@\s]+$/.test(i.email)) {
    pesan.push(`Email "${i.email}" belum lengkap. Tulis seperti nama@contoh.example.`);
  }
  if (!/^\d+$/.test(i.umur)) {
    pesan.push(`Umur harus berupa angka bulat, mis. 19. Kamu menulis "${i.umur}".`);
  }
  return pesan;
}

const coba: Isian = { email: "ayu.contoh.example", umur: "sembilan belas" };
console.log(buruk(coba));
for (const p of baik(coba)) console.log(p);
```

### Contoh terselesaikan

```text
Masukan tidak valid.
Email "ayu.contoh.example" belum lengkap. Tulis seperti nama@contoh.example.
Umur harus berupa angka bulat, mis. 19. Kamu menulis "sembilan belas".
```

Pesan pertama tidak menyebut **isian mana**, **apa salahnya**, dan **cara
memperbaikinya**: pengguna harus menebak. Pesan kedua menyebut ketiganya dan
memakai bahasa yang dipahami pengguna (heuristik 2 dan 9). Pencegahan
(heuristik 5) lebih baik lagi: jenis isian `email` dan `inputmode="numeric"`
mengurangi salah ketik sejak awal. Pesan galat juga **tidak bergantung pada
warna saja** dan terbaca teknologi bantu (bagian 3).

### Contoh setengah jadi

Tulis pesan untuk kata sandi yang terlalu pendek, tanpa menyalahkan pengguna:

```ts setengah-jadi
function pesanSandi(sandi: string): string | null {
  if (sandi.length >= ___) return null;
  return `Kata sandi perlu minimal ___ karakter; kamu menulis ${sandi.length}. Tambahkan ___.`;
}
```

### Latihan

- **Ubah:** tambahkan ke `baik` aturan umur harus 17 ke atas dengan pesan yang
  menyebut batasnya.
- **Buat:** pilih satu aplikasi yang sering kamu pakai dan temukan satu
  pelanggaran heuristik berbeda untuk tiga heuristik; tulis buktinya.
- **Jelaskan:** mengapa "mengenali daripada mengingat" mengurangi beban
  pengguna, dengan contoh menu versus perintah ketik?
- **Berpasangan (praktikum pertemuan 3):** satu orang mengerjakan tugas di
  aplikasi, satu orang mencatat tiap hambatan; tukar peran tiap sekitar 10
  menit.

## Bagian 2: Evaluasi kebergunaan (pertemuan 5 sampai 9)

Ada dua kelompok metode. **Inspeksi** (evaluasi heuristik): pakar membaca
antarmuka dengan daftar heuristik; cepat dan murah tetapi hanya berpendapat.
**Uji dengan pengguna**: orang sungguhan mengerjakan **tugas skenario**
(misalnya "pesan satu buku dan lihat ongkosnya") sambil kamu mengamati,
dengan metode *think-aloud* (peserta berbicara sambil bekerja). Yang diukur:
**tingkat keberhasilan** (berapa orang menyelesaikan tugas tanpa bantuan),
waktu, jumlah galat, dan kepuasan, misalnya dengan kuesioner **SUS** (*System
Usability Scale*, 10 butir bernilai 1 sampai 5; skor 0 sampai 100). Rumus SUS:
butir bernomor ganjil dihitung `nilai - 1`, bernomor genap `5 - nilai`, lalu
jumlahnya dikali 2,5 (rumus dari Brooke, 1996; sumber primer tidak dibuka
penulis `[belum terverifikasi]`, cocokkan sebelum dipakai resmi).

**Etika menguji dengan orang.** Minta persetujuan sebelum mulai, jelaskan
bahwa yang diuji adalah antarmukanya, bukan pesertanya, boleh berhenti kapan
saja, pakai kode peserta (P01) bukan nama, dan jangan merekam wajah atau suara
tanpa persetujuan tertulis. Simpan catatan di tempatmu sendiri; repositori
mata kuliah tidak menyimpan data peserta.

### Prediksi dulu

Seorang peserta menjawab SUS dengan `[4, 2, 4, 1, 4, 2, 5, 2, 4, 2]` (butir 1
sampai 10). Hitung skornya dengan tangan sebelum menjalankan kode.

```ts
// Data SINTETIS: peserta fiktif (P01..P05), bukan orang sungguhan.
const jawaban: Record<string, number[]> = {
  P01: [4, 2, 4, 1, 4, 2, 5, 2, 4, 2],
  P02: [3, 3, 3, 2, 3, 3, 4, 3, 3, 3],
  P03: [5, 1, 5, 1, 5, 1, 5, 1, 5, 1],
  P04: [4, 2, 3, 2, 4, 2, 4, 2, 4, 2],
  P05: [2, 4, 2, 4, 3, 4, 2, 4, 2, 4],
};

function skorSUS(x: number[]): number {
  let jumlah = 0;
  x.forEach((nilai, i) => {
    jumlah += i % 2 === 0 ? nilai - 1 : 5 - nilai;
  });
  return jumlah * 2.5;
}

const skor = Object.entries(jawaban).map(([p, x]) => [p, skorSUS(x)] as const);
for (const [p, s] of skor) console.log(p, s);

const urut = skor.map(([, s]) => s).sort((a, b) => a - b);
console.log("median", urut[Math.floor(urut.length / 2)], "rentang", urut[0], "sampai", urut[urut.length - 1]);

// Tugas: 1 = berhasil tanpa bantuan, 0 = gagal atau dibantu.
const tugas = { "T1 cari produk": [1, 1, 1, 1, 0], "T2 bayar": [1, 0, 1, 0, 0] };
for (const [nama, hasil] of Object.entries(tugas)) {
  const ok = hasil.reduce((a, b) => a + b, 0);
  console.log(nama, `${ok}/${hasil.length}`);
}
```

### Contoh terselesaikan

```text
P01 80
P02 55
P03 100
P04 72.5
P05 27.5
median 72.5 rentang 27.5 sampai 100
T1 cari produk 4/5
T2 bayar 2/5
```

Hitungan P01: butir ganjil (4, 4, 4, 5, 4) memberi 3+3+3+4+3 = 16; butir
genap (2, 1, 2, 2, 2) memberi 3+4+3+3+3 = 16; (16 + 16) × 2,5 = 80. Dengan
lima peserta, **laporkan sebaran dan angka mentahnya**, bukan satu rata-rata
yang tampak pasti: median 72,5 tetapi rentang 27,5 sampai 100 menunjukkan
orang sangat berbeda. Yang lebih berguna daripada skor adalah **tugas mana
yang gagal**: T2 (bayar) hanya 2 dari 5 berhasil, sehingga di situlah
perbaikan dimulai; *catatan pengamatan* menjelaskan mengapa (misalnya tombol
tersembunyi). Evaluasi dengan sedikit peserta menemukan masalah, bukan
membuktikan antarmuka baik.

### Contoh setengah jadi

Tulis kriteria laporan untuk satu temuan:

```text setengah-jadi
Temuan: peserta tidak menemukan tombol ___ pada tugas ___.
Bukti: ___ dari 5 peserta gagal; P03 berkata "___".
Heuristik terkait: nomor ___.
Usulan perbaikan: ___.
```

### Latihan

- **Ubah:** tambahkan P06 dengan jawaban SUS yang kamu karang (sintetis) dan
  tunjukkan perubahan median dan rentang.
- **Buat:** tulis tiga tugas skenario untuk antarmuka yang kamu pilih, masing-
  masing dengan kriteria "berhasil".
- **Jelaskan:** mengapa respons dari asisten AI yang berperan sebagai pengguna
  tidak sama dengan hasil uji pengguna sungguhan? (Penulis tidak menemukan
  bukti yang dibuka bahwa respons AI menggantikan pengguna nyata; anggap itu
  paling jauh sebagai sumber hipotesis `[inferensi]`.)
- **Berpasangan (praktikum pertemuan 7):** satu orang memandu uji dan mencatat,
  satu orang menjadi peserta dengan *think-aloud*; tukar peran. Tugasnya
  antarmuka latihan, bukan data pribadi.

## Bagian 3: Aksesibilitas (pertemuan 10 sampai 12)

Aksesibilitas berarti antarmuka dapat dipakai orang dengan beragam
kemampuan: penglihatan, pendengaran, gerak, kognisi. Acuan resmi yang dipakai
luas adalah **WCAG 2.2** dari W3C. Beberapa kriterianya yang dapat dihitung
atau diperiksa: **teks pengganti** untuk konten bukan teks (1.1.1, tingkat A);
**kontras teks** minimal 4,5:1 (teks besar 3:1) (1.4.3, tingkat AA); **target
penunjuk** sedikitnya 24 kali 24 piksel CSS, dengan pengecualian misalnya bila
jaraknya memadai (2.5.8, tingkat AA, baru di versi 2.2); dan semua fungsi
dapat dipakai dengan **papan ketik**. Kontras dihitung dari **luminans
relatif** warna sRGB: `L = 0,2126 R + 0,7152 G + 0,0722 B` dengan tiap kanal
dilinierkan, lalu rasio `(L1 + 0,05) / (L2 + 0,05)` dengan L1 yang lebih
terang.

### Prediksi dulu

Abu-abu `#777777` di atas putih tampak cukup jelas. Menurutmu lulus 4,5:1?
Apa pula nilai rasio untuk hitam di atas putih?

```ts
function cahaya(hex: string): number {
  const c = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
  const lin = c.map((v) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * lin[0]! + 0.7152 * lin[1]! + 0.0722 * lin[2]!;
}

function kontras(a: string, b: string): number {
  const [terang, gelap] = [cahaya(a), cahaya(b)].sort((x, y) => y - x);
  return (terang! + 0.05) / (gelap! + 0.05);
}

const pasangan: Array<[string, string, string]> = [
  ["teks hitam", "#000000", "#ffffff"],
  ["abu-abu 767676", "#767676", "#ffffff"],
  ["abu-abu 777777", "#777777", "#ffffff"],
  ["merah galat", "#8a1c1c", "#ffffff"],
];
for (const [nama, depan, belakang] of pasangan) {
  const r = kontras(depan, belakang);
  console.log(nama.padEnd(15), r.toFixed(2), r >= 4.5 ? "lulus 4,5:1" : "gagal 4,5:1");
}

const target = [
  { nama: "tombol Simpan", lebar: 44, tinggi: 44 },
  { nama: "ikon hapus", lebar: 16, tinggi: 16 },
];
for (const t of target) {
  console.log(t.nama.padEnd(15), t.lebar >= 24 && t.tinggi >= 24 ? "cukup besar" : "kurang dari 24x24");
}
```

### Contoh terselesaikan

```text
teks hitam      21.00 lulus 4,5:1
abu-abu 767676  4.54 lulus 4,5:1
abu-abu 777777  4.48 gagal 4,5:1
merah galat     9.28 lulus 4,5:1
tombol Simpan   cukup besar
ikon hapus      kurang dari 24x24
```

Selisih satu satuan pada nilai warna (`76` ke `77`) memindahkan teks dari
lulus ke gagal: **mata tidak dapat menilai ini, hitungan yang dapat**. Hitam di atas
putih 21:1 adalah rasio tertinggi; rasio apa pun berada di antara 1 dan 21.
Pemeriksaan target di atas menyederhanakan: WCAG menerima target kecil bila
jaraknya memadai, jadi ikon 16 kali 16 yang berjarak lega bisa lolos;
skrip hanya menandainya untuk ditinjau. Untuk papan ketik, tekan `Tab` dari
awal halaman: fokus harus terlihat, urutannya masuk akal, dan tidak ada
jebakan yang tak bisa dikeluarkan. Pemeriksa HTML dari `KUL-I-205` (`lang`,
`alt`, label) dijalankan sebelum tinjau manual dengan pembaca layar. Alat
otomatis hanya menangkap sebagian masalah; kata "lulus" di sini bukan
sertifikasi.

### Contoh setengah jadi

```ts setengah-jadi
const r = kontras("#___", "#ffffff");
console.log(r >= ___ ? "lulus" : "gagal");
```

### Latihan

- **Ubah:** ubah warna teks `#777777` ke nilai terdekat yang lulus 4,5:1 dan
  verifikasi dengan `kontras`.
- **Buat:** tulis daftar periksa aksesibilitas sepuluh butir untuk satu halaman
  `KUL-I-205` milikmu dan jalankan.
- **Jelaskan:** mengapa warna merah saja tidak cukup untuk menandai galat?
- **Berpasangan (praktikum pertemuan 11):** navigasikan aplikasi pasangan
  dengan papan ketik saja; catat tempat fokus hilang.

## Bagian 4: Proyek rancangan (pertemuan 13 dan 14)

Pada tahap ini contoh penuh diganti spesifikasi. Dalam dua pertemuan, putaran
pendek: rancang, evaluasi, perbaiki.

### Prediksi dulu

Sebelum merancang, prediksi di antarmuka yang akan kamu buat: tugas mana yang
paling mungkin gagal, dan di heuristik mana kamu paling mungkin melanggar.

### Contoh terselesaikan

Spesifikasi (bukan solusi): antarmuka fiktif "pemesanan buku koperasi".

| Kode | Kriteria penerimaan |
| --- | --- |
| R1 | dua tugas skenario tertulis dengan kriteria berhasil |
| R2 | prototipe (kertas atau HTML) yang lolos pemeriksa `KUL-I-205` |
| R3 | semua pasangan warna teks lolos 4,5:1 (dihitung, bukan dikira) |
| R4 | satu putaran uji dengan pengguna sintetis atau teman (etika bagian 2) |
| R5 | satu halaman laporan: temuan, bukti, heuristik, perbaikan |

### Contoh setengah jadi

```ts setengah-jadi
const tugasT1 = [1, ___, 1, 0];
console.log(`T1 ${tugasT1.reduce((a, b) => a + b, 0)}/${tugasT1.length}`);
```

### Latihan

- **Ubah:** perbaiki satu temuan dari laporan temanmu dan jalankan kembali
  pemeriksaan kontras dan label.
- **Buat:** selesaikan R1 sampai R5 dan simpan dalam repositorimu sendiri.
- **Jelaskan:** apa satu hal yang tidak dapat kamu simpulkan dari uji dengan
  lima peserta?

## Latihan bercampur

Setelah bagian 2 dan 3, kerjakan soal yang **tidak menyebut** konsepnya.
Contoh: "Tiga dari lima peserta tidak menemukan tombol Bayar, dan satu peserta
tuna netra tidak dapat melewati halaman yang sama dengan pembaca layar. Apa
dua dugaan penyebabnya dan metode apa yang membedakan keduanya?" Kamu
memutuskan: tata letak dan label (kebergunaan) atau teks pengganti dan urutan
fokus (aksesibilitas)? Kuis kumulatif (pertemuan 4, 8, 12, 14) berbentuk sama.

## Ulang berjarak

Kerjakan ulang tanpa melihat solusi lama:

- satu minggu setelah bagian: hitung skor SUS dan rasio kontras dari ingatan;
- awal tiap bagian baru: dua soal dari bagian sebelumnya;
- minggu sebelum ujian: tiga soal yang dahulu salah;
- semester berikutnya: sebut sepuluh heuristik dan jelaskan umpan balik
  (heuristik 1 dan 5) dalam antarmuka interaktif; `KUL-I-306` memakainya;
- tulis ulang tiga langkah etika menguji dengan orang; `KUL-I-401` memakainya
  saat demo kepada pemangku kepentingan.

## Kebijakan AI dan log pemakaian

Silabus bagian 6.3 **belum menyatakan** tingkat AI mata kuliah ini. Modul
memakai usulan baku `[asumsi]`: **Kuning** untuk tugas dasar (bagian 1 sampai
3), **Hijau** untuk proyek rancangan bagian 4, **Merah** untuk ujian praktik;
dosen menetapkan per tugas. Pada Kuning AI boleh menjelaskan konsep, **tidak**
boleh menghasilkan solusi yang kamu serahkan, dan hanya setelah gerbang
kesiapan: kamu dapat (1) menelusuri program pendek, (2) menulis satu uji yang
gagal bila kode salah, (3) menjelaskan kode dengan kata sendiri. Pada Hijau
kamu mencatat log di repositorimu sendiri: alat dan versi, tujuan, perintah,
bagian keluaran yang dipakai. AI boleh membantu menyusun daftar periksa atau
draf pesan galat, tetapi **temuan kebergunaan harus datang dari pengamatan
pengguna**, dan semua yang dihasilkan AI kamu periksa sendiri. **Jangan
memasukkan data peserta, nama, kata sandi, atau kunci ke asisten AI.** Dosen
dapat mewawancarai kamu tentang rancangan dan hasil ujimu.

## Kesalahan umum

- **Merancang untuk dirimu sendiri.** Kamu bukan pengguna tipikal.
- **Menganggap lima peserta membuktikan antarmuka baik.** Mereka menemukan
  masalah, bukan membuktikan ketiadaannya.
- **Melaporkan satu rata-rata.** Tunjukkan sebaran dan angka mentah.
- **Mengandalkan warna saja untuk makna.** Tambahkan teks atau bentuk.
- **Menilai kontras dengan mata.** Hitung rasionya.
- **Menganggap alat otomatis cukup.** Ia menangkap sebagian saja; uji juga
  dengan papan ketik dan orang.
- **Merekam atau mencatat nama peserta tanpa persetujuan.** Pakai kode peserta.

## Cek mandiri

Tutup modul, jawab, baru periksa.

1. Tulis ulang pesan "Masukan tidak valid." menjadi pesan yang menyebut isian,
   salahnya, dan perbaikannya.
2. Hitung skor SUS untuk `[5, 1, 5, 1, 5, 1, 5, 1, 5, 1]`.
3. Mengapa satu rata-rata skor SUS dari lima peserta menyesatkan?
4. Mana yang lulus 4,5:1 di atas putih: `#767676` atau `#777777`?
5. Sebut tiga langkah etika menguji dengan orang.
6. Sebut tiga hal yang harus bisa kamu lakukan sebelum memakai AI pada tugas
   Kuning.

Daftar periksa (kosong; kamu isi sendiri, tidak dikumpulkan):

- [ ] Aku dapat menilai antarmuka dengan sepuluh heuristik.
- [ ] Aku dapat merancang dan menjalankan uji dengan pengguna secara etis.
- [ ] Aku dapat menghitung kontras dan memeriksa aksesibilitas dasar.

## Kunci dan petunjuk

- **Bagian 1:** pesan pertama melanggar heuristik 9; ia tidak menyebut isian,
  salahnya, atau perbaikannya. Setengah jadi: `8`, `8`, dan satu saran
  konkret (mis. "angka atau simbol").
- **Bagian 2:** P01 = 80 (ganjil 16, genap 16). Setengah jadi: isian
  sesuai data buatanmu. Latihan 3: respons AI bukan pengamatan orang sungguhan.
- **Bagian 3:** `#777777` gagal (4,48), hitam di putih 21,00, `#767676` lulus
  (4,54). Setengah jadi: `767676` dan `4.5`. Latihan 1: `#767676`.
- **Bagian 4:** `T1` berisi angka 0 atau 1 sesuai pengamatan; `___` dapat
  `1` atau `0`.
- **Cek mandiri 2:** 100.
- **Ingat kembali:** (1) `lang` halaman, `alt` gambar, label isian;
  (2) benar, teruji, terbaca, aman; (3) agar pembaruan cukup di satu tempat dan
  tidak ada data yang bertentangan; (4) 400 permintaan salah, 404 tidak ada.
- **Petunjuk bertahap bila macet:** (1) tulis tugas pengguna sebagai satu
  kalimat; (2) amati satu orang mengerjakannya dan catat tempat ia berhenti;
  (3) hubungkan tempat berhenti itu dengan satu heuristik.

## Langkah berikutnya

`KUL-I-306` (Grafika dan Teknik Interaktif, pilihan) memakai umpan balik dan
kendali pengguna pada antarmuka interaktif. `KUL-I-401` (Proyek Perangkat
Lunak Tim) menuntut demo kepada pemangku kepentingan dan antarmuka yang dapat
diakses.

## Catatan untuk dosen

Bobot dan bentuk asesmen berikut **usulan**; prodi menetapkan (silabus 6.1,
6.2): proyek rancangan, ujian praktik tanpa AI, kuis kumulatif, wawancara
singkat. Variasi tugas per mahasiswa: ganti domain antarmuka dan tugas
skenarionya. Praktikum berpasangan memakai pasangan acak per bagian; tugas
yang dinilai tetap perorangan. Uji dengan pengguna di kelas memerlukan
persetujuan dan data tanpa identitas; jangan mengumpulkan rekaman. Rumus SUS
dan batas WCAG disampaikan sebagai alat bantu; modul tidak mengklaim
sertifikasi aksesibilitas, dan angka kontras dihitung dari rumus yang
dibuka dari spesifikasi WCAG 2.2. Bukti bahwa pengguna sintetis dari AI
menggantikan pengguna nyata tidak ditemukan penulis `[inferensi]`.
