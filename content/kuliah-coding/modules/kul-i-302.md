## Untuk siapa modul ini

Mahasiswa semester 6 informatika atau ilmu komputer yang sudah menempuh
`KUL-I-203` (proses, utas, kunci). `KUL-I-302`: 3 SKS, jalur I; 14 pertemuan,
ujian tengah sesudah pertemuan 7 dan ujian akhir sesudah pertemuan 14
`[asumsi]` (silabus 2.3). Kamu butuh Linux dengan g++, Git, dan Docker
(bagian 3).

Kode memakai **C++17** (g++ 13.3, `-pthread`) dan perintah **Docker 29.10**.
Tiap blok lengkap sudah dijalankan dan keluarannya sama dengan yang tertulis;
blok `setengah-jadi` sengaja berlubang. Contoh terselesaikan penuh sangat
terbatas: kamu lebih banyak menebak, menelusuri, dan meninjau.

**Cloud memakai uang dan rahasia.** Pelajari bagian 4 sebelum membuat akun
cloud. Percobaan di modul ini berjalan di mesinmu sendiri; untuk cloud sungguhan
pakai batas anggaran dan hapus semua sumber daya setelah selesai (silabus 7.3:
cloud hanya untuk `KUL-I-302` dan proyek tertentu). Harga dan nama layanan
berubah: modul ini hanya memakai harga **fiktif** dan menyebut fakta cloud
dengan tanggal.

## Peta semester

| Pertemuan | Bagian: pokok bahasan | CPMK | Kuis pembuka (jarak) |
| --- | --- | --- | --- |
| 1 | B1: utas, balapan data | C1 | `KUL-I-203` |
| 2 | B1: mutex, atomik | C1 | 1, lalu `KUL-I-203` |
| 3 | B1: kebuntuan; **kuis kumulatif 1** | C1 | 2, lalu 1 |
| 4 | B1: percepatan, hukum Amdahl | C1 | 3, lalu 1 |
| 5 | B2: pesan, kegagalan sebagian | C2 | 4, lalu `KUL-I-301` |
| 6 | B2: replikasi, kuorum | C2 | 5, lalu 3 |
| 7 | B2: konsistensi akhir; **kuis kumulatif 2** | C2 | 6, lalu 4 |
| ujian tengah | Tertulis dan praktik, tanpa AI | C1 sampai C2 | |
| 8 | B3: kontainer, image | C3 | 7, lalu 5 |
| 9 | B3: batas sumber daya, hak akses | C3 | 8, lalu 6 |
| 10 | B3: jaringan, volume; **kuis kumulatif 3** | C3 | 9, lalu 7 |
| 11 | B4: model layanan cloud | C3 | 10, lalu 8 |
| 12 | B4: biaya, anggaran | C3 | 11, lalu 9 |
| 13 | B4: proyek; keamanan akun | C3 | 12, lalu 10 |
| 14 | B4: proyek; **kuis kumulatif akhir** | C3 | 13, lalu 1 sampai 12 |
| ujian akhir | Tertulis dan praktik, tanpa AI | C1 sampai C3 | |

## Ingat kembali

Tiap pertemuan dibuka kuis 5 menit **tanpa catatan**, 3 sampai 5 soal, dari
asal pada kolom terakhir peta (jarak bertambah). Contoh pertemuan 1 sampai 5:

1. Mengapa `x++` dari beberapa utas tanpa kunci dapat memberi hasil salah, dan
   apa dua cara memperbaikinya? (`KUL-I-203`)
2. Apa beda proses dan utas dalam hal ruang alamat? (`KUL-I-203`)
3. Mengapa satu `recv` dapat mengembalikan setengah pesan, dan bagaimana
   peladen memberi batas pesan? (`KUL-I-301`)

Soal 1 dan 2 dasar bagian 1; soal 3 dasar bagian 2 (pesan di jaringan tidak
dijamin tiba utuh dalam satu bagian).

## Tujuan

Pada akhir semester kamu dapat (CPMK, silabus bagian 3.1):

- **C1** menulis program konkuren;
- **C2** menjelaskan sistem terdistribusi dan konsistensi;
- **C3** memanfaatkan layanan cloud.

## Bagian 1: Utas dan sinkronisasi (pertemuan 1 sampai 4)

