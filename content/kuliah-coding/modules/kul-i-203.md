# Organisasi Komputer dan Sistem Operasi

> **DRAF — belum ditinjau.** Ini modul belajar untuk mata kuliah `KUL-I-203`
> (3 SKS, semester 4, jalur I), bagian dari program `kuliah-coding`. Konten
> karangan menurut ADR-0007; belum disetujui pemilik atau peninjau. Kode di
> modul ini adalah **C++17** (g++ 13.3, Linux x86-64), **assembly x86-64**
> (GNU as 2.42, sintaks Intel), dan perintah **bash 5.2** (GNU coreutils
> 9.4). Blok `cpp` dikompilasi dengan `-std=c++17 -Wall -Wextra` tanpa
> peringatan, dijalankan, dan keluarannya cocok dengan yang tertulis;
> assembly dirakit dan dijalankan; perintah bash dijalankan. Blok berinfo
> `setengah-jadi` sengaja berlubang dan tidak dijalankan.

## Untuk siapa modul ini

Mahasiswa semester 4 informatika atau ilmu komputer yang sudah menempuh
`KUL-I-101` (penunjuk, memori, fungsi). Satu mata kuliah, satu semester: 14
pertemuan, ujian tengah sesudah pertemuan 7, ujian akhir sesudah pertemuan 14
`[asumsi]` (silabus 2.3). Kamu butuh mesin Linux (atau mesin virtual Linux)
dengan g++ dan binutils (`as`, `ld`), serta Git.

**Keputusan penyusun `[asumsi]`: bahasa assembly.** Silabus belum menetapkan
arsitektur set instruksi (ISA). Modul ini memakai **x86-64 di Linux**, GNU
`as` bersintaks Intel, dengan **system call langsung** tanpa pustaka C.
Alasannya: (1) `as` dan `ld` satu paket dengan g++ yang sudah kamu pakai,
tanpa emulator; (2) langsung jalan di komputer Linux x86-64 yang umum di
laboratorium; (3) satu mesin cukup untuk assembly, proses, dan sistem berkas.
Kekurangannya: ISA ini besar dan penuh warisan lama (modul hanya memakai
belasan instruksi), dan mesin berbasis ARM tak menjalankannya langsung (pakai
mesin virtual, atau minta dosen memakai ISA lain seperti RISC-V). Konsepnya
sama di semua ISA. Di semester 4 contoh terselesaikan penuh hanya untuk
konsep **baru**; sisanya setengah jadi.

## Peta semester

| Pertemuan | Bagian | Pokok bahasan | CPMK | Kuis pembuka (jarak) |
| --- | --- | --- | --- | --- |
| 1 | 1 | Bit, bilangan bulat, komplemen dua | C1 | `KUL-I-101`: penunjuk |
| 2 | 1 | Urutan byte, bilangan pecahan, luapan | C1 | 1, lalu `KUL-I-101`: memori |
| 3 | 1 | CPU, register, memori; siklus ambil-jalankan; **kuis kumulatif 1** | C1 | 2, lalu 1 |
| 4 | 2 | Register, instruksi, lompatan | C1 | 3, lalu 1 |
| 5 | 2 | Tumpukan, `call` dan `ret`, system call | C1 | 4, lalu 2 |
| 6 | 3 | Proses dan `fork` | C2 | 5, lalu 3 |
| 7 | 3 | Utas dan kunci; **kuis kumulatif 2** | C2 | 6, lalu 4 |
| ujian tengah | | Ujian tertulis dan praktik, tanpa AI | C1–C2 | |
| 8 | 3 | Penjadwalan: FCFS, SJF, *round robin* | C2 | 7, lalu 5 |
| 9 | 4 | Ruang alamat, halaman, tabel halaman | C2 | 8, lalu 6 |
| 10 | 4 | Galat halaman dan penggantian halaman | C2 | 9, lalu 7 |
| 11 | 4 | Alokasi memori; **kuis kumulatif 3** | C2 | 10, lalu 8 |
| 12 | 5 | Sistem berkas, deskriptor, izin | C3 | 11, lalu 9 |
| 13 | 5 | Baris perintah, pipa, pengalihan | C3 | 12, lalu 10 |
| 14 | 5 | Skrip kecil; proyek; **kuis kumulatif akhir** | C3 | 13, lalu 1 sampai 12 |
| ujian akhir | | Ujian tertulis dan praktik, tanpa AI | C1–C3 | |

## Ingat kembali

Tiap pertemuan dibuka kuis 5 menit **tanpa catatan**, 3 sampai 5 soal. Kolom
terakhir peta menunjukkan asal soalnya, dengan jarak bertambah; pertemuan 1
dan 2 mengambil dari `KUL-I-101`. Contoh soal pertemuan 1 sampai 3:

1. Apa yang dilakukan `*p` dan apa yang dilakukan `&x`?
2. Apa akibatnya memakai memori sesudah `delete`, dan mengapa `new` perlu
   `delete`?
