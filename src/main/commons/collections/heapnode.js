function HeapNode(items, value, index) {
  BaseObject.call(this, {
    _value : value,
    _index : index,
    _items : items
  });
}

HeapNode.prototype = Object.create(BaseObject.prototype, {

  constructor : HeapNode,

  index : {
    get : function () {
      return this._index;
    },
    configurable : false
  },

  parent : {
    get : function () {
      return this._items[(this._index - 1) / 2 >> 0];
    },
    configurable : false
  },

  left : {
    get : function () {
      return this._items[(this._index * 2) + 1];
    },
    configurable : false
  },

  right : {
    get : function () {
      return this._items[(this._index * 2) + 2];
    },
    configurable : false
  },

  hasParent : {
    get : function () {
      return this._index != 0 && this.parent != undefined;
    },
    configurable : false
  },

  hasLeft : {
    get : function () {
      return this.left != undefined;
    },
    configurable : false
  },

  hasRight : {
    get : function () {
      return this.right != undefined;
    },
    configurable : false
  },

  value : {
    get : function () {
      return this._value;
    },
    set : function (value) {
      this._value = value;
    },
    configurable : false
  }
});