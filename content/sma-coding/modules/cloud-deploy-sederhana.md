## Untuk siapa modul ini

Modul ini untuk siswa kelas XII **jalur B** yang sudah membaca `cloud-biaya-dan-tagihan` dan `cloud-keamanan-dan-privasi`, serta sudah membuat server sederhana dengan `Bun.serve` (`B-XI2-M1`) dan mengenal penyajian statis (`B-XI2-M12`). Ia pengayaan di luar jam wajib.

Modul ini **hanya simulasi dan demonstrasi**. Tidak ada langkah penerbitan sungguhan ke akun siswa; tidak ada akun, kartu pembayaran, atau kunci yang dibutuhkan. Bagian "Jika sekolah tidak mengizinkan akun" selalu bisa dikerjakan.

Setelah mempelajari modul ini, kamu diharapkan bisa menjelaskan alur dari kode di komputer sendiri sampai berjalan di lingkungan lain, membedakan lokal dan produksi, memakai variabel lingkungan tanpa menaruh rahasia di kode, dan membaca demonstrasi guru dengan kritis.

Seri cloud berada di luar rumusan Capaian Pembelajaran. Butir F-AP-d, F-BK-a, dan F-AP-c hanya disentuh sebagai konteks (modul ini tidak membahas library, struktur data, atau kualitas kode) dan tidak dihitung terpenuhi oleh modul ini.

## Ingat kembali

Tutup catatanmu dan tulis jawaban singkat sebelum membaca lanjut.

1. Apa yang dilakukan `Bun.serve` pada program server sederhana? (`B-XI2-M1`)
2. Mengapa rahasia tidak boleh di-commit ke repositori?
3. Sebutkan dua jebakan tagihan cloud.
4. Apa bagian pengguna dalam model tanggung jawab bersama?

Cocokkan: (1) menjalankan server yang menjawab permintaan HTTP lewat fungsi `fetch`; (2) riwayat repositori bisa dibaca orang lain dan kunci yang terbaca harus dianggap bocor; (3) misalnya sumber daya terlupa dan kunci bocor; (4) data dan akun. Bila ada yang meleset, baca ulang `cloud-biaya-dan-tagihan` dan `cloud-tanggung-jawab-bersama`.

> **Peringatan biaya.** Layanan nyata dapat menimbulkan tagihan. Siswa tidak wajib membuat akun. Bila guru melakukan demonstrasi di akun sekolah, anggaran dan peringatan dipasang sebelum kelas, kunci tidak ditampilkan di layar, tidak ada data siswa, dan sumber daya dihapus setelah demonstrasi. Mencoba sendiri hanyalah anjuran sukarela di bawah keputusan orang tua atau wali, tidak dinilai.

## Alur dari lokal ke lingkungan lain

1. **Kode**: program di repositori Git.
2. **Build**: mengubah kode menjadi bentuk yang siap dijalankan (misalnya mengompilasi atau membundel).
3. **Konfigurasi**: pengaturan yang berbeda per lingkungan (alamat basis data, mode, kunci), disimpan di luar kode.
4. **Rilis**: menaruh hasil build di lingkungan tujuan dan menjalankannya.
5. **Pantau**: membaca log dan memeriksa bahwa layanan sehat.

Lingkungan **lokal** adalah komputermu: aman, murah, boleh salah. Lingkungan **produksi** dipakai pengguna sungguhan: kesalahan berdampak pada orang lain dan kadang pada tagihan.

## Rahasia dan variabel lingkungan

Aturan: **rahasia tidak pernah di-commit.** Kunci, token, dan kata sandi disimpan dalam variabel lingkungan atau berkas yang masuk daftar abaikan (`.gitignore`). Repositori hanya menyimpan contoh dengan nilai palsu yang jelas, misalnya berkas `.env.contoh`.

Contoh isi berkas contoh (nilai palsu):

```text
PESAN_SAMBUTAN=Halo dari lingkungan contoh
KUNCI_RAHASIA=<KUNCI-RAHASIA-CONTOH>
```

