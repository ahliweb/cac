// Header tiruan untuk pustaka sensor jarak KARANGAN "PustakaJarak" yang dipakai
// modul sma-coding c-x2-m11 sebagai contoh netral (nama pustaka sungguhan
// tidak diklaim). BUKAN pustaka asli: hanya deklarasi anggota yang dipakai
// contoh modul, agar sintaks dan tipe sketsa bisa diperiksa oleh
// scripts/check-module-code.ts. Bukan bukti perilaku sensor atau papan.
#pragma once
#include "Arduino.h"

class SensorJarak {
 public:
  SensorJarak(int pinPemicu, int pinGema);
  void mulai();
  // Waktu pergi-pulang gema dalam mikrodetik; false bila tidak ada gema.
  bool bacaMikrodetik(unsigned long &mikrodetik);
};
