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
  Blockly.Arduino.addDeclaration('lcd_TAG_01', 'LiquidCrystal_I2C lcd(' + i2cControllerDecAddress + ',' + columnsMax + ',' + rowsMax + ');');
  Blockly.Arduino.addDeclaration('lcd_TAG_02', 'String    lcd_OneRow_StringObject;');
  Blockly.Arduino.addDeclaration('lcd_TAG_03', 'const int lcd_OneRow_Columns_MAX = ' + columnsMax + ';');

  // Allow overwrite by setting last arguement as 'true'
  Blockly.Arduino.addSetup('lcd_TAG_00', '// * For:: ' + Blockly.Msg.ARD_LCD_SETUP_BLOCK_NAME, true);
  Blockly.Arduino.addSetup('lcd_TAG_01', 'lcd.init();', true);
  Blockly.Arduino.addSetup('lcd_TAG_02', 'lcd.backlight();', true);
  Blockly.Arduino.addSetup('lcd_TAG_03', 'lcd.clear();', true);
  Blockly.Arduino.addSetup('lcd_TAG_04', 'lcd.setCursor(0,0);', true);
  Blockly.Arduino.addSetup('lcd_TAG_05', 'lcd.print("TACHnology Bot");', true);

  // Add the code
  var code = [];
  code.push('lcd.setCursor(1,0);');
  code.push('lcd.print("Robotics");');

  //// orig: return code.join('\n') + '\n';
  return code.join('\n');
  
};


/**
 * Code generator of block for writing to the lcd com.
 * Arduino code: loop { Lcd.print(X); }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.Arduino['lcd_print_BLOCK'] = function(block) {
  var lcdId = block.getFieldValue('LCD_ID');
  var content = Blockly.Arduino.valueToCode(
      block, 'CONTENT', Blockly.Arduino.ORDER_ATOMIC) || '0';
  var checkbox_name = (block.getFieldValue('NEW_LINE') == 'TRUE');

  var lcdPins = Blockly.Arduino.Boards.selected.lcdPins[lcdId];
  for (var i = 0; i < lcdPins.length; i++) {
    Blockly.Arduino.reservePin(block, lcdPins[i][1],
        Blockly.Arduino.PinTypes.LCD, 'LCD ' + lcdPins[i][0]);
  }

  if (checkbox_name) {
    var code = lcdId + '.println(' + content + ');\n';
  } else {
    var code = lcdId + '.print(' + content + ');\n';
  }
  return code;
};
