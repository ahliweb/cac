## Untuk siapa modul ini

Mahasiswa semester 5 informatika atau ilmu komputer yang sudah menempuh
`KUL-I-203`. `KUL-I-301`: 3 SKS, jalur I; 14 pertemuan, ujian tengah sesudah
pertemuan 7 dan ujian akhir sesudah pertemuan 14 `[asumsi]` (silabus 2.3). Kamu
butuh Linux dengan g++, Python 3, OpenSSL, dan Git.

Kode memakai **C++17** (g++ 13.3, soket POSIX), **Python 3.12** (pustaka
standar), dan **OpenSSL 3.0.13**; kriptografi memakai Python dan OpenSSL karena
pustaka standar C++17 tidak punya kriptografi `[asumsi]`. Tiap blok lengkap sudah dijalankan dan keluarannya sama dengan yang
tertulis; blok `setengah-jadi` sengaja berlubang. Contoh terselesaikan penuh
sangat terbatas; kamu lebih banyak menebak dan **meninjau kode** cacat.

**Aturan keselamatan.** Semua percobaan berjalan di mesinmu sendiri
(`127.0.0.1`, folder sementara, mesin virtual milikmu). Jangan memindai,
menyerang, atau menguji sistem orang lain tanpa izin tertulis pemiliknya.
Pasal 30 UU 11/2008 telah dicabut UU 1/2023 (KUHP) yang berlaku 2 Januari 2026;
penyusun tidak menguraikan penggantinya, jadi tanyakan unit hukum kampus.

## Peta semester

| Pertemuan | Bagian: pokok bahasan | CPMK | Kuis pembuka (jarak) |
| --- | --- | --- | --- |
| 1 | B1: Model lapisan, enkapsulasi, IP, CIDR | C1 | `KUL-I-203` |
| 2 | B1: TCP dan UDP, port, checksum | C1 | 1, lalu `KUL-U-201` |
| 3 | B1: Praktik jaringan; **kuis kumulatif 1** | C1 | 2, lalu 1 |
| 4 | B2: Soket TCP | C2 | 3, lalu `KUL-I-103` |
| 5 | B2: Aliran byte, pembingkaian, galat | C2 | 4, lalu 2 |
| 6 | B2: Klien-peladen; praktikum | C2 | 5, lalu 3 |
| 7 | B3: Hash, HMAC; **kuis kumulatif 2** | C3 | 6, lalu 4 |
| ujian tengah | Tertulis dan praktik, tanpa AI | C1 sampai C2 | |
| 8 | B3: Kata sandi, kunci simetris dan asimetris | C3 | 7, lalu 5 |
| 9 | B3: TLS dan sertifikat | C3 | 8, lalu 6 |
| 10 | B4: Ancaman umum | C3 | 9, lalu 7 |
| 11 | B4: Praktik dasar; **kuis kumulatif 3** | C3 | 10, lalu 8 |
| 12 | B5: Pengantar SSDF | C4 | 11, lalu 9 |
| 13 | B5: Rantai pasok, paket fiktif | C4 | 12, lalu 10 |
| 14 | B5: Proyek; **kuis kumulatif akhir** | C4 | 13, lalu 1 sampai 12 |
| ujian akhir | Tertulis dan praktik, tanpa AI | C1 sampai C4 | |

## Ingat kembali

Tiap pertemuan dibuka kuis 5 menit **tanpa catatan**, 3 sampai 5 soal, dari
asal pada kolom terakhir peta (jarak bertambah). Contoh pertemuan 1
sampai 4:

1. Apa arti deskriptor berkas 0, 1, 2, dan apa arti kode keluar 0 dan bukan 0?
   (`KUL-I-203`)
2. Bagaimana program meminta layanan kernel lewat system call, dan apa yang
   dikerjakan `write`? (`KUL-I-203`)
3. Apa fungsi `timeout` pada permintaan HTTP, dan apa arti kode status 404 dan
   429? (`KUL-U-201`)
4. Hitung 3^200 mod 7 dengan kuadrat berulang atau siklus pangkat, dan tulis
   -7 mod 5 menurut matematika. (`KUL-I-103`)

Soal 1 dan 2 menjadi dasar bagian 2 (soket **adalah deskriptor berkas**); soal
4 dasar bagian 3 (aritmetika modular).

## Tujuan

Pada akhir semester kamu dapat (CPMK, silabus bagian 3.1):

- **C1** menjelaskan lapisan protokol;
- **C2** menulis klien-peladen soket;
- **C3** menerapkan praktik keamanan dasar;
- **C4** mengenali risiko rantai pasok perangkat lunak, termasuk paket fiktif
  yang disarankan kode hasil AI.

## Bagian 1: Model lapisan dan TCP/IP (pertemuan 1 sampai 3)

