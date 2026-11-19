## Untuk siapa modul ini

Modul ini untuk murid kelas 9 pada minggu kedelapan semester kedua. Mulai minggu ini kamu berkenalan dengan kecerdasan artifisial (KA). Kamu hanya memerlukan kertas, pensil, dan kartu yang disiapkan gurumu; tidak ada komputer dan tidak perlu akun. Waktunya satu pertemuan, 2 JP. Prasyaratnya `SMP7-2-M10` (masukan, proses, keluaran). Semua angka di modul ini rekaan.

## Ingat kembali

Tutup modul ini dan jawab dari ingatan.

1. Sebut tiga aturan satu slide yang baik. (`SMP9-2-M7`)
2. Sebut tiga bagian satu kasus uji. (`SMP9-2-M5`)
3. Sebut dua sensor dan apa yang diukur masing-masing. (`SMP8-1-M10`)
4. Gambar diagram masukan, proses, dan keluaran untuk satu perangkat. (`SMP7-2-M10`)

Kunci: (1) satu gagasan, huruf besar dan kontras tinggi, gambar bertujuan memperjelas; (2) masukan, hasil diharapkan, hasil sebenarnya; (3) contoh: sensor cahaya mengukur terang, sensor suhu mengukur panas; (4) contoh: tombol (masukan), aturan dibandingkan dengan nilai (proses), lampu menyala (keluaran).

## Tujuan

Setelah modul ini kamu dapat:

1. menjelaskan bahwa komputer hanya menerima angka dari sensor, dan arti angka itu datang dari aturan;
2. mengklasifikasikan kartu bacaan sensor dengan satu aturan;
3. menyebut dua alasan klasifikasi sensor bisa keliru;
4. menjelaskan bagaimana merata-ratakan beberapa pembacaan mengurangi salah baca.

## Prediksi dulu

Sebuah alat rekaan memasang dua sensor di ruang kelas piket: sensor cahaya dan sensor suara, masing-masing memberi angka 0 sampai 100. Alat itu menandai ruang sebagai **dipakai** atau **kosong**. Enam kartu bacaan rekaan, dengan keadaan sebenarnya:

| Kartu | Cahaya | Suara | Sebenarnya |
| --- | --- | --- | --- |
| K1 | 80 | 55 | dipakai |
| K2 | 10 | 5 | kosong |
| K3 | 85 | 10 | dipakai (ujian, semua diam) |
| K4 | 0 | 45 | kosong (suara dari lorong) |
| K5 | 70 | 8 | kosong (lampu lupa dimatikan) |
| K6 | 60 | 30 | dipakai |

**Prediksi.** Aturan A: "bila suara 30 atau lebih, tandai dipakai; selain itu kosong". Tulis tebakanmu: kartu mana yang ditandai salah oleh aturan A?

## Contoh terselesaikan

Karena ini minggu unplugged, contohnya berupa **permainan klasifikasi dengan kartu**. Terapkan aturan A satu per satu:

| Kartu | Suara | Aturan A | Sebenarnya | Benar? |
| --- | --- | --- | --- | --- |
| K1 | 55 | dipakai | dipakai | ya |
| K2 | 5 | kosong | kosong | ya |
| K3 | 10 | kosong | dipakai | **tidak** |
| K4 | 45 | dipakai | kosong | **tidak** |
| K5 | 8 | kosong | kosong | ya |
| K6 | 30 | dipakai | dipakai | ya |

Aturan A benar pada 4 dari 6 kartu. Pelajarannya:

- Sensor tidak mendengar "ada orang". Ia hanya memberi **angka**. Arti angka itu, misalnya "30 atau lebih berarti dipakai", dibuat manusia sebagai aturan.
- Sensor hanya mengukur satu hal. Ujian yang sunyi (K3) dan suara dari lorong (K4) mengecoh sensor suara.
- Bacaan sensor bisa berisik: angka sesaat bisa melompat. Tiga bacaan suara dalam satu menit, 40, 5, dan 6, memberi rata-rata (40 + 5 + 6) / 3 = 17. Satu lonjakan tidak lagi menentukan, dan 17 di bawah 30, jadi hasilnya kosong.

Aturan B memakai dua sensor: "bila cahaya 50 atau lebih, atau suara 30 atau lebih, tandai dipakai". Aturan B juga benar pada 4 dari 6 kartu (salah di K4 dan K5). Menambah sensor menggeser kesalahan, tetapi belum menghapusnya.

## Contoh setengah jadi

Terapkan aturan A pada tiga kartu baru. Isi bagian kosong.

| Kartu | Cahaya | Suara | Aturan A |
| --- | --- | --- | --- |
| K7 | 20 | 35 | ____ |
| K8 | 90 | 3 | ____ |
| K9 | 5 | 30 | ____ |

## Susun urutannya

Empat kartu langkah untuk satu kartu bacaan, acak: (A) tulis label di bawah kartu; (B) baca angka suara; (C) bandingkan angka dengan 30; (D) ambil satu kartu bacaan. Susun urutan yang benar di mejamu.

## Latihan

1. **Jalankan.** Terapkan aturan A pada K1 sampai K6 di kertasmu tanpa melihat tabel, lalu cocokkan.
2. **Ubah.** Ganti batas 30 menjadi 50. Kartu mana yang labelnya berubah? Berapa kartu yang benar sekarang?
3. **Buat.** Rancang satu aturan baru dengan kedua sensor yang benar pada K3 dan K4. Apakah ia masih benar pada K1, K2, K5, dan K6?
4. **Jelaskan.** Jelaskan dengan kata sendiri mengapa angka dari sensor belum berarti "ada orang".

## Latihan bercampur

