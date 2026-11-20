## Untuk siapa modul ini

Modul ini untuk murid kelas XII jalur B (Web dengan JavaScript, TypeScript, dan Bun), minggu `B-XII1-M14` silabus v1.4.1: asesmen dan refleksi semester 1 kelas XII. Prasyarat: modul `b-xii1-m12`; modul ini menilai seluruh materi semester, terutama `b-xii1-m8` sampai `b-xii1-m13`, dan pemahamanmu tentang template.

Modul ini berstatus DRAF: karangan penyusun, belum ditinjau pemilik, dan tidak dihitung sebagai pemenuhan butir capaian pembelajaran. Asesmen ini **tanpa AI**: jangan memakai AI generatif saat mengerjakannya (silabus 7.4), karena tujuannya melihat apa yang bisa kamu selesaikan sendiri. Bobot nilai dan predikat mengikuti kebijakan sekolah `[belum terverifikasi]`; modul ini hanya memberi soal dan kunci latihan.

Praktik dikerjakan dengan Bun (1.4.4 dipakai penyusun per 2026-11) dan Git, tanpa akun. Semua data, nama, dan "rahasia" di soal karangan dan palsu (`KUNCI_PALSU_CONTOH`).

## Ingat kembali

Ini inti asesmen: jawab dari ingatan, tanpa melihat catatan, lalu cocokkan dengan kunci. Soal 1 dari `b-xii1-m8`, soal 2 dari `b-xii1-m11`, soal 3 dari `b-xii1-m6`, soal 4 dari `b-xii1-m9`, soal 5 dari `b-xii1-m13`.

1. Mengapa `Disallow` di `robots.txt` bukan cara menyembunyikan halaman dari hasil pencarian, dan apa gantinya?
2. Satu kalimat apa yang diwajibkan lisensi MIT, dan mengapa `LICENSE` tidak dihapus dari repositori turunan?
3. Mengapa isi situs latihan memakai nama, alamat, dan surel fiktif berdomain contoh seperti `example.org`?
4. Apa yang dibuktikan dan tidak dibuktikan oleh gerbang yang hijau?
5. Sebutkan empat hal yang membuat sebuah tugas dalam rencana dapat diperiksa orang lain.

## Tujuan

Soal di modul ini menilai apakah kamu dapat:

- menjelaskan alur dari template sampai situs bermerek dan pembagian tugas antara murid dan guru;
- memeriksa judul, deskripsi, dan kontras, dan menulis pemeriksa sederhana untuknya;
- mengenali rahasia pada diff dan permintaan ke asisten AI, dan menanganinya;
- membaca keluaran gerbang, meninjau dokumen, dan merencanakan tugas yang dapat diperiksa.

## Latihan bercampur

Kerjakan sendiri, `AI: tanpa AI`, dalam waktu yang ditetapkan gurumu.

1. **Template.** Jelaskan dalam lima sampai delapan kalimat jalan dari "Use this template" sampai situs `landing` bermerek: langkah utamanya, apa yang dijalankan gurumu (lingkungan Docker, PostgreSQL, dan CMS), apa yang boleh kamu ubah, dan satu hal yang tidak boleh kamu sentuh beserta alasannya.
2. **Tulis (SEO).** Tulis fungsi `cariJudulKembar(halaman)` untuk daftar `{ jalur, judul }` yang mengembalikan judul yang dipakai lebih dari satu halaman. Sebutkan hasilnya untuk empat halaman dengan judul `Warung Kopi Contoh`, `Layanan`, `Layanan`, dan `Tentang kami`.
3. **Telusuri (rahasia).** Pemindai menandai baris tambahan (`+`) berpola `NAMA = "nilai"` dengan NAMA memuat `KUNCI`, `KEY`, `TOKEN`, `SECRET`, `SANDI`, atau `PASSWORD`. Untuk diff berikut, baris mana yang ditandai, dan apa yang tetap harus dilakukan atas baris `-`?

   ```text
   -TOKEN_LAMA = "KUNCI_PALSU_CONTOH_1"
   +TOKEN_BARU = "KUNCI_PALSU_CONTOH_2"
   +const judul = "Kontak"
   +# tidak ada token di sini
   ```

