# Profesi, Etika, dan Masyarakat

> **DRAF — belum ditinjau.** Ini modul belajar untuk mata kuliah `KUL-I-305`
> (2 SKS, semester 6, jalur I), bagian dari program `kuliah-coding`. Konten
> karangan menurut ADR-0007; belum disetujui pemilik atau peninjau. Mata
> kuliah ini sebagian besar tentang **kasus dan penalaran**, bukan kode. Dua
> blok `cpp` kecil di bagian 3 adalah **C++17** (g++ 13.3, Linux): keduanya
> dikompilasi dengan `-std=c++17 -Wall -Wextra` tanpa peringatan, dijalankan,
> dan keluarannya cocok. Semua nama, kasus, dan data **fiktif**. Bagian hukum
> hanya memuat yang tertulis pada teks resmi yang dibaca penyusun; ini bahan
> belajar, bukan nasihat hukum.

## Untuk siapa modul ini

Mahasiswa semester 6 informatika atau ilmu komputer. Tidak ada prasyarat mata
kuliah. Satu mata kuliah, satu semester: 14 pertemuan, ujian tengah sesudah
pertemuan 7 dan ujian akhir sesudah pertemuan 14 `[asumsi]` (silabus 2.3).
Kamu butuh kertas dan pena (esai dan analisis kasus ditulis tangan atau
diketik tanpa AI untuk ujian), akses ke teks peraturan resmi di bagian
Rujukan, dan berkas teks untuk log pemakaian AI milikmu sendiri.

Di semester 6, contoh terselesaikan **sangat dibatasi**: tiap bagian punya
satu kasus yang diuraikan penuh; selebihnya kamu memutuskan sendiri, menilai
analisis temanmu, dan membandingkan dengan teks peraturan. Etika tidak punya
satu kunci jawaban tunggal; yang dinilai adalah **mutu penalaran dan
keterkaitannya dengan fakta**.

## Peta semester

| Pertemuan | Bagian | Pokok bahasan | CPMK | Kuis pembuka (jarak) |
| --- | --- | --- | --- | --- |
| 1 | 1 | Mengapa etika profesi; kerangka penalaran kasus | C1 | `KUL-U-202` bila diambil (data dan layanan AI) |
| 2 | 1 | Kasus 1 dan 2: persetujuan, kepentingan berbeda | C1 | 1 |
| 3 | 1 | Kasus 3: akses tanpa izin dan pengujian keamanan | C1 | 2, lalu 1 |
| 4 | 1 | Kasus 4: peringatan dini (*whistleblowing*); **kuis kumulatif 1** | C1 | 3, lalu 1 |
| 5 | 2 | Hak cipta: apa yang dilindungi | C2 | 4, lalu 2 |
| 6 | 2 | Lisensi perangkat lunak: permisif dan *copyleft* | C2 | 5, lalu 3 |
| 7 | 2 | Atribusi, ketergantungan, kode dari luar; **kuis kumulatif 2** | C2 | 6, lalu 4 |
| ujian tengah | | Ujian tertulis (kasus dan pasal), tanpa AI | C1–C2 | |
| 8 | 3 | Data pribadi: definisi dan jenis | C2 | 7, lalu 5 |
| 9 | 3 | Hak subjek data; kewajiban pengendali | C2 | 8, lalu 6 |
| 10 | 3 | Meminimalkan data; samaran bukan anonim | C2 | 9, lalu 7 |
| 11 | 4 | Dampak sosial: siapa untung, siapa rugi | C1 | 10, lalu 8 |
| 12 | 4 | Profesi: tanggung jawab, kode etik, kejujuran kerja; **kuis kumulatif 3** | C1 | 11, lalu 9 |
| 13 | 5 | Tata kelola AI: SE 9/2023 dan pedoman organisasi | C3 | 12, lalu 10 |
| 14 | 5 | Kebijakan pemakaian AI di tempat kerja; hak cipta keluaran AI | C3 | 13, lalu 1 sampai 12 |
| ujian akhir | | Ujian tertulis, tanpa AI | C1–C3 | |

## Ingat kembali

Tiap pertemuan dibuka dengan kuis 5 menit **tanpa catatan**, 3 sampai 4 soal
pendek: pertemuan lalu, lalu yang lebih jauh (pertemuan 14 memuat soal
pertemuan 1). Kuis tidak dinilai besar. Karena mata kuliah ini tidak punya
prasyarat, soal pembuka pertemuan 1 berasal dari pengalaman belajar umum
dan, bila kamu mengambilnya, `KUL-U-202`:

1. Apa saja yang tidak boleh kamu masukkan ke layanan AI, dan mengapa?
2. Apa yang harus diungkapkan dan dicatat saat kamu memakai AI pada tugas
   tingkat Hijau?
3. Sebut satu alasan keluaran AI yang lancar belum tentu benar.

## Tujuan

