## Untuk siapa modul ini

Modul ini untuk murid kelas XII jalur E (komputasi kuantum), minggu `E-XII1-M11` silabus v1.4: peran cloud quantum, yaitu alur dari sirkuit sampai hasil, kuota, biaya, dan batas akun, dengan keluaran diagram alur cloud quantum. Prasyarat: modul `e-xii1-m10`. Murid **tidak membuat akun dan tidak memakai layanan cloud quantum**; guru menelaah ketentuan layanan bersama kelas, dan blok Python di modul ini hanya **demonstrasi guru** tanpa akun. Di luar indeks, bagian kode (antrean tiruan) memerlukan dasar pemrograman setara `A-X1-M9..M12` (C++); bagian konsep terbuka bagi semua murid. Alat: kertas, kalkulator, dan simulatormu atau program C++ kecil di bawah.

Modul ini berstatus DRAF: karangan penyusun, belum ditinjau pemilik. Jalur E adalah pengayaan di luar rumusan CP; minggu ini tanpa irisan pengayaan, jadi modul ini tidak dihitung memenuhi butir CP mana pun.

Aturan AI jalur ini: AI generatif boleh dipakai dengan etika dan dicatat, tanpa data pribadi, kata sandi, atau tugas bernilai pada permintaanmu, dan tanpa akun wajib. Saran: jawab dulu sendiri, baru minta petunjuk bertahap; kode buatan AI kamu baca, jalankan, dan uji. Setiap soal `Latihan` bertanda `AI: boleh` atau `AI: tanpa AI`.

Catatan untuk guru: semua klaim layanan di bawah dibaca dari halaman resmi IBM Quantum, **per tanggal akses 2026-11-19**, dan dapat berubah: jenis paket, jatah, satuan RU, penjadwal, status pekerjaan, daftar gerbang dasar, retensi data, dan tarif awal. Syarat usia akun dan ketentuan layanan tidak berhasil penyusun baca dari halaman yang dibuka (halaman ketentuan hanya menampilkan layar masuk), jadi syarat usia `[belum terverifikasi]`: baca sendiri sebelum membuat akun atas nama sekolah atau lembaga. Tarif adalah tarif awal ("mulai dari") yang tercantum di halaman harga; periksa lagi.

## Ingat kembali

Jawab dari ingatan, baru cek di bagian kunci.

1. Apa yang dihitung sebagai query pada pencarian Grover, dan apa yang tidak dihitung? (dari `e-xii1-m3`)
2. Pada Grover `N = 8`, berapa peluang item bertanda setelah `t = 1`, `2`, dan `3`, dan mengapa `t = 3` lebih kecil daripada `t = 2`? (dari `e-xii1-m10`)
3. Bila satu gerbang bersih dengan peluang 0,99, berapa peluang 100 gerbang bersih, dan mengapa turunnya secepat itu? (dari `e-xii1-m8`)

## Tujuan

Setelah modul ini kamu dapat:

- menggambar alur cloud quantum: sirkuit, kompilasi ke gerbang perangkat, antrean, eksekusi, hasil;
- membedakan waktu menunggu dari waktu pemakaian yang dihitung, dan menghitung biaya contoh dari tarif bersumber;
- menyebut hal yang harus ditelaah pada ketentuan layanan sebelum akun dibuat, termasuk data pekerjaan yang tersimpan.

Keluaran yang diminta silabus: diagram alur cloud quantum.

## Prediksi dulu

Antrean karangan untuk satu perangkat berisi enam pekerjaan orang lain, lalu pekerjaan kita. Lama eksekusi (detik): 40, 300, 12, 90, 600, 25, dan milik kita 8. Tebak dan tulis: (1) berapa detik sampai hasil kita tiba bila antrean berjalan satu per satu; (2) berapa detik yang dihitung sebagai pemakaian kita; (3) berapa pekerjaan 8 detik muat dalam jatah 10 menit; (4) biaya satu pekerjaan 8 detik bila tarifnya 96 USD per menit.

## Contoh terselesaikan

**Alur.** Lima langkah, dan hanya satu yang berjalan di perangkat kuantum:

```text
sirkuit -> kompilasi -> antrean -> eksekusi di perangkat -> hasil
(komputer   (gerbang    (menunggu   (QPU terkunci            (histogram
 guru)       perangkat)  giliran)    selama pekerjaan)         agregat)
```

