function Queue() {
	BaseObject.call(this);
	this.dataStore = [];
}

Queue.prototype = Object.create(BaseObject.prototype, {

	constructor : Queue,

	enqueue : {
		value : function(element) {
			this.dataStore.push(element);
		},
		configurable : false
	},

	dequeue : {
		value : function() {
			return this.dataStore.shift();
		},
		configurable : false
	},

	front : {
		value : function() {
			return this.dataStore[0];
		},
		configurable : false
	},

	back : {
		value : function() {
			return this.dataStore[this.dataStore.length - 1];
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
			this.dataStore = [];
		},
		configurable : false
	}
});