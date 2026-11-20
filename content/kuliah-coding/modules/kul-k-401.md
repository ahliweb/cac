## Untuk siapa modul ini

Modul belajar untuk mata kuliah `KUL-K-401` (2 SKS, semester 7, jalur K),
bagian dari program `kuliah-coding`. Konten ini karangan menurut ADR-0007 dan disetujui pemilik program pada 2026-11-20 (keputusan lewat dialog; catatan tinjauan menjadi tindak lanjut revisi). Kode di modul adalah **C++17** (g++ 13.3, Linux): tiap blok
`cpp` yang lengkap dikompilasi dengan `-std=c++17 -Wall -Wextra` tanpa
peringatan, dijalankan, dan keluarannya cocok dengan yang tertulis.

Pembacanya mahasiswa semester 7 yang sudah menempuh `KUL-K-301` (DP lanjutan,
graf berbobot, teori bilangan, segment tree, DSU, string, geometri dasar).
Ini **studio**, bukan kuliah: yang dilatih adalah bekerja sebagai **tim tiga
orang dengan satu komputer** pada kontes yang lamanya sekitar lima jam, lalu
membedah apa yang gagal. Satu mata kuliah, satu semester: 14 pertemuan, 2 SKS.
Kamu butuh g++ (C++17), Git, dan kertas besar; tim dibentuk di pertemuan 1.

**Tingkat AI: Merah saat simulasi kontes dan latihan kontes** (silabus 6.3).
Soal simulasi di modul ini karangan sendiri atau karangan dosen; soal kontes
nyata hanya **ditautkan** ke arsip resminya dan tidak disalin.

Format tim tiga orang, satu komputer, dan lima jam itu bentuk **latihan**
yang mengikuti aturan regional ICPC yang dibuka penyusun pada 2026-11-19 (lihat
rujukan). Aturan resmi dan pelaksanaannya di Indonesia **belum terverifikasi**
`[belum terverifikasi]`; bila kamu ikut kontes sungguhan, baca aturan kontes
itu sendiri, karena aturan bisa berbeda antarwilayah dan antartahun.

## Peta semester

| Pertemuan | Bagian | Pokok bahasan | CPMK | Kuis pembuka (jarak) |
| --- | --- | --- | --- | --- |
| 1 | 1 | Strategi tim dan pembagian peran | C1 | `KUL-K-301`: Dijkstra dan bobot negatif |
| 2 | 1 | Urutan soal dan penalti; membaca semua soal | C1 | 1, lalu `KUL-K-301`: DSU |
| 3 | 2 | Simulasi 1 dan pembahasan | C1, C2 | 2, lalu 1 |
| 4 | 2 | Simulasi 2 | C1, C2 | 3, lalu 1 |
| 5 | 2 | Simulasi 3 | C1, C2 | 4, lalu 2 |
| 6 | 2 | Simulasi 4, sesi penuh sekitar lima jam | C1, C2 | 5, lalu 3 |
| 7 | 2 | Simulasi 5 | C1, C2 | 6, lalu 4 |
| 8 | 2 | Simulasi 6 | C1, C2 | 7, lalu 5 |
| 9 | 2 | Simulasi 7 | C1, C2 | 8, lalu 6 |
| 10 | 2 | Simulasi 8, sesi penuh sekitar lima jam | C1, C2 | 9, lalu 7 |
| 11 | 3 | Analisis soal yang gagal | C3 | 10, lalu 8 |
| 12 | 3 | *Debugging* dan kode pembanding | C3 | 11, lalu 9 |
| 13 | 3 | Menguji sendiri dan gagal yang bermanfaat | C3 | 12, lalu 10 |
| 14 | 4 | Refleksi dan rencana latihan | C4 | 13, lalu 1 sampai 12 |

Sesi simulasi penuh sekitar lima jam tidak muat di satu pertemuan biasa;
dua sesi penuh (pertemuan 6 dan 10) dan enam sesi lebih pendek (sekitar dua
sampai tiga jam, soal lebih sedikit) adalah usulan penyusun `[asumsi]`. Prodi
menjadwalkan sesi studio sesuai ketersediaan lab.

