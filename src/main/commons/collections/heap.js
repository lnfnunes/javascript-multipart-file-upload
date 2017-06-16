function Heap(size, compare) {
	BaseObject.call(this);
	this._items = new Array((size * 2) + 10);
	this._size = 0;
	this._compare = compare;
}

Heap.prototype = Object.create(BaseObject.prototype, {

	constructor : Heap,

	peek : {
		value : function() {
			if (this._size == 0) {
				return null;
			}

			return this._items[0].value;
		},
		enumerable : false,
		configurable : false,
		writable : false
	},

	poll : {
		value : function() {
			var value = this._items[0].Value;

			this._swap(this._items[0], this._items[this._size - 1]);
			
			this._items[this._size - 1] = undefined;
			this._size--;

			if (this._size > 0) {
				this._heapifyDown(0);
			}

			return value;
		},
		enumerable : false,
		configurable : false,
		writable : false
	},

	add : {
		value : function(value) {
			var index = this._size;
			
			this._items[this._size] = new HeapNode(this._items, value, index);

			this._size++;

			this._heapifyUp(index);
		},
		enumerable : false,
		configurable : false,
		writable : false
	},

	length : {
		get : function() {
			return this._size;
		},
		configurable : false
	},

	empty : {
		get : function() {
			return this._size == 0;
		},
		configurable : false
	},
	
	clear : {
		value : function() {
			this._size = 0;
			this._items = new Array((this._items.length * 2) + 10);
		},
		configurable : false
	},	

	_swap : {
		value : function(nodeA, nodeB) {
			var temp = nodeA.value;
			nodeA.value = nodeB.value;
			nodeB.value = temp;
		},
		enumerable : false,
		configurable : false,
		writable : false
	},

	_heapifyUp : {
		value : function(index) {
			var node = this._items[index];
			
			if (node.hasParent && this._compare(node.parent.value, node.value) > 0) {
				this._swap(node.parent, node);
				this._heapifyUp(node.parent.index);
			}
		},
		enumerable : false,
		configurable : false,
		writable : false
	},

	_heapifyDown : {
		value : function(index) {
			var node = this._items[index];

			var candidate = node;

			if (node.hasLeft && this._compare(candidate.value, node.left.value) > 0) {
				candidate = node.left;
			}

			if (node.hasRight && this._compare(candidate.value, node.right.value) > 0) {
				candidate = node.right;
			}

			if (node == candidate){
				return;
			}

			this._swap(node, candidate);

			this._heapifyDown(candidate.index);
		},
		enumerable : false,
		configurable : false,
		writable : false
	}
});