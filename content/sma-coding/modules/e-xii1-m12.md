## Untuk siapa modul ini

Modul ini untuk murid kelas XII jalur E (komputasi kuantum), minggu `E-XII1-M12` silabus v1.4: demonstrasi cloud quantum oleh guru, yaitu mengamati satu pekerjaan Bell kecil pada perangkat nyata dan membandingkannya dengan simulator, dengan keluaran histogram perangkat lawan simulator. Prasyarat: modul `e-xii1-m11`. **Hanya guru** yang memakai akun sekolah atau lembaga; murid mengamati layar guru atau hasil agregatnya, **tanpa akun murid, tanpa token, tanpa kunci**. Bila akses tidak tersedia, kelas memakai arsip sintetis di modul ini, yang bukan hasil perangkat nyata. Di luar indeks, bagian kode (pembanding histogram) memerlukan dasar pemrograman setara `A-X1-M9..M12` (C++); bagian konsep terbuka bagi semua murid. Alat murid: kertas, kalkulator, dan program C++ kecil di bawah.

Modul ini berstatus DRAF: karangan penyusun, belum ditinjau pemilik. Jalur E adalah pengayaan di luar rumusan CP; minggu ini tanpa irisan pengayaan, jadi modul ini tidak dihitung memenuhi butir CP mana pun.

Aturan AI jalur ini: AI generatif boleh dipakai dengan etika dan dicatat, tanpa data pribadi, kata sandi, atau tugas bernilai pada permintaanmu, dan tanpa akun wajib. Saran: jawab dulu sendiri, baru minta petunjuk bertahap; kode buatan AI kamu baca, jalankan, dan uji. Setiap soal `Latihan` bertanda `AI: boleh` atau `AI: tanpa AI`.

Catatan untuk guru: **penyusun tidak punya akun cloud quantum dan tidak menjalankan pekerjaan apa pun**; blok Python di bawah hanya diperiksa sintaksisnya, dan keluarannya ditulis sebagai contoh bentuk, bukan hasil. Bentuk kode mengikuti halaman IBM Quantum "Run your first circuit on hardware", "Sampler examples", dan "Monitor or cancel a job", per tanggal akses 2026-11-19; antarmuka pustaka berubah cepat, jadi cocokkan dengan halaman terkini sebelum menjalankan. Impor `qiskit_ibm_runtime.executor_sampler.Sampler` (Sampler sisi klien) tertulis pada halaman "Sampler examples" dan, menurut halaman itu, diperkenalkan di `qiskit-ibm-runtime` 0.50.0; halaman yang sama juga mencantumkan pin `~=0.47.0`, jadi pastikan versi terpasang 0,50 atau lebih (versi terbaru di PyPI per 2026-11-19: 0.52.1; Qiskit 2.6.2). `get_counts()` pada hasil `PubResult.data.meas` tertulis pada halaman "Hello world". Angka kesalahan di arsip sintetis (gerbang dua qubit 0,003 dan baca 0,0234) diambil dari contoh keluaran halaman "View backend details", per 2026-11-19; itu contoh pada halaman itu, bukan kondisi perangkat yang akan kamu pakai. Jangan menampilkan token, CRN, atau nama akun di layar; perekaman layar hanya tanpa data pribadi.

## Ingat kembali

Jawab dari ingatan, baru cek di bagian kunci.

1. Berapa amplitudo yang harus disimpan simulator untuk `n` qubit, dan apa akibatnya bagi `n = 30`? (dari `e-xii1-m4`)
2. Sebutkan lima langkah alur cloud quantum berurutan dan tandai mana yang dihitung sebagai pemakaian. (dari `e-xii1-m11`)
3. Apa yang dilakukan `StatevectorSampler`, dan apa yang tidak dimodelkannya dibanding perangkat nyata? (dari `e-xii1-m9`)

## Tujuan

Setelah modul ini kamu dapat:

- menyebut langkah demonstrasi satu pekerjaan Bell dan data apa yang boleh dan tidak boleh dicatat;
- membandingkan histogram perangkat dan simulator ideal dengan jarak variasi total dan simpangan wajar;
- menjelaskan selisihnya dengan sumber derau, tanpa mengklaim lebih dari yang dikatakan data.

Keluaran yang diminta silabus: histogram perangkat lawan simulator.

## Prediksi dulu

