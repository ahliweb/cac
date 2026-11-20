**Ingat dulu:** Tanpa melihat catatan, jawab. (1) Berapa rasio kontras minimum WCAG AA untuk teks biasa, dan untuk teks besar? ______ (2) Mengapa konten (daftar program) disimpan di berkas data terpisah dari tata letak? ______

![Tabel lima nama variabel lingkungan dengan dua kolom isian kosong](../gambar/b-xii1-m10-1.svg)

`[Gambar: tabel dengan tiga kolom: nama variabel, tersedia di, dan berbahaya. Lima barisnya SITE_URL, PUBLIC_SITE_URL, AWCMS_API_TOKEN, PUBLIC_AWCMS_API_TOKEN, dan KUNCI_PALSU_CONTOH. Kolom tersedia di dan berbahaya kosong; kamu mengisinya dengan peramban atau server, dan ya atau tidak.]`

**Prediksi:** Tebak dulu, tulis jawabanmu, baru jalankan (`AI: tanpa AI`). Menurut dokumentasi Astro, hanya variabel berawalan `PUBLIC_` yang tersedia di kode sisi peramban.

```ts
const variabel = [
  "SITE_URL",
  "PUBLIC_SITE_URL",
  "AWCMS_API_TOKEN",
  "PUBLIC_AWCMS_API_TOKEN",
  "KUNCI_PALSU_CONTOH",
];

for (const nama of variabel) {
  console.log(nama, nama.startsWith("PUBLIC_") ? "tersedia di kode peramban" : "hanya di kode server");
}
```

Isi dua kolom kosong pada tabel di gambar. Jika nilai `AWCMS_API_TOKEN` rahasia, nama mana yang berbahaya? ______

**Lengkapi:** Fungsi pembersih nilai rahasia. Isi bagian `____`.

```ts setengah-jadi
function bersihkan(teks: string, nilai: string[]): string {
  let hasil = teks;
  for (const n of nilai) hasil = hasil.____(n, "<RAHASIA>");
  return hasil;
}
```

**Susun:** Urutkan baris A sampai E menjadi langkah menangani `.env` yang terlanjur ter-commit. Satu baris tidak dipakai. `AI: tanpa AI`.

```text
(A) git commit -m "Hapus .env dari pelacakan"
(B) git rm --cached .env
(C) Cabut dan ganti kunci di penyedianya
(D) echo ".env" >> .gitignore
(E) Anggap aman karena commit sudah dihapus
```

Urutan: ______ ______ ______ ______ Tidak dipakai: ______

**Latihan:**

1. `AI: tanpa AI` Tiga potongan karangan: (a) `const api = "https://layanan.example/v1"`; (b) `const TOKEN = "KUNCI_PALSU_CONTOH_777"`; (c) `PUBLIC_SANDI_ADMIN=SANDI_PALSU_CONTOH` di `.env.production`. Mana yang rahasia tak sengaja, dan apa perbaikannya? ______
2. `AI: tanpa AI` Tiga permintaan karangan ke asisten AI: (a) "Kenapa `fetch` ini 401? `Authorization: Bearer KUNCI_PALSU_CONTOH_999`"; (b) "Apa beda `toBe` dan `toEqual`?"; (c) "Tolong periksa konfigurasi ini: `SECRET_KEY=KUNCI_PALSU_CONTOH_555`". Mana yang aman dikirim? Tulis ulang yang tidak aman tanpa kehilangan pertanyaannya. ______
3. `AI: boleh` Isi lembar periksa rahasia untuk repositori latihanmu: `.env` di `.gitignore`? `.env.example` hanya penunjuk? Rahasia di berkas yang dilacak? Variabel `PUBLIC_` berisi rahasia? ______
4. `AI: boleh` Mengapa `SITE_URL` di `.env.example` yang terbit sebagai alamat kanonik bukan pelanggaran, padahal ia variabel lingkungan? ______

**Cek diri:**

- [ ] Saya dapat menyimpan rahasia di `.env` yang masuk `.gitignore`.
- [ ] Saya dapat menjelaskan mengapa `PUBLIC_` tidak boleh berisi rahasia.
- [ ] Saya tahu urutan menangani rahasia yang terlanjur ter-commit.

**Catatan cetak (untuk guru, tidak dicetak):** dua halaman A4. Kunci ada di modul `b-xii1-m10`, bagian "Kunci dan petunjuk". Semua rahasia dalam lembar bernilai palsu. Lembar tidak memuat kolom identitas.
