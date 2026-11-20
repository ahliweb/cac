## Untuk siapa modul ini

Modul ini untuk murid kelas XI jalur B (Web dengan JavaScript, TypeScript, dan Bun), minggu `B-XI2-M14` silabus v1.4.1: asesmen dan refleksi semester 2 kelas XI. Prasyarat: modul `b-xi2-m12` dan seluruh materi `b-xi2-m1` sampai `b-xi2-m13`; modul ini menilai semuanya.

Modul ini karangan penyusun dan disetujui pemilik program pada 2026-11-20 (keputusan lewat dialog; catatan tinjauan menjadi tindak lanjut revisi), dan tidak dihitung sebagai pemenuhan butir capaian pembelajaran. Asesmen ini **tanpa AI**: jangan memakai AI generatif saat mengerjakannya (silabus 7.4), karena tujuannya melihat apa yang bisa kamu selesaikan sendiri. Bobot nilai dan predikat mengikuti kebijakan sekolah `[belum terverifikasi]`; modul ini hanya memberi soal dan kunci latihan.

Bagian praktik dikerjakan di komputer dengan Bun (1.4.4 dipakai penyusun per 2026-11), seluruhnya di `localhost`, tanpa akun dan tanpa layanan luar. Data di soal karangan.

## Ingat kembali

Ini inti asesmen: jawab dari ingatan, tanpa melihat catatan, lalu cocokkan dengan kunci. Soal 1 dari `b-xi2-m6`, soal 2 dari `b-xi2-m11`, soal 3 dari `b-xi2-m10`, soal 4 dari `b-xi2-m8`, soal 5 dari `b-xi2-m13`.

1. Mengapa satu kali pengukuran tidak cukup untuk menyimpulkan satu cara lebih cepat?
2. Apa beda "tidak tersambung" dengan status 404 saat mendiagnosis, dan apa yang dicek pertama untuk masing-masing?
3. Apa itu XSS, dan apa dua cara mencegahnya?
4. Apa beda rata-rata bergerak dan garis kecenderungan, dan pada data seperti apa rata-rata bergerak tertinggal?
5. Apa yang dicatat sebuah laporan aplikasi data agar orang lain dapat memeriksa hasilnya?

## Tujuan

Soal di modul ini menilai apakah kamu dapat:

- membuat server dan API JSON yang memvalidasi masukan dengan status yang tepat;
- mengolah data: memeriksa bentuk, merekap, meramal, dan menyatakan batas ramalan;
- mengenali XSS dan rahasia yang bocor, dan menyebut pokok hukum yang relevan dengan sumbernya;
- mendiagnosis permintaan yang gagal dengan status, galat jaringan, `curl`, dan DevTools.

## Latihan bercampur

Kerjakan sendiri, `AI: tanpa AI`, dalam waktu yang ditetapkan gurumu.

1. **Tulis (server dan validasi).** Tulis `Bun.serve` di `localhost` dengan rute `GET /api/hitung?a=3&b=4` yang menjawab `{"jumlah":7}`, status 400 bila `a` atau `b` kosong atau bukan angka, dan 404 untuk jalur lain. Apa jawaban untuk `?a=3&b=x`, dan mengapa `Number(null)` perlu dihindari?
2. **Telusuri (data).** Untuk `[{"k":"a","n":3},{"k":"b","n":"x"},{"k":"a","n":5}]`, tulis rekap per `k` yang menolak `n` bukan angka, dan sebut hasilnya beserta banyaknya baris yang ditolak.
3. **Prediksi.** Data `[10, 12, 15, 17, 20]` (minggu 1 sampai 5): hitung kemiringan, titik potong, dan ramalan minggu ke-6 dengan garis kecenderungan, lalu tebakan rata-rata bergerak lebar 3. Mana yang lebih masuk akal untuk data ini, dan satu hal apa yang tidak diketahui kedua cara?
4. **Ulas (keamanan).** Temukan tiga masalah pada kode berikut dan tulis perbaikannya, lalu sebut satu pokok pada UU PDP atau KUHP (UU 1/2023) yang menjadi alasan berhati-hati dengan data dan akses orang lain:

   ```ts
   const kunci = "KUNCI_PALSU_CONTOH_1";
   const nama = new URL(location.href).searchParams.get("nama") ?? "tamu";
   document.querySelector("#salam")!.innerHTML = "Halo, " + nama;
   console.log("memakai kunci", kunci);
   ```