## Ingat kembali

Tiap pertemuan dibuka kuis 5 menit **tanpa catatan dan tanpa komputer**, 3
sampai 4 soal, dari mata kuliah sebelumnya dan pertemuan yang lebih jauh.
Alat yang harus siap di kepala ketika kontes berjalan:

1. Mengapa Dijkstra gagal pada bobot negatif, dan apa kompleksitasnya dengan
   heap? (`KUL-K-301`)
2. Tulis operasi `cari` dan `gabung` DSU. Mengapa kompresi jalur menolong?
   (`KUL-K-301`)
3. Bagaimana kamu menangani sisa negatif pada aritmetika modular di C++?
   (`KUL-K-301`)
4. Tulis rekurensi DP koin dan jelaskan mengapa greedy gagal pada `{1, 3, 4}`.
   (`KUL-K-201`)
5. Apa syarat agar pencarian biner pada jawaban sah? (`KUL-K-201`)

Mengambil kembali dari ingatan melatih persis yang kamu butuhkan saat kontes:
mengingat tanpa catatan di bawah tekanan waktu.

## Tujuan

Pada akhir semester kamu dapat (CPMK, silabus bagian 3.3):

- **C1** bekerja sebagai tim tiga orang dengan satu komputer dan membagi peran;
- **C2** mengelola waktu pada kontes sekitar lima jam;
- **C3** melakukan debugging dan menulis kode pembanding;
- **C4** menyusun refleksi dan rencana latihan.

## Bagian 1: Strategi tim dan pembagian peran (pertemuan 1 dan 2)

Menurut aturan regional ICPC yang dibuka, tim terdiri atas tiga peserta yang
bekerja pada **satu komputer**, dan kontes biasanya sekitar lima jam. Akibat
langsung: **hanya satu orang yang mengetik pada satu waktu**. Dua orang
lainnya tidak boleh menganggur: satu membaca soal berikutnya, satu menelusuri
solusi di kertas atau membuat kasus uji. Komputer adalah sumber daya langka;
kertas tak terbatas.

Pembagian peran yang lazim dicoba (usulan penyusun, bukan aturan resmi
`[asumsi]`):

| Peran | Tugas utama | Kebiasaan yang membantu |
| --- | --- | --- |
| Pengetik | Menulis kode yang sudah dirancang di kertas | Menulis dari kertas, bukan dari kepala; tidak merancang sambil mengetik |
| Perancang | Mencari algoritma soal berikutnya, menulis di kertas | Menyampaikan rancangan dengan contoh kecil dan kompleksitas |
| Penguji | Membuat kasus uji, menelusuri kode dengan tangan, menyiapkan pembanding | Memeriksa batas soal dan kasus tepi sebelum kode dikirim |

Peran **bergilir** antarsoal, supaya semua tahu semuanya dan tak ada satu
orang yang jadi titik gagal. Aturan pegang: jangan ada kiriman yang tidak
ditelusuri satu orang selain penulisnya.

### Prediksi dulu

Satu komputer, empat soal yang kamu perkirakan memerlukan 40, 10, 25, dan 15
menit menulis dan mengirim (anggap tiap soal diterima pada percobaan pertama
dan dikerjakan berurutan). Total waktu tim = jumlah waktu selesai tiap soal
yang dikerjakan (ini ukuran penalti; aturannya di bawah). Dengan urutan
10, 15, 25, 40 berapa totalnya, dan dengan urutan terburuk? Tebak dulu
sebelum membaca contoh.

### Contoh terselesaikan

Menurut aturan regional ICPC yang dibuka, tim diurutkan menurut **jumlah soal
terbanyak yang diselesaikan**; seri diurutkan menurut **total waktu** yang
paling sedikit, yaitu jumlah waktu terpakai untuk tiap soal yang diselesaikan.
Karena itu urutan pengerjaan memengaruhi total waktu walaupun semua soal
selesai. Program ini mencoba semua urutan untuk empat soal.

