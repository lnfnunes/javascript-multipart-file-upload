(function(angular) {
  'use strict';

  angular.module('s3uploadmultipartconfig', ['s3object'])
    .factory('s3uploadmultipartconfig', function(s3object) { 

      function S3UploadMultiPartConfig(cfg) {
        s3object.call(this);
        this.apply(this, cfg);
      }

      S3UploadMultiPartConfig.prototype = Object.create(s3object.prototype, {

        constructor: S3UploadMultiPartConfig,

        context: { 
          writable: true, 
          configurable: true, 
          value: ''
        },

        blob: { 
          writable: true, 
          configurable: true, 
          value: null 
        },

        chunkSize: { 
          writable: true, 
          configurable: true, 
          value: 10
        },

        createMultiPartUrl: { 
          writable: true, 
          configurable: true, 
          value: '' 
        },

        completeMultiPartUrl: { 
          writable: true, 
          configurable: true, 
          value: '' 
        },

        abortMultiPartUrl: { 
          writable: true, 
          configurable: true, 
          value: '' 
        },

        signUrl: { 
          writable: true, 
          configurable: true, 
          value: '' 
        }

      });
  
      return function(cfg) { return new S3UploadMultiPartConfig(cfg); }
    });

})(window.angular);