3. Mengapa `int f(int x)` yang mengubah `x` tidak mengubah variabel pemanggil?
4. Tulis kasus dasar dan langkah rekursif `fpb(a, b)`.

Pertanyaan 1 dan 2 menjadi dasar bagian 2 dan 4: alamat adalah bilangan, dan
memori punya tempat serta masa pakai. Mengingat dengan usaha, bukan membaca
ulang, yang membuat ingatan bertahan.

## Tujuan

Pada akhir semester kamu dapat (CPMK, silabus bagian 3.1):

- **C1** menjelaskan arsitektur CPU dan memori;
- **C2** menjelaskan proses, penjadwalan, memori virtual;
- **C3** memakai baris perintah dan sistem berkas.

## Bagian 1: Representasi data; CPU dan memori (pertemuan 1 sampai 3)

Semua yang disimpan komputer adalah **bit**. Bilangan bulat tanpa tanda `n`
bit bernilai 0 sampai `2^n - 1`; yang bertanda memakai **komplemen dua**:
`-x` diperoleh dengan membalik semua bit `x` lalu menambah 1. Hasil melebihi
rentang **melingkar** pada bilangan tanpa tanda; pada bilangan bertanda di C++
luapan adalah **perilaku tak terdefinisi**. *Little-endian* menaruh byte paling
tidak signifikan di alamat terendah (x86-64). Titik mengambang (IEEE 754)
hanya memperkirakan sebagian besar pecahan desimal.

CPU mengulang **siklus ambil-jalankan**: ambil instruksi dari alamat di `rip`
(penghitung program), dekode, jalankan, lalu `rip` menunjuk berikutnya.
**Register** adalah penyimpan kecil super cepat di dalam CPU; **memori utama**
jauh lebih besar tetapi lebih lambat per akses, sehingga ada hierarki memori
(register, *cache*, memori utama, penyimpanan).

### Prediksi dulu

Tulis keluaran tanpa menjalankan: empat byte `0x01020304` menurut urutan di
memori; biner 8-bit dari 13 dan dari -13; `a + k` untuk `uint8_t` 200 dan 100
(sebagai `int`) lalu disimpan kembali ke 8 bit; bit `1.0f`; dan apakah
`0.1 + 0.2 == 0.3`.

```cpp
#include <bitset>
#include <cstdint>
#include <cstring>
#include <iostream>
using namespace std;

int main() {
    uint32_t x = 0x01020304;
    unsigned char b[4];
    memcpy(b, &x, sizeof x);
    for (unsigned char c : b) cout << static_cast<int>(c) << ' ';
    cout << '\n';

    cout << bitset<8>(13) << ' ' << bitset<8>(static_cast<uint8_t>(-13)) << '\n';

    uint8_t a = 200, k = 100;
    cout << (a + k) << ' ' << static_cast<int>(static_cast<uint8_t>(a + k)) << '\n';

    float f = 1.0f;
    uint32_t bits;
    memcpy(&bits, &f, sizeof f);
    cout << hex << bits << dec << '\n';

    double d = 0.1 + 0.2;
    cout << (d == 0.3) << ' ' << (d - 0.3 < 1e-9 && 0.3 - d < 1e-9) << '\n';
    return 0;
}
// keluaran:
// 4 3 2 1 
// 00001101 11110011
// 300 44
// 3f800000
// 0 1
```

### Contoh terselesaikan

`4 3 2 1`: byte `04` ada di alamat terendah, jadi mesin ini
*little-endian* (bergantung mesin). `-13`: balik bit 13 (`11110010`) lalu
tambah 1 menjadi `11110011` (243 = `256 - 13`). `a + k` dihitung sebagai `int`
(300); disimpan ke 8 bit menjadi `300 mod 256 = 44`: **luapan melingkar**.
`1.0f` berbit `0x3f800000`. `0.1 + 0.2 == 0.3` salah karena 0,1 dan 0,2 tak
dapat dinyatakan tepat dalam biner; bandingkan dengan **toleransi**.

### Contoh setengah jadi

```text setengah-jadi
// 1. 8-bit komplemen dua dari -5: balik bit 5 (00000101) -> ___, tambah 1 -> ___
// 2. nilai bertanda dari 11111111 (8-bit komplemen dua) = ___
// 3. uint8_t x = 250; x += 10; // x menjadi ___
// 4. alamat elemen int berindeks 3 pada larik di alamat 1000 (int 4 byte) = ___
```

### Latihan

1. **Ubah:** cetak biner 16-bit dari 1000 dan -1000; prediksi lebih dulu.
2. **Buat:** `bool littleEndian()` dengan `memcpy` atau penunjuk
   `unsigned char`.
3. **Jelaskan:** mengapa `0.1 + 0.2 == 0.3` salah dan bagaimana membandingkan
   dua `double` dengan aman?
4. **Berpasangan (praktikum):** pengemudi mengetik, navigator menjelaskan
   dengan kata-kata, tukar peran tiap sekitar 10 menit; pasangan dibentuk acak
   per bagian dan tugas yang dinilai tetap perorangan. Tugas: satu orang
   memilih bilangan 8-bit, satu orang menulisnya dalam biner dan komplemen dua
   tanpa komputer, lalu cocokkan dengan program.

