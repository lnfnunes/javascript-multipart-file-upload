function XHR(cfg, xhr) {
	var config = {
		method : "",
		url : "",
		withCredentials : false,
		headers : []
	};
	
	BaseObject.prototype.apply.call(this, config, cfg || {});
	
	BaseObject.call(this, {
		_config : config,

		_events : {
			onSuccess : new Observable(),
			onProgress : new Observable(),
			onComplete : new Observable(),
			onError : new Observable(),
			onCancel : new Observable()
		},

		_xhr : xhr || new XMLHttpRequest()
	});
}

XHR.prototype = Object.create(BaseObject.prototype, {

	constructor : XHR,

	config : {
		get : function() {
			return this._config;
		},
		configurable : false
	},

	events : {
		get : function() {
			return this._events;
		},
		configurable : false
	},

	xhr : {
		get : function() {
			return this._xhr;
		},
		configurable : false
	},

	_isRequestSuccessful : {
		value : function() {
			// IE: sometimes 1223 instead of 204
			return (this.xhr.status == 0
					|| (this.xhr.status >= 200 && this.xhr.status < 300)
					|| this.xhr.status == 304 || this.xhr.status == 1223);
		},
		enumerable : false,
		configurable : false,
		writable : true
	},

	_parseHeaders : {
		value : function(headers) {
			var parsed = {};

			if (!headers) {
				return parsed;
			}

			headers.split('\n').forEach(function(item) {
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
		writable : true
	},

	_onSuccess : {
		value : function(item, response, status, headers) {
			this.events.onSuccess.publish(item, response, status, headers);
		},
		enumerable : false,
		configurable : false,
		writable : true
	},

	_onProgress : {
		value : function(item, progress) {
			this.events.onProgress.publish(item, progress);
		},
		enumerable : false,
		configurable : false,
		writable : true
	},

	_onComplete : {
		value : function(item, response, status, headers) {
			this.events.onComplete.publish(item, response, status, headers);
		},
		enumerable : false,
		configurable : false,
		writable : true
	},

	_onError : {
		value : function(item, response, status, headers) {
			this.events.onError.publish(item, response, status, headers);
		},
		enumerable : false,
		configurable : false,
		writable : true
	},

	_onCancel : {
		value : function(item, response, status, headers) {
			this.events.onCancel.publish(item, response, status, headers);
		},
		enumerable : false,
		configurable : false,
		writable : true
	},

	addListeners : {
		value : function() {
			var scope = this;

			scope.xhr.onprogress = function(event) {
				var progress = Math.round(event.lengthComputable ? event.loaded * 100 / event.total : 0);
				scope._onProgress(scope.config, progress);
			};

			scope.xhr.onload = function() {
				if (this.readyState === this.DONE) {
					var response = JSON.parse(this.responseText);
					var headers = scope._parseHeaders(this.getAllResponseHeaders());
					var status = '_on' + scope._isRequestSuccessful() ? 'Success' : 'Error';
					scope[status](scope.config, response, this.status, headers);
					scope._onComplete(scope.config, response, this.status, headers);
				}
			};

			scope.xhr.onerror = function() {
				var response = JSON.parse(this.responseText);
				var headers = scope._parseHeaders(this.getAllResponseHeaders());
				scope._onError(scope.config, response, this.status, headers);
				scope._onComplete(scope.config, response, this.status, headers);
			};

			scope.xhr.onabort = function() {
				var response = JSON.parse(this.responseText);
				var headers = scope._parseHeaders(this.getAllResponseHeaders());
				scope._onCancel(scope.config, response, this.status, headers);
				scope._onComplete(scope.config, response, this.status, headers);
			};
		}
	},

	send : {
		value : function(data) {
			var scope = this;
			
			scope.xhr.open(scope.config.method, scope.config.url, true);
			scope.xhr.withCredentials = scope.config.withCredentials;

			scope.config.headers.forEach(function(item) {
				scope.xhr.setRequestHeader(item.name, item.value);
			});

			scope.xhr.send(data);
		},
		enumerable : false,
		configurable : false,
		writable : true
	}
});