Utas dalam satu proses **berbagi memori**, sehingga dua utas yang menulis ke
data yang sama tanpa koordinasi menimbulkan **balapan data**: perilaku tak
terdefinisi di C++, bukan sekadar hasil kadang salah. Alat koordinasinya
sudah kamu kenal dari `KUL-I-203`: **mutex** (satu utas masuk bagian kritis),
**atomik** (operasi tak terpisahkan), dan **variabel kondisi** (utas menunggu
sampai suatu syarat benar; dasar pola produsen-konsumen). Bahaya baru: **kebuntuan**
(*deadlock*), saat dua utas masing-masing memegang satu kunci dan menunggu
kunci lain. Penangkalnya: kunci selalu dalam urutan sama, atau memakai
`std::scoped_lock` yang mengunci banyak mutex sekaligus. Dan akhirnya
ekspektasi: lebih banyak utas **tidak otomatis lebih cepat**. **Hukum Amdahl**:
bila bagian serial program `s`, percepatan pada `p` prosesor paling banyak
`1 / (s + (1 - s) / p)`.

### Prediksi dulu

Program tinjauan berikut menaikkan `penghitung` dari dua utas, 100000 kali
masing-masing, tanpa kunci. Apa yang bisa kamu katakan tentang nilai akhirnya,
dan apakah program ini memiliki perilaku terdefinisi?

```cpp
#include <iostream>
#include <thread>
using namespace std;

// Kode TINJAUAN: balapan data. Hasilnya tidak terdefinisi; jangan dipakai.
int penghitung = 0;

void tambah() {
    for (int i = 0; i < 100000; i++) penghitung++;
}

int main() {
    thread a(tambah), b(tambah);
    a.join();
    b.join();
    cout << "selesai\n";
    return 0;
}
```

### Contoh terselesaikan

Nilai akhir tak dapat diprediksi (sering kurang dari 200000) dan program
**tak terdefinisi**, jadi hasilnya tidak ditampilkan. Alat bantu menunjukkan
cacatnya: dikompilasi dengan `g++ -std=c++17 -g -fsanitize=thread -pthread` dan
dijalankan, ThreadSanitizer melapor sebagai baris pertama:

```text
WARNING: ThreadSanitizer: data race (pid=...)
```

Pada kernel Linux 6.8 di mesin penyusun, TSan awalnya gagal dengan "unexpected
memory mapping"; menjalankannya lewat `setarch x86_64 -R ./berkas` (mematikan
pengacakan alamat untuk proses itu) menyelesaikannya. Bila kamu mengalami hal
sama, catat versi kernel di laporanmu. Dua program berikut benar: kebuntuan
dihindari dengan `scoped_lock`, dan penjumlahan paralel membagi data tanpa
penulisan bersama.

```cpp
#include <iostream>
#include <mutex>
#include <thread>
using namespace std;

struct Rekening {
    int saldo;
    mutex kunci;
};

// scoped_lock mengunci kedua mutex sekaligus tanpa kebuntuan; urutan argumen tak menentukan.
void pindah(Rekening &dari, Rekening &ke, int jumlah) {
    scoped_lock jaga(dari.kunci, ke.kunci);
    dari.saldo -= jumlah;
    ke.saldo += jumlah;
}

int main() {
    Rekening a{1000, {}}, b{1000, {}};
    thread t1([&] { for (int i = 0; i < 1000; i++) pindah(a, b, 1); });
    thread t2([&] { for (int i = 0; i < 1000; i++) pindah(b, a, 2); });
    t1.join();
    t2.join();
    cout << a.saldo << " " << b.saldo << " " << a.saldo + b.saldo << '\n';
}
// keluaran:
// 2000 0 2000
```

Jumlah `a + b` tetap 2000: tiap pemindahan atomik terhadap kedua rekening.
Tanpa `scoped_lock`, dua `lock_guard` terpisah dengan urutan berlawanan dapat
membeku; program beku **tidak** dijalankan di sini.

