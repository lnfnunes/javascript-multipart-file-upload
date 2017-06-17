function BaseObject(cfg) {
	BaseObject.prototype.apply.call(this, this, cfg || {});
	BaseObject.prototype.init.call(this);
}

BaseObject.prototype = Object.create(null, {

	constructor : BaseObject,

	init : {
		value : function() {
			this.addListeners();
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
	
	addListeners : {
		value : function() {
		},
		enumerable : false,
		configurable : false,
		writable : false
	}
});