## Bagian 2: Assembly dasar (pertemuan 4 dan 5)

Assembly adalah **nama yang bisa dibaca** untuk instruksi mesin; satu baris
umumnya satu instruksi. Pada x86-64: register 64-bit (`rax`, `rcx`, `rdx`,
`rsi`, `rdi`, ...), `rsp` menunjuk puncak **tumpukan**. Instruksi di modul ini:
`mov`, `add`, `dec`, `imul`, `cmp` (mengisi *flag*), `jnz`/`jle` (lompat
bersyarat membaca *flag*), `push`/`pop`, `call`/`ret`, `lea`, dan `syscall`
(minta layanan kernel). **System call** Linux x86-64: nomor di `rax`, argumen
di `rdi`, `rsi`, `rdx`; nomor 1 adalah `write`, nomor 60 adalah `exit`.

Merakit dan menjalankan `jumlah.s`:

```bash
as --64 -o jumlah.o jumlah.s
ld -o jumlah jumlah.o
./jumlah ; echo $?
```

### Prediksi dulu

Program menjumlah 10 + 9 + ... + 1 lalu keluar dengan hasil sebagai **kode
keluar**; tebak kode keluarnya. Program kedua mencetak teks lewat `write` ke
deskriptor 1 (keluaran standar); tebak yang tampak dan kode keluarnya.

### Contoh terselesaikan

```text
.intel_syntax noprefix
.globl _start
.text
_start:
    mov rcx, 10
    xor rax, rax
ulang:
    add rax, rcx
    dec rcx
    jnz ulang
    mov rdi, rax
    mov rax, 60
    syscall
```

`./jumlah ; echo $?` mencetak `55`. `rcx` berjalan 10, 9, ..., 1; `rax`
terkumpul 10, 19, 27, ..., 55. `dec rcx` mengisi *flag* nol; `jnz ulang`
melompat selama hasilnya tidak nol. `rdi` menjadi kode keluar, `rax = 60`
memilih `exit`, lalu `syscall`. Perulangan `for` di C++ adalah rangkaian
lompatan dan penghitung seperti ini.

Program kedua, `halo.s`, mencetak `Halo, OS` lalu keluar dengan kode 0:

```text
.intel_syntax noprefix
.globl _start
.data
pesan: .ascii "Halo, OS\n"
.set panjang, . - pesan
.text
_start:
    mov rax, 1
    mov rdi, 1
    lea rsi, [rip + pesan]
    mov rdx, panjang
    syscall
    mov rax, 60
    xor rdi, rdi
    syscall
```

`write(1, pesan, panjang)`: `rdi` deskriptor, `rsi` alamat teks, `rdx` banyak
byte; `xor rdi, rdi` mengosongkan register (kode keluar 0). Tanpa pustaka C,
programmu berbicara langsung dengan kernel.

**Fungsi dan tumpukan.** `call` mendorong alamat kembali lalu melompat; `ret`
mengambilnya. Argumen pertama di `rdi`, hasil di `rax` (konvensi g++ di Linux
x86-64). Faktorial rekursif `fakt.s` menyimpan `rdi` di tumpukan sebelum
panggilan rekursif:

```text
.intel_syntax noprefix
.globl _start
.text
_start:
    mov rdi, 5
    call fakt
    mov rdi, rax
    mov rax, 60
    syscall

fakt:
    cmp rdi, 1
    jle dasar
    push rdi
    dec rdi
    call fakt
    pop rdi
    imul rax, rdi
    ret
dasar:
    mov rax, 1
    ret
```

Kode keluarnya 120 (5!, muat dalam 8 bit). Telusuran `fakt(3)`:

| Langkah | `rdi` | Tumpukan (alas ke puncak) | `rax` |
| --- | --- | --- | --- |
| `call fakt` pertama | 3 | kembali ke `_start` | |
| `push`, `dec`, `call` | 2 | ..., 3, kembali | |
| `push`, `dec`, `call` | 1 | ..., 3, kembali, 2, kembali | |
| `dasar`: `mov rax, 1`, `ret` | 1 | ..., 3, kembali, 2 | 1 |
| `pop rdi` (2), `imul`, `ret` | 2 | ..., 3 | 2 |
| `pop rdi` (3), `imul`, `ret` | 3 | | 6 |

### Contoh setengah jadi

`2^7` dengan tujuh kali penggandaan, keluar dengan hasilnya (harus kurang dari
256):

```text setengah-jadi
_start:
    mov rax, ___
    mov rcx, 7
ulang:
    add rax, ___
    dec ___
    jnz ulang
    mov rdi, rax
    mov rax, 60
    syscall
```

### Latihan

1. **Ubah:** jumlahkan 1 sampai 20; prediksi kode keluar lebih dulu (hanya 8
   bit).