Pada akhir semester kamu dapat (CPMK, silabus bagian 3.2):

- **C1** menalar kasus etika profesi
- **C2** menjelaskan hak cipta, lisensi, dan pelindungan data pribadi
- **C3** menjelaskan tata kelola pemakaian AI, termasuk hak cipta dan lisensi keluaran AI (status hukum masih berkembang)

## Bagian 1: Etika dan kasus etika profesi (pertemuan 1 sampai 4)

Etika profesi bukan daftar larangan yang dihafal; ia **cara menalar** ketika
beberapa kepentingan bertabrakan dan tidak ada aturan yang menjawab langsung.
Modul ini memakai kerangka lima langkah karangan penyusun (bukan kutipan dari
kode etik tertentu): (1) **fakta**: apa yang pasti, apa yang belum diketahui;
(2) **pihak terdampak**: siapa saja, termasuk yang tidak hadir; (3) **pilihan**:
paling sedikit tiga, termasuk "tidak melakukan apa-apa"; (4) **akibat dan
kewajiban**: apa yang mungkin terjadi pada tiap pihak, dan kewajiban apa yang
kamu punya (kepada pemberi kerja, pemakai, publik, diri sendiri); (5)
**keputusan dan alasannya**, ditulis agar orang lain dapat membantahnya. Banyak
profesi memiliki kode etik; carilah yang berlaku di bidangmu dan bacalah
sendiri.

### Prediksi dulu

Kasus 1 (fiktif). Dian bekerja di perusahaan rintisan. Atasannya meminta fitur
yang merekam lokasi pengguna terus-menerus. Persetujuan pengguna hanya berupa
satu kotak centang "setuju syarat dan ketentuan" yang tidak menyebut lokasi.
Sebelum membaca analisis, putuskan: (a) menurutmu Dian sebaiknya melakukan apa,
dan (b) apa **fakta yang belum kamu ketahui** yang akan mengubah jawabanmu?

### Contoh terselesaikan

Analisis dengan lima langkah. **Fakta:** fitur merekam lokasi terus-menerus;
persetujuan tidak menyebut lokasi; belum diketahui apakah ada alasan hukum atau
teknis, apa yang dilakukan dengan data, dan berapa lama disimpan. **Pihak
terdampak:** pengguna (privasi, keselamatan), perusahaan (kepercayaan, risiko
hukum), Dian (pekerjaan dan integritas), rekan kerja. **Pilihan:** (A)
melaksanakan apa adanya; (B) menolak dan diam; (C) mengajukan keberatan
tertulis dan mengusulkan alternatif (persetujuan khusus lokasi, merekam hanya
bila aplikasi dipakai, retensi pendek); (D) membawa ke jalur internal yang
lebih tinggi; (E) mengundurkan diri. **Akibat:** A merugikan pengguna dan
memberi Dian tanggung jawab bersama; B mengabaikan masalah; C menjaga
hubungan kerja dan memperbaiki rancangan, tetapi bisa ditolak; D dan E lebih
berat. **Keputusan:** C dahulu, lalu D bila ditolak, dengan alasan bahwa
kewajiban kepada pengguna tidak hilang karena perintah atasan, dan bahwa
alternatif yang konkret memberi atasan jalan keluar. Fakta yang belum
diketahui (poin b) dapat mengubah hal ini: bila data tidak pernah meninggalkan
perangkat pengguna, risikonya berbeda.

Kasus 3 (fiktif, pertemuan 3) menyentuh hukum. Rina menemukan celah di situs
layanan publik kampus lain dan "sekadar mencoba" masuk untuk membuktikannya
tanpa izin. Kitab Undang-Undang Hukum Pidana baru (Undang-Undang Nomor 1
Tahun 2023, diundangkan 2 Januari 2023, mulai berlaku setelah tiga tahun)
memuat Pasal 332 ayat (1): setiap orang yang dengan sengaja dan tanpa hak
atau melawan hukum mengakses komputer dan/atau sistem elektronik milik orang
lain dengan cara apa pun dipidana dengan pidana penjara paling lama enam tahun
atau denda kategori V. Pasal 622 ayat (1) huruf r KUHP mencabut dan
menyatakan tidak berlaku, antara lain, Pasal 30 Undang-Undang Informasi dan
Transaksi Elektronik lama (UU 11/2008), jadi **Pasal 30 itu tidak dikutip
sebagai hukum berlaku**; Pasal 622 ayat (10) huruf d mengatur bahwa acuan ke
Pasal 30 dan 46 diganti dengan Pasal 332. "Niat baik" tidak muncul dalam
kalimat pasal yang kamu baca; jalur yang aman adalah **izin tertulis** atau
program pelaporan kerentanan milik pemilik sistem. Bila kamu memerlukan
penjelasan hukum yang lengkap tentang pengecualian atau tafsir, tanyakan unit
hukum atau pengajar hukum.

