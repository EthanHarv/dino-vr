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
import {TextureLoader} from 'three/src/loaders/TextureLoader';

const geoLoader = new BufferGeometryLoader();
const textureLoader = new TextureLoader();

const objects = {
  'dino.json': geoLoader,
  'wallpaper.jpg': textureLoader,
};

const assets = {};

function loadObject(url, loader) {
  return new Promise((resolve, reject) => loader.load(`assets/${url}`, resolve, undefined, reject));
}

export default {
  load: () => {
    const promises = [];
    for (const url in objects) {
      promises.push(loadObject(url, objects[url]).then((asset) => {
        assets[url] = asset;
      }));
    }
    return Promise.all(promises).then(() => assets);
  },
};