```cpp
#include <iostream>
#include <numeric>
#include <thread>
#include <vector>
using namespace std;

// Tiap utas menjumlah potongannya dan menulis ke tempatnya sendiri: tanpa kunci.
long long jumlah_paralel(const vector<int> &d, int k) {
    vector<long long> bagian(k, 0);
    vector<thread> utas;
    for (int t = 0; t < k; t++)
        utas.emplace_back([&, t] {
            size_t a = d.size() * t / k, b = d.size() * (t + 1) / k;
            bagian[t] = accumulate(d.begin() + a, d.begin() + b, 0LL);
        });
    for (auto &u : utas) u.join();
    return accumulate(bagian.begin(), bagian.end(), 0LL);
}

// Hukum Amdahl: bagian serial s membatasi percepatan pada p prosesor.
double amdahl(double s, int p) { return 1.0 / (s + (1.0 - s) / p); }

int main() {
    vector<int> d(1000000);
    iota(d.begin(), d.end(), 1);
    cout << jumlah_paralel(d, 1) << " " << jumlah_paralel(d, 4) << '\n';
    for (int p : {4, 16, 1000}) cout << "p=" << p << " " << amdahl(0.1, p) << '\n';
}
// keluaran:
// 500000500000 500000500000
// p=4 3.07692
// p=16 6.4
// p=1000 9.9108
```

Dua hasil jumlah sama (`1 + ... + 10^6`). Tiap utas menulis ke
`bagian[t]` miliknya sendiri, jadi tak ada penulisan bersama. Dengan 10%
bagian serial, 1000 prosesor memberi percepatan di bawah 10: **bagian serial
menentukan batas**. Mengukur waktu nyata bergantung mesin, jadi tidak
ditampilkan; ukur sendiri dengan `chrono` dan laporkan jumlah inti mesinmu.

### Contoh setengah jadi

Antrean terbatas dengan variabel kondisi:

```cpp setengah-jadi
void taruh(int x) {
    unique_lock<mutex> jaga(kunci);
    tidak_penuh.wait(jaga, [&] { return isi.size() < ___; });
    isi.push(x);
    tidak_kosong.___();
}
```

### Latihan

1. **Ubah:** ubah `jumlah_paralel` menjadi `atomic<long long>` bersama dan
   prediksi dulu: benar atau salah, lebih cepat atau lambat?
2. **Buat:** antrean terbatas produsen-konsumen (`mutex` dan
   `condition_variable`); uji jumlah item yang diterima.
3. **Jelaskan:** mengapa dua `lock_guard` dengan urutan berlawanan dapat
   membeku, dan apa yang dilakukan `scoped_lock`?
4. **Berpasangan (praktikum):** pengemudi dan navigator bertukar peran tiap
   sekitar 10 menit; pasangan acak, tugas dinilai tetap perorangan. Tugas:
   satu orang menulis program dengan satu balapan tersembunyi, satunya
   menemukannya dengan TSan.

## Bagian 2: Model terdistribusi dan konsistensi (pertemuan 5 sampai 7)

**Sistem terdistribusi** adalah beberapa komputer yang bekerja sebagai satu
sistem lewat jaringan. Yang membedakannya dari program konkuren: **kegagalan
sebagian** (satu simpul mati, lainnya hidup), **pesan** dapat hilang, tertunda,
atau tiba terbalik, dan tidak ada jam bersama yang sempurna. Untuk
ketersediaan, data **direplikasi**; tetapi replikasi menimbulkan pertanyaan
**konsistensi**: apakah pembaca melihat tulisan terakhir? Pola **kuorum**: data
ada pada `N` salinan; tulisan harus sampai ke `W` salinan, pembacaan
menanyakan `R` salinan; jika `W + R > N`, setiap pembacaan bersinggungan
dengan sedikitnya satu salinan terbaru. **Konsistensi akhir** (*eventual*)
menjamin semua salinan akhirnya sama bila tak ada tulisan baru, tetapi
pembaca bisa melihat data lama sementara. Tulisan bersamaan butuh aturan
penyelesaian konflik; "terakhir menang" membuang satu tulisan diam-diam.
Algoritma konsensus seperti Raft memperjelas urutan tulisan; modul ini hanya
memperkenalkannya (rujukan di indeks).

### Prediksi dulu

`N = 3`. Tulisan baru sampai ke `W` salinan pertama, pembaca menanyakan `R`
salinan terakhir (kasus terburuk). Tebak, untuk 9 kombinasi `W`, `R`, kapan
pembaca melihat nilai `baru` dan kapan `awal`. Apakah syarat `W + R > N` cocok
dengan tebakanmu?

