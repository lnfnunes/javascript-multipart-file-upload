(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["angular-s3-fileupload-multipart"] = factory();
	else
		root["angular-s3-fileupload-multipart"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(1);
	__webpack_require__(2);
	__webpack_require__(3);
	__webpack_require__(4);
	
	var CONFIG = __webpack_require__(5);
	
	var options = __webpack_require__(6);
	
	angular.module(CONFIG.name, []).value('s3FileUploadMultipartOptions', options).run([function () {}]);

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';
	
	window.S3Enumerable = function () {
	  Object.call(this);
	  this.array = new Array();
	};
	
	window.S3Enumerable.prototype = Object.create(Object.prototype, {
	
	  constructor: S3Enumerable,
	
	  clear: {
	    value: function (obj) {
	      this.array = new Array();
	    },
	    configurable: false
	  },
	
	  elements: {
	    get: function () {
	      return this.array;
	    },
	    enumerable: true,
	    configurable: false
	  },
	
	  length: {
	    get: function () {
	      return this.array.length;
	    },
	    enumerable: false,
	    configurable: false
	  },
	
	  empty: {
	    get: function () {
	      return this.array.length === 0;
	    },
	    enumerable: false,
	    configurable: false
	  }
	
	});

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(1);
	
	function S3Stack() {
	  S3Enumerable.call(this);
	}
	
	S3Stack.prototype = Object.create(S3Enumerable.prototype, {
	
	  constructor: S3Stack,
	
	  push: {
	    value: function (obj) {
	      this.elements.push(obj);
	    },
	    configurable: false
	  },
	
	  pop: {
	    value: function (obj) {
	      if (this.empty) return null;
	      this.elements.pop(obj);
	    },
	    configurable: false
	  }
	
	});

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(1);
	
	function S3Queue() {
	  S3Enumerable.call(this);
	}
	
	S3Queue.prototype = Object.create(S3Enumerable.prototype, {
	
	  constructor: S3Queue,
	
	  enqueue: {
	    value: function (obj) {
	      this.elements.push(obj);
	    },
	    configurable: false
	  },
	
	  dequeue: {
	    value: function (obj) {
	      if (this.empty) return null;
	      return this.elements.shift();
	    },
	    configurable: false
	  },
	
	  peek: {
	    value: function () {
	      if (this.empty) return null;
	      return this.elements[0];
	    },
	    configurable: false
	  }
	
	});

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';
	
	function S3Object() {
	  Object.call(this);
	
	  this.init();
	  this.addEvents();
	  this.addListeners();
	}
	
	S3Object.prototype = Object.create(Object.prototype, {
	
	  constructor: S3Object,
	
	  init: {
	    value: function () {},
	    enumerable: false,
	    configurable: true,
	    writable: false
	  },
	
	  addEvents: {
	    value: function () {},
	    enumerable: false,
	    configurable: true,
	    writable: false
	  },
	
	  addListeners: {
	    value: function () {},
	    enumerable: false,
	    configurable: true,
	    writable: false
	  },
	
	  apply: {
	    value: function (obj, properties) {
	      for (var property in properties) {
	        obj[property] = properties[property];
	      }
	    },
	    enumerable: false,
	    configurable: false,
	    writable: false
	  }
	});

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = {
		"name": "angularS3FileUploadMultipart"
	};

/***/ },
/* 6 */
/***/ function(module, exports) {

	{}

/***/ }
/******/ ])
});
;
//# sourceMappingURL=angular-s3-fileupload-multipart.js.map