#include <SPI.h>
#include <MFRC522.h>

#define SS_PIN 10
#define RST_PIN 7
#define BUZZER_PIN 8
#define LED_GREEN 7

MFRC522 rfid(SS_PIN, RST_PIN);

MFRC522::MIFARE_Key key;

void setup() {
  Serial.begin(9600);
  SPI.begin();
  rfid.PCD_Init();
  Serial.println("Scan a card");
}

void loop() {
  if (!rfid.PICC_IsNewCardPresent()) {
    return;
  }

  if (!rfid.PICC_ReadCardSerial()) {
    return;
  }

  String uidString = getUidString(rfid.uid.uidByte, rfid.uid.size);
  Serial.println(uidString);
  tone(BUZZER_PIN, 587); 
  digitalWrite(LED_GREEN,  HIGH);
  delay(200);
  tone(BUZZER_PIN, 784); // G4 (784 Hz)
  digitalWrite(LED_GREEN,  LOW);
  delay(200);
  noTone(BUZZER_PIN);
  rfid.PICC_HaltA();
}

String getUidString(byte *uidByte, byte uidSize) {
  String uidString = "";
  for (byte i = 0; i < uidSize; i++) {
    if (uidByte[i] < 0x10) {
      uidString += "0";  
    }
    uidString += String(uidByte[i], HEX);
  }
  uidString.toUpperCase();  
  return uidString;
}
