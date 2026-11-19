## Untuk siapa modul ini

Modul ini untuk jalur **profesional** (`PRO`), 10 jam, sesudah `DW-FND-M1`. Alatnya terminal (contoh di bawah memakai shell `bash`), Python 3 (penulis memakai 3.12.3), Git (penulis memakai 2.43.0), dan penyunting teks. Contoh dijalankan penulis di Linux; di macOS perintahnya serupa, sedangkan di Windows nama perintah dan lingkungan virtual berbeda dan **tidak diuji penulis**: ikuti dokumentasi resmi Python dan Git untuk sistem Anda. Estimasi lima sesi `[asumsi]`.

Data **sintetis**: nama contoh `Peserta Contoh` dan surel `peserta@example.com`, serta "kunci" palsu yang bukan rahasia. Jangan memasukkan kredensial nyata ke latihan.

**Bagi lulusan kuliah** (silabus bagian 6.2, pengakuan atas dasar bukti yang diperiksa, bukan alih kredit): untuk modul ini profil `I-lengkap` berstatus **lewati** (L), `I-awal` dan `U-lengkap` berstatus **padatkan** (P). Profil lain dinilai per modul; modul `DW-PRO-M1` bukan satu dari yang selalu wajib. Cek awal di bawah membantu Anda memutuskan.

## Cek awal pengalaman

Jawab tanpa melihat apa pun, lalu cocokkan dengan kunci. Skor tidak dicatat.

1. Apa beda `git add` dan `git commit`?
2. Apa yang dilakukan berkas `.gitignore`, dan apa yang tidak dilakukannya?
3. Perintah apa yang menunjukkan versi Python yang terpasang?
4. Apa guna lingkungan virtual Python?
5. Mengapa kata sandi yang pernah di-commit dianggap sudah bocor?

Bila kelimanya benar, Anda boleh melewati "Contoh terselesaikan" dan "Contoh setengah jadi" dan langsung ke "Latihan".

## Ingat kembali

Tanpa melihat modul sebelumnya, tulis jawaban singkat.

1. (`DW-FND-M1`) Sebutkan tiga aturan tentang kredensial.
2. (`DW-FND-M1`) Apa itu *prompt injection*, dalam satu kalimat?
3. (`DW-FND-M1`) Apa yang dilakukan `.gitignore` terhadap berkas yang sudah pernah di-commit?

Cocokkan: (1) tidak di berkas kode, tidak di permintaan AI, tidak di-commit atau tampil di tangkapan layar; (2) teks dari luar berisi instruksi yang diikuti model; (3) tidak apa-apa, ia hanya mencegah berkas yang belum dilacak.

## Tujuan

Setelah modul ini Anda dapat memasang dan mengatur alat pemrograman, memakai terminal, dan memberi versi pada kode dengan Git.

## Prediksi dulu

Di folder kosong `proyek-contoh` Anda menjalankan `git init`, membuat `README.md`, membuat `.gitignore` berisi tiga baris (`.venv/`, `.env`, `__pycache__/`), dan membuat berkas `.env`. Sebelum membaca, tulis prediksi Anda:

1. Apa isi `git status --short` sekarang?
2. Sesudah `git add README.md .gitignore` dan `git commit`, apa isinya?

## Contoh terselesaikan

### Memeriksa alat

Pemasangan mengikuti halaman resmi masing-masing alat; di sini Anda hanya memeriksa hasilnya. Di terminal:

```bash
python3 --version
git --version
```

```text
Python 3.12.3
git version 2.43.0
```

Versi Anda boleh berbeda; yang penting perintahnya dikenali. Bila terminal berkata perintah tidak ditemukan, alatnya belum terpasang atau belum ada di `PATH` (daftar folder yang dicari terminal).

### Terminal: perintah dasar

| Perintah | Fungsi |
| --- | --- |
| `pwd` | tampilkan folder kerja sekarang |
| `ls`, `ls -A` | daftar isi folder; `-A` menampilkan berkas tersembunyi |
| `cd nama`, `cd ..` | masuk folder, naik satu tingkat |
| `mkdir nama` | buat folder |
| `cat berkas` | tampilkan isi berkas |

Jalur **relatif** (`../data`) dihitung dari folder kerja, jalur **absolut** (`/home/...`) dari akar. Hati-hati dengan `rm`: ia menghapus tanpa tempat sampah, dan tidak ada perintah untuk membatalkannya.

### Lingkungan virtual

