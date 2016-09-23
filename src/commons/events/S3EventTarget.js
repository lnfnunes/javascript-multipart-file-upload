(function(angular) {
  'use strict';

  angular.module('s3eventtarget', [])
    .factory('s3eventtarget', function() { 

      function S3EventTarget() {
        Object.call(this);

        this.handlers = new Array();
      }

      S3EventTarget.prototype = Object.create(Object.prototype, {

        constructor: S3EventTarget,

        handlers: { 
          writable: true, 
          configurable: true, 
          value: null
        },

        addListener: {
          value: function(fn) {
            this.handlers.push(fn);
          },
          enumerable: false,
          configurable: false, 
          writable: false
        },

        fire: {
          value: function(sender, obj) {
            this.handlers.forEach(function(item) {
              item.call(sender, obj);
            });
          },
          enumerable: false,
          configurable: false, 
          writable: false
        },

        removeListener: {
          value: function(fn) {
            this.handlers = this.handlers.filter(function(item) {
              if (item !== fn) {
                return item;
              }
            });
          },
          enumerable: false,
          configurable: false, 
          writable: false
        }

      });      

      return new S3EventTarget(); 
    });

})(window.angular);