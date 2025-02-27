#include <WiFi.h>
#include <HTTPClient.h>
#include <FirebaseJson.h>

#define RXp2 16
#define TXp2 17

const char *ssid = "Shield";
const char *password = "my43017#a18s20oKe20";
const char *api_url = "http://192.168.1.113:8000/scan";

FirebaseJson json;

void setup() {
  Serial.begin(115200);
  Serial2.begin(9600, SERIAL_8N1, RXp2, TXp2);

  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }
  Serial.println("WiFi connected successfully!");

}

void loop() {
  if (Serial2.available()) {
    String arduino_response = Serial2.readString();

    Serial2.print(arduino_response);
    arduino_response.trim();

    if (WiFi.status() == WL_CONNECTED) {
      
      HTTPClient http;
      http.begin(api_url);
      http.addHeader("Content-Type", "application/json");

      json.set("uuid", arduino_response);
      json.set("sender","B55H001");
      String jsonString;
      json.toString(jsonString);  

      int httpResponseCode = http.POST(jsonString);

      if (httpResponseCode > 0) {
        Serial.println("Server Response: " + http.getString());
      } else {
        Serial.print("Error on sending POST: ");
        Serial.println(httpResponseCode);
      }

      http.end();
    } else {
      Serial.println("WiFi disconnected!");
    }
  }
}