### Contoh terselesaikan

```cpp
#include <iostream>
#include <string>
#include <vector>
using namespace std;

struct Salinan {
    int versi = 0;
    string nilai = "awal";
};

// Tulis ke W salinan pertama saja (sisanya tak terjangkau saat itu).
void tulis(vector<Salinan> &s, int w) {
    for (int i = 0; i < w; i++) s[i] = {1, "baru"};
}

// Baca dari R salinan TERAKHIR (kasus terburuk); ambil versi tertinggi.
string baca(const vector<Salinan> &s, int r) {
    Salinan terbaik;
    for (size_t i = s.size() - r; i < s.size(); i++)
        if (s[i].versi >= terbaik.versi) terbaik = s[i];
    return terbaik.nilai;
}

int main() {
    const int N = 3;
    for (int w = 1; w <= N; w++)
        for (int r = 1; r <= N; r++) {
            vector<Salinan> s(N);
            tulis(s, w);
            cout << "W=" << w << " R=" << r << " W+R>N:" << (w + r > N) << " " << baca(s, r) << '\n';
        }
    // Dua klien menulis bersamaan; "terakhir menang" membuang satu tulisan diam-diam.
    Salinan a{5, "dari-klien-A"}, b{7, "dari-klien-B"};
    cout << "terakhir-menang: " << (b.versi > a.versi ? b : a).nilai << '\n';
}
// keluaran:
// W=1 R=1 W+R>N:0 awal
// W=1 R=2 W+R>N:0 awal
// W=1 R=3 W+R>N:1 baru
// W=2 R=1 W+R>N:0 awal
// W=2 R=2 W+R>N:1 baru
// W=2 R=3 W+R>N:1 baru
// W=3 R=1 W+R>N:1 baru
// W=3 R=2 W+R>N:1 baru
// W=3 R=3 W+R>N:1 baru
// terakhir-menang: dari-klien-B
```

Pembaca melihat `baru` tepat saat `W + R > N`: pada `W=2, R=2` penanya
terakhir (salinan 2 dan 3) bersinggungan dengan salinan 2 yang sudah ditulis.
`W=2, R=1` gagal meski dua salinan sudah baru. Pilihan nilai mengorbankan
sesuatu: `W=N` memperlambat dan mengurangi ketersediaan tulisan; `R=N`
memperlambat bacaan. Baris terakhir memperlihatkan kerugian "terakhir menang":
tulisan klien A hilang tanpa pemberitahuan. Simulasi ini deterministik karena
urutan salinan ditetapkan; sistem nyata menghadapi urutan tak menentu.

### Contoh setengah jadi

```text setengah-jadi
// N = 5, W = 3: R minimum agar selalu melihat tulisan terbaru = ___
// N = 5, R = 1: W minimum = ___ ; tulisan baru harus ke semua salinan dulu
// bila satu salinan mati, tulisan dengan W = N ___ (berhasil / gagal)
```

### Latihan

1. **Ubah:** tambahkan langkah *anti-entropy* (semua salinan menyamai versi
   tertinggi) dan prediksi hasil `W=1, R=1` sesudahnya.
2. **Buat:** simulasi `N = 5` dengan satu salinan mati; hitung kombinasi
   `W`, `R` yang masih berhasil dan benar.
3. **Jelaskan:** beri satu contoh aplikasi yang cukup dengan konsistensi akhir
   dan satu yang tidak, dengan alasannya.
4. **Berpasangan:** satu orang menulis skenario kegagalan, satunya
   menelusuri keadaan tiap salinan di kertas.

## Bagian 3: Kontainer (pertemuan 8 sampai 10)

**Kontainer** adalah proses (atau sekelompok proses) yang dijalankan dengan
**ruang nama** (*namespace*) terpisah (proses, jaringan, sistem berkas) dan
batas sumber daya (*cgroup*) oleh kernel yang **sama** dengan hospesnya; beda
dengan mesin virtual yang memuat kernel sendiri. Akibatnya: ringan dan cepat,
tetapi isolasinya lebih tipis daripada mesin virtual. **Image** adalah paket
berlapis (sistem berkas dan konfigurasi) yang menjadi dasar kontainer;
**Dockerfile** menuliskan cara membangunnya. Kebiasaan aman: image sekecil
mungkin, jalan sebagai pengguna biasa (`USER`), sistem berkas hanya-baca, hapus
kemampuan yang tak perlu, batasi memori dan CPU, dan **jangan tempel rahasia
ke image** (`KUL-U-201`).

