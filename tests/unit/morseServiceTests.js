const assert = require('assert');
const morseService = require('../../api/domain/morse.service')({
	delimitter: '|'
});

describe('Morse Service test suite', function () {
	it('should return values separated by space', function () {
		const response = morseService.convertToMorseFromString('abc123');
		assert.equal(response, `.- -... -.-. .---- ..--- ...--`)
	});

	it('should return words separated by delimiter', function () {
		const response = morseService.convertToMorseFromString('a b');
		assert.equal(response, `.- | -...`)
	});

	it('should return blank for values not in morse map', function () {
		const response = morseService.convertToMorseFromString('_');
		assert.equal(response, ``)
	});

	it('should return return correct character for decrypting morse', function () {
		const response = morseService.convertToStringFromMorse('.-');
		assert.equal(response, `a`)
	});

	it('should return return correct words for decrypting morse', function () {
		const response = morseService.convertToStringFromMorse('.- | -...');
		assert.equal(response, `a b`)
	});
});
