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
            [
            [Blockly.Msg.ARD_RF2DOT4GHZ_SETUP_NETWORK_NODE_SERVER_BOT, 'node_Server_Bot'],
            [Blockly.Msg.ARD_RF2DOT4GHZ_SETUP_NETWORK_NODE_CLIENT_UI_JOYSTICK, 'node_Client_UI_Joystick']
            ]),
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



// // // *
// // // * Used 'text_prompt_ext' as template
// // // * Used 'infrared_Rx_BLOCK' as template
// // // *

// // Blockly.Blocks['rf2dot4ghz_rx_BLOCK_OLD'] = {
  // // /**
   // // * Block for prompt function (external message).
   // // * @this Blockly.Block
   // // */
  // // init: function() {
    // // // Assign 'this' to a variable for use in the closures below.
    // // var thisBlock = this;

    // // this.setInputsInline(false);
    // // this.setHelpUrl(Blockly.Msg.ARD_RF2DOT4GHZ_READ_HELPURL);
    // // this.setColour(Blockly.Blocks.texts.HUE);
    
    // // this.appendDummyInput()
        // // .appendField(Blockly.Msg.ARD_RF2DOT4GHZ_READ_BLOCK_NAME);
  

    // // // Engine intelligently detects differences in text strings and utilizes such differences to form dropdown options        
    // // var TYPES =
        // // [
        // // [Blockly.Msg.ARD_RF2DOT4GHZ_READ_AS_INT_0, 'joystick_Int_X'],
        // // [Blockly.Msg.ARD_RF2DOT4GHZ_READ_AS_INT_1, 'joystick_Int_Y'],
        // // [Blockly.Msg.ARD_RF2DOT4GHZ_READ_AS_INT_2, 'button_A_Value'],
        // // [Blockly.Msg.ARD_RF2DOT4GHZ_READ_AS_INT_3, 'button_B_Value'],
        // // [Blockly.Msg.ARD_RF2DOT4GHZ_READ_AS_INT_4, 'button_C_Value'],
        // // [Blockly.Msg.ARD_RF2DOT4GHZ_READ_AS_INT_5, 'button_D_Value'],
        // // ];
    // // var dropdown = new Blockly.FieldDropdown(TYPES, function(newOp) {
      // // thisBlock.updateType_(newOp);
    // // });

    // // this.appendDummyInput()
		// // /// jwc good yet redundant, 'Blockly.FieldDropdown' will parse pre/post redundant text to be static-text: .appendField('as a')
        // // .appendField(dropdown, 'OUTPUT_TYPE_FIELD_ID');
	    // // /// jwc good yet redundant, 'Blockly.FieldDropdown' will parse pre/post redundant text to be static-text: .appendField('with outputPromptText as');

    // // this.appendDummyInput()
        // // .appendField(Blockly.Msg.ARD_RF2DOT4GHZ_READ_WITH_DEBUG_PROMPT_01)
        // // .appendField(new Blockly.FieldDropdown(
            // // [[Blockly.Msg.ARD_RF2DOT4GHZ_READ_DEBUG_OFF, 'DEBUG_OFF'],
            // // [Blockly.Msg.ARD_RF2DOT4GHZ_READ_DEBUG_ON, 'DEBUG_ON']]),
            // // 'DEBUG_ON_FIELD_ID');
            