### Prediksi dulu

Program statis kecil berikut dibungkus image `FROM scratch` yang berisi hanya
satu berkas. Tebak: PID yang dilihat program di dalam kontainer; apakah ia dapat
menulis ke `/` sebagai pengguna 1000, sebagai root, dan sebagai root dengan
`--read-only`; dan nasib proses bila memori dibatasi 64 MB tetapi ia memakai
200 MB.

### Contoh terselesaikan

```cpp
#include <unistd.h>

#include <cstdlib>
#include <cstring>
#include <fstream>
#include <iostream>
#include <vector>
using namespace std;

int main(int argc, char **argv) {
    string mode = argc > 1 ? argv[1] : "info";
    if (mode == "info") {
        const char *pesan = getenv("PESAN");
        cout << "pesan: " << (pesan ? pesan : "(tidak ada)") << '\n';
        cout << "pid: " << getpid() << '\n';
        cout << "uid: " << getuid() << '\n';
    } else if (mode == "tulis") {
        ofstream f(argc > 2 ? argv[2] : "/tulis.txt");
        f << "x";
        f.flush();
        cout << "menulis: " << (f.good() ? "berhasil" : "gagal") << '\n';
    } else if (mode == "boros") {
        vector<char> besar(200u * 1024 * 1024);
        memset(besar.data(), 1, besar.size());  // menyentuh halaman agar benar-benar terpakai
        cout << "selesai\n";
    }
    return 0;
}
```

Dockerfile (tanpa berkas dasar lain; tidak mengunduh image apa pun):

```text
FROM scratch
COPY b3 /b3
USER 1000:1000
ENTRYPOINT ["/b3"]
```

Dibangun dan dijalankan di mesin sendiri (Docker 29.10.0, g++ 13.3):

```bash
g++ -std=c++17 -O2 -static -o b3 b3.cpp
docker build -q -t osn-lab-b3:uji .
docker run --rm -e PESAN=halo osn-lab-b3:uji info
docker run --rm --user 0 osn-lab-b3:uji tulis /tulis.txt
docker run --rm --user 0 --read-only osn-lab-b3:uji tulis /tulis.txt
docker run --rm --read-only --tmpfs /tmp:uid=1000 osn-lab-b3:uji tulis /tmp/x.txt
docker run --rm --memory 64m --memory-swap 64m osn-lab-b3:uji boros; echo "kode $?"
docker rmi osn-lab-b3:uji
```

```text
pesan: halo
pid: 1
uid: 1000
menulis: berhasil
menulis: gagal
menulis: berhasil
kode 137
```

Di dalam kontainer program adalah **PID 1** (ruang nama proses sendiri), dan
berjalan sebagai uid 1000 karena `USER`. Sebagai root ia dapat menulis ke `/`;
`--read-only` membuatnya gagal; `--tmpfs /tmp` memberi satu tempat tulis
terbatas. Kode keluar **137** = 128 + 9 (`SIGKILL`): kernel menghentikan
proses karena melampaui batas memori. Image kira-kira 2 MB pada Docker 29.10.0
karena hanya berisi satu program statis; image berbasis distribusi jauh lebih
besar dan membawa banyak paket yang harus diperbarui.

### Contoh setengah jadi

```text setengah-jadi
FROM ubuntu:latest                        # cacat 1: ___
COPY . /app                               # cacat 2: ___
RUN echo "KUNCI_API=abc123" > /app/.env   # cacat 3: ___
CMD ["/app/jalan"]                        # cacat 4 (pengguna): ___
```

### Latihan

1. **Ubah:** tambahkan `--cap-drop ALL --security-opt no-new-privileges
   --network none` pada `info`; prediksi apakah keluarannya berubah.
2. **Buat:** Dockerfile bertahap (*multi-stage*) yang membangun program C++ lalu
   menyalin hanya hasil build ke image akhir.
3. **Jelaskan:** mengapa kontainer tidak otomatis aman, dan apa yang tidak
   dipisahkan darinya (kernel hospes)?
