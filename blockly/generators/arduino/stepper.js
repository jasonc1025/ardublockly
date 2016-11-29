/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Arduino code generator for the Stepper library blocks.
 *     The Arduino Stepper library docs: http://arduino.cc/en/Reference/Stepper
 */
'use strict';

goog.provide('Blockly.Arduino.stepper');

goog.require('Blockly.Arduino');


/**
 * Code generator for the stepper generator configuration. Nothing is added
 * to the 'loop()' function. Sets the pins (X and Y), steps per revolution (Z),
 * speed(A) and instance name (B).
 * Arduino code: #include <Stepper.h>
 *               Stepper B(Z, X, Y);
 *               setup() { B.setSpeed(A); }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Empty string as no code goes into 'loop()'.
 */
Blockly.Arduino['stepper_config'] = function(block) {
  var pin1 = block.getFieldValue('STEPPER_PIN1');
  var pin2 = block.getFieldValue('STEPPER_PIN2');
  var pinType = Blockly.Arduino.PinTypes.STEPPER;
  var stepperName = block.getFieldValue('STEPPER_NAME');
  var stepperSteps = Blockly.Arduino.valueToCode(block, 'STEPPER_STEPS',
      Blockly.Arduino.ORDER_ATOMIC) || '360';
  var stepperSpeed = Blockly.Arduino.valueToCode(block, 'STEPPER_SPEED',
      Blockly.Arduino.ORDER_ATOMIC) || '90';
  
  //stepper is a variable containing the used pins
  Blockly.Arduino.addVariable(stepperName,
      'int ' + stepperName + '[2] = {' + pin1 + ', ' + pin2 + '};', true);
  stepperName = 'stepper_' + stepperName

  Blockly.Arduino.reservePin(block, pin1, pinType, 'Stepper');
  Blockly.Arduino.reservePin(block, pin2, pinType, 'Stepper');

  Blockly.Arduino.addInclude('stepper', '#include <Stepper.h>');

  var globalCode = 'Stepper ' + stepperName + '(' + stepperSteps + ', ' +
      pin1 + ', ' + pin2 + ');';
  Blockly.Arduino.addDeclaration(stepperName, globalCode);

  var setupCode = stepperName + '.setSpeed(' + stepperSpeed + ');';
  Blockly.Arduino.addSetup(stepperName, setupCode, true);

  return '';
};


/**
 * Code generator for the stepper generator configuration. Nothing is added
 * to the 'loop()' function. Sets the pins (X and Y), steps per revolution (Z),
 * speed(A) and instance name (B).
 * Arduino code: #include <Stepper.h>
 *               Stepper B(Z, X, Y);
 *               setup() { B.setSpeed(A); }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Empty string as no code goes into 'loop()'.
 */
// // Blockly.Arduino['stepper_config_jwc'] = function(block) {
Blockly.Arduino['lcd_config_jwc'] = function(block) {
  // // var pin1 = block.getFieldValue('STEPPER_PIN1');
  // // var pin2 = block.getFieldValue('STEPPER_PIN2');
  // // var pinType = Blockly.Arduino.PinTypes.STEPPER;
  // // var stepperName = block.getFieldValue('STEPPER_NAME');
  // // var stepperSteps = Blockly.Arduino.valueToCode(block, 'STEPPER_STEPS',
      // // Blockly.Arduino.ORDER_ATOMIC) || '360';
  // // var stepperSpeed = Blockly.Arduino.valueToCode(block, 'STEPPER_SPEED',
      // // Blockly.Arduino.ORDER_ATOMIC) || '90';
  
  // // //stepper is a variable containing the used pins
  // // Blockly.Arduino.addVariable(stepperName,
      // // 'int ' + stepperName + '[2] = {' + pin1 + ', ' + pin2 + '};', true);
  // // stepperName = 'stepper_' + stepperName

  // // Blockly.Arduino.reservePin(block, pin1, pinType, 'Stepper');
  // // Blockly.Arduino.reservePin(block, pin2, pinType, 'Stepper');

  // // Blockly.Arduino.addInclude('stepper', '#include <Stepper.h>');

  // // var globalCode = 'Stepper ' + stepperName + '(' + stepperSteps + ', ' +
      // // pin1 + ', ' + pin2 + ');';
  // // Blockly.Arduino.addDeclaration(stepperName, globalCode);

  // // var setupCode = stepperName + '.setSpeed(' + stepperSpeed + ');';
  // // Blockly.Arduino.addSetup(stepperName, setupCode, true);

  // // return '';
  
  
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
 * Code generator for moving the stepper instance (X) a number of steps (Y).
 * Library info in the setHelpUrl link.
 * This block requires the stepper_config block to be present.
 * Arduino code: loop { X.steps(Y) }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code with order of operation.
 */
Blockly.Arduino['stepper_step'] = function(block) {
  var stepperInstanceName = 'stepper_' + block.getFieldValue('STEPPER_NAME');
  var stepperSteps = Blockly.Arduino.valueToCode(block, 'STEPPER_STEPS',
      Blockly.Arduino.ORDER_ATOMIC) || '0';
  var code = stepperInstanceName + '.step(' + stepperSteps + ');\n';
  return code;
};


/**
 * Code generator for moving the stepper instance (X) a number of steps (Y).
 * Library info in the setHelpUrl link.
 * This block requires the stepper_config block to be present.
 * Arduino code: loop { X.steps(Y) }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {array} Completed code with order of operation.
 */
// // Blockly.Arduino['stepper_step_jwc'] = function(block) {
Blockly.Arduino['lcd_write_jwc'] = function(block) {
  // // var stepperInstanceName = 'stepper_' + block.getFieldValue('STEPPER_NAME');
  var stepperInstanceName = 'lcd_' + block.getFieldValue('STEPPER_NAME');
  var stepperSteps = Blockly.Arduino.valueToCode(block, 'STEPPER_STEPS',
      Blockly.Arduino.ORDER_ATOMIC) || '0';
  var code = stepperInstanceName + '.step(' + stepperSteps + ');\n';
  return code;
};
