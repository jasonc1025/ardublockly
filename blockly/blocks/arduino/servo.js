/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Arduino blocks for the Servo library.
 *     The Arduino Servo functions can be found in
 *     http://arduino.cc/en/reference/servo
 *
 * TODO: Add angle selector instead of block input.
 */
'use strict';

goog.provide('Blockly.Blocks.servo');

goog.require('Blockly.Blocks');
goog.require('Blockly.Types');


/** Common HSV hue for all blocks in this category. */
Blockly.Blocks.servo.HUE = 60;

Blockly.Blocks['servo_write'] = {
  /**
   * Block for writing an angle value into a servo pin.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('http://arduino.cc/en/Reference/ServoWrite');
    this.setColour(Blockly.Blocks.servo.HUE);
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_SERVO_WRITE)
        .appendField(new Blockly.FieldDropdown(
            Blockly.Arduino.Boards.selected.pwmPins), 'SERVO_PIN');
    this.setInputsInline(false);
    this.appendValueInput('SERVO_ANGLE')
        .setCheck(Blockly.Types.NUMBER.checkList)
        .appendField(Blockly.Msg.ARD_SERVO_WRITE_TO);
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_SERVO_WRITE_DEG_180);
/// jwc 2016-0608-0850    this.setInputsInline(true);
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.ARD_SERVO_WRITE_TIP);
  },
  /**
   * Updates the content of the the pin related fields.
   * @this Blockly.Block
   */
  updateFields: function() {
    Blockly.Arduino.Boards.refreshBlockFieldDropdown(
        this, 'SERVO_PIN', 'pwmPins');
  }
};

Blockly.Blocks['servo_write_jwc'] = {
  /**
   * Block for writing an angle value into a servo PWM pin.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('http://arduino.cc/en/Reference/ServoWrite');
    this.setColour(Blockly.Blocks.servo.HUE);
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_SERVO_WRITE)
        .appendField(new Blockly.FieldDropdown(
/// 2016-0704-1840 jwc:             Blockly.Arduino.Boards.selected.pwmPins), 'SERVO_PIN');
            Blockly.Arduino.Boards.selected.digitalPins), 'SERVO_PIN');
    this.setInputsInline(false);
    this.appendValueInput('SERVO_ANGLE')
        .setCheck(Blockly.Types.NUMBER.checkList)
        .appendField(Blockly.Msg.ARD_SERVO_WRITE_TO);
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_SERVO_WRITE_DEG_180);
    // jwc 2016-0608: this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip(Blockly.Msg.ARD_SERVO_WRITE_TIP);
  },
  /**
   * Updates the content of the the pin related fields.
   * @this Blockly.Block
   */
  updateFields: function() {
/// 2016-0704-1840 jwc    Blockly.Arduino.Boards.refreshBlockFieldDropdown(
/// 2016-0704-1840 jwc        this, 'SERVO_PIN', 'pwmPins');
    Blockly.Arduino.Boards.refreshBlockFieldDropdown(
        this, 'SERVO_PIN', 'digitalPins');
  }
};

Blockly.Blocks['servo_read'] = {
  /**
   * Block for reading an angle value of a servo pin.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('http://arduino.cc/en/Reference/ServoRead');
    this.setColour(Blockly.Blocks.servo.HUE);
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_SERVO_READ)
        .appendField(new Blockly.FieldDropdown(
            Blockly.Arduino.Boards.selected.digitalPins), 'SERVO_PIN');
    this.setOutput(true, Blockly.Types.NUMBER.output);
    this.setTooltip(Blockly.Msg.ARD_SERVO_READ_TIP);
  },
  /** @return {string} The type of return value for the block, an integer. */
  getBlockType: function() {
    return Blockly.Types.NUMBER;
  },
  /**
   * Updates the content of the the pin related fields.
   * @this Blockly.Block
   */
  updateFields: function() {
    Blockly.Arduino.Boards.refreshBlockFieldDropdown(
        this, 'SERVO_PIN', 'digitalPins');
  }
};