```cpp
#include <algorithm>
#include <iostream>
#include <vector>
using namespace std;

int main() {
    // Perkiraan menit untuk menulis dan mengirim tiap soal; satu komputer, jadi dikerjakan berurutan.
    // Anggap tiap soal diterima pada percobaan pertama.
    vector<int> durasi = {40, 10, 25, 15};
    vector<int> urutan = {0, 1, 2, 3};
    int terbaik = 1000000;
    int terburuk = 0;
    vector<int> urutanTerbaik;
    do {
        int waktu = 0;
        int penalti = 0;
        for (int i : urutan) {
            waktu += durasi[i];
            penalti += waktu;
        }
        if (penalti < terbaik) {
            terbaik = penalti;
            urutanTerbaik = urutan;
        }
        terburuk = max(terburuk, penalti);
    } while (next_permutation(urutan.begin(), urutan.end()));
    cout << terbaik << ' ' << terburuk << '\n';
    for (int i : urutanTerbaik) {
        cout << durasi[i] << ' ';
    }
    cout << '\n';
    return 0;
}
// keluaran:
// 175 275
// 10 15 25 40
```

Urutan terbaik adalah dari yang tercepat ke yang terlama: 10, 25 (10 + 15),
50 (25 + 25), 90 (50 + 40), jumlahnya 175; urutan terburuk 40, 65, 80, 90
berjumlah 275. Inilah alasan tim **membaca semua soal lebih dulu** dan
mengerjakan yang termudah dulu. Argumen pertukaran seperti greedy di
`KUL-K-201`: menukar dua soal berdekatan yang lebih lama di depan yang lebih
singkat tak pernah menurunkan total.

Keterbatasan model ini jelas: perkiraan durasi hanyalah perkiraan, soal
mudah menurut satu orang sulit bagi yang lain, dan soal yang salah menambah
penalti. Kompleksitas program ini `O(n! · n)` dengan `n = 4`: wajar hanya
karena `n` kecil. Pada kontes, kamu tak menjalankannya; kamu **mengurutkan**
dengan tebakan terbaik dan memperbaruinya selama jalan.

### Contoh setengah jadi

Lengkapi aturan pengurutan "terpendek dulu" untuk kontes sesungguhnya,
dengan perkiraan menit per soal dalam `est[i]`:

```cpp setengah-jadi
vector<int> urut(n);
iota(urut.begin(), urut.end(), 0);
sort(urut.begin(), urut.end(), [&](int a, int b) {
    return est[___] < est[___];
});
```

### Latihan

1. **Ubah:** ubah program agar menyertakan satu soal tambahan 30 menit dan
   prediksi urutan terbaik dan total terbaiknya lebih dulu.
2. **Buat:** tulis daftar periksa satu halaman untuk lima menit pertama
   kontes (tugas tiap orang) dan lima menit terakhir (apa yang dikirim,
   apa yang dihentikan).
3. **Jelaskan:** mengapa urutan terpendek-dulu tak selalu terbaik bila
   peluang gagal berbeda antarsoal? Beri contoh angka.
4. **Berpasangan (praktikum):** satu orang menjadi perancang, satu penguji;
   perancang menjelaskan solusi soal karangan hanya dengan kertas, penguji
   mencari kasus tepi sebelum satu baris kode ditulis. Tukar peran. Kontes
   tim bukan berpasangan, dan tugas yang dinilai tetap perorangan.

## Bagian 2: Simulasi kontes dan penalti (pertemuan 3 sampai 10)

Tiap simulasi mengikuti satu protokol: (1) lima menit pertama semua membaca
semua soal dan menandai tingkat kesulitan; (2) urutkan; (3) pengetik menulis,
penguji menelusuri, perancang menyiapkan soal berikutnya; (4) satu orang
mencatat **log tim** (waktu kirim, soal, vonis) di kertas; (5) saat 30 menit
terakhir, berhenti memulai soal baru yang tak mungkin selesai dan fokus
menuntaskan yang hampir benar; (6) sesudahnya, pembahasan bersama.

Aturan penilaian di aturan regional yang dibuka: waktu sebuah soal yang
selesai adalah waktu dari awal kontes sampai kiriman **diterima pertama**,
ditambah **20 menit penalti** untuk setiap kiriman sebelumnya yang ditolak
untuk soal itu **kecuali yang ditolak karena kesalahan kompilasi**; soal yang
tak selesai tidak menambah waktu. Aturan lain bisa berbeda; aturan latihanmu
ditetapkan dosen di lembar simulasi.