Sebelum guru menunjukkan hasil, tebak dan tulis untuk sirkuit Bell dengan 4000 shot pada perangkat nyata: (1) hasil apa saja yang muncul; (2) apakah `01` dan `10` persis nol; (3) kira-kira berapa persen shot berupa hasil terlarang (`01` atau `10`), dalam rentang tebakan.

## Contoh terselesaikan

**Langkah demonstrasi (guru).** Pertama, masuk memakai akun sekolah atau lembaga yang kredensialnya sudah tersimpan di komputer guru. Kedua, buat sirkuit Bell dan kompilasi untuk perangkat (`e-xii1-m11`). Ketiga, kirim satu pekerjaan kecil. Keempat, tunggu giliran; status pekerjaan ditampilkan. Kelima, baca histogram agregat, bukan data per shot. Keenam, catat hanya: label sintetis, jumlah shot, histogram agregat, dan tanggal akses; jangan catat nama akun, token, CRN, atau nama murid. Label `kelas-demo-01` hanya penanda di layar dan catatan.

Blok Python **demonstrasi guru, tidak dijalankan murid** (tidak dijalankan penyusun; hanya diperiksa sintaksisnya):

```python
# demonstrasi guru, tidak dijalankan murid
# Dijalankan guru lewat akun sekolah atau lembaga yang kredensialnya sudah tersimpan
# di komputer guru. Tidak ada token, kunci, atau CRN di berkas ini.
from qiskit import QuantumCircuit
from qiskit.transpiler import generate_preset_pass_manager
from qiskit_ibm_runtime import QiskitRuntimeService
from qiskit_ibm_runtime.executor_sampler import Sampler  # sesuai halaman "Sampler examples" per 2026-11-19

LABEL = "kelas-demo-01"  # label sintetis untuk layar dan catatan; bukan nama murid atau kelas nyata

bell = QuantumCircuit(2)
bell.h(0)
bell.cx(0, 1)
bell.measure_all()

service = QiskitRuntimeService()  # memakai kredensial tersimpan milik guru
backend = service.least_busy(operational=True, simulator=False)
isa = generate_preset_pass_manager(backend=backend, optimization_level=1).run(bell)

sampler = Sampler(mode=backend)
job = sampler.run([isa])
print(LABEL, "status:", job.status())  # menunggu antrean (e-xii1-m11)
hasil = job.result()[0]
print(LABEL, "histogram agregat:", hasil.data.meas.get_counts())
```

Bentuk keluaran (contoh bentuk, **bukan hasil**; tidak ada angka karena blok ini tidak dijalankan):

```text
kelas-demo-01 status: <status pekerjaan>
kelas-demo-01 histogram agregat: {'00': <jumlah>, '01': <jumlah>, '10': <jumlah>, '11': <jumlah>}
```

**Arsip sintetis.** Untuk kelas tanpa akses, penyusun membangkitkan histogram dari model derau sederhana (kesalahan gerbang `p = 0,003`, kesalahan baca `r = 0,0234`, 4000 shot) di komputer biasa. **Ini bukan data perangkat nyata**, dan model itu sama dengan yang kamu pakai di `e-xii1-m13`. Program berikut membandingkannya dengan simulator ideal.

```cpp
#include <cmath>
#include <cstdio>

int main() {
    const char* nama[4] = {"00", "01", "10", "11"};
    const double ideal[4] = {0.5, 0.0, 0.0, 0.5};  // simulator tanpa derau
    // ARSIP SINTETIS (label kelas-demo-01): dibangkitkan dengan model derau di komputer,
    // BUKAN hasil perangkat nyata. Ganti dengan histogram agregat guru bila ada.
    const int arsip[4] = {1926, 106, 86, 1882};
    const int shot = 4000;

    double tvd = 0.0;
    std::printf("hasil  ideal   arsip    selisih  z\n");
    for (int i = 0; i < 4; i++) {
        double frak = arsip[i] / double(shot);
        double sigma = std::sqrt(shot * ideal[i] * (1.0 - ideal[i]));
        tvd += 0.5 * std::fabs(frak - ideal[i]);
        std::printf("%s     %.4f  %.4f  %+.4f  ", nama[i], ideal[i], frak, frak - ideal[i]);
        if (sigma > 0.0)
            std::printf("%+.2f\n", (arsip[i] - shot * ideal[i]) / sigma);
        else
            std::printf("(peluang ideal 0)\n");
    }
    std::printf("jarak variasi total = %.4f\n", tvd);
    std::printf("bagian hasil terlarang (01 atau 10) = %.4f\n", (arsip[1] + arsip[2]) / double(shot));
    return 0;
}
```

