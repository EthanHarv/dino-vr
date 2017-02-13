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

import Obstacle from './Obstacle';

class ListEntry {
  constructor(item) {
    this.next = null;
    this.item = item;
  }
}

export default class ObstacleList {
  constructor() {
    this.free = null;
    this.active = null;
  }

  create() {
    // Is there an item on the free list already?
    let result;
    let entry;
    if (this.free) {
      entry = this.free;
      result = this.free.item;
      this.free = entry.next;
    } else {
      result = new Obstacle();
      entry = new ListEntry(result);
    }

    // Add to active list
    entry.next = this.active;
    this.active = entry;
    return result;
  }

  recycle(obstacle) {
    let previous = null;
    let current = this.active;
    while (current !== null && current.item !== obstacle) {
      previous = current;
      current = current.next;
    }
    if (!current) {
      return; // obstacle not actually in the active list
    }
    // Remove the item from the active list
    if (previous) {
      previous.next = current.next;
    } else {
      this.active = current.next;
    }
    // Add to the free list
    current.next = this.free;
    this.free = current;
  }

  [Symbol.iterator]() {
    let current = this.active;
    return {
      next() {
        if (current) {
          const value = current.item;
          current = current.next;
          return {
            value,
            done: false,
          };
        } else {
          return {
            value: undefined,
            done: true,
          };
        }
      },
    };
  }
}
