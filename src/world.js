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
import {BoxBufferGeometry} from 'three/src/geometries/BoxGeometry';
import {DirectionalLight} from 'three/src/lights/DirectionalLight';
import EntityList from './EntityList';
import {Mesh} from 'three/src/objects/Mesh';
import {MeshLambertMaterial} from 'three/src/materials/MeshLambertMaterial';
import {MeshPhongMaterial} from 'three/src/materials/MeshPhongMaterial';
import {Object3D} from 'three/src/core/Object3D';
import Obstacle from './Obstacle';
import {Scene} from 'three/src/scenes/Scene';
import Scoreboard from './Scoreboard';
import * as THREE from 'three/src/constants';

import config from './config';
import input from './input';

let obstacleCountdown = 2;
let started = false;
let distance = 0;
const obstacles = new EntityList(Obstacle);

const scene = new Scene();
const ambientLight = new AmbientLight('#ffffff', 0.3);
scene.add(ambientLight);

const directionalLight = new DirectionalLight();
directionalLight.position.set(-0.5, 0.5, 1);
scene.add(directionalLight);

const scoreboard = new Scoreboard();
scoreboard.position.x = 30;
scoreboard.position.y = 3;
scoreboard.position.z = 45;
scene.add(scoreboard);

// The 'viewpoint' has the position and orientation of the viewer. The cameras
// are relative to this. This allows us to move the base viewpoint around
// independently of what the VR camera is doing.
const viewpoint = new Object3D();
viewpoint.position.x = 30;
viewpoint.position.y = 5;
viewpoint.position.z = 50;
scene.add(viewpoint);

let room;

let dino;
let dinoYVelocity = config.INIITAL_JUMP_VELOCITY;
let dinoXVelocity = config.SPEED;
let onFloor = false;

function createObstacle() {
  const obstacle = obstacles.create();
  obstacle.position.x = 80;
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

let paused = false;

export default {
  scene,
  viewpoint,
  setup: (assets) => {
    const material = new MeshPhongMaterial({color: 0xffff00});
    dino = new Mesh(assets['dino.json'], material);
    dino.rotation.y = Math.PI / 2;
    dino.position.x = -5;
    scene.add(dino);

    const texture = assets['wallpaper.jpg'];
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(5, 5);
    const wallMaterial = new MeshLambertMaterial({
      map: texture,
      side: THREE.BackSide,
    });
    const roomGeometry = new BoxBufferGeometry(90, 20, 70);
    room = new Mesh(roomGeometry, wallMaterial);
    room.position.y = 10;
    room.position.x = 35;
    room.position.z = 20;
    scene.add(room);
  },
  restart: () => {
    obstacleCountdown = 2;
    started = false;
    distance = 0;
    dinoYVelocity = config.INIITAL_JUMP_VELOCITY;
    dinoXVelocity = config.SPEED;
    onFloor = false;
  },
  pause: () => {
    paused = true;
  },
  unpause: () => {
    paused = false;
  },
  update: (elapsed) => {
    if (paused) {
      if (input.jump) {
        paused = false;
      } else {
        return;
      }
    }
    if (started) {
      obstacleCountdown -= elapsed;
      if (obstacleCountdown < 0) {
        obstacleCountdown += random(1, 2.5);
        createObstacle();
      }
      const xDelta = dinoXVelocity * elapsed;
      distance += (xDelta * config.SCORE_RATE);
      scoreboard.setScore(distance);
      for (const obstacle of obstacles) {
        obstacle.position.x -= xDelta;
        if (obstacle.position.x < -20) {
          removeObstacle(obstacle);
        }
      }
    }
    if (input.jump && onFloor) {
      dinoYVelocity = config.INIITAL_JUMP_VELOCITY;
      onFloor = false;
      started = true;
    } else {
      dinoYVelocity += config.GRAVITY * elapsed;
    }
    if (dinoXVelocity < config.MAX_SPEED) {
      dinoXVelocity += config.ACCELERATION * elapsed;
    }
    dino.position.y += dinoYVelocity * elapsed;
    if (dino.position.y < 0) {
      dino.position.y = 0;
      dinoYVelocity = 0;
      onFloor = true;
    }
    input.clear();
  },
};
