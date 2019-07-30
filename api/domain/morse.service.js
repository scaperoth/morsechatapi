// api/services/morse.service.js

const morseMap = require('../utilities/morseMap');

module.exports = ({ delimitter = '|' }) => {

	const morseKeys = Object.keys(object);

	const convertToMorseFromString(input) {
		const translation = [];
		const inputChars = input.toLowerCase().split('');

		inputChars.map(c => {
			if (c === ' ') {
				translation.push(delimitter);
			} else if (morseMap.hasOwnProperty(c)) {
				translation.push(morseMap[c]);
			}
		});

		const result = translation.join(' ');
		return result;
	};

	const convertToStringFromMorse(input) {
		const translation = [];
		const morseValues = input.split(' ');
		morseValues.map(m => {
			if (m === delimitter) {
				translation.push(' ');
			} else {
				const character = morseKeys.find(key => morseMap[key] === m);
				if (character) {
					translation.push(character);
				}
			}
		});

		return translation.join('');
	};

	return {
		convertToMorseFromString,
		convertToStringFromMorse
	}
}