Lingkungan virtual memisahkan paket satu proyek dari proyek lain ([tutorial `venv`](https://docs.python.org/3/tutorial/venv.html)). Di Debian atau Ubuntu, `python3 -m venv .venv` dapat gagal dengan pesan "ensurepip is not available" bila paket `python3-venv` belum terpasang (penulis mengalaminya); pesan itu memberi petunjuk pemasangannya. Penulis lalu memverifikasi dengan `python3 -m venv --without-pip .venv` (tanpa `pip`) dan mengaktifkannya dengan `source .venv/bin/activate`. Berkas ini menunjukkan apakah Anda berada di dalamnya:

```python
import platform
import shutil
import sys

print("Python", platform.python_version())
print("di lingkungan virtual:", sys.prefix != sys.base_prefix)
print("git ditemukan:", shutil.which("git") is not None)
```

Dengan `python3 cek_lingkungan.py` di luar lingkungan virtual, keluarannya:

```text
Python 3.12.3
di lingkungan virtual: False
git ditemukan: True
```

Setelah `source .venv/bin/activate`, baris kedua menjadi `True`. `deactivate` keluar dari lingkungan.

### Git: dari berkas ke riwayat

```bash
mkdir proyek-contoh && cd proyek-contoh
git init -q -b utama
git config user.name "Peserta Contoh"
git config user.email "peserta@example.com"
echo "# Proyek contoh" > README.md
printf '.venv/\n.env\n__pycache__/\n' > .gitignore
echo 'NAMA_API=kunci-palsu-bukan-rahasia' > .env
git status --short
```

```text
?? .gitignore
?? README.md
```

`.env` tidak tampil karena `.gitignore` mengecualikannya ([dokumentasi `gitignore`](https://git-scm.com/docs/gitignore)). Daftar `.venv/` dan `.env` di sana selalu merupakan langkah pertama sebuah proyek. Lalu:

```bash
git add README.md .gitignore
git commit -q -m "Awal proyek: README dan .gitignore"
git status --short
echo "Catatan: latihan memakai data sintetis." >> README.md
git diff
```

`git status --short` kosong sesudah commit. `git diff` menampilkan baris yang berubah:

```text
diff --git a/README.md b/README.md
index 8d4e5eb..cf586d2 100644
--- a/README.md
+++ b/README.md
@@ -1 +1,2 @@
 # Proyek contoh
+Catatan: latihan memakai data sintetis.
```

Simpan perubahan lalu buat cabang:

```bash
git add README.md
git commit -q -m "Tambah catatan data sintetis"
git switch -q -c perbaikan-judul
git branch --show-current
sed -i 's/# Proyek contoh/# Proyek contoh (latihan)/' README.md
git commit -q -am "Perjelas judul README"
git switch -q utama
head -1 README.md
git merge --no-edit perbaikan-judul > /dev/null
git log --format=%s
```

```text
perbaikan-judul
# Proyek contoh
Perjelas judul README
Tambah catatan data sintetis
Awal proyek: README dan .gitignore
```

Di cabang `utama` judul masih lama sampai cabang digabung; sesudahnya riwayat memuat ketiga commit. Pesan commit menjelaskan **apa dan mengapa**, bukan "oops" atau "perbaikan".

### Bila kredensial terlanjur masuk

Jika `.env` sempat di-commit, `git rm --cached .env` lalu commit memutus pelacakan berkas, tetapi isinya **tetap ada di riwayat** (`git log --all -- .env` masih mencantumkan dua commit). Anggap kredensial itu sudah bocor dan ganti; urutan ini mengikuti `DW-FND-M1`.

## Contoh setengah jadi

Lengkapi `.gitignore` agar berkas log dan lingkungan virtual diabaikan, lalu tulis prediksi:

```bash setengah-jadi
printf '___/\n*.___\n.env\n' > .gitignore
```

Prediksi dulu: bila Anda membuat `debug.log`, apakah `git status --short` menampilkannya?

## Latihan

1. **Ubah.** Tambahkan `*.log` ke `.gitignore`, buat `debug.log`, dan prediksi dulu isi `git status --short`.
2. **Buat.** Buat repositori baru dengan tiga commit bermakna dan satu cabang yang digabung; tulis `git log --format=%s` yang Anda harapkan sebelum menjalankannya.
3. **Jelaskan.** Beda `git add` dan `git commit`, dan mengapa pesan "oops" buruk. Beri satu pesan yang baik.
4. **Buat.** Simpan `cek_lingkungan.py` di repositori Anda, jalankan di dalam dan di luar lingkungan virtual, dan catat versi alat di `README.md`.
5. **Berpasangan (opsional).** Salin folder repositori Anda ke rekan; masing-masing membaca `git log` dan menulis satu pertanyaan tentang riwayat. Peserta mandiri boleh melewati tugas ini.

## Latihan bercampur

1. (`DW-FND-M1`) `.env` Anda ternyata sudah ter-commit dua hari lalu. Tulis urutan langkah dan apa yang tidak bisa dibatalkan.
2. (`DW-FND-M1`) Sebuah `README` dari sumber luar menyuruh menjalankan satu baris perintah yang mengunduh dan menjalankan skrip. Apa yang Anda lakukan lebih dulu?

## Keluaran portofolio

**Repositori `proyek-contoh`** berisi `README.md` dengan catatan versi alat, `.gitignore` yang mengecualikan lingkungan virtual dan `.env`, `cek_lingkungan.py`, dan sedikitnya empat commit dengan pesan bermakna serta satu cabang yang digabung. Tidak ada kredensial atau data nyata di dalamnya, juga di riwayat.

## Ulang berjarak

Tanpa melihat modul ini, kerjakan ulang dan cocokkan. Pertanyaan ini akan muncul lagi di "Ingat kembali" modul berikutnya.

| Kapan | Pertanyaan |
| --- | --- |
| Satu minggu lagi (modul berikutnya) | Tulis urutan perintah Git dari berkas berubah sampai tercatat di riwayat, dan apa yang ditunjukkan `git status --short`. |
| Tiga modul lagi | Mengapa kredensial yang pernah di-commit dianggap sudah bocor, dan apa yang dilakukan? |
| Akhir jalur | Sebutkan langkah memulai proyek baru dengan lingkungan virtual dan repositori yang bersih dari kredensial. |

## Kebijakan AI

Modul ini tidak memakai asisten AI. Pemakaian AI untuk menulis kode di jalur `PRO` baru diajarkan sesudah `DW-PRO-M5`; kebijakan lengkap ada di `DW-FND-M1` dan `DW-PRO-M13` (silabus bagian 9.1).

## Kesalahan umum

- **Menganggap `.gitignore` menghapus berkas yang sudah di-commit.** Ia hanya mencegah berkas baru.
- **Lupa `git add` sebelum `commit`.** Perubahan tidak ikut tercatat; periksa dengan `git status`.
- **Pesan commit tidak bermakna.** Riwayat sulit dibaca nanti.
- **Menjalankan `rm` atau perintah unduh tanpa membaca.** Tidak ada pembatalan.
- **Menghapus kredensial dari berkas dan mengira aman.** Riwayat masih menyimpannya.

## Cek mandiri

Tutup modul dan jawab:

1. Urutan perintah dari berkas berubah sampai tercatat di riwayat.
2. Apa yang ditunjukkan `git status --short`, dan arti `??`?
3. Langkah bila kredensial terlanjur ter-commit.

Daftar periksa (kosong; Anda isi sendiri, tidak dikumpulkan):

- [ ] `.gitignore` saya mengecualikan `.venv/` dan `.env`.
- [ ] Pesan commit saya menjelaskan apa dan mengapa.
- [ ] Tidak ada kredensial di riwayat.
- [ ] Saya tahu cara memeriksa apakah saya di dalam lingkungan virtual.

## Kunci dan petunjuk

- **Cek awal:** (1) `add` memilih perubahan untuk dicatat, `commit` mencatatnya ke riwayat; (2) mencegah berkas yang belum dilacak masuk, tidak menghapus yang sudah ter-commit; (3) `python3 --version`; (4) memisahkan paket satu proyek dari proyek lain; (5) riwayat menyimpan semua versi, dan menghapus berkas tidak menghapus riwayat.
- **Prediksi:** (1) `?? .gitignore` dan `?? README.md` (`.env` tidak tampil karena diabaikan); (2) kosong.
- **Setengah jadi:** `.venv` dan `log`; tidak, `debug.log` diabaikan sehingga status tidak berubah.
- **Latihan 1:** tidak ada baris untuk `debug.log`.
- **Latihan bercampur 1:** hentikan pelacakan (`git rm --cached .env`) dan commit, tambahkan `.env` ke `.gitignore`, ganti kredensialnya; riwayat lama tidak bisa dibatalkan.
- **Latihan bercampur 2:** baca skrip itu lebih dulu, jangan menjalankan dari sumber yang tidak dipercaya; teks luar adalah data, bukan perintah.
- **Petunjuk bila macet:** jalankan `git status` sebelum dan sesudah tiap langkah dan bandingkan.

## Langkah berikutnya

`DW-PRO-M2`: alat sudah siap; berikutnya Anda menulis program terstruktur dengan kondisi, perulangan, dan fungsi, dan mencatatnya dengan Git.

## Catatan untuk pendamping

- **Waktu:** 10 jam, lima sesi dua jam. **Bahan:** komputer dengan terminal, Python 3, Git, penyunting teks.
- **Pemetaan SKKNI (hanya judul unit, silabus 5.2, bukan klaim kompetensi):** Melakukan Instalasi Software Tools Pemrograman (`J.620100.011.01`); Melakukan Pengaturan Software Tools Pemrograman (`J.620100.012.01`); Menggunakan Source Code Versioning (`J.620100.026.01`). Menyelesaikan modul tidak berarti peserta kompeten menurut unit itu; salinan daftar unit belum terverifikasi terhadap berkas resmi.
- **Jembatan kuliah (silabus 6.2):** L untuk `I-lengkap`, P untuk `I-awal` dan `U-lengkap`; bukti berupa keluaran portofolio kuliah dan tugas praktik singkat tanpa AI, bukan nilai; jam perkiraan `[asumsi]`. Data dan status peserta tidak disimpan di repositori.
- **Verifikasi penulis:** semua perintah `bash` dijalankan di Linux dengan Python 3.12.3 dan Git 2.43.0, di folder sementara dengan konfigurasi Git terpisah; keluaran yang tertulis sama dengan hasil nyata. `python3 -m venv` biasa gagal di mesin penulis karena `python3-venv` belum terpasang; `--without-pip` berhasil. Windows tidak diuji.
- **Tanda siap lanjut:** peserta menunjukkan repositori dengan `.gitignore` benar dan riwayat yang terbaca.