4. **Berpasangan:** satu orang menulis Dockerfile dengan tiga cacat, satunya
   meninjau dengan daftar periksa di atas.

## Bagian 4: Layanan cloud dan proyek (pertemuan 11 sampai 14)

NIST SP 800-145 mendefinisikan komputasi awan sebagai model akses jaringan
sesuai permintaan ke kumpulan sumber daya yang dapat disediakan dan dilepas
dengan cepat; ia menyebut lima karakteristik, tiga model layanan, dan empat
model penerapan. Tiga model layanan: **IaaS** (kamu mengelola sistem
operasi dan ke atas), **PaaS** (kamu hanya membawa aplikasi), **SaaS** (kamu
memakai aplikasi jadi). Dalam semuanya berlaku **tanggung jawab bersama**:
penyedia mengamankan infrastruktur dasarnya, kamu mengamankan akun, data,
konfigurasi, dan kodemu. Kebocoran paling umum: izin terlalu luas, akun tanpa
verifikasi dua langkah, kunci akses di repositori, dan sumber daya yang
terlupa menyala. Biaya adalah risiko nyata: per jam, per GB simpan, dan **data
keluar** ditagih terpisah.

Penyedia sering menawarkan kredit atau tingkat gratis terbatas, tetapi syarat,
batas, dan harganya berubah. Penyusun tidak memverifikasi angka apa pun per
2026-11; **cek halaman resmi penyedia pada hari kamu mendaftar** dan setel
peringatan anggaran sebelum membuat apa pun. Program berikut memakai harga
**fiktif** untuk melatih cara menghitung.

### Prediksi dulu

Dengan harga fiktif di program: berapa biaya sebulan layanan yang menyala 730
jam dibanding 160 jam, pada cara sesuai permintaan dan cara komitmen bulanan;
berapa jam impas; dan berapa ketersediaan satu, dua, tiga salinan bila
masing-masing hidup 99% dan independen.

### Contoh terselesaikan

```cpp
#include <cmath>
#include <iomanip>
#include <iostream>
using namespace std;

// SEMUA harga FIKTIF (satuan uang bebas). Harga nyata berubah: baca halaman
// harga penyedia pada hari kamu menghitung.
const double PER_JAM = 0.05;      // mesin virtual sesuai permintaan
const double BULANAN = 25.0;      // komitmen bulanan, mesin yang sama
const double PER_GB_SIMPAN = 0.02;
const double PER_GB_KELUAR = 0.09;  // data keluar dari cloud

double lain(double gb_simpan, double gb_keluar) {
    return PER_GB_SIMPAN * gb_simpan + PER_GB_KELUAR * gb_keluar;
}

int main() {
    cout << fixed << setprecision(2);
    for (double jam : {730.0, 160.0})
        cout << "nyala " << jam << " jam: permintaan " << PER_JAM * jam + lain(100, 50)
             << " vs komitmen " << BULANAN + lain(100, 50) << '\n';
    cout << "jam impas: " << BULANAN / PER_JAM << '\n';

    // Ketersediaan n salinan independen yang masing-masing hidup dengan peluang a.
    cout << setprecision(6);
    for (int n = 1; n <= 3; n++) cout << "salinan " << n << ": " << 1.0 - pow(1.0 - 0.99, n) << '\n';
}
// keluaran:
// nyala 730.00 jam: permintaan 43.00 vs komitmen 31.50
// nyala 160.00 jam: permintaan 14.50 vs komitmen 31.50
// jam impas: 500.00
// salinan 1: 0.990000
// salinan 2: 0.999900
// salinan 3: 0.999999
```

Komitmen menang (31,50 vs 43,00) bila layanan menyala sepanjang bulan;
sesuai permintaan menang (14,50) untuk 160 jam; impasnya 500 jam. Dua salinan
independen menaikkan ketersediaan dari 99% menjadi 99,99%: tetapi hanya bila
kegagalannya **benar-benar independen** (satu salah konfigurasi yang
sama menjatuhkan semuanya). Izin juga diperiksa dengan prinsip hak sekecil
mungkin; bentuk berikut generik karangan, bukan sintaks penyedia mana pun:

```json
{ "efek": "izinkan", "aksi": "*", "sumber": "*" }
```

