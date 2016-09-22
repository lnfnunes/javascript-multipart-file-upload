'use strict';

import CONFIG from './../config.json';

let {
    extend
    } = angular;

export default function __identity() {

  class S3Queue extends S3Enumerable {

    constructor() {
      extend(this, options);
    }

    enqueue(obj) {
      this.elements.push(obj);
    }

    dequeue() {
      if(this.empty) return null;
      return this.elements.shift();
    }

    peek() {
      if(this.empty) return null;
      return this.elements[0];
    }

  }

  return new S3Queue();

}
