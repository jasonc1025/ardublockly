/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Blocks for the Arduino comment communication functions.
 *     The Arduino built in functions syntax can be found at:
 *     https://www.arduino.cc/en/Reference/LiquidCrystal
 *
 */
 
// Modeled after 'Serial Setup & Print'

'use strict';

goog.provide('Blockly.Blocks.comment');

goog.require('Blockly.Blocks');
goog.require('Blockly.Types');


/** Common HSV hue for all blocks in this category. */
// // Blockly.Blocks.comment.HUE = 45;
// // Blockly.Blocks.comment.HUE = 20;
Blockly.Blocks.comment.HUE = 15;

Blockly.Blocks['comment_BLOCK'] = {
  /**
   * Block for creating a write to comment function.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('https://www.arduino.cc/en/Reference/');
    this.setColour(Blockly.Blocks.comment.HUE);
    this.appendValueInput('COMMENT_FIELD_ID')
        .appendField(Blockly.Msg.ARD_COMMENT)
        .setCheck(Blockly.Types.TEXT.checkList);
   
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.ARD_COMMENT_TIP);
  }
  
};
