/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Blocks for Arduino Stepper library.
 *     The Arduino Servo functions syntax can be found in the following URL:
 *     http://arduino.cc/en/Reference/Stepper
 *     Note that this block uses the Blockly.FieldInstance instead of
 *     Blockly.FieldDropdown which generates a unique instance per setup block
 *     in the workspace.
 */
'use strict';

goog.provide('Blockly.Blocks.stepper');

goog.require('Blockly.Blocks');
goog.require('Blockly.Types');


/** Common HSV hue for all blocks in this category. */
Blockly.Blocks.stepper.HUE = 80;

Blockly.Blocks['stepper_config'] = {
  /**
   * Block for for the stepper generator configuration including creating
   * an object instance and setting up the speed. Info in the setHelpUrl link.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('http://arduino.cc/en/Reference/StepperConstructor');
    this.setColour(Blockly.Blocks.stepper.HUE);
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_STEPPER_SETUP)
        .appendField(
            new Blockly.FieldInstance('Stepper',
                                      Blockly.Msg.ARD_STEPPER_DEFAULT_NAME,
                                      true, true, false),
            'STEPPER_NAME')
        .appendField(Blockly.Msg.ARD_STEPPER_MOTOR);
    this.appendDummyInput()
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg.ARD_STEPPER_PIN1)
        .appendField(new Blockly.FieldDropdown(
            Blockly.Arduino.Boards.selected.digitalPins), 'STEPPER_PIN1')
        .appendField(Blockly.Msg.ARD_STEPPER_PIN2)
        .appendField(new Blockly.FieldDropdown(
            Blockly.Arduino.Boards.selected.digitalPins), 'STEPPER_PIN2');
    this.appendValueInput('STEPPER_STEPS')
        .setCheck(Blockly.Types.NUMBER.checkList)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg.ARD_STEPPER_REVOLVS);
    this.appendValueInput('STEPPER_SPEED')
        .setCheck(Blockly.Types.NUMBER.checkList)
        .setAlign(Blockly.ALIGN_RIGHT)
        .appendField(Blockly.Msg.ARD_STEPPER_SPEED);
    this.setTooltip(Blockly.Msg.ARD_STEPPER_SETUP_TIP);
  },
  /**
   * Updates the content of the the pin related fields.
   * @this Blockly.Block
   */
  updateFields: function() {
    Blockly.Boards.refreshBlockFieldDropdown(
        this, 'STEPPER_PIN1', 'digitalPins');
    Blockly.Boards.refreshBlockFieldDropdown(
        this, 'STEPPER_PIN2', 'digitalPins');
  }
};