5. **Diagnosis (jaringan).** Untuk tiap gejala, tulis kelompoknya (galat jaringan atau respons) dan langkah pertama: (a) `ECONNREFUSED`; (b) status 404; (c) status 500; (d) halaman menampilkan "Gagal: TypeError" padahal log API menunjukkan permintaan sampai.
6. **Praktik.** Di folder baru: buat `data.json` karangan enam baris, server dengan rute `/api/rekap` yang menjawab rekap per kategori, dan satu uji `bun test` untuk fungsi rekapnya. Tunjukkan keluaran `curl -s -i` dan `bun test`.

## Refleksi

Tulis jawabanmu di jurnalmu sendiri. Jurnal ini tidak dikumpulkan ke repositori dan tidak ada jawaban benar atau salah; yang dinilai adalah kejujuran dan rencanamu.

1. Soal mana yang kamu jawab tanpa ragu? Apa yang membuatmu yakin?
2. Soal mana yang membuatmu ragu atau keliru, dan konsep apa di baliknya (server, data, prediksi, keamanan, hukum, atau jaringan)?
3. Kapan kamu akan mengulang bagian yang lemah, dan bagaimana caramu mengujinya (menjawab dulu dari ingatan, bukan membaca ulang)?
4. Apa yang ingin kamu buat dengan situs dan template di kelas XII?

Mencoba mengingat lebih dulu, lalu menjarakkan waktu mengulang, membantu ingatan jangka panjang lebih baik daripada membaca ulang catatan.

## Cek mandiri

- [ ] Saya dapat membuat API JSON yang memvalidasi masukan dengan status yang tepat.
- [ ] Saya dapat memeriksa, merekap, dan meramal data, dan menyebut batas ramalan.
- [ ] Saya dapat mencegah XSS dan menjaga rahasia di luar repositori.
- [ ] Saya dapat menyebut pokok UU ITE (beserta perubahannya), KUHP, dan UU PDP dengan sumbernya, tanpa menafsirkannya.
- [ ] Saya dapat mendiagnosis permintaan gagal dengan status, `curl`, dan DevTools.

## Kunci dan petunjuk

**Ingat kembali.** 1: satu jalan dipengaruhi beban komputer dan keadaan sesaat; ulangi dan ambil median agar adil. 2: "tidak tersambung" berarti tidak ada respons sama sekali: cek server hidup, alamat, dan port; 404 berarti server hidup tetapi jalur tidak dikenal: cek ejaan jalur dan rute. 3: XSS menyisipkan skrip lewat teks yang tidak di-escape; cegah dengan meng-escape keluaran dan memakai `textContent`. 4: rata-rata bergerak meratakan beberapa nilai terakhir; garis kecenderungan menarik garis lurus lewat seluruh data; rata-rata bergerak tertinggal pada data yang naik atau turun teratur. 5: sumber data, lisensi atau syarat pemakaian, tanggal pengambilan, cara kerja singkat, hasil, batas ramalan, dan temuan keamanan.

**Latihan bercampur.** Rubrik singkat: tiap soal dinilai dari ketepatan, penelusuran langkah, dan alasan; jawaban benar tanpa langkah mendapat nilai sebagian.

1. Contoh jawaban, dijalankan penyusun (server di port acak, diuji dari dalam program yang sama):

```ts
function angka(teks: string | null): number | null {
  if (teks === null || teks.trim() === "") return null;
  const n = Number(teks);
  return Number.isFinite(n) ? n : null;
}

const server = Bun.serve({
  port: 0,
  hostname: "localhost",
  fetch(req) {
    const url = new URL(req.url);
    if (url.pathname === "/api/hitung") {
      const a = angka(url.searchParams.get("a"));
      const b = angka(url.searchParams.get("b"));
      if (a === null || b === null) {
        return Response.json({ galat: "a dan b harus angka" }, { status: 400 });
      }
      return Response.json({ jumlah: a + b });
    }
    return new Response("tidak ada", { status: 404 });
  },
});

for (const jalur of ["/api/hitung?a=3&b=4", "/api/hitung?a=3&b=x", "/api/hitung?a=3", "/lain"]) {
  const respons = await fetch(`http://localhost:${server.port}${jalur}`);
  console.log(respons.status, await respons.text());
}
await server.stop(true);
```

```text
200 {"jumlah":7}
400 {"galat":"a dan b harus angka"}
400 {"galat":"a dan b harus angka"}
404 tidak ada
```

`?a=3&b=x` mendapat 400. `Number(null)` bernilai 0, jadi parameter yang hilang akan diam-diam dianggap 0 bila tidak diperiksa lebih dulu.

2. Contoh jawaban, dijalankan penyusun (hasil: `a` berjumlah 8 dan satu baris ditolak):

```ts
type Baris = { k: string; n: unknown };