TCP/IP punya empat lapisan: **tautan** (Ethernet, Wi-Fi), **internet** (IP:
alamat dan perutean), **transpor** (TCP atau UDP: port, dan keandalan pada TCP),
**aplikasi** (HTTP, DNS). Saat data turun, tiap lapisan menambah **header**
(**enkapsulasi**); penerima melepasnya satu per satu. TCP memberi layanan
"andal, berurutan, aliran byte" (RFC 9293) dengan nomor urut dan kirim ulang;
UDP mengirim datagram tanpa jaminan. Alamat IPv4 adalah bilangan 32-bit;
**CIDR** `a.b.c.d/n` berarti `n` bit pertama adalah bagian jaringan. Contoh
memakai blok dokumentasi `192.0.2.0/24` (RFC 5737). **Checksum** Internet (RFC
1071) menjumlah kata 16-bit, melipat *carry*, lalu membalik bit.

### Prediksi dulu

Tulis sebelum menjalankan: checksum untuk byte `00 01 f2 03 f4 f5 f6 f7`
(jumlahkan sebagai kata 16-bit, lipat *carry*, balik bit), serta alamat
jaringan, siaran, dan banyak host untuk `192.0.2.77/26`.

### Contoh terselesaikan

```cpp
#include <cstdint>
#include <iomanip>
#include <iostream>
#include <string>
#include <vector>
using namespace std;

// Checksum Internet (RFC 1071): jumlah kata 16-bit, lipat carry, lalu balik bit.
uint16_t checksum(const vector<uint8_t> &data) {
    uint32_t jumlah = 0;
    for (size_t i = 0; i < data.size(); i += 2) {
        uint32_t kata = static_cast<uint32_t>(data[i]) << 8;
        if (i + 1 < data.size()) kata |= data[i + 1];
        jumlah += kata;
    }
    while (jumlah >> 16) jumlah = (jumlah & 0xFFFF) + (jumlah >> 16);
    return static_cast<uint16_t>(~jumlah);
}

uint32_t alamat(int a, int b, int c, int d) {
    return (static_cast<uint32_t>(a) << 24) | (static_cast<uint32_t>(b) << 16) |
           (static_cast<uint32_t>(c) << 8) | static_cast<uint32_t>(d);
}

string teks(uint32_t x) {
    return to_string(x >> 24) + "." + to_string((x >> 16) & 255) + "." +
           to_string((x >> 8) & 255) + "." + to_string(x & 255);
}

int main() {
    vector<uint8_t> data = {0x00, 0x01, 0xf2, 0x03, 0xf4, 0xf5, 0xf6, 0xf7};
    cout << "checksum 0x" << hex << setw(4) << setfill('0') << checksum(data) << dec << '\n';

    uint32_t ip = alamat(192, 0, 2, 77);
    int prefiks = 26;
    uint32_t topeng = ~0u << (32 - prefiks);
    uint32_t jaringan = ip & topeng;
    uint32_t siaran = jaringan | ~topeng;
    cout << teks(ip) << "/" << prefiks << " jaringan " << teks(jaringan) << " siaran "
         << teks(siaran) << " host " << (1u << (32 - prefiks)) - 2 << '\n';
    return 0;
}
// keluaran:
// checksum 0x220d
// 192.0.2.77/26 jaringan 192.0.2.64 siaran 192.0.2.127 host 62
```

Delapan byte menjumlah ke `0xddf2` setelah carry dilipat (sama dengan contoh di
RFC 1071); dibalik menjadi `0x220d`. Pada `/26`, 6 bit sisa untuk host: 64
alamat, dua tak dipakai (jaringan `.64`, siaran `.127`), sisa **62**.

### Contoh setengah jadi

```text setengah-jadi
// 192.0.2.200/25: bit host = ___, banyak alamat = ___, host terpakai = ___
// alamat jaringan: 200 & ~127 = ___ ; alamat siaran = ___
// byte 0x45 0x00 0x00 0x1c, dua kata 16-bit dijumlah = 0x___ ; dibalik = 0x___
```

### Latihan

1. **Ubah:** buat `dalam_jaringan(ip, jaringan, prefiks)`; prediksi apakah
   `192.0.2.130` ada di `192.0.2.0/25`.
2. **Buat:** pemeriksa checksum (data digabung checksum menjumlah `0xffff`);
   uji, lalu ubah satu bit.
3. **Jelaskan:** mengapa TCP butuh nomor urut, dan apa yang dilakukan UDP
   ketika paket hilang?
4. **Berpasangan (praktikum):** pengemudi dan navigator bertukar peran tiap
   sekitar 10 menit; pasangan acak, tugas dinilai tetap perorangan. Satu orang
   memilih alamat dan prefiks, satunya menghitung tanpa komputer; cocokkan.