Berkas `.env` asli yang berisi nilai sungguhan tidak ikut repositori. Bun membaca berkas `.env` di direktori kerja secara otomatis (diuji di bawah), jadi `.env` yang berisi rahasia harus masuk `.gitignore`.

## Praktik server lokal (wajib)

Praktik ini hanya memakai komputer lab dan Bun yang sudah terpasang di lab. Tidak ada akses internet yang dibutuhkan selain untuk menyiapkan lab oleh guru.

Buat berkas `server.ts` berikut (tanpa rahasia asli):

```ts
const pesan = process.env.PESAN_SAMBUTAN ?? "pesan bawaan";

Bun.serve({
  port: 3000,
  fetch() {
    return new Response(pesan);
  },
});
console.log("Server lokal berjalan di port 3000");
```

## Prediksi dulu

Baca kode `server.ts` di atas dan tulis prediksimu sebelum menjalankannya: (1) apa yang tampil di peramban bila variabel `PESAN_SAMBUTAN` tidak diatur? (2) bila diatur "Halo dari lingkungan contoh"? (3) apa yang terjadi bila kamu membuat berkas `.env` berisi `PESAN_SAMBUTAN=Halo dari berkas` di folder yang sama? Simpan prediksimu; setelah menjalankan, tandai yang meleset dan tulis mengapa.

## Menjalankan dan membandingkan

Jalankan di terminal, tanpa dan dengan variabel lingkungan:

```sh
bun run server.ts
PESAN_SAMBUTAN="Halo dari lingkungan contoh" bun run server.ts
```

Buka `http://localhost:3000` di peramban dan bandingkan hasilnya. Hentikan server dengan Ctrl+C. Perhatikan bahwa kode yang sama berperilaku berbeda karena konfigurasinya berbeda; itulah inti pemisahan kode dan konfigurasi.

Hasil uji penyusun pada 2026-11-19 (Bun 1.4.4, Linux): tanpa variabel, peramban menampilkan `pesan bawaan`; dengan `PESAN_SAMBUTAN="Halo dari lingkungan contoh"`, menampilkan `Halo dari lingkungan contoh`; dengan berkas `.env` berisi `PESAN_SAMBUTAN=Halo dari berkas env` dan tanpa variabel di perintah, menampilkan `Halo dari berkas env`. Catatan: bentuk `NAMA=nilai perintah` hanya untuk shell Linux dan macOS; di PowerShell tulis `$env:PESAN_SAMBUTAN="Halo dari lingkungan contoh"; bun run server.ts` (sintaks PowerShell tidak diuji penyusun). Bila muncul kesalahan bahwa port 3000 sudah dipakai, hentikan server lama atau ganti angka port di kode. Versi Bun di lab dapat berbeda; guru memeriksanya sebelum kelas.

## Hubungan dengan template `awcms-one`

Pada jalur B kamu menjelajahi template `awcms-one` (`B-XII1-M3` sampai `B-XII1-M5`). Repositori turunan memiliki backend, basis data, rahasia, dan domain sendiri; ia **tidak** memakai backend produksi `awcms-one`. Di modul ini, template hanya bahan untuk membicarakan alur: apa yang di kode, apa yang di konfigurasi, apa yang rahasia.

## Demonstrasi guru (opsional)

Bila sekolah memiliki akun cloud dan guru berkenan, guru dapat mendemonstrasikan di layar penerbitan sebuah halaman contoh. Siswa tidak membuat akun, mengisi lembar pengamatan, dan bertanya. Syarat: anggaran dan peringatan terpasang, kunci tidak tampil, tidak ada data siswa, sumber daya dihapus sesudahnya. Detail tombol dan nama layanan berbeda antarpenyedia dan diperiksa guru pada hari itu.

## Jika sekolah tidak mengizinkan akun

Kerjakan hanya praktik server lokal dan latihan di bawah. Tidak ada yang hilang dari tujuan modul ini.

