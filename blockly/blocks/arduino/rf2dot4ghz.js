/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Blocks for the Arduino rf2dot4ghz communication functions.
 *     The Arduino built in functions syntax can be found at:
 *     https://www.arduino.cc/en/Reference/
 *     https://arduino-info.wikispaces.com/nRF24L01-RF24-Examples
 *
 */
 
// Modeled after 'Serial Setup & Print'
// Modeled after 'LCD Setup & Print'

'use strict';

goog.provide('Blockly.Blocks.rf2dot4ghz');

goog.require('Blockly.Blocks');
goog.require('Blockly.Types');


/** Common HSV hue for all blocks in this category. */
Blockly.Blocks.rf2dot4ghz.HUE = 160;

Blockly.Blocks['rf2dot4ghz_setup_BLOCK'] = {
  /**
   * Block for setting the rf2dot4ghz connection.
   * @this Blockly.Block
   */
  init: function() {
   // Assign 'this' to a variable for use in the closures below.
   var thisBlock = this;

    this.setInputsInline(false);
    this.setHelpUrl('https://arduino-info.wikispaces.com/nRF24L01-RF24-Examples');
    this.setColour(Blockly.Blocks.rf2dot4ghz.HUE);
    
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_RF2DOT4GHZ_SETUP_BLOCK_NAME);
        // // .appendField(
            // // new Blockly.FieldDropdown(
                // // Blockly.Arduino.Boards.selected.lcd), 'RF2DOT4GHZ_FIELD_ID');

    this.appendValueInput('RF2DOT4GHZ_CHANNEL_AS_DEC_FIELD_ID')
        .setCheck(Blockly.Types.NUMBER.checkList)
        .appendField(Blockly.Msg.ARD_RF2DOT4GHZ_SETUP_CHANNEL_AS_DEC);

    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_RF2DOT4GHZ_SETUP_NETWORK_NODE_TYPE)
        .appendField(new Blockly.FieldDropdown(
            [[Blockly.Msg.ARD_RF2DOT4GHZ_SETUP_NETWORK_NODE_SERVER_BOT, 'Node_Server_Bot'],
            [Blockly.Msg.ARD_RF2DOT4GHZ_SETUP_NETWORK_NODE_CLIENT_UI_JOYSTICK, 'Node_Client_UI_Joystick']]),
                'NETWORK_NODE_TYPE_FIELD_ID');
   
    // * jwc added to allow to fit within "Function: Run First, Loop Forever" Block
    //
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    
    this.setTooltip('Setup for a RF2DOT4GHZ peripheral');
  },
  // // /**
   // // * Returns the rf2dot4ghz instance name.
   // // * @return {!string} Lcd instance name.
   // // * @this Blockly.Block
   // // */
  // // getLcdSetupInstance: function() {
    // // return this.getFieldValue('RF2DOT4GHZ_ID');
  // // },
  /**
   * Updates the content of the the 'Boards' related fields.
   * @this Blockly.Block
   */
  updateFields: function() {
  }
};

  
};
