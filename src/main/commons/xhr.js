function XHR(cfg, xhr) {
  BaseObject.call(this, {
    _config : {
      method : cfg.method || "",
      url : cfg.url || "",
      withCredentials : cfg.withCredentials || false,
      headers : cfg.headers || []
    },
    _events : {
      onSuccess : new Observable(),
      onProgress : new Observable(),
      onComplete : new Observable(),
      onError : new Observable(),
      onCancel : new Observable()
    },
    _xhr : xhr || new XMLHttpRequest(),    
  });
}

XHR.prototype = Object.create(BaseObject.prototype, {

  constructor : XHR,

  _config : {
    value : undefined,
    enumerable : false,
    configurable : true,
    writable : true
  },

  _events : {
    value : undefined,
    enumerable : false,
    configurable : true,
    writable : true
  },

  _xhr : {
    value : undefined,
    enumerable : false,
    configurable : true,
    writable : true
  },

  _isRequestSuccessful : {
    value : function () {
      // IE: sometimes 1223 instead of 204
      return (this.xhr.status == 0 || (this.xhr.status >= 200 && this.xhr.status < 300) || this.xhr.status == 304 || this.xhr.status == 1223);
    },
    enumerable : false,
    configurable : false,
    writable : false
  },

  _parseHeaders : {
    value : function (headers) {
      var parsed = {};

      if (!headers) {
        return parsed;
      }

      headers.split('\n').forEach(function (item) {
        var keyValue = item.split(':');
        var key = keyValue[0].trim().toLowerCase();
        var val = keyValue[1].trim().replace(/"/g, '');

        if (key) {
          parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
        }
      });

      return parsed;
    },
    enumerable : false,
    configurable : false,
    writable : false
  },

  _onSuccess : {
    value : function (sender, response, status, headers) {
      this.events.onSuccess.publish(sender, {
        response : response,
        status : status,
        headers : headers
      });
    },
    enumerable : false,
    configurable : false,
    writable : false
  },

  _onProgress : {
    value : function (sender, progress) {
      this.events.onProgress.publish(sender, progress);
    },
    enumerable : false,
    configurable : false,
    writable : false
  },

  _onComplete : {
    value : function (sender, response, status, headers) {
      this.events.onComplete.publish(sender, {
        response : response,
        status : status,
        headers : headers
      });
    },
    enumerable : false,
    configurable : false,
    writable : false
  },

  _onError : {
    value : function (sender, response, status, headers) {
      this.events.onError.publish(sender, {
        response : response,
        status : status,
        headers : headers
      });
    },
    enumerable : false,
    configurable : false,
    writable : false
  },

  _onCancel : {
    value : function (sender, response, status, headers) {
      this.events.onCancel.publish(sender, {
        response : response,
        status : status,
        headers : headers
      });
    },
    enumerable : false,
    configurable : false,
    writable : false
  },

  config : {
    get : function () {
      return this._config;
    },
    configurable : false
  },

  events : {
    get : function () {
      return this._events;
    },
    configurable : false
  },

  xhr : {
    get : function () {
      return this._xhr;
    },
    configurable : false
  },

  addListeners : {
    value : function () {
      var scope = this;

      scope.xhr.onprogress = function (event) {
        var progress = Math.round(event.lengthComputable ? event.loaded * 100 / event.total : 0);
        scope._onProgress(scope, progress);
      };

      scope.xhr.onload = function () {
        if (this.readyState === this.DONE) {
          var response = JSON.parse(this.responseText);
          var headers = scope._parseHeaders(this.getAllResponseHeaders());
          var status = scope._isRequestSuccessful() ? '_onSuccess' : '_onError';
          scope[status](scope, response, this.status, headers);
          scope._onComplete(scope, response, this.status, headers);
        }
      };

      scope.xhr.onerror = function () {
        var response = JSON.parse(this.responseText);
        var headers = scope._parseHeaders(this.getAllResponseHeaders());
        scope._onError(scope, response, this.status, headers);
        scope._onComplete(scope, response, this.status, headers);
      };

      scope.xhr.onabort = function () {
        var response = JSON.parse(this.responseText);
        var headers = scope._parseHeaders(this.getAllResponseHeaders());
        scope._onCancel(scope, response, this.status, headers);
        scope._onComplete(scope, response, this.status, headers);
      };
    },
    enumerable : false,
    configurable : false,
    writable : false
  },

  send : {
    value : function (data) {
      var scope = this;

      scope.xhr.open(scope.config.method, scope.config.url, true);
      scope.xhr.withCredentials = scope.config.withCredentials;

      scope.config.headers.forEach(function (item) {
        scope.xhr.setRequestHeader(item.name, item.value);
      });

      scope.xhr.send(data);
    },
    enumerable : false,
    configurable : false,
    writable : false
  }
});