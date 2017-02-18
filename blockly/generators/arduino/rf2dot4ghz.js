/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Code generator for the Arduino rf2dot4ghz blocks.
 *     Arduino rf2dot4ghz library docs: https://www.arduino.cc/en/Reference/LiquidCrystal
 *
 */
 
// Modeled after 'Serial Setup & Print'
// Tag Numbering
//   Setup: Tag_xx
//   Loop: Tag_1xx

'use strict';

goog.provide('Blockly.Arduino.rf2dot4ghz');

goog.require('Blockly.Arduino');

/**
 * Code generator for block for setting the rf2dot4ghz com speed.
 * Arduino code: setup{ Lcd.begin(X); }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code.
 */
Blockly.Arduino['rf2dot4ghz_BotOrJoystick_Setup_BLOCK'] = function(block) {
  // // var lcdId = block.getFieldValue('LCD_FIELD_ID');  
  
  // Convert from number to text
  var rf24Dot4Ghz_Channel_As_Dec = Blockly.Arduino.valueToCode(
      block, 'RF2DOT4GHZ_CHANNEL_AS_DEC_FIELD_ID', Blockly.Arduino.ORDER_ATOMIC) || '101';


  var networkNodeType = block.getFieldValue('NETWORK_NODE_TYPE_FIELD_ID');
  var networkNodeType_Is_BotAsServer = networkNodeType == 'node_Bot_AsServer';
  var networkNodeType_Is_JoystickAsClient = networkNodeType == 'node_Joystick_AsClient';
    
  // * Include is universal for any application of LCD. 
  // *
  Blockly.Arduino.addInclude('rf2dot4ghz_TAG_00', '// * For:: ' + Blockly.Msg.ARD_RF2DOT4GHZ_SETUP_BLOCK_NAME + ': 2016-1225-1930');
  Blockly.Arduino.addInclude('rf2dot4ghz_TAG_01', '#include <SPI.h>');
  Blockly.Arduino.addInclude('rf2dot4ghz_TAG_02', '#include <nRF24L01.h>');
  Blockly.Arduino.addInclude('rf2dot4ghz_TAG_03', '#include <RF24.h>');

  Blockly.Arduino.addDeclaration('rf2dot4ghz_TAG_00', '// * For:: ' + Blockly.Msg.ARD_RF2DOT4GHZ_SETUP_BLOCK_NAME);

  Blockly.Arduino.addDeclaration('rf2dot4ghz_TAG_01', 'typedef enum { node_Bot_AsServer = 0, node_Joystick_AsClient = 1 } node_TypeDef;');
  Blockly.Arduino.addDeclaration('rf2dot4ghz_TAG_02', 'const char* node_Label[] = { "Node_Server_Bot", "Node_Client_UI_Joystick"};');
  Blockly.Arduino.addDeclaration('rf2dot4ghz_TAG_03', 'node_TypeDef node_Type = ' + networkNodeType + ';');
  Blockly.Arduino.addDeclaration('rf2dot4ghz_TAG_04', 'unsigned int node_Type_AsInt = (unsigned int)( node_Type );');

  Blockly.Arduino.addDeclaration('rf2dot4ghz_TAG_05', 'byte addresses[][6] = {"0Node","1Node"};              // Radio pipe addresses for the 2 nodes to communicate.');
  
  Blockly.Arduino.addDeclaration('rf2dot4ghz_TAG_06', 'int16_t joystick_Int[6];  // 6 element array holding Joystick reading and 4 buttons');
  Blockly.Arduino.addDeclaration('rf2dot4ghz_TAG_07', 'uint8_t pipePortNum_Int;');
  
  if( networkNodeType_Is_BotAsServer ){
    // For 'node_Bot_AsServer'
    Blockly.Arduino.addDeclaration('rf2dot4ghz_TAG_08', 'RF24 radio(6,7);');
  }
  else if( networkNodeType_Is_JoystickAsClient ){
    // For 'node_Joystick_AsClient'
    Blockly.Arduino.addDeclaration('rf2dot4ghz_TAG_08', 'RF24 radio(9,10);');
    Blockly.Arduino.addDeclaration('rf2dot4ghz_TAG_09', '#define JOYSTICK_X A0');
    Blockly.Arduino.addDeclaration('rf2dot4ghz_TAG_10', '#define JOYSTICK_Y A1');
    Blockly.Arduino.addDeclaration('rf2dot4ghz_TAG_11', 'int16_t joystick_Ack_Int[6];  // 6 element array holding Joystick reading and 4 buttons');
  }
  


  // Allow overwrite by setting last (2nd) arguement as 'true'
  Blockly.Arduino.addSetup('rf2dot4ghz_TAG_00', '// * For:: ' + Blockly.Msg.ARD_RF2DOT4GHZ_SETUP_BLOCK_NAME, true);

  Blockly.Arduino.addSetup('rf2dot4ghz_TAG_01', 'Serial.println(( node_Label[ node_Type_AsInt ] ));', true);

  Blockly.Arduino.addSetup('rf2dot4ghz_TAG_02', 'radio.begin();', true);
  Blockly.Arduino.addSetup('rf2dot4ghz_TAG_03', 'radio.setDataRate(RF24_250KBPS); // Lowest Data Rate with Longer Range', true);
  Blockly.Arduino.addSetup('rf2dot4ghz_TAG_04', 'radio.setPALevel(RF24_PA_MAX);', true);
  Blockly.Arduino.addSetup('rf2dot4ghz_TAG_05', 'radio.setChannel(' + rf24Dot4Ghz_Channel_As_Dec + ');', true);

  if( networkNodeType_Is_BotAsServer ){
    // For 'node_Bot_AsServer'
    Blockly.Arduino.addSetup('rf2dot4ghz_TAG_06', 'radio.openReadingPipe(1,addresses[0]);      // Open a reading pipe 1 (universal reading pipe for any node is pipe 1), as address 0', true);
    Blockly.Arduino.addSetup('rf2dot4ghz_TAG_07', 'radio.openWritingPipe(addresses[1]);        // Both radios listen on the same pipes by default (universal writing pipe for any node is pipe 0), but write to address specified here', true);    
  }
  else if( networkNodeType_Is_JoystickAsClient ){
    // For 'node_Joystick_AsClient'
    Blockly.Arduino.addSetup('rf2dot4ghz_TAG_06', 'radio.openReadingPipe(1,addresses[1]);      // Open a reading pipe 1 (universal reading pipe for any node is pipe 1), as address 1', true);
    Blockly.Arduino.addSetup('rf2dot4ghz_TAG_07', 'radio.openWritingPipe(addresses[0]);        // Both radios listen on the same pipes by default (universal writing pipe for any node is pipe 0), but write to address specified here', true);        
  }
  else{
    Blockly.Arduino.addSetup('rf2dot4ghz_TAG_06', 'Serial.print(("Invalid <networkNodeType> = "));', true);
    Blockly.Arduino.addSetup('rf2dot4ghz_TAG_07', 'Serial.println((' + networkNodeType + '));', true);        
      
  }

  Blockly.Arduino.addSetup('rf2dot4ghz_TAG_08', 'radio.enableAckPayload();', true);
  Blockly.Arduino.addSetup('rf2dot4ghz_TAG_09', 'radio.enableDynamicPayloads();', true);
  Blockly.Arduino.addSetup('rf2dot4ghz_TAG_10', 'radio.powerUp();', true);
  Blockly.Arduino.addSetup('rf2dot4ghz_TAG_11', 'radio.startListening();', true);
  Blockly.Arduino.addSetup('rf2dot4ghz_TAG_12', 'radio.printDetails();', true);


  
  // Add the code
  var code = [];
  // // code.push('// code here');
  
  // Join inbetween lines with '.join('\n')' and also end with '\n'
  return code.join('\n') + '\n';

};


