/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Code generator for the Arduino comment blocks.
 *     Arduino Lcd library docs: https://www.arduino.cc/en/Reference/
 *
 */
 
// Modeled after 'Serial Setup & Print'

'use strict';

goog.provide('Blockly.Arduino.comment');

goog.require('Blockly.Arduino');

/**
 * Code generator of block for writing to the lcd com.
 * Arduino code: loop { Lcd.print(X); }
 * @param {!Blockly.Block} block Block to generate the code from.
 * @return {string} Completed code.
 */
Blockly.Arduino['comment_BLOCK'] = function(block) {
  var comment_FieldId = Blockly.Arduino.valueToCode(
      block, 'COMMENT_FIELD_ID', Blockly.Arduino.ORDER_ATOMIC) || '0';
 
  var code = '// ' + comment_FieldId.substr(1,comment_FieldId.length-2) + '\n';

  return code;
};
