/**
 * @license
 * Visual Blocks Editor
 *
 * Copyright 2012 Google Inc.
 * https://developers.google.com/blockly/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Text blocks for Blockly.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.Blocks.infrared');

goog.require('Blockly.Blocks');
goog.require('Blockly.Types');

// * Advance Educational Version
//

// *
// * Used 'text_prompt_ext' as template
// *

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
//// jwc Blockly.Msg not work:        [[Blockly.Msg.ARD_INFRARED_READ_AS_LARGE_NUMBER_AS_LONG, Blockly.Types.NUMBER.output],
        [["Read 'commsInfrared_Rx' for KeyCode as Type: Large-Number-as-LONG", Blockly.Types.NUMBER.output],
//// jwc Blockly.Msg not work:        [Blockly.Msg.ARD_INFRARED_READ_AS_TEXT_AS_STRING, Blockly.Types.TEXT.output]];
         ["Read 'commsInfrared_Rx' for KeyCode as Type: Text-as-STRING", Blockly.Types.TEXT.output]];
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
//// jwc Blockly.Msg not work:                [[Blockly.Msg.ARD_INFRARED_READ_DEBUG_OFF, 'DEBUG_OFF'],
//// jwc Blockly.Msg not work:                 [Blockly.Msg.ARD_INFRARED_READ_DEBUG_ON, 'DEBUG_ON']]),
                [["DEBUG_OFF", 'DEBUG_OFF'],
                 ["DEBUG_ON", 'DEBUG_ON']]),
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
//// jwc Blockly.Msg not work:        Blockly.Msg.ARD_INFRARED_READ_TIP_AS_TEXT_AS_STRING :
//// jwc Blockly.Msg not work:        Blockly.Msg.ARD_INFRARED_READ_TIP_AS_LARGE_NUMBER_AS_LONG;
        "Read 'commsInfrared_Rx' for KeyCode as Type: Text-as-STRING" :
        "Read 'commsInfrared_Rx' for KeyCode as Type: Large-Number-as-LONG";
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

// * Basic Non-Educational Version
//
Blockly.Blocks['commsInfrared_Rx_BLOCK_BASIC'] = {
  /**
   * Block for prompt function (external message).
   * @this Blockly.Block
   */
  init: function() {
    var thisBlock = this;

    this.setInputsInline(false);
    this.setHelpUrl(Blockly.Msg.ARD_INFRARED_READ_HELPURL);
    this.setColour(Blockly.Blocks.texts.HUE);
    // Assign 'this' to a variable for use in the closures below.
    
/// jwc override:    this.appendDummyInput()
/// jwc override:        .appendField(Blockly.Msg.ARD_INFRARED_READ_BLOCK_NAME);
    
    this.appendDummyInput()
/// jwc good:         .appendField(Blockly.Msg.ARD_SERVO_WRITE)
/// jwc ?:         .appendField(Blockly.Msg.ARD_INFRARED_READ)
/// jwc good:         .appendField(Blockly.Msg.ARD_DIGITALREAD)
/// jwc good:         .appendField('Read Infrared_Rx from Pin#')
        .appendField(Blockly.Msg.ARD_INFRARED_READ_FROM_PIN_BASIC)
        .appendField(new Blockly.FieldDropdown(
/// 2016-0704-1840 jwc:             Blockly.Arduino.Boards.selected.pwmPins), 'SERVO_PIN');
            Blockly.Arduino.Boards.selected.digitalPins), 'SERVO_PIN_FIELD_ID');

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
        [[Blockly.Msg.ARD_INFRARED_READ_AS_LARGE_NUMBER_AS_LONG_BASIC, Blockly.Types.NUMBER.output],
         [Blockly.Msg.ARD_INFRARED_READ_AS_TEXT_AS_STRING_BASIC, Blockly.Types.TEXT.output]];
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
        .appendField(Blockly.Msg.ARD_INFRARED_READ_WITH_DEBUG_PROMPT_01_BASIC);
/// jwc override:         .appendField(new Blockly.FieldDropdown(
/// jwc override:                 [[Blockly.Msg.ARD_INFRARED_READ_DEBUG_OFF, 'DEBUG_OFF'],
/// jwc override:                  [Blockly.Msg.ARD_INFRARED_READ_DEBUG_ON, 'DEBUG_ON']]),
/// jwc override:                 'DEBUG_ON_FIELD_ID');
            
/// jwc override:     this.appendDummyInput()
/// jwc override:       .appendField(Blockly.Msg.ARD_INFRARED_READ_WITH_DEBUG_PROMPT_02);  
/// jwc override:     this.appendValueInput('PROMPT_TEXT_FIELD_ID')
/// jwc override:       .appendField(Blockly.Msg.ARD_INFRARED_READ_WITH_DEBUG_PROMPT_03);
/// jwc override:     this.appendDummyInput()
/// jwc override:       .appendField(Blockly.Msg.ARD_INFRARED_READ_WITH_DEBUG_PROMPT_04);  

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
   * Updates the content of the the pin related fields.
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