4. **Prediksi (kontras).** Tiga pasangan warna teks dan latar memberi rasio 2,1; 4,5; dan 7,0. Dengan batas 4,5:1 untuk teks biasa, mana yang lolos, dan apa yang kamu ubah pada yang gagal?
5. **Ulas (dokumen dan lisensi).** README berisi: "Proyek ini berlisensi MIT. Baca `docs/ada.md` dan `docs/hilang.md`. Jalankan `bun run situs`." Berkas yang ada: `README.md`, `docs/ada.md`, `package.json` (skrip: `periksa-tipe`, `uji`, `bangun`). Temukan tiga masalah dan tulis satu komentar ulasan (temuan, alasan, saran).
6. **Diagnosis (gerbang).** `bun run gerbang` menjalankan `periksa-tipe`, `uji`, `bangun`, `uji-bangun`. Keluarannya berakhir dengan `error: script "uji-bangun" exited with code 1` dan uji "tidak ada dua halaman berdeskripsi sama" gagal. Langkah mana yang berjalan, apa penyebabnya, dan apa yang diperbaiki?
7. **Praktik.** Di folder baru: `git init`, buat `.env` berisi `KUNCI_PALSU_CONTOH=KUNCI_PALSU_CONTOH_1`, `.gitignore`, dan `.env.example` berisi penunjuk. Tunjukkan `git status --short` dan `git ls-files`, lalu tulis dua tugas rencana kerja yang masing-masing punya pemilik, perkiraan jam, dan kriteria selesai.

## Refleksi

Tulis jawabanmu di jurnalmu sendiri. Jurnal ini tidak dikumpulkan ke repositori dan tidak ada jawaban benar atau salah; yang dinilai adalah kejujuran dan rencanamu.

1. Soal mana yang kamu jawab tanpa ragu? Apa yang membuatmu yakin?
2. Soal mana yang membuatmu ragu atau keliru, dan konsep apa di baliknya (template, SEO, gerbang, rahasia, dokumen dan lisensi, ulasan, atau perencanaan)?
3. Kapan kamu akan mengulang bagian yang lemah, dan bagaimana caramu mengujinya (menjawab dulu dari ingatan, bukan membaca ulang)?
4. Apa yang ingin kamu ubah pada situs di semester 2, dan risiko apa yang kamu waspadai?

Mencoba mengingat lebih dulu, lalu menjarakkan waktu mengulang, membantu ingatan jangka panjang lebih baik daripada membaca ulang catatan.

## Cek mandiri

- [ ] Saya dapat menjelaskan alur template sampai situs bermerek dan pembagian tugasnya.
- [ ] Saya dapat memeriksa judul, deskripsi, dan kontras halaman.
- [ ] Saya dapat mengenali rahasia pada diff dan permintaan ke asisten AI.
- [ ] Saya dapat membaca keluaran gerbang dan menemukan penyebab kegagalan.
- [ ] Saya dapat meninjau dokumen dan lisensi serta menulis rencana tugas yang dapat diperiksa.

## Kunci dan petunjuk

**Ingat kembali.** 1: perayap hanya diminta tidak menjelajahi; URL yang ditautkan dari tempat lain masih bisa diindeks tanpa deskripsi; gantinya `noindex` atau kata sandi. 2: "The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software"; tanpa `LICENSE` pemberitahuan itu hilang dari salinan. 3: agar tidak ada data nyata atau orang yang dapat dikenali di repositori, dan domain seperti `example.org` dicadangkan untuk contoh (RFC 2606) sehingga tidak menuju pihak nyata; uji repositori pun hanya menerima domain contoh itu. 4: dibuktikan bahwa semua pemeriksaan yang ditulis lolos; tidak dibuktikan bahwa situs benar untuk semua masukan atau bahwa pemeriksaannya sudah cukup. 5: pemilik, perkiraan jam kecil (paling lama 4), kriteria selesai yang terukur, dan urutan atau ketergantungannya.

**Latihan bercampur.** Rubrik singkat: tiap soal dinilai dari ketepatan, penelusuran langkah, dan alasan; jawaban benar tanpa langkah mendapat nilai sebagian.

