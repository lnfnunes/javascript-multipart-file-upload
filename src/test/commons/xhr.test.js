describe("A test suite", function() {
	beforeEach(function() {
	});
	afterEach(function() {
	});

	it('under construction', function() {
		var xhr = new XHR({
			method : "POST",
			url : "http://localhost"
		}, {
			setRequestHeader : function(name, value) {
			},
			send : function(data) {
			},
			open : function(method, url, credentials) {
			}
		});

		assert.equal("POST", xhr.config.method);
		assert.equal("http://localhost", xhr.config.url);
		assert.equal(false, xhr.config.withCredentials);
		assert.equal(0, xhr.config.headers.length);

		xhr.send();
	});
});