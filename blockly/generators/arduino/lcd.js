/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Code generator for the Arduino lcd blocks.
 *     Arduino Lcd library docs: https://www.arduino.cc/en/Reference/LiquidCrystal
 *
 */
 
// Modeled after 'Serial Setup & Print'

'use strict';

goog.provide('Blockly.Arduino.lcd');

goog.require('Blockly.Arduino');

/**
 * Code generator for block for setting the lcd com speed.
 * Arduino code: setup{ Lcd.begin(X); }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code.
 */
Blockly.Arduino['lcd_setup_BLOCK'] = function(block) {
  var lcdId = block.getFieldValue('LCD_FIELD_ID');  
  
  // Convert from number to text
  var i2cControllerDecAddress = Blockly.Arduino.valueToCode(
      block, 'I2C_CONTROLLER_DEC_ADDRESS_FIELD_ID', Blockly.Arduino.ORDER_ATOMIC) || '39';


  var columnsMax = block.getFieldValue('COLUMNS_MAX_FIELD_ID');
  var rowsMax = block.getFieldValue('ROWS_MAX_FIELD_ID');
    
  // * Include is universal for any application of LCD. 
  // *
  Blockly.Arduino.addInclude('lcd_TAG_00', '// * For:: ' + Blockly.Msg.ARD_LCD_SETUP_BLOCK_NAME + ': 2016-1119-1700');
  Blockly.Arduino.addInclude('lcd_TAG_01', '#include <Wire.h>');
  Blockly.Arduino.addInclude('lcd_TAG_02', '#include <LiquidCrystal_I2C.h>');

  Blockly.Arduino.addDeclaration('lcd_TAG_00', '// * For:: ' + Blockly.Msg.ARD_LCD_SETUP_BLOCK_NAME);
  Blockly.Arduino.addDeclaration('lcd_TAG_01', 'LiquidCrystal_I2C myLcd(' + i2cControllerDecAddress + ',' + columnsMax + ',' + rowsMax + ');');
  Blockly.Arduino.addDeclaration('lcd_TAG_02', 'String    myLcd_OneRow_StringObject;');
  Blockly.Arduino.addDeclaration('lcd_TAG_03', 'const int myLcd_OneRow_Columns_MAX = ' + columnsMax + ';');

  // Allow overwrite by setting last arguement as 'true'
  Blockly.Arduino.addSetup('lcd_TAG_00', '// * For:: ' + Blockly.Msg.ARD_LCD_SETUP_BLOCK_NAME, true);
  Blockly.Arduino.addSetup('lcd_TAG_01', 'myLcd.init();', true);
  Blockly.Arduino.addSetup('lcd_TAG_02', 'myLcd.backlight();', true);
  Blockly.Arduino.addSetup('lcd_TAG_03', 'myLcd.clear();', true);
  Blockly.Arduino.addSetup('lcd_TAG_04', 'myLcd.setCursor(0,0);', true);
  Blockly.Arduino.addSetup('lcd_TAG_05', 'myLcd.print("TACHnology Bot");', true);

  // Add the code
  var code = [];
  code.push('myLcd.setCursor(0,1);');
  code.push('myLcd.print("Robotics");');
  // Join inbetween lines with '\n' and also end with '\n'
  return code.join('\n') + '\n';

};


/**
 * Code generator of block for writing to the lcd com.
 * Arduino code: loop { Lcd.print(X); }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.Arduino['lcd_print_BLOCK'] = function(block) {
  var lcdId = block.getFieldValue('LCD_ID');
  var printForStringAndChar_FieldId = Blockly.Arduino.valueToCode(
      block, 'PRINT_FOR_STRING_AND_CHAR_FIELD_ID', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var columnNum_Base0_FieldId = Blockly.Arduino.valueToCode(block, 'COLUMN_NUM_BASE0_FIELD_ID',
      Blockly.Arduino.ORDER_ATOMIC) || '0';
  var rowNum_Base0_FieldId = Blockly.Arduino.valueToCode(block, 'ROW_NUM_BASE0_FIELD_ID',
      Blockly.Arduino.ORDER_ATOMIC) || '0';
  var erasePrepWNumOfBlanks_Base1_FieldId = Blockly.Arduino.valueToCode(block, 'ERASE_PREP_W_NUM_OF_BLANKS_BASE1_FIELD_ID',
      Blockly.Arduino.ORDER_ATOMIC) || '0';

      
      
  var lcdPins = Blockly.Arduino.Boards.selected.lcdPins[lcdId];
  for (var i = 0; i < lcdPins.length; i++) {
    Blockly.Arduino.reservePin(block, lcdPins[i][1],
        Blockly.Arduino.PinTypes.LCD, 'LCD ' + lcdPins[i][0]);
  }

  var code = 'myLcd_OneRow_StringObject = ' + printForStringAndChar_FieldId + ';\n' +
             'while( myLcd_OneRow_StringObject.length() < ' + erasePrepWNumOfBlanks_Base1_FieldId + ' ){\n' +
             '  myLcd_OneRow_StringObject.concat(" ");\n' +
             '}\n' +
             'myLcd.setCursor(' + columnNum_Base0_FieldId + ',' + rowNum_Base0_FieldId + ');\n' +
             lcdId + '.print(myLcd_OneRow_StringObject);\n';

  return code;
};
