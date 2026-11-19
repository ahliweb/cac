## Untuk siapa modul ini

Modul ini untuk murid kelas XI jalur C (IoT dan robotika), minggu `C-XI2-M13` silabus v1.4: proyek sistem IoT lokal (F). Prasyarat: modul `c-xi2-m12` (keputusan otomatis berbasis data). Kamu memakai hasil modul sebelumnya di semester ini: sambungan dan alamat (`C-XI2-M1`), keamanan konektivitas (`C-XI2-M2`), publikasi-langganan (`C-XI2-M5` dan `C-XI2-M6`), format JSON (`C-XI2-M7`), diagnosis (`C-XI2-M8`), rekap (`C-XI2-M10`), prediksi (`C-XI2-M11`), dan keputusan (`C-XI2-M12`). Modul itu belum semuanya terindeks saat modul ini ditulis, jadi tidak ditulis sebagai prasyarat resmi.

Modul ini berstatus DRAF: karangan penyusun, belum ditinjau pemilik. Ia tidak dihitung memenuhi butir capaian pembelajaran mana pun; proyek ini menyatukan keterampilan modul sebelumnya. Keluaran minggu ini: sistem dan laporan. Latihan silabusnya: proyek kelompok.

Ada dua cara mengerjakan. **Dengan papan (F):** kelompok merakit papan pengirim, menyambungkannya lewat broker lokal guru ke penerima, dan menghubungkan kipas lewat modul pengendali. **Tanpa papan:** kelompok menjalankan "papan tiruan" di komputer untuk pengirim, saluran, dan penerima dengan aliran pesan karangan; semua bagian pokok tetap dikerjakan, tetapi perilaku Wi-Fi, broker sungguhan, dan kipas tidak teruji. Nomor pin, alamat, dan ambang pada contoh hanya contoh `[belum terverifikasi]` untuk jaringan dan rangkaianmu.

## Keselamatan perangkat

- Daya hanya dari kabel USB atau baterai AA/AAA yang disediakan guru. Tidak ada listrik jaringan (220 V), tidak ada baterai litium tanpa pelindung, dan kamu tidak mengisi daya litium.
- Kipas tidak disambung langsung ke pin papan; ia dijalankan lewat modul pengendali sesuai lembar guru. Cabut daya sebelum mengubah rangkaian dan periksa polaritas. Tidak ada kewajiban solder.
- Papan hanya disambungkan ke **jaringan lab** yang disiapkan guru. Nama dan sandi jaringan disimpan di luar kode yang kamu bagikan (`C-XI2-M2`); jangan menempelkannya ke laporan atau ke layanan AI.
- Jangan menyentuh baling-baling saat kipas menyala. Untuk menaikkan suhu sensor, genggam atau hembuskan udara hangat dari mulut; jangan memakai pemanas.
- Papan atau modul yang terasa panas, berbau, atau berasap: cabut daya dan panggil guru. Tidak ada kamera atau mikrofon, dan tidak ada sensor tubuh atau lokasi pribadi.

## Ingat kembali

Jawab dari ingatan dulu, baru cek di kunci. Soal 1 dari `C-XI2-M5`, soal 2 dari `C-XI2-M10`, soal 3 dari `C-XI2-M12`.

1. Mengapa broker menjadi titik kegagalan tunggal, dan apa dampaknya pada sistem proyek?
2. Mengapa rekap per jam perlu mencatat jumlah data sah `n` di samping rata-rata?
3. Mengapa keputusan kipas memakai dua batas (histeresis), bukan satu?

## Tujuan

Setelah modul ini kamu dapat:

- merencanakan sistem IoT lokal: tujuan, pembagian tugas, alur data, spesifikasi pesan, kriteria selesai yang dapat diuji, daftar uji, dan prediksi hasil;
- membangun pengirim (sensor ke JSON ke broker lokal) dan penerima (pemeriksaan, jendela, tebakan tren, keputusan kipas);
- menguji sistem dengan kasus uji tertulis: pesan rusak, di luar rentang, sensor gagal, dan pesan berhenti datang;
- mendiagnosis gangguan berurutan (daya, sinyal, alamat, broker, format) dan mencatatnya;
- menulis laporan satu halaman dan memberi serta menerima umpan balik sejawat (keluaran minggu ini: sistem dan laporan).

