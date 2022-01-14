#include <Ultrasonic.h>
#include <ESP8266HTTPClient.h>
#include <ESP8266WiFi.h>
#define pino_trigger D1
#define pino_echo D2
#define WLAN_SSID "Filipe_LPinternet_31086833"
#define WLAN_PASS "11011994"
String API_URL = "http://192.168.100.7:3333/receptor/?token=filipe&medida=";
String currentValueDistance = "";
Ultrasonic ultrasonic(pino_trigger, pino_echo);
 
void setup()
{  
  Serial.begin(9600);  
  WiFi.begin(WLAN_SSID, WLAN_PASS); 
  Serial.print("Conectando");
  while (WiFi.status() != WL_CONNECTED)
  {
    delay(500);
    Serial.print(".");
  }  
  Serial.print("\nConectado | Endereço IP: ");
  Serial.println(WiFi.localIP()); 
  delay(1000);
}
 
void loop()
{  
  float cmMsec;
  long microsec = ultrasonic.timing();
  cmMsec = ultrasonic.convert(microsec, Ultrasonic::CM);
  String cmMsecString = String(cmMsec, 0); 
    if(cmMsecString != currentValueDistance){
    currentValueDistance = cmMsecString;    
    if(WiFi.status() == WL_CONNECTED){
      HTTPClient http;      
      String url = API_URL + cmMsecString;      
      http.begin(url);
      http.addHeader("Content-Type", "text/plain");  
      int statusCode = http.POST("FROM NODEMCU");
      String payload = http.getString();  
      Serial.println(statusCode);
      Serial.println(payload);  
      http.end();
    }
    else{
      Serial.println("Erro na conexão!");
    }
  } 
  delay(1000);
}