// Header tiruan "WebServer.h" untuk scripts/check-module-code.ts.
// BUKAN pustaka asli: hanya deklarasi anggota yang dipakai contoh modul
// (nama anggota mengikuti WebServer milik Arduino-ESP32). Bukan bukti
// perilaku jaringan.
#pragma once
#include "Arduino.h"
#include "WiFi.h"

class WebServer {
 public:
  explicit WebServer(int port = 80);
  void begin();
  void handleClient();
  void on(const char *uri, void (*handler)());
  void onNotFound(void (*handler)());
  String uri() const;
  void send(int code, const char *contentType, const String &content);
};