## Rencana proyek

Sebelum menyentuh papan, tulis rencanamu: apa arti "selesai", lalu tebakan hasilnya. Satu halaman cukup, dengan enam bagian: tujuan, pembagian tugas, alur data dan spesifikasi pesan, kriteria selesai, daftar uji, dan prediksi hasil.

Contoh terselesaikan untuk **pemantau suhu lab dengan kipas otomatis**:

| Bagian | Isi contoh |
| --- | --- |
| Tujuan | Papan pengirim mengukur suhu dan menerbitkannya; penerima menebak suhu berikutnya dan menyalakan kipas sebelum suhu melewati batas, tanpa terkecoh satu pesan rusak. |
| Pembagian tugas | Orang A pengirim dan broker, orang B penerima dan keputusan, orang C uji dan laporan; bertukar peran pada sesi berikutnya. |
| Alur data | sensor, JSON, topik `lab/kelompok1/suhu` di broker lokal, penerima, jendela tiga nilai, tebakan tren, kipas lewat modul pengendali. |
| Spesifikasi pesan | `{"sensor":"s01","suhu":28.6,"detik":0}`; suhu gagal ditulis `null`. Penerima menolak pesan bukan JSON sah dan suhu di luar 10 sampai 45 derajat (angka contoh). |
| Keadaan aman | Bila tidak ada pesan sah 10 detik, kipas menyala (kipas pendingin tidak berbahaya bila menyala terus). |
| Kriteria selesai | Lima uji pada tabel di bawah lolos; pesan rusak tidak mengubah keputusan; laporan satu halaman selesai. |
| Prediksi | Suhu 28,6; 29,0; 29,5 menghasilkan tebakan sekitar 29,93 sehingga kipas menyala. |

Program berikut adalah **papan tiruan** untuk seluruh alur: pengirim membentuk pesan JSON, penerima mengurai, menolak yang tidak sah, menebak tren, dan memutuskan. Aliran karangan memuat satu pesan rusak, satu di luar rentang, dan tiga kegagalan sensor beruntun.