### Prediksi dulu

Log sintetis tiga tim rekaan: Tim Alfa diterima soal A pada menit 12; soal B
ditolak (WA) menit 35, kesalahan kompilasi menit 50, diterima menit 58. Tim
Beta ditolak soal A menit 20, diterima menit 31; soal B ditolak (TLE) menit 70,
diterima menit 85. Tim Gama hanya satu kiriman ditolak untuk soal C menit
90. Hitung jumlah soal dan total waktu tiap tim, dan urutan papan peringkat,
dengan aturan di atas (hitung dengan tangan).

### Contoh terselesaikan

Program membaca log yang ditulis dalam kode dan menghitung papan peringkat
menurut aturan di atas. Perhatikan pengecualian kesalahan kompilasi (`CE`)
dan kiriman sesudah diterima (diabaikan).

```cpp
#include <algorithm>
#include <iostream>
#include <map>
#include <string>
#include <vector>
using namespace std;

struct Kiriman {
    string tim;
    char soal;
    int menit;
    string vonis;  // "AC", "WA", "TLE", atau "CE"
};

struct Skor {
    string tim;
    int selesai = 0;
    int penalti = 0;
};

int main() {
    // Log sintetis; nama tim rekaan.
    vector<Kiriman> log = {
        {"Tim Alfa", 'A', 12, "AC"},  {"Tim Beta", 'A', 20, "WA"},  {"Tim Alfa", 'B', 35, "WA"},
        {"Tim Beta", 'A', 31, "AC"},  {"Tim Alfa", 'B', 50, "CE"},  {"Tim Alfa", 'B', 58, "AC"},
        {"Tim Beta", 'B', 70, "TLE"}, {"Tim Beta", 'B', 85, "AC"},  {"Tim Gama", 'C', 90, "WA"},
    };
    map<string, map<char, int>> salah;      // salah sebelum diterima, tidak termasuk CE
    map<string, map<char, bool>> diterima;  // sudah diterima
    map<string, Skor> papan;
    for (const auto &k : log) {
        papan[k.tim].tim = k.tim;
        if (diterima[k.tim][k.soal]) {
            continue;
        }
        if (k.vonis == "AC") {
            diterima[k.tim][k.soal] = true;
            papan[k.tim].selesai++;
            papan[k.tim].penalti += k.menit + 20 * salah[k.tim][k.soal];
        } else if (k.vonis != "CE") {
            salah[k.tim][k.soal]++;
        }
    }
    vector<Skor> urut;
    for (const auto &p : papan) {
        urut.push_back(p.second);
    }
    sort(urut.begin(), urut.end(), [](const Skor &x, const Skor &y) {
        if (x.selesai != y.selesai) {
            return x.selesai > y.selesai;
        }
        return x.penalti < y.penalti;
    });
    for (const auto &s : urut) {
        cout << s.tim << ' ' << s.selesai << ' ' << s.penalti << '\n';
    }
    return 0;
}
// keluaran:
// Tim Alfa 2 90
// Tim Beta 2 156
// Tim Gama 0 0
```

Penelusuran: Tim Alfa soal A `12`; soal B diterima menit 58 dengan satu
penolakan (WA; CE tidak dihitung), jadi `58 + 20 = 78`; total `12 + 78 = 90`.
Tim Beta soal A `31 + 20 = 51`; soal B `85 + 20 = 105`; total `156`. Tim Gama
tak menyelesaikan satu pun, waktunya 0. Alfa dan Beta sama-sama 2 soal, jadi
Alfa menang karena total waktu lebih kecil (90 < 156). Kompleksitas:
membaca `m` kiriman `O(m log T)` (peta menurut tim) dan mengurutkan `T` tim
`O(T log T)`.

Satu pelajaran penalti: **satu kiriman asal-asalan** (tanpa menelusuri) yang
ditolak seharga 20 menit, sama dengan menelusuri 20 menit lebih lama. Kecuali
kamu sangat yakin, menelusuri dengan tangan lebih murah.

