'use strict';

import CONFIG from './../config.json';

let {
    extend
    } = angular;

export default function __identity() {

  class S3Queue extends S3Enumerable {

    constructor() {
      extend(this, options);
    }

    enqueue(obj) {
      this.elements.push(obj);
    }

    dequeue() {
      if(this.empty) return null;
      return this.elements.shift();
    }

    peek() {
      if(this.empty) return null;
      return this.elements[0];
    }

  }

  return new S3Stack();

}

function S3Queue(){
  S3Enumerable.call(this);
}

S3Queue.prototype = Object.create(S3Enumerable.prototype, {

  constructor: S3Queue,



});

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

function S3MultipartProperties(cfg) {
  S3Object.call(this);
  
  this.apply(this, cfg);
}

S3MultipartProperties.prototype = Object.create(S3Object.prototype, {

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

function S3ChunkFile(cfg) {
  S3Object.call(this);
  this.apply(this, cfg);
}

S3ChunkFileState = {
  WAIT: 0,
  SENDING: 1,
  FINISHED: 2,
  ERROR: 3,
  PAUSED: 4
}

S3ChunkFile.prototype = Object.create(S3Object.prototype, {

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
      this.upload.startsend = new S3EventTarget();
      this.upload.urlsigned = new S3EventTarget();
      this.upload.finished = new S3EventTarget();
      this.upload.progress = new S3EventTarget();
      this.upload.error = new S3EventTarget();
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

function S3UploadMultiPartConfig(config) {
  S3Object.call(this);
  this.apply(this, config);
}

S3UploadMultiPartConfig.prototype = Object.create(S3Object.prototype, {

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

function S3UploadEtag(cfg) {
  S3Object.call(this);
  this.apply(this, cfg);
}

S3UploadEtag.prototype = Object.create(S3Object.prototype, {
  
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

function S3UploadMultiPart(cfg) {
  S3Object.call(this);
  this.apply(this.config, cfg);
}

S3UploadMultiPart.prototype = Object.create(S3Object.prototype, {

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

      this.upload.create = new S3EventTarget();
      this.upload.progress = new S3EventTarget();
      this.upload.send =  new S3EventTarget();
      this.upload.completed = new S3EventTarget();      
      this.upload.abort = new S3EventTarget();   

      this.chunks = new S3Queue();

      this.etags = new S3Stack();

      this.config = new S3UploadMultiPartConfig();

      this.multipartProperties = new S3MultipartProperties();
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
          if(chunk.state === S3ChunkFileState.WAIT) {
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

          var chunk = new S3ChunkFile({
            blob:                blob.slice(start, end),
            multipartProperties: me.multipartProperties,
            partNumber:          me.chunks.length + 1
          });

          chunk.upload.progress.addListener(function(event) {
            if(event.state === S3ChunkFileState.SENDING) {
              me.upload.progress.fire(me, event);
            }
          });

          chunk.upload.finished.addListener(function(event) {
            if(event.state === S3ChunkFileState.ERROR) {
              event.retry();
            }
          });           

          chunk.upload.finished.addListener(function(event) {
            if(event.state === S3ChunkFileState.FINISHED) {
              me.chunks.dequeue();
            }
          });         

          chunk.upload.finished.addListener(function(event) {
            if(event.state === S3ChunkFileState.FINISHED) {
              me.etags.push(new S3UploadEtag({
                ETag:       event.etag,
                PartNumber: event.partNumber
              }));
            }
          });

          chunk.upload.finished.addListener(function(event) {
            if(event.state === S3ChunkFileState.FINISHED) {
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