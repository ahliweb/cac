## Untuk siapa modul ini

Modul ini untuk murid kelas XII jalur B (Web dengan JavaScript, TypeScript, dan Bun), minggu `B-XII2-M14` silabus v1.4.1: asesmen yang menilai seluruh jalur. Prasyarat formal: modul `b-xii1-m12`; modul ini menilai seluruh `b-xii2-m1` sampai `b-xii2-m13`.

Modul ini berstatus DRAF: karangan penyusun, belum ditinjau pemilik, dan tidak dihitung sebagai pemenuhan butir capaian pembelajaran. Asesmen ini **tanpa AI**: jangan memakai AI generatif saat mengerjakannya (silabus 7.4), karena tujuannya melihat apa yang bisa kamu selesaikan sendiri. Bobot nilai dan predikat mengikuti kebijakan sekolah `[belum terverifikasi]`; modul ini hanya memberi soal dan kunci latihan.

Bagian praktik dikerjakan di komputer dengan Bun (1.4.4 dipakai penyusun per 2026-11) dan Git, di `localhost`, tanpa akun dan tanpa layanan luar. Data dan nama di soal karangan; konteksnya proyek kustomisasi profil `landing` dari `awcms-one` (`main`, 2026-11-20).

## Ingat kembali

Ini inti asesmen: jawab dari ingatan, tanpa catatan, lalu cocokkan dengan kunci. Soal 1 dari `b-xii2-m13`, soal 2 dari `b-xii2-m11`, soal 3 dari `b-xii2-m6`, soal 4 dari `b-xii2-m9`, soal 5 dari `b-xii2-m10`.

1. Mengapa arsip portofolio dibuat dari commit bertag dengan `git archive`, bukan dengan menyalin folder?
2. Bagaimana kamu menanggapi komentar ulasan yang tidak kamu setujui?
3. Apa beda temuan, penyebab, dan perbaikan pada laporan uji?
4. Mengapa menghapus berkas rahasia dari commit terbaru tidak cukup, dan apa urutan langkah yang benar?
5. Mengapa pasal dikutip hanya dari naskah resmi yang dibuka, dan mengapa catatanmu bukan nasihat hukum?

## Tujuan

Soal di modul ini menilai apakah kamu dapat:

- menulis penanganan formulir yang menolak masukan tidak sah, meng-escape keluaran, dan tidak menyimpan data;
- menelusuri pemindai rahasia dan mengulas kode dari sisi keamanan dan privasi;
- mengenali pokok hukum yang relevan dengan sumbernya tanpa menafsirkannya;
- memperbaiki dokumen yang perintahnya salah, serta mendemonstrasikan proyek dan mengarsipkannya (rubrik proyek).

## Latihan bercampur

Kerjakan sendiri, `AI: tanpa AI`, dalam waktu yang ditetapkan gurumu.

1. **Tulis.** Tulis fungsi `siapkanPesan(pesan: unknown)` untuk formulir kontak latihan: status 400 bila bukan teks atau kosong, 400 bila lebih dari 200 karakter, dan 200 dengan teks konfirmasi yang meng-escape tanda kurung sudut. Sebut satu hal yang sengaja tidak dilakukan fungsi itu.
2. **Telusuri.** Fungsi `adaRahasia(baris)` memakai pola nama berisi `KUNCI`, `TOKEN`, `SANDI`, dan sejenisnya diikuti `=` atau `:` serta nilai, tetapi mengabaikan nilai `isi-sendiri`. Tebak hasil untuk empat baris: `const KUNCI = "KUNCI_PALSU_CONTOH_1";`, `// KUNCI dibaca dari lingkungan`, `KUNCI_ANALITIK=isi-sendiri`, dan `SANDI_ADMIN: KUNCI_PALSU_CONTOH_2`.
3. **Ulas.** Temukan sedikitnya tiga masalah keamanan atau privasi pada kode berikut dan tulis perbaikannya.

   ```ts
   const kunci = "KUNCI_PALSU_CONTOH_1";
   const alamat = new URL(location.href);
   const telepon = alamat.searchParams.get("telepon") ?? "";
   localStorage.setItem("telepon", telepon);
   document.querySelector("#sapa")!.innerHTML = "Halo, " + (alamat.searchParams.get("nama") ?? "tamu");
   console.log("memakai kunci", kunci);
   ```