### Contoh setengah jadi

Lengkapi aturan penalti untuk satu soal: `salah` = jumlah kiriman ditolak
(bukan CE) sebelum diterima, `menitTerima` = menit kiriman diterima:

```cpp setengah-jadi
int waktuSoal(int menitTerima, int salah) {
    return menitTerima + ___ * salah;
}
```

### Latihan

1. **Ubah:** ubah penalti dari 20 menit menjadi 10 menit; prediksi apakah
   urutan Alfa dan Beta berubah; periksa dengan program.
2. **Buat:** tambahkan hitung "soal pertama yang diselesaikan siapa"
   (tidak resmi, hanya untuk pembahasan simulasimu) dari log yang sama.
3. **Jelaskan:** mengapa kiriman sesudah soal diterima diabaikan, dan apa
   yang akan terjadi bila diabaikan salah?
4. **Berpasangan:** dua orang menulis log sintetis kecil yang membuat dua tim
   seri dalam jumlah soal; cari log yang membuat selisih waktu tepat 1 menit.

## Bagian 3: Analisis soal yang gagal dan kode pembanding (pertemuan 11 sampai 13)

Sesudah tiap simulasi, tiap soal yang tidak diterima dibedah dalam tiga
pertanyaan berurutan: (1) **Apakah algoritmanya benar?** (Bila ragu, ada
contoh penyangkal? Bukti sederhana?) (2) **Apakah kodenya mengimplementasikan
algoritma itu?** (3) **Apakah kasus tepi dan batas tertangani?** Hampir semua
penolakan jatuh di (2) atau (3). Alat utamanya sama seperti di `KUL-K-201`:
**kode pembanding** yang lambat tapi pasti benar, dan **masukan acak kecil**
yang cepat menemukan masukan penyangkal.

Aturan **debugging tim**: satu orang menelusuri, satu orang tidak mengubah kode
sampai penyebabnya jelas. Mengubah kode sambil menebak hampir selalu menambah
kesalahan baru.

### Prediksi dulu

Solusi O(n) berikut dikirim tim untuk soal karangan "cari jumlah terbesar
sub-larik tak kosong (berurutan)". Ia lolos contoh soal tetapi ditolak
(WA). Sebelum membaca contoh, tebak masukan kecil apa yang mematahkannya
(petunjuk: pikirkan nilai negatif), lalu baca.

```text
terbaik = 0
sekarang = 0
untuk tiap x:
    sekarang = max(x, sekarang + x)
    terbaik = max(terbaik, sekarang)
cetak terbaik
```

### Contoh terselesaikan

Penguji menulis pembanding `O(n²)` yang mencoba semua sub-larik tak kosong,
lalu membandingkannya dengan kiriman pada ribuan masukan acak kecil. Satu
masukan penyangkal yang kecil lebih bernilai daripada seribu yang besar.

```cpp
#include <algorithm>
#include <iostream>
#include <random>
#include <vector>
using namespace std;

// Versi yang dikirim tim: jumlah sub-larik tak kosong terbesar (O(n)), dengan satu kesalahan.
long long kirim(const vector<int> &a) {
    long long terbaik = 0;
    long long sekarang = 0;
    for (int x : a) {
        sekarang = max<long long>(x, sekarang + x);
        terbaik = max(terbaik, sekarang);
    }
    return terbaik;
}

// Kode pembanding (O(n^2)): coba semua sub-larik tak kosong.
long long pembanding(const vector<int> &a) {
    long long terbaik = a[0];
    for (size_t i = 0; i < a.size(); i++) {
        long long jumlah = 0;
        for (size_t j = i; j < a.size(); j++) {
            jumlah += a[j];
            terbaik = max(terbaik, jumlah);
        }
    }
    return terbaik;
}

int main() {
    mt19937 rng(2026);
    for (int kasus = 1; kasus <= 1000; kasus++) {
        int n = static_cast<int>(rng() % 4) + 1;
        vector<int> a(n);
        for (int &x : a) {
            x = static_cast<int>(rng() % 7) - 3;
        }
        long long p = kirim(a);
        long long q = pembanding(a);
        if (p != q) {
            cout << "beda pada kasus " << kasus << ": [";
            for (int i = 0; i < n; i++) {
                cout << a[i] << (i + 1 < n ? "," : "");
            }
            cout << "] kirim=" << p << " pembanding=" << q << '\n';
            return 0;
        }
    }
    cout << "semua sama\n";
    return 0;
}
// keluaran:
// beda pada kasus 2: [-2] kirim=0 pembanding=-2
```

