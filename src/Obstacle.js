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

import {BoxBufferGeometry} from 'three/src/geometries/BoxGeometry';
import {Mesh} from 'three/src/objects/Mesh';
import {MeshPhongMaterial} from 'three/src/materials/MeshPhongMaterial';

const obstacleMaterial = new MeshPhongMaterial({color: 0xff0000});

export default class Obstacle extends Mesh {
  constructor() {
    const box = new BoxBufferGeometry(1, 1, 1);
    super(box, obstacleMaterial);
  }
}
