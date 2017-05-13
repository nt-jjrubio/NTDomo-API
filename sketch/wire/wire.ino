#include <Wire.h>

#define SLAVE_ADDRESS 0x60

byte x = 0x00;
int v; 
void setup()
{
  Wire.begin(0x08);
  Wire.onReceive(receiveEvent);
  Wire.onRequest(requestEvent);
  Serial.begin(9600);
}

void loop()
{
  delay(100);
}

void requestEvent()
{
  Serial.print("Request from Master. Sending: ");
  Serial.print(x, HEX);
  Serial.print("\n");

  // Check request value from Master and send response (if request is 0x64 Write 200, else 0x65 response analog read)
  switch (x) {
    case 100:
      Wire.write(200);
      break;
    case 101:
      v = analogRead(0);
      Wire.write(v);
      break;
    default:
      Wire.write(x);
  }
 // Wire.write(x);
}

void receiveEvent(int bytes)
{
  if(Wire.available() != 0)
  {
    for(int i = 0; i< bytes; i++)
    {
      x = Wire.read();
      Serial.print("Received: ");
      Serial.print(x, HEX);
      Serial.print("\n");
    }
  }
}