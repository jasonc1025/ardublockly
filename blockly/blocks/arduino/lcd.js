/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Blocks for the Arduino lcd communication functions.
 *     The Arduino built in functions syntax can be found at:
 *     https://www.arduino.cc/en/Reference/LiquidCrystal
 *
 */
 
// Modeled after 'Serial Setup & Print'

'use strict';

goog.provide('Blockly.Blocks.lcd');

goog.require('Blockly.Blocks');
goog.require('Blockly.Types');


/** Common HSV hue for all blocks in this category. */
Blockly.Blocks.lcd.HUE = 160;

Blockly.Blocks['lcd_setup_BLOCK'] = {
  /**
   * Block for setting the lcd connection.
   * @this Blockly.Block
   */
  init: function() {
   // Assign 'this' to a variable for use in the closures below.
   var thisBlock = this;

    this.setInputsInline(false);
    this.setHelpUrl('https://www.arduino.cc/en/Reference/LiquidCrystal');
    this.setColour(Blockly.Blocks.lcd.HUE);
    
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_LCD_SETUP_BLOCK_NAME)
        .appendField(
            new Blockly.FieldDropdown(
                Blockly.Arduino.Boards.selected.lcd), 'LCD_FIELD_ID');

    this.appendValueInput('I2C_CONTROLLER_DEC_ADDRESS_FIELD_ID')
        .setCheck(Blockly.Types.NUMBER.checkList)
        .appendField(Blockly.Msg.ARD_LCD_SETUP_I2C_CONTROLLER_DEC_ADDRESS);

    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_LCD_SETUP_COLUMNS_MAX)
        .appendField(new Blockly.FieldDropdown(
            [[Blockly.Msg.ARD_LCD_SETUP_COLUMNS_16, '16'],
            [Blockly.Msg.ARD_LCD_SETUP_COLUMNS_20, '20']]),
                'COLUMNS_MAX_FIELD_ID');
            
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_LCD_SETUP_ROWS_MAX)
        .appendField(new Blockly.FieldDropdown(
            [[Blockly.Msg.ARD_LCD_SETUP_ROWS_2, '2'],
            [Blockly.Msg.ARD_LCD_SETUP_ROWS_4, '4']]),
                'ROWS_MAX_FIELD_ID');
   
    // * jwc added to allow to fit within "Function: Run First, Loop Forever" Block
    //
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    
    this.setTooltip('Setup for a LCD peripheral');
  },
  /**
   * Returns the lcd instance name.
   * @return {!string} Lcd instance name.
   * @this Blockly.Block
   */
  getLcdSetupInstance: function() {
    return this.getFieldValue('LCD_ID');
  },
  /**
   * Updates the content of the the 'Boards' related fields.
   * @this Blockly.Block
   */
  updateFields: function() {
  }
};

Blockly.Blocks['lcd_print_BLOCK'] = {
  /**
   * Block for creating a write to lcd com function.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('https://www.arduino.cc/en/Reference/LiquidCrystal');
    this.setColour(Blockly.Blocks.lcd.HUE);
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_LCD_PRINT)
        .appendField(new Blockly.FieldDropdown(Blockly.Arduino.Boards.selected.lcd), 'LCD_ID');
    this.appendValueInput('PRINT_FOR_STRING_AND_CHAR_FIELD_ID')
        .appendField(Blockly.Msg.ARD_LCD_PRINT_PROMPT)
        .setCheck(Blockly.Types.TEXT.checkList);

    this.appendValueInput('COLUMN_NUM_BASE0_FIELD_ID')
        .setCheck(Blockly.Types.NUMBER.checkList)
        .appendField(Blockly.Msg.ARD_LCD_PRINT_COLUMN_NUM_BASE0);
    this.appendValueInput('ROW_NUM_BASE0_FIELD_ID')
        .setCheck(Blockly.Types.NUMBER.checkList)
        .appendField(Blockly.Msg.ARD_LCD_PRINT_ROW_NUM_BASE0);
    this.appendValueInput('ERASE_PREP_W_NUM_OF_BLANKS_BASE1_FIELD_ID')
        .setCheck(Blockly.Types.NUMBER.checkList)
        .appendField(Blockly.Msg.ARD_LCD_PRINT_ERASE_PREP_W_NUM_OF_BLANKS_BASE1);
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_LCD_PRINT_TIP_CONVERSION_TO_TEXT_OR_CHARACTER);
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.ARD_LCD_PRINT_TIP);
  }
  
};