Kompilasi mengubah gerbangmu menjadi gerbang dasar perangkat dan menyesuaikan sambungan antarqubit; halaman IBM menyebut gerbang dasar seperti RZ, SX, X, dan CZ. Penjadwal memilih pekerjaan berikutnya dengan adil antar kelompok pengguna (instance), dan dalam satu instance yang terlama dulu. Status pekerjaan: menunggu, berjalan, selesai, gagal, atau dibatalkan; status "berjalan" bisa lama karena pekerjaan menunggu giliran perangkat.

Blok Python **demonstrasi guru, tidak dijalankan murid** memperlihatkan kompilasi secara lokal, tanpa akun dan tanpa jaringan:

```python
# demonstrasi guru, tidak dijalankan murid
# Kompilasi lokal ke himpunan gerbang perangkat; tanpa akun, tanpa token, tanpa jaringan.
import qiskit
from qiskit import QuantumCircuit
from qiskit.transpiler import generate_preset_pass_manager

print("Qiskit", qiskit.__version__)

bell = QuantumCircuit(2)
bell.h(0)
bell.cx(0, 1)
bell.measure_all()
print("sebelum:", dict(bell.count_ops()), "kedalaman", bell.depth())

# Himpunan gerbang contoh: CZ, RZ, SX, X (daftar gerbang dasar pada halaman IBM Quantum).
pm = generate_preset_pass_manager(
    basis_gates=["cz", "rz", "sx", "x"],
    coupling_map=[[0, 1], [1, 0]],
    optimization_level=1,
)
isa = pm.run(bell)
print("sesudah:", dict(isa.count_ops()), "kedalaman", isa.depth())
```

Keluaran asli (dijalankan penyusun, Qiskit 2.6.2, Python 3.14.6):

```text
Qiskit 2.6.2
sebelum: {'measure': 2, 'h': 1, 'cx': 1, 'barrier': 1} kedalaman 3
sesudah: {'rz': 6, 'sx': 3, 'measure': 2, 'cz': 1, 'barrier': 1} kedalaman 8
```

Dua gerbang (H dan CNOT) menjadi sepuluh gerbang dasar (enam RZ, tiga SX, satu CZ), dan kedalaman naik dari 3 menjadi 8: kompilasi menambah pekerjaan, dan makin banyak gerbang makin besar kesalahan (`e-xii1-m8`).

**Antrean tiruan dan biaya.** Program di bawah menghitung hasil antrean karangan di atas dan biaya contoh. Satu RU sama dengan satu menit waktu QPU untuk beban kerja QPU baku (halaman IBM).

```cpp
#include <cstdio>
#include <vector>

int main() {
    // Antrean karangan untuk satu perangkat: lama eksekusi tiap pekerjaan (detik).
    // Pekerjaan terakhir adalah pekerjaan kita.
    std::vector<double> durasi = {40, 300, 12, 90, 600, 25, 8};

    double tunggu = 0.0;
    for (size_t i = 0; i + 1 < durasi.size(); i++) tunggu += durasi[i];
    double milik = durasi.back();
    std::printf("menunggu %.0f detik, dieksekusi %.0f detik, hasil tiba setelah %.0f detik\n", tunggu, milik,
                tunggu + milik);
    std::printf("yang dihitung sebagai pemakaian: %.0f detik dari %.0f detik\n", milik, tunggu + milik);

    // 1 RU = 1 menit waktu QPU untuk beban kerja QPU baku. Jatah contoh 10 menit per 28 hari.
    double ru_satu = milik / 60.0;
    double jatah_menit = 10.0;
    int jumlah = int(jatah_menit / ru_satu);
    std::printf("satu pekerjaan = %.4f RU; jatah %.0f RU memuat %d pekerjaan seperti ini\n", ru_satu, jatah_menit,
                jumlah);

    // Tarif awal paket bayar-sesuai-pakai menurut halaman harga IBM Quantum per 2026-11-19
    // (USD per menit). Periksa lagi halaman resminya sebelum memakai angka ini.
    double tarif = 96.0;
    std::printf("biaya contoh satu pekerjaan = %.4f menit x %.2f USD = %.2f USD\n", ru_satu, tarif,
                ru_satu * tarif);
    return 0;
}
```

Keluaran asli (dikompilasi penyusun dengan `g++ -std=c++17 -Wall -Wextra`, lalu dijalankan):

