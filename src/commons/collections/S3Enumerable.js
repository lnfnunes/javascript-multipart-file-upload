'use strict';

window.S3Enumerable = function(){
  Object.call(this);
  this.array = new Array();
}

window.S3Enumerable.prototype = Object.create(Object.prototype, {

  constructor: S3Enumerable,

  clear: {
    value : function(obj) {
      this.array = new Array();
    },
    configurable: false
  },

  elements: {
    get: function() { 
      return this.array; 
    },
    enumerable: true,
    configurable: false
  },

  length: {
    get: function() { 
      return this.array.length; 
    },
    enumerable: false,
    configurable: false
  },

  empty: {
    get: function() { 
      return this.array.length === 0; 
    },
    enumerable: false,
    configurable: false
  }

});
