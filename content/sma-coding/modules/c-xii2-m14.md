## Untuk siapa modul ini

Modul ini untuk murid kelas XII jalur C (IoT dan robotika), minggu `C-XII2-M14` silabus v1.4: asesmen dan refleksi semester 2. Prasyarat terindeks: `c-xii2-m13`, dengan `c-xii2-m8` sampai `c-xii2-m12` dari batch ini; materi `C-XII2-M1` sampai `C-XII2-M7` belum terindeks saat modul ini ditulis. Modul ini menilai semuanya.

Modul ini karangan penyusun dan disetujui pemilik program pada 2026-11-20 (keputusan lewat dialog; catatan tinjauan menjadi tindak lanjut revisi), dan tidak dihitung memenuhi butir capaian pembelajaran mana pun. Asesmen ini **tanpa AI**: jangan memakai AI generatif saat mengerjakannya (silabus 7.4). Bobot nilai, predikat, dan rubrik proyek mengikuti kebijakan sekolah `[belum terverifikasi]`; modul ini hanya memberi soal dan kunci latihan.

Bagian praktik dapat dikerjakan **dengan papan (F)** atau **tanpa papan** di kertas dan komputer. Bila memakai papan, ikuti aturan keselamatan sprint 1: daya USB atau baterai AA/AAA dari guru, tanpa listrik 220 V atau solder, cabut daya sebelum mengubah rangkaian, roda terangkat, tombol berhenti terpasang, dan pemutus daya diketahui letaknya.

## Ingat kembali

Ini inti asesmen: jawab dari ingatan, tanpa melihat catatan, lalu cocokkan dengan kunci. Soal 1 dari `c-xii2-m13`, soal 2 dari `c-xii2-m12`, soal 3 dari `c-xii2-m11`, soal 4 dari `c-xii2-m7`, soal 5 dari `c-xii2-m6`.

1. Mengapa hasil uji yang gagal tetap ditunjukkan pada presentasi?
2. Apa yang membuktikan sebuah panduan perakitan sudah baik?
3. Mengapa batas kebutuhan tidak boleh diubah diam-diam setelah melihat hasil?
4. Mengapa robot masuk `AMAN` setelah beberapa pembacaan garis hilang beruntun, bukan satu?
5. Mengapa roda diangkat dan tombol berhenti dipasang sebelum motor dinyalakan pertama kali?

## Tujuan

Yang dinilai pada asesmen ini:

- menelusuri kebutuhan ke uji dan menemukan kebutuhan tanpa uji dan uji tanpa kebutuhan;
- menelusuri program mesin keadaan dan penyangga melingkar di kertas;
- memberi putusan uji penerimaan dari data, termasuk nilai tepat di batas, dan melaporkannya jujur;
- merancang uji praktik yang aman dan dapat diulang;
- menulis refleksi berbukti tentang proyek akhir.

## Latihan bercampur

Semua soal **tanpa AI**.

1. **Tulis.** Tabel berikut adalah matriks proyek karangan. Temukan setiap kebutuhan yang tidak punya uji dan setiap uji yang tidak menunjuk kebutuhan yang ada, lalu tulis perbaikannya.

   | Kebutuhan | Isi |
   | --- | --- |
   | K1 | 2 m paling lama 40 detik |
   | K2 | simpangan terbesar paling besar 25 mm |
   | K3 | berhenti di `AMAN` bila garis hilang |
   | K4 | beroperasi paling sedikit 30 menit |
   | K5 | tanpa data pribadi |

   Uji: U1 menguji K1; U2 menguji K2; U3 menguji K3; U4 menguji K6.

2. **Telusuri.** Tulis keluaran program berikut di kertas **sebelum** menjalankannya. Lalu: pada tick berapa robot masuk `AMAN` bila `HILANG_MAKS` diganti 2?

```cpp
// C++17 biasa. Telusuri dulu di kertas, baru jalankan. Angka karangan.
#include <iostream>

int main() {
  const bool garis[] = {true, true, false, false, true, false, false, false, true};
  const int HILANG_MAKS = 3;
  int hilang = 0;
  bool aman = false;
  for (int t = 0; t < 9; t++) {
    if (!aman) {
      hilang = garis[t] ? 0 : hilang + 1;
      if (hilang >= HILANG_MAKS) {
        aman = true;
      }
    }
    std::cout << "tick " << t << ": " << (aman ? "AMAN" : "MAJU") << " hilang=" << hilang << "\n";
  }
}
```