2. **Buat:** cetak `Halo, OS` tiga kali dengan perulangan dan `write`.
3. **Jelaskan:** apa yang terjadi pada tumpukan saat `call` dan `ret`, dan
   mengapa rekursi sangat dalam dapat menghabiskan tumpukan?
4. **Berpasangan:** satu orang menulis program 3 sampai 5 instruksi, satu
   orang menelusurinya dengan tabel register tanpa menjalankan; lalu rakit dan
   bandingkan.

## Bagian 3: Proses, utas, dan penjadwalan (pertemuan 6 sampai 8)

**Proses** adalah program yang sedang berjalan: punya **ruang alamat**
sendiri, berkas terbuka, dan keadaan CPU. **Utas** (*thread*) adalah jalur
eksekusi di dalam proses; semua utas dalam satu proses **berbagi** memori
tetapi punya tumpukan dan register sendiri. Kernel memberi tiap proses ilusi
memiliki mesin sendiri dengan membagi waktu CPU. `fork()` menyalin proses:
pada **induk** mengembalikan nomor anak, pada **anak** 0.

### Prediksi dulu

Anak menambah variabel lalu keluar dengan kode 7; induk menunggu lalu
mencetak. Tebak dua baris keluaran dan kode keluar yang dibaca induk. Apakah
perubahan di anak terlihat di induk?

### Contoh terselesaikan

```cpp
#include <iostream>
#include <sys/wait.h>
#include <unistd.h>
using namespace std;

int main() {
    int nilai = 10;
    pid_t pid = fork();
    if (pid == 0) {
        nilai += 5;
        cout << "anak: " << nilai << endl;
        return 7;
    }
    int status = 0;
    waitpid(pid, &status, 0);
    cout << "induk: " << nilai << ' ' << WEXITSTATUS(status) << endl;
    return 0;
}
// keluaran:
// anak: 15
// induk: 10 7
```

Anak mencetak 15, induk 10: anak mengubah **salinannya** karena ruang alamat
terpisah. Urutan cetak tetap karena induk **menunggu** (`waitpid`); tanpa itu
urutan bergantung penjadwal.

**Utas berbagi memori.** Tanpa kunci, `x++` bukan satu langkah (baca, tambah,
tulis) dan dua utas dapat saling menimpa hasil: **balapan data**, perilaku tak
terdefinisi yang hasilnya berbeda tiap jalan, sehingga tidak ditunjukkan. Dua
perbaikannya, **kunci** dan **operasi atomik**:

```cpp
#include <atomic>
#include <iostream>
#include <mutex>
#include <thread>
#include <vector>
using namespace std;

int main() {
    long long dengan_kunci = 0;
    mutex kunci;
    atomic<long long> atomik(0);

    vector<thread> semua;
    for (int t = 0; t < 4; t++) {
        semua.emplace_back([&]() {
            for (int i = 0; i < 100000; i++) {
                {
                    lock_guard<mutex> jaga(kunci);
                    dengan_kunci++;
                }
                atomik++;
            }
        });
    }
    for (auto &u : semua) u.join();
    cout << dengan_kunci << ' ' << atomik.load() << '\n';
    return 0;
}
// keluaran:
// 400000 400000
```

Dikompilasi dengan `-pthread`. Keduanya benar (`4 * 100000`) berapa kali pun
dijalankan; `lock_guard` melepas kunci di akhir blok; `join` menunggu utas.

**Penjadwalan** memilih proses yang memakai CPU; ukurannya antara lain **waktu
tunggu** rata-rata. **FCFS** melayani menurut kedatangan; **SJF** yang paling
pendek dulu; ***round robin*** memberi tiap proses jatah (*kuantum*) lalu
bergiliran. Empat proses tiba pada waktu 0, lama kerja 5, 3, 8, 2. FCFS dan
SJF dihitung dengan program; *round robin* (kuantum 2) kamu tulis sendiri di
latihan 2 dan hasilnya kamu cocokkan dengan hitungan tangan.

```cpp
#include <algorithm>
#include <iostream>
#include <numeric>
#include <vector>
using namespace std;

// semua proses tiba pada waktu 0; hasil: waktu tunggu rata-rata
double layani(const vector<int> &burst, const vector<int> &urutan) {
    int waktu = 0, jumlah = 0;
    for (int i : urutan) {
        jumlah += waktu;
        waktu += burst[i];
    }
    return static_cast<double>(jumlah) / static_cast<double>(burst.size());
}

int main() {
    vector<int> burst = {5, 3, 8, 2};
    vector<int> urut(burst.size());
    iota(urut.begin(), urut.end(), 0);
    cout << "FCFS " << layani(burst, urut) << '\n';
    stable_sort(urut.begin(), urut.end(), [&](int a, int b) { return burst[a] < burst[b]; });
    cout << "SJF " << layani(burst, urut) << '\n';
    return 0;
}
// keluaran:
// FCFS 7.25
// SJF 4.25
```

