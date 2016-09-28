
function S3XHR = function(item) {
	S3Object.call(this);

	this.apply(this.item, item);
}

S3XHR.prototype = Object.create(S3Object.prototype, {

  constructor : S3XHR,
  
  item : {
    writable : true,
    configurable : false,
    value : null
  },
  
  events : {
    writable : true,
    configurable : false,
    value : {
      onSuccess : null,
      onProgress : null,
      onComplete : null,
      onError : null,
      onCancel : null
    }
  },
  
  init : {
  	value : function() {
  		this.xhr = new XMLHttpRequest();
  		this.xhr.open(this.item.method, this.item.url, true);
  		this.xhr.withCredentials = this.item.withCredentials;
  		
  		this.events.onSuccess  = new S3EventTarget();
  		this.events.onProgress = new S3EventTarget();
  		this.events.onComplete = new S3EventTarget();
  		this.events.onError    = new S3EventTarget();
  		this.events.onCancel   = new S3EventTarget();  		
  	},
    enumerable : false,
    configurable : false,
    writable : true
  },
  
  _isRequestSuccessful : {
  	value : function() {
      // IE: sometimes 1223 instead of 204
  		return (this.xhr.status == 0 || (this.xhr.status >= 200 && this.xhr.status < 300) || this.xhr.status == 304 || this.xhr.status == 1223);
  	},
    enumerable : false,
    configurable : false,
    writable : true
  },
  
  _parseHeaders : {
  	value : function(headers) {
	    var parsed = {}, key, val, i;
	
	    if(!headers) return parsed;
	
	    headers.split('\n').forEach(function(item){
        var keyValue = item.split(':');
        key = keyValue[0].trim().toLowerCase();
        val = keyValue[1].trim().replace(/"/g, '');
        
        if(key) {
        	parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
        }
	    });
	
	    return parsed;
  	},
    enumerable : false,
    configurable : false,
    writable : true
  },
  
  _onSuccess : {
  	value : function(item, response, status, headers) {
  		this.events.onSuccess.fire(item, response, status, headers);
  	},
    enumerable : false,
    configurable : false,
    writable : true
  },
  
  _onProgress : {
  	value : function(item, progress) {
  		this.events.onProgress.fire(item, progress);  		
  	},
    enumerable : false,
    configurable : false,
    writable : true
  },
  
  _onComplete : {
  	value : function(item, response, status, headers) {
  		this.events.onComplete.fire(item, response, status, headers);  		
  	},
    enumerable : false,
    configurable : false,
    writable : true
  },
  
  _onError : {
  	value : function(item, response, status, headers) {
  		this.events.onError.fire(item, response, status, headers);  		
  	},
    enumerable : false,
    configurable : false,
    writable : true
  },
  
  _onCancel : {
  	value : function(item, response, status, headers) {
  		this.events.onCancel.fire(item, response, status, headers);  		
  	},
    enumerable : false,
    configurable : false,
    writable : true
  },  
  
  addListeners : {
  	value : function() {
  		var me = this;
  		
      this.xhr.upload.onprogress = (event) => {
        var progress = Math.round(event.lengthComputable ? event.loaded * 100 / event.total : 0);
        this._onProgress(me.item, progress);
	    };
	
	    this.xhr.onload = () => {
        if (this.readyState === this.DONE){
	        var response = JSON.parse(this.responseText);
	        var headers = me._parseHeaders(this.getAllResponseHeaders());
        	var status = '_on' + me.isRequestSuccessful() ? 'Success' : 'Error';
        	me[status](me.item, response, this.status, headers);
	        me._onComplete(me.item, response, this.status, headers);	                		
        }
	    };
	
	    this.xhr.onerror = () => {
        var response = JSON.parse(this.responseText);
        var headers = me._parseHeaders(this.getAllResponseHeaders());
        me._onError(me.item, response, this.status, headers);
        me._onComplete(me.item, response, this.status, headers);
	    };
	
	    this.xhr.onabort = () => {
        var response = JSON.parse(this.responseText);
        var headers = me._parseHeaders(this.getAllResponseHeaders());
        me._onCancel(me.item, response, this.status, headers);
        me._onComplete(me.item, response, this.status, headers);
	    };
  	},
    enumerable : false,
    configurable : false,
    writable : true
  },
  
  send : {
  	value : function(data) {
  		var me = this;
  		
      this.item.headers.forEach(function(item){
      	me.xhr.setRequestHeader(item.name, item.value);
      });

      this.xhr.send(data);  		
  	},
    enumerable : false,
    configurable : false,
    writable : true
  }
};