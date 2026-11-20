## Untuk siapa modul ini

Modul ini untuk murid kelas XII jalur B (Web dengan JavaScript, TypeScript, dan Bun), minggu `B-XII2-M13` silabus v1.4.1: portofolio dan refleksi, yaitu mengarsipkan karyamu dan merefleksikan prosesnya. Dikerjakan perorangan di atas hasil kelompok. Prasyarat: modul `b-xii2-m12` (presentasi).

Modul ini berstatus DRAF: karangan penyusun, belum ditinjau pemilik. Butir `F-BK-a` (proses rekayasa) dipetakan silabus sebagai dipenuhi jalur ini; modul draf ini belum dihitung memenuhinya. Keluaran minggu ini: portofolio dan refleksi. Penilaian memakai rubrik gurumu.

**Konteks semester ini.** Kelasmu mengkustomisasi profil `landing` dari `awcms-one` sebagai studi kasus (`main`, 2026-11-20). Portofolio dibuat **tanpa akun layanan luar**: berupa folder dan arsip di komputermu, yang kamu serahkan pada guru lewat cara yang disediakan sekolah. Contoh dijalankan penyusun dengan Bun 1.4.4 dan Git 2.43.0 per 2026-11 di repositori sementara. Semua nama dan konten karangan. AI boleh dipakai dengan etika dan dicatat, tanpa data pribadi atau rahasia pada permintaanmu.

## Ingat kembali

Jawab dari ingatan dulu, baru cek di bagian kunci. Soal 1 dari `b-xii2-m12`, soal 2 dari `b-xii2-m10`, soal 3 dari `b-xii2-m5`.

1. Mengapa demo diberi cadangan yang tidak bergantung pada server hidup atau jaringan?
2. Mengapa "tidak menyimpan data pribadi" dicatat sebagai keputusan rancangan, dan apa yang dicek ulang bila fitur berubah menjadi menyimpan?
3. Apa yang kamu catat tentang fitur yang tidak dikerjakan karena di luar lingkup?

## Tujuan

Setelah modul ini kamu dapat:

- menyusun portofolio proyek: ringkasan, bukti, lisensi, dan catatan proses;
- membuat arsip yang hanya memuat berkas yang dilacak Git, sehingga `.env` dan rahasia tidak ikut;
- memeriksa isi arsip sebelum diserahkan atau dibagikan;
- menulis refleksi proses dan rencana belajar, dan membedakannya dari jurnal pribadimu (keluaran minggu ini: portofolio dan refleksi).

## Rencana sprint

Sprint ini menyambung `b-xii2-m12`: demo sudah selesai dan pertanyaan penonton sudah kamu catat. Tulis rencana portofolio **sebelum** mengumpulkan berkas: siapa pembacanya (gurumu, dan mungkin dirimu tiga bulan lagi), apa yang harus terbukti, dan apa yang tidak boleh ikut. Tambahkan prediksimu: berkas mana yang paling mungkin tak sengaja ikut?

| Bagian | Isi contoh |
| --- | --- |
| Pembaca | Guru dan dirimu di masa depan. |
| Ringkasan | `README.md`: tujuan, pengguna fiktif, apa yang dikerjakan dan tidak, cara menjalankan. |
| Bukti | Folder `bukti/`: tangkapan layar, keluaran gerbang, laporan uji, laporan keamanan, catatan kepatuhan. |
| Lisensi | Berkas `LICENSE` bawaan tetap ada (MIT); kontenmu diberi lisensi yang kamu pilih. |
| Refleksi proyek | `refleksi.md`: proses, keputusan, dan pelajaran; tanpa data pribadi. |
| Tidak boleh ikut | `.env`, kunci, data pribadi nyata, foto teman, berkas pihak ketiga tanpa lisensi. |
| Arsip | Dibuat dari commit bertag, bukan dengan menyalin folder. |

**Arsip dari commit bertag.** `git archive` hanya memuat berkas yang dilacak di commit itu, karena arsipnya dibuat dari pohon commit (dijalankan penyusun). Di repositori sementara, `.env` ada di disk tetapi di `.gitignore`:

