(function(angular) {
  'use strict';

  angular.module('s3stack', ['s3enumerable'])
    .factory('s3stack', function(s3enumerable) {
      
      function S3Stack(){
        s3enumerable.call(this);
      };

      S3Stack.prototype = Object.create(s3enumerable.prototype, {

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

      return new S3Stack(); 
    });

})(window.angular);