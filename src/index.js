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

import {AmbientLight} from 'three/src/lights/AmbientLight';
import {DirectionalLight} from 'three/src/lights/DirectionalLight';
import {BufferGeometryLoader} from 'three/src/loaders/BufferGeometryLoader';
import {Mesh} from 'three/src/objects/Mesh';
import {MeshPhongMaterial} from 'three/src/materials/MeshPhongMaterial';
import {PerspectiveCamera} from 'three/src/cameras/PerspectiveCamera';
import {WebGLRenderer} from 'three/src/renderers/WebGLRenderer';
import {Scene} from 'three/src/scenes/Scene';

const NEAR = 0.1;
const FAR = 1000;

const loader = new BufferGeometryLoader();

const renderer = new WebGLRenderer();
document.body.appendChild(renderer.domElement);

const scene = new Scene();

const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, NEAR, FAR);
camera.position.z = 20;

const ambientLight = new AmbientLight('#ffffff', 0.1);
scene.add(ambientLight);

const directionalLight = new DirectionalLight();
directionalLight.position.set(1, 1, 1);
scene.add(directionalLight);

let dino;

function render() {
  requestAnimationFrame(render);

  dino.rotation.y += 0.01;

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.render(scene, camera);
}

loader.load('assets/dino.json', (geometry) => {
  const material = new MeshPhongMaterial({color: 0xffff00});
  dino = new Mesh(geometry, material);
  scene.add(dino);

  render();
});