### Contoh setengah jadi

Kasus 4 (fiktif): Bayu menemukan bahwa perusahaannya menyembunyikan kebocoran
data pengguna. Isi lima langkah: fakta yang ada dan yang perlu dicek; pihak
terdampak; paling sedikit tiga pilihan (jalur internal, regulator, publik);
akibat tiap pilihan; keputusan dan alasannya. Tukar dengan teman; masing-masing
menandai satu pilihan yang terlewat.

### Latihan

1. **Ubah:** ubah kasus 1 menjadi kasus di mana data lokasi tidak keluar dari
   perangkat; analisis ulang dan jelaskan apa yang berubah.
2. **Buat:** tulis kasus fiktif sendiri dari bidang yang kamu minati (bukan
   orang nyata, bukan perusahaan nyata) dan analisis dengan lima langkah.
3. **Jelaskan:** mengapa "diperintah atasan" atau "semua orang melakukannya"
   bukan jawaban akhir pada langkah 5.
4. **Berpasangan/diskusi (praktikum kasus):** dua orang membaca kasus yang
   sama, menulis keputusan terpisah, lalu membandingkan alasannya; tukar peran
   tiap sekitar 10 menit. Penilaian tetap perorangan.

## Bagian 2: Lisensi dan hak cipta (pertemuan 5 sampai 7)

Perangkat lunak tertulis adalah **ciptaan**. Siapa pun yang memakai, menyalin,
atau mengubahnya memerlukan izin, kecuali ada pengecualian. Lisensi adalah
izin itu, dengan syarat.

### Prediksi dulu

Kamu menempel potongan kode dari sebuah repositori publik ke proyek tugasmu
karena "toh publik". Tuliskan: apa yang perlu kamu periksa sebelum
menggunakannya, dan apa yang mungkin terjadi bila repositori itu tidak
menyebut lisensi apa pun?

### Contoh terselesaikan

Undang-Undang Nomor 28 Tahun 2014 tentang Hak Cipta menyatakan Hak Cipta
sebagai hak eksklusif pencipta yang timbul secara otomatis setelah ciptaan
diwujudkan dalam bentuk nyata (Pasal 1 butir 1); Program Komputer termasuk
ciptaan yang dilindungi (Pasal 40 ayat (1) huruf s); hak ekonomi meliputi
penggandaan, pendistribusian, dan pengadaptasian (Pasal 9 ayat (1)) dan
melaksanakannya memerlukan izin (Pasal 9 ayat (2)); **Lisensi** adalah izin
tertulis dari Pemegang Hak Cipta kepada pihak lain untuk melaksanakan hak
ekonomi dengan syarat tertentu (Pasal 1 butir 20). Jadi kode publik tanpa
lisensi bukan kode bebas pakai: **tidak adanya lisensi bukan izin**, dan kamu
perlu meminta izin atau tidak memakainya.

Dua kelompok lisensi yang sering kamu temui (per 2026-11; baca teks
lisensinya sendiri sebelum memakai):

| Kelompok | Contoh | Syarat utama menurut halaman yang dibaca |
| --- | --- | --- |
| Permisif | MIT, Apache-2.0 | Pertahankan pemberitahuan hak cipta dan lisensi; Apache-2.0 juga mewajibkan menyebut perubahan dan memberi hibah paten; karya turunan boleh dilisensikan dengan syarat lain |
| *Copyleft* kuat | GPL-3.0 | Izin bersyarat pada tersedianya sumber lengkap karya dan modifikasinya, termasuk karya lebih besar yang memakainya, dengan lisensi sama; teks GPL-3.0 bagian 5(c) mensyaratkan seluruh karya dilisensikan di bawah lisensi itu |
| Konten (bukan kode) | CC BY-SA 4.0 | Beri atribusi dan tautan lisensi, sebut perubahan; karya turunan dibagikan dengan lisensi yang sama |

Rangkum secara jujur: ini ringkasan, bukan penafsiran hukum. Gabungan
lisensi dapat rumit (kapan kode "digabung" dengan program lain?), jadi untuk
proyek yang akan diedarkan, tanyakan penasihat hukum atau kebijakan organisasi.
Kebiasaan dasar: catat **asal dan lisensi** tiap ketergantungan (daftar
bahan perangkat lunak), simpan teks lisensi, dan bila ragu jangan menempel.
Pemeriksaan sederhana: untuk tiap paket yang kamu pasang, tulis nama,
versi, lisensi (identifikasi baku seperti yang tercantum di daftar SPDX), dan
apakah kamu mengubahnya.

### Contoh setengah jadi

Proyek timmu berlisensi MIT dan ingin memakai pustaka berlisensi GPL-3.0 yang
dihubungkan langsung ke program. Isi: (a) apa yang kamu cek dulu pada teks GPL,
(b) tiga pilihan (ganti pustaka, ikuti lisensinya, minta izin penulis), (c)
siapa yang memutuskan di organisasimu.