## Latihan

**Latihan 1: urutkan alur.** Susun kartu acak: rilis, kode, pantau, konfigurasi, build, menjadi urutan yang benar.

Petunjuk jawaban: kode, build, konfigurasi, rilis, pantau.

**Latihan 2: lokal atau produksi.** Tulis tiga perbedaan lingkungan lokal dan produksi (misalnya pengguna, data, biaya, risiko).

Petunjuk jawaban: lokal hanya untuk kamu, data karangan, tanpa biaya layanan, aman untuk salah; produksi dipakai orang sungguhan, data bernilai, mungkin berbiaya, kesalahan berdampak.

**Latihan 3: periksa berkas.** Guru menyiapkan potongan repositori fiktif. Temukan satu "rahasia" palsu yang tidak sengaja ditaruh di kode (misalnya `<KUNCI-RAHASIA-CONTOH>` di berkas sumber) dan pindahkan ke variabel lingkungan.

Petunjuk jawaban: ganti nilainya dengan `process.env.NAMA_VARIABEL`, tambahkan contoh ke `.env.contoh` dengan nilai palsu, dan pastikan `.env` ada di `.gitignore`. Bila rahasia itu pernah ter-commit (walau palsu dalam latihan ini, bayangkan nyata), memindahkannya saja tidak cukup: anggap sudah bocor, putar atau cabut, dan jangan menempelkannya ke asisten AI.

**Latihan 4: server lokal.** Jalankan praktik server lokal dengan dua nilai `PESAN_SAMBUTAN` berbeda dan catat apa yang berubah tanpa mengubah kode.

Petunjuk jawaban: hanya teks respons yang berubah; kode tetap sama.

**Latihan 5: lembar pengamatan demonstrasi.** Bila ada demonstrasi guru, isi lembar: apa yang dikonfigurasi, di mana rahasia disimpan, bagaimana anggaran dijaga, apa yang dihapus setelahnya. Bila tidak ada, tulis rencana demonstrasi karangan dengan empat poin yang sama.

Petunjuk jawaban: jawaban baik menyebut rahasia di luar kode, anggaran dan peringatan terpasang, serta penghapusan sumber daya setelah selesai. Bila ada butir yang kamu lewati, tulis satu kalimat mengapa butir itu penting.

## Latihan bercampur

Kasus fiktif: Tim Contoh membuat server kecil seperti `server.ts`. Mereka menaruh `KUNCI_RAHASIA` asli di kode, meng-commit-nya ke repositori publik, lalu menjalankan demonstrasi di akun sekolah tanpa anggaran. Seorang anggota menempelkan potongan kode itu ke asisten AI untuk "diperbaiki".

1. Tulis semua kelalaian dan kelompokkan: kode lawan konfigurasi, rahasia, biaya, privasi AI.
2. Urutkan lima langkah perbaikan.
3. Mana yang aman dilakukan di lingkungan lokal, mana yang harus ditunda sampai ada izin?

Petunjuk jawaban: kelalaian: rahasia di kode dan di repositori publik, tanpa `.env` dan `.gitignore`, tanpa anggaran dan peringatan, rahasia dipaparkan ke layanan AI. Urutan wajar: cabut dan putar kunci; pindahkan ke variabel lingkungan dan `.gitignore`; pasang anggaran dan peringatan; hapus sumber daya asing atau yang tidak perlu; catat kejadian dan aturan baru tim. Latihan di komputer sendiri aman; demonstrasi di akun sekolah menunggu izin dan anggaran. Urutan lain boleh bila kunci dicabut lebih dulu.

## Ulang berjarak

Satu minggu lagi, lalu sebulan lagi, jawab tanpa membuka modul ini lalu cocokkan.

1. Urutkan lima tahap dari kode sampai pantau.
2. Beri tiga perbedaan lokal dan produksi.
3. Mengapa kode yang sama bisa berperilaku berbeda, dan bagaimana rahasia dijaga?