```text
menunggu 1067 detik, dieksekusi 8 detik, hasil tiba setelah 1075 detik
yang dihitung sebagai pemakaian: 8 detik dari 1075 detik
satu pekerjaan = 0.1333 RU; jatah 10 RU memuat 75 pekerjaan seperti ini
biaya contoh satu pekerjaan = 0.1333 menit x 96.00 USD = 12.80 USD
```

Bacaan hasilnya: hasil tiba setelah sekitar 18 menit, tetapi hanya 8 detik yang dihitung sebagai pemakaian. Menunggu tidak ditagih; yang dihitung adalah waktu perangkat terkunci untuk pekerjaanmu.

**Kuota, biaya, dan data (per 2026-11-19, dari halaman IBM).** Paket Open gratis dengan jatah setara 10 menit; halaman dokumentasi "Plans overview" menyebut per jendela bergulir 28 hari, halaman harga ibm.com/quantum/pricing menyebut "per bulan" (per 2026-11-19 keduanya masih berbeda), jadi periksa; paket Open hanya tersedia di wilayah us-east menurut tanya-jawab resmi. Paket bayar-sesuai-pakai mulai 96 USD per menit, ditagih per detik; paket Flex mulai 72 USD per menit (paling sedikit 400 menit per tahun); ada juga paket Premium (mulai 48 USD per menit, paling sedikit 5200 menit per tahun) yang tidak dipakai di sini. Halaman tanya-jawab menyebut IBM menyimpan data pekerjaan dan pemakaian yang tidak dihapus selama tiga tahun, wilayah yang dipilih menentukan tempat data disimpan, dan akun paket Open bisa diminta mengisi kartu kredit walau tidak ditagih. Karena itu: hanya satu akun atas nama sekolah atau lembaga yang dipakai guru, tanpa akun murid, tanpa token atau kunci di berkas modul, label pekerjaan sintetis (mis. `kelas-demo-01`), dan hanya histogram agregat yang dibagikan.

**Batasnya.** Antrean tiruan hanya satu per satu; penjadwal nyata memakai pembagian adil antar pengguna dan hasilnya berbeda. Tarif dan jatah berubah.

## Contoh setengah jadi

Lengkapi (kunci di bagian akhir).

1. Pekerjaan 20 detik sama dengan ____ RU; pada 96 USD per menit biayanya ____ USD.
2. Lengkapi:

```cpp setengah-jadi
double ru_satu = milik / ____;  // 1 RU = 1 menit = 60 detik
int jumlah = int(jatah_menit / ____);
```

## Soal Parsons

Susun baris-baris di bawah (sudah diacak) menjadi bagian awal `main` pada program antrean. Kurung kurawal penutup sengaja dihilangkan.

```text
(a)     double tunggu = 0.0;
(b)     for (size_t i = 0; i + 1 < durasi.size(); i++) tunggu += durasi[i];
(c)     double milik = durasi.back();
(d)     std::vector<double> durasi = {40, 300, 12, 90, 600, 25, 8};
(e)     std::printf("menunggu %.0f detik\n", tunggu);
```

## Latihan

1. **Susun alur.** (`AI: tanpa AI`) Urutkan: (a) histogram diterima; (b) sirkuit ditulis; (c) pekerjaan menunggu antrean; (d) sirkuit dikompilasi ke gerbang perangkat; (e) pekerjaan dieksekusi di perangkat.
2. **Hitung.** (`AI: boleh`) Pekerjaan 20 detik pada tarif 96 USD per menit: berapa RU, berapa USD, dan berapa pekerjaan seperti itu dalam jatah 10 menit?
3. **Gambar.** (`AI: boleh`) Gambar diagram alur cloud quantum, tandai bagian yang ada di komputer guru dan yang di penyedia, serta titik data keluar dari sekolah.
4. **Telaah.** (`AI: tanpa AI`) Tulis lima pertanyaan yang harus dijawab ketentuan layanan sebelum sekolah membuat akun.
5. **Catatan pemakaian AI (opsional).** Bila memakai asisten AI, catat alat, tujuan, garis besar perintah, bagian yang dipakai, dan cara memeriksanya.

## Latihan bercampur

1. Grover `N = 8` dengan `t = 2` berpeluang 0,9453. Dari satu pekerjaan 1000 shot, berapa hasil benar yang diharapkan? (`e-xii1-m10`)
2. Dengan peluang satu gerbang bersih 0,997, berapa peluang 100 gerbang bersih? (`e-xii1-m8`)

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `e-xii1-m12` (satu minggu lagi), `e-xii1-m14` (sekitar tiga minggu lagi), dan `e-xii2-m5` (sekitar delapan minggu lagi). Jawab sekarang lalu simpan.