### Latihan

1. **Ubah:** tulis ulang tabel lisensi di atas untuk satu lisensi lain yang kamu
   baca sendiri dari sumber resmi; sertakan tanggal membaca.
2. **Buat:** daftar ketergantungan satu proyek kecilmu dengan nama, versi,
   lisensi, dan sumber.
3. **Jelaskan:** mengapa "tidak ada lisensi" bukan berarti "bebas pakai".

## Bagian 3: Privasi dan pelindungan data pribadi (pertemuan 8 sampai 10)

### Prediksi dulu

Sebuah tabel peminjaman buku (fiktif) tidak berisi nama, hanya prodi dan
angkatan. Menurutmu apakah ada orang yang masih dapat dikenali dari tabel itu,
dan kapan?

### Contoh terselesaikan

Undang-Undang Nomor 27 Tahun 2022 tentang Pelindungan Data Pribadi (UU PDP)
mendefinisikan **Data Pribadi** sebagai data tentang orang perseorangan yang
teridentifikasi atau dapat diidentifikasi, secara tersendiri atau dikombinasi
dengan informasi lain, baik langsung maupun tidak langsung (Pasal 1 butir 1).
UU membedakan data bersifat spesifik, antara lain data kesehatan, biometrik,
genetika, catatan kejahatan, dan data anak (Pasal 4 ayat (2)), dan data bersifat umum, antara lain nama lengkap dan jenis kelamin serta
**data yang dikombinasikan untuk mengidentifikasi seseorang** (Pasal 4 ayat
(3)). Subjek data berhak, antara lain, memperoleh informasi (Pasal 5),
memperbaiki data (Pasal 6), mengakses dan memperoleh salinan (Pasal 7),
mengakhiri pemrosesan atau menghapus data (Pasal 8), menarik persetujuan
(Pasal 9), dan mengajukan keberatan atas keputusan yang hanya didasarkan pada
pemrosesan otomatis yang berdampak signifikan (Pasal 10 ayat (1)).
**Pengendali Data Pribadi** wajib punya dasar pemrosesan (Pasal 20), melindungi
keamanan data (Pasal 35), dan menjaga kerahasiaan (Pasal 36); bila terjadi
kegagalan pelindungan, ia wajib memberitahukan secara tertulis paling lambat
3 x 24 jam kepada subjek data dan lembaga (Pasal 46 ayat (1)). UU tidak
berlaku untuk pemrosesan oleh perseorangan dalam kegiatan pribadi atau rumah
tangga (Pasal 2 ayat (2)). Larangan pidana mencakup memperoleh atau
mengumpulkan data pribadi yang bukan miliknya secara melawan hukum untuk
keuntungan dan merugikan subjek (Pasal 65 ayat (1)).

Pertanyaan prediksi dijawab oleh program kecil ini: tabel tanpa nama, hanya
(prodi, angkatan), dan program menghitung ukuran tiap kelompok:

```cpp
#include <iostream>
#include <map>
#include <string>
#include <utility>
#include <vector>

int main() {
    // Data sintetis: tanpa nama, hanya atribut yang tampak "tidak berbahaya".
    std::vector<std::pair<std::string, int>> catatan = {
        {"Biologi", 2023}, {"Biologi", 2023}, {"Biologi", 2023},
        {"Biologi", 2024}, {"Hukum", 2023},   {"Hukum", 2023},
        {"Fisika", 2022},
    };

    std::map<std::pair<std::string, int>, int> ukuran;
    for (const auto& c : catatan) {
        ukuran[c] += 1;
    }

    for (const auto& kelompok : ukuran) {
        std::cout << kelompok.first.first << " " << kelompok.first.second
                  << " : " << kelompok.second
                  << (kelompok.second == 1 ? "  <- tunggal, mudah dikenali" : "")
                  << "\n";
    }
    return 0;
}
```

Keluaran:

```text
Biologi 2023 : 3
Biologi 2024 : 1  <- tunggal, mudah dikenali
Fisika 2022 : 1  <- tunggal, mudah dikenali
Hukum 2023 : 2
```

Dua baris bertanda `<-` adalah satu-satunya orang pada kelompoknya: siapa pun
yang tahu bahwa ada mahasiswa Fisika angkatan 2022 di kampus itu dapat mengenali
barisnya. Itulah arti "dikombinasi" pada definisi Data Pribadi: **menghapus
nama tidak otomatis membuatnya anonim**. Karena itu aturan pertama adalah
**meminimalkan**: jangan kumpulkan atau simpan yang tidak perlu. Penyamaran
hanya mengurangi risiko. Contoh kecil menyamarkan surel (domain `.example`
fiktif):

