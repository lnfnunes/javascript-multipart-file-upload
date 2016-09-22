'use strict';

function S3Object() {
  Object.call(this);

  this.init();
  this.addEvents();
  this.addListeners();
}

S3Object.prototype = Object.create(Object.prototype, {

  constructor: S3Object,

  init: {
    value: function() { },
    enumerable: false,
    configurable: true, 
    writable: false
  },

  addEvents: {
    value: function() { },
    enumerable: false,
    configurable: true, 
    writable: false
  },

  addListeners: {
    value: function() { },
    enumerable: false,
    configurable: true, 
    writable: false
  },

  apply: {
    value: function(obj, properties) {
      for(var property in properties) {
        obj[property] = properties[property];
      }
    },
    enumerable: false,
    configurable: false, 
    writable: false
  }  
});