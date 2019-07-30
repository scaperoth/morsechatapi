const assert = require('assert');
const chai = require('chai');
const arrayUtilities = require('../../api/utilities/arrayUtilities');

const testArray = [
	{ item: 1 },
	{ item: 2 },
	{ item: 3 }
];

describe('Array utilities test suite', function () {
	it('should fail if key not given', function () {
		chai.expect(arrayUtilities.RemoveItemFromArrayByKey(testArray, { item: 2 })).to.throw;
	});

	it('should be able to remove item', function () {
		const expected = [
			{ item: 1 },
			{ item: 3 }
		];
		const response = arrayUtilities.RemoveItemFromArrayByKey(testArray, { item: 2 }, 'item');
		response.should.be.deep.equal(expected);
	});
});