```cpp
// C++17 biasa, jalan di komputer. Diperiksa oleh check:module-code.
#include <cmath>
#include <cstdio>
#include <cstdlib>
#include <string>
#include <vector>

const int K = 3;
const double NYALA_DI_ATAS = 29.5;
const double MATI_DI_BAWAH = 28.5;
const double SUHU_MIN = 10.0;  // rentang masuk akal; angka contoh untuk ruang lab
const double SUHU_MAKS = 45.0;
const long BATAS_DIAM_DETIK = 10;

struct Urai {
  bool sah;     // bentuk pesan sah
  bool hilang;  // sensor melaporkan null
  double suhu;
};

// Pengirim: menyusun satu pembacaan menjadi JSON.
std::string bentukJson(double suhu, long detik) {
  char buf[96];
  if (std::isnan(suhu)) {
    std::snprintf(buf, sizeof(buf), "{\"sensor\":\"s01\",\"suhu\":null,\"detik\":%ld}", detik);
  } else {
    std::snprintf(buf, sizeof(buf), "{\"sensor\":\"s01\",\"suhu\":%.1f,\"detik\":%ld}", suhu, detik);
  }
  return buf;
}

// Penerima: pengurai kasar untuk bidang "suhu" saja; bukan pengurai JSON lengkap.
Urai uraiSuhu(const std::string &pesan) {
  if (pesan.size() < 2 || pesan.front() != '{' || pesan.back() != '}') return {false, false, 0};
  size_t pos = pesan.find("\"suhu\":");
  if (pos == std::string::npos) return {false, false, 0};
  const char *awal = pesan.c_str() + pos + 7;
  if (std::string(awal).compare(0, 4, "null") == 0) return {true, true, NAN};
  char *akhir = nullptr;
  double nilai = std::strtod(awal, &akhir);
  if (akhir == awal || (*akhir != ',' && *akhir != '}')) return {false, false, 0};
  return {true, false, nilai};
}

double prediksiTren(const double w[], int n) {
  double sx = 0, sy = 0, sxy = 0, sxx = 0;
  for (int i = 0; i < n; i++) {
    sx += i;
    sy += w[i];
    sxy += i * w[i];
    sxx += static_cast<double>(i) * i;
  }
  double m = (n * sxy - sx * sy) / (n * sxx - sx * sx);
  return (sy - m * sx) / n + m * n;
}

struct Penerima {
  double jendela[K] = {};
  int terisi = 0;
  bool kipas = false;
  long terakhirSah = 0;
  int ditolak = 0;

  // Mengembalikan keterangan singkat apa yang terjadi.
  std::string terima(const std::string &pesan, long sekarang) {
    std::string ket;
    Urai u = uraiSuhu(pesan);
    if (!u.sah) {
      ditolak++;
      ket = "ditolak (bukan JSON sah)";
    } else if (u.hilang) {
      ket = "sensor gagal (null)";
    } else if (u.suhu < SUHU_MIN || u.suhu > SUHU_MAKS) {
      ditolak++;
      ket = "ditolak (di luar rentang)";
    } else {
      terakhirSah = sekarang;
      if (terisi < K) {
        jendela[terisi++] = u.suhu;
      } else {
        for (int i = 0; i < K - 1; i++) jendela[i] = jendela[i + 1];
        jendela[K - 1] = u.suhu;
      }
      ket = "diterima";
      if (terisi == K) {
        double p = prediksiTren(jendela, K);
        if (p > NYALA_DI_ATAS) kipas = true;
        if (p < MATI_DI_BAWAH) kipas = false;
        char buf[40];
        std::snprintf(buf, sizeof(buf), ", prediksi %.2f", p);
        ket += buf;
      }
    }
    if (sekarang - terakhirSah >= BATAS_DIAM_DETIK) {
      kipas = true;  // keadaan aman: tidak ada pesan sah terlalu lama
      terisi = 0;
      ket += "; keadaan aman";
    }
    return ket;
  }
};

int main() {
  // Aliran karangan: pesan dibentuk pengirim, satu dirusak, satu di luar rentang.
  struct Masuk {
    long detik;
    std::string pesan;
  };
  const std::vector<Masuk> aliran = {
      {0, bentukJson(28.6, 0)},   {2, bentukJson(29.0, 2)},        {4, bentukJson(29.5, 4)},
      {6, "{'suhu':29.8}"},       {8, bentukJson(85.0, 8)},        {10, bentukJson(NAN, 10)},
      {12, bentukJson(29.2, 12)}, {14, bentukJson(28.4, 14)},      {16, bentukJson(NAN, 16)},
      {20, bentukJson(NAN, 20)},  {24, bentukJson(NAN, 24)},
  };
  Penerima p;
  for (const Masuk &m : aliran) {
    std::string ket = p.terima(m.pesan, m.detik);
    std::printf("detik %2ld: %s; kipas %s\n", m.detik, ket.c_str(), p.kipas ? "nyala" : "mati");
  }
  std::printf("pesan ditolak: %d\n", p.ditolak);
}
```

Keluarannya:

```text
detik  0: diterima; kipas mati
detik  2: diterima; kipas mati
detik  4: diterima, prediksi 29.93; kipas nyala
detik  6: ditolak (bukan JSON sah); kipas nyala
detik  8: ditolak (di luar rentang); kipas nyala
detik 10: sensor gagal (null); kipas nyala
detik 12: diterima, prediksi 29.43; kipas nyala
detik 14: diterima, prediksi 27.93; kipas mati
detik 16: sensor gagal (null); kipas mati
detik 20: sensor gagal (null); kipas mati
detik 24: sensor gagal (null); keadaan aman; kipas nyala
pesan ditolak: 2
```

Daftar uji contoh (nilai dihitung penulis dengan program di atas):

| No | Masukan | Hasil yang diharapkan |
| --- | --- | --- |
| 1 | 28,6; 29,0; 29,5 berurutan | tebakan 29,93; kipas menyala |
| 2 | `{'suhu':29.8}` | ditolak; keputusan tidak berubah |
| 3 | suhu 85,0 | ditolak (di luar rentang); keputusan tidak berubah |
| 4 | `"suhu":null` | tidak masuk jendela; keputusan tidak berubah |
| 5 | tidak ada pesan sah selama 10 detik | keadaan aman: kipas menyala |

