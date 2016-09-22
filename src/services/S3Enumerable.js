'use strict';

import CONFIG from './../config.json';

let {
    extend
    } = angular;

export default function __identity() {

  class S3Enumerable {
    
    constructor() {
      extend(this, options);

      this.array = new Array();
    }

    clear() {
      this.array = new Array();
    }

    elements: {
      get: function() { 
        return this.array; 
      },
      enumerable: true,
      configurable: false
    }

    length: {
      get: function() { 
        return this.array.length; 
      },
      enumerable: false,
      configurable: false
    }

    empty: {
      get: function() { 
        return this.array.length === 0; 
      },
      enumerable: false,
      configurable: false
    }
  }

  return new S3Enumerable();

}    
