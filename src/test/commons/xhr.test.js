describe("A test suite XHR", function () {
  beforeEach(function () {
  });
  afterEach(function () {
  });

  it('should be send and progress success', function () {
    var xhr = new XHR({
      method : "POST",
      url : "http://localhost"
    }, {
      setRequestHeader : function (name, value) {
      },
      getAllResponseHeaders : function () {
        return "X-header1: value\nX-header2: value";
      },
      send : function (data) {
        for (var i = 0; i < 100; i++) {
          this.onprogress({
            lengthComputable : true,
            loaded : i,
            total : 100
          });
        }

        this.responseText = '{"success": true}';

        this.status = 200;

        this.DONE = 1;

        this.readyState = this.DONE;

        this.onload();
      },
      open : function (method, url, credentials) {
      }
    });

    var onProgress = function (event) {
      assert.isBelow(event, 100.00);
    };

    var onSuccess = function (event) {
      assert.equal(200, event.status);
      assert.equal(true, event.response.success);
    };

    var onComplete = function (event) {
      assert.equal(200, event.status);
      assert.equal(true, event.response.success);
    };

    assert.equal("POST", xhr.config.method);
    assert.equal("http://localhost", xhr.config.url);
    assert.equal(false, xhr.config.withCredentials);
    assert.equal(0, xhr.config.headers.length);

    xhr.events.onProgress.subscribe(onProgress);
    xhr.events.onSuccess.subscribe(onSuccess);
    xhr.events.onComplete.subscribe(onComplete);

    xhr.send({});
  });

  it('should be send and error occur success', function () {
    var xhr = new XHR({
      method : "POST",
      url : "http://localhost"
    }, {
      setRequestHeader : function (name, value) {
      },
      getAllResponseHeaders : function () {
        return "X-header1: value\nX-header2: value";
      },
      send : function (data) {
        for (var i = 0; i < 90; i++) {
          this.onprogress({
            lengthComputable : true,
            loaded : i,
            total : 100
          });
        }

        this.status = 404;

        this.responseText = '{"errorCode": 1900, "erroMessage": "invalid"}';

        this.onerror();
      },
      open : function (method, url, credentials) {
      }
    });

    var onProgress = function (event) {
      assert.isBelow(event, 100.00);
    };

    var onError = function (event) {
      assert.equal(404, event.status);
    };

    var onComplete = function (event) {
      assert.equal(404, event.status);
    };

    assert.equal("POST", xhr.config.method);
    assert.equal("http://localhost", xhr.config.url);
    assert.equal(false, xhr.config.withCredentials);
    assert.equal(0, xhr.config.headers.length);

    xhr.events.onProgress.subscribe(onProgress);
    xhr.events.onComplete.subscribe(onComplete);
    xhr.events.onError.subscribe(onError);

    xhr.send({});
  });

  it('should be send and abort occur success', function () {
    var xhr = new XHR({
      method : "POST",
      url : "http://localhost"
    }, {
      setRequestHeader : function (name, value) {
      },
      getAllResponseHeaders : function () {
        return "X-header1: value\nX-header2: value";
      },
      send : function (data) {
        for (var i = 0; i < 50; i++) {
          this.onprogress({
            lengthComputable : true,
            loaded : i,
            total : 100
          });
        }

        this.status = 400;

        this.responseText = '{"errorCode": 1900, "erroMessage": "invalid"}';

        this.onabort();
      },
      open : function (method, url, credentials) {
      }
    });

    var onProgress = function (event) {
      assert.isBelow(event, 100.00);
    };

    var onCancel = function (event) {
      assert.equal(400, event.status);
    };

    var onComplete = function (event) {
      assert.equal(400, event.status);
    };

    assert.equal("POST", xhr.config.method);
    assert.equal("http://localhost", xhr.config.url);
    assert.equal(false, xhr.config.withCredentials);
    assert.equal(0, xhr.config.headers.length);

    xhr.events.onProgress.subscribe(onProgress);
    xhr.events.onComplete.subscribe(onComplete);
    xhr.events.onCancel.subscribe(onCancel);

    xhr.send({});
  });
});