## Bagian 2: Soket (pertemuan 4 sampai 6)

**Soket** adalah deskriptor berkas untuk ujung komunikasi. Peladen TCP
memanggil `socket`, `bind`, `listen`, lalu `accept` (deskriptor baru per
klien); klien memanggil `socket` dan `connect`. Dua jebakan. **Pertama**, TCP
adalah **aliran byte**: satu `send` tidak berpasangan dengan satu `recv`, jadi
protokolmu membuat **pembingkaian** sendiri (di sini: satu baris berakhir
`\n`). **Kedua**, `send` dan `recv` mengembalikan jumlah byte sebenarnya, `0`
saat lawan menutup, `-1` saat galat; periksa semuanya. Port 0 pada `bind`
meminta kernel memilih port bebas; `getsockname` menanyakannya.

### Prediksi dulu

Klien mengirim `halo `, `dunia\n`, lalu `kedua\nselesai\n` lewat tiga `send`.
Peladen membalas tiap baris dengan panjang dan huruf besarnya. Berapa baris
balasan dan apa isinya? Mengapa buffer 16 byte tetap benar?

### Contoh terselesaikan

```cpp
#include <arpa/inet.h>
#include <sys/socket.h>
#include <unistd.h>

#include <cctype>
#include <iostream>
#include <string>
#include <thread>
using namespace std;

// TCP adalah aliran byte: tumpuk byte sampai '\n' muncul, berapa pun recv memecahnya.
bool baca_baris(int fd, string &sisa, string &baris) {
    for (;;) {
        size_t pos = sisa.find('\n');
        if (pos != string::npos) {
            baris = sisa.substr(0, pos);
            sisa.erase(0, pos + 1);
            return true;
        }
        char buf[16];
        ssize_t n = recv(fd, buf, sizeof buf, 0);
        if (n <= 0) return false;  // 0: lawan menutup; -1: galat
        sisa.append(buf, static_cast<size_t>(n));
    }
}

// Pesan kecil: satu send cukup di sini; kode nyata mengulang sampai semua terkirim.
void kirim(int fd, const string &data) { send(fd, data.data(), data.size(), 0); }

void layani(int pendengar) {
    int fd = accept(pendengar, nullptr, nullptr);
    string sisa, baris;
    while (baca_baris(fd, sisa, baris) && baris != "selesai") {
        string besar = baris;
        for (char &c : besar) c = static_cast<char>(toupper(static_cast<unsigned char>(c)));
        kirim(fd, to_string(baris.size()) + " " + besar + "\n");
    }
    close(fd);
}

int main() {
    int pendengar = socket(AF_INET, SOCK_STREAM, 0);
    sockaddr_in addr{};
    addr.sin_family = AF_INET;
    addr.sin_addr.s_addr = htonl(INADDR_LOOPBACK);  // 127.0.0.1: hanya mesin ini
    addr.sin_port = 0;                              // kernel memilih port bebas
    if (bind(pendengar, reinterpret_cast<sockaddr *>(&addr), sizeof addr) != 0) return 1;
    if (listen(pendengar, 1) != 0) return 1;
    socklen_t panjang = sizeof addr;
    getsockname(pendengar, reinterpret_cast<sockaddr *>(&addr), &panjang);

    thread peladen(layani, pendengar);
    int klien = socket(AF_INET, SOCK_STREAM, 0);
    if (connect(klien, reinterpret_cast<sockaddr *>(&addr), sizeof addr) != 0) return 1;
    kirim(klien, "halo ");  // satu pesan logis, dua send
    kirim(klien, "dunia\n");
    kirim(klien, "kedua\nselesai\n");

    string sisa, baris;
    while (baca_baris(klien, sisa, baris)) cout << "balasan: " << baris << '\n';
    close(klien);
    peladen.join();
    close(pendengar);
    return 0;
}
// keluaran:
// balasan: 10 HALO DUNIA
// balasan: 5 KEDUA
```

Dua baris, bukan tiga: `halo ` dan `dunia\n` hanya **satu** baris logis
(`halo dunia`, 10 karakter); `selesai` mengakhiri sesi tanpa balasan.
`baca_baris` menumpuk byte sampai `\n`, jadi benar berapa pun `recv` memecahnya.
Peladen mengikat `127.0.0.1`, tak terjangkau dari luar mesin; `0.0.0.0`
membuka layanan ke seluruh jaringan dan harus keputusan sadar. Dikompilasi
dengan `-pthread`.

### Contoh setengah jadi

Klien yang mengirim satu baris dan membaca satu balasan:

```cpp setengah-jadi
addr.sin_family = ___;
addr.sin_port = htons(___);  // port peladen
if (connect(fd, (sockaddr *)&addr, sizeof addr) != ___) return 1;
kirim(fd, "uji\n");
if (___(fd, sisa, baris)) cout << baris << '\n';
```

