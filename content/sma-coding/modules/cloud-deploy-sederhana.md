## Untuk siapa modul ini

Modul ini untuk siswa kelas XII **jalur B** yang sudah membaca `cloud-biaya-dan-tagihan` dan `cloud-keamanan-dan-privasi`, serta sudah membuat server sederhana dengan `Bun.serve` (`B-XI2-M1`) dan mengenal penyajian statis (`B-XI2-M12`). Ia pengayaan di luar jam wajib.

Modul ini **hanya simulasi dan demonstrasi**. Tidak ada langkah penerbitan sungguhan ke akun siswa; tidak ada akun, kartu pembayaran, atau kunci yang dibutuhkan. Bagian "Jika sekolah tidak mengizinkan akun" selalu bisa dikerjakan.

Setelah mempelajari modul ini, kamu diharapkan bisa menjelaskan alur dari kode di komputer sendiri sampai berjalan di lingkungan lain, membedakan lokal dan produksi, memakai variabel lingkungan tanpa menaruh rahasia di kode, dan membaca demonstrasi guru dengan kritis.

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

Berkas `.env` asli yang berisi nilai sungguhan tidak ikut repositori.

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

Jalankan di terminal, tanpa dan dengan variabel lingkungan:

```sh
bun run server.ts
PESAN_SAMBUTAN="Halo dari lingkungan contoh" bun run server.ts
```

Buka `http://localhost:3000` di peramban dan bandingkan hasilnya. Hentikan server dengan Ctrl+C. Perhatikan bahwa kode yang sama berperilaku berbeda karena konfigurasinya berbeda; itulah inti pemisahan kode dan konfigurasi.

Perintah ini hanya contoh; periksa versi Bun dan perilakunya di lab sebelum mengajarkannya, karena tidak dijalankan saat modul ini ditulis.

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

Petunjuk jawaban: ganti nilainya dengan `process.env.NAMA_VARIABEL`, tambahkan contoh ke `.env.contoh` dengan nilai palsu, dan pastikan `.env` ada di `.gitignore`.

**Latihan 4: server lokal.** Jalankan praktik server lokal dengan dua nilai `PESAN_SAMBUTAN` berbeda dan catat apa yang berubah tanpa mengubah kode.

Petunjuk jawaban: hanya teks respons yang berubah; kode tetap sama.

**Latihan 5: lembar pengamatan demonstrasi.** Bila ada demonstrasi guru, isi lembar: apa yang dikonfigurasi, di mana rahasia disimpan, bagaimana anggaran dijaga, apa yang dihapus setelahnya. Bila tidak ada, tulis rencana demonstrasi karangan dengan empat poin yang sama.

Petunjuk jawaban: jawaban baik menyebut rahasia di luar kode, anggaran dan peringatan terpasang, serta penghapusan sumber daya setelah selesai.