```cpp
#include <iostream>
#include <string>

std::string samarkan_surel(const std::string& surel) {
    const std::size_t at = surel.find('@');
    if (at == std::string::npos || at == 0) {
        return "[bukan surel]";
    }
    return surel.substr(0, 1) + "***" + surel.substr(at);
}

int main() {
    std::cout << samarkan_surel("ani@kampus.example") << "\n";
    std::cout << samarkan_surel("@kampus.example") << "\n";
    std::cout << samarkan_surel("tanpa-at") << "\n";
    return 0;
}
```

Keluaran:

```text
a***@kampus.example
[bukan surel]
[bukan surel]
```

Hasil pertama masih memuat huruf awal dan domain: gabungan keduanya dengan
informasi lain dapat mengenali orangnya.

### Contoh setengah jadi

Sebuah aplikasi kampus (fiktif) menyimpan nama, NIM, surel, dan lokasi
kunjungan. Isi tabel: tiap kolom, perlu atau tidak, dan alasannya; lalu
sebutkan satu kolom yang kamu hapus dan satu yang kamu samarkan.

### Latihan

1. **Ubah:** tambahkan satu catatan ke tabel prodi dan angkatan sehingga satu
   kelompok tunggal menjadi dua; apa yang berubah pada risiko?
2. **Buat:** tulis kebijakan privasi satu halaman untuk aplikasi fiktif:
   data apa, untuk apa, berapa lama, hak pengguna.
3. **Jelaskan:** mengapa menghapus nama tidak sama dengan anonim, dengan
   merujuk pada Pasal 1 butir 1.
4. **Berpasangan:** satu orang membuat tabel sintetis, satu orang mencari
   baris yang dapat dikenali.

## Bagian 4: Dampak sosial dan profesi (pertemuan 11 dan 12)

### Prediksi dulu

Sebuah aplikasi pencocokan pekerjaan fiktif meningkatkan efisiensi perekrutan
30 persen (angka karangan). Sebutkan tiga kelompok yang dapat diuntungkan dan
tiga yang dapat dirugikan.

### Contoh terselesaikan

Yang diuntungkan: perusahaan (waktu seleksi), pelamar yang cocok dengan pola
data, penyedia aplikasi. Yang dapat dirugikan: pelamar yang polanya tidak
terwakili dalam data, pelamar tanpa akses internet atau perangkat, pekerja
perekrut yang tugasnya berubah, dan orang yang ditolak tanpa penjelasan. Satu
angka efisiensi menyembunyikan **distribusi**: siapa menanggung biaya, siapa
menikmati manfaat. Kemampuan intinya adalah mengajukan tiga pertanyaan pada
setiap sistem: siapa yang tidak terwakili di data, siapa yang tidak punya
akses, dan siapa yang dapat meminta penjelasan atau koreksi.

**Profesi** berarti pekerjaan dengan tanggung jawab kepada pihak yang tidak
dapat menilai mutu kerjamu sendiri. Beberapa kebiasaan profesional yang dapat
kamu latih sekarang: jujur tentang batas kemampuan dan ketidakpastian;
tidak menandatangani atau menyerahkan yang tidak kamu uji atau pahami;
menjaga kerahasiaan; mencatat keputusan penting; meminta tinjauan sejawat
untuk bagian berisiko; dan terus belajar. Kejujuran berlaku juga pada bahan
yang kamu pakai: mengungkapkan kode dari luar dan keluaran AI, serta tidak
menyebut diri mampu yang tidak kamu uji.

### Contoh setengah jadi

Pilih satu aplikasi atau sistem yang kamu pakai sehari-hari. Isi: kelompok yang
diuntungkan, kelompok yang dirugikan, siapa yang tidak terwakili, siapa yang
tidak punya akses, dan siapa yang dapat meminta koreksi.

### Latihan

1. **Ubah:** ubah kasus perekrutan menjadi kasus layanan publik (misalnya
   penjadwalan antrean fiktif); apa yang berbeda tentang siapa yang dirugikan?
2. **Buat:** satu halaman tentang tiga kebiasaan profesional yang akan kamu
   terapkan dalam proyek berikutnya, masing-masing dengan contoh konkret.
3. **Jelaskan:** mengapa angka rata-rata manfaat tidak cukup untuk menilai
   dampak sosial.

## Bagian 5: Tata kelola AI (pertemuan 13 dan 14)

Tata kelola adalah cara organisasi memutuskan, mencatat, dan mengawasi
pemakaian suatu teknologi. Di Indonesia, **Surat Edaran Menteri Komunikasi
dan Informatika Nomor 9 Tahun 2023 tentang Etika Kecerdasan Artifisial**
(ditetapkan 19 Desember 2023) adalah pedoman etika; ditujukan kepada pelaku
usaha aktivitas pemrograman berbasis kecerdasan artifisial dan penyelenggara
sistem elektronik lingkup publik dan privat, dan **bukan peraturan yang
mengikat langsung**.

### Prediksi dulu

