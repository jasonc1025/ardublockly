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
  Blockly.Arduino.addDeclaration('rf2dot4ghz_TAG_06', 'uint8_t pipePortNum_Int;');
  
  // For 'node_Server_Bot'
  Blockly.Arduino.addDeclaration('rf2dot4ghz_TAG_07', 'RF24 radio(6,7);');

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
  code.push('radio.read( &joystick_Int , sizeof(joystick_Int ) );');
  code.push('radio.writeAckPayload( pipePortNum_Int, &joystick_Int, sizeof(joystick_Int ));  // This can be commented out to send empty payloads.');
  
  // Join inbetween lines with '.join('\n')' and also end with '\n'
  return code.join('\n') + '\n';

};


/// jwc 2016-0703-1730

// * Advance Educational Version
//

/**
 * Code generator to prompt the user with a string (X) and request input.
 * Serial info: http://arduino.cc/en/Reference/Serial
 * Arduino code: getUserInputPrompt(...) { ... }
 *               loop { getUserInputPrompt("X")) }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code with order of operation.
 */
 
Blockly.Arduino['rf2dot4ghz_Rx_BLOCK'] = function(block) {
  // Get the first Serial peripheral of arduino board
  var returnType = block.getFieldValue('OUTPUT_TYPE_FIELD_ID');
    
  var debugOn_Flag = (block.getFieldValue('DEBUG_ON_FIELD_ID') == 'DEBUG_ON');

  // The function code changes based on reading a number or string
  var func = [];

  func.push('// * For:: ' + Blockly.Msg.ARD_RF2DOT4GHZ_READ_BLOCK_NAME );

  var toNumber = returnType == Blockly.Types.NUMBER.output;
  var toText = returnType == Blockly.Types.TEXT.output;

  if( toNumber ){
    func.push('long ' + Blockly.Arduino.DEF_FUNC_NAME + '(String prompt_ForSerialMonitor_STRING_ARG) {');
  } 
  else if( toText ){
    func.push('String ' + Blockly.Arduino.DEF_FUNC_NAME + '(String prompt_ForSerialMonitor_STRING_ARG) {');
  }
  func.push('');
  func.push('  // * Local Declarations');
  func.push('  boolean         irRx_KeyWasPressed_BOOLEAN_LOCAL = false;');
  func.push('  decode_results  irRx_KeyWasPressed_Data_OBJECT_LOCAL;');
  func.push('  long            irRx_KeyWasPressed_KeyCodeRaw_LONG_LOCAL = 0;');
  
  if( toText ){
  func.push('  char            irRx_KeyWasPressed_KeyCodeRaw_CHAR_LOCAL[64] = "";');
  func.push('  String          irRx_KeyWasPressed_KeyCodeRaw_STRING_LOCAL = "";');
  func.push('  const int       irRx_KeyWasPressed_NumberBase_INT_CONST_LOCAL = 16;');
  }

  func.push('');
  func.push('  // * Setup w/ Null Value');
  func.push('  irRx_KeyWasPressed_KeyCodeRaw_LONG_LOCAL = 0;');
  func.push('');
  func.push('  // * Poll & Decode into Two Outputs: \'irRx_KeyWasPressed_BOOLEAN_LOCAL\' & \'irRx_KeyWasPressed_Data_OBJECT_LOCAL\'');
  func.push('  irRx_KeyWasPressed_BOOLEAN_LOCAL = irRx_Main_OBJECT.decode( &irRx_KeyWasPressed_Data_OBJECT_LOCAL );');
  func.push('');
  func.push('  // * If Key was Pressed, Then...');
  func.push('  if( irRx_KeyWasPressed_BOOLEAN_LOCAL == true )');
  func.push('  {');
  func.push('    // * Read in Raw KeyCode.');
  func.push('    irRx_KeyWasPressed_KeyCodeRaw_LONG_LOCAL = irRx_KeyWasPressed_Data_OBJECT_LOCAL.value;');
  func.push('');
  func.push('    // * After Receiving Data, Must Reset Buffer to Resume Receiving of Next Value');
  func.push('    irRx_Main_OBJECT.resume();');
  func.push('  }');

  if( debugOn_Flag ){
  func.push('');
  func.push('  // * Debug via Serial Monitor: Part 1 of 2');
  func.push('  Serial.print( prompt_ForSerialMonitor_STRING_ARG + " " );');
  func.push('  Serial.print( irRx_KeyWasPressed_KeyCodeRaw_LONG_LOCAL );');
  }
  
  if( toNumber ){
    if( debugOn_Flag ){
  func.push('');
  func.push('  // * Debug via Serial Monitor: Part 2 of 2');
  func.push('  Serial.println( );');
    }
  func.push('');
  func.push('  // * Output Requested Value.');
  func.push('  return irRx_KeyWasPressed_KeyCodeRaw_LONG_LOCAL;');
  }
  else if( toText ){
  func.push('');
  func.push('  // * Additional Processing for Conversion to String Output.');
  func.push('  // * ');
  func.push('  // ** Stage 1 of 3:');
  func.push('  // *** Convert from Long Type to Char Type: \'irRx_KeyWasPressed_KeyCodeRaw_LONG_LOCAL\'(1st Arg: Input) >> \'irRx_KeyWasPressed_KeyCodeRaw_CHAR_LOCAL\'(2nd Arg: Output)');
  func.push('  // *** According to requested Number Base: \'irRx_KeyWasPressed_NumberBase_INT_CONST_LOCAL\'(3rd Arg: Input)');
  func.push('  ltoa( irRx_KeyWasPressed_KeyCodeRaw_LONG_LOCAL, irRx_KeyWasPressed_KeyCodeRaw_CHAR_LOCAL, irRx_KeyWasPressed_NumberBase_INT_CONST_LOCAL);');
  func.push('  // ** Stage 2 of 3:');
  func.push('  // *** Convert from Lower Case to Upper Case');
  func.push('  for( int i = 0; irRx_KeyWasPressed_KeyCodeRaw_CHAR_LOCAL[i] != 0; i++ ){ irRx_KeyWasPressed_KeyCodeRaw_CHAR_LOCAL[i] = toupper(irRx_KeyWasPressed_KeyCodeRaw_CHAR_LOCAL[i]); }');
  func.push('  // ** Stage 3 of 3:');
  func.push('  // *** Convert from Char Type to String Type');
  func.push('  irRx_KeyWasPressed_KeyCodeRaw_STRING_LOCAL = ( String )irRx_KeyWasPressed_KeyCodeRaw_CHAR_LOCAL;');
    if( debugOn_Flag ){
  func.push('');
  func.push('  // * Debug via Serial Monitor: Part 2 of 2');
  func.push('  Serial.print( " >> " );');
  func.push('  Serial.print( irRx_KeyWasPressed_KeyCodeRaw_STRING_LOCAL );');
  func.push('  Serial.println( );');
    }
  func.push('');
  func.push('  // * Output Requested Value.');
  func.push('  return irRx_KeyWasPressed_KeyCodeRaw_STRING_LOCAL;');    
  }
  func.push('}');
  
  var funcName = Blockly.Arduino.addFunction(
      'rf2dot4ghz_Rx_As' + returnType + '_FUNCTION', func.join('\n'));

  // * Include is universal for any application of rf2dot4ghz.  Thus same, generic tag shared for either Tx or Rx.
  // *
  Blockly.Arduino.addInclude('rf2dot4ghz_TAG_00', '// * For:: ' + Blockly.Msg.ARD_RF2DOT4GHZ_READ_BLOCK_NAME + ': 2016-1226-0200');
  Blockly.Arduino.addInclude('rf2dot4ghz_TAG_01', '#include <IRremote.h>');

  Blockly.Arduino.addDeclaration('rf2dot4ghz_Rx' + '_00' + '_TAG', '// * For:: ' + Blockly.Msg.ARD_RF2DOT4GHZ_READ_BLOCK_NAME);
  Blockly.Arduino.addDeclaration('rf2dot4ghz_Rx' + '_01' + '_TAG', 'const int       irRx_Pin_INT_CONST = ' + pinKey + ';');
  Blockly.Arduino.addDeclaration('rf2dot4ghz_Rx' + '_02' + '_TAG', 'IRrecv          irRx_Main_OBJECT( irRx_Pin_INT_CONST );');

  // Only overwrite the serial set up if not present already
  Blockly.Arduino.addSetup('rf2dot4ghz_Rx_TAG_00', '// * For:: ' + Blockly.Msg.ARD_RF2DOT4GHZ_READ_BLOCK_NAME, false);
  Blockly.Arduino.addSetup('rf2dot4ghz_Rx_TAG_01', 'irRx_Main_OBJECT.enableIRIn();', false);

  var prompt_ForSerialMonitor_STRING = Blockly.Arduino.valueToCode(block, 'PROMPT_TEXT_FIELD_ID',
      Blockly.Arduino.ORDER_NONE) || '""';
  var code = funcName + '(' + prompt_ForSerialMonitor_STRING + ')';

  // * Output Requested Value
  return [code, Blockly.Arduino.ORDER_UNARY_POSTFIX];
};