// // Blockly.Blocks['stepper_config_jwc'] = {
Blockly.Blocks['lcd_config_jwc'] = {
  // // /**
   // // * Block for for the stepper generator configuration including creating
   // // * an object instance and setting up the speed. Info in the setHelpUrl link.
   // // * @this Blockly.Block
   // // */
  // // init: function() {
    // // this.setHelpUrl('http://arduino.cc/en/Reference/StepperConstructor');
    // // this.setColour(Blockly.Blocks.stepper.HUE);
    // // this.appendDummyInput()
        // // .appendField(Blockly.Msg.ARD_LCD_SETUP)
        // // // /**
        // // // * Class for a specific type of instances' dropdown field.
        // // // * @param {?string} instanceName The default name for the instance. If null,
        // // // *     a unique instance name will be generated.
        // // // * @param {!string} instanceType The type of instances for the dropdown.
        // // // * @param {boolean} uniqueName
        // // // * @param {boolean=} opt_lockNew Indicates a special case in which this
        // // // *     dropdown can only rename the current name and each new block will always
        // // // *     have a unique name.
        // // // * @param {boolean=} opt_lockRename
        // // // * @param {Function=} opt_validator A function that is executed when a new
        // // // *     option is selected.  Its sole argument is the new option value.
        // // // * @extends {Blockly.FieldDropdown}
        // // // * @constructor
        // // // */
        // // // Blockly.FieldInstance = function(
            // // // instanceType, instanceName, uniqueName, opt_lockNew, opt_lockRename,
            // // // opt_editDropdownData, opt_validator) {        
        // // .appendField(
            // // // // new Blockly.FieldInstance('Stepper',
            // // new Blockly.FieldInstance('Lcd',
                                      // // Blockly.Msg.ARD_LCD_DEFAULT_NAME,
                                      // // true, true, false),
            // // 'STEPPER_NAME')
        // // .appendField(Blockly.Msg.ARD_LCD_MOTOR);
    // // this.appendDummyInput()
        // // .setAlign(Blockly.ALIGN_RIGHT)
        // // .appendField(Blockly.Msg.ARD_LCD_PIN1)
        // // .appendField(new Blockly.FieldDropdown(
            // // Blockly.Arduino.Boards.selected.digitalPins), 'STEPPER_PIN1')
        // // .appendField(Blockly.Msg.ARD_LCD_PIN2)
        // // .appendField(new Blockly.FieldDropdown(
            // // Blockly.Arduino.Boards.selected.digitalPins), 'STEPPER_PIN2');
    // // this.appendValueInput('STEPPER_STEPS')
        // // .setCheck(Blockly.Types.NUMBER.checkList)
        // // .setAlign(Blockly.ALIGN_RIGHT)
        // // .appendField(Blockly.Msg.ARD_LCD_REVOLVS);
    // // this.appendValueInput('STEPPER_SPEED')
        // // .setCheck(Blockly.Types.NUMBER.checkList)
        // // .setAlign(Blockly.ALIGN_RIGHT)
        // // .appendField(Blockly.Msg.ARD_LCD_SPEED);
    // // this.setTooltip(Blockly.Msg.ARD_LCD_SETUP_TIP);
  // // },
  // // /**
   // // * Updates the content of the the pin related fields.
   // // * @this Blockly.Block
   // // */
  // // updateFields: function() {
    // // Blockly.Boards.refreshBlockFieldDropdown(
        // // this, 'STEPPER_PIN1', 'digitalPins');
    // // Blockly.Boards.refreshBlockFieldDropdown(
        // // this, 'STEPPER_PIN2', 'digitalPins');
  // // }
  
  
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
        .appendField(Blockly.Msg.ARD_LCD_SETUP_BLOCK_NAME);

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
    
    this.setTooltip(Blockly.Msg.ARD_LCD_SETUP_TIP);
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


Blockly.Blocks['stepper_step'] = {
  /**
   * Block for for the stepper 'step()' function.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('http://arduino.cc/en/Reference/StepperStep');
    this.setColour(Blockly.Blocks.stepper.HUE);
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_STEPPER_STEP)
        .appendField(
            new Blockly.FieldInstance('Stepper',
                                      Blockly.Msg.ARD_STEPPER_DEFAULT_NAME,
                                      false, true, false),
            'STEPPER_NAME');
    this.appendValueInput('STEPPER_STEPS')
        .setCheck(Blockly.Types.NUMBER.checkList);
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_STEPPER_STEPS);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.Msg.ARD_STEPPER_STEP_TIP);
  },
  /**
   * Called whenever anything on the workspace changes.
   * It checks/warns if the selected stepper instance has a config block.
   * @this Blockly.Block
   */
  onchange: function() {
    if (!this.workspace) return;  // Block has been deleted.

    var instanceName = this.getFieldValue('STEPPER_NAME')
    if (Blockly.Instances.isInstancePresent(instanceName, 'Stepper', this)) {
      this.setWarningText(null);
    } else {
      // Set a warning to select a valid stepper config block
      this.setWarningText(
        Blockly.Msg.ARD_COMPONENT_WARN1.replace(
            '%1', Blockly.Msg.ARD_STEPPER_COMPONENT).replace(
                '%2', instanceName));
    }
  }
};


// // Blockly.Blocks['stepper_step_jwc'] = {
Blockly.Blocks['lcd_write_jwc'] = {
  /**
   * Block for for the stepper 'step()' function.
   * @this Blockly.Block
   */
  init: function() {
    this.setHelpUrl('http://arduino.cc/en/Reference/StepperStep');
    this.setColour(Blockly.Blocks.stepper.HUE);
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_LCD_STEP)
        .appendField(
            // // new Blockly.FieldInstance('Stepper',
            new Blockly.FieldInstance('Lcd',
                                      Blockly.Msg.ARD_LCD_DEFAULT_NAME,
                                      false, true, false),
            'STEPPER_NAME');
    this.appendValueInput('STEPPER_STEPS')
        .setCheck(Blockly.Types.NUMBER.checkList);
    this.appendDummyInput()
        .appendField(Blockly.Msg.ARD_LCD_STEPS);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.Msg.ARD_LCD_STEP_TIP);
  },
  /**
   * Called whenever anything on the workspace changes.
   * It checks/warns if the selected stepper instance has a config block.
   * @this Blockly.Block
   */
  onchange: function() {
    if (!this.workspace) return;  // Block has been deleted.

    var instanceName = this.getFieldValue('STEPPER_NAME')
    // // if (Blockly.Instances.isInstancePresent(instanceName, 'Stepper', this)) {
    if (Blockly.Instances.isInstancePresent(instanceName, 'Lcd', this)) {
      this.setWarningText(null);
    } else {
      // Set a warning to select a valid stepper config block
      this.setWarningText(
        Blockly.Msg.ARD_COMPONENT_WARN1.replace(
            '%1', Blockly.Msg.ARD_LCD_COMPONENT).replace(
                '%2', instanceName));
    }
  }
};
