// Header tiruan "WiFi.h" untuk scripts/check-module-code.ts.
// BUKAN pustaka asli: hanya deklarasi anggota yang dipakai contoh modul
// sma-coding (C-XI2), agar sintaks dan tipe sketsa dapat diperiksa. Tidak
// ada koneksi yang dibuat; lolos periksa BUKAN bukti perilaku jaringan.
#pragma once
#include "Arduino.h"

class IPAddress {
 public:
  IPAddress();
  IPAddress(uint8_t a, uint8_t b, uint8_t c, uint8_t d);
  String toString() const;
};

typedef enum {
  WL_NO_SHIELD = 255,
  WL_IDLE_STATUS = 0,
  WL_NO_SSID_AVAIL = 1,
  WL_CONNECTED = 3,
  WL_CONNECT_FAILED = 4,
  WL_DISCONNECTED = 6
} wl_status_t;

typedef enum { WIFI_MODE_NULL = 0, WIFI_STA = 1, WIFI_AP = 2 } wifi_mode_t;

class Client {};
class WiFiClient : public Client {};

class WiFiClass {
 public:
  bool mode(wifi_mode_t mode);
  wl_status_t begin(const char *ssid, const char *passphrase = nullptr);
  wl_status_t status();
  bool disconnect(bool wifioff = false);
  IPAddress localIP();
  int32_t RSSI();
};
extern WiFiClass WiFi;
