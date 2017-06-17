function Observable() {
  BaseObject.call(this, {
    _handlers : []
  });
}

Observable.prototype = Object.create(BaseObject.prototype, {

  constructor : Observable,

  subscribe : {
    value : function (fn) {
      this._handlers.push(fn);
    },
    enumerable : false,
    configurable : false,
    writable : false
  },

  publish : {
    value : function (sender, obj) {
      this._handlers.forEach(function (item) {
        item.call(sender, obj);
      });
    },
    enumerable : false,
    configurable : false,
    writable : false
  },

  unsubscribe : {
    value : function (fn) {
      this._handlers = this._handlers.filter(function (item) {
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