1. Menurut `docs/template.md` di `awcms-one` (dibaca 2026-11-20): gunakan "Use this template" (repositori baru, bukan fork), `bun install`, `bun run template:init` untuk menulis ulang merek (nama, domain, warna, kontak, profil), salin `.env`, lalu database lokal, migrasi, benih profil, dan `bun run dev`. Gurumu menyiapkan dan menjalankan Docker, PostgreSQL, dan CMS; kamu mengubah merek, konten, tema, SEO, dan dokumentasi. Yang tidak boleh disentuh: `apps/cms` dan backend, karena turunan memiliki backend sendiri dan tidak memakai backend produksi `awcms-one` (ADR-0024).
2. Contoh jawaban, dijalankan penyusun:

```ts
function cariJudulKembar(halaman: { jalur: string; judul: string }[]): string[] {
  const jumlah = new Map<string, number>();
  for (const h of halaman) jumlah.set(h.judul, (jumlah.get(h.judul) ?? 0) + 1);
  return [...jumlah].filter(([, n]) => n > 1).map(([judul]) => judul);
}

console.log(
  cariJudulKembar([
    { jalur: "/", judul: "Warung Kopi Contoh" },
    { jalur: "/layanan", judul: "Layanan" },
    { jalur: "/kontak", judul: "Layanan" },
    { jalur: "/tentang", judul: "Tentang kami" },
  ]),
);
```

```text
[ "Layanan" ]
```

3. Hanya baris `+TOKEN_BARU = ...` yang ditandai; baris konstanta `judul` tidak berisi kata kunci, dan komentar tidak berpasangan nama dan nilai. Baris `-` bukan tambahan, tetapi nilai lamanya pernah ter-commit dan ada di riwayat: cabut dan ganti di penyedianya, lalu bereskan repositori.
4. Yang lolos hanya 4,5 dan 7,0 (batas 4,5:1 berlaku "minimal", jadi 4,5 lolos); yang 2,1 gagal. Ubah warna teks atau latar sampai rasionya minimal 4,5:1, lalu ukur ulang.
5. Tiga masalah: `docs/hilang.md` tidak ada; skrip `situs` tidak ada di `package.json`; "berlisensi MIT" tanpa berkas `LICENSE` dan pemberitahuan hak cipta. Contoh komentar: "Temuan: README menyebut `docs/hilang.md` yang tidak ada. Alasan: pembaca dan gerbang dokumen menemui jalan buntu. Saran: buat berkasnya atau hapus rujukannya."
6. `periksa-tipe`, `uji`, dan `bangun` berjalan; `uji-bangun` gagal sehingga rangkaian berhenti dengan kode keluar bukan 0. Penyebab: dua halaman memakai deskripsi yang sama (halaman tanpa deskripsi sendiri jatuh ke deskripsi cadangan). Perbaiki sumbernya: beri tiap halaman deskripsi sendiri; bukan mengubah ujinya.
7. Contoh: `git status --short` memuat `?? .env.example` dan `?? .gitignore`, tetapi tidak `.env`; `git ls-files` setelah commit memuat `.env.example` dan `.gitignore`, tidak `.env`. Tugas contoh: "Tulis judul dan deskripsi tiap halaman, Ani, 2 jam, selesai bila audit SEO bersih" dan "Perbarui README dan cermin, Cici, 2 jam, selesai bila `audit:translation` dan `audit:dokumen` lolos".

**Refleksi.** Tidak ada kunci. Rencana yang baik menyebut bagian lemah yang spesifik, jadwal ulang yang berjarak (mis. besok, tiga hari, seminggu), dan cara menguji diri dengan menjawab dari ingatan.

## Langkah berikutnya

Semester berikutnya jalur B dimulai dengan `b-xii2-m1` (kebutuhan pengguna). Jadikan hasil refleksimu rencana belajar sebelum minggu pertama. Modul terkait: `b-xii1-m10` untuk mengulang rahasia dan `b-xii1-m11` untuk mengulang dokumen dan lisensi. Bacaan lanjut: dokumentasi `awcms-one` (`docs/template.md`) dan dokumentasi Bun di `https://bun.sh/docs`.
