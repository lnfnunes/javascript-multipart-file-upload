function XHR(item) {
	BaseObject.call(this);
	this.apply(this.item, item);
}

XHR.prototype = Object.create(BaseObject.prototype, {

	constructor : XHR,

	init : {
		value : function() {
			this.xhr = new XMLHttpRequest();

			this.xhr.open(this.item.method, this.item.url, true);
			this.xhr.withCredentials = this.item.withCredentials;

			this.events.onSuccess = new Observable();
			this.events.onProgress = new Observable();
			this.events.onComplete = new Observable();
			this.events.onError = new Observable();
			this.events.onCancel = new Observable();
		},
		enumerable : false,
		configurable : false,
		writable : true
	},

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
			var parsed = {}, key, val, i;

			if (!headers)
				return parsed;

			headers.split('\n').forEach(function(item) {
				var keyValue = item.split(':');
				key = keyValue[0].trim().toLowerCase();
				val = keyValue[1].trim().replace(/"/g, '');

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
			var me = this;

			this.xhr.upload.onprogress = function(event) {
				var progress = Math.round(event.lengthComputable ? event.loaded
						* 100 / event.total : 0);
				this._onProgress(me.item, progress);
			};

			this.xhr.onload = function() {
				if (this.readyState === this.DONE) {
					var response = JSON.parse(this.responseText);
					var headers = me
							._parseHeaders(this.getAllResponseHeaders());
					var status = '_on' + me.isRequestSuccessful() ? 'Success'
							: 'Error';
					me[status](me.item, response, this.status, headers);
					me._onComplete(me.item, response, this.status, headers);
				}
			};

			this.xhr.onerror = function() {
				var response = JSON.parse(this.responseText);
				var headers = me._parseHeaders(this.getAllResponseHeaders());
				me._onError(me.item, response, this.status, headers);
				me._onComplete(me.item, response, this.status, headers);
			};

			this.xhr.onabort = function() {
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

			this.item.headers.forEach(function(item) {
				me.xhr.setRequestHeader(item.name, item.value);
			});

			this.xhr.send(data);
		},
		enumerable : false,
		configurable : false,
		writable : true
	}
});