/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 *
 * @fileoverview XML toolbox embedded into a JavaScript text string.
 */
'use strict';

/** Create a namespace for the application. */
var Ardublockly = Ardublockly || {};

Ardublockly.TOOLBOX_XML =
'<xml>' +
'  <sep></sep>' +
'  <category id="catLogic" name="Logic">' +
'    <block type="controls_if"></block>' +
'    <block type="logic_compare"></block>' +
'    <block type="logic_operation"></block>' +
'    <block type="logic_negate"></block>' +
'    <block type="logic_boolean"></block>' +
'    <block type="logic_null"></block>' +
'    <block type="logic_ternary"></block>' +
'  </category>' +
'  <sep></sep>' +
'  <category id="catLoops" name="Loops">' +
'    <block type="controls_repeat_ext">' +
'      <value name="TIMES">' +
'        <block type="math_number">' +
'          <field name="NUM">10</field>' +
'        </block>' +
'      </value>' +
'    </block>' +
'    <block type="controls_whileUntil"></block>' +
'    <block type="controls_for">' +
'      <value name="FROM">' +
'        <block type="math_number">' +
'          <field name="NUM">1</field>' +
'        </block>' +
'      </value>' +
'      <value name="TO">' +
'        <block type="math_number">' +
'          <field name="NUM">10</field>' +
'        </block>' +
'      </value>' +
'      <value name="BY">' +
'        <block type="math_number">' +
'          <field name="NUM">1</field>' +
'        </block>' +
'      </value>' +
'    </block>' +
'    <block type="controls_flow_statements"></block>' +
'  </category>' +
'  <sep></sep>' +
'  <category id="catMath" name="Math">' +
'    <block type="math_number"></block>' +
'    <block type="math_arithmetic"></block>' +
'    <block type="math_single"></block>' +
'    <block type="math_trig"></block>' +
'    <block type="math_constant"></block>' +
'    <block type="math_number_property"></block>' +
'    <block type="math_change">' +
'      <value name="DELTA">' +
'        <block type="math_number">' +
'          <field name="NUM">1</field>' +
'        </block>' +
'      </value>' +
'    </block>' +
'    <block type="math_round"></block>' +
'    <block type="math_modulo"></block>' +
'    <block type="math_constrain">' +
'      <value name="LOW">' +
'        <block type="math_number">' +
'          <field name="NUM">1</field>' +
'        </block>' +
'      </value>' +
'      <value name="HIGH">' +
'        <block type="math_number">' +
'          <field name="NUM">100</field>' +
'        </block>' +
'      </value>' +
'    </block>' +
'    <block type="math_random_int">' +
'      <value name="FROM">' +
'        <block type="math_number">' +
'          <field name="NUM">1</field>' +
'        </block>' +
'      </value>' +
'      <value name="TO">' +
'        <block type="math_number">' +
'          <field name="NUM">100</field>' +
'        </block>' +
'      </value>' +
'    </block>' +
'    <block type="math_random_float"></block>' +
'    <block type="base_map"></block>' +
'  </category>' +
'  <sep></sep>' +
'  <category id="catText" name="Text">' +
'    <block type="text"></block>' +
'    <block type="text_join"></block>' +
'    <block type="text_append">' +
'      <value name="TEXT">' +
'        <block type="text"></block>' +
'      </value>' +
'    </block>' +
'    <block type="text_length"></block>' +
'    <block type="text_isEmpty"></block>' +
//'    <!--block type="text_trim"></block Need to update block -->' +
//'    <!--block type="text_print"></block Part of the serial comms -->' +
'  </category>' +
'  <sep></sep>' +
'  <category id="catVariables" name="Variables">' +
'    <block type="variables_get"></block>' +
'    <block type="variables_set"></block>' +
'    <block type="variables_set">' +
'      <value name="VALUE">' +
'        <block type="variables_set_type"></block>' +
'      </value>' +
'    </block>' +
'    <block type="variables_set_type"></block>' +
'  </category>' +
'  <sep></sep>' +
'  <category id="catFunctions" name="Functions" custom="PROCEDURE"></category>' +
'  <sep></sep>' +
'  <category id="catInputOutput" name="Input/Output">' +
'    <block type="io_digitalwrite">' +
'      <value name="STATE">' +
'        <block type="io_highlow"></block>' +
'      </value>' +
'    </block>' +
'    <block type="io_digitalread"></block>' +
'    <block type="io_builtin_led">' +
'      <value name="STATE">' +
'        <block type="io_highlow"></block>' +
'      </value>' +
'    </block>' +
'    <block type="io_analogwrite"></block>' +
'    <block type="io_analogread"></block>' +
'    <block type="io_highlow"></block>' +
'    <block type="io_pulsein">' +
'      <value name="PULSETYPE">' +
'        <shadow type="io_highlow"></shadow>' +
'      </value>' +
'    </block>' +
'    <block type="io_pulsetimeout">' +
'      <value name="PULSETYPE">' +
'        <shadow type="io_highlow"></shadow>' +
'      </value>' +
'      <value name="TIMEOUT">' +
'        <block type="math_number"></block>' +
'      </value>'+
'    </block>' +
'  </category>' +
'  <sep></sep>' +
'  <category id="catTime" name="Time">' +
'    <block type="time_delay">' +
'      <value name="DELAY_TIME_MILI">' +
'        <block type="math_number">' +
'          <field name="NUM">1000</field>' +
'        </block>' +
'      </value>' +
'    </block>' +
'    <block type="time_delaymicros">' +
'      <value name="DELAY_TIME_MICRO">' +
'        <block type="math_number">' +
'          <field name="NUM">100</field>' +
'        </block>' +
'      </value>' +
'    </block>' +
'    <block type="time_millis"></block>' +
'    <block type="time_micros"></block>' +
'    <block type="infinite_loop"></block>' +
'  </category>' +
'  <sep></sep>' +
'  <category id="catAudio" name="Audio">' +
'    <block type="io_tone">' +
'      <field name="TONEPIN">0</field>' +
'      <value name="FREQUENCY">' +
'        <shadow type="math_number">' +
'          <field name="NUM">220</field>' +
'        </shadow>' +
'      </value>' +
'    </block>' +
'    <block type="io_notone"></block>' +
'  </category>' +
'  <sep></sep>' +
'  <category id="catMotors" name="Motors">' +
'    <block type="servo_write">' +
'      <value name="SERVO_ANGLE">' +
'        <block type="math_number">' +
/// jwc 2016-0608-0900 '          <field name="NUM">90</field>' +
'          <field name="NUM">10</field>' +
'        </block>' +
'      </value>' +
'    </block>' +
/// jwc 2016-0519-1000 >>
'    <block type="servo_write_jwc">' +
'      <value name="SERVO_ANGLE">' +
'        <block type="math_number">' +
'          <field name="NUM">60</field>' +
'        </block>' +
'      </value>' +
'    </block>' +
/// jwc <<
'    <block type="servo_read"></block>' +
'    <block type="stepper_config">' +
'      <field name="STEPPER_PIN1">1</field>' +
'      <field name="STEPPER_PIN2">2</field>' +
'      <value name="STEPPER_STEPS">' +
'        <block type="math_number">' +
'          <field name="NUM">100</field>' +
'        </block>' +
'      </value>' +
'      <value name="STEPPER_SPEED">' +
'        <block type="math_number">' +
'          <field name="NUM">10</field>' +
'        </block>' +
'      </value>' +
'    </block>' +
'    <block type="stepper_step">' +
'      <value name="STEPPER_STEPS">' +
'        <block type="math_number">' +
'          <field name="NUM">10</field>' +
'        </block>' +
'      </value>' +
'    </block>' +
// // /// jwc 2016-1128-1545 >>
// // // // '    <block type="stepper_config_jwc">' +
// // '    <block type="lcd_config_jwc">' +
// // '      <field name="STEPPER_PIN1">1</field>' +
// // '      <field name="STEPPER_PIN2">2</field>' +
// // '      <value name="STEPPER_STEPS">' +
// // '        <block type="math_number">' +
// // '          <field name="NUM">100</field>' +
// // '        </block>' +
// // '      </value>' +
// // '      <value name="STEPPER_SPEED">' +
// // '        <block type="math_number">' +
// // '          <field name="NUM">10</field>' +
// // '        </block>' +
// // '      </value>' +
// // '    </block>' +
// // /// jwc <<
/// jwc 2016-1128-2045 >>
// // // // '    <block type="stepper_step_jwc">' +
// // '    <block type="lcd_write_jwc">' +
// // '      <value name="STEPPER_STEPS">' +
// // '        <block type="math_number">' +
// // '          <field name="NUM">20</field>' +
// // '        </block>' +
// // '      </value>' +
// // '    </block>' +
// // /// jwc <<
'  </category>' +
'  <sep></sep>' +
'  <category id="catComms" name="Comms">' +
'    <block type="serial_setup"></block>' +
'    <block type="serial_print"></block>' +
'    <block type="text_prompt_ext">' +
'      <value name="TEXT">' +
'        <block type="text"></block>' +
'      </value>' +
'    </block>' +

