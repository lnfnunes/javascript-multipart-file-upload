'use strict';

require('./S3Enumerable');

function S3Queue(){
  S3Enumerable.call(this);
}

S3Queue.prototype = Object.create(S3Enumerable.prototype, {

  constructor: S3Queue,

  enqueue: {
    value : function(obj) {
      this.elements.push(obj);
    },
    configurable: false
  },

  dequeue: {
    value: function(obj) {
      if(this.empty) return null;
      return this.elements.shift();
    },
    configurable: false
  },

  peek: {
    value: function() {
      if(this.empty) return null;
      return this.elements[0];
    },
    configurable: false
  }

});