### Latihan

1. **Ubah:** balas dengan **kebalikan** tiap baris; prediksi balasan untuk
   `abc`.
2. **Buat:** perintah `JUMLAH a b` dibalas hasilnya; selain itu `GALAT`. Uji
   `JUMLAH 2 x` (masukan jelek).
3. **Jelaskan:** apa yang rusak bila `baca_baris` menganggap satu `recv` pasti
   satu pesan lengkap? Tulis skenario dengan dua kiriman.
4. **Berpasangan:** satu menulis klien, satu peladen, dari spesifikasi di
   kertas; sambungkan keduanya.

## Bagian 3: Kriptografi dasar (pertemuan 7 sampai 9)

**Jangan menciptakan kriptografimu sendiri**; pakai pustaka yang ditinjau
luas. **Hash** (SHA-256) memetakan data ke 256 bit, searah; satu bit masukan
berubah, kira-kira separuh bit keluaran berubah. **HMAC** menggabungkan hash
dengan kunci rahasia: penerima memastikan pesan tak berubah dan berasal dari
pemegang kunci; bandingkan tanda dengan `hmac.compare_digest` (waktu
konstan), bukan `==`. **Kata sandi** disimpan dengan garam acak per pengguna
dan fungsi sengaja lambat (PBKDF2, scrypt, Argon2). **Enkripsi** menjaga
kerahasiaan: simetris (satu kunci, cepat) dan asimetris (pasangan kunci
publik-privat). **TLS** (RFC 8446) memakai keduanya: handshake menyepakati
kunci sesi, data dienkripsi simetris, dan **sertifikat** mengikat kunci publik
ke nama server lewat tanda tangan otoritas tepercaya.

### Prediksi dulu

Tebak: berapa dari 256 bit hash `abc` dan `abd` yang berbeda, dan apakah `sah`
menerima pesan yang diubah.

### Contoh terselesaikan

```python
import hashlib
import hmac


def sha(teks: str) -> bytes:
    return hashlib.sha256(teks.encode()).digest()


def beda_bit(a: bytes, b: bytes) -> int:
    return sum(bin(x ^ y).count("1") for x, y in zip(a, b))


print(sha("abc").hex())
print(beda_bit(sha("abc"), sha("abd")), "dari", 8 * len(sha("abc")))

# HMAC: bukti bahwa pesan dibuat pemegang kunci dan tidak berubah di jalan.
kunci = b"kunci-contoh-fiktif"  # kunci sungguhan tidak pernah ditulis di kode
pesan = b"transfer 100 ke akun-42"
tanda = hmac.new(kunci, pesan, hashlib.sha256).hexdigest()
print(tanda[:16])


def sah(pesan: bytes, tanda_diterima: str) -> bool:
    harapan = hmac.new(kunci, pesan, hashlib.sha256).hexdigest()
    return hmac.compare_digest(harapan, tanda_diterima)


print(sah(pesan, tanda), sah(b"transfer 900 ke akun-42", tanda))

# Penyimpanan kata sandi: garam acak + fungsi lambat. Jumlah iterasi di sini
# sengaja kecil agar contoh cepat; nilai nyata jauh lebih besar dan berubah.
garam = bytes.fromhex("00112233445566778899aabbccddeeff")
turunan = hashlib.pbkdf2_hmac("sha256", b"sandi-fiktif", garam, 1000)
print(turunan.hex()[:16])
# keluaran:
# ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad
# 122 dari 256
# e9657adce224a752
# True False
# 54f81298f2c0b037
```

`sha256("abc")` sama dengan keluaran `printf abc | openssl dgst -sha256`. Beda
122 dari 256 bit (sekitar separuh). `sah` menolak pesan yang diubah. Iterasi
PBKDF2 1000 hanya agar cepat; nilai nyata jauh lebih besar dan berubah, jadi
ikuti rekomendasi terkini dari sumber resmi. `kunci` di sini fiktif: kunci
sungguhan tak pernah ditulis di kode (`KUL-U-201`).

TLS di lab lokalmu sendiri (sertifikat swa-tanda-tangan, OpenSSL 3.0.13):

```bash
openssl req -x509 -newkey rsa:2048 -nodes -keyout kunci.pem -out sertifikat.pem -days 1 -subj "/CN=localhost" 2>/dev/null
openssl s_server -accept 127.0.0.1:24433 -cert sertifikat.pem -key kunci.pem -www >/dev/null 2>&1 &
sleep 1
echo | openssl s_client -connect 127.0.0.1:24433 -brief 2>&1 | grep -E 'Protocol|Verif'
echo ---
echo | openssl s_client -connect 127.0.0.1:24433 -CAfile sertifikat.pem -verify_hostname localhost -brief 2>&1 | grep -E 'Protocol|Verif'
kill %1
```