/// jwc 2016-1119-0030 >>
'    <block type="lcd_setup_BLOCK">' +
'      <value name="I2C_CONTROLLER_DEC_ADDRESS_FIELD_ID">' +
'        <block type="math_number">' +
'          <field name="NUM">39' +
'          </field>' +
'        </block>' +
'      </value>' +
'    </block>' +

'    <block type="lcd_print_BLOCK">' +
'      <value name="PRINT_FOR_STRING_AND_CHAR_FIELD_ID">' +
'        <block type="text">' +
'        </block>' +
'      </value>' +
'      <value name="COLUMN_NUM_BASE0_FIELD_ID">' +
'        <block type="math_number">' +
'          <field name="NUM">0' +
'          </field>' +
'        </block>' +
'      </value>' +
'      <value name="ROW_NUM_BASE0_FIELD_ID">' +
'        <block type="math_number">' +
'          <field name="NUM">0' +
'          </field>' +
'        </block>' +
'      </value>' +
'      <value name="ERASE_PREP_W_NUM_OF_BLANKS_BASE1_FIELD_ID">' +
'        <block type="math_number">' +
'          <field name="NUM">0' +
'          </field>' +
'        </block>' +
'      </value>' +
'    </block>' +

'    <block type="rf2dot4ghz_setup_BLOCK">' +
'      <value name="RF2DOT4GHZ_CHANNEL_AS_DEC_FIELD_ID">' +
'        <block type="math_number">' +
'          <field name="NUM">101' +
'          </field>' +
'        </block>' +
'      </value>' +
'    </block>' +

