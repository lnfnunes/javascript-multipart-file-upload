'use strict';

import CONFIG from './../config.json';

let {
    extend
    } = angular;

export default function __identity() {

  class S3Stack extends S3Enumerable {

    constructor() {
      extend(this, options);
    }

    push(obj) {
      this.elements.push(obj);
    }

    pop() {
      if(this.empty) return null;
      this.elements.pop();
    }
  }

  return new S3Stack();

}