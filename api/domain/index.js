module.exports = () => {

	const morseService = require('./morse.service')({
		delimitter: process.env.MORSE_CHAT_DELIMITTER || '|'
	});

	const securityService = require('./security.service')({
		userLimit: process.env.MORSE_CHAT_USER_LIMIT || 10
	});

	return {
		morseService,
		securityService
	};
};
