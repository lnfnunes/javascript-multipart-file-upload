describe("A test suite Observable", function () {
  beforeEach(function () {
  });
  afterEach(function () {
  });

  it('should be subscribe functions and publish and unsubscribe and publish success', function () {
    var obj1 = {
      event : "obj1"
    };

    var obj2 = {
      event : "obj2"
    };

    var fn0 = function (item) {
      assert.equal(obj1, item);
    };

    var fn1 = function (item) {
      assert.equal(obj1, item);
    };

    var observable = new Observable();

    observable.subscribe(fn0);
    observable.subscribe(fn1);

    observable.publish(this, obj1);

    observable.unsubscribe(fn0);
    observable.unsubscribe(fn1);

    observable.publish(this, obj2);
  });
});