4. **Hukum dan privasi.** Untuk tiap kasus karangan, sebut pokok pada UU ITE, KUHP (UU 1/2023), atau UU PDP yang menyentuhnya, atau "tidak ada": (a) seorang murid memindai server sekolah tanpa izin; (b) sebuah situs meminta nama dan nomor telepon tanpa menjelaskan tujuannya; (c) kamu menguji situsmu sendiri di `localhost`.
5. **Dokumen.** Perbaiki panduan berikut dan tambahkan yang kurang.

   ```text
   # Mengubah warna
   1. Jalankan `bun run lint` dan `bun run check`.
   2. Isi TOKEN_ADMIN=TOKEN_PALSU_CONTOH_9 di berkas pengaturan.
   ```

6. **Praktik.** Dalam waktu yang ditetapkan: demonstrasikan proyekmu lima menit dengan cadangan, tunjukkan laporan keamanan dan catatan kepatuhanmu, lalu buat arsip dari commit bertag dan tunjukkan isinya. Dinilai dengan rubrik proyek.

## Refleksi

Tulis jawabanmu di jurnalmu sendiri. Jurnal ini tidak dikumpulkan ke repositori dan tidak ada jawaban benar atau salah; yang dinilai adalah kejujuran dan rencanamu.

1. Soal mana yang kamu jawab tanpa ragu, dan apa yang membuatmu yakin?
2. Soal mana yang membuatmu ragu atau keliru, dan konsep apa di baliknya (formulir dan masukan, rahasia, privasi dan hukum, dokumen, atau demo)?
3. Apa yang akan kamu ulang, kapan, dan bagaimana caramu mengujinya tanpa membaca ulang catatan?
4. Apa yang ingin kamu pelajari atau buat setelah jalur ini?

Mencoba mengingat lebih dulu, lalu menjarakkan waktu mengulang, membantu ingatan jangka panjang lebih baik daripada membaca ulang catatan.

## Cek mandiri

- [ ] Saya dapat menulis penanganan formulir yang aman dan tidak menyimpan data.
- [ ] Saya dapat menelusuri pemindai rahasia dan mengulas kode dari sisi keamanan dan privasi.
- [ ] Saya dapat menyebut pokok hukum dengan sumbernya tanpa menafsirkannya.
- [ ] Saya dapat memperbaiki panduan yang perintahnya salah.
- [ ] Saya dapat mendemonstrasikan dan mengarsipkan proyek tanpa rahasia.

## Kunci dan petunjuk

**Ingat kembali.** 1: `git archive` memuat hanya berkas yang dilacak di commit itu, jadi `.env` dan sampah kerja tidak ikut, dan tag menandai versi yang dapat diulang. 2: tanyakan alasan, tunjukkan bukti, dan bila tetap berbeda putuskan bersama guru; jangan mengabaikannya. 3: temuan adalah apa yang terjadi; penyebab adalah dugaan mengapa; perbaikan adalah perubahan yang diuji ulang. 4: commit baru tidak menghapus commit lama; cabut dan ganti rahasia di penyedia, hentikan pelacakan, baru bereskan repositori. 5: pasal berubah atau dicabut, naskah resmi adalah sumbernya, dan tafsir adalah wewenang ahli hukum dan pengadilan.

**Latihan bercampur.** Rubrik singkat: tiap soal dinilai dari ketepatan, penelusuran langkah, dan alasan; jawaban benar tanpa langkah mendapat nilai sebagian.

1. Contoh jawaban, dijalankan penyusun. Yang sengaja tidak dilakukan: menyimpan atau mengirim pesan.

```ts
function escapeHtml(teks: string): string {
  return teks
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function siapkanPesan(pesan: unknown): { status: number; badan: string } {
  if (typeof pesan !== "string" || pesan.trim() === "") return { status: 400, badan: "pesan kosong" };
  if (pesan.length > 200) return { status: 400, badan: "pesan terlalu panjang" };
  return { status: 200, badan: `Terima kasih. Pesanmu: ${escapeHtml(pesan.trim())}` };
}

for (const masukan of ["Buka jam berapa?", "<b>halo</b>", "", 42]) {
  const hasil = siapkanPesan(masukan);
  console.log(hasil.status, hasil.badan);
}
```

```text
200 Terima kasih. Pesanmu: Buka jam berapa?
200 Terima kasih. Pesanmu: &lt;b&gt;halo&lt;/b&gt;
400 pesan kosong
400 pesan kosong
```

