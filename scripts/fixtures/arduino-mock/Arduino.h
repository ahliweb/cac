// Header tiruan "Arduino.h" untuk scripts/check-module-code.ts (issue #178).
//
// PENTING: ini BUKAN pustaka Arduino. Isinya hanya deklarasi minimal API yang
// lazim dipakai contoh di modul, supaya `g++ -std=c++17 -fsyntax-only` dapat
// memeriksa SINTAKS dan TIPE sketsa terhadap API tiruan ini. Tidak ada yang
// dijalankan atau ditautkan, sehingga lolosnya pemeriksaan BUKAN bukti perilaku
// di papan nyata (waktu, tegangan, pin, memori). Sketsa yang memakai API di
// luar daftar ini gagal di sini; tambahkan deklarasi seperlunya, jangan isi
// badan fungsi.
#pragma once

#include <math.h>  // Arduino.h asli juga menyertakan math.h (NAN, isnan, sqrt).
#include <stddef.h>
#include <stdint.h>

// Tipe dan konstanta
typedef bool boolean;
typedef uint8_t byte;
typedef unsigned int word;

constexpr uint8_t HIGH = 0x1;
constexpr uint8_t LOW = 0x0;
constexpr uint8_t INPUT = 0x0;
constexpr uint8_t OUTPUT = 0x1;
constexpr uint8_t INPUT_PULLUP = 0x2;
constexpr uint8_t LED_BUILTIN = 13;
constexpr uint8_t A0 = 14;
constexpr uint8_t A1 = 15;
constexpr uint8_t A2 = 16;
constexpr uint8_t A3 = 17;
constexpr uint8_t A4 = 18;
constexpr uint8_t A5 = 19;

// Pin dan waktu
void pinMode(uint8_t pin, uint8_t mode);
void digitalWrite(uint8_t pin, uint8_t value);
int digitalRead(uint8_t pin);
int analogRead(uint8_t pin);
void analogWrite(uint8_t pin, int value);
void delay(unsigned long ms);
void delayMicroseconds(unsigned int us);
unsigned long millis();
unsigned long micros();

// Matematika
long map(long value, long fromLow, long fromHigh, long toLow, long toHigh);
template <class T, class L, class H>
auto constrain(T amount, L low, H high) -> decltype(amount < low ? low : (amount > high ? high : amount)) {
  return amount < low ? low : (amount > high ? high : amount);
}

// String minimal
class String {
 public:
  String();
  String(const char *text);
  String(int value);
  String(long value);
  String(unsigned int value);
  String(unsigned long value);
  String(float value, unsigned char decimals = 2);
  String(double value, unsigned char decimals = 2);
  unsigned int length() const;
  char charAt(unsigned int index) const;
  int toInt() const;
  float toFloat() const;
  bool equals(const String &other) const;
  String operator+(const String &other) const;
  String &operator+=(const String &other);
  bool operator==(const String &other) const;
  bool operator!=(const String &other) const;
};

// Serial minimal
class HardwareSerial {
 public:
  void begin(unsigned long baud);
  size_t print(const char *text);
  size_t print(const String &text);
  size_t print(char value);
  size_t print(int value);
  size_t print(unsigned int value);
  size_t print(long value);
  size_t print(unsigned long value);
  size_t print(double value, int digits = 2);
  size_t println();
  size_t println(const char *text);
  size_t println(const String &text);
  size_t println(char value);
  size_t println(int value);
  size_t println(unsigned int value);
  size_t println(long value);
  size_t println(unsigned long value);
  size_t println(double value, int digits = 2);
  int available();
  int read();
};
extern HardwareSerial Serial;

// Pustaka pendamping: deklarasi kosong (hanya nama, tanpa anggota).
class TwoWire {};
extern TwoWire Wire;
// WiFi, WiFiClient, IPAddress, HTTPClient, WebServer, dan PubSubClient punya
// header tiruan sendiri (WiFi.h, HTTPClient.h, WebServer.h, PubSubClient.h).

// Nada dan LEDC inti Arduino-ESP32 (nama mengikuti dokumentasi Espressif 3.x).
void tone(uint8_t pin, unsigned int frequency, unsigned long duration = 0);
void noTone(uint8_t pin);
bool ledcAttach(uint8_t pin, uint32_t freq, uint8_t resolution);
uint32_t ledcWrite(uint8_t pin, uint32_t duty);
uint32_t ledcWriteTone(uint8_t pin, uint32_t freq);
bool ledcDetach(uint8_t pin);

// Titik masuk sketsa: cukup dideklarasikan; sketsa mendefinisikannya.
void setup();
void loop();
