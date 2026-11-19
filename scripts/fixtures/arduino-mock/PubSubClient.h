// Header tiruan "PubSubClient.h" untuk scripts/check-module-code.ts.
// BUKAN pustaka asli: hanya deklarasi anggota yang dipakai contoh modul
// (nama anggota mengikuti pustaka PubSubClient). Bukan bukti perilaku
// jaringan atau broker.
#pragma once
#include "Arduino.h"
#include "WiFi.h"

class PubSubClient {
 public:
  explicit PubSubClient(Client &client);
  PubSubClient &setServer(const char *domain, uint16_t port);
  PubSubClient &setCallback(void (*callback)(char *, uint8_t *, unsigned int));
  bool connect(const char *id);
  bool connected();
  int state();
  bool publish(const char *topic, const char *payload);
  bool subscribe(const char *topic);
  bool loop();
};
