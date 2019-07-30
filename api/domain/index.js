module.exports = () => {

	const morseService = require('./morse.service')({
		delimitter: '|'
	});

	return {
		morseService
	};
};
