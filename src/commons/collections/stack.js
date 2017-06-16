function Stack() {
	BaseObject.call(this);
	this.dataStore = [];
};

Stack.prototype = Object.create(BaseObject.prototype, {

	constructor : Stack,

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
			return this.dataStore.length;
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