Masukan penyangkal terkecil adalah satu elemen negatif: `[-2]`. Jawaban yang
benar `-2` (sub-larik **tak kosong**), tetapi kiriman mulai dari `terbaik = 0`
sehingga tak pernah memberi jawaban negatif. Perbaikannya satu baris: mulai
`terbaik` dari `a[0]` (elemen pertama), bukan 0. Dengan perbaikan itu,
program yang sama menghasilkan `semua sama` pada 1000 kasus. Kompleksitas:
kiriman `O(n)`, pembanding `O(n²)`; pembanding hanya dipakai pada masukan
kecil, jadi tak masalah lambat. Generator memakai `mt19937` dengan benih
tetap dan `rng() % k` (bukan `uniform_int_distribution`, yang hasilnya tak
dijamin sama antarpustaka) supaya masukan penyangkal bisa **diulang** oleh
anggota tim lain.

Pola ini bekerja karena penyebab kegagalan sering berada pada kasus tepi
yang tak ada di contoh soal: semua negatif, `n = 1`, semua sama, nilai
minimum dan maksimum menurut batas. Soal yang ditolak berkali-kali tanpa
pembanding berarti tim menebak.

### Contoh setengah jadi

Lengkapi pembaca vonis dalam log tim yang menandai penyebab penolakan
menurut urutan tiga pertanyaan analisis:

```cpp setengah-jadi
string penyebab(bool algoritmaBenar, bool kodeSesuai, bool kasusTepiAman) {
    if (!algoritmaBenar) {
        return "algoritma";
    }
    if (!___) {
        return "kode";
    }
    if (!___) {
        return "kasus tepi";
    }
    return "lainnya";
}
```

### Latihan

1. **Ubah:** ubah generator agar nilai berkisar dari `-1000000000` sampai
   `1000000000` dan panjang sampai 10; apa yang tetap bisa salah (petunjuk:
   rentang `int` dan jumlah)? Sesuaikan tipe kode kiriman bila perlu.
2. **Buat:** pembanding `O(n³)` untuk soal "pasangan dengan selisih tepat
   `d`" dan generator acak kecil; bandingkan dengan solusi dua penunjuk
   `KUL-K-201`.
3. **Jelaskan:** mengapa pembanding harus ditulis sangat sederhana, bahkan
   bila lambat, dan mengapa pembanding yang meniru logika solusi tak berguna?
4. **Berpasangan:** satu menyisipkan satu kesalahan kecil ke solusi karangan
   (tanpa diberitahu), satu menemukannya dengan pembanding dan generator;
   catat berapa kasus acak yang dibutuhkan.

## Bagian 4: Refleksi dan rencana latihan (pertemuan 14)

Refleksi bukan nostalgia; ia memberi bahan **rencana latihan**. Setelah
semester, tiap anggota tim menulis satu halaman:

1. **Data.** Berapa soal diselesaikan per simulasi, waktu selesai tiap soal,
   jumlah penolakan per jenis (WA, TLE, CE), dan penyebabnya menurut tiga
   pertanyaan analisis. Memakai angka dari log timmu sendiri, bukan perasaan.
2. **Pola.** Teknik yang paling sering gagal (DP? graf? kasus tepi?).
   Kebiasaan tim yang menolong dan yang merugikan.
