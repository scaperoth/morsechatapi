// api/utilities/validator

/**
 * validates username. If not valid, returns object with message
 * explaining why it's not valid
 * @param  {String} username       username to validate
 * @param  {Number} [maxLength=15] maximum length allowed for username
 * @return {Object}                { isValid, message }
 */
const usernameValidator = (username, maxLength = 15) => {

	if (!username) {
		return { isValid: false, message: `No username given` };
	}

	if (username.length > maxLength) {
		return { isValid: false, message: `Username must be less than ${maxLength} characters` };
	}

	return { isValid: true };
};

module.exports = {
	usernameValidator
};
