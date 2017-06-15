function Observable() {
	Object.call(this);

	this.handlers = [];
}

Observable.prototype = Object.create(Object.prototype, {

	constructor : Observable,
	
	init : {
		value : function() {
		},
		enumerable : false,
		configurable : true,
		writable : false
	},

	apply : {
		value : function(obj, properties) {
			for ( var property in properties) {
				obj[property] = properties[property];
			}
		},
		enumerable : false,
		configurable : false,
		writable : false
	},
	
	handlers : {
		writable : true,
		configurable : true,
		value : null
	},

	subscribe : {
		value : function(fn) {
			this.handlers.push(fn);
		},
		enumerable : false,
		configurable : false,
		writable : false
	},

	publish : {
		value : function(sender, obj) {
			this.handlers.forEach(function(item) {
				item.call(sender, obj);
			});
		},
		enumerable : false,
		configurable : false,
		writable : false
	},

	unsubscribe : {
		value : function(fn) {
			this.handlers = this.handlers.filter(function(item) {
				if (item !== fn) {
					return item;
				}
			});
		},
		enumerable : false,
		configurable : false,
		writable : false
	}
});