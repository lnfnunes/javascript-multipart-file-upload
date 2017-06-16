(function(angular) {
  'use strict';

  var modules = [
    's3object', 
    's3eventtarget', 
    's3queue', 
    's3stack', 
    's3uploadmultipartconfig', 
    's3multipartproperties', 
    's3chunkfile',
    's3uploadetag'];

  angular.module('s3uploadmultipart', modules)
    .factory('s3uploadmultipart', function(s3object, s3eventtarget, s3queue, s3stack, s3uploadmultipartconfig, s3multipartproperties, s3chunkfile, s3uploadetag, s3chunkfilestate) { 

      function S3UploadMultiPart(cfg) {
        s3object.call(this);
        this.apply(this.config, cfg);
      }

      S3UploadMultiPart.prototype = Object.create(s3object.prototype, {

        constructor: S3UploadMultiPart,

        totalBytesSent: { 
          writable: true, 
          configurable: false, 
          value: null
        },

        percentageSent: { 
          configurable: false,
          get: function() { 
            return parseInt((this.totalBytesSent / this.config.blob.size) * 100, 10);
          }
        },

        config: { 
          writable: true, 
          configurable: true, 
          value: null
        },

        chunks: { 
          writable: true, 
          configurable: false, 
          value: null
        },

        etags: { 
          writable: true, 
          configurable: false, 
          value: null
        },

        multipartProperties: { 
          writable: true, 
          configurable: true, 
          value: null
        },

        upload: {
          writable: true, 
          configurable: true,
          value : { 
            create: null,
            progress: null,
            send: null,
            completed: null,
            abort: null,
          }
        },

        PART_SIZE: { 
          configurable: false,
          get: function() { return this.config.chunkSize * 1024 * 1024; }
        },

        init: {
          value: function() {

            this.upload.create = s3eventtarget();
            this.upload.progress = s3eventtarget();
            this.upload.send =  s3eventtarget();
            this.upload.completed = s3eventtarget();      
            this.upload.abort = s3eventtarget();   

            this.chunks = s3queue();

            this.etags = s3queue();

            this.config = s3uploadmultipartconfig();

            this.multipartProperties = s3multipartproperties();
          },
          enumerable: false,
          configurable: true, 
          writable: true
        },

        addListeners: {
          value: function(){
            var me = this;

            this.upload.progress.addListener(function(event) {
              me.totalBytesSent = (me.PART_SIZE * (event.partNumber-1)) + event.bytesSent;
            });

            this.upload.send.addListener(function() {
              if(!me.chunks.empty) {
                var chunk = me.chunks.peek();
                if(chunk.state === s3chunkfilestate.WAIT) {
                  chunk.send();
                }
              }
            });

            this.upload.send.addListener(function(event) {
              if(event.empty) {
                me.complete();
              }
            });

            this.upload.create.addListener(function() {
              var start = 0;
              var end = 0;
              var size = me.config.blob.size;
              var blob = me.config.blob;

              while (end < size) {
                start = me.PART_SIZE * me.chunks.length;
                end = Math.min(me.PART_SIZE * (me.chunks.length + 1), size);

                var chunk = s3chunkfile({
                  blob:                blob.slice(start, end),
                  multipartProperties: me.multipartProperties,
                  partNumber:          me.chunks.length + 1
                });

                chunk.upload.progress.addListener(function(event) {
                  if(event.state === s3chunkfilestate.SENDING) {
                    me.upload.progress.fire(me, event);
                  }
                });

                chunk.upload.finished.addListener(function(event) {
                  if(event.state === s3chunkfilestate.ERROR) {
                    event.retry();
                  }
                });           

                chunk.upload.finished.addListener(function(event) {
                  if(event.state === s3chunkfilestate.FINISHED) {
                    me.chunks.dequeue();
                  }
                });         

                chunk.upload.finished.addListener(function(event) {
                  if(event.state === s3chunkfilestate.FINISHED) {
                    me.etags.push(s3uploadetag({
                      ETag:       event.etag,
                      PartNumber: event.partNumber
                    }));
                  }
                });

                chunk.upload.finished.addListener(function(event) {
                  if(event.state === s3chunkfilestate.FINISHED) {
                    me.upload.send.fire(me, me.chunks);
                  }
                });

                me.chunks.enqueue(chunk);
              }

              me.upload.send.fire(me, me.chunks);
            });
          },
          enumerable: true,
          configurable: true, 
          writable: true
        },

        retry: {
          value: function(){
            me.upload.send.fire(me, me.chunks);
          },
          configurable: false
        },

        create: {
          value: function() {
            var me = this;

            me.chunks.clear();
            me.etags.clear();

            var request = new XMLHttpRequest();

            request.onreadystatechange = function() {
              if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                var response = JSON.parse(this.responseText);
                me.multipartProperties.key = response.data.Key;
                me.multipartProperties.uploadId = response.data.UploadId,
                me.multipartProperties.signUrl = me.config.signUrl
                me.upload.create.fire(me, me);
              }
            };

            var data = {
              Context:     me.config.context,
              FileName:    me.config.blob.name,
              ContentType: me.config.blob.type
            };

            request.open('POST', me.config.createMultiPartUrl, true);
            request.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
            request.send(JSON.stringify(data));
          }
        },

        complete: {
          value: function() {
            var me = this;
            var request = new XMLHttpRequest();

            request.onreadystatechange = function() {
              if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                var response = JSON.parse(this.responseText);
                me.upload.completed.fire(me, response);
              }
            };

            var data = {
              UploadId: me.multipartProperties.uploadId,
              Key:      me.multipartProperties.key,
              Etags:    me.etags.elements
            };

            request.open('POST', me.config.completeMultiPartUrl, true);
            request.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
            request.send(JSON.stringify(data));
          }
        },

        abort: {
          value: function() {
            var me = this;
            var request = new XMLHttpRequest();

            request.onreadystatechange = function() {
              if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                var response = JSON.parse(this.responseText);
                me.upload.abort.fire(me, response);
              }
            };

            var data = {
              UploadId: me.multipartProperties.uploadId,
              Key:      me.multipartProperties.key
            };

            request.open('POST', me.config.abortMultiPartUrl, true);
            request.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
            request.send(JSON.stringify(data));
          }
        }

      });

      return function(cfg) { return new S3UploadMultiPart(cfg); } 
  });

})(window.angular);