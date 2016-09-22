'use strict';

require('./S3Enumerable');

function S3Stack(){
  S3Enumerable.call(this);
}

S3Stack.prototype = Object.create(S3Enumerable.prototype, {

  constructor: S3Stack,

  push: {
    value : function(obj) {
      this.elements.push(obj);
    },
    configurable: false
  },

  pop: {
    value : function(obj) {
      if(this.empty) return null;
      this.elements.pop(obj);
    },
    configurable: false
  }

});