describe('cmd', () => {
	it('should just pass', () => {
		var foo = 4 + 5;
		foo.should.equal(9);
	});

	it('also should just pass', () => {
		var foo = 5 + 5;
		foo.should.equal(10);
	});
});