// // // // TODO
    // // this.appendDummyInput()
        // // .appendField(Blockly.Msg.ARD_RF2DOT4GHZ_READ_WITH_DEBUG_PROMPT_02);  
    // // this.appendValueInput('PROMPT_TEXT_FIELD_ID')
        // // .appendField(Blockly.Msg.ARD_RF2DOT4GHZ_READ_WITH_DEBUG_PROMPT_03);
    // // this.appendDummyInput()
        // // .appendField(Blockly.Msg.ARD_RF2DOT4GHZ_READ_WITH_DEBUG_PROMPT_04);  

    // // // // this.setOutput(true, Blockly.Types.TEXT.output);
    // // // // this.setTooltip(function() {
        // // // // return (thisBlock.getFieldValue('OUTPUT_TYPE_FIELD_ID') == Blockly.Types.TEXT.output) ?
            // // // // Blockly.Msg.ARD_RF2DOT4GHZ_READ_TIP_AS_TEXT_AS_STRING :
            // // // // Blockly.Msg.ARD_RF2DOT4GHZ_READ_TIP_AS_LARGE_NUMBER_AS_LONG;
    // // // // });
    
    // // this.setInputsInline(false);
    // // this.setPreviousStatement(true, null);
    // // this.setNextStatement(true, null);
    // // this.setTooltip(Blockly.Msg.ARD_RF2DOT4GHZ_SETUP_TIP);
    
  // // },
  // // // // /**
   // // // // * Modify this block to have the correct output type.
   // // // // * @param {string} newOp Either 'TEXT' or 'NUMBER'.
   // // // // * @private
   // // // // * @this Blockly.Block
   // // // // */
  // // // // updateType_: function(newOp) {
    // // // // if (newOp == Blockly.Types.NUMBER.output) {
      // // // // this.outputConnection.setCheck(Blockly.Types.NUMBER.checkList);
    // // // // } else {
      // // // // this.outputConnection.setCheck(Blockly.Types.TEXT.checkList);
    // // // // }
  // // // // },
  
  // // /// 2016-0710-1700 jwc >>
  // // /**
   // // * Updates the content of the the 'Boards' related fields.
   // // * @this Blockly.Block
   // // */
  // // updateFields: function() {
    // // // // /// 2016-0704-1840 jwc    Blockly.Arduino.Boards.refreshBlockFieldDropdown(
    // // // // /// 2016-0704-1840 jwc        this, 'SERVO_PIN', 'pwmPins');
    // // // // Blockly.Arduino.Boards.refreshBlockFieldDropdown(
        // // // // this, 'SERVO_PIN_FIELD_ID', 'digitalPins');
  // // },
  // // /// jwc <<<
  
  // // // // /**
   // // // // * Create XML to represent the output type.
   // // // // * @return {!Element} XML storage element.
   // // // // * @this Blockly.Block
   // // // // */
  // // // // mutationToDom: function() {
    // // // // var container = document.createElement('mutation');
    // // // // container.setAttribute('type', this.getFieldValue('OUTPUT_TYPE_FIELD_ID'));
    // // // // return container;
  // // // // },
  // // // // /**
   // // // // * Parse XML to restore the output type.
   // // // // * @param {!Element} xmlElement XML storage element.
   // // // // * @this Blockly.Block
   // // // // */
  // // // // domToMutation: function(xmlElement) {
    // // // // this.updateType_(xmlElement.getAttribute('type'));
  // // // // },
  // // // // /** @return {!string} Type of the block, prompt always returns a string. */
  // // // // getBlockType: function() {
    // // // // return (this.getFieldValue('OUTPUT_TYPE_FIELD_ID') == Blockly.Types.TEXT.output) ?
        // // // // Blockly.Types.TEXT : Blockly.Types.NUMBER;
  // // // // }
// // };

// // Blockly.Blocks['rf2dot4ghz_loop_stage01_rx_values_all_BLOCK'] = {
Blockly.Blocks['rf2dot4ghz_JoystickAsClient_Loop_Msg_02_Rx_n_Store'] = {
  /**
   * Block for setting the lcd connection.
   * @this Blockly.Block
   */
  init: function() {
   // Assign 'this' to a variable for use in the closures below.
   var thisBlock = this;

    this.setInputsInline(false);
    this.setHelpUrl(Blockly.Msg.ARD_RF2DOT4GHZ_READ_HELPURL);
    this.setColour(Blockly.Blocks.rf2dot4ghz.HUE);
    
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_RF2DOT4GHZ_READ_BLOCK_NAME);
   
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_RF2DOT4GHZ_READ_WITH_DEBUG_PROMPT_01)
        .appendField(new Blockly.FieldDropdown(
            [[Blockly.Msg.ARD_RF2DOT4GHZ_READ_DEBUG_OFF, 'DEBUG_OFF'],
            [Blockly.Msg.ARD_RF2DOT4GHZ_READ_DEBUG_ON, 'DEBUG_ON']]),
            'DEBUG_ON_FIELD_ID');

            // * jwc added to allow to fit within "Function: Run First, Loop Forever" Block
    //
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    
    this.setTooltip('Setup for a Rf2Dot4Ghz peripheral');
  },
  /**
   * Updates the content of the the 'Boards' related fields.
   * @this Blockly.Block
   */
  updateFields: function() {
  }
};

