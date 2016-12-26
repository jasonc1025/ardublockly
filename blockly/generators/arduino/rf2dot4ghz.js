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

'use strict';

goog.provide('Blockly.Arduino.rf2dot4ghz');

goog.require('Blockly.Arduino');

/**
 * Code generator for block for setting the rf2dot4ghz com speed.
 * Arduino code: setup{ Lcd.begin(X); }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code.
 */
Blockly.Arduino['rf2dot4ghz_setup_BLOCK'] = function(block) {
  // // var lcdId = block.getFieldValue('LCD_FIELD_ID');  
  
  // Convert from number to text
  var rf24Dot4Ghz_Channel_As_Dec = Blockly.Arduino.valueToCode(
      block, 'RF2DOT4GHZ_CHANNEL_AS_DEC_FIELD_ID', Blockly.Arduino.ORDER_ATOMIC) || '101';


  var networkNodeType = block.getFieldValue('NETWORK_NODE_TYPE_FIELD_ID');
    
  // * Include is universal for any application of LCD. 
  // *
  Blockly.Arduino.addInclude('rf2dot4ghz_TAG_00', '// * For:: ' + Blockly.Msg.ARD_RF2DOT4GHZ_SETUP_BLOCK_NAME + ': 2016-1225-1930');
  Blockly.Arduino.addInclude('rf2dot4ghz_TAG_01', '#include <SPI.h>');
  Blockly.Arduino.addInclude('rf2dot4ghz_TAG_02', '#include <nRF24L01.h>');
  Blockly.Arduino.addInclude('rf2dot4ghz_TAG_03', '#include <RF24.h>');

  Blockly.Arduino.addDeclaration('rf2dot4ghz_TAG_00', '// * For:: ' + Blockly.Msg.ARD_RF2DOT4GHZ_SETUP_BLOCK_NAME);
  Blockly.Arduino.addDeclaration('rf2dot4ghz_TAG_01', 'typedef enum { node_Server_Bot = 0, node_Client_UI_Joystick = 1 } node_TypeDef;');
  Blockly.Arduino.addDeclaration('rf2dot4ghz_TAG_02', 'const char* node_Label[] = { "Node_Server_Bot", "Node_Client_UI_Joystick"};');
  Blockly.Arduino.addDeclaration('rf2dot4ghz_TAG_03', 'node_TypeDef node_Type = ' + networkNodeType + ';');
  Blockly.Arduino.addDeclaration('rf2dot4ghz_TAG_04', 'unsigned int node_Type_AsInt = (unsigned int)( node_Type );');
  Blockly.Arduino.addDeclaration('rf2dot4ghz_TAG_05', 'int16_t joystick_Int[6];  // 6 element array holding Joystick reading and 4 buttons');
  
  // For 'node_Server_Bot'
  Blockly.Arduino.addDeclaration('rf2dot4ghz_TAG_06', 'RF24 radio(6,7);');

  // For 'Node_Client_UI_Joystick'
  // // Blockly.Arduino.addDeclaration('rf2dot4ghz_TAG_06', 'RF24 radio(6,7);');
//// TODO
  
  
  // Allow overwrite by setting last arguement as 'true'
  Blockly.Arduino.addSetup('rf2dot4ghz_TAG_00', '// * For:: ' + Blockly.Msg.ARD_RF2DOT4GHZ_SETUP_BLOCK_NAME, true);
  Blockly.Arduino.addSetup('rf2dot4ghz_TAG_01', 'radio.begin();', true);
  Blockly.Arduino.addSetup('rf2dot4ghz_TAG_02', 'radio.setDataRate(RF24_250KBPS); // Lowest Data Rate with Longer Range', true);
  Blockly.Arduino.addSetup('rf2dot4ghz_TAG_03', 'radio.setPALevel(RF24_PA_MAX);', true);
  Blockly.Arduino.addSetup('rf2dot4ghz_TAG_04', 'radio.setChannel(' + rf24Dot4Ghz_Channel_As_Dec + ');', true);
//// TODO
  
  // Add the code
  var code = [];
  code.push('uint8_t pipeNum_Local;');
  code.push('radio.read( &joystick_Int , sizeof(joystick_Int ) );');
  code.push('radio.writeAckPayload( pipeNum_Local, &joystick_Int, sizeof(joystick_Int ));  // This can be commented out to send empty payloads.');
  
  // Join inbetween lines with '.join('\n')' and also end with '\n'
  return code.join('\n') + '\n';

};