'    <block type="rf2dot4ghz_loop_stage01_rx_values_all_BLOCK">' +
'    </block>' +

'    <block type="rf2dot4ghz_loop_stage02_rx_value_select_BLOCK">' +
'    </block>' +

/// jwc <<

// * Seems that naming must be broken with '_', especially for ArduBlockly-Browser to work 
/// jwc 2016-0703-1700 >>>
/// jwc good: '    <block type="text_prompt_ext_IrTxRx_Jwc">' +
/// 2016-0709-1234 jwc desktop good but not browser:'    <block type="infraredComms_Rx">' +
/// jwc browser:bad, desktop:good::'    <block type="text_prompt_ext_infraredComms_Rx">' +
/// jwc browser:bad, desktop:bad:: '    <block type="text_prompt_ext_infraredComms">' +
/// jwc good both browser & windows: '    <block type="infrared_Comms_Rx">' +
/// jwc good both: '    <block type="infrared12345_Comms_Rx">' +
/// jwc good both: '    <block type="commsInfrared_Rx">' +
/// jwc good both: '    <block type="infraredComms_Rx">' +
/// jwc no: '    <block type="commsInfrared_Rx_BLOCK">' +
'    <block type="commsInfrared_Rx_BLOCK">' +
'      <value name="PROMPT_TEXT_FIELD_ID">' +
'        <block type="text">' +
'          <field name="TEXT">></field>' +
'        </block>' +
'      </value>' +
'    </block>' +
'    <block type="commsInfrared_Rx_BLOCK_BASIC">' +
/// jwc override: '      <value name="PROMPT_TEXT_FIELD_ID">' +
/// jwc override: '        <block type="text"></block>' +
/// jwc override: '      </value>' +
'    </block>' +
/// jwc 2016-0703-1700 <<<
'    <block type="spi_setup"></block>' +
'    <block type="spi_transfer"></block>' +
'    <block type="spi_transfer_return"></block>' +
'  </category>' +
'</xml>';
