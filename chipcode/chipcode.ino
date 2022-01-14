#include <Ultrasonic.h>
#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>
#include <ESP8266mDNS.h>

#define pino_trigger D1
#define pino_echo D2

#define WLAN_SSID "Filipe_LPinternet_31086833"
#define WLAN_PASS "11011994"

Ultrasonic ultrasonic(pino_trigger, pino_echo);
ESP8266WebServer server(80);

void handleRoot(){
  digitalWrite(2, HIGH);

  float cmMsec;
  long microsec = ultrasonic.timing();
  cmMsec = ultrasonic.convert(microsec, Ultrasonic::CM);
  String cmMsecString = String(cmMsec, 0); 

  float cheio = 4; // Distancia cheia em cm do meu tanque
  float vazio = 9.85; // Distancia vazia em cm do meu tanque
  float capacidade = 1; // Capacidade do meu tanque em Litros
  float nivelagua = ((vazio - cmMsec)/(vazio - cheio))*100; // Percentual Nivel da agua
  float estimativa = (capacidade * nivelagua)/100; // Resultado do que há no tanque em Litros

  String htmlCode;

  htmlCode = String("<!DOCTYPE html><html lang='pt-br'><head> <meta charset='UTF-8'> <meta http-equiv='X-UA-Compatible' content='IE=edge'> <meta name='viewport' content='width=device-width, initial-scale=1.0'> <link rel='preconnect' href='https://fonts.gstatic.com'> <link href='https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap' rel='stylesheet'> <title>Volume da caixa d' água</title> <style> * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Inter', sans-serif; } body { display: flex; flex-direction: row; align-items: center; justify-content: center; background: #ededed; } .mobile { margin: .8rem 0; height: 95vh; width: 380px; background: #FFF; padding: 0 1.4rem; display: flex; flex-direction: column; align-items: center; transition: .2s; position: relative; border-radius: 2.4rem; box-shadow: 0 5px 8px 0 rgb(0 0 0 / 30%); } .header { width: 380px; border-radius: 2.4rem 2.4rem 0 0; padding: 1.4rem; display: flex; flex-direction: row; align-items: center; justify-content: center; box-shadow: 0 5px 8px 0 rgb(0 0 0 / 30%); } .header .title { font-size: large; font-weight: 700; color: #666; text-transform: uppercase; } .header .btn-not-visible { opacity: 0; width: 42px; height: 42px; } .header .btn-visible { width: 42px; height: 42px; border-radius: 50%; display: flex; flex-direction: row; align-items: center; justify-content: center; position: relative; border: none; background: #FFF; color: #666; outline: none; box-shadow: 0 5px 8px 0 rgb(0 0 0 / 30%); transition: 0.2s; } .header .btn-visible:active { box-shadow: inset 0 5px 8px 0 rgb(0 0 0 / 30%); } .container { margin-top: 3.4rem; display: flex; flex-direction: column; align-items: center; justify-content: center; width: 380px; } .container .water-tank { width: 250px; height: 350px; border: 2px solid #666; border-radius: 0.8rem; display: flex; flex-direction: row; align-items: flex-end; } .container .water-tank .water { width: 250px; max-height: 350px; background-color: aqua; text-align: center; } .container .info{ display: flex; flex-direction: column; margin-top: 0.8rem; align-items: center; justify-content: center; } .container .info .title{ font-size: large; font-weight: 700; color: #666; text-transform: uppercase; } .container .info .value{ margin: 0.8rem 0; font-size: xxx-large; font-weight: 700; color: #666; text-transform: uppercase; } .container .info .reservatorio-capacity{ margin: 0.2rem 0; font-size: normal; font-weight: 400; color: #666; text-transform: uppercase; } .container .info .reservatorio-volume{ margin: 0.2rem 0; font-size: normal; font-weight: 400; color: #666; text-transform: uppercase; } .container .footer{ margin-top: 1.4rem; display: flex; flex-direction: column; align-items: center; justify-content: center; width: 380px; } .container .footer #data-collect, .container .footer .developer{ margin: 0.4rem; text-align: center; font-size: normal; font-weight: 400; color: #666; } </style></head><body> <div class='mobile'> <div class='header'><div class='title'>Volume Cx Água</div></div> <div class='container'> <div class='water-tank'> <div class='water' style='height: ") + nivelagua + String("%;'></div> </div> <div class='info'> <div class='title'>Nivel do reservatório</div> <div class='value'>") + String(nivelagua) + String("%</div> <div class='reservatorio-capacity'><strong>Capacidade do reservatório: </strong>") + String(capacidade) + String("</div> <div class='reservatorio-volume'><strong>Volume estimado: </strong>~") + String(estimativa) + String("L</div> </div> <div class='footer'> <div id='data-collect'> </div> <div class='developer'> Desenvolvido por: <br/> <a href='https://filipedev.ga'>Filipe Batista</a> </div> </div> </div> </div> <script>window.onload = () => { document.getElementById('data-collect').innerHTML = `<strong>Dados obtidos em: </strong><br />${ new Date(Date.now()).toLocaleDateString('pt-br', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })}`; /* setTimeout(() => { window.location.reload(false); }, 5000); */ }  </script></body></html>");
  htmlCode += String("<div style='display:none;'>");
  htmlCode += String("<p> ValorSensor = ") + String(cmMsec) + String("cm </p>");
  htmlCode += String("<p> CmCheio = ") + String(cheio) + String("cm </p>");
  htmlCode += String("<p> CmVazio = ") + String(vazio) + String("cm </p>");
  htmlCode += String("<p> Capacidade = ") + String(capacidade) + String("L </p>");
  htmlCode += String("<p> Calculo do NA: ((") + String(vazio) + String(" - ") + String(cmMsec) + String(")/(") + String(vazio) + String(" - ") + String(cheio) + String(")) * 100 = ") + String(nivelagua);
  htmlCode += String("<p> Nivel Agua = ") + String(nivelagua) + String("% </p>");
  htmlCode += String("<p> Calculo Estimativa: (") + String(capacidade) + String(" * ") + String(nivelagua) + String(") / 100 = ")+ String(estimativa) + String("% </p>");
  htmlCode += String("<p> Estimativa = ") + String(estimativa) + String("L </p>");
  htmlCode += String("<div>");
  
  server.send(200, "text/html", htmlCode);
  
  digitalWrite(2, LOW);
}