1. Sebutkan lima langkah alur cloud quantum berurutan dan tandai mana yang dihitung sebagai pemakaian.
2. Mengapa waktu menunggu antrean tidak sama dengan pemakaian yang ditagih?
3. Mengapa sekolah tidak membuat akun cloud quantum untuk murid, dan apa yang tidak boleh ada pada label pekerjaan?

## Kesalahan umum

- **"Cloud quantum berarti komputer kuantum ada di laptopku."** Sirkuit dikirim lewat internet ke perangkat milik penyedia; yang kembali hanya hasil.
- **"Sirkuitku dijalankan apa adanya."** Ia dikompilasi ke gerbang dasar perangkat, dan gerbangnya bertambah.
- **"Waktu menunggu ikut ditagih."** Yang dihitung waktu perangkat terkunci untuk pekerjaanmu.
- **"Paket gratis tanpa syarat dan tanpa jejak data."** Ada jatah, bisa ada permintaan data pembayaran, dan data pekerjaan disimpan.
- **"Tarif di modul adalah harga sekarang."** Itu tarif awal per 2026-11-19; periksa lagi.

## Cek mandiri

- [ ] Saya dapat menggambar alur cloud quantum dan menyebut tiap langkahnya.
- [ ] Saya dapat membedakan waktu tunggu dari pemakaian dan menghitung biaya contoh.
- [ ] Saya dapat menyebut hal yang ditelaah pada ketentuan layanan.
- [ ] Saya tahu mengapa tidak ada akun murid dan token tidak boleh ada di berkas.
- [ ] Saya mencatat pemakaian AI bila saya memakainya.

## Kunci dan petunjuk

**Ingat kembali.** 1: yang dihitung: banyak pemanggilan oracle (pengulangan); yang tidak dihitung: biaya membangun oracle dan biaya simulasi. 2: 0,7812; 0,9453; 0,3301; amplitudo item bertanda berputar melewati titik terbaik pada `t = 3`. 3: `0,99^100` = 0,366; tiap gerbang mengalikan peluang dengan 0,99, jadi turun eksponensial.

**Prediksi dulu.** (1) 1067 + 8 = 1075 detik. (2) 8 detik. (3) `600 / 8` = 75. (4) `(8 / 60) x 96` = 12,80 USD.

**Contoh setengah jadi.** 1: `20 / 60` = 0,3333 RU; `0,3333 x 96` = 32,00 USD. 2: `60.0` dan `ru_satu`. Kunci ini dikompilasi dan dijalankan penyusun (potongan itu ada di program di atas).

**Soal Parsons.** d, a, b, c, e (baris c boleh juga sebelum a asal setelah d).

**Latihan.** 1: b, d, c, e, a. 2: 0,3333 RU; 32,00 USD; `600 / 20` = 30 pekerjaan. 3: contoh isi: komputer guru memegang sirkuit dan kunci akses; penyedia memegang antrean, perangkat, dan data pekerjaan; data keluar dari sekolah saat sirkuit dikirim. 4: contoh: berapa usia minimum pemilik akun; apa yang disimpan dan berapa lama; di wilayah mana data disimpan; apa batas jatah dan siapa yang menanggung biaya bila melebihi; apakah akun bisa ditutup dan datanya dihapus. 5: opsional.

**Latihan bercampur.** 1: `1000 x 0,9453` = 945 hasil benar. 2: `0,997^100` = 0,7405.

**Ulang berjarak.** 1: sirkuit; kompilasi; antrean; eksekusi di perangkat; hasil; hanya eksekusi di perangkat yang dihitung sebagai pemakaian. 2: antrean adalah waktu menunggu giliran, sedangkan yang ditagih adalah waktu perangkat terkunci untuk pekerjaanmu; contoh 1067 detik tunggu lawan 8 detik pakai. 3: data pekerjaan disimpan penyedia dan akun dapat meminta data pembayaran, jadi akun hanya atas nama sekolah atau lembaga; label pekerjaan tidak boleh memuat nama atau penanda murid, token, atau kunci.

## Langkah berikutnya

Modul berikut: `e-xii1-m12` (demonstrasi cloud quantum oleh guru). Bacaan pendamping: `e-xii1-m8` dan bacaan pendamping `cloud-keamanan-dan-privasi` serta `cloud-biaya-dan-tagihan`.