```text
Protocol version: TLSv1.3
Verification error: self-signed certificate
---
Protocol version: TLSv1.3
Verification: OK
Verified peername: localhost
```

Keduanya terenkripsi, tetapi hanya yang kedua **terotentikasi**. Enkripsi tanpa
otentikasi tidak mencegah penyerang di tengah menyamar sebagai server, jadi
peringatan sertifikat tidak boleh dilewati.

### Contoh setengah jadi

```python setengah-jadi
def tanda(kunci: bytes, pesan: bytes) -> str:
    return hmac.new(kunci, pesan, hashlib.___).hexdigest()

def sah(kunci: bytes, pesan: bytes, diterima: str) -> bool:
    return hmac.___(tanda(kunci, pesan), diterima)
```

### Latihan

1. **Ubah:** iterasi PBKDF2 menjadi 1 lalu 300000; ukur waktunya dan jelaskan
   mengapa iterasi tinggi merugikan penyerang.
2. **Buat:** `daftar(sandi)` mengembalikan `(garam, hash)`; `masuk(sandi, garam,
   hash)` memverifikasi. Uji sandi benar dan salah.
3. **Jelaskan:** mengapa dua pengguna dengan sandi sama harus punya hash
   berbeda?
4. **Berpasangan:** satu menulis pesan dan HMAC-nya, satunya mencoba
   mengubah pesan tanpa kunci.

## Bagian 4: Ancaman umum dan praktik dasar (pertemuan 10 dan 11)

Ancaman tersering bukan kriptografi yang jebol, melainkan **masukan yang
dipercaya**: **injeksi** (data menjadi perintah shell atau SQL),
**penelusuran jalur** (`../` keluar folder yang diizinkan), **luapan buffer**
(perilaku tak terdefinisi di C++), **kredensial lemah atau bocor**,
**rekayasa sosial**, **penyerang di tengah**, dan **penolakan layanan**.
Pertahanan dasarnya: validasi masukan di batas sistem, hak akses sekecil
mungkin, pustaka bukan buatan sendiri, pembaruan, dan rahasia di luar kode.
Contoh terselesaikan di sini berupa **tinjau kode**: temukan cacatnya dulu.

### Prediksi dulu

Baca program C++ berikut: apa yang terjadi pada `./b4a dina` dan pada `./b4a
nama-yang-terlalu-panjang`? Lalu program Python sesudahnya: apa yang dicetak
bila perintah dijalankan lewat shell, dan lewat daftar argumen?

### Contoh terselesaikan (tinjauan)

```cpp
#include <cstring>
#include <iostream>
using namespace std;

// Kode TINJAUAN: ada cacat. Jangan ditiru.
void sapa(const char *nama) {
    char buf[8];
    strcpy(buf, nama);  // tak memeriksa panjang
    cout << "halo " << buf << '\n';
}

int main(int argc, char **argv) {
    sapa(argc > 1 ? argv[1] : "dina");
    return 0;
}
```

Dikompilasi dengan `g++ -std=c++17 -g -fsanitize=address -o b4a b4a.cpp`,
di mesinmu sendiri. `./b4a dina` mencetak `halo dina`; `./b4a
nama-yang-terlalu-panjang` dihentikan AddressSanitizer, dua baris pertama
yang bermakna (alamat berbeda tiap jalan):

```text
ERROR: AddressSanitizer: stack-buffer-overflow on address ...
WRITE of size 26 at ...
```

26 byte: 25 huruf dan `\0` ke larik 8 byte. Tanpa alat itu program dapat
tampak jalan lalu rusak di tempat lain. Perbaikan: `std::string`, **aturan
panjang yang dinyatakan** (1 sampai 7 karakter), dan penolakan dengan pesan
galat serta kode keluar 2 (`KUL-I-203`). Sekarang dua cacat Python:

```python
import subprocess
import tempfile
from pathlib import Path

# --- 1. Injeksi perintah: data masukan menjadi perintah ---
masukan = "laporan; echo DIJALANKAN-PERINTAH-LAIN"

rawan = subprocess.run(
    f"echo berkas: {masukan}", shell=True, capture_output=True, text=True
)
print(rawan.stdout.strip().splitlines())

aman = subprocess.run(["echo", "berkas:", masukan], capture_output=True, text=True)
print(aman.stdout.strip().splitlines())

# --- 2. Penelusuran jalur (path traversal): keluar dari folder yang diizinkan ---
with tempfile.TemporaryDirectory() as tmp:
    akar = Path(tmp) / "unggahan"
    akar.mkdir()
    (akar / "a.txt").write_text("halo")
    (Path(tmp) / "rahasia.txt").write_text("fiktif")

    def buka_rawan(nama: str) -> str:
        return (akar / nama).read_text()

    def buka_aman(nama: str) -> str:
        target = (akar / nama).resolve()
        if not target.is_relative_to(akar.resolve()):
            raise PermissionError("di luar folder yang diizinkan")
        return target.read_text()

    print(buka_rawan("../rahasia.txt"))
    for nama in ("a.txt", "../rahasia.txt"):
        try:
            print(nama, "->", buka_aman(nama))
        except PermissionError as e:
            print(nama, "->", e)
# keluaran:
# ['berkas: laporan', 'DIJALANKAN-PERINTAH-LAIN']
# ['berkas: laporan; echo DIJALANKAN-PERINTAH-LAIN']
# fiktif
# a.txt -> halo
# ../rahasia.txt -> di luar folder yang diizinkan
```

