/*
(function(angular) {
  'use strict';

  angular.module('s3uploadetag', ['s3object'])
    .factory('s3uploadetag', function(s3object) { 

      function S3UploadEtag(cfg) {
        s3object.call(this);
        this.apply(this, cfg);
      }

      S3UploadEtag.prototype = Object.create(s3object.prototype, {
        
        constructor: S3UploadEtag,

        ETag: { 
          writable: true, 
          configurable: true, 
          value: null
        },

        PartNumber: { 
          writable: true, 
          configurable: true, 
          value: null
        }

      });

      return function(cfg) { return new S3UploadEtag(cfg); } 
   });

})(window.angular);
*/