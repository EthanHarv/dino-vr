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
'use strict';

import 'three/src/polyfills.js';

import {PerspectiveCamera} from 'three/src/cameras/PerspectiveCamera';
import {WebGLRenderer} from 'three/src/renderers/WebGLRenderer';
import loader from './loader';
import * as vrui from 'webvr-ui';
import world from './world';

const NEAR = 0.1;
const FAR = 1000;

const renderer = new WebGLRenderer();
document.body.appendChild(renderer.domElement);

const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, NEAR, FAR);
camera.position.z = 20;

let lastFrameStart = 0;

const enterVR = new vrui.EnterVRButton(renderer.domElement, {});
document.getElementById('button').appendChild(enterVR.domElement);

function render(frameStart) {
  requestAnimationFrame(render);
  const elapsed = (frameStart - lastFrameStart) / 1000;
  lastFrameStart = frameStart;

  world.update(elapsed);

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setPixelRatio(devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.render(world.scene, camera);
}

loader.load().then((assets) => {
  world.start(assets);
  render(0);
});