Dengan `shell=True`, `;` memulai perintah kedua: **injeksi perintah**; daftar
argumen menyerahkan teks apa adanya. `buka_rawan` membaca `rahasia.txt` di luar
folder unggahan; `buka_aman` memakai `resolve()` lalu memastikan hasilnya tetap
di bawah akar. Semua di folder sementara.

### Contoh setengah jadi

Daftar tiga cacat, lalu tulis perbaikannya:

```python setengah-jadi
def hapus(nama):
    os.system("rm -rf /data/unggahan/" + nama)   # cacat 1: ___
    return open("/data/laporan/" + nama).read()  # cacat 2: ___

KUNCI = "abc123-kunci-produksi"                  # cacat 3: ___
```

### Latihan

1. **Ubah:** buat `buka_aman` menolak tautan simbolik yang menunjuk ke luar;
   prediksi mengapa `resolve()` sudah membantu.
2. **Buat:** `masukan_sah(nama)`: hanya huruf, angka, `-`, panjang 1 sampai 20.
   Uji lima masukan, termasuk `../x` dan kosong.
3. **Jelaskan:** bedakan **validasi** (menerima yang diizinkan) dari daftar
   hitam, dan mengapa yang pertama lebih aman.
4. **Berpasangan:** satu menulis fungsi dengan satu cacat tertanam, satunya
   meninjau; tukar peran.

## Bagian 5: SSDF, rantai pasok, dan paket sebelum dipasang (pertemuan 12 sampai 14)

Sebagian besar kode yang kamu jalankan **bukan tulisanmu**: dependensi, gambar
kontainer, keluaran AI. **Rantai pasok perangkat lunak** adalah semua yang
masuk ke produkmu. **SSDF** (NIST SP 800-218) mengelompokkan praktik
pengembangan aman menjadi empat: menyiapkan organisasi, melindungi perangkat
lunak, membuat perangkat lunak yang aman, dan menanggapi kerentanan. Risiko khas
CPMK C4 adalah **paket fiktif**: asisten AI menyarankan nama paket yang tak
ada; penyerang mendaftarkan nama itu dengan kode berbahaya. Spracklen dkk.
(2024) menguji 16 model: rata-rata paket fiktif sedikitnya 5,2% untuk model
komersial dan 21,7% untuk model terbuka pada kondisi studi mereka.

Sebelum memasang nama baru, periksa: paketnya **ada** dan **berapa lama**
terbit; **pengelola**, **unduhan**, repositori sumber, dan **lisensi**; apakah
**nama mirip** paket terkenal; dan apakah **versi dipatok dengan hash** (pip:
`--hash=sha256:...` dan `--require-hashes`). Pemeriksa di bawah memakai registri
**sintetis**; ia **tidak membuktikan keamanan**: penyerang yang mendaftarkan nama
fiktif membuatnya *ada*.

### Prediksi dulu

Dari `REQUIREMENTS` dan `REGISTRI`, tulis temuan tiap baris sebelum menjalankan.

### Contoh terselesaikan (kasus)