2. Hasilnya `[true, false, false, true]`, dijalankan penyusun:

```ts
const PENANDA = /\b[A-Z0-9_]*(?:KUNCI|KEY|TOKEN|SECRET|SANDI|PASSWORD)[A-Z0-9_]*\s*[=:]\s*["']?([^\s"']+)/i;

function adaRahasia(baris: string): boolean {
  const cocok = PENANDA.exec(baris);
  return cocok !== null && !/^isi-sendiri/.test(cocok[1] ?? "");
}

const baris = [
  'const KUNCI = "KUNCI_PALSU_CONTOH_1";',
  "// KUNCI dibaca dari lingkungan",
  "KUNCI_ANALITIK=isi-sendiri",
  "SANDI_ADMIN: KUNCI_PALSU_CONTOH_2",
];
console.log(baris.map(adaRahasia));
```

```text
[ true, false, false, true ]
```

Baris 2 tidak punya `=` atau `:` sesudah nama, dan baris 3 bernilai penunjuk `isi-sendiri`.

3. Masalah: (a) `kunci` tertulis di kode (baca dari `process.env`, `.env` di `.gitignore`); (b) `innerHTML` dengan teks dari alamat: XSS (pakai `textContent`); (c) `localStorage` menyimpan nomor telepon tanpa tujuan dan pemberitahuan (jangan simpan, atau minta persetujuan dan jelaskan tujuan, UU PDP Pasal 20 sampai 21); (d) `console.log` mencetak rahasia (cetak status "terbaca" saja).

4. (a) KUHP Pasal 332 ayat (1): akses tanpa hak ke sistem elektronik milik orang lain. (b) UU PDP Pasal 21 ayat (1) memuat informasi (termasuk tujuan) yang disampaikan bila pemrosesan berdasarkan persetujuan, dan Pasal 20 ayat (2) huruf a tentang persetujuan yang sah secara eksplisit; UU ITE Pasal 26 ayat (1) naskah asli 2008 juga menyebut persetujuan, dan bunyinya setelah perubahan tidak dibuka penyusun `[belum terverifikasi]`. (c) Tidak ada: sistemnya milikmu. Ini latihan mengenali pokok, bukan putusan hukum.

5. Dijalankan penyusun dengan pemeriksa panduan di `b-xii2-m8`: baris 1 memuat skrip `lint` yang tidak ada di `package.json` akar dan dua perintah dalam satu langkah, baris 2 memuat nilai rahasia, dan tidak ada bagian "Jika gagal". Perbaikan: hapus langkah `lint` atau ganti dengan skrip yang ada, pecah menjadi dua langkah, ganti langkah 2 dengan "salin `.env.example` menjadi `.env` dan isi nilainya sendiri" tanpa nilai, dan tambahkan "Jika gagal".

```text
baris 2: skrip "lint" tidak ada
baris 2: satu langkah memuat 2 perintah
baris 3: kemungkinan nilai rahasia
tidak ada bagian "Jika gagal"
4 temuan
```

(Nomor baris pemeriksa menghitung judul sebagai baris 1.)

6. Rubrik proyek, contoh:

| Kriteria | Baik bila |
| --- | --- |
| Demo | Berangkat dari tujuan pengguna, sesuai waktu, ada cadangan, layar bersih |
| Keamanan dan privasi | Laporan keamanan dan catatan kepatuhan ada, bukti dapat dijalankan, tidak ada klaim hukum tanpa sumber |
| Dokumen | Panduan dapat diikuti, perintah ada, cermin segar |
| Arsip | Dari commit bertag, tanpa `.env` dan rahasia, ada bukti dan refleksi proyek |
| Proses | Rencana tiap sprint, ulasan ditanggapi, kerja dibagi adil |

**Refleksi.** Tidak ada kunci. Rencana yang baik menyebut bagian lemah yang spesifik, jadwal ulang yang berjarak (mis. besok, tiga hari, seminggu), dan cara menguji diri dengan menjawab dari ingatan.

## Langkah berikutnya

Jalur B berakhir di modul ini. Jadikan hasil refleksimu rencana belajar berikutnya. Modul terkait: `b-xii2-m9` dan `b-xii2-m10` untuk mengulang keamanan dan hukum, dan `b-xii2-m13` untuk mengulang pengarsipan. Bacaan lanjut: dokumentasi Bun di `https://bun.sh/docs` dan dokumentasi Git di `https://git-scm.com/docs`.
