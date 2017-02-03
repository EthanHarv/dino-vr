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

import {BufferGeometryLoader} from 'three/src/loaders/BufferGeometryLoader';

const loader = new BufferGeometryLoader();

const objects = [
  'dino.json',
];

const assets = {};

function loadObject(url) {
  return new Promise((resolve, reject) => loader.load(`assets/${url}`, resolve, undefined, reject));
}

export default {
  load: () => {
    return Promise.all(objects.map((url) => {
      return loadObject(url).then((geometry) => {
        assets[url] = geometry;
      });
    })).then(() => assets);
  },
};