FCFS menunggu 0, 5, 8, 16 (rata-rata 7,25); SJF melayani 2, 3, 5, 8 dan
memberi rata-rata terkecil (optimal bila semua tiba bersamaan), tetapi butuh
mengetahui lama kerja dan dapat membuat proses panjang kelaparan. Hitungan
tangan *round robin* kuantum 2: jadwal berjalan P1 2, P2 2, P3 2, P4 2 (selesai
pada 8), P1 2, P2 1 (selesai pada 11), P3 2, P1 1 (selesai pada 14), P3 2 dan
2 (selesai pada 18); tunggu = selesai - lama kerja = 9, 8, 10, 6, rata-rata
8,25. RR di sini terbesar tetapi **adil** dan responsif: tak ada proses lama
menunggu sebelum **mulai**. Kuantum terlalu kecil membuang waktu berganti
konteks; terlalu besar menjadikannya FCFS.

### Contoh setengah jadi

`RR(2)` untuk dua proses berlama kerja 3 dan 4:

```text setengah-jadi
// 0-2: proses 1 (sisa 1);  2-4: proses 2 (sisa ___)
// 4-5: proses 1 selesai pada ___;  5-7: proses 2 selesai pada ___
// tunggu proses 1 = selesai - 3 = ___ ; tunggu proses 2 = selesai - 4 = ___
```

### Latihan

1. **Ubah:** beri waktu tiba berbeda pada FCFS (proses hanya dilayani bila
   sudah tiba); tulis uji dengan tangan dulu.
2. **Buat:** fungsi `roundRobin(burst, kuantum)` dengan queue; cocokkan
   `RR(2)` dengan 8,25, lalu coba kuantum 1 dan 8 dan jelaskan perbedaannya.
3. **Jelaskan:** mengapa utas dalam satu proses dapat saling mengganggu,
   sedangkan dua proses tidak?
4. **Berpasangan:** satu orang membuat deret *burst* acak, satu orang
   memprediksi urutan FCFS, SJF, RR; cocokkan dengan program.

## Bagian 4: Memori dan memori virtual (pertemuan 9 sampai 11)

Tiap proses memandang memorinya sebagai ruang alamat **virtual** miliknya
sendiri. Kernel dan perangkat keras (MMU) menerjemahkannya ke **memori fisik**
lewat **halaman** berukuran tetap (banyak sistem: 4096 byte): **nomor halaman**
= `alamat / ukuran`, **offset** = `alamat mod ukuran`. **Tabel halaman**
memetakan halaman ke **bingkai** fisik; alamat fisik = `bingkai * ukuran +
offset`. Halaman yang tak ada di memori memicu **galat halaman**: kernel
memuatnya bila sah, atau menghentikan proses bila tak sah. Manfaatnya: isolasi
antarproses dan ruang alamat lebih besar daripada memori fisik. Bila bingkai
penuh, satu halaman diganti: FIFO (paling lama masuk) atau LRU (paling lama
tak dipakai).

### Prediksi dulu

Tabel halaman: halaman 0 ke bingkai 5, 1 ke 2, 2 tidak sah (-1), 3 ke 0;
halaman 4096 byte. Terjemahkan 4660, 4096, 8200, 20000. Lalu rangkaian acuan
`3 1 4 1 5 2 6 5 3 5` dengan 3 bingkai: galat FIFO dan LRU? Rangkaian
`1 2 3 4 1 2 5 1 2 3 4 5` dengan FIFO: galat bertambah atau berkurang bila
bingkai 3 menjadi 4?

### Contoh terselesaikan

```cpp
#include <algorithm>
#include <deque>
#include <iostream>
#include <vector>
using namespace std;

const int UKURAN_HALAMAN = 4096;

void terjemahkan(const vector<int> &tabel, int alamat) {
    int halaman = alamat / UKURAN_HALAMAN;
    int offset = alamat % UKURAN_HALAMAN;
    cout << alamat << " -> halaman " << halaman << ", offset " << offset;
    if (halaman >= static_cast<int>(tabel.size()) || tabel[halaman] < 0) {
        cout << " -> galat halaman\n";
    } else {
        cout << " -> fisik " << tabel[halaman] * UKURAN_HALAMAN + offset << '\n';
    }
}

// lru = false: FIFO; lru = true: LRU
int galat(const vector<int> &acuan, size_t bingkai, bool lru) {
    deque<int> isi;
    int hitung = 0;
    for (int h : acuan) {
        auto it = find(isi.begin(), isi.end(), h);
        if (it != isi.end()) {
            if (lru) {
                isi.erase(it);
                isi.push_back(h);
            }
            continue;
        }
        hitung++;
        if (isi.size() == bingkai) isi.pop_front();
        isi.push_back(h);
    }
    return hitung;
}

int main() {
    vector<int> tabel = {5, 2, -1, 0};
    for (int a : {4660, 4096, 8200, 20000}) terjemahkan(tabel, a);
    vector<int> acuan = {3, 1, 4, 1, 5, 2, 6, 5, 3, 5};
    cout << galat(acuan, 3, false) << ' ' << galat(acuan, 3, true) << '\n';
    vector<int> belady = {1, 2, 3, 4, 1, 2, 5, 1, 2, 3, 4, 5};
    cout << galat(belady, 3, false) << ' ' << galat(belady, 4, false) << '\n';
    return 0;
}
// keluaran:
// 4660 -> halaman 1, offset 564 -> fisik 8756
// 4096 -> halaman 1, offset 0 -> fisik 8192
// 8200 -> halaman 2, offset 8 -> galat halaman
// 20000 -> halaman 4, offset 3616 -> galat halaman
// 8 7
// 9 10
```