Perusahaan fiktif ingin menulis kebijakan pemakaian AI karyawan. Tebak lima hal
yang harus ada dalam kebijakan itu, sebelum membaca contohnya.

### Contoh terselesaikan

Surat edaran itu menyebut sembilan nilai: inklusivitas, kemanusiaan, keamanan,
aksesibilitas, transparansi, kredibilitas dan akuntabilitas, pelindungan data
pribadi, pembangunan dan lingkungan berkelanjutan, dan kekayaan intelektual.
Pada bagian tanggung jawab ia memuat, antara lain, memastikan kecerdasan
artifisial tidak diselenggarakan sebagai penentu kebijakan atau pengambil
keputusan yang menyangkut kemanusiaan, dan memperhatikan manajemen risiko dan
manajemen krisis. Kerangka sukarela lain yang halamannya dibuka penyusun adalah
*AI Risk Management Framework* NIST, dan OWASP menyusun daftar risiko aplikasi
yang memakai model bahasa besar (misalnya pengungkapan informasi sensitif,
agensi berlebihan, dan misinformasi). Dari sumber-sumber itu dan dari modul
ini, **kebijakan pemakaian AI di tempat kerja** yang masuk akal memuat enam
hal (rancangan karangan penyusun, bukan ketentuan resmi):

| Unsur | Pertanyaan yang dijawab |
| --- | --- |
| Tujuan dan batas | Tugas apa yang boleh dibantu AI; tugas apa yang tidak (misalnya keputusan yang menyangkut kemanusiaan) |
| Data | Kelas data (publik, internal, rahasia, pribadi) dan mana yang boleh masuk layanan AI; aturan dasar: data pribadi, kata sandi, dan kunci tidak |
| Pengungkapan dan catatan | Kapan memberi tahu pihak lain; apa yang dicatat (alat, versi, tujuan, bagian yang dipakai) |
| Tinjauan manusia | Siapa yang menguji dan menyetujui sebelum hasil dipakai atau digabung |
| Hak cipta dan lisensi | Pemeriksaan lisensi kode dan konten; status hukum keluaran AI |
| Insiden dan pengawasan | Siapa dihubungi bila data bocor atau AI salah; tinjauan berkala |

**Hak cipta dan lisensi keluaran AI.** Teks UU Hak Cipta yang dibaca
mendefinisikan Pencipta sebagai "seorang atau beberapa orang" (Pasal 1 butir
2) dan tidak menyebut karya hasil AI. **Status hukum keluaran AI di Indonesia
masih berkembang dan belum terverifikasi di modul ini.** Pembanding hukum
Amerika Serikat, bukan Indonesia: Kantor Hak Cipta AS (Januari 2025) menulis
bahwa penggunaan AI sebagai alat tidak menghilangkan perlindungan atas unsur
ekspresif yang ditentukan manusia, tetapi "Prompts alone, however, at this
stage are unlikely to satisfy those requirements", dengan penilaian kasus per
kasus. Organisasi sebaiknya menulis di kebijakannya: keluaran AI diperiksa
lisensinya, pemakaiannya diungkapkan, dan keputusan status hukum diserahkan
kepada penasihat hukum.

### Contoh setengah jadi

Tulis versi satu halaman kebijakan pemakaian AI untuk kelompok kerja atau
organisasi mahasiswa fiktif yang mengisi keenam unsur tabel di atas. Pilih dua
unsur dan tulis satu contoh pelanggaran serta bagaimana kebijakan menangani.

### Latihan

1. **Ubah:** tambahkan unsur ketujuh yang menurutmu terlewat (misalnya biaya
   atau energi) dan jelaskan mengapa.
2. **Buat:** bandingkan kebijakanmu dengan sembilan nilai surat edaran;
   tandai nilai yang belum dicakup.
3. **Jelaskan:** mengapa surat edaran ini pedoman dan bukan peraturan yang
   langsung mengikat, dan apa artinya bagi organisasi kecil.
4. **Berpasangan:** tukar kebijakan; pasangan mencari satu situasi yang tidak
   dijawab oleh kebijakanmu.

## Latihan bercampur

Setelah bagian 2, 3, dan 4, kerjakan soal yang **tidak menyebut** topiknya.
Contoh: "Rekan timmu menempel potongan kode dari internet dan daftar email
pengguna ke asisten AI untuk dirapikan." Kamu memutuskan isu apa yang ada
(lisensi, privasi, tata kelola), apa yang kamu lakukan, dan apa yang kamu
catat. Kuis kumulatif (pertemuan 4, 7, 12, 14) berbentuk sama.

## Ulang berjarak

Kerjakan ulang tanpa melihat jawaban lama:

- satu minggu setelah bagian: tulis ulang satu analisis lima langkah atau satu
  ringkasan pasal tanpa melihat;