Keluaran asli (dikompilasi penyusun dengan `g++ -std=c++17 -Wall -Wextra`, lalu dijalankan):

```text
hasil  ideal   arsip    selisih  z
00     0.5000  0.4815  -0.0185  -2.34
01     0.0000  0.0265  +0.0265  (peluang ideal 0)
10     0.0000  0.0215  +0.0215  (peluang ideal 0)
11     0.5000  0.4705  -0.0295  -3.73
jarak variasi total = 0.0480
bagian hasil terlarang (01 atau 10) = 0.0480
```

Bacaan hasilnya: simulator ideal tidak pernah memberi `01` atau `10`, tetapi arsip memberi 4,8 persen. Hasil `11` menyimpang 3,7 simpangan dari 0,5, di luar tiga simpangan, jadi acak shot saja tidak menjelaskannya; ada sebab lain. Sebabnya dua: kesalahan baca (peluang satu bit salah `r`, jadi hasil terlarang sekitar `2r(1 - r)` = 0,046) dan kesalahan gerbang (sekitar `p/2` = 0,0015); jumlahnya mendekati 0,048. Kecocokan ini wajar karena arsip dibangkitkan dari model yang sama; ia **tidak** membuktikan bahwa perangkat nyata berperilaku begitu. Pada data nyata, selisih serupa baru dapat ditafsirkan setelah kamu tahu model dan datanya (`e-xii2-m1`). Demonstrasi Bell juga tidak menunjukkan keunggulan kuantum apa pun; ia hanya memperlihatkan keadaan terjerat dan derau.

## Contoh setengah jadi

Lengkapi (kunci di bagian akhir).

1. Bagian hasil terlarang dari arsip: `(106 + 86) / 4000` = ____.
2. Lengkapi:

```cpp setengah-jadi
double frak = arsip[i] / double(____);
tvd += 0.5 * std::fabs(frak - ____[i]);
```

## Soal Parsons

Susun baris-baris di bawah (sudah diacak) menjadi bagian penghitung jarak variasi total pada `main`.

```text
(a)     for (int i = 0; i < 4; i++) {
(b)         double frak = arsip[i] / double(shot);
(c)         tvd += 0.5 * std::fabs(frak - ideal[i]);
(d)     }
(e)     std::printf("jarak variasi total = %.4f\n", tvd);
(f)     double tvd = 0.0;
```

## Latihan

1. **Hitung.** (`AI: tanpa AI`) Hitung `z` untuk hasil `00` dan `11` pada arsip dengan tangan, dan nyatakan apa artinya bagi dugaan "selisih hanya karena acak shot".
2. **Ubah data.** (`AI: boleh`) Pada program, pakai arsip `{1990, 12, 8, 1990}`. Prediksi dulu jarak variasi total, lalu jalankan dan bandingkan.
3. **Jelaskan.** (`AI: tanpa AI`) Sebut dua sumber hasil terlarang `01` dan `10`, dan mana yang lebih besar pada contoh ini.
4. **Lembar pengamatan.** (`AI: boleh`) Rancang lembar pengamatan satu halaman untuk demonstrasi: apa yang dicatat dan apa yang tidak boleh dicatat.
5. **Catatan pemakaian AI (opsional).** Bila memakai asisten AI, catat alat, tujuan, garis besar perintah, bagian yang dipakai, dan cara memeriksanya.

## Latihan bercampur

1. Pekerjaan 8 detik menunggu 1067 detik pada tarif 96 USD per menit: kapan hasil tiba dan berapa biaya? (`e-xii1-m11`)
2. Hasil terlarang pada Bell adalah `01` dan `10`. Mengapa himpunan itu sama bila label ditulis dengan urutan Qiskit? (`e-xii1-m9`)

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `e-xii1-m13` (satu minggu lagi), `e-xii2-m1` (sekitar tiga minggu lagi), dan `e-xii2-m6` (sekitar delapan minggu lagi). Jawab sekarang lalu simpan.