`4660 = 1*4096 + 564`; halaman 1 di bingkai 2, jadi fisik `2*4096 + 564 =
8756`. `8200` di halaman 2 yang tak sah; `20000` di halaman 4, di luar tabel.
FIFO 8 galat dan LRU 7: LRU memanfaatkan **lokalitas** (yang baru dipakai
cenderung dipakai lagi). Rangkaian kedua memperlihatkan **anomali Belady**:
pada FIFO, **menambah** bingkai dari 3 ke 4 menaikkan galat dari 9 ke 10;
LRU tak mengalaminya.

**Alokasi di program.** Tumpukan tumbuh dan menyusut otomatis; **heap** (`new`,
`malloc`) dikelola programmu dan harus dilepas. Memakai memori yang sudah
dilepas atau di luar larik adalah sumber galat dan celah keamanan.

### Contoh setengah jadi

Alamat virtual 10000, halaman 2048 byte, tabel halaman `{4, 1, 7}`:

```text setengah-jadi
// halaman = 10000 / 2048 = ___ ; offset = 10000 mod 2048 = ___
// halaman ___ tak ada dalam tabel (ukuran 3) -> ___
// alamat 5000: halaman = ___, offset = ___, bingkai = ___, fisik = ___
```

### Latihan

1. **Ubah:** baca tabel dan rangkaian acuan dari argumen; prediksi hasil untuk
   2 bingkai lebih dulu.
2. **Buat:** kebijakan **optimal** (buang halaman yang paling lama tak dipakai
   di masa depan) dan bandingkan dengan FIFO dan LRU.
3. **Jelaskan:** apa itu galat halaman, dan mengapa tak semuanya berarti
   program rusak?
4. **Berpasangan:** satu orang memilih rangkaian acuan 12 halaman, satu orang
   menghitung FIFO dan LRU di kertas; cocokkan dengan program.

## Bagian 5: Berkas dan baris perintah (pertemuan 12 sampai 14)

Sistem operasi menyajikan penyimpanan sebagai **sistem berkas**: pohon
direktori berisi berkas, tiap berkas punya **pemilik**, **izin** (baca,
tulis, eksekusi untuk pemilik, kelompok, lainnya), dan **inode**; nama di
direktori hanyalah penunjuk ke inode, sehingga beberapa nama dapat menunjuk
berkas yang sama (**tautan keras**). Program membuka berkas lewat system call
dan mendapat **deskriptor berkas**: 0 masukan standar, 1 keluaran standar, 2
galat standar. **Baris perintah** (*shell*) menjalankan program, menyambung
keluaran satu program ke masukan lain (**pipa**, `|`), dan mengalihkan
keluaran (`>`, `>>`, `2>`). Tiap program berakhir dengan **kode keluar**: 0
sukses, selain 0 gagal; shell menyimpannya di `$?`.

### Prediksi dulu

Perintah berikut dijalankan berurutan di direktori kosong; tebak keluaran
tiap baris yang mencetak sesuatu.

```bash
mkdir -p lab/data
cd lab
printf 'apel\nbanana\napel\njeruk\n' > data/buah.txt
ls data
wc -l < data/buah.txt
sort data/buah.txt | uniq -c | sort -rn | head -n 1
chmod 640 data/buah.txt
stat -c '%a %A' data/buah.txt
ln data/buah.txt data/salinan.txt
stat -c '%h' data/buah.txt
echo "durian" >> data/salinan.txt
wc -l < data/buah.txt
ls tidak-ada 2> galat.txt
echo "kode keluar: $?"
```

### Contoh terselesaikan

Keluaran (bash 5.2.21, GNU coreutils 9.4):

```text
buah.txt
4
      2 apel
640 -rw-r-----
2
5
kode keluar: 2
```

Rantai `sort | uniq -c | sort -rn | head -n 1` mencetak kata paling sering
(dua kali `apel`). `chmod 640` memberi pemilik baca-tulis dan kelompok hanya
baca (`rw-r-----`; oktal 6 = 4+2, 4, 0). Sesudah `ln`, `buah.txt` dan
`salinan.txt` adalah **dua nama untuk satu berkas** (jumlah tautan 2):
menambah `durian` lewat satu nama terlihat lewat nama lain (5 baris). `2>`
mengalihkan **galat standar** ke `galat.txt`; `ls` gagal dengan kode 2.
Perintah ini GNU/Linux; macOS dan BSD punya perbedaan opsi kecil. Di balik
layar, program memakai system call (`open`, `read`, `write`, `close`) yang
mengembalikan -1 saat gagal: **selalu periksa nilai kembaliannya**.