// // Blockly.Blocks['rf2dot4ghz_loop_stage02_rx_value_select_BLOCK'] = {
Blockly.Blocks['rf2dot4ghz_JoystickAsClient_Loop_Msg_03_Select_n_Read'] = {
  /**
   * Block for reading an analogue input.
   * @this Blockly.Block
   */
  init: function() {

    var thisBlock = this;

    this.setHelpUrl(Blockly.Msg.ARD_RF2DOT4GHZ_READ_HELPURL);
    this.setColour(Blockly.Blocks.rf2dot4ghz.HUE);

    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_RF2DOT4GHZ_READ_02_BLOCK_NAME);

    // Engine intelligently detects differences in text strings and utilizes such differences to form dropdown options        
    var TYPES =
        [
        [Blockly.Msg.ARD_RF2DOT4GHZ_READ_AS_INT_0, 'joystick_Int_X'],
        [Blockly.Msg.ARD_RF2DOT4GHZ_READ_AS_INT_1, 'joystick_Int_Y'],
        [Blockly.Msg.ARD_RF2DOT4GHZ_READ_AS_INT_2, 'button_A_Value'],
        [Blockly.Msg.ARD_RF2DOT4GHZ_READ_AS_INT_3, 'button_B_Value'],
        [Blockly.Msg.ARD_RF2DOT4GHZ_READ_AS_INT_4, 'button_C_Value'],
        [Blockly.Msg.ARD_RF2DOT4GHZ_READ_AS_INT_5, 'button_D_Value'],
        ];
    var dropdown = new Blockly.FieldDropdown(TYPES, function(newOp) {
      thisBlock.updateType_(newOp);
    });
    this.appendDummyInput()
		/// jwc good yet redundant, 'Blockly.FieldDropdown' will parse pre/post redundant text to be static-text: .appendField('as a')
        .appendField(dropdown, 'OUTPUT_TYPE_FIELD_ID');
	    /// jwc good yet redundant, 'Blockly.FieldDropdown' will parse pre/post redundant text to be static-text: .appendField('with outputPromptText as');

    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_RF2DOT4GHZ_READ_HELP_01); 

    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_RF2DOT4GHZ_READ_HELP_02); 

    this.setOutput(true, Blockly.Types.NUMBER.output);
    this.setTooltip(Blockly.Msg.ARD_RF2DOT4GHZ_SETUP_TIP);
  },
  
  /**
   * Modify this block to have the correct output type.
   * @param {string} newOp Either 'TEXT' or 'NUMBER'.
   * @private
   * @this Blockly.Block
   */
  updateType_: function(newOp) {
    if (newOp == Blockly.Types.NUMBER.output) {
      this.outputConnection.setCheck(Blockly.Types.NUMBER.checkList);
    } else {
      this.outputConnection.setCheck(Blockly.Types.TEXT.checkList);
    }
  },

  /**
   * Updates the content of the the pin related fields.
   * @this Blockly.Block
   */
  updateFields: function() {
  },
  
  
   /**
   * Create XML to represent the output type.
   * @return {!Element} XML storage element.
   * @this Blockly.Block
   */
  mutationToDom: function() {
    var container = document.createElement('mutation');
    container.setAttribute('type', this.getFieldValue('OUTPUT_TYPE_FIELD_ID'));
    return container;
  },
  /**
   * Parse XML to restore the output type.
   * @param {!Element} xmlElement XML storage element.
   * @this Blockly.Block
   */
  domToMutation: function(xmlElement) {
    this.updateType_(xmlElement.getAttribute('type'));
  },
  // // /** @return {!string} Type of the block, prompt always returns a string. */
  // // getBlockType: function() {
    // // // // return (this.getFieldValue('OUTPUT_TYPE_FIELD_ID') == Blockly.Types.TEXT.output) ?
        // // // // Blockly.Types.TEXT : Blockly.Types.NUMBER;
    // // return (this.getFieldValue('OUTPUT_TYPE_FIELD_ID') == Blockly.Types.TEXT.output) ?
        // // Blockly.Types.TEXT : Blockly.Types.NUMBER;
  // // }

  /** @return {!string} The type of return value for the block, an integer. */
  getBlockType: function() {
    return Blockly.Types.NUMBER;
  },
  
};