- awal tiap bagian baru: dua soal dari bagian sebelumnya;
- minggu sebelum ujian: tiga soal yang dahulu salah;
- semester berikutnya: tulis ulang daftar enam unsur kebijakan AI;
  `KUL-I-401` (proyek tim) memakai kebijakan AI tim dan log pemakaian,
  dan `KUL-I-303` memakai bahasan bias data pada bagian 4.

## Kebijakan AI dan log pemakaian

Silabus 6.3 belum menyatakan tingkat AI untuk mata kuliah ini; modul ini
memakai **usulan baku `[asumsi]`** (rancangan modul, keputusan pemilik
2026-11-19): **Hijau** untuk eksplorasi dan penelusuran bahan (AI boleh,
diungkapkan ringkas, log wajib), **Kuning** untuk esai dan analisis kasus
yang diserahkan (AI boleh menjelaskan konsep atau memeriksa penalaran yang
sudah kamu tulis, tidak menulis analisismu), dan **Merah** untuk ujian
tertulis. Dosen dapat mengubahnya per tugas. Karena penalaran etika
adalah keterampilan yang kamu latih, jangan menyerahkan keputusan etis
kepada AI; periksa semua kutipan pasal dari AI pada teks resmi, karena model
dapat mengarang nomor pasal atau isinya. Catat di repositorimu sendiri: alat dan
versi, tujuan, perintah, bagian keluaran yang dipakai. Jangan memasukkan data
pribadi, kata sandi, atau kunci ke layanan AI.

## Kesalahan umum

- **Menganggap etika berarti pendapat pribadi tanpa fakta.** Mulailah dari
  fakta dan pihak terdampak.
- **Mengira "publik" berarti bebas pakai.** Tanpa lisensi, tidak ada izin.
- **Mengira menghapus nama membuat data anonim.** Gabungan atribut mengenali.
- **Mengutip pasal dari ingatan atau dari AI tanpa membuka teks resminya.**
- **Mengutip ketentuan yang sudah dicabut.** Periksa status dan tanggal berlaku.
- **Menganggap pedoman etika sama dengan hukum yang mengikat.**

## Cek mandiri

Tutup modul, jawab, baru periksa.

1. Sebut lima langkah penalaran kasus di modul ini.
2. Apa arti "dikombinasi" pada definisi Data Pribadi, dan apa buktinya pada
   contoh tabel prodi dan angkatan?
3. Mengapa kode publik tanpa lisensi tidak bebas dipakai?
4. Sebut tiga hak subjek data pribadi.
5. Apa status SE 9/2023, dan siapa sasarannya?
6. Sebut tiga dari enam unsur kebijakan pemakaian AI di tempat kerja.

Daftar periksa (kosong; kamu isi sendiri, tidak dikumpulkan):

- [ ] Aku dapat menganalisis kasus dengan lima langkah dan alasan yang dapat dibantah.
- [ ] Aku dapat menjelaskan hak cipta dan lisensi serta mencatat ketergantungan.
- [ ] Aku dapat menjelaskan data pribadi, hak subjek, dan meminimalkan data.
- [ ] Aku dapat menyebut siapa diuntungkan dan dirugikan oleh sebuah sistem.
- [ ] Aku dapat menyusun kebijakan pemakaian AI satu halaman.

## Kunci dan petunjuk

- **Bagian 1:** tidak ada jawaban tunggal; analisis yang baik memuat fakta yang
  belum diketahui, semua pihak terdampak, minimal tiga pilihan, dan alasan yang
  dapat dibantah. Kasus 1: contoh keputusan di atas (C lalu D) hanyalah satu
  jawaban yang berargumen. Kasus 3: yang membedakan adalah izin, bukan niat.
- **Bagian 2:** prediksi: periksa lisensi; tanpa lisensi berarti tidak ada
  izin dan perlu meminta izin penulis atau tidak memakainya. Setengah jadi:
  teliti teks GPL-3.0 bagian 5(c); pilihan: ganti pustaka, ikuti lisensi GPL,
  atau minta izin; yang memutuskan: organisasi, bersama penasihat hukum.
- **Bagian 3:** keluaran program 1 dan 2 seperti tertulis; kelompok tunggal
  dapat dikenali. Latihan 1: menambah satu catatan `Fisika 2022` membuat
  kelompok itu berukuran dua dan risiko turun, tetapi tidak nol.
- **Bagian 4:** prediksi bebas; contoh jawaban ada di bagian contoh terselesaikan.
- **Bagian 5:** prediksi: tujuan dan batas, data, pengungkapan dan catatan,
  tinjauan manusia, hak cipta dan lisensi, insiden dan pengawasan.
- **Petunjuk bertahap bila macet:** (1) tulis fakta yang pasti dan yang belum
  diketahui; (2) tulis semua pihak terdampak, termasuk yang tidak hadir; (3)
  tulis tiga pilihan dan akibatnya sebelum memilih.

## Langkah berikutnya