3. **Uji penerimaan.** Sepuluh lari menghasilkan simpangan terbesar (mm): 20, 24, 25, 22, 25, 19, 21, 23, 18, 25, dengan batas K2 25 mm. Beri putusan, tulis rata-ratanya (dipangkas ke bawah), dan tulis dua kalimat laporan yang jujur.
4. **Penyangga.** Log di robot muat 4 catatan dan menimpa yang tertua. Tick 1 sampai 7 dicatat dan tidak ada pengiriman. Berapa catatan tertimpa, dan tick mana yang tersisa? Apa yang perlu dilaporkan ke server saat akhirnya terkirim?
5. **Praktik (F).** Dengan roda terangkat dan tombol berhenti terpasang, tunjukkan uji "jaringan mati": robot tetap masuk `AMAN` saat garis dihilangkan. Tanpa papan, tulis lembar uji untuk uji itu: tujuan, kebutuhan yang diuji, kondisi, prediksi, kolom hasil, dan penguji.

## Refleksi

Tulis di bukumu sendiri; jawaban tidak dikumpulkan di repositori ini dan tidak memuat data pribadi.

1. Bagian mana dari proyek akhirmu yang sudah kamu kuasai, dan buktinya apa (soal atau uji yang benar tanpa melihat catatan)?
2. Soal atau uji mana yang masih keliru atau hanya benar karena menebak? Apa penyebabnya?
3. Kebutuhan mana yang ditolak pada pengujian akhir kelompokmu, dan apa yang akan kamu ubah bila mengulang proyek?
4. Apa rencana belajarmu berikutnya, dengan jadwal ulang ingatan yang berjarak?

## Cek mandiri

- [ ] Saya menelusuri kebutuhan ke uji dan sebaliknya.
- [ ] Saya menelusuri mesin keadaan dan penyangga melingkar tanpa menjalankannya.
- [ ] Saya memutuskan penerimaan dari nilai terburuk dan nilai tepat di batas.
- [ ] Saya merancang uji praktik yang aman dan dapat diulang.
- [ ] Saya menulis refleksi dengan bukti, bukan perasaan.

## Kunci dan petunjuk

**Ingat kembali.** 1: supaya penonton menilai dengan data utuh dan kamu belajar dari yang gagal. 2: orang lain berhasil mengikutinya tanpa bertanya kepada penulis. 3: supaya hasil tidak disesuaikan dengan batas; perubahan sah hanya bila tertulis dengan tanggal dan alasan, dan batas semula tetap dilaporkan. 4: satu pembacaan hilang bisa derau sesaat; beberapa beruntun menandakan garis benar-benar hilang; harganya robot melaju buta beberapa tick. 5: roda terangkat dan tombol berhenti mencegah robot melaju tak terkendali saat arah putar atau program belum terbukti benar.

**Latihan bercampur.** 1: K4 dan K5 tidak punya uji (tambahkan uji 30 menit dengan roda terangkat dan pemeriksaan tabel data); U4 menunjuk K6 yang tidak ada (salah ketik atau kebutuhan terlupa: perbaiki atau tulis kebutuhannya). 2: keluaran: `tick 0: MAJU hilang=0`, `tick 1: MAJU hilang=0`, `tick 2: MAJU hilang=1`, `tick 3: MAJU hilang=2`, `tick 4: MAJU hilang=0`, `tick 5: MAJU hilang=1`, `tick 6: MAJU hilang=2`, `tick 7: AMAN hilang=3`, `tick 8: AMAN hilang=3` (hitungan kembali ke nol saat garis ada, dan setelah `AMAN` hitungan berhenti). Bila `HILANG_MAKS` 2: hitungan mencapai 2 pada tick 3, jadi `AMAN` pada tick 3. 3: DITERIMA, karena tiap lari paling besar 25 mm dan nilai tepat 25 lulus (`<=`); jumlah 222, rata-rata 22. Contoh laporan: "Semua sepuluh lari memenuhi batas 25 mm, tetapi tiga lari tepat 25 mm sehingga margin tipis. Dengan sepuluh lari kesimpulan masih lemah; tambah lari dan benih lintasan berbeda." 4: tick 1 sampai 7 berarti 7 catatan pada kapasitas 4: 3 tertimpa (tick 1 sampai 3), tersisa tick 4 sampai 7; laporkan jumlah tertimpa (3). 5: tidak ada kunci tunggal; uji benar bila ada prediksi sebelum hasil, roda terangkat dan tombol berhenti disebut, jaringan dimatikan saat robot `MAJU`, hasil yang diharapkan `AMAN`, dan penguji serta tanggal tercatat.

**Refleksi.** Tidak ada kunci. Rubrik singkat: jawaban baik menyebut bukti (soal atau uji yang benar atau salah), penyebab yang spesifik, kebutuhan yang ditolak beserta perubahan yang konkret, dan rencana yang punya jadwal; jawaban yang hanya "sudah paham" belum cukup.

## Langkah berikutnya

Ini modul terakhir jalur C. Bacaan lanjut: praktik inti pengembangan solusi (merancang, mengimplementasi, menguji, menyempurnakan, mengomunikasikan) pada glosarium Panduan Mata Pelajaran Informatika (lihat Rujukan).
