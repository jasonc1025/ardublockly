/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Arduino code generator for the text blocks.
 *     Partially implements the Arduino Infrared interface as described in:
 *     https://www.arduino.cc/en/Tutorial/RobotRemoteControl
 *
 * TODO: 
 */
'use strict';

goog.provide('Blockly.Arduino.infrared');

goog.require('Blockly.Arduino');


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

/// jwc good: Blockly.Arduino['text_prompt_ext_IrTxRx_Jwc'] = function(block) {
/// 2016-0709-1234 jwc desktop good but not browser:Blockly.Arduino['infraredComms_Rx'] = function(block) {
/// jwc browser:bad, desktop:good:: Blockly.Arduino['text_prompt_ext_infraredComms_Rx'] = function(block) {
/// jwc browser:bad, desktop:bad:: Blockly.Arduino['text_prompt_ext_infraredComms'] = function(block) {
/// jwc good both browser & windows: Blockly.Arduino['infrared_Comms_Rx'] = function(block) {
/// jwc good both: Blockly.Arduino['infrared12345_Comms_Rx'] = function(block) {
/// jwc good both: Blockly.Arduino['commsInfrared_Rx'] = function(block) {
/// jwc good both: Blockly.Arduino['infraredComms_Rx'] = function(block) {
/// jwc no: Blockly.Arduino['commsInfrared_Rx_BLOCK'] = function(block) {
Blockly.Arduino['commsInfrared_Rx_BLOCK'] = function(block) {
  // Get the first Serial peripheral of arduino board
  /// jwc 2016-0710-1935: var serialId = Blockly.Arduino.Boards.selected.serial[0][1];
  var returnType = block.getFieldValue('OUTPUT_TYPE_FIELD_ID');
  
  // 2016-0710-1700 jwc	
  var pinKey = block.getFieldValue('SERVO_PIN_FIELD_ID');
  
  /// jwc good: var debugOn_Flag = (block.getFieldValue('DEBUG_ON_FIELD_ID') == 'TRUE');
  var debugOn_Flag = (block.getFieldValue('DEBUG_ON_FIELD_ID') == 'DEBUG_ON');

  // The function code changes based on reading a number or string
  var func = [];

  /// jwc good: func.push('  /// * 2016-0706-0300 This is a test: jwc');
  /// jwc good: func.push('// * 2016-0710-2000 For "commsInfrared_Rx_BLOCK"');
  /// jwc good: func.push('// * For \'commsInfrared_Rx_BLOCK\'');
  func.push('// For:: ' + Blockly.Msg.ARD_INFRARED_READ_BLOCK_NAME );

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
/// jwc good:   func.push('  // * After Attempt to Receive Data, Must Reset to Resume Receiving of Next Value');
/// jwc good:   func.push('  irRx_Main_OBJECT.resume();');
/// jwc good:   func.push('');
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
  /// jwc good:     'getUserInputPrompt' + returnType, func.join('\n'));
      'commsInfrared_Rx_As' + returnType + '_FUNCTION', func.join('\n'));

  // * Include is universal for any application of CommsInfrared.  Thus same, generic tag shared for either Tx or Rx.
  // *
  // 2016-0706-0300 jwc 
  /// jwc good: Blockly.Arduino.addInclude('serial', '#include <IRremote.h>');
  /// jwc good: Blockly.Arduino.addInclude('infraredComms', '#include <IRremote.h>');
  /// jwc good: Blockly.Arduino.addInclude('infrared_Comms', '#include <IRremote.h>');
  /// jwc good: Blockly.Arduino.addInclude('commsInfrared_TAG_00', '// * For \'commsInfrared_Rx_BLOCK\': 2016-0711-1130');
  Blockly.Arduino.addInclude('commsInfrared_TAG_00', '// For:: ' + Blockly.Msg.ARD_INFRARED_READ_BLOCK_NAME);
  Blockly.Arduino.addInclude('commsInfrared_TAG_01', '#include <IRremote.h>');

  /// GOOD jwc: Blockly.Arduino.addInclude('serial', '#include <IRremote2.h>');
  /// GOOD jwc: Blockly.Arduino.addInclude('serial03', '#include <IRremote3.h>');
  
  /// jwc good: // 2016-0706-0300 jwc 
  /// jwc good: Blockly.Arduino.addDeclaration('serial_' + serialId       , 'const int       irRx_Pin_INT_CONST = 2;');
  /// jwc good: /// BAD, WOULD NOT SHOW, SEEMS TO NEED UNIQUE IDS:  Blockly.Arduino.addDeclaration('serial_' + serialId, 'IRrecv          irRx_Main_OBJECT( irRx_Pin_INT_CONST );');
  /// jwc good: Blockly.Arduino.addDeclaration('serial_' + serialId + '02', 'IRrecv          irRx_Main_OBJECT( irRx_Pin_INT_CONST );');
  /// jwc good: Blockly.Arduino.addDeclaration('serial_' + serialId + '03', 'boolean         irRx_KeyWasPressed_BOOLEAN_LOCAL = false;');
  /// jwc good: Blockly.Arduino.addDeclaration('serial_' + serialId + '04', 'decode_results  irRx_KeyWasPressed_Data_OBJECT_LOCAL;');
  /// jwc good: Blockly.Arduino.addDeclaration('serial_' + serialId + '05', 'long            irRx_KeyWasPressed_KeyCodeRaw_LONG_LOCAL = 0;');

  // 2016-0706-0300 jwc 
  /// jwc good: Blockly.Arduino.addDeclaration('infraredComms_Rx'        , 'const int       irRx_Pin_INT_CONST = 2;');
  /// jwc good: Blockly.Arduino.addDeclaration('infraredComms_Rx' + '_02', 'IRrecv          irRx_Main_OBJECT( irRx_Pin_INT_CONST );');
  /// jwc good: Blockly.Arduino.addDeclaration('infraredComms_Rx' + '_03', 'boolean         irRx_KeyWasPressed_BOOLEAN_LOCAL = false;');
  /// jwc good: Blockly.Arduino.addDeclaration('infraredComms_Rx' + '_04', 'decode_results  irRx_KeyWasPressed_Data_OBJECT_LOCAL;');
  /// jwc good: Blockly.Arduino.addDeclaration('infraredComms_Rx' + '_05', 'long            irRx_KeyWasPressed_KeyCodeRaw_LONG_LOCAL = 0;');
  
  /// jwc good: Blockly.Arduino.addDeclaration('infrared_Comms_Rx'        , 'const int       irRx_Pin_INT_CONST = 2;');
  /// jwc good: Blockly.Arduino.addDeclaration('infrared_Comms_Rx' + '_02', 'IRrecv          irRx_Main_OBJECT( irRx_Pin_INT_CONST );');
  /// jwc good: Blockly.Arduino.addDeclaration('infrared_Comms_Rx' + '_03', 'boolean         irRx_KeyWasPressed_BOOLEAN_LOCAL = false;');
  /// jwc good: Blockly.Arduino.addDeclaration('infrared_Comms_Rx' + '_04', 'decode_results  irRx_KeyWasPressed_Data_OBJECT_LOCAL;');
  /// jwc good: Blockly.Arduino.addDeclaration('infrared_Comms_Rx' + '_05', 'long            irRx_KeyWasPressed_KeyCodeRaw_LONG_LOCAL = 0;');

  /// jwc good: Blockly.Arduino.addDeclaration('commsInfrared_Rx'         + '_TAG', 'const int       irRx_Pin_INT_CONST = 2;');
  /// jwc good: Blockly.Arduino.addDeclaration('commsInfrared_Rx' + '_00' + '_TAG', '// * For \'commsInfrared_Rx_BLOCK\'');
  Blockly.Arduino.addDeclaration('commsInfrared_Rx' + '_00' + '_TAG', '// For:: ' + Blockly.Msg.ARD_INFRARED_READ_BLOCK_NAME);
  Blockly.Arduino.addDeclaration('commsInfrared_Rx' + '_01' + '_TAG', 'const int       irRx_Pin_INT_CONST = ' + pinKey + ';');
  Blockly.Arduino.addDeclaration('commsInfrared_Rx' + '_02' + '_TAG', 'IRrecv          irRx_Main_OBJECT( irRx_Pin_INT_CONST );');


  // Only overwrite the serial set up if not present already
  /// GOOD jwc: var setupCode = serialId + '.begin(9600);';
  /// GOOD jwc: Blockly.Arduino.addSetup('serial_' + serialId, setupCode, false);
  /// jwc: Blockly.Arduino.addSetup('serial_' + serialId, '// Setup Code', false);
  /// GOOD jwc 'overwrite = true': Blockly.Arduino.addSetup('serial_' + serialId, '// Setup Code', true);
  // jwc good: Blockly.Arduino.addSetup('serial_' + serialId, '  irRx_Main_OBJECT.enableIRIn();', false);
  /// jwc good: Blockly.Arduino.addSetup('infraredComms_Rx', 'irRx_Main_OBJECT.enableIRIn();', false);
  /// jwc good: Blockly.Arduino.addSetup('infrared_Comms_Rx', 'irRx_Main_OBJECT.enableIRIn();', false);
  /// jwc good: Blockly.Arduino.addSetup('commsInfrared_Rx_TAG_00', '// * For \'commsInfrared_Rx_BLOCK\'', false);
  Blockly.Arduino.addSetup('commsInfrared_Rx_TAG_00', '// For:: ' + Blockly.Msg.ARD_INFRARED_READ_BLOCK_NAME, false);
  Blockly.Arduino.addSetup('commsInfrared_Rx_TAG_01', 'irRx_Main_OBJECT.enableIRIn();', false);

  /// jwc ?: var prompt_ForSerialMonitor_STRING = Blockly.Arduino.valueToCode(block, 'PROMPT_TEXT_FIELD_ID',
  var prompt_ForSerialMonitor_STRING = Blockly.Arduino.valueToCode(block, 'PROMPT_TEXT_FIELD_ID',
      Blockly.Arduino.ORDER_NONE) || '""';
  /// jwc good:   var code = funcName + '(' + prompt_ForSerialMonitor_STRING + ')';
  /// jwc ok but not great since an input-block and not a complete statement: var code = '// * 2016-0711-1100 For \'commsInfrared_Rx_BLOCK\' \n' + 
  /// jwc ok but not great since an input-block and not a complete statement:    funcName + '(' + prompt_ForSerialMonitor_STRING + ')';
  var code = '// For:: ' + Blockly.Msg.ARD_INFRARED_READ_BLOCK_NAME + '\n' +
             funcName + '(' + prompt_ForSerialMonitor_STRING + ')';

  // * Output Requested Value
  return [code, Blockly.Arduino.ORDER_UNARY_POSTFIX];
};