const mentah = '[{"k":"a","n":3},{"k":"b","n":"x"},{"k":"a","n":5}]';

function rekap(data: Baris[]): { jumlah: Map<string, number>; ditolak: number } {
  const jumlah = new Map<string, number>();
  let ditolak = 0;
  for (const b of data) {
    if (typeof b.n !== "number" || !Number.isFinite(b.n)) {
      ditolak++;
      continue;
    }
    jumlah.set(b.k, (jumlah.get(b.k) ?? 0) + b.n);
  }
  return { jumlah, ditolak };
}

const hasil = rekap(JSON.parse(mentah) as Baris[]);
console.log([...hasil.jumlah], hasil.ditolak);
```

```text
[
  [ "a", 8 ]
] 1
```

3. Kemiringan 2,5 dan titik potong 7,3 (`rataX = 3`, `rataY = 14,8`, pembilang 25, penyebut 10); ramalan minggu ke-6: `7,3 + 2,5 × 6 = 22,3`. Rata-rata bergerak lebar 3 memberi `(15 + 17 + 20) / 3 ≈ 17,33`. Data naik teratur, jadi garis lebih masuk akal dan rata-rata bergerak tertinggal. Dijalankan penyusun:

```ts
const y = [10, 12, 15, 17, 20];
const n = y.length;
const rx = (n + 1) / 2;
const ry = y.reduce((a, b) => a + b, 0) / n;
let atas = 0;
let bawah = 0;
y.forEach((v, i) => {
  atas += (i + 1 - rx) * (v - ry);
  bawah += (i + 1 - rx) ** 2;
});
const m = atas / bawah;
const c = ry - m * rx;
console.log(m, c, c + m * 6);
console.log(((15 + 17 + 20) / 3).toFixed(2));
```

```text
2.5 7.300000000000001 22.3
17.33
```

Yang tidak diketahui keduanya: apakah pola naik berhenti atau berubah; ramalan hanya perkiraan bersyarat dari lima titik.

4. Tiga masalah: (a) `kunci` tertulis di kode sumber, padahal rahasia dibaca dari `process.env` dan `.env` masuk `.gitignore`; (b) `innerHTML` dengan teks dari alamat peramban: XSS, pakai `textContent`; (c) `console.log` mencetak rahasia ke log, cukup cetak status "terbaca". Pokok hukum, contoh: KUHP Pasal 332 ayat (1) menyangkut akses tanpa hak ke komputer atau sistem elektronik milik orang lain (jadi uji hanya milik sendiri atau dengan izin tertulis); UU PDP Pasal 20 ayat (2) memuat persetujuan yang sah secara eksplisit sebagai salah satu dasar pemrosesan data pribadi; Pasal 65 melarang memperoleh atau mengumpulkan data pribadi yang bukan miliknya secara melawan hukum. Pasal dikutip dari sumber resmi di `b-xi2-m10`; tafsirnya bukan wewenang murid.

5. (a) Galat jaringan: cek server hidup dan port. (b) Respons: cek ejaan jalur dan rute server. (c) Respons: baca log server, bug ada di sisi server. (d) Galat jaringan di peramban berupa CORS: permintaan sampai tetapi peramban menahan jawabannya; perbaiki di server dengan header `Access-Control-Allow-Origin` untuk asal yang diizinkan.

6. Contoh kerangka: `data.json` enam baris, `rekap.ts` berisi fungsi `rekapKategori` seperti di `b-xi2-m13`, `server.ts` dengan rute `/api/rekap`, dan `rekap.test.ts` dengan uji kasus kosong dan kasus biasa. Keluaran `curl` harus menampilkan status 200 dan JSON rekap; `bun test` menampilkan semua uji lulus.

**Refleksi.** Tidak ada kunci. Rencana yang baik menyebut bagian lemah yang spesifik, jadwal ulang yang berjarak (mis. besok, tiga hari, seminggu), dan cara menguji diri dengan menjawab dari ingatan.

## Langkah berikutnya

Semester berikutnya jalur B (kelas XII) dimulai dengan `b-xii1-m1` (Astro: halaman statis dan komponen). Jadikan hasil refleksimu rencana belajar sebelum minggu pertama. Modul terkait: `b-xi2-m10` untuk mengulang keamanan dan hukum, dan `b-xi2-m11` untuk mengulang diagnosis jaringan. Bacaan lanjut: dokumentasi Bun di `https://bun.sh/docs` dan dokumentasi MDN tentang JavaScript.
