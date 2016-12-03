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
        // // .appendField(Blockly.Msg.ARD_LCD_SETUP_BLOCK_NAME);
        .appendField("Comms: LCD Setup");
        .appendField(
            new Blockly.FieldDropdown(
                Blockly.Arduino.Boards.selected.lcd), 'LCD_FIELD_ID');

    this.appendValueInput('I2C_CONTROLLER_DEC_ADDRESS_FIELD_ID')
        .setCheck(Blockly.Types.NUMBER.checkList)
        // // .appendField(Blockly.Msg.ARD_LCD_SETUP_I2C_CONTROLLER_DEC_ADDRESS);
        .appendField("   * I2C Controller Address [0-127 Dec (39 Default)]");

    this.appendDummyInput()
        // // .appendField(Blockly.Msg.ARD_LCD_SETUP_COLUMNS_MAX)
        .appendField("   * Columns Max:")
        .appendField(new Blockly.FieldDropdown(
                // // [[Blockly.Msg.ARD_LCD_SETUP_COLUMNS_16, '16'],
                 // // [Blockly.Msg.ARD_LCD_SETUP_COLUMNS_20, '20']]),
                [["16", '16'],
                 ["20", '20']]),
                'COLUMNS_MAX_FIELD_ID');
            
    this.appendDummyInput()
        // // .appendField(Blockly.Msg.ARD_LCD_SETUP_ROWS_MAX)
        .appendField("   * Rows Max:")
        .appendField(new Blockly.FieldDropdown(
                // // [[Blockly.Msg.ARD_LCD_SETUP_ROWS_2, '2'],
                 // // [Blockly.Msg.ARD_LCD_SETUP_ROWS_4, '4']]),
                [["2", '2'],
                 ["4", '4']]),
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
        .appendField(new Blockly.FieldDropdown(
                Blockly.Arduino.Boards.selected.lcd), 'LCD_ID')
        // // .appendField(Blockly.Msg.ARD_LCD_PRINT);
        .appendField('print');
    this.appendValueInput('CONTENT')
        .setCheck(Blockly.Types.TEXT.checkList);
    this.appendDummyInput()
        .appendField(new Blockly.FieldCheckbox('TRUE'), 'NEW_LINE')
        // // .appendField(Blockly.Msg.ARD_LCD_PRINT_NEWLINE);
        .appendField('add new line');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    // // this.setTooltip(Blockly.Msg.ARD_LCD_PRINT_TIP);
    this.setTooltip('Prints data to the console/lcd port as human-readable ASCII text.');
  //// orig: ,
  }

  // TODO: COMMENT OUT UNTIL FURTHER NOTICE
  //
  // /**
   // * Called whenever anything on the workspace changes.
   // * It checks the instances of lcd and attaches a warning to this
   // * block if not valid data is found.
   // * @this Blockly.Block
   // */
  // onchange: function() {
    // if (!this.workspace) { return; }  // Block has been deleted.

    // // Get the Lcd instance from this block
    // var thisInstanceName = this.getFieldValue('LCD_ID');

    // // Iterate through top level blocks to find setup instance for the lcd id
    // var blocks = Blockly.mainWorkspace.getTopBlocks();
    // var setupInstancePresent = false;
    // for (var x = 0; x < blocks.length; x++) {
      // var func = blocks[x].getLcdSetupInstance;
      // if (func) {
        // var setupBlockInstanceName = func.call(blocks[x]);
        // if (thisInstanceName == setupBlockInstanceName) {
          // setupInstancePresent = true;
        // }
      // }
    // }

    // if (!setupInstancePresent) {
      // this.setWarningText(Blockly.Msg.ARD_LCD_PRINT_WARN.replace('%1', 
			    // thisInstanceName), 'lcd_setup');
    // } else {
      // this.setWarningText(null, 'lcd_setup');
    // }
  // },
  // /**
   // * Updates the content of the the lcd related fields.
   // * @this Blockly.Block
   // */
  // updateFields: function() {
    // Blockly.Arduino.Boards.refreshBlockFieldDropdown(
        // this, 'LCD_ID', 'lcd');
  // }
  
  
};