```json
{ "efek": "izinkan", "aksi": ["baca"], "sumber": ["bucket-laporan/*"] }
```

Yang pertama memberi **segalanya** pada semuanya: bila kuncinya bocor, seluruh
akun terbuka. Yang kedua hanya membaca satu bucket. Kunci tidak ditulis di
kode dan tidak ditempel ke asisten AI.

### Contoh setengah jadi

```text setengah-jadi
// Layanan 100 jam/bulan, harga fiktif 0.05/jam: biaya = ___
// Data keluar 200 GB, 0.09/GB: biaya = ___
// Peringatan anggaran 80% dari batas 50 -> dipicu pada biaya ___
// Setelah percobaan, langkah wajib: ___ semua sumber daya
```

### Latihan

1. **Ubah:** ubah harga fiktif (mis. komitmen 20) dan hitung jam impas baru
   sebelum menjalankan.
2. **Buat:** pemeriksa kebijakan izin sederhana yang menandai `"*"` pada aksi
   atau sumber; uji dengan tiga kebijakan karangan.
3. **Jelaskan:** apa itu tanggung jawab bersama; sebut dua hal yang menjadi
   urusanmu pada IaaS.
4. **Berpasangan:** satu orang menyusun rencana arsitektur sebuah layanan kecil
   di kertas dengan daftar sumber daya; satunya memperkirakan biayanya dengan
   rentang dan menandai satu risiko.

**Proyek (pertemuan 13 dan 14).** Dari spesifikasi dosen, rancang dan jalankan
layanan kecil konkuren (soket atau HTTP) dalam kontainer di mesinmu, dengan
rencana penerapan cloud **tertulis** (tanpa perlu menerapkannya): arsitektur,
perkiraan biaya berentang, batas anggaran, izin sekecil mungkin, dan langkah
penghapusan. Sertakan riwayat Git (sedikitnya empat *commit*), uji beban
sederhana, dan refleksi satu halaman. Tidak ada contoh terselesaikan.

## Latihan bercampur

Soal berikut **tidak menyebut** topiknya. Contoh: "Dua simpan menulis data yang
sama dan satu nilai hilang" (konflik tulis), "Program menjumlah di banyak utas
tetapi lebih lambat dari satu utas" (bagian serial atau penulisan bersama),
"Kontainer terbunuh dengan kode 137" (batas memori). Kuis kumulatif
(pertemuan 3, 7, 11, 14) berbentuk sama.

## Ulang berjarak

Kerjakan ulang tanpa melihat solusi lama:

- satu minggu setelah bagian: tulis ulang `pindah` dengan `scoped_lock` atau
  simulasi kuorum dari ingatan;
- awal tiap bagian baru: dua soal dari bagian sebelumnya;
- minggu sebelum ujian: tiga soal yang dahulu salah;
- semester berikutnya, jawab tanpa catatan (dipakai `KUL-I-401`): mengapa kunci
  cloud tidak ditempel ke asisten AI dan apa tiga langkah mencegah tagihan
  membengkak.

## Kebijakan AI dan log pemakaian

Silabus bagian 6.3 **belum menyatakan** tingkat AI mata kuliah ini. Modul
memakai usulan baku `[asumsi]` (Q2 rancangan): **Kuning** untuk tugas program
konkuren, **Hijau** untuk proyek dan eksplorasi bagian 3 dan 4 (dengan log),
**Merah** untuk ujian dan praktik; dosen menetapkan per tugas. Pada Kuning AI
boleh menjelaskan konsep, **tidak** boleh menghasilkan solusi yang diserahkan,
dan hanya sesudah gerbang kesiapan: kamu dapat (1) menelusuri program pendek,
(2) menulis satu uji yang gagal bila kode salah, (3) menjelaskan kode dengan
kata sendiri. Log di repositorimu: alat dan versi, tujuan, perintah, bagian
keluaran yang dipakai. Jangan memasukkan data pribadi, kata sandi, kunci
akses cloud, atau ID akun ke layanan AI.

