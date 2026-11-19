// Header tiruan "HTTPClient.h" untuk scripts/check-module-code.ts.
// BUKAN pustaka asli: hanya deklarasi anggota yang dipakai contoh modul
// (nama anggota mengikuti HTTPClient milik Arduino-ESP32). Bukan bukti
// perilaku jaringan.
#pragma once
#include "Arduino.h"
#include "WiFi.h"

#define HTTPC_ERROR_CONNECTION_REFUSED (-1)
constexpr int HTTP_CODE_OK = 200;

class HTTPClient {
 public:
  bool begin(String url);
  void end();
  void setConnectTimeout(int32_t connectTimeout);
  void setTimeout(uint16_t timeout);
  void addHeader(const String &name, const String &value, bool first = false, bool replace = true);
  int GET();
  int POST(String payload);
  String getString();
  static String errorToString(int error);
};