Perhatikan bahwa program ini memakai **waktu** (10 detik tanpa pesan sah) untuk keadaan aman, berbeda dengan **hitungan** gagal berturut-turut di `C-XI2-M12`. Kedua cara sah; kelompokmu memilih satu dan menuliskan alasannya. Pesan di luar rentang masih mungkin berasal dari sensor yang benar-benar melihat panas ekstrem; rentang 10 sampai 45 hanya angka contoh untuk ruang lab.

## Daftar periksa

Kerjakan berurutan dan centang bila selesai.

- [ ] Rencana satu halaman ditulis lebih dulu, termasuk keadaan aman dan prediksi hasil.
- [ ] Spesifikasi pesan dan nama topik disetujui pengirim dan penerima, dan penerima menolak pesan yang tidak sesuai.
- [ ] Pembagian tugas jelas; bertukar peran pada sesi berikutnya.
- [ ] Fungsi dibagi menurut tanggung jawab (bentuk pesan, urai, tebak, putuskan, tulis pin); yang tidak menyentuh pin diuji lebih dulu di komputer.
- [ ] Minimal lima uji tertulis seperti tabel contoh, termasuk pesan rusak, di luar rentang, sensor gagal, nilai tepat di batas, dan pesan berhenti; hasilnya dicatat.
- [ ] Penerima tidak memakai `delay` panjang dan memanggil `loop` klien sesering mungkin; ID klien tiap papan berbeda.
- [ ] Gangguan didiagnosis berurutan (daya, sinyal, alamat, broker, format), satu perubahan pada satu waktu, dan dicatat.
- [ ] Keselamatan: daya dicabut sebelum mengubah rangkaian; kipas lewat modul pengendali; polaritas diperiksa.
- [ ] Keamanan dan privasi: sandi dan kunci di luar kode yang dibagikan; hanya jaringan lab; tidak ada nama, sekolah, atau data pribadi di program, berkas, atau laporan; halaman data tidak dibuka ke internet.
- [ ] Bila memakai AI generatif: catatan pemakaian AI (alat, tujuan, garis besar perintah, bagian yang dipakai, cara memeriksa); kode buatan AI kamu baca, jalankan, dan uji; tidak ada sandi atau data pribadi pada perintah.
- [ ] Laporan satu halaman: tujuan, rancangan, hasil uji, satu hal yang berbeda dari prediksi, dan satu perbaikan berikutnya. Bila memakai data terbuka, atribusi dan lisensinya dicatat (`C-XI2-M9`).

## Umpan balik sejawat

Tukar rencana, spesifikasi pesan, dan program dengan satu kelompok lain. Beri umpan balik tentang pekerjaan, bukan tentang orangnya, dalam tiga kalimat:

1. **Satu yang sudah baik**, dengan bagian yang kamu tunjuk.
2. **Satu yang perlu diperbaiki**, dengan alasan.
3. **Satu langkah berikutnya** yang bisa dikerjakan minggu depan.

Contoh: "Daftar ujimu memuat pesan rusak dan sensor gagal. Keadaan aman belum menyebut apa yang terjadi saat pesan kembali datang; tuliskan kapan jendela diisi ulang. Langkah berikutnya: uji tebakan tepat di 29,5 dan 28,5." Terima umpan balik dengan mencatat, bukan membela.

## Latihan bercampur

1. Laporanmu memakai data terbuka berlisensi atribusi sebagai pembanding. Apa yang harus ada di laporan? (dari `C-XI2-M9`)
2. Tiga suhu terbaru 28,6; 29,0; 29,5. Berapa tebakan garis tren untuk suhu berikutnya, dan apakah kipas menyala dengan batas 29,5? (dari `C-XI2-M11`)

## Ulang berjarak

Pertanyaan ini akan muncul lagi di `Ingat kembali` modul `C-XI2-M14` (sekitar satu minggu lagi), `C-XII1-M2` (sekitar tiga minggu lagi), dan `C-XII1-M7` (sekitar delapan minggu lagi). Jawab sekarang lalu simpan.

1. Beri satu contoh kriteria selesai yang dapat diuji untuk sistem kipas, dan satu yang tidak dapat diuji.
2. Sebut dua alasan satu pembacaan tidak boleh langsung mengubah keputusan alat.
3. Mengapa sistem perlu keadaan aman bila pesan sah berhenti datang?

