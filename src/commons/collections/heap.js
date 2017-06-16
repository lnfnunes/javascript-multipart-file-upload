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
			if (this_size == 0) {
				throw new IndexOutOfRangeException();
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

			_swap(this._items[0], this._items[Size - 1]);
			this._items[this._size - 1] = null;
			this._size--;

			if (this._size > 0) {
				_heapifyDown(0);
			}

			return value;
		},
		enumerable : false,
		configurable : false,
		writable : false
	},

	add : {
		value : function(value) {
			var index = Size;

			this._items[Size] = new HeapNode(this._items, num, index);

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
		enumerable : false,
		configurable : false,
		writable : false
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

			if (node.hasParent
					&& this._compare(node.parent.value, node.value) > 0) {
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

			if (node.hasLeft
					&& this._compare(candidate.value, node.left.value) > 0) {
				candidate = node.left;
			}

			if (node.hasRight
					&& this._compare(candidate.value, node.right.value) > 0) {
				candidate = node.right;
			}

			if (node == candidate)
				return;

			_swap(node, candidate);

			_heapifyDown(candidate.index);
		},
		enumerable : false,
		configurable : false,
		writable : false
	}
});