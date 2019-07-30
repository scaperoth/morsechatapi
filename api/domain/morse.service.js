// api/services/morse.service.js

module.exports = ({ delimitter }) => {

	const morseMap = require('../utilities/morseMap');
	const morseKeys = Object.keys(morseMap);

	const convertToMorseFromString = (input) => {
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

	const convertToStringFromMorse = (input) => {
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
	};
};