### Contoh setengah jadi

Hitung berapa kata berbeda ada di `data/buah.txt`:

```bash setengah-jadi
sort data/buah.txt | ___ | wc -l
# hasil yang diharapkan: ___
# untuk menyimpannya ke berkas: ... > ___.txt
```

### Latihan

1. **Ubah:** tampilkan **tiga** kata teratas; prediksi isinya untuk
   `buah.txt` sebelum menjalankan.
2. **Buat:** skrip bash yang menerima nama berkas, mencetak jumlah barisnya,
   dan keluar dengan kode 1 bila berkas tak ada (`[ -f "$1" ]`); uji dua
   kasus.
3. **Jelaskan:** apa beda tautan keras dan salinan (`cp`) saat salah satu
   berkas diubah?
4. **Berpasangan:** satu orang menulis satu rantai pipa, satu orang menebak
   keluarannya dari data contoh; ganti peran.

**Proyek kecil (pertemuan 13 dan 14).** Dari spesifikasi dosen, buat alat
baris perintah (skrip bash) yang mengolah berkas teks sintetis (hitung kata,
cari pola, ringkas ukuran) dengan pemeriksaan galat dan kode keluar yang
benar. Tidak ada contoh terselesaikan: kamu bekerja dari spesifikasi.
Sertakan riwayat Git dengan sedikitnya empat *commit* dan empat uji (termasuk
berkas hilang dan berkas kosong). Pertemuan 13 berpasangan, 14 mandiri dengan
refleksi satu halaman.

## Latihan bercampur

Setelah bagian 2, 3, dan 4, kerjakan soal yang **tidak menyebut** konsepnya.
Contoh: "Program A dan B sama-sama menaikkan penghitung bersama, tetapi hanya A
selalu benar. Apa kemungkinan perbedaannya?" Kamu memutuskan: proses atau
utas, kunci atau atomik. Kuis kumulatif (pertemuan 3, 7, 11, 14) berbentuk
sama.

## Ulang berjarak

Kerjakan ulang tanpa melihat solusi lama:

- satu minggu setelah bagian: tulis ulang satu program (mis. `fakt.s`,
  simulasi penjadwalan, terjemahan alamat) dari ingatan;
- awal tiap bagian baru: dua soal dari bagian sebelumnya;
- minggu sebelum ujian: tiga soal yang dahulu salah;
- semester berikutnya: jelaskan system call, kunci, dan deskriptor berkas
  tanpa catatan; `KUL-I-301` dan `KUL-I-302` memakainya.

## Kebijakan AI dan log pemakaian

Silabus bagian 6.3 **belum menyatakan** tingkat AI mata kuliah ini. Modul
memakai usulan baku `[asumsi]` (Q2 rancangan): **Kuning** untuk tugas
pemrograman (assembly, C++, skrip), **Hijau** untuk eksplorasi konsep di
proyek bagian 5, **Merah** untuk ujian; dosen menetapkan per tugas. Pada
Kuning, AI boleh menjelaskan konsep, **tidak** boleh menghasilkan solusi yang
kamu serahkan, dan hanya setelah gerbang kesiapan: kamu dapat (1) menelusuri
program pendek (termasuk assembly) dengan tabel register, (2) menulis satu uji
yang gagal bila kode salah, (3) menjelaskan kode dengan kata sendiri. Bila
memakai AI, catat di repositorimu sendiri: alat dan versi, tujuan, perintah,
bagian keluaran yang dipakai (log). Jangan memasukkan data pribadi, kata
sandi, atau kunci. **Jalankan kode orang lain, termasuk keluaran AI, hanya di
mesin virtual atau direktori terpisah**: program tingkat sistem dapat
menghapus berkas atau menghabiskan sumber daya (mis. `rm -rf`, `fork` tanpa
batas). Dosen dapat mewawancarai kamu tentang kodemu.

## Kesalahan umum

- **Mengira representasi sama di semua mesin.** Urutan byte dan ukuran tipe
  bergantung mesin.
- **Mengabaikan luapan.** `uint8_t` melingkar; luapan bertanda tak terdefinisi.
- **Mengubah variabel bersama dari banyak utas tanpa kunci.**
- **Mengandalkan urutan cetak antarproses tanpa `waitpid`.**
- **Lupa memeriksa kode kembalian system call atau kode keluar.**
- **Mengira tautan keras adalah salinan.** Keduanya satu berkas.

## Cek mandiri

Tutup modul, jawab, baru periksa.

1. Tulis -7 dalam komplemen dua 8-bit.
2. Apa yang dikerjakan `call` dan `ret` pada tumpukan?
3. Hitung waktu tunggu rata-rata FCFS untuk *burst* 4, 1, 3.
4. Terjemahkan alamat 9000 dengan halaman 4096 dan tabel `{2, 0, 5}`.
5. Mengapa balapan data terjadi di utas tetapi tidak antarproses?
6. Apa arti kode keluar 0 dan bukan 0, dan apa isi `$?`?
7. Sebut tiga hal yang harus bisa kamu lakukan sebelum memakai AI pada tugas
   Kuning.