```text
$ git tag --list
v1.0.0-kandidat
$ git archive --format=tar --prefix=warung-kopi-contoh/ v1.0.0-kandidat | tar -t
warung-kopi-contoh/
warung-kopi-contoh/.gitignore
warung-kopi-contoh/LICENSE
warung-kopi-contoh/README.md
warung-kopi-contoh/apps/
warung-kopi-contoh/apps/site.ts
warung-kopi-contoh/bukti/
warung-kopi-contoh/bukti/gerbang.txt
warung-kopi-contoh/refleksi.md
$ ls -a
. .. apps bukti .env .git .gitignore LICENSE README.md refleksi.md
```

Hasilnya tidak memuat `.env`, walaupun berkas itu ada di folder kerja. Tetap periksa isi arsip: `git archive` tidak tahu apakah ada rahasia yang sudah terlanjur ter-commit (modul `b-xii2-m9`).

**Pemeriksa portofolio.** Fungsi berikut memeriksa daftar isi arsip: berkas wajib ada, bukti sedikitnya tiga, dan tidak ada berkas lingkungan atau kunci. Daftar contoh sengaja kurang.

```ts
function periksaPortofolio(berkas: string[]): string[] {
  const temuan: string[] = [];
  const wajib = ["README.md", "LICENSE", "refleksi.md"];
  for (const w of wajib) if (!berkas.includes(w)) temuan.push(`berkas wajib belum ada: ${w}`);
  const bukti = berkas.filter((b) => b.startsWith("bukti/"));
  if (bukti.length < 3) temuan.push(`bukti baru ${bukti.length}, sasaran minimal 3`);
  for (const b of berkas) {
    if (/(^|\/)\.env(\..+)?$/.test(b) && !b.endsWith(".env.example")) temuan.push(`berkas lingkungan ikut terarsip: ${b}`);
    if (/\.(pem|key)$/.test(b)) temuan.push(`berkas kunci ikut terarsip: ${b}`);
  }
  return temuan;
}

const isiArsip = ["README.md", "LICENSE", "bukti/beranda.png", "bukti/gerbang.txt", ".env", "apps/site.ts"];
const temuan = periksaPortofolio(isiArsip);
for (const t of temuan) console.log(t);
console.log(temuan.length, "temuan");
```

```text
berkas wajib belum ada: refleksi.md
bukti baru 2, sasaran minimal 3
berkas lingkungan ikut terarsip: .env
3 temuan
```

Pemeriksa ini hanya membaca nama berkas. Ia tidak membuka isinya, jadi pindai rahasia dan baca sendiri arsip sebelum dibagikan.

**Refleksi proyek dan jurnal pribadi.** Dua hal berbeda. `refleksi.md` ikut portofolio: proses, keputusan, dan temuan ulasan, tanpa data pribadi, dan hanya yang siap dibaca guru. Jurnal pribadimu tetap milikmu dan tidak diserahkan.

## Daftar periksa

- [ ] Rencana portofolio ada sebelum mengumpulkan berkas: pembaca, bukti, larangan, prediksi.
- [ ] `README.md` menyatakan tujuan, lingkup, dan cara menjalankan dengan perintah yang benar-benar ada.
- [ ] Folder `bukti/` memuat sedikitnya tiga bukti nyata (keluaran gerbang, tangkapan layar, laporan).
- [ ] `LICENSE` bawaan dipertahankan; atribusi foto dan teks pinjaman lengkap.
- [ ] Arsip dibuat dengan `git archive` dari commit bertag; isinya diperiksa dan dipindai rahasia.
- [ ] Tidak ada `.env`, kunci, data pribadi nyata, atau foto teman di arsip.
- [ ] `refleksi.md` menyebut proses, keputusan, temuan ulasan, dan satu hal yang belum beres.
- [ ] Bila memakai AI: log pemakaian ikut dicatat.

## Umpan balik sejawat

Tukar arsip dengan teman dan buka tanpa bantuan: dapatkah ia memahami proyekmu dari `README.md` dan `bukti/` saja? Beri ulasan: **satu yang sudah baik, satu yang perlu diperbaiki, satu langkah berikutnya**. Penyerahan arsip memakai cara yang disediakan gurumu, bukan layanan unggah pribadi.

## Latihan bercampur

1. `AI: boleh` (dari `b-xii2-m10`) Tulis satu kalimat di `README.md` portofolio yang jujur tentang data: apa yang disimpan situsmu dan apa yang tidak.
2. `AI: boleh` (dari `b-xii2-m9`) Tulis perintah yang kamu jalankan sebelum menyerahkan arsip untuk memastikan tidak ada rahasia di berkas maupun riwayat.

