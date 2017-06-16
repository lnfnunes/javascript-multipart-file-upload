function Stack() {
	BaseObject.call(this);
	this._dataStore = [];
	this._top = 0;
};

Stack.prototype = Object.create(BaseObject.prototype, {

	constructor : Stack,

	push : {
		value : function(element) {
			this._dataStore.push(element);
			this._top++;
		},
		configurable : false
	},

	pop : {
		value : function() {
			return this._dataStore.pop();
			this._top--;
		},
		configurable : false
	},

	peek : {
		value : function() {
			return this._dataStore[this._top - 1];
		},
		configurable : false
	},

	length : {
		get : function() {
			return this._dataStore.length;
		},
		configurable : false
	},
	
	empty : {
		get : function() {
			return this._dataStore.length == 0;
		},
		configurable : false
	},

	clear : {
		value : function() {
			this._top = 0;
			this._dataStore = [];
		},
		configurable : false
	}
});