/**
 * Code generator to prompt the user with a string (X) and request input.
 * Serial info: http://arduino.cc/en/Reference/Serial
 * Arduino code: getUserInputPrompt(...) { ... }
 *               loop { getUserInputPrompt("X")) }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code with order of operation.
 */
 
// // Blockly.Arduino['rf2dot4ghz_loop_stage01_rx_values_all_BLOCK'] = function(block) {
Blockly.Arduino['rf2dot4ghz_BotAsServer_Loop_Msg_02_Rx'] = function(block) {
  // Get the first Serial peripheral of arduino board
  // // var returnType = block.getFieldValue('OUTPUT_TYPE_FIELD_ID');
      
  var debugOn_Flag = (block.getFieldValue('DEBUG_ON_FIELD_ID') == 'DEBUG_ON');

  if( debugOn_Flag ){
  Blockly.Arduino.addDeclaration('rf2dot4ghz_TAG_100', 'String    lcd_OneRow_StringObject;');
  Blockly.Arduino.addDeclaration('rf2dot4ghz_TAG_101', 'const int lcd_OneRow_Columns_MAX = 16;');
  }

  // Add the code
  var code = [];
  // // code.push('uint8_t pipeNum_Local;');
  code.push('while( radio.available( &pipePortNum_Int )){              // Read all available payloads');
  code.push('');

  code.push('  radio.read( &joystick_Int , sizeof(joystick_Int ) );');
  code.push('  radio.writeAckPayload( pipePortNum_Int, &joystick_Int, sizeof(joystick_Int ));  // This can be commented out to send empty payloads.');
  code.push('');

  if( debugOn_Flag ){
  code.push('  lcd_OneRow_StringObject = "<";');
  code.push('');
  code.push('  for( int i = 0; i < (sizeof(joystick_Int)/sizeof(uint16_t)); i++ ){');
  code.push('');
  code.push('    if( i <= 1 ){');
  code.push('      lcd_OneRow_StringObject += String( joystick_Int[i] ) + " ";');
  code.push('    }');
  code.push('');
  code.push('    if( i >= 2 && i <= 5 && joystick_Int[i] == 0 ){');
  code.push('      lcd_OneRow_StringObject += String( i - 1 );  // Convert to base-1 value');
  code.push('    }');
  code.push('  }');
  code.push('  lcd_OneRow_StringObject += " ";');
  code.push('');
  code.push('  while( lcd_OneRow_StringObject.length() < lcd_OneRow_Columns_MAX ){');
  code.push('    lcd_OneRow_StringObject.concat(" ");');
  code.push('  }');
  code.push('');
  code.push('  Serial.println("");');
  code.push('  Serial.println(lcd_OneRow_StringObject);');
  code.push('  myLcd.setCursor(0,0);');
  code.push('  myLcd.print(lcd_OneRow_StringObject);');  
  }
  
  code.push('');
  code.push('}');
  code.push('');
    
  // // if( block.getFieldValue('OUTPUT_TYPE_FIELD_ID') == 'joystick_Int_X' ){
    // // code.push('map(joystick_Int[0],0,1023,0,180); // turn value of 0-1023 to 0-180 degrees');
  // // } 
  // // else if( block.getFieldValue('OUTPUT_TYPE_FIELD_ID') == 'joystick_Int_Y' ){  
    // // code.push('map(joystick_Int[1],0,1023,0,180);  // turn value of 0-1023 to 0-180 degrees');      
  // // } 
  // // else if( block.getFieldValue('OUTPUT_TYPE_FIELD_ID') == 'button_A_Value' ){
    // // code.push('joystick_Int[2];');
  // // } 
  // // else if( block.getFieldValue('OUTPUT_TYPE_FIELD_ID') == 'button_B_Value' ){
    // // code.push('joystick_Int[3];');
  // // } 
  // // else if( block.getFieldValue('OUTPUT_TYPE_FIELD_ID') == 'button_C_Value' ){
    // // code.push('joystick_Int[4];');
  // // } 
  // // else if( block.getFieldValue('OUTPUT_TYPE_FIELD_ID') == 'button_D_Value' ){
    // // code.push('joystick_Int[5];');
  // // }
  // // else{
    // // code.push('Serial.print("Invalid <OUTPUT_TYPE_FIELD_ID> = ");');
    // // code.push('Serial.println(' + OUTPUT_TYPE_FIELD_ID + ');');      
  // // }
    
  // Join inbetween lines with '.join('\n')' and also end with '\n'
  return code.join('\n') + '\n';
  // // // * Output Requested Value
  // // return [code, Blockly.Arduino.ORDER_UNARY_POSTFIX];

};

