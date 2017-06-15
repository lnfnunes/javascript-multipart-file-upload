function Stack() {
	
	Object.call(this);

	this.dataStore = [];
};

Stack.prototype = Object.create(Object.prototype, {

	constructor : Stack,

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
	
	push : {
		value : function(element) {
			this.dataStore[this.top++] = element;
		},
		configurable : false
	},

	pop : {
		value : function() {
			return this.dataStore[--this.top];
		},
		configurable : false
	},

	peek : {
		value : function() {
			return this.dataStore[this.top - 1];
		},
		configurable : false
	},

	length : {
		get : function() {
			return this.top;
		},
		configurable : false
	},
	
	empty : {
		get : function() {
			return this.dataStore.length == 0;
		},
		configurable : false
	},

	clear : {
		value : function() {
			this.top = 0;
		},
		configurable : false
	}
});