(function(angular) {
  'use strict';

  angular.module('s3queue', ['s3enumerable'])
    .factory('s3queue', function(s3enumerable) { 
      
      function S3Queue(){
        s3enumerable.call(this);
      };

      S3Queue.prototype = Object.create(s3enumerable.prototype, {

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

      return new S3Queue(); 
    });

})(window.angular);