/**
 * Function for reading an analogue pin value (X).
 * Arduino code: setup { pinMode(X, INPUT); }
 *               loop  { analogRead(X)      }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code with order of operation.
 */
// // Blockly.Arduino['rf2dot4ghz_loop_stage02_rx_value_select_BLOCK'] = function(block) {
Blockly.Arduino['rf2dot4ghz_BotAsServer_Loop_Msg_03_Read'] = function(block) {
    
  // Get the first Serial peripheral of arduino board
  var returnType = block.getFieldValue('OUTPUT_TYPE_FIELD_ID');

  // // var pin = block.getFieldValue('PIN');
  // // Blockly.Arduino.reservePin(
      // // block, pin, Blockly.Arduino.PinTypes.INPUT, 'Analogue Read');

  // // var pinSetupCode = 'pinMode(' + pin + ', INPUT);';
  // // Blockly.Arduino.addSetup('io_' + pin, pinSetupCode, false);

  var code = [];

  // // var code = 'analogRead(' + pin + ')';
  // // return [code, Blockly.Arduino.ORDER_ATOMIC];
  
  // IMPORTANT: Since a return function, no need to end with ';' since it will be added automatically
  if( block.getFieldValue('OUTPUT_TYPE_FIELD_ID') == 'joystick_Int_X' ){
    code.push('map(joystick_Int[0],0,1023,0,180)');
  } 
  else if( block.getFieldValue('OUTPUT_TYPE_FIELD_ID') == 'joystick_Int_Y' ){  
    code.push('map(joystick_Int[1],0,1023,0,180)');      
  } 
  else if( block.getFieldValue('OUTPUT_TYPE_FIELD_ID') == 'button_A_Value' ){
    code.push('joystick_Int[2]');
  } 
  else if( block.getFieldValue('OUTPUT_TYPE_FIELD_ID') == 'button_B_Value' ){
    code.push('joystick_Int[3]');
  } 
  else if( block.getFieldValue('OUTPUT_TYPE_FIELD_ID') == 'button_C_Value' ){
    code.push('joystick_Int[4]');
  } 
  else if( block.getFieldValue('OUTPUT_TYPE_FIELD_ID') == 'button_D_Value' ){
    code.push('joystick_Int[5]');
  }
  else{
    code.push('Serial.print("Invalid <OUTPUT_TYPE_FIELD_ID> = ");');
    code.push('Serial.println(' + OUTPUT_TYPE_FIELD_ID + ')');      
  }
    
  // // // Join inbetween lines with '.join('\n')' and also end with '\n'
  // // return code.join('\n') + '\n';
  // // return [code, Blockly.Arduino.ORDER_UNARY_POSTFIX];
  // // return [code, Blockly.Arduino.ORDER_ATOMIC];
  // // GOOD: return [code, Blockly.Arduino.ORDER_UNARY_POSTFIX];
  // // GOOD: return [code, Blockly.Arduino.ORDER_ATOMIC];
  // Output Requested Value
  // Use 'ORDER_UNARY_POSTFIX' since 'spi_transfer_return' does
  return [code, Blockly.Arduino.ORDER_UNARY_POSTFIX];
  
};