void handleNotFound(){
  digitalWrite(2, HIGH);
  String message = "File Not Found\n\n";
    message += "URI: ";
    message += server.uri();
    message += "\nMethod: ";
    message += (server.method() == HTTP_GET)?"GET":"POST";
    message += "\nArguments: ";
    message += server.args();
    message += "\n";
  for(uint8_t i=0; i<server.args(); i++){
    message += " " + server.argName(i) + ": " + server.arg(i) + "\n";
  }
  server.send(404, "text/plain", message);  
  digitalWrite(2, LOW);
}

void setup()
{  
  pinMode(2, OUTPUT);
  digitalWrite(2, LOW);
  Serial.begin(9600);  
  WiFi.mode(WIFI_STA);
  WiFi.begin(WLAN_SSID, WLAN_PASS); 
  Serial.print("Conectando");
  while (WiFi.status() != WL_CONNECTED)
  {
    delay(500);
    Serial.print(".");
  }  
  Serial.print("\nConectado | Endereço IP: ");
  Serial.println(WiFi.localIP()); 

  if(MDNS.begin("esp8266")){
    Serial.println("MDNS responder started");
  }

  server.on("/", handleRoot);
  server.on("/teste", [](){ 
    server.send(200, "text/plain", "{ 'message': 'Ok!' }");
  });

  server.onNotFound(handleNotFound);

  server.begin();
  Serial.print("\nHTTP Seerver Started");
  
  delay(1000);
}
 
void loop()
{  
  server.handleClient();
}