```python
# Cuplikan registri SINTETIS (bukan data registri sungguhan).
REGISTRI = {"requests", "numpy", "flask", "rich"}

REQUIREMENTS = """\
requests==2.32.3 --hash=sha256:aaaa
requets==2.32.3 --hash=sha256:bbbb
fastjson-turbo==1.0.0 --hash=sha256:cccc
numpy>=1.0
flask==3.0.3
"""


def jarak(a: str, b: str) -> int:
    """Jarak sunting Levenshtein (pemrograman dinamis, KUL-I-201)."""
    baris = list(range(len(b) + 1))
    for i, ca in enumerate(a, 1):
        baru = [i]
        for j, cb in enumerate(b, 1):
            baru.append(min(baris[j] + 1, baru[j - 1] + 1, baris[j - 1] + (ca != cb)))
        baris = baru
    return baris[-1]


def periksa(baris: str) -> list[str]:
    spesifikasi, *opsi = baris.split()
    nama = spesifikasi.split("==")[0].split(">=")[0]
    temuan = []
    if nama not in REGISTRI:
        mirip = [p for p in REGISTRI if jarak(nama, p) <= 2]
        temuan.append("tidak ada di registri" + (f", mirip {mirip[0]}" if mirip else ""))
    if "==" not in spesifikasi:
        temuan.append("versi tidak dipatok")
    if not any(o.startswith("--hash=sha256:") for o in opsi):
        temuan.append("tanpa hash")
    return temuan


for baris in REQUIREMENTS.splitlines():
    hasil = periksa(baris)
    print(baris.split()[0], "->", "; ".join(hasil) if hasil else "lolos pemeriksaan otomatis")
# keluaran:
# requests==2.32.3 -> lolos pemeriksaan otomatis
# requets==2.32.3 -> tidak ada di registri, mirip requests
# fastjson-turbo==1.0.0 -> tidak ada di registri
# numpy>=1.0 -> versi tidak dipatok; tanpa hash
# flask==3.0.3 -> tanpa hash
```

`requets` mirip `requests` (jarak sunting 1, dari `KUL-I-201`). `fastjson-turbo`
tak ada: bila asisten AI menyarankannya, **jangan pasang**. `numpy>=1.0` tak
dipatok dan tanpa hash, sehingga pemasangan ulang dapat membawa versi lain;
`flask==3.0.3` dipatok tetapi tanpa hash. "Lolos pemeriksaan otomatis" bukan "aman": itu syarat awal sebelum
tinjauan manusia.

### Contoh setengah jadi

Asisten AI menyarankan menambahkan `import jsonfastx`. Isi daftar tindakan:

```text setengah-jadi
// 1. cari di registri resmi: nama ada? ___ ; tanggal terbit pertama ___
// 2. repositori sumber ditautkan? ___ ; pengelola dikenal? ___
// 3. nama mirip paket terkenal? ___ -> bila ya, curigai
// 4. pasang di lingkungan terpisah dengan versi ___ dan hash ___
// 5. catat di log AI: alat dan versi, perintah, saran yang DITOLAK
```

### Latihan

1. **Ubah:** tambahkan aturan "tanpa tautan repositori" ke `periksa`; prediksi
   baris yang berubah.
2. **Buat:** pembaca `requirements.txt` sintetis yang melapor dan keluar kode 1
   bila ada temuan; uji dengan tiga berkas.
3. **Jelaskan:** mengapa paket fiktif lebih berbahaya daripada kode yang
   langsung salah?
4. **Berpasangan:** satu menulis saran kode AI sintetis (tanpa AI) dengan satu
   paket fiktif; satunya menemukannya.

**Proyek kecil (pertemuan 13 dan 14).** Dari spesifikasi dosen, bangun
**pemeriksa paket** untuk satu bahasa pilihanmu: baca dependensi sintetis,
laporkan pelanggaran, keluar dengan kode yang benar. Sertakan empat *commit*,
empat uji, dan refleksi satu halaman tentang apa yang **tidak** dapat
ditangkap pemeriksamu.

## Latihan bercampur

Soal berikut **tidak menyebut** topiknya; kamu memutuskan jenis masalah.
Contoh: "Klien mengirim 100 byte tetapi peladen membaca 37 byte pada panggilan
pertama" dan "Layanan membuka berkas bernama dari pengguna". Kuis kumulatif
(pertemuan 3, 7, 11, 14) berbentuk sama.

## Ulang berjarak

Kerjakan ulang tanpa melihat solusi lama:

- satu minggu setelah bagian: tulis ulang `baca_baris` atau `buka_aman`;
- awal bagian baru: dua soal dari bagian sebelumnya; sebelum ujian: tiga soal
  yang dahulu salah;
- semester berikutnya, jawab tanpa catatan (dipakai `KUL-I-205` dan
  `KUL-I-401`): mengapa komunikasi dengan peladen perlu TLS dan apa arti
  peringatan sertifikat swa-tanda-tangan; mengapa perintah tidak boleh disusun
  dengan menyambung masukan pengguna ke string shell; tiga hal yang diperiksa
  sebelum memasang paket saran asisten AI, dan mengapa hash cocok belum
  berarti paket aman.

## Kebijakan AI dan log pemakaian

Silabus bagian 6.3 **belum menyatakan** tingkat AI mata kuliah ini. Modul
memakai usulan baku `[asumsi]` (Q2 rancangan): **Kuning** untuk tugas soket dan
kriptografi, **Hijau** untuk eksplorasi dan tinjauan bagian 5 (dengan log),
**Merah** untuk ujian dan praktik; dosen menetapkan per tugas. Pada Kuning AI
boleh menjelaskan konsep, **tidak** boleh menghasilkan solusi yang diserahkan,
dan hanya sesudah gerbang kesiapan: kamu dapat (1) menelusuri program pendek,
(2) menulis satu uji yang gagal bila kode salah, (3) menjelaskan kode dengan
kata sendiri. Log di repositorimu: alat dan versi, tujuan, perintah, bagian
keluaran yang dipakai. Jangan memasukkan data pribadi, kata sandi, atau kunci
ke layanan AI.