// * Basic Non-Educational Version
// 
Blockly.Arduino['commsInfrared_Rx_BLOCK_BASIC'] = function(block) {
  // Get the first Serial peripheral of arduino board
  /// jwc 2016-0710-1935: var serialId = Blockly.Arduino.Boards.selected.serial[0][1];
  var returnType = block.getFieldValue('OUTPUT_TYPE_FIELD_ID');
  
  // 2016-0710-1700 jwc	
  var pinKey = block.getFieldValue('SERVO_PIN_FIELD_ID');
  
/// jwc override:   /// jwc good: var debugOn_Flag = (block.getFieldValue('DEBUG_ON_FIELD_ID') == 'TRUE');
/// jwc override:   var debugOn_Flag = (block.getFieldValue('DEBUG_ON_FIELD_ID') == 'DEBUG_ON');

  // The function code changes based on reading a number or string
  var func = [];

  /// jwc good: func.push('  /// * 2016-0706-0300 This is a test: jwc');
  /// jwc good: func.push('// * 2016-0710-2000 For "commsInfrared_Rx_BLOCK"');
  /// jwc good: func.push('// * For \'commsInfrared_Rx_BLOCK\'');
  func.push('// For:: ' + Blockly.Msg.ARD_INFRARED_READ_BLOCK_NAME );

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
/// jwc good:   func.push('  // * After Attempt to Receive Data, Must Reset to Resume Receiving of Next Value');
/// jwc good:   func.push('  irRx_Main_OBJECT.resume();');
/// jwc good:   func.push('');
/// jwc override:   if( debugOn_Flag ){
/// jwc override:   func.push('');
/// jwc override:   func.push('  // * Debug via Serial Monitor: Part 1 of 2');
/// jwc override:   func.push('  Serial.print( prompt_ForSerialMonitor_STRING_ARG + " " );');
/// jwc override:   func.push('  Serial.print( irRx_KeyWasPressed_KeyCodeRaw_LONG_LOCAL );');
/// jwc override:   }
  
  if( toNumber ){
/// jwc override:     if( debugOn_Flag ){
/// jwc override:   func.push('');
/// jwc override:   func.push('  // * Debug via Serial Monitor: Part 2 of 2');
/// jwc override:   func.push('  Serial.println( );');
/// jwc override:     }
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
/// jwc override:     if( debugOn_Flag ){
/// jwc override:   func.push('');
/// jwc override:   func.push('  // * Debug via Serial Monitor: Part 2 of 2');
/// jwc override:   func.push('  Serial.print( " >> " );');
/// jwc override:   func.push('  Serial.print( irRx_KeyWasPressed_KeyCodeRaw_STRING_LOCAL );');
/// jwc override:   func.push('  Serial.println( );');
/// jwc override:     }
  func.push('');
  func.push('  // * Output Requested Value.');
  func.push('  return irRx_KeyWasPressed_KeyCodeRaw_STRING_LOCAL;');    
  }
  func.push('}');
  
  var funcName = Blockly.Arduino.addFunction(
  /// jwc good:     'getUserInputPrompt' + returnType, func.join('\n'));
      'commsInfrared_Rx_As' + returnType + '_FUNCTION', func.join('\n'));

  // * Include is universal for any application of CommsInfrared.  Thus same, generic tag shared for either Tx or Rx.
  // *
  // 2016-0706-0300 jwc 
  /// jwc good: Blockly.Arduino.addInclude('serial', '#include <IRremote.h>');
  /// jwc good: Blockly.Arduino.addInclude('infraredComms', '#include <IRremote.h>');
  /// jwc good: Blockly.Arduino.addInclude('infrared_Comms', '#include <IRremote.h>');
  /// jwc good: Blockly.Arduino.addInclude('commsInfrared_TAG_00', '// * For \'commsInfrared_Rx_BLOCK\': 2016-0711-1130');
  Blockly.Arduino.addInclude('commsInfrared_TAG_00', '// For:: ' + Blockly.Msg.ARD_INFRARED_READ_BLOCK_NAME);
  Blockly.Arduino.addInclude('commsInfrared_TAG_01', '#include <IRremote.h>');

  /// GOOD jwc: Blockly.Arduino.addInclude('serial', '#include <IRremote2.h>');
  /// GOOD jwc: Blockly.Arduino.addInclude('serial03', '#include <IRremote3.h>');
  
  /// jwc good: // 2016-0706-0300 jwc 
  /// jwc good: Blockly.Arduino.addDeclaration('serial_' + serialId       , 'const int       irRx_Pin_INT_CONST = 2;');
  /// jwc good: /// BAD, WOULD NOT SHOW, SEEMS TO NEED UNIQUE IDS:  Blockly.Arduino.addDeclaration('serial_' + serialId, 'IRrecv          irRx_Main_OBJECT( irRx_Pin_INT_CONST );');
  /// jwc good: Blockly.Arduino.addDeclaration('serial_' + serialId + '02', 'IRrecv          irRx_Main_OBJECT( irRx_Pin_INT_CONST );');
  /// jwc good: Blockly.Arduino.addDeclaration('serial_' + serialId + '03', 'boolean         irRx_KeyWasPressed_BOOLEAN_LOCAL = false;');
  /// jwc good: Blockly.Arduino.addDeclaration('serial_' + serialId + '04', 'decode_results  irRx_KeyWasPressed_Data_OBJECT_LOCAL;');
  /// jwc good: Blockly.Arduino.addDeclaration('serial_' + serialId + '05', 'long            irRx_KeyWasPressed_KeyCodeRaw_LONG_LOCAL = 0;');

  // 2016-0706-0300 jwc 
  /// jwc good: Blockly.Arduino.addDeclaration('infraredComms_Rx'        , 'const int       irRx_Pin_INT_CONST = 2;');
  /// jwc good: Blockly.Arduino.addDeclaration('infraredComms_Rx' + '_02', 'IRrecv          irRx_Main_OBJECT( irRx_Pin_INT_CONST );');
  /// jwc good: Blockly.Arduino.addDeclaration('infraredComms_Rx' + '_03', 'boolean         irRx_KeyWasPressed_BOOLEAN_LOCAL = false;');
  /// jwc good: Blockly.Arduino.addDeclaration('infraredComms_Rx' + '_04', 'decode_results  irRx_KeyWasPressed_Data_OBJECT_LOCAL;');
  /// jwc good: Blockly.Arduino.addDeclaration('infraredComms_Rx' + '_05', 'long            irRx_KeyWasPressed_KeyCodeRaw_LONG_LOCAL = 0;');
  
  /// jwc good: Blockly.Arduino.addDeclaration('infrared_Comms_Rx'        , 'const int       irRx_Pin_INT_CONST = 2;');
  /// jwc good: Blockly.Arduino.addDeclaration('infrared_Comms_Rx' + '_02', 'IRrecv          irRx_Main_OBJECT( irRx_Pin_INT_CONST );');
  /// jwc good: Blockly.Arduino.addDeclaration('infrared_Comms_Rx' + '_03', 'boolean         irRx_KeyWasPressed_BOOLEAN_LOCAL = false;');
  /// jwc good: Blockly.Arduino.addDeclaration('infrared_Comms_Rx' + '_04', 'decode_results  irRx_KeyWasPressed_Data_OBJECT_LOCAL;');
  /// jwc good: Blockly.Arduino.addDeclaration('infrared_Comms_Rx' + '_05', 'long            irRx_KeyWasPressed_KeyCodeRaw_LONG_LOCAL = 0;');

  /// jwc good: Blockly.Arduino.addDeclaration('commsInfrared_Rx'         + '_TAG', 'const int       irRx_Pin_INT_CONST = 2;');
  /// jwc good: Blockly.Arduino.addDeclaration('commsInfrared_Rx' + '_00' + '_TAG', '// * For \'commsInfrared_Rx_BLOCK\'');
  Blockly.Arduino.addDeclaration('commsInfrared_Rx' + '_00' + '_TAG', '// For:: ' + Blockly.Msg.ARD_INFRARED_READ_BLOCK_NAME);
  Blockly.Arduino.addDeclaration('commsInfrared_Rx' + '_01' + '_TAG', 'const int       irRx_Pin_INT_CONST = ' + pinKey + ';');
  Blockly.Arduino.addDeclaration('commsInfrared_Rx' + '_02' + '_TAG', 'IRrecv          irRx_Main_OBJECT( irRx_Pin_INT_CONST );');


  // Only overwrite the serial set up if not present already
  /// GOOD jwc: var setupCode = serialId + '.begin(9600);';
  /// GOOD jwc: Blockly.Arduino.addSetup('serial_' + serialId, setupCode, false);
  /// jwc: Blockly.Arduino.addSetup('serial_' + serialId, '// Setup Code', false);
  /// GOOD jwc 'overwrite = true': Blockly.Arduino.addSetup('serial_' + serialId, '// Setup Code', true);
  // jwc good: Blockly.Arduino.addSetup('serial_' + serialId, '  irRx_Main_OBJECT.enableIRIn();', false);
  /// jwc good: Blockly.Arduino.addSetup('infraredComms_Rx', 'irRx_Main_OBJECT.enableIRIn();', false);
  /// jwc good: Blockly.Arduino.addSetup('infrared_Comms_Rx', 'irRx_Main_OBJECT.enableIRIn();', false);
  /// jwc good: Blockly.Arduino.addSetup('commsInfrared_Rx_TAG_00', '// * For \'commsInfrared_Rx_BLOCK\'', false);
  Blockly.Arduino.addSetup('commsInfrared_Rx_TAG_00', '// For:: ' + Blockly.Msg.ARD_INFRARED_READ_BLOCK_NAME, false);
  Blockly.Arduino.addSetup('commsInfrared_Rx_TAG_01', 'irRx_Main_OBJECT.enableIRIn();', false);

  /// jwc ?: var prompt_ForSerialMonitor_STRING = Blockly.Arduino.valueToCode(block, 'PROMPT_TEXT_FIELD_ID',
/// jwc override:   var prompt_ForSerialMonitor_STRING = Blockly.Arduino.valueToCode(block, 'PROMPT_TEXT_FIELD_ID',
/// jwc override:       Blockly.Arduino.ORDER_NONE) || '""';
  var prompt_ForSerialMonitor_STRING = '""';
  /// jwc good:   var code = funcName + '(' + prompt_ForSerialMonitor_STRING + ')';
  /// jwc ok but not great since an input-block and not a complete statement: var code = '// * 2016-0711-1100 For \'commsInfrared_Rx_BLOCK\' \n' + 
  /// jwc ok but not great since an input-block and not a complete statement:    funcName + '(' + prompt_ForSerialMonitor_STRING + ')';
  // IMPORTANT: Since a return function, no need to end with ';' since it will be added automatically
  // // var code = funcName + '(' + prompt_ForSerialMonitor_STRING + ')';
  var code = '// For:: ' + Blockly.Msg.ARD_INFRARED_READ_BLOCK_NAME + '\n' +
             funcName + '(' + prompt_ForSerialMonitor_STRING + ')';

  // Output Requested Value
  // Use 'ORDER_UNARY_POSTFIX' since 'spi_transfer_return' does
  return [code, Blockly.Arduino.ORDER_UNARY_POSTFIX];
};