## Kesalahan umum

- **Langsung merakit tanpa rencana.** Tanpa kriteria selesai dan spesifikasi pesan bersama, pengirim dan penerima dibuat dengan dua tafsir.
- **Hanya menguji data yang rapi.** Galat muncul pada pesan rusak, nilai di luar rentang, sensor gagal, dan pesan yang berhenti.
- **Mengambil keputusan dari satu pesan.** Satu lonjakan atau satu pesan rusak tidak boleh mengubah keadaan kipas.
- **Mengubah banyak hal sekaligus saat gangguan.** Ikuti urutan diagnosis dan ubah satu hal pada satu waktu.
- **Menanam sandi di kode yang dibagikan.** Simpan di luar kode; ganti bila sempat terbagikan.
- **Mengira papan tiruan menggantikan papan.** Ia hanya memeriksa logika; jaringan, broker, derau, dan kipas sungguhan tidak diuji.

## Cek mandiri

- [ ] Saya menulis rencana, spesifikasi pesan, keadaan aman, dan kriteria selesai sebelum merakit.
- [ ] Saya membangun dan menguji sistem pengirim-penerima atau papan tiruannya.
- [ ] Saya menguji pesan rusak, di luar rentang, sensor gagal, tepat di batas, dan pesan berhenti.
- [ ] Saya mendiagnosis gangguan berurutan dan mencatatnya.
- [ ] Saya menulis laporan satu halaman dan memberi umpan balik dalam tiga kalimat.

## Kunci dan petunjuk

**Ingat kembali.** 1: bila broker mati semua pesan berhenti walau papan sehat; sistem proyek tidak mengirim atau menerima data sampai broker pulih. 2: rata-rata dari sedikit pembacaan sah kurang kuat dan pembaca perlu tahu berapa pembacaan yang gagal. 3: agar tebakan yang berayun di sekitar satu batas tidak membuat kipas berganti-ganti; pita di antara dua batas menjaga keadaan terakhir.

**Rencana proyek.** Tidak ada kunci tunggal untuk rencana kelompokmu. Rencana yang baik memuat enam bagian, spesifikasi pesan yang sama di kedua sisi, kriteria selesai yang dapat diuji, dan keadaan aman. Pada contoh, tebakan garis dari 28,6; 29,0; 29,5 adalah 29,93, melewati 29,5 sehingga kipas menyala; kejadian lain dihitung penulis dengan program di atas.

**Daftar periksa.** Tidak ada kunci. Periksa dengan rubrik: kelengkapan rencana, ketepatan uji dan hasil yang dicatat, keselamatan, keamanan dan privasi, dan kejujuran laporan (menyebut yang berbeda dari prediksi).

**Umpan balik sejawat.** Tidak ada kunci. Umpan balik yang baik menunjuk bagian yang konkret.

**Latihan bercampur.** 1: nama pencipta atau penerbit, tautan ke lisensi, pernyataan bila datanya kamu ubah, serta catatan sumber (judul, penerbit, lisensi, tanggal akses, satuan, lokasi). 2: garis dari (28,6; 29,0; 29,5) menebak 29,93; itu di atas 29,5 sehingga kipas menyala.

**Ulang berjarak.** 1: dapat diuji: "bila suhu naik 28,6; 29,0; 29,5, kipas menyala"; tidak dapat diuji: "sistem bekerja dengan baik". 2: pesan dapat rusak atau berisi nilai tak masuk akal, dan satu lonjakan sesaat tidak menggambarkan keadaan sebenarnya. 3: bila pesan berhenti, sistem tidak tahu keadaan sebenarnya; bertahan pada keputusan terakhir yang mungkin usang dapat berbahaya, sehingga ia menuju keadaan yang sudah ditentukan aman.

## Langkah berikutnya

Modul berikut: `c-xi2-m14` (asesmen dan refleksi semester ini), yang menilai jaringan, data, dan keamanan. Jadikan laporan proyek ini bahan refleksimu. Modul terkait: `c-xi2-m2` (keamanan konektivitas) dan `c-xi2-m8` (diagnosis). Pembacaan lanjut: panduan mata pelajaran Informatika Fase D sampai F.