1. Hitung rata-rata 12, 20, dan 4. (`SMP9-1-M5`)
2. Apa beda masukan dan keluaran pada sebuah alarm? (`SMP8-1-M10`)

## Ulang berjarak

Kerjakan ulang tanpa melihat modul ini, lalu cocokkan:

- **Minggu depan** (`SMP9-2-M9`): jelaskan mengapa sensor memberi angka dan bukan "ada orang", dan beri satu cara mengurangi salah baca.
- **Beberapa minggu lagi** (`SMP9-2-M10`): sebut satu alasan sistem yang memakai sensor perlu diperiksa manusia sebelum dipercaya.
- **Akhir semester** (`SMP9-2-M14`): tulis fungsi ringkasan data, misalnya rata-rata bacaan sensor, dengan pengaman data kosong.

## Kesalahan umum

- **Mengira sensor "mengerti".** Kenali: kalimat seperti "sensor tahu ada orang" tanpa menyebut aturan atau angkanya.
- **Menilai dari satu bacaan.** Kenali: kesimpulan dari satu angka tanpa mencoba bacaan lain.
- **Mengira dua sensor pasti lebih benar.** Kenali: tidak menghitung ulang berapa kartu yang benar.
- **Lupa satuan atau skala.** Kenali: angka tanpa keterangan 0 sampai 100 atau satuannya.

## Cek mandiri

Tutup modul, jawab tanpa melihat, lalu periksa.

1. Apa yang sebenarnya diterima komputer dari sebuah sensor?
2. Dari mana arti angka itu datang?
3. Sebut dua alasan klasifikasi dengan sensor bisa keliru.

Daftar periksa (kosong; kamu isi sendiri, tidak dikumpulkan):

- [ ] Aku menerapkan aturan pada kartu satu per satu.
- [ ] Aku menghitung berapa kartu yang benar.
- [ ] Aku menyebut satu kartu yang salah beserta sebabnya.

Kunci: (1) angka; (2) dari aturan yang dibuat manusia; (3) sensor hanya mengukur satu hal dan bacaan bisa berisik.

## Langkah berikutnya

`SMP9-2-M9`, "Mesin belajar dari contoh dan kualitas data". Minggu ini batas 30 ditetapkan dari kebiasaan, sedangkan minggu depan kamu "melatih" model kartu yang mencari batas itu dari contoh berlabel.

## Catatan untuk guru

- **Waktu:** 2 JP x 40 menit `[asumsi]` (silabus bagian 2). Siapkan kartu kertas K1 sampai K9; bermain berpasangan boleh, bukan jaminan efek belajar.
- **Alat:** hanya kertas dan kartu. Tanpa perangkat, tanpa akun, tanpa sensor sungguhan. Semua hitungan diperiksa penulis dengan `python3 -I` (Python 3.12.3): aturan A benar 4 dari 6, batas 50 juga 4 dari 6, aturan B 4 dari 6, rata-rata (40 + 5 + 6) / 3 = 17.
- **Butir CP:** corpus memetakan minggu ini ke `DK-EA-b` (sebagian: unplugged saja). Modul tidak menyatakan CP "terpenuhi". Butir `DK-EA-a` tidak dicakup di silabus ini, jadi modul tidak membandingkan cara manusia dan KA menggabungkan beberapa indra.
- **Keluaran minggu:** permainan klasifikasi dengan kartu.
- **Kunci "Prediksi dulu":** K3 dan K4 salah (lihat contoh terselesaikan).
- **Kunci "Contoh setengah jadi":** K7 dipakai (35 sama atau lebih dari 30); K8 kosong; K9 dipakai (30 tepat di batas).
- **Kunci "Susun urutannya":** D, B, C, A.
- **Kunci latihan:** (1) dipakai, kosong, kosong, dipakai, kosong, dipakai. (2) K4 dan K6 berubah menjadi kosong; tetap 4 dari 6 benar (K4 kini benar, K6 kini salah). (3) contoh: "dipakai bila suara 30 atau lebih dan cahaya 50 atau lebih, atau bila cahaya 80 atau lebih dan suara kurang dari 20"; K3 (85, 10) dan K4 (0, 45) benar, tetapi aturan semacam ini dibuat dari kartu yang sama dan belum tentu benar pada kartu baru (bahan untuk minggu depan). (4) angka hanyalah ukuran terang atau keras; "ada orang" adalah kesimpulan dari aturan.
- **Kunci "Latihan bercampur":** (1) 12. (2) masukan adalah yang diterima (mis. tombol atau sensor), keluaran adalah yang dihasilkan (mis. bunyi).
- **Petunjuk bertahap:** (a) baca angka suara tiap kartu; (b) bandingkan dengan batas; (c) bandingkan hasil dengan kolom "Sebenarnya"; (d) hitung yang benar.
- **Bekal SMA:** minggu ini berkaitan dengan jalur D kelas X (`d-x1-m8`, "Apa itu AI dan apa yang bukan"); pada jalur C (`c-x1-m11`, masukan analog) sensor cahaya dibaca dengan program. Itu jembatan silabus (`data/smp-coding/bridge.json`), bukan prasyarat.
- **AI:** tanpa AI oleh murid. Kebijakan `smp-coding` (silabus bagian 7.1): AI generatif hanya demonstrasi guru, tanpa akun murid; modul ini tidak memakai layanan AI.
- **Privasi:** kartu rekaan; tanpa foto, suara, atau data ruang kelas nyata.
- **Unsur pembelajaran:** ingat kembali dan jarak (`K`), PRIMM (`K` usia 11 sampai 14), "Susun urutannya" (`M`, efisiensi), latihan bercampur (`K`).
