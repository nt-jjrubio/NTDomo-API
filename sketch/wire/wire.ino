/*******************************************************/
/***** I2C Control - NTDomo - For arduino nano 328 *****/
/*******************************************************/
/* I2C Commands:                                       */
/* ====================================================*/
/* 0x02   -->  Return this device i2c address          */
/* 0x10x  -->  ON, OFF pin X                           */
/* 0x05x  -->  Return Digital PIN Status               */
/* 0x04x  -->  Read analog X pin value                 */
/*                                                     */
/*******************************************************/

#include <Wire.h>

#define SLAVE_ADDRESS 0x09

byte x = 0x00;

bool pinState[8];

int v;
void setup()
{
  Wire.begin(SLAVE_ADDRESS);
  Wire.onReceive(receiveEvent);
  Wire.onRequest(requestEvent);
  Serial.begin(9600);
  Serial.print("Arduino nano with i2c address ");
  Serial.print(SLAVE_ADDRESS);

  // Initialize digital pins to off and set pin on digital mode
  int i;
  for( i = 0; i < 8; i++ )
  {
    pinState[i]=false;
    pinMode(i, OUTPUT);
  }


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

    // Whoami
    case 2:
      Wire.write(SLAVE_ADDRESS);
      break;

    // TurnON and TurnOFF Digital pins
    case 102:
      onOffDigital(2);
      break;
    case 103:
      onOffDigital(3);
      break;
    case 104:
      onOffDigital(4);
      break;
    case 105:
      onOffDigital(5);
      break;
    case 106:
      onOffDigital(6);
      break;
    case 107:
      onOffDigital(7);
      break;
    case 108:
      onOffDigital(8);
      break;
    case 109:
      onOffDigital(9);
      break;

    // Read Digital PIN Status
    case 52:
      getPinStatus(2);
      break;
    case 53:
      getPinStatus(3);
      break;
    case 54:
      getPinStatus(4);
      break;
    case 55:
      getPinStatus(5);
      break;
    case 56:
      getPinStatus(6);
      break;
    case 57:
      getPinStatus(7);
      break;
    case 58:
      getPinStatus(8);
      break;
    case 59:
      getPinStatus(9);
      break;


    case 40:
      getAnalogValue(0);
      break;
    case 41:
      getAnalogValue(1);
      break;
    case 42:
      getAnalogValue(2);
      break;
    case 43:
      getAnalogValue(3);
      break;
    case 46:
      getAnalogValue(6);
      break;
    case 47:
      getAnalogValue(7);
      break;



//    case 100:
//      Wire.write(200);
//      break;
//    case 201:
//      v = analogRead(0);
//      Wire.write(v);
//      break;
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


void onOffDigital (int pin){
  if(pinState[pin-1]){
    Serial.print("Off pin ");
    Serial.print(pin);
    digitalWrite(pin,LOW);
    // 1xx Status codes ... 100 off 101 on
    pinState[pin-1] = false;
    Wire.write(0);

  } else {

    Serial.print("ON pin ");
    Serial.print(pin);
    digitalWrite(pin,HIGH);
    pinState[pin-1] = true;
    Wire.write(1);
  }
}

void getPinStatus(int pin){
  if(pinState[pin-1])
  {
    Wire.write(0x01);
  } else {
    Wire.write(0x00);
  }
}


void getAnalogValue(int pin){
  int v = analogRead(pin);
  Wire.write(v);
}
