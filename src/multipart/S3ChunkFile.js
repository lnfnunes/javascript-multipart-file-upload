(function(angular) {
  'use strict';

  var S3ChunkFileState = {
    WAIT: 0,
    SENDING: 1,
    FINISHED: 2,
    ERROR: 3,
    PAUSED: 4
  }

  angular.module('s3chunkfile', ['s3object', 's3eventtarget'])
    .factory('s3chunkfile', function(s3object, s3eventtarget) { 

      function S3ChunkFile(cfg) {
        s3object.call(this);
        this.apply(this, cfg);
      }

      S3ChunkFile.prototype = Object.create(s3object.prototype, {

        constructor: S3ChunkFile,

        bytesSent: {
          writable: true,
          configurable: false,
          value: null
        },

        state: {
          writable: true,
          configurable: false,
          value: S3ChunkFileState.WAIT
        },

        retries: {
          writable: true,
          configurable: false,
          value: 0
        },

        maxretry: {
          writable: true,
          configurable: true,
          value: 5
        },

        blob: { 
          writable: true, 
          configurable: true, 
          value: null
        },
        
        signedUrl: { 
          writable: true, 
          configurable: true, 
          value: null
        },
        
        multipartProperties: { 
          writable: true, 
          configurable: true, 
          value: null
        },

        partNumber: { 
          writable: true, 
          configurable: true, 
          value: null
        },

        etag: { 
          writable: true, 
          configurable: true, 
          value: null
        },

        upload: {
          writable: false, 
          configurable: false,
          value : { 
            startsend: null,
            urlsigned: null,
            finished: null,
            progress: null,
            error: null
          }
        },

        init: {
          value: function() {
            this.upload.startsend = s3eventtarget();
            this.upload.urlsigned = s3eventtarget();
            this.upload.finished = s3eventtarget();
            this.upload.progress = s3eventtarget();
            this.upload.error = s3eventtarget();
          },
          enumerable: false,
          configurable: true, 
          writable: true
        },

        addListeners: {
          value: function() {

            var me = this;

            this.upload.startsend.addListener(function(event) {
              var request = new XMLHttpRequest();

              request.onreadystatechange = function() {
                if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                  var response = JSON.parse(this.responseText);
                  event.signedUrl = response.data.Url;
                  event.upload.urlsigned.fire(me, event);
                }            
              };

              var data = {
                UploadId:      event.multipartProperties.uploadId,
                Key:           event.multipartProperties.key,
                partNumber:    event.partNumber,
                ContentLength: event.blob.size
              };

              request.open('POST', event.multipartProperties.signUrl, true);
              request.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
              request.send(JSON.stringify(data));
            });

            this.upload.urlsigned.addListener(function(event) {
              var request = new XMLHttpRequest();

              request.onreadystatechange = function() {
                if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                  event.etag = this.getResponseHeader('ETag').replace(/"/g, '');
                  event.upload.finished.fire(me, event);
                }
              };

              request.upload.error = function(o) {
                event.state = S3ChunkFileState.ERROR;
                event.upload.error.fire(me, event);
              };

              request.upload.onprogress = function(o) {
                if (o.lengthComputable) {
                  event.state = S3ChunkFileState.SENDING;
                  event.bytesSent = o.loaded;
                  event.upload.progress.fire(me, event);
                }
              };

              request.open('PUT', event.signedUrl, true);
              request.send(event.blob);
            });

            this.upload.finished.addListener(function(event) {
              event.state = S3ChunkFileState.FINISHED;
            });

          },
          enumerable: false,
          configurable: true, 
          writable: true
        },

        send: {
          value: function() {
            this.upload.startsend.fire(this, this);
          } 
        },

        retry: {
          value: function() {
            if(this.retries < this.maxretry) {
              this.retries++;
              this.upload.startsend.fire(this, this);
            } else {
              this.state = S3ChunkFileState.PAUSED;
            }
          } 
        }

      });

      return function(cfg) { return new S3ChunkFile(cfg); } 
    })
    .constant('s3chunkfilestate', S3ChunkFileState);

})(window.angular);