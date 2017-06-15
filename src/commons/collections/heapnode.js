function HeapNode(items, value, index) {
	Object.call(this);

	this._value = value;
	this._index = index;
	this._items = items;
}

HeapNode.prototype = Object.create(Object.prototype, {

	constructor : HeapNode,

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

	index : {
		get : function() {
			return this._index;
		},
		enumerable : false,
		configurable : true,
		writable : false
	},

	parent : {
		get : function() {
			return this._items[(this._index - 1) / 2];
		},
		enumerable : false,
		configurable : true,
		writable : false
	},

	left : {
		get : function() {
			return this._items[(this._index * 2) + 1];
		},
		enumerable : false,
		configurable : true,
		writable : false
	},

	right : {
		get : function() {
			return this._items[(this._index * 2) + 2];
		},
		enumerable : false,
		configurable : true,
		writable : false
	},

	hasParent : {
		get : function() {
			return this._index != 0 && this._parent != null;
		},
		enumerable : false,
		configurable : true,
		writable : false
	},

	hasLeft : {
		get : function() {
			return this.left != null;
		},
		enumerable : false,
		configurable : true,
		writable : false
	},

	hasRight : {
		get : function() {
			return this.right != null;
		},
		enumerable : false,
		configurable : true,
		writable : false
	},

	value : {
		get : function() {
			return this._value;
		},
		set : function(value) {
			this._value = value;
		}
	}
});