/*
  Copyright 2017 Google Inc. All Rights Reserved.
  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at
      http://www.apache.org/licenses/LICENSE-2.0
  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/

const TIME_FACTOR = 60;
const HEIGHT_FACTOR = 7.11 / 47;
const WIDTH_FACTOR = 6.45 / 44;

const SPEED_FACTOR = TIME_FACTOR * WIDTH_FACTOR;
const ACCEL_FACTOR = TIME_FACTOR * SPEED_FACTOR;

export default {
  NEAR: 0.1,
  FAR: 1000,
  DRAW_RATIO: 0.5,

  // How did I get these values?
  // I started with the values for the original dino game
  // (https://cs.chromium.org/chromium/src/components/neterror/resources/offline.js?l=1518)
  // and then scaled them. The dino in this game is 7.11 units tall and 6.45
  // units wide. The original dino was 47 units tall and 44 units wide. I also
  // had to scale velocities by 60 and accelerations by 3600 because the
  // original game uses units per frame while I am using units per second.
  ACCELERATION: 0.001 * ACCEL_FACTOR,
  // BG_CLOUD_SPEED: 0.2,
  // BOTTOM_PAD: 10,
  // CLEAR_TIME: 3000,
  // CLOUD_FREQUENCY: 0.5,
  // GAMEOVER_CLEAR_TIME: 750,
  // GAP_COEFFICIENT: 0.6,
  GRAVITY: -0.6 * TIME_FACTOR * TIME_FACTOR * HEIGHT_FACTOR,
  // INVERT_FADE_DURATION: 12000,
  // INVERT_DISTANCE: 700,
  // MAX_BLINK_COUNT: 3,
  // MAX_CLOUDS: 6,
  // MAX_OBSTACLE_LENGTH: 3,
  // MAX_OBSTACLE_DUPLICATION: 2,
  MAX_SPEED: 13 * SPEED_FACTOR,
  // MIN_JUMP_HEIGHT: 35,
  // MOBILE_SPEED_COEFFICIENT: 1.2,
  // RESOURCE_TEMPLATE_ID: 'audio-resources',
  SPEED: 6 * SPEED_FACTOR,
  // SPEED_DROP_COEFFICIENT: 3,

  // DROP_VELOCITY: -5,
  // HEIGHT: 47,
  // HEIGHT_DUCK: 25,
  INIITAL_JUMP_VELOCITY: 10 * TIME_FACTOR * HEIGHT_FACTOR,
  // INTRO_DURATION: 1500,
  // MAX_JUMP_HEIGHT: 30,
  // MIN_JUMP_HEIGHT: 30,
  // SPEED_DROP_COEFFICIENT: 3,
  // SPRITE_WIDTH: 262,
  // START_X_POS: 50,
  // WIDTH: 44,
  // WIDTH_DUCK: 59,

  SCORE_RATE: WIDTH_FACTOR,
  SCORE_WIDTH: 8,
  SCORE_HEIGHT: 1,
  SCORE_FONT_SIZE: 64,
  SCORE_COLOR: 'red',
  SCORE_FONT_FAMILY: 'monospace',
};
