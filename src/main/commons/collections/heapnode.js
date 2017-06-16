function HeapNode(items, value, index) {
	BaseObject.call(this);
	this._value = value;
	this._index = index;
	this._items = items;
}

HeapNode.prototype = Object.create(BaseObject.prototype, {

	constructor : HeapNode,

	index : {
		get : function() {
			return this._index;
		},
		configurable : false
	},

	parent : {
		get : function() {
			return this._items[(this._index - 1) / 2];
		},
		configurable : false
	},

	left : {
		get : function() {
			return this._items[(this._index * 2) + 1];
		},
		configurable : false
	},

	right : {
		get : function() {
			return this._items[(this._index * 2) + 2];
		},
		configurable : false
	},

	hasParent : {
		get : function() {
			return this._index != 0 && this._parent != null;
		},
		configurable : false
	},

	hasLeft : {
		get : function() {
			return this.left != null;
		},
		configurable : false
	},

	hasRight : {
		get : function() {
			return this.right != null;
		},
		configurable : false
	},

	value : {
		get : function() {
			return this._value;
		},
		set : function(value) {
			this._value = value;
		},
		configurable : false
	}
});