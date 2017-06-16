describe("A test suite", function() {
	beforeEach(function() {
	});
	afterEach(function() {
	});

	it('should be add values and peek is minimum success', function() {
		var heapMin = new Heap(11, function(a, b) {
			return a - b;
		});

		heapMin.add(10);
		heapMin.add(9);
		heapMin.add(8);
		heapMin.add(7);
		heapMin.add(6);
		heapMin.add(5);
		heapMin.add(4);
		heapMin.add(3);
		heapMin.add(2);
		heapMin.add(1);
		heapMin.add(0);

		assert.equal(0, heapMin.peek());
	});
});