Daftar periksa (kosong; kamu isi sendiri, tidak dikumpulkan):

- [ ] Aku dapat mengubah bilangan antara biner dan komplemen dua.
- [ ] Aku dapat menelusuri program assembly pendek dengan tabel register.
- [ ] Aku dapat membedakan proses dan utas serta menjelaskan penjadwalan.
- [ ] Aku dapat menerjemahkan alamat virtual dengan tabel halaman.
- [ ] Aku dapat memakai pipa, pengalihan, izin, dan membaca kode keluar.

## Kunci dan petunjuk

Keluaran prediksi tiap bagian ada pada blok keluaran di "Contoh terselesaikan".
Latihan 2 bagian 3: `RR(2)` 8,25; kuantum 8 menjadi FCFS (7,25).

- **Setengah jadi:** bagian 1: `11111010`, `11111011`; `-1`; `4`; `1012`
  (1000 + 3*4). Bagian 2: `1`, `rax`, `rcx`. Bagian 3 (RR(2) untuk 3 dan 4):
  proses 2 sisa 2; selesai pada 5 dan 7; tunggu 2 dan 3. Bagian 4: halaman 4,
  offset 1808; halaman 4 tak ada dalam tabel, galat; 5000: halaman 2, offset
  904, bingkai 7, fisik 15240. Bagian 5: `uniq`, `3`, nama berkas bebas.
- **Latihan bagian 2:** jumlah 1 sampai 20 adalah 210, kode keluar 210.
- **Cek mandiri:** (1) `11111001`; (3) tunggu 0, 4, 5, rata-rata 3; (4)
  halaman 2, offset 808, bingkai 5, fisik `5*4096 + 808 = 21288`.
- **Ingat kembali:** `*p` mengakses nilai yang ditunjuk, `&x` memberi alamat;
  memori sesudah `delete` tak terdefinisi, `new` tanpa `delete` bocor;
  `int f(int x)` menyalin argumen; `fpb(a, 0)` kasus dasar `a`, langkah
  `fpb(b, a % b)`.
- **Petunjuk bertahap bila macet:** (1) gambar register atau tabel halaman
  dengan kotak dan panah untuk masukan kecil; (2) telusuri tiap instruksi pada
  gambar itu; (3) cari langkah tempat gambar dan programmu mulai berbeda.

## Langkah berikutnya

`KUL-I-301` (Jaringan Komputer dan Keamanan) memakai deskriptor berkas dan
system call untuk soket. `KUL-I-302` (Komputasi Paralel, Terdistribusi, dan
Cloud) memakai utas, kunci, dan penjadwalan, dan kontainer di atas proses dan
ruang alamat.

## Catatan untuk dosen

Bobot dan bentuk asesmen berikut **usulan**; prodi menetapkan (silabus 6.1,
6.2): praktikum per bagian, kuis kumulatif, wawancara kode singkat, ujian
tertulis dan praktik tanpa AI. Variasi tugas per mahasiswa: ubah *burst*,
rangkaian acuan halaman, dan data teks. Praktikum berpasangan dengan pasangan
acak per bagian; jangan menilai pasangan. ISA x86-64 dipilih penyusun
`[asumsi]`; dosen boleh mengganti (RISC-V atau ARM64) tanpa mengubah CPMK.
Jalankan latihan assembly dan proses di mesin virtual atau akun terisolasi.
Memori virtual dibatasi pada pemetaan halaman dan penggantian; TLB dan alokator
memori tingkat lanjut hanya disebut.

## Rujukan

- GNU Binutils, *Using as* (GNU assembler), dibuka 2026-11-19:
  <https://sourceware.org/binutils/docs/as/>
- Linux man-pages, `write(2)`, dibuka 2026-11-19:
  <https://man7.org/linux/man-pages/man2/write.2.html>
- Linux man-pages, `fork(2)`, dibuka 2026-11-19:
  <https://man7.org/linux/man-pages/man2/fork.2.html>
- Arpaci-Dusseau dan Arpaci-Dusseau, *Operating Systems: Three Easy Pieces*,
  dibuka 2026-11-19: <https://pages.cs.wisc.edu/~remzi/OSTEP/>
- GNU Project, *GNU Coreutils Manual*, dibuka 2026-11-19:
  <https://www.gnu.org/software/coreutils/manual/>
- GNU Project, *Bash Reference Manual*, dibuka 2026-11-19:
  <https://www.gnu.org/software/bash/manual/>
- GNU Project, *Using the GNU Compiler Collection (GCC)*, dibuka 2026-11-19:
  <https://gcc.gnu.org/onlinedocs/>
- ACM/IEEE-CS/AAAI, *Computer Science Curricula 2023*, knowledge area AR,
  OS, dan SF: <https://csed.acm.org/knowledge-areas/> (daftar KA
  terverifikasi; rincian unit **tidak** dibaca, jadi tidak dikutip).
