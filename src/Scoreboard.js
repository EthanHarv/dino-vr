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

import {Mesh} from 'three/src/objects/Mesh';
import {MeshBasicMaterial} from 'three/src/materials/MeshBasicMaterial';
import {PlaneBufferGeometry} from 'three/src/geometries/PlaneGeometry';
import {Texture} from 'three/src/textures/Texture';

const WIDTH = 8;
const HEIGHT = 1;

export default class Scoreboard extends Mesh {
  constructor() {
    const canvas = document.createElement('canvas');
    const texture = new Texture(canvas);
    const geometry = new PlaneBufferGeometry(WIDTH, HEIGHT, 1, 1);
    const material = new MeshBasicMaterial({map: texture, transparent: true});

    super(geometry, material);
    canvas.width = WIDTH * 64;
    canvas.height = HEIGHT * 64;
    this.score = 0;
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
    this.context.fillStyle = 'red';
    this.context.textAlign = 'center';
    this.context.textBaseline = 'middle';
    this.context.font = `${this.canvas.height}px monospace`;
    this.texture = texture;
    this.draw();
  }

  draw() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.fillText(`SCORE ${this.score}`, this.canvas.width / 2, this.canvas.height / 2);
    this.texture.needsUpdate = true;
  }

  setScore(score) {
    this.score = Math.round(score);
    this.draw();
  }
}