`KUL-I-401` (Proyek Perangkat Lunak Tim) memakai lisensi, privasi, dan
kebijakan AI tim secara langsung. `KUL-I-303` (Kecerdasan Buatan dan
Pembelajaran Mesin) memperdalam bias dan etika model. Lulusan yang bekerja
memakai kerangka ini untuk memutuskan kasus nyata bersama pihak hukum.

## Catatan untuk dosen

- **Bobot dan bentuk asesmen (usulan; prodi menetapkan, silabus 6.1):** studi
  kasus dan esai, ujian tertulis tengah dan akhir tanpa AI, kuis kumulatif.
  Kisaran bobot silabus: tugas dan praktikum 30–40 persen, proyek 20–40, ujian
  praktik 20–30, ujian tertulis atau lisan 10–20; modul tidak menambah
  komponen.
- **Etika tanpa kunci tunggal:** nilai mutu penalaran dan keterkaitannya dengan
  fakta dan teks peraturan, bukan kecocokan dengan pendapat pengajar; sediakan
  rubrik untuk lima langkah.
- **Kasus:** semua kasus di modul fiktif; ganti dengan kasus karangan yang lebih
  dekat dengan bidang mahasiswa; jangan memakai orang atau perusahaan nyata.
- **Hukum:** modul hanya mengutip pasal yang terbaca pada teks resmi (UU 27/2022,
  UU 28/2014, UU 1/2023) dan menandai status hukum keluaran AI sebagai belum
  terverifikasi; ringkasan lisensi bukan penafsiran hukum. Undang pengajar
  hukum untuk bagian 2 dan 3.
- **Tingkat AI** pada bagian kebijakan adalah `[asumsi]`: ubah bila prodi
  punya ketentuan lain. Kode etik asosiasi profesi tidak dikutip karena
  halamannya tidak dapat dibuka penyusun pada 2026-11-19; dosen dapat
  menambahkan kode etik yang berlaku untuk bidang itu.

## Rujukan

- Undang-Undang Nomor 27 Tahun 2022 tentang Pelindungan Data Pribadi, JDIH
  BPK (teks asli; Pasal 1, 2, 4 sampai 10, 20, 35, 36, 46, 65 dibaca
  2026-11-19): <https://peraturan.bpk.go.id/Details/229798/uu-no-27-tahun-2022>
- Undang-Undang Nomor 28 Tahun 2014 tentang Hak Cipta, JDIH BPK (teks asli;
  Pasal 1, 9, 40 dibaca 2026-11-19):
  <https://peraturan.bpk.go.id/Details/38690/uu-no-28-tahun-2014>
- Undang-Undang Nomor 1 Tahun 2023 tentang Kitab Undang-Undang Hukum Pidana,
  JDIH BPK (teks asli; Pasal 332, 622, 624 dibaca 2026-11-19):
  <https://peraturan.bpk.go.id/Details/234935/uu-no-1-tahun-2023>
- Surat Edaran Menteri Komunikasi dan Informatika Nomor 9 Tahun 2023 tentang
  Etika Kecerdasan Artifisial, JDIH Komdigi (pedoman etika, bukan peraturan
  yang mengikat langsung; dibuka 2026-11-19):
  <https://jdih.komdigi.go.id/produk_hukum/view/id/883/t/surat+edaran+menteri+komunikasi+dan+informatika+nomor+9+tahun+2023>
- GNU General Public License v3.0, teks lengkap, gnu.org (bagian 5 dibaca
  2026-11-19): <https://www.gnu.org/licenses/gpl-3.0.html>
- Creative Commons, *Attribution-ShareAlike 4.0 International* (ringkasan
  lisensi, dibuka 2026-11-19): <https://creativecommons.org/licenses/by-sa/4.0/>
- Choose a License, *MIT*, *Apache-2.0*, *GPL-3.0* (ringkasan, dibuka
  2026-11-19): <https://choosealicense.com/>
- SPDX License List (dibuka 2026-11-19): <https://spdx.org/licenses/>
- NIST, *AI Risk Management Framework* (halaman ringkasan; teks kerangka tidak
  dibaca; dibuka 2026-11-19):
  <https://www.nist.gov/itl/ai-risk-management-framework>
- OWASP Gen AI Security Project, *OWASP Top 10 for LLM Applications 2025*
  (daftar sepuluh risiko; dibuka 2026-11-19): <https://genai.owasp.org/llm-top-10/>
- U.S. Copyright Office, *Copyright and Artificial Intelligence, Part 2:
  Copyrightability* (Januari 2025; hukum AS; dibuka 2026-11-19):
  <https://www.copyright.gov/ai/Copyright-and-Artificial-Intelligence-Part-2-Copyrightability-Report.pdf>
- ACM/IEEE-CS/AAAI, *Computer Science Curricula 2023*, knowledge area SEP
  (dibuka 2026-11-19): <https://csed.acm.org/knowledge-areas/>