/// jwc 2016-0703-1800
/// jwc good: Blockly.Blocks['text_prompt_ext_IrTxRx_Jwc'] = {
/// 2016-0709-1234 jwc desktop good but not browser:Blockly.Blocks['infraredComms_Rx'] = {
/// jwc browser:bad, desktop:good::Blockly.Blocks['text_prompt_ext_infraredComms_Rx'] = {
/// jwc browser:bad, desktop:bad~Blockly.Blocks['text_prompt_ext_infraredComms'] = {
/// jwc good both browser & windows: Blockly.Blocks['infrared_Comms_Rx'] = {
/// jwc good both browser & windows: Blockly.Blocks['infrared12345_Comms_Rx'] = {
/// jwc good both: Blockly.Blocks['commsInfrared_Rx'] = {
/// jwc good both: Blockly.Blocks['infraredComms_Rx'] = {
/// jwc no: Blockly.Blocks['commsInfrared_Rx_BLOCK'] = {
Blockly.Blocks['commsInfrared_Rx_BLOCK'] = {
  /**
   * Block for prompt function (external message).
   * @this Blockly.Block
   */
  init: function() {
    // Assign 'this' to a variable for use in the closures below.
    var thisBlock = this;

    this.setInputsInline(false);
    this.setHelpUrl(Blockly.Msg.ARD_INFRARED_READ_HELPURL);
    this.setColour(Blockly.Blocks.texts.HUE);
    
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_INFRARED_READ_BLOCK_NAME);
    
    this.appendDummyInput()
/// jwc good:         .appendField(Blockly.Msg.ARD_SERVO_WRITE)
/// jwc ?:         .appendField(Blockly.Msg.ARD_INFRARED_READ)
/// jwc good:         .appendField(Blockly.Msg.ARD_DIGITALREAD)
/// jwc good:         .appendField('Read Infrared_Rx from Pin#')
        .appendField(Blockly.Msg.ARD_INFRARED_READ_FROM_PIN)
        .appendField(new Blockly.FieldDropdown(
/// 2016-0704-1840 jwc:             Blockly.Arduino.Boards.selected.pwmPins), 'SERVO_PIN');
            Blockly.Arduino.Boards.selected.digitalPins), 'SERVO_PIN_FIELD_ID');

    // Engine intelligently detects differences in text strings and utilizes such differences to form dropdown options        
    var TYPES =
/// jwc good:         [[Blockly.Msg.TEXT_PROMPT_TYPE_TEXT, Blockly.Types.TEXT.output],
/// jwc good:          [Blockly.Msg.TEXT_PROMPT_TYPE_NUMBER, Blockly.Types.NUMBER.output]];
/// jwc ?:         [[Blockly.Msg.ARD_INFRARED_SERIAL_MONITOR_TAG_FOR_NUMBER, Blockly.Types.NUMBER.output],
/// jwc ?:          [Blockly.Msg.ARD_INFRARED_SERIAL_MONITOR_TAG_FOR_TEXT, Blockly.Types.TEXT.output]];
/// jwc ?:         [[Blockly.Msg.TEXT_PROMPT_TYPE_NUMBER_2, Blockly.Types.NUMBER.output],
/// jwc ?:          [Blockly.Msg.TEXT_PROMPT_TYPE_TEXT_2, Blockly.Types.TEXT.output]];
/// jwc yes:         [[Blockly.Msg.TEXT_PROMPT_TYPE_NUMBER_2, Blockly.Types.NUMBER.output],
/// jwc yes:         [[Blockly.Msg.TEXT_PROMPT_TYPE_NUMBER, Blockly.Types.NUMBER.output],
/// jwc yes:          [Blockly.Msg.TEXT_PROMPT_TYPE_TEXT, Blockly.Types.TEXT.output]];
/// jwc yes:         [[Blockly.Msg.TEXT_PROMPT_TYPE_NUMBER_2, Blockly.Types.NUMBER.output],
/// jwc yes:          [Blockly.Msg.TEXT_PROMPT_TYPE_TEXT_2, Blockly.Types.TEXT.output]];
        [[Blockly.Msg.ARD_INFRARED_READ_AS_LARGE_NUMBER_AS_LONG, Blockly.Types.NUMBER.output],
         [Blockly.Msg.ARD_INFRARED_READ_AS_TEXT_AS_STRING, Blockly.Types.TEXT.output]];
    var dropdown = new Blockly.FieldDropdown(TYPES, function(newOp) {
      thisBlock.updateType_(newOp);
    });

    /// jwc good: this.appendValueInput('TEXT')
    /// jwc good:     .appendField(dropdown, 'OUTPUT_TYPE_FIELD_ID');
    /// jwc good: this.appendDummyInput()
    this.appendDummyInput()
		/// jwc good yet redundant, 'Blockly.FieldDropdown' will parse pre/post redundant text to be static-text: .appendField('as a')
        .appendField(dropdown, 'OUTPUT_TYPE_FIELD_ID');
	    /// jwc good yet redundant, 'Blockly.FieldDropdown' will parse pre/post redundant text to be static-text: .appendField('with outputPromptText as');

    /// jwc good: this.appendDummyInput()
    /// jwc good:   .appendField(Blockly.Msg.ARD_INFRARED_READ_WITH_DEBUG_PROMPT_01)
    /// jwc good:   .appendField(new Blockly.FieldCheckbox('FALSE'), 'DEBUG_ON_FIELD_ID')
    /// jwc good:   .appendField(Blockly.Msg.ARD_INFRARED_READ_WITH_DEBUG_PROMPT_01A);

    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_INFRARED_READ_WITH_DEBUG_PROMPT_01)
        .appendField(new Blockly.FieldDropdown(
                [[Blockly.Msg.ARD_INFRARED_READ_DEBUG_OFF, 'DEBUG_OFF'],
                 [Blockly.Msg.ARD_INFRARED_READ_DEBUG_ON, 'DEBUG_ON']]),
                'DEBUG_ON_FIELD_ID');
            
    this.appendDummyInput()
      .appendField(Blockly.Msg.ARD_INFRARED_READ_WITH_DEBUG_PROMPT_02);  
    this.appendValueInput('PROMPT_TEXT_FIELD_ID')
      .appendField(Blockly.Msg.ARD_INFRARED_READ_WITH_DEBUG_PROMPT_03);
    this.appendDummyInput()
      .appendField(Blockly.Msg.ARD_INFRARED_READ_WITH_DEBUG_PROMPT_04);  

    this.setOutput(true, Blockly.Types.TEXT.output);
    this.setTooltip(function() {
      return (thisBlock.getFieldValue('OUTPUT_TYPE_FIELD_ID') == Blockly.Types.TEXT.output) ?
        Blockly.Msg.ARD_INFRARED_READ_TIP_AS_TEXT_AS_STRING :
        Blockly.Msg.ARD_INFRARED_READ_TIP_AS_LARGE_NUMBER_AS_LONG;
    });
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
  
  /// 2016-0710-1700 jwc >>
  /**
   * Updates the content of the the 'Boards' related fields.
   * @this Blockly.Block
   */
  updateFields: function() {
/// 2016-0704-1840 jwc    Blockly.Arduino.Boards.refreshBlockFieldDropdown(
/// 2016-0704-1840 jwc        this, 'SERVO_PIN', 'pwmPins');
    Blockly.Arduino.Boards.refreshBlockFieldDropdown(
        this, 'SERVO_PIN_FIELD_ID', 'digitalPins');
  },
  /// jwc <<<
  
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
  /** @return {!string} Type of the block, prompt always returns a string. */
  getBlockType: function() {
    return (this.getFieldValue('OUTPUT_TYPE_FIELD_ID') == Blockly.Types.TEXT.output) ?
        Blockly.Types.TEXT : Blockly.Types.NUMBER;
  }
};