## Ulang berjarak

Pertanyaan 1 muncul lagi di `Ingat kembali` modul `b-xii2-m14` (pertanyaan 1). Pertanyaan 2 dan 3 tidak punya modul tujuan lagi karena jalur B berakhir di `b-xii2-m14`; ulangi sendiri sekitar tiga dan delapan minggu lagi. Jawab sekarang lalu simpan.

1. Mengapa arsip portofolio dibuat dari commit bertag dengan `git archive`, bukan dengan menyalin folder?
2. Mengapa portofolio memuat bukti dan bukan hanya klaim?
3. Bagaimana kamu menjarakkan pengulangan topik yang masih lemah setelah jalur ini selesai?

## Kesalahan umum

- **Menyalin folder kerja ke arsip.** `.env` dan berkas sementara ikut.
- **Percaya `git archive` pasti bersih.** Rahasia yang sudah ter-commit ikut terarsip.
- **Portofolio tanpa bukti.** "Sudah diuji" tanpa laporan tidak dapat diperiksa.
- **Menghapus `LICENSE` atau atribusi.** Syarat lisensi hilang.
- **Refleksi berisi data pribadi.** Tulis proses dan keputusan, bukan identitas.
- **Menyerahkan lewat akun pribadi yang diwajibkan.** Pakai jalur yang disediakan sekolah.

## Cek mandiri

- [ ] Saya dapat menyusun portofolio dengan ringkasan, bukti, lisensi, dan refleksi proyek.
- [ ] Saya dapat membuat arsip dari commit bertag dan memeriksa isinya.
- [ ] Saya dapat memastikan tidak ada rahasia atau data pribadi di arsip.
- [ ] Saya dapat membedakan refleksi proyek dari jurnal pribadi.
- [ ] Saya dapat menyusun rencana belajar yang berjarak.

## Kunci dan petunjuk

**Ingat kembali.** 1: server bisa mati, jaringan putus, atau komputer lab berbeda; cadangan seperti tangkapan layar membuat pesan tetap tersampaikan. 2: situs tanpa penyimpanan tidak memerlukan dasar pemrosesan, tetapi keputusan itu bisa batal; bila berubah, periksa lagi persetujuan, informasi tujuan dan retensi, dan keamanan. 3: apa fiturnya, mengapa di luar lingkup, dan siapa atau apa yang diperlukan agar bisa dikerjakan (misalnya izin mengubah backend).

**Rencana sprint.** Tabel di atas contoh; rencanamu boleh berbeda. Berkas yang paling mungkin tak sengaja ikut: `.env`, berkas sementara editor, dan foto yang belum berlisensi jelas. Keluaran pemeriksa: tiga temuan seperti di atas; perbaikannya menambahkan `refleksi.md`, melengkapi bukti (misalnya laporan uji), dan memastikan `.env` tidak dilacak lalu membuat ulang arsip dari commit bertag.

**Latihan bercampur.** 1: contoh: "Situs ini tidak menyimpan atau mengirim data pengunjung; formulir hanya menampilkan konfirmasi di layar." 2: contoh: jalankan pemindai rahasia pada berkas yang dilacak (`git ls-files`), `git log -S` untuk nilai yang pernah dipakai, dan daftar isi arsip dengan `tar -t`.

**Ulang berjarak.** 1: `git archive` hanya memuat berkas yang dilacak di commit itu, sehingga `.env` dan sampah kerja tidak ikut, dan tag menandai versi yang jelas dan dapat diulang. 2: klaim tidak dapat diperiksa, sedangkan keluaran gerbang, laporan uji, dan tangkapan layar dapat dibaca dan dijalankan ulang. 3: contoh: jawab dulu dari ingatan, bukan membaca ulang catatan; ulangi besok, tiga hari, seminggu, lalu sebulan, dengan soal baru tiap kali.

## Langkah berikutnya

Modul berikut: `b-xii2-m14` (asesmen jalur B kelas XII semester 2) yang menilai tanpa AI. Bacaan lanjut: dokumentasi `git archive` dan `gitignore`, serta halaman Creative Commons tentang CC BY 4.0 untuk lisensi konten karyamu.
