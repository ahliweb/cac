// Header tiruan pustaka ESP32Servo untuk scripts/check-module-code.ts.
// BUKAN pustaka asli: hanya deklarasi anggota yang dipakai contoh modul,
// agar sintaks dan tipe sketsa bisa diperiksa. Bukan bukti perilaku servo.
#pragma once
#include "Arduino.h"

class Servo {
 public:
  int attach(int pin);
  int attach(int pin, int minUs, int maxUs);
  void detach();
  void write(int angle);
  void writeMicroseconds(int us);
  int read();
  bool attached();
  void setPeriodHertz(int hertz);
};