3. **Rencana.** Tiga kebiasaan yang diubah, tiga teknik yang diulang
   (jadwal pengulangan berjarak), satu target terukur (mis. "dua soal lebih
   cepat dari 60 menit pertama") dan tanggal tinjau ulang.
4. **Peran.** Peran apa yang paling kamu kuasai dan peran apa yang kurang;
   bagaimana kamu melatih yang kurang.

Rencana latihan memakai prinsip belajar yang sama dengan mata kuliah
lainnya: latihan **tersebar** (bukan menumpuk sehari sebelum kontes),
**campuran** jenis soal, dan **mengerjakan ulang tanpa petunjuk** sebelum
membuka editorial. Menilai diri berdasarkan "terasa lancar" tidak cukup;
catat hasilnya.

## Latihan bercampur

Setelah bagian 2 dan 3, kerjakan soal yang **tidak menyebut** tekniknya,
dari arsip yang **ditautkan**, bukan disalin: arsip soal OSN Bidang Informatika
(`https://osn.toki.id/arsip`) dan kumpulan soal latihan CSES
(`https://cses.fi/problemset/`). Pilih beberapa dan kerjakan di bawah
suasana kontes (waktu dibatasi, tanpa AI, tanpa editorial). Sesudahnya,
analisis seperti bagian 3. Soal karangan sendiri yang bercampur: "Berapa
jarak terpendek dari kota 1 ke kota n bila beberapa jalan berbayar dan kamu
punya satu voucher gratis?" (graf berlapis dan Dijkstra), "Apakah dua orang
berada di kelompok yang sama setelah serangkaian penggabungan?" (DSU),
"Berapa cara menyusun `n` benda modulo `10^9 + 7`?" (kombinatorik dan invers
modular), "Berapa pasang `(i, j)` dengan selisih `d`?" (urut dan pencarian).

## Ulang berjarak

Ini mata kuliah terakhir jalur K, jadi pengulangan menghadap ke luar kelas:

- satu minggu setelah tiap simulasi: kerjakan ulang **tanpa petunjuk** satu
  soal yang gagal;
- sebulan kemudian: tulis ulang dari ingatan satu algoritma yang paling
  sering gagal di timmu;
- tiap bulan sesudah lulus bila masih berlatih: satu soal baru dari arsip yang
  ditautkan, bergantian dengan satu soal lama yang dulu salah.

## Kebijakan AI dan log pemakaian

Mata kuliah ini **Merah saat simulasi kontes dan latihan kontes** (silabus
bagian 6.3, jalur K): selama simulasi, tim **tidak memakai AI sama sekali**,
termasuk untuk mencari sintaks, menjelaskan galat, atau menulis templat.
Yang dilatih adalah kemampuan tim tanpa bantuan itu; di kontes sungguhan,
aturan yang berlaku adalah aturan kontes tersebut, yang harus kamu baca.

**Sesudah simulasi**, AI boleh dipakai untuk menjelaskan solusi, dengan
pengungkapan, **lalu** kamu mengerjakan ulang (*re-solve*) tanpa AI dan tanpa
melihat penjelasannya. Catat pemakaian di repositorimu sendiri: alat dan
versi, tujuan, perintah, bagian keluaran yang dipakai (log). Jangan
memasukkan data pribadi, kata sandi, atau kunci ke layanan AI. Jangan
memasukkan log kiriman asli timmu bila memuat identitas orang. Dosen dapat
mewawancarai kamu tentang solusi dan analisismu dan memintamu mengubahnya
langsung. Refleksi dan rencana latihanmu ditulis sendiri. Tingkat per tugas
ditetapkan dosen di lembar tugas.

## Kesalahan umum

- **Semua orang menunggu komputer.** Rancang di kertas selagi satu orang mengetik.
- **Mengerjakan soal tersulit dulu.** Baca semua soal, urutkan, kerjakan
  termudah dulu.
- **Mengirim tanpa menelusuri.** Tiap penolakan 20 menit penalti (menurut
  aturan regional yang dibuka).
- **Mengubah kode sambil menebak.** Temukan penyebabnya dulu dengan
  masukan penyangkal.
- **Pembanding yang meniru logika solusi.** Ia akan salah dengan cara
  yang sama; tulis dengan cara berbeda dan sederhana.
- **Generator yang tak menyentuh kasus tepi.** Pakai nilai kecil supaya
  duplikat dan batas sering muncul.
- **Mengabaikan sisa negatif dan `long long`.** Dua penyebab WA yang paling
  sering.
- **Refleksi tanpa angka.** "Kami kurang cepat" bukan rencana.

## Cek mandiri

Tutup modul, jawab, baru periksa.

1. Mengapa hanya satu orang mengetik pada satu waktu dan apa kerja dua
   lainnya?
2. Untuk durasi 5, 20, 10 menit, tulis urutan dan total waktu terkecil.
3. Hitung waktu sebuah soal yang diterima menit 47 setelah dua penolakan
   WA dan satu kesalahan kompilasi (aturan di bagian 2).
4. Apa tiga pertanyaan analisis soal yang gagal, berurutan?
5. Mengapa `uniform_int_distribution` kurang cocok untuk generator yang hasilnya
   harus sama antar anggota tim?
6. Tulis `cari` dan `gabung` DSU tanpa melihat.
7. Apa yang kamu lakukan sesudah simulasi bila ingin AI menjelaskan solusi?

Daftar periksa (kosong; kamu isi sendiri, tidak dikumpulkan):

- [ ] Aku punya peran dan kebiasaan tim yang jelas.
- [ ] Aku dapat mengatur waktu: membaca semua soal, mengurutkan, menjaga 30 menit terakhir.
- [ ] Aku dapat menulis pembanding dan generator acak kecil.
- [ ] Aku punya rencana latihan berangka dengan tanggal tinjau.

## Kunci dan petunjuk

- **Bagian 1:** urutan 10, 15, 25, 40 bernilai 175, terburuk 275. Setengah
  jadi: `a`, `b`. Cek mandiri 2: urutan 5, 10, 20: waktu selesai 5, 15, 35,
  total 55.
- **Bagian 2:** Tim Alfa 2 soal 90; Tim Beta 2 soal 156; Tim Gama 0 soal 0;
  urutan Alfa, Beta, Gama. Setengah jadi: `20`. Cek mandiri 3: `47 + 20 · 2
  = 87` (kesalahan kompilasi tidak dihitung).
- **Bagian 3:** masukan penyangkal `[-2]` (jawaban benar -2, kiriman 0);
  perbaikan: `terbaik = a[0]`. Setengah jadi: `kodeSesuai`, `kasusTepiAman`.
- **Petunjuk bertahap bila macet:** (1) tulis masukan terkecil yang kamu
  curigai dan hitung tangan; (2) bandingkan dengan keluaran program; (3)
  telusuri kode pada masukan itu sampai baris di mana nilainya mulai
  berbeda dari hitungan tangan.

## Langkah berikutnya

Mata kuliah ini penutup jalur K. Kebiasaan menguji sendiri, mengelola waktu,
dan menganalisis kegagalan berlaku pada kerja rekayasa perangkat lunak
umumnya; di jalur lain, `KUL-I-401` (Proyek Perangkat Lunak Tim) memakainya dalam proyek
tim. Bila ingin melanjutkan, rencana latihan yang kamu tulis di pertemuan 14
adalah titik mulainya.

## Catatan untuk dosen

Bobot dan bentuk asesmen berikut **usulan**; prodi menetapkan (silabus 6.1,
6.2): simulasi kontes, penilaian pelatih (dosen), dan refleksi perorangan.
Soal simulasi **karangan dosen atau ditautkan dari arsip resmi, tidak disalin
ke bahan ini**. Format tim tiga orang, satu komputer, dan lima jam diambil
dari aturan regional ICPC yang dibuka penyusun (2026-11-19) sebagai bentuk
latihan; pelaksanaan resmi di Indonesia `[belum terverifikasi]`. Penjadwalan
sesi lima jam adalah kendala nyata; usulan dua sesi penuh dan enam sesi
pendek `[asumsi]` dapat diubah. Tingkat Merah selama simulasi; penjelasan AI
sesudahnya hanya dengan pengungkapan dan log lalu *re-solve* tanpa AI. Nilai
perorangan tetap melalui wawancara kode, tulisan analisis, dan refleksi;
jangan menilai pasangan atau tim sebagai satu angka tunggal. Hindari
menyimpan log kiriman tim yang memuat identitas di repositori bahan ini.
