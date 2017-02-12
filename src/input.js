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

class Input {
  constructor() {
    this._jump = false;
    this.gamepads = new Set();
    window.addEventListener('keydown', (e) => this.keydown(e.keyCode));
    window.addEventListener('mousedown', (e) => this.click(e));
    window.addEventListener('touchstart', (e) => this.click(e));
  }

  get jump() {
    if (this._jump) {
      return true;
    }
    return this.pollGamepads();
  }

  pollGamepads() {
    const pads = navigator.getGamepads();

    for (let i = 0; i < pads.length; i++) {
      const pad = pads[i];
      if (pad) {
        for (const button of pad.buttons) {
          if (button.pressed) {
            return true;
          }
        }
      }
    };

    return false;
  }

  clear() {
    this._jump = false;
  }

  keydown(keyCode) {
    if (keyCode === 32) {// Space
      this._jump = true;
    }
  }

  click(event) {
    if (event.target.nodeName === 'CANVAS') {
      this._jump = true;
      event.preventDefault();
    }
  }
}

export default new Input();