1. Mengapa hasil `01` dan `10` muncul pada perangkat nyata tetapi tidak pada simulator ideal?
2. Bagaimana menilai apakah selisih histogram perangkat dari simulator ideal lebih dari sekadar acak shot?
3. Apa yang boleh dan tidak boleh dicatat dari demonstrasi cloud quantum di kelas?

## Kesalahan umum

- **"Hasil perangkat nyata sama dengan hasil simulator."** Simulator ideal tidak punya derau gerbang dan derau baca.
- **"Arsip sintetis di modul ini adalah data perangkat nyata."** Ia dibangkitkan dari model di komputer biasa.
- **"Selisih lebih dari tiga simpangan berarti perangkat rusak."** Artinya ada sebab selain acak shot, misalnya derau yang memang diharapkan.
- **"Satu demonstrasi Bell membuktikan keunggulan kuantum."** Bell hanya memperlihatkan keterjeratan dan derau.
- **"Label pekerjaan boleh berisi nama murid."** Label harus sintetis, dan data pekerjaan disimpan penyedia (`e-xii1-m11`).

## Cek mandiri

- [ ] Saya dapat menyebut langkah demonstrasi dan data yang tidak boleh dicatat.
- [ ] Saya dapat menghitung jarak variasi total dan `z` dari dua histogram.
- [ ] Saya dapat menjelaskan hasil terlarang dengan derau gerbang dan derau baca.
- [ ] Saya tahu arsip di modul ini sintetis, bukan data perangkat nyata.
- [ ] Saya mencatat pemakaian AI bila saya memakainya.

## Kunci dan petunjuk

**Ingat kembali.** 1: `2^n` amplitudo; untuk `n = 30` ada `2^30` amplitudo, 8 GiB bila tiap amplitudo 8 byte. 2: sirkuit; kompilasi; antrean; eksekusi di perangkat; hasil; hanya eksekusi di perangkat yang dihitung sebagai pemakaian. 3: menyimulasikan vektor keadaan secara ideal di komputer biasa dan mengambil sampel hasil; derau gerbang, derau baca, dekoherensi, dan antrean tidak dimodelkan.

**Prediksi dulu.** (1) `00` dan `11` dominan; `01` dan `10` kecil tetapi tidak nol. (2) tidak nol pada perangkat nyata. (3) beberapa persen; arsip sintetis 4,8 persen (angka perangkat nyata tidak diketahui penyusun).

**Contoh setengah jadi.** 1: `192 / 4000` = 0,048. 2: `shot` dan `ideal`. Kunci ini dikompilasi dan dijalankan penyusun (potongan itu ada di program di atas).

**Soal Parsons.** f, a, b, c, d, e.

**Latihan.** 1: `sigma = akar(4000 x 0,25)` = 31,6; `00`: `(1926 - 2000) / 31,6` = -2,34; `11`: `(1882 - 2000) / 31,6` = -3,73; `11` di luar tiga simpangan, jadi acak shot saja tidak cukup menjelaskan. 2: `0,5 x (0,0025 + 0,003 + 0,002 + 0,0025)` = 0,005 (dihitung tangan; penyusun tidak menjalankan). 3: kesalahan baca (`2r(1 - r)` = 0,0458) dan kesalahan gerbang (`p/2` = 0,0015); kesalahan baca lebih besar. 4: dicatat: label sintetis, jumlah shot, histogram agregat, tanggal akses; tidak dicatat: token, CRN, nama akun, nama murid, tangkapan layar yang memuat itu. 5: opsional.

**Latihan bercampur.** 1: 1075 detik; 12,80 USD. 2: label `01` dibalik menjadi `10` dan sebaliknya, jadi himpunannya sama.

**Ulang berjarak.** 1: ada derau gerbang dan derau baca (dan dekoherensi) pada perangkat nyata; simulator ideal tidak memodelkannya. 2: hitung simpangan wajar `akar(shot x p x (1 - p))` untuk tiap hasil; selisih lebih dari kira-kira tiga simpangan, atau hasil yang peluang idealnya nol, menunjukkan sebab lain selain acak shot. 3: dicatat: label sintetis, jumlah shot, histogram agregat, tanggal akses; tidak dicatat: token, CRN, nama akun, nama murid.

## Langkah berikutnya

Modul berikut: `e-xii1-m13` (proyek mini: membandingkan simulator dan hasil perangkat). Bacaan pendamping: `e-xii1-m8` dan `e-xii1-m11`.
