(function(angular) {
  'use strict';

  angular.module('s3multipartproperties', ['s3object'])
    .factory('s3multipartproperties', function(s3object) { 

      function S3MultipartProperties(cfg) {
        s3object.call(this);
        this.apply(this, cfg);
      }

      S3MultipartProperties.prototype = Object.create(s3object.prototype, {

        constructor: S3MultipartProperties,

        key: { 
          writable: true, 
          configurable: true, 
          value: null
        },

        uploadId: { 
          writable: true, 
          configurable: true, 
          value: null
        },

        signUrl: { 
          writable: true, 
          configurable: true, 
          value: null 
        }

      });
  
      return function(cfg) { return new S3MultipartProperties(cfg); } 
    });

})(window.angular);