**Butir khas: infrastruktur.** Dockerfile, konfigurasi, dan kebijakan izin
buatan AI **ditinjau manusia sebelum dijalankan**: periksa image dasar yang
tak dikenal, `USER root`, `--privileged`, port terbuka, dan izin `"*"`. Jangan
menjalankan perintah cloud hasil AI pada akun berisi data nyata sebelum kamu
memahami tiap baris; hapus sumber daya sesudahnya. Dosen dapat mewawancarai
kodemu.

## Kesalahan umum

- **Menaikkan variabel bersama dari banyak utas tanpa kunci** karena "hanya
  satu angka".
- **Mengunci dalam urutan berbeda**, atau memegang kunci saat menunggu lama.
- **Mengira lebih banyak utas selalu lebih cepat** (bagian serial, biaya sinkron).
- **Mengira `W + R > N` memberi konsistensi sempurna** di semua keadaan
  (urutan, pemisahan jaringan, tulisan bersamaan perlu aturan sendiri).
- **Menganggap kontainer sama dengan mesin virtual**, atau menjalankannya
  sebagai root dengan hak penuh.
- **Memasukkan rahasia ke image atau repositori**; **lupa menghapus** sumber
  daya cloud; **tidak memasang batas anggaran**.

## Cek mandiri

Tutup modul, jawab, baru periksa.

1. Mengapa balapan data tak terdefinisi, dan apa dua perbaikannya?
2. Bagaimana `scoped_lock` mencegah kebuntuan?
3. Percepatan maksimum Amdahl bila 20% program serial dan prosesor sangat banyak?
4. Untuk `N = 5`, `W = 3`: nilai `R` minimum untuk bacaan terbaru?
5. Apa beda kontainer dan mesin virtual, dan apa arti kode keluar 137?
6. Apa itu tanggung jawab bersama pada cloud?
7. Mengapa kebijakan izin `"*"` berbahaya?

Daftar periksa (kosong; kamu isi sendiri, tidak dikumpulkan):

- [ ] Aku dapat menemukan dan memperbaiki balapan data dan kebuntuan.
- [ ] Aku dapat menalar kuorum dan konsistensi akhir pada contoh kecil.
- [ ] Aku dapat menulis Dockerfile aman dan membatasi sumber dayanya.
- [ ] Aku dapat memperkirakan biaya cloud dengan rentang dan batas anggaran.

## Kunci dan petunjuk

- **Ingat kembali:** `x++` adalah baca, tambah, tulis sehingga dua utas dapat
  saling menimpa; perbaikan: kunci atau atomik. Proses punya ruang alamat
  sendiri; utas dalam satu proses berbagi ruang alamat. TCP aliran byte: satu
  `recv` bisa sebagian pesan; peladen memakai pembatas (`\n`) atau panjang.
- **Setengah jadi:** bagian 1: `kapasitas`, `notify_one`. Bagian 2: `R = 3`
  (karena `W + R > 5`); `W = 5`; tulisan dengan `W = N` **gagal**. Bagian 3: tag
  `latest` tak dipatok; menyalin seluruh konteks (termasuk rahasia); rahasia di
  dalam image; masih root, tambahkan `USER`. Bagian 4: 5; 18; 40; hapus.
- **Cek mandiri:** (3) `1 / 0,2 = 5`; (4) `R = 3`.
- **Petunjuk bertahap:** (1) gambar dua utas dan baris waktu; (2) tulis urutan
  kunci tiap utas; (3) cari dua kunci yang diambil berlawanan.

## Langkah berikutnya

`KUL-I-401` memakai kontainer, konkurensi, dan kebijakan AI tim untuk proyek
bersama; `KUL-I-205` memakai layanan web yang dapat dikontainerkan.

## Catatan untuk dosen

Bobot dan bentuk asesmen berikut **usulan**; prodi menetapkan (silabus 6.1,
6.2): praktikum utas dan kontainer, kuis kumulatif, wawancara kode, ujian
tertulis dan praktik tanpa AI. Variasi tugas per mahasiswa: jumlah rekening,
`N` dan `W`, program kontainer. Kontainer dijalankan di mesin yang
mengizinkan Docker; di lab tanpa Docker, gantikan dengan Podman atau
`unshare`. Percobaan cloud sungguhan opsional dan hanya dengan akun berbatas
anggaran; jangan menugaskan penerapan berbayar tanpa persetujuan prodi.
Modul tidak mengajarkan Kubernetes atau konsensus (Raft) secara mendalam.