**Butir khas: rantai pasok.** Saran AI yang memuat `import` atau perintah
pemasangan baru **tidak dijalankan** sebelum daftar pemeriksaan bagian 5
dikerjakan; penolakan saran dicatat di log. Kode keamanan hasil AI dijalankan
hanya di mesin virtual atau folder sementara milikmu, tidak pernah diarahkan
ke sistem orang lain. Dosen dapat mewawancarai kodemu.

## Kesalahan umum

- **Menganggap satu `send` sama dengan satu `recv`.**
- **Membandingkan HMAC dengan `==`**, atau sandi sebagai hash cepat tanpa garam.
- **Mengira enkripsi sama dengan otentikasi.**
- **Memercayai masukan:** menyusun perintah atau jalur dari data pengguna.
- **Memasang paket saran AI tanpa memeriksa**, atau mengira "ada di registri"
  berarti "aman".

## Cek mandiri

Tutup modul, jawab, baru periksa.

1. Empat lapisan TCP/IP dan satu protokol tiap lapisan?
2. Untuk `192.0.2.200/26`: alamat jaringan, siaran, jumlah host?
3. Mengapa satu `recv` dapat mengembalikan setengah pesan?
4. Beda hash, HMAC, dan enkripsi?
5. Mengapa kata sandi disimpan dengan garam dan fungsi lambat?
6. Apa itu injeksi perintah, dan bagaimana mencegahnya?
7. Tiga pemeriksaan sebelum memasang paket saran AI?

Daftar periksa (kosong; kamu isi sendiri, tidak dikumpulkan):

- [ ] Aku dapat menghitung alamat jaringan dan siaran dari CIDR.
- [ ] Aku dapat menulis klien-peladen TCP dengan pembingkaian dan galat diperiksa.
- [ ] Aku dapat menemukan injeksi, penelusuran jalur, luapan, dan paket fiktif.

## Kunci dan petunjuk

- **Ingat kembali:** deskriptor 0 masukan, 1 keluaran, 2 galat standar; kode
  keluar 0 sukses, selain 0 gagal; program meminta kernel lewat `syscall`
  (nomor 1 `write` menulis byte ke deskriptor); `timeout` mencegah menunggu
  selamanya, 404 sumber tak ada, 429 terlalu banyak permintaan; `3^6 = 729 ≡ 1
  (mod 7)` dan 200 mod 6 = 2, jadi `3^200 ≡ 3^2 = 9 ≡ 2 (mod 7)`; menurut
  matematika `-7 mod 5 = 3`.
- **Setengah jadi:** bagian 1: 7 bit host, 128 alamat, 126 host; jaringan
  `192.0.2.128`, siaran `192.0.2.255`; `0x4500 + 0x001c = 0x451c`, dibalik
  `0xbae3`. Bagian 2: `AF_INET`, port peladen, `0`, `baca_baris`. Bagian 3:
  `sha256`, `compare_digest`. Bagian 4: injeksi perintah; penelusuran jalur;
  rahasia di kode.
- **Cek mandiri:** (2) jaringan `192.0.2.192`, siaran `192.0.2.255`, 62 host.
- **Petunjuk bertahap:** (1) gambar aliran data; (2) tulis apa yang diterima
  tiap `recv`; (3) bandingkan dengan anggapan program tentang batas pesan.

## Langkah berikutnya

`KUL-I-302` memakai utas dan soket untuk layanan konkuren; `KUL-I-205`
HTTP, TLS, dan pengamanan masukan; `KUL-I-401` pemeriksaan paket dan kebijakan
AI tim.

## Catatan untuk dosen

Bobot dan bentuk asesmen berikut **usulan**; prodi menetapkan (silabus 6.1,
6.2): praktikum soket dan kriptografi, kuis kumulatif, wawancara kode, ujian
tertulis dan praktik tanpa AI. Variasi tugas per mahasiswa: protokol baris,
port, data sintetis, nama paket fiktif. Praktikum keamanan hanya di mesin
virtual atau jaringan lab terisolasi; jangan menugaskan pemindaian sistem yang
bukan milik mahasiswa. Penyusun tidak menguraikan ketentuan pidana pasca UU
1/2023; libatkan pengajar hukum bila perlu. Angka paket fiktif berasal dari
satu studi dan satu kondisi: jangan disajikan sebagai laju tetap. SSDF hanya
diperkenalkan per kelompok praktik.
