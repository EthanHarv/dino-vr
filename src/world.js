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

import {AmbientLight} from 'three/src/lights/AmbientLight';
import {DirectionalLight} from 'three/src/lights/DirectionalLight';
import {Mesh} from 'three/src/objects/Mesh';
import {MeshPhongMaterial} from 'three/src/materials/MeshPhongMaterial';
import {Object3D} from 'three/src/core/Object3D';
import ObstacleList from './ObstacleList';
import {Scene} from 'three/src/scenes/Scene';
import Scoreboard from './Scoreboard';

import input from './input';

const GRAVITY = -30;
const JUMP_VELOCITY = 10;
const ACCELERATION = 0.05;

let obstacleCountdown = 2;
let started = false;
let distance = 0;
const obstacles = new ObstacleList();

const scene = new Scene();
const ambientLight = new AmbientLight('#ffffff', 0.1);
scene.add(ambientLight);

const directionalLight = new DirectionalLight();
directionalLight.position.set(-0.5, 0.5, 1);
scene.add(directionalLight);

const scoreboard = new Scoreboard();
scoreboard.position.x = 5;
scoreboard.position.y = 5.5;
scoreboard.position.z = 15;
scene.add(scoreboard);

// The 'viewpoint' has the position and orientation of the viewer. The cameras
// are relative to this. This allows us to move the base viewpoint around
// independently of what the VR camera is doing.
const viewpoint = new Object3D();
viewpoint.position.z = 20;
viewpoint.position.y = 5;
scene.add(viewpoint);

let dino;
let dinoYVelocity = JUMP_VELOCITY;
let dinoXVelocity = 10;
let onFloor = false;

function createObstacle() {
  const obstacle = obstacles.create();
  obstacle.position.x = 50;
  obstacle.position.y = 0.5;
  obstacle.position.z = 0;
  scene.add(obstacle);
}

function removeObstacle(obstacle) {
  obstacles.recycle(obstacle);
  scene.remove(obstacle);
}

function random(min, max) {
  let val = Math.random();
  val *= (max - min); // Scale
  val += min; // Offset
  return val;
}

export default {
  scene,
  viewpoint,
  start: (assets) => {
    const material = new MeshPhongMaterial({color: 0xffff00});
    dino = new Mesh(assets['dino.json'], material);
    dino.rotation.y = Math.PI / 2;
    dino.position.x = -5;
    scene.add(dino);
  },
  update: (elapsed) => {
    if (started) {
      obstacleCountdown -= elapsed;
      if (obstacleCountdown < 0) {
        obstacleCountdown += random(1, 2.5);
        createObstacle();
      }
      const xDelta = dinoXVelocity * elapsed;
      distance += xDelta;
      scoreboard.setScore(distance);
      for (const obstacle of obstacles) {
        obstacle.position.x -= xDelta;
        if (obstacle.position.x < -20) {
          removeObstacle(obstacle);
        }
      }
    }
    if (input.jump && onFloor) {
      dinoYVelocity = JUMP_VELOCITY;
      onFloor = false;
      started = true;
    } else {
      dinoYVelocity += GRAVITY * elapsed;
    }
    dinoXVelocity += ACCELERATION * elapsed;
    dino.position.y += dinoYVelocity * elapsed;
    if (dino.position.y < 0) {
      dino.position.y = 0;
      dinoYVelocity = 0;
      onFloor = true;
    }
    input.clear();
  },
};
