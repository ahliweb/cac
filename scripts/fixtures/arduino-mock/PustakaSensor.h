// Header tiruan untuk pustaka sensor KARANGAN "PustakaSensor" yang dipakai
// modul sma-coding c-x2-m2 sebagai contoh netral (nama pustaka sungguhan
// tidak diklaim). BUKAN pustaka nyata; hanya untuk scripts/check-module-code.ts.
#pragma once
#include "Arduino.h"

class SensorIklim {
 public:
  explicit SensorIklim(int pin);
  void mulai();
  float bacaSuhu